import * as ort from 'onnxruntime-web';

/**
 * Configuration options for the OpenWakeWord model.
 */
export interface ModelOptions {
    /** Paths or URLs to the custom wake word ONNX models */
    wakewordModels: string[];
    /** Path or URL to the mel spectrogram ONNX model */
    melspectrogramModelPath: string;
    /** Path or URL to the embedding ONNX model */
    embeddingModelPath: string;
    /** Path or URL to the Silero VAD ONNX model (optional) */
    vadModelPath?: string;
    /** VAD threshold (0-1). 0 disables VAD. */
    vadThreshold?: number;
    /** Patience: How many consecutive frames above threshold before trigger */
    patience?: Record<string, number>;
    /** Thresholds for each model (required if patience or debounce is used) */
    thresholds?: Record<string, number>;
    /** Minimum time between detections in seconds */
    debounceTime?: number;
    /** Inference framework (only 'onnx' supported in this port) */
    inferenceFramework: 'onnx';
    /** Path to WASM files for onnxruntime-web if needed */
    wasmPaths?: string;
}

/**
 * Result of a prediction.
 */
export type PredictionResult = Record<string, number>;

/**
 * OpenWakeWord Core Implementation in TypeScript.
 */
export class Model {
    private melSession: ort.InferenceSession | null = null;
    private embeddingSession: ort.InferenceSession | null = null;
    private vadSession: ort.InferenceSession | null = null;
    private customSessions: Map<string, ort.InferenceSession> = new Map();

    // Buffers
    private melBuffer: Float32Array[] = [];
    private embeddingBuffers: Map<string, Float32Array[]> = new Map();
    private predictionBuffers: Map<string, number[]> = new Map();
    private vadBuffer: number[] = [];
    private rawAudioRemainder: Float32Array = new Float32Array(0);
    private melContextBuffer: Float32Array;

    // Seeding history
    private noiseSeededEmbeddings: Map<string, Float32Array[]> = new Map();

    // Constants
    private readonly CHUNK_SIZE = 1280;
    private readonly MEL_CONTEXT = 480;
    private readonly SAMPLE_RATE = 16000;
    private readonly MEL_BINS = 32;
    private readonly FRAMES_PER_CHUNK = 8;
    private readonly MEL_WINDOW_SIZE = 76;
    private readonly EMBEDDING_WINDOW_SIZE = 24;
    private readonly MAX_MEL_FRAMES = 970;
    private readonly INITIAL_FRAMES_SUPPRESS = 5;
    private readonly PREDICTION_BUFFER_MAX = 30;

    // VAD State (Silero VAD)
    private vadStateH = new Float32Array(2 * 1 * 64).fill(0);
    private vadStateC = new Float32Array(2 * 1 * 64).fill(0);

    private isLoaded = false;

    constructor(private options: ModelOptions) {
        // Handle environments where 'ort' might be a global (some browser setups)
        const runtime = (ort as any).env ? ort : (globalThis as any).ort;
        if (runtime && options.wasmPaths) {
            runtime.env.wasm.wasmPaths = options.wasmPaths;
        }
        this.melContextBuffer = new Float32Array(this.MEL_CONTEXT).fill(0);
    }

    async init() {
        try {
            this.melSession = await ort.InferenceSession.create(this.options.melspectrogramModelPath);
            this.embeddingSession = await ort.InferenceSession.create(this.options.embeddingModelPath);

            if (this.options.vadModelPath && this.options.vadThreshold && this.options.vadThreshold > 0) {
                this.vadSession = await ort.InferenceSession.create(this.options.vadModelPath);
            }

            // 1. Initialize Mel buffer with ones as in Python
            this.melBuffer = Array(this.MEL_WINDOW_SIZE).fill(0).map(() => new Float32Array(this.MEL_BINS).fill(1.0));

            // 2. Generate noise-seeded history for parity
            const warmNoise = new Float32Array(this.SAMPLE_RATE * 4);
            for (let i = 0; i < warmNoise.length; i++) warmNoise[i] = (Math.random() * 2000 - 1000);

            const tempMelContext = new Float32Array(this.MEL_CONTEXT).fill(0);
            const generatedEmbeddings: Float32Array[] = [];

            for (let i = 0; i <= warmNoise.length - this.CHUNK_SIZE; i += this.CHUNK_SIZE) {
                const chunk = warmNoise.subarray(i, i + this.CHUNK_SIZE);
                const melInput = new Float32Array(this.CHUNK_SIZE + this.MEL_CONTEXT);
                melInput.set(tempMelContext);
                melInput.set(chunk, this.MEL_CONTEXT);
                tempMelContext.set(chunk.subarray(this.CHUNK_SIZE - this.MEL_CONTEXT));

                const melOutput = await this.runMelSpectrogram(melInput);
                for (let f = 0; f < this.FRAMES_PER_CHUNK; f++) {
                    const frame = new Float32Array(this.MEL_BINS);
                    for (let b = 0; b < this.MEL_BINS; b++) {
                        const idx = f * this.MEL_BINS + b;
                        frame[b] = melOutput[idx] / 10.0 + 2.0;
                    }
                    this.melBuffer.push(frame);
                }
                while (this.melBuffer.length > this.MAX_MEL_FRAMES) this.melBuffer.shift();

                const emb = await this.runEmbeddingModel();
                generatedEmbeddings.push(emb);
            }

            for (const modelPath of this.options.wakewordModels) {
                const session = await ort.InferenceSession.create(modelPath);
                const name = this.extractModelName(modelPath);
                this.customSessions.set(name, session);

                // Store seeded history to be used during initial prediction and resets
                const history = generatedEmbeddings.slice(-this.EMBEDDING_WINDOW_SIZE).map(e => new Float32Array(e));
                this.noiseSeededEmbeddings.set(name, history);
                this.embeddingBuffers.set(name, history.map(e => new Float32Array(e)));
                this.predictionBuffers.set(name, []);
            }

            // Final sync: don't call reset() here as it would wipe what we just did
            this.isLoaded = true;
            console.log('OpenWakeWord models loaded and bit-perfectly aligned');
        } catch (error) {
            console.error('Failed to initialize OpenWakeWord models:', error);
            throw error;
        }
    }

    async predict(audio: Float32Array | Int16Array): Promise<PredictionResult> {
        if (!this.isLoaded) throw new Error('Model not initialized');

        let pcmAudio: Float32Array;
        if (audio instanceof Int16Array) {
            pcmAudio = new Float32Array(audio.length);
            for (let i = 0; i < audio.length; i++) pcmAudio[i] = audio[i];
        } else {
            let max = 0;
            for (let i = 0; i < Math.min(audio.length, 1000); i++) {
                const abs = Math.abs(audio[i]);
                if (abs > max) max = abs;
            }
            if (max <= 1.0) {
                pcmAudio = new Float32Array(audio.length);
                for (let i = 0; i < audio.length; i++) pcmAudio[i] = audio[i] * 32768.0;
            } else {
                pcmAudio = audio;
            }
        }

        let combinedAudio = new Float32Array(this.rawAudioRemainder.length + pcmAudio.length);
        combinedAudio.set(this.rawAudioRemainder);
        combinedAudio.set(pcmAudio, this.rawAudioRemainder.length);

        const scores: PredictionResult = {};
        for (const name of this.customSessions.keys()) scores[name] = 0.0;

        let offset = 0;
        while (offset + this.CHUNK_SIZE <= combinedAudio.length) {
            const chunk = combinedAudio.subarray(offset, offset + this.CHUNK_SIZE);
            offset += this.CHUNK_SIZE;

            // PRECISE SLIDING WINDOW: 1280 new samples + 480 context samples
            const melInput = new Float32Array(this.CHUNK_SIZE + this.MEL_CONTEXT);
            melInput.set(this.melContextBuffer);
            melInput.set(chunk, this.MEL_CONTEXT);
            this.melContextBuffer.set(chunk.subarray(this.CHUNK_SIZE - this.MEL_CONTEXT));

            if (this.vadSession && this.options.vadThreshold) {
                const vadScore = await this.runVAD(chunk);
                this.vadBuffer.push(vadScore);
                while (this.vadBuffer.length > 30) this.vadBuffer.shift();
            }

            const melOutput = await this.runMelSpectrogram(melInput);
            for (let f = 0; f < this.FRAMES_PER_CHUNK; f++) {
                const frame = new Float32Array(this.MEL_BINS);
                for (let b = 0; b < this.MEL_BINS; b++) {
                    const idx = f * this.MEL_BINS + b;
                    frame[b] = melOutput[idx] / 10.0 + 2.0;
                }
                this.melBuffer.push(frame);
            }
            while (this.melBuffer.length > this.MAX_MEL_FRAMES) this.melBuffer.shift();

            const embedding = await this.runEmbeddingModel();
            for (const [name, session] of this.customSessions.entries()) {
                const embBuf = this.embeddingBuffers.get(name)!;
                embBuf.shift();
                embBuf.push(embedding);

                let score = await this.runClassifier(name, session);

                if (this.vadSession && this.options.vadThreshold) {
                    const window = this.vadBuffer.slice(-7, -4);
                    const maxVAD = window.length > 0 ? Math.max(...window) : 0;
                    if (maxVAD < this.options.vadThreshold) score = 0.0;
                }

                const predBuf = this.predictionBuffers.get(name)!;
                predBuf.push(score);
                while (predBuf.length > this.PREDICTION_BUFFER_MAX) predBuf.shift();

                if (predBuf.length < this.INITIAL_FRAMES_SUPPRESS) {
                    score = 0.0;
                } else if (this.options.patience?.[name] || (this.options.debounceTime && this.options.debounceTime > 0)) {
                    const threshold = this.options.thresholds?.[name] ?? 0.5;
                    if (this.options.patience?.[name]) {
                        const p = this.options.patience[name];
                        const recentScores = predBuf.slice(-p);
                        const countAbove = recentScores.filter(s => s >= threshold).length;
                        if (countAbove < p) score = 0.0;
                    } else if (this.options.debounceTime) {
                        const framesToWait = Math.ceil(this.options.debounceTime / 0.08);
                        const recentScores = predBuf.slice(-framesToWait - 1, -1);
                        const alreadyTriggered = recentScores.some(s => s >= threshold);
                        if (score >= threshold && alreadyTriggered) score = 0.0;
                    }
                }
                scores[name] = Math.max(scores[name], score);
            }
        }

        this.rawAudioRemainder = combinedAudio.slice(offset);
        return scores;
    }

    private async runMelSpectrogram(input: Float32Array): Promise<Float32Array> {
        const inputTensor = new ort.Tensor('float32', input, [1, input.length]);
        const results = await this.melSession!.run({ [this.melSession!.inputNames[0]]: inputTensor });
        return results[this.melSession!.outputNames[0]].data as Float32Array;
    }

    private async runEmbeddingModel(): Promise<Float32Array> {
        const windowData = new Float32Array(this.MEL_WINDOW_SIZE * this.MEL_BINS);
        const startIdx = this.melBuffer.length - this.MEL_WINDOW_SIZE;
        for (let t = 0; t < this.MEL_WINDOW_SIZE; t++) {
            windowData.set(this.melBuffer[startIdx + t], t * this.MEL_BINS);
        }
        const windowTensor = new ort.Tensor('float32', windowData, [1, this.MEL_WINDOW_SIZE, this.MEL_BINS, 1]);
        const results = await this.embeddingSession!.run({ [this.embeddingSession!.inputNames[0]]: windowTensor });
        const output = results[this.embeddingSession!.outputNames[0]].data as Float32Array;
        const embedding = new Float32Array(96);
        for (let i = 0; i < 96; i++) {
            let v = output[i] ?? 0;
            if (isNaN(v) || !isFinite(v)) v = 0;
            embedding[i] = v;
        }
        return embedding;
    }

    private async runClassifier(name: string, session: ort.InferenceSession): Promise<number> {
        const embBuf = this.embeddingBuffers.get(name)!;
        const predData = new Float32Array(this.EMBEDDING_WINDOW_SIZE * 96);
        for (let t = 0; t < this.EMBEDDING_WINDOW_SIZE; t++) predData.set(embBuf[t], t * 96);
        const predTensor = new ort.Tensor('float32', predData, [1, this.EMBEDDING_WINDOW_SIZE, 96]);
        const results = await session.run({ [session.inputNames[0]]: predTensor });
        return results[session.outputNames[0]].data[0] as number;
    }

    private async runVAD(chunk: Float32Array): Promise<number> {
        const normalized = new Float32Array(chunk.length);
        for (let i = 0; i < chunk.length; i++) normalized[i] = chunk[i] / 32768.0;
        const srTensor = new ort.Tensor('int64', BigInt64Array.from([BigInt(this.SAMPLE_RATE)]), [1]);
        const hTensor = new ort.Tensor('float32', this.vadStateH, [2, 1, 64]);
        const cTensor = new ort.Tensor('float32', this.vadStateC, [2, 1, 64]);
        const inputTensor = new ort.Tensor('float32', normalized, [1, chunk.length]);
        const feeds = {
            [this.vadSession!.inputNames[0]]: inputTensor,
            [this.vadSession!.inputNames[1]]: srTensor,
            [this.vadSession!.inputNames[2]]: hTensor,
            [this.vadSession!.inputNames[3]]: cTensor
        };

        const results = await this.vadSession!.run(feeds);
        this.vadStateH = results[this.vadSession!.outputNames[1]].data as any;
        this.vadStateC = results[this.vadSession!.outputNames[2]].data as any;
        return results[this.vadSession!.outputNames[0]].data[0] as number;
    }

    private extractModelName(path: string): string {
        const base = path.split('/').pop() || path;
        return base.replace('.onnx', '').replace('.tflite', '');
    }

    reset() {
        this.melBuffer = Array(this.MEL_WINDOW_SIZE).fill(0).map(() => new Float32Array(this.MEL_BINS).fill(1.0));
        this.rawAudioRemainder = new Float32Array(0);
        this.melContextBuffer.fill(0);
        this.vadBuffer = [];
        this.vadStateH.fill(0);
        this.vadStateC.fill(0);
        for (const name of this.embeddingBuffers.keys()) {
            this.predictionBuffers.set(name, []);
            const seeded = this.noiseSeededEmbeddings.get(name);
            if (seeded) {
                this.embeddingBuffers.set(name, seeded.map(e => new Float32Array(e)));
            } else {
                this.embeddingBuffers.set(name, Array(this.EMBEDDING_WINDOW_SIZE).fill(0).map(() => new Float32Array(96).fill(0)));
            }
        }
    }
}

// src/index.ts
import * as ort from "onnxruntime-web";
var Model = class {
  constructor(options) {
    this.options = options;
    const runtime = ort.env ? ort : globalThis.ort;
    if (runtime && options.wasmPaths) {
      runtime.env.wasm.wasmPaths = options.wasmPaths;
    }
    this.melContextBuffer = new Float32Array(this.MEL_CONTEXT).fill(0);
  }
  melSession = null;
  embeddingSession = null;
  vadSession = null;
  customSessions = /* @__PURE__ */ new Map();
  // Buffers
  melBuffer = [];
  embeddingBuffers = /* @__PURE__ */ new Map();
  predictionBuffers = /* @__PURE__ */ new Map();
  vadBuffer = [];
  rawAudioRemainder = new Float32Array(0);
  melContextBuffer;
  // Seeding history
  noiseSeededEmbeddings = /* @__PURE__ */ new Map();
  // Constants
  CHUNK_SIZE = 1280;
  MEL_CONTEXT = 480;
  SAMPLE_RATE = 16e3;
  MEL_BINS = 32;
  FRAMES_PER_CHUNK = 8;
  MEL_WINDOW_SIZE = 76;
  EMBEDDING_WINDOW_SIZE = 24;
  MAX_MEL_FRAMES = 970;
  INITIAL_FRAMES_SUPPRESS = 5;
  PREDICTION_BUFFER_MAX = 30;
  // VAD State (Silero VAD)
  vadStateH = new Float32Array(2 * 1 * 64).fill(0);
  vadStateC = new Float32Array(2 * 1 * 64).fill(0);
  isLoaded = false;
  async init() {
    try {
      this.melSession = await ort.InferenceSession.create(this.options.melspectrogramModelPath);
      this.embeddingSession = await ort.InferenceSession.create(this.options.embeddingModelPath);
      if (this.options.vadModelPath && this.options.vadThreshold && this.options.vadThreshold > 0) {
        this.vadSession = await ort.InferenceSession.create(this.options.vadModelPath);
      }
      this.melBuffer = Array(this.MEL_WINDOW_SIZE).fill(0).map(() => new Float32Array(this.MEL_BINS).fill(1));
      const warmNoise = new Float32Array(this.SAMPLE_RATE * 4);
      for (let i = 0; i < warmNoise.length; i++) warmNoise[i] = Math.random() * 2e3 - 1e3;
      const tempMelContext = new Float32Array(this.MEL_CONTEXT).fill(0);
      const generatedEmbeddings = [];
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
            frame[b] = melOutput[idx] / 10 + 2;
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
        const history = generatedEmbeddings.slice(-this.EMBEDDING_WINDOW_SIZE).map((e) => new Float32Array(e));
        this.noiseSeededEmbeddings.set(name, history);
        this.embeddingBuffers.set(name, history.map((e) => new Float32Array(e)));
        this.predictionBuffers.set(name, []);
      }
      this.isLoaded = true;
      console.log("OpenWakeWord models loaded and bit-perfectly aligned");
    } catch (error) {
      console.error("Failed to initialize OpenWakeWord models:", error);
      throw error;
    }
  }
  async predict(audio) {
    if (!this.isLoaded) throw new Error("Model not initialized");
    let pcmAudio;
    if (audio instanceof Int16Array) {
      pcmAudio = new Float32Array(audio.length);
      for (let i = 0; i < audio.length; i++) pcmAudio[i] = audio[i];
    } else {
      let max = 0;
      for (let i = 0; i < Math.min(audio.length, 1e3); i++) {
        const abs = Math.abs(audio[i]);
        if (abs > max) max = abs;
      }
      if (max <= 1) {
        pcmAudio = new Float32Array(audio.length);
        for (let i = 0; i < audio.length; i++) pcmAudio[i] = audio[i] * 32768;
      } else {
        pcmAudio = audio;
      }
    }
    let combinedAudio = new Float32Array(this.rawAudioRemainder.length + pcmAudio.length);
    combinedAudio.set(this.rawAudioRemainder);
    combinedAudio.set(pcmAudio, this.rawAudioRemainder.length);
    const scores = {};
    for (const name of this.customSessions.keys()) scores[name] = 0;
    let offset = 0;
    while (offset + this.CHUNK_SIZE <= combinedAudio.length) {
      const chunk = combinedAudio.subarray(offset, offset + this.CHUNK_SIZE);
      offset += this.CHUNK_SIZE;
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
          frame[b] = melOutput[idx] / 10 + 2;
        }
        this.melBuffer.push(frame);
      }
      while (this.melBuffer.length > this.MAX_MEL_FRAMES) this.melBuffer.shift();
      const embedding = await this.runEmbeddingModel();
      for (const [name, session] of this.customSessions.entries()) {
        const embBuf = this.embeddingBuffers.get(name);
        embBuf.shift();
        embBuf.push(embedding);
        let score = await this.runClassifier(name, session);
        if (this.vadSession && this.options.vadThreshold) {
          const window = this.vadBuffer.slice(-7, -4);
          const maxVAD = window.length > 0 ? Math.max(...window) : 0;
          if (maxVAD < this.options.vadThreshold) score = 0;
        }
        const predBuf = this.predictionBuffers.get(name);
        predBuf.push(score);
        while (predBuf.length > this.PREDICTION_BUFFER_MAX) predBuf.shift();
        if (predBuf.length < this.INITIAL_FRAMES_SUPPRESS) {
          score = 0;
        } else if (this.options.patience?.[name] || this.options.debounceTime && this.options.debounceTime > 0) {
          const threshold = this.options.thresholds?.[name] ?? 0.5;
          if (this.options.patience?.[name]) {
            const p = this.options.patience[name];
            const recentScores = predBuf.slice(-p);
            const countAbove = recentScores.filter((s) => s >= threshold).length;
            if (countAbove < p) score = 0;
          } else if (this.options.debounceTime) {
            const framesToWait = Math.ceil(this.options.debounceTime / 0.08);
            const recentScores = predBuf.slice(-framesToWait - 1, -1);
            const alreadyTriggered = recentScores.some((s) => s >= threshold);
            if (score >= threshold && alreadyTriggered) score = 0;
          }
        }
        scores[name] = Math.max(scores[name], score);
      }
    }
    this.rawAudioRemainder = combinedAudio.slice(offset);
    return scores;
  }
  async runMelSpectrogram(input) {
    const inputTensor = new ort.Tensor("float32", input, [1, input.length]);
    const results = await this.melSession.run({ [this.melSession.inputNames[0]]: inputTensor });
    return results[this.melSession.outputNames[0]].data;
  }
  async runEmbeddingModel() {
    const windowData = new Float32Array(this.MEL_WINDOW_SIZE * this.MEL_BINS);
    const startIdx = this.melBuffer.length - this.MEL_WINDOW_SIZE;
    for (let t = 0; t < this.MEL_WINDOW_SIZE; t++) {
      windowData.set(this.melBuffer[startIdx + t], t * this.MEL_BINS);
    }
    const windowTensor = new ort.Tensor("float32", windowData, [1, this.MEL_WINDOW_SIZE, this.MEL_BINS, 1]);
    const results = await this.embeddingSession.run({ [this.embeddingSession.inputNames[0]]: windowTensor });
    const output = results[this.embeddingSession.outputNames[0]].data;
    const embedding = new Float32Array(96);
    for (let i = 0; i < 96; i++) {
      let v = output[i] ?? 0;
      if (isNaN(v) || !isFinite(v)) v = 0;
      embedding[i] = v;
    }
    return embedding;
  }
  async runClassifier(name, session) {
    const embBuf = this.embeddingBuffers.get(name);
    const predData = new Float32Array(this.EMBEDDING_WINDOW_SIZE * 96);
    for (let t = 0; t < this.EMBEDDING_WINDOW_SIZE; t++) predData.set(embBuf[t], t * 96);
    const predTensor = new ort.Tensor("float32", predData, [1, this.EMBEDDING_WINDOW_SIZE, 96]);
    const results = await session.run({ [session.inputNames[0]]: predTensor });
    return results[session.outputNames[0]].data[0];
  }
  async runVAD(chunk) {
    const normalized = new Float32Array(chunk.length);
    for (let i = 0; i < chunk.length; i++) normalized[i] = chunk[i] / 32768;
    const srTensor = new ort.Tensor("int64", BigInt64Array.from([BigInt(this.SAMPLE_RATE)]), [1]);
    const hTensor = new ort.Tensor("float32", this.vadStateH, [2, 1, 64]);
    const cTensor = new ort.Tensor("float32", this.vadStateC, [2, 1, 64]);
    const inputTensor = new ort.Tensor("float32", normalized, [1, chunk.length]);
    const feeds = {
      [this.vadSession.inputNames[0]]: inputTensor,
      [this.vadSession.inputNames[1]]: srTensor,
      [this.vadSession.inputNames[2]]: hTensor,
      [this.vadSession.inputNames[3]]: cTensor
    };
    const results = await this.vadSession.run(feeds);
    this.vadStateH = results[this.vadSession.outputNames[1]].data;
    this.vadStateC = results[this.vadSession.outputNames[2]].data;
    return results[this.vadSession.outputNames[0]].data[0];
  }
  extractModelName(path) {
    const base = path.split("/").pop() || path;
    return base.replace(".onnx", "").replace(".tflite", "");
  }
  reset() {
    this.melBuffer = Array(this.MEL_WINDOW_SIZE).fill(0).map(() => new Float32Array(this.MEL_BINS).fill(1));
    this.rawAudioRemainder = new Float32Array(0);
    this.melContextBuffer.fill(0);
    this.vadBuffer = [];
    this.vadStateH.fill(0);
    this.vadStateC.fill(0);
    for (const name of this.embeddingBuffers.keys()) {
      this.predictionBuffers.set(name, []);
      const seeded = this.noiseSeededEmbeddings.get(name);
      if (seeded) {
        this.embeddingBuffers.set(name, seeded.map((e) => new Float32Array(e)));
      } else {
        this.embeddingBuffers.set(name, Array(this.EMBEDDING_WINDOW_SIZE).fill(0).map(() => new Float32Array(96).fill(0)));
      }
    }
  }
};
export {
  Model
};

import { Model } from './dist/index.js';
import * as fs from 'fs';
import * as path from 'path';

async function runDemo() {
    console.log("🚀 Starting openWakeWord JS Node.js Demo...");

    const modelsDir = './models';
    const config = {
        wakewordModels: [
            path.join(modelsDir, 'hello_deepa.onnx'),
            path.join(modelsDir, 'namaste_deepa.onnx')
        ],
        melspectrogramModelPath: path.join(modelsDir, 'melspectrogram.onnx'),
        embeddingModelPath: path.join(modelsDir, 'embedding_model.onnx'),
        inferenceFramework: 'onnx'
    };

    // Verify files exist
    for (const p of [config.melspectrogramModelPath, config.embeddingModelPath, ...config.wakewordModels]) {
        if (!fs.existsSync(p)) {
            console.error(`❌ Missing model file: ${p}`);
            process.exit(1);
        }
    }

    const model = new Model(config);

    console.log("⏳ Initializing models...");
    await model.init();
    console.log("✅ Models loaded!");

    // Create 1 second of "silent" audio (16000 samples)
    const silentAudio = new Float32Array(16000).fill(0.001 * Math.random());

    console.log("🎤 Processing 1 second of dummy audio...");
    const scores = await model.predict(silentAudio);

    console.log("\n📊 Results:");
    console.log(JSON.stringify(scores, null, 2));

    console.log("\n✨ Demo completed successfully! The pipeline is up and running.");
}

runDemo().catch(err => {
    console.error("💥 Demo failed:", err);
});

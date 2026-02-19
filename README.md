# openWakeWord-JS

**The high-performance, precision JavaScript/TypeScript port of openWakeWord.**

[![NPM Version](https://img.shields.io/npm/v/openwakeword-js.svg)](https://www.npmjs.com/package/openwakeword-js)
[![License](https://img.shields.io/npm/l/openwakeword-js.svg)](https://github.com/Firojpaudel/OpenWakeWord_npm_porting/blob/main/LICENSE)

A high-accuracy, 100% logic-aligned port of [openWakeWord](https://github.com/dscripka/openWakeWord). This implementation is designed to match the original Python behavior bit-for-bit, ensuring that your custom models perform exactly as they did in training.

---

## Technical Features

- **Signal Parity**: Matches the original Python Mel spectrogram transforms (linear `x/10 + 2` scaling) and log-mel clamping.
- **Sliding Window Inference**: Implements the required 76-frame mel context for embeddings and 24-frame embedding context for classifiers.
- **Privacy First**: 100% local execution. No audio data ever leaves the user's device.
- **Hardware Acceleration**: Optimized via ONNX Runtime Web using WebAssembly (WASM) with SIMD and Multi-threading.
- **VAD Integration**: Optional Silero VAD gating to reduce CPU usage and prevent false triggers in silence.

---

## Step-by-Step Setup Guide

For a developer to recreate the full pipeline from scratch, follow these exact steps:

### 1. Installation
In your project directory, install the core library and the ONNX runtime:
```bash
npm install openwakeword-js onnxruntime-web
```

### 2. Automatic Asset Initialization
Run this command from your project root to automatically download the base models and copy the required WebAssembly binaries:

```bash
npx openwakeword-js-setup
```

### 3. Training & Models
You will need a specific wake word model (classifier) for your chosen phrase.
- **Download Official Models**: You can find many pre-trained `.onnx` models (like `alexa.onnx`) in the [original repository](https://github.com/dscripka/openWakeWord).
- **Train Your Own**: Use this [Kaggle Notebook](https://www.kaggle.com/code/firojpaudel/deepa-wise) to train a custom model for any word, then download the exported `.onnx` file and put it in your `./models/` folder.

---

## The Execution Pipeline

Understanding how the data flows helps in debugging and implementation:

1.  **Audio In**: Feed 16kHz Mono audio chunks (typically 1280 samples / 80ms).
2.  **Mel Processing**: The library converts audio into Mel Spectrograms using `melspectrogram.onnx`.
3.  **Embedding Generation**: Every 8 Mel frames (shifted) generates one Embedding vector via `embedding_model.onnx`.
4.  **Classification**: Your custom model looks at a window of 24 embeddings to decide if the word was spoken.

---

## Usage Example (TypeScript / JavaScript)

```typescript
import { Model } from 'openwakeword-js';

// Configuration
const model = new Model({
  // 1. Path to your phrase model (e.g., from Kaggle or Official repo)
  wakewordModels: ['./models/my_custom_model.onnx'],
  
  // 2. Paths to the feature extraction models (created by download-models)
  melspectrogramModelPath: './models/melspectrogram.onnx',
  embeddingModelPath: './models/embedding_model.onnx',
  
  // 3. Optional VAD config
  vadModelPath: './models/silero_vad.onnx',
  vadThreshold: 0.5,

  inferenceFramework: 'onnx',
  
  // 4. Direction to WASM binaries (required for browser context)
  wasmPaths: './models/' 
});

// Initialize (Downloads/Loads models into memory)
await model.init();

/**
 * Feed audio chunks.
 * inputData can be a Float32Array (normalized -1 to 1) 
 * or an Int16Array (raw PCM 16-bit).
 */
const scores = await model.predict(inputData);

// Output format: { "my_custom_model": 0.85 }
if (scores["my_custom_model"] > 0.5) {
    console.log("Wake word detected locally!");
}
```

---

## Local Development & Demo

### Option A: The Fast Start (Automated)
If you just want to see it working:
1. `npm install openwakeword-js onnxruntime-web`
2. `npx openwakeword-js-setup`
3. `npx serve .` 
4. Open `http://localhost:3000`

### Option B: Manual Development
If you are developing inside this repository:
1. Clone the repo and run `npm install`.
2. Run `npm run download-models`.
3. Serve the root directory using a static server (e.g., `npx serve .`).
4. Navigate to `http://localhost:3000/example/index.html`.

---

## Credits
This package is a JavaScript port of the work by **David Scripka**. We encourage support for the original project's research and model training infrastructure.

## License
Apache-2.0

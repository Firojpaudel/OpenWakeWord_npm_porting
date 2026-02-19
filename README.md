# openWakeWord-JS

A high-accuracy, 100% logic-aligned JavaScript/TypeScript port of [openWakeWord](https://github.com/dscripka/openWakeWord). Designed for browser-first execution using ONNX Runtime Web, with Node.js support.

## Credits & Acknowledgments
This package is a JavaScript port of the excellent work by **David Scripka**. For the full Python implementation, training scripts, and model details, please visit the original repository:
👉 **[Original openWakeWord Repository](https://github.com/dscripka/openWakeWord)**

## Key Features
- **Bit-Perfect Parity**: Matches the original Python implementation's Mel spectrogram transforms, sliding windows, and VAD gating logic.
- **Privacy First**: Voice processing runs **entirely on the user's local machine** (browser/Node.js). No audio data is ever sent to a server.
- **High Performance**: Leverages WebAssembly (WASM) with SIMD for hardware-accelerated inference.
- **Customizable**: Load any openWakeWord ONNX models directly.

## Installation

```bash
npm install @openwakeword/js onnxruntime-web
```

## Required Assets
To run wake word detection, you need the following ONNX models (available in the original repo):
1.  `melspectrogram.onnx`: Audio feature extractor.
2.  `embedding_model.onnx`: Feature embedding generator.
3.  **Your Wake Word Model**: (e.g., `alexa.onnx`, `hey_deepa.onnx`).

### Browser Requirements
When running in a browser, ensure you serve the ONNX Runtime WASM files or point to a CDN:
```typescript
const model = new Model({
  // ...
  wasmPaths: 'https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/' 
});
```

## Quick Start

```typescript
import { Model } from '@openwakeword/js';

// 1. Initialize the model
const model = new Model({
  wakewordModels: ['./models/my_wakeword.onnx'],
  melspectrogramModelPath: './models/melspectrogram.onnx',
  embeddingModelPath: './models/embedding_model.onnx',
  vadModelPath: './models/silero_vad.onnx', // Optional
  vadThreshold: 0.5, // Optional
  inferenceFramework: 'onnx'
});

await model.init();

// 2. Feed audio chunks (16kHz, mono, Float32Array or Int16Array)
// Recommended chunk size: 1280 samples (80ms)
const audioChunk = ...; 
const scores = await model.predict(audioChunk);

console.log(scores); // { "my_wakeword": 0.82 }
```

## License
Apache-2.0 (Matched with the original openWakeWord license)

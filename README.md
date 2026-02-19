# openWakeWord-JS

A high-accuracy, 100% logic-aligned JavaScript/TypeScript port of [openWakeWord](https://github.com/dscripka/openWakeWord). Designed for browser-first execution using ONNX Runtime Web, with Node.js support.

## Credits & Acknowledgments
This package is a JavaScript port of the work by David Scripka. 
[Original openWakeWord Repository](https://github.com/dscripka/openWakeWord)

---

## Getting Started (Technical Overview)

To use this package, you need to understand the main directories:
1.  **`node_modules/`**: Created automatically when you run `npm install`. Contains all the external libraries (like ONNX Runtime) that this package needs to run.
2.  **`dist/`**: Created when you run `npm run build` (or provided by the NPM package). It contains the compiled "ready-to-use" JavaScript files.
3.  **`models/`**: You must create this folder and put the required `.onnx` and `.wasm` files inside it.

### Required Model Assets
You need at least three models to detect a wake word:
- `melspectrogram.onnx`: Audio feature extractor.
- `embedding_model.onnx`: Feature embedding generator.
- **Your Custom Model**: (e.g., `hey_deepa.onnx`). The specific phrase model.
- `silero_vad.onnx` (Optional): Voice Activity Detection for improved accuracy.

> [!NOTE]
> You can generate your own custom wake word models using this [Kaggle Notebook Link](https://www.kaggle.com/code/firojpaudel/deepa-wise).

---

## Installation & Setup

### 1. Install the package
```bash
npm install openwakeword-js onnxruntime-web
```

### 2. Prepare the `models/` folder
Create a folder named `models` in your project's root. You need the `.onnx` models there. 

**Automated Setup:**
Run this command to automatically download the base models (`melspectrogram`, `embedding`, and `silero_vad`) from the original repository:
```bash
npm run download-models
```

**Manual Setup:**
If you prefer to download them manually, make sure these files are in your `models/` folder:
- `melspectrogram.onnx`
- `embedding_model.onnx`
- `silero_vad.onnx` (Optional but recommended)
- **Your custom wake word model** (e.g., `hey_deepa.onnx`)

**Browser Requirements:** Browsers need the `.wasm` (WebAssembly) files to run the models at high speed. 
- You can copy them from `node_modules/onnxruntime-web/dist/*.wasm` into your `models/` folder.
- Or use a CDN by setting the `wasmPaths` in the constructor.

---

## Usage Example

```typescript
import { Model } from 'openwakeword-js';

const model = new Model({
  wakewordModels: ['./models/my_custom_model.onnx'],
  melspectrogramModelPath: './models/melspectrogram.onnx',
  embeddingModelPath: './models/embedding_model.onnx',
  
  // Optional VAD for better accuracy in noisy environments
  vadModelPath: './models/silero_vad.onnx',
  vadThreshold: 0.5,

  inferenceFramework: 'onnx',
  
  // Browser ONLY: Direction to WASM files
  wasmPaths: './models/' 
});

await model.init();

// Feed 1280 samples of 16kHz mono audio
const scores = await model.predict(audioChunk);
console.log(scores); 
```

## Privacy
Voice processing runs entirely on the user's local machine. No audio data is transmitted to external servers.

## License
Apache-2.0

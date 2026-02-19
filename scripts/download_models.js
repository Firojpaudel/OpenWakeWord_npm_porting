import fs from 'fs';
import path from 'path';
import https from 'https';

const MODELS_DIR = path.join(process.cwd(), 'models');

const MODELS = {
    'melspectrogram.onnx': 'https://github.com/dscripka/openWakeWord/raw/main/openwakeword/resources/models/melspectrogram.onnx',
    'embedding_model.onnx': 'https://github.com/dscripka/openWakeWord/raw/main/openwakeword/resources/models/embedding_model.onnx',
    'silero_vad.onnx': 'https://github.com/dscripka/openWakeWord/raw/main/openwakeword/resources/models/silero_vad.onnx'
};

async function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                downloadFile(response.headers.location, dest).then(resolve).catch(reject);
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
}

async function main() {
    if (!fs.existsSync(MODELS_DIR)) {
        fs.mkdirSync(MODELS_DIR);
        console.log(`Created directory: ${MODELS_DIR}`);
    }

    console.log('Downloading base openWakeWord models...');
    for (const [name, url] of Object.entries(MODELS)) {
        const dest = path.join(MODELS_DIR, name);
        if (fs.existsSync(dest)) {
            console.log(`- ${name} already exists, skipping.`);
            continue;
        }
        process.stdout.write(`- Downloading ${name}... `);
        try {
            await downloadFile(url, dest);
            console.log('Complete.');
        } catch (err) {
            console.log(`Failed: ${err.message}`);
        }
    }
    console.log('\nBase models are ready in the ./models folder.');

    // Automate WASM copying for browser users
    console.log('Locating ONNX Runtime WebAssembly files...');
    const nodeModulesPath = path.join(process.cwd(), 'node_modules', 'onnxruntime-web', 'dist');

    if (fs.existsSync(nodeModulesPath)) {
        const wasmFiles = fs.readdirSync(nodeModulesPath).filter(f => f.endsWith('.wasm'));
        for (const file of wasmFiles) {
            const src = path.join(nodeModulesPath, file);
            const dest = path.join(MODELS_DIR, file);
            fs.copyFileSync(src, dest);
            console.log(`- Copied ${file} to ./models/`);
        }
        console.log('WebAssembly files are ready for browser deployment.');
    } else {
        console.log('Warning: onnxruntime-web not found in node_modules. Run "npm install" first.');
    }

    console.log('\nCustom wake word models should be added to the same folder.');
}

main().catch(console.error);

#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.join(__dirname, '..');
const MODELS_DIR = path.join(process.cwd(), 'models');

const MODELS = {
    'melspectrogram.onnx': 'https://github.com/dscripka/openWakeWord/raw/main/openwakeword/resources/models/melspectrogram.onnx',
    'embedding_model.onnx': 'https://github.com/dscripka/openWakeWord/raw/main/openwakeword/resources/models/embedding_model.onnx',
    'silero_vad.onnx': 'https://github.com/dscripka/openWakeWord/raw/main/openwakeword/resources/models/silero_vad.onnx',
    'hello_deepa.onnx': 'https://github.com/Firojpaudel/OpenWakeWord_npm_porting/raw/main/models/hello_deepa.onnx',
    'namaste_deepa.onnx': 'https://github.com/Firojpaudel/OpenWakeWord_npm_porting/raw/main/models/namaste_deepa.onnx'
};

async function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                downloadFile(response.headers.location, dest).then(resolve).catch(reject);
                return;
            }
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download: ${response.statusCode} for ${url}`));
                return;
            }
            const file = fs.createWriteStream(dest);
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            if (fs.existsSync(dest)) fs.unlinkSync(dest);
            reject(err);
        });
    });
}

function copyIfExists(src, dest, label) {
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`- ${label}: ${path.basename(dest)}`);
        return true;
    }
    return false;
}

async function main() {
    if (!fs.existsSync(MODELS_DIR)) {
        fs.mkdirSync(MODELS_DIR);
        console.log(`Created directory: ${MODELS_DIR}`);
    }

    console.log('Downloading neural model binaries...');
    for (const [name, url] of Object.entries(MODELS)) {
        const dest = path.join(MODELS_DIR, name);
        if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
            console.log(`- ${name} already exists and validated, skipping.`);
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
    console.log('\nAI Model deployment complete.');

    console.log('\nDeploying ONNX Runtime WebAssembly environment...');
    const nodeModulesPath = path.join(process.cwd(), 'node_modules', 'onnxruntime-web', 'dist');

    if (fs.existsSync(nodeModulesPath)) {
        // Copy EVERYTHING starting with ort-wasm to ensure all loaders/workers are present
        const runtimeFiles = fs.readdirSync(nodeModulesPath).filter(f =>
            f.startsWith('ort-wasm') && (f.endsWith('.wasm') || f.endsWith('.mjs') || f.endsWith('.js'))
        );
        for (const file of runtimeFiles) {
            copyIfExists(path.join(nodeModulesPath, file), path.join(MODELS_DIR, file), 'RUNTIME');
        }
    } else {
        console.log('Warning: onnxruntime-web not found in node_modules. Standard inference may fail.');
    }

    console.log('\nDeploying optimized AI Listening Interface...');
    const exampleHtml = path.join(packageRoot, 'index.html');
    const destHtml = path.join(process.cwd(), 'index.html');
    copyIfExists(exampleHtml, destHtml, 'UI');

    const libSrc = path.join(packageRoot, 'dist', 'index.js');
    const libDest = path.join(process.cwd(), 'openwakeword.mjs');
    copyIfExists(libSrc, libDest, 'Library');

    console.log('\n----------------------------------------------------');
    console.log('SETUP COMPLETE (v0.1.15)');
    console.log('----------------------------------------------------');
    console.log('Your precision AI wake word interface is ready.');
    console.log('\nTo start the demo:');
    console.log('1. Run: npx serve .');
    console.log('2. Open: http://localhost:3000');
    console.log('\nHappy coding!');
    console.log('----------------------------------------------------\n');
}

main().catch(console.error);

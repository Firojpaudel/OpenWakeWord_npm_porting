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
    console.log('Custom wake word models should be added to the same folder.');
}

main().catch(console.error);

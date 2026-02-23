import * as ort from 'onnxruntime-web';
import { Model } from './index.js';

let model: Model | null = null;

self.onmessage = async (e) => {
    const { type, data } = e.data;

    if (type === 'init') {
        try {
            model = new Model(data.options);
            await model.init();
            self.postMessage({ type: 'init-complete' });
        } catch (err: any) {
            self.postMessage({ type: 'error', message: err.message });
        }
    } else if (type === 'predict') {
        if (!model) return;
        try {
            const results = await model.predict(data.audio);
            self.postMessage({ type: 'results', results });
        } catch (err: any) {
            self.postMessage({ type: 'error', message: err.message });
        }
    } else if (type === 'reset') {
        if (model) model.reset();
    }
};

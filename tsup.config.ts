import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts', 'src/worker.ts'],
    format: ['esm'],
    dts: true,
    splitting: false,
    sourcemap: false,
    clean: true,
    noExternal: ['onnxruntime-web'],
    minify: true,
    platform: 'browser',
    target: 'es2022',
    define: {
        'process.env.NODE_ENV': '"production"',
    },
    bundle: true,
});

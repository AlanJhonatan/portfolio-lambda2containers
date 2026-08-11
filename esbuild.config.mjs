import * as esbuild from 'esbuild'

await esbuild.build({
    entryPoints: ['src/infra/http/lambda.ts'],
    outfile: 'dist/lambda.mjs',
    platform: 'node',
    target: 'node24',
    format: 'esm',
    bundle: true,
    minify: true,
    sourcemap: false,
    banner: {
        js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);",
    },
})
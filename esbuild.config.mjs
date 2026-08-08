import * as esbuild from 'esbuild'

await esbuild.build({
    entryPoints: ['src/infra/http/lambda.ts'],
    outfile: 'dist/lambda.mjs',
    platform: 'node',
    target: 'node24',
    bundle: true,
    minify: true,
    sourcemap: false,
})
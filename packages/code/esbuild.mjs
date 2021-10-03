import esbuild from "esbuild"


import * as importMap from "esbuild-plugin-import-map";

import jsonData from './js/importmap.json'

importMap.load(jsonData);

esbuild.build({
    entryPoints: ['js/codeLoader.mjs'],
    bundle: true,
    format: 'esm',
    minify: false,
    sourcemap: false,
    target: ['es2018'],
    plugins: [importMap.plugin()],
    outfile: 'build.mjs',
}).catch(() => process.exit(1))
import esbuild from "esbuild"


import * as importMap from "esbuild-plugin-import-map";

import jsonData from './js/importmap.json'

const importData = Object.keys(jsonData.imports).filter(name=>!name.includes("@zedvision"))

let imports = {};
importData.map(d=>(Object.assign(imports,{[d]:jsonData.imports[d]})));


importMap.load({
    imports
});

console.log(imports)

esbuild.build({
    entryPoints: ['js/codeLoader.mjs'],
    bundle: true,
    format: 'esm',
    minify: false,
    treeShaking: true,
    target: "browser",
    sourcemap: false,
    resolveExtensions: [".tsx",".ts",".jsx",".js",".css",".json",".mjs"],
    target: ['es2018'],
    plugins: [importMap.plugin()],
    outfile: 'dev.mjs',
}).catch(() => process.exit(1))

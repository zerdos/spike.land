import esbuild from "esbuild";

import * as importMap from "esbuild-plugin-import-map";

import jsonData from "./js/importmap.json" assert { type: "json" };

// const impData = jsonData.imports;
// console.log(jsonData.imports);

// const importData = Object.keys(jsonData.imports).filter((name) =>
//   !name.includes("@spike.land") || name.includes("@spike.land/esm")
// );

// let imports = {};
// importData.map((d) => (Object.assign(imports, { [d]: jsonData.imports[d] })));

importMap.load(jsonData);

// console.log(imports);

// esbuild.build({
//   entryPoints: ["js/codeLoader.mjs"],
//   bundle: true,
//   format: "esm",
//   minify: false,
//   treeShaking: false,
//   sourcemap: true,
//   resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".css", ".json", ".mjs"],
//   target: ["es2018"],
//   plugins: [importMap.plugin()],
//   outfile: "dist/dev.mjs",
// }).catch(() => process.exit(1));
const build = (entryPoints) =>
  esbuild.build({
    entryPoints,
    "outExtension": { ".js": ".mjs" },
    bundle: true,
    format: "esm",
    minify: true,
    splitting: true,
    allowOverwrite: true,
    treeShaking: true,
    platform: "browser",
    outbase: "./js/",
    sourcemap: true,
    resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".css", ".json", ".mjs"],
    target: ["esnext"],
    plugins: [importMap.plugin()],
    outdir: "dist",
  }).catch(() => process.exit(1));

await build([
  "js/session.tsx",
  "js/mui.tsx",
]);

await build([
  //   "js/renderPreviewWindow.tsx",
  //   "js/templates.ts",
  //   "js/renderToString.tsx",
  "js/startMonaco.ts",
]);

await await build([
  "js/quickStart.mjs",
]);

// esbuild.build({
//   entryPoints: [
//     "js/mui.ts",
//   ],
//   "outExtension": { ".js": ".mjs" },
//   bundle: true,
//   format: "esm",
//   minify: true,

//   splitting: true,
//   treeShaking: true,
//   platform: "browser",
//   sourcemap: false,
//   resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".css", ".json", ".mjs"],
//   target: ["es2020"],
//   plugins: [importMap.plugin()],
//   outdir: "dist",
// }).catch(() => process.exit(1));

// esbuild.build({
//   entryPoints: ["js/ws.mjs"],
//   bundle: true,
//   format: "esm",
//   minify: false,
//   treeShaking: false,
//   sourcemap: true,
//   resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".css", ".json", ".mjs"],
//   target: ["es2018"],
//   plugins: [importMap.plugin()],
//   outfile: "dist/ws.mjs",
// }).catch(() => process.exit(1));

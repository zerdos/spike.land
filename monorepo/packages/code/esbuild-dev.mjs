import esbuild from "esbuild";
import * as importMap from "esbuild-plugin-import-map";
import { jsxImportSourcePlugin } from 'esbuild-plugin-jsximportsource';

import jsonData from "./js/importmap.json" assert { type: "json" };

const environment = process.env.NODE_ENV === "production"
  ? "production"
  : "development";

const isDevelopment = environment === "development"
importMap.load(jsonData);
const importMapPlugin = importMap.plugin();

console.log(`
-------------------------------------------------
--------------${environment}---------------------
-------------------------------------------------`);

const workerEntryPoints = [
  // "vs/language/json/json.worker.js",
  // "vs/language/css/css.worker.js",
  // "vs/language/html/html.worker.js",
  "vs/language/typescript/ts.worker.js",
  "vs/editor/editor.worker.js",
].map((entry) => `monaco-editor/esm/${entry}`);

await esbuild.build({
  entryPoints: [
    ...workerEntryPoints,
    // "./js/workers/prettier.worker.js",
  ],
  bundle: true,
  minify: !isDevelopment,
  minifyWhitespace: !isDevelopment,
  minifyIdentifiers: !isDevelopment,
  minifySyntax: !isDevelopment,
  treeShaking: true,
  ignoreAnnotations: true,
  legalComments: "none",
  ignoreAnnotations: true,
  treeShaking: true,
  // outExtension: {".js": ".workerJS"},
  platform: "browser",
  define: {
    "process.env.NODE_ENV": `"${environment}"`,
  },
  format: "iife",
  plugins: [jsxImportSourcePlugin()],
  loader: {
    ".css": "css",
    ".ttf": "file",
  },

  outdir: "js/public/workers/",
});

await esbuild.build({
  entryPoints: ["./js/appStarter.ts"],
  outfile: "./js/public/appStarter.js",
  bundle: true,
  target: "esnext",
  minify: !isDevelopment,
  minifyWhitespace: !isDevelopment,
  minifyIdentifiers: !isDevelopment,
  minifySyntax: !isDevelopment,
  legalComments: "none",
  ignoreAnnotations: true,
  treeShaking: true,



  platform: "browser",
  define: {
    "process.env.NODE_ENV": `"${environment}"`,
  },

  format: "iife",
});

const build = (entryPoints) =>
  esbuild.build({
    entryPoints,
    "outExtension": { ".js": ".mjs" },
    bundle: true,
    format: "esm",
  
    sourcemap: false,
  
    minify: !isDevelopment,
    minifyWhitespace: !isDevelopment,
    minifyIdentifiers: !isDevelopment,
    minifySyntax: !isDevelopment,
    legalComments: "none",
    treeShaking: true,
    ignoreAnnotations: true,



    
    splitting: true,


    // inject: ["./js/react-shim.mjs"],

    tsconfig: './tsconfig.json',
    allowOverwrite: true,
   
    // external: ["react", "react-dom", "framer-motion", "tslib", "@emotion/react"],
    platform: "browser",
    chunkNames: "chunks/[name]-[hash]",
    resolveExtensions: [
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ".css",
      ".json",
      ".mjs",
      ".ttf",
      ".workerJS",
    ],

    target: "esnext",
    define: {
      "process.env.NODE_ENV": `"${environment}"`,
    },
    plugins: [importMapPlugin, jsxImportSourcePlugin({filter: /.(tsx)/ })],
    loader: {
      ".ttf": "file",
      ".webp": "file",
      ".tsx": "tsx",
      ".jsx": "tsx",
      ".mjs": "tsx",
      ".ts:": "tsx",
      ".js:": "tsx",
      ".css": "css",
      ".d.ts": "dataurl",
      ".workerJS": "file",
      ".wasm": "file",
    },
    outdir: "js/public",
  }).catch((e) => {

    console.error(e);
    process.exit(1)

  }
);

// await build([
//   "js/renderPreviewWindow.tsx",
//   "js/renderToString.tsx",
//   "js/session.tsx",
// ]);
// await build([
//   //   "js/renderPreviewWindow.tsx",
//   //   "js/templates.ts",
//   //   "js/renderToString.tsx",

// ]);

await build([
  "js/starter.tsx",
]);

// esbuild.build({
//   entryPoints: [
//     "js/mui.ts",
//   ],
//   "outExtension": { ".js": ".mjs" },
//   bundle: true,
//   format: "esm",
// minify: fa,

//   splitting: true,
//   treeShaking: true,
//   platform: "browser",
//   sourcemap: false,
//   resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".css", ".json", ".mjs"],
//   target: ["es2020"],
//   plugins: [importMap.plugin()],
//   outdir: "public",
// }).catch(() => process.exit(1));

// esbuild.build({
//   entryPoints: ["js/ws.mjs"],
//   bundle: true,
//   format: "esm",
//   minify: false,
//   treeShaking: false,
//   sourcemap: true,
//   resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".css", ".json", ".mjs"],
//   target: ["es2017"],
//   plugins: [importMap.plugin()],
//   outfile: "public/ws.mjs",
// }).catch(() => process.exit(1));

import esbuild from "esbuild";

import { pnpPlugin } from "@yarnpkg/esbuild-plugin-pnp";
import * as importMap from "esbuild-plugin-import-map";
import { jsxImportSourcePlugin } from "esbuild-plugin-jsximportsource";
import alias from "esbuild-plugin-alias";
import jsonData from "./js/mockedMap.json" assert { type: "json" };

const environment = process.env.NODE_ENV === "production"
  ? "production"
  : "development";

const isDevelopment = true; // = environment === "development"
importMap.load(jsonData);
const importMapPlugin = importMap.plugin();

const outDir = "../../sites/spike.land/public";

console.log(`
-------------------------------------------------
--------------${environment}---------------------
-------------------------------------------------`);

const workerEntryPoints = [
  "vs/language/typescript/ts.worker.js",
  "vs/editor/editor.worker.js",
].map((entry) => `monaco-editor/esm/${entry}`);

const define = {
  "process.env.NODE_ENV": `"${environment}"`,
  "process.env.NODE_DEBUG": false,
  "process.env.DEBUG": false,
  "process.env.DUMP_SESSION_KEYS": false,
  "process": JSON.stringify({ env: {} }),
  "global": "self",
};

const buildOptions = {
  define,
  target: "es2020",
  platform: "browser",
  legalComments: "none",
  plugins: [
    pnpPlugin(),
    importMapPlugin,
    jsxImportSourcePlugin({ filter: /.(tsx)/ }),
    alias({
      "path": "path-browserify",
    }),
  ],
};

await esbuild.build({
  ...buildOptions,
  entryPoints: [
    ...workerEntryPoints,
  ],
  bundle: true,
  minify: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: false,
  treeShaking: true,
  ignoreAnnotations: true,
  plugins: [pnpPlugin(), jsxImportSourcePlugin({ filter: /.(tsx)/ })],
  ignoreAnnotations: true,
  treeShaking: true,
  outExtension: { ".js": ".monaco.worker.js" },
  format: "iife",
  loader: {
    ".ttf": "file",
    ".webp": "file",
    ".tsx": "tsx",
    ".jsx": "tsx",
    ".mjs": "ts",
    ".ts:": "ts",
    ".js:": "ts",
    ".css": "css",
    ".d.ts": "dataurl",
    ".css": "css",
    ".ttf": "file",
  },

  outdir: "./js/monaco-editor",
});

await esbuild.build({
  ...buildOptions,
  entryPoints: [
    // "monaco-jsx-syntax-highlight/lib/worker/index.js",
    // "./worker  .tsx",
    "./main.ts",
    // "./iife.js"
    "./sw.mjs",
  ],
  bundle: true,
  minify: false,
  minifyWhitespace: false,
  minifyIdentifiers: false,
  minifySyntax: false,
  treeShaking: true,

  ignoreAnnotations: true,
  plugins: [pnpPlugin(), jsxImportSourcePlugin({ filter: /.(tsx)/ })],
  ignoreAnnotations: true,
  treeShaking: true,
  // outExtension: {".js": ".workerJS"},
  format: "iife",
  loader: {
    ".ttf": "file",
    ".webp": "file",
    ".tsx": "tsx",
    ".jsx": "tsx",
    ".mjs": "ts",
    ".ts:": "ts",
    ".js:": "ts",
    ".css": "css",
    ".d.ts": "dataurl",
    ".css": "css",
    ".ttf": "file",
    ".monaco.worker.js": "file",
  },

  outdir: outDir,
});

const build = (entryPoints) =>
  esbuild.build({
    ...buildOptions,
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
    tsconfig: "./tsconfig.json",
    allowOverwrite: true,
    resolveExtensions: [
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ".css",
      ".json",
      ".mjs",
      ".js",
      ".ttf",
      ".wasm",
      ".monaco.worker.js",
    ],

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
      ".js",
      ".ttf",
      ".wasm",
      ".monaco.worker.js",
    ],

    define,
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
      ".monaco.worker.js": "file",
      ".wasm": "file",
    },
    outdir: "../../sites/spike.land/public",
  }).catch((e) => {
    console.error(e);
    process.exit(1);
  });

// const buildNoImportMap = (entryPoints) =>
//   esbuild.build({
//     entryPoints,
//     "outExtension": { ".js": ".mjs" },
//     bundle: true,
//     format: "esm",

//     sourcemap: false,

//     minify: !isDevelopment,
//     minifyWhitespace: !isDevelopment,
//     minifyIdentifiers: !isDevelopment,
//     minifySyntax: !isDevelopment,
//     legalComments: "none",
//     treeShaking: true,
//     ignoreAnnotations: true,

//     splitting: true,

//     // inject: ["./js/react-shim.mjs"],

//     allowOverwrite: true,

//     // external: ["react", "react-dom", "framer-motion", "tslib", "@emotion/react"],
//     platform: "browser",
//     chunkNames: "chunks/[name]-[hash]",
//     resolveExtensions: [
//       ".tsx",
//       ".ts",
//       ".jsx",
//       ".js",
//       ".css",
//       ".json",
//       ".mjs",
//       ".wasm",
//       ".ttf",
//       ".workerJS",
//     ],

//     loader: {
//       ".ttf": "file",
//       ".webp": "file",
//       ".tsx": "tsx",
//       ".jsx": "tsx",
//       ".mjs": "ts",
//       ".ts:": "ts",
//       ".js:": "ts",

//       ".css": "css",
//       ".d.ts": "dataurl",
//       ".workerJS": "file",
//       ".wasm": "copy",
//     },

//     outdir: "../../sites/spike.land/public",
//   }).catch((e) => {
//     console.error(e);
//     process.exit(1);
//   });

await build([
  "ws.mjs",
]);

await build;

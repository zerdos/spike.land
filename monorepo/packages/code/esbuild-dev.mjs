import esbuild from "esbuild";
import * as importMap from "esbuild-plugin-import-map";
import { jsxImportSourcePlugin } from "esbuild-plugin-jsximportsource";

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
  plugins: [importMapPlugin, jsxImportSourcePlugin({ filter: /.(tsx)/ })],
};

await esbuild.build({
  ...buildOptions,
  entryPoints: [
    ...workerEntryPoints,
    // "./worker  .tsx",
    "./main.ts",
    // "./iife.js",
    "./sw.mjs",
  ],
  bundle: true,
  minify: false,
  minifyWhitespace: false,
  minifyIdentifiers: false,
  minifySyntax: false,
  treeShaking: true,
  ignoreAnnotations: true,
  plugins: [jsxImportSourcePlugin({ filter: /.(tsx)/ })],
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
      ".workerJS": "file",
      ".wasm": "file",
    },
    outdir: "../../sites/spike.land/public",
  }).catch((e) => {
    console.error(e);
    process.exit(1);
  });

const buildNoImportMap = (entryPoints) =>
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
      ".workerJS": "file",
      ".wasm": "file",
    },

    outdir: "../../sites/spike.land/public",
  }).catch((e) => {
    console.error(e);
    process.exit(1);
  });

await build([
  "starter.mjs",
  "renderToString.mjs",
  "ws.mjs",
]);

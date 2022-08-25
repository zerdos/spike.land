import esbuild from "esbuild";
//import {version} from 'monaco-editor';

import alias from "esbuild-plugin-alias";

const environment = process.env.NODE_ENV === "production"
  ? "production"
  : "development";

const isDevelopment = environment === "development";

const outdir = "./dist";
const target = "es2021";

// let exampleOnResolvePlugin = {
//   name: 'example',
//   setup(build) {
//     let path = require('path')

//     // Redirect all paths starting with "images/" to "./public/images/"
//     build.onResolve(  { filter: /^monaco-editor/ }, args => {

// console.log(args);
//     return { path: `/npm:monaco-editor@$${version}?target=${target}`, external: true };

//     //  return { path: path.join(args.resolveDir, 'public', args.path) }
//     })

//     // Mark all paths starting with "http://" or "https://" as external
//     build.onResolve({ filter: /^https?:\/\// }, args => {
//       return { path: args.path, external: true }
//     })
//   },
// }

console.log(`
-------------------------------------------------
--------------${environment}---------------------
=== ----
-------------------------------------------------`);

const workerEntryPoints = [
  "vs/language/typescript/ts.worker.js",
  "vs/editor/editor.worker.js",
].map((entry) => `monaco-editor/esm/${entry}`);

const define = {
  "process.env.NODE_ENV": `"${environment}"`,
  "process.env.NODE_DEBUG": false,
  "process.env.DEBUG": false,
  "process.env.version": `"1.1.1"`,
  "process.env.DUMP_SESSION_KEYS": false,
  "process": JSON.stringify({ env: {}, version: "1.1.1", browser: true }),
  "global": "self",
};

const buildOptions = {
  define,
  target,
  platform: "browser",
  external: ["./mST"],
  legalComments: "none",
  plugins: [
    // exampleOnResolvePlugin,
    // alias({

    // "path": new URL("./path/index.js", import.meta.url).pathname,
    // "stream": new URL(
    //   "../../node_modules/stream-browserify/index.js",
    //   import.meta.url,
    // ).pathname,
    // }),
    // importMapPlugin,
    // esbuildCommonjs(["/react.ts"]),
    // alias({
    //   "path": "path-browserify"
    //   // "stream": "stream-browserify",
    // }),
  ],
};

// await esbuild.build({
//   ...buildOptions,
//   entryPoints: [
//     ...workerEntryPoints,
//   ],
//   bundle: true,
//   minify: false,
//   // minifyWhitespace: true,
//   // minifyIdentifiers: true,
//   // minifySyntax: true,
//   target,
//   // treeShaking: true,
//   outExtension: { ".js": ".monaco.worker.js" },
//   format: "iife",
//   loader: {
//     ".ttf": "file",
//     ".webp": "file",
//     ".tsx": "tsx",
//     ".jsx": "tsx",
//     ".ts:": "ts",
//     ".css": "file",
//     ".css": "file",
//     ".ttf": "file",
//     ".wasm": "file",
//   },

//   outdir: "./js/monaco-editor",
// });

// await esbuild.build({
//   ...buildOptions,
//   entryPoints: [
//     // "monaco-jsx-syntax-highlight/lib/worker/index.js",
//     // "./js/ipfsWorker.tsx",
//     "./main.ts",
//     "./sw.mjs",
//   ],
//   bundle: true,
//   minify: false,
//   minifyWhitespace: false,
//   minifyIdentifiers: false,
//   minifySyntax: false,
//   treeShaking: true,

//   ignoreAnnotations: false,
//   plugins: [
//     alias({
//       "react": new URL("./react.ts", import.meta.url).pathname,
//       "react-dom": new URL("./react.ts", import.meta.url).pathname,
//       "react-dom/server": new URL("./react.ts", import.meta.url).pathname,
//       "react-dom/client": new URL("./react.ts", import.meta.url).pathname,
//       "react/jsx-runtime": new URL("./react.ts", import.meta.url).pathname,
//       "react/jsx-dev-runtime": new URL("./react.ts", import.meta.url).pathname,
//       "path": new URL("./path/index.js", import.meta.url).pathname,
//       "stream": new URL(
//         "../../node_modules/stream-browserify/index.js",
//         import.meta.url,
//       ).pathname,
//     }),
//   ],
//   ignoreAnnotations: true,
//   treeShaking: true,
//   // outExtension: {".js": ".workerJS"},
//   format: "iife",
//   loader: {
//     ".webp": "file",
//     ".tsx": "tsx",
//     ".jsx": "tsx",
//     ".mjs": "ts",
//     ".ts:": "ts",
//     ".js:": "ts",
//     ".css": "css",
//     ".d.ts": "dataurl",
//     ".css": "css",
//     ".monaco.worker.js": "file",
//   },

//   outdir: outDir,
// });

const build = (entryPoints, format = "esm") =>
  esbuild.build({
    ...buildOptions,
    entryPoints,
    "outExtension": { ".js": ".mjs" },
    bundle: true,
    format: "esm",
    splitting: true,
    target,
    sourcemap: true,

    minify: !isDevelopment,
    minifyWhitespace: !isDevelopment,
    minifyIdentifiers: !isDevelopment,
    minifySyntax: !isDevelopment,
    legalComments: "none",
    ignoreAnnotations: true, 
    treeShaking: true,
    format,
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
      ".d.ts",
      ".wasm",
      ".monaco.worker.js",
    ],

    external: ["react", "react-dom", "monaco-editor", "react-dom/client", "framer-motion", "tslib", "@emotion/*"],
    platform: "browser",
    chunkNames: "chunk-[name]-[hash]",
    treeShaking: true,
    assetNames: "chunk-[name]-[hash]",
    // entryNames: "[name]-[hash]",
    resolveExtensions: [
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ".d.ts",
      ".css",
      ".json",
      ".mjs",
      ".js",
      ".wasm",
      ".tsWorker.js",
      ".editor.main.js",
    ],

    define,
    loader: {
      ".ttf": "file",
      ".webp": "file",
      ".tsx": "tsx",
      ".jsx": "tsx",
      ".css": "css",
      ".ttf": "file",

      ".d.ts": "file",
      ".worker.js": "file",
      ".wasm": "file",
    },
    outdir,
  }).catch((e) => {
    console.error(e);
    process.exit(1);
  });

await build([
  "./js/session.ts",
  "js/react.ts",
  "js/ws.ts",
  // "js/rtc.ts",
  // "react.ts",
  // "framer-motion.ts",
  // "emotion.ts",
]);
// ]);

// await build;

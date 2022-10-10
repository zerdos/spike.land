// Import inlineWorkerPlugin from 'esbuild-plugin-inline-worker';
// import autoprefixer from "autoprefixer"
// import postcssNested from "postcss-nested"
import fs from "node:fs/promises";
import { resolve } from "node:path";
import esbuild from "esbuild";
// Const { request } = require("http");
// require("monaco-editor/esm/vs/language/css/css.worker")
// const rmAsync = promisify(fs.rm);
import aliasPlugin from "esbuild-plugin-alias";

const environment = process.env.NODE_ENV === "production"
  ? "production"
  : "development";

const isDevelopment = environment !== "production";

const outdir = "./dist";
const target = "es2020";

console.log(`
-------------------------------------------------
--------------${environment}---------------------
-------------------------------------------------
-------------------------------------------------`);

const define = {
  "process.env.NODE_ENV": `"${environment}"`,
  "process.env.NODE_DEBUG": JSON.stringify(false),
  "process.env.DEBUG": JSON.stringify(false),
  "process.env.version": '"1.1.1"',
  global: "globalThis",
  "process.env.DUMP_SESSION_KEYS": JSON.stringify(false),
  // "libFileMap": JSON.stringify({}),
  process: JSON.stringify({
    env: { NODE_ENV: "production" },
    version: "1.1.1",
    browser: true,
  }),
};
// Const plugins = [inlineWorkerPlugin()];

// [postcss({
// plugins: [
// inlineWorkerPlugin))
// autoprefixer,
// postcssNested
// ]
// })];//

const buildOptions = {
  define,
  target,
  platform: "browser",
  plugins: [
    aliasPlugin({
      buffer: resolve("./js/buffer/index.js"),
      ms: resolve("./js/ms.js"),
      debug: resolve("./js/debug.js"),
      events: resolve("./js/events.js"),
      react: resolve("./js/react-preact.ts"),
      "react-dom": resolve("./js/react-preact.ts"),
      "react-dom/client": resolve("./js/react-preact.ts"),
      "react-dom/server": resolve("./js/react-preact.ts"),
      "react/jsx-dev-runtime": resolve("./js/react-preact.ts"),
      "react/jsx-runtime": resolve("./js/react-preact.ts"),
    }),
  ],
  external: ["./mST"],
  legalComments: "none",
};

const workerEntryPoints = [
  "vs/language/json/json.worker",
  "vs/language/css/css.worker",
  "vs/language/html/html.worker",
  "vs/language/typescript/ts.worker",
  "vs/editor/editor.worker",
];

const build = (/** @type {string[]} */ entryPoints) =>
  esbuild.build({
    ...buildOptions,
    entryPoints,
    outExtension: { ".js": ".mjs" },
    bundle: true,
    splitting: true,
    target,
    format: "esm",
    sourcemap: false,

    minify: !isDevelopment,
    minifyWhitespace: !isDevelopment,
    minifyIdentifiers: !isDevelopment,
    minifySyntax: !isDevelopment,
    legalComments: "none",
    ignoreAnnotations: true, // True,
    // external
    // external: [ "@emotion/react/*"],
    // sourcemap: true,
    treeShaking: true,
    logLimit: 0,
    keepNames: false,

    tsconfig: "./tsconfig.json",
    allowOverwrite: true,
    platform: "browser",
    chunkNames: "chunk-[name]-[hash]",
    assetNames: "chunk-[name]-[hash]",
    // EntryNames: "[name]-[hash]",
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
      ".workerJs.js",
      ".js?worker",
    ],
    metafile: true,
    define,
    loader: {
      ".ttf": "file",
      ".webp": "file",
      ".tsx": "tsx",
      ".jsx": "tsx",
      ".css": "css",
      ".d.ts": "file",
      ".workerJs.js": "file",
      ".wasm": "file",
    },
    outdir,
  }).catch((error) => {
    console.error(error);
    process.exit(1);
  });

(async () => {
  await fs.rm("js/monaco-workers", { recursive: true, force: true });

  await esbuild.build({
    entryPoints: workerEntryPoints.map((entry) => `monaco-editor/esm/${entry}`),
    bundle: true,
    define,
    treeShaking: true,
    minify: true, //! isDevelopment,
    minifyWhitespace: true, //! isDevelopment,
    minifyIdentifiers: true, //! isDevelopment,
    minifySyntax: true, //! isDevelopment,
    ignoreAnnotations: true,
    keepNames: false,
    platform: "browser",
    outExtension: { ".js": ".workerJs.js" },
    format: "iife",
    outbase: "monaco-editor/esm/vs",
    outdir: "./js/monaco-workers",
  });

  await build([
    "js/session.ts",
    "js/react-preact.ts",
    "js/motion.ts",
    "js/emotion.ts",
    "js/emotionJsxRuntime.ts",
    "js/ws.ts",
  ]);
})();

// Await esbuild
//   .build({
//     entryPoints: ['dist/startMonaco.css'],
//     bundle: true,
//     outdir: 'dist',
//     allowOverwrite: true,
//     loader: {
//       ".ttf": "file",
//     },
//     plugins,
//   })
//   .catch(() => process.exit(1));

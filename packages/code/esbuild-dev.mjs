import esbuild from "esbuild";

import * as importMap from "esbuild-plugin-import-map";
import alias from "esbuild-plugin-alias";
import { esbuildCommonjs, viteCommonjs } from "@originjs/vite-plugin-commonjs";

const jsonData = {
  "imports": {
    // ...imap,
    // "framer-motion": "/framer-motion.mjs",
    // "@emotion/react": "/emotion.mjs",
    // "react": "/react.mjs",
    // "react-dom": "/react.mjs",
    // "react-dom/client": "/react.mjs",
    // "react-dom/server": "/react.mjs",
    // "react/jsx-runtime": "/react.mjs",
    // "react/jsx-dev-runtime": "/react.mjs",

    // "../../node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js": "/emotion.mjs",

    // "@emotion/react/jsx-dev-runtime": "/emotion.mjs",

    // "preact": "https://ga.jspm.io/npm:preact@10.8.2/dist/preact.module.js",
    // "preact-render-to-string": "https://ga.jspm.io/npm:preact-render-to-string@5.2.0/dist/index.mjs",
    // "preact/compat": "https://ga.jspm.io/npm:preact@10.8.2/compat/dist/compat.module.js",
    // "preact/jsx-runtime": "https://ga.jspm.io/npm:preact@10.8.2/jsx-runtime/dist/jsxRuntime.module.js"
  },
  // "scopes": {
  //   "https://ga.jspm.io/": {
  //     "preact/hooks": "https://ga.jspm.io/npm:preact@10.8.2/hooks/dist/hooks.module.js"
  //   }
  // }
};

const environment = process.env.NODE_ENV === "production"
  ? "production"
  : "development";

const isDevelopment = environment === "development";
importMap.load(jsonData);
const importMapPlugin = importMap.plugin();

const outDir = "./dist";
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
  target: "es2022",
  platform: "browser",
  external: ["./mST"],
  legalComments: "none",
  plugins: [
    alias({
      "react": new URL("./react.ts", import.meta.url).pathname,
      "react-dom": new URL("./react.ts", import.meta.url).pathname,
      "react-dom/server": new URL("./react.ts", import.meta.url).pathname,
      "react-dom/client": new URL("./react.ts", import.meta.url).pathname,
      "react/jsx-runtime": new URL("./react.ts", import.meta.url).pathname,
      "react/jsx-dev-runtime": new URL("./react.ts", import.meta.url).pathname,
      "path": new URL("./path/index.js", import.meta.url).pathname,
      "stream": new URL(
        "../../node_modules/stream-browserify/index.js",
        import.meta.url,
      ).pathname,
    }),
    // importMapPlugin,
    // esbuildCommonjs(["/react.mjs"]),
    // alias({
    //   "path": "path-browserify"
    //   // "stream": "stream-browserify",
    // }),
  ],
};

await esbuild.build({
  ...buildOptions,
  entryPoints: [
    ...workerEntryPoints,
  ],
  bundle: true,
  minify: !isDevelopment,
  minifyWhitespace: !isDevelopment,
  minifyIdentifiers: !isDevelopment,
  minifySyntax: !isDevelopment,
  treeShaking: true,
  ignoreAnnotations: true,
  outExtension: { ".js": ".monaco.worker.js" },
  format: "iife",
  loader: {
    ".ttf": "file",
    ".webp": "file",
    ".tsx": "tsx",
    ".jsx": "tsx",
    ".ts:": "ts",
    ".css": "css",
    ".d.ts": "dataurl",
    ".css": "css",
    ".ttf": "file",
    ".wasm": "file",

  },

  outdir: "./js/monaco-editor",
});

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
    target: "esnext",
    sourcemap: false,

    minify: !isDevelopment,
    minifyWhitespace: !isDevelopment,
    minifyIdentifiers: !isDevelopment,
    minifySyntax: !isDevelopment,
    legalComments: "none",
    treeShaking: true,
    ignoreAnnotations: true,
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
      ".wasm",
      ".monaco.worker.js",
    ],

    // external: ["react", "react-dom/client", "framer-motion", "tslib", "@emotion/react"],
    platform: "browser",
    chunkNames: "chunk-[name]-[hash]",
    treeShaking: true,
    ignoreAnnotations: true,
    // entryNames: "[name]-[hash]",
    resolveExtensions: [
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ".css",
      ".json",
      ".mjs",
      ".js",
      ".wasm",
      ".worker.js",
    ],

    define,
    loader: {
      ".ttf": "file",
      ".webp": "file",
      ".tsx": "tsx",
      ".jsx": "tsx",
      ".d.ts": "dataurl",
      ".worker.js": "file",
      ".wasm": "file",
    },
    outdir: "./dist",
  }).catch((e) => {
    console.error(e);
    process.exit(1);
  });

await build([
  "./js/session.ts",
  "js/ws.ts",
  // "js/rtc.ts",
  "react.ts",
  "framer-motion.ts",
  "emotion.ts",
]);
// ]);

// await build;

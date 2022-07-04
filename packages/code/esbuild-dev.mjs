import esbuild from "esbuild";

import { pnpPlugin } from "@yarnpkg/esbuild-plugin-pnp";
import * as importMap from "esbuild-plugin-import-map";
import { jsxImportSourcePlugin } from "esbuild-plugin-jsximportsource";
import alias from "esbuild-plugin-alias";

const jsonData = {
  "imports": {
    // ...imap,
    // "framer-motion": "/framer-motion.mjs",
    // "@emotion/react": "/emotion.mjs",
    "react": "/react.mjs",
    "react-dom": "/react.mjs",
    "react-dom/client": "/react.mjs",
    "react-dom/server": "/react.mjs",
    "react/jsx-runtime": "/react.mjs",
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
  "process.env.version": `"1.1.1"`,
  "process.env.DUMP_SESSION_KEYS": false,
  "process": JSON.stringify({ env: {}, version: "1.1.1", browser: true }),
  "global": "self",
};

const buildOptions = {
  define,
  target: "es2020",
  platform: "browser",
  external: ["./mST"],
  legalComments: "none",
  plugins: [
    pnpPlugin(),
    importMapPlugin,
    jsxImportSourcePlugin({ filter: /.(tsx)/ }),
    alias({
      "path": "path-browserify",
      "stream": "stream-browserify",
    }),
  ],
};

await esbuild.build({
  ...buildOptions,
  entryPoints: [
    ...workerEntryPoints,
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
    ".webp": "file",
    ".tsx": "tsx",
    ".jsx": "tsx",
    ".mjs": "ts",
    ".ts:": "ts",
    ".js:": "ts",
    ".css": "css",
    ".d.ts": "dataurl",
    ".css": "css",
    ".monaco.worker.js": "file",
  },

  outdir: outDir,
});

const build = (entryPoints, format = "esm") =>
  esbuild.build({
    ...buildOptions,
    entryPoints,
    "outExtension": { ".js": ".mjs" },
    bundle: true,
    format: "esm",
    splitting: true,

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
      ".wasm",
      ".monaco.worker.js",
    ],

    define,
    loader: {
      ".ttf": "file",
      ".webp": "file",
      ".tsx": "tsx",
      ".jsx": "tsx",
      ".d.ts": "dataurl",
      ".monaco.worker.js": "file",
      ".wasm": "file",
    },
    outdir: "../../sites/spike.land/public",
  }).catch((e) => {
    console.error(e);
    process.exit(1);
  });

await build([
  "ws.mjs",
  "react.ts",
  "framer-motion.ts",
  "emotion.ts"
]);

await build;

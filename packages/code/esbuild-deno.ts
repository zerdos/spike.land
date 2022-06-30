import * as esbuild from 'https://deno.land/x/esbuild@v0.14.48/wasm.js'

import { denoPlugin } from "https://deno.land/x/esbuild_deno_loader@0.5.0/mod.ts";



const jsonData = {
  "imports": {
    // "framer-motion": "/framer-motion.mjs",
    // "@emotion/react": "/emotion.mjs",
    "react": "/react.mjs",
    "react-dom": "/react.mjs",
    "react-dom/client": "/react.mjs",
    "react-dom/server": "/react.mjs",
    "react/jsx-runtime": "/react.mjs"
  }
}


const environment = "production";
  // ? "production"
  // : "development";

const isDevelopment = true; // = environment === "development"
// importMap.load(jsonData);
// const importMapPlugin = importMap.plugin();

const outDir = "../../sites/spike.land/public";

console.log(`
-------------------------------------------------
--------------${environment}---------------------
-------------------------------------------------`);

const workerEntryPoints = [
 `https://unpkg.com/monaco-editor@0.33.0/esm/vs/language/typescript/ts.worker.js`,
  "https://unpkg.com/monaco-editor@0.33.0/esm/vs/editor/editor.worker.js",
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
    // pnpPlugin(),
    // importMapPlugin,
    // jsxImportSourcePlugin({ filter: /.(tsx)/ }),
    // alias({
      // "path": "path-browserify",
    // }),
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
  // plugins: [pnpPlugin(), jsxImportSourcePlugin({ filter: /.(tsx)/ })],
  // ignoreAnnotations: true,
  // treeShaking: true,
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
    // ".css": "css",
    // ".ttf": "file",
  },

  outdir: "./js/monaco-editor",
});




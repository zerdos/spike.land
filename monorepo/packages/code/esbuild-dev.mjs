import esbuild from "esbuild";
import * as importMap from "esbuild-plugin-import-map";
import jsonData from "./js/mockedMap.json" assert { type: "json" };

const environment = process.env.NODE_ENV == "production"
  ? "production"
  : "development";
const isDevelopment = environment === "development";

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
  legalComments: "external",
  ignoreAnnotations: true,
  treeShaking: true,
  // outExtension: {".js": ".workerJS"},
  platform: "browser",
  define: {
    "process.env.NODE_ENV": `"${environment}"`,
  },
  format: "iife",
  loader: {
    ".css": "css",
    ".ttf": "file",
  },

  outdir: "js/dist/workers/",
});

await esbuild.build({
  entryPoints: ["./js/appStarter.ts"],
  outfile: "./js/dist/appStarter.js",
  bundle: true,
  target: "es2017",
  minify: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
  legalComments: "external",

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
    minify: !isDevelopment,
    sourcemap: "external",
    minifyIdentifiers: true,
    minifyWhitespace: true,
    minifySyntax: true,
    splitting: true,
    sourcemap: isDevelopment,
    allowOverwrite: true,
    treeShaking: !isDevelopment,
    tsconfig: "./tsconfig.json",
    platform: "browser",
    ignoreAnnotations: true,
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
 
    target: "es2017",
    define: {
      "process.env.NODE_ENV": `"${environment}"`,
    },
    plugins: [importMapPlugin],
    loader: {
      ".ttf": "file",
      ".webp": "file",
      ".tsx": "tsx",
      ".mjs": "tsx",
      ".ts:": "tsx",
      ".css": "css",
      ".ts": "ts",
      ".d.ts": "text",
      ".workerJS": "file",
    ".wasm": "file",
    },
    outdir: "js/dist",
  }).catch(() => process.exit(1));

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
//   target: ["es2017"],
//   plugins: [importMap.plugin()],
//   outfile: "dist/ws.mjs",
// }).catch(() => process.exit(1));

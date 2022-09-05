import esbuild from "esbuild";
import  postcss from 'esbuild-postcss';
// import autoprefixer from "autoprefixer"
// import postcssNested from "postcss-nested"
import fs from "fs";
import {promisify} from "util"

const rm = promisify(fs.rm);

const environment = process.env.NODE_ENV === "production"
  ? "production"
  : "development";

const isDevelopment = environment === "development";

const outdir = "./dist";
const target = "es2020";

console.log(`
-------------------------------------------------
--------------${environment}---------------------
-------------------------------------------------
-------------------------------------------------`);

await rm("js/monaco-workers", {"recursive": true, force: true});

const define = {
  "process.env.NODE_ENV": `"production"`,
  "process.env.NODE_DEBUG": false,
  "process.env.DEBUG": false,
  "process.env.version": `"1.1.1"`,
  "process.env.DUMP_SESSION_KEYS": false,
  // "libFileMap": JSON.stringify({}),
  "process": JSON.stringify({
    env: { NODE_ENV: "production" },
    version: "1.1.1",
    browser: true,
  }),
  "global": "window",
};
// const plugins = [postcss({
//   plugins: [
//     autoprefixer,
//     postcssNested
//   ]
// })];

const buildOptions = {
  define,
  target,
  platform: "browser",
  // plugins,
  external: ["./mST"],
  legalComments: "none",
};


const workerEntryPoints = [
	'vs/language/json/json.worker.js',
	'vs/language/css/css.worker.js',
	'vs/language/html/html.worker.js',
	'vs/language/typescript/ts.worker.js',
	'vs/editor/editor.worker.js'
];

await esbuild.build({
	entryPoints: workerEntryPoints.map((entry) => `monaco-editor/esm/${entry}`),
	bundle: true,
  treeShaking: true,
  ignoreAnnotations: true,
  platform: "browser",
  outExtension: {".js": ".workerJs.js"},
  define,
	format: 'iife',
	outbase: 'monaco-editor/esm/vs',
	outdir: './js/monaco-workers'
});

const build = (entryPoints, format = "esm") =>
  esbuild.build({
    ...buildOptions,
    entryPoints,
    "outExtension": { ".js": ".mjs" },
    bundle: true,
    splitting: true,
    target,
    sourcemap: false,

    minify: !isDevelopment,
    minifyWhitespace: !isDevelopment,
    minifyIdentifiers: !isDevelopment,
    minifySyntax: !isDevelopment,
    legalComments: "none",
    ignoreAnnotations: true,
    treeShaking: true,
    logLimit: 0,
    metafile: true,
    keepNames: true, 
    format,
    tsconfig: "./tsconfig.json",
    allowOverwrite: true,
    platform: "browser",
    chunkNames: "chunk-[name]-[hash]",
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
      ".workerJs.js",
      ".js?worker",
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
      ".js?file": "file",
      ".workerJs.js": "file",
      ".wasm": "file",
    },
    outdir,
  }).catch((e) => {
    console.error(e);
    process.exit(1);
  });

await build([
  "js/session.ts",
  "js/react-preact.ts",
  "js/motion.ts",
  "js/emotion.ts",
  "js/startMonaco.ts", 
  "js/ws.ts",
]);

// await esbuild
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
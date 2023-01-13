// Import inlineWorkerPlugin from 'esbuild-plugin-inline-worker';
// import autoprefixer from "autoprefixer"
// import postcssNested from "postcss-nested"

import * as esbuild from "https://deno.land/x/esbuild@v0.16.17/mod.js";

import { copy } from "https://deno.land/std@0.171.0/fs/copy.ts";

// const pkg = await fetch("https://testing.spike.land/esbuild-wasm/package.json")
//   .then((x) => x.json());

// fetch(`https://testing.spike.land/esbuild-wasm@${pkg.version}/esbuild.wasm`)
//  .then((x) => x.blob()).then((b) => Deno.writeAllSync(`./dist/src/esbuild-${pkg.version}.wasm`, b));

// import { cp } from "node:fs/promises";
// import impMap from "./importMaps.json" assert {type: "json"};

// import { resolve } from "node:path";
// import open from "open";
// import fetch from "node-fetch";
// Const { request } = require("http");
// require("monaco-editor/esm/vs/language/css/css.worker")
// const rmAsync = promisify(fs.rm);
// import { env, exit } from "process";
// import { NIL } from "uuid";
// import { wait } from "./src/wait.mjs";

// await esbuild.initialize();
const environment = "development";

// = "production" === "production"
//   ? "production"
//   : "development";

const isDevelopment = environment !== "production";

const outdir = "dist/src";
const target = "es2022";

console.log(`
-------------------------------------------------
--------------${environment}---------------------   
-------------------------------------------------
-------------------------------------------------`);

const makeEnv = (environment: string) => ({
  "process.env.NODE_ENV": `"${environment}"`,
  "process.env.NODE_DEBUG": JSON.stringify(false),
  "process.browser": JSON.stringify(true),
  "process.env.DEBUG": JSON.stringify(false),
  "isBrowser": JSON.stringify(true),
  "isJest": JSON.stringify(false),
  "process.env.version": "\"1.1.1\"",
  global: "globalThis",

  "WORKER_DOM_DEBUG": JSON.stringify(false),
  "process.env.DUMP_SESSION_KEYS": JSON.stringify(false),
  // "libFileMap": JSON.stringify({}),
  process: JSON.stringify({
    version: "v19.3.0",
    versions: {
      node: "v19.3.0",
    },
    cwd: JSON.stringify(() => "/"),

    env: {
      NODE_ENV: `${environment}`,
      version: "v19.3.0",
      cwd: JSON.stringify(() => "/"),
      browser: true,
      isWebworker: true,
      NODE_DEBUG: false,
      DEBUG: false,
      isBrowser: true,
      versions: {
        node: "v19.3.0",
      },
    },
    browser: true,
  }),
});
const define = makeEnv(environment);
// Const plugins = [inlineWorkerPlugin()];

// [postcss({
// plugins: [
// inlineWorkerPlugin))
// autoprefixer,
// postcssNested
// ]
// })];//

const buildOptions: esbuild.BuildOptions = {
  define,
  target,
  sourcemap: "linked",
  alias: {
    path: "path-browserify",
    buffer: "buffer/",
    util: "util",
    constants: "constants/",
    module: "module/",
    events: "events/",

    // events: "events",
    stream: "stream-browserify",
    os: "os-browserify",
    assert: "assert",
    fs: "./src/fs.ts",
    "tiny-simple-peer": "/*tiny-simple-peer",
  },
  // alias: {
  //   "react-rnd": "/npm:/*react-rnd@10.3.7",
  // },
  //  entryNames: "[dir]/[name]-[hash]",
  platform: "browser",
  external: ["./mST", "/npm:*/", "../../npm:/*, ", "__STATIC_CONTENT_MANIFEST", "__STATIC_CONTENT_MANIFEST"],
  legalComments: "none",
  resolveExtensions: [
    ".tsx",
    ".ttf",
    ".ts",
    ".jsx",
    ".js",
    ".css",
    ".json",
    ".mjs",
    ".html",
    ".js",
    ".wasm",
  ],

  loader: {
    ".ttf": "file",
    ".css": "css",
    ".png": "file",
    ".ico": "file",
    ".wasm": "file",
    ".html": "text",
  },
};

const workerEntryPoints = [
  "vs/language/json/json.worker",
  "vs/language/css/css.worker",
  "vs/language/html/html.worker",
  "vs/language/typescript/ts.worker",
  "vs/editor/editor.worker",
];

console.log(`
-------------------------------------------------
--------------${environment}---------------------
----------------------b1--------------------------
-------------------------------------------------`);

const build = (
  entryPoints: esbuild.BuildOptions.entryPoints,
  external: esbuild.BuildOptions.external,
  buildOptions: esbuild.BuildOptions,
) =>
  esbuild.build({
    ...buildOptions,
    entryPoints,
    watch: false,
    external,
    outExtension: { ".js": ".mjs" },
    bundle: true,
    splitting: true, // format === "esm",
    target,
    format: "esm",

    minify: !isDevelopment,
    minifyWhitespace: false,
    minifyIdentifiers: false,
    minifySyntax: !isDevelopment,
    legalComments: "none",
    ignoreAnnotations: false, // True,

    // external: [ "@emotion/react/*"],

    treeShaking: true,
    logLimit: 0,
    keepNames: true,

    tsconfig: "./tsconfig.json",
    allowOverwrite: true,
    platform: "browser",
    chunkNames: "chunk-[name]-[hash]",
    assetNames: "chunk-[name]-[hash]",
    // ...(!keepEntryNames ? {en} : { entryNames: "chunk-[name]-[hash]" }),
    // EntryNames: "[name]-[hash]",

    metafile: true,
    define,
    outdir,
  }).catch((error) => {
    console.error(error);
    esbuild.stop();
  });

(async () => {
  // await cp("./src/index.html", "./dist/index.html");
  // await Deno.copyFile("./src/assets/favicons/favicon.ico", "./dist/src/favicon.ico");
  await Deno.mkdir("./dist/live");
  await Deno.mkdir("./dist/live/box");
  await Deno.copyFile(
    "./stubs/box/index.js",
    "./dist/live/box/index.js",
  );

  await copy(
    "./enhanced_dot_digital-7/enhanced_dot_digital-7.ttf",
    "./dist/enhanced_dot_digital-7.ttf",
  );
  await copy(
    "./src/assets/manifest.json",
    "./dist/manifest.json",
  );
  await copy(
    "./src/assets/favicons",
    "./dist/favicons",
  );
  await esbuild.build({
    ...buildOptions,
    entryPoints: [
      ...workerEntryPoints.map((entry) => `monaco-editor/esm/${entry}`),
    ],

    bundle: true,
    define,
    treeShaking: true,
    minify: true, // ! isDevelopment,
    minifyWhitespace: false, // ! isDevelopment,
    minifyIdentifiers: false, // ! isDevelopment,
    minifySyntax: false, // ! isDevelopment,
    ignoreAnnotations: false,
    keepNames: true,
    platform: "browser",
    format: "iife",
    outbase: "monaco-editor/esm/vs",
    outdir: "dist",
  });

  await esbuild.build({
    ...buildOptions,
    entryPoints: [
      "src/superFetch.ts",
      "src/workerRpc.ts",
      "src/prettierEsm.ts",
      "src/transpile.ts",
      "src/fs.ts",
      "src/ata.ts",
    ],

    plugins: [],
    bundle: true,
    define, // makeEnv("production"),
    minify: false,
    mangleQuoted: false,
    minifySyntax: false,
    minifyWhitespace: false,
    ignoreAnnotations: false,
    keepNames: true,
    treeShaking: true,
    legalComments: "none",
    platform: "browser",
    format: "iife",
    outdir: "dist/workerScripts",
  });
  // await build(["src/react-jsx-runtime.ts"], [], false, "iife");

  // await build(["src/mWorker.mjs"], [], false, "iife");

  // await build([
  //   "src/reactMod.ts",
  //   "src/jsx.mjs"
  // ], []);
  // console.log("done");

  // await build([
  //   "src/reactMod.ts",
  //   "src/reactDom.ts",
  //   "src/reactDomClient.ts"
  // ], []);
  // console.log("done");
  await esbuild.build({
    ...buildOptions,
    entryPoints: [
      "src/sw.ts",
      "src/esbuildWASM.ts",
      "src/ataWorker.ts",
      // "src/prettierWorker.ts",
      // "src/fs.worker.ts",
    ],
    plugins: [],
    bundle: true,
    define, // makeEnv("production"),
    minify: false,
    mangleQuoted: false,
    minifySyntax: false,
    minifyWhitespace: false,
    ignoreAnnotations: false,
    keepNames: true,
    treeShaking: true,
    legalComments: "none",
    outdir: "dist",
    platform: "browser",
    format: "iife",
  });

  // buildOptions.plugins = [
  //   // aliasPlugin({
  //   //    "stream": resolve("./src/stream.mjs"),
  //   //  "buffer": resolve("./src/buffer/index.ts"),
  //   // "@emotion/react": resolve("./src/emotion.ts"),
  //   // "@emotion/react/jsx-runtime": resolve("./src/emotionJsxRuntime.ts"),
  //   // "@emotion/react/jsx-dev-runtime": resolve("./src/emotionJsxRuntime.ts"),
  //   // "@emotion/cache": resolve("./src/emotionCache.ts"),
  //   // "@emotion/styled": resolve("./src/emotionStyled.mjs"),

  //   // "@emotion/styled": resolve("./src/emotionStyled.mjs"),
  //   // // "./mui": resolve("./dist/mui.mjs"),
  //   // "react": resolve("./dist/reactMod.mjs"),
  //   // "react/jsx-runtime": resolve("./dist/jsx.mjs"),
  //   // "react": resolve("./dist/reactMod.mjs"),
  //   // "react-dom": resolve("./dist/reactDom.mjs"),
  //   // "react-dom/client": resolve("./dist/reactDomClient.mjs"),
  //   // "react-dom": resolve("./dist/reactMod.mjs"),
  //   // "react-dom/client": resolve("./dist/reactMod.mjs"),
  //   // "framer-motion": resolve("./src/motion.ts"),
  //   // "react/jsx-dev-runtime": resolve("./src/jsx.mjs"),
  //   // }),
  // ];

  let wasmFile;

  const dir = await Deno.readDir("./dist");
  for await (const file of dir) {
    if (file.name.includes("esbuild") && file.name.includes(".wasm")) wasmFile = file.name;
  }

  console.log(wasmFile);

  //  console.log(dir);
  await build(
    [
      "src/reactMod.ts",
      "src/motion.ts",
      "src/reactDom.ts",
      "src/hydrate.tsx",
      "src/motion.ts",
      // "src/esbuildWASM.ts",
      "src/emotionJsxRuntime.mjs",
      "src/render.tsx",
      "src/reactDomClient.ts",
      "src/emotion.ts",
      "src/session.ts",
      // "src/signalz.ts",
      // "src/prettierWorker.mjs",
      // "src/reactMod.ts",
      "src/Editor.tsx",
      //      "src/reactMod.ts",
      "src/cf-workers.ts",
      // "src/Editor.tsx",

      // "src/reactDom.ts",

      // "src/emotionCache.ts",
      // "src/emotionSt
      // "src/emotionJsxRuntime.ts",
      // "src/jsx.mjs",
    ],
    [
      "__STATIC_CONTENT_MANIFEST",
      "./dist.shasum",
      `../${wasmFile}`,
      `./${wasmFile}`,
      `${wasmFile}`,
      "esbuild-wasm/esbuild.wasm",
      "@cloudflare/workers-types",
      // "react-error-boundary",
      // "@emotion/react",
      // "@emotion/",
      // "react*",
      // "@mui/",
      // "react-is",
      // "framer-motion",
      // "react",
      // "prop-types",
      // "tslib",
      // "monaco-editor",
      // "ace-builds",
      // "prettier",
      // "react/",
    ],
    {
      ...buildOptions,
      alias: { ...buildOptions.alias, "esbuild-wasm/esbuild.wasm": `../${wasmFile}` },
      loader: { ...buildOptions.loader },
    },
  );
  //
  console.log("done");

  esbuild.stop();

  // await build(
  //   [
  //     // "src/session.ts",
  //   // ],
  //   [ // "react",
  //     //  "react-dom", "react-dom/client"//, "@emotion/react", "@emotion/react/jsx-runtime", "framer-motion"
  //   ],
  //   false,
  //   "esm",
  //   true,
  // );
  // const {host, port} = serveRES;
  // const url = `http://[${host}]:${port}`;
  // open(url);
  // console.log(url)
  // await wait(100000);

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
  //   .catch(() => process.exit(1))
})();
// (opts)=>esbuild.serve(
// {
//   host: "::1",
//   port: 8372,
//   onRequest: async (args)=>{
//       if(args.path.startsWith("/node_modules")) {
//         const res = await  fetch (`https://testing.spike.land/${args.path}`);
//         if (res.ok) {
//           return res.text()
//         }
//       }
//   },
//   servedir: "./dist"
// },
// opts),

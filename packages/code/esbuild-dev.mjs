// Import inlineWorkerPlugin from 'esbuild-plugin-inline-worker';
// import autoprefixer from "autoprefixer"
// import postcssNested from "postcss-nested"
import esbuild from "esbuild";
import { cp, rm } from "node:fs/promises";

import { resolve } from "node:path";
// import open from "open";
// import fetch from "node-fetch";
// Const { request } = require("http");
// require("monaco-editor/esm/vs/language/css/css.worker")
// const rmAsync = promisify(fs.rm);
import aliasPlugin from "esbuild-plugin-alias";
import { env, exit } from "process";
// import { wait } from "./js/wait.mjs";

const environment = env.NODE_ENV === "production"
  ? "production"
  : "development";

const isDevelopment = environment !== "production";

const outdir = "./dist";
const target = "es2021";

console.log(`
-------------------------------------------------
--------------${environment}---------------------   
-------------------------------------------------
-------------------------------------------------`);

const define = {
  "process.env.NODE_ENV": `"${environment}"`,
  "process.env.NODE_DEBUG": JSON.stringify(false),
  "process.browser": JSON.stringify(true),
  "process.env.DEBUG": JSON.stringify(false),
  "isBrowser": JSON.stringify(true),
  "isJest": JSON.stringify(false),
  "process.env.version": "\"1.1.1\"",
  global: "globalThis",
  "process.env.DUMP_SESSION_KEYS": JSON.stringify(false),
  // "libFileMap": JSON.stringify({}),
  process: JSON.stringify({
    env: { NODE_ENV: "production", browser: true },
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

  external: ["./mST", "/npm:*"],
  legalComments: "none",
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
  entryPoints = [""],
  extraExternal = [""],
  watch = false,
  format = "esm",
) =>
  esbuild.build({
    ...buildOptions,
    entryPoints,
    watch,
    external: [...buildOptions.external, ...extraExternal.filter((x) => x)],
    outExtension: { ".js": ".mjs" },
    bundle: true,
    splitting: format === "esm",
    target,
    format: format || "esm",
    sourcemap: false,

    minify: !isDevelopment,
    minifyWhitespace: false,
    minifyIdentifiers: false,
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
      ".js": "ts",
      ".cjs": "ts",
      ".mjs": "tsx",
      ".css": "css",
      ".d.ts": "file",
      ".workerJs.js": "file",
      ".wasm": "file",
    },
    outdir,
  }).catch((error) => {
    console.error(error);
    exit(1);
  });

(async () => {
  await rm("js/monaco-workers", { recursive: true, force: true });
  await cp("./index.html", "./dist/index.html");
  await esbuild.build({
    entryPoints: [
      ...workerEntryPoints.map((entry) => `monaco-editor/esm/${entry}`),
    ],
    bundle: true,
    define,
    treeShaking: true,
    minify: true, // ! isDevelopment,
    minifyWhitespace: true, // ! isDevelopment,
    minifyIdentifiers: true, // ! isDevelopment,
    minifySyntax: true, // ! isDevelopment,
    ignoreAnnotations: true,
    keepNames: false,
    platform: "browser",
    outExtension: { ".js": ".workerJs.js" },
    format: "iife",
    outbase: "monaco-editor/esm/vs",
    outdir: "./js/monaco-workers",
  });

  // buildOptions.plugins = [
  //   aliasPlugin({
  //     react: resolve("./js/react-preact.ts"),
  //     "react-dom": resolve("./js/react-preact.ts"),
  //     "react-dom/client": resolve("./js/react-preact.ts"),
  //     "react-dom/server": resolve("./js/react-preact.ts"),
  //     // "react/jsx-dev-runtime": resolve("./js/react-preact.ts"),
  //     "react/jsx-runtime": resolve("./js/react-preact.ts"),
  //   })];

  //   await build([
  //     // "js/session.ts",
  //     // "js/prettierWorker.mjs",
  //     "js/react-preact.ts",
  //     // "js/motion.ts",
  //     // "js/react-preact.ts",
  //     "js/emotion.ts",
  //     // "js/mui.tsx",
  //     "js/emotionJsxRuntime.ts",
  //     // "js/ws.ts"],
  //    ],[]);

  // buildOptions.plugins = [
  //   aliasPlugin({
  //     //    "stream": resolve("./js/stream.mjs"),
  //     //  "buffer": resolve("./js/buffer/index.ts"),
  //     // "@emotion/react": resolve("./js/emotion.ts"),
  //     // "@emotion/react/jsx-runtime": resolve("./js/emotionJsxRuntime.ts"),
  //     // "@emotion/react/jsx-dev-runtime": resolve("./js/emotionJsxRuntime.ts"),
  //     //"@emotion/styled": resolve("./js/emotionStyled.mjs"),
  //     // // "./mui": resolve("./dist/mui.mjs"),
  //     "react": resolve("./js/react-preact.ts"),
  //     "react-dom": resolve("./js/react-preact.ts"),
  //     "react-dom/client": resolve("./js/react-preact.ts"),
  //     "react-dom/server": resolve("./js/react-preact.ts"),
  //     "react/jsx-runtime": resolve("./js/react-preact.ts"),
  //     "react/jsx-dev-runtime": resolve("./js/react-preact.ts"),
  //   }),
  // ];

  // // await fs.cp("./index.html", "./dist/index.html");

  // await build([
  //   // "js/session.ts",
  //   // "js/prettierWorker.mjs",
  //   "js/react-preact.ts",
  //   // "js/react.ts",
  //   // "js/Editor.tsx",
  //   // "js/motion.ts",
  //   // "js/renderToString.tsx",
  //   // "js/renderPreviewWindow.tsx",
  //   "js/emotionStyled.mjs",

  //   "js/emotionCache.ts",

  //   "js/emotion.ts",
  //   "js/emotionJsxRuntime.ts",
  //   // "js/ws.ts",
  //   // "js/load.ts",
  // ], [ //"react", "react-dom*"
  // ]);

  await build(["js/react-jsx-runtime.ts"], [], false, "iife");

  await build(["js/mWorker.mjs"], [], false, "iife");

  await build([
    "js/load.ts",
  ], ["./react-jsx-runtime.mjs"]);
  console.log("done");

  buildOptions.plugins = [
    aliasPlugin({
      //    "stream": resolve("./js/stream.mjs"),
      //  "buffer": resolve("./js/buffer/index.ts"),
      "@emotion/react": resolve("./js/emotion.ts"),
      "@emotion/react/jsx-runtime": resolve("./js/emotionJsxRuntime.ts"),
      "@emotion/react/jsx-dev-runtime": resolve("./js/emotionJsxRuntime.ts"),
      "@emotion/cache": resolve("./js/emotionCache.ts"),
      "@emotion/styled": resolve("./js/emotionStyled.mjs"),

      // "@emotion/styled": resolve("./js/emotionStyled.mjs"),
      // // "./mui": resolve("./dist/mui.mjs"),
      "react": resolve("./js/reactMod.ts"),
      "react-dom": resolve("./js/reactMod.ts"),
      "react-dom/client": resolve("./js/reactMod.ts"),
      "framer-motion": resolve("./js/motion.ts"),
      // "react/jsx-dev-runtime": resolve("./js/jsx.mjs"),
    }),
  ];

  await esbuild.build({
    entryPoints: [
      "js/sw.ts",
    ],
    bundle: true,
    define,
    treeShaking: false,
    minify: false, // ! isDevelopment,
    minifyWhitespace: false, // ! isDevelopment,
    minifyIdentifiers: false, // ! isDevelopment,
    minifySyntax: false, // ! isDevelopment,
    ignoreAnnotations: false,
    keepNames: true,
    platform: "browser",
    format: "iife",
    outdir: "dist",
  });
  await build(
    [
      "js/session.ts",
      // "js/prettierWorker.mjs",
      // "js/load.ts",
      "js/reactMod.ts",
      "js/Editor.tsx",
      "js/motion.ts",
      "js/ws.ts",
      "js/emotion.ts",
      "js/emotionJsxRuntime.ts",
      // "js/jsx.mjs",
    ],
    [],
    false,
  );
  console.log("done");

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

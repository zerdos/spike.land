
import { build, stop } from "./buildOperations.mjs";
import { buildOptions, environment, target, workerEntryPoints } from "./config.mjs";
import { copyFiles } from "./copyFiles.mjs";
import { getWasmFile, makeEnv } from "./helpers.mjs";

(async () => {
  await copyFiles();

  const workerEntryPoints = [
    "vs/language/json/json.worker.js",
    "vs/language/css/css.worker.js",
    "vs/language/html/html.worker.js",
    "vs/language/typescript/ts.worker.js",
    "vs/editor/editor.worker.js",
  ];

  await build({
    entryPoints: workerEntryPoints.map((entry) => `monaco-editor/esm/${entry}`),
    bundle: true,
    format: "iife",

    charset: "utf8",
    define: makeEnv("production"),

    keepNames: false,
    minify: true,
    treeShaking: true,

    alias: {
      ...buildOptions.alias,
    },
    minifySyntax: true,
    minifyIdentifiers: true,
    minifyWhitespace: true,
    ignoreAnnotations: true,
    mangleQuoted: true,
    keepNames: false,
    legalComments: "none",
    platform: "browser",
    // outbase: '../../node_modules/monaco-editor/esm/',
    outdir: "dist",
  });

  // =

  await build({
    ...buildOptions,
    entryPoints: [
      "src/superFetch.ts",
      "src/prettierEsm.ts",
      "src/transpile.ts",
      "src/memfs.ts",
      "src/ata.ts",
      "src/dts.ts",
      // "src/ts.worker.ts",
      "src/ataWorker.ts",
      // "src/ipfs-core.ts",
    ],

    plugins: [],
    bundle: true,
    define: makeEnv("production"),
    sourcemap: false,
    outExtension: { ".js": ".js" },
    mangleQuoted: true,
    minify: true,
    treeShaking: true,

    alias: {
      ...buildOptions.alias,
    },
    minifySyntax: true,
    minifyIdentifiers: true,
    minifyWhitespace: true,
    ignoreAnnotations: true,
    keepNames: false,
    legalComments: "none",
    platform: "browser",
    format: "iife",
    outdir: "dist/workerScripts",
  });

  await build({
    ...buildOptions,
    entryPoints: [
      "src/sw.ts",
      "src/esbuildWASM.ts",
    ],
    platform: "browser",
    plugins: [],
    bundle: true,
    define: makeEnv("production"),
    format: "iife",
    outExtension: { ".js": ".js" },
    minifySyntax: true,
    minifyIdentifiers: true,
    minifyWhitespace: true,
    target: "es2022",
    mangleQuoted: false,
    charset: "utf8",
    legalComments: "none",
    keepNames: true,
    treeShaking: true,
    legalComments: "none",
    outdir: "dist",
  });

  const wasmFile = await getWasmFile();

  console.log(wasmFile);

  //  console.log(dir);
  await build({
    ...buildOptions,
    splitting: true,
    format: "esm",
    minifySyntax: true,
    define: makeEnv("production"),
    minifyIdentifiers: true,
    minifyWhitespace: true,
    bundle: true,
    mangleQuoted: true,
    sourcemap: false,
    legalComments: "none",

    entryPoints: [
      "src/reactMod.ts",
      "src/reactDom.ts",
      "src/reactDomClient.ts",
      "src/jsx.mjs",
      "src/motion.ts",
      "src/renderHelpers.tsx",
      "src/hydrate.ts",
      "src/emotion.ts",
      "src/startMonaco.ts",
      "src/cf-workers.mjs",
      "src/cf-esbuild.mjs",
      // "src/Editor.tsx",

      // "src/prettierEsm.ts",
      // "src/dts.ts",
      "src/emotionCache.ts",
      "src/emotionStyled.mjs",
      // "src/emotionJsxRuntime.ts",i
      // "src/jsx.mjs",
    ],
    alias: {
      ...buildOptions.alias,
      "esbuild-wasm/esbuild.wasm": `./${wasmFile}`,
    },
    loader: { ...buildOptions.loader },
    tsconfig: "./tsconfig.json",
    allowOverwrite: true,
    platform: "browser",
    chunkNames: "chunk-[name]-[hash]",
    assetNames: "chunk-[name]-[hash]",
    external: [
      "/swVersion.mjs",
      "/dist.shasum.js",
      // "/monaco-editor",

      // "/monaco-editor/*",

      //      "/monaco-editor",
      "__STATIC_CONTENT_MANIFEST",
      "./dist.shasum",
      `./${wasmFile}`,
      "./dist/reactDomClient.js",
      "./dist/reactDom.js",
      "./dist/jsx.js",
      // "/reactMod.js",
      // "react/jsx-runtime",
      `${wasmFile}`,
      "esbuild-wasm/esbuild.wasm",
      "@cloudflare/workers-types",
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
  });

  stop();
})();

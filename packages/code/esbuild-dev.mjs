import { build, stop } from "./buildOperations.mjs";
import { buildOptions, environment, workerEntryPoints } from "./config.mjs";
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
    minifySyntax: true,
    minifyIdentifiers: true,
    minifyWhitespace: false,

    ignoreAnnotations: false,
    keepNames: true,
    treeShaking: true,
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
      // "src/ts.worker.ts",
      "src/ataWorker.ts",
      // "src/ipfs-core.ts",
    ],

    plugins: [],
    bundle: true,
    define: makeEnv("production"),
    sourcemap: false,
    outExtension: { ".js": ".js" },
    mangleQuoted: false,

    alias: {
      ...buildOptions.alias,
    },
    minifySyntax: true,
    minifyIdentifiers: true,
    minifyWhitespace: false,

    keepNames: true,
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
    format: "iife",
    outExtension: { ".js": ".js" },
    minifySyntax: true,
    minifyIdentifiers: true,
    minifyWhitespace: false,

    mangleQuoted: false,
    charset: "utf8",
    legalComments: "none",
    keepNames: true,
    treeShaking: false,
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
    minifyIdentifiers: true,
    minifyWhitespace: false,
    bundle: true,
    sourcemap: false,
    legalComments: "none",

    entryPoints: [
      "src/reactMod.ts",
      "src/reactDom.ts",
      "src/reactDomClient.mjs",
      "src/jsx.mjs",

      "src/motion.ts",
      "src/hydrate.ts",
      "src/emotion.ts",
      "src/cf-workers.mjs",
      "src/cf-esbuild.mjs",
      // "src/Editor.tsx",

      // "src/reactDom.ts",

      "src/emotionCache.ts",
      "src/emotionStyled.mjs",
      // "src/emotionJsxRuntime.ts",i
      // "src/jsx.mjs",
    ],
    alias: {
      ...buildOptions.alias,
      "react": "preact/compat",
      // "monaco-editor": "/f*monaco-editor?bundle=true",

      // "monaco-editor": "/monaco-editor",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime",
      "esbuild-wasm/esbuild.wasm": `./${wasmFile}`,
      // "react/jsx-runtime": "./dist/jsx.js",
      "react-dom/client": "preact/compat/client",
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

      "/monaco-editor/*",

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

import esbuild from "esbuild";

const environment = process.env.NODE_ENV === "production"
  ? "production"
  : "development";

const isDevelopment = environment === "development";

const outdir = "./dist";
const target = "es2022";

console.log(`
-------------------------------------------------
--------------${environment}---------------------
-------------------------------------------------
-------------------------------------------------`);

const define = {
  "process.env.NODE_ENV": `"${environment}"`,
  "process.env.NODE_DEBUG": false,
  "process.env.DEBUG": false,
  "process.env.version": `"1.1.1"`,
  "process.env.DUMP_SESSION_KEYS": false,
  "process": JSON.stringify({
    env: { NODE_ENV: environment },
    version: "1.1.1",
    browser: true,
  }),
  "global": "window",
};

const buildOptions = {
  define,
  target,
  platform: "browser",
  external: ["./mST"],
  legalComments: "none",
};

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
    format,
    tsconfig: "./tsconfig.json",
    allowOverwrite: true,
    external: ["monaco-editor/*"],
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
      ".tsWorker.js",
      ".editor.main.js",
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
      // ".worker.js": "file",
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

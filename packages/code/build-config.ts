import type { BuildOptions } from "esbuild";

import { Environment } from "./build-tasks.ts";
import { makeEnv } from "./helpers.ts";

// import { fetchPlugin } from "./src/fetchPlugin.ts";

export const buildOptions: BuildOptions = {
  target: "es2024",
  sourcemap: false,
  outdir: "dist",
  bundle: true,
  pure: ["console.log", "console.error", "console.warn"],
  outExtension: { ".js": ".mjs" },
  alias: {
    path: "path-browserify",
    buffer: "buffer/",
    "node:buffer": "buffer/",
    "node:async_hooks": "src/AsyncStorage.ts",
    util: "util/",
    perf_hooks: "src/browserify/perf_hooks.ts",
    tty: "tty-browserify",
    constants: "constants/",
    vm: "vm-browserify",
    module: "module/",
    events: "events/",

    // events: "events",

    stream: "stream-browserify",
    "node:stream": "stream-browserify",
    "file-type": "../../node_modules/file-type/browser.js",
    "node:os": "os-browserify",
    "node:util": "util",
    "node:events": "events",
    "worker_threads": "threads",
    "http": "browser-http",
    "os": "os-browserify",
    "crypto": "browser-crypto",
    assert: "assert",
    "graceful-fs": "./src/memfs",
    fs: "./src/memfs",
  },
  external: [
    "esm-worker",
    "/swVersion.js",

    "__STATIC_CONTENT_MANIFEST",
  ],
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

export const getCommonBuildOptions = (environment: Environment) => ({
  ...buildOptions,
  define: makeEnv(environment),
  plugins: [
    // postCssPlugin({
    //   postcss: {
    //     plugins: [tailwindcss],
    //   },
    // }),
    // autoprefixer(),
    //  fetchPlugin()
  ],
});

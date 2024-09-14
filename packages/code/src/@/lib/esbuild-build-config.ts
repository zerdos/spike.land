import type { BuildOptions } from "esbuild";

import type { Environment } from "@/lib/esbuild-make-env";
import { makeEnv } from "@/lib/esbuild-make-env";

import { fetchPlugin } from "@/lib/esbuild-fetch-plugin";
import path from "path";

export const buildOptions: BuildOptions = {
  target: "es2024",
  sourcemap: false,
  outdir: "dist",
  bundle: true,
  outExtension: { ".js": ".mjs" },
  alias: {
    buffer: "buffer/",

    path: "path-browserify",
    "node:buffer": "buffer/",
    "node:async_hooks": "src/AsyncStorage.ts",
    util: "util/",
    perf_hooks: "src/browserify/perf_hooks.ts",
    tty: "tty-browserify",
    constants: "constants/",
    vm: "vm-browserify",
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
    assert: "assert",
    "graceful-fs": "./src/memfs",
    fs: "./src/memfs",
  },
  external: [
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
    fetchPlugin(),
  ],
});

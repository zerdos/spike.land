import type { BuildOptions } from "esbuild";

import type { Environment } from "./esbuild-make-env.ts";
import { makeEnv } from "./esbuild-make-env.ts";

import { fetchPlugin } from "./esbuild-fetch-plugin.ts";

export const buildOptions: BuildOptions = {
  target: "es2024",
  sourcemap: false,
  outdir: "dist",

  bundle: true,
  outExtension: { ".js": ".mjs" },
  alias: {
    buffer: "buffer/",
    "node:path": "path-browserify",
    path: "path-browserify",
    "node:buffer": "buffer/",
    "node:async_hooks": "src/AsyncStorage.ts",
    "string_decoder": "string_decoder/",
    // util: "util/",
    // module: "module/",
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
    "http": "browser-http",
    "os": "os-browserify",
    "crypto": "crypto-browserify",
    assert: "assert",
    "graceful-fs": "./src/@/lib/memfs",
    fs: "./src/@/lib/memfs",
    "node:fs": "./src/@/lib/memfs",
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
    ".png",
    ".ico",
    ".svg",
    ".jpeg",
    ".jpg",
    ".webp",
    ".gif",
    ".txt",

    ".css",
    ".json",
    ".mjs",
    ".html",
    ".js",
    ".wasm",
  ],

  loader: {
    ".ttf": "file",
    ".svg": "file",

    ".jpeg": "file",
    ".jpg": "file",
    ".webp": "file",
    ".gif": "file",
    ".txt": "text",
    ".json": "json",
    ".mjs": "js",
    ".js": "js",
    ".jsx": "jsx",
    ".ts": "ts",
    ".tsx": "tsx",

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
    fetchPlugin("/"),
  ],
});

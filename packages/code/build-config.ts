import type { BuildOptions } from "esbuild";
import { Environment } from "./build-tasks.ts";
import { makeEnv } from "./helpers.ts";
import { fetchPlugin } from "./src/fetchPlugin.ts";

export const buildOptions: BuildOptions = {
  target: "es2022",
  sourcemap: false,
  outdir: "dist",
  bundle: true,
  outExtension: { ".js": ".mjs" },
  alias: {
    path: "path-browserify",
    buffer: "buffer/",
    "node:buffer": "buffer/",
    "node:async_hooks": "src/AsyncStorage.ts",
    util: "util",
    constants: "constants/",
    module: "module/",
    events: "events/",

    // events: "events",

    stream: "stream-browserify",
    "node:stream": "stream-browserify",
    "file-type": "../../node_modules/file-type/browser.js",
    "node:os": "os-browserify",
    "os": "os-browserify",
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
    ".ttf": "dataurl",
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
  plugins: [fetchPlugin()],
});

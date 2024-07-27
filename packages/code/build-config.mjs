import { makeEnv } from "./helpers.mjs";
import { fetchPlugin } from "./src/fetchPlugin.mjs";

export const buildOptions = {
  target: "es2022",
  sourcemap: false,
  outdir: "dist",
  bundle: true,
  outExtension: { ".js": ".mjs" },
  alias: {
    path: "path-browserify",
    buffer: "buffer/",
    "node:buffer": "buffer/",

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
    "./mST",
    "esm-worker",
    "/swVersion.mjs",

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

export const getCommonBuildOptions = (environment) => ({
  ...buildOptions,
  define: makeEnv(environment),
  plugins: [fetchPlugin],
});

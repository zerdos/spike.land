import { env } from "./esbuild-depts.mjs";
import { fetchPlugin } from "./src/fetchPlugin.mjs";
// import * as fs from "fs";

export const environment = env.get("NODE_ENV") === "production"
  ? "production"
  : "development";

export const outdir = "dist";
export const target = "es2022";
export const isDevelopment = environment !== "production";

export const workerEntryPoints = [
  "monaco-editor/esm/vs/language/typescript/ts.worker",
  "monaco-editor/esm/vs/editor/editor.worker",
];

export const buildOptions = {
  target,
  //   plugins: [fetchPlugin],
  sourcemap: false,
  outdir,
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

  // alias: {
  //   "react-rnd": "/*react-rnd@10.3.7",
  // },
  //  entryNames: "[dir]/[name]-[hash]",
  platform: "browser",
  external: [
    "./mST",
    "esm-worker",
    "/swVersion.mjs",

    "__STATIC_CONTENT_MANIFEST",
    "/dist.shasum.js",
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

import https from "https";
import http from "http";

import esbuild from "esbuild";
import * as importMap from "esbuild-plugin-import-map";

// import jsonData from "./js/importmap.json" assert { type: "json" };

const jsonData = {imports:  {
  react:  "https://spike.land/dist/react.mjs",
  "react-dom":  "https://spike.land/dist/react.mjs",
  "framer-motion": "https://spike.land/dist/framer-motion.mjs",
  "@emotion/react": "https://spike.land/dist/emotion.mjs"
}}

const environment = process.env.NODE_ENV == "production"
  ? "production"
  : "development";
const isDevelopment = environment === "development";

importMap.load(jsonData);
const importMapPlugin = importMap.plugin();

let httpPlugin = {
  name: "http",
  setup(build) {
    // Intercept import paths starting with "http:" and "https:" so
    // esbuild doesn't attempt to map them to a file system location.
    // Tag them with the "http-url" namespace to associate them with
    // this plugin.
    build.onResolve({ filter: /^https?:\/\// }, (args) => ({
      path: args.path,
      namespace: "http-url",
    }));

    // We also want to intercept all import paths inside downloaded
    // files and resolve them against the original URL. All of these
    // files will be in the "http-url" namespace. Make sure to keep
    // the newly resolved URL in the "http-url" namespace so imports
    // inside it will also be resolved as URLs recursively.
    build.onResolve({ filter: /.*/, namespace: "http-url" }, (args) => ({
      path: new URL(args.path, args.importer).toString(),
      namespace: "http-url",
    }));

    // When a URL is loaded, we want to actually download the content
    // from the internet. This has just enough logic to be able to
    // handle the example import from unpkg.com but in reality this
    // would probably need to be more complex.
    build.onLoad({ filter: /.*/, namespace: "http-url" }, async (args) => {
      let contents = await new Promise((resolve, reject) => {
        function fetch(url) {
          console.log(`Downloading: ${url}`);
          let lib = url.startsWith("https") ? https : http;
          let req = lib.get(url, (res) => {
            if ([301, 302, 307].includes(res.statusCode)) {
              fetch(new URL(res.headers.location, url).toString());
              req.abort();
            } else if (res.statusCode === 200) {
              let chunks = [];
              res.on("data", (chunk) => chunks.push(chunk));
              res.on("end", () => resolve(Buffer.concat(chunks)));
            } else {
              reject(new Error(`GET ${url} failed: status ${res.statusCode}`));
            }
          }).on("error", reject);
        }
        fetch(args.path);
      });
      return { contents };
    });
  },
};

console.log(`
-------------------------------------------------
--------------${environment}---------------------
-------------------------------------------------`);

const workerEntryPoints = [
  // "vs/language/json/json.worker.js",
  // "vs/language/css/css.worker.js",
  // "vs/language/html/html.worker.js",
  "vs/language/typescript/ts.worker.js",
  "vs/editor/editor.worker.js",
].map((entry) => `monaco-editor/esm/${entry}`);

await esbuild.build({
  entryPoints: [
    ...workerEntryPoints,
    // "./js/workers/prettier.worker.js",
  ],
  bundle: true,
  target: "es2017",
  sourcemap: isDevelopment,
  minify: !isDevelopment,
  minifyWhitespace: !isDevelopment,
  minifyIdentifiers: !isDevelopment,
  minifySyntax: !isDevelopment,
  legalComments: "external",
  treeShaking: !isDevelopment,
  outExtension: {".js": ".workerJs"},
  plugins: [importMapPlugin],
  platform: "browser",
  define: {
    "process.env.NODE_ENV": `"${environment}"`,
  },

  format: "iife",

  // loader: {   ".worker.js": "dataurl"},
  outdir: "js/dist/workers/",
});

await esbuild.build({
  entryPoints: ["./js/appStarter.ts"
  ],
  outfile: "./js/dist/appStarter.js",
  bundle: true,
  target: "es2017",
  minify: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
  legalComments: "external",

  platform: "browser",
  define: {
    "process.env.NODE_ENV": `"${environment}"`,
  },

  format: "iife",
});

const build = (entryPoints) =>
  esbuild.build({
    entryPoints,
    "outExtension": { ".js": ".mjs" },
    bundle: true,
    format: "esm",
    minify: !isDevelopment,
    sourcemap: "external",
    minifyIdentifiers: true,
    minifyWhitespace: true,
    minifySyntax: true,
    splitting: true,
    sourcemap: isDevelopment,
    allowOverwrite: true,
    treeShaking: !isDevelopment,
    tsconfig: "./tsconfig.json",
    platform: "browser",
    ignoreAnnotations: true,
    chunkNames: "chunks/[name]-[hash]",
    resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".css", ".json", ".mjs"],
    target: "es2017",
    define: {
      "process.env.NODE_ENV": `"${environment}"`,
    },
    plugins: [importMapPlugin],
    loader: {
      ".ttf": "file",
      ".webp": "dataurl",
      ".tsx": "tsx",
      ".ts": "ts",
      ".d.ts": "dataurl",
      ".workerJs": "dataurl",
      ".wasm": "dataurl",
    },
    outdir: "js/dist",
  }).catch(() => process.exit(1));

// await build([
//   "js/renderPreviewWindow.tsx",
//   "js/renderToString.tsx",
//   "js/session.tsx",
// ]);
// await build([
//   //   "js/renderPreviewWindow.tsx",
//   //   "js/templates.ts",
//   //   "js/renderToString.tsx",

// ]);

await build([
  "js/starter.mjs",
]);

// esbuild.build({
//   entryPoints: [
//     "js/mui.ts",
//   ],
//   "outExtension": { ".js": ".mjs" },
//   bundle: true,
//   format: "esm",
// minify: fa,

//   splitting: true,
//   treeShaking: true,
//   platform: "browser",
//   sourcemap: false,
//   resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".css", ".json", ".mjs"],
//   target: ["es2020"],
//   plugins: [importMap.plugin()],
//   outdir: "dist",
// }).catch(() => process.exit(1));

// esbuild.build({
//   entryPoints: ["js/ws.mjs"],
//   bundle: true,
//   format: "esm",
//   minify: false,
//   treeShaking: false,
//   sourcemap: true,
//   resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".css", ".json", ".mjs"],
//   target: ["es2017"],
//   plugins: [importMap.plugin()],
//   outfile: "dist/ws.mjs",
// }).catch(() => process.exit(1));

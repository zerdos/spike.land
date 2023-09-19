import { build as esmBuild, BuildOptions, initialize, transform } from "esbuild-wasm";
import { wasmFile } from "./esbuildWASM";
import { fetchPlugin } from "./fetchPlugin.mjs";
import { importMapReplace } from "./importMapReplace";
import {Mutex} from "async-mutex";
const mutex = new Mutex();

declare const self:
  & ServiceWorkerGlobalScope
  & {
    mod: {
      init: boolean | Promise<boolean>
    };
  };

const mod = self.mod = self.mod
  || {
    init: false as (boolean | Promise<void> | NodeJS.Timeout),
    initialize: (wasmModule: WebAssembly.Module) =>  mutex.runExclusive(()=> self.mod.init as boolean) || initialize({
        wasmModule,
        worker: false,
      }).then(() => self.mod.init = true) as Promise<boolean> | NodeJS.Timeout
    }

export const cjs = async (code: string) => {
  const { code: cjs } = await transform(code, {
    loader: "tsx",
    format: "cjs",
    treeShaking: true,
    platform: "browser",
    minify: false,
    charset: "utf8",
    //   globalName: md5(code),
    keepNames: true,
    tsconfigRaw: {
      compilerOptions: {
        jsx: "react-jsx",
        useDefineForClassFields: false,
        jsxFragmentFactory: "Fragment",
        jsxImportSource: "@emotion/react",
      },
    },
    target: "chrome88",
  });
  return cjs;
};

export const transpile = async (
  code: string,
  origin: string,
  wasmModule?: WebAssembly.Module,
) => {
 
  mod.init = mod.init || await initialize(wasmModule || {
    wasmURL: `/${wasmFile}`,
    worker: false,
  }) || true;

  if (mod.init  !== true) await mod.init;
  

  return transform(code, {
    loader: "tsx",
    format: "esm",
    treeShaking: true,
    platform: "browser",
    minify: false,
    charset: "utf8",
    //   globalName: md5(code),
    keepNames: true,
    tsconfigRaw: {
      compilerOptions: {
        jsx: "react-jsx",
        useDefineForClassFields: false,
        jsxFragmentFactory: "Fragment",
        jsxImportSource: "@emotion/react",
      },
    },
    target: "chrome88",
  }).then((x) => importMapReplace(x.code, origin));
};

Object.assign(self, { transpile });

export const build = async (
  { codeSpace, origin, wasmModule }: {
    codeSpace: string;
    origin: string;
    wasmModule?: WebAssembly.Module;
  },
) => {
  mod.init = mod.init || await initialize(wasmModule || {
    wasmURL: `/${wasmFile}`,
    worker: false,
  }) || true;

  if (mod.init !== true) await mod.init;
  

  const makeEnv = (environment: string) => ({
    "process.env.NODE_ENV": `"${environment}"`,
    "process.env.NODE_DEBUG": JSON.stringify(false),
    "process.browser": JSON.stringify(true),
    "process.env.DEBUG": JSON.stringify(false),
    "isBrowser": JSON.stringify(true),
    "isJest": JSON.stringify(false),
    "process.env.version": "\"1.1.1\"",
    global: "globalThis",

    "WORKER_DOM_DEBUG": JSON.stringify(false),
    "process.env.DUMP_SESSION_KEYS": JSON.stringify(false),
    // "libFileMap": JSON.stringify({}),
    process: JSON.stringify({
      version: "v19.5.0",
      versions: {
        node: "v19.5.0",
      },
      cwd: JSON.stringify(() => "/"),

      env: {
        NODE_ENV: `${environment}`,
        version: "v19.5.0",
        cwd: JSON.stringify(() => "/"),
        browser: true,
        isWebworker: true,
        NODE_DEBUG: false,
        DEBUG: false,
        isBrowser: true,
        versions: {
          node: "v19.5.0",
        },
      },
      browser: true,
    }),
  });
  const define = makeEnv("production");
  const defaultOpts: BuildOptions = {
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
      ".ttf",
    ],
    loader: {
      ".js": "js",
      ".mjs": "js",
      ".json": "json",
      ".tsx": "tsx",
      ".css": "css",
      ".ttf": "dataurl",
    },
    outExtension: { ".js": ".mjs" },
    write: false,

    // metafile: false,
    // alias: {
    //  ...importMap.imports,
    // },

    target: "esnext",
    outdir: `${origin}/live/${codeSpace}/`,
    treeShaking: true,
    bundle: true,
    define,
    keepNames: false,
    ignoreAnnotations: true,

    minifySyntax: true,
    minifyIdentifiers: true,
    minifyWhitespace: false,

    splitting: false,

    format: "esm",
    platform: "browser",
    entryPoints: [
      `${origin}/live/${codeSpace}/index.js`,
    ],
    packages: "external",

    plugins: [fetchPlugin],
  };


  return esmBuild(defaultOpts).then((x) => importMapReplace(x.outputFiles![0].text, origin)).then((x) => fetch(`${origin}/live/${codeSpace}/index.mjs`, {
      method: "PUT",
      body: x,
      headers: {
        "Content-Type": "application/javascript",
        "TR_ORIGIN": `origin`,
        "TR_BUNDLE": `true`,
      },
    }).then(() => x)
  );
};

Object.assign(self, { transpile, build });

import { build as esmBuild, BuildOptions, BuildResult, initialize, transform } from "esbuild-wasm";
import { wasmFile } from "./esbuildWASM";
import { fetchPlugin } from "./fetchPlugin";
import { importMapReplace } from "./importMapReplace";
import { wait } from "./wait";

declare const self:
  & ServiceWorkerGlobalScope
  & {
    mod: {
      init: boolean | Promise<boolean>;
      initialize: (
        wasmModule: WebAssembly.Module,
      ) => Promise<boolean> | boolean;
    };
  };

const mod = self.mod = self.mod
  || {
    init: false as (boolean | Promise<void> | NodeJS.Timeout),
    initialize: (wasmModule: WebAssembly.Module) =>
      (self.mod.init as boolean) || initialize({
        wasmModule,
        worker: false,
      }).then(() => self.mod.init = true) as Promise<boolean> | NodeJS.Timeout,
  };

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
  if (wasmModule) {
    const initFinished = mod.initialize(wasmModule);

    if (initFinished !== true) await (initFinished);
  } else {
    mod.init = mod.init || initialize({
      wasmURL: `/${wasmFile}`,
      worker: false,
    }).then(() => {
      return mod.init = true;
    });

    const offLoadToServer = (code: string) =>
      fetch(`https://js.spike.land?v=${swVersion}`, {
        method: "POST",
        body: code,
        headers: { TR_ORIGIN: origin },
      }).then((resp) => resp.text());
    if (mod.init !== true) await wait(1000);
    if (mod.init !== true) return offLoadToServer(code);
  }

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
  { codeSpace, origin, wasmModule }: { codeSpace: string; origin: string; wasmModule?: WebAssembly.Module },
) => {
  if (wasmModule) {
    const initFinished = mod.initialize(wasmModule);

    if (initFinished !== true) await (initFinished);
  } else {
    mod.init = mod.init || initialize({
      wasmURL: `/${wasmFile}`,
      worker: false,
    }).then(() => {
      return mod.init = true;
    });
  }

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
  const define = makeEnv("development");
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
      ".js": "tsx",
      ".mjs": "ts",
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

    target: "es2021",
    outdir: `${location.origin}/live/${codeSpace}/`,
    treeShaking: true,
    minify: true,

    define,

    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,

    splitting: false,

    format: "esm",
    platform: "browser",
    entryPoints: [
      `${origin}/live/${codeSpace}/index.js`,
    ],
    packages: "external",

    plugins: [fetchPlugin],
  };
  let b: BuildResult;

  return esmBuild(defaultOpts).then((x) => importMapReplace(x.outputFiles![0].text, origin)).then(x =>
    fetch(`${origin}/live/${codeSpace}`, {
      method: "POST",
      body: x,
      headers: { "Content-Type": "application/javascript", "TR_ORIGIN": `origin`, "TR_BUNDLE": `true` },
    }).then(x => x.text()).then(x => console.log(x))
  );
};

Object.assign(self, { transpile, build });

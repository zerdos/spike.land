import wasmModule from "./esbuild-loader";
// const wasmModule = new WebAssembly.Instance(mod).exports.Module;

import { initialize, transform, type TransformOptions } from "esbuild-wasm";

Object.assign(globalThis, {
  performance: {
    now: () => Date.now(),
  },
});

import { importMapReplace } from "../../code/dist/src/session.mjs";

// import impMap from "./importmap.json";
//
// import { imports as importMapImports } from "./importmap.json";

//   import { fetchPlugin } from "./fetchPlugin";
//   import { importMapReplace } from "./importMapReplace";
//   import { md5 } from "./md5";
//   import { unpkgPathPlugin } from "./unpkg-path-plugin";


const mod = {
  wasmModule: n
  init: false as (boolean | Promise<void>),
  initialize: (wasmModule) =>
    mod.init || initialize({
      wasmModule,
      worker: false,
    }).then(() => mod.init = true) as Promise<void>,
};

export const initAndTransform = async (
  code: string,
  opts: TransformOptions,
  origin: string,
) => {
  // const code = prettierJs(c)!;
  const wasm = await import(wasmModule);
  const initFinished = mod.initialize(wasm);

  if (initFinished !== true) await (initFinished);

  return await esmTransform(code, origin);
};

export async function esmTransform(code: string, origin: string) {
  // transform = transform || (await import(`./esbuildEsm`)).transform;
  const transpiled = await transform(code, {
    loader: "tsx",
    format: "esm",
    treeShaking: true,
    platform: "browser",
    minify: false,
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
    target: "es2022",
  } as unknown as TransformOptions);

  // apps[md5(transpiled.code)] = require(md5(code));
  if (origin) return importMapReplace(transpiled.code, origin, origin);
  else return transpiled.code;
}

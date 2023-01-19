import wasmModule from "esbuild-wasm/esbuild.wasm";

// import wasmModule from "./esbuild-wasm/esbuild.wasm";
// const wasmModule = new WebAssembly.Instance(mod).exports.Module;

import { initialize, transform, type TransformOptions } from "esbuild-wasm";

Object.assign(globalThis, {
  performance: {
    now: () => Date.now(),
  },
});

import { importMapReplace } from "../../code/src/importMapReplace";

// import impMap from "./importmap.json";
//
// import { imports as importMapImports } from "./importmap.json";

//   import { fetchPlugin } from "./fetchPlugin";
//   import { importMapReplace } from "./importMapReplace";
//   import { md5 } from "./md5";
//   import { unpkgPathPlugin } from "./unpkg-path-plugin";

const mod = {
  init: false as (boolean | Promise<void>),
  initialize: () =>
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
  const initFinished = mod.initialize();

  if (initFinished !== true) await (initFinished);

  return esmTransform(code, origin);
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
  if (origin) return importMapReplace(transpiled.code, origin);
  else return transpiled.code;
}

export default {
  async fetch(request: Request) {
    // const url = new URL(request.url);
    if (request.method === "POST") {
      return new Response(await initAndTransform(await request.text(), {}, request.headers.get("TR_ORIGIN")!), request);
    }
  },
};

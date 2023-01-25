import wasmModule from "esbuild-wasm/esbuild.wasm";
import { transpile } from "../../code/src/transpile";

// import wasmModule from "./esbuild-wasm/esbuild.wasm";
// const wasmModule = new WebAssembly.Instance(mod).exports.Module;

// import { initialize, transform, type TransformOptions } from "esbuild-wasm";

Object.assign(globalThis, {
  performance: {
    now: () => Date.now(),
  },
});

// import { importMapReplace } from "../../code/src/importMapReplace";

// import impMap from "./importmap.json";
//
// import { imports as importMapImports } from "./importmap.json";

//   import { fetchPlugin } from "./fetchPlugin";
//   import { importMapReplace } from "./importMapReplace";
//   import { md5 } from "./md5";
//   import { unpkgPathPlugin } from "./unpkg-path-plugin";

// const mod = {
//   init: false as (boolean | Promise<void>),
//   initialize: () =>
//     mod.init || initialize({
//       wasmModule,
//       worker: false,
//     }).then(() => mod.init = true) as Promise<void>,
// };

export const initAndTransform = (
  code: string,
  // opts: TransformOptions,
  origin: string,
) => transpile(code, origin, wasmModule);
// const code = prettierJs(c)!;
// const initFinished = mod.initialize();

// if (initFinished !== true) await (initFinished);

// return transform(code, origin);
// };

export default {
  async fetch(request: Request) {
    if (request.method === "POST") {
      return new Response(await initAndTransform(await request.text(), request.headers.get("TR_ORIGIN")!), {
        ...request,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    } else {return new Response("try to POST", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });}
  },
};

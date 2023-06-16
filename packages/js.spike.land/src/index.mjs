import { initialize } from "esbuild-wasm";
import wasmModule from "esbuild-wasm/esbuild.wasm";
// import { buildT } from "../../code/src/esbuildEsmBuild";
import { build, transpile } from "../../code/src/transpile";
import ASSET_HASH from "./dist.shasum";

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

const initAndTransform = (
  code,
  // opts: TransformOptions,
  origin,
) => transpile(code, origin, wasmModule);
// const code = prettierJs(c)!;
// const initFinished = mod.initialize();

// if (initFinished !== true) await (initFinished);

// return transform(code, origin);
// };

export default {
  async fetch(request) {
    const params = new URL(request.url).searchParams;
    const { code, origin } = Object.fromEntries(params.entries());

    if (request.method === "GET") {
      return new Response(
        await build({ code, origin, wasmModule }),
      ),
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/javascript",
            "cache-control": "no-cache",
          },
        };
    }
    if (request.method === "POST") {
      return new Response(
        await initAndTransform(
          await request.text(),
          request.headers.get("TR_ORIGIN"),
          ASSET_HASH,
        ).catch(async () =>
          await initAndTransform(
            `
        export default ()=><h1>Transpile error</h1>
        `,
            request.headers.get("TR_ORIGIN"),
            ASSET_HASH,
          )
        ),
        {
          ...request,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
          },
        },
      );
    }
    if (request.method === "GET") {
      const params = new URL(request.url).searchParams;
      const { code, origin } = Object.fromEntries(params.entries());

      if (code && origin) {
        const { buildT } = await import("../../code/src/esbuildEsmBuild");
        return new Response(
          await buildT(
            code,
            { bundle: true },
            new AbortController(),
            `https://${origin}.spike.land/`,
            { esbuildBuild: build, initialize },
          ),
        ),
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*",
              "Content-Type": "application/javascript",
              "cache-control": "no-cache",
            },
          };
      }
      return new Response("404", { status: 404 });
    }
    return new Response("try to POST", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    });
  },
};

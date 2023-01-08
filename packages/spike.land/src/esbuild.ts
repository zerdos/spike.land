import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import { initialize, Location, transform, type TransformOptions } from "esbuild-wasm";
import { importMapReplace } from "../../code/dist/src/session.mjs";
import pkg from "../package.json" assert { type: "json" };
import { ASSET_MANIFEST, files } from "./staticContent.mjs";

export const initAndTransform = async (
  code: string,
  opts: TransformOptions,
  origin: string,
  env,
) => {
  const request = new Request("https://testing.spike.land/src/chunk-esbuild-M4QDVZDG.wasm");

  const resp = await fetch(request // waitUntil: async (prom) => await prom,
    // {
    // cacheControl: (isChunk(url.href)
    //   ? {
    //     browserTTL: 2 * 60 * 60 * 24,
    //     edgeTTL: 2 * 60 * 60 * 24,
    //     orbypassCache: false,
    //   }
    //   : {
    //     browserTTL: 0,
    //     edgeTTL: 0,
    //     bypassCache: true,
    //   }),
    //   ASSET_NAMESPACE: env.__STATIC_CONTENT,
    //   ASSET_MANIFEST,
    // },
  );

  if (!resp.ok) return resp;

  const vers = pkg.dependencies["esbuild-wasm"];

  // const wasmModule = new WebAssembly.Instance(was).exports.Module;

  Object.assign(globalThis, {
    performance: {
      now: () => Date.now(),
    },
  });

  // import impMap from "./importMap.json";
  //
  // import { imports as importMapImports } from "./importMap.json";

  //   import { fetchPlugin } from "./fetchPlugin";
  //   import { importMapReplace } from "./importMapReplace";
  //   import { md5 } from "./md5";
  //   import { unpkgPathPlugin } from "./unpkg-path-plugin";

  // function createJsBlob(code: string | Uint8Array) {
  //   return URL.createObjectURL(
  //     new Blob([code], {
  //       type: "application/wasm",
  //     }),
  //   );
  // }

  const mod = {
    init: false as (boolean | Promise<void>),
    initialize: async () => {
      // import(`https://testing.spike.land/esbuild-wasm@${vers}/esbuild.wasm`).then(was=>
      // const was = await fetch(`https://testing.spike.land/esbuild-wasm@${vers}/esbuild.wasm`).then(r => r.blob());
      // const wasmModule = new WebAssembly.Instance(was).exports.Module;
      const importObject = {
        imports: {
          imported_func(arg) {
            console.log(arg);
          },
        },
      };

      mod.init || initialize({
        wasmModule: resp.blob({ type: "application/wasm" }).then(Blob => WebAssembly.instantiate(Blob))
          .then(results => results.exports.Module),

        worker: false,
      }).then(() => mod.init = true) as Promise<void>;
    },
  };

  // const code = prettierJs(c)!;
  const initFinished = mod.initialize();

  if (initFinished !== true) await (initFinished);

  return await esmTransform(code, origin, location);
};

export async function esmTransform(code: string, origin: string, env) {
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
  if (origin) return importMapReplace(transpiled.code, origin, location);
  else return transpiled.code;
}

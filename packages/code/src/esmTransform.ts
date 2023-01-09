import type { TransformOptions } from "esbuild-wasm";
import { initialize, transform as esbTransform } from "esbuild-wasm";




export const initAndTransform = async (
  code: string,
  opts: TransformOptions,
  origin: string,
) => {
  // const code = prettierJs(c)!;
  const initFinished = mod.initialize();

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


const mod = {
  init: false as (boolean | Promise<void>),
  initialize: () => {
    if (mod.init !== false) return mod.init;

    return fetch(`${location.origin}/files.json`).then((f) => f.json()).then(
      (k) => {
        const wasmURL = new URL(
          k[
            Object.keys(k).find((i) =>
              i.indexOf(".wasm") !== -1 && i.indexOf("esbuild") !== -1
            ) as unknown as keyof typeof k
          ],
          location.origin,
        ).toString();
        mod.init = initialize({
          wasmURL,
        }).then(() => mod.init = true) as Promise<void>;
        return mod.init;
      },
    );
  },
};

export const transform = async (
  code: string,
  opts: TransformOptions,
) => {
  const initFinished = mod.initialize();
  if (initFinished !== true) await (initFinished);

  return esbTransform(code, opts);
};

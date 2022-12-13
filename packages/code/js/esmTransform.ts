import type { TransformOptions } from "esbuild-wasm";
import { initialize, transform as esbTransform } from "esbuild-wasm";

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

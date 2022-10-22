import { initialize, transform } from "esbuild-wasm";
import wasmFile from "esbuild-wasm/esbuild.wasm";
import { md5 } from "md5";

const mod = {
  init: false as (boolean | Promise<void>),
  initialize: () => {
    if (mod.init !== false) return mod.init;
    const wasmURL = new URL(wasmFile, location.origin).toString();
    mod.init = initialize({
      wasmURL,
    }).then(() => mod.init = true) as Promise<void>;
    return mod.init;
  },
};

export const initAndTransform: typeof transform = async (code, opts) => {
  const initFinished = mod.initialize();

  if (initFinished !== true) await (initFinished);

  return transform(code, opts) + "//" + md5(code);
};

export { initAndTransform as transform };

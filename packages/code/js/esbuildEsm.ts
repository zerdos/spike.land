// Import { Mutex } from "async-mutex";

// import "core-js/proposals/string-replace-all-stage-4";

import { initialize, transform as esbTransform } from "esbuild-wasm";
import wasmURL from "esbuild-wasm/esbuild.wasm"
// Import type { transform } from "esbuild/lib/main";

const mod = {
  init: false as (boolean | Promise<void>),
  initialize: () => {
    if (mod.init!==false) return mod.init;
    mod.init = initialize({
      wasmURL
    }).then(()=>mod.init=true) as Promise<void>;
    return mod.init;
  }
}

// Const mutex = new Mutex();
export const transform: typeof esbTransform = async (code, opts) => {
  const initFinished = mod.initialize();

  if (initFinished !== true)  await (initFinished);

  return esbTransform(code, opts);
};

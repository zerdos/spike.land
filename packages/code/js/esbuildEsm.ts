// Import { Mutex } from "async-mutex";

// import "core-js/proposals/string-replace-all-stage-4";

import { initialize, transform as esbTransform } from "esbuild-wasm";

// Import type { transform } from "esbuild/lib/main";

let initFinished: Promise<boolean> | boolean = false;
// Const mutex = new Mutex();
export const transform: typeof esbTransform = async (code, opts) => {
  initFinished = initFinished || (initialize({
    wasmURL: new URL(
      (await import("esbuild-wasm/esbuild.wasm")).default,
      location.origin,
    ).toString(),
  }).then(() => true).catch(() => false));
  if (initFinished !== true) initFinished = await (initFinished);

  if (initFinished !== true) {
    throw new Error("esbuild init failed");
  }

  return esbTransform(code, opts);
};

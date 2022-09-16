import { Mutex } from "async-mutex";

// import "core-js/proposals/string-replace-all-stage-4";

import { initialize, transform } from "esbuild-wasm";
import wasmURL from "esbuild-wasm/esbuild.wasm";

// import type { transform } from "esbuild/lib/main";

let initFinished: Promise<boolean> | boolean = false;

const esbuild = {
  transform: (new Mutex()).runExclusive(() => transform),
};

export const init = async () => {
  try {
    if (initFinished === true) return esbuild;

    initFinished = initFinished || new Promise<boolean>((resolve) => {
      initialize(
        {
          wasmURL: new URL(wasmURL, location.origin).toString(),
        },
      ).then(() => resolve(true));
    });

    if (await initFinished === true) return esbuild;
    throw new Error("esbuild couldn't initialize");
  } catch {
    throw new Error("esbuild couldn't initialize");
  } finally {
    if (await initFinished === true) return esbuild;
    throw new Error("esbuild couldn't initialize");
  }
};

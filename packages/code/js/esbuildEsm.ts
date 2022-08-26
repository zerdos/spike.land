// import "core-js/proposals/string-replace-all-stage-4";

import { Mutex } from "async-mutex";
import esbuild from "esbuild-wasm";
import wasmURL from "esbuild-wasm/esbuild.wasm?url";
import type { transform } from "esbuild/lib/main";

const mod = {
  initFinished: false,
  build: esbuild.build,
  transform: (esbuild.transform as unknown) as typeof transform,
};

const mutex = new Mutex();

export const init = async () => {
  if (mod.initFinished) return mod;

  await mutex.runExclusive(async () => {
    mod.initFinished || await esbuild.initialize(
      {
        wasmURL: wasmURL as unknown as string,
      },
    );
    mod.initFinished = true;
    return true;
  });

  return mod;
};

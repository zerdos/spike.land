// import { Mutex } from "async-mutex";
// import {initialize, transform} from "./esbuildEsm";
import * as esbuild from "esbuild-wasm";
// import wasmUrl from  "./esbuild.wasm"
// import { wait } from "./wait";

export const init = async (wasmUrl) => {
  await esbuild.initialize({
    wasmUrl,
  });
};

// const mutex = new Mutex();

export const transform = async (code: string, retry = 4): Promise<string> => {
  //const startTime = performance.now();

  let result;
  try {
    // await mutex.waitForUnlock();

    result = await esbuild.transform(
      `/** @jsx jsX */
    import {jsx as jsX} from "@emotion/react";
    ` +
        code,
      {
        loader: "tsx",
        target: "esnext",
      },
    );
  } catch (e) {
    if (retry > 0) {
      //   await wait(100);
      return transform(code, retry - 1);
    }
    throw e;
  }

  // const endTime = performance.now();

  // console.log(`esbuildEsmTransform: took ${endTime - startTime} milliseconds`);
  return result.code;
};

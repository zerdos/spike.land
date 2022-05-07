import { Mutex } from "async-mutex";
import * as esbuild from "esbuild-wasm";
import { wait } from "./wait";

let initFinished = false;

export const init = async (wasmURL: "./esbuild.wasm", wasmModule: null) => {
  if (wasmModule){
    await esbuild.initialize({
      wasmModule
    });
  }
  else {
    await esbuild.initialize({
      wasmURL
    
    });
  }
 

  initFinished = true;
};

const mutex = new Mutex();

export const transform = async (code: string, retry = 4): Promise<string> => {
  //const startTime = performance.now();

  if (initFinished || await init()) {
    initFinished = true;
  }

  let result;
  try {
    await mutex.waitForUnlock();

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
      await wait(100);
      return transform(code, retry - 1);
    }
    throw e;
  }

  // const endTime = performance.now();

  // console.log(`esbuildEsmTransform: took ${endTime - startTime} milliseconds`);
  return result.code;
};

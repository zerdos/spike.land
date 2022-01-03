import { Mutex } from "async-mutex";
import * as esbuild from "https://unpkg.com/esbuild-wasm@0.14.10/esm/browser.min.js";

const init = esbuild.initialize({
  wasmURL: "https://unpkg.com/esbuild-wasm@0.14.10/esbuild.wasm",
});

let initFinished = false;
const mutex = new Mutex();

export const transform = async (code) => {
  const startTime = performance.now();

  await mutex.waitForUnlock();

  if (initFinished || await init) {
    initFinished = true;
  }

  const result = await esbuild.transform(code, {
    loader: "tsx",
    target: "es2018",
  });

  const endTime = performance.now();

  console.log(`esbuildEsmTransform: took ${endTime - startTime} milliseconds`);
  return result.code;
};

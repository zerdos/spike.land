import { Mutex } from "async-mutex";
import * as esbuild from "https://unpkg.com/esbuild-wasm@0.14.9/esm/browser.min.js";

const init = esbuild.initialize({
  wasmURL: "https://unpkg.com/esbuild-wasm@0.14.9/esbuild.wasm",
});

let initFinished = false;
const mutex = new Mutex();

export const transform = async (code) => {
  var startTime = performance.now();

  await mutex.waitForUnlock();

  if (!initFinished) {
    initFinished = true;
  }

  const result = await esbuild.transform(code, {
    loader: "tsx",
    // minify: true,
    // treeShaking: true,
    target: "es2018",
  });

  var endTime = performance.now();

  console.log(`esbuildEsmTransform: took ${endTime - startTime} milliseconds`);
  return result.code;
};

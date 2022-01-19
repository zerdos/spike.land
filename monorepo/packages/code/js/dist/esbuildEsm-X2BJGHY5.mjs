import "./chunk-L7N3FHV6.mjs";

// js/esbuildEsm.mjs
import { Mutex } from "https://ga.jspm.io/npm:async-mutex@0.3.2/index.mjs";
import * as esbuild from "https://unpkg.com/esbuild-wasm@0.14.10/esm/browser.min.js";

// js/wait.ts
async function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

// js/esbuildEsm.mjs
var init = esbuild.initialize({
  wasmURL: "https://unpkg.com/esbuild-wasm@0.14.10/esbuild.wasm"
});
var initFinished = false;
var mutex = new Mutex();
var transform2 = async (code, retry = 4) => {
  const startTime = performance.now();
  if (initFinished || await init) {
    initFinished = true;
  }
  let result;
  try {
    await mutex.waitForUnlock();
    result = await esbuild.transform(code, {
      loader: "tsx",
      target: "es2018"
    });
  } catch (e) {
    if (retry > 0) {
      await wait(100);
      return transform2(code, retry - 1);
    }
    throw e;
  }
  const endTime = performance.now();
  console.log(`esbuildEsmTransform: took ${endTime - startTime} milliseconds`);
  return result.code;
};
export {
  transform2 as transform
};
//# sourceMappingURL=esbuildEsm-X2BJGHY5.mjs.map

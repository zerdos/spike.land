// js/esbuildEsm.mjs
import { Mutex } from "https://ga.jspm.io/npm:async-mutex@0.3.2/index.mjs";
import * as esbuild from "https://unpkg.com/esbuild-wasm@0.14.10/esm/browser.min.js";
var init = esbuild.initialize({
  wasmURL: "https://unpkg.com/esbuild-wasm@0.14.10/esbuild.wasm"
});
var initFinished = false;
var mutex = new Mutex();
var transform2 = async (code) => {
  const startTime = performance.now();
  await mutex.waitForUnlock();
  if (initFinished || await init) {
    initFinished = true;
  }
  const result = await esbuild.transform(code, {
    loader: "tsx",
    target: "es2018"
  });
  const endTime = performance.now();
  console.log(`esbuildEsmTransform: took ${endTime - startTime} milliseconds`);
  return result.code;
};
export {
  transform2 as transform
};
//# sourceMappingURL=esbuildEsm-GJGLR2JG.mjs.map

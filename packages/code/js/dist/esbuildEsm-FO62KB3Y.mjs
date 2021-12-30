import "./chunk-42U43NKG.mjs";

// js/esbuildEsm.mjs
import * as esbuild from "https://unpkg.com/esbuild-wasm@0.14.9/esm/browser.min.js";
var init = esbuild.initialize({
  wasmURL: "https://unpkg.com/esbuild-wasm@0.14.9/esbuild.wasm"
});
var initFinished = false;
var transform2 = async (code) => {
  var startTime = performance.now();
  if (!initFinished) {
    await init;
    initFinished = true;
  }
  const result = await esbuild.transform(code, {
    loader: "tsx",
    target: "es2018"
  });
  var endTime = performance.now();
  console.log(`esbuildEsmTransform: took ${endTime - startTime} milliseconds`);
  return result.code;
};
export {
  transform2 as transform
};
//# sourceMappingURL=esbuildEsm-FO62KB3Y.mjs.map

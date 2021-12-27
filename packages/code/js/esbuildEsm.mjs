import * as esbuild from "https://unpkg.com/esbuild-wasm@0.14.8/esm/browser.min.js";

const init = esbuild.initialize({
  wasmURL: "https://unpkg.com/esbuild-wasm@0.14.8/esbuild.wasm",
});

let initFinished = false;

export const transform = async (code) => {

  var startTime = performance.now();

  if (!initFinished) {
    await init;
    initFinished = true;
  }

  const result = await esbuild.transform(code, { loader: "tsx", target: "es2018" });

  var endTime = performance.now();

  console.log(`esbuildEsmTransform: took ${endTime - startTime} milliseconds`);

  return result.code;
};

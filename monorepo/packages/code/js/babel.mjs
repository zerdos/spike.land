import * as esbuild from "esbuild-wasm/esm/browser.js";

const init = esbuild.initialize({
  wasmURL: "esbuild-wasm@0.14.10/esbuild-wasm",
});

let initFinished = false;

export const transform = async (code) => {
  const startTime = performance.now();

  if (!initFinished) {
    await init;
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

import * as esbuild from "esbuild-wasm/esm/browser";

const init = esbuild.initialize({
  wasmURL: "esbuild-wasm@0.14.9/esbuild-wasm",
});

let initFinished = false;

export const transform = async (code) => {
  var startTime = performance.now();

  if (!initFinished) {
    await init;
    initFinished = true;
  }

  const result = await esbuild.transform(code, {
    loader: "tsx",
    target: "es2018",
  });

  var endTime = performance.now();

  console.log(`esbuildEsmTransform: took ${endTime - startTime} milliseconds`);

  return result.code;
};

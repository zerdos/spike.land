// import * as esbuild from "esbuild-wasm/esm/browser";

// // const instance = new WebAssembly.Instance(MYWASMBINDINGNAME);

// const init = esbuild.initialize({
//   wasmURL: "https://unpkg.com/esbuild-wasm@0.14.10/esbuild.wasm",
//   worker: false
// });

// let initFinished = false;

// export const transform = async (code) => {

//   if (!initFinished) {
//     await init;
//     initFinished = true;
//   }

//   const result = await esbuild.transform(code, {
//     loader: "tsx",
//     target: "es2018",
//   });

//   return result.code;
// };

import { Mutex } from "async-mutex";
import * as esbuild from "esbuild-wasm";
import wasmURL from "esbuild-wasm/esbuild.wasm";
import command from "nodemon/lib/config/command";
import { resolve } from "path/posix";
import { wait } from "./wait.ts";

// function createWasmBlob(wasm: string) {
//   const blob = new Blob([wasm], { type: "application/wasm" });

//   return URL.createObjectURL(blob);
// }

let initFinished = false;
globalThis.esbuildMutex = globalThis.esbuildMutex || new Mutex();

const { esbuildMutex } = globalThis;

export const transform = new Promise(async (resolve) => {
  await esbuildMutex.waitForUnlock();
  if (!initFinished) {
    await esbuild.initialize({
      wasmURL,
      worker: false,
    });
    initFinished = true;
  }

  resolve(await tryToTransform(10));
});

const transformAsync = async (src: string) => {
  console.log("transform....");

  const { code } = await esbuild.transform(
    src,
    {
      loader: "tsx",
      target: "es2017",
    },
  );
  console.log("...transform.");
  return code;
};

const tryToTransform = async (retry) => {
  try {
    await esbuild.transform(
      `export const {foo} = {foo: "bar"}`,
    );
    return transformAsync;
  } catch {
    await wait(100);
    if (retry > 0) {
      return tryToTransform(retry - 1);
    }
  }
};

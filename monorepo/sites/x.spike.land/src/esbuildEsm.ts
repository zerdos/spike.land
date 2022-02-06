import { Mutex } from "async-mutex";
import * as esbuild from "esbuild-wasm";
import { wait } from "./wait";


const init = esbuild.initialize({
  wasmURL: `https://unpkg.com/esbuild-wasm@${esbuild.version}/esbuild.wasm`,
});

let initFinished = false;
const mutex = new Mutex();

export const transform = async (code: string, retry = 4): Promise<string> => {

  if (initFinished || await init) {
    initFinished = true;
  }

  let result;
  try {
    await mutex.waitForUnlock();
    result = await esbuild.transform(code, {
      loader: "tsx",
      target: "es2018",
    });
  } catch (e) {
    if (retry > 0) {
      await wait(100);
      return transform(code, retry - 1);
    }
    throw e;
  }

  return result.code;
};

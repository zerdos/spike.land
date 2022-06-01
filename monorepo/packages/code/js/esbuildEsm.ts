import "core-js/proposals/string-replace-all-stage-4";

import { Mutex } from "async-mutex";
import * as esbuild from "esbuild-wasm";
import { wait } from "./wait";

const mod = { initFinished: false };

const mutex = new Mutex();

export const init = async () => {
  if (mod.initFinished) return transform;

  await mutex.runExclusive(async () => {
    mod.initFinished || await esbuild.initialize({
      wasmURL: "https://spike.land/esbuild.wasm",
    });
    mod.initFinished = true;
    return true;
  });

  return transform;
};

const regex1 = / from \"\.\./ig;

const regex2 = / from \"\./ig;

async function transform(code: string, retry = 4): Promise<string> {
  //const startTime = performance.now();

  try {
    //

    let result = await esbuild.transform(
      `/** @jsx jsX */
    import {jsx as jsX} from "@emotion/react";
    ` +
        code,
      {
        loader: "tsx",
        target: "esnext",
      },
    );

    const transpiled = result.code.replaceAll(
      regex1,
      ' from "https://spike.land/live',
    )
      .replaceAll(regex2, ' from "https://spike.land/live');
    console.log({ transpiled });
    return transpiled;
  } catch (e) {
    if (retry > 0) {
      await wait(100);
      return transform(code, retry - 1);
    }
    throw e;
  }

  // const endTime = performance.now();

  // console.log(`esbuildEsmTransform: took ${endTime - startTime} milliseconds`);
}

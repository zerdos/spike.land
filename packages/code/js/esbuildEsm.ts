// import "core-js/proposals/string-replace-all-stage-4";

import { Mutex } from "async-mutex";
import * as esbuild from "esbuild-wasm";
import wasmURL from "esbuild-wasm/esbuild.wasm?url";

const mod = { initFinished: false };

const mutex = new Mutex();

export const init = async () => {
  if (mod.initFinished) return transform;

  await mutex.runExclusive(async () => {
    mod.initFinished || await esbuild.initialize(
      {
        wasmURL: wasmURL as unknown as string,
      },
    );
    mod.initFinished = true;
    return true;
  });

  return transform;
};

const regex1 = / from \"\.\./ig;

const regex2 = / from \"\./ig;

export async function transform(code: string){
const result = await esbuild.transform( code,
      {
        loader: "tsx",
        format: "esm",
        treeShaking: true,
        tsconfigRaw: {
          "compilerOptions": {
            "jsx": "react-jsx",
            "jsxImportSource": "@emotion/react"
          }
        },
        target: "es2021",
      },
    );

    const transpiled = result.code.replaceAll(
      regex1,
      ' from "/live',
    )
      .replaceAll(regex2, ' from "/live');

    return transpiled;
} 
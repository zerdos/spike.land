// Import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { TransformOptions } from "esbuild-wasm";
import debounce from "lodash.debounce";
import { transform } from "./esbuildEsm";
import { render } from "./renderToString";
import { md5, mST, patchSync } from "./session";
import { toUmd } from "./toUmd";

const debouncedSync = debounce(patchSync, 200, {
  leading: true,
  trailing: true,
  maxWait: 800,
});

let counterMax = mST().i;

Object.assign(globalThis, {
  toUmd: () => {
    toUmd(mST().code, "app");
  },
});

export const umdTransform = async (code: string) => {
  const transpiled = await transform(code, {
    loader: "tsx",
    format: "iife",
    treeShaking: false,
    platform: "browser",
    minify: false,
    keepNames: true,
    globalName: `apps["${md5(code)}"]`,
    tsconfigRaw: {
      compilerOptions: {
        jsx: "react-jsx",
        module: "ESNext",
        jsxFragmentFactory: "Fragment",
        jsxImportSource: "@emotion/react",
      },
    },
    target: "es2021",
  } as unknown as TransformOptions);

  globalThis.IIFE = globalThis.IIFE = {};

  globalThis.IIFE[md5(transpiled.code)] = md5(code);
  apps[md5(transpiled.code)] = apps[md5(code)];

  return transpiled.code;
};

globalThis.umdTransform = globalThis.umdTransform = umdTransform;

export async function runner({ code, counter, codeSpace }: {
  code: string;
  codeSpace: string;
  counter: number;
}) {
  if (counter <= counterMax) return;

  counterMax = counter;

  // Console.log({ i, counter });

  // mod.i = counter;

  // if (code === mST().code) return;
  // if (mod.i > counter) return;

  // session.changes.push(changes);
  // esbuildEsmTransform = esbuildEsmTransform ||
  //   (await import("./esbuildEsm.ts")).transform;

  try {
    const transpiledCode = await umdTransform(code);

    const { html, css } = await render(transpiledCode, codeSpace);

    // console.log({ html, css });
    if (!html || !css) {
      return;
    }

    debouncedSync({
      ...mST(),
      code,
      i: counter,
      transpiled: transpiledCode,
      html,
      css,
    });
  } catch (error) {
    console.error({ error });
  } finally {
  }
}

// Import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { TransformOptions } from "esbuild-wasm";
import { mST, patchSync } from "./session";

import debounce from "lodash.debounce";
import { transform } from "./esbuildEsm";
import { render } from "./renderToString";

const debouncedSync = debounce(patchSync, 200, {
  leading: true,
  trailing: true,
  maxWait: 800,
});

let counterMax = mST().i;

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
    const transpiled = await transform(code, {
      loader: "tsx",
      format: "esm",
      treeShaking: true,
      minify: true,
      keepNames: true,
      tsconfigRaw: {
        compilerOptions: {
          jsx: "react-jsx",
          module: "ESNext",
          jsxFragmentFactory: "Fragment",
          jsxImportSource: "@emotion/react",
        },
      },
      target: "ES2017",
    } as unknown as TransformOptions);

    const { html, css } = await render(transpiled.code, codeSpace);

    // console.log({ html, css });
    if (!html) {
      return;
    }

    debouncedSync({
      ...mST(),
      code,
      i: counter,
      transpiled: transpiled.code,
      html,
      css,
    });
  } catch (error) {
    console.error({ error });
  } finally {
  }
}

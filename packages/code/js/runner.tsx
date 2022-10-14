// Import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { TransformOptions } from "esbuild-wasm";
import { saveCode } from "./ws";
import { hashCode, mST, patchSync } from "./session";
// Import { cF } from "./renderToString";
import { toUmd } from "./toUmd";
import { transform } from "./esbuildEsm";
import { render, renderFromString } from "./renderToString";
import { md5 } from "md5";
import { wait } from "wait";
// Import { appFactory } from "starter";
// import { wait } from "wait";

// import type { Dispatch, SetStateAction, ReactNode } from "react";
// import { md5 } from "./md5";
// var Stream = require('stream/')

// import "es-module-shims";

// if ("serviceWorker" in navigator) {
//   const wb = new Workbox("/sw.js");

//   wb.register();
// }

// const hash = new Sha256();

// const importMap = { imports: {
//   "framer-motion": "/framer-motion.mjs",
//   "react-dom/server": "/react.mjs",
//   "@emotion/react": "/emotion.mjs",
//   "react": "/react.mjs",} };

// importShim.addImportMap(importMap)

// const debounced = debounce(runner, 300, {
//   maxWait: 600,
//   trailing: true,
//   leading: true,
// });

// export const runnerDebounced: typeof runner = (props) => debounced(props);

export async function runner({ code, counter, codeSpace }: {
  code: string;
  codeSpace: string;
  counter: number;
}) {
  const mst = mST();
  console.log(`${mst.i} => ${counter}`);

  if (counter <= mst.i) return;

  // Console.log({ i, counter });

  // mod.i = counter;

  // if (code === mST().code) return;
  // if (mod.i > counter) return;

  // session.changes.push(changes);
  // esbuildEsmTransform = esbuildEsmTransform ||
  //   (await import("./esbuildEsm.ts")).transform;

 const umdExp =  async ()=>{
  console.log("to UMD")!;
  const UMD = await toUmd(code, `${codeSpace}.tsx`);
  console.log({UMD})
  download("coder.js", await UMD?.toJs(`${codeSpace}.tsx`)!);

  function download(filename: string, text: string) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
  }
  Object.assign(globalThis, {umdExp});

  try {
    const transpiled = await transform(code, {
      loader: "tsx",
      format: "esm",
      treeShaking: true,
      minify: true,
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
    const codeHash = md5(code).slice(0, 8);
    const transpiledCode = `${transpiled.code}//${codeHash}`;

    const {html, css} = await render(transpiledCode, codeSpace);

    if (!html) return;


    patchSync({ ...mST(), code, i: counter, transpiled: transpiledCode,  html, css: css|| "" });

    
    let i=60;
while (!mST().css) {
  console.log("Oh, nooo! Can't extract css, wait:", i);

    const {html, css} = renderFromString(codeSpace, hashCode());

    if (html && css)  patchSync({ ...mST(), html, css });
    else    await wait(i++);

}
saveCode();
  } catch (error) {
    console.error({ error });
  }
}

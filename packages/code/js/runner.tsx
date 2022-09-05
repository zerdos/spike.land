// import type { Dispatch, ReactNode, SetStateAction } from "react";
import { saveCode } from "./ws";
import { mST } from "./session";
import { renderFromString } from "./renderToString";
// import { toUmd } from "./toUmd";
import type { TransformOptions } from "esbuild-wasm";
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

const mod = {
  i: 0,
  esbuildInit: async () => await (await (await import("./esbuildEsm"))).init(),
};

export async function runner({ code, counter, codeSpace }: {
  code: string;
  codeSpace: string;
  counter: number;
}) {
  // console.log({ i, counter });

  const esbuild = await (mod.esbuildInit());

  mod.i = counter;

  if (code === mST().code) return;
  if (mod.i > counter) return;

  // session.changes.push(changes);
  // esbuildEsmTransform = esbuildEsmTransform ||
  //   (await import("./esbuildEsm.ts")).transform;

  try {
    const transpiled = await esbuild.transform(code, {
      loader: "tsx",
      format: "esm",
      treeShaking: true,
      tsconfigRaw: {
        "compilerOptions": {
          "jsx": "react-jsx",
          "jsxImportSource": "@emotion/react",
        },
      },
      target: "es2021",
    } as unknown as TransformOptions);

    //   try{
    //     (async ()=>{
    //       const name = `${location.origin}/live/${codeSpace}-${md5(code)}.tsx`;
    //   const UMD = await toUmd(code,name);
    //   console.log({ UMD });
    // //  console.log(UMD?.toJs(name));
    //     // const hashName = UMD?.hashMap[name];
    //     // UMD?.data[hashName!].code +
    //   // console.log(UMD.toJs(`${location.origin}/live/${codeSpace}-${md5(code)}.tsx`))
    //     })();
    //   }
    //   catch(e){
    //     console.error({e});
    //   }
    if (transpiled.code === mST().transpiled) return;

    let restartError = false;
    /// yellow
    if (transpiled.code.length > 0) {
      try {
        // console.log(transpiled);

        const res = await renderFromString(code, transpiled.code, codeSpace);

        if (res === null) {
          console.error("COULD NOT RENDER:");
          console.error({ code, transpiled: transpiled.code });
          return;
        }
        const { html, css } = res;
        // console.log({html, css});

        await saveCode({
          code,
          transpiled: transpiled.code,
          i: counter,
          html,
          css,
        });

        return;
      } catch (error) {
        console.error("EXCEPTION");
        console.error(error);
        restartError = true;
        console.error({ restartError });
        return;
      }
    }
  } catch (error) {
    console.error({ error });
  }
}

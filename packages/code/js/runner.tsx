// Import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { TransformOptions } from "esbuild-wasm";
import { saveCode } from "./ws";
import { mST, patchSync } from "./session";
// Import { cF } from "./renderToString";
// import { toUmd } from "./toUmd";
import { transform } from "./esbuildEsm";
import { render } from "./renderToString";
import { md5 } from "md5";
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

    const html = await render(transpiledCode, codeSpace);

    if (!html) return;

    patchSync({ ...mST(), code, i: counter, transpiled: transpiledCode, html });

    //   Try{
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
    // if (transpiled.code === mST().transpiled) return;

    // let restartError = false;
    /// yellow
    if (transpiled.code.length > 0) {
      try {
        // Console.log(transpiled);

        // await appFactory();
        // await wait(50);
        // const res = renderFromString( App);

        // if (res === null) {
        //   console.error("COULD NOT RENDER:");
        //   console.error({ code, transpiled: transpiled.code });
        //   return;
        // }
        // const { html, css } = renderFromString(codeSpace);

        // patchSync({...mST(), html, css});
        // console.log({html, css});
        // if (counter !== mod.i) return;
        saveCode();

        // Return;
      } catch (error) {
        console.error("EXCEPTION");
        console.error(error);
        // RestartError = true;
        // console.error({ restartError });
        // return;
      }
    }
  } catch (error) {
    console.error({ error });
  }
}

// Import type { Dispatch, ReactNode, SetStateAction } from "react";
// import { Mutex } from "async-mutex";
import type { TransformOptions } from "esbuild-wasm";
import { wait } from "wait";
import { syncWS } from "ws";
import { buildT } from "./esbuildEsm";

// import { RpcProvider } from "worker-rpc";

// import type { ICodeSession } from "./session";
import { unlink, writeFile } from "./fs";
import { mST } from "./session";
// import { toUmd } from "./toUmd";

// globalThis.ol = globalThis.ol || console.log; // || (message, ...optionalParams)=>console.log(message, ...optionalParams)

// const OriginalLog = globalThis.ol; // (message?: any, ...optionalParams: any[])=> void = globalThis.ol

// const data: { [key: string]: string } = {};
// const logs = [];
// globalThis.logs = logs;

// console.log = (mess, ...args) => {
//   const sess = mST();
//   data[md5(sess.code)] = sess.code;
//   data[md5(sess.html)] = sess.html;
//   data[md5(sess.css)] = sess.css;

//   logs.push({
//     args: [mess, ...args],
//     sess: {
//       code: md5(sess.code),
//     },
//   });
//   OriginalLog(mess, ...args);
// };

let transform;
// const codeSpace = location.pathname.slice(1).split("/")[1];

export const esmTransform = async (code: string) => {
  transform = transform || (await import(`./esbuildEsm`)).transform;

  const transpiled = await transform(code, {
    loader: "tsx",
    format: "esm",
    treeShaking: true,
    platform: "browser",
    minify: false,
    //   globalName: md5(code),
    keepNames: true,
    tsconfigRaw: {
      compilerOptions: {
        jsx: "react-jsx",
        useDefineForClassFields: false,
        jsxFragmentFactory: "Fragment",
        jsxImportSource: "@emotion/react",
      },
    },
    target: "es2022",
  } as unknown as TransformOptions);

  // apps[md5(transpiled.code)] = require(md5(code));

  return transpiled.code;
};
// Object.assign(globalThis, { transform, build, toUmd });

let counterMax = mST().i;
// const IIFE = {};

// export const umdTransform = async (code: string) => {
//   const transpiled = await transform(code, {
//     loader: "tsx",
//     format: "esm",
//     treeShaking: true,
//     platform: "browser",
//     minify: false,
//     globalName: md5(code),
//     keepNames: true,
//     tsconfigRaw: {
//       compilerOptions: {
//         jsx: "react-jsx",
//         module: "ESNext",
//         jsxFragmentFactory: "Fragment",
//         useDefineForClassFields: false,
//         jsxImportSource: "@emotion/react",
//       },
//     },
//     target: "es2021",
//   } as unknown as TransformOptions);

//   Object.assign(IIFE, { [md5(transpiled.code)]: md5(code) });
//   // apps[md5(transpiled.code)] = require(md5(code));

//   return transpiled.code;
// };

const BC = new BroadcastChannel(location.href + "/");
// Object.assign(globalThis, {
//   _toUmd: () => toUmd(mST().code, codeSpace),
//   toUmd,

//   IIFE,
//   umdTransform,
// });
// let rpcProvider;
// const mutex = new Mutex();

BC.onmessage = async ({ data }) => {
  if (!data.html) return;
  if (data.counter === mST().i) return;

  if (data.counter !== counterMax) return;

  // counterMax--;

  const sess = {
    ...mST(),
    // code,
    ...data,
    // codeSpace,
    // i: counter,
    // transpiled: transpiledCode!,
    // html,
    // css,
  };

  await wait(100);
  if (data.counter !== counterMax) return;

  syncWS(sess);
};

let controller = new AbortController();
export async function runner({ code, counter, codeSpace }: {
  code: string;
  codeSpace: string;
  counter: number;
}) {
  if (counter <= counterMax) return;
  // if (!rpcProvider) {
  // rpcProvider = new RpcProvider(
  // (message, transfer) => iRef.current.contentWindow.postMessage(message, transfer),
  // );

  // iRef.current.contentWindow.onmessage = e => rpcProvider.dispatch(e.data);
  // }
  counterMax = counter;
  controller.abort();

  controller = new AbortController();

  // await mutex.runExclusive(async () => {
  // Console.log({ i, counter });

  // mod.i = counter;

  // if (code === mST().code) return;
  // if (mod.i > counter) return;

  // session.changes.push(changes);false
  // esbuildEsmTransform = esbuildEsmTransform ||
  //   (await import("./esbuildEsm.ts")).transform;

  try {
    // const ab = new AbortController();
    // const pp = await buildT(codeSpace, counter, ab.signal);
    // if (!pp) return;
    await wait(100);
    const transpiled = await esmTransform(code);

    if (controller.signal.aborted) return;
    BC.postMessage({ counter, i: counter, transpiled, codeSpace, code });

    try {
      console.log({ transpiled });

      await unlink(`/live/${codeSpace}/index.tsx`);

      await writeFile(`/live/${codeSpace}/index.tsx`, transpiled);

      await writeFile(`/live/${codeSpace}/render.js`, transpiled);

      await buildT(codeSpace, controller.signal, true);

      // fs.promises.writeFile(`/live/${codeSpace}/index.js`, bundle);
    } catch {
      console.error("bundle failed");
    }

    // console.log("still alive2");
    // // patchSync(sess);
    // console.log("still alive3");

    // const built = await build(code, counter, controller.signal);
    // if (!built) return;
    // const { html, css } = await render(transpiledCode, codeSpace);
    //
    // console.log({ html, css });

    // if (!html) {
    // return;
    // }
    // console.log("still alive1");
    // // sess = {
    // //   ...mST(),
    // //   code,
    // //   // codeSpace,
    // //   i: counter,.
    // //   transpiled: transpiledCode,
    // //   html,
    // //   css,
    // // };
    // console.log("still alive2");
    // // patchSync(sess);
    // console.log("still alive3");
    // // syncWS(sess);
    // console.log("still alive4");
  } catch (error) {
    console.error({ error });
  } finally {
  }
  // });
}

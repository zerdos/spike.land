// Import type { Dispatch, ReactNode, SetStateAction } from "react";
// import { Mutex } from "async-mutex";
// import { buildT } from "./esbuildEsm";
// import { transpile } from "./transpile";
import { sw } from "./hydrate";
import { syncWS } from "./ws";
// import { prerender } from "./render";
// import { RpcProvider } from "worker-rpc";

// import type { ICodeSession } from "./session";
// import { buildT } from "./esbuildEsm";
import { unlink, writeFile } from "./fs";
import { wait } from "./wait";
import { // HTML, importMapReplace, md5,
  sess as oldSess, // resetCSS
} from "./ws";
// import { createHTML } from "./starter";
//
Object.assign(globalThis, {
  build: (codeSpace: string, opts: any) => () =>
    import("./esbuildEsm").then(eb =>
      eb.buildT(codeSpace, location.origin, (new AbortController()).signal, { bundle: true, ...opts }())
    ),
});

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

// const BCbundle = new BroadcastChannel(location.href + "/bundle");
// Object.assign(globalThis, {
//   _toUmd: () => toUmd(mST().code, codeSpace),
//   toUmd,

//   IIFE,
//   umdTransform,
// });
// let rpcProvider;
// const mutex = new Mutex();

// BC.onmessage = async ({ data }) => {
//   if (!data.html) return;
//   if (data.counter === mST().i) return;

//   if (data.counter !== counterMax) return;

//   // counterMax--;

//   const sess = {
//     ...mST(),
//     // code,
//     ...data,
//     // codeSpace,
//     // i: counter,
//     // transpiled: transpiledCode!,
//     // html,
//     // css,
//   };

//   await wait(100);
//   if (data.counter !== counterMax) return;

//   syncWS(sess);
// };
const codeSpace = location.pathname.slice(1).split("/")[1];

let counterMax = 0;
const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);

let processed = 0;
let s: AbortSignal;
BC.onmessage = async ({ data }) => {
  // if (data.type === "transpile" ) {
  //   const code = data.code;

  //   esmTransform = await esmTransform(data.code, origin);
  //   BC.postMessage({})
  // }

  const signal = s;

  if (counterMax !== data.i) return;
  if (processed === data.i) return;
  processed = data.i;
  const { html, css, i } = data;
  console.log(i, { css, html });

  if (html) {
    // window.removeEventListener("message", responseListener);
    if (signal.aborted) return;
    const newSession = {
      ...oldSess,
      html,
      css,
      code: sess.code,
      i,
    };
    const jsonStr = JSON.stringify(newSession);
    await wait(200);

    const file = `/live/${codeSpace}/session.json`;
    if (signal.aborted) return;

    await Promise.all([
      syncWS(newSession, signal),
      writeFile(file, jsonStr).catch(() => unlink(file).then(() => writeFile(file, jsonStr))),
    ]);

    // const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);
    // BC.postMessage({ html, css, code, transpiled, i: counter });
    // await buildT(codeSpace, location.origin, signal, { bundle: true });
    // BCbundle.postMessage({ counterMax });
  }
};
// let iframe: HTMLIFrameElement;
const sess = {
  i: counterMax,
  codeSpace,
  transpiled: "",
  code: "",
};
export async function runner({ code, counter, codeSpace, signal }: {
  code: string;
  codeSpace: string;
  counter: number;
  signal: AbortSignal;
}) {
  s = signal;
  console.log({ counter });
  if (counter <= counterMax) return;

  counterMax = counter;
  sess.i = counterMax;
  sess.code = code;

  try {
    if (signal.aborted) return;

    const data = await sw.messageSW({
      i: counter,
      code,
      type: "prerender",
      codeSpace,
    });

    BC.postMessage({ ...data });
  } catch (error) {
    console.error({ error });
  } finally {
  }
}

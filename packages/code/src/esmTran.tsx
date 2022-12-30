import { TransformOptions } from "esbuild-wasm";
import { transform } from "./esbuildEsm";

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
// const codeSpace = location.pathname.slice(1).split("/")[1];

export async function esmTransform(code: string, origin: string) {
  // transform = transform || (await import(`./esbuildEsm`)).transform;
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
  } as unknown as TransformOptions, origin);

  // apps[md5(transpiled.code)] = require(md5(code));
  return transpiled.code;
}

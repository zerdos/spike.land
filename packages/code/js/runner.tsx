import type { Dispatch, ReactNode, SetStateAction } from "react";
import { saveCode } from "./ws";
import { appFactory } from "./starter";
import { mST } from "./session";
import { renderFromString } from "./renderToString";
import { toUmd } from "./toUmd";
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

export interface IRunnerSession {
  // changes: unknown[];
  errorText: string;
  child: Dispatch<SetStateAction<ReactNode[]>>;
  url: string;
}

// const debounced = debounce(runner, 300, {
//   maxWait: 600,
//   trailing: true,
//   leading: true,
// });

// export const runnerDebounced: typeof runner = (props) => debounced(props);

const mod = {
  i: 0,
  esbuildInit: async()=> (await (await import("./esbuildEsm"))).init()
  
  };

export async function runner({ code, counter, codeSpace }: {
  code: string;
  codeSpace: string;
  counter: number;
}) {
  // console.log({ i, counter });

  const esbuild =await (mod.esbuildInit());

  mod.i = counter;

  if (code === mST().code) return;
  if (mod.i > counter) return;

  // session.changes.push(changes);

  // esbuildEsmTransform = esbuildEsmTransform ||
  //   (await import("./esbuildEsm.ts")).transform;

  try {
    const transpiled = await esbuild.transform(code, 
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
      });


      const UMD = await toUmd(code);
      console.log({UMD});
    
    if (transpiled.code === mST().transpiled) return;

    let restartError = false;
    /// yellow
    if (transpiled.code.length > 0) {
      try {
        // console.log(transpiled);

        const App = await appFactory(transpiled.code);
        const { html, css } = renderFromString(App, codeSpace);
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

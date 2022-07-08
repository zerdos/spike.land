/** @jsxImportSource @emotion/react */

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { saveCode } from "./ws";
import { appFactory } from "./starter";
import { mST } from "./session";
import { renderFromString } from "./renderToString";
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

type ITransform = (code: string, retry?: number) => Promise<string>;

let transform: ITransform | null = null;
let i = 0;

export async function runner({ code, counter }: {
  code: string;
  counter: number;
}) {
  // console.log({ i, counter });
  if (i >= counter) {
    setTimeout(() => i = mST().i, 100);
    return;
  }
  i = counter;
  const { init } = await import("./esbuildEsm");
  transform = transform || await init();
  if (code === mST().code) return;
  if (i > counter) return;

  // session.changes.push(changes);

  // esbuildEsmTransform = esbuildEsmTransform ||
  //   (await import("./esbuildEsm.ts")).transform;

  try {
    const transpiled = await transform(code);
    if (transpiled === mST().transpiled) return;

    let restartError = false;
    /// yellow
    if (transpiled.length > 0) {
      try {
        // console.log(transpiled);
        const App = await appFactory(transpiled);
        const { html, css } = renderFromString(App);
        // console.log({html, css});

        if (i > counter) return;

        await saveCode({
          code,
          transpiled,
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

/** @jsxImportSource @emotion/react */

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { saveCode } from "./ws";
import { mST } from "./session";
import throttle from "lodash/throttle";

export interface IRunnerSession {
  // changes: unknown[];
  errorText: string;
  child: Dispatch<SetStateAction<ReactNode[]>>;
  url: string;
}

export const runnerDebounced =  runner; //(runner, 100);
const r = { counter: 0 };


let transform = null;
export async function runner(
  code: string,
  counter: number,
) {
  const { prettier } = await import("./prettierEsm");

  if (prettier(code) === mST().code) return;

  // session.changes.push(changes);

  // esbuildEsmTransform = esbuildEsmTransform ||
  //   (await import("./esbuildEsm.ts")).transform;
  const { init } = await import("./esbuildEsm");

  transform = transform || await init();;

  try {
    const transpiled = await transform(code);
    if (transpiled === mST().transpiled) return;

    let restartError = false;
    /// yellow
    if (transpiled.length > 0) {
     

      try {
        const { renderFromString } = await import("./renderToString");

        const { html, css } = await renderFromString(transpiled);

        await saveCode({
          code,
          transpiled,
          i: counter,
          html,
          css,
        });   

        return;
      } catch (error) {

        globalThis.update(true);
        console.error("EXCEPTION");
        console.error(error);
        restartError = true;
        console.error({ restartError });
      }
    }
  } catch (error) {
    console.error({ error });
  }
}

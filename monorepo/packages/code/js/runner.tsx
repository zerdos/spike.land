/** @jsxImportSource @emotion/react */

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { saveCode } from "./ws";
import { mST } from "./session";
import debounce from "lodash/debounce";

export interface IRunnerSession {
  // changes: unknown[];
  errorText: string;
  child: Dispatch<SetStateAction<ReactNode[]>>;
  url: string;
}

export const runnerDebounced = debounce(runner, 100);

type ITransform = (code: string, retry?: number) => Promise<string>;

let transform: ITransform | null = null;
export async function runner(
  code: string,
  counter: number,
) {
  if (await prettier(code) === await prettier(mST().code)) return;

  // session.changes.push(changes);

  // esbuildEsmTransform = esbuildEsmTransform ||
  //   (await import("./esbuildEsm.ts")).transform;
  const { init } = await import("./esbuildEsm");

  transform = transform || await init();

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
        await globalThis.update();
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

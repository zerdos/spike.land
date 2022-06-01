/** @jsxImportSource @emotion/react */

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { renderFromString } from "./renderToString";
import { saveCode } from "./ws";
import { mST } from "./session";
import throttle from "lodash/throttle";

export interface IRunnerSession {
  // changes: unknown[];
  errorText: string;
  child: Dispatch<SetStateAction<ReactNode[]>>;
  url: string;
}

export const runnerDebounced = throttle(runner, 100);
const r = { counter: 0 };

export async function runner(
  code: string,
  counter: number,
) {
  const { prettier } = await import("./prettierEsm");

  if (prettier(code) === mST().code) return;

  const latest = ++r.counter;
  // session.changes.push(changes);

  // esbuildEsmTransform = esbuildEsmTransform ||
  //   (await import("./esbuildEsm.ts")).transform;
  const { init } = await import("./esbuildEsm");

  const transform = await init();

  try {
    const transpiled = await transform(code);
    if (transpiled === mST().transpiled) return;

    let restartError = false;
    /// yellow
    if (transpiled.length > 0) {
      if (latest < r.counter) return;

      try {
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

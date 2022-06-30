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

const debounced = debounce(runner, 300, {
  maxWait: 600,
  trailing: true,
  leading: true,
});

export const runnerDebounced: typeof runner = (props) => debounced(props);

type ITransform = (code: string, retry?: number) => Promise<string>;

let transform: ITransform | null = null;
let i = 0;

export async function runner({ code, counter }: {
  code: string;
  counter: number;
}) {
  console.log({ i, counter });
  if (i >= counter) {
    setTimeout(() => i = mST().i, 100);
    return;
  }
  i = counter;
  const { init } = await import("./esbuildEsm");
  transform = transform || await init();
  const { renderFromString } = await import("./renderToString");
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
        const { html, css } = await renderFromString(transpiled);

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

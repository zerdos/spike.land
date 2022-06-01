/** @jsxImportSource @emotion/react */

import { useEffect, useRef } from "react";
import { codeSpace } from "./ws";

import { runnerDebounced } from "./runner";
import { mST } from "./session";

import { css } from "@emotion/react";

let debounceTime = 100;

export const MonacoEditor = () => {
  const ref = useRef<HTMLDivElement>(null) as null | {
    current: HTMLDivElement;
  };

  useEffect(() => {
    if (ref === null) return;
    const load = async () => {
      const { startMonaco } = await import("./editor");

      const { editor, monaco } = await startMonaco(
        /**
         * @param {any} code
         */
        {
          container: ref.current,
          name: codeSpace,
          code: mST().code,
        },
      );

      // Object.assign(session, { monaco, editor, model });

      // let inc = 0;

      editor.onDidChangeModelContent(() => {
        const code = editor.getModel()!.getValue();
        const counter = mST().i + 1;
        runnerDebounced(code, counter);
      });

      Object.assign(globalThis, { monaco, editor });
    };
    load();
  }, [ref]);

  return (
    <div
      css={css`
  max-width: 800px;
  height: 100vh;
  /* background-color: #ffffff; */
  max-height: 100vh; 
`}
      ref={ref}
    />
  );
};

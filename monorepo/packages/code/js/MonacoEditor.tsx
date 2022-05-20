/** @jsxImportSource @emotion/react */

import { useEffect, useRef } from "react";
import { codeSpace, mST } from "./ws";

import { css } from "@emotion/react";

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

      const model = editor.getModel();

      // Object.assign(session, { monaco, editor, model });

      // let inc = 0;

      const { runnerDebounced } = await import("./runner");
      editor.onDidChangeModelContent(() =>
        runnerDebounced(
          model!.getValue(),
          // ev.changes,
          mST().i + 1,
        )
      );

      Object.assign(globalThis, { monaco, editor, model });
    };
    load();
  }, [ref]);

  return (
    <div
      css={css`
  max-width: 640px;
  height: 100vh;
  /* background-color: #ffffff; */
  max-height: 100vh; 
`}
      ref={ref}
    />
  );
};

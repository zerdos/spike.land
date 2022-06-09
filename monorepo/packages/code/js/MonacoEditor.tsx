/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useState } from "react";
import { codeSpace } from "./ws";

import { runnerDebounced } from "./runner";
import { mST } from "./session";

import { css } from "@emotion/react";


export const MonacoEditor = () => {
  const ref = useRef<HTMLDivElement>(null) as null | {
    current: HTMLDivElement;
  };

  const [lines, setLines] = useState(mST().code.split("\n").length);

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
        const code = editor?.getModel()?.getValue()!;
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
  max-width: 640px;
  height: ${60 + lines / 40 * 100}% ;
`}
      ref={ref}
    />
  );
};

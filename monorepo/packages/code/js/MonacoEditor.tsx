/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useState } from "react";
import { codeSpace } from "./ws";

import { runnerDebounced } from "./runner";
import { mST } from "./session";

import { css } from "@emotion/react";

type IPrettier = (code: string) => string;
let formatter: null | IPrettier = null;

export const MonacoEditor = () => {
  const ref = useRef<HTMLDivElement>(null) as null | {
    current: HTMLDivElement;
  };

  const mst = mST();
  const [{ code, i, editor, model }, changeContent] = useState({
    code: mst.code,
    i: mst.i,
    editor: null as { onDidChangeModelContent: () => void } | null,
    model: null as null | {
      getValue: () => string;
      setValue: (code: string) => void;
    },
  });

  const lines = code?.split("\n").length || 0;

  useEffect(() => {
    if (ref === null) return;
    const load = async () => {
      const { startMonaco } = await import("./editor");

      const { editor } = await startMonaco(
        /**
         * @param {any} code
         */
        {
          container: ref.current,
          name: codeSpace,
          code: mST().code,
        },
      );

      changeContent((x) => ({
        ...x,
        editor: editor as unknown as { onDidChangeModelContent: () => void },
        model: editor.getModel(),
      }));

      // Object.assign(session, { monaco, editor, model });

      // let inc = 0;
    };
    load();
  }, [ref]);

  globalThis.setValue =  (newCode, counter) => {
    if (counter <= i) {
     return;
    }

    changeContent((x) => ({ ...x, i: counter, code: newCode }));
    model?.setValue(newCode);
  };

  useEffect(() =>
    editor?.onDidChangeModelContent(async () => {
      
      const newCode = model.getValue();
      if (newCode === code) return;

      const counter = i + 1;

      
      try {
        changeContent((x) => ({ ...x, i: counter, code: newCode }))
        await runnerDebounced({code: newCode, counter});
      } catch (err) {
        console.error({ err });
        console.error("restore editor");

        // model?.setValue(code);
      }
    }).dispose, [i, changeContent, model, editor]);

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

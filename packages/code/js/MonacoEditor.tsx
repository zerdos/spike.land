/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useState } from "react";
import { runnerDebounced } from "./runner";
import { mST } from "./session";

import { css } from "@emotion/react";
import type { editor } from "monaco-editor";

export type IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

export const MonacoEditor = () => {
  const ref = useRef<HTMLDivElement>(null) as null | {
    current: HTMLDivElement;
  };

  const mst = mST();
  const [{ code, i, editor }, changeContent] = useState({
    code: mst.code,
    i: mst.i,
    editor: null as null | IStandaloneCodeEditor,
  });

  const lines = code?.split("\n").length || 0;

  useEffect(() => {
    if (!ref?.current) return;
    const load = async () => {
      const { startMonaco } = await import("./editor");

      const { editor } = await startMonaco(
        /**
         * @param {any} code
         */
        {
          container: ref.current,
          name: globalThis.codeSpace,
          code: mST().code,
        },
      );

      changeContent((x) => ({
        ...x,
        editor,
        model: editor.getModel(),
      }));

      // Object.assign(session, { monaco, editor, model });

      // let inc = 0;
    };
    load();
  }, [ref]);

  globalThis.setValue = (newCode, counter, force) => {
    if (!force && counter <= i) {
      return;
    }

    changeContent((x) => ({ ...x, i: counter, code: newCode }));
    setTimeout(() => {
      editor?.getModel()?.setValue(newCode);
    }, 100);
  };

  useEffect(() =>
    editor?.onDidChangeModelContent(async () => {
      const newCode = editor?.getModel()?.getValue()!;
      if (newCode === code) return;

      const counter = i + 1;

      try {
        changeContent((x) => ({ ...x, i: counter, code: newCode }));
        await runnerDebounced({ code: newCode, counter });
      } catch (err) {
        console.error({ err });
        console.error("restore editor");

        // model?.setValue(code);
      }
    }).dispose, [i, changeContent, editor]);

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

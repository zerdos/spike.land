/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useState } from "react";
import { codeSpace } from "./ws";

import { runnerDebounced } from "./runner";
import { mST } from "./session";

import { css } from "@emotion/react";

type IPrettier = (code: string)=> string
let formatter: null | IPrettier = null;

export const MonacoEditor = () => {
  const ref = useRef<HTMLDivElement>(null) as null | {
    current: HTMLDivElement;
  };

  const {i, code} = mST();
  const [sess, changeContent] = useState({
    code: code,
    i: i,
    lines: code.split("\n").length,
    editor: null as {onDidChangeModelContent: ()=>void} | null,
    model: null as null | {getValue: ()=>string; setValue:(code: string)=> void}
  });



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

      changeContent((x) => ({ ...x, editor: editor as unknown as  {onDidChangeModelContent: ()=>void} , model: editor.getModel() }));

      // Object.assign(session, { monaco, editor, model });

      // let inc = 0;
    };
    load();
  }, [ref]);

  globalThis.setValue = ( code, i) => {

    model?.setValue(code);
    changeContent((x) => ({ ...x, i, code }));
  };

  useEffect(() =>
    editor?.onDidChangeModelContent(async () => {
      formatter = formatter || (await import("./prettierEsm")).prettier;
      const code = model.getValue();
      if (formatter(code) === mST().code) return;
      changeContent((x) => ({ ...x, code, i: x.i + 1 }));
      runnerDebounced(code, i + 1);
    }).dispose, [code, i, changeContent, model]);

  return (
    <div
      css={css`
  max-width: 640px;
  height: ${60 + sess.lines / 40 * 100}% ;
`}
      ref={ref}
    />
  );
};

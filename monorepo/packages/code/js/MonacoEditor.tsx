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

  const mst = mST();
  const [{code, i, lines, editor, model}, changeContent] = useState({
    code: mst.code,
    i: mst.i,
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

  globalThis.setValue = ( newCode, counter) => {

    if (counter !== i && newCode === code) changeContent(x=>({...x, i:counter})) 
    if(newCode === code) return;

    model?.setValue(code);
    changeContent((x) => ({ ...x, i: counter, code: newCode }));

  };

  useEffect(() =>
    editor?.onDidChangeModelContent(async () => {
      formatter = formatter || (await import("./prettierEsm")).prettier;
      const newCode = formatter(model.getValue());
      if (newCode === code) return;
      changeContent((x) => ({ ...x, code: newCode, i: x.i + 1 }));
      runnerDebounced(newCode, i + 1);
    }).dispose, [code, i, changeContent, model, editor]);

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

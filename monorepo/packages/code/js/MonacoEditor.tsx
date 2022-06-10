/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useState } from "react";
import { codeSpace } from "./ws";

import { runnerDebounced } from "./runner";
import { mST } from "./session";

import { css } from "@emotion/react";

let formatter = null;

export const MonacoEditor = () => {
  const ref = useRef<HTMLDivElement>(null) as null | {
    current: HTMLDivElement;
  };

  const [lines, setLines] = useState(mST().code.split("\n").length);

  const [{ code, i, model, editor }, changeContent] = useState({
    ...mST(),
    model: null,
    editor: null,
  });

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

      changeContent((x) => ({ ...x, editor, model: editor.getModel() }));

      // Object.assign(session, { monaco, editor, model });

      // let inc = 0;
    };
    load();
  }, [ref]);

  globalThis.setValue = async (revert: false) => {
    const mst = mST();
    if (i >= mst.i && !revert) return;

    model?.setValue(mst.code);
    changeContent((x) => ({ ...x, i: mst.i, code: mst.code }));
  };

  useEffect(() =>
    editor?.onDidChangeModelContent(async () => {
      console.log("edi");
      formatter = formatter || (await import("./prettierEsm")).prettier;
      const code = model.getValue()!;
      if (formatter(code) === mST().code) return;
      changeContent((x) => ({ ...x, code, i: x.i + 1 }));
      runnerDebounced(code, i + 1);
    }).dispose, [code, i, changeContent, editor, model]);

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

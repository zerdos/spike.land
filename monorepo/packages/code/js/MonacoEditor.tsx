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

  const [{code, i}, changeContent]  = useState(mST());

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

      editor.onDidChangeModelContent(async () => {
        const {prettier} = await import("./prettierEsm");
        const code = editor?.getModel()?.getValue()!;
        if (prettier(code) === mST().code) return;
        changeContent(x=>({code, i: x.i+1 }));
        runnerDebounced(code, i+1);
      });

      Object.assign(globalThis, { monaco, editor });
    };
    load();
  }, [ref]);

  globalThis.update = ()=> {
    const mst = mST();
    if ( i<mst.i) 
    
    editor?.getModel().setValue(mst.code);
    changeContent({i: mst.i, code: mst.code});
  }

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

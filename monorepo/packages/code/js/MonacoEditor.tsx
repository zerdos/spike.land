/** @jsxImportSource @emotion/react */

import { useEffect, useRef } from "react";
import { codeSpace, mST } from "./ws";

import {runner} from "./runner";
import throttle from "lodash/throttle"

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

      const model = editor.getModel();

      // Object.assign(session, { monaco, editor, model });

      // let inc = 0;

      function runIt(){

        const code =  model!.getValue();
        const counter = mST().i + 1;
        runner(code, counter)
     
    }
    const runItThrottled = throttle(runner, debounceTime);

 
      editor.onDidChangeModelContent(runItThrottled)


      Object.assign(globalThis, { monaco, editor, model });
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

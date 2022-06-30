/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useState } from "react";
import { runner } from "./runner";
import { codeSpace } from "./ws";
import { mST, onUpdate } from "./session";
import { appFactory, renderApp } from "./starter";
import debounce from "lodash/debounce";

import { css } from "@emotion/react";
import type { editor } from "monaco-editor";

export type IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

export const MonacoEditor = () => {
  const ref = useRef<HTMLDivElement>(null) as null | {
    current: HTMLDivElement;
  };

  const mst = mST();
  const [{ code, i, editor, myId }, changeContent] = useState({
    code: mst.code,
    i: mst.i + 1,
    myId: "loading",
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
          name: codeSpace,
          code: mST().code,
        },
      );

      changeContent((x) => ({
        ...x,
        editor,
        myId: "editor",
        model: editor.getModel(),
      }));

      // Object.assign(session, { monaco, editor, model });

      // let inc = 0;
    };
    load();
  }, [ref]);

  useEffect(() => {
    const onChange = async () => {
      const newCode = editor?.getModel()?.getValue()!;
      if (newCode === code) return;
      if (newCode === mST().code) return;
      // if (i === mST().i) return;

      const counter = i + 1;

      try {
        console.log("change content");
        changeContent((x) => ({ ...x, i: x.i + 1, code: newCode }));
        onUpdate(async () => {
          const sess = mST();
          renderApp(await appFactory(sess.transpiled));

          if (sess.i <= counter) {
            return;
          }

          setTimeout(() => {
            if (mST().i !== sess.i) return;
            console.log(`session ${sess.i} mst: ${mST().i}, our i: ${counter}`);
            changeContent((x) => ({ ...x, code: sess.code, i: sess.i + 1 }));
            editor?.setValue(sess.code);
          }, 100);
        });

        runner({ code: newCode, counter });
      } catch (err) {
        console.error({ err });
        console.error("restore editor");

        // model?.setValue(code);
      }
    };

    const debounced = debounce(onChange, 300, {
      maxWait: 600,
      trailing: true,
      leading: true,
    });

    const dispose = editor?.onDidChangeModelContent(() => {
      console.log("changed");
      debounced();
    }).dispose;
    return dispose;
  }, [i, changeContent, editor]);

  return (
    <div
      data-test-id={myId}
      css={css`
  max-width: 640px;
  height: ${60 + lines / 40 * 100}% ;
`}
      ref={ref}
    />
  );
};

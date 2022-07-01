/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useState } from "react";
import { mST, onUpdate } from "./session";

import { css } from "@emotion/react";
import { prettierJs } from "./prettierEsm";

import { appFactory, renderApp } from "./starter";
import type { Ace, edit } from "ace-builds";

import { runner } from "./runner";
import debounce from "lodash/debounce";

export const AceEditor = () => {
  const ref = useRef<HTMLPreElement>(null) as null | {
    current: HTMLPreElement;
  };

  const [{ code, i, editor, myId }, changeContent] = useState({
    code: mST().code,
    i: mST().i + 1,
    myId: "loading",
    editor: null as null | Ace.Editor,
  });

  useEffect(() => {
    if (ref === null) return;
    const load = async () => {
      const editor = await startAce(mST().code);

      changeContent((x) => ({ ...x, editor, myId: "editor" }));
    };
    load();
  }, [ref]);

  useEffect(() => {
    if (!editor) return;

    const onChange = async () => {
      const newCode = prettierJs(editor?.session?.getValue()!);
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

    const listener = () => debounced();

    editor?.session.on("change", listener);

    return () => editor?.session.off("change", listener);
  }, [editor, code, i, changeContent]);

  return (
    <div data-test-id={myId} css={css`@import url("/js/AceEditor.css")`}>
      <pre
        css={css`
    margin: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`}
        id="editor"
        ref={ref}
      />
    </div>
  );
};

async function startAce(code: string) {
  const ace = (await import("ace-builds/src/ace")).default;

  // const {ace} = window;
  var editor = (ace.edit as typeof edit)("editor");
  var js = ace.createEditSession(code);
  editor.setSession(js);

  await import("ace-builds/src/theme-monokai");

  editor.setTheme("ace/theme/monokai");
  await import("ace-builds/src/mode-typescript");
  // await import("ace-builds/src/mode-typescript-highlight-rules");

  editor.session.setMode(
    "ace/mode/typescript",
    () => ({ jsx: true }),
  );

  return editor;
}

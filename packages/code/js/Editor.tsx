/** @jsxImportSource @emotion/react */

import { FC, useEffect, useRef, useState } from "react";
import { runner } from "./runner";
import { mST, onSessionUpdate } from "./session";
import { isMobile } from "./isMobile.mjs";

import { css } from "@emotion/react";
import debounce from "lodash.debounce";
import { wait } from "wait";

const runnerDebounced = debounce(runner, 100, {
  trailing: true,
  leading: true,
  maxWait: 500,
});

const mod = {
  CH: () => {},
};

// export type IStandaloneCodeEditor = editor.Ist;

export const Editor: FC<{ code: string; i: number; codeSpace: string }> = (
  { code, i, codeSpace },
) => {
  const ref = useRef<HTMLDivElement>(null) as null | {
    current: HTMLDivElement;
  };

  // const mst = mST();
  const [
    mySession,
    changeContent,
  ] = useState({
    myCode: code,
    counter: i,
    myId: "loading",
    getValue: () => "" as string,
    setValue: (_code: string) => {},
    onChange: (_cb: () => void) => {},
    prettierJs: (code: string) => code,
    engine: isMobile() ? "ace" : "monaco",
  });

  mod.CH = () => changeContent;

  const {
    counter,
    myCode,
    myId,
    engine,
    prettierJs,
    getValue,
    setValue,
    onChange,
  } = mySession;

  const lines = code?.split("\n").length || 0;

  useEffect(() => {
    if (!ref?.current) return;

    const setMonaco = async () => {
      const { startMonaco } = await import("./startMonaco");

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
      // globalThis.editor = editor;

      changeContent((x) => ({
        ...x,
        setValue: (code: string) => {
          let state = null;
          try {
            state = editor.saveViewState();
          } catch (e) {
            console.error("error while saving the state");
          }

          editor.getModel()!.setValue(code);

          if (state) editor.restoreViewState(state);
        },
        getValue: () => editor.getModel()!.getValue() as string,
        onChange: (cb: () => void) =>
          editor?.onDidChangeModelContent(cb).dispose,
        myId: "editor",
        // model: editor.getModel(),
      }));

      // Object.assign(session, { monaco, editor, model });

      // let inc = 0;
    };

    const setAce = async () => {
      const { startAce } = await import("./startAce");
      const editor = await startAce(mST().code);
      changeContent((x) => ({
        ...x,
        onChange: (cb: () => void) => {
          editor.session.on("change", cb);
          return () => editor.session.off("change", cb);
        },
        getValue: () => editor.session.getValue(),
        setValue: (code: string) => editor.session.setValue(code),
        myId: "editor",
      }));
    };

    const loadEditors = async () => {
      engine === "monaco" ? await setMonaco() : await setAce();

      const { prettierJs } = await import("./prettierEsm");
      changeContent((x) => ({ ...x, prettierJs }));
      await wait(1000);
      // console.log("RUN THE RUNNER");
      runnerDebounced({ code: code + " ", counter });
    };

    loadEditors();
  }, [ref]);

  useEffect(() => {
    if (i > counter) {
      changeContent((x) => ({ ...x, myCode: code, counter: i }));
      return;
    }

    const cb = async () => {
      const code = getValue();
      const newCode = prettierJs(code);

      if (code === myCode) return;
      if (newCode === myCode) return;
      if (newCode === mST().code) return;
      // if (i === mST().i) return;

      try {
        // console.log("change content");

        changeContent((x) => ({ ...x, counter: counter + 1, myCode: newCode }));

        // console.log("RUN THE RUNNER AGAIN");
        await runnerDebounced({ code: newCode, counter: counter + 1 });
      } catch (err) {
        console.error({ err });
        console.error("restore editor");

        // model?.setValue(code);
      }
    };

    // const debounced = debounce(cb, 0, {
    //   maxWait: 600,
    //   trailing: true,
    //   leading: true,
    // });

    return onChange(() => cb());
  }, [setValue, getValue, onChange, counter]);

  onSessionUpdate(() => {
    console.log("sessUP");
    const sess = mST();

    setTimeout(() => {
      if (sess.i <= counter) {
        return;
      }
      if (mST().i > sess.i) return;

      // console.log(`session ${sess.i} mst: ${mST().i}, our i: ${counter}`);
      setValue(sess.code);

      if (mod.CH() as unknown as typeof changeContent !== changeContent) {
        const ch = mod.CH() as unknown as typeof changeContent;
        ch((x) => ({
          ...x,
          myCode: sess.code,
          counter: sess.i,
        }));
      }

      changeContent((x) => ({
        ...x,
        myCode: sess.code,
        counter: sess.i,
      }));
    }, 300);
  }, "editor");

  return (
    engine === "monaco"
      ? (
        <div
          data-test-id={myId}
          css={css`
max-width: 640px;
height: ${60 + lines / 40 * 100}% ;
`}
          ref={ref}
        />
      )
      : (
        <div
          data-test-id={myId}
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
      )
  );
};

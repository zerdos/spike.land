/** @jsxImportSource @emotion/react */

import { FC, useEffect, useRef, useState } from "react";
import { runner } from "./runner";
import { codeSpace } from "./ws";
import { mST, onSessionUpdate } from "./session";
import { isMobile } from "./isMobile.mjs";

// import { appFactory, renderApp } from "./starter";
import debounce from "lodash/debounce";

import { css } from "@emotion/react";


// export type IStandaloneCodeEditor = editor.Ist;

export const Editor: FC<{ code: string; i: number }> = ({ code, i }) => {
  const ref = useRef<HTMLDivElement>(null) as null | {
    current: HTMLDivElement;
  };

  // const mst = mST();
  const [
    { counter, myCode, myId, engine, prettierJs, getValue, setValue, onChange },
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

      changeContent((x) => ({
        ...x,
        setValue: (code: string) => editor.getModel()?.setValue(code),
        getValue: () => editor.getModel()?.getValue() as string,
        onChange: (cb: () => void) =>
          editor?.onDidChangeModelContent(cb).dispose,
        myId: "editor",
        // model: editor.getModel(),
      }));

      // Object.assign(session, { monaco, editor, model });

      // let inc = 0;
    };

    const setAce = async () => {
      const {startAce} = await import("./startAce");
      const editor = await startAce(mST().code);
      changeContent((x) => ({
        ...x,
        onChange: (cb: () => void) => {
          editor?.session.on("change", cb);
          return () => editor?.session.off("change", cb);
        },
        getValue: () => editor.session.getValue(),
        setValue: (code: string) => editor.session.setValue(code),
        myId: "editor",
      }));
    
    
    }

    const loadEditors = async () =>{
    

    engine === "monaco" ? await setMonaco() : await setAce();


    const {prettierJs} = await import("./prettierEsm");
    changeContent((x) => ({ ...x, prettierJs }));
    }

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
        console.log("change content");
        changeContent((x) => ({ ...x, counter: counter + 1, myCode: newCode }));
        // onUpdate(async () => {
        //   const sess = mST();
        //   // renderApp(await appFactory(sess.transpiled));

        //   if (sess.i <= counter) {
        //     return;
        //   }

        //   setTimeout(() => {
        //     if (mST().i !== sess.i) return;
        //     console.log(`session ${sess.i} mst: ${mST().i}, our i: ${counter}`);
        //     changeContent((x) => ({ ...x, code: sess.code, i: sess.i + 1 }));
        //     editor?.setValue(sess.code);
        //   }, 100);
        // });

        onSessionUpdate(async () => {
          const sess = mST();
          // renderApp(await appFactory(sess.transpiled));

          if (sess.i <= counter + 1) {
            return;
          }

          setTimeout(() => {
            if (mST().i !== sess.i) return;
            console.log(`session ${sess.i} mst: ${mST().i}, our i: ${counter}`);
            changeContent((x) => ({
              ...x,
              myCode: sess.code,
              counter: sess.i,
            }));
            setValue(sess.code);
          }, 100);
        }, "editor");

        runner({ code: newCode, counter: counter + 1 });
      } catch (err) {
        console.error({ err });
        console.error("restore editor");

        // model?.setValue(code);
      }
    };

    const debounced = debounce(cb, 300, {
      maxWait: 600,
      trailing: true,
      leading: true,
    });

    return onChange(() => debounced());
  }, [changeContent, setValue, getValue, onChange, i, code, counter, myCode]);

  if (engine === "monaco") {
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
  }

  return (
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
  );
};



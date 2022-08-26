import { FC, useEffect, useRef, useState } from "react";
import { mST, onSessionUpdate } from "./session";
import { isMobile } from "./isMobile.mjs";

import { css } from "@emotion/react";
import { wait } from "./wait";
import { Uri } from "monaco-editor";

const mod = {
  CH: () => {},
  code: "",
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
    runner: async (
      { code, counter, codeSpace }: {
        code: string;
        counter: number;
        codeSpace: string;
      },
    ) => {
      const { runner } = await import("./runner");
      runner({ code, counter, codeSpace });
      changeContent((x: typeof mySession) => ({ ...x, runner, code, counter }));
    },
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
    runner,
    engine,
    prettierJs,
    getValue,
    setValue,
    onChange,
  } = mySession;

  mod.code = myCode;

  const lines = code?.split("\n").length || 0;

  useEffect(() => {
    if (!ref?.current) return;

    const setMonaco = async () => {
      const { startMonaco } = await import("./startMonaco");

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
      monaco;

      changeContent((x) => ({
        ...x,
        setValue: (code: string) => {
          if (code == mST().code || code == mod.code) return;
          let state = null;
          try {
            state = editor.saveViewState();
          } catch (e) {
            console.error("error while saving the state");
          }

          editor.getModel()!.setValue(code);

          if (state) editor.restoreViewState(state);
        },
        getValue: () => {
          try {
            (async () => {
              const tsWorker = await (await monaco.languages.typescript
                .getTypeScriptWorker())(
                  Uri.parse(location.origin + "/live/" + codeSpace + ".tsx"),
                );

              const diag = await tsWorker.getSemanticDiagnostics(
                location.origin + "/live/" + codeSpace + ".tsx",
              );
              console.log({ diag });
            })();
          } catch {
            console.error("ts diag error");
          }
          return editor.getModel()!.getValue() as string;
        },
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
      runner({ code: code + " ", counter, codeSpace });
    };

    loadEditors();
  }, [ref]);

  useEffect(() => {
    const lastCode = mod.code;
    let last = 0;
    const handler = setInterval(() => {
      const now = Date.now();
      if (now - last < 5000) return;
      last = now;
      if (getValue() !== lastCode) {
        const code = getValue();
        if (code === mST().code || code === mod.code) return;
        changeContent((x) => ({ ...x, myCode: code, i: i + 1 }));
        runner({ code, counter, codeSpace });
      }
    }, 5000);
    return () => clearInterval(handler);
  }, [changeContent, i, runner]);

  useEffect(() => {
    if (i > counter) {
      changeContent((x) => ({ ...x, myCode: code, counter: i }));
      return;
    }

    const cb = async () => {
      const code = getValue();
      const newCode = prettierJs(code);

      if (newCode === mod.code) return;
      if (newCode === mST().code) return;
      // if (i === mST().i) return;

      try {
        // console.log("change content");

        changeContent((x) => ({ ...x, counter: counter + 1, myCode: newCode }));

        // console.log("RUN THE RUNNER AGAIN");
        await runner({ code: newCode, counter: counter + 1, codeSpace });
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
                bottom: 0;
                top: 0;
                left: 0;
                right: 0;
              `}
          id="editor"
          ref={ref}
        >
        </div>
      )
  );
};

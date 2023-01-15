import { css } from "@emotion/react";

import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";

// import { IModelContentChangedEvent, IRange, ISingleEditOperation } from "monaco-editor";
import { isMobile } from "./isMobile.mjs";
import { runner } from "./runner";
import { prettier } from "./shared";
// import { sess } from "./ws";

const codeSpace = location.pathname.slice(1).split("/")[1];
const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);

// Export type IStandaloneCodeEditor = editor.Ist;
let startedM = 0;
let startedAce = 0;

const mod = {
  i: 0,
};

const Editor: FC<
  {
    codeSpace: string;
  }
> = (
  { codeSpace },
) => {
  const ref = useRef<HTMLDivElement>(null);
  const engine = isMobile() ? "ace" : "monaco";

  const [
    { i, code, started, controller, setValue },
    changeContent,
  ] = useState({
    code: globalThis.cSess.session.code,
    i: globalThis.cSess.session.i,
    started: false,
    controller: new AbortController(),
    setValue: (_code: string) => null,
  });

  useEffect(() => {
    if (started) return;

    const start = async () => {
      // const code = await prettier(_code);
      if (!ref?.current || started) {
        return;
      }

      // const code = await ky(`${origin}/live/${codeSpace}/index.tsx`).text();

      const container = ref?.current;
      if (container === null) return;

      const { setValue } = await (engine === "monaco"
        ? setMonaco(container, codeSpace, code, i)
        : setAce(container, code)) as { setValue: (code: string) => null };

      changeContent((x) => ({ ...x, started: true, code, setValue }));
    };
    start();
  }, [started, ref.current]);

  // UseInsertionEffect(()=>{

  // })
  // useEffect(
  //   () => {
  //     // mod.getErrors().then(console.log);
  //     onChange(() =>
  //       mod.getValue().then(() =>
  //         changeContent((x: typeof mySession) => ({
  //           ...x,
  //           counter: mod.counter,
  //           myCode: mod.code,
  //         }))
  //       )
  //     );
  //   },
  //   [onChange, myCode, changeContent],
  // );

  const EditorNode = (
    <div
      data-test-id="editor"
      ref={ref}
      css={css`
    ${
        (engine === "ace") ? `` : `border-right: 4px dashed gray;
    border-bottom: 4px dashed gray;`
      }

    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    `}
    />
  );

  const onChange = async (_code: string) => {
    if (code === _code) return;
    console.log(_code);

    const ccc = await prettier(code);
    const c = await prettier(_code);

    if (c === ccc) return;
    controller.abort();

    changeContent((x) => ({
      ...x,
      i: mod.i = x.i + 1,
      code: c,
      controller: new AbortController(),
    }));
  };

  BC.onmessage = async ({ data }) => {
    if (mod.i >= data.i) return;
    if (data.code && await prettier(data.code) !== await prettier(code)) {
      setValue(data.code);
    }
    changeContent(x => ({ ...x, code: data.code, i: data.i }));
  };

  useEffect(() => {
    // let next = i;
    if (i <= globalThis.cSess.session.i) return;
    // onSessionUpdate(
    //   async () => {
    //     const { i, code: ccc } = mST(codeSpace);
    //     const prettyCCC = await prettier(ccc);
    //     const prettyCode = await prettier(code);

    //     if (!prettyCCC) return;
    //     if (prettyCCC === prettyCode) return;

    //     // if (i !== mST(codeSpace).i) return;

    //     changeContent((x) => ({
    //       ...x,
    //       i,
    //       code: ccc,
    //     }));
    //     setValue(ccc);
    //   },
    //   "editor",
    //   codeSpace,
    // );
    runner({ code, counter: i, codeSpace, signal: controller.signal });
    return () => controller.abort();
  }, [code, i, codeSpace, controller.signal]);

  if (engine === "ace") return EditorNode;

  return (
    <Rnd
      enableResizing={true}
      disableDragging={true}
      minWidth={800}
      minHeight={"100vh"}
      bounds={"body"}
      allowAnyClick={true}
      lockAspectRatio={false}
      enable={{
        top: false,
        bottom: true,
        right: true,
        left: false,
      }}
      defaultSize={{
        width: "800px",
        height: "100vh",
      }}
    >
      {EditorNode}
    </Rnd>
  );

  async function setMonaco(
    container: HTMLDivElement,
    codeSpace: string,
    code: string,
    i: number,
  ) {
    if (startedM) return;
    startedM = 1;

    const { startMonaco } = await import("./startMonaco");
    return await startMonaco({
      container,
      codeSpace,
      i,
      code,
      onChange,
    });
  }

  async function setAce(container: HTMLDivElement, code: string) {
    if (startedAce) return;
    startedAce = 1;
    const { startAce } = await import("./startAce");

    return await startAce(
      code,
      onChange,
      container,
    );
  }
};
export default Editor;
// let room = new AbortController();

// room.abort();

import { css } from "@emotion/react";

import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";

import { IModelContentChangedEvent, IRange, ISingleEditOperation } from "monaco-editor";
import { isMobile } from "./isMobile.mjs";
import { prettierJs } from "./prettierEsm";
import { runner } from "./runner";
import { mST, onSessionUpdate } from "./session";

const mod = {
  getValue: async () => "",

  setValue: async (code: string) => {
    if (code.length < 10) console.log(code);
  },
  getErrors: async () => [] as string[],
  code: "",
  counter: 0,
  codeToSet: "",
};

// Export type IStandaloneCodeEditor = editor.Ist;

export const Editor: FC<
  {
    codeSpace: string;
  }
> = (
  { codeSpace },
) => {
  const ref = useRef<HTMLDivElement>(null);
  const { i, code } = mST();
  const engine = isMobile() ? "ace" : "monaco";

  const [
    mySession,
    changeContent,
  ] = useState({
    myCode: code,
    counter: i,
    started: false,

    onChange(_cb: () => void) {},
  });

  mod.counter = mST().i;

  const {
    myCode,
    started,
    // getValue,
    onChange,
  } = mySession;

  mod.code = myCode;

  useEffect(() => {
    if (started) return;

    if (!ref?.current || started) {
      return;
    }

    const container = ref?.current;
    if (container === null) return;

    (engine === "monaco"
      ? setMonaco(container, codeSpace)
      : setAce(container, codeSpace)).then((res) => Object.assign(mod, { setValue: res?.setValue })).then(() =>
        changeContent((x: typeof mySession) => ({ ...x, started: true }))
      );
  }, [started, ref.current]);

  // UseInsertionEffect(()=>{

  // })
  useEffect(
    () => {
      mod.getErrors().then(console.log);
      onChange(() =>
        mod.getValue().then(() =>
          changeContent((x: typeof mySession) => ({
            ...x,
            counter: mod.counter,
            myCode: mod.code,
          }))
        )
      );
    },
    [onChange, myCode, changeContent],
  );

  onSessionUpdate(async () => {
    if (mod.counter >= mST().i) {
      return;
    }

    const { i, code } = mST();
    if (!code) return;
    mod.setValue(code);
    mod.code = code;
    mod.counter = i;

    changeContent((x: typeof mySession) => ({
      ...x,
      counter: i,
      myCode: code,
    }));
  }, "editor");

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
  if (engine === "ace") return EditorNode;

  return (
    <Rnd
      enableResizing={true}
      disableDragging={true}
      minWidth={640}
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
        width: "640px",
        height: "100vh",
      }}
    >
      {EditorNode}
    </Rnd>
  );
};

async function onModChange(_code: string, codeSpace: string) {
  const code = prettierJs(_code);
  if (!code) return;

  if (code === prettierJs(mod.code)) return;

  const counter = ++mod.counter;
  mod.code = code;
  runner({ code, counter, codeSpace });
}
let startedM = 0;
async function setMonaco(container: HTMLDivElement, codeSpace: string) {
  if (startedM) return;
  startedM = 1;
  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.href = location.origin + "/Editor.css";
  document.head.append(link);
  const { startMonaco } = await import("./startMonaco");
  return await startMonaco({
    container,
    codeSpace,
    code: mST().code,
    onChange: (code) => onModChange(code, codeSpace),
  });
}
let startedAce = 0;
async function setAce(container: HTMLDivElement, codeSpace: string) {
  if (startedAce) return;
  startedAce = 1;
  const { startAce } = await import("./startAce");

  return await startAce(
    mST().code,
    (code) => onModChange(code, codeSpace),
    container,
  );
}

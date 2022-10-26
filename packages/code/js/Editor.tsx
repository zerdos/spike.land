import type { FC } from "react";
import { useRef } from "react";
import React from "react";
import { runner } from "./runner";

// Import type FC from "react"
import { css } from "@emotion/react";
import { isMobile } from "./isMobile.mjs";
import { prettierJs } from "./prettierEsm";
import { mST, onSessionUpdate } from "./session";
// /Volumes/devX/spike.land/packages/code/js/prettierJs.ts
// import {wrkModuleImport} from "./moduleWorker.mjs"

// const prettierJs = async (code: string) =>{
// console.log({code});
//   const mod = wrkModuleImport("/prettierJs.mjs",['prettierJs']) as unknown as {prettierJs: (code:string)=>Promise<string>};
//   const prettied = await mod.prettierJs(code);
//   console.log({prettied});
//   return prettied

// }

const mod = {
  CH() {},
  getValue: async () => "",

  setValue: async (code: string) => {
    if (code.length < 10) console.log(code);
  },
  getErrors: async () => [] as string[],
  code: "",
  counter: 0,

  codeSpace: "",
  lastKeyDown: 0,
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
  ] = React.useState({
    lastKeyDown: 0,
    myCode: code,
    counter: i,
    started: false,

    onChange(_cb: () => void) {},
  });

  mod.counter = mST().i;
  mod.codeSpace = codeSpace;

  const {
    myCode,
    started,
    // getValue,
    onChange,
  } = mySession;

  mod.code = myCode;

  React.useEffect(() => {
    if (!ref?.current || started) {
      return;
    }

    (engine === "monaco" ? setMonaco() : setAce()).then((res) => Object.assign(mod, res)).then(() =>
      changeContent((x: typeof mySession) => ({ ...x, started: true }))
    );
  }, [started, ref]);

  // UseInsertionEffect(()=>{

  // })

  React.useEffect(
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

    mod.counter = mST().i;
    const code = mST().code;
    if (!code) return;
    mod.code = code;
    await mod.setValue(mod.code);

    changeContent((x: typeof mySession) => ({
      ...x,
      counter: mod.counter,
      myCode: mod.code,
    }));
  }, "editor");

  return (
    <div
      onKeyDown={() => mod.lastKeyDown = Date.now()}
      id="editor"
      data-test-id="editor"
      css={css`          
      max-width: 640px;
      height: 100%; 
  `}
      ref={ref}
    />
  );
};

async function onModChange(_code: string) {
  const code = prettierJs(_code);
  if (!code) return;

  if (code === prettierJs(mod.code)) return;

  const counter = ++mod.counter;
  mod.code = code;
  runner({ code, counter, codeSpace: mod.codeSpace });
}

async function setMonaco() {
  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.href = location.origin + "/Editor.css";
  document.head.append(link);
  const { startMonaco } = await import("./startMonaco");
  const container = window.document.getElementById("editor") as HTMLDivElement;
  return startMonaco({
    container,
    name: mod.codeSpace,
    code: (mST().code),
    onChange: onModChange,
  });
}

async function setAce() {
  const { startAce } = await import("./startAce");

  return await startAce(mST().code, onModChange);
}

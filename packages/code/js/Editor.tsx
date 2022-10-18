import { useRef } from "react";
import { runner } from "./runner";
import React from "react";

// Import type FC from "react"
import { css } from "@emotion/react";
import { mST, onSessionUpdate } from "./session";
import { isMobile } from "./isMobile.mjs";
import { prettierJs } from "./prettierJs";
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

export const Editor: React.FC<
  {
    codeSpace: string;
  }
> = (
  { codeSpace },
) => {
  const ref = useRef<HTMLDivElement>(null);
  const { i, code } = mST();

  const [
    mySession,
    changeContent,
  ] = React.useState({
    lastKeyDown: 0,
    myCode: code,
    counter: i,
    started: false,

    onChange(_cb: () => void) {},
    engine: isMobile() ? "ace" : "monaco",
  });

  mod.counter = mST().i;
  mod.codeSpace = codeSpace;

  const {
    myCode,
    started,
    // runner,
    engine,
    // getValue,
    onChange,
  } = mySession;

  mod.code = myCode;

  React.useEffect(() => {
    if (ref.current === null && started) {
      return;
    }

    (engine === "monaco" ? setMonaco(ref.current!) : setAce()).then((res) =>
      Object.assign(mod, res)
    ).then(() => changeContent((x) => ({ ...x, started: true })));
  }, [started, ref]);

  // UseInsertionEffect(()=>{

  // })

  React.useEffect(
    () => {
      mod.getErrors().then(console.log);
      onChange(() =>
        mod.getValue().then(() =>
          changeContent((x) => ({
            ...x,
            counter: mod.counter,
            myCode: mod.code,
          }))
        )
      );
    },
    [onChange, myCode, changeContent],
  );

  onSessionUpdate(() => {
    if (mod.counter >= mST().i) {
      return;
    }

    mod.counter = mST().i;
    mod.code = mST().code;

    mod.setValue(mod.code);
    changeContent((x) => ({
      ...x,
      counter: mod.counter,
      myCode: mod.code,
    }));
  }, "editor");

  return (
    <div
      onKeyDown={() => mod.lastKeyDown = Date.now()}
      id="editor"
      css={css`          
      max-width: 640px;
      height: 100%; 
      `}
      ref={ref}
    />
  );
};

async function onModChange(_code: string) {
  const code = await prettierJs(_code);

  if (code === mod.code) return;

  const counter = ++mod.counter;
  mod.code = code;
  runner({ code, counter, codeSpace: mod.codeSpace });
}

async function setMonaco(container: HTMLDivElement) {
  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.href = location.origin + "/Editor.css";
  document.head.append(link);

  const { startMonaco } = await import("./startMonaco");

  return startMonaco({
    container,
    name: mod.codeSpace,
    code: mST().code,
    onChange: onModChange,
  });
}

async function setAce() {
  const { startAce } = await import("./startAce");
  return await startAce(mST().code, onModChange);
}

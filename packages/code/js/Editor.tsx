import { Resizable } from "re-resizable";
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

// import styled from "@emotion/styled";
// import Highlight, { defaultProps } from "prism-react-renderer";
// import theme from "prism-react-renderer/themes/vsDark";

// const Pre = styled.pre`
//   text-align: left;
//   margin: 1em 0;
//   padding: 0.5em;
//   overflow: scroll;
// `;

// const Line = styled.div`
//   display: table-row;
// `;

// const LineNo = styled.span`
//   display: table-cell;
//   text-align: right;
//   padding-right: 1em;
//   user-select: none;
//   opacity: 0.5;
// `;

// const LineContent = styled.span`
//   display: table-cell;
//   font-size: 12px;
//   line-height: 18px;
//   font-weight: normal;

//   font-feature-settings: "liga" 0, "calt" 0;
//   font-family: Menlo, Monaco, "Courier New", monospace
// `;

const mod = {
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
    <Resizable
      defaultSize={{
        width: "640px",
        height: "100vh",
      }}
    >
      {
        /* {engine === "monaco" && (
        <Highlight Prism={defaultProps.Prism} theme={theme} code={myCode} language="tsx">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Pre className={className} style={style}>
              {tokens.map((line, i) => (
                <Line key={i} {...getLineProps({ line, key: i })}>
                  <LineNo>{i + 1}</LineNo>
                  <LineContent>
                    {line.map((token, key) => <span key={key} {...getTokenProps({ token, key })} />)}
                  </LineContent>
                </Line>
              ))}
            </Pre>
          )}
        </Highlight>
      )} */
      }
      <div
        id="editor"
        data-test-id="editor"
        css={css`    
        width: 100%;
        height: 100%; 
     `}
        ref={ref}
      />
    </Resizable>
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

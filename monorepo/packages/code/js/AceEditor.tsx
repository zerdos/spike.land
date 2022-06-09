/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useState } from "react";
import {renderApp, appFactory} from "./starter";
import { mST } from "./session";
import { codeSpace } from "./ws";

import { css } from "@emotion/react";

import { runnerDebounced } from "./runner";


let formatter = null;
export const AceEditor = () => {
  const ref = useRef<HTMLPreElement>(null) as null | {
    current: HTMLPreElement;
  };

  const [{code, i, editor}, changeContent]  = useState({...mST(), editor: null});



  useEffect(() => {
    if (ref === null) return;
    const load = async () => {
      const editor = await startAce(mST().code);

      changeContent(x=>({...x, editor}));
    };
    load();
  }, [ref]);

  useEffect(()=>{

    if (!editor) return;

    const listener = async()=>{
    formatter = formatter || (await import("./prettierEsm")).prettier;
    const code = editor.getValue()!;
    if (formatter(code) === mST().code) return;
    changeContent(x=>({...x, code, i: x.i+1 }));
    runnerDebounced(code, i+1);
    }
    editor?.session.on("change", listener)

    return ()=>editor?.session.off("change", listener);
  }, [editor, code, i, changeContent])


globalThis.setValue = async ()=> {
  const mst = mST();
  if ( i>=mst.i) return;
  
  editor?.getModel().setValue(mst.code);
  changeContent(x=> ({...x, i: mst.i, code: mst.code}));
}



  return (
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
  );
};

async function startAce(code: string, ) {
  const ace = (await import("ace-builds/src/ace")).default;

  // const {ace} = window;
  var editor = ace.edit("editor");
  var js = ace.createEditSession(code);
  editor.setSession(js);

  await import("ace-builds/src/theme-monokai");

  editor.setTheme("ace/theme/monokai");
  await import("ace-builds/src/mode-typescript");
  // await import("ace-builds/src/mode-typescript-highlight-rules");

  editor.session.setMode(
    "ace/mode/typescript",
    (opts) => ({ ...opts, jsx: true }),
  );


  return editor;
}

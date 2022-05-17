/** @jsxImportSource @emotion/react */

import {useRef, useEffect} from "react";
import { mST, codeSpace } from "./ws";

import { css } from "@emotion/react";


export const AceEditor =()=>
{
    const ref=useRef<HTMLPreElement>(null) as null | {current: HTMLPreElement };


    useEffect(()=>{
        if (ref === null) return;
        const load = async ()=>{



  const { runnerDebounced } = await import("./runner");

  await startAce(mST().code, (newCode)=>{
    runnerDebounced(
      newCode,
      mST().i + 1,
    )
  });


        }
        load();
    }
    , [ref])

return <pre css={css`
    margin: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`}  id="editor" ref={ref} />

}

async function startAce   (code:string, onChange:(newCode: string)=>void){
   
    const ace = (await import("ace-builds/src/ace")).default;

    // const {ace} = window;
    var editor = ace.edit("editor");
    var js = ace.createEditSession(code);
    editor.setSession(js);

    await import("ace-builds/src/theme-monokai");
    
    editor.setTheme("ace/theme/monokai");
    await import("ace-builds/src/mode-typescript");
    // await import("ace-builds/src/mode-typescript-highlight-rules");
    
    editor.session.setMode("ace/mode/typescript",(opts)=>({...opts,jsx: true}));

    editor.session.on("change",  ()=>{
        const newStr = editor.getValue();
        onChange(newStr)
    });
    globalThis.aceEditor = editor;
}
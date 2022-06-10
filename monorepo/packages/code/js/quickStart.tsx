/** @jsxImportSource @emotion/react */
import shiki from 'shiki';
import { isMobile } from "./isMobile.mjs";
import { AceEditor } from "./AceEditor";
import { MonacoEditor } from "./MonacoEditor";
impoer {useEffect, useState} from "react";
import { renderPreviewWindow } from "./renderPreviewWindow";
import { useEffect, useInsertionEffect } from "react";
import { useSpring } from 'types/framer.js';
import { mST } from 'session.js';
import { useState } from 'preact/hooks';


const  Shiki = () => {
  const [code, setCode] = useState(mST().code);

    const [innerHtml, setInnerHtml] = useState('');
  useEffect(()=>{

    const run = async()=>{
      const highliter = await shiki.getHighlighter({
    theme: 'nord'
  });
     setInnerHtml(highliter.codeToHtml(`console.log('shiki');`, { lang: 'js' }))
  }
  run();
}, [code])
  
  return <div dangerouslySetInnerHTML={{__html: innerHtml}} />
}

globalThis.editable=false;

export async function quickStart() {
  if (!globalThis.editable) return  renderPreviewWindow(Shiki);
}


  

  return renderPreviewWindow(MonacoEditor);

}
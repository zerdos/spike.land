/** @jsxImportSource @emotion/react */
// import * as shiki from 'shiki';
import { isMobile } from "./isMobile.mjs";

import { renderPreviewWindow } from "./renderPreviewWindow.tsx";

// const  Shiki = () => {
//   // const [code, setCode] = useState(mmST().code);

//     const [innerHtml, setInnerHtml] = useState('');
//   useEffect(()=>{

//     const run = async()=>{
//       const highliter = await shiki.getHighlighter({
//     theme: 'nord'
//   });
//      setInnerHtml(highliter.codeToHtml(mST().code, { lang: 'ts' }))
//   }
//   run();
// }, [code])

//   return <div dangerouslySetInnerHTML={{__html: innerHtml}} />
// }

globalThis.editable = false;

export async function quickStart() {
  // if (!globalThis.editable) return  renderPreviewWindow(Shiki);

  if (isMobile()) {
    const { AceEditor } = await import("./AceEditor.tsx");
    return renderPreviewWindow(AceEditor);
  }

  const { MonacoEditor } = await import("./MonacoEditor.tsx");
  return renderPreviewWindow(MonacoEditor);
}

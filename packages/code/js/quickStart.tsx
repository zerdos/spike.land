/** @jsxImportSource @emotion/react */
// import * as shiki from 'shiki';
import { isMobile } from "./isMobile.mjs";
import { AceEditor } from "./AceEditor";
import { MonacoEditor } from "./MonacoEditor";
import { renderPreviewWindow } from "./renderPreviewWindow";

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
    return renderPreviewWindow(AceEditor);
  }
  return renderPreviewWindow(MonacoEditor);
}

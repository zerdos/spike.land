/** @jsxImportSource @emotion/react */


import { isMobile } from "./isMobile.mjs";
import { AceEditor } from "./AceEditor";
import { MonacoEditor } from "./MonacoEditor";

import { renderPreviewWindow } from "./renderPreviewWindow"

export async function quickStart() {

  if (isMobile())  {
    return renderPreviewWindow(AceEditor );
  } 
  return  renderPreviewWindow(MonacoEditor);
}

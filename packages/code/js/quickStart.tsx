/** @jsxImportSource @emotion/react */

import { isMobile } from "./isMobile.mjs";

import { renderPreviewWindow } from "./renderPreviewWindow";


globalThis.editable = false;

export async function quickStart() {

  if (isMobile()) {
    const { AceEditor } = await import("./AceEditor");
    return renderPreviewWindow(AceEditor);
  }

  const { MonacoEditor } = await import("./MonacoEditor");
  return renderPreviewWindow(MonacoEditor);
}

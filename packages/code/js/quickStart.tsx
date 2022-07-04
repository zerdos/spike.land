/** @jsxImportSource @emotion/react */

import { url } from "inspector";
import { isMobile } from "./isMobile.mjs";

import { renderPreviewWindow } from "./renderPreviewWindow";

globalThis.editable = false;

export async function quickStart() {
  // window.Buffer = require("buffer/").Buffer;

  if (
    location.pathname.endsWith("public") || globalThis.model ||
    location.pathname.endsWith("hydrated")
  ) {
    renderPreviewWindow();
  }

  if (isMobile()) {
    const { AceEditor } = await import(new URL("/js/AceEditor.mjs",location.origin).toString());
    return renderPreviewWindow(AceEditor);
  }

  const { MonacoEditor } = await import(new URL("/js/MonacoEditor.mjs",location.origin).toString());
  return renderPreviewWindow(MonacoEditor);
}

/** @jsxImportSource @emotion/react */

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
    const { AceEditor } = await import("./AceEditor");
    return renderPreviewWindow(AceEditor);
  }

  const { MonacoEditor } = await import("./MonacoEditor");
  return renderPreviewWindow(MonacoEditor);
}

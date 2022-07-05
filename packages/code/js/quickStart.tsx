/** @jsxImportSource @emotion/react */
export async function quickStart() {
  const { renderPreviewWindow } = await import("./renderPreviewWindow");
  // window.Buffer = require("buffer/").Buffer;

  if (
    location.pathname.endsWith("public") || globalThis.model ||
    location.pathname.endsWith("hydrated")
  ) {
    renderPreviewWindow();
  }

  const { Editor } = await import("./Editor");
  return renderPreviewWindow(Editor);
}

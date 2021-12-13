export async function renderPreviewWindow(
  session,
) {
  const { code, transpiled, html, editor, mode } = session;

  const {
    DraggableWindow,
    jsx,
    render,
  } = await import(
    "@spike.land/renderer"
  );

  const onShare = async () => {
    const { shareItAsHtml } = await import("./share.mjs");
    const link = await shareItAsHtml({
      code,
      transpiled,
      html,
    });

    open(link + "/");
  };

  let preview = window.document.getElementById("preview");

  if (!preview) {
    const element = window.document.createElement("div");
    window.document.body.appendChild(element);
    preview = element;
  }

  render(
    jsx(DraggableWindow, {
      onShare,
      session,
      onRestore: () => {
        const model = editor.getModel();
        model.setValue(code);
      },
      position: mode === "window" ? "fixed" : "absolute",
    }),
    preview,
  );
}

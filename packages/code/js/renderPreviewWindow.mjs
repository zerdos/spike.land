export async function renderPreviewWindow(
  session,
) {
 

  const {
    DraggableWindow,
    jsx,
    render,
  } = await import(
    "@spike.land/renderer"
  );

  const onShare = async () => {
    const { shareItAsHtml } = await import("./share.mjs");
    const link = await shareItAsHtml(session);

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
        const model = session.editor.getModel();
        model.setValue(session.code);
      },
      position: session.mode === "window" ? "fixed" : "absolute",
    }),
    preview,
  );
}

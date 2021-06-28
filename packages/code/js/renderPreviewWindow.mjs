export async function renderPreviewWindow(
  session,
) {
  let rendererSrc = `https://spike.land/modules/renderer.mjs`;

  if (window.location.hostname.indexOf("0.0") !== -1) {
    const cid = window.location.pathname.slice(6, 52);
    rendererSrc = `/ipfs/${cid}/modules/renderer.mjs`;
  }

  const {
    DraggableWindow,
    jsx,
    render,
  } = await import(
    rendererSrc
  );

  const onShare = async () => {
    const { shareItAsHtml } = await import("./share.mjs");
    const link = await shareItAsHtml({
      code: session.code,
      transpiled: session.transpiled,
      html: session.html,
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
        const { monaco } = window;
        const modelUri = monaco.Uri.parse(`file:///main.tsx`);
        const model = monaco.editor.getModel(modelUri);
        model.setValue(session.code);
      },
      position: session.mode === "window" ? "fixed" : "absolute",
    }),
    preview,
  );

  // const zbody = window.document.getElementById("zbody");
  // if (zbody !== null) {
  // zbody.appendChild(session.div);
  // }

  // if (session.html) {
  // session.div.innerHTML = session.html;
  // }
}

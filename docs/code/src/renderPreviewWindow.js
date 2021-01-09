// deno-lint-ignore-file
//@ts-nocheck

export function renderPreviewWindow(
  mode,
  session,
  open,
  renderEmotion,
  jsx,
  DraggableWindow,
) {
  const onShare = async () => {
    const { shareItAsHtml } = await import("./share.js");

    const link = await shareItAsHtml({
      code: session.code,
      versions: session.versions,
      transpiled: session.transpiled,
      html: session.html,
    });

    open(link);
  };

  let preview = window.document.getElementById("preview");

  if (!preview) {
    const element = window.document.createElement("div");
    window.document.body.appendChild(element);
    preview = element;
  }

  renderEmotion(
    jsx(DraggableWindow, {
      onShare,
      position: mode === "window" ? "fixed" : "absolute",
    }),
    preview,
  );

  const zbody = window.document.getElementById("zbody");
  if (zbody !== null) {
    zbody.appendChild(session.div);
  }

  if (session.html) {
    session.div.innerHTML = session.html;
  }
}

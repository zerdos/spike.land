// deno-lint-ignore-file
//@ts-nocheck

import { shareItAsHtml } from "./share.js";

export async function renderPreviewWindow(
  session,
) {
  let rendererSrc = `https://code.zed.vision/modules/renderer.js`;

  if (window.location.hostname.indexOf("::1") !== -1) {
    const cid = window.location.pathname.slice(6, 52);
    rendererSrc = `/ipfs/${cid}/modules/renderer.js`;
  }

  const {
    DraggableWindow,
    jsx,
    render,
  } = await import(
    rendererSrc
  );

  const onShare = async () => {
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

  render(
    jsx(DraggableWindow, {
      onShare,
      position: session.mode === "window" ? "fixed" : "absolute",
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

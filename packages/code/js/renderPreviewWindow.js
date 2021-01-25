// deno-lint-ignore-file
//@ts-nocheck

import { shareItAsHtml } from "./share.js";
import { cid } from "https://code.zed.vision/cid.js";

export async function renderPreviewWindow(
  session,
) {
  const {
    DraggableWindow,
    jsx,
    render,
  } = await import(`/ipfs/${cid}/js/emotion-react-renderer/dist/renderer.js`);

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

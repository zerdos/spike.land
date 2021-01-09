/**
 * @param {string} mode
 * @param {{ unmount?: () => void; hydrated?: boolean; preRendered?: boolean; lastErrors?: number; rootElement?: null; div: any; HTML: any; devtoolHash?: string; ipfs?: number; transpiled: any; code: any; }} session
 * @param {{ (url: string): void; (arg0: string): void; }} open
 * @param {{ shadb: string; ipfs: string; workbox: string; babel: string; prettier: string; uuid: string; comlink: string; editor: string; emotionRenderer: string; }} v
 * @param {(arg0: any, arg1: HTMLDivElement) => void} renderEmotion
 * @param {(arg0: any, arg1: { onShare: () => Promise<void>; }) => any} jsx
 * @param {any} DraggableWindow
 */
export async function renderPreviewWindow(
  mode,
  session,
  open,
  v,
  renderEmotion,
  jsx,
  DraggableWindow,
) {
  if (mode === "window") {
    const onShare = async () => {
      const { shareItAsHtml } = await import("./share.js");

      const link = await shareItAsHtml(
        {
          code: session.code,
          transpiled: session.transpiled,
          HTML: session.HTML,
        },
      );

      console.log({ link });
      open(link);
    };

    const element = window.document.createElement("div");
    window.document.body.appendChild(element);

    renderEmotion(jsx(DraggableWindow, { onShare }), element);

    const zbody = window.document.getElementById("zbody");
    if (zbody !== null) {
      zbody.appendChild(session.div);
    }

    if (session.HTML) {
      session.div.innerHTML = session.HTML;
    }
  }
}

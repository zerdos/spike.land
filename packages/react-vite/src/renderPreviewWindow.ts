
/** @jsx jsx */

import {jsx} from "@emotion/react"

import {render} from "react-dom"


export async function renderPreviewWindow(
    session: {
        code: string,
        transpiled: string,
        html: string,
        div: {
          innerHTML: string
        },
        mode: string,
        url: string,
        errorText: string
    }
  ) {
  
    const {
      DraggableWindow
    } = await import(
      "./DraggableWindow"
    );
  
    const onShare = async () => {
      const { shareItAsHtml } = await import("./share");
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
          //@ts-ignore
          const {monaco} = window;
          const modelUri = monaco.Uri.parse(`file:///main.tsx`);
          const model = monaco.editor.getModel(modelUri);
          model!.setValue(session.code);
        },
        position: session.mode === "window" ? "fixed" : "absolute",
      }),
      preview,
    );
  
    const zbody = window.document.getElementById("zbody");
    if (zbody !== null) {
      const zCon = window.document.createElement("div");
      zCon.innerHTML = session.html;
      zbody.appendChild(zCon);
    }
  
    if (session.html) {
      session.div.innerHTML = session.html;
    }
  }
  
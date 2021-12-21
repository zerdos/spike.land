/** @jsx jsx */

import React from "react";
import {render} from "react-dom";
import {jsx} from "@emotion/react"
import {DraggableWindow} from "./DraggableWindow"

export const  renderPreviewWindow = async  (session) =>{
 
  let target = document.createElement("div");

  render(
    <DraggableWindow
      onShare={async () => {
        const { shareItAsHtml } = await import("./share.mjs");
        const link = await shareItAsHtml(session);

        open(link + "/");
      }}
      onRestore={() => {
        const model = session.editor.getModel();
        model.setValue(session.code);
      }}
      position={session.mode === "window" ? "fixed" : "absolute"}
      session={session}
    />,
    target,
  );


  document.body.appendChild(target);
}

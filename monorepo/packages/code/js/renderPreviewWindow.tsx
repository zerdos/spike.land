/** @jsxImportSource @emotion/react */

import bg from "./assets/synthwave.webp";
import path from "path-browserify";
import { render } from "react-dom";


import { mST, mySession, roomName } from "./ws";
import { DraggableWindow } from "./DraggableWindow";

export const renderPreviewWindow = async (
 
) => {
  console.log("renderPreviewWindow");

  const target = document.createElement("div");
  const editor = document.getElementById("monacoEditor");
  if (editor) editor.style.opacity = "0";

  document.body.style.backgroundImage = `url(${path.join("./chunks/", bg)} )`;

  render(
    <DraggableWindow
      onRestore={() => {
        const model = globalThis.model;
        model.setValue(mST().code);
      }}
      room={roomName}
      session={mST()}
      hashCode={mySession.hashCode()}
    />,
    target,
  );
  const oldRoot = document.getElementById("root");
  if (oldRoot) oldRoot.replaceWith(target);
  else
  document.body.appendChild(target);
  if (editor) {
    editor.style.opacity = "1";
    editor.style.display = "block";
  }
};

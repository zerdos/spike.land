/** @jsxImportSource @emotion/react */

import bg from "./assets/synthwave.webp";
import path from "path-browserify";
import { render } from "react-dom";
import { IRunnerSession } from "./quickStart";

import { hashCode } from "./session";
import { roomName } from "./ws";
import { DraggableWindow } from "./DraggableWindow";

export const renderPreviewWindow = async (
  session: IRunnerSession,
) => {
  console.log("renderPreviewWindow");

  const target = document.createElement("div");
  const editor = document.getElementById("monacoEditor");
  if (editor) editor.style.opacity = "0";

  document.body.style.backgroundImage = `url(${path.join("./chunks/", bg)} )`;

  const { App } = globalThis;
  render(
    <DraggableWindow
      onShare={() => open(`https://spike.land/api/room/${roomName}/public`)}
      onRestore={() => {
        const model = globalThis.model;
        model.setValue(session.code);
      }}
      room={roomName}
      session={session}
      hashCode={hashCode()}
    >
      <App></App>
    </DraggableWindow>,
    target,
  );

  document.body.appendChild(target);
  if (editor) {
    editor.style.opacity = "1";
    editor.style.display = "block";
  }
};

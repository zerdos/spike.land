/**@jsx jsx */
import { jsx } from "@emotion/react";
import path from "path-browserify";
import { render } from "react-dom";
import type { ICodeSession } from "./session";

import { hashCode } from "./session";

export const renderPreviewWindow = async (
  session: ICodeSession,
  room: string,
  keepFullScreen: boolean,
) => {
  const { DraggableWindow } = await import("./DraggableWindow");

  console.log("renderPreviewWindow");

  const target = document.createElement("div")!;
  const editor = document.getElementById("monacoEditor")!;
  editor.style.opacity = "0";
  //@ts-ignore
  const { App } = globalThis;

  const bg = (await import("./assets/synthwave.webp")).default;
  document.body.style.backgroundImage = `url(${
    path.join("./dist/chunks/", bg)
  } )`;
  render(
    <DraggableWindow
      onShare={() => open(`https://spike.land/api/room/${room}/public`)}
      onRestore={() => {
        //@ts-ignore
        const model = session.editor.getModel();
        model.setValue(session.code);
      }}
      //@ts-ignore

      position={session.mode === "window" ? "fixed" : "absolute"}
      //@ts-ignore

      session={session}
      hashCode={hashCode()}
      keepFullScreen={keepFullScreen}
      room={room}
    >
      <App />
    </DraggableWindow>,
    target,
  );

  document.body.appendChild(target);

  editor.style.opacity = "1";
  editor.style.display = "block";
};

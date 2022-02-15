import { render } from "preact";
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

  // d//ocument.getElementById("root")?.replaceWith(target);

  // const diffy = window.diffy = Date.now() - window.aniStart;

  // console.log({ diffy });

  // await wait(2000);

  // console.log("wait....: " + String(2000 - diffy));

  // await wait(2000 - diffy);

  document.body.style.backgroundImage = `url("assets/synthwave.webp");`;

  editor.style.opacity = "1";
  editor.style.display = "block";
};

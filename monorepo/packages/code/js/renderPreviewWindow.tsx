/** @jsx jsx */
import { css, jsx } from "@emotion/react";
//@ts-ignore
import { createPortal, hydrate, render } from "react";
import type { ICodeSession } from "./session";

import { hashCode } from "./session";
// import { createPortal } from "preact/compat";
// import { hydrate } from "preact";

export const renderPreviewWindow = async (
  session: ICodeSession,
  room: string,
  keepFullScreen: boolean,
) => {
  const { DraggableWindow } = await import("./DraggableWindow");

  console.log("renderPreviewWindow");

  const target = document.createElement("div")!;
  const editor = document.getElementById("monacoEditor")!;
  // Target.style.display = "none";
  editor.style.opacity = "0";

  // Const Element = () => (
  //   <DraggableWindow
  //     onShare={() => open(`https://spike.land/api/room/${room}/public`)}
  //     onRestore={() => {}}
  //     position={session.mode === "window" ? "fixed" : "absolute"}
  //     session={session}
  //   />
  // );
  // document.getElementById("root")!.style.height = "0";
  // const {html} = getHtmlAndCss( <Element></Element> as any );
  // target  .innerHTML = html;
  //@ts-ignore

  // Target  .innerHTML = html;
  const { App } = globalThis;
  // const App: FC = ({ children }) =>
  // createPortal(children, document.getElementById("zbody"));
  const Rendered = () => (
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
    </DraggableWindow>
  );

  render(
    jsx(Rendered),
    target,
  );
  window.document.body.appendChild(target);

  // d//ocument.getElementById("root")?.replaceWith(target);

  // const diffy = window.diffy = Date.now() - window.aniStart;

  // console.log({ diffy });

  // await wait(2000);

  // console.log("wait....: " + String(2000 - diffy));

  // await wait(2000 - diffy);

  window.document.body.style.backgroundImage = `url("assets/synthwave.webp");`;

  editor.style.opacity = "1";
  editor.style.display = "block";
};

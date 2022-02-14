/** @jsx jsx */
import { css, jsx } from "@emotion/react";
//@ts-ignore
import { createPortal, hydrate, render } from "react";
import { DraggableWindow } from "./DraggableWindow";
import { wait } from "./wait";
import type { FC } from "react";
import type { ICodeSession } from "./session";

import { hashCode } from "./session";
import bg from "./assets/synthwave.webp";
// import { createPortal } from "preact/compat";
// import { hydrate } from "preact";

export const renderPreviewWindow = async (
  session: ICodeSession,
  room: string,
  keepFullScreen: boolean,
) => {
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
  // const { App } = globalThis;
  const App: FC = ({ children }) =>
    createPortal(children, document.getElementById("zbody"));
  const Rendered = () => (
    <DraggableWindow
      onShare={() => open(`https://spike.land/api/room/${room}/public`)}
      onRestore={() => {
        const model = session.editor.getModel();
        model.setValue(session.code);
      }}
      position={session.mode === "window" ? "fixed" : "absolute"}
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
  document.body.appendChild(target);

  // d//ocument.getElementById("root")?.replaceWith(target);

  // const diffy = window.diffy = Date.now() - window.aniStart;

  // console.log({ diffy });

  // await wait(2000);

  // console.log("wait....: " + String(2000 - diffy));

  // await wait(2000 - diffy);

  document.body.style.backgroundImage =
    `url("https://spike.land/dist/chunks/${bg}")`;

  editor.style.opacity = "1";
  editor.style.display = "block";
};

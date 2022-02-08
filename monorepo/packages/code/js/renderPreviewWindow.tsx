/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { render } from "react-dom";
import { DraggableWindow } from "./DraggableWindow";
import { wait } from "./wait";
import type { ICodeSession } from "./session";

import { hashCode } from "./session";

export const renderPreviewWindow = async (
  session: ICodeSession,
  room: string,
  keepFullScreen: boolean,
) => {
  const target = document.createElement("div");
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

  // const {html} = getHtmlAndCss( <Element></Element> as any );

  // target  .innerHTML = html;
  //@ts-ignore

  // Target  .innerHTML = html;

  render(
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
    />,
    target,
  );

  const diffy = window.diffy = Date.now() - window.aniStart;

  console.log({ diffy });

  target.style.opacity = "0";
  // await wait(2000);
  document.body.append(target);

  console.log("wait....: " + String(2000 - diffy));

  await wait(2000 - diffy);

  target.style.display = "block";
  target.style.opacity = "1";
  document.querySelector("#root")!.remove();
  document.body.style.backgroundImage =
    'url("https://unpkg.com/@spike.land/code@0.6.11/js/assets/synthwave.webp")';

  editor.style.opacity = "1";
  editor.style.display = "block";
};

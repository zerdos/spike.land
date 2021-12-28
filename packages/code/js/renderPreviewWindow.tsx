/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Suspense } from "react";
import {} from "react-dom/next";
import { DraggableWindow } from "./DraggableWindow.tsx";
// import { getHtmlAndCss
//  } from "./renderToString";

export const renderPreviewWindow = async (session) => {
  const target = document.createElement("div");
  const editor = document.getElementById("shadowEditor")!;
  target.style.opacity = "0";
  editor.style.opacity = "0";

  const { room } = session;

  // const Element = () => (
  //   <DraggableWindow
  //     onShare={() => open(`https://code.spike.land/api/room/${room}/public`)}
  //     onRestore={() => {}}
  //     position={session.mode === "window" ? "fixed" : "absolute"}
  //     session={session}
  //   />
  // );

  // const {html} = getHtmlAndCss( <Element></Element> as any );

  // target  .innerHTML = html;

  const { createRoot } = await import("react-dom");

  // target  .innerHTML = html;

  const root = createRoot(target, {});
  // root.render(<Element></Element> as any);

  root.render(
    <DraggableWindow
      onShare={() => open(`https://code.spike.land/api/room/${room}/public`)}
      onRestore={() => {
        const model = session.editor.getModel();
        model.setValue(session.code);
      }}
      position={session.mode === "window" ? "fixed" : "absolute"}
      session={session}
    />,
  );
  document.body.appendChild(target);

  target.style.opacity = "1";
  editor.style.opacity = "1";

  document.getElementById("root")!.remove();
};

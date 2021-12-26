/** @jsx jsx */
import { jsx } from "@emotion/react";
import {} from "react-dom/next";
import { DraggableWindow } from "./DraggableWindow";
// import { getHtmlAndCss
//  } from "./renderToString";

export const renderPreviewWindow = async (session) => {
  const target = document.getElementById("root")!;
  const { room } = session;

  const Element = () => (
    <DraggableWindow
      onShare={() => open(`https://code.spike.land/api/room/${room}/public`)}
      onRestore={() => {}}
      position={session.mode === "window" ? "fixed" : "absolute"}
      session={session}
    />
  );

  // const {html} = getHtmlAndCss( <Element></Element> as any );

  // target  .innerHTML = html;

  const { createRoot } = await import("react-dom");

  // target  .innerHTML = html;

  const root = createRoot(target);
  root.render(<Element></Element> as any);

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
};

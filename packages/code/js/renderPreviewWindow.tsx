/** @jsx jsx */
import { jsx } from "@emotion/react";
import {} from "react-dom/next";
import { createRoot } from "react-dom";
import { DraggableWindow } from "./DraggableWindow";

export const renderPreviewWindow = async (session) => {
  const target = document.createElement("div");
  const root = createRoot(target);
  const { room } = session;

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

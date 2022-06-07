/** @jsxImportSource @emotion/react */

import { render } from "react-dom";

import { Fragment } from "react";

import { codeSpace } from "./ws";
import { hashCode } from "./session";
import { DraggableWindow } from "./DraggableWindow";
import type { FC } from "react";


globalThis.draggableWindow = globalThis.draggableWindow || 0;
export const renderPreviewWindow = async (Editor: FC<{}>) => {
  if (globalThis.draggableWindow++) return;
  console.log("renderPreviewWindow");

  const target = document.createElement("div");
  target.style.height = "100%";
  // document.getElementById("root");

  document.body.style.backgroundImage = `url("/assets/synthwave.webp")`;
  const { App } = globalThis;

  render(
    <Fragment>
      <DraggableWindow
        // onRestore={() => {
        //   const model = globalThis.model;
        //   model.setValue(mST().code);
        // }}
        hashCode={hashCode()}
        room={codeSpace}
      >
        <App />
      </DraggableWindow>

      <Editor />
    </Fragment>,
    target,
  );

  document.body.appendChild(target);
  document.getElementById("root")?.remove();
  target.id = "root";
};

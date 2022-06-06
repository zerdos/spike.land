/** @jsxImportSource @emotion/react */

import path from "path-browserify";
import { render } from "react-dom";

import { Fragment } from "react";

import { codeSpace } from "./ws";
import { hashCode } from "./session";
import { DraggableWindow } from "./DraggableWindow";
import type { FC } from "react";
import { appFactory } from "./starter";

globalThis.draggableWindow = globalThis.draggableWindow || 1;
export const renderPreviewWindow = async (Editor: FC<{}>) => {
  if (!globalThis.draggableWindow++ > 1) return;
  console.log("renderPreviewWindow");

  const target = //document.createElement("div");  
  document.getElementById("root")

  document.body.style.backgroundImage = `url("/assets/synthwave.webp")`;
  const {App} = globalThis;

  render(
    <Fragment>
        <DraggableWindow
        // onRestore={() => {
        //   const model = globalThis.model;
        //   model.setValue(mST().code);
        // }}
        hashCode={hashCode()}
        room={codeSpace}
      ><App /></DraggableWindow>
        
              <Editor />

    </Fragment>,
    target,
  );

  // document.getElementById("root").append(target);

};

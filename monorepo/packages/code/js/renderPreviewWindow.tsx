/** @jsxImportSource @emotion/react */

import bg from "./assets/synthwave.webp";
import path from "path-browserify";
import { render } from "react-dom";

import { Fragment } from "react";

import { codeSpace } from "./ws";
import { hashCode } from "./session";
import { DraggableWindow } from "./DraggableWindow";
import type { FC } from "react";
import { appFactory } from "./starter";

globalThis.draggableWindow = globalThis.draggableWindow  || 1;
export const renderPreviewWindow = async (Editor: FC<{}>) => {
  if (!globalThis.draggableWindow++>1) return;
  console.log("renderPreviewWindow");

  const target = document.createElement("div");

  document.body.style.backgroundImage = `url(${path.join("/chunks/", bg)} )`;

  render(
    <Fragment>
      <Editor/>
      <DraggableWindow
        // onRestore={() => {
        //   const model = globalThis.model;
        //   model.setValue(mST().code);
        // }}
        hashCode={hashCode()}
        room={codeSpace}
      />
    </Fragment>,
    target,
  );

  document.body.append(target);
  if (document.getElementById("zbody")) {
    document.getElementById("zbody").append(globalThis.currentTarget);
  } else {
    console.log("NO ZBODY");
  }
};

/** @jsxImportSource @emotion/react */

import bg from "./assets/synthwave.webp";
import path from "path-browserify";
import { render } from "react-dom";

import { codeSpace } from "./ws";
import {hashCode} from "./session"
import { DraggableWindow } from "./DraggableWindow";
import type { FC } from "react";
import { appFactory } from "./starter";

export const renderPreviewWindow = async (Editor: FC<{}>) => {
  console.log("renderPreviewWindow");

  const target = document.createElement("div");

  document.body.style.backgroundImage = `url(${path.join("./chunks/", bg)} )`;

  render(
    <>
      <Editor></Editor>
      <DraggableWindow
        // onRestore={() => {
        //   const model = globalThis.model;
        //   model.setValue(mST().code);
        // }}
        hashCode={hashCode()}
        room={codeSpace}
      >
      </DraggableWindow>
    </>,
    target,
  );

  document.body.append(target);
  if (document.getElementById("zbody")) {
    document.getElementById("zbody").append(globalThis.currentTarget);
  } else {
    console.log("NO ZBODY");
  }
};

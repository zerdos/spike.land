/** @jsxImportSource @emotion/react */

import bg from "./assets/synthwave.webp";
import path from "path-browserify";
import { render } from "react-dom";

import { codeSpace, mySession } from "./ws";
import { DraggableWindow } from "./DraggableWindow";
import type { FC } from "react";

export const renderPreviewWindow = async (Editor: FC<{}>) => {
  console.log("renderPreviewWindow");

  const target = document.createElement("div");

  document.body.style.backgroundImage = `url(${path.join("./chunks/", bg)} )`;

  render(
    <>
      <Editor />
      <DraggableWindow
        // onRestore={() => {
        //   const model = globalThis.model;
        //   model.setValue(mST().code);
        // }}
        hashCode={mySession.hashCode()}
        room={codeSpace}
      />
    </>,
    target,
  );

  document.body.append(target);
  document.getElementById("zbody")?.append(globalThis.currentTarget);
};

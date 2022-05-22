/** @jsxImportSource @emotion/react */

import bg from "./assets/synthwave.webp";
import path from "path-browserify";
import { render } from "react-dom";

import { codeSpace, mySession } from "./ws";
import { DraggableWindow } from "./DraggableWindow";
import type {ReactNode} from "react"

export const renderPreviewWindow = async (Editor: ReactNode) => {
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
        room={codeSpace}
        hashCode={mySession.hashCode()}
      />
    </>,
    target,
  );

  document.body.append(target);
  document.getElementById("zbody")?.append(globalThis.currentTarget);
};

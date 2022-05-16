/** @jsxImportSource @emotion/react */

import bg from "./assets/synthwave.webp";
import path from "path-browserify";
import { render } from "react-dom";

import {  mySession, codeSpace } from "./ws";
import { DraggableWindow } from "./DraggableWindow";

export const renderPreviewWindow = async (Editor) => {
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
    /></>,
    target,
  );

  document.body.append(target);
  document.getElementById("zbody")?.append(globalThis.currentTarget);


};

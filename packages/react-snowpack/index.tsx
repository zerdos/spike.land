import React from "react";
import ReactDOM from "react-dom";
import * as monaco from "monaco-editor";
import {Test} from "./src/app"

const root = document.createElement("div");

ReactDOM.render(
  <Test />,
  root
);

document.body.appendChild(root);

monaco.editor.create(document.getElementById("container")!);

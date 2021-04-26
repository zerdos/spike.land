import React from "react";
import ReactDOM from "react-dom";
import * as monaco from "monaco-editor";
import {Test} from "./src/app"
import {openWindows} from "./src/openWindows"


openWindows();
ReactDOM.render(
  <Test />,
  document.getElementById("editor")
);


monaco.editor.create(document.getElementById("container")!);

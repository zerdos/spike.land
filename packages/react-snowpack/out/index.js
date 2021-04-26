import React from "./_snowpack/pkg/react.js";
import ReactDOM from "./_snowpack/pkg/react-dom.js";
import * as monaco from "./_snowpack/pkg/monaco-editor.js";
import {Test} from "./src/app.js";
import {openWindows} from "./src/openWindows.js";
openWindows();
ReactDOM.render(/* @__PURE__ */ React.createElement(Test, null), document.getElementById("editor"));
monaco.editor.create(document.getElementById("container"));

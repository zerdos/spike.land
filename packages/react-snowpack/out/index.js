import React from "./_snowpack/pkg/react.js";
import ReactDOM from "./_snowpack/pkg/react-dom.js";
import * as monaco from "./_snowpack/pkg/monaco-editor.js";
import {Test} from "./src/app.js";
const root = document.createElement("div");
ReactDOM.render(/* @__PURE__ */ React.createElement(Test, null), root);
document.body.appendChild(root);
monaco.editor.create(document.getElementById("container"));

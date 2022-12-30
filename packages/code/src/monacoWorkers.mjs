import editorWorkerUrl from "./monaco-workers/editor/editor.workerJs.js";
import cssWorkerUrl from "./monaco-workers/language/css/css.workerJs.js";
import htmlWorker from "./monaco-workers/language/html/html.workerJs.js";
import jsonWorkerUrl from "./monaco-workers/language/json/json.workerJs.js";
import tsWorkerUrl from "./monaco-workers/language/typescript/ts.workerJs.js";

export const getWorkerUrl = (_moduleId, label) => {
  if (label === "json") {
    return new URL(jsonWorkerUrl, location.origin).toString();
  }

  if (label === "css" || label === "scss" || label === "less") {
    return new URL(cssWorkerUrl, location.origin).toString();
  }

  if (label === "html" || label === "handlebars" || label === "razor") {
    return new URL(htmlWorker, location.origin).toString();
  }

  if (label === "typescript" || label === "javascript") {
    return new URL(tsWorkerUrl, location.origin).toString();
  }

  return new URL(editorWorkerUrl, location.origin).toString();
};

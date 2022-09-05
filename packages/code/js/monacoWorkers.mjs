import tsWorkerUrl from "./monaco-workers/language/typescript/ts.worker.workerJs";
import jsonWorkerUrl from "./monaco-workers/language/json/json.worker.workerJs";
import cssWorkerUrl from "./monaco-workers/language/css/css.worker.workerJs";
import htmlWorker from "./monaco-workers/language/html/html.worker.workerJs";
import editorWorkerUrl from "./monaco-workers/editor/editor.worker.workerJs";

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

export { editor, languages, Uri } from "monaco-editor";

window.MonacoEnvironment = {
  baseUrl: location.origin,
  getWorker: (_workerId: string, label: string) => {
    if (label === "json") {
      return new Worker(`/@/monaco-editor/esm/json.worker.js`);
    }
    if (label === "css") {
      return new Worker(`/@/monaco-editor/esm/css.worker.js`);
    }
    if (label === "html") {
      return new Worker(`/@/monaco-editor/esm/html.worker.js`);
    }
    if (label === "typescript" || label === "javascript") {
      return new Worker(`/@/monaco-editor/esm/ts.worker.js`);
    }
    return new Worker(`/@/monaco-editor/esm/editor.worker.js`);
  },
};

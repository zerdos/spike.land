export { editor, languages, Uri } from "monaco-editor";

window.MonacoEnvironment = {
  baseUrl: location.origin,
  getWorkerUrl: (_moduleId: string, label: string) => {
    if (label === "html") {
      return `/@/monaco-editor/esm/html.worker.js`;
    }
    if (label === "json") {
      return `/@/monaco-editor/esm/json.worker.js`;
    }
    if (label === "css") {
      return `/@/monaco-editor/esm/css.worker.js`;
    }
    if (label === "typescript" || label === "javascript") {
      return `/@/monaco-editor/esm/ts.worker.js`;
    }
    return `/@/monaco-editor/esm/editor.worker.js`;
  },
};

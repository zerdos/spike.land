export { editor, languages, Uri } from "monaco-editor";

const workerPool: Record<string, Worker> = {};

window.MonacoEnvironment = {
  baseUrl: location.origin,

  getWorker: (_workerId: string, label: string) => {
    if (label === "json") {
      workerPool[label] = workerPool[label] || new Worker(`/@/monaco-editor/esm/json.worker.js`);
    }
    if (label === "css") {
      workerPool[label] = workerPool[label] || new Worker(`/@/monaco-editor/esm/css.worker.js`);
    }
    if (label === "html") {
      workerPool[label] = workerPool[label] || new Worker(`/@/monaco-editor/esm/html.worker.js`);
    }
    if (label === "typescript" || label === "javascript") {
      workerPool[label] = workerPool[label] || new Worker(`/@/monaco-editor/esm/ts.worker.js`);
    }
    workerPool[label] = workerPool[label] || new Worker(`/@/monaco-editor/esm/editor.worker.js`);
    return workerPool[label];
  },
};

export { editor, languages, Uri } from "monaco-editor";

const workerPool: Record<string, Worker> = {};

const baseUrl = document.head.baseURI;
window.MonacoEnvironment = {
  baseUrl,

  getWorker: (_workerId: string, label: string) => {
    if (label === "json") {
      workerPool[label] = workerPool[label] || new Worker(baseUrl + `@/monaco-editor/esm/json.worker.js`);
    }
    if (label === "css") {
      workerPool[label] = workerPool[label] || new Worker(baseUrl + `@/monaco-editor/esm/css.worker.js`);
    }
    if (label === "html") {
      workerPool[label] = workerPool[label] || new Worker(baseUrl + `@/monaco-editor/esm/html.worker.js`);
    }
    if (label === "typescript" || label === "javascript") {
      workerPool[label] = workerPool[label] || new Worker(baseUrl + `@/monaco-editor/esm/ts.worker.js`);
    }
    workerPool[label] = workerPool[label] || new Worker(baseUrl + `@/monaco-editor/esm/editor.worker.js`);
    return workerPool[label];
  },
};

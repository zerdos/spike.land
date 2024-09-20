export { editor, languages, Uri } from "monaco-editor";

const baseUrl = document.head.baseURI;
const workerPool: Record<string, null | Worker> = {};
const getWorker = (_workerId: string, label: string, justRefill = false) => {
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

  if (justRefill) {
    return workerPool[label];
  }

  const returnWorker = workerPool[label];
  workerPool[label] = null;
  workerPool[label] = getWorker(label, label, true);
  // ref

  return returnWorker;
};

window.MonacoEnvironment = {
  baseUrl,

  getWorker,
};

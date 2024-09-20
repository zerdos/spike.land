export { editor, languages, Uri } from "monaco-editor";

const baseUrl = document.head.baseURI;
// const workerPool: Record<string, unknown> = {};

// class TsWorker extends Worker {
//   constructor() {
//     super(baseUrl + `@/monaco-editor/esm/ts.worker.js`);
//   }
// }
// class CssWorker extends Worker {
//   constructor() {
//     super(baseUrl + `@/monaco-editor/esm/css.worker.js`);
//   }
// }
// class HtmlWorker extends Worker {
//   constructor() {
//     super(baseUrl + `@/monaco-editor/esm/html.worker.js`);
//   }
// }
// class JsonWorker extends Worker {
//   constructor() {
//     super(baseUrl + `@/monaco-editor/esm/json.worker.js`);
//   }
// }
// class EditorWorker extends Worker {
//   constructor() {
//     super(baseUrl + `@/monaco-editor/esm/editor.worker.js`);
//   }
// }

// const getWorker = (_workerId: string, label: string) => {
//   if (label === "json") {
//     workerPool[label] = workerPool[label] || JsonWorker;
//   }
//   if (label === "css") {
//     workerPool[label] = workerPool[label] || CssWorker;
//   }
//   if (label === "html") {
//     workerPool[label] = workerPool[label] || HtmlWorker;
//   }
//   if (label === "typescript" || label === "javascript") {
//     workerPool[label] = workerPool[label] || TsWorker;
//   }
//   workerPool[label] = workerPool[label] || EditorWorker;

//   return workerPool[label] as Worker;
// };

window.MonacoEnvironment = {
  baseUrl,

  getWorkerUrl: (_moduleId: string, _label: string) => {
    if (_label === "typescript" || _label === "javascript") {
      return baseUrl + `@/monaco-editor/esm/ts.worker.js`;
    }
    if (_label === "json") {
      return baseUrl + `@/monaco-editor/esm/json.worker.js`;
    }
    if (_label === "css") {
      return baseUrl + `@/monaco-editor/esm/css.worker.js`;
    }
    if (_label === "html") {
      return baseUrl + `@/monaco-editor/esm/html.worker.js`;
    }
    return baseUrl + `@/monaco-editor/esm/editor.worker.js`;
  },
};

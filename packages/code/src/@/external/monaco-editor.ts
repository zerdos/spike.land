// export { editor, languages, Uri } from "monaco-editor";
// const workerPool: Record<string, unknown> = {};

// class TsWorker extends Worker {
//   constructor() {
//     super(baseUrl + `@/workers/monaco/ts.worker.js`);
//   }
// }
// class CssWorker extends Worker {
//   constructor() {
//     super(baseUrl + `@/workers/monaco/css.worker.js`);
//   }
// }
// class HtmlWorker extends Worker {
//   constructor() {
//     super(baseUrl + `@/workers/monaco/html.worker.js`);
//   }
// }
// class JsonWorker extends Worker {
//   constructor() {
//     super(baseUrl + `@/workers/monaco/json.worker.js`);
//   }
// }
// class EditorWorker extends Worker {
//   constructor() {
//     super(baseUrl + `@/workers/monaco/editor.worker.js`);
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

// const baseUrl = "/";

// const MonacoEnvironment = {
//   baseUrl,

//   getWorkerUrl: (_moduleId: string, _label: string) => {
//     if (_label === "typescript" || _label === "javascript") {
//       return baseUrl + `@/workers/monaco/ts.worker.js`;
//     }
//     if (_label === "json") {
//       return baseUrl + `@/workers/monaco/json.worker.js`;
//     }
//     if (_label === "css") {
//       return baseUrl + `@/workers/monaco/css.worker.js`;
//     }
//     if (_label === "html") {
//       return baseUrl + `@/workers/monaco/html.worker.js`;
//     }
//     return baseUrl + `@/workers/monaco/editor.worker.js`;
//   },
// };

// Object.assign(window, { MonacoEnvironment });
// Object.assign(globalThis, { MonacoEnvironment });

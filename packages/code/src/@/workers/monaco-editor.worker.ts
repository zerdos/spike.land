export { editor, languages, Range, Uri, typescript } from "monaco-editor";
export { version } from "monaco-editor/package.json";
const baseUrl = "/";

const MonacoEnvironment = {
  baseUrl,

  getWorkerUrl: (_moduleId: string, _label: string) => {
    if (_label === "typescript" || _label === "javascript") {
      return baseUrl + `@/workers/monaco/ts.worker.js`;
    }
    if (_label === "json") {
      return baseUrl + `@/workers/monaco/json.worker.js`;
    }
    if (_label === "css") {
      return baseUrl + `@/workers/monaco/css.worker.js`;
    }
    if (_label === "html") {
      return baseUrl + `@/workers/monaco/html.worker.js`;
    }
    return baseUrl + `@/workers/monaco/editor.worker.js`;
  },
};

Object.assign(globalThis, { MonacoEnvironment });

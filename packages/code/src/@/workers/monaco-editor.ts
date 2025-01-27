import { editor, languages, Uri } from "monaco-editor";

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

Object.assign(window, { MonacoEnvironment });
Object.assign(globalThis, { MonacoEnvironment, editor, languages, Uri });

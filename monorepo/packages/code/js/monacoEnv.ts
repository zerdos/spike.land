import tsWorkerUrl from "./dist/workers/monaco-editor/esm/vs/language/typescript/ts.worker.js";
import editorWorkerUrl from "./dist/workers/monaco-editor/esm/vs/editor/editor.worker.js";

export const init = () => {
  self.MonacoEnvironment = {
    getWorkerUrl: function (moduleId: string, label: string) {
      // if (label === "json") {
      //   return "./vendor/language/json/json.worker.js";
      // }
      // if (label === "css" || label === "scss" || label === "less") {
      //   return "./vendor/language/css/css.worker.js";
      // }
      // if (label === "html" || label === "handlebars" || label === "razor") {
      // return "./vendor/vendor/language/html/html.worker.js";
      // }

      if (label === "typescript" || label === "javascript") {
        return tsWorkerUrl;
      }

      return editorWorkerUrl;
    },
  };
};

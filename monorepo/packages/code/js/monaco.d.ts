import type * as monaco from "monaco-editor";

declare global {
  // let MonacoEnvironment: monaco.Environment;
  var editor: ReturnType<typeof monaco.editor.create>;
  var model: monaco.editor.IModel;
}

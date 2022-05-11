import * as monaco from "monaco-editor";
import type { FC } from "react";

declare global {
  // let MonacoEnvironment: monaco.Environment;
  var editor: ReturnType<typeof monaco.editor.create>;
  var model: monaco.editor.IModel;
  var App: FC;
  var appFactory: (transpiled: string)=> void;
  var transpiled: string;
  var notify: ()=> void;

}

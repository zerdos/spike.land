import { basicSetup, EditorState, EditorView } from "@codemirror/basic-setup";
import { javascript } from "@codemirror/lang-javascript";

export const startCodeMirror = (doc: string) => {
  console.log({ doc });
  let state = EditorState.create({
    doc,
    extensions: [
      basicSetup,
      javascript(),
    ],
  });
  (window as any).view = new EditorView({
    state,
    parent: document.querySelector("#monacoEditor")!,
  });
};

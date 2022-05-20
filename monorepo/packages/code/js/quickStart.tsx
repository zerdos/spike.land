import { codeSpace, mST } from "./ws";

import { isMobile } from "./isMobile.mjs";
import { AceEditor } from "./AceEditor";

async function startAceWithSession() {
  const aceDom = document.createElement("pre");
  aceDom.id = "editor";
  document.body.appendChild(aceDom);

  const { startAce } = await import("./ace");
  const { runnerDebounced } = await import("./runner");

  startAce(mST().code, (newCode) => {
    runnerDebounced(
      newCode,
      mST().i + 1,
    );
  });
}

async function startMonacoWithSession() {
  console.log("start monaco with session");
  const monacoEditorDom = document.createElement("div");
  monacoEditorDom.id = "monacoEditor";
  document.body.appendChild(monacoEditorDom);

  const { startMonaco } = await import("./editor");

  const { editor, monaco } = await startMonaco(
    /**
     * @param {any} code
     */
    {
      container: monacoEditorDom,
      name: codeSpace,
      code: mST().code,
    },
  );

  const model = editor.getModel();

  // Object.assign(session, { monaco, editor, model });

  // let inc = 0;

  const { runnerDebounced } = await import("./runner");
  editor.onDidChangeModelContent(() =>
    runnerDebounced(
      model!.getValue(),
      // ev.changes,
      mST().i + 1,
    )
  );

  Object.assign(globalThis, { monaco, editor, model });

  // monaco.languages.registerOnTypeFormattingEditProvider("typescript", {
  //   autoFormatTriggerCharacters: ["}", "{", ")", "(", ";"],

  //   async provideOnTypeFormattingEdits(model) {
  //     const text = await formatter(model.getValue());

  //     return [
  //       {
  //         range: model.getFullModelRange(),

  //         text,
  //       },
  //     ];
  //   },
  // });
}

// async function startCMirror() {
//   console.log("start monaco with session");
//   const monacoEditorDom = document.createElement("div");
//   monacoEditorDom.id = "monacoEditor";
//   document.body.appendChild(monacoEditorDom);

//   const { startCodeMirror } = await import("./codeMirror");

//    startCodeMirror(
//     mST().code
//   );

//   // Object.assign(session, { monaco, editor, model });

//   // let inc = 0;

//   // monaco.languages.registerOnTypeFormattingEditProvider("typescript", {
//   //   autoFormatTriggerCharacters: ["}", "{", ")", "(", ";"],

//   //   async provideOnTypeFormattingEdits(model) {
//   //     const text = await formatter(model.getValue());

//   //     return [
//   //       {
//   //         range: model.getFullModelRange(),

//   //         text,
//   //       },
//   //     ];
//   //   },
//   // });
// }
// async function getErrors({ monaco, editor, model }) {
//   if (!monaco) {
//     return [{ messageText: "Error with the error checking. Try to reload!" }];
//   }

//   const worker = await monaco.languages.typescript.getTypeScriptWorker();
//   const client = await worker(model);

//   const filename = model.uri.toString();
//   const diag = client.getSemanticDiagnostics(filename);
//   const comp = client.getCompilerOptionsDiagnostics(filename);
//   const syntax = client.getSyntacticDiagnostics(filename);
//   const fastError = await Promise.race([diag, comp, syntax]);

//   // Model.dispose();
//   console.log(fastError);
//   return [];
// }

// Let getHtmlAndCss;

export async function quickStart() {
  const { renderPreviewWindow } = await import(
    "./renderPreviewWindow"
  );

  const EditorNode = await isMobile()
    ? (await import("./AceEditor")).AceEditor
    : (await import("./MonacoEditor")).MonacoEditor;
  // const Editor = ()=>EditorNode;

  await renderPreviewWindow(EditorNode);
}

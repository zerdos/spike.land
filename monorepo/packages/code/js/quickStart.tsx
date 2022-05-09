/** @jsxImportSource @emotion/react */
import type { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { render } from "react-dom";
import { renderFromString } from "./renderToString";
import debounce from "lodash/debounce";
import { mST, roomName, saveCode } from "./ws";
import throttle  from "lodash/throttle";



export interface IRunnerSession {
  // changes: unknown[];
  errorText: string;
  child: Dispatch<SetStateAction<ReactNode[]>>;
  url: string;
}

let debounceTime = 100;

let runnerDebounced =  throttle(runner, debounceTime);

async function startMonacoWithSession(session: IRunnerSession) {
  console.log("start monaco with session");
  const monacoEditorDom = document.querySelector("#monacoEditor");
  if (!monacoEditorDom) {
    console.log("no monaco dom, exiting");
    return;
  }

  const { startMonaco } = await import("./editor");

  const { editor, monaco } = await startMonaco(
    /**
     * @param {any} code
     */
    {
      container: monacoEditorDom,
      name: roomName,
      code: mST().code,
    },
  );

  const model = editor.getModel();

  Object.assign(session, { monaco, editor, model });

  let inc = 0;

  const { prettier } = await import("./prettierEsm");

  editor.onDidChangeModelContent( ev => runnerDebounced(
    prettier(model.getValue()),
      // ev.changes,
      mST(),
      mST().i + 1
    )  );

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

async function getErrors({ monaco, editor, model }) {

  

  if (!monaco) {
    return [{ messageText: "Error with the error checking. Try to reload!" }];
  }

  const worker = await monaco.languages.typescript.getTypeScriptWorker();
  const client = await worker(model);

  const filename = model.uri.toString();
  const diag = client.getSemanticDiagnostics(filename);
  const comp = client.getCompilerOptionsDiagnostics(filename);
  const syntax = client.getSyntacticDiagnostics(filename);
  const fastError = await Promise.race([diag, comp, syntax]);

  // Model.dispose();
  console.log(fastError);
  return [];
}

// Let getHtmlAndCss;
const r = { counter: 0 };

async function runner(
  code,
  // changes: unknown[],
  session: IRunnerSession,
  counter: number,
) {
  
  if (code === mST().code) return;

  const latest = ++r.counter;
  // session.changes.push(changes);

  // esbuildEsmTransform = esbuildEsmTransform ||
  //   (await import("./esbuildEsm.ts")).transform;
  const { init } = await import("./esbuildEsm");
  const transform = await init();




  try {
    const transpiled = await transform(code);
    if (transpiled === mST().transpiled) return;

    let restartError = false;
    /// yellow
    if (transpiled.length > 0) {
      if (latest < r.counter) return;
  
      try {
        const { html, css} = await renderFromString(transpiled);


        await saveCode({
          code,
          transpiled,
          i: counter,
          html,
          css,
        })



        return;
      } catch (error) {
        console.error("EXCEPTION");
        console.error(error);
        restartError = true;
        console.error({ restartError });
      }
    }
  } catch (error) {
    console.error({ error });
  }
}

export async function quickStart(
  session: IRunnerSession,
) {
  const { renderPreviewWindow } = await import(
    "./renderPreviewWindow"
  );

  await renderPreviewWindow(session);

  await startMonacoWithSession(session);
}

/** @jsxImportSource @emotion/react */
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { render } from "react-dom";

import { renderFromString } from "./renderToString";
import debounce from "lodash/debounce";
import { mST } from "./ws";

export interface IRunnerSession {
  changes: unknown[];
  errorText: string;
  child: Dispatch<SetStateAction<ReactNode[]>>;
  url: string;
}

let debounceTime = 0;

let runnerDebounced = debounce(runner, debounceTime);

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
      code: mST().code,
    },
  );

  const model = editor.getModel();

  Object.assign(session, {monaco, editor, model});

  let inc = 0;

  editor.onDidChangeModelContent((ev) =>
    runnerDebounced(
      model.getValue() as string,
      ev.changes,
      session,
      mST().i + ++inc,
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

async function getErrors({ monaco, editor }) {
  if (!monaco) {
    return [{ messageText: "Error with the error checking. Try to reload!" }];
  }

  console.log("GET ERRORs");
  const model = editor.getModel();
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
const r = {counter:0};

async function runner(
  c: string,
  changes: unknown[],
  session: IRunnerSession,
  counter: number,
) {
  const latest =++r.counter;
  session.changes.push(changes);

  // esbuildEsmTransform = esbuildEsmTransform ||
  //   (await import("./esbuildEsm.ts")).transform;
  const {  init } = await import("./esbuildEsm");
  const { prettier } = await import("./prettierEsm");
  const transform = await init();

  try {
    if (latest < r.counter) {
      runnerDebounced = debounce(runner, ++debounceTime);
      return;
    }
    const code = prettier(c);
    const transpiled = await transform(code);

    let restartError = false;
    /// yellow
    if (transpiled.length > 0) {
      if (latest < r.counter) return;
      const { html, css, App } = await renderFromString(transpiled);

      try {
        console.log("---------error check");
        const error = await getErrors(session);
        console.log({error});
        console.log("---------error check");

        if (latest < r.counter) {
          runnerDebounced = debounce(runner, ++debounceTime);
          return;
        }



        const newSess = {
          code,
          transpiled,
          i: counter,
          html,
          css,
        };

        // Session.html = zbody.innerHTML;

        const target = document.createElement("div");

        render(<App />, target);
        if (!target.innerHTML) return;

       
        if (transpiled === mST().transpiled) return;

        const { saveCode } = await import("./ws");
        if (latest === r.counter) await saveCode(newSess);
        session.setChild((c: ReactNode[]) => [...c, <App />]);

        globalThis.App = App;


        return;
      } catch (error) {
        console.error("EXCEPTION");
        console.error(error);
        restartError = true;
        console.error({ restartError });
      }
    }

    if (mST().i > counter) {
      return;
    } else if (debounceTime > 0) {
      runnerDebounced = debounce(runner, --debounceTime);
    } 
    
    if (restartError) {
      error.push(
        { messageText: "Error while starting the app. Check the console!" },
      );
    }

    if (error.length > 0) {
      console.log({ err: error });
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

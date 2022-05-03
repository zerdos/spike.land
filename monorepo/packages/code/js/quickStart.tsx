/** @jsxImportSource @emotion/react */
import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { ICodeSession } from "./session";

export interface IRunnerSession extends ICodeSession {
  changes: unknown[];
  errorText: string;
  setChild: Dispatch<SetStateAction<ReactNode[]>>;
  url: string;
}

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
      code: session.code,
    },
  );

  const model = editor.getModel();

  editor.onDidChangeModelContent((ev) =>
    runner(
      editor?.getModel()?.getValue() as string,
      ev.changes,
      session,
      ++session.i,
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

async function runner(
  c: string,
  changes: unknown[],
  session: IRunnerSession,
  counter: number,
) {
  // session.changes.push(changes);
  const { babelTransform } = await import("./babelEsm");

  // esbuildEsmTransform = esbuildEsmTransform ||
  //   (await import("./esbuildEsm.ts")).transform;

  const transform = babelTransform;

  try {
    const { prettier } = await import("./prettierEsm");
    const code = prettier(c);

    const transpiled = await transform(c);

    const App = await getApp(transpiled);
    const { getHtmlAndCss } = await import("./renderToString");
    const { html, css } = getHtmlAndCss(App);

    let restartError = false;
    /// yellow
    if (transpiled.length > 0) {
      try {
        if (counter < session.i) {
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

        session.setChild((c: ReactNode[]) => [...c, <App />]);

        globalThis.App = App;
        restartError = !html;
        // GetCss = getCss || (await import("./templates.ts")).getCss;
        // setTimeout(async () => {
        //     session.html = document.getElementById("zbody").innerHTML;
        // const css = getCss(session);

        const { saveCode } = await import("./ws");

        saveCode(newSess);
        // }, 10);
        return;
      } catch (error) {
        console.error("EXCEPTION");
        console.error(error);
        restartError = true;
        console.error({ restartError });
      }
    }

    if (session.i > counter) {
      return;
    }

    const error = await getErrors(session);
    if (session.i > counter) {
      return;
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

// export const startFromCode = async ({ code }) => {
//   const session = {
//     code,
//     i: 0,
//     transpiled: "",
//     html: "",
//     changes: [],
//     setChild: () => null,
//   };
//   await runner(code, null, session, session.i);
//   await quickStart(session, false);
// };

export async function quickStart(
  session: IRunnerSession,
  keepFullScreen: boolean,
) {
  // Session.children = await getReactChild(session.transpiled);
  // session.children = null;
  const { renderPreviewWindow } = await import(
    "./renderPreviewWindow"
  );

  await renderPreviewWindow(session, keepFullScreen);

  if (!keepFullScreen) {
    await startMonacoWithSession(session);
  }
}

async function getReactChild(transpiled: string, mode = "window") {
  const codeToHydrate = mode === "window"
    ? transpiled.replace("body{", "#zbody{")
    : transpiled;

  const objectUrl = createJsBlob(
    codeToHydrate,
  );

  const { default: App } = (await import(objectUrl));
  URL.revokeObjectURL(objectUrl);

  return App;
}

// Function createPatch(oldCode, newCode, createDelta) {
//   return JSON.stringify(createDelta(oldCode, newCode));
// }

/**
 * @param {BlobPart} code
 */
function createJsBlob(code: string) {
  const blob = new Blob([code], { type: "application/javascript" });

  return URL.createObjectURL(blob);
}

async function getApp(transpiled: string, mode = "window") {
  const codeToHydrate = mode === "window"
    ? transpiled.replace("body{", "#zbody{")
    : transpiled;

  const objectUrl = createJsBlob(
    codeToHydrate,
  );

  const App = (await import(objectUrl)).default;

  URL.revokeObjectURL(objectUrl);

  return App;
}

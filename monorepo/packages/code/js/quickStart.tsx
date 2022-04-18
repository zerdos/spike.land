import { jsx } from "@emotion/react";
import { ICodeSession } from "./session";

export const initSession = (await import("./session")).default;

export const prettier = (await import("./prettierEsm")).formatter;

// //

export async function startMonacoWithSession(session) {
  console.log("start monaco with session");
  const monacoEditorDom = document.querySelector("#monacoEditor");

  const { startMonaco } = await import("./editor");

  const onchangeCode = (ev) =>
    runner(editor.getModel().getValue(), ev.changes, session, ++session.i);
  const { editor, monaco } = await startMonaco(
    /**
     * @param {any} code
     */
    {
      language: "typescript",
      container: monacoEditorDom,
      code: session.code,
      /**
       * @param {string} code
       */
    },
  );
  editor.onDidChangeModelContent(onchangeCode);

  Object.assign(window, { monaco });
  session.editor = editor;

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

  window.sess = session;
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

async function runner(c, changes = null, session, counter) {
  session.changes.push(changes);
  const { babelTransform } = await import("./babelEsm");

  // esbuildEsmTransform = esbuildEsmTransform ||
  //   (await import("./esbuildEsm.ts")).transform;

  const transform = babelTransform;

  session.errorText = "";

  try {
    const cd = await prettier(c);

    const transpiled = await transform(cd);

    let restartError = false;
    /// yellow
    if (transpiled.length > 0) {
      if (counter < session.i) {
        return;
      }

      try {
        const { getHtmlAndCss } = await import("./renderToString");

        if (counter < session.i) {
          return;
        }

        const App = await getApp(transpiled);
        const { html, css } = getHtmlAndCss(App);

        session.transpiled = transpiled;
        session.html = html;

        const children = await getReactChild(transpiled);

        // Session.html = zbody.innerHTML;

        session.setChild((c) => [...c, children]);
        ``;
        globalThis.App = children;
        session.children = children;
        restartError = !html;
        session.code = cd;
        session.codeNonFormatted = c;
        // GetCss = getCss || (await import("./templates.ts")).getCss;
        // setTimeout(async () => {
        //     session.html = document.getElementById("zbody").innerHTML;
        // const css = getCss(session);
        const code = cd;
        session.css = css;
        if (session.i !== counter) {
          return;
        }

        const { saveCode } = await import("./ws");

        saveCode({ transpiled, code, i: counter, css, html });
        // }, 10);
        return;
      } catch (error) {
        console.error("EXCEPTION");
        console.log({ e: error });
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
  } catch ({ error }) {
    session.errorText = error;
    console.error({ error });
  }
}

export const startFromCode = async ({ code }) => {
  const session = {
    code,
    i: 0,
    changes: [],
    setChild: () => {},
  };
  await runner(code, null, session);
  await quickStart(session);
};

export async function quickStart(
  session: ICodeSession,
  room: string,
  keepFullScreen: boolean,
) {
  // Session.children = await getReactChild(session.transpiled);
  // session.children = null;
  const { renderPreviewWindow } = await import(
    "./renderPreviewWindow"
  );

  await renderPreviewWindow(session, room, keepFullScreen);

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

  const mod = (await import(objectUrl));
  URL.revokeObjectURL(objectUrl);

  return jsx(mod.default);
}

// Function createPatch(oldCode, newCode, createDelta) {
//   return JSON.stringify(createDelta(oldCode, newCode));
// }

/**
 * @param {BlobPart} code
 */
function createJsBlob(code) {
  const blob = new Blob([code], { type: "application/javascript" });

  return URL.createObjectURL(blob);
}

async function getApp(transpiled, mode = "window") {
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

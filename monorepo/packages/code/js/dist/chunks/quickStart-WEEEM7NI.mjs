import "./chunk-BZTAI3VG.mjs";

// js/quickStart.tsx
import { jsx } from "https://spike.land/dist/emotion.mjs";
var initSession = (await import("./session-UY3XTFH6.mjs")).default;
async function startMonacoWithSession(session) {
  console.log("start monaco with session");
  const monacoEditorDom = document.querySelector("#monacoEditor");
  const { startMonaco } = await import("./editor-525ILQXD.mjs");
  const onchangeCode = (ev) => runner(editor.getModel().getValue(), ev.changes, session, ++session.i);
  const { editor, monaco } = await startMonaco({
    language: "typescript",
    container: monacoEditorDom,
    code: session.code
  });
  editor.onDidChangeModelContent(onchangeCode);
  Object.assign(window, { monaco });
  session.editor = editor;
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
  console.log(fastError);
  return [];
}
async function runner(c, changes, session, counter) {
  session.changes.push(changes);
  const { babelTransform } = await import("./babelEsm-UINZG35V.mjs");
  const transform = babelTransform;
  session.errorText = "";
  try {
    const { prettier } = await import("./prettierEsm-W5YOAKVW.mjs");
    const cd = prettier(c);
    const transpiled = await transform(cd);
    let restartError = false;
    if (transpiled.length > 0) {
      if (counter < session.i) {
        return;
      }
      try {
        const { getHtmlAndCss } = await import("./renderToString-LBNS3W66.mjs");
        if (counter < session.i) {
          return;
        }
        const App = await getApp(transpiled);
        const { html, css } = getHtmlAndCss(App);
        session.transpiled = transpiled;
        session.html = html;
        const children = await getReactChild(transpiled);
        session.setChild((c2) => [...c2, children]);
        ``;
        globalThis.App = children;
        session.children = children;
        restartError = !html;
        session.code = cd;
        session.codeNonFormatted = c;
        const code = cd;
        session.css = css;
        if (session.i !== counter) {
          return;
        }
        const { saveCode } = await import("./ws-QTEDNUHF.mjs");
        saveCode({ transpiled, code, i: counter, css, html });
        return;
      } catch (error2) {
        console.error("EXCEPTION");
        console.log({ e: error2 });
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
      error.push({ messageText: "Error while starting the app. Check the console!" });
    }
    if (error.length > 0) {
      console.log({ err: error });
    }
  } catch ({ error }) {
    session.errorText = error;
    console.error({ error });
  }
}
var startFromCode = async ({ code }) => {
  const session = {
    code,
    i: 0,
    changes: [],
    setChild: () => {
    }
  };
  await runner(code, null, session);
  await quickStart(session);
};
async function quickStart(session, room, keepFullScreen) {
  const { renderPreviewWindow } = await import("./renderPreviewWindow-QOWICLJD.mjs");
  await renderPreviewWindow(session, room, keepFullScreen);
  if (!keepFullScreen) {
    await startMonacoWithSession(session);
  }
}
async function getReactChild(transpiled, mode = "window") {
  const codeToHydrate = mode === "window" ? transpiled.replace("body{", "#zbody{") : transpiled;
  const objectUrl = createJsBlob(codeToHydrate);
  const mod = await import(objectUrl);
  URL.revokeObjectURL(objectUrl);
  return jsx(mod.default);
}
function createJsBlob(code) {
  const blob = new Blob([code], { type: "application/javascript" });
  return URL.createObjectURL(blob);
}
async function getApp(transpiled, mode = "window") {
  const codeToHydrate = mode === "window" ? transpiled.replace("body{", "#zbody{") : transpiled;
  const objectUrl = createJsBlob(codeToHydrate);
  const App = (await import(objectUrl)).default;
  URL.revokeObjectURL(objectUrl);
  return App;
}
export {
  initSession,
  quickStart,
  startFromCode
};

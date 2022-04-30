import "./chunk-BZTAI3VG.mjs";

// js/quickStart.tsx
async function startMonacoWithSession(session) {
  console.log("start monaco with session");
  const monacoEditorDom = document.querySelector("#monacoEditor");
  if (!monacoEditorDom) {
    console.log("no monaco dom, exiting");
    return;
  }
  const { startMonaco } = await import("./editor-GFKSOZDU.mjs");
  const { editor, monaco } = await startMonaco({
    container: monacoEditorDom,
    code: session.code
  });
  const model = editor.getModel();
  editor.onDidChangeModelContent((ev) => runner(editor?.getModel()?.getValue(), ev.changes, session, ++session.i));
  Object.assign(globalThis, { monaco, editor, model });
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
  const { babelTransform } = await import("./babelEsm-H5W7NHR4.mjs");
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
        const { getHtmlAndCss } = await import("./renderToString-6GRA3RC2.mjs");
        if (counter < session.i) {
          return;
        }
        const App = await getApp(transpiled);
        const { html, css } = getHtmlAndCss(App);
        session.transpiled = transpiled;
        session.html = html;
        const children = await getReactChild(transpiled);
        session.setChild((c2) => [...c2, children]);
        globalThis.App = children;
        restartError = !html;
        session.code = cd;
        const code = cd;
        session.css = css;
        if (session.i !== counter) {
          return;
        }
        const { saveCode } = await import("./ws-RAG6W5PN.mjs");
        saveCode({ transpiled, code, i: counter, css, html });
        return;
      } catch (error2) {
        console.error("EXCEPTION");
        console.error(error2);
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
  } catch (error) {
    console.error({ error });
  }
}
async function quickStart(session, keepFullScreen) {
  const { renderPreviewWindow } = await import("./renderPreviewWindow-YYJEJUUJ.mjs");
  await renderPreviewWindow(session, room, keepFullScreen);
  if (!keepFullScreen) {
    await startMonacoWithSession(session);
  }
}
async function getReactChild(transpiled, mode = "window") {
  const codeToHydrate = mode === "window" ? transpiled.replace("body{", "#zbody{") : transpiled;
  const objectUrl = createJsBlob(codeToHydrate);
  const { default: App } = await import(objectUrl);
  URL.revokeObjectURL(objectUrl);
  return App;
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
  quickStart
};

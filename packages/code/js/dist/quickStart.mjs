// js/quickStart.mjs
import { jsx } from "https://unpkg.com/@spike.land/esm@0.4.33/dist/emotion-react.mjs";
var formatter;
var transform;
var esbuildEsmTransform;
var getHtmlAndCss;
var initSess;
var initSession = async (room, initData) => {
  initSess = initSess || (await import("./session-2W424DEX.mjs")).default;
  return initSess(room, initData);
};
var prettier = async (code) => {
  formatter = formatter || (await import("./formatter-KE3TOZTF.mjs")).formatter;
  return await formatter(code);
};
async function startMonacoWithSession(session) {
  const shadDom = document.getElementById("shadowEditor");
  const startMonaco = (await import("./startMonaco-ABNCIZVG.mjs")).default;
  const getEditor = await startMonaco({
    language: "typescript",
    container: shadDom,
    code: session.code,
    onChange: (code, changes) => runner(code, changes, session, ++session.i)
  });
  session.editor = getEditor();
  const monaco = window.monaco;
  monaco.languages.registerOnTypeFormattingEditProvider("typescript", {
    autoFormatTriggerCharacters: ["}", "{", ")", "(", ";"],
    async provideOnTypeFormattingEdits(model) {
      const text = await formatter(model.getValue());
      return [
        {
          range: model.getFullModelRange(),
          text
        }
      ];
    }
  });
  window.sess = session;
  session.monaco = window.monaco;
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
async function runner(c, changes = null, session, counter) {
  session.changes.push(changes);
  formatter = formatter || (await import("./formatter-KE3TOZTF.mjs")).formatter;
  esbuildEsmTransform = esbuildEsmTransform || (await import("./esbuildEsm-4D6OF3CL.mjs")).transform;
  transform = esbuildEsmTransform;
  session.errorText = "";
  const { monaco } = session;
  try {
    const cd = await formatter(c);
    const transpiled = await transform(cd);
    let restartError = false;
    if (transpiled.length) {
      if (counter < session.i)
        return;
      try {
        getHtmlAndCss = getHtmlAndCss || (await import("./renderToString-YDN3DAT3.mjs")).getHtmlAndCss;
        if (counter < session.i)
          return;
        const App = await getApp(transpiled);
        const { html, css } = getHtmlAndCss(App);
        session.transpiled = transpiled;
        session.html = html;
        const children = await getReactChild(transpiled);
        session.setChild((c2) => [...c2, children]);
        session.children = children;
        restartError = !html;
        session.code = cd;
        session.codeNonFormatted = c;
        const code = cd;
        session.css = css;
        if (session.i !== counter)
          return;
        session.saveCode && await session.saveCode({ transpiled, code, i: counter, css, html });
        monaco.editor.setTheme("vs-dark");
        return;
      } catch (e) {
        console.error("EXCEPTION");
        console.log({ e });
        restartError = true;
        console.error({ restartError });
      }
    }
    if (session.i > counter)
      return;
    const err = await getErrors(session);
    if (session.i > counter)
      return;
    if (restartError) {
      err.push({ messageText: "Error while starting the app. Check the console!" });
    }
    if (err.length)
      console.log({ err });
    monaco.editor.setTheme("vs-dark");
  } catch (err) {
    monaco.editor.setTheme("vs-light");
    setTimeout(() => {
      monaco.editor.setTheme("hc-black");
    }, 50);
    session.errorText = err.message;
    console.error(err.message);
  }
}
var startFromCode = async ({ code }) => {
  let session = {
    code,
    i: 0,
    changes: [],
    saveCode: () => {
    },
    setChild: () => {
    }
  };
  await runner(code, null, session);
  await quickStart(session);
};
async function quickStart(session, room, keepFullScreen, saveCode) {
  session.saveCode = saveCode;
  session.children = null;
  const { renderPreviewWindow } = await import("./renderPreviewWindow-QH3LNHT3.mjs");
  await renderPreviewWindow(session, room, keepFullScreen);
  if (!keepFullScreen)
    await startMonacoWithSession(session);
  session.update = (c) => runner(c, null, session);
  runner(session.code, null, session, -1);
}
async function getReactChild(transpiled, mode = "window") {
  const codeToHydrate = mode === "window" ? transpiled.replace("body{", "#zbody{") : transpiled;
  const objUrl = createJsBlob(codeToHydrate);
  const mod = await import(objUrl);
  URL.revokeObjectURL(objUrl);
  return jsx(mod.default);
}
function createJsBlob(code) {
  const blob = new Blob([code], { type: "application/javascript" });
  return URL.createObjectURL(blob);
}
async function getApp(transpiled, mode = "window") {
  const codeToHydrate = mode === "window" ? transpiled.replace("body{", "#zbody{") : transpiled;
  const objUrl = createJsBlob(codeToHydrate);
  const App = (await import(objUrl)).default;
  URL.revokeObjectURL(objUrl);
  return App;
}
export {
  initSession,
  prettier,
  quickStart,
  startFromCode,
  startMonacoWithSession
};
//# sourceMappingURL=quickStart.mjs.map

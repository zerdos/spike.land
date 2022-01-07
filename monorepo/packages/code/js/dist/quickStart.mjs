// js/quickStart.mjs
import { jsx } from "https://unpkg.com/@spike.land/esm@0.5.14/dist/emotion-react.mjs";
var formatter;
var transform;
var esbuildEsmTransform;
var getHtmlAndCss;
var initSess;
var initSession = async (room, initData) => {
  initSess = initSess || (await import("./session-G5YXK4BZ.mjs")).default;
  return initSess(room, initData);
};
var prettier = async (code) => {
  formatter = formatter || (await import("./formatter-QTN4LYCK.mjs")).formatter;
  return await formatter(code);
};
async function startMonacoWithSession(session) {
  const shadDom = document.querySelector("#shadowEditor");
  const startMonaco = (await import("./startMonaco-UORZDUUW.mjs")).default;
  const throttle = (await import("https://ga.jspm.io/npm:lodash@4.17.21/throttle.js")).default;
  const onchangeCode = (code, changes) => runner(code, changes, session, ++session.i);
  const getEditor = await startMonaco({
    language: "typescript",
    container: shadDom,
    code: session.code,
    onChange: throttle(onchangeCode, 100)
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
  formatter = formatter || (await import("./formatter-QTN4LYCK.mjs")).formatter;
  esbuildEsmTransform = esbuildEsmTransform || (await import("./esbuildEsm-IHWMAF3R.mjs")).transform;
  transform = esbuildEsmTransform;
  session.errorText = "";
  const { monaco } = session;
  try {
    const cd = await formatter(c);
    const transpiled = await transform(cd);
    let restartError = false;
    if (transpiled.length > 0) {
      if (counter < session.i) {
        return;
      }
      try {
        getHtmlAndCss = getHtmlAndCss || (await import("./renderToString-XEBCEKH6.mjs")).getHtmlAndCss;
        if (counter < session.i) {
          return;
        }
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
        if (session.i !== counter) {
          return;
        }
        session.saveCode && await session.saveCode({ transpiled, code, i: counter, css, html });
        monaco.editor.setTheme("vs-dark");
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
    monaco.editor.setTheme("vs-dark");
  } catch (error) {
    monaco.editor.setTheme("vs-light");
    setTimeout(() => {
      monaco.editor.setTheme("hc-black");
    }, 50);
    session.errorText = error.message;
    console.error(error.message);
  }
}
var startFromCode = async ({ code }) => {
  const session = {
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
  const { renderPreviewWindow } = await import("./renderPreviewWindow-NIH2LKS7.mjs");
  await renderPreviewWindow(session, room, keepFullScreen);
  if (!keepFullScreen) {
    await startMonacoWithSession(session);
  }
  session.update = (c) => runner(c, null, session);
  runner(session.code, null, session, -1);
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
  prettier,
  quickStart,
  startFromCode,
  startMonacoWithSession
};
//# sourceMappingURL=quickStart.mjs.map

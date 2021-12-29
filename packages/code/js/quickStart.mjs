import { jsx } from "@emotion/react";

let formatter;
let transform;

let esbuildEsmTransform;
// let esbuildTransform;
// let babelTransform;
let getHtmlAndCss;
let initSess;

export const initSession = async (room, initData) => {
  initSess = initSess || (await import(`./dist/session.mjs`)).default;

  return initSess(room, initData);
};

export const prettier = async (code) => {
  formatter = formatter || (await import(`./formatter.mjs`)).formatter;
  return await formatter(code);
};

// //

export async function startMonacoWithSession(session) {
  const shadDom = document.getElementById("shadowEditor");

  const startMonaco = (await import("./dist/startMonaco.mjs")).default;
  const getEditor = await startMonaco(
    /**
     * @param {any} code
     */
    {
      language: "typescript",
      container: shadDom,
      code: session.code,
      /**
       * @param {string} code
       */
      onChange: (code, changes) => runner(code, changes, session, ++session.i),
    },
  );

  session.editor = getEditor();

  const monaco = window.monaco;

  monaco.languages.registerOnTypeFormattingEditProvider("typescript", {
    autoFormatTriggerCharacters: ["}", "{", ")", "(", ";"],

    async provideOnTypeFormattingEdits(model) {
      const text = await formatter(model.getValue());

      return [
        {
          range: model.getFullModelRange(),

          text,
        },
      ];
    },
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

  // model.dispose();
  console.log(fastError);
  return [];
}

// let getHtmlAndCss;

async function runner(c, changes = null, session, counter) {
  // if (!esbuildEsmTransform || !formatter ) session.broad({...session, code: c, errorText: "PRE" })

  session.changes.push(changes);
  formatter = formatter || (await import(`./formatter.mjs`)).formatter;
  esbuildEsmTransform = esbuildEsmTransform ||
    (await import(`./esbuildEsm.mjs`)).transform;

  transform = esbuildEsmTransform;

  session.errorText = "";

  const { monaco } = session;

  try {
    const cd = await formatter(c);

    const transpiled = await transform(cd);

    let restartError = false;
    ///yellow
    if (transpiled.length) {
      if (counter < session.i) return;

      try {
        getHtmlAndCss = getHtmlAndCss ||
          (await import("./vendor/renderToString.mjs")).getHtmlAndCss;

        if (counter < session.i) return;

        const App = await getApp(transpiled);
        const { html, css } = getHtmlAndCss(App);

        session.transpiled = transpiled;
        session.html = html;

        const children = await getReactChild(transpiled);

        // session.html = zbody.innerHTML;

        session.setChild((c) => [...c, children]);
        session.children = children;
        restartError = !html;
        session.code = cd;
        session.codeNonFormatted = c;
        // getCss = getCss || (await import("./templates.ts")).getCss;
        // setTimeout(async () => {
        //     session.html = document.getElementById("zbody").innerHTML;
        // const css = getCss(session);
        const code = cd;
        session.css = css;
        if (session.i !== counter) return;
        session.saveCode &&
          await session.saveCode({ transpiled, code, i: counter, css, html });
        monaco.editor.setTheme("vs-dark");
        // }, 10);

        return;
      } catch (e) {
        console.error("EXCEPTION");
        console.log({ e });
        restartError = true;
        console.error({ restartError });
      }
    }
    if (session.i > counter) return;
    const err = await getErrors(session);
    if (session.i > counter) return;

    if (restartError) {
      err.push(
        { messageText: "Error while starting the app. Check the console!" },
      );
    }

    if (err.length) console.log({ err });

    // if (err.length === 0 && transpiled.length) {
    //   if (session.i > counter) return;
    //   session.code = cd;
    //   session.codeNonFormatted = c;

    //   const code = cd;
    //   const i = session.i;

    //   saveCode(session, counter);
    // } else {
    //   console.log({ code: c, transpiled });
    //   if (session.i > counter) return;

    //   if (cd.length < 1000 && session.code.length < 1000) {
    //     const diff = (await import("@spike.land/shadb")).diff;

    //     const slices = await diff(session.code, cd);

    //     if (slices.c.length <= 3) {
    //       session.lastErrors = 0;

    //       return;
    //     }

    //     if (slices.c.length == 4) {
    //       session.lastErrors = 0;
    //       monaco.editor.setTheme("hc-black");

    //       return;
    //     }
    //   }
    //   if (err && err[0] && err[0].messageText) {
    //     console.error(err[0].messageText.toString());
    //   }

    //   return;
    // }

    monaco.editor.setTheme("vs-dark");
  } catch (err) {
    // if (err.message) {
    //   session.errorText = err.message;

    //   const saveErrorCode = async () => {
    //     const CID = await Hash.of(c);

    //     const url = `/error/${CID}`;
    //     fetch(`https://code.spike.land${url}`, {
    //       method: "POST",
    //       body: c,
    //     });
    //   };
    //   saveErrorCode();
    //   return;
    // }

    monaco.editor.setTheme("vs-light");
    setTimeout(() => {
      monaco.editor.setTheme("hc-black");
    }, 50);
    session.errorText = err.message;
    console.error(err.message);
  }
}

export const startFromCode = async ({ code }) => {
  let session = {
    code,
    i: 0,
    changes: [],
    saveCode: () => {},
    setChild: () => {},
  };
  await runner(code, null, session);
  await quickStart(session);
};

export async function quickStart(session, room, keepFullScreen, saveCode) {
  session.saveCode = saveCode;
  // session.children = await getReactChild(session.transpiled);
  session.children = null;
  const { renderPreviewWindow } = await import(
    "./dist/renderPreviewWindow.mjs"
  );

  await renderPreviewWindow(session, room, keepFullScreen);

  // if (localStorage && session) {
  //   const { code, transpiled, html, css, i } = session;
  //   localStorage.setItem(
  //     `state-${session.room}`,
  //     JSON.stringify({ code, transpiled, html, css, i }),
  //   );
  // }
  // // document.getElementById("root").remove();

  if (!keepFullScreen) await startMonacoWithSession(session);
  session.update = (c) => runner(c, null, session);
  runner(session.code, null, session, -1);
}

async function getReactChild(transpiled, mode = "window") {
  const codeToHydrate = mode === "window"
    ? transpiled.replace("body{", "#zbody{")
    : transpiled;

  const objUrl = createJsBlob(
    codeToHydrate,
  );

  const mod = (await import(objUrl));
  URL.revokeObjectURL(objUrl);

  return jsx(mod.default);
}

// function createPatch(oldCode, newCode, createDelta) {
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

  const objUrl = createJsBlob(
    codeToHydrate,
  );

  const App = (await import(objUrl)).default;

  URL.revokeObjectURL(objUrl);

  return App;
}

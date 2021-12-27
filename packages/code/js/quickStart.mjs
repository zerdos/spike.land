import { jsx } from "@emotion/react";

let formatter;
let saveCode;
let transform;

// let esbuildEsmTransform;
let esbuildTransform;
// let babelTransform;
let getHtmlAndCss;
let getCss;

// //

export async function startMonacoWithSession(session) {
  const shadDom = document.getElementById("shadowEditor");

  const startMonaco = (await import("../dist/startMonaco.mjs")).default;
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
  session.changes.push(changes);

  saveCode = saveCode || (await import("../js/data.mjs")).saveCode;
  // getHtmlAndCss = getHtmlAndCss ||
  //   (await import("./renderToString")).getHtmlAndCss;
  formatter = formatter || (await import(`../js/formatter.mjs`)).formatter;
  // esbuildEsmTransform = esbuildEsmTransform ||
  //   (await import(`./esbuildEsm.mjs`)).transform;

  esbuildTransform = esbuildTransform ||
    (await import(`./esbuild.mjs`)).transform;

  // babelTransform = babelTransform ||
  // (await import(`./babel.mjs`)).babelTransform;

  // transform =transform || ((code) => Promise.any([babelTransform(code),esbuildEsmTransform(code), esbuildTransform(code)]))

  transform = esbuildTransform;

  if (window.sendChannel) {
    const Hash = (await import("ipfs-only-hash")).default;
    const hashOfCode = await Hash.of(c);
    if (
      window.hashOfCode === window.hashOfStarterCode &&
      window.hashOfCode === hashOfCode
    ) {
      return;
    }
    window[hashOfCode] = c;
    const prevHash = await Hash.of(session.code);
    window[prevHash] = session.code;

    if (window.hashOfCode !== hashOfCode) {
      const starterCode = session.code;
      const createDelta = (await import("textdiff-create")).default;
      const codeDiff = createPatch(starterCode, c, createDelta);

      if (counter < session.i) return;
      window.sendChannel.send({
        changes,
        i: session.i,
        hashOfCode,
        prevHash,
        codeDiff,
      });
    }
  }

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
          (await import("../dist/renderToString.mjs")).getHtmlAndCss;

        if (counter < session.i) return;

        const App = await getApp(transpiled);
        const { html } = getHtmlAndCss(App);

        session.transpiled = transpiled;
        session.html = html;

        const children = await getReactChild(transpiled);

        // session.html = zbody.innerHTML;

        session.setChild((c) => [...c, children]);
        session.children = children;
        restartError = !html;
        session.codeNonFormatted = c;
        getCss = getCss || (await import("../dist/templates.mjs")).getCss;
        getCss(session);
        await saveCode(session, session.i);
        monaco.editor.setTheme("vs-dark");
        return;
      } catch (e) {
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

    if (err.length === 0 && transpiled.length) {
      if (session.i > counter) return;
      session.code = cd;
      session.codeNonFormatted = c;

      saveCode(session, counter);
    } else {
      console.log({ code: c, transpiled });
      if (session.i > counter) return;

      if (cd.length < 1000 && session.code.length < 1000) {
        const diff = (await import("@spike.land/shadb")).diff;

        const slices = await diff(session.code, cd);

        if (slices.c.length <= 3) {
          session.lastErrors = 0;

          return;
        }

        if (slices.c.length == 4) {
          session.lastErrors = 0;
          monaco.editor.setTheme("hc-black");

          return;
        }
      }
      if (err && err[0] && err[0].messageText) {
        console.error(err[0].messageText.toString());
      }

      return;
    }

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
    setChild: () => {},
  };
  await runner(code, null, session);
  await quickStart(session);
};

export async function quickStart(session) {
  // session.children = await getReactChild(session.transpiled);
  session.children = null;
  const { renderPreviewWindow } = await import(
    "../dist/renderPreviewWindow.mjs"
  );

  await renderPreviewWindow(session);

  if (localStorage && session) {
    localStorage.setItem(
      `state-${session.room}`,
      JSON.stringify({ session }),
    );
  }
  // document.getElementById("root").remove();

  await startMonacoWithSession(session);

  // await restartX(
  //   session.transpiled,
  //   document.getElementById("zbody"),
  //   session.i + 1,
  //   session,
  // );
}

// export async function restartX(transpiled, target, counter, session) {
//   if (session.i > counter) return false;

//   if (session.transpiled === transpiled) return false;
//   session.transpiled = transpiled;

//   // const codeHash = await Hash.of(code);

//   //  session.html = "";
//   session.transpiled = "";
//   let hadError = false;
//   if (typeof transpiled !== "string" || transpiled === "") {
//     // console.log(transpiled.error);
//     hadError = true;
//     return hadError;
//   }

//   let children;
//   let App;
//   try {
//     children = await getReactChild(transpiled);
//     App = await getApp(transpiled);
//   } catch (error) {
//     session.errorText = error.message;
//     console.error({ error, message: "error in rendering" });
//     return true;
//   }

//   // session.unmount = render(Element(), root);
//   // const zbody = target || document.createElement("div");
//   // if (!zbody) {
//   //   zbody = document.createElement('div');
//   //   document.body.appendChild(zbody);

//   const { getHtmlAndCss } = await import("./renderToString");

//   const { html } = getHtmlAndCss(App);

//   if (html) {
//     // }

//     // ReactDOM.render(children, zbody);

//     // zbody && zbody.children[0].replaceWith(root);
//     // session.div = zbody;
//     // if (zbody.innerHTML) {
//     session.transpiled = transpiled;
//     session.html = html;
//     session.css = css;
//     // session.html = zbody.innerHTML;
//     session.children = children;
//     session.setChild((c) => [...c, session.children]);
//   } else return !html;
//   // }
//   // return !zbody.innerHTML;
// }

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

function createPatch(oldCode, newCode, createDelta) {
  return JSON.stringify(createDelta(oldCode, newCode));
}

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

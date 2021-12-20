import { jsx } from "@emotion/react";
import startMonaco from "@spike.land/smart-monaco-editor";

import { renderPreviewWindow } from "./renderPreviewWindow.mjs";

export async function startMonacoWithSession(session) {
  const shadDom = document.getElementById("shadowEditor");

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
      onChange: (code, changes) => runner(code, changes),
    },
  );

  session.editor = getEditor();
  const monaco = window.monaco;
  window.sess = session;

  async function getErrors(session) {
    if (!monaco) {
      return [{ messageText: "Error with the error checking. Try to reload!" }];
    }

    const model = session.editor.getModel();
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

  async function restart(c) {
    const restartCode = (await import("./restartCode.mjs")).restart;

    return restartCode(c);
  }

  async function runner(c, changes = null) {
    session.changes.push(changes);

    if (window.sendChannel && window.sendChannel.readyState === "open") {
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
        const starterCode = c;
        const createDelta = (await import("textdiff-create")).default;

        window.sendChannel.send(JSON.stringify({
          changes,
          i: session.i,
          hashOfCode,
          prevHash: window.hashOfStarterCode,
          codeDiff: createPatch(starterCode, c, createDelta),
        }));
      }
    }

    session.errorText = "";
    session.i++;
    const counter = session.i;

    try {
      const formatter = (await import("./formatter.mjs")).formatter;
      const cd = await formatter(c);
      const baberTransform = (await import("./babel.mjs")).baberTransform;
      const transpiled = await baberTransform(cd);

      let restartError = false;
      ///yellow
      if (transpiled.length) {
        if (counter < session.i) return;
        restartError = await restart(c);
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

      if (session.lastErrors && err.length === 0) {
        restart(c);
      }
      session.lastErrors = err.length;
      if (err.length === 0 && transpiled.length) {
        if (session.i > counter) return;
        session.code = cd;
        session.codeNonFormatted = c;
        const saveCode = (await import("./data.mjs")).saveCode;
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
}

export async function quickStart(session) {
  session.children = await getReactChild(session.transpiled);

  await renderPreviewWindow(session);

  await startMonacoWithSession(session);

  await restartX(
    session.transpiled,
    document.getElementById("zbody"),
    session.i + 1,
    session,
  );
}

export async function restartX(transpiled, target, counter, session) {
  if (session.i > counter) return false;

  if (session.transpiled === transpiled) return false;
  session.transpiled = transpiled;

  // const codeHash = await Hash.of(code);

//  session.html = "";
  session.transpiled = "";
  let hadError = false;
  if (typeof transpiled !== "string" || transpiled === "") {
    // console.log(transpiled.error);
    hadError = true;
    return hadError;
  }

  let children;
  let App;
  try {
    children = await getReactChild(transpiled);
    App = await getApp(transpiled);
  } catch (error) {
    session.errorText = error.message;
    console.error({ error, message: "error in rendering" });
    return true;
  }

  // session.unmount = render(Element(), root);
  // const zbody = target || document.createElement("div");
  // if (!zbody) {
  //   zbody = document.createElement('div');
  //   document.body.appendChild(zbody);


  const {getHtmlAndCss}  = await import("./renderToString.mjs");

  const {html, css} = getHtmlAndCss(App);


  if (html) {


  // }

  // ReactDOM.render(children, zbody);

  // zbody && zbody.children[0].replaceWith(root);
  // session.div = zbody;
  // if (zbody.innerHTML) {
    session.transpiled = transpiled;
    session.html = html;
    session.css = css;
    // session.html = zbody.innerHTML;
    session.children = children;
    session.setChild((c) => [...c, session.children]);
  }
  else return !html;
  // }
  // return !zbody.innerHTML;
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


/**
 * @param {BlobPart} code
 */
function createJsBlob(code) {
  const blob = new Blob([code], { type: "application/javascript" });

  return URL.createObjectURL(blob);
}
function createPatch(oldCode, newCode, createDelta) {
  return JSON.stringify(createDelta(oldCode, newCode));
}

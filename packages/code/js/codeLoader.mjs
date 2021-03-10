import { renderPreviewWindow } from "./renderPreviewWindow.mjs";

import { openWindows } from "./openWindows.mjs";
import { getCodeToLoad, getIPFSCodeToLoad, saveCode } from "./data.mjs";
import { transpileCode } from "./transpile.mjs";
import { formatter } from "./formatter.mjs";
import startMonaco from "../modules/smart-monaco-editor/dist/editor.js";

function getSession() {
  const session = {
    i: 0,
    unmount: () => {},
    errorText: "",
    lastErrors: 0,
    div: document.createElement("div"),
    html: "",
    url: "",
    transpiled: "",
    code: "",
  };

  return session;
}

/**
  * @param {{ document: Document; open: (url: string)=>void; }} _w
 */

export async function run(mode = "window", _w, code = "") {
  const session = getSession();
  let monaco;
  try {
    console.log("Runner!");

    const { pathname } = new URL(window.location.href);

    // setTimeout(async () =>
    //  import { fetchSignal, sendSignal, sha256ToCid } from "./hash.js";
    //   Object.assign(window, { sendSignal, fetchSignal, sha256ToCid })
    // );

    if (mode === "window") {
      await openWindows();
    }

    session.mode = mode;

    if (code) {
      session.code = await formatter(code);
      session.transpiled = await transpileCode(session.code);
    }

    if (!code) {
      try {
        const { code, transpiled, html } =
          (pathname.endsWith("/edit/") || pathname.endsWith("/edit"))
            ? await getIPFSCodeToLoad(undefined)
            : await getCodeToLoad();

        session.code = await formatter(code);
        session.transpiled = await transpileCode(
          session.code,
        ) || transpiled;

        session.div.innerHTML = html;
      } catch (e) {
        console.error({ e, message: "couldn't start" });
        return;
      }
    }

    const container = window.document.getElementById("editor");
    if (container === null) return "No editor window";

    const editorPromise = startMonaco(
      /**
     * @param {any} code
     */
      {
        language: "typescript",
        container: container,
        code: session.code,
        /**
     * 
     * @param {string} code 
     */
        onChange: (code) => runner(code),
      },
    );

    await renderPreviewWindow(
      session,
    );

    await restartCode(session.transpiled, session.i);

    await editorPromise;
    monaco = window.monaco;

    monaco.editor.createModel(
      "define module './hash.js';",
      "typescript",
      monaco.Uri.parse("file:///refs.d.ts"),
    );

    if (!session.url) {
      await saveCode(session, session.i);
    }

    const { sendSignalToQrCode } = await import("./sendSignalToQrCode.mjs");
    await sendSignalToQrCode(session);
  } catch (e) {
    session.errorText = "YAY!! There is an error";
  }

  /**
   * @param {string} c
   */
  async function runner(c) {
    session.errorText = "";
    session.i++;
    const counter = session.i;

    try {
      const cd = await formatter(c);
      const transpiled = await transpileCode(cd);

      console.log(session);
      let restartError = false;
      ///yellow
      if (transpiled.length && session.lastErrors < 2) {
        if (counter < session.i) return;
        restartError = await restartCode(transpiled, counter);
      }
      if (session.i > counter) return;
      const err = await getErrors(cd);
      if (session.i > counter) return;

      if (restartError) {
        err.push(
          { messageText: "Error while starting the app. Check the console!" },
        );
      }

      if (err.length) console.log({ err });
      if (session.lastErrors && err.length === 0) {
        restartCode(transpiled, counter);
      }
      session.lastErrors = err.length;
      // const errorDiv = document.getElementById("error");
      if (err.length === 0 && transpiled.length) {
        if (session.i > counter) return;
        session.code = cd;
        saveCode(session, counter);
      } else {
        if (session.i > counter) return;

        if (cd.length < 1000 && session.code.length < 1000) {
          const { diff } = await import("../modules/diff.js");
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
        // errorDiv.innerHTML = err[0].messageText.toString();

        return;
      }

      monaco.editor.setTheme("vs-dark");
    } catch (err) {
      if (err.message) {
        session.errorText = err.message;
        return;
      }

      monaco.editor.setTheme("vs-light");
      setTimeout(() => {
        monaco.editor.setTheme("hc-black");
      }, 50);
      console.error(err);
    }
  }

  async function getErrors() {
    if (!monaco) {
      return [{ messageText: "Error with the error checking. Try to reload!" }];
    }

    const filename = `file:///main.tsx`;
    const uri = monaco.Uri.parse(filename);
    const model = monaco.editor.getModel(uri);
    const worker = await monaco.languages.typescript.getTypeScriptWorker();
    const client = await worker(model.uri);

    const diag = client.getSemanticDiagnostics(filename);
    const comp = client.getCompilerOptionsDiagnostics(filename);
    const syntax = client.getSyntacticDiagnostics(filename);
    const fastError = await Promise.race([diag, comp, syntax]);

    // model.dispose();

    return [
      ...fastError,
    ];
  }

  /**
   * @param {string} transpiled
   * @param {number} counter
   */
  async function restartCode(transpiled, counter) {
    session.html = "";
    session.transpiled = "";
    let hadError = false;
    if (typeof transpiled !== "string" || transpiled === "") {
      // console.log(transpiled.error);
      hadError = true;
      return hadError;
    }

    const codeToHydrate = mode === "window"
      ? transpiled.replace("body{", "#zbody{")
      : transpiled;

    const root = window.document.createElement("div");

    if (session.i > counter) return false;

    const objUrl = createJsBlob(
      codeToHydrate,
    );

    const mod = (await import(objUrl));
    const Element = mod.default;
    const { render } = mod;

    URL.revokeObjectURL(objUrl);
    session.unmount();
    session.unmount = render(Element(), root);
    const zbody = window.document.getElementById("zbody");
    zbody && zbody.children[0].replaceWith(root);
    session.div = root;
    session.html = root.innerHTML;
    session.transpiled = transpiled;

    return !session.html;

    /**
     * @param {BlobPart} code
     */
    function createJsBlob(code) {
      const blob = new Blob([code], { type: "application/javascript" });

      return URL.createObjectURL(blob);
    }
  }
}

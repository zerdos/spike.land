function getSession() {
  const session = {
    i: 0,
    unmount: () => {},
    hydrated: false,
    preRendered: false,
    lastErrors: 0,
    rootElement: null,
    div: window.document.createElement("div"),
    html: "",
    versions: {},
    ipfs: 0,
    transpiled: "",
    code: "",
  };

  return session;
}

/**
  * @param {{ document: Document; open: (url: string)=>void; }} _w
 */
export async function run(mode = "window", _w, code = "") {
  const { pathname } = new URL(window.location.href);

  const { renderPreviewWindow } = await import("./renderPreviewWindow.js");
  const { sendSignalToQrCode } = await import("./sendSignalToQrCode.js");

  const { getCodeToLoad, getIPFSCodeToLoad, saveCode } = await import(
    "./data.js"
  );
  const { transpileCode } = await import("./transpile.js");

  await sendSignalToQrCode();

  const { formatter } = await import("./formatter.js");

  const { open } = _w;

  const session = getSession();
  session.code = code ? await formatter(code) : "";
  if (!code) {
    try {
      const { code, transpiled, html, versions } = pathname.endsWith("/edit/")
        ? await getIPFSCodeToLoad()
        : await getCodeToLoad();
      session.code = code;
      session.transpiled = await transpileCode(code) || transpiled;
      session.div.innerHTML = html;
      session.versions = versions;
      if (typeof versions === "string" && versions !== "") {
        session.versions = JSON.parse(versions);
      }
    } catch (e) {
      console.error({ e, message: "couldn't start" });
      return;
    }
  }

  const { v } = await import("./versions.js");
  if (mode === "window") {
    const { openWindows } = await import("./openWindows.js");

    await openWindows(v);
  }

  session.versions = session.versions || { ...v };

  if (session.transpiled === "") {
    const transpiled = await transpileCode(session.code);
    console.log(transpiled);
    session.transpiled = transpiled;
  }

  const { renderEmotion, jsx, DraggableWindow } = await import(
    v.emotionRenderer
  );

  await await renderPreviewWindow(
    mode,
    session,
    open,
    renderEmotion,
    jsx,
    DraggableWindow,
  );

  await restartCode(session.transpiled, session.i);

  const startMonaco = (await import(
    v.editor
  )).default;

  const container = window.document.getElementById("editor");
  const modules = await startMonaco(
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

  /**
   * @param {string} c
   */
  async function runner(c) {
    session.i++;
    const counter = session.i;
    const cd = await (formatter(c));
    try {
      const transpiled = await transpileCode(cd);

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
        session.code = await formatter(cd);
        if (session.i > counter) return;
        session.versions = { ...v };

        saveCode(session, counter);
      } else {
        if (session.i > counter) return;

        if (cd.length < 1000 && session.code.length < 1000) {
          const { diff } = await import(
            `https://unpkg.com/@zedvision/shadb@${v.shadb}/src/diff.js`
          );

          const slices = await diff(session.code, cd);

          if (slices.c.length <= 3) {
            session.lastErrors = 0;

            return;
          }

          if (slices.c.length == 4) {
            session.lastErrors = 0;
            modules.monaco.editor.setTheme("hc-black");

            return;
          }
        }
        console.error(err[0].messageText.toString());
        // errorDiv.innerHTML = err[0].messageText.toString();

        return;
      }

      modules.monaco.editor.setTheme("vs-dark");
    } catch (err) {
      modules.monaco.editor.setTheme("vs-light");
      setTimeout(() => {
        modules.monaco.editor.setTheme("hc-black");
      }, 50);
      console.error(err);
    }
  }

  /**
   * @param {string} code
   */
  async function getErrors(code) {
    if (!modules || !modules.monaco) {
      return [{ messageText: "Error with the error checking. Try to reload!" }];
    }
    const { monaco } = modules;
    const { sha256 } = await import(
      `https://unpkg.com/@zedvision/shadb@${v.shadb}/src/sha256.js`
    );
    const shaCode = await sha256(code);
    const filename = `file:///${shaCode}.tsx`;
    const uri = monaco.Uri.parse(filename);
    const model = monaco.editor.getModel(uri) ||
      await monaco.editor.createModel(code, "typescript", uri);
    const worker = await monaco.languages.typescript.getTypeScriptWorker();
    const client = await worker(model.uri);

    const diag = client.getSemanticDiagnostics(filename);
    const comp = client.getCompilerOptionsDiagnostics(filename);
    const syntax = client.getSyntacticDiagnostics(filename);
    const fastError = await Promise.race([diag, comp, syntax]);

    model.dispose();

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

    const Element = (await import(objUrl)).default;
    URL.revokeObjectURL(objUrl);
    session.unmount();
    session.unmount = renderEmotion(Element(), root);
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

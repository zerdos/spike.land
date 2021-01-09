import { renderPreviewWindow } from "./renderPreviewWindow.js";
import { sendSignalToQrCode } from "./sendSignalToQrCode.js";
import { v } from "./versions.js";
import { getCodeToLoad, saveCode } from "./data.js";
/**
 * @param {string} code
 */
export async function transpile(code) {
  const { transpileCode } = await import("./transpile.js");
  return await transpileCode(code, false);
}

function getSession() {
  const session = {
    unmount: () => {},
    hydrated: false,
    preRendered: false,
    lastErrors: 0,
    rootElement: null,
    div: window.document.createElement("div"),
    HTML: "",
    devtoolHash: "",
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
  await sendSignalToQrCode();

  const { formatter } = await import("./formatter.js");

  if (mode === "window") {
    const { openWindows } = await import("./openWindows.js");

    await openWindows(v);
  }

  const { open } = _w;

  const session = getSession();
  session.code = code;
  if (!code) {
    try {
      const { code, transpiled, html, versions } = await getCodeToLoad();
      session.code = code;
      session.transpiled = (await transpile(code)) || transpiled;
      session.div.innerHTML = html;
    } catch (e) {
      console.error({ e, message: "couldn't start" });
      return;
    }
  }

  if (session.transpiled === "") {
    const transpiled = await transpile(session.code);
    console.log(transpiled);
    session.transpiled = transpiled;
  }

  const { renderEmotion, jsx, DraggableWindow } = await import(
    v.emotionRenderer
  );

  await renderPreviewWindow(
    mode,
    session,
    open,
    renderEmotion,
    jsx,
    DraggableWindow,
  );

  await restartPreview(restartCode, session);

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
    const cd = await (formatter(c));
    try {
      const transpiled = await transpile(cd);
      if (session.transpiled === transpiled && transpiled !== "") return;
      let restartError = false;
      ///yellow
      if (transpiled.length && session.lastErrors === 0) {
        restartError = await restartCode(transpiled);
      }

      const err = await getErrors(cd);

      if (restartError) {
        err.push(
          { messageText: "Error while starting the app. Check the console!" },
        );
      }

      if (err.length) console.log({ err });
      if (session.lastErrors && err.length === 0) restartCode(transpiled);
      session.lastErrors = err.length;
      // const errorDiv = document.getElementById("error");
      if (err.length === 0 && transpiled.length) {
        session.code = await formatter(cd);
        if (session.transpiled !== transpiled) {
          session.transpiled = transpiled;

          saveCode({
            code: session.code,
            transpiled: session.transpiled,
            html: session.HTML,
            versions: session.devtoolHash,
          });
        }
      } else {
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
   */
  async function restartCode(transpiled) {
    session.HTML = "";
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

    const Element = (await import(createJsBlob(
      codeToHydrate,
    ))).default;
    session.unmount();
    session.unmount = renderEmotion(Element(), root);
    const zbody = window.document.getElementById("zbody");
    zbody && zbody.children[0].replaceWith(root);
    session.HTML = session.div.innerHTML;

    return !!session.HTML;

    /**
     * @param {BlobPart} code
     */
    function createJsBlob(code) {
      const blob = new Blob([code], { type: "application/javascript" });

      return URL.createObjectURL(blob);
    }
  }
}

/**
 * @param {{ (transpiled: string): Promise<boolean>; (arg0: any): any; }} restartCode
 * @param {{ unmount?: () => void; hydrated?: boolean; preRendered?: boolean; lastErrors?: number; rootElement?: null; div?: HTMLDivElement; HTML?: string; devtoolHash?: string; ipfs?: number; transpiled: any; code?: string; }} session
 */
async function restartPreview(restartCode, session) {
  await restartCode(session.transpiled);
}

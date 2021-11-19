import { loadMonaco } from "@spike.land/smart-monaco-editor";
import { renderPreviewWindow } from "./renderPreviewWindow.mjs";
import { openWindows } from "./openWindows.mjs";
import { getCodeToLoad, getIPFSCodeToLoad, saveCode } from "./data.mjs";
import { transpileCode } from "./transpile.mjs";
import { formatter } from "./formatter.mjs";
import { assemble, diff } from "@spike.land/shadb";
import React from "react";
import ReactDOM from "react-dom";

import startMonaco from "@spike.land/smart-monaco-editor";
import { jsx } from "@emotion/react";
import { ipfsClient } from "./ipfsClient.mjs";
//import { getUserId } from "./data.mjs";
// import Hash from "ipfs-only-hash";
export { DraggableWindow, jsx, render } from "@spike.land/renderer";
loadMonaco();

// const charWidthSpan = document.createElement('span');

// charWidthSpan.innerHTML = "a";

// charWidthSpan.style.fontFamily = `"Droid Sans Mono", monospace, monospace, "Droid Sans Fallback"`;
// charWidthSpan.style.fontSize = '14px';
// charWidthSpan.style.visibility = 'hidden';
// charWidthSpan.style.top = '-100px';

// charWidthSpan.style.position = 'absolute';

// document.body.appendChild(charWidthSpan);

// const rect = charWidthSpan.getBoundingClientRect();

// const monacoCharWidth = rect.width;
// console.log({monacoCharWidth});
// charWidthSpan.remove();
// const { importMap } = globalThis;
// console.log(importMap);

// Object.keys(importMap)
//     .map(x => {
//       const url = `https://unpkg.com/${x}`;
//       if (importMap[x].indexOf(url)!==0) return {};

//       return fetch(url)
//               .then(y => {
//                 const uri = y.url.slice(url.length );
//                 const version = uri.slice(0,uri.indexOf("/"));
//                 if (importMap[x].indexOf(version)===-1)console.log({x,version,current:importMap[x]});
//               } );
//             })

function getSession() {
  const session = {
    i: 0,
    unmount: () => {},
    errorText: "",
    lastErrors: 0,
    children: React.Fragment,
    setChild: () => {},
    div: document.createElement("div"),
    html: "",
    url: "",
    transpiled: "",
    code: "",
  };

  return session;
}

export async function run(mode = "window", code = "") {
  window.diff = diff;
  window.assemble = assemble;

  const session = getSession();
  window.sess = session;

  let monaco;

  console.log("Runner!");

  const { pathname } = new URL(window.location.href);

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

  // const editorContainer = window.document.createElement("div");
  // editorContainer.className= "editor-frame"
  // editorContainer.innerHTML = `<div id="editor"></div>`;
  // document.body.appendChild(editorContainer);


 
  // session.children = await getReactChild(session.transpiled);
  await renderPreviewWindow(
    session,
  );

  const container = document.getElementById("editor");

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
       * @param {string} code
       */
      onChange: (code) => runner(code),
    },
  );

  await restartCode(session.transpiled, session.code, session.i);

  await editorPromise;
 
  monaco = window.monaco;
 
  monaco.editor.createModel(
    "define module './hash.js';",
    "typescript",
    monaco.Uri.parse("file:///refs.d.ts"),
  );

  if (!session.url) {
    session.codeNonFormatted = null;
    await saveCode(session, session.i);
  }

  const { sendSignalToQrCode } = await import("./sendSignalToQrCode.mjs");
  await sendSignalToQrCode(session);

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

      let restartError = false;
      ///yellow
      if (transpiled.length && session.lastErrors < 2) {
        if (counter < session.i) return;
        restartError = await restartCode(transpiled, c, counter);
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
        restartCode(transpiled, c, counter);
      }
      session.lastErrors = err.length;
      // const errorDiv = document.getElementById("error");
      if (err.length === 0 && transpiled.length) {
        if (session.i > counter) return;
        session.code = cd;
        session.codeNonFormatted = c;
        saveCode(session, counter);
      } else {
        console.log({ code: c, transpiled });
        if (session.i > counter) return;

        if (cd.length < 1000 && session.code.length < 1000) {
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

        const saveErrorCode = async () => {
          const res = await ipfsClient.add(c, { onlyHash: true });
          const CID = res.cid.toString();

          const url = `/error/${CID}`;
          fetch(`https://code.spike.land${url}`, {
            method: "POST",
            body: c,
          });
        };
        saveErrorCode();
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

  async function getReactChild(transpiled) {
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

  /**
   * @param {string} transpiled
   * @param {number} counter
   */
  async function restartCode(transpiled, code, counter) {
    if (session.i > counter) return false;

    if (session.actualT === transpiled) return false;
    session.actualT = transpiled;

    // const codeHash = await Hash.of(code);

    session.html = "";
    session.transpiled = "";
    let hadError = false;
    if (typeof transpiled !== "string" || transpiled === "") {
      // console.log(transpiled.error);
      hadError = true;
      return hadError;
    }

    let children;
    try {
      children = await getReactChild(transpiled);
    } catch (error) {
      console.error({ error, message: "error in rendering" });
      return false;
    }

    // session.unmount = render(Element(), root);
    const zbody = document.createElement("div");
    // if (!zbody) {
    //   zbody = document.createElement('div');
    //   document.body.appendChild(zbody);

    // }

    ReactDOM.render(children, zbody);

    // zbody && zbody.children[0].replaceWith(root);
    session.div = zbody;
    if (zbody.innerHTML) {
      session.transpiled = transpiled;
      session.html = zbody.innerHTML;
      session.children = children;
      session.setChild((c) => [...c, session.children]);
    }
    return !zbody.innerHTML;
  }
}
/**
 * @param {BlobPart} code
 */
function createJsBlob(code) {
  const blob = new Blob([code], { type: "application/javascript" });

  return URL.createObjectURL(blob);
}

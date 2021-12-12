import createDelta from "textdiff-create";
import { renderPreviewWindow } from "./renderPreviewWindow.mjs";
import { openWindows } from "./openWindows.mjs";
import { getCodeToLoad, getIPFSCodeToLoad, saveCode } from "./data.mjs";
import { formatter } from "./formatter.mjs";
import { diff } from "@spike.land/shadb";
import { restart } from "./restartCode.mjs";

import { baberTransform } from "./babel.mjs";

import startMonaco from "@spike.land/smart-monaco-editor";

import Hash from "ipfs-only-hash";
//import { getUserId } from "./data.mjs";
// import Hash from "ipfs-only-hash";

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
    children: null,
    setChild: () => {},
    div: document.createElement("div"),
    html: "",
    url: "",
    transpiled: "",
    code: "",
  };

  return session;
}

export async function run({ mode = "window", code, room = "code-main" }) {
  mode = mode || "window";
  code = code || "";
  room = room || "code-main";

  const session = getSession();
  if (window.sess) {
    console.log("We are running...");
    return;
  }
  window.sess = session;

  if (session !== window.sess) {
    console.log("bye!");
    return;
  }

  let monaco;

  console.log("Runner!");

  const { pathname } = new URL(window.location.href);

  if (mode === "window") {
    await openWindows();
  }

  session.mode = mode;
  session.room = room;

  if (code) {
    session.code = code;
    session.formattedCode = await formatter(code);
    session.transpiled = await baberTransform(code);
    session.changes = [];
  } else {
    try {
      const { code, html } =
        (pathname.endsWith("/edit/") || pathname.endsWith("/edit"))
          ? await getIPFSCodeToLoad(undefined)
          : await getCodeToLoad(room);
      if (!session.code) {
        session.code = code;
        session.formattedCode = await formatter(code);
      }

      if (!session.transpiled) {
        session.transpiled = await baberTransform(session.code);
      }

      session.changes = [];

      session.div.innerHTML = html;
    } catch (e) {
      console.error({ e, message: "couldn't start" });
      return;
    }
  }

  if (!session.code) {
    console.log("No code - aborting");
    return;
  }

  const hashOfCode = await Hash.of(session.code);

  window[hashOfCode] = code;
  session.hashOfCode = hashOfCode;

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

  console.log("STARTING startMonaco");
  const editorPromise = startMonaco(
    /**
     * @param {any} code
     */
    {
      language: "typescript",
      container: container,
      code: session.formattedCode,
      /**
       * @param {string} code
       */
      onChange: (code, changes) => runner(code, changes),
    },
  );

  await restart(session.code);

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

  // const { sendSignalToQrCode } = await import("./sendSignalToQrCode.mjs");
  // await sendSignalToQrCode(session);

  /**
   * @param {string} c
   */

  async function runner(c, changes = null) {
    session.changes.push(changes);

    if (window.sendChannel && window.sendChannel.readyState === "open") {
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
        window.sendChannel.send(JSON.stringify({
          changes,
          i: session.i,
          hashOfCode,
          prevHash: window.hashOfStarterCode,
          codeDiff: createPatch(starterCode, code),
        }));
      }
    }

    session.errorText = "";
    session.i++;
    const counter = session.i;

    try {
      const cd = await formatter(c);
      const transpiled = await baberTransform(cd);

      let restartError = false;
      ///yellow
      if (transpiled.length && session.lastErrors < 2) {
        if (counter < session.i) return;
        restartError = await restart(c);
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
        restart(c);
      }
      session.lastErrors = err.length;
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
}

function createPatch(oldCode, newCode) {
  return JSON.stringify(createDelta(oldCode, newCode));
}

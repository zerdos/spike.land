import { Document } from "https://raw.githubusercontent.com/microsoft/TypeScript/master/lib/lib.dom.d.ts";

import { makeDraggable } from "./interact.js";
import { startMonaco } from "../../smart-monaco-editor/src/editor.ts";
import { importScript } from "./importScript.js";
import { starter } from "./starter.tsx";

const document = (window as { document: Document }).document;

let firstLoad = true;

let busy = 0;

let keystrokeTillNoError = 0;
let latestCode = "";
let errorReported = "";
let latestSavedCode = "";
let latestGoodCode = "";

export async function run() {
  // await importScript(
  //   "https://unpkg.com/react@17.0.1/umd/react.production.min.js",
  // );
  // await importScript(
  //   "https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js",
  // );

  // await importScript(
  //   "https://unpkg.com/@emotion/react@11.1.1/dist/emotion-react.umd.min.js",
  // );
  // await importScript(
  //   "https://unpkg.com/@emotion/styled@11.0.0/dist/emotion-styled.umd.min.js",
  // );
  // await importScript(
  //   "https://unpkg.com/jsframe.js@1.6.2/lib/jsframe.min.js",
  // );

  // const jsFrameLoader = importScript(
  // "https://unpkg.com/jsframe.js@1.6.2/lib/jsframe.min.js",
  // );

  await importScript(
    "https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js",
  );

  await importScript(
    "https://unpkg.com/@emotion/react@11.1.1/dist/emotion-react.umd.min.js",
  );
  await importScript(
    "https://unpkg.com/@emotion/styled@11.0.0/dist/emotion-styled.umd.min.js",
  );

  const workerDomImport = importScript(
    "https://unpkg.com/@ampproject/worker-dom@0.27.4/dist/main.js",
  );
  await makeDraggable();
  await importScript(
    "https://unpkg.com/@babel/standalone@7.12.6/babel.min.js",
  );

  (async () => {
    const example = getCodeToLoad();
    latestGoodCode = example;

    const modules = await startMonaco({
      language: "typescript",
      code: example,
      onChange,
    });

    function onChange(code: string) {
      if (!modules) return;
      latestCode = code;

      if (!busy) {
        runner(latestCode);
      } else {
        const myCode = code;
        const cl = setInterval(() => {
          if (myCode !== latestCode || !busy) {
            clearInterval(cl);
          }

          if (!busy) {
            runner(latestCode);
          }
        }, 100);
      }
    }

    async function getErrors() {
      if (!modules || !modules.monaco) return;

      const modelUri = modules.monaco.Uri.parse("file:///main.tsx");

      //const model = window["monaco"].editor.getModel(modelUri);
      // getCodeToLoad;
      const tsWorker = await modules.monaco.languages.typescript
        .getTypeScriptWorker();

      const diag = await (await tsWorker(modelUri)).getSemanticDiagnostics(
        "file:///main.tsx",
      );
      const comp = await (await tsWorker(modelUri))
        .getCompilerOptionsDiagnostics("file:///main.tsx");

      const syntax = await (await tsWorker(modelUri)).getSyntacticDiagnostics(
        "file:///main.tsx",
      );

      return [...diag, ...comp, ...syntax];
    }

    async function runner(cd: string) {
      const { diff } = await import("../dist/diff.min.js");
      if (busy === 1) {
        return;
      }

      try {
        busy = 1;
        const err = await getErrors();
        const errorDiv = document.getElementById("error");
        busy = 0;

        if (cd !== latestCode) {
          return;
        }
        if (err && err.length) {
          if (latestCode != cd) {
            return;
          }
          if (errorReported === cd) {
            return;
          }

          document.getElementById("root")!.classList.add("transparent");
          const slices = diff(latestGoodCode, cd, 0);

          if (slices.length <= 3) {
            modules.monaco.editor.setTheme("hc-black");
            return;
          }

          errorDiv!.innerHTML = err[0].messageText.toString();

          document.getElementById("root").style.setProperty(
            "dispay",
            "none",
          );

          errorDiv!.style.display = "block";
          errorReported = cd;

          modules.monaco.editor.setTheme("vs-light");
          setTimeout(() => {
            modules.monaco.editor.setTheme("hc-black");
          }, keystrokeTillNoError++);

          return;
        }

        latestGoodCode = cd;

        errorDiv!.style!.display = "none";

        modules.monaco.editor.setTheme("vs-dark");

        document.getElementById("root").classList.remove("transparent");
        keystrokeTillNoError = 0;

        busy = 0;
        restartCode(transpileCode(cd));
      } catch (err) {
        busy = 0;
        if (cd !== latestCode) {
          return;
        }

        modules.monaco.editor.setTheme("vs-light");
        setTimeout(() => {
          modules.monaco.editor.setTheme("hc-black");
        }, 10);
        console.error(err);
      }
    }

    //
  })();
  restartCode(transpileCode(getCodeToLoad()));

  document.getElementById("root")!.setAttribute("style", "display:block");
  // dragElement(document.getElementById("root"));
  await workerDomImport;
  async function restartCode(transpileCode: string) {
    const searchRegExp = /import/gi;
    const replaceWith = "///";

    const code = transpileCode.replaceAll(
      searchRegExp,
      replaceWith,
    ).replace("export default", "const DefaultElement = ");
    console.log(code);
    const url = createSourceBlob(code);
    console.log(url);

    // const restart = new Function(
    //   "url",
    //   `return function(){

    const restart = () => {
      const renderToString = new Function(
        "code",
        `return function(){  
        
        ${code}

        console.log(DefaultElement);
      }`,
      )();
      renderToString();

      const rootEl = document.getElementById("main-root");
      rootEl.setAttribute("src", url);
      // rootEl.src = "./eeee.js";
      console.log(rootEl);

      MainThread.upgradeElement(
        rootEl,
        "https://unpkg.com/@ampproject/worker-dom@0.27.4/dist/worker/worker.js",
      );
    };

    //     import(url).then((page)=>ReactDOM.render(page, rootEl));
    // }`,
    // )(url);

    if (!firstLoad) {
      const saveCode = async (latestCode: string) => {
        if (latestCode !== latestGoodCode) return;
        if (latestSavedCode === latestCode) return;
        latestSavedCode = latestCode;

        const body = {
          codeTranspiled: transpileCode,
          code: latestGoodCode,
        };

        const stringBody = JSON.stringify(body);
        const request = new Request(
          "https://code.zed.vision",
          {
            body: stringBody,
            method: "POST",
            headers: { "content-type": "application/json;charset=UTF-8" },
          },
        );

        const response = await fetch(request);

        const { hash } = await response.json();

        try {
          const localStorage: Storage = window.localStorage;

          const prevHash = localStorage.getItem("codeBoXHash");

          if (prevHash !== hash) {
            localStorage.setItem("codeBoXHash", hash);
            localStorage.setItem(hash, latestGoodCode);
            setQueryStringParameter("h", hash);
          }
        } catch (e) {
          console.log("no localStorage");
        }
      };

      const codeToSaveForSure = latestCode;

      setTimeout(() => saveCode(latestCode), 500);
    }
    firstLoad = false;
    restart();
  }
  function getCodeToLoad() {
    const search = new URLSearchParams(window.location.search);
    const h = search.get("h") || localStorage.getItem("codeBoXHash");

    return (h && window.localStorage.getItem(h)) ||
      window.localStorage.getItem("STARTER") || starter;
  }

  function transpileCode(code: string) {
    return Babel.transform(code, {
      plugins: [],
      presets: [
        "react",
        ["typescript", { isTSX: true, allExtensions: true }],
      ],
    }).code;
  }
}

function setQueryStringParameter(name: string, value: string) {
  const params = new URLSearchParams(window.location.search);
  params.set(name, value);
  window.history.replaceState(
    {},
    "",
    decodeURIComponent(`${window.location.pathname}?${params}`),
  );
}

function createSourceBlob(code) {
  const blob = new Blob([code], { type: "text/javascript" });

  const url = window.URL.createObjectURL(blob);
  return url;
}

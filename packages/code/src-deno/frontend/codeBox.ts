import { Document } from "https://raw.githubusercontent.com/microsoft/TypeScript/master/lib/lib.dom.d.ts";
import * as AceAjax from "https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/ace/index.d.ts";

import { makeDraggable } from "./interact.ts";
import { startMonaco } from "../../../smart-monaco-editor/src/editor.ts";
import { importScript } from "./importScript.ts";

import { diff } from "./diff.ts";

const document = (window as { document: Document }).document;

let firstLoad = true;

let busy = 0;

let keystrokeTillNoError = 0;
let latestCode = "";
let errorReported = "";
let latestSavedCode = "";
let latestGoodCode = "";
const searchRegExp = /import/gi;
const replaceWith = "///";

export async function run() {
  await importScript(
    "https://unpkg.com/@babel/standalone@7.12.6/babel.min.js",
  );
  await importScript(
    "https://unpkg.com/react@17.0.1/umd/react.production.min.js",
  );
  await importScript(
    "https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js",
  );
  await importScript(
    "https://unpkg.com/interactjs@1.10.0/dist/interact.min.js",
  );

  setTimeout(() => makeDraggable(), 100);

  (async () => {
    const example = getCodeToLoad();
    latestGoodCode = example;

    let aceEditor: AceAjax.Ace;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        window.navigator.userAgent,
      )
    ) {
      // some code.

      await Promise.all([
        importScript(
          "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.min.js",
        ),
        importScript(
          "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-typescript.min.js",
        ),
        importScript(
          "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/theme-monokai.min.js",
        ),
      ]);
      document.getElementById("ace").style.setProperty("display", "block");
      document.getElementById("container").style.setProperty("display", "none");

      aceEditor = window["ace"].edit("ace");
      aceEditor.setTheme("ace/theme/monokai");
      aceEditor.session.setMode("ace/mode/typescript");
      aceEditor.setValue(example);
    }

    const modules = await startMonaco({
      language: "typescript",
      code: example,
      onChange,
    });

    aceEditor && aceEditor.session.on("change", function () {
      const value = aceEditor.getValue();
      modules.editor.setValue(value);
      onChange(value);
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
          console.log(slices);

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
  async function restartCode(transpileCode: string) {
    const restart = new Function(
      "transpileCode",
      `return function(){ 
        ${transpileCode} 
    }`,
    )();

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
            window.history.pushState({}, "", "/?h=" + hash);
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
      window.localStorage.getItem("STARTER") || `() => <>Hello</>`;
  }

  function transpileCode(code: string) {
    return (window as unknown as {
      Babel: {
        transform: (
          code: string,
          options: {
            plugins: string[];
            presets: (string | [string, { [key: string]: boolean }])[];
          },
        ) => { code: string };
      };
    }).Babel.transform(code, {
      plugins: [],
      presets: [
        "react",
        ["typescript", { isTSX: true, allExtensions: true }],
      ],
    }).code.replace(searchRegExp, replaceWith);
  }
}

/// <reference lib="dom" />

// import * as monaco from "https://raw.githubusercontent.com/microsoft/monaco-editor/master/monaco.d.ts";
import { makeDraggable } from "./interact.ts";
import { startMonaco } from "../../../smart-monaco-editor/src/editor.ts";
import { importScript } from "./importScript.ts";

import { diff } from "./diff.ts";

const sp = new URLSearchParams(location.search);
const hash = sp.get("h");
if (hash) {
  localStorage.setItem("codeBoXHash", hash);
}

let monaco;
async function run() {
  await importScript(
    "https://cdnjs.cloudflare.com/ajax/libs/core-js/3.6.5/minified.js",
  );
  await importScript(
    "https://unpkg.com/@babel/standalone@7.12.4/babel.min.js",
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

  const searchRegExp = /import/gi;
  const replaceWith = "///";

  setTimeout(() => makeDraggable(), 100);

  let latestGoodCode = "";

  const transpileCode = (code: string) =>
    (window as unknown as {
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

  const restartCode = async (transpileCode: string) => {
    const restart = new Function(
      "transpileCode",
      `return function(){ ${transpileCode} }`,
    )();

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

      localStorage.getItem("codeBoXHash");

      localStorage.setItem("codeBoXHash", hash);
      localStorage.setItem(hash, latestGoodCode);
      history.pushState({}, "", `/?h=${hash}`);
    } catch (e) {
      console.log("no localStorage");
    }

    restart();
  };

  let keystrokeTillNoError = 0;
  let latestCode = "";
  let errorReported = "";
  let busy = 0;

  (async () => {
    const example = getCodeToLoad();
    latestGoodCode = example;

    await startMonaco({
      language: "typescript",
      code: example,
      onChange: (code: string) => {
        latestCode = code;

        const runner = async (cd: string) => {
          if (busy === 1) {
            return;
          }

          busy = 1;
          const err = await getErrors();

          const errorDiv = document.getElementById("error");
          try {
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
                monaco.editor.setTheme("hc-black");
                return;
              }

              // const oldSlices = diff(latestBadCode, cd);
              // const unMerge = oldSlices.filter((o) => o[0] !== 0);
              // let filtered = slices.filter((t) =>
              //   t[0] === 0 || t[1] === unMerge[0][1]
              // );
              // if (filtered.length > 4) {
              //   filtered = filtered.filter((t) => t[0] === 0);
              // }
              // diff_cleanupMerge(filtered, false);
              // let newStr = "";
              // let offset = 0;
              // filtered.map((t) => {
              //   newStr = newStr + t[1];
              //   if (t[0] !== 0) {
              //     offset = newStr.length;
              //   }
              // });
              // busy = 0;
              // if (newStr !== cd) {
              //   editor.setValue(newStr);
              //   const model = editor.getModel("file:///Main.tsx");
              //   const position = model.getPositionAt(offset);
              //   //  mosel.getC
              //   const validPos = model.validatePosition(position);
              //   editor.setPosition(validPos);
              //   // model.modifyPosition(position)
              //   return;
              // }
              // const errors = err..map((x) => x.messageText)

              errorDiv!.innerHTML = err[0].messageText.toString();

              document.getElementById("root").style.setProperty(
                "dispay",
                "none",
              );

              errorDiv!.style.display = "block";
              errorReported = cd;

              monaco.editor.setTheme("vs-light");
              setTimeout(() => {
                monaco.editor.setTheme("hc-black");
              }, keystrokeTillNoError++);

              return;
            }
            latestGoodCode = cd;

            errorDiv!.style!.display = "none";

            window["monaco"].editor.setTheme("vs-dark");

            document.getElementById("root").classList.remove("transparent");
            keystrokeTillNoError = 0;

            busy = 0;
            restartCode(transpileCode(cd));
          } catch (err) {
            busy = 0;
            if (cd !== latestCode) {
              return;
            }

            monaco.editor.setTheme("vs-light");
            setTimeout(() => {
              window["monaco"].editor.setTheme("hc-black");
            }, 10);
            console.error(err);
          }
        };
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
      },
    });
    monaco = window["monaco"];
  })();

  restartCode(transpileCode(getCodeToLoad()));

  document.getElementById("root")!.setAttribute("style", "display:block");
  // dragElement(document.getElementById("root"));
  async function getErrors() {
    const modelUri = monaco.Uri.parse("file:///main.tsx");

    //const model = window["monaco"].editor.getModel(modelUri);
    getCodeToLoad;
    const tsWorker = await window["monaco"].languages.typescript
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
}

function getCodeToLoad() {
  const hash = window.localStorage.getItem("codeBoXHash");

  return window.localStorage.getItem(location.hash) ||
    (hash && window.localStorage.getItem(hash)) ||
    window.localStorage.getItem("STARTER") || `() => <>Hello</>`;
}

run();

import * as monaco from "https://raw.githubusercontent.com/microsoft/monaco-editor/master/monaco.d.ts";

import { Document } from "https://raw.githubusercontent.com/microsoft/TypeScript/master/lib/lib.dom.d.ts";
import * as AceAjax from "https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/ace/index.d.ts";

import { makeDraggable } from "./interact.ts";
import { startMonaco } from "../../../smart-monaco-editor/src/editor.ts";
import { importScript } from "./importScript.ts";

import { diff } from "./diff.ts";

const document = (window as { document: Document }).document;

let editor: monaco.Editor;
let busy = 0;

let keystrokeTillNoError = 0;
let latestCode = "";
let errorReported = "";
let latestGoodCode = "";
const searchRegExp = /import/gi;
const replaceWith = "///";

async function run() {
  // await importScript(
  //   "https://cdnjs.cloudflare.com/ajax/libs/core-js/3.6.5/minified.js",
  // );
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

  setTimeout(() => makeDraggable(), 100);

  let latestGoodCode = "";

  (async () => {
    const example = getCodeToLoad();
    latestGoodCode = example;

    let aceEditor: AceAjax.Ace;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        window.navigator.userAgent,
      )
    ) {
      // some code..

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

    editor = await startMonaco({
      language: "typescript",
      code: example,
      onChange: (code) => onChange(code),
    });

    aceEditor && aceEditor.session.on("change", function () {
      const value = aceEditor.getValue();
      editor.setValue(value);
      onChange(value);
    });

    //
  })();

  restartCode(transpileCode(getCodeToLoad()));

  document.getElementById("root")!.setAttribute("style", "display:block");
  // dragElement(document.getElementById("root"));
}

async function restartCode(transpileCode: string) {
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

    const prevHash = localStorage.getItem("codeBoXHash");

    if (prevHash !== hash) {
      localStorage.setItem("codeBoXHash", hash);
      localStorage.setItem(hash, latestGoodCode);
      window.history.pushState({}, "", "/?h=" + hash);
    }
  } catch (e) {
    console.log("no localStorage");
  }

  restart();
}

function getCodeToLoad() {
  const search = new URLSearchParams(window.location.search);
  const h = search.get("h");

  return (h && window.localStorage.getItem(h)) ||
    window.localStorage.getItem("STARTER") || `() => <>Hello</>`;
}

function onChange(code: string) {
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

async function getErrors() {
  // return [];
  const modelUri = window.monaco.Uri.parse("file:///main.tsx");

  // //const model = window["monaco"].editor.getModel(modelUri);

  const tsWorker = await window.monaco.languages.typescript
    .getTypeScriptWorker();

  const tsCheck = await tsWorker(modelUri);

  // let diag = [];
  // let comp = [];
  // const diag = await tsCheck.getSemanticDiagnostics("file:///main.tsx");
  // const comp = await tsCheck.getCompilerOptionsDiagnostics(
  //   "file:/ //main.tsx",
  // );
  const syntax = await tsCheck.getSyntacticDiagnostics("file:///main.tsx");

  return [ //...diag, ...comp,
    ...syntax,
  ];
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
        editor.setTheme("hc-black");
        return;
      }

      errorDiv!.innerHTML = err[0].messageText.toString();

      document.getElementById("root").style.setProperty(
        "dispay",
        "none",
      );

      errorDiv!.style.display = "block";
      errorReported = cd;

      editor.setTheme("vs-light");
      setTimeout(() => {
        editor.setTheme("hc-black");
      }, keystrokeTillNoError++);

      return;
    }

    latestGoodCode = cd;

    errorDiv!.style!.display = "none";

    editor.setTheme("vs-dark");

    document.getElementById("root").classList.remove("transparent");
    keystrokeTillNoError = 0;

    busy = 0;
    restartCode(transpileCode(cd));
  } catch (err) {
    busy = 0;
    if (cd !== latestCode) {
      return;
    }

    editor.setTheme("vs-light");
    setTimeout(() => {
      editor.setTheme("hc-black");
    }, 10);
    console.error(err);
  }
}

run();

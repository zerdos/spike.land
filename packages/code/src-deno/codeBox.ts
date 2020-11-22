import { Document } from "https://raw.githubusercontent.com/microsoft/TypeScript/master/lib/lib.dom.d.ts";

import { renderDraggableWindow } from "./DraggableWindow.js";
import { startMonaco } from "../../smart-monaco-editor/src/editor.ts";
import { importScript } from "./importScript.js";
import { starter } from "./starter.tsx";

// import Diff from "https://unpkg.com/diff@5.0.0/dist/diff.js";
// console.log(Diff.structuredPatch("hash1", "hash2", "amaaafa", "alma", "", ""));

interface Babel {
  transform: (
    code: string,
    options: {
      plugins: string[];
      presets: (string | [string, { [key: string]: boolean }])[];
    },
  ) => { code: string };
}
const document = (window as { document: Document }).document;
let firstLoad = true;

const { motion } = window["Motion"];
let latestCode = "";
let busy = 0;
let keystrokeTillNoError = 0;

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

  // await importScript(
  //   "https://unpkg.com/react-dom@17.0.1/umd/react-dom-server.browser.production.min.js",
  // );

  // await importScript(
  //   "https://unpkg.com/@emotion/react@11.1.1/dist/emotion-react.umd.min.js",
  // );
  // await importScript(
  //   "https://unpkg.com/framer-motion@2.9.4/dist/framer-motion.js",
  // );

  // const workerDomImport = importScript(
  //   "https://unpkg.com/@ampproject/worker-dom@0.27.4/dist/main.js",
  // );
  renderDraggableWindow(motion);
  await importScript(
    "https://unpkg.com/@babel/standalone@7.12.7/babel.min.js",
  );

  importScript(
    "https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js",
  );

  // const motion = Motion.motion;

  // const MyMotion = () =>
  //   /*#__PURE__*/ React.createElement(motion.div, {
  //     style: {
  //       dispay: "block",
  //       backround: "red",
  //       width: 300,
  //       height: 300,
  //     },
  //     drag: true,
  //     layout: true,
  //     animate: {
  //       scale: 2,
  //     },
  //   }, React.createElement("iframe", null));

  // const myRoot = document.getElementById("main-root");
  // ReactDOM.render(
  //   React.createElement(MyMotion, {}),
  //   myRoot,
  // );

  // document.body.appendChild(myRoot);

  // const code = transpileCode(
  //   `
  //   const motion = Motion.motion;
  //   const myMotion = ()=><motion.div drag layout animate ={{scale: 2}} ></motion.div>`,
  // );

  // console.log(code);

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

      const modelUri = modules.monaco.Uri.parse(
        "file:///main.tsx",
      );

      //const model = window["monaco"].editor.getModel(modelUri);
      // getCodeToLoad;
      const tsWorker = await modules.monaco.languages.typescript
        .getTypeScriptWorker();

      const diag = await (await tsWorker(modelUri)).getSemanticDiagnostics(
        "file:///main.tsx",
      );
      const comp = await (await tsWorker(modelUri))
        .getCompilerOptionsDiagnostics(
          "file:///main.tsx",
        );

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

          // document.getElementById("root")!.classList.add("transparent");
          const slices = diff(latestGoodCode, cd, 0);

          if (slices.length <= 3) {
            modules.monaco.editor.setTheme("hc-black");
            return;
          }

          errorDiv!.innerHTML = err[0].messageText.toString();

          // document.getElementById("root").style.setProperty(
          //   "dispay",
          //   "none",
          // );

          errorDiv!.style.display = "block";
          errorReported = cd;

          // modules.monaco.editor.setTheme("vs-light");
          // setTimeout(() => {
          //   modules.monaco.editor.setTheme("hc-black");
          // }, keystrokeTillNoError++);

          return;
        }

        latestGoodCode = cd;

        errorDiv!.style!.display = "none";

        modules.monaco.editor.setTheme("vs-dark");

        // document.getElementById("root").classList.remove("transparent");
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
        }, 50);
        console.error(err);
      }
    }

    //
  })();
  restartCode(transpileCode(getCodeToLoad()));

  // document.getElementById("root")!.setAttribute("style", "display:block");
  // dragElement(document.getElementById("root"));
  // await workerDomImport;
  async function restartCode(transpileCode: string) {
    const searchRegExp = /import/gi;
    const replaceWith = "///";

    const code = transpileCode.replaceAll(
      searchRegExp,
      replaceWith,
    ).replace("export default", "DefaultElement = ");

    `
    Object.assign(window, React);
    const {motion} = Motion;
    `;
    // console.log(code);/
    // const url = createJSSourceBlob(code);
    // console.log(url);

    // const restart = new Function(
    //   "url",
    //   `return function(){

    const restart = async () => {
 //     console.log(code);
      const hydrate = new Function(
        "code",
        `return function(){  
          let DefaultElement;
        
        ${code}

                return ReactDOM.render(jsx(DefaultElement), document.getElementById("root"));
      }`,
      )();

      hydrate();
      // const renderToString = new Function(
      //   "code",
      //   `return function(){
      //     let DefaultElement;

      //   ${code}

      //           return ReactDOMServer.renderToString(jsx(DefaultElement));
      // }`,
      // )();
      // const HTML = renderToString();

      // // console.log(HTML);

      // // document.getElementById("root").innerHTML = HTML;

      // const css = Array.from(
      //   document.querySelector("head > style[data-emotion=css]").sheet
      //     .cssRules,
      // ).map((x: any) => x.cssText).filter((cssRule) =>
      //   HTML.includes(cssRule.substring(3, 8))
      // ).join("\n  ");

      // //
      // // For some reason, pre-rendering doesn't care about global styles, the site flickers without this patch
      // //
      // let bodyStylesFix;
      // if (code.includes("body{")) {
      //   const start = code.indexOf("body{");
      //   const firstBit = code.slice(start);
      //   const last = firstBit.indexOf("}");
      //   bodyStylesFix = firstBit.slice(0, last + 1);
      // }

      //   let motionDep = "";
      //   let motionScript = "";
      //   if (code.includes("Motion")) {
      //     motionDep =
      //       `<script crossorigin src="https://unpkg.com/framer-motion@2.9.4/dist/framer-motion.js"></script>`;

      //     motionScript = "const {motion} = Motion";
      //   }

      //   const iframe = `<!DOCTYPE html>
      //   <html lang="en">
      //   <head>
      //   <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      //   <style>
      //   ${bodyStylesFix}
      //   ${css}
      //   </style>
      //   </head>
      //   <body>
      //   <div id="root">
      //   ${HTML}
      //   </div>
      //   <script crossorigin src="https://unpkg.com/react@17.0.1/umd/react.production.min.js"></script>
      //   ${motionDep}
      //   <script crossorigin src="https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js"></script>
      //   <script crossorigin src="https://unpkg.com/@emotion/react@11.1.1/dist/emotion-react.umd.min.js"></script>
      //   <script crossorigin src="https://unpkg.com/@emotion/styled@11.0.0/dist/emotion-styled.umd.min.js"></script>
      //   <script type="module">
      //   Object.assign(window, emotionReact);

      //  const styled = window["emotionStyled"];

      //   let DefaultElement;

      //   ${code}

      //   ReactDOM.hydrate(jsx(DefaultElement), document.body.children[0]);
      //   </script>
      //   </body>
      //   </html>
      //   `;
      //   const iframeBlob = await createHTMLSourceBlob(iframe); //    saveHtml(iframe);

      //   const target = document.getElementsByTagName("iframe").item(0);

      // if (target) {
      //   const cloned = document.createElement("iframe");
      //   cloned.setAttribute("src", iframeBlob);

      //   setTimeout(() => {
      //     window.requestAnimationFrame(() => {
      //       target.setAttribute(
      //         "src",
      //         iframeBlob,
      //       );
      //       cloned.remove();
      //     });
      //   });
      // } else {
      //   await makeDraggable(iframeBlob);
      // }

      // document.getElementById("root").innerHTML = "";

      // const rootEl = document.getElementById("main-root");
      // rootEl.setAttribute("src", url);
      // rootEl.src = "./eeee.js";
      // console.log(rootEl);

      // MainThread.upgradeElement(
      //   rootEl,
      //   "https://unpkg.com/@ampproject/worker-dom@0.27.4/dist/worker/worker.js",
      // );
    };

    if (!firstLoad) {
      const saveCode = async (latestCode: string) => {
        // const helloWorld = new TextEncoder().encode("Hello World");

        // const encoded = gzipEncode(helloWorld);
        // const decoded = gzipDecode(encoded);
        // console.log(decoded);

        if (!location.origin.includes("zed.vision")) {
          return;
        }
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

          const prevHash = localStorage.getItem("codeBoXHash2");

          if (prevHash !== hash) {
            localStorage.setItem("codeBoXHash2", hash);
            localStorage.setItem(hash, latestGoodCode);
            setQueryStringParameter("h", hash);
          }
        } catch (e) {
          console.log("no localStorage");
        }
      };

      setTimeout(() => saveCode(latestCode), 500);
    }
    firstLoad = false;
    restart();
  }
  function getCodeToLoad() {
    const search = new URLSearchParams(window.location.search);
    const h = search.get("h") || localStorage.getItem("codeBoXHash2");

    return (h && window.localStorage.getItem(h)) ||
      window.localStorage.getItem("STARTER") || starter;
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

function createJSSourceBlob(code: string) {
  const blob = new Blob([code], { type: "text/javascript" });

  const url = window.URL.createObjectURL(blob);
  return url;
}

function createHTMLSourceBlob(code: string) {
  const blob = new Blob([code], { type: "text/html" });

  const url = window.URL.createObjectURL(blob);
  return url;
}

async function saveHtml(code: string) {
  const request = new Request(
    "https://code.zed.vision",
    {
      body: code,
      method: "POST",
      headers: { "content-type": "text/html;charset=UTF-8" },
    },
  );

  const response = await fetch(request);

  const { hash } = await response.json();
  return `https://code.zed.vision/?r=${hash}`;
}

function transpileCode(code: string) {
  const { transform } = (window as unknown as { Babel: Babel })["Babel"];
  return transform(
    "/** @jsx jsx */\n" + `
  Object.assign(window, React);
  ` + code,
    {
      plugins: [],
      presets: [
        "react",
        ["typescript", { isTSX: true, allExtensions: true }],
      ],
    },
  ).code;
}

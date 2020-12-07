import { v4 } from "https://deno.land/std@0.79.0/uuid/mod.ts";
import { getKeys } from "./maintenance/maintenance.ts";
import { renderDraggableWindow } from "./DraggableWindow.js";
import { renderDraggableEditor } from "./DraggableEditor.js";
import { startMonaco } from "../../smart-monaco-editor/src/editor.ts";
import { importScript } from "./importScript.js";
import { starter } from "./starter.tsx";
import { sha256 } from "./sha256.ts";
import { getDB } from "./idb.ts";

/// <reference lib="dom" />
const document = window.document;

var ReactDOM: { unmountComponentAtNode: (node: unknown) => void } =
  window.ReactDOM;

const getUrl = () => {
  if (document.location.href.includes("zed.dev")) {
    return "https://code.zed.dev";
  }
  return "https://code.zed.vision";
};

export const getProjects = async () => {
  const uuid = await getUserId();
  const codeDB = await getDB();
  const projects = await codeDB.get(uuid, "json");

  if (!projects || !projects.list) {
    const projectId = v4.generate();

    await codeDB.put(
      uuid,
      JSON.stringify({
        list: [projectId],
        [projectId]: {
          created: Date.now(),
          lastOpen: Date.now(),
        },
      }),
    );

    return [projectId];
  }

  // const search = new URLSearchParams(window.location.search);

  // const keyToLoad = search.get("h") || await db.get(projectName);
  // if(keyToLoad){
  //   projects.map(p=>codeDB.get())
  // }

  return projects.list;
};

interface Babel {
  transform: (
    code: string,
    options: {
      plugins: string[];
      presets: (string | [string, { [key: string]: boolean }])[];
    },
  ) => { code: string };
}
// const document = (window as { document: Document }).document;
let firstLoad = true;

let latestCode = "";
let busy = 0;
let keystrokeTillNoError = 0;

let errorReported = "";
let latestSavedCode = "";
let latestGoodCode = "";

let shareItAsHtml: () => void;

async function deleteHash(apiKey: string, hash: string) {
  try {
    const url = `https://code.zed.vision/keys/delete/?hash=${hash}`;
    const req = await fetch(url, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "API_KEY": apiKey,
      },
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function getCode(hash: string) {
  try {
    const list = `https://code.zed.vision/?h=${hash}`;
    const req = await fetch(list, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
    const data = await req.json();
    if (data.code) return data.code as string;
    return "";
  } catch (e) {
    console.log(e);
    return "";
  }
}

async function getUserId() {
  const codeDB = await getDB();
  const uuid = await codeDB.get("uuid");
  if (!uuid) {
    if (!window.location.href.includes("zed.dev")) {
      const resp = await fetch("https://code.zed.vision/register");
      const data = await resp.json();
      codeDB.put("uuid", data.uuid);
      return data.uuid;
    } else {
      codeDB.put("uuid", "1234");
    }
  }
  return uuid;
}

function replaceWithEmpty(elementId = "root") {
  const el = document.createElement("div");
  const rootEl = document.getElementById(elementId);
  try {
    ReactDOM.unmountComponentAtNode(
      rootEl,
    );
  } catch (e) {
    console.error("Error in un-mount", e);
  }

  if (rootEl) rootEl.replaceWith(el);
  else {
    document.body.appendChild(el);
  }

  el.id = elementId;
}

export async function run(mode = "window") {
  await importScript(
    "https://unpkg.com/@babel/standalone@7.12.9/babel.min.js",
  );

  if (mode === "editor") {
    renderDraggableEditor();
  }

  if (mode == "window") {
    renderDraggableWindow(async () => {
      const link = await shareItAsHtml();
      window.open(link as unknown as string);
    });
  }

  const codeDB = await getDB();

  const uuid = await getUserId();
  const projects = await getProjects();
  const projectName = projects[0];

  const example = await getCodeToLoad();
  restartCode(transpileCode(example));
  latestGoodCode = example;

  const modules = await startMonaco({
    language: "typescript",
    code: example,
    onChange,
  });

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
        const { diff } = await import("../../diff/diff.min.js");

        if (latestCode != cd) {
          return;
        }
        if (errorReported === cd) {
          return;
        }

        const slices = await diff(latestGoodCode, cd);

        if (slices.c.length <= 3) {
          modules.monaco.editor.setTheme("hc-black");
          return;
        }

        errorDiv!.innerHTML = err[0].messageText.toString();

        errorDiv!.style.display = "block";
        errorReported = cd;

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

  // document.getElementById("root")!.setAttribute("style", "display:block");
  // dragElement(document.getElementById("root"));
  // await workerDomImport;
  function restartCode(transPiled: string) {
    const searchRegExp = /import/gi;
    const replaceWith = "///";

    const code = `
    Object.assign(window, React);
    if (window.Motion) {
        Object.assign(window, window.Motion);
    }
    if (window.emotionStyled){
      window.styled= window.emotionStyled;
    }
    ;
    ` + transPiled.replaceAll(
      searchRegExp,
      replaceWith,
    ).replace("export default", "DefaultElement = ");

    // console.log(code);

    // console.log(code);/
    // const url = createJSSourceBlob(code);
    // console.log(url);

    // const restart = new Function(
    //   "url",
    //   `return function(){

    const restart = () => {
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

      shareItAsHtml = async () => {
        const renderToString = new Function(
          "code",
          `return function(){
            let DefaultElement;
  
          ${code}
  
                  return ReactDOMServer.renderToString(jsx(DefaultElement));
        }`,
        )();
        const HTML = renderToString();

        const css = Array.from(
          document.querySelector("head > style[data-emotion=css]").sheet
            .cssRules,
        ).map((x: unknown) => x.cssText).filter((cssRule) =>
          HTML.includes(cssRule.substring(3, 8))
        ).join("\n  ");

        //
        // For some reason, pre-rendering doesn't care about global styles, the site flickers without this patch
        //
        let bodyStylesFix;
        if (code.includes("body{")) {
          const start = code.indexOf("body{");
          const firstBit = code.slice(start);
          const last = firstBit.indexOf("}");
          bodyStylesFix = firstBit.slice(0, last + 1);
        }

        let motionDep = "";
        let motionScript = "";
        if (code.includes("Motion")) {
          motionDep =
            `<script crossorigin src="https://unpkg.com/framer-motion@2.9.5/dist/framer-motion.js"></script>`;

          motionScript = "const {motion} = Motion";
        }
        let title = "(code).zed.vision :)";

        if (
          HTML.indexOf("<title>") > -1 && HTML.indexOf("</title>") > -1
        ) {
          title = HTML.slice(
            HTML.indexOf("<title>") + 7,
            HTML.indexOf("</title>"),
          );
        }

        const iframe = `<!DOCTYPE html>
        <html lang="en">
        <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="Description" content="Generated with code.zed.vision">
        <head profile="http://www.w3.org/2005/10/profile">
        <link rel="icon" 
              type="image/png"
              href="https://zed.vision/favicon.ico">
        <style>
        ${bodyStylesFix}
        ${css}
        </style>
        </head>
        <body>
        <div id="root">
        ${HTML}
        <script crossorigin src="https://unpkg.com/react@17.0.1/umd/react.production.min.js"></script>
        ${motionDep}
        <script crossorigin src="https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js"></script>
        <script crossorigin src="https://unpkg.com/@emotion/react@11.1.2/dist/emotion-react.umd.min.js"></script>
        <script crossorigin src="https://unpkg.com/@emotion/styled@11.0.0/dist/emotion-styled.umd.min.js"></script>
        <script type="module">
        Object.assign(window, emotionReact);

       const styled = window["emotionStyled"];

        let DefaultElement;

        ${code}

        ReactDOM.hydrate(jsx(DefaultElement), document.body.children[0]);
        </script>
        </div>
        
        </body>
        </html>
        `;
        const iframeBlob = await createHTMLSourceBlob(iframe);
        const link = await saveHtml(iframeBlob);
        return link;
      };
    };

    if (!firstLoad) {
      const saveCode = async (latestCode: string) => {
        if (latestCode !== latestGoodCode) return;
        if (latestSavedCode === latestCode) return;

        latestSavedCode = latestCode;

        const request = new Request(
          getUrl(),
          {
            body: latestCode,
            method: "POST",
            headers: { "content-type": "text/plain;charset=UTF-8" },
          },
        );

        // let response;
        const hash = await sha256(latestCode);

        try {
          const prevHash = await codeDB.get(projectName);

          if (prevHash !== hash) {
            await codeDB.put(hash, latestCode);
            await codeDB.put(projectName, hash);
            setQueryStringParameter("h", hash);

            //const response = fetch(request);
          }
        } catch (e) {
          console.error(e);
        }

        // lets not save now - we will save the diff only
        // await response;
      };

      saveCode(latestCode);
    }
    firstLoad = false;
    restart();
  }
  async function getCodeToLoad() {
    const db = await getDB();

    const search = new URLSearchParams(window.location.search);
    const keyToLoad = search.get("h") || await db.get(projectName);

    if (keyToLoad) {
      let code;
      try {
        code = await db.get(keyToLoad);
      } catch {
        console.error("error load key: " + keyToLoad);
      }

      if (code) return code;

      let text;
      try {
        const resp = await fetch(getUrl() + "/?h=" + keyToLoad);
        text = await resp.json();
      } catch (e) {
        const shaHash = await sha256(starter);

        db.put(shaHash, starter);
        await db.put(projectName, shaHash);
        return starter;
      }

      return text;
    }

    return starter;
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

  function createHTMLSourceBlob(code: string) {
    const blob = new Blob([code], { type: "text/html" });
    return blob;
  }

  async function saveHtml(htmlBlob: Blob) {
    const cfUrl = getUrl();
    const request = new Request(
      cfUrl,
      {
        body: htmlBlob,
        method: "POST",
        headers: {
          "content-type": "text/html;charset=UTF-8",
          "SHARE": "true",
        },
      },
    );

    const response = await fetch(request);

    const { hash } = await response.json();
    return `${cfUrl}/${hash}`;
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
}

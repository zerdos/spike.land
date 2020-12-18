import v4 from "https://unpkg.com/uuid@8.3.2/dist/esm-browser/v4.js";

import { importScript } from "./importScript.js";
import { starter } from "./starterNoFramerMotion.ts";
import { sha256 } from "./sha256.js";
import { getDB } from "../../shadb/src/shaDB.ts";

const { ReactDOM, document } = window as unknown as {
  ReactDOM: { unmountComponentAtNode: (node: unknown) => void };
  document: Document;
};

async function getZkey(hash: string) {
  const uuid = await getUserId();

  const uKey = await sha256(uuid);
  const gKey = await sha256(hash + uKey);
  const vKey = await sha256(hash + uuid);
  return `${hash}${uKey}${gKey}${vKey}`;
}

const getUrl = () => {
  if (document.location.href.includes("zed.dev")) {
    return "https://code.zed.vision";
  }
  return "https://code.zed.vision";
};

export const getProjects = async () => {
  const uuid = await getUserId();
  const shaDB = await getDB();
  const projects = await shaDB.get<{ list: string[] }>(uuid, "json");

  if (typeof projects === "string" || projects === null || !projects.list) {
    const projectId: string = v4({}, null, null);

    await shaDB.put(
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
  //   projects.map(p=>shaDB.get())
  // }

  return projects.list;
};

// const document = (window as { document: Document }).document;
let firstLoad = true;

let latestCode = "";

let errorReported = "";
let latestSavedCode = "";
let latestGoodCode = "";

let shareItAsHtml: () => void;

export async function getUserId() {
  const shaDB = await getDB();
  const uuid = await shaDB.get("uuid");
  if (!uuid) {
    if (!window.location.href.includes("zed.dev")) {
      const resp = await fetch("https://code.zed.vision/register");
      const data = await resp.json();
      shaDB.put("uuid", data.uuid);
      return data.uuid;
    } else {
      shaDB.put("uuid", "1234");
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
  const { startMonaco } = await import(
    "https://unpkg.com/@zedvision/smart-monaco-editor@8.5.4/lib/editor.min.js"
  );
  //    "../dist/editor.min.js");
  const { transpileCode } = await import("./transpile.js");

  if (mode === "editor") {
    const { renderDraggableEditor } = await import("./DraggableEditor.js");

    await renderDraggableEditor(importScript);
  }

  if (mode === "window") {
    const { renderDraggableWindow } = await import("./DraggableWindow.js");

    const onShare = async () => {
      const link = await shareItAsHtml();
      window.open(link as unknown as string);
    };
    const opts = {
      onShare,
      ReactDOM,
      React: window.React,
      jsx: window.jsx,
      importScript,
    };
    await renderDraggableWindow(opts);
  }

  const shaDB = await getDB();
  const projects = await getProjects();
  const projectName = projects[0];

  const example = await getCodeToLoad();
  restartCode(await transpileCode(example));
  latestGoodCode = example;

  const modules = await startMonaco({
    language: "typescript",
    code: example,
    onChange,
  });

  async function runner(cd: string) {
    try {
      restartCode(await transpileCode(cd));
      const err = await getErrors(cd);

      const errorDiv = document.getElementById("error");

      if (err && err.length) {
        restartCode(await transpileCode(latestGoodCode));
        const { diff } = await import("../../diff/dist/diff.min.js");

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
    } catch (err) {
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
    requestAnimationFrame(() => runner(latestCode));
  }

  async function getErrors(code: string) {
    if (!modules || !modules.monaco) return;
    const { monaco } = modules;
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
  // document.getElementById("root")!.setAttribute("style", "display:block");
  // dragElement(document.getElementById("root"));
  // await workerDomImport;
  function restartCode(transPiled: string) {
    if (typeof transPiled!=="string" || transPiled==="")  {
      // console.log(transPiled.error);
      return;
    }


    const searchRegExp = /import/gi;
    const searchRegExpExport = /export /gi;
    const replaceWith = "///";

    const code = `
    Object.assign(window, React);
    if (window.Motion) {
        Object.assign(window, window.Motion);
    }
    if (window.emotionStyled){
      window.styled= window.emotionStyled;
    }
    
    ` + transPiled.replaceAll(
      searchRegExp,
      replaceWith,
    ).replace("export default", "DefaultElement = ")
      .replaceAll(searchRegExpExport, "");

    const restart = () => {
      const codeToHydrate = mode === "window"
        ? code.replace("body{", "#root{")
        : code;

      const hydrate = new Function(
        `return function(){  
          let DefaultElement;
          ${codeToHydrate}
          return ReactDOM.render(jsx(DefaultElement), document.getElementById("root"));
      }`,
      )();

      hydrate();

      shareItAsHtml = async () => {
        const renderToString = new Function(
          `return function(){
            let DefaultElement;
            ${code}
            return ReactDOMServer.renderToString(jsx(DefaultElement));
        }`,
        )();
        const HTML = renderToString();

        const css = Array.from<{ cssText: string }>(
          (document.querySelector(
            "head > style[data-emotion=css]",
          ) as unknown as { sheet: { cssRules: { cssText: string }[] } }).sheet
            .cssRules,
        ).map((x) => x.cssText).filter((cssRule) =>
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
        if (code.indexOf("framer-motion") > -1) {
          motionDep =
            `<script crossorigin src="https://unpkg.com/framer-motion@3.0.0/dist/framer-motion.js"></script>`;

          motionScript = "const {motion} = Motion";
        }

        let qrDep = "";
        if (code.indexOf("QRious") > -1) {
          qrDep =
            `<script crossorigin src="https://unpkg.com/@zedvision/qrious@8.5.7/dist/qrious.min.js"></script>`;
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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
        <link rel="preload" href="https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js" as="script">
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
        </div>
        <script crossorigin src="https://unpkg.com/react@17.0.1/umd/react.production.min.js"></script>
        ${motionDep}
        ${qrDep}
        <script crossorigin src="https://unpkg.com/react-dom@17.0.1/umd/react-dom-server.browser.production.min.js"></script>
        <script crossorigin src="https://unpkg.com/@emotion/react@11.1.2/dist/emotion-react.umd.min.js"></script>
        <script crossorigin src="https://unpkg.com/@emotion/styled@11.0.0/dist/emotion-styled.umd.min.js"></script>
        <script type="module">
        Object.assign(window, emotionReact);

        const styled = window["emotionStyled"];

        let DefaultElement;

        ${code}
        
        console.log(ReactDOMServer.renderToString(jsx(DefaultElement)));
        
        document.body.children[0].innerHTML = ReactDOMServer.renderToString(jsx(DefaultElement));
        
        const s = window.document.createElement("script");
        s.src = "https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js";
        s.onload = ()=> ReactDOM.hydrate(jsx(DefaultElement), document.body.children[0]);
        window.document.head.appendChild(s);

        </script>
        </body>
        </html>
        `;

        const link = await saveHtml(iframe);
        return link;
      };
    };

    if (!firstLoad) {
      const saveCode = async (latestCode: string) => {
        if (latestCode !== latestGoodCode) return;
        if (latestSavedCode === latestCode) return;

        latestSavedCode = latestCode;

        const hash = await sha256(latestCode);

        const request = new Request(
          getUrl(),
          {
            body: latestCode,
            method: "POST",
            headers: {
              "Content-Type": "text/plain;charset=UTF-8",
              "ZKEY": await getZkey(hash),
            },
          },
        );

        // let response;

        try {
          const prevHash = await shaDB.get(projectName);

          if (prevHash !== hash) {
            await shaDB.put(hash, latestCode);
            await shaDB.put(projectName, hash);

            // setQueryStringParameter("h", hash);
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

  async function saveHtml(html: string) {
    const cfUrl = getUrl();
    const hash = await sha256(html);
    const htmlBlob = await createHTMLSourceBlob(html);
    const request = new Request(
      cfUrl,
      {
        body: htmlBlob,
        method: "POST",
        headers: {
          "Content-Type": "text/html;charset=UTF-8",
          "SHARE": "true",
          "ZKEY": await getZkey(hash),
        },
      },
    );

    const response = await fetch(request);

    return `${cfUrl}/${hash}`;
  }
}

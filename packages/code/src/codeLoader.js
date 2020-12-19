import { importScript } from "../dist/importScript.js";
import { starter } from "./starterNoFramerMotion.js";

const session = {
  firstLoad: true,
  errorCode: "",
  code: "",
};

function unHydrate(elementId = "zbody", element) {
  try {
    const root = window.document.getElementById(elementId);
    const html = root.innerHTML;
    if (html.length > 0) {
      ReactDOM.unmountComponentAtNode(
        element,
      );
      root.innerHTML = html;
    }
  } catch (e) {
    console.error("Error in un-mount", e);
  }
}

export async function run(mode = "window") {
  const { transpileCode } = await import("./transpile.js");

  session.code = await getCodeToLoad();

  if (mode === "editor") {
    const { renderDraggableEditor } = await import("./DraggableEditor.js");

    await renderDraggableEditor();
  }

  if (mode === "window") {
    const { renderDraggableWindow } = await import("./DraggableWindow.js");

    const { shareItAsHtml } = await import("./share.js");

    await renderDraggableWindow({
      onShare: async () => {
        const link = await shareItAsHtml(
          { code: await transpileCode(session.code) },
        );
        window.open(link);
      },
    });
  }

  const { getDB } = await import("../dist/shaDB.min.js");
  const { getUserId, getProjects, saveCode } = await import("./data.js");

  const transpiled = await transpileCode(session.code);
  restartCode(transpiled);

  const { startMonaco } = await import(
    "../dist/editor.min.js"
  );

  const modules = await startMonaco({
    language: "typescript",
    code: session.code,
    onChange,
  });

  let lastErrors = 0;

  async function runner(cd) {
    try {
      const transpiled = await transpileCode(cd);
      let restartError = false;
      ///yellow
      if (transpiled.length && lastErrors === 0) {
        restartError = await restartCode(transpiled);
      }

      const err = [
        ...(restartError ? [restartError] : []),
        ...(await getErrors(cd)),
      ];
      if (lastErrors && err.length === 0) restartCode(transpiled);
      lastErrors = err.length;
      const errorDiv = window.document.getElementById("error");
      if (err.length === 0 && transpiled.length) {
        session.code = cd;
        await saveCode(cd);
      } else {
        session.error = cd;

        const { diff } = await import("../dist/diff.min.js");

        const slices = await diff(session.code, cd);

        if (slices.c.length <= 3) {
          modules.monaco.editor.setTheme("hc-black");
          return;
        }

        errorDiv.innerHTML = err[0].messageText.toString();

        errorDiv.style.display = "block";

        return;
      }

      errorDiv.style.display = "none";

      modules.monaco.editor.setTheme("vs-dark");
    } catch (err) {
      modules.monaco.editor.setTheme("vs-light");
      setTimeout(() => {
        modules.monaco.editor.setTheme("hc-black");
      }, 50);
      console.error(err);
    }
  }

  function onChange(code) {
    if (!modules) return;
    window.requestAnimationFrame(() => runner(code));
  }

  async function getErrors(code) {
    if (!modules || !modules.monaco) return;
    const { monaco } = modules;
    const { sha256 } = await import("./sha256.js");
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
  await importScript(
    "https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js",
  );

  // document.getElementById("zbody")!.setAttribute("style", "display:block");
  // dragElement(document.getElementById("zbody"));
  // await workerDomImport;
  function restartCode(transPiled) {
    if (typeof transPiled !== "string" || transPiled === "") {
      // console.log(transPiled.error);
      return;
    }

    let hydrated = false;

    const restart = () => {
      const codeToHydrate = mode === "window"
        ? transPiled.replace("body{", "#root{")
        : transPiled;

      if (hydrated) {
        unHydrate("zbody", hydrated);
        hydrated = false;
      }

      const hydrate = new Function(
        "importScript",
        `return function(){  
          let DefaultElement;
          const root = document.createElement("div");

          try{

                ${codeToHydrate}

                
                root.innerHTML = ReactDOMServer.renderToString(jsx(DefaultElement));

                hydrated = DefaultElement;
                setTimeout(async()=>{
                  if (hydrated === DefaultElement){
                    ReactDOM.hydrate(jsx(DefaultElement), root);
                  }
                }, 500);

          } catch (e){
            root.innerHTML = e.message;
          }

          if(document.getElementById("zbody").children.length) {
            document.getElementById("zbody").children[0].remove();
          }
          
          document.getElementById("zbody").appendChild(root);
      }`,
      )(importScript);

      setTimeout(() => hydrate());
    };

    restart();
  }
  async function getCodeToLoad() {
    const { getUserId, getProjects, saveCode } = await import("./data.js");
    const { getDB } = await import("../dist/shaDB.min.js");
    const db = await getDB();

    const uuid = await getUserId();
    const projects = await getProjects();
    const projectName = projects[0];

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
        const resp = await fetch("https://code.zed.vision/?h=" + keyToLoad);
        text = await resp.json();
      } catch (e) {
        const { sha256 } = await import("./sha256.js");
        const shaHash = await sha256(starter);

        db.put(shaHash, starter);
        await db.put(projectName, shaHash);
        return starter;
      }

      return text;
    }

    return starter;
  }

  function setQueryStringParameter(name, value) {
    const params = new URLSearchParams(window.location.search);
    params.set(name, value);
    window.history.replaceState(
      {},
      "",
      decodeURIComponent(`${window.location.pathname}?${params}`),
    );
  }
}

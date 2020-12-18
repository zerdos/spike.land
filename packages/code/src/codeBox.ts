import { starter } from "./starterNoFramerMotion.ts";

const session = {
  firstLoad: true,
  errorCode: "",
  code: "",
};

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
  const { transpileCode } = await import("./transpile.js");

  session.code = await getCodeToLoad();

  if (mode === "editor") {
    const { renderDraggableEditor } = await import("./DraggableEditor.js");

    await renderDraggableEditor();
  }

  if (mode === "window") {
    const { renderDraggableWindow } = await import("./DraggableWindow.js");

    const onShare = async () => {
      const { shareItAsHtml } = await import("./share.js");
      const link = await shareItAsHtml(session);

      window.open(link as unknown as string);
    };

    await renderDraggableWindow();
  }

  const errorDiv = document.getElementById("error");
  const { getDB } = await import("./shaDB.min.js");
  const { getUserId, getProjects, saveCode } = await import("./data.js");

  const shaDB = await getDB();
  const uuid = await getUserId();

  const projects = await getProjects();
  const projectName = projects[0];

  const transpiled = await transpileCode(session.code);
  restartCode(transpiled);

  const { startMonaco } = await import(
    "./editor.min.js"
  );

  const modules = await startMonaco({
    language: "typescript",
    code: session.code,
    onChange,
  });

  async function runner(cd: string) {
    try {
      const transpiled = await transpileCode(cd);
      ///yellow
      if (transpiled.length) restartCode(transpiled);

      const err = await getErrors(cd);
      if (err.length === 0) {
        session.code = cd;
        await saveCode(cd);
      } else {
        session.error = cd;

        const { diff } = await import("./diff.min.js");

        const slices = await diff(session.code, cd);

        if (slices.c.length <= 3) {
          modules.monaco.editor.setTheme("hc-black");
          return;
        }

        errorDiv!.innerHTML = err[0].messageText.toString();

        errorDiv!.style.display = "block";

        return;
      }

      errorDiv!.style!.display = "none";

      modules.monaco.editor.setTheme("vs-dark");
    } catch (err) {
      modules.monaco.editor.setTheme("vs-light");
      setTimeout(() => {
        modules.monaco.editor.setTheme("hc-black");
      }, 50);
      console.error(err);
    }
  }

  function onChange(code: string) {
    if (!modules) return;
    window.requestAnimationFrame(() => runner(code));
  }

  async function getErrors(code: string) {
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
  // document.getElementById("root")!.setAttribute("style", "display:block");
  // dragElement(document.getElementById("root"));
  // await workerDomImport;
  function restartCode(transPiled: string) {
    if (typeof transPiled !== "string" || transPiled === "") {
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

    if (!session.firstLoad) replaceWithEmpty("root");
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
    };

    restart();
  }
  async function getCodeToLoad() {
    const { getUserId, getProjects, saveCode } = await import("./data.js");
    const { getDB } = await import("./shaDB.min.js");
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

  function setQueryStringParameter(name: string, value: string) {
    const params = new URLSearchParams(window.location.search);
    params.set(name, value);
    window.history.replaceState(
      {},
      "",
      decodeURIComponent(`${window.location.pathname}?${params}`),
    );
  }
}

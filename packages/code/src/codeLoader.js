import { importScript } from "../dist/importScript.js";
import { starter } from "./starterNoFramerMotion.js";

const session = {
  hydrated: false,
  preRendered: false,
  lastErrors: 0,
  transpiled: "",
  code: "",
};

function formatter(code) {
  try {
    return window.prettier.format(code, {
      "arrowParens": "always",
      "bracketSpacing": true,
      "embeddedLanguageFormatting": "auto",
      "htmlWhitespaceSensitivity": "css",
      "insertPragma": false,
      "jsxBracketSameLine": true,
      "jsxSingleQuote": false,
      "printWidth": 80,
      "proseWrap": "preserve",
      "quoteProps": "as-needed",
      "requirePragma": false,
      "semi": true,
      "singleQuote": true,
      "tabWidth": 2,
      "trailingComma": "all",
      "useTabs": false,
      parser: "babel-ts",
      plugins: window.prettierPlugins,
    });
  } catch {
    return code;
  }
}

export async function run(mode = "window") {
  const { transpileCode } = await import("./transpile.js");
  await importScript("https://unpkg.com/prettier@2.2.1/standalone.js");
  await importScript("https://unpkg.com/prettier@2.2.1/parser-babel.js");
  await importScript("https://unpkg.com/prettier@2.2.1/parser-html.js");

  session.code = formatter(await getCodeToLoad());
  session.transpiled = await transpileCode(session.code);

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
          { code: session.transpiled },
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
    code: formatter(session.code),
    onChange: (c) => runner(formatter(c)),
  });

  async function runner(cd) {
    try {
      const transpiled = await transpileCode(cd, session.lastErrors);
      if (session.transpiled === transpiled) return;
      let restartError = false;
      ///yellow
      if (transpiled.length && session.lastErrors === 0) {
        restartError = restartCode(transpiled);
      }

      const err = [
        ...(restartError
          ? [
            { messageText: "Error while starting the app. Check the console!" },
          ]
          : []),
        ...(await getErrors(cd)),
      ];
      if (session.lastErrors && err.length === 0) restartCode(transpiled);
      session.lastErrors = err.length;
      const errorDiv = window.document.getElementById("error");
      if (err.length === 0 && transpiled.length) {
        session.code = cd;
        if (session.transpiled !== transpiled) {
          session.transpiled = transpiled;

          await saveCode(formatter(cd), session.transpiled);
        }

        await saveCode(cd);
      } else {
        session.error = cd;

        const { diff } = await import("../dist/diff.min.js");

        const slices = await diff(session.code, cd);

        if (slices.c.length <= 3) {
          session.lastErrors = 0;

          return;
        }

        if (slices.c.length == 4) {
          session.lastErrors = 0;
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
  function restartCode(transpiled) {
    if (typeof transpiled !== "string" || transpiled === "") {
      // console.log(transpiled.error);
      return 1;
    }

    const codeToHydrate = mode === "window"
      ? transpiled.replace("body{", "#zbody{")
      : transpiled;

    // if (session.hydrated) {
    //   try {
    //     const root = window.document.getElementById("zbody");
    //     const html = root.innerHTML;
    //     if (html.length > 0) {
    //       ReactDOM.unmountComponentAtNode(
    //         session.hydrated,
    //       );
    //       session.hydrated = false;
    //       root.innerHTML = html;
    //     }
    //   } catch (e) {
    //     console.error("Error in un-mount", e);
    //   }hydrated
    // }

    const hydrate = new Function(
      "importScript",
      "session",
      `return function(){  
          let DefaultElement;


          try{
                ${codeToHydrate}
                
                const root = document.getElementById("zbody").children[0] || document.createElement("div");
                ReactDOM.render(jsx(DefaultElement), root);
                
                document.getElementById("zbody").children[0] ||    document.getElementById("zbody").appendChild(root);        


                
                session.preRendered = DefaultElement;



          } catch (e) {
            if (session.lastError!==0) console.error({e});
            session.preRendered=false;
          }

         
      }`,
    )(importScript, session);

    hydrate();
    return !session.preRendered;
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

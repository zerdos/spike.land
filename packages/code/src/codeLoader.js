

async function transpile(code){
  const { transpileCode } =  await import ("./transpile.js");
return transpileCode(code)
} 
const src =
  "https://unpkg.com/@zedvision/emotion-react-renderer@10.13.3/dist/bundle.js";
let renderEmotion = null;

function getSession() {
  const session = {
    unmount: () => {},
    hydrated: false,
    preRendered: false,
    lastErrors: 0,
    HTML: "",
    ipfs: 0,
    transpiled: "",
    code: "",
  };

  return session;
}

let prettier;
let parserBabel;
let parserHtml;

async function formatter(code) {
  prettier = prettier ||
    (await import("https://unpkg.com/prettier@2.2.1/esm/standalone.mjs"))
      .default;
  parserBabel = parserBabel ||
    (await import("https://unpkg.com/prettier@2.2.1/esm/parser-babel.mjs"))
      .default;
  parserHtml = parserHtml ||
    (await import("https://unpkg.com/prettier@2.2.1/esm/parser-html.mjs"))
      .default;

  try {
    return prettier.format(code, {
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
      plugins: [parserBabel, parserHtml],
    });
  } catch {
    return code;
  }
}

export async function run(mode = "window", _w) {
  console.log("Runner");

  const { document, open } = _w;

  const session = getSession();
  const { getCodeToLoad } = await import("./data.js");
  const { code } = await getCodeToLoad();
  session.code = await formatter(code);
  session.transpiled = await transpile(session.code);

  if (mode === "editor") {
    const { renderDraggableEditor } = await import("./DraggableEditor.js");
    renderDraggableEditor();
  }

  if (mode === "window") {
    const onShare = async () => {
      const { shareItAsHtml } = await import("./share.js");
      const link = await shareItAsHtml(
        { code: session.transpiled, HTML: session.HTML },
      );
      open(link);
    };

    const { renderDraggableWindow } = await import("./DraggableWindow.js");
    await renderDraggableWindow(
      { onShare },
      src,
    );
  }

  const transpiled = await transpile(session.code);
  await restartCode(transpiled);

  const startMonaco = (await import ("https://unpkg.com/@zedvision/smart-monaco-editor@10.13.4/dist/editor.js")).default;

  
  let modules = await startMonaco({
    language: "typescript",
    code: session.code,
    onChange: (code) => runner(code),
  });

  async function runner(c) {
    const cd = await (formatter(c));
    try {
      const transpiled = await transpile(cd);
      if (session.transpiled === transpiled && transpiled !== "") return;
      let restartError = false;
      ///yellow
      if (transpiled.length && session.lastErrors === 0) {
        restartError = await restartCode(transpiled);
      }

      const err = [
        ...(restartError
          ? [
            { messageText: "Error while starting the app. Check the console!" },
          ]
          : []),
        ...([await getErrors(cd)]),
      ];
      if (err.length) console.log({ err });
      if (session.lastErrors && err.length === 0) restartCode(transpiled);
      session.lastErrors = err.length;
      const errorDiv = document.getElementById("error");
      if (err.length === 0 && transpiled.length) {
        session.code = cd;
        if (session.transpiled !== transpiled) {
          session.transpiled = transpiled;
          const { saveCode } = await import("./data.js");
          await saveCode(await formatter(cd), session.transpiled);
        }
      } else {
        session.error = cd;

        const { diff } = await import("https://unpkg.com/@zedvision/diff@10.12.3/dist/diff.min.js")

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

  async function restartCode(transpiled) {
    if (renderEmotion === null) {
      renderEmotion = (await import(src)).renderEmotion;
    }

    let hadError = false;
    if (typeof transpiled !== "string" || transpiled === "") {
      // console.log(transpiled.error);
      hadError = true;
      return hadError;
    }

    const codeToHydrate = mode === "window"
      ? transpiled.replace("body{", "#zbody{")
      : transpiled;

    const root = document.createElement("div");

    const Element = (await import(createJsBlob(
      codeToHydrate,
    ))).default;

    session.unmount();
    session.unmount = renderEmotion(Element(), root);

    document.getElementById("zbody").children.length &&
      document.getElementById("zbody").children[0].remove();
    document.getElementById("zbody").appendChild(root);

    session.HTML = root.innerHTML;

    return !session.HTML;
  }
}
function createJsBlob(code) {
  const blob = new Blob([code], { type: "application/javascript" });

  return URL.createObjectURL(blob);
}

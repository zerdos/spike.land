import * as monaco from "https://raw.githubusercontent.com/microsoft/monaco-editor/master/monaco.d.ts";
import * as AMDLoader from "https://raw.githubusercontent.com/microsoft/vscode-loader/master/src/loader.d.ts";

let editor: monaco.Editor;

const vsPath =
  "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs";
interface StartMonaco {
  onChange: (code: string) => void;
  code: string;
  language: "html" | "javascript" | "typescript";
}

export const startMonaco = async (
  { onChange, code, language }: StartMonaco,
) => {
  if (window["monaco"] === undefined) {
    await loadScript(`${vsPath}/loader.min.js`);
  
    const req = (window as { require: AMDLoader.IRequireFunc }).require;
    req.config({ paths: { "vs": vsPath } });
    await new Promise(resolve => req(["vs/editor/editor.main"], ()=>{
      
      resolve(true);
    }));  }
    else {

      editor.onDidChangeModelContent(() => onChange(editor.getValue()));
      editor.setValue(code);
      return editor;
  }



  editor = window.monaco.editor.create(
    window.document.getElementById("container"),
    {
      cursorStyle: "block",
      formatOnType: true,
      scrollbar: {
        horizontal: "hidden",
        verticalHasArrows: true,
        verticalScrollbarSize: 20,
      },

      minimap: {
        enabled: false,
      },
      folding: false,
      multiCursorModifier: "alt",
      wordWrap: "on",
      wordWrapBreakAfterCharacters: ">([{]))],;}",
      mouseWheelZoom: false,
      wordWrapColumn: 70,

      //       glyphMargin: true,
      automaticLayout: true,
      scrollBeyondLastLine: false,
      autoIndent: "brackets",
      autoClosingQuotes: "always",
      lineNumbers: "off",
      autoClosingBrackets: "always",
      autoClosingOvertype: "always",

      suggest: {},
      codeLens: true,
      autoSurround: "l  anguageDefined",
      // acceptSuggestionOnCommitCharacter: true,
      trimAutoWhitespace: true,
      codeActionsOnSaveTimeout: 100,
      model: window.monaco.editor.createModel(
        code,
        language,
        window.monaco.Uri.parse(
          language === "typescript" ? "file:///main.tsx" : "file:///main.html",
        ),
      ),
      value: code,
      language: language,
      theme: "vs-dark",
    },
  );

  editor.onDidChangeModelContent(() => onChange(editor.getValue()));
  editor.setValue(code);

  window.monaco.languages.typescript.typescriptDefaults
    .setDiagnosticsOptions({
      noSuggestionDiagnostics: true,
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

  if (language === "typescript") {
    const importHelper = [{
      name: "react",
      url: "https://unpkg.com/@types/react@latest/index.d.ts",
      depend: ["global", "csstype", "react-dom", "prop-types"],
    }, {
      name: "global",
      url: "https://unpkg.com/@types/react@latest/global.d.ts",
      depend: [],
    }, {
      name: "prop-types",
      url: "https://unpkg.com/@types/prop-types@latest/index.d.ts",
      depend: [],
    }, {
      name: "react-dom",
      url: "https://unpkg.com/@types/react-dom@latest/index.d.ts",
      depend: [],
    }, {
      name: "csstype",
      url: "https://unpkg.com/csstype@latest/index.d.ts",
      depend: [],
    }];
  
    //# sourceMappingURL=importHelper.js.map
    const dts = importHelper.map(({ name, url }) =>
      (async () =>
        window.monaco.languages.typescript.typescriptDefaults.addExtraLib(
          await (await fetch(
            url,
          )).text(),
          `file:///node_modules/@types/${name}/index.d.ts`,
        ))()
    );

    window.monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
      {
        target: window.monaco.languages.typescript.ScriptTarget.ESNext,
        allowNonTsExtensions: true,
        allowUmdGlobalAccess: true,
        strict: true,
        allowJs: true,
        noEmitOnError: true,
        allowSyntheticDefaultImports: true,
        moduleResolution:
          window.monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        module: window.monaco.languages.typescript.ModuleKind.CommonJS,
        noEmit: true,
        typeRoots: ["node_modules/@types"],
        jsx: window.monaco.languages.typescript.JsxEmit.React,
        jsxFactory: "React.createElement",
        jsxFragmentFactory: "React.Fragment",
        esModuleInterop: true,
      },
    );

    await Promise.all(dts);

    window.monaco.languages.typescript.typescriptDefaults
      .setDiagnosticsOptions({
        noSuggestionDiagnostics: false,
        noSemanticValidation: false,
        noSyntaxValidation: false,
      });

    return editor;
  }
};

function loadScript(src: string) {
  return new Promise(function (resolve, reject) {
    var s;
    s = window.document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    window.document.head.appendChild(s);
  });
}

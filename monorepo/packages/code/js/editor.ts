import * as monaco from "monaco-editor/esm/vs/editor/editor.main";
import "monaco-editor/esm/vs/editor/editor.main";

import codicon from "monaco-editor/esm/vs/base/browser/ui/codicons/codicon/codicon.ttf";
// import { parse } from "@babel/parser";
// import traverse from "@babel/traverse";
// import MonacoJSXHighlighter from "monaco-jsx-highlighter";
// import Buffer from "buffer";

// globalThis.Buffer = Buffer;

const monEnv = {
  getWorkerUrl: function (_workerId: string, label: string) {
    if (label === "typescript" || label === "javascript") {
      return "workers/language/typescript/ts.worker.js";
    }
    return "workers/editor/editor.worker.js";
  },
};

Object.assign(globalThis, { MonacoEnvironment: monEnv });

let started = false;

const returnModules = {
  editor: {} as unknown as ReturnType<typeof monaco.editor.create>,
  monaco,
};

export const startMonaco = async (
  { code, container }: { code: string; container: Element },
) => {
  console.log("monaco-editor");
  if (!started) started = true;
  else return returnModules;
  const shadowRoot = container.attachShadow({
    mode: "open",
  });
  const innerContainer = document.createElement("div");
  shadowRoot.appendChild(innerContainer);
  innerContainer.style.width = "100%";
  innerContainer.style.height = "100%";

  const outerStyle = document.createElement("style");
  outerStyle.innerText = ` @font-face {
    font-family: codicon;
    font-display: block;
    src: url(${codicon}) format("truetype");
}`;
  document.head.appendChild(outerStyle);

  const innerStyle = document.createElement("style");
  innerStyle.innerText = `@import url("starter.css");
  @font-face {
    font-family: codicon;
    font-display: block;
    src: url(${codicon}) format("truetype");
}
  
  `;
  shadowRoot.appendChild(innerStyle);

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES5,
    lib: [
      "dom",
      "dom.iterable",
      "esnext",
    ],
    allowJs: true,
    skipLibCheck: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    strict: true,
    forceConsistentCasingInFileNames: true,
    noFallthroughCasesInSwitch: true,
    resolveJsonModule: true,
    isolatedModules: true,
    noEmit: true,

    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    declaration: false,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    noEmitOnError: true,
    maxNodeModuleJsDepth: 10,

    jsxImportSource: "@emotion/react",
    jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
    allowUmdGlobalAccess: true,
  });

  monaco.languages.typescript.typescriptDefaults
    .setDiagnosticsOptions({
      noSuggestionDiagnostics: true,
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

  const editor = monaco.editor.create(innerContainer, {
    model: monaco.editor.createModel(
      code,
      "typescript",
      monaco.Uri.parse("file:///app/index.tsx"),
    ),
    language: "typescript",
    useShadowDOM: true,
    theme: "vs-dark",
    autoClosingBrackets: "always",
  });

  // const defaultOptions = {
  //   parser: "babel", // for reference only, only babel is supported right now
  //   isHighlightGlyph: false, // if JSX elements should decorate the line number gutter
  //   iShowHover: false, // if JSX types should  tooltip with their type info
  //   isUseSeparateElementStyles: false, // if opening elements and closing elements have different styling
  //   // you can pass your own custom APIs, check core/ and utils/ for more details
  //   monacoEditorManager: null,
  //   decoratorMapper: null,
  //   jsxCommenter: null,
  // };

  // const monacoJSXHighlighter = new MonacoJSXHighlighter(
  //   monaco,
  //   parse,
  //   traverse,
  //   editor,
  //   defaultOptions,
  // );

  // // Activate highlighting (debounceTime default: 100ms)
  // monacoJSXHighlighter.highlightOnDidChangeModelContent(100);
  // // Activate JSX commenting
  // monacoJSXHighlighter.addJSXCommentCommand();

  const throttle = (await import("lodash/throttle")).default;
  window.addEventListener(
    "resize",
    throttle(function () {
      editor.layout();
    }, 200),
  );

  (async () => {
    const { dtsFiles } = await import("./types.mjs");
    const {
      reactDts,
      // jsxDevRuntimeDts,
      jsxRuntimeDts,
      // reactExpDts,
      // globalDts,
      propTypesDts,
      cssTypeDts,
      framerDts,
      emotionStyled,
      emotionStyleBase,
      emotionCache,
      emotionJSXNameSpaceDTS,
      emotionJSXRuntimeDTS,
      emotionReactDts,
      emotionReactCssPropDts,
      emotionReactHelperDts,
      emotionThemingDts,
      emotionSerializeDts,
      emotionUtilsDts,
    } = dtsFiles;
    const importHelper = [
      {
        name: "react",
        url: reactDts,
        depend: ["global", "csstype", "prop-types"],
      },
      {
        name: "react/jsx-runtime",
        url: jsxRuntimeDts,
        depend: ["global", "csstype", "prop-types"],
      },
      {
        name: "react/jsx-dev-runtime",
        url: jsxRuntimeDts,
        depend: ["global", "csstype", "prop-types"],
      },
      // {
      // name: "react-exp",
      // url: reactExpDts,
      // depend: [],
      // },
      // {
      // name: "global",
      // url: globalDts,
      // depend: [],
      // },
      {
        name: "prop-types",
        url: propTypesDts,
        depend: [],
      },
      {
        name: "csstype",
        url: cssTypeDts,
        depend: [],
      },
      {
        name: "@emotion/base",
        url: emotionStyleBase,
        depend: [
          "@emotion/react",
          "@emotion/serialize",
          "react",
        ],
      },
      {
        name: "@emotion/styled",
        url: emotionStyled,
        depend: [
          "@emotion/react",
          "@emotion/serialize",
          "react",
        ],
      },
      {
        name: "@emotion/cache",
        url: emotionCache,
        depend: ["@emotion/utils"],
      },
      {
        name: "@emotion/react",
        url: emotionReactDts,
        depend: ["@emotion/cache"],
      },
      {
        name: "@emotion/react/jsx-runtime",
        url: emotionJSXRuntimeDTS,
        depend: ["@emotion/cache"],
      },
      {
        name: "@emotion/react/jsx-dev-runtime",
        url: emotionJSXRuntimeDTS,
        depend: ["@emotion/cache"],
      },
      {
        name: "@emotion/react/jsx-namespace",
        url: emotionJSXNameSpaceDTS,
        depend: ["@emotion/utils", "type"],
      },
      {
        name: "@emotion/react/theming",
        url: emotionThemingDts,
        depend: ["@emotion/utils", "type"],
      },
      {
        name: "@emotion/react/css-prop",
        url: emotionReactCssPropDts,
        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/react/helper",
        url: emotionReactHelperDts,
        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/serialize",
        url: emotionSerializeDts,

        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/utils",
        url: emotionUtilsDts,
        depend: [],
      },
      {
        name: "framer-motion",
        url: framerDts,
        depend: ["popmotion"],
      },
    ];

    const dts = importHelper.map(({ name, url }) =>
      async () =>
        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          await (await fetch(
            url,
          )).text(),
          `file:///node_modules/${name}/index.d.ts`,
        )
    );

    const pAll = (await (import("p-all"))).default;
    await pAll(dts, { concurrency: 2 });

    monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSuggestionDiagnostics: false,
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });
  })();
  returnModules.editor = editor;

  return returnModules;
};

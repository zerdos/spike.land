import * as monaco from "monaco-editor";
import "monaco-editor/min/vs/editor/editor.main.css";
import { dtsFiles } from "./types.mjs";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import MonacoJSXHighlighter from "monaco-jsx-highlighter";
import Buffer from "buffer";

globalThis.Buffer = Buffer;

import pAll from "p-all";

const {
  reactDts,
  jsxDevRuntimeDts,
  jsxRuntimeDts,
  reactExpDts,
  globalDts,
  propTypesDts,
  cssTypeDts,
  framerDts,
  emotionStyleBase,
  emotionCache,
} = dtsFiles;

self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId: string, label: string) {
    if (label === "typescript" || label === "javascript") {
      return "dist/workers/language/typescript/ts.worker.js";
    }
    return "dist/workers/editor/editor.worker.js";
  },
};

let started = false;

export const startMonaco = async (
  { code, container }: { code: string; container: HTMLDivElement },
) => {
  console.log("monaco-editor");
  if (!started) started = true;
  else return;
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
    src: url(./base/browser/ui/codicons/codicon/codicon.ttf) format("truetype");
}`;
  document.head.appendChild(outerStyle);

  const innerStyle = document.createElement("style");
  innerStyle.innerText = `@import url("dist/starter.css");
  @font-face {
    font-family: codicon;
    font-display: block;
    src: url(./base/browser/ui/codicons/codicon/codicon.ttf) format("truetype");
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
    useShadowDOM: false,
    theme: "vs-dark",
    autoClosingBrackets: "languageDefined",
  });

  const defaultOptions = {
    parser: "babel", // for reference only, only babel is supported right now
    isHighlightGlyph: false, // if JSX elements should decorate the line number gutter
    iShowHover: false, // if JSX types should  tooltip with their type info
    isUseSeparateElementStyles: false, // if opening elements and closing elements have different styling
    // you can pass your own custom APIs, check core/ and uitls/ for more details
    monacoEditorManager: null,
    decoratorMapper: null,
    jsxCommenter: null,
  };

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
        url: jsxDevRuntimeDts,
        depend: ["global", "csstype", "prop-types"],
      },
      {
        name: "react-exp",
        url: reactExpDts,
        depend: [],
      },
      {
        name: "global",
        url: globalDts,
        depend: [],
      },
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
        url: "https://unpkg.com/@emotion/styled@11.8.1/types/index.d.ts",
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
        url: "https://unpkg.com/@emotion/react@11.8.1/types/index.d.ts",
        depend: ["@emotion/cache"],
      },
      {
        name: "@emotion/react/jsx-runtime",
        url: "https://unpkg.com/@emotion/react@11.8.1/types/jsx-runtime.d.ts",
        depend: ["@emotion/cache"],
      },
      {
        name: "@emotion/react/jsx-dev-runtime",
        url:
          "https://unpkg.com/@emotion/react@11.8.1/types/jsx-dev-runtime.d.ts",
        depend: ["@emotion/cache"],
      },
      {
        name: "@emotion/react/jsx-namespace",
        url: "https://unpkg.com/@emotion/react@11.8.1/types/jsx-namespace.d.ts",
        depend: ["@emotion/utils", "type"],
      },
      {
        name: "@emotion/react/theming",
        url: "https://unpkg.com/@emotion/react@11.8.1/types/theming.d.ts",
        depend: ["@emotion/utils", "type"],
      },
      {
        name: "@emotion/react/css-prop",
        url: "https://unpkg.com/@emotion/react@11.8.1/types/css-prop.d.ts",
        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/react/helper",
        url: "https://unpkg.com/@emotion/react@11.8.1/types/helper.d.ts",
        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/serialize",
        url: "https://unpkg.com/@emotion/serialize@1.0.2/types/index.d.ts",

        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/utils",
        url: "https://unpkg.com/@emotion/utils@1.1.0/types/index.d.ts",
        depend: [],
      },
      {
        name: "framer-motion",
        url: framerDts,
        depend: ["popmotion"],
      },
      {
        name: "popmotion",
        url: "https://unpkg.com/popmotion@11.0.3/lib/index.d.ts",
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

    await pAll(dts, { concurrency: 2 });

    monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSuggestionDiagnostics: false,
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });
  })();

  // return modules;
  return { editor, monaco: { ...monaco } };
};

// modules.monacoTs.languages.typescript.typescriptDefaults.setCompilerOptions({
//     target: 99,
//     allowNonTsExtensions: true,
//     allowUmdGlobalAccess: true,
//     strict: true,
//     allowJs: true,
//     noEmitOnError: true,
//     allowSyntheticDefaultImports: true,
//     moduleResolution: 2, //nodeJS
//     module: 99,
//     noEmit: true,

//     typeRoots: ["node_modules/@types"],
// jsx: 3,
//     esModuleInterop: true,
//   });
// );
//};

// function isMobile() {
//   if (typeof window === "undefined") {
//     return false;
//   }

//   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
//     .test(
//       window.navigator.userAgent,
//     );
// }

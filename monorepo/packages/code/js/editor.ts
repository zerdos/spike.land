import { monaco as monacoTs } from "./vendor/monaco/monacoTs.js";
import type * as Monaco from "monaco-editor";
import pAll from "p-all";
import tsWorkerUrl from "./dist/workers/monaco-editor/esm/vs/language/typescript/ts.worker.js";

self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId: string, label: string) {
    // if (label === "json") {
    //   return "./vendor/language/json/json.worker.js";
    // }
    // if (label === "css" || label === "scss" || label === "less") {
    //   return "./vendor/language/css/css.worker.js";
    // }
    // if (label === "html" || label === "handlebars" || label === "razor") {
    //   return "./vendor/vendor/language/html/html.worker.js";
    // }

    return tsWorkerUrl;
  },
} as Monaco.Environment;

const monaco = {
  editor: monacoTs.editor as typeof Monaco.editor,
  Uri: monacoTs.Uri as unknown as typeof Monaco.Uri,

  languages: {
    typescript: monacoTs.languages
      .typescript as typeof Monaco.languages.typescript,
  },
};

export const startMonaco = async (
  { code, container }: { code: string; container: HTMLDivElement },
) => {
  // const {monaco} = window as unknown as {monaco: typeof m}
  // const modelUri = monacoTs.Uri.parse(
  //   language === "typescript" ? "/index.ts" : "/main.html",
  // );

  // const model = monacoTs.editor.createModel(
  //     code,
  //     language,
  //     modelUri,
  //   );

  // const model = modules.editor.getModel("/index.ts") || createModel();

  // const shadowRoot = container.attachShadow({
  //   mode: "open",
  // });

  // const innerContainer = document.createElement("div");
  // shadowRoot.appendChild(innerContainer);
  // const parent = container.parentElement;
  // if (parent) {
  //   const { width, height } = container.getClientRects()[0];
  //   innerContainer.style.width = `${Math.min(window.innerWidth, width)}px`;
  //   innerContainer.style.height = `${height}px`;
  // }

  // const innerStyle = document.createElement("style");
  // innerStyle.innerText =
  //   '@import "https://unpkg.com/monaco-editor@0.30.1/min/vs/editor/editor.main.css";';
  // shadowRoot.appendChild(innerStyle);

  // const customWorker = { customWorkerPath: window.location.href + "js/workers/custom-worker.js" };
  // monacoTs.languages.typescript.typescriptDefaults.setWorkerOptions(customWorker);
  monaco.editor.createModel("declare ");
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: 99,
    lib: [
      "DOM",
      "ES2018",
    ],

    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    declaration: false,
    noEmit: true,
    noEmitOnError: true,
    // jsxFactory: "jsx",
    allowJs: true,
    maxNodeModuleJsDepth: 10,
    jsxImportSource: "@emotion/react",
    jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
    skipLibCheck: false,
    // esModuleInterop: true,
    // allowSyntheticDefaultImports: true,
    allowUmdGlobalAccess: true,
    // allowUmdGlobalAccess : true,
    // noLibCheck: t,
  });

  monaco.languages.typescript.typescriptDefaults
    .setDiagnosticsOptions({
      noSuggestionDiagnostics: true,
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

  const editor = monaco.editor.create(container, {
    model: monaco.editor.createModel(
      code,
      "typescript",
      monaco.Uri.parse("file:///app/index.tsx"),
    ),
    // lightbulb: { enabled: false },
    language: "typescript",

    theme: "vs-dark",
    // codeLens: false,
    // suggest: {
    //   showStatusBar: false,
    //   preview: false,
    // },
    // smoothScrolling: true,
    // scrollPredominantAxis: true,
    // scrollbar: {
    //   handleMouseWheel: true,
    //   alwaysConsumeMouseWheel: false,
    //   horizontal: "auto",
    //   vertical: "auto",
    //   useShadows: true,
    // },
    // selectionHighlight: true,
    // selectOnLineNumbers: true,
    // cursorSmoothCaretAnimation: true,
    // cursorBlinking: "smooth",
    // hideCursorInOverviewRuler: true,
    // cursorSurroundingLinesStyle: "all",
    // cursorSurroundingLines: 4,

    // formatOnPaste: true,
    // formatOnType: true,

    useShadowDOM: false,
  });

  // const { AutoTypings, LocalStorageCache } = await import(
  //   "@spike.land/monaco-editor-auto-typings"
  // );

  // const autoTypings = AutoTypings.create(editor, monacoTs.languages, {
  //   sourceCache: new LocalStorageCache(), // Cache loaded sources in localStorage. May be omitted
  //   // Other options...
  // });

  // monacoTs.editor.create(
  //   innerContainer,
  //   {
  //     formatOnType: false,

  //     scrollbar: {
  //       // Subtle shadows to the left & top. Defaults to true.
  //       useShadows: false,

  //       // Render vertical arrows. Defaults to false.
  //       verticalHasArrows: true,
  //       // Render horizontal arrows. Defaults to false.
  //       horizontalHasArrows: true,

  //       // Render vertical scrollbar.
  //       // Accepted values: 'auto', 'visible', 'hidden'.
  //       // Defaults to 'auto'
  //       vertical: "visible",
  //       // Render horizontal scrollbar.
  //       // Accepted values: 'auto', 'visible', 'hidden'.
  //       // Defaults to 'auto'
  //       horizontal: "visible",

  //       verticalScrollbarSize: 17,
  //       horizontalScrollbarSize: 17,
  //       arrowSize: 30,
  //     },
  //     minimap: {
  //       enabled: true,
  //       side: "right",
  //       size: "fit",
  //       showSlider: "always",
  //     },
  //     folding: true,
  //     glyphMargin: false,
  //     wordWrap: "off",
  //     showUnused: true,

  //     //       glyphMargin: true,
  //     scrollBeyondLastLine: false,
  //     autoClosingQuotes: "beforeWhitespace",
  //     padding: {
  //       bottom: 300,
  //     },
  //     lineNumbers: "on", //isMobile() ? "off" : "on",

  //     autoClosingBrackets: "beforeWhitespace",

  //     smartSelect: {
  //       selectLeadingAndTrailingWhitespace: true,
  //     },
  //     autoClosingOvertype: "auto",

  //     suggest: {},
  //     codeLens: true,
  //     autoSurround: "languageDefined",
  //     // acceptSuggestionOnCommitCharacter: true,
  //     trimAutoWhitespace: false,
  //     codeActionsOnSaveTimeout: 100,
  //     model,
  //     value: code,
  //     language: language,
  //     theme: "vs-dark",
  //     ...options,
  //   },
  // ),
  //};

  // function getDefaultComplierOpts() {
  //   return { target: 99, jsx: 1, allowNonTsExtensions: true };
  // }

  window.addEventListener("resize", () => {
    // const { width, height } = container.getClientRects()[0];
    // innerContainer.style.width = `${Math.min(window.innerWidth, width)}px`;
    // innerContainer.style.height = `${Math.min(window.innerHeight, height)}px`;

    editor.layout();
  });

  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `export interface RegisteredCache {
      [key: string]: string
    }
    
    export interface StyleSheet {
      container: HTMLElement
      nonce?: string
      key: string
      insert(rule: string): void
      flush(): void
      tags: Array<HTMLStyleElement>
    }
    
    export interface EmotionCache {
      inserted: {
        [key: string]: string | true
      }
      registered: RegisteredCache
      sheet: StyleSheet
      key: string
      compat?: true
      nonce?: string
      insert(
        selector: string,
        serialized: SerializedStyles,
        sheet: StyleSheet,
        shouldCache: boolean
      ): string | void
    }
    
    export interface SerializedStyles {
      name: string
      styles: string
      map?: string
      next?: SerializedStyles
    }
    
    export const isBrowser: boolean
    export function getRegisteredStyles(
      registered: RegisteredCache,
      registeredStyles: Array<string>,
      classNames: string
    ): string
    export function insertStyles(
      cache: EmotionCache,
      serialized: SerializedStyles,
      isStringTag: boolean
    ): string | void`,
    "/app/types/emotionu/index.d.ts",
  );

  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `export const i: number;`,
    "file:///node_modules/@types/zozi/index.d.ts",
  );

  setTimeout(async () => {
    const importHelper = [
      {
        name: "react",
        url: "https://unpkg.com/@types/react@17.0.38/index.d.ts",
        depend: ["global", "csstype", "react-dom", "prop-types"],
      },
      {
        name: "react/jsx-dev-runtime",
        url: "https://unpkg.com/@types/react@17.0.38/jsx-dev-runtime.d.ts",
        depend: ["global", "csstype", "react-dom", "prop-types"],
      },
      {
        name: "react-exp",
        url: "https://unpkg.com/@types/react@17.0.38/experimental.d.ts",
        depend: [],
      },
      {
        name: "global",
        url: "https://unpkg.com/@types/react@17.0.38/global.d.ts",
        depend: [],
      },
      {
        name: "prop-types",
        url: "https://unpkg.com/@types/prop-types@15.7.4/index.d.ts",
        depend: [],
      },
      {
        name: "react-dom",
        url: "https://unpkg.com/@types/react-dom@17.0.11/index.d.ts",
        depend: [],
      },
      {
        name: "csstype",
        url: "https://unpkg.com/csstype@3.0.9/index.d.ts",
        depend: [],
      },
      {
        name: "@emotion/base",
        url: "https://unpkg.com/@emotion/styled@11.6.0/types/base.d.ts",
        depend: [
          "@emotion/react",
          "@emotion/serialize",
          "react",
        ],
      },
      {
        name: "@emotion/styled",
        url: "https://unpkg.com/@emotion/styled@11.6.0/types/index.d.ts",
        depend: [
          "@emotion/react",
          "@emotion/serialize",
          "react",
        ],
      },
      {
        name: "@emotion/cache",
        url: "https://unpkg.com/@emotion/cache@11.6.0/types/index.d.ts",
        depend: ["@emotion/utils"],
      },
      {
        name: "@emotion/react",
        url: "https://unpkg.com/@emotion/react@11.7.0/types/index.d.ts",
        depend: ["@emotion/cache"],
      },
      {
        name: "@emotion/react/jsx-runtime",
        url:
          "https://unpkg.com/@emotion/react@11.7.1/types/jsx-dev-runtime.d.ts",
        depend: ["@emotion/cache"],
      },
      {
        name: "@emotion/react/jsx-namespace",
        url: "https://unpkg.com/@emotion/react@11.7.1/types/jsx-namespace.d.ts",
        depend: ["@emotion/utils", "type"],
      },
      {
        name: "@emotion/react/css-prop",
        url: "https://unpkg.com/@emotion/react@11.7.0/types/css-prop.d.ts",
        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/react/helper",
        url: "https://unpkg.com/@emotion/react@11.7.0/types/helper.d.ts",
        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/theming",
        url: "https://unpkg.com/@emotion/react@11.7.0/types/theming.d.ts",
        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/serialize",
        url: "https://unpkg.com/@emotion/serialize@1.0.2/types/index.d.ts",

        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/utils",
        url: "https://unpkg.com/@emotion/utils@1.0.0/types/index.d.ts",
        depend: [],
      },
      {
        name: "framer-motion",
        url: "https://unpkg.com/framer-motion@6.2.1/types/index.d.ts",
        depend: ["popmotion"],
      },
      {
        name: "framer-motion/types/render/dom/motion",
        url:
          " https://unpkg.com/framer-motion@6.2.1/types/render/dom/motion.d.ts",
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
  }, 100);

  // return modules;
  return { editor, monaco };
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

function isMobile() {
  if (typeof window === "undefined") {
    return false;
  }

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    .test(
      window.navigator.userAgent,
    );
}

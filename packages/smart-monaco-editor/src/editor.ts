import { getMonaco } from "./monaco.js";
import type * as monaco from "monaco-editor";

import pAll from "p-all";

interface StartMonacoProps {
  onChange: (code: string, e: monaco.editor.IModelContentChangedEvent) => void;
  code: string;
  container: HTMLElement;
  language: "html" | "javascript" | "typescript";
  options: {
    gylph: boolean;
  };
}

let monacoProm = getMonaco();

export const loadMonaco = () => {
  if (!monacoProm) monacoProm = getMonaco();
  return monacoProm;
};

export default async (
  { onChange, code, language, container, options }: StartMonacoProps,
) => {
  const monaco = await monacoProm;
  const modelUri = monaco.Uri.parse(
    language === "typescript" ? "file:///main.tsx" : "file:///main.html",
  );

  const createModel = () =>
    //@ts-ignore
    monaco.editor.createModel(
      code,
      language,
      modelUri,
    );

  const getModel = () => {
    try {
      let model = monaco.editor.getModel();
      if (model) return model;
      return createModel();
    } catch {
      return createModel();
    }
  };

  const model = getModel();

  const shadowRoot = container.attachShadow({
    mode: "closed",
  });

  const innerContainer = document.createElement("div");
  shadowRoot.appendChild(innerContainer);
  const parent = container.parentElement;
  if (parent) {
    const { width, height } = parent.getClientRects()[0];
    innerContainer.style.width = `${Math.min(window.innerWidth, width)}px`;
    innerContainer.style.height = `${height}px`;

    window.addEventListener("resize", (ev) => {
      const { width, height } = parent.getClientRects()[0];
      innerContainer.style.width = `${Math.min(window.innerWidth, width)}px`;
      innerContainer.style.height = `${height}px`;
    });
  }
  const innerStyle = document.createElement("style");
  innerStyle.innerText =
    '@import "https://unpkg.com/monaco-editor@0.30.1/min/vs/editor/editor.main.css";';
  shadowRoot.appendChild(innerStyle);

  if (!container) return;

  const modules = {
    monaco: monaco,
    //@ts-ignore
    editor: monaco.editor.create(
      innerContainer,
      {
        formatOnType: false,

        scrollbar: {
          // Subtle shadows to the left & top. Defaults to true.
          useShadows: false,

          // Render vertical arrows. Defaults to false.
          verticalHasArrows: true,
          // Render horizontal arrows. Defaults to false.
          horizontalHasArrows: true,

          // Render vertical scrollbar.
          // Accepted values: 'auto', 'visible', 'hidden'.
          // Defaults to 'auto'
          vertical: "visible",
          // Render horizontal scrollbar.
          // Accepted values: 'auto', 'visible', 'hidden'.
          // Defaults to 'auto'
          horizontal: "visible",

          verticalScrollbarSize: 17,
          horizontalScrollbarSize: 17,
          arrowSize: 30,
        },
        minimap: {
          enabled: true,
          side: "right",
          size: "fit",
          showSlider: "always",
        },
        folding: true,
        glyphMargin: false,
        wordWrap: "off",
        showUnused: true,

        //       glyphMargin: true,
        scrollBeyondLastLine: false,
        autoClosingQuotes: "beforeWhitespace",
        padding: {
          bottom: 300,
        },
        lineNumbers: "on", //isMobile() ? "off" : "on",

        autoClosingBrackets: "beforeWhitespace",

        smartSelect: {
          selectLeadingAndTrailingWhitespace: true,
        },
        autoClosingOvertype: "auto",

        suggest: {},
        codeLens: true,
        autoSurround: "languageDefined",
        // acceptSuggestionOnCommitCharacter: true,
        trimAutoWhitespace: false,
        codeActionsOnSaveTimeout: 100,
        model,
        value: code,
        language: language,
        theme: "vs-dark",
        ...options,
      },
    ),
  };

  window.addEventListener("resize", () => {
    modules.editor.layout();
  });
  modules.editor.onDidChangeModelContent((
    e: monaco.editor.IModelContentChangedEvent,
  ) => onChange(modules.editor.getValue(), e));

  modules.monaco.languages.typescript.typescriptDefaults
    .setDiagnosticsOptions({
      noSuggestionDiagnostics: true,
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

  if (language === "typescript") {
    const importHelper = [
      {
        name: "react",
        url: "https://unpkg.com/@types/react@17.0.34/index.d.ts",
        depend: ["global", "csstype", "react-dom", "prop-types"],
      },
      {
        name: "react/jsx-dev-runtime",
        url: "https://unpkg.com/@types/react@17.0.34/jsx-dev-runtime.d.ts",
        depend: ["global", "csstype", "react-dom", "prop-types"],
      },
      {
        name: "react-exp",
        url: "https://unpkg.com/@types/react@17.0.34/experimental.d.ts",
        depend: [],
      },
      {
        name: "global",
        url: "https://unpkg.com/@types/react@17.0.34/global.d.ts",
        depend: [],
      },
      {
        name: "prop-types",
        url: "https://unpkg.com/@types/prop-types@15.7.2/index.d.ts",
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
        name: "@emotion/styled/base.d.ts",
        url: "https://unpkg.com/@emotion/styled@11.6.0/types/base.d.ts",
        depend: [
          "@emotion/react",
          "@emotion/serialize",
          "react",
        ],
      },
      {
        name: "@emotion/styled/index.d.ts",
        url: "https://unpkg.com/@emotion/styled@11.6.0/types/index.d.ts",
        depend: [
          "@emotion/react",
          "@emotion/serialize",
          "react",
        ],
      },
      {
        name: "@emotion/cache/index.d.ts",
        url: "https://unpkg.com/@emotion/cache@11.6.0/types/index.d.ts",
        depend: ["@emotion/utils"],
      },
      {
        name: "@emotion/react/index.d.ts",
        url: "https://unpkg.com/@emotion/react@11.6.0/types/index.d.ts",
        depend: ["@emotion/cache"],
      },
      {
        name: "@emotion/react/jsx-namespace.d.ts",
        url: "https://unpkg.com/@emotion/react@11.6.0/types/jsx-namespace.d.ts",
        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/react/css-prop.d.ts",
        url: "https://unpkg.com/@emotion/react@11.5.0/types/css-prop.d.ts",
        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/react/helper.d.ts",
        url: "https://unpkg.com/@emotion/react@11.5.0/types/helper.d.ts",
        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/react/theming.d.ts",
        url: "https://unpkg.com/@emotion/react@11.5.0/types/theming.d.ts",
        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/serialize/index.d.ts",
        url: "https://unpkg.com/@emotion/serialize@1.0.2/types/index.d.ts",

        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/utils/index.d.ts",
        url: "https://unpkg.com/@emotion/utils@1.0.0/types/index.d.ts",
        depend: [],
      },
      {
        name: "framer-motion",
        url: "https://unpkg.com/framer-motion@5.3.0/types/index.d.ts",
        depend: ["popmotion"],
      },
      {
        name: "popmotion",
        url: "https://unpkg.com/popmotion@11.0.0/lib/index.d.ts",
      },
    ];
    const dts = importHelper.map(({ name, url }) =>
      async () =>
        modules.monaco.languages.typescript.typescriptDefaults.addExtraLib(
          await (await fetch(
            url,
          )).text(),
          name.includes("@")
            ? `file:///node_modules/${name}`
            : `file:///node_modules/@types/${name}/index.d.ts`,
        )
    );

    modules.monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
      {
        target: 99,
        allowNonTsExtensions: true,
        allowUmdGlobalAccess: true,
        strict: true,
        allowJs: true,
        noEmitOnError: true,
        allowSyntheticDefaultImports: true,
        moduleResolution: 2, //nodeJS
        module: 99,
        noEmit: true,

        typeRoots: ["node_modules/@types"],
        jsx: 5,
        esModuleInterop: true,
      },
    );

    await pAll(dts, { concurrency: 2 });

    modules.monaco.languages.typescript.typescriptDefaults
      .setDiagnosticsOptions({
        noSuggestionDiagnostics: false,
        noSemanticValidation: false,
        noSyntaxValidation: false,
      });
    return modules;
  }
};

function isMobile() {
  if (typeof window === "undefined") {
    return false;
  }

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    .test(
      window.navigator.userAgent,
    );
}

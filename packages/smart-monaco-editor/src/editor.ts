import { getMonaco } from "./monaco.js";

interface StartMonacoProps {
  onChange: (code: string) => void;
  code: string;
  container: HTMLElement;
  language: "html" | "javascript" | "typescript";
  options: {
    gylph: boolean;
  };
}

export default async (
  { onChange, code, language, container, options }: StartMonacoProps,
) => {
  const monaco = await getMonaco();
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

  if (!container) return;

  const modules = {
    monaco: monaco,
    //@ts-ignore
    editor: monaco.editor.create(
      container,
      {
        formatOnType: false,
        scrollbar: {
          horizontal: "hidden",
          verticalHasArrows: true,
          verticalScrollbarSize: 20,
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
        mouseWheelZoom: false,
        wordWrapColumn: 80,
        useTabStops: false,
        dragAndDrop: true,
        disableLayerHinting: true,
        formatOnPaste: false,
        showUnused: true,

        //       glyphMargin: true,
        automaticLayout: true,
        scrollBeyondLastLine: false,
        autoIndent: "full",
        accessibilitySupport: "off",
        autoClosingQuotes: "beforeWhitespace",
        padding: {
          bottom: 300,
        },
        lineNumbers: "on",

        autoClosingBrackets: "beforeWhitespace",

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

  modules.editor.onDidChangeModelContent(() =>
    onChange(modules.editor.getValue())
  );

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
        url: "https://unpkg.com/@types/react@17.0.5/index.d.ts",
        depend: ["global", "csstype", "react-dom", "prop-types"],
      },
      {
        name: "react/jsx-dev-runtime",
        url: "https://unpkg.com/@types/react@17.0.5/jsx-dev-runtime.d.ts",
        depend: ["global", "csstype", "react-dom", "prop-types"],
      },
      {
        name: "react-exp  ",
        url: "https://unpkg.com/@types/react@17.0.5/experimental.d.ts",
        depend: [],
      },
      {
        name: "global",
        url: "https://unpkg.com/@types/react@17.0.5/global.d.ts",
        depend: [],
      },
      {
        name: "prop-types",
        url: "https://unpkg.com/@types/prop-types@15.7.3/index.d.ts",
        depend: [],
      },
      {
        name: "react-dom",
        url: "https://unpkg.com/@types/react-dom@17.0.4/index.d.ts",
        depend: [],
      },
      {
        name: "csstype",
        url: "https://unpkg.com/csstype@3.0.8/index.d.ts",
        depend: [],
      },
      {
        name: "@emotion/styled/base.d.ts",
        url: "https://unpkg.com/@emotion/styled@11.3.0/types/base.d.ts",
        depend: [
          "@emotion/react",
          "@emotion/serialize",
          "react",
        ],
      },
      {
        name: "@emotion/styled/index.d.ts",
        url: "https://unpkg.com/@emotion/styled@11.3.0/types/index.d.ts",
        depend: [
          "@emotion/react",
          "@emotion/serialize",
          "react",
        ],
      },
      {
        name: "@emotion/cache/index.d.ts",
        url: "https://unpkg.com/@emotion/cache@11.4.0/types/index.d.ts",
        depend: ["@emotion/utils"],
      },
      {
        name: "@emotion/react/index.d.ts",
        url: "https://unpkg.com/@emotion/react@11.4.0/types/index.d.ts",
        depend: ["@emotion/cache"],
      },
      {
        name: "@emotion/react/jsx-namespace.d.ts",
        url: "https://unpkg.com/@emotion/react@11.4.0/types/jsx-namespace.d.ts",
        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/react/css-prop.d.ts",
        url: "https://unpkg.com/@emotion/react@11.4.0/types/css-prop.d.ts",
        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/react/helper.d.ts",
        url: "https://unpkg.com/@emotion/react@11.4.0/types/helper.d.ts",
        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/react/theming.d.ts",
        url: "https://unpkg.com/@emotion/react@11.4.0/types/theming.d.ts",
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
        url: "https://unpkg.com/framer-motion@4.1.11/dist/framer-motion.d.ts",
        depend: ["popmotion"],
      },
      {
        name: "popmotion",
        url: "https://unpkg.com/popmotion@9.3.6/lib/index.d.ts",
      },
    ];
    const dts = importHelper.map(({ name, url }) =>
      (async () =>
        modules.monaco.languages.typescript.typescriptDefaults.addExtraLib(
          await (await fetch(
            url,
          )).text(),
          name.includes("@")
            ? `file:///node_modules/${name}`
            : `file:///node_modules/@types/${name}/index.d.ts`,
        ))()
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

    await Promise.all(dts);

    modules.monaco.languages.typescript.typescriptDefaults
      .setDiagnosticsOptions({
        noSuggestionDiagnostics: false,
        noSemanticValidation: false,
        noSyntaxValidation: false,
      });
    return modules;
  }
};

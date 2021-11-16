// src/monaco.js
var getMonaco = async () => {
  const importScript = (src, res = []) => {
    if (typeof window === "undefined")
      return {};
    return window.document.head.querySelector(`script[src="${src}"]`) && window || new Promise(function(resolve, reject) {
      const s = window.document.createElement("script");
      s.src = src;
      s.async = "async";
      s.type = "application/javascript";
      s.onload = () => {
        if (res.length === 0) {
          resolve(window);
        }
        const ret = {};
        res.forEach((x) => Object.assign(ret, window[x]));
        resolve(ret);
      };
      s.onerror = reject;
      window.document.head.appendChild(s);
    });
  };
  const vsPath = `https://unpkg.com/monaco-editor@0.30.1/min/vs`;
  const { require: require2 } = await importScript(`${vsPath}/loader.js`);
  require2.config({ paths: { "vs": vsPath } });
  const monaco = await new Promise((resolve) => require2(["vs/editor/editor.main"], (_m) => resolve(_m)));
  return monaco;
};

// src/editor.ts
var monacoProm = getMonaco();
var loadMonaco = () => {
  if (!monacoProm)
    monacoProm = getMonaco();
  return monacoProm;
};
var editor_default = async ({ onChange, code, language, container, options }) => {
  const monaco = await monacoProm;
  const modelUri = monaco.Uri.parse(language === "typescript" ? "file:///main.tsx" : "file:///main.html");
  const createModel = () => monaco.editor.createModel(code, language, modelUri);
  const getModel = () => {
    try {
      let model2 = monaco.editor.getModel();
      if (model2)
        return model2;
      return createModel();
    } catch (e) {
      return createModel();
    }
  };
  const model = getModel();
  if (!container)
    return;
  const modules = {
    monaco,
    editor: monaco.editor.create(container, {
      formatOnType: false,
      scrollbar: {
        horizontal: "hidden",
        verticalHasArrows: true,
        verticalScrollbarSize: 20
      },
      minimap: {
        enabled: true,
        side: "right",
        size: "fit",
        showSlider: "always"
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
      automaticLayout: true,
      scrollBeyondLastLine: false,
      autoIndent: "full",
      accessibilitySupport: "off",
      autoClosingQuotes: "beforeWhitespace",
      padding: {
        bottom: 300
      },
      lineNumbers: "on",
      autoClosingBrackets: "beforeWhitespace",
      autoClosingOvertype: "auto",
      suggest: {},
      codeLens: true,
      autoSurround: "languageDefined",
      trimAutoWhitespace: false,
      codeActionsOnSaveTimeout: 100,
      model,
      value: code,
      language,
      theme: "vs-dark",
      ...options
    })
  };
  modules.editor.onDidChangeModelContent((e) => onChange(modules.editor.getValue(), e));
  modules.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSuggestionDiagnostics: true,
    noSemanticValidation: true,
    noSyntaxValidation: true
  });
  if (language === "typescript") {
    const importHelper = [
      {
        name: "react",
        url: "https://unpkg.com/@types/react@17.0.34/index.d.ts",
        depend: ["global", "csstype", "react-dom", "prop-types"]
      },
      {
        name: "react/jsx-dev-runtime",
        url: "https://unpkg.com/@types/react@17.0.34/jsx-dev-runtime.d.ts",
        depend: ["global", "csstype", "react-dom", "prop-types"]
      },
      {
        name: "react-exp",
        url: "https://unpkg.com/@types/react@17.0.34/experimental.d.ts",
        depend: []
      },
      {
        name: "global",
        url: "https://unpkg.com/@types/react@17.0.34/global.d.ts",
        depend: []
      },
      {
        name: "prop-types",
        url: "https://unpkg.com/@types/prop-types@15.7.2/index.d.ts",
        depend: []
      },
      {
        name: "react-dom",
        url: "https://unpkg.com/@types/react-dom@17.0.11/index.d.ts",
        depend: []
      },
      {
        name: "csstype",
        url: "https://unpkg.com/csstype@3.0.9/index.d.ts",
        depend: []
      },
      {
        name: "@emotion/styled/base.d.ts",
        url: "https://unpkg.com/@emotion/styled@11.6.0/types/base.d.ts",
        depend: [
          "@emotion/react",
          "@emotion/serialize",
          "react"
        ]
      },
      {
        name: "@emotion/styled/index.d.ts",
        url: "https://unpkg.com/@emotion/styled@11.6.0/types/index.d.ts",
        depend: [
          "@emotion/react",
          "@emotion/serialize",
          "react"
        ]
      },
      {
        name: "@emotion/cache/index.d.ts",
        url: "https://unpkg.com/@emotion/cache@11.6.0/types/index.d.ts",
        depend: ["@emotion/utils"]
      },
      {
        name: "@emotion/react/index.d.ts",
        url: "https://unpkg.com/@emotion/react@11.6.0/types/index.d.ts",
        depend: ["@emotion/cache"]
      },
      {
        name: "@emotion/react/jsx-namespace.d.ts",
        url: "https://unpkg.com/@emotion/react@11.6.0/types/jsx-namespace.d.ts",
        depend: ["@emotion/utils", "csstype"]
      },
      {
        name: "@emotion/react/css-prop.d.ts",
        url: "https://unpkg.com/@emotion/react@11.5.0/types/css-prop.d.ts",
        depend: ["@emotion/utils", "csstype"]
      },
      {
        name: "@emotion/react/helper.d.ts",
        url: "https://unpkg.com/@emotion/react@11.5.0/types/helper.d.ts",
        depend: ["@emotion/utils", "csstype"]
      },
      {
        name: "@emotion/react/theming.d.ts",
        url: "https://unpkg.com/@emotion/react@11.5.0/types/theming.d.ts",
        depend: ["@emotion/utils", "csstype"]
      },
      {
        name: "@emotion/serialize/index.d.ts",
        url: "https://unpkg.com/@emotion/serialize@1.0.2/types/index.d.ts",
        depend: ["@emotion/utils", "csstype"]
      },
      {
        name: "@emotion/utils/index.d.ts",
        url: "https://unpkg.com/@emotion/utils@1.0.0/types/index.d.ts",
        depend: []
      },
      {
        name: "framer-motion",
        url: "https://unpkg.com/framer-motion@5.3.0/types/index.d.ts",
        depend: ["popmotion"]
      },
      {
        name: "popmotion",
        url: "https://unpkg.com/popmotion@11.0.0/lib/index.d.ts"
      }
    ];
    const dts = importHelper.map(({ name, url }) => (async () => modules.monaco.languages.typescript.typescriptDefaults.addExtraLib(await (await fetch(url)).text(), name.includes("@") ? `file:///node_modules/${name}` : `file:///node_modules/@types/${name}/index.d.ts`))());
    modules.monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: 99,
      allowNonTsExtensions: true,
      allowUmdGlobalAccess: true,
      strict: true,
      allowJs: true,
      noEmitOnError: true,
      allowSyntheticDefaultImports: true,
      moduleResolution: 2,
      module: 99,
      noEmit: true,
      typeRoots: ["node_modules/@types"],
      jsx: 5,
      esModuleInterop: true
    });
    await Promise.all(dts);
    modules.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSuggestionDiagnostics: false,
      noSemanticValidation: false,
      noSyntaxValidation: false
    });
    return modules;
  }
};
export {
  editor_default as default,
  loadMonaco
};

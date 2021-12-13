// src/monaco.js
var exp = {
  monaco: null
};
var getMonaco = async () => {
  if (exp.monaco)
    return exp.monaco;
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
  const vsPath = `https://unpkg.com/monaco-editor@0.31.0/min/vs`;
  const { require: require2 } = await importScript(`${vsPath}/loader.js`);
  require2.config({ paths: { "vs": vsPath }, "vs/css": { disabled: true } });
  exp.monaco = await new Promise((resolve) => require2(["vs/editor/editor.main"], (_m) => resolve(_m)));
  return exp.monaco;
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
  const shadowRoot = container.attachShadow({
    mode: "closed"
  });
  const innerContainer = document.createElement("div");
  shadowRoot.appendChild(innerContainer);
  const parent = container.parentElement;
  if (parent) {
    const { width, height } = parent.getClientRects()[0];
    innerContainer.style.width = `${Math.min(window.innerWidth, width)}px`;
    innerContainer.style.height = `${height}px`;
    window.addEventListener("resize", (ev) => {
      const { width: width2, height: height2 } = parent.getClientRects()[0];
      innerContainer.style.width = `${Math.min(window.innerWidth, width2)}px`;
      innerContainer.style.height = `${height2}px`;
    });
  }
  const innerStyle = document.createElement("style");
  innerStyle.innerText = '@import "https://unpkg.com/monaco-editor@0.30.1/min/vs/editor/editor.main.css";';
  shadowRoot.appendChild(innerStyle);
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({ target: 99, jsx: 1, allowNonTsExtensions: true, declaration: true, noLibCheck: true });
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSuggestionDiagnostics: true,
    noSemanticValidation: true,
    noSyntaxValidation: true
  });
  const { Uri } = monaco;
  const editor = monaco.editor.create(innerContainer, {
    model: monaco.editor.createModel(code, "typescript", Uri.file("/index.ts")),
    lightbulb: { enabled: true },
    theme: "vs-dark",
    useShadowDOM: true
  });
  function getDefaultComplierOpts() {
    return { target: 99, jsx: 1, allowNonTsExtensions: true };
  }
  window.addEventListener("resize", () => {
    editor.layout();
  });
  editor.onDidChangeModelContent((e) => onChange(editor.getValue(), e));
  return {
    monaco,
    editor
  };
};
export {
  editor_default as default,
  loadMonaco
};

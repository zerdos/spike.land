export const importSpecificVersion = (version)=>Function(`return import('https://unpkg.com/smart-monaco-editor@${version}/lib/editor.js`)
;
export const startMonaco = async ({ onChange , code , language  })=>{
    const monacoLang = language || "typescript";
    if (window && window["monaco"] && window["monaco"]["editor"]) {
        return window["monaco"]["editor"];
    }
    return new Promise(async function(resolve) {
        if (window["monaco"]) return window["monaco"];
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs/loader.min.js");
        const vsPath = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs";
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs/loader.min.js");
        require.config({
            paths: {
                "vs": "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs"
            }
        });
        require([
            "vs/editor/editor.main"
        ], async function() {
            const monaco = window.monaco;
            const editor = monaco.editor.create(window.document.getElementById("container"), {
                cursorStyle: "block",
                formatOnType: true,
                scrollbar: {
                    horizontal: "hidden",
                    verticalHasArrows: true,
                    verticalScrollbarSize: 20
                },
                minimap: {
                    enabled: false
                },
                folding: false,
                multiCursorModifier: "alt",
                wordWrap: "on",
                wordWrapBreakAfterCharacters: ">([{]))],;}",
                mouseWheelZoom: false,
                wordWrapColumn: 70,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                autoIndent: "brackets",
                autoClosingQuotes: "always",
                lineNumbers: "off",
                autoClosingBrackets: "always",
                autoClosingOvertype: "always",
                suggest: {
                },
                codeLens: true,
                autoSurround: "languageDefined",
                trimAutoWhitespace: true,
                codeActionsOnSaveTimeout: 100,
                model: monaco.editor.createModel(code, monacoLang, monaco.Uri.parse(monacoLang === "typescript" ? "file:///main.tsx" : "file:///main.html")),
                value: code,
                language: monacoLang,
                theme: "vs-dark"
            });
            monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
                noSuggestionDiagnostics: true,
                noSemanticValidation: true,
                noSyntaxValidation: true
            });
            editor.onDidChangeModelContent(()=>onChange(editor.getValue())
            );
            resolve(editor);
            if (monacoLang === "typescript") {
                const importHelper = [
                    {
                        name: "react",
                        url: "https://unpkg.com/@types/react@latest/index.d.ts",
                        depend: [
                            "global",
                            "csstype",
                            "react-dom",
                            "prop-types"
                        ]
                    },
                    {
                        name: "global",
                        url: "https://unpkg.com/@types/react@latest/global.d.ts",
                        depend: []
                    },
                    {
                        name: "prop-types",
                        url: "https://unpkg.com/@types/prop-types@latest/index.d.ts",
                        depend: []
                    },
                    {
                        name: "react-dom",
                        url: "https://unpkg.com/@types/react-dom@latest/index.d.ts",
                        depend: []
                    },
                    {
                        name: "csstype",
                        url: "https://unpkg.com/csstype@latest/index.d.ts",
                        depend: []
                    }
                ];
                const dts = importHelper.map(({ name , url  })=>(async ()=>monaco.languages.typescript.typescriptDefaults.addExtraLib(await (await fetch(url)).text(), `file:///node_modules/@types/${name}/index.d.ts`)
                    )()
                );
                monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                    target: monaco.languages.typescript.ScriptTarget.ESNext,
                    allowNonTsExtensions: true,
                    allowUmdGlobalAccess: true,
                    strict: true,
                    allowJs: true,
                    noEmitOnError: true,
                    allowSyntheticDefaultImports: true,
                    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
                    module: monaco.languages.typescript.ModuleKind.CommonJS,
                    noEmit: true,
                    typeRoots: [
                        "node_modules/@types"
                    ],
                    jsx: monaco.languages.typescript.JsxEmit.React,
                    jsxFactory: "React.createElement",
                    jsxFragmentFactory: "React.Fragment",
                    esModuleInterop: true
                });
                await Promise.all(dts);
                monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
                    noSuggestionDiagnostics: false,
                    noSemanticValidation: false,
                    noSyntaxValidation: false
                });
            }
        });
    });
};
function loadScript(src) {
    return new Promise(function(resolve, reject) {
        var s;
        s = document.createElement("script");
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}


async function getKeys(apiKey, prefix) {
    try {
        const list = `https://code.zed.vision/keys/?prefix=${prefix}`;
        const req = await fetch(list, {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "API_KEY": apiKey
            }
        });
        const data = await req.json();
        return data.keys;
    } catch (e) {
        console.log(e);
        return [];
    }
}
const getKeys1 = getKeys;
const renderDraggableWindow = (motion, onShare)=>{
    const DraggableWindow = ()=>{
        return jsx(React.Fragment, null, jsx(motion.div, {
            css: `\n            background: red;\n            border: 4px solid red;\n            border-radius: 8px;\n          `,
            animate: {
                scale: 1,
                top: 1,
                left: 600
            },
            dragElastic: 0.5,
            dragMomentum: false,
            initial: {
                top: 1,
                left: 0,
                scale: 0.7
            },
            transition: {
                duration: 0.5
            },
            drag: true,
            dragConstraints: {
                left: -200,
                right: window.innerWidth - 200,
                bottom: window.innerHeight + 200,
                top: 0
            }
        }, jsx("div", {
            css: `\n      display: block;\n      with: 100%;\n      text-align: right;\n      background: linear-gradient(0deg, darkred, red);\n    `
        }, jsx("button", {
            css: `\n              background: darkred;\n              margin-top: -4px;\n              color: white;\n              cursor: pointer;\n              font-weight: bold;\n              font-family: Roboto;\n              padding: 8px 16px;\n              outline: none;\n              box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);\n              border: none;\n              border-radius: 0px 8px 0px 0px;\n            `,
            onClick: ()=>onShare()
        }, "🌎 SHARE")), jsx("div", {
            css: `  \n      display: inline-block;\n      min-width: 200px;\n      padding: 30px;\n      max-width: 600px;\n      margin-bottom: -4px;\n      background: white;\n      max-height: 800px;\n      border-radius: 0px 0px 8px 8px;\n      overflow-y: overlay;\n    `,
            id: "root"
        })));
    };
    ReactDOM.render(jsx(DraggableWindow), document.getElementById("dragabbleWindow"));
};
function loadScript(src) {
    return new Promise(function(resolve, reject) {
        var s;
        s = window.document.createElement("script");
        s.src = src;
        s.onload = ()=>resolve(window)
        ;
        s.onerror = reject;
        window.document.head.appendChild(s);
    });
}
const importScript = async (src)=>document.querySelector(`script[src="${src}"]`) || new Promise(function(resolve, reject) {
        const s = window.document.createElement("script");
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        window.document.head.appendChild(s);
    })
;
const starter = `import { useState } from "react";\nimport {css, Global} from "@emotion/react";;\n\nconst Counter = () => {\n  const [clicks, setClicks] = useState(0);\n\n  return <>\n      <h1>Counter example</h1>\n      <button css={buttonStyles("green")} onClick={() => setClicks(clicks - 1)}>\n        -\n     </button>\n      {clicks}\n      <button css={buttonStyles("red")} onClick={() => setClicks(clicks + 1)}>\n        +\n    </button>\n  </>\n}\n\nconst buttonStyles = (color: string) => css\`\n  border-radius: 6px;\n  padding: 0.5rem 0;\n  margin: 0.5rem 2rem;\n  width: 4rem;\n  background: \${color};\n  color: white;\n  border: none;\n  :focus{\n    outline: none;\n  }\n  \`;\n\nexport default () => <>\n  <Global styles={css\`\n      body{\n          margin: 0;\n        }  \n    \`}\n  />\n  <Counter />\n</>\n`;
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b)=>("00" + b.toString(16)).slice(-2)
    ).join("");
    return hashHex.substr(0, 8);
}
const getUrl = ()=>{
    if (window.location.href.includes("zed.dev")) {
        return "https://code.zed.dev";
    }
    return "https://code.zed.vision";
};
const document1 = window.document;
let firstLoad = true;
const { motion  } = Motion;
let latestCode = "";
let busy = 0;
let keystrokeTillNoError = 0;
let errorReported = "";
let latestSavedCode = "";
let latestGoodCode = "";
let shareitAsHtml;
async function deleteHash(apiKey, hash) {
    try {
        const url = `https://code.zed.vision/keys/delete/?hash=${hash}`;
        const req = await fetch(url, {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "API_KEY": apiKey
            }
        });
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
async function getCode(hash) {
    try {
        const list = `https://code.zed.vision/?h=${hash}`;
        const req = await fetch(list, {
            headers: {
                "content-type": "application/json;charset=UTF-8"
            }
        });
        const data = await req.json();
        if (data.code) return data.code;
        return "";
    } catch (e) {
        console.log(e);
        return "";
    }
}
async function getTranspiledCode(hash) {
    try {
        const list = `https://code.zed.vision/?h=${hash}`;
        const req = await fetch(list, {
            headers: {
                "content-type": "application/json;charset=UTF-8"
            }
        });
        const data = await req.json();
        if (data.codeTranspiled) return data.codeTranspiled;
        return "";
    } catch (e) {
        console.log(e);
        return "";
    }
}
const L = -1;
function y(i) {
    return i >= 55296 && i <= 56319;
}
function v(i) {
    return i >= 56320 && i <= 57343;
}
function I(i) {
    return v(i.charCodeAt(0));
}
function R(i) {
    return y(i.charCodeAt(i.length - 1));
}
function F(i) {
    const n = [];
    for(let e = 0; e < i.length; e++)i[e][1].length > 0 && n.push(i[e]);
    return n;
}
function P(i, n, e, r) {
    return R(i) || I(r) ? null : F([
        [
            0,
            i
        ],
        [
            L,
            n
        ],
        [
            1,
            e
        ],
        [
            0,
            r
        ]
    ]);
}
function H(i, n, e) {
    const r = typeof e == "number" ? {
        index: e,
        length: 0
    } : e.oldRange, s = typeof e == "number" ? null : e.newRange, f = i.length, l = n.length;
    if (r.length === 0 && (s === null || s.length === 0)) {
        const t = r.index, c = i.slice(0, t), h = i.slice(t), o = s ? s.index : null;
        n: {
            const p = t + l - f;
            if (o !== null && o !== p) break n;
            if (p < 0 || p > l) break n;
            const A = n.slice(0, p), d = n.slice(p);
            if (d !== h) break n;
            const a = Math.min(t, p), g = c.slice(0, a), M = A.slice(0, a);
            if (g !== M) break n;
            const u = c.slice(a), b = A.slice(a);
            return P(g, u, b, h);
        }
        n: {
            if (o !== null && o !== t) break n;
            const p = t, A = n.slice(0, t), d = n.slice(t);
            if (A !== c) break n;
            const a = Math.min(f - t, l - t), g = h.slice(h.length - a), M = d.slice(d.length - a);
            if (g !== M) break n;
            const u = h.slice(0, h.length - a), b = d.slice(0, d.length - a);
            return P(c, u, b, g);
        }
    }
    if (r.length > 0 && s && s.length === 0) {
        n: {
            const t = i.slice(0, r.index), c = i.slice(r.index + r.length), h = t.length, o = c.length;
            if (l < h + o) break n;
            const p = n.slice(0, h), A = n.slice(l - o);
            if (t !== p || c !== A) break n;
            const d = i.slice(h, f - o), a = n.slice(h, l - o);
            return P(t, d, a, c);
        }
    }
    return null;
}
diff.INSERT = 1, diff.DELETE = L, diff.EQUAL = 0;
function D(i, n) {
    if (!i || !n || i.charAt(0) !== n.charAt(0)) return 0;
    let e = 0, r = Math.min(i.length, n.length), s = r, f = 0;
    for(; e < s;)i.substring(f, s) == n.substring(f, s) ? (e = s, f = e) : r = s, s = Math.floor((r - e) / 2 + e);
    return y(i.charCodeAt(s - 1)) && s--, s;
}
function O(i, n) {
    if (!i || !n || i.slice(-1) !== n.slice(-1)) return 0;
    let e = 0, r = Math.min(i.length, n.length), s = r, f = 0;
    for(; e < s;)i.substring(i.length - s, i.length - f) == n.substring(n.length - s, n.length - f) ? (e = s, f = e) : r = s, s = Math.floor((r - e) / 2 + e);
    return v(i.charCodeAt(i.length - s)) && s--, s;
}
function N(i, n) {
    const e = i.length > n.length ? i : n, r = i.length > n.length ? n : i;
    if (e.length < 4 || r.length * 2 < e.length) return null;
    function s(d, a, g) {
        const M = d.substring(g, g + Math.floor(d.length / 4));
        let u = -1, b = "", m, k, w, C;
        for(; (u = a.indexOf(M, u + 1)) !== -1;){
            const S = D(d.substring(g), a.substring(u)), B = O(d.substring(0, g), a.substring(0, u));
            b.length < B + S && (b = a.substring(u - B, u) + a.substring(u, u + S), m = d.substring(0, g - B), k = d.substring(g + S), w = a.substring(0, u - B), C = a.substring(u + S));
        }
        return b.length * 2 >= d.length ? [
            m,
            k,
            w,
            C,
            b
        ] : null;
    }
    const f = s(e, r, Math.ceil(e.length / 4)), l = s(e, r, Math.ceil(e.length / 2));
    let t;
    if (l === null && f === null) return null;
    if (l === null) {
        if (f === null) return null;
        t = f;
    } else if (f === null) {
        if (l === null) return null;
        t = l;
    } else t = f[4].length > l[4].length ? f : l;
    let c, h, o, p;
    i.length > n.length ? (c = t[0], h = t[1], o = t[2], p = t[3]) : (o = t[0], p = t[1], c = t[2], h = t[3]);
    const A = t[4];
    return [
        c,
        h,
        o,
        p,
        A
    ];
}
function diffCleanupMerge(i) {
    const n = [
        ...i
    ];
    n.push([
        0,
        ""
    ]);
    let e = 0, r = 0, s = 0, f = "", l = "", t, c;
    for(; e < n.length;){
        if (e < n.length - 1 && !n[e][1]) {
            n.splice(e, 1);
            continue;
        }
        switch(n[e][0]){
            case 1:
                s++, l += n[e][1], e++;
                break;
            case L:
                r++, f += n[e][1], e++;
                break;
            case 0:
                if (c = e - s - r - 1, e < n.length - 1 && !n[e][1]) {
                    n.splice(e, 1);
                    break;
                }
                if (f.length > 0 || l.length > 0) {
                    f.length > 0 && l.length > 0 && (t = D(l, f), t !== 0 && (c >= 0 ? n[c][1] += l.substring(0, t) : (n.splice(0, 0, [
                        0,
                        l.substring(0, t)
                    ]), e++), l = l.substring(t), f = f.substring(t)), t = O(l, f), t !== 0 && (n[e][1] = l.substring(l.length - t) + n[e][1], l = l.substring(0, l.length - t), f = f.substring(0, f.length - t)));
                    const o = s + r;
                    f.length === 0 && l.length === 0 ? (n.splice(e - o, o), e = e - o) : f.length === 0 ? (n.splice(e - o, o, [
                        1,
                        l
                    ]), e = e - o + 1) : l.length === 0 ? (n.splice(e - o, o, [
                        L,
                        f
                    ]), e = e - o + 1) : (n.splice(e - o, o, [
                        L,
                        f
                    ], [
                        1,
                        l
                    ]), e = e - o + 2);
                }
                e !== 0 && n[e - 1][0] === 0 ? (n[e - 1][1] += n[e][1], n.splice(e, 1)) : e++, s = 0, r = 0, f = "", l = "";
                break;
        }
    }
    n[n.length - 1][1] === "" && n.pop();
    let h = !1;
    for(e = 1; e < n.length - 1;)n[e - 1][0] === 0 && n[e + 1][0] === 0 && (n[e][1].substring(n[e][1].length - n[e - 1][1].length) === n[e - 1][1] ? (n[e][1] = n[e - 1][1] + n[e][1].substring(0, n[e][1].length - n[e - 1][1].length), n[e + 1][1] = n[e - 1][1] + n[e + 1][1], n.splice(e - 1, 1), h = !0) : n[e][1].substring(0, n[e + 1][1].length) == n[e + 1][1] && (n[e - 1][1] += n[e + 1][1], n[e][1] = n[e][1].substring(n[e + 1][1].length) + n[e + 1][1], n.splice(e + 1, 1), h = !0)), e++;
    return h ? diffCleanupMerge(n) : n;
}
const startMonaco = async ({ onChange , code , language  })=>{
    const container = window.document.getElementById("container");
    if (!container) {
        const el = document.getElementById("container");
        el.id = "container";
        document.body.appendChild(el);
    }
    const modelUri = language === "typescript" ? "file:///main.tsx" : "file:///main.html";
    let aceEditor;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)) {
        const aceEl = window.document.createElement("div");
        aceEl.id = "ace";
        window.document.body.appendChild(aceEl);
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.min.js");
        language === "typescript" ? await loadScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-typescript.min.js") : await loadScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-html.min.js");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/theme-monokai.min.js");
        window.document.getElementById("ace").style.setProperty("display", "block");
        container.style.setProperty("display", "none");
        aceEditor = window["ace"].edit("ace");
        aceEditor.getSession().setMode("ace/mode/typescript");
        const setThemeForAce = (wait)=>setTimeout(()=>{
                let aceEditor1 = window["ace"].edit("ace");
                let theme = aceEditor1.getTheme();
                if (theme !== "ace/theme/monokai ") {
                    aceEditor1.setOptions({
                        fontSize: "14pt"
                    });
                    aceEditor1.setTheme("ace/theme/monokai");
                    setThemeForAce(2 * wait);
                }
            }, wait)
        ;
        setThemeForAce(100);
        aceEditor.setValue(code);
        aceEditor.blur();
    }
    if (window["monaco"] === undefined) {
        const vsPath = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs";
        const { require  } = await loadScript(`${vsPath}/loader.min.js`);
        require.config({
            paths: {
                "vs": vsPath
            }
        });
        await new Promise((resolve)=>require([
                "vs/editor/editor.main"
            ], (monaco)=>{
                resolve(monaco);
            })
        );
    }
    const monaco = window["monaco"];
    const modules = {
        monaco: monaco,
        editor: monaco.editor.create(window.document.getElementById("container"), {
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
            wordWrapColumn: 80,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            autoIndent: "brackets",
            autoClosingQuotes: "always",
            padding: {
                bottom: 300
            },
            lineNumbers: "on",
            autoClosingBrackets: "always",
            autoClosingOvertype: "always",
            suggest: {
            },
            codeLens: true,
            autoSurround: "languageDefined",
            trimAutoWhitespace: true,
            codeActionsOnSaveTimeout: 100,
            model: monaco.editor.getModel(modelUri) || monaco.editor.createModel(code, language, monaco.Uri.parse(modelUri)),
            value: code,
            language: language,
            theme: "vs-dark"
        })
    };
    modules.editor.onDidChangeModelContent(()=>onChange(modules.editor.getValue())
    );
    aceEditor && aceEditor.session.on("change", function() {
        const value = aceEditor.getValue();
        modules.editor.setValue(value);
        onChange(value);
    });
    aceEditor && document.getElementById("container").replaceWith(document.getElementById("ace"));
    modules.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSuggestionDiagnostics: true,
        noSemanticValidation: true,
        noSyntaxValidation: true
    });
    if (language === "typescript") {
        const importHelper = [
            {
                name: "react",
                url: "https://unpkg.com/@types/react@17.0.0/index.d.ts",
                depend: [
                    "global",
                    "csstype",
                    "react-dom",
                    "prop-types"
                ]
            },
            {
                name: "global",
                url: "https://unpkg.com/@types/react@17.0.0/global.d.ts",
                depend: []
            },
            {
                name: "prop-types",
                url: "https://unpkg.com/@types/prop-types@15.7.3/index.d.ts",
                depend: []
            },
            {
                name: "react-dom",
                url: "https://unpkg.com/@types/react-dom@17.0.0/index.d.ts",
                depend: []
            },
            {
                name: "csstype",
                url: "https://unpkg.com/csstype@3.0.5/index.d.ts",
                depend: []
            },
            {
                name: "@emotion/styled/base.d.ts",
                url: "https://unpkg.com/@emotion/styled@11.0.0/types/base.d.ts",
                depend: [
                    "@emotion/react",
                    "@emotion/serialize",
                    "react"
                ]
            },
            {
                name: "@emotion/styled/index.d.ts",
                url: "https://unpkg.com/@emotion/styled@11.0.0/types/index.d.ts",
                depend: [
                    "@emotion/react",
                    "@emotion/serialize",
                    "react"
                ]
            },
            {
                name: "@emotion/cache/index.d.ts",
                url: "https://unpkg.com/@emotion/cache@11.0.0/types/index.d.ts",
                depend: [
                    "@emotion/utils"
                ]
            },
            {
                name: "@emotion/react/index.d.ts",
                url: "https://unpkg.com/@emotion/react@11.1.1/types/index.d.ts",
                depend: [
                    "@emotion/cache"
                ]
            },
            {
                name: "@emotion/react/jsx-namespace.d.ts",
                url: "https://unpkg.com/@emotion/react@11.1.1/types/jsx-namespace.d.ts",
                depend: [
                    "@emotion/utils",
                    "csstype"
                ]
            },
            {
                name: "@emotion/react/css-prop.d.ts",
                url: "https://unpkg.com/@emotion/react@11.1.1/types/css-prop.d.ts",
                depend: [
                    "@emotion/utils",
                    "csstype"
                ]
            },
            {
                name: "@emotion/react/helper.d.ts",
                url: "https://unpkg.com/@emotion/react@11.1.1/types/helper.d.ts",
                depend: [
                    "@emotion/utils",
                    "csstype"
                ]
            },
            {
                name: "@emotion/react/theming.d.ts",
                url: "https://unpkg.com/@emotion/react@11.1.1/types/theming.d.ts",
                depend: [
                    "@emotion/utils",
                    "csstype"
                ]
            },
            {
                name: "@emotion/serialize/index.d.ts",
                url: "https://unpkg.com/@emotion/serialize@1.0.0/types/index.d.ts",
                depend: [
                    "@emotion/utils",
                    "csstype"
                ]
            },
            {
                name: "@emotion/utils/index.d.ts",
                url: "https://unpkg.com/@emotion/utils@1.0.0/types/index.d.ts",
                depend: []
            },
            {
                name: "framer-motion",
                url: "https://unpkg.com/framer-motion@2.9.4/dist/framer-motion.d.ts",
                depend: []
            },
            {
                name: "popmotion",
                url: "https://unpkg.com/browse/popmotion@9.0.0/lib/index.d.ts"
            }, 
        ];
        const dts = importHelper.map(({ name , url  })=>(async ()=>modules.monaco.languages.typescript.typescriptDefaults.addExtraLib(await (await fetch(url)).text(), name.includes("@emotion") ? `file:///node_modules/${name}` : `file:///node_modules/@types/${name}/index.d.ts`)
            )()
        );
        modules.monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            target: modules.monaco.languages.typescript.ScriptTarget.ESNext,
            allowNonTsExtensions: true,
            allowUmdGlobalAccess: true,
            strict: true,
            allowJs: true,
            noEmitOnError: true,
            allowSyntheticDefaultImports: true,
            moduleResolution: modules.monaco.languages.typescript.ModuleResolutionKind.Nodejs,
            module: modules.monaco.languages.typescript.ModuleKind.CommonJS,
            noEmit: true,
            typeRoots: [
                "node_modules/@types"
            ],
            jsx: modules.monaco.languages.typescript.JsxEmit.React,
            jsxFactory: "React.createElement",
            jsxFragmentFactory: "React.Fragment",
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
export async function run() {
    async function regenerate(apiKey, prefix, deleteIfRenderedHTmlDiffers = false) {
        const keys = await getKeys(apiKey, prefix);
        keys.map((x)=>x.name
        ).map(async (hash)=>{
            const code = await getCode(hash);
            if (!code) return "";
            const codeTranspiled = await getTranspiledCode(hash);
            const el = document1.createElement("div");
            document1.getElementById("root").replaceWith(el);
            el.id = "root";
            let transpiled;
            try {
                transpiled = transpileCode(code);
                if (transpiled !== codeTranspiled) {
                    const searchRegExp = /setInterval/gi;
                    const replaceWith = "///";
                    const searchRegExp2 = /debugger/gi;
                    const replaceWith2 = "///";
                    window.ReactDOM.unmountComponentAtNode(document1.getElementById("root"));
                    restartCode(transpiled.replaceAll(searchRegExp, replaceWith).replaceAll(searchRegExp2, replaceWith2));
                    const html2 = document1.getElementById("root").innerHTML;
                    const el2 = document1.createElement("div");
                    document1.getElementById("root").replaceWith(el2);
                    el2.id = "root";
                    window.ReactDOM.unmountComponentAtNode(document1.getElementById("root"));
                    restartCode(codeTranspiled.replaceAll(searchRegExp, replaceWith).replaceAll(searchRegExp2, replaceWith2));
                    const html = document1.getElementById("root").innerHTML;
                    if (html !== html2) {
                        console.log({
                            hash,
                            code,
                            html1: html,
                            html2,
                            transpiled1: codeTranspiled,
                            transpiled2: transpiled
                        });
                        deleteIfRenderedHTmlDiffers && await deleteHash(apiKey, hash);
                    }
                }
            } catch (e) {
                console.error({
                    hash,
                    code,
                    transpiled
                });
            }
        });
    }
    Object.assign(window, {
        getKeys: getKeys,
        getCode,
        restartCode,
        regenerate
    });
    renderDraggableWindow(motion, async ()=>{
        const link = await shareitAsHtml();
        window.open(link);
    });
    await importScript("https://unpkg.com/@babel/standalone@7.12.9/babel.min.js");
    (async ()=>{
        const example = await getCodeToLoad();
        latestGoodCode = example;
        const modules = await startMonaco({
            language: "typescript",
            code: example,
            onChange
        });
        function onChange(code) {
            if (!modules) return;
            latestCode = code;
            if (!busy) {
                runner(latestCode);
            } else {
                const myCode = code;
                const cl = setInterval(()=>{
                    if (code !== latestCode || !busy) {
                        clearInterval(cl);
                    }
                    if (!busy) {
                        runner(latestCode);
                    }
                }, 100);
            }
        }
        async function getErrors() {
            if (!modules || !modules.monaco) return;
            const modelUri = modules.monaco.Uri.parse("file:///main.tsx");
            const tsWorker = await modules.monaco.languages.typescript.getTypeScriptWorker();
            const diag = await (await tsWorker(modelUri)).getSemanticDiagnostics("file:///main.tsx");
            const comp = await (await tsWorker(modelUri)).getCompilerOptionsDiagnostics("file:///main.tsx");
            const syntax = await (await tsWorker(modelUri)).getSyntacticDiagnostics("file:///main.tsx");
            return [
                ...diag,
                ...comp,
                ...syntax
            ];
        }
        async function runner(cd) {
            const { diff  } = await import("../dist/diff.min.js");
            if (busy === 1) {
                return;
            }
            try {
                busy = 1;
                const err = await getErrors();
                const errorDiv = document1.getElementById("error");
                busy = 0;
                if (cd !== latestCode) {
                    return;
                }
                if (err && err.length) {
                    if (latestCode != cd) {
                        return;
                    }
                    if (errorReported === cd) {
                        return;
                    }
                    const slices = diff(latestGoodCode, cd, 0);
                    if (slices.length <= 3) {
                        modules.monaco.editor.setTheme("hc-black");
                        return;
                    }
                    errorDiv.innerHTML = err[0].messageText.toString();
                    errorDiv.style.display = "block";
                    errorReported = cd;
                    return;
                }
                latestGoodCode = cd;
                errorDiv.style.display = "none";
                modules.monaco.editor.setTheme("vs-dark");
                keystrokeTillNoError = 0;
                busy = 0;
                restartCode(transpileCode(cd));
            } catch (err) {
                busy = 0;
                if (cd !== latestCode) {
                    return;
                }
                modules.monaco.editor.setTheme("vs-light");
                setTimeout(()=>{
                    modules.monaco.editor.setTheme("hc-black");
                }, 50);
                console.error(err);
            }
        }
    })();
    restartCode(transpileCode(await getCodeToLoad()));
    async function restartCode(transPiled) {
        const searchRegExp = /import/gi;
        const replaceWith = "///";
        const code = `\n    Object.assign(window, React);\n    if (window.Motion) {\n        Object.assign(window, window.Motion);\n    }\n    if (window.emotionStyled){\n      window.styled= window.emotionStyled;\n    }\n    ;\n    ` + transPiled.replaceAll(searchRegExp, replaceWith).replace("export default", "DefaultElement = ");
        const restart = async ()=>{
            const hydrate = new Function("code", `return function(){  \n          let DefaultElement;\n        \n        ${code}\n\n                return ReactDOM.render(jsx(DefaultElement), document.getElementById("root"));\n      }`)();
            hydrate();
            shareitAsHtml = async ()=>{
                const renderToString = new Function("code", `return function(){\n            let DefaultElement;\n  \n          ${code}\n  \n                  return ReactDOMServer.renderToString(jsx(DefaultElement));\n        }`)();
                const HTML = renderToString();
                const css = Array.from(document1.querySelector("head > style[data-emotion=css]").sheet.cssRules).map((x)=>x.cssText
                ).filter((cssRule)=>HTML.includes(cssRule.substring(3, 8))
                ).join("\n  ");
                let bodyStylesFix;
                if (code.includes("body{")) {
                    const start = code.indexOf("body{");
                    const firstBit = code.slice(start);
                    const last = firstBit.indexOf("}");
                    bodyStylesFix = firstBit.slice(0, last + 1);
                }
                let motionDep = "";
                let motionScript = "";
                if (code.includes("Motion")) {
                    motionDep = `<script crossorigin src="https://unpkg.com/framer-motion@2.9.4/dist/framer-motion.js"></script>`;
                    motionScript = "const {motion} = Motion";
                }
                const iframe = `<!DOCTYPE html>\n        <html lang="en">\n        <head>\n        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n        <head profile="http://www.w3.org/2005/10/profile">\n        <link rel="icon" \n              type="image/png"\n              href="https://zed.vision/favicon.ico">\n        <style>\n        ${bodyStylesFix}\n        ${css}\n        </style>\n        </head>\n        <body>\n        <div id="root">\n        ${HTML}\n        </div>\n        <script crossorigin src="https://unpkg.com/react@17.0.1/umd/react.production.min.js"></script>\n        ${motionDep}\n        <script crossorigin src="https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js"></script>\n        <script crossorigin src="https://unpkg.com/@emotion/react@11.1.1/dist/emotion-react.umd.min.js"></script>\n        <script crossorigin src="https://unpkg.com/@emotion/styled@11.0.0/dist/emotion-styled.umd.min.js"></script>\n        <script type="module">\n        Object.assign(window, emotionReact);\n\n       const styled = window["emotionStyled"];\n\n        let DefaultElement;\n\n        ${code}\n\n        ReactDOM.hydrate(jsx(DefaultElement), document.body.children[0]);\n        </script>\n        </body>\n        </html>\n        `;
                const iframeBlob = await createHTMLSourceBlob(iframe);
                const link = await saveHtml(iframeBlob);
                return link;
            };
        };
        if (!firstLoad) {
            const saveCode = async (latestCode1)=>{
                if (!location.origin.includes("zed.")) {
                    return;
                }
                if (latestCode1 !== latestGoodCode) return;
                if (latestSavedCode === latestCode1) return;
                latestSavedCode = latestCode1;
                const body = {
                    codeTranspiled: transpileCode(latestGoodCode),
                    code: latestGoodCode
                };
                const stringBody = JSON.stringify(body);
                const request = new Request(getUrl(), {
                    body: stringBody,
                    method: "POST",
                    headers: {
                        "content-type": "application/json;charset=UTF-8"
                    }
                });
                const response = fetch(request);
                const hash = await sha256(stringBody);
                try {
                    const localStorage = window.localStorage;
                    const prevHash = localStorage.getItem("codeBoXHash2");
                    if (prevHash !== hash) {
                        localStorage.setItem("codeBoXHash2", hash);
                        localStorage.setItem(hash, latestGoodCode);
                        setQueryStringParameter("h", hash);
                    }
                } catch (e) {
                }
                await response;
            };
            saveCode(latestCode);
        }
        firstLoad = false;
        restart();
    }
    async function getCodeToLoad() {
        const search = new URLSearchParams(window.location.search);
        const keyToLoad = search.get("h") || window.localStorage.getItem("codeBoXHash2");
        if (keyToLoad) {
            const content = window.localStorage.getItem(keyToLoad);
            if (content) return content;
            const cont = await window.SHATEST.get(keyToLoad);
            if (cont) return await cont;
            let text;
            try {
                const resp = await fetch(getUrl() + "/?h=" + keyToLoad);
                text = await resp.json();
            } catch (e) {
                console.error(e);
                return starter;
            }
            return text.code;
        }
        return starter;
    }
    function setQueryStringParameter(name, value) {
        const params = new URLSearchParams(window.location.search);
        params.set(name, value);
        window.history.replaceState({
        }, "", decodeURIComponent(`${window.location.pathname}?${params}`));
    }
    function createHTMLSourceBlob(code) {
        const blob = new Blob([
            code
        ], {
            type: "text/html"
        });
        return blob;
    }
    async function saveHtml(htmlBlob) {
        const request = new Request(getUrl(), {
            body: htmlBlob,
            method: "POST",
            headers: {
                "content-type": "text/html;charset=UTF-8",
                "SHARE": "true"
            }
        });
        const response = await fetch(request);
        const { hash  } = await response.json();
        return getUrl() + `/?r=${hash}`;
    }
    function transpileCode(code) {
        const { transform  } = window["Babel"];
        return transform("/** @jsx jsx */\n" + `\n  Object.assign(window, React);\n  ` + code, {
            plugins: [],
            presets: [
                "react",
                [
                    "typescript",
                    {
                        isTSX: true,
                        allExtensions: true
                    }
                ], 
            ]
        }).code;
    }
}
function E({ text1: i , text2: n , cursorPos: e  }) {
    if (i === n) return i ? [
        [
            0,
            i
        ]
    ] : [];
    if (e) {
        const t = H(i, n, e);
        if (t) return t;
    }
    let r = D(i, n);
    const s = i.substring(0, r);
    i = i.substring(r), n = n.substring(r), r = O(i, n);
    const f = i.substring(i.length - r);
    i = i.substring(0, i.length - r), n = n.substring(0, n.length - r);
    const l = W(i, n);
    return s && l.unshift([
        0,
        s
    ]), f && l.push([
        0,
        f
    ]), diffCleanupMerge(l), l;
}
function W(i, n) {
    let e;
    if (!i) return [
        [
            1,
            n
        ]
    ];
    if (!n) return [
        [
            L,
            i
        ]
    ];
    const r = i.length > n.length ? i : n, s = i.length > n.length ? n : i, f = r.indexOf(s);
    if (f !== -1) return e = [
        [
            1,
            r.substring(0, f)
        ],
        [
            0,
            s
        ],
        [
            1,
            r.substring(f + s.length)
        ]
    ], i.length > n.length && (e[0][0] = e[2][0] = L), e;
    if (s.length === 1) return [
        [
            L,
            i
        ],
        [
            1,
            n
        ]
    ];
    const l = N(i, n);
    if (l) {
        const t = l[0] || "", c = l[1] || "", h = l[2] || "", o = l[3] || "", p = l[4] || "", A = E({
            text1: t,
            text2: h,
            cursorPos: 0
        }), d = E({
            text1: c,
            text2: o,
            cursorPos: 0
        });
        return A.concat([
            [
                0,
                p[1]
            ]
        ], d);
    }
    return j(i, n);
}
function j(i, n) {
    const e = i.length, r = n.length, s = Math.ceil((e + r) / 2), f = s, l = 2 * s, t = new Array(l), c = new Array(l);
    for(let g = 0; g < l; g++)t[g] = -1, c[g] = -1;
    t[s + 1] = 0, c[s + 1] = 0;
    const h = e - r, o = h % 2 !== 0;
    let p = 0, A = 0, d = 0, a = 0;
    for(let g1 = 0; g1 < s; g1++){
        for(let u = -g1 + p; u <= g1 - A; u += 2){
            const b = s + u;
            let m;
            u === -g1 || u !== g1 && t[b - 1] < t[b + 1] ? m = t[b + 1] : m = t[b - 1] + 1;
            let k = m - u;
            for(; m < e && k < r && i.charAt(m) === n.charAt(k);)m++, k++;
            if (t[b] = m, m > e) A += 2;
            else if (k > r) p += 2;
            else if (o) {
                const w = s + h - u;
                if (w >= 0 && w < l && c[w] !== -1) {
                    const C = e - c[w];
                    if (m >= C) return _(i, n, m, k);
                }
            }
        }
        let M;
        for(let u1 = -g1 + d; u1 <= g1 - a; u1 += 2){
            const b = s + u1;
            u1 === -g1 || u1 !== g1 && c[b - 1] < c[b + 1] ? M = c[b + 1] : M = c[b - 1] + 1;
            let m = M - u1;
            for(; M < e && m < r && i.charAt(e - M - 1) === n.charAt(r - m - 1);)M++, m++;
            if (c[b] = M, M > e) a += 2;
            else if (m > r) d += 2;
            else if (!o) {
                const k = s + h - u1;
                if (k >= 0 && k < l && t[k] !== -1) {
                    const w = t[k], C = s + w - k;
                    if (M = e - M, w >= M) return _(i, n, w, C);
                }
            }
        }
    }
    return [
        [
            L,
            i
        ],
        [
            1,
            n
        ]
    ];
}
function _(i, n, e, r) {
    const s = i.substring(0, e), f = n.substring(0, r), l = i.substring(e), t = n.substring(r), c = E({
        text1: s,
        text2: f,
        cursorPos: 0
    }), h = E({
        text1: l,
        text2: t,
        cursorPos: 0
    });
    return c.concat(h);
}
function diff(i, n, e) {
    return E({
        text1: i,
        text2: n,
        cursorPos: e
    });
}


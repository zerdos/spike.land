"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) {
                    t[p] = s[p];
                }
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P ? value : new P(function (resolve) {
                resolve(value);
            });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
            if (t[0] & 1)
                throw t[1];
            return t[1];
        },
        trys: [],
        ops: [],
    }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) },
        typeof Symbol === "function" && (g[Symbol.iterator] = function () {
            return this;
        }),
        g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f)
            throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1,
                    y && (t = op[0] & 2
                        ? y["return"]
                        : op[0]
                            ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                            : y.next) &&
                        !(t = t.call(y, op[1])).done) {
                    return t;
                }
                if (y = 0, t)
                    op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return { value: op[1], done: false };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) &&
                            (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2])
                            _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            }
            catch (e) {
                op = [6, e];
                y = 0;
            }
            finally {
                f = t = 0;
            }
        }
        if (op[0] & 5)
            throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.startMonaco = exports.isMobile = void 0;
var importScript_js_1 = require("https://unpkg.com/@zedvision/code@8.6.6/src/importScript.js");
var monaco = require("https://unpkg.com/monaco-editor");
var isMobile = function () {
    if (typeof window === "undefined") {
        return false;
    }
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
};
exports.isMobile = isMobile;
var startMonaco = function (_a) {
    var onChange = _a.onChange, code = _a.code, language = _a.language, options = _a.options;
    return __awaiter(void 0, void 0, void 0, function () {
        var aceEditor, document, container, el, modelUri, aceEl, _b, ace_1, setThemeForAce_1, model, _c, modules, importHelper, dts;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    aceEditor = null;
                    document = window.document;
                    container = document.getElementById("container");
                    if (!container) {
                        el = document.getElementById("container");
                        el.id = "container";
                        document.body.appendChild(el);
                    }
                    modelUri = language === "typescript"
                        ? "file:///main.tsx"
                        : "file:///main.html";
                    if (!exports.isMobile())
                        return [3, /*break*/ 7];
                    aceEl = window.document.createElement("div");
                    aceEl.id = "ace";
                    window.document.body.appendChild(aceEl);
                    return [
                        4,
                        importScript_js_1.importScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.min.js"),
                    ];
                case 1:
                    _d.sent();
                    if (!(language === "typescript"))
                        return [3, /*break*/ 3];
                    return [
                        4,
                        importScript_js_1.importScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-typescript.min.js"),
                    ];
                case 2:
                    _b = _d.sent();
                    return [3, /*break*/ 5];
                case 3:
                    return [
                        4,
                        importScript_js_1.importScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-html.min.js"),
                    ];
                case 4:
                    _b = _d.sent();
                    _d.label = 5;
                case 5:
                    _b;
                    return [
                        4,
                        importScript_js_1.importScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/theme-monokai.min.js"),
                    ];
                case 6:
                    _d.sent();
                    window.document.getElementById("ace").style.setProperty("display", "block");
                    container.style.setProperty("display", "none");
                    ace_1 = window.ace;
                    aceEditor = ace_1.edit("ace");
                    aceEditor.getSession().setMode("ace/mode/typescript");
                    setThemeForAce_1 = function (wait) {
                        return setTimeout(function () {
                            var aceEditor = ace_1.edit("ace");
                            var theme = aceEditor.getTheme();
                            if (theme !== "ace/theme/monokai ") {
                                aceEditor.setOptions({
                                    fontSize: "14pt",
                                });
                                aceEditor.setTheme("ace/theme/monokai");
                                setThemeForAce_1(2 * wait);
                            }
                        }, wait);
                    };
                    setThemeForAce_1(100);
                    aceEditor.setValue(code);
                    aceEditor.blur();
                    _d.label = 7;
                case 7:
                    _d.trys.push([7, 8, , 10]);
                    model = monaco.editor.getModel(modelUri);
                    if (model.getValue() !== code) {
                        model.setValue(code);
                    }
                    return [3, /*break*/ 10];
                case 8:
                    _c = _d.sent();
                    return [
                        4,
                        monaco.editor.createModel(code, language, monaco.Uri.parse(modelUri)),
                    ];
                case 9:
                    model = _d.sent();
                    return [3, /*break*/ 10];
                case 10:
                    modules = {
                        monaco: monaco,
                        editor: monaco.editor.create(window.document.getElementById("container"), __assign({
                            formatOnType: false,
                            scrollbar: {
                                horizontal: "hidden",
                                verticalHasArrows: true,
                                verticalScrollbarSize: 20,
                            },
                            minimap: {
                                enabled: false,
                            },
                            folding: false,
                            glyphMargin: false,
                            wordWrap: "off",
                            mouseWheelZoom: false,
                            wordWrapColumn: 80,
                            useTabStops: false,
                            dragAndDrop: false,
                            disableLayerHinting: true,
                            formatOnPaste: false,
                            disableMonospaceOptimizations: true,
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
                            model: model,
                            value: code,
                            language: language,
                            theme: "vs-dark",
                        }, options)),
                    };
                    modules.editor.onDidChangeModelContent(function () {
                        return onChange(modules.editor.getValue());
                    });
                    aceEditor && aceEditor.session.on("change", function () {
                        var value = aceEditor.getValue();
                        modules.editor.setValue(value);
                        onChange(value);
                    });
                    aceEditor &&
                        document.getElementById("container").replaceWith(document.getElementById("ace"));
                    modules.monaco.languages.typescript.typescriptDefaults
                        .setDiagnosticsOptions({
                        noSuggestionDiagnostics: true,
                        noSemanticValidation: true,
                        noSyntaxValidation: true,
                    });
                    if (!(language === "typescript"))
                        return [3, /*break*/ 12];
                    importHelper = [
                        {
                            name: "react",
                            url: "https://unpkg.com/@types/react@17.0.0/index.d.ts",
                            depend: ["global", "csstype", "react-dom", "prop-types"],
                        },
                        {
                            name: "global",
                            url: "https://unpkg.com/@types/react@17.0.0/global.d.ts",
                            depend: [],
                        },
                        {
                            name: "prop-types",
                            url: "https://unpkg.com/@types/prop-types@15.7.3/index.d.ts",
                            depend: [],
                        },
                        {
                            name: "react-dom",
                            url: "https://unpkg.com/@types/react-dom@17.0.0/index.d.ts",
                            depend: [],
                        },
                        {
                            name: "csstype",
                            url: "https://unpkg.com/csstype@3.0.5/index.d.ts",
                            depend: [],
                        },
                        {
                            name: "@emotion/styled/base.d.ts",
                            url: "https://unpkg.com/@emotion/styled@11.0.0/types/base.d.ts",
                            depend: ["@emotion/react", "@emotion/serialize", "react"],
                        },
                        {
                            name: "@emotion/styled/index.d.ts",
                            url: "https://unpkg.com/@emotion/styled@11.0.0/types/index.d.ts",
                            depend: ["@emotion/react", "@emotion/serialize", "react"],
                        },
                        {
                            name: "@emotion/cache/index.d.ts",
                            url: "https://unpkg.com/@emotion/cache@11.0.0/types/index.d.ts",
                            depend: ["@emotion/utils"],
                        },
                        {
                            name: "@emotion/react/index.d.ts",
                            url: "https://unpkg.com/@emotion/react@11.1.2/types/index.d.ts",
                            depend: ["@emotion/cache"],
                        },
                        {
                            name: "@emotion/react/jsx-namespace.d.ts",
                            url: "https://unpkg.com/@emotion/react@11.1.2/types/jsx-namespace.d.ts",
                            depend: ["@emotion/utils", "csstype"],
                        },
                        {
                            name: "@emotion/react/css-prop.d.ts",
                            url: "https://unpkg.com/@emotion/react@11.1.2/types/css-prop.d.ts",
                            depend: ["@emotion/utils", "csstype"],
                        },
                        {
                            name: "@emotion/react/helper.d.ts",
                            url: "https://unpkg.com/@emotion/react@11.1.2/types/helper.d.ts",
                            depend: ["@emotion/utils", "csstype"],
                        },
                        {
                            name: "@emotion/react/theming.d.ts",
                            url: "https://unpkg.com/@emotion/react@11.1.2/types/theming.d.ts",
                            depend: ["@emotion/utils", "csstype"],
                        },
                        {
                            name: "@emotion/serialize/index.d.ts",
                            url: "https://unpkg.com/@emotion/serialize@1.0.0/types/index.d.ts",
                            depend: ["@emotion/utils", "csstype"],
                        },
                        {
                            name: "@emotion/utils/index.d.ts",
                            url: "https://unpkg.com/@emotion/utils@1.0.0/types/index.d.ts",
                            depend: [],
                        },
                        {
                            name: "framer-motion",
                            url: "https://unpkg.com/framer-motion@3.1.1/dist/framer-motion.d.ts",
                            depend: [],
                        },
                        {
                            name: "popmotion",
                            url: "https://unpkg.com/popmotion@9.0.2/lib/index.d.ts",
                        },
                        {
                            name: "@zedvision/qrious/index.d.ts",
                            url: "https://unpkg.com/@zedvision/qrious@8.5.7/dist/qrious.d.ts",
                        },
                    ];
                    dts = importHelper.map(function (_a) {
                        var name = _a.name, url = _a.url;
                        return (function () {
                            return __awaiter(void 0, void 0, void 0, function () {
                                var _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _b = (_a = modules.monaco.languages.typescript
                                                .typescriptDefaults).addExtraLib;
                                            return [4, /*yield*/ fetch(url)];
                                        case 1:
                                            return [4, /*yield*/ (_c.sent()).text()];
                                        case 2:
                                            return [
                                                2,
                                                _b.apply(_a, [
                                                    _c.sent(),
                                                    name.includes("@")
                                                        ? "file:///node_modules/" + name
                                                        : "file:///node_modules/@types/" + name +
                                                            "/index.d.ts",
                                                ]),
                                            ];
                                    }
                                });
                            });
                        })();
                    });
                    modules.monaco.languages.typescript.typescriptDefaults
                        .setCompilerOptions({
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
                        typeRoots: ["node_modules/@types"],
                        jsx: "react-jsx",
                        esModuleInterop: true,
                    });
                    return [4, /*yield*/ Promise.all(dts)];
                case 11:
                    _d.sent();
                    modules.monaco.languages.typescript.typescriptDefaults
                        .setDiagnosticsOptions({
                        noSuggestionDiagnostics: false,
                        noSemanticValidation: false,
                        noSyntaxValidation: false,
                    });
                    return [2, /*return*/ modules];
                case 12:
                    return [2 /*return*/];
            }
        });
    });
};
exports.startMonaco = startMonaco;

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.CodeBox = void 0;
var React = require("react");
var smart_monaco_editor_1 = require("@zedvision/smart-monaco-editor");
var babel_ts_1 = require("../utils/babel.ts");
var renderer_ts_1 = require("../utils/renderer.ts");
var sha_ts_1 = require("../utils/sha.ts");
var example_ts_1 = require("./example.ts");
var styledCodeBoxComps_tsx_1 = require("./styledCodeBoxComps.tsx");
var codeboxComponents_tsx_1 = require("./codeboxComponents.tsx");
var CodeBox = function (_a) {
    var title = _a.title, children = _a.children;
    var starterCode = (children === null || children === void 0 ? void 0 : children.toString().trim()) || example_ts_1.counterExample;
    if (typeof window === "undefined")
        return React.createElement("pre", null, "Loading");
    var _b = React.useState({
        events: example_ts_1.defaultProps.events,
        hashEvents: "",
        hashArr: []
    }), _c = _b[0], events = _c.events, hashArr = _c.hashArr, changeProps = _b[1];
    var _d = React
        .useState({
        transformed: [],
        error: ""
    }), _e = _d[0], transformed = _e.transformed, error = _e.error, changeWorkerRenderedComponent = _d[1];
    var _f = React.useState(starterCode), code = _f[0], changeCode = _f[1];
    var _g = React.useState(false), editorAttached = _g[0], setEditorAttached = _g[1];
    React.useEffect(function () {
        function transformCode(codeHash, errorMessage) {
            return __awaiter(this, void 0, void 0, function () {
                var e_1, errorMessage_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (errorMessage) {
                                changeWorkerRenderedComponent(function (s) { return (__assign(__assign({}, s), { error: errorMessage })); });
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 2, , 4]);
                            return [2 /*return*/, babel_ts_1.transform(codeHash)];
                        case 2:
                            e_1 = _a.sent();
                            return [4 /*yield*/, sha_ts_1.unHash(e_1)];
                        case 3:
                            errorMessage_1 = _a.sent();
                            changeWorkerRenderedComponent(function (s) { return (__assign(__assign({}, s), { error: errorMessage_1 })); });
                            return [2 /*return*/, false];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        var runner = function (c) { return __awaiter(void 0, void 0, void 0, function () {
            var monaco, model, tsWorker, modelUri, diag, comp, syntax, tsErrorMessageArr, tsErrorMessage, codeHash, tHash, hashArrValue, renderedHashContentHash, renderedHashContent, _a, prevIndex, t, rendered, renderedHash;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!editorAttached) return [3 /*break*/, 2];
                        setEditorAttached(true);
                        return [4 /*yield*/, smart_monaco_editor_1.startMonaco({
                                language: "typescript",
                                code: c,
                                onChange: function (code) { return changeCode(code); }
                            })];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        monaco = window["monaco"];
                        model = monaco.editor.getModel("file:///main.tsx");
                        return [4 /*yield*/, window["monaco"].languages.typescript
                                .getTypeScriptWorker()];
                    case 3:
                        tsWorker = _b.sent();
                        modelUri = model === null || model === void 0 ? void 0 : model.uri;
                        if (!modelUri)
                            return [2 /*return*/];
                        return [4 /*yield*/, tsWorker(modelUri)];
                    case 4: return [4 /*yield*/, (_b.sent()).getSemanticDiagnostics("file:///main.tsx")];
                    case 5:
                        diag = _b.sent();
                        return [4 /*yield*/, tsWorker(modelUri)];
                    case 6: return [4 /*yield*/, (_b.sent())
                            .getCompilerOptionsDiagnostics("file:///main.tsx")];
                    case 7:
                        comp = _b.sent();
                        return [4 /*yield*/, tsWorker(modelUri)];
                    case 8: return [4 /*yield*/, (_b.sent()).getSyntacticDiagnostics("file:///main.tsx")];
                    case 9:
                        syntax = _b.sent();
                        tsErrorMessageArr = __spreadArrays(diag, comp, syntax);
                        tsErrorMessage = tsErrorMessageArr.length === 0
                            ? ""
                            : tsErrorMessageArr[0].messageText.toString();
                        return [4 /*yield*/, sha_ts_1.hash(c)];
                    case 10:
                        codeHash = _b.sent();
                        return [4 /*yield*/, transformCode(codeHash, tsErrorMessage)];
                    case 11:
                        tHash = _b.sent();
                        return [4 /*yield*/, sha_ts_1.hash({
                                events: [example_ts_1.defaultProps.events[0]]
                            })];
                    case 12:
                        hashArrValue = _b.sent();
                        if (!tHash || tsErrorMessage)
                            return [2 /*return*/];
                        return [4 /*yield*/, renderer_ts_1.render(tHash, hashArrValue)];
                    case 13:
                        renderedHashContentHash = _b.sent();
                        if (!(typeof renderedHashContentHash === "string")) return [3 /*break*/, 15];
                        return [4 /*yield*/, sha_ts_1.unHash(renderedHashContentHash)];
                    case 14:
                        _a = _b.sent();
                        return [3 /*break*/, 16];
                    case 15:
                        _a = "<p>Error</p>";
                        _b.label = 16;
                    case 16:
                        renderedHashContent = _a;
                        prevIndex = transformed.findIndex(function (x) { return x.hash === tHash; });
                        if (prevIndex > 0) {
                            t = __spreadArrays(transformed.slice(prevIndex, transformed.length));
                            if (t[0].code[0] !== codeHash)
                                t[0].code = __spreadArrays([codeHash], t[0].code);
                            if (code === c) {
                                changeWorkerRenderedComponent(function (s) { return (__assign(__assign({}, s), { error: "", transformed: __spreadArrays(transformed.slice(prevIndex)) })); });
                            }
                            return [2 /*return*/];
                        }
                        rendered = [
                            typeof renderedHashContent === "string"
                                ? renderedHashContent
                                : "<p>Error</p>",
                        ];
                        return [4 /*yield*/, sha_ts_1.hash(rendered)];
                    case 17:
                        renderedHash = _b.sent();
                        if (code === c) {
                            changeWorkerRenderedComponent(function (s) { return (__assign(__assign({}, s), { error: "", transformed: __spreadArrays([
                                    {
                                        hash: tHash,
                                        code: [codeHash],
                                        renderedHash: renderedHash,
                                        rendered: rendered
                                    }
                                ], (s.transformed)) })); });
                            hashArr.forEach(function (h, hashI) {
                                if (hashI > rendered.length) {
                                    hashArr.forEach(function (h, tk) { return __awaiter(void 0, void 0, void 0, function () {
                                        var renderedHash, renderHtml_1, renderedHashVal_1, _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0: return [4 /*yield*/, renderer_ts_1.render(tHash, h)];
                                                case 1:
                                                    renderedHash = _b.sent();
                                                    if (!(typeof renderedHash === "string")) return [3 /*break*/, 6];
                                                    return [4 /*yield*/, sha_ts_1.unHash(renderedHash)];
                                                case 2:
                                                    renderHtml_1 = _b.sent();
                                                    rendered[tk] = renderHtml_1;
                                                    if (!(rendered.length === hashArr.length)) return [3 /*break*/, 4];
                                                    return [4 /*yield*/, sha_ts_1.hash(rendered)];
                                                case 3:
                                                    _a = _b.sent();
                                                    return [3 /*break*/, 5];
                                                case 4:
                                                    _a = "";
                                                    _b.label = 5;
                                                case 5:
                                                    renderedHashVal_1 = _a;
                                                    changeWorkerRenderedComponent(function (s) {
                                                        s.transformed[0].rendered[tk] = renderHtml_1;
                                                        if (s.transformed[0].rendered.length === hashArr.length) {
                                                            s.transformed[0].renderedHash = renderedHashVal_1;
                                                        }
                                                        return s;
                                                    });
                                                    _b.label = 6;
                                                case 6: return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                }
                            });
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        runner(code);
    }, [code]);
    React.useEffect(function () {
        if (events.length !== hashArr.length)
            return;
        hashArr.forEach(function (h, hashI) {
            if (hashI > transformed[0].rendered.length) {
                transformed.forEach(function (t, tk) { return __awaiter(void 0, void 0, void 0, function () {
                    var renderedHash, rendered_1, renderedCopy, renderedHashVal_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(t.rendered.length < hashI)) return [3 /*break*/, 4];
                                return [4 /*yield*/, renderer_ts_1.render(t.hash, h)];
                            case 1:
                                renderedHash = _a.sent();
                                if (!(typeof renderedHash === "string")) return [3 /*break*/, 4];
                                return [4 /*yield*/, sha_ts_1.unHash(renderedHash)];
                            case 2:
                                rendered_1 = _a.sent();
                                renderedCopy = __spreadArrays(t.rendered);
                                renderedCopy[tk] = rendered_1;
                                return [4 /*yield*/, sha_ts_1.hash(renderedCopy)];
                            case 3:
                                renderedHashVal_2 = _a.sent();
                                changeWorkerRenderedComponent(function (s) {
                                    s.transformed[tk].rendered[hashI] = rendered_1;
                                    if (s.transformed[tk].rendered.length === hashArr.length) {
                                        s.transformed[tk].renderedHash = renderedHashVal_2;
                                    }
                                    return s;
                                });
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
            }
        });
    }, [transformed.length]);
    React.useEffect(function () {
        if (events.length > hashArr.length ||
            events.length > transformed[0].rendered.length) {
            events.forEach(function (v, k) { return __awaiter(void 0, void 0, void 0, function () {
                var hashArrValue, hashCopy, hashArrHash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (k < hashArr.length)
                                return [2 /*return*/];
                            return [4 /*yield*/, sha_ts_1.hash({
                                    events: events.slice(0, k)
                                })];
                        case 1:
                            hashArrValue = _a.sent();
                            hashCopy = __spreadArrays(hashArrValue);
                            hashCopy[k] = hashArrValue;
                            return [4 /*yield*/, sha_ts_1.hash(hashCopy)];
                        case 2:
                            hashArrHash = _a.sent();
                            changeProps(function (p) {
                                p.hashArr[k] = hashArrValue;
                                p.hashEvents = hashArrHash;
                                return p;
                            });
                            transformed.forEach(function (t, tk) { return __awaiter(void 0, void 0, void 0, function () {
                                var renderedHash, rendered_2, renderedCopy, renderedHashVal_3;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(t.rendered.length < k)) return [3 /*break*/, 4];
                                            return [4 /*yield*/, renderer_ts_1.render(t.hash, hashArrValue)];
                                        case 1:
                                            renderedHash = _a.sent();
                                            if (!(typeof renderedHash === "string")) return [3 /*break*/, 4];
                                            return [4 /*yield*/, sha_ts_1.unHash(renderedHash)];
                                        case 2:
                                            rendered_2 = _a.sent();
                                            renderedCopy = __spreadArrays(t.rendered);
                                            renderedCopy[tk] = rendered_2;
                                            return [4 /*yield*/, sha_ts_1.hash(renderedCopy)];
                                        case 3:
                                            renderedHashVal_3 = _a.sent();
                                            changeWorkerRenderedComponent(function (s) {
                                                s.transformed[tk].rendered[k] = rendered_2;
                                                s.transformed[tk].renderedHash = renderedHashVal_3;
                                                return s;
                                            });
                                            _a.label = 4;
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [2 /*return*/];
                    }
                });
            }); });
        }
    }, [events.length]);
    return React.createElement(React.Fragment, null,
        !!title && React.createElement(styledCodeBoxComps_tsx_1.Header, null,
            React.createElement("span", null, title),
            React.createElement("button", { onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                    var hash, dataObj, body, request;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                hash = transformed[0].code[0];
                                _a = {
                                    codeHash: hash,
                                    transpiledHash: transformed[0].hash
                                };
                                return [4 /*yield*/, sha_ts_1.unHash(transformed[0].code[0])];
                            case 1:
                                _a.code = _b.sent();
                                return [4 /*yield*/, sha_ts_1.unHash(transformed[0].hash)];
                            case 2:
                                dataObj = (_a.transpiledCode = _b.sent(),
                                    _a);
                                body = { results: [dataObj], errors: null, msg: "" };
                                request = new Request("https://code.zed.vision", {
                                    body: JSON.stringify(body),
                                    method: "POST",
                                    headers: { "Content-Type": "application/json;charset=UTF-8" }
                                });
                                //const response =
                                return [4 /*yield*/, fetch(request)];
                            case 3:
                                //const response =
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                }); } }, "Save")),
        React.createElement(styledCodeBoxComps_tsx_1.CodeContainer, { id: "container" }),
        React.createElement(styledCodeBoxComps_tsx_1.CodeContainer, { style: { display: "none" }, id: "ace" }),
        error
            ? React.createElement(styledCodeBoxComps_tsx_1.ErrorContainer, null,
                React.createElement("pre", null, error.toString()),
                React.createElement("button", { onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                        var code, monacoEditor;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sha_ts_1.unHash(transformed[0].code[0])];
                                case 1:
                                    code = _a.sent();
                                    monacoEditor = monaco.editor.getModel("file:///main.tsx");
                                    monacoEditor.setValue(code);
                                    changeCode(code);
                                    return [2 /*return*/];
                            }
                        });
                    }); } }, "Restore to the last working version"))
            : transformed.length > 0
                ? React.createElement(styledCodeBoxComps_tsx_1.ResultContainer, null,
                    React.createElement(codeboxComponents_tsx_1.ResultComponent, { transformed: transformed, key: transformed[0].renderedHash, events: events, onEvent: function (ev) {
                            changeProps(function (p) { return (__assign(__assign({}, p), { events: __spreadArrays(p.events, [ev]) })); });
                        } }))
                : React.createElement(React.Fragment, null));
};
exports.CodeBox = CodeBox;

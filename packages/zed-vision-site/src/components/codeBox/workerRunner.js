"use strict";
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
exports.__esModule = true;
exports.WorkerBox = void 0;
var React = require("react");
require("@ampproject/worker-dom/dist/main");
var sha_ts_1 = require("../utils/sha.ts");
var WorkerBox = function (_a) {
    var codeHash = _a.codeHash;
    var _b = React.useState(""), blob = _b[0], setBlob = _b[1];
    React.useEffect(function () {
        var run = function () { return __awaiter(void 0, void 0, void 0, function () {
            var versionA, url, iframeBlob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loadScript("https://cdn.jsdelivr.net/npm/@ampproject/worker-dom@0.27.4/dist/main.js")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, sha_ts_1.unHash(codeHash)];
                    case 2:
                        versionA = _a.sent();
                        return [4 /*yield*/, createSourceBlob(versionA)];
                    case 3:
                        url = _a.sent();
                        iframeBlob = createHTMLSourceBlob(url);
                        setBlob(iframeBlob);
                        return [2 /*return*/];
                }
            });
        }); };
        run();
    }, []);
    return blob
        ? React.createElement("iframe", { width: "800", height: "900", src: "/demo/react-map/index.html" })
        : React.createElement("div", null, "Empty");
};
exports.WorkerBox = WorkerBox;
function createSourceBlob(codeToRun) {
    return __awaiter(this, void 0, void 0, function () {
        var react, react_dom, reactTEXT, reactDOM, blob, iframeUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://cdn.skypack.dev/react@17.0.1/cjs/react.production.min.js")];
                case 1:
                    react = _a.sent();
                    return [4 /*yield*/, fetch("https://cdn.skypack.dev/react-dom@17.0.1/cjs/react-dom.production.min.js")];
                case 2:
                    react_dom = _a.sent();
                    return [4 /*yield*/, react.text()];
                case 3:
                    reactTEXT = _a.sent();
                    return [4 /*yield*/, react_dom.text()];
                case 4:
                    reactDOM = _a.sent();
                    blob = new Blob([reactTEXT + "\n                         " + reactDOM + "\n                         " + codeToRun], { type: "text/javascript" });
                    iframeUrl = window.URL.createObjectURL(blob);
                    return [2 /*return*/, iframeUrl];
            }
        });
    });
}
function loadScript(src) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var s;
                    s = document.createElement("script");
                    s.src = src;
                    s.onload = resolve;
                    s.onerror = reject;
                    document.head.appendChild(s);
                })];
        });
    });
}
function createHTMLSourceBlob(blobUrl) {
    var blob = new Blob(["\n<!doctype html>\n<html lang=\"en\">\n\n<head>\n  <meta charset=\"utf-8\">\n  <script src=\"https://cdn.jsdelivr.net/npm/@ampproject/worker-dom@0.27.4/dist/main.js\"></script>\n  <style>\n  body{\n    background-color: white;\n  }\n\n  </style>\n</head>\n\n<body>\n  <div src=\"" + blobUrl + "\"></div>\n\n  <script nomodule async=false defer>\n  document.addEventListener('DOMContentLoaded', function() {\n    MainThread.upgradeElement(document.getElementById('upgrade-me'), './dist/worker/worker.js');\n  }, false);\n</script>\n</html>\n"], { type: "text/html" });
    var iframeUrl = window.URL.createObjectURL(blob);
    return iframeUrl;
}

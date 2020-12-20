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
exports.IframeRunner = void 0;
var React = require("react");
var sha_ts_1 = require("../utils/sha.ts");
var IframeRunner = function (_a) {
    var transformed = _a.transformed;
    var _b = React.useState([]), events = _b[0], setEvents = _b[1];
    React.useEffect(function () {
        window.addEventListener("message", iframeEventListener);
        return function () { return window.removeEventListener("message", iframeEventListener); };
        function iframeEventListener(event) {
            if (event.data && event.data.events) {
                setEvents(event.data.events);
            }
        }
    });
    var _c = React.useState(""), iframeUrl = _c[0], setIframeUrl = _c[1];
    var _d = React.useState(""), targetURL = _d[0], setTarget = _d[1];
    React.useEffect(function () {
        var run = function () { return __awaiter(void 0, void 0, void 0, function () {
            var codeToRun, iframeUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setEvents([]);
                        return [4 /*yield*/, sha_ts_1.unHash(transformed[0].hash)];
                    case 1:
                        codeToRun = _a.sent();
                        iframeUrl = createSourceBlob(codeToRun, events, false);
                        setIframeUrl(iframeUrl);
                        return [2 /*return*/];
                }
            });
        }); };
        run();
    }, [transformed[0].code]);
    React.useEffect(function () {
        var run = function () { return __awaiter(void 0, void 0, void 0, function () {
            var codeToRun, iframeUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sha_ts_1.unHash(transformed[transformed.length - 1].hash)];
                    case 1:
                        codeToRun = _a.sent();
                        iframeUrl = createSourceBlob(codeToRun, events, true);
                        setTarget(iframeUrl);
                        return [2 /*return*/];
                }
            });
        }); };
        run();
    }, [transformed[0].code, events]);
    return React.createElement(React.Fragment, null,
        React.createElement("iframe", { src: iframeUrl }),
        React.createElement("div", null, iframeUrl),
        React.createElement("iframe", { width: "400px", height: "400px", src: targetURL }),
        React.createElement("code", null, JSON.stringify(events).toString()));
};
exports.IframeRunner = IframeRunner;
function createSourceBlob(codeToRun, events, replay) {
    var blob = new Blob(["\n<!doctype html>\n<html lang=\"en\">\n\n<head>\n  <meta charset=\"utf-8\">\n  <script crossorigin src=\"https://cdn.skypack.dev/react@17.0.0.1/umd/react.development.js\"></script>\n  <script crossorigin src=\"https://cdn.skypack.dev/react-dom@17.0.1/umd/react-dom.development.js\"></script>\n  <link\n  rel=\"stylesheet\"\n  href=\"https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css\"\n/>\n<script src=\"https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.js\"></script>\n  <style>\n  body{\n    background-color: white;\n  }\n\n  </style>\n</head>\n\n<body>\n  <div id=\"zbody\"></div>\n  \n  <script>\n\n\n\n  " + codeToRun + "\n  ReactDOM.render(React.createElement(Counter, {}, {}), document.getElementById(\"zbody\"));\n\n\n    \n    \n\n       \n       const replay = " + replay + "\n\n   if (!replay){\n\n    let events = []\n   \n    rrweb.record({\n        emit(event) {\n\n            events.push(event);\n      //      console.log(events.length);\n          window.parent.postMessage({events})\n        },\n        checkoutEveryNth: 20\n    });\n\n    \n\n  \n}\nelse {\n    const events = " + JSON.stringify(events) + ";\n\n    const replayer = new rrweb.Replayer(events, {skipInactive: true, speed: 3});\nreplayer.play();\n}\n\n    </script>\n\n</html>\n"], { type: "text/html" });
    var iframeUrl = window.URL.createObjectURL(blob);
    return iframeUrl;
}

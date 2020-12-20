"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
exports.__esModule = true;
exports.Qr = void 0;
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_2 = require("react");
var loadScript_js_1 = require("../../loadScript.js");
var Qr = function () {
    var ref = react_2["default"].useRef(null);
    var _a = react_2["default"].useState(3), retry = _a[0], setRetry = _a[1];
    var _b = react_2["default"].useState(0), counter = _b[0], setCounter = _b[1];
    react_2["default"].useEffect(function () {
        var qr;
        var connect = function () { return __awaiter(void 0, void 0, void 0, function () {
            var req, data, key, url, options, check, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loadScript_js_1.loadScript("https://cdn.skypack.dev/@zedvision/qrious@8.5.7/dist/qrious.min.js")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, fetch("https://code.zed.vision/token")];
                    case 2:
                        req = _a.sent();
                        return [4 /*yield*/, req.json()];
                    case 3:
                        data = _a.sent();
                        setCounter(60);
                        key = data.key;
                        url = "https://zed.vision/" + key;
                        options = {
                            element: ref.current,
                            size: 200,
                            foregroundAlpha: .9,
                            foreground: "red",
                            padding: 12,
                            backgroundAlpha: 0.8,
                            background: "black",
                            value: url
                        };
                        if (qr) {
                            qr.set(options);
                        }
                        else {
                            qr = new window.QRious(options);
                        }
                        return [4 /*yield*/, fetch("https://code.zed.vision/check?key=" + key)];
                    case 4:
                        check = _a.sent();
                        return [4 /*yield*/, check.json()];
                    case 5:
                        res = _a.sent();
                        if (res.expired === false) {
                            location.href = "https://zed.vision/code/";
                        }
                        setRetry(retry - 1);
                        return [2 /*return*/];
                }
            });
        }); };
        if (typeof window !== "undefined" && retry > 0)
            connect();
    }, [retry]);
    react_2["default"].useEffect(function () {
        if (typeof window !== "undefined" && counter) {
            setTimeout(function () { return setCounter(function (x) { return x - 1; }); }, 1000);
        }
    }, [counter]);
    return react_1.jsx("a", { href: "/code/" }, retry > 0 && react_1.jsx("div", { css: react_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        background: blue;\n        display: inline-block;\n        padding: 10px 10px 0px 10px;\n        border-radius: 12px;\n        text-align: center;\n    "], ["\n        background: blue;\n        display: inline-block;\n        padding: 10px 10px 0px 10px;\n        border-radius: 12px;\n        text-align: center;\n    "]))) },
        react_1.jsx("img", { css: react_1.css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n              display: block;\n              box-shadow: 0 0 ", "px 5px ", ";\n          "], ["\n              display: block;\n              box-shadow: 0 0 ", "px 5px ",
                ";\n          "])), 10 + counter, retry === 3 ? "darkorange" : retry === 2 ? "green" : "darkred"), ref: ref }),
        react_1.jsx("p", { css: react_1.css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n              font-family: Roboto;\n              font-size: 20px;\n              text-transform: uppercase; \n              color: white;\n            "], ["\n              font-family: Roboto;\n              font-size: 20px;\n              text-transform: uppercase; \n              color: white;\n            "]))) }, "Connect device")));
};
exports.Qr = Qr;
var templateObject_1, templateObject_2, templateObject_3;
//

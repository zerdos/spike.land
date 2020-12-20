"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.DraggableWindow = void 0;
/** @jsx jsx */
var react_1 = require("@emotion/react");
var framer_motion_1 = require("framer-motion");
var react_2 = require("react");
var DraggableWindow = function (_a) {
    var onShare = _a.onShare;
    var _b = react_2["default"].useState(100), scale = _b[0], changeScale = _b[1];
    var ref = react_2["default"].useRef(null);
    return react_1.jsx(framer_motion_1.motion.div, { ref: ref, css: "\n            background: red;\n            max-width: 80%;\n            left: 60%;\n            border: 4px solid red; \n            border-radius: 8px;\n          ", whileDrag: {
            scale: scale / 100 * 0.7
        }, animate: {
            scale: scale / 100
        }, dragElastic: 0.5, dragMomentum: false, transition: {
        // duration: 0.5
        }, drag: true },
        react_1.jsx("div", { css: react_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      display: block;\n      width: 100%;\n      text-align: right;\n      background: linear-gradient(0deg, darkred, red);\n    "], ["\n      display: block;\n      width: 100%;\n      text-align: right;\n      background: linear-gradient(0deg, darkred, red);\n    "]))) },
            react_1.jsx("button", { onClick: function () { return changeScale(function (x) { return x - 10; }); }, css: buttonCss({ color: "green", square: true }) }, "-"),
            react_1.jsx("div", { css: react_1.css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        color:white;\n        padding: 7px;\n        display:inline;\n        background: \n        font-family: Roboto;\n        font-weight: 600;\n        margin-left: 0px;\n        margin-right: -25px;\n      "], ["\n        color:white;\n        padding: 7px;\n        display:inline;\n        background: \n        font-family: Roboto;\n        font-weight: 600;\n        margin-left: 0px;\n        margin-right: -25px;\n      "]))) },
                scale,
                "%"),
            react_1.jsx("button", { onClick: function () { return changeScale(function (x) { return x + 10; }); }, css: buttonCss({ color: "green", square: true }) }, "+"),
            react_1.jsx("button", { css: buttonCss({}), onClick: function () {
                    console.log(ref.current.clientHeight);
                    onShare();
                } }, "\uD83C\uDF0E Export")),
        react_1.jsx("div", { css: react_1.css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["  \n      display: block;\n      overflow: hidden;\n      min-width: 200px;\n      padding: 30px;\n      max-width: 600px;\n      background: white;\n      max-height: 800px;\n      overflow-y: scroll;\n      overflow-wrap: break-word;\n      border-radius: 0px 0px 8px 8px;\n    "], ["  \n      display: block;\n      overflow: hidden;\n      min-width: 200px;\n      padding: 30px;\n      max-width: 600px;\n      background: white;\n      max-height: 800px;\n      overflow-y: scroll;\n      overflow-wrap: break-word;\n      border-radius: 0px 0px 8px 8px;\n    "]))), id: "zbody" }, "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD"));
};
exports.DraggableWindow = DraggableWindow;
var buttonCss = function (_a) {
    var _b = _a.color, color = _b === void 0 ? "darkred" : _b, _c = _a.square, square = _c === void 0 ? false : _c;
    return react_1.css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n              background: ", ";\n              margin-top: -4px;\n              margin-right: -4px;\n              color: white;\n              cursor: pointer;\n              font-weight: bold;\n              font-family: Roboto;\n              padding: 8px 16px;\n              outline: none;\n              border: none; \n              margin-left: 20px;\n              border-radius: 0px ", "px 0px 0px;\n            "], ["\n              background: ", ";\n              margin-top: -4px;\n              margin-right: -4px;\n              color: white;\n              cursor: pointer;\n              font-weight: bold;\n              font-family: Roboto;\n              padding: 8px 16px;\n              outline: none;\n              border: none; \n              margin-left: 20px;\n              border-radius: 0px ", "px 0px 0px;\n            "])), color, square ? 0 : 8);
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;

"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
/** @jsx jsx */
var react_2 = require("@emotion/react");
var Slider = function () {
    var steps = 128;
    var _a = react_1.useState(steps / 2), sliderValue = _a[0], setSlider = _a[1];
    return react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("input", { max: steps, css: react_2.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        appearance: none;\n        width: 100%;\n        height: 40px; \n        background: rgb(", " ", " 0); \n        outline: none; \n    "], ["\n        appearance: none;\n        width: 100%;\n        height: 40px; \n        background: rgb(", " ",
                " 0); \n        outline: none; \n    "])), 255 / steps * sliderValue, 255 / steps *
                (steps - sliderValue)), type: "range", "aria-label": "font size changer", value: sliderValue, step: "1", onChangeCapture: function (e) { return setSlider(Number(e.currentTarget.value)); } }),
        react_1["default"].createElement("p", { css: react_2.css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        font-size: ", "px\n        "], ["\n        font-size: ", "px\n        "])), 72 / steps * sliderValue) }, "Example when the text gets bigger..."),
        react_1["default"].createElement("p", { css: react_2.css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n        font-size: ", "px\n        "], ["\n        font-size: ", "px\n        "])), 72 / steps * (steps - sliderValue)) }, "...or smaller"));
};
exports["default"] = (function () {
    return react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_2.Global, { styles: react_2.css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      body{\n          margin: 0;\n          overflow: overlay;\n        }  \n    "], ["\n      body{\n          margin: 0;\n          overflow: overlay;\n        }  \n    "]))) }),
        react_1["default"].createElement(Slider, null));
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;

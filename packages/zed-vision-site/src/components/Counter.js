"use strict";
exports.__esModule = true;
exports.Counter = void 0;
var react_1 = require("react");
var Counter = function (_a) {
    var _b = _a.initial, initial = _b === void 0 ? 0 : _b;
    var _c = react_1.useState(initial), clicks = _c[0], setClicks = _c[1];
    return react_1["default"].createElement("div", null,
        react_1["default"].createElement("p", null,
            "Clicks: ",
            clicks),
        react_1["default"].createElement("button", { onClick: function () { return setClicks(clicks + 1); } }, "+"),
        react_1["default"].createElement("button", { onClick: function () { return setClicks(clicks - 1); } }, "-"));
};
exports.Counter = Counter;

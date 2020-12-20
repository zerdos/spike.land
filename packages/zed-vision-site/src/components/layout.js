"use strict";
exports.__esModule = true;
exports.Layout = void 0;
var React = require("react");
var globalStyle_tsx_1 = require("./utils/globalStyle.tsx");
var Layout = function (_a) {
    var children = _a.children;
    return React.createElement(React.Fragment, null,
        React.createElement(globalStyle_tsx_1.GlobalStyle, null),
        React.createElement(globalStyle_tsx_1.MainContainer, null, children));
};
exports.Layout = Layout;

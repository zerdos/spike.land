"use strict";
exports.__esModule = true;
var React = require("react");
var CodeBox_tsx_1 = require("../components/codeBox/CodeBox.tsx");
var layout_tsx_1 = require("../components/layout.tsx");
var seo_tsx_1 = require("../components/seo.tsx");
function Page() {
    return React.createElement(layout_tsx_1.Layout, null,
        React.createElement(seo_tsx_1.SEO, { title: "Code Box" }),
        React.createElement("h1", null, "Code box"),
        React.createElement("p", null, "Lets see!"),
        React.createElement(CodeBox_tsx_1.CodeBox, { title: "Example1 :)" }));
}
exports["default"] = Page;

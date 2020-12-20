"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.pageQuery = void 0;
var React = require("react");
var gatsby_1 = require("gatsby");
var layout_tsx_1 = require("../components/layout.tsx");
var seo_tsx_1 = require("../components/seo.tsx");
var NotFoundPage = function () {
    return (React.createElement(layout_tsx_1.Layout, null,
        React.createElement(seo_tsx_1.SEO, { title: "... offline" }),
        React.createElement("h1", null, "Maybe you are offline"),
        React.createElement("p", null, "Check your internet connection")));
};
exports["default"] = NotFoundPage;
exports.pageQuery = gatsby_1.graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query {\n    site {\n      siteMetadata {\n        title\n      }\n    }\n  }\n"], ["\n  query {\n    site {\n      siteMetadata {\n        title\n      }\n    }\n  }\n"])));
var templateObject_1;

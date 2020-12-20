"use strict";
exports.__esModule = true;
exports.query = void 0;
var React = require("react");
var layout_1 = require("../components/layout");
var seo_1 = require("../components/seo");
var gatsby_1 = require("gatsby");
// If you don't want to use TypeScript you can delete this file!
var UsingTypescript = function (_a) {
    var path = _a.path;
    return (React.createElement(layout_1.Layout, null,
        React.createElement(seo_1.SEO, { title: "Using TypeScript" }),
        React.createElement("h1", null, "Gatsby supports TypeScript by default!"),
        React.createElement("p", null,
            "This means that you can create and write ",
            React.createElement("em", null, ".ts/.tsx"),
            "files for your pages, components etc. Please note that the ",
            React.createElement("em", null, "gatsby-*.js"),
            " files (like gatsby-node.js) currently do not support TypeScript yet."),
        React.createElement("p", null,
            "For type checking you will want to install ",
            React.createElement("em", null, "typescript"),
            "via npm and run ",
            React.createElement("em", null, "tsc --init"),
            " to create a ",
            React.createElement("em", null, ".tsconfig"),
            " file."),
        React.createElement("p", null,
            "You are currently on the page ",
            path,
            "\\\\"),
        React.createElement(gatsby_1.Link, { to: "/" }, "Go back to the homepage")));
};
exports["default"] = UsingTypescript;
exports.query = null;

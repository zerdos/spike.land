"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.Bio = void 0;
var React = require("react");
var styled_1 = require("@emotion/styled");
var typography_1 = require("./utils/typography");
var zed_profile_pic_jpg_1 = require("./zed-profile-pic.jpg");
var Container = styled_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-top: ", ";\n  display: flex;\n  margin-bottom: ", ";\n"], ["\n  margin-top: ", ";\n  display: flex;\n  margin-bottom: ", ";\n"])), typography_1.rhythm(2.5), typography_1.rhythm(2.5));
var StyledImgDiv = styled_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin-right: ", ";\n  margin-bottom: 0;\n  overflow: hidden;\n  width: 50px;\n  height: 50px;\n  border-radius: 25px;\n"], ["\n  margin-right: ", ";\n  margin-bottom: 0;\n  overflow: hidden;\n  width: 50px;\n  height: 50px;\n  border-radius: 25px;\n"])), typography_1.rhythm(1 / 2));
var objectives = [
    "a bit less\n  frustrating.",
    "more fun",
    "great again",
];
var Bio = function () {
    var random = Math.random();
    if (typeof window === "undefined")
        random = 0.4; //have a consistent ssr
    return (React.createElement(Container, null,
        React.createElement(StyledImgDiv, null,
            React.createElement("img", { alt: "Zoltan Erdos", src: zed_profile_pic_jpg_1["default"] })),
        React.createElement("p", null,
            "Written by ",
            React.createElement("strong", null, "Zoltan Erdos"),
            ", who is interested to make software development",
            " " + (objectives[Math.floor(random * objectives.length)] || "crazy."),
            React.createElement("br", null),
            React.createElement("a", { href: "https://twitter.com/ZoltanErdos" }, "Follow me on Twitter"))));
};
exports.Bio = Bio;
var templateObject_1, templateObject_2;

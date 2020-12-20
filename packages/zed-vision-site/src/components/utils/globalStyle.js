"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else cooked.raw = raw;
    return cooked;
  };
exports.__esModule = true;
exports.MainContainer = exports.GlobalStyle = void 0;
var React = require("react");
var typography_ts_1 = require("./typography.ts");
var normalize_css_tsx_1 = require("./normalize-css.tsx");
var fonts_ts_1 = require("./fonts.ts");
/** @jsx jsx */
var react_1 = require("@emotion/react");
var styles = typography_ts_1["default"].createStyles().replace(
  /first-child/gi,
  "first-of-type",
);
var GlobalStyle = function () {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      react_1.Global,
      {
        styles: react_1.css(
          templateObject_1 ||
            (templateObject_1 = __makeTemplateObject(
              ["\n      ", "\n      "],
              ["\n      ", "\n      "],
            )),
          normalize_css_tsx_1.normalize,
        ),
      },
    ),
  );
};
exports.GlobalStyle = GlobalStyle;
var MainContainer = function (_a) {
  var children = _a.children;
  return React.createElement(
    "div",
    {
      css: react_1.css(
        templateObject_2 ||
          (templateObject_2 = __makeTemplateObject(
            ["\n      ", "\n      ", "\n  "],
            ["\n      ", "\n      ", "\n  "],
          )),
        fonts_ts_1.fonts,
        styles,
      ),
    },
    React.createElement(
      "main",
      {
        css: react_1.css(
          templateObject_3 ||
            (templateObject_3 = __makeTemplateObject(
              ["  \n  max-width: 1140px;\n  margin: auto;\n  "],
              ["  \n  max-width: 1140px;\n  margin: auto;\n  "],
            )),
        ),
      },
      children,
    ),
  );
};
exports.MainContainer = MainContainer;
var templateObject_1, templateObject_2, templateObject_3;

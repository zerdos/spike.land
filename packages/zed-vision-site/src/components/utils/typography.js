"use strict";
exports.__esModule = true;
exports.scale = exports.rhythm = void 0;
var typography_1 = require("typography");
var typography_theme_wordpress_2016_1 = require(
  "typography-theme-wordpress-2016",
);
var typography = new typography_1["default"](
  typography_theme_wordpress_2016_1["default"],
);
// // Hot reload typography in development.
// if (process.env.NODE_ENV !== `production`) {
//   typography.injectStyles();
// }
exports.rhythm = typography.rhythm;
exports.scale = typography.scale;
exports["default"] = typography;

"use strict";

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/* eslint-disable */
var isElectron = require("is-electron");

var fs = !isElectron() &&
    ((typeof window === "undefined"
          ? "undefined"
          : (0, _typeof3.default)(window)) === "object" ||
      (typeof self === "undefined"
          ? "undefined"
          : (0, _typeof3.default)(self)) === "object")
  ? null
  : eval('require("fs")');

module.exports = fs;

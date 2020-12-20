"use strict";
var __awaiter = (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator = (this && this.__generator) || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: [],
    },
    f,
    y,
    t,
    g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) },
    typeof Symbol === "function" && (g[Symbol.iterator] = function () {
      return this;
    }),
    g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) {
      try {
        if (
          f = 1,
            y && (t = op[0] & 2
              ? y["return"]
              : op[0]
              ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
              : y.next) &&
            !(t = t.call(y, op[1])).done
        ) {
          return t;
        }
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (
              !(t = _.trys, t = t.length > 0 && t[t.length - 1]) &&
              (op[0] === 6 || op[0] === 2)
            ) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }
  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }
  return r;
};
exports.__esModule = true;
exports.assemble = exports.isDiff = exports.diff = void 0;
var base_js_1 = require("https://unpkg.com/diff@5.0.0/lib/diff/base.js");
var sha256_js_1 = require(
  "https://unpkg.com/@zedvision/code@8.6.3/dist/sha256.js",
);
var diff = function (str1, str2) {
  return __awaiter(void 0, void 0, void 0, function () {
    var sha1Str1, res;
    var _a;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          sha1Str1 = sha256_js_1.sha256(str1);
          res = exports.diff(str1, str2);
          _a = {};
          return [4, /*yield*/ sha1Str1];
        case 1:
          return [
            2, /*return*/
            (_a.b = _b.sent(),
              _a.c = res.map(function (x) {
                return x.added ? x.value : x.removed ? -x.count : x.count;
              }),
              _a),
          ];
      }
    });
  });
};
exports.diff = diff;
var isDiff = function (str) {
  if (str.length < 10) {
    return false;
  }
  var isKey = __spreadArrays((str.slice(0, 8))).filter(function (x) {
    return x < "0" || x > "f";
  }).length === 0;
  var maybeInst = str.slice(8);
  if (
    isKey && maybeInst[0] === "[" && maybeInst[maybeInst.length - 1] === "]"
  ) {
    try {
      return JSON.parse(maybeInst).length > 1;
    } catch (_a) {
      return false;
    }
  }
  return false;
};
exports.isDiff = isDiff;
var assemble = function (oldValue, instructions) {
  var instArr = JSON.parse(instructions);
  var old = oldValue.slice();
  var ret = "";
  instArr.forEach(function (element) {
    if (Number(element) === element) {
      var absNum = Math.abs(element);
      var currentString = old.slice(0, absNum);
      old = old.slice(absNum);
      if (element > 0) {
        ret += String(currentString);
      }
    } else {
      ret += String(element);
    }
  });
  return ret;
};
exports.assemble = assemble;

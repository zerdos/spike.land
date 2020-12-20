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
exports.__esModule = true;
exports.transform = void 0;
var sha_ts_1 = require("./sha.ts");
var cache = {};
var worker = (typeof window !== "undefined")
  ? new Worker(
    URL.createObjectURL(
      new window.Blob(
        ['\nimportScripts(\'https://cdn.skypack.dev/@babel/standalone@7.12.11/babel.min.js\');\n\nself.onmessage=(message)=>{\n  const hash = message.data.hash;\n\ntry{\n  const translatedMessage = Babel.transform(message.data.code, {\nplugins: [],\npresets: ["react", ["typescript", { isTSX: true, allExtensions: true }]],\n}).code.replace("export const", "const").replace("import ", "//mport ").replace("import ", "//mport ")\n\n    postMessage({hash, translatedCode: translatedMessage})\n} catch(e){\n  postMessage({hash, translatedCode: "error", error: e})\n}\n\n}\n'],
        { type: "application/javascript" },
      ),
    ),
  )
  : { onmessage: function () {}, postMessage: function () {} };
worker.onmessage = function (message) {
  return __awaiter(void 0, void 0, void 0, function () {
    var codeHash, errorHash, transformedCodeHash;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          codeHash = message.data.hash;
          if (typeof cache[codeHash] === "string") {
            return [2 /*return*/];
          }
          if (!(typeof cache[codeHash] === "object")) return [3, /*break*/ 4];
          if (!message.data.error) return [3, /*break*/ 2];
          return [4, /*yield*/ sha_ts_1.hash(message.data.error)];
        case 1:
          errorHash = _a.sent();
          cache[codeHash].reject(errorHash);
          cache[codeHash] = { error: errorHash };
          return [2 /*return*/];
        case 2:
          return [4, /*yield*/ sha_ts_1.hash(message.data.translatedCode)];
        case 3:
          transformedCodeHash = _a.sent();
          cache[codeHash].resolve(transformedCodeHash);
          cache[codeHash] = transformedCodeHash;
          _a.label = 4;
        case 4:
          return [2 /*return*/];
      }
    });
  });
};
var transform = function (codeHash) {
  return __awaiter(void 0, void 0, void 0, function () {
    var code, returnPromise_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4, /*yield*/ sha_ts_1.unHash(codeHash)];
        case 1:
          code = _a.sent();
          if (typeof cache[codeHash] === "string") {
            return [2, /*return*/ cache[codeHash]];
          }
          if (typeof cache[codeHash] === "undefined") {
            worker.postMessage({ hash: codeHash, code: code });
            returnPromise_1 = new Promise(function (resolve, reject) {
              cache[codeHash] = {
                resolve: resolve,
                reject: reject,
                promise: returnPromise_1,
              };
            });
            return [2, /*return*/ returnPromise_1];
          }
          if (cache[codeHash] && cache[codeHash].error) {
            return [2, /*return*/ Promise.reject(cache[codeHash].error)];
          }
          return [2, /*return*/ cache[codeHash].promise];
      }
    });
  });
};
exports.transform = transform;

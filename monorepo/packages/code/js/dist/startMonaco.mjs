// ../smart-monaco-editor/dist/editor.mjs
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, copyDefault, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};
var require_os = __commonJS({
  "(disabled):os"() {
  }
});
var require_DummySourceCache = __commonJS({
  "../monaco-editor-auto-typings/lib/DummySourceCache.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DummySourceCache = void 0;
    var DummySourceCache = function() {
      function DummySourceCache2() {
      }
      DummySourceCache2.prototype.getFile = function(uri) {
        return Promise.resolve(void 0);
      };
      DummySourceCache2.prototype.isFileAvailable = function(uri) {
        return Promise.resolve(false);
      };
      DummySourceCache2.prototype.storeFile = function(uri, content) {
        return Promise.resolve(void 0);
      };
      DummySourceCache2.prototype.clear = function() {
        return Promise.resolve(void 0);
      };
      return DummySourceCache2;
    }();
    exports.DummySourceCache = DummySourceCache;
  }
});
var require_UnpkgSourceResolver = __commonJS({
  "../monaco-editor-auto-typings/lib/UnpkgSourceResolver.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
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
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
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
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
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
                if (t[2])
                  _.ops.pop();
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
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UnpkgSourceResolver = void 0;
    var UnpkgSourceResolver = function() {
      function UnpkgSourceResolver2() {
      }
      UnpkgSourceResolver2.prototype.resolvePackageJson = function(packageName, version2, subPath) {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.resolveFile("https://unpkg.com/".concat(packageName).concat(version2 ? "@".concat(version2) : "").concat(subPath ? "/".concat(subPath) : "", "/package.json"))];
              case 1:
                return [2, _a.sent()];
            }
          });
        });
      };
      UnpkgSourceResolver2.prototype.resolveSourceFile = function(packageName, version2, path) {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.resolveFile("https://unpkg.com/".concat(packageName).concat(version2 ? "@".concat(version2) : "", "/").concat(path))];
              case 1:
                return [2, _a.sent()];
            }
          });
        });
      };
      UnpkgSourceResolver2.prototype.resolveFile = function(url) {
        return __awaiter(this, void 0, void 0, function() {
          var res;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, fetch(url, { method: "GET" })];
              case 1:
                res = _a.sent();
                if (!res.ok)
                  return [3, 3];
                return [4, res.text()];
              case 2:
                return [2, _a.sent()];
              case 3:
                if (res.status === 404) {
                  return [2, ""];
                } else {
                  throw Error("Error other than 404 while fetching from Unpkg at ".concat(url));
                }
                _a.label = 4;
              case 4:
                return [2];
            }
          });
        });
      };
      return UnpkgSourceResolver2;
    }();
    exports.UnpkgSourceResolver = UnpkgSourceResolver;
  }
});
var require_path_browserify = __commonJS({
  "../../node_modules/path-browserify/index.js"(exports, module) {
    "use strict";
    function assertPath(path) {
      if (typeof path !== "string") {
        throw new TypeError("Path must be a string. Received " + JSON.stringify(path));
      }
    }
    function normalizeStringPosix(path, allowAboveRoot) {
      var res = "";
      var lastSegmentLength = 0;
      var lastSlash = -1;
      var dots = 0;
      var code;
      for (var i = 0; i <= path.length; ++i) {
        if (i < path.length)
          code = path.charCodeAt(i);
        else if (code === 47)
          break;
        else
          code = 47;
        if (code === 47) {
          if (lastSlash === i - 1 || dots === 1) {
          } else if (lastSlash !== i - 1 && dots === 2) {
            if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
              if (res.length > 2) {
                var lastSlashIndex = res.lastIndexOf("/");
                if (lastSlashIndex !== res.length - 1) {
                  if (lastSlashIndex === -1) {
                    res = "";
                    lastSegmentLength = 0;
                  } else {
                    res = res.slice(0, lastSlashIndex);
                    lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                  }
                  lastSlash = i;
                  dots = 0;
                  continue;
                }
              } else if (res.length === 2 || res.length === 1) {
                res = "";
                lastSegmentLength = 0;
                lastSlash = i;
                dots = 0;
                continue;
              }
            }
            if (allowAboveRoot) {
              if (res.length > 0)
                res += "/..";
              else
                res = "..";
              lastSegmentLength = 2;
            }
          } else {
            if (res.length > 0)
              res += "/" + path.slice(lastSlash + 1, i);
            else
              res = path.slice(lastSlash + 1, i);
            lastSegmentLength = i - lastSlash - 1;
          }
          lastSlash = i;
          dots = 0;
        } else if (code === 46 && dots !== -1) {
          ++dots;
        } else {
          dots = -1;
        }
      }
      return res;
    }
    function _format(sep, pathObject) {
      var dir = pathObject.dir || pathObject.root;
      var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
      if (!dir) {
        return base;
      }
      if (dir === pathObject.root) {
        return dir + base;
      }
      return dir + sep + base;
    }
    var posix = {
      resolve: function resolve() {
        var resolvedPath = "";
        var resolvedAbsolute = false;
        var cwd;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path;
          if (i >= 0)
            path = arguments[i];
          else {
            if (cwd === void 0)
              cwd = process.cwd();
            path = cwd;
          }
          assertPath(path);
          if (path.length === 0) {
            continue;
          }
          resolvedPath = path + "/" + resolvedPath;
          resolvedAbsolute = path.charCodeAt(0) === 47;
        }
        resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
        if (resolvedAbsolute) {
          if (resolvedPath.length > 0)
            return "/" + resolvedPath;
          else
            return "/";
        } else if (resolvedPath.length > 0) {
          return resolvedPath;
        } else {
          return ".";
        }
      },
      normalize: function normalize(path) {
        assertPath(path);
        if (path.length === 0)
          return ".";
        var isAbsolute = path.charCodeAt(0) === 47;
        var trailingSeparator = path.charCodeAt(path.length - 1) === 47;
        path = normalizeStringPosix(path, !isAbsolute);
        if (path.length === 0 && !isAbsolute)
          path = ".";
        if (path.length > 0 && trailingSeparator)
          path += "/";
        if (isAbsolute)
          return "/" + path;
        return path;
      },
      isAbsolute: function isAbsolute(path) {
        assertPath(path);
        return path.length > 0 && path.charCodeAt(0) === 47;
      },
      join: function join() {
        if (arguments.length === 0)
          return ".";
        var joined;
        for (var i = 0; i < arguments.length; ++i) {
          var arg = arguments[i];
          assertPath(arg);
          if (arg.length > 0) {
            if (joined === void 0)
              joined = arg;
            else
              joined += "/" + arg;
          }
        }
        if (joined === void 0)
          return ".";
        return posix.normalize(joined);
      },
      relative: function relative(from, to) {
        assertPath(from);
        assertPath(to);
        if (from === to)
          return "";
        from = posix.resolve(from);
        to = posix.resolve(to);
        if (from === to)
          return "";
        var fromStart = 1;
        for (; fromStart < from.length; ++fromStart) {
          if (from.charCodeAt(fromStart) !== 47)
            break;
        }
        var fromEnd = from.length;
        var fromLen = fromEnd - fromStart;
        var toStart = 1;
        for (; toStart < to.length; ++toStart) {
          if (to.charCodeAt(toStart) !== 47)
            break;
        }
        var toEnd = to.length;
        var toLen = toEnd - toStart;
        var length = fromLen < toLen ? fromLen : toLen;
        var lastCommonSep = -1;
        var i = 0;
        for (; i <= length; ++i) {
          if (i === length) {
            if (toLen > length) {
              if (to.charCodeAt(toStart + i) === 47) {
                return to.slice(toStart + i + 1);
              } else if (i === 0) {
                return to.slice(toStart + i);
              }
            } else if (fromLen > length) {
              if (from.charCodeAt(fromStart + i) === 47) {
                lastCommonSep = i;
              } else if (i === 0) {
                lastCommonSep = 0;
              }
            }
            break;
          }
          var fromCode = from.charCodeAt(fromStart + i);
          var toCode = to.charCodeAt(toStart + i);
          if (fromCode !== toCode)
            break;
          else if (fromCode === 47)
            lastCommonSep = i;
        }
        var out = "";
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
          if (i === fromEnd || from.charCodeAt(i) === 47) {
            if (out.length === 0)
              out += "..";
            else
              out += "/..";
          }
        }
        if (out.length > 0)
          return out + to.slice(toStart + lastCommonSep);
        else {
          toStart += lastCommonSep;
          if (to.charCodeAt(toStart) === 47)
            ++toStart;
          return to.slice(toStart);
        }
      },
      _makeLong: function _makeLong(path) {
        return path;
      },
      dirname: function dirname(path) {
        assertPath(path);
        if (path.length === 0)
          return ".";
        var code = path.charCodeAt(0);
        var hasRoot = code === 47;
        var end = -1;
        var matchedSlash = true;
        for (var i = path.length - 1; i >= 1; --i) {
          code = path.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              end = i;
              break;
            }
          } else {
            matchedSlash = false;
          }
        }
        if (end === -1)
          return hasRoot ? "/" : ".";
        if (hasRoot && end === 1)
          return "//";
        return path.slice(0, end);
      },
      basename: function basename(path, ext) {
        if (ext !== void 0 && typeof ext !== "string")
          throw new TypeError('"ext" argument must be a string');
        assertPath(path);
        var start = 0;
        var end = -1;
        var matchedSlash = true;
        var i;
        if (ext !== void 0 && ext.length > 0 && ext.length <= path.length) {
          if (ext.length === path.length && ext === path)
            return "";
          var extIdx = ext.length - 1;
          var firstNonSlashEnd = -1;
          for (i = path.length - 1; i >= 0; --i) {
            var code = path.charCodeAt(i);
            if (code === 47) {
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else {
              if (firstNonSlashEnd === -1) {
                matchedSlash = false;
                firstNonSlashEnd = i + 1;
              }
              if (extIdx >= 0) {
                if (code === ext.charCodeAt(extIdx)) {
                  if (--extIdx === -1) {
                    end = i;
                  }
                } else {
                  extIdx = -1;
                  end = firstNonSlashEnd;
                }
              }
            }
          }
          if (start === end)
            end = firstNonSlashEnd;
          else if (end === -1)
            end = path.length;
          return path.slice(start, end);
        } else {
          for (i = path.length - 1; i >= 0; --i) {
            if (path.charCodeAt(i) === 47) {
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else if (end === -1) {
              matchedSlash = false;
              end = i + 1;
            }
          }
          if (end === -1)
            return "";
          return path.slice(start, end);
        }
      },
      extname: function extname(path) {
        assertPath(path);
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var preDotState = 0;
        for (var i = path.length - 1; i >= 0; --i) {
          var code = path.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              startPart = i + 1;
              break;
            }
            continue;
          }
          if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
          if (code === 46) {
            if (startDot === -1)
              startDot = i;
            else if (preDotState !== 1)
              preDotState = 1;
          } else if (startDot !== -1) {
            preDotState = -1;
          }
        }
        if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          return "";
        }
        return path.slice(startDot, end);
      },
      format: function format(pathObject) {
        if (pathObject === null || typeof pathObject !== "object") {
          throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
        }
        return _format("/", pathObject);
      },
      parse: function parse(path) {
        assertPath(path);
        var ret = { root: "", dir: "", base: "", ext: "", name: "" };
        if (path.length === 0)
          return ret;
        var code = path.charCodeAt(0);
        var isAbsolute = code === 47;
        var start;
        if (isAbsolute) {
          ret.root = "/";
          start = 1;
        } else {
          start = 0;
        }
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var i = path.length - 1;
        var preDotState = 0;
        for (; i >= start; --i) {
          code = path.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              startPart = i + 1;
              break;
            }
            continue;
          }
          if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
          if (code === 46) {
            if (startDot === -1)
              startDot = i;
            else if (preDotState !== 1)
              preDotState = 1;
          } else if (startDot !== -1) {
            preDotState = -1;
          }
        }
        if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          if (end !== -1) {
            if (startPart === 0 && isAbsolute)
              ret.base = ret.name = path.slice(1, end);
            else
              ret.base = ret.name = path.slice(startPart, end);
          }
        } else {
          if (startPart === 0 && isAbsolute) {
            ret.name = path.slice(1, startDot);
            ret.base = path.slice(1, end);
          } else {
            ret.name = path.slice(startPart, startDot);
            ret.base = path.slice(startPart, end);
          }
          ret.ext = path.slice(startDot, end);
        }
        if (startPart > 0)
          ret.dir = path.slice(0, startPart - 1);
        else if (isAbsolute)
          ret.dir = "/";
        return ret;
      },
      sep: "/",
      delimiter: ":",
      win32: null,
      posix: null
    };
    posix.posix = posix;
    module.exports = posix;
  }
});
var require_DependencyParser = __commonJS({
  "../monaco-editor-auto-typings/lib/DependencyParser.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __read = exports && exports.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m)
        return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
          ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"]))
            m.call(i);
        } finally {
          if (e)
            throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar)
              ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DependencyParser = void 0;
    var path = __importStar(require_path_browserify());
    var DependencyParser = function() {
      function DependencyParser2() {
        this.REGEX_CLEAN = /[\n|\r]/g;
        this.REGEX_DETECT_IMPORT = /(?:(?:(?:import)|(?:export))(?:.)*?from\s+["']([^"']+)["'])|(?:\/+\s+<reference\s+path=["']([^"']+)["']\s+\/>)/g;
      }
      DependencyParser2.prototype.parseDependencies = function(source, parent) {
        var _this = this;
        var cleaned = source;
        return __spreadArray([], __read(cleaned.matchAll(this.REGEX_DETECT_IMPORT)), false).map(function(x) {
          var _a;
          return (_a = x[1]) !== null && _a !== void 0 ? _a : x[2];
        }).filter(function(x) {
          return !!x;
        }).map(function(imp) {
          var result = _this.resolvePath(imp, parent);
          return result;
        });
      };
      DependencyParser2.prototype.resolvePath = function(importPath, parent) {
        if (typeof parent === "string") {
          if (importPath.startsWith(".")) {
            return {
              kind: "relative",
              importPath,
              sourcePath: parent
            };
          } else if (importPath.startsWith("@")) {
            var segments = importPath.split("/");
            return {
              kind: "package",
              packageName: "".concat(segments[0], "/").concat(segments[1]),
              importPath: segments.slice(2).join("/")
            };
          } else {
            var segments = importPath.split("/");
            return {
              kind: "package",
              packageName: segments[0],
              importPath: segments.slice(1).join("/")
            };
          }
        } else {
          switch (parent.kind) {
            case "package":
              throw Error("TODO?");
            case "relative":
              throw Error("TODO2?");
            case "relative-in-package":
              if (importPath.startsWith(".")) {
                return {
                  kind: "relative-in-package",
                  packageName: parent.packageName,
                  sourcePath: path.join(parent.sourcePath, parent.importPath),
                  importPath
                };
              } else if (importPath.startsWith("@")) {
                var segments = importPath.split("/");
                return {
                  kind: "package",
                  packageName: "".concat(segments[0], "/").concat(segments[1]),
                  importPath: segments.slice(2).join("/")
                };
              } else {
                var segments = importPath.split("/");
                return {
                  kind: "package",
                  packageName: segments[0],
                  importPath: segments.slice(1).join("/")
                };
              }
          }
        }
      };
      return DependencyParser2;
    }();
    exports.DependencyParser = DependencyParser;
  }
});
var require_ImportResourcePath = __commonJS({
  "../monaco-editor-auto-typings/lib/ImportResourcePath.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.importResourcePathToString = void 0;
    var path_browserify_1 = __importDefault(require_path_browserify());
    var importResourcePathToString = function(p) {
      var _a;
      switch (p.kind) {
        case "package":
          return path_browserify_1.default.join(p.packageName, (_a = p.importPath) !== null && _a !== void 0 ? _a : "", "package.json");
        case "relative":
          return path_browserify_1.default.join(p.sourcePath, p.importPath);
        case "relative-in-package":
          return path_browserify_1.default.join(p.packageName, p.sourcePath, p.importPath);
      }
    };
    exports.importResourcePathToString = importResourcePathToString;
  }
});
var require_invokeUpdate = __commonJS({
  "../monaco-editor-auto-typings/lib/invokeUpdate.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.invokeUpdate = void 0;
    var invokeUpdate = function(progress, options) {
      var _a;
      var textual = "".concat(progress.type, ": ");
      switch (progress.type) {
        case "CodeChanged":
          textual += "";
          break;
        case "ResolveNewImports":
          textual += "";
          break;
        case "LookedUpTypeFile":
          textual += '"'.concat(progress.path, '" was ').concat(progress.success ? "sucessfully" : "not sucessfully", " looked up");
          break;
        case "AttemptedLookUpFile":
          textual += '"'.concat(progress.path, '" was ').concat(progress.success ? "sucessfully" : "not sucessfully", " attempted to looked up");
          break;
        case "LookedUpPackage":
          textual += 'package.json for package "'.concat(progress.package, '" was ').concat(progress.success ? "sucessfully" : "not sucessfully", " looked up").concat(progress.definitelyTyped ? " (found in definitely typed repo)" : "");
          break;
        case "LoadedFromCache":
          textual += '"'.concat(progress.importPath, '" was loaded from cache');
          break;
        case "StoredToCache":
          textual += '"'.concat(progress.importPath, '" was stored to cache');
          break;
      }
      if (textual.endsWith(": ")) {
        textual = textual.slice(void 0, -2);
      }
      (_a = options.onUpdate) === null || _a === void 0 ? void 0 : _a.call(options, progress, textual);
    };
    exports.invokeUpdate = invokeUpdate;
  }
});
var require_RecursionDepth = __commonJS({
  "../monaco-editor-auto-typings/lib/RecursionDepth.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RecursionDepth = void 0;
    var RecursionDepth = function() {
      function RecursionDepth2(options, fileRecursionDepth, packageRecursionDepth) {
        if (fileRecursionDepth === void 0) {
          fileRecursionDepth = 0;
        }
        if (packageRecursionDepth === void 0) {
          packageRecursionDepth = 0;
        }
        this.options = options;
        this.fileRecursionDepth = fileRecursionDepth;
        this.packageRecursionDepth = packageRecursionDepth;
      }
      RecursionDepth2.prototype.nextPackage = function() {
        return new RecursionDepth2(this.options, this.fileRecursionDepth, this.packageRecursionDepth + 1);
      };
      RecursionDepth2.prototype.nextFile = function() {
        return new RecursionDepth2(this.options, this.fileRecursionDepth + 1, this.packageRecursionDepth);
      };
      RecursionDepth2.prototype.same = function() {
        return new RecursionDepth2(this.options, this.fileRecursionDepth, this.packageRecursionDepth);
      };
      RecursionDepth2.prototype.shouldStop = function() {
        return this.options.fileRecursionDepth > 0 && this.fileRecursionDepth >= this.options.fileRecursionDepth || this.options.packageRecursionDepth > 0 && this.packageRecursionDepth >= this.options.packageRecursionDepth;
      };
      return RecursionDepth2;
    }();
    exports.RecursionDepth = RecursionDepth;
  }
});
var require_ImportResolver = __commonJS({
  "../monaco-editor-auto-typings/lib/ImportResolver.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
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
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
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
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
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
                if (t[2])
                  _.ops.pop();
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
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    var __values = exports && exports.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m)
        return m.call(o);
      if (o && typeof o.length === "number")
        return {
          next: function() {
            if (o && i >= o.length)
              o = void 0;
            return { value: o && o[i++], done: !o };
          }
        };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var __read = exports && exports.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m)
        return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
          ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"]))
            m.call(i);
        } finally {
          if (e)
            throw e.error;
        }
      }
      return ar;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImportResolver = void 0;
    var DependencyParser_1 = require_DependencyParser();
    var ImportResourcePath_1 = require_ImportResourcePath();
    var path = __importStar(require_path_browserify());
    var invokeUpdate_1 = require_invokeUpdate();
    var RecursionDepth_1 = require_RecursionDepth();
    var Uri = window.monaco.Uri;
    var ImportResolver = function() {
      function ImportResolver2(options) {
        var e_1, _a;
        this.options = options;
        this.loadedFiles = [];
        this.dependencyParser = new DependencyParser_1.DependencyParser();
        this.cache = options.sourceCache;
        this.sourceResolver = options.sourceResolver;
        this.newImportsResolved = false;
        if (options.preloadPackages && options.versions) {
          try {
            for (var _b = __values(Object.entries(options.versions)), _c = _b.next(); !_c.done; _c = _b.next()) {
              var _d = __read(_c.value, 2), packageName = _d[0], version2 = _d[1];
              this.resolveImport({
                kind: "package",
                packageName,
                importPath: ""
              }, new RecursionDepth_1.RecursionDepth(this.options)).catch(function(e) {
                console.error(e);
              });
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_c && !_c.done && (_a = _b.return))
                _a.call(_b);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
        }
      }
      ImportResolver2.prototype.wereNewImportsResolved = function() {
        return this.newImportsResolved;
      };
      ImportResolver2.prototype.resetNewImportsResolved = function() {
        this.newImportsResolved = false;
      };
      ImportResolver2.prototype.resolveImportsInFile = function(source, parent, depth) {
        return __awaiter(this, void 0, void 0, function() {
          var imports, imports_1, imports_1_1, importCall, e_2, e_3_1;
          var e_3, _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                if (depth.shouldStop()) {
                  return [2];
                }
                imports = this.dependencyParser.parseDependencies(source, parent);
                _b.label = 1;
              case 1:
                _b.trys.push([1, 8, 9, 10]);
                imports_1 = __values(imports), imports_1_1 = imports_1.next();
                _b.label = 2;
              case 2:
                if (!!imports_1_1.done)
                  return [3, 7];
                importCall = imports_1_1.value;
                _b.label = 3;
              case 3:
                _b.trys.push([3, 5, , 6]);
                return [4, this.resolveImport(importCall, depth)];
              case 4:
                _b.sent();
                return [3, 6];
              case 5:
                e_2 = _b.sent();
                console.error(e_2);
                return [3, 6];
              case 6:
                imports_1_1 = imports_1.next();
                return [3, 2];
              case 7:
                return [3, 10];
              case 8:
                e_3_1 = _b.sent();
                e_3 = { error: e_3_1 };
                return [3, 10];
              case 9:
                try {
                  if (imports_1_1 && !imports_1_1.done && (_a = imports_1.return))
                    _a.call(imports_1);
                } finally {
                  if (e_3)
                    throw e_3.error;
                }
                return [7];
              case 10:
                return [2];
            }
          });
        });
      };
      ImportResolver2.prototype.resolveImport = function(importResource, depth) {
        return __awaiter(this, void 0, void 0, function() {
          var hash, _a, packageRelativeImport;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                hash = this.hashImportResourcePath(importResource);
                if (this.loadedFiles.includes(hash)) {
                  return [2];
                }
                this.loadedFiles.push(hash);
                _a = importResource.kind;
                switch (_a) {
                  case "package":
                    return [3, 1];
                  case "relative":
                    return [3, 5];
                  case "relative-in-package":
                    return [3, 6];
                }
                return [3, 8];
              case 1:
                return [4, this.resolveImportFromPackageRoot(importResource)];
              case 2:
                packageRelativeImport = _b.sent();
                if (!packageRelativeImport)
                  return [3, 4];
                return [4, this.resolveImportInPackage(packageRelativeImport, depth.nextPackage().nextFile())];
              case 3:
                return [2, _b.sent()];
              case 4:
                return [3, 8];
              case 5:
                throw Error("Not implemented yet");
              case 6:
                return [4, this.resolveImportInPackage(importResource, depth.nextFile())];
              case 7:
                return [2, _b.sent()];
              case 8:
                return [2];
            }
          });
        });
      };
      ImportResolver2.prototype.resolveImportInPackage = function(importResource, depth) {
        return __awaiter(this, void 0, void 0, function() {
          var _a, source, at;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                return [4, this.loadSourceFileContents(importResource)];
              case 1:
                _a = _b.sent(), source = _a.source, at = _a.at;
                this.createModel(source, Uri.parse(this.options.fileRootPath + path.join("node_modules/".concat(importResource.packageName), at)));
                return [4, this.resolveImportsInFile(source, {
                  kind: "relative-in-package",
                  packageName: importResource.packageName,
                  sourcePath: path.dirname(at),
                  importPath: ""
                }, depth)];
              case 2:
                _b.sent();
                return [2];
            }
          });
        });
      };
      ImportResolver2.prototype.resolveImportFromPackageRoot = function(importResource) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function() {
          var failedProgressUpdate, doesPkgJsonHasSubpath, pkgJsonSubpath, pkgJson, pkg, typings, typingPackageName, pkgJsonTypings, pkg_1, typings;
          return __generator(this, function(_k) {
            switch (_k.label) {
              case 0:
                failedProgressUpdate = {
                  type: "LookedUpPackage",
                  package: importResource.packageName,
                  definitelyTyped: false,
                  success: false
                };
                if (this.options.onlySpecifiedPackages) {
                  if (!((_a = this.versions) === null || _a === void 0 ? void 0 : _a[importResource.packageName]) && !((_b = this.versions) === null || _b === void 0 ? void 0 : _b["@types/" + importResource.packageName])) {
                    (0, invokeUpdate_1.invokeUpdate)(failedProgressUpdate, this.options);
                    return [2];
                  }
                }
                doesPkgJsonHasSubpath = (_d = (_c = importResource.importPath) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0 > 0;
                pkgJsonSubpath = doesPkgJsonHasSubpath ? "/".concat(importResource.importPath) : "";
                return [4, this.resolvePackageJson(importResource.packageName, (_e = this.versions) === null || _e === void 0 ? void 0 : _e[importResource.packageName], doesPkgJsonHasSubpath ? importResource.importPath : void 0)];
              case 1:
                pkgJson = _k.sent();
                if (!(!pkgJson && doesPkgJsonHasSubpath))
                  return [3, 3];
                return [4, this.resolvePackageJson(importResource.packageName, (_f = this.versions) === null || _f === void 0 ? void 0 : _f[importResource.packageName])];
              case 2:
                pkgJson = _k.sent();
                pkgJsonSubpath = "";
                _k.label = 3;
              case 3:
                if (!pkgJson)
                  return [3, 7];
                pkg = JSON.parse(pkgJson);
                if (!(pkg.typings || pkg.types))
                  return [3, 4];
                typings = pkg.typings || pkg.types;
                this.createModel(pkgJson, Uri.parse("".concat(this.options.fileRootPath, "node_modules/").concat(importResource.packageName).concat(pkgJsonSubpath, "/package.json")));
                (0, invokeUpdate_1.invokeUpdate)({
                  type: "LookedUpPackage",
                  package: importResource.packageName,
                  definitelyTyped: false,
                  success: true
                }, this.options);
                this.setVersion(importResource.packageName, pkg.version);
                return [2, {
                  kind: "relative-in-package",
                  packageName: importResource.packageName,
                  sourcePath: "",
                  importPath: path.join((_g = importResource.importPath) !== null && _g !== void 0 ? _g : "", typings.startsWith("./") ? typings.slice(2) : typings)
                }];
              case 4:
                typingPackageName = "@types/".concat(importResource.packageName.startsWith("@") ? importResource.packageName.slice(1).replace(/\//, "__") : importResource.packageName);
                return [4, this.resolvePackageJson(typingPackageName, (_h = this.versions) === null || _h === void 0 ? void 0 : _h[typingPackageName])];
              case 5:
                pkgJsonTypings = _k.sent();
                if (pkgJsonTypings) {
                  pkg_1 = JSON.parse(pkgJsonTypings);
                  if (pkg_1.typings || pkg_1.types) {
                    typings = pkg_1.typings || pkg_1.types;
                    this.createModel(pkgJsonTypings, Uri.parse("".concat(this.options.fileRootPath, "node_modules/").concat(typingPackageName, "/package.json")));
                    (0, invokeUpdate_1.invokeUpdate)({
                      type: "LookedUpPackage",
                      package: typingPackageName,
                      definitelyTyped: true,
                      success: true
                    }, this.options);
                    this.setVersion(typingPackageName, pkg_1.version);
                    return [2, {
                      kind: "relative-in-package",
                      packageName: typingPackageName,
                      sourcePath: "",
                      importPath: path.join((_j = importResource.importPath) !== null && _j !== void 0 ? _j : "", typings.startsWith("./") ? typings.slice(2) : typings)
                    }];
                  } else {
                    (0, invokeUpdate_1.invokeUpdate)(failedProgressUpdate, this.options);
                  }
                } else {
                  (0, invokeUpdate_1.invokeUpdate)(failedProgressUpdate, this.options);
                }
                _k.label = 6;
              case 6:
                return [3, 8];
              case 7:
                (0, invokeUpdate_1.invokeUpdate)(failedProgressUpdate, this.options);
                _k.label = 8;
              case 8:
                return [2];
            }
          });
        });
      };
      ImportResolver2.prototype.loadSourceFileContents = function(importResource) {
        return __awaiter(this, void 0, void 0, function() {
          var progressUpdatePath, failedProgressUpdate, pkgName, version2, appends, source, appends_1, appends_1_1, append, fullPath, source, e_4_1, pkgJson, types, fullPath, source;
          var e_4, _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                progressUpdatePath = path.join(importResource.packageName, importResource.sourcePath, importResource.importPath);
                failedProgressUpdate = {
                  type: "LookedUpTypeFile",
                  path: progressUpdatePath,
                  definitelyTyped: false,
                  success: false
                };
                pkgName = importResource.packageName;
                version2 = this.getVersion(importResource.packageName);
                appends = [".d.ts", "/index.d.ts", ".ts", ".tsx", "/index.ts", "/index.tsx"];
                if (!appends.map(function(append2) {
                  return importResource.importPath.endsWith(append2);
                }).reduce(function(a, b) {
                  return a || b;
                }, false))
                  return [3, 2];
                return [4, this.resolveSourceFile(pkgName, version2, path.join(importResource.sourcePath, importResource.importPath))];
              case 1:
                source = _b.sent();
                if (source) {
                  return [2, { source, at: path.join(importResource.sourcePath, importResource.importPath) }];
                }
                return [3, 9];
              case 2:
                _b.trys.push([2, 7, 8, 9]);
                appends_1 = __values(appends), appends_1_1 = appends_1.next();
                _b.label = 3;
              case 3:
                if (!!appends_1_1.done)
                  return [3, 6];
                append = appends_1_1.value;
                fullPath = path.join(importResource.sourcePath, importResource.importPath) + append;
                return [4, this.resolveSourceFile(pkgName, version2, fullPath)];
              case 4:
                source = _b.sent();
                (0, invokeUpdate_1.invokeUpdate)({
                  type: "AttemptedLookUpFile",
                  path: path.join(pkgName, fullPath),
                  success: !!source
                }, this.options);
                if (source) {
                  (0, invokeUpdate_1.invokeUpdate)({
                    type: "LookedUpTypeFile",
                    path: path.join(pkgName, fullPath),
                    success: true
                  }, this.options);
                  return [2, { source, at: fullPath }];
                }
                _b.label = 5;
              case 5:
                appends_1_1 = appends_1.next();
                return [3, 3];
              case 6:
                return [3, 9];
              case 7:
                e_4_1 = _b.sent();
                e_4 = { error: e_4_1 };
                return [3, 9];
              case 8:
                try {
                  if (appends_1_1 && !appends_1_1.done && (_a = appends_1.return))
                    _a.call(appends_1);
                } finally {
                  if (e_4)
                    throw e_4.error;
                }
                return [7];
              case 9:
                return [4, this.resolvePackageJson(pkgName, version2, path.join(importResource.sourcePath, importResource.importPath))];
              case 10:
                pkgJson = _b.sent();
                if (!pkgJson)
                  return [3, 12];
                types = JSON.parse(pkgJson).types;
                if (!types)
                  return [3, 12];
                fullPath = path.join(importResource.sourcePath, importResource.importPath, types);
                return [4, this.resolveSourceFile(pkgName, version2, fullPath)];
              case 11:
                source = _b.sent();
                if (source) {
                  (0, invokeUpdate_1.invokeUpdate)({
                    type: "LookedUpTypeFile",
                    path: path.join(pkgName, fullPath),
                    success: true
                  }, this.options);
                  return [2, { source, at: fullPath }];
                }
                _b.label = 12;
              case 12:
                (0, invokeUpdate_1.invokeUpdate)(failedProgressUpdate, this.options);
                throw Error("Could not resolve ".concat(importResource.packageName, "/").concat(importResource.sourcePath).concat(importResource.importPath));
            }
          });
        });
      };
      ImportResolver2.prototype.getVersion = function(packageName) {
        var _a;
        return (_a = this.versions) === null || _a === void 0 ? void 0 : _a[packageName];
      };
      ImportResolver2.prototype.setVersions = function(versions) {
        var _a, _b;
        this.versions = versions;
        (_b = (_a = this.options).onUpdateVersions) === null || _b === void 0 ? void 0 : _b.call(_a, versions);
      };
      ImportResolver2.prototype.setVersion = function(packageName, version2) {
        var _a;
        this.setVersions(__assign(__assign({}, this.versions), (_a = {}, _a[packageName] = version2, _a)));
      };
      ImportResolver2.prototype.createModel = function(source, uri) {
        uri = uri.with({ path: uri.path.replace("@types/", "") });
        if (!monaco.editor.getModel(uri)) {
          monaco.editor.createModel(source, "typescript", uri);
          this.newImportsResolved = true;
        }
      };
      ImportResolver2.prototype.hashImportResourcePath = function(p) {
        return (0, ImportResourcePath_1.importResourcePathToString)(p);
      };
      ImportResolver2.prototype.resolvePackageJson = function(packageName, version2, subPath) {
        return __awaiter(this, void 0, void 0, function() {
          var uri, isAvailable, content, _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                uri = path.join(packageName + (version2 ? "@".concat(version2) : ""), subPath !== null && subPath !== void 0 ? subPath : "", "package.json");
                isAvailable = false;
                content = void 0;
                if (!this.cache.isFileAvailable)
                  return [3, 2];
                return [4, this.cache.isFileAvailable(uri)];
              case 1:
                isAvailable = _b.sent();
                return [3, 4];
              case 2:
                return [4, this.cache.getFile(uri)];
              case 3:
                content = _b.sent();
                isAvailable = content !== void 0;
                _b.label = 4;
              case 4:
                if (!isAvailable)
                  return [3, 8];
                if (!(content !== null && content !== void 0))
                  return [3, 5];
                _a = content;
                return [3, 7];
              case 5:
                return [4, this.cache.getFile(uri)];
              case 6:
                _a = _b.sent();
                _b.label = 7;
              case 7:
                return [2, _a];
              case 8:
                return [4, this.sourceResolver.resolvePackageJson(packageName, version2, subPath)];
              case 9:
                content = _b.sent();
                if (content) {
                  this.cache.storeFile(uri, content);
                }
                return [2, content];
            }
          });
        });
      };
      ImportResolver2.prototype.resolveSourceFile = function(packageName, version2, filePath) {
        return __awaiter(this, void 0, void 0, function() {
          var uri, isAvailable, content, _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                uri = path.join(packageName + (version2 ? "@".concat(version2) : ""), filePath);
                isAvailable = false;
                content = void 0;
                if (!this.cache.isFileAvailable)
                  return [3, 2];
                return [4, this.cache.isFileAvailable(uri)];
              case 1:
                isAvailable = _b.sent();
                return [3, 4];
              case 2:
                return [4, this.cache.getFile(uri)];
              case 3:
                content = _b.sent();
                isAvailable = content !== void 0;
                _b.label = 4;
              case 4:
                if (!isAvailable)
                  return [3, 8];
                (0, invokeUpdate_1.invokeUpdate)({
                  type: "LoadedFromCache",
                  importPath: uri
                }, this.options);
                if (!(content !== null && content !== void 0))
                  return [3, 5];
                _a = content;
                return [3, 7];
              case 5:
                return [4, this.cache.getFile(uri)];
              case 6:
                _a = _b.sent();
                _b.label = 7;
              case 7:
                return [2, _a];
              case 8:
                return [4, this.sourceResolver.resolveSourceFile(packageName, version2, filePath)];
              case 9:
                content = _b.sent();
                if (content) {
                  (0, invokeUpdate_1.invokeUpdate)({
                    type: "StoredToCache",
                    importPath: uri
                  }, this.options);
                  this.cache.storeFile(uri, content);
                }
                return [2, content];
            }
          });
        });
      };
      return ImportResolver2;
    }();
    exports.ImportResolver = ImportResolver;
  }
});
var require_AutoTypings = __commonJS({
  "../monaco-editor-auto-typings/lib/AutoTypings.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
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
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
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
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
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
                if (t[2])
                  _.ops.pop();
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
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    var __values = exports && exports.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m)
        return m.call(o);
      if (o && typeof o.length === "number")
        return {
          next: function() {
            if (o && i >= o.length)
              o = void 0;
            return { value: o && o[i++], done: !o };
          }
        };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AutoTypings = void 0;
    var DummySourceCache_1 = require_DummySourceCache();
    var UnpkgSourceResolver_1 = require_UnpkgSourceResolver();
    var ImportResolver_1 = require_ImportResolver();
    var path = __importStar(require_path_browserify());
    var invokeUpdate_1 = require_invokeUpdate();
    var RecursionDepth_1 = require_RecursionDepth();
    var AutoTypings = function() {
      function AutoTypings2(editor, options, languages) {
        var _this = this;
        this.editor = editor;
        this.options = options;
        this.languages = languages;
        this.disposables = [];
        this.importResolver = new ImportResolver_1.ImportResolver(options);
        var changeModelDisposable = editor.onDidChangeModelContent(function(e) {
          _this.debouncedResolveContents();
        });
        this.disposables.push(changeModelDisposable);
        this.resolveContents();
        if (!options.dontAdaptEditorOptions) {
          languages.typescript.typescriptDefaults.setCompilerOptions(__assign(__assign({}, languages.typescript.typescriptDefaults.getCompilerOptions()), { moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs, allowSyntheticDefaultImports: true }));
        }
      }
      AutoTypings2.create = function(editor, languages, options) {
        var _a;
        if ((options === null || options === void 0 ? void 0 : options.shareCache) && options.sourceCache && !AutoTypings2.sharedCache) {
          AutoTypings2.sharedCache = options.sourceCache;
        }
        return new AutoTypings2(editor, __assign({ fileRootPath: "inmemory://model/", onlySpecifiedPackages: false, preloadPackages: false, shareCache: false, dontAdaptEditorOptions: false, dontRefreshModelValueAfterResolvement: false, sourceCache: (_a = AutoTypings2.sharedCache) !== null && _a !== void 0 ? _a : new DummySourceCache_1.DummySourceCache(), sourceResolver: new UnpkgSourceResolver_1.UnpkgSourceResolver(), debounceDuration: 4e3, fileRecursionDepth: 10, packageRecursionDepth: 3 }, options), languages);
      };
      AutoTypings2.prototype.dispose = function() {
        var e_1, _a;
        try {
          for (var _b = __values(this.disposables), _c = _b.next(); !_c.done; _c = _b.next()) {
            var disposable = _c.value;
            disposable.dispose();
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return))
              _a.call(_b);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
      };
      AutoTypings2.prototype.setVersions = function(versions) {
        this.importResolver.setVersions(versions);
        this.options.versions = versions;
      };
      AutoTypings2.prototype.clearCache = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.options.sourceCache.clear()];
              case 1:
                _a.sent();
                return [2];
            }
          });
        });
      };
      AutoTypings2.prototype.debouncedResolveContents = function() {
        var _this = this;
        if (this.isResolving) {
          return;
        }
        (0, invokeUpdate_1.invokeUpdate)({
          type: "CodeChanged"
        }, this.options);
        if (this.options.debounceDuration <= 0) {
          this.resolveContents();
        } else {
          if (this.debounceTimer !== void 0) {
            clearTimeout(this.debounceTimer);
          }
          this.debounceTimer = setTimeout(function() {
            return __awaiter(_this, void 0, void 0, function() {
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    return [4, this.resolveContents()];
                  case 1:
                    _a.sent();
                    this.debounceTimer = void 0;
                    return [2];
                }
              });
            });
          }, this.options.debounceDuration);
        }
      };
      AutoTypings2.prototype.resolveContents = function() {
        var _a;
        return __awaiter(this, void 0, void 0, function() {
          var model, content, e_2;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                this.isResolving = true;
                (0, invokeUpdate_1.invokeUpdate)({
                  type: "ResolveNewImports"
                }, this.options);
                model = this.editor.getModel();
                if (!model) {
                  throw Error("No model");
                }
                content = model.getLinesContent();
                _b.label = 1;
              case 1:
                _b.trys.push([1, 3, , 4]);
                return [4, this.importResolver.resolveImportsInFile(content.join("\n"), path.dirname(model.uri.toString()), new RecursionDepth_1.RecursionDepth(this.options))];
              case 2:
                _b.sent();
                return [3, 4];
              case 3:
                e_2 = _b.sent();
                if (this.options.onError) {
                  this.options.onError((_a = e_2.message) !== null && _a !== void 0 ? _a : e_2);
                } else {
                  throw e_2;
                }
                return [3, 4];
              case 4:
                if (this.importResolver.wereNewImportsResolved()) {
                  if (!this.options.dontRefreshModelValueAfterResolvement) {
                    model.setValue(model.getValue());
                  }
                  this.importResolver.resetNewImportsResolved();
                }
                this.isResolving = false;
                return [2];
            }
          });
        });
      };
      return AutoTypings2;
    }();
    exports.AutoTypings = AutoTypings;
  }
});
var require_LocalStorageCache = __commonJS({
  "../monaco-editor-auto-typings/lib/LocalStorageCache.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
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
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
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
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
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
                if (t[2])
                  _.ops.pop();
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
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LocalStorageCache = void 0;
    var LocalStorageCache = function() {
      function LocalStorageCache2() {
      }
      LocalStorageCache2.prototype.getFile = function(uri) {
        var _a;
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_b) {
            return [2, (_a = localStorage.getItem(LocalStorageCache2.LOCALSTORAGE_PREFIX + uri)) !== null && _a !== void 0 ? _a : void 0];
          });
        });
      };
      LocalStorageCache2.prototype.storeFile = function(uri, content) {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            localStorage.setItem(LocalStorageCache2.LOCALSTORAGE_PREFIX + uri, content);
            return [2];
          });
        });
      };
      LocalStorageCache2.prototype.clear = function() {
        return __awaiter(this, void 0, void 0, function() {
          var i, key;
          return __generator(this, function(_a) {
            for (i = 0; i < localStorage.length; i++) {
              key = localStorage.key(i);
              if (key === null || key === void 0 ? void 0 : key.startsWith(LocalStorageCache2.LOCALSTORAGE_PREFIX)) {
                localStorage.removeItem(key);
              }
            }
            return [2];
          });
        });
      };
      LocalStorageCache2.LOCALSTORAGE_PREFIX = "__autotyper_cache_";
      return LocalStorageCache2;
    }();
    exports.LocalStorageCache = LocalStorageCache;
  }
});
var require_Options = __commonJS({
  "../monaco-editor-auto-typings/lib/Options.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});
var require_ProgressUpdate = __commonJS({
  "../monaco-editor-auto-typings/lib/ProgressUpdate.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});
var require_SourceCache = __commonJS({
  "../monaco-editor-auto-typings/lib/SourceCache.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});
var require_SourceResolver = __commonJS({
  "../monaco-editor-auto-typings/lib/SourceResolver.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});
var require_lib = __commonJS({
  "../monaco-editor-auto-typings/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_AutoTypings(), exports);
    __exportStar(require_ImportResourcePath(), exports);
    __exportStar(require_LocalStorageCache(), exports);
    __exportStar(require_Options(), exports);
    __exportStar(require_ProgressUpdate(), exports);
    __exportStar(require_SourceCache(), exports);
    __exportStar(require_SourceResolver(), exports);
    __exportStar(require_UnpkgSourceResolver(), exports);
  }
});
var version = "0.28.1";
var exp = {
  monaco: null
};
var getMonaco = async () => {
  if (exp.monaco)
    return exp.monaco;
  const importScript = (src, res = []) => {
    if (typeof window === "undefined")
      return {};
    return document.head.querySelector(`script[src="${src}"]`) && window || new Promise(function(resolve, reject) {
      const s = document.createElement("script");
      s.src = src;
      s.async = "async";
      s.type = "application/javascript";
      s.onload = () => {
        if (res.length === 0) {
          resolve(window);
        }
        const ret = {};
        res.forEach((x) => Object.assign(ret, window[x]));
        resolve(ret);
      };
      s.onerror = reject;
      document.head.appendChild(s);
    });
  };
  const vsPath = `https://unpkg.com/monaco-editor@${version}/min/vs`;
  const { require: require2 } = await importScript(`${vsPath}/loader.js`);
  require2.config({ paths: { "vs": vsPath }, "vs/css": { disabled: true } });
  exp.monaco = await new Promise((resolve) => require2(["vs/editor/editor.main"], (_m) => resolve(_m)));
  return exp.monaco;
};
var import_os = __toESM(require_os(), 1);
var homeDir = typeof import_os.default.homedir === "undefined" ? "" : import_os.default.homedir().replace(/\\/g, "/");
var _errors;
_errors = /* @__PURE__ */ new WeakMap();
var pMapSkip = Symbol("skip");
var monacoProm = getMonaco();
var editor_default = async ({ onChange, code, language, container, options }) => {
  const monaco2 = await monacoProm;
  monaco2.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: 99,
    lib: [
      "DOM",
      "DOM.Iterable",
      "ES2018.Regexp",
      "ES2018.AsyncIterable",
      "ES2018",
      "ES2019"
    ],
    allowNonTsExtensions: true,
    moduleResolution: 2,
    module: 99,
    declaration: true,
    noEmit: true,
    noEmitOnError: true,
    jsxFactory: "jsx",
    jsx: 4,
    skipLibCheck: false,
    allowUmdGlobalAccess: true
  });
  monaco2.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSuggestionDiagnostics: true,
    noSemanticValidation: true,
    noSyntaxValidation: true
  });
  const { Uri } = monaco2;
  const editor = monaco2.editor.create(container, {
    model: monaco2.editor.createModel(code, "typescript", Uri.file("/index.ts")),
    language: "typescript",
    theme: "vs-dark"
  });
  const { AutoTypings, LocalStorageCache } = await Promise.resolve().then(() => __toESM(require_lib()));
  const autoTypings = AutoTypings.create(editor, monaco2.languages, {
    sourceCache: new LocalStorageCache()
  });
  window.addEventListener("resize", () => {
    editor.layout();
  });
  editor.onDidChangeModelContent((e) => onChange(editor.getValue(), e));
  return () => editor;
};
export {
  editor_default as default
};
//# sourceMappingURL=startMonaco.mjs.map

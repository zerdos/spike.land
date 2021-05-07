var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (cb2, mod) => function __require() {
  return mod || (0, cb2[Object.keys(cb2)[0]])((mod = {exports: {}}).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {get: () => module.default, enumerable: true} : {value: module, enumerable: true})), module);
};

// ../../node_modules/tslib/tslib.js
var require_tslib = __commonJS({
  "../../node_modules/tslib/tslib.js"(exports, module) {
    var __extends2;
    var __assign2;
    var __rest2;
    var __decorate2;
    var __param2;
    var __metadata2;
    var __awaiter2;
    var __generator2;
    var __exportStar2;
    var __values2;
    var __read2;
    var __spread2;
    var __spreadArrays2;
    var __spreadArray2;
    var __await2;
    var __asyncGenerator2;
    var __asyncDelegator2;
    var __asyncValues2;
    var __makeTemplateObject2;
    var __importStar2;
    var __importDefault2;
    var __classPrivateFieldGet2;
    var __classPrivateFieldSet2;
    var __createBinding2;
    (function(factory) {
      var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
      if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function(exports2) {
          factory(createExporter(root, createExporter(exports2)));
        });
      } else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
      } else {
        factory(createExporter(root));
      }
      function createExporter(exports2, previous) {
        if (exports2 !== root) {
          if (typeof Object.create === "function") {
            Object.defineProperty(exports2, "__esModule", {value: true});
          } else {
            exports2.__esModule = true;
          }
        }
        return function(id, v) {
          return exports2[id] = previous ? previous(id, v) : v;
        };
      }
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d, b2) {
        d.__proto__ = b2;
      } || function(d, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d[p] = b2[p];
      };
      __extends2 = function(d, b2) {
        if (typeof b2 !== "function" && b2 !== null)
          throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
        extendStatics(d, b2);
        function __() {
          this.constructor = d;
        }
        d.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
      __assign2 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      __rest2 = function(s, e) {
        var t = {};
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
          }
        return t;
      };
      __decorate2 = function(decorators, target, key, desc) {
        var c2 = arguments.length, r = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c2 < 3 ? d(r) : c2 > 3 ? d(target, key, r) : d(target, key)) || r;
        return c2 > 3 && r && Object.defineProperty(target, key, r), r;
      };
      __param2 = function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      __metadata2 = function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
      };
      __awaiter2 = function(thisArg, _arguments, P, generator) {
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
      __generator2 = function(thisArg, body) {
        var _2 = {label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: []}, f, y, t, g;
        return g = {next: verb(0), "throw": verb(1), "return": verb(2)}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
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
          while (_2)
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
                  _2.label++;
                  return {value: op[1], done: false};
                case 5:
                  _2.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _2.ops.pop();
                  _2.trys.pop();
                  continue;
                default:
                  if (!(t = _2.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _2 = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _2.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _2.label < t[1]) {
                    _2.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _2.label < t[2]) {
                    _2.label = t[2];
                    _2.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _2.ops.pop();
                  _2.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _2);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return {value: op[0] ? op[1] : void 0, done: true};
        }
      };
      __exportStar2 = function(m2, o) {
        for (var p in m2)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
            __createBinding2(o, m2, p);
      };
      __createBinding2 = Object.create ? function(o, m2, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, {enumerable: true, get: function() {
          return m2[k];
        }});
      } : function(o, m2, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m2[k];
      };
      __values2 = function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m2 = s && o[s], i = 0;
        if (m2)
          return m2.call(o);
        if (o && typeof o.length === "number")
          return {
            next: function() {
              if (o && i >= o.length)
                o = void 0;
              return {value: o && o[i++], done: !o};
            }
          };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      __read2 = function(o, n) {
        var m2 = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m2)
          return o;
        var i = m2.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error) {
          e = {error};
        } finally {
          try {
            if (r && !r.done && (m2 = i["return"]))
              m2.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      };
      __spread2 = function() {
        for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read2(arguments[i]));
        return ar;
      };
      __spreadArrays2 = function() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
          s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a2 = arguments[i], j = 0, jl = a2.length; j < jl; j++, k++)
            r[k] = a2[j];
        return r;
      };
      __spreadArray2 = function(to, from2) {
        for (var i = 0, il = from2.length, j = to.length; i < il; i++, j++)
          to[j] = from2[i];
        return to;
      };
      __await2 = function(v) {
        return this instanceof __await2 ? (this.v = v, this) : new __await2(v);
      };
      __asyncGenerator2 = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i;
        function verb(n) {
          if (g[n])
            i[n] = function(v) {
              return new Promise(function(a2, b2) {
                q.push([n, v, a2, b2]) > 1 || resume(n, v);
              });
            };
        }
        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e) {
            settle(q[0][3], e);
          }
        }
        function step(r) {
          r.value instanceof __await2 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f, v) {
          if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]);
        }
      };
      __asyncDelegator2 = function(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function(e) {
          throw e;
        }), verb("return"), i[Symbol.iterator] = function() {
          return this;
        }, i;
        function verb(n, f) {
          i[n] = o[n] ? function(v) {
            return (p = !p) ? {value: __await2(o[n](v)), done: n === "return"} : f ? f(v) : v;
          } : f;
        }
      };
      __asyncValues2 = function(o) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m2 = o[Symbol.asyncIterator], i;
        return m2 ? m2.call(o) : (o = typeof __values2 === "function" ? __values2(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i);
        function verb(n) {
          i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
              v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
          };
        }
        function settle(resolve, reject, d, v) {
          Promise.resolve(v).then(function(v2) {
            resolve({value: v2, done: d});
          }, reject);
        }
      };
      __makeTemplateObject2 = function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", {value: raw});
        } else {
          cooked.raw = raw;
        }
        return cooked;
      };
      var __setModuleDefault = Object.create ? function(o, v) {
        Object.defineProperty(o, "default", {enumerable: true, value: v});
      } : function(o, v) {
        o["default"] = v;
      };
      __importStar2 = function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding2(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      __importDefault2 = function(mod) {
        return mod && mod.__esModule ? mod : {"default": mod};
      };
      __classPrivateFieldGet2 = function(receiver, state, kind, f) {
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      };
      __classPrivateFieldSet2 = function(receiver, state, value, kind, f) {
        if (kind === "m")
          throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
      };
      exporter("__extends", __extends2);
      exporter("__assign", __assign2);
      exporter("__rest", __rest2);
      exporter("__decorate", __decorate2);
      exporter("__param", __param2);
      exporter("__metadata", __metadata2);
      exporter("__awaiter", __awaiter2);
      exporter("__generator", __generator2);
      exporter("__exportStar", __exportStar2);
      exporter("__createBinding", __createBinding2);
      exporter("__values", __values2);
      exporter("__read", __read2);
      exporter("__spread", __spread2);
      exporter("__spreadArrays", __spreadArrays2);
      exporter("__spreadArray", __spreadArray2);
      exporter("__await", __await2);
      exporter("__asyncGenerator", __asyncGenerator2);
      exporter("__asyncDelegator", __asyncDelegator2);
      exporter("__asyncValues", __asyncValues2);
      exporter("__makeTemplateObject", __makeTemplateObject2);
      exporter("__importStar", __importStar2);
      exporter("__importDefault", __importDefault2);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet2);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet2);
    });
  }
});

// ../../node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "../../node_modules/object-assign/index.js"(exports, module) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty2 = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order22 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order22.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from2;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from2 = Object(arguments[s]);
        for (var key in from2) {
          if (hasOwnProperty2.call(from2, key)) {
            to[key] = from2[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from2);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from2, symbols[i])) {
              to[symbols[i]] = from2[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  }
});

// ../../node_modules/react/cjs/react.production.min.js
var require_react_production_min = __commonJS({
  "../../node_modules/react/cjs/react.production.min.js"(exports) {
    "use strict";
    var l = require_object_assign();
    var n = 60103;
    var p = 60106;
    exports.Fragment = 60107;
    exports.StrictMode = 60108;
    exports.Profiler = 60114;
    var q = 60109;
    var r = 60110;
    var t = 60112;
    exports.Suspense = 60113;
    var u = 60115;
    var v = 60116;
    if (typeof Symbol === "function" && Symbol.for) {
      w = Symbol.for;
      n = w("react.element");
      p = w("react.portal");
      exports.Fragment = w("react.fragment");
      exports.StrictMode = w("react.strict_mode");
      exports.Profiler = w("react.profiler");
      q = w("react.provider");
      r = w("react.context");
      t = w("react.forward_ref");
      exports.Suspense = w("react.suspense");
      u = w("react.memo");
      v = w("react.lazy");
    }
    var w;
    var x = typeof Symbol === "function" && Symbol.iterator;
    function y(a2) {
      if (a2 === null || typeof a2 !== "object")
        return null;
      a2 = x && a2[x] || a2["@@iterator"];
      return typeof a2 === "function" ? a2 : null;
    }
    function z(a2) {
      for (var b2 = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c2 = 1; c2 < arguments.length; c2++)
        b2 += "&args[]=" + encodeURIComponent(arguments[c2]);
      return "Minified React error #" + a2 + "; visit " + b2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var A = {isMounted: function() {
      return false;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    }};
    var B = {};
    function C(a2, b2, c2) {
      this.props = a2;
      this.context = b2;
      this.refs = B;
      this.updater = c2 || A;
    }
    C.prototype.isReactComponent = {};
    C.prototype.setState = function(a2, b2) {
      if (typeof a2 !== "object" && typeof a2 !== "function" && a2 != null)
        throw Error(z(85));
      this.updater.enqueueSetState(this, a2, b2, "setState");
    };
    C.prototype.forceUpdate = function(a2) {
      this.updater.enqueueForceUpdate(this, a2, "forceUpdate");
    };
    function D() {
    }
    D.prototype = C.prototype;
    function E(a2, b2, c2) {
      this.props = a2;
      this.context = b2;
      this.refs = B;
      this.updater = c2 || A;
    }
    var F = E.prototype = new D();
    F.constructor = E;
    l(F, C.prototype);
    F.isPureReactComponent = true;
    var G = {current: null};
    var H = Object.prototype.hasOwnProperty;
    var I = {key: true, ref: true, __self: true, __source: true};
    function J(a2, b2, c2) {
      var e, d = {}, k = null, h = null;
      if (b2 != null)
        for (e in b2.ref !== void 0 && (h = b2.ref), b2.key !== void 0 && (k = "" + b2.key), b2)
          H.call(b2, e) && !I.hasOwnProperty(e) && (d[e] = b2[e]);
      var g = arguments.length - 2;
      if (g === 1)
        d.children = c2;
      else if (1 < g) {
        for (var f = Array(g), m2 = 0; m2 < g; m2++)
          f[m2] = arguments[m2 + 2];
        d.children = f;
      }
      if (a2 && a2.defaultProps)
        for (e in g = a2.defaultProps, g)
          d[e] === void 0 && (d[e] = g[e]);
      return {$$typeof: n, type: a2, key: k, ref: h, props: d, _owner: G.current};
    }
    function K(a2, b2) {
      return {$$typeof: n, type: a2.type, key: b2, ref: a2.ref, props: a2.props, _owner: a2._owner};
    }
    function L(a2) {
      return typeof a2 === "object" && a2 !== null && a2.$$typeof === n;
    }
    function escape(a2) {
      var b2 = {"=": "=0", ":": "=2"};
      return "$" + a2.replace(/[=:]/g, function(a3) {
        return b2[a3];
      });
    }
    var M = /\/+/g;
    function N(a2, b2) {
      return typeof a2 === "object" && a2 !== null && a2.key != null ? escape("" + a2.key) : b2.toString(36);
    }
    function O(a2, b2, c2, e, d) {
      var k = typeof a2;
      if (k === "undefined" || k === "boolean")
        a2 = null;
      var h = false;
      if (a2 === null)
        h = true;
      else
        switch (k) {
          case "string":
          case "number":
            h = true;
            break;
          case "object":
            switch (a2.$$typeof) {
              case n:
              case p:
                h = true;
            }
        }
      if (h)
        return h = a2, d = d(h), a2 = e === "" ? "." + N(h, 0) : e, Array.isArray(d) ? (c2 = "", a2 != null && (c2 = a2.replace(M, "$&/") + "/"), O(d, b2, c2, "", function(a3) {
          return a3;
        })) : d != null && (L(d) && (d = K(d, c2 + (!d.key || h && h.key === d.key ? "" : ("" + d.key).replace(M, "$&/") + "/") + a2)), b2.push(d)), 1;
      h = 0;
      e = e === "" ? "." : e + ":";
      if (Array.isArray(a2))
        for (var g = 0; g < a2.length; g++) {
          k = a2[g];
          var f = e + N(k, g);
          h += O(k, b2, c2, f, d);
        }
      else if (f = y(a2), typeof f === "function")
        for (a2 = f.call(a2), g = 0; !(k = a2.next()).done; )
          k = k.value, f = e + N(k, g++), h += O(k, b2, c2, f, d);
      else if (k === "object")
        throw b2 = "" + a2, Error(z(31, b2 === "[object Object]" ? "object with keys {" + Object.keys(a2).join(", ") + "}" : b2));
      return h;
    }
    function P(a2, b2, c2) {
      if (a2 == null)
        return a2;
      var e = [], d = 0;
      O(a2, e, "", "", function(a3) {
        return b2.call(c2, a3, d++);
      });
      return e;
    }
    function Q(a2) {
      if (a2._status === -1) {
        var b2 = a2._result;
        b2 = b2();
        a2._status = 0;
        a2._result = b2;
        b2.then(function(b3) {
          a2._status === 0 && (b3 = b3.default, a2._status = 1, a2._result = b3);
        }, function(b3) {
          a2._status === 0 && (a2._status = 2, a2._result = b3);
        });
      }
      if (a2._status === 1)
        return a2._result;
      throw a2._result;
    }
    var R = {current: null};
    function S() {
      var a2 = R.current;
      if (a2 === null)
        throw Error(z(321));
      return a2;
    }
    var T = {ReactCurrentDispatcher: R, ReactCurrentBatchConfig: {transition: 0}, ReactCurrentOwner: G, IsSomeRendererActing: {current: false}, assign: l};
    exports.Children = {map: P, forEach: function(a2, b2, c2) {
      P(a2, function() {
        b2.apply(this, arguments);
      }, c2);
    }, count: function(a2) {
      var b2 = 0;
      P(a2, function() {
        b2++;
      });
      return b2;
    }, toArray: function(a2) {
      return P(a2, function(a3) {
        return a3;
      }) || [];
    }, only: function(a2) {
      if (!L(a2))
        throw Error(z(143));
      return a2;
    }};
    exports.Component = C;
    exports.PureComponent = E;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T;
    exports.cloneElement = function(a2, b2, c2) {
      if (a2 === null || a2 === void 0)
        throw Error(z(267, a2));
      var e = l({}, a2.props), d = a2.key, k = a2.ref, h = a2._owner;
      if (b2 != null) {
        b2.ref !== void 0 && (k = b2.ref, h = G.current);
        b2.key !== void 0 && (d = "" + b2.key);
        if (a2.type && a2.type.defaultProps)
          var g = a2.type.defaultProps;
        for (f in b2)
          H.call(b2, f) && !I.hasOwnProperty(f) && (e[f] = b2[f] === void 0 && g !== void 0 ? g[f] : b2[f]);
      }
      var f = arguments.length - 2;
      if (f === 1)
        e.children = c2;
      else if (1 < f) {
        g = Array(f);
        for (var m2 = 0; m2 < f; m2++)
          g[m2] = arguments[m2 + 2];
        e.children = g;
      }
      return {
        $$typeof: n,
        type: a2.type,
        key: d,
        ref: k,
        props: e,
        _owner: h
      };
    };
    exports.createContext = function(a2, b2) {
      b2 === void 0 && (b2 = null);
      a2 = {$$typeof: r, _calculateChangedBits: b2, _currentValue: a2, _currentValue2: a2, _threadCount: 0, Provider: null, Consumer: null};
      a2.Provider = {$$typeof: q, _context: a2};
      return a2.Consumer = a2;
    };
    exports.createElement = J;
    exports.createFactory = function(a2) {
      var b2 = J.bind(null, a2);
      b2.type = a2;
      return b2;
    };
    exports.createRef = function() {
      return {current: null};
    };
    exports.forwardRef = function(a2) {
      return {$$typeof: t, render: a2};
    };
    exports.isValidElement = L;
    exports.lazy = function(a2) {
      return {$$typeof: v, _payload: {_status: -1, _result: a2}, _init: Q};
    };
    exports.memo = function(a2, b2) {
      return {$$typeof: u, type: a2, compare: b2 === void 0 ? null : b2};
    };
    exports.useCallback = function(a2, b2) {
      return S().useCallback(a2, b2);
    };
    exports.useContext = function(a2, b2) {
      return S().useContext(a2, b2);
    };
    exports.useDebugValue = function() {
    };
    exports.useEffect = function(a2, b2) {
      return S().useEffect(a2, b2);
    };
    exports.useImperativeHandle = function(a2, b2, c2) {
      return S().useImperativeHandle(a2, b2, c2);
    };
    exports.useLayoutEffect = function(a2, b2) {
      return S().useLayoutEffect(a2, b2);
    };
    exports.useMemo = function(a2, b2) {
      return S().useMemo(a2, b2);
    };
    exports.useReducer = function(a2, b2, c2) {
      return S().useReducer(a2, b2, c2);
    };
    exports.useRef = function(a2) {
      return S().useRef(a2);
    };
    exports.useState = function(a2) {
      return S().useState(a2);
    };
    exports.version = "17.0.2";
  }
});

// ../../node_modules/react/index.js
var require_react = __commonJS({
  "../../node_modules/react/index.js"(exports, module) {
    "use strict";
    if (true) {
      module.exports = require_react_production_min();
    } else {
      module.exports = null;
    }
  }
});

// ../../node_modules/@emotion/is-prop-valid/node_modules/@emotion/memoize/dist/memoize.browser.cjs.js
var require_memoize_browser_cjs = __commonJS({
  "../../node_modules/@emotion/is-prop-valid/node_modules/@emotion/memoize/dist/memoize.browser.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    function memoize3(fn) {
      var cache = {};
      return function(arg) {
        if (cache[arg] === void 0)
          cache[arg] = fn(arg);
        return cache[arg];
      };
    }
    exports.default = memoize3;
  }
});

// ../../node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.cjs.js
var require_is_prop_valid_browser_cjs = __commonJS({
  "../../node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    function _interopDefault(ex) {
      return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
    }
    var memoize3 = _interopDefault(require_memoize_browser_cjs());
    var reactPropsRegex2 = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
    var index = memoize3(function(prop) {
      return reactPropsRegex2.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
    });
    exports.default = index;
  }
});

// ../../node_modules/scheduler/cjs/scheduler.production.min.js
var require_scheduler_production_min = __commonJS({
  "../../node_modules/scheduler/cjs/scheduler.production.min.js"(exports) {
    "use strict";
    var f;
    var g;
    var h;
    var k;
    if (typeof performance === "object" && typeof performance.now === "function") {
      l = performance;
      exports.unstable_now = function() {
        return l.now();
      };
    } else {
      p = Date, q = p.now();
      exports.unstable_now = function() {
        return p.now() - q;
      };
    }
    var l;
    var p;
    var q;
    if (typeof window === "undefined" || typeof MessageChannel !== "function") {
      t = null, u = null, w = function() {
        if (t !== null)
          try {
            var a2 = exports.unstable_now();
            t(true, a2);
            t = null;
          } catch (b2) {
            throw setTimeout(w, 0), b2;
          }
      };
      f = function(a2) {
        t !== null ? setTimeout(f, 0, a2) : (t = a2, setTimeout(w, 0));
      };
      g = function(a2, b2) {
        u = setTimeout(a2, b2);
      };
      h = function() {
        clearTimeout(u);
      };
      exports.unstable_shouldYield = function() {
        return false;
      };
      k = exports.unstable_forceFrameRate = function() {
      };
    } else {
      x = window.setTimeout, y = window.clearTimeout;
      if (typeof console !== "undefined") {
        z = window.cancelAnimationFrame;
        typeof window.requestAnimationFrame !== "function" && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
        typeof z !== "function" && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
      }
      A = false, B = null, C = -1, D = 5, E = 0;
      exports.unstable_shouldYield = function() {
        return exports.unstable_now() >= E;
      };
      k = function() {
      };
      exports.unstable_forceFrameRate = function(a2) {
        0 > a2 || 125 < a2 ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : D = 0 < a2 ? Math.floor(1e3 / a2) : 5;
      };
      F = new MessageChannel(), G = F.port2;
      F.port1.onmessage = function() {
        if (B !== null) {
          var a2 = exports.unstable_now();
          E = a2 + D;
          try {
            B(true, a2) ? G.postMessage(null) : (A = false, B = null);
          } catch (b2) {
            throw G.postMessage(null), b2;
          }
        } else
          A = false;
      };
      f = function(a2) {
        B = a2;
        A || (A = true, G.postMessage(null));
      };
      g = function(a2, b2) {
        C = x(function() {
          a2(exports.unstable_now());
        }, b2);
      };
      h = function() {
        y(C);
        C = -1;
      };
    }
    var t;
    var u;
    var w;
    var x;
    var y;
    var z;
    var A;
    var B;
    var C;
    var D;
    var E;
    var F;
    var G;
    function H(a2, b2) {
      var c2 = a2.length;
      a2.push(b2);
      a:
        for (; ; ) {
          var d = c2 - 1 >>> 1, e = a2[d];
          if (e !== void 0 && 0 < I(e, b2))
            a2[d] = b2, a2[c2] = e, c2 = d;
          else
            break a;
        }
    }
    function J(a2) {
      a2 = a2[0];
      return a2 === void 0 ? null : a2;
    }
    function K(a2) {
      var b2 = a2[0];
      if (b2 !== void 0) {
        var c2 = a2.pop();
        if (c2 !== b2) {
          a2[0] = c2;
          a:
            for (var d = 0, e = a2.length; d < e; ) {
              var m2 = 2 * (d + 1) - 1, n = a2[m2], v = m2 + 1, r = a2[v];
              if (n !== void 0 && 0 > I(n, c2))
                r !== void 0 && 0 > I(r, n) ? (a2[d] = r, a2[v] = c2, d = v) : (a2[d] = n, a2[m2] = c2, d = m2);
              else if (r !== void 0 && 0 > I(r, c2))
                a2[d] = r, a2[v] = c2, d = v;
              else
                break a;
            }
        }
        return b2;
      }
      return null;
    }
    function I(a2, b2) {
      var c2 = a2.sortIndex - b2.sortIndex;
      return c2 !== 0 ? c2 : a2.id - b2.id;
    }
    var L = [];
    var M = [];
    var N = 1;
    var O = null;
    var P = 3;
    var Q = false;
    var R = false;
    var S = false;
    function T(a2) {
      for (var b2 = J(M); b2 !== null; ) {
        if (b2.callback === null)
          K(M);
        else if (b2.startTime <= a2)
          K(M), b2.sortIndex = b2.expirationTime, H(L, b2);
        else
          break;
        b2 = J(M);
      }
    }
    function U(a2) {
      S = false;
      T(a2);
      if (!R)
        if (J(L) !== null)
          R = true, f(V);
        else {
          var b2 = J(M);
          b2 !== null && g(U, b2.startTime - a2);
        }
    }
    function V(a2, b2) {
      R = false;
      S && (S = false, h());
      Q = true;
      var c2 = P;
      try {
        T(b2);
        for (O = J(L); O !== null && (!(O.expirationTime > b2) || a2 && !exports.unstable_shouldYield()); ) {
          var d = O.callback;
          if (typeof d === "function") {
            O.callback = null;
            P = O.priorityLevel;
            var e = d(O.expirationTime <= b2);
            b2 = exports.unstable_now();
            typeof e === "function" ? O.callback = e : O === J(L) && K(L);
            T(b2);
          } else
            K(L);
          O = J(L);
        }
        if (O !== null)
          var m2 = true;
        else {
          var n = J(M);
          n !== null && g(U, n.startTime - b2);
          m2 = false;
        }
        return m2;
      } finally {
        O = null, P = c2, Q = false;
      }
    }
    var W = k;
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(a2) {
      a2.callback = null;
    };
    exports.unstable_continueExecution = function() {
      R || Q || (R = true, f(V));
    };
    exports.unstable_getCurrentPriorityLevel = function() {
      return P;
    };
    exports.unstable_getFirstCallbackNode = function() {
      return J(L);
    };
    exports.unstable_next = function(a2) {
      switch (P) {
        case 1:
        case 2:
        case 3:
          var b2 = 3;
          break;
        default:
          b2 = P;
      }
      var c2 = P;
      P = b2;
      try {
        return a2();
      } finally {
        P = c2;
      }
    };
    exports.unstable_pauseExecution = function() {
    };
    exports.unstable_requestPaint = W;
    exports.unstable_runWithPriority = function(a2, b2) {
      switch (a2) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          a2 = 3;
      }
      var c2 = P;
      P = a2;
      try {
        return b2();
      } finally {
        P = c2;
      }
    };
    exports.unstable_scheduleCallback = function(a2, b2, c2) {
      var d = exports.unstable_now();
      typeof c2 === "object" && c2 !== null ? (c2 = c2.delay, c2 = typeof c2 === "number" && 0 < c2 ? d + c2 : d) : c2 = d;
      switch (a2) {
        case 1:
          var e = -1;
          break;
        case 2:
          e = 250;
          break;
        case 5:
          e = 1073741823;
          break;
        case 4:
          e = 1e4;
          break;
        default:
          e = 5e3;
      }
      e = c2 + e;
      a2 = {id: N++, callback: b2, priorityLevel: a2, startTime: c2, expirationTime: e, sortIndex: -1};
      c2 > d ? (a2.sortIndex = c2, H(M, a2), J(L) === null && a2 === J(M) && (S ? h() : S = true, g(U, c2 - d))) : (a2.sortIndex = e, H(L, a2), R || Q || (R = true, f(V)));
      return a2;
    };
    exports.unstable_wrapCallback = function(a2) {
      var b2 = P;
      return function() {
        var c2 = P;
        P = b2;
        try {
          return a2.apply(this, arguments);
        } finally {
          P = c2;
        }
      };
    };
  }
});

// ../../node_modules/scheduler/index.js
var require_scheduler = __commonJS({
  "../../node_modules/scheduler/index.js"(exports, module) {
    "use strict";
    if (true) {
      module.exports = require_scheduler_production_min();
    } else {
      module.exports = null;
    }
  }
});

// ../../node_modules/react-dom/cjs/react-dom.production.min.js
var require_react_dom_production_min = __commonJS({
  "../../node_modules/react-dom/cjs/react-dom.production.min.js"(exports) {
    "use strict";
    var aa = require_react();
    var m2 = require_object_assign();
    var r = require_scheduler();
    function y(a2) {
      for (var b2 = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c2 = 1; c2 < arguments.length; c2++)
        b2 += "&args[]=" + encodeURIComponent(arguments[c2]);
      return "Minified React error #" + a2 + "; visit " + b2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    if (!aa)
      throw Error(y(227));
    var ba = new Set();
    var ca2 = {};
    function da(a2, b2) {
      ea(a2, b2);
      ea(a2 + "Capture", b2);
    }
    function ea(a2, b2) {
      ca2[a2] = b2;
      for (a2 = 0; a2 < b2.length; a2++)
        ba.add(b2[a2]);
    }
    var fa = !(typeof window === "undefined" || typeof window.document === "undefined" || typeof window.document.createElement === "undefined");
    var ha = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
    var ia = Object.prototype.hasOwnProperty;
    var ja = {};
    var ka = {};
    function la(a2) {
      if (ia.call(ka, a2))
        return true;
      if (ia.call(ja, a2))
        return false;
      if (ha.test(a2))
        return ka[a2] = true;
      ja[a2] = true;
      return false;
    }
    function ma(a2, b2, c2, d) {
      if (c2 !== null && c2.type === 0)
        return false;
      switch (typeof b2) {
        case "function":
        case "symbol":
          return true;
        case "boolean":
          if (d)
            return false;
          if (c2 !== null)
            return !c2.acceptsBooleans;
          a2 = a2.toLowerCase().slice(0, 5);
          return a2 !== "data-" && a2 !== "aria-";
        default:
          return false;
      }
    }
    function na(a2, b2, c2, d) {
      if (b2 === null || typeof b2 === "undefined" || ma(a2, b2, c2, d))
        return true;
      if (d)
        return false;
      if (c2 !== null)
        switch (c2.type) {
          case 3:
            return !b2;
          case 4:
            return b2 === false;
          case 5:
            return isNaN(b2);
          case 6:
            return isNaN(b2) || 1 > b2;
        }
      return false;
    }
    function B(a2, b2, c2, d, e, f, g) {
      this.acceptsBooleans = b2 === 2 || b2 === 3 || b2 === 4;
      this.attributeName = d;
      this.attributeNamespace = e;
      this.mustUseProperty = c2;
      this.propertyName = a2;
      this.type = b2;
      this.sanitizeURL = f;
      this.removeEmptyString = g;
    }
    var D = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a2) {
      D[a2] = new B(a2, 0, false, a2, null, false, false);
    });
    [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a2) {
      var b2 = a2[0];
      D[b2] = new B(b2, 1, false, a2[1], null, false, false);
    });
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a2) {
      D[a2] = new B(a2, 2, false, a2.toLowerCase(), null, false, false);
    });
    ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a2) {
      D[a2] = new B(a2, 2, false, a2, null, false, false);
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a2) {
      D[a2] = new B(a2, 3, false, a2.toLowerCase(), null, false, false);
    });
    ["checked", "multiple", "muted", "selected"].forEach(function(a2) {
      D[a2] = new B(a2, 3, true, a2, null, false, false);
    });
    ["capture", "download"].forEach(function(a2) {
      D[a2] = new B(a2, 4, false, a2, null, false, false);
    });
    ["cols", "rows", "size", "span"].forEach(function(a2) {
      D[a2] = new B(a2, 6, false, a2, null, false, false);
    });
    ["rowSpan", "start"].forEach(function(a2) {
      D[a2] = new B(a2, 5, false, a2.toLowerCase(), null, false, false);
    });
    var oa = /[\-:]([a-z])/g;
    function pa(a2) {
      return a2[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a2) {
      var b2 = a2.replace(oa, pa);
      D[b2] = new B(b2, 1, false, a2, null, false, false);
    });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a2) {
      var b2 = a2.replace(oa, pa);
      D[b2] = new B(b2, 1, false, a2, "http://www.w3.org/1999/xlink", false, false);
    });
    ["xml:base", "xml:lang", "xml:space"].forEach(function(a2) {
      var b2 = a2.replace(oa, pa);
      D[b2] = new B(b2, 1, false, a2, "http://www.w3.org/XML/1998/namespace", false, false);
    });
    ["tabIndex", "crossOrigin"].forEach(function(a2) {
      D[a2] = new B(a2, 1, false, a2.toLowerCase(), null, false, false);
    });
    D.xlinkHref = new B("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
    ["src", "href", "action", "formAction"].forEach(function(a2) {
      D[a2] = new B(a2, 1, false, a2.toLowerCase(), null, true, true);
    });
    function qa(a2, b2, c2, d) {
      var e = D.hasOwnProperty(b2) ? D[b2] : null;
      var f = e !== null ? e.type === 0 : d ? false : !(2 < b2.length) || b2[0] !== "o" && b2[0] !== "O" || b2[1] !== "n" && b2[1] !== "N" ? false : true;
      f || (na(b2, c2, e, d) && (c2 = null), d || e === null ? la(b2) && (c2 === null ? a2.removeAttribute(b2) : a2.setAttribute(b2, "" + c2)) : e.mustUseProperty ? a2[e.propertyName] = c2 === null ? e.type === 3 ? false : "" : c2 : (b2 = e.attributeName, d = e.attributeNamespace, c2 === null ? a2.removeAttribute(b2) : (e = e.type, c2 = e === 3 || e === 4 && c2 === true ? "" : "" + c2, d ? a2.setAttributeNS(d, b2, c2) : a2.setAttribute(b2, c2))));
    }
    var ra = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    var sa = 60103;
    var ta = 60106;
    var ua = 60107;
    var wa = 60108;
    var xa = 60114;
    var ya = 60109;
    var za = 60110;
    var Aa = 60112;
    var Ba = 60113;
    var Ca = 60120;
    var Da = 60115;
    var Ea = 60116;
    var Fa = 60121;
    var Ga = 60128;
    var Ha = 60129;
    var Ia = 60130;
    var Ja = 60131;
    if (typeof Symbol === "function" && Symbol.for) {
      E = Symbol.for;
      sa = E("react.element");
      ta = E("react.portal");
      ua = E("react.fragment");
      wa = E("react.strict_mode");
      xa = E("react.profiler");
      ya = E("react.provider");
      za = E("react.context");
      Aa = E("react.forward_ref");
      Ba = E("react.suspense");
      Ca = E("react.suspense_list");
      Da = E("react.memo");
      Ea = E("react.lazy");
      Fa = E("react.block");
      E("react.scope");
      Ga = E("react.opaque.id");
      Ha = E("react.debug_trace_mode");
      Ia = E("react.offscreen");
      Ja = E("react.legacy_hidden");
    }
    var E;
    var Ka = typeof Symbol === "function" && Symbol.iterator;
    function La(a2) {
      if (a2 === null || typeof a2 !== "object")
        return null;
      a2 = Ka && a2[Ka] || a2["@@iterator"];
      return typeof a2 === "function" ? a2 : null;
    }
    var Ma;
    function Na(a2) {
      if (Ma === void 0)
        try {
          throw Error();
        } catch (c2) {
          var b2 = c2.stack.trim().match(/\n( *(at )?)/);
          Ma = b2 && b2[1] || "";
        }
      return "\n" + Ma + a2;
    }
    var Oa = false;
    function Pa(a2, b2) {
      if (!a2 || Oa)
        return "";
      Oa = true;
      var c2 = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        if (b2)
          if (b2 = function() {
            throw Error();
          }, Object.defineProperty(b2.prototype, "props", {set: function() {
            throw Error();
          }}), typeof Reflect === "object" && Reflect.construct) {
            try {
              Reflect.construct(b2, []);
            } catch (k) {
              var d = k;
            }
            Reflect.construct(a2, [], b2);
          } else {
            try {
              b2.call();
            } catch (k) {
              d = k;
            }
            a2.call(b2.prototype);
          }
        else {
          try {
            throw Error();
          } catch (k) {
            d = k;
          }
          a2();
        }
      } catch (k) {
        if (k && d && typeof k.stack === "string") {
          for (var e = k.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; )
            h--;
          for (; 1 <= g && 0 <= h; g--, h--)
            if (e[g] !== f[h]) {
              if (g !== 1 || h !== 1) {
                do
                  if (g--, h--, 0 > h || e[g] !== f[h])
                    return "\n" + e[g].replace(" at new ", " at ");
                while (1 <= g && 0 <= h);
              }
              break;
            }
        }
      } finally {
        Oa = false, Error.prepareStackTrace = c2;
      }
      return (a2 = a2 ? a2.displayName || a2.name : "") ? Na(a2) : "";
    }
    function Qa(a2) {
      switch (a2.tag) {
        case 5:
          return Na(a2.type);
        case 16:
          return Na("Lazy");
        case 13:
          return Na("Suspense");
        case 19:
          return Na("SuspenseList");
        case 0:
        case 2:
        case 15:
          return a2 = Pa(a2.type, false), a2;
        case 11:
          return a2 = Pa(a2.type.render, false), a2;
        case 22:
          return a2 = Pa(a2.type._render, false), a2;
        case 1:
          return a2 = Pa(a2.type, true), a2;
        default:
          return "";
      }
    }
    function Ra(a2) {
      if (a2 == null)
        return null;
      if (typeof a2 === "function")
        return a2.displayName || a2.name || null;
      if (typeof a2 === "string")
        return a2;
      switch (a2) {
        case ua:
          return "Fragment";
        case ta:
          return "Portal";
        case xa:
          return "Profiler";
        case wa:
          return "StrictMode";
        case Ba:
          return "Suspense";
        case Ca:
          return "SuspenseList";
      }
      if (typeof a2 === "object")
        switch (a2.$$typeof) {
          case za:
            return (a2.displayName || "Context") + ".Consumer";
          case ya:
            return (a2._context.displayName || "Context") + ".Provider";
          case Aa:
            var b2 = a2.render;
            b2 = b2.displayName || b2.name || "";
            return a2.displayName || (b2 !== "" ? "ForwardRef(" + b2 + ")" : "ForwardRef");
          case Da:
            return Ra(a2.type);
          case Fa:
            return Ra(a2._render);
          case Ea:
            b2 = a2._payload;
            a2 = a2._init;
            try {
              return Ra(a2(b2));
            } catch (c2) {
            }
        }
      return null;
    }
    function Sa(a2) {
      switch (typeof a2) {
        case "boolean":
        case "number":
        case "object":
        case "string":
        case "undefined":
          return a2;
        default:
          return "";
      }
    }
    function Ta(a2) {
      var b2 = a2.type;
      return (a2 = a2.nodeName) && a2.toLowerCase() === "input" && (b2 === "checkbox" || b2 === "radio");
    }
    function Ua(a2) {
      var b2 = Ta(a2) ? "checked" : "value", c2 = Object.getOwnPropertyDescriptor(a2.constructor.prototype, b2), d = "" + a2[b2];
      if (!a2.hasOwnProperty(b2) && typeof c2 !== "undefined" && typeof c2.get === "function" && typeof c2.set === "function") {
        var e = c2.get, f = c2.set;
        Object.defineProperty(a2, b2, {configurable: true, get: function() {
          return e.call(this);
        }, set: function(a3) {
          d = "" + a3;
          f.call(this, a3);
        }});
        Object.defineProperty(a2, b2, {enumerable: c2.enumerable});
        return {getValue: function() {
          return d;
        }, setValue: function(a3) {
          d = "" + a3;
        }, stopTracking: function() {
          a2._valueTracker = null;
          delete a2[b2];
        }};
      }
    }
    function Va(a2) {
      a2._valueTracker || (a2._valueTracker = Ua(a2));
    }
    function Wa(a2) {
      if (!a2)
        return false;
      var b2 = a2._valueTracker;
      if (!b2)
        return true;
      var c2 = b2.getValue();
      var d = "";
      a2 && (d = Ta(a2) ? a2.checked ? "true" : "false" : a2.value);
      a2 = d;
      return a2 !== c2 ? (b2.setValue(a2), true) : false;
    }
    function Xa(a2) {
      a2 = a2 || (typeof document !== "undefined" ? document : void 0);
      if (typeof a2 === "undefined")
        return null;
      try {
        return a2.activeElement || a2.body;
      } catch (b2) {
        return a2.body;
      }
    }
    function Ya(a2, b2) {
      var c2 = b2.checked;
      return m2({}, b2, {defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: c2 != null ? c2 : a2._wrapperState.initialChecked});
    }
    function Za(a2, b2) {
      var c2 = b2.defaultValue == null ? "" : b2.defaultValue, d = b2.checked != null ? b2.checked : b2.defaultChecked;
      c2 = Sa(b2.value != null ? b2.value : c2);
      a2._wrapperState = {initialChecked: d, initialValue: c2, controlled: b2.type === "checkbox" || b2.type === "radio" ? b2.checked != null : b2.value != null};
    }
    function $a(a2, b2) {
      b2 = b2.checked;
      b2 != null && qa(a2, "checked", b2, false);
    }
    function ab(a2, b2) {
      $a(a2, b2);
      var c2 = Sa(b2.value), d = b2.type;
      if (c2 != null)
        if (d === "number") {
          if (c2 === 0 && a2.value === "" || a2.value != c2)
            a2.value = "" + c2;
        } else
          a2.value !== "" + c2 && (a2.value = "" + c2);
      else if (d === "submit" || d === "reset") {
        a2.removeAttribute("value");
        return;
      }
      b2.hasOwnProperty("value") ? bb(a2, b2.type, c2) : b2.hasOwnProperty("defaultValue") && bb(a2, b2.type, Sa(b2.defaultValue));
      b2.checked == null && b2.defaultChecked != null && (a2.defaultChecked = !!b2.defaultChecked);
    }
    function cb2(a2, b2, c2) {
      if (b2.hasOwnProperty("value") || b2.hasOwnProperty("defaultValue")) {
        var d = b2.type;
        if (!(d !== "submit" && d !== "reset" || b2.value !== void 0 && b2.value !== null))
          return;
        b2 = "" + a2._wrapperState.initialValue;
        c2 || b2 === a2.value || (a2.value = b2);
        a2.defaultValue = b2;
      }
      c2 = a2.name;
      c2 !== "" && (a2.name = "");
      a2.defaultChecked = !!a2._wrapperState.initialChecked;
      c2 !== "" && (a2.name = c2);
    }
    function bb(a2, b2, c2) {
      if (b2 !== "number" || Xa(a2.ownerDocument) !== a2)
        c2 == null ? a2.defaultValue = "" + a2._wrapperState.initialValue : a2.defaultValue !== "" + c2 && (a2.defaultValue = "" + c2);
    }
    function db(a2) {
      var b2 = "";
      aa.Children.forEach(a2, function(a3) {
        a3 != null && (b2 += a3);
      });
      return b2;
    }
    function eb(a2, b2) {
      a2 = m2({children: void 0}, b2);
      if (b2 = db(b2.children))
        a2.children = b2;
      return a2;
    }
    function fb(a2, b2, c2, d) {
      a2 = a2.options;
      if (b2) {
        b2 = {};
        for (var e = 0; e < c2.length; e++)
          b2["$" + c2[e]] = true;
        for (c2 = 0; c2 < a2.length; c2++)
          e = b2.hasOwnProperty("$" + a2[c2].value), a2[c2].selected !== e && (a2[c2].selected = e), e && d && (a2[c2].defaultSelected = true);
      } else {
        c2 = "" + Sa(c2);
        b2 = null;
        for (e = 0; e < a2.length; e++) {
          if (a2[e].value === c2) {
            a2[e].selected = true;
            d && (a2[e].defaultSelected = true);
            return;
          }
          b2 !== null || a2[e].disabled || (b2 = a2[e]);
        }
        b2 !== null && (b2.selected = true);
      }
    }
    function gb(a2, b2) {
      if (b2.dangerouslySetInnerHTML != null)
        throw Error(y(91));
      return m2({}, b2, {value: void 0, defaultValue: void 0, children: "" + a2._wrapperState.initialValue});
    }
    function hb(a2, b2) {
      var c2 = b2.value;
      if (c2 == null) {
        c2 = b2.children;
        b2 = b2.defaultValue;
        if (c2 != null) {
          if (b2 != null)
            throw Error(y(92));
          if (Array.isArray(c2)) {
            if (!(1 >= c2.length))
              throw Error(y(93));
            c2 = c2[0];
          }
          b2 = c2;
        }
        b2 == null && (b2 = "");
        c2 = b2;
      }
      a2._wrapperState = {initialValue: Sa(c2)};
    }
    function ib(a2, b2) {
      var c2 = Sa(b2.value), d = Sa(b2.defaultValue);
      c2 != null && (c2 = "" + c2, c2 !== a2.value && (a2.value = c2), b2.defaultValue == null && a2.defaultValue !== c2 && (a2.defaultValue = c2));
      d != null && (a2.defaultValue = "" + d);
    }
    function jb(a2) {
      var b2 = a2.textContent;
      b2 === a2._wrapperState.initialValue && b2 !== "" && b2 !== null && (a2.value = b2);
    }
    var kb = {html: "http://www.w3.org/1999/xhtml", mathml: "http://www.w3.org/1998/Math/MathML", svg: "http://www.w3.org/2000/svg"};
    function lb(a2) {
      switch (a2) {
        case "svg":
          return "http://www.w3.org/2000/svg";
        case "math":
          return "http://www.w3.org/1998/Math/MathML";
        default:
          return "http://www.w3.org/1999/xhtml";
      }
    }
    function mb(a2, b2) {
      return a2 == null || a2 === "http://www.w3.org/1999/xhtml" ? lb(b2) : a2 === "http://www.w3.org/2000/svg" && b2 === "foreignObject" ? "http://www.w3.org/1999/xhtml" : a2;
    }
    var nb;
    var ob = function(a2) {
      return typeof MSApp !== "undefined" && MSApp.execUnsafeLocalFunction ? function(b2, c2, d, e) {
        MSApp.execUnsafeLocalFunction(function() {
          return a2(b2, c2, d, e);
        });
      } : a2;
    }(function(a2, b2) {
      if (a2.namespaceURI !== kb.svg || "innerHTML" in a2)
        a2.innerHTML = b2;
      else {
        nb = nb || document.createElement("div");
        nb.innerHTML = "<svg>" + b2.valueOf().toString() + "</svg>";
        for (b2 = nb.firstChild; a2.firstChild; )
          a2.removeChild(a2.firstChild);
        for (; b2.firstChild; )
          a2.appendChild(b2.firstChild);
      }
    });
    function pb(a2, b2) {
      if (b2) {
        var c2 = a2.firstChild;
        if (c2 && c2 === a2.lastChild && c2.nodeType === 3) {
          c2.nodeValue = b2;
          return;
        }
      }
      a2.textContent = b2;
    }
    var qb = {
      animationIterationCount: true,
      borderImageOutset: true,
      borderImageSlice: true,
      borderImageWidth: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      columns: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridArea: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowSpan: true,
      gridRowStart: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnSpan: true,
      gridColumnStart: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeDasharray: true,
      strokeDashoffset: true,
      strokeMiterlimit: true,
      strokeOpacity: true,
      strokeWidth: true
    };
    var rb = ["Webkit", "ms", "Moz", "O"];
    Object.keys(qb).forEach(function(a2) {
      rb.forEach(function(b2) {
        b2 = b2 + a2.charAt(0).toUpperCase() + a2.substring(1);
        qb[b2] = qb[a2];
      });
    });
    function sb(a2, b2, c2) {
      return b2 == null || typeof b2 === "boolean" || b2 === "" ? "" : c2 || typeof b2 !== "number" || b2 === 0 || qb.hasOwnProperty(a2) && qb[a2] ? ("" + b2).trim() : b2 + "px";
    }
    function tb(a2, b2) {
      a2 = a2.style;
      for (var c2 in b2)
        if (b2.hasOwnProperty(c2)) {
          var d = c2.indexOf("--") === 0, e = sb(c2, b2[c2], d);
          c2 === "float" && (c2 = "cssFloat");
          d ? a2.setProperty(c2, e) : a2[c2] = e;
        }
    }
    var ub = m2({menuitem: true}, {area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true});
    function vb(a2, b2) {
      if (b2) {
        if (ub[a2] && (b2.children != null || b2.dangerouslySetInnerHTML != null))
          throw Error(y(137, a2));
        if (b2.dangerouslySetInnerHTML != null) {
          if (b2.children != null)
            throw Error(y(60));
          if (!(typeof b2.dangerouslySetInnerHTML === "object" && "__html" in b2.dangerouslySetInnerHTML))
            throw Error(y(61));
        }
        if (b2.style != null && typeof b2.style !== "object")
          throw Error(y(62));
      }
    }
    function wb(a2, b2) {
      if (a2.indexOf("-") === -1)
        return typeof b2.is === "string";
      switch (a2) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return false;
        default:
          return true;
      }
    }
    function xb(a2) {
      a2 = a2.target || a2.srcElement || window;
      a2.correspondingUseElement && (a2 = a2.correspondingUseElement);
      return a2.nodeType === 3 ? a2.parentNode : a2;
    }
    var yb = null;
    var zb = null;
    var Ab = null;
    function Bb(a2) {
      if (a2 = Cb(a2)) {
        if (typeof yb !== "function")
          throw Error(y(280));
        var b2 = a2.stateNode;
        b2 && (b2 = Db(b2), yb(a2.stateNode, a2.type, b2));
      }
    }
    function Eb(a2) {
      zb ? Ab ? Ab.push(a2) : Ab = [a2] : zb = a2;
    }
    function Fb() {
      if (zb) {
        var a2 = zb, b2 = Ab;
        Ab = zb = null;
        Bb(a2);
        if (b2)
          for (a2 = 0; a2 < b2.length; a2++)
            Bb(b2[a2]);
      }
    }
    function Gb(a2, b2) {
      return a2(b2);
    }
    function Hb(a2, b2, c2, d, e) {
      return a2(b2, c2, d, e);
    }
    function Ib() {
    }
    var Jb = Gb;
    var Kb = false;
    var Lb = false;
    function Mb() {
      if (zb !== null || Ab !== null)
        Ib(), Fb();
    }
    function Nb(a2, b2, c2) {
      if (Lb)
        return a2(b2, c2);
      Lb = true;
      try {
        return Jb(a2, b2, c2);
      } finally {
        Lb = false, Mb();
      }
    }
    function Ob(a2, b2) {
      var c2 = a2.stateNode;
      if (c2 === null)
        return null;
      var d = Db(c2);
      if (d === null)
        return null;
      c2 = d[b2];
      a:
        switch (b2) {
          case "onClick":
          case "onClickCapture":
          case "onDoubleClick":
          case "onDoubleClickCapture":
          case "onMouseDown":
          case "onMouseDownCapture":
          case "onMouseMove":
          case "onMouseMoveCapture":
          case "onMouseUp":
          case "onMouseUpCapture":
          case "onMouseEnter":
            (d = !d.disabled) || (a2 = a2.type, d = !(a2 === "button" || a2 === "input" || a2 === "select" || a2 === "textarea"));
            a2 = !d;
            break a;
          default:
            a2 = false;
        }
      if (a2)
        return null;
      if (c2 && typeof c2 !== "function")
        throw Error(y(231, b2, typeof c2));
      return c2;
    }
    var Pb = false;
    if (fa)
      try {
        Qb = {};
        Object.defineProperty(Qb, "passive", {get: function() {
          Pb = true;
        }});
        window.addEventListener("test", Qb, Qb);
        window.removeEventListener("test", Qb, Qb);
      } catch (a2) {
        Pb = false;
      }
    var Qb;
    function Rb(a2, b2, c2, d, e, f, g, h, k) {
      var l = Array.prototype.slice.call(arguments, 3);
      try {
        b2.apply(c2, l);
      } catch (n) {
        this.onError(n);
      }
    }
    var Sb = false;
    var Tb = null;
    var Ub = false;
    var Vb = null;
    var Wb = {onError: function(a2) {
      Sb = true;
      Tb = a2;
    }};
    function Xb(a2, b2, c2, d, e, f, g, h, k) {
      Sb = false;
      Tb = null;
      Rb.apply(Wb, arguments);
    }
    function Yb(a2, b2, c2, d, e, f, g, h, k) {
      Xb.apply(this, arguments);
      if (Sb) {
        if (Sb) {
          var l = Tb;
          Sb = false;
          Tb = null;
        } else
          throw Error(y(198));
        Ub || (Ub = true, Vb = l);
      }
    }
    function Zb(a2) {
      var b2 = a2, c2 = a2;
      if (a2.alternate)
        for (; b2.return; )
          b2 = b2.return;
      else {
        a2 = b2;
        do
          b2 = a2, (b2.flags & 1026) !== 0 && (c2 = b2.return), a2 = b2.return;
        while (a2);
      }
      return b2.tag === 3 ? c2 : null;
    }
    function $b(a2) {
      if (a2.tag === 13) {
        var b2 = a2.memoizedState;
        b2 === null && (a2 = a2.alternate, a2 !== null && (b2 = a2.memoizedState));
        if (b2 !== null)
          return b2.dehydrated;
      }
      return null;
    }
    function ac(a2) {
      if (Zb(a2) !== a2)
        throw Error(y(188));
    }
    function bc(a2) {
      var b2 = a2.alternate;
      if (!b2) {
        b2 = Zb(a2);
        if (b2 === null)
          throw Error(y(188));
        return b2 !== a2 ? null : a2;
      }
      for (var c2 = a2, d = b2; ; ) {
        var e = c2.return;
        if (e === null)
          break;
        var f = e.alternate;
        if (f === null) {
          d = e.return;
          if (d !== null) {
            c2 = d;
            continue;
          }
          break;
        }
        if (e.child === f.child) {
          for (f = e.child; f; ) {
            if (f === c2)
              return ac(e), a2;
            if (f === d)
              return ac(e), b2;
            f = f.sibling;
          }
          throw Error(y(188));
        }
        if (c2.return !== d.return)
          c2 = e, d = f;
        else {
          for (var g = false, h = e.child; h; ) {
            if (h === c2) {
              g = true;
              c2 = e;
              d = f;
              break;
            }
            if (h === d) {
              g = true;
              d = e;
              c2 = f;
              break;
            }
            h = h.sibling;
          }
          if (!g) {
            for (h = f.child; h; ) {
              if (h === c2) {
                g = true;
                c2 = f;
                d = e;
                break;
              }
              if (h === d) {
                g = true;
                d = f;
                c2 = e;
                break;
              }
              h = h.sibling;
            }
            if (!g)
              throw Error(y(189));
          }
        }
        if (c2.alternate !== d)
          throw Error(y(190));
      }
      if (c2.tag !== 3)
        throw Error(y(188));
      return c2.stateNode.current === c2 ? a2 : b2;
    }
    function cc2(a2) {
      a2 = bc(a2);
      if (!a2)
        return null;
      for (var b2 = a2; ; ) {
        if (b2.tag === 5 || b2.tag === 6)
          return b2;
        if (b2.child)
          b2.child.return = b2, b2 = b2.child;
        else {
          if (b2 === a2)
            break;
          for (; !b2.sibling; ) {
            if (!b2.return || b2.return === a2)
              return null;
            b2 = b2.return;
          }
          b2.sibling.return = b2.return;
          b2 = b2.sibling;
        }
      }
      return null;
    }
    function dc(a2, b2) {
      for (var c2 = a2.alternate; b2 !== null; ) {
        if (b2 === a2 || b2 === c2)
          return true;
        b2 = b2.return;
      }
      return false;
    }
    var ec;
    var fc;
    var gc;
    var hc;
    var ic = false;
    var jc = [];
    var kc = null;
    var lc = null;
    var mc = null;
    var nc = new Map();
    var oc = new Map();
    var pc = [];
    var qc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
    function rc(a2, b2, c2, d, e) {
      return {blockedOn: a2, domEventName: b2, eventSystemFlags: c2 | 16, nativeEvent: e, targetContainers: [d]};
    }
    function sc(a2, b2) {
      switch (a2) {
        case "focusin":
        case "focusout":
          kc = null;
          break;
        case "dragenter":
        case "dragleave":
          lc = null;
          break;
        case "mouseover":
        case "mouseout":
          mc = null;
          break;
        case "pointerover":
        case "pointerout":
          nc.delete(b2.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          oc.delete(b2.pointerId);
      }
    }
    function tc(a2, b2, c2, d, e, f) {
      if (a2 === null || a2.nativeEvent !== f)
        return a2 = rc(b2, c2, d, e, f), b2 !== null && (b2 = Cb(b2), b2 !== null && fc(b2)), a2;
      a2.eventSystemFlags |= d;
      b2 = a2.targetContainers;
      e !== null && b2.indexOf(e) === -1 && b2.push(e);
      return a2;
    }
    function uc(a2, b2, c2, d, e) {
      switch (b2) {
        case "focusin":
          return kc = tc(kc, a2, b2, c2, d, e), true;
        case "dragenter":
          return lc = tc(lc, a2, b2, c2, d, e), true;
        case "mouseover":
          return mc = tc(mc, a2, b2, c2, d, e), true;
        case "pointerover":
          var f = e.pointerId;
          nc.set(f, tc(nc.get(f) || null, a2, b2, c2, d, e));
          return true;
        case "gotpointercapture":
          return f = e.pointerId, oc.set(f, tc(oc.get(f) || null, a2, b2, c2, d, e)), true;
      }
      return false;
    }
    function vc(a2) {
      var b2 = wc(a2.target);
      if (b2 !== null) {
        var c2 = Zb(b2);
        if (c2 !== null) {
          if (b2 = c2.tag, b2 === 13) {
            if (b2 = $b(c2), b2 !== null) {
              a2.blockedOn = b2;
              hc(a2.lanePriority, function() {
                r.unstable_runWithPriority(a2.priority, function() {
                  gc(c2);
                });
              });
              return;
            }
          } else if (b2 === 3 && c2.stateNode.hydrate) {
            a2.blockedOn = c2.tag === 3 ? c2.stateNode.containerInfo : null;
            return;
          }
        }
      }
      a2.blockedOn = null;
    }
    function xc(a2) {
      if (a2.blockedOn !== null)
        return false;
      for (var b2 = a2.targetContainers; 0 < b2.length; ) {
        var c2 = yc(a2.domEventName, a2.eventSystemFlags, b2[0], a2.nativeEvent);
        if (c2 !== null)
          return b2 = Cb(c2), b2 !== null && fc(b2), a2.blockedOn = c2, false;
        b2.shift();
      }
      return true;
    }
    function zc(a2, b2, c2) {
      xc(a2) && c2.delete(b2);
    }
    function Ac() {
      for (ic = false; 0 < jc.length; ) {
        var a2 = jc[0];
        if (a2.blockedOn !== null) {
          a2 = Cb(a2.blockedOn);
          a2 !== null && ec(a2);
          break;
        }
        for (var b2 = a2.targetContainers; 0 < b2.length; ) {
          var c2 = yc(a2.domEventName, a2.eventSystemFlags, b2[0], a2.nativeEvent);
          if (c2 !== null) {
            a2.blockedOn = c2;
            break;
          }
          b2.shift();
        }
        a2.blockedOn === null && jc.shift();
      }
      kc !== null && xc(kc) && (kc = null);
      lc !== null && xc(lc) && (lc = null);
      mc !== null && xc(mc) && (mc = null);
      nc.forEach(zc);
      oc.forEach(zc);
    }
    function Bc(a2, b2) {
      a2.blockedOn === b2 && (a2.blockedOn = null, ic || (ic = true, r.unstable_scheduleCallback(r.unstable_NormalPriority, Ac)));
    }
    function Cc(a2) {
      function b2(b3) {
        return Bc(b3, a2);
      }
      if (0 < jc.length) {
        Bc(jc[0], a2);
        for (var c2 = 1; c2 < jc.length; c2++) {
          var d = jc[c2];
          d.blockedOn === a2 && (d.blockedOn = null);
        }
      }
      kc !== null && Bc(kc, a2);
      lc !== null && Bc(lc, a2);
      mc !== null && Bc(mc, a2);
      nc.forEach(b2);
      oc.forEach(b2);
      for (c2 = 0; c2 < pc.length; c2++)
        d = pc[c2], d.blockedOn === a2 && (d.blockedOn = null);
      for (; 0 < pc.length && (c2 = pc[0], c2.blockedOn === null); )
        vc(c2), c2.blockedOn === null && pc.shift();
    }
    function Dc(a2, b2) {
      var c2 = {};
      c2[a2.toLowerCase()] = b2.toLowerCase();
      c2["Webkit" + a2] = "webkit" + b2;
      c2["Moz" + a2] = "moz" + b2;
      return c2;
    }
    var Ec = {animationend: Dc("Animation", "AnimationEnd"), animationiteration: Dc("Animation", "AnimationIteration"), animationstart: Dc("Animation", "AnimationStart"), transitionend: Dc("Transition", "TransitionEnd")};
    var Fc = {};
    var Gc = {};
    fa && (Gc = document.createElement("div").style, "AnimationEvent" in window || (delete Ec.animationend.animation, delete Ec.animationiteration.animation, delete Ec.animationstart.animation), "TransitionEvent" in window || delete Ec.transitionend.transition);
    function Hc(a2) {
      if (Fc[a2])
        return Fc[a2];
      if (!Ec[a2])
        return a2;
      var b2 = Ec[a2], c2;
      for (c2 in b2)
        if (b2.hasOwnProperty(c2) && c2 in Gc)
          return Fc[a2] = b2[c2];
      return a2;
    }
    var Ic = Hc("animationend");
    var Jc = Hc("animationiteration");
    var Kc = Hc("animationstart");
    var Lc = Hc("transitionend");
    var Mc = new Map();
    var Nc = new Map();
    var Oc = [
      "abort",
      "abort",
      Ic,
      "animationEnd",
      Jc,
      "animationIteration",
      Kc,
      "animationStart",
      "canplay",
      "canPlay",
      "canplaythrough",
      "canPlayThrough",
      "durationchange",
      "durationChange",
      "emptied",
      "emptied",
      "encrypted",
      "encrypted",
      "ended",
      "ended",
      "error",
      "error",
      "gotpointercapture",
      "gotPointerCapture",
      "load",
      "load",
      "loadeddata",
      "loadedData",
      "loadedmetadata",
      "loadedMetadata",
      "loadstart",
      "loadStart",
      "lostpointercapture",
      "lostPointerCapture",
      "playing",
      "playing",
      "progress",
      "progress",
      "seeking",
      "seeking",
      "stalled",
      "stalled",
      "suspend",
      "suspend",
      "timeupdate",
      "timeUpdate",
      Lc,
      "transitionEnd",
      "waiting",
      "waiting"
    ];
    function Pc(a2, b2) {
      for (var c2 = 0; c2 < a2.length; c2 += 2) {
        var d = a2[c2], e = a2[c2 + 1];
        e = "on" + (e[0].toUpperCase() + e.slice(1));
        Nc.set(d, b2);
        Mc.set(d, e);
        da(e, [d]);
      }
    }
    var Qc = r.unstable_now;
    Qc();
    var F = 8;
    function Rc(a2) {
      if ((1 & a2) !== 0)
        return F = 15, 1;
      if ((2 & a2) !== 0)
        return F = 14, 2;
      if ((4 & a2) !== 0)
        return F = 13, 4;
      var b2 = 24 & a2;
      if (b2 !== 0)
        return F = 12, b2;
      if ((a2 & 32) !== 0)
        return F = 11, 32;
      b2 = 192 & a2;
      if (b2 !== 0)
        return F = 10, b2;
      if ((a2 & 256) !== 0)
        return F = 9, 256;
      b2 = 3584 & a2;
      if (b2 !== 0)
        return F = 8, b2;
      if ((a2 & 4096) !== 0)
        return F = 7, 4096;
      b2 = 4186112 & a2;
      if (b2 !== 0)
        return F = 6, b2;
      b2 = 62914560 & a2;
      if (b2 !== 0)
        return F = 5, b2;
      if (a2 & 67108864)
        return F = 4, 67108864;
      if ((a2 & 134217728) !== 0)
        return F = 3, 134217728;
      b2 = 805306368 & a2;
      if (b2 !== 0)
        return F = 2, b2;
      if ((1073741824 & a2) !== 0)
        return F = 1, 1073741824;
      F = 8;
      return a2;
    }
    function Sc(a2) {
      switch (a2) {
        case 99:
          return 15;
        case 98:
          return 10;
        case 97:
        case 96:
          return 8;
        case 95:
          return 2;
        default:
          return 0;
      }
    }
    function Tc(a2) {
      switch (a2) {
        case 15:
        case 14:
          return 99;
        case 13:
        case 12:
        case 11:
        case 10:
          return 98;
        case 9:
        case 8:
        case 7:
        case 6:
        case 4:
        case 5:
          return 97;
        case 3:
        case 2:
        case 1:
          return 95;
        case 0:
          return 90;
        default:
          throw Error(y(358, a2));
      }
    }
    function Uc(a2, b2) {
      var c2 = a2.pendingLanes;
      if (c2 === 0)
        return F = 0;
      var d = 0, e = 0, f = a2.expiredLanes, g = a2.suspendedLanes, h = a2.pingedLanes;
      if (f !== 0)
        d = f, e = F = 15;
      else if (f = c2 & 134217727, f !== 0) {
        var k = f & ~g;
        k !== 0 ? (d = Rc(k), e = F) : (h &= f, h !== 0 && (d = Rc(h), e = F));
      } else
        f = c2 & ~g, f !== 0 ? (d = Rc(f), e = F) : h !== 0 && (d = Rc(h), e = F);
      if (d === 0)
        return 0;
      d = 31 - Vc(d);
      d = c2 & ((0 > d ? 0 : 1 << d) << 1) - 1;
      if (b2 !== 0 && b2 !== d && (b2 & g) === 0) {
        Rc(b2);
        if (e <= F)
          return b2;
        F = e;
      }
      b2 = a2.entangledLanes;
      if (b2 !== 0)
        for (a2 = a2.entanglements, b2 &= d; 0 < b2; )
          c2 = 31 - Vc(b2), e = 1 << c2, d |= a2[c2], b2 &= ~e;
      return d;
    }
    function Wc(a2) {
      a2 = a2.pendingLanes & -1073741825;
      return a2 !== 0 ? a2 : a2 & 1073741824 ? 1073741824 : 0;
    }
    function Xc(a2, b2) {
      switch (a2) {
        case 15:
          return 1;
        case 14:
          return 2;
        case 12:
          return a2 = Yc(24 & ~b2), a2 === 0 ? Xc(10, b2) : a2;
        case 10:
          return a2 = Yc(192 & ~b2), a2 === 0 ? Xc(8, b2) : a2;
        case 8:
          return a2 = Yc(3584 & ~b2), a2 === 0 && (a2 = Yc(4186112 & ~b2), a2 === 0 && (a2 = 512)), a2;
        case 2:
          return b2 = Yc(805306368 & ~b2), b2 === 0 && (b2 = 268435456), b2;
      }
      throw Error(y(358, a2));
    }
    function Yc(a2) {
      return a2 & -a2;
    }
    function Zc(a2) {
      for (var b2 = [], c2 = 0; 31 > c2; c2++)
        b2.push(a2);
      return b2;
    }
    function $c(a2, b2, c2) {
      a2.pendingLanes |= b2;
      var d = b2 - 1;
      a2.suspendedLanes &= d;
      a2.pingedLanes &= d;
      a2 = a2.eventTimes;
      b2 = 31 - Vc(b2);
      a2[b2] = c2;
    }
    var Vc = Math.clz32 ? Math.clz32 : ad;
    var bd = Math.log;
    var cd = Math.LN2;
    function ad(a2) {
      return a2 === 0 ? 32 : 31 - (bd(a2) / cd | 0) | 0;
    }
    var dd = r.unstable_UserBlockingPriority;
    var ed = r.unstable_runWithPriority;
    var fd = true;
    function gd(a2, b2, c2, d) {
      Kb || Ib();
      var e = hd, f = Kb;
      Kb = true;
      try {
        Hb(e, a2, b2, c2, d);
      } finally {
        (Kb = f) || Mb();
      }
    }
    function id(a2, b2, c2, d) {
      ed(dd, hd.bind(null, a2, b2, c2, d));
    }
    function hd(a2, b2, c2, d) {
      if (fd) {
        var e;
        if ((e = (b2 & 4) === 0) && 0 < jc.length && -1 < qc.indexOf(a2))
          a2 = rc(null, a2, b2, c2, d), jc.push(a2);
        else {
          var f = yc(a2, b2, c2, d);
          if (f === null)
            e && sc(a2, d);
          else {
            if (e) {
              if (-1 < qc.indexOf(a2)) {
                a2 = rc(f, a2, b2, c2, d);
                jc.push(a2);
                return;
              }
              if (uc(f, a2, b2, c2, d))
                return;
              sc(a2, d);
            }
            jd(a2, b2, d, null, c2);
          }
        }
      }
    }
    function yc(a2, b2, c2, d) {
      var e = xb(d);
      e = wc(e);
      if (e !== null) {
        var f = Zb(e);
        if (f === null)
          e = null;
        else {
          var g = f.tag;
          if (g === 13) {
            e = $b(f);
            if (e !== null)
              return e;
            e = null;
          } else if (g === 3) {
            if (f.stateNode.hydrate)
              return f.tag === 3 ? f.stateNode.containerInfo : null;
            e = null;
          } else
            f !== e && (e = null);
        }
      }
      jd(a2, b2, d, e, c2);
      return null;
    }
    var kd = null;
    var ld = null;
    var md = null;
    function nd() {
      if (md)
        return md;
      var a2, b2 = ld, c2 = b2.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
      for (a2 = 0; a2 < c2 && b2[a2] === e[a2]; a2++)
        ;
      var g = c2 - a2;
      for (d = 1; d <= g && b2[c2 - d] === e[f - d]; d++)
        ;
      return md = e.slice(a2, 1 < d ? 1 - d : void 0);
    }
    function od(a2) {
      var b2 = a2.keyCode;
      "charCode" in a2 ? (a2 = a2.charCode, a2 === 0 && b2 === 13 && (a2 = 13)) : a2 = b2;
      a2 === 10 && (a2 = 13);
      return 32 <= a2 || a2 === 13 ? a2 : 0;
    }
    function pd() {
      return true;
    }
    function qd() {
      return false;
    }
    function rd(a2) {
      function b2(b3, d, e, f, g) {
        this._reactName = b3;
        this._targetInst = e;
        this.type = d;
        this.nativeEvent = f;
        this.target = g;
        this.currentTarget = null;
        for (var c2 in a2)
          a2.hasOwnProperty(c2) && (b3 = a2[c2], this[c2] = b3 ? b3(f) : f[c2]);
        this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === false) ? pd : qd;
        this.isPropagationStopped = qd;
        return this;
      }
      m2(b2.prototype, {preventDefault: function() {
        this.defaultPrevented = true;
        var a3 = this.nativeEvent;
        a3 && (a3.preventDefault ? a3.preventDefault() : typeof a3.returnValue !== "unknown" && (a3.returnValue = false), this.isDefaultPrevented = pd);
      }, stopPropagation: function() {
        var a3 = this.nativeEvent;
        a3 && (a3.stopPropagation ? a3.stopPropagation() : typeof a3.cancelBubble !== "unknown" && (a3.cancelBubble = true), this.isPropagationStopped = pd);
      }, persist: function() {
      }, isPersistent: pd});
      return b2;
    }
    var sd = {eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a2) {
      return a2.timeStamp || Date.now();
    }, defaultPrevented: 0, isTrusted: 0};
    var td = rd(sd);
    var ud = m2({}, sd, {view: 0, detail: 0});
    var vd = rd(ud);
    var wd;
    var xd;
    var yd;
    var Ad = m2({}, ud, {screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a2) {
      return a2.relatedTarget === void 0 ? a2.fromElement === a2.srcElement ? a2.toElement : a2.fromElement : a2.relatedTarget;
    }, movementX: function(a2) {
      if ("movementX" in a2)
        return a2.movementX;
      a2 !== yd && (yd && a2.type === "mousemove" ? (wd = a2.screenX - yd.screenX, xd = a2.screenY - yd.screenY) : xd = wd = 0, yd = a2);
      return wd;
    }, movementY: function(a2) {
      return "movementY" in a2 ? a2.movementY : xd;
    }});
    var Bd = rd(Ad);
    var Cd = m2({}, Ad, {dataTransfer: 0});
    var Dd = rd(Cd);
    var Ed = m2({}, ud, {relatedTarget: 0});
    var Fd = rd(Ed);
    var Gd = m2({}, sd, {animationName: 0, elapsedTime: 0, pseudoElement: 0});
    var Hd = rd(Gd);
    var Id = m2({}, sd, {clipboardData: function(a2) {
      return "clipboardData" in a2 ? a2.clipboardData : window.clipboardData;
    }});
    var Jd = rd(Id);
    var Kd = m2({}, sd, {data: 0});
    var Ld = rd(Kd);
    var Md = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    };
    var Nd = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    };
    var Od = {Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey"};
    function Pd(a2) {
      var b2 = this.nativeEvent;
      return b2.getModifierState ? b2.getModifierState(a2) : (a2 = Od[a2]) ? !!b2[a2] : false;
    }
    function zd() {
      return Pd;
    }
    var Qd = m2({}, ud, {key: function(a2) {
      if (a2.key) {
        var b2 = Md[a2.key] || a2.key;
        if (b2 !== "Unidentified")
          return b2;
      }
      return a2.type === "keypress" ? (a2 = od(a2), a2 === 13 ? "Enter" : String.fromCharCode(a2)) : a2.type === "keydown" || a2.type === "keyup" ? Nd[a2.keyCode] || "Unidentified" : "";
    }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a2) {
      return a2.type === "keypress" ? od(a2) : 0;
    }, keyCode: function(a2) {
      return a2.type === "keydown" || a2.type === "keyup" ? a2.keyCode : 0;
    }, which: function(a2) {
      return a2.type === "keypress" ? od(a2) : a2.type === "keydown" || a2.type === "keyup" ? a2.keyCode : 0;
    }});
    var Rd = rd(Qd);
    var Sd = m2({}, Ad, {pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0});
    var Td = rd(Sd);
    var Ud = m2({}, ud, {touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd});
    var Vd = rd(Ud);
    var Wd = m2({}, sd, {propertyName: 0, elapsedTime: 0, pseudoElement: 0});
    var Xd = rd(Wd);
    var Yd = m2({}, Ad, {
      deltaX: function(a2) {
        return "deltaX" in a2 ? a2.deltaX : "wheelDeltaX" in a2 ? -a2.wheelDeltaX : 0;
      },
      deltaY: function(a2) {
        return "deltaY" in a2 ? a2.deltaY : "wheelDeltaY" in a2 ? -a2.wheelDeltaY : "wheelDelta" in a2 ? -a2.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    });
    var Zd = rd(Yd);
    var $d = [9, 13, 27, 32];
    var ae = fa && "CompositionEvent" in window;
    var be = null;
    fa && "documentMode" in document && (be = document.documentMode);
    var ce = fa && "TextEvent" in window && !be;
    var de = fa && (!ae || be && 8 < be && 11 >= be);
    var ee = String.fromCharCode(32);
    var fe = false;
    function ge(a2, b2) {
      switch (a2) {
        case "keyup":
          return $d.indexOf(b2.keyCode) !== -1;
        case "keydown":
          return b2.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
          return true;
        default:
          return false;
      }
    }
    function he(a2) {
      a2 = a2.detail;
      return typeof a2 === "object" && "data" in a2 ? a2.data : null;
    }
    var ie = false;
    function je(a2, b2) {
      switch (a2) {
        case "compositionend":
          return he(b2);
        case "keypress":
          if (b2.which !== 32)
            return null;
          fe = true;
          return ee;
        case "textInput":
          return a2 = b2.data, a2 === ee && fe ? null : a2;
        default:
          return null;
      }
    }
    function ke(a2, b2) {
      if (ie)
        return a2 === "compositionend" || !ae && ge(a2, b2) ? (a2 = nd(), md = ld = kd = null, ie = false, a2) : null;
      switch (a2) {
        case "paste":
          return null;
        case "keypress":
          if (!(b2.ctrlKey || b2.altKey || b2.metaKey) || b2.ctrlKey && b2.altKey) {
            if (b2.char && 1 < b2.char.length)
              return b2.char;
            if (b2.which)
              return String.fromCharCode(b2.which);
          }
          return null;
        case "compositionend":
          return de && b2.locale !== "ko" ? null : b2.data;
        default:
          return null;
      }
    }
    var le = {color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true};
    function me(a2) {
      var b2 = a2 && a2.nodeName && a2.nodeName.toLowerCase();
      return b2 === "input" ? !!le[a2.type] : b2 === "textarea" ? true : false;
    }
    function ne(a2, b2, c2, d) {
      Eb(d);
      b2 = oe(b2, "onChange");
      0 < b2.length && (c2 = new td("onChange", "change", null, c2, d), a2.push({event: c2, listeners: b2}));
    }
    var pe = null;
    var qe = null;
    function re(a2) {
      se(a2, 0);
    }
    function te(a2) {
      var b2 = ue(a2);
      if (Wa(b2))
        return a2;
    }
    function ve(a2, b2) {
      if (a2 === "change")
        return b2;
    }
    var we = false;
    if (fa) {
      if (fa) {
        ye = "oninput" in document;
        if (!ye) {
          ze = document.createElement("div");
          ze.setAttribute("oninput", "return;");
          ye = typeof ze.oninput === "function";
        }
        xe = ye;
      } else
        xe = false;
      we = xe && (!document.documentMode || 9 < document.documentMode);
    }
    var xe;
    var ye;
    var ze;
    function Ae() {
      pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
    }
    function Be(a2) {
      if (a2.propertyName === "value" && te(qe)) {
        var b2 = [];
        ne(b2, qe, a2, xb(a2));
        a2 = re;
        if (Kb)
          a2(b2);
        else {
          Kb = true;
          try {
            Gb(a2, b2);
          } finally {
            Kb = false, Mb();
          }
        }
      }
    }
    function Ce(a2, b2, c2) {
      a2 === "focusin" ? (Ae(), pe = b2, qe = c2, pe.attachEvent("onpropertychange", Be)) : a2 === "focusout" && Ae();
    }
    function De(a2) {
      if (a2 === "selectionchange" || a2 === "keyup" || a2 === "keydown")
        return te(qe);
    }
    function Ee(a2, b2) {
      if (a2 === "click")
        return te(b2);
    }
    function Fe(a2, b2) {
      if (a2 === "input" || a2 === "change")
        return te(b2);
    }
    function Ge(a2, b2) {
      return a2 === b2 && (a2 !== 0 || 1 / a2 === 1 / b2) || a2 !== a2 && b2 !== b2;
    }
    var He = typeof Object.is === "function" ? Object.is : Ge;
    var Ie = Object.prototype.hasOwnProperty;
    function Je(a2, b2) {
      if (He(a2, b2))
        return true;
      if (typeof a2 !== "object" || a2 === null || typeof b2 !== "object" || b2 === null)
        return false;
      var c2 = Object.keys(a2), d = Object.keys(b2);
      if (c2.length !== d.length)
        return false;
      for (d = 0; d < c2.length; d++)
        if (!Ie.call(b2, c2[d]) || !He(a2[c2[d]], b2[c2[d]]))
          return false;
      return true;
    }
    function Ke(a2) {
      for (; a2 && a2.firstChild; )
        a2 = a2.firstChild;
      return a2;
    }
    function Le(a2, b2) {
      var c2 = Ke(a2);
      a2 = 0;
      for (var d; c2; ) {
        if (c2.nodeType === 3) {
          d = a2 + c2.textContent.length;
          if (a2 <= b2 && d >= b2)
            return {node: c2, offset: b2 - a2};
          a2 = d;
        }
        a: {
          for (; c2; ) {
            if (c2.nextSibling) {
              c2 = c2.nextSibling;
              break a;
            }
            c2 = c2.parentNode;
          }
          c2 = void 0;
        }
        c2 = Ke(c2);
      }
    }
    function Me(a2, b2) {
      return a2 && b2 ? a2 === b2 ? true : a2 && a2.nodeType === 3 ? false : b2 && b2.nodeType === 3 ? Me(a2, b2.parentNode) : "contains" in a2 ? a2.contains(b2) : a2.compareDocumentPosition ? !!(a2.compareDocumentPosition(b2) & 16) : false : false;
    }
    function Ne() {
      for (var a2 = window, b2 = Xa(); b2 instanceof a2.HTMLIFrameElement; ) {
        try {
          var c2 = typeof b2.contentWindow.location.href === "string";
        } catch (d) {
          c2 = false;
        }
        if (c2)
          a2 = b2.contentWindow;
        else
          break;
        b2 = Xa(a2.document);
      }
      return b2;
    }
    function Oe(a2) {
      var b2 = a2 && a2.nodeName && a2.nodeName.toLowerCase();
      return b2 && (b2 === "input" && (a2.type === "text" || a2.type === "search" || a2.type === "tel" || a2.type === "url" || a2.type === "password") || b2 === "textarea" || a2.contentEditable === "true");
    }
    var Pe = fa && "documentMode" in document && 11 >= document.documentMode;
    var Qe = null;
    var Re = null;
    var Se = null;
    var Te = false;
    function Ue(a2, b2, c2) {
      var d = c2.window === c2 ? c2.document : c2.nodeType === 9 ? c2 : c2.ownerDocument;
      Te || Qe == null || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Oe(d) ? d = {start: d.selectionStart, end: d.selectionEnd} : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = {anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset}), Se && Je(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b2 = new td("onSelect", "select", null, b2, c2), a2.push({event: b2, listeners: d}), b2.target = Qe)));
    }
    Pc("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "), 0);
    Pc("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "), 1);
    Pc(Oc, 2);
    for (var Ve = "change selectionchange textInput compositionstart compositionend compositionupdate".split(" "), We = 0; We < Ve.length; We++)
      Nc.set(Ve[We], 0);
    ea("onMouseEnter", ["mouseout", "mouseover"]);
    ea("onMouseLeave", ["mouseout", "mouseover"]);
    ea("onPointerEnter", ["pointerout", "pointerover"]);
    ea("onPointerLeave", ["pointerout", "pointerover"]);
    da("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
    da("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
    da("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
    da("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
    da("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
    da("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var Xe = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
    var Ye = new Set("cancel close invalid load scroll toggle".split(" ").concat(Xe));
    function Ze(a2, b2, c2) {
      var d = a2.type || "unknown-event";
      a2.currentTarget = c2;
      Yb(d, b2, void 0, a2);
      a2.currentTarget = null;
    }
    function se(a2, b2) {
      b2 = (b2 & 4) !== 0;
      for (var c2 = 0; c2 < a2.length; c2++) {
        var d = a2[c2], e = d.event;
        d = d.listeners;
        a: {
          var f = void 0;
          if (b2)
            for (var g = d.length - 1; 0 <= g; g--) {
              var h = d[g], k = h.instance, l = h.currentTarget;
              h = h.listener;
              if (k !== f && e.isPropagationStopped())
                break a;
              Ze(e, h, l);
              f = k;
            }
          else
            for (g = 0; g < d.length; g++) {
              h = d[g];
              k = h.instance;
              l = h.currentTarget;
              h = h.listener;
              if (k !== f && e.isPropagationStopped())
                break a;
              Ze(e, h, l);
              f = k;
            }
        }
      }
      if (Ub)
        throw a2 = Vb, Ub = false, Vb = null, a2;
    }
    function G(a2, b2) {
      var c2 = $e(b2), d = a2 + "__bubble";
      c2.has(d) || (af(b2, a2, 2, false), c2.add(d));
    }
    var bf = "_reactListening" + Math.random().toString(36).slice(2);
    function cf(a2) {
      a2[bf] || (a2[bf] = true, ba.forEach(function(b2) {
        Ye.has(b2) || df(b2, false, a2, null);
        df(b2, true, a2, null);
      }));
    }
    function df(a2, b2, c2, d) {
      var e = 4 < arguments.length && arguments[4] !== void 0 ? arguments[4] : 0, f = c2;
      a2 === "selectionchange" && c2.nodeType !== 9 && (f = c2.ownerDocument);
      if (d !== null && !b2 && Ye.has(a2)) {
        if (a2 !== "scroll")
          return;
        e |= 2;
        f = d;
      }
      var g = $e(f), h = a2 + "__" + (b2 ? "capture" : "bubble");
      g.has(h) || (b2 && (e |= 4), af(f, a2, e, b2), g.add(h));
    }
    function af(a2, b2, c2, d) {
      var e = Nc.get(b2);
      switch (e === void 0 ? 2 : e) {
        case 0:
          e = gd;
          break;
        case 1:
          e = id;
          break;
        default:
          e = hd;
      }
      c2 = e.bind(null, b2, c2, a2);
      e = void 0;
      !Pb || b2 !== "touchstart" && b2 !== "touchmove" && b2 !== "wheel" || (e = true);
      d ? e !== void 0 ? a2.addEventListener(b2, c2, {capture: true, passive: e}) : a2.addEventListener(b2, c2, true) : e !== void 0 ? a2.addEventListener(b2, c2, {passive: e}) : a2.addEventListener(b2, c2, false);
    }
    function jd(a2, b2, c2, d, e) {
      var f = d;
      if ((b2 & 1) === 0 && (b2 & 2) === 0 && d !== null)
        a:
          for (; ; ) {
            if (d === null)
              return;
            var g = d.tag;
            if (g === 3 || g === 4) {
              var h = d.stateNode.containerInfo;
              if (h === e || h.nodeType === 8 && h.parentNode === e)
                break;
              if (g === 4)
                for (g = d.return; g !== null; ) {
                  var k = g.tag;
                  if (k === 3 || k === 4) {
                    if (k = g.stateNode.containerInfo, k === e || k.nodeType === 8 && k.parentNode === e)
                      return;
                  }
                  g = g.return;
                }
              for (; h !== null; ) {
                g = wc(h);
                if (g === null)
                  return;
                k = g.tag;
                if (k === 5 || k === 6) {
                  d = f = g;
                  continue a;
                }
                h = h.parentNode;
              }
            }
            d = d.return;
          }
      Nb(function() {
        var d2 = f, e2 = xb(c2), g2 = [];
        a: {
          var h2 = Mc.get(a2);
          if (h2 !== void 0) {
            var k2 = td, x = a2;
            switch (a2) {
              case "keypress":
                if (od(c2) === 0)
                  break a;
              case "keydown":
              case "keyup":
                k2 = Rd;
                break;
              case "focusin":
                x = "focus";
                k2 = Fd;
                break;
              case "focusout":
                x = "blur";
                k2 = Fd;
                break;
              case "beforeblur":
              case "afterblur":
                k2 = Fd;
                break;
              case "click":
                if (c2.button === 2)
                  break a;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                k2 = Bd;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                k2 = Dd;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                k2 = Vd;
                break;
              case Ic:
              case Jc:
              case Kc:
                k2 = Hd;
                break;
              case Lc:
                k2 = Xd;
                break;
              case "scroll":
                k2 = vd;
                break;
              case "wheel":
                k2 = Zd;
                break;
              case "copy":
              case "cut":
              case "paste":
                k2 = Jd;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                k2 = Td;
            }
            var w = (b2 & 4) !== 0, z = !w && a2 === "scroll", u = w ? h2 !== null ? h2 + "Capture" : null : h2;
            w = [];
            for (var t = d2, q; t !== null; ) {
              q = t;
              var v = q.stateNode;
              q.tag === 5 && v !== null && (q = v, u !== null && (v = Ob(t, u), v != null && w.push(ef(t, v, q))));
              if (z)
                break;
              t = t.return;
            }
            0 < w.length && (h2 = new k2(h2, x, null, c2, e2), g2.push({event: h2, listeners: w}));
          }
        }
        if ((b2 & 7) === 0) {
          a: {
            h2 = a2 === "mouseover" || a2 === "pointerover";
            k2 = a2 === "mouseout" || a2 === "pointerout";
            if (h2 && (b2 & 16) === 0 && (x = c2.relatedTarget || c2.fromElement) && (wc(x) || x[ff]))
              break a;
            if (k2 || h2) {
              h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
              if (k2) {
                if (x = c2.relatedTarget || c2.toElement, k2 = d2, x = x ? wc(x) : null, x !== null && (z = Zb(x), x !== z || x.tag !== 5 && x.tag !== 6))
                  x = null;
              } else
                k2 = null, x = d2;
              if (k2 !== x) {
                w = Bd;
                v = "onMouseLeave";
                u = "onMouseEnter";
                t = "mouse";
                if (a2 === "pointerout" || a2 === "pointerover")
                  w = Td, v = "onPointerLeave", u = "onPointerEnter", t = "pointer";
                z = k2 == null ? h2 : ue(k2);
                q = x == null ? h2 : ue(x);
                h2 = new w(v, t + "leave", k2, c2, e2);
                h2.target = z;
                h2.relatedTarget = q;
                v = null;
                wc(e2) === d2 && (w = new w(u, t + "enter", x, c2, e2), w.target = q, w.relatedTarget = z, v = w);
                z = v;
                if (k2 && x)
                  b: {
                    w = k2;
                    u = x;
                    t = 0;
                    for (q = w; q; q = gf(q))
                      t++;
                    q = 0;
                    for (v = u; v; v = gf(v))
                      q++;
                    for (; 0 < t - q; )
                      w = gf(w), t--;
                    for (; 0 < q - t; )
                      u = gf(u), q--;
                    for (; t--; ) {
                      if (w === u || u !== null && w === u.alternate)
                        break b;
                      w = gf(w);
                      u = gf(u);
                    }
                    w = null;
                  }
                else
                  w = null;
                k2 !== null && hf(g2, h2, k2, w, false);
                x !== null && z !== null && hf(g2, z, x, w, true);
              }
            }
          }
          a: {
            h2 = d2 ? ue(d2) : window;
            k2 = h2.nodeName && h2.nodeName.toLowerCase();
            if (k2 === "select" || k2 === "input" && h2.type === "file")
              var J = ve;
            else if (me(h2))
              if (we)
                J = Fe;
              else {
                J = De;
                var K = Ce;
              }
            else
              (k2 = h2.nodeName) && k2.toLowerCase() === "input" && (h2.type === "checkbox" || h2.type === "radio") && (J = Ee);
            if (J && (J = J(a2, d2))) {
              ne(g2, J, c2, e2);
              break a;
            }
            K && K(a2, h2, d2);
            a2 === "focusout" && (K = h2._wrapperState) && K.controlled && h2.type === "number" && bb(h2, "number", h2.value);
          }
          K = d2 ? ue(d2) : window;
          switch (a2) {
            case "focusin":
              if (me(K) || K.contentEditable === "true")
                Qe = K, Re = d2, Se = null;
              break;
            case "focusout":
              Se = Re = Qe = null;
              break;
            case "mousedown":
              Te = true;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              Te = false;
              Ue(g2, c2, e2);
              break;
            case "selectionchange":
              if (Pe)
                break;
            case "keydown":
            case "keyup":
              Ue(g2, c2, e2);
          }
          var Q;
          if (ae)
            b: {
              switch (a2) {
                case "compositionstart":
                  var L = "onCompositionStart";
                  break b;
                case "compositionend":
                  L = "onCompositionEnd";
                  break b;
                case "compositionupdate":
                  L = "onCompositionUpdate";
                  break b;
              }
              L = void 0;
            }
          else
            ie ? ge(a2, c2) && (L = "onCompositionEnd") : a2 === "keydown" && c2.keyCode === 229 && (L = "onCompositionStart");
          L && (de && c2.locale !== "ko" && (ie || L !== "onCompositionStart" ? L === "onCompositionEnd" && ie && (Q = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), K = oe(d2, L), 0 < K.length && (L = new Ld(L, a2, null, c2, e2), g2.push({event: L, listeners: K}), Q ? L.data = Q : (Q = he(c2), Q !== null && (L.data = Q))));
          if (Q = ce ? je(a2, c2) : ke(a2, c2))
            d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c2, e2), g2.push({event: e2, listeners: d2}), e2.data = Q);
        }
        se(g2, b2);
      });
    }
    function ef(a2, b2, c2) {
      return {instance: a2, listener: b2, currentTarget: c2};
    }
    function oe(a2, b2) {
      for (var c2 = b2 + "Capture", d = []; a2 !== null; ) {
        var e = a2, f = e.stateNode;
        e.tag === 5 && f !== null && (e = f, f = Ob(a2, c2), f != null && d.unshift(ef(a2, f, e)), f = Ob(a2, b2), f != null && d.push(ef(a2, f, e)));
        a2 = a2.return;
      }
      return d;
    }
    function gf(a2) {
      if (a2 === null)
        return null;
      do
        a2 = a2.return;
      while (a2 && a2.tag !== 5);
      return a2 ? a2 : null;
    }
    function hf(a2, b2, c2, d, e) {
      for (var f = b2._reactName, g = []; c2 !== null && c2 !== d; ) {
        var h = c2, k = h.alternate, l = h.stateNode;
        if (k !== null && k === d)
          break;
        h.tag === 5 && l !== null && (h = l, e ? (k = Ob(c2, f), k != null && g.unshift(ef(c2, k, h))) : e || (k = Ob(c2, f), k != null && g.push(ef(c2, k, h))));
        c2 = c2.return;
      }
      g.length !== 0 && a2.push({event: b2, listeners: g});
    }
    function jf() {
    }
    var kf = null;
    var lf = null;
    function mf(a2, b2) {
      switch (a2) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!b2.autoFocus;
      }
      return false;
    }
    function nf(a2, b2) {
      return a2 === "textarea" || a2 === "option" || a2 === "noscript" || typeof b2.children === "string" || typeof b2.children === "number" || typeof b2.dangerouslySetInnerHTML === "object" && b2.dangerouslySetInnerHTML !== null && b2.dangerouslySetInnerHTML.__html != null;
    }
    var of = typeof setTimeout === "function" ? setTimeout : void 0;
    var pf = typeof clearTimeout === "function" ? clearTimeout : void 0;
    function qf(a2) {
      a2.nodeType === 1 ? a2.textContent = "" : a2.nodeType === 9 && (a2 = a2.body, a2 != null && (a2.textContent = ""));
    }
    function rf(a2) {
      for (; a2 != null; a2 = a2.nextSibling) {
        var b2 = a2.nodeType;
        if (b2 === 1 || b2 === 3)
          break;
      }
      return a2;
    }
    function sf(a2) {
      a2 = a2.previousSibling;
      for (var b2 = 0; a2; ) {
        if (a2.nodeType === 8) {
          var c2 = a2.data;
          if (c2 === "$" || c2 === "$!" || c2 === "$?") {
            if (b2 === 0)
              return a2;
            b2--;
          } else
            c2 === "/$" && b2++;
        }
        a2 = a2.previousSibling;
      }
      return null;
    }
    var tf = 0;
    function uf(a2) {
      return {$$typeof: Ga, toString: a2, valueOf: a2};
    }
    var vf = Math.random().toString(36).slice(2);
    var wf = "__reactFiber$" + vf;
    var xf = "__reactProps$" + vf;
    var ff = "__reactContainer$" + vf;
    var yf = "__reactEvents$" + vf;
    function wc(a2) {
      var b2 = a2[wf];
      if (b2)
        return b2;
      for (var c2 = a2.parentNode; c2; ) {
        if (b2 = c2[ff] || c2[wf]) {
          c2 = b2.alternate;
          if (b2.child !== null || c2 !== null && c2.child !== null)
            for (a2 = sf(a2); a2 !== null; ) {
              if (c2 = a2[wf])
                return c2;
              a2 = sf(a2);
            }
          return b2;
        }
        a2 = c2;
        c2 = a2.parentNode;
      }
      return null;
    }
    function Cb(a2) {
      a2 = a2[wf] || a2[ff];
      return !a2 || a2.tag !== 5 && a2.tag !== 6 && a2.tag !== 13 && a2.tag !== 3 ? null : a2;
    }
    function ue(a2) {
      if (a2.tag === 5 || a2.tag === 6)
        return a2.stateNode;
      throw Error(y(33));
    }
    function Db(a2) {
      return a2[xf] || null;
    }
    function $e(a2) {
      var b2 = a2[yf];
      b2 === void 0 && (b2 = a2[yf] = new Set());
      return b2;
    }
    var zf = [];
    var Af = -1;
    function Bf(a2) {
      return {current: a2};
    }
    function H(a2) {
      0 > Af || (a2.current = zf[Af], zf[Af] = null, Af--);
    }
    function I(a2, b2) {
      Af++;
      zf[Af] = a2.current;
      a2.current = b2;
    }
    var Cf = {};
    var M = Bf(Cf);
    var N = Bf(false);
    var Df = Cf;
    function Ef(a2, b2) {
      var c2 = a2.type.contextTypes;
      if (!c2)
        return Cf;
      var d = a2.stateNode;
      if (d && d.__reactInternalMemoizedUnmaskedChildContext === b2)
        return d.__reactInternalMemoizedMaskedChildContext;
      var e = {}, f;
      for (f in c2)
        e[f] = b2[f];
      d && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = b2, a2.__reactInternalMemoizedMaskedChildContext = e);
      return e;
    }
    function Ff(a2) {
      a2 = a2.childContextTypes;
      return a2 !== null && a2 !== void 0;
    }
    function Gf() {
      H(N);
      H(M);
    }
    function Hf(a2, b2, c2) {
      if (M.current !== Cf)
        throw Error(y(168));
      I(M, b2);
      I(N, c2);
    }
    function If(a2, b2, c2) {
      var d = a2.stateNode;
      a2 = b2.childContextTypes;
      if (typeof d.getChildContext !== "function")
        return c2;
      d = d.getChildContext();
      for (var e in d)
        if (!(e in a2))
          throw Error(y(108, Ra(b2) || "Unknown", e));
      return m2({}, c2, d);
    }
    function Jf(a2) {
      a2 = (a2 = a2.stateNode) && a2.__reactInternalMemoizedMergedChildContext || Cf;
      Df = M.current;
      I(M, a2);
      I(N, N.current);
      return true;
    }
    function Kf(a2, b2, c2) {
      var d = a2.stateNode;
      if (!d)
        throw Error(y(169));
      c2 ? (a2 = If(a2, b2, Df), d.__reactInternalMemoizedMergedChildContext = a2, H(N), H(M), I(M, a2)) : H(N);
      I(N, c2);
    }
    var Lf = null;
    var Mf = null;
    var Nf = r.unstable_runWithPriority;
    var Of = r.unstable_scheduleCallback;
    var Pf = r.unstable_cancelCallback;
    var Qf = r.unstable_shouldYield;
    var Rf = r.unstable_requestPaint;
    var Sf = r.unstable_now;
    var Tf = r.unstable_getCurrentPriorityLevel;
    var Uf = r.unstable_ImmediatePriority;
    var Vf = r.unstable_UserBlockingPriority;
    var Wf = r.unstable_NormalPriority;
    var Xf = r.unstable_LowPriority;
    var Yf = r.unstable_IdlePriority;
    var Zf = {};
    var $f = Rf !== void 0 ? Rf : function() {
    };
    var ag = null;
    var bg = null;
    var cg = false;
    var dg = Sf();
    var O = 1e4 > dg ? Sf : function() {
      return Sf() - dg;
    };
    function eg() {
      switch (Tf()) {
        case Uf:
          return 99;
        case Vf:
          return 98;
        case Wf:
          return 97;
        case Xf:
          return 96;
        case Yf:
          return 95;
        default:
          throw Error(y(332));
      }
    }
    function fg(a2) {
      switch (a2) {
        case 99:
          return Uf;
        case 98:
          return Vf;
        case 97:
          return Wf;
        case 96:
          return Xf;
        case 95:
          return Yf;
        default:
          throw Error(y(332));
      }
    }
    function gg(a2, b2) {
      a2 = fg(a2);
      return Nf(a2, b2);
    }
    function hg(a2, b2, c2) {
      a2 = fg(a2);
      return Of(a2, b2, c2);
    }
    function ig() {
      if (bg !== null) {
        var a2 = bg;
        bg = null;
        Pf(a2);
      }
      jg();
    }
    function jg() {
      if (!cg && ag !== null) {
        cg = true;
        var a2 = 0;
        try {
          var b2 = ag;
          gg(99, function() {
            for (; a2 < b2.length; a2++) {
              var c2 = b2[a2];
              do
                c2 = c2(true);
              while (c2 !== null);
            }
          });
          ag = null;
        } catch (c2) {
          throw ag !== null && (ag = ag.slice(a2 + 1)), Of(Uf, ig), c2;
        } finally {
          cg = false;
        }
      }
    }
    var kg = ra.ReactCurrentBatchConfig;
    function lg(a2, b2) {
      if (a2 && a2.defaultProps) {
        b2 = m2({}, b2);
        a2 = a2.defaultProps;
        for (var c2 in a2)
          b2[c2] === void 0 && (b2[c2] = a2[c2]);
        return b2;
      }
      return b2;
    }
    var mg = Bf(null);
    var ng = null;
    var og = null;
    var pg = null;
    function qg() {
      pg = og = ng = null;
    }
    function rg(a2) {
      var b2 = mg.current;
      H(mg);
      a2.type._context._currentValue = b2;
    }
    function sg(a2, b2) {
      for (; a2 !== null; ) {
        var c2 = a2.alternate;
        if ((a2.childLanes & b2) === b2)
          if (c2 === null || (c2.childLanes & b2) === b2)
            break;
          else
            c2.childLanes |= b2;
        else
          a2.childLanes |= b2, c2 !== null && (c2.childLanes |= b2);
        a2 = a2.return;
      }
    }
    function tg(a2, b2) {
      ng = a2;
      pg = og = null;
      a2 = a2.dependencies;
      a2 !== null && a2.firstContext !== null && ((a2.lanes & b2) !== 0 && (ug = true), a2.firstContext = null);
    }
    function vg(a2, b2) {
      if (pg !== a2 && b2 !== false && b2 !== 0) {
        if (typeof b2 !== "number" || b2 === 1073741823)
          pg = a2, b2 = 1073741823;
        b2 = {context: a2, observedBits: b2, next: null};
        if (og === null) {
          if (ng === null)
            throw Error(y(308));
          og = b2;
          ng.dependencies = {lanes: 0, firstContext: b2, responders: null};
        } else
          og = og.next = b2;
      }
      return a2._currentValue;
    }
    var wg = false;
    function xg(a2) {
      a2.updateQueue = {baseState: a2.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: {pending: null}, effects: null};
    }
    function yg(a2, b2) {
      a2 = a2.updateQueue;
      b2.updateQueue === a2 && (b2.updateQueue = {baseState: a2.baseState, firstBaseUpdate: a2.firstBaseUpdate, lastBaseUpdate: a2.lastBaseUpdate, shared: a2.shared, effects: a2.effects});
    }
    function zg(a2, b2) {
      return {eventTime: a2, lane: b2, tag: 0, payload: null, callback: null, next: null};
    }
    function Ag(a2, b2) {
      a2 = a2.updateQueue;
      if (a2 !== null) {
        a2 = a2.shared;
        var c2 = a2.pending;
        c2 === null ? b2.next = b2 : (b2.next = c2.next, c2.next = b2);
        a2.pending = b2;
      }
    }
    function Bg(a2, b2) {
      var c2 = a2.updateQueue, d = a2.alternate;
      if (d !== null && (d = d.updateQueue, c2 === d)) {
        var e = null, f = null;
        c2 = c2.firstBaseUpdate;
        if (c2 !== null) {
          do {
            var g = {eventTime: c2.eventTime, lane: c2.lane, tag: c2.tag, payload: c2.payload, callback: c2.callback, next: null};
            f === null ? e = f = g : f = f.next = g;
            c2 = c2.next;
          } while (c2 !== null);
          f === null ? e = f = b2 : f = f.next = b2;
        } else
          e = f = b2;
        c2 = {baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects};
        a2.updateQueue = c2;
        return;
      }
      a2 = c2.lastBaseUpdate;
      a2 === null ? c2.firstBaseUpdate = b2 : a2.next = b2;
      c2.lastBaseUpdate = b2;
    }
    function Cg(a2, b2, c2, d) {
      var e = a2.updateQueue;
      wg = false;
      var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
      if (h !== null) {
        e.shared.pending = null;
        var k = h, l = k.next;
        k.next = null;
        g === null ? f = l : g.next = l;
        g = k;
        var n = a2.alternate;
        if (n !== null) {
          n = n.updateQueue;
          var A = n.lastBaseUpdate;
          A !== g && (A === null ? n.firstBaseUpdate = l : A.next = l, n.lastBaseUpdate = k);
        }
      }
      if (f !== null) {
        A = e.baseState;
        g = 0;
        n = l = k = null;
        do {
          h = f.lane;
          var p = f.eventTime;
          if ((d & h) === h) {
            n !== null && (n = n.next = {
              eventTime: p,
              lane: 0,
              tag: f.tag,
              payload: f.payload,
              callback: f.callback,
              next: null
            });
            a: {
              var C = a2, x = f;
              h = b2;
              p = c2;
              switch (x.tag) {
                case 1:
                  C = x.payload;
                  if (typeof C === "function") {
                    A = C.call(p, A, h);
                    break a;
                  }
                  A = C;
                  break a;
                case 3:
                  C.flags = C.flags & -4097 | 64;
                case 0:
                  C = x.payload;
                  h = typeof C === "function" ? C.call(p, A, h) : C;
                  if (h === null || h === void 0)
                    break a;
                  A = m2({}, A, h);
                  break a;
                case 2:
                  wg = true;
              }
            }
            f.callback !== null && (a2.flags |= 32, h = e.effects, h === null ? e.effects = [f] : h.push(f));
          } else
            p = {eventTime: p, lane: h, tag: f.tag, payload: f.payload, callback: f.callback, next: null}, n === null ? (l = n = p, k = A) : n = n.next = p, g |= h;
          f = f.next;
          if (f === null)
            if (h = e.shared.pending, h === null)
              break;
            else
              f = h.next, h.next = null, e.lastBaseUpdate = h, e.shared.pending = null;
        } while (1);
        n === null && (k = A);
        e.baseState = k;
        e.firstBaseUpdate = l;
        e.lastBaseUpdate = n;
        Dg |= g;
        a2.lanes = g;
        a2.memoizedState = A;
      }
    }
    function Eg(a2, b2, c2) {
      a2 = b2.effects;
      b2.effects = null;
      if (a2 !== null)
        for (b2 = 0; b2 < a2.length; b2++) {
          var d = a2[b2], e = d.callback;
          if (e !== null) {
            d.callback = null;
            d = c2;
            if (typeof e !== "function")
              throw Error(y(191, e));
            e.call(d);
          }
        }
    }
    var Fg = new aa.Component().refs;
    function Gg(a2, b2, c2, d) {
      b2 = a2.memoizedState;
      c2 = c2(d, b2);
      c2 = c2 === null || c2 === void 0 ? b2 : m2({}, b2, c2);
      a2.memoizedState = c2;
      a2.lanes === 0 && (a2.updateQueue.baseState = c2);
    }
    var Kg = {isMounted: function(a2) {
      return (a2 = a2._reactInternals) ? Zb(a2) === a2 : false;
    }, enqueueSetState: function(a2, b2, c2) {
      a2 = a2._reactInternals;
      var d = Hg(), e = Ig(a2), f = zg(d, e);
      f.payload = b2;
      c2 !== void 0 && c2 !== null && (f.callback = c2);
      Ag(a2, f);
      Jg(a2, e, d);
    }, enqueueReplaceState: function(a2, b2, c2) {
      a2 = a2._reactInternals;
      var d = Hg(), e = Ig(a2), f = zg(d, e);
      f.tag = 1;
      f.payload = b2;
      c2 !== void 0 && c2 !== null && (f.callback = c2);
      Ag(a2, f);
      Jg(a2, e, d);
    }, enqueueForceUpdate: function(a2, b2) {
      a2 = a2._reactInternals;
      var c2 = Hg(), d = Ig(a2), e = zg(c2, d);
      e.tag = 2;
      b2 !== void 0 && b2 !== null && (e.callback = b2);
      Ag(a2, e);
      Jg(a2, d, c2);
    }};
    function Lg(a2, b2, c2, d, e, f, g) {
      a2 = a2.stateNode;
      return typeof a2.shouldComponentUpdate === "function" ? a2.shouldComponentUpdate(d, f, g) : b2.prototype && b2.prototype.isPureReactComponent ? !Je(c2, d) || !Je(e, f) : true;
    }
    function Mg(a2, b2, c2) {
      var d = false, e = Cf;
      var f = b2.contextType;
      typeof f === "object" && f !== null ? f = vg(f) : (e = Ff(b2) ? Df : M.current, d = b2.contextTypes, f = (d = d !== null && d !== void 0) ? Ef(a2, e) : Cf);
      b2 = new b2(c2, f);
      a2.memoizedState = b2.state !== null && b2.state !== void 0 ? b2.state : null;
      b2.updater = Kg;
      a2.stateNode = b2;
      b2._reactInternals = a2;
      d && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = e, a2.__reactInternalMemoizedMaskedChildContext = f);
      return b2;
    }
    function Ng(a2, b2, c2, d) {
      a2 = b2.state;
      typeof b2.componentWillReceiveProps === "function" && b2.componentWillReceiveProps(c2, d);
      typeof b2.UNSAFE_componentWillReceiveProps === "function" && b2.UNSAFE_componentWillReceiveProps(c2, d);
      b2.state !== a2 && Kg.enqueueReplaceState(b2, b2.state, null);
    }
    function Og(a2, b2, c2, d) {
      var e = a2.stateNode;
      e.props = c2;
      e.state = a2.memoizedState;
      e.refs = Fg;
      xg(a2);
      var f = b2.contextType;
      typeof f === "object" && f !== null ? e.context = vg(f) : (f = Ff(b2) ? Df : M.current, e.context = Ef(a2, f));
      Cg(a2, c2, e, d);
      e.state = a2.memoizedState;
      f = b2.getDerivedStateFromProps;
      typeof f === "function" && (Gg(a2, b2, f, c2), e.state = a2.memoizedState);
      typeof b2.getDerivedStateFromProps === "function" || typeof e.getSnapshotBeforeUpdate === "function" || typeof e.UNSAFE_componentWillMount !== "function" && typeof e.componentWillMount !== "function" || (b2 = e.state, typeof e.componentWillMount === "function" && e.componentWillMount(), typeof e.UNSAFE_componentWillMount === "function" && e.UNSAFE_componentWillMount(), b2 !== e.state && Kg.enqueueReplaceState(e, e.state, null), Cg(a2, c2, e, d), e.state = a2.memoizedState);
      typeof e.componentDidMount === "function" && (a2.flags |= 4);
    }
    var Pg = Array.isArray;
    function Qg(a2, b2, c2) {
      a2 = c2.ref;
      if (a2 !== null && typeof a2 !== "function" && typeof a2 !== "object") {
        if (c2._owner) {
          c2 = c2._owner;
          if (c2) {
            if (c2.tag !== 1)
              throw Error(y(309));
            var d = c2.stateNode;
          }
          if (!d)
            throw Error(y(147, a2));
          var e = "" + a2;
          if (b2 !== null && b2.ref !== null && typeof b2.ref === "function" && b2.ref._stringRef === e)
            return b2.ref;
          b2 = function(a3) {
            var b3 = d.refs;
            b3 === Fg && (b3 = d.refs = {});
            a3 === null ? delete b3[e] : b3[e] = a3;
          };
          b2._stringRef = e;
          return b2;
        }
        if (typeof a2 !== "string")
          throw Error(y(284));
        if (!c2._owner)
          throw Error(y(290, a2));
      }
      return a2;
    }
    function Rg(a2, b2) {
      if (a2.type !== "textarea")
        throw Error(y(31, Object.prototype.toString.call(b2) === "[object Object]" ? "object with keys {" + Object.keys(b2).join(", ") + "}" : b2));
    }
    function Sg(a2) {
      function b2(b3, c3) {
        if (a2) {
          var d2 = b3.lastEffect;
          d2 !== null ? (d2.nextEffect = c3, b3.lastEffect = c3) : b3.firstEffect = b3.lastEffect = c3;
          c3.nextEffect = null;
          c3.flags = 8;
        }
      }
      function c2(c3, d2) {
        if (!a2)
          return null;
        for (; d2 !== null; )
          b2(c3, d2), d2 = d2.sibling;
        return null;
      }
      function d(a3, b3) {
        for (a3 = new Map(); b3 !== null; )
          b3.key !== null ? a3.set(b3.key, b3) : a3.set(b3.index, b3), b3 = b3.sibling;
        return a3;
      }
      function e(a3, b3) {
        a3 = Tg(a3, b3);
        a3.index = 0;
        a3.sibling = null;
        return a3;
      }
      function f(b3, c3, d2) {
        b3.index = d2;
        if (!a2)
          return c3;
        d2 = b3.alternate;
        if (d2 !== null)
          return d2 = d2.index, d2 < c3 ? (b3.flags = 2, c3) : d2;
        b3.flags = 2;
        return c3;
      }
      function g(b3) {
        a2 && b3.alternate === null && (b3.flags = 2);
        return b3;
      }
      function h(a3, b3, c3, d2) {
        if (b3 === null || b3.tag !== 6)
          return b3 = Ug(c3, a3.mode, d2), b3.return = a3, b3;
        b3 = e(b3, c3);
        b3.return = a3;
        return b3;
      }
      function k(a3, b3, c3, d2) {
        if (b3 !== null && b3.elementType === c3.type)
          return d2 = e(b3, c3.props), d2.ref = Qg(a3, b3, c3), d2.return = a3, d2;
        d2 = Vg(c3.type, c3.key, c3.props, null, a3.mode, d2);
        d2.ref = Qg(a3, b3, c3);
        d2.return = a3;
        return d2;
      }
      function l(a3, b3, c3, d2) {
        if (b3 === null || b3.tag !== 4 || b3.stateNode.containerInfo !== c3.containerInfo || b3.stateNode.implementation !== c3.implementation)
          return b3 = Wg(c3, a3.mode, d2), b3.return = a3, b3;
        b3 = e(b3, c3.children || []);
        b3.return = a3;
        return b3;
      }
      function n(a3, b3, c3, d2, f2) {
        if (b3 === null || b3.tag !== 7)
          return b3 = Xg(c3, a3.mode, d2, f2), b3.return = a3, b3;
        b3 = e(b3, c3);
        b3.return = a3;
        return b3;
      }
      function A(a3, b3, c3) {
        if (typeof b3 === "string" || typeof b3 === "number")
          return b3 = Ug("" + b3, a3.mode, c3), b3.return = a3, b3;
        if (typeof b3 === "object" && b3 !== null) {
          switch (b3.$$typeof) {
            case sa:
              return c3 = Vg(b3.type, b3.key, b3.props, null, a3.mode, c3), c3.ref = Qg(a3, null, b3), c3.return = a3, c3;
            case ta:
              return b3 = Wg(b3, a3.mode, c3), b3.return = a3, b3;
          }
          if (Pg(b3) || La(b3))
            return b3 = Xg(b3, a3.mode, c3, null), b3.return = a3, b3;
          Rg(a3, b3);
        }
        return null;
      }
      function p(a3, b3, c3, d2) {
        var e2 = b3 !== null ? b3.key : null;
        if (typeof c3 === "string" || typeof c3 === "number")
          return e2 !== null ? null : h(a3, b3, "" + c3, d2);
        if (typeof c3 === "object" && c3 !== null) {
          switch (c3.$$typeof) {
            case sa:
              return c3.key === e2 ? c3.type === ua ? n(a3, b3, c3.props.children, d2, e2) : k(a3, b3, c3, d2) : null;
            case ta:
              return c3.key === e2 ? l(a3, b3, c3, d2) : null;
          }
          if (Pg(c3) || La(c3))
            return e2 !== null ? null : n(a3, b3, c3, d2, null);
          Rg(a3, c3);
        }
        return null;
      }
      function C(a3, b3, c3, d2, e2) {
        if (typeof d2 === "string" || typeof d2 === "number")
          return a3 = a3.get(c3) || null, h(b3, a3, "" + d2, e2);
        if (typeof d2 === "object" && d2 !== null) {
          switch (d2.$$typeof) {
            case sa:
              return a3 = a3.get(d2.key === null ? c3 : d2.key) || null, d2.type === ua ? n(b3, a3, d2.props.children, e2, d2.key) : k(b3, a3, d2, e2);
            case ta:
              return a3 = a3.get(d2.key === null ? c3 : d2.key) || null, l(b3, a3, d2, e2);
          }
          if (Pg(d2) || La(d2))
            return a3 = a3.get(c3) || null, n(b3, a3, d2, e2, null);
          Rg(b3, d2);
        }
        return null;
      }
      function x(e2, g2, h2, k2) {
        for (var l2 = null, t = null, u = g2, z = g2 = 0, q = null; u !== null && z < h2.length; z++) {
          u.index > z ? (q = u, u = null) : q = u.sibling;
          var n2 = p(e2, u, h2[z], k2);
          if (n2 === null) {
            u === null && (u = q);
            break;
          }
          a2 && u && n2.alternate === null && b2(e2, u);
          g2 = f(n2, g2, z);
          t === null ? l2 = n2 : t.sibling = n2;
          t = n2;
          u = q;
        }
        if (z === h2.length)
          return c2(e2, u), l2;
        if (u === null) {
          for (; z < h2.length; z++)
            u = A(e2, h2[z], k2), u !== null && (g2 = f(u, g2, z), t === null ? l2 = u : t.sibling = u, t = u);
          return l2;
        }
        for (u = d(e2, u); z < h2.length; z++)
          q = C(u, e2, z, h2[z], k2), q !== null && (a2 && q.alternate !== null && u.delete(q.key === null ? z : q.key), g2 = f(q, g2, z), t === null ? l2 = q : t.sibling = q, t = q);
        a2 && u.forEach(function(a3) {
          return b2(e2, a3);
        });
        return l2;
      }
      function w(e2, g2, h2, k2) {
        var l2 = La(h2);
        if (typeof l2 !== "function")
          throw Error(y(150));
        h2 = l2.call(h2);
        if (h2 == null)
          throw Error(y(151));
        for (var t = l2 = null, u = g2, z = g2 = 0, q = null, n2 = h2.next(); u !== null && !n2.done; z++, n2 = h2.next()) {
          u.index > z ? (q = u, u = null) : q = u.sibling;
          var w2 = p(e2, u, n2.value, k2);
          if (w2 === null) {
            u === null && (u = q);
            break;
          }
          a2 && u && w2.alternate === null && b2(e2, u);
          g2 = f(w2, g2, z);
          t === null ? l2 = w2 : t.sibling = w2;
          t = w2;
          u = q;
        }
        if (n2.done)
          return c2(e2, u), l2;
        if (u === null) {
          for (; !n2.done; z++, n2 = h2.next())
            n2 = A(e2, n2.value, k2), n2 !== null && (g2 = f(n2, g2, z), t === null ? l2 = n2 : t.sibling = n2, t = n2);
          return l2;
        }
        for (u = d(e2, u); !n2.done; z++, n2 = h2.next())
          n2 = C(u, e2, z, n2.value, k2), n2 !== null && (a2 && n2.alternate !== null && u.delete(n2.key === null ? z : n2.key), g2 = f(n2, g2, z), t === null ? l2 = n2 : t.sibling = n2, t = n2);
        a2 && u.forEach(function(a3) {
          return b2(e2, a3);
        });
        return l2;
      }
      return function(a3, d2, f2, h2) {
        var k2 = typeof f2 === "object" && f2 !== null && f2.type === ua && f2.key === null;
        k2 && (f2 = f2.props.children);
        var l2 = typeof f2 === "object" && f2 !== null;
        if (l2)
          switch (f2.$$typeof) {
            case sa:
              a: {
                l2 = f2.key;
                for (k2 = d2; k2 !== null; ) {
                  if (k2.key === l2) {
                    switch (k2.tag) {
                      case 7:
                        if (f2.type === ua) {
                          c2(a3, k2.sibling);
                          d2 = e(k2, f2.props.children);
                          d2.return = a3;
                          a3 = d2;
                          break a;
                        }
                        break;
                      default:
                        if (k2.elementType === f2.type) {
                          c2(a3, k2.sibling);
                          d2 = e(k2, f2.props);
                          d2.ref = Qg(a3, k2, f2);
                          d2.return = a3;
                          a3 = d2;
                          break a;
                        }
                    }
                    c2(a3, k2);
                    break;
                  } else
                    b2(a3, k2);
                  k2 = k2.sibling;
                }
                f2.type === ua ? (d2 = Xg(f2.props.children, a3.mode, h2, f2.key), d2.return = a3, a3 = d2) : (h2 = Vg(f2.type, f2.key, f2.props, null, a3.mode, h2), h2.ref = Qg(a3, d2, f2), h2.return = a3, a3 = h2);
              }
              return g(a3);
            case ta:
              a: {
                for (k2 = f2.key; d2 !== null; ) {
                  if (d2.key === k2)
                    if (d2.tag === 4 && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                      c2(a3, d2.sibling);
                      d2 = e(d2, f2.children || []);
                      d2.return = a3;
                      a3 = d2;
                      break a;
                    } else {
                      c2(a3, d2);
                      break;
                    }
                  else
                    b2(a3, d2);
                  d2 = d2.sibling;
                }
                d2 = Wg(f2, a3.mode, h2);
                d2.return = a3;
                a3 = d2;
              }
              return g(a3);
          }
        if (typeof f2 === "string" || typeof f2 === "number")
          return f2 = "" + f2, d2 !== null && d2.tag === 6 ? (c2(a3, d2.sibling), d2 = e(d2, f2), d2.return = a3, a3 = d2) : (c2(a3, d2), d2 = Ug(f2, a3.mode, h2), d2.return = a3, a3 = d2), g(a3);
        if (Pg(f2))
          return x(a3, d2, f2, h2);
        if (La(f2))
          return w(a3, d2, f2, h2);
        l2 && Rg(a3, f2);
        if (typeof f2 === "undefined" && !k2)
          switch (a3.tag) {
            case 1:
            case 22:
            case 0:
            case 11:
            case 15:
              throw Error(y(152, Ra(a3.type) || "Component"));
          }
        return c2(a3, d2);
      };
    }
    var Yg = Sg(true);
    var Zg = Sg(false);
    var $g = {};
    var ah = Bf($g);
    var bh = Bf($g);
    var ch = Bf($g);
    function dh(a2) {
      if (a2 === $g)
        throw Error(y(174));
      return a2;
    }
    function eh(a2, b2) {
      I(ch, b2);
      I(bh, a2);
      I(ah, $g);
      a2 = b2.nodeType;
      switch (a2) {
        case 9:
        case 11:
          b2 = (b2 = b2.documentElement) ? b2.namespaceURI : mb(null, "");
          break;
        default:
          a2 = a2 === 8 ? b2.parentNode : b2, b2 = a2.namespaceURI || null, a2 = a2.tagName, b2 = mb(b2, a2);
      }
      H(ah);
      I(ah, b2);
    }
    function fh() {
      H(ah);
      H(bh);
      H(ch);
    }
    function gh(a2) {
      dh(ch.current);
      var b2 = dh(ah.current);
      var c2 = mb(b2, a2.type);
      b2 !== c2 && (I(bh, a2), I(ah, c2));
    }
    function hh(a2) {
      bh.current === a2 && (H(ah), H(bh));
    }
    var P = Bf(0);
    function ih(a2) {
      for (var b2 = a2; b2 !== null; ) {
        if (b2.tag === 13) {
          var c2 = b2.memoizedState;
          if (c2 !== null && (c2 = c2.dehydrated, c2 === null || c2.data === "$?" || c2.data === "$!"))
            return b2;
        } else if (b2.tag === 19 && b2.memoizedProps.revealOrder !== void 0) {
          if ((b2.flags & 64) !== 0)
            return b2;
        } else if (b2.child !== null) {
          b2.child.return = b2;
          b2 = b2.child;
          continue;
        }
        if (b2 === a2)
          break;
        for (; b2.sibling === null; ) {
          if (b2.return === null || b2.return === a2)
            return null;
          b2 = b2.return;
        }
        b2.sibling.return = b2.return;
        b2 = b2.sibling;
      }
      return null;
    }
    var jh = null;
    var kh = null;
    var lh = false;
    function mh(a2, b2) {
      var c2 = nh(5, null, null, 0);
      c2.elementType = "DELETED";
      c2.type = "DELETED";
      c2.stateNode = b2;
      c2.return = a2;
      c2.flags = 8;
      a2.lastEffect !== null ? (a2.lastEffect.nextEffect = c2, a2.lastEffect = c2) : a2.firstEffect = a2.lastEffect = c2;
    }
    function oh(a2, b2) {
      switch (a2.tag) {
        case 5:
          var c2 = a2.type;
          b2 = b2.nodeType !== 1 || c2.toLowerCase() !== b2.nodeName.toLowerCase() ? null : b2;
          return b2 !== null ? (a2.stateNode = b2, true) : false;
        case 6:
          return b2 = a2.pendingProps === "" || b2.nodeType !== 3 ? null : b2, b2 !== null ? (a2.stateNode = b2, true) : false;
        case 13:
          return false;
        default:
          return false;
      }
    }
    function ph(a2) {
      if (lh) {
        var b2 = kh;
        if (b2) {
          var c2 = b2;
          if (!oh(a2, b2)) {
            b2 = rf(c2.nextSibling);
            if (!b2 || !oh(a2, b2)) {
              a2.flags = a2.flags & -1025 | 2;
              lh = false;
              jh = a2;
              return;
            }
            mh(jh, c2);
          }
          jh = a2;
          kh = rf(b2.firstChild);
        } else
          a2.flags = a2.flags & -1025 | 2, lh = false, jh = a2;
      }
    }
    function qh(a2) {
      for (a2 = a2.return; a2 !== null && a2.tag !== 5 && a2.tag !== 3 && a2.tag !== 13; )
        a2 = a2.return;
      jh = a2;
    }
    function rh(a2) {
      if (a2 !== jh)
        return false;
      if (!lh)
        return qh(a2), lh = true, false;
      var b2 = a2.type;
      if (a2.tag !== 5 || b2 !== "head" && b2 !== "body" && !nf(b2, a2.memoizedProps))
        for (b2 = kh; b2; )
          mh(a2, b2), b2 = rf(b2.nextSibling);
      qh(a2);
      if (a2.tag === 13) {
        a2 = a2.memoizedState;
        a2 = a2 !== null ? a2.dehydrated : null;
        if (!a2)
          throw Error(y(317));
        a: {
          a2 = a2.nextSibling;
          for (b2 = 0; a2; ) {
            if (a2.nodeType === 8) {
              var c2 = a2.data;
              if (c2 === "/$") {
                if (b2 === 0) {
                  kh = rf(a2.nextSibling);
                  break a;
                }
                b2--;
              } else
                c2 !== "$" && c2 !== "$!" && c2 !== "$?" || b2++;
            }
            a2 = a2.nextSibling;
          }
          kh = null;
        }
      } else
        kh = jh ? rf(a2.stateNode.nextSibling) : null;
      return true;
    }
    function sh() {
      kh = jh = null;
      lh = false;
    }
    var th = [];
    function uh() {
      for (var a2 = 0; a2 < th.length; a2++)
        th[a2]._workInProgressVersionPrimary = null;
      th.length = 0;
    }
    var vh2 = ra.ReactCurrentDispatcher;
    var wh = ra.ReactCurrentBatchConfig;
    var xh = 0;
    var R = null;
    var S = null;
    var T = null;
    var yh = false;
    var zh = false;
    function Ah() {
      throw Error(y(321));
    }
    function Bh(a2, b2) {
      if (b2 === null)
        return false;
      for (var c2 = 0; c2 < b2.length && c2 < a2.length; c2++)
        if (!He(a2[c2], b2[c2]))
          return false;
      return true;
    }
    function Ch(a2, b2, c2, d, e, f) {
      xh = f;
      R = b2;
      b2.memoizedState = null;
      b2.updateQueue = null;
      b2.lanes = 0;
      vh2.current = a2 === null || a2.memoizedState === null ? Dh : Eh;
      a2 = c2(d, e);
      if (zh) {
        f = 0;
        do {
          zh = false;
          if (!(25 > f))
            throw Error(y(301));
          f += 1;
          T = S = null;
          b2.updateQueue = null;
          vh2.current = Fh;
          a2 = c2(d, e);
        } while (zh);
      }
      vh2.current = Gh;
      b2 = S !== null && S.next !== null;
      xh = 0;
      T = S = R = null;
      yh = false;
      if (b2)
        throw Error(y(300));
      return a2;
    }
    function Hh() {
      var a2 = {memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null};
      T === null ? R.memoizedState = T = a2 : T = T.next = a2;
      return T;
    }
    function Ih() {
      if (S === null) {
        var a2 = R.alternate;
        a2 = a2 !== null ? a2.memoizedState : null;
      } else
        a2 = S.next;
      var b2 = T === null ? R.memoizedState : T.next;
      if (b2 !== null)
        T = b2, S = a2;
      else {
        if (a2 === null)
          throw Error(y(310));
        S = a2;
        a2 = {memoizedState: S.memoizedState, baseState: S.baseState, baseQueue: S.baseQueue, queue: S.queue, next: null};
        T === null ? R.memoizedState = T = a2 : T = T.next = a2;
      }
      return T;
    }
    function Jh(a2, b2) {
      return typeof b2 === "function" ? b2(a2) : b2;
    }
    function Kh(a2) {
      var b2 = Ih(), c2 = b2.queue;
      if (c2 === null)
        throw Error(y(311));
      c2.lastRenderedReducer = a2;
      var d = S, e = d.baseQueue, f = c2.pending;
      if (f !== null) {
        if (e !== null) {
          var g = e.next;
          e.next = f.next;
          f.next = g;
        }
        d.baseQueue = e = f;
        c2.pending = null;
      }
      if (e !== null) {
        e = e.next;
        d = d.baseState;
        var h = g = f = null, k = e;
        do {
          var l = k.lane;
          if ((xh & l) === l)
            h !== null && (h = h.next = {lane: 0, action: k.action, eagerReducer: k.eagerReducer, eagerState: k.eagerState, next: null}), d = k.eagerReducer === a2 ? k.eagerState : a2(d, k.action);
          else {
            var n = {
              lane: l,
              action: k.action,
              eagerReducer: k.eagerReducer,
              eagerState: k.eagerState,
              next: null
            };
            h === null ? (g = h = n, f = d) : h = h.next = n;
            R.lanes |= l;
            Dg |= l;
          }
          k = k.next;
        } while (k !== null && k !== e);
        h === null ? f = d : h.next = g;
        He(d, b2.memoizedState) || (ug = true);
        b2.memoizedState = d;
        b2.baseState = f;
        b2.baseQueue = h;
        c2.lastRenderedState = d;
      }
      return [b2.memoizedState, c2.dispatch];
    }
    function Lh(a2) {
      var b2 = Ih(), c2 = b2.queue;
      if (c2 === null)
        throw Error(y(311));
      c2.lastRenderedReducer = a2;
      var d = c2.dispatch, e = c2.pending, f = b2.memoizedState;
      if (e !== null) {
        c2.pending = null;
        var g = e = e.next;
        do
          f = a2(f, g.action), g = g.next;
        while (g !== e);
        He(f, b2.memoizedState) || (ug = true);
        b2.memoizedState = f;
        b2.baseQueue === null && (b2.baseState = f);
        c2.lastRenderedState = f;
      }
      return [f, d];
    }
    function Mh(a2, b2, c2) {
      var d = b2._getVersion;
      d = d(b2._source);
      var e = b2._workInProgressVersionPrimary;
      if (e !== null)
        a2 = e === d;
      else if (a2 = a2.mutableReadLanes, a2 = (xh & a2) === a2)
        b2._workInProgressVersionPrimary = d, th.push(b2);
      if (a2)
        return c2(b2._source);
      th.push(b2);
      throw Error(y(350));
    }
    function Nh(a2, b2, c2, d) {
      var e = U;
      if (e === null)
        throw Error(y(349));
      var f = b2._getVersion, g = f(b2._source), h = vh2.current, k = h.useState(function() {
        return Mh(e, b2, c2);
      }), l = k[1], n = k[0];
      k = T;
      var A = a2.memoizedState, p = A.refs, C = p.getSnapshot, x = A.source;
      A = A.subscribe;
      var w = R;
      a2.memoizedState = {refs: p, source: b2, subscribe: d};
      h.useEffect(function() {
        p.getSnapshot = c2;
        p.setSnapshot = l;
        var a3 = f(b2._source);
        if (!He(g, a3)) {
          a3 = c2(b2._source);
          He(n, a3) || (l(a3), a3 = Ig(w), e.mutableReadLanes |= a3 & e.pendingLanes);
          a3 = e.mutableReadLanes;
          e.entangledLanes |= a3;
          for (var d2 = e.entanglements, h2 = a3; 0 < h2; ) {
            var k2 = 31 - Vc(h2), v = 1 << k2;
            d2[k2] |= a3;
            h2 &= ~v;
          }
        }
      }, [c2, b2, d]);
      h.useEffect(function() {
        return d(b2._source, function() {
          var a3 = p.getSnapshot, c3 = p.setSnapshot;
          try {
            c3(a3(b2._source));
            var d2 = Ig(w);
            e.mutableReadLanes |= d2 & e.pendingLanes;
          } catch (q) {
            c3(function() {
              throw q;
            });
          }
        });
      }, [b2, d]);
      He(C, c2) && He(x, b2) && He(A, d) || (a2 = {pending: null, dispatch: null, lastRenderedReducer: Jh, lastRenderedState: n}, a2.dispatch = l = Oh.bind(null, R, a2), k.queue = a2, k.baseQueue = null, n = Mh(e, b2, c2), k.memoizedState = k.baseState = n);
      return n;
    }
    function Ph(a2, b2, c2) {
      var d = Ih();
      return Nh(d, a2, b2, c2);
    }
    function Qh(a2) {
      var b2 = Hh();
      typeof a2 === "function" && (a2 = a2());
      b2.memoizedState = b2.baseState = a2;
      a2 = b2.queue = {pending: null, dispatch: null, lastRenderedReducer: Jh, lastRenderedState: a2};
      a2 = a2.dispatch = Oh.bind(null, R, a2);
      return [b2.memoizedState, a2];
    }
    function Rh(a2, b2, c2, d) {
      a2 = {tag: a2, create: b2, destroy: c2, deps: d, next: null};
      b2 = R.updateQueue;
      b2 === null ? (b2 = {lastEffect: null}, R.updateQueue = b2, b2.lastEffect = a2.next = a2) : (c2 = b2.lastEffect, c2 === null ? b2.lastEffect = a2.next = a2 : (d = c2.next, c2.next = a2, a2.next = d, b2.lastEffect = a2));
      return a2;
    }
    function Sh(a2) {
      var b2 = Hh();
      a2 = {current: a2};
      return b2.memoizedState = a2;
    }
    function Th() {
      return Ih().memoizedState;
    }
    function Uh(a2, b2, c2, d) {
      var e = Hh();
      R.flags |= a2;
      e.memoizedState = Rh(1 | b2, c2, void 0, d === void 0 ? null : d);
    }
    function Vh(a2, b2, c2, d) {
      var e = Ih();
      d = d === void 0 ? null : d;
      var f = void 0;
      if (S !== null) {
        var g = S.memoizedState;
        f = g.destroy;
        if (d !== null && Bh(d, g.deps)) {
          Rh(b2, c2, f, d);
          return;
        }
      }
      R.flags |= a2;
      e.memoizedState = Rh(1 | b2, c2, f, d);
    }
    function Wh(a2, b2) {
      return Uh(516, 4, a2, b2);
    }
    function Xh(a2, b2) {
      return Vh(516, 4, a2, b2);
    }
    function Yh(a2, b2) {
      return Vh(4, 2, a2, b2);
    }
    function Zh(a2, b2) {
      if (typeof b2 === "function")
        return a2 = a2(), b2(a2), function() {
          b2(null);
        };
      if (b2 !== null && b2 !== void 0)
        return a2 = a2(), b2.current = a2, function() {
          b2.current = null;
        };
    }
    function $h(a2, b2, c2) {
      c2 = c2 !== null && c2 !== void 0 ? c2.concat([a2]) : null;
      return Vh(4, 2, Zh.bind(null, b2, a2), c2);
    }
    function ai() {
    }
    function bi(a2, b2) {
      var c2 = Ih();
      b2 = b2 === void 0 ? null : b2;
      var d = c2.memoizedState;
      if (d !== null && b2 !== null && Bh(b2, d[1]))
        return d[0];
      c2.memoizedState = [a2, b2];
      return a2;
    }
    function ci(a2, b2) {
      var c2 = Ih();
      b2 = b2 === void 0 ? null : b2;
      var d = c2.memoizedState;
      if (d !== null && b2 !== null && Bh(b2, d[1]))
        return d[0];
      a2 = a2();
      c2.memoizedState = [a2, b2];
      return a2;
    }
    function di(a2, b2) {
      var c2 = eg();
      gg(98 > c2 ? 98 : c2, function() {
        a2(true);
      });
      gg(97 < c2 ? 97 : c2, function() {
        var c3 = wh.transition;
        wh.transition = 1;
        try {
          a2(false), b2();
        } finally {
          wh.transition = c3;
        }
      });
    }
    function Oh(a2, b2, c2) {
      var d = Hg(), e = Ig(a2), f = {lane: e, action: c2, eagerReducer: null, eagerState: null, next: null}, g = b2.pending;
      g === null ? f.next = f : (f.next = g.next, g.next = f);
      b2.pending = f;
      g = a2.alternate;
      if (a2 === R || g !== null && g === R)
        zh = yh = true;
      else {
        if (a2.lanes === 0 && (g === null || g.lanes === 0) && (g = b2.lastRenderedReducer, g !== null))
          try {
            var h = b2.lastRenderedState, k = g(h, c2);
            f.eagerReducer = g;
            f.eagerState = k;
            if (He(k, h))
              return;
          } catch (l) {
          } finally {
          }
        Jg(a2, e, d);
      }
    }
    var Gh = {readContext: vg, useCallback: Ah, useContext: Ah, useEffect: Ah, useImperativeHandle: Ah, useLayoutEffect: Ah, useMemo: Ah, useReducer: Ah, useRef: Ah, useState: Ah, useDebugValue: Ah, useDeferredValue: Ah, useTransition: Ah, useMutableSource: Ah, useOpaqueIdentifier: Ah, unstable_isNewReconciler: false};
    var Dh = {readContext: vg, useCallback: function(a2, b2) {
      Hh().memoizedState = [a2, b2 === void 0 ? null : b2];
      return a2;
    }, useContext: vg, useEffect: Wh, useImperativeHandle: function(a2, b2, c2) {
      c2 = c2 !== null && c2 !== void 0 ? c2.concat([a2]) : null;
      return Uh(4, 2, Zh.bind(null, b2, a2), c2);
    }, useLayoutEffect: function(a2, b2) {
      return Uh(4, 2, a2, b2);
    }, useMemo: function(a2, b2) {
      var c2 = Hh();
      b2 = b2 === void 0 ? null : b2;
      a2 = a2();
      c2.memoizedState = [a2, b2];
      return a2;
    }, useReducer: function(a2, b2, c2) {
      var d = Hh();
      b2 = c2 !== void 0 ? c2(b2) : b2;
      d.memoizedState = d.baseState = b2;
      a2 = d.queue = {pending: null, dispatch: null, lastRenderedReducer: a2, lastRenderedState: b2};
      a2 = a2.dispatch = Oh.bind(null, R, a2);
      return [d.memoizedState, a2];
    }, useRef: Sh, useState: Qh, useDebugValue: ai, useDeferredValue: function(a2) {
      var b2 = Qh(a2), c2 = b2[0], d = b2[1];
      Wh(function() {
        var b3 = wh.transition;
        wh.transition = 1;
        try {
          d(a2);
        } finally {
          wh.transition = b3;
        }
      }, [a2]);
      return c2;
    }, useTransition: function() {
      var a2 = Qh(false), b2 = a2[0];
      a2 = di.bind(null, a2[1]);
      Sh(a2);
      return [a2, b2];
    }, useMutableSource: function(a2, b2, c2) {
      var d = Hh();
      d.memoizedState = {refs: {getSnapshot: b2, setSnapshot: null}, source: a2, subscribe: c2};
      return Nh(d, a2, b2, c2);
    }, useOpaqueIdentifier: function() {
      if (lh) {
        var a2 = false, b2 = uf(function() {
          a2 || (a2 = true, c2("r:" + (tf++).toString(36)));
          throw Error(y(355));
        }), c2 = Qh(b2)[1];
        (R.mode & 2) === 0 && (R.flags |= 516, Rh(5, function() {
          c2("r:" + (tf++).toString(36));
        }, void 0, null));
        return b2;
      }
      b2 = "r:" + (tf++).toString(36);
      Qh(b2);
      return b2;
    }, unstable_isNewReconciler: false};
    var Eh = {readContext: vg, useCallback: bi, useContext: vg, useEffect: Xh, useImperativeHandle: $h, useLayoutEffect: Yh, useMemo: ci, useReducer: Kh, useRef: Th, useState: function() {
      return Kh(Jh);
    }, useDebugValue: ai, useDeferredValue: function(a2) {
      var b2 = Kh(Jh), c2 = b2[0], d = b2[1];
      Xh(function() {
        var b3 = wh.transition;
        wh.transition = 1;
        try {
          d(a2);
        } finally {
          wh.transition = b3;
        }
      }, [a2]);
      return c2;
    }, useTransition: function() {
      var a2 = Kh(Jh)[0];
      return [
        Th().current,
        a2
      ];
    }, useMutableSource: Ph, useOpaqueIdentifier: function() {
      return Kh(Jh)[0];
    }, unstable_isNewReconciler: false};
    var Fh = {readContext: vg, useCallback: bi, useContext: vg, useEffect: Xh, useImperativeHandle: $h, useLayoutEffect: Yh, useMemo: ci, useReducer: Lh, useRef: Th, useState: function() {
      return Lh(Jh);
    }, useDebugValue: ai, useDeferredValue: function(a2) {
      var b2 = Lh(Jh), c2 = b2[0], d = b2[1];
      Xh(function() {
        var b3 = wh.transition;
        wh.transition = 1;
        try {
          d(a2);
        } finally {
          wh.transition = b3;
        }
      }, [a2]);
      return c2;
    }, useTransition: function() {
      var a2 = Lh(Jh)[0];
      return [
        Th().current,
        a2
      ];
    }, useMutableSource: Ph, useOpaqueIdentifier: function() {
      return Lh(Jh)[0];
    }, unstable_isNewReconciler: false};
    var ei = ra.ReactCurrentOwner;
    var ug = false;
    function fi(a2, b2, c2, d) {
      b2.child = a2 === null ? Zg(b2, null, c2, d) : Yg(b2, a2.child, c2, d);
    }
    function gi(a2, b2, c2, d, e) {
      c2 = c2.render;
      var f = b2.ref;
      tg(b2, e);
      d = Ch(a2, b2, c2, d, f, e);
      if (a2 !== null && !ug)
        return b2.updateQueue = a2.updateQueue, b2.flags &= -517, a2.lanes &= ~e, hi(a2, b2, e);
      b2.flags |= 1;
      fi(a2, b2, d, e);
      return b2.child;
    }
    function ii(a2, b2, c2, d, e, f) {
      if (a2 === null) {
        var g = c2.type;
        if (typeof g === "function" && !ji(g) && g.defaultProps === void 0 && c2.compare === null && c2.defaultProps === void 0)
          return b2.tag = 15, b2.type = g, ki(a2, b2, g, d, e, f);
        a2 = Vg(c2.type, null, d, b2, b2.mode, f);
        a2.ref = b2.ref;
        a2.return = b2;
        return b2.child = a2;
      }
      g = a2.child;
      if ((e & f) === 0 && (e = g.memoizedProps, c2 = c2.compare, c2 = c2 !== null ? c2 : Je, c2(e, d) && a2.ref === b2.ref))
        return hi(a2, b2, f);
      b2.flags |= 1;
      a2 = Tg(g, d);
      a2.ref = b2.ref;
      a2.return = b2;
      return b2.child = a2;
    }
    function ki(a2, b2, c2, d, e, f) {
      if (a2 !== null && Je(a2.memoizedProps, d) && a2.ref === b2.ref)
        if (ug = false, (f & e) !== 0)
          (a2.flags & 16384) !== 0 && (ug = true);
        else
          return b2.lanes = a2.lanes, hi(a2, b2, f);
      return li(a2, b2, c2, d, f);
    }
    function mi(a2, b2, c2) {
      var d = b2.pendingProps, e = d.children, f = a2 !== null ? a2.memoizedState : null;
      if (d.mode === "hidden" || d.mode === "unstable-defer-without-hiding")
        if ((b2.mode & 4) === 0)
          b2.memoizedState = {baseLanes: 0}, ni(b2, c2);
        else if ((c2 & 1073741824) !== 0)
          b2.memoizedState = {baseLanes: 0}, ni(b2, f !== null ? f.baseLanes : c2);
        else
          return a2 = f !== null ? f.baseLanes | c2 : c2, b2.lanes = b2.childLanes = 1073741824, b2.memoizedState = {baseLanes: a2}, ni(b2, a2), null;
      else
        f !== null ? (d = f.baseLanes | c2, b2.memoizedState = null) : d = c2, ni(b2, d);
      fi(a2, b2, e, c2);
      return b2.child;
    }
    function oi(a2, b2) {
      var c2 = b2.ref;
      if (a2 === null && c2 !== null || a2 !== null && a2.ref !== c2)
        b2.flags |= 128;
    }
    function li(a2, b2, c2, d, e) {
      var f = Ff(c2) ? Df : M.current;
      f = Ef(b2, f);
      tg(b2, e);
      c2 = Ch(a2, b2, c2, d, f, e);
      if (a2 !== null && !ug)
        return b2.updateQueue = a2.updateQueue, b2.flags &= -517, a2.lanes &= ~e, hi(a2, b2, e);
      b2.flags |= 1;
      fi(a2, b2, c2, e);
      return b2.child;
    }
    function pi(a2, b2, c2, d, e) {
      if (Ff(c2)) {
        var f = true;
        Jf(b2);
      } else
        f = false;
      tg(b2, e);
      if (b2.stateNode === null)
        a2 !== null && (a2.alternate = null, b2.alternate = null, b2.flags |= 2), Mg(b2, c2, d), Og(b2, c2, d, e), d = true;
      else if (a2 === null) {
        var g = b2.stateNode, h = b2.memoizedProps;
        g.props = h;
        var k = g.context, l = c2.contextType;
        typeof l === "object" && l !== null ? l = vg(l) : (l = Ff(c2) ? Df : M.current, l = Ef(b2, l));
        var n = c2.getDerivedStateFromProps, A = typeof n === "function" || typeof g.getSnapshotBeforeUpdate === "function";
        A || typeof g.UNSAFE_componentWillReceiveProps !== "function" && typeof g.componentWillReceiveProps !== "function" || (h !== d || k !== l) && Ng(b2, g, d, l);
        wg = false;
        var p = b2.memoizedState;
        g.state = p;
        Cg(b2, d, g, e);
        k = b2.memoizedState;
        h !== d || p !== k || N.current || wg ? (typeof n === "function" && (Gg(b2, c2, n, d), k = b2.memoizedState), (h = wg || Lg(b2, c2, h, d, p, k, l)) ? (A || typeof g.UNSAFE_componentWillMount !== "function" && typeof g.componentWillMount !== "function" || (typeof g.componentWillMount === "function" && g.componentWillMount(), typeof g.UNSAFE_componentWillMount === "function" && g.UNSAFE_componentWillMount()), typeof g.componentDidMount === "function" && (b2.flags |= 4)) : (typeof g.componentDidMount === "function" && (b2.flags |= 4), b2.memoizedProps = d, b2.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : (typeof g.componentDidMount === "function" && (b2.flags |= 4), d = false);
      } else {
        g = b2.stateNode;
        yg(a2, b2);
        h = b2.memoizedProps;
        l = b2.type === b2.elementType ? h : lg(b2.type, h);
        g.props = l;
        A = b2.pendingProps;
        p = g.context;
        k = c2.contextType;
        typeof k === "object" && k !== null ? k = vg(k) : (k = Ff(c2) ? Df : M.current, k = Ef(b2, k));
        var C = c2.getDerivedStateFromProps;
        (n = typeof C === "function" || typeof g.getSnapshotBeforeUpdate === "function") || typeof g.UNSAFE_componentWillReceiveProps !== "function" && typeof g.componentWillReceiveProps !== "function" || (h !== A || p !== k) && Ng(b2, g, d, k);
        wg = false;
        p = b2.memoizedState;
        g.state = p;
        Cg(b2, d, g, e);
        var x = b2.memoizedState;
        h !== A || p !== x || N.current || wg ? (typeof C === "function" && (Gg(b2, c2, C, d), x = b2.memoizedState), (l = wg || Lg(b2, c2, l, d, p, x, k)) ? (n || typeof g.UNSAFE_componentWillUpdate !== "function" && typeof g.componentWillUpdate !== "function" || (typeof g.componentWillUpdate === "function" && g.componentWillUpdate(d, x, k), typeof g.UNSAFE_componentWillUpdate === "function" && g.UNSAFE_componentWillUpdate(d, x, k)), typeof g.componentDidUpdate === "function" && (b2.flags |= 4), typeof g.getSnapshotBeforeUpdate === "function" && (b2.flags |= 256)) : (typeof g.componentDidUpdate !== "function" || h === a2.memoizedProps && p === a2.memoizedState || (b2.flags |= 4), typeof g.getSnapshotBeforeUpdate !== "function" || h === a2.memoizedProps && p === a2.memoizedState || (b2.flags |= 256), b2.memoizedProps = d, b2.memoizedState = x), g.props = d, g.state = x, g.context = k, d = l) : (typeof g.componentDidUpdate !== "function" || h === a2.memoizedProps && p === a2.memoizedState || (b2.flags |= 4), typeof g.getSnapshotBeforeUpdate !== "function" || h === a2.memoizedProps && p === a2.memoizedState || (b2.flags |= 256), d = false);
      }
      return qi(a2, b2, c2, d, f, e);
    }
    function qi(a2, b2, c2, d, e, f) {
      oi(a2, b2);
      var g = (b2.flags & 64) !== 0;
      if (!d && !g)
        return e && Kf(b2, c2, false), hi(a2, b2, f);
      d = b2.stateNode;
      ei.current = b2;
      var h = g && typeof c2.getDerivedStateFromError !== "function" ? null : d.render();
      b2.flags |= 1;
      a2 !== null && g ? (b2.child = Yg(b2, a2.child, null, f), b2.child = Yg(b2, null, h, f)) : fi(a2, b2, h, f);
      b2.memoizedState = d.state;
      e && Kf(b2, c2, true);
      return b2.child;
    }
    function ri(a2) {
      var b2 = a2.stateNode;
      b2.pendingContext ? Hf(a2, b2.pendingContext, b2.pendingContext !== b2.context) : b2.context && Hf(a2, b2.context, false);
      eh(a2, b2.containerInfo);
    }
    var si = {dehydrated: null, retryLane: 0};
    function ti(a2, b2, c2) {
      var d = b2.pendingProps, e = P.current, f = false, g;
      (g = (b2.flags & 64) !== 0) || (g = a2 !== null && a2.memoizedState === null ? false : (e & 2) !== 0);
      g ? (f = true, b2.flags &= -65) : a2 !== null && a2.memoizedState === null || d.fallback === void 0 || d.unstable_avoidThisFallback === true || (e |= 1);
      I(P, e & 1);
      if (a2 === null) {
        d.fallback !== void 0 && ph(b2);
        a2 = d.children;
        e = d.fallback;
        if (f)
          return a2 = ui(b2, a2, e, c2), b2.child.memoizedState = {baseLanes: c2}, b2.memoizedState = si, a2;
        if (typeof d.unstable_expectedLoadTime === "number")
          return a2 = ui(b2, a2, e, c2), b2.child.memoizedState = {baseLanes: c2}, b2.memoizedState = si, b2.lanes = 33554432, a2;
        c2 = vi({mode: "visible", children: a2}, b2.mode, c2, null);
        c2.return = b2;
        return b2.child = c2;
      }
      if (a2.memoizedState !== null) {
        if (f)
          return d = wi(a2, b2, d.children, d.fallback, c2), f = b2.child, e = a2.child.memoizedState, f.memoizedState = e === null ? {baseLanes: c2} : {baseLanes: e.baseLanes | c2}, f.childLanes = a2.childLanes & ~c2, b2.memoizedState = si, d;
        c2 = xi(a2, b2, d.children, c2);
        b2.memoizedState = null;
        return c2;
      }
      if (f)
        return d = wi(a2, b2, d.children, d.fallback, c2), f = b2.child, e = a2.child.memoizedState, f.memoizedState = e === null ? {baseLanes: c2} : {baseLanes: e.baseLanes | c2}, f.childLanes = a2.childLanes & ~c2, b2.memoizedState = si, d;
      c2 = xi(a2, b2, d.children, c2);
      b2.memoizedState = null;
      return c2;
    }
    function ui(a2, b2, c2, d) {
      var e = a2.mode, f = a2.child;
      b2 = {mode: "hidden", children: b2};
      (e & 2) === 0 && f !== null ? (f.childLanes = 0, f.pendingProps = b2) : f = vi(b2, e, 0, null);
      c2 = Xg(c2, e, d, null);
      f.return = a2;
      c2.return = a2;
      f.sibling = c2;
      a2.child = f;
      return c2;
    }
    function xi(a2, b2, c2, d) {
      var e = a2.child;
      a2 = e.sibling;
      c2 = Tg(e, {mode: "visible", children: c2});
      (b2.mode & 2) === 0 && (c2.lanes = d);
      c2.return = b2;
      c2.sibling = null;
      a2 !== null && (a2.nextEffect = null, a2.flags = 8, b2.firstEffect = b2.lastEffect = a2);
      return b2.child = c2;
    }
    function wi(a2, b2, c2, d, e) {
      var f = b2.mode, g = a2.child;
      a2 = g.sibling;
      var h = {mode: "hidden", children: c2};
      (f & 2) === 0 && b2.child !== g ? (c2 = b2.child, c2.childLanes = 0, c2.pendingProps = h, g = c2.lastEffect, g !== null ? (b2.firstEffect = c2.firstEffect, b2.lastEffect = g, g.nextEffect = null) : b2.firstEffect = b2.lastEffect = null) : c2 = Tg(g, h);
      a2 !== null ? d = Tg(a2, d) : (d = Xg(d, f, e, null), d.flags |= 2);
      d.return = b2;
      c2.return = b2;
      c2.sibling = d;
      b2.child = c2;
      return d;
    }
    function yi(a2, b2) {
      a2.lanes |= b2;
      var c2 = a2.alternate;
      c2 !== null && (c2.lanes |= b2);
      sg(a2.return, b2);
    }
    function zi(a2, b2, c2, d, e, f) {
      var g = a2.memoizedState;
      g === null ? a2.memoizedState = {isBackwards: b2, rendering: null, renderingStartTime: 0, last: d, tail: c2, tailMode: e, lastEffect: f} : (g.isBackwards = b2, g.rendering = null, g.renderingStartTime = 0, g.last = d, g.tail = c2, g.tailMode = e, g.lastEffect = f);
    }
    function Ai(a2, b2, c2) {
      var d = b2.pendingProps, e = d.revealOrder, f = d.tail;
      fi(a2, b2, d.children, c2);
      d = P.current;
      if ((d & 2) !== 0)
        d = d & 1 | 2, b2.flags |= 64;
      else {
        if (a2 !== null && (a2.flags & 64) !== 0)
          a:
            for (a2 = b2.child; a2 !== null; ) {
              if (a2.tag === 13)
                a2.memoizedState !== null && yi(a2, c2);
              else if (a2.tag === 19)
                yi(a2, c2);
              else if (a2.child !== null) {
                a2.child.return = a2;
                a2 = a2.child;
                continue;
              }
              if (a2 === b2)
                break a;
              for (; a2.sibling === null; ) {
                if (a2.return === null || a2.return === b2)
                  break a;
                a2 = a2.return;
              }
              a2.sibling.return = a2.return;
              a2 = a2.sibling;
            }
        d &= 1;
      }
      I(P, d);
      if ((b2.mode & 2) === 0)
        b2.memoizedState = null;
      else
        switch (e) {
          case "forwards":
            c2 = b2.child;
            for (e = null; c2 !== null; )
              a2 = c2.alternate, a2 !== null && ih(a2) === null && (e = c2), c2 = c2.sibling;
            c2 = e;
            c2 === null ? (e = b2.child, b2.child = null) : (e = c2.sibling, c2.sibling = null);
            zi(b2, false, e, c2, f, b2.lastEffect);
            break;
          case "backwards":
            c2 = null;
            e = b2.child;
            for (b2.child = null; e !== null; ) {
              a2 = e.alternate;
              if (a2 !== null && ih(a2) === null) {
                b2.child = e;
                break;
              }
              a2 = e.sibling;
              e.sibling = c2;
              c2 = e;
              e = a2;
            }
            zi(b2, true, c2, null, f, b2.lastEffect);
            break;
          case "together":
            zi(b2, false, null, null, void 0, b2.lastEffect);
            break;
          default:
            b2.memoizedState = null;
        }
      return b2.child;
    }
    function hi(a2, b2, c2) {
      a2 !== null && (b2.dependencies = a2.dependencies);
      Dg |= b2.lanes;
      if ((c2 & b2.childLanes) !== 0) {
        if (a2 !== null && b2.child !== a2.child)
          throw Error(y(153));
        if (b2.child !== null) {
          a2 = b2.child;
          c2 = Tg(a2, a2.pendingProps);
          b2.child = c2;
          for (c2.return = b2; a2.sibling !== null; )
            a2 = a2.sibling, c2 = c2.sibling = Tg(a2, a2.pendingProps), c2.return = b2;
          c2.sibling = null;
        }
        return b2.child;
      }
      return null;
    }
    var Bi;
    var Ci;
    var Di;
    var Ei;
    Bi = function(a2, b2) {
      for (var c2 = b2.child; c2 !== null; ) {
        if (c2.tag === 5 || c2.tag === 6)
          a2.appendChild(c2.stateNode);
        else if (c2.tag !== 4 && c2.child !== null) {
          c2.child.return = c2;
          c2 = c2.child;
          continue;
        }
        if (c2 === b2)
          break;
        for (; c2.sibling === null; ) {
          if (c2.return === null || c2.return === b2)
            return;
          c2 = c2.return;
        }
        c2.sibling.return = c2.return;
        c2 = c2.sibling;
      }
    };
    Ci = function() {
    };
    Di = function(a2, b2, c2, d) {
      var e = a2.memoizedProps;
      if (e !== d) {
        a2 = b2.stateNode;
        dh(ah.current);
        var f = null;
        switch (c2) {
          case "input":
            e = Ya(a2, e);
            d = Ya(a2, d);
            f = [];
            break;
          case "option":
            e = eb(a2, e);
            d = eb(a2, d);
            f = [];
            break;
          case "select":
            e = m2({}, e, {value: void 0});
            d = m2({}, d, {value: void 0});
            f = [];
            break;
          case "textarea":
            e = gb(a2, e);
            d = gb(a2, d);
            f = [];
            break;
          default:
            typeof e.onClick !== "function" && typeof d.onClick === "function" && (a2.onclick = jf);
        }
        vb(c2, d);
        var g;
        c2 = null;
        for (l in e)
          if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && e[l] != null)
            if (l === "style") {
              var h = e[l];
              for (g in h)
                h.hasOwnProperty(g) && (c2 || (c2 = {}), c2[g] = "");
            } else
              l !== "dangerouslySetInnerHTML" && l !== "children" && l !== "suppressContentEditableWarning" && l !== "suppressHydrationWarning" && l !== "autoFocus" && (ca2.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
        for (l in d) {
          var k = d[l];
          h = e != null ? e[l] : void 0;
          if (d.hasOwnProperty(l) && k !== h && (k != null || h != null))
            if (l === "style")
              if (h) {
                for (g in h)
                  !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c2 || (c2 = {}), c2[g] = "");
                for (g in k)
                  k.hasOwnProperty(g) && h[g] !== k[g] && (c2 || (c2 = {}), c2[g] = k[g]);
              } else
                c2 || (f || (f = []), f.push(l, c2)), c2 = k;
            else
              l === "dangerouslySetInnerHTML" ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, k != null && h !== k && (f = f || []).push(l, k)) : l === "children" ? typeof k !== "string" && typeof k !== "number" || (f = f || []).push(l, "" + k) : l !== "suppressContentEditableWarning" && l !== "suppressHydrationWarning" && (ca2.hasOwnProperty(l) ? (k != null && l === "onScroll" && G("scroll", a2), f || h === k || (f = [])) : typeof k === "object" && k !== null && k.$$typeof === Ga ? k.toString() : (f = f || []).push(l, k));
        }
        c2 && (f = f || []).push("style", c2);
        var l = f;
        if (b2.updateQueue = l)
          b2.flags |= 4;
      }
    };
    Ei = function(a2, b2, c2, d) {
      c2 !== d && (b2.flags |= 4);
    };
    function Fi(a2, b2) {
      if (!lh)
        switch (a2.tailMode) {
          case "hidden":
            b2 = a2.tail;
            for (var c2 = null; b2 !== null; )
              b2.alternate !== null && (c2 = b2), b2 = b2.sibling;
            c2 === null ? a2.tail = null : c2.sibling = null;
            break;
          case "collapsed":
            c2 = a2.tail;
            for (var d = null; c2 !== null; )
              c2.alternate !== null && (d = c2), c2 = c2.sibling;
            d === null ? b2 || a2.tail === null ? a2.tail = null : a2.tail.sibling = null : d.sibling = null;
        }
    }
    function Gi(a2, b2, c2) {
      var d = b2.pendingProps;
      switch (b2.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return null;
        case 1:
          return Ff(b2.type) && Gf(), null;
        case 3:
          fh();
          H(N);
          H(M);
          uh();
          d = b2.stateNode;
          d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
          if (a2 === null || a2.child === null)
            rh(b2) ? b2.flags |= 4 : d.hydrate || (b2.flags |= 256);
          Ci(b2);
          return null;
        case 5:
          hh(b2);
          var e = dh(ch.current);
          c2 = b2.type;
          if (a2 !== null && b2.stateNode != null)
            Di(a2, b2, c2, d, e), a2.ref !== b2.ref && (b2.flags |= 128);
          else {
            if (!d) {
              if (b2.stateNode === null)
                throw Error(y(166));
              return null;
            }
            a2 = dh(ah.current);
            if (rh(b2)) {
              d = b2.stateNode;
              c2 = b2.type;
              var f = b2.memoizedProps;
              d[wf] = b2;
              d[xf] = f;
              switch (c2) {
                case "dialog":
                  G("cancel", d);
                  G("close", d);
                  break;
                case "iframe":
                case "object":
                case "embed":
                  G("load", d);
                  break;
                case "video":
                case "audio":
                  for (a2 = 0; a2 < Xe.length; a2++)
                    G(Xe[a2], d);
                  break;
                case "source":
                  G("error", d);
                  break;
                case "img":
                case "image":
                case "link":
                  G("error", d);
                  G("load", d);
                  break;
                case "details":
                  G("toggle", d);
                  break;
                case "input":
                  Za(d, f);
                  G("invalid", d);
                  break;
                case "select":
                  d._wrapperState = {wasMultiple: !!f.multiple};
                  G("invalid", d);
                  break;
                case "textarea":
                  hb(d, f), G("invalid", d);
              }
              vb(c2, f);
              a2 = null;
              for (var g in f)
                f.hasOwnProperty(g) && (e = f[g], g === "children" ? typeof e === "string" ? d.textContent !== e && (a2 = ["children", e]) : typeof e === "number" && d.textContent !== "" + e && (a2 = ["children", "" + e]) : ca2.hasOwnProperty(g) && e != null && g === "onScroll" && G("scroll", d));
              switch (c2) {
                case "input":
                  Va(d);
                  cb2(d, f, true);
                  break;
                case "textarea":
                  Va(d);
                  jb(d);
                  break;
                case "select":
                case "option":
                  break;
                default:
                  typeof f.onClick === "function" && (d.onclick = jf);
              }
              d = a2;
              b2.updateQueue = d;
              d !== null && (b2.flags |= 4);
            } else {
              g = e.nodeType === 9 ? e : e.ownerDocument;
              a2 === kb.html && (a2 = lb(c2));
              a2 === kb.html ? c2 === "script" ? (a2 = g.createElement("div"), a2.innerHTML = "<script></script>", a2 = a2.removeChild(a2.firstChild)) : typeof d.is === "string" ? a2 = g.createElement(c2, {is: d.is}) : (a2 = g.createElement(c2), c2 === "select" && (g = a2, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a2 = g.createElementNS(a2, c2);
              a2[wf] = b2;
              a2[xf] = d;
              Bi(a2, b2, false, false);
              b2.stateNode = a2;
              g = wb(c2, d);
              switch (c2) {
                case "dialog":
                  G("cancel", a2);
                  G("close", a2);
                  e = d;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  G("load", a2);
                  e = d;
                  break;
                case "video":
                case "audio":
                  for (e = 0; e < Xe.length; e++)
                    G(Xe[e], a2);
                  e = d;
                  break;
                case "source":
                  G("error", a2);
                  e = d;
                  break;
                case "img":
                case "image":
                case "link":
                  G("error", a2);
                  G("load", a2);
                  e = d;
                  break;
                case "details":
                  G("toggle", a2);
                  e = d;
                  break;
                case "input":
                  Za(a2, d);
                  e = Ya(a2, d);
                  G("invalid", a2);
                  break;
                case "option":
                  e = eb(a2, d);
                  break;
                case "select":
                  a2._wrapperState = {wasMultiple: !!d.multiple};
                  e = m2({}, d, {value: void 0});
                  G("invalid", a2);
                  break;
                case "textarea":
                  hb(a2, d);
                  e = gb(a2, d);
                  G("invalid", a2);
                  break;
                default:
                  e = d;
              }
              vb(c2, e);
              var h = e;
              for (f in h)
                if (h.hasOwnProperty(f)) {
                  var k = h[f];
                  f === "style" ? tb(a2, k) : f === "dangerouslySetInnerHTML" ? (k = k ? k.__html : void 0, k != null && ob(a2, k)) : f === "children" ? typeof k === "string" ? (c2 !== "textarea" || k !== "") && pb(a2, k) : typeof k === "number" && pb(a2, "" + k) : f !== "suppressContentEditableWarning" && f !== "suppressHydrationWarning" && f !== "autoFocus" && (ca2.hasOwnProperty(f) ? k != null && f === "onScroll" && G("scroll", a2) : k != null && qa(a2, f, k, g));
                }
              switch (c2) {
                case "input":
                  Va(a2);
                  cb2(a2, d, false);
                  break;
                case "textarea":
                  Va(a2);
                  jb(a2);
                  break;
                case "option":
                  d.value != null && a2.setAttribute("value", "" + Sa(d.value));
                  break;
                case "select":
                  a2.multiple = !!d.multiple;
                  f = d.value;
                  f != null ? fb(a2, !!d.multiple, f, false) : d.defaultValue != null && fb(a2, !!d.multiple, d.defaultValue, true);
                  break;
                default:
                  typeof e.onClick === "function" && (a2.onclick = jf);
              }
              mf(c2, d) && (b2.flags |= 4);
            }
            b2.ref !== null && (b2.flags |= 128);
          }
          return null;
        case 6:
          if (a2 && b2.stateNode != null)
            Ei(a2, b2, a2.memoizedProps, d);
          else {
            if (typeof d !== "string" && b2.stateNode === null)
              throw Error(y(166));
            c2 = dh(ch.current);
            dh(ah.current);
            rh(b2) ? (d = b2.stateNode, c2 = b2.memoizedProps, d[wf] = b2, d.nodeValue !== c2 && (b2.flags |= 4)) : (d = (c2.nodeType === 9 ? c2 : c2.ownerDocument).createTextNode(d), d[wf] = b2, b2.stateNode = d);
          }
          return null;
        case 13:
          H(P);
          d = b2.memoizedState;
          if ((b2.flags & 64) !== 0)
            return b2.lanes = c2, b2;
          d = d !== null;
          c2 = false;
          a2 === null ? b2.memoizedProps.fallback !== void 0 && rh(b2) : c2 = a2.memoizedState !== null;
          if (d && !c2 && (b2.mode & 2) !== 0)
            if (a2 === null && b2.memoizedProps.unstable_avoidThisFallback !== true || (P.current & 1) !== 0)
              V === 0 && (V = 3);
            else {
              if (V === 0 || V === 3)
                V = 4;
              U === null || (Dg & 134217727) === 0 && (Hi & 134217727) === 0 || Ii(U, W);
            }
          if (d || c2)
            b2.flags |= 4;
          return null;
        case 4:
          return fh(), Ci(b2), a2 === null && cf(b2.stateNode.containerInfo), null;
        case 10:
          return rg(b2), null;
        case 17:
          return Ff(b2.type) && Gf(), null;
        case 19:
          H(P);
          d = b2.memoizedState;
          if (d === null)
            return null;
          f = (b2.flags & 64) !== 0;
          g = d.rendering;
          if (g === null)
            if (f)
              Fi(d, false);
            else {
              if (V !== 0 || a2 !== null && (a2.flags & 64) !== 0)
                for (a2 = b2.child; a2 !== null; ) {
                  g = ih(a2);
                  if (g !== null) {
                    b2.flags |= 64;
                    Fi(d, false);
                    f = g.updateQueue;
                    f !== null && (b2.updateQueue = f, b2.flags |= 4);
                    d.lastEffect === null && (b2.firstEffect = null);
                    b2.lastEffect = d.lastEffect;
                    d = c2;
                    for (c2 = b2.child; c2 !== null; )
                      f = c2, a2 = d, f.flags &= 2, f.nextEffect = null, f.firstEffect = null, f.lastEffect = null, g = f.alternate, g === null ? (f.childLanes = 0, f.lanes = a2, f.child = null, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a2 = g.dependencies, f.dependencies = a2 === null ? null : {lanes: a2.lanes, firstContext: a2.firstContext}), c2 = c2.sibling;
                    I(P, P.current & 1 | 2);
                    return b2.child;
                  }
                  a2 = a2.sibling;
                }
              d.tail !== null && O() > Ji && (b2.flags |= 64, f = true, Fi(d, false), b2.lanes = 33554432);
            }
          else {
            if (!f)
              if (a2 = ih(g), a2 !== null) {
                if (b2.flags |= 64, f = true, c2 = a2.updateQueue, c2 !== null && (b2.updateQueue = c2, b2.flags |= 4), Fi(d, true), d.tail === null && d.tailMode === "hidden" && !g.alternate && !lh)
                  return b2 = b2.lastEffect = d.lastEffect, b2 !== null && (b2.nextEffect = null), null;
              } else
                2 * O() - d.renderingStartTime > Ji && c2 !== 1073741824 && (b2.flags |= 64, f = true, Fi(d, false), b2.lanes = 33554432);
            d.isBackwards ? (g.sibling = b2.child, b2.child = g) : (c2 = d.last, c2 !== null ? c2.sibling = g : b2.child = g, d.last = g);
          }
          return d.tail !== null ? (c2 = d.tail, d.rendering = c2, d.tail = c2.sibling, d.lastEffect = b2.lastEffect, d.renderingStartTime = O(), c2.sibling = null, b2 = P.current, I(P, f ? b2 & 1 | 2 : b2 & 1), c2) : null;
        case 23:
        case 24:
          return Ki(), a2 !== null && a2.memoizedState !== null !== (b2.memoizedState !== null) && d.mode !== "unstable-defer-without-hiding" && (b2.flags |= 4), null;
      }
      throw Error(y(156, b2.tag));
    }
    function Li(a2) {
      switch (a2.tag) {
        case 1:
          Ff(a2.type) && Gf();
          var b2 = a2.flags;
          return b2 & 4096 ? (a2.flags = b2 & -4097 | 64, a2) : null;
        case 3:
          fh();
          H(N);
          H(M);
          uh();
          b2 = a2.flags;
          if ((b2 & 64) !== 0)
            throw Error(y(285));
          a2.flags = b2 & -4097 | 64;
          return a2;
        case 5:
          return hh(a2), null;
        case 13:
          return H(P), b2 = a2.flags, b2 & 4096 ? (a2.flags = b2 & -4097 | 64, a2) : null;
        case 19:
          return H(P), null;
        case 4:
          return fh(), null;
        case 10:
          return rg(a2), null;
        case 23:
        case 24:
          return Ki(), null;
        default:
          return null;
      }
    }
    function Mi(a2, b2) {
      try {
        var c2 = "", d = b2;
        do
          c2 += Qa(d), d = d.return;
        while (d);
        var e = c2;
      } catch (f) {
        e = "\nError generating stack: " + f.message + "\n" + f.stack;
      }
      return {value: a2, source: b2, stack: e};
    }
    function Ni(a2, b2) {
      try {
        console.error(b2.value);
      } catch (c2) {
        setTimeout(function() {
          throw c2;
        });
      }
    }
    var Oi = typeof WeakMap === "function" ? WeakMap : Map;
    function Pi(a2, b2, c2) {
      c2 = zg(-1, c2);
      c2.tag = 3;
      c2.payload = {element: null};
      var d = b2.value;
      c2.callback = function() {
        Qi || (Qi = true, Ri = d);
        Ni(a2, b2);
      };
      return c2;
    }
    function Si(a2, b2, c2) {
      c2 = zg(-1, c2);
      c2.tag = 3;
      var d = a2.type.getDerivedStateFromError;
      if (typeof d === "function") {
        var e = b2.value;
        c2.payload = function() {
          Ni(a2, b2);
          return d(e);
        };
      }
      var f = a2.stateNode;
      f !== null && typeof f.componentDidCatch === "function" && (c2.callback = function() {
        typeof d !== "function" && (Ti === null ? Ti = new Set([this]) : Ti.add(this), Ni(a2, b2));
        var c3 = b2.stack;
        this.componentDidCatch(b2.value, {componentStack: c3 !== null ? c3 : ""});
      });
      return c2;
    }
    var Ui = typeof WeakSet === "function" ? WeakSet : Set;
    function Vi(a2) {
      var b2 = a2.ref;
      if (b2 !== null)
        if (typeof b2 === "function")
          try {
            b2(null);
          } catch (c2) {
            Wi(a2, c2);
          }
        else
          b2.current = null;
    }
    function Xi(a2, b2) {
      switch (b2.tag) {
        case 0:
        case 11:
        case 15:
        case 22:
          return;
        case 1:
          if (b2.flags & 256 && a2 !== null) {
            var c2 = a2.memoizedProps, d = a2.memoizedState;
            a2 = b2.stateNode;
            b2 = a2.getSnapshotBeforeUpdate(b2.elementType === b2.type ? c2 : lg(b2.type, c2), d);
            a2.__reactInternalSnapshotBeforeUpdate = b2;
          }
          return;
        case 3:
          b2.flags & 256 && qf(b2.stateNode.containerInfo);
          return;
        case 5:
        case 6:
        case 4:
        case 17:
          return;
      }
      throw Error(y(163));
    }
    function Yi(a2, b2, c2) {
      switch (c2.tag) {
        case 0:
        case 11:
        case 15:
        case 22:
          b2 = c2.updateQueue;
          b2 = b2 !== null ? b2.lastEffect : null;
          if (b2 !== null) {
            a2 = b2 = b2.next;
            do {
              if ((a2.tag & 3) === 3) {
                var d = a2.create;
                a2.destroy = d();
              }
              a2 = a2.next;
            } while (a2 !== b2);
          }
          b2 = c2.updateQueue;
          b2 = b2 !== null ? b2.lastEffect : null;
          if (b2 !== null) {
            a2 = b2 = b2.next;
            do {
              var e = a2;
              d = e.next;
              e = e.tag;
              (e & 4) !== 0 && (e & 1) !== 0 && (Zi(c2, a2), $i(c2, a2));
              a2 = d;
            } while (a2 !== b2);
          }
          return;
        case 1:
          a2 = c2.stateNode;
          c2.flags & 4 && (b2 === null ? a2.componentDidMount() : (d = c2.elementType === c2.type ? b2.memoizedProps : lg(c2.type, b2.memoizedProps), a2.componentDidUpdate(d, b2.memoizedState, a2.__reactInternalSnapshotBeforeUpdate)));
          b2 = c2.updateQueue;
          b2 !== null && Eg(c2, b2, a2);
          return;
        case 3:
          b2 = c2.updateQueue;
          if (b2 !== null) {
            a2 = null;
            if (c2.child !== null)
              switch (c2.child.tag) {
                case 5:
                  a2 = c2.child.stateNode;
                  break;
                case 1:
                  a2 = c2.child.stateNode;
              }
            Eg(c2, b2, a2);
          }
          return;
        case 5:
          a2 = c2.stateNode;
          b2 === null && c2.flags & 4 && mf(c2.type, c2.memoizedProps) && a2.focus();
          return;
        case 6:
          return;
        case 4:
          return;
        case 12:
          return;
        case 13:
          c2.memoizedState === null && (c2 = c2.alternate, c2 !== null && (c2 = c2.memoizedState, c2 !== null && (c2 = c2.dehydrated, c2 !== null && Cc(c2))));
          return;
        case 19:
        case 17:
        case 20:
        case 21:
        case 23:
        case 24:
          return;
      }
      throw Error(y(163));
    }
    function aj(a2, b2) {
      for (var c2 = a2; ; ) {
        if (c2.tag === 5) {
          var d = c2.stateNode;
          if (b2)
            d = d.style, typeof d.setProperty === "function" ? d.setProperty("display", "none", "important") : d.display = "none";
          else {
            d = c2.stateNode;
            var e = c2.memoizedProps.style;
            e = e !== void 0 && e !== null && e.hasOwnProperty("display") ? e.display : null;
            d.style.display = sb("display", e);
          }
        } else if (c2.tag === 6)
          c2.stateNode.nodeValue = b2 ? "" : c2.memoizedProps;
        else if ((c2.tag !== 23 && c2.tag !== 24 || c2.memoizedState === null || c2 === a2) && c2.child !== null) {
          c2.child.return = c2;
          c2 = c2.child;
          continue;
        }
        if (c2 === a2)
          break;
        for (; c2.sibling === null; ) {
          if (c2.return === null || c2.return === a2)
            return;
          c2 = c2.return;
        }
        c2.sibling.return = c2.return;
        c2 = c2.sibling;
      }
    }
    function bj(a2, b2) {
      if (Mf && typeof Mf.onCommitFiberUnmount === "function")
        try {
          Mf.onCommitFiberUnmount(Lf, b2);
        } catch (f) {
        }
      switch (b2.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
        case 22:
          a2 = b2.updateQueue;
          if (a2 !== null && (a2 = a2.lastEffect, a2 !== null)) {
            var c2 = a2 = a2.next;
            do {
              var d = c2, e = d.destroy;
              d = d.tag;
              if (e !== void 0)
                if ((d & 4) !== 0)
                  Zi(b2, c2);
                else {
                  d = b2;
                  try {
                    e();
                  } catch (f) {
                    Wi(d, f);
                  }
                }
              c2 = c2.next;
            } while (c2 !== a2);
          }
          break;
        case 1:
          Vi(b2);
          a2 = b2.stateNode;
          if (typeof a2.componentWillUnmount === "function")
            try {
              a2.props = b2.memoizedProps, a2.state = b2.memoizedState, a2.componentWillUnmount();
            } catch (f) {
              Wi(b2, f);
            }
          break;
        case 5:
          Vi(b2);
          break;
        case 4:
          cj(a2, b2);
      }
    }
    function dj(a2) {
      a2.alternate = null;
      a2.child = null;
      a2.dependencies = null;
      a2.firstEffect = null;
      a2.lastEffect = null;
      a2.memoizedProps = null;
      a2.memoizedState = null;
      a2.pendingProps = null;
      a2.return = null;
      a2.updateQueue = null;
    }
    function ej(a2) {
      return a2.tag === 5 || a2.tag === 3 || a2.tag === 4;
    }
    function fj(a2) {
      a: {
        for (var b2 = a2.return; b2 !== null; ) {
          if (ej(b2))
            break a;
          b2 = b2.return;
        }
        throw Error(y(160));
      }
      var c2 = b2;
      b2 = c2.stateNode;
      switch (c2.tag) {
        case 5:
          var d = false;
          break;
        case 3:
          b2 = b2.containerInfo;
          d = true;
          break;
        case 4:
          b2 = b2.containerInfo;
          d = true;
          break;
        default:
          throw Error(y(161));
      }
      c2.flags & 16 && (pb(b2, ""), c2.flags &= -17);
      a:
        b:
          for (c2 = a2; ; ) {
            for (; c2.sibling === null; ) {
              if (c2.return === null || ej(c2.return)) {
                c2 = null;
                break a;
              }
              c2 = c2.return;
            }
            c2.sibling.return = c2.return;
            for (c2 = c2.sibling; c2.tag !== 5 && c2.tag !== 6 && c2.tag !== 18; ) {
              if (c2.flags & 2)
                continue b;
              if (c2.child === null || c2.tag === 4)
                continue b;
              else
                c2.child.return = c2, c2 = c2.child;
            }
            if (!(c2.flags & 2)) {
              c2 = c2.stateNode;
              break a;
            }
          }
      d ? gj(a2, c2, b2) : hj(a2, c2, b2);
    }
    function gj(a2, b2, c2) {
      var d = a2.tag, e = d === 5 || d === 6;
      if (e)
        a2 = e ? a2.stateNode : a2.stateNode.instance, b2 ? c2.nodeType === 8 ? c2.parentNode.insertBefore(a2, b2) : c2.insertBefore(a2, b2) : (c2.nodeType === 8 ? (b2 = c2.parentNode, b2.insertBefore(a2, c2)) : (b2 = c2, b2.appendChild(a2)), c2 = c2._reactRootContainer, c2 !== null && c2 !== void 0 || b2.onclick !== null || (b2.onclick = jf));
      else if (d !== 4 && (a2 = a2.child, a2 !== null))
        for (gj(a2, b2, c2), a2 = a2.sibling; a2 !== null; )
          gj(a2, b2, c2), a2 = a2.sibling;
    }
    function hj(a2, b2, c2) {
      var d = a2.tag, e = d === 5 || d === 6;
      if (e)
        a2 = e ? a2.stateNode : a2.stateNode.instance, b2 ? c2.insertBefore(a2, b2) : c2.appendChild(a2);
      else if (d !== 4 && (a2 = a2.child, a2 !== null))
        for (hj(a2, b2, c2), a2 = a2.sibling; a2 !== null; )
          hj(a2, b2, c2), a2 = a2.sibling;
    }
    function cj(a2, b2) {
      for (var c2 = b2, d = false, e, f; ; ) {
        if (!d) {
          d = c2.return;
          a:
            for (; ; ) {
              if (d === null)
                throw Error(y(160));
              e = d.stateNode;
              switch (d.tag) {
                case 5:
                  f = false;
                  break a;
                case 3:
                  e = e.containerInfo;
                  f = true;
                  break a;
                case 4:
                  e = e.containerInfo;
                  f = true;
                  break a;
              }
              d = d.return;
            }
          d = true;
        }
        if (c2.tag === 5 || c2.tag === 6) {
          a:
            for (var g = a2, h = c2, k = h; ; )
              if (bj(g, k), k.child !== null && k.tag !== 4)
                k.child.return = k, k = k.child;
              else {
                if (k === h)
                  break a;
                for (; k.sibling === null; ) {
                  if (k.return === null || k.return === h)
                    break a;
                  k = k.return;
                }
                k.sibling.return = k.return;
                k = k.sibling;
              }
          f ? (g = e, h = c2.stateNode, g.nodeType === 8 ? g.parentNode.removeChild(h) : g.removeChild(h)) : e.removeChild(c2.stateNode);
        } else if (c2.tag === 4) {
          if (c2.child !== null) {
            e = c2.stateNode.containerInfo;
            f = true;
            c2.child.return = c2;
            c2 = c2.child;
            continue;
          }
        } else if (bj(a2, c2), c2.child !== null) {
          c2.child.return = c2;
          c2 = c2.child;
          continue;
        }
        if (c2 === b2)
          break;
        for (; c2.sibling === null; ) {
          if (c2.return === null || c2.return === b2)
            return;
          c2 = c2.return;
          c2.tag === 4 && (d = false);
        }
        c2.sibling.return = c2.return;
        c2 = c2.sibling;
      }
    }
    function ij(a2, b2) {
      switch (b2.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
        case 22:
          var c2 = b2.updateQueue;
          c2 = c2 !== null ? c2.lastEffect : null;
          if (c2 !== null) {
            var d = c2 = c2.next;
            do
              (d.tag & 3) === 3 && (a2 = d.destroy, d.destroy = void 0, a2 !== void 0 && a2()), d = d.next;
            while (d !== c2);
          }
          return;
        case 1:
          return;
        case 5:
          c2 = b2.stateNode;
          if (c2 != null) {
            d = b2.memoizedProps;
            var e = a2 !== null ? a2.memoizedProps : d;
            a2 = b2.type;
            var f = b2.updateQueue;
            b2.updateQueue = null;
            if (f !== null) {
              c2[xf] = d;
              a2 === "input" && d.type === "radio" && d.name != null && $a(c2, d);
              wb(a2, e);
              b2 = wb(a2, d);
              for (e = 0; e < f.length; e += 2) {
                var g = f[e], h = f[e + 1];
                g === "style" ? tb(c2, h) : g === "dangerouslySetInnerHTML" ? ob(c2, h) : g === "children" ? pb(c2, h) : qa(c2, g, h, b2);
              }
              switch (a2) {
                case "input":
                  ab(c2, d);
                  break;
                case "textarea":
                  ib(c2, d);
                  break;
                case "select":
                  a2 = c2._wrapperState.wasMultiple, c2._wrapperState.wasMultiple = !!d.multiple, f = d.value, f != null ? fb(c2, !!d.multiple, f, false) : a2 !== !!d.multiple && (d.defaultValue != null ? fb(c2, !!d.multiple, d.defaultValue, true) : fb(c2, !!d.multiple, d.multiple ? [] : "", false));
              }
            }
          }
          return;
        case 6:
          if (b2.stateNode === null)
            throw Error(y(162));
          b2.stateNode.nodeValue = b2.memoizedProps;
          return;
        case 3:
          c2 = b2.stateNode;
          c2.hydrate && (c2.hydrate = false, Cc(c2.containerInfo));
          return;
        case 12:
          return;
        case 13:
          b2.memoizedState !== null && (jj = O(), aj(b2.child, true));
          kj(b2);
          return;
        case 19:
          kj(b2);
          return;
        case 17:
          return;
        case 23:
        case 24:
          aj(b2, b2.memoizedState !== null);
          return;
      }
      throw Error(y(163));
    }
    function kj(a2) {
      var b2 = a2.updateQueue;
      if (b2 !== null) {
        a2.updateQueue = null;
        var c2 = a2.stateNode;
        c2 === null && (c2 = a2.stateNode = new Ui());
        b2.forEach(function(b3) {
          var d = lj.bind(null, a2, b3);
          c2.has(b3) || (c2.add(b3), b3.then(d, d));
        });
      }
    }
    function mj(a2, b2) {
      return a2 !== null && (a2 = a2.memoizedState, a2 === null || a2.dehydrated !== null) ? (b2 = b2.memoizedState, b2 !== null && b2.dehydrated === null) : false;
    }
    var nj = Math.ceil;
    var oj = ra.ReactCurrentDispatcher;
    var pj = ra.ReactCurrentOwner;
    var X = 0;
    var U = null;
    var Y = null;
    var W = 0;
    var qj = 0;
    var rj = Bf(0);
    var V = 0;
    var sj = null;
    var tj = 0;
    var Dg = 0;
    var Hi = 0;
    var uj = 0;
    var vj = null;
    var jj = 0;
    var Ji = Infinity;
    function wj() {
      Ji = O() + 500;
    }
    var Z = null;
    var Qi = false;
    var Ri = null;
    var Ti = null;
    var xj = false;
    var yj = null;
    var zj = 90;
    var Aj = [];
    var Bj = [];
    var Cj = null;
    var Dj = 0;
    var Ej = null;
    var Fj = -1;
    var Gj = 0;
    var Hj = 0;
    var Ij = null;
    var Jj = false;
    function Hg() {
      return (X & 48) !== 0 ? O() : Fj !== -1 ? Fj : Fj = O();
    }
    function Ig(a2) {
      a2 = a2.mode;
      if ((a2 & 2) === 0)
        return 1;
      if ((a2 & 4) === 0)
        return eg() === 99 ? 1 : 2;
      Gj === 0 && (Gj = tj);
      if (kg.transition !== 0) {
        Hj !== 0 && (Hj = vj !== null ? vj.pendingLanes : 0);
        a2 = Gj;
        var b2 = 4186112 & ~Hj;
        b2 &= -b2;
        b2 === 0 && (a2 = 4186112 & ~a2, b2 = a2 & -a2, b2 === 0 && (b2 = 8192));
        return b2;
      }
      a2 = eg();
      (X & 4) !== 0 && a2 === 98 ? a2 = Xc(12, Gj) : (a2 = Sc(a2), a2 = Xc(a2, Gj));
      return a2;
    }
    function Jg(a2, b2, c2) {
      if (50 < Dj)
        throw Dj = 0, Ej = null, Error(y(185));
      a2 = Kj(a2, b2);
      if (a2 === null)
        return null;
      $c(a2, b2, c2);
      a2 === U && (Hi |= b2, V === 4 && Ii(a2, W));
      var d = eg();
      b2 === 1 ? (X & 8) !== 0 && (X & 48) === 0 ? Lj(a2) : (Mj(a2, c2), X === 0 && (wj(), ig())) : ((X & 4) === 0 || d !== 98 && d !== 99 || (Cj === null ? Cj = new Set([a2]) : Cj.add(a2)), Mj(a2, c2));
      vj = a2;
    }
    function Kj(a2, b2) {
      a2.lanes |= b2;
      var c2 = a2.alternate;
      c2 !== null && (c2.lanes |= b2);
      c2 = a2;
      for (a2 = a2.return; a2 !== null; )
        a2.childLanes |= b2, c2 = a2.alternate, c2 !== null && (c2.childLanes |= b2), c2 = a2, a2 = a2.return;
      return c2.tag === 3 ? c2.stateNode : null;
    }
    function Mj(a2, b2) {
      for (var c2 = a2.callbackNode, d = a2.suspendedLanes, e = a2.pingedLanes, f = a2.expirationTimes, g = a2.pendingLanes; 0 < g; ) {
        var h = 31 - Vc(g), k = 1 << h, l = f[h];
        if (l === -1) {
          if ((k & d) === 0 || (k & e) !== 0) {
            l = b2;
            Rc(k);
            var n = F;
            f[h] = 10 <= n ? l + 250 : 6 <= n ? l + 5e3 : -1;
          }
        } else
          l <= b2 && (a2.expiredLanes |= k);
        g &= ~k;
      }
      d = Uc(a2, a2 === U ? W : 0);
      b2 = F;
      if (d === 0)
        c2 !== null && (c2 !== Zf && Pf(c2), a2.callbackNode = null, a2.callbackPriority = 0);
      else {
        if (c2 !== null) {
          if (a2.callbackPriority === b2)
            return;
          c2 !== Zf && Pf(c2);
        }
        b2 === 15 ? (c2 = Lj.bind(null, a2), ag === null ? (ag = [c2], bg = Of(Uf, jg)) : ag.push(c2), c2 = Zf) : b2 === 14 ? c2 = hg(99, Lj.bind(null, a2)) : (c2 = Tc(b2), c2 = hg(c2, Nj.bind(null, a2)));
        a2.callbackPriority = b2;
        a2.callbackNode = c2;
      }
    }
    function Nj(a2) {
      Fj = -1;
      Hj = Gj = 0;
      if ((X & 48) !== 0)
        throw Error(y(327));
      var b2 = a2.callbackNode;
      if (Oj() && a2.callbackNode !== b2)
        return null;
      var c2 = Uc(a2, a2 === U ? W : 0);
      if (c2 === 0)
        return null;
      var d = c2;
      var e = X;
      X |= 16;
      var f = Pj();
      if (U !== a2 || W !== d)
        wj(), Qj(a2, d);
      do
        try {
          Rj();
          break;
        } catch (h) {
          Sj(a2, h);
        }
      while (1);
      qg();
      oj.current = f;
      X = e;
      Y !== null ? d = 0 : (U = null, W = 0, d = V);
      if ((tj & Hi) !== 0)
        Qj(a2, 0);
      else if (d !== 0) {
        d === 2 && (X |= 64, a2.hydrate && (a2.hydrate = false, qf(a2.containerInfo)), c2 = Wc(a2), c2 !== 0 && (d = Tj(a2, c2)));
        if (d === 1)
          throw b2 = sj, Qj(a2, 0), Ii(a2, c2), Mj(a2, O()), b2;
        a2.finishedWork = a2.current.alternate;
        a2.finishedLanes = c2;
        switch (d) {
          case 0:
          case 1:
            throw Error(y(345));
          case 2:
            Uj(a2);
            break;
          case 3:
            Ii(a2, c2);
            if ((c2 & 62914560) === c2 && (d = jj + 500 - O(), 10 < d)) {
              if (Uc(a2, 0) !== 0)
                break;
              e = a2.suspendedLanes;
              if ((e & c2) !== c2) {
                Hg();
                a2.pingedLanes |= a2.suspendedLanes & e;
                break;
              }
              a2.timeoutHandle = of(Uj.bind(null, a2), d);
              break;
            }
            Uj(a2);
            break;
          case 4:
            Ii(a2, c2);
            if ((c2 & 4186112) === c2)
              break;
            d = a2.eventTimes;
            for (e = -1; 0 < c2; ) {
              var g = 31 - Vc(c2);
              f = 1 << g;
              g = d[g];
              g > e && (e = g);
              c2 &= ~f;
            }
            c2 = e;
            c2 = O() - c2;
            c2 = (120 > c2 ? 120 : 480 > c2 ? 480 : 1080 > c2 ? 1080 : 1920 > c2 ? 1920 : 3e3 > c2 ? 3e3 : 4320 > c2 ? 4320 : 1960 * nj(c2 / 1960)) - c2;
            if (10 < c2) {
              a2.timeoutHandle = of(Uj.bind(null, a2), c2);
              break;
            }
            Uj(a2);
            break;
          case 5:
            Uj(a2);
            break;
          default:
            throw Error(y(329));
        }
      }
      Mj(a2, O());
      return a2.callbackNode === b2 ? Nj.bind(null, a2) : null;
    }
    function Ii(a2, b2) {
      b2 &= ~uj;
      b2 &= ~Hi;
      a2.suspendedLanes |= b2;
      a2.pingedLanes &= ~b2;
      for (a2 = a2.expirationTimes; 0 < b2; ) {
        var c2 = 31 - Vc(b2), d = 1 << c2;
        a2[c2] = -1;
        b2 &= ~d;
      }
    }
    function Lj(a2) {
      if ((X & 48) !== 0)
        throw Error(y(327));
      Oj();
      if (a2 === U && (a2.expiredLanes & W) !== 0) {
        var b2 = W;
        var c2 = Tj(a2, b2);
        (tj & Hi) !== 0 && (b2 = Uc(a2, b2), c2 = Tj(a2, b2));
      } else
        b2 = Uc(a2, 0), c2 = Tj(a2, b2);
      a2.tag !== 0 && c2 === 2 && (X |= 64, a2.hydrate && (a2.hydrate = false, qf(a2.containerInfo)), b2 = Wc(a2), b2 !== 0 && (c2 = Tj(a2, b2)));
      if (c2 === 1)
        throw c2 = sj, Qj(a2, 0), Ii(a2, b2), Mj(a2, O()), c2;
      a2.finishedWork = a2.current.alternate;
      a2.finishedLanes = b2;
      Uj(a2);
      Mj(a2, O());
      return null;
    }
    function Vj() {
      if (Cj !== null) {
        var a2 = Cj;
        Cj = null;
        a2.forEach(function(a3) {
          a3.expiredLanes |= 24 & a3.pendingLanes;
          Mj(a3, O());
        });
      }
      ig();
    }
    function Wj(a2, b2) {
      var c2 = X;
      X |= 1;
      try {
        return a2(b2);
      } finally {
        X = c2, X === 0 && (wj(), ig());
      }
    }
    function Xj(a2, b2) {
      var c2 = X;
      X &= -2;
      X |= 8;
      try {
        return a2(b2);
      } finally {
        X = c2, X === 0 && (wj(), ig());
      }
    }
    function ni(a2, b2) {
      I(rj, qj);
      qj |= b2;
      tj |= b2;
    }
    function Ki() {
      qj = rj.current;
      H(rj);
    }
    function Qj(a2, b2) {
      a2.finishedWork = null;
      a2.finishedLanes = 0;
      var c2 = a2.timeoutHandle;
      c2 !== -1 && (a2.timeoutHandle = -1, pf(c2));
      if (Y !== null)
        for (c2 = Y.return; c2 !== null; ) {
          var d = c2;
          switch (d.tag) {
            case 1:
              d = d.type.childContextTypes;
              d !== null && d !== void 0 && Gf();
              break;
            case 3:
              fh();
              H(N);
              H(M);
              uh();
              break;
            case 5:
              hh(d);
              break;
            case 4:
              fh();
              break;
            case 13:
              H(P);
              break;
            case 19:
              H(P);
              break;
            case 10:
              rg(d);
              break;
            case 23:
            case 24:
              Ki();
          }
          c2 = c2.return;
        }
      U = a2;
      Y = Tg(a2.current, null);
      W = qj = tj = b2;
      V = 0;
      sj = null;
      uj = Hi = Dg = 0;
    }
    function Sj(a2, b2) {
      do {
        var c2 = Y;
        try {
          qg();
          vh2.current = Gh;
          if (yh) {
            for (var d = R.memoizedState; d !== null; ) {
              var e = d.queue;
              e !== null && (e.pending = null);
              d = d.next;
            }
            yh = false;
          }
          xh = 0;
          T = S = R = null;
          zh = false;
          pj.current = null;
          if (c2 === null || c2.return === null) {
            V = 1;
            sj = b2;
            Y = null;
            break;
          }
          a: {
            var f = a2, g = c2.return, h = c2, k = b2;
            b2 = W;
            h.flags |= 2048;
            h.firstEffect = h.lastEffect = null;
            if (k !== null && typeof k === "object" && typeof k.then === "function") {
              var l = k;
              if ((h.mode & 2) === 0) {
                var n = h.alternate;
                n ? (h.updateQueue = n.updateQueue, h.memoizedState = n.memoizedState, h.lanes = n.lanes) : (h.updateQueue = null, h.memoizedState = null);
              }
              var A = (P.current & 1) !== 0, p = g;
              do {
                var C;
                if (C = p.tag === 13) {
                  var x = p.memoizedState;
                  if (x !== null)
                    C = x.dehydrated !== null ? true : false;
                  else {
                    var w = p.memoizedProps;
                    C = w.fallback === void 0 ? false : w.unstable_avoidThisFallback !== true ? true : A ? false : true;
                  }
                }
                if (C) {
                  var z = p.updateQueue;
                  if (z === null) {
                    var u = new Set();
                    u.add(l);
                    p.updateQueue = u;
                  } else
                    z.add(l);
                  if ((p.mode & 2) === 0) {
                    p.flags |= 64;
                    h.flags |= 16384;
                    h.flags &= -2981;
                    if (h.tag === 1)
                      if (h.alternate === null)
                        h.tag = 17;
                      else {
                        var t = zg(-1, 1);
                        t.tag = 2;
                        Ag(h, t);
                      }
                    h.lanes |= 1;
                    break a;
                  }
                  k = void 0;
                  h = b2;
                  var q = f.pingCache;
                  q === null ? (q = f.pingCache = new Oi(), k = new Set(), q.set(l, k)) : (k = q.get(l), k === void 0 && (k = new Set(), q.set(l, k)));
                  if (!k.has(h)) {
                    k.add(h);
                    var v = Yj.bind(null, f, l, h);
                    l.then(v, v);
                  }
                  p.flags |= 4096;
                  p.lanes = b2;
                  break a;
                }
                p = p.return;
              } while (p !== null);
              k = Error((Ra(h.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.");
            }
            V !== 5 && (V = 2);
            k = Mi(k, h);
            p = g;
            do {
              switch (p.tag) {
                case 3:
                  f = k;
                  p.flags |= 4096;
                  b2 &= -b2;
                  p.lanes |= b2;
                  var J = Pi(p, f, b2);
                  Bg(p, J);
                  break a;
                case 1:
                  f = k;
                  var K = p.type, Q = p.stateNode;
                  if ((p.flags & 64) === 0 && (typeof K.getDerivedStateFromError === "function" || Q !== null && typeof Q.componentDidCatch === "function" && (Ti === null || !Ti.has(Q)))) {
                    p.flags |= 4096;
                    b2 &= -b2;
                    p.lanes |= b2;
                    var L = Si(p, f, b2);
                    Bg(p, L);
                    break a;
                  }
              }
              p = p.return;
            } while (p !== null);
          }
          Zj(c2);
        } catch (va) {
          b2 = va;
          Y === c2 && c2 !== null && (Y = c2 = c2.return);
          continue;
        }
        break;
      } while (1);
    }
    function Pj() {
      var a2 = oj.current;
      oj.current = Gh;
      return a2 === null ? Gh : a2;
    }
    function Tj(a2, b2) {
      var c2 = X;
      X |= 16;
      var d = Pj();
      U === a2 && W === b2 || Qj(a2, b2);
      do
        try {
          ak();
          break;
        } catch (e) {
          Sj(a2, e);
        }
      while (1);
      qg();
      X = c2;
      oj.current = d;
      if (Y !== null)
        throw Error(y(261));
      U = null;
      W = 0;
      return V;
    }
    function ak() {
      for (; Y !== null; )
        bk(Y);
    }
    function Rj() {
      for (; Y !== null && !Qf(); )
        bk(Y);
    }
    function bk(a2) {
      var b2 = ck(a2.alternate, a2, qj);
      a2.memoizedProps = a2.pendingProps;
      b2 === null ? Zj(a2) : Y = b2;
      pj.current = null;
    }
    function Zj(a2) {
      var b2 = a2;
      do {
        var c2 = b2.alternate;
        a2 = b2.return;
        if ((b2.flags & 2048) === 0) {
          c2 = Gi(c2, b2, qj);
          if (c2 !== null) {
            Y = c2;
            return;
          }
          c2 = b2;
          if (c2.tag !== 24 && c2.tag !== 23 || c2.memoizedState === null || (qj & 1073741824) !== 0 || (c2.mode & 4) === 0) {
            for (var d = 0, e = c2.child; e !== null; )
              d |= e.lanes | e.childLanes, e = e.sibling;
            c2.childLanes = d;
          }
          a2 !== null && (a2.flags & 2048) === 0 && (a2.firstEffect === null && (a2.firstEffect = b2.firstEffect), b2.lastEffect !== null && (a2.lastEffect !== null && (a2.lastEffect.nextEffect = b2.firstEffect), a2.lastEffect = b2.lastEffect), 1 < b2.flags && (a2.lastEffect !== null ? a2.lastEffect.nextEffect = b2 : a2.firstEffect = b2, a2.lastEffect = b2));
        } else {
          c2 = Li(b2);
          if (c2 !== null) {
            c2.flags &= 2047;
            Y = c2;
            return;
          }
          a2 !== null && (a2.firstEffect = a2.lastEffect = null, a2.flags |= 2048);
        }
        b2 = b2.sibling;
        if (b2 !== null) {
          Y = b2;
          return;
        }
        Y = b2 = a2;
      } while (b2 !== null);
      V === 0 && (V = 5);
    }
    function Uj(a2) {
      var b2 = eg();
      gg(99, dk.bind(null, a2, b2));
      return null;
    }
    function dk(a2, b2) {
      do
        Oj();
      while (yj !== null);
      if ((X & 48) !== 0)
        throw Error(y(327));
      var c2 = a2.finishedWork;
      if (c2 === null)
        return null;
      a2.finishedWork = null;
      a2.finishedLanes = 0;
      if (c2 === a2.current)
        throw Error(y(177));
      a2.callbackNode = null;
      var d = c2.lanes | c2.childLanes, e = d, f = a2.pendingLanes & ~e;
      a2.pendingLanes = e;
      a2.suspendedLanes = 0;
      a2.pingedLanes = 0;
      a2.expiredLanes &= e;
      a2.mutableReadLanes &= e;
      a2.entangledLanes &= e;
      e = a2.entanglements;
      for (var g = a2.eventTimes, h = a2.expirationTimes; 0 < f; ) {
        var k = 31 - Vc(f), l = 1 << k;
        e[k] = 0;
        g[k] = -1;
        h[k] = -1;
        f &= ~l;
      }
      Cj !== null && (d & 24) === 0 && Cj.has(a2) && Cj.delete(a2);
      a2 === U && (Y = U = null, W = 0);
      1 < c2.flags ? c2.lastEffect !== null ? (c2.lastEffect.nextEffect = c2, d = c2.firstEffect) : d = c2 : d = c2.firstEffect;
      if (d !== null) {
        e = X;
        X |= 32;
        pj.current = null;
        kf = fd;
        g = Ne();
        if (Oe(g)) {
          if ("selectionStart" in g)
            h = {start: g.selectionStart, end: g.selectionEnd};
          else
            a:
              if (h = (h = g.ownerDocument) && h.defaultView || window, (l = h.getSelection && h.getSelection()) && l.rangeCount !== 0) {
                h = l.anchorNode;
                f = l.anchorOffset;
                k = l.focusNode;
                l = l.focusOffset;
                try {
                  h.nodeType, k.nodeType;
                } catch (va) {
                  h = null;
                  break a;
                }
                var n = 0, A = -1, p = -1, C = 0, x = 0, w = g, z = null;
                b:
                  for (; ; ) {
                    for (var u; ; ) {
                      w !== h || f !== 0 && w.nodeType !== 3 || (A = n + f);
                      w !== k || l !== 0 && w.nodeType !== 3 || (p = n + l);
                      w.nodeType === 3 && (n += w.nodeValue.length);
                      if ((u = w.firstChild) === null)
                        break;
                      z = w;
                      w = u;
                    }
                    for (; ; ) {
                      if (w === g)
                        break b;
                      z === h && ++C === f && (A = n);
                      z === k && ++x === l && (p = n);
                      if ((u = w.nextSibling) !== null)
                        break;
                      w = z;
                      z = w.parentNode;
                    }
                    w = u;
                  }
                h = A === -1 || p === -1 ? null : {start: A, end: p};
              } else
                h = null;
          h = h || {start: 0, end: 0};
        } else
          h = null;
        lf = {focusedElem: g, selectionRange: h};
        fd = false;
        Ij = null;
        Jj = false;
        Z = d;
        do
          try {
            ek();
          } catch (va) {
            if (Z === null)
              throw Error(y(330));
            Wi(Z, va);
            Z = Z.nextEffect;
          }
        while (Z !== null);
        Ij = null;
        Z = d;
        do
          try {
            for (g = a2; Z !== null; ) {
              var t = Z.flags;
              t & 16 && pb(Z.stateNode, "");
              if (t & 128) {
                var q = Z.alternate;
                if (q !== null) {
                  var v = q.ref;
                  v !== null && (typeof v === "function" ? v(null) : v.current = null);
                }
              }
              switch (t & 1038) {
                case 2:
                  fj(Z);
                  Z.flags &= -3;
                  break;
                case 6:
                  fj(Z);
                  Z.flags &= -3;
                  ij(Z.alternate, Z);
                  break;
                case 1024:
                  Z.flags &= -1025;
                  break;
                case 1028:
                  Z.flags &= -1025;
                  ij(Z.alternate, Z);
                  break;
                case 4:
                  ij(Z.alternate, Z);
                  break;
                case 8:
                  h = Z;
                  cj(g, h);
                  var J = h.alternate;
                  dj(h);
                  J !== null && dj(J);
              }
              Z = Z.nextEffect;
            }
          } catch (va) {
            if (Z === null)
              throw Error(y(330));
            Wi(Z, va);
            Z = Z.nextEffect;
          }
        while (Z !== null);
        v = lf;
        q = Ne();
        t = v.focusedElem;
        g = v.selectionRange;
        if (q !== t && t && t.ownerDocument && Me(t.ownerDocument.documentElement, t)) {
          g !== null && Oe(t) && (q = g.start, v = g.end, v === void 0 && (v = q), "selectionStart" in t ? (t.selectionStart = q, t.selectionEnd = Math.min(v, t.value.length)) : (v = (q = t.ownerDocument || document) && q.defaultView || window, v.getSelection && (v = v.getSelection(), h = t.textContent.length, J = Math.min(g.start, h), g = g.end === void 0 ? J : Math.min(g.end, h), !v.extend && J > g && (h = g, g = J, J = h), h = Le(t, J), f = Le(t, g), h && f && (v.rangeCount !== 1 || v.anchorNode !== h.node || v.anchorOffset !== h.offset || v.focusNode !== f.node || v.focusOffset !== f.offset) && (q = q.createRange(), q.setStart(h.node, h.offset), v.removeAllRanges(), J > g ? (v.addRange(q), v.extend(f.node, f.offset)) : (q.setEnd(f.node, f.offset), v.addRange(q))))));
          q = [];
          for (v = t; v = v.parentNode; )
            v.nodeType === 1 && q.push({element: v, left: v.scrollLeft, top: v.scrollTop});
          typeof t.focus === "function" && t.focus();
          for (t = 0; t < q.length; t++)
            v = q[t], v.element.scrollLeft = v.left, v.element.scrollTop = v.top;
        }
        fd = !!kf;
        lf = kf = null;
        a2.current = c2;
        Z = d;
        do
          try {
            for (t = a2; Z !== null; ) {
              var K = Z.flags;
              K & 36 && Yi(t, Z.alternate, Z);
              if (K & 128) {
                q = void 0;
                var Q = Z.ref;
                if (Q !== null) {
                  var L = Z.stateNode;
                  switch (Z.tag) {
                    case 5:
                      q = L;
                      break;
                    default:
                      q = L;
                  }
                  typeof Q === "function" ? Q(q) : Q.current = q;
                }
              }
              Z = Z.nextEffect;
            }
          } catch (va) {
            if (Z === null)
              throw Error(y(330));
            Wi(Z, va);
            Z = Z.nextEffect;
          }
        while (Z !== null);
        Z = null;
        $f();
        X = e;
      } else
        a2.current = c2;
      if (xj)
        xj = false, yj = a2, zj = b2;
      else
        for (Z = d; Z !== null; )
          b2 = Z.nextEffect, Z.nextEffect = null, Z.flags & 8 && (K = Z, K.sibling = null, K.stateNode = null), Z = b2;
      d = a2.pendingLanes;
      d === 0 && (Ti = null);
      d === 1 ? a2 === Ej ? Dj++ : (Dj = 0, Ej = a2) : Dj = 0;
      c2 = c2.stateNode;
      if (Mf && typeof Mf.onCommitFiberRoot === "function")
        try {
          Mf.onCommitFiberRoot(Lf, c2, void 0, (c2.current.flags & 64) === 64);
        } catch (va) {
        }
      Mj(a2, O());
      if (Qi)
        throw Qi = false, a2 = Ri, Ri = null, a2;
      if ((X & 8) !== 0)
        return null;
      ig();
      return null;
    }
    function ek() {
      for (; Z !== null; ) {
        var a2 = Z.alternate;
        Jj || Ij === null || ((Z.flags & 8) !== 0 ? dc(Z, Ij) && (Jj = true) : Z.tag === 13 && mj(a2, Z) && dc(Z, Ij) && (Jj = true));
        var b2 = Z.flags;
        (b2 & 256) !== 0 && Xi(a2, Z);
        (b2 & 512) === 0 || xj || (xj = true, hg(97, function() {
          Oj();
          return null;
        }));
        Z = Z.nextEffect;
      }
    }
    function Oj() {
      if (zj !== 90) {
        var a2 = 97 < zj ? 97 : zj;
        zj = 90;
        return gg(a2, fk);
      }
      return false;
    }
    function $i(a2, b2) {
      Aj.push(b2, a2);
      xj || (xj = true, hg(97, function() {
        Oj();
        return null;
      }));
    }
    function Zi(a2, b2) {
      Bj.push(b2, a2);
      xj || (xj = true, hg(97, function() {
        Oj();
        return null;
      }));
    }
    function fk() {
      if (yj === null)
        return false;
      var a2 = yj;
      yj = null;
      if ((X & 48) !== 0)
        throw Error(y(331));
      var b2 = X;
      X |= 32;
      var c2 = Bj;
      Bj = [];
      for (var d = 0; d < c2.length; d += 2) {
        var e = c2[d], f = c2[d + 1], g = e.destroy;
        e.destroy = void 0;
        if (typeof g === "function")
          try {
            g();
          } catch (k) {
            if (f === null)
              throw Error(y(330));
            Wi(f, k);
          }
      }
      c2 = Aj;
      Aj = [];
      for (d = 0; d < c2.length; d += 2) {
        e = c2[d];
        f = c2[d + 1];
        try {
          var h = e.create;
          e.destroy = h();
        } catch (k) {
          if (f === null)
            throw Error(y(330));
          Wi(f, k);
        }
      }
      for (h = a2.current.firstEffect; h !== null; )
        a2 = h.nextEffect, h.nextEffect = null, h.flags & 8 && (h.sibling = null, h.stateNode = null), h = a2;
      X = b2;
      ig();
      return true;
    }
    function gk(a2, b2, c2) {
      b2 = Mi(c2, b2);
      b2 = Pi(a2, b2, 1);
      Ag(a2, b2);
      b2 = Hg();
      a2 = Kj(a2, 1);
      a2 !== null && ($c(a2, 1, b2), Mj(a2, b2));
    }
    function Wi(a2, b2) {
      if (a2.tag === 3)
        gk(a2, a2, b2);
      else
        for (var c2 = a2.return; c2 !== null; ) {
          if (c2.tag === 3) {
            gk(c2, a2, b2);
            break;
          } else if (c2.tag === 1) {
            var d = c2.stateNode;
            if (typeof c2.type.getDerivedStateFromError === "function" || typeof d.componentDidCatch === "function" && (Ti === null || !Ti.has(d))) {
              a2 = Mi(b2, a2);
              var e = Si(c2, a2, 1);
              Ag(c2, e);
              e = Hg();
              c2 = Kj(c2, 1);
              if (c2 !== null)
                $c(c2, 1, e), Mj(c2, e);
              else if (typeof d.componentDidCatch === "function" && (Ti === null || !Ti.has(d)))
                try {
                  d.componentDidCatch(b2, a2);
                } catch (f) {
                }
              break;
            }
          }
          c2 = c2.return;
        }
    }
    function Yj(a2, b2, c2) {
      var d = a2.pingCache;
      d !== null && d.delete(b2);
      b2 = Hg();
      a2.pingedLanes |= a2.suspendedLanes & c2;
      U === a2 && (W & c2) === c2 && (V === 4 || V === 3 && (W & 62914560) === W && 500 > O() - jj ? Qj(a2, 0) : uj |= c2);
      Mj(a2, b2);
    }
    function lj(a2, b2) {
      var c2 = a2.stateNode;
      c2 !== null && c2.delete(b2);
      b2 = 0;
      b2 === 0 && (b2 = a2.mode, (b2 & 2) === 0 ? b2 = 1 : (b2 & 4) === 0 ? b2 = eg() === 99 ? 1 : 2 : (Gj === 0 && (Gj = tj), b2 = Yc(62914560 & ~Gj), b2 === 0 && (b2 = 4194304)));
      c2 = Hg();
      a2 = Kj(a2, b2);
      a2 !== null && ($c(a2, b2, c2), Mj(a2, c2));
    }
    var ck;
    ck = function(a2, b2, c2) {
      var d = b2.lanes;
      if (a2 !== null)
        if (a2.memoizedProps !== b2.pendingProps || N.current)
          ug = true;
        else if ((c2 & d) !== 0)
          ug = (a2.flags & 16384) !== 0 ? true : false;
        else {
          ug = false;
          switch (b2.tag) {
            case 3:
              ri(b2);
              sh();
              break;
            case 5:
              gh(b2);
              break;
            case 1:
              Ff(b2.type) && Jf(b2);
              break;
            case 4:
              eh(b2, b2.stateNode.containerInfo);
              break;
            case 10:
              d = b2.memoizedProps.value;
              var e = b2.type._context;
              I(mg, e._currentValue);
              e._currentValue = d;
              break;
            case 13:
              if (b2.memoizedState !== null) {
                if ((c2 & b2.child.childLanes) !== 0)
                  return ti(a2, b2, c2);
                I(P, P.current & 1);
                b2 = hi(a2, b2, c2);
                return b2 !== null ? b2.sibling : null;
              }
              I(P, P.current & 1);
              break;
            case 19:
              d = (c2 & b2.childLanes) !== 0;
              if ((a2.flags & 64) !== 0) {
                if (d)
                  return Ai(a2, b2, c2);
                b2.flags |= 64;
              }
              e = b2.memoizedState;
              e !== null && (e.rendering = null, e.tail = null, e.lastEffect = null);
              I(P, P.current);
              if (d)
                break;
              else
                return null;
            case 23:
            case 24:
              return b2.lanes = 0, mi(a2, b2, c2);
          }
          return hi(a2, b2, c2);
        }
      else
        ug = false;
      b2.lanes = 0;
      switch (b2.tag) {
        case 2:
          d = b2.type;
          a2 !== null && (a2.alternate = null, b2.alternate = null, b2.flags |= 2);
          a2 = b2.pendingProps;
          e = Ef(b2, M.current);
          tg(b2, c2);
          e = Ch(null, b2, d, a2, e, c2);
          b2.flags |= 1;
          if (typeof e === "object" && e !== null && typeof e.render === "function" && e.$$typeof === void 0) {
            b2.tag = 1;
            b2.memoizedState = null;
            b2.updateQueue = null;
            if (Ff(d)) {
              var f = true;
              Jf(b2);
            } else
              f = false;
            b2.memoizedState = e.state !== null && e.state !== void 0 ? e.state : null;
            xg(b2);
            var g = d.getDerivedStateFromProps;
            typeof g === "function" && Gg(b2, d, g, a2);
            e.updater = Kg;
            b2.stateNode = e;
            e._reactInternals = b2;
            Og(b2, d, a2, c2);
            b2 = qi(null, b2, d, true, f, c2);
          } else
            b2.tag = 0, fi(null, b2, e, c2), b2 = b2.child;
          return b2;
        case 16:
          e = b2.elementType;
          a: {
            a2 !== null && (a2.alternate = null, b2.alternate = null, b2.flags |= 2);
            a2 = b2.pendingProps;
            f = e._init;
            e = f(e._payload);
            b2.type = e;
            f = b2.tag = hk(e);
            a2 = lg(e, a2);
            switch (f) {
              case 0:
                b2 = li(null, b2, e, a2, c2);
                break a;
              case 1:
                b2 = pi(null, b2, e, a2, c2);
                break a;
              case 11:
                b2 = gi(null, b2, e, a2, c2);
                break a;
              case 14:
                b2 = ii(null, b2, e, lg(e.type, a2), d, c2);
                break a;
            }
            throw Error(y(306, e, ""));
          }
          return b2;
        case 0:
          return d = b2.type, e = b2.pendingProps, e = b2.elementType === d ? e : lg(d, e), li(a2, b2, d, e, c2);
        case 1:
          return d = b2.type, e = b2.pendingProps, e = b2.elementType === d ? e : lg(d, e), pi(a2, b2, d, e, c2);
        case 3:
          ri(b2);
          d = b2.updateQueue;
          if (a2 === null || d === null)
            throw Error(y(282));
          d = b2.pendingProps;
          e = b2.memoizedState;
          e = e !== null ? e.element : null;
          yg(a2, b2);
          Cg(b2, d, null, c2);
          d = b2.memoizedState.element;
          if (d === e)
            sh(), b2 = hi(a2, b2, c2);
          else {
            e = b2.stateNode;
            if (f = e.hydrate)
              kh = rf(b2.stateNode.containerInfo.firstChild), jh = b2, f = lh = true;
            if (f) {
              a2 = e.mutableSourceEagerHydrationData;
              if (a2 != null)
                for (e = 0; e < a2.length; e += 2)
                  f = a2[e], f._workInProgressVersionPrimary = a2[e + 1], th.push(f);
              c2 = Zg(b2, null, d, c2);
              for (b2.child = c2; c2; )
                c2.flags = c2.flags & -3 | 1024, c2 = c2.sibling;
            } else
              fi(a2, b2, d, c2), sh();
            b2 = b2.child;
          }
          return b2;
        case 5:
          return gh(b2), a2 === null && ph(b2), d = b2.type, e = b2.pendingProps, f = a2 !== null ? a2.memoizedProps : null, g = e.children, nf(d, e) ? g = null : f !== null && nf(d, f) && (b2.flags |= 16), oi(a2, b2), fi(a2, b2, g, c2), b2.child;
        case 6:
          return a2 === null && ph(b2), null;
        case 13:
          return ti(a2, b2, c2);
        case 4:
          return eh(b2, b2.stateNode.containerInfo), d = b2.pendingProps, a2 === null ? b2.child = Yg(b2, null, d, c2) : fi(a2, b2, d, c2), b2.child;
        case 11:
          return d = b2.type, e = b2.pendingProps, e = b2.elementType === d ? e : lg(d, e), gi(a2, b2, d, e, c2);
        case 7:
          return fi(a2, b2, b2.pendingProps, c2), b2.child;
        case 8:
          return fi(a2, b2, b2.pendingProps.children, c2), b2.child;
        case 12:
          return fi(a2, b2, b2.pendingProps.children, c2), b2.child;
        case 10:
          a: {
            d = b2.type._context;
            e = b2.pendingProps;
            g = b2.memoizedProps;
            f = e.value;
            var h = b2.type._context;
            I(mg, h._currentValue);
            h._currentValue = f;
            if (g !== null)
              if (h = g.value, f = He(h, f) ? 0 : (typeof d._calculateChangedBits === "function" ? d._calculateChangedBits(h, f) : 1073741823) | 0, f === 0) {
                if (g.children === e.children && !N.current) {
                  b2 = hi(a2, b2, c2);
                  break a;
                }
              } else
                for (h = b2.child, h !== null && (h.return = b2); h !== null; ) {
                  var k = h.dependencies;
                  if (k !== null) {
                    g = h.child;
                    for (var l = k.firstContext; l !== null; ) {
                      if (l.context === d && (l.observedBits & f) !== 0) {
                        h.tag === 1 && (l = zg(-1, c2 & -c2), l.tag = 2, Ag(h, l));
                        h.lanes |= c2;
                        l = h.alternate;
                        l !== null && (l.lanes |= c2);
                        sg(h.return, c2);
                        k.lanes |= c2;
                        break;
                      }
                      l = l.next;
                    }
                  } else
                    g = h.tag === 10 ? h.type === b2.type ? null : h.child : h.child;
                  if (g !== null)
                    g.return = h;
                  else
                    for (g = h; g !== null; ) {
                      if (g === b2) {
                        g = null;
                        break;
                      }
                      h = g.sibling;
                      if (h !== null) {
                        h.return = g.return;
                        g = h;
                        break;
                      }
                      g = g.return;
                    }
                  h = g;
                }
            fi(a2, b2, e.children, c2);
            b2 = b2.child;
          }
          return b2;
        case 9:
          return e = b2.type, f = b2.pendingProps, d = f.children, tg(b2, c2), e = vg(e, f.unstable_observedBits), d = d(e), b2.flags |= 1, fi(a2, b2, d, c2), b2.child;
        case 14:
          return e = b2.type, f = lg(e, b2.pendingProps), f = lg(e.type, f), ii(a2, b2, e, f, d, c2);
        case 15:
          return ki(a2, b2, b2.type, b2.pendingProps, d, c2);
        case 17:
          return d = b2.type, e = b2.pendingProps, e = b2.elementType === d ? e : lg(d, e), a2 !== null && (a2.alternate = null, b2.alternate = null, b2.flags |= 2), b2.tag = 1, Ff(d) ? (a2 = true, Jf(b2)) : a2 = false, tg(b2, c2), Mg(b2, d, e), Og(b2, d, e, c2), qi(null, b2, d, true, a2, c2);
        case 19:
          return Ai(a2, b2, c2);
        case 23:
          return mi(a2, b2, c2);
        case 24:
          return mi(a2, b2, c2);
      }
      throw Error(y(156, b2.tag));
    };
    function ik(a2, b2, c2, d) {
      this.tag = a2;
      this.key = c2;
      this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
      this.index = 0;
      this.ref = null;
      this.pendingProps = b2;
      this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
      this.mode = d;
      this.flags = 0;
      this.lastEffect = this.firstEffect = this.nextEffect = null;
      this.childLanes = this.lanes = 0;
      this.alternate = null;
    }
    function nh(a2, b2, c2, d) {
      return new ik(a2, b2, c2, d);
    }
    function ji(a2) {
      a2 = a2.prototype;
      return !(!a2 || !a2.isReactComponent);
    }
    function hk(a2) {
      if (typeof a2 === "function")
        return ji(a2) ? 1 : 0;
      if (a2 !== void 0 && a2 !== null) {
        a2 = a2.$$typeof;
        if (a2 === Aa)
          return 11;
        if (a2 === Da)
          return 14;
      }
      return 2;
    }
    function Tg(a2, b2) {
      var c2 = a2.alternate;
      c2 === null ? (c2 = nh(a2.tag, b2, a2.key, a2.mode), c2.elementType = a2.elementType, c2.type = a2.type, c2.stateNode = a2.stateNode, c2.alternate = a2, a2.alternate = c2) : (c2.pendingProps = b2, c2.type = a2.type, c2.flags = 0, c2.nextEffect = null, c2.firstEffect = null, c2.lastEffect = null);
      c2.childLanes = a2.childLanes;
      c2.lanes = a2.lanes;
      c2.child = a2.child;
      c2.memoizedProps = a2.memoizedProps;
      c2.memoizedState = a2.memoizedState;
      c2.updateQueue = a2.updateQueue;
      b2 = a2.dependencies;
      c2.dependencies = b2 === null ? null : {lanes: b2.lanes, firstContext: b2.firstContext};
      c2.sibling = a2.sibling;
      c2.index = a2.index;
      c2.ref = a2.ref;
      return c2;
    }
    function Vg(a2, b2, c2, d, e, f) {
      var g = 2;
      d = a2;
      if (typeof a2 === "function")
        ji(a2) && (g = 1);
      else if (typeof a2 === "string")
        g = 5;
      else
        a:
          switch (a2) {
            case ua:
              return Xg(c2.children, e, f, b2);
            case Ha:
              g = 8;
              e |= 16;
              break;
            case wa:
              g = 8;
              e |= 1;
              break;
            case xa:
              return a2 = nh(12, c2, b2, e | 8), a2.elementType = xa, a2.type = xa, a2.lanes = f, a2;
            case Ba:
              return a2 = nh(13, c2, b2, e), a2.type = Ba, a2.elementType = Ba, a2.lanes = f, a2;
            case Ca:
              return a2 = nh(19, c2, b2, e), a2.elementType = Ca, a2.lanes = f, a2;
            case Ia:
              return vi(c2, e, f, b2);
            case Ja:
              return a2 = nh(24, c2, b2, e), a2.elementType = Ja, a2.lanes = f, a2;
            default:
              if (typeof a2 === "object" && a2 !== null)
                switch (a2.$$typeof) {
                  case ya:
                    g = 10;
                    break a;
                  case za:
                    g = 9;
                    break a;
                  case Aa:
                    g = 11;
                    break a;
                  case Da:
                    g = 14;
                    break a;
                  case Ea:
                    g = 16;
                    d = null;
                    break a;
                  case Fa:
                    g = 22;
                    break a;
                }
              throw Error(y(130, a2 == null ? a2 : typeof a2, ""));
          }
      b2 = nh(g, c2, b2, e);
      b2.elementType = a2;
      b2.type = d;
      b2.lanes = f;
      return b2;
    }
    function Xg(a2, b2, c2, d) {
      a2 = nh(7, a2, d, b2);
      a2.lanes = c2;
      return a2;
    }
    function vi(a2, b2, c2, d) {
      a2 = nh(23, a2, d, b2);
      a2.elementType = Ia;
      a2.lanes = c2;
      return a2;
    }
    function Ug(a2, b2, c2) {
      a2 = nh(6, a2, null, b2);
      a2.lanes = c2;
      return a2;
    }
    function Wg(a2, b2, c2) {
      b2 = nh(4, a2.children !== null ? a2.children : [], a2.key, b2);
      b2.lanes = c2;
      b2.stateNode = {containerInfo: a2.containerInfo, pendingChildren: null, implementation: a2.implementation};
      return b2;
    }
    function jk(a2, b2, c2) {
      this.tag = b2;
      this.containerInfo = a2;
      this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
      this.timeoutHandle = -1;
      this.pendingContext = this.context = null;
      this.hydrate = c2;
      this.callbackNode = null;
      this.callbackPriority = 0;
      this.eventTimes = Zc(0);
      this.expirationTimes = Zc(-1);
      this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
      this.entanglements = Zc(0);
      this.mutableSourceEagerHydrationData = null;
    }
    function kk(a2, b2, c2) {
      var d = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {$$typeof: ta, key: d == null ? null : "" + d, children: a2, containerInfo: b2, implementation: c2};
    }
    function lk(a2, b2, c2, d) {
      var e = b2.current, f = Hg(), g = Ig(e);
      a:
        if (c2) {
          c2 = c2._reactInternals;
          b: {
            if (Zb(c2) !== c2 || c2.tag !== 1)
              throw Error(y(170));
            var h = c2;
            do {
              switch (h.tag) {
                case 3:
                  h = h.stateNode.context;
                  break b;
                case 1:
                  if (Ff(h.type)) {
                    h = h.stateNode.__reactInternalMemoizedMergedChildContext;
                    break b;
                  }
              }
              h = h.return;
            } while (h !== null);
            throw Error(y(171));
          }
          if (c2.tag === 1) {
            var k = c2.type;
            if (Ff(k)) {
              c2 = If(c2, k, h);
              break a;
            }
          }
          c2 = h;
        } else
          c2 = Cf;
      b2.context === null ? b2.context = c2 : b2.pendingContext = c2;
      b2 = zg(f, g);
      b2.payload = {element: a2};
      d = d === void 0 ? null : d;
      d !== null && (b2.callback = d);
      Ag(e, b2);
      Jg(e, g, f);
      return g;
    }
    function mk(a2) {
      a2 = a2.current;
      if (!a2.child)
        return null;
      switch (a2.child.tag) {
        case 5:
          return a2.child.stateNode;
        default:
          return a2.child.stateNode;
      }
    }
    function nk(a2, b2) {
      a2 = a2.memoizedState;
      if (a2 !== null && a2.dehydrated !== null) {
        var c2 = a2.retryLane;
        a2.retryLane = c2 !== 0 && c2 < b2 ? c2 : b2;
      }
    }
    function ok(a2, b2) {
      nk(a2, b2);
      (a2 = a2.alternate) && nk(a2, b2);
    }
    function pk() {
      return null;
    }
    function qk(a2, b2, c2) {
      var d = c2 != null && c2.hydrationOptions != null && c2.hydrationOptions.mutableSources || null;
      c2 = new jk(a2, b2, c2 != null && c2.hydrate === true);
      b2 = nh(3, null, null, b2 === 2 ? 7 : b2 === 1 ? 3 : 0);
      c2.current = b2;
      b2.stateNode = c2;
      xg(b2);
      a2[ff] = c2.current;
      cf(a2.nodeType === 8 ? a2.parentNode : a2);
      if (d)
        for (a2 = 0; a2 < d.length; a2++) {
          b2 = d[a2];
          var e = b2._getVersion;
          e = e(b2._source);
          c2.mutableSourceEagerHydrationData == null ? c2.mutableSourceEagerHydrationData = [b2, e] : c2.mutableSourceEagerHydrationData.push(b2, e);
        }
      this._internalRoot = c2;
    }
    qk.prototype.render = function(a2) {
      lk(a2, this._internalRoot, null, null);
    };
    qk.prototype.unmount = function() {
      var a2 = this._internalRoot, b2 = a2.containerInfo;
      lk(null, a2, null, function() {
        b2[ff] = null;
      });
    };
    function rk(a2) {
      return !(!a2 || a2.nodeType !== 1 && a2.nodeType !== 9 && a2.nodeType !== 11 && (a2.nodeType !== 8 || a2.nodeValue !== " react-mount-point-unstable "));
    }
    function sk(a2, b2) {
      b2 || (b2 = a2 ? a2.nodeType === 9 ? a2.documentElement : a2.firstChild : null, b2 = !(!b2 || b2.nodeType !== 1 || !b2.hasAttribute("data-reactroot")));
      if (!b2)
        for (var c2; c2 = a2.lastChild; )
          a2.removeChild(c2);
      return new qk(a2, 0, b2 ? {hydrate: true} : void 0);
    }
    function tk(a2, b2, c2, d, e) {
      var f = c2._reactRootContainer;
      if (f) {
        var g = f._internalRoot;
        if (typeof e === "function") {
          var h = e;
          e = function() {
            var a3 = mk(g);
            h.call(a3);
          };
        }
        lk(b2, g, a2, e);
      } else {
        f = c2._reactRootContainer = sk(c2, d);
        g = f._internalRoot;
        if (typeof e === "function") {
          var k = e;
          e = function() {
            var a3 = mk(g);
            k.call(a3);
          };
        }
        Xj(function() {
          lk(b2, g, a2, e);
        });
      }
      return mk(g);
    }
    ec = function(a2) {
      if (a2.tag === 13) {
        var b2 = Hg();
        Jg(a2, 4, b2);
        ok(a2, 4);
      }
    };
    fc = function(a2) {
      if (a2.tag === 13) {
        var b2 = Hg();
        Jg(a2, 67108864, b2);
        ok(a2, 67108864);
      }
    };
    gc = function(a2) {
      if (a2.tag === 13) {
        var b2 = Hg(), c2 = Ig(a2);
        Jg(a2, c2, b2);
        ok(a2, c2);
      }
    };
    hc = function(a2, b2) {
      return b2();
    };
    yb = function(a2, b2, c2) {
      switch (b2) {
        case "input":
          ab(a2, c2);
          b2 = c2.name;
          if (c2.type === "radio" && b2 != null) {
            for (c2 = a2; c2.parentNode; )
              c2 = c2.parentNode;
            c2 = c2.querySelectorAll("input[name=" + JSON.stringify("" + b2) + '][type="radio"]');
            for (b2 = 0; b2 < c2.length; b2++) {
              var d = c2[b2];
              if (d !== a2 && d.form === a2.form) {
                var e = Db(d);
                if (!e)
                  throw Error(y(90));
                Wa(d);
                ab(d, e);
              }
            }
          }
          break;
        case "textarea":
          ib(a2, c2);
          break;
        case "select":
          b2 = c2.value, b2 != null && fb(a2, !!c2.multiple, b2, false);
      }
    };
    Gb = Wj;
    Hb = function(a2, b2, c2, d, e) {
      var f = X;
      X |= 4;
      try {
        return gg(98, a2.bind(null, b2, c2, d, e));
      } finally {
        X = f, X === 0 && (wj(), ig());
      }
    };
    Ib = function() {
      (X & 49) === 0 && (Vj(), Oj());
    };
    Jb = function(a2, b2) {
      var c2 = X;
      X |= 2;
      try {
        return a2(b2);
      } finally {
        X = c2, X === 0 && (wj(), ig());
      }
    };
    function uk(a2, b2) {
      var c2 = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!rk(b2))
        throw Error(y(200));
      return kk(a2, b2, null, c2);
    }
    var vk = {Events: [Cb, ue, Db, Eb, Fb, Oj, {current: false}]};
    var wk = {findFiberByHostInstance: wc, bundleType: 0, version: "17.0.2", rendererPackageName: "react-dom"};
    var xk = {bundleType: wk.bundleType, version: wk.version, rendererPackageName: wk.rendererPackageName, rendererConfig: wk.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ra.ReactCurrentDispatcher, findHostInstanceByFiber: function(a2) {
      a2 = cc2(a2);
      return a2 === null ? null : a2.stateNode;
    }, findFiberByHostInstance: wk.findFiberByHostInstance || pk, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null};
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined") {
      yk = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!yk.isDisabled && yk.supportsFiber)
        try {
          Lf = yk.inject(xk), Mf = yk;
        } catch (a2) {
        }
    }
    var yk;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = vk;
    exports.createPortal = uk;
    exports.findDOMNode = function(a2) {
      if (a2 == null)
        return null;
      if (a2.nodeType === 1)
        return a2;
      var b2 = a2._reactInternals;
      if (b2 === void 0) {
        if (typeof a2.render === "function")
          throw Error(y(188));
        throw Error(y(268, Object.keys(a2)));
      }
      a2 = cc2(b2);
      a2 = a2 === null ? null : a2.stateNode;
      return a2;
    };
    exports.flushSync = function(a2, b2) {
      var c2 = X;
      if ((c2 & 48) !== 0)
        return a2(b2);
      X |= 1;
      try {
        if (a2)
          return gg(99, a2.bind(null, b2));
      } finally {
        X = c2, ig();
      }
    };
    exports.hydrate = function(a2, b2, c2) {
      if (!rk(b2))
        throw Error(y(200));
      return tk(null, a2, b2, true, c2);
    };
    exports.render = function(a2, b2, c2) {
      if (!rk(b2))
        throw Error(y(200));
      return tk(null, a2, b2, false, c2);
    };
    exports.unmountComponentAtNode = function(a2) {
      if (!rk(a2))
        throw Error(y(40));
      return a2._reactRootContainer ? (Xj(function() {
        tk(null, null, a2, false, function() {
          a2._reactRootContainer = null;
          a2[ff] = null;
        });
      }), true) : false;
    };
    exports.unstable_batchedUpdates = Wj;
    exports.unstable_createPortal = function(a2, b2) {
      return uk(a2, b2, 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null);
    };
    exports.unstable_renderSubtreeIntoContainer = function(a2, b2, c2, d) {
      if (!rk(c2))
        throw Error(y(200));
      if (a2 == null || a2._reactInternals === void 0)
        throw Error(y(38));
      return tk(a2, b2, c2, false, d);
    };
    exports.version = "17.0.2";
  }
});

// ../../node_modules/react-dom/index.js
var require_react_dom = __commonJS({
  "../../node_modules/react-dom/index.js"(exports, module) {
    "use strict";
    function checkDCE() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
        return;
      }
      if (false) {
        throw new Error("^_^");
      }
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
      } catch (err) {
        console.error(err);
      }
    }
    if (true) {
      checkDCE();
      module.exports = require_react_dom_production_min();
    } else {
      module.exports = null;
    }
  }
});

// ../../node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.production.min.js
var require_react_is_production_min = __commonJS({
  "../../node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.production.min.js"(exports) {
    "use strict";
    var b2 = typeof Symbol === "function" && Symbol.for;
    var c2 = b2 ? Symbol.for("react.element") : 60103;
    var d = b2 ? Symbol.for("react.portal") : 60106;
    var e = b2 ? Symbol.for("react.fragment") : 60107;
    var f = b2 ? Symbol.for("react.strict_mode") : 60108;
    var g = b2 ? Symbol.for("react.profiler") : 60114;
    var h = b2 ? Symbol.for("react.provider") : 60109;
    var k = b2 ? Symbol.for("react.context") : 60110;
    var l = b2 ? Symbol.for("react.async_mode") : 60111;
    var m2 = b2 ? Symbol.for("react.concurrent_mode") : 60111;
    var n = b2 ? Symbol.for("react.forward_ref") : 60112;
    var p = b2 ? Symbol.for("react.suspense") : 60113;
    var q = b2 ? Symbol.for("react.suspense_list") : 60120;
    var r = b2 ? Symbol.for("react.memo") : 60115;
    var t = b2 ? Symbol.for("react.lazy") : 60116;
    var v = b2 ? Symbol.for("react.block") : 60121;
    var w = b2 ? Symbol.for("react.fundamental") : 60117;
    var x = b2 ? Symbol.for("react.responder") : 60118;
    var y = b2 ? Symbol.for("react.scope") : 60119;
    function z(a2) {
      if (typeof a2 === "object" && a2 !== null) {
        var u = a2.$$typeof;
        switch (u) {
          case c2:
            switch (a2 = a2.type, a2) {
              case l:
              case m2:
              case e:
              case g:
              case f:
              case p:
                return a2;
              default:
                switch (a2 = a2 && a2.$$typeof, a2) {
                  case k:
                  case n:
                  case t:
                  case r:
                  case h:
                    return a2;
                  default:
                    return u;
                }
            }
          case d:
            return u;
        }
      }
    }
    function A(a2) {
      return z(a2) === m2;
    }
    exports.AsyncMode = l;
    exports.ConcurrentMode = m2;
    exports.ContextConsumer = k;
    exports.ContextProvider = h;
    exports.Element = c2;
    exports.ForwardRef = n;
    exports.Fragment = e;
    exports.Lazy = t;
    exports.Memo = r;
    exports.Portal = d;
    exports.Profiler = g;
    exports.StrictMode = f;
    exports.Suspense = p;
    exports.isAsyncMode = function(a2) {
      return A(a2) || z(a2) === l;
    };
    exports.isConcurrentMode = A;
    exports.isContextConsumer = function(a2) {
      return z(a2) === k;
    };
    exports.isContextProvider = function(a2) {
      return z(a2) === h;
    };
    exports.isElement = function(a2) {
      return typeof a2 === "object" && a2 !== null && a2.$$typeof === c2;
    };
    exports.isForwardRef = function(a2) {
      return z(a2) === n;
    };
    exports.isFragment = function(a2) {
      return z(a2) === e;
    };
    exports.isLazy = function(a2) {
      return z(a2) === t;
    };
    exports.isMemo = function(a2) {
      return z(a2) === r;
    };
    exports.isPortal = function(a2) {
      return z(a2) === d;
    };
    exports.isProfiler = function(a2) {
      return z(a2) === g;
    };
    exports.isStrictMode = function(a2) {
      return z(a2) === f;
    };
    exports.isSuspense = function(a2) {
      return z(a2) === p;
    };
    exports.isValidElementType = function(a2) {
      return typeof a2 === "string" || typeof a2 === "function" || a2 === e || a2 === m2 || a2 === g || a2 === f || a2 === p || a2 === q || typeof a2 === "object" && a2 !== null && (a2.$$typeof === t || a2.$$typeof === r || a2.$$typeof === h || a2.$$typeof === k || a2.$$typeof === n || a2.$$typeof === w || a2.$$typeof === x || a2.$$typeof === y || a2.$$typeof === v);
    };
    exports.typeOf = z;
  }
});

// ../../node_modules/hoist-non-react-statics/node_modules/react-is/index.js
var require_react_is = __commonJS({
  "../../node_modules/hoist-non-react-statics/node_modules/react-is/index.js"(exports, module) {
    "use strict";
    if (true) {
      module.exports = require_react_is_production_min();
    } else {
      module.exports = null;
    }
  }
});

// ../../node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var require_hoist_non_react_statics_cjs = __commonJS({
  "../../node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js"(exports, module) {
    "use strict";
    var reactIs = require_react_is();
    var REACT_STATICS = {
      childContextTypes: true,
      contextType: true,
      contextTypes: true,
      defaultProps: true,
      displayName: true,
      getDefaultProps: true,
      getDerivedStateFromError: true,
      getDerivedStateFromProps: true,
      mixins: true,
      propTypes: true,
      type: true
    };
    var KNOWN_STATICS = {
      name: true,
      length: true,
      prototype: true,
      caller: true,
      callee: true,
      arguments: true,
      arity: true
    };
    var FORWARD_REF_STATICS = {
      "$$typeof": true,
      render: true,
      defaultProps: true,
      displayName: true,
      propTypes: true
    };
    var MEMO_STATICS = {
      "$$typeof": true,
      compare: true,
      defaultProps: true,
      displayName: true,
      propTypes: true,
      type: true
    };
    var TYPE_STATICS = {};
    TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
    TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
    function getStatics(component) {
      if (reactIs.isMemo(component)) {
        return MEMO_STATICS;
      }
      return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
    }
    var defineProperty = Object.defineProperty;
    var getOwnPropertyNames = Object.getOwnPropertyNames;
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var getPrototypeOf = Object.getPrototypeOf;
    var objectPrototype = Object.prototype;
    function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
      if (typeof sourceComponent !== "string") {
        if (objectPrototype) {
          var inheritedComponent = getPrototypeOf(sourceComponent);
          if (inheritedComponent && inheritedComponent !== objectPrototype) {
            hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
          }
        }
        var keys = getOwnPropertyNames(sourceComponent);
        if (getOwnPropertySymbols) {
          keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }
        var targetStatics = getStatics(targetComponent);
        var sourceStatics = getStatics(sourceComponent);
        for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
            var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
            try {
              defineProperty(targetComponent, key, descriptor);
            } catch (e) {
            }
          }
        }
      }
      return targetComponent;
    }
    module.exports = hoistNonReactStatics;
  }
});

// ../../node_modules/prop-types/lib/ReactPropTypesSecret.js
var require_ReactPropTypesSecret = __commonJS({
  "../../node_modules/prop-types/lib/ReactPropTypesSecret.js"(exports, module) {
    "use strict";
    var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    module.exports = ReactPropTypesSecret;
  }
});

// ../../node_modules/prop-types/factoryWithThrowingShims.js
var require_factoryWithThrowingShims = __commonJS({
  "../../node_modules/prop-types/factoryWithThrowingShims.js"(exports, module) {
    "use strict";
    var ReactPropTypesSecret = require_ReactPropTypesSecret();
    function emptyFunction() {
    }
    function emptyFunctionWithReset() {
    }
    emptyFunctionWithReset.resetWarningCache = emptyFunction;
    module.exports = function() {
      function shim(props, propName, componentName, location, propFullName, secret) {
        if (secret === ReactPropTypesSecret) {
          return;
        }
        var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
        err.name = "Invariant Violation";
        throw err;
      }
      ;
      shim.isRequired = shim;
      function getShim() {
        return shim;
      }
      ;
      var ReactPropTypes = {
        array: shim,
        bool: shim,
        func: shim,
        number: shim,
        object: shim,
        string: shim,
        symbol: shim,
        any: shim,
        arrayOf: getShim,
        element: shim,
        elementType: shim,
        instanceOf: getShim,
        node: shim,
        objectOf: getShim,
        oneOf: getShim,
        oneOfType: getShim,
        shape: getShim,
        exact: getShim,
        checkPropTypes: emptyFunctionWithReset,
        resetWarningCache: emptyFunction
      };
      ReactPropTypes.PropTypes = ReactPropTypes;
      return ReactPropTypes;
    };
  }
});

// ../../node_modules/prop-types/index.js
var require_prop_types = __commonJS({
  "../../node_modules/prop-types/index.js"(exports, module) {
    if (false) {
      ReactIs = null;
      throwOnDirectAccess = true;
      module.exports = null(ReactIs.isElement, throwOnDirectAccess);
    } else {
      module.exports = require_factoryWithThrowingShims()();
    }
    var ReactIs;
    var throwOnDirectAccess;
  }
});

// ../../node_modules/react/cjs/react-jsx-runtime.production.min.js
var require_react_jsx_runtime_production_min = __commonJS({
  "../../node_modules/react/cjs/react-jsx-runtime.production.min.js"(exports) {
    "use strict";
    require_object_assign();
    var f = require_react();
    var g = 60103;
    exports.Fragment = 60107;
    if (typeof Symbol === "function" && Symbol.for) {
      h = Symbol.for;
      g = h("react.element");
      exports.Fragment = h("react.fragment");
    }
    var h;
    var m2 = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
    var n = Object.prototype.hasOwnProperty;
    var p = {key: true, ref: true, __self: true, __source: true};
    function q(c2, a2, k) {
      var b2, d = {}, e = null, l = null;
      k !== void 0 && (e = "" + k);
      a2.key !== void 0 && (e = "" + a2.key);
      a2.ref !== void 0 && (l = a2.ref);
      for (b2 in a2)
        n.call(a2, b2) && !p.hasOwnProperty(b2) && (d[b2] = a2[b2]);
      if (c2 && c2.defaultProps)
        for (b2 in a2 = c2.defaultProps, a2)
          d[b2] === void 0 && (d[b2] = a2[b2]);
      return {$$typeof: g, type: c2, key: e, ref: l, props: d, _owner: m2.current};
    }
    exports.jsx = q;
    exports.jsxs = q;
  }
});

// ../../node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "../../node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    if (true) {
      module.exports = require_react_jsx_runtime_production_min();
    } else {
      module.exports = null;
    }
  }
});

// ../../node_modules/react-is/cjs/react-is.production.min.js
var require_react_is_production_min2 = __commonJS({
  "../../node_modules/react-is/cjs/react-is.production.min.js"(exports) {
    "use strict";
    var b2 = 60103;
    var c2 = 60106;
    var d = 60107;
    var e = 60108;
    var f = 60114;
    var g = 60109;
    var h = 60110;
    var k = 60112;
    var l = 60113;
    var m2 = 60120;
    var n = 60115;
    var p = 60116;
    var q = 60121;
    var r = 60122;
    var u = 60117;
    var v = 60129;
    var w = 60131;
    if (typeof Symbol === "function" && Symbol.for) {
      x = Symbol.for;
      b2 = x("react.element");
      c2 = x("react.portal");
      d = x("react.fragment");
      e = x("react.strict_mode");
      f = x("react.profiler");
      g = x("react.provider");
      h = x("react.context");
      k = x("react.forward_ref");
      l = x("react.suspense");
      m2 = x("react.suspense_list");
      n = x("react.memo");
      p = x("react.lazy");
      q = x("react.block");
      r = x("react.server.block");
      u = x("react.fundamental");
      v = x("react.debug_trace_mode");
      w = x("react.legacy_hidden");
    }
    var x;
    function y(a2) {
      if (typeof a2 === "object" && a2 !== null) {
        var t = a2.$$typeof;
        switch (t) {
          case b2:
            switch (a2 = a2.type, a2) {
              case d:
              case f:
              case e:
              case l:
              case m2:
                return a2;
              default:
                switch (a2 = a2 && a2.$$typeof, a2) {
                  case h:
                  case k:
                  case p:
                  case n:
                  case g:
                    return a2;
                  default:
                    return t;
                }
            }
          case c2:
            return t;
        }
      }
    }
    var z = g;
    var A = b2;
    var B = k;
    var C = d;
    var D = p;
    var E = n;
    var F = c2;
    var G = f;
    var H = e;
    var I = l;
    exports.ContextConsumer = h;
    exports.ContextProvider = z;
    exports.Element = A;
    exports.ForwardRef = B;
    exports.Fragment = C;
    exports.Lazy = D;
    exports.Memo = E;
    exports.Portal = F;
    exports.Profiler = G;
    exports.StrictMode = H;
    exports.Suspense = I;
    exports.isAsyncMode = function() {
      return false;
    };
    exports.isConcurrentMode = function() {
      return false;
    };
    exports.isContextConsumer = function(a2) {
      return y(a2) === h;
    };
    exports.isContextProvider = function(a2) {
      return y(a2) === g;
    };
    exports.isElement = function(a2) {
      return typeof a2 === "object" && a2 !== null && a2.$$typeof === b2;
    };
    exports.isForwardRef = function(a2) {
      return y(a2) === k;
    };
    exports.isFragment = function(a2) {
      return y(a2) === d;
    };
    exports.isLazy = function(a2) {
      return y(a2) === p;
    };
    exports.isMemo = function(a2) {
      return y(a2) === n;
    };
    exports.isPortal = function(a2) {
      return y(a2) === c2;
    };
    exports.isProfiler = function(a2) {
      return y(a2) === f;
    };
    exports.isStrictMode = function(a2) {
      return y(a2) === e;
    };
    exports.isSuspense = function(a2) {
      return y(a2) === l;
    };
    exports.isValidElementType = function(a2) {
      return typeof a2 === "string" || typeof a2 === "function" || a2 === d || a2 === f || a2 === v || a2 === e || a2 === l || a2 === m2 || a2 === w || typeof a2 === "object" && a2 !== null && (a2.$$typeof === p || a2.$$typeof === n || a2.$$typeof === g || a2.$$typeof === h || a2.$$typeof === k || a2.$$typeof === u || a2.$$typeof === q || a2[0] === r) ? true : false;
    };
    exports.typeOf = y;
  }
});

// ../../node_modules/react-is/index.js
var require_react_is2 = __commonJS({
  "../../node_modules/react-is/index.js"(exports, module) {
    "use strict";
    if (true) {
      module.exports = require_react_is_production_min2();
    } else {
      module.exports = null;
    }
  }
});

// ../../node_modules/framer-motion/dist/es/index.js
var es_exports = {};
__export(es_exports, {
  AnimatePresence: () => AnimatePresence,
  AnimateSharedLayout: () => AnimateSharedLayout,
  DragControls: () => DragControls,
  FlatTree: () => FlatTree,
  FramerTreeLayoutContext: () => FramerTreeLayoutContext,
  LayoutGroupContext: () => LayoutGroupContext,
  LazyMotion: () => LazyMotion,
  MotionConfig: () => MotionConfig,
  MotionConfigContext: () => MotionConfigContext,
  MotionValue: () => MotionValue,
  PresenceContext: () => PresenceContext,
  SharedLayoutContext: () => SharedLayoutContext,
  VisibilityAction: () => VisibilityAction,
  addScaleCorrection: () => addScaleCorrection,
  animate: () => animate2,
  animateVisualElement: () => animateVisualElement,
  animationControls: () => animationControls,
  batchLayout: () => batchLayout,
  createBatcher: () => createBatcher,
  createCrossfader: () => createCrossfader,
  createDomMotionComponent: () => createDomMotionComponent,
  createMotionComponent: () => createMotionComponent,
  domAnimation: () => domAnimation,
  domMax: () => domMax,
  flushLayout: () => flushLayout,
  isValidMotionProp: () => isValidMotionProp,
  m: () => m,
  motion: () => motion,
  motionValue: () => motionValue,
  resolveMotionValue: () => resolveMotionValue,
  snapshotViewportBox: () => snapshotViewportBox,
  transform: () => transform,
  useAnimation: () => useAnimation,
  useCycle: () => useCycle,
  useDeprecatedAnimatedState: () => useAnimatedState,
  useDeprecatedInvertedScale: () => useInvertedScale,
  useDomEvent: () => useDomEvent,
  useDragControls: () => useDragControls,
  useElementScroll: () => useElementScroll,
  useIsPresent: () => useIsPresent,
  useMotionTemplate: () => useMotionTemplate,
  useMotionValue: () => useMotionValue,
  usePresence: () => usePresence,
  useReducedMotion: () => useReducedMotion,
  useSpring: () => useSpring,
  useTransform: () => useTransform,
  useVelocity: () => useVelocity,
  useViewportScroll: () => useViewportScroll,
  visualElement: () => visualElement
});

// ../../node_modules/tslib/modules/index.js
var import_tslib = __toModule(require_tslib());
var {
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __exportStar,
  __createBinding,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet
} = import_tslib.default;

// ../../node_modules/framer-motion/dist/es/motion/index.js
var React2 = __toModule(require_react());
var import_react13 = __toModule(require_react());

// ../../node_modules/framer-motion/dist/es/motion/features/use-features.js
var React = __toModule(require_react());
var import_react2 = __toModule(require_react());

// ../../node_modules/framer-motion/dist/es/motion/features/definitions.js
var createDefinition = function(propNames) {
  return {
    isEnabled: function(props) {
      return propNames.some(function(name) {
        return !!props[name];
      });
    }
  };
};
var featureDefinitions = {
  measureLayout: createDefinition([
    "layout",
    "layoutId",
    "drag",
    "_layoutResetTransform"
  ]),
  animation: createDefinition([
    "animate",
    "exit",
    "variants",
    "whileHover",
    "whileTap",
    "whileFocus",
    "whileDrag"
  ]),
  exit: createDefinition(["exit"]),
  drag: createDefinition(["drag", "dragControls"]),
  focus: createDefinition(["whileFocus"]),
  hover: createDefinition(["whileHover", "onHoverStart", "onHoverEnd"]),
  tap: createDefinition(["whileTap", "onTap", "onTapStart", "onTapCancel"]),
  pan: createDefinition([
    "onPan",
    "onPanStart",
    "onPanSessionStart",
    "onPanEnd"
  ]),
  layoutAnimation: createDefinition(["layout", "layoutId"])
};
function loadFeatures(features) {
  for (var key in features) {
    var Component3 = features[key];
    if (Component3 !== null)
      featureDefinitions[key].Component = Component3;
  }
}

// ../../node_modules/hey-listen/dist/hey-listen.es.js
var warning = function() {
};
var invariant = function() {
};
if (false) {
  warning = function(check, message) {
    if (!check && typeof console !== "undefined") {
      console.warn(message);
    }
  };
  invariant = function(check, message) {
    if (!check) {
      throw new Error(message);
    }
  };
}

// ../../node_modules/framer-motion/dist/es/context/LazyContext.js
var import_react = __toModule(require_react());
var LazyContext = (0, import_react.createContext)({strict: false});

// ../../node_modules/framer-motion/dist/es/motion/features/use-features.js
var featureNames = Object.keys(featureDefinitions);
var numFeatures = featureNames.length;
function useFeatures(props, visualElement2, preloadedFeatures) {
  var features = [];
  var lazyContext = (0, import_react2.useContext)(LazyContext);
  if (!visualElement2)
    return null;
  if (false) {
    invariant(false, "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.");
  }
  for (var i = 0; i < numFeatures; i++) {
    var name_1 = featureNames[i];
    var _a = featureDefinitions[name_1], isEnabled = _a.isEnabled, Component3 = _a.Component;
    if (isEnabled(props) && Component3) {
      features.push(React.createElement(Component3, __assign({key: name_1}, props, {visualElement: visualElement2})));
    }
  }
  return features;
}

// ../../node_modules/framer-motion/dist/es/context/MotionConfigContext.js
var import_react3 = __toModule(require_react());
var MotionConfigContext = (0, import_react3.createContext)({
  transformPagePoint: function(p) {
    return p;
  },
  isStatic: false
});

// ../../node_modules/framer-motion/dist/es/context/MotionContext/index.js
var import_react4 = __toModule(require_react());
var MotionContext = (0, import_react4.createContext)({});
function useVisualElementContext() {
  return (0, import_react4.useContext)(MotionContext).visualElement;
}

// ../../node_modules/framer-motion/dist/es/motion/utils/use-visual-element.js
var import_react10 = __toModule(require_react());

// ../../node_modules/framer-motion/dist/es/context/PresenceContext.js
var import_react5 = __toModule(require_react());
var PresenceContext = (0, import_react5.createContext)(null);

// ../../node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.js
var import_react7 = __toModule(require_react());

// ../../node_modules/framer-motion/dist/es/utils/use-constant.js
var import_react6 = __toModule(require_react());
function useConstant(init) {
  var ref = (0, import_react6.useRef)(null);
  if (ref.current === null) {
    ref.current = init();
  }
  return ref.current;
}

// ../../node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.js
function usePresence() {
  var context = (0, import_react7.useContext)(PresenceContext);
  if (context === null)
    return [true, null];
  var isPresent2 = context.isPresent, onExitComplete = context.onExitComplete, register = context.register;
  var id = useUniqueId();
  (0, import_react7.useEffect)(function() {
    return register(id);
  }, []);
  var safeToRemove = function() {
    return onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete(id);
  };
  return !isPresent2 && onExitComplete ? [false, safeToRemove] : [true];
}
function useIsPresent() {
  return isPresent((0, import_react7.useContext)(PresenceContext));
}
function isPresent(context) {
  return context === null ? true : context.isPresent;
}
var counter = 0;
var incrementId = function() {
  return counter++;
};
var useUniqueId = function() {
  return useConstant(incrementId);
};

// ../../node_modules/framer-motion/dist/es/context/LayoutGroupContext.js
var import_react8 = __toModule(require_react());
var LayoutGroupContext = (0, import_react8.createContext)(null);

// ../../node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.js
var import_react9 = __toModule(require_react());

// ../../node_modules/framer-motion/dist/es/utils/is-browser.js
var isBrowser = typeof window !== "undefined";

// ../../node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.js
var useIsomorphicLayoutEffect = isBrowser ? import_react9.useLayoutEffect : import_react9.useEffect;

// ../../node_modules/framer-motion/dist/es/motion/utils/use-visual-element.js
function useLayoutId(_a) {
  var layoutId = _a.layoutId;
  var layoutGroupId = (0, import_react10.useContext)(LayoutGroupContext);
  return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
}
function useVisualElement(Component3, visualState, props, createVisualElement) {
  var config = (0, import_react10.useContext)(MotionConfigContext);
  var lazyContext = (0, import_react10.useContext)(LazyContext);
  var parent = useVisualElementContext();
  var presenceContext = (0, import_react10.useContext)(PresenceContext);
  var layoutId = useLayoutId(props);
  var visualElementRef = (0, import_react10.useRef)(void 0);
  if (!createVisualElement)
    createVisualElement = lazyContext.renderer;
  if (!visualElementRef.current && createVisualElement) {
    visualElementRef.current = createVisualElement(Component3, {
      visualState,
      parent,
      props: __assign(__assign({}, props), {layoutId}),
      presenceId: presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.id,
      blockInitialAnimation: (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.initial) === false
    });
  }
  var visualElement2 = visualElementRef.current;
  useIsomorphicLayoutEffect(function() {
    if (!visualElement2)
      return;
    visualElement2.setProps(__assign(__assign(__assign({}, config), props), {layoutId}));
    visualElement2.isPresent = isPresent(presenceContext);
    visualElement2.isPresenceRoot = !parent || parent.presenceId !== (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.id);
    visualElement2.syncRender();
  });
  (0, import_react10.useEffect)(function() {
    var _a;
    if (!visualElement2)
      return;
    (_a = visualElement2.animationState) === null || _a === void 0 ? void 0 : _a.animateChanges();
  });
  useIsomorphicLayoutEffect(function() {
    return function() {
      return visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.notifyUnmount();
    };
  }, []);
  return visualElement2;
}

// ../../node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.js
var import_react11 = __toModule(require_react());

// ../../node_modules/framer-motion/dist/es/utils/is-ref-object.js
function isRefObject(ref) {
  return typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}

// ../../node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.js
function useMotionRef(visualState, visualElement2, externalRef) {
  return (0, import_react11.useCallback)(function(instance) {
    var _a;
    instance && ((_a = visualState.mount) === null || _a === void 0 ? void 0 : _a.call(visualState, instance));
    if (visualElement2) {
      instance ? visualElement2.mount(instance) : visualElement2.unmount();
    }
    if (externalRef) {
      if (typeof externalRef === "function") {
        externalRef(instance);
      } else if (isRefObject(externalRef)) {
        externalRef.current = instance;
      }
    }
  }, [visualElement2, externalRef]);
}

// ../../node_modules/framer-motion/dist/es/context/MotionContext/create.js
var import_react12 = __toModule(require_react());

// ../../node_modules/framer-motion/dist/es/render/utils/variants.js
function isVariantLabels(v) {
  return Array.isArray(v);
}
function isVariantLabel(v) {
  return typeof v === "string" || isVariantLabels(v);
}
function getCurrent(visualElement2) {
  var current = {};
  visualElement2.forEachValue(function(value, key) {
    return current[key] = value.get();
  });
  return current;
}
function getVelocity(visualElement2) {
  var velocity = {};
  visualElement2.forEachValue(function(value, key) {
    return velocity[key] = value.getVelocity();
  });
  return velocity;
}
function resolveVariantFromProps(props, definition, custom, currentValues, currentVelocity) {
  var _a;
  if (currentValues === void 0) {
    currentValues = {};
  }
  if (currentVelocity === void 0) {
    currentVelocity = {};
  }
  if (typeof definition === "string") {
    definition = (_a = props.variants) === null || _a === void 0 ? void 0 : _a[definition];
  }
  return typeof definition === "function" ? definition(custom !== null && custom !== void 0 ? custom : props.custom, currentValues, currentVelocity) : definition;
}
function resolveVariant(visualElement2, definition, custom) {
  var props = visualElement2.getProps();
  return resolveVariantFromProps(props, definition, custom !== null && custom !== void 0 ? custom : props.custom, getCurrent(visualElement2), getVelocity(visualElement2));
}
function checkIfControllingVariants(props) {
  var _a;
  return typeof ((_a = props.animate) === null || _a === void 0 ? void 0 : _a.start) === "function" || isVariantLabel(props.initial) || isVariantLabel(props.animate) || isVariantLabel(props.whileHover) || isVariantLabel(props.whileDrag) || isVariantLabel(props.whileTap) || isVariantLabel(props.whileFocus) || isVariantLabel(props.exit);
}
function checkIfVariantNode(props) {
  return Boolean(checkIfControllingVariants(props) || props.variants);
}

// ../../node_modules/framer-motion/dist/es/context/MotionContext/utils.js
function getCurrentTreeVariants(props, context) {
  if (checkIfControllingVariants(props)) {
    var initial = props.initial, animate3 = props.animate;
    return {
      initial: initial === false || isVariantLabel(initial) ? initial : void 0,
      animate: isVariantLabel(animate3) ? animate3 : void 0
    };
  }
  return props.inherit !== false ? context : {};
}

// ../../node_modules/framer-motion/dist/es/context/MotionContext/create.js
function useCreateMotionContext(props, isStatic) {
  var _a = getCurrentTreeVariants(props, (0, import_react12.useContext)(MotionContext)), initial = _a.initial, animate3 = _a.animate;
  return (0, import_react12.useMemo)(function() {
    return {initial, animate: animate3};
  }, isStatic ? [
    variantLabelsAsDependency(initial),
    variantLabelsAsDependency(animate3)
  ] : []);
}
function variantLabelsAsDependency(prop) {
  return Array.isArray(prop) ? prop.join(" ") : prop;
}

// ../../node_modules/framer-motion/dist/es/motion/index.js
function createMotionComponent(_a) {
  var preloadedFeatures = _a.preloadedFeatures, createVisualElement = _a.createVisualElement, useRender = _a.useRender, useVisualState2 = _a.useVisualState, Component3 = _a.Component;
  preloadedFeatures && loadFeatures(preloadedFeatures);
  function MotionComponent(props, externalRef) {
    var isStatic = (0, import_react13.useContext)(MotionConfigContext).isStatic;
    var features = null;
    var context = useCreateMotionContext(props, isStatic);
    var visualState = useVisualState2(props, isStatic);
    if (!isStatic && isBrowser) {
      context.visualElement = useVisualElement(Component3, visualState, props, createVisualElement);
      features = useFeatures(props, context.visualElement, preloadedFeatures);
    }
    return React2.createElement(React2.Fragment, null, React2.createElement(MotionContext.Provider, {value: context}, useRender(Component3, props, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic)), features);
  }
  return (0, import_react13.forwardRef)(MotionComponent);
}

// ../../node_modules/framer-motion/dist/es/render/dom/motion-proxy.js
function createMotionProxy(createConfig) {
  function custom(Component3, customMotionComponentConfig) {
    if (customMotionComponentConfig === void 0) {
      customMotionComponentConfig = {};
    }
    return createMotionComponent(createConfig(Component3, customMotionComponentConfig));
  }
  var componentCache = new Map();
  return new Proxy(custom, {
    get: function(_target, key) {
      if (!componentCache.has(key)) {
        componentCache.set(key, custom(key));
      }
      return componentCache.get(key);
    }
  });
}

// ../../node_modules/framer-motion/dist/es/render/svg/lowercase-elements.js
var lowercaseSVGElements = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "svg",
  "switch",
  "symbol",
  "text",
  "tspan",
  "use",
  "view"
];

// ../../node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.js
function isSVGComponent(Component3) {
  if (typeof Component3 !== "string" || Component3.includes("-")) {
    return false;
  } else if (lowercaseSVGElements.indexOf(Component3) > -1 || /[A-Z]/.test(Component3)) {
    return true;
  }
  return false;
}

// ../../node_modules/framer-motion/dist/es/render/dom/use-render.js
var import_react16 = __toModule(require_react());

// ../../node_modules/framer-motion/dist/es/render/html/use-props.js
var import_react14 = __toModule(require_react());

// ../../node_modules/framer-motion/dist/es/render/dom/projection/scale-correction.js
var valueScaleCorrection = {};
function addScaleCorrection(correctors) {
  for (var key in correctors) {
    valueScaleCorrection[key] = correctors[key];
  }
}

// ../../node_modules/framer-motion/dist/es/render/html/utils/transform.js
var transformAxes = ["", "X", "Y", "Z"];
var order = ["translate", "scale", "rotate", "skew"];
var transformProps = ["transformPerspective", "x", "y", "z"];
order.forEach(function(operationKey) {
  return transformAxes.forEach(function(axesKey) {
    return transformProps.push(operationKey + axesKey);
  });
});
function sortTransformProps(a2, b2) {
  return transformProps.indexOf(a2) - transformProps.indexOf(b2);
}
var transformPropSet = new Set(transformProps);
function isTransformProp(key) {
  return transformPropSet.has(key);
}
var transformOriginProps = new Set(["originX", "originY", "originZ"]);
function isTransformOriginProp(key) {
  return transformOriginProps.has(key);
}

// ../../node_modules/framer-motion/dist/es/motion/utils/is-forced-motion-value.js
function isForcedMotionValue(key, _a) {
  var layout = _a.layout, layoutId = _a.layoutId;
  return isTransformProp(key) || isTransformOriginProp(key) || (layout || layoutId !== void 0) && (!!valueScaleCorrection[key] || key === "opacity");
}

// ../../node_modules/framer-motion/dist/es/value/utils/is-motion-value.js
var isMotionValue = function(value) {
  return value !== null && typeof value === "object" && value.getVelocity;
};

// ../../node_modules/framer-motion/dist/es/render/html/utils/build-transform.js
var translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
function buildTransform(_a, _b, transformIsDefault, transformTemplate) {
  var transform3 = _a.transform, transformKeys2 = _a.transformKeys;
  var _c = _b.enableHardwareAcceleration, enableHardwareAcceleration = _c === void 0 ? true : _c, _d = _b.allowTransformNone, allowTransformNone = _d === void 0 ? true : _d;
  var transformString = "";
  transformKeys2.sort(sortTransformProps);
  var transformHasZ = false;
  var numTransformKeys = transformKeys2.length;
  for (var i = 0; i < numTransformKeys; i++) {
    var key = transformKeys2[i];
    transformString += (translateAlias[key] || key) + "(" + transform3[key] + ") ";
    if (key === "z")
      transformHasZ = true;
  }
  if (!transformHasZ && enableHardwareAcceleration) {
    transformString += "translateZ(0)";
  } else {
    transformString = transformString.trim();
  }
  if (transformTemplate) {
    transformString = transformTemplate(transform3, transformIsDefault ? "" : transformString);
  } else if (allowTransformNone && transformIsDefault) {
    transformString = "none";
  }
  return transformString;
}
function buildTransformOrigin(_a) {
  var _b = _a.originX, originX = _b === void 0 ? "50%" : _b, _c = _a.originY, originY = _c === void 0 ? "50%" : _c, _d = _a.originZ, originZ = _d === void 0 ? 0 : _d;
  return originX + " " + originY + " " + originZ;
}

// ../../node_modules/framer-motion/dist/es/render/dom/utils/is-css-variable.js
function isCSSVariable(key) {
  return key.startsWith("--");
}

// ../../node_modules/framer-motion/dist/es/render/dom/value-types/get-as-type.js
var getValueAsType = function(value, type) {
  return type && typeof value === "number" ? type.transform(value) : value;
};

// ../../node_modules/style-value-types/dist/es/utils.js
var clamp = function(min, max) {
  return function(v) {
    return Math.max(Math.min(v, max), min);
  };
};
var sanitize = function(v) {
  return v % 1 ? Number(v.toFixed(5)) : v;
};
var floatRegex = /(-)?([\d]*\.?[\d])+/g;
var colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))/gi;
var singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))$/i;
function isString(v) {
  return typeof v === "string";
}

// ../../node_modules/style-value-types/dist/es/numbers/index.js
var number = {
  test: function(v) {
    return typeof v === "number";
  },
  parse: parseFloat,
  transform: function(v) {
    return v;
  }
};
var alpha = __assign(__assign({}, number), {transform: clamp(0, 1)});
var scale = __assign(__assign({}, number), {default: 1});

// ../../node_modules/style-value-types/dist/es/numbers/units.js
var createUnitType = function(unit) {
  return {
    test: function(v) {
      return isString(v) && v.endsWith(unit) && v.split(" ").length === 1;
    },
    parse: parseFloat,
    transform: function(v) {
      return "" + v + unit;
    }
  };
};
var degrees = createUnitType("deg");
var percent = createUnitType("%");
var px = createUnitType("px");
var vh = createUnitType("vh");
var vw = createUnitType("vw");
var progressPercentage = __assign(__assign({}, percent), {parse: function(v) {
  return percent.parse(v) / 100;
}, transform: function(v) {
  return percent.transform(v * 100);
}});

// ../../node_modules/style-value-types/dist/es/color/utils.js
var isColorString = function(type, testProp) {
  return function(v) {
    return Boolean(isString(v) && singleColorRegex.test(v) && v.startsWith(type) || testProp && Object.prototype.hasOwnProperty.call(v, testProp));
  };
};
var splitColor = function(aName, bName, cName) {
  return function(v) {
    var _a;
    if (!isString(v))
      return v;
    var _b = v.match(floatRegex), a2 = _b[0], b2 = _b[1], c2 = _b[2], alpha3 = _b[3];
    return _a = {}, _a[aName] = parseFloat(a2), _a[bName] = parseFloat(b2), _a[cName] = parseFloat(c2), _a.alpha = alpha3 !== void 0 ? parseFloat(alpha3) : 1, _a;
  };
};

// ../../node_modules/style-value-types/dist/es/color/hsla.js
var hsla = {
  test: isColorString("hsl", "hue"),
  parse: splitColor("hue", "saturation", "lightness"),
  transform: function(_a) {
    var hue = _a.hue, saturation = _a.saturation, lightness = _a.lightness, _b = _a.alpha, alpha$1 = _b === void 0 ? 1 : _b;
    return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
  }
};

// ../../node_modules/style-value-types/dist/es/color/rgba.js
var clampRgbUnit = clamp(0, 255);
var rgbUnit = __assign(__assign({}, number), {transform: function(v) {
  return Math.round(clampRgbUnit(v));
}});
var rgba = {
  test: isColorString("rgb", "red"),
  parse: splitColor("red", "green", "blue"),
  transform: function(_a) {
    var red2 = _a.red, green2 = _a.green, blue2 = _a.blue, _b = _a.alpha, alpha$1 = _b === void 0 ? 1 : _b;
    return "rgba(" + rgbUnit.transform(red2) + ", " + rgbUnit.transform(green2) + ", " + rgbUnit.transform(blue2) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
  }
};

// ../../node_modules/style-value-types/dist/es/color/hex.js
function parseHex(v) {
  var r = "";
  var g = "";
  var b2 = "";
  var a2 = "";
  if (v.length > 5) {
    r = v.substr(1, 2);
    g = v.substr(3, 2);
    b2 = v.substr(5, 2);
    a2 = v.substr(7, 2);
  } else {
    r = v.substr(1, 1);
    g = v.substr(2, 1);
    b2 = v.substr(3, 1);
    a2 = v.substr(4, 1);
    r += r;
    g += g;
    b2 += b2;
    a2 += a2;
  }
  return {
    red: parseInt(r, 16),
    green: parseInt(g, 16),
    blue: parseInt(b2, 16),
    alpha: a2 ? parseInt(a2, 16) / 255 : 1
  };
}
var hex = {
  test: isColorString("#"),
  parse: parseHex,
  transform: rgba.transform
};

// ../../node_modules/style-value-types/dist/es/color/index.js
var color = {
  test: function(v) {
    return rgba.test(v) || hex.test(v) || hsla.test(v);
  },
  parse: function(v) {
    if (rgba.test(v)) {
      return rgba.parse(v);
    } else if (hsla.test(v)) {
      return hsla.parse(v);
    } else {
      return hex.parse(v);
    }
  },
  transform: function(v) {
    return isString(v) ? v : v.hasOwnProperty("red") ? rgba.transform(v) : hsla.transform(v);
  }
};

// ../../node_modules/style-value-types/dist/es/complex/index.js
var colorToken = "${c}";
var numberToken = "${n}";
function test(v) {
  var _a, _b, _c, _d;
  return isNaN(v) && isString(v) && ((_b = (_a = v.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = v.match(colorRegex)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0;
}
function analyse(v) {
  var values3 = [];
  var numColors = 0;
  var colors = v.match(colorRegex);
  if (colors) {
    numColors = colors.length;
    v = v.replace(colorRegex, colorToken);
    values3.push.apply(values3, colors.map(color.parse));
  }
  var numbers = v.match(floatRegex);
  if (numbers) {
    v = v.replace(floatRegex, numberToken);
    values3.push.apply(values3, numbers.map(number.parse));
  }
  return {values: values3, numColors, tokenised: v};
}
function parse(v) {
  return analyse(v).values;
}
function createTransformer(v) {
  var _a = analyse(v), values3 = _a.values, numColors = _a.numColors, tokenised = _a.tokenised;
  var numValues = values3.length;
  return function(v2) {
    var output = tokenised;
    for (var i = 0; i < numValues; i++) {
      output = output.replace(i < numColors ? colorToken : numberToken, i < numColors ? color.transform(v2[i]) : sanitize(v2[i]));
    }
    return output;
  };
}
var convertNumbersToZero = function(v) {
  return typeof v === "number" ? 0 : v;
};
function getAnimatableNone(v) {
  var parsed = parse(v);
  var transformer = createTransformer(v);
  return transformer(parsed.map(convertNumbersToZero));
}
var complex = {test, parse, createTransformer, getAnimatableNone};

// ../../node_modules/style-value-types/dist/es/complex/filter.js
var maxDefaults = new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter(v) {
  var _a = v.slice(0, -1).split("("), name = _a[0], value = _a[1];
  if (name === "drop-shadow")
    return v;
  var number2 = (value.match(floatRegex) || [])[0];
  if (!number2)
    return v;
  var unit = value.replace(number2, "");
  var defaultValue = maxDefaults.has(name) ? 1 : 0;
  if (number2 !== value)
    defaultValue *= 100;
  return name + "(" + defaultValue + unit + ")";
}
var functionRegex = /([a-z-]*)\(.*?\)/g;
var filter = __assign(__assign({}, complex), {getAnimatableNone: function(v) {
  var functions = v.match(functionRegex);
  return functions ? functions.map(applyDefaultFilter).join(" ") : v;
}});

// ../../node_modules/framer-motion/dist/es/render/dom/value-types/type-int.js
var int = __assign(__assign({}, number), {transform: Math.round});

// ../../node_modules/framer-motion/dist/es/render/dom/value-types/number.js
var numberValueTypes = {
  borderWidth: px,
  borderTopWidth: px,
  borderRightWidth: px,
  borderBottomWidth: px,
  borderLeftWidth: px,
  borderRadius: px,
  radius: px,
  borderTopLeftRadius: px,
  borderTopRightRadius: px,
  borderBottomRightRadius: px,
  borderBottomLeftRadius: px,
  width: px,
  maxWidth: px,
  height: px,
  maxHeight: px,
  size: px,
  top: px,
  right: px,
  bottom: px,
  left: px,
  padding: px,
  paddingTop: px,
  paddingRight: px,
  paddingBottom: px,
  paddingLeft: px,
  margin: px,
  marginTop: px,
  marginRight: px,
  marginBottom: px,
  marginLeft: px,
  rotate: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale,
  scaleX: scale,
  scaleY: scale,
  scaleZ: scale,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px,
  translateX: px,
  translateY: px,
  translateZ: px,
  x: px,
  y: px,
  z: px,
  perspective: px,
  transformPerspective: px,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px,
  zIndex: int,
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int
};

// ../../node_modules/framer-motion/dist/es/render/html/utils/build-styles.js
function buildHTMLStyles(state, latestValues, projection, layoutState2, options, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin) {
  var _a;
  var style3 = state.style, vars = state.vars, transform3 = state.transform, transformKeys2 = state.transformKeys, transformOrigin = state.transformOrigin;
  transformKeys2.length = 0;
  var hasTransform = false;
  var hasTransformOrigin = false;
  var transformIsNone = true;
  for (var key in latestValues) {
    var value = latestValues[key];
    if (isCSSVariable(key)) {
      vars[key] = value;
      continue;
    }
    var valueType = numberValueTypes[key];
    var valueAsType = getValueAsType(value, valueType);
    if (isTransformProp(key)) {
      hasTransform = true;
      transform3[key] = valueAsType;
      transformKeys2.push(key);
      if (!transformIsNone)
        continue;
      if (value !== ((_a = valueType.default) !== null && _a !== void 0 ? _a : 0))
        transformIsNone = false;
    } else if (isTransformOriginProp(key)) {
      transformOrigin[key] = valueAsType;
      hasTransformOrigin = true;
    } else {
      if ((projection === null || projection === void 0 ? void 0 : projection.isHydrated) && (layoutState2 === null || layoutState2 === void 0 ? void 0 : layoutState2.isHydrated) && valueScaleCorrection[key]) {
        var correctedValue = valueScaleCorrection[key].process(value, layoutState2, projection);
        var applyTo = valueScaleCorrection[key].applyTo;
        if (applyTo) {
          var num = applyTo.length;
          for (var i = 0; i < num; i++) {
            style3[applyTo[i]] = correctedValue;
          }
        } else {
          style3[key] = correctedValue;
        }
      } else {
        style3[key] = valueAsType;
      }
    }
  }
  if (layoutState2 && projection && buildProjectionTransform && buildProjectionTransformOrigin) {
    style3.transform = buildProjectionTransform(layoutState2.deltaFinal, layoutState2.treeScale, hasTransform ? transform3 : void 0);
    if (transformTemplate) {
      style3.transform = transformTemplate(transform3, style3.transform);
    }
    style3.transformOrigin = buildProjectionTransformOrigin(layoutState2);
  } else {
    if (hasTransform) {
      style3.transform = buildTransform(state, options, transformIsNone, transformTemplate);
    }
    if (hasTransformOrigin) {
      style3.transformOrigin = buildTransformOrigin(transformOrigin);
    }
  }
}

// ../../node_modules/framer-motion/dist/es/render/html/utils/create-render-state.js
var createHtmlRenderState = function() {
  return {
    style: {},
    transform: {},
    transformKeys: [],
    transformOrigin: {},
    vars: {}
  };
};

// ../../node_modules/framer-motion/dist/es/render/html/use-props.js
function copyRawValuesOnly(target, source, props) {
  for (var key in source) {
    if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
      target[key] = source[key];
    }
  }
}
function useInitialMotionValues(_a, visualState, isStatic) {
  var transformTemplate = _a.transformTemplate;
  return (0, import_react14.useMemo)(function() {
    var state = createHtmlRenderState();
    buildHTMLStyles(state, visualState, void 0, void 0, {enableHardwareAcceleration: !isStatic}, transformTemplate);
    var vars = state.vars, style3 = state.style;
    return __assign(__assign({}, vars), style3);
  }, [visualState]);
}
function useStyle(props, visualState, isStatic) {
  var styleProp = props.style || {};
  var style3 = {};
  copyRawValuesOnly(style3, styleProp, props);
  Object.assign(style3, useInitialMotionValues(props, visualState, isStatic));
  if (props.transformValues) {
    style3 = props.transformValues(style3);
  }
  return style3;
}
function useHTMLProps(props, visualState, isStatic) {
  var htmlProps = {};
  var style3 = useStyle(props, visualState, isStatic);
  if (Boolean(props.drag)) {
    htmlProps.draggable = false;
    style3.userSelect = style3.WebkitUserSelect = style3.WebkitTouchCallout = "none";
    style3.touchAction = props.drag === true ? "none" : "pan-" + (props.drag === "x" ? "y" : "x");
  }
  htmlProps.style = style3;
  return htmlProps;
}

// ../../node_modules/framer-motion/dist/es/motion/utils/valid-prop.js
var validMotionProps = new Set([
  "initial",
  "animate",
  "exit",
  "style",
  "variants",
  "transition",
  "transformTemplate",
  "transformValues",
  "custom",
  "inherit",
  "layout",
  "layoutId",
  "_layoutResetTransform",
  "onLayoutAnimationComplete",
  "onViewportBoxUpdate",
  "onLayoutMeasure",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "drag",
  "dragControls",
  "dragListener",
  "dragConstraints",
  "dragDirectionLock",
  "_dragX",
  "_dragY",
  "dragElastic",
  "dragMomentum",
  "dragPropagation",
  "dragTransition",
  "whileDrag",
  "onPan",
  "onPanStart",
  "onPanEnd",
  "onPanSessionStart",
  "onTap",
  "onTapStart",
  "onTapCancel",
  "onHoverStart",
  "onHoverEnd",
  "whileFocus",
  "whileTap",
  "whileHover"
]);
function isValidMotionProp(key) {
  return validMotionProps.has(key);
}

// ../../node_modules/framer-motion/dist/es/render/dom/utils/filter-props.js
var shouldForward = function(key) {
  return !isValidMotionProp(key);
};
try {
  emotionIsPropValid_1 = require_is_prop_valid_browser_cjs().default;
  shouldForward = function(key) {
    if (key.startsWith("on")) {
      return !isValidMotionProp(key);
    } else {
      return emotionIsPropValid_1(key);
    }
  };
} catch (_a) {
}
var emotionIsPropValid_1;
function filterProps(props, isDom, forwardMotionProps) {
  var filteredProps = {};
  for (var key in props) {
    if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key)) {
      filteredProps[key] = props[key];
    }
  }
  return filteredProps;
}

// ../../node_modules/framer-motion/dist/es/render/svg/use-props.js
var import_react15 = __toModule(require_react());

// ../../node_modules/framer-motion/dist/es/render/svg/utils/transform-origin.js
function calcOrigin(origin, offset, size) {
  return typeof origin === "string" ? origin : px.transform(offset + size * origin);
}
function calcSVGTransformOrigin(dimensions, originX, originY) {
  var pxOriginX = calcOrigin(originX, dimensions.x, dimensions.width);
  var pxOriginY = calcOrigin(originY, dimensions.y, dimensions.height);
  return pxOriginX + " " + pxOriginY;
}

// ../../node_modules/framer-motion/dist/es/render/svg/utils/path.js
var progressToPixels = function(progress2, length2) {
  return px.transform(progress2 * length2);
};
var dashKeys = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
};
var camelKeys = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function buildSVGPath(attrs, totalLength, length2, spacing2, offset, useDashCase) {
  if (spacing2 === void 0) {
    spacing2 = 1;
  }
  if (offset === void 0) {
    offset = 0;
  }
  if (useDashCase === void 0) {
    useDashCase = true;
  }
  var keys = useDashCase ? dashKeys : camelKeys;
  attrs[keys.offset] = progressToPixels(-offset, totalLength);
  var pathLength = progressToPixels(length2, totalLength);
  var pathSpacing = progressToPixels(spacing2, totalLength);
  attrs[keys.array] = pathLength + " " + pathSpacing;
}

// ../../node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.js
function buildSVGAttrs(state, _a, projection, layoutState2, options, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin) {
  var attrX = _a.attrX, attrY = _a.attrY, originX = _a.originX, originY = _a.originY, pathLength = _a.pathLength, _b = _a.pathSpacing, pathSpacing = _b === void 0 ? 1 : _b, _c = _a.pathOffset, pathOffset = _c === void 0 ? 0 : _c, latest = __rest(_a, ["attrX", "attrY", "originX", "originY", "pathLength", "pathSpacing", "pathOffset"]);
  buildHTMLStyles(state, latest, projection, layoutState2, options, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin);
  state.attrs = state.style;
  state.style = {};
  var attrs = state.attrs, style3 = state.style, dimensions = state.dimensions, totalPathLength = state.totalPathLength;
  if (attrs.transform) {
    if (dimensions)
      style3.transform = attrs.transform;
    delete attrs.transform;
  }
  if (dimensions && (originX !== void 0 || originY !== void 0 || style3.transform)) {
    style3.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== void 0 ? originX : 0.5, originY !== void 0 ? originY : 0.5);
  }
  if (attrX !== void 0)
    attrs.x = attrX;
  if (attrY !== void 0)
    attrs.y = attrY;
  if (totalPathLength !== void 0 && pathLength !== void 0) {
    buildSVGPath(attrs, totalPathLength, pathLength, pathSpacing, pathOffset, false);
  }
}

// ../../node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.js
var createSvgRenderState = function() {
  return __assign(__assign({}, createHtmlRenderState()), {attrs: {}});
};

// ../../node_modules/framer-motion/dist/es/render/svg/use-props.js
function useSVGProps(props, visualState) {
  var visualProps = (0, import_react15.useMemo)(function() {
    var state = createSvgRenderState();
    buildSVGAttrs(state, visualState, void 0, void 0, {enableHardwareAcceleration: false}, props.transformTemplate);
    return __assign(__assign({}, state.attrs), {style: __assign({}, state.style)});
  }, [visualState]);
  if (props.style) {
    var rawStyles = {};
    copyRawValuesOnly(rawStyles, props.style, props);
    visualProps.style = __assign(__assign({}, rawStyles), visualProps.style);
  }
  return visualProps;
}

// ../../node_modules/framer-motion/dist/es/render/dom/use-render.js
function createUseRender(forwardMotionProps) {
  if (forwardMotionProps === void 0) {
    forwardMotionProps = false;
  }
  var useRender = function(Component3, props, ref, _a, isStatic) {
    var latestValues = _a.latestValues;
    var useVisualProps = isSVGComponent(Component3) ? useSVGProps : useHTMLProps;
    var visualProps = useVisualProps(props, latestValues, isStatic);
    var filteredProps = filterProps(props, typeof Component3 === "string", forwardMotionProps);
    var elementProps = __assign(__assign(__assign({}, filteredProps), visualProps), {ref});
    return (0, import_react16.createElement)(Component3, elementProps);
  };
  return useRender;
}

// ../../node_modules/framer-motion/dist/es/render/dom/utils/camel-to-dash.js
var CAMEL_CASE_PATTERN = /([a-z])([A-Z])/g;
var REPLACE_TEMPLATE = "$1-$2";
var camelToDash = function(str) {
  return str.replace(CAMEL_CASE_PATTERN, REPLACE_TEMPLATE).toLowerCase();
};

// ../../node_modules/framer-motion/dist/es/render/html/utils/render.js
function renderHTML(element, _a) {
  var style3 = _a.style, vars = _a.vars;
  Object.assign(element.style, style3);
  for (var key in vars) {
    element.style.setProperty(key, vars[key]);
  }
}

// ../../node_modules/framer-motion/dist/es/render/svg/utils/camel-case-attrs.js
var camelCaseAttributes = new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox"
]);

// ../../node_modules/framer-motion/dist/es/render/svg/utils/render.js
function renderSVG(element, renderState) {
  renderHTML(element, renderState);
  for (var key in renderState.attrs) {
    element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
  }
}

// ../../node_modules/framer-motion/dist/es/render/html/utils/scrape-motion-values.js
function scrapeMotionValuesFromProps(props) {
  var style3 = props.style;
  var newValues = {};
  for (var key in style3) {
    if (isMotionValue(style3[key]) || isForcedMotionValue(key, props)) {
      newValues[key] = style3[key];
    }
  }
  return newValues;
}

// ../../node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.js
function scrapeMotionValuesFromProps2(props) {
  var newValues = scrapeMotionValuesFromProps(props);
  for (var key in props) {
    if (isMotionValue(props[key])) {
      var targetKey = key === "x" || key === "y" ? "attr" + key.toUpperCase() : key;
      newValues[targetKey] = props[key];
    }
  }
  return newValues;
}

// ../../node_modules/framer-motion/dist/es/motion/utils/use-visual-state.js
var import_react17 = __toModule(require_react());

// ../../node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.js
function isAnimationControls(v) {
  return typeof v === "object" && typeof v.start === "function";
}

// ../../node_modules/framer-motion/dist/es/animation/utils/is-keyframes-target.js
var isKeyframesTarget = function(v) {
  return Array.isArray(v);
};

// ../../node_modules/framer-motion/dist/es/utils/resolve-value.js
var isCustomValue = function(v) {
  return Boolean(v && typeof v === "object" && v.mix && v.toValue);
};
var resolveFinalValueInKeyframes = function(v) {
  return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
};

// ../../node_modules/framer-motion/dist/es/value/utils/resolve-motion-value.js
function resolveMotionValue(value) {
  var unwrappedValue = isMotionValue(value) ? value.get() : value;
  return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
}

// ../../node_modules/framer-motion/dist/es/motion/utils/use-visual-state.js
function makeState(_a, props, context, presenceContext) {
  var scrapeMotionValuesFromProps3 = _a.scrapeMotionValuesFromProps, createRenderState = _a.createRenderState, onMount = _a.onMount;
  var state = {
    latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps3),
    renderState: createRenderState()
  };
  if (onMount) {
    state.mount = function(instance) {
      return onMount(props, instance, state);
    };
  }
  return state;
}
var makeUseVisualState = function(config) {
  return function(props, isStatic) {
    var context = (0, import_react17.useContext)(MotionContext);
    var presenceContext = (0, import_react17.useContext)(PresenceContext);
    return isStatic ? makeState(config, props, context, presenceContext) : useConstant(function() {
      return makeState(config, props, context, presenceContext);
    });
  };
};
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
  var values3 = {};
  var blockInitialAnimation = (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.initial) === false;
  var motionValues = scrapeMotionValues(props);
  for (var key in motionValues) {
    values3[key] = resolveMotionValue(motionValues[key]);
  }
  var initial = props.initial, animate3 = props.animate;
  var isControllingVariants = checkIfControllingVariants(props);
  var isVariantNode = checkIfVariantNode(props);
  if (context && isVariantNode && !isControllingVariants && props.inherit !== false) {
    initial !== null && initial !== void 0 ? initial : initial = context.initial;
    animate3 !== null && animate3 !== void 0 ? animate3 : animate3 = context.animate;
  }
  var variantToSet = blockInitialAnimation || initial === false ? animate3 : initial;
  if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
    var list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
    list.forEach(function(definition) {
      var resolved = resolveVariantFromProps(props, definition);
      if (!resolved)
        return;
      var transitionEnd = resolved.transitionEnd;
      resolved.transition;
      var target = __rest(resolved, ["transitionEnd", "transition"]);
      for (var key2 in target)
        values3[key2] = target[key2];
      for (var key2 in transitionEnd)
        values3[key2] = transitionEnd[key2];
    });
  }
  return values3;
}

// ../../node_modules/framer-motion/dist/es/render/svg/config-motion.js
var svgMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2,
    createRenderState: createSvgRenderState,
    onMount: function(props, instance, _a) {
      var renderState = _a.renderState, latestValues = _a.latestValues;
      try {
        renderState.dimensions = typeof instance.getBBox === "function" ? instance.getBBox() : instance.getBoundingClientRect();
      } catch (e) {
        renderState.dimensions = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
      }
      if (isPath(instance)) {
        renderState.totalPathLength = instance.getTotalLength();
      }
      buildSVGAttrs(renderState, latestValues, void 0, void 0, {enableHardwareAcceleration: false}, props.transformTemplate);
      renderSVG(instance, renderState);
    }
  })
};
function isPath(element) {
  return element.tagName === "path";
}

// ../../node_modules/framer-motion/dist/es/render/html/config-motion.js
var htmlMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps,
    createRenderState: createHtmlRenderState
  })
};

// ../../node_modules/framer-motion/dist/es/render/dom/utils/create-config.js
function createDomMotionConfig(Component3, _a, preloadedFeatures, createVisualElement) {
  var _b = _a.forwardMotionProps, forwardMotionProps = _b === void 0 ? false : _b;
  var baseConfig = isSVGComponent(Component3) ? svgMotionConfig : htmlMotionConfig;
  return __assign(__assign({}, baseConfig), {
    preloadedFeatures,
    useRender: createUseRender(forwardMotionProps),
    createVisualElement,
    Component: Component3
  });
}

// ../../node_modules/framer-motion/dist/es/render/utils/types.js
var AnimationType;
(function(AnimationType2) {
  AnimationType2["Animate"] = "animate";
  AnimationType2["Hover"] = "whileHover";
  AnimationType2["Tap"] = "whileTap";
  AnimationType2["Drag"] = "whileDrag";
  AnimationType2["Focus"] = "whileFocus";
  AnimationType2["Exit"] = "exit";
})(AnimationType || (AnimationType = {}));

// ../../node_modules/framer-motion/dist/es/events/use-dom-event.js
var import_react18 = __toModule(require_react());
function addDomEvent(target, eventName, handler, options) {
  target.addEventListener(eventName, handler, options);
  return function() {
    return target.removeEventListener(eventName, handler, options);
  };
}
function useDomEvent(ref, eventName, handler, options) {
  (0, import_react18.useEffect)(function() {
    var element = ref.current;
    if (handler && element) {
      return addDomEvent(element, eventName, handler, options);
    }
  }, [ref, eventName, handler, options]);
}

// ../../node_modules/framer-motion/dist/es/gestures/use-focus-gesture.js
function useFocusGesture(_a) {
  var whileFocus = _a.whileFocus, visualElement2 = _a.visualElement;
  var onFocus = function() {
    var _a2;
    (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.Focus, true);
  };
  var onBlur = function() {
    var _a2;
    (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.Focus, false);
  };
  useDomEvent(visualElement2, "focus", whileFocus ? onFocus : void 0);
  useDomEvent(visualElement2, "blur", whileFocus ? onBlur : void 0);
}

// ../../node_modules/framer-motion/dist/es/gestures/utils/event-type.js
function isMouseEvent(event) {
  if (typeof PointerEvent !== "undefined" && event instanceof PointerEvent) {
    return !!(event.pointerType === "mouse");
  }
  return event instanceof MouseEvent;
}
function isTouchEvent(event) {
  var hasTouches = !!event.touches;
  return hasTouches;
}

// ../../node_modules/framer-motion/dist/es/events/event-info.js
function filterPrimaryPointer(eventHandler) {
  return function(event) {
    var isMouseEvent2 = event instanceof MouseEvent;
    var isPrimaryPointer = !isMouseEvent2 || isMouseEvent2 && event.button === 0;
    if (isPrimaryPointer) {
      eventHandler(event);
    }
  };
}
var defaultPagePoint = {pageX: 0, pageY: 0};
function pointFromTouch(e, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }
  var primaryTouch = e.touches[0] || e.changedTouches[0];
  var point = primaryTouch || defaultPagePoint;
  return {
    x: point[pointType + "X"],
    y: point[pointType + "Y"]
  };
}
function pointFromMouse(point, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }
  return {
    x: point[pointType + "X"],
    y: point[pointType + "Y"]
  };
}
function extractEventInfo(event, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }
  return {
    point: isTouchEvent(event) ? pointFromTouch(event, pointType) : pointFromMouse(event, pointType)
  };
}
function getViewportPointFromEvent(event) {
  return extractEventInfo(event, "client");
}
var wrapHandler = function(handler, shouldFilterPrimaryPointer) {
  if (shouldFilterPrimaryPointer === void 0) {
    shouldFilterPrimaryPointer = false;
  }
  var listener = function(event) {
    return handler(event, extractEventInfo(event));
  };
  return shouldFilterPrimaryPointer ? filterPrimaryPointer(listener) : listener;
};

// ../../node_modules/framer-motion/dist/es/events/utils.js
var supportsPointerEvents = function() {
  return isBrowser && window.onpointerdown === null;
};
var supportsTouchEvents = function() {
  return isBrowser && window.ontouchstart === null;
};
var supportsMouseEvents = function() {
  return isBrowser && window.onmousedown === null;
};

// ../../node_modules/framer-motion/dist/es/events/use-pointer-event.js
var mouseEventNames = {
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointercancel: "mousecancel",
  pointerover: "mouseover",
  pointerout: "mouseout",
  pointerenter: "mouseenter",
  pointerleave: "mouseleave"
};
var touchEventNames = {
  pointerdown: "touchstart",
  pointermove: "touchmove",
  pointerup: "touchend",
  pointercancel: "touchcancel"
};
function getPointerEventName(name) {
  if (supportsPointerEvents()) {
    return name;
  } else if (supportsTouchEvents()) {
    return touchEventNames[name];
  } else if (supportsMouseEvents()) {
    return mouseEventNames[name];
  }
  return name;
}
function addPointerEvent(target, eventName, handler, options) {
  return addDomEvent(target, getPointerEventName(eventName), wrapHandler(handler, eventName === "pointerdown"), options);
}
function usePointerEvent(ref, eventName, handler, options) {
  return useDomEvent(ref, getPointerEventName(eventName), handler && wrapHandler(handler, eventName === "pointerdown"), options);
}

// ../../node_modules/framer-motion/dist/es/gestures/drag/utils/lock.js
function createLock(name) {
  var lock = null;
  return function() {
    var openLock = function() {
      lock = null;
    };
    if (lock === null) {
      lock = name;
      return openLock;
    }
    return false;
  };
}
var globalHorizontalLock = createLock("dragHorizontal");
var globalVerticalLock = createLock("dragVertical");
function getGlobalLock(drag2) {
  var lock = false;
  if (drag2 === "y") {
    lock = globalVerticalLock();
  } else if (drag2 === "x") {
    lock = globalHorizontalLock();
  } else {
    var openHorizontal_1 = globalHorizontalLock();
    var openVertical_1 = globalVerticalLock();
    if (openHorizontal_1 && openVertical_1) {
      lock = function() {
        openHorizontal_1();
        openVertical_1();
      };
    } else {
      if (openHorizontal_1)
        openHorizontal_1();
      if (openVertical_1)
        openVertical_1();
    }
  }
  return lock;
}
function isDragActive() {
  var openGestureLock = getGlobalLock(true);
  if (!openGestureLock)
    return true;
  openGestureLock();
  return false;
}

// ../../node_modules/framesync/dist/es/on-next-frame.js
var defaultTimestep = 1 / 60 * 1e3;
var getCurrentTime = typeof performance !== "undefined" ? function() {
  return performance.now();
} : function() {
  return Date.now();
};
var onNextFrame = typeof window !== "undefined" ? function(callback) {
  return window.requestAnimationFrame(callback);
} : function(callback) {
  return setTimeout(function() {
    return callback(getCurrentTime());
  }, defaultTimestep);
};

// ../../node_modules/framesync/dist/es/create-render-step.js
function createRenderStep(runNextFrame2) {
  var toRun = [];
  var toRunNextFrame = [];
  var numToRun = 0;
  var isProcessing2 = false;
  var toKeepAlive = new WeakSet();
  var step = {
    schedule: function(callback, keepAlive, immediate) {
      if (keepAlive === void 0) {
        keepAlive = false;
      }
      if (immediate === void 0) {
        immediate = false;
      }
      var addToCurrentFrame = immediate && isProcessing2;
      var buffer = addToCurrentFrame ? toRun : toRunNextFrame;
      if (keepAlive)
        toKeepAlive.add(callback);
      if (buffer.indexOf(callback) === -1) {
        buffer.push(callback);
        if (addToCurrentFrame && isProcessing2)
          numToRun = toRun.length;
      }
      return callback;
    },
    cancel: function(callback) {
      var index = toRunNextFrame.indexOf(callback);
      if (index !== -1)
        toRunNextFrame.splice(index, 1);
      toKeepAlive.delete(callback);
    },
    process: function(frameData) {
      var _a;
      isProcessing2 = true;
      _a = [toRunNextFrame, toRun], toRun = _a[0], toRunNextFrame = _a[1];
      toRunNextFrame.length = 0;
      numToRun = toRun.length;
      if (numToRun) {
        for (var i = 0; i < numToRun; i++) {
          var callback = toRun[i];
          callback(frameData);
          if (toKeepAlive.has(callback)) {
            step.schedule(callback);
            runNextFrame2();
          }
        }
      }
      isProcessing2 = false;
    }
  };
  return step;
}

// ../../node_modules/framesync/dist/es/index.js
var maxElapsed = 40;
var useDefaultElapsed = true;
var runNextFrame = false;
var isProcessing = false;
var frame = {
  delta: 0,
  timestamp: 0
};
var stepsOrder = ["read", "update", "preRender", "render", "postRender"];
var steps = /* @__PURE__ */ stepsOrder.reduce(function(acc, key) {
  acc[key] = createRenderStep(function() {
    return runNextFrame = true;
  });
  return acc;
}, {});
var sync = /* @__PURE__ */ stepsOrder.reduce(function(acc, key) {
  var step = steps[key];
  acc[key] = function(process2, keepAlive, immediate) {
    if (keepAlive === void 0) {
      keepAlive = false;
    }
    if (immediate === void 0) {
      immediate = false;
    }
    if (!runNextFrame)
      startLoop();
    return step.schedule(process2, keepAlive, immediate);
  };
  return acc;
}, {});
var cancelSync = /* @__PURE__ */ stepsOrder.reduce(function(acc, key) {
  acc[key] = steps[key].cancel;
  return acc;
}, {});
var flushSync = /* @__PURE__ */ stepsOrder.reduce(function(acc, key) {
  acc[key] = function() {
    return steps[key].process(frame);
  };
  return acc;
}, {});
var processStep = function(stepId) {
  return steps[stepId].process(frame);
};
var processFrame = function(timestamp) {
  runNextFrame = false;
  frame.delta = useDefaultElapsed ? defaultTimestep : Math.max(Math.min(timestamp - frame.timestamp, maxElapsed), 1);
  frame.timestamp = timestamp;
  isProcessing = true;
  stepsOrder.forEach(processStep);
  isProcessing = false;
  if (runNextFrame) {
    useDefaultElapsed = false;
    onNextFrame(processFrame);
  }
};
var startLoop = function() {
  runNextFrame = true;
  useDefaultElapsed = true;
  if (!isProcessing)
    onNextFrame(processFrame);
};
var getFrameData = function() {
  return frame;
};
var es_default = sync;

// ../../node_modules/framer-motion/dist/es/render/dom/utils/batch-layout.js
var unresolvedJobs = new Set();
var layoutState = {
  isMeasuringLayout: false
};
function pushJob(stack, job, pointer) {
  if (!stack[pointer])
    stack[pointer] = [];
  stack[pointer].push(job);
}
function batchLayout(callback) {
  unresolvedJobs.add(callback);
  return function() {
    return unresolvedJobs.delete(callback);
  };
}
function flushLayout() {
  if (!unresolvedJobs.size)
    return;
  var pointer = 0;
  var reads = [[]];
  var writes = [];
  var setRead = function(job) {
    return pushJob(reads, job, pointer);
  };
  var setWrite = function(job) {
    pushJob(writes, job, pointer);
    pointer++;
  };
  unresolvedJobs.forEach(function(callback) {
    callback(setRead, setWrite);
    pointer = 0;
  });
  unresolvedJobs.clear();
  layoutState.isMeasuringLayout = true;
  es_default.postRender(function() {
    setTimeout(function() {
      return layoutState.isMeasuringLayout = false;
    }, 10);
  });
  var numStacks = writes.length;
  for (var i = 0; i <= numStacks; i++) {
    reads[i] && reads[i].forEach(executeJob);
    writes[i] && writes[i].forEach(executeJob);
  }
}
var executeJob = function(job) {
  return job();
};

// ../../node_modules/framer-motion/dist/es/gestures/use-hover-gesture.js
function createHoverEvent(visualElement2, isActive, callback) {
  return function(event, info) {
    var _a;
    if (!isMouseEvent(event) || layoutState.isMeasuringLayout || isDragActive()) {
      return;
    }
    callback === null || callback === void 0 ? void 0 : callback(event, info);
    (_a = visualElement2.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Hover, isActive);
  };
}
function useHoverGesture(_a) {
  var onHoverStart = _a.onHoverStart, onHoverEnd = _a.onHoverEnd, whileHover = _a.whileHover, visualElement2 = _a.visualElement;
  usePointerEvent(visualElement2, "pointerenter", onHoverStart || whileHover ? createHoverEvent(visualElement2, true, onHoverStart) : void 0);
  usePointerEvent(visualElement2, "pointerleave", onHoverEnd || whileHover ? createHoverEvent(visualElement2, false, onHoverEnd) : void 0);
}

// ../../node_modules/framer-motion/dist/es/gestures/use-tap-gesture.js
var import_react20 = __toModule(require_react());

// ../../node_modules/framer-motion/dist/es/gestures/utils/is-node-or-child.js
var isNodeOrChild = function(parent, child) {
  if (!child) {
    return false;
  } else if (parent === child) {
    return true;
  } else {
    return isNodeOrChild(parent, child.parentElement);
  }
};

// ../../node_modules/framer-motion/dist/es/utils/use-unmount-effect.js
var import_react19 = __toModule(require_react());
function useUnmountEffect(callback) {
  return (0, import_react19.useEffect)(function() {
    return function() {
      return callback();
    };
  }, []);
}

// ../../node_modules/popmotion/dist/es/utils/clamp.js
var clamp2 = function(min, max, v) {
  return Math.min(Math.max(v, min), max);
};

// ../../node_modules/popmotion/dist/es/animations/utils/find-spring.js
var safeMin = 1e-3;
var minDuration = 0.01;
var maxDuration = 10;
var minDamping = 0.05;
var maxDamping = 1;
function findSpring(_a) {
  var _b = _a.duration, duration2 = _b === void 0 ? 800 : _b, _c = _a.bounce, bounce = _c === void 0 ? 0.25 : _c, _d = _a.velocity, velocity = _d === void 0 ? 0 : _d, _e = _a.mass, mass = _e === void 0 ? 1 : _e;
  var envelope;
  var derivative;
  warning(duration2 <= maxDuration * 1e3, "Spring duration must be 10 seconds or less");
  var dampingRatio = 1 - bounce;
  dampingRatio = clamp2(minDamping, maxDamping, dampingRatio);
  duration2 = clamp2(minDuration, maxDuration, duration2 / 1e3);
  if (dampingRatio < 1) {
    envelope = function(undampedFreq2) {
      var exponentialDecay = undampedFreq2 * dampingRatio;
      var delta2 = exponentialDecay * duration2;
      var a2 = exponentialDecay - velocity;
      var b2 = calcAngularFreq(undampedFreq2, dampingRatio);
      var c2 = Math.exp(-delta2);
      return safeMin - a2 / b2 * c2;
    };
    derivative = function(undampedFreq2) {
      var exponentialDecay = undampedFreq2 * dampingRatio;
      var delta2 = exponentialDecay * duration2;
      var d = delta2 * velocity + velocity;
      var e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration2;
      var f = Math.exp(-delta2);
      var g = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
      var factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
      return factor * ((d - e) * f) / g;
    };
  } else {
    envelope = function(undampedFreq2) {
      var a2 = Math.exp(-undampedFreq2 * duration2);
      var b2 = (undampedFreq2 - velocity) * duration2 + 1;
      return -safeMin + a2 * b2;
    };
    derivative = function(undampedFreq2) {
      var a2 = Math.exp(-undampedFreq2 * duration2);
      var b2 = (velocity - undampedFreq2) * (duration2 * duration2);
      return a2 * b2;
    };
  }
  var initialGuess = 5 / duration2;
  var undampedFreq = approximateRoot(envelope, derivative, initialGuess);
  if (isNaN(undampedFreq)) {
    return {
      stiffness: 100,
      damping: 10
    };
  } else {
    var stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness)
    };
  }
}
var rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
  var result = initialGuess;
  for (var i = 1; i < rootIterations; i++) {
    result = result - envelope(result) / derivative(result);
  }
  return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}

// ../../node_modules/popmotion/dist/es/animations/generators/spring.js
var durationKeys = ["duration", "bounce"];
var physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys) {
  return keys.some(function(key) {
    return options[key] !== void 0;
  });
}
function getSpringOptions(options) {
  var springOptions = __assign({velocity: 0, stiffness: 100, damping: 10, mass: 1, isResolvedFromDuration: false}, options);
  if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
    var derived = findSpring(options);
    springOptions = __assign(__assign(__assign({}, springOptions), derived), {velocity: 0, mass: 1});
    springOptions.isResolvedFromDuration = true;
  }
  return springOptions;
}
function spring(_a) {
  var _b = _a.from, from2 = _b === void 0 ? 0 : _b, _c = _a.to, to = _c === void 0 ? 1 : _c, _d = _a.restSpeed, restSpeed = _d === void 0 ? 2 : _d, restDelta = _a.restDelta, options = __rest(_a, ["from", "to", "restSpeed", "restDelta"]);
  var state = {done: false, value: from2};
  var _e = getSpringOptions(options), stiffness = _e.stiffness, damping = _e.damping, mass = _e.mass, velocity = _e.velocity, isResolvedFromDuration = _e.isResolvedFromDuration;
  var resolveSpring = zero;
  var resolveVelocity = zero;
  function createSpring() {
    var initialVelocity = velocity ? -(velocity / 1e3) : 0;
    var initialDelta = to - from2;
    var dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
    var undampedAngularFreq = Math.sqrt(stiffness / mass) / 1e3;
    restDelta !== null && restDelta !== void 0 ? restDelta : restDelta = Math.abs(to - from2) <= 1 ? 0.01 : 0.4;
    if (dampingRatio < 1) {
      var angularFreq_1 = calcAngularFreq(undampedAngularFreq, dampingRatio);
      resolveSpring = function(t) {
        var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq_1 * Math.sin(angularFreq_1 * t) + initialDelta * Math.cos(angularFreq_1 * t));
      };
      resolveVelocity = function(t) {
        var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        return dampingRatio * undampedAngularFreq * envelope * (Math.sin(angularFreq_1 * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq_1 + initialDelta * Math.cos(angularFreq_1 * t)) - envelope * (Math.cos(angularFreq_1 * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) - angularFreq_1 * initialDelta * Math.sin(angularFreq_1 * t));
      };
    } else if (dampingRatio === 1) {
      resolveSpring = function(t) {
        return to - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
      };
    } else {
      var dampedAngularFreq_1 = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
      resolveSpring = function(t) {
        var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        var freqForT = Math.min(dampedAngularFreq_1 * t, 300);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq_1 * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq_1;
      };
    }
  }
  createSpring();
  return {
    next: function(t) {
      var current = resolveSpring(t);
      if (!isResolvedFromDuration) {
        var currentVelocity = resolveVelocity(t) * 1e3;
        var isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
        var isBelowDisplacementThreshold = Math.abs(to - current) <= restDelta;
        state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
      } else {
        state.done = t >= options.duration;
      }
      state.value = state.done ? to : current;
      return state;
    },
    flipTarget: function() {
      var _a2;
      velocity = -velocity;
      _a2 = [to, from2], from2 = _a2[0], to = _a2[1];
      createSpring();
    }
  };
}
spring.needsInterpolation = function(a2, b2) {
  return typeof a2 === "string" || typeof b2 === "string";
};
var zero = function(_t5) {
  return 0;
};

// ../../node_modules/popmotion/dist/es/utils/progress.js
var progress = function(from2, to, value) {
  var toFromDifference = to - from2;
  return toFromDifference === 0 ? 1 : (value - from2) / toFromDifference;
};

// ../../node_modules/popmotion/dist/es/utils/mix.js
var mix = function(from2, to, progress2) {
  return -progress2 * from2 + progress2 * to + from2;
};

// ../../node_modules/popmotion/dist/es/utils/mix-color.js
var mixLinearColor = function(from2, to, v) {
  var fromExpo = from2 * from2;
  var toExpo = to * to;
  return Math.sqrt(Math.max(0, v * (toExpo - fromExpo) + fromExpo));
};
var colorTypes = [hex, rgba, hsla];
var getColorType = function(v) {
  return colorTypes.find(function(type) {
    return type.test(v);
  });
};
var notAnimatable = function(color3) {
  return "'" + color3 + "' is not an animatable color. Use the equivalent color code instead.";
};
var mixColor = function(from2, to) {
  var fromColorType = getColorType(from2);
  var toColorType = getColorType(to);
  invariant(!!fromColorType, notAnimatable(from2));
  invariant(!!toColorType, notAnimatable(to));
  invariant(fromColorType.transform === toColorType.transform, "Both colors must be hex/RGBA, OR both must be HSLA.");
  var fromColor = fromColorType.parse(from2);
  var toColor = toColorType.parse(to);
  var blended = __assign({}, fromColor);
  var mixFunc = fromColorType === hsla ? mix : mixLinearColor;
  return function(v) {
    for (var key in blended) {
      if (key !== "alpha") {
        blended[key] = mixFunc(fromColor[key], toColor[key], v);
      }
    }
    blended.alpha = mix(fromColor.alpha, toColor.alpha, v);
    return fromColorType.transform(blended);
  };
};

// ../../node_modules/popmotion/dist/es/utils/inc.js
var isNum = function(v) {
  return typeof v === "number";
};

// ../../node_modules/popmotion/dist/es/utils/pipe.js
var combineFunctions = function(a2, b2) {
  return function(v) {
    return b2(a2(v));
  };
};
var pipe = function() {
  var transformers = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    transformers[_i] = arguments[_i];
  }
  return transformers.reduce(combineFunctions);
};

// ../../node_modules/popmotion/dist/es/utils/mix-complex.js
function getMixer(origin, target) {
  if (isNum(origin)) {
    return function(v) {
      return mix(origin, target, v);
    };
  } else if (color.test(origin)) {
    return mixColor(origin, target);
  } else {
    return mixComplex(origin, target);
  }
}
var mixArray = function(from2, to) {
  var output = __spreadArray([], from2);
  var numValues = output.length;
  var blendValue = from2.map(function(fromThis, i) {
    return getMixer(fromThis, to[i]);
  });
  return function(v) {
    for (var i = 0; i < numValues; i++) {
      output[i] = blendValue[i](v);
    }
    return output;
  };
};
var mixObject = function(origin, target) {
  var output = __assign(__assign({}, origin), target);
  var blendValue = {};
  for (var key in output) {
    if (origin[key] !== void 0 && target[key] !== void 0) {
      blendValue[key] = getMixer(origin[key], target[key]);
    }
  }
  return function(v) {
    for (var key2 in blendValue) {
      output[key2] = blendValue[key2](v);
    }
    return output;
  };
};
function analyse2(value) {
  var parsed = complex.parse(value);
  var numValues = parsed.length;
  var numNumbers = 0;
  var numRGB = 0;
  var numHSL = 0;
  for (var i = 0; i < numValues; i++) {
    if (numNumbers || typeof parsed[i] === "number") {
      numNumbers++;
    } else {
      if (parsed[i].hue !== void 0) {
        numHSL++;
      } else {
        numRGB++;
      }
    }
  }
  return {parsed, numNumbers, numRGB, numHSL};
}
var mixComplex = function(origin, target) {
  var template = complex.createTransformer(target);
  var originStats = analyse2(origin);
  var targetStats = analyse2(target);
  invariant(originStats.numHSL === targetStats.numHSL && originStats.numRGB === targetStats.numRGB && originStats.numNumbers >= targetStats.numNumbers, "Complex values '" + origin + "' and '" + target + "' too different to mix. Ensure all colors are of the same type.");
  return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
};

// ../../node_modules/popmotion/dist/es/utils/interpolate.js
var mixNumber = function(from2, to) {
  return function(p) {
    return mix(from2, to, p);
  };
};
function detectMixerFactory(v) {
  if (typeof v === "number") {
    return mixNumber;
  } else if (typeof v === "string") {
    if (color.test(v)) {
      return mixColor;
    } else {
      return mixComplex;
    }
  } else if (Array.isArray(v)) {
    return mixArray;
  } else if (typeof v === "object") {
    return mixObject;
  }
}
function createMixers(output, ease, customMixer) {
  var mixers = [];
  var mixerFactory = customMixer || detectMixerFactory(output[0]);
  var numMixers = output.length - 1;
  for (var i = 0; i < numMixers; i++) {
    var mixer = mixerFactory(output[i], output[i + 1]);
    if (ease) {
      var easingFunction = Array.isArray(ease) ? ease[i] : ease;
      mixer = pipe(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
function fastInterpolate(_a, _b) {
  var from2 = _a[0], to = _a[1];
  var mixer = _b[0];
  return function(v) {
    return mixer(progress(from2, to, v));
  };
}
function slowInterpolate(input, mixers) {
  var inputLength = input.length;
  var lastInputIndex = inputLength - 1;
  return function(v) {
    var mixerIndex = 0;
    var foundMixerIndex = false;
    if (v <= input[0]) {
      foundMixerIndex = true;
    } else if (v >= input[lastInputIndex]) {
      mixerIndex = lastInputIndex - 1;
      foundMixerIndex = true;
    }
    if (!foundMixerIndex) {
      var i = 1;
      for (; i < inputLength; i++) {
        if (input[i] > v || i === lastInputIndex) {
          break;
        }
      }
      mixerIndex = i - 1;
    }
    var progressInRange = progress(input[mixerIndex], input[mixerIndex + 1], v);
    return mixers[mixerIndex](progressInRange);
  };
}
function interpolate(input, output, _a) {
  var _b = _a === void 0 ? {} : _a, _c = _b.clamp, isClamp = _c === void 0 ? true : _c, ease = _b.ease, mixer = _b.mixer;
  var inputLength = input.length;
  invariant(inputLength === output.length, "Both input and output ranges must be the same length");
  invariant(!ease || !Array.isArray(ease) || ease.length === inputLength - 1, "Array of easing functions must be of length `input.length - 1`, as it applies to the transitions **between** the defined values.");
  if (input[0] > input[inputLength - 1]) {
    input = [].concat(input);
    output = [].concat(output);
    input.reverse();
    output.reverse();
  }
  var mixers = createMixers(output, ease, mixer);
  var interpolator = inputLength === 2 ? fastInterpolate(input, mixers) : slowInterpolate(input, mixers);
  return isClamp ? function(v) {
    return interpolator(clamp2(input[0], input[inputLength - 1], v));
  } : interpolator;
}

// ../../node_modules/popmotion/dist/es/easing/utils.js
var reverseEasing = function(easing2) {
  return function(p) {
    return 1 - easing2(1 - p);
  };
};
var mirrorEasing = function(easing2) {
  return function(p) {
    return p <= 0.5 ? easing2(2 * p) / 2 : (2 - easing2(2 * (1 - p))) / 2;
  };
};
var createExpoIn = function(power) {
  return function(p) {
    return Math.pow(p, power);
  };
};
var createBackIn = function(power) {
  return function(p) {
    return p * p * ((power + 1) * p - power);
  };
};
var createAnticipate = function(power) {
  var backEasing = createBackIn(power);
  return function(p) {
    return (p *= 2) < 1 ? 0.5 * backEasing(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
  };
};

// ../../node_modules/popmotion/dist/es/easing/index.js
var DEFAULT_OVERSHOOT_STRENGTH = 1.525;
var BOUNCE_FIRST_THRESHOLD = 4 / 11;
var BOUNCE_SECOND_THRESHOLD = 8 / 11;
var BOUNCE_THIRD_THRESHOLD = 9 / 10;
var linear = function(p) {
  return p;
};
var easeIn = createExpoIn(2);
var easeOut = reverseEasing(easeIn);
var easeInOut = mirrorEasing(easeIn);
var circIn = function(p) {
  return 1 - Math.sin(Math.acos(p));
};
var circOut = reverseEasing(circIn);
var circInOut = mirrorEasing(circOut);
var backIn = createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
var backOut = reverseEasing(backIn);
var backInOut = mirrorEasing(backIn);
var anticipate = createAnticipate(DEFAULT_OVERSHOOT_STRENGTH);
var ca = 4356 / 361;
var cb = 35442 / 1805;
var cc = 16061 / 1805;
var bounceOut = function(p) {
  if (p === 1 || p === 0)
    return p;
  var p2 = p * p;
  return p < BOUNCE_FIRST_THRESHOLD ? 7.5625 * p2 : p < BOUNCE_SECOND_THRESHOLD ? 9.075 * p2 - 9.9 * p + 3.4 : p < BOUNCE_THIRD_THRESHOLD ? ca * p2 - cb * p + cc : 10.8 * p * p - 20.52 * p + 10.72;
};
var bounceIn = reverseEasing(bounceOut);
var bounceInOut = function(p) {
  return p < 0.5 ? 0.5 * (1 - bounceOut(1 - p * 2)) : 0.5 * bounceOut(p * 2 - 1) + 0.5;
};

// ../../node_modules/popmotion/dist/es/animations/generators/keyframes.js
function defaultEasing(values3, easing2) {
  return values3.map(function() {
    return easing2 || easeInOut;
  }).splice(0, values3.length - 1);
}
function defaultOffset(values3) {
  var numValues = values3.length;
  return values3.map(function(_value, i) {
    return i !== 0 ? i / (numValues - 1) : 0;
  });
}
function convertOffsetToTimes(offset, duration2) {
  return offset.map(function(o) {
    return o * duration2;
  });
}
function keyframes(_a) {
  var _b = _a.from, from2 = _b === void 0 ? 0 : _b, _c = _a.to, to = _c === void 0 ? 1 : _c, ease = _a.ease, offset = _a.offset, _d = _a.duration, duration2 = _d === void 0 ? 300 : _d;
  var state = {done: false, value: from2};
  var values3 = Array.isArray(to) ? to : [from2, to];
  var times = convertOffsetToTimes(offset && offset.length === values3.length ? offset : defaultOffset(values3), duration2);
  function createInterpolator() {
    return interpolate(times, values3, {
      ease: Array.isArray(ease) ? ease : defaultEasing(values3, ease)
    });
  }
  var interpolator = createInterpolator();
  return {
    next: function(t) {
      state.value = interpolator(t);
      state.done = t >= duration2;
      return state;
    },
    flipTarget: function() {
      values3.reverse();
      interpolator = createInterpolator();
    }
  };
}

// ../../node_modules/popmotion/dist/es/animations/generators/decay.js
function decay(_a) {
  var _b = _a.velocity, velocity = _b === void 0 ? 0 : _b, _c = _a.from, from2 = _c === void 0 ? 0 : _c, _d = _a.power, power = _d === void 0 ? 0.8 : _d, _e = _a.timeConstant, timeConstant = _e === void 0 ? 350 : _e, _f = _a.restDelta, restDelta = _f === void 0 ? 0.5 : _f, modifyTarget = _a.modifyTarget;
  var state = {done: false, value: from2};
  var amplitude = power * velocity;
  var ideal = from2 + amplitude;
  var target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
  if (target !== ideal)
    amplitude = target - from2;
  return {
    next: function(t) {
      var delta2 = -amplitude * Math.exp(-t / timeConstant);
      state.done = !(delta2 > restDelta || delta2 < -restDelta);
      state.value = state.done ? target : target + delta2;
      return state;
    },
    flipTarget: function() {
    }
  };
}

// ../../node_modules/popmotion/dist/es/animations/utils/detect-animation-from-options.js
var types = {keyframes, spring, decay};
function detectAnimationFromOptions(config) {
  if (Array.isArray(config.to)) {
    return keyframes;
  } else if (types[config.type]) {
    return types[config.type];
  }
  var keys = new Set(Object.keys(config));
  if (keys.has("ease") || keys.has("duration") && !keys.has("dampingRatio")) {
    return keyframes;
  } else if (keys.has("dampingRatio") || keys.has("stiffness") || keys.has("mass") || keys.has("damping") || keys.has("restSpeed") || keys.has("restDelta")) {
    return spring;
  }
  return keyframes;
}

// ../../node_modules/popmotion/dist/es/animations/utils/elapsed.js
function loopElapsed(elapsed, duration2, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return elapsed - duration2 - delay;
}
function reverseElapsed(elapsed, duration2, delay, isForwardPlayback) {
  if (delay === void 0) {
    delay = 0;
  }
  if (isForwardPlayback === void 0) {
    isForwardPlayback = true;
  }
  return isForwardPlayback ? loopElapsed(duration2 + -elapsed, duration2, delay) : duration2 - (elapsed - duration2) + delay;
}
function hasRepeatDelayElapsed(elapsed, duration2, delay, isForwardPlayback) {
  return isForwardPlayback ? elapsed >= duration2 + delay : elapsed <= -delay;
}

// ../../node_modules/popmotion/dist/es/animations/index.js
var framesync = function(update) {
  var passTimestamp = function(_a) {
    var delta2 = _a.delta;
    return update(delta2);
  };
  return {
    start: function() {
      return es_default.update(passTimestamp, true);
    },
    stop: function() {
      return cancelSync.update(passTimestamp);
    }
  };
};
function animate(_a) {
  var _b, _c;
  var from2 = _a.from, _d = _a.autoplay, autoplay = _d === void 0 ? true : _d, _e = _a.driver, driver = _e === void 0 ? framesync : _e, _f = _a.elapsed, elapsed = _f === void 0 ? 0 : _f, _g = _a.repeat, repeatMax = _g === void 0 ? 0 : _g, _h = _a.repeatType, repeatType = _h === void 0 ? "loop" : _h, _j = _a.repeatDelay, repeatDelay = _j === void 0 ? 0 : _j, onPlay = _a.onPlay, onStop = _a.onStop, onComplete = _a.onComplete, onRepeat = _a.onRepeat, onUpdate = _a.onUpdate, options = __rest(_a, ["from", "autoplay", "driver", "elapsed", "repeat", "repeatType", "repeatDelay", "onPlay", "onStop", "onComplete", "onRepeat", "onUpdate"]);
  var to = options.to;
  var driverControls;
  var repeatCount = 0;
  var computedDuration = options.duration;
  var latest;
  var isComplete = false;
  var isForwardPlayback = true;
  var interpolateFromNumber;
  var animator = detectAnimationFromOptions(options);
  if ((_c = (_b = animator).needsInterpolation) === null || _c === void 0 ? void 0 : _c.call(_b, from2, to)) {
    interpolateFromNumber = interpolate([0, 100], [from2, to], {
      clamp: false
    });
    from2 = 0;
    to = 100;
  }
  var animation = animator(__assign(__assign({}, options), {from: from2, to}));
  function repeat() {
    repeatCount++;
    if (repeatType === "reverse") {
      isForwardPlayback = repeatCount % 2 === 0;
      elapsed = reverseElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback);
    } else {
      elapsed = loopElapsed(elapsed, computedDuration, repeatDelay);
      if (repeatType === "mirror")
        animation.flipTarget();
    }
    isComplete = false;
    onRepeat && onRepeat();
  }
  function complete() {
    driverControls.stop();
    onComplete && onComplete();
  }
  function update(delta2) {
    if (!isForwardPlayback)
      delta2 = -delta2;
    elapsed += delta2;
    if (!isComplete) {
      var state = animation.next(Math.max(0, elapsed));
      latest = state.value;
      if (interpolateFromNumber)
        latest = interpolateFromNumber(latest);
      isComplete = isForwardPlayback ? state.done : elapsed <= 0;
    }
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(latest);
    if (isComplete) {
      if (repeatCount === 0)
        computedDuration !== null && computedDuration !== void 0 ? computedDuration : computedDuration = elapsed;
      if (repeatCount < repeatMax) {
        hasRepeatDelayElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback) && repeat();
      } else {
        complete();
      }
    }
  }
  function play() {
    onPlay === null || onPlay === void 0 ? void 0 : onPlay();
    driverControls = driver(update);
    driverControls.start();
  }
  autoplay && play();
  return {
    stop: function() {
      onStop === null || onStop === void 0 ? void 0 : onStop();
      driverControls.stop();
    }
  };
}

// ../../node_modules/popmotion/dist/es/utils/velocity-per-second.js
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}

// ../../node_modules/popmotion/dist/es/animations/inertia.js
function inertia(_a) {
  var _b = _a.from, from2 = _b === void 0 ? 0 : _b, _c = _a.velocity, velocity = _c === void 0 ? 0 : _c, min = _a.min, max = _a.max, _d = _a.power, power = _d === void 0 ? 0.8 : _d, _e = _a.timeConstant, timeConstant = _e === void 0 ? 750 : _e, _f = _a.bounceStiffness, bounceStiffness = _f === void 0 ? 500 : _f, _g = _a.bounceDamping, bounceDamping = _g === void 0 ? 10 : _g, _h = _a.restDelta, restDelta = _h === void 0 ? 1 : _h, modifyTarget = _a.modifyTarget, driver = _a.driver, onUpdate = _a.onUpdate, onComplete = _a.onComplete;
  var currentAnimation;
  function isOutOfBounds(v) {
    return min !== void 0 && v < min || max !== void 0 && v > max;
  }
  function boundaryNearest(v) {
    if (min === void 0)
      return max;
    if (max === void 0)
      return min;
    return Math.abs(min - v) < Math.abs(max - v) ? min : max;
  }
  function startAnimation2(options) {
    currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
    currentAnimation = animate(__assign(__assign({}, options), {driver, onUpdate: function(v) {
      var _a2;
      onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(v);
      (_a2 = options.onUpdate) === null || _a2 === void 0 ? void 0 : _a2.call(options, v);
    }, onComplete}));
  }
  function startSpring(options) {
    startAnimation2(__assign({type: "spring", stiffness: bounceStiffness, damping: bounceDamping, restDelta}, options));
  }
  if (isOutOfBounds(from2)) {
    startSpring({from: from2, velocity, to: boundaryNearest(from2)});
  } else {
    var target = power * velocity + from2;
    if (typeof modifyTarget !== "undefined")
      target = modifyTarget(target);
    var boundary_1 = boundaryNearest(target);
    var heading_1 = boundary_1 === min ? -1 : 1;
    var prev_1;
    var current_1;
    var checkBoundary = function(v) {
      prev_1 = current_1;
      current_1 = v;
      velocity = velocityPerSecond(v - prev_1, getFrameData().delta);
      if (heading_1 === 1 && v > boundary_1 || heading_1 === -1 && v < boundary_1) {
        startSpring({from: v, to: boundary_1, velocity});
      }
    };
    startAnimation2({
      type: "decay",
      from: from2,
      velocity,
      timeConstant,
      power,
      restDelta,
      modifyTarget,
      onUpdate: isOutOfBounds(target) ? checkBoundary : void 0
    });
  }
  return {
    stop: function() {
      return currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
    }
  };
}

// ../../node_modules/popmotion/dist/es/utils/is-point.js
var isPoint = function(point) {
  return point.hasOwnProperty("x") && point.hasOwnProperty("y");
};

// ../../node_modules/popmotion/dist/es/utils/is-point-3d.js
var isPoint3D = function(point) {
  return isPoint(point) && point.hasOwnProperty("z");
};

// ../../node_modules/popmotion/dist/es/utils/distance.js
var distance1D = function(a2, b2) {
  return Math.abs(a2 - b2);
};
function distance(a2, b2) {
  if (isNum(a2) && isNum(b2)) {
    return distance1D(a2, b2);
  } else if (isPoint(a2) && isPoint(b2)) {
    var xDelta = distance1D(a2.x, b2.x);
    var yDelta = distance1D(a2.y, b2.y);
    var zDelta = isPoint3D(a2) && isPoint3D(b2) ? distance1D(a2.z, b2.z) : 0;
    return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2) + Math.pow(zDelta, 2));
  }
}

// ../../node_modules/popmotion/dist/es/utils/wrap.js
var wrap = function(min, max, v) {
  var rangeSize = max - min;
  return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
};

// ../../node_modules/popmotion/dist/es/easing/cubic-bezier.js
var a = function(a1, a2) {
  return 1 - 3 * a2 + 3 * a1;
};
var b = function(a1, a2) {
  return 3 * a2 - 6 * a1;
};
var c = function(a1) {
  return 3 * a1;
};
var calcBezier = function(t, a1, a2) {
  return ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
};
var getSlope = function(t, a1, a2) {
  return 3 * a(a1, a2) * t * t + 2 * b(a1, a2) * t + c(a1);
};
var subdivisionPrecision = 1e-7;
var subdivisionMaxIterations = 10;
function binarySubdivide(aX, aA, aB, mX1, mX2) {
  var currentX;
  var currentT;
  var i = 0;
  do {
    currentT = aA + (aB - aA) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
  return currentT;
}
var newtonIterations = 8;
var newtonMinSlope = 1e-3;
function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
  for (var i = 0; i < newtonIterations; ++i) {
    var currentSlope = getSlope(aGuessT, mX1, mX2);
    if (currentSlope === 0) {
      return aGuessT;
    }
    var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
    aGuessT -= currentX / currentSlope;
  }
  return aGuessT;
}
var kSplineTableSize = 11;
var kSampleStepSize = 1 / (kSplineTableSize - 1);
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return linear;
  var sampleValues = new Float32Array(kSplineTableSize);
  for (var i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }
  function getTForX(aX) {
    var intervalStart = 0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;
    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;
    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;
    var initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= newtonMinSlope) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }
  return function(t) {
    return t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
  };
}

// ../../node_modules/framer-motion/dist/es/gestures/use-tap-gesture.js
function useTapGesture(_a) {
  var onTap = _a.onTap, onTapStart = _a.onTapStart, onTapCancel = _a.onTapCancel, whileTap = _a.whileTap, visualElement2 = _a.visualElement;
  var hasPressListeners = onTap || onTapStart || onTapCancel || whileTap;
  var isPressing = (0, import_react20.useRef)(false);
  var cancelPointerEndListeners = (0, import_react20.useRef)(null);
  function removePointerEndListener() {
    var _a2;
    (_a2 = cancelPointerEndListeners.current) === null || _a2 === void 0 ? void 0 : _a2.call(cancelPointerEndListeners);
    cancelPointerEndListeners.current = null;
  }
  function checkPointerEnd() {
    var _a2;
    removePointerEndListener();
    isPressing.current = false;
    (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.Tap, false);
    return !isDragActive();
  }
  function onPointerUp(event, info) {
    if (!checkPointerEnd())
      return;
    !isNodeOrChild(visualElement2.getInstance(), event.target) ? onTapCancel === null || onTapCancel === void 0 ? void 0 : onTapCancel(event, info) : onTap === null || onTap === void 0 ? void 0 : onTap(event, info);
  }
  function onPointerCancel(event, info) {
    if (!checkPointerEnd())
      return;
    onTapCancel === null || onTapCancel === void 0 ? void 0 : onTapCancel(event, info);
  }
  function onPointerDown(event, info) {
    var _a2;
    removePointerEndListener();
    if (isPressing.current)
      return;
    isPressing.current = true;
    cancelPointerEndListeners.current = pipe(addPointerEvent(window, "pointerup", onPointerUp), addPointerEvent(window, "pointercancel", onPointerCancel));
    onTapStart === null || onTapStart === void 0 ? void 0 : onTapStart(event, info);
    (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.Tap, true);
  }
  usePointerEvent(visualElement2, "pointerdown", hasPressListeners ? onPointerDown : void 0);
  useUnmountEffect(removePointerEndListener);
}

// ../../node_modules/framer-motion/dist/es/motion/utils/make-renderless-component.js
var makeRenderlessComponent = function(hook) {
  return function(props) {
    hook(props);
    return null;
  };
};

// ../../node_modules/framer-motion/dist/es/motion/features/gestures.js
var gestureAnimations = {
  tap: makeRenderlessComponent(useTapGesture),
  focus: makeRenderlessComponent(useFocusGesture),
  hover: makeRenderlessComponent(useHoverGesture)
};

// ../../node_modules/framer-motion/dist/es/motion/features/animations.js
var import_react21 = __toModule(require_react());

// ../../node_modules/framer-motion/dist/es/utils/shallow-compare.js
function shallowCompare(next2, prev2) {
  if (!Array.isArray(prev2))
    return false;
  var prevLength = prev2.length;
  if (prevLength !== next2.length)
    return false;
  for (var i = 0; i < prevLength; i++) {
    if (prev2[i] !== next2[i])
      return false;
  }
  return true;
}

// ../../node_modules/framer-motion/dist/es/utils/time-conversion.js
var secondsToMilliseconds = function(seconds) {
  return seconds * 1e3;
};

// ../../node_modules/framer-motion/dist/es/animation/utils/easing.js
var easingLookup = {
  linear,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate,
  bounceIn,
  bounceInOut,
  bounceOut
};
var easingDefinitionToFunction = function(definition) {
  if (Array.isArray(definition)) {
    invariant(definition.length === 4, "Cubic bezier arrays must contain four numerical values.");
    var _a = __read(definition, 4), x1 = _a[0], y1 = _a[1], x2 = _a[2], y2 = _a[3];
    return cubicBezier(x1, y1, x2, y2);
  } else if (typeof definition === "string") {
    invariant(easingLookup[definition] !== void 0, "Invalid easing type '" + definition + "'");
    return easingLookup[definition];
  }
  return definition;
};
var isEasingArray = function(ease) {
  return Array.isArray(ease) && typeof ease[0] !== "number";
};

// ../../node_modules/framer-motion/dist/es/animation/utils/is-animatable.js
var isAnimatable = function(key, value) {
  if (key === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && complex.test(value) && !value.startsWith("url(")) {
    return true;
  }
  return false;
};

// ../../node_modules/framer-motion/dist/es/animation/utils/default-transitions.js
var underDampedSpring = function() {
  return {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restDelta: 0.5,
    restSpeed: 10
  };
};
var criticallyDampedSpring = function(to) {
  return {
    type: "spring",
    stiffness: 550,
    damping: to === 0 ? 2 * Math.sqrt(550) : 30,
    restDelta: 0.01,
    restSpeed: 10
  };
};
var linearTween = function() {
  return {
    type: "keyframes",
    ease: "linear",
    duration: 0.3
  };
};
var keyframes2 = function(values3) {
  return {
    type: "keyframes",
    duration: 0.8,
    values: values3
  };
};
var defaultTransitions = {
  x: underDampedSpring,
  y: underDampedSpring,
  z: underDampedSpring,
  rotate: underDampedSpring,
  rotateX: underDampedSpring,
  rotateY: underDampedSpring,
  rotateZ: underDampedSpring,
  scaleX: criticallyDampedSpring,
  scaleY: criticallyDampedSpring,
  scale: criticallyDampedSpring,
  opacity: linearTween,
  backgroundColor: linearTween,
  color: linearTween,
  default: criticallyDampedSpring
};
var getDefaultTransition = function(valueKey, to) {
  var transitionFactory;
  if (isKeyframesTarget(to)) {
    transitionFactory = keyframes2;
  } else {
    transitionFactory = defaultTransitions[valueKey] || defaultTransitions.default;
  }
  return __assign({to}, transitionFactory(to));
};

// ../../node_modules/framer-motion/dist/es/render/dom/value-types/defaults.js
var defaultValueTypes = __assign(__assign({}, numberValueTypes), {
  color,
  backgroundColor: color,
  outlineColor: color,
  fill: color,
  stroke: color,
  borderColor: color,
  borderTopColor: color,
  borderRightColor: color,
  borderBottomColor: color,
  borderLeftColor: color,
  filter,
  WebkitFilter: filter
});
var getDefaultValueType = function(key) {
  return defaultValueTypes[key];
};

// ../../node_modules/framer-motion/dist/es/render/dom/value-types/animatable-none.js
function getAnimatableNone2(key, value) {
  var _a;
  var defaultValueType = getDefaultValueType(key);
  if (defaultValueType !== filter)
    defaultValueType = complex;
  return (_a = defaultValueType.getAnimatableNone) === null || _a === void 0 ? void 0 : _a.call(defaultValueType, value);
}

// ../../node_modules/framer-motion/dist/es/animation/utils/transitions.js
function isTransitionDefined(_a) {
  _a.when;
  _a.delay;
  _a.delayChildren;
  _a.staggerChildren;
  _a.staggerDirection;
  _a.repeat;
  _a.repeatType;
  _a.repeatDelay;
  _a.from;
  var transition = __rest(_a, ["when", "delay", "delayChildren", "staggerChildren", "staggerDirection", "repeat", "repeatType", "repeatDelay", "from"]);
  return !!Object.keys(transition).length;
}
var legacyRepeatWarning = false;
function convertTransitionToAnimationOptions(_a) {
  var ease = _a.ease, times = _a.times, yoyo = _a.yoyo, flip = _a.flip, loop = _a.loop, transition = __rest(_a, ["ease", "times", "yoyo", "flip", "loop"]);
  var options = __assign({}, transition);
  if (times)
    options["offset"] = times;
  if (transition.duration)
    options["duration"] = secondsToMilliseconds(transition.duration);
  if (transition.repeatDelay)
    options.repeatDelay = secondsToMilliseconds(transition.repeatDelay);
  if (ease) {
    options["ease"] = isEasingArray(ease) ? ease.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease);
  }
  if (transition.type === "tween")
    options.type = "keyframes";
  if (yoyo || loop || flip) {
    warning(!legacyRepeatWarning, "yoyo, loop and flip have been removed from the API. Replace with repeat and repeatType options.");
    legacyRepeatWarning = true;
    if (yoyo) {
      options.repeatType = "reverse";
    } else if (loop) {
      options.repeatType = "loop";
    } else if (flip) {
      options.repeatType = "mirror";
    }
    options.repeat = loop || yoyo || flip || transition.repeat;
  }
  if (transition.type !== "spring")
    options.type = "keyframes";
  return options;
}
function getDelayFromTransition(transition, key) {
  var _a;
  var valueTransition = getValueTransition(transition, key) || {};
  return (_a = valueTransition.delay) !== null && _a !== void 0 ? _a : 0;
}
function hydrateKeyframes(options) {
  if (Array.isArray(options.to) && options.to[0] === null) {
    options.to = __spreadArray([], __read(options.to));
    options.to[0] = options.from;
  }
  return options;
}
function getPopmotionAnimationOptions(transition, options, key) {
  var _a;
  if (Array.isArray(options.to)) {
    (_a = transition.duration) !== null && _a !== void 0 ? _a : transition.duration = 0.8;
  }
  hydrateKeyframes(options);
  if (!isTransitionDefined(transition)) {
    transition = __assign(__assign({}, transition), getDefaultTransition(key, options.to));
  }
  return __assign(__assign({}, options), convertTransitionToAnimationOptions(transition));
}
function getAnimation(key, value, target, transition, onComplete) {
  var _a;
  var valueTransition = getValueTransition(transition, key);
  var origin = (_a = valueTransition.from) !== null && _a !== void 0 ? _a : value.get();
  var isTargetAnimatable = isAnimatable(key, target);
  if (origin === "none" && isTargetAnimatable && typeof target === "string") {
    origin = getAnimatableNone2(key, target);
  } else if (isZero(origin) && typeof target === "string") {
    origin = getZeroUnit(target);
  } else if (!Array.isArray(target) && isZero(target) && typeof origin === "string") {
    target = getZeroUnit(origin);
  }
  var isOriginAnimatable = isAnimatable(key, origin);
  warning(isOriginAnimatable === isTargetAnimatable, "You are trying to animate " + key + ' from "' + origin + '" to "' + target + '". ' + origin + " is not an animatable value - to enable this animation set " + origin + " to a value animatable to " + target + " via the `style` property.");
  function start() {
    var options = {
      from: origin,
      to: target,
      velocity: value.getVelocity(),
      onComplete,
      onUpdate: function(v) {
        return value.set(v);
      }
    };
    return valueTransition.type === "inertia" || valueTransition.type === "decay" ? inertia(__assign(__assign({}, options), valueTransition)) : animate(__assign(__assign({}, getPopmotionAnimationOptions(valueTransition, options, key)), {onUpdate: function(v) {
      var _a2;
      options.onUpdate(v);
      (_a2 = valueTransition.onUpdate) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition, v);
    }, onComplete: function() {
      var _a2;
      options.onComplete();
      (_a2 = valueTransition.onComplete) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition);
    }}));
  }
  function set() {
    var _a2;
    value.set(target);
    onComplete();
    (_a2 = valueTransition === null || valueTransition === void 0 ? void 0 : valueTransition.onComplete) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition);
    return {stop: function() {
    }};
  }
  return !isOriginAnimatable || !isTargetAnimatable || valueTransition.type === false ? set : start;
}
function isZero(value) {
  return value === 0 || typeof value === "string" && parseFloat(value) === 0 && value.indexOf(" ") === -1;
}
function getZeroUnit(potentialUnitType) {
  return typeof potentialUnitType === "number" ? 0 : getAnimatableNone2("", potentialUnitType);
}
function getValueTransition(transition, key) {
  return transition[key] || transition["default"] || transition;
}
function startAnimation(key, value, target, transition) {
  if (transition === void 0) {
    transition = {};
  }
  return value.start(function(onComplete) {
    var delayTimer;
    var controls;
    var animation = getAnimation(key, value, target, transition, onComplete);
    var delay = getDelayFromTransition(transition, key);
    var start = function() {
      return controls = animation();
    };
    if (delay) {
      delayTimer = setTimeout(start, secondsToMilliseconds(delay));
    } else {
      start();
    }
    return function() {
      clearTimeout(delayTimer);
      controls === null || controls === void 0 ? void 0 : controls.stop();
    };
  });
}

// ../../node_modules/framer-motion/dist/es/utils/is-numerical-string.js
var isNumericalString = function(v) {
  return /^\-?\d*\.?\d+$/.test(v);
};

// ../../node_modules/framer-motion/dist/es/utils/array.js
function addUniqueItem(arr, item) {
  arr.indexOf(item) === -1 && arr.push(item);
}
function removeItem(arr, item) {
  var index = arr.indexOf(item);
  index > -1 && arr.splice(index, 1);
}

// ../../node_modules/framer-motion/dist/es/utils/subscription-manager.js
var SubscriptionManager = function() {
  function SubscriptionManager2() {
    this.subscriptions = [];
  }
  SubscriptionManager2.prototype.add = function(handler) {
    var _this = this;
    addUniqueItem(this.subscriptions, handler);
    return function() {
      return removeItem(_this.subscriptions, handler);
    };
  };
  SubscriptionManager2.prototype.notify = function(a2, b2, c2) {
    var numSubscriptions = this.subscriptions.length;
    if (!numSubscriptions)
      return;
    if (numSubscriptions === 1) {
      this.subscriptions[0](a2, b2, c2);
    } else {
      for (var i = 0; i < numSubscriptions; i++) {
        var handler = this.subscriptions[i];
        handler && handler(a2, b2, c2);
      }
    }
  };
  SubscriptionManager2.prototype.getSize = function() {
    return this.subscriptions.length;
  };
  SubscriptionManager2.prototype.clear = function() {
    this.subscriptions.length = 0;
  };
  return SubscriptionManager2;
}();

// ../../node_modules/framer-motion/dist/es/value/index.js
var isFloat = function(value) {
  return !isNaN(parseFloat(value));
};
var MotionValue = function() {
  function MotionValue2(init) {
    var _this = this;
    this.timeDelta = 0;
    this.lastUpdated = 0;
    this.updateSubscribers = new SubscriptionManager();
    this.velocityUpdateSubscribers = new SubscriptionManager();
    this.renderSubscribers = new SubscriptionManager();
    this.canTrackVelocity = false;
    this.updateAndNotify = function(v, render2) {
      if (render2 === void 0) {
        render2 = true;
      }
      _this.prev = _this.current;
      _this.current = v;
      var _a = getFrameData(), delta2 = _a.delta, timestamp = _a.timestamp;
      if (_this.lastUpdated !== timestamp) {
        _this.timeDelta = delta2;
        _this.lastUpdated = timestamp;
        es_default.postRender(_this.scheduleVelocityCheck);
      }
      if (_this.prev !== _this.current) {
        _this.updateSubscribers.notify(_this.current);
      }
      if (_this.velocityUpdateSubscribers.getSize()) {
        _this.velocityUpdateSubscribers.notify(_this.getVelocity());
      }
      if (render2) {
        _this.renderSubscribers.notify(_this.current);
      }
    };
    this.scheduleVelocityCheck = function() {
      return es_default.postRender(_this.velocityCheck);
    };
    this.velocityCheck = function(_a) {
      var timestamp = _a.timestamp;
      if (timestamp !== _this.lastUpdated) {
        _this.prev = _this.current;
        _this.velocityUpdateSubscribers.notify(_this.getVelocity());
      }
    };
    this.hasAnimated = false;
    this.prev = this.current = init;
    this.canTrackVelocity = isFloat(this.current);
  }
  MotionValue2.prototype.onChange = function(subscription) {
    return this.updateSubscribers.add(subscription);
  };
  MotionValue2.prototype.clearListeners = function() {
    this.updateSubscribers.clear();
  };
  MotionValue2.prototype.onRenderRequest = function(subscription) {
    subscription(this.get());
    return this.renderSubscribers.add(subscription);
  };
  MotionValue2.prototype.attach = function(passiveEffect) {
    this.passiveEffect = passiveEffect;
  };
  MotionValue2.prototype.set = function(v, render2) {
    if (render2 === void 0) {
      render2 = true;
    }
    if (!render2 || !this.passiveEffect) {
      this.updateAndNotify(v, render2);
    } else {
      this.passiveEffect(v, this.updateAndNotify);
    }
  };
  MotionValue2.prototype.get = function() {
    return this.current;
  };
  MotionValue2.prototype.getPrevious = function() {
    return this.prev;
  };
  MotionValue2.prototype.getVelocity = function() {
    return this.canTrackVelocity ? velocityPerSecond(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta) : 0;
  };
  MotionValue2.prototype.start = function(animation) {
    var _this = this;
    this.stop();
    return new Promise(function(resolve) {
      _this.hasAnimated = true;
      _this.stopAnimation = animation(resolve);
    }).then(function() {
      return _this.clearAnimation();
    });
  };
  MotionValue2.prototype.stop = function() {
    if (this.stopAnimation)
      this.stopAnimation();
    this.clearAnimation();
  };
  MotionValue2.prototype.isAnimating = function() {
    return !!this.stopAnimation;
  };
  MotionValue2.prototype.clearAnimation = function() {
    this.stopAnimation = null;
  };
  MotionValue2.prototype.destroy = function() {
    this.updateSubscribers.clear();
    this.renderSubscribers.clear();
    this.stop();
  };
  return MotionValue2;
}();
function motionValue(init) {
  return new MotionValue(init);
}

// ../../node_modules/framer-motion/dist/es/render/dom/value-types/test.js
var testValueType = function(v) {
  return function(type) {
    return type.test(v);
  };
};

// ../../node_modules/framer-motion/dist/es/render/dom/value-types/type-auto.js
var auto = {
  test: function(v) {
    return v === "auto";
  },
  parse: function(v) {
    return v;
  }
};

// ../../node_modules/framer-motion/dist/es/render/dom/value-types/dimensions.js
var dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
var findDimensionValueType = function(v) {
  return dimensionValueTypes.find(testValueType(v));
};

// ../../node_modules/framer-motion/dist/es/render/dom/value-types/find.js
var valueTypes = __spreadArray(__spreadArray([], __read(dimensionValueTypes)), [color, complex]);
var findValueType = function(v) {
  return valueTypes.find(testValueType(v));
};

// ../../node_modules/framer-motion/dist/es/render/utils/setters.js
function setMotionValue(visualElement2, key, value) {
  if (visualElement2.hasValue(key)) {
    visualElement2.getValue(key).set(value);
  } else {
    visualElement2.addValue(key, motionValue(value));
  }
}
function setTarget(visualElement2, definition) {
  var resolved = resolveVariant(visualElement2, definition);
  var _a = resolved ? visualElement2.makeTargetAnimatable(resolved, false) : {}, _b = _a.transitionEnd, transitionEnd = _b === void 0 ? {} : _b;
  _a.transition;
  var target = __rest(_a, ["transitionEnd", "transition"]);
  target = __assign(__assign({}, target), transitionEnd);
  for (var key in target) {
    var value = resolveFinalValueInKeyframes(target[key]);
    setMotionValue(visualElement2, key, value);
  }
}
function setVariants(visualElement2, variantLabels) {
  var reversedLabels = __spreadArray([], __read(variantLabels)).reverse();
  reversedLabels.forEach(function(key) {
    var _a;
    var variant = visualElement2.getVariant(key);
    variant && setTarget(visualElement2, variant);
    (_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach(function(child) {
      setVariants(child, variantLabels);
    });
  });
}
function setValues(visualElement2, definition) {
  if (Array.isArray(definition)) {
    return setVariants(visualElement2, definition);
  } else if (typeof definition === "string") {
    return setVariants(visualElement2, [definition]);
  } else {
    setTarget(visualElement2, definition);
  }
}
function checkTargetForNewValues(visualElement2, target, origin) {
  var _a, _b, _c;
  var _d;
  var newValueKeys = Object.keys(target).filter(function(key2) {
    return !visualElement2.hasValue(key2);
  });
  var numNewValues = newValueKeys.length;
  if (!numNewValues)
    return;
  for (var i = 0; i < numNewValues; i++) {
    var key = newValueKeys[i];
    var targetValue = target[key];
    var value = null;
    if (Array.isArray(targetValue)) {
      value = targetValue[0];
    }
    if (value === null) {
      value = (_b = (_a = origin[key]) !== null && _a !== void 0 ? _a : visualElement2.readValue(key)) !== null && _b !== void 0 ? _b : target[key];
    }
    if (value === void 0 || value === null)
      continue;
    if (typeof value === "string" && isNumericalString(value)) {
      value = parseFloat(value);
    } else if (!findValueType(value) && complex.test(targetValue)) {
      value = getAnimatableNone2(key, targetValue);
    }
    visualElement2.addValue(key, motionValue(value));
    (_c = (_d = origin)[key]) !== null && _c !== void 0 ? _c : _d[key] = value;
    visualElement2.setBaseTarget(key, value);
  }
}
function getOriginFromTransition(key, transition) {
  if (!transition)
    return;
  var valueTransition = transition[key] || transition["default"] || transition;
  return valueTransition.from;
}
function getOrigin(target, transition, visualElement2) {
  var _a, _b;
  var origin = {};
  for (var key in target) {
    origin[key] = (_a = getOriginFromTransition(key, transition)) !== null && _a !== void 0 ? _a : (_b = visualElement2.getValue(key)) === null || _b === void 0 ? void 0 : _b.get();
  }
  return origin;
}

// ../../node_modules/framer-motion/dist/es/render/utils/animation.js
function animateVisualElement(visualElement2, definition, options) {
  if (options === void 0) {
    options = {};
  }
  visualElement2.notifyAnimationStart();
  var animation;
  if (Array.isArray(definition)) {
    var animations2 = definition.map(function(variant) {
      return animateVariant(visualElement2, variant, options);
    });
    animation = Promise.all(animations2);
  } else if (typeof definition === "string") {
    animation = animateVariant(visualElement2, definition, options);
  } else {
    var resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement2, definition, options.custom) : definition;
    animation = animateTarget(visualElement2, resolvedDefinition, options);
  }
  return animation.then(function() {
    return visualElement2.notifyAnimationComplete(definition);
  });
}
function animateVariant(visualElement2, variant, options) {
  var _a;
  if (options === void 0) {
    options = {};
  }
  var resolved = resolveVariant(visualElement2, variant, options.custom);
  var _b = (resolved || {}).transition, transition = _b === void 0 ? visualElement2.getDefaultTransition() || {} : _b;
  if (options.transitionOverride) {
    transition = options.transitionOverride;
  }
  var getAnimation2 = resolved ? function() {
    return animateTarget(visualElement2, resolved, options);
  } : function() {
    return Promise.resolve();
  };
  var getChildAnimations = ((_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.size) ? function(forwardDelay) {
    if (forwardDelay === void 0) {
      forwardDelay = 0;
    }
    var _a2 = transition.delayChildren, delayChildren = _a2 === void 0 ? 0 : _a2, staggerChildren = transition.staggerChildren, staggerDirection = transition.staggerDirection;
    return animateChildren(visualElement2, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
  } : function() {
    return Promise.resolve();
  };
  var when = transition.when;
  if (when) {
    var _c = __read(when === "beforeChildren" ? [getAnimation2, getChildAnimations] : [getChildAnimations, getAnimation2], 2), first = _c[0], last = _c[1];
    return first().then(last);
  } else {
    return Promise.all([getAnimation2(), getChildAnimations(options.delay)]);
  }
}
function animateTarget(visualElement2, definition, _a) {
  var _b;
  var _c = _a === void 0 ? {} : _a, _d = _c.delay, delay = _d === void 0 ? 0 : _d, transitionOverride = _c.transitionOverride, type = _c.type;
  var _e = visualElement2.makeTargetAnimatable(definition), _f = _e.transition, transition = _f === void 0 ? visualElement2.getDefaultTransition() : _f, transitionEnd = _e.transitionEnd, target = __rest(_e, ["transition", "transitionEnd"]);
  if (transitionOverride)
    transition = transitionOverride;
  var animations2 = [];
  var animationTypeState = type && ((_b = visualElement2.animationState) === null || _b === void 0 ? void 0 : _b.getState()[type]);
  for (var key in target) {
    var value = visualElement2.getValue(key);
    var valueTarget = target[key];
    if (!value || valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
      continue;
    }
    var animation = startAnimation(key, value, valueTarget, __assign({delay}, transition));
    animations2.push(animation);
  }
  return Promise.all(animations2).then(function() {
    transitionEnd && setTarget(visualElement2, transitionEnd);
  });
}
function animateChildren(visualElement2, variant, delayChildren, staggerChildren, staggerDirection, options) {
  if (delayChildren === void 0) {
    delayChildren = 0;
  }
  if (staggerChildren === void 0) {
    staggerChildren = 0;
  }
  if (staggerDirection === void 0) {
    staggerDirection = 1;
  }
  var animations2 = [];
  var maxStaggerDuration = (visualElement2.variantChildren.size - 1) * staggerChildren;
  var generateStaggerDuration = staggerDirection === 1 ? function(i) {
    if (i === void 0) {
      i = 0;
    }
    return i * staggerChildren;
  } : function(i) {
    if (i === void 0) {
      i = 0;
    }
    return maxStaggerDuration - i * staggerChildren;
  };
  Array.from(visualElement2.variantChildren).sort(sortByTreeOrder).forEach(function(child, i) {
    animations2.push(animateVariant(child, variant, __assign(__assign({}, options), {delay: delayChildren + generateStaggerDuration(i)})).then(function() {
      return child.notifyAnimationComplete(variant);
    }));
  });
  return Promise.all(animations2);
}
function stopAnimation(visualElement2) {
  visualElement2.forEachValue(function(value) {
    return value.stop();
  });
}
function sortByTreeOrder(a2, b2) {
  return a2.sortNodePosition(b2);
}
function shouldBlockAnimation(_a, key) {
  var protectedKeys = _a.protectedKeys, needsAnimating = _a.needsAnimating;
  var shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
  needsAnimating[key] = false;
  return shouldBlock;
}

// ../../node_modules/framer-motion/dist/es/render/utils/animation-state.js
var variantPriorityOrder = [
  AnimationType.Animate,
  AnimationType.Hover,
  AnimationType.Tap,
  AnimationType.Drag,
  AnimationType.Focus,
  AnimationType.Exit
];
var reversePriorityOrder = __spreadArray([], __read(variantPriorityOrder)).reverse();
var numAnimationTypes = variantPriorityOrder.length;
function animateList(visualElement2) {
  return function(animations2) {
    return Promise.all(animations2.map(function(_a) {
      var animation = _a.animation, options = _a.options;
      return animateVisualElement(visualElement2, animation, options);
    }));
  };
}
function createAnimationState(visualElement2) {
  var animate3 = animateList(visualElement2);
  var state = createState();
  var allAnimatedKeys = {};
  var isInitialRender = true;
  var buildResolvedTypeValues = function(acc, definition) {
    var resolved = resolveVariant(visualElement2, definition);
    if (resolved) {
      resolved.transition;
      var transitionEnd = resolved.transitionEnd, target = __rest(resolved, ["transition", "transitionEnd"]);
      acc = __assign(__assign(__assign({}, acc), target), transitionEnd);
    }
    return acc;
  };
  function isAnimated(key) {
    return allAnimatedKeys[key] !== void 0;
  }
  function setAnimateFunction(makeAnimator) {
    animate3 = makeAnimator(visualElement2);
  }
  function animateChanges(options, changedActiveType) {
    var _a;
    var props = visualElement2.getProps();
    var context = visualElement2.getVariantContext(true) || {};
    var animations2 = [];
    var removedKeys = new Set();
    var encounteredKeys = {};
    var removedVariantIndex = Infinity;
    var _loop_1 = function(i2) {
      var type = reversePriorityOrder[i2];
      var typeState = state[type];
      var prop = (_a = props[type]) !== null && _a !== void 0 ? _a : context[type];
      var propIsVariant = isVariantLabel(prop);
      var activeDelta = type === changedActiveType ? typeState.isActive : null;
      if (activeDelta === false)
        removedVariantIndex = i2;
      var isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
      if (isInherited && isInitialRender && visualElement2.manuallyAnimateOnMount) {
        isInherited = false;
      }
      typeState.protectedKeys = __assign({}, encounteredKeys);
      if (!typeState.isActive && activeDelta === null || !prop && !typeState.prevProp || isAnimationControls(prop) || typeof prop === "boolean") {
        return "continue";
      }
      var shouldAnimateType = variantsHaveChanged(typeState.prevProp, prop) || type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || i2 > removedVariantIndex && propIsVariant;
      var definitionList = Array.isArray(prop) ? prop : [prop];
      var resolvedValues = definitionList.reduce(buildResolvedTypeValues, {});
      if (activeDelta === false)
        resolvedValues = {};
      var _b = typeState.prevResolvedValues, prevResolvedValues = _b === void 0 ? {} : _b;
      var allKeys = __assign(__assign({}, prevResolvedValues), resolvedValues);
      var markToAnimate = function(key2) {
        shouldAnimateType = true;
        removedKeys.delete(key2);
        typeState.needsAnimating[key2] = true;
      };
      for (var key in allKeys) {
        var next2 = resolvedValues[key];
        var prev2 = prevResolvedValues[key];
        if (encounteredKeys.hasOwnProperty(key))
          continue;
        if (next2 !== prev2) {
          if (isKeyframesTarget(next2) && isKeyframesTarget(prev2)) {
            if (!shallowCompare(next2, prev2)) {
              markToAnimate(key);
            } else {
              typeState.protectedKeys[key] = true;
            }
          } else if (next2 !== void 0) {
            markToAnimate(key);
          } else {
            removedKeys.add(key);
          }
        } else if (next2 !== void 0 && removedKeys.has(key)) {
          markToAnimate(key);
        } else {
          typeState.protectedKeys[key] = true;
        }
      }
      typeState.prevProp = prop;
      typeState.prevResolvedValues = resolvedValues;
      if (typeState.isActive) {
        encounteredKeys = __assign(__assign({}, encounteredKeys), resolvedValues);
      }
      if (isInitialRender && visualElement2.blockInitialAnimation) {
        shouldAnimateType = false;
      }
      if (shouldAnimateType && !isInherited) {
        animations2.push.apply(animations2, __spreadArray([], __read(definitionList.map(function(animation) {
          return {
            animation,
            options: __assign({type}, options)
          };
        }))));
      }
    };
    for (var i = 0; i < numAnimationTypes; i++) {
      _loop_1(i);
    }
    allAnimatedKeys = __assign({}, encounteredKeys);
    if (removedKeys.size) {
      var fallbackAnimation_1 = {};
      removedKeys.forEach(function(key) {
        var fallbackTarget = visualElement2.getBaseTarget(key);
        if (fallbackTarget !== void 0) {
          fallbackAnimation_1[key] = fallbackTarget;
        }
      });
      animations2.push({animation: fallbackAnimation_1});
    }
    var shouldAnimate = Boolean(animations2.length);
    if (isInitialRender && props.initial === false && !visualElement2.manuallyAnimateOnMount) {
      shouldAnimate = false;
    }
    isInitialRender = false;
    return shouldAnimate ? animate3(animations2) : Promise.resolve();
  }
  function setActive(type, isActive, options) {
    var _a;
    if (state[type].isActive === isActive)
      return Promise.resolve();
    (_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach(function(child) {
      var _a2;
      return (_a2 = child.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(type, isActive);
    });
    state[type].isActive = isActive;
    return animateChanges(options, type);
  }
  return {
    isAnimated,
    animateChanges,
    setActive,
    setAnimateFunction,
    getState: function() {
      return state;
    }
  };
}
function variantsHaveChanged(prev2, next2) {
  if (typeof next2 === "string") {
    return next2 !== prev2;
  } else if (isVariantLabels(next2)) {
    return !shallowCompare(next2, prev2);
  }
  return false;
}
function createTypeState(isActive) {
  if (isActive === void 0) {
    isActive = false;
  }
  return {
    isActive,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function createState() {
  var _a;
  return _a = {}, _a[AnimationType.Animate] = createTypeState(true), _a[AnimationType.Hover] = createTypeState(), _a[AnimationType.Tap] = createTypeState(), _a[AnimationType.Drag] = createTypeState(), _a[AnimationType.Focus] = createTypeState(), _a[AnimationType.Exit] = createTypeState(), _a;
}

// ../../node_modules/framer-motion/dist/es/motion/features/animations.js
var animations = {
  animation: makeRenderlessComponent(function(_a) {
    var visualElement2 = _a.visualElement, animate3 = _a.animate;
    visualElement2.animationState || (visualElement2.animationState = createAnimationState(visualElement2));
    if (isAnimationControls(animate3)) {
      (0, import_react21.useEffect)(function() {
        return animate3.subscribe(visualElement2);
      }, [animate3]);
    }
  }),
  exit: makeRenderlessComponent(function(props) {
    var custom = props.custom, visualElement2 = props.visualElement;
    var _a = __read(usePresence(), 2), isPresent2 = _a[0], onExitComplete = _a[1];
    var presenceContext = (0, import_react21.useContext)(PresenceContext);
    (0, import_react21.useEffect)(function() {
      var _a2, _b;
      var animation = (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.Exit, !isPresent2, {custom: (_b = presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.custom) !== null && _b !== void 0 ? _b : custom});
      !isPresent2 && (animation === null || animation === void 0 ? void 0 : animation.then(onExitComplete));
    }, [isPresent2]);
  })
};

// ../../node_modules/framer-motion/dist/es/gestures/drag/use-drag.js
var import_react22 = __toModule(require_react());

// ../../node_modules/framer-motion/dist/es/gestures/PanSession.js
var PanSession = function() {
  function PanSession2(event, handlers, _a) {
    var _this = this;
    var _b = _a === void 0 ? {} : _a, transformPagePoint = _b.transformPagePoint;
    this.startEvent = null;
    this.lastMoveEvent = null;
    this.lastMoveEventInfo = null;
    this.handlers = {};
    this.updatePoint = function() {
      if (!(_this.lastMoveEvent && _this.lastMoveEventInfo))
        return;
      var info2 = getPanInfo(_this.lastMoveEventInfo, _this.history);
      var isPanStarted = _this.startEvent !== null;
      var isDistancePastThreshold = distance(info2.offset, {x: 0, y: 0}) >= 3;
      if (!isPanStarted && !isDistancePastThreshold)
        return;
      var point2 = info2.point;
      var timestamp2 = getFrameData().timestamp;
      _this.history.push(__assign(__assign({}, point2), {timestamp: timestamp2}));
      var _a2 = _this.handlers, onStart = _a2.onStart, onMove = _a2.onMove;
      if (!isPanStarted) {
        onStart && onStart(_this.lastMoveEvent, info2);
        _this.startEvent = _this.lastMoveEvent;
      }
      onMove && onMove(_this.lastMoveEvent, info2);
    };
    this.handlePointerMove = function(event2, info2) {
      _this.lastMoveEvent = event2;
      _this.lastMoveEventInfo = transformPoint(info2, _this.transformPagePoint);
      if (isMouseEvent(event2) && event2.buttons === 0) {
        _this.handlePointerUp(event2, info2);
        return;
      }
      es_default.update(_this.updatePoint, true);
    };
    this.handlePointerUp = function(event2, info2) {
      _this.end();
      var onEnd = _this.handlers.onEnd;
      if (!onEnd || !_this.startEvent)
        return;
      var panInfo = getPanInfo(transformPoint(info2, _this.transformPagePoint), _this.history);
      onEnd && onEnd(event2, panInfo);
    };
    if (isTouchEvent(event) && event.touches.length > 1)
      return;
    this.handlers = handlers;
    this.transformPagePoint = transformPagePoint;
    var info = extractEventInfo(event);
    var initialInfo = transformPoint(info, this.transformPagePoint);
    var point = initialInfo.point;
    var timestamp = getFrameData().timestamp;
    this.history = [__assign(__assign({}, point), {timestamp})];
    var onSessionStart = handlers.onSessionStart;
    onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
    this.removeListeners = pipe(addPointerEvent(window, "pointermove", this.handlePointerMove), addPointerEvent(window, "pointerup", this.handlePointerUp), addPointerEvent(window, "pointercancel", this.handlePointerUp));
  }
  PanSession2.prototype.updateHandlers = function(handlers) {
    this.handlers = handlers;
  };
  PanSession2.prototype.end = function() {
    this.removeListeners && this.removeListeners();
    cancelSync.update(this.updatePoint);
  };
  return PanSession2;
}();
function transformPoint(info, transformPagePoint) {
  return transformPagePoint ? {point: transformPagePoint(info.point)} : info;
}
function subtractPoint(a2, b2) {
  return {x: a2.x - b2.x, y: a2.y - b2.y};
}
function getPanInfo(_a, history) {
  var point = _a.point;
  return {
    point,
    delta: subtractPoint(point, lastDevicePoint(history)),
    offset: subtractPoint(point, startDevicePoint(history)),
    velocity: getVelocity2(history, 0.1)
  };
}
function startDevicePoint(history) {
  return history[0];
}
function lastDevicePoint(history) {
  return history[history.length - 1];
}
function getVelocity2(history, timeDelta) {
  if (history.length < 2) {
    return {x: 0, y: 0};
  }
  var i = history.length - 1;
  var timestampedPoint = null;
  var lastPoint = lastDevicePoint(history);
  while (i >= 0) {
    timestampedPoint = history[i];
    if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) {
      break;
    }
    i--;
  }
  if (!timestampedPoint) {
    return {x: 0, y: 0};
  }
  var time = (lastPoint.timestamp - timestampedPoint.timestamp) / 1e3;
  if (time === 0) {
    return {x: 0, y: 0};
  }
  var currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time,
    y: (lastPoint.y - timestampedPoint.y) / time
  };
  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }
  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }
  return currentVelocity;
}

// ../../node_modules/framer-motion/dist/es/utils/noop.js
function noop(any) {
  return any;
}

// ../../node_modules/framer-motion/dist/es/utils/geometry/index.js
function convertBoundingBoxToAxisBox(_a) {
  var top2 = _a.top, left2 = _a.left, right2 = _a.right, bottom2 = _a.bottom;
  return {
    x: {min: left2, max: right2},
    y: {min: top2, max: bottom2}
  };
}
function convertAxisBoxToBoundingBox(_a) {
  var x = _a.x, y = _a.y;
  return {
    top: y.min,
    bottom: y.max,
    left: x.min,
    right: x.max
  };
}
function transformBoundingBox(_a, transformPoint2) {
  var top2 = _a.top, left2 = _a.left, bottom2 = _a.bottom, right2 = _a.right;
  if (transformPoint2 === void 0) {
    transformPoint2 = noop;
  }
  var topLeft = transformPoint2({x: left2, y: top2});
  var bottomRight = transformPoint2({x: right2, y: bottom2});
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}
function axisBox() {
  return {x: {min: 0, max: 1}, y: {min: 0, max: 1}};
}
function copyAxisBox(box) {
  return {
    x: __assign({}, box.x),
    y: __assign({}, box.y)
  };
}
var zeroDelta = {
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
};
function delta() {
  return {
    x: __assign({}, zeroDelta),
    y: __assign({}, zeroDelta)
  };
}

// ../../node_modules/framer-motion/dist/es/utils/each-axis.js
function eachAxis(handler) {
  return [handler("x"), handler("y")];
}

// ../../node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.js
function applyConstraints(point, _a, elastic) {
  var min = _a.min, max = _a.max;
  if (min !== void 0 && point < min) {
    point = elastic ? mix(min, point, elastic.min) : Math.max(point, min);
  } else if (max !== void 0 && point > max) {
    point = elastic ? mix(max, point, elastic.max) : Math.min(point, max);
  }
  return point;
}
function calcConstrainedMinPoint(point, length2, progress2, constraints, elastic) {
  var min = point - length2 * progress2;
  return constraints ? applyConstraints(min, constraints, elastic) : min;
}
function calcRelativeAxisConstraints(axis, min, max) {
  return {
    min: min !== void 0 ? axis.min + min : void 0,
    max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
  };
}
function calcRelativeConstraints(layoutBox, _a) {
  var top2 = _a.top, left2 = _a.left, bottom2 = _a.bottom, right2 = _a.right;
  return {
    x: calcRelativeAxisConstraints(layoutBox.x, left2, right2),
    y: calcRelativeAxisConstraints(layoutBox.y, top2, bottom2)
  };
}
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
  var _a;
  var min = constraintsAxis.min - layoutAxis.min;
  var max = constraintsAxis.max - layoutAxis.max;
  if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
    _a = __read([max, min], 2), min = _a[0], max = _a[1];
  }
  return {
    min: layoutAxis.min + min,
    max: layoutAxis.min + max
  };
}
function calcViewportConstraints(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
  };
}
function calcPositionFromProgress(axis, constraints, progress2) {
  var axisLength = axis.max - axis.min;
  var min = mix(constraints.min, constraints.max - axisLength, progress2);
  return {min, max: min + axisLength};
}
function rebaseAxisConstraints(layout, constraints) {
  var relativeConstraints = {};
  if (constraints.min !== void 0) {
    relativeConstraints.min = constraints.min - layout.min;
  }
  if (constraints.max !== void 0) {
    relativeConstraints.max = constraints.max - layout.min;
  }
  return relativeConstraints;
}
var defaultElastic = 0.35;
function resolveDragElastic(dragElastic) {
  if (dragElastic === false) {
    dragElastic = 0;
  } else if (dragElastic === true) {
    dragElastic = defaultElastic;
  }
  return {
    x: resolveAxisElastic(dragElastic, "left", "right"),
    y: resolveAxisElastic(dragElastic, "top", "bottom")
  };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
  return {
    min: resolvePointElastic(dragElastic, minLabel),
    max: resolvePointElastic(dragElastic, maxLabel)
  };
}
function resolvePointElastic(dragElastic, label) {
  var _a;
  return typeof dragElastic === "number" ? dragElastic : (_a = dragElastic[label]) !== null && _a !== void 0 ? _a : 0;
}

// ../../node_modules/framer-motion/dist/es/render/dom/projection/measure.js
function getBoundingBox(element, transformPagePoint) {
  var box = element.getBoundingClientRect();
  return convertBoundingBoxToAxisBox(transformBoundingBox(box, transformPagePoint));
}

// ../../node_modules/framer-motion/dist/es/utils/geometry/delta-calc.js
var clampProgress = function(v) {
  return clamp2(0, 1, v);
};
function isNear(value, target, maxDistance) {
  if (target === void 0) {
    target = 0;
  }
  if (maxDistance === void 0) {
    maxDistance = 0.01;
  }
  return distance(value, target) < maxDistance;
}
function calcLength(axis) {
  return axis.max - axis.min;
}
function calcOrigin2(source, target) {
  var origin = 0.5;
  var sourceLength = calcLength(source);
  var targetLength = calcLength(target);
  if (targetLength > sourceLength) {
    origin = progress(target.min, target.max - sourceLength, source.min);
  } else if (sourceLength > targetLength) {
    origin = progress(source.min, source.max - targetLength, target.min);
  }
  return clampProgress(origin);
}
function updateAxisDelta(delta2, source, target, origin) {
  if (origin === void 0) {
    origin = 0.5;
  }
  delta2.origin = origin;
  delta2.originPoint = mix(source.min, source.max, delta2.origin);
  delta2.scale = calcLength(target) / calcLength(source);
  if (isNear(delta2.scale, 1, 1e-4))
    delta2.scale = 1;
  delta2.translate = mix(target.min, target.max, delta2.origin) - delta2.originPoint;
  if (isNear(delta2.translate))
    delta2.translate = 0;
}
function updateBoxDelta(delta2, source, target, origin) {
  updateAxisDelta(delta2.x, source.x, target.x, defaultOrigin(origin.originX));
  updateAxisDelta(delta2.y, source.y, target.y, defaultOrigin(origin.originY));
}
function defaultOrigin(origin) {
  return typeof origin === "number" ? origin : 0.5;
}
function calcRelativeAxis(target, relative, parent) {
  target.min = parent.min + relative.min;
  target.max = target.min + calcLength(relative);
}
function calcRelativeBox(projection, parentProjection) {
  calcRelativeAxis(projection.target.x, projection.relativeTarget.x, parentProjection.target.x);
  calcRelativeAxis(projection.target.y, projection.relativeTarget.y, parentProjection.target.y);
}

// ../../node_modules/framer-motion/dist/es/render/utils/compare-by-depth.js
var compareByDepth = function(a2, b2) {
  return a2.depth - b2.depth;
};

// ../../node_modules/framer-motion/dist/es/render/dom/projection/utils.js
function isProjecting(visualElement2) {
  var isEnabled = visualElement2.projection.isEnabled;
  return isEnabled || visualElement2.shouldResetTransform();
}
function collectProjectingAncestors(visualElement2, ancestors) {
  if (ancestors === void 0) {
    ancestors = [];
  }
  var parent = visualElement2.parent;
  if (parent)
    collectProjectingAncestors(parent, ancestors);
  if (isProjecting(visualElement2))
    ancestors.push(visualElement2);
  return ancestors;
}
function collectProjectingChildren(visualElement2) {
  var children = [];
  var addChild = function(child) {
    if (isProjecting(child))
      children.push(child);
    child.children.forEach(addChild);
  };
  visualElement2.children.forEach(addChild);
  return children.sort(compareByDepth);
}
function updateLayoutMeasurement(visualElement2) {
  if (visualElement2.shouldResetTransform())
    return;
  var layoutState2 = visualElement2.getLayoutState();
  visualElement2.notifyBeforeLayoutMeasure(layoutState2.layout);
  layoutState2.isHydrated = true;
  layoutState2.layout = visualElement2.measureViewportBox();
  layoutState2.layoutCorrected = copyAxisBox(layoutState2.layout);
  visualElement2.notifyLayoutMeasure(layoutState2.layout, visualElement2.prevViewportBox || layoutState2.layout);
  es_default.update(function() {
    return visualElement2.rebaseProjectionTarget();
  });
}
function snapshotViewportBox(visualElement2) {
  if (visualElement2.shouldResetTransform())
    return;
  visualElement2.prevViewportBox = visualElement2.measureViewportBox(false);
  visualElement2.rebaseProjectionTarget(false, visualElement2.prevViewportBox);
}

// ../../node_modules/framer-motion/dist/es/motion/features/layout/utils.js
function tweenAxis(target, prev2, next2, p) {
  target.min = mix(prev2.min, next2.min, p);
  target.max = mix(prev2.max, next2.max, p);
}
function calcRelativeOffsetAxis(parent, child) {
  return {
    min: child.min - parent.min,
    max: child.max - parent.min
  };
}
function calcRelativeOffset(parent, child) {
  return {
    x: calcRelativeOffsetAxis(parent.x, child.x),
    y: calcRelativeOffsetAxis(parent.y, child.y)
  };
}
function checkIfParentHasChanged(prev2, next2) {
  var prevId = prev2.getLayoutId();
  var nextId = next2.getLayoutId();
  return prevId !== nextId || nextId === void 0 && prev2 !== next2;
}

// ../../node_modules/framer-motion/dist/es/render/utils/is-draggable.js
function isDraggable(visualElement2) {
  var _a = visualElement2.getProps(), drag2 = _a.drag, _dragX = _a._dragX;
  return drag2 && !_dragX;
}

// ../../node_modules/framer-motion/dist/es/utils/geometry/delta-apply.js
function resetAxis(axis, originAxis) {
  axis.min = originAxis.min;
  axis.max = originAxis.max;
}
function resetBox(box, originBox) {
  resetAxis(box.x, originBox.x);
  resetAxis(box.y, originBox.y);
}
function scalePoint(point, scale2, originPoint) {
  var distanceFromOrigin = point - originPoint;
  var scaled = scale2 * distanceFromOrigin;
  return originPoint + scaled;
}
function applyPointDelta(point, translate, scale2, originPoint, boxScale) {
  if (boxScale !== void 0) {
    point = scalePoint(point, boxScale, originPoint);
  }
  return scalePoint(point, scale2, originPoint) + translate;
}
function applyAxisDelta(axis, translate, scale2, originPoint, boxScale) {
  if (translate === void 0) {
    translate = 0;
  }
  if (scale2 === void 0) {
    scale2 = 1;
  }
  axis.min = applyPointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = applyPointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function applyBoxDelta(box, _a) {
  var x = _a.x, y = _a.y;
  applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
  applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
function applyAxisTransforms(final, axis, transforms, _a) {
  var _b = __read(_a, 3), key = _b[0], scaleKey = _b[1], originKey = _b[2];
  final.min = axis.min;
  final.max = axis.max;
  var axisOrigin = transforms[originKey] !== void 0 ? transforms[originKey] : 0.5;
  var originPoint = mix(axis.min, axis.max, axisOrigin);
  applyAxisDelta(final, transforms[key], transforms[scaleKey], originPoint, transforms.scale);
}
var xKeys = ["x", "scaleX", "originX"];
var yKeys = ["y", "scaleY", "originY"];
function applyBoxTransforms(finalBox, box, transforms) {
  applyAxisTransforms(finalBox.x, box.x, transforms, xKeys);
  applyAxisTransforms(finalBox.y, box.y, transforms, yKeys);
}
function removePointDelta(point, translate, scale2, originPoint, boxScale) {
  point -= translate;
  point = scalePoint(point, 1 / scale2, originPoint);
  if (boxScale !== void 0) {
    point = scalePoint(point, 1 / boxScale, originPoint);
  }
  return point;
}
function removeAxisDelta(axis, translate, scale2, origin, boxScale) {
  if (translate === void 0) {
    translate = 0;
  }
  if (scale2 === void 0) {
    scale2 = 1;
  }
  if (origin === void 0) {
    origin = 0.5;
  }
  var originPoint = mix(axis.min, axis.max, origin) - translate;
  axis.min = removePointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = removePointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function removeAxisTransforms(axis, transforms, _a) {
  var _b = __read(_a, 3), key = _b[0], scaleKey = _b[1], originKey = _b[2];
  removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale);
}
function removeBoxTransforms(box, transforms) {
  removeAxisTransforms(box.x, transforms, xKeys);
  removeAxisTransforms(box.y, transforms, yKeys);
}
function applyTreeDeltas(box, treeScale, treePath) {
  var treeLength = treePath.length;
  if (!treeLength)
    return;
  treeScale.x = treeScale.y = 1;
  var node2;
  var delta2;
  for (var i = 0; i < treeLength; i++) {
    node2 = treePath[i];
    delta2 = node2.getLayoutState().delta;
    treeScale.x *= delta2.x.scale;
    treeScale.y *= delta2.y.scale;
    applyBoxDelta(box, delta2);
    if (isDraggable(node2)) {
      applyBoxTransforms(box, box, node2.getLatestValues());
    }
  }
}

// ../../node_modules/framer-motion/dist/es/render/dom/projection/convert-to-relative.js
function convertToRelativeProjection(visualElement2, isLayoutDrag) {
  if (isLayoutDrag === void 0) {
    isLayoutDrag = true;
  }
  var projectionParent = visualElement2.getProjectionParent();
  if (!projectionParent)
    return false;
  var offset;
  if (isLayoutDrag) {
    offset = calcRelativeOffset(projectionParent.projection.target, visualElement2.projection.target);
    removeBoxTransforms(offset, projectionParent.getLatestValues());
  } else {
    offset = calcRelativeOffset(projectionParent.getLayoutState().layout, visualElement2.getLayoutState().layout);
  }
  eachAxis(function(axis) {
    return visualElement2.setProjectionTargetAxis(axis, offset[axis].min, offset[axis].max, true);
  });
  return true;
}

// ../../node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.js
var elementDragControls = new WeakMap();
var lastPointerEvent;
var VisualElementDragControls = function() {
  function VisualElementDragControls2(_a) {
    var visualElement2 = _a.visualElement;
    this.isDragging = false;
    this.currentDirection = null;
    this.constraints = false;
    this.elastic = axisBox();
    this.props = {};
    this.hasMutatedConstraints = false;
    this.cursorProgress = {
      x: 0.5,
      y: 0.5
    };
    this.originPoint = {};
    this.openGlobalLock = null;
    this.panSession = null;
    this.visualElement = visualElement2;
    this.visualElement.enableLayoutProjection();
    elementDragControls.set(visualElement2, this);
  }
  VisualElementDragControls2.prototype.start = function(originEvent, _a) {
    var _this = this;
    var _b = _a === void 0 ? {} : _a, _c = _b.snapToCursor, snapToCursor = _c === void 0 ? false : _c, cursorProgress = _b.cursorProgress;
    var onSessionStart = function(event) {
      var _a2;
      _this.stopMotion();
      var initialPoint = getViewportPointFromEvent(event).point;
      (_a2 = _this.cancelLayout) === null || _a2 === void 0 ? void 0 : _a2.call(_this);
      _this.cancelLayout = batchLayout(function(read, write) {
        var ancestors = collectProjectingAncestors(_this.visualElement);
        var children = collectProjectingChildren(_this.visualElement);
        var tree = __spreadArray(__spreadArray([], __read(ancestors)), __read(children));
        var hasManuallySetCursorOrigin = false;
        _this.isLayoutDrag() && _this.visualElement.lockProjectionTarget();
        write(function() {
          tree.forEach(function(element) {
            return element.resetTransform();
          });
        });
        read(function() {
          updateLayoutMeasurement(_this.visualElement);
          children.forEach(updateLayoutMeasurement);
        });
        write(function() {
          tree.forEach(function(element) {
            return element.restoreTransform();
          });
          if (snapToCursor) {
            hasManuallySetCursorOrigin = _this.snapToCursor(initialPoint);
          }
        });
        read(function() {
          var isRelativeDrag = Boolean(_this.getAxisMotionValue("x") && !_this.isExternalDrag());
          if (!isRelativeDrag) {
            _this.visualElement.rebaseProjectionTarget(true, _this.visualElement.measureViewportBox(false));
          }
          _this.visualElement.scheduleUpdateLayoutProjection();
          var projection = _this.visualElement.projection;
          eachAxis(function(axis) {
            if (!hasManuallySetCursorOrigin) {
              var _a3 = projection.target[axis], min = _a3.min, max = _a3.max;
              _this.cursorProgress[axis] = cursorProgress ? cursorProgress[axis] : progress(min, max, initialPoint[axis]);
            }
            var axisValue = _this.getAxisMotionValue(axis);
            if (axisValue) {
              _this.originPoint[axis] = axisValue.get();
            }
          });
        });
        write(function() {
          flushSync.update();
          flushSync.preRender();
          flushSync.render();
          flushSync.postRender();
        });
        read(function() {
          return _this.resolveDragConstraints();
        });
      });
    };
    var onStart = function(event, info) {
      var _a2, _b2, _c2;
      var _d = _this.props, drag2 = _d.drag, dragPropagation = _d.dragPropagation;
      if (drag2 && !dragPropagation) {
        if (_this.openGlobalLock)
          _this.openGlobalLock();
        _this.openGlobalLock = getGlobalLock(drag2);
        if (!_this.openGlobalLock)
          return;
      }
      flushLayout();
      _this.isDragging = true;
      _this.currentDirection = null;
      (_b2 = (_a2 = _this.props).onDragStart) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, event, info);
      (_c2 = _this.visualElement.animationState) === null || _c2 === void 0 ? void 0 : _c2.setActive(AnimationType.Drag, true);
    };
    var onMove = function(event, info) {
      var _a2, _b2, _c2, _d;
      var _e = _this.props, dragPropagation = _e.dragPropagation, dragDirectionLock = _e.dragDirectionLock;
      if (!dragPropagation && !_this.openGlobalLock)
        return;
      var offset = info.offset;
      if (dragDirectionLock && _this.currentDirection === null) {
        _this.currentDirection = getCurrentDirection(offset);
        if (_this.currentDirection !== null) {
          (_b2 = (_a2 = _this.props).onDirectionLock) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, _this.currentDirection);
        }
        return;
      }
      _this.updateAxis("x", info.point, offset);
      _this.updateAxis("y", info.point, offset);
      (_d = (_c2 = _this.props).onDrag) === null || _d === void 0 ? void 0 : _d.call(_c2, event, info);
      lastPointerEvent = event;
    };
    var onEnd = function(event, info) {
      return _this.stop(event, info);
    };
    var transformPagePoint = this.props.transformPagePoint;
    this.panSession = new PanSession(originEvent, {
      onSessionStart,
      onStart,
      onMove,
      onEnd
    }, {transformPagePoint});
  };
  VisualElementDragControls2.prototype.resolveDragConstraints = function() {
    var _this = this;
    var _a = this.props, dragConstraints = _a.dragConstraints, dragElastic = _a.dragElastic;
    var layout = this.visualElement.getLayoutState().layoutCorrected;
    if (dragConstraints) {
      this.constraints = isRefObject(dragConstraints) ? this.resolveRefConstraints(layout, dragConstraints) : calcRelativeConstraints(layout, dragConstraints);
    } else {
      this.constraints = false;
    }
    this.elastic = resolveDragElastic(dragElastic);
    if (this.constraints && !this.hasMutatedConstraints) {
      eachAxis(function(axis) {
        if (_this.getAxisMotionValue(axis)) {
          _this.constraints[axis] = rebaseAxisConstraints(layout[axis], _this.constraints[axis]);
        }
      });
    }
  };
  VisualElementDragControls2.prototype.resolveRefConstraints = function(layoutBox, constraints) {
    var _a = this.props, onMeasureDragConstraints = _a.onMeasureDragConstraints, transformPagePoint = _a.transformPagePoint;
    var constraintsElement = constraints.current;
    invariant(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
    this.constraintsBox = getBoundingBox(constraintsElement, transformPagePoint);
    var measuredConstraints = calcViewportConstraints(layoutBox, this.constraintsBox);
    if (onMeasureDragConstraints) {
      var userConstraints = onMeasureDragConstraints(convertAxisBoxToBoundingBox(measuredConstraints));
      this.hasMutatedConstraints = !!userConstraints;
      if (userConstraints) {
        measuredConstraints = convertBoundingBoxToAxisBox(userConstraints);
      }
    }
    return measuredConstraints;
  };
  VisualElementDragControls2.prototype.cancelDrag = function() {
    var _a, _b;
    (_a = this.cancelLayout) === null || _a === void 0 ? void 0 : _a.call(this);
    this.isDragging = false;
    this.panSession && this.panSession.end();
    this.panSession = null;
    if (!this.props.dragPropagation && this.openGlobalLock) {
      this.openGlobalLock();
      this.openGlobalLock = null;
    }
    (_b = this.visualElement.animationState) === null || _b === void 0 ? void 0 : _b.setActive(AnimationType.Drag, false);
  };
  VisualElementDragControls2.prototype.stop = function(event, info) {
    var _a, _b, _c;
    this.visualElement.unlockProjectionTarget();
    (_a = this.panSession) === null || _a === void 0 ? void 0 : _a.end();
    this.panSession = null;
    var isDragging = this.isDragging;
    this.cancelDrag();
    if (!isDragging)
      return;
    var velocity = info.velocity;
    this.animateDragEnd(velocity);
    (_c = (_b = this.props).onDragEnd) === null || _c === void 0 ? void 0 : _c.call(_b, event, info);
  };
  VisualElementDragControls2.prototype.snapToCursor = function(point) {
    var _this = this;
    return eachAxis(function(axis) {
      var drag2 = _this.props.drag;
      if (!shouldDrag(axis, drag2, _this.currentDirection))
        return;
      var axisValue = _this.getAxisMotionValue(axis);
      if (axisValue) {
        var box = _this.visualElement.getLayoutState().layout;
        var length_1 = box[axis].max - box[axis].min;
        var center = box[axis].min + length_1 / 2;
        var offset = point[axis] - center;
        _this.originPoint[axis] = point[axis];
        axisValue.set(offset);
      } else {
        _this.cursorProgress[axis] = 0.5;
        return true;
      }
    }).includes(true);
  };
  VisualElementDragControls2.prototype.updateAxis = function(axis, point, offset) {
    var drag2 = this.props.drag;
    if (!shouldDrag(axis, drag2, this.currentDirection))
      return;
    return this.getAxisMotionValue(axis) ? this.updateAxisMotionValue(axis, offset) : this.updateVisualElementAxis(axis, point);
  };
  VisualElementDragControls2.prototype.updateAxisMotionValue = function(axis, offset) {
    var axisValue = this.getAxisMotionValue(axis);
    if (!offset || !axisValue)
      return;
    var nextValue = this.originPoint[axis] + offset[axis];
    var update = this.constraints ? applyConstraints(nextValue, this.constraints[axis], this.elastic[axis]) : nextValue;
    axisValue.set(update);
  };
  VisualElementDragControls2.prototype.updateVisualElementAxis = function(axis, point) {
    var _a;
    var axisLayout = this.visualElement.getLayoutState().layout[axis];
    var axisLength = axisLayout.max - axisLayout.min;
    var axisProgress = this.cursorProgress[axis];
    var min = calcConstrainedMinPoint(point[axis], axisLength, axisProgress, (_a = this.constraints) === null || _a === void 0 ? void 0 : _a[axis], this.elastic[axis]);
    this.visualElement.setProjectionTargetAxis(axis, min, min + axisLength);
  };
  VisualElementDragControls2.prototype.setProps = function(_a) {
    var _b = _a.drag, drag2 = _b === void 0 ? false : _b, _c = _a.dragDirectionLock, dragDirectionLock = _c === void 0 ? false : _c, _d = _a.dragPropagation, dragPropagation = _d === void 0 ? false : _d, _e = _a.dragConstraints, dragConstraints = _e === void 0 ? false : _e, _f = _a.dragElastic, dragElastic = _f === void 0 ? defaultElastic : _f, _g = _a.dragMomentum, dragMomentum = _g === void 0 ? true : _g, remainingProps = __rest(_a, ["drag", "dragDirectionLock", "dragPropagation", "dragConstraints", "dragElastic", "dragMomentum"]);
    this.props = __assign({
      drag: drag2,
      dragDirectionLock,
      dragPropagation,
      dragConstraints,
      dragElastic,
      dragMomentum
    }, remainingProps);
  };
  VisualElementDragControls2.prototype.getAxisMotionValue = function(axis) {
    var _a = this.props, layout = _a.layout, layoutId = _a.layoutId;
    var dragKey = "_drag" + axis.toUpperCase();
    if (this.props[dragKey]) {
      return this.props[dragKey];
    } else if (!layout && layoutId === void 0) {
      return this.visualElement.getValue(axis, 0);
    }
  };
  VisualElementDragControls2.prototype.isLayoutDrag = function() {
    return !this.getAxisMotionValue("x");
  };
  VisualElementDragControls2.prototype.isExternalDrag = function() {
    var _a = this.props, _dragX = _a._dragX, _dragY = _a._dragY;
    return _dragX || _dragY;
  };
  VisualElementDragControls2.prototype.animateDragEnd = function(velocity) {
    var _this = this;
    var _a = this.props, drag2 = _a.drag, dragMomentum = _a.dragMomentum, dragElastic = _a.dragElastic, dragTransition = _a.dragTransition;
    var isRelative = convertToRelativeProjection(this.visualElement, this.isLayoutDrag() && !this.isExternalDrag());
    var constraints = this.constraints || {};
    if (isRelative && Object.keys(constraints).length && this.isLayoutDrag()) {
      var projectionParent = this.visualElement.getProjectionParent();
      if (projectionParent) {
        var relativeConstraints_1 = calcRelativeOffset(projectionParent.projection.targetFinal, constraints);
        eachAxis(function(axis) {
          var _a2 = relativeConstraints_1[axis], min = _a2.min, max = _a2.max;
          constraints[axis] = {
            min: isNaN(min) ? void 0 : min,
            max: isNaN(max) ? void 0 : max
          };
        });
      }
    }
    var momentumAnimations = eachAxis(function(axis) {
      var _a2;
      if (!shouldDrag(axis, drag2, _this.currentDirection)) {
        return;
      }
      var transition = (_a2 = constraints === null || constraints === void 0 ? void 0 : constraints[axis]) !== null && _a2 !== void 0 ? _a2 : {};
      var bounceStiffness = dragElastic ? 200 : 1e6;
      var bounceDamping = dragElastic ? 40 : 1e7;
      var inertia2 = __assign(__assign({
        type: "inertia",
        velocity: dragMomentum ? velocity[axis] : 0,
        bounceStiffness,
        bounceDamping,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10
      }, dragTransition), transition);
      return _this.getAxisMotionValue(axis) ? _this.startAxisValueAnimation(axis, inertia2) : _this.visualElement.startLayoutAnimation(axis, inertia2, isRelative);
    });
    return Promise.all(momentumAnimations).then(function() {
      var _a2, _b;
      (_b = (_a2 = _this.props).onDragTransitionEnd) === null || _b === void 0 ? void 0 : _b.call(_a2);
    });
  };
  VisualElementDragControls2.prototype.stopMotion = function() {
    var _this = this;
    eachAxis(function(axis) {
      var axisValue = _this.getAxisMotionValue(axis);
      axisValue ? axisValue.stop() : _this.visualElement.stopLayoutAnimation();
    });
  };
  VisualElementDragControls2.prototype.startAxisValueAnimation = function(axis, transition) {
    var axisValue = this.getAxisMotionValue(axis);
    if (!axisValue)
      return;
    var currentValue = axisValue.get();
    axisValue.set(currentValue);
    axisValue.set(currentValue);
    return startAnimation(axis, axisValue, 0, transition);
  };
  VisualElementDragControls2.prototype.scalePoint = function() {
    var _this = this;
    var _a = this.props, drag2 = _a.drag, dragConstraints = _a.dragConstraints;
    if (!isRefObject(dragConstraints) || !this.constraintsBox)
      return;
    this.stopMotion();
    var boxProgress = {x: 0, y: 0};
    eachAxis(function(axis) {
      boxProgress[axis] = calcOrigin2(_this.visualElement.projection.target[axis], _this.constraintsBox[axis]);
    });
    this.updateConstraints(function() {
      eachAxis(function(axis) {
        if (!shouldDrag(axis, drag2, null))
          return;
        var _a2 = calcPositionFromProgress(_this.visualElement.projection.target[axis], _this.constraintsBox[axis], boxProgress[axis]), min = _a2.min, max = _a2.max;
        _this.visualElement.setProjectionTargetAxis(axis, min, max);
      });
    });
    setTimeout(flushLayout, 1);
  };
  VisualElementDragControls2.prototype.updateConstraints = function(onReady) {
    var _this = this;
    this.cancelLayout = batchLayout(function(read, write) {
      var ancestors = collectProjectingAncestors(_this.visualElement);
      write(function() {
        return ancestors.forEach(function(element) {
          return element.resetTransform();
        });
      });
      read(function() {
        return updateLayoutMeasurement(_this.visualElement);
      });
      write(function() {
        return ancestors.forEach(function(element) {
          return element.restoreTransform();
        });
      });
      read(function() {
        _this.resolveDragConstraints();
      });
      if (onReady)
        write(onReady);
    });
  };
  VisualElementDragControls2.prototype.mount = function(visualElement2) {
    var _this = this;
    var element = visualElement2.getInstance();
    var stopPointerListener = addPointerEvent(element, "pointerdown", function(event) {
      var _a = _this.props, drag2 = _a.drag, _b = _a.dragListener, dragListener = _b === void 0 ? true : _b;
      drag2 && dragListener && _this.start(event);
    });
    var stopResizeListener = addDomEvent(window, "resize", function() {
      _this.scalePoint();
    });
    var stopLayoutUpdateListener = visualElement2.onLayoutUpdate(function() {
      if (_this.isDragging) {
        _this.resolveDragConstraints();
      }
    });
    var prevDragCursor = visualElement2.prevDragCursor;
    if (prevDragCursor) {
      this.start(lastPointerEvent, {cursorProgress: prevDragCursor});
    }
    return function() {
      stopPointerListener === null || stopPointerListener === void 0 ? void 0 : stopPointerListener();
      stopResizeListener === null || stopResizeListener === void 0 ? void 0 : stopResizeListener();
      stopLayoutUpdateListener === null || stopLayoutUpdateListener === void 0 ? void 0 : stopLayoutUpdateListener();
      _this.cancelDrag();
    };
  };
  return VisualElementDragControls2;
}();
function shouldDrag(direction, drag2, currentDirection) {
  return (drag2 === true || drag2 === direction) && (currentDirection === null || currentDirection === direction);
}
function getCurrentDirection(offset, lockThreshold) {
  if (lockThreshold === void 0) {
    lockThreshold = 10;
  }
  var direction = null;
  if (Math.abs(offset.y) > lockThreshold) {
    direction = "y";
  } else if (Math.abs(offset.x) > lockThreshold) {
    direction = "x";
  }
  return direction;
}

// ../../node_modules/framer-motion/dist/es/gestures/drag/use-drag.js
function useDrag(props) {
  var groupDragControls = props.dragControls, visualElement2 = props.visualElement;
  var transformPagePoint = (0, import_react22.useContext)(MotionConfigContext).transformPagePoint;
  var dragControls = useConstant(function() {
    return new VisualElementDragControls({
      visualElement: visualElement2
    });
  });
  dragControls.setProps(__assign(__assign({}, props), {transformPagePoint}));
  (0, import_react22.useEffect)(function() {
    return groupDragControls && groupDragControls.subscribe(dragControls);
  }, [dragControls]);
  (0, import_react22.useEffect)(function() {
    return dragControls.mount(visualElement2);
  }, []);
}

// ../../node_modules/framer-motion/dist/es/gestures/use-pan-gesture.js
var import_react23 = __toModule(require_react());
function usePanGesture(_a) {
  var onPan = _a.onPan, onPanStart = _a.onPanStart, onPanEnd = _a.onPanEnd, onPanSessionStart = _a.onPanSessionStart, visualElement2 = _a.visualElement;
  var hasPanEvents = onPan || onPanStart || onPanEnd || onPanSessionStart;
  var panSession = (0, import_react23.useRef)(null);
  var transformPagePoint = (0, import_react23.useContext)(MotionConfigContext).transformPagePoint;
  var handlers = {
    onSessionStart: onPanSessionStart,
    onStart: onPanStart,
    onMove: onPan,
    onEnd: function(event, info) {
      panSession.current = null;
      onPanEnd && onPanEnd(event, info);
    }
  };
  (0, import_react23.useEffect)(function() {
    if (panSession.current !== null) {
      panSession.current.updateHandlers(handlers);
    }
  });
  function onPointerDown(event) {
    panSession.current = new PanSession(event, handlers, {
      transformPagePoint
    });
  }
  usePointerEvent(visualElement2, "pointerdown", hasPanEvents && onPointerDown);
  useUnmountEffect(function() {
    return panSession.current && panSession.current.end();
  });
}

// ../../node_modules/framer-motion/dist/es/motion/features/drag.js
var drag = {
  pan: makeRenderlessComponent(usePanGesture),
  drag: makeRenderlessComponent(useDrag)
};

// ../../node_modules/framer-motion/dist/es/motion/features/layout/Animate.js
var React3 = __toModule(require_react());

// ../../node_modules/framer-motion/dist/es/components/AnimateSharedLayout/types.js
var Presence;
(function(Presence2) {
  Presence2[Presence2["Entering"] = 0] = "Entering";
  Presence2[Presence2["Present"] = 1] = "Present";
  Presence2[Presence2["Exiting"] = 2] = "Exiting";
})(Presence || (Presence = {}));
var VisibilityAction;
(function(VisibilityAction2) {
  VisibilityAction2[VisibilityAction2["Hide"] = 0] = "Hide";
  VisibilityAction2[VisibilityAction2["Show"] = 1] = "Show";
})(VisibilityAction || (VisibilityAction = {}));

// ../../node_modules/framer-motion/dist/es/render/dom/utils/css-variables-conversion.js
function isCSSVariable2(value) {
  return typeof value === "string" && value.startsWith("var(--");
}
var cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function parseCSSVariable(current) {
  var match2 = cssVariableRegex.exec(current);
  if (!match2)
    return [,];
  var _a = __read(match2, 3), token2 = _a[1], fallback = _a[2];
  return [token2, fallback];
}
var maxDepth = 4;
function getVariableValue(current, element, depth) {
  if (depth === void 0) {
    depth = 1;
  }
  invariant(depth <= maxDepth, 'Max CSS variable fallback depth detected in property "' + current + '". This may indicate a circular fallback dependency.');
  var _a = __read(parseCSSVariable(current), 2), token2 = _a[0], fallback = _a[1];
  if (!token2)
    return;
  var resolved = window.getComputedStyle(element).getPropertyValue(token2);
  if (resolved) {
    return resolved.trim();
  } else if (isCSSVariable2(fallback)) {
    return getVariableValue(fallback, element, depth + 1);
  } else {
    return fallback;
  }
}
function resolveCSSVariables(visualElement2, _a, transitionEnd) {
  var _b;
  var target = __rest(_a, []);
  var element = visualElement2.getInstance();
  if (!(element instanceof HTMLElement))
    return {target, transitionEnd};
  if (transitionEnd) {
    transitionEnd = __assign({}, transitionEnd);
  }
  visualElement2.forEachValue(function(value) {
    var current2 = value.get();
    if (!isCSSVariable2(current2))
      return;
    var resolved2 = getVariableValue(current2, element);
    if (resolved2)
      value.set(resolved2);
  });
  for (var key in target) {
    var current = target[key];
    if (!isCSSVariable2(current))
      continue;
    var resolved = getVariableValue(current, element);
    if (!resolved)
      continue;
    target[key] = resolved;
    if (transitionEnd)
      (_b = transitionEnd[key]) !== null && _b !== void 0 ? _b : transitionEnd[key] = current;
  }
  return {target, transitionEnd};
}

// ../../node_modules/framer-motion/dist/es/render/dom/projection/default-scale-correctors.js
function pixelsToPercent(pixels, axis) {
  return pixels / (axis.max - axis.min) * 100;
}
function correctBorderRadius(latest, _layoutState, _a) {
  var target = _a.target;
  if (typeof latest === "string") {
    if (px.test(latest)) {
      latest = parseFloat(latest);
    } else {
      return latest;
    }
  }
  var x = pixelsToPercent(latest, target.x);
  var y = pixelsToPercent(latest, target.y);
  return x + "% " + y + "%";
}
var varToken = "_$css";
function correctBoxShadow(latest, _a) {
  var delta2 = _a.delta, treeScale = _a.treeScale;
  var original = latest;
  var containsCSSVariables = latest.includes("var(");
  var cssVariables = [];
  if (containsCSSVariables) {
    latest = latest.replace(cssVariableRegex, function(match2) {
      cssVariables.push(match2);
      return varToken;
    });
  }
  var shadow = complex.parse(latest);
  if (shadow.length > 5)
    return original;
  var template = complex.createTransformer(latest);
  var offset = typeof shadow[0] !== "number" ? 1 : 0;
  var xScale = delta2.x.scale * treeScale.x;
  var yScale = delta2.y.scale * treeScale.y;
  shadow[0 + offset] /= xScale;
  shadow[1 + offset] /= yScale;
  var averageScale = mix(xScale, yScale, 0.5);
  if (typeof shadow[2 + offset] === "number")
    shadow[2 + offset] /= averageScale;
  if (typeof shadow[3 + offset] === "number")
    shadow[3 + offset] /= averageScale;
  var output = template(shadow);
  if (containsCSSVariables) {
    var i_1 = 0;
    output = output.replace(varToken, function() {
      var cssVariable = cssVariables[i_1];
      i_1++;
      return cssVariable;
    });
  }
  return output;
}
var borderCorrectionDefinition = {
  process: correctBorderRadius
};
var defaultScaleCorrectors = {
  borderRadius: __assign(__assign({}, borderCorrectionDefinition), {applyTo: [
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomLeftRadius",
    "borderBottomRightRadius"
  ]}),
  borderTopLeftRadius: borderCorrectionDefinition,
  borderTopRightRadius: borderCorrectionDefinition,
  borderBottomLeftRadius: borderCorrectionDefinition,
  borderBottomRightRadius: borderCorrectionDefinition,
  boxShadow: {
    process: correctBoxShadow
  }
};

// ../../node_modules/framer-motion/dist/es/motion/features/layout/Animate.js
var progressTarget = 1e3;
var Animate = function(_super) {
  __extends(Animate2, _super);
  function Animate2() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.frameTarget = axisBox();
    _this.currentAnimationTarget = axisBox();
    _this.isAnimating = {
      x: false,
      y: false
    };
    _this.stopAxisAnimation = {
      x: void 0,
      y: void 0
    };
    _this.isAnimatingTree = false;
    _this.animate = function(target, origin, _a) {
      if (_a === void 0) {
        _a = {};
      }
      var originBox = _a.originBox, targetBox = _a.targetBox, visibilityAction = _a.visibilityAction, shouldStackAnimate = _a.shouldStackAnimate, onComplete = _a.onComplete, prevParent = _a.prevParent, config = __rest(_a, ["originBox", "targetBox", "visibilityAction", "shouldStackAnimate", "onComplete", "prevParent"]);
      var _b = _this.props, visualElement2 = _b.visualElement, layout = _b.layout;
      if (shouldStackAnimate === false) {
        _this.isAnimatingTree = false;
        return _this.safeToRemove();
      }
      if (_this.isAnimatingTree && shouldStackAnimate !== true) {
        return;
      } else if (shouldStackAnimate) {
        _this.isAnimatingTree = true;
      }
      origin = originBox || origin;
      target = targetBox || target;
      var isRelative = false;
      var projectionParent = visualElement2.getProjectionParent();
      if (projectionParent) {
        var prevParentViewportBox = projectionParent.prevViewportBox;
        var parentLayout = projectionParent.getLayoutState().layout;
        if (prevParent) {
          if (targetBox) {
            parentLayout = prevParent.getLayoutState().layout;
          }
          if (originBox && !checkIfParentHasChanged(prevParent, projectionParent) && prevParent.prevViewportBox) {
            prevParentViewportBox = prevParent.prevViewportBox;
          }
        }
        if (prevParentViewportBox && isProvidedCorrectDataForRelativeSharedLayout(prevParent, originBox, targetBox)) {
          isRelative = true;
          origin = calcRelativeOffset(prevParentViewportBox, origin);
          target = calcRelativeOffset(parentLayout, target);
        }
      }
      var boxHasMoved = hasMoved(origin, target);
      var animations2 = eachAxis(function(axis) {
        var _a2, _b2;
        if (layout === "position") {
          var targetLength = target[axis].max - target[axis].min;
          origin[axis].max = origin[axis].min + targetLength;
        }
        if (visualElement2.projection.isTargetLocked) {
          return;
        } else if (visibilityAction !== void 0) {
          visualElement2.setVisibility(visibilityAction === VisibilityAction.Show);
        } else if (boxHasMoved) {
          return _this.animateAxis(axis, target[axis], origin[axis], __assign(__assign({}, config), {isRelative}));
        } else {
          (_b2 = (_a2 = _this.stopAxisAnimation)[axis]) === null || _b2 === void 0 ? void 0 : _b2.call(_a2);
          return visualElement2.setProjectionTargetAxis(axis, target[axis].min, target[axis].max, isRelative);
        }
      });
      visualElement2.syncRender();
      return Promise.all(animations2).then(function() {
        _this.isAnimatingTree = false;
        onComplete && onComplete();
        visualElement2.notifyLayoutAnimationComplete();
      });
    };
    return _this;
  }
  Animate2.prototype.componentDidMount = function() {
    var _this = this;
    var visualElement2 = this.props.visualElement;
    visualElement2.animateMotionValue = startAnimation;
    visualElement2.enableLayoutProjection();
    this.unsubLayoutReady = visualElement2.onLayoutUpdate(this.animate);
    visualElement2.layoutSafeToRemove = function() {
      return _this.safeToRemove();
    };
    addScaleCorrection(defaultScaleCorrectors);
  };
  Animate2.prototype.componentWillUnmount = function() {
    var _this = this;
    this.unsubLayoutReady();
    eachAxis(function(axis) {
      var _a, _b;
      return (_b = (_a = _this.stopAxisAnimation)[axis]) === null || _b === void 0 ? void 0 : _b.call(_a);
    });
  };
  Animate2.prototype.animateAxis = function(axis, target, origin, _a) {
    var _this = this;
    var _b, _c;
    var _d = _a === void 0 ? {} : _a, transition = _d.transition, isRelative = _d.isRelative;
    if (this.isAnimating[axis] && axisIsEqual(target, this.currentAnimationTarget[axis])) {
      return;
    }
    (_c = (_b = this.stopAxisAnimation)[axis]) === null || _c === void 0 ? void 0 : _c.call(_b);
    this.isAnimating[axis] = true;
    var visualElement2 = this.props.visualElement;
    var frameTarget = this.frameTarget[axis];
    var layoutProgress = visualElement2.getProjectionAnimationProgress()[axis];
    layoutProgress.clearListeners();
    layoutProgress.set(0);
    layoutProgress.set(0);
    var frame2 = function() {
      var p = layoutProgress.get() / progressTarget;
      tweenAxis(frameTarget, origin, target, p);
      visualElement2.setProjectionTargetAxis(axis, frameTarget.min, frameTarget.max, isRelative);
    };
    frame2();
    var unsubscribeProgress = layoutProgress.onChange(frame2);
    this.stopAxisAnimation[axis] = function() {
      _this.isAnimating[axis] = false;
      layoutProgress.stop();
      unsubscribeProgress();
    };
    this.currentAnimationTarget[axis] = target;
    var layoutTransition = transition || visualElement2.getDefaultTransition() || defaultLayoutTransition;
    var animation = startAnimation(axis === "x" ? "layoutX" : "layoutY", layoutProgress, progressTarget, layoutTransition && getValueTransition(layoutTransition, "layout")).then(this.stopAxisAnimation[axis]);
    return animation;
  };
  Animate2.prototype.safeToRemove = function() {
    var _a, _b;
    (_b = (_a = this.props).safeToRemove) === null || _b === void 0 ? void 0 : _b.call(_a);
  };
  Animate2.prototype.render = function() {
    return null;
  };
  return Animate2;
}(React3.Component);
function AnimateLayoutContextProvider(props) {
  var _a = __read(usePresence(), 2), safeToRemove = _a[1];
  return React3.createElement(Animate, __assign({}, props, {safeToRemove}));
}
function hasMoved(a2, b2) {
  return !isZeroBox(a2) && !isZeroBox(b2) && (!axisIsEqual(a2.x, b2.x) || !axisIsEqual(a2.y, b2.y));
}
var zeroAxis = {min: 0, max: 0};
function isZeroBox(a2) {
  return axisIsEqual(a2.x, zeroAxis) && axisIsEqual(a2.y, zeroAxis);
}
function axisIsEqual(a2, b2) {
  return a2.min === b2.min && a2.max === b2.max;
}
var defaultLayoutTransition = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
};
function isProvidedCorrectDataForRelativeSharedLayout(prevParent, originBox, targetBox) {
  return prevParent || !prevParent && !(originBox || targetBox);
}

// ../../node_modules/framer-motion/dist/es/motion/features/layout/Measure.js
var import_react25 = __toModule(require_react());

// ../../node_modules/framer-motion/dist/es/context/SharedLayoutContext.js
var import_react24 = __toModule(require_react());

// ../../node_modules/framer-motion/dist/es/components/AnimateSharedLayout/utils/batcher.js
var defaultHandler = {
  layoutReady: function(child) {
    return child.notifyLayoutReady();
  }
};
function createBatcher() {
  var queue = new Set();
  return {
    add: function(child) {
      return queue.add(child);
    },
    flush: function(_a) {
      var _b = _a === void 0 ? defaultHandler : _a, layoutReady = _b.layoutReady, parent = _b.parent;
      batchLayout(function(read, write) {
        var order3 = Array.from(queue).sort(compareByDepth);
        var ancestors = parent ? collectProjectingAncestors(parent) : [];
        write(function() {
          var allElements = __spreadArray(__spreadArray([], __read(ancestors)), __read(order3));
          allElements.forEach(function(element) {
            return element.resetTransform();
          });
        });
        read(function() {
          order3.forEach(updateLayoutMeasurement);
        });
        write(function() {
          ancestors.forEach(function(element) {
            return element.restoreTransform();
          });
          order3.forEach(layoutReady);
        });
        read(function() {
          order3.forEach(function(child) {
            if (child.isPresent)
              child.presence = Presence.Present;
          });
        });
        write(function() {
          flushSync.preRender();
          flushSync.render();
        });
        read(function() {
          es_default.postRender(function() {
            return order3.forEach(assignProjectionToSnapshot);
          });
          queue.clear();
        });
      });
      flushLayout();
    }
  };
}
function assignProjectionToSnapshot(child) {
  child.prevViewportBox = child.projection.target;
}

// ../../node_modules/framer-motion/dist/es/context/SharedLayoutContext.js
var SharedLayoutContext = (0, import_react24.createContext)(createBatcher());
var FramerTreeLayoutContext = (0, import_react24.createContext)(createBatcher());
function isSharedLayout(context) {
  return !!context.forceUpdate;
}

// ../../node_modules/framer-motion/dist/es/motion/features/layout/Measure.js
var Measure = function(_super) {
  __extends(Measure2, _super);
  function Measure2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  Measure2.prototype.componentDidMount = function() {
    var _a = this.props, syncLayout = _a.syncLayout, framerSyncLayout = _a.framerSyncLayout, visualElement2 = _a.visualElement;
    isSharedLayout(syncLayout) && syncLayout.register(visualElement2);
    isSharedLayout(framerSyncLayout) && framerSyncLayout.register(visualElement2);
    visualElement2.onUnmount(function() {
      if (isSharedLayout(syncLayout)) {
        syncLayout.remove(visualElement2);
      }
      if (isSharedLayout(framerSyncLayout)) {
        framerSyncLayout.remove(visualElement2);
      }
    });
  };
  Measure2.prototype.getSnapshotBeforeUpdate = function() {
    var _a = this.props, syncLayout = _a.syncLayout, visualElement2 = _a.visualElement;
    if (isSharedLayout(syncLayout)) {
      syncLayout.syncUpdate();
    } else {
      snapshotViewportBox(visualElement2);
      syncLayout.add(visualElement2);
    }
    return null;
  };
  Measure2.prototype.componentDidUpdate = function() {
    var syncLayout = this.props.syncLayout;
    if (!isSharedLayout(syncLayout))
      syncLayout.flush();
  };
  Measure2.prototype.render = function() {
    return null;
  };
  return Measure2;
}(import_react25.default.Component);
function MeasureContextProvider(props) {
  var syncLayout = (0, import_react25.useContext)(SharedLayoutContext);
  var framerSyncLayout = (0, import_react25.useContext)(FramerTreeLayoutContext);
  return import_react25.default.createElement(Measure, __assign({}, props, {syncLayout, framerSyncLayout}));
}

// ../../node_modules/framer-motion/dist/es/motion/features/layout/index.js
var layoutAnimations = {
  measureLayout: MeasureContextProvider,
  layoutAnimation: AnimateLayoutContextProvider
};

// ../../node_modules/framer-motion/dist/es/render/utils/state.js
var createProjectionState = function() {
  return {
    isEnabled: false,
    isHydrated: false,
    isTargetLocked: false,
    target: axisBox(),
    targetFinal: axisBox()
  };
};
function createLayoutState() {
  return {
    isHydrated: false,
    layout: axisBox(),
    layoutCorrected: axisBox(),
    treeScale: {x: 1, y: 1},
    delta: delta(),
    deltaFinal: delta(),
    deltaTransform: ""
  };
}
var zeroLayout = createLayoutState();

// ../../node_modules/framer-motion/dist/es/render/html/utils/build-projection-transform.js
function buildLayoutProjectionTransform(_a, treeScale, latestTransform) {
  var x = _a.x, y = _a.y;
  var xTranslate = x.translate / treeScale.x;
  var yTranslate = y.translate / treeScale.y;
  var transform3 = "translate3d(" + xTranslate + "px, " + yTranslate + "px, 0) ";
  if (latestTransform) {
    var rotate = latestTransform.rotate, rotateX = latestTransform.rotateX, rotateY = latestTransform.rotateY;
    if (rotate)
      transform3 += "rotate(" + rotate + ") ";
    if (rotateX)
      transform3 += "rotateX(" + rotateX + ") ";
    if (rotateY)
      transform3 += "rotateY(" + rotateY + ") ";
  }
  transform3 += "scale(" + x.scale + ", " + y.scale + ")";
  return !latestTransform && transform3 === identityProjection ? "" : transform3;
}
function buildLayoutProjectionTransformOrigin(_a) {
  var deltaFinal = _a.deltaFinal;
  return deltaFinal.x.origin * 100 + "% " + deltaFinal.y.origin * 100 + "% 0";
}
var identityProjection = buildLayoutProjectionTransform(zeroLayout.delta, zeroLayout.treeScale, {x: 1, y: 1});

// ../../node_modules/framer-motion/dist/es/render/utils/lifecycles.js
var names = [
  "LayoutMeasure",
  "BeforeLayoutMeasure",
  "LayoutUpdate",
  "ViewportBoxUpdate",
  "Update",
  "Render",
  "AnimationComplete",
  "LayoutAnimationComplete",
  "AnimationStart",
  "SetAxisTarget",
  "Unmount"
];
function createLifecycles() {
  var managers = names.map(function() {
    return new SubscriptionManager();
  });
  var propSubscriptions = {};
  var lifecycles = {
    clearAllListeners: function() {
      return managers.forEach(function(manager) {
        return manager.clear();
      });
    },
    updatePropListeners: function(props) {
      return names.forEach(function(name) {
        var _a;
        (_a = propSubscriptions[name]) === null || _a === void 0 ? void 0 : _a.call(propSubscriptions);
        var on = "on" + name;
        var propListener = props[on];
        if (propListener) {
          propSubscriptions[name] = lifecycles[on](propListener);
        }
      });
    }
  };
  managers.forEach(function(manager, i) {
    lifecycles["on" + names[i]] = function(handler) {
      return manager.add(handler);
    };
    lifecycles["notify" + names[i]] = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return manager.notify.apply(manager, __spreadArray([], __read(args)));
    };
  });
  return lifecycles;
}

// ../../node_modules/framer-motion/dist/es/render/utils/motion-values.js
function updateMotionValuesFromProps(element, next2, prev2) {
  var _a;
  for (var key in next2) {
    var nextValue = next2[key];
    var prevValue = prev2[key];
    if (isMotionValue(nextValue)) {
      element.addValue(key, nextValue);
    } else if (isMotionValue(prevValue)) {
      element.addValue(key, motionValue(nextValue));
    } else if (prevValue !== nextValue) {
      if (element.hasValue(key)) {
        var existingValue = element.getValue(key);
        !existingValue.hasAnimated && existingValue.set(nextValue);
      } else {
        element.addValue(key, motionValue((_a = element.getStaticValue(key)) !== null && _a !== void 0 ? _a : nextValue));
      }
    }
  }
  for (var key in prev2) {
    if (next2[key] === void 0)
      element.removeValue(key);
  }
  return next2;
}

// ../../node_modules/framer-motion/dist/es/render/utils/projection.js
function updateLayoutDeltas(_a, _b, treePath, transformOrigin) {
  var delta2 = _a.delta, layout = _a.layout, layoutCorrected = _a.layoutCorrected, treeScale = _a.treeScale;
  var target = _b.target;
  resetBox(layoutCorrected, layout);
  applyTreeDeltas(layoutCorrected, treeScale, treePath);
  updateBoxDelta(delta2, layoutCorrected, target, transformOrigin);
}

// ../../node_modules/framer-motion/dist/es/render/utils/flat-tree.js
var FlatTree = function() {
  function FlatTree2() {
    this.children = [];
    this.isDirty = false;
  }
  FlatTree2.prototype.add = function(child) {
    addUniqueItem(this.children, child);
    this.isDirty = true;
  };
  FlatTree2.prototype.remove = function(child) {
    removeItem(this.children, child);
    this.isDirty = true;
  };
  FlatTree2.prototype.forEach = function(callback) {
    this.isDirty && this.children.sort(compareByDepth);
    this.isDirty = false;
    this.children.forEach(callback);
  };
  return FlatTree2;
}();

// ../../node_modules/framer-motion/dist/es/render/dom/projection/relative-set.js
function setCurrentViewportBox(visualElement2) {
  var projectionParent = visualElement2.getProjectionParent();
  if (!projectionParent) {
    visualElement2.rebaseProjectionTarget();
    return;
  }
  var relativeOffset = calcRelativeOffset(projectionParent.getLayoutState().layout, visualElement2.getLayoutState().layout);
  eachAxis(function(axis) {
    visualElement2.setProjectionTargetAxis(axis, relativeOffset[axis].min, relativeOffset[axis].max, true);
  });
}

// ../../node_modules/framer-motion/dist/es/render/index.js
var visualElement = function(_a) {
  var _b = _a.treeType, treeType = _b === void 0 ? "" : _b, build = _a.build, getBaseTarget = _a.getBaseTarget, makeTargetAnimatable = _a.makeTargetAnimatable, measureViewportBox = _a.measureViewportBox, renderInstance = _a.render, readValueFromInstance = _a.readValueFromInstance, resetTransform = _a.resetTransform, restoreTransform = _a.restoreTransform, removeValueFromRenderState = _a.removeValueFromRenderState, sortNodePosition = _a.sortNodePosition, scrapeMotionValuesFromProps3 = _a.scrapeMotionValuesFromProps;
  return function(_a2, options) {
    var parent = _a2.parent, props = _a2.props, presenceId2 = _a2.presenceId, blockInitialAnimation = _a2.blockInitialAnimation, visualState = _a2.visualState;
    if (options === void 0) {
      options = {};
    }
    var latestValues = visualState.latestValues, renderState = visualState.renderState;
    var instance;
    var lifecycles = createLifecycles();
    var projection = createProjectionState();
    var projectionParent;
    var leadProjection = projection;
    var leadLatestValues = latestValues;
    var unsubscribeFromLeadVisualElement;
    var layoutState2 = createLayoutState();
    var crossfader;
    var hasViewportBoxUpdated = false;
    var values3 = new Map();
    var valueSubscriptions = new Map();
    var prevMotionValues = {};
    var projectionTargetProgress;
    var baseTarget = __assign({}, latestValues);
    var removeFromVariantTree;
    function render2() {
      if (!instance)
        return;
      if (element.isProjectionReady()) {
        applyBoxTransforms(leadProjection.targetFinal, leadProjection.target, leadLatestValues);
        updateBoxDelta(layoutState2.deltaFinal, layoutState2.layoutCorrected, leadProjection.targetFinal, latestValues);
      }
      triggerBuild();
      renderInstance(instance, renderState);
    }
    function triggerBuild() {
      var valuesToRender = latestValues;
      if (crossfader && crossfader.isActive()) {
        var crossfadedValues = crossfader.getCrossfadeState(element);
        if (crossfadedValues)
          valuesToRender = crossfadedValues;
      }
      build(element, renderState, valuesToRender, leadProjection, layoutState2, options, props);
    }
    function update() {
      lifecycles.notifyUpdate(latestValues);
    }
    function updateLayoutProjection() {
      if (!element.isProjectionReady())
        return;
      var delta2 = layoutState2.delta, treeScale = layoutState2.treeScale;
      var prevTreeScaleX = treeScale.x;
      var prevTreeScaleY = treeScale.x;
      var prevDeltaTransform = layoutState2.deltaTransform;
      updateLayoutDeltas(layoutState2, leadProjection, element.path, latestValues);
      hasViewportBoxUpdated && element.notifyViewportBoxUpdate(leadProjection.target, delta2);
      hasViewportBoxUpdated = false;
      var deltaTransform = buildLayoutProjectionTransform(delta2, treeScale);
      if (deltaTransform !== prevDeltaTransform || prevTreeScaleX !== treeScale.x || prevTreeScaleY !== treeScale.y) {
        element.scheduleRender();
      }
      layoutState2.deltaTransform = deltaTransform;
    }
    function updateTreeLayoutProjection() {
      element.layoutTree.forEach(fireUpdateLayoutProjection);
    }
    function bindToMotionValue(key2, value2) {
      var removeOnChange = value2.onChange(function(latestValue) {
        latestValues[key2] = latestValue;
        props.onUpdate && es_default.update(update, false, true);
      });
      var removeOnRenderRequest = value2.onRenderRequest(element.scheduleRender);
      valueSubscriptions.set(key2, function() {
        removeOnChange();
        removeOnRenderRequest();
      });
    }
    var initialMotionValues = scrapeMotionValuesFromProps3(props);
    for (var key in initialMotionValues) {
      var value = initialMotionValues[key];
      if (latestValues[key] !== void 0 && isMotionValue(value)) {
        value.set(latestValues[key], false);
      }
    }
    var isControllingVariants = checkIfControllingVariants(props);
    var isVariantNode = checkIfVariantNode(props);
    var element = __assign(__assign({
      treeType,
      current: null,
      depth: parent ? parent.depth + 1 : 0,
      parent,
      children: new Set(),
      path: parent ? __spreadArray(__spreadArray([], __read(parent.path)), [parent]) : [],
      layoutTree: parent ? parent.layoutTree : new FlatTree(),
      presenceId: presenceId2,
      projection,
      variantChildren: isVariantNode ? new Set() : void 0,
      isVisible: void 0,
      manuallyAnimateOnMount: Boolean(parent === null || parent === void 0 ? void 0 : parent.isMounted()),
      blockInitialAnimation,
      isMounted: function() {
        return Boolean(instance);
      },
      mount: function(newInstance) {
        instance = element.current = newInstance;
        element.pointTo(element);
        if (isVariantNode && parent && !isControllingVariants) {
          removeFromVariantTree = parent === null || parent === void 0 ? void 0 : parent.addVariantChild(element);
        }
        parent === null || parent === void 0 ? void 0 : parent.children.add(element);
      },
      unmount: function() {
        cancelSync.update(update);
        cancelSync.render(render2);
        cancelSync.preRender(element.updateLayoutProjection);
        valueSubscriptions.forEach(function(remove) {
          return remove();
        });
        element.stopLayoutAnimation();
        element.layoutTree.remove(element);
        removeFromVariantTree === null || removeFromVariantTree === void 0 ? void 0 : removeFromVariantTree();
        parent === null || parent === void 0 ? void 0 : parent.children.delete(element);
        unsubscribeFromLeadVisualElement === null || unsubscribeFromLeadVisualElement === void 0 ? void 0 : unsubscribeFromLeadVisualElement();
        lifecycles.clearAllListeners();
      },
      addVariantChild: function(child) {
        var _a3;
        var closestVariantNode = element.getClosestVariantNode();
        if (closestVariantNode) {
          (_a3 = closestVariantNode.variantChildren) === null || _a3 === void 0 ? void 0 : _a3.add(child);
          return function() {
            return closestVariantNode.variantChildren.delete(child);
          };
        }
      },
      sortNodePosition: function(other) {
        if (!sortNodePosition || treeType !== other.treeType)
          return 0;
        return sortNodePosition(element.getInstance(), other.getInstance());
      },
      getClosestVariantNode: function() {
        return isVariantNode ? element : parent === null || parent === void 0 ? void 0 : parent.getClosestVariantNode();
      },
      scheduleUpdateLayoutProjection: parent ? parent.scheduleUpdateLayoutProjection : function() {
        return es_default.preRender(element.updateTreeLayoutProjection, false, true);
      },
      getLayoutId: function() {
        return props.layoutId;
      },
      getInstance: function() {
        return instance;
      },
      getStaticValue: function(key2) {
        return latestValues[key2];
      },
      setStaticValue: function(key2, value2) {
        return latestValues[key2] = value2;
      },
      getLatestValues: function() {
        return latestValues;
      },
      setVisibility: function(visibility2) {
        if (element.isVisible === visibility2)
          return;
        element.isVisible = visibility2;
        element.scheduleRender();
      },
      makeTargetAnimatable: function(target, canMutate) {
        if (canMutate === void 0) {
          canMutate = true;
        }
        return makeTargetAnimatable(element, target, props, canMutate);
      },
      addValue: function(key2, value2) {
        if (element.hasValue(key2))
          element.removeValue(key2);
        values3.set(key2, value2);
        latestValues[key2] = value2.get();
        bindToMotionValue(key2, value2);
      },
      removeValue: function(key2) {
        var _a3;
        values3.delete(key2);
        (_a3 = valueSubscriptions.get(key2)) === null || _a3 === void 0 ? void 0 : _a3();
        valueSubscriptions.delete(key2);
        delete latestValues[key2];
        removeValueFromRenderState(key2, renderState);
      },
      hasValue: function(key2) {
        return values3.has(key2);
      },
      getValue: function(key2, defaultValue) {
        var value2 = values3.get(key2);
        if (value2 === void 0 && defaultValue !== void 0) {
          value2 = motionValue(defaultValue);
          element.addValue(key2, value2);
        }
        return value2;
      },
      forEachValue: function(callback) {
        return values3.forEach(callback);
      },
      readValue: function(key2) {
        var _a3;
        return (_a3 = latestValues[key2]) !== null && _a3 !== void 0 ? _a3 : readValueFromInstance(instance, key2, options);
      },
      setBaseTarget: function(key2, value2) {
        baseTarget[key2] = value2;
      },
      getBaseTarget: function(key2) {
        if (getBaseTarget) {
          var target = getBaseTarget(props, key2);
          if (target !== void 0 && !isMotionValue(target))
            return target;
        }
        return baseTarget[key2];
      }
    }, lifecycles), {
      build: function() {
        triggerBuild();
        return renderState;
      },
      scheduleRender: function() {
        es_default.render(render2, false, true);
      },
      syncRender: render2,
      setProps: function(newProps) {
        props = newProps;
        lifecycles.updatePropListeners(newProps);
        prevMotionValues = updateMotionValuesFromProps(element, scrapeMotionValuesFromProps3(props), prevMotionValues);
      },
      getProps: function() {
        return props;
      },
      getVariant: function(name) {
        var _a3;
        return (_a3 = props.variants) === null || _a3 === void 0 ? void 0 : _a3[name];
      },
      getDefaultTransition: function() {
        return props.transition;
      },
      getVariantContext: function(startAtParent) {
        if (startAtParent === void 0) {
          startAtParent = false;
        }
        if (startAtParent)
          return parent === null || parent === void 0 ? void 0 : parent.getVariantContext();
        if (!isControllingVariants) {
          var context_1 = (parent === null || parent === void 0 ? void 0 : parent.getVariantContext()) || {};
          if (props.initial !== void 0) {
            context_1.initial = props.initial;
          }
          return context_1;
        }
        var context = {};
        for (var i = 0; i < numVariantProps; i++) {
          var name_1 = variantProps[i];
          var prop = props[name_1];
          if (isVariantLabel(prop) || prop === false) {
            context[name_1] = prop;
          }
        }
        return context;
      },
      enableLayoutProjection: function() {
        projection.isEnabled = true;
        element.layoutTree.add(element);
      },
      lockProjectionTarget: function() {
        projection.isTargetLocked = true;
      },
      unlockProjectionTarget: function() {
        element.stopLayoutAnimation();
        projection.isTargetLocked = false;
      },
      getLayoutState: function() {
        return layoutState2;
      },
      setCrossfader: function(newCrossfader) {
        crossfader = newCrossfader;
      },
      isProjectionReady: function() {
        return projection.isEnabled && projection.isHydrated && layoutState2.isHydrated;
      },
      startLayoutAnimation: function(axis, transition, isRelative) {
        if (isRelative === void 0) {
          isRelative = false;
        }
        var progress2 = element.getProjectionAnimationProgress()[axis];
        var _a3 = isRelative ? projection.relativeTarget[axis] : projection.target[axis], min = _a3.min, max = _a3.max;
        var length2 = max - min;
        progress2.clearListeners();
        progress2.set(min);
        progress2.set(min);
        progress2.onChange(function(v) {
          element.setProjectionTargetAxis(axis, v, v + length2, isRelative);
        });
        return element.animateMotionValue(axis, progress2, 0, transition);
      },
      stopLayoutAnimation: function() {
        eachAxis(function(axis) {
          return element.getProjectionAnimationProgress()[axis].stop();
        });
      },
      measureViewportBox: function(withTransform) {
        if (withTransform === void 0) {
          withTransform = true;
        }
        var viewportBox = measureViewportBox(instance, options);
        if (!withTransform)
          removeBoxTransforms(viewportBox, latestValues);
        return viewportBox;
      },
      getProjectionAnimationProgress: function() {
        projectionTargetProgress || (projectionTargetProgress = {
          x: motionValue(0),
          y: motionValue(0)
        });
        return projectionTargetProgress;
      },
      setProjectionTargetAxis: function(axis, min, max, isRelative) {
        if (isRelative === void 0) {
          isRelative = false;
        }
        var target;
        if (isRelative) {
          if (!projection.relativeTarget) {
            projection.relativeTarget = axisBox();
          }
          target = projection.relativeTarget[axis];
        } else {
          projection.relativeTarget = void 0;
          target = projection.target[axis];
        }
        projection.isHydrated = true;
        target.min = min;
        target.max = max;
        hasViewportBoxUpdated = true;
        lifecycles.notifySetAxisTarget();
      },
      rebaseProjectionTarget: function(force, box) {
        if (box === void 0) {
          box = layoutState2.layout;
        }
        var _a3 = element.getProjectionAnimationProgress(), x = _a3.x, y = _a3.y;
        var shouldRebase = !projection.relativeTarget && !projection.isTargetLocked && !x.isAnimating() && !y.isAnimating();
        if (force || shouldRebase) {
          eachAxis(function(axis) {
            var _a4 = box[axis], min = _a4.min, max = _a4.max;
            element.setProjectionTargetAxis(axis, min, max);
          });
        }
      },
      notifyLayoutReady: function(config) {
        setCurrentViewportBox(element);
        element.notifyLayoutUpdate(layoutState2.layout, element.prevViewportBox || layoutState2.layout, config);
      },
      resetTransform: function() {
        return resetTransform(element, instance, props);
      },
      restoreTransform: function() {
        return restoreTransform(instance, renderState);
      },
      updateLayoutProjection,
      updateTreeLayoutProjection: function() {
        element.layoutTree.forEach(fireResolveRelativeTargetBox);
        es_default.preRender(updateTreeLayoutProjection, false, true);
      },
      getProjectionParent: function() {
        if (projectionParent === void 0) {
          var foundParent = false;
          for (var i = element.path.length - 1; i >= 0; i--) {
            var ancestor = element.path[i];
            if (ancestor.projection.isEnabled) {
              foundParent = ancestor;
              break;
            }
          }
          projectionParent = foundParent;
        }
        return projectionParent;
      },
      resolveRelativeTargetBox: function() {
        var relativeParent = element.getProjectionParent();
        if (!projection.relativeTarget || !relativeParent)
          return;
        calcRelativeBox(projection, relativeParent.projection);
        if (isDraggable(relativeParent)) {
          var target = projection.target;
          applyBoxTransforms(target, target, relativeParent.getLatestValues());
        }
      },
      shouldResetTransform: function() {
        return Boolean(props._layoutResetTransform);
      },
      pointTo: function(newLead) {
        leadProjection = newLead.projection;
        leadLatestValues = newLead.getLatestValues();
        unsubscribeFromLeadVisualElement === null || unsubscribeFromLeadVisualElement === void 0 ? void 0 : unsubscribeFromLeadVisualElement();
        unsubscribeFromLeadVisualElement = pipe(newLead.onSetAxisTarget(element.scheduleUpdateLayoutProjection), newLead.onLayoutAnimationComplete(function() {
          var _a3;
          if (element.isPresent) {
            element.presence = Presence.Present;
          } else {
            (_a3 = element.layoutSafeToRemove) === null || _a3 === void 0 ? void 0 : _a3.call(element);
          }
        }));
      },
      isPresent: true,
      presence: Presence.Entering
    });
    return element;
  };
};
function fireResolveRelativeTargetBox(child) {
  child.resolveRelativeTargetBox();
}
function fireUpdateLayoutProjection(child) {
  child.updateLayoutProjection();
}
var variantProps = __spreadArray(["initial"], __read(variantPriorityOrder));
var numVariantProps = variantProps.length;

// ../../node_modules/framer-motion/dist/es/render/dom/utils/unit-conversion.js
var positionalKeys = new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  "x",
  "y"
]);
var isPositionalKey = function(key) {
  return positionalKeys.has(key);
};
var hasPositionalKey = function(target) {
  return Object.keys(target).some(isPositionalKey);
};
var setAndResetVelocity = function(value, to) {
  value.set(to, false);
  value.set(to);
};
var isNumOrPxType = function(v) {
  return v === number || v === px;
};
var BoundingBoxDimension;
(function(BoundingBoxDimension2) {
  BoundingBoxDimension2["width"] = "width";
  BoundingBoxDimension2["height"] = "height";
  BoundingBoxDimension2["left"] = "left";
  BoundingBoxDimension2["right"] = "right";
  BoundingBoxDimension2["top"] = "top";
  BoundingBoxDimension2["bottom"] = "bottom";
})(BoundingBoxDimension || (BoundingBoxDimension = {}));
var getPosFromMatrix = function(matrix, pos) {
  return parseFloat(matrix.split(", ")[pos]);
};
var getTranslateFromMatrix = function(pos2, pos3) {
  return function(_bbox, _a) {
    var transform3 = _a.transform;
    if (transform3 === "none" || !transform3)
      return 0;
    var matrix3d = transform3.match(/^matrix3d\((.+)\)$/);
    if (matrix3d) {
      return getPosFromMatrix(matrix3d[1], pos3);
    } else {
      var matrix = transform3.match(/^matrix\((.+)\)$/);
      if (matrix) {
        return getPosFromMatrix(matrix[1], pos2);
      } else {
        return 0;
      }
    }
  };
};
var transformKeys = new Set(["x", "y", "z"]);
var nonTranslationalTransformKeys = transformProps.filter(function(key) {
  return !transformKeys.has(key);
});
function removeNonTranslationalTransform(visualElement2) {
  var removedTransforms = [];
  nonTranslationalTransformKeys.forEach(function(key) {
    var value = visualElement2.getValue(key);
    if (value !== void 0) {
      removedTransforms.push([key, value.get()]);
      value.set(key.startsWith("scale") ? 1 : 0);
    }
  });
  if (removedTransforms.length)
    visualElement2.syncRender();
  return removedTransforms;
}
var positionalValues = {
  width: function(_a) {
    var x = _a.x;
    return x.max - x.min;
  },
  height: function(_a) {
    var y = _a.y;
    return y.max - y.min;
  },
  top: function(_bbox, _a) {
    var top2 = _a.top;
    return parseFloat(top2);
  },
  left: function(_bbox, _a) {
    var left2 = _a.left;
    return parseFloat(left2);
  },
  bottom: function(_a, _b) {
    var y = _a.y;
    var top2 = _b.top;
    return parseFloat(top2) + (y.max - y.min);
  },
  right: function(_a, _b) {
    var x = _a.x;
    var left2 = _b.left;
    return parseFloat(left2) + (x.max - x.min);
  },
  x: getTranslateFromMatrix(4, 13),
  y: getTranslateFromMatrix(5, 14)
};
var convertChangedValueTypes = function(target, visualElement2, changedKeys) {
  var originBbox = visualElement2.measureViewportBox();
  var element = visualElement2.getInstance();
  var elementComputedStyle = getComputedStyle(element);
  var display = elementComputedStyle.display, top2 = elementComputedStyle.top, left2 = elementComputedStyle.left, bottom2 = elementComputedStyle.bottom, right2 = elementComputedStyle.right, transform3 = elementComputedStyle.transform;
  var originComputedStyle = {top: top2, left: left2, bottom: bottom2, right: right2, transform: transform3};
  if (display === "none") {
    visualElement2.setStaticValue("display", target.display || "block");
  }
  visualElement2.syncRender();
  var targetBbox = visualElement2.measureViewportBox();
  changedKeys.forEach(function(key) {
    var value = visualElement2.getValue(key);
    setAndResetVelocity(value, positionalValues[key](originBbox, originComputedStyle));
    target[key] = positionalValues[key](targetBbox, elementComputedStyle);
  });
  return target;
};
var checkAndConvertChangedValueTypes = function(visualElement2, target, origin, transitionEnd) {
  if (origin === void 0) {
    origin = {};
  }
  if (transitionEnd === void 0) {
    transitionEnd = {};
  }
  target = __assign({}, target);
  transitionEnd = __assign({}, transitionEnd);
  var targetPositionalKeys = Object.keys(target).filter(isPositionalKey);
  var removedTransformValues = [];
  var hasAttemptedToRemoveTransformValues = false;
  var changedValueTypeKeys = [];
  targetPositionalKeys.forEach(function(key) {
    var value = visualElement2.getValue(key);
    if (!visualElement2.hasValue(key))
      return;
    var from2 = origin[key];
    var to = target[key];
    var fromType = findDimensionValueType(from2);
    var toType;
    if (isKeyframesTarget(to)) {
      var numKeyframes = to.length;
      for (var i = to[0] === null ? 1 : 0; i < numKeyframes; i++) {
        if (!toType) {
          toType = findDimensionValueType(to[i]);
          invariant(toType === fromType || isNumOrPxType(fromType) && isNumOrPxType(toType), "Keyframes must be of the same dimension as the current value");
        } else {
          invariant(findDimensionValueType(to[i]) === toType, "All keyframes must be of the same type");
        }
      }
    } else {
      toType = findDimensionValueType(to);
    }
    if (fromType !== toType) {
      if (isNumOrPxType(fromType) && isNumOrPxType(toType)) {
        var current = value.get();
        if (typeof current === "string") {
          value.set(parseFloat(current));
        }
        if (typeof to === "string") {
          target[key] = parseFloat(to);
        } else if (Array.isArray(to) && toType === px) {
          target[key] = to.map(parseFloat);
        }
      } else if ((fromType === null || fromType === void 0 ? void 0 : fromType.transform) && (toType === null || toType === void 0 ? void 0 : toType.transform) && (from2 === 0 || to === 0)) {
        if (from2 === 0) {
          value.set(toType.transform(from2));
        } else {
          target[key] = fromType.transform(to);
        }
      } else {
        if (!hasAttemptedToRemoveTransformValues) {
          removedTransformValues = removeNonTranslationalTransform(visualElement2);
          hasAttemptedToRemoveTransformValues = true;
        }
        changedValueTypeKeys.push(key);
        transitionEnd[key] = transitionEnd[key] !== void 0 ? transitionEnd[key] : target[key];
        setAndResetVelocity(value, to);
      }
    }
  });
  if (changedValueTypeKeys.length) {
    var convertedTarget = convertChangedValueTypes(target, visualElement2, changedValueTypeKeys);
    if (removedTransformValues.length) {
      removedTransformValues.forEach(function(_a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        visualElement2.getValue(key).set(value);
      });
    }
    visualElement2.syncRender();
    return {target: convertedTarget, transitionEnd};
  } else {
    return {target, transitionEnd};
  }
};
function unitConversion(visualElement2, target, origin, transitionEnd) {
  return hasPositionalKey(target) ? checkAndConvertChangedValueTypes(visualElement2, target, origin, transitionEnd) : {target, transitionEnd};
}

// ../../node_modules/framer-motion/dist/es/render/dom/utils/parse-dom-variant.js
var parseDomVariant = function(visualElement2, target, origin, transitionEnd) {
  var resolved = resolveCSSVariables(visualElement2, target, transitionEnd);
  target = resolved.target;
  transitionEnd = resolved.transitionEnd;
  return unitConversion(visualElement2, target, origin, transitionEnd);
};

// ../../node_modules/framer-motion/dist/es/render/html/visual-element.js
function getComputedStyle2(element) {
  return window.getComputedStyle(element);
}
var htmlConfig = {
  treeType: "dom",
  readValueFromInstance: function(domElement, key) {
    if (isTransformProp(key)) {
      var defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    } else {
      var computedStyle = getComputedStyle2(domElement);
      return (isCSSVariable(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
    }
  },
  sortNodePosition: function(a2, b2) {
    return a2.compareDocumentPosition(b2) & 2 ? 1 : -1;
  },
  getBaseTarget: function(props, key) {
    var _a;
    return (_a = props.style) === null || _a === void 0 ? void 0 : _a[key];
  },
  measureViewportBox: function(element, _a) {
    var transformPagePoint = _a.transformPagePoint;
    return getBoundingBox(element, transformPagePoint);
  },
  resetTransform: function(element, domElement, props) {
    var transformTemplate = props.transformTemplate;
    domElement.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
    element.scheduleRender();
  },
  restoreTransform: function(instance, mutableState) {
    instance.style.transform = mutableState.style.transform;
  },
  removeValueFromRenderState: function(key, _a) {
    var vars = _a.vars, style3 = _a.style;
    delete vars[key];
    delete style3[key];
  },
  makeTargetAnimatable: function(element, _a, _b, isMounted) {
    var transformValues = _b.transformValues;
    if (isMounted === void 0) {
      isMounted = true;
    }
    var transition = _a.transition, transitionEnd = _a.transitionEnd, target = __rest(_a, ["transition", "transitionEnd"]);
    var origin = getOrigin(target, transition || {}, element);
    if (transformValues) {
      if (transitionEnd)
        transitionEnd = transformValues(transitionEnd);
      if (target)
        target = transformValues(target);
      if (origin)
        origin = transformValues(origin);
    }
    if (isMounted) {
      checkTargetForNewValues(element, target, origin);
      var parsed = parseDomVariant(element, target, origin, transitionEnd);
      transitionEnd = parsed.transitionEnd;
      target = parsed.target;
    }
    return __assign({
      transition,
      transitionEnd
    }, target);
  },
  scrapeMotionValuesFromProps,
  build: function(element, renderState, latestValues, projection, layoutState2, options, props) {
    if (element.isVisible !== void 0) {
      renderState.style.visibility = element.isVisible ? "visible" : "hidden";
    }
    var isProjectionTranform = projection.isEnabled && layoutState2.isHydrated;
    buildHTMLStyles(renderState, latestValues, projection, layoutState2, options, props.transformTemplate, isProjectionTranform ? buildLayoutProjectionTransform : void 0, isProjectionTranform ? buildLayoutProjectionTransformOrigin : void 0);
  },
  render: renderHTML
};
var htmlVisualElement = visualElement(htmlConfig);

// ../../node_modules/framer-motion/dist/es/render/svg/visual-element.js
var svgVisualElement = visualElement(__assign(__assign({}, htmlConfig), {
  getBaseTarget: function(props, key) {
    return props[key];
  },
  readValueFromInstance: function(domElement, key) {
    var _a;
    if (isTransformProp(key)) {
      return ((_a = getDefaultValueType(key)) === null || _a === void 0 ? void 0 : _a.default) || 0;
    }
    key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
    return domElement.getAttribute(key);
  },
  scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2,
  build: function(_element, renderState, latestValues, projection, layoutState2, options, props) {
    var isProjectionTranform = projection.isEnabled && layoutState2.isHydrated;
    buildSVGAttrs(renderState, latestValues, projection, layoutState2, options, props.transformTemplate, isProjectionTranform ? buildLayoutProjectionTransform : void 0, isProjectionTranform ? buildLayoutProjectionTransformOrigin : void 0);
  },
  render: renderSVG
}));

// ../../node_modules/framer-motion/dist/es/render/dom/create-visual-element.js
var createDomVisualElement = function(Component3, options) {
  return isSVGComponent(Component3) ? svgVisualElement(options, {enableHardwareAcceleration: false}) : htmlVisualElement(options, {enableHardwareAcceleration: true});
};

// ../../node_modules/framer-motion/dist/es/render/dom/motion.js
var featureBundle = __assign(__assign(__assign(__assign({}, animations), gestureAnimations), drag), layoutAnimations);
var motion = /* @__PURE__ */ createMotionProxy(function(Component3, config) {
  return createDomMotionConfig(Component3, config, featureBundle, createDomVisualElement);
});
function createDomMotionComponent(key) {
  return createMotionComponent(createDomMotionConfig(key, {forwardMotionProps: false}, featureBundle, createDomVisualElement));
}

// ../../node_modules/framer-motion/dist/es/render/dom/motion-minimal.js
var m = createMotionProxy(createDomMotionConfig);

// ../../node_modules/framer-motion/dist/es/components/AnimatePresence/index.js
var React5 = __toModule(require_react());
var import_react28 = __toModule(require_react());

// ../../node_modules/framer-motion/dist/es/utils/use-force-update.js
var import_react26 = __toModule(require_react());
function useForceUpdate() {
  var unloadingRef = (0, import_react26.useRef)(false);
  var _a = __read((0, import_react26.useState)(0), 2), forcedRenderCount = _a[0], setForcedRenderCount = _a[1];
  useUnmountEffect(function() {
    return unloadingRef.current = true;
  });
  return (0, import_react26.useCallback)(function() {
    !unloadingRef.current && setForcedRenderCount(forcedRenderCount + 1);
  }, [forcedRenderCount]);
}

// ../../node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.js
var React4 = __toModule(require_react());
var import_react27 = __toModule(require_react());
var presenceId = 0;
function getPresenceId() {
  var id = presenceId;
  presenceId++;
  return id;
}
var PresenceChild = function(_a) {
  var children = _a.children, initial = _a.initial, isPresent2 = _a.isPresent, onExitComplete = _a.onExitComplete, custom = _a.custom, presenceAffectsLayout = _a.presenceAffectsLayout;
  var presenceChildren = useConstant(newChildrenMap);
  var id = useConstant(getPresenceId);
  var context = (0, import_react27.useMemo)(function() {
    return {
      id,
      initial,
      isPresent: isPresent2,
      custom,
      onExitComplete: function(childId) {
        presenceChildren.set(childId, true);
        var allComplete = true;
        presenceChildren.forEach(function(isComplete) {
          if (!isComplete)
            allComplete = false;
        });
        allComplete && (onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete());
      },
      register: function(childId) {
        presenceChildren.set(childId, false);
        return function() {
          return presenceChildren.delete(childId);
        };
      }
    };
  }, presenceAffectsLayout ? void 0 : [isPresent2]);
  (0, import_react27.useMemo)(function() {
    presenceChildren.forEach(function(_2, key) {
      return presenceChildren.set(key, false);
    });
  }, [isPresent2]);
  React4.useEffect(function() {
    !isPresent2 && !presenceChildren.size && (onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete());
  }, [isPresent2]);
  return React4.createElement(PresenceContext.Provider, {value: context}, children);
};
function newChildrenMap() {
  return new Map();
}

// ../../node_modules/framer-motion/dist/es/components/AnimatePresence/index.js
function getChildKey(child) {
  return child.key || "";
}
function updateChildLookup(children, allChildren) {
  var seenChildren = false ? new Set() : null;
  children.forEach(function(child) {
    var key = getChildKey(child);
    if (false) {
      if (seenChildren.has(key)) {
        console.warn('Children of AnimatePresence require unique keys. "' + key + '" is a duplicate.');
      }
      seenChildren.add(key);
    }
    allChildren.set(key, child);
  });
}
function onlyElements(children) {
  var filtered = [];
  import_react28.Children.forEach(children, function(child) {
    if ((0, import_react28.isValidElement)(child))
      filtered.push(child);
  });
  return filtered;
}
var AnimatePresence = function(_a) {
  var children = _a.children, custom = _a.custom, _b = _a.initial, initial = _b === void 0 ? true : _b, onExitComplete = _a.onExitComplete, exitBeforeEnter = _a.exitBeforeEnter, _c = _a.presenceAffectsLayout, presenceAffectsLayout = _c === void 0 ? true : _c;
  var forceRender = useForceUpdate();
  var layoutContext = (0, import_react28.useContext)(SharedLayoutContext);
  if (isSharedLayout(layoutContext)) {
    forceRender = layoutContext.forceUpdate;
  }
  var isInitialRender = (0, import_react28.useRef)(true);
  var filteredChildren = onlyElements(children);
  var presentChildren = (0, import_react28.useRef)(filteredChildren);
  var allChildren = (0, import_react28.useRef)(new Map()).current;
  var exiting = (0, import_react28.useRef)(new Set()).current;
  updateChildLookup(filteredChildren, allChildren);
  if (isInitialRender.current) {
    isInitialRender.current = false;
    return React5.createElement(React5.Fragment, null, filteredChildren.map(function(child) {
      return React5.createElement(PresenceChild, {key: getChildKey(child), isPresent: true, initial: initial ? void 0 : false, presenceAffectsLayout}, child);
    }));
  }
  var childrenToRender = __spreadArray([], __read(filteredChildren));
  var presentKeys = presentChildren.current.map(getChildKey);
  var targetKeys = filteredChildren.map(getChildKey);
  var numPresent = presentKeys.length;
  for (var i = 0; i < numPresent; i++) {
    var key = presentKeys[i];
    if (targetKeys.indexOf(key) === -1) {
      exiting.add(key);
    } else {
      exiting.delete(key);
    }
  }
  if (exitBeforeEnter && exiting.size) {
    childrenToRender = [];
  }
  exiting.forEach(function(key2) {
    if (targetKeys.indexOf(key2) !== -1)
      return;
    var child = allChildren.get(key2);
    if (!child)
      return;
    var insertionIndex = presentKeys.indexOf(key2);
    var onExit = function() {
      allChildren.delete(key2);
      exiting.delete(key2);
      var removeIndex = presentChildren.current.findIndex(function(presentChild) {
        return presentChild.key === key2;
      });
      presentChildren.current.splice(removeIndex, 1);
      if (!exiting.size) {
        presentChildren.current = filteredChildren;
        forceRender();
        onExitComplete && onExitComplete();
      }
    };
    childrenToRender.splice(insertionIndex, 0, React5.createElement(PresenceChild, {key: getChildKey(child), isPresent: false, onExitComplete: onExit, custom, presenceAffectsLayout}, child));
  });
  childrenToRender = childrenToRender.map(function(child) {
    var key2 = child.key;
    return exiting.has(key2) ? child : React5.createElement(PresenceChild, {key: getChildKey(child), isPresent: true, presenceAffectsLayout}, child);
  });
  presentChildren.current = childrenToRender;
  if (false) {
    console.warn("You're attempting to animate multiple children within AnimatePresence, but its exitBeforeEnter prop is set to true. This will lead to odd visual behaviour.");
  }
  return React5.createElement(React5.Fragment, null, exiting.size ? childrenToRender : childrenToRender.map(function(child) {
    return (0, import_react28.cloneElement)(child);
  }));
};

// ../../node_modules/framer-motion/dist/es/components/AnimateSharedLayout/index.js
var React6 = __toModule(require_react());

// ../../node_modules/framer-motion/dist/es/animation/animate.js
function animate2(from2, to, transition) {
  if (transition === void 0) {
    transition = {};
  }
  var value = isMotionValue(from2) ? from2 : motionValue(from2);
  startAnimation("", value, to, transition);
  return {
    stop: function() {
      return value.stop();
    }
  };
}

// ../../node_modules/framer-motion/dist/es/components/AnimateSharedLayout/utils/crossfader.js
function createCrossfader() {
  var progress2 = motionValue(1);
  var options = {
    lead: void 0,
    follow: void 0,
    crossfadeOpacity: false,
    preserveFollowOpacity: false
  };
  var prevOptions = __assign({}, options);
  var leadState = {};
  var followState = {};
  var isActive = false;
  var finalCrossfadeFrame = null;
  var prevUpdate = 0;
  function startCrossfadeAnimation(target, transition) {
    var lead = options.lead, follow = options.follow;
    isActive = true;
    finalCrossfadeFrame = null;
    var hasUpdated = false;
    var onUpdate = function() {
      hasUpdated = true;
      lead && lead.scheduleRender();
      follow && follow.scheduleRender();
    };
    var onComplete = function() {
      isActive = false;
      finalCrossfadeFrame = getFrameData().timestamp;
    };
    transition = transition && getValueTransition(transition, "crossfade");
    return animate2(progress2, target, __assign(__assign({}, transition), {onUpdate, onComplete: function() {
      if (!hasUpdated) {
        progress2.set(target);
        es_default.read(onComplete);
      } else {
        onComplete();
      }
      onUpdate();
    }}));
  }
  function updateCrossfade() {
    var _a, _b;
    var timestamp = getFrameData().timestamp;
    var lead = options.lead, follow = options.follow;
    if (timestamp === prevUpdate || !lead)
      return;
    prevUpdate = timestamp;
    var latestLeadValues = lead.getLatestValues();
    Object.assign(leadState, latestLeadValues);
    var latestFollowValues = follow ? follow.getLatestValues() : options.prevValues;
    Object.assign(followState, latestFollowValues);
    var p = progress2.get();
    var leadTargetOpacity = (_a = latestLeadValues.opacity) !== null && _a !== void 0 ? _a : 1;
    var followTargetOpacity = (_b = latestFollowValues === null || latestFollowValues === void 0 ? void 0 : latestFollowValues.opacity) !== null && _b !== void 0 ? _b : 1;
    if (options.crossfadeOpacity && follow) {
      leadState.opacity = mix(follow.isVisible !== false ? 0 : followTargetOpacity, leadTargetOpacity, easeCrossfadeIn(p));
      followState.opacity = options.preserveFollowOpacity ? followTargetOpacity : mix(followTargetOpacity, 0, easeCrossfadeOut(p));
    } else if (!follow) {
      leadState.opacity = mix(followTargetOpacity, leadTargetOpacity, p);
    }
    mixValues(leadState, followState, latestLeadValues, latestFollowValues || {}, Boolean(follow), p);
  }
  return {
    isActive: function() {
      return leadState && (isActive || getFrameData().timestamp === finalCrossfadeFrame);
    },
    fromLead: function(transition) {
      return startCrossfadeAnimation(0, transition);
    },
    toLead: function(transition) {
      var initialProgress = 0;
      if (!options.prevValues && !options.follow) {
        initialProgress = 1;
      } else if (prevOptions.lead === options.follow && prevOptions.follow === options.lead) {
        initialProgress = 1 - progress2.get();
      }
      progress2.set(initialProgress);
      return startCrossfadeAnimation(1, transition);
    },
    reset: function() {
      return progress2.set(1);
    },
    stop: function() {
      return progress2.stop();
    },
    getCrossfadeState: function(element) {
      updateCrossfade();
      if (element === options.lead) {
        return leadState;
      } else if (element === options.follow) {
        return followState;
      }
    },
    setOptions: function(newOptions) {
      prevOptions = options;
      options = newOptions;
      leadState = {};
      followState = {};
    },
    getLatestValues: function() {
      return leadState;
    }
  };
}
var easeCrossfadeIn = compress(0, 0.5, circOut);
var easeCrossfadeOut = compress(0.5, 0.95, linear);
function compress(min, max, easing2) {
  return function(p) {
    if (p < min)
      return 0;
    if (p > max)
      return 1;
    return easing2(progress(min, max, p));
  };
}
var borders = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
var numBorders = borders.length;
function mixValues(leadState, followState, latestLeadValues, latestFollowValues, hasFollowElement, p) {
  for (var i = 0; i < numBorders; i++) {
    var borderLabel = "border" + borders[i] + "Radius";
    var followRadius = getRadius(latestFollowValues, borderLabel);
    var leadRadius = getRadius(latestLeadValues, borderLabel);
    if (followRadius === void 0 && leadRadius === void 0)
      continue;
    followRadius || (followRadius = 0);
    leadRadius || (leadRadius = 0);
    if (typeof followRadius === "number" && typeof leadRadius === "number") {
      var radius = Math.max(mix(followRadius, leadRadius, p), 0);
      leadState[borderLabel] = followState[borderLabel] = radius;
    }
  }
  if (latestFollowValues.rotate || latestLeadValues.rotate) {
    var rotate = mix(latestFollowValues.rotate || 0, latestLeadValues.rotate || 0, p);
    leadState.rotate = followState.rotate = rotate;
  }
  if (!hasFollowElement && latestLeadValues.backgroundColor && latestFollowValues.backgroundColor) {
    leadState.backgroundColor = followState.backgroundColor = mixColor(latestFollowValues.backgroundColor, latestLeadValues.backgroundColor)(p);
  }
}
function getRadius(values3, radiusName) {
  var _a;
  return (_a = values3[radiusName]) !== null && _a !== void 0 ? _a : values3.borderRadius;
}

// ../../node_modules/framer-motion/dist/es/components/AnimateSharedLayout/utils/stack.js
function layoutStack() {
  var stack = new Set();
  var state = {leadIsExiting: false};
  var prevState = __assign({}, state);
  var prevValues;
  var prevViewportBox;
  var prevDragCursor;
  var crossfader = createCrossfader();
  var needsCrossfadeAnimation = false;
  function getFollowViewportBox() {
    return state.follow ? state.follow.prevViewportBox : prevViewportBox;
  }
  function getFollowLayout() {
    var _a;
    return (_a = state.follow) === null || _a === void 0 ? void 0 : _a.getLayoutState().layout;
  }
  return {
    add: function(element) {
      element.setCrossfader(crossfader);
      stack.add(element);
      if (prevDragCursor)
        element.prevDragCursor = prevDragCursor;
      if (!state.lead)
        state.lead = element;
    },
    remove: function(element) {
      stack.delete(element);
    },
    getLead: function() {
      return state.lead;
    },
    updateSnapshot: function() {
      if (!state.lead)
        return;
      prevValues = crossfader.isActive() ? crossfader.getLatestValues() : state.lead.getLatestValues();
      prevViewportBox = state.lead.prevViewportBox;
      var dragControls = elementDragControls.get(state.lead);
      if (dragControls && dragControls.isDragging) {
        prevDragCursor = dragControls.cursorProgress;
      }
    },
    clearSnapshot: function() {
      prevDragCursor = prevViewportBox = void 0;
    },
    updateLeadAndFollow: function() {
      var _a;
      prevState = __assign({}, state);
      var lead;
      var follow;
      var order3 = Array.from(stack);
      for (var i = order3.length; i--; i >= 0) {
        var element = order3[i];
        if (lead)
          follow !== null && follow !== void 0 ? follow : follow = element;
        lead !== null && lead !== void 0 ? lead : lead = element;
        if (lead && follow)
          break;
      }
      state.lead = lead;
      state.follow = follow;
      state.leadIsExiting = ((_a = state.lead) === null || _a === void 0 ? void 0 : _a.presence) === Presence.Exiting;
      crossfader.setOptions({
        lead,
        follow,
        prevValues,
        crossfadeOpacity: (follow === null || follow === void 0 ? void 0 : follow.isPresenceRoot) || (lead === null || lead === void 0 ? void 0 : lead.isPresenceRoot)
      });
      if (state.lead !== prevState.follow && (prevState.lead !== state.lead || prevState.leadIsExiting !== state.leadIsExiting)) {
        needsCrossfadeAnimation = true;
      }
    },
    animate: function(child, shouldCrossfade) {
      var _a;
      if (shouldCrossfade === void 0) {
        shouldCrossfade = false;
      }
      if (child === state.lead) {
        if (shouldCrossfade) {
          child.pointTo(state.lead);
        } else {
          child.setVisibility(true);
        }
        var config = {};
        var prevParent = (_a = state.follow) === null || _a === void 0 ? void 0 : _a.getProjectionParent();
        if (prevParent) {
          config.prevParent = prevParent;
        }
        if (child.presence === Presence.Entering) {
          config.originBox = getFollowViewportBox();
        } else if (child.presence === Presence.Exiting) {
          config.targetBox = getFollowLayout();
        }
        if (needsCrossfadeAnimation) {
          needsCrossfadeAnimation = false;
          var transition = child.getDefaultTransition();
          child.presence === Presence.Entering ? crossfader.toLead(transition) : crossfader.fromLead(transition);
        }
        child.notifyLayoutReady(config);
      } else {
        if (shouldCrossfade) {
          state.lead && child.pointTo(state.lead);
        } else {
          child.setVisibility(false);
        }
      }
    }
  };
}

// ../../node_modules/framer-motion/dist/es/components/AnimateSharedLayout/utils/rotate.js
function resetRotate(child) {
  var hasRotate = false;
  var resetValues = {};
  for (var i = 0; i < transformAxes.length; i++) {
    var axis = transformAxes[i];
    var key = "rotate" + axis;
    if (!child.hasValue(key) || child.getStaticValue(key) === 0)
      continue;
    hasRotate = true;
    resetValues[key] = child.getStaticValue(key);
    child.setStaticValue(key, 0);
  }
  if (!hasRotate)
    return;
  child.syncRender();
  for (var key in resetValues) {
    child.setStaticValue(key, resetValues[key]);
  }
  child.scheduleRender();
}

// ../../node_modules/framer-motion/dist/es/components/AnimateSharedLayout/index.js
var AnimateSharedLayout = function(_super) {
  __extends(AnimateSharedLayout2, _super);
  function AnimateSharedLayout2() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.children = new Set();
    _this.stacks = new Map();
    _this.hasMounted = false;
    _this.updateScheduled = false;
    _this.renderScheduled = false;
    _this.syncContext = __assign(__assign({}, createBatcher()), {syncUpdate: function(force) {
      return _this.scheduleUpdate(force);
    }, forceUpdate: function() {
      _this.syncContext = __assign({}, _this.syncContext);
      _this.scheduleUpdate(true);
    }, register: function(child) {
      return _this.addChild(child);
    }, remove: function(child) {
      return _this.removeChild(child);
    }});
    return _this;
  }
  AnimateSharedLayout2.prototype.componentDidMount = function() {
    this.hasMounted = true;
  };
  AnimateSharedLayout2.prototype.componentDidUpdate = function() {
    this.startLayoutAnimation();
  };
  AnimateSharedLayout2.prototype.shouldComponentUpdate = function() {
    this.renderScheduled = true;
    return true;
  };
  AnimateSharedLayout2.prototype.startLayoutAnimation = function() {
    var _this = this;
    this.renderScheduled = this.updateScheduled = false;
    var type = this.props.type;
    this.children.forEach(function(child) {
      if (!child.isPresent) {
        child.presence = Presence.Exiting;
      } else if (child.presence !== Presence.Entering) {
        child.presence = child.presence === Presence.Exiting ? Presence.Entering : Presence.Present;
      }
    });
    this.updateStacks();
    var handler = {
      layoutReady: function(child) {
        if (child.getLayoutId() !== void 0) {
          var stack = _this.getStack(child);
          stack.animate(child, type === "crossfade");
        } else {
          child.notifyLayoutReady();
        }
      },
      parent: this.context.visualElement
    };
    this.children.forEach(function(child) {
      return _this.syncContext.add(child);
    });
    this.syncContext.flush(handler);
    this.stacks.forEach(function(stack) {
      return stack.clearSnapshot();
    });
  };
  AnimateSharedLayout2.prototype.updateStacks = function() {
    this.stacks.forEach(function(stack) {
      return stack.updateLeadAndFollow();
    });
  };
  AnimateSharedLayout2.prototype.scheduleUpdate = function(force) {
    if (force === void 0) {
      force = false;
    }
    if (!(force || !this.updateScheduled))
      return;
    this.updateScheduled = true;
    this.children.forEach(function(child) {
      resetRotate(child);
      if (child.shouldResetTransform())
        child.resetTransform();
    });
    this.children.forEach(snapshotViewportBox);
    this.stacks.forEach(function(stack) {
      return stack.updateSnapshot();
    });
    if (force || !this.renderScheduled) {
      this.renderScheduled = true;
      this.forceUpdate();
    }
  };
  AnimateSharedLayout2.prototype.addChild = function(child) {
    this.children.add(child);
    this.addToStack(child);
    child.presence = this.hasMounted ? Presence.Entering : Presence.Present;
  };
  AnimateSharedLayout2.prototype.removeChild = function(child) {
    this.scheduleUpdate();
    this.children.delete(child);
    this.removeFromStack(child);
  };
  AnimateSharedLayout2.prototype.addToStack = function(child) {
    var stack = this.getStack(child);
    stack === null || stack === void 0 ? void 0 : stack.add(child);
  };
  AnimateSharedLayout2.prototype.removeFromStack = function(child) {
    var stack = this.getStack(child);
    stack === null || stack === void 0 ? void 0 : stack.remove(child);
  };
  AnimateSharedLayout2.prototype.getStack = function(child) {
    var id = child.getLayoutId();
    if (id === void 0)
      return;
    !this.stacks.has(id) && this.stacks.set(id, layoutStack());
    return this.stacks.get(id);
  };
  AnimateSharedLayout2.prototype.render = function() {
    return React6.createElement(SharedLayoutContext.Provider, {value: this.syncContext}, this.props.children);
  };
  AnimateSharedLayout2.contextType = MotionContext;
  return AnimateSharedLayout2;
}(React6.Component);

// ../../node_modules/framer-motion/dist/es/components/MotionConfig/index.js
var React7 = __toModule(require_react());
var import_react29 = __toModule(require_react());
function MotionConfig(_a) {
  var children = _a.children, config = __rest(_a, ["children"]);
  config = __assign(__assign({}, (0, import_react29.useContext)(MotionConfigContext)), config);
  config.isStatic = useConstant(function() {
    return config.isStatic;
  });
  var transitionDependency = typeof config.transition === "object" ? config.transition.toString() : "";
  var context = (0, import_react29.useMemo)(function() {
    return config;
  }, [
    transitionDependency,
    config.transformPagePoint
  ]);
  return React7.createElement(MotionConfigContext.Provider, {value: context}, children);
}

// ../../node_modules/framer-motion/dist/es/components/LazyMotion/index.js
var React8 = __toModule(require_react());
var import_react30 = __toModule(require_react());
function LazyMotion(_a) {
  var children = _a.children, features = _a.features, _b = _a.strict, strict = _b === void 0 ? false : _b;
  var _c = __read((0, import_react30.useState)(!isLazyBundle(features)), 2), setIsLoaded = _c[1];
  var loadedRenderer = (0, import_react30.useRef)(void 0);
  if (!isLazyBundle(features)) {
    var renderer = features.renderer, loadedFeatures = __rest(features, ["renderer"]);
    loadedRenderer.current = renderer;
    loadFeatures(loadedFeatures);
  }
  (0, import_react30.useEffect)(function() {
    if (isLazyBundle(features)) {
      features().then(function(_a2) {
        var renderer2 = _a2.renderer, loadedFeatures2 = __rest(_a2, ["renderer"]);
        loadFeatures(loadedFeatures2);
        loadedRenderer.current = renderer2;
        setIsLoaded(true);
      });
    }
  }, []);
  return React8.createElement(LazyContext.Provider, {value: {renderer: loadedRenderer.current, strict}}, children);
}
function isLazyBundle(features) {
  return typeof features === "function";
}

// ../../node_modules/framer-motion/dist/es/render/dom/features-animation.js
var domAnimation = __assign(__assign({renderer: createDomVisualElement}, animations), gestureAnimations);

// ../../node_modules/framer-motion/dist/es/render/dom/features-max.js
var domMax = __assign(__assign(__assign({}, domAnimation), drag), layoutAnimations);

// ../../node_modules/framer-motion/dist/es/value/use-motion-value.js
var import_react31 = __toModule(require_react());
function useMotionValue(initial) {
  var value = useConstant(function() {
    return motionValue(initial);
  });
  var isStatic = (0, import_react31.useContext)(MotionConfigContext).isStatic;
  if (isStatic) {
    var _a = __read((0, import_react31.useState)(initial), 2), setLatest_1 = _a[1];
    (0, import_react31.useEffect)(function() {
      return value.onChange(setLatest_1);
    }, []);
  }
  return value;
}

// ../../node_modules/framer-motion/dist/es/value/use-on-change.js
var import_react32 = __toModule(require_react());
function useOnChange(value, callback) {
  (0, import_react32.useEffect)(function() {
    if (isMotionValue(value))
      return value.onChange(callback);
  }, [callback]);
}
function useMultiOnChange(values3, handler) {
  (0, import_react32.useEffect)(function() {
    var subscriptions = values3.map(function(value) {
      return value.onChange(handler);
    });
    return function() {
      return subscriptions.forEach(function(unsubscribe) {
        return unsubscribe();
      });
    };
  });
}

// ../../node_modules/framer-motion/dist/es/value/use-combine-values.js
function useCombineMotionValues(values3, combineValues) {
  var value = useMotionValue(combineValues());
  var updateValue = function() {
    return value.set(combineValues());
  };
  updateValue();
  useMultiOnChange(values3, function() {
    return es_default.update(updateValue, false, true);
  });
  return value;
}

// ../../node_modules/framer-motion/dist/es/value/use-motion-template.js
function useMotionTemplate(fragments) {
  var values3 = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    values3[_i - 1] = arguments[_i];
  }
  var numFragments = fragments.length;
  function buildValue() {
    var output = "";
    for (var i = 0; i < numFragments; i++) {
      output += fragments[i];
      var value = values3[i];
      if (value)
        output += values3[i].get();
    }
    return output;
  }
  return useCombineMotionValues(values3, buildValue);
}

// ../../node_modules/framer-motion/dist/es/utils/transform.js
var isCustomValueType = function(v) {
  return typeof v === "object" && v.mix;
};
var getMixer2 = function(v) {
  return isCustomValueType(v) ? v.mix : void 0;
};
function transform() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var useImmediate = !Array.isArray(args[0]);
  var argOffset = useImmediate ? 0 : -1;
  var inputValue = args[0 + argOffset];
  var inputRange = args[1 + argOffset];
  var outputRange = args[2 + argOffset];
  var options = args[3 + argOffset];
  var interpolator = interpolate(inputRange, outputRange, __assign({mixer: getMixer2(outputRange[0])}, options));
  return useImmediate ? interpolator(inputValue) : interpolator;
}

// ../../node_modules/framer-motion/dist/es/value/use-transform.js
function useTransform(input, inputRangeOrTransformer, outputRange, options) {
  var transformer = typeof inputRangeOrTransformer === "function" ? inputRangeOrTransformer : transform(inputRangeOrTransformer, outputRange, options);
  return Array.isArray(input) ? useListTransform(input, transformer) : useListTransform([input], function(_a) {
    var _b = __read(_a, 1), latest = _b[0];
    return transformer(latest);
  });
}
function useListTransform(values3, transformer) {
  var latest = useConstant(function() {
    return [];
  });
  return useCombineMotionValues(values3, function() {
    latest.length = 0;
    var numValues = values3.length;
    for (var i = 0; i < numValues; i++) {
      latest[i] = values3[i].get();
    }
    return transformer(latest);
  });
}

// ../../node_modules/framer-motion/dist/es/value/use-spring.js
var import_react33 = __toModule(require_react());
function useSpring(source, config) {
  if (config === void 0) {
    config = {};
  }
  var isStatic = (0, import_react33.useContext)(MotionConfigContext).isStatic;
  var activeSpringAnimation = (0, import_react33.useRef)(null);
  var value = useMotionValue(isMotionValue(source) ? source.get() : source);
  (0, import_react33.useMemo)(function() {
    return value.attach(function(v, set) {
      if (isStatic)
        return set(v);
      if (activeSpringAnimation.current) {
        activeSpringAnimation.current.stop();
      }
      activeSpringAnimation.current = animate(__assign(__assign({from: value.get(), to: v, velocity: value.getVelocity()}, config), {onUpdate: set}));
      return value.get();
    });
  }, Object.values(config));
  useOnChange(source, function(v) {
    return value.set(parseFloat(v));
  });
  return value;
}

// ../../node_modules/framer-motion/dist/es/value/use-velocity.js
var import_react34 = __toModule(require_react());
function useVelocity(value) {
  var velocity = useMotionValue(value.getVelocity());
  (0, import_react34.useEffect)(function() {
    return value.velocityUpdateSubscribers.add(function(newVelocity) {
      velocity.set(newVelocity);
    });
  }, [value]);
  return velocity;
}

// ../../node_modules/framer-motion/dist/es/value/scroll/utils.js
function createScrollMotionValues() {
  return {
    scrollX: motionValue(0),
    scrollY: motionValue(0),
    scrollXProgress: motionValue(0),
    scrollYProgress: motionValue(0)
  };
}
function setProgress(offset, maxOffset, value) {
  value.set(!offset || !maxOffset ? 0 : offset / maxOffset);
}
function createScrollUpdater(values3, getOffsets) {
  var update = function() {
    var _a = getOffsets(), xOffset = _a.xOffset, yOffset = _a.yOffset, xMaxOffset = _a.xMaxOffset, yMaxOffset = _a.yMaxOffset;
    values3.scrollX.set(xOffset);
    values3.scrollY.set(yOffset);
    setProgress(xOffset, xMaxOffset, values3.scrollXProgress);
    setProgress(yOffset, yMaxOffset, values3.scrollYProgress);
  };
  update();
  return update;
}

// ../../node_modules/framer-motion/dist/es/value/scroll/use-element-scroll.js
var getElementScrollOffsets = function(element) {
  return function() {
    return {
      xOffset: element.scrollLeft,
      yOffset: element.scrollTop,
      xMaxOffset: element.scrollWidth - element.offsetWidth,
      yMaxOffset: element.scrollHeight - element.offsetHeight
    };
  };
};
function useElementScroll(ref) {
  var values3 = useConstant(createScrollMotionValues);
  useIsomorphicLayoutEffect(function() {
    var element = ref.current;
    invariant(!!element, "ref provided to useScroll must be passed into a HTML element.");
    if (!element)
      return;
    var updateScrollValues = createScrollUpdater(values3, getElementScrollOffsets(element));
    var scrollListener = addDomEvent(element, "scroll", updateScrollValues, {passive: true});
    var resizeListener = addDomEvent(element, "resize", updateScrollValues);
    return function() {
      scrollListener && scrollListener();
      resizeListener && resizeListener();
    };
  }, []);
  return values3;
}

// ../../node_modules/framer-motion/dist/es/value/scroll/use-viewport-scroll.js
var viewportScrollValues;
function getViewportScrollOffsets() {
  return {
    xOffset: window.pageXOffset,
    yOffset: window.pageYOffset,
    xMaxOffset: document.body.clientWidth - window.innerWidth,
    yMaxOffset: document.body.clientHeight - window.innerHeight
  };
}
var hasListeners = false;
function addEventListeners() {
  hasListeners = true;
  if (typeof window === "undefined")
    return;
  var updateScrollValues = createScrollUpdater(viewportScrollValues, getViewportScrollOffsets);
  addDomEvent(window, "scroll", updateScrollValues, {passive: true});
  addDomEvent(window, "resize", updateScrollValues);
}
function useViewportScroll() {
  if (!viewportScrollValues) {
    viewportScrollValues = createScrollMotionValues();
  }
  useIsomorphicLayoutEffect(function() {
    !hasListeners && addEventListeners();
  }, []);
  return viewportScrollValues;
}

// ../../node_modules/framer-motion/dist/es/utils/use-reduced-motion.js
var import_react35 = __toModule(require_react());
var prefersReducedMotion;
function initPrefersReducedMotion() {
  prefersReducedMotion = motionValue(null);
  if (typeof window === "undefined")
    return;
  if (window.matchMedia) {
    var motionMediaQuery_1 = window.matchMedia("(prefers-reduced-motion)");
    var setReducedMotionPreferences = function() {
      return prefersReducedMotion.set(motionMediaQuery_1.matches);
    };
    motionMediaQuery_1.addListener(setReducedMotionPreferences);
    setReducedMotionPreferences();
  } else {
    prefersReducedMotion.set(false);
  }
}
function useReducedMotion() {
  !prefersReducedMotion && initPrefersReducedMotion();
  var _a = __read((0, import_react35.useState)(prefersReducedMotion.get()), 2), shouldReduceMotion = _a[0], setShouldReduceMotion = _a[1];
  useOnChange(prefersReducedMotion, setShouldReduceMotion);
  return shouldReduceMotion;
}

// ../../node_modules/framer-motion/dist/es/animation/animation-controls.js
function animationControls() {
  var hasMounted = false;
  var pendingAnimations = [];
  var subscribers = new Set();
  var controls = {
    subscribe: function(visualElement2) {
      subscribers.add(visualElement2);
      return function() {
        return void subscribers.delete(visualElement2);
      };
    },
    start: function(definition, transitionOverride) {
      if (hasMounted) {
        var animations_1 = [];
        subscribers.forEach(function(visualElement2) {
          animations_1.push(animateVisualElement(visualElement2, definition, {
            transitionOverride
          }));
        });
        return Promise.all(animations_1);
      } else {
        return new Promise(function(resolve) {
          pendingAnimations.push({
            animation: [definition, transitionOverride],
            resolve
          });
        });
      }
    },
    set: function(definition) {
      invariant(hasMounted, "controls.set() should only be called after a component has mounted. Consider calling within a useEffect hook.");
      return subscribers.forEach(function(visualElement2) {
        setValues(visualElement2, definition);
      });
    },
    stop: function() {
      subscribers.forEach(function(visualElement2) {
        stopAnimation(visualElement2);
      });
    },
    mount: function() {
      hasMounted = true;
      pendingAnimations.forEach(function(_a) {
        var animation = _a.animation, resolve = _a.resolve;
        controls.start.apply(controls, __spreadArray([], __read(animation))).then(resolve);
      });
      return function() {
        hasMounted = false;
        controls.stop();
      };
    }
  };
  return controls;
}

// ../../node_modules/framer-motion/dist/es/animation/use-animation.js
var import_react36 = __toModule(require_react());
function useAnimation() {
  var controls = useConstant(animationControls);
  (0, import_react36.useEffect)(controls.mount, []);
  return controls;
}

// ../../node_modules/framer-motion/dist/es/utils/use-cycle.js
var import_react37 = __toModule(require_react());
function useCycle() {
  var items = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    items[_i] = arguments[_i];
  }
  var index = (0, import_react37.useRef)(0);
  var _a = __read((0, import_react37.useState)(items[index.current]), 2), item = _a[0], setItem = _a[1];
  return [
    item,
    function(next2) {
      index.current = typeof next2 !== "number" ? wrap(0, items.length, index.current + 1) : next2;
      setItem(items[index.current]);
    }
  ];
}

// ../../node_modules/framer-motion/dist/es/gestures/drag/use-drag-controls.js
var DragControls = function() {
  function DragControls2() {
    this.componentControls = new Set();
  }
  DragControls2.prototype.subscribe = function(controls) {
    var _this = this;
    this.componentControls.add(controls);
    return function() {
      return _this.componentControls.delete(controls);
    };
  };
  DragControls2.prototype.start = function(event, options) {
    this.componentControls.forEach(function(controls) {
      controls.start(event.nativeEvent || event, options);
    });
  };
  DragControls2.prototype.updateConstraints = function(flush) {
    if (flush === void 0) {
      flush = true;
    }
    this.componentControls.forEach(function(controls) {
      controls.updateConstraints();
    });
    flush && flushLayout();
  };
  return DragControls2;
}();
var createDragControls = function() {
  return new DragControls();
};
function useDragControls() {
  return useConstant(createDragControls);
}

// ../../node_modules/framer-motion/dist/es/animation/use-animated-state.js
var import_react38 = __toModule(require_react());
var createObject = function() {
  return {};
};
var stateVisualElement = visualElement({
  build: function() {
  },
  measureViewportBox: axisBox,
  resetTransform: function() {
  },
  restoreTransform: function() {
  },
  removeValueFromRenderState: function() {
  },
  render: function() {
  },
  scrapeMotionValuesFromProps: createObject,
  readValueFromInstance: function(_state, key, options) {
    return options.initialState[key] || 0;
  },
  makeTargetAnimatable: function(element, _a) {
    var transition = _a.transition, transitionEnd = _a.transitionEnd, target = __rest(_a, ["transition", "transitionEnd"]);
    var origin = getOrigin(target, transition || {}, element);
    checkTargetForNewValues(element, target, origin);
    return __assign({transition, transitionEnd}, target);
  }
});
var useVisualState = makeUseVisualState({
  scrapeMotionValuesFromProps: createObject,
  createRenderState: createObject
});
function useAnimatedState(initialState) {
  var _a = __read((0, import_react38.useState)(initialState), 2), animationState = _a[0], setAnimationState = _a[1];
  var visualState = useVisualState({}, false);
  var element = useConstant(function() {
    return stateVisualElement({props: {}, visualState}, {initialState});
  });
  (0, import_react38.useEffect)(function() {
    element.mount({});
    return element.unmount();
  }, []);
  (0, import_react38.useEffect)(function() {
    element.setProps({
      onUpdate: function(v) {
        return setAnimationState(__assign({}, v));
      }
    });
  });
  var startAnimation2 = useConstant(function() {
    return function(animationDefinition) {
      return animateVisualElement(element, animationDefinition);
    };
  });
  return [animationState, startAnimation2];
}

// ../../node_modules/framer-motion/dist/es/value/use-inverted-scale.js
var maxScale = 1e5;
var invertScale = function(scale2) {
  return scale2 > 1e-3 ? 1 / scale2 : maxScale;
};
var hasWarned = false;
function useInvertedScale(scale2) {
  var parentScaleX = useMotionValue(1);
  var parentScaleY = useMotionValue(1);
  var visualElement2 = useVisualElementContext();
  invariant(!!(scale2 || visualElement2), "If no scale values are provided, useInvertedScale must be used within a child of another motion component.");
  warning(hasWarned, "useInvertedScale is deprecated and will be removed in 3.0. Use the layout prop instead.");
  hasWarned = true;
  if (scale2) {
    parentScaleX = scale2.scaleX || parentScaleX;
    parentScaleY = scale2.scaleY || parentScaleY;
  } else if (visualElement2) {
    parentScaleX = visualElement2.getValue("scaleX", 1);
    parentScaleY = visualElement2.getValue("scaleY", 1);
  }
  var scaleX = useTransform(parentScaleX, invertScale);
  var scaleY = useTransform(parentScaleY, invertScale);
  return {scaleX, scaleY};
}

// src/renderer.ts
var import_react48 = __toModule(require_react());
var import_react_dom = __toModule(require_react_dom());

// ../../node_modules/@emotion/react/dist/emotion-react.browser.esm.js
var import_react40 = __toModule(require_react());

// ../../node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js
function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
}
function createStyleElement(options) {
  var tag = document.createElement("style");
  tag.setAttribute("data-emotion", options.key);
  if (options.nonce !== void 0) {
    tag.setAttribute("nonce", options.nonce);
  }
  tag.appendChild(document.createTextNode(""));
  tag.setAttribute("data-s", "");
  return tag;
}
var StyleSheet = /* @__PURE__ */ function() {
  function StyleSheet2(options) {
    var _this = this;
    this._insertTag = function(tag) {
      var before;
      if (_this.tags.length === 0) {
        before = _this.prepend ? _this.container.firstChild : _this.before;
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }
      _this.container.insertBefore(tag, before);
      _this.tags.push(tag);
    };
    this.isSpeedy = options.speedy === void 0 ? true : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce;
    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.before = null;
  }
  var _proto = StyleSheet2.prototype;
  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };
  _proto.insert = function insert(rule) {
    if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }
    var tag = this.tags[this.tags.length - 1];
    if (false) {
      var isImportRule = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;
      if (isImportRule && this._alreadyInsertedOrderInsensitiveRule) {
        console.error("You're attempting to insert the following rule:\n" + rule + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.");
      }
      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule;
    }
    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);
      try {
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if (false) {
          console.error('There was a problem inserting the following rule: "' + rule + '"', e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }
    this.ctr++;
  };
  _proto.flush = function flush() {
    this.tags.forEach(function(tag) {
      return tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
    if (false) {
      this._alreadyInsertedOrderInsensitiveRule = false;
    }
  };
  return StyleSheet2;
}();

// ../../node_modules/stylis/src/Enum.js
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var KEYFRAMES = "@keyframes";

// ../../node_modules/stylis/src/Utility.js
var abs = Math.abs;
var from = String.fromCharCode;
function hash(value, length2) {
  return (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3);
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search) {
  return value.indexOf(search);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
  return value.slice(begin, end);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join("");
}

// ../../node_modules/stylis/src/Tokenizer.js
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children, length2) {
  return {value, root, parent, type, props, children, line, column, length: length2, return: ""};
}
function copy(value, root, type) {
  return node(value, root.root, root.parent, type, root.props, root.children, 0);
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type) {
  switch (type) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      case type:
        return position;
      case 34:
      case 39:
        return delimiter(type === 34 || type === 39 ? type : character);
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}

// ../../node_modules/stylis/src/Parser.js
function compile(value) {
  return dealloc(parse2("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse2(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      case 34:
      case 39:
      case 91:
      case 40:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset:
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference = ruleset(characters2, root, parent, index, offset, rules, points, type, props = [], children = [], length2), rulesets);
            if (character2 === 123)
              if (offset === 0)
                parse2(characters2, root, reference, reference, props, rulesets, length2, points, children);
              else
                switch (atrule) {
                  case 100:
                  case 109:
                  case 115:
                    parse2(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2), children), rules, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse2(characters2, reference, reference, reference, [""], children, length2, points, children);
                }
        }
        index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length2) {
  var post = offset - 1;
  var rule = offset === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i = 0, j = 0, k = 0; i < index; ++i)
    for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
      if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x])))
        props[k++] = z;
  return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2);
}
function comment(value, root, parent) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
}
function declaration(value, root, parent, length2) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2);
}

// ../../node_modules/stylis/src/Prefixer.js
function prefix(value, length2) {
  switch (hash(value, length2)) {
    case 5103:
      return WEBKIT + "print-" + value + value;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    case 6828:
    case 4268:
      return WEBKIT + value + MS + value + value;
    case 6165:
      return WEBKIT + value + MS + "flex-" + value + value;
    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
    case 5443:
      return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/, "") + value;
    case 4675:
      return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/, "") + value;
    case 5548:
      return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
    case 5292:
      return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
    case 6060:
      return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6)
        switch (charat(value, length2 + 1)) {
          case 109:
            if (charat(value, length2 + 4) !== 45)
              break;
          case 102:
            return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
          case 115:
            return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length2) + value : value;
        }
      break;
    case 4949:
      if (charat(value, length2 + 1) !== 115)
        break;
    case 6444:
      switch (charat(value, strlen(value) - 3 - (~indexof(value, "!important") && 10))) {
        case 107:
          return replace(value, ":", ":" + WEBKIT) + value;
        case 101:
          return replace(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
      }
      break;
    case 5936:
      switch (charat(value, length2 + 11)) {
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
      }
      return WEBKIT + value + MS + value + value;
  }
  return value;
}

// ../../node_modules/stylis/src/Serializer.js
function serialize(children, callback) {
  var output = "";
  var length2 = sizeof(children);
  for (var i = 0; i < length2; i++)
    output += callback(children[i], i, children, callback) || "";
  return output;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case RULESET:
      element.value = element.props.join(",");
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}

// ../../node_modules/stylis/src/Middleware.js
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index, children, callback) {
    var output = "";
    for (var i = 0; i < length2; i++)
      output += collection[i](element, index, children, callback) || "";
    return output;
  };
}
function rulesheet(callback) {
  return function(element) {
    if (!element.root) {
      if (element = element.return)
        callback(element);
    }
  };
}
function prefixer(element, index, children, callback) {
  if (!element.return)
    switch (element.type) {
      case DECLARATION:
        element.return = prefix(element.value, element.length);
        break;
      case KEYFRAMES:
        return serialize([copy(replace(element.value, "@", "@" + WEBKIT), element, "")], callback);
      case RULESET:
        if (element.length)
          return combine(element.props, function(value) {
            switch (match(value, /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                return serialize([copy(replace(value, /:(read-\w+)/, ":" + MOZ + "$1"), element, "")], callback);
              case "::placeholder":
                return serialize([
                  copy(replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1"), element, ""),
                  copy(replace(value, /:(plac\w+)/, ":" + MOZ + "$1"), element, ""),
                  copy(replace(value, /:(plac\w+)/, MS + "input-$1"), element, "")
                ], callback);
            }
            return "";
          });
    }
}

// ../../node_modules/@emotion/memoize/dist/emotion-memoize.browser.esm.js
function memoize(fn) {
  var cache = Object.create(null);
  return function(arg) {
    if (cache[arg] === void 0)
      cache[arg] = fn(arg);
    return cache[arg];
  };
}
var emotion_memoize_browser_esm_default = memoize;

// ../../node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js
var toRules = function toRules2(parsed, points) {
  var index = -1;
  var character2 = 44;
  do {
    switch (token(character2)) {
      case 0:
        if (character2 === 38 && peek() === 12) {
          points[index] = 1;
        }
        parsed[index] += identifier(position - 1);
        break;
      case 2:
        parsed[index] += delimit(character2);
        break;
      case 4:
        if (character2 === 44) {
          parsed[++index] = peek() === 58 ? "&\f" : "";
          points[index] = parsed[index].length;
          break;
        }
      default:
        parsed[index] += from(character2);
    }
  } while (character2 = next());
  return parsed;
};
var getRules = function getRules2(value, points) {
  return dealloc(toRules(alloc(value), points));
};
var fixedElements = /* @__PURE__ */ new WeakMap();
var compat = function compat2(element) {
  if (element.type !== "rule" || !element.parent || !element.length) {
    return;
  }
  var value = element.value, parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;
  while (parent.type !== "rule") {
    parent = parent.parent;
    if (!parent)
      return;
  }
  if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
    return;
  }
  if (isImplicitRule) {
    return;
  }
  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;
  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel2(element) {
  if (element.type === "decl") {
    var value = element.value;
    if (value.charCodeAt(0) === 108 && value.charCodeAt(2) === 98) {
      element["return"] = "";
      element.value = "";
    }
  }
};
var defaultStylisPlugins = [prefixer];
var createCache = function createCache2(options) {
  var key = options.key;
  if (false) {
    throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements.");
  }
  if (key === "css") {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(ssrStyles, function(node2) {
      var dataEmotionAttribute = node2.getAttribute("data-emotion");
      if (dataEmotionAttribute.indexOf(" ") === -1) {
        return;
      }
      document.head.appendChild(node2);
      node2.setAttribute("data-s", "");
    });
  }
  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
  if (false) {
    if (/[^a-z-]/.test(key)) {
      throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + key + '" was passed');
    }
  }
  var inserted = {};
  var container;
  var nodesToHydrate = [];
  {
    container = options.container || document.head;
    Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="' + key + ' "]'), function(node2) {
      var attrib = node2.getAttribute("data-emotion").split(" ");
      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }
      nodesToHydrate.push(node2);
    });
  }
  var _insert;
  var omnipresentPlugins = [compat, removeLabel];
  if (false) {
    omnipresentPlugins.push(createUnsafeSelectorsAlarm({
      get compat() {
        return cache.compat;
      }
    }), incorrectImportAlarm);
  }
  {
    var currentSheet;
    var finalizingPlugins = [stringify, false ? function(element) {
      if (!element.root) {
        if (element["return"]) {
          currentSheet.insert(element["return"]);
        } else if (element.value && element.type !== COMMENT) {
          currentSheet.insert(element.value + "{}");
        }
      }
    } : rulesheet(function(rule) {
      currentSheet.insert(rule);
    })];
    var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
    var stylis = function stylis2(styles) {
      return serialize(compile(styles), serializer);
    };
    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;
      if (false) {
        currentSheet = {
          insert: function insert2(rule) {
            sheet.insert(rule + serialized.map);
          }
        };
      }
      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }
  var cache = {
    key,
    sheet: new StyleSheet({
      key,
      container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend
    }),
    nonce: options.nonce,
    inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};
var emotion_cache_browser_esm_default = createCache;

// ../../node_modules/@emotion/react/dist/emotion-element-a8309070.browser.esm.js
var import_react39 = __toModule(require_react());

// ../../node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

// ../../node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js
var isBrowser2 = true;
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = "";
  classNames.split(" ").forEach(function(className) {
    if (registered[className] !== void 0) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var insertStyles = function insertStyles2(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;
  if ((isStringTag === false || isBrowser2 === false) && cache.registered[className] === void 0) {
    cache.registered[className] = serialized.styles;
  }
  if (cache.inserted[serialized.name] === void 0) {
    var current = serialized;
    do {
      var maybeStyles = cache.insert(serialized === current ? "." + className : "", current, cache.sheet, true);
      current = current.next;
    } while (current !== void 0);
  }
};

// ../../node_modules/@emotion/hash/dist/hash.browser.esm.js
function murmur2(str) {
  var h = 0;
  var k, i = 0, len = str.length;
  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
    k = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
    k ^= k >>> 24;
    h = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 255) << 16;
    case 2:
      h ^= (str.charCodeAt(i + 1) & 255) << 8;
    case 1:
      h ^= str.charCodeAt(i) & 255;
      h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  h ^= h >>> 13;
  h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}
var hash_browser_esm_default = murmur2;

// ../../node_modules/@emotion/unitless/dist/unitless.browser.esm.js
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
var unitless_browser_esm_default = unitlessKeys;

// ../../node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var isCustomProperty = function isCustomProperty2(property) {
  return property.charCodeAt(1) === 45;
};
var isProcessableValue = function isProcessableValue2(value) {
  return value != null && typeof value !== "boolean";
};
var processStyleName = /* @__PURE__ */ emotion_memoize_browser_esm_default(function(styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
});
var processStyleValue = function processStyleValue2(key, value) {
  switch (key) {
    case "animation":
    case "animationName": {
      if (typeof value === "string") {
        return value.replace(animationRegex, function(match2, p1, p2) {
          cursor = {
            name: p1,
            styles: p2,
            next: cursor
          };
          return p1;
        });
      }
    }
  }
  if (unitless_browser_esm_default[key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) {
    return value + "px";
  }
  return value;
};
if (false) {
  contentValuePattern = /(attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
  contentValues = ["normal", "none", "initial", "inherit", "unset"];
  oldProcessStyleValue = processStyleValue;
  msPattern = /^-ms-/;
  hyphenPattern = /-(.)/g;
  hyphenatedCache = {};
  processStyleValue = function processStyleValue3(key, value) {
    if (key === "content") {
      if (typeof value !== "string" || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }
    var processed = oldProcessStyleValue(key, value);
    if (processed !== "" && !isCustomProperty(key) && key.indexOf("-") !== -1 && hyphenatedCache[key] === void 0) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, "ms-").replace(hyphenPattern, function(str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }
    return processed;
  };
}
var contentValuePattern;
var contentValues;
var oldProcessStyleValue;
var msPattern;
var hyphenPattern;
var hyphenatedCache;
function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return "";
  }
  if (interpolation.__emotion_styles !== void 0) {
    if (false) {
      throw new Error("Component selectors can only be used in conjunction with @emotion/babel-plugin.");
    }
    return interpolation;
  }
  switch (typeof interpolation) {
    case "boolean": {
      return "";
    }
    case "object": {
      if (interpolation.anim === 1) {
        cursor = {
          name: interpolation.name,
          styles: interpolation.styles,
          next: cursor
        };
        return interpolation.name;
      }
      if (interpolation.styles !== void 0) {
        var next2 = interpolation.next;
        if (next2 !== void 0) {
          while (next2 !== void 0) {
            cursor = {
              name: next2.name,
              styles: next2.styles,
              next: cursor
            };
            next2 = next2.next;
          }
        }
        var styles = interpolation.styles + ";";
        if (false) {
          styles += interpolation.map;
        }
        return styles;
      }
      return createStringFromObject(mergedProps, registered, interpolation);
    }
    case "function": {
      if (mergedProps !== void 0) {
        var previousCursor = cursor;
        var result = interpolation(mergedProps);
        cursor = previousCursor;
        return handleInterpolation(mergedProps, registered, result);
      } else if (false) {
        console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
      }
      break;
    }
    case "string":
      if (false) {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function(match2, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, "") + "`");
          return "${" + fakeVarName + "}";
        });
        if (matched.length) {
          console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(matched, ["`" + replaced + "`"]).join("\n") + "\n\nYou should wrap it with `css` like this:\n\n" + ("css`" + replaced + "`"));
        }
      }
      break;
  }
  if (registered == null) {
    return interpolation;
  }
  var cached = registered[interpolation];
  return cached !== void 0 ? cached : interpolation;
}
function createStringFromObject(mergedProps, registered, obj) {
  var string = "";
  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];
      if (typeof value !== "object") {
        if (registered != null && registered[value] !== void 0) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === "NO_COMPONENT_SELECTOR" && false) {
          throw new Error("Component selectors can only be used in conjunction with @emotion/babel-plugin.");
        }
        if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);
          switch (_key) {
            case "animation":
            case "animationName": {
              string += processStyleName(_key) + ":" + interpolated + ";";
              break;
            }
            default: {
              if (false) {
                console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
              }
              string += _key + "{" + interpolated + "}";
            }
          }
        }
      }
    }
  }
  return string;
}
var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
if (false) {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
}
var cursor;
var serializeStyles = function serializeStyles2(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
    return args[0];
  }
  var stringMode = true;
  var styles = "";
  cursor = void 0;
  var strings = args[0];
  if (strings == null || strings.raw === void 0) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    if (false) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }
    styles += strings[0];
  }
  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);
    if (stringMode) {
      if (false) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }
      styles += strings[i];
    }
  }
  var sourceMap;
  if (false) {
    styles = styles.replace(sourceMapPattern, function(match3) {
      sourceMap = match3;
      return "";
    });
  }
  labelPattern.lastIndex = 0;
  var identifierName = "";
  var match2;
  while ((match2 = labelPattern.exec(styles)) !== null) {
    identifierName += "-" + match2[1];
  }
  var name = hash_browser_esm_default(styles) + identifierName;
  if (false) {
    return {
      name,
      styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }
  return {
    name,
    styles,
    next: cursor
  };
};

// ../../node_modules/@emotion/react/dist/emotion-element-a8309070.browser.esm.js
var hasOwnProperty = Object.prototype.hasOwnProperty;
var EmotionCacheContext = /* @__PURE__ */ (0, import_react39.createContext)(typeof HTMLElement !== "undefined" ? /* @__PURE__ */ emotion_cache_browser_esm_default({
  key: "css"
}) : null);
var CacheProvider = EmotionCacheContext.Provider;
var withEmotionCache = function withEmotionCache2(func) {
  return /* @__PURE__ */ (0, import_react39.forwardRef)(function(props, ref) {
    var cache = (0, import_react39.useContext)(EmotionCacheContext);
    return func(props, cache, ref);
  });
};
var ThemeContext = /* @__PURE__ */ (0, import_react39.createContext)({});
var typePropName = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__";
var createEmotionProps = function createEmotionProps2(type, props) {
  if (false) {
    throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" + props.css + "`");
  }
  var newProps = {};
  for (var key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key];
    }
  }
  newProps[typePropName] = type;
  if (false) {
    var error = new Error();
    if (error.stack) {
      var match2 = error.stack.match(/at (?:Object\.|Module\.|)(?:jsx|createEmotionProps).*\n\s+at (?:Object\.|)([A-Z][A-Za-z0-9$]+) /);
      if (!match2) {
        match2 = error.stack.match(/.*\n([A-Z][A-Za-z0-9$]+)@/);
      }
      if (match2) {
        newProps[labelPropName] = sanitizeIdentifier(match2[1]);
      }
    }
  }
  return newProps;
};
var Emotion = /* @__PURE__ */ withEmotionCache(function(props, cache, ref) {
  var cssProp = props.css;
  if (typeof cssProp === "string" && cache.registered[cssProp] !== void 0) {
    cssProp = cache.registered[cssProp];
  }
  var type = props[typePropName];
  var registeredStyles = [cssProp];
  var className = "";
  if (typeof props.className === "string") {
    className = getRegisteredStyles(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }
  var serialized = serializeStyles(registeredStyles, void 0, typeof cssProp === "function" || Array.isArray(cssProp) ? (0, import_react39.useContext)(ThemeContext) : void 0);
  if (false) {
    var labelFromStack = props[labelPropName];
    if (labelFromStack) {
      serialized = serializeStyles([serialized, "label:" + labelFromStack + ";"]);
    }
  }
  var rules = insertStyles(cache, serialized, typeof type === "string");
  className += cache.key + "-" + serialized.name;
  var newProps = {};
  for (var key in props) {
    if (hasOwnProperty.call(props, key) && key !== "css" && key !== typePropName && true) {
      newProps[key] = props[key];
    }
  }
  newProps.ref = ref;
  newProps.className = className;
  var ele = /* @__PURE__ */ (0, import_react39.createElement)(type, newProps);
  return ele;
});
if (false) {
  Emotion.displayName = "EmotionCssPropInternal";
}

// ../../node_modules/@emotion/react/dist/emotion-react.browser.esm.js
var import_hoist_non_react_statics = __toModule(require_hoist_non_react_statics_cjs());
var jsx = function jsx2(type, props) {
  var args = arguments;
  if (props == null || !hasOwnProperty.call(props, "css")) {
    return import_react40.createElement.apply(void 0, args);
  }
  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = Emotion;
  createElementArgArray[1] = createEmotionProps(type, props);
  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  }
  return import_react40.createElement.apply(null, createElementArgArray);
};
var Global = /* @__PURE__ */ withEmotionCache(function(props, cache) {
  if (false) {
    console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?");
    warnedAboutCssPropForGlobal = true;
  }
  var styles = props.styles;
  var serialized = serializeStyles([styles], void 0, typeof styles === "function" || Array.isArray(styles) ? (0, import_react40.useContext)(ThemeContext) : void 0);
  var sheetRef = (0, import_react40.useRef)();
  (0, import_react40.useLayoutEffect)(function() {
    var key = cache.key + "-global";
    var sheet = new StyleSheet({
      key,
      nonce: cache.sheet.nonce,
      container: cache.sheet.container,
      speedy: cache.sheet.isSpeedy
    });
    var rehydrating = false;
    var node2 = document.querySelector('style[data-emotion="' + key + " " + serialized.name + '"]');
    if (cache.sheet.tags.length) {
      sheet.before = cache.sheet.tags[0];
    }
    if (node2 !== null) {
      rehydrating = true;
      node2.setAttribute("data-emotion", key);
      sheet.hydrate([node2]);
    }
    sheetRef.current = [sheet, rehydrating];
    return function() {
      sheet.flush();
    };
  }, [cache]);
  (0, import_react40.useLayoutEffect)(function() {
    var sheetRefCurrent = sheetRef.current;
    var sheet = sheetRefCurrent[0], rehydrating = sheetRefCurrent[1];
    if (rehydrating) {
      sheetRefCurrent[1] = false;
      return;
    }
    if (serialized.next !== void 0) {
      insertStyles(cache, serialized.next, true);
    }
    if (sheet.tags.length) {
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }
    cache.insert("", serialized, sheet, false);
  }, [cache, serialized.name]);
  return null;
});
if (false) {
  Global.displayName = "EmotionGlobal";
}
function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return serializeStyles(args);
}
var keyframes3 = function keyframes4() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name;
  return {
    name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};
if (false) {
  ClassNames.displayName = "EmotionClassNames";
}
if (false) {
  isBrowser3 = true;
  isJest = typeof jest !== "undefined";
  if (isBrowser3 && !isJest) {
    globalContext = isBrowser3 ? window : global;
    globalKey = "__EMOTION_REACT_" + pkg.version.split(".")[0] + "__";
    if (globalContext[globalKey]) {
      console.warn("You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.");
    }
    globalContext[globalKey] = true;
  }
}
var isBrowser3;
var isJest;
var globalContext;
var globalKey;

// ../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}

// ../../node_modules/@material-ui/core/Fab/Fab.js
var React21 = __toModule(require_react());
var import_prop_types6 = __toModule(require_prop_types());

// ../../node_modules/clsx/dist/clsx.m.js
function toVal(mix2) {
  var k, y, str = "";
  if (typeof mix2 === "string" || typeof mix2 === "number") {
    str += mix2;
  } else if (typeof mix2 === "object") {
    if (Array.isArray(mix2)) {
      for (k = 0; k < mix2.length; k++) {
        if (mix2[k]) {
          if (y = toVal(mix2[k])) {
            str && (str += " ");
            str += y;
          }
        }
      }
    } else {
      for (k in mix2) {
        if (mix2[k]) {
          str && (str += " ");
          str += k;
        }
      }
    }
  }
  return str;
}
function clsx_m_default() {
  var i = 0, tmp, x, str = "";
  while (i < arguments.length) {
    if (tmp = arguments[i++]) {
      if (x = toVal(tmp)) {
        str && (str += " ");
        str += x;
      }
    }
  }
  return str;
}

// ../../node_modules/@material-ui/unstyled/composeClasses/composeClasses.js
function composeClasses(slots, getUtilityClass, classes) {
  const output = {};
  Object.keys(slots).forEach((slot) => {
    output[slot] = slots[slot].reduce((acc, key) => {
      if (key) {
        if (classes && classes[key]) {
          acc.push(classes[key]);
        }
        acc.push(getUtilityClass(key));
      }
      return acc;
    }, []).join(" ");
  });
  return output;
}

// ../../node_modules/@material-ui/unstyled/generateUtilityClass/generateUtilityClass.js
var globalPseudoClassesMapping = {
  active: "Mui-active",
  checked: "Mui-checked",
  disabled: "Mui-disabled",
  error: "Mui-error",
  focused: "Mui-focused",
  focusVisible: "Mui-focusVisible",
  required: "Mui-required",
  expanded: "Mui-expanded",
  selected: "Mui-selected"
};
function generateUtilityClass(componentName, slot) {
  const globalPseudoClass = globalPseudoClassesMapping[slot];
  return globalPseudoClass || `${componentName}-${slot}`;
}

// ../../node_modules/@material-ui/unstyled/generateUtilityClasses/generateUtilityClasses.js
function generateUtilityClasses(componentName, slots) {
  const result = {};
  slots.forEach((slot) => {
    result[slot] = generateUtilityClass(componentName, slot);
  });
  return result;
}

// ../../node_modules/@material-ui/utils/esm/deepmerge.js
function isPlainObject(item) {
  return item !== null && typeof item === "object" && item.constructor === Object;
}
function deepmerge(target, source, options = {
  clone: true
}) {
  const output = options.clone ? _extends({}, target) : target;
  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach((key) => {
      if (key === "__proto__") {
        return;
      }
      if (isPlainObject(source[key]) && key in target && isPlainObject(target[key])) {
        output[key] = deepmerge(target[key], source[key], options);
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
}

// ../../node_modules/@material-ui/utils/esm/formatMuiErrorMessage.js
function formatMuiErrorMessage(code) {
  let url = "https://material-ui.com/production-error/?code=" + code;
  for (let i = 1; i < arguments.length; i += 1) {
    url += "&args[]=" + encodeURIComponent(arguments[i]);
  }
  return "Minified Material-UI error #" + code + "; visit " + url + " for the full message.";
}

// ../../node_modules/@material-ui/utils/esm/capitalize.js
function capitalize(string) {
  if (typeof string !== "string") {
    throw new Error(false ? `Material-UI: \`capitalize(string)\` expects a string argument.` : formatMuiErrorMessage(7));
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// ../../node_modules/@material-ui/utils/esm/setRef.js
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

// ../../node_modules/@material-ui/utils/esm/useEnhancedEffect.js
var React9 = __toModule(require_react());
var useEnhancedEffect = typeof window !== "undefined" ? React9.useLayoutEffect : React9.useEffect;
var useEnhancedEffect_default = useEnhancedEffect;

// ../../node_modules/@material-ui/utils/esm/useEventCallback.js
var React10 = __toModule(require_react());
function useEventCallback(fn) {
  const ref = React10.useRef(fn);
  useEnhancedEffect_default(() => {
    ref.current = fn;
  });
  return React10.useCallback((...args) => (0, ref.current)(...args), []);
}

// ../../node_modules/@material-ui/utils/esm/useForkRef.js
var React11 = __toModule(require_react());
function useForkRef(refA, refB) {
  return React11.useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}

// ../../node_modules/@material-ui/utils/esm/useIsFocusVisible.js
var React12 = __toModule(require_react());
var hadKeyboardEvent = true;
var hadFocusVisibleRecently = false;
var hadFocusVisibleRecentlyTimeout = null;
var inputTypesWhitelist = {
  text: true,
  search: true,
  url: true,
  tel: true,
  email: true,
  password: true,
  number: true,
  date: true,
  month: true,
  week: true,
  time: true,
  datetime: true,
  "datetime-local": true
};
function focusTriggersKeyboardModality(node2) {
  const {
    type,
    tagName
  } = node2;
  if (tagName === "INPUT" && inputTypesWhitelist[type] && !node2.readOnly) {
    return true;
  }
  if (tagName === "TEXTAREA" && !node2.readOnly) {
    return true;
  }
  if (node2.isContentEditable) {
    return true;
  }
  return false;
}
function handleKeyDown(event) {
  if (event.metaKey || event.altKey || event.ctrlKey) {
    return;
  }
  hadKeyboardEvent = true;
}
function handlePointerDown() {
  hadKeyboardEvent = false;
}
function handleVisibilityChange() {
  if (this.visibilityState === "hidden") {
    if (hadFocusVisibleRecently) {
      hadKeyboardEvent = true;
    }
  }
}
function prepare(doc) {
  doc.addEventListener("keydown", handleKeyDown, true);
  doc.addEventListener("mousedown", handlePointerDown, true);
  doc.addEventListener("pointerdown", handlePointerDown, true);
  doc.addEventListener("touchstart", handlePointerDown, true);
  doc.addEventListener("visibilitychange", handleVisibilityChange, true);
}
function isFocusVisible(event) {
  const {
    target
  } = event;
  try {
    return target.matches(":focus-visible");
  } catch (error) {
  }
  return hadKeyboardEvent || focusTriggersKeyboardModality(target);
}
function useIsFocusVisible() {
  const ref = React12.useCallback((node2) => {
    if (node2 != null) {
      prepare(node2.ownerDocument);
    }
  }, []);
  const isFocusVisibleRef = React12.useRef(false);
  function handleBlurVisible() {
    if (isFocusVisibleRef.current) {
      hadFocusVisibleRecently = true;
      window.clearTimeout(hadFocusVisibleRecentlyTimeout);
      hadFocusVisibleRecentlyTimeout = window.setTimeout(() => {
        hadFocusVisibleRecently = false;
      }, 100);
      isFocusVisibleRef.current = false;
      return true;
    }
    return false;
  }
  function handleFocusVisible(event) {
    if (isFocusVisible(event)) {
      isFocusVisibleRef.current = true;
      return true;
    }
    return false;
  }
  return {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref
  };
}

// ../../node_modules/@material-ui/core/ButtonBase/ButtonBase.js
var React20 = __toModule(require_react());
var import_prop_types5 = __toModule(require_prop_types());

// ../../node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js
var import_react43 = __toModule(require_react());

// ../../node_modules/@emotion/styled/node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.browser.esm.js
var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
var isPropValid = /* @__PURE__ */ emotion_memoize_browser_esm_default(function(prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
});
var emotion_is_prop_valid_browser_esm_default = isPropValid;

// ../../node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js
var import_react41 = __toModule(require_react());
var testOmitPropsOnStringTag = emotion_is_prop_valid_browser_esm_default;
var testOmitPropsOnComponent = function testOmitPropsOnComponent2(key) {
  return key !== "theme";
};
var getDefaultShouldForwardProp = function getDefaultShouldForwardProp2(tag) {
  return typeof tag === "string" && tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
};
var composeShouldForwardProps = function composeShouldForwardProps2(tag, options, isReal) {
  var shouldForwardProp;
  if (options) {
    var optionsShouldForwardProp = options.shouldForwardProp;
    shouldForwardProp = tag.__emotion_forwardProp && optionsShouldForwardProp ? function(propName) {
      return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
    } : optionsShouldForwardProp;
  }
  if (typeof shouldForwardProp !== "function" && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp;
  }
  return shouldForwardProp;
};
var createStyled = function createStyled2(tag, options) {
  if (false) {
    if (tag === void 0) {
      throw new Error("You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.");
    }
  }
  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;
  var identifierName;
  var targetClassName;
  if (options !== void 0) {
    identifierName = options.label;
    targetClassName = options.target;
  }
  var shouldForwardProp = composeShouldForwardProps(tag, options, isReal);
  var defaultShouldForwardProp = shouldForwardProp || getDefaultShouldForwardProp(baseTag);
  var shouldUseAs = !defaultShouldForwardProp("as");
  return function() {
    var args = arguments;
    var styles = isReal && tag.__emotion_styles !== void 0 ? tag.__emotion_styles.slice(0) : [];
    if (identifierName !== void 0) {
      styles.push("label:" + identifierName + ";");
    }
    if (args[0] == null || args[0].raw === void 0) {
      styles.push.apply(styles, args);
    } else {
      if (false) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }
      styles.push(args[0][0]);
      var len = args.length;
      var i = 1;
      for (; i < len; i++) {
        if (false) {
          console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
        }
        styles.push(args[i], args[0][i]);
      }
    }
    var Styled = withEmotionCache(function(props, cache, ref) {
      var finalTag = shouldUseAs && props.as || baseTag;
      var className = "";
      var classInterpolations = [];
      var mergedProps = props;
      if (props.theme == null) {
        mergedProps = {};
        for (var key in props) {
          mergedProps[key] = props[key];
        }
        mergedProps.theme = (0, import_react41.useContext)(ThemeContext);
      }
      if (typeof props.className === "string") {
        className = getRegisteredStyles(cache.registered, classInterpolations, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }
      var serialized = serializeStyles(styles.concat(classInterpolations), cache.registered, mergedProps);
      var rules = insertStyles(cache, serialized, typeof finalTag === "string");
      className += cache.key + "-" + serialized.name;
      if (targetClassName !== void 0) {
        className += " " + targetClassName;
      }
      var finalShouldForwardProp = shouldUseAs && shouldForwardProp === void 0 ? getDefaultShouldForwardProp(finalTag) : defaultShouldForwardProp;
      var newProps = {};
      for (var _key in props) {
        if (shouldUseAs && _key === "as")
          continue;
        if (finalShouldForwardProp(_key)) {
          newProps[_key] = props[_key];
        }
      }
      newProps.className = className;
      newProps.ref = ref;
      var ele = /* @__PURE__ */ (0, import_react41.createElement)(finalTag, newProps);
      return ele;
    });
    Styled.displayName = identifierName !== void 0 ? identifierName : "Styled(" + (typeof baseTag === "string" ? baseTag : baseTag.displayName || baseTag.name || "Component") + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles;
    Styled.__emotion_forwardProp = shouldForwardProp;
    Object.defineProperty(Styled, "toString", {
      value: function value() {
        if (targetClassName === void 0 && false) {
          return "NO_COMPONENT_SELECTOR";
        }
        return "." + targetClassName;
      }
    });
    Styled.withComponent = function(nextTag, nextOptions) {
      return createStyled2(nextTag, _extends({}, options, nextOptions, {
        shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
      })).apply(void 0, styles);
    };
    return Styled;
  };
};
var emotion_styled_base_browser_esm_default = createStyled;

// ../../node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js
var tags = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
var newStyled = emotion_styled_base_browser_esm_default.bind();
tags.forEach(function(tagName) {
  newStyled[tagName] = newStyled(tagName);
});
var emotion_styled_browser_esm_default = newStyled;

// ../../node_modules/@material-ui/styles/getThemeProps/getThemeProps.js
function getThemeProps(params) {
  const {
    theme,
    name,
    props
  } = params;
  if (!theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps) {
    return props;
  }
  const output = _extends({}, props);
  const defaultProps2 = theme.components[name].defaultProps;
  let propName;
  for (propName in defaultProps2) {
    if (output[propName] === void 0) {
      output[propName] = defaultProps2[propName];
    }
  }
  return output;
}

// ../../node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}

// ../../node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}

// ../../node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}

// ../../node_modules/@material-ui/styles/useTheme/useTheme.js
var React14 = __toModule(require_react());

// ../../node_modules/@material-ui/styles/useTheme/ThemeContext.js
var React13 = __toModule(require_react());
var ThemeContext2 = /* @__PURE__ */ React13.createContext(null);
if (false) {
  ThemeContext2.displayName = "ThemeContext";
}
var ThemeContext_default = ThemeContext2;

// ../../node_modules/@material-ui/styles/useTheme/useTheme.js
function useTheme2() {
  const theme = React14.useContext(ThemeContext_default);
  if (false) {
    React14.useDebugValue(theme);
  }
  return theme;
}

// ../../node_modules/@material-ui/styles/propsToClassKey/propsToClassKey.js
function isEmpty(string) {
  return string.length === 0;
}
function propsToClassKey(props) {
  const {
    variant
  } = props, other = _objectWithoutPropertiesLoose(props, ["variant"]);
  let classKey = variant || "";
  Object.keys(other).sort().forEach((key) => {
    if (key === "color") {
      classKey += isEmpty(classKey) ? props[key] : capitalize(props[key]);
    } else {
      classKey += `${isEmpty(classKey) ? key : capitalize(key)}${capitalize(props[key].toString())}`;
    }
  });
  return classKey;
}

// ../../node_modules/@material-ui/styles/index.js
if (false) {
  ponyfillGlobal_default["__@material-ui/styles-init__"] = ponyfillGlobal_default["__@material-ui/styles-init__"] || 0;
  if (ponyfillGlobal_default["__@material-ui/styles-init__"] === 1) {
    console.warn(["It looks like there are several instances of `@material-ui/styles` initialized in this application.", "This may cause theme propagation issues, broken class names, specificity issues, and makes your application bigger without a good reason.", "", "See https://material-ui.com/r/styles-instance-warning for more info."].join("\n"));
  }
  ponyfillGlobal_default["__@material-ui/styles-init__"] += 1;
}

// ../../node_modules/@material-ui/system/esm/breakpoints.js
var import_prop_types = __toModule(require_prop_types());

// ../../node_modules/@material-ui/system/esm/merge.js
function merge(acc, item) {
  if (!item) {
    return acc;
  }
  return deepmerge(acc, item, {
    clone: false
  });
}
var merge_default = merge;

// ../../node_modules/@material-ui/system/esm/breakpoints.js
var values = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
};
var defaultBreakpoints = {
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (key) => `@media (min-width:${values[key]}px)`
};
function handleBreakpoints(props, propValue, styleFromPropValue) {
  if (false) {
    if (!props.theme) {
      console.error("Material-UI: You are calling a style function without a theme value.");
    }
  }
  if (Array.isArray(propValue)) {
    const themeBreakpoints = props.theme.breakpoints || defaultBreakpoints;
    return propValue.reduce((acc, item, index) => {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }
  if (typeof propValue === "object") {
    const themeBreakpoints = props.theme.breakpoints || defaultBreakpoints;
    return Object.keys(propValue).reduce((acc, breakpoint) => {
      if (Object.keys(themeBreakpoints.values || values).indexOf(breakpoint) !== -1) {
        const mediaKey = themeBreakpoints.up(breakpoint);
        acc[mediaKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
      } else {
        const cssKey = breakpoint;
        acc[cssKey] = propValue[cssKey];
      }
      return acc;
    }, {});
  }
  const output = styleFromPropValue(propValue);
  return output;
}
function createEmptyBreakpointObject(breakpointsInput = {}) {
  var _breakpointsInput$key;
  const breakpointsInOrder = breakpointsInput === null || breakpointsInput === void 0 ? void 0 : (_breakpointsInput$key = breakpointsInput.keys) === null || _breakpointsInput$key === void 0 ? void 0 : _breakpointsInput$key.reduce((acc, key) => {
    const breakpointStyleKey = breakpointsInput.up(key);
    acc[breakpointStyleKey] = {};
    return acc;
  }, {});
  return breakpointsInOrder || {};
}
function removeUnusedBreakpoints(breakpointKeys, style3) {
  return breakpointKeys.reduce((acc, key) => {
    const breakpointOutput = acc[key];
    const isBreakpointUnused = Object.keys(breakpointOutput).length === 0;
    if (isBreakpointUnused) {
      delete acc[key];
    }
    return acc;
  }, style3);
}

// ../../node_modules/@material-ui/system/esm/style.js
function getPath(obj, path) {
  if (!path || typeof path !== "string") {
    return null;
  }
  return path.split(".").reduce((acc, item) => acc && acc[item] ? acc[item] : null, obj);
}
function getValue(themeMapping, transform3, propValueFinal, userValue = propValueFinal) {
  let value;
  if (typeof themeMapping === "function") {
    value = themeMapping(propValueFinal);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[propValueFinal] || userValue;
  } else {
    value = getPath(themeMapping, propValueFinal) || userValue;
  }
  if (transform3) {
    value = transform3(value);
  }
  return value;
}
function style(options) {
  const {
    prop,
    cssProperty = options.prop,
    themeKey,
    transform: transform3
  } = options;
  const fn = (props) => {
    if (props[prop] == null) {
      return null;
    }
    const propValue = props[prop];
    const theme = props.theme;
    const themeMapping = getPath(theme, themeKey) || {};
    const styleFromPropValue = (propValueFinal) => {
      let value = getValue(themeMapping, transform3, propValueFinal);
      if (propValueFinal === value && typeof propValueFinal === "string") {
        value = getValue(themeMapping, transform3, `${prop}${propValueFinal === "default" ? "" : capitalize(propValueFinal)}`, propValueFinal);
      }
      if (cssProperty === false) {
        return value;
      }
      return {
        [cssProperty]: value
      };
    };
    return handleBreakpoints(props, propValue, styleFromPropValue);
  };
  fn.propTypes = false ? {
    [prop]: responsivePropType_default
  } : {};
  fn.filterProps = [prop];
  return fn;
}
var style_default = style;

// ../../node_modules/@material-ui/system/esm/compose.js
function compose(...styles) {
  const handlers = styles.reduce((acc, style3) => {
    style3.filterProps.forEach((prop) => {
      acc[prop] = style3;
    });
    return acc;
  }, {});
  const fn = (props) => {
    return Object.keys(props).reduce((acc, prop) => {
      if (handlers[prop]) {
        return merge_default(acc, handlers[prop](props));
      }
      return acc;
    }, {});
  };
  fn.propTypes = false ? styles.reduce((acc, style3) => Object.assign(acc, style3.propTypes), {}) : {};
  fn.filterProps = styles.reduce((acc, style3) => acc.concat(style3.filterProps), []);
  return fn;
}
var compose_default = compose;

// ../../node_modules/@material-ui/system/esm/memoize.js
function memoize2(fn) {
  const cache = {};
  return (arg) => {
    if (cache[arg] === void 0) {
      cache[arg] = fn(arg);
    }
    return cache[arg];
  };
}

// ../../node_modules/@material-ui/system/esm/spacing.js
var properties = {
  m: "margin",
  p: "padding"
};
var directions = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
};
var aliases = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
};
var getCssProperties = memoize2((prop) => {
  if (prop.length > 2) {
    if (aliases[prop]) {
      prop = aliases[prop];
    } else {
      return [prop];
    }
  }
  const [a2, b2] = prop.split("");
  const property = properties[a2];
  const direction = directions[b2] || "";
  return Array.isArray(direction) ? direction.map((dir) => property + dir) : [property + direction];
});
var marginKeys = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY"];
var paddingKeys = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY"];
var spacingKeys = [...marginKeys, ...paddingKeys];
function createUnaryUnit(theme, themeKey, defaultValue, propName) {
  const themeSpacing = getPath(theme, themeKey) || defaultValue;
  if (typeof themeSpacing === "number") {
    return (abs2) => {
      if (typeof abs2 === "string") {
        return abs2;
      }
      if (false) {
        if (typeof abs2 !== "number") {
          console.error(`Material-UI: Expected ${propName} argument to be a number or a string, got ${abs2}.`);
        }
      }
      return themeSpacing * abs2;
    };
  }
  if (Array.isArray(themeSpacing)) {
    return (abs2) => {
      if (typeof abs2 === "string") {
        return abs2;
      }
      if (false) {
        if (!Number.isInteger(abs2)) {
          console.error([`Material-UI: The \`theme.${themeKey}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${themeKey}\` as a number.`].join("\n"));
        } else if (abs2 > themeSpacing.length - 1) {
          console.error([`Material-UI: The value provided (${abs2}) overflows.`, `The supported values are: ${JSON.stringify(themeSpacing)}.`, `${abs2} > ${themeSpacing.length - 1}, you need to add the missing values.`].join("\n"));
        }
      }
      return themeSpacing[abs2];
    };
  }
  if (typeof themeSpacing === "function") {
    return themeSpacing;
  }
  if (false) {
    console.error([`Material-UI: The \`theme.${themeKey}\` value (${themeSpacing}) is invalid.`, "It should be a number, an array or a function."].join("\n"));
  }
  return () => void 0;
}
function createUnarySpacing(theme) {
  return createUnaryUnit(theme, "spacing", 8, "spacing");
}
function getValue2(transformer, propValue) {
  if (typeof propValue === "string" || propValue == null) {
    return propValue;
  }
  const abs2 = Math.abs(propValue);
  const transformed = transformer(abs2);
  if (propValue >= 0) {
    return transformed;
  }
  if (typeof transformed === "number") {
    return -transformed;
  }
  return `-${transformed}`;
}
function getStyleFromPropValue(cssProperties, transformer) {
  return (propValue) => cssProperties.reduce((acc, cssProperty) => {
    acc[cssProperty] = getValue2(transformer, propValue);
    return acc;
  }, {});
}
function resolveCssProperty(props, keys, prop, transformer) {
  if (keys.indexOf(prop) === -1) {
    return null;
  }
  const cssProperties = getCssProperties(prop);
  const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);
  const propValue = props[prop];
  return handleBreakpoints(props, propValue, styleFromPropValue);
}
function style2(props, keys) {
  const transformer = createUnarySpacing(props.theme);
  return Object.keys(props).map((prop) => resolveCssProperty(props, keys, prop, transformer)).reduce(merge_default, {});
}
function margin(props) {
  return style2(props, marginKeys);
}
margin.propTypes = false ? marginKeys.reduce((obj, key) => {
  obj[key] = responsivePropType_default;
  return obj;
}, {}) : {};
margin.filterProps = marginKeys;
function padding(props) {
  return style2(props, paddingKeys);
}
padding.propTypes = false ? paddingKeys.reduce((obj, key) => {
  obj[key] = responsivePropType_default;
  return obj;
}, {}) : {};
padding.filterProps = paddingKeys;
function spacing(props) {
  return style2(props, spacingKeys);
}
spacing.propTypes = false ? spacingKeys.reduce((obj, key) => {
  obj[key] = responsivePropType_default;
  return obj;
}, {}) : {};
spacing.filterProps = spacingKeys;
var spacing_default = spacing;

// ../../node_modules/@material-ui/system/esm/borders.js
function getBorder(value) {
  if (typeof value !== "number") {
    return value;
  }
  return `${value}px solid`;
}
var border = style_default({
  prop: "border",
  themeKey: "borders",
  transform: getBorder
});
var borderTop = style_default({
  prop: "borderTop",
  themeKey: "borders",
  transform: getBorder
});
var borderRight = style_default({
  prop: "borderRight",
  themeKey: "borders",
  transform: getBorder
});
var borderBottom = style_default({
  prop: "borderBottom",
  themeKey: "borders",
  transform: getBorder
});
var borderLeft = style_default({
  prop: "borderLeft",
  themeKey: "borders",
  transform: getBorder
});
var borderColor = style_default({
  prop: "borderColor",
  themeKey: "palette"
});
var borderRadius = (props) => {
  if (props.borderRadius) {
    const transformer = createUnaryUnit(props.theme, "shape.borderRadius", 4, "borderRadius");
    const styleFromPropValue = (propValue) => ({
      borderRadius: getValue2(transformer, propValue)
    });
    return handleBreakpoints(props, props.borderRadius, styleFromPropValue);
  }
  return null;
};
borderRadius.propTypes = false ? {
  borderRadius: responsivePropType_default
} : {};
borderRadius.filterProps = ["borderRadius"];
var borders2 = compose_default(border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderRadius);
var borders_default = borders2;

// ../../node_modules/@material-ui/system/esm/display.js
var displayPrint = style_default({
  prop: "displayPrint",
  cssProperty: false,
  transform: (value) => ({
    "@media print": {
      display: value
    }
  })
});
var displayRaw = style_default({
  prop: "display"
});
var overflow = style_default({
  prop: "overflow"
});
var textOverflow = style_default({
  prop: "textOverflow"
});
var visibility = style_default({
  prop: "visibility"
});
var whiteSpace = style_default({
  prop: "whiteSpace"
});
var display_default = compose_default(displayPrint, displayRaw, overflow, textOverflow, visibility, whiteSpace);

// ../../node_modules/@material-ui/system/esm/flexbox.js
var flexBasis = style_default({
  prop: "flexBasis"
});
var flexDirection = style_default({
  prop: "flexDirection"
});
var flexWrap = style_default({
  prop: "flexWrap"
});
var justifyContent = style_default({
  prop: "justifyContent"
});
var alignItems = style_default({
  prop: "alignItems"
});
var alignContent = style_default({
  prop: "alignContent"
});
var order2 = style_default({
  prop: "order"
});
var flex = style_default({
  prop: "flex"
});
var flexGrow = style_default({
  prop: "flexGrow"
});
var flexShrink = style_default({
  prop: "flexShrink"
});
var alignSelf = style_default({
  prop: "alignSelf"
});
var justifyItems = style_default({
  prop: "justifyItems"
});
var justifySelf = style_default({
  prop: "justifySelf"
});
var flexbox = compose_default(flexBasis, flexDirection, flexWrap, justifyContent, alignItems, alignContent, order2, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf);
var flexbox_default = flexbox;

// ../../node_modules/@material-ui/system/esm/grid.js
var gap = (props) => {
  if (props.gap) {
    const transformer = createUnaryUnit(props.theme, "spacing", 8, "gap");
    const styleFromPropValue = (propValue) => ({
      gap: getValue2(transformer, propValue)
    });
    return handleBreakpoints(props, props.gap, styleFromPropValue);
  }
  return null;
};
gap.propTypes = false ? {
  gap: responsivePropType_default
} : {};
gap.filterProps = ["gap"];
var columnGap = (props) => {
  if (props.columnGap) {
    const transformer = createUnaryUnit(props.theme, "spacing", 8, "columnGap");
    const styleFromPropValue = (propValue) => ({
      columnGap: getValue2(transformer, propValue)
    });
    return handleBreakpoints(props, props.columnGap, styleFromPropValue);
  }
  return null;
};
columnGap.propTypes = false ? {
  columnGap: responsivePropType_default
} : {};
columnGap.filterProps = ["columnGap"];
var rowGap = (props) => {
  if (props.rowGap) {
    const transformer = createUnaryUnit(props.theme, "spacing", 8, "rowGap");
    const styleFromPropValue = (propValue) => ({
      rowGap: getValue2(transformer, propValue)
    });
    return handleBreakpoints(props, props.rowGap, styleFromPropValue);
  }
  return null;
};
rowGap.propTypes = false ? {
  rowGap: responsivePropType_default
} : {};
rowGap.filterProps = ["rowGap"];
var gridColumn = style_default({
  prop: "gridColumn"
});
var gridRow = style_default({
  prop: "gridRow"
});
var gridAutoFlow = style_default({
  prop: "gridAutoFlow"
});
var gridAutoColumns = style_default({
  prop: "gridAutoColumns"
});
var gridAutoRows = style_default({
  prop: "gridAutoRows"
});
var gridTemplateColumns = style_default({
  prop: "gridTemplateColumns"
});
var gridTemplateRows = style_default({
  prop: "gridTemplateRows"
});
var gridTemplateAreas = style_default({
  prop: "gridTemplateAreas"
});
var gridArea = style_default({
  prop: "gridArea"
});
var grid = compose_default(gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);
var grid_default = grid;

// ../../node_modules/@material-ui/system/esm/palette.js
var color2 = style_default({
  prop: "color",
  themeKey: "palette"
});
var bgcolor = style_default({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette"
});
var backgroundColor = style_default({
  prop: "backgroundColor",
  themeKey: "palette"
});
var palette = compose_default(color2, bgcolor, backgroundColor);
var palette_default = palette;

// ../../node_modules/@material-ui/system/esm/positions.js
var position2 = style_default({
  prop: "position"
});
var zIndex = style_default({
  prop: "zIndex",
  themeKey: "zIndex"
});
var top = style_default({
  prop: "top"
});
var right = style_default({
  prop: "right"
});
var bottom = style_default({
  prop: "bottom"
});
var left = style_default({
  prop: "left"
});
var positions_default = compose_default(position2, zIndex, top, right, bottom, left);

// ../../node_modules/@material-ui/system/esm/shadows.js
var boxShadow = style_default({
  prop: "boxShadow",
  themeKey: "shadows"
});
var shadows_default = boxShadow;

// ../../node_modules/@material-ui/system/esm/sizing.js
function transform2(value) {
  return value <= 1 ? `${value * 100}%` : value;
}
var width = style_default({
  prop: "width",
  transform: transform2
});
var maxWidth = style_default({
  prop: "maxWidth",
  transform: transform2
});
var minWidth = style_default({
  prop: "minWidth",
  transform: transform2
});
var height = style_default({
  prop: "height",
  transform: transform2
});
var maxHeight = style_default({
  prop: "maxHeight",
  transform: transform2
});
var minHeight = style_default({
  prop: "minHeight",
  transform: transform2
});
var sizeWidth = style_default({
  prop: "size",
  cssProperty: "width",
  transform: transform2
});
var sizeHeight = style_default({
  prop: "size",
  cssProperty: "height",
  transform: transform2
});
var boxSizing = style_default({
  prop: "boxSizing"
});
var sizing = compose_default(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);
var sizing_default = sizing;

// ../../node_modules/@material-ui/system/esm/typography.js
var fontFamily = style_default({
  prop: "fontFamily",
  themeKey: "typography"
});
var fontSize = style_default({
  prop: "fontSize",
  themeKey: "typography"
});
var fontStyle = style_default({
  prop: "fontStyle",
  themeKey: "typography"
});
var fontWeight = style_default({
  prop: "fontWeight",
  themeKey: "typography"
});
var letterSpacing = style_default({
  prop: "letterSpacing"
});
var lineHeight = style_default({
  prop: "lineHeight"
});
var textAlign = style_default({
  prop: "textAlign"
});
var typographyVariant = style_default({
  prop: "typography",
  cssProperty: false,
  themeKey: "typography"
});
var typography = compose_default(typographyVariant, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign);
var typography_default = typography;

// ../../node_modules/@material-ui/system/esm/getThemeValue.js
var filterPropsMapping = {
  borders: borders_default.filterProps,
  display: display_default.filterProps,
  flexbox: flexbox_default.filterProps,
  grid: grid_default.filterProps,
  positions: positions_default.filterProps,
  palette: palette_default.filterProps,
  shadows: shadows_default.filterProps,
  sizing: sizing_default.filterProps,
  spacing: spacing_default.filterProps,
  typography: typography_default.filterProps
};
var styleFunctionMapping = {
  borders: borders_default,
  display: display_default,
  flexbox: flexbox_default,
  grid: grid_default,
  positions: positions_default,
  palette: palette_default,
  shadows: shadows_default,
  sizing: sizing_default,
  spacing: spacing_default,
  typography: typography_default
};
var propToStyleFunction = Object.keys(filterPropsMapping).reduce((acc, styleFnName) => {
  filterPropsMapping[styleFnName].forEach((propName) => {
    acc[propName] = styleFunctionMapping[styleFnName];
  });
  return acc;
}, {});
function getThemeValue(prop, value, theme) {
  const inputProps = {
    [prop]: value,
    theme
  };
  const styleFunction = propToStyleFunction[prop];
  return styleFunction ? styleFunction(inputProps) : {
    [prop]: value
  };
}
var getThemeValue_default = getThemeValue;

// ../../node_modules/@material-ui/system/esm/styleFunctionSx/styleFunctionSx.js
function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every((object) => union.size === Object.keys(object).length);
}
function callIfFn(maybeFn, arg) {
  return typeof maybeFn === "function" ? maybeFn(arg) : maybeFn;
}
function styleFunctionSx(props) {
  const {
    sx: styles,
    theme = {}
  } = props || {};
  if (!styles)
    return null;
  if (typeof styles === "function") {
    return styles(theme);
  }
  if (typeof styles !== "object") {
    return styles;
  }
  const emptyBreakpoints = createEmptyBreakpointObject(theme.breakpoints);
  const breakpointsKeys = Object.keys(emptyBreakpoints);
  let css2 = emptyBreakpoints;
  Object.keys(styles).forEach((styleKey) => {
    const value = callIfFn(styles[styleKey], theme);
    if (typeof value === "object") {
      if (propToStyleFunction[styleKey]) {
        css2 = merge_default(css2, getThemeValue_default(styleKey, value, theme));
      } else {
        const breakpointsValues = handleBreakpoints({
          theme
        }, value, (x) => ({
          [styleKey]: x
        }));
        if (objectsHaveSameKeys(breakpointsValues, value)) {
          css2[styleKey] = styleFunctionSx({
            sx: value,
            theme
          });
        } else {
          css2 = merge_default(css2, breakpointsValues);
        }
      }
    } else {
      css2 = merge_default(css2, getThemeValue_default(styleKey, value, theme));
    }
  });
  return removeUnusedBreakpoints(breakpointsKeys, css2);
}
styleFunctionSx.filterProps = ["sx"];
var styleFunctionSx_default = styleFunctionSx;

// ../../node_modules/@material-ui/core/styles/createBreakpoints.js
function createBreakpoints(breakpoints) {
  const {
    values: values3 = {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    },
    unit = "px",
    step = 5
  } = breakpoints, other = _objectWithoutPropertiesLoose(breakpoints, ["values", "unit", "step"]);
  const keys = Object.keys(values3);
  function up(key) {
    const value = typeof values3[key] === "number" ? values3[key] : key;
    return `@media (min-width:${value}${unit})`;
  }
  function down(key) {
    const value = typeof values3[key] === "number" ? values3[key] : key;
    return `@media (max-width:${value - step / 100}${unit})`;
  }
  function between(start, end) {
    const endIndex = keys.indexOf(end);
    return `@media (min-width:${typeof values3[start] === "number" ? values3[start] : start}${unit}) and (max-width:${(endIndex !== -1 && typeof values3[keys[endIndex]] === "number" ? values3[keys[endIndex]] : end) - step / 100}${unit})`;
  }
  function only(key) {
    if (keys.indexOf(key) + 1 < keys.length) {
      return between(key, keys[keys.indexOf(key) + 1]);
    }
    return up(key);
  }
  return _extends({
    keys,
    values: values3,
    up,
    down,
    between,
    only,
    unit
  }, other);
}

// ../../node_modules/@material-ui/core/styles/createMixins.js
function createMixins(breakpoints, spacing2, mixins) {
  return _extends({
    toolbar: {
      minHeight: 56,
      [`${breakpoints.up("xs")} and (orientation: landscape)`]: {
        minHeight: 48
      },
      [breakpoints.up("sm")]: {
        minHeight: 64
      }
    }
  }, mixins);
}

// ../../node_modules/@material-ui/core/colors/common.js
var common = {
  black: "#000",
  white: "#fff"
};
var common_default = common;

// ../../node_modules/@material-ui/core/colors/grey.js
var grey = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#d5d5d5",
  A200: "#aaaaaa",
  A400: "#303030",
  A700: "#616161"
};
var grey_default = grey;

// ../../node_modules/@material-ui/core/colors/indigo.js
var indigo = {
  50: "#e8eaf6",
  100: "#c5cae9",
  200: "#9fa8da",
  300: "#7986cb",
  400: "#5c6bc0",
  500: "#3f51b5",
  600: "#3949ab",
  700: "#303f9f",
  800: "#283593",
  900: "#1a237e",
  A100: "#8c9eff",
  A200: "#536dfe",
  A400: "#3d5afe",
  A700: "#304ffe"
};
var indigo_default = indigo;

// ../../node_modules/@material-ui/core/colors/pink.js
var pink = {
  50: "#fce4ec",
  100: "#f8bbd0",
  200: "#f48fb1",
  300: "#f06292",
  400: "#ec407a",
  500: "#e91e63",
  600: "#d81b60",
  700: "#c2185b",
  800: "#ad1457",
  900: "#880e4f",
  A100: "#ff80ab",
  A200: "#ff4081",
  A400: "#f50057",
  A700: "#c51162"
};
var pink_default = pink;

// ../../node_modules/@material-ui/core/colors/red.js
var red = {
  50: "#ffebee",
  100: "#ffcdd2",
  200: "#ef9a9a",
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  600: "#e53935",
  700: "#d32f2f",
  800: "#c62828",
  900: "#b71c1c",
  A100: "#ff8a80",
  A200: "#ff5252",
  A400: "#ff1744",
  A700: "#d50000"
};
var red_default = red;

// ../../node_modules/@material-ui/core/colors/orange.js
var orange = {
  50: "#fff3e0",
  100: "#ffe0b2",
  200: "#ffcc80",
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  600: "#fb8c00",
  700: "#f57c00",
  800: "#ef6c00",
  900: "#e65100",
  A100: "#ffd180",
  A200: "#ffab40",
  A400: "#ff9100",
  A700: "#ff6d00"
};
var orange_default = orange;

// ../../node_modules/@material-ui/core/colors/blue.js
var blue = {
  50: "#e3f2fd",
  100: "#bbdefb",
  200: "#90caf9",
  300: "#64b5f6",
  400: "#42a5f5",
  500: "#2196f3",
  600: "#1e88e5",
  700: "#1976d2",
  800: "#1565c0",
  900: "#0d47a1",
  A100: "#82b1ff",
  A200: "#448aff",
  A400: "#2979ff",
  A700: "#2962ff"
};
var blue_default = blue;

// ../../node_modules/@material-ui/core/colors/green.js
var green = {
  50: "#e8f5e9",
  100: "#c8e6c9",
  200: "#a5d6a7",
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  600: "#43a047",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20",
  A100: "#b9f6ca",
  A200: "#69f0ae",
  A400: "#00e676",
  A700: "#00c853"
};
var green_default = green;

// ../../node_modules/@material-ui/core/styles/colorManipulator.js
function clamp3(value, min = 0, max = 1) {
  if (false) {
    if (value < min || value > max) {
      console.error(`Material-UI: The value provided ${value} is out of range [${min}, ${max}].`);
    }
  }
  return Math.min(Math.max(min, value), max);
}
function hexToRgb(color3) {
  color3 = color3.substr(1);
  const re = new RegExp(`.{1,${color3.length >= 6 ? 2 : 1}}`, "g");
  let colors = color3.match(re);
  if (colors && colors[0].length === 1) {
    colors = colors.map((n) => n + n);
  }
  return colors ? `rgb${colors.length === 4 ? "a" : ""}(${colors.map((n, index) => {
    return index < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3;
  }).join(", ")})` : "";
}
function hslToRgb(color3) {
  color3 = decomposeColor(color3);
  const {
    values: values3
  } = color3;
  const h = values3[0];
  const s = values3[1] / 100;
  const l = values3[2] / 100;
  const a2 = s * Math.min(l, 1 - l);
  const f = (n, k = (n + h / 30) % 12) => l - a2 * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  let type = "rgb";
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
  if (color3.type === "hsla") {
    type += "a";
    rgb.push(values3[3]);
  }
  return recomposeColor({
    type,
    values: rgb
  });
}
function decomposeColor(color3) {
  if (color3.type) {
    return color3;
  }
  if (color3.charAt(0) === "#") {
    return decomposeColor(hexToRgb(color3));
  }
  const marker = color3.indexOf("(");
  const type = color3.substring(0, marker);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(type) === -1) {
    throw new Error(false ? `Material-UI: Unsupported \`${color3}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : formatMuiErrorMessage(9, color3));
  }
  let values3 = color3.substring(marker + 1, color3.length - 1);
  let colorSpace;
  if (type === "color") {
    values3 = values3.split(" ");
    colorSpace = values3.shift();
    if (values3.length === 4 && values3[3].charAt(0) === "/") {
      values3[3] = values3[3].substr(1);
    }
    if (["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(colorSpace) === -1) {
      throw new Error(false ? `Material-UI: unsupported \`${colorSpace}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : formatMuiErrorMessage(10, colorSpace));
    }
  } else {
    values3 = values3.split(",");
  }
  values3 = values3.map((value) => parseFloat(value));
  return {
    type,
    values: values3,
    colorSpace
  };
}
function recomposeColor(color3) {
  const {
    type,
    colorSpace
  } = color3;
  let {
    values: values3
  } = color3;
  if (type.indexOf("rgb") !== -1) {
    values3 = values3.map((n, i) => i < 3 ? parseInt(n, 10) : n);
  } else if (type.indexOf("hsl") !== -1) {
    values3[1] = `${values3[1]}%`;
    values3[2] = `${values3[2]}%`;
  }
  if (type.indexOf("color") !== -1) {
    values3 = `${colorSpace} ${values3.join(" ")}`;
  } else {
    values3 = `${values3.join(", ")}`;
  }
  return `${type}(${values3})`;
}
function getContrastRatio(foreground, background) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
function getLuminance(color3) {
  color3 = decomposeColor(color3);
  let rgb = color3.type === "hsl" ? decomposeColor(hslToRgb(color3)).values : color3.values;
  rgb = rgb.map((val) => {
    if (color3.type !== "color") {
      val /= 255;
    }
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });
  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
}
function alpha2(color3, value) {
  color3 = decomposeColor(color3);
  value = clamp3(value);
  if (color3.type === "rgb" || color3.type === "hsl") {
    color3.type += "a";
  }
  if (color3.type === "color") {
    color3.values[3] = `/${value}`;
  } else {
    color3.values[3] = value;
  }
  return recomposeColor(color3);
}
function darken(color3, coefficient) {
  color3 = decomposeColor(color3);
  coefficient = clamp3(coefficient);
  if (color3.type.indexOf("hsl") !== -1) {
    color3.values[2] *= 1 - coefficient;
  } else if (color3.type.indexOf("rgb") !== -1 || color3.type.indexOf("color") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color3.values[i] *= 1 - coefficient;
    }
  }
  return recomposeColor(color3);
}
function lighten(color3, coefficient) {
  color3 = decomposeColor(color3);
  coefficient = clamp3(coefficient);
  if (color3.type.indexOf("hsl") !== -1) {
    color3.values[2] += (100 - color3.values[2]) * coefficient;
  } else if (color3.type.indexOf("rgb") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color3.values[i] += (255 - color3.values[i]) * coefficient;
    }
  } else if (color3.type.indexOf("color") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color3.values[i] += (1 - color3.values[i]) * coefficient;
    }
  }
  return recomposeColor(color3);
}

// ../../node_modules/@material-ui/core/styles/createPalette.js
var light = {
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.6)",
    disabled: "rgba(0, 0, 0, 0.38)"
  },
  divider: "rgba(0, 0, 0, 0.12)",
  background: {
    paper: common_default.white,
    default: common_default.white
  },
  action: {
    active: "rgba(0, 0, 0, 0.54)",
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  }
};
var dark = {
  text: {
    primary: common_default.white,
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
    icon: "rgba(255, 255, 255, 0.5)"
  },
  divider: "rgba(255, 255, 255, 0.12)",
  background: {
    paper: "#121212",
    default: "#121212"
  },
  action: {
    active: common_default.white,
    hover: "rgba(255, 255, 255, 0.08)",
    hoverOpacity: 0.08,
    selected: "rgba(255, 255, 255, 0.16)",
    selectedOpacity: 0.16,
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(255, 255, 255, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  }
};
function addLightOrDark(intent, direction, shade, tonalOffset) {
  const tonalOffsetLight = tonalOffset.light || tonalOffset;
  const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === "light") {
      intent.light = lighten(intent.main, tonalOffsetLight);
    } else if (direction === "dark") {
      intent.dark = darken(intent.main, tonalOffsetDark);
    }
  }
}
function createPalette(palette2) {
  const {
    primary = {
      light: indigo_default[300],
      main: indigo_default[500],
      dark: indigo_default[700]
    },
    secondary = {
      light: pink_default.A200,
      main: pink_default.A400,
      dark: pink_default.A700
    },
    error = {
      light: red_default[300],
      main: red_default[500],
      dark: red_default[700]
    },
    warning: warning2 = {
      light: orange_default[300],
      main: orange_default[500],
      dark: orange_default[700]
    },
    info = {
      light: blue_default[300],
      main: blue_default[500],
      dark: blue_default[700]
    },
    success = {
      light: green_default[300],
      main: green_default[500],
      dark: green_default[700]
    },
    mode = "light",
    contrastThreshold = 3,
    tonalOffset = 0.2
  } = palette2, other = _objectWithoutPropertiesLoose(palette2, ["primary", "secondary", "error", "warning", "info", "success", "mode", "contrastThreshold", "tonalOffset"]);
  function getContrastText(background) {
    const contrastText = getContrastRatio(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;
    if (false) {
      const contrast = getContrastRatio(background, contrastText);
      if (contrast < 3) {
        console.error([`Material-UI: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join("\n"));
      }
    }
    return contrastText;
  }
  const augmentColor = ({
    color: color3,
    name,
    mainShade = 500,
    lightShade = 300,
    darkShade = 700
  }) => {
    color3 = _extends({}, color3);
    if (!color3.main && color3[mainShade]) {
      color3.main = color3[mainShade];
    }
    if (!color3.hasOwnProperty("main")) {
      throw new Error(false ? `Material-UI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${mainShade}\` property.` : formatMuiErrorMessage(11, name ? ` (${name})` : "", mainShade));
    }
    if (typeof color3.main !== "string") {
      throw new Error(false ? `Material-UI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(color3.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@material-ui/core/colors";

const theme1 = createMuiTheme({ palette: {
  primary: green,
} });

const theme2 = createMuiTheme({ palette: {
  primary: { main: green[500] },
} });` : formatMuiErrorMessage(12, name ? ` (${name})` : "", JSON.stringify(color3.main)));
    }
    addLightOrDark(color3, "light", lightShade, tonalOffset);
    addLightOrDark(color3, "dark", darkShade, tonalOffset);
    if (!color3.contrastText) {
      color3.contrastText = getContrastText(color3.main);
    }
    return color3;
  };
  const modes = {
    dark,
    light
  };
  if (false) {
    if (!modes[mode]) {
      console.error(`Material-UI: The palette mode \`${mode}\` is not supported.`);
    }
  }
  const paletteOutput = deepmerge(_extends({
    common: common_default,
    mode,
    primary: augmentColor({
      color: primary,
      name: "primary"
    }),
    secondary: augmentColor({
      color: secondary,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    error: augmentColor({
      color: error,
      name: "error"
    }),
    warning: augmentColor({
      color: warning2,
      name: "warning"
    }),
    info: augmentColor({
      color: info,
      name: "info"
    }),
    success: augmentColor({
      color: success,
      name: "success"
    }),
    grey: grey_default,
    contrastThreshold,
    getContrastText,
    augmentColor,
    tonalOffset
  }, modes[mode]), other);
  return paletteOutput;
}

// ../../node_modules/@material-ui/core/styles/createTypography.js
function round(value) {
  return Math.round(value * 1e5) / 1e5;
}
var caseAllCaps = {
  textTransform: "uppercase"
};
var defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';
function createTypography(palette2, typography2) {
  const _ref = typeof typography2 === "function" ? typography2(palette2) : typography2, {
    fontFamily: fontFamily2 = defaultFontFamily,
    fontSize: fontSize2 = 14,
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 700,
    htmlFontSize = 16,
    allVariants,
    pxToRem: pxToRem2
  } = _ref, other = _objectWithoutPropertiesLoose(_ref, ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"]);
  if (false) {
    if (typeof fontSize2 !== "number") {
      console.error("Material-UI: `fontSize` is required to be a number.");
    }
    if (typeof htmlFontSize !== "number") {
      console.error("Material-UI: `htmlFontSize` is required to be a number.");
    }
  }
  const coef = fontSize2 / 14;
  const pxToRem = pxToRem2 || ((size) => `${size / htmlFontSize * coef}rem`);
  const buildVariant = (fontWeight2, size, lineHeight2, letterSpacing2, casing) => _extends({
    fontFamily: fontFamily2,
    fontWeight: fontWeight2,
    fontSize: pxToRem(size),
    lineHeight: lineHeight2
  }, fontFamily2 === defaultFontFamily ? {
    letterSpacing: `${round(letterSpacing2 / size)}em`
  } : {}, casing, allVariants);
  const variants = {
    h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
    body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
    button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
    caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps)
  };
  return deepmerge(_extends({
    htmlFontSize,
    pxToRem,
    fontFamily: fontFamily2,
    fontSize: fontSize2,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold
  }, variants), other, {
    clone: false
  });
}

// ../../node_modules/@material-ui/core/styles/shadows.js
var shadowKeyUmbraOpacity = 0.2;
var shadowKeyPenumbraOpacity = 0.14;
var shadowAmbientShadowOpacity = 0.12;
function createShadow(...px2) {
  return [`${px2[0]}px ${px2[1]}px ${px2[2]}px ${px2[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`, `${px2[4]}px ${px2[5]}px ${px2[6]}px ${px2[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`, `${px2[8]}px ${px2[9]}px ${px2[10]}px ${px2[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`].join(",");
}
var shadows = ["none", createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)];
var shadows_default2 = shadows;

// ../../node_modules/@material-ui/core/styles/shape.js
var shape = {
  borderRadius: 4
};
var shape_default = shape;

// ../../node_modules/@material-ui/core/styles/createSpacing.js
function createSpacing(spacingInput = 8) {
  if (spacingInput.mui) {
    return spacingInput;
  }
  const transform3 = createUnarySpacing({
    spacing: spacingInput
  });
  const spacing2 = (...argsInput) => {
    if (false) {
      if (!(argsInput.length <= 4)) {
        console.error(`Material-UI: Too many arguments provided, expected between 0 and 4, got ${argsInput.length}`);
      }
    }
    const args = argsInput.length === 0 ? [1] : argsInput;
    return args.map((argument) => {
      const output = transform3(argument);
      return typeof output === "number" ? `${output}px` : output;
    }).join(" ");
  };
  spacing2.mui = true;
  return spacing2;
}

// ../../node_modules/@material-ui/core/styles/transitions.js
var easing = {
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
};
var duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  standard: 300,
  complex: 375,
  enteringScreen: 225,
  leavingScreen: 195
};
function formatMs(milliseconds) {
  return `${Math.round(milliseconds)}ms`;
}
function create(props = ["all"], options = {}) {
  const {
    duration: durationOption = duration.standard,
    easing: easingOption = easing.easeInOut,
    delay = 0
  } = options, other = _objectWithoutPropertiesLoose(options, ["duration", "easing", "delay"]);
  if (false) {
    const isString2 = (value) => typeof value === "string";
    const isNumber = (value) => !isNaN(parseFloat(value));
    if (!isString2(props) && !Array.isArray(props)) {
      console.error('Material-UI: Argument "props" must be a string or Array.');
    }
    if (!isNumber(durationOption) && !isString2(durationOption)) {
      console.error(`Material-UI: Argument "duration" must be a number or a string but found ${durationOption}.`);
    }
    if (!isString2(easingOption)) {
      console.error('Material-UI: Argument "easing" must be a string.');
    }
    if (!isNumber(delay) && !isString2(delay)) {
      console.error('Material-UI: Argument "delay" must be a number or a string.');
    }
    if (Object.keys(other).length !== 0) {
      console.error(`Material-UI: Unrecognized argument(s) [${Object.keys(other).join(",")}].`);
    }
  }
  return (Array.isArray(props) ? props : [props]).map((animatedProp) => `${animatedProp} ${typeof durationOption === "string" ? durationOption : formatMs(durationOption)} ${easingOption} ${typeof delay === "string" ? delay : formatMs(delay)}`).join(",");
}
function getAutoHeightDuration(height2) {
  if (!height2) {
    return 0;
  }
  const constant = height2 / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}

// ../../node_modules/@material-ui/core/styles/zIndex.js
var zIndex2 = {
  mobileStepper: 1e3,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
var zIndex_default = zIndex2;

// ../../node_modules/@material-ui/core/styles/createMuiTheme.js
function createMuiTheme(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput = {},
    mixins: mixinsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    typography: typographyInput = {}
  } = options, other = _objectWithoutPropertiesLoose(options, ["breakpoints", "mixins", "palette", "spacing", "typography"]);
  const palette2 = createPalette(paletteInput);
  const breakpoints = createBreakpoints(breakpointsInput);
  const spacing2 = createSpacing(spacingInput);
  let muiTheme = deepmerge({
    breakpoints,
    direction: "ltr",
    mixins: createMixins(breakpoints, spacing2, mixinsInput),
    components: {},
    palette: palette2,
    shadows: shadows_default2.slice(),
    typography: createTypography(palette2, typographyInput),
    spacing: spacing2,
    shape: _extends({}, shape_default),
    transitions: {
      duration,
      easing,
      create,
      getAutoHeightDuration
    },
    zIndex: _extends({}, zIndex_default)
  }, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  if (false) {
    const pseudoClasses = ["active", "checked", "disabled", "error", "focused", "focusVisible", "required", "expanded", "selected"];
    const traverse = (node2, component) => {
      let key;
      for (key in node2) {
        const child = node2[key];
        if (pseudoClasses.indexOf(key) !== -1 && Object.keys(child).length > 0) {
          if (false) {
            const pseudoClass = generateUtilityClass("", key);
            console.error([`Material-UI: The \`${component}\` component increases the CSS specificity of the \`${key}\` internal state.`, "You can not override it like this: ", JSON.stringify(node2, null, 2), "", `Instead, you need to use the '&.${pseudoClass}' syntax:`, JSON.stringify({
              root: {
                [`&.${pseudoClass}`]: child
              }
            }, null, 2), "", "https://material-ui.com/r/pseudo-classes-guide"].join("\n"));
          }
          node2[key] = {};
        }
      }
    };
    Object.keys(muiTheme.components).forEach((component) => {
      const styleOverrides = muiTheme.components[component].styleOverrides;
      if (styleOverrides && component.indexOf("Mui") === 0) {
        traverse(styleOverrides, component);
      }
    });
  }
  return muiTheme;
}
var createMuiTheme_default = createMuiTheme;

// ../../node_modules/@material-ui/core/styles/defaultTheme.js
var defaultTheme = createMuiTheme_default();
var defaultTheme_default = defaultTheme;

// ../../node_modules/@material-ui/core/styles/experimentalStyled.js
function isEmpty2(obj) {
  return Object.keys(obj).length === 0;
}
var getStyleOverrides = (name, theme) => {
  if (theme.components && theme.components[name] && theme.components[name].styleOverrides) {
    return theme.components[name].styleOverrides;
  }
  return null;
};
var getVariantStyles = (name, theme) => {
  let variants = [];
  if (theme && theme.components && theme.components[name] && theme.components[name].variants) {
    variants = theme.components[name].variants;
  }
  const variantsStyles = {};
  variants.forEach((definition) => {
    const key = propsToClassKey(definition.props);
    variantsStyles[key] = definition.style;
  });
  return variantsStyles;
};
var variantsResolver = (props, styles, theme, name) => {
  var _theme$components, _theme$components$nam;
  const {
    styleProps = {}
  } = props;
  let variantsStyles = {};
  const themeVariants = theme === null || theme === void 0 ? void 0 : (_theme$components = theme.components) === null || _theme$components === void 0 ? void 0 : (_theme$components$nam = _theme$components[name]) === null || _theme$components$nam === void 0 ? void 0 : _theme$components$nam.variants;
  if (themeVariants) {
    themeVariants.forEach((themeVariant) => {
      let isMatch = true;
      Object.keys(themeVariant.props).forEach((key) => {
        if (styleProps[key] !== themeVariant.props[key] && props[key] !== themeVariant.props[key]) {
          isMatch = false;
        }
      });
      if (isMatch) {
        variantsStyles = _extends({}, variantsStyles, styles[propsToClassKey(themeVariant.props)]);
      }
    });
  }
  return variantsStyles;
};
var rootShouldForwardProp = (prop) => prop !== "styleProps" && prop !== "theme" && prop !== "isRtl" && prop !== "sx" && prop !== "as" && prop !== "classes";
var slotShouldForwardProp = (prop) => prop !== "styleProps" && prop !== "theme" && prop !== "isRtl" && prop !== "sx" && prop !== "as";
var lowercaseFirstLetter = (string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};
var experimentalStyled = (tag, options, muiOptions = {}) => {
  const componentName = muiOptions.name;
  const componentSlot = muiOptions.slot;
  const overridesResolver = muiOptions.overridesResolver;
  const skipVariantsResolver = muiOptions.skipVariantsResolver !== void 0 ? muiOptions.skipVariantsResolver : componentSlot && componentSlot !== "Root" || false;
  const skipSx = muiOptions.skipSx || false;
  let displayName;
  let className;
  if (componentName) {
    displayName = `${componentName}${componentSlot || ""}`;
    className = `${componentName}-${lowercaseFirstLetter(componentSlot || "Root")}`;
  }
  const defaultStyledResolver = emotion_styled_browser_esm_default(tag, _extends({}, !componentSlot || componentSlot === "Root" ? {
    shouldForwardProp: rootShouldForwardProp
  } : {
    shouldForwardProp: slotShouldForwardProp
  }, {
    label: className || componentName || ""
  }, options));
  const muiStyledResolver = (styleArg, ...expressions) => {
    const expressionsWithDefaultTheme = expressions ? expressions.map((stylesArg) => {
      return typeof stylesArg === "function" ? (_ref) => {
        let {
          theme: themeInput
        } = _ref, other = _objectWithoutPropertiesLoose(_ref, ["theme"]);
        return stylesArg(_extends({
          theme: isEmpty2(themeInput) ? defaultTheme_default : themeInput
        }, other));
      } : stylesArg;
    }) : [];
    let transformedStyleArg = styleArg;
    if (componentName && overridesResolver) {
      expressionsWithDefaultTheme.push((props) => {
        const theme = isEmpty2(props.theme) ? defaultTheme_default : props.theme;
        const styleOverrides = getStyleOverrides(componentName, theme);
        if (styleOverrides) {
          return overridesResolver(props, styleOverrides);
        }
        return null;
      });
    }
    if (componentName && overridesResolver && !skipVariantsResolver) {
      expressionsWithDefaultTheme.push((props) => {
        const theme = isEmpty2(props.theme) ? defaultTheme_default : props.theme;
        return variantsResolver(props, getVariantStyles(componentName, theme), theme, componentName);
      });
    }
    if (!skipSx) {
      expressionsWithDefaultTheme.push((props) => {
        const theme = isEmpty2(props.theme) ? defaultTheme_default : props.theme;
        return styleFunctionSx_default(_extends({}, props, {
          theme
        }));
      });
    }
    const numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;
    if (Array.isArray(styleArg) && numOfCustomFnsApplied > 0) {
      const placeholders = new Array(numOfCustomFnsApplied).fill("");
      transformedStyleArg = [...styleArg, ...placeholders];
      transformedStyleArg.raw = [...styleArg.raw, ...placeholders];
    } else if (typeof styleArg === "function") {
      transformedStyleArg = (_ref2) => {
        let {
          theme: themeInput
        } = _ref2, other = _objectWithoutPropertiesLoose(_ref2, ["theme"]);
        return styleArg(_extends({
          theme: isEmpty2(themeInput) ? defaultTheme_default : themeInput
        }, other));
      };
    }
    const Component3 = defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);
    if (displayName) {
      Component3.displayName = displayName;
    }
    return Component3;
  };
  return muiStyledResolver;
};
var experimentalStyled_default = experimentalStyled;

// ../../node_modules/@material-ui/core/styles/useTheme.js
var React15 = __toModule(require_react());
function useTheme3() {
  const theme = useTheme2() || defaultTheme_default;
  if (false) {
    React15.useDebugValue(theme);
  }
  return theme;
}

// ../../node_modules/@material-ui/core/styles/useThemeProps.js
function useThemeProps({
  props,
  name
}) {
  const contextTheme = useTheme3() || defaultTheme_default;
  const more = getThemeProps({
    theme: contextTheme,
    name,
    props
  });
  const theme = more.theme || contextTheme;
  return _extends({
    theme,
    isRtl: theme.direction === "rtl"
  }, more);
}

// ../../node_modules/@material-ui/core/utils/useForkRef.js
var useForkRef_default = useForkRef;

// ../../node_modules/@material-ui/core/utils/useEventCallback.js
var useEventCallback_default = useEventCallback;

// ../../node_modules/@material-ui/core/utils/useIsFocusVisible.js
var useIsFocusVisible_default = useIsFocusVisible;

// ../../node_modules/@material-ui/core/ButtonBase/TouchRipple.js
var React19 = __toModule(require_react());
var import_prop_types4 = __toModule(require_prop_types());

// ../../node_modules/react-transition-group/esm/TransitionGroupContext.js
var import_react45 = __toModule(require_react());
var TransitionGroupContext_default = import_react45.default.createContext(null);

// ../../node_modules/react-transition-group/esm/TransitionGroup.js
var import_prop_types2 = __toModule(require_prop_types());
var import_react47 = __toModule(require_react());

// ../../node_modules/react-transition-group/esm/utils/ChildMapping.js
var import_react46 = __toModule(require_react());
function getChildMapping(children, mapFn) {
  var mapper = function mapper2(child) {
    return mapFn && (0, import_react46.isValidElement)(child) ? mapFn(child) : child;
  };
  var result = Object.create(null);
  if (children)
    import_react46.Children.map(children, function(c2) {
      return c2;
    }).forEach(function(child) {
      result[child.key] = mapper(child);
    });
  return result;
}
function mergeChildMappings(prev2, next2) {
  prev2 = prev2 || {};
  next2 = next2 || {};
  function getValueForKey(key) {
    return key in next2 ? next2[key] : prev2[key];
  }
  var nextKeysPending = Object.create(null);
  var pendingKeys = [];
  for (var prevKey in prev2) {
    if (prevKey in next2) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }
  var i;
  var childMapping = {};
  for (var nextKey in next2) {
    if (nextKeysPending[nextKey]) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }
  return childMapping;
}
function getProp(child, prop, props) {
  return props[prop] != null ? props[prop] : child.props[prop];
}
function getInitialChildMapping(props, onExited) {
  return getChildMapping(props.children, function(child) {
    return (0, import_react46.cloneElement)(child, {
      onExited: onExited.bind(null, child),
      in: true,
      appear: getProp(child, "appear", props),
      enter: getProp(child, "enter", props),
      exit: getProp(child, "exit", props)
    });
  });
}
function getNextChildMapping(nextProps, prevChildMapping, onExited) {
  var nextChildMapping = getChildMapping(nextProps.children);
  var children = mergeChildMappings(prevChildMapping, nextChildMapping);
  Object.keys(children).forEach(function(key) {
    var child = children[key];
    if (!(0, import_react46.isValidElement)(child))
      return;
    var hasPrev = key in prevChildMapping;
    var hasNext = key in nextChildMapping;
    var prevChild = prevChildMapping[key];
    var isLeaving = (0, import_react46.isValidElement)(prevChild) && !prevChild.props.in;
    if (hasNext && (!hasPrev || isLeaving)) {
      children[key] = (0, import_react46.cloneElement)(child, {
        onExited: onExited.bind(null, child),
        in: true,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    } else if (!hasNext && hasPrev && !isLeaving) {
      children[key] = (0, import_react46.cloneElement)(child, {
        in: false
      });
    } else if (hasNext && hasPrev && (0, import_react46.isValidElement)(prevChild)) {
      children[key] = (0, import_react46.cloneElement)(child, {
        onExited: onExited.bind(null, child),
        in: prevChild.props.in,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    }
  });
  return children;
}

// ../../node_modules/react-transition-group/esm/TransitionGroup.js
var values2 = Object.values || function(obj) {
  return Object.keys(obj).map(function(k) {
    return obj[k];
  });
};
var defaultProps = {
  component: "div",
  childFactory: function childFactory(child) {
    return child;
  }
};
var TransitionGroup = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(TransitionGroup2, _React$Component);
  function TransitionGroup2(props, context) {
    var _this;
    _this = _React$Component.call(this, props, context) || this;
    var handleExited = _this.handleExited.bind(_assertThisInitialized(_this));
    _this.state = {
      contextValue: {
        isMounting: true
      },
      handleExited,
      firstRender: true
    };
    return _this;
  }
  var _proto = TransitionGroup2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.mounted = true;
    this.setState({
      contextValue: {
        isMounting: false
      }
    });
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
  };
  TransitionGroup2.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
    var prevChildMapping = _ref.children, handleExited = _ref.handleExited, firstRender = _ref.firstRender;
    return {
      children: firstRender ? getInitialChildMapping(nextProps, handleExited) : getNextChildMapping(nextProps, prevChildMapping, handleExited),
      firstRender: false
    };
  };
  _proto.handleExited = function handleExited(child, node2) {
    var currentChildMapping = getChildMapping(this.props.children);
    if (child.key in currentChildMapping)
      return;
    if (child.props.onExited) {
      child.props.onExited(node2);
    }
    if (this.mounted) {
      this.setState(function(state) {
        var children = _extends({}, state.children);
        delete children[child.key];
        return {
          children
        };
      });
    }
  };
  _proto.render = function render2() {
    var _this$props = this.props, Component3 = _this$props.component, childFactory2 = _this$props.childFactory, props = _objectWithoutPropertiesLoose(_this$props, ["component", "childFactory"]);
    var contextValue = this.state.contextValue;
    var children = values2(this.state.children).map(childFactory2);
    delete props.appear;
    delete props.enter;
    delete props.exit;
    if (Component3 === null) {
      return /* @__PURE__ */ import_react47.default.createElement(TransitionGroupContext_default.Provider, {
        value: contextValue
      }, children);
    }
    return /* @__PURE__ */ import_react47.default.createElement(TransitionGroupContext_default.Provider, {
      value: contextValue
    }, /* @__PURE__ */ import_react47.default.createElement(Component3, props, children));
  };
  return TransitionGroup2;
}(import_react47.default.Component);
TransitionGroup.propTypes = false ? {
  component: import_prop_types2.default.any,
  children: import_prop_types2.default.node,
  appear: import_prop_types2.default.bool,
  enter: import_prop_types2.default.bool,
  exit: import_prop_types2.default.bool,
  childFactory: import_prop_types2.default.func
} : {};
TransitionGroup.defaultProps = defaultProps;
var TransitionGroup_default = TransitionGroup;

// ../../node_modules/@material-ui/core/ButtonBase/Ripple.js
var React18 = __toModule(require_react());
var import_prop_types3 = __toModule(require_prop_types());

// ../../node_modules/@material-ui/core/utils/useEnhancedEffect.js
var useEnhancedEffect_default2 = useEnhancedEffect_default;

// ../../node_modules/@material-ui/core/ButtonBase/Ripple.js
var import_jsx_runtime = __toModule(require_jsx_runtime());
function Ripple(props) {
  const {
    className,
    classes,
    pulsate = false,
    rippleX,
    rippleY,
    rippleSize,
    in: inProp,
    onExited = () => {
    },
    timeout
  } = props;
  const [leaving, setLeaving] = React18.useState(false);
  const rippleClassName = clsx_m_default(className, classes.ripple, classes.rippleVisible, pulsate && classes.ripplePulsate);
  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX
  };
  const childClassName = clsx_m_default(classes.child, leaving && classes.childLeaving, pulsate && classes.childPulsate);
  const handleExited = useEventCallback_default(onExited);
  useEnhancedEffect_default2(() => {
    if (!inProp) {
      setLeaving(true);
      const timeoutId = setTimeout(handleExited, timeout);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    return void 0;
  }, [handleExited, inProp, timeout]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
    className: rippleClassName,
    style: rippleStyles,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
      className: childClassName
    })
  });
}
false ? Ripple.propTypes = {
  classes: import_prop_types3.default.object.isRequired,
  className: import_prop_types3.default.string,
  in: import_prop_types3.default.bool,
  onExited: import_prop_types3.default.func,
  pulsate: import_prop_types3.default.bool,
  rippleSize: import_prop_types3.default.number,
  rippleX: import_prop_types3.default.number,
  rippleY: import_prop_types3.default.number,
  timeout: import_prop_types3.default.number.isRequired
} : void 0;
var Ripple_default = Ripple;

// ../../node_modules/@material-ui/core/ButtonBase/touchRippleClasses.js
var touchRippleClasses = generateUtilityClasses("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]);
var touchRippleClasses_default = touchRippleClasses;

// ../../node_modules/@material-ui/core/ButtonBase/TouchRipple.js
var import_jsx_runtime2 = __toModule(require_jsx_runtime());
var _ = (t) => t;
var _t;
var _t2;
var _t3;
var _t4;
var DURATION = 550;
var DELAY_RIPPLE = 80;
var enterKeyframe = keyframes3(_t || (_t = _`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`));
var exitKeyframe = keyframes3(_t2 || (_t2 = _`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`));
var pulsateKeyframe = keyframes3(_t3 || (_t3 = _`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`));
var TouchRippleRoot = experimentalStyled_default("span", {}, {
  name: "MuiTouchRipple",
  slot: "Root"
})({
  overflow: "hidden",
  pointerEvents: "none",
  position: "absolute",
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: "inherit"
});
var TouchRippleRipple = experimentalStyled_default(Ripple_default, {}, {
  name: "MuiTouchRipple",
  slot: "Ripple"
})(_t4 || (_t4 = _`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    left: 0;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`), touchRippleClasses_default.rippleVisible, enterKeyframe, DURATION, ({
  theme
}) => theme.transitions.easing.easeInOut, touchRippleClasses_default.ripplePulsate, ({
  theme
}) => theme.transitions.duration.shorter, touchRippleClasses_default.child, touchRippleClasses_default.childLeaving, exitKeyframe, DURATION, ({
  theme
}) => theme.transitions.easing.easeInOut, touchRippleClasses_default.childPulsate, pulsateKeyframe, ({
  theme
}) => theme.transitions.easing.easeInOut);
var TouchRipple = /* @__PURE__ */ React19.forwardRef(function TouchRipple2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiTouchRipple"
  });
  const {
    center: centerProp = false,
    classes = {},
    className
  } = props, other = _objectWithoutPropertiesLoose(props, ["center", "classes", "className"]);
  const [ripples, setRipples] = React19.useState([]);
  const nextKey = React19.useRef(0);
  const rippleCallback = React19.useRef(null);
  React19.useEffect(() => {
    if (rippleCallback.current) {
      rippleCallback.current();
      rippleCallback.current = null;
    }
  }, [ripples]);
  const ignoringMouseDown = React19.useRef(false);
  const startTimer = React19.useRef(null);
  const startTimerCommit = React19.useRef(null);
  const container = React19.useRef(null);
  React19.useEffect(() => {
    return () => {
      clearTimeout(startTimer.current);
    };
  }, []);
  const startCommit = React19.useCallback((params) => {
    const {
      pulsate: pulsate2,
      rippleX,
      rippleY,
      rippleSize,
      cb: cb2
    } = params;
    setRipples((oldRipples) => [...oldRipples, /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TouchRippleRipple, {
      classes: {
        ripple: clsx_m_default(classes.ripple, touchRippleClasses_default.ripple),
        rippleVisible: clsx_m_default(classes.rippleVisible, touchRippleClasses_default.rippleVisible),
        ripplePulsate: clsx_m_default(classes.ripplePulsate, touchRippleClasses_default.ripplePulsate),
        child: clsx_m_default(classes.child, touchRippleClasses_default.child),
        childLeaving: clsx_m_default(classes.childLeaving, touchRippleClasses_default.childLeaving),
        childPulsate: clsx_m_default(classes.childPulsate, touchRippleClasses_default.childPulsate)
      },
      timeout: DURATION,
      pulsate: pulsate2,
      rippleX,
      rippleY,
      rippleSize
    }, nextKey.current)]);
    nextKey.current += 1;
    rippleCallback.current = cb2;
  }, [classes]);
  const start = React19.useCallback((event = {}, options = {}, cb2) => {
    const {
      pulsate: pulsate2 = false,
      center = centerProp || options.pulsate,
      fakeElement = false
    } = options;
    if (event.type === "mousedown" && ignoringMouseDown.current) {
      ignoringMouseDown.current = false;
      return;
    }
    if (event.type === "touchstart") {
      ignoringMouseDown.current = true;
    }
    const element = fakeElement ? null : container.current;
    const rect = element ? element.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
    let rippleX;
    let rippleY;
    let rippleSize;
    if (center || event.clientX === 0 && event.clientY === 0 || !event.clientX && !event.touches) {
      rippleX = Math.round(rect.width / 2);
      rippleY = Math.round(rect.height / 2);
    } else {
      const {
        clientX,
        clientY
      } = event.touches ? event.touches[0] : event;
      rippleX = Math.round(clientX - rect.left);
      rippleY = Math.round(clientY - rect.top);
    }
    if (center) {
      rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);
      if (rippleSize % 2 === 0) {
        rippleSize += 1;
      }
    } else {
      const sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
      const sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
      rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
    }
    if (event.touches) {
      if (startTimerCommit.current === null) {
        startTimerCommit.current = () => {
          startCommit({
            pulsate: pulsate2,
            rippleX,
            rippleY,
            rippleSize,
            cb: cb2
          });
        };
        startTimer.current = setTimeout(() => {
          if (startTimerCommit.current) {
            startTimerCommit.current();
            startTimerCommit.current = null;
          }
        }, DELAY_RIPPLE);
      }
    } else {
      startCommit({
        pulsate: pulsate2,
        rippleX,
        rippleY,
        rippleSize,
        cb: cb2
      });
    }
  }, [centerProp, startCommit]);
  const pulsate = React19.useCallback(() => {
    start({}, {
      pulsate: true
    });
  }, [start]);
  const stop = React19.useCallback((event, cb2) => {
    clearTimeout(startTimer.current);
    if (event.type === "touchend" && startTimerCommit.current) {
      startTimerCommit.current();
      startTimerCommit.current = null;
      startTimer.current = setTimeout(() => {
        stop(event, cb2);
      });
      return;
    }
    startTimerCommit.current = null;
    setRipples((oldRipples) => {
      if (oldRipples.length > 0) {
        return oldRipples.slice(1);
      }
      return oldRipples;
    });
    rippleCallback.current = cb2;
  }, []);
  React19.useImperativeHandle(ref, () => ({
    pulsate,
    start,
    stop
  }), [pulsate, start, stop]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TouchRippleRoot, _extends({
    className: clsx_m_default(classes.root, touchRippleClasses_default.root, className),
    ref: container
  }, other, {
    children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TransitionGroup_default, {
      component: null,
      exit: true,
      children: ripples
    })
  }));
});
false ? TouchRipple.propTypes = {
  center: import_prop_types4.default.bool,
  classes: import_prop_types4.default.object,
  className: import_prop_types4.default.string
} : void 0;
var TouchRipple_default = TouchRipple;

// ../../node_modules/@material-ui/core/ButtonBase/buttonBaseClasses.js
function getButtonBaseUtilityClass(slot) {
  return generateUtilityClass("MuiButtonBase", slot);
}
var buttonBaseClasses = generateUtilityClasses("MuiButtonBase", ["root", "disabled", "focusVisible"]);
var buttonBaseClasses_default = buttonBaseClasses;

// ../../node_modules/@material-ui/core/ButtonBase/ButtonBase.js
var import_jsx_runtime3 = __toModule(require_jsx_runtime());
var import_jsx_runtime4 = __toModule(require_jsx_runtime());
var useUtilityClasses = (styleProps) => {
  const {
    disabled,
    focusVisible,
    focusVisibleClassName,
    classes
  } = styleProps;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible"]
  };
  const composedClasses = composeClasses(slots, getButtonBaseUtilityClass, classes);
  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }
  return composedClasses;
};
var ButtonBaseRoot = experimentalStyled_default("button", {}, {
  name: "MuiButtonBase",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  WebkitTapHighlightColor: "transparent",
  backgroundColor: "transparent",
  outline: 0,
  border: 0,
  margin: 0,
  borderRadius: 0,
  padding: 0,
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  MozAppearance: "none",
  WebkitAppearance: "none",
  textDecoration: "none",
  color: "inherit",
  "&::-moz-focus-inner": {
    borderStyle: "none"
  },
  [`&.${buttonBaseClasses_default.disabled}`]: {
    pointerEvents: "none",
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
});
var ButtonBase = /* @__PURE__ */ React20.forwardRef(function ButtonBase2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiButtonBase"
  });
  const {
    action,
    centerRipple = false,
    children,
    className,
    component = "button",
    disabled = false,
    disableRipple = false,
    disableTouchRipple = false,
    focusRipple = false,
    LinkComponent = "a",
    onBlur,
    onClick,
    onContextMenu,
    onDragLeave,
    onFocus,
    onFocusVisible,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    tabIndex = 0,
    TouchRippleProps,
    type
  } = props, other = _objectWithoutPropertiesLoose(props, ["action", "centerRipple", "children", "className", "component", "disabled", "disableRipple", "disableTouchRipple", "focusRipple", "focusVisibleClassName", "LinkComponent", "onBlur", "onClick", "onContextMenu", "onDragLeave", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchMove", "onTouchStart", "tabIndex", "TouchRippleProps", "type"]);
  const buttonRef = React20.useRef(null);
  const rippleRef = React20.useRef(null);
  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible_default();
  const [focusVisible, setFocusVisible] = React20.useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }
  React20.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);
  React20.useImperativeHandle(action, () => ({
    focusVisible: () => {
      setFocusVisible(true);
      buttonRef.current.focus();
    }
  }), []);
  React20.useEffect(() => {
    if (focusVisible && focusRipple && !disableRipple) {
      rippleRef.current.pulsate();
    }
  }, [disableRipple, focusRipple, focusVisible]);
  function useRippleHandler(rippleAction, eventCallback, skipRippleAction = disableTouchRipple) {
    return useEventCallback_default((event) => {
      if (eventCallback) {
        eventCallback(event);
      }
      const ignore = skipRippleAction;
      if (!ignore && rippleRef.current) {
        rippleRef.current[rippleAction](event);
      }
      return true;
    });
  }
  const handleMouseDown = useRippleHandler("start", onMouseDown);
  const handleContextMenu = useRippleHandler("stop", onContextMenu);
  const handleDragLeave = useRippleHandler("stop", onDragLeave);
  const handleMouseUp = useRippleHandler("stop", onMouseUp);
  const handleMouseLeave = useRippleHandler("stop", (event) => {
    if (focusVisible) {
      event.preventDefault();
    }
    if (onMouseLeave) {
      onMouseLeave(event);
    }
  });
  const handleTouchStart = useRippleHandler("start", onTouchStart);
  const handleTouchEnd = useRippleHandler("stop", onTouchEnd);
  const handleTouchMove = useRippleHandler("stop", onTouchMove);
  const handleBlur = useRippleHandler("stop", (event) => {
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  }, false);
  const handleFocus = useEventCallback_default((event) => {
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
      if (onFocusVisible) {
        onFocusVisible(event);
      }
    }
    if (onFocus) {
      onFocus(event);
    }
  });
  const isNonNativeButton = () => {
    const button = buttonRef.current;
    return component && component !== "button" && !(button.tagName === "A" && button.href);
  };
  const keydownRef = React20.useRef(false);
  const handleKeyDown2 = useEventCallback_default((event) => {
    if (focusRipple && !keydownRef.current && focusVisible && rippleRef.current && event.key === " ") {
      keydownRef.current = true;
      rippleRef.current.stop(event, () => {
        rippleRef.current.start(event);
      });
    }
    if (event.target === event.currentTarget && isNonNativeButton() && event.key === " ") {
      event.preventDefault();
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
    if (event.target === event.currentTarget && isNonNativeButton() && event.key === "Enter" && !disabled) {
      event.preventDefault();
      if (onClick) {
        onClick(event);
      }
    }
  });
  const handleKeyUp = useEventCallback_default((event) => {
    if (focusRipple && event.key === " " && rippleRef.current && focusVisible && !event.defaultPrevented) {
      keydownRef.current = false;
      rippleRef.current.stop(event, () => {
        rippleRef.current.pulsate(event);
      });
    }
    if (onKeyUp) {
      onKeyUp(event);
    }
    if (onClick && event.target === event.currentTarget && isNonNativeButton() && event.key === " " && !event.defaultPrevented) {
      onClick(event);
    }
  });
  let ComponentProp = component;
  if (ComponentProp === "button" && other.href) {
    ComponentProp = LinkComponent;
  }
  const buttonProps = {};
  if (ComponentProp === "button") {
    buttonProps.type = type === void 0 ? "button" : type;
    buttonProps.disabled = disabled;
  } else {
    if (ComponentProp !== "a" || !other.href) {
      buttonProps.role = "button";
    }
    buttonProps["aria-disabled"] = disabled;
  }
  const handleOwnRef = useForkRef_default(focusVisibleRef, buttonRef);
  const handleRef = useForkRef_default(ref, handleOwnRef);
  const [mountedState, setMountedState] = React20.useState(false);
  React20.useEffect(() => {
    setMountedState(true);
  }, []);
  const enableTouchRipple = mountedState && !disableRipple && !disabled;
  if (false) {
    React20.useEffect(() => {
      if (enableTouchRipple && !rippleRef.current) {
        console.error(["Material-UI: The `component` prop provided to ButtonBase is invalid.", "Please make sure the children prop is rendered in this custom component."].join("\n"));
      }
    }, [enableTouchRipple]);
  }
  const styleProps = _extends({}, props, {
    centerRipple,
    component,
    disabled,
    disableRipple,
    disableTouchRipple,
    focusRipple,
    tabIndex,
    focusVisible
  });
  const classes = useUtilityClasses(styleProps);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ButtonBaseRoot, _extends({
    as: ComponentProp,
    className: clsx_m_default(classes.root, className),
    styleProps,
    onBlur: handleBlur,
    onClick,
    onContextMenu: handleContextMenu,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown2,
    onKeyUp: handleKeyUp,
    onMouseDown: handleMouseDown,
    onMouseLeave: handleMouseLeave,
    onMouseUp: handleMouseUp,
    onDragLeave: handleDragLeave,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchMove,
    onTouchStart: handleTouchStart,
    ref: handleRef,
    tabIndex: disabled ? -1 : tabIndex,
    type
  }, buttonProps, other, {
    children: [children, enableTouchRipple ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TouchRipple_default, _extends({
      ref: rippleRef,
      center: centerRipple
    }, TouchRippleProps)) : null]
  }));
});
false ? ButtonBase.propTypes = {
  action: refType_default,
  centerRipple: import_prop_types5.default.bool,
  children: import_prop_types5.default.node,
  classes: import_prop_types5.default.object,
  className: import_prop_types5.default.string,
  component: elementTypeAcceptingRef_default,
  disabled: import_prop_types5.default.bool,
  disableRipple: import_prop_types5.default.bool,
  disableTouchRipple: import_prop_types5.default.bool,
  focusRipple: import_prop_types5.default.bool,
  focusVisibleClassName: import_prop_types5.default.string,
  href: import_prop_types5.default.any,
  LinkComponent: import_prop_types5.default.elementType,
  onBlur: import_prop_types5.default.func,
  onClick: import_prop_types5.default.func,
  onContextMenu: import_prop_types5.default.func,
  onDragLeave: import_prop_types5.default.func,
  onFocus: import_prop_types5.default.func,
  onFocusVisible: import_prop_types5.default.func,
  onKeyDown: import_prop_types5.default.func,
  onKeyUp: import_prop_types5.default.func,
  onMouseDown: import_prop_types5.default.func,
  onMouseLeave: import_prop_types5.default.func,
  onMouseUp: import_prop_types5.default.func,
  onTouchEnd: import_prop_types5.default.func,
  onTouchMove: import_prop_types5.default.func,
  onTouchStart: import_prop_types5.default.func,
  sx: import_prop_types5.default.object,
  tabIndex: import_prop_types5.default.oneOfType([import_prop_types5.default.number, import_prop_types5.default.string]),
  TouchRippleProps: import_prop_types5.default.object,
  type: import_prop_types5.default.oneOfType([import_prop_types5.default.oneOf(["button", "reset", "submit"]), import_prop_types5.default.string])
} : void 0;
var ButtonBase_default = ButtonBase;

// ../../node_modules/@material-ui/core/utils/capitalize.js
var capitalize_default = capitalize;

// ../../node_modules/@material-ui/core/Fab/fabClasses.js
function getFabUtilityClass(slot) {
  return generateUtilityClass("MuiFab", slot);
}
var fabClasses = generateUtilityClasses("MuiFab", ["root", "label", "primary", "secondary", "extended", "circular", "focusVisible", "disabled", "colorInherit", "sizeSmall", "sizeMedium", "sizeLarge"]);
var fabClasses_default = fabClasses;

// ../../node_modules/@material-ui/core/Fab/Fab.js
var import_jsx_runtime5 = __toModule(require_jsx_runtime());
var useUtilityClasses2 = (styleProps) => {
  const {
    color: color3,
    variant,
    classes,
    size
  } = styleProps;
  const slots = {
    root: ["root", variant, `size${capitalize_default(size)}`, color3 === "inherit" && "colorInherit", color3 === "primary" && "primary", color3 === "secondary" && "secondary"],
    label: ["label"]
  };
  return composeClasses(slots, getFabUtilityClass, classes);
};
var FabRoot = experimentalStyled_default(ButtonBase_default, {}, {
  name: "MuiFab",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return _extends({}, styles.root, styles[styleProps.variant], styles[`size${capitalize_default(styleProps.size)}`], styleProps.color === "inherit" && styles.colorInherit, styleProps.color === "primary" && styles.primary, styleProps.color === "secondary" && styles.secondary);
  }
})(({
  theme,
  styleProps
}) => _extends({}, theme.typography.button, {
  minHeight: 36,
  transition: theme.transitions.create(["background-color", "box-shadow", "border-color"], {
    duration: theme.transitions.duration.short
  }),
  borderRadius: "50%",
  padding: 0,
  minWidth: 0,
  width: 56,
  height: 56,
  boxShadow: theme.shadows[6],
  "&:active": {
    boxShadow: theme.shadows[12]
  },
  color: theme.palette.getContrastText(theme.palette.grey[300]),
  backgroundColor: theme.palette.grey[300],
  "&:hover": {
    backgroundColor: theme.palette.grey.A100,
    "@media (hover: none)": {
      backgroundColor: theme.palette.grey[300]
    },
    textDecoration: "none"
  },
  [`&.${fabClasses_default.focusVisible}`]: {
    boxShadow: theme.shadows[6]
  },
  [`&.${fabClasses_default.disabled}`]: {
    color: theme.palette.action.disabled,
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.action.disabledBackground
  }
}, styleProps.size === "small" && {
  width: 40,
  height: 40
}, styleProps.size === "medium" && {
  width: 48,
  height: 48
}, styleProps.variant === "extended" && {
  borderRadius: 48 / 2,
  padding: "0 16px",
  width: "auto",
  minHeight: "auto",
  minWidth: 48,
  height: 48
}, styleProps.variant === "extended" && styleProps.size === "small" && {
  width: "auto",
  padding: "0 8px",
  borderRadius: 34 / 2,
  minWidth: 34,
  height: 34
}, styleProps.variant === "extended" && styleProps.size === "medium" && {
  width: "auto",
  padding: "0 16px",
  borderRadius: 40 / 2,
  minWidth: 40,
  height: 40
}, styleProps.color === "inherit" && {
  color: "inherit"
}), ({
  theme,
  styleProps
}) => _extends({}, styleProps.color === "primary" && {
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    "@media (hover: none)": {
      backgroundColor: theme.palette.primary.main
    }
  }
}, styleProps.color === "secondary" && {
  color: theme.palette.secondary.contrastText,
  backgroundColor: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
    "@media (hover: none)": {
      backgroundColor: theme.palette.secondary.main
    }
  }
}));
var FabLabel = experimentalStyled_default("span", {}, {
  name: "MuiFab",
  slot: "Label",
  overridesResolver: (props, styles) => styles.label
})({
  width: "100%",
  display: "inherit",
  alignItems: "inherit",
  justifyContent: "inherit"
});
var Fab = /* @__PURE__ */ React21.forwardRef(function Fab2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiFab"
  });
  const {
    children,
    className,
    color: color3 = "default",
    component = "button",
    disabled = false,
    disableFocusRipple = false,
    focusVisibleClassName,
    size = "large",
    variant = "circular"
  } = props, other = _objectWithoutPropertiesLoose(props, ["children", "className", "color", "component", "disabled", "disableFocusRipple", "focusVisibleClassName", "size", "variant"]);
  const styleProps = _extends({}, props, {
    color: color3,
    component,
    disabled,
    disableFocusRipple,
    size,
    variant
  });
  const classes = useUtilityClasses2(styleProps);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(FabRoot, _extends({
    className: clsx_m_default(classes.root, className),
    component,
    disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: clsx_m_default(classes.focusVisible, focusVisibleClassName),
    styleProps,
    ref
  }, other, {
    children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(FabLabel, {
      className: classes.label,
      styleProps,
      children
    })
  }));
});
false ? Fab.propTypes = {
  children: import_prop_types6.default.node,
  classes: import_prop_types6.default.object,
  className: import_prop_types6.default.string,
  color: import_prop_types6.default.oneOfType([import_prop_types6.default.oneOf(["default", "inherit", "primary", "secondary"]), import_prop_types6.default.string]),
  component: import_prop_types6.default.elementType,
  disabled: import_prop_types6.default.bool,
  disableFocusRipple: import_prop_types6.default.bool,
  disableRipple: import_prop_types6.default.bool,
  focusVisibleClassName: import_prop_types6.default.string,
  href: import_prop_types6.default.string,
  size: import_prop_types6.default.oneOfType([import_prop_types6.default.oneOf(["large", "medium", "small"]), import_prop_types6.default.string]),
  sx: import_prop_types6.default.object,
  variant: import_prop_types6.default.oneOfType([import_prop_types6.default.oneOf(["circular", "extended"]), import_prop_types6.default.string])
} : void 0;
var Fab_default = Fab;

// ../../node_modules/@material-ui/core/Button/Button.js
var React22 = __toModule(require_react());
var import_prop_types7 = __toModule(require_prop_types());

// ../../node_modules/@material-ui/core/Button/buttonClasses.js
function getButtonUtilityClass(slot) {
  return generateUtilityClass("MuiButton", slot);
}
var buttonClasses = generateUtilityClasses("MuiButton", ["root", "label", "text", "textInherit", "textPrimary", "textSecondary", "outlined", "outlinedInherit", "outlinedPrimary", "outlinedSecondary", "contained", "containedInherit", "containedPrimary", "containedSecondary", "disableElevation", "focusVisible", "disabled", "colorInherit", "textSizeSmall", "textSizeMedium", "textSizeLarge", "outlinedSizeSmall", "outlinedSizeMedium", "outlinedSizeLarge", "containedSizeSmall", "containedSizeMedium", "containedSizeLarge", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "iconSizeSmall", "iconSizeMedium", "iconSizeLarge"]);
var buttonClasses_default = buttonClasses;

// ../../node_modules/@material-ui/core/Button/Button.js
var import_jsx_runtime6 = __toModule(require_jsx_runtime());
var import_jsx_runtime7 = __toModule(require_jsx_runtime());
var useUtilityClasses3 = (styleProps) => {
  const {
    color: color3,
    disableElevation,
    fullWidth,
    size,
    variant,
    classes
  } = styleProps;
  const slots = {
    root: ["root", variant, `${variant}${capitalize_default(color3)}`, `size${capitalize_default(size)}`, `${variant}Size${capitalize_default(size)}`, color3 === "inherit" && "colorInherit", disableElevation && "disableElevation", fullWidth && "fullWidth"],
    label: ["label"],
    startIcon: ["startIcon", `iconSize${capitalize_default(size)}`],
    endIcon: ["endIcon", `iconSize${capitalize_default(size)}`]
  };
  const composedClasses = composeClasses(slots, getButtonUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
var commonIconStyles = (styleProps) => _extends({}, styleProps.size === "small" && {
  "& > *:nth-of-type(1)": {
    fontSize: 18
  }
}, styleProps.size === "medium" && {
  "& > *:nth-of-type(1)": {
    fontSize: 20
  }
}, styleProps.size === "large" && {
  "& > *:nth-of-type(1)": {
    fontSize: 22
  }
});
var ButtonRoot = experimentalStyled_default(ButtonBase_default, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes"
}, {
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return _extends({}, styles.root, styles[styleProps.variant], styles[`${styleProps.variant}${capitalize_default(styleProps.color)}`], styles[`size${capitalize_default(styleProps.size)}`], styles[`${styleProps.variant}Size${capitalize_default(styleProps.size)}`], styleProps.color === "inherit" && styles.colorInherit, styleProps.disableElevation && styles.disableElevation, styleProps.fullWidth && styles.fullWidth);
  }
})(({
  theme,
  styleProps
}) => _extends({}, theme.typography.button, {
  minWidth: 64,
  padding: "6px 16px",
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(["background-color", "box-shadow", "border-color", "color"], {
    duration: theme.transitions.duration.short
  }),
  "&:hover": _extends({
    textDecoration: "none",
    backgroundColor: alpha2(theme.palette.text.primary, theme.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }, styleProps.variant === "text" && styleProps.color !== "inherit" && {
    backgroundColor: alpha2(theme.palette[styleProps.color].main, theme.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }, styleProps.variant === "outlined" && styleProps.color !== "inherit" && {
    border: `1px solid ${theme.palette[styleProps.color].main}`,
    backgroundColor: alpha2(theme.palette[styleProps.color].main, theme.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }, styleProps.variant === "contained" && {
    backgroundColor: theme.palette.grey.A100,
    boxShadow: theme.shadows[4],
    "@media (hover: none)": {
      boxShadow: theme.shadows[2],
      backgroundColor: theme.palette.grey[300]
    }
  }, styleProps.variant === "contained" && styleProps.color !== "inherit" && {
    backgroundColor: theme.palette[styleProps.color].dark,
    "@media (hover: none)": {
      backgroundColor: theme.palette[styleProps.color].main
    }
  }),
  "&:active": _extends({}, styleProps.variant === "contained" && {
    boxShadow: theme.shadows[8]
  }),
  [`&.${buttonClasses_default.focusVisible}`]: _extends({}, styleProps.variant === "contained" && {
    boxShadow: theme.shadows[6]
  }),
  [`&.${buttonClasses_default.disabled}`]: _extends({
    color: theme.palette.action.disabled
  }, styleProps.variant === "outlined" && {
    border: `1px solid ${theme.palette.action.disabledBackground}`
  }, styleProps.variant === "outlined" && styleProps.color === "secondary" && {
    border: `1px solid ${theme.palette.action.disabled}`
  }, styleProps.variant === "contained" && {
    color: theme.palette.action.disabled,
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.action.disabledBackground
  })
}, styleProps.variant === "text" && {
  padding: "6px 8px"
}, styleProps.variant === "text" && styleProps.color !== "inherit" && {
  color: theme.palette[styleProps.color].main
}, styleProps.variant === "outlined" && {
  padding: "5px 15px",
  border: `1px solid ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"}`
}, styleProps.variant === "outlined" && styleProps.color !== "inherit" && {
  color: theme.palette[styleProps.color].main,
  border: `1px solid ${alpha2(theme.palette[styleProps.color].main, 0.5)}`
}, styleProps.variant === "contained" && {
  color: theme.palette.getContrastText(theme.palette.grey[300]),
  backgroundColor: theme.palette.grey[300],
  boxShadow: theme.shadows[2]
}, styleProps.variant === "contained" && styleProps.color !== "inherit" && {
  color: theme.palette[styleProps.color].contrastText,
  backgroundColor: theme.palette[styleProps.color].main
}, styleProps.color === "inherit" && {
  color: "inherit",
  borderColor: "currentColor"
}, styleProps.size === "small" && styleProps.variant === "text" && {
  padding: "4px 5px",
  fontSize: theme.typography.pxToRem(13)
}, styleProps.size === "large" && styleProps.variant === "text" && {
  padding: "8px 11px",
  fontSize: theme.typography.pxToRem(15)
}, styleProps.size === "small" && styleProps.variant === "outlined" && {
  padding: "3px 9px",
  fontSize: theme.typography.pxToRem(13)
}, styleProps.size === "large" && styleProps.variant === "outlined" && {
  padding: "7px 21px",
  fontSize: theme.typography.pxToRem(15)
}, styleProps.size === "small" && styleProps.variant === "contained" && {
  padding: "4px 10px",
  fontSize: theme.typography.pxToRem(13)
}, styleProps.size === "large" && styleProps.variant === "contained" && {
  padding: "8px 22px",
  fontSize: theme.typography.pxToRem(15)
}, styleProps.fullWidth && {
  width: "100%"
}), ({
  styleProps
}) => styleProps.disableElevation && {
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none"
  },
  [`&.${buttonClasses_default.focusVisible}`]: {
    boxShadow: "none"
  },
  "&:active": {
    boxShadow: "none"
  },
  [`&.${buttonClasses_default.disabled}`]: {
    boxShadow: "none"
  }
});
var ButtonLabel = experimentalStyled_default("span", {}, {
  name: "MuiButton",
  slot: "Label",
  overridesResolver: (props, styles) => styles.label
})({
  width: "100%",
  display: "inherit",
  alignItems: "inherit",
  justifyContent: "inherit"
});
var ButtonStartIcon = experimentalStyled_default("span", {}, {
  name: "MuiButton",
  slot: "StartIcon",
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return _extends({}, styles.startIcon, styles[`iconSize${capitalize_default(styleProps.size)}`]);
  }
})(({
  styleProps
}) => _extends({
  display: "inherit",
  marginRight: 8,
  marginLeft: -4
}, styleProps.size === "small" && {
  marginLeft: -2
}, commonIconStyles(styleProps)));
var ButtonEndIcon = experimentalStyled_default("span", {}, {
  name: "MuiButton",
  slot: "EndIcon",
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return _extends({}, styles.endIcon, styles[`iconSize${capitalize_default(styleProps.size)}`]);
  }
})(({
  styleProps
}) => _extends({
  display: "inherit",
  marginRight: -4,
  marginLeft: 8
}, styleProps.size === "small" && {
  marginRight: -2
}, commonIconStyles(styleProps)));
var Button = /* @__PURE__ */ React22.forwardRef(function Button2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiButton"
  });
  const {
    children,
    color: color3 = "primary",
    component = "button",
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    endIcon: endIconProp,
    focusVisibleClassName,
    fullWidth = false,
    size = "medium",
    startIcon: startIconProp,
    type,
    variant = "text"
  } = props, other = _objectWithoutPropertiesLoose(props, ["children", "color", "component", "disabled", "disableElevation", "disableFocusRipple", "endIcon", "focusVisibleClassName", "fullWidth", "size", "startIcon", "type", "variant"]);
  const styleProps = _extends({}, props, {
    color: color3,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    fullWidth,
    size,
    type,
    variant
  });
  const classes = useUtilityClasses3(styleProps);
  const startIcon = startIconProp && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ButtonStartIcon, {
    className: classes.startIcon,
    styleProps,
    children: startIconProp
  });
  const endIcon = endIconProp && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ButtonEndIcon, {
    className: classes.endIcon,
    styleProps,
    children: endIconProp
  });
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ButtonRoot, _extends({
    styleProps,
    component,
    disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: clsx_m_default(classes.focusVisible, focusVisibleClassName),
    ref,
    type
  }, other, {
    classes,
    children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(ButtonLabel, {
      className: classes.label,
      styleProps,
      children: [startIcon, children, endIcon]
    })
  }));
});
false ? Button.propTypes = {
  children: import_prop_types7.default.node,
  classes: import_prop_types7.default.object,
  color: import_prop_types7.default.oneOfType([import_prop_types7.default.oneOf(["inherit", "primary", "secondary"]), import_prop_types7.default.string]),
  component: import_prop_types7.default.elementType,
  disabled: import_prop_types7.default.bool,
  disableElevation: import_prop_types7.default.bool,
  disableFocusRipple: import_prop_types7.default.bool,
  disableRipple: import_prop_types7.default.bool,
  endIcon: import_prop_types7.default.node,
  focusVisibleClassName: import_prop_types7.default.string,
  fullWidth: import_prop_types7.default.bool,
  href: import_prop_types7.default.string,
  size: import_prop_types7.default.oneOfType([import_prop_types7.default.oneOf(["small", "medium", "large"]), import_prop_types7.default.string]),
  startIcon: import_prop_types7.default.node,
  sx: import_prop_types7.default.object,
  type: import_prop_types7.default.oneOfType([import_prop_types7.default.oneOf(["button", "reset", "submit"]), import_prop_types7.default.string]),
  variant: import_prop_types7.default.oneOfType([import_prop_types7.default.oneOf(["contained", "outlined", "text"]), import_prop_types7.default.string])
} : void 0;
var Button_default = Button;

// ../../node_modules/@material-ui/core/ToggleButton/ToggleButton.js
var React23 = __toModule(require_react());
var import_prop_types8 = __toModule(require_prop_types());

// ../../node_modules/@material-ui/core/ToggleButton/toggleButtonClasses.js
function getToggleButtonUtilityClass(slot) {
  return generateUtilityClass("MuiToggleButton", slot);
}
var toggleButtonClasses = generateUtilityClasses("MuiToggleButton", ["root", "disabled", "selected", "standard", "primary", "secondary", "label", "sizeSmall", "sizeMedium", "sizeLarge"]);
var toggleButtonClasses_default = toggleButtonClasses;

// ../../node_modules/@material-ui/core/ToggleButton/ToggleButton.js
var import_jsx_runtime8 = __toModule(require_jsx_runtime());
var useUtilityClasses4 = (styleProps) => {
  const {
    classes,
    fullWidth,
    selected,
    disabled,
    size,
    color: color3
  } = styleProps;
  const slots = {
    root: ["root", selected && "selected", disabled && "disabled", fullWidth && "fullWidth", `size${capitalize_default(size)}`, color3],
    label: ["label"]
  };
  return composeClasses(slots, getToggleButtonUtilityClass, classes);
};
var ToggleButtonRoot = experimentalStyled_default(ButtonBase_default, {}, {
  name: "MuiToggleButton",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return _extends({}, styles.root, styles[`size${capitalize_default(styleProps.size)}`]);
  }
})(({
  theme,
  styleProps
}) => _extends({}, theme.typography.button, {
  borderRadius: theme.shape.borderRadius,
  padding: 11,
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.action.active
}, styleProps.fullWidth && {
  width: "100%"
}, {
  [`&.${toggleButtonClasses_default.disabled}`]: {
    color: theme.palette.action.disabled,
    border: `1px solid ${theme.palette.action.disabledBackground}`
  },
  "&:hover": {
    textDecoration: "none",
    backgroundColor: alpha2(theme.palette.text.primary, theme.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }
}, styleProps.color === "standard" && {
  [`&.${toggleButtonClasses_default.selected}`]: {
    color: theme.palette.text.primary,
    backgroundColor: alpha2(theme.palette.text.primary, theme.palette.action.selectedOpacity),
    "&:hover": {
      backgroundColor: alpha2(theme.palette.text.primary, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: alpha2(theme.palette.text.primary, theme.palette.action.selectedOpacity)
      }
    }
  }
}, styleProps.color !== "standard" && {
  [`&.${toggleButtonClasses_default.selected}`]: {
    color: theme.palette[styleProps.color].main,
    backgroundColor: alpha2(theme.palette[styleProps.color].main, theme.palette.action.selectedOpacity),
    "&:hover": {
      backgroundColor: alpha2(theme.palette[styleProps.color].main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: alpha2(theme.palette[styleProps.color].main, theme.palette.action.selectedOpacity)
      }
    }
  }
}, styleProps.size === "small" && {
  padding: 7,
  fontSize: theme.typography.pxToRem(13)
}, styleProps.size === "large" && {
  padding: 15,
  fontSize: theme.typography.pxToRem(15)
}));
var ToggleButtonLabel = experimentalStyled_default("span", {}, {
  name: "MuiToggleButton",
  slot: "Label",
  overridesResolver: (props, styles) => styles.label
})({
  width: "100%",
  display: "inherit",
  alignItems: "inherit",
  justifyContent: "inherit"
});
var ToggleButton = /* @__PURE__ */ React23.forwardRef(function ToggleButton2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiToggleButton"
  });
  const {
    children,
    className,
    color: color3 = "standard",
    disabled = false,
    disableFocusRipple = false,
    fullWidth = false,
    onChange,
    onClick,
    selected,
    size = "medium",
    value
  } = props, other = _objectWithoutPropertiesLoose(props, ["children", "className", "color", "disabled", "disableFocusRipple", "fullWidth", "onChange", "onClick", "selected", "size", "value"]);
  const styleProps = _extends({}, props, {
    color: color3,
    disabled,
    disableFocusRipple,
    fullWidth,
    size
  });
  const classes = useUtilityClasses4(styleProps);
  const handleChange = (event) => {
    if (onClick) {
      onClick(event, value);
      if (event.defaultPrevented) {
        return;
      }
    }
    if (onChange) {
      onChange(event, value);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ToggleButtonRoot, _extends({
    className: clsx_m_default(classes.root, className),
    color: color3,
    disabled,
    focusRipple: !disableFocusRipple,
    ref,
    onClick: handleChange,
    onChange,
    value,
    styleProps,
    "aria-pressed": selected
  }, other, {
    children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ToggleButtonLabel, {
      className: classes.label,
      styleProps,
      children
    })
  }));
});
false ? ToggleButton.propTypes = {
  children: import_prop_types8.default.node,
  classes: import_prop_types8.default.object,
  className: import_prop_types8.default.string,
  color: import_prop_types8.default.oneOfType([import_prop_types8.default.oneOf(["standard", "primary", "secondary"]), import_prop_types8.default.string]),
  disabled: import_prop_types8.default.bool,
  disableFocusRipple: import_prop_types8.default.bool,
  disableRipple: import_prop_types8.default.bool,
  fullWidth: import_prop_types8.default.bool,
  onChange: import_prop_types8.default.func,
  onClick: import_prop_types8.default.func,
  selected: import_prop_types8.default.bool,
  size: import_prop_types8.default.oneOfType([import_prop_types8.default.oneOf(["large", "medium", "small"]), import_prop_types8.default.string]),
  sx: import_prop_types8.default.object,
  value: import_prop_types8.default.any.isRequired
} : void 0;
var ToggleButton_default = ToggleButton;

// ../../node_modules/@material-ui/core/ToggleButtonGroup/ToggleButtonGroup.js
var React24 = __toModule(require_react());
var import_react_is = __toModule(require_react_is2());
var import_prop_types9 = __toModule(require_prop_types());

// ../../node_modules/@material-ui/core/ToggleButtonGroup/isValueSelected.js
function isValueSelected(value, candidate) {
  if (candidate === void 0 || value === void 0) {
    return false;
  }
  if (Array.isArray(candidate)) {
    return candidate.indexOf(value) >= 0;
  }
  return value === candidate;
}

// ../../node_modules/@material-ui/core/ToggleButtonGroup/toggleButtonGroupClasses.js
function getToggleButtonGroupUtilityClass(slot) {
  return generateUtilityClass("MuiToggleButtonGroup", slot);
}
var toggleButtonGroupClasses = generateUtilityClasses("MuiToggleButtonGroup", ["root", "selected", "vertical", "grouped", "groupedHorizontal", "groupedVertical"]);
var toggleButtonGroupClasses_default = toggleButtonGroupClasses;

// ../../node_modules/@material-ui/core/ToggleButtonGroup/ToggleButtonGroup.js
var import_jsx_runtime9 = __toModule(require_jsx_runtime());
var useUtilityClasses5 = (styleProps) => {
  const {
    classes,
    orientation,
    fullWidth
  } = styleProps;
  const slots = {
    root: ["root", orientation === "vertical" && "vertical", fullWidth && "fullWidth"],
    grouped: ["grouped", `grouped${capitalize_default(orientation)}`]
  };
  return composeClasses(slots, getToggleButtonGroupUtilityClass, classes);
};
var ToggleButtonGroupRoot = experimentalStyled_default("div", {}, {
  name: "MuiToggleButtonGroup",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return _extends({
      [`& .${toggleButtonGroupClasses_default.grouped}`]: _extends({}, styles.grouped, styles[`grouped${capitalize_default(styleProps.orientation)}`])
    }, styles.root, styleProps.orientation === "vertical" && styles.vertical, styleProps.fullWidth && styles.fullWidth);
  }
})(({
  styleProps,
  theme
}) => _extends({
  display: "inline-flex",
  borderRadius: theme.shape.borderRadius
}, styleProps.orientation === "vertical" && {
  flexDirection: "column"
}, styleProps.fullWidth && {
  width: "100%"
}, {
  [`& .${toggleButtonGroupClasses_default.grouped}`]: _extends({}, styleProps.orientation === "horizontal" ? {
    "&:not(:first-of-type)": {
      marginLeft: -1,
      borderLeft: "1px solid transparent",
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    },
    "&:not(:last-of-type)": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    },
    [`&.${toggleButtonGroupClasses_default.selected} + .${toggleButtonGroupClasses_default.grouped}.${toggleButtonGroupClasses_default.selected}`]: {
      borderLeft: 0,
      marginLeft: 0
    }
  } : {
    "&:not(:first-of-type)": {
      marginTop: -1,
      borderTop: "1px solid transparent",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    },
    "&:not(:last-of-type)": {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
    [`&.${toggleButtonGroupClasses_default.selected} + .${toggleButtonGroupClasses_default.grouped}.${toggleButtonGroupClasses_default.selected}`]: {
      borderTop: 0,
      marginTop: 0
    }
  })
}));
var ToggleButtonGroup = /* @__PURE__ */ React24.forwardRef(function ToggleButtonGroup2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiToggleButtonGroup"
  });
  const {
    children,
    className,
    color: color3 = "standard",
    exclusive = false,
    fullWidth = false,
    onChange,
    orientation = "horizontal",
    size = "medium",
    value
  } = props, other = _objectWithoutPropertiesLoose(props, ["children", "className", "color", "exclusive", "fullWidth", "onChange", "orientation", "size", "value"]);
  const styleProps = _extends({}, props, {
    fullWidth,
    orientation,
    size
  });
  const classes = useUtilityClasses5(styleProps);
  const handleChange = (event, buttonValue) => {
    if (!onChange) {
      return;
    }
    const index = value && value.indexOf(buttonValue);
    let newValue;
    if (value && index >= 0) {
      newValue = value.slice();
      newValue.splice(index, 1);
    } else {
      newValue = value ? value.concat(buttonValue) : [buttonValue];
    }
    onChange(event, newValue);
  };
  const handleExclusiveChange = (event, buttonValue) => {
    if (!onChange) {
      return;
    }
    onChange(event, value === buttonValue ? null : buttonValue);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ToggleButtonGroupRoot, _extends({
    role: "group",
    className: clsx_m_default(classes.root, className),
    ref,
    styleProps
  }, other, {
    children: React24.Children.map(children, (child) => {
      if (!/* @__PURE__ */ React24.isValidElement(child)) {
        return null;
      }
      if (false) {
        if ((0, import_react_is.isFragment)(child)) {
          console.error(["Material-UI: The ToggleButtonGroup component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join("\n"));
        }
      }
      return /* @__PURE__ */ React24.cloneElement(child, {
        className: clsx_m_default(classes.grouped, child.props.className),
        onChange: exclusive ? handleExclusiveChange : handleChange,
        selected: child.props.selected === void 0 ? isValueSelected(child.props.value, value) : child.props.selected,
        size: child.props.size || size,
        fullWidth,
        color: child.props.color || color3
      });
    })
  }));
});
false ? ToggleButtonGroup.propTypes = {
  children: import_prop_types9.default.node,
  classes: import_prop_types9.default.object,
  className: import_prop_types9.default.string,
  color: import_prop_types9.default.oneOf(["primary", "secondary", "standard"]),
  exclusive: import_prop_types9.default.bool,
  fullWidth: import_prop_types9.default.bool,
  onChange: import_prop_types9.default.func,
  orientation: import_prop_types9.default.oneOf(["horizontal", "vertical"]),
  size: import_prop_types9.default.oneOfType([import_prop_types9.default.oneOf(["large", "medium", "small"]), import_prop_types9.default.string]),
  sx: import_prop_types9.default.object,
  value: import_prop_types9.default.any
} : void 0;
var ToggleButtonGroup_default = ToggleButtonGroup;

// ../../node_modules/@material-ui/core/utils/createSvgIcon.js
var React26 = __toModule(require_react());

// ../../node_modules/@material-ui/core/SvgIcon/SvgIcon.js
var React25 = __toModule(require_react());
var import_prop_types10 = __toModule(require_prop_types());

// ../../node_modules/@material-ui/core/SvgIcon/svgIconClasses.js
function getSvgIconUtilityClass(slot) {
  return generateUtilityClass("MuiSvgIcon", slot);
}
var svgIconClasses = generateUtilityClasses("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);

// ../../node_modules/@material-ui/core/SvgIcon/SvgIcon.js
var import_jsx_runtime10 = __toModule(require_jsx_runtime());
var import_jsx_runtime11 = __toModule(require_jsx_runtime());
var useUtilityClasses6 = (styleProps) => {
  const {
    color: color3,
    fontSize: fontSize2,
    classes
  } = styleProps;
  const slots = {
    root: ["root", color3 !== "inherit" && `color${capitalize_default(color3)}`, `fontSize${capitalize_default(fontSize2)}`]
  };
  return composeClasses(slots, getSvgIconUtilityClass, classes);
};
var SvgIconRoot = experimentalStyled_default("svg", {}, {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return _extends({}, styles.root, styleProps.color !== "inherit" && styles[`color${capitalize_default(styleProps.color)}`], styles[`fontSize${capitalize_default(styleProps.fontSize)}`]);
  }
})(({
  theme,
  styleProps
}) => ({
  userSelect: "none",
  width: "1em",
  height: "1em",
  display: "inline-block",
  fill: "currentColor",
  flexShrink: 0,
  transition: theme.transitions.create("fill", {
    duration: theme.transitions.duration.shorter
  }),
  fontSize: {
    inherit: "inherit",
    small: theme.typography.pxToRem(20),
    medium: theme.typography.pxToRem(24),
    large: theme.typography.pxToRem(35)
  }[styleProps.fontSize],
  color: {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    action: theme.palette.action.active,
    error: theme.palette.error.main,
    disabled: theme.palette.action.disabled,
    inherit: void 0
  }[styleProps.color]
}));
var SvgIcon = /* @__PURE__ */ React25.forwardRef(function SvgIcon2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiSvgIcon"
  });
  const {
    children,
    className,
    color: color3 = "inherit",
    component = "svg",
    fontSize: fontSize2 = "medium",
    htmlColor,
    titleAccess,
    viewBox = "0 0 24 24"
  } = props, other = _objectWithoutPropertiesLoose(props, ["children", "className", "color", "component", "fontSize", "htmlColor", "titleAccess", "viewBox"]);
  const styleProps = _extends({}, props, {
    color: color3,
    component,
    fontSize: fontSize2,
    viewBox
  });
  const classes = useUtilityClasses6(styleProps);
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(SvgIconRoot, _extends({
    as: component,
    className: clsx_m_default(classes.root, className),
    styleProps,
    focusable: "false",
    viewBox,
    color: htmlColor,
    "aria-hidden": titleAccess ? void 0 : true,
    role: titleAccess ? "img" : void 0,
    ref
  }, other, {
    children: [children, titleAccess ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("title", {
      children: titleAccess
    }) : null]
  }));
});
false ? SvgIcon.propTypes = {
  children: import_prop_types10.default.node,
  classes: import_prop_types10.default.object,
  className: import_prop_types10.default.string,
  color: import_prop_types10.default.oneOfType([import_prop_types10.default.oneOf(["action", "disabled", "error", "inherit", "primary", "secondary"]), import_prop_types10.default.string]),
  component: import_prop_types10.default.elementType,
  fontSize: import_prop_types10.default.oneOfType([import_prop_types10.default.oneOf(["inherit", "large", "medium", "small"]), import_prop_types10.default.string]),
  htmlColor: import_prop_types10.default.string,
  shapeRendering: import_prop_types10.default.string,
  sx: import_prop_types10.default.object,
  titleAccess: import_prop_types10.default.string,
  viewBox: import_prop_types10.default.string
} : void 0;
SvgIcon.muiName = "SvgIcon";
var SvgIcon_default = SvgIcon;

// ../../node_modules/@material-ui/core/utils/createSvgIcon.js
var import_jsx_runtime12 = __toModule(require_jsx_runtime());
function createSvgIcon(path, displayName) {
  const Component3 = (props, ref) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(SvgIcon_default, _extends({
    "data-testid": `${displayName}Icon`,
    ref
  }, props, {
    children: path
  }));
  if (false) {
    Component3.displayName = `${displayName}Icon`;
  }
  Component3.muiName = SvgIcon_default.muiName;
  return /* @__PURE__ */ React26.memo(/* @__PURE__ */ React26.forwardRef(Component3));
}

// src/icons/Share.tsx
var Share_default = createSvgIcon(/* @__PURE__ */ import_react48.default.createElement("path", {
  d: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
}), "Share");

// src/icons/TabletAndroid.tsx
var TabletAndroid_default = createSvgIcon(/* @__PURE__ */ import_react48.default.createElement("path", {
  d: "M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z"
}), "TabletAndroid");

// src/icons/Tv.tsx
var Tv_default = createSvgIcon(/* @__PURE__ */ import_react48.default.createElement("path", {
  d: "M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"
}), "Tv");

// src/icons/PhoneAndroid.tsx
var PhoneAndroid_default = createSvgIcon(/* @__PURE__ */ import_react48.default.createElement("path", {
  d: "M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z"
}), "PhoneAndroid");

// src/icons/QrCode.tsx
var QrCode_default = createSvgIcon(/* @__PURE__ */ import_react48.default.createElement("path", {
  d: "M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm8-12v8h8V3h-8zm6 6h-4V5h4v4zm0 10h2v2h-2zm-6-6h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm2 2h2v2h-2zm2-2h2v2h-2zm0-4h2v2h-2zm2 2h2v2h-2z"
}), "QrCode");

// src/Qr.tsx
var QR = ({url}) => {
  const canvasRef = import_react48.default.useRef(null);
  import_react48.default.useEffect(() => {
    const load = async () => {
      const QRious = await new Function(`return import(
        "https://esm.sh/qrious"
      ).then(x=>x.default);`)();
      const options = {
        size: 200,
        element: canvasRef.current,
        foregroundAlpha: 0.9,
        foreground: "white",
        backgroundAlpha: 1,
        padding: 16,
        background: "#1e1e1e",
        value: url
      };
      const qr = new QRious(options);
    };
    load();
  }, [url]);
  return /* @__PURE__ */ jsx("canvas", {
    css: css`
        border-radius: 16px;
        margin-bottom: 8px;
  `,
    ref: canvasRef
  });
};
var QRButton = ({url}) => {
  const [showQR, setQR] = import_react48.default.useState(false);
  return /* @__PURE__ */ jsx(motion2.div, {
    animate: {
      width: showQR ? 200 : 56,
      height: showQR ? 220 : 48
    },
    onClick: (e) => {
      setQR(!showQR);
    },
    css: css`
                margin-bottom: 12px;
              `
  }, showQR ? /* @__PURE__ */ jsx(QR, {
    key: url,
    url: url + "/edit/"
  }) : /* @__PURE__ */ jsx(Fab_default, {
    variant: "extended",
    color: "secondary",
    onClick: () => {
      setQR(!showQR);
    }
  }, /* @__PURE__ */ jsx(QrCode_default, null)));
};

// src/DraggableWindow.tsx
var breakPoints = [640, 1024, 1920];
var sizes = [10, 25, 50, 75, 100];
var DraggableWindow = ({onShare, onRestore, position: position3, session, children}) => {
  const [isStable, setIsStable] = import_react48.default.useState(false);
  const [scaleRange, changeScaleRange] = import_react48.default.useState(75);
  const [height2, changeHeight] = import_react48.default.useState(innerHeight);
  const [qrUrl, setQRUrl] = import_react48.default.useState(session.url);
  const [errorText, setErrorText] = import_react48.default.useState(" ");
  const [width2, setWidth] = import_react48.default.useState(breakPoints[1]);
  const ref = import_react48.default.useRef(null);
  const zbody = import_react48.default.useRef(null);
  import_react48.default.useEffect(() => {
    window.addEventListener("resize", () => changeHeight(innerHeight));
  });
  import_react48.default.useEffect(() => {
    const handler = setInterval(() => {
      if (errorText !== session.errorText) {
        const newErr = session.errorText;
        setErrorText(newErr);
        setIsStable(false);
        setTimeout(() => {
          if (session.errorText === newErr) {
            setIsStable(true);
          }
        }, 2e3);
      }
      if (qrUrl !== session.url)
        setQRUrl(session.url);
    }, 200);
    return () => clearInterval(handler);
  }, [setErrorText, setQRUrl, errorText, qrUrl]);
  const scale2 = scaleRange / 100;
  return /* @__PURE__ */ jsx(motion2.div, {
    ref,
    css: css`
            right: 20px;
            background-color:rgba(92 ,92, 152, 0.8);
            backdrop-filter: blur(10px);
            top: 20px;
            padding: 0px 0px 0px 16px;
            border-radius: 16px;
            white-space: normal;
            position: ${position3 ? position3 : "fixed"};
          `,
    dragElastic: 0.5,
    dragConstraints: {
      left: 0,
      right: 300,
      top: -height2 / 4,
      bottom: height2 / 2
    },
    dragMomentum: false,
    drag: true
  }, /* @__PURE__ */ jsx("div", {
    css: css` 
              display: flex;
                `
  }, /* @__PURE__ */ jsx("div", {
    css: css`
            display: flex;
            flex-direction: column;
            align-items: center;
          `
  }, /* @__PURE__ */ jsx(ToggleButtonGroup_default, {
    value: scaleRange,
    size: "small",
    exclusive: true,
    onChange: (_e, newScale) => newScale && changeScaleRange(newScale)
  }, sizes.map((size) => /* @__PURE__ */ jsx(ToggleButton_default, {
    key: size,
    value: size
  }, /* @__PURE__ */ jsx("span", {
    css: css`
                       color: ${size === scaleRange ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                       `
  }, size, "%")))), /* @__PURE__ */ jsx(motion2.div, {
    animate: {
      width: width2 * scale2 / devicePixelRatio,
      height: height2 * scale2
    },
    css: css`
              display: block;
              overflow: hidden;
              border-radius: 8px;
              opacity: 0.9;
           `
  }, errorText.trim() !== "" && /* @__PURE__ */ jsx("pre", {
    css: css`
                    position: absolute;
                    z-index:3;
                    color: rgb(255, 240, 240);
                    padding: 24px;
                    font-size: 14pt;
                    background-color: rgb(255, 0, 0);
                    flex: 0 0 auto;
                    overflow: auto;
                    margin: 0;
                    font-family: monospace;
                    white-space: pre-wrap;
                `
  }, isStable && errorText.trim(), isStable && errorText.trim() !== "" && /* @__PURE__ */ jsx("div", {
    css: css`
                          text-align: right;
                        `
  }, /* @__PURE__ */ jsx(Button_default, {
    variant: "contained",
    onClick: () => {
      onRestore();
      setErrorText("");
    },
    color: "primary"
  }, "Restore"))), /* @__PURE__ */ jsx(motion2.div, {
    animate: {
      transformOrigin: "top left",
      width: width2 / devicePixelRatio,
      height: height2,
      scale: scale2
    },
    css: css`
                  overflow:overlay;
                  >div{
                    width:100%;
                    height:100%;
                    overflow: overlay;
                    background: white;
                  }
              `
  }, /* @__PURE__ */ jsx("div", {
    id: "zbody",
    ref: zbody
  }, children))), /* @__PURE__ */ jsx(ToggleButtonGroup_default, {
    value: width2,
    size: "small",
    exclusive: true,
    onChange: (_e, newSize) => newSize && setWidth(newSize)
  }, breakPoints.map((size) => /* @__PURE__ */ jsx(ToggleButton_default, {
    key: size,
    value: size
  }, size === 640 ? /* @__PURE__ */ jsx(PhoneAndroid_default, {
    css: css`
                        color: ${width2 === 640 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `
  }) : size === 1024 ? /* @__PURE__ */ jsx(TabletAndroid_default, {
    css: css`
                        color: ${width2 === 1024 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `
  }) : /* @__PURE__ */ jsx(Tv_default, {
    css: css`
                        color: ${width2 === 1920 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                      `
  }))))), /* @__PURE__ */ jsx("div", {
    css: css`
              display: flex;
              align-items: center;          
              flex-direction: column;
              padding: 16px;
              `
  }, /* @__PURE__ */ jsx(QRButton, {
    url: qrUrl
  }), /* @__PURE__ */ jsx(Fab_default, {
    variant: "extended",
    color: "primary",
    onClick: () => {
      onShare();
    }
  }, /* @__PURE__ */ jsx(Share_default, null)))));
};

// src/renderer.ts
var {motion: motion2} = es_exports;
var render = (el, container) => {
  import_react_dom.default.render(jsx(import_react48.Fragment, {children: el}), container);
  return () => import_react_dom.default.unmountComponentAtNode(container);
};
var renderer_default = import_react48.default;
var export_Fragment = import_react48.Fragment;
var export_React = import_react48.default;
export {
  DraggableWindow,
  export_Fragment as Fragment,
  Global,
  es_exports as Motion,
  export_React as React,
  css,
  renderer_default as default,
  jsx,
  motion2 as motion,
  render
};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/** @license Material-UI v5.0.0-alpha.26
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license Material-UI v5.0.0-alpha.32
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v0.20.2
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

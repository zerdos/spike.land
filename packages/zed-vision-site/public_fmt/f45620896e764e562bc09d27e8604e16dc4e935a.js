(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[3], {
  /***/ 226: /***/ (function (module, exports, __webpack_require__) {
    var addMethods = __webpack_require__(93);
    var methods = ["sha256"];
    module.exports = function () {
      var w = new Worker(
        __webpack_require__.p + "built-sha256.95c84a.worker.js",
        { name: "built-sha256.[hash:6].worker.js" },
      );
      addMethods(w, methods);

      return w;
    };

    /***/
  }),

  /***/ 227: /***/ (function (module, exports, __webpack_require__) {
    var addMethods = __webpack_require__(93);
    var methods = ["renderWorker"];
    module.exports = function () {
      var w = new Worker(
        __webpack_require__.p + "built-renderer.b78dcc.worker.js",
        { name: "built-renderer.[hash:6].worker.js" },
      );
      addMethods(w, methods);

      return w;
    };

    /***/
  }),

  /***/ 229:
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "b",
        function () {
          return __extends;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "a",
        function () {
          return _assign;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "d",
        function () {
          return __rest;
        },
      );
      /* unused harmony export __decorate */
      /* unused harmony export __param */
      /* unused harmony export __metadata */
      /* unused harmony export __awaiter */
      /* unused harmony export __generator */
      /* unused harmony export __createBinding */
      /* unused harmony export __exportStar */
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "f",
        function () {
          return __values;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "c",
        function () {
          return __read;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "e",
        function () {
          return __spread;
        },
      );
      /* unused harmony export __spreadArrays */
      /* unused harmony export __await */
      /* unused harmony export __asyncGenerator */
      /* unused harmony export __asyncDelegator */
      /* unused harmony export __asyncValues */
      /* unused harmony export __makeTemplateObject */
      /* unused harmony export __importStar */
      /* unused harmony export __importDefault */
      /* unused harmony export __classPrivateFieldGet */
      /* unused harmony export __classPrivateFieldSet */
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

      /* global Reflect, Promise */
      var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || {
                  __proto__: [],
                } instanceof Array && function (d, b) {
              d.__proto__ = b;
            } ||
          function (d, b) {
            for (var p in b) {
              if (b.hasOwnProperty(p)) d[p] = b[p];
            }
          };

        return _extendStatics(d, b);
      };

      function __extends(d, b) {
        _extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null
          ? Object.create(b)
          : (__.prototype = b.prototype, new __());
      }

      var _assign = function __assign() {
        _assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];

            for (var p in s) {
              if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
          }

          return t;
        };

        return _assign.apply(this, arguments);
      };

      function __rest(s, e) {
        var t = {};

        for (var p in s) {
          if (
            Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0
          ) {
            t[p] = s[p];
          }
        }

        if (
          s != null && typeof Object.getOwnPropertySymbols === "function"
        ) {
          for (
            var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++
          ) {
            if (
              e.indexOf(p[i]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(s, p[i])
            ) {
              t[p[i]] = s[p[i]];
            }
          }
        }
        return t;
      }
      function __decorate(decorators, target, key, desc) {
        var c = arguments.length,
          r = c < 3
            ? target
            : desc === null
            ? desc = Object.getOwnPropertyDescriptor(target, key)
            : desc,
          d;
        if (
          typeof Reflect === "object" && typeof Reflect.decorate === "function"
        ) {
          r = Reflect.decorate(decorators, target, key, desc);
        } else {
          for (var i = decorators.length - 1; i >= 0; i--) {
            if (d = decorators[i]) {
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) ||
                r;
            }
          }
        }
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      }
      function __param(paramIndex, decorator) {
        return function (target, key) {
          decorator(target, key, paramIndex);
        };
      }
      function __metadata(metadataKey, metadataValue) {
        if (
          typeof Reflect === "object" && typeof Reflect.metadata === "function"
        ) {
          return Reflect.metadata(metadataKey, metadataValue);
        }
      }
      function __awaiter(thisArg, _arguments, P, generator) {
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
      }
      function __generator(thisArg, body) {
        var _ = {
            label: 0,
            sent: function sent() {
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
        return g = {
          next: verb(0),
          "throw": verb(1),
          "return": verb(2),
        },
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
                    : y.next) && !(t = t.call(y, op[1])).done
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
                  return {
                    value: op[1],
                    done: false,
                  };

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
          return {
            value: op[0] ? op[1] : void 0,
            done: true,
          };
        }
      }
      function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      }
      function __exportStar(m, exports) {
        for (var p in m) {
          if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator,
          m = s && o[s],
          i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") {
          return {
            next: function next() {
              if (o && i >= o.length) o = void 0;
              return {
                value: o && o[i++],
                done: !o,
              };
            },
          };
        }
        throw new TypeError(
          s ? "Object is not iterable." : "Symbol.iterator is not defined.",
        );
      }
      function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o),
          r,
          ar = [],
          e;

        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
          }
        } catch (error) {
          e = {
            error: error,
          };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }

        return ar;
      }
      function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++) {
          ar = ar.concat(__read(arguments[i]));
        }

        return ar;
      }
      function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
          s += arguments[i].length;
        }

        for (var r = Array(s), k = 0, i = 0; i < il; i++) {
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
            r[k] = a[j];
          }
        }

        return r;
      }

      function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
      }
      function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) {
          throw new TypeError("Symbol.asyncIterator is not defined.");
        }
        var g = generator.apply(thisArg, _arguments || []),
          i,
          q = [];
        return i = {},
          verb("next"),
          verb("throw"),
          verb("return"),
          i[Symbol.asyncIterator] = function () {
            return this;
          },
          i;

        function verb(n) {
          if (g[n]) {
            i[n] = function (v) {
              return new Promise(function (a, b) {
                q.push([n, v, a, b]) > 1 || resume(n, v);
              });
            };
          }
        }

        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e) {
            settle(q[0][3], e);
          }
        }

        function step(r) {
          r.value instanceof __await
            ? Promise.resolve(r.value.v).then(fulfill, reject)
            : settle(q[0][2], r);
        }

        function fulfill(value) {
          resume("next", value);
        }

        function reject(value) {
          resume("throw", value);
        }

        function settle(f, v) {
          if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
        }
      }
      function __asyncDelegator(o) {
        var i, p;
        return i = {},
          verb("next"),
          verb("throw", function (e) {
            throw e;
          }),
          verb("return"),
          i[Symbol.iterator] = function () {
            return this;
          },
          i;

        function verb(n, f) {
          i[n] = o[n]
            ? function (v) {
              return (p = !p)
                ? {
                  value: __await(o[n](v)),
                  done: n === "return",
                }
                : f
                ? f(v)
                : v;
            }
            : f;
        }
      }
      function __asyncValues(o) {
        if (!Symbol.asyncIterator) {
          throw new TypeError("Symbol.asyncIterator is not defined.");
        }
        var m = o[Symbol.asyncIterator],
          i;
        return m
          ? m.call(o)
          : (o = typeof __values === "function"
            ? __values(o)
            : o[Symbol.iterator](),
            i = {},
            verb("next"),
            verb("throw"),
            verb("return"),
            i[Symbol.asyncIterator] = function () {
              return this;
            },
            i);

        function verb(n) {
          i[n] = o[n] && function (v) {
            return new Promise(function (resolve, reject) {
              v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
          };
        }

        function settle(resolve, reject, d, v) {
          Promise.resolve(v).then(function (v) {
            resolve({
              value: v,
              done: d,
            });
          }, reject);
        }
      }
      function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", {
            value: raw,
          });
        } else {
          cooked.raw = raw;
        }

        return cooked;
      }

      function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod) {
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
          }
        }
        result.default = mod;
        return result;
      }
      function __importDefault(mod) {
        return mod && mod.__esModule ? mod : {
          default: mod,
        };
      }
      function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
          throw new TypeError("attempted to get private field on non-instance");
        }

        return privateMap.get(receiver);
      }
      function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
          throw new TypeError("attempted to set private field on non-instance");
        }

        privateMap.set(receiver, value);
        return value;
      }

      /***/
    }),

  /***/ 230:
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(30);

      var reactPropsRegex =
        /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

      var index = Object(
        _emotion_memoize__WEBPACK_IMPORTED_MODULE_0__/* default */ ["a"],
      )(function (prop) {
        return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 &&
            /* o */
            prop.charCodeAt(1) === 110 &&
            /* n */
            prop.charCodeAt(2) < 91;
      }/* Z+1 */
      );
      /* harmony default export */ __webpack_exports__["default"] = (index);

      /***/
    }),

  /***/ 251:
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      // EXPORTS
      __webpack_require__.d(__webpack_exports__, "a", function () {
        return /* binding */ animate;
      });
      __webpack_require__.d(__webpack_exports__, "b", function () {
        return /* binding */ anticipate;
      });
      __webpack_require__.d(__webpack_exports__, "c", function () {
        return /* binding */ backIn;
      });
      __webpack_require__.d(__webpack_exports__, "d", function () {
        return /* binding */ backInOut;
      });
      __webpack_require__.d(__webpack_exports__, "e", function () {
        return /* binding */ backOut;
      });
      __webpack_require__.d(__webpack_exports__, "f", function () {
        return /* binding */ bounceIn;
      });
      __webpack_require__.d(__webpack_exports__, "g", function () {
        return /* binding */ bounceInOut;
      });
      __webpack_require__.d(__webpack_exports__, "h", function () {
        return /* binding */ bounceOut;
      });
      __webpack_require__.d(__webpack_exports__, "i", function () {
        return /* binding */ circIn;
      });
      __webpack_require__.d(__webpack_exports__, "j", function () {
        return /* binding */ circInOut;
      });
      __webpack_require__.d(__webpack_exports__, "k", function () {
        return /* binding */ circOut;
      });
      __webpack_require__.d(__webpack_exports__, "l", function () {
        return /* binding */ clamp;
      });
      __webpack_require__.d(__webpack_exports__, "m", function () {
        return /* binding */ cubicBezier;
      });
      __webpack_require__.d(__webpack_exports__, "n", function () {
        return /* binding */ distance;
      });
      __webpack_require__.d(__webpack_exports__, "o", function () {
        return /* binding */ easeIn;
      });
      __webpack_require__.d(__webpack_exports__, "p", function () {
        return /* binding */ easeInOut;
      });
      __webpack_require__.d(__webpack_exports__, "q", function () {
        return /* binding */ easeOut;
      });
      __webpack_require__.d(__webpack_exports__, "r", function () {
        return /* binding */ inertia;
      });
      __webpack_require__.d(__webpack_exports__, "s", function () {
        return /* binding */ interpolate;
      });
      __webpack_require__.d(__webpack_exports__, "t", function () {
        return /* binding */ linear;
      });
      __webpack_require__.d(__webpack_exports__, "u", function () {
        return /* binding */ mix;
      });
      __webpack_require__.d(__webpack_exports__, "v", function () {
        return /* binding */ pipe;
      });
      __webpack_require__.d(__webpack_exports__, "w", function () {
        return /* binding */ progress;
      });
      __webpack_require__.d(__webpack_exports__, "x", function () {
        return /* binding */ velocityPerSecond;
      });
      __webpack_require__.d(__webpack_exports__, "y", function () {
        return /* binding */ wrap;
      });

      // UNUSED EXPORTS: angle, applyOffset, attract, attractExpo, createAnticipate, createAttractor, createBackIn, createExpoIn, decay, degreesToRadians, isPoint, isPoint3D, keyframes, mirrorEasing, mixColor, mixComplex, pointFromVector, radiansToDegrees, reverseEasing, smooth, smoothFrame, snap, spring, steps, toDecimal, velocityPerFrame

      // EXTERNAL MODULE: /z/monorepo/node_modules/core-js/modules/es.array.reduce.js
      var es_array_reduce = __webpack_require__(4);

      // CONCATENATED MODULE: /z/monorepo/node_modules/popmotion/node_modules/tslib/tslib.es6.js
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

      /* global Reflect, Promise */
      var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || {
                  __proto__: [],
                } instanceof Array && function (d, b) {
              d.__proto__ = b;
            } ||
          function (d, b) {
            for (var p in b) {
              if (b.hasOwnProperty(p)) d[p] = b[p];
            }
          };

        return _extendStatics(d, b);
      };

      function __extends(d, b) {
        _extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null
          ? Object.create(b)
          : (__.prototype = b.prototype, new __());
      }

      var _assign = function __assign() {
        _assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];

            for (var p in s) {
              if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
          }

          return t;
        };

        return _assign.apply(this, arguments);
      };

      function __rest(s, e) {
        var t = {};

        for (var p in s) {
          if (
            Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0
          ) {
            t[p] = s[p];
          }
        }

        if (
          s != null && typeof Object.getOwnPropertySymbols === "function"
        ) {
          for (
            var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++
          ) {
            if (
              e.indexOf(p[i]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(s, p[i])
            ) {
              t[p[i]] = s[p[i]];
            }
          }
        }
        return t;
      }
      function __decorate(decorators, target, key, desc) {
        var c = arguments.length,
          r = c < 3
            ? target
            : desc === null
            ? desc = Object.getOwnPropertyDescriptor(target, key)
            : desc,
          d;
        if (
          typeof Reflect === "object" && typeof Reflect.decorate === "function"
        ) {
          r = Reflect.decorate(decorators, target, key, desc);
        } else {
          for (var i = decorators.length - 1; i >= 0; i--) {
            if (d = decorators[i]) {
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) ||
                r;
            }
          }
        }
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      }
      function __param(paramIndex, decorator) {
        return function (target, key) {
          decorator(target, key, paramIndex);
        };
      }
      function __metadata(metadataKey, metadataValue) {
        if (
          typeof Reflect === "object" && typeof Reflect.metadata === "function"
        ) {
          return Reflect.metadata(metadataKey, metadataValue);
        }
      }
      function __awaiter(thisArg, _arguments, P, generator) {
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
      }
      function __generator(thisArg, body) {
        var _ = {
            label: 0,
            sent: function sent() {
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
        return g = {
          next: verb(0),
          "throw": verb(1),
          "return": verb(2),
        },
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
                    : y.next) && !(t = t.call(y, op[1])).done
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
                  return {
                    value: op[1],
                    done: false,
                  };

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
          return {
            value: op[0] ? op[1] : void 0,
            done: true,
          };
        }
      }
      function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      }
      function __exportStar(m, exports) {
        for (var p in m) {
          if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }
      function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator,
          m = s && o[s],
          i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") {
          return {
            next: function next() {
              if (o && i >= o.length) o = void 0;
              return {
                value: o && o[i++],
                done: !o,
              };
            },
          };
        }
        throw new TypeError(
          s ? "Object is not iterable." : "Symbol.iterator is not defined.",
        );
      }
      function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o),
          r,
          ar = [],
          e;

        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
          }
        } catch (error) {
          e = {
            error: error,
          };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }

        return ar;
      }
      function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++) {
          ar = ar.concat(__read(arguments[i]));
        }

        return ar;
      }
      function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
          s += arguments[i].length;
        }

        for (var r = Array(s), k = 0, i = 0; i < il; i++) {
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
            r[k] = a[j];
          }
        }

        return r;
      }

      function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
      }
      function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) {
          throw new TypeError("Symbol.asyncIterator is not defined.");
        }
        var g = generator.apply(thisArg, _arguments || []),
          i,
          q = [];
        return i = {},
          verb("next"),
          verb("throw"),
          verb("return"),
          i[Symbol.asyncIterator] = function () {
            return this;
          },
          i;

        function verb(n) {
          if (g[n]) {
            i[n] = function (v) {
              return new Promise(function (a, b) {
                q.push([n, v, a, b]) > 1 || resume(n, v);
              });
            };
          }
        }

        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e) {
            settle(q[0][3], e);
          }
        }

        function step(r) {
          r.value instanceof __await
            ? Promise.resolve(r.value.v).then(fulfill, reject)
            : settle(q[0][2], r);
        }

        function fulfill(value) {
          resume("next", value);
        }

        function reject(value) {
          resume("throw", value);
        }

        function settle(f, v) {
          if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
        }
      }
      function __asyncDelegator(o) {
        var i, p;
        return i = {},
          verb("next"),
          verb("throw", function (e) {
            throw e;
          }),
          verb("return"),
          i[Symbol.iterator] = function () {
            return this;
          },
          i;

        function verb(n, f) {
          i[n] = o[n]
            ? function (v) {
              return (p = !p)
                ? {
                  value: __await(o[n](v)),
                  done: n === "return",
                }
                : f
                ? f(v)
                : v;
            }
            : f;
        }
      }
      function __asyncValues(o) {
        if (!Symbol.asyncIterator) {
          throw new TypeError("Symbol.asyncIterator is not defined.");
        }
        var m = o[Symbol.asyncIterator],
          i;
        return m
          ? m.call(o)
          : (o = typeof __values === "function"
            ? __values(o)
            : o[Symbol.iterator](),
            i = {},
            verb("next"),
            verb("throw"),
            verb("return"),
            i[Symbol.asyncIterator] = function () {
              return this;
            },
            i);

        function verb(n) {
          i[n] = o[n] && function (v) {
            return new Promise(function (resolve, reject) {
              v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
          };
        }

        function settle(resolve, reject, d, v) {
          Promise.resolve(v).then(function (v) {
            resolve({
              value: v,
              done: d,
            });
          }, reject);
        }
      }
      function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", {
            value: raw,
          });
        } else {
          cooked.raw = raw;
        }

        return cooked;
      }

      function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod) {
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
          }
        }
        result.default = mod;
        return result;
      }
      function __importDefault(mod) {
        return mod && mod.__esModule ? mod : {
          default: mod,
        };
      }
      function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
          throw new TypeError("attempted to get private field on non-instance");
        }

        return privateMap.get(receiver);
      }
      function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
          throw new TypeError("attempted to set private field on non-instance");
        }

        privateMap.set(receiver, value);
        return value;
      }
      // EXTERNAL MODULE: /z/monorepo/node_modules/hey-listen/dist/hey-listen.es.js
      var hey_listen_es = __webpack_require__(55);

      // EXTERNAL MODULE: /z/monorepo/node_modules/style-value-types/dist/style-value-types.es.js + 1 modules
      var style_value_types_es = __webpack_require__(99);

      // EXTERNAL MODULE: /z/monorepo/node_modules/framesync/dist/framesync.es.js
      var framesync_es = __webpack_require__(94);

      // CONCATENATED MODULE: /z/monorepo/node_modules/popmotion/dist/popmotion.es.js

      var clamp = function clamp(min, max, v) {
        return Math.min(Math.max(v, min), max);
      };

      var safeMin = 0.001;
      var minDuration = 0.01;
      var maxDuration = 10.0;
      var minDamping = 0.05;
      var maxDamping = 1;

      function findSpring(_a) {
        var _b = _a.duration,
          duration = _b === void 0 ? 800 : _b,
          _c = _a.bounce,
          bounce = _c === void 0 ? 0.25 : _c,
          _d = _a.velocity,
          velocity = _d === void 0 ? 0 : _d,
          _e = _a.mass,
          mass = _e === void 0 ? 1 : _e;
        var envelope;
        var derivative;
        Object(
          hey_listen_es["b"/* warning */
          ],
        )(
          duration <= maxDuration * 1000,
          "Spring duration must be 10 seconds or less",
        );
        var dampingRatio = 1 - bounce;
        dampingRatio = clamp(minDamping, maxDamping, dampingRatio);
        duration = clamp(minDuration, maxDuration, duration / 1000);

        if (dampingRatio < 1) {
          envelope = function envelope(undampedFreq) {
            var exponentialDecay = undampedFreq * dampingRatio;
            var delta = exponentialDecay * duration;
            var a = exponentialDecay - velocity;
            var b = calcAngularFreq(undampedFreq, dampingRatio);
            var c = Math.exp(-delta);
            return safeMin - a / b * c;
          };

          derivative = function derivative(undampedFreq) {
            var exponentialDecay = undampedFreq * dampingRatio;
            var delta = exponentialDecay * duration;
            var d = delta * velocity + velocity;
            var e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq, 2) *
              duration;
            var f = Math.exp(-delta);
            var g = calcAngularFreq(Math.pow(undampedFreq, 2), dampingRatio);
            var factor = -envelope(undampedFreq) + safeMin > 0 ? -1 : 1;
            return factor * ((d - e) * f) / g;
          };
        } else {
          envelope = function envelope(undampedFreq) {
            var a = Math.exp(-undampedFreq * duration);
            var b = (undampedFreq - velocity) * duration + 1;
            return -safeMin + a * b;
          };

          derivative = function derivative(undampedFreq) {
            var a = Math.exp(-undampedFreq * duration);
            var b = (velocity - undampedFreq) * (duration * duration);
            return a * b;
          };
        }

        var initialGuess = 5 / duration;
        var undampedFreq = approximateRoot(envelope, derivative, initialGuess);

        if (isNaN(undampedFreq)) {
          return {
            stiffness: 100,
            damping: 10,
          };
        } else {
          var stiffness = Math.pow(undampedFreq, 2) * mass;
          return {
            stiffness: stiffness,
            damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
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

      var durationKeys = ["duration", "bounce"];
      var physicsKeys = ["stiffness", "damping", "mass"];

      function isSpringType(options, keys) {
        return keys.some(function (key) {
          return options[key] !== undefined;
        });
      }

      function getSpringOptions(options) {
        var springOptions = _assign({
          velocity: 0.0,
          stiffness: 100,
          damping: 10,
          mass: 1.0,
          isResolvedFromDuration: false,
        }, options);

        if (
          !isSpringType(options, physicsKeys) &&
          isSpringType(options, durationKeys)
        ) {
          var derived = findSpring(options);
          springOptions = _assign(
            _assign(_assign({}, springOptions), derived),
            {
              velocity: 0.0,
              mass: 1.0,
            },
          );
          springOptions.isResolvedFromDuration = true;
        }

        return springOptions;
      }

      function spring(_a) {
        var _b = _a.from,
          from = _b === void 0 ? 0.0 : _b,
          _c = _a.to,
          to = _c === void 0 ? 1.0 : _c,
          _d = _a.restSpeed,
          restSpeed = _d === void 0 ? 2 : _d,
          restDelta = _a.restDelta,
          options = __rest(_a, ["from", "to", "restSpeed", "restDelta"]);

        var state = {
          done: false,
          value: from,
        };

        var _e = getSpringOptions(options),
          stiffness = _e.stiffness,
          damping = _e.damping,
          mass = _e.mass,
          velocity = _e.velocity,
          isResolvedFromDuration = _e.isResolvedFromDuration;

        var resolveSpring = zero;
        var resolveVelocity = zero;

        function createSpring() {
          var initialVelocity = velocity ? -(velocity / 1000) : 0.0;
          var initialDelta = to - from;
          var dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
          var undampedAngularFreq = Math.sqrt(stiffness / mass) / 1000;
          restDelta !== null && restDelta !== void 0
            ? restDelta
            : restDelta = Math.abs(to - from) <= 1 ? 0.01 : 0.4;

          if (dampingRatio < 1) {
            var angularFreq_1 = calcAngularFreq(
              undampedAngularFreq,
              dampingRatio,
            );

            resolveSpring = function resolveSpring(t) {
              var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
              return to -
                envelope *
                  ((initialVelocity +
                        dampingRatio * undampedAngularFreq * initialDelta) /
                      angularFreq_1 * Math.sin(angularFreq_1 * t) +
                    initialDelta * Math.cos(angularFreq_1 * t));
            };

            resolveVelocity = function resolveVelocity(t) {
              var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
              return dampingRatio * undampedAngularFreq * envelope *
                  (Math.sin(angularFreq_1 * t) *
                      (initialVelocity +
                        dampingRatio * undampedAngularFreq * initialDelta) /
                      angularFreq_1 +
                    initialDelta * Math.cos(angularFreq_1 * t)) -
                envelope *
                  (Math.cos(angularFreq_1 * t) *
                      (initialVelocity +
                        dampingRatio * undampedAngularFreq * initialDelta) -
                    angularFreq_1 * initialDelta * Math.sin(angularFreq_1 * t));
            };
          } else if (dampingRatio === 1) {
            resolveSpring = function resolveSpring(t) {
              return to -
                Math.exp(-undampedAngularFreq * t) *
                  (initialDelta +
                    (initialVelocity + undampedAngularFreq * initialDelta) * t);
            };
          } else {
            var dampedAngularFreq_1 = undampedAngularFreq *
              Math.sqrt(dampingRatio * dampingRatio - 1);

            resolveSpring = function resolveSpring(t) {
              var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
              var freqForT = Math.min(dampedAngularFreq_1 * t, 300);
              return to -
                envelope *
                  ((initialVelocity +
                        dampingRatio * undampedAngularFreq * initialDelta) *
                      Math.sinh(freqForT) +
                    dampedAngularFreq_1 * initialDelta * Math.cosh(freqForT)) /
                  dampedAngularFreq_1;
            };
          }
        }

        createSpring();
        return {
          next: function next(t) {
            var current = resolveSpring(t);

            if (!isResolvedFromDuration) {
              var currentVelocity = resolveVelocity(t) * 1000;
              var isBelowVelocityThreshold =
                Math.abs(currentVelocity) <= restSpeed;
              var isBelowDisplacementThreshold =
                Math.abs(to - current) <= restDelta;
              state.done = isBelowVelocityThreshold &&
                isBelowDisplacementThreshold;
            } else {
              state.done = t >= options.duration;
            }

            state.value = state.done ? to : current;
            return state;
          },
          flipTarget: function flipTarget() {
            var _a;

            velocity = -velocity;
            _a = [to, from], from = _a[0], to = _a[1];
            createSpring();
          },
        };
      }

      spring.needsInterpolation = function (a, b) {
        return typeof a === "string" || typeof b === "string";
      };

      var zero = function zero(_t) {
        return 0;
      };

      var progress = function progress(from, to, value) {
        var toFromDifference = to - from;
        return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
      };

      var mix = function mix(from, to, progress) {
        return -progress * from + progress * to + from;
      };

      var mixLinearColor = function mixLinearColor(from, to, v) {
        var fromExpo = from * from;
        var toExpo = to * to;
        return Math.sqrt(Math.max(0, v * (toExpo - fromExpo) + fromExpo));
      };

      var colorTypes = [
        style_value_types_es["e"/* hex */
        ],
        style_value_types_es["k"/* rgba */
        ],
        style_value_types_es["f"/* hsla */
        ],
      ];

      var getColorType = function getColorType(v) {
        return colorTypes.find(function (type) {
          return type.test(v);
        });
      };

      var notAnimatable = function notAnimatable(color) {
        return "'" + color +
          "' is not an animatable color. Use the equivalent color code instead.";
      };

      var popmotion_es_mixColor = function mixColor(from, to) {
        var fromColorType = getColorType(from);
        var toColorType = getColorType(to);
        Object(
          hey_listen_es["a"/* invariant */
          ],
        )(!!fromColorType, notAnimatable(from));
        Object(
          hey_listen_es["a"/* invariant */
          ],
        )(!!toColorType, notAnimatable(to));
        Object(
          hey_listen_es["a"/* invariant */
          ],
        )(
          fromColorType.transform === toColorType.transform,
          "Both colors must be hex/RGBA, OR both must be HSLA.",
        );
        var fromColor = fromColorType.parse(from);
        var toColor = toColorType.parse(to);

        var blended = _assign({}, fromColor);

        var mixFunc = fromColorType === style_value_types_es["f"/* hsla */
          ]
          ? mix
          : mixLinearColor;
        return function (v) {
          for (var key in blended) {
            if (key !== "alpha") {
              blended[key] = mixFunc(fromColor[key], toColor[key], v);
            }
          }

          blended.alpha = mix(fromColor.alpha, toColor.alpha, v);
          return fromColorType.transform(blended);
        };
      };

      var zeroPoint = {
        x: 0,
        y: 0,
        z: 0,
      };

      var isNum = function isNum(v) {
        return typeof v === "number";
      };

      var combineFunctions = function combineFunctions(a, b) {
        return function (v) {
          return b(a(v));
        };
      };

      var pipe = function pipe() {
        var transformers = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          transformers[_i] = arguments[_i];
        }

        return transformers.reduce(combineFunctions);
      };

      function getMixer(origin, target) {
        if (isNum(origin)) {
          return function (v) {
            return mix(origin, target, v);
          };
        } else if (
          style_value_types_es["b"/* color */
          ].test(origin)
        ) {
          return popmotion_es_mixColor(origin, target);
        } else {
          return popmotion_es_mixComplex(origin, target);
        }
      }

      var popmotion_es_mixArray = function mixArray(from, to) {
        var output = __spreadArrays(from);

        var numValues = output.length;
        var blendValue = from.map(function (fromThis, i) {
          return getMixer(fromThis, to[i]);
        });
        return function (v) {
          for (var i = 0; i < numValues; i++) {
            output[i] = blendValue[i](v);
          }

          return output;
        };
      };

      var popmotion_es_mixObject = function mixObject(origin, target) {
        var output = _assign(_assign({}, origin), target);

        var blendValue = {};

        for (var key in output) {
          if (origin[key] !== undefined && target[key] !== undefined) {
            blendValue[key] = getMixer(origin[key], target[key]);
          }
        }

        return function (v) {
          for (var key in blendValue) {
            output[key] = blendValue[key](v);
          }

          return output;
        };
      };

      function analyse(value) {
        var parsed = style_value_types_es["c"/* complex */
        ].parse(value);
        var numValues = parsed.length;
        var numNumbers = 0;
        var numRGB = 0;
        var numHSL = 0;

        for (var i = 0; i < numValues; i++) {
          if (numNumbers || typeof parsed[i] === "number") {
            numNumbers++;
          } else {
            if (parsed[i].hue !== undefined) {
              numHSL++;
            } else {
              numRGB++;
            }
          }
        }

        return {
          parsed: parsed,
          numNumbers: numNumbers,
          numRGB: numRGB,
          numHSL: numHSL,
        };
      }

      var popmotion_es_mixComplex = function mixComplex(origin, target) {
        var template = style_value_types_es["c"/* complex */
        ].createTransformer(target);
        var originStats = analyse(origin);
        var targetStats = analyse(target);
        Object(
          hey_listen_es["a"/* invariant */
          ],
        )(
          originStats.numHSL === targetStats.numHSL &&
            originStats.numRGB === targetStats.numRGB &&
            originStats.numNumbers >= targetStats.numNumbers,
          "Complex values '" + origin + "' and '" + target +
            "' too different to mix. Ensure all colors are of the same type.",
        );
        return pipe(
          popmotion_es_mixArray(originStats.parsed, targetStats.parsed),
          template,
        );
      };

      var mixNumber = function mixNumber(from, to) {
        return function (p) {
          return mix(from, to, p);
        };
      };

      function detectMixerFactory(v) {
        if (typeof v === "number") {
          return mixNumber;
        } else if (typeof v === "string") {
          if (
            style_value_types_es["b"/* color */
            ].test(v)
          ) {
            return popmotion_es_mixColor;
          } else {
            return popmotion_es_mixComplex;
          }
        } else if (Array.isArray(v)) {
          return popmotion_es_mixArray;
        } else if (typeof v === "object") {
          return popmotion_es_mixObject;
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
        var from = _a[0],
          to = _a[1];
        var mixer = _b[0];
        return function (v) {
          return mixer(progress(from, to, v));
        };
      }

      function slowInterpolate(input, mixers) {
        var inputLength = input.length;
        var lastInputIndex = inputLength - 1;
        return function (v) {
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

          var progressInRange = progress(
            input[mixerIndex],
            input[mixerIndex + 1],
            v,
          );
          return mixers[mixerIndex](progressInRange);
        };
      }

      function interpolate(input, output, _a) {
        var _b = _a === void 0 ? {} : _a,
          _c = _b.clamp,
          isClamp = _c === void 0 ? true : _c,
          ease = _b.ease,
          mixer = _b.mixer;

        var inputLength = input.length;
        Object(
          hey_listen_es["a"/* invariant */
          ],
        )(
          inputLength === output.length,
          "Both input and output ranges must be the same length",
        );
        Object(
          hey_listen_es["a"/* invariant */
          ],
        )(
          !ease || !Array.isArray(ease) || ease.length === inputLength - 1,
          "Array of easing functions must be of length `input.length - 1`, as it applies to the transitions **between** the defined values.",
        );

        if (input[0] > input[inputLength - 1]) {
          input = [].concat(input);
          output = [].concat(output);
          input.reverse();
          output.reverse();
        }

        var mixers = createMixers(output, ease, mixer);
        var interpolator = inputLength === 2
          ? fastInterpolate(input, mixers)
          : slowInterpolate(input, mixers);
        return isClamp
          ? function (v) {
            return interpolator(clamp(input[0], input[inputLength - 1], v));
          }
          : interpolator;
      }

      var reverseEasing = function reverseEasing(easing) {
        return function (p) {
          return 1 - easing(1 - p);
        };
      };

      var mirrorEasing = function mirrorEasing(easing) {
        return function (p) {
          return p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
        };
      };

      var createExpoIn = function createExpoIn(power) {
        return function (p) {
          return Math.pow(p, power);
        };
      };

      var createBackIn = function createBackIn(power) {
        return function (p) {
          return p * p * ((power + 1) * p - power);
        };
      };

      var createAnticipate = function createAnticipate(power) {
        var backEasing = createBackIn(power);
        return function (p) {
          return (p *= 2) < 1
            ? 0.5 * backEasing(p)
            : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
        };
      };

      var DEFAULT_OVERSHOOT_STRENGTH = 1.525;
      var BOUNCE_FIRST_THRESHOLD = 4.0 / 11.0;
      var BOUNCE_SECOND_THRESHOLD = 8.0 / 11.0;
      var BOUNCE_THIRD_THRESHOLD = 9.0 / 10.0;

      var linear = function linear(p) {
        return p;
      };

      var easeIn = /*#__PURE__*/ createExpoIn(2);
      var easeOut = /*#__PURE__*/ reverseEasing(easeIn);
      var easeInOut = /*#__PURE__*/ mirrorEasing(easeIn);

      var circIn = function circIn(p) {
        return 1 - Math.sin(Math.acos(p));
      };

      var circOut = /*#__PURE__*/ reverseEasing(circIn);
      var circInOut = /*#__PURE__*/ mirrorEasing(circOut);
      var backIn = /*#__PURE__*/ createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
      var backOut = /*#__PURE__*/ reverseEasing(backIn);
      var backInOut = /*#__PURE__*/ mirrorEasing(backIn);
      var anticipate = /*#__PURE__*/ createAnticipate(
        DEFAULT_OVERSHOOT_STRENGTH,
      );
      var ca = 4356.0 / 361.0;
      var cb = 35442.0 / 1805.0;
      var cc = 16061.0 / 1805.0;

      var bounceOut = function bounceOut(p) {
        if (p === 1 || p === 0) return p;
        var p2 = p * p;
        return p < BOUNCE_FIRST_THRESHOLD
          ? 7.5625 * p2
          : p < BOUNCE_SECOND_THRESHOLD
          ? 9.075 * p2 - 9.9 * p + 3.4
          : p < BOUNCE_THIRD_THRESHOLD
          ? ca * p2 - cb * p + cc
          : 10.8 * p * p - 20.52 * p + 10.72;
      };

      var bounceIn = /*#__PURE__*/ reverseEasing(bounceOut);

      var bounceInOut = function bounceInOut(p) {
        return p < 0.5
          ? 0.5 * (1.0 - bounceOut(1.0 - p * 2.0))
          : 0.5 * bounceOut(p * 2.0 - 1.0) + 0.5;
      };

      function defaultEasing(values, easing) {
        return values.map(function () {
          return easing || easeInOut;
        }).splice(0, values.length - 1);
      }

      function defaultOffset(values) {
        var numValues = values.length;
        return values.map(function (_value, i) {
          return i !== 0 ? i / (numValues - 1) : 0;
        });
      }

      function convertOffsetToTimes(offset, duration) {
        return offset.map(function (o) {
          return o * duration;
        });
      }

      function keyframes(_a) {
        var _b = _a.from,
          from = _b === void 0 ? 0 : _b,
          _c = _a.to,
          to = _c === void 0 ? 1 : _c,
          ease = _a.ease,
          offset = _a.offset,
          _d = _a.duration,
          duration = _d === void 0 ? 300 : _d;
        var state = {
          done: false,
          value: from,
        };
        var values = Array.isArray(to) ? to : [from, to];
        var times = convertOffsetToTimes(
          offset !== null && offset !== void 0 ? offset : defaultOffset(values),
          duration,
        );

        function createInterpolator() {
          return interpolate(times, values, {
            ease: Array.isArray(ease) ? ease : defaultEasing(values, ease),
          });
        }

        var interpolator = createInterpolator();
        return {
          next: function next(t) {
            state.value = interpolator(t);
            state.done = t >= duration;
            return state;
          },
          flipTarget: function flipTarget() {
            values.reverse();
            interpolator = createInterpolator();
          },
        };
      }

      function decay(_a) {
        var _b = _a.velocity,
          velocity = _b === void 0 ? 0 : _b,
          _c = _a.from,
          from = _c === void 0 ? 0 : _c,
          _d = _a.power,
          power = _d === void 0 ? 0.8 : _d,
          _e = _a.timeConstant,
          timeConstant = _e === void 0 ? 350 : _e,
          _f = _a.restDelta,
          restDelta = _f === void 0 ? 0.5 : _f,
          modifyTarget = _a.modifyTarget;
        var state = {
          done: false,
          value: from,
        };
        var amplitude = power * velocity;
        var ideal = from + amplitude;
        var target = modifyTarget === undefined ? ideal : modifyTarget(ideal);
        if (target !== ideal) amplitude = target - from;
        return {
          next: function next(t) {
            var delta = -amplitude * Math.exp(-t / timeConstant);
            state.done = !(delta > restDelta || delta < -restDelta);
            state.value = state.done ? target : target + delta;
            return state;
          },
          flipTarget: function flipTarget() {},
        };
      }

      var types = {
        keyframes: keyframes,
        spring: spring,
        decay: decay,
      };

      function detectAnimationFromOptions(config) {
        if (Array.isArray(config.to)) {
          return keyframes;
        } else if (types[config.type]) {
          return types[config.type];
        }

        var keys = new Set(Object.keys(config));

        if (
          keys.has("ease") || keys.has("duration") && !keys.has("dampingRatio")
        ) {
          return keyframes;
        } else if (
          keys.has("dampingRatio") || keys.has("stiffness") ||
          keys.has("mass") || keys.has("damping") || keys.has("restSpeed") ||
          keys.has("restDelta")
        ) {
          return spring;
        }

        return keyframes;
      }

      function loopElapsed(elapsed, duration, delay) {
        if (delay === void 0) {
          delay = 0;
        }

        return elapsed - duration - delay;
      }

      function reverseElapsed(elapsed, duration, delay, isForwardPlayback) {
        if (delay === void 0) {
          delay = 0;
        }

        if (isForwardPlayback === void 0) {
          isForwardPlayback = true;
        }

        return isForwardPlayback
          ? loopElapsed(duration + -elapsed, duration, delay)
          : duration - (elapsed - duration) + delay;
      }

      function hasRepeatDelayElapsed(
        elapsed,
        duration,
        delay,
        isForwardPlayback,
      ) {
        return isForwardPlayback
          ? elapsed >= duration + delay
          : elapsed <= -delay;
      }

      var popmotion_es_framesync = function framesync(update) {
        var passTimestamp = function passTimestamp(_a) {
          var delta = _a.delta;
          return update(delta);
        };

        return {
          start: function start() {
            return framesync_es["b"/* default */
            ].update(passTimestamp, true, true);
          },
          stop: function stop() {
            return framesync_es["a"/* cancelSync */
            ].update(passTimestamp);
          },
        };
      };

      function animate(_a) {
        var _b, _c;

        var from = _a.from,
          _d = _a.autoplay,
          autoplay = _d === void 0 ? true : _d,
          _e = _a.driver,
          driver = _e === void 0 ? popmotion_es_framesync : _e,
          _f = _a.elapsed,
          elapsed = _f === void 0 ? 0 : _f,
          _g = _a.repeat,
          repeatMax = _g === void 0 ? 0 : _g,
          _h = _a.repeatType,
          repeatType = _h === void 0 ? "loop" : _h,
          _j = _a.repeatDelay,
          repeatDelay = _j === void 0 ? 0 : _j,
          onPlay = _a.onPlay,
          onStop = _a.onStop,
          onComplete = _a.onComplete,
          onRepeat = _a.onRepeat,
          onUpdate = _a.onUpdate,
          options = __rest(
            _a,
            [
              "from",
              "autoplay",
              "driver",
              "elapsed",
              "repeat",
              "repeatType",
              "repeatDelay",
              "onPlay",
              "onStop",
              "onComplete",
              "onRepeat",
              "onUpdate",
            ],
          );

        var to = options.to;
        var driverControls;
        var repeatCount = 0;
        var computedDuration = options.duration;
        var latest;
        var isComplete = false;
        var isForwardPlayback = true;
        var interpolateFromNumber;
        var animator = detectAnimationFromOptions(options);

        if (
          (_c = (_b = animator).needsInterpolation) === null || _c === void 0
            ? void 0
            : _c.call(_b, from, to)
        ) {
          interpolateFromNumber = interpolate([0, 100], [from, to], {
            clamp: false,
          });
          from = 0;
          to = 100;
        }

        var animation = animator(_assign(_assign({}, options), {
          from: from,
          to: to,
        }));

        function repeat() {
          repeatCount++;

          if (repeatType === "reverse") {
            isForwardPlayback = repeatCount % 2 === 0;
            elapsed = reverseElapsed(
              elapsed,
              computedDuration,
              repeatDelay,
              isForwardPlayback,
            );
          } else {
            elapsed = loopElapsed(elapsed, computedDuration, repeatDelay);
            if (repeatType === "mirror") animation.flipTarget();
          }

          isComplete = false;
          onRepeat && onRepeat();
        }

        function complete() {
          driverControls.stop();
          onComplete && onComplete();
        }

        function update(delta) {
          if (!isForwardPlayback) delta = -delta;
          elapsed += delta;

          if (!isComplete) {
            var state = animation.next(Math.max(0, elapsed));
            latest = state.value;
            if (interpolateFromNumber) latest = interpolateFromNumber(latest);
            isComplete = isForwardPlayback ? state.done : elapsed <= 0;
          }

          onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(latest);

          if (isComplete) {
            if (
              repeatCount === 0
            ) {
              computedDuration !== null && computedDuration !== void 0
                ? computedDuration
                : computedDuration = elapsed;
            }

            if (repeatCount < repeatMax) {
              hasRepeatDelayElapsed(
                elapsed,
                computedDuration,
                repeatDelay,
                isForwardPlayback,
              ) && repeat();
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
          stop: function stop() {
            onStop === null || onStop === void 0 ? void 0 : onStop();
            driverControls.stop();
          },
        };
      }

      function velocityPerSecond(velocity, frameDuration) {
        return frameDuration ? velocity * (1000 / frameDuration) : 0;
      }

      function inertia(_a) {
        var _b = _a.from,
          from = _b === void 0 ? 0 : _b,
          _c = _a.velocity,
          velocity = _c === void 0 ? 0 : _c,
          min = _a.min,
          max = _a.max,
          _d = _a.power,
          power = _d === void 0 ? 0.8 : _d,
          _e = _a.timeConstant,
          timeConstant = _e === void 0 ? 750 : _e,
          _f = _a.bounceStiffness,
          bounceStiffness = _f === void 0 ? 500 : _f,
          _g = _a.bounceDamping,
          bounceDamping = _g === void 0 ? 10 : _g,
          _h = _a.restDelta,
          restDelta = _h === void 0 ? 1 : _h,
          modifyTarget = _a.modifyTarget,
          driver = _a.driver,
          _onUpdate = _a.onUpdate,
          onComplete = _a.onComplete;
        var currentAnimation;

        function isOutOfBounds(v) {
          return min !== undefined && v < min || max !== undefined && v > max;
        }

        function boundaryNearest(v) {
          if (min === undefined) return max;
          if (max === undefined) return min;
          return Math.abs(min - v) < Math.abs(max - v) ? min : max;
        }

        function startAnimation(options) {
          currentAnimation === null || currentAnimation === void 0
            ? void 0
            : currentAnimation.stop();
          currentAnimation = animate(_assign(_assign({}, options), {
            driver: driver,
            onUpdate: function onUpdate(v) {
              var _a;

              _onUpdate === null || _onUpdate === void 0
                ? void 0
                : _onUpdate(v);
              (_a = options.onUpdate) === null || _a === void 0
                ? void 0
                : _a.call(options, v);
            },
            onComplete: onComplete,
          }));
        }

        function startSpring(options) {
          startAnimation(_assign({
            type: "spring",
            stiffness: bounceStiffness,
            damping: bounceDamping,
            restDelta: restDelta,
          }, options));
        }

        if (isOutOfBounds(from)) {
          startSpring({
            from: from,
            velocity: velocity,
            to: boundaryNearest(from),
          });
        } else {
          var target = power * velocity + from;
          if (typeof modifyTarget !== "undefined") {
            target = modifyTarget(target);
          }
          var boundary_1 = boundaryNearest(target);
          var heading_1 = boundary_1 === min ? -1 : 1;
          var prev_1;
          var current_1;

          var checkBoundary = function checkBoundary(v) {
            prev_1 = current_1;
            current_1 = v;
            velocity = velocityPerSecond(
              v - prev_1,
              Object(
                framesync_es["c"/* getFrameData */
                ],
              )().delta,
            );

            if (
              heading_1 === 1 && v > boundary_1 ||
              heading_1 === -1 && v < boundary_1
            ) {
              startSpring({
                from: v,
                to: boundary_1,
                velocity: velocity,
              });
            }
          };

          startAnimation({
            type: "decay",
            from: from,
            velocity: velocity,
            timeConstant: timeConstant,
            power: power,
            restDelta: restDelta,
            modifyTarget: modifyTarget,
            onUpdate: isOutOfBounds(target) ? checkBoundary : undefined,
          });
        }

        return {
          stop: function stop() {
            return currentAnimation === null || currentAnimation === void 0
              ? void 0
              : currentAnimation.stop();
          },
        };
      }

      var radiansToDegrees = function radiansToDegrees(radians) {
        return radians * 180 / Math.PI;
      };

      var angle = function angle(a, b) {
        if (b === void 0) {
          b = zeroPoint;
        }

        return radiansToDegrees(Math.atan2(b.y - a.y, b.x - a.x));
      };

      var applyOffset = function applyOffset(from, to) {
        var hasReceivedFrom = true;

        if (to === undefined) {
          to = from;
          hasReceivedFrom = false;
        }

        return function (v) {
          if (hasReceivedFrom) {
            return v - from + to;
          } else {
            from = v;
            hasReceivedFrom = true;
            return to;
          }
        };
      };

      var identity = function identity(v) {
        return v;
      };

      var createAttractor = function createAttractor(alterDisplacement) {
        if (alterDisplacement === void 0) {
          alterDisplacement = identity;
        }

        return function (constant, origin, v) {
          var displacement = origin - v;
          var springModifiedDisplacement = -(0 - constant + 1) *
            (0 - alterDisplacement(Math.abs(displacement)));
          return displacement <= 0
            ? origin + springModifiedDisplacement
            : origin - springModifiedDisplacement;
        };
      };

      var attract = /*#__PURE__*/ createAttractor();
      var attractExpo = /*#__PURE__*/ createAttractor(Math.sqrt);

      var degreesToRadians = function degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
      };

      var isPoint = function isPoint(point) {
        return point.hasOwnProperty("x") && point.hasOwnProperty("y");
      };

      var isPoint3D = function isPoint3D(point) {
        return isPoint(point) && point.hasOwnProperty("z");
      };

      var distance1D = function distance1D(a, b) {
        return Math.abs(a - b);
      };

      function distance(a, b) {
        if (isNum(a) && isNum(b)) {
          return distance1D(a, b);
        } else if (isPoint(a) && isPoint(b)) {
          var xDelta = distance1D(a.x, b.x);
          var yDelta = distance1D(a.y, b.y);
          var zDelta = isPoint3D(a) && isPoint3D(b) ? distance1D(a.z, b.z) : 0;
          return Math.sqrt(
            Math.pow(xDelta, 2) + Math.pow(yDelta, 2) + Math.pow(zDelta, 2),
          );
        }
      }

      var pointFromVector = function pointFromVector(origin, angle, distance) {
        angle = degreesToRadians(angle);
        return {
          x: distance * Math.cos(angle) + origin.x,
          y: distance * Math.sin(angle) + origin.y,
        };
      };

      var toDecimal = function toDecimal(num, precision) {
        if (precision === void 0) {
          precision = 2;
        }

        precision = Math.pow(10, precision);
        return Math.round(num * precision) / precision;
      };

      var smoothFrame = function smoothFrame(
        prevValue,
        nextValue,
        duration,
        smoothing,
      ) {
        if (smoothing === void 0) {
          smoothing = 0;
        }

        return toDecimal(
          prevValue +
            duration * (nextValue - prevValue) / Math.max(smoothing, duration),
        );
      };

      var popmotion_es_smooth = function smooth(strength) {
        if (strength === void 0) {
          strength = 50;
        }

        var previousValue = 0;
        var lastUpdated = 0;
        return function (v) {
          var currentFramestamp = Object(
            framesync_es["c"/* getFrameData */
            ],
          )().timestamp;
          var timeDelta = currentFramestamp !== lastUpdated
            ? currentFramestamp - lastUpdated
            : 0;
          var newValue = timeDelta
            ? smoothFrame(previousValue, v, timeDelta, strength)
            : previousValue;
          lastUpdated = currentFramestamp;
          previousValue = newValue;
          return newValue;
        };
      };

      var snap = function snap(points) {
        if (typeof points === "number") {
          return function (v) {
            return Math.round(v / points) * points;
          };
        } else {
          var i_1 = 0;
          var numPoints_1 = points.length;
          return function (v) {
            var lastDistance = Math.abs(points[0] - v);

            for (i_1 = 1; i_1 < numPoints_1; i_1++) {
              var point = points[i_1];
              var distance = Math.abs(point - v);
              if (distance === 0) return point;
              if (distance > lastDistance) return points[i_1 - 1];
              if (i_1 === numPoints_1 - 1) return point;
              lastDistance = distance;
            }
          };
        }
      };

      function velocityPerFrame(xps, frameDuration) {
        return xps / (1000 / frameDuration);
      }

      var wrap = function wrap(min, max, v) {
        var rangeSize = max - min;
        return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
      };

      var a = function a(a1, a2) {
        return 1.0 - 3.0 * a2 + 3.0 * a1;
      };

      var b = function b(a1, a2) {
        return 3.0 * a2 - 6.0 * a1;
      };

      var c = function c(a1) {
        return 3.0 * a1;
      };

      var calcBezier = function calcBezier(t, a1, a2) {
        return ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
      };

      var getSlope = function getSlope(t, a1, a2) {
        return 3.0 * a(a1, a2) * t * t + 2.0 * b(a1, a2) * t + c(a1);
      };

      var subdivisionPrecision = 0.0000001;
      var subdivisionMaxIterations = 10;

      function binarySubdivide(aX, aA, aB, mX1, mX2) {
        var currentX;
        var currentT;
        var i = 0;

        do {
          currentT = aA + (aB - aA) / 2.0;
          currentX = calcBezier(currentT, mX1, mX2) - aX;

          if (currentX > 0.0) {
            aB = currentT;
          } else {
            aA = currentT;
          }
        } while (
          Math.abs(currentX) > subdivisionPrecision &&
          ++i < subdivisionMaxIterations
        );

        return currentT;
      }

      var newtonIterations = 8;
      var newtonMinSlope = 0.001;

      function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
        for (var i = 0; i < newtonIterations; ++i) {
          var currentSlope = getSlope(aGuessT, mX1, mX2);

          if (currentSlope === 0.0) {
            return aGuessT;
          }

          var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
          aGuessT -= currentX / currentSlope;
        }

        return aGuessT;
      }

      var kSplineTableSize = 11;
      var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

      function cubicBezier(mX1, mY1, mX2, mY2) {
        if (mX1 === mY1 && mX2 === mY2) return linear;
        var sampleValues = new Float32Array(kSplineTableSize);

        for (var i = 0; i < kSplineTableSize; ++i) {
          sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
        }

        function getTForX(aX) {
          var intervalStart = 0.0;
          var currentSample = 1;
          var lastSample = kSplineTableSize - 1;

          for (
            ;
            currentSample !== lastSample && sampleValues[currentSample] <= aX;
            ++currentSample
          ) {
            intervalStart += kSampleStepSize;
          }

          --currentSample;
          var dist = (aX - sampleValues[currentSample]) /
            (sampleValues[currentSample + 1] - sampleValues[currentSample]);
          var guessForT = intervalStart + dist * kSampleStepSize;
          var initialSlope = getSlope(guessForT, mX1, mX2);

          if (initialSlope >= newtonMinSlope) {
            return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
          } else if (initialSlope === 0.0) {
            return guessForT;
          } else {
            return binarySubdivide(
              aX,
              intervalStart,
              intervalStart + kSampleStepSize,
              mX1,
              mX2,
            );
          }
        }

        return function (t) {
          return t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
        };
      }

      var steps = function steps(_steps, direction) {
        if (direction === void 0) {
          direction = "end";
        }

        return function (progress) {
          progress = direction === "end"
            ? Math.min(progress, 0.999)
            : Math.max(progress, 0.001);
          var expanded = progress * _steps;
          var rounded = direction === "end"
            ? Math.floor(expanded)
            : Math.ceil(expanded);
          return clamp(0, 1, rounded / _steps);
        };
      };

      /***/
    }),

  /***/ 54: /***/ (function (module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony export (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "b",
      function () {
        return defaultProps;
      },
    );
    /* harmony export (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "a",
      function () {
        return counterExample;
      },
    );
    /* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(21);

    var defaultProps = {
      events: ["reset"].concat(
        Object(
          _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__/* default */ [
            "a"
          ],
        )(new Array(8).fill("+1")),
      ),
    };
    var counterExample =
      'import React, { FC, useState } from "react";\nimport ReactDOM from "react-dom";\n\nconst Counter: FC<{ initial?: number }> = (\n  { initial = 0 },\n) => {\n  const [clicks, setClicks] = useState(initial);\n\n  return <div>\n    <p>Clicks: {clicks}</p>\n    <button onClick={() => setClicks(clicks + 1)}>+</button>\n    <button onClick={() => setClicks(clicks - 1)}>-</button>\n  </div>;\n};\n\nconst rootElement = document.createElement("div");\n\nReactDOM.render(<Counter initial={0} />, rootElement);\ndocument.body.appendChild(rootElement);\n\n';

    /***/
  }),

  /***/ 55: /***/ (function (module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony export (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "a",
      function () {
        return invariant;
      },
    );
    /* harmony export (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "b",
      function () {
        return warning;
      },
    );
    var warning = function warning() {};

    var invariant = function invariant() {};

    if (false) {}

    /***/
  }),

  /***/ 93: /***/ (function (module, exports) {
    function addMethods(worker, methods) {
      var c = 0;
      var callbacks = {};
      worker.addEventListener("message", function (e) {
        var d = e.data;
        if (d.type !== "RPC") return;

        if (d.id) {
          var f = callbacks[d.id];

          if (f) {
            delete callbacks[d.id];

            if (d.error) {
              f[1](Object.assign(Error(d.error.message), d.error));
            } else {
              f[0](d.result);
            }
          }
        } else {
          var evt = document.createEvent("Event");
          evt.initEvent(d.method, false, false);
          evt.data = d.params;
          worker.dispatchEvent(evt);
        }
      });
      methods.forEach(function (method) {
        worker[method] = function () {
          var _arguments = arguments;
          return new Promise(function (a, b) {
            var id = ++c;
            callbacks[id] = [a, b];
            worker.postMessage({
              type: "RPC",
              id: id,
              method: method,
              params: [].slice.call(_arguments),
            });
          });
        };
      });
    }

    module.exports = addMethods;

    /***/
  }),

  /***/ 94: /***/ (function (module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony export (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "a",
      function () {
        return cancelSync;
      },
    );
    /* harmony export (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "c",
      function () {
        return getFrameData;
      },
    );
    /* harmony import */ var core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(4);
    /* harmony import */ var core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_0___default =
      /*#__PURE__*/ __webpack_require__.n(
        core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_0__,
      );
    /* harmony import */ var hey_listen__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(55);

    var prevTime = 0;
    var onNextFrame =
      typeof window !== "undefined" &&
        window.requestAnimationFrame !== undefined
        ? function (callback) {
          return window.requestAnimationFrame(callback);
        }
        : function (callback) {
          var timestamp = Date.now();
          var timeToCall = Math.max(0, 16.7 - (timestamp - prevTime));
          prevTime = timestamp + timeToCall;
          setTimeout(function () {
            return callback(prevTime);
          }, timeToCall);
        };

    var createStep = function createStep(setRunNextFrame) {
      var processToRun = [];
      var processToRunNextFrame = [];
      var numThisFrame = 0;
      var isProcessing = false;
      var i = 0;
      var cancelled = new WeakSet();
      var toKeepAlive = new WeakSet();
      var renderStep = {
        cancel: function cancel(process) {
          var indexOfCallback = processToRunNextFrame.indexOf(process);
          cancelled.add(process);

          if (indexOfCallback !== -1) {
            processToRunNextFrame.splice(indexOfCallback, 1);
          }
        },
        process: function process(frame) {
          var _a;

          isProcessing = true;
          _a = [processToRunNextFrame, processToRun],
            processToRun = _a[0],
            processToRunNextFrame = _a[1];
          processToRunNextFrame.length = 0;
          numThisFrame = processToRun.length;

          if (numThisFrame) {
            var process_1;

            for (i = 0; i < numThisFrame; i++) {
              process_1 = processToRun[i];
              process_1(frame);

              if (
                toKeepAlive.has(process_1) === true && !cancelled.has(process_1)
              ) {
                renderStep.schedule(process_1);
                setRunNextFrame(true);
              }
            }
          }

          isProcessing = false;
        },
        schedule: function schedule(process, keepAlive, immediate) {
          if (keepAlive === void 0) {
            keepAlive = false;
          }

          if (immediate === void 0) {
            immediate = false;
          }

          Object(hey_listen__WEBPACK_IMPORTED_MODULE_1__/* invariant */ ["a"])(
            typeof process === "function",
            "Argument must be a function",
          );
          var addToCurrentBuffer = immediate && isProcessing;
          var buffer = addToCurrentBuffer
            ? processToRun
            : processToRunNextFrame;
          cancelled.delete(process);
          if (keepAlive) toKeepAlive.add(process);

          if (buffer.indexOf(process) === -1) {
            buffer.push(process);
            if (addToCurrentBuffer) numThisFrame = processToRun.length;
          }
        },
      };
      return renderStep;
    };

    var maxElapsed = 40;
    var defaultElapsed = 1 / 60 * 1000;
    var useDefaultElapsed = true;
    var willRunNextFrame = false;
    var isProcessing = false;
    var frame = {
      delta: 0,
      timestamp: 0,
    };
    var stepsOrder = ["read", "update", "preRender", "render", "postRender"];

    var setWillRunNextFrame = function setWillRunNextFrame(willRun) {
      return willRunNextFrame = willRun;
    };

    var steps = /*#__PURE__*/ stepsOrder.reduce(function (acc, key) {
      acc[key] = createStep(setWillRunNextFrame);
      return acc;
    }, {});
    var sync = /*#__PURE__*/ stepsOrder.reduce(function (acc, key) {
      var step = steps[key];

      acc[key] = function (process, keepAlive, immediate) {
        if (keepAlive === void 0) {
          keepAlive = false;
        }

        if (immediate === void 0) {
          immediate = false;
        }

        if (!willRunNextFrame) startLoop();
        step.schedule(process, keepAlive, immediate);
        return process;
      };

      return acc;
    }, {});
    var cancelSync = /*#__PURE__*/ stepsOrder.reduce(function (acc, key) {
      acc[key] = steps[key].cancel;
      return acc;
    }, {});

    var processStep = function processStep(stepId) {
      return steps[stepId].process(frame);
    };

    var processFrame = function processFrame(timestamp) {
      willRunNextFrame = false;
      frame.delta = useDefaultElapsed
        ? defaultElapsed
        : Math.max(Math.min(timestamp - frame.timestamp, maxElapsed), 1);
      if (!useDefaultElapsed) defaultElapsed = frame.delta;
      frame.timestamp = timestamp;
      isProcessing = true;
      stepsOrder.forEach(processStep);
      isProcessing = false;

      if (willRunNextFrame) {
        useDefaultElapsed = false;
        onNextFrame(processFrame);
      }
    };

    var startLoop = function startLoop() {
      willRunNextFrame = true;
      useDefaultElapsed = true;
      if (!isProcessing) onNextFrame(processFrame);
    };

    var getFrameData = function getFrameData() {
      return frame;
    };

    /* harmony default export */ __webpack_exports__["b"] = (sync);

    /***/
  }),

  /***/ 96: /***/ (function (module, __webpack_exports__, __webpack_require__) {
    "use strict";

    // EXPORTS
    __webpack_require__.d(__webpack_exports__, "a", function () {
      return /* binding */ CodeBox_CodeBox;
    });

    // EXTERNAL MODULE: /z/monorepo/node_modules/@babel/runtime/regenerator/index.js
    var regenerator = __webpack_require__(19);
    var regenerator_default = /*#__PURE__*/ __webpack_require__.n(regenerator);

    // EXTERNAL MODULE: /z/monorepo/node_modules/@babel/runtime/helpers/esm/defineProperty.js
    var defineProperty = __webpack_require__(14);

    // EXTERNAL MODULE: /z/monorepo/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 5 modules
    var toConsumableArray = __webpack_require__(21);

    // EXTERNAL MODULE: /z/monorepo/node_modules/regenerator-runtime/runtime.js
    var runtime = __webpack_require__(9);

    // EXTERNAL MODULE: /z/monorepo/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
    var asyncToGenerator = __webpack_require__(20);

    // EXTERNAL MODULE: /z/monorepo/node_modules/react/index.js
    var react = __webpack_require__(0);

    // CONCATENATED MODULE: ../smart-monaco-editor/lib/editor.js
    var editor_require;
    var startMonaco = /*#__PURE__*/ function () {
      var _ref2 = Object(
        asyncToGenerator["a"/* default */
        ],
      )(/*#__PURE__*/ regenerator_default.a.mark(function _callee2(_ref) {
        var onChange,
          code,
          language,
          container,
          el,
          modelUri,
          aceEditor,
          aceEl,
          setThemeForAce,
          vsPath,
          _yield$loadScript,
          require,
          monaco,
          modules,
          importHelper,
          dts;
        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                onChange = _ref.onChange,
                  code = _ref.code,
                  language = _ref.language;
                container = window.document.getElementById("container");
                if (!container) {
                  el = document.getElementById("container");
                  el.id = "container";
                  document.body.appendChild(el);
                }
                modelUri = language === "typescript"
                  ? "file:///main.tsx"
                  : "file:///main.html";
                if (
                  !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
                    .test(window.navigator.userAgent)
                ) {
                  _context2.next = 27;
                  break;
                }
                aceEl = window.document.createElement("div");
                aceEl.id = "ace";
                window.document.body.appendChild(aceEl);
                _context2.next = 10;
                return loadScript(
                  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.min.js",
                );
              case 10:
                if (!(language === "typescript")) {
                  _context2.next = 15;
                  break;
                }
                _context2.next = 13;
                return loadScript(
                  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-typescript.min.js",
                );
              case 13:
                _context2.next = 17;
                break;
              case 15:
                _context2.next = 17;
                return loadScript(
                  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-html.min.js",
                );
              case 17:
                _context2.next = 19;
                return loadScript(
                  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/theme-monokai.min.js",
                );
              case 19:
                window.document.getElementById("ace").style.setProperty(
                  "display",
                  "block",
                );
                container.style.setProperty("display", "none");
                aceEditor = window["ace"].edit("ace");
                aceEditor.getSession().setMode("ace/mode/typescript");
                setThemeForAce = function setThemeForAce(wait) {
                  return setTimeout(function () {
                    var aceEditor1 = window["ace"].edit("ace");
                    var theme = aceEditor1.getTheme();
                    if (theme !== "ace/theme/monokai ") {
                      aceEditor1.setOptions({ fontSize: "14pt" });
                      aceEditor1.setTheme("ace/theme/monokai");
                      setThemeForAce(2 * wait);
                    }
                  }, wait);
                };
                setThemeForAce(100);
                aceEditor.setValue(code);
                aceEditor.blur();
              case 27:
                if (!(window["monaco"] === undefined)) {
                  _context2.next = 36;
                  break;
                }
                vsPath =
                  "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs";
                _context2.next = 31;
                return loadScript(
                  "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs" +
                    "/loader.min.js",
                );
              case 31:
                _yield$loadScript = _context2.sent;
                require = _yield$loadScript.require;
                require.config(
                  {
                    paths: {
                      "vs":
                        "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs",
                    },
                  },
                );
                _context2.next = 36;
                return new Promise(function (resolve) {
                  return require(["vs/editor/editor.main"], function (monaco) {
                    resolve(monaco);
                  });
                });
              case 36:
                monaco = window["monaco"];
                modules = {
                  monaco: monaco,
                  editor: monaco.editor.create(
                    window.document.getElementById("container"),
                    {
                      formatOnType: true,
                      scrollbar: {
                        horizontal: "hidden",
                        verticalHasArrows: true,
                        verticalScrollbarSize: 20,
                      },
                      minimap: { enabled: false },
                      folding: false,
                      multiCursorModifier: "alt",
                      wordWrap: "on",
                      wordWrapBreakAfterCharacters: ">([{]))],;}",
                      mouseWheelZoom: false,
                      wordWrapColumn: 80,
                      automaticLayout: true,
                      scrollBeyondLastLine: false,
                      autoIndent: "brackets",
                      autoClosingQuotes: "always",
                      padding: { bottom: 300 },
                      lineNumbers: "on",
                      autoClosingBrackets: "always",
                      autoClosingOvertype: "always",
                      suggest: {},
                      codeLens: true,
                      autoSurround: "languageDefined",
                      trimAutoWhitespace: true,
                      codeActionsOnSaveTimeout: 100,
                      model: monaco.editor.getModel(modelUri) ||
                        monaco.editor.createModel(
                          code,
                          language,
                          monaco.Uri.parse(modelUri),
                        ),
                      value: code,
                      language: language,
                      theme: "vs-dark",
                    },
                  ),
                };
                modules.editor.onDidChangeModelContent(function () {
                  return onChange(modules.editor.getValue());
                });
                aceEditor && aceEditor.session.on("change", function () {
                  var value = aceEditor.getValue();
                  modules.editor.setValue(value);
                  onChange(value);
                });
                aceEditor &&
                  document.getElementById("container").replaceWith(
                    document.getElementById("ace"),
                  );
                modules.monaco.languages.typescript.typescriptDefaults
                  .setDiagnosticsOptions(
                    {
                      noSuggestionDiagnostics: true,
                      noSemanticValidation: true,
                      noSyntaxValidation: true,
                    },
                  );
                if (!(language === "typescript")) {
                  _context2.next = 50;
                  break;
                }
                importHelper = [
                  {
                    name: "react",
                    url: "https://unpkg.com/@types/react@16.9.56/index.d.ts",
                    depend: ["global", "csstype", "react-dom", "prop-types"],
                  },
                  {
                    name: "global",
                    url: "https://unpkg.com/@types/react@16.9.56/global.d.ts",
                    depend: [],
                  },
                  {
                    name: "prop-types",
                    url:
                      "https://unpkg.com/@types/prop-types@15.7.3/index.d.ts",
                    depend: [],
                  },
                  {
                    name: "react-dom",
                    url: "https://unpkg.com/@types/react-dom@16.9.9/index.d.ts",
                    depend: [],
                  },
                  {
                    name: "csstype",
                    url: "https://unpkg.com/csstype@3.0.5/index.d.ts",
                    depend: [],
                  },
                  {
                    name: "@emotion/styled/base.d.ts",
                    url:
                      "https://unpkg.com/@emotion/styled@11.0.0/types/base.d.ts",
                    depend: ["@emotion/react", "@emotion/serialize", "react"],
                  },
                  {
                    name: "@emotion/styled/index.d.ts",
                    url:
                      "https://unpkg.com/@emotion/styled@11.0.0/types/index.d.ts",
                    depend: ["@emotion/react", "@emotion/serialize", "react"],
                  },
                  {
                    name: "@emotion/cache/index.d.ts",
                    url:
                      "https://unpkg.com/@emotion/cache@11.0.0/types/index.d.ts",
                    depend: ["@emotion/utils"],
                  },
                  {
                    name: "@emotion/react/index.d.ts",
                    url:
                      "https://unpkg.com/@emotion/react@11.1.1/types/index.d.ts",
                    depend: ["@emotion/cache"],
                  },
                  {
                    name: "@emotion/react/jsx-namespace.d.ts",
                    url:
                      "https://unpkg.com/@emotion/react@11.1.1/types/jsx-namespace.d.ts",
                    depend: ["@emotion/utils", "csstype"],
                  },
                  {
                    name: "@emotion/react/css-prop.d.ts",
                    url:
                      "https://unpkg.com/@emotion/react@11.1.1/types/css-prop.d.ts",
                    depend: ["@emotion/utils", "csstype"],
                  },
                  {
                    name: "@emotion/react/helper.d.ts",
                    url:
                      "https://unpkg.com/@emotion/react@11.1.1/types/helper.d.ts",
                    depend: ["@emotion/utils", "csstype"],
                  },
                  {
                    name: "@emotion/react/theming.d.ts",
                    url:
                      "https://unpkg.com/@emotion/react@11.1.1/types/theming.d.ts",
                    depend: ["@emotion/utils", "csstype"],
                  },
                  {
                    name: "@emotion/serialize/index.d.ts",
                    url:
                      "https://unpkg.com/@emotion/serialize@1.0.0/types/index.d.ts",
                    depend: ["@emotion/utils", "csstype"],
                  },
                  {
                    name: "@emotion/utils/index.d.ts",
                    url:
                      "https://unpkg.com/@emotion/utils@1.0.0/types/index.d.ts",
                    depend: [],
                  },
                ];
                dts = importHelper.map(function (_ref3) {
                  var name = _ref3.name, url = _ref3.url;
                  return Object(
                    asyncToGenerator["a"/* default */
                    ],
                  )(/*#__PURE__*/ regenerator_default.a.mark(
                    function _callee() {
                      return regenerator_default.a.wrap(
                        function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.t0 =
                                  modules.monaco.languages.typescript
                                    .typescriptDefaults;
                                _context.next = 3;
                                return fetch(url);
                              case 3:
                                _context.next = 5;
                                return _context.sent.text();
                              case 5:
                                _context.t1 = _context.sent;
                                _context.t2 = name.includes("@emotion")
                                  ? "file:///node_modules/" + name
                                  : "file:///node_modules/@types/" + name +
                                    "/index.d.ts";
                                return _context.abrupt(
                                  "return",
                                  _context.t0.addExtraLib.call(
                                    _context.t0,
                                    _context.t1,
                                    _context.t2,
                                  ),
                                );
                              case 8:
                              case "end":
                                return _context.stop();
                            }
                          }
                        },
                        _callee,
                      );
                    },
                  ))();
                });
                modules.monaco.languages.typescript.typescriptDefaults
                  .setCompilerOptions(
                    {
                      target:
                        modules.monaco.languages.typescript.ScriptTarget.ESNext,
                      allowNonTsExtensions: true,
                      allowUmdGlobalAccess: true,
                      strict: true,
                      allowJs: true,
                      noEmitOnError: true,
                      allowSyntheticDefaultImports: true,
                      moduleResolution:
                        modules.monaco.languages.typescript.ModuleResolutionKind
                          .NodeJs,
                      module:
                        modules.monaco.languages.typescript.ModuleKind.CommonJS,
                      noEmit: true,
                      typeRoots: ["node_modules/@types"],
                      jsx: modules.monaco.languages.typescript.JsxEmit.React,
                      jsxFactory: "React.createElement",
                      jsxFragmentFactory: "React.Fragment",
                      esModuleInterop: true,
                    },
                  );
                _context2.next = 48;
                return Promise.all(dts);
              case 48:
                modules.monaco.languages.typescript.typescriptDefaults
                  .setDiagnosticsOptions(
                    {
                      noSuggestionDiagnostics: false,
                      noSemanticValidation: false,
                      noSyntaxValidation: false,
                    },
                  );
                return _context2.abrupt("return", modules);
              case 50:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      return function startMonaco(_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    function loadScript(src) {
      return new Promise(function (resolve, reject) {
        var s;
        s = window.document.createElement("script");
        s.src = src;
        s.onload = function () {
          return resolve(window);
        };
        s.onerror = reject;
        window.document.head.appendChild(s);
      });
    }
    // EXTERNAL MODULE: ./src/components/utils/sha256/sha256.worker.ts
    var sha256_worker = __webpack_require__(226);

    // CONCATENATED MODULE: ./src/components/utils/sha.ts

    var hashTable = {};

    var sha_ref = typeof window !== "undefined" && sha256_worker(),
      sha256 = sha_ref.sha256;

    var sha_hash = /*#__PURE__*/ function () {
      var _ref2 = Object(
        asyncToGenerator["a"/* default */
        ],
      )(/*#__PURE__*/ regenerator_default.a.mark(function _callee(input) {
        var strInput, hash, shorterHash, shortener;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                shortener = function _shortener(hash) {
                  for (var i = 4; i < 64; i++) {
                    var _shorterHash = hash.substr(0, i);

                    if (hashTable[_shorterHash] === undefined) {
                      hashTable[_shorterHash] = hash;
                      return _shorterHash;
                    }

                    if (hashTable[_shorterHash] === hash) return _shorterHash;
                  }

                  return hash;
                };

                strInput = typeof input !== "string"
                  ? JSON.stringify(input)
                  : input;
                _context.next = 4;
                return sha256(strInput);

              case 4:
                hash = _context.sent;
                shorterHash = shortener(hash);
                hashTable[hash] = input;
                return _context.abrupt("return", shorterHash);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function hash(_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    var unHash = /*#__PURE__*/ function () {
      var _ref3 = Object(
        asyncToGenerator["a"/* default */
        ],
      )(/*#__PURE__*/ regenerator_default.a.mark(function _callee2(hash) {
        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", hashTable[hashTable[hash]]);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function unHash(_x2) {
        return _ref3.apply(this, arguments);
      };
    }();
    // CONCATENATED MODULE: ./src/components/utils/babel.ts

    var cache = {};
    var worker = typeof window !== "undefined"
      ? new Worker(
        URL.createObjectURL(
          new window.Blob(
            ['\nimportScripts(\'https://unpkg.com/@babel/standalone@7.12.6/babel.min.js\');\n\nself.onmessage=(message)=>{\n  const hash = message.data.hash;\n\ntry{\n  const translatedMessage = Babel.transform(message.data.code, {\nplugins: [],\npresets: ["react", ["typescript", { isTSX: true, allExtensions: true }]],\n}).code.replace("export const", "const").replace("import ", "//mport ").replace("import ", "//mport ")\n\n    postMessage({hash, translatedCode: translatedMessage})\n} catch(e){\n  postMessage({hash, translatedCode: "error", error: e})\n}\n\n}\n'],
            {
              type: "application/javascript",
            },
          ),
        ),
      )
      : {
        onmessage: function onmessage() {},
        postMessage: function postMessage() {},
      };

    worker.onmessage = /*#__PURE__*/ function () {
      var _ref = Object(
        asyncToGenerator["a"/* default */
        ],
      )(/*#__PURE__*/ regenerator_default.a.mark(function _callee(message) {
        var codeHash, errorHash, transformedCodeHash;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                codeHash = message.data.hash;

                if (!(typeof cache[codeHash] === "string")) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                if (!(typeof cache[codeHash] === "object")) {
                  _context.next = 16;
                  break;
                }

                if (!message.data.error) {
                  _context.next = 11;
                  break;
                }

                _context.next = 7;
                return sha_hash(message.data.error);

              case 7:
                errorHash = _context.sent;
                cache[codeHash].reject(errorHash);
                cache[codeHash] = {
                  error: errorHash,
                };
                return _context.abrupt("return");

              case 11:
                _context.next = 13;
                return sha_hash(message.data.translatedCode);

              case 13:
                transformedCodeHash = _context.sent;
                cache[codeHash].resolve(transformedCodeHash);
                cache[codeHash] = transformedCodeHash;

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    var transform = /*#__PURE__*/ function () {
      var _ref2 = Object(
        asyncToGenerator["a"/* default */
        ],
      )(/*#__PURE__*/ regenerator_default.a.mark(function _callee2(codeHash) {
        var code, returnPromise;
        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return unHash(codeHash);

              case 2:
                code = _context2.sent;

                if (!(typeof cache[codeHash] === "string")) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", cache[codeHash]);

              case 5:
                if (!(typeof cache[codeHash] === "undefined")) {
                  _context2.next = 9;
                  break;
                }

                worker.postMessage({
                  hash: codeHash,
                  code: code,
                });
                returnPromise = new Promise(function (resolve, reject) {
                  cache[codeHash] = {
                    resolve: resolve,
                    reject: reject,
                    promise: returnPromise,
                  };
                });
                return _context2.abrupt("return", returnPromise);

              case 9:
                if (!(cache[codeHash] && cache[codeHash].error)) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt(
                  "return",
                  Promise.reject(cache[codeHash].error),
                );

              case 11:
                return _context2.abrupt("return", cache[codeHash].promise);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function transform(_x2) {
        return _ref2.apply(this, arguments);
      };
    }();
    // EXTERNAL MODULE: ./src/components/utils/renderer/renderer.worker.ts
    var renderer_worker = __webpack_require__(227);

    // CONCATENATED MODULE: ./src/components/utils/renderer.ts

    var renderer_ref = typeof window !== "undefined" && renderer_worker(),
      renderWorker = renderer_ref.renderWorker;

    var render = /*#__PURE__*/ function () {
      var _ref2 = Object(
        asyncToGenerator["a"/* default */
        ],
      )(/*#__PURE__*/ regenerator_default.a.mark(
        function _callee(transformedCodeHash, defaultPropsHash) {
          var code, defaultProps, renderResult, renderedStringHash;
          return regenerator_default.a.wrap(
            function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return unHash(transformedCodeHash);

                  case 3:
                    code = _context.sent;
                    _context.next = 6;
                    return unHash(defaultPropsHash);

                  case 6:
                    defaultProps = _context.sent;
                    _context.next = 9;
                    return renderWorker(code, defaultProps);

                  case 9:
                    renderResult = _context.sent;

                    if (!(typeof renderResult != "string")) {
                      _context.next = 12;
                      break;
                    }

                    throw renderResult.error;

                  case 12:
                    _context.next = 14;
                    return sha_hash(renderResult);

                  case 14:
                    renderedStringHash = _context.sent;
                    return _context.abrupt("return", renderedStringHash);

                  case 18:
                    _context.prev = 18;
                    _context.t0 = _context["catch"](0);
                    return _context.abrupt("return", {
                      error: _context.t0,
                    });

                  case 21:
                  case "end":
                    return _context.stop();
                }
              }
            },
            _callee,
            null,
            [[0, 18]],
          );
        },
      ));

      return function render(_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }();
    // EXTERNAL MODULE: ./src/components/codeBox/example.ts
    var example = __webpack_require__(54);

    // EXTERNAL MODULE: /z/monorepo/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteralLoose.js
    var taggedTemplateLiteralLoose = __webpack_require__(8);

    // EXTERNAL MODULE: /z/monorepo/node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js + 2 modules
    var emotion_styled_browser_esm = __webpack_require__(10);

    // CONCATENATED MODULE: ./src/components/codeBox/styledCodeBoxComps.tsx

    function _templateObject6() {
      var data = Object(
        taggedTemplateLiteralLoose["a"/* default */
        ],
      )([
        "\n    display: block;\n    width: 150px;\n    height: 150px;\n    overflow: hidden;\n",
      ]);

      _templateObject6 = function _templateObject6() {
        return data;
      };

      return data;
    }

    function _templateObject5() {
      var data = Object(
        taggedTemplateLiteralLoose["a"/* default */
        ],
      )([
        "\n    text-align: center;\n    border-radius: 12px;\n    width: 200px;\n    height: 200px;\n    display: flex;\n    place-content: center;\n    place-items: center;\n    margin: 0;\n    padding: 0;\n    background: rgb(255, 255, 255) none repeat scroll 0% 0%;\n    user-select: none;\n    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 3px 0px, rgba(0, 0, 0, 0.06) 0px 10px 15px 0px;\n",
      ]);

      _templateObject5 = function _templateObject5() {
        return data;
      };

      return data;
    }

    function _templateObject4() {
      var data = Object(
        taggedTemplateLiteralLoose["a"/* default */
        ],
      )([
        "\n    display: block;\n    width: 100%;\n    padding: 10px;\n    color: white;\n    background: red;\n    height: 220px;\n    pre{\n        font-size: 1em;\n        line-height: 1;\n    }\n",
      ]);

      _templateObject4 = function _templateObject4() {
        return data;
      };

      return data;
    }

    function _templateObject3() {
      var data = Object(
        taggedTemplateLiteralLoose["a"/* default */
        ],
      )(["\n    display: block;\n    width: 100%;\n"]);

      _templateObject3 = function _templateObject3() {
        return data;
      };

      return data;
    }

    function _templateObject2() {
      var data = Object(
        taggedTemplateLiteralLoose["a"/* default */
        ],
      )(["\n    display: block;\n    width: 100%;\n    height: 70vh;\n"]);

      _templateObject2 = function _templateObject2() {
        return data;
      };

      return data;
    }

    function _templateObject() {
      var data = Object(
        taggedTemplateLiteralLoose["a"/* default */
        ],
      )([
        '\n    background: #3f51b5;\n    font-family: "Roboto";\n    margin: 0;\n    padding: 10px 20px 10px;\n    color: white;\n',
      ]);

      _templateObject = function _templateObject() {
        return data;
      };

      return data;
    }

    var Header = emotion_styled_browser_esm["a"/* default */
    ].div(_templateObject());
    var CodeContainer = emotion_styled_browser_esm["a"/* default */
    ].div(_templateObject2());
    var ResultContainer = emotion_styled_browser_esm["a"/* default */
    ].div(_templateObject3());
    var ErrorContainer = emotion_styled_browser_esm["a"/* default */
    ].div(_templateObject4());
    var ResultBox = emotion_styled_browser_esm["a"/* default */
    ].div(_templateObject5());
    var ResultBoxContainer = emotion_styled_browser_esm["a"/* default */
    ].div(_templateObject6());
    // EXTERNAL MODULE: /z/monorepo/node_modules/framer-motion/dist/framer-motion.es.js
    var framer_motion_es = __webpack_require__(228);

    // CONCATENATED MODULE: ./src/components/codeBox/codeboxComponents.tsx

    var codeboxComponents_HtmlPlayer = function HtmlPlayer(_ref) {
      var content = _ref.content,
        onEvent = _ref.onEvent;
      return /*#__PURE__*/ react["createElement"](
        react["Fragment"],
        null,
        /*#__PURE__*/ react["createElement"](ResultBoxContainer, {
          onClick: function onClick(e) {
            var clickedElement = e.target;
            var clickEvent = clickedElement.getAttribute("data-onclick");
            if (clickEvent) onEvent(clickEvent);
          },
          dangerouslySetInnerHTML: {
            __html: String(content),
          },
        }),
      );
    };
    var codeboxComponents_ResultComponent = function ResultComponent(_ref2) {
      var _ref2$height = _ref2.height,
        height = _ref2$height === void 0 ? "100%" : _ref2$height,
        _ref2$width = _ref2.width,
        width = _ref2$width === void 0 ? "100%" : _ref2$width,
        transformed = _ref2.transformed,
        onEvent = _ref2.onEvent,
        events = _ref2.events;

      // const x = useMotionValue(0);
      // const background = useTransform(
      //   x,
      //   [0, 300, 600],
      //   ["#ff008c", "#7700ff", "rgb(230, 255, 0)"],
      // );
      // const [{ xxx, yyy }, setIndexToShow] = React.useSta\te({ xxx: 0, yyy: 0 });
      var _React$useState = react["useState"]({
          content:
            transformed[0].rendered[transformed[0].rendered.length - 1] ||
            "<p></p>",
        }),
        content = _React$useState[0].content,
        setContent = _React$useState[1];

      react["useEffect"](function () {
        setContent({
          content:
            transformed[0].rendered[transformed[0].rendered.length - 1] ||
            "<p></p>",
        });
      }, [transformed[0].renderedHash]);

      if (transformed[0].rendered.length === 0) {
        return /*#__PURE__*/ react["createElement"](
          "p",
          null,
          "loading ",
          transformed[0].renderedHash,
        );
      } // function _html(x: number, y: number) {
      //   // console.log(rendered );
      //   return transformed[Number(x)] &&
      //       transformed[Number(x)].rendered[Number(y)] || "<p>uu</p>";
      // }transformed[Number(x)].rendered[Number(y)];

      var divLength = 1000 / (events.length + 1); // const transCopy = [...transformed].map((t)=>{t.rendered=[...t.rendered].reverse(); return t;});

      return /*#__PURE__*/ react["createElement"](
        "div",
        {
          style: {
            position: "relative",
            textAlign: "right",
            width: width,
          },
        },
        transformed.map(function (t, k) {
          return /*#__PURE__*/ react["createElement"](
            "div",
            {
              key: t.renderedHash + k,
            },
            "ss ",
            t.renderedHash,
            "ss",
            events.map(function (event, renderContentKey) {
              return /*#__PURE__*/ react["createElement"]("div", {
                onMouseEnter: function onMouseEnter() {
                  return setContent({
                    content: t.rendered[renderContentKey],
                  });
                },
                style: {
                  display: "inline-block",
                  textAlign: "center",
                  borderLeft: "1px solid red",
                  height: "20px",
                  width: divLength,
                },
                key: t.renderedHash + renderContentKey,
              }, event);
            }),
          );
        }),
        /*#__PURE__*/ react["createElement"](
          framer_motion_es["a"/* motion */
          ].div,
          {
            // layout
            drag: true,
            dragElastic: 0.1,
            dragMomentum: false,
            dragListener: true, // onDrag={(event) => {
            style: {
              position: "absolute",
              top: -220,
              right: 40,
            },
          },
          /*#__PURE__*/ react["createElement"](
            ResultBox,
            null,
            /*#__PURE__*/ react["createElement"](codeboxComponents_HtmlPlayer, {
              key: content,
              content: content,
              onEvent: onEvent,
            }),
          ),
        ),
      );
    };
    // CONCATENATED MODULE: ./src/components/codeBox/CodeBox.tsx

    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
          symbols = symbols.filter(function (sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        }
        keys.push.apply(keys, symbols);
      }
      return keys;
    }

    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function (key) {
            Object(
              defineProperty["a"/* default */
              ],
            )(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(
            target,
            Object.getOwnPropertyDescriptors(source),
          );
        } else {
          ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(
              target,
              key,
              Object.getOwnPropertyDescriptor(source, key),
            );
          });
        }
      }
      return target;
    }

    var CodeBox_CodeBox = function CodeBox(_ref) {
      var title = _ref.title,
        children = _ref.children;
      var starterCode = (children === null || children === void 0
        ? void 0
        : children.toString().trim()) || example["a"/* counterExample */
      ];
      if (typeof window === "undefined") {
        return /*#__PURE__*/ react["createElement"]("pre", null, "Loading");
      }

      var _React$useState = react["useState"]({
          events: example["b"/* defaultProps */
          ].events,
          hashEvents: "",
          hashArr: [],
        }),
        _React$useState$ = _React$useState[0],
        events = _React$useState$.events,
        hashArr = _React$useState$.hashArr,
        changeProps = _React$useState[1];

      var _React$useState2 = react["useState"]({
          transformed: [],
          error: "",
        }),
        _React$useState2$ = _React$useState2[0],
        transformed = _React$useState2$.transformed,
        error = _React$useState2$.error,
        changeWorkerRenderedComponent = _React$useState2[1];

      var _React$useState3 = react["useState"](starterCode),
        code = _React$useState3[0],
        changeCode = _React$useState3[1];

      react["useEffect"](function () {
        function transformCode(_x, _x2) {
          return _transformCode.apply(this, arguments);
        }

        function _transformCode() {
          _transformCode = Object(
            asyncToGenerator["a"/* default */
            ],
          )(/*#__PURE__*/ regenerator_default.a.mark(
            function _callee3(codeHash, errorMessage) {
              var _errorMessage;

              return regenerator_default.a.wrap(
                function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (errorMessage) {
                          changeWorkerRenderedComponent(function (s) {
                            return _objectSpread(_objectSpread({}, s), {}, {
                              error: errorMessage,
                            });
                          });
                        }

                        _context3.prev = 1;
                        return _context3.abrupt("return", transform(codeHash));

                      case 5:
                        _context3.prev = 5;
                        _context3.t0 = _context3["catch"](1);
                        _context3.next = 9;
                        return unHash(_context3.t0);

                      case 9:
                        _errorMessage = _context3.sent;
                        changeWorkerRenderedComponent(function (s) {
                          return _objectSpread(_objectSpread({}, s), {}, {
                            error: _errorMessage,
                          });
                        });
                        return _context3.abrupt("return", false);

                      case 12:
                      case "end":
                        return _context3.stop();
                    }
                  }
                },
                _callee3,
                null,
                [[1, 5]],
              );
            },
          ));
          return _transformCode.apply(this, arguments);
        }

        var runner = /*#__PURE__*/ function () {
          var _ref2 = Object(
            asyncToGenerator["a"/* default */
            ],
          )(/*#__PURE__*/ regenerator_default.a.mark(function _callee2(c) {
            var monaco,
              model,
              tsWorker,
              modelUri,
              diag,
              comp,
              syntax,
              tsErrorMessageArr,
              tsErrorMessage,
              codeHash,
              tHash,
              hashArrValue,
              renderedHashContentHash,
              renderedHashContent,
              prevIndex,
              t,
              rendered,
              renderedHash;
            return regenerator_default.a.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return startMonaco({
                      language: "typescript",
                      code: c,
                      onChange: function onChange(code) {
                        return changeCode(code);
                      },
                    });

                  case 2:
                    monaco = _context2.sent;
                    // await window["monaco"].editor.colorizeElement(document.getElementById("container"))
                    // const monaco: typeof Monaco = window["monaco"];
                    model = monaco.editor.getModel("file:///main.tsx");
                    monacoEditor = model;
                    _context2.next = 7;
                    return window["monaco"].languages.typescript
                      .getTypeScriptWorker();

                  case 7:
                    tsWorker = _context2.sent;
                    modelUri = model === null || model === void 0
                      ? void 0
                      : model.uri;

                    if (modelUri) {
                      _context2.next = 11;
                      break;
                    }

                    return _context2.abrupt("return");

                  case 11:
                    _context2.next = 13;
                    return tsWorker(modelUri);

                  case 13:
                    _context2.next = 15;
                    return _context2.sent.getSemanticDiagnostics(
                      "file:///main.tsx",
                    );

                  case 15:
                    diag = _context2.sent;
                    _context2.next = 18;
                    return tsWorker(modelUri);

                  case 18:
                    _context2.next = 20;
                    return _context2.sent.getCompilerOptionsDiagnostics(
                      "file:///main.tsx",
                    );

                  case 20:
                    comp = _context2.sent;
                    _context2.next = 23;
                    return tsWorker(modelUri);

                  case 23:
                    _context2.next = 25;
                    return _context2.sent.getSyntacticDiagnostics(
                      "file:///main.tsx",
                    );

                  case 25:
                    syntax = _context2.sent;
                    tsErrorMessageArr = [].concat(
                      Object(
                        toConsumableArray["a"/* default */
                        ],
                      )(diag),
                      Object(
                        toConsumableArray["a"/* default */
                        ],
                      )(comp),
                      Object(
                        toConsumableArray["a"/* default */
                        ],
                      )(syntax),
                    );
                    tsErrorMessage = tsErrorMessageArr.length === 0
                      ? ""
                      : tsErrorMessageArr[0].messageText.toString(); // const model = monacoEditor
                    // console.log(fix);
                    // model.set

                    _context2.next = 30;
                    return sha_hash(c);

                  case 30:
                    codeHash = _context2.sent;
                    _context2.next = 33;
                    return transformCode(codeHash, tsErrorMessage);

                  case 33:
                    tHash = _context2.sent;
                    _context2.next = 36;
                    return sha_hash({
                      events: [
                        example["b"/* defaultProps */
                        ].events[0],
                      ],
                    });

                  case 36:
                    hashArrValue = _context2.sent;

                    if (!(!tHash || tsErrorMessage)) {
                      _context2.next = 39;
                      break;
                    }

                    return _context2.abrupt("return");

                  case 39:
                    _context2.next = 41;
                    return render(tHash, hashArrValue);

                  case 41:
                    renderedHashContentHash = _context2.sent;

                    if (!(typeof renderedHashContentHash === "string")) {
                      _context2.next = 48;
                      break;
                    }

                    _context2.next = 45;
                    return unHash(renderedHashContentHash);

                  case 45:
                    _context2.t0 = _context2.sent;
                    _context2.next = 49;
                    break;

                  case 48:
                    _context2.t0 = "<p>Error</p>";

                  case 49:
                    renderedHashContent = _context2.t0;
                    prevIndex = transformed.findIndex(function (x) {
                      return x.hash === tHash;
                    });

                    if (!(prevIndex > 0)) {
                      _context2.next = 56;
                      break;
                    }

                    t = Object(
                      toConsumableArray["a"/* default */
                      ],
                    )(transformed.slice(prevIndex, transformed.length));
                    if (t[0].code[0] !== codeHash) {
                      t[0].code = [codeHash].concat(
                        Object(
                          toConsumableArray["a"/* default */
                          ],
                        )(t[0].code),
                      );
                    }

                    if (code === c) {
                      changeWorkerRenderedComponent(function (s) {
                        return _objectSpread(_objectSpread({}, s), {}, {
                          error: "",
                          transformed: Object(
                            toConsumableArray["a"/* default */
                            ],
                          )(transformed.slice(prevIndex)),
                        });
                      });
                    }

                    return _context2.abrupt("return");

                  case 56:
                    rendered = [
                      typeof renderedHashContent === "string"
                        ? renderedHashContent
                        : "<p>Error</p>",
                    ];
                    _context2.next = 59;
                    return sha_hash(rendered);

                  case 59:
                    renderedHash = _context2.sent;

                    if (code === c) {
                      changeWorkerRenderedComponent(function (s) {
                        return _objectSpread(_objectSpread({}, s), {}, {
                          error: "",
                          transformed: [{
                            hash: tHash,
                            code: [codeHash],
                            renderedHash: renderedHash,
                            rendered: rendered,
                          }].concat(
                            Object(
                              toConsumableArray["a"/* default */
                              ],
                            )(s.transformed),
                          ),
                        });
                      });
                      hashArr.forEach(function (h, hashI) {
                        if (hashI > rendered.length) {
                          hashArr.forEach(/*#__PURE__*/ function () {
                            var _ref3 = Object(
                              asyncToGenerator["a"/* default */
                              ],
                            )(/*#__PURE__*/ regenerator_default.a.mark(
                              function _callee(h, tk) {
                                var renderedHash, renderHtml, renderedHashVal;
                                return regenerator_default.a.wrap(
                                  function _callee$(_context) {
                                    while (1) {
                                      switch (_context.prev = _context.next) {
                                        case 0:
                                          _context.next = 2;
                                          return render(tHash, h);

                                        case 2:
                                          renderedHash = _context.sent;

                                          if (
                                            !(typeof renderedHash === "string")
                                          ) {
                                            _context.next = 17;
                                            break;
                                          }

                                          _context.next = 6;
                                          return unHash(renderedHash);

                                        case 6:
                                          renderHtml = _context.sent;
                                          rendered[tk] = renderHtml;

                                          if (
                                            !(rendered.length ===
                                              hashArr.length)
                                          ) {
                                            _context.next = 14;
                                            break;
                                          }

                                          _context.next = 11;
                                          return sha_hash(rendered);

                                        case 11:
                                          _context.t0 = _context.sent;
                                          _context.next = 15;
                                          break;

                                        case 14:
                                          _context.t0 = "";

                                        case 15:
                                          renderedHashVal = _context.t0;
                                          changeWorkerRenderedComponent(
                                            function (s) {
                                              s.transformed[0].rendered[tk] =
                                                renderHtml;

                                              if (
                                                s.transformed[0].rendered
                                                  .length === hashArr.length
                                              ) {
                                                s.transformed[0].renderedHash =
                                                  renderedHashVal;
                                              }

                                              return s;
                                            },
                                          );

                                        case 17:
                                        case "end":
                                          return _context.stop();
                                      }
                                    }
                                  },
                                  _callee,
                                );
                              },
                            ));

                            return function (_x4, _x5) {
                              return _ref3.apply(this, arguments);
                            };
                          }());
                        }
                      });
                    }

                  case 61:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          return function runner(_x3) {
            return _ref2.apply(this, arguments);
          };
        }();

        runner(code);
      }, [code]);
      react["useEffect"](function () {
        if (events.length !== hashArr.length) {
          return;
        }
        hashArr.forEach(function (h, hashI) {
          if (hashI > transformed[0].rendered.length) {
            transformed.forEach(/*#__PURE__*/ function () {
              var _ref4 = Object(
                asyncToGenerator["a"/* default */
                ],
              )(/*#__PURE__*/ regenerator_default.a.mark(
                function _callee4(t, tk) {
                  var renderedHash, rendered, renderedCopy, renderedHashVal;
                  return regenerator_default.a.wrap(
                    function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            if (!(t.rendered.length < hashI)) {
                              _context4.next = 14;
                              break;
                            }

                            _context4.next = 3;
                            return render(t.hash, h);

                          case 3:
                            renderedHash = _context4.sent;

                            if (!(typeof renderedHash === "string")) {
                              _context4.next = 14;
                              break;
                            }

                            _context4.next = 7;
                            return unHash(renderedHash);

                          case 7:
                            rendered = _context4.sent;
                            renderedCopy = Object(
                              toConsumableArray["a"/* default */
                              ],
                            )(t.rendered);
                            renderedCopy[tk] = rendered;
                            _context4.next = 12;
                            return sha_hash(renderedCopy);

                          case 12:
                            renderedHashVal = _context4.sent;
                            changeWorkerRenderedComponent(function (s) {
                              s.transformed[tk].rendered[hashI] = rendered;

                              if (
                                s.transformed[tk].rendered.length ===
                                  hashArr.length
                              ) {
                                s.transformed[tk].renderedHash =
                                  renderedHashVal;
                              }

                              return s;
                            });

                          case 14:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    },
                    _callee4,
                  );
                },
              ));

              return function (_x6, _x7) {
                return _ref4.apply(this, arguments);
              };
            }());
          }
        });
      }, [transformed.length]);
      react["useEffect"](function () {
        if (
          events.length > hashArr.length ||
          events.length > transformed[0].rendered.length
        ) {
          events.forEach(/*#__PURE__*/ function () {
            var _ref5 = Object(
              asyncToGenerator["a"/* default */
              ],
            )(/*#__PURE__*/ regenerator_default.a.mark(function _callee6(v, k) {
              var hashArrValue, hashCopy, hashArrHash;
              return regenerator_default.a.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      if (!(k < hashArr.length)) {
                        _context6.next = 2;
                        break;
                      }

                      return _context6.abrupt("return");

                    case 2:
                      _context6.next = 4;
                      return sha_hash({
                        events: events.slice(0, k),
                      });

                    case 4:
                      hashArrValue = _context6.sent;
                      hashCopy = Object(
                        toConsumableArray["a"/* default */
                        ],
                      )(hashArrValue);
                      hashCopy[k] = hashArrValue;
                      _context6.next = 9;
                      return sha_hash(hashCopy);

                    case 9:
                      hashArrHash = _context6.sent;
                      changeProps(function (p) {
                        p.hashArr[k] = hashArrValue;
                        p.hashEvents = hashArrHash;
                        return p;
                      });
                      transformed.forEach(/*#__PURE__*/ function () {
                        var _ref6 = Object(
                          asyncToGenerator["a"/* default */
                          ],
                        )(/*#__PURE__*/ regenerator_default.a.mark(
                          function _callee5(t, tk) {
                            var renderedHash,
                              rendered,
                              renderedCopy,
                              renderedHashVal;
                            return regenerator_default.a.wrap(
                              function _callee5$(_context5) {
                                while (1) {
                                  switch (_context5.prev = _context5.next) {
                                    case 0:
                                      if (!(t.rendered.length < k)) {
                                        _context5.next = 14;
                                        break;
                                      }

                                      _context5.next = 3;
                                      return render(t.hash, hashArrValue);

                                    case 3:
                                      renderedHash = _context5.sent;

                                      if (!(typeof renderedHash === "string")) {
                                        _context5.next = 14;
                                        break;
                                      }

                                      _context5.next = 7;
                                      return unHash(renderedHash);

                                    case 7:
                                      rendered = _context5.sent;
                                      renderedCopy = Object(
                                        toConsumableArray["a"/* default */
                                        ],
                                      )(t.rendered);
                                      renderedCopy[tk] = rendered;
                                      _context5.next = 12;
                                      return sha_hash(renderedCopy);

                                    case 12:
                                      renderedHashVal = _context5.sent;
                                      changeWorkerRenderedComponent(
                                        function (s) {
                                          s.transformed[tk].rendered[k] =
                                            rendered;
                                          s.transformed[tk].renderedHash =
                                            renderedHashVal;
                                          return s;
                                        },
                                      );

                                    case 14:
                                    case "end":
                                      return _context5.stop();
                                  }
                                }
                              },
                              _callee5,
                            );
                          },
                        ));

                        return function (_x10, _x11) {
                          return _ref6.apply(this, arguments);
                        };
                      }());

                    case 12:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6);
            }));

            return function (_x8, _x9) {
              return _ref5.apply(this, arguments);
            };
          }());
        }
      }, [events.length]); // React.useEffect(() => {
      //   transformed.forEach(async (t, ind) => {
      //     const hash = t.hash;
      //     hashArr.forEach(async (p, pIndex) => {
      //       const htmlHash = await render(hash, p);
      //       const html = (typeof htmlHash === "string")
      //         ? await unHash(htmlHash)
      //         : "<p>Error</p>";
      //       changeWorkerRenderedComponent((x) => {
      //         const tInd = x.transformed.findIndex((t) => t.hash === hash);
      //         if (tInd === -1) {
      //           return x;
      //         }
      //         x.transformed[tInd].rendered[pIndex] = html;
      //         return x;
      //       });
      //     });
      //     // arr.push(props.hashArr.map((val, ind)=> map[t.hash][ind]));
      //   });
      // }, [hashArr.length]);

      return /*#__PURE__*/ react["createElement"](
        react["Fragment"],
        null,
        !!title && /*#__PURE__*/
          react["createElement"](
            Header,
            null,
            /*#__PURE__*/ react["createElement"]("span", null, title),
            /*#__PURE__*/ react["createElement"]("button", {
              onClick: /*#__PURE__*/ Object(
                asyncToGenerator["a"/* default */
                ],
              )(/*#__PURE__*/ regenerator_default.a.mark(function _callee7() {
                var hash, dataObj, body, request, response;
                return regenerator_default.a.wrap(
                  function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          hash = transformed[0].code[0];
                          _context7.t0 = hash;
                          _context7.t1 = transformed[0].hash;
                          _context7.next = 5;
                          return unHash(transformed[0].code[0]);

                        case 5:
                          _context7.t2 = _context7.sent;
                          _context7.next = 8;
                          return unHash(transformed[0].hash);

                        case 8:
                          _context7.t3 = _context7.sent;
                          dataObj = {
                            codeHash: _context7.t0,
                            transpiledHash: _context7.t1,
                            code: _context7.t2,
                            transpiledCode: _context7.t3,
                          };
                          body = {
                            results: [dataObj],
                            errors: null,
                            msg: "",
                          };
                          request = new Request(
                            "https://my-ts-project.zed-vision.workers.dev",
                            {
                              body: JSON.stringify(body),
                              method: "POST",
                              headers: {
                                "content-type":
                                  "application/json;charset=UTF-8",
                              },
                            },
                          );
                          _context7.next = 14;
                          return fetch(request);

                        case 14:
                          response = _context7.sent;
                          console.log(response);

                        case 16:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  },
                  _callee7,
                );
              })),
            }, "Save"),
          ),
        /*#__PURE__*/ react["createElement"](CodeContainer, {
          id: "container",
        }),
        /*#__PURE__*/ react["createElement"](CodeContainer, {
          style: {
            display: "none",
          },
          id: "ace",
        }),
        error
          ? /*#__PURE__*/ react["createElement"](
            ErrorContainer,
            null,
            /*#__PURE__*/ react["createElement"]("pre", null, error.toString()),
            /*#__PURE__*/ react["createElement"]("button", {
              onClick: /*#__PURE__*/ Object(
                asyncToGenerator["a"/* default */
                ],
              )(/*#__PURE__*/ regenerator_default.a.mark(function _callee8() {
                var code;
                return regenerator_default.a.wrap(
                  function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          _context8.next = 2;
                          return unHash(transformed[0].code[0]);

                        case 2:
                          code = _context8.sent;
                          monacoEditor.setValue(code);
                          changeCode(code);

                        case 5:
                        case "end":
                          return _context8.stop();
                      }
                    }
                  },
                  _callee8,
                );
              })),
            }, "Restore to the last working version"),
          )
          : transformed.length > 0
          ? /*#__PURE__*/ react["createElement"](
            ResultContainer,
            null,
            /*#__PURE__*/ react["createElement"](
              codeboxComponents_ResultComponent,
              {
                transformed: transformed,
                key: transformed[0].renderedHash,
                events: events,
                onEvent: function onEvent(ev) {
                  changeProps(function (p) {
                    return _objectSpread(_objectSpread({}, p), {}, {
                      events: [].concat(
                        Object(
                          toConsumableArray["a"/* default */
                          ],
                        )(p.events),
                        [ev],
                      ),
                    });
                  });
                },
              },
            ),
          )
          : /*#__PURE__*/ react["createElement"](react["Fragment"], null),
      );
    };

    /***/
  }),

  /***/ 99: /***/ (function (module, __webpack_exports__, __webpack_require__) {
    "use strict";

    // EXPORTS
    __webpack_require__.d(__webpack_exports__, "a", function () {
      return /* binding */ alpha;
    });
    __webpack_require__.d(__webpack_exports__, "b", function () {
      return /* binding */ color;
    });
    __webpack_require__.d(__webpack_exports__, "c", function () {
      return /* binding */ complex;
    });
    __webpack_require__.d(__webpack_exports__, "d", function () {
      return /* binding */ degrees;
    });
    __webpack_require__.d(__webpack_exports__, "e", function () {
      return /* binding */ hex;
    });
    __webpack_require__.d(__webpack_exports__, "f", function () {
      return /* binding */ hsla;
    });
    __webpack_require__.d(__webpack_exports__, "g", function () {
      return /* binding */ number;
    });
    __webpack_require__.d(__webpack_exports__, "h", function () {
      return /* binding */ percent;
    });
    __webpack_require__.d(__webpack_exports__, "i", function () {
      return /* binding */ progressPercentage;
    });
    __webpack_require__.d(__webpack_exports__, "j", function () {
      return /* binding */ px;
    });
    __webpack_require__.d(__webpack_exports__, "k", function () {
      return /* binding */ rgba;
    });
    __webpack_require__.d(__webpack_exports__, "l", function () {
      return /* binding */ scale;
    });
    __webpack_require__.d(__webpack_exports__, "m", function () {
      return /* binding */ vh;
    });
    __webpack_require__.d(__webpack_exports__, "n", function () {
      return /* binding */ vw;
    });

    // UNUSED EXPORTS: rgbUnit

    // CONCATENATED MODULE: /z/monorepo/node_modules/style-value-types/node_modules/tslib/tslib.es6.js
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

    /* global Reflect, Promise */
    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
                __proto__: [],
              } instanceof Array && function (d, b) {
            d.__proto__ = b;
          } ||
        function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) {
              d[p] = b[p];
            }
          }
        };

      return _extendStatics(d, b);
    };

    function __extends(d, b) {
      _extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null
        ? Object.create(b)
        : (__.prototype = b.prototype, new __());
    }

    var _assign = function __assign() {
      _assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
        }

        return t;
      };

      return _assign.apply(this, arguments);
    };

    function __rest(s, e) {
      var t = {};

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) {
          t[p] = s[p];
        }
      }

      if (s != null && typeof Object.getOwnPropertySymbols === "function") {
        for (
          var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++
        ) {
          if (
            e.indexOf(p[i]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(s, p[i])
          ) {
            t[p[i]] = s[p[i]];
          }
        }
      }
      return t;
    }
    function __decorate(decorators, target, key, desc) {
      var c = arguments.length,
        r = c < 3
          ? target
          : desc === null
          ? desc = Object.getOwnPropertyDescriptor(target, key)
          : desc,
        d;
      if (
        typeof Reflect === "object" && typeof Reflect.decorate === "function"
      ) {
        r = Reflect.decorate(decorators, target, key, desc);
      } else {
        for (var i = decorators.length - 1; i >= 0; i--) {
          if (d = decorators[i]) {
            r = (c < 3
              ? d(r)
              : c > 3
              ? d(target, key, r)
              : d(target, key)) || r;
          }
        }
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
      return function (target, key) {
        decorator(target, key, paramIndex);
      };
    }
    function __metadata(metadataKey, metadataValue) {
      if (
        typeof Reflect === "object" && typeof Reflect.metadata === "function"
      ) {
        return Reflect.metadata(metadataKey, metadataValue);
      }
    }
    function __awaiter(thisArg, _arguments, P, generator) {
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
    }
    function __generator(thisArg, body) {
      var _ = {
          label: 0,
          sent: function sent() {
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
      return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2),
      },
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
                  : y.next) && !(t = t.call(y, op[1])).done
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
                return {
                  value: op[1],
                  done: false,
                };

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
        return {
          value: op[0] ? op[1] : void 0,
          done: true,
        };
      }
    }
    function __createBinding(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
    }
    function __exportStar(m, exports) {
      for (var p in m) {
        if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
      }
    }
    function __values(o) {
      var s = typeof Symbol === "function" && Symbol.iterator,
        m = s && o[s],
        i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") {
        return {
          next: function next() {
            if (o && i >= o.length) o = void 0;
            return {
              value: o && o[i++],
              done: !o,
            };
          },
        };
      }
      throw new TypeError(
        s ? "Object is not iterable." : "Symbol.iterator is not defined.",
      );
    }
    function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o),
        r,
        ar = [],
        e;

      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
          ar.push(r.value);
        }
      } catch (error) {
        e = {
          error: error,
        };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }

      return ar;
    }
    function __spread() {
      for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
      }

      return ar;
    }
    function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
        s += arguments[i].length;
      }

      for (var r = Array(s), k = 0, i = 0; i < il; i++) {
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
          r[k] = a[j];
        }
      }

      return r;
    }

    function __await(v) {
      return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
      if (!Symbol.asyncIterator) {
        throw new TypeError("Symbol.asyncIterator is not defined.");
      }
      var g = generator.apply(thisArg, _arguments || []),
        i,
        q = [];
      return i = {},
        verb("next"),
        verb("throw"),
        verb("return"),
        i[Symbol.asyncIterator] = function () {
          return this;
        },
        i;

      function verb(n) {
        if (g[n]) {
          i[n] = function (v) {
            return new Promise(function (a, b) {
              q.push([n, v, a, b]) > 1 || resume(n, v);
            });
          };
        }
      }

      function resume(n, v) {
        try {
          step(g[n](v));
        } catch (e) {
          settle(q[0][3], e);
        }
      }

      function step(r) {
        r.value instanceof __await
          ? Promise.resolve(r.value.v).then(fulfill, reject)
          : settle(q[0][2], r);
      }

      function fulfill(value) {
        resume("next", value);
      }

      function reject(value) {
        resume("throw", value);
      }

      function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
      }
    }
    function __asyncDelegator(o) {
      var i, p;
      return i = {},
        verb("next"),
        verb("throw", function (e) {
          throw e;
        }),
        verb("return"),
        i[Symbol.iterator] = function () {
          return this;
        },
        i;

      function verb(n, f) {
        i[n] = o[n]
          ? function (v) {
            return (p = !p)
              ? {
                value: __await(o[n](v)),
                done: n === "return",
              }
              : f
              ? f(v)
              : v;
          }
          : f;
      }
    }
    function __asyncValues(o) {
      if (!Symbol.asyncIterator) {
        throw new TypeError("Symbol.asyncIterator is not defined.");
      }
      var m = o[Symbol.asyncIterator],
        i;
      return m ? m.call(o) : (o = typeof __values === "function"
        ? __values(o)
        : o[Symbol.iterator](),
        i = {},
        verb("next"),
        verb("throw"),
        verb("return"),
        i[Symbol.asyncIterator] = function () {
          return this;
        },
        i);

      function verb(n) {
        i[n] = o[n] && function (v) {
          return new Promise(function (resolve, reject) {
            v = o[n](v), settle(resolve, reject, v.done, v.value);
          });
        };
      }

      function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function (v) {
          resolve({
            value: v,
            done: d,
          });
        }, reject);
      }
    }
    function __makeTemplateObject(cooked, raw) {
      if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
          value: raw,
        });
      } else {
        cooked.raw = raw;
      }

      return cooked;
    }

    function __importStar(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) {
          if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
      }
      result.default = mod;
      return result;
    }
    function __importDefault(mod) {
      return mod && mod.__esModule ? mod : {
        default: mod,
      };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
      if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
      }

      return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
      if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
      }

      privateMap.set(receiver, value);
      return value;
    }
    // CONCATENATED MODULE: /z/monorepo/node_modules/style-value-types/dist/style-value-types.es.js

    var clamp = function clamp(min, max) {
      return function (v) {
        return Math.max(Math.min(v, max), min);
      };
    };

    var sanitize = function sanitize(v) {
      return v % 1 ? Number(v.toFixed(5)) : v;
    };

    var floatRegex = /(-)?(\d[\d\.]*)/g;
    var colorRegex =
      /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))/gi;
    var singleColorRegex =
      /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))$/i;
    var number = {
      test: function test(v) {
        return typeof v === "number";
      },
      parse: parseFloat,
      transform: function transform(v) {
        return v;
      },
    };

    var alpha = _assign(_assign({}, number), {
      transform: clamp(0, 1),
    });

    var scale = _assign(_assign({}, number), {
      default: 1,
    });

    var createUnitType = function createUnitType(unit) {
      return {
        test: function test(v) {
          return typeof v === "string" && v.endsWith(unit) &&
            v.split(" ").length === 1;
        },
        parse: parseFloat,
        transform: function transform(v) {
          return "" + v + unit;
        },
      };
    };

    var degrees = createUnitType("deg");
    var percent = createUnitType("%");
    var px = createUnitType("px");
    var vh = createUnitType("vh");
    var vw = createUnitType("vw");

    var progressPercentage = _assign(_assign({}, percent), {
      parse: function parse(v) {
        return percent.parse(v) / 100;
      },
      transform: function transform(v) {
        return percent.transform(v * 100);
      },
    });

    var getValueFromFunctionString = function getValueFromFunctionString(
      value,
    ) {
      return value.substring(value.indexOf("(") + 1, value.lastIndexOf(")"));
    };

    var clampRgbUnit = clamp(0, 255);

    var isRgba = function isRgba(v) {
      return v.red !== undefined;
    };

    var isHsla = function isHsla(v) {
      return v.hue !== undefined;
    };

    function getValuesAsArray(value) {
      return getValueFromFunctionString(value).replace(/(,|\/)/g, " ").split(
        / \s*/,
      );
    }

    var splitColorValues = function splitColorValues(terms) {
      return function (v) {
        if (typeof v !== "string") return v;
        var values = {};
        var valuesArray = getValuesAsArray(v);

        for (var i = 0; i < 4; i++) {
          values[terms[i]] = valuesArray[i] !== undefined
            ? parseFloat(valuesArray[i])
            : 1;
        }

        return values;
      };
    };

    var rgbaTemplate = function rgbaTemplate(_a) {
      var red = _a.red,
        green = _a.green,
        blue = _a.blue,
        _b = _a.alpha,
        alpha = _b === void 0 ? 1 : _b;
      return "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
    };

    var hslaTemplate = function hslaTemplate(_a) {
      var hue = _a.hue,
        saturation = _a.saturation,
        lightness = _a.lightness,
        _b = _a.alpha,
        alpha = _b === void 0 ? 1 : _b;
      return "hsla(" + hue + ", " + saturation + ", " + lightness + ", " +
        alpha + ")";
    };

    var rgbUnit = _assign(_assign({}, number), {
      transform: function transform(v) {
        return Math.round(clampRgbUnit(v));
      },
    });

    function isColorString(color, colorType) {
      return color.startsWith(colorType) && singleColorRegex.test(color);
    }

    var rgba = {
      test: function test(v) {
        return typeof v === "string" ? isColorString(v, "rgb") : isRgba(v);
      },
      parse: splitColorValues(["red", "green", "blue", "alpha"]),
      transform: function transform(_a) {
        var red = _a.red,
          green = _a.green,
          blue = _a.blue,
          _b = _a.alpha,
          alpha$1 = _b === void 0 ? 1 : _b;
        return rgbaTemplate({
          red: rgbUnit.transform(red),
          green: rgbUnit.transform(green),
          blue: rgbUnit.transform(blue),
          alpha: sanitize(alpha.transform(alpha$1)),
        });
      },
    };
    var hsla = {
      test: function test(v) {
        return typeof v === "string" ? isColorString(v, "hsl") : isHsla(v);
      },
      parse: splitColorValues(["hue", "saturation", "lightness", "alpha"]),
      transform: function transform(_a) {
        var hue = _a.hue,
          saturation = _a.saturation,
          lightness = _a.lightness,
          _b = _a.alpha,
          alpha$1 = _b === void 0 ? 1 : _b;
        return hslaTemplate({
          hue: Math.round(hue),
          saturation: percent.transform(sanitize(saturation)),
          lightness: percent.transform(sanitize(lightness)),
          alpha: sanitize(alpha.transform(alpha$1)),
        });
      },
    };

    var hex = _assign(_assign({}, rgba), {
      test: function test(v) {
        return typeof v === "string" && isColorString(v, "#");
      },
      parse: function parse(v) {
        var r = "";
        var g = "";
        var b = "";

        if (v.length > 4) {
          r = v.substr(1, 2);
          g = v.substr(3, 2);
          b = v.substr(5, 2);
        } else {
          r = v.substr(1, 1);
          g = v.substr(2, 1);
          b = v.substr(3, 1);
          r += r;
          g += g;
          b += b;
        }

        return {
          red: parseInt(r, 16),
          green: parseInt(g, 16),
          blue: parseInt(b, 16),
          alpha: 1,
        };
      },
    });

    var color = {
      test: function test(v) {
        return typeof v === "string" && singleColorRegex.test(v) || isRgba(v) ||
          isHsla(v);
      },
      parse: function parse(v) {
        if (rgba.test(v)) {
          return rgba.parse(v);
        } else if (hsla.test(v)) {
          return hsla.parse(v);
        } else if (hex.test(v)) {
          return hex.parse(v);
        }

        return v;
      },
      transform: function transform(v) {
        if (isRgba(v)) {
          return rgba.transform(v);
        } else if (isHsla(v)) {
          return hsla.transform(v);
        }

        return v;
      },
    };
    var COLOR_TOKEN = "${c}";
    var NUMBER_TOKEN = "${n}";

    var convertNumbersToZero = function convertNumbersToZero(v) {
      return typeof v === "number" ? 0 : v;
    };

    var complex = {
      test: function test(v) {
        if (typeof v !== "string" || !isNaN(v)) return false;
        var numValues = 0;
        var foundNumbers = v.match(floatRegex);
        var foundColors = v.match(colorRegex);
        if (foundNumbers) numValues += foundNumbers.length;
        if (foundColors) numValues += foundColors.length;
        return numValues > 0;
      },
      parse: function parse(v) {
        var input = v;
        var parsed = [];
        var foundColors = input.match(colorRegex);

        if (foundColors) {
          input = input.replace(colorRegex, COLOR_TOKEN);
          parsed.push.apply(parsed, foundColors.map(color.parse));
        }

        var foundNumbers = input.match(floatRegex);

        if (foundNumbers) {
          parsed.push.apply(parsed, foundNumbers.map(number.parse));
        }

        return parsed;
      },
      createTransformer: function createTransformer(prop) {
        var template = prop;
        var token = 0;
        var foundColors = prop.match(colorRegex);
        var numColors = foundColors ? foundColors.length : 0;

        if (foundColors) {
          for (var i = 0; i < numColors; i++) {
            template = template.replace(foundColors[i], COLOR_TOKEN);
            token++;
          }
        }

        var foundNumbers = template.match(floatRegex);
        var numNumbers = foundNumbers ? foundNumbers.length : 0;

        if (foundNumbers) {
          for (var i = 0; i < numNumbers; i++) {
            template = template.replace(foundNumbers[i], NUMBER_TOKEN);
            token++;
          }
        }

        return function (v) {
          var output = template;

          for (var i = 0; i < token; i++) {
            output = output.replace(
              i < numColors ? COLOR_TOKEN : NUMBER_TOKEN,
              i < numColors ? color.transform(v[i]) : sanitize(v[i]),
            );
          }

          return output;
        };
      },
      getAnimatableNone: function getAnimatableNone(target) {
        var parsedTarget = complex.parse(target);
        var targetTransformer = complex.createTransformer(target);
        return targetTransformer(parsedTarget.map(convertNumbersToZero));
      },
    };

    /***/
  }),
}]);

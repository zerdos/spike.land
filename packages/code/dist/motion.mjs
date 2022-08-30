var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb2, mod) => function __require() {
  return mod || (0, cb2[__getOwnPropNames(cb2)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// <define:process>
var define_process_default;
var init_define_process = __esm({
  "<define:process>"() {
    define_process_default = { env: { NODE_ENV: "development" }, version: "1.1.1", browser: true };
  }
});

// ../../.yarn/global/cache/@emotion-memoize-npm-0.7.4-5648cf11b8-9.zip/node_modules/@emotion/memoize/dist/memoize.browser.cjs.js
var require_memoize_browser_cjs = __commonJS({
  "../../.yarn/global/cache/@emotion-memoize-npm-0.7.4-5648cf11b8-9.zip/node_modules/@emotion/memoize/dist/memoize.browser.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    function memoize(fn) {
      var cache = {};
      return function(arg) {
        if (cache[arg] === void 0)
          cache[arg] = fn(arg);
        return cache[arg];
      };
    }
    exports.default = memoize;
  }
});

// ../../.yarn/global/cache/@emotion-is-prop-valid-npm-0.8.8-261a0f2426-9.zip/node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.cjs.js
var require_is_prop_valid_browser_cjs = __commonJS({
  "../../.yarn/global/cache/@emotion-is-prop-valid-npm-0.8.8-261a0f2426-9.zip/node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    function _interopDefault(ex) {
      return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
    }
    var memoize = _interopDefault(require_memoize_browser_cjs());
    var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
    var index = memoize(
      function(prop) {
        return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
      }
    );
    exports.default = index;
  }
});

// ../../.yarn/global/cache/tslib-npm-2.4.0-9cb6dc5030-9.zip/node_modules/tslib/tslib.js
var require_tslib = __commonJS({
  "../../.yarn/global/cache/tslib-npm-2.4.0-9cb6dc5030-9.zip/node_modules/tslib/tslib.js"(exports, module) {
    init_define_process();
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
    var __classPrivateFieldIn2;
    var __createBinding2;
    (function(factory) {
      var root = typeof window === "object" ? window : typeof self === "object" ? self : typeof this === "object" ? this : {};
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
            Object.defineProperty(exports2, "__esModule", { value: true });
          } else {
            exports2.__esModule = true;
          }
        }
        return function(id3, v4) {
          return exports2[id3] = previous ? previous(id3, v4) : v4;
        };
      }
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d4, b5) {
        d4.__proto__ = b5;
      } || function(d4, b5) {
        for (var p4 in b5)
          if (Object.prototype.hasOwnProperty.call(b5, p4))
            d4[p4] = b5[p4];
      };
      __extends2 = function(d4, b5) {
        if (typeof b5 !== "function" && b5 !== null)
          throw new TypeError("Class extends value " + String(b5) + " is not a constructor or null");
        extendStatics(d4, b5);
        function __() {
          this.constructor = d4;
        }
        d4.prototype = b5 === null ? Object.create(b5) : (__.prototype = b5.prototype, new __());
      };
      __assign2 = Object.assign || function(t3) {
        for (var s4, i4 = 1, n3 = arguments.length; i4 < n3; i4++) {
          s4 = arguments[i4];
          for (var p4 in s4)
            if (Object.prototype.hasOwnProperty.call(s4, p4))
              t3[p4] = s4[p4];
        }
        return t3;
      };
      __rest2 = function(s4, e4) {
        var t3 = {};
        for (var p4 in s4)
          if (Object.prototype.hasOwnProperty.call(s4, p4) && e4.indexOf(p4) < 0)
            t3[p4] = s4[p4];
        if (s4 != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i4 = 0, p4 = Object.getOwnPropertySymbols(s4); i4 < p4.length; i4++) {
            if (e4.indexOf(p4[i4]) < 0 && Object.prototype.propertyIsEnumerable.call(s4, p4[i4]))
              t3[p4[i4]] = s4[p4[i4]];
          }
        return t3;
      };
      __decorate2 = function(decorators, target, key, desc) {
        var c5 = arguments.length, r4 = c5 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d4;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r4 = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i4 = decorators.length - 1; i4 >= 0; i4--)
            if (d4 = decorators[i4])
              r4 = (c5 < 3 ? d4(r4) : c5 > 3 ? d4(target, key, r4) : d4(target, key)) || r4;
        return c5 > 3 && r4 && Object.defineProperty(target, key, r4), r4;
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
      __awaiter2 = function(thisArg, _arguments, P3, generator) {
        function adopt(value) {
          return value instanceof P3 ? value : new P3(function(resolve) {
            resolve(value);
          });
        }
        return new (P3 || (P3 = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e4) {
              reject(e4);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e4) {
              reject(e4);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator2 = function(thisArg, body) {
        var _4 = { label: 0, sent: function() {
          if (t3[0] & 1)
            throw t3[1];
          return t3[1];
        }, trys: [], ops: [] }, f4, y4, t3, g5;
        return g5 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g5[Symbol.iterator] = function() {
          return this;
        }), g5;
        function verb(n3) {
          return function(v4) {
            return step([n3, v4]);
          };
        }
        function step(op) {
          if (f4)
            throw new TypeError("Generator is already executing.");
          while (_4)
            try {
              if (f4 = 1, y4 && (t3 = op[0] & 2 ? y4["return"] : op[0] ? y4["throw"] || ((t3 = y4["return"]) && t3.call(y4), 0) : y4.next) && !(t3 = t3.call(y4, op[1])).done)
                return t3;
              if (y4 = 0, t3)
                op = [op[0] & 2, t3.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t3 = op;
                  break;
                case 4:
                  _4.label++;
                  return { value: op[1], done: false };
                case 5:
                  _4.label++;
                  y4 = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _4.ops.pop();
                  _4.trys.pop();
                  continue;
                default:
                  if (!(t3 = _4.trys, t3 = t3.length > 0 && t3[t3.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _4 = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t3 || op[1] > t3[0] && op[1] < t3[3])) {
                    _4.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _4.label < t3[1]) {
                    _4.label = t3[1];
                    t3 = op;
                    break;
                  }
                  if (t3 && _4.label < t3[2]) {
                    _4.label = t3[2];
                    _4.ops.push(op);
                    break;
                  }
                  if (t3[2])
                    _4.ops.pop();
                  _4.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _4);
            } catch (e4) {
              op = [6, e4];
              y4 = 0;
            } finally {
              f4 = t3 = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      __exportStar2 = function(m5, o4) {
        for (var p4 in m5)
          if (p4 !== "default" && !Object.prototype.hasOwnProperty.call(o4, p4))
            __createBinding2(o4, m5, p4);
      };
      __createBinding2 = Object.create ? function(o4, m5, k5, k22) {
        if (k22 === void 0)
          k22 = k5;
        var desc = Object.getOwnPropertyDescriptor(m5, k5);
        if (!desc || ("get" in desc ? !m5.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m5[k5];
          } };
        }
        Object.defineProperty(o4, k22, desc);
      } : function(o4, m5, k5, k22) {
        if (k22 === void 0)
          k22 = k5;
        o4[k22] = m5[k5];
      };
      __values2 = function(o4) {
        var s4 = typeof Symbol === "function" && Symbol.iterator, m5 = s4 && o4[s4], i4 = 0;
        if (m5)
          return m5.call(o4);
        if (o4 && typeof o4.length === "number")
          return {
            next: function() {
              if (o4 && i4 >= o4.length)
                o4 = void 0;
              return { value: o4 && o4[i4++], done: !o4 };
            }
          };
        throw new TypeError(s4 ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      __read2 = function(o4, n3) {
        var m5 = typeof Symbol === "function" && o4[Symbol.iterator];
        if (!m5)
          return o4;
        var i4 = m5.call(o4), r4, ar = [], e4;
        try {
          while ((n3 === void 0 || n3-- > 0) && !(r4 = i4.next()).done)
            ar.push(r4.value);
        } catch (error) {
          e4 = { error };
        } finally {
          try {
            if (r4 && !r4.done && (m5 = i4["return"]))
              m5.call(i4);
          } finally {
            if (e4)
              throw e4.error;
          }
        }
        return ar;
      };
      __spread2 = function() {
        for (var ar = [], i4 = 0; i4 < arguments.length; i4++)
          ar = ar.concat(__read2(arguments[i4]));
        return ar;
      };
      __spreadArrays2 = function() {
        for (var s4 = 0, i4 = 0, il = arguments.length; i4 < il; i4++)
          s4 += arguments[i4].length;
        for (var r4 = Array(s4), k5 = 0, i4 = 0; i4 < il; i4++)
          for (var a5 = arguments[i4], j4 = 0, jl = a5.length; j4 < jl; j4++, k5++)
            r4[k5] = a5[j4];
        return r4;
      };
      __spreadArray2 = function(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i4 = 0, l4 = from.length, ar; i4 < l4; i4++) {
            if (ar || !(i4 in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i4);
              ar[i4] = from[i4];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      __await2 = function(v4) {
        return this instanceof __await2 ? (this.v = v4, this) : new __await2(v4);
      };
      __asyncGenerator2 = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g5 = generator.apply(thisArg, _arguments || []), i4, q4 = [];
        return i4 = {}, verb("next"), verb("throw"), verb("return"), i4[Symbol.asyncIterator] = function() {
          return this;
        }, i4;
        function verb(n3) {
          if (g5[n3])
            i4[n3] = function(v4) {
              return new Promise(function(a5, b5) {
                q4.push([n3, v4, a5, b5]) > 1 || resume(n3, v4);
              });
            };
        }
        function resume(n3, v4) {
          try {
            step(g5[n3](v4));
          } catch (e4) {
            settle(q4[0][3], e4);
          }
        }
        function step(r4) {
          r4.value instanceof __await2 ? Promise.resolve(r4.value.v).then(fulfill, reject) : settle(q4[0][2], r4);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f4, v4) {
          if (f4(v4), q4.shift(), q4.length)
            resume(q4[0][0], q4[0][1]);
        }
      };
      __asyncDelegator2 = function(o4) {
        var i4, p4;
        return i4 = {}, verb("next"), verb("throw", function(e4) {
          throw e4;
        }), verb("return"), i4[Symbol.iterator] = function() {
          return this;
        }, i4;
        function verb(n3, f4) {
          i4[n3] = o4[n3] ? function(v4) {
            return (p4 = !p4) ? { value: __await2(o4[n3](v4)), done: n3 === "return" } : f4 ? f4(v4) : v4;
          } : f4;
        }
      };
      __asyncValues2 = function(o4) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m5 = o4[Symbol.asyncIterator], i4;
        return m5 ? m5.call(o4) : (o4 = typeof __values2 === "function" ? __values2(o4) : o4[Symbol.iterator](), i4 = {}, verb("next"), verb("throw"), verb("return"), i4[Symbol.asyncIterator] = function() {
          return this;
        }, i4);
        function verb(n3) {
          i4[n3] = o4[n3] && function(v4) {
            return new Promise(function(resolve, reject) {
              v4 = o4[n3](v4), settle(resolve, reject, v4.done, v4.value);
            });
          };
        }
        function settle(resolve, reject, d4, v4) {
          Promise.resolve(v4).then(function(v5) {
            resolve({ value: v5, done: d4 });
          }, reject);
        }
      };
      __makeTemplateObject2 = function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
        } else {
          cooked.raw = raw;
        }
        return cooked;
      };
      var __setModuleDefault = Object.create ? function(o4, v4) {
        Object.defineProperty(o4, "default", { enumerable: true, value: v4 });
      } : function(o4, v4) {
        o4["default"] = v4;
      };
      __importStar2 = function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k5 in mod)
            if (k5 !== "default" && Object.prototype.hasOwnProperty.call(mod, k5))
              __createBinding2(result, mod, k5);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      __importDefault2 = function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      __classPrivateFieldGet2 = function(receiver, state, kind, f4) {
        if (kind === "a" && !f4)
          throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f4 : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f4 : kind === "a" ? f4.call(receiver) : f4 ? f4.value : state.get(receiver);
      };
      __classPrivateFieldSet2 = function(receiver, state, value, kind, f4) {
        if (kind === "m")
          throw new TypeError("Private method is not writable");
        if (kind === "a" && !f4)
          throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f4 : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f4.call(receiver, value) : f4 ? f4.value = value : state.set(receiver, value), value;
      };
      __classPrivateFieldIn2 = function(state, receiver) {
        if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function")
          throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
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
      exporter("__classPrivateFieldIn", __classPrivateFieldIn2);
    });
  }
});

// js/motion.ts
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/index.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/motion.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/index.mjs
init_define_process();

// js/react-preact.ts
init_define_process();

// ../../.yarn/global/cache/preact-npm-10.10.6-e3746adb94-9.zip/node_modules/preact/dist/preact.module.js
var preact_module_exports = {};
__export(preact_module_exports, {
  Component: () => d,
  Fragment: () => p,
  cloneElement: () => q,
  createContext: () => B,
  createElement: () => h,
  createRef: () => y,
  h: () => h,
  hydrate: () => S,
  isValidElement: () => i,
  options: () => l,
  render: () => P,
  toChildArray: () => x
});
init_define_process();
var n;
var l;
var u;
var i;
var t;
var o;
var r;
var f = {};
var e = [];
var c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function s(n3, l4) {
  for (var u4 in l4)
    n3[u4] = l4[u4];
  return n3;
}
function a(n3) {
  var l4 = n3.parentNode;
  l4 && l4.removeChild(n3);
}
function h(l4, u4, i4) {
  var t3, o4, r4, f4 = {};
  for (r4 in u4)
    "key" == r4 ? t3 = u4[r4] : "ref" == r4 ? o4 = u4[r4] : f4[r4] = u4[r4];
  if (arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : i4), "function" == typeof l4 && null != l4.defaultProps)
    for (r4 in l4.defaultProps)
      void 0 === f4[r4] && (f4[r4] = l4.defaultProps[r4]);
  return v(l4, f4, t3, o4, null);
}
function v(n3, i4, t3, o4, r4) {
  var f4 = { type: n3, props: i4, key: t3, ref: o4, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == r4 ? ++u : r4 };
  return null == r4 && null != l.vnode && l.vnode(f4), f4;
}
function y() {
  return { current: null };
}
function p(n3) {
  return n3.children;
}
function d(n3, l4) {
  this.props = n3, this.context = l4;
}
function _(n3, l4) {
  if (null == l4)
    return n3.__ ? _(n3.__, n3.__.__k.indexOf(n3) + 1) : null;
  for (var u4; l4 < n3.__k.length; l4++)
    if (null != (u4 = n3.__k[l4]) && null != u4.__e)
      return u4.__e;
  return "function" == typeof n3.type ? _(n3) : null;
}
function k(n3) {
  var l4, u4;
  if (null != (n3 = n3.__) && null != n3.__c) {
    for (n3.__e = n3.__c.base = null, l4 = 0; l4 < n3.__k.length; l4++)
      if (null != (u4 = n3.__k[l4]) && null != u4.__e) {
        n3.__e = n3.__c.base = u4.__e;
        break;
      }
    return k(n3);
  }
}
function b(n3) {
  (!n3.__d && (n3.__d = true) && t.push(n3) && !g.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || setTimeout)(g);
}
function g() {
  for (var n3; g.__r = t.length; )
    n3 = t.sort(function(n4, l4) {
      return n4.__v.__b - l4.__v.__b;
    }), t = [], n3.some(function(n4) {
      var l4, u4, i4, t3, o4, r4;
      n4.__d && (o4 = (t3 = (l4 = n4).__v).__e, (r4 = l4.__P) && (u4 = [], (i4 = s({}, t3)).__v = t3.__v + 1, j(r4, t3, i4, l4.__n, void 0 !== r4.ownerSVGElement, null != t3.__h ? [o4] : null, u4, null == o4 ? _(t3) : o4, t3.__h), z(u4, t3), t3.__e != o4 && k(t3)));
    });
}
function w(n3, l4, u4, i4, t3, o4, r4, c5, s4, a5) {
  var h4, y4, d4, k5, b5, g5, w4, x5 = i4 && i4.__k || e, C3 = x5.length;
  for (u4.__k = [], h4 = 0; h4 < l4.length; h4++)
    if (null != (k5 = u4.__k[h4] = null == (k5 = l4[h4]) || "boolean" == typeof k5 ? null : "string" == typeof k5 || "number" == typeof k5 || "bigint" == typeof k5 ? v(null, k5, null, null, k5) : Array.isArray(k5) ? v(p, { children: k5 }, null, null, null) : k5.__b > 0 ? v(k5.type, k5.props, k5.key, null, k5.__v) : k5)) {
      if (k5.__ = u4, k5.__b = u4.__b + 1, null === (d4 = x5[h4]) || d4 && k5.key == d4.key && k5.type === d4.type)
        x5[h4] = void 0;
      else
        for (y4 = 0; y4 < C3; y4++) {
          if ((d4 = x5[y4]) && k5.key == d4.key && k5.type === d4.type) {
            x5[y4] = void 0;
            break;
          }
          d4 = null;
        }
      j(n3, k5, d4 = d4 || f, t3, o4, r4, c5, s4, a5), b5 = k5.__e, (y4 = k5.ref) && d4.ref != y4 && (w4 || (w4 = []), d4.ref && w4.push(d4.ref, null, k5), w4.push(y4, k5.__c || b5, k5)), null != b5 ? (null == g5 && (g5 = b5), "function" == typeof k5.type && k5.__k === d4.__k ? k5.__d = s4 = m(k5, s4, n3) : s4 = A(n3, k5, d4, x5, b5, s4), "function" == typeof u4.type && (u4.__d = s4)) : s4 && d4.__e == s4 && s4.parentNode != n3 && (s4 = _(d4));
    }
  for (u4.__e = g5, h4 = C3; h4--; )
    null != x5[h4] && ("function" == typeof u4.type && null != x5[h4].__e && x5[h4].__e == u4.__d && (u4.__d = _(i4, h4 + 1)), N(x5[h4], x5[h4]));
  if (w4)
    for (h4 = 0; h4 < w4.length; h4++)
      M(w4[h4], w4[++h4], w4[++h4]);
}
function m(n3, l4, u4) {
  for (var i4, t3 = n3.__k, o4 = 0; t3 && o4 < t3.length; o4++)
    (i4 = t3[o4]) && (i4.__ = n3, l4 = "function" == typeof i4.type ? m(i4, l4, u4) : A(u4, i4, i4, t3, i4.__e, l4));
  return l4;
}
function x(n3, l4) {
  return l4 = l4 || [], null == n3 || "boolean" == typeof n3 || (Array.isArray(n3) ? n3.some(function(n4) {
    x(n4, l4);
  }) : l4.push(n3)), l4;
}
function A(n3, l4, u4, i4, t3, o4) {
  var r4, f4, e4;
  if (void 0 !== l4.__d)
    r4 = l4.__d, l4.__d = void 0;
  else if (null == u4 || t3 != o4 || null == t3.parentNode)
    n:
      if (null == o4 || o4.parentNode !== n3)
        n3.appendChild(t3), r4 = null;
      else {
        for (f4 = o4, e4 = 0; (f4 = f4.nextSibling) && e4 < i4.length; e4 += 2)
          if (f4 == t3)
            break n;
        n3.insertBefore(t3, o4), r4 = o4;
      }
  return void 0 !== r4 ? r4 : t3.nextSibling;
}
function C(n3, l4, u4, i4, t3) {
  var o4;
  for (o4 in u4)
    "children" === o4 || "key" === o4 || o4 in l4 || H(n3, o4, null, u4[o4], i4);
  for (o4 in l4)
    t3 && "function" != typeof l4[o4] || "children" === o4 || "key" === o4 || "value" === o4 || "checked" === o4 || u4[o4] === l4[o4] || H(n3, o4, l4[o4], u4[o4], i4);
}
function $(n3, l4, u4) {
  "-" === l4[0] ? n3.setProperty(l4, u4) : n3[l4] = null == u4 ? "" : "number" != typeof u4 || c.test(l4) ? u4 : u4 + "px";
}
function H(n3, l4, u4, i4, t3) {
  var o4;
  n:
    if ("style" === l4)
      if ("string" == typeof u4)
        n3.style.cssText = u4;
      else {
        if ("string" == typeof i4 && (n3.style.cssText = i4 = ""), i4)
          for (l4 in i4)
            u4 && l4 in u4 || $(n3.style, l4, "");
        if (u4)
          for (l4 in u4)
            i4 && u4[l4] === i4[l4] || $(n3.style, l4, u4[l4]);
      }
    else if ("o" === l4[0] && "n" === l4[1])
      o4 = l4 !== (l4 = l4.replace(/Capture$/, "")), l4 = l4.toLowerCase() in n3 ? l4.toLowerCase().slice(2) : l4.slice(2), n3.l || (n3.l = {}), n3.l[l4 + o4] = u4, u4 ? i4 || n3.addEventListener(l4, o4 ? T : I, o4) : n3.removeEventListener(l4, o4 ? T : I, o4);
    else if ("dangerouslySetInnerHTML" !== l4) {
      if (t3)
        l4 = l4.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("href" !== l4 && "list" !== l4 && "form" !== l4 && "tabIndex" !== l4 && "download" !== l4 && l4 in n3)
        try {
          n3[l4] = null == u4 ? "" : u4;
          break n;
        } catch (n4) {
        }
      "function" == typeof u4 || (null != u4 && (false !== u4 || "a" === l4[0] && "r" === l4[1]) ? n3.setAttribute(l4, u4) : n3.removeAttribute(l4));
    }
}
function I(n3) {
  this.l[n3.type + false](l.event ? l.event(n3) : n3);
}
function T(n3) {
  this.l[n3.type + true](l.event ? l.event(n3) : n3);
}
function j(n3, u4, i4, t3, o4, r4, f4, e4, c5) {
  var a5, h4, v4, y4, _4, k5, b5, g5, m5, x5, A4, C3, $3, H3 = u4.type;
  if (void 0 !== u4.constructor)
    return null;
  null != i4.__h && (c5 = i4.__h, e4 = u4.__e = i4.__e, u4.__h = null, r4 = [e4]), (a5 = l.__b) && a5(u4);
  try {
    n:
      if ("function" == typeof H3) {
        if (g5 = u4.props, m5 = (a5 = H3.contextType) && t3[a5.__c], x5 = a5 ? m5 ? m5.props.value : a5.__ : t3, i4.__c ? b5 = (h4 = u4.__c = i4.__c).__ = h4.__E : ("prototype" in H3 && H3.prototype.render ? u4.__c = h4 = new H3(g5, x5) : (u4.__c = h4 = new d(g5, x5), h4.constructor = H3, h4.render = O), m5 && m5.sub(h4), h4.props = g5, h4.state || (h4.state = {}), h4.context = x5, h4.__n = t3, v4 = h4.__d = true, h4.__h = []), null == h4.__s && (h4.__s = h4.state), null != H3.getDerivedStateFromProps && (h4.__s == h4.state && (h4.__s = s({}, h4.__s)), s(h4.__s, H3.getDerivedStateFromProps(g5, h4.__s))), y4 = h4.props, _4 = h4.state, v4)
          null == H3.getDerivedStateFromProps && null != h4.componentWillMount && h4.componentWillMount(), null != h4.componentDidMount && h4.__h.push(h4.componentDidMount);
        else {
          if (null == H3.getDerivedStateFromProps && g5 !== y4 && null != h4.componentWillReceiveProps && h4.componentWillReceiveProps(g5, x5), !h4.__e && null != h4.shouldComponentUpdate && false === h4.shouldComponentUpdate(g5, h4.__s, x5) || u4.__v === i4.__v) {
            h4.props = g5, h4.state = h4.__s, u4.__v !== i4.__v && (h4.__d = false), h4.__v = u4, u4.__e = i4.__e, u4.__k = i4.__k, u4.__k.forEach(function(n4) {
              n4 && (n4.__ = u4);
            }), h4.__h.length && f4.push(h4);
            break n;
          }
          null != h4.componentWillUpdate && h4.componentWillUpdate(g5, h4.__s, x5), null != h4.componentDidUpdate && h4.__h.push(function() {
            h4.componentDidUpdate(y4, _4, k5);
          });
        }
        if (h4.context = x5, h4.props = g5, h4.__v = u4, h4.__P = n3, A4 = l.__r, C3 = 0, "prototype" in H3 && H3.prototype.render)
          h4.state = h4.__s, h4.__d = false, A4 && A4(u4), a5 = h4.render(h4.props, h4.state, h4.context);
        else
          do {
            h4.__d = false, A4 && A4(u4), a5 = h4.render(h4.props, h4.state, h4.context), h4.state = h4.__s;
          } while (h4.__d && ++C3 < 25);
        h4.state = h4.__s, null != h4.getChildContext && (t3 = s(s({}, t3), h4.getChildContext())), v4 || null == h4.getSnapshotBeforeUpdate || (k5 = h4.getSnapshotBeforeUpdate(y4, _4)), $3 = null != a5 && a5.type === p && null == a5.key ? a5.props.children : a5, w(n3, Array.isArray($3) ? $3 : [$3], u4, i4, t3, o4, r4, f4, e4, c5), h4.base = u4.__e, u4.__h = null, h4.__h.length && f4.push(h4), b5 && (h4.__E = h4.__ = null), h4.__e = false;
      } else
        null == r4 && u4.__v === i4.__v ? (u4.__k = i4.__k, u4.__e = i4.__e) : u4.__e = L(i4.__e, u4, i4, t3, o4, r4, f4, c5);
    (a5 = l.diffed) && a5(u4);
  } catch (n4) {
    u4.__v = null, (c5 || null != r4) && (u4.__e = e4, u4.__h = !!c5, r4[r4.indexOf(e4)] = null), l.__e(n4, u4, i4);
  }
}
function z(n3, u4) {
  l.__c && l.__c(u4, n3), n3.some(function(u5) {
    try {
      n3 = u5.__h, u5.__h = [], n3.some(function(n4) {
        n4.call(u5);
      });
    } catch (n4) {
      l.__e(n4, u5.__v);
    }
  });
}
function L(l4, u4, i4, t3, o4, r4, e4, c5) {
  var s4, h4, v4, y4 = i4.props, p4 = u4.props, d4 = u4.type, k5 = 0;
  if ("svg" === d4 && (o4 = true), null != r4) {
    for (; k5 < r4.length; k5++)
      if ((s4 = r4[k5]) && "setAttribute" in s4 == !!d4 && (d4 ? s4.localName === d4 : 3 === s4.nodeType)) {
        l4 = s4, r4[k5] = null;
        break;
      }
  }
  if (null == l4) {
    if (null === d4)
      return document.createTextNode(p4);
    l4 = o4 ? document.createElementNS("http://www.w3.org/2000/svg", d4) : document.createElement(d4, p4.is && p4), r4 = null, c5 = false;
  }
  if (null === d4)
    y4 === p4 || c5 && l4.data === p4 || (l4.data = p4);
  else {
    if (r4 = r4 && n.call(l4.childNodes), h4 = (y4 = i4.props || f).dangerouslySetInnerHTML, v4 = p4.dangerouslySetInnerHTML, !c5) {
      if (null != r4)
        for (y4 = {}, k5 = 0; k5 < l4.attributes.length; k5++)
          y4[l4.attributes[k5].name] = l4.attributes[k5].value;
      (v4 || h4) && (v4 && (h4 && v4.__html == h4.__html || v4.__html === l4.innerHTML) || (l4.innerHTML = v4 && v4.__html || ""));
    }
    if (C(l4, p4, y4, o4, c5), v4)
      u4.__k = [];
    else if (k5 = u4.props.children, w(l4, Array.isArray(k5) ? k5 : [k5], u4, i4, t3, o4 && "foreignObject" !== d4, r4, e4, r4 ? r4[0] : i4.__k && _(i4, 0), c5), null != r4)
      for (k5 = r4.length; k5--; )
        null != r4[k5] && a(r4[k5]);
    c5 || ("value" in p4 && void 0 !== (k5 = p4.value) && (k5 !== l4.value || "progress" === d4 && !k5 || "option" === d4 && k5 !== y4.value) && H(l4, "value", k5, y4.value, false), "checked" in p4 && void 0 !== (k5 = p4.checked) && k5 !== l4.checked && H(l4, "checked", k5, y4.checked, false));
  }
  return l4;
}
function M(n3, u4, i4) {
  try {
    "function" == typeof n3 ? n3(u4) : n3.current = u4;
  } catch (n4) {
    l.__e(n4, i4);
  }
}
function N(n3, u4, i4) {
  var t3, o4;
  if (l.unmount && l.unmount(n3), (t3 = n3.ref) && (t3.current && t3.current !== n3.__e || M(t3, null, u4)), null != (t3 = n3.__c)) {
    if (t3.componentWillUnmount)
      try {
        t3.componentWillUnmount();
      } catch (n4) {
        l.__e(n4, u4);
      }
    t3.base = t3.__P = null;
  }
  if (t3 = n3.__k)
    for (o4 = 0; o4 < t3.length; o4++)
      t3[o4] && N(t3[o4], u4, "function" != typeof n3.type);
  i4 || null == n3.__e || a(n3.__e), n3.__e = n3.__d = void 0;
}
function O(n3, l4, u4) {
  return this.constructor(n3, u4);
}
function P(u4, i4, t3) {
  var o4, r4, e4;
  l.__ && l.__(u4, i4), r4 = (o4 = "function" == typeof t3) ? null : t3 && t3.__k || i4.__k, e4 = [], j(i4, u4 = (!o4 && t3 || i4).__k = h(p, null, [u4]), r4 || f, f, void 0 !== i4.ownerSVGElement, !o4 && t3 ? [t3] : r4 ? null : i4.firstChild ? n.call(i4.childNodes) : null, e4, !o4 && t3 ? t3 : r4 ? r4.__e : i4.firstChild, o4), z(e4, u4);
}
function S(n3, l4) {
  P(n3, l4, S);
}
function q(l4, u4, i4) {
  var t3, o4, r4, f4 = s({}, l4.props);
  for (r4 in u4)
    "key" == r4 ? t3 = u4[r4] : "ref" == r4 ? o4 = u4[r4] : f4[r4] = u4[r4];
  return arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : i4), v(l4.type, f4, t3 || l4.key, o4 || l4.ref, null);
}
function B(n3, l4) {
  var u4 = { __c: l4 = "__cC" + r++, __: n3, Consumer: function(n4, l5) {
    return n4.children(l5);
  }, Provider: function(n4) {
    var u5, i4;
    return this.getChildContext || (u5 = [], (i4 = {})[l4] = this, this.getChildContext = function() {
      return i4;
    }, this.shouldComponentUpdate = function(n5) {
      this.props.value !== n5.value && u5.some(b);
    }, this.sub = function(n5) {
      u5.push(n5);
      var l5 = n5.componentWillUnmount;
      n5.componentWillUnmount = function() {
        u5.splice(u5.indexOf(n5), 1), l5 && l5.call(n5);
      };
    }), n4.children;
  } };
  return u4.Provider.__ = u4.Consumer.contextType = u4;
}
n = e.slice, l = { __e: function(n3, l4, u4, i4) {
  for (var t3, o4, r4; l4 = l4.__; )
    if ((t3 = l4.__c) && !t3.__)
      try {
        if ((o4 = t3.constructor) && null != o4.getDerivedStateFromError && (t3.setState(o4.getDerivedStateFromError(n3)), r4 = t3.__d), null != t3.componentDidCatch && (t3.componentDidCatch(n3, i4 || {}), r4 = t3.__d), r4)
          return t3.__E = t3;
      } catch (l5) {
        n3 = l5;
      }
  throw n3;
} }, u = 0, i = function(n3) {
  return null != n3 && void 0 === n3.constructor;
}, d.prototype.setState = function(n3, l4) {
  var u4;
  u4 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = s({}, this.state), "function" == typeof n3 && (n3 = n3(s({}, u4), this.props)), n3 && s(u4, n3), null != n3 && this.__v && (l4 && this.__h.push(l4), b(this));
}, d.prototype.forceUpdate = function(n3) {
  this.__v && (this.__e = true, n3 && this.__h.push(n3), b(this));
}, d.prototype.render = p, t = [], g.__r = 0, r = 0;

// ../../.yarn/global/cache/preact-npm-10.10.6-e3746adb94-9.zip/node_modules/preact/compat/dist/compat.module.js
init_define_process();

// ../../.yarn/global/cache/preact-npm-10.10.6-e3746adb94-9.zip/node_modules/preact/hooks/dist/hooks.module.js
init_define_process();
var t2;
var r2;
var u2;
var i2;
var o2 = 0;
var c2 = [];
var f2 = [];
var e2 = l.__b;
var a2 = l.__r;
var v2 = l.diffed;
var l2 = l.__c;
var m2 = l.unmount;
function d2(t3, u4) {
  l.__h && l.__h(r2, t3, o2 || u4), o2 = 0;
  var i4 = r2.__H || (r2.__H = { __: [], __h: [] });
  return t3 >= i4.__.length && i4.__.push({ __V: f2 }), i4.__[t3];
}
function p2(n3) {
  return o2 = 1, y2(z2, n3);
}
function y2(n3, u4, i4) {
  var o4 = d2(t2++, 2);
  if (o4.t = n3, !o4.__c && (o4.__ = [i4 ? i4(u4) : z2(void 0, u4), function(n4) {
    var t3 = o4.__N ? o4.__N[0] : o4.__[0], r4 = o4.t(t3, n4);
    t3 !== r4 && (o4.__N = [r4, o4.__[1]], o4.__c.setState({}));
  }], o4.__c = r2, !r2.u)) {
    r2.u = true;
    var c5 = r2.shouldComponentUpdate;
    r2.shouldComponentUpdate = function(n4, t3, r4) {
      if (!o4.__c.__H)
        return true;
      var u5 = o4.__c.__H.__.filter(function(n5) {
        return n5.__c;
      });
      if (u5.every(function(n5) {
        return !n5.__N;
      }))
        return !c5 || c5.call(this, n4, t3, r4);
      var i5 = false;
      return u5.forEach(function(n5) {
        if (n5.__N) {
          var t4 = n5.__[0];
          n5.__ = n5.__N, n5.__N = void 0, t4 !== n5.__[0] && (i5 = true);
        }
      }), !!i5 && (!c5 || c5.call(this, n4, t3, r4));
    };
  }
  return o4.__N || o4.__;
}
function h2(u4, i4) {
  var o4 = d2(t2++, 3);
  !l.__s && w2(o4.__H, i4) && (o4.__ = u4, o4.i = i4, r2.__H.__h.push(o4));
}
function s2(u4, i4) {
  var o4 = d2(t2++, 4);
  !l.__s && w2(o4.__H, i4) && (o4.__ = u4, o4.i = i4, r2.__h.push(o4));
}
function _2(n3) {
  return o2 = 5, F(function() {
    return { current: n3 };
  }, []);
}
function A2(n3, t3, r4) {
  o2 = 6, s2(function() {
    return "function" == typeof n3 ? (n3(t3()), function() {
      return n3(null);
    }) : n3 ? (n3.current = t3(), function() {
      return n3.current = null;
    }) : void 0;
  }, null == r4 ? r4 : r4.concat(n3));
}
function F(n3, r4) {
  var u4 = d2(t2++, 7);
  return w2(u4.__H, r4) ? (u4.__V = n3(), u4.i = r4, u4.__h = n3, u4.__V) : u4.__;
}
function T2(n3, t3) {
  return o2 = 8, F(function() {
    return n3;
  }, t3);
}
function q2(n3) {
  var u4 = r2.context[n3.__c], i4 = d2(t2++, 9);
  return i4.c = n3, u4 ? (null == i4.__ && (i4.__ = true, u4.sub(r2)), u4.props.value) : n3.__;
}
function x2(t3, r4) {
  l.useDebugValue && l.useDebugValue(r4 ? r4(t3) : t3);
}
function b2() {
  for (var t3; t3 = c2.shift(); )
    if (t3.__P && t3.__H)
      try {
        t3.__H.__h.forEach(j2), t3.__H.__h.forEach(k2), t3.__H.__h = [];
      } catch (r4) {
        t3.__H.__h = [], l.__e(r4, t3.__v);
      }
}
l.__b = function(n3) {
  r2 = null, e2 && e2(n3);
}, l.__r = function(n3) {
  a2 && a2(n3), t2 = 0;
  var i4 = (r2 = n3.__c).__H;
  i4 && (u2 === r2 ? (i4.__h = [], r2.__h = [], i4.__.forEach(function(n4) {
    n4.__N && (n4.__ = n4.__N), n4.__V = f2, n4.__N = n4.i = void 0;
  })) : (i4.__h.forEach(j2), i4.__h.forEach(k2), i4.__h = [])), u2 = r2;
}, l.diffed = function(t3) {
  v2 && v2(t3);
  var o4 = t3.__c;
  o4 && o4.__H && (o4.__H.__h.length && (1 !== c2.push(o4) && i2 === l.requestAnimationFrame || ((i2 = l.requestAnimationFrame) || function(n3) {
    var t4, r4 = function() {
      clearTimeout(u4), g2 && cancelAnimationFrame(t4), setTimeout(n3);
    }, u4 = setTimeout(r4, 100);
    g2 && (t4 = requestAnimationFrame(r4));
  })(b2)), o4.__H.__.forEach(function(n3) {
    n3.i && (n3.__H = n3.i), n3.__V !== f2 && (n3.__ = n3.__V), n3.i = void 0, n3.__V = f2;
  })), u2 = r2 = null;
}, l.__c = function(t3, r4) {
  r4.some(function(t4) {
    try {
      t4.__h.forEach(j2), t4.__h = t4.__h.filter(function(n3) {
        return !n3.__ || k2(n3);
      });
    } catch (u4) {
      r4.some(function(n3) {
        n3.__h && (n3.__h = []);
      }), r4 = [], l.__e(u4, t4.__v);
    }
  }), l2 && l2(t3, r4);
}, l.unmount = function(t3) {
  m2 && m2(t3);
  var r4, u4 = t3.__c;
  u4 && u4.__H && (u4.__H.__.forEach(function(n3) {
    try {
      j2(n3);
    } catch (n4) {
      r4 = n4;
    }
  }), r4 && l.__e(r4, u4.__v));
};
var g2 = "function" == typeof requestAnimationFrame;
function j2(n3) {
  var t3 = r2, u4 = n3.__c;
  "function" == typeof u4 && (n3.__c = void 0, u4()), r2 = t3;
}
function k2(n3) {
  var t3 = r2;
  n3.__c = n3.__(), r2 = t3;
}
function w2(n3, t3) {
  return !n3 || n3.length !== t3.length || t3.some(function(t4, r4) {
    return t4 !== n3[r4];
  });
}
function z2(n3, t3) {
  return "function" == typeof t3 ? t3(n3) : t3;
}

// ../../.yarn/global/cache/preact-npm-10.10.6-e3746adb94-9.zip/node_modules/preact/compat/dist/compat.module.js
function S2(n3, t3) {
  for (var e4 in t3)
    n3[e4] = t3[e4];
  return n3;
}
function g3(n3, t3) {
  for (var e4 in n3)
    if ("__source" !== e4 && !(e4 in t3))
      return true;
  for (var r4 in t3)
    if ("__source" !== r4 && n3[r4] !== t3[r4])
      return true;
  return false;
}
function C2(n3) {
  this.props = n3;
}
function E(n3, t3) {
  function e4(n4) {
    var e5 = this.props.ref, r5 = e5 == n4.ref;
    return !r5 && e5 && (e5.call ? e5(null) : e5.current = null), t3 ? !t3(this.props, n4) || !r5 : g3(this.props, n4);
  }
  function r4(t4) {
    return this.shouldComponentUpdate = e4, h(n3, t4);
  }
  return r4.displayName = "Memo(" + (n3.displayName || n3.name) + ")", r4.prototype.isReactComponent = true, r4.__f = true, r4;
}
(C2.prototype = new d()).isPureReactComponent = true, C2.prototype.shouldComponentUpdate = function(n3, t3) {
  return g3(this.props, n3) || g3(this.state, t3);
};
var w3 = l.__b;
l.__b = function(n3) {
  n3.type && n3.type.__f && n3.ref && (n3.props.ref = n3.ref, n3.ref = null), w3 && w3(n3);
};
var x3 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function R(n3) {
  function t3(t4) {
    var e4 = S2({}, t4);
    return delete e4.ref, n3(e4, t4.ref || null);
  }
  return t3.$$typeof = x3, t3.render = t3, t3.prototype.isReactComponent = t3.__f = true, t3.displayName = "ForwardRef(" + (n3.displayName || n3.name) + ")", t3;
}
var N2 = function(n3, t3) {
  return null == n3 ? null : x(x(n3).map(t3));
};
var k3 = { map: N2, forEach: N2, count: function(n3) {
  return n3 ? x(n3).length : 0;
}, only: function(n3) {
  var t3 = x(n3);
  if (1 !== t3.length)
    throw "Children.only";
  return t3[0];
}, toArray: x };
var A3 = l.__e;
l.__e = function(n3, t3, e4, r4) {
  if (n3.then) {
    for (var u4, o4 = t3; o4 = o4.__; )
      if ((u4 = o4.__c) && u4.__c)
        return null == t3.__e && (t3.__e = e4.__e, t3.__k = e4.__k), u4.__c(n3, t3);
  }
  A3(n3, t3, e4, r4);
};
var O2 = l.unmount;
function T3() {
  this.__u = 0, this.t = null, this.__b = null;
}
function L2(n3) {
  var t3 = n3.__.__c;
  return t3 && t3.__a && t3.__a(n3);
}
function U(n3) {
  var t3, e4, r4;
  function u4(u5) {
    if (t3 || (t3 = n3()).then(function(n4) {
      e4 = n4.default || n4;
    }, function(n4) {
      r4 = n4;
    }), r4)
      throw r4;
    if (!e4)
      throw t3;
    return h(e4, u5);
  }
  return u4.displayName = "Lazy", u4.__f = true, u4;
}
function D() {
  this.u = null, this.o = null;
}
l.unmount = function(n3) {
  var t3 = n3.__c;
  t3 && t3.__R && t3.__R(), t3 && true === n3.__h && (n3.type = null), O2 && O2(n3);
}, (T3.prototype = new d()).__c = function(n3, t3) {
  var e4 = t3.__c, r4 = this;
  null == r4.t && (r4.t = []), r4.t.push(e4);
  var u4 = L2(r4.__v), o4 = false, i4 = function() {
    o4 || (o4 = true, e4.__R = null, u4 ? u4(l4) : l4());
  };
  e4.__R = i4;
  var l4 = function() {
    if (!--r4.__u) {
      if (r4.state.__a) {
        var n4 = r4.state.__a;
        r4.__v.__k[0] = function n5(t5, e5, r5) {
          return t5 && (t5.__v = null, t5.__k = t5.__k && t5.__k.map(function(t6) {
            return n5(t6, e5, r5);
          }), t5.__c && t5.__c.__P === e5 && (t5.__e && r5.insertBefore(t5.__e, t5.__d), t5.__c.__e = true, t5.__c.__P = r5)), t5;
        }(n4, n4.__c.__P, n4.__c.__O);
      }
      var t4;
      for (r4.setState({ __a: r4.__b = null }); t4 = r4.t.pop(); )
        t4.forceUpdate();
    }
  }, c5 = true === t3.__h;
  r4.__u++ || c5 || r4.setState({ __a: r4.__b = r4.__v.__k[0] }), n3.then(i4, i4);
}, T3.prototype.componentWillUnmount = function() {
  this.t = [];
}, T3.prototype.render = function(n3, t3) {
  if (this.__b) {
    if (this.__v.__k) {
      var e4 = document.createElement("div"), r4 = this.__v.__k[0].__c;
      this.__v.__k[0] = function n4(t4, e5, r5) {
        return t4 && (t4.__c && t4.__c.__H && (t4.__c.__H.__.forEach(function(n5) {
          "function" == typeof n5.__c && n5.__c();
        }), t4.__c.__H = null), null != (t4 = S2({}, t4)).__c && (t4.__c.__P === r5 && (t4.__c.__P = e5), t4.__c = null), t4.__k = t4.__k && t4.__k.map(function(t5) {
          return n4(t5, e5, r5);
        })), t4;
      }(this.__b, e4, r4.__O = r4.__P);
    }
    this.__b = null;
  }
  var u4 = t3.__a && h(p, null, n3.fallback);
  return u4 && (u4.__h = null), [h(p, null, t3.__a ? null : n3.children), u4];
};
var F2 = function(n3, t3, e4) {
  if (++e4[1] === e4[0] && n3.o.delete(t3), n3.props.revealOrder && ("t" !== n3.props.revealOrder[0] || !n3.o.size))
    for (e4 = n3.u; e4; ) {
      for (; e4.length > 3; )
        e4.pop()();
      if (e4[1] < e4[0])
        break;
      n3.u = e4 = e4[2];
    }
};
function I2(n3) {
  return this.getChildContext = function() {
    return n3.context;
  }, n3.children;
}
function M2(n3) {
  var t3 = this, e4 = n3.i;
  t3.componentWillUnmount = function() {
    P(null, t3.l), t3.l = null, t3.i = null;
  }, t3.i && t3.i !== e4 && t3.componentWillUnmount(), n3.__v ? (t3.l || (t3.i = e4, t3.l = { nodeType: 1, parentNode: e4, childNodes: [], appendChild: function(n4) {
    this.childNodes.push(n4), t3.i.appendChild(n4);
  }, insertBefore: function(n4, e5) {
    this.childNodes.push(n4), t3.i.appendChild(n4);
  }, removeChild: function(n4) {
    this.childNodes.splice(this.childNodes.indexOf(n4) >>> 1, 1), t3.i.removeChild(n4);
  } }), P(h(I2, { context: t3.context }, n3.__v), t3.l)) : t3.l && t3.componentWillUnmount();
}
function V(n3, t3) {
  var e4 = h(M2, { __v: n3, i: t3 });
  return e4.containerInfo = t3, e4;
}
(D.prototype = new d()).__a = function(n3) {
  var t3 = this, e4 = L2(t3.__v), r4 = t3.o.get(n3);
  return r4[0]++, function(u4) {
    var o4 = function() {
      t3.props.revealOrder ? (r4.push(u4), F2(t3, n3, r4)) : u4();
    };
    e4 ? e4(o4) : o4();
  };
}, D.prototype.render = function(n3) {
  this.u = null, this.o = /* @__PURE__ */ new Map();
  var t3 = x(n3.children);
  n3.revealOrder && "b" === n3.revealOrder[0] && t3.reverse();
  for (var e4 = t3.length; e4--; )
    this.o.set(t3[e4], this.u = [1, 0, this.u]);
  return n3.children;
}, D.prototype.componentDidUpdate = D.prototype.componentDidMount = function() {
  var n3 = this;
  this.o.forEach(function(t3, e4) {
    F2(n3, e4, t3);
  });
};
var W = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
var P2 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
var $2 = "undefined" != typeof document;
var j3 = function(n3) {
  return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i).test(n3);
};
function z3(n3, t3, e4) {
  return null == t3.__k && (t3.textContent = ""), P(n3, t3), "function" == typeof e4 && e4(), n3 ? n3.__c : null;
}
function B2(n3, t3, e4) {
  return S(n3, t3), "function" == typeof e4 && e4(), n3 ? n3.__c : null;
}
d.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(n3) {
  Object.defineProperty(d.prototype, n3, { configurable: true, get: function() {
    return this["UNSAFE_" + n3];
  }, set: function(t3) {
    Object.defineProperty(this, n3, { configurable: true, writable: true, value: t3 });
  } });
});
var H2 = l.event;
function Z() {
}
function Y() {
  return this.cancelBubble;
}
function q3() {
  return this.defaultPrevented;
}
l.event = function(n3) {
  return H2 && (n3 = H2(n3)), n3.persist = Z, n3.isPropagationStopped = Y, n3.isDefaultPrevented = q3, n3.nativeEvent = n3;
};
var G;
var J = { configurable: true, get: function() {
  return this.class;
} };
var K = l.vnode;
l.vnode = function(n3) {
  var t3 = n3.type, e4 = n3.props, r4 = e4;
  if ("string" == typeof t3) {
    var u4 = -1 === t3.indexOf("-");
    for (var o4 in r4 = {}, e4) {
      var i4 = e4[o4];
      $2 && "children" === o4 && "noscript" === t3 || "value" === o4 && "defaultValue" in e4 && null == i4 || ("defaultValue" === o4 && "value" in e4 && null == e4.value ? o4 = "value" : "download" === o4 && true === i4 ? i4 = "" : /ondoubleclick/i.test(o4) ? o4 = "ondblclick" : /^onchange(textarea|input)/i.test(o4 + t3) && !j3(e4.type) ? o4 = "oninput" : /^onfocus$/i.test(o4) ? o4 = "onfocusin" : /^onblur$/i.test(o4) ? o4 = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(o4) ? o4 = o4.toLowerCase() : u4 && P2.test(o4) ? o4 = o4.replace(/[A-Z0-9]/g, "-$&").toLowerCase() : null === i4 && (i4 = void 0), /^oninput$/i.test(o4) && (o4 = o4.toLowerCase(), r4[o4] && (o4 = "oninputCapture")), r4[o4] = i4);
    }
    "select" == t3 && r4.multiple && Array.isArray(r4.value) && (r4.value = x(e4.children).forEach(function(n4) {
      n4.props.selected = -1 != r4.value.indexOf(n4.props.value);
    })), "select" == t3 && null != r4.defaultValue && (r4.value = x(e4.children).forEach(function(n4) {
      n4.props.selected = r4.multiple ? -1 != r4.defaultValue.indexOf(n4.props.value) : r4.defaultValue == n4.props.value;
    })), n3.props = r4, e4.class != e4.className && (J.enumerable = "className" in e4, null != e4.className && (r4.class = e4.className), Object.defineProperty(r4, "className", J));
  }
  n3.$$typeof = W, K && K(n3);
};
var Q = l.__r;
l.__r = function(n3) {
  Q && Q(n3), G = n3.__c;
};
var X = { ReactCurrentDispatcher: { current: { readContext: function(n3) {
  return G.__n[n3.__c].props.value;
} } } };
function tn(n3) {
  return h.bind(null, n3);
}
function en(n3) {
  return !!n3 && n3.$$typeof === W;
}
function rn(n3) {
  return en(n3) ? q.apply(null, arguments) : n3;
}
function un(n3) {
  return !!n3.__k && (P(null, n3), true);
}
function on(n3) {
  return n3 && (n3.base || 1 === n3.nodeType && n3) || null;
}
var ln = function(n3, t3) {
  return n3(t3);
};
var cn = function(n3, t3) {
  return n3(t3);
};
function an(n3) {
  n3();
}
function sn(n3) {
  return n3;
}
function hn() {
  return [false, an];
}
function dn(t3, u4) {
  var o4 = u4(), i4 = p2({ s: { __: o4, h: u4 } }), l4 = i4[0].s, c5 = i4[1];
  return s2(function() {
    l4.__ = o4, l4.h = u4, l4.__ !== u4() && c5({ s: l4 });
  }, [t3, o4, u4]), h2(function() {
    return l4.__ !== l4.h() && c5({ s: l4 }), t3(function() {
      l4.__ !== l4.h() && c5({ s: l4 });
    });
  }, [t3]), o4;
}
var compat_module_default = { useState: p2, useReducer: y2, useEffect: h2, useLayoutEffect: s2, useInsertionEffect: s2, useTransition: hn, useDeferredValue: sn, useSyncExternalStore: dn, startTransition: an, useRef: _2, useImperativeHandle: A2, useMemo: F, useCallback: T2, useContext: q2, useDebugValue: x2, version: "17.0.2", Children: k3, render: z3, hydrate: B2, unmountComponentAtNode: un, createPortal: V, createElement: h, createContext: B, createFactory: tn, cloneElement: rn, createRef: y, Fragment: p, isValidElement: en, findDOMNode: on, Component: d, PureComponent: C2, memo: E, forwardRef: R, flushSync: cn, unstable_batchedUpdates: ln, StrictMode: p, Suspense: T3, SuspenseList: D, lazy: U, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: X };

// .yarn/__virtual__/preact-render-to-string-virtual-01f41805c5/3/.yarn/global/cache/preact-render-to-string-npm-5.2.2-b8f2c0c74e-9.zip/node_modules/preact-render-to-string/dist/index.mjs
init_define_process();
var r3 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;
var n2 = /[&<>"]/;
function o3(e4) {
  if (false === n2.test(e4 += ""))
    return e4;
  for (var t3 = 0, r4 = 0, o4 = "", i4 = ""; r4 < e4.length; r4++) {
    switch (e4.charCodeAt(r4)) {
      case 60:
        i4 = "&lt;";
        break;
      case 62:
        i4 = "&gt;";
        break;
      case 34:
        i4 = "&quot;";
        break;
      case 38:
        i4 = "&amp;";
        break;
      default:
        continue;
    }
    r4 > t3 && (o4 += e4.slice(t3, r4)), o4 += i4, t3 = r4 + 1;
  }
  return o4 + e4.slice(t3, r4);
}
var i3 = function(e4, t3) {
  return String(e4).replace(/(\n+)/g, "$1" + (t3 || "	"));
};
var a3 = function(e4, t3, r4) {
  return String(e4).length > (t3 || 40) || !r4 && -1 !== String(e4).indexOf("\n") || -1 !== String(e4).indexOf("<");
};
var l3 = {};
function s3(e4) {
  var t3 = "";
  for (var n3 in e4) {
    var o4 = e4[n3];
    null != o4 && "" !== o4 && (t3 && (t3 += " "), t3 += "-" == n3[0] ? n3 : l3[n3] || (l3[n3] = n3.replace(/([A-Z])/g, "-$1").toLowerCase()), t3 += ": ", t3 += o4, "number" == typeof o4 && false === r3.test(n3) && (t3 += "px"), t3 += ";");
  }
  return t3 || void 0;
}
function f3(e4, t3) {
  return Array.isArray(t3) ? t3.reduce(f3, e4) : null != t3 && false !== t3 && e4.push(t3), e4;
}
var c3 = { shallow: true };
var u3 = [];
var _3 = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/;
var p3 = /[\s\n\\/='"\0<>]/;
var d3 = /^xlink:?./;
function v3() {
  this.__d = true;
}
y3.render = y3;
var h3 = function(e4, t3) {
  return y3(e4, t3, c3);
};
var g4 = [];
function y3(t3, r4, n3) {
  r4 = r4 || {}, n3 = n3 || {};
  var o4, i4 = l.__s;
  return l.__s = true, o4 = n3.pretty || n3.sortAttributes ? S3(t3, r4, n3) : x4(t3, r4, n3), l.__c && l.__c(t3, g4), g4.length = 0, l.__s = i4, o4;
}
function m3(e4, t3) {
  return { __v: e4, context: t3, props: e4.props, setState: v3, forceUpdate: v3, __d: true, __h: [] };
}
function b3(e4, t3) {
  var r4 = e4.contextType, n3 = r4 && t3[r4.__c];
  return null != r4 ? n3 ? n3.props.value : r4.__ : t3;
}
function x4(r4, n3, i4, a5, l4, c5) {
  if (null == r4 || "boolean" == typeof r4)
    return "";
  if ("object" != typeof r4)
    return o3(r4);
  if (Array.isArray(r4)) {
    for (var u4 = [], v4 = 0; v4 < r4.length; v4++)
      u4.push(x4(r4[v4], n3, i4, a5, l4, c5));
    return u4.join("");
  }
  var h4 = r4.type, g5 = r4.props, y4 = false;
  if ("function" == typeof h4) {
    if (y4 = true, !i4.shallow || !a5 && false !== i4.renderRootComponent) {
      if (h4 === p) {
        var S4 = [];
        return f3(S4, r4.props.children), x4(S4, n3, i4, false !== i4.shallowHighOrder, l4, c5);
      }
      var w4, C3 = r4.__c = m3(r4, n3);
      l.__b && l.__b(r4);
      var O3 = l.__r;
      if (h4.prototype && "function" == typeof h4.prototype.render) {
        var j4 = b3(h4, n3);
        (C3 = r4.__c = new h4(g5, j4)).__v = r4, C3._dirty = C3.__d = true, C3.props = g5, null == C3.state && (C3.state = {}), null == C3._nextState && null == C3.__s && (C3._nextState = C3.__s = C3.state), C3.context = j4, h4.getDerivedStateFromProps ? C3.state = Object.assign({}, C3.state, h4.getDerivedStateFromProps(C3.props, C3.state)) : C3.componentWillMount && (C3.componentWillMount(), C3.state = C3._nextState !== C3.state ? C3._nextState : C3.__s !== C3.state ? C3.__s : C3.state), O3 && O3(r4), w4 = C3.render(C3.props, C3.state, C3.context);
      } else
        for (var A4 = b3(h4, n3), H3 = 0; C3.__d && H3++ < 25; )
          C3.__d = false, O3 && O3(r4), w4 = h4.call(r4.__c, g5, A4);
      return C3.getChildContext && (n3 = Object.assign({}, n3, C3.getChildContext())), l.diffed && l.diffed(r4), x4(w4, n3, i4, false !== i4.shallowHighOrder, l4, c5);
    }
    h4 = k4(h4);
  }
  var M3, F3, L3 = "<" + h4;
  if (g5)
    for (var E2 in g5) {
      var T4 = g5[E2];
      if ("children" !== E2) {
        if (!p3.test(E2) && (i4 && i4.allAttributes || "key" !== E2 && "ref" !== E2 && "__self" !== E2 && "__source" !== E2)) {
          if ("defaultValue" === E2)
            E2 = "value";
          else if ("defaultChecked" === E2)
            E2 = "checked";
          else if ("defaultSelected" === E2)
            E2 = "selected";
          else if ("className" === E2) {
            if (void 0 !== g5.class)
              continue;
            E2 = "class";
          } else
            l4 && d3.test(E2) && (E2 = E2.toLowerCase().replace(/^xlink:?/, "xlink:"));
          if ("htmlFor" === E2) {
            if (g5.for)
              continue;
            E2 = "for";
          }
          "style" === E2 && T4 && "object" == typeof T4 && (T4 = s3(T4)), "a" === E2[0] && "r" === E2[1] && "boolean" == typeof T4 && (T4 = String(T4));
          var $3 = i4.attributeHook && i4.attributeHook(E2, T4, n3, i4, y4);
          if ($3 || "" === $3)
            L3 += $3;
          else if ("dangerouslySetInnerHTML" === E2)
            F3 = T4 && T4.__html;
          else if ("textarea" === h4 && "value" === E2)
            M3 = T4;
          else if ((T4 || 0 === T4 || "" === T4) && "function" != typeof T4) {
            if (!(true !== T4 && "" !== T4 || (T4 = E2, i4 && i4.xml))) {
              L3 = L3 + " " + E2;
              continue;
            }
            if ("value" === E2) {
              if ("select" === h4) {
                c5 = T4;
                continue;
              }
              "option" === h4 && c5 == T4 && void 0 === g5.selected && (L3 += " selected");
            }
            L3 = L3 + " " + E2 + '="' + o3(T4) + '"';
          }
        }
      } else
        M3 = T4;
    }
  if (L3 += ">", p3.test(h4))
    throw new Error(h4 + " is not a valid HTML tag name in " + L3);
  var D2, P3 = _3.test(h4) || i4.voidElements && i4.voidElements.test(h4), W2 = "";
  if (F3)
    L3 += F3;
  else if (null != M3 && f3(D2 = [], M3).length)
    for (var N3 = 0; N3 < D2.length; N3++) {
      var R2 = D2[N3];
      if (null != R2 && false !== R2) {
        var I3 = x4(R2, n3, i4, true, "svg" === h4 || "foreignObject" !== h4 && l4, c5);
        I3 && (W2 += I3);
      }
    }
  if (W2.length || F3)
    L3 += W2;
  else if (i4 && i4.xml)
    return L3.substring(0, L3.length - 1) + " />";
  return !P3 || D2 || F3 ? L3 + "</" + h4 + ">" : L3.replace(/>$/, " />");
}
function S3(r4, n3, l4, c5, u4, v4) {
  if (null == r4 || "boolean" == typeof r4)
    return "";
  if ("object" != typeof r4)
    return o3(r4);
  var h4 = l4.pretty, g5 = h4 && "string" == typeof h4 ? h4 : "	";
  if (Array.isArray(r4)) {
    for (var y4 = "", x5 = 0; x5 < r4.length; x5++)
      h4 && x5 > 0 && (y4 += "\n"), y4 += S3(r4[x5], n3, l4, c5, u4, v4);
    return y4;
  }
  var w4 = r4.type, C3 = r4.props, O3 = false;
  if ("function" == typeof w4) {
    if (O3 = true, !l4.shallow || !c5 && false !== l4.renderRootComponent) {
      if (w4 === p) {
        var j4 = [];
        return f3(j4, r4.props.children), S3(j4, n3, l4, false !== l4.shallowHighOrder, u4, v4);
      }
      var A4, H3 = r4.__c = m3(r4, n3);
      l.__b && l.__b(r4);
      var M3 = l.__r;
      if (w4.prototype && "function" == typeof w4.prototype.render) {
        var F3 = b3(w4, n3);
        (H3 = r4.__c = new w4(C3, F3)).__v = r4, H3._dirty = H3.__d = true, H3.props = C3, null == H3.state && (H3.state = {}), null == H3._nextState && null == H3.__s && (H3._nextState = H3.__s = H3.state), H3.context = F3, w4.getDerivedStateFromProps ? H3.state = Object.assign({}, H3.state, w4.getDerivedStateFromProps(H3.props, H3.state)) : H3.componentWillMount && (H3.componentWillMount(), H3.state = H3._nextState !== H3.state ? H3._nextState : H3.__s !== H3.state ? H3.__s : H3.state), M3 && M3(r4), A4 = H3.render(H3.props, H3.state, H3.context);
      } else
        for (var L3 = b3(w4, n3), E2 = 0; H3.__d && E2++ < 25; )
          H3.__d = false, M3 && M3(r4), A4 = w4.call(r4.__c, C3, L3);
      return H3.getChildContext && (n3 = Object.assign({}, n3, H3.getChildContext())), l.diffed && l.diffed(r4), S3(A4, n3, l4, false !== l4.shallowHighOrder, u4, v4);
    }
    w4 = k4(w4);
  }
  var T4, $3, D2 = "<" + w4;
  if (C3) {
    var P3 = Object.keys(C3);
    l4 && true === l4.sortAttributes && P3.sort();
    for (var W2 = 0; W2 < P3.length; W2++) {
      var N3 = P3[W2], R2 = C3[N3];
      if ("children" !== N3) {
        if (!p3.test(N3) && (l4 && l4.allAttributes || "key" !== N3 && "ref" !== N3 && "__self" !== N3 && "__source" !== N3)) {
          if ("defaultValue" === N3)
            N3 = "value";
          else if ("defaultChecked" === N3)
            N3 = "checked";
          else if ("defaultSelected" === N3)
            N3 = "selected";
          else if ("className" === N3) {
            if (void 0 !== C3.class)
              continue;
            N3 = "class";
          } else
            u4 && d3.test(N3) && (N3 = N3.toLowerCase().replace(/^xlink:?/, "xlink:"));
          if ("htmlFor" === N3) {
            if (C3.for)
              continue;
            N3 = "for";
          }
          "style" === N3 && R2 && "object" == typeof R2 && (R2 = s3(R2)), "a" === N3[0] && "r" === N3[1] && "boolean" == typeof R2 && (R2 = String(R2));
          var I3 = l4.attributeHook && l4.attributeHook(N3, R2, n3, l4, O3);
          if (I3 || "" === I3)
            D2 += I3;
          else if ("dangerouslySetInnerHTML" === N3)
            $3 = R2 && R2.__html;
          else if ("textarea" === w4 && "value" === N3)
            T4 = R2;
          else if ((R2 || 0 === R2 || "" === R2) && "function" != typeof R2) {
            if (!(true !== R2 && "" !== R2 || (R2 = N3, l4 && l4.xml))) {
              D2 = D2 + " " + N3;
              continue;
            }
            if ("value" === N3) {
              if ("select" === w4) {
                v4 = R2;
                continue;
              }
              "option" === w4 && v4 == R2 && void 0 === C3.selected && (D2 += " selected");
            }
            D2 = D2 + " " + N3 + '="' + o3(R2) + '"';
          }
        }
      } else
        T4 = R2;
    }
  }
  if (h4) {
    var U2 = D2.replace(/\n\s*/, " ");
    U2 === D2 || ~U2.indexOf("\n") ? h4 && ~D2.indexOf("\n") && (D2 += "\n") : D2 = U2;
  }
  if (D2 += ">", p3.test(w4))
    throw new Error(w4 + " is not a valid HTML tag name in " + D2);
  var V2, q4 = _3.test(w4) || l4.voidElements && l4.voidElements.test(w4), z4 = [];
  if ($3)
    h4 && a3($3) && ($3 = "\n" + g5 + i3($3, g5)), D2 += $3;
  else if (null != T4 && f3(V2 = [], T4).length) {
    for (var Z2 = h4 && ~D2.indexOf("\n"), B3 = false, G2 = 0; G2 < V2.length; G2++) {
      var J2 = V2[G2];
      if (null != J2 && false !== J2) {
        var K2 = S3(J2, n3, l4, true, "svg" === w4 || "foreignObject" !== w4 && u4, v4);
        if (h4 && !Z2 && a3(K2) && (Z2 = true), K2)
          if (h4) {
            var Q2 = K2.length > 0 && "<" != K2[0];
            B3 && Q2 ? z4[z4.length - 1] += K2 : z4.push(K2), B3 = Q2;
          } else
            z4.push(K2);
      }
    }
    if (h4 && Z2)
      for (var X2 = z4.length; X2--; )
        z4[X2] = "\n" + g5 + i3(z4[X2], g5);
  }
  if (z4.length || $3)
    D2 += z4.join("");
  else if (l4 && l4.xml)
    return D2.substring(0, D2.length - 1) + " />";
  return !q4 || V2 || $3 ? (h4 && ~D2.indexOf("\n") && (D2 += "\n"), D2 = D2 + "</" + w4 + ">") : D2 = D2.replace(/>$/, " />"), D2;
}
function k4(e4) {
  return e4.displayName || e4 !== Function && e4.name || function(e5) {
    var t3 = (Function.prototype.toString.call(e5).match(/^\s*function\s+([^( ]+)/) || "")[1];
    if (!t3) {
      for (var r4 = -1, n3 = u3.length; n3--; )
        if (u3[n3] === e5) {
          r4 = n3;
          break;
        }
      r4 < 0 && (r4 = u3.push(e5) - 1), t3 = "UnnamedComponent" + r4;
    }
    return t3;
  }(e4);
}
y3.shallowRender = h3;

// ../../.yarn/global/cache/preact-npm-10.10.6-e3746adb94-9.zip/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
init_define_process();

// js/react-preact.ts
var currentIndex;
var currentComponent;
var currentHook = 0;
var EMPTY = [];
var oldBeforeDiff = l._diff;
var oldBeforeRender = l._render;
var oldAfterDiff = l.diffed;
var oldCommit = l._commit;
var oldBeforeUnmount = l.unmount;
l._diff = (vnode) => {
  if (vnode.type === p) {
    vnode._mask = "";
  } else if (typeof vnode.type === "function" && !vnode._mask) {
    const parentMask = vnode._parent && vnode._parent._mask ? vnode._parent._mask : "";
    const position = vnode._parent && vnode._parent._children ? vnode._parent._children.indexOf(vnode) : 0;
    vnode._mask = parentMask + position;
  } else if (!vnode._mask) {
    vnode._mask = vnode._parent._mask;
  }
  currentComponent = null;
  if (oldBeforeDiff)
    oldBeforeDiff(vnode);
};
function hash(str) {
  let i4 = 0, out = 11;
  while (i4 < str.length)
    out = 101 * out + str.charCodeAt(i4++) >>> 0;
  return out;
}
function getHookState(index, type) {
  if (l._hook) {
    l._hook(currentComponent, index, currentHook || type);
  }
  currentHook = 0;
  const hooks = currentComponent.__hooks || (currentComponent.__hooks = {
    _list: [],
    _pendingEffects: []
  });
  if (index >= hooks._list.length) {
    hooks._list.push({ _pendingValue: EMPTY });
  }
  return hooks._list[index];
}
function useId() {
  const state = getHookState(currentIndex++, 11);
  if (!state._value) {
    state._value = "P" + hash(currentComponent._vnode._mask + currentIndex);
  }
  return state._value;
}
var React = window.React = window.React || { ...preact_module_exports, ...compat_module_default, createPortal: V, SuspenseList: D, findDOMNode: on };
var { createContext } = React;
var { hydrate, render, unmountComponentAtNode } = React;
var react_preact_default = React;
var {
  createElement,
  cloneElement,
  createFactory,
  useInsertionEffect,
  unstable_batchedUpdates,
  createRef,
  useCallback,
  useContext,
  useDebugValue,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  lazy,
  Suspense,
  StrictMode,
  forwardRef,
  memo,
  Children,
  PureComponent,
  Component,
  version
} = React;

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/features/use-features.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/process.mjs
init_define_process();
var defaultEnvironment = "production";
var env = typeof define_process_default === "undefined" || define_process_default.env === void 0 ? defaultEnvironment : "development";

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/features/definitions.mjs
init_define_process();
var createDefinition = (propNames) => ({
  isEnabled: (props) => propNames.some((name) => !!props[name])
});
var featureDefinitions = {
  measureLayout: createDefinition(["layout", "layoutId", "drag"]),
  animation: createDefinition([
    "animate",
    "exit",
    "variants",
    "whileHover",
    "whileTap",
    "whileFocus",
    "whileDrag",
    "whileInView"
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
  inView: createDefinition([
    "whileInView",
    "onViewportEnter",
    "onViewportLeave"
  ])
};
function loadFeatures(features) {
  for (const key in features) {
    if (features[key] === null)
      continue;
    if (key === "projectionNodeConstructor") {
      featureDefinitions.projectionNodeConstructor = features[key];
    } else {
      featureDefinitions[key].Component = features[key];
    }
  }
}

// ../../.yarn/global/cache/hey-listen-npm-1.0.8-adb7dae9da-9.zip/node_modules/hey-listen/dist/hey-listen.es.js
init_define_process();
var warning = function() {
};
var invariant = function() {
};
if (true) {
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

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/context/LazyContext.mjs
init_define_process();
var LazyContext = createContext({ strict: false });

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/features/use-features.mjs
var featureNames = Object.keys(featureDefinitions);
var numFeatures = featureNames.length;
function useFeatures(props, visualElement2, preloadedFeatures) {
  const features = [];
  const lazyContext = useContext(LazyContext);
  if (!visualElement2)
    return null;
  if (env !== "production" && preloadedFeatures && lazyContext.strict) {
    invariant(false, "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.");
  }
  for (let i4 = 0; i4 < numFeatures; i4++) {
    const name = featureNames[i4];
    const { isEnabled, Component: Component2 } = featureDefinitions[name];
    if (isEnabled(props) && Component2) {
      features.push(createElement(Component2, Object.assign({ key: name }, props, { visualElement: visualElement2 })));
    }
  }
  return features;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs
init_define_process();
var MotionConfigContext = createContext({
  transformPagePoint: (p4) => p4,
  isStatic: false,
  reducedMotion: "never"
});

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/context/MotionContext/index.mjs
init_define_process();
var MotionContext = createContext({});
function useVisualElementContext() {
  return useContext(MotionContext).visualElement;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/context/PresenceContext.mjs
init_define_process();
var PresenceContext = createContext(null);

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/is-browser.mjs
init_define_process();
var isBrowser = typeof document !== "undefined";

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
var useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/use-reduced-motion.mjs
init_define_process();
var prefersReducedMotion = { current: null };
var hasDetected = false;
function initPrefersReducedMotion() {
  hasDetected = true;
  if (!isBrowser)
    return;
  if (window.matchMedia) {
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
    const setReducedMotionPreferences = () => prefersReducedMotion.current = motionMediaQuery.matches;
    motionMediaQuery.addListener(setReducedMotionPreferences);
    setReducedMotionPreferences();
  } else {
    prefersReducedMotion.current = false;
  }
}
function useReducedMotion() {
  !hasDetected && initPrefersReducedMotion();
  const [shouldReduceMotion] = useState(prefersReducedMotion.current);
  return shouldReduceMotion;
}
function useReducedMotionConfig() {
  const reducedMotionPreference = useReducedMotion();
  const { reducedMotion } = useContext(MotionConfigContext);
  if (reducedMotion === "never") {
    return false;
  } else if (reducedMotion === "always") {
    return true;
  } else {
    return reducedMotionPreference;
  }
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs
function useVisualElement(Component2, visualState, props, createVisualElement) {
  const lazyContext = useContext(LazyContext);
  const parent = useVisualElementContext();
  const presenceContext = useContext(PresenceContext);
  const shouldReduceMotion = useReducedMotionConfig();
  const visualElementRef = useRef(void 0);
  if (!createVisualElement)
    createVisualElement = lazyContext.renderer;
  if (!visualElementRef.current && createVisualElement) {
    visualElementRef.current = createVisualElement(Component2, {
      visualState,
      parent,
      props,
      presenceId: presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.id,
      blockInitialAnimation: (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.initial) === false,
      shouldReduceMotion
    });
  }
  const visualElement2 = visualElementRef.current;
  useIsomorphicLayoutEffect(() => {
    visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.syncRender();
  });
  useEffect(() => {
    var _a;
    (_a = visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.animationState) === null || _a === void 0 ? void 0 : _a.animateChanges();
  });
  useIsomorphicLayoutEffect(() => () => visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.notifyUnmount(), []);
  return visualElement2;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/is-ref-object.mjs
init_define_process();
function isRefObject(ref) {
  return typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
function useMotionRef(visualState, visualElement2, externalRef) {
  return useCallback(
    (instance) => {
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
    },
    [visualElement2]
  );
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/context/MotionContext/create.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/utils/variants.mjs
init_define_process();
function isVariantLabels(v4) {
  return Array.isArray(v4);
}
function isVariantLabel(v4) {
  return typeof v4 === "string" || isVariantLabels(v4);
}
function getCurrent(visualElement2) {
  const current = {};
  visualElement2.forEachValue((value, key) => current[key] = value.get());
  return current;
}
function getVelocity(visualElement2) {
  const velocity = {};
  visualElement2.forEachValue((value, key) => velocity[key] = value.getVelocity());
  return velocity;
}
function resolveVariantFromProps(props, definition, custom, currentValues = {}, currentVelocity = {}) {
  var _a;
  if (typeof definition === "function") {
    definition = definition(custom !== null && custom !== void 0 ? custom : props.custom, currentValues, currentVelocity);
  }
  if (typeof definition === "string") {
    definition = (_a = props.variants) === null || _a === void 0 ? void 0 : _a[definition];
  }
  if (typeof definition === "function") {
    definition = definition(custom !== null && custom !== void 0 ? custom : props.custom, currentValues, currentVelocity);
  }
  return definition;
}
function resolveVariant(visualElement2, definition, custom) {
  const props = visualElement2.getProps();
  return resolveVariantFromProps(props, definition, custom !== null && custom !== void 0 ? custom : props.custom, getCurrent(visualElement2), getVelocity(visualElement2));
}
function checkIfControllingVariants(props) {
  var _a;
  return typeof ((_a = props.animate) === null || _a === void 0 ? void 0 : _a.start) === "function" || isVariantLabel(props.initial) || isVariantLabel(props.animate) || isVariantLabel(props.whileHover) || isVariantLabel(props.whileDrag) || isVariantLabel(props.whileTap) || isVariantLabel(props.whileFocus) || isVariantLabel(props.exit);
}
function checkIfVariantNode(props) {
  return Boolean(checkIfControllingVariants(props) || props.variants);
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs
function getCurrentTreeVariants(props, context) {
  if (checkIfControllingVariants(props)) {
    const { initial, animate: animate4 } = props;
    return {
      initial: initial === false || isVariantLabel(initial) ? initial : void 0,
      animate: isVariantLabel(animate4) ? animate4 : void 0
    };
  }
  return props.inherit !== false ? context : {};
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/context/MotionContext/create.mjs
function useCreateMotionContext(props) {
  const { initial, animate: animate4 } = getCurrentTreeVariants(props, useContext(MotionContext));
  return useMemo(() => ({ initial, animate: animate4 }), [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate4)]);
}
function variantLabelsAsDependency(prop) {
  return Array.isArray(prop) ? prop.join(" ") : prop;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/node/id.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/use-constant.mjs
init_define_process();
function useConstant(init) {
  const ref = useRef(null);
  if (ref.current === null) {
    ref.current = init();
  }
  return ref.current;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/node/state.mjs
init_define_process();
var globalProjectionState = {
  hasAnimatedSinceResize: true,
  hasEverUpdated: false
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/node/id.mjs
var id = 1;
function useProjectionId() {
  return useConstant(() => {
    if (globalProjectionState.hasEverUpdated) {
      return id++;
    }
  });
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs
init_define_process();
var LayoutGroupContext = createContext({});

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/features/use-projection.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs
init_define_process();
var SwitchLayoutGroupContext = createContext({});

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/features/use-projection.mjs
function useProjection(projectionId, { layoutId, layout, drag: drag2, dragConstraints, layoutScroll }, visualElement2, ProjectionNodeConstructor) {
  var _a;
  const initialPromotionConfig = useContext(SwitchLayoutGroupContext);
  if (!ProjectionNodeConstructor || !visualElement2 || (visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.projection)) {
    return;
  }
  visualElement2.projection = new ProjectionNodeConstructor(projectionId, visualElement2.getLatestValues(), (_a = visualElement2.parent) === null || _a === void 0 ? void 0 : _a.projection);
  visualElement2.projection.setOptions({
    layoutId,
    layout,
    alwaysMeasureLayout: Boolean(drag2) || dragConstraints && isRefObject(dragConstraints),
    visualElement: visualElement2,
    scheduleRender: () => visualElement2.scheduleRender(),
    animationType: typeof layout === "string" ? layout : "both",
    initialPromotionConfig,
    layoutScroll
  });
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/utils/VisualElementHandler.mjs
init_define_process();
var VisualElementHandler = class extends react_preact_default.Component {
  getSnapshotBeforeUpdate() {
    this.updateProps();
    return null;
  }
  componentDidUpdate() {
  }
  updateProps() {
    const { visualElement: visualElement2, props } = this.props;
    if (visualElement2)
      visualElement2.setProps(props);
  }
  render() {
    return this.props.children;
  }
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/index.mjs
function createMotionComponent({ preloadedFeatures, createVisualElement, projectionNodeConstructor, useRender, useVisualState: useVisualState2, Component: Component2 }) {
  preloadedFeatures && loadFeatures(preloadedFeatures);
  function MotionComponent(props, externalRef) {
    const layoutId = useLayoutId(props);
    props = Object.assign(Object.assign({}, props), { layoutId });
    const config = useContext(MotionConfigContext);
    let features = null;
    const context = useCreateMotionContext(props);
    const projectionId = config.isStatic ? void 0 : useProjectionId();
    const visualState = useVisualState2(props, config.isStatic);
    if (!config.isStatic && isBrowser) {
      context.visualElement = useVisualElement(Component2, visualState, Object.assign(Object.assign({}, config), props), createVisualElement);
      useProjection(projectionId, props, context.visualElement, projectionNodeConstructor || featureDefinitions.projectionNodeConstructor);
      features = useFeatures(props, context.visualElement, preloadedFeatures);
    }
    return createElement(
      VisualElementHandler,
      { visualElement: context.visualElement, props: Object.assign(Object.assign({}, config), props) },
      features,
      createElement(MotionContext.Provider, { value: context }, useRender(Component2, props, projectionId, useMotionRef(visualState, context.visualElement, externalRef), visualState, config.isStatic, context.visualElement))
    );
  }
  return forwardRef(MotionComponent);
}
function useLayoutId({ layoutId }) {
  var _a;
  const layoutGroupId = (_a = useContext(LayoutGroupContext)) === null || _a === void 0 ? void 0 : _a.id;
  return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/motion-proxy.mjs
init_define_process();
function createMotionProxy(createConfig) {
  function custom(Component2, customMotionComponentConfig = {}) {
    return createMotionComponent(createConfig(Component2, customMotionComponentConfig));
  }
  if (typeof Proxy === "undefined") {
    return custom;
  }
  const componentCache = /* @__PURE__ */ new Map();
  return new Proxy(custom, {
    get: (_target, key) => {
      if (!componentCache.has(key)) {
        componentCache.set(key, custom(key));
      }
      return componentCache.get(key);
    }
  });
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/create-config.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/svg/lowercase-elements.mjs
init_define_process();
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

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs
function isSVGComponent(Component2) {
  if (typeof Component2 !== "string" || Component2.includes("-")) {
    return false;
  } else if (lowercaseSVGElements.indexOf(Component2) > -1 || /[A-Z]/.test(Component2)) {
    return true;
  }
  return false;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/use-render.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/html/use-props.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/styles/scale-correction.mjs
init_define_process();
var scaleCorrectors = {};
function addScaleCorrector(correctors) {
  Object.assign(scaleCorrectors, correctors);
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/html/utils/transform.mjs
init_define_process();
var transformAxes = ["", "X", "Y", "Z"];
var order = ["translate", "scale", "rotate", "skew"];
var transformProps = ["transformPerspective", "x", "y", "z"];
order.forEach((operationKey) => transformAxes.forEach((axesKey) => transformProps.push(operationKey + axesKey)));
function sortTransformProps(a5, b5) {
  return transformProps.indexOf(a5) - transformProps.indexOf(b5);
}
var transformPropSet = new Set(transformProps);
function isTransformProp(key) {
  return transformPropSet.has(key);
}
var transformOriginProps = /* @__PURE__ */ new Set(["originX", "originY", "originZ"]);
function isTransformOriginProp(key) {
  return transformOriginProps.has(key);
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs
function isForcedMotionValue(key, { layout, layoutId }) {
  return isTransformProp(key) || isTransformOriginProp(key) || (layout || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs
init_define_process();
var isMotionValue = (value) => {
  return Boolean(value !== null && typeof value === "object" && value.getVelocity);
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/html/utils/build-transform.mjs
init_define_process();
var translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
function buildTransform({ transform: transform2, transformKeys: transformKeys2 }, { enableHardwareAcceleration = true, allowTransformNone = true }, transformIsDefault, transformTemplate) {
  let transformString = "";
  transformKeys2.sort(sortTransformProps);
  let transformHasZ = false;
  const numTransformKeys = transformKeys2.length;
  for (let i4 = 0; i4 < numTransformKeys; i4++) {
    const key = transformKeys2[i4];
    transformString += `${translateAlias[key] || key}(${transform2[key]}) `;
    if (key === "z")
      transformHasZ = true;
  }
  if (!transformHasZ && enableHardwareAcceleration) {
    transformString += "translateZ(0)";
  }
  transformString = transformString.trim();
  if (transformTemplate) {
    transformString = transformTemplate(transform2, transformIsDefault ? "" : transformString);
  } else if (allowTransformNone && transformIsDefault) {
    transformString = "none";
  }
  return transformString;
}
function buildTransformOrigin({ originX = "50%", originY = "50%", originZ = 0 }) {
  return `${originX} ${originY} ${originZ}`;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/is-css-variable.mjs
init_define_process();
function isCSSVariable(key) {
  return key.startsWith("--");
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/get-as-type.mjs
init_define_process();
var getValueAsType = (value, type) => {
  return type && typeof value === "number" ? type.transform(value) : value;
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/number.mjs
init_define_process();

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/index.mjs
init_define_process();

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/numbers/index.mjs
init_define_process();

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/utils.mjs
init_define_process();
var clamp = (min, max) => (v4) => Math.max(Math.min(v4, max), min);
var sanitize = (v4) => v4 % 1 ? Number(v4.toFixed(5)) : v4;
var floatRegex = /(-)?([\d]*\.?[\d])+/g;
var colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi;
var singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
function isString(v4) {
  return typeof v4 === "string";
}

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/numbers/index.mjs
var number = {
  test: (v4) => typeof v4 === "number",
  parse: parseFloat,
  transform: (v4) => v4
};
var alpha = Object.assign(Object.assign({}, number), { transform: clamp(0, 1) });
var scale = Object.assign(Object.assign({}, number), { default: 1 });

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/numbers/units.mjs
init_define_process();
var createUnitType = (unit) => ({
  test: (v4) => isString(v4) && v4.endsWith(unit) && v4.split(" ").length === 1,
  parse: parseFloat,
  transform: (v4) => `${v4}${unit}`
});
var degrees = createUnitType("deg");
var percent = createUnitType("%");
var px = createUnitType("px");
var vh = createUnitType("vh");
var vw = createUnitType("vw");
var progressPercentage = Object.assign(Object.assign({}, percent), { parse: (v4) => percent.parse(v4) / 100, transform: (v4) => percent.transform(v4 * 100) });

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/color/hsla.mjs
init_define_process();

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/color/utils.mjs
init_define_process();
var isColorString = (type, testProp) => (v4) => {
  return Boolean(isString(v4) && singleColorRegex.test(v4) && v4.startsWith(type) || testProp && Object.prototype.hasOwnProperty.call(v4, testProp));
};
var splitColor = (aName, bName, cName) => (v4) => {
  if (!isString(v4))
    return v4;
  const [a5, b5, c5, alpha2] = v4.match(floatRegex);
  return {
    [aName]: parseFloat(a5),
    [bName]: parseFloat(b5),
    [cName]: parseFloat(c5),
    alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
  };
};

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/color/hsla.mjs
var hsla = {
  test: isColorString("hsl", "hue"),
  parse: splitColor("hue", "saturation", "lightness"),
  transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
    return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
  }
};

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/color/rgba.mjs
init_define_process();
var clampRgbUnit = clamp(0, 255);
var rgbUnit = Object.assign(Object.assign({}, number), { transform: (v4) => Math.round(clampRgbUnit(v4)) });
var rgba = {
  test: isColorString("rgb", "red"),
  parse: splitColor("red", "green", "blue"),
  transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/color/hex.mjs
init_define_process();
function parseHex(v4) {
  let r4 = "";
  let g5 = "";
  let b5 = "";
  let a5 = "";
  if (v4.length > 5) {
    r4 = v4.substr(1, 2);
    g5 = v4.substr(3, 2);
    b5 = v4.substr(5, 2);
    a5 = v4.substr(7, 2);
  } else {
    r4 = v4.substr(1, 1);
    g5 = v4.substr(2, 1);
    b5 = v4.substr(3, 1);
    a5 = v4.substr(4, 1);
    r4 += r4;
    g5 += g5;
    b5 += b5;
    a5 += a5;
  }
  return {
    red: parseInt(r4, 16),
    green: parseInt(g5, 16),
    blue: parseInt(b5, 16),
    alpha: a5 ? parseInt(a5, 16) / 255 : 1
  };
}
var hex = {
  test: isColorString("#"),
  parse: parseHex,
  transform: rgba.transform
};

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/color/index.mjs
init_define_process();
var color = {
  test: (v4) => rgba.test(v4) || hex.test(v4) || hsla.test(v4),
  parse: (v4) => {
    if (rgba.test(v4)) {
      return rgba.parse(v4);
    } else if (hsla.test(v4)) {
      return hsla.parse(v4);
    } else {
      return hex.parse(v4);
    }
  },
  transform: (v4) => {
    return isString(v4) ? v4 : v4.hasOwnProperty("red") ? rgba.transform(v4) : hsla.transform(v4);
  }
};

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/complex/index.mjs
init_define_process();
var colorToken = "${c}";
var numberToken = "${n}";
function test(v4) {
  var _a, _b, _c, _d;
  return isNaN(v4) && isString(v4) && ((_b = (_a = v4.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = v4.match(colorRegex)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0;
}
function analyse(v4) {
  if (typeof v4 === "number")
    v4 = `${v4}`;
  const values = [];
  let numColors = 0;
  const colors = v4.match(colorRegex);
  if (colors) {
    numColors = colors.length;
    v4 = v4.replace(colorRegex, colorToken);
    values.push(...colors.map(color.parse));
  }
  const numbers = v4.match(floatRegex);
  if (numbers) {
    v4 = v4.replace(floatRegex, numberToken);
    values.push(...numbers.map(number.parse));
  }
  return { values, numColors, tokenised: v4 };
}
function parse(v4) {
  return analyse(v4).values;
}
function createTransformer(v4) {
  const { values, numColors, tokenised } = analyse(v4);
  const numValues = values.length;
  return (v5) => {
    let output = tokenised;
    for (let i4 = 0; i4 < numValues; i4++) {
      output = output.replace(i4 < numColors ? colorToken : numberToken, i4 < numColors ? color.transform(v5[i4]) : sanitize(v5[i4]));
    }
    return output;
  };
}
var convertNumbersToZero = (v4) => typeof v4 === "number" ? 0 : v4;
function getAnimatableNone(v4) {
  const parsed = parse(v4);
  const transformer = createTransformer(v4);
  return transformer(parsed.map(convertNumbersToZero));
}
var complex = { test, parse, createTransformer, getAnimatableNone };

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/complex/filter.mjs
init_define_process();
var maxDefaults = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter(v4) {
  let [name, value] = v4.slice(0, -1).split("(");
  if (name === "drop-shadow")
    return v4;
  const [number2] = value.match(floatRegex) || [];
  if (!number2)
    return v4;
  const unit = value.replace(number2, "");
  let defaultValue = maxDefaults.has(name) ? 1 : 0;
  if (number2 !== value)
    defaultValue *= 100;
  return name + "(" + defaultValue + unit + ")";
}
var functionRegex = /([a-z-]*)\(.*?\)/g;
var filter = Object.assign(Object.assign({}, complex), { getAnimatableNone: (v4) => {
  const functions = v4.match(functionRegex);
  return functions ? functions.map(applyDefaultFilter).join(" ") : v4;
} });

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/type-int.mjs
init_define_process();
var int = Object.assign(Object.assign({}, number), { transform: Math.round });

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/number.mjs
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

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs
function buildHTMLStyles(state, latestValues, options, transformTemplate) {
  var _a;
  const { style: style2, vars, transform: transform2, transformKeys: transformKeys2, transformOrigin } = state;
  transformKeys2.length = 0;
  let hasTransform2 = false;
  let hasTransformOrigin = false;
  let transformIsNone = true;
  for (const key in latestValues) {
    const value = latestValues[key];
    if (isCSSVariable(key)) {
      vars[key] = value;
      continue;
    }
    const valueType = numberValueTypes[key];
    const valueAsType = getValueAsType(value, valueType);
    if (isTransformProp(key)) {
      hasTransform2 = true;
      transform2[key] = valueAsType;
      transformKeys2.push(key);
      if (!transformIsNone)
        continue;
      if (value !== ((_a = valueType.default) !== null && _a !== void 0 ? _a : 0))
        transformIsNone = false;
    } else if (isTransformOriginProp(key)) {
      transformOrigin[key] = valueAsType;
      hasTransformOrigin = true;
    } else {
      style2[key] = valueAsType;
    }
  }
  if (hasTransform2) {
    style2.transform = buildTransform(state, options, transformIsNone, transformTemplate);
  } else if (transformTemplate) {
    style2.transform = transformTemplate({}, "");
  } else if (!latestValues.transform && style2.transform) {
    style2.transform = "none";
  }
  if (hasTransformOrigin) {
    style2.transformOrigin = buildTransformOrigin(transformOrigin);
  }
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs
init_define_process();
var createHtmlRenderState = () => ({
  style: {},
  transform: {},
  transformKeys: [],
  transformOrigin: {},
  vars: {}
});

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/html/use-props.mjs
function copyRawValuesOnly(target, source, props) {
  for (const key in source) {
    if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
      target[key] = source[key];
    }
  }
}
function useInitialMotionValues({ transformTemplate }, visualState, isStatic) {
  return useMemo(() => {
    const state = createHtmlRenderState();
    buildHTMLStyles(state, visualState, { enableHardwareAcceleration: !isStatic }, transformTemplate);
    const { vars, style: style2 } = state;
    return Object.assign(Object.assign({}, vars), style2);
  }, [visualState]);
}
function useStyle(props, visualState, isStatic) {
  const styleProp = props.style || {};
  let style2 = {};
  copyRawValuesOnly(style2, styleProp, props);
  Object.assign(style2, useInitialMotionValues(props, visualState, isStatic));
  if (props.transformValues) {
    style2 = props.transformValues(style2);
  }
  return style2;
}
function useHTMLProps(props, visualState, isStatic) {
  const htmlProps = {};
  const style2 = useStyle(props, visualState, isStatic);
  if (Boolean(props.drag) && props.dragListener !== false) {
    htmlProps.draggable = false;
    style2.userSelect = style2.WebkitUserSelect = style2.WebkitTouchCallout = "none";
    style2.touchAction = props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`;
  }
  htmlProps.style = style2;
  return htmlProps;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs
init_define_process();
var validMotionProps = /* @__PURE__ */ new Set([
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
  "layoutDependency",
  "onLayoutAnimationStart",
  "onLayoutAnimationComplete",
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
  "dragSnapToOrigin",
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
  "whileHover",
  "whileInView",
  "onViewportEnter",
  "onViewportLeave",
  "viewport",
  "layoutScroll"
]);
function isValidMotionProp(key) {
  return validMotionProps.has(key);
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs
var shouldForward = (key) => !isValidMotionProp(key);
function loadExternalIsValidProp(isValidProp) {
  if (!isValidProp)
    return;
  shouldForward = (key) => key.startsWith("on") ? !isValidMotionProp(key) : isValidProp(key);
}
try {
  loadExternalIsValidProp(require_is_prop_valid_browser_cjs().default);
} catch (_a) {
}
function filterProps(props, isDom, forwardMotionProps) {
  const filteredProps = {};
  for (const key in props) {
    if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key) || props["draggable"] && key.startsWith("onDrag")) {
      filteredProps[key] = props[key];
    }
  }
  return filteredProps;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/svg/use-props.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs
init_define_process();

// ../../.yarn/global/cache/tslib-npm-2.4.0-9cb6dc5030-9.zip/node_modules/tslib/modules/index.js
init_define_process();
var import_tslib = __toESM(require_tslib(), 1);
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
  __classPrivateFieldSet,
  __classPrivateFieldIn
} = import_tslib.default;

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/transform-origin.mjs
init_define_process();
function calcOrigin(origin, offset, size) {
  return typeof origin === "string" ? origin : px.transform(offset + size * origin);
}
function calcSVGTransformOrigin(dimensions, originX, originY) {
  const pxOriginX = calcOrigin(originX, dimensions.x, dimensions.width);
  const pxOriginY = calcOrigin(originY, dimensions.y, dimensions.height);
  return `${pxOriginX} ${pxOriginY}`;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/path.mjs
init_define_process();
var dashKeys = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
};
var camelKeys = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function buildSVGPath(attrs, length2, spacing = 1, offset = 0, useDashCase = true) {
  attrs.pathLength = 1;
  const keys2 = useDashCase ? dashKeys : camelKeys;
  attrs[keys2.offset] = px.transform(-offset);
  const pathLength = px.transform(length2);
  const pathSpacing = px.transform(spacing);
  attrs[keys2.array] = `${pathLength} ${pathSpacing}`;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs
function buildSVGAttrs(state, _a, options, transformTemplate) {
  var { attrX, attrY, originX, originY, pathLength, pathSpacing = 1, pathOffset = 0 } = _a, latest = __rest(_a, ["attrX", "attrY", "originX", "originY", "pathLength", "pathSpacing", "pathOffset"]);
  buildHTMLStyles(state, latest, options, transformTemplate);
  state.attrs = state.style;
  state.style = {};
  const { attrs, style: style2, dimensions } = state;
  if (attrs.transform) {
    if (dimensions)
      style2.transform = attrs.transform;
    delete attrs.transform;
  }
  if (dimensions && (originX !== void 0 || originY !== void 0 || style2.transform)) {
    style2.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== void 0 ? originX : 0.5, originY !== void 0 ? originY : 0.5);
  }
  if (attrX !== void 0)
    attrs.x = attrX;
  if (attrY !== void 0)
    attrs.y = attrY;
  if (pathLength !== void 0) {
    buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
  }
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs
init_define_process();
var createSvgRenderState = () => Object.assign(Object.assign({}, createHtmlRenderState()), { attrs: {} });

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/svg/use-props.mjs
function useSVGProps(props, visualState) {
  const visualProps = useMemo(() => {
    const state = createSvgRenderState();
    buildSVGAttrs(state, visualState, { enableHardwareAcceleration: false }, props.transformTemplate);
    return Object.assign(Object.assign({}, state.attrs), { style: Object.assign({}, state.style) });
  }, [visualState]);
  if (props.style) {
    const rawStyles = {};
    copyRawValuesOnly(rawStyles, props.style, props);
    visualProps.style = Object.assign(Object.assign({}, rawStyles), visualProps.style);
  }
  return visualProps;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/use-render.mjs
function createUseRender(forwardMotionProps = false) {
  const useRender = (Component2, props, projectionId, ref, { latestValues }, isStatic) => {
    const useVisualProps = isSVGComponent(Component2) ? useSVGProps : useHTMLProps;
    const visualProps = useVisualProps(props, latestValues, isStatic);
    const filteredProps = filterProps(props, typeof Component2 === "string", forwardMotionProps);
    const elementProps = Object.assign(Object.assign(Object.assign({}, filteredProps), visualProps), { ref });
    if (projectionId) {
      elementProps["data-projection-id"] = projectionId;
    }
    return createElement(Component2, elementProps);
  };
  return useRender;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/svg/config-motion.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/render.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs
init_define_process();
var CAMEL_CASE_PATTERN = /([a-z])([A-Z])/g;
var REPLACE_TEMPLATE = "$1-$2";
var camelToDash = (str) => str.replace(CAMEL_CASE_PATTERN, REPLACE_TEMPLATE).toLowerCase();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/html/utils/render.mjs
init_define_process();
function renderHTML(element, { style: style2, vars }, styleProp, projection) {
  Object.assign(element.style, style2, projection && projection.getProjectionStyles(styleProp));
  for (const key in vars) {
    element.style.setProperty(key, vars[key]);
  }
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/camel-case-attrs.mjs
init_define_process();
var camelCaseAttributes = /* @__PURE__ */ new Set([
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
  "viewBox",
  "gradientTransform",
  "pathLength"
]);

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/render.mjs
function renderSVG(element, renderState, _styleProp, projection) {
  renderHTML(element, renderState, void 0, projection);
  for (const key in renderState.attrs) {
    element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
  }
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs
init_define_process();
function scrapeMotionValuesFromProps(props) {
  const { style: style2 } = props;
  const newValues = {};
  for (const key in style2) {
    if (isMotionValue(style2[key]) || isForcedMotionValue(key, props)) {
      newValues[key] = style2[key];
    }
  }
  return newValues;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps2(props) {
  const newValues = scrapeMotionValuesFromProps(props);
  for (const key in props) {
    if (isMotionValue(props[key])) {
      const targetKey = key === "x" || key === "y" ? "attr" + key.toUpperCase() : key;
      newValues[targetKey] = props[key];
    }
  }
  return newValues;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.mjs
init_define_process();
function isAnimationControls(v4) {
  return typeof v4 === "object" && typeof v4.start === "function";
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/value/utils/resolve-motion-value.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/resolve-value.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/animation/utils/is-keyframes-target.mjs
init_define_process();
var isKeyframesTarget = (v4) => {
  return Array.isArray(v4);
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/resolve-value.mjs
var isCustomValue = (v4) => {
  return Boolean(v4 && typeof v4 === "object" && v4.mix && v4.toValue);
};
var resolveFinalValueInKeyframes = (v4) => {
  return isKeyframesTarget(v4) ? v4[v4.length - 1] || 0 : v4;
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/value/utils/resolve-motion-value.mjs
function resolveMotionValue(value) {
  const unwrappedValue = isMotionValue(value) ? value.get() : value;
  return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs
function makeState({ scrapeMotionValuesFromProps: scrapeMotionValuesFromProps3, createRenderState, onMount }, props, context, presenceContext) {
  const state = {
    latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps3),
    renderState: createRenderState()
  };
  if (onMount) {
    state.mount = (instance) => onMount(props, instance, state);
  }
  return state;
}
var makeUseVisualState = (config) => (props, isStatic) => {
  const context = useContext(MotionContext);
  const presenceContext = useContext(PresenceContext);
  return isStatic ? makeState(config, props, context, presenceContext) : useConstant(() => makeState(config, props, context, presenceContext));
};
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
  const values = {};
  const blockInitialAnimation = (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.initial) === false;
  const motionValues = scrapeMotionValues(props);
  for (const key in motionValues) {
    values[key] = resolveMotionValue(motionValues[key]);
  }
  let { initial, animate: animate4 } = props;
  const isControllingVariants = checkIfControllingVariants(props);
  const isVariantNode = checkIfVariantNode(props);
  if (context && isVariantNode && !isControllingVariants && props.inherit !== false) {
    initial !== null && initial !== void 0 ? initial : initial = context.initial;
    animate4 !== null && animate4 !== void 0 ? animate4 : animate4 = context.animate;
  }
  const initialAnimationIsBlocked = blockInitialAnimation || initial === false;
  const variantToSet = initialAnimationIsBlocked ? animate4 : initial;
  if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
    const list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
    list.forEach((definition) => {
      const resolved = resolveVariantFromProps(props, definition);
      if (!resolved)
        return;
      const { transitionEnd, transition } = resolved, target = __rest(resolved, ["transitionEnd", "transition"]);
      for (const key in target) {
        let valueTarget = target[key];
        if (Array.isArray(valueTarget)) {
          const index = initialAnimationIsBlocked ? valueTarget.length - 1 : 0;
          valueTarget = valueTarget[index];
        }
        if (valueTarget !== null) {
          values[key] = valueTarget;
        }
      }
      for (const key in transitionEnd)
        values[key] = transitionEnd[key];
    });
  }
  return values;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/svg/config-motion.mjs
var svgMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2,
    createRenderState: createSvgRenderState,
    onMount: (props, instance, { renderState, latestValues }) => {
      try {
        renderState.dimensions = typeof instance.getBBox === "function" ? instance.getBBox() : instance.getBoundingClientRect();
      } catch (e4) {
        renderState.dimensions = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
      }
      buildSVGAttrs(renderState, latestValues, { enableHardwareAcceleration: false }, props.transformTemplate);
      renderSVG(instance, renderState);
    }
  })
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/html/config-motion.mjs
init_define_process();
var htmlMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps,
    createRenderState: createHtmlRenderState
  })
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/create-config.mjs
function createDomMotionConfig(Component2, { forwardMotionProps = false }, preloadedFeatures, createVisualElement, projectionNodeConstructor) {
  const baseConfig = isSVGComponent(Component2) ? svgMotionConfig : htmlMotionConfig;
  return Object.assign(Object.assign({}, baseConfig), {
    preloadedFeatures,
    useRender: createUseRender(forwardMotionProps),
    createVisualElement,
    projectionNodeConstructor,
    Component: Component2
  });
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/features/gestures.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/gestures/use-focus-gesture.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/utils/types.mjs
init_define_process();
var AnimationType;
(function(AnimationType2) {
  AnimationType2["Animate"] = "animate";
  AnimationType2["Hover"] = "whileHover";
  AnimationType2["Tap"] = "whileTap";
  AnimationType2["Drag"] = "whileDrag";
  AnimationType2["Focus"] = "whileFocus";
  AnimationType2["InView"] = "whileInView";
  AnimationType2["Exit"] = "exit";
})(AnimationType || (AnimationType = {}));

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/events/use-dom-event.mjs
init_define_process();
function addDomEvent(target, eventName, handler, options = { passive: true }) {
  target.addEventListener(eventName, handler, options);
  return () => target.removeEventListener(eventName, handler);
}
function useDomEvent(ref, eventName, handler, options) {
  useEffect(() => {
    const element = ref.current;
    if (handler && element) {
      return addDomEvent(element, eventName, handler, options);
    }
  }, [ref, eventName, handler, options]);
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/gestures/use-focus-gesture.mjs
function useFocusGesture({ whileFocus, visualElement: visualElement2 }) {
  const onFocus = () => {
    var _a;
    (_a = visualElement2.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Focus, true);
  };
  const onBlur = () => {
    var _a;
    (_a = visualElement2.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Focus, false);
  };
  useDomEvent(visualElement2, "focus", whileFocus ? onFocus : void 0);
  useDomEvent(visualElement2, "blur", whileFocus ? onBlur : void 0);
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/gestures/use-hover-gesture.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/gestures/utils/event-type.mjs
init_define_process();
function isMouseEvent(event) {
  if (typeof PointerEvent !== "undefined" && event instanceof PointerEvent) {
    return !!(event.pointerType === "mouse");
  }
  return event instanceof MouseEvent;
}
function isTouchEvent(event) {
  const hasTouches = !!event.touches;
  return hasTouches;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/events/use-pointer-event.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/events/event-info.mjs
init_define_process();
function filterPrimaryPointer(eventHandler) {
  return (event) => {
    const isMouseEvent2 = event instanceof MouseEvent;
    const isPrimaryPointer = !isMouseEvent2 || isMouseEvent2 && event.button === 0;
    if (isPrimaryPointer) {
      eventHandler(event);
    }
  };
}
var defaultPagePoint = { pageX: 0, pageY: 0 };
function pointFromTouch(e4, pointType = "page") {
  const primaryTouch = e4.touches[0] || e4.changedTouches[0];
  const point2 = primaryTouch || defaultPagePoint;
  return {
    x: point2[pointType + "X"],
    y: point2[pointType + "Y"]
  };
}
function pointFromMouse(point2, pointType = "page") {
  return {
    x: point2[pointType + "X"],
    y: point2[pointType + "Y"]
  };
}
function extractEventInfo(event, pointType = "page") {
  return {
    point: isTouchEvent(event) ? pointFromTouch(event, pointType) : pointFromMouse(event, pointType)
  };
}
var wrapHandler = (handler, shouldFilterPrimaryPointer = false) => {
  const listener = (event) => handler(event, extractEventInfo(event));
  return shouldFilterPrimaryPointer ? filterPrimaryPointer(listener) : listener;
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/events/utils.mjs
init_define_process();
var supportsPointerEvents = () => isBrowser && window.onpointerdown === null;
var supportsTouchEvents = () => isBrowser && window.ontouchstart === null;
var supportsMouseEvents = () => isBrowser && window.onmousedown === null;

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/events/use-pointer-event.mjs
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

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/gestures/drag/utils/lock.mjs
init_define_process();
function createLock(name) {
  let lock = null;
  return () => {
    const openLock = () => {
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
  let lock = false;
  if (drag2 === "y") {
    lock = globalVerticalLock();
  } else if (drag2 === "x") {
    lock = globalHorizontalLock();
  } else {
    const openHorizontal = globalHorizontalLock();
    const openVertical = globalVerticalLock();
    if (openHorizontal && openVertical) {
      lock = () => {
        openHorizontal();
        openVertical();
      };
    } else {
      if (openHorizontal)
        openHorizontal();
      if (openVertical)
        openVertical();
    }
  }
  return lock;
}
function isDragActive() {
  const openGestureLock = getGlobalLock(true);
  if (!openGestureLock)
    return true;
  openGestureLock();
  return false;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/gestures/use-hover-gesture.mjs
function createHoverEvent(visualElement2, isActive, callback) {
  return (event, info) => {
    var _a;
    if (!isMouseEvent(event) || isDragActive())
      return;
    (_a = visualElement2.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Hover, isActive);
    callback === null || callback === void 0 ? void 0 : callback(event, info);
  };
}
function useHoverGesture({ onHoverStart, onHoverEnd, whileHover, visualElement: visualElement2 }) {
  usePointerEvent(visualElement2, "pointerenter", onHoverStart || whileHover ? createHoverEvent(visualElement2, true, onHoverStart) : void 0, { passive: !onHoverStart });
  usePointerEvent(visualElement2, "pointerleave", onHoverEnd || whileHover ? createHoverEvent(visualElement2, false, onHoverEnd) : void 0, { passive: !onHoverEnd });
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/gestures/use-tap-gesture.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/gestures/utils/is-node-or-child.mjs
init_define_process();
var isNodeOrChild = (parent, child) => {
  if (!child) {
    return false;
  } else if (parent === child) {
    return true;
  } else {
    return isNodeOrChild(parent, child.parentElement);
  }
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/use-unmount-effect.mjs
init_define_process();
function useUnmountEffect(callback) {
  return useEffect(() => () => callback(), []);
}

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/index.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/index.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/utils/detect-animation-from-options.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/generators/spring.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/utils/find-spring.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/clamp.mjs
init_define_process();
var clamp2 = (min, max, v4) => Math.min(Math.max(v4, min), max);

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/utils/find-spring.mjs
var safeMin = 1e-3;
var minDuration = 0.01;
var maxDuration = 10;
var minDamping = 0.05;
var maxDamping = 1;
function findSpring({ duration = 800, bounce = 0.25, velocity = 0, mass = 1 }) {
  let envelope;
  let derivative;
  warning(duration <= maxDuration * 1e3, "Spring duration must be 10 seconds or less");
  let dampingRatio = 1 - bounce;
  dampingRatio = clamp2(minDamping, maxDamping, dampingRatio);
  duration = clamp2(minDuration, maxDuration, duration / 1e3);
  if (dampingRatio < 1) {
    envelope = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const a5 = exponentialDecay - velocity;
      const b5 = calcAngularFreq(undampedFreq2, dampingRatio);
      const c5 = Math.exp(-delta);
      return safeMin - a5 / b5 * c5;
    };
    derivative = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const d4 = delta * velocity + velocity;
      const e4 = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
      const f4 = Math.exp(-delta);
      const g5 = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
      const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
      return factor * ((d4 - e4) * f4) / g5;
    };
  } else {
    envelope = (undampedFreq2) => {
      const a5 = Math.exp(-undampedFreq2 * duration);
      const b5 = (undampedFreq2 - velocity) * duration + 1;
      return -safeMin + a5 * b5;
    };
    derivative = (undampedFreq2) => {
      const a5 = Math.exp(-undampedFreq2 * duration);
      const b5 = (velocity - undampedFreq2) * (duration * duration);
      return a5 * b5;
    };
  }
  const initialGuess = 5 / duration;
  const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
  duration = duration * 1e3;
  if (isNaN(undampedFreq)) {
    return {
      stiffness: 100,
      damping: 10,
      duration
    };
  } else {
    const stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
      duration
    };
  }
}
var rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
  let result = initialGuess;
  for (let i4 = 1; i4 < rootIterations; i4++) {
    result = result - envelope(result) / derivative(result);
  }
  return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/generators/spring.mjs
var durationKeys = ["duration", "bounce"];
var physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys2) {
  return keys2.some((key) => options[key] !== void 0);
}
function getSpringOptions(options) {
  let springOptions = Object.assign({ velocity: 0, stiffness: 100, damping: 10, mass: 1, isResolvedFromDuration: false }, options);
  if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
    const derived = findSpring(options);
    springOptions = Object.assign(Object.assign(Object.assign({}, springOptions), derived), { velocity: 0, mass: 1 });
    springOptions.isResolvedFromDuration = true;
  }
  return springOptions;
}
function spring(_a) {
  var { from = 0, to = 1, restSpeed = 2, restDelta } = _a, options = __rest(_a, ["from", "to", "restSpeed", "restDelta"]);
  const state = { done: false, value: from };
  let { stiffness, damping, mass, velocity, duration, isResolvedFromDuration } = getSpringOptions(options);
  let resolveSpring = zero;
  let resolveVelocity = zero;
  function createSpring() {
    const initialVelocity = velocity ? -(velocity / 1e3) : 0;
    const initialDelta = to - from;
    const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
    const undampedAngularFreq = Math.sqrt(stiffness / mass) / 1e3;
    if (restDelta === void 0) {
      restDelta = Math.min(Math.abs(to - from) / 100, 0.4);
    }
    if (dampingRatio < 1) {
      const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
      resolveSpring = (t3) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t3);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t3) + initialDelta * Math.cos(angularFreq * t3));
      };
      resolveVelocity = (t3) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t3);
        return dampingRatio * undampedAngularFreq * envelope * (Math.sin(angularFreq * t3) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq + initialDelta * Math.cos(angularFreq * t3)) - envelope * (Math.cos(angularFreq * t3) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) - angularFreq * initialDelta * Math.sin(angularFreq * t3));
      };
    } else if (dampingRatio === 1) {
      resolveSpring = (t3) => to - Math.exp(-undampedAngularFreq * t3) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t3);
    } else {
      const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
      resolveSpring = (t3) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t3);
        const freqForT = Math.min(dampedAngularFreq * t3, 300);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
      };
    }
  }
  createSpring();
  return {
    next: (t3) => {
      const current = resolveSpring(t3);
      if (!isResolvedFromDuration) {
        const currentVelocity = resolveVelocity(t3) * 1e3;
        const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
        const isBelowDisplacementThreshold = Math.abs(to - current) <= restDelta;
        state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
      } else {
        state.done = t3 >= duration;
      }
      state.value = state.done ? to : current;
      return state;
    },
    flipTarget: () => {
      velocity = -velocity;
      [from, to] = [to, from];
      createSpring();
    }
  };
}
spring.needsInterpolation = (a5, b5) => typeof a5 === "string" || typeof b5 === "string";
var zero = (_t) => 0;

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/generators/keyframes.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/interpolate.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/progress.mjs
init_define_process();
var progress = (from, to, value) => {
  const toFromDifference = to - from;
  return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/mix.mjs
init_define_process();
var mix = (from, to, progress3) => -progress3 * from + progress3 * to + from;

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/mix-color.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/hsla-to-rgba.mjs
init_define_process();
function hueToRgb(p4, q4, t3) {
  if (t3 < 0)
    t3 += 1;
  if (t3 > 1)
    t3 -= 1;
  if (t3 < 1 / 6)
    return p4 + (q4 - p4) * 6 * t3;
  if (t3 < 1 / 2)
    return q4;
  if (t3 < 2 / 3)
    return p4 + (q4 - p4) * (2 / 3 - t3) * 6;
  return p4;
}
function hslaToRgba({ hue, saturation, lightness, alpha: alpha2 }) {
  hue /= 360;
  saturation /= 100;
  lightness /= 100;
  let red = 0;
  let green = 0;
  let blue = 0;
  if (!saturation) {
    red = green = blue = lightness;
  } else {
    const q4 = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    const p4 = 2 * lightness - q4;
    red = hueToRgb(p4, q4, hue + 1 / 3);
    green = hueToRgb(p4, q4, hue);
    blue = hueToRgb(p4, q4, hue - 1 / 3);
  }
  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha: alpha2
  };
}

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/mix-color.mjs
var mixLinearColor = (from, to, v4) => {
  const fromExpo = from * from;
  const toExpo = to * to;
  return Math.sqrt(Math.max(0, v4 * (toExpo - fromExpo) + fromExpo));
};
var colorTypes = [hex, rgba, hsla];
var getColorType = (v4) => colorTypes.find((type) => type.test(v4));
var notAnimatable = (color2) => `'${color2}' is not an animatable color. Use the equivalent color code instead.`;
var mixColor = (from, to) => {
  let fromColorType = getColorType(from);
  let toColorType = getColorType(to);
  invariant(!!fromColorType, notAnimatable(from));
  invariant(!!toColorType, notAnimatable(to));
  let fromColor = fromColorType.parse(from);
  let toColor = toColorType.parse(to);
  if (fromColorType === hsla) {
    fromColor = hslaToRgba(fromColor);
    fromColorType = rgba;
  }
  if (toColorType === hsla) {
    toColor = hslaToRgba(toColor);
    toColorType = rgba;
  }
  const blended = Object.assign({}, fromColor);
  return (v4) => {
    for (const key in blended) {
      if (key !== "alpha") {
        blended[key] = mixLinearColor(fromColor[key], toColor[key], v4);
      }
    }
    blended.alpha = mix(fromColor.alpha, toColor.alpha, v4);
    return fromColorType.transform(blended);
  };
};

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/mix-complex.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/inc.mjs
init_define_process();
var isNum = (v4) => typeof v4 === "number";

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/pipe.mjs
init_define_process();
var combineFunctions = (a5, b5) => (v4) => b5(a5(v4));
var pipe = (...transformers) => transformers.reduce(combineFunctions);

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/mix-complex.mjs
function getMixer(origin, target) {
  if (isNum(origin)) {
    return (v4) => mix(origin, target, v4);
  } else if (color.test(origin)) {
    return mixColor(origin, target);
  } else {
    return mixComplex(origin, target);
  }
}
var mixArray = (from, to) => {
  const output = [...from];
  const numValues = output.length;
  const blendValue = from.map((fromThis, i4) => getMixer(fromThis, to[i4]));
  return (v4) => {
    for (let i4 = 0; i4 < numValues; i4++) {
      output[i4] = blendValue[i4](v4);
    }
    return output;
  };
};
var mixObject = (origin, target) => {
  const output = Object.assign(Object.assign({}, origin), target);
  const blendValue = {};
  for (const key in output) {
    if (origin[key] !== void 0 && target[key] !== void 0) {
      blendValue[key] = getMixer(origin[key], target[key]);
    }
  }
  return (v4) => {
    for (const key in blendValue) {
      output[key] = blendValue[key](v4);
    }
    return output;
  };
};
function analyse2(value) {
  const parsed = complex.parse(value);
  const numValues = parsed.length;
  let numNumbers = 0;
  let numRGB = 0;
  let numHSL = 0;
  for (let i4 = 0; i4 < numValues; i4++) {
    if (numNumbers || typeof parsed[i4] === "number") {
      numNumbers++;
    } else {
      if (parsed[i4].hue !== void 0) {
        numHSL++;
      } else {
        numRGB++;
      }
    }
  }
  return { parsed, numNumbers, numRGB, numHSL };
}
var mixComplex = (origin, target) => {
  const template = complex.createTransformer(target);
  const originStats = analyse2(origin);
  const targetStats = analyse2(target);
  const canInterpolate = originStats.numHSL === targetStats.numHSL && originStats.numRGB === targetStats.numRGB && originStats.numNumbers >= targetStats.numNumbers;
  if (canInterpolate) {
    return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
  } else {
    warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`);
    return (p4) => `${p4 > 0 ? target : origin}`;
  }
};

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/interpolate.mjs
var mixNumber = (from, to) => (p4) => mix(from, to, p4);
function detectMixerFactory(v4) {
  if (typeof v4 === "number") {
    return mixNumber;
  } else if (typeof v4 === "string") {
    if (color.test(v4)) {
      return mixColor;
    } else {
      return mixComplex;
    }
  } else if (Array.isArray(v4)) {
    return mixArray;
  } else if (typeof v4 === "object") {
    return mixObject;
  }
}
function createMixers(output, ease, customMixer) {
  const mixers = [];
  const mixerFactory = customMixer || detectMixerFactory(output[0]);
  const numMixers = output.length - 1;
  for (let i4 = 0; i4 < numMixers; i4++) {
    let mixer = mixerFactory(output[i4], output[i4 + 1]);
    if (ease) {
      const easingFunction = Array.isArray(ease) ? ease[i4] : ease;
      mixer = pipe(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
function fastInterpolate([from, to], [mixer]) {
  return (v4) => mixer(progress(from, to, v4));
}
function slowInterpolate(input, mixers) {
  const inputLength = input.length;
  const lastInputIndex = inputLength - 1;
  return (v4) => {
    let mixerIndex = 0;
    let foundMixerIndex = false;
    if (v4 <= input[0]) {
      foundMixerIndex = true;
    } else if (v4 >= input[lastInputIndex]) {
      mixerIndex = lastInputIndex - 1;
      foundMixerIndex = true;
    }
    if (!foundMixerIndex) {
      let i4 = 1;
      for (; i4 < inputLength; i4++) {
        if (input[i4] > v4 || i4 === lastInputIndex) {
          break;
        }
      }
      mixerIndex = i4 - 1;
    }
    const progressInRange = progress(input[mixerIndex], input[mixerIndex + 1], v4);
    return mixers[mixerIndex](progressInRange);
  };
}
function interpolate(input, output, { clamp: isClamp = true, ease, mixer } = {}) {
  const inputLength = input.length;
  invariant(inputLength === output.length, "Both input and output ranges must be the same length");
  invariant(!ease || !Array.isArray(ease) || ease.length === inputLength - 1, "Array of easing functions must be of length `input.length - 1`, as it applies to the transitions **between** the defined values.");
  if (input[0] > input[inputLength - 1]) {
    input = [].concat(input);
    output = [].concat(output);
    input.reverse();
    output.reverse();
  }
  const mixers = createMixers(output, ease, mixer);
  const interpolator = inputLength === 2 ? fastInterpolate(input, mixers) : slowInterpolate(input, mixers);
  return isClamp ? (v4) => interpolator(clamp2(input[0], input[inputLength - 1], v4)) : interpolator;
}

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/easing/index.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/easing/utils.mjs
init_define_process();
var reverseEasing = (easing) => (p4) => 1 - easing(1 - p4);
var mirrorEasing = (easing) => (p4) => p4 <= 0.5 ? easing(2 * p4) / 2 : (2 - easing(2 * (1 - p4))) / 2;
var createExpoIn = (power) => (p4) => Math.pow(p4, power);
var createBackIn = (power) => (p4) => p4 * p4 * ((power + 1) * p4 - power);
var createAnticipate = (power) => {
  const backEasing = createBackIn(power);
  return (p4) => (p4 *= 2) < 1 ? 0.5 * backEasing(p4) : 0.5 * (2 - Math.pow(2, -10 * (p4 - 1)));
};

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/easing/index.mjs
var DEFAULT_OVERSHOOT_STRENGTH = 1.525;
var BOUNCE_FIRST_THRESHOLD = 4 / 11;
var BOUNCE_SECOND_THRESHOLD = 8 / 11;
var BOUNCE_THIRD_THRESHOLD = 9 / 10;
var linear = (p4) => p4;
var easeIn = createExpoIn(2);
var easeOut = reverseEasing(easeIn);
var easeInOut = mirrorEasing(easeIn);
var circIn = (p4) => 1 - Math.sin(Math.acos(p4));
var circOut = reverseEasing(circIn);
var circInOut = mirrorEasing(circOut);
var backIn = createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
var backOut = reverseEasing(backIn);
var backInOut = mirrorEasing(backIn);
var anticipate = createAnticipate(DEFAULT_OVERSHOOT_STRENGTH);
var ca = 4356 / 361;
var cb = 35442 / 1805;
var cc = 16061 / 1805;
var bounceOut = (p4) => {
  if (p4 === 1 || p4 === 0)
    return p4;
  const p22 = p4 * p4;
  return p4 < BOUNCE_FIRST_THRESHOLD ? 7.5625 * p22 : p4 < BOUNCE_SECOND_THRESHOLD ? 9.075 * p22 - 9.9 * p4 + 3.4 : p4 < BOUNCE_THIRD_THRESHOLD ? ca * p22 - cb * p4 + cc : 10.8 * p4 * p4 - 20.52 * p4 + 10.72;
};
var bounceIn = reverseEasing(bounceOut);
var bounceInOut = (p4) => p4 < 0.5 ? 0.5 * (1 - bounceOut(1 - p4 * 2)) : 0.5 * bounceOut(p4 * 2 - 1) + 0.5;

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/generators/keyframes.mjs
function defaultEasing(values, easing) {
  return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function defaultOffset(values) {
  const numValues = values.length;
  return values.map((_value, i4) => i4 !== 0 ? i4 / (numValues - 1) : 0);
}
function convertOffsetToTimes(offset, duration) {
  return offset.map((o4) => o4 * duration);
}
function keyframes({ from = 0, to = 1, ease, offset, duration = 300 }) {
  const state = { done: false, value: from };
  const values = Array.isArray(to) ? to : [from, to];
  const times = convertOffsetToTimes(offset && offset.length === values.length ? offset : defaultOffset(values), duration);
  function createInterpolator() {
    return interpolate(times, values, {
      ease: Array.isArray(ease) ? ease : defaultEasing(values, ease)
    });
  }
  let interpolator = createInterpolator();
  return {
    next: (t3) => {
      state.value = interpolator(t3);
      state.done = t3 >= duration;
      return state;
    },
    flipTarget: () => {
      values.reverse();
      interpolator = createInterpolator();
    }
  };
}

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/generators/decay.mjs
init_define_process();
function decay({ velocity = 0, from = 0, power = 0.8, timeConstant = 350, restDelta = 0.5, modifyTarget }) {
  const state = { done: false, value: from };
  let amplitude = power * velocity;
  const ideal = from + amplitude;
  const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
  if (target !== ideal)
    amplitude = target - from;
  return {
    next: (t3) => {
      const delta = -amplitude * Math.exp(-t3 / timeConstant);
      state.done = !(delta > restDelta || delta < -restDelta);
      state.value = state.done ? target : target + delta;
      return state;
    },
    flipTarget: () => {
    }
  };
}

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/utils/detect-animation-from-options.mjs
var types = { keyframes, spring, decay };
function detectAnimationFromOptions(config) {
  if (Array.isArray(config.to)) {
    return keyframes;
  } else if (types[config.type]) {
    return types[config.type];
  }
  const keys2 = new Set(Object.keys(config));
  if (keys2.has("ease") || keys2.has("duration") && !keys2.has("dampingRatio")) {
    return keyframes;
  } else if (keys2.has("dampingRatio") || keys2.has("stiffness") || keys2.has("mass") || keys2.has("damping") || keys2.has("restSpeed") || keys2.has("restDelta")) {
    return spring;
  }
  return keyframes;
}

// ../../.yarn/global/cache/framesync-npm-6.1.2-3eeffdf40f-9.zip/node_modules/framesync/dist/es/index.mjs
init_define_process();

// ../../.yarn/global/cache/framesync-npm-6.1.2-3eeffdf40f-9.zip/node_modules/framesync/dist/es/on-next-frame.mjs
init_define_process();
var defaultTimestep = 1 / 60 * 1e3;
var getCurrentTime = typeof performance !== "undefined" ? () => performance.now() : () => Date.now();
var onNextFrame = typeof window !== "undefined" ? (callback) => window.requestAnimationFrame(callback) : (callback) => setTimeout(() => callback(getCurrentTime()), defaultTimestep);

// ../../.yarn/global/cache/framesync-npm-6.1.2-3eeffdf40f-9.zip/node_modules/framesync/dist/es/create-render-step.mjs
init_define_process();
function createRenderStep(runNextFrame2) {
  let toRun = [];
  let toRunNextFrame = [];
  let numToRun = 0;
  let isProcessing2 = false;
  let flushNextFrame = false;
  const toKeepAlive = /* @__PURE__ */ new WeakSet();
  const step = {
    schedule: (callback, keepAlive = false, immediate = false) => {
      const addToCurrentFrame = immediate && isProcessing2;
      const buffer = addToCurrentFrame ? toRun : toRunNextFrame;
      if (keepAlive)
        toKeepAlive.add(callback);
      if (buffer.indexOf(callback) === -1) {
        buffer.push(callback);
        if (addToCurrentFrame && isProcessing2)
          numToRun = toRun.length;
      }
      return callback;
    },
    cancel: (callback) => {
      const index = toRunNextFrame.indexOf(callback);
      if (index !== -1)
        toRunNextFrame.splice(index, 1);
      toKeepAlive.delete(callback);
    },
    process: (frameData) => {
      if (isProcessing2) {
        flushNextFrame = true;
        return;
      }
      isProcessing2 = true;
      [toRun, toRunNextFrame] = [toRunNextFrame, toRun];
      toRunNextFrame.length = 0;
      numToRun = toRun.length;
      if (numToRun) {
        for (let i4 = 0; i4 < numToRun; i4++) {
          const callback = toRun[i4];
          callback(frameData);
          if (toKeepAlive.has(callback)) {
            step.schedule(callback);
            runNextFrame2();
          }
        }
      }
      isProcessing2 = false;
      if (flushNextFrame) {
        flushNextFrame = false;
        step.process(frameData);
      }
    }
  };
  return step;
}

// ../../.yarn/global/cache/framesync-npm-6.1.2-3eeffdf40f-9.zip/node_modules/framesync/dist/es/index.mjs
var maxElapsed = 40;
var useDefaultElapsed = true;
var runNextFrame = false;
var isProcessing = false;
var frame = {
  delta: 0,
  timestamp: 0
};
var stepsOrder = [
  "read",
  "update",
  "preRender",
  "render",
  "postRender"
];
var steps = stepsOrder.reduce((acc, key) => {
  acc[key] = createRenderStep(() => runNextFrame = true);
  return acc;
}, {});
var sync = stepsOrder.reduce((acc, key) => {
  const step = steps[key];
  acc[key] = (process2, keepAlive = false, immediate = false) => {
    if (!runNextFrame)
      startLoop();
    return step.schedule(process2, keepAlive, immediate);
  };
  return acc;
}, {});
var cancelSync = stepsOrder.reduce((acc, key) => {
  acc[key] = steps[key].cancel;
  return acc;
}, {});
var flushSync = stepsOrder.reduce((acc, key) => {
  acc[key] = () => steps[key].process(frame);
  return acc;
}, {});
var processStep = (stepId) => steps[stepId].process(frame);
var processFrame = (timestamp) => {
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
var startLoop = () => {
  runNextFrame = true;
  useDefaultElapsed = true;
  if (!isProcessing)
    onNextFrame(processFrame);
};
var getFrameData = () => frame;
var es_default = sync;

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/utils/elapsed.mjs
init_define_process();
function loopElapsed(elapsed, duration, delay = 0) {
  return elapsed - duration - delay;
}
function reverseElapsed(elapsed, duration, delay = 0, isForwardPlayback = true) {
  return isForwardPlayback ? loopElapsed(duration + -elapsed, duration, delay) : duration - (elapsed - duration) + delay;
}
function hasRepeatDelayElapsed(elapsed, duration, delay, isForwardPlayback) {
  return isForwardPlayback ? elapsed >= duration + delay : elapsed <= -delay;
}

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/index.mjs
var framesync = (update) => {
  const passTimestamp = ({ delta }) => update(delta);
  return {
    start: () => es_default.update(passTimestamp, true),
    stop: () => cancelSync.update(passTimestamp)
  };
};
function animate(_a) {
  var _b, _c;
  var { from, autoplay = true, driver = framesync, elapsed = 0, repeat: repeatMax = 0, repeatType = "loop", repeatDelay = 0, onPlay, onStop, onComplete, onRepeat, onUpdate } = _a, options = __rest(_a, ["from", "autoplay", "driver", "elapsed", "repeat", "repeatType", "repeatDelay", "onPlay", "onStop", "onComplete", "onRepeat", "onUpdate"]);
  let { to } = options;
  let driverControls;
  let repeatCount = 0;
  let computedDuration = options.duration;
  let latest;
  let isComplete = false;
  let isForwardPlayback = true;
  let interpolateFromNumber;
  const animator = detectAnimationFromOptions(options);
  if ((_c = (_b = animator).needsInterpolation) === null || _c === void 0 ? void 0 : _c.call(_b, from, to)) {
    interpolateFromNumber = interpolate([0, 100], [from, to], {
      clamp: false
    });
    from = 0;
    to = 100;
  }
  const animation = animator(Object.assign(Object.assign({}, options), { from, to }));
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
  function update(delta) {
    if (!isForwardPlayback)
      delta = -delta;
    elapsed += delta;
    if (!isComplete) {
      const state = animation.next(Math.max(0, elapsed));
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
    stop: () => {
      onStop === null || onStop === void 0 ? void 0 : onStop();
      driverControls.stop();
    }
  };
}

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/inertia.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/velocity-per-second.mjs
init_define_process();
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/inertia.mjs
function inertia({ from = 0, velocity = 0, min, max, power = 0.8, timeConstant = 750, bounceStiffness = 500, bounceDamping = 10, restDelta = 1, modifyTarget, driver, onUpdate, onComplete, onStop }) {
  let currentAnimation;
  function isOutOfBounds(v4) {
    return min !== void 0 && v4 < min || max !== void 0 && v4 > max;
  }
  function boundaryNearest(v4) {
    if (min === void 0)
      return max;
    if (max === void 0)
      return min;
    return Math.abs(min - v4) < Math.abs(max - v4) ? min : max;
  }
  function startAnimation2(options) {
    currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
    currentAnimation = animate(Object.assign(Object.assign({}, options), {
      driver,
      onUpdate: (v4) => {
        var _a;
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(v4);
        (_a = options.onUpdate) === null || _a === void 0 ? void 0 : _a.call(options, v4);
      },
      onComplete,
      onStop
    }));
  }
  function startSpring(options) {
    startAnimation2(Object.assign({ type: "spring", stiffness: bounceStiffness, damping: bounceDamping, restDelta }, options));
  }
  if (isOutOfBounds(from)) {
    startSpring({ from, velocity, to: boundaryNearest(from) });
  } else {
    let target = power * velocity + from;
    if (typeof modifyTarget !== "undefined")
      target = modifyTarget(target);
    const boundary = boundaryNearest(target);
    const heading = boundary === min ? -1 : 1;
    let prev;
    let current;
    const checkBoundary = (v4) => {
      prev = current;
      current = v4;
      velocity = velocityPerSecond(v4 - prev, getFrameData().delta);
      if (heading === 1 && v4 > boundary || heading === -1 && v4 < boundary) {
        startSpring({ from: v4, to: boundary, velocity });
      }
    };
    startAnimation2({
      type: "decay",
      from,
      velocity,
      timeConstant,
      power,
      restDelta,
      modifyTarget,
      onUpdate: isOutOfBounds(target) ? checkBoundary : void 0
    });
  }
  return {
    stop: () => currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop()
  };
}

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/angle.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/radians-to-degrees.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/apply-offset.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/attract.mjs
init_define_process();
var identity = (v4) => v4;
var createAttractor = (alterDisplacement = identity) => (constant, origin, v4) => {
  const displacement = origin - v4;
  const springModifiedDisplacement = -(0 - constant + 1) * (0 - alterDisplacement(Math.abs(displacement)));
  return displacement <= 0 ? origin + springModifiedDisplacement : origin - springModifiedDisplacement;
};
var attract = createAttractor();
var attractExpo = createAttractor(Math.sqrt);

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/degrees-to-radians.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/distance.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/is-point.mjs
init_define_process();
var isPoint = (point2) => point2.hasOwnProperty("x") && point2.hasOwnProperty("y");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/is-point-3d.mjs
init_define_process();
var isPoint3D = (point2) => isPoint(point2) && point2.hasOwnProperty("z");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/distance.mjs
var distance1D = (a5, b5) => Math.abs(a5 - b5);
function distance(a5, b5) {
  if (isNum(a5) && isNum(b5)) {
    return distance1D(a5, b5);
  } else if (isPoint(a5) && isPoint(b5)) {
    const xDelta = distance1D(a5.x, b5.x);
    const yDelta = distance1D(a5.y, b5.y);
    const zDelta = isPoint3D(a5) && isPoint3D(b5) ? distance1D(a5.z, b5.z) : 0;
    return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2) + Math.pow(zDelta, 2));
  }
}

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/point-from-vector.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/smooth-frame.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/to-decimal.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/smooth.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/snap.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/velocity-per-frame.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/wrap.mjs
init_define_process();
var wrap = (min, max, v4) => {
  const rangeSize = max - min;
  return ((v4 - min) % rangeSize + rangeSize) % rangeSize + min;
};

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/easing/cubic-bezier.mjs
init_define_process();
var a4 = (a1, a22) => 1 - 3 * a22 + 3 * a1;
var b4 = (a1, a22) => 3 * a22 - 6 * a1;
var c4 = (a1) => 3 * a1;
var calcBezier = (t3, a1, a22) => ((a4(a1, a22) * t3 + b4(a1, a22)) * t3 + c4(a1)) * t3;
var getSlope = (t3, a1, a22) => 3 * a4(a1, a22) * t3 * t3 + 2 * b4(a1, a22) * t3 + c4(a1);
var subdivisionPrecision = 1e-7;
var subdivisionMaxIterations = 10;
function binarySubdivide(aX, aA, aB, mX1, mX2) {
  let currentX;
  let currentT;
  let i4 = 0;
  do {
    currentT = aA + (aB - aA) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i4 < subdivisionMaxIterations);
  return currentT;
}
var newtonIterations = 8;
var newtonMinSlope = 1e-3;
function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
  for (let i4 = 0; i4 < newtonIterations; ++i4) {
    const currentSlope = getSlope(aGuessT, mX1, mX2);
    if (currentSlope === 0) {
      return aGuessT;
    }
    const currentX = calcBezier(aGuessT, mX1, mX2) - aX;
    aGuessT -= currentX / currentSlope;
  }
  return aGuessT;
}
var kSplineTableSize = 11;
var kSampleStepSize = 1 / (kSplineTableSize - 1);
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return linear;
  const sampleValues = new Float32Array(kSplineTableSize);
  for (let i4 = 0; i4 < kSplineTableSize; ++i4) {
    sampleValues[i4] = calcBezier(i4 * kSampleStepSize, mX1, mX2);
  }
  function getTForX(aX) {
    let intervalStart = 0;
    let currentSample = 1;
    const lastSample = kSplineTableSize - 1;
    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;
    const dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    const guessForT = intervalStart + dist * kSampleStepSize;
    const initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= newtonMinSlope) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }
  return (t3) => t3 === 0 || t3 === 1 ? t3 : calcBezier(getTForX(t3), mY1, mY2);
}

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/easing/steps.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/gestures/use-tap-gesture.mjs
function useTapGesture({ onTap, onTapStart, onTapCancel, whileTap, visualElement: visualElement2 }) {
  const hasPressListeners = onTap || onTapStart || onTapCancel || whileTap;
  const isPressing = useRef(false);
  const cancelPointerEndListeners = useRef(null);
  const eventOptions = {
    passive: !(onTapStart || onTap || onTapCancel || onPointerDown)
  };
  function removePointerEndListener() {
    var _a;
    (_a = cancelPointerEndListeners.current) === null || _a === void 0 ? void 0 : _a.call(cancelPointerEndListeners);
    cancelPointerEndListeners.current = null;
  }
  function checkPointerEnd() {
    var _a;
    removePointerEndListener();
    isPressing.current = false;
    (_a = visualElement2.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Tap, false);
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
    var _a;
    removePointerEndListener();
    if (isPressing.current)
      return;
    isPressing.current = true;
    cancelPointerEndListeners.current = pipe(addPointerEvent(window, "pointerup", onPointerUp, eventOptions), addPointerEvent(window, "pointercancel", onPointerCancel, eventOptions));
    (_a = visualElement2.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Tap, true);
    onTapStart === null || onTapStart === void 0 ? void 0 : onTapStart(event, info);
  }
  usePointerEvent(visualElement2, "pointerdown", hasPressListeners ? onPointerDown : void 0, eventOptions);
  useUnmountEffect(removePointerEndListener);
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/features/viewport/use-viewport.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/warn-once.mjs
init_define_process();
var warned = /* @__PURE__ */ new Set();
function warnOnce(condition, message, element) {
  if (condition || warned.has(message))
    return;
  console.warn(message);
  if (element)
    console.warn(element);
  warned.add(message);
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/features/viewport/observers.mjs
init_define_process();
var observerCallbacks = /* @__PURE__ */ new WeakMap();
var observers = /* @__PURE__ */ new WeakMap();
var fireObserverCallback = (entry) => {
  var _a;
  (_a = observerCallbacks.get(entry.target)) === null || _a === void 0 ? void 0 : _a(entry);
};
var fireAllObserverCallbacks = (entries) => {
  entries.forEach(fireObserverCallback);
};
function initIntersectionObserver(_a) {
  var { root } = _a, options = __rest(_a, ["root"]);
  const lookupRoot = root || document;
  if (!observers.has(lookupRoot)) {
    observers.set(lookupRoot, {});
  }
  const rootObservers = observers.get(lookupRoot);
  const key = JSON.stringify(options);
  if (!rootObservers[key]) {
    rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, Object.assign({ root }, options));
  }
  return rootObservers[key];
}
function observeIntersection(element, options, callback) {
  const rootInteresectionObserver = initIntersectionObserver(options);
  observerCallbacks.set(element, callback);
  rootInteresectionObserver.observe(element);
  return () => {
    observerCallbacks.delete(element);
    rootInteresectionObserver.unobserve(element);
  };
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/features/viewport/use-viewport.mjs
function useViewport({ visualElement: visualElement2, whileInView, onViewportEnter, onViewportLeave, viewport = {} }) {
  const state = useRef({
    hasEnteredView: false,
    isInView: false
  });
  let shouldObserve = Boolean(whileInView || onViewportEnter || onViewportLeave);
  if (viewport.once && state.current.hasEnteredView)
    shouldObserve = false;
  const useObserver = typeof IntersectionObserver === "undefined" ? useMissingIntersectionObserver : useIntersectionObserver;
  useObserver(shouldObserve, state.current, visualElement2, viewport);
}
var thresholdNames = {
  some: 0,
  all: 1
};
function useIntersectionObserver(shouldObserve, state, visualElement2, { root, margin: rootMargin, amount = "some", once }) {
  useEffect(() => {
    if (!shouldObserve)
      return;
    const options = {
      root: root === null || root === void 0 ? void 0 : root.current,
      rootMargin,
      threshold: typeof amount === "number" ? amount : thresholdNames[amount]
    };
    const intersectionCallback = (entry) => {
      var _a;
      const { isIntersecting } = entry;
      if (state.isInView === isIntersecting)
        return;
      state.isInView = isIntersecting;
      if (once && !isIntersecting && state.hasEnteredView) {
        return;
      } else if (isIntersecting) {
        state.hasEnteredView = true;
      }
      (_a = visualElement2.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.InView, isIntersecting);
      const props = visualElement2.getProps();
      const callback = isIntersecting ? props.onViewportEnter : props.onViewportLeave;
      callback === null || callback === void 0 ? void 0 : callback(entry);
    };
    return observeIntersection(visualElement2.getInstance(), options, intersectionCallback);
  }, [shouldObserve, root, rootMargin, amount]);
}
function useMissingIntersectionObserver(shouldObserve, state, visualElement2, { fallback = true }) {
  useEffect(() => {
    if (!shouldObserve || !fallback)
      return;
    if (env !== "production") {
      warnOnce(false, "IntersectionObserver not available on this device. whileInView animations will trigger on mount.");
    }
    requestAnimationFrame(() => {
      var _a;
      state.hasEnteredView = true;
      const { onViewportEnter } = visualElement2.getProps();
      onViewportEnter === null || onViewportEnter === void 0 ? void 0 : onViewportEnter(null);
      (_a = visualElement2.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.InView, true);
    });
  }, [shouldObserve]);
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/utils/make-renderless-component.mjs
init_define_process();
var makeRenderlessComponent = (hook) => (props) => {
  hook(props);
  return null;
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/features/gestures.mjs
var gestureAnimations = {
  inView: makeRenderlessComponent(useViewport),
  tap: makeRenderlessComponent(useTapGesture),
  focus: makeRenderlessComponent(useFocusGesture),
  hover: makeRenderlessComponent(useHoverGesture)
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/features/animations.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs
init_define_process();
function usePresence() {
  const context = useContext(PresenceContext);
  if (context === null)
    return [true, null];
  const { isPresent: isPresent2, onExitComplete, register } = context;
  const id3 = useId();
  useEffect(() => register(id3), []);
  const safeToRemove = () => onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete(id3);
  return !isPresent2 && onExitComplete ? [false, safeToRemove] : [true];
}
function useIsPresent() {
  return isPresent(useContext(PresenceContext));
}
function isPresent(context) {
  return context === null ? true : context.isPresent;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/utils/animation-state.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/shallow-compare.mjs
init_define_process();
function shallowCompare(next, prev) {
  if (!Array.isArray(prev))
    return false;
  const prevLength = prev.length;
  if (prevLength !== next.length)
    return false;
  for (let i4 = 0; i4 < prevLength; i4++) {
    if (prev[i4] !== next[i4])
      return false;
  }
  return true;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/utils/animation.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/animation/utils/transitions.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/time-conversion.mjs
init_define_process();
var secondsToMilliseconds = (seconds) => seconds * 1e3;

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/animation/utils/easing.mjs
init_define_process();
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
var easingDefinitionToFunction = (definition) => {
  if (Array.isArray(definition)) {
    invariant(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`);
    const [x1, y1, x22, y22] = definition;
    return cubicBezier(x1, y1, x22, y22);
  } else if (typeof definition === "string") {
    invariant(easingLookup[definition] !== void 0, `Invalid easing type '${definition}'`);
    return easingLookup[definition];
  }
  return definition;
};
var isEasingArray = (ease) => {
  return Array.isArray(ease) && typeof ease[0] !== "number";
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/animation/utils/is-animatable.mjs
init_define_process();
var isAnimatable = (key, value) => {
  if (key === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && complex.test(value) && !value.startsWith("url(")) {
    return true;
  }
  return false;
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/animation/utils/default-transitions.mjs
init_define_process();
var underDampedSpring = () => ({
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
});
var criticallyDampedSpring = (to) => ({
  type: "spring",
  stiffness: 550,
  damping: to === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
});
var linearTween = () => ({
  type: "keyframes",
  ease: "linear",
  duration: 0.3
});
var keyframes2 = (values) => ({
  type: "keyframes",
  duration: 0.8,
  values
});
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
var getDefaultTransition = (valueKey, to) => {
  let transitionFactory;
  if (isKeyframesTarget(to)) {
    transitionFactory = keyframes2;
  } else {
    transitionFactory = defaultTransitions[valueKey] || defaultTransitions.default;
  }
  return Object.assign({ to }, transitionFactory(to));
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/animatable-none.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/defaults.mjs
init_define_process();
var defaultValueTypes = Object.assign(Object.assign({}, numberValueTypes), {
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
var getDefaultValueType = (key) => defaultValueTypes[key];

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/animatable-none.mjs
function getAnimatableNone2(key, value) {
  var _a;
  let defaultValueType = getDefaultValueType(key);
  if (defaultValueType !== filter)
    defaultValueType = complex;
  return (_a = defaultValueType.getAnimatableNone) === null || _a === void 0 ? void 0 : _a.call(defaultValueType, value);
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/use-instant-transition-state.mjs
init_define_process();
var instantAnimationState = {
  current: false
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/animation/utils/transitions.mjs
function isTransitionDefined(_a) {
  var transition = __rest(_a, ["when", "delay", "delayChildren", "staggerChildren", "staggerDirection", "repeat", "repeatType", "repeatDelay", "from"]);
  return !!Object.keys(transition).length;
}
var legacyRepeatWarning = false;
function convertTransitionToAnimationOptions(_a) {
  var { ease, times, yoyo, flip, loop } = _a, transition = __rest(_a, ["ease", "times", "yoyo", "flip", "loop"]);
  const options = Object.assign({}, transition);
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
  var _a, _b;
  const valueTransition = getValueTransition(transition, key) || {};
  return (_b = (_a = valueTransition.delay) !== null && _a !== void 0 ? _a : transition.delay) !== null && _b !== void 0 ? _b : 0;
}
function hydrateKeyframes(options) {
  if (Array.isArray(options.to) && options.to[0] === null) {
    options.to = [...options.to];
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
    transition = Object.assign(Object.assign({}, transition), getDefaultTransition(key, options.to));
  }
  return Object.assign(Object.assign({}, options), convertTransitionToAnimationOptions(transition));
}
function getAnimation(key, value, target, transition, onComplete) {
  var _a;
  const valueTransition = getValueTransition(transition, key);
  let origin = (_a = valueTransition.from) !== null && _a !== void 0 ? _a : value.get();
  const isTargetAnimatable = isAnimatable(key, target);
  if (origin === "none" && isTargetAnimatable && typeof target === "string") {
    origin = getAnimatableNone2(key, target);
  } else if (isZero(origin) && typeof target === "string") {
    origin = getZeroUnit(target);
  } else if (!Array.isArray(target) && isZero(target) && typeof origin === "string") {
    target = getZeroUnit(origin);
  }
  const isOriginAnimatable = isAnimatable(key, origin);
  warning(isOriginAnimatable === isTargetAnimatable, `You are trying to animate ${key} from "${origin}" to "${target}". ${origin} is not an animatable value - to enable this animation set ${origin} to a value animatable to ${target} via the \`style\` property.`);
  function start() {
    const options = {
      from: origin,
      to: target,
      velocity: value.getVelocity(),
      onComplete,
      onUpdate: (v4) => value.set(v4)
    };
    return valueTransition.type === "inertia" || valueTransition.type === "decay" ? inertia(Object.assign(Object.assign({}, options), valueTransition)) : animate(Object.assign(Object.assign({}, getPopmotionAnimationOptions(valueTransition, options, key)), { onUpdate: (v4) => {
      var _a2;
      options.onUpdate(v4);
      (_a2 = valueTransition.onUpdate) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition, v4);
    }, onComplete: () => {
      var _a2;
      options.onComplete();
      (_a2 = valueTransition.onComplete) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition);
    } }));
  }
  function set() {
    var _a2, _b;
    const finalTarget = resolveFinalValueInKeyframes(target);
    value.set(finalTarget);
    onComplete();
    (_a2 = valueTransition === null || valueTransition === void 0 ? void 0 : valueTransition.onUpdate) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition, finalTarget);
    (_b = valueTransition === null || valueTransition === void 0 ? void 0 : valueTransition.onComplete) === null || _b === void 0 ? void 0 : _b.call(valueTransition);
    return { stop: () => {
    } };
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
function startAnimation(key, value, target, transition = {}) {
  if (instantAnimationState.current) {
    transition = { type: false };
  }
  return value.start((onComplete) => {
    let delayTimer;
    let controls;
    const animation = getAnimation(key, value, target, transition, onComplete);
    const delay = getDelayFromTransition(transition, key);
    const start = () => controls = animation();
    if (delay) {
      delayTimer = window.setTimeout(start, secondsToMilliseconds(delay));
    } else {
      start();
    }
    return () => {
      clearTimeout(delayTimer);
      controls === null || controls === void 0 ? void 0 : controls.stop();
    };
  });
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/utils/setters.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/is-numerical-string.mjs
init_define_process();
var isNumericalString = (v4) => /^\-?\d*\.?\d+$/.test(v4);

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/is-zero-value-string.mjs
init_define_process();
var isZeroValueString = (v4) => /^0[^.\s]+$/.test(v4);

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/value/index.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/subscription-manager.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/array.mjs
init_define_process();
function addUniqueItem(arr, item) {
  if (arr.indexOf(item) === -1)
    arr.push(item);
}
function removeItem(arr, item) {
  const index = arr.indexOf(item);
  if (index > -1)
    arr.splice(index, 1);
}
function moveItem([...arr], fromIndex, toIndex) {
  const startIndex = fromIndex < 0 ? arr.length + fromIndex : fromIndex;
  if (startIndex >= 0 && startIndex < arr.length) {
    const endIndex = toIndex < 0 ? arr.length + toIndex : toIndex;
    const [item] = arr.splice(fromIndex, 1);
    arr.splice(endIndex, 0, item);
  }
  return arr;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/subscription-manager.mjs
var SubscriptionManager = class {
  constructor() {
    this.subscriptions = [];
  }
  add(handler) {
    addUniqueItem(this.subscriptions, handler);
    return () => removeItem(this.subscriptions, handler);
  }
  notify(a5, b5, c5) {
    const numSubscriptions = this.subscriptions.length;
    if (!numSubscriptions)
      return;
    if (numSubscriptions === 1) {
      this.subscriptions[0](a5, b5, c5);
    } else {
      for (let i4 = 0; i4 < numSubscriptions; i4++) {
        const handler = this.subscriptions[i4];
        handler && handler(a5, b5, c5);
      }
    }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/value/index.mjs
var isFloat = (value) => {
  return !isNaN(parseFloat(value));
};
var MotionValue = class {
  constructor(init) {
    this.version = "7.2.0";
    this.timeDelta = 0;
    this.lastUpdated = 0;
    this.updateSubscribers = new SubscriptionManager();
    this.velocityUpdateSubscribers = new SubscriptionManager();
    this.renderSubscribers = new SubscriptionManager();
    this.canTrackVelocity = false;
    this.updateAndNotify = (v4, render2 = true) => {
      this.prev = this.current;
      this.current = v4;
      const { delta, timestamp } = getFrameData();
      if (this.lastUpdated !== timestamp) {
        this.timeDelta = delta;
        this.lastUpdated = timestamp;
        es_default.postRender(this.scheduleVelocityCheck);
      }
      if (this.prev !== this.current) {
        this.updateSubscribers.notify(this.current);
      }
      if (this.velocityUpdateSubscribers.getSize()) {
        this.velocityUpdateSubscribers.notify(this.getVelocity());
      }
      if (render2) {
        this.renderSubscribers.notify(this.current);
      }
    };
    this.scheduleVelocityCheck = () => es_default.postRender(this.velocityCheck);
    this.velocityCheck = ({ timestamp }) => {
      if (timestamp !== this.lastUpdated) {
        this.prev = this.current;
        this.velocityUpdateSubscribers.notify(this.getVelocity());
      }
    };
    this.hasAnimated = false;
    this.prev = this.current = init;
    this.canTrackVelocity = isFloat(this.current);
  }
  onChange(subscription) {
    return this.updateSubscribers.add(subscription);
  }
  clearListeners() {
    this.updateSubscribers.clear();
  }
  onRenderRequest(subscription) {
    subscription(this.get());
    return this.renderSubscribers.add(subscription);
  }
  attach(passiveEffect) {
    this.passiveEffect = passiveEffect;
  }
  set(v4, render2 = true) {
    if (!render2 || !this.passiveEffect) {
      this.updateAndNotify(v4, render2);
    } else {
      this.passiveEffect(v4, this.updateAndNotify);
    }
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    return this.canTrackVelocity ? velocityPerSecond(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta) : 0;
  }
  start(animation) {
    this.stop();
    return new Promise((resolve) => {
      this.hasAnimated = true;
      this.stopAnimation = animation(resolve);
    }).then(() => this.clearAnimation());
  }
  stop() {
    if (this.stopAnimation)
      this.stopAnimation();
    this.clearAnimation();
  }
  isAnimating() {
    return !!this.stopAnimation;
  }
  clearAnimation() {
    this.stopAnimation = null;
  }
  destroy() {
    this.updateSubscribers.clear();
    this.renderSubscribers.clear();
    this.stop();
  }
};
function motionValue(init) {
  return new MotionValue(init);
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/find.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/dimensions.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/test.mjs
init_define_process();
var testValueType = (v4) => (type) => type.test(v4);

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/type-auto.mjs
init_define_process();
var auto = {
  test: (v4) => v4 === "auto",
  parse: (v4) => v4
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/dimensions.mjs
var dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
var findDimensionValueType = (v4) => dimensionValueTypes.find(testValueType(v4));

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/find.mjs
var valueTypes = [...dimensionValueTypes, color, complex];
var findValueType = (v4) => valueTypes.find(testValueType(v4));

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/utils/setters.mjs
function setMotionValue(visualElement2, key, value) {
  if (visualElement2.hasValue(key)) {
    visualElement2.getValue(key).set(value);
  } else {
    visualElement2.addValue(key, motionValue(value));
  }
}
function setTarget(visualElement2, definition) {
  const resolved = resolveVariant(visualElement2, definition);
  let _a = resolved ? visualElement2.makeTargetAnimatable(resolved, false) : {}, { transitionEnd = {}, transition = {} } = _a, target = __rest(_a, ["transitionEnd", "transition"]);
  target = Object.assign(Object.assign({}, target), transitionEnd);
  for (const key in target) {
    const value = resolveFinalValueInKeyframes(target[key]);
    setMotionValue(visualElement2, key, value);
  }
}
function setVariants(visualElement2, variantLabels) {
  const reversedLabels = [...variantLabels].reverse();
  reversedLabels.forEach((key) => {
    var _a;
    const variant = visualElement2.getVariant(key);
    variant && setTarget(visualElement2, variant);
    (_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach((child) => {
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
  const newValueKeys = Object.keys(target).filter((key) => !visualElement2.hasValue(key));
  const numNewValues = newValueKeys.length;
  if (!numNewValues)
    return;
  for (let i4 = 0; i4 < numNewValues; i4++) {
    const key = newValueKeys[i4];
    const targetValue = target[key];
    let value = null;
    if (Array.isArray(targetValue)) {
      value = targetValue[0];
    }
    if (value === null) {
      value = (_b = (_a = origin[key]) !== null && _a !== void 0 ? _a : visualElement2.readValue(key)) !== null && _b !== void 0 ? _b : target[key];
    }
    if (value === void 0 || value === null)
      continue;
    if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) {
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
  const valueTransition = transition[key] || transition["default"] || transition;
  return valueTransition.from;
}
function getOrigin(target, transition, visualElement2) {
  var _a, _b;
  const origin = {};
  for (const key in target) {
    origin[key] = (_a = getOriginFromTransition(key, transition)) !== null && _a !== void 0 ? _a : (_b = visualElement2.getValue(key)) === null || _b === void 0 ? void 0 : _b.get();
  }
  return origin;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/value/use-will-change/is.mjs
init_define_process();
function isWillChangeMotionValue(value) {
  return Boolean(isMotionValue(value) && value.add);
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/utils/animation.mjs
function animateVisualElement(visualElement2, definition, options = {}) {
  visualElement2.notifyAnimationStart(definition);
  let animation;
  if (Array.isArray(definition)) {
    const animations2 = definition.map((variant) => animateVariant(visualElement2, variant, options));
    animation = Promise.all(animations2);
  } else if (typeof definition === "string") {
    animation = animateVariant(visualElement2, definition, options);
  } else {
    const resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement2, definition, options.custom) : definition;
    animation = animateTarget(visualElement2, resolvedDefinition, options);
  }
  return animation.then(() => visualElement2.notifyAnimationComplete(definition));
}
function animateVariant(visualElement2, variant, options = {}) {
  var _a;
  const resolved = resolveVariant(visualElement2, variant, options.custom);
  let { transition = visualElement2.getDefaultTransition() || {} } = resolved || {};
  if (options.transitionOverride) {
    transition = options.transitionOverride;
  }
  const getAnimation2 = resolved ? () => animateTarget(visualElement2, resolved, options) : () => Promise.resolve();
  const getChildAnimations = ((_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.size) ? (forwardDelay = 0) => {
    const { delayChildren = 0, staggerChildren, staggerDirection } = transition;
    return animateChildren(visualElement2, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
  } : () => Promise.resolve();
  const { when } = transition;
  if (when) {
    const [first, last] = when === "beforeChildren" ? [getAnimation2, getChildAnimations] : [getChildAnimations, getAnimation2];
    return first().then(last);
  } else {
    return Promise.all([getAnimation2(), getChildAnimations(options.delay)]);
  }
}
function animateTarget(visualElement2, definition, { delay = 0, transitionOverride, type } = {}) {
  var _a;
  let _b = visualElement2.makeTargetAnimatable(definition), { transition = visualElement2.getDefaultTransition(), transitionEnd } = _b, target = __rest(_b, ["transition", "transitionEnd"]);
  const willChange = visualElement2.getValue("willChange");
  if (transitionOverride)
    transition = transitionOverride;
  const animations2 = [];
  const animationTypeState = type && ((_a = visualElement2.animationState) === null || _a === void 0 ? void 0 : _a.getState()[type]);
  for (const key in target) {
    const value = visualElement2.getValue(key);
    const valueTarget = target[key];
    if (!value || valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
      continue;
    }
    let valueTransition = Object.assign({ delay }, transition);
    if (visualElement2.shouldReduceMotion && isTransformProp(key)) {
      valueTransition = Object.assign(Object.assign({}, valueTransition), { type: false, delay: 0 });
    }
    let animation = startAnimation(key, value, valueTarget, valueTransition);
    if (isWillChangeMotionValue(willChange)) {
      willChange.add(key);
      animation = animation.then(() => willChange.remove(key));
    }
    animations2.push(animation);
  }
  return Promise.all(animations2).then(() => {
    transitionEnd && setTarget(visualElement2, transitionEnd);
  });
}
function animateChildren(visualElement2, variant, delayChildren = 0, staggerChildren = 0, staggerDirection = 1, options) {
  const animations2 = [];
  const maxStaggerDuration = (visualElement2.variantChildren.size - 1) * staggerChildren;
  const generateStaggerDuration = staggerDirection === 1 ? (i4 = 0) => i4 * staggerChildren : (i4 = 0) => maxStaggerDuration - i4 * staggerChildren;
  Array.from(visualElement2.variantChildren).sort(sortByTreeOrder).forEach((child, i4) => {
    animations2.push(animateVariant(child, variant, Object.assign(Object.assign({}, options), { delay: delayChildren + generateStaggerDuration(i4) })).then(() => child.notifyAnimationComplete(variant)));
  });
  return Promise.all(animations2);
}
function stopAnimation(visualElement2) {
  visualElement2.forEachValue((value) => value.stop());
}
function sortByTreeOrder(a5, b5) {
  return a5.sortNodePosition(b5);
}
function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
  const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
  needsAnimating[key] = false;
  return shouldBlock;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/utils/animation-state.mjs
var variantPriorityOrder = [
  AnimationType.Animate,
  AnimationType.InView,
  AnimationType.Focus,
  AnimationType.Hover,
  AnimationType.Tap,
  AnimationType.Drag,
  AnimationType.Exit
];
var reversePriorityOrder = [...variantPriorityOrder].reverse();
var numAnimationTypes = variantPriorityOrder.length;
function animateList(visualElement2) {
  return (animations2) => Promise.all(animations2.map(({ animation, options }) => animateVisualElement(visualElement2, animation, options)));
}
function createAnimationState(visualElement2) {
  let animate4 = animateList(visualElement2);
  const state = createState();
  let isInitialRender = true;
  const buildResolvedTypeValues = (acc, definition) => {
    const resolved = resolveVariant(visualElement2, definition);
    if (resolved) {
      const { transition, transitionEnd } = resolved, target = __rest(resolved, ["transition", "transitionEnd"]);
      acc = Object.assign(Object.assign(Object.assign({}, acc), target), transitionEnd);
    }
    return acc;
  };
  function setAnimateFunction(makeAnimator) {
    animate4 = makeAnimator(visualElement2);
  }
  function animateChanges(options, changedActiveType) {
    var _a;
    const props = visualElement2.getProps();
    const context = visualElement2.getVariantContext(true) || {};
    const animations2 = [];
    const removedKeys = /* @__PURE__ */ new Set();
    let encounteredKeys = {};
    let removedVariantIndex = Infinity;
    for (let i4 = 0; i4 < numAnimationTypes; i4++) {
      const type = reversePriorityOrder[i4];
      const typeState = state[type];
      const prop = (_a = props[type]) !== null && _a !== void 0 ? _a : context[type];
      const propIsVariant = isVariantLabel(prop);
      const activeDelta = type === changedActiveType ? typeState.isActive : null;
      if (activeDelta === false)
        removedVariantIndex = i4;
      let isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
      if (isInherited && isInitialRender && visualElement2.manuallyAnimateOnMount) {
        isInherited = false;
      }
      typeState.protectedKeys = Object.assign({}, encounteredKeys);
      if (!typeState.isActive && activeDelta === null || !prop && !typeState.prevProp || isAnimationControls(prop) || typeof prop === "boolean") {
        continue;
      }
      const variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
      let shouldAnimateType = variantDidChange || type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || i4 > removedVariantIndex && propIsVariant;
      const definitionList = Array.isArray(prop) ? prop : [prop];
      let resolvedValues = definitionList.reduce(buildResolvedTypeValues, {});
      if (activeDelta === false)
        resolvedValues = {};
      const { prevResolvedValues = {} } = typeState;
      const allKeys = Object.assign(Object.assign({}, prevResolvedValues), resolvedValues);
      const markToAnimate = (key) => {
        shouldAnimateType = true;
        removedKeys.delete(key);
        typeState.needsAnimating[key] = true;
      };
      for (const key in allKeys) {
        const next = resolvedValues[key];
        const prev = prevResolvedValues[key];
        if (encounteredKeys.hasOwnProperty(key))
          continue;
        if (next !== prev) {
          if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
            if (!shallowCompare(next, prev) || variantDidChange) {
              markToAnimate(key);
            } else {
              typeState.protectedKeys[key] = true;
            }
          } else if (next !== void 0) {
            markToAnimate(key);
          } else {
            removedKeys.add(key);
          }
        } else if (next !== void 0 && removedKeys.has(key)) {
          markToAnimate(key);
        } else {
          typeState.protectedKeys[key] = true;
        }
      }
      typeState.prevProp = prop;
      typeState.prevResolvedValues = resolvedValues;
      if (typeState.isActive) {
        encounteredKeys = Object.assign(Object.assign({}, encounteredKeys), resolvedValues);
      }
      if (isInitialRender && visualElement2.blockInitialAnimation) {
        shouldAnimateType = false;
      }
      if (shouldAnimateType && !isInherited) {
        animations2.push(...definitionList.map((animation) => ({
          animation,
          options: Object.assign({ type }, options)
        })));
      }
    }
    if (removedKeys.size) {
      const fallbackAnimation = {};
      removedKeys.forEach((key) => {
        const fallbackTarget = visualElement2.getBaseTarget(key);
        if (fallbackTarget !== void 0) {
          fallbackAnimation[key] = fallbackTarget;
        }
      });
      animations2.push({ animation: fallbackAnimation });
    }
    let shouldAnimate = Boolean(animations2.length);
    if (isInitialRender && props.initial === false && !visualElement2.manuallyAnimateOnMount) {
      shouldAnimate = false;
    }
    isInitialRender = false;
    return shouldAnimate ? animate4(animations2) : Promise.resolve();
  }
  function setActive(type, isActive, options) {
    var _a;
    if (state[type].isActive === isActive)
      return Promise.resolve();
    (_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach((child) => {
      var _a2;
      return (_a2 = child.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(type, isActive);
    });
    state[type].isActive = isActive;
    const animations2 = animateChanges(options, type);
    for (const key in state) {
      state[key].protectedKeys = {};
    }
    return animations2;
  }
  return {
    animateChanges,
    setActive,
    setAnimateFunction,
    getState: () => state
  };
}
function checkVariantsDidChange(prev, next) {
  if (typeof next === "string") {
    return next !== prev;
  } else if (isVariantLabels(next)) {
    return !shallowCompare(next, prev);
  }
  return false;
}
function createTypeState(isActive = false) {
  return {
    isActive,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function createState() {
  return {
    [AnimationType.Animate]: createTypeState(true),
    [AnimationType.InView]: createTypeState(),
    [AnimationType.Hover]: createTypeState(),
    [AnimationType.Tap]: createTypeState(),
    [AnimationType.Drag]: createTypeState(),
    [AnimationType.Focus]: createTypeState(),
    [AnimationType.Exit]: createTypeState()
  };
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/features/animations.mjs
var animations = {
  animation: makeRenderlessComponent(({ visualElement: visualElement2, animate: animate4 }) => {
    visualElement2.animationState || (visualElement2.animationState = createAnimationState(visualElement2));
    if (isAnimationControls(animate4)) {
      useEffect(() => animate4.subscribe(visualElement2), [animate4]);
    }
  }),
  exit: makeRenderlessComponent((props) => {
    const { custom, visualElement: visualElement2 } = props;
    const [isPresent2, safeToRemove] = usePresence();
    const presenceContext = useContext(PresenceContext);
    useEffect(() => {
      var _a, _b;
      visualElement2.isPresent = isPresent2;
      const animation = (_a = visualElement2.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Exit, !isPresent2, { custom: (_b = presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.custom) !== null && _b !== void 0 ? _b : custom });
      !isPresent2 && (animation === null || animation === void 0 ? void 0 : animation.then(safeToRemove));
    }, [isPresent2]);
  })
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/features/drag.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/gestures/drag/use-drag.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/gestures/PanSession.mjs
init_define_process();
var PanSession = class {
  constructor(event, handlers, { transformPagePoint } = {}) {
    this.startEvent = null;
    this.lastMoveEvent = null;
    this.lastMoveEventInfo = null;
    this.handlers = {};
    this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const info2 = getPanInfo(this.lastMoveEventInfo, this.history);
      const isPanStarted = this.startEvent !== null;
      const isDistancePastThreshold = distance(info2.offset, { x: 0, y: 0 }) >= 3;
      if (!isPanStarted && !isDistancePastThreshold)
        return;
      const { point: point3 } = info2;
      const { timestamp: timestamp2 } = getFrameData();
      this.history.push(Object.assign(Object.assign({}, point3), { timestamp: timestamp2 }));
      const { onStart, onMove } = this.handlers;
      if (!isPanStarted) {
        onStart && onStart(this.lastMoveEvent, info2);
        this.startEvent = this.lastMoveEvent;
      }
      onMove && onMove(this.lastMoveEvent, info2);
    };
    this.handlePointerMove = (event2, info2) => {
      this.lastMoveEvent = event2;
      this.lastMoveEventInfo = transformPoint(info2, this.transformPagePoint);
      if (isMouseEvent(event2) && event2.buttons === 0) {
        this.handlePointerUp(event2, info2);
        return;
      }
      es_default.update(this.updatePoint, true);
    };
    this.handlePointerUp = (event2, info2) => {
      this.end();
      const { onEnd, onSessionEnd } = this.handlers;
      const panInfo = getPanInfo(transformPoint(info2, this.transformPagePoint), this.history);
      if (this.startEvent && onEnd) {
        onEnd(event2, panInfo);
      }
      onSessionEnd && onSessionEnd(event2, panInfo);
    };
    if (isTouchEvent(event) && event.touches.length > 1)
      return;
    this.handlers = handlers;
    this.transformPagePoint = transformPagePoint;
    const info = extractEventInfo(event);
    const initialInfo = transformPoint(info, this.transformPagePoint);
    const { point: point2 } = initialInfo;
    const { timestamp } = getFrameData();
    this.history = [Object.assign(Object.assign({}, point2), { timestamp })];
    const { onSessionStart } = handlers;
    onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
    this.removeListeners = pipe(addPointerEvent(window, "pointermove", this.handlePointerMove), addPointerEvent(window, "pointerup", this.handlePointerUp), addPointerEvent(window, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(handlers) {
    this.handlers = handlers;
  }
  end() {
    this.removeListeners && this.removeListeners();
    cancelSync.update(this.updatePoint);
  }
};
function transformPoint(info, transformPagePoint) {
  return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a5, b5) {
  return { x: a5.x - b5.x, y: a5.y - b5.y };
}
function getPanInfo({ point: point2 }, history) {
  return {
    point: point2,
    delta: subtractPoint(point2, lastDevicePoint(history)),
    offset: subtractPoint(point2, startDevicePoint(history)),
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
    return { x: 0, y: 0 };
  }
  let i4 = history.length - 1;
  let timestampedPoint = null;
  const lastPoint = lastDevicePoint(history);
  while (i4 >= 0) {
    timestampedPoint = history[i4];
    if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) {
      break;
    }
    i4--;
  }
  if (!timestampedPoint) {
    return { x: 0, y: 0 };
  }
  const time2 = (lastPoint.timestamp - timestampedPoint.timestamp) / 1e3;
  if (time2 === 0) {
    return { x: 0, y: 0 };
  }
  const currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time2,
    y: (lastPoint.y - timestampedPoint.y) / time2
  };
  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }
  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }
  return currentVelocity;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/geometry/delta-calc.mjs
init_define_process();
function calcLength(axis) {
  return axis.max - axis.min;
}
function isNear(value, target = 0, maxDistance = 0.01) {
  return distance(value, target) < maxDistance;
}
function calcAxisDelta(delta, source, target, origin = 0.5) {
  delta.origin = origin;
  delta.originPoint = mix(source.min, source.max, delta.origin);
  delta.scale = calcLength(target) / calcLength(source);
  if (isNear(delta.scale, 1, 1e-4) || isNaN(delta.scale))
    delta.scale = 1;
  delta.translate = mix(target.min, target.max, delta.origin) - delta.originPoint;
  if (isNear(delta.translate) || isNaN(delta.translate))
    delta.translate = 0;
}
function calcBoxDelta(delta, source, target, origin) {
  calcAxisDelta(delta.x, source.x, target.x, origin === null || origin === void 0 ? void 0 : origin.originX);
  calcAxisDelta(delta.y, source.y, target.y, origin === null || origin === void 0 ? void 0 : origin.originY);
}
function calcRelativeAxis(target, relative, parent) {
  target.min = parent.min + relative.min;
  target.max = target.min + calcLength(relative);
}
function calcRelativeBox(target, relative, parent) {
  calcRelativeAxis(target.x, relative.x, parent.x);
  calcRelativeAxis(target.y, relative.y, parent.y);
}
function calcRelativeAxisPosition(target, layout, parent) {
  target.min = layout.min - parent.min;
  target.max = target.min + calcLength(layout);
}
function calcRelativePosition(target, layout, parent) {
  calcRelativeAxisPosition(target.x, layout.x, parent.x);
  calcRelativeAxisPosition(target.y, layout.y, parent.y);
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.mjs
function applyConstraints(point2, { min, max }, elastic) {
  if (min !== void 0 && point2 < min) {
    point2 = elastic ? mix(min, point2, elastic.min) : Math.max(point2, min);
  } else if (max !== void 0 && point2 > max) {
    point2 = elastic ? mix(max, point2, elastic.max) : Math.min(point2, max);
  }
  return point2;
}
function calcRelativeAxisConstraints(axis, min, max) {
  return {
    min: min !== void 0 ? axis.min + min : void 0,
    max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
  };
}
function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
  return {
    x: calcRelativeAxisConstraints(layoutBox.x, left, right),
    y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
  };
}
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
  let min = constraintsAxis.min - layoutAxis.min;
  let max = constraintsAxis.max - layoutAxis.max;
  if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
    [min, max] = [max, min];
  }
  return { min, max };
}
function calcViewportConstraints(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
  };
}
function calcOrigin2(source, target) {
  let origin = 0.5;
  const sourceLength = calcLength(source);
  const targetLength = calcLength(target);
  if (targetLength > sourceLength) {
    origin = progress(target.min, target.max - sourceLength, source.min);
  } else if (sourceLength > targetLength) {
    origin = progress(source.min, source.max - targetLength, target.min);
  }
  return clamp2(0, 1, origin);
}
function rebaseAxisConstraints(layout, constraints) {
  const relativeConstraints = {};
  if (constraints.min !== void 0) {
    relativeConstraints.min = constraints.min - layout.min;
  }
  if (constraints.max !== void 0) {
    relativeConstraints.max = constraints.max - layout.min;
  }
  return relativeConstraints;
}
var defaultElastic = 0.35;
function resolveDragElastic(dragElastic = defaultElastic) {
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

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/geometry/models.mjs
init_define_process();
var createAxisDelta = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
});
var createDelta = () => ({
  x: createAxisDelta(),
  y: createAxisDelta()
});
var createAxis = () => ({ min: 0, max: 0 });
var createBox = () => ({
  x: createAxis(),
  y: createAxis()
});

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/utils/each-axis.mjs
init_define_process();
function eachAxis(callback) {
  return [callback("x"), callback("y")];
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/utils/measure.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/geometry/conversion.mjs
init_define_process();
function convertBoundingBoxToBox({ top, left, right, bottom }) {
  return {
    x: { min: left, max: right },
    y: { min: top, max: bottom }
  };
}
function convertBoxToBoundingBox({ x: x5, y: y4 }) {
  return { top: y4.min, right: x5.max, bottom: y4.max, left: x5.min };
}
function transformBoxPoints(point2, transformPoint2) {
  if (!transformPoint2)
    return point2;
  const topLeft = transformPoint2({ x: point2.left, y: point2.top });
  const bottomRight = transformPoint2({ x: point2.right, y: point2.bottom });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/geometry/delta-apply.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/utils/has-transform.mjs
init_define_process();
function isIdentityScale(scale2) {
  return scale2 === void 0 || scale2 === 1;
}
function hasScale({ scale: scale2, scaleX, scaleY }) {
  return !isIdentityScale(scale2) || !isIdentityScale(scaleX) || !isIdentityScale(scaleY);
}
function hasTransform(values) {
  return hasScale(values) || hasTranslate(values.x) || hasTranslate(values.y) || values.z || values.rotate || values.rotateX || values.rotateY;
}
function hasTranslate(value) {
  return value && value !== "0%";
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/geometry/delta-apply.mjs
function scalePoint(point2, scale2, originPoint) {
  const distanceFromOrigin = point2 - originPoint;
  const scaled = scale2 * distanceFromOrigin;
  return originPoint + scaled;
}
function applyPointDelta(point2, translate, scale2, originPoint, boxScale) {
  if (boxScale !== void 0) {
    point2 = scalePoint(point2, boxScale, originPoint);
  }
  return scalePoint(point2, scale2, originPoint) + translate;
}
function applyAxisDelta(axis, translate = 0, scale2 = 1, originPoint, boxScale) {
  axis.min = applyPointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = applyPointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function applyBoxDelta(box, { x: x5, y: y4 }) {
  applyAxisDelta(box.x, x5.translate, x5.scale, x5.originPoint);
  applyAxisDelta(box.y, y4.translate, y4.scale, y4.originPoint);
}
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
  var _a, _b;
  const treeLength = treePath.length;
  if (!treeLength)
    return;
  treeScale.x = treeScale.y = 1;
  let node;
  let delta;
  for (let i4 = 0; i4 < treeLength; i4++) {
    node = treePath[i4];
    delta = node.projectionDelta;
    if (((_b = (_a = node.instance) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.display) === "contents")
      continue;
    if (isSharedTransition && node.options.layoutScroll && node.scroll && node !== node.root) {
      transformBox(box, { x: -node.scroll.x, y: -node.scroll.y });
    }
    if (delta) {
      treeScale.x *= delta.x.scale;
      treeScale.y *= delta.y.scale;
      applyBoxDelta(box, delta);
    }
    if (isSharedTransition && hasTransform(node.latestValues)) {
      transformBox(box, node.latestValues);
    }
  }
}
function translateAxis(axis, distance2) {
  axis.min = axis.min + distance2;
  axis.max = axis.max + distance2;
}
function transformAxis(axis, transforms2, [key, scaleKey, originKey]) {
  const axisOrigin = transforms2[originKey] !== void 0 ? transforms2[originKey] : 0.5;
  const originPoint = mix(axis.min, axis.max, axisOrigin);
  applyAxisDelta(axis, transforms2[key], transforms2[scaleKey], originPoint, transforms2.scale);
}
var xKeys = ["x", "scaleX", "originX"];
var yKeys = ["y", "scaleY", "originY"];
function transformBox(box, transform2) {
  transformAxis(box.x, transform2, xKeys);
  transformAxis(box.y, transform2, yKeys);
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/utils/measure.mjs
function measureViewportBox(instance, transformPoint2) {
  return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint2));
}
function measurePageBox(element, rootProjectionNode2, transformPagePoint) {
  const viewportBox = measureViewportBox(element, transformPagePoint);
  const { scroll: scroll2 } = rootProjectionNode2;
  if (scroll2) {
    translateAxis(viewportBox.x, scroll2.x);
    translateAxis(viewportBox.y, scroll2.y);
  }
  return viewportBox;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs
var elementDragControls = /* @__PURE__ */ new WeakMap();
var VisualElementDragControls = class {
  constructor(visualElement2) {
    this.openGlobalLock = null;
    this.isDragging = false;
    this.currentDirection = null;
    this.originPoint = { x: 0, y: 0 };
    this.constraints = false;
    this.hasMutatedConstraints = false;
    this.elastic = createBox();
    this.visualElement = visualElement2;
  }
  start(originEvent, { snapToCursor = false } = {}) {
    if (this.visualElement.isPresent === false)
      return;
    const onSessionStart = (event) => {
      this.stopAnimation();
      if (snapToCursor) {
        this.snapToCursor(extractEventInfo(event, "page").point);
      }
    };
    const onStart = (event, info) => {
      var _a;
      const { drag: drag2, dragPropagation, onDragStart } = this.getProps();
      if (drag2 && !dragPropagation) {
        if (this.openGlobalLock)
          this.openGlobalLock();
        this.openGlobalLock = getGlobalLock(drag2);
        if (!this.openGlobalLock)
          return;
      }
      this.isDragging = true;
      this.currentDirection = null;
      this.resolveConstraints();
      if (this.visualElement.projection) {
        this.visualElement.projection.isAnimationBlocked = true;
        this.visualElement.projection.target = void 0;
      }
      eachAxis((axis) => {
        var _a2, _b;
        let current = this.getAxisMotionValue(axis).get() || 0;
        if (percent.test(current)) {
          const measuredAxis = (_b = (_a2 = this.visualElement.projection) === null || _a2 === void 0 ? void 0 : _a2.layout) === null || _b === void 0 ? void 0 : _b.actual[axis];
          if (measuredAxis) {
            const length2 = calcLength(measuredAxis);
            current = length2 * (parseFloat(current) / 100);
          }
        }
        this.originPoint[axis] = current;
      });
      onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(event, info);
      (_a = this.visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Drag, true);
    };
    const onMove = (event, info) => {
      const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
      if (!dragPropagation && !this.openGlobalLock)
        return;
      const { offset } = info;
      if (dragDirectionLock && this.currentDirection === null) {
        this.currentDirection = getCurrentDirection(offset);
        if (this.currentDirection !== null) {
          onDirectionLock === null || onDirectionLock === void 0 ? void 0 : onDirectionLock(this.currentDirection);
        }
        return;
      }
      this.updateAxis("x", info.point, offset);
      this.updateAxis("y", info.point, offset);
      this.visualElement.syncRender();
      onDrag === null || onDrag === void 0 ? void 0 : onDrag(event, info);
    };
    const onSessionEnd = (event, info) => this.stop(event, info);
    this.panSession = new PanSession(originEvent, {
      onSessionStart,
      onStart,
      onMove,
      onSessionEnd
    }, { transformPagePoint: this.visualElement.getTransformPagePoint() });
  }
  stop(event, info) {
    const isDragging = this.isDragging;
    this.cancel();
    if (!isDragging)
      return;
    const { velocity } = info;
    this.startAnimation(velocity);
    const { onDragEnd } = this.getProps();
    onDragEnd === null || onDragEnd === void 0 ? void 0 : onDragEnd(event, info);
  }
  cancel() {
    var _a, _b;
    this.isDragging = false;
    if (this.visualElement.projection) {
      this.visualElement.projection.isAnimationBlocked = false;
    }
    (_a = this.panSession) === null || _a === void 0 ? void 0 : _a.end();
    this.panSession = void 0;
    const { dragPropagation } = this.getProps();
    if (!dragPropagation && this.openGlobalLock) {
      this.openGlobalLock();
      this.openGlobalLock = null;
    }
    (_b = this.visualElement.animationState) === null || _b === void 0 ? void 0 : _b.setActive(AnimationType.Drag, false);
  }
  updateAxis(axis, _point, offset) {
    const { drag: drag2 } = this.getProps();
    if (!offset || !shouldDrag(axis, drag2, this.currentDirection))
      return;
    const axisValue = this.getAxisMotionValue(axis);
    let next = this.originPoint[axis] + offset[axis];
    if (this.constraints && this.constraints[axis]) {
      next = applyConstraints(next, this.constraints[axis], this.elastic[axis]);
    }
    axisValue.set(next);
  }
  resolveConstraints() {
    const { dragConstraints, dragElastic } = this.getProps();
    const { layout } = this.visualElement.projection || {};
    const prevConstraints = this.constraints;
    if (dragConstraints && isRefObject(dragConstraints)) {
      if (!this.constraints) {
        this.constraints = this.resolveRefConstraints();
      }
    } else {
      if (dragConstraints && layout) {
        this.constraints = calcRelativeConstraints(layout.actual, dragConstraints);
      } else {
        this.constraints = false;
      }
    }
    this.elastic = resolveDragElastic(dragElastic);
    if (prevConstraints !== this.constraints && layout && this.constraints && !this.hasMutatedConstraints) {
      eachAxis((axis) => {
        if (this.getAxisMotionValue(axis)) {
          this.constraints[axis] = rebaseAxisConstraints(layout.actual[axis], this.constraints[axis]);
        }
      });
    }
  }
  resolveRefConstraints() {
    const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
    if (!constraints || !isRefObject(constraints))
      return false;
    const constraintsElement = constraints.current;
    invariant(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
    const { projection } = this.visualElement;
    if (!projection || !projection.layout)
      return false;
    const constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
    let measuredConstraints = calcViewportConstraints(projection.layout.actual, constraintsBox);
    if (onMeasureDragConstraints) {
      const userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox(measuredConstraints));
      this.hasMutatedConstraints = !!userConstraints;
      if (userConstraints) {
        measuredConstraints = convertBoundingBoxToBox(userConstraints);
      }
    }
    return measuredConstraints;
  }
  startAnimation(velocity) {
    const { drag: drag2, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd } = this.getProps();
    const constraints = this.constraints || {};
    const momentumAnimations = eachAxis((axis) => {
      var _a;
      if (!shouldDrag(axis, drag2, this.currentDirection)) {
        return;
      }
      let transition = (_a = constraints === null || constraints === void 0 ? void 0 : constraints[axis]) !== null && _a !== void 0 ? _a : {};
      if (dragSnapToOrigin)
        transition = { min: 0, max: 0 };
      const bounceStiffness = dragElastic ? 200 : 1e6;
      const bounceDamping = dragElastic ? 40 : 1e7;
      const inertia2 = Object.assign(Object.assign({
        type: "inertia",
        velocity: dragMomentum ? velocity[axis] : 0,
        bounceStiffness,
        bounceDamping,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10
      }, dragTransition), transition);
      return this.startAxisValueAnimation(axis, inertia2);
    });
    return Promise.all(momentumAnimations).then(onDragTransitionEnd);
  }
  startAxisValueAnimation(axis, transition) {
    const axisValue = this.getAxisMotionValue(axis);
    return startAnimation(axis, axisValue, 0, transition);
  }
  stopAnimation() {
    eachAxis((axis) => this.getAxisMotionValue(axis).stop());
  }
  getAxisMotionValue(axis) {
    var _a, _b;
    const dragKey = "_drag" + axis.toUpperCase();
    const externalMotionValue = this.visualElement.getProps()[dragKey];
    return externalMotionValue ? externalMotionValue : this.visualElement.getValue(axis, (_b = (_a = this.visualElement.getProps().initial) === null || _a === void 0 ? void 0 : _a[axis]) !== null && _b !== void 0 ? _b : 0);
  }
  snapToCursor(point2) {
    eachAxis((axis) => {
      const { drag: drag2 } = this.getProps();
      if (!shouldDrag(axis, drag2, this.currentDirection))
        return;
      const { projection } = this.visualElement;
      const axisValue = this.getAxisMotionValue(axis);
      if (projection && projection.layout) {
        const { min, max } = projection.layout.actual[axis];
        axisValue.set(point2[axis] - mix(min, max, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    var _a;
    const { drag: drag2, dragConstraints } = this.getProps();
    const { projection } = this.visualElement;
    if (!isRefObject(dragConstraints) || !projection || !this.constraints)
      return;
    this.stopAnimation();
    const boxProgress = { x: 0, y: 0 };
    eachAxis((axis) => {
      const axisValue = this.getAxisMotionValue(axis);
      if (axisValue) {
        const latest = axisValue.get();
        boxProgress[axis] = calcOrigin2({ min: latest, max: latest }, this.constraints[axis]);
      }
    });
    const { transformTemplate } = this.visualElement.getProps();
    this.visualElement.getInstance().style.transform = transformTemplate ? transformTemplate({}, "") : "none";
    (_a = projection.root) === null || _a === void 0 ? void 0 : _a.updateScroll();
    projection.updateLayout();
    this.resolveConstraints();
    eachAxis((axis) => {
      if (!shouldDrag(axis, drag2, null))
        return;
      const axisValue = this.getAxisMotionValue(axis);
      const { min, max } = this.constraints[axis];
      axisValue.set(mix(min, max, boxProgress[axis]));
    });
  }
  addListeners() {
    var _a;
    elementDragControls.set(this.visualElement, this);
    const element = this.visualElement.getInstance();
    const stopPointerListener = addPointerEvent(element, "pointerdown", (event) => {
      const { drag: drag2, dragListener = true } = this.getProps();
      drag2 && dragListener && this.start(event);
    });
    const measureDragConstraints = () => {
      const { dragConstraints } = this.getProps();
      if (isRefObject(dragConstraints)) {
        this.constraints = this.resolveRefConstraints();
      }
    };
    const { projection } = this.visualElement;
    const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
    if (projection && !projection.layout) {
      (_a = projection.root) === null || _a === void 0 ? void 0 : _a.updateScroll();
      projection.updateLayout();
    }
    measureDragConstraints();
    const stopResizeListener = addDomEvent(window, "resize", () => this.scalePositionWithinConstraints());
    const stopLayoutUpdateListener = projection.addEventListener("didUpdate", ({ delta, hasLayoutChanged }) => {
      if (this.isDragging && hasLayoutChanged) {
        eachAxis((axis) => {
          const motionValue2 = this.getAxisMotionValue(axis);
          if (!motionValue2)
            return;
          this.originPoint[axis] += delta[axis].translate;
          motionValue2.set(motionValue2.get() + delta[axis].translate);
        });
        this.visualElement.syncRender();
      }
    });
    return () => {
      stopResizeListener();
      stopPointerListener();
      stopMeasureLayoutListener();
      stopLayoutUpdateListener === null || stopLayoutUpdateListener === void 0 ? void 0 : stopLayoutUpdateListener();
    };
  }
  getProps() {
    const props = this.visualElement.getProps();
    const { drag: drag2 = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = defaultElastic, dragMomentum = true } = props;
    return Object.assign(Object.assign({}, props), {
      drag: drag2,
      dragDirectionLock,
      dragPropagation,
      dragConstraints,
      dragElastic,
      dragMomentum
    });
  }
};
function shouldDrag(direction, drag2, currentDirection) {
  return (drag2 === true || drag2 === direction) && (currentDirection === null || currentDirection === direction);
}
function getCurrentDirection(offset, lockThreshold = 10) {
  let direction = null;
  if (Math.abs(offset.y) > lockThreshold) {
    direction = "y";
  } else if (Math.abs(offset.x) > lockThreshold) {
    direction = "x";
  }
  return direction;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/gestures/drag/use-drag.mjs
function useDrag(props) {
  const { dragControls: groupDragControls, visualElement: visualElement2 } = props;
  const dragControls = useConstant(() => new VisualElementDragControls(visualElement2));
  useEffect(() => groupDragControls && groupDragControls.subscribe(dragControls), [dragControls, groupDragControls]);
  useEffect(() => dragControls.addListeners(), [dragControls]);
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/gestures/use-pan-gesture.mjs
init_define_process();
function usePanGesture({ onPan, onPanStart, onPanEnd, onPanSessionStart, visualElement: visualElement2 }) {
  const hasPanEvents = onPan || onPanStart || onPanEnd || onPanSessionStart;
  const panSession = useRef(null);
  const { transformPagePoint } = useContext(MotionConfigContext);
  const handlers = {
    onSessionStart: onPanSessionStart,
    onStart: onPanStart,
    onMove: onPan,
    onEnd: (event, info) => {
      panSession.current = null;
      onPanEnd && onPanEnd(event, info);
    }
  };
  useEffect(() => {
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
  useUnmountEffect(() => panSession.current && panSession.current.end());
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/features/drag.mjs
var drag = {
  pan: makeRenderlessComponent(usePanGesture),
  drag: makeRenderlessComponent(useDrag)
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/html/visual-element.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/index.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/utils/lifecycles.mjs
init_define_process();
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
  "LayoutAnimationStart",
  "SetAxisTarget",
  "Unmount"
];
function createLifecycles() {
  const managers = names.map(() => new SubscriptionManager());
  const propSubscriptions = {};
  const lifecycles = {
    clearAllListeners: () => managers.forEach((manager) => manager.clear()),
    updatePropListeners: (props) => {
      names.forEach((name) => {
        var _a;
        const on2 = "on" + name;
        const propListener = props[on2];
        (_a = propSubscriptions[name]) === null || _a === void 0 ? void 0 : _a.call(propSubscriptions);
        if (propListener) {
          propSubscriptions[name] = lifecycles[on2](propListener);
        }
      });
    }
  };
  managers.forEach((manager, i4) => {
    lifecycles["on" + names[i4]] = (handler) => manager.add(handler);
    lifecycles["notify" + names[i4]] = (...args) => manager.notify(...args);
  });
  return lifecycles;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/utils/motion-values.mjs
init_define_process();
function updateMotionValuesFromProps(element, next, prev) {
  var _a;
  const { willChange } = next;
  for (const key in next) {
    const nextValue = next[key];
    const prevValue = prev[key];
    if (isMotionValue(nextValue)) {
      element.addValue(key, nextValue);
      if (isWillChangeMotionValue(willChange)) {
        willChange.add(key);
      }
      if (true) {
        warnOnce(nextValue.version === "7.2.0", `Attempting to mix Framer Motion versions ${nextValue.version} with 7.2.0 may not work as expected.`);
      }
    } else if (isMotionValue(prevValue)) {
      element.addValue(key, motionValue(nextValue));
      if (isWillChangeMotionValue(willChange)) {
        willChange.remove(key);
      }
    } else if (prevValue !== nextValue) {
      if (element.hasValue(key)) {
        const existingValue = element.getValue(key);
        !existingValue.hasAnimated && existingValue.set(nextValue);
      } else {
        element.addValue(key, motionValue((_a = element.getStaticValue(key)) !== null && _a !== void 0 ? _a : nextValue));
      }
    }
  }
  for (const key in prev) {
    if (next[key] === void 0)
      element.removeValue(key);
  }
  return next;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/index.mjs
var visualElement = ({ treeType = "", build, getBaseTarget, makeTargetAnimatable, measureViewportBox: measureViewportBox2, render: renderInstance, readValueFromInstance, removeValueFromRenderState, sortNodePosition, scrapeMotionValuesFromProps: scrapeMotionValuesFromProps3 }) => ({ parent, props, presenceId, blockInitialAnimation, visualState, shouldReduceMotion }, options = {}) => {
  let isMounted = false;
  const { latestValues, renderState } = visualState;
  let instance;
  const lifecycles = createLifecycles();
  const values = /* @__PURE__ */ new Map();
  const valueSubscriptions = /* @__PURE__ */ new Map();
  let prevMotionValues = {};
  const baseTarget = Object.assign({}, latestValues);
  let removeFromVariantTree;
  function render2() {
    if (!instance || !isMounted)
      return;
    triggerBuild();
    renderInstance(instance, renderState, props.style, element.projection);
  }
  function triggerBuild() {
    build(element, renderState, latestValues, options, props);
  }
  function update() {
    lifecycles.notifyUpdate(latestValues);
  }
  function bindToMotionValue(key, value) {
    const removeOnChange = value.onChange((latestValue) => {
      latestValues[key] = latestValue;
      props.onUpdate && es_default.update(update, false, true);
    });
    const removeOnRenderRequest = value.onRenderRequest(element.scheduleRender);
    valueSubscriptions.set(key, () => {
      removeOnChange();
      removeOnRenderRequest();
    });
  }
  const _a = scrapeMotionValuesFromProps3(props), { willChange } = _a, initialMotionValues = __rest(_a, ["willChange"]);
  for (const key in initialMotionValues) {
    const value = initialMotionValues[key];
    if (latestValues[key] !== void 0 && isMotionValue(value)) {
      value.set(latestValues[key], false);
      if (isWillChangeMotionValue(willChange)) {
        willChange.add(key);
      }
    }
  }
  const isControllingVariants = checkIfControllingVariants(props);
  const isVariantNode = checkIfVariantNode(props);
  const element = Object.assign(Object.assign({
    treeType,
    current: null,
    depth: parent ? parent.depth + 1 : 0,
    parent,
    children: /* @__PURE__ */ new Set(),
    presenceId,
    shouldReduceMotion,
    variantChildren: isVariantNode ? /* @__PURE__ */ new Set() : void 0,
    isVisible: void 0,
    manuallyAnimateOnMount: Boolean(parent === null || parent === void 0 ? void 0 : parent.isMounted()),
    blockInitialAnimation,
    isMounted: () => Boolean(instance),
    mount(newInstance) {
      isMounted = true;
      instance = element.current = newInstance;
      if (element.projection) {
        element.projection.mount(newInstance);
      }
      if (isVariantNode && parent && !isControllingVariants) {
        removeFromVariantTree = parent === null || parent === void 0 ? void 0 : parent.addVariantChild(element);
      }
      values.forEach((value, key) => bindToMotionValue(key, value));
      parent === null || parent === void 0 ? void 0 : parent.children.add(element);
      element.setProps(props);
    },
    unmount() {
      var _a2;
      (_a2 = element.projection) === null || _a2 === void 0 ? void 0 : _a2.unmount();
      cancelSync.update(update);
      cancelSync.render(render2);
      valueSubscriptions.forEach((remove) => remove());
      removeFromVariantTree === null || removeFromVariantTree === void 0 ? void 0 : removeFromVariantTree();
      parent === null || parent === void 0 ? void 0 : parent.children.delete(element);
      lifecycles.clearAllListeners();
      instance = void 0;
      isMounted = false;
    },
    addVariantChild(child) {
      var _a2;
      const closestVariantNode = element.getClosestVariantNode();
      if (closestVariantNode) {
        (_a2 = closestVariantNode.variantChildren) === null || _a2 === void 0 ? void 0 : _a2.add(child);
        return () => closestVariantNode.variantChildren.delete(child);
      }
    },
    sortNodePosition(other) {
      if (!sortNodePosition || treeType !== other.treeType)
        return 0;
      return sortNodePosition(element.getInstance(), other.getInstance());
    },
    getClosestVariantNode: () => isVariantNode ? element : parent === null || parent === void 0 ? void 0 : parent.getClosestVariantNode(),
    getLayoutId: () => props.layoutId,
    getInstance: () => instance,
    getStaticValue: (key) => latestValues[key],
    setStaticValue: (key, value) => latestValues[key] = value,
    getLatestValues: () => latestValues,
    setVisibility(visibility) {
      if (element.isVisible === visibility)
        return;
      element.isVisible = visibility;
      element.scheduleRender();
    },
    makeTargetAnimatable(target, canMutate = true) {
      return makeTargetAnimatable(element, target, props, canMutate);
    },
    measureViewportBox() {
      return measureViewportBox2(instance, props);
    },
    addValue(key, value) {
      if (element.hasValue(key))
        element.removeValue(key);
      values.set(key, value);
      latestValues[key] = value.get();
      bindToMotionValue(key, value);
    },
    removeValue(key) {
      var _a2;
      values.delete(key);
      (_a2 = valueSubscriptions.get(key)) === null || _a2 === void 0 ? void 0 : _a2();
      valueSubscriptions.delete(key);
      delete latestValues[key];
      removeValueFromRenderState(key, renderState);
    },
    hasValue: (key) => values.has(key),
    getValue(key, defaultValue) {
      let value = values.get(key);
      if (value === void 0 && defaultValue !== void 0) {
        value = motionValue(defaultValue);
        element.addValue(key, value);
      }
      return value;
    },
    forEachValue: (callback) => values.forEach(callback),
    readValue: (key) => {
      var _a2;
      return (_a2 = latestValues[key]) !== null && _a2 !== void 0 ? _a2 : readValueFromInstance(instance, key, options);
    },
    setBaseTarget(key, value) {
      baseTarget[key] = value;
    },
    getBaseTarget(key) {
      if (getBaseTarget) {
        const target = getBaseTarget(props, key);
        if (target !== void 0 && !isMotionValue(target))
          return target;
      }
      return baseTarget[key];
    }
  }, lifecycles), {
    build() {
      triggerBuild();
      return renderState;
    },
    scheduleRender() {
      es_default.render(render2, false, true);
    },
    syncRender: render2,
    setProps(newProps) {
      if (newProps.transformTemplate || props.transformTemplate) {
        element.scheduleRender();
      }
      props = newProps;
      lifecycles.updatePropListeners(newProps);
      prevMotionValues = updateMotionValuesFromProps(element, scrapeMotionValuesFromProps3(props), prevMotionValues);
    },
    getProps: () => props,
    getVariant: (name) => {
      var _a2;
      return (_a2 = props.variants) === null || _a2 === void 0 ? void 0 : _a2[name];
    },
    getDefaultTransition: () => props.transition,
    getTransformPagePoint: () => {
      return props.transformPagePoint;
    },
    getVariantContext(startAtParent = false) {
      if (startAtParent)
        return parent === null || parent === void 0 ? void 0 : parent.getVariantContext();
      if (!isControllingVariants) {
        const context2 = (parent === null || parent === void 0 ? void 0 : parent.getVariantContext()) || {};
        if (props.initial !== void 0) {
          context2.initial = props.initial;
        }
        return context2;
      }
      const context = {};
      for (let i4 = 0; i4 < numVariantProps; i4++) {
        const name = variantProps[i4];
        const prop = props[name];
        if (isVariantLabel(prop) || prop === false) {
          context[name] = prop;
        }
      }
      return context;
    }
  });
  return element;
};
var variantProps = ["initial", ...variantPriorityOrder];
var numVariantProps = variantProps.length;

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/parse-dom-variant.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/css-variables-conversion.mjs
init_define_process();
function isCSSVariable2(value) {
  return typeof value === "string" && value.startsWith("var(--");
}
var cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function parseCSSVariable(current) {
  const match = cssVariableRegex.exec(current);
  if (!match)
    return [,];
  const [, token, fallback] = match;
  return [token, fallback];
}
var maxDepth = 4;
function getVariableValue(current, element, depth = 1) {
  invariant(depth <= maxDepth, `Max CSS variable fallback depth detected in property "${current}". This may indicate a circular fallback dependency.`);
  const [token, fallback] = parseCSSVariable(current);
  if (!token)
    return;
  const resolved = window.getComputedStyle(element).getPropertyValue(token);
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
  const element = visualElement2.getInstance();
  if (!(element instanceof Element))
    return { target, transitionEnd };
  if (transitionEnd) {
    transitionEnd = Object.assign({}, transitionEnd);
  }
  visualElement2.forEachValue((value) => {
    const current = value.get();
    if (!isCSSVariable2(current))
      return;
    const resolved = getVariableValue(current, element);
    if (resolved)
      value.set(resolved);
  });
  for (const key in target) {
    const current = target[key];
    if (!isCSSVariable2(current))
      continue;
    const resolved = getVariableValue(current, element);
    if (!resolved)
      continue;
    target[key] = resolved;
    if (transitionEnd)
      (_b = transitionEnd[key]) !== null && _b !== void 0 ? _b : transitionEnd[key] = current;
  }
  return { target, transitionEnd };
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/unit-conversion.mjs
init_define_process();
var positionalKeys = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  "x",
  "y"
]);
var isPositionalKey = (key) => positionalKeys.has(key);
var hasPositionalKey = (target) => {
  return Object.keys(target).some(isPositionalKey);
};
var setAndResetVelocity = (value, to) => {
  value.set(to, false);
  value.set(to);
};
var isNumOrPxType = (v4) => v4 === number || v4 === px;
var BoundingBoxDimension;
(function(BoundingBoxDimension2) {
  BoundingBoxDimension2["width"] = "width";
  BoundingBoxDimension2["height"] = "height";
  BoundingBoxDimension2["left"] = "left";
  BoundingBoxDimension2["right"] = "right";
  BoundingBoxDimension2["top"] = "top";
  BoundingBoxDimension2["bottom"] = "bottom";
})(BoundingBoxDimension || (BoundingBoxDimension = {}));
var getPosFromMatrix = (matrix, pos) => parseFloat(matrix.split(", ")[pos]);
var getTranslateFromMatrix = (pos2, pos3) => (_bbox, { transform: transform2 }) => {
  if (transform2 === "none" || !transform2)
    return 0;
  const matrix3d = transform2.match(/^matrix3d\((.+)\)$/);
  if (matrix3d) {
    return getPosFromMatrix(matrix3d[1], pos3);
  } else {
    const matrix = transform2.match(/^matrix\((.+)\)$/);
    if (matrix) {
      return getPosFromMatrix(matrix[1], pos2);
    } else {
      return 0;
    }
  }
};
var transformKeys = /* @__PURE__ */ new Set(["x", "y", "z"]);
var nonTranslationalTransformKeys = transformProps.filter((key) => !transformKeys.has(key));
function removeNonTranslationalTransform(visualElement2) {
  const removedTransforms = [];
  nonTranslationalTransformKeys.forEach((key) => {
    const value = visualElement2.getValue(key);
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
  width: ({ x: x5 }, { paddingLeft = "0", paddingRight = "0" }) => x5.max - x5.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
  height: ({ y: y4 }, { paddingTop = "0", paddingBottom = "0" }) => y4.max - y4.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
  top: (_bbox, { top }) => parseFloat(top),
  left: (_bbox, { left }) => parseFloat(left),
  bottom: ({ y: y4 }, { top }) => parseFloat(top) + (y4.max - y4.min),
  right: ({ x: x5 }, { left }) => parseFloat(left) + (x5.max - x5.min),
  x: getTranslateFromMatrix(4, 13),
  y: getTranslateFromMatrix(5, 14)
};
var convertChangedValueTypes = (target, visualElement2, changedKeys) => {
  const originBbox = visualElement2.measureViewportBox();
  const element = visualElement2.getInstance();
  const elementComputedStyle = getComputedStyle(element);
  const { display } = elementComputedStyle;
  const origin = {};
  if (display === "none") {
    visualElement2.setStaticValue("display", target.display || "block");
  }
  changedKeys.forEach((key) => {
    origin[key] = positionalValues[key](originBbox, elementComputedStyle);
  });
  visualElement2.syncRender();
  const targetBbox = visualElement2.measureViewportBox();
  changedKeys.forEach((key) => {
    const value = visualElement2.getValue(key);
    setAndResetVelocity(value, origin[key]);
    target[key] = positionalValues[key](targetBbox, elementComputedStyle);
  });
  return target;
};
var checkAndConvertChangedValueTypes = (visualElement2, target, origin = {}, transitionEnd = {}) => {
  target = Object.assign({}, target);
  transitionEnd = Object.assign({}, transitionEnd);
  const targetPositionalKeys = Object.keys(target).filter(isPositionalKey);
  let removedTransformValues = [];
  let hasAttemptedToRemoveTransformValues = false;
  const changedValueTypeKeys = [];
  targetPositionalKeys.forEach((key) => {
    const value = visualElement2.getValue(key);
    if (!visualElement2.hasValue(key))
      return;
    let from = origin[key];
    let fromType = findDimensionValueType(from);
    const to = target[key];
    let toType;
    if (isKeyframesTarget(to)) {
      const numKeyframes = to.length;
      const fromIndex = to[0] === null ? 1 : 0;
      from = to[fromIndex];
      fromType = findDimensionValueType(from);
      for (let i4 = fromIndex; i4 < numKeyframes; i4++) {
        if (!toType) {
          toType = findDimensionValueType(to[i4]);
          invariant(toType === fromType || isNumOrPxType(fromType) && isNumOrPxType(toType), "Keyframes must be of the same dimension as the current value");
        } else {
          invariant(findDimensionValueType(to[i4]) === toType, "All keyframes must be of the same type");
        }
      }
    } else {
      toType = findDimensionValueType(to);
    }
    if (fromType !== toType) {
      if (isNumOrPxType(fromType) && isNumOrPxType(toType)) {
        const current = value.get();
        if (typeof current === "string") {
          value.set(parseFloat(current));
        }
        if (typeof to === "string") {
          target[key] = parseFloat(to);
        } else if (Array.isArray(to) && toType === px) {
          target[key] = to.map(parseFloat);
        }
      } else if ((fromType === null || fromType === void 0 ? void 0 : fromType.transform) && (toType === null || toType === void 0 ? void 0 : toType.transform) && (from === 0 || to === 0)) {
        if (from === 0) {
          value.set(toType.transform(from));
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
    const scrollY = changedValueTypeKeys.indexOf("height") >= 0 ? window.pageYOffset : null;
    const convertedTarget = convertChangedValueTypes(target, visualElement2, changedValueTypeKeys);
    if (removedTransformValues.length) {
      removedTransformValues.forEach(([key, value]) => {
        visualElement2.getValue(key).set(value);
      });
    }
    visualElement2.syncRender();
    if (isBrowser && scrollY !== null) {
      window.scrollTo({ top: scrollY });
    }
    return { target: convertedTarget, transitionEnd };
  } else {
    return { target, transitionEnd };
  }
};
function unitConversion(visualElement2, target, origin, transitionEnd) {
  return hasPositionalKey(target) ? checkAndConvertChangedValueTypes(visualElement2, target, origin, transitionEnd) : { target, transitionEnd };
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/parse-dom-variant.mjs
var parseDomVariant = (visualElement2, target, origin, transitionEnd) => {
  const resolved = resolveCSSVariables(visualElement2, target, transitionEnd);
  target = resolved.target;
  transitionEnd = resolved.transitionEnd;
  return unitConversion(visualElement2, target, origin, transitionEnd);
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/html/visual-element.mjs
function getComputedStyle2(element) {
  return window.getComputedStyle(element);
}
var htmlConfig = {
  treeType: "dom",
  readValueFromInstance(domElement, key) {
    if (isTransformProp(key)) {
      const defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    } else {
      const computedStyle = getComputedStyle2(domElement);
      const value = (isCSSVariable(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
      return typeof value === "string" ? value.trim() : value;
    }
  },
  sortNodePosition(a5, b5) {
    return a5.compareDocumentPosition(b5) & 2 ? 1 : -1;
  },
  getBaseTarget(props, key) {
    var _a;
    return (_a = props.style) === null || _a === void 0 ? void 0 : _a[key];
  },
  measureViewportBox(element, { transformPagePoint }) {
    return measureViewportBox(element, transformPagePoint);
  },
  resetTransform(element, domElement, props) {
    const { transformTemplate } = props;
    domElement.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
    element.scheduleRender();
  },
  restoreTransform(instance, mutableState) {
    instance.style.transform = mutableState.style.transform;
  },
  removeValueFromRenderState(key, { vars, style: style2 }) {
    delete vars[key];
    delete style2[key];
  },
  makeTargetAnimatable(element, _a, _b, isMounted) {
    var { transition, transitionEnd } = _a, target = __rest(_a, ["transition", "transitionEnd"]);
    var transformValues = _b.transformValues;
    if (isMounted === void 0) {
      isMounted = true;
    }
    let origin = getOrigin(target, transition || {}, element);
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
      const parsed = parseDomVariant(element, target, origin, transitionEnd);
      transitionEnd = parsed.transitionEnd;
      target = parsed.target;
    }
    return Object.assign({
      transition,
      transitionEnd
    }, target);
  },
  scrapeMotionValuesFromProps,
  build(element, renderState, latestValues, options, props) {
    if (element.isVisible !== void 0) {
      renderState.style.visibility = element.isVisible ? "visible" : "hidden";
    }
    buildHTMLStyles(renderState, latestValues, options, props.transformTemplate);
  },
  render: renderHTML
};
var htmlVisualElement = visualElement(htmlConfig);

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/svg/visual-element.mjs
init_define_process();
var svgVisualElement = visualElement(Object.assign(Object.assign({}, htmlConfig), {
  getBaseTarget(props, key) {
    return props[key];
  },
  readValueFromInstance(domElement, key) {
    var _a;
    if (isTransformProp(key)) {
      return ((_a = getDefaultValueType(key)) === null || _a === void 0 ? void 0 : _a.default) || 0;
    }
    key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
    return domElement.getAttribute(key);
  },
  scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2,
  build(_element, renderState, latestValues, options, props) {
    buildSVGAttrs(renderState, latestValues, options, props.transformTemplate);
  },
  render: renderSVG
}));

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs
var createDomVisualElement = (Component2, options) => {
  return isSVGComponent(Component2) ? svgVisualElement(options, { enableHardwareAcceleration: false }) : htmlVisualElement(options, { enableHardwareAcceleration: true });
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/features/layout/index.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/styles/scale-border-radius.mjs
init_define_process();
function pixelsToPercent(pixels, axis) {
  if (axis.max === axis.min)
    return 0;
  return pixels / (axis.max - axis.min) * 100;
}
var correctBorderRadius = {
  correct: (latest, node) => {
    if (!node.target)
      return latest;
    if (typeof latest === "string") {
      if (px.test(latest)) {
        latest = parseFloat(latest);
      } else {
        return latest;
      }
    }
    const x5 = pixelsToPercent(latest, node.target.x);
    const y4 = pixelsToPercent(latest, node.target.y);
    return `${x5}% ${y4}%`;
  }
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/styles/scale-box-shadow.mjs
init_define_process();
var varToken = "_$css";
var correctBoxShadow = {
  correct: (latest, { treeScale, projectionDelta }) => {
    const original = latest;
    const containsCSSVariables = latest.includes("var(");
    const cssVariables = [];
    if (containsCSSVariables) {
      latest = latest.replace(cssVariableRegex, (match) => {
        cssVariables.push(match);
        return varToken;
      });
    }
    const shadow = complex.parse(latest);
    if (shadow.length > 5)
      return original;
    const template = complex.createTransformer(latest);
    const offset = typeof shadow[0] !== "number" ? 1 : 0;
    const xScale = projectionDelta.x.scale * treeScale.x;
    const yScale = projectionDelta.y.scale * treeScale.y;
    shadow[0 + offset] /= xScale;
    shadow[1 + offset] /= yScale;
    const averageScale = mix(xScale, yScale, 0.5);
    if (typeof shadow[2 + offset] === "number")
      shadow[2 + offset] /= averageScale;
    if (typeof shadow[3 + offset] === "number")
      shadow[3 + offset] /= averageScale;
    let output = template(shadow);
    if (containsCSSVariables) {
      let i4 = 0;
      output = output.replace(varToken, () => {
        const cssVariable = cssVariables[i4];
        i4++;
        return cssVariable;
      });
    }
    return output;
  }
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs
var MeasureLayoutWithContext = class extends react_preact_default.Component {
  componentDidMount() {
    const { visualElement: visualElement2, layoutGroup, switchLayoutGroup, layoutId } = this.props;
    const { projection } = visualElement2;
    addScaleCorrector(defaultScaleCorrectors);
    if (projection) {
      if (layoutGroup === null || layoutGroup === void 0 ? void 0 : layoutGroup.group)
        layoutGroup.group.add(projection);
      if ((switchLayoutGroup === null || switchLayoutGroup === void 0 ? void 0 : switchLayoutGroup.register) && layoutId) {
        switchLayoutGroup.register(projection);
      }
      projection.root.didUpdate();
      projection.addEventListener("animationComplete", () => {
        this.safeToRemove();
      });
      projection.setOptions(Object.assign(Object.assign({}, projection.options), { onExitComplete: () => this.safeToRemove() }));
    }
    globalProjectionState.hasEverUpdated = true;
  }
  getSnapshotBeforeUpdate(prevProps) {
    const { layoutDependency, visualElement: visualElement2, drag: drag2, isPresent: isPresent2 } = this.props;
    const projection = visualElement2.projection;
    if (!projection)
      return null;
    projection.isPresent = isPresent2;
    if (drag2 || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0) {
      projection.willUpdate();
    } else {
      this.safeToRemove();
    }
    if (prevProps.isPresent !== isPresent2) {
      if (isPresent2) {
        projection.promote();
      } else if (!projection.relegate()) {
        es_default.postRender(() => {
          var _a;
          if (!((_a = projection.getStack()) === null || _a === void 0 ? void 0 : _a.members.length)) {
            this.safeToRemove();
          }
        });
      }
    }
    return null;
  }
  componentDidUpdate() {
    const { projection } = this.props.visualElement;
    if (projection) {
      projection.root.didUpdate();
      if (!projection.currentAnimation && projection.isLead()) {
        this.safeToRemove();
      }
    }
  }
  componentWillUnmount() {
    const { visualElement: visualElement2, layoutGroup, switchLayoutGroup: promoteContext } = this.props;
    const { projection } = visualElement2;
    if (projection) {
      projection.scheduleCheckAfterUnmount();
      if (layoutGroup === null || layoutGroup === void 0 ? void 0 : layoutGroup.group)
        layoutGroup.group.remove(projection);
      if (promoteContext === null || promoteContext === void 0 ? void 0 : promoteContext.deregister)
        promoteContext.deregister(projection);
    }
  }
  safeToRemove() {
    const { safeToRemove } = this.props;
    safeToRemove === null || safeToRemove === void 0 ? void 0 : safeToRemove();
  }
  render() {
    return null;
  }
};
function MeasureLayout(props) {
  const [isPresent2, safeToRemove] = usePresence();
  const layoutGroup = useContext(LayoutGroupContext);
  return react_preact_default.createElement(MeasureLayoutWithContext, Object.assign({}, props, { layoutGroup, switchLayoutGroup: useContext(SwitchLayoutGroupContext), isPresent: isPresent2, safeToRemove }));
}
var defaultScaleCorrectors = {
  borderRadius: Object.assign(Object.assign({}, correctBorderRadius), { applyTo: [
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomLeftRadius",
    "borderBottomRightRadius"
  ] }),
  borderTopLeftRadius: correctBorderRadius,
  borderTopRightRadius: correctBorderRadius,
  borderBottomLeftRadius: correctBorderRadius,
  borderBottomRightRadius: correctBorderRadius,
  boxShadow: correctBoxShadow
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/motion/features/layout/index.mjs
var layoutFeatures = {
  measureLayout: MeasureLayout
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/node/create-projection-node.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/animation/animate.mjs
init_define_process();
function animate2(from, to, transition = {}) {
  const value = isMotionValue(from) ? from : motionValue(from);
  startAnimation("", value, to, transition);
  return {
    stop: () => value.stop(),
    isAnimating: () => value.isAnimating()
  };
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/animation/mix-values.mjs
init_define_process();
var borders = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
var numBorders = borders.length;
var asNumber = (value) => typeof value === "string" ? parseFloat(value) : value;
var isPx = (value) => typeof value === "number" || px.test(value);
function mixValues(target, follow, lead, progress3, shouldCrossfadeOpacity, isOnlyMember) {
  var _a, _b, _c, _d;
  if (shouldCrossfadeOpacity) {
    target.opacity = mix(
      0,
      (_a = lead.opacity) !== null && _a !== void 0 ? _a : 1,
      easeCrossfadeIn(progress3)
    );
    target.opacityExit = mix((_b = follow.opacity) !== null && _b !== void 0 ? _b : 1, 0, easeCrossfadeOut(progress3));
  } else if (isOnlyMember) {
    target.opacity = mix((_c = follow.opacity) !== null && _c !== void 0 ? _c : 1, (_d = lead.opacity) !== null && _d !== void 0 ? _d : 1, progress3);
  }
  for (let i4 = 0; i4 < numBorders; i4++) {
    const borderLabel = `border${borders[i4]}Radius`;
    let followRadius = getRadius(follow, borderLabel);
    let leadRadius = getRadius(lead, borderLabel);
    if (followRadius === void 0 && leadRadius === void 0)
      continue;
    followRadius || (followRadius = 0);
    leadRadius || (leadRadius = 0);
    const canMix = followRadius === 0 || leadRadius === 0 || isPx(followRadius) === isPx(leadRadius);
    if (canMix) {
      target[borderLabel] = Math.max(mix(asNumber(followRadius), asNumber(leadRadius), progress3), 0);
      if (percent.test(leadRadius) || percent.test(followRadius)) {
        target[borderLabel] += "%";
      }
    } else {
      target[borderLabel] = leadRadius;
    }
  }
  if (follow.rotate || lead.rotate) {
    target.rotate = mix(follow.rotate || 0, lead.rotate || 0, progress3);
  }
}
function getRadius(values, radiusName) {
  var _a;
  return (_a = values[radiusName]) !== null && _a !== void 0 ? _a : values.borderRadius;
}
var easeCrossfadeIn = compress(0, 0.5, circOut);
var easeCrossfadeOut = compress(0.5, 0.95, linear);
function compress(min, max, easing) {
  return (p4) => {
    if (p4 < min)
      return 0;
    if (p4 > max)
      return 1;
    return easing(progress(min, max, p4));
  };
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/geometry/copy.mjs
init_define_process();
function copyAxisInto(axis, originAxis) {
  axis.min = originAxis.min;
  axis.max = originAxis.max;
}
function copyBoxInto(box, originBox) {
  copyAxisInto(box.x, originBox.x);
  copyAxisInto(box.y, originBox.y);
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/geometry/delta-remove.mjs
init_define_process();
function removePointDelta(point2, translate, scale2, originPoint, boxScale) {
  point2 -= translate;
  point2 = scalePoint(point2, 1 / scale2, originPoint);
  if (boxScale !== void 0) {
    point2 = scalePoint(point2, 1 / boxScale, originPoint);
  }
  return point2;
}
function removeAxisDelta(axis, translate = 0, scale2 = 1, origin = 0.5, boxScale, originAxis = axis, sourceAxis = axis) {
  if (percent.test(translate)) {
    translate = parseFloat(translate);
    const relativeProgress = mix(sourceAxis.min, sourceAxis.max, translate / 100);
    translate = relativeProgress - sourceAxis.min;
  }
  if (typeof translate !== "number")
    return;
  let originPoint = mix(originAxis.min, originAxis.max, origin);
  if (axis === originAxis)
    originPoint -= translate;
  axis.min = removePointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = removePointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function removeAxisTransforms(axis, transforms2, [key, scaleKey, originKey], origin, sourceAxis) {
  removeAxisDelta(axis, transforms2[key], transforms2[scaleKey], transforms2[originKey], transforms2.scale, origin, sourceAxis);
}
var xKeys2 = ["x", "scaleX", "originX"];
var yKeys2 = ["y", "scaleY", "originY"];
function removeBoxTransforms(box, transforms2, originBox, sourceBox) {
  removeAxisTransforms(box.x, transforms2, xKeys2, originBox === null || originBox === void 0 ? void 0 : originBox.x, sourceBox === null || sourceBox === void 0 ? void 0 : sourceBox.x);
  removeAxisTransforms(box.y, transforms2, yKeys2, originBox === null || originBox === void 0 ? void 0 : originBox.y, sourceBox === null || sourceBox === void 0 ? void 0 : sourceBox.y);
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/geometry/utils.mjs
init_define_process();
function isAxisDeltaZero(delta) {
  return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero(delta) {
  return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
function boxEquals(a5, b5) {
  return a5.x.min === b5.x.min && a5.x.max === b5.x.max && a5.y.min === b5.y.min && a5.y.max === b5.y.max;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/shared/stack.mjs
init_define_process();
var NodeStack = class {
  constructor() {
    this.members = [];
  }
  add(node) {
    addUniqueItem(this.members, node);
    node.scheduleRender();
  }
  remove(node) {
    removeItem(this.members, node);
    if (node === this.prevLead) {
      this.prevLead = void 0;
    }
    if (node === this.lead) {
      const prevLead = this.members[this.members.length - 1];
      if (prevLead) {
        this.promote(prevLead);
      }
    }
  }
  relegate(node) {
    const indexOfNode = this.members.findIndex((member) => node === member);
    if (indexOfNode === 0)
      return false;
    let prevLead;
    for (let i4 = indexOfNode; i4 >= 0; i4--) {
      const member = this.members[i4];
      if (member.isPresent !== false) {
        prevLead = member;
        break;
      }
    }
    if (prevLead) {
      this.promote(prevLead);
      return true;
    } else {
      return false;
    }
  }
  promote(node, preserveFollowOpacity) {
    var _a;
    const prevLead = this.lead;
    if (node === prevLead)
      return;
    this.prevLead = prevLead;
    this.lead = node;
    node.show();
    if (prevLead) {
      prevLead.instance && prevLead.scheduleRender();
      node.scheduleRender();
      node.resumeFrom = prevLead;
      if (preserveFollowOpacity) {
        node.resumeFrom.preserveOpacity = true;
      }
      if (prevLead.snapshot) {
        node.snapshot = prevLead.snapshot;
        node.snapshot.latestValues = prevLead.animationValues || prevLead.latestValues;
        node.snapshot.isShared = true;
      }
      if ((_a = node.root) === null || _a === void 0 ? void 0 : _a.isUpdating) {
        node.isLayoutDirty = true;
      }
      const { crossfade } = node.options;
      if (crossfade === false) {
        prevLead.hide();
      }
    }
  }
  exitAnimationComplete() {
    this.members.forEach((node) => {
      var _a, _b, _c, _d, _e;
      (_b = (_a = node.options).onExitComplete) === null || _b === void 0 ? void 0 : _b.call(_a);
      (_e = (_c = node.resumingFrom) === null || _c === void 0 ? void 0 : (_d = _c.options).onExitComplete) === null || _e === void 0 ? void 0 : _e.call(_d);
    });
  }
  scheduleRender() {
    this.members.forEach((node) => {
      node.instance && node.scheduleRender(false);
    });
  }
  removeLeadSnapshot() {
    if (this.lead && this.lead.snapshot) {
      this.lead.snapshot = void 0;
    }
  }
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/styles/transform.mjs
init_define_process();
var identityProjection = "translate3d(0px, 0px, 0) scale(1, 1) scale(1, 1)";
function buildProjectionTransform(delta, treeScale, latestTransform) {
  const xTranslate = delta.x.translate / treeScale.x;
  const yTranslate = delta.y.translate / treeScale.y;
  let transform2 = `translate3d(${xTranslate}px, ${yTranslate}px, 0) `;
  transform2 += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
  if (latestTransform) {
    const { rotate, rotateX, rotateY } = latestTransform;
    if (rotate)
      transform2 += `rotate(${rotate}deg) `;
    if (rotateX)
      transform2 += `rotateX(${rotateX}deg) `;
    if (rotateY)
      transform2 += `rotateY(${rotateY}deg) `;
  }
  const elementScaleX = delta.x.scale * treeScale.x;
  const elementScaleY = delta.y.scale * treeScale.y;
  transform2 += `scale(${elementScaleX}, ${elementScaleY})`;
  return transform2 === identityProjection ? "none" : transform2;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/utils/flat-tree.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/utils/compare-by-depth.mjs
init_define_process();
var compareByDepth = (a5, b5) => a5.depth - b5.depth;

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/utils/flat-tree.mjs
var FlatTree = class {
  constructor() {
    this.children = [];
    this.isDirty = false;
  }
  add(child) {
    addUniqueItem(this.children, child);
    this.isDirty = true;
  }
  remove(child) {
    removeItem(this.children, child);
    this.isDirty = true;
  }
  forEach(callback) {
    this.isDirty && this.children.sort(compareByDepth);
    this.isDirty = false;
    this.children.forEach(callback);
  }
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/node/create-projection-node.mjs
var animationTarget = 1e3;
function createProjectionNode({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform }) {
  return class ProjectionNode {
    constructor(id3, latestValues = {}, parent = defaultParent === null || defaultParent === void 0 ? void 0 : defaultParent()) {
      this.children = /* @__PURE__ */ new Set();
      this.options = {};
      this.isTreeAnimating = false;
      this.isAnimationBlocked = false;
      this.isLayoutDirty = false;
      this.updateManuallyBlocked = false;
      this.updateBlockedByResize = false;
      this.isUpdating = false;
      this.isSVG = false;
      this.needsReset = false;
      this.shouldResetTransform = false;
      this.treeScale = { x: 1, y: 1 };
      this.eventHandlers = /* @__PURE__ */ new Map();
      this.potentialNodes = /* @__PURE__ */ new Map();
      this.checkUpdateFailed = () => {
        if (this.isUpdating) {
          this.isUpdating = false;
          this.clearAllSnapshots();
        }
      };
      this.updateProjection = () => {
        this.nodes.forEach(resolveTargetDelta);
        this.nodes.forEach(calcProjection);
      };
      this.hasProjected = false;
      this.isVisible = true;
      this.animationProgress = 0;
      this.sharedNodes = /* @__PURE__ */ new Map();
      this.id = id3;
      this.latestValues = latestValues;
      this.root = parent ? parent.root || parent : this;
      this.path = parent ? [...parent.path, parent] : [];
      this.parent = parent;
      this.depth = parent ? parent.depth + 1 : 0;
      id3 && this.root.registerPotentialNode(id3, this);
      for (let i4 = 0; i4 < this.path.length; i4++) {
        this.path[i4].shouldResetTransform = true;
      }
      if (this.root === this)
        this.nodes = new FlatTree();
    }
    addEventListener(name, handler) {
      if (!this.eventHandlers.has(name)) {
        this.eventHandlers.set(name, new SubscriptionManager());
      }
      return this.eventHandlers.get(name).add(handler);
    }
    notifyListeners(name, ...args) {
      const subscriptionManager = this.eventHandlers.get(name);
      subscriptionManager === null || subscriptionManager === void 0 ? void 0 : subscriptionManager.notify(...args);
    }
    hasListeners(name) {
      return this.eventHandlers.has(name);
    }
    registerPotentialNode(id3, node) {
      this.potentialNodes.set(id3, node);
    }
    mount(instance, isLayoutDirty = false) {
      var _a;
      if (this.instance)
        return;
      this.isSVG = instance instanceof SVGElement && instance.tagName !== "svg";
      this.instance = instance;
      const { layoutId, layout, visualElement: visualElement2 } = this.options;
      if (visualElement2 && !visualElement2.getInstance()) {
        visualElement2.mount(instance);
      }
      this.root.nodes.add(this);
      (_a = this.parent) === null || _a === void 0 ? void 0 : _a.children.add(this);
      this.id && this.root.potentialNodes.delete(this.id);
      if (isLayoutDirty && (layout || layoutId)) {
        this.isLayoutDirty = true;
      }
      if (attachResizeListener) {
        let unblockTimeout;
        const resizeUnblockUpdate = () => this.root.updateBlockedByResize = false;
        attachResizeListener(instance, () => {
          this.root.updateBlockedByResize = true;
          clearTimeout(unblockTimeout);
          unblockTimeout = window.setTimeout(resizeUnblockUpdate, 250);
          if (globalProjectionState.hasAnimatedSinceResize) {
            globalProjectionState.hasAnimatedSinceResize = false;
            this.nodes.forEach(finishAnimation);
          }
        });
      }
      if (layoutId) {
        this.root.registerSharedNode(layoutId, this);
      }
      if (this.options.animate !== false && visualElement2 && (layoutId || layout)) {
        this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeTargetChanged, layout: newLayout }) => {
          var _a2, _b, _c, _d, _e;
          if (this.isTreeAnimationBlocked()) {
            this.target = void 0;
            this.relativeTarget = void 0;
            return;
          }
          const layoutTransition = (_b = (_a2 = this.options.transition) !== null && _a2 !== void 0 ? _a2 : visualElement2.getDefaultTransition()) !== null && _b !== void 0 ? _b : defaultLayoutTransition;
          const { onLayoutAnimationStart, onLayoutAnimationComplete } = visualElement2.getProps();
          const targetChanged = !this.targetLayout || !boxEquals(this.targetLayout, newLayout) || hasRelativeTargetChanged;
          const hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeTargetChanged;
          if (((_c = this.resumeFrom) === null || _c === void 0 ? void 0 : _c.instance) || hasOnlyRelativeTargetChanged || hasLayoutChanged && (targetChanged || !this.currentAnimation)) {
            if (this.resumeFrom) {
              this.resumingFrom = this.resumeFrom;
              this.resumingFrom.resumingFrom = void 0;
            }
            this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
            const animationOptions = Object.assign(Object.assign({}, getValueTransition(layoutTransition, "layout")), { onPlay: onLayoutAnimationStart, onComplete: onLayoutAnimationComplete });
            if (visualElement2.shouldReduceMotion) {
              animationOptions.delay = 0;
              animationOptions.type = false;
            }
            this.startAnimation(animationOptions);
          } else {
            if (!hasLayoutChanged && this.animationProgress === 0) {
              this.finishAnimation();
            }
            this.isLead() && ((_e = (_d = this.options).onExitComplete) === null || _e === void 0 ? void 0 : _e.call(_d));
          }
          this.targetLayout = newLayout;
        });
      }
    }
    unmount() {
      var _a, _b;
      this.options.layoutId && this.willUpdate();
      this.root.nodes.remove(this);
      (_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.remove(this);
      (_b = this.parent) === null || _b === void 0 ? void 0 : _b.children.delete(this);
      this.instance = void 0;
      cancelSync.preRender(this.updateProjection);
    }
    blockUpdate() {
      this.updateManuallyBlocked = true;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = false;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      var _a;
      return this.isAnimationBlocked || ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.isTreeAnimationBlocked()) || false;
    }
    startUpdate() {
      var _a;
      if (this.isUpdateBlocked())
        return;
      this.isUpdating = true;
      (_a = this.nodes) === null || _a === void 0 ? void 0 : _a.forEach(resetRotation);
    }
    willUpdate(shouldNotifyListeners = true) {
      var _a, _b, _c;
      if (this.root.isUpdateBlocked()) {
        (_b = (_a = this.options).onExitComplete) === null || _b === void 0 ? void 0 : _b.call(_a);
        return;
      }
      !this.root.isUpdating && this.root.startUpdate();
      if (this.isLayoutDirty)
        return;
      this.isLayoutDirty = true;
      for (let i4 = 0; i4 < this.path.length; i4++) {
        const node = this.path[i4];
        node.shouldResetTransform = true;
        node.updateScroll();
      }
      const { layoutId, layout } = this.options;
      if (layoutId === void 0 && !layout)
        return;
      const transformTemplate = (_c = this.options.visualElement) === null || _c === void 0 ? void 0 : _c.getProps().transformTemplate;
      this.prevTransformTemplateValue = transformTemplate === null || transformTemplate === void 0 ? void 0 : transformTemplate(this.latestValues, "");
      this.updateSnapshot();
      shouldNotifyListeners && this.notifyListeners("willUpdate");
    }
    didUpdate() {
      const updateWasBlocked = this.isUpdateBlocked();
      if (updateWasBlocked) {
        this.unblockUpdate();
        this.clearAllSnapshots();
        this.nodes.forEach(clearMeasurements);
        return;
      }
      if (!this.isUpdating)
        return;
      this.isUpdating = false;
      if (this.potentialNodes.size) {
        this.potentialNodes.forEach(mountNodeEarly);
        this.potentialNodes.clear();
      }
      this.nodes.forEach(resetTransformStyle);
      this.nodes.forEach(updateLayout);
      this.nodes.forEach(notifyLayoutUpdate);
      this.clearAllSnapshots();
      flushSync.update();
      flushSync.preRender();
      flushSync.render();
    }
    clearAllSnapshots() {
      this.nodes.forEach(clearSnapshot);
      this.sharedNodes.forEach(removeLeadSnapshots);
    }
    scheduleUpdateProjection() {
      es_default.preRender(this.updateProjection, false, true);
    }
    scheduleCheckAfterUnmount() {
      es_default.postRender(() => {
        if (this.isLayoutDirty) {
          this.root.didUpdate();
        } else {
          this.root.checkUpdateFailed();
        }
      });
    }
    updateSnapshot() {
      if (this.snapshot || !this.instance)
        return;
      const measured = this.measure();
      const layout = this.removeTransform(this.removeElementScroll(measured));
      roundBox(layout);
      this.snapshot = {
        measured,
        layout,
        latestValues: {}
      };
    }
    updateLayout() {
      var _a;
      if (!this.instance)
        return;
      this.updateScroll();
      if (!(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty) {
        return;
      }
      if (this.resumeFrom && !this.resumeFrom.instance) {
        for (let i4 = 0; i4 < this.path.length; i4++) {
          const node = this.path[i4];
          node.updateScroll();
        }
      }
      const measured = this.measure();
      roundBox(measured);
      const prevLayout = this.layout;
      this.layout = {
        measured,
        actual: this.removeElementScroll(measured)
      };
      this.layoutCorrected = createBox();
      this.isLayoutDirty = false;
      this.projectionDelta = void 0;
      this.notifyListeners("measure", this.layout.actual);
      (_a = this.options.visualElement) === null || _a === void 0 ? void 0 : _a.notifyLayoutMeasure(this.layout.actual, prevLayout === null || prevLayout === void 0 ? void 0 : prevLayout.actual);
    }
    updateScroll() {
      if (this.options.layoutScroll && this.instance) {
        this.isScrollRoot = checkIsScrollRoot(this.instance);
        this.scroll = measureScroll(this.instance);
      }
    }
    resetTransform() {
      var _a;
      if (!resetTransform)
        return;
      const isResetRequested = this.isLayoutDirty || this.shouldResetTransform;
      const hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta);
      const transformTemplate = (_a = this.options.visualElement) === null || _a === void 0 ? void 0 : _a.getProps().transformTemplate;
      const transformTemplateValue = transformTemplate === null || transformTemplate === void 0 ? void 0 : transformTemplate(this.latestValues, "");
      const transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
      if (isResetRequested && (hasProjection || hasTransform(this.latestValues) || transformTemplateHasChanged)) {
        resetTransform(this.instance, transformTemplateValue);
        this.shouldResetTransform = false;
        this.scheduleRender();
      }
    }
    measure() {
      const { visualElement: visualElement2 } = this.options;
      if (!visualElement2)
        return createBox();
      const box = visualElement2.measureViewportBox();
      const { scroll: scroll2 } = this.root;
      if (scroll2) {
        translateAxis(box.x, scroll2.x);
        translateAxis(box.y, scroll2.y);
      }
      return box;
    }
    removeElementScroll(box) {
      const boxWithoutScroll = createBox();
      copyBoxInto(boxWithoutScroll, box);
      for (let i4 = 0; i4 < this.path.length; i4++) {
        const node = this.path[i4];
        const { scroll: scroll2, options, isScrollRoot } = node;
        if (node !== this.root && scroll2 && options.layoutScroll) {
          if (isScrollRoot) {
            copyBoxInto(boxWithoutScroll, box);
            const { scroll: rootScroll } = this.root;
            if (rootScroll) {
              translateAxis(boxWithoutScroll.x, -rootScroll.x);
              translateAxis(boxWithoutScroll.y, -rootScroll.y);
            }
          }
          translateAxis(boxWithoutScroll.x, scroll2.x);
          translateAxis(boxWithoutScroll.y, scroll2.y);
        }
      }
      return boxWithoutScroll;
    }
    applyTransform(box, transformOnly = false) {
      const withTransforms = createBox();
      copyBoxInto(withTransforms, box);
      for (let i4 = 0; i4 < this.path.length; i4++) {
        const node = this.path[i4];
        if (!transformOnly && node.options.layoutScroll && node.scroll && node !== node.root) {
          transformBox(withTransforms, {
            x: -node.scroll.x,
            y: -node.scroll.y
          });
        }
        if (!hasTransform(node.latestValues))
          continue;
        transformBox(withTransforms, node.latestValues);
      }
      if (hasTransform(this.latestValues)) {
        transformBox(withTransforms, this.latestValues);
      }
      return withTransforms;
    }
    removeTransform(box) {
      var _a;
      const boxWithoutTransform = createBox();
      copyBoxInto(boxWithoutTransform, box);
      for (let i4 = 0; i4 < this.path.length; i4++) {
        const node = this.path[i4];
        if (!node.instance)
          continue;
        if (!hasTransform(node.latestValues))
          continue;
        hasScale(node.latestValues) && node.updateSnapshot();
        const sourceBox = createBox();
        const nodeBox = node.measure();
        copyBoxInto(sourceBox, nodeBox);
        removeBoxTransforms(boxWithoutTransform, node.latestValues, (_a = node.snapshot) === null || _a === void 0 ? void 0 : _a.layout, sourceBox);
      }
      if (hasTransform(this.latestValues)) {
        removeBoxTransforms(boxWithoutTransform, this.latestValues);
      }
      return boxWithoutTransform;
    }
    setTargetDelta(delta) {
      this.targetDelta = delta;
      this.root.scheduleUpdateProjection();
    }
    setOptions(options) {
      var _a;
      this.options = Object.assign(Object.assign(Object.assign({}, this.options), options), { crossfade: (_a = options.crossfade) !== null && _a !== void 0 ? _a : true });
    }
    clearMeasurements() {
      this.scroll = void 0;
      this.layout = void 0;
      this.snapshot = void 0;
      this.prevTransformTemplateValue = void 0;
      this.targetDelta = void 0;
      this.target = void 0;
      this.isLayoutDirty = false;
    }
    resolveTargetDelta() {
      var _a;
      const { layout, layoutId } = this.options;
      if (!this.layout || !(layout || layoutId))
        return;
      if (!this.targetDelta && !this.relativeTarget) {
        this.relativeParent = this.getClosestProjectingParent();
        if (this.relativeParent && this.relativeParent.layout) {
          this.relativeTarget = createBox();
          this.relativeTargetOrigin = createBox();
          calcRelativePosition(this.relativeTargetOrigin, this.layout.actual, this.relativeParent.layout.actual);
          copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        }
      }
      if (!this.relativeTarget && !this.targetDelta)
        return;
      if (!this.target) {
        this.target = createBox();
        this.targetWithTransforms = createBox();
      }
      if (this.relativeTarget && this.relativeTargetOrigin && ((_a = this.relativeParent) === null || _a === void 0 ? void 0 : _a.target)) {
        calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target);
      } else if (this.targetDelta) {
        if (Boolean(this.resumingFrom)) {
          this.target = this.applyTransform(this.layout.actual);
        } else {
          copyBoxInto(this.target, this.layout.actual);
        }
        applyBoxDelta(this.target, this.targetDelta);
      } else {
        copyBoxInto(this.target, this.layout.actual);
      }
      if (this.attemptToResolveRelativeTarget) {
        this.attemptToResolveRelativeTarget = false;
        this.relativeParent = this.getClosestProjectingParent();
        if (this.relativeParent && Boolean(this.relativeParent.resumingFrom) === Boolean(this.resumingFrom) && !this.relativeParent.options.layoutScroll && this.relativeParent.target) {
          this.relativeTarget = createBox();
          this.relativeTargetOrigin = createBox();
          calcRelativePosition(this.relativeTargetOrigin, this.target, this.relativeParent.target);
          copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        }
      }
    }
    getClosestProjectingParent() {
      if (!this.parent || hasTransform(this.parent.latestValues))
        return void 0;
      if ((this.parent.relativeTarget || this.parent.targetDelta) && this.parent.layout) {
        return this.parent;
      } else {
        return this.parent.getClosestProjectingParent();
      }
    }
    calcProjection() {
      var _a;
      const { layout, layoutId } = this.options;
      this.isTreeAnimating = Boolean(((_a = this.parent) === null || _a === void 0 ? void 0 : _a.isTreeAnimating) || this.currentAnimation || this.pendingAnimation);
      if (!this.isTreeAnimating) {
        this.targetDelta = this.relativeTarget = void 0;
      }
      if (!this.layout || !(layout || layoutId))
        return;
      const lead = this.getLead();
      copyBoxInto(this.layoutCorrected, this.layout.actual);
      applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, Boolean(this.resumingFrom) || this !== lead);
      const { target } = lead;
      if (!target)
        return;
      if (!this.projectionDelta) {
        this.projectionDelta = createDelta();
        this.projectionDeltaWithTransform = createDelta();
      }
      const prevTreeScaleX = this.treeScale.x;
      const prevTreeScaleY = this.treeScale.y;
      const prevProjectionTransform = this.projectionTransform;
      calcBoxDelta(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
      this.projectionTransform = buildProjectionTransform(this.projectionDelta, this.treeScale);
      if (this.projectionTransform !== prevProjectionTransform || this.treeScale.x !== prevTreeScaleX || this.treeScale.y !== prevTreeScaleY) {
        this.hasProjected = true;
        this.scheduleRender();
        this.notifyListeners("projectionUpdate", target);
      }
    }
    hide() {
      this.isVisible = false;
    }
    show() {
      this.isVisible = true;
    }
    scheduleRender(notifyAll2 = true) {
      var _a, _b, _c;
      (_b = (_a = this.options).scheduleRender) === null || _b === void 0 ? void 0 : _b.call(_a);
      notifyAll2 && ((_c = this.getStack()) === null || _c === void 0 ? void 0 : _c.scheduleRender());
      if (this.resumingFrom && !this.resumingFrom.instance) {
        this.resumingFrom = void 0;
      }
    }
    setAnimationOrigin(delta, hasOnlyRelativeTargetChanged = false) {
      var _a;
      const snapshot = this.snapshot;
      const snapshotLatestValues = (snapshot === null || snapshot === void 0 ? void 0 : snapshot.latestValues) || {};
      const mixedValues = Object.assign({}, this.latestValues);
      const targetDelta = createDelta();
      this.relativeTarget = this.relativeTargetOrigin = void 0;
      this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
      const relativeLayout = createBox();
      const isSharedLayoutAnimation = snapshot === null || snapshot === void 0 ? void 0 : snapshot.isShared;
      const isOnlyMember = (((_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.members.length) || 0) <= 1;
      const shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation && !isOnlyMember && this.options.crossfade === true && !this.path.some(hasOpacityCrossfade));
      this.animationProgress = 0;
      this.mixTargetDelta = (latest) => {
        var _a2;
        const progress3 = latest / 1e3;
        mixAxisDelta(targetDelta.x, delta.x, progress3);
        mixAxisDelta(targetDelta.y, delta.y, progress3);
        this.setTargetDelta(targetDelta);
        if (this.relativeTarget && this.relativeTargetOrigin && this.layout && ((_a2 = this.relativeParent) === null || _a2 === void 0 ? void 0 : _a2.layout)) {
          calcRelativePosition(relativeLayout, this.layout.actual, this.relativeParent.layout.actual);
          mixBox(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress3);
        }
        if (isSharedLayoutAnimation) {
          this.animationValues = mixedValues;
          mixValues(mixedValues, snapshotLatestValues, this.latestValues, progress3, shouldCrossfadeOpacity, isOnlyMember);
        }
        this.root.scheduleUpdateProjection();
        this.scheduleRender();
        this.animationProgress = progress3;
      };
      this.mixTargetDelta(0);
    }
    startAnimation(options) {
      var _a, _b;
      this.notifyListeners("animationStart");
      (_a = this.currentAnimation) === null || _a === void 0 ? void 0 : _a.stop();
      if (this.resumingFrom) {
        (_b = this.resumingFrom.currentAnimation) === null || _b === void 0 ? void 0 : _b.stop();
      }
      if (this.pendingAnimation) {
        cancelSync.update(this.pendingAnimation);
        this.pendingAnimation = void 0;
      }
      this.pendingAnimation = es_default.update(() => {
        globalProjectionState.hasAnimatedSinceResize = true;
        this.currentAnimation = animate2(0, animationTarget, Object.assign(Object.assign({}, options), { onUpdate: (latest) => {
          var _a2;
          this.mixTargetDelta(latest);
          (_a2 = options.onUpdate) === null || _a2 === void 0 ? void 0 : _a2.call(options, latest);
        }, onComplete: () => {
          var _a2;
          (_a2 = options.onComplete) === null || _a2 === void 0 ? void 0 : _a2.call(options);
          this.completeAnimation();
        } }));
        if (this.resumingFrom) {
          this.resumingFrom.currentAnimation = this.currentAnimation;
        }
        this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      var _a;
      if (this.resumingFrom) {
        this.resumingFrom.currentAnimation = void 0;
        this.resumingFrom.preserveOpacity = void 0;
      }
      (_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.exitAnimationComplete();
      this.resumingFrom = this.currentAnimation = this.animationValues = void 0;
      this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      var _a;
      if (this.currentAnimation) {
        (_a = this.mixTargetDelta) === null || _a === void 0 ? void 0 : _a.call(this, animationTarget);
        this.currentAnimation.stop();
      }
      this.completeAnimation();
    }
    applyTransformsToTarget() {
      const { targetWithTransforms, target, layout, latestValues } = this.getLead();
      if (!targetWithTransforms || !target || !layout)
        return;
      copyBoxInto(targetWithTransforms, target);
      transformBox(targetWithTransforms, latestValues);
      calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
    }
    registerSharedNode(layoutId, node) {
      var _a, _b, _c;
      if (!this.sharedNodes.has(layoutId)) {
        this.sharedNodes.set(layoutId, new NodeStack());
      }
      const stack = this.sharedNodes.get(layoutId);
      stack.add(node);
      node.promote({
        transition: (_a = node.options.initialPromotionConfig) === null || _a === void 0 ? void 0 : _a.transition,
        preserveFollowOpacity: (_c = (_b = node.options.initialPromotionConfig) === null || _b === void 0 ? void 0 : _b.shouldPreserveFollowOpacity) === null || _c === void 0 ? void 0 : _c.call(_b, node)
      });
    }
    isLead() {
      const stack = this.getStack();
      return stack ? stack.lead === this : true;
    }
    getLead() {
      var _a;
      const { layoutId } = this.options;
      return layoutId ? ((_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.lead) || this : this;
    }
    getPrevLead() {
      var _a;
      const { layoutId } = this.options;
      return layoutId ? (_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.prevLead : void 0;
    }
    getStack() {
      const { layoutId } = this.options;
      if (layoutId)
        return this.root.sharedNodes.get(layoutId);
    }
    promote({ needsReset, transition, preserveFollowOpacity } = {}) {
      const stack = this.getStack();
      if (stack)
        stack.promote(this, preserveFollowOpacity);
      if (needsReset) {
        this.projectionDelta = void 0;
        this.needsReset = true;
      }
      if (transition)
        this.setOptions({ transition });
    }
    relegate() {
      const stack = this.getStack();
      if (stack) {
        return stack.relegate(this);
      } else {
        return false;
      }
    }
    resetRotation() {
      const { visualElement: visualElement2 } = this.options;
      if (!visualElement2)
        return;
      let hasRotate = false;
      const resetValues = {};
      for (let i4 = 0; i4 < transformAxes.length; i4++) {
        const axis = transformAxes[i4];
        const key = "rotate" + axis;
        if (!visualElement2.getStaticValue(key)) {
          continue;
        }
        hasRotate = true;
        resetValues[key] = visualElement2.getStaticValue(key);
        visualElement2.setStaticValue(key, 0);
      }
      if (!hasRotate)
        return;
      visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.syncRender();
      for (const key in resetValues) {
        visualElement2.setStaticValue(key, resetValues[key]);
      }
      visualElement2.scheduleRender();
    }
    getProjectionStyles(styleProp = {}) {
      var _a, _b, _c, _d, _e, _f;
      const styles = {};
      if (!this.instance || this.isSVG)
        return styles;
      if (!this.isVisible) {
        return { visibility: "hidden" };
      } else {
        styles.visibility = "";
      }
      const transformTemplate = (_a = this.options.visualElement) === null || _a === void 0 ? void 0 : _a.getProps().transformTemplate;
      if (this.needsReset) {
        this.needsReset = false;
        styles.opacity = "";
        styles.pointerEvents = resolveMotionValue(styleProp.pointerEvents) || "";
        styles.transform = transformTemplate ? transformTemplate(this.latestValues, "") : "none";
        return styles;
      }
      const lead = this.getLead();
      if (!this.projectionDelta || !this.layout || !lead.target) {
        const emptyStyles = {};
        if (this.options.layoutId) {
          emptyStyles.opacity = (_b = this.latestValues.opacity) !== null && _b !== void 0 ? _b : 1;
          emptyStyles.pointerEvents = resolveMotionValue(styleProp.pointerEvents) || "";
        }
        if (this.hasProjected && !hasTransform(this.latestValues)) {
          emptyStyles.transform = transformTemplate ? transformTemplate({}, "") : "none";
          this.hasProjected = false;
        }
        return emptyStyles;
      }
      const valuesToRender = lead.animationValues || lead.latestValues;
      this.applyTransformsToTarget();
      styles.transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
      if (transformTemplate) {
        styles.transform = transformTemplate(valuesToRender, styles.transform);
      }
      const { x: x5, y: y4 } = this.projectionDelta;
      styles.transformOrigin = `${x5.origin * 100}% ${y4.origin * 100}% 0`;
      if (lead.animationValues) {
        styles.opacity = lead === this ? (_d = (_c = valuesToRender.opacity) !== null && _c !== void 0 ? _c : this.latestValues.opacity) !== null && _d !== void 0 ? _d : 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
      } else {
        styles.opacity = lead === this ? (_e = valuesToRender.opacity) !== null && _e !== void 0 ? _e : "" : (_f = valuesToRender.opacityExit) !== null && _f !== void 0 ? _f : 0;
      }
      for (const key in scaleCorrectors) {
        if (valuesToRender[key] === void 0)
          continue;
        const { correct, applyTo } = scaleCorrectors[key];
        const corrected = correct(valuesToRender[key], lead);
        if (applyTo) {
          const num = applyTo.length;
          for (let i4 = 0; i4 < num; i4++) {
            styles[applyTo[i4]] = corrected;
          }
        } else {
          styles[key] = corrected;
        }
      }
      if (this.options.layoutId) {
        styles.pointerEvents = lead === this ? resolveMotionValue(styleProp.pointerEvents) || "" : "none";
      }
      return styles;
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      this.root.nodes.forEach((node) => {
        var _a;
        return (_a = node.currentAnimation) === null || _a === void 0 ? void 0 : _a.stop();
      });
      this.root.nodes.forEach(clearMeasurements);
      this.root.sharedNodes.clear();
    }
  };
}
function updateLayout(node) {
  node.updateLayout();
}
function notifyLayoutUpdate(node) {
  var _a, _b, _c, _d;
  const snapshot = (_b = (_a = node.resumeFrom) === null || _a === void 0 ? void 0 : _a.snapshot) !== null && _b !== void 0 ? _b : node.snapshot;
  if (node.isLead() && node.layout && snapshot && node.hasListeners("didUpdate")) {
    const { actual: layout, measured: measuredLayout } = node.layout;
    if (node.options.animationType === "size") {
      eachAxis((axis) => {
        const axisSnapshot = snapshot.isShared ? snapshot.measured[axis] : snapshot.layout[axis];
        const length2 = calcLength(axisSnapshot);
        axisSnapshot.min = layout[axis].min;
        axisSnapshot.max = axisSnapshot.min + length2;
      });
    } else if (node.options.animationType === "position") {
      eachAxis((axis) => {
        const axisSnapshot = snapshot.isShared ? snapshot.measured[axis] : snapshot.layout[axis];
        const length2 = calcLength(layout[axis]);
        axisSnapshot.max = axisSnapshot.min + length2;
      });
    }
    const layoutDelta = createDelta();
    calcBoxDelta(layoutDelta, layout, snapshot.layout);
    const visualDelta = createDelta();
    if (snapshot.isShared) {
      calcBoxDelta(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measured);
    } else {
      calcBoxDelta(visualDelta, layout, snapshot.layout);
    }
    const hasLayoutChanged = !isDeltaZero(layoutDelta);
    let hasRelativeTargetChanged = false;
    if (!node.resumeFrom) {
      node.relativeParent = node.getClosestProjectingParent();
      if (node.relativeParent && !node.relativeParent.resumeFrom) {
        const { snapshot: parentSnapshot, layout: parentLayout } = node.relativeParent;
        if (parentSnapshot && parentLayout) {
          const relativeSnapshot = createBox();
          calcRelativePosition(relativeSnapshot, snapshot.layout, parentSnapshot.layout);
          const relativeLayout = createBox();
          calcRelativePosition(relativeLayout, layout, parentLayout.actual);
          if (!boxEquals(relativeSnapshot, relativeLayout)) {
            hasRelativeTargetChanged = true;
          }
        }
      }
    }
    node.notifyListeners("didUpdate", {
      layout,
      snapshot,
      delta: visualDelta,
      layoutDelta,
      hasLayoutChanged,
      hasRelativeTargetChanged
    });
  } else if (node.isLead()) {
    (_d = (_c = node.options).onExitComplete) === null || _d === void 0 ? void 0 : _d.call(_c);
  }
  node.options.transition = void 0;
}
function clearSnapshot(node) {
  node.clearSnapshot();
}
function clearMeasurements(node) {
  node.clearMeasurements();
}
function resetTransformStyle(node) {
  const { visualElement: visualElement2 } = node.options;
  if (visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.getProps().onBeforeLayoutMeasure) {
    visualElement2.notifyBeforeLayoutMeasure();
  }
  node.resetTransform();
}
function finishAnimation(node) {
  node.finishAnimation();
  node.targetDelta = node.relativeTarget = node.target = void 0;
}
function resolveTargetDelta(node) {
  node.resolveTargetDelta();
}
function calcProjection(node) {
  node.calcProjection();
}
function resetRotation(node) {
  node.resetRotation();
}
function removeLeadSnapshots(stack) {
  stack.removeLeadSnapshot();
}
function mixAxisDelta(output, delta, p4) {
  output.translate = mix(delta.translate, 0, p4);
  output.scale = mix(delta.scale, 1, p4);
  output.origin = delta.origin;
  output.originPoint = delta.originPoint;
}
function mixAxis(output, from, to, p4) {
  output.min = mix(from.min, to.min, p4);
  output.max = mix(from.max, to.max, p4);
}
function mixBox(output, from, to, p4) {
  mixAxis(output.x, from.x, to.x, p4);
  mixAxis(output.y, from.y, to.y, p4);
}
function hasOpacityCrossfade(node) {
  return node.animationValues && node.animationValues.opacityExit !== void 0;
}
var defaultLayoutTransition = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
};
function mountNodeEarly(node, id3) {
  let searchNode = node.root;
  for (let i4 = node.path.length - 1; i4 >= 0; i4--) {
    if (Boolean(node.path[i4].instance)) {
      searchNode = node.path[i4];
      break;
    }
  }
  const searchElement = searchNode && searchNode !== node.root ? searchNode.instance : document;
  const element = searchElement.querySelector(`[data-projection-id="${id3}"]`);
  if (element)
    node.mount(element, true);
}
function roundAxis(axis) {
  axis.min = Math.round(axis.min);
  axis.max = Math.round(axis.max);
}
function roundBox(box) {
  roundAxis(box.x);
  roundAxis(box.y);
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/node/DocumentProjectionNode.mjs
init_define_process();
var DocumentProjectionNode = createProjectionNode({
  attachResizeListener: (ref, notify2) => addDomEvent(ref, "resize", notify2),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => true
});

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs
var rootProjectionNode = {
  current: void 0
};
var HTMLProjectionNode = createProjectionNode({
  measureScroll: (instance) => ({
    x: instance.scrollLeft,
    y: instance.scrollTop
  }),
  defaultParent: () => {
    if (!rootProjectionNode.current) {
      const documentNode = new DocumentProjectionNode(0, {});
      documentNode.mount(window);
      documentNode.setOptions({ layoutScroll: true });
      rootProjectionNode.current = documentNode;
    }
    return rootProjectionNode.current;
  },
  resetTransform: (instance, value) => {
    instance.style.transform = value !== null && value !== void 0 ? value : "none";
  },
  checkIsScrollRoot: (instance) => Boolean(window.getComputedStyle(instance).position === "fixed")
});

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/motion.mjs
var featureBundle = Object.assign(Object.assign(Object.assign(Object.assign({}, animations), gestureAnimations), drag), layoutFeatures);
var motion = createMotionProxy((Component2, config) => createDomMotionConfig(Component2, config, featureBundle, createDomVisualElement, HTMLProjectionNode));
function createDomMotionComponent(key) {
  return createMotionComponent(createDomMotionConfig(key, { forwardMotionProps: false }, featureBundle, createDomVisualElement, HTMLProjectionNode));
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/motion-minimal.mjs
init_define_process();
var m4 = createMotionProxy(createDomMotionConfig);

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/use-force-update.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/use-is-mounted.mjs
init_define_process();
function useIsMounted() {
  const isMounted = useRef(false);
  useIsomorphicLayoutEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/use-force-update.mjs
function useForceUpdate() {
  const isMounted = useIsMounted();
  const [forcedRenderCount, setForcedRenderCount] = useState(0);
  const forceRender = useCallback(() => {
    isMounted.current && setForcedRenderCount(forcedRenderCount + 1);
  }, [forcedRenderCount]);
  const deferredForceRender = useCallback(() => es_default.postRender(forceRender), [forceRender]);
  return [deferredForceRender, forcedRenderCount];
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/components/AnimatePresence/PopChild.mjs
init_define_process();
var PopChildMeasure = class extends Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (element && prevProps.isPresent && !this.props.isPresent) {
      const size = this.props.sizeRef.current;
      size.height = element.offsetHeight || 0;
      size.width = element.offsetWidth || 0;
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
    }
    return null;
  }
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
};
function PopChild({ children, isPresent: isPresent2 }) {
  const id3 = useId();
  const ref = useRef(null);
  const size = useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0
  });
  useInsertionEffect(() => {
    var _a;
    const { width, height, top, left } = size.current;
    if (isPresent2 || !ref.current || !width || !height)
      return;
    ref.current.dataset.motionPopId = id3;
    const style2 = document.createElement("style");
    document.head.appendChild(style2);
    (_a = style2.sheet) === null || _a === void 0 ? void 0 : _a.insertRule(`
          [data-motion-pop-id="${id3}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            top: ${top}px !important;
            left: ${left}px !important;
          }
        `);
    return () => {
      document.head.removeChild(style2);
    };
  }, [isPresent2]);
  return createElement(PopChildMeasure, { isPresent: isPresent2, childRef: ref, sizeRef: size }, cloneElement(children, { ref }));
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.mjs
var PresenceChild = ({ children, initial, isPresent: isPresent2, onExitComplete, custom, presenceAffectsLayout, mode }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id3 = useId();
  const context = useMemo(
    () => ({
      id: id3,
      initial,
      isPresent: isPresent2,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    }),
    presenceAffectsLayout ? void 0 : [isPresent2]
  );
  useMemo(() => {
    presenceChildren.forEach((_4, key) => presenceChildren.set(key, false));
  }, [isPresent2]);
  useEffect(() => {
    !isPresent2 && !presenceChildren.size && (onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete());
  }, [isPresent2]);
  if (mode === "popLayout") {
    children = createElement(PopChild, { isPresent: isPresent2 }, children);
  }
  return createElement(PresenceContext.Provider, { value: context }, children);
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs
var getChildKey = (child) => child.key || "";
function updateChildLookup(children, allChildren) {
  children.forEach((child) => {
    const key = getChildKey(child);
    allChildren.set(key, child);
  });
}
function onlyElements(children) {
  const filtered = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
var AnimatePresence = ({ children, custom, initial = true, onExitComplete, exitBeforeEnter, presenceAffectsLayout = true, mode = "sync" }) => {
  if (exitBeforeEnter) {
    mode = "wait";
    warnOnce(false, "Replace exitBeforeEnter with mode='wait'");
  }
  let [forceRender] = useForceUpdate();
  const forceRenderLayoutGroup = useContext(LayoutGroupContext).forceRender;
  if (forceRenderLayoutGroup)
    forceRender = forceRenderLayoutGroup;
  const isMounted = useIsMounted();
  const filteredChildren = onlyElements(children);
  let childrenToRender = filteredChildren;
  const exiting = /* @__PURE__ */ new Set();
  const presentChildren = useRef(childrenToRender);
  const allChildren = useRef(/* @__PURE__ */ new Map()).current;
  const isInitialRender = useRef(true);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    updateChildLookup(filteredChildren, allChildren);
    presentChildren.current = childrenToRender;
  });
  useUnmountEffect(() => {
    isInitialRender.current = true;
    allChildren.clear();
    exiting.clear();
  });
  if (isInitialRender.current) {
    return createElement(p, null, childrenToRender.map((child) => createElement(PresenceChild, { key: getChildKey(child), isPresent: true, initial: initial ? void 0 : false, presenceAffectsLayout, mode }, child)));
  }
  childrenToRender = [...childrenToRender];
  const presentKeys = presentChildren.current.map(getChildKey);
  const targetKeys = filteredChildren.map(getChildKey);
  const numPresent = presentKeys.length;
  for (let i4 = 0; i4 < numPresent; i4++) {
    const key = presentKeys[i4];
    if (targetKeys.indexOf(key) === -1) {
      exiting.add(key);
    }
  }
  if (mode === "wait" && exiting.size) {
    childrenToRender = [];
  }
  exiting.forEach((key) => {
    if (targetKeys.indexOf(key) !== -1)
      return;
    const child = allChildren.get(key);
    if (!child)
      return;
    const insertionIndex = presentKeys.indexOf(key);
    const onExit = () => {
      allChildren.delete(key);
      exiting.delete(key);
      const removeIndex = presentChildren.current.findIndex((presentChild) => presentChild.key === key);
      presentChildren.current.splice(removeIndex, 1);
      if (!exiting.size) {
        presentChildren.current = filteredChildren;
        if (isMounted.current === false)
          return;
        forceRender();
        onExitComplete && onExitComplete();
      }
    };
    childrenToRender.splice(insertionIndex, 0, createElement(PresenceChild, { key: getChildKey(child), isPresent: false, onExitComplete: onExit, custom, presenceAffectsLayout, mode }, child));
  });
  childrenToRender = childrenToRender.map((child) => {
    const key = child.key;
    return exiting.has(key) ? child : createElement(PresenceChild, { key: getChildKey(child), isPresent: true, presenceAffectsLayout, mode }, child);
  });
  if (env !== "production" && mode === "wait" && childrenToRender.length > 1) {
    console.warn(`You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`);
  }
  return createElement(p, null, exiting.size ? childrenToRender : childrenToRender.map((child) => cloneElement(child)));
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/components/AnimateSharedLayout.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/components/LayoutGroup/index.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/context/DeprecatedLayoutGroupContext.mjs
init_define_process();
var DeprecatedLayoutGroupContext = createContext(null);

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/node/group.mjs
init_define_process();
var notify = (node) => !node.isLayoutDirty && node.willUpdate(false);
function nodeGroup() {
  const nodes = /* @__PURE__ */ new Set();
  const subscriptions = /* @__PURE__ */ new WeakMap();
  const dirtyAll = () => nodes.forEach(notify);
  return {
    add: (node) => {
      nodes.add(node);
      subscriptions.set(node, node.addEventListener("willUpdate", dirtyAll));
    },
    remove: (node) => {
      var _a;
      nodes.delete(node);
      (_a = subscriptions.get(node)) === null || _a === void 0 ? void 0 : _a();
      subscriptions.delete(node);
      dirtyAll();
    },
    dirty: dirtyAll
  };
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/components/LayoutGroup/index.mjs
var shouldInheritGroup = (inherit) => inherit === true;
var shouldInheritId = (inherit) => shouldInheritGroup(inherit === true) || inherit === "id";
var LayoutGroup = ({ children, id: id3, inheritId, inherit = true }) => {
  var _a, _b;
  if (inheritId !== void 0)
    inherit = inheritId;
  const layoutGroupContext = useContext(LayoutGroupContext);
  const deprecatedLayoutGroupContext = useContext(DeprecatedLayoutGroupContext);
  const [forceRender, key] = useForceUpdate();
  const context = useRef(null);
  const upstreamId = (_a = layoutGroupContext.id) !== null && _a !== void 0 ? _a : deprecatedLayoutGroupContext;
  if (context.current === null) {
    if (shouldInheritId(inherit) && upstreamId) {
      id3 = id3 ? upstreamId + "-" + id3 : upstreamId;
    }
    context.current = {
      id: id3,
      group: shouldInheritGroup(inherit) ? (_b = layoutGroupContext === null || layoutGroupContext === void 0 ? void 0 : layoutGroupContext.group) !== null && _b !== void 0 ? _b : nodeGroup() : nodeGroup()
    };
  }
  const memoizedContext = useMemo(() => Object.assign(Object.assign({}, context.current), { forceRender }), [key]);
  return createElement(LayoutGroupContext.Provider, { value: memoizedContext }, children);
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/components/AnimateSharedLayout.mjs
var id2 = 0;
var AnimateSharedLayout = ({ children }) => {
  useEffect(() => {
    warning(false, "AnimateSharedLayout is deprecated: https://www.framer.com/docs/guide-upgrade/##shared-layout-animations");
  }, []);
  return createElement(LayoutGroup, { id: useConstant(() => `asl-${id2++}`) }, children);
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/components/MotionConfig/index.mjs
init_define_process();
function MotionConfig(_a) {
  var { children, isValidProp } = _a, config = __rest(_a, ["children", "isValidProp"]);
  isValidProp && loadExternalIsValidProp(isValidProp);
  config = Object.assign(Object.assign({}, useContext(MotionConfigContext)), config);
  config.isStatic = useConstant(() => config.isStatic);
  const context = useMemo(() => config, [JSON.stringify(config.transition), config.transformPagePoint, config.reducedMotion]);
  return createElement(MotionConfigContext.Provider, { value: context }, children);
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/components/LazyMotion/index.mjs
init_define_process();
function LazyMotion({ children, features, strict = false }) {
  const [, setIsLoaded] = useState(!isLazyBundle(features));
  const loadedRenderer = useRef(void 0);
  if (!isLazyBundle(features)) {
    const { renderer } = features, loadedFeatures = __rest(features, ["renderer"]);
    loadedRenderer.current = renderer;
    loadFeatures(loadedFeatures);
  }
  useEffect(() => {
    if (isLazyBundle(features)) {
      features().then((_a) => {
        var { renderer } = _a, loadedFeatures = __rest(_a, ["renderer"]);
        loadFeatures(loadedFeatures);
        loadedRenderer.current = renderer;
        setIsLoaded(true);
      });
    }
  }, []);
  return createElement(LazyContext.Provider, { value: { renderer: loadedRenderer.current, strict } }, children);
}
function isLazyBundle(features) {
  return typeof features === "function";
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/components/Reorder/index.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/components/Reorder/Group.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/context/ReorderContext.mjs
init_define_process();
var ReorderContext = createContext(null);

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/components/Reorder/utils/check-reorder.mjs
init_define_process();
function checkReorder(order3, value, offset, velocity) {
  if (!velocity)
    return order3;
  const index = order3.findIndex((item2) => item2.value === value);
  if (index === -1)
    return order3;
  const nextOffset = velocity > 0 ? 1 : -1;
  const nextItem = order3[index + nextOffset];
  if (!nextItem)
    return order3;
  const item = order3[index];
  const nextLayout = nextItem.layout;
  const nextItemCenter = mix(nextLayout.min, nextLayout.max, 0.5);
  if (nextOffset === 1 && item.layout.max + offset > nextItemCenter || nextOffset === -1 && item.layout.min + offset < nextItemCenter) {
    return moveItem(order3, index, index + nextOffset);
  }
  return order3;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/components/Reorder/Group.mjs
function ReorderGroup(_a, externalRef) {
  var { children, as = "ul", axis = "y", onReorder, values } = _a, props = __rest(_a, ["children", "as", "axis", "onReorder", "values"]);
  const Component2 = useConstant(() => motion(as));
  const order3 = [];
  const isReordering = useRef(false);
  invariant(Boolean(values), "Reorder.Group must be provided a values prop");
  const context = {
    axis,
    registerItem: (value, layout) => {
      if (layout && order3.findIndex((entry) => value === entry.value) === -1) {
        order3.push({ value, layout: layout[axis] });
        order3.sort(compareMin);
      }
    },
    updateOrder: (id3, offset, velocity) => {
      if (isReordering.current)
        return;
      const newOrder = checkReorder(order3, id3, offset, velocity);
      if (order3 !== newOrder) {
        isReordering.current = true;
        onReorder(newOrder.map(getValue).filter((value) => values.indexOf(value) !== -1));
      }
    }
  };
  useEffect(() => {
    isReordering.current = false;
  });
  return createElement(
    Component2,
    Object.assign({}, props, { ref: externalRef }),
    createElement(ReorderContext.Provider, { value: context }, children)
  );
}
var Group = forwardRef(ReorderGroup);
function getValue(item) {
  return item.value;
}
function compareMin(a5, b5) {
  return a5.layout.min - b5.layout.min;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/components/Reorder/Item.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/value/use-motion-value.mjs
init_define_process();
function useMotionValue(initial) {
  const value = useConstant(() => motionValue(initial));
  const { isStatic } = useContext(MotionConfigContext);
  if (isStatic) {
    const [, setLatest] = useState(initial);
    useEffect(() => value.onChange(setLatest), []);
  }
  return value;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/value/use-transform.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/transform.mjs
init_define_process();
var isCustomValueType = (v4) => {
  return typeof v4 === "object" && v4.mix;
};
var getMixer2 = (v4) => isCustomValueType(v4) ? v4.mix : void 0;
function transform(...args) {
  const useImmediate = !Array.isArray(args[0]);
  const argOffset = useImmediate ? 0 : -1;
  const inputValue = args[0 + argOffset];
  const inputRange = args[1 + argOffset];
  const outputRange = args[2 + argOffset];
  const options = args[3 + argOffset];
  const interpolator = interpolate(inputRange, outputRange, Object.assign({ mixer: getMixer2(outputRange[0]) }, options));
  return useImmediate ? interpolator(inputValue) : interpolator;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/value/use-combine-values.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/value/use-on-change.mjs
init_define_process();
function useOnChange(value, callback) {
  useIsomorphicLayoutEffect(() => {
    if (isMotionValue(value))
      return value.onChange(callback);
  }, [callback]);
}
function useMultiOnChange(values, handler) {
  useIsomorphicLayoutEffect(() => {
    const subscriptions = values.map((value) => value.onChange(handler));
    return () => subscriptions.forEach((unsubscribe) => unsubscribe());
  });
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/value/use-combine-values.mjs
function useCombineMotionValues(values, combineValues) {
  const value = useMotionValue(combineValues());
  const updateValue = () => value.set(combineValues());
  updateValue();
  useMultiOnChange(values, () => es_default.update(updateValue, false, true));
  return value;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/value/use-transform.mjs
function useTransform(input, inputRangeOrTransformer, outputRange, options) {
  const transformer = typeof inputRangeOrTransformer === "function" ? inputRangeOrTransformer : transform(inputRangeOrTransformer, outputRange, options);
  return Array.isArray(input) ? useListTransform(input, transformer) : useListTransform([input], ([latest]) => transformer(latest));
}
function useListTransform(values, transformer) {
  const latest = useConstant(() => []);
  return useCombineMotionValues(values, () => {
    latest.length = 0;
    const numValues = values.length;
    for (let i4 = 0; i4 < numValues; i4++) {
      latest[i4] = values[i4].get();
    }
    return transformer(latest);
  });
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/components/Reorder/Item.mjs
function useDefaultMotionValue(value, defaultValue = 0) {
  return isMotionValue(value) ? value : useMotionValue(defaultValue);
}
function ReorderItem(_a, externalRef) {
  var { children, style: style2, value, as = "li", onDrag, layout = true } = _a, props = __rest(_a, ["children", "style", "value", "as", "onDrag", "layout"]);
  const Component2 = useConstant(() => motion(as));
  const context = useContext(ReorderContext);
  const point2 = {
    x: useDefaultMotionValue(style2 === null || style2 === void 0 ? void 0 : style2.x),
    y: useDefaultMotionValue(style2 === null || style2 === void 0 ? void 0 : style2.y)
  };
  const zIndex = useTransform([point2.x, point2.y], ([latestX, latestY]) => latestX || latestY ? 1 : "unset");
  const measuredLayout = useRef(null);
  invariant(Boolean(context), "Reorder.Item must be a child of Reorder.Group");
  const { axis, registerItem, updateOrder } = context;
  useEffect(() => {
    registerItem(value, measuredLayout.current);
  }, [context]);
  return createElement(Component2, Object.assign({ drag: axis }, props, { dragSnapToOrigin: true, style: Object.assign(Object.assign({}, style2), { x: point2.x, y: point2.y, zIndex }), layout, onDrag: (event, gesturePoint) => {
    const { velocity } = gesturePoint;
    velocity[axis] && updateOrder(value, point2[axis].get(), velocity[axis]);
    onDrag === null || onDrag === void 0 ? void 0 : onDrag(event, gesturePoint);
  }, onLayoutMeasure: (measured) => {
    measuredLayout.current = measured;
  }, ref: externalRef }), children);
}
var Item = forwardRef(ReorderItem);

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/components/Reorder/index.mjs
var Reorder = {
  Group,
  Item
};

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/features-animation.mjs
init_define_process();
var domAnimation = Object.assign(Object.assign({ renderer: createDomVisualElement }, animations), gestureAnimations);

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/render/dom/features-max.mjs
init_define_process();
var domMax = Object.assign(Object.assign(Object.assign(Object.assign({}, domAnimation), drag), layoutFeatures), { projectionNodeConstructor: HTMLProjectionNode });

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/value/use-motion-template.mjs
init_define_process();
function useMotionTemplate(fragments, ...values) {
  const numFragments = fragments.length;
  function buildValue() {
    let output = ``;
    for (let i4 = 0; i4 < numFragments; i4++) {
      output += fragments[i4];
      const value = values[i4];
      if (value)
        output += values[i4].get();
    }
    return output;
  }
  return useCombineMotionValues(values, buildValue);
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/value/use-spring.mjs
init_define_process();
function useSpring(source, config = {}) {
  const { isStatic } = useContext(MotionConfigContext);
  const activeSpringAnimation = useRef(null);
  const value = useMotionValue(isMotionValue(source) ? source.get() : source);
  useMemo(() => {
    return value.attach((v4, set) => {
      if (isStatic)
        return set(v4);
      if (activeSpringAnimation.current) {
        activeSpringAnimation.current.stop();
      }
      activeSpringAnimation.current = animate(Object.assign(Object.assign({ from: value.get(), to: v4, velocity: value.getVelocity() }, config), { onUpdate: set }));
      return value.get();
    });
  }, [JSON.stringify(config)]);
  useOnChange(source, (v4) => value.set(parseFloat(v4)));
  return value;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/value/use-velocity.mjs
init_define_process();
function useVelocity(value) {
  const velocity = useMotionValue(value.getVelocity());
  useEffect(() => {
    return value.velocityUpdateSubscribers.add((newVelocity) => {
      velocity.set(newVelocity);
    });
  }, [value]);
  return velocity;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/value/use-scroll.mjs
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/animate-style.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/data.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-types-npm-10.14.0-209a936e66-9.zip/node_modules/@motionone/types/dist/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-types-npm-10.14.0-209a936e66-9.zip/node_modules/@motionone/types/dist/MotionValue.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/css-var.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/transforms.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/array.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/clamp.es.js
init_define_process();
var clamp3 = (min, max, v4) => Math.min(Math.max(v4, min), max);

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/defaults.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/easing.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/is-easing-list.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/is-number.es.js
init_define_process();
var isNumber = (value) => typeof value === "number";

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/is-easing-list.es.js
var isEasingList = (easing) => Array.isArray(easing) && !isNumber(easing[0]);

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/wrap.es.js
init_define_process();
var wrap2 = (min, max, v4) => {
  const rangeSize = max - min;
  return ((v4 - min) % rangeSize + rangeSize) % rangeSize + min;
};

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/easing.es.js
function getEasingForSegment(easing, i4) {
  return isEasingList(easing) ? easing[wrap2(0, easing.length, i4)] : easing;
}

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/interpolate.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/mix.es.js
init_define_process();
var mix2 = (min, max, progress3) => -progress3 * min + progress3 * max + min;

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/noop.es.js
init_define_process();
var noopReturn = (v4) => v4;

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/offset.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/progress.es.js
init_define_process();
var progress2 = (min, max, value) => max - min === 0 ? 1 : (value - min) / (max - min);

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/offset.es.js
function fillOffset(offset, remaining) {
  const min = offset[offset.length - 1];
  for (let i4 = 1; i4 <= remaining; i4++) {
    const offsetProgress = progress2(0, remaining, i4);
    offset.push(mix2(min, 1, offsetProgress));
  }
}
function defaultOffset2(length2) {
  const offset = [0];
  fillOffset(offset, length2 - 1);
  return offset;
}

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/interpolate.es.js
function interpolate2(output, input = defaultOffset2(output.length), easing = noopReturn) {
  const length2 = output.length;
  const remainder = length2 - input.length;
  remainder > 0 && fillOffset(input, remainder);
  return (t3) => {
    let i4 = 0;
    for (; i4 < length2 - 2; i4++) {
      if (t3 < input[i4 + 1])
        break;
    }
    let progressInRange = clamp3(0, 1, progress2(input[i4], input[i4 + 1], t3));
    const segmentEasing = getEasingForSegment(easing, i4);
    progressInRange = segmentEasing(progressInRange);
    return mix2(output[i4], output[i4 + 1], progressInRange);
  };
}

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/is-cubic-bezier.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/is-easing-generator.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/is-function.es.js
init_define_process();
var isFunction = (value) => typeof value === "function";

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/is-string.es.js
init_define_process();
var isString2 = (value) => typeof value === "string";

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/time.es.js
init_define_process();
var time = {
  ms: (seconds) => seconds * 1e3,
  s: (milliseconds) => milliseconds / 1e3
};

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/velocity.es.js
init_define_process();
function velocityPerSecond2(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/transforms.es.js
var axes = ["", "X", "Y", "Z"];
var order2 = ["translate", "scale", "rotate", "skew"];
var rotation = {
  syntax: "<angle>",
  initialValue: "0deg",
  toDefaultUnit: (v4) => v4 + "deg"
};
var baseTransformProperties = {
  translate: {
    syntax: "<length-percentage>",
    initialValue: "0px",
    toDefaultUnit: (v4) => v4 + "px"
  },
  rotate: rotation,
  scale: {
    syntax: "<number>",
    initialValue: 1,
    toDefaultUnit: noopReturn
  },
  skew: rotation
};
var transformDefinitions = /* @__PURE__ */ new Map();
var asTransformCssVar = (name) => `--motion-${name}`;
var transforms = ["x", "y", "z"];
order2.forEach((name) => {
  axes.forEach((axis) => {
    transforms.push(name + axis);
    transformDefinitions.set(asTransformCssVar(name + axis), baseTransformProperties[name]);
  });
});
var transformLookup = new Set(transforms);

// ../../.yarn/global/cache/@motionone-animation-npm-10.14.0-26ae26acd7-9.zip/node_modules/@motionone/animation/dist/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-animation-npm-10.14.0-26ae26acd7-9.zip/node_modules/@motionone/animation/dist/Animation.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-animation-npm-10.14.0-26ae26acd7-9.zip/node_modules/@motionone/animation/dist/utils/easing.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-easing-npm-10.14.0-97af278bce-9.zip/node_modules/@motionone/easing/dist/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-easing-npm-10.14.0-97af278bce-9.zip/node_modules/@motionone/easing/dist/cubic-bezier.es.js
init_define_process();
var calcBezier2 = (t3, a1, a22) => (((1 - 3 * a22 + 3 * a1) * t3 + (3 * a22 - 6 * a1)) * t3 + 3 * a1) * t3;
var subdivisionPrecision2 = 1e-7;
var subdivisionMaxIterations2 = 12;
function binarySubdivide2(x5, lowerBound, upperBound, mX1, mX2) {
  let currentX;
  let currentT;
  let i4 = 0;
  do {
    currentT = lowerBound + (upperBound - lowerBound) / 2;
    currentX = calcBezier2(currentT, mX1, mX2) - x5;
    if (currentX > 0) {
      upperBound = currentT;
    } else {
      lowerBound = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision2 && ++i4 < subdivisionMaxIterations2);
  return currentT;
}
function cubicBezier2(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return noopReturn;
  const getTForX = (aX) => binarySubdivide2(aX, 0, 1, mX1, mX2);
  return (t3) => t3 === 0 || t3 === 1 ? t3 : calcBezier2(getTForX(t3), mY1, mY2);
}

// ../../.yarn/global/cache/@motionone-easing-npm-10.14.0-97af278bce-9.zip/node_modules/@motionone/easing/dist/steps.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-animation-npm-10.14.0-26ae26acd7-9.zip/node_modules/@motionone/animation/dist/utils/easing.es.js
var namedEasings = {
  ease: cubicBezier2(0.25, 0.1, 0.25, 1),
  "ease-in": cubicBezier2(0.42, 0, 1, 1),
  "ease-in-out": cubicBezier2(0.42, 0, 0.58, 1),
  "ease-out": cubicBezier2(0, 0, 0.58, 1)
};

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/easing.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/feature-detection.es.js
init_define_process();
var testAnimation = (keyframes3, options) => document.createElement("div").animate(keyframes3, options);
var featureTests = {
  cssRegisterProperty: () => typeof CSS !== "undefined" && Object.hasOwnProperty.call(CSS, "registerProperty"),
  waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
  partialKeyframes: () => {
    try {
      testAnimation({ opacity: [1] });
    } catch (e4) {
      return false;
    }
    return true;
  },
  finished: () => Boolean(testAnimation({ opacity: [0, 1] }, { duration: 1e-3 }).finished),
  linearEasing: () => {
    try {
      testAnimation({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch (e4) {
      return false;
    }
    return true;
  }
};
var results = {};
var supports = {};
for (const key in featureTests) {
  supports[key] = () => {
    if (results[key] === void 0)
      results[key] = featureTests[key]();
    return results[key];
  };
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/keyframes.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/style.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/get-style-name.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/stop-animation.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/options.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/utils/resolve-elements.es.js
init_define_process();
function resolveElements(elements, selectorCache) {
  var _a;
  if (typeof elements === "string") {
    if (selectorCache) {
      (_a = selectorCache[elements]) !== null && _a !== void 0 ? _a : selectorCache[elements] = document.querySelectorAll(elements);
      elements = selectorCache[elements];
    } else {
      elements = document.querySelectorAll(elements);
    }
  } else if (elements instanceof Element) {
    elements = [elements];
  }
  return Array.from(elements || []);
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/controls.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/utils/stagger.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/timeline/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/timeline/utils/calc-time.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/timeline/utils/edit.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/timeline/utils/sort.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/easing/spring/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/glide/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/utils/velocity.es.js
init_define_process();
var sampleT = 5;
function calcGeneratorVelocity(resolveValue, t3, current) {
  const prevT = Math.max(t3 - sampleT, 0);
  return velocityPerSecond2(current - resolveValue(prevT), t3 - prevT);
}

// ../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/spring/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/spring/defaults.es.js
init_define_process();
var defaults2 = {
  stiffness: 100,
  damping: 10,
  mass: 1
};

// ../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/spring/utils.es.js
init_define_process();
var calcDampingRatio = (stiffness = defaults2.stiffness, damping = defaults2.damping, mass = defaults2.mass) => damping / (2 * Math.sqrt(stiffness * mass));

// ../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/utils/has-reached-target.es.js
init_define_process();
function hasReachedTarget(origin, target, current) {
  return origin < target && current >= target || origin > target && current <= target;
}

// ../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/spring/index.es.js
var spring2 = ({ stiffness = defaults2.stiffness, damping = defaults2.damping, mass = defaults2.mass, from = 0, to = 1, velocity = 0, restSpeed = 2, restDistance = 0.5 } = {}) => {
  velocity = velocity ? time.s(velocity) : 0;
  const state = {
    done: false,
    hasReachedTarget: false,
    current: from,
    target: to
  };
  const initialDelta = to - from;
  const undampedAngularFreq = Math.sqrt(stiffness / mass) / 1e3;
  const dampingRatio = calcDampingRatio(stiffness, damping, mass);
  let resolveSpring;
  if (dampingRatio < 1) {
    const angularFreq = undampedAngularFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
    resolveSpring = (t3) => to - Math.exp(-dampingRatio * undampedAngularFreq * t3) * ((-velocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t3) + initialDelta * Math.cos(angularFreq * t3));
  } else {
    resolveSpring = (t3) => {
      return to - Math.exp(-undampedAngularFreq * t3) * (initialDelta + (-velocity + undampedAngularFreq * initialDelta) * t3);
    };
  }
  return (t3) => {
    state.current = resolveSpring(t3);
    const currentVelocity = t3 === 0 ? velocity : calcGeneratorVelocity(resolveSpring, t3, state.current);
    const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
    const isBelowDisplacementThreshold = Math.abs(to - state.current) <= restDistance;
    state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
    state.hasReachedTarget = hasReachedTarget(from, to, state.current);
    return state;
  };
};

// ../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/glide/index.es.js
var glide = ({ from = 0, velocity = 0, power = 0.8, decay: decay2 = 0.325, bounceDamping, bounceStiffness, changeTarget, min, max, restDistance = 0.5, restSpeed }) => {
  decay2 = time.ms(decay2);
  const state = {
    hasReachedTarget: false,
    done: false,
    current: from,
    target: from
  };
  const isOutOfBounds = (v4) => min !== void 0 && v4 < min || max !== void 0 && v4 > max;
  const nearestBoundary = (v4) => {
    if (min === void 0)
      return max;
    if (max === void 0)
      return min;
    return Math.abs(min - v4) < Math.abs(max - v4) ? min : max;
  };
  let amplitude = power * velocity;
  const ideal = from + amplitude;
  const target = changeTarget === void 0 ? ideal : changeTarget(ideal);
  state.target = target;
  if (target !== ideal)
    amplitude = target - from;
  const calcDelta = (t3) => -amplitude * Math.exp(-t3 / decay2);
  const calcLatest = (t3) => target + calcDelta(t3);
  const applyFriction = (t3) => {
    const delta = calcDelta(t3);
    const latest = calcLatest(t3);
    state.done = Math.abs(delta) <= restDistance;
    state.current = state.done ? target : latest;
  };
  let timeReachedBoundary;
  let spring$1;
  const checkCatchBoundary = (t3) => {
    if (!isOutOfBounds(state.current))
      return;
    timeReachedBoundary = t3;
    spring$1 = spring2({
      from: state.current,
      to: nearestBoundary(state.current),
      velocity: calcGeneratorVelocity(calcLatest, t3, state.current),
      damping: bounceDamping,
      stiffness: bounceStiffness,
      restDistance,
      restSpeed
    });
  };
  checkCatchBoundary(0);
  return (t3) => {
    let hasUpdatedFrame = false;
    if (!spring$1 && timeReachedBoundary === void 0) {
      hasUpdatedFrame = true;
      applyFriction(t3);
      checkCatchBoundary(t3);
    }
    if (timeReachedBoundary !== void 0 && t3 > timeReachedBoundary) {
      state.hasReachedTarget = true;
      return spring$1(t3 - timeReachedBoundary);
    } else {
      state.hasReachedTarget = false;
      !hasUpdatedFrame && applyFriction(t3);
      return state;
    }
  };
};

// ../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/utils/pregenerate-keyframes.es.js
init_define_process();
var timeStep = 10;
var maxDuration2 = 1e4;
function pregenerateKeyframes(generator, toUnit = noopReturn) {
  let overshootDuration = void 0;
  let timestamp = timeStep;
  let state = generator(0);
  const keyframes3 = [toUnit(state.current)];
  while (!state.done && timestamp < maxDuration2) {
    state = generator(timestamp);
    keyframes3.push(toUnit(state.done ? state.target : state.current));
    if (overshootDuration === void 0 && state.hasReachedTarget) {
      overshootDuration = timestamp;
    }
    timestamp += timeStep;
  }
  const duration = timestamp - timeStep;
  if (keyframes3.length === 1)
    keyframes3.push(state.current);
  return {
    keyframes: keyframes3,
    duration: duration / 1e3,
    overshootDuration: (overshootDuration !== null && overshootDuration !== void 0 ? overshootDuration : duration) / 1e3
  };
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/easing/create-generator-easing.es.js
init_define_process();
function createGeneratorEasing(createGenerator) {
  const keyframesCache = /* @__PURE__ */ new WeakMap();
  return (options = {}) => {
    const generatorCache = /* @__PURE__ */ new Map();
    const getGenerator = (from = 0, to = 100, velocity = 0, isScale = false) => {
      const key = `${from}-${to}-${velocity}-${isScale}`;
      if (!generatorCache.has(key)) {
        generatorCache.set(key, createGenerator(Object.assign({
          from,
          to,
          velocity,
          restSpeed: isScale ? 0.05 : 2,
          restDistance: isScale ? 0.01 : 0.5
        }, options)));
      }
      return generatorCache.get(key);
    };
    const getKeyframes = (generator) => {
      if (!keyframesCache.has(generator)) {
        keyframesCache.set(generator, pregenerateKeyframes(generator));
      }
      return keyframesCache.get(generator);
    };
    return {
      createAnimation: (keyframes3, getOrigin2, canUseGenerator, name, motionValue2) => {
        var _a, _b;
        let settings;
        const numKeyframes = keyframes3.length;
        let shouldUseGenerator = canUseGenerator && numKeyframes <= 2 && keyframes3.every(isNumberOrNull);
        if (shouldUseGenerator) {
          const target = keyframes3[numKeyframes - 1];
          const unresolvedOrigin = numKeyframes === 1 ? null : keyframes3[0];
          let velocity = 0;
          let origin = 0;
          const prevGenerator = motionValue2 === null || motionValue2 === void 0 ? void 0 : motionValue2.generator;
          if (prevGenerator) {
            const { animation, generatorStartTime } = motionValue2;
            const startTime = (animation === null || animation === void 0 ? void 0 : animation.startTime) || generatorStartTime || 0;
            const currentTime = (animation === null || animation === void 0 ? void 0 : animation.currentTime) || performance.now() - startTime;
            const prevGeneratorCurrent = prevGenerator(currentTime).current;
            origin = (_a = unresolvedOrigin) !== null && _a !== void 0 ? _a : prevGeneratorCurrent;
            if (numKeyframes === 1 || numKeyframes === 2 && keyframes3[0] === null) {
              velocity = calcGeneratorVelocity((t3) => prevGenerator(t3).current, currentTime, prevGeneratorCurrent);
            }
          } else {
            origin = (_b = unresolvedOrigin) !== null && _b !== void 0 ? _b : parseFloat(getOrigin2());
          }
          const generator = getGenerator(origin, target, velocity, name === null || name === void 0 ? void 0 : name.includes("scale"));
          const keyframesMetadata = getKeyframes(generator);
          settings = Object.assign(Object.assign({}, keyframesMetadata), { easing: "linear" });
          if (motionValue2) {
            motionValue2.generator = generator;
            motionValue2.generatorStartTime = performance.now();
          }
        } else {
          const keyframesMetadata = getKeyframes(getGenerator(0, 100));
          settings = {
            easing: "ease",
            duration: keyframesMetadata.overshootDuration
          };
        }
        return settings;
      }
    };
  };
}
var isNumberOrNull = (value) => typeof value !== "string";

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/easing/spring/index.es.js
var spring3 = createGeneratorEasing(spring2);

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/easing/glide/index.es.js
init_define_process();
var glide2 = createGeneratorEasing(glide);

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/in-view.es.js
init_define_process();
var thresholds = {
  any: 0,
  all: 1
};
function inView(elementOrSelector, onStart, { root, margin: rootMargin, amount = "any" } = {}) {
  if (typeof IntersectionObserver === "undefined") {
    return () => {
    };
  }
  const elements = resolveElements(elementOrSelector);
  const activeIntersections = /* @__PURE__ */ new WeakMap();
  const onIntersectionChange = (entries) => {
    entries.forEach((entry) => {
      const onEnd = activeIntersections.get(entry.target);
      if (entry.isIntersecting === Boolean(onEnd))
        return;
      if (entry.isIntersecting) {
        const newOnEnd = onStart(entry);
        if (isFunction(newOnEnd)) {
          activeIntersections.set(entry.target, newOnEnd);
        } else {
          observer2.unobserve(entry.target);
        }
      } else if (onEnd) {
        onEnd(entry);
        activeIntersections.delete(entry.target);
      }
    });
  };
  const observer2 = new IntersectionObserver(onIntersectionChange, {
    root,
    rootMargin,
    threshold: typeof amount === "number" ? amount : thresholds[amount]
  });
  elements.forEach((element) => observer2.observe(element));
  return () => observer2.disconnect();
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/resize/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/resize/handle-element.es.js
init_define_process();
var resizeHandlers = /* @__PURE__ */ new WeakMap();
var observer;
function getElementSize(target, borderBoxSize) {
  if (borderBoxSize) {
    const { inlineSize, blockSize } = borderBoxSize[0];
    return { width: inlineSize, height: blockSize };
  } else if (target instanceof SVGElement && "getBBox" in target) {
    return target.getBBox();
  } else {
    return {
      width: target.offsetWidth,
      height: target.offsetHeight
    };
  }
}
function notifyTarget({ target, contentRect, borderBoxSize }) {
  var _a;
  (_a = resizeHandlers.get(target)) === null || _a === void 0 ? void 0 : _a.forEach((handler) => {
    handler({
      target,
      contentSize: contentRect,
      get size() {
        return getElementSize(target, borderBoxSize);
      }
    });
  });
}
function notifyAll(entries) {
  entries.forEach(notifyTarget);
}
function createResizeObserver() {
  if (typeof ResizeObserver === "undefined")
    return;
  observer = new ResizeObserver(notifyAll);
}
function resizeElement(target, handler) {
  if (!observer)
    createResizeObserver();
  const elements = resolveElements(target);
  elements.forEach((element) => {
    let elementHandlers = resizeHandlers.get(element);
    if (!elementHandlers) {
      elementHandlers = /* @__PURE__ */ new Set();
      resizeHandlers.set(element, elementHandlers);
    }
    elementHandlers.add(handler);
    observer === null || observer === void 0 ? void 0 : observer.observe(element);
  });
  return () => {
    elements.forEach((element) => {
      const elementHandlers = resizeHandlers.get(element);
      elementHandlers === null || elementHandlers === void 0 ? void 0 : elementHandlers.delete(handler);
      if (!(elementHandlers === null || elementHandlers === void 0 ? void 0 : elementHandlers.size)) {
        observer === null || observer === void 0 ? void 0 : observer.unobserve(element);
      }
    });
  };
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/resize/handle-window.es.js
init_define_process();
var windowCallbacks = /* @__PURE__ */ new Set();
var windowResizeHandler;
function createWindowResizeHandler() {
  windowResizeHandler = () => {
    const size = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    const info = {
      target: window,
      size,
      contentSize: size
    };
    windowCallbacks.forEach((callback) => callback(info));
  };
  window.addEventListener("resize", windowResizeHandler);
}
function resizeWindow(callback) {
  windowCallbacks.add(callback);
  if (!windowResizeHandler)
    createWindowResizeHandler();
  return () => {
    windowCallbacks.delete(callback);
    if (!windowCallbacks.size && windowResizeHandler) {
      windowResizeHandler = void 0;
    }
  };
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/resize/index.es.js
function resize(a5, b5) {
  return isFunction(a5) ? resizeWindow(a5) : resizeElement(a5, b5);
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/info.es.js
init_define_process();
var maxElapsed2 = 50;
var createAxisInfo = () => ({
  current: 0,
  offset: [],
  progress: 0,
  scrollLength: 0,
  targetOffset: 0,
  targetLength: 0,
  containerLength: 0,
  velocity: 0
});
var createScrollInfo = () => ({
  time: 0,
  x: createAxisInfo(),
  y: createAxisInfo()
});
var keys = {
  x: {
    length: "Width",
    position: "Left"
  },
  y: {
    length: "Height",
    position: "Top"
  }
};
function updateAxisInfo(element, axisName, info, time2) {
  const axis = info[axisName];
  const { length: length2, position } = keys[axisName];
  const prev = axis.current;
  const prevTime = info.time;
  axis.current = element["scroll" + position];
  axis.scrollLength = element["scroll" + length2] - element["client" + length2];
  axis.offset.length = 0;
  axis.offset[0] = 0;
  axis.offset[1] = axis.scrollLength;
  axis.progress = progress2(0, axis.scrollLength, axis.current);
  const elapsed = time2 - prevTime;
  axis.velocity = elapsed > maxElapsed2 ? 0 : velocityPerSecond2(axis.current - prev, elapsed);
}
function updateScrollInfo(element, info, time2) {
  updateAxisInfo(element, "x", info, time2);
  updateAxisInfo(element, "y", info, time2);
  info.time = time2;
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/on-scroll-handler.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/offsets/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/offsets/inset.es.js
init_define_process();
function calcInset(element, container) {
  let inset = { x: 0, y: 0 };
  let current = element;
  while (current && current !== container) {
    if (current instanceof HTMLElement) {
      inset.x += current.offsetLeft;
      inset.y += current.offsetTop;
      current = current.offsetParent;
    } else if (current instanceof SVGGraphicsElement && "getBBox" in current) {
      const { top, left } = current.getBBox();
      inset.x += left;
      inset.y += top;
      while (current && current.tagName !== "svg") {
        current = current.parentNode;
      }
    }
  }
  return inset;
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/offsets/presets.es.js
init_define_process();
var ScrollOffset = {
  Enter: [
    [0, 1],
    [1, 1]
  ],
  Exit: [
    [0, 0],
    [1, 0]
  ],
  Any: [
    [1, 0],
    [0, 1]
  ],
  All: [
    [0, 0],
    [1, 1]
  ]
};

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/offsets/offset.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/offsets/edge.es.js
init_define_process();
var namedEdges = {
  start: 0,
  center: 0.5,
  end: 1
};
function resolveEdge(edge, length2, inset = 0) {
  let delta = 0;
  if (namedEdges[edge] !== void 0) {
    edge = namedEdges[edge];
  }
  if (isString2(edge)) {
    const asNumber2 = parseFloat(edge);
    if (edge.endsWith("px")) {
      delta = asNumber2;
    } else if (edge.endsWith("%")) {
      edge = asNumber2 / 100;
    } else if (edge.endsWith("vw")) {
      delta = asNumber2 / 100 * document.documentElement.clientWidth;
    } else if (edge.endsWith("vh")) {
      delta = asNumber2 / 100 * document.documentElement.clientHeight;
    } else {
      edge = asNumber2;
    }
  }
  if (isNumber(edge)) {
    delta = length2 * edge;
  }
  return inset + delta;
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/offsets/offset.es.js
var defaultOffset3 = [0, 0];
function resolveOffset(offset, containerLength, targetLength, targetInset) {
  let offsetDefinition = Array.isArray(offset) ? offset : defaultOffset3;
  let targetPoint = 0;
  let containerPoint = 0;
  if (isNumber(offset)) {
    offsetDefinition = [offset, offset];
  } else if (isString2(offset)) {
    offset = offset.trim();
    if (offset.includes(" ")) {
      offsetDefinition = offset.split(" ");
    } else {
      offsetDefinition = [offset, namedEdges[offset] ? offset : `0`];
    }
  }
  targetPoint = resolveEdge(offsetDefinition[0], targetLength, targetInset);
  containerPoint = resolveEdge(offsetDefinition[1], containerLength);
  return targetPoint - containerPoint;
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/offsets/index.es.js
var point = { x: 0, y: 0 };
function resolveOffsets(container, info, options) {
  let { offset: offsetDefinition = ScrollOffset.All } = options;
  const { target = container, axis = "y" } = options;
  const lengthLabel = axis === "y" ? "height" : "width";
  const inset = target !== container ? calcInset(target, container) : point;
  const targetSize = target === container ? { width: container.scrollWidth, height: container.scrollHeight } : { width: target.clientWidth, height: target.clientHeight };
  const containerSize = {
    width: container.clientWidth,
    height: container.clientHeight
  };
  info[axis].offset.length = 0;
  let hasChanged2 = !info[axis].interpolate;
  const numOffsets = offsetDefinition.length;
  for (let i4 = 0; i4 < numOffsets; i4++) {
    const offset = resolveOffset(offsetDefinition[i4], containerSize[lengthLabel], targetSize[lengthLabel], inset[axis]);
    if (!hasChanged2 && offset !== info[axis].interpolatorOffsets[i4]) {
      hasChanged2 = true;
    }
    info[axis].offset[i4] = offset;
  }
  if (hasChanged2) {
    info[axis].interpolate = interpolate2(defaultOffset2(numOffsets), info[axis].offset);
    info[axis].interpolatorOffsets = [...info[axis].offset];
  }
  info[axis].progress = info[axis].interpolate(info[axis].current);
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/on-scroll-handler.es.js
function measure(container, target = container, info) {
  info.x.targetOffset = 0;
  info.y.targetOffset = 0;
  if (target !== container) {
    let node = target;
    while (node && node != container) {
      info.x.targetOffset += node.offsetLeft;
      info.y.targetOffset += node.offsetTop;
      node = node.offsetParent;
    }
  }
  info.x.targetLength = target === container ? target.scrollWidth : target.clientWidth;
  info.y.targetLength = target === container ? target.scrollHeight : target.clientHeight;
  info.x.containerLength = container.clientWidth;
  info.y.containerLength = container.clientHeight;
}
function createOnScrollHandler(element, onScroll, info, options = {}) {
  const axis = options.axis || "y";
  return {
    measure: () => measure(element, options.target, info),
    update: (time2) => {
      updateScrollInfo(element, info, time2);
      if (options.offset || options.target) {
        resolveOffsets(element, info, options);
      }
    },
    notify: isFunction(onScroll) ? () => onScroll(info) : scrubAnimation(onScroll, info[axis])
  };
}
function scrubAnimation(controls, axisInfo) {
  controls.pause();
  controls.forEachNative((animation, { easing }) => {
    var _a, _b;
    if (animation.updateDuration) {
      if (!easing)
        animation.easing = noopReturn;
      animation.updateDuration(1);
    } else {
      const timingOptions = { duration: 1e3 };
      if (!easing)
        timingOptions.easing = "linear";
      (_b = (_a = animation.effect) === null || _a === void 0 ? void 0 : _a.updateTiming) === null || _b === void 0 ? void 0 : _b.call(_a, timingOptions);
    }
  });
  return () => {
    controls.currentTime = axisInfo.progress;
  };
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/index.es.js
var scrollListeners = /* @__PURE__ */ new WeakMap();
var resizeListeners = /* @__PURE__ */ new WeakMap();
var onScrollHandlers = /* @__PURE__ */ new WeakMap();
var getEventTarget = (element) => element === document.documentElement ? window : element;
function scroll(onScroll, _a = {}) {
  var { container = document.documentElement } = _a, options = __rest(_a, ["container"]);
  let containerHandlers = onScrollHandlers.get(container);
  if (!containerHandlers) {
    containerHandlers = /* @__PURE__ */ new Set();
    onScrollHandlers.set(container, containerHandlers);
  }
  const info = createScrollInfo();
  const containerHandler = createOnScrollHandler(container, onScroll, info, options);
  containerHandlers.add(containerHandler);
  if (!scrollListeners.has(container)) {
    const listener2 = () => {
      const time2 = performance.now();
      for (const handler of containerHandlers)
        handler.measure();
      for (const handler of containerHandlers)
        handler.update(time2);
      for (const handler of containerHandlers)
        handler.notify();
    };
    scrollListeners.set(container, listener2);
    const target = getEventTarget(container);
    window.addEventListener("resize", listener2, { passive: true });
    if (container !== document.documentElement) {
      resizeListeners.set(container, resize(container, listener2));
    }
    target.addEventListener("scroll", listener2, { passive: true });
  }
  const listener = scrollListeners.get(container);
  const onLoadProcesss = requestAnimationFrame(listener);
  return () => {
    var _a2;
    if (typeof onScroll !== "function")
      onScroll.stop();
    cancelAnimationFrame(onLoadProcesss);
    const containerHandlers2 = onScrollHandlers.get(container);
    if (!containerHandlers2)
      return;
    containerHandlers2.delete(containerHandler);
    if (containerHandlers2.size)
      return;
    const listener2 = scrollListeners.get(container);
    scrollListeners.delete(container);
    if (listener2) {
      getEventTarget(container).removeEventListener("scroll", listener2);
      (_a2 = resizeListeners.get(container)) === null || _a2 === void 0 ? void 0 : _a2();
      window.removeEventListener("resize", listener2);
    }
  };
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/utils/has-changed.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/utils/resolve-variant.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/utils/is-variant.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/utils/schedule.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/gestures/in-view.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/utils/events.es.js
init_define_process();
function dispatchPointerEvent(element, name, event) {
  element.dispatchEvent(new CustomEvent(name, { detail: { originalEvent: event } }));
}
function dispatchViewEvent(element, name, entry) {
  element.dispatchEvent(new CustomEvent(name, { detail: { originalEntry: entry } }));
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/gestures/in-view.es.js
var inView2 = {
  isActive: (options) => Boolean(options.inView),
  subscribe: (element, { enable, disable }, { inViewOptions = {} }) => {
    const { once } = inViewOptions, viewOptions = __rest(inViewOptions, ["once"]);
    return inView(element, (enterEntry) => {
      enable();
      dispatchViewEvent(element, "viewenter", enterEntry);
      if (!once) {
        return (leaveEntry) => {
          disable();
          dispatchViewEvent(element, "viewleave", leaveEntry);
        };
      }
    }, viewOptions);
  }
};

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/gestures/hover.es.js
init_define_process();
var mouseEvent = (element, name, action) => (event) => {
  if (event.pointerType && event.pointerType !== "mouse")
    return;
  action();
  dispatchPointerEvent(element, name, event);
};
var hover = {
  isActive: (options) => Boolean(options.hover),
  subscribe: (element, { enable, disable }) => {
    const onEnter = mouseEvent(element, "hoverstart", enable);
    const onLeave = mouseEvent(element, "hoverend", disable);
    element.addEventListener("pointerenter", onEnter);
    element.addEventListener("pointerleave", onLeave);
    return () => {
      element.removeEventListener("pointerenter", onEnter);
      element.removeEventListener("pointerleave", onLeave);
    };
  }
};

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/gestures/press.es.js
init_define_process();
var press = {
  isActive: (options) => Boolean(options.press),
  subscribe: (element, { enable, disable }) => {
    const onPointerUp = (event) => {
      disable();
      dispatchPointerEvent(element, "pressend", event);
      window.removeEventListener("pointerup", onPointerUp);
    };
    const onPointerDown = (event) => {
      enable();
      dispatchPointerEvent(element, "pressstart", event);
      window.addEventListener("pointerup", onPointerUp);
    };
    element.addEventListener("pointerdown", onPointerDown);
    return () => {
      element.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }
};

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/index.es.js
var gestures = { inView: inView2, hover, press };
var stateTypes = ["initial", "animate", ...Object.keys(gestures), "exit"];

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/style-object.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/style-string.es.js
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/value/use-scroll.mjs
var createScrollMotionValues = () => ({
  scrollX: motionValue(0),
  scrollY: motionValue(0),
  scrollXProgress: motionValue(0),
  scrollYProgress: motionValue(0)
});
function useScroll(_a = {}) {
  var { container, target } = _a, options = __rest(_a, ["container", "target"]);
  const values = useConstant(createScrollMotionValues);
  useIsomorphicLayoutEffect(() => {
    return scroll(({ x: x5, y: y4 }) => {
      values.scrollX.set(x5.current);
      values.scrollXProgress.set(x5.progress);
      values.scrollY.set(y4.current);
      values.scrollYProgress.set(y4.progress);
    }, Object.assign(Object.assign({}, options), { container: (container === null || container === void 0 ? void 0 : container.current) || void 0, target: (target === null || target === void 0 ? void 0 : target.current) || void 0 }));
  }, []);
  return values;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/value/scroll/use-element-scroll.mjs
init_define_process();
function useElementScroll(ref) {
  warnOnce(false, "useElementScroll is deprecated. Convert to useScroll({ container: ref }).");
  return useScroll({ container: ref });
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/value/scroll/use-viewport-scroll.mjs
init_define_process();
function useViewportScroll() {
  warnOnce(false, "useViewportScroll is deprecated. Convert to useScroll().");
  return useScroll();
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/value/use-time.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/use-animation-frame.mjs
init_define_process();
function useAnimationFrame(callback) {
  const initialTimestamp = useRef(0);
  const { isStatic } = useContext(MotionConfigContext);
  useEffect(() => {
    if (isStatic)
      return;
    const provideTimeSinceStart = ({ timestamp }) => {
      if (!initialTimestamp.current)
        initialTimestamp.current = timestamp;
      callback(timestamp - initialTimestamp.current);
    };
    es_default.update(provideTimeSinceStart, true);
    return () => cancelSync.update(provideTimeSinceStart);
  }, [callback]);
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/value/use-time.mjs
function useTime() {
  const time2 = useMotionValue(0);
  useAnimationFrame((t3) => time2.set(t3));
  return time2;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/value/use-will-change/index.mjs
init_define_process();
var WillChangeMotionValue = class extends MotionValue {
  constructor() {
    super(...arguments);
    this.members = [];
    this.transforms = /* @__PURE__ */ new Set();
  }
  add(name) {
    let memberName;
    if (isTransformProp(name)) {
      this.transforms.add(name);
      memberName = "transform";
    } else if (!isTransformOriginProp(name) && !isCSSVariable(name) && name !== "willChange") {
      memberName = camelToDash(name);
    }
    if (memberName) {
      addUniqueItem(this.members, memberName);
      this.update();
    }
  }
  remove(name) {
    if (isTransformProp(name)) {
      this.transforms.delete(name);
      if (!this.transforms.size) {
        removeItem(this.members, "transform");
      }
    } else {
      removeItem(this.members, camelToDash(name));
    }
    this.update();
  }
  update() {
    this.set(this.members.length ? this.members.join(", ") : "auto");
  }
};
function useWillChange() {
  return useConstant(() => new WillChangeMotionValue("auto"));
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/animation/animation-controls.mjs
init_define_process();
function animationControls() {
  let hasMounted = false;
  const pendingAnimations = [];
  const subscribers = /* @__PURE__ */ new Set();
  const controls = {
    subscribe(visualElement2) {
      subscribers.add(visualElement2);
      return () => void subscribers.delete(visualElement2);
    },
    start(definition, transitionOverride) {
      if (hasMounted) {
        const animations2 = [];
        subscribers.forEach((visualElement2) => {
          animations2.push(animateVisualElement(visualElement2, definition, {
            transitionOverride
          }));
        });
        return Promise.all(animations2);
      } else {
        return new Promise((resolve) => {
          pendingAnimations.push({
            animation: [definition, transitionOverride],
            resolve
          });
        });
      }
    },
    set(definition) {
      invariant(hasMounted, "controls.set() should only be called after a component has mounted. Consider calling within a useEffect hook.");
      return subscribers.forEach((visualElement2) => {
        setValues(visualElement2, definition);
      });
    },
    stop() {
      subscribers.forEach((visualElement2) => {
        stopAnimation(visualElement2);
      });
    },
    mount() {
      hasMounted = true;
      pendingAnimations.forEach(({ animation, resolve }) => {
        controls.start(...animation).then(resolve);
      });
      return () => {
        hasMounted = false;
        controls.stop();
      };
    }
  };
  return controls;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/animation/use-animation.mjs
init_define_process();
function useAnimationControls() {
  const controls = useConstant(animationControls);
  useEffect(controls.mount, []);
  return controls;
}
var useAnimation = useAnimationControls;

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/use-cycle.mjs
init_define_process();
function useCycle(...items) {
  const index = useRef(0);
  const [item, setItem] = useState(items[index.current]);
  const runCycle = useCallback(
    (next) => {
      index.current = typeof next !== "number" ? wrap(0, items.length, index.current + 1) : next;
      setItem(items[index.current]);
    },
    [items.length, ...items]
  );
  return [item, runCycle];
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/use-in-view.mjs
init_define_process();
function useInView(ref, { root, margin, amount, once = false } = {}) {
  const [isInView, setInView] = useState(false);
  useEffect(() => {
    var _a;
    if (!ref.current || once && isInView)
      return;
    const onEnter = () => {
      setInView(true);
      return once ? void 0 : () => setInView(false);
    };
    const options = {
      root: (_a = root === null || root === void 0 ? void 0 : root.current) !== null && _a !== void 0 ? _a : void 0,
      margin,
      amount: amount === "some" ? "any" : amount
    };
    return inView(ref.current, onEnter, options);
  }, [root, ref, margin, once]);
  return isInView;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/gestures/drag/use-drag-controls.mjs
init_define_process();
var DragControls = class {
  constructor() {
    this.componentControls = /* @__PURE__ */ new Set();
  }
  subscribe(controls) {
    this.componentControls.add(controls);
    return () => this.componentControls.delete(controls);
  }
  start(event, options) {
    this.componentControls.forEach((controls) => {
      controls.start(event.nativeEvent || event, options);
    });
  }
};
var createDragControls = () => new DragControls();
function useDragControls() {
  return useConstant(createDragControls);
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/use-instant-transition.mjs
init_define_process();

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/use-instant-layout-transition.mjs
init_define_process();
function useInstantLayoutTransition() {
  return startTransition;
}
function startTransition(cb2) {
  if (!rootProjectionNode.current)
    return;
  rootProjectionNode.current.isUpdating = false;
  rootProjectionNode.current.blockUpdate();
  cb2 === null || cb2 === void 0 ? void 0 : cb2();
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/utils/use-instant-transition.mjs
function useInstantTransition() {
  const [forceUpdate, forcedRenderCount] = useForceUpdate();
  const startInstantLayoutTransition = useInstantLayoutTransition();
  useEffect(() => {
    es_default.postRender(() => es_default.postRender(() => instantAnimationState.current = false));
  }, [forcedRenderCount]);
  return (callback) => {
    startInstantLayoutTransition(() => {
      instantAnimationState.current = true;
      forceUpdate();
      callback();
    });
  };
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/projection/use-reset-projection.mjs
init_define_process();
function useResetProjection() {
  const reset = useCallback(() => {
    const root = rootProjectionNode.current;
    if (!root)
      return;
    root.resetTree();
  }, []);
  return reset;
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/animation/use-animated-state.mjs
init_define_process();
var createObject = () => ({});
var stateVisualElement = visualElement({
  build() {
  },
  measureViewportBox: createBox,
  resetTransform() {
  },
  restoreTransform() {
  },
  removeValueFromRenderState() {
  },
  render() {
  },
  scrapeMotionValuesFromProps: createObject,
  readValueFromInstance(_state, key, options) {
    return options.initialState[key] || 0;
  },
  makeTargetAnimatable(element, _a) {
    var { transition, transitionEnd } = _a, target = __rest(_a, ["transition", "transitionEnd"]);
    const origin = getOrigin(target, transition || {}, element);
    checkTargetForNewValues(element, target, origin);
    return Object.assign({ transition, transitionEnd }, target);
  }
});
var useVisualState = makeUseVisualState({
  scrapeMotionValuesFromProps: createObject,
  createRenderState: createObject
});
function useAnimatedState(initialState) {
  const [animationState, setAnimationState] = useState(initialState);
  const visualState = useVisualState({}, false);
  const element = useConstant(() => stateVisualElement({ props: {}, visualState }, { initialState }));
  useEffect(() => {
    element.mount({});
    return element.unmount;
  }, [element]);
  useEffect(() => {
    element.setProps({
      onUpdate: (v4) => {
        setAnimationState(Object.assign({}, v4));
      }
    });
  }, [setAnimationState, element]);
  const startAnimation2 = useConstant(() => (animationDefinition) => {
    return animateVisualElement(element, animationDefinition);
  });
  return [animationState, startAnimation2];
}

// .yarn/__virtual__/framer-motion-virtual-e14b5156bc/3/.yarn/global/cache/framer-motion-npm-7.2.0-06e61f87ae-9.zip/node_modules/framer-motion/dist/es/value/use-inverted-scale.mjs
init_define_process();
var maxScale = 1e5;
var invertScale = (scale2) => scale2 > 1e-3 ? 1 / scale2 : maxScale;
var hasWarned = false;
function useInvertedScale(scale2) {
  let parentScaleX = useMotionValue(1);
  let parentScaleY = useMotionValue(1);
  const visualElement2 = useVisualElementContext();
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
  const scaleX = useTransform(parentScaleX, invertScale);
  const scaleY = useTransform(parentScaleY, invertScale);
  return { scaleX, scaleY };
}
export {
  AnimatePresence,
  AnimateSharedLayout,
  AnimationType,
  DeprecatedLayoutGroupContext,
  DragControls,
  FlatTree,
  LayoutGroup,
  LayoutGroupContext,
  LazyMotion,
  MotionConfig,
  MotionConfigContext,
  MotionContext,
  MotionValue,
  PresenceContext,
  Reorder,
  SwitchLayoutGroupContext,
  addPointerEvent,
  addScaleCorrector,
  animate2 as animate,
  animateVisualElement,
  animationControls,
  animations,
  calcLength,
  checkTargetForNewValues,
  createBox,
  createDomMotionComponent,
  createMotionComponent,
  domAnimation,
  domMax,
  filterProps,
  isBrowser,
  isDragActive,
  isMotionValue,
  isValidMotionProp,
  m4 as m,
  makeUseVisualState,
  motion,
  motionValue,
  resolveMotionValue,
  transform,
  useAnimation,
  useAnimationControls,
  useAnimationFrame,
  useCycle,
  useAnimatedState as useDeprecatedAnimatedState,
  useInvertedScale as useDeprecatedInvertedScale,
  useDomEvent,
  useDragControls,
  useElementScroll,
  useForceUpdate,
  useInView,
  useInstantLayoutTransition,
  useInstantTransition,
  useIsPresent,
  useIsomorphicLayoutEffect,
  useMotionTemplate,
  useMotionValue,
  usePresence,
  useReducedMotion,
  useReducedMotionConfig,
  useResetProjection,
  useScroll,
  useSpring,
  useTime,
  useTransform,
  useUnmountEffect,
  useVelocity,
  useViewportScroll,
  useVisualElementContext,
  useWillChange,
  visualElement,
  wrapHandler
};

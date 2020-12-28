(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[10],{

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/forkMe-1a2bcb7dd2c870c3afe5d50466500c18.png";

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: /media/zed/fd122d21-3c12-449a-93ac-a42771fbdb08/z/monorepo/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteralLoose.js
var taggedTemplateLiteralLoose = __webpack_require__(7);

// EXTERNAL MODULE: /media/zed/fd122d21-3c12-449a-93ac-a42771fbdb08/z/monorepo/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(3);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: /media/zed/fd122d21-3c12-449a-93ac-a42771fbdb08/z/monorepo/node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(1);

// EXTERNAL MODULE: /media/zed/fd122d21-3c12-449a-93ac-a42771fbdb08/z/monorepo/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(4);

// EXTERNAL MODULE: /media/zed/fd122d21-3c12-449a-93ac-a42771fbdb08/z/monorepo/node_modules/@emotion/react/dist/emotion-react.browser.esm.js
var emotion_react_browser_esm = __webpack_require__(8);

// EXTERNAL MODULE: /media/zed/fd122d21-3c12-449a-93ac-a42771fbdb08/z/monorepo/node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js
var gatsby_browser_entry = __webpack_require__(14);

// EXTERNAL MODULE: ./src/components/bio.tsx
var bio = __webpack_require__(46);

// EXTERNAL MODULE: ./src/components/layout.tsx + 3 modules
var layout = __webpack_require__(18);

// EXTERNAL MODULE: ./src/components/seo.tsx
var seo = __webpack_require__(17);

// CONCATENATED MODULE: ./src/components/code/getUser.ts



var shaDB = {
  get: function () {
    var _get = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(key, type) {
      var _yield$Function, getDB, db;

      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return new Function("return  import(\"https://unpkg.com/@zedvision/shadb@10.13.18/src/shaDB.js\")")();

            case 2:
              _yield$Function = _context.sent;
              getDB = _yield$Function.getDB;
              _context.next = 6;
              return getDB("shaDB");

            case 6:
              _context.t0 = _context.sent;
              _context.next = 9;
              return (0, _context.t0)();

            case 9:
              db = _context.sent;
              return _context.abrupt("return", db.get(key, type));

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function get(_x, _x2) {
      return _get.apply(this, arguments);
    }

    return get;
  }(),
  put: function () {
    var _put = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2(key, value) {
      var _yield$Function2, getDB, db;

      return regenerator_default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return new Function("return import(\"https://unpkg.com/@zedvision/shadb@10.13.18/src/shaDB.js\")")();

            case 2:
              _yield$Function2 = _context2.sent;
              getDB = _yield$Function2.getDB;
              _context2.next = 6;
              return getDB("shaDB");

            case 6:
              _context2.t0 = _context2.sent;
              _context2.next = 9;
              return (0, _context2.t0)();

            case 9:
              db = _context2.sent;
              return _context2.abrupt("return", db.put(key, value));

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function put(_x3, _x4) {
      return _put.apply(this, arguments);
    }

    return put;
  }()
};
function getUserId() {
  return _getUserId.apply(this, arguments);
}

function _getUserId() {
  _getUserId = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee3() {
    var uuid, resp, data;
    return regenerator_default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(typeof window === "undefined")) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", "");

          case 2:
            _context3.next = 4;
            return shaDB.get("uuid");

          case 4:
            uuid = _context3.sent;

            if (uuid) {
              _context3.next = 15;
              break;
            }

            _context3.next = 8;
            return fetch("https://code.zed.vision/register");

          case 8:
            resp = _context3.sent;
            _context3.next = 11;
            return resp.json();

          case 11:
            data = _context3.sent;
            _context3.next = 14;
            return shaDB.put("uuid", data.uuid);

          case 14:
            return _context3.abrupt("return", data.uuid);

          case 15:
            return _context3.abrupt("return", uuid);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getUserId.apply(this, arguments);
}
// EXTERNAL MODULE: ./src/components/utils/typography.ts
var typography = __webpack_require__(26);

// CONCATENATED MODULE: ./src/components/code/importScript.js
var cache={};var importModule=/*#__PURE__*/function(){var _ref=Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee2(src){return regenerator_default.a.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_context2.t0=cache&&cache[src];if(_context2.t0){_context2.next=5;break;}_context2.next=4;return fetch(src).then(function(resp){return resp.text();}).then(/*#__PURE__*/function(){var _ref2=Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee(text){var moduleCache,url,mod;return regenerator_default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:moduleCache=cache||{};url=URL.createObjectURL(new Blob([text],{type:"application/javascript"}));_context.next=4;return new Function("return import(\""+url+"\")")();case 4:mod=_context.sent;if(typeof mod.default!=="undefined"){moduleCache[src]=mod.default;}else{moduleCache[src]=mod;}return _context.abrupt("return",moduleCache[src]);case 7:case"end":return _context.stop();}}},_callee);}));return function(_x2){return _ref2.apply(this,arguments);};}());case 4:_context2.t0=_context2.sent;case 5:return _context2.abrupt("return",_context2.t0);case 6:case"end":return _context2.stop();}}},_callee2);}));return function importModule(_x){return _ref.apply(this,arguments);};}();var importScript=function importScript(src,res){if(res===void 0){res=[];}if(typeof window==="undefined")return{};var prefix=src.slice(0,8);if(prefix==="https://"){return window.document.head.querySelector("script[src=\""+src+"\"]")||new Promise(function(resolve,reject){var s=window.document.createElement("script");s.src=src;s.async="async";s.type="application/javascript";s.onload=function(){if(res.length===0){resolve(window);}var ret={};res.forEach(function(x){return Object.assign(ret,window[x]);});resolve(ret);};s.onerror=reject;window.document.head.appendChild(s);});}else if(prefix==="@zedvisi"){// if (!cache[src]) cache[src] = import(`https://unpkg.com/${src}`);
// return cache[src];
}};
// EXTERNAL MODULE: ./src/components/code/hash.js
var hash = __webpack_require__(45);

// CONCATENATED MODULE: ./src/components/code/Qr.tsx





function _templateObject3() {
  var data = Object(taggedTemplateLiteralLoose["a" /* default */])(["\n              font-family: Roboto;\n              font-size: 20px;\n              text-transform: uppercase; \n              color: white;\n            "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = Object(taggedTemplateLiteralLoose["a" /* default */])(["\n              width: 200px;\n              height: 200px;\n              display: block;\n              box-shadow: 0 0 ", "px 5px ", ";\n          "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = Object(taggedTemplateLiteralLoose["a" /* default */])(["\n        background: blue;\n        display: inline-block;\n        padding: 10px 10px 0px 10px;\n        border-radius: 12px;\n        text-align: center;\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

/** @jsx jsx */




var Qr_Qr = function Qr() {
  var ref = react_default.a.useRef(null);

  var _React$useState = react_default.a.useState(100),
      retry = _React$useState[0],
      setRetry = _React$useState[1];

  var _React$useState2 = react_default.a.useState(0),
      counter = _React$useState2[0],
      setCounter = _React$useState2[1];

  react_default.a.useEffect(function () {
    var qr;

    var connect = /*#__PURE__*/function () {
      var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2() {
        var _yield$importModule, sha256, _yield$importModule2, QRious, key, url, options, toCheck, res;

        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return importModule("https://unpkg.com/@zedvision/sha256@10.12.14/sha256.js");

              case 2:
                _yield$importModule = _context2.sent;
                sha256 = _yield$importModule.sha256;
                _context2.next = 6;
                return importModule("https://unpkg.com/@zedvision/qrious@10.13.20/dist/qrious.esm.js");

              case 6:
                _yield$importModule2 = _context2.sent;
                QRious = _yield$importModule2.QRious;
                // const req = await fetch("https://code.zed.vision/token");
                // const data = await req.json();
                setCounter(20); // const key = data.key;

                _context2.next = 11;
                return sha256(Math.random() + "-" + Math.random() + "-" + Math.random());

              case 11:
                key = _context2.sent;
                // const key = "12345678";
                url = "https://zed.vision/" + key;
                options = {
                  element: ref.current,
                  size: 200,
                  foregroundAlpha: .9,
                  foreground: "red",
                  padding: 12,
                  backgroundAlpha: 0.8,
                  background: "black",
                  value: url
                };

                if (qr) {
                  qr.set(options);
                } else {
                  qr = new QRious(options);
                } //const check = await fetch(`https://code.zed.vision/check?key=${key}`);
                //const res = await check.json();
                // if (res.expired === false) {
                //  location.href = "https://zed.vision/code/";
                // }


                setTimeout(function () {
                  return setRetry(function (x) {
                    return x - 1;
                  });
                }, 20000);
                _context2.next = 18;
                return Object(hash["b" /* hash */])(url, true);

              case 18:
                toCheck = _context2.sent;
                console.log({
                  toCheck: toCheck
                });

                try {
                  res = toCheck.map( /*#__PURE__*/function () {
                    var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(dig) {
                      var resultKey;
                      return regenerator_default.a.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              console.log({
                                awaiting: dig
                              });
                              _context.next = 3;
                              return Object(hash["a" /* getHash */])(dig, 30000);

                            case 3:
                              resultKey = _context.sent;
                              console.log({
                                result: dig
                              });
                              location.href = "https://ipfs.io/ipfs/" + resultKey;

                            case 6:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee);
                    }));

                    return function (_x) {
                      return _ref2.apply(this, arguments);
                    };
                  }());
                } catch (_unused) {
                  console.log({
                    catching: "next time"
                  }); //next code maybe
                }

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function connect() {
        return _ref.apply(this, arguments);
      };
    }();

    if (typeof window !== "undefined" && retry > 0) connect();
  }, [retry]);
  react_default.a.useEffect(function () {
    if (typeof window !== "undefined" && counter) {
      setTimeout(function () {
        return setCounter(function (x) {
          return x - 1;
        });
      }, 333);
    }
  }, [counter]);
  return Object(emotion_react_browser_esm["c" /* jsx */])(react_default.a.Fragment, null, Object(emotion_react_browser_esm["c" /* jsx */])("a", {
    href: "code/"
  }, retry > 0 && Object(emotion_react_browser_esm["c" /* jsx */])("div", {
    css: Object(emotion_react_browser_esm["b" /* css */])(_templateObject())
  }, Object(emotion_react_browser_esm["c" /* jsx */])("canvas", {
    css: Object(emotion_react_browser_esm["b" /* css */])(_templateObject2(), 10 + 2 * counter, retry % 4 === 3 ? "darkorange" : retry % 4 === 2 ? "green" : "darkred"),
    ref: ref
  }), Object(emotion_react_browser_esm["c" /* jsx */])("p", {
    css: Object(emotion_react_browser_esm["b" /* css */])(_templateObject3())
  }, "Connect device"))),  false && false);
};
// EXTERNAL MODULE: ./assets/forkMe.png
var forkMe = __webpack_require__(154);
var forkMe_default = /*#__PURE__*/__webpack_require__.n(forkMe);

// CONCATENATED MODULE: ./src/pages/index.tsx





function pages_templateObject2() {
  var data = Object(taggedTemplateLiteralLoose["a" /* default */])(["    \n                    box-shadow: \"none\";\n                  "]);

  pages_templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function pages_templateObject() {
  var data = Object(taggedTemplateLiteralLoose["a" /* default */])(["  \n                      margin-bottom: ", ";\n                      "]);

  pages_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

/// <reference types="@emotion/react/types/css-prop" />

/** @jsx jsx */











var isMobile = function isMobile() {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
};

var pages_BlogIndex = function BlogIndex(_ref) {
  var data = _ref.data;
  var edges = data.allMdx.edges;
  react["useEffect"](function () {
    if (typeof window !== "undefined") {
      var install = /*#__PURE__*/function () {
        var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
          return regenerator_default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.t0 = console;
                  _context.next = 3;
                  return getUserId();

                case 3:
                  _context.t1 = _context.sent;

                  _context.t0.log.call(_context.t0, _context.t1);

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function install() {
          return _ref2.apply(this, arguments);
        };
      }();

      install(); // registerSW();
    }
  }, []);
  return Object(emotion_react_browser_esm["c" /* jsx */])(layout["a" /* Layout */], null, Object(emotion_react_browser_esm["c" /* jsx */])(seo["a" /* SEO */], {
    title: "This is Zed vision"
  }), isMobile() === false ? Object(emotion_react_browser_esm["c" /* jsx */])("h1", null, "Link your mobile with this code: ", Object(emotion_react_browser_esm["c" /* jsx */])(Qr_Qr, null)) : Object(emotion_react_browser_esm["c" /* jsx */])("h1", null, "This is my blog."), Object(emotion_react_browser_esm["c" /* jsx */])("a", {
    href: "https://github.com/zed-vision/monorepo"
  }, Object(emotion_react_browser_esm["c" /* jsx */])("img", {
    loading: "lazy",
    width: "149",
    height: "149",
    src: forkMe_default.a,
    style: {
      position: "absolute",
      top: 0,
      right: 0
    },
    alt: "Fork me on GitHub"
  })), edges.map(function (_ref3) {
    var node = _ref3.node;
    var title = node.frontmatter.title || node.fields.slug;
    return Object(emotion_react_browser_esm["c" /* jsx */])("article", {
      key: node.fields.slug
    }, Object(emotion_react_browser_esm["c" /* jsx */])("header", null, Object(emotion_react_browser_esm["c" /* jsx */])("h3", {
      css: Object(emotion_react_browser_esm["b" /* css */])(pages_templateObject(), Object(typography["b" /* rhythm */])(1 / 4))
    }, Object(emotion_react_browser_esm["c" /* jsx */])(gatsby_browser_entry["Link"], {
      css: Object(emotion_react_browser_esm["b" /* css */])(pages_templateObject2()),
      to: node.fields.slug
    }, title)), Object(emotion_react_browser_esm["c" /* jsx */])("small", null, node.frontmatter.date)), Object(emotion_react_browser_esm["c" /* jsx */])("section", null, Object(emotion_react_browser_esm["c" /* jsx */])("p", {
      dangerouslySetInnerHTML: {
        __html: node.frontmatter.description || node.excerpt
      }
    })));
  }), Object(emotion_react_browser_esm["c" /* jsx */])(bio["a" /* Bio */], null));
};

/* harmony default export */ var pages = __webpack_exports__["default"] = (pages_BlogIndex);
var pageQuery = "497448492";

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: /media/zed/fd122d21-3c12-449a-93ac-a42771fbdb08/z/monorepo/node_modules/@babel/runtime/helpers/extends.js
var helpers_extends = __webpack_require__(23);

// EXTERNAL MODULE: /media/zed/fd122d21-3c12-449a-93ac-a42771fbdb08/z/monorepo/node_modules/react/index.js
var react = __webpack_require__(0);

// EXTERNAL MODULE: /media/zed/fd122d21-3c12-449a-93ac-a42771fbdb08/z/monorepo/node_modules/@emotion/memoize/dist/emotion-memoize.browser.esm.js
var emotion_memoize_browser_esm = __webpack_require__(33);

// CONCATENATED MODULE: /media/zed/fd122d21-3c12-449a-93ac-a42771fbdb08/z/monorepo/node_modules/@emotion/styled/node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.browser.esm.js

var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var isPropValid = /* #__PURE__ */Object(emotion_memoize_browser_esm["a" /* default */])(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);
/* harmony default export */ var emotion_is_prop_valid_browser_esm = (isPropValid);
// EXTERNAL MODULE: /media/zed/fd122d21-3c12-449a-93ac-a42771fbdb08/z/monorepo/node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(44);

// EXTERNAL MODULE: /media/zed/fd122d21-3c12-449a-93ac-a42771fbdb08/z/monorepo/node_modules/@emotion/react/dist/emotion-element-4fbd89c5.browser.esm.js
var emotion_element_4fbd89c5_browser_esm = __webpack_require__(9);

// EXTERNAL MODULE: /media/zed/fd122d21-3c12-449a-93ac-a42771fbdb08/z/monorepo/node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js
var emotion_utils_browser_esm = __webpack_require__(16);

// EXTERNAL MODULE: /media/zed/fd122d21-3c12-449a-93ac-a42771fbdb08/z/monorepo/node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js + 2 modules
var emotion_serialize_browser_esm = __webpack_require__(19);

// CONCATENATED MODULE: /media/zed/fd122d21-3c12-449a-93ac-a42771fbdb08/z/monorepo/node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js






var testOmitPropsOnStringTag = emotion_is_prop_valid_browser_esm;

var testOmitPropsOnComponent = function testOmitPropsOnComponent(key) {
  return key !== 'theme';
};

var getDefaultShouldForwardProp = function getDefaultShouldForwardProp(tag) {
  return typeof tag === 'string' && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
};

var composeShouldForwardProps = function composeShouldForwardProps(tag, options, isReal) {
  var shouldForwardProp;

  if (options) {
    var optionsShouldForwardProp = options.shouldForwardProp;
    shouldForwardProp = tag.__emotion_forwardProp && optionsShouldForwardProp ? function (propName) {
      return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
    } : optionsShouldForwardProp;
  }

  if (typeof shouldForwardProp !== 'function' && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp;
  }

  return shouldForwardProp;
};

var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";

var emotion_styled_base_browser_esm_createStyled = function createStyled(tag, options) {
  if (false) {}

  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;
  var identifierName;
  var targetClassName;

  if (options !== undefined) {
    identifierName = options.label;
    targetClassName = options.target;
  }

  var shouldForwardProp = composeShouldForwardProps(tag, options, isReal);
  var defaultShouldForwardProp = shouldForwardProp || getDefaultShouldForwardProp(baseTag);
  var shouldUseAs = !defaultShouldForwardProp('as');
  return function () {
    var args = arguments;
    var styles = isReal && tag.__emotion_styles !== undefined ? tag.__emotion_styles.slice(0) : [];

    if (identifierName !== undefined) {
      styles.push("label:" + identifierName + ";");
    }

    if (args[0] == null || args[0].raw === undefined) {
      styles.push.apply(styles, args);
    } else {
      if (false) {}

      styles.push(args[0][0]);
      var len = args.length;
      var i = 1;

      for (; i < len; i++) {
        if (false) {}

        styles.push(args[i], args[0][i]);
      }
    } // $FlowFixMe: we need to cast StatelessFunctionalComponent to our PrivateStyledComponent class


    var Styled = Object(emotion_element_4fbd89c5_browser_esm["e" /* w */])(function (props, cache, ref) {
      var finalTag = shouldUseAs && props.as || baseTag;
      var className = '';
      var classInterpolations = [];
      var mergedProps = props;

      if (props.theme == null) {
        mergedProps = {};

        for (var key in props) {
          mergedProps[key] = props[key];
        }

        mergedProps.theme = Object(react["useContext"])(emotion_element_4fbd89c5_browser_esm["b" /* T */]);
      }

      if (typeof props.className === 'string') {
        className = Object(emotion_utils_browser_esm["a" /* getRegisteredStyles */])(cache.registered, classInterpolations, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }

      var serialized = Object(emotion_serialize_browser_esm["a" /* serializeStyles */])(styles.concat(classInterpolations), cache.registered, mergedProps);
      var rules = Object(emotion_utils_browser_esm["b" /* insertStyles */])(cache, serialized, typeof finalTag === 'string');
      className += cache.key + "-" + serialized.name;

      if (targetClassName !== undefined) {
        className += " " + targetClassName;
      }

      var finalShouldForwardProp = shouldUseAs && shouldForwardProp === undefined ? getDefaultShouldForwardProp(finalTag) : defaultShouldForwardProp;
      var newProps = {};

      for (var _key in props) {
        if (shouldUseAs && _key === 'as') continue;

        if ( // $FlowFixMe
        finalShouldForwardProp(_key)) {
          newProps[_key] = props[_key];
        }
      }

      newProps.className = className;
      newProps.ref = ref;
      var ele = /*#__PURE__*/Object(react["createElement"])(finalTag, newProps);
      return ele;
    });
    Styled.displayName = identifierName !== undefined ? identifierName : "Styled(" + (typeof baseTag === 'string' ? baseTag : baseTag.displayName || baseTag.name || 'Component') + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles;
    Styled.__emotion_forwardProp = shouldForwardProp;
    Object.defineProperty(Styled, 'toString', {
      value: function value() {
        if (targetClassName === undefined && "production" !== 'production') {
          return 'NO_COMPONENT_SELECTOR';
        } // $FlowFixMe: coerce undefined to string


        return "." + targetClassName;
      }
    });

    Styled.withComponent = function (nextTag, nextOptions) {
      return createStyled(nextTag, Object(esm_extends["a" /* default */])({}, options, {}, nextOptions, {
        shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
      })).apply(void 0, styles);
    };

    return Styled;
  };
};

/* harmony default export */ var emotion_styled_base_browser_esm = (emotion_styled_base_browser_esm_createStyled);
// CONCATENATED MODULE: /media/zed/fd122d21-3c12-449a-93ac-a42771fbdb08/z/monorepo/node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js







var tags = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', // SVG
'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];
var newStyled = emotion_styled_base_browser_esm.bind();
tags.forEach(function (tagName) {
  // $FlowFixMe: we can ignore this because its exposed type is defined by the CreateStyled type
  newStyled[tagName] = newStyled(tagName);
});
/* harmony default export */ var emotion_styled_browser_esm = __webpack_exports__["a"] = (newStyled);

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getHash; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
var ipfsClient=null;var half=function half(data){var halfLength=(data.length-data.length%2)/2;if(data.slice(0,halfLength)===data.slice(halfLength-1,2*halfLength-1)){return data.slice(0,halfLength);}// console.log({
//   slice1: data.slice(0, halfLength) ,
//   slice2: data.slice(halfLength-1, 2 * halfLength-1)
// })
return data;};function getClient(){return _getClient.apply(this,arguments);}function _getClient(){_getClient=Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(){return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:if(!ipfsClient){_context3.next=2;break;}return _context3.abrupt("return",ipfsClient);case 2:_context3.next=4;return new Function("return import(\"https://ipfs.io/ipfs/QmWoMiLNqEY6S3GWXgxrZVZvuUYeFSJMjyo1gmtcWUgDwp/src/ipfsKV.js\")")();case 4:_context3.next=6;return _context3.sent.getIpfsClient();case 6:ipfsClient=_context3.sent;return _context3.abrupt("return",ipfsClient);case 8:case"end":return _context3.stop();}}},_callee3);}));return _getClient.apply(this,arguments);}var hash=/*#__PURE__*/function(){var _ref=Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(data,onlyHash){var client;return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.next=2;return getClient();case 2:client=_context.sent;_context.t0=Promise;_context.next=6;return client.add(data+"N"+data,{onlyHash:onlyHash});case 6:_context.t1=_context.sent;_context.next=9;return client.add(data+"O"+data,{onlyHash:onlyHash});case 9:_context.t2=_context.sent;_context.next=12;return client.add(data+"I"+data,{onlyHash:onlyHash});case 12:_context.t3=_context.sent;_context.next=15;return client.add(data+"S"+data,{onlyHash:onlyHash});case 15:_context.t4=_context.sent;_context.next=18;return client.add(data+"E"+data,{onlyHash:onlyHash});case 18:_context.t5=_context.sent;_context.next=21;return client.add(data+"!"+data,{onlyHash:onlyHash});case 21:_context.t6=_context.sent;_context.t7=[_context.t1,_context.t2,_context.t3,_context.t4,_context.t5,_context.t6];_context.next=25;return _context.t0.all.call(_context.t0,_context.t7);case 25:return _context.abrupt("return",_context.sent);case 26:case"end":return _context.stop();}}},_callee);}));return function hash(_x,_x2){return _ref.apply(this,arguments);};}();var getHash=/*#__PURE__*/function(){var _ref2=Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(cid,timeout){var client,data;return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_context2.next=2;return getClient();case 2:client=_context2.sent;_context2.next=5;return client.get(cid,timeout);case 5:data=_context2.sent;return _context2.abrupt("return",half(data));case 7:case"end":return _context2.stop();}}},_callee2);}));return function getHash(_x3,_x4){return _ref2.apply(this,arguments);};}();

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bio; });
/* harmony import */ var _babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27);
/* harmony import */ var _utils_typography__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(26);
/* harmony import */ var _zed_profile_pic_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(47);
/* harmony import */ var _zed_profile_pic_jpg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_zed_profile_pic_jpg__WEBPACK_IMPORTED_MODULE_4__);


function _templateObject2() {
  var data = Object(_babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(["\n  margin-right: ", ";\n  margin-bottom: 0;\n  overflow: hidden;\n  width: 50px;\n  height: 50px;\n  border-radius: 25px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = Object(_babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(["\n  margin-top: ", ";\n  display: flex;\n  margin-bottom: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}





var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].div(_templateObject(), Object(_utils_typography__WEBPACK_IMPORTED_MODULE_3__[/* rhythm */ "b"])(2.5), Object(_utils_typography__WEBPACK_IMPORTED_MODULE_3__[/* rhythm */ "b"])(2.5));
var StyledImgDiv = _emotion_styled__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].div(_templateObject2(), Object(_utils_typography__WEBPACK_IMPORTED_MODULE_3__[/* rhythm */ "b"])(1 / 2));
var objectives = ["a bit less\n  frustrating.", "more fun", "great again"];
var Bio = function Bio() {
  var random = Math.random();
  if (typeof window === "undefined") random = 0.4; //have a consistent ssr

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](Container, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](StyledImgDiv, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("img", {
    alt: "Zoltan Erdos",
    src: _zed_profile_pic_jpg__WEBPACK_IMPORTED_MODULE_4___default.a
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("p", null, "Written by ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("strong", null, "Zoltan Erdos"), ", who is interested to make software development", " " + (objectives[Math.floor(random * objectives.length)] || "crazy."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("a", {
    href: "https://twitter.com/ZoltanErdos"
  }, "Follow me on Twitter")));
};

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/zed-profile-pic-cd941e033fafca9e98b23dae7e5a0ccc.jpg";

/***/ })

}]);
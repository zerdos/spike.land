var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb2, mod) => function __require() {
  return mod || (0, cb2[Object.keys(cb2)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// ../../node_modules/framer-motion/node_modules/@emotion/memoize/dist/memoize.browser.cjs.js
var require_memoize_browser_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@emotion/memoize/dist/memoize.browser.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function memoize2(fn) {
      var cache = {};
      return function(arg) {
        if (cache[arg] === void 0)
          cache[arg] = fn(arg);
        return cache[arg];
      };
    }
    exports.default = memoize2;
  }
});

// ../../node_modules/framer-motion/node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.cjs.js
var require_is_prop_valid_browser_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _interopDefault(ex) {
      return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
    }
    var memoize2 = _interopDefault(require_memoize_browser_cjs());
    var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
    var index = memoize2(function(prop) {
      return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
    });
    exports.default = index;
  }
});

// ../../node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "../../node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var hasSymbol = typeof Symbol === "function" && Symbol.for;
        var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
        var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
        var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
        var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
        var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
        var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
        var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
        var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
        var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
        var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
        var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
        var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
        var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
        var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
        var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
        var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
        var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
        function isValidElementType(type) {
          return typeof type === "string" || typeof type === "function" || type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_ASYNC_MODE_TYPE:
                  case REACT_CONCURRENT_MODE_TYPE:
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var AsyncMode = REACT_ASYNC_MODE_TYPE;
        var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment4 = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
            }
          }
          return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
        }
        function isConcurrentMode(object) {
          return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment2(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports.AsyncMode = AsyncMode;
        exports.ConcurrentMode = ConcurrentMode;
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment4;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment2;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// ../../node_modules/prop-types/node_modules/react-is/index.js
var require_react_is = __commonJS({
  "../../node_modules/prop-types/node_modules/react-is/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development();
    }
  }
});

// ../../node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "../../node_modules/object-assign/index.js"(exports, module) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
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
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };
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

// ../../node_modules/prop-types/checkPropTypes.js
var require_checkPropTypes = __commonJS({
  "../../node_modules/prop-types/checkPropTypes.js"(exports, module) {
    "use strict";
    var printWarning = function() {
    };
    if (true) {
      ReactPropTypesSecret = require_ReactPropTypesSecret();
      loggedTypeFailures = {};
      has = Function.call.bind(Object.prototype.hasOwnProperty);
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    var ReactPropTypesSecret;
    var loggedTypeFailures;
    var has;
    function checkPropTypes(typeSpecs, values3, location, componentName, getStack) {
      if (true) {
        for (var typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            var error;
            try {
              if (typeof typeSpecs[typeSpecName] !== "function") {
                var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.");
                err.name = "Invariant Violation";
                throw err;
              }
              error = typeSpecs[typeSpecName](values3, typeSpecName, componentName, location, null, ReactPropTypesSecret);
            } catch (ex) {
              error = ex;
            }
            if (error && !(error instanceof Error)) {
              printWarning((componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).");
            }
            if (error instanceof Error && !(error.message in loggedTypeFailures)) {
              loggedTypeFailures[error.message] = true;
              var stack = getStack ? getStack() : "";
              printWarning("Failed " + location + " type: " + error.message + (stack != null ? stack : ""));
            }
          }
        }
      }
    }
    checkPropTypes.resetWarningCache = function() {
      if (true) {
        loggedTypeFailures = {};
      }
    };
    module.exports = checkPropTypes;
  }
});

// ../../node_modules/prop-types/factoryWithTypeCheckers.js
var require_factoryWithTypeCheckers = __commonJS({
  "../../node_modules/prop-types/factoryWithTypeCheckers.js"(exports, module) {
    "use strict";
    var ReactIs = require_react_is();
    var assign = require_object_assign();
    var ReactPropTypesSecret = require_ReactPropTypesSecret();
    var checkPropTypes = require_checkPropTypes();
    var has = Function.call.bind(Object.prototype.hasOwnProperty);
    var printWarning = function() {
    };
    if (true) {
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    function emptyFunctionThatReturnsNull() {
      return null;
    }
    module.exports = function(isValidElement4, throwOnDirectAccess) {
      var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === "function") {
          return iteratorFn;
        }
      }
      var ANONYMOUS = "<<anonymous>>";
      var ReactPropTypes = {
        array: createPrimitiveTypeChecker("array"),
        bool: createPrimitiveTypeChecker("boolean"),
        func: createPrimitiveTypeChecker("function"),
        number: createPrimitiveTypeChecker("number"),
        object: createPrimitiveTypeChecker("object"),
        string: createPrimitiveTypeChecker("string"),
        symbol: createPrimitiveTypeChecker("symbol"),
        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        elementType: createElementTypeTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker
      };
      function is(x, y) {
        if (x === y) {
          return x !== 0 || 1 / x === 1 / y;
        } else {
          return x !== x && y !== y;
        }
      }
      function PropTypeError(message) {
        this.message = message;
        this.stack = "";
      }
      PropTypeError.prototype = Error.prototype;
      function createChainableTypeChecker(validate) {
        if (true) {
          var manualPropTypeCallCache = {};
          var manualPropTypeWarningCount = 0;
        }
        function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
          componentName = componentName || ANONYMOUS;
          propFullName = propFullName || propName;
          if (secret !== ReactPropTypesSecret) {
            if (throwOnDirectAccess) {
              var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");
              err.name = "Invariant Violation";
              throw err;
            } else if (typeof console !== "undefined") {
              var cacheKey = componentName + ":" + propName;
              if (!manualPropTypeCallCache[cacheKey] && manualPropTypeWarningCount < 3) {
                printWarning("You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.");
                manualPropTypeCallCache[cacheKey] = true;
                manualPropTypeWarningCount++;
              }
            }
          }
          if (props[propName] == null) {
            if (isRequired) {
              if (props[propName] === null) {
                return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
              }
              return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
            }
            return null;
          } else {
            return validate(props, propName, componentName, location, propFullName);
          }
        }
        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);
        return chainedCheckType;
      }
      function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName, componentName, location, propFullName, secret) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== expectedType) {
            var preciseType = getPreciseType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunctionThatReturnsNull);
      }
      function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
          }
          var propValue = props[propName];
          if (!Array.isArray(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
          }
          for (var i = 0; i < propValue.length; i++) {
            var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!isValidElement4(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!ReactIs.isValidElementType(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createInstanceTypeChecker(expectedClass) {
        function validate(props, propName, componentName, location, propFullName) {
          if (!(props[propName] instanceof expectedClass)) {
            var expectedClassName = expectedClass.name || ANONYMOUS;
            var actualClassName = getClassName(props[propName]);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
          if (true) {
            if (arguments.length > 1) {
              printWarning("Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).");
            } else {
              printWarning("Invalid argument supplied to oneOf, expected an array.");
            }
          }
          return emptyFunctionThatReturnsNull;
        }
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          for (var i = 0; i < expectedValues.length; i++) {
            if (is(propValue, expectedValues[i])) {
              return null;
            }
          }
          var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
            var type = getPreciseType(value);
            if (type === "symbol") {
              return String(value);
            }
            return value;
          });
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
          }
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
          }
          for (var key in propValue) {
            if (has(propValue, key)) {
              var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
              if (error instanceof Error) {
                return error;
              }
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers)) {
          true ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.") : void 0;
          return emptyFunctionThatReturnsNull;
        }
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (typeof checker !== "function") {
            printWarning("Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + ".");
            return emptyFunctionThatReturnsNull;
          }
        }
        function validate(props, propName, componentName, location, propFullName) {
          for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
            var checker2 = arrayOfTypeCheckers[i2];
            if (checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
              return null;
            }
          }
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`."));
        }
        return createChainableTypeChecker(validate);
      }
      function createNodeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          if (!isNode(props[propName])) {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          for (var key in shapeTypes) {
            var checker = shapeTypes[key];
            if (!checker) {
              continue;
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createStrictShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          var allKeys = assign({}, props[propName], shapeTypes);
          for (var key in allKeys) {
            var checker = shapeTypes[key];
            if (!checker) {
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  "));
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function isNode(propValue) {
        switch (typeof propValue) {
          case "number":
          case "string":
          case "undefined":
            return true;
          case "boolean":
            return !propValue;
          case "object":
            if (Array.isArray(propValue)) {
              return propValue.every(isNode);
            }
            if (propValue === null || isValidElement4(propValue)) {
              return true;
            }
            var iteratorFn = getIteratorFn(propValue);
            if (iteratorFn) {
              var iterator = iteratorFn.call(propValue);
              var step;
              if (iteratorFn !== propValue.entries) {
                while (!(step = iterator.next()).done) {
                  if (!isNode(step.value)) {
                    return false;
                  }
                }
              } else {
                while (!(step = iterator.next()).done) {
                  var entry = step.value;
                  if (entry) {
                    if (!isNode(entry[1])) {
                      return false;
                    }
                  }
                }
              }
            } else {
              return false;
            }
            return true;
          default:
            return false;
        }
      }
      function isSymbol(propType, propValue) {
        if (propType === "symbol") {
          return true;
        }
        if (!propValue) {
          return false;
        }
        if (propValue["@@toStringTag"] === "Symbol") {
          return true;
        }
        if (typeof Symbol === "function" && propValue instanceof Symbol) {
          return true;
        }
        return false;
      }
      function getPropType(propValue) {
        var propType = typeof propValue;
        if (Array.isArray(propValue)) {
          return "array";
        }
        if (propValue instanceof RegExp) {
          return "object";
        }
        if (isSymbol(propType, propValue)) {
          return "symbol";
        }
        return propType;
      }
      function getPreciseType(propValue) {
        if (typeof propValue === "undefined" || propValue === null) {
          return "" + propValue;
        }
        var propType = getPropType(propValue);
        if (propType === "object") {
          if (propValue instanceof Date) {
            return "date";
          } else if (propValue instanceof RegExp) {
            return "regexp";
          }
        }
        return propType;
      }
      function getPostfixForTypeWarning(value) {
        var type = getPreciseType(value);
        switch (type) {
          case "array":
          case "object":
            return "an " + type;
          case "boolean":
          case "date":
          case "regexp":
            return "a " + type;
          default:
            return type;
        }
      }
      function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
          return ANONYMOUS;
        }
        return propValue.constructor.name;
      }
      ReactPropTypes.checkPropTypes = checkPropTypes;
      ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
      ReactPropTypes.PropTypes = ReactPropTypes;
      return ReactPropTypes;
    };
  }
});

// ../../node_modules/prop-types/index.js
var require_prop_types = __commonJS({
  "../../node_modules/prop-types/index.js"(exports, module) {
    if (true) {
      ReactIs = require_react_is();
      throwOnDirectAccess = true;
      module.exports = require_factoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
    } else {
      module.exports = null();
    }
    var ReactIs;
    var throwOnDirectAccess;
  }
});

// ../../node_modules/react-is/cjs/react-is.development.js
var require_react_is_development2 = __commonJS({
  "../../node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var REACT_ELEMENT_TYPE = 60103;
        var REACT_PORTAL_TYPE = 60106;
        var REACT_FRAGMENT_TYPE = 60107;
        var REACT_STRICT_MODE_TYPE = 60108;
        var REACT_PROFILER_TYPE = 60114;
        var REACT_PROVIDER_TYPE = 60109;
        var REACT_CONTEXT_TYPE = 60110;
        var REACT_FORWARD_REF_TYPE = 60112;
        var REACT_SUSPENSE_TYPE = 60113;
        var REACT_SUSPENSE_LIST_TYPE = 60120;
        var REACT_MEMO_TYPE = 60115;
        var REACT_LAZY_TYPE = 60116;
        var REACT_BLOCK_TYPE = 60121;
        var REACT_SERVER_BLOCK_TYPE = 60122;
        var REACT_FUNDAMENTAL_TYPE = 60117;
        var REACT_SCOPE_TYPE = 60119;
        var REACT_OPAQUE_ID_TYPE = 60128;
        var REACT_DEBUG_TRACING_MODE_TYPE = 60129;
        var REACT_OFFSCREEN_TYPE = 60130;
        var REACT_LEGACY_HIDDEN_TYPE = 60131;
        if (typeof Symbol === "function" && Symbol.for) {
          var symbolFor = Symbol.for;
          REACT_ELEMENT_TYPE = symbolFor("react.element");
          REACT_PORTAL_TYPE = symbolFor("react.portal");
          REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
          REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode");
          REACT_PROFILER_TYPE = symbolFor("react.profiler");
          REACT_PROVIDER_TYPE = symbolFor("react.provider");
          REACT_CONTEXT_TYPE = symbolFor("react.context");
          REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
          REACT_SUSPENSE_TYPE = symbolFor("react.suspense");
          REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
          REACT_MEMO_TYPE = symbolFor("react.memo");
          REACT_LAZY_TYPE = symbolFor("react.lazy");
          REACT_BLOCK_TYPE = symbolFor("react.block");
          REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
          REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
          REACT_SCOPE_TYPE = symbolFor("react.scope");
          REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id");
          REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
          REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
          REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
        }
        var enableScopeAPI = false;
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
              return true;
            }
          }
          return false;
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                  case REACT_SUSPENSE_LIST_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment4 = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        var hasWarnedAboutDeprecatedIsConcurrentMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isConcurrentMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
              hasWarnedAboutDeprecatedIsConcurrentMode = true;
              console["warn"]("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment2(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment4;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment2;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// ../../node_modules/react-is/index.js
var require_react_is2 = __commonJS({
  "../../node_modules/react-is/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development2();
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

// ../../node_modules/framer-motion/dist/es/render/dom/motion.js
import { __assign as __assign36 } from "tslib";

// ../../node_modules/framer-motion/dist/es/motion/index.js
import {
  Fragment,
  createElement as createElement2
} from "react";
import { forwardRef, useContext as useContext6 } from "react";

// ../../node_modules/framer-motion/dist/es/motion/features/use-features.js
import { __assign } from "tslib";
import {
  createElement
} from "react";
import { useContext } from "react";

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

// ../../node_modules/framer-motion/dist/es/context/LazyContext.js
import { createContext } from "react";
var LazyContext = createContext({ strict: false });

// ../../node_modules/framer-motion/dist/es/motion/features/use-features.js
var featureNames = Object.keys(featureDefinitions);
var numFeatures = featureNames.length;
function useFeatures(props, visualElement2, preloadedFeatures) {
  var features = [];
  var lazyContext = useContext(LazyContext);
  if (!visualElement2)
    return null;
  if (preloadedFeatures && lazyContext.strict) {
    invariant(false, "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.");
  }
  for (var i = 0; i < numFeatures; i++) {
    var name_1 = featureNames[i];
    var _a = featureDefinitions[name_1], isEnabled = _a.isEnabled, Component3 = _a.Component;
    if (isEnabled(props) && Component3) {
      features.push(createElement(Component3, __assign({ key: name_1 }, props, { visualElement: visualElement2 })));
    }
  }
  return features;
}

// ../../node_modules/framer-motion/dist/es/context/MotionConfigContext.js
import { createContext as createContext2 } from "react";
var MotionConfigContext = createContext2({
  transformPagePoint: function(p) {
    return p;
  },
  isStatic: false
});

// ../../node_modules/framer-motion/dist/es/context/MotionContext/index.js
import { useContext as useContext2, createContext as createContext3 } from "react";
var MotionContext = createContext3({});
function useVisualElementContext() {
  return useContext2(MotionContext).visualElement;
}

// ../../node_modules/framer-motion/dist/es/motion/utils/use-visual-element.js
import { __assign as __assign2 } from "tslib";
import { useContext as useContext4, useRef as useRef2, useEffect as useEffect3 } from "react";

// ../../node_modules/framer-motion/dist/es/context/PresenceContext.js
import { createContext as createContext4 } from "react";
var PresenceContext = createContext4(null);

// ../../node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.js
import { useContext as useContext3, useEffect } from "react";

// ../../node_modules/framer-motion/dist/es/utils/use-constant.js
import { useRef } from "react";
function useConstant(init) {
  var ref = useRef(null);
  if (ref.current === null) {
    ref.current = init();
  }
  return ref.current;
}

// ../../node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.js
function usePresence() {
  var context = useContext3(PresenceContext);
  if (context === null)
    return [true, null];
  var isPresent2 = context.isPresent, onExitComplete = context.onExitComplete, register = context.register;
  var id = useUniqueId();
  useEffect(function() {
    return register(id);
  }, []);
  var safeToRemove = function() {
    return onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete(id);
  };
  return !isPresent2 && onExitComplete ? [false, safeToRemove] : [true];
}
function useIsPresent() {
  return isPresent(useContext3(PresenceContext));
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
import { createContext as createContext5 } from "react";
var LayoutGroupContext = createContext5(null);

// ../../node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.js
import { useLayoutEffect, useEffect as useEffect2 } from "react";

// ../../node_modules/framer-motion/dist/es/utils/is-browser.js
var isBrowser = typeof window !== "undefined";

// ../../node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.js
var useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect2;

// ../../node_modules/framer-motion/dist/es/motion/utils/use-visual-element.js
function useLayoutId(_a) {
  var layoutId = _a.layoutId;
  var layoutGroupId = useContext4(LayoutGroupContext);
  return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
}
function useVisualElement(Component3, visualState, props, createVisualElement) {
  var config = useContext4(MotionConfigContext);
  var lazyContext = useContext4(LazyContext);
  var parent = useVisualElementContext();
  var presenceContext = useContext4(PresenceContext);
  var layoutId = useLayoutId(props);
  var visualElementRef = useRef2(void 0);
  if (!createVisualElement)
    createVisualElement = lazyContext.renderer;
  if (!visualElementRef.current && createVisualElement) {
    visualElementRef.current = createVisualElement(Component3, {
      visualState,
      parent,
      props: __assign2(__assign2({}, props), { layoutId }),
      presenceId: presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.id,
      blockInitialAnimation: (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.initial) === false
    });
  }
  var visualElement2 = visualElementRef.current;
  useIsomorphicLayoutEffect(function() {
    if (!visualElement2)
      return;
    visualElement2.setProps(__assign2(__assign2(__assign2({}, config), props), { layoutId }));
    visualElement2.isPresent = isPresent(presenceContext);
    visualElement2.isPresenceRoot = !parent || parent.presenceId !== (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.id);
    visualElement2.syncRender();
  });
  useEffect3(function() {
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
import { useCallback } from "react";

// ../../node_modules/framer-motion/dist/es/utils/is-ref-object.js
function isRefObject(ref) {
  return typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}

// ../../node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.js
function useMotionRef(visualState, visualElement2, externalRef) {
  return useCallback(function(instance) {
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
  }, [visualElement2]);
}

// ../../node_modules/framer-motion/dist/es/context/MotionContext/create.js
import { useMemo, useContext as useContext5 } from "react";

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
  var _a = getCurrentTreeVariants(props, useContext5(MotionContext)), initial = _a.initial, animate3 = _a.animate;
  return useMemo(function() {
    return { initial, animate: animate3 };
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
    var isStatic = useContext6(MotionConfigContext).isStatic;
    var features = null;
    var context = useCreateMotionContext(props, isStatic);
    var visualState = useVisualState2(props, isStatic);
    if (!isStatic && isBrowser) {
      context.visualElement = useVisualElement(Component3, visualState, props, createVisualElement);
      features = useFeatures(props, context.visualElement, preloadedFeatures);
    }
    return createElement2(Fragment, null, createElement2(MotionContext.Provider, { value: context }, useRender(Component3, props, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic)), features);
  }
  return forwardRef(MotionComponent);
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

// ../../node_modules/framer-motion/dist/es/render/dom/utils/create-config.js
import { __assign as __assign12 } from "tslib";

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
import { __assign as __assign11 } from "tslib";
import { createElement as createElement3 } from "react";

// ../../node_modules/framer-motion/dist/es/render/html/use-props.js
import { __assign as __assign8 } from "tslib";
import { useMemo as useMemo2 } from "react";

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

// ../../node_modules/style-value-types/dist/es/numbers/index.js
import { __assign as __assign3 } from "tslib";

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
var alpha = __assign3(__assign3({}, number), { transform: clamp(0, 1) });
var scale = __assign3(__assign3({}, number), { default: 1 });

// ../../node_modules/style-value-types/dist/es/numbers/units.js
import { __assign as __assign4 } from "tslib";
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
var progressPercentage = __assign4(__assign4({}, percent), { parse: function(v) {
  return percent.parse(v) / 100;
}, transform: function(v) {
  return percent.transform(v * 100);
} });

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
import { __assign as __assign5 } from "tslib";
var clampRgbUnit = clamp(0, 255);
var rgbUnit = __assign5(__assign5({}, number), { transform: function(v) {
  return Math.round(clampRgbUnit(v));
} });
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
  return { values: values3, numColors, tokenised: v };
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
var complex = { test, parse, createTransformer, getAnimatableNone };

// ../../node_modules/style-value-types/dist/es/complex/filter.js
import { __assign as __assign6 } from "tslib";
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
var filter = __assign6(__assign6({}, complex), { getAnimatableNone: function(v) {
  var functions = v.match(functionRegex);
  return functions ? functions.map(applyDefaultFilter).join(" ") : v;
} });

// ../../node_modules/framer-motion/dist/es/render/dom/value-types/type-int.js
import { __assign as __assign7 } from "tslib";
var int = __assign7(__assign7({}, number), { transform: Math.round });

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
function buildHTMLStyles(state, latestValues, projection, layoutState, options, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin) {
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
      if ((projection === null || projection === void 0 ? void 0 : projection.isHydrated) && (layoutState === null || layoutState === void 0 ? void 0 : layoutState.isHydrated) && valueScaleCorrection[key]) {
        var correctedValue = valueScaleCorrection[key].process(value, layoutState, projection);
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
  if (layoutState && projection && buildProjectionTransform && buildProjectionTransformOrigin) {
    style3.transform = buildProjectionTransform(layoutState.deltaFinal, layoutState.treeScale, hasTransform ? transform3 : void 0);
    if (transformTemplate) {
      style3.transform = transformTemplate(transform3, style3.transform);
    }
    style3.transformOrigin = buildProjectionTransformOrigin(layoutState);
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
  return useMemo2(function() {
    var state = createHtmlRenderState();
    buildHTMLStyles(state, visualState, void 0, void 0, { enableHardwareAcceleration: !isStatic }, transformTemplate);
    var vars = state.vars, style3 = state.style;
    return __assign8(__assign8({}, vars), style3);
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
import { __assign as __assign10 } from "tslib";
import { useMemo as useMemo3 } from "react";

// ../../node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.js
import { __rest } from "tslib";

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
var progressToPixels = function(progress2, length) {
  return px.transform(progress2 * length);
};
var dashKeys = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
};
var camelKeys = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function buildSVGPath(attrs, totalLength, length, spacing2, offset, useDashCase) {
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
  var pathLength = progressToPixels(length, totalLength);
  var pathSpacing = progressToPixels(spacing2, totalLength);
  attrs[keys.array] = pathLength + " " + pathSpacing;
}

// ../../node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.js
function buildSVGAttrs(state, _a, projection, layoutState, options, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin) {
  var attrX = _a.attrX, attrY = _a.attrY, originX = _a.originX, originY = _a.originY, pathLength = _a.pathLength, _b = _a.pathSpacing, pathSpacing = _b === void 0 ? 1 : _b, _c = _a.pathOffset, pathOffset = _c === void 0 ? 0 : _c, latest = __rest(_a, ["attrX", "attrY", "originX", "originY", "pathLength", "pathSpacing", "pathOffset"]);
  buildHTMLStyles(state, latest, projection, layoutState, options, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin);
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
import { __assign as __assign9 } from "tslib";
var createSvgRenderState = function() {
  return __assign9(__assign9({}, createHtmlRenderState()), { attrs: {} });
};

// ../../node_modules/framer-motion/dist/es/render/svg/use-props.js
function useSVGProps(props, visualState) {
  var visualProps = useMemo3(function() {
    var state = createSvgRenderState();
    buildSVGAttrs(state, visualState, void 0, void 0, { enableHardwareAcceleration: false }, props.transformTemplate);
    return __assign10(__assign10({}, state.attrs), { style: __assign10({}, state.style) });
  }, [visualState]);
  if (props.style) {
    var rawStyles = {};
    copyRawValuesOnly(rawStyles, props.style, props);
    visualProps.style = __assign10(__assign10({}, rawStyles), visualProps.style);
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
    var elementProps = __assign11(__assign11(__assign11({}, filteredProps), visualProps), { ref });
    return createElement3(Component3, elementProps);
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
  "viewBox",
  "gradientTransform"
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
import { __rest as __rest2 } from "tslib";
import { useContext as useContext7 } from "react";

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
    var context = useContext7(MotionContext);
    var presenceContext = useContext7(PresenceContext);
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
      var target = __rest2(resolved, ["transitionEnd", "transition"]);
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
      buildSVGAttrs(renderState, latestValues, void 0, void 0, { enableHardwareAcceleration: false }, props.transformTemplate);
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
  return __assign12(__assign12({}, baseConfig), {
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
import { useEffect as useEffect4 } from "react";
function addDomEvent(target, eventName, handler, options) {
  target.addEventListener(eventName, handler, options);
  return function() {
    return target.removeEventListener(eventName, handler, options);
  };
}
function useDomEvent(ref, eventName, handler, options) {
  useEffect4(function() {
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
var defaultPagePoint = { pageX: 0, pageY: 0 };
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

// ../../node_modules/framer-motion/dist/es/gestures/use-hover-gesture.js
function createHoverEvent(visualElement2, isActive, callback) {
  return function(event, info) {
    var _a;
    if (!isMouseEvent(event) || isDragActive())
      return;
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
import { useRef as useRef3 } from "react";

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
import { useEffect as useEffect5 } from "react";
function useUnmountEffect(callback) {
  return useEffect5(function() {
    return function() {
      return callback();
    };
  }, []);
}

// ../../node_modules/popmotion/dist/es/animations/index.js
import { __rest as __rest4, __assign as __assign16 } from "tslib";

// ../../node_modules/popmotion/dist/es/animations/generators/spring.js
import { __rest as __rest3, __assign as __assign13 } from "tslib";

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
  duration2 = duration2 * 1e3;
  if (isNaN(undampedFreq)) {
    return {
      stiffness: 100,
      damping: 10,
      duration: duration2
    };
  } else {
    var stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
      duration: duration2
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
  var springOptions = __assign13({ velocity: 0, stiffness: 100, damping: 10, mass: 1, isResolvedFromDuration: false }, options);
  if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
    var derived = findSpring(options);
    springOptions = __assign13(__assign13(__assign13({}, springOptions), derived), { velocity: 0, mass: 1 });
    springOptions.isResolvedFromDuration = true;
  }
  return springOptions;
}
function spring(_a) {
  var _b = _a.from, from = _b === void 0 ? 0 : _b, _c = _a.to, to = _c === void 0 ? 1 : _c, _d = _a.restSpeed, restSpeed = _d === void 0 ? 2 : _d, restDelta = _a.restDelta, options = __rest3(_a, ["from", "to", "restSpeed", "restDelta"]);
  var state = { done: false, value: from };
  var _e = getSpringOptions(options), stiffness = _e.stiffness, damping = _e.damping, mass = _e.mass, velocity = _e.velocity, duration2 = _e.duration, isResolvedFromDuration = _e.isResolvedFromDuration;
  var resolveSpring = zero;
  var resolveVelocity = zero;
  function createSpring() {
    var initialVelocity = velocity ? -(velocity / 1e3) : 0;
    var initialDelta = to - from;
    var dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
    var undampedAngularFreq = Math.sqrt(stiffness / mass) / 1e3;
    restDelta !== null && restDelta !== void 0 ? restDelta : restDelta = Math.abs(to - from) <= 1 ? 0.01 : 0.4;
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
        state.done = t >= duration2;
      }
      state.value = state.done ? to : current;
      return state;
    },
    flipTarget: function() {
      var _a2;
      velocity = -velocity;
      _a2 = [to, from], from = _a2[0], to = _a2[1];
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
var progress = function(from, to, value) {
  var toFromDifference = to - from;
  return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};

// ../../node_modules/popmotion/dist/es/utils/mix.js
var mix = function(from, to, progress2) {
  return -progress2 * from + progress2 * to + from;
};

// ../../node_modules/popmotion/dist/es/utils/mix-color.js
import { __assign as __assign14 } from "tslib";
var mixLinearColor = function(from, to, v) {
  var fromExpo = from * from;
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
var mixColor = function(from, to) {
  var fromColorType = getColorType(from);
  var toColorType = getColorType(to);
  invariant(!!fromColorType, notAnimatable(from));
  invariant(!!toColorType, notAnimatable(to));
  invariant(fromColorType.transform === toColorType.transform, "Both colors must be hex/RGBA, OR both must be HSLA.");
  var fromColor = fromColorType.parse(from);
  var toColor = toColorType.parse(to);
  var blended = __assign14({}, fromColor);
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

// ../../node_modules/popmotion/dist/es/utils/mix-complex.js
import { __spreadArray, __assign as __assign15 } from "tslib";

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
var mixArray = function(from, to) {
  var output = __spreadArray([], from);
  var numValues = output.length;
  var blendValue = from.map(function(fromThis, i) {
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
  var output = __assign15(__assign15({}, origin), target);
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
  return { parsed, numNumbers, numRGB, numHSL };
}
var mixComplex = function(origin, target) {
  var template = complex.createTransformer(target);
  var originStats = analyse2(origin);
  var targetStats = analyse2(target);
  invariant(originStats.numHSL === targetStats.numHSL && originStats.numRGB === targetStats.numRGB && originStats.numNumbers >= targetStats.numNumbers, "Complex values '" + origin + "' and '" + target + "' too different to mix. Ensure all colors are of the same type.");
  return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
};

// ../../node_modules/popmotion/dist/es/utils/interpolate.js
var mixNumber = function(from, to) {
  return function(p) {
    return mix(from, to, p);
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
  var from = _a[0], to = _a[1];
  var mixer = _b[0];
  return function(v) {
    return mixer(progress(from, to, v));
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
  var _b = _a.from, from = _b === void 0 ? 0 : _b, _c = _a.to, to = _c === void 0 ? 1 : _c, ease = _a.ease, offset = _a.offset, _d = _a.duration, duration2 = _d === void 0 ? 300 : _d;
  var state = { done: false, value: from };
  var values3 = Array.isArray(to) ? to : [from, to];
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
  var _b = _a.velocity, velocity = _b === void 0 ? 0 : _b, _c = _a.from, from = _c === void 0 ? 0 : _c, _d = _a.power, power = _d === void 0 ? 0.8 : _d, _e = _a.timeConstant, timeConstant = _e === void 0 ? 350 : _e, _f = _a.restDelta, restDelta = _f === void 0 ? 0.5 : _f, modifyTarget = _a.modifyTarget;
  var state = { done: false, value: from };
  var amplitude = power * velocity;
  var ideal = from + amplitude;
  var target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
  if (target !== ideal)
    amplitude = target - from;
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
var types = { keyframes, spring, decay };
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
  var from = _a.from, _d = _a.autoplay, autoplay = _d === void 0 ? true : _d, _e = _a.driver, driver = _e === void 0 ? framesync : _e, _f = _a.elapsed, elapsed = _f === void 0 ? 0 : _f, _g = _a.repeat, repeatMax = _g === void 0 ? 0 : _g, _h = _a.repeatType, repeatType = _h === void 0 ? "loop" : _h, _j = _a.repeatDelay, repeatDelay = _j === void 0 ? 0 : _j, onPlay = _a.onPlay, onStop = _a.onStop, onComplete = _a.onComplete, onRepeat = _a.onRepeat, onUpdate = _a.onUpdate, options = __rest4(_a, ["from", "autoplay", "driver", "elapsed", "repeat", "repeatType", "repeatDelay", "onPlay", "onStop", "onComplete", "onRepeat", "onUpdate"]);
  var to = options.to;
  var driverControls;
  var repeatCount = 0;
  var computedDuration = options.duration;
  var latest;
  var isComplete = false;
  var isForwardPlayback = true;
  var interpolateFromNumber;
  var animator = detectAnimationFromOptions(options);
  if ((_c = (_b = animator).needsInterpolation) === null || _c === void 0 ? void 0 : _c.call(_b, from, to)) {
    interpolateFromNumber = interpolate([0, 100], [from, to], {
      clamp: false
    });
    from = 0;
    to = 100;
  }
  var animation = animator(__assign16(__assign16({}, options), { from, to }));
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

// ../../node_modules/popmotion/dist/es/animations/inertia.js
import { __assign as __assign17 } from "tslib";

// ../../node_modules/popmotion/dist/es/utils/velocity-per-second.js
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}

// ../../node_modules/popmotion/dist/es/animations/inertia.js
function inertia(_a) {
  var _b = _a.from, from = _b === void 0 ? 0 : _b, _c = _a.velocity, velocity = _c === void 0 ? 0 : _c, min = _a.min, max = _a.max, _d = _a.power, power = _d === void 0 ? 0.8 : _d, _e = _a.timeConstant, timeConstant = _e === void 0 ? 750 : _e, _f = _a.bounceStiffness, bounceStiffness = _f === void 0 ? 500 : _f, _g = _a.bounceDamping, bounceDamping = _g === void 0 ? 10 : _g, _h = _a.restDelta, restDelta = _h === void 0 ? 1 : _h, modifyTarget = _a.modifyTarget, driver = _a.driver, onUpdate = _a.onUpdate, onComplete = _a.onComplete;
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
    currentAnimation = animate(__assign17(__assign17({}, options), { driver, onUpdate: function(v) {
      var _a2;
      onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(v);
      (_a2 = options.onUpdate) === null || _a2 === void 0 ? void 0 : _a2.call(options, v);
    }, onComplete }));
  }
  function startSpring(options) {
    startAnimation2(__assign17({ type: "spring", stiffness: bounceStiffness, damping: bounceDamping, restDelta }, options));
  }
  if (isOutOfBounds(from)) {
    startSpring({ from, velocity, to: boundaryNearest(from) });
  } else {
    var target = power * velocity + from;
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
        startSpring({ from: v, to: boundary_1, velocity });
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
  var isPressing = useRef3(false);
  var cancelPointerEndListeners = useRef3(null);
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
import { __read as __read7 } from "tslib";
import { useEffect as useEffect6, useContext as useContext8 } from "react";

// ../../node_modules/framer-motion/dist/es/render/utils/animation-state.js
import { __spreadArray as __spreadArray5, __read as __read6, __assign as __assign23, __rest as __rest8 } from "tslib";

// ../../node_modules/framer-motion/dist/es/utils/shallow-compare.js
function shallowCompare(next, prev) {
  if (!Array.isArray(prev))
    return false;
  var prevLength = prev.length;
  if (prevLength !== next.length)
    return false;
  for (var i = 0; i < prevLength; i++) {
    if (prev[i] !== next[i])
      return false;
  }
  return true;
}

// ../../node_modules/framer-motion/dist/es/render/utils/animation.js
import { __read as __read5, __rest as __rest7, __assign as __assign22 } from "tslib";

// ../../node_modules/framer-motion/dist/es/animation/utils/transitions.js
import { __assign as __assign20, __rest as __rest5, __spreadArray as __spreadArray2, __read as __read2 } from "tslib";

// ../../node_modules/framer-motion/dist/es/utils/time-conversion.js
var secondsToMilliseconds = function(seconds) {
  return seconds * 1e3;
};

// ../../node_modules/framer-motion/dist/es/animation/utils/easing.js
import { __read } from "tslib";
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
import { __assign as __assign18 } from "tslib";
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
  return __assign18({ to }, transitionFactory(to));
};

// ../../node_modules/framer-motion/dist/es/render/dom/value-types/defaults.js
import { __assign as __assign19 } from "tslib";
var defaultValueTypes = __assign19(__assign19({}, numberValueTypes), {
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
  var transition = __rest5(_a, ["when", "delay", "delayChildren", "staggerChildren", "staggerDirection", "repeat", "repeatType", "repeatDelay", "from"]);
  return !!Object.keys(transition).length;
}
var legacyRepeatWarning = false;
function convertTransitionToAnimationOptions(_a) {
  var ease = _a.ease, times = _a.times, yoyo = _a.yoyo, flip = _a.flip, loop = _a.loop, transition = __rest5(_a, ["ease", "times", "yoyo", "flip", "loop"]);
  var options = __assign20({}, transition);
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
    options.to = __spreadArray2([], __read2(options.to));
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
    transition = __assign20(__assign20({}, transition), getDefaultTransition(key, options.to));
  }
  return __assign20(__assign20({}, options), convertTransitionToAnimationOptions(transition));
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
    return valueTransition.type === "inertia" || valueTransition.type === "decay" ? inertia(__assign20(__assign20({}, options), valueTransition)) : animate(__assign20(__assign20({}, getPopmotionAnimationOptions(valueTransition, options, key)), { onUpdate: function(v) {
      var _a2;
      options.onUpdate(v);
      (_a2 = valueTransition.onUpdate) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition, v);
    }, onComplete: function() {
      var _a2;
      options.onComplete();
      (_a2 = valueTransition.onComplete) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition);
    } }));
  }
  function set() {
    var _a2;
    value.set(target);
    onComplete();
    (_a2 = valueTransition === null || valueTransition === void 0 ? void 0 : valueTransition.onComplete) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition);
    return { stop: function() {
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

// ../../node_modules/framer-motion/dist/es/render/utils/setters.js
import { __rest as __rest6, __assign as __assign21, __spreadArray as __spreadArray4, __read as __read4 } from "tslib";

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
    this.updateAndNotify = function(v, render3) {
      if (render3 === void 0) {
        render3 = true;
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
      if (render3) {
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
  MotionValue2.prototype.set = function(v, render3) {
    if (render3 === void 0) {
      render3 = true;
    }
    if (!render3 || !this.passiveEffect) {
      this.updateAndNotify(v, render3);
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

// ../../node_modules/framer-motion/dist/es/render/dom/value-types/find.js
import { __spreadArray as __spreadArray3, __read as __read3 } from "tslib";

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
var valueTypes = __spreadArray3(__spreadArray3([], __read3(dimensionValueTypes)), [color, complex]);
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
  var target = __rest6(_a, ["transitionEnd", "transition"]);
  target = __assign21(__assign21({}, target), transitionEnd);
  for (var key in target) {
    var value = resolveFinalValueInKeyframes(target[key]);
    setMotionValue(visualElement2, key, value);
  }
}
function setVariants(visualElement2, variantLabels) {
  var reversedLabels = __spreadArray4([], __read4(variantLabels)).reverse();
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
    var _c = __read5(when === "beforeChildren" ? [getAnimation2, getChildAnimations] : [getChildAnimations, getAnimation2], 2), first = _c[0], last = _c[1];
    return first().then(last);
  } else {
    return Promise.all([getAnimation2(), getChildAnimations(options.delay)]);
  }
}
function animateTarget(visualElement2, definition, _a) {
  var _b;
  var _c = _a === void 0 ? {} : _a, _d = _c.delay, delay = _d === void 0 ? 0 : _d, transitionOverride = _c.transitionOverride, type = _c.type;
  var _e = visualElement2.makeTargetAnimatable(definition), _f = _e.transition, transition = _f === void 0 ? visualElement2.getDefaultTransition() : _f, transitionEnd = _e.transitionEnd, target = __rest7(_e, ["transition", "transitionEnd"]);
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
    var animation = startAnimation(key, value, valueTarget, __assign22({ delay }, transition));
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
    animations2.push(animateVariant(child, variant, __assign22(__assign22({}, options), { delay: delayChildren + generateStaggerDuration(i) })).then(function() {
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
var reversePriorityOrder = __spreadArray5([], __read6(variantPriorityOrder)).reverse();
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
      var transitionEnd = resolved.transitionEnd, target = __rest8(resolved, ["transition", "transitionEnd"]);
      acc = __assign23(__assign23(__assign23({}, acc), target), transitionEnd);
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
      typeState.protectedKeys = __assign23({}, encounteredKeys);
      if (!typeState.isActive && activeDelta === null || !prop && !typeState.prevProp || isAnimationControls(prop) || typeof prop === "boolean") {
        return "continue";
      }
      var shouldAnimateType = variantsHaveChanged(typeState.prevProp, prop) || type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || i2 > removedVariantIndex && propIsVariant;
      var definitionList = Array.isArray(prop) ? prop : [prop];
      var resolvedValues = definitionList.reduce(buildResolvedTypeValues, {});
      if (activeDelta === false)
        resolvedValues = {};
      var _b = typeState.prevResolvedValues, prevResolvedValues = _b === void 0 ? {} : _b;
      var allKeys = __assign23(__assign23({}, prevResolvedValues), resolvedValues);
      var markToAnimate = function(key2) {
        shouldAnimateType = true;
        removedKeys.delete(key2);
        typeState.needsAnimating[key2] = true;
      };
      for (var key in allKeys) {
        var next = resolvedValues[key];
        var prev = prevResolvedValues[key];
        if (encounteredKeys.hasOwnProperty(key))
          continue;
        if (next !== prev) {
          if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
            if (!shallowCompare(next, prev)) {
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
        encounteredKeys = __assign23(__assign23({}, encounteredKeys), resolvedValues);
      }
      if (isInitialRender && visualElement2.blockInitialAnimation) {
        shouldAnimateType = false;
      }
      if (shouldAnimateType && !isInherited) {
        animations2.push.apply(animations2, __spreadArray5([], __read6(definitionList.map(function(animation) {
          return {
            animation,
            options: __assign23({ type }, options)
          };
        }))));
      }
    };
    for (var i = 0; i < numAnimationTypes; i++) {
      _loop_1(i);
    }
    allAnimatedKeys = __assign23({}, encounteredKeys);
    if (removedKeys.size) {
      var fallbackAnimation_1 = {};
      removedKeys.forEach(function(key) {
        var fallbackTarget = visualElement2.getBaseTarget(key);
        if (fallbackTarget !== void 0) {
          fallbackAnimation_1[key] = fallbackTarget;
        }
      });
      animations2.push({ animation: fallbackAnimation_1 });
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
function variantsHaveChanged(prev, next) {
  if (typeof next === "string") {
    return next !== prev;
  } else if (isVariantLabels(next)) {
    return !shallowCompare(next, prev);
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
      useEffect6(function() {
        return animate3.subscribe(visualElement2);
      }, [animate3]);
    }
  }),
  exit: makeRenderlessComponent(function(props) {
    var custom = props.custom, visualElement2 = props.visualElement;
    var _a = __read7(usePresence(), 2), isPresent2 = _a[0], onExitComplete = _a[1];
    var presenceContext = useContext8(PresenceContext);
    useEffect6(function() {
      var _a2, _b;
      var animation = (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.Exit, !isPresent2, { custom: (_b = presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.custom) !== null && _b !== void 0 ? _b : custom });
      !isPresent2 && (animation === null || animation === void 0 ? void 0 : animation.then(onExitComplete));
    }, [isPresent2]);
  })
};

// ../../node_modules/framer-motion/dist/es/gestures/drag/use-drag.js
import { __assign as __assign27 } from "tslib";
import { useContext as useContext9, useEffect as useEffect7 } from "react";

// ../../node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.js
import { __rest as __rest9, __assign as __assign26, __spreadArray as __spreadArray6, __read as __read10 } from "tslib";

// ../../node_modules/framer-motion/dist/es/gestures/PanSession.js
import { __assign as __assign24 } from "tslib";
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
      var isDistancePastThreshold = distance(info2.offset, { x: 0, y: 0 }) >= 3;
      if (!isPanStarted && !isDistancePastThreshold)
        return;
      var point2 = info2.point;
      var timestamp2 = getFrameData().timestamp;
      _this.history.push(__assign24(__assign24({}, point2), { timestamp: timestamp2 }));
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
      var _a2 = _this.handlers, onEnd = _a2.onEnd, onSessionEnd = _a2.onSessionEnd;
      var panInfo = getPanInfo(transformPoint(info2, _this.transformPagePoint), _this.history);
      if (_this.startEvent && onEnd) {
        onEnd(event2, panInfo);
      }
      onSessionEnd && onSessionEnd(event2, panInfo);
    };
    if (isTouchEvent(event) && event.touches.length > 1)
      return;
    this.handlers = handlers;
    this.transformPagePoint = transformPagePoint;
    var info = extractEventInfo(event);
    var initialInfo = transformPoint(info, this.transformPagePoint);
    var point = initialInfo.point;
    var timestamp = getFrameData().timestamp;
    this.history = [__assign24(__assign24({}, point), { timestamp })];
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
  return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a2, b2) {
  return { x: a2.x - b2.x, y: a2.y - b2.y };
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
    return { x: 0, y: 0 };
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
    return { x: 0, y: 0 };
  }
  var time = (lastPoint.timestamp - timestampedPoint.timestamp) / 1e3;
  if (time === 0) {
    return { x: 0, y: 0 };
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

// ../../node_modules/framer-motion/dist/es/utils/geometry/index.js
import { __assign as __assign25 } from "tslib";

// ../../node_modules/framer-motion/dist/es/utils/noop.js
function noop(any) {
  return any;
}

// ../../node_modules/framer-motion/dist/es/utils/geometry/index.js
function convertBoundingBoxToAxisBox(_a) {
  var top2 = _a.top, left2 = _a.left, right2 = _a.right, bottom2 = _a.bottom;
  return {
    x: { min: left2, max: right2 },
    y: { min: top2, max: bottom2 }
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
  var topLeft = transformPoint2({ x: left2, y: top2 });
  var bottomRight = transformPoint2({ x: right2, y: bottom2 });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}
function axisBox() {
  return { x: { min: 0, max: 1 }, y: { min: 0, max: 1 } };
}
function copyAxisBox(box) {
  return {
    x: __assign25({}, box.x),
    y: __assign25({}, box.y)
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
    x: __assign25({}, zeroDelta),
    y: __assign25({}, zeroDelta)
  };
}

// ../../node_modules/framer-motion/dist/es/utils/each-axis.js
function eachAxis(handler) {
  return [handler("x"), handler("y")];
}

// ../../node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.js
import { __read as __read8 } from "tslib";
function applyConstraints(point, _a, elastic) {
  var min = _a.min, max = _a.max;
  if (min !== void 0 && point < min) {
    point = elastic ? mix(min, point, elastic.min) : Math.max(point, min);
  } else if (max !== void 0 && point > max) {
    point = elastic ? mix(max, point, elastic.max) : Math.min(point, max);
  }
  return point;
}
function calcConstrainedMinPoint(point, length, progress2, constraints, elastic) {
  var min = point - length * progress2;
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
    _a = __read8([max, min], 2), min = _a[0], max = _a[1];
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
  return { min, max: min + axisLength };
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
  var layoutState = visualElement2.getLayoutState();
  visualElement2.notifyBeforeLayoutMeasure(layoutState.layout);
  layoutState.isHydrated = true;
  layoutState.layout = visualElement2.measureViewportBox();
  layoutState.layoutCorrected = copyAxisBox(layoutState.layout);
  visualElement2.notifyLayoutMeasure(layoutState.layout, visualElement2.prevViewportBox || layoutState.layout);
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
function tweenAxis(target, prev, next, p) {
  target.min = mix(prev.min, next.min, p);
  target.max = mix(prev.max, next.max, p);
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
function checkIfParentHasChanged(prev, next) {
  var prevId = prev.getLayoutId();
  var nextId = next.getLayoutId();
  return prevId !== nextId || nextId === void 0 && prev !== next;
}

// ../../node_modules/framer-motion/dist/es/utils/geometry/delta-apply.js
import { __read as __read9 } from "tslib";

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
  var _b = __read9(_a, 3), key = _b[0], scaleKey = _b[1], originKey = _b[2];
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
  var _b = __read9(_a, 3), key = _b[0], scaleKey = _b[1], originKey = _b[2];
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
  var node;
  var delta2;
  for (var i = 0; i < treeLength; i++) {
    node = treePath[i];
    delta2 = node.getLayoutState().delta;
    treeScale.x *= delta2.x.scale;
    treeScale.y *= delta2.y.scale;
    applyBoxDelta(box, delta2);
    if (isDraggable(node)) {
      applyBoxTransforms(box, box, node.getLatestValues());
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

// ../../node_modules/framer-motion/dist/es/render/dom/utils/batch-layout.js
var unresolvedJobs = new Set();
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
  var numStacks = writes.length;
  for (var i = 0; i <= numStacks; i++) {
    reads[i] && reads[i].forEach(executeJob);
    writes[i] && writes[i].forEach(executeJob);
  }
}
var executeJob = function(job) {
  return job();
};

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
        var tree = __spreadArray6(__spreadArray6([], __read10(ancestors)), __read10(children));
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
    var onSessionEnd = function(event, info) {
      return _this.stop(event, info);
    };
    var transformPagePoint = this.props.transformPagePoint;
    this.panSession = new PanSession(originEvent, {
      onSessionStart,
      onStart,
      onMove,
      onSessionEnd
    }, { transformPagePoint });
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
    this.visualElement.unlockProjectionTarget();
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
    var _b = _a.drag, drag2 = _b === void 0 ? false : _b, _c = _a.dragDirectionLock, dragDirectionLock = _c === void 0 ? false : _c, _d = _a.dragPropagation, dragPropagation = _d === void 0 ? false : _d, _e = _a.dragConstraints, dragConstraints = _e === void 0 ? false : _e, _f = _a.dragElastic, dragElastic = _f === void 0 ? defaultElastic : _f, _g = _a.dragMomentum, dragMomentum = _g === void 0 ? true : _g, remainingProps = __rest9(_a, ["drag", "dragDirectionLock", "dragPropagation", "dragConstraints", "dragElastic", "dragMomentum"]);
    this.props = __assign26({
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
      var inertia2 = __assign26(__assign26({
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
    var boxProgress = { x: 0, y: 0 };
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
      this.start(lastPointerEvent, { cursorProgress: prevDragCursor });
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
  var transformPagePoint = useContext9(MotionConfigContext).transformPagePoint;
  var dragControls = useConstant(function() {
    return new VisualElementDragControls({
      visualElement: visualElement2
    });
  });
  dragControls.setProps(__assign27(__assign27({}, props), { transformPagePoint }));
  useEffect7(function() {
    return groupDragControls && groupDragControls.subscribe(dragControls);
  }, [dragControls]);
  useEffect7(function() {
    return dragControls.mount(visualElement2);
  }, []);
}

// ../../node_modules/framer-motion/dist/es/gestures/use-pan-gesture.js
import { useRef as useRef4, useContext as useContext10, useEffect as useEffect8 } from "react";
function usePanGesture(_a) {
  var onPan = _a.onPan, onPanStart = _a.onPanStart, onPanEnd = _a.onPanEnd, onPanSessionStart = _a.onPanSessionStart, visualElement2 = _a.visualElement;
  var hasPanEvents = onPan || onPanStart || onPanEnd || onPanSessionStart;
  var panSession = useRef4(null);
  var transformPagePoint = useContext10(MotionConfigContext).transformPagePoint;
  var handlers = {
    onSessionStart: onPanSessionStart,
    onStart: onPanStart,
    onMove: onPan,
    onEnd: function(event, info) {
      panSession.current = null;
      onPanEnd && onPanEnd(event, info);
    }
  };
  useEffect8(function() {
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
import { __extends, __rest as __rest11, __assign as __assign30, __read as __read12 } from "tslib";
import {
  Component,
  createElement as createElement4
} from "react";

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

// ../../node_modules/framer-motion/dist/es/render/dom/projection/default-scale-correctors.js
import { __assign as __assign29 } from "tslib";

// ../../node_modules/framer-motion/dist/es/render/dom/utils/css-variables-conversion.js
import { __rest as __rest10, __assign as __assign28, __read as __read11 } from "tslib";
function isCSSVariable2(value) {
  return typeof value === "string" && value.startsWith("var(--");
}
var cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function parseCSSVariable(current) {
  var match = cssVariableRegex.exec(current);
  if (!match)
    return [,];
  var _a = __read11(match, 3), token = _a[1], fallback = _a[2];
  return [token, fallback];
}
var maxDepth = 4;
function getVariableValue(current, element, depth) {
  if (depth === void 0) {
    depth = 1;
  }
  invariant(depth <= maxDepth, 'Max CSS variable fallback depth detected in property "' + current + '". This may indicate a circular fallback dependency.');
  var _a = __read11(parseCSSVariable(current), 2), token = _a[0], fallback = _a[1];
  if (!token)
    return;
  var resolved = window.getComputedStyle(element).getPropertyValue(token);
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
  var target = __rest10(_a, []);
  var element = visualElement2.getInstance();
  if (!(element instanceof HTMLElement))
    return { target, transitionEnd };
  if (transitionEnd) {
    transitionEnd = __assign28({}, transitionEnd);
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
  return { target, transitionEnd };
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
    latest = latest.replace(cssVariableRegex, function(match) {
      cssVariables.push(match);
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
  borderRadius: __assign29(__assign29({}, borderCorrectionDefinition), { applyTo: [
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomLeftRadius",
    "borderBottomRightRadius"
  ] }),
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
      var originBox = _a.originBox, targetBox = _a.targetBox, visibilityAction = _a.visibilityAction, shouldStackAnimate = _a.shouldStackAnimate, onComplete = _a.onComplete, prevParent = _a.prevParent, config = __rest11(_a, ["originBox", "targetBox", "visibilityAction", "shouldStackAnimate", "onComplete", "prevParent"]);
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
          return _this.animateAxis(axis, target[axis], origin[axis], __assign30(__assign30({}, config), { isRelative }));
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
}(Component);
function AnimateLayoutContextProvider(props) {
  var _a = __read12(usePresence(), 2), safeToRemove = _a[1];
  return createElement4(Animate, __assign30({}, props, { safeToRemove }));
}
function hasMoved(a2, b2) {
  return !isZeroBox(a2) && !isZeroBox(b2) && (!axisIsEqual(a2.x, b2.x) || !axisIsEqual(a2.y, b2.y));
}
var zeroAxis = { min: 0, max: 0 };
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
import { __extends as __extends2, __assign as __assign31 } from "tslib";
import React__default, { useContext as useContext11 } from "react";

// ../../node_modules/framer-motion/dist/es/context/SharedLayoutContext.js
import { createContext as createContext6 } from "react";

// ../../node_modules/framer-motion/dist/es/components/AnimateSharedLayout/utils/batcher.js
import { __spreadArray as __spreadArray7, __read as __read13 } from "tslib";
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
          var allElements = __spreadArray7(__spreadArray7([], __read13(ancestors)), __read13(order3));
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
var SharedLayoutContext = createContext6(createBatcher());
var FramerTreeLayoutContext = createContext6(createBatcher());
function isSharedLayout(context) {
  return !!context.forceUpdate;
}

// ../../node_modules/framer-motion/dist/es/motion/features/layout/Measure.js
var Measure = function(_super) {
  __extends2(Measure2, _super);
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
}(React__default.Component);
function MeasureContextProvider(props) {
  var syncLayout = useContext11(SharedLayoutContext);
  var framerSyncLayout = useContext11(FramerTreeLayoutContext);
  return React__default.createElement(Measure, __assign31({}, props, { syncLayout, framerSyncLayout }));
}

// ../../node_modules/framer-motion/dist/es/motion/features/layout/index.js
var layoutAnimations = {
  measureLayout: MeasureContextProvider,
  layoutAnimation: AnimateLayoutContextProvider
};

// ../../node_modules/framer-motion/dist/es/render/html/visual-element.js
import { __rest as __rest12, __assign as __assign34 } from "tslib";

// ../../node_modules/framer-motion/dist/es/render/index.js
import { __assign as __assign32, __spreadArray as __spreadArray9, __read as __read15 } from "tslib";

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
    treeScale: { x: 1, y: 1 },
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
var identityProjection = buildLayoutProjectionTransform(zeroLayout.delta, zeroLayout.treeScale, { x: 1, y: 1 });

// ../../node_modules/framer-motion/dist/es/render/utils/lifecycles.js
import { __spreadArray as __spreadArray8, __read as __read14 } from "tslib";
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
      return manager.notify.apply(manager, __spreadArray8([], __read14(args)));
    };
  });
  return lifecycles;
}

// ../../node_modules/framer-motion/dist/es/render/utils/motion-values.js
function updateMotionValuesFromProps(element, next, prev) {
  var _a;
  for (var key in next) {
    var nextValue = next[key];
    var prevValue = prev[key];
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
  for (var key in prev) {
    if (next[key] === void 0)
      element.removeValue(key);
  }
  return next;
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
    var layoutState = createLayoutState();
    var crossfader;
    var hasViewportBoxUpdated = false;
    var values3 = new Map();
    var valueSubscriptions = new Map();
    var prevMotionValues = {};
    var projectionTargetProgress;
    var baseTarget = __assign32({}, latestValues);
    var removeFromVariantTree;
    function render3() {
      if (!instance)
        return;
      if (element.isProjectionReady()) {
        applyBoxTransforms(leadProjection.targetFinal, leadProjection.target, leadLatestValues);
        updateBoxDelta(layoutState.deltaFinal, layoutState.layoutCorrected, leadProjection.targetFinal, latestValues);
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
      build(element, renderState, valuesToRender, leadProjection, layoutState, options, props);
    }
    function update() {
      lifecycles.notifyUpdate(latestValues);
    }
    function updateLayoutProjection() {
      if (!element.isProjectionReady())
        return;
      var delta2 = layoutState.delta, treeScale = layoutState.treeScale;
      var prevTreeScaleX = treeScale.x;
      var prevTreeScaleY = treeScale.y;
      var prevDeltaTransform = layoutState.deltaTransform;
      updateLayoutDeltas(layoutState, leadProjection, element.path, latestValues);
      hasViewportBoxUpdated && element.notifyViewportBoxUpdate(leadProjection.target, delta2);
      hasViewportBoxUpdated = false;
      var deltaTransform = buildLayoutProjectionTransform(delta2, treeScale);
      if (deltaTransform !== prevDeltaTransform || prevTreeScaleX !== treeScale.x || prevTreeScaleY !== treeScale.y) {
        element.scheduleRender();
      }
      layoutState.deltaTransform = deltaTransform;
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
    var element = __assign32(__assign32({
      treeType,
      current: null,
      depth: parent ? parent.depth + 1 : 0,
      parent,
      children: new Set(),
      path: parent ? __spreadArray9(__spreadArray9([], __read15(parent.path)), [parent]) : [],
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
        cancelSync.render(render3);
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
        es_default.render(render3, false, true);
      },
      syncRender: render3,
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
        return layoutState;
      },
      setCrossfader: function(newCrossfader) {
        crossfader = newCrossfader;
      },
      isProjectionReady: function() {
        return projection.isEnabled && projection.isHydrated && layoutState.isHydrated;
      },
      startLayoutAnimation: function(axis, transition, isRelative) {
        if (isRelative === void 0) {
          isRelative = false;
        }
        var progress2 = element.getProjectionAnimationProgress()[axis];
        var _a3 = isRelative ? projection.relativeTarget[axis] : projection.target[axis], min = _a3.min, max = _a3.max;
        var length = max - min;
        progress2.clearListeners();
        progress2.set(min);
        progress2.set(min);
        progress2.onChange(function(v) {
          element.setProjectionTargetAxis(axis, v, v + length, isRelative);
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
          box = layoutState.layout;
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
        element.notifyLayoutUpdate(layoutState.layout, element.prevViewportBox || layoutState.layout, config);
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
var variantProps = __spreadArray9(["initial"], __read15(variantPriorityOrder));
var numVariantProps = variantProps.length;

// ../../node_modules/framer-motion/dist/es/render/dom/utils/unit-conversion.js
import { __assign as __assign33, __read as __read16 } from "tslib";
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
  var originComputedStyle = { top: top2, left: left2, bottom: bottom2, right: right2, transform: transform3 };
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
  target = __assign33({}, target);
  transitionEnd = __assign33({}, transitionEnd);
  var targetPositionalKeys = Object.keys(target).filter(isPositionalKey);
  var removedTransformValues = [];
  var hasAttemptedToRemoveTransformValues = false;
  var changedValueTypeKeys = [];
  targetPositionalKeys.forEach(function(key) {
    var value = visualElement2.getValue(key);
    if (!visualElement2.hasValue(key))
      return;
    var from = origin[key];
    var to = target[key];
    var fromType = findDimensionValueType(from);
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
    var convertedTarget = convertChangedValueTypes(target, visualElement2, changedValueTypeKeys);
    if (removedTransformValues.length) {
      removedTransformValues.forEach(function(_a) {
        var _b = __read16(_a, 2), key = _b[0], value = _b[1];
        visualElement2.getValue(key).set(value);
      });
    }
    visualElement2.syncRender();
    return { target: convertedTarget, transitionEnd };
  } else {
    return { target, transitionEnd };
  }
};
function unitConversion(visualElement2, target, origin, transitionEnd) {
  return hasPositionalKey(target) ? checkAndConvertChangedValueTypes(visualElement2, target, origin, transitionEnd) : { target, transitionEnd };
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
    var transition = _a.transition, transitionEnd = _a.transitionEnd, target = __rest12(_a, ["transition", "transitionEnd"]);
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
    return __assign34({
      transition,
      transitionEnd
    }, target);
  },
  scrapeMotionValuesFromProps,
  build: function(element, renderState, latestValues, projection, layoutState, options, props) {
    if (element.isVisible !== void 0) {
      renderState.style.visibility = element.isVisible ? "visible" : "hidden";
    }
    var isProjectionTranform = projection.isEnabled && layoutState.isHydrated;
    buildHTMLStyles(renderState, latestValues, projection, layoutState, options, props.transformTemplate, isProjectionTranform ? buildLayoutProjectionTransform : void 0, isProjectionTranform ? buildLayoutProjectionTransformOrigin : void 0);
  },
  render: renderHTML
};
var htmlVisualElement = visualElement(htmlConfig);

// ../../node_modules/framer-motion/dist/es/render/svg/visual-element.js
import { __assign as __assign35 } from "tslib";
var svgVisualElement = visualElement(__assign35(__assign35({}, htmlConfig), {
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
  build: function(_element, renderState, latestValues, projection, layoutState, options, props) {
    var isProjectionTranform = projection.isEnabled && layoutState.isHydrated;
    buildSVGAttrs(renderState, latestValues, projection, layoutState, options, props.transformTemplate, isProjectionTranform ? buildLayoutProjectionTransform : void 0, isProjectionTranform ? buildLayoutProjectionTransformOrigin : void 0);
  },
  render: renderSVG
}));

// ../../node_modules/framer-motion/dist/es/render/dom/create-visual-element.js
var createDomVisualElement = function(Component3, options) {
  return isSVGComponent(Component3) ? svgVisualElement(options, { enableHardwareAcceleration: false }) : htmlVisualElement(options, { enableHardwareAcceleration: true });
};

// ../../node_modules/framer-motion/dist/es/render/dom/motion.js
var featureBundle = __assign36(__assign36(__assign36(__assign36({}, animations), gestureAnimations), drag), layoutAnimations);
var motion = /* @__PURE__ */ createMotionProxy(function(Component3, config) {
  return createDomMotionConfig(Component3, config, featureBundle, createDomVisualElement);
});
function createDomMotionComponent(key) {
  return createMotionComponent(createDomMotionConfig(key, { forwardMotionProps: false }, featureBundle, createDomVisualElement));
}

// ../../node_modules/framer-motion/dist/es/render/dom/motion-minimal.js
var m = createMotionProxy(createDomMotionConfig);

// ../../node_modules/framer-motion/dist/es/components/AnimatePresence/index.js
import { __spreadArray as __spreadArray10, __read as __read18 } from "tslib";
import {
  Fragment as Fragment2,
  createElement as createElement6
} from "react";
import { useContext as useContext12, useRef as useRef6, cloneElement, Children, isValidElement } from "react";

// ../../node_modules/framer-motion/dist/es/utils/use-force-update.js
import { __read as __read17 } from "tslib";
import { useCallback as useCallback2, useRef as useRef5, useState } from "react";
function useForceUpdate() {
  var unloadingRef = useRef5(false);
  var _a = __read17(useState(0), 2), forcedRenderCount = _a[0], setForcedRenderCount = _a[1];
  useUnmountEffect(function() {
    return unloadingRef.current = true;
  });
  return useCallback2(function() {
    !unloadingRef.current && setForcedRenderCount(forcedRenderCount + 1);
  }, [forcedRenderCount]);
}

// ../../node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.js
import {
  createElement as createElement5,
  useEffect as useEffect9
} from "react";
import { useMemo as useMemo4 } from "react";
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
  var context = useMemo4(function() {
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
  useMemo4(function() {
    presenceChildren.forEach(function(_2, key) {
      return presenceChildren.set(key, false);
    });
  }, [isPresent2]);
  useEffect9(function() {
    !isPresent2 && !presenceChildren.size && (onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete());
  }, [isPresent2]);
  return createElement5(PresenceContext.Provider, { value: context }, children);
};
function newChildrenMap() {
  return new Map();
}

// ../../node_modules/framer-motion/dist/es/components/AnimatePresence/index.js
function getChildKey(child) {
  return child.key || "";
}
function updateChildLookup(children, allChildren) {
  var seenChildren = true ? new Set() : null;
  children.forEach(function(child) {
    var key = getChildKey(child);
    if (seenChildren) {
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
  Children.forEach(children, function(child) {
    if (isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
var AnimatePresence = function(_a) {
  var children = _a.children, custom = _a.custom, _b = _a.initial, initial = _b === void 0 ? true : _b, onExitComplete = _a.onExitComplete, exitBeforeEnter = _a.exitBeforeEnter, _c = _a.presenceAffectsLayout, presenceAffectsLayout = _c === void 0 ? true : _c;
  var forceRender = useForceUpdate();
  var layoutContext = useContext12(SharedLayoutContext);
  if (isSharedLayout(layoutContext)) {
    forceRender = layoutContext.forceUpdate;
  }
  var isInitialRender = useRef6(true);
  var filteredChildren = onlyElements(children);
  var presentChildren = useRef6(filteredChildren);
  var allChildren = useRef6(new Map()).current;
  var exiting = useRef6(new Set()).current;
  updateChildLookup(filteredChildren, allChildren);
  if (isInitialRender.current) {
    isInitialRender.current = false;
    return createElement6(Fragment2, null, filteredChildren.map(function(child) {
      return createElement6(PresenceChild, { key: getChildKey(child), isPresent: true, initial: initial ? void 0 : false, presenceAffectsLayout }, child);
    }));
  }
  var childrenToRender = __spreadArray10([], __read18(filteredChildren));
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
    childrenToRender.splice(insertionIndex, 0, createElement6(PresenceChild, { key: getChildKey(child), isPresent: false, onExitComplete: onExit, custom, presenceAffectsLayout }, child));
  });
  childrenToRender = childrenToRender.map(function(child) {
    var key2 = child.key;
    return exiting.has(key2) ? child : createElement6(PresenceChild, { key: getChildKey(child), isPresent: true, presenceAffectsLayout }, child);
  });
  presentChildren.current = childrenToRender;
  if (exitBeforeEnter && childrenToRender.length > 1) {
    console.warn("You're attempting to animate multiple children within AnimatePresence, but its exitBeforeEnter prop is set to true. This will lead to odd visual behaviour.");
  }
  return createElement6(Fragment2, null, exiting.size ? childrenToRender : childrenToRender.map(function(child) {
    return cloneElement(child);
  }));
};

// ../../node_modules/framer-motion/dist/es/components/AnimateSharedLayout/index.js
import { __extends as __extends3, __assign as __assign39 } from "tslib";
import {
  Component as Component2,
  createElement as createElement7
} from "react";

// ../../node_modules/framer-motion/dist/es/components/AnimateSharedLayout/utils/stack.js
import { __assign as __assign38 } from "tslib";

// ../../node_modules/framer-motion/dist/es/components/AnimateSharedLayout/utils/crossfader.js
import { __assign as __assign37 } from "tslib";

// ../../node_modules/framer-motion/dist/es/animation/animate.js
function animate2(from, to, transition) {
  if (transition === void 0) {
    transition = {};
  }
  var value = isMotionValue(from) ? from : motionValue(from);
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
  var prevOptions = __assign37({}, options);
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
    return animate2(progress2, target, __assign37(__assign37({}, transition), { onUpdate, onComplete: function() {
      if (!hasUpdated) {
        progress2.set(target);
        es_default.read(onComplete);
      } else {
        onComplete();
      }
      onUpdate();
    } }));
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
  var state = { leadIsExiting: false };
  var prevState = __assign38({}, state);
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
      prevState = __assign38({}, state);
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
  __extends3(AnimateSharedLayout2, _super);
  function AnimateSharedLayout2() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.children = new Set();
    _this.stacks = new Map();
    _this.hasMounted = false;
    _this.updateScheduled = false;
    _this.renderScheduled = false;
    _this.syncContext = __assign39(__assign39({}, createBatcher()), { syncUpdate: function(force) {
      return _this.scheduleUpdate(force);
    }, forceUpdate: function() {
      _this.syncContext = __assign39({}, _this.syncContext);
      _this.scheduleUpdate(true);
    }, register: function(child) {
      return _this.addChild(child);
    }, remove: function(child) {
      return _this.removeChild(child);
    } });
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
    return createElement7(SharedLayoutContext.Provider, { value: this.syncContext }, this.props.children);
  };
  AnimateSharedLayout2.contextType = MotionContext;
  return AnimateSharedLayout2;
}(Component2);

// ../../node_modules/framer-motion/dist/es/components/MotionConfig/index.js
import { __rest as __rest13, __assign as __assign40 } from "tslib";
import {
  createElement as createElement8
} from "react";
import { useContext as useContext13, useMemo as useMemo5 } from "react";
function MotionConfig(_a) {
  var children = _a.children, config = __rest13(_a, ["children"]);
  config = __assign40(__assign40({}, useContext13(MotionConfigContext)), config);
  config.isStatic = useConstant(function() {
    return config.isStatic;
  });
  var transitionDependency = typeof config.transition === "object" ? config.transition.toString() : "";
  var context = useMemo5(function() {
    return config;
  }, [
    transitionDependency,
    config.transformPagePoint
  ]);
  return createElement8(MotionConfigContext.Provider, { value: context }, children);
}

// ../../node_modules/framer-motion/dist/es/components/LazyMotion/index.js
import { __read as __read19, __rest as __rest14 } from "tslib";
import {
  createElement as createElement9
} from "react";
import { useState as useState2, useRef as useRef7, useEffect as useEffect10 } from "react";
function LazyMotion(_a) {
  var children = _a.children, features = _a.features, _b = _a.strict, strict = _b === void 0 ? false : _b;
  var _c = __read19(useState2(!isLazyBundle(features)), 2), setIsLoaded = _c[1];
  var loadedRenderer = useRef7(void 0);
  if (!isLazyBundle(features)) {
    var renderer = features.renderer, loadedFeatures = __rest14(features, ["renderer"]);
    loadedRenderer.current = renderer;
    loadFeatures(loadedFeatures);
  }
  useEffect10(function() {
    if (isLazyBundle(features)) {
      features().then(function(_a2) {
        var renderer2 = _a2.renderer, loadedFeatures2 = __rest14(_a2, ["renderer"]);
        loadFeatures(loadedFeatures2);
        loadedRenderer.current = renderer2;
        setIsLoaded(true);
      });
    }
  }, []);
  return createElement9(LazyContext.Provider, { value: { renderer: loadedRenderer.current, strict } }, children);
}
function isLazyBundle(features) {
  return typeof features === "function";
}

// ../../node_modules/framer-motion/dist/es/render/dom/features-animation.js
import { __assign as __assign41 } from "tslib";
var domAnimation = __assign41(__assign41({ renderer: createDomVisualElement }, animations), gestureAnimations);

// ../../node_modules/framer-motion/dist/es/render/dom/features-max.js
import { __assign as __assign42 } from "tslib";
var domMax = __assign42(__assign42(__assign42({}, domAnimation), drag), layoutAnimations);

// ../../node_modules/framer-motion/dist/es/value/use-motion-value.js
import { __read as __read20 } from "tslib";
import { useContext as useContext14, useState as useState3, useEffect as useEffect11 } from "react";
function useMotionValue(initial) {
  var value = useConstant(function() {
    return motionValue(initial);
  });
  var isStatic = useContext14(MotionConfigContext).isStatic;
  if (isStatic) {
    var _a = __read20(useState3(initial), 2), setLatest_1 = _a[1];
    useEffect11(function() {
      return value.onChange(setLatest_1);
    }, []);
  }
  return value;
}

// ../../node_modules/framer-motion/dist/es/value/use-on-change.js
import { useEffect as useEffect12 } from "react";
function useOnChange(value, callback) {
  useEffect12(function() {
    if (isMotionValue(value))
      return value.onChange(callback);
  }, [callback]);
}
function useMultiOnChange(values3, handler) {
  useEffect12(function() {
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

// ../../node_modules/framer-motion/dist/es/value/use-transform.js
import { __read as __read21 } from "tslib";

// ../../node_modules/framer-motion/dist/es/utils/transform.js
import { __assign as __assign43 } from "tslib";
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
  var interpolator = interpolate(inputRange, outputRange, __assign43({ mixer: getMixer2(outputRange[0]) }, options));
  return useImmediate ? interpolator(inputValue) : interpolator;
}

// ../../node_modules/framer-motion/dist/es/value/use-transform.js
function useTransform(input, inputRangeOrTransformer, outputRange, options) {
  var transformer = typeof inputRangeOrTransformer === "function" ? inputRangeOrTransformer : transform(inputRangeOrTransformer, outputRange, options);
  return Array.isArray(input) ? useListTransform(input, transformer) : useListTransform([input], function(_a) {
    var _b = __read21(_a, 1), latest = _b[0];
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
import { __assign as __assign44 } from "tslib";
import { useContext as useContext15, useRef as useRef8, useMemo as useMemo6 } from "react";
function useSpring(source, config) {
  if (config === void 0) {
    config = {};
  }
  var isStatic = useContext15(MotionConfigContext).isStatic;
  var activeSpringAnimation = useRef8(null);
  var value = useMotionValue(isMotionValue(source) ? source.get() : source);
  useMemo6(function() {
    return value.attach(function(v, set) {
      if (isStatic)
        return set(v);
      if (activeSpringAnimation.current) {
        activeSpringAnimation.current.stop();
      }
      activeSpringAnimation.current = animate(__assign44(__assign44({ from: value.get(), to: v, velocity: value.getVelocity() }, config), { onUpdate: set }));
      return value.get();
    });
  }, Object.values(config));
  useOnChange(source, function(v) {
    return value.set(parseFloat(v));
  });
  return value;
}

// ../../node_modules/framer-motion/dist/es/value/use-velocity.js
import { useEffect as useEffect13 } from "react";
function useVelocity(value) {
  var velocity = useMotionValue(value.getVelocity());
  useEffect13(function() {
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
    var scrollListener = addDomEvent(element, "scroll", updateScrollValues, { passive: true });
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
  addDomEvent(window, "scroll", updateScrollValues, { passive: true });
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
import { __read as __read22 } from "tslib";
import { useState as useState4 } from "react";
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
  var _a = __read22(useState4(prefersReducedMotion.get()), 2), shouldReduceMotion = _a[0], setShouldReduceMotion = _a[1];
  useOnChange(prefersReducedMotion, setShouldReduceMotion);
  return shouldReduceMotion;
}

// ../../node_modules/framer-motion/dist/es/animation/animation-controls.js
import { __spreadArray as __spreadArray11, __read as __read23 } from "tslib";
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
        controls.start.apply(controls, __spreadArray11([], __read23(animation))).then(resolve);
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
import { useEffect as useEffect14 } from "react";
function useAnimation() {
  var controls = useConstant(animationControls);
  useEffect14(controls.mount, []);
  return controls;
}

// ../../node_modules/framer-motion/dist/es/utils/use-cycle.js
import { __read as __read24 } from "tslib";
import { useRef as useRef9, useState as useState5 } from "react";
function useCycle() {
  var items = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    items[_i] = arguments[_i];
  }
  var index = useRef9(0);
  var _a = __read24(useState5(items[index.current]), 2), item = _a[0], setItem = _a[1];
  return [
    item,
    function(next) {
      index.current = typeof next !== "number" ? wrap(0, items.length, index.current + 1) : next;
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
import { __rest as __rest15, __assign as __assign45, __read as __read25 } from "tslib";
import { useState as useState6, useEffect as useEffect15 } from "react";
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
    var transition = _a.transition, transitionEnd = _a.transitionEnd, target = __rest15(_a, ["transition", "transitionEnd"]);
    var origin = getOrigin(target, transition || {}, element);
    checkTargetForNewValues(element, target, origin);
    return __assign45({ transition, transitionEnd }, target);
  }
});
var useVisualState = makeUseVisualState({
  scrapeMotionValuesFromProps: createObject,
  createRenderState: createObject
});
function useAnimatedState(initialState) {
  var _a = __read25(useState6(initialState), 2), animationState = _a[0], setAnimationState = _a[1];
  var visualState = useVisualState({}, false);
  var element = useConstant(function() {
    return stateVisualElement({ props: {}, visualState }, { initialState });
  });
  useEffect15(function() {
    element.mount({});
    return element.unmount();
  }, []);
  useEffect15(function() {
    element.setProps({
      onUpdate: function(v) {
        return setAnimationState(__assign45({}, v));
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
  return { scaleX, scaleY };
}

// src/renderer.ts
import React26, { Fragment as Fragment3 } from "react";
import {
  render
} from "react-dom";
import { css as css2, Global, jsx } from "@emotion/react";

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

// ../../node_modules/@material-ui/core/Fab/Fab.js
var import_prop_types9 = __toModule(require_prop_types());
import {
  forwardRef as forwardRef4
} from "react";

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
  completed: "Mui-completed",
  disabled: "Mui-disabled",
  error: "Mui-error",
  expanded: "Mui-expanded",
  focused: "Mui-focused",
  focusVisible: "Mui-focusVisible",
  required: "Mui-required",
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

// ../../node_modules/@material-ui/utils/esm/chainPropTypes.js
function chainPropTypes(propType1, propType2) {
  if (false) {
    return () => null;
  }
  return function validate(...args) {
    return propType1(...args) || propType2(...args);
  };
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

// ../../node_modules/@material-ui/utils/esm/elementTypeAcceptingRef.js
var import_prop_types = __toModule(require_prop_types());
function isClassComponent(elementType) {
  const {
    prototype = {}
  } = elementType;
  return Boolean(prototype.isReactComponent);
}
function elementTypeAcceptingRef(props, propName, componentName, location, propFullName) {
  const propValue = props[propName];
  const safePropName = propFullName || propName;
  if (propValue == null || typeof window === "undefined") {
    return null;
  }
  let warningHint;
  if (typeof propValue === "function" && !isClassComponent(propValue)) {
    warningHint = "Did you accidentally provide a plain function component instead?";
  }
  if (warningHint !== void 0) {
    return new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. Expected an element type that can hold a ref. ${warningHint} For more information see https://material-ui.com/r/caveat-with-refs-guide`);
  }
  return null;
}
var elementTypeAcceptingRef_default = chainPropTypes(import_prop_types.default.elementType, elementTypeAcceptingRef);

// ../../node_modules/@material-ui/utils/esm/refType.js
var import_prop_types2 = __toModule(require_prop_types());
var refType = import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object]);
var refType_default = refType;

// ../../node_modules/@material-ui/utils/esm/capitalize.js
function capitalize(string) {
  if (typeof string !== "string") {
    throw new Error(true ? `Material-UI: \`capitalize(string)\` expects a string argument.` : formatMuiErrorMessage(7));
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
import {
  useEffect as useEffect16,
  useLayoutEffect as useLayoutEffect2
} from "react";
var useEnhancedEffect = typeof window !== "undefined" ? useLayoutEffect2 : useEffect16;
var useEnhancedEffect_default = useEnhancedEffect;

// ../../node_modules/@material-ui/utils/esm/useEventCallback.js
import {
  useCallback as useCallback3,
  useRef as useRef10
} from "react";
function useEventCallback(fn) {
  const ref = useRef10(fn);
  useEnhancedEffect_default(() => {
    ref.current = fn;
  });
  return useCallback3((...args) => (0, ref.current)(...args), []);
}

// ../../node_modules/@material-ui/utils/esm/useForkRef.js
import {
  useMemo as useMemo7
} from "react";
function useForkRef(refA, refB) {
  return useMemo7(() => {
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
import {
  useCallback as useCallback4,
  useRef as useRef11
} from "react";
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
function focusTriggersKeyboardModality(node) {
  const {
    type,
    tagName
  } = node;
  if (tagName === "INPUT" && inputTypesWhitelist[type] && !node.readOnly) {
    return true;
  }
  if (tagName === "TEXTAREA" && !node.readOnly) {
    return true;
  }
  if (node.isContentEditable) {
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
  const ref = useCallback4((node) => {
    if (node != null) {
      prepare(node.ownerDocument);
    }
  }, []);
  const isFocusVisibleRef = useRef11(false);
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
var import_prop_types8 = __toModule(require_prop_types());
import {
  forwardRef as forwardRef3,
  useEffect as useEffect19,
  useImperativeHandle as useImperativeHandle2,
  useRef as useRef13,
  useState as useState9
} from "react";

// ../../node_modules/@material-ui/styled-engine/index.js
import emStyled from "@emotion/styled";
import { ThemeContext, keyframes as keyframes3, css } from "@emotion/react";
function styled(tag, options) {
  const stylesFactory = emStyled(tag, options);
  if (true) {
    return (...styles) => {
      const component = typeof tag === "string" ? `"${tag}"` : "component";
      if (styles.length === 0) {
        console.error([`Material-UI: Seems like you called \`styled(${component})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join("\n"));
      } else if (styles.some((style3) => style3 === void 0)) {
        console.error(`Material-UI: the styled(${component})(...args) API requires all its args to be defined.`);
      }
      return stylesFactory(...styles);
    };
  }
  return stylesFactory;
}

// ../../node_modules/@material-ui/system/esm/responsivePropType.js
var import_prop_types3 = __toModule(require_prop_types());
var responsivePropType = true ? import_prop_types3.default.oneOfType([import_prop_types3.default.number, import_prop_types3.default.string, import_prop_types3.default.object, import_prop_types3.default.array]) : {};
var responsivePropType_default = responsivePropType;

// ../../node_modules/@material-ui/system/esm/breakpoints.js
var import_prop_types4 = __toModule(require_prop_types());

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
  md: 900,
  lg: 1200,
  xl: 1536
};
var defaultBreakpoints = {
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (key) => `@media (min-width:${values[key]}px)`
};
function handleBreakpoints(props, propValue, styleFromPropValue) {
  const theme = props.theme || {};
  if (Array.isArray(propValue)) {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return propValue.reduce((acc, item, index) => {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }
  if (typeof propValue === "object") {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
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
  const breakpointsInOrder = breakpointsInput == null ? void 0 : (_breakpointsInput$key = breakpointsInput.keys) == null ? void 0 : _breakpointsInput$key.reduce((acc, key) => {
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
  fn.propTypes = true ? {
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
  fn.propTypes = true ? styles.reduce((acc, style3) => Object.assign(acc, style3.propTypes), {}) : {};
  fn.filterProps = styles.reduce((acc, style3) => acc.concat(style3.filterProps), []);
  return fn;
}
var compose_default = compose;

// ../../node_modules/@material-ui/system/esm/memoize.js
function memoize(fn) {
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
var getCssProperties = memoize((prop) => {
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
    return (abs) => {
      if (typeof abs === "string") {
        return abs;
      }
      if (true) {
        if (typeof abs !== "number") {
          console.error(`Material-UI: Expected ${propName} argument to be a number or a string, got ${abs}.`);
        }
      }
      return themeSpacing * abs;
    };
  }
  if (Array.isArray(themeSpacing)) {
    return (abs) => {
      if (typeof abs === "string") {
        return abs;
      }
      if (true) {
        if (!Number.isInteger(abs)) {
          console.error([`Material-UI: The \`theme.${themeKey}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${themeKey}\` as a number.`].join("\n"));
        } else if (abs > themeSpacing.length - 1) {
          console.error([`Material-UI: The value provided (${abs}) overflows.`, `The supported values are: ${JSON.stringify(themeSpacing)}.`, `${abs} > ${themeSpacing.length - 1}, you need to add the missing values.`].join("\n"));
        }
      }
      return themeSpacing[abs];
    };
  }
  if (typeof themeSpacing === "function") {
    return themeSpacing;
  }
  if (true) {
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
  const abs = Math.abs(propValue);
  const transformed = transformer(abs);
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
margin.propTypes = true ? marginKeys.reduce((obj, key) => {
  obj[key] = responsivePropType_default;
  return obj;
}, {}) : {};
margin.filterProps = marginKeys;
function padding(props) {
  return style2(props, paddingKeys);
}
padding.propTypes = true ? paddingKeys.reduce((obj, key) => {
  obj[key] = responsivePropType_default;
  return obj;
}, {}) : {};
padding.filterProps = paddingKeys;
function spacing(props) {
  return style2(props, spacingKeys);
}
spacing.propTypes = true ? spacingKeys.reduce((obj, key) => {
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
borderRadius.propTypes = true ? {
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
gap.propTypes = true ? {
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
columnGap.propTypes = true ? {
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
rowGap.propTypes = true ? {
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
var position = style_default({
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
var positions_default = compose_default(position, zIndex, top, right, bottom, left);

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
var maxWidth = (props) => {
  if (props.maxWidth) {
    const styleFromPropValue = (propValue) => {
      const breakpoint = props.theme.breakpoints.values[propValue];
      return {
        maxWidth: breakpoint || transform2(propValue)
      };
    };
    return handleBreakpoints(props, props.maxWidth, styleFromPropValue);
  }
  return null;
};
maxWidth.filterProps = ["maxWidth"];
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
  let css3 = emptyBreakpoints;
  Object.keys(styles).forEach((styleKey) => {
    const value = callIfFn(styles[styleKey], theme);
    if (typeof value === "object") {
      if (propToStyleFunction[styleKey]) {
        css3 = merge_default(css3, getThemeValue_default(styleKey, value, theme));
      } else {
        const breakpointsValues = handleBreakpoints({
          theme
        }, value, (x) => ({
          [styleKey]: x
        }));
        if (objectsHaveSameKeys(breakpointsValues, value)) {
          css3[styleKey] = styleFunctionSx({
            sx: value,
            theme
          });
        } else {
          css3 = merge_default(css3, breakpointsValues);
        }
      }
    } else {
      css3 = merge_default(css3, getThemeValue_default(styleKey, value, theme));
    }
  });
  return removeUnusedBreakpoints(breakpointsKeys, css3);
}
styleFunctionSx.filterProps = ["sx"];
var styleFunctionSx_default = styleFunctionSx;

// ../../node_modules/@material-ui/system/esm/createTheme/createBreakpoints.js
var _excluded = ["values", "unit", "step"];
function createBreakpoints(breakpoints) {
  const {
    values: values3 = {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    },
    unit = "px",
    step = 5
  } = breakpoints, other = _objectWithoutPropertiesLoose(breakpoints, _excluded);
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

// ../../node_modules/@material-ui/system/esm/createTheme/shape.js
var shape = {
  borderRadius: 4
};
var shape_default = shape;

// ../../node_modules/@material-ui/system/esm/createTheme/createSpacing.js
function createSpacing(spacingInput = 8) {
  if (spacingInput.mui) {
    return spacingInput;
  }
  const transform3 = createUnarySpacing({
    spacing: spacingInput
  });
  const spacing2 = (...argsInput) => {
    if (true) {
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

// ../../node_modules/@material-ui/system/esm/createTheme/createTheme.js
var _excluded2 = ["breakpoints", "palette", "spacing", "shape"];
function createTheme(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    shape: shapeInput = {}
  } = options, other = _objectWithoutPropertiesLoose(options, _excluded2);
  const breakpoints = createBreakpoints(breakpointsInput);
  const spacing2 = createSpacing(spacingInput);
  let muiTheme = deepmerge({
    breakpoints,
    direction: "ltr",
    components: {},
    palette: _extends({
      mode: "light"
    }, paletteInput),
    spacing: spacing2,
    shape: _extends({}, shape_default, shapeInput)
  }, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  return muiTheme;
}
var createTheme_default = createTheme;

// ../../node_modules/@material-ui/private-theming/useTheme/ThemeContext.js
import {
  createContext as createContext7
} from "react";
var ThemeContext2 = /* @__PURE__ */ createContext7(null);
if (true) {
  ThemeContext2.displayName = "ThemeContext";
}
var ThemeContext_default = ThemeContext2;

// ../../node_modules/@material-ui/private-theming/useTheme/useTheme.js
import {
  useContext as useContext16,
  useDebugValue
} from "react";
function useTheme() {
  const theme = useContext16(ThemeContext_default);
  if (true) {
    useDebugValue(theme);
  }
  return theme;
}

// ../../node_modules/@material-ui/system/esm/useThemeWithoutDefault.js
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function useTheme2(defaultTheme2 = null) {
  const contextTheme = useTheme();
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme2 : contextTheme;
}
var useThemeWithoutDefault_default = useTheme2;

// ../../node_modules/@material-ui/system/esm/useTheme.js
var systemDefaultTheme = createTheme_default();
function useTheme3(defaultTheme2 = systemDefaultTheme) {
  return useThemeWithoutDefault_default(defaultTheme2);
}
var useTheme_default = useTheme3;

// ../../node_modules/@material-ui/system/esm/propsToClassKey.js
var _excluded3 = ["variant"];
function isEmpty(string) {
  return string.length === 0;
}
function propsToClassKey(props) {
  const {
    variant
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded3);
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

// ../../node_modules/@material-ui/system/esm/createStyled.js
var _excluded4 = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
var _excluded22 = ["theme"];
var _excluded32 = ["theme"];
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
  const themeVariants = theme == null ? void 0 : (_theme$components = theme.components) == null ? void 0 : (_theme$components$nam = _theme$components[name]) == null ? void 0 : _theme$components$nam.variants;
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
var shouldForwardProp = (prop) => {
  return prop !== "styleProps" && prop !== "theme" && prop !== "sx" && prop !== "as";
};
var systemDefaultTheme2 = createTheme_default();
var lowercaseFirstLetter = (string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};
function createStyled(input = {}) {
  const {
    defaultTheme: defaultTheme2 = systemDefaultTheme2,
    rootShouldForwardProp: rootShouldForwardProp2 = shouldForwardProp,
    slotShouldForwardProp = shouldForwardProp
  } = input;
  return (tag, inputOptions = {}) => {
    const {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      skipSx: inputSkipSx,
      overridesResolver
    } = inputOptions, options = _objectWithoutPropertiesLoose(inputOptions, _excluded4);
    const skipVariantsResolver = inputSkipVariantsResolver !== void 0 ? inputSkipVariantsResolver : componentSlot && componentSlot !== "Root" || false;
    const skipSx = inputSkipSx || false;
    let displayName;
    let className;
    if (componentName) {
      displayName = `${componentName}${componentSlot || ""}`;
      className = `${componentName}-${lowercaseFirstLetter(componentSlot || "Root")}`;
    }
    const defaultStyledResolver = styled(tag, _extends({}, !componentSlot || componentSlot === "Root" ? {
      shouldForwardProp: rootShouldForwardProp2
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
          } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded22);
          return stylesArg(_extends({
            theme: isEmpty2(themeInput) ? defaultTheme2 : themeInput
          }, other));
        } : stylesArg;
      }) : [];
      let transformedStyleArg = styleArg;
      if (componentName && overridesResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty2(props.theme) ? defaultTheme2 : props.theme;
          const styleOverrides = getStyleOverrides(componentName, theme);
          if (styleOverrides) {
            return overridesResolver(props, styleOverrides);
          }
          return null;
        });
      }
      if (componentName && overridesResolver && !skipVariantsResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty2(props.theme) ? defaultTheme2 : props.theme;
          return variantsResolver(props, getVariantStyles(componentName, theme), theme, componentName);
        });
      }
      if (!skipSx) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty2(props.theme) ? defaultTheme2 : props.theme;
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
          } = _ref2, other = _objectWithoutPropertiesLoose(_ref2, _excluded32);
          return styleArg(_extends({
            theme: isEmpty2(themeInput) ? defaultTheme2 : themeInput
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
}

// ../../node_modules/@material-ui/system/esm/useThemeProps/getThemeProps.js
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

// ../../node_modules/@material-ui/system/esm/useThemeProps/useThemeProps.js
function useThemeProps({
  props,
  name,
  defaultTheme: defaultTheme2
}) {
  const theme = useTheme_default(defaultTheme2);
  const mergedProps = getThemeProps({
    theme,
    name,
    props
  });
  return mergedProps;
}

// ../../node_modules/@material-ui/system/esm/colorManipulator.js
function clamp3(value, min = 0, max = 1) {
  if (true) {
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
    throw new Error(true ? `Material-UI: Unsupported \`${color3}\` color.
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
      throw new Error(true ? `Material-UI: unsupported \`${colorSpace}\` color space.
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
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161"
};
var grey_default = grey;

// ../../node_modules/@material-ui/core/colors/purple.js
var purple = {
  50: "#f3e5f5",
  100: "#e1bee7",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  600: "#8e24aa",
  700: "#7b1fa2",
  800: "#6a1b9a",
  900: "#4a148c",
  A100: "#ea80fc",
  A200: "#e040fb",
  A400: "#d500f9",
  A700: "#aa00ff"
};
var purple_default = purple;

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

// ../../node_modules/@material-ui/core/colors/lightBlue.js
var lightBlue = {
  50: "#e1f5fe",
  100: "#b3e5fc",
  200: "#81d4fa",
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  600: "#039be5",
  700: "#0288d1",
  800: "#0277bd",
  900: "#01579b",
  A100: "#80d8ff",
  A200: "#40c4ff",
  A400: "#00b0ff",
  A700: "#0091ea"
};
var lightBlue_default = lightBlue;

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

// ../../node_modules/@material-ui/core/styles/createPalette.js
var _excluded5 = ["mode", "contrastThreshold", "tonalOffset"];
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
function getDefaultPrimary(mode = "light") {
  if (mode === "dark") {
    return {
      main: blue_default[200],
      light: blue_default[50],
      dark: blue_default[400]
    };
  }
  return {
    main: blue_default[700],
    light: blue_default[400],
    dark: blue_default[800]
  };
}
function getDefaultSecondary(mode = "light") {
  if (mode === "dark") {
    return {
      main: purple_default[200],
      light: purple_default[50],
      dark: purple_default[400]
    };
  }
  return {
    main: purple_default[500],
    light: purple_default[300],
    dark: purple_default[700]
  };
}
function getDefaultError(mode = "light") {
  if (mode === "dark") {
    return {
      main: red_default[500],
      light: red_default[300],
      dark: red_default[700]
    };
  }
  return {
    main: red_default[700],
    light: red_default[400],
    dark: red_default[800]
  };
}
function getDefaultInfo(mode = "light") {
  if (mode === "dark") {
    return {
      main: lightBlue_default[400],
      light: lightBlue_default[300],
      dark: lightBlue_default[700]
    };
  }
  return {
    main: lightBlue_default[700],
    light: lightBlue_default[500],
    dark: lightBlue_default[900]
  };
}
function getDefaultSuccess(mode = "light") {
  if (mode === "dark") {
    return {
      main: green_default[400],
      light: green_default[300],
      dark: green_default[700]
    };
  }
  return {
    main: green_default[800],
    light: green_default[500],
    dark: green_default[900]
  };
}
function getDefaultWarning(mode = "light") {
  if (mode === "dark") {
    return {
      main: orange_default[400],
      light: orange_default[300],
      dark: orange_default[700]
    };
  }
  return {
    main: "#ED6C02",
    light: orange_default[500],
    dark: orange_default[900]
  };
}
function createPalette(palette2) {
  const {
    mode = "light",
    contrastThreshold = 3,
    tonalOffset = 0.2
  } = palette2, other = _objectWithoutPropertiesLoose(palette2, _excluded5);
  const primary = palette2.primary || getDefaultPrimary(mode);
  const secondary = palette2.secondary || getDefaultSecondary(mode);
  const error = palette2.error || getDefaultError(mode);
  const info = palette2.info || getDefaultInfo(mode);
  const success = palette2.success || getDefaultSuccess(mode);
  const warning2 = palette2.warning || getDefaultWarning(mode);
  function getContrastText(background) {
    const contrastText = getContrastRatio(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;
    if (true) {
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
      throw new Error(true ? `Material-UI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${mainShade}\` property.` : formatMuiErrorMessage(11, name ? ` (${name})` : "", mainShade));
    }
    if (typeof color3.main !== "string") {
      throw new Error(true ? `Material-UI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(color3.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@material-ui/core/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
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
  if (true) {
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
var _excluded6 = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
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
  } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded6);
  if (true) {
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

// ../../node_modules/@material-ui/core/styles/createTransitions.js
var _excluded7 = ["duration", "easing", "delay"];
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
function getAutoHeightDuration(height2) {
  if (!height2) {
    return 0;
  }
  const constant = height2 / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}
function createTransitions(inputTransitions) {
  const mergedEasing = _extends({}, easing, inputTransitions.easing);
  const mergedDuration = _extends({}, duration, inputTransitions.duration);
  const create = (props = ["all"], options = {}) => {
    const {
      duration: durationOption = mergedDuration.standard,
      easing: easingOption = mergedEasing.easeInOut,
      delay = 0
    } = options, other = _objectWithoutPropertiesLoose(options, _excluded7);
    if (true) {
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
  };
  return _extends({
    getAutoHeightDuration,
    create
  }, inputTransitions, {
    easing: mergedEasing,
    duration: mergedDuration
  });
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

// ../../node_modules/@material-ui/core/styles/createTheme.js
var _excluded8 = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function createTheme2(options = {}, ...args) {
  const {
    mixins: mixinsInput = {},
    palette: paletteInput = {},
    transitions: transitionsInput = {},
    typography: typographyInput = {}
  } = options, other = _objectWithoutPropertiesLoose(options, _excluded8);
  const palette2 = createPalette(paletteInput);
  const systemTheme = createTheme_default(options);
  let muiTheme = deepmerge(systemTheme, {
    mixins: createMixins(systemTheme.breakpoints, systemTheme.spacing, mixinsInput),
    palette: palette2,
    shadows: shadows_default2.slice(),
    typography: createTypography(palette2, typographyInput),
    transitions: createTransitions(transitionsInput),
    zIndex: _extends({}, zIndex_default)
  });
  muiTheme = deepmerge(muiTheme, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  if (true) {
    const pseudoClasses = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"];
    const traverse = (node, component) => {
      let key;
      for (key in node) {
        const child = node[key];
        if (pseudoClasses.indexOf(key) !== -1 && Object.keys(child).length > 0) {
          if (true) {
            const pseudoClass = generateUtilityClass("", key);
            console.error([`Material-UI: The \`${component}\` component increases the CSS specificity of the \`${key}\` internal state.`, "You can not override it like this: ", JSON.stringify(node, null, 2), "", `Instead, you need to use the '&.${pseudoClass}' syntax:`, JSON.stringify({
              root: {
                [`&.${pseudoClass}`]: child
              }
            }, null, 2), "", "https://material-ui.com/r/pseudo-classes-guide"].join("\n"));
          }
          node[key] = {};
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
var createTheme_default2 = createTheme2;

// ../../node_modules/@material-ui/core/styles/defaultTheme.js
var defaultTheme = createTheme_default2();
var defaultTheme_default = defaultTheme;

// ../../node_modules/@material-ui/core/styles/styled.js
var rootShouldForwardProp = (prop) => shouldForwardProp(prop) && prop !== "classes";
var styled2 = createStyled({
  defaultTheme: defaultTheme_default,
  rootShouldForwardProp
});
var styled_default = styled2;

// ../../node_modules/@material-ui/core/styles/useThemeProps.js
function useThemeProps2({
  props,
  name
}) {
  return useThemeProps({
    props,
    name,
    defaultTheme: defaultTheme_default
  });
}

// ../../node_modules/@material-ui/core/utils/useForkRef.js
var useForkRef_default = useForkRef;

// ../../node_modules/@material-ui/core/utils/useEventCallback.js
var useEventCallback_default = useEventCallback;

// ../../node_modules/@material-ui/core/utils/useIsFocusVisible.js
var useIsFocusVisible_default = useIsFocusVisible;

// ../../node_modules/@material-ui/core/ButtonBase/TouchRipple.js
var import_prop_types7 = __toModule(require_prop_types());
import {
  forwardRef as forwardRef2,
  useCallback as useCallback5,
  useEffect as useEffect18,
  useImperativeHandle,
  useRef as useRef12,
  useState as useState8
} from "react";

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

// ../../node_modules/react-transition-group/esm/TransitionGroupContext.js
import React15 from "react";
var TransitionGroupContext_default = React15.createContext(null);

// ../../node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

// ../../node_modules/react-transition-group/esm/TransitionGroup.js
var import_prop_types5 = __toModule(require_prop_types());
import React16 from "react";

// ../../node_modules/react-transition-group/esm/utils/ChildMapping.js
import { Children as Children2, cloneElement as cloneElement2, isValidElement as isValidElement2 } from "react";
function getChildMapping(children, mapFn) {
  var mapper = function mapper2(child) {
    return mapFn && isValidElement2(child) ? mapFn(child) : child;
  };
  var result = Object.create(null);
  if (children)
    Children2.map(children, function(c2) {
      return c2;
    }).forEach(function(child) {
      result[child.key] = mapper(child);
    });
  return result;
}
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};
  function getValueForKey(key) {
    return key in next ? next[key] : prev[key];
  }
  var nextKeysPending = Object.create(null);
  var pendingKeys = [];
  for (var prevKey in prev) {
    if (prevKey in next) {
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
  for (var nextKey in next) {
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
    return cloneElement2(child, {
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
    if (!isValidElement2(child))
      return;
    var hasPrev = key in prevChildMapping;
    var hasNext = key in nextChildMapping;
    var prevChild = prevChildMapping[key];
    var isLeaving = isValidElement2(prevChild) && !prevChild.props.in;
    if (hasNext && (!hasPrev || isLeaving)) {
      children[key] = cloneElement2(child, {
        onExited: onExited.bind(null, child),
        in: true,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    } else if (!hasNext && hasPrev && !isLeaving) {
      children[key] = cloneElement2(child, {
        in: false
      });
    } else if (hasNext && hasPrev && isValidElement2(prevChild)) {
      children[key] = cloneElement2(child, {
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
  _proto.handleExited = function handleExited(child, node) {
    var currentChildMapping = getChildMapping(this.props.children);
    if (child.key in currentChildMapping)
      return;
    if (child.props.onExited) {
      child.props.onExited(node);
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
  _proto.render = function render3() {
    var _this$props = this.props, Component3 = _this$props.component, childFactory2 = _this$props.childFactory, props = _objectWithoutPropertiesLoose(_this$props, ["component", "childFactory"]);
    var contextValue = this.state.contextValue;
    var children = values2(this.state.children).map(childFactory2);
    delete props.appear;
    delete props.enter;
    delete props.exit;
    if (Component3 === null) {
      return /* @__PURE__ */ React16.createElement(TransitionGroupContext_default.Provider, {
        value: contextValue
      }, children);
    }
    return /* @__PURE__ */ React16.createElement(TransitionGroupContext_default.Provider, {
      value: contextValue
    }, /* @__PURE__ */ React16.createElement(Component3, props, children));
  };
  return TransitionGroup2;
}(React16.Component);
TransitionGroup.propTypes = true ? {
  component: import_prop_types5.default.any,
  children: import_prop_types5.default.node,
  appear: import_prop_types5.default.bool,
  enter: import_prop_types5.default.bool,
  exit: import_prop_types5.default.bool,
  childFactory: import_prop_types5.default.func
} : {};
TransitionGroup.defaultProps = defaultProps;
var TransitionGroup_default = TransitionGroup;

// ../../node_modules/@material-ui/core/ButtonBase/Ripple.js
var import_prop_types6 = __toModule(require_prop_types());
import {
  useEffect as useEffect17,
  useState as useState7
} from "react";
import { jsx as _jsx } from "react/jsx-runtime";
function Ripple(props) {
  const {
    className,
    classes,
    pulsate = false,
    rippleX,
    rippleY,
    rippleSize,
    in: inProp,
    onExited,
    timeout
  } = props;
  const [leaving, setLeaving] = useState7(false);
  const rippleClassName = clsx_m_default(className, classes.ripple, classes.rippleVisible, pulsate && classes.ripplePulsate);
  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX
  };
  const childClassName = clsx_m_default(classes.child, leaving && classes.childLeaving, pulsate && classes.childPulsate);
  if (!inProp && !leaving) {
    setLeaving(true);
  }
  useEffect17(() => {
    if (!inProp && onExited != null) {
      const timeoutId = setTimeout(onExited, timeout);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    return void 0;
  }, [onExited, inProp, timeout]);
  return /* @__PURE__ */ _jsx("span", {
    className: rippleClassName,
    style: rippleStyles,
    children: /* @__PURE__ */ _jsx("span", {
      className: childClassName
    })
  });
}
true ? Ripple.propTypes = {
  classes: import_prop_types6.default.object.isRequired,
  className: import_prop_types6.default.string,
  in: import_prop_types6.default.bool,
  onExited: import_prop_types6.default.func,
  pulsate: import_prop_types6.default.bool,
  rippleSize: import_prop_types6.default.number,
  rippleX: import_prop_types6.default.number,
  rippleY: import_prop_types6.default.number,
  timeout: import_prop_types6.default.number.isRequired
} : void 0;
var Ripple_default = Ripple;

// ../../node_modules/@material-ui/core/ButtonBase/touchRippleClasses.js
var touchRippleClasses = generateUtilityClasses("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]);
var touchRippleClasses_default = touchRippleClasses;

// ../../node_modules/@material-ui/core/ButtonBase/TouchRipple.js
import { jsx as _jsx2 } from "react/jsx-runtime";
var _excluded9 = ["center", "classes", "className"];
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
var TouchRippleRoot = styled_default("span", {
  name: "MuiTouchRipple",
  slot: "Root",
  skipSx: true
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
var TouchRippleRipple = styled_default(Ripple_default, {
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
var TouchRipple = /* @__PURE__ */ forwardRef2(function TouchRipple2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiTouchRipple"
  });
  const {
    center: centerProp = false,
    classes = {},
    className
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded9);
  const [ripples, setRipples] = useState8([]);
  const nextKey = useRef12(0);
  const rippleCallback = useRef12(null);
  useEffect18(() => {
    if (rippleCallback.current) {
      rippleCallback.current();
      rippleCallback.current = null;
    }
  }, [ripples]);
  const ignoringMouseDown = useRef12(false);
  const startTimer = useRef12(null);
  const startTimerCommit = useRef12(null);
  const container = useRef12(null);
  useEffect18(() => {
    return () => {
      clearTimeout(startTimer.current);
    };
  }, []);
  const startCommit = useCallback5((params) => {
    const {
      pulsate: pulsate2,
      rippleX,
      rippleY,
      rippleSize,
      cb: cb2
    } = params;
    setRipples((oldRipples) => [...oldRipples, /* @__PURE__ */ _jsx2(TouchRippleRipple, {
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
  const start = useCallback5((event = {}, options = {}, cb2) => {
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
  const pulsate = useCallback5(() => {
    start({}, {
      pulsate: true
    });
  }, [start]);
  const stop = useCallback5((event, cb2) => {
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
  useImperativeHandle(ref, () => ({
    pulsate,
    start,
    stop
  }), [pulsate, start, stop]);
  return /* @__PURE__ */ _jsx2(TouchRippleRoot, _extends({
    className: clsx_m_default(classes.root, touchRippleClasses_default.root, className),
    ref: container
  }, other, {
    children: /* @__PURE__ */ _jsx2(TransitionGroup_default, {
      component: null,
      exit: true,
      children: ripples
    })
  }));
});
true ? TouchRipple.propTypes = {
  center: import_prop_types7.default.bool,
  classes: import_prop_types7.default.object,
  className: import_prop_types7.default.string
} : void 0;
var TouchRipple_default = TouchRipple;

// ../../node_modules/@material-ui/core/ButtonBase/buttonBaseClasses.js
function getButtonBaseUtilityClass(slot) {
  return generateUtilityClass("MuiButtonBase", slot);
}
var buttonBaseClasses = generateUtilityClasses("MuiButtonBase", ["root", "disabled", "focusVisible"]);
var buttonBaseClasses_default = buttonBaseClasses;

// ../../node_modules/@material-ui/core/ButtonBase/ButtonBase.js
import { jsx as _jsx3 } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var _excluded10 = ["action", "centerRipple", "children", "className", "component", "disabled", "disableRipple", "disableTouchRipple", "focusRipple", "focusVisibleClassName", "LinkComponent", "onBlur", "onClick", "onContextMenu", "onDragLeave", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchMove", "onTouchStart", "tabIndex", "TouchRippleProps", "type"];
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
var ButtonBaseRoot = styled_default("button", {
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
var ButtonBase = /* @__PURE__ */ forwardRef3(function ButtonBase2(inProps, ref) {
  const props = useThemeProps2({
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
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded10);
  const buttonRef = useRef13(null);
  const rippleRef = useRef13(null);
  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible_default();
  const [focusVisible, setFocusVisible] = useState9(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }
  useEffect19(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);
  useImperativeHandle2(action, () => ({
    focusVisible: () => {
      setFocusVisible(true);
      buttonRef.current.focus();
    }
  }), []);
  useEffect19(() => {
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
  const keydownRef = useRef13(false);
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
  if (ComponentProp === "button" && (other.href || other.to)) {
    ComponentProp = LinkComponent;
  }
  const buttonProps = {};
  if (ComponentProp === "button") {
    buttonProps.type = type === void 0 ? "button" : type;
    buttonProps.disabled = disabled;
  } else {
    if (!other.href && !other.to) {
      buttonProps.role = "button";
    }
    if (disabled) {
      buttonProps["aria-disabled"] = disabled;
    }
  }
  const handleOwnRef = useForkRef_default(focusVisibleRef, buttonRef);
  const handleRef = useForkRef_default(ref, handleOwnRef);
  const [mountedState, setMountedState] = useState9(false);
  useEffect19(() => {
    setMountedState(true);
  }, []);
  const enableTouchRipple = mountedState && !disableRipple && !disabled;
  if (true) {
    useEffect19(() => {
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
  return /* @__PURE__ */ _jsxs(ButtonBaseRoot, _extends({
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
    children: [children, enableTouchRipple ? /* @__PURE__ */ _jsx3(TouchRipple_default, _extends({
      ref: rippleRef,
      center: centerRipple
    }, TouchRippleProps)) : null]
  }));
});
true ? ButtonBase.propTypes = {
  action: refType_default,
  centerRipple: import_prop_types8.default.bool,
  children: import_prop_types8.default.node,
  classes: import_prop_types8.default.object,
  className: import_prop_types8.default.string,
  component: elementTypeAcceptingRef_default,
  disabled: import_prop_types8.default.bool,
  disableRipple: import_prop_types8.default.bool,
  disableTouchRipple: import_prop_types8.default.bool,
  focusRipple: import_prop_types8.default.bool,
  focusVisibleClassName: import_prop_types8.default.string,
  href: import_prop_types8.default.any,
  LinkComponent: import_prop_types8.default.elementType,
  onBlur: import_prop_types8.default.func,
  onClick: import_prop_types8.default.func,
  onContextMenu: import_prop_types8.default.func,
  onDragLeave: import_prop_types8.default.func,
  onFocus: import_prop_types8.default.func,
  onFocusVisible: import_prop_types8.default.func,
  onKeyDown: import_prop_types8.default.func,
  onKeyUp: import_prop_types8.default.func,
  onMouseDown: import_prop_types8.default.func,
  onMouseLeave: import_prop_types8.default.func,
  onMouseUp: import_prop_types8.default.func,
  onTouchEnd: import_prop_types8.default.func,
  onTouchMove: import_prop_types8.default.func,
  onTouchStart: import_prop_types8.default.func,
  sx: import_prop_types8.default.object,
  tabIndex: import_prop_types8.default.oneOfType([import_prop_types8.default.number, import_prop_types8.default.string]),
  TouchRippleProps: import_prop_types8.default.object,
  type: import_prop_types8.default.oneOfType([import_prop_types8.default.oneOf(["button", "reset", "submit"]), import_prop_types8.default.string])
} : void 0;
var ButtonBase_default = ButtonBase;

// ../../node_modules/@material-ui/core/utils/capitalize.js
var capitalize_default = capitalize;

// ../../node_modules/@material-ui/core/Fab/fabClasses.js
function getFabUtilityClass(slot) {
  return generateUtilityClass("MuiFab", slot);
}
var fabClasses = generateUtilityClasses("MuiFab", ["root", "primary", "secondary", "extended", "circular", "focusVisible", "disabled", "colorInherit", "sizeSmall", "sizeMedium", "sizeLarge"]);
var fabClasses_default = fabClasses;

// ../../node_modules/@material-ui/core/Fab/Fab.js
import { jsx as _jsx4 } from "react/jsx-runtime";
var _excluded11 = ["children", "className", "color", "component", "disabled", "disableFocusRipple", "focusVisibleClassName", "size", "variant"];
var useUtilityClasses2 = (styleProps) => {
  const {
    color: color3,
    variant,
    classes,
    size
  } = styleProps;
  const slots = {
    root: ["root", variant, `size${capitalize_default(size)}`, color3 === "inherit" && "colorInherit", color3 === "primary" && "primary", color3 === "secondary" && "secondary"]
  };
  return composeClasses(slots, getFabUtilityClass, classes);
};
var FabRoot = styled_default(ButtonBase_default, {
  name: "MuiFab",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styles[styleProps.variant], styles[`size${capitalize_default(styleProps.size)}`], styleProps.color === "inherit" && styles.colorInherit, styleProps.color === "primary" && styles.primary, styleProps.color === "secondary" && styles.secondary];
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
var Fab = /* @__PURE__ */ forwardRef4(function Fab2(inProps, ref) {
  const props = useThemeProps2({
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
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded11);
  const styleProps = _extends({}, props, {
    color: color3,
    component,
    disabled,
    disableFocusRipple,
    size,
    variant
  });
  const classes = useUtilityClasses2(styleProps);
  return /* @__PURE__ */ _jsx4(FabRoot, _extends({
    className: clsx_m_default(classes.root, className),
    component,
    disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: clsx_m_default(classes.focusVisible, focusVisibleClassName),
    styleProps,
    ref
  }, other, {
    children
  }));
});
true ? Fab.propTypes = {
  children: import_prop_types9.default.node,
  classes: import_prop_types9.default.object,
  className: import_prop_types9.default.string,
  color: import_prop_types9.default.oneOfType([import_prop_types9.default.oneOf(["default", "inherit", "primary", "secondary"]), import_prop_types9.default.string]),
  component: import_prop_types9.default.elementType,
  disabled: import_prop_types9.default.bool,
  disableFocusRipple: import_prop_types9.default.bool,
  disableRipple: import_prop_types9.default.bool,
  focusVisibleClassName: import_prop_types9.default.string,
  href: import_prop_types9.default.string,
  size: import_prop_types9.default.oneOfType([import_prop_types9.default.oneOf(["small", "medium", "large"]), import_prop_types9.default.string]),
  sx: import_prop_types9.default.object,
  variant: import_prop_types9.default.oneOfType([import_prop_types9.default.oneOf(["circular", "extended"]), import_prop_types9.default.string])
} : void 0;
var Fab_default = Fab;

// ../../node_modules/@material-ui/core/Button/Button.js
var import_prop_types10 = __toModule(require_prop_types());
import {
  forwardRef as forwardRef5
} from "react";

// ../../node_modules/@material-ui/core/Button/buttonClasses.js
function getButtonUtilityClass(slot) {
  return generateUtilityClass("MuiButton", slot);
}
var buttonClasses = generateUtilityClasses("MuiButton", ["root", "text", "textInherit", "textPrimary", "textSecondary", "outlined", "outlinedInherit", "outlinedPrimary", "outlinedSecondary", "contained", "containedInherit", "containedPrimary", "containedSecondary", "disableElevation", "focusVisible", "disabled", "colorInherit", "textSizeSmall", "textSizeMedium", "textSizeLarge", "outlinedSizeSmall", "outlinedSizeMedium", "outlinedSizeLarge", "containedSizeSmall", "containedSizeMedium", "containedSizeLarge", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "iconSizeSmall", "iconSizeMedium", "iconSizeLarge"]);
var buttonClasses_default = buttonClasses;

// ../../node_modules/@material-ui/core/Button/Button.js
import { jsx as _jsx5 } from "react/jsx-runtime";
import { jsxs as _jsxs2 } from "react/jsx-runtime";
var _excluded12 = ["children", "color", "component", "disabled", "disableElevation", "disableFocusRipple", "endIcon", "focusVisibleClassName", "fullWidth", "size", "startIcon", "type", "variant"];
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
var ButtonRoot = styled_default(ButtonBase_default, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styles[styleProps.variant], styles[`${styleProps.variant}${capitalize_default(styleProps.color)}`], styles[`size${capitalize_default(styleProps.size)}`], styles[`${styleProps.variant}Size${capitalize_default(styleProps.size)}`], styleProps.color === "inherit" && styles.colorInherit, styleProps.disableElevation && styles.disableElevation, styleProps.fullWidth && styles.fullWidth];
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
var ButtonStartIcon = styled_default("span", {
  name: "MuiButton",
  slot: "StartIcon",
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.startIcon, styles[`iconSize${capitalize_default(styleProps.size)}`]];
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
var ButtonEndIcon = styled_default("span", {
  name: "MuiButton",
  slot: "EndIcon",
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.endIcon, styles[`iconSize${capitalize_default(styleProps.size)}`]];
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
var Button = /* @__PURE__ */ forwardRef5(function Button2(inProps, ref) {
  const props = useThemeProps2({
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
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded12);
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
  const startIcon = startIconProp && /* @__PURE__ */ _jsx5(ButtonStartIcon, {
    className: classes.startIcon,
    styleProps,
    children: startIconProp
  });
  const endIcon = endIconProp && /* @__PURE__ */ _jsx5(ButtonEndIcon, {
    className: classes.endIcon,
    styleProps,
    children: endIconProp
  });
  return /* @__PURE__ */ _jsxs2(ButtonRoot, _extends({
    styleProps,
    component,
    disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: clsx_m_default(classes.focusVisible, focusVisibleClassName),
    ref,
    type
  }, other, {
    classes,
    children: [startIcon, children, endIcon]
  }));
});
true ? Button.propTypes = {
  children: import_prop_types10.default.node,
  classes: import_prop_types10.default.object,
  color: import_prop_types10.default.oneOfType([import_prop_types10.default.oneOf(["inherit", "primary", "secondary", "success", "error", "info", "warning"]), import_prop_types10.default.string]),
  component: import_prop_types10.default.elementType,
  disabled: import_prop_types10.default.bool,
  disableElevation: import_prop_types10.default.bool,
  disableFocusRipple: import_prop_types10.default.bool,
  disableRipple: import_prop_types10.default.bool,
  endIcon: import_prop_types10.default.node,
  focusVisibleClassName: import_prop_types10.default.string,
  fullWidth: import_prop_types10.default.bool,
  href: import_prop_types10.default.string,
  size: import_prop_types10.default.oneOfType([import_prop_types10.default.oneOf(["small", "medium", "large"]), import_prop_types10.default.string]),
  startIcon: import_prop_types10.default.node,
  sx: import_prop_types10.default.object,
  type: import_prop_types10.default.oneOfType([import_prop_types10.default.oneOf(["button", "reset", "submit"]), import_prop_types10.default.string]),
  variant: import_prop_types10.default.oneOfType([import_prop_types10.default.oneOf(["contained", "outlined", "text"]), import_prop_types10.default.string])
} : void 0;
var Button_default = Button;

// ../../node_modules/@material-ui/core/ToggleButton/ToggleButton.js
var import_prop_types11 = __toModule(require_prop_types());
import {
  forwardRef as forwardRef6
} from "react";

// ../../node_modules/@material-ui/core/ToggleButton/toggleButtonClasses.js
function getToggleButtonUtilityClass(slot) {
  return generateUtilityClass("MuiToggleButton", slot);
}
var toggleButtonClasses = generateUtilityClasses("MuiToggleButton", ["root", "disabled", "selected", "standard", "primary", "secondary", "sizeSmall", "sizeMedium", "sizeLarge"]);
var toggleButtonClasses_default = toggleButtonClasses;

// ../../node_modules/@material-ui/core/ToggleButton/ToggleButton.js
import { jsx as _jsx6 } from "react/jsx-runtime";
var _excluded13 = ["children", "className", "color", "disabled", "disableFocusRipple", "fullWidth", "onChange", "onClick", "selected", "size", "value"];
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
    root: ["root", selected && "selected", disabled && "disabled", fullWidth && "fullWidth", `size${capitalize_default(size)}`, color3]
  };
  return composeClasses(slots, getToggleButtonUtilityClass, classes);
};
var ToggleButtonRoot = styled_default(ButtonBase_default, {
  name: "MuiToggleButton",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styles[`size${capitalize_default(styleProps.size)}`]];
  }
})(({
  theme,
  styleProps
}) => {
  const selectedColor = styleProps.color === "standard" ? theme.palette.text.primary : theme.palette[styleProps.color].main;
  return _extends({}, theme.typography.button, {
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
    },
    [`&.${toggleButtonClasses_default.selected}`]: {
      color: selectedColor,
      backgroundColor: alpha2(selectedColor, theme.palette.action.selectedOpacity),
      "&:hover": {
        backgroundColor: alpha2(selectedColor, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
        "@media (hover: none)": {
          backgroundColor: alpha2(selectedColor, theme.palette.action.selectedOpacity)
        }
      }
    }
  }, styleProps.size === "small" && {
    padding: 7,
    fontSize: theme.typography.pxToRem(13)
  }, styleProps.size === "large" && {
    padding: 15,
    fontSize: theme.typography.pxToRem(15)
  });
});
var ToggleButton = /* @__PURE__ */ forwardRef6(function ToggleButton2(inProps, ref) {
  const props = useThemeProps2({
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
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded13);
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
  return /* @__PURE__ */ _jsx6(ToggleButtonRoot, _extends({
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
    children
  }));
});
true ? ToggleButton.propTypes = {
  children: import_prop_types11.default.node,
  classes: import_prop_types11.default.object,
  className: import_prop_types11.default.string,
  color: import_prop_types11.default.oneOfType([import_prop_types11.default.oneOf(["standard", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types11.default.string]),
  disabled: import_prop_types11.default.bool,
  disableFocusRipple: import_prop_types11.default.bool,
  disableRipple: import_prop_types11.default.bool,
  fullWidth: import_prop_types11.default.bool,
  onChange: import_prop_types11.default.func,
  onClick: import_prop_types11.default.func,
  selected: import_prop_types11.default.bool,
  size: import_prop_types11.default.oneOfType([import_prop_types11.default.oneOf(["small", "medium", "large"]), import_prop_types11.default.string]),
  sx: import_prop_types11.default.object,
  value: import_prop_types11.default.any.isRequired
} : void 0;
var ToggleButton_default = ToggleButton;

// ../../node_modules/@material-ui/core/ToggleButtonGroup/ToggleButtonGroup.js
var import_react_is = __toModule(require_react_is2());
var import_prop_types12 = __toModule(require_prop_types());
import {
  Children as Children3,
  cloneElement as cloneElement3,
  forwardRef as forwardRef7,
  isValidElement as isValidElement3
} from "react";

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
import { jsx as _jsx7 } from "react/jsx-runtime";
var _excluded14 = ["children", "className", "color", "exclusive", "fullWidth", "onChange", "orientation", "size", "value"];
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
var ToggleButtonGroupRoot = styled_default("div", {
  name: "MuiToggleButtonGroup",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [{
      [`& .${toggleButtonGroupClasses_default.grouped}`]: styles.grouped
    }, {
      [`& .${toggleButtonGroupClasses_default.grouped}`]: styles[`grouped${capitalize_default(styleProps.orientation)}`]
    }, styles.root, styleProps.orientation === "vertical" && styles.vertical, styleProps.fullWidth && styles.fullWidth];
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
var ToggleButtonGroup = /* @__PURE__ */ forwardRef7(function ToggleButtonGroup2(inProps, ref) {
  const props = useThemeProps2({
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
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded14);
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
  return /* @__PURE__ */ _jsx7(ToggleButtonGroupRoot, _extends({
    role: "group",
    className: clsx_m_default(classes.root, className),
    ref,
    styleProps
  }, other, {
    children: Children3.map(children, (child) => {
      if (!/* @__PURE__ */ isValidElement3(child)) {
        return null;
      }
      if (true) {
        if ((0, import_react_is.isFragment)(child)) {
          console.error(["Material-UI: The ToggleButtonGroup component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join("\n"));
        }
      }
      return /* @__PURE__ */ cloneElement3(child, {
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
true ? ToggleButtonGroup.propTypes = {
  children: import_prop_types12.default.node,
  classes: import_prop_types12.default.object,
  className: import_prop_types12.default.string,
  color: import_prop_types12.default.oneOf(["error", "info", "primary", "secondary", "standard", "success", "warning"]),
  exclusive: import_prop_types12.default.bool,
  fullWidth: import_prop_types12.default.bool,
  onChange: import_prop_types12.default.func,
  orientation: import_prop_types12.default.oneOf(["horizontal", "vertical"]),
  size: import_prop_types12.default.oneOfType([import_prop_types12.default.oneOf(["small", "medium", "large"]), import_prop_types12.default.string]),
  sx: import_prop_types12.default.object,
  value: import_prop_types12.default.any
} : void 0;
var ToggleButtonGroup_default = ToggleButtonGroup;

// ../../node_modules/@material-ui/core/utils/createSvgIcon.js
import {
  forwardRef as forwardRef9,
  memo
} from "react";

// ../../node_modules/@material-ui/core/SvgIcon/SvgIcon.js
var import_prop_types13 = __toModule(require_prop_types());
import {
  forwardRef as forwardRef8
} from "react";

// ../../node_modules/@material-ui/core/SvgIcon/svgIconClasses.js
function getSvgIconUtilityClass(slot) {
  return generateUtilityClass("MuiSvgIcon", slot);
}
var svgIconClasses = generateUtilityClasses("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);

// ../../node_modules/@material-ui/core/SvgIcon/SvgIcon.js
import { jsx as _jsx8 } from "react/jsx-runtime";
import { jsxs as _jsxs3 } from "react/jsx-runtime";
var _excluded15 = ["children", "className", "color", "component", "fontSize", "htmlColor", "titleAccess", "viewBox"];
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
var SvgIconRoot = styled_default("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styleProps.color !== "inherit" && styles[`color${capitalize_default(styleProps.color)}`], styles[`fontSize${capitalize_default(styleProps.fontSize)}`]];
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
    info: theme.palette.info.main,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    action: theme.palette.action.active,
    error: theme.palette.error.main,
    disabled: theme.palette.action.disabled,
    inherit: void 0
  }[styleProps.color]
}));
var SvgIcon = /* @__PURE__ */ forwardRef8(function SvgIcon2(inProps, ref) {
  const props = useThemeProps2({
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
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded15);
  const styleProps = _extends({}, props, {
    color: color3,
    component,
    fontSize: fontSize2,
    viewBox
  });
  const classes = useUtilityClasses6(styleProps);
  return /* @__PURE__ */ _jsxs3(SvgIconRoot, _extends({
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
    children: [children, titleAccess ? /* @__PURE__ */ _jsx8("title", {
      children: titleAccess
    }) : null]
  }));
});
true ? SvgIcon.propTypes = {
  children: import_prop_types13.default.node,
  classes: import_prop_types13.default.object,
  className: import_prop_types13.default.string,
  color: import_prop_types13.default.oneOfType([import_prop_types13.default.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types13.default.string]),
  component: import_prop_types13.default.elementType,
  fontSize: import_prop_types13.default.oneOfType([import_prop_types13.default.oneOf(["inherit", "large", "medium", "small"]), import_prop_types13.default.string]),
  htmlColor: import_prop_types13.default.string,
  shapeRendering: import_prop_types13.default.string,
  sx: import_prop_types13.default.object,
  titleAccess: import_prop_types13.default.string,
  viewBox: import_prop_types13.default.string
} : void 0;
SvgIcon.muiName = "SvgIcon";
var SvgIcon_default = SvgIcon;

// ../../node_modules/@material-ui/core/utils/createSvgIcon.js
import { jsx as _jsx9 } from "react/jsx-runtime";
function createSvgIcon(path, displayName) {
  const Component3 = (props, ref) => /* @__PURE__ */ _jsx9(SvgIcon_default, _extends({
    "data-testid": `${displayName}Icon`,
    ref
  }, props, {
    children: path
  }));
  if (true) {
    Component3.displayName = `${displayName}Icon`;
  }
  Component3.muiName = SvgIcon_default.muiName;
  return /* @__PURE__ */ memo(/* @__PURE__ */ forwardRef9(Component3));
}

// src/icons/Share.tsx
var Share_default = createSvgIcon(/* @__PURE__ */ React26.createElement("path", {
  key: "12",
  d: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
}), "Share");

// src/icons/TabletAndroid.tsx
var TabletAndroid_default = createSvgIcon(/* @__PURE__ */ React26.createElement("path", {
  key: "12",
  d: "M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z"
}), "TabletAndroid");

// src/icons/Tv.tsx
var Tv_default = createSvgIcon(/* @__PURE__ */ React26.createElement("path", {
  key: "12",
  d: "M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"
}), "Tv");

// src/icons/PhoneAndroid.tsx
var PhoneAndroid_default = createSvgIcon(/* @__PURE__ */ React26.createElement("path", {
  key: "12",
  d: "M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z"
}), "PhoneAndroid");

// src/icons/QrCode.tsx
var QrCode_default = createSvgIcon(/* @__PURE__ */ React26.createElement("path", {
  key: "12",
  d: "M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm8-12v8h8V3h-8zm6 6h-4V5h4v4zm0 10h2v2h-2zm-6-6h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm2 2h2v2h-2zm2-2h2v2h-2zm0-4h2v2h-2zm2 2h2v2h-2z"
}), "QrCode");

// src/Qr.tsx
var QR = ({ url }) => {
  const canvasRef = React26.useRef(null);
  React26.useEffect(() => {
    const load = async () => {
      const { QRious } = await import("@zedvision/qrious");
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
    css: css2`
        border-radius: 16px;
        margin-bottom: 8px;
  `,
    ref: canvasRef
  });
};
var QRButton = ({ url }) => {
  const [showQR, setQR] = React26.useState(false);
  return /* @__PURE__ */ jsx(motion2.div, {
    animate: {
      width: showQR ? 200 : 56,
      height: showQR ? 220 : 48
    },
    onClick: (e) => {
      setQR(!showQR);
    },
    css: css2`
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
var DraggableWindow = ({ onShare, onRestore, position: position2, session }) => {
  const [isStable, setIsStable] = React26.useState(false);
  const [scaleRange, changeScaleRange] = React26.useState(75);
  const [height2, changeHeight] = React26.useState(innerHeight);
  const [childArray, setChild] = React26.useState([session.children]);
  session.setChild = setChild;
  const [qrUrl, setQRUrl] = React26.useState(session.url);
  const [errorText, setErrorText] = React26.useState(" ");
  const [width2, setWidth] = React26.useState(breakPoints[1]);
  const ref = React26.useRef(null);
  const zbody = React26.useRef(null);
  const child = childArray[childArray.length - 1];
  React26.useEffect(() => {
    window.addEventListener("resize", () => changeHeight(innerHeight));
  });
  React26.useEffect(() => {
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
    css: css2`
            right: 20px;
            background-color:rgba(92 ,92, 152, 0.8);
            backdrop-filter: blur(10px);
            top: 20px;
            padding: 0px 0px 0px 16px;
            border-radius: 16px;
            white-space: normal;
            position: ${position2 ? position2 : "fixed"};
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
    css: css2` 
              display: flex;
                `
  }, /* @__PURE__ */ jsx("div", {
    css: css2`
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
    css: css2`
                       color: ${size === scaleRange ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                       `
  }, size, "%")))), /* @__PURE__ */ jsx(motion2.div, {
    animate: {
      width: width2 * scale2 / devicePixelRatio,
      height: height2 * scale2
    },
    css: css2`
              display: block;
              overflow: hidden;
              border-radius: 8px;
              opacity: 0.9;
           `
  }, errorText.trim() !== "" && /* @__PURE__ */ jsx("pre", {
    css: css2`
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
    css: css2`
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
    css: css2`
                  overflow:overlay;
                  >div{
                    width:100%;
                    height:100%;
                    overflow: overlay;
                    background: white;
                  }
              `
  }, errorText ? /* @__PURE__ */ jsx("div", {
    dangerouslySetInnerHTML: createMarkup(session.html)
  }) : /* @__PURE__ */ jsx(React26.Suspense, {
    fallback: /* @__PURE__ */ jsx("div", null, "Error fallback")
  }, /* @__PURE__ */ jsx("div", {
    id: "zbody",
    key: session.i,
    ref: zbody
  }, child)))), /* @__PURE__ */ jsx(ToggleButtonGroup_default, {
    value: width2,
    size: "small",
    exclusive: true,
    onChange: (_e, newSize) => newSize && setWidth(newSize)
  }, breakPoints.map((size) => /* @__PURE__ */ jsx(ToggleButton_default, {
    key: size,
    value: size
  }, size === 640 ? /* @__PURE__ */ jsx(PhoneAndroid_default, {
    css: css2`
                        color: ${width2 === 640 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `
  }) : size === 1024 ? /* @__PURE__ */ jsx(TabletAndroid_default, {
    css: css2`
                        color: ${width2 === 1024 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `
  }) : /* @__PURE__ */ jsx(Tv_default, {
    css: css2`
                        color: ${width2 === 1920 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                      `
  }))))), /* @__PURE__ */ jsx("div", {
    css: css2`
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
function createMarkup(__html) {
  return { __html };
}

// src/renderer.ts
var { motion: motion2 } = es_exports;
var render2 = (el, container) => {
  const root = render(jsx(Fragment3, { children: el }), container);
};
var renderer_default = React26;
export {
  DraggableWindow,
  Fragment3 as Fragment,
  Global,
  es_exports as Motion,
  React26 as React,
  css2 as css,
  renderer_default as default,
  jsx,
  motion2 as motion,
  render2 as render
};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/** @license Material-UI v5.0.0-alpha.40
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license Material-UI v5.0.0-beta.1
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
    isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
    mod2
  ));

  // <define:process>
  var init_define_process = __esm({
    "<define:process>"() {
    }
  });

  // ../../node_modules/lodash/lodash.js
  var require_lodash = __commonJS({
    "../../node_modules/lodash/lodash.js"(exports, module) {
      init_define_process();
      (function() {
        var undefined;
        var VERSION = "4.17.21";
        var LARGE_ARRAY_SIZE = 200;
        var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
        var HASH_UNDEFINED = "__lodash_hash_undefined__";
        var MAX_MEMOIZE_SIZE = 500;
        var PLACEHOLDER = "__lodash_placeholder__";
        var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
        var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
        var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
        var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
        var HOT_COUNT = 800, HOT_SPAN = 16;
        var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
        var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
        var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
        var wrapFlags = [
          ["ary", WRAP_ARY_FLAG],
          ["bind", WRAP_BIND_FLAG],
          ["bindKey", WRAP_BIND_KEY_FLAG],
          ["curry", WRAP_CURRY_FLAG],
          ["curryRight", WRAP_CURRY_RIGHT_FLAG],
          ["flip", WRAP_FLIP_FLAG],
          ["partial", WRAP_PARTIAL_FLAG],
          ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
          ["rearg", WRAP_REARG_FLAG]
        ];
        var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
        var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
        var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
        var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
        var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
        var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
        var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
        var reTrimStart = /^\s+/;
        var reWhitespace = /\s/;
        var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
        var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
        var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
        var reEscapeChar = /\\(\\)?/g;
        var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
        var reFlags = /\w*$/;
        var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
        var reIsBinary = /^0b[01]+$/i;
        var reIsHostCtor = /^\[object .+?Constructor\]$/;
        var reIsOctal = /^0o[0-7]+$/i;
        var reIsUint = /^(?:0|[1-9]\d*)$/;
        var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
        var reNoMatch = /($^)/;
        var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
        var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
        var rsApos = "['\u2019]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
        var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
        var reApos = RegExp(rsApos, "g");
        var reComboMark = RegExp(rsCombo, "g");
        var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
        var reUnicodeWord = RegExp([
          rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
          rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
          rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
          rsUpper + "+" + rsOptContrUpper,
          rsOrdUpper,
          rsOrdLower,
          rsDigits,
          rsEmoji
        ].join("|"), "g");
        var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
        var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
        var contextProps = [
          "Array",
          "Buffer",
          "DataView",
          "Date",
          "Error",
          "Float32Array",
          "Float64Array",
          "Function",
          "Int8Array",
          "Int16Array",
          "Int32Array",
          "Map",
          "Math",
          "Object",
          "Promise",
          "RegExp",
          "Set",
          "String",
          "Symbol",
          "TypeError",
          "Uint8Array",
          "Uint8ClampedArray",
          "Uint16Array",
          "Uint32Array",
          "WeakMap",
          "_",
          "clearTimeout",
          "isFinite",
          "parseInt",
          "setTimeout"
        ];
        var templateCounter = -1;
        var typedArrayTags = {};
        typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
        typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
        var cloneableTags = {};
        cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
        cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
        var deburredLetters = {
          "\xC0": "A",
          "\xC1": "A",
          "\xC2": "A",
          "\xC3": "A",
          "\xC4": "A",
          "\xC5": "A",
          "\xE0": "a",
          "\xE1": "a",
          "\xE2": "a",
          "\xE3": "a",
          "\xE4": "a",
          "\xE5": "a",
          "\xC7": "C",
          "\xE7": "c",
          "\xD0": "D",
          "\xF0": "d",
          "\xC8": "E",
          "\xC9": "E",
          "\xCA": "E",
          "\xCB": "E",
          "\xE8": "e",
          "\xE9": "e",
          "\xEA": "e",
          "\xEB": "e",
          "\xCC": "I",
          "\xCD": "I",
          "\xCE": "I",
          "\xCF": "I",
          "\xEC": "i",
          "\xED": "i",
          "\xEE": "i",
          "\xEF": "i",
          "\xD1": "N",
          "\xF1": "n",
          "\xD2": "O",
          "\xD3": "O",
          "\xD4": "O",
          "\xD5": "O",
          "\xD6": "O",
          "\xD8": "O",
          "\xF2": "o",
          "\xF3": "o",
          "\xF4": "o",
          "\xF5": "o",
          "\xF6": "o",
          "\xF8": "o",
          "\xD9": "U",
          "\xDA": "U",
          "\xDB": "U",
          "\xDC": "U",
          "\xF9": "u",
          "\xFA": "u",
          "\xFB": "u",
          "\xFC": "u",
          "\xDD": "Y",
          "\xFD": "y",
          "\xFF": "y",
          "\xC6": "Ae",
          "\xE6": "ae",
          "\xDE": "Th",
          "\xFE": "th",
          "\xDF": "ss",
          "\u0100": "A",
          "\u0102": "A",
          "\u0104": "A",
          "\u0101": "a",
          "\u0103": "a",
          "\u0105": "a",
          "\u0106": "C",
          "\u0108": "C",
          "\u010A": "C",
          "\u010C": "C",
          "\u0107": "c",
          "\u0109": "c",
          "\u010B": "c",
          "\u010D": "c",
          "\u010E": "D",
          "\u0110": "D",
          "\u010F": "d",
          "\u0111": "d",
          "\u0112": "E",
          "\u0114": "E",
          "\u0116": "E",
          "\u0118": "E",
          "\u011A": "E",
          "\u0113": "e",
          "\u0115": "e",
          "\u0117": "e",
          "\u0119": "e",
          "\u011B": "e",
          "\u011C": "G",
          "\u011E": "G",
          "\u0120": "G",
          "\u0122": "G",
          "\u011D": "g",
          "\u011F": "g",
          "\u0121": "g",
          "\u0123": "g",
          "\u0124": "H",
          "\u0126": "H",
          "\u0125": "h",
          "\u0127": "h",
          "\u0128": "I",
          "\u012A": "I",
          "\u012C": "I",
          "\u012E": "I",
          "\u0130": "I",
          "\u0129": "i",
          "\u012B": "i",
          "\u012D": "i",
          "\u012F": "i",
          "\u0131": "i",
          "\u0134": "J",
          "\u0135": "j",
          "\u0136": "K",
          "\u0137": "k",
          "\u0138": "k",
          "\u0139": "L",
          "\u013B": "L",
          "\u013D": "L",
          "\u013F": "L",
          "\u0141": "L",
          "\u013A": "l",
          "\u013C": "l",
          "\u013E": "l",
          "\u0140": "l",
          "\u0142": "l",
          "\u0143": "N",
          "\u0145": "N",
          "\u0147": "N",
          "\u014A": "N",
          "\u0144": "n",
          "\u0146": "n",
          "\u0148": "n",
          "\u014B": "n",
          "\u014C": "O",
          "\u014E": "O",
          "\u0150": "O",
          "\u014D": "o",
          "\u014F": "o",
          "\u0151": "o",
          "\u0154": "R",
          "\u0156": "R",
          "\u0158": "R",
          "\u0155": "r",
          "\u0157": "r",
          "\u0159": "r",
          "\u015A": "S",
          "\u015C": "S",
          "\u015E": "S",
          "\u0160": "S",
          "\u015B": "s",
          "\u015D": "s",
          "\u015F": "s",
          "\u0161": "s",
          "\u0162": "T",
          "\u0164": "T",
          "\u0166": "T",
          "\u0163": "t",
          "\u0165": "t",
          "\u0167": "t",
          "\u0168": "U",
          "\u016A": "U",
          "\u016C": "U",
          "\u016E": "U",
          "\u0170": "U",
          "\u0172": "U",
          "\u0169": "u",
          "\u016B": "u",
          "\u016D": "u",
          "\u016F": "u",
          "\u0171": "u",
          "\u0173": "u",
          "\u0174": "W",
          "\u0175": "w",
          "\u0176": "Y",
          "\u0177": "y",
          "\u0178": "Y",
          "\u0179": "Z",
          "\u017B": "Z",
          "\u017D": "Z",
          "\u017A": "z",
          "\u017C": "z",
          "\u017E": "z",
          "\u0132": "IJ",
          "\u0133": "ij",
          "\u0152": "Oe",
          "\u0153": "oe",
          "\u0149": "'n",
          "\u017F": "s"
        };
        var htmlEscapes = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        };
        var htmlUnescapes = {
          "&amp;": "&",
          "&lt;": "<",
          "&gt;": ">",
          "&quot;": '"',
          "&#39;": "'"
        };
        var stringEscapes = {
          "\\": "\\",
          "'": "'",
          "\n": "n",
          "\r": "r",
          "\u2028": "u2028",
          "\u2029": "u2029"
        };
        var freeParseFloat = parseFloat, freeParseInt = parseInt;
        var freeGlobal = typeof globalThis == "object" && globalThis && globalThis.Object === Object && globalThis;
        var freeSelf = typeof self == "object" && self && self.Object === Object && self;
        var root = freeGlobal || freeSelf || Function("return this")();
        var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
        var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
        var moduleExports = freeModule && freeModule.exports === freeExports;
        var freeProcess = moduleExports && freeGlobal.process;
        var nodeUtil = function() {
          try {
            var types = freeModule && freeModule.require && freeModule.require("util").types;
            if (types) {
              return types;
            }
            return freeProcess && freeProcess.binding && freeProcess.binding("util");
          } catch (e) {
          }
        }();
        var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
        function apply(func, thisArg, args) {
          switch (args.length) {
            case 0:
              return func.call(thisArg);
            case 1:
              return func.call(thisArg, args[0]);
            case 2:
              return func.call(thisArg, args[0], args[1]);
            case 3:
              return func.call(thisArg, args[0], args[1], args[2]);
          }
          return func.apply(thisArg, args);
        }
        __name(apply, "apply");
        function arrayAggregator(array, setter, iteratee, accumulator) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            var value = array[index];
            setter(accumulator, value, iteratee(value), array);
          }
          return accumulator;
        }
        __name(arrayAggregator, "arrayAggregator");
        function arrayEach(array, iteratee) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (iteratee(array[index], index, array) === false) {
              break;
            }
          }
          return array;
        }
        __name(arrayEach, "arrayEach");
        function arrayEachRight(array, iteratee) {
          var length = array == null ? 0 : array.length;
          while (length--) {
            if (iteratee(array[length], length, array) === false) {
              break;
            }
          }
          return array;
        }
        __name(arrayEachRight, "arrayEachRight");
        function arrayEvery(array, predicate) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (!predicate(array[index], index, array)) {
              return false;
            }
          }
          return true;
        }
        __name(arrayEvery, "arrayEvery");
        function arrayFilter(array, predicate) {
          var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result[resIndex++] = value;
            }
          }
          return result;
        }
        __name(arrayFilter, "arrayFilter");
        function arrayIncludes(array, value) {
          var length = array == null ? 0 : array.length;
          return !!length && baseIndexOf(array, value, 0) > -1;
        }
        __name(arrayIncludes, "arrayIncludes");
        function arrayIncludesWith(array, value, comparator) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (comparator(value, array[index])) {
              return true;
            }
          }
          return false;
        }
        __name(arrayIncludesWith, "arrayIncludesWith");
        function arrayMap(array, iteratee) {
          var index = -1, length = array == null ? 0 : array.length, result = Array(length);
          while (++index < length) {
            result[index] = iteratee(array[index], index, array);
          }
          return result;
        }
        __name(arrayMap, "arrayMap");
        function arrayPush(array, values) {
          var index = -1, length = values.length, offset = array.length;
          while (++index < length) {
            array[offset + index] = values[index];
          }
          return array;
        }
        __name(arrayPush, "arrayPush");
        function arrayReduce(array, iteratee, accumulator, initAccum) {
          var index = -1, length = array == null ? 0 : array.length;
          if (initAccum && length) {
            accumulator = array[++index];
          }
          while (++index < length) {
            accumulator = iteratee(accumulator, array[index], index, array);
          }
          return accumulator;
        }
        __name(arrayReduce, "arrayReduce");
        function arrayReduceRight(array, iteratee, accumulator, initAccum) {
          var length = array == null ? 0 : array.length;
          if (initAccum && length) {
            accumulator = array[--length];
          }
          while (length--) {
            accumulator = iteratee(accumulator, array[length], length, array);
          }
          return accumulator;
        }
        __name(arrayReduceRight, "arrayReduceRight");
        function arraySome(array, predicate) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (predicate(array[index], index, array)) {
              return true;
            }
          }
          return false;
        }
        __name(arraySome, "arraySome");
        var asciiSize = baseProperty("length");
        function asciiToArray(string) {
          return string.split("");
        }
        __name(asciiToArray, "asciiToArray");
        function asciiWords(string) {
          return string.match(reAsciiWord) || [];
        }
        __name(asciiWords, "asciiWords");
        function baseFindKey(collection, predicate, eachFunc) {
          var result;
          eachFunc(collection, function(value, key, collection2) {
            if (predicate(value, key, collection2)) {
              result = key;
              return false;
            }
          });
          return result;
        }
        __name(baseFindKey, "baseFindKey");
        function baseFindIndex(array, predicate, fromIndex, fromRight) {
          var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
          while (fromRight ? index-- : ++index < length) {
            if (predicate(array[index], index, array)) {
              return index;
            }
          }
          return -1;
        }
        __name(baseFindIndex, "baseFindIndex");
        function baseIndexOf(array, value, fromIndex) {
          return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
        }
        __name(baseIndexOf, "baseIndexOf");
        function baseIndexOfWith(array, value, fromIndex, comparator) {
          var index = fromIndex - 1, length = array.length;
          while (++index < length) {
            if (comparator(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        __name(baseIndexOfWith, "baseIndexOfWith");
        function baseIsNaN(value) {
          return value !== value;
        }
        __name(baseIsNaN, "baseIsNaN");
        function baseMean(array, iteratee) {
          var length = array == null ? 0 : array.length;
          return length ? baseSum(array, iteratee) / length : NAN;
        }
        __name(baseMean, "baseMean");
        function baseProperty(key) {
          return function(object) {
            return object == null ? undefined : object[key];
          };
        }
        __name(baseProperty, "baseProperty");
        function basePropertyOf(object) {
          return function(key) {
            return object == null ? undefined : object[key];
          };
        }
        __name(basePropertyOf, "basePropertyOf");
        function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
          eachFunc(collection, function(value, index, collection2) {
            accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
          });
          return accumulator;
        }
        __name(baseReduce, "baseReduce");
        function baseSortBy(array, comparer) {
          var length = array.length;
          array.sort(comparer);
          while (length--) {
            array[length] = array[length].value;
          }
          return array;
        }
        __name(baseSortBy, "baseSortBy");
        function baseSum(array, iteratee) {
          var result, index = -1, length = array.length;
          while (++index < length) {
            var current = iteratee(array[index]);
            if (current !== undefined) {
              result = result === undefined ? current : result + current;
            }
          }
          return result;
        }
        __name(baseSum, "baseSum");
        function baseTimes(n, iteratee) {
          var index = -1, result = Array(n);
          while (++index < n) {
            result[index] = iteratee(index);
          }
          return result;
        }
        __name(baseTimes, "baseTimes");
        function baseToPairs(object, props) {
          return arrayMap(props, function(key) {
            return [key, object[key]];
          });
        }
        __name(baseToPairs, "baseToPairs");
        function baseTrim(string) {
          return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
        }
        __name(baseTrim, "baseTrim");
        function baseUnary(func) {
          return function(value) {
            return func(value);
          };
        }
        __name(baseUnary, "baseUnary");
        function baseValues(object, props) {
          return arrayMap(props, function(key) {
            return object[key];
          });
        }
        __name(baseValues, "baseValues");
        function cacheHas(cache, key) {
          return cache.has(key);
        }
        __name(cacheHas, "cacheHas");
        function charsStartIndex(strSymbols, chrSymbols) {
          var index = -1, length = strSymbols.length;
          while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
          }
          return index;
        }
        __name(charsStartIndex, "charsStartIndex");
        function charsEndIndex(strSymbols, chrSymbols) {
          var index = strSymbols.length;
          while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
          }
          return index;
        }
        __name(charsEndIndex, "charsEndIndex");
        function countHolders(array, placeholder) {
          var length = array.length, result = 0;
          while (length--) {
            if (array[length] === placeholder) {
              ++result;
            }
          }
          return result;
        }
        __name(countHolders, "countHolders");
        var deburrLetter = basePropertyOf(deburredLetters);
        var escapeHtmlChar = basePropertyOf(htmlEscapes);
        function escapeStringChar(chr) {
          return "\\" + stringEscapes[chr];
        }
        __name(escapeStringChar, "escapeStringChar");
        function getValue(object, key) {
          return object == null ? undefined : object[key];
        }
        __name(getValue, "getValue");
        function hasUnicode(string) {
          return reHasUnicode.test(string);
        }
        __name(hasUnicode, "hasUnicode");
        function hasUnicodeWord(string) {
          return reHasUnicodeWord.test(string);
        }
        __name(hasUnicodeWord, "hasUnicodeWord");
        function iteratorToArray(iterator) {
          var data, result = [];
          while (!(data = iterator.next()).done) {
            result.push(data.value);
          }
          return result;
        }
        __name(iteratorToArray, "iteratorToArray");
        function mapToArray(map) {
          var index = -1, result = Array(map.size);
          map.forEach(function(value, key) {
            result[++index] = [key, value];
          });
          return result;
        }
        __name(mapToArray, "mapToArray");
        function overArg(func, transform2) {
          return function(arg) {
            return func(transform2(arg));
          };
        }
        __name(overArg, "overArg");
        function replaceHolders(array, placeholder) {
          var index = -1, length = array.length, resIndex = 0, result = [];
          while (++index < length) {
            var value = array[index];
            if (value === placeholder || value === PLACEHOLDER) {
              array[index] = PLACEHOLDER;
              result[resIndex++] = index;
            }
          }
          return result;
        }
        __name(replaceHolders, "replaceHolders");
        function setToArray(set) {
          var index = -1, result = Array(set.size);
          set.forEach(function(value) {
            result[++index] = value;
          });
          return result;
        }
        __name(setToArray, "setToArray");
        function setToPairs(set) {
          var index = -1, result = Array(set.size);
          set.forEach(function(value) {
            result[++index] = [value, value];
          });
          return result;
        }
        __name(setToPairs, "setToPairs");
        function strictIndexOf(array, value, fromIndex) {
          var index = fromIndex - 1, length = array.length;
          while (++index < length) {
            if (array[index] === value) {
              return index;
            }
          }
          return -1;
        }
        __name(strictIndexOf, "strictIndexOf");
        function strictLastIndexOf(array, value, fromIndex) {
          var index = fromIndex + 1;
          while (index--) {
            if (array[index] === value) {
              return index;
            }
          }
          return index;
        }
        __name(strictLastIndexOf, "strictLastIndexOf");
        function stringSize(string) {
          return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
        }
        __name(stringSize, "stringSize");
        function stringToArray(string) {
          return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
        }
        __name(stringToArray, "stringToArray");
        function trimmedEndIndex(string) {
          var index = string.length;
          while (index-- && reWhitespace.test(string.charAt(index))) {
          }
          return index;
        }
        __name(trimmedEndIndex, "trimmedEndIndex");
        var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
        function unicodeSize(string) {
          var result = reUnicode.lastIndex = 0;
          while (reUnicode.test(string)) {
            ++result;
          }
          return result;
        }
        __name(unicodeSize, "unicodeSize");
        function unicodeToArray(string) {
          return string.match(reUnicode) || [];
        }
        __name(unicodeToArray, "unicodeToArray");
        function unicodeWords(string) {
          return string.match(reUnicodeWord) || [];
        }
        __name(unicodeWords, "unicodeWords");
        var runInContext = /* @__PURE__ */ __name(function runInContext2(context) {
          context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
          var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
          var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
          var coreJsData = context["__core-js_shared__"];
          var funcToString = funcProto.toString;
          var hasOwnProperty = objectProto.hasOwnProperty;
          var idCounter = 0;
          var maskSrcKey = function() {
            var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
            return uid ? "Symbol(src)_1." + uid : "";
          }();
          var nativeObjectToString = objectProto.toString;
          var objectCtorString = funcToString.call(Object2);
          var oldDash = root._;
          var reIsNative = RegExp2(
            "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
          );
          var Buffer2 = moduleExports ? context.Buffer : undefined, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : undefined, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined, symIterator = Symbol2 ? Symbol2.iterator : undefined, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined;
          var defineProperty = function() {
            try {
              var func = getNative(Object2, "defineProperty");
              func({}, "", {});
              return func;
            } catch (e) {
            }
          }();
          var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
          var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
          var DataView2 = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set = getNative(context, "Set"), WeakMap = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
          var metaMap = WeakMap && new WeakMap();
          var realNames = {};
          var dataViewCtorString = toSource(DataView2), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap);
          var symbolProto = Symbol2 ? Symbol2.prototype : undefined, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined, symbolToString = symbolProto ? symbolProto.toString : undefined;
          function lodash(value) {
            if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
              if (value instanceof LodashWrapper) {
                return value;
              }
              if (hasOwnProperty.call(value, "__wrapped__")) {
                return wrapperClone(value);
              }
            }
            return new LodashWrapper(value);
          }
          __name(lodash, "lodash");
          var baseCreate = function() {
            function object() {
            }
            __name(object, "object");
            return function(proto) {
              if (!isObject(proto)) {
                return {};
              }
              if (objectCreate) {
                return objectCreate(proto);
              }
              object.prototype = proto;
              var result2 = new object();
              object.prototype = undefined;
              return result2;
            };
          }();
          function baseLodash() {
          }
          __name(baseLodash, "baseLodash");
          function LodashWrapper(value, chainAll) {
            this.__wrapped__ = value;
            this.__actions__ = [];
            this.__chain__ = !!chainAll;
            this.__index__ = 0;
            this.__values__ = undefined;
          }
          __name(LodashWrapper, "LodashWrapper");
          lodash.templateSettings = {
            "escape": reEscape,
            "evaluate": reEvaluate,
            "interpolate": reInterpolate,
            "variable": "",
            "imports": {
              "_": lodash
            }
          };
          lodash.prototype = baseLodash.prototype;
          lodash.prototype.constructor = lodash;
          LodashWrapper.prototype = baseCreate(baseLodash.prototype);
          LodashWrapper.prototype.constructor = LodashWrapper;
          function LazyWrapper(value) {
            this.__wrapped__ = value;
            this.__actions__ = [];
            this.__dir__ = 1;
            this.__filtered__ = false;
            this.__iteratees__ = [];
            this.__takeCount__ = MAX_ARRAY_LENGTH;
            this.__views__ = [];
          }
          __name(LazyWrapper, "LazyWrapper");
          function lazyClone() {
            var result2 = new LazyWrapper(this.__wrapped__);
            result2.__actions__ = copyArray(this.__actions__);
            result2.__dir__ = this.__dir__;
            result2.__filtered__ = this.__filtered__;
            result2.__iteratees__ = copyArray(this.__iteratees__);
            result2.__takeCount__ = this.__takeCount__;
            result2.__views__ = copyArray(this.__views__);
            return result2;
          }
          __name(lazyClone, "lazyClone");
          function lazyReverse() {
            if (this.__filtered__) {
              var result2 = new LazyWrapper(this);
              result2.__dir__ = -1;
              result2.__filtered__ = true;
            } else {
              result2 = this.clone();
              result2.__dir__ *= -1;
            }
            return result2;
          }
          __name(lazyReverse, "lazyReverse");
          function lazyValue() {
            var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
            if (!isArr || !isRight && arrLength == length && takeCount == length) {
              return baseWrapperValue(array, this.__actions__);
            }
            var result2 = [];
            outer:
              while (length-- && resIndex < takeCount) {
                index += dir;
                var iterIndex = -1, value = array[index];
                while (++iterIndex < iterLength) {
                  var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
                  if (type == LAZY_MAP_FLAG) {
                    value = computed;
                  } else if (!computed) {
                    if (type == LAZY_FILTER_FLAG) {
                      continue outer;
                    } else {
                      break outer;
                    }
                  }
                }
                result2[resIndex++] = value;
              }
            return result2;
          }
          __name(lazyValue, "lazyValue");
          LazyWrapper.prototype = baseCreate(baseLodash.prototype);
          LazyWrapper.prototype.constructor = LazyWrapper;
          function Hash(entries) {
            var index = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          __name(Hash, "Hash");
          function hashClear() {
            this.__data__ = nativeCreate ? nativeCreate(null) : {};
            this.size = 0;
          }
          __name(hashClear, "hashClear");
          function hashDelete(key) {
            var result2 = this.has(key) && delete this.__data__[key];
            this.size -= result2 ? 1 : 0;
            return result2;
          }
          __name(hashDelete, "hashDelete");
          function hashGet(key) {
            var data = this.__data__;
            if (nativeCreate) {
              var result2 = data[key];
              return result2 === HASH_UNDEFINED ? undefined : result2;
            }
            return hasOwnProperty.call(data, key) ? data[key] : undefined;
          }
          __name(hashGet, "hashGet");
          function hashHas(key) {
            var data = this.__data__;
            return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
          }
          __name(hashHas, "hashHas");
          function hashSet(key, value) {
            var data = this.__data__;
            this.size += this.has(key) ? 0 : 1;
            data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
            return this;
          }
          __name(hashSet, "hashSet");
          Hash.prototype.clear = hashClear;
          Hash.prototype["delete"] = hashDelete;
          Hash.prototype.get = hashGet;
          Hash.prototype.has = hashHas;
          Hash.prototype.set = hashSet;
          function ListCache(entries) {
            var index = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          __name(ListCache, "ListCache");
          function listCacheClear() {
            this.__data__ = [];
            this.size = 0;
          }
          __name(listCacheClear, "listCacheClear");
          function listCacheDelete(key) {
            var data = this.__data__, index = assocIndexOf(data, key);
            if (index < 0) {
              return false;
            }
            var lastIndex = data.length - 1;
            if (index == lastIndex) {
              data.pop();
            } else {
              splice.call(data, index, 1);
            }
            --this.size;
            return true;
          }
          __name(listCacheDelete, "listCacheDelete");
          function listCacheGet(key) {
            var data = this.__data__, index = assocIndexOf(data, key);
            return index < 0 ? undefined : data[index][1];
          }
          __name(listCacheGet, "listCacheGet");
          function listCacheHas(key) {
            return assocIndexOf(this.__data__, key) > -1;
          }
          __name(listCacheHas, "listCacheHas");
          function listCacheSet(key, value) {
            var data = this.__data__, index = assocIndexOf(data, key);
            if (index < 0) {
              ++this.size;
              data.push([key, value]);
            } else {
              data[index][1] = value;
            }
            return this;
          }
          __name(listCacheSet, "listCacheSet");
          ListCache.prototype.clear = listCacheClear;
          ListCache.prototype["delete"] = listCacheDelete;
          ListCache.prototype.get = listCacheGet;
          ListCache.prototype.has = listCacheHas;
          ListCache.prototype.set = listCacheSet;
          function MapCache(entries) {
            var index = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          __name(MapCache, "MapCache");
          function mapCacheClear() {
            this.size = 0;
            this.__data__ = {
              "hash": new Hash(),
              "map": new (Map2 || ListCache)(),
              "string": new Hash()
            };
          }
          __name(mapCacheClear, "mapCacheClear");
          function mapCacheDelete(key) {
            var result2 = getMapData(this, key)["delete"](key);
            this.size -= result2 ? 1 : 0;
            return result2;
          }
          __name(mapCacheDelete, "mapCacheDelete");
          function mapCacheGet(key) {
            return getMapData(this, key).get(key);
          }
          __name(mapCacheGet, "mapCacheGet");
          function mapCacheHas(key) {
            return getMapData(this, key).has(key);
          }
          __name(mapCacheHas, "mapCacheHas");
          function mapCacheSet(key, value) {
            var data = getMapData(this, key), size2 = data.size;
            data.set(key, value);
            this.size += data.size == size2 ? 0 : 1;
            return this;
          }
          __name(mapCacheSet, "mapCacheSet");
          MapCache.prototype.clear = mapCacheClear;
          MapCache.prototype["delete"] = mapCacheDelete;
          MapCache.prototype.get = mapCacheGet;
          MapCache.prototype.has = mapCacheHas;
          MapCache.prototype.set = mapCacheSet;
          function SetCache(values2) {
            var index = -1, length = values2 == null ? 0 : values2.length;
            this.__data__ = new MapCache();
            while (++index < length) {
              this.add(values2[index]);
            }
          }
          __name(SetCache, "SetCache");
          function setCacheAdd(value) {
            this.__data__.set(value, HASH_UNDEFINED);
            return this;
          }
          __name(setCacheAdd, "setCacheAdd");
          function setCacheHas(value) {
            return this.__data__.has(value);
          }
          __name(setCacheHas, "setCacheHas");
          SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
          SetCache.prototype.has = setCacheHas;
          function Stack(entries) {
            var data = this.__data__ = new ListCache(entries);
            this.size = data.size;
          }
          __name(Stack, "Stack");
          function stackClear() {
            this.__data__ = new ListCache();
            this.size = 0;
          }
          __name(stackClear, "stackClear");
          function stackDelete(key) {
            var data = this.__data__, result2 = data["delete"](key);
            this.size = data.size;
            return result2;
          }
          __name(stackDelete, "stackDelete");
          function stackGet(key) {
            return this.__data__.get(key);
          }
          __name(stackGet, "stackGet");
          function stackHas(key) {
            return this.__data__.has(key);
          }
          __name(stackHas, "stackHas");
          function stackSet(key, value) {
            var data = this.__data__;
            if (data instanceof ListCache) {
              var pairs = data.__data__;
              if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
                pairs.push([key, value]);
                this.size = ++data.size;
                return this;
              }
              data = this.__data__ = new MapCache(pairs);
            }
            data.set(key, value);
            this.size = data.size;
            return this;
          }
          __name(stackSet, "stackSet");
          Stack.prototype.clear = stackClear;
          Stack.prototype["delete"] = stackDelete;
          Stack.prototype.get = stackGet;
          Stack.prototype.has = stackHas;
          Stack.prototype.set = stackSet;
          function arrayLikeKeys(value, inherited) {
            var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
            for (var key in value) {
              if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
                result2.push(key);
              }
            }
            return result2;
          }
          __name(arrayLikeKeys, "arrayLikeKeys");
          function arraySample(array) {
            var length = array.length;
            return length ? array[baseRandom(0, length - 1)] : undefined;
          }
          __name(arraySample, "arraySample");
          function arraySampleSize(array, n) {
            return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
          }
          __name(arraySampleSize, "arraySampleSize");
          function arrayShuffle(array) {
            return shuffleSelf(copyArray(array));
          }
          __name(arrayShuffle, "arrayShuffle");
          function assignMergeValue(object, key, value) {
            if (value !== undefined && !eq(object[key], value) || value === undefined && !(key in object)) {
              baseAssignValue(object, key, value);
            }
          }
          __name(assignMergeValue, "assignMergeValue");
          function assignValue(object, key, value) {
            var objValue = object[key];
            if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
              baseAssignValue(object, key, value);
            }
          }
          __name(assignValue, "assignValue");
          function assocIndexOf(array, key) {
            var length = array.length;
            while (length--) {
              if (eq(array[length][0], key)) {
                return length;
              }
            }
            return -1;
          }
          __name(assocIndexOf, "assocIndexOf");
          function baseAggregator(collection, setter, iteratee2, accumulator) {
            baseEach(collection, function(value, key, collection2) {
              setter(accumulator, value, iteratee2(value), collection2);
            });
            return accumulator;
          }
          __name(baseAggregator, "baseAggregator");
          function baseAssign(object, source) {
            return object && copyObject(source, keys(source), object);
          }
          __name(baseAssign, "baseAssign");
          function baseAssignIn(object, source) {
            return object && copyObject(source, keysIn(source), object);
          }
          __name(baseAssignIn, "baseAssignIn");
          function baseAssignValue(object, key, value) {
            if (key == "__proto__" && defineProperty) {
              defineProperty(object, key, {
                "configurable": true,
                "enumerable": true,
                "value": value,
                "writable": true
              });
            } else {
              object[key] = value;
            }
          }
          __name(baseAssignValue, "baseAssignValue");
          function baseAt(object, paths) {
            var index = -1, length = paths.length, result2 = Array2(length), skip = object == null;
            while (++index < length) {
              result2[index] = skip ? undefined : get(object, paths[index]);
            }
            return result2;
          }
          __name(baseAt, "baseAt");
          function baseClamp(number, lower, upper) {
            if (number === number) {
              if (upper !== undefined) {
                number = number <= upper ? number : upper;
              }
              if (lower !== undefined) {
                number = number >= lower ? number : lower;
              }
            }
            return number;
          }
          __name(baseClamp, "baseClamp");
          function baseClone(value, bitmask, customizer, key, object, stack) {
            var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
            if (customizer) {
              result2 = object ? customizer(value, key, object, stack) : customizer(value);
            }
            if (result2 !== undefined) {
              return result2;
            }
            if (!isObject(value)) {
              return value;
            }
            var isArr = isArray(value);
            if (isArr) {
              result2 = initCloneArray(value);
              if (!isDeep) {
                return copyArray(value, result2);
              }
            } else {
              var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
              if (isBuffer(value)) {
                return cloneBuffer(value, isDeep);
              }
              if (tag == objectTag || tag == argsTag || isFunc && !object) {
                result2 = isFlat || isFunc ? {} : initCloneObject(value);
                if (!isDeep) {
                  return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
                }
              } else {
                if (!cloneableTags[tag]) {
                  return object ? value : {};
                }
                result2 = initCloneByTag(value, tag, isDeep);
              }
            }
            stack || (stack = new Stack());
            var stacked = stack.get(value);
            if (stacked) {
              return stacked;
            }
            stack.set(value, result2);
            if (isSet(value)) {
              value.forEach(function(subValue) {
                result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
              });
            } else if (isMap(value)) {
              value.forEach(function(subValue, key2) {
                result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
              });
            }
            var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
            var props = isArr ? undefined : keysFunc(value);
            arrayEach(props || value, function(subValue, key2) {
              if (props) {
                key2 = subValue;
                subValue = value[key2];
              }
              assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
            });
            return result2;
          }
          __name(baseClone, "baseClone");
          function baseConforms(source) {
            var props = keys(source);
            return function(object) {
              return baseConformsTo(object, source, props);
            };
          }
          __name(baseConforms, "baseConforms");
          function baseConformsTo(object, source, props) {
            var length = props.length;
            if (object == null) {
              return !length;
            }
            object = Object2(object);
            while (length--) {
              var key = props[length], predicate = source[key], value = object[key];
              if (value === undefined && !(key in object) || !predicate(value)) {
                return false;
              }
            }
            return true;
          }
          __name(baseConformsTo, "baseConformsTo");
          function baseDelay(func, wait, args) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return setTimeout2(function() {
              func.apply(undefined, args);
            }, wait);
          }
          __name(baseDelay, "baseDelay");
          function baseDifference(array, values2, iteratee2, comparator) {
            var index = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
            if (!length) {
              return result2;
            }
            if (iteratee2) {
              values2 = arrayMap(values2, baseUnary(iteratee2));
            }
            if (comparator) {
              includes2 = arrayIncludesWith;
              isCommon = false;
            } else if (values2.length >= LARGE_ARRAY_SIZE) {
              includes2 = cacheHas;
              isCommon = false;
              values2 = new SetCache(values2);
            }
            outer:
              while (++index < length) {
                var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
                value = comparator || value !== 0 ? value : 0;
                if (isCommon && computed === computed) {
                  var valuesIndex = valuesLength;
                  while (valuesIndex--) {
                    if (values2[valuesIndex] === computed) {
                      continue outer;
                    }
                  }
                  result2.push(value);
                } else if (!includes2(values2, computed, comparator)) {
                  result2.push(value);
                }
              }
            return result2;
          }
          __name(baseDifference, "baseDifference");
          var baseEach = createBaseEach(baseForOwn);
          var baseEachRight = createBaseEach(baseForOwnRight, true);
          function baseEvery(collection, predicate) {
            var result2 = true;
            baseEach(collection, function(value, index, collection2) {
              result2 = !!predicate(value, index, collection2);
              return result2;
            });
            return result2;
          }
          __name(baseEvery, "baseEvery");
          function baseExtremum(array, iteratee2, comparator) {
            var index = -1, length = array.length;
            while (++index < length) {
              var value = array[index], current = iteratee2(value);
              if (current != null && (computed === undefined ? current === current && !isSymbol(current) : comparator(current, computed))) {
                var computed = current, result2 = value;
              }
            }
            return result2;
          }
          __name(baseExtremum, "baseExtremum");
          function baseFill(array, value, start, end) {
            var length = array.length;
            start = toInteger(start);
            if (start < 0) {
              start = -start > length ? 0 : length + start;
            }
            end = end === undefined || end > length ? length : toInteger(end);
            if (end < 0) {
              end += length;
            }
            end = start > end ? 0 : toLength(end);
            while (start < end) {
              array[start++] = value;
            }
            return array;
          }
          __name(baseFill, "baseFill");
          function baseFilter(collection, predicate) {
            var result2 = [];
            baseEach(collection, function(value, index, collection2) {
              if (predicate(value, index, collection2)) {
                result2.push(value);
              }
            });
            return result2;
          }
          __name(baseFilter, "baseFilter");
          function baseFlatten(array, depth, predicate, isStrict, result2) {
            var index = -1, length = array.length;
            predicate || (predicate = isFlattenable);
            result2 || (result2 = []);
            while (++index < length) {
              var value = array[index];
              if (depth > 0 && predicate(value)) {
                if (depth > 1) {
                  baseFlatten(value, depth - 1, predicate, isStrict, result2);
                } else {
                  arrayPush(result2, value);
                }
              } else if (!isStrict) {
                result2[result2.length] = value;
              }
            }
            return result2;
          }
          __name(baseFlatten, "baseFlatten");
          var baseFor = createBaseFor();
          var baseForRight = createBaseFor(true);
          function baseForOwn(object, iteratee2) {
            return object && baseFor(object, iteratee2, keys);
          }
          __name(baseForOwn, "baseForOwn");
          function baseForOwnRight(object, iteratee2) {
            return object && baseForRight(object, iteratee2, keys);
          }
          __name(baseForOwnRight, "baseForOwnRight");
          function baseFunctions(object, props) {
            return arrayFilter(props, function(key) {
              return isFunction(object[key]);
            });
          }
          __name(baseFunctions, "baseFunctions");
          function baseGet(object, path) {
            path = castPath(path, object);
            var index = 0, length = path.length;
            while (object != null && index < length) {
              object = object[toKey(path[index++])];
            }
            return index && index == length ? object : undefined;
          }
          __name(baseGet, "baseGet");
          function baseGetAllKeys(object, keysFunc, symbolsFunc) {
            var result2 = keysFunc(object);
            return isArray(object) ? result2 : arrayPush(result2, symbolsFunc(object));
          }
          __name(baseGetAllKeys, "baseGetAllKeys");
          function baseGetTag(value) {
            if (value == null) {
              return value === undefined ? undefinedTag : nullTag;
            }
            return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
          }
          __name(baseGetTag, "baseGetTag");
          function baseGt(value, other) {
            return value > other;
          }
          __name(baseGt, "baseGt");
          function baseHas(object, key) {
            return object != null && hasOwnProperty.call(object, key);
          }
          __name(baseHas, "baseHas");
          function baseHasIn(object, key) {
            return object != null && key in Object2(object);
          }
          __name(baseHasIn, "baseHasIn");
          function baseInRange(number, start, end) {
            return number >= nativeMin(start, end) && number < nativeMax(start, end);
          }
          __name(baseInRange, "baseInRange");
          function baseIntersection(arrays, iteratee2, comparator) {
            var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches2 = Array2(othLength), maxLength = Infinity, result2 = [];
            while (othIndex--) {
              var array = arrays[othIndex];
              if (othIndex && iteratee2) {
                array = arrayMap(array, baseUnary(iteratee2));
              }
              maxLength = nativeMin(array.length, maxLength);
              caches2[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined;
            }
            array = arrays[0];
            var index = -1, seen = caches2[0];
            outer:
              while (++index < length && result2.length < maxLength) {
                var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
                value = comparator || value !== 0 ? value : 0;
                if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
                  othIndex = othLength;
                  while (--othIndex) {
                    var cache = caches2[othIndex];
                    if (!(cache ? cacheHas(cache, computed) : includes2(arrays[othIndex], computed, comparator))) {
                      continue outer;
                    }
                  }
                  if (seen) {
                    seen.push(computed);
                  }
                  result2.push(value);
                }
              }
            return result2;
          }
          __name(baseIntersection, "baseIntersection");
          function baseInverter(object, setter, iteratee2, accumulator) {
            baseForOwn(object, function(value, key, object2) {
              setter(accumulator, iteratee2(value), key, object2);
            });
            return accumulator;
          }
          __name(baseInverter, "baseInverter");
          function baseInvoke(object, path, args) {
            path = castPath(path, object);
            object = parent(object, path);
            var func = object == null ? object : object[toKey(last(path))];
            return func == null ? undefined : apply(func, object, args);
          }
          __name(baseInvoke, "baseInvoke");
          function baseIsArguments(value) {
            return isObjectLike(value) && baseGetTag(value) == argsTag;
          }
          __name(baseIsArguments, "baseIsArguments");
          function baseIsArrayBuffer(value) {
            return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
          }
          __name(baseIsArrayBuffer, "baseIsArrayBuffer");
          function baseIsDate(value) {
            return isObjectLike(value) && baseGetTag(value) == dateTag;
          }
          __name(baseIsDate, "baseIsDate");
          function baseIsEqual(value, other, bitmask, customizer, stack) {
            if (value === other) {
              return true;
            }
            if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
              return value !== value && other !== other;
            }
            return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
          }
          __name(baseIsEqual, "baseIsEqual");
          function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
            var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
            objTag = objTag == argsTag ? objectTag : objTag;
            othTag = othTag == argsTag ? objectTag : othTag;
            var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
            if (isSameTag && isBuffer(object)) {
              if (!isBuffer(other)) {
                return false;
              }
              objIsArr = true;
              objIsObj = false;
            }
            if (isSameTag && !objIsObj) {
              stack || (stack = new Stack());
              return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
            }
            if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
              var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
              if (objIsWrapped || othIsWrapped) {
                var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
                stack || (stack = new Stack());
                return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
              }
            }
            if (!isSameTag) {
              return false;
            }
            stack || (stack = new Stack());
            return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
          }
          __name(baseIsEqualDeep, "baseIsEqualDeep");
          function baseIsMap(value) {
            return isObjectLike(value) && getTag(value) == mapTag;
          }
          __name(baseIsMap, "baseIsMap");
          function baseIsMatch(object, source, matchData, customizer) {
            var index = matchData.length, length = index, noCustomizer = !customizer;
            if (object == null) {
              return !length;
            }
            object = Object2(object);
            while (index--) {
              var data = matchData[index];
              if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
                return false;
              }
            }
            while (++index < length) {
              data = matchData[index];
              var key = data[0], objValue = object[key], srcValue = data[1];
              if (noCustomizer && data[2]) {
                if (objValue === undefined && !(key in object)) {
                  return false;
                }
              } else {
                var stack = new Stack();
                if (customizer) {
                  var result2 = customizer(objValue, srcValue, key, object, source, stack);
                }
                if (!(result2 === undefined ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
                  return false;
                }
              }
            }
            return true;
          }
          __name(baseIsMatch, "baseIsMatch");
          function baseIsNative(value) {
            if (!isObject(value) || isMasked(value)) {
              return false;
            }
            var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
            return pattern.test(toSource(value));
          }
          __name(baseIsNative, "baseIsNative");
          function baseIsRegExp(value) {
            return isObjectLike(value) && baseGetTag(value) == regexpTag;
          }
          __name(baseIsRegExp, "baseIsRegExp");
          function baseIsSet(value) {
            return isObjectLike(value) && getTag(value) == setTag;
          }
          __name(baseIsSet, "baseIsSet");
          function baseIsTypedArray(value) {
            return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
          }
          __name(baseIsTypedArray, "baseIsTypedArray");
          function baseIteratee(value) {
            if (typeof value == "function") {
              return value;
            }
            if (value == null) {
              return identity;
            }
            if (typeof value == "object") {
              return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
            }
            return property(value);
          }
          __name(baseIteratee, "baseIteratee");
          function baseKeys(object) {
            if (!isPrototype(object)) {
              return nativeKeys(object);
            }
            var result2 = [];
            for (var key in Object2(object)) {
              if (hasOwnProperty.call(object, key) && key != "constructor") {
                result2.push(key);
              }
            }
            return result2;
          }
          __name(baseKeys, "baseKeys");
          function baseKeysIn(object) {
            if (!isObject(object)) {
              return nativeKeysIn(object);
            }
            var isProto = isPrototype(object), result2 = [];
            for (var key in object) {
              if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
                result2.push(key);
              }
            }
            return result2;
          }
          __name(baseKeysIn, "baseKeysIn");
          function baseLt(value, other) {
            return value < other;
          }
          __name(baseLt, "baseLt");
          function baseMap(collection, iteratee2) {
            var index = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
            baseEach(collection, function(value, key, collection2) {
              result2[++index] = iteratee2(value, key, collection2);
            });
            return result2;
          }
          __name(baseMap, "baseMap");
          function baseMatches(source) {
            var matchData = getMatchData(source);
            if (matchData.length == 1 && matchData[0][2]) {
              return matchesStrictComparable(matchData[0][0], matchData[0][1]);
            }
            return function(object) {
              return object === source || baseIsMatch(object, source, matchData);
            };
          }
          __name(baseMatches, "baseMatches");
          function baseMatchesProperty(path, srcValue) {
            if (isKey(path) && isStrictComparable(srcValue)) {
              return matchesStrictComparable(toKey(path), srcValue);
            }
            return function(object) {
              var objValue = get(object, path);
              return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
            };
          }
          __name(baseMatchesProperty, "baseMatchesProperty");
          function baseMerge(object, source, srcIndex, customizer, stack) {
            if (object === source) {
              return;
            }
            baseFor(source, function(srcValue, key) {
              stack || (stack = new Stack());
              if (isObject(srcValue)) {
                baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
              } else {
                var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined;
                if (newValue === undefined) {
                  newValue = srcValue;
                }
                assignMergeValue(object, key, newValue);
              }
            }, keysIn);
          }
          __name(baseMerge, "baseMerge");
          function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
            var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
            if (stacked) {
              assignMergeValue(object, key, stacked);
              return;
            }
            var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined;
            var isCommon = newValue === undefined;
            if (isCommon) {
              var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
              newValue = srcValue;
              if (isArr || isBuff || isTyped) {
                if (isArray(objValue)) {
                  newValue = objValue;
                } else if (isArrayLikeObject(objValue)) {
                  newValue = copyArray(objValue);
                } else if (isBuff) {
                  isCommon = false;
                  newValue = cloneBuffer(srcValue, true);
                } else if (isTyped) {
                  isCommon = false;
                  newValue = cloneTypedArray(srcValue, true);
                } else {
                  newValue = [];
                }
              } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
                newValue = objValue;
                if (isArguments(objValue)) {
                  newValue = toPlainObject(objValue);
                } else if (!isObject(objValue) || isFunction(objValue)) {
                  newValue = initCloneObject(srcValue);
                }
              } else {
                isCommon = false;
              }
            }
            if (isCommon) {
              stack.set(srcValue, newValue);
              mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
              stack["delete"](srcValue);
            }
            assignMergeValue(object, key, newValue);
          }
          __name(baseMergeDeep, "baseMergeDeep");
          function baseNth(array, n) {
            var length = array.length;
            if (!length) {
              return;
            }
            n += n < 0 ? length : 0;
            return isIndex(n, length) ? array[n] : undefined;
          }
          __name(baseNth, "baseNth");
          function baseOrderBy(collection, iteratees, orders) {
            if (iteratees.length) {
              iteratees = arrayMap(iteratees, function(iteratee2) {
                if (isArray(iteratee2)) {
                  return function(value) {
                    return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                  };
                }
                return iteratee2;
              });
            } else {
              iteratees = [identity];
            }
            var index = -1;
            iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
            var result2 = baseMap(collection, function(value, key, collection2) {
              var criteria = arrayMap(iteratees, function(iteratee2) {
                return iteratee2(value);
              });
              return { "criteria": criteria, "index": ++index, "value": value };
            });
            return baseSortBy(result2, function(object, other) {
              return compareMultiple(object, other, orders);
            });
          }
          __name(baseOrderBy, "baseOrderBy");
          function basePick(object, paths) {
            return basePickBy(object, paths, function(value, path) {
              return hasIn(object, path);
            });
          }
          __name(basePick, "basePick");
          function basePickBy(object, paths, predicate) {
            var index = -1, length = paths.length, result2 = {};
            while (++index < length) {
              var path = paths[index], value = baseGet(object, path);
              if (predicate(value, path)) {
                baseSet(result2, castPath(path, object), value);
              }
            }
            return result2;
          }
          __name(basePickBy, "basePickBy");
          function basePropertyDeep(path) {
            return function(object) {
              return baseGet(object, path);
            };
          }
          __name(basePropertyDeep, "basePropertyDeep");
          function basePullAll(array, values2, iteratee2, comparator) {
            var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values2.length, seen = array;
            if (array === values2) {
              values2 = copyArray(values2);
            }
            if (iteratee2) {
              seen = arrayMap(array, baseUnary(iteratee2));
            }
            while (++index < length) {
              var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
              while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
                if (seen !== array) {
                  splice.call(seen, fromIndex, 1);
                }
                splice.call(array, fromIndex, 1);
              }
            }
            return array;
          }
          __name(basePullAll, "basePullAll");
          function basePullAt(array, indexes) {
            var length = array ? indexes.length : 0, lastIndex = length - 1;
            while (length--) {
              var index = indexes[length];
              if (length == lastIndex || index !== previous) {
                var previous = index;
                if (isIndex(index)) {
                  splice.call(array, index, 1);
                } else {
                  baseUnset(array, index);
                }
              }
            }
            return array;
          }
          __name(basePullAt, "basePullAt");
          function baseRandom(lower, upper) {
            return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
          }
          __name(baseRandom, "baseRandom");
          function baseRange(start, end, step, fromRight) {
            var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
            while (length--) {
              result2[fromRight ? length : ++index] = start;
              start += step;
            }
            return result2;
          }
          __name(baseRange, "baseRange");
          function baseRepeat(string, n) {
            var result2 = "";
            if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
              return result2;
            }
            do {
              if (n % 2) {
                result2 += string;
              }
              n = nativeFloor(n / 2);
              if (n) {
                string += string;
              }
            } while (n);
            return result2;
          }
          __name(baseRepeat, "baseRepeat");
          function baseRest(func, start) {
            return setToString(overRest(func, start, identity), func + "");
          }
          __name(baseRest, "baseRest");
          function baseSample(collection) {
            return arraySample(values(collection));
          }
          __name(baseSample, "baseSample");
          function baseSampleSize(collection, n) {
            var array = values(collection);
            return shuffleSelf(array, baseClamp(n, 0, array.length));
          }
          __name(baseSampleSize, "baseSampleSize");
          function baseSet(object, path, value, customizer) {
            if (!isObject(object)) {
              return object;
            }
            path = castPath(path, object);
            var index = -1, length = path.length, lastIndex = length - 1, nested = object;
            while (nested != null && ++index < length) {
              var key = toKey(path[index]), newValue = value;
              if (key === "__proto__" || key === "constructor" || key === "prototype") {
                return object;
              }
              if (index != lastIndex) {
                var objValue = nested[key];
                newValue = customizer ? customizer(objValue, key, nested) : undefined;
                if (newValue === undefined) {
                  newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
                }
              }
              assignValue(nested, key, newValue);
              nested = nested[key];
            }
            return object;
          }
          __name(baseSet, "baseSet");
          var baseSetData = !metaMap ? identity : function(func, data) {
            metaMap.set(func, data);
            return func;
          };
          var baseSetToString = !defineProperty ? identity : function(func, string) {
            return defineProperty(func, "toString", {
              "configurable": true,
              "enumerable": false,
              "value": constant(string),
              "writable": true
            });
          };
          function baseShuffle(collection) {
            return shuffleSelf(values(collection));
          }
          __name(baseShuffle, "baseShuffle");
          function baseSlice(array, start, end) {
            var index = -1, length = array.length;
            if (start < 0) {
              start = -start > length ? 0 : length + start;
            }
            end = end > length ? length : end;
            if (end < 0) {
              end += length;
            }
            length = start > end ? 0 : end - start >>> 0;
            start >>>= 0;
            var result2 = Array2(length);
            while (++index < length) {
              result2[index] = array[index + start];
            }
            return result2;
          }
          __name(baseSlice, "baseSlice");
          function baseSome(collection, predicate) {
            var result2;
            baseEach(collection, function(value, index, collection2) {
              result2 = predicate(value, index, collection2);
              return !result2;
            });
            return !!result2;
          }
          __name(baseSome, "baseSome");
          function baseSortedIndex(array, value, retHighest) {
            var low = 0, high = array == null ? low : array.length;
            if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
              while (low < high) {
                var mid = low + high >>> 1, computed = array[mid];
                if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
                  low = mid + 1;
                } else {
                  high = mid;
                }
              }
              return high;
            }
            return baseSortedIndexBy(array, value, identity, retHighest);
          }
          __name(baseSortedIndex, "baseSortedIndex");
          function baseSortedIndexBy(array, value, iteratee2, retHighest) {
            var low = 0, high = array == null ? 0 : array.length;
            if (high === 0) {
              return 0;
            }
            value = iteratee2(value);
            var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined;
            while (low < high) {
              var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
              if (valIsNaN) {
                var setLow = retHighest || othIsReflexive;
              } else if (valIsUndefined) {
                setLow = othIsReflexive && (retHighest || othIsDefined);
              } else if (valIsNull) {
                setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
              } else if (valIsSymbol) {
                setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
              } else if (othIsNull || othIsSymbol) {
                setLow = false;
              } else {
                setLow = retHighest ? computed <= value : computed < value;
              }
              if (setLow) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return nativeMin(high, MAX_ARRAY_INDEX);
          }
          __name(baseSortedIndexBy, "baseSortedIndexBy");
          function baseSortedUniq(array, iteratee2) {
            var index = -1, length = array.length, resIndex = 0, result2 = [];
            while (++index < length) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              if (!index || !eq(computed, seen)) {
                var seen = computed;
                result2[resIndex++] = value === 0 ? 0 : value;
              }
            }
            return result2;
          }
          __name(baseSortedUniq, "baseSortedUniq");
          function baseToNumber(value) {
            if (typeof value == "number") {
              return value;
            }
            if (isSymbol(value)) {
              return NAN;
            }
            return +value;
          }
          __name(baseToNumber, "baseToNumber");
          function baseToString(value) {
            if (typeof value == "string") {
              return value;
            }
            if (isArray(value)) {
              return arrayMap(value, baseToString) + "";
            }
            if (isSymbol(value)) {
              return symbolToString ? symbolToString.call(value) : "";
            }
            var result2 = value + "";
            return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
          }
          __name(baseToString, "baseToString");
          function baseUniq(array, iteratee2, comparator) {
            var index = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
            if (comparator) {
              isCommon = false;
              includes2 = arrayIncludesWith;
            } else if (length >= LARGE_ARRAY_SIZE) {
              var set2 = iteratee2 ? null : createSet(array);
              if (set2) {
                return setToArray(set2);
              }
              isCommon = false;
              includes2 = cacheHas;
              seen = new SetCache();
            } else {
              seen = iteratee2 ? [] : result2;
            }
            outer:
              while (++index < length) {
                var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
                value = comparator || value !== 0 ? value : 0;
                if (isCommon && computed === computed) {
                  var seenIndex = seen.length;
                  while (seenIndex--) {
                    if (seen[seenIndex] === computed) {
                      continue outer;
                    }
                  }
                  if (iteratee2) {
                    seen.push(computed);
                  }
                  result2.push(value);
                } else if (!includes2(seen, computed, comparator)) {
                  if (seen !== result2) {
                    seen.push(computed);
                  }
                  result2.push(value);
                }
              }
            return result2;
          }
          __name(baseUniq, "baseUniq");
          function baseUnset(object, path) {
            path = castPath(path, object);
            object = parent(object, path);
            return object == null || delete object[toKey(last(path))];
          }
          __name(baseUnset, "baseUnset");
          function baseUpdate(object, path, updater, customizer) {
            return baseSet(object, path, updater(baseGet(object, path)), customizer);
          }
          __name(baseUpdate, "baseUpdate");
          function baseWhile(array, predicate, isDrop, fromRight) {
            var length = array.length, index = fromRight ? length : -1;
            while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
            }
            return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
          }
          __name(baseWhile, "baseWhile");
          function baseWrapperValue(value, actions) {
            var result2 = value;
            if (result2 instanceof LazyWrapper) {
              result2 = result2.value();
            }
            return arrayReduce(actions, function(result3, action) {
              return action.func.apply(action.thisArg, arrayPush([result3], action.args));
            }, result2);
          }
          __name(baseWrapperValue, "baseWrapperValue");
          function baseXor(arrays, iteratee2, comparator) {
            var length = arrays.length;
            if (length < 2) {
              return length ? baseUniq(arrays[0]) : [];
            }
            var index = -1, result2 = Array2(length);
            while (++index < length) {
              var array = arrays[index], othIndex = -1;
              while (++othIndex < length) {
                if (othIndex != index) {
                  result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
                }
              }
            }
            return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
          }
          __name(baseXor, "baseXor");
          function baseZipObject(props, values2, assignFunc) {
            var index = -1, length = props.length, valsLength = values2.length, result2 = {};
            while (++index < length) {
              var value = index < valsLength ? values2[index] : undefined;
              assignFunc(result2, props[index], value);
            }
            return result2;
          }
          __name(baseZipObject, "baseZipObject");
          function castArrayLikeObject(value) {
            return isArrayLikeObject(value) ? value : [];
          }
          __name(castArrayLikeObject, "castArrayLikeObject");
          function castFunction(value) {
            return typeof value == "function" ? value : identity;
          }
          __name(castFunction, "castFunction");
          function castPath(value, object) {
            if (isArray(value)) {
              return value;
            }
            return isKey(value, object) ? [value] : stringToPath(toString(value));
          }
          __name(castPath, "castPath");
          var castRest = baseRest;
          function castSlice(array, start, end) {
            var length = array.length;
            end = end === undefined ? length : end;
            return !start && end >= length ? array : baseSlice(array, start, end);
          }
          __name(castSlice, "castSlice");
          var clearTimeout2 = ctxClearTimeout || function(id) {
            return root.clearTimeout(id);
          };
          function cloneBuffer(buffer, isDeep) {
            if (isDeep) {
              return buffer.slice();
            }
            var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
            buffer.copy(result2);
            return result2;
          }
          __name(cloneBuffer, "cloneBuffer");
          function cloneArrayBuffer(arrayBuffer) {
            var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
            new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
            return result2;
          }
          __name(cloneArrayBuffer, "cloneArrayBuffer");
          function cloneDataView(dataView, isDeep) {
            var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
            return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
          }
          __name(cloneDataView, "cloneDataView");
          function cloneRegExp(regexp) {
            var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
            result2.lastIndex = regexp.lastIndex;
            return result2;
          }
          __name(cloneRegExp, "cloneRegExp");
          function cloneSymbol(symbol) {
            return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
          }
          __name(cloneSymbol, "cloneSymbol");
          function cloneTypedArray(typedArray, isDeep) {
            var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
            return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
          }
          __name(cloneTypedArray, "cloneTypedArray");
          function compareAscending(value, other) {
            if (value !== other) {
              var valIsDefined = value !== undefined, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
              var othIsDefined = other !== undefined, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
              if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
                return 1;
              }
              if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
                return -1;
              }
            }
            return 0;
          }
          __name(compareAscending, "compareAscending");
          function compareMultiple(object, other, orders) {
            var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
            while (++index < length) {
              var result2 = compareAscending(objCriteria[index], othCriteria[index]);
              if (result2) {
                if (index >= ordersLength) {
                  return result2;
                }
                var order = orders[index];
                return result2 * (order == "desc" ? -1 : 1);
              }
            }
            return object.index - other.index;
          }
          __name(compareMultiple, "compareMultiple");
          function composeArgs(args, partials, holders, isCurried) {
            var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
            while (++leftIndex < leftLength) {
              result2[leftIndex] = partials[leftIndex];
            }
            while (++argsIndex < holdersLength) {
              if (isUncurried || argsIndex < argsLength) {
                result2[holders[argsIndex]] = args[argsIndex];
              }
            }
            while (rangeLength--) {
              result2[leftIndex++] = args[argsIndex++];
            }
            return result2;
          }
          __name(composeArgs, "composeArgs");
          function composeArgsRight(args, partials, holders, isCurried) {
            var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
            while (++argsIndex < rangeLength) {
              result2[argsIndex] = args[argsIndex];
            }
            var offset = argsIndex;
            while (++rightIndex < rightLength) {
              result2[offset + rightIndex] = partials[rightIndex];
            }
            while (++holdersIndex < holdersLength) {
              if (isUncurried || argsIndex < argsLength) {
                result2[offset + holders[holdersIndex]] = args[argsIndex++];
              }
            }
            return result2;
          }
          __name(composeArgsRight, "composeArgsRight");
          function copyArray(source, array) {
            var index = -1, length = source.length;
            array || (array = Array2(length));
            while (++index < length) {
              array[index] = source[index];
            }
            return array;
          }
          __name(copyArray, "copyArray");
          function copyObject(source, props, object, customizer) {
            var isNew = !object;
            object || (object = {});
            var index = -1, length = props.length;
            while (++index < length) {
              var key = props[index];
              var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;
              if (newValue === undefined) {
                newValue = source[key];
              }
              if (isNew) {
                baseAssignValue(object, key, newValue);
              } else {
                assignValue(object, key, newValue);
              }
            }
            return object;
          }
          __name(copyObject, "copyObject");
          function copySymbols(source, object) {
            return copyObject(source, getSymbols(source), object);
          }
          __name(copySymbols, "copySymbols");
          function copySymbolsIn(source, object) {
            return copyObject(source, getSymbolsIn(source), object);
          }
          __name(copySymbolsIn, "copySymbolsIn");
          function createAggregator(setter, initializer) {
            return function(collection, iteratee2) {
              var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
              return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
            };
          }
          __name(createAggregator, "createAggregator");
          function createAssigner(assigner) {
            return baseRest(function(object, sources) {
              var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined, guard = length > 2 ? sources[2] : undefined;
              customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined;
              if (guard && isIterateeCall(sources[0], sources[1], guard)) {
                customizer = length < 3 ? undefined : customizer;
                length = 1;
              }
              object = Object2(object);
              while (++index < length) {
                var source = sources[index];
                if (source) {
                  assigner(object, source, index, customizer);
                }
              }
              return object;
            });
          }
          __name(createAssigner, "createAssigner");
          function createBaseEach(eachFunc, fromRight) {
            return function(collection, iteratee2) {
              if (collection == null) {
                return collection;
              }
              if (!isArrayLike(collection)) {
                return eachFunc(collection, iteratee2);
              }
              var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
              while (fromRight ? index-- : ++index < length) {
                if (iteratee2(iterable[index], index, iterable) === false) {
                  break;
                }
              }
              return collection;
            };
          }
          __name(createBaseEach, "createBaseEach");
          function createBaseFor(fromRight) {
            return function(object, iteratee2, keysFunc) {
              var index = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
              while (length--) {
                var key = props[fromRight ? length : ++index];
                if (iteratee2(iterable[key], key, iterable) === false) {
                  break;
                }
              }
              return object;
            };
          }
          __name(createBaseFor, "createBaseFor");
          function createBind(func, bitmask, thisArg) {
            var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
            function wrapper() {
              var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              return fn.apply(isBind ? thisArg : this, arguments);
            }
            __name(wrapper, "wrapper");
            return wrapper;
          }
          __name(createBind, "createBind");
          function createCaseFirst(methodName) {
            return function(string) {
              string = toString(string);
              var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined;
              var chr = strSymbols ? strSymbols[0] : string.charAt(0);
              var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
              return chr[methodName]() + trailing;
            };
          }
          __name(createCaseFirst, "createCaseFirst");
          function createCompounder(callback) {
            return function(string) {
              return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
            };
          }
          __name(createCompounder, "createCompounder");
          function createCtor(Ctor) {
            return function() {
              var args = arguments;
              switch (args.length) {
                case 0:
                  return new Ctor();
                case 1:
                  return new Ctor(args[0]);
                case 2:
                  return new Ctor(args[0], args[1]);
                case 3:
                  return new Ctor(args[0], args[1], args[2]);
                case 4:
                  return new Ctor(args[0], args[1], args[2], args[3]);
                case 5:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4]);
                case 6:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
                case 7:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
              }
              var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
              return isObject(result2) ? result2 : thisBinding;
            };
          }
          __name(createCtor, "createCtor");
          function createCurry(func, bitmask, arity) {
            var Ctor = createCtor(func);
            function wrapper() {
              var length = arguments.length, args = Array2(length), index = length, placeholder = getHolder(wrapper);
              while (index--) {
                args[index] = arguments[index];
              }
              var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
              length -= holders.length;
              if (length < arity) {
                return createRecurry(
                  func,
                  bitmask,
                  createHybrid,
                  wrapper.placeholder,
                  undefined,
                  args,
                  holders,
                  undefined,
                  undefined,
                  arity - length
                );
              }
              var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              return apply(fn, this, args);
            }
            __name(wrapper, "wrapper");
            return wrapper;
          }
          __name(createCurry, "createCurry");
          function createFind(findIndexFunc) {
            return function(collection, predicate, fromIndex) {
              var iterable = Object2(collection);
              if (!isArrayLike(collection)) {
                var iteratee2 = getIteratee(predicate, 3);
                collection = keys(collection);
                predicate = /* @__PURE__ */ __name(function(key) {
                  return iteratee2(iterable[key], key, iterable);
                }, "predicate");
              }
              var index = findIndexFunc(collection, predicate, fromIndex);
              return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined;
            };
          }
          __name(createFind, "createFind");
          function createFlow(fromRight) {
            return flatRest(function(funcs) {
              var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
              if (fromRight) {
                funcs.reverse();
              }
              while (index--) {
                var func = funcs[index];
                if (typeof func != "function") {
                  throw new TypeError2(FUNC_ERROR_TEXT);
                }
                if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                  var wrapper = new LodashWrapper([], true);
                }
              }
              index = wrapper ? index : length;
              while (++index < length) {
                func = funcs[index];
                var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined;
                if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                  wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
                } else {
                  wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
                }
              }
              return function() {
                var args = arguments, value = args[0];
                if (wrapper && args.length == 1 && isArray(value)) {
                  return wrapper.plant(value).value();
                }
                var index2 = 0, result2 = length ? funcs[index2].apply(this, args) : value;
                while (++index2 < length) {
                  result2 = funcs[index2].call(this, result2);
                }
                return result2;
              };
            });
          }
          __name(createFlow, "createFlow");
          function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
            var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined : createCtor(func);
            function wrapper() {
              var length = arguments.length, args = Array2(length), index = length;
              while (index--) {
                args[index] = arguments[index];
              }
              if (isCurried) {
                var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
              }
              if (partials) {
                args = composeArgs(args, partials, holders, isCurried);
              }
              if (partialsRight) {
                args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
              }
              length -= holdersCount;
              if (isCurried && length < arity) {
                var newHolders = replaceHolders(args, placeholder);
                return createRecurry(
                  func,
                  bitmask,
                  createHybrid,
                  wrapper.placeholder,
                  thisArg,
                  args,
                  newHolders,
                  argPos,
                  ary2,
                  arity - length
                );
              }
              var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
              length = args.length;
              if (argPos) {
                args = reorder(args, argPos);
              } else if (isFlip && length > 1) {
                args.reverse();
              }
              if (isAry && ary2 < length) {
                args.length = ary2;
              }
              if (this && this !== root && this instanceof wrapper) {
                fn = Ctor || createCtor(fn);
              }
              return fn.apply(thisBinding, args);
            }
            __name(wrapper, "wrapper");
            return wrapper;
          }
          __name(createHybrid, "createHybrid");
          function createInverter(setter, toIteratee) {
            return function(object, iteratee2) {
              return baseInverter(object, setter, toIteratee(iteratee2), {});
            };
          }
          __name(createInverter, "createInverter");
          function createMathOperation(operator, defaultValue) {
            return function(value, other) {
              var result2;
              if (value === undefined && other === undefined) {
                return defaultValue;
              }
              if (value !== undefined) {
                result2 = value;
              }
              if (other !== undefined) {
                if (result2 === undefined) {
                  return other;
                }
                if (typeof value == "string" || typeof other == "string") {
                  value = baseToString(value);
                  other = baseToString(other);
                } else {
                  value = baseToNumber(value);
                  other = baseToNumber(other);
                }
                result2 = operator(value, other);
              }
              return result2;
            };
          }
          __name(createMathOperation, "createMathOperation");
          function createOver(arrayFunc) {
            return flatRest(function(iteratees) {
              iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
              return baseRest(function(args) {
                var thisArg = this;
                return arrayFunc(iteratees, function(iteratee2) {
                  return apply(iteratee2, thisArg, args);
                });
              });
            });
          }
          __name(createOver, "createOver");
          function createPadding(length, chars) {
            chars = chars === undefined ? " " : baseToString(chars);
            var charsLength = chars.length;
            if (charsLength < 2) {
              return charsLength ? baseRepeat(chars, length) : chars;
            }
            var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
            return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
          }
          __name(createPadding, "createPadding");
          function createPartial(func, bitmask, thisArg, partials) {
            var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
            function wrapper() {
              var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              while (++leftIndex < leftLength) {
                args[leftIndex] = partials[leftIndex];
              }
              while (argsLength--) {
                args[leftIndex++] = arguments[++argsIndex];
              }
              return apply(fn, isBind ? thisArg : this, args);
            }
            __name(wrapper, "wrapper");
            return wrapper;
          }
          __name(createPartial, "createPartial");
          function createRange(fromRight) {
            return function(start, end, step) {
              if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
                end = step = undefined;
              }
              start = toFinite(start);
              if (end === undefined) {
                end = start;
                start = 0;
              } else {
                end = toFinite(end);
              }
              step = step === undefined ? start < end ? 1 : -1 : toFinite(step);
              return baseRange(start, end, step, fromRight);
            };
          }
          __name(createRange, "createRange");
          function createRelationalOperation(operator) {
            return function(value, other) {
              if (!(typeof value == "string" && typeof other == "string")) {
                value = toNumber(value);
                other = toNumber(other);
              }
              return operator(value, other);
            };
          }
          __name(createRelationalOperation, "createRelationalOperation");
          function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
            var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined, newHoldersRight = isCurry ? undefined : holders, newPartials = isCurry ? partials : undefined, newPartialsRight = isCurry ? undefined : partials;
            bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
            bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
            if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
              bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
            }
            var newData = [
              func,
              bitmask,
              thisArg,
              newPartials,
              newHolders,
              newPartialsRight,
              newHoldersRight,
              argPos,
              ary2,
              arity
            ];
            var result2 = wrapFunc.apply(undefined, newData);
            if (isLaziable(func)) {
              setData(result2, newData);
            }
            result2.placeholder = placeholder;
            return setWrapToString(result2, func, bitmask);
          }
          __name(createRecurry, "createRecurry");
          function createRound(methodName) {
            var func = Math2[methodName];
            return function(number, precision) {
              number = toNumber(number);
              precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
              if (precision && nativeIsFinite(number)) {
                var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
                pair = (toString(value) + "e").split("e");
                return +(pair[0] + "e" + (+pair[1] - precision));
              }
              return func(number);
            };
          }
          __name(createRound, "createRound");
          var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY) ? noop : function(values2) {
            return new Set(values2);
          };
          function createToPairs(keysFunc) {
            return function(object) {
              var tag = getTag(object);
              if (tag == mapTag) {
                return mapToArray(object);
              }
              if (tag == setTag) {
                return setToPairs(object);
              }
              return baseToPairs(object, keysFunc(object));
            };
          }
          __name(createToPairs, "createToPairs");
          function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
            var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
            if (!isBindKey && typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            var length = partials ? partials.length : 0;
            if (!length) {
              bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
              partials = holders = undefined;
            }
            ary2 = ary2 === undefined ? ary2 : nativeMax(toInteger(ary2), 0);
            arity = arity === undefined ? arity : toInteger(arity);
            length -= holders ? holders.length : 0;
            if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
              var partialsRight = partials, holdersRight = holders;
              partials = holders = undefined;
            }
            var data = isBindKey ? undefined : getData(func);
            var newData = [
              func,
              bitmask,
              thisArg,
              partials,
              holders,
              partialsRight,
              holdersRight,
              argPos,
              ary2,
              arity
            ];
            if (data) {
              mergeData(newData, data);
            }
            func = newData[0];
            bitmask = newData[1];
            thisArg = newData[2];
            partials = newData[3];
            holders = newData[4];
            arity = newData[9] = newData[9] === undefined ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
            if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
              bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
            }
            if (!bitmask || bitmask == WRAP_BIND_FLAG) {
              var result2 = createBind(func, bitmask, thisArg);
            } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
              result2 = createCurry(func, bitmask, arity);
            } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
              result2 = createPartial(func, bitmask, thisArg, partials);
            } else {
              result2 = createHybrid.apply(undefined, newData);
            }
            var setter = data ? baseSetData : setData;
            return setWrapToString(setter(result2, newData), func, bitmask);
          }
          __name(createWrap, "createWrap");
          function customDefaultsAssignIn(objValue, srcValue, key, object) {
            if (objValue === undefined || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
              return srcValue;
            }
            return objValue;
          }
          __name(customDefaultsAssignIn, "customDefaultsAssignIn");
          function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
            if (isObject(objValue) && isObject(srcValue)) {
              stack.set(srcValue, objValue);
              baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
              stack["delete"](srcValue);
            }
            return objValue;
          }
          __name(customDefaultsMerge, "customDefaultsMerge");
          function customOmitClone(value) {
            return isPlainObject(value) ? undefined : value;
          }
          __name(customOmitClone, "customOmitClone");
          function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
            if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
              return false;
            }
            var arrStacked = stack.get(array);
            var othStacked = stack.get(other);
            if (arrStacked && othStacked) {
              return arrStacked == other && othStacked == array;
            }
            var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined;
            stack.set(array, other);
            stack.set(other, array);
            while (++index < arrLength) {
              var arrValue = array[index], othValue = other[index];
              if (customizer) {
                var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
              }
              if (compared !== undefined) {
                if (compared) {
                  continue;
                }
                result2 = false;
                break;
              }
              if (seen) {
                if (!arraySome(other, function(othValue2, othIndex) {
                  if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                    return seen.push(othIndex);
                  }
                })) {
                  result2 = false;
                  break;
                }
              } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                result2 = false;
                break;
              }
            }
            stack["delete"](array);
            stack["delete"](other);
            return result2;
          }
          __name(equalArrays, "equalArrays");
          function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
            switch (tag) {
              case dataViewTag:
                if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                  return false;
                }
                object = object.buffer;
                other = other.buffer;
              case arrayBufferTag:
                if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
                  return false;
                }
                return true;
              case boolTag:
              case dateTag:
              case numberTag:
                return eq(+object, +other);
              case errorTag:
                return object.name == other.name && object.message == other.message;
              case regexpTag:
              case stringTag:
                return object == other + "";
              case mapTag:
                var convert = mapToArray;
              case setTag:
                var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
                convert || (convert = setToArray);
                if (object.size != other.size && !isPartial) {
                  return false;
                }
                var stacked = stack.get(object);
                if (stacked) {
                  return stacked == other;
                }
                bitmask |= COMPARE_UNORDERED_FLAG;
                stack.set(object, other);
                var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
                stack["delete"](object);
                return result2;
              case symbolTag:
                if (symbolValueOf) {
                  return symbolValueOf.call(object) == symbolValueOf.call(other);
                }
            }
            return false;
          }
          __name(equalByTag, "equalByTag");
          function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
            if (objLength != othLength && !isPartial) {
              return false;
            }
            var index = objLength;
            while (index--) {
              var key = objProps[index];
              if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
                return false;
              }
            }
            var objStacked = stack.get(object);
            var othStacked = stack.get(other);
            if (objStacked && othStacked) {
              return objStacked == other && othStacked == object;
            }
            var result2 = true;
            stack.set(object, other);
            stack.set(other, object);
            var skipCtor = isPartial;
            while (++index < objLength) {
              key = objProps[index];
              var objValue = object[key], othValue = other[key];
              if (customizer) {
                var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
              }
              if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
                result2 = false;
                break;
              }
              skipCtor || (skipCtor = key == "constructor");
            }
            if (result2 && !skipCtor) {
              var objCtor = object.constructor, othCtor = other.constructor;
              if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
                result2 = false;
              }
            }
            stack["delete"](object);
            stack["delete"](other);
            return result2;
          }
          __name(equalObjects, "equalObjects");
          function flatRest(func) {
            return setToString(overRest(func, undefined, flatten), func + "");
          }
          __name(flatRest, "flatRest");
          function getAllKeys(object) {
            return baseGetAllKeys(object, keys, getSymbols);
          }
          __name(getAllKeys, "getAllKeys");
          function getAllKeysIn(object) {
            return baseGetAllKeys(object, keysIn, getSymbolsIn);
          }
          __name(getAllKeysIn, "getAllKeysIn");
          var getData = !metaMap ? noop : function(func) {
            return metaMap.get(func);
          };
          function getFuncName(func) {
            var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty.call(realNames, result2) ? array.length : 0;
            while (length--) {
              var data = array[length], otherFunc = data.func;
              if (otherFunc == null || otherFunc == func) {
                return data.name;
              }
            }
            return result2;
          }
          __name(getFuncName, "getFuncName");
          function getHolder(func) {
            var object = hasOwnProperty.call(lodash, "placeholder") ? lodash : func;
            return object.placeholder;
          }
          __name(getHolder, "getHolder");
          function getIteratee() {
            var result2 = lodash.iteratee || iteratee;
            result2 = result2 === iteratee ? baseIteratee : result2;
            return arguments.length ? result2(arguments[0], arguments[1]) : result2;
          }
          __name(getIteratee, "getIteratee");
          function getMapData(map2, key) {
            var data = map2.__data__;
            return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
          }
          __name(getMapData, "getMapData");
          function getMatchData(object) {
            var result2 = keys(object), length = result2.length;
            while (length--) {
              var key = result2[length], value = object[key];
              result2[length] = [key, value, isStrictComparable(value)];
            }
            return result2;
          }
          __name(getMatchData, "getMatchData");
          function getNative(object, key) {
            var value = getValue(object, key);
            return baseIsNative(value) ? value : undefined;
          }
          __name(getNative, "getNative");
          function getRawTag(value) {
            var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
            try {
              value[symToStringTag] = undefined;
              var unmasked = true;
            } catch (e) {
            }
            var result2 = nativeObjectToString.call(value);
            if (unmasked) {
              if (isOwn) {
                value[symToStringTag] = tag;
              } else {
                delete value[symToStringTag];
              }
            }
            return result2;
          }
          __name(getRawTag, "getRawTag");
          var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
            if (object == null) {
              return [];
            }
            object = Object2(object);
            return arrayFilter(nativeGetSymbols(object), function(symbol) {
              return propertyIsEnumerable.call(object, symbol);
            });
          };
          var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
            var result2 = [];
            while (object) {
              arrayPush(result2, getSymbols(object));
              object = getPrototype(object);
            }
            return result2;
          };
          var getTag = baseGetTag;
          if (DataView2 && getTag(new DataView2(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
            getTag = /* @__PURE__ */ __name(function(value) {
              var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined, ctorString = Ctor ? toSource(Ctor) : "";
              if (ctorString) {
                switch (ctorString) {
                  case dataViewCtorString:
                    return dataViewTag;
                  case mapCtorString:
                    return mapTag;
                  case promiseCtorString:
                    return promiseTag;
                  case setCtorString:
                    return setTag;
                  case weakMapCtorString:
                    return weakMapTag;
                }
              }
              return result2;
            }, "getTag");
          }
          function getView(start, end, transforms) {
            var index = -1, length = transforms.length;
            while (++index < length) {
              var data = transforms[index], size2 = data.size;
              switch (data.type) {
                case "drop":
                  start += size2;
                  break;
                case "dropRight":
                  end -= size2;
                  break;
                case "take":
                  end = nativeMin(end, start + size2);
                  break;
                case "takeRight":
                  start = nativeMax(start, end - size2);
                  break;
              }
            }
            return { "start": start, "end": end };
          }
          __name(getView, "getView");
          function getWrapDetails(source) {
            var match = source.match(reWrapDetails);
            return match ? match[1].split(reSplitDetails) : [];
          }
          __name(getWrapDetails, "getWrapDetails");
          function hasPath(object, path, hasFunc) {
            path = castPath(path, object);
            var index = -1, length = path.length, result2 = false;
            while (++index < length) {
              var key = toKey(path[index]);
              if (!(result2 = object != null && hasFunc(object, key))) {
                break;
              }
              object = object[key];
            }
            if (result2 || ++index != length) {
              return result2;
            }
            length = object == null ? 0 : object.length;
            return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
          }
          __name(hasPath, "hasPath");
          function initCloneArray(array) {
            var length = array.length, result2 = new array.constructor(length);
            if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
              result2.index = array.index;
              result2.input = array.input;
            }
            return result2;
          }
          __name(initCloneArray, "initCloneArray");
          function initCloneObject(object) {
            return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
          }
          __name(initCloneObject, "initCloneObject");
          function initCloneByTag(object, tag, isDeep) {
            var Ctor = object.constructor;
            switch (tag) {
              case arrayBufferTag:
                return cloneArrayBuffer(object);
              case boolTag:
              case dateTag:
                return new Ctor(+object);
              case dataViewTag:
                return cloneDataView(object, isDeep);
              case float32Tag:
              case float64Tag:
              case int8Tag:
              case int16Tag:
              case int32Tag:
              case uint8Tag:
              case uint8ClampedTag:
              case uint16Tag:
              case uint32Tag:
                return cloneTypedArray(object, isDeep);
              case mapTag:
                return new Ctor();
              case numberTag:
              case stringTag:
                return new Ctor(object);
              case regexpTag:
                return cloneRegExp(object);
              case setTag:
                return new Ctor();
              case symbolTag:
                return cloneSymbol(object);
            }
          }
          __name(initCloneByTag, "initCloneByTag");
          function insertWrapDetails(source, details) {
            var length = details.length;
            if (!length) {
              return source;
            }
            var lastIndex = length - 1;
            details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
            details = details.join(length > 2 ? ", " : " ");
            return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
          }
          __name(insertWrapDetails, "insertWrapDetails");
          function isFlattenable(value) {
            return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
          }
          __name(isFlattenable, "isFlattenable");
          function isIndex(value, length) {
            var type = typeof value;
            length = length == null ? MAX_SAFE_INTEGER : length;
            return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
          }
          __name(isIndex, "isIndex");
          function isIterateeCall(value, index, object) {
            if (!isObject(object)) {
              return false;
            }
            var type = typeof index;
            if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
              return eq(object[index], value);
            }
            return false;
          }
          __name(isIterateeCall, "isIterateeCall");
          function isKey(value, object) {
            if (isArray(value)) {
              return false;
            }
            var type = typeof value;
            if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
              return true;
            }
            return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
          }
          __name(isKey, "isKey");
          function isKeyable(value) {
            var type = typeof value;
            return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
          }
          __name(isKeyable, "isKeyable");
          function isLaziable(func) {
            var funcName = getFuncName(func), other = lodash[funcName];
            if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
              return false;
            }
            if (func === other) {
              return true;
            }
            var data = getData(other);
            return !!data && func === data[0];
          }
          __name(isLaziable, "isLaziable");
          function isMasked(func) {
            return !!maskSrcKey && maskSrcKey in func;
          }
          __name(isMasked, "isMasked");
          var isMaskable = coreJsData ? isFunction : stubFalse;
          function isPrototype(value) {
            var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
            return value === proto;
          }
          __name(isPrototype, "isPrototype");
          function isStrictComparable(value) {
            return value === value && !isObject(value);
          }
          __name(isStrictComparable, "isStrictComparable");
          function matchesStrictComparable(key, srcValue) {
            return function(object) {
              if (object == null) {
                return false;
              }
              return object[key] === srcValue && (srcValue !== undefined || key in Object2(object));
            };
          }
          __name(matchesStrictComparable, "matchesStrictComparable");
          function memoizeCapped(func) {
            var result2 = memoize(func, function(key) {
              if (cache.size === MAX_MEMOIZE_SIZE) {
                cache.clear();
              }
              return key;
            });
            var cache = result2.cache;
            return result2;
          }
          __name(memoizeCapped, "memoizeCapped");
          function mergeData(data, source) {
            var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
            var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
            if (!(isCommon || isCombo)) {
              return data;
            }
            if (srcBitmask & WRAP_BIND_FLAG) {
              data[2] = source[2];
              newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
            }
            var value = source[3];
            if (value) {
              var partials = data[3];
              data[3] = partials ? composeArgs(partials, value, source[4]) : value;
              data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
            }
            value = source[5];
            if (value) {
              partials = data[5];
              data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
              data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
            }
            value = source[7];
            if (value) {
              data[7] = value;
            }
            if (srcBitmask & WRAP_ARY_FLAG) {
              data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
            }
            if (data[9] == null) {
              data[9] = source[9];
            }
            data[0] = source[0];
            data[1] = newBitmask;
            return data;
          }
          __name(mergeData, "mergeData");
          function nativeKeysIn(object) {
            var result2 = [];
            if (object != null) {
              for (var key in Object2(object)) {
                result2.push(key);
              }
            }
            return result2;
          }
          __name(nativeKeysIn, "nativeKeysIn");
          function objectToString(value) {
            return nativeObjectToString.call(value);
          }
          __name(objectToString, "objectToString");
          function overRest(func, start, transform3) {
            start = nativeMax(start === undefined ? func.length - 1 : start, 0);
            return function() {
              var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
              while (++index < length) {
                array[index] = args[start + index];
              }
              index = -1;
              var otherArgs = Array2(start + 1);
              while (++index < start) {
                otherArgs[index] = args[index];
              }
              otherArgs[start] = transform3(array);
              return apply(func, this, otherArgs);
            };
          }
          __name(overRest, "overRest");
          function parent(object, path) {
            return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
          }
          __name(parent, "parent");
          function reorder(array, indexes) {
            var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
            while (length--) {
              var index = indexes[length];
              array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
            }
            return array;
          }
          __name(reorder, "reorder");
          function safeGet(object, key) {
            if (key === "constructor" && typeof object[key] === "function") {
              return;
            }
            if (key == "__proto__") {
              return;
            }
            return object[key];
          }
          __name(safeGet, "safeGet");
          var setData = shortOut(baseSetData);
          var setTimeout2 = ctxSetTimeout || function(func, wait) {
            return root.setTimeout(func, wait);
          };
          var setToString = shortOut(baseSetToString);
          function setWrapToString(wrapper, reference, bitmask) {
            var source = reference + "";
            return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
          }
          __name(setWrapToString, "setWrapToString");
          function shortOut(func) {
            var count = 0, lastCalled = 0;
            return function() {
              var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
              lastCalled = stamp;
              if (remaining > 0) {
                if (++count >= HOT_COUNT) {
                  return arguments[0];
                }
              } else {
                count = 0;
              }
              return func.apply(undefined, arguments);
            };
          }
          __name(shortOut, "shortOut");
          function shuffleSelf(array, size2) {
            var index = -1, length = array.length, lastIndex = length - 1;
            size2 = size2 === undefined ? length : size2;
            while (++index < size2) {
              var rand = baseRandom(index, lastIndex), value = array[rand];
              array[rand] = array[index];
              array[index] = value;
            }
            array.length = size2;
            return array;
          }
          __name(shuffleSelf, "shuffleSelf");
          var stringToPath = memoizeCapped(function(string) {
            var result2 = [];
            if (string.charCodeAt(0) === 46) {
              result2.push("");
            }
            string.replace(rePropName, function(match, number, quote, subString) {
              result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
            });
            return result2;
          });
          function toKey(value) {
            if (typeof value == "string" || isSymbol(value)) {
              return value;
            }
            var result2 = value + "";
            return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
          }
          __name(toKey, "toKey");
          function toSource(func) {
            if (func != null) {
              try {
                return funcToString.call(func);
              } catch (e) {
              }
              try {
                return func + "";
              } catch (e) {
              }
            }
            return "";
          }
          __name(toSource, "toSource");
          function updateWrapDetails(details, bitmask) {
            arrayEach(wrapFlags, function(pair) {
              var value = "_." + pair[0];
              if (bitmask & pair[1] && !arrayIncludes(details, value)) {
                details.push(value);
              }
            });
            return details.sort();
          }
          __name(updateWrapDetails, "updateWrapDetails");
          function wrapperClone(wrapper) {
            if (wrapper instanceof LazyWrapper) {
              return wrapper.clone();
            }
            var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
            result2.__actions__ = copyArray(wrapper.__actions__);
            result2.__index__ = wrapper.__index__;
            result2.__values__ = wrapper.__values__;
            return result2;
          }
          __name(wrapperClone, "wrapperClone");
          function chunk(array, size2, guard) {
            if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined) {
              size2 = 1;
            } else {
              size2 = nativeMax(toInteger(size2), 0);
            }
            var length = array == null ? 0 : array.length;
            if (!length || size2 < 1) {
              return [];
            }
            var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
            while (index < length) {
              result2[resIndex++] = baseSlice(array, index, index += size2);
            }
            return result2;
          }
          __name(chunk, "chunk");
          function compact(array) {
            var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
            while (++index < length) {
              var value = array[index];
              if (value) {
                result2[resIndex++] = value;
              }
            }
            return result2;
          }
          __name(compact, "compact");
          function concat() {
            var length = arguments.length;
            if (!length) {
              return [];
            }
            var args = Array2(length - 1), array = arguments[0], index = length;
            while (index--) {
              args[index - 1] = arguments[index];
            }
            return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
          }
          __name(concat, "concat");
          var difference = baseRest(function(array, values2) {
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
          });
          var differenceBy = baseRest(function(array, values2) {
            var iteratee2 = last(values2);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined;
            }
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
          });
          var differenceWith = baseRest(function(array, values2) {
            var comparator = last(values2);
            if (isArrayLikeObject(comparator)) {
              comparator = undefined;
            }
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined, comparator) : [];
          });
          function drop(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n = guard || n === undefined ? 1 : toInteger(n);
            return baseSlice(array, n < 0 ? 0 : n, length);
          }
          __name(drop, "drop");
          function dropRight(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n = guard || n === undefined ? 1 : toInteger(n);
            n = length - n;
            return baseSlice(array, 0, n < 0 ? 0 : n);
          }
          __name(dropRight, "dropRight");
          function dropRightWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
          }
          __name(dropRightWhile, "dropRightWhile");
          function dropWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
          }
          __name(dropWhile, "dropWhile");
          function fill(array, value, start, end) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
              start = 0;
              end = length;
            }
            return baseFill(array, value, start, end);
          }
          __name(fill, "fill");
          function findIndex(array, predicate, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = fromIndex == null ? 0 : toInteger(fromIndex);
            if (index < 0) {
              index = nativeMax(length + index, 0);
            }
            return baseFindIndex(array, getIteratee(predicate, 3), index);
          }
          __name(findIndex, "findIndex");
          function findLastIndex(array, predicate, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = length - 1;
            if (fromIndex !== undefined) {
              index = toInteger(fromIndex);
              index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
            }
            return baseFindIndex(array, getIteratee(predicate, 3), index, true);
          }
          __name(findLastIndex, "findLastIndex");
          function flatten(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseFlatten(array, 1) : [];
          }
          __name(flatten, "flatten");
          function flattenDeep(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseFlatten(array, INFINITY) : [];
          }
          __name(flattenDeep, "flattenDeep");
          function flattenDepth(array, depth) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            depth = depth === undefined ? 1 : toInteger(depth);
            return baseFlatten(array, depth);
          }
          __name(flattenDepth, "flattenDepth");
          function fromPairs(pairs) {
            var index = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
            while (++index < length) {
              var pair = pairs[index];
              result2[pair[0]] = pair[1];
            }
            return result2;
          }
          __name(fromPairs, "fromPairs");
          function head(array) {
            return array && array.length ? array[0] : undefined;
          }
          __name(head, "head");
          function indexOf(array, value, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = fromIndex == null ? 0 : toInteger(fromIndex);
            if (index < 0) {
              index = nativeMax(length + index, 0);
            }
            return baseIndexOf(array, value, index);
          }
          __name(indexOf, "indexOf");
          function initial(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseSlice(array, 0, -1) : [];
          }
          __name(initial, "initial");
          var intersection = baseRest(function(arrays) {
            var mapped = arrayMap(arrays, castArrayLikeObject);
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
          });
          var intersectionBy = baseRest(function(arrays) {
            var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
            if (iteratee2 === last(mapped)) {
              iteratee2 = undefined;
            } else {
              mapped.pop();
            }
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
          });
          var intersectionWith = baseRest(function(arrays) {
            var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
            comparator = typeof comparator == "function" ? comparator : undefined;
            if (comparator) {
              mapped.pop();
            }
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined, comparator) : [];
          });
          function join(array, separator) {
            return array == null ? "" : nativeJoin.call(array, separator);
          }
          __name(join, "join");
          function last(array) {
            var length = array == null ? 0 : array.length;
            return length ? array[length - 1] : undefined;
          }
          __name(last, "last");
          function lastIndexOf(array, value, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = length;
            if (fromIndex !== undefined) {
              index = toInteger(fromIndex);
              index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
            }
            return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
          }
          __name(lastIndexOf, "lastIndexOf");
          function nth(array, n) {
            return array && array.length ? baseNth(array, toInteger(n)) : undefined;
          }
          __name(nth, "nth");
          var pull = baseRest(pullAll);
          function pullAll(array, values2) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
          }
          __name(pullAll, "pullAll");
          function pullAllBy(array, values2, iteratee2) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
          }
          __name(pullAllBy, "pullAllBy");
          function pullAllWith(array, values2, comparator) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined, comparator) : array;
          }
          __name(pullAllWith, "pullAllWith");
          var pullAt = flatRest(function(array, indexes) {
            var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
            basePullAt(array, arrayMap(indexes, function(index) {
              return isIndex(index, length) ? +index : index;
            }).sort(compareAscending));
            return result2;
          });
          function remove(array, predicate) {
            var result2 = [];
            if (!(array && array.length)) {
              return result2;
            }
            var index = -1, indexes = [], length = array.length;
            predicate = getIteratee(predicate, 3);
            while (++index < length) {
              var value = array[index];
              if (predicate(value, index, array)) {
                result2.push(value);
                indexes.push(index);
              }
            }
            basePullAt(array, indexes);
            return result2;
          }
          __name(remove, "remove");
          function reverse(array) {
            return array == null ? array : nativeReverse.call(array);
          }
          __name(reverse, "reverse");
          function slice(array, start, end) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
              start = 0;
              end = length;
            } else {
              start = start == null ? 0 : toInteger(start);
              end = end === undefined ? length : toInteger(end);
            }
            return baseSlice(array, start, end);
          }
          __name(slice, "slice");
          function sortedIndex(array, value) {
            return baseSortedIndex(array, value);
          }
          __name(sortedIndex, "sortedIndex");
          function sortedIndexBy(array, value, iteratee2) {
            return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
          }
          __name(sortedIndexBy, "sortedIndexBy");
          function sortedIndexOf(array, value) {
            var length = array == null ? 0 : array.length;
            if (length) {
              var index = baseSortedIndex(array, value);
              if (index < length && eq(array[index], value)) {
                return index;
              }
            }
            return -1;
          }
          __name(sortedIndexOf, "sortedIndexOf");
          function sortedLastIndex(array, value) {
            return baseSortedIndex(array, value, true);
          }
          __name(sortedLastIndex, "sortedLastIndex");
          function sortedLastIndexBy(array, value, iteratee2) {
            return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
          }
          __name(sortedLastIndexBy, "sortedLastIndexBy");
          function sortedLastIndexOf(array, value) {
            var length = array == null ? 0 : array.length;
            if (length) {
              var index = baseSortedIndex(array, value, true) - 1;
              if (eq(array[index], value)) {
                return index;
              }
            }
            return -1;
          }
          __name(sortedLastIndexOf, "sortedLastIndexOf");
          function sortedUniq(array) {
            return array && array.length ? baseSortedUniq(array) : [];
          }
          __name(sortedUniq, "sortedUniq");
          function sortedUniqBy(array, iteratee2) {
            return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
          }
          __name(sortedUniqBy, "sortedUniqBy");
          function tail(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseSlice(array, 1, length) : [];
          }
          __name(tail, "tail");
          function take(array, n, guard) {
            if (!(array && array.length)) {
              return [];
            }
            n = guard || n === undefined ? 1 : toInteger(n);
            return baseSlice(array, 0, n < 0 ? 0 : n);
          }
          __name(take, "take");
          function takeRight(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n = guard || n === undefined ? 1 : toInteger(n);
            n = length - n;
            return baseSlice(array, n < 0 ? 0 : n, length);
          }
          __name(takeRight, "takeRight");
          function takeRightWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
          }
          __name(takeRightWhile, "takeRightWhile");
          function takeWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
          }
          __name(takeWhile, "takeWhile");
          var union = baseRest(function(arrays) {
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
          });
          var unionBy = baseRest(function(arrays) {
            var iteratee2 = last(arrays);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined;
            }
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
          });
          var unionWith = baseRest(function(arrays) {
            var comparator = last(arrays);
            comparator = typeof comparator == "function" ? comparator : undefined;
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined, comparator);
          });
          function uniq(array) {
            return array && array.length ? baseUniq(array) : [];
          }
          __name(uniq, "uniq");
          function uniqBy(array, iteratee2) {
            return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
          }
          __name(uniqBy, "uniqBy");
          function uniqWith(array, comparator) {
            comparator = typeof comparator == "function" ? comparator : undefined;
            return array && array.length ? baseUniq(array, undefined, comparator) : [];
          }
          __name(uniqWith, "uniqWith");
          function unzip(array) {
            if (!(array && array.length)) {
              return [];
            }
            var length = 0;
            array = arrayFilter(array, function(group) {
              if (isArrayLikeObject(group)) {
                length = nativeMax(group.length, length);
                return true;
              }
            });
            return baseTimes(length, function(index) {
              return arrayMap(array, baseProperty(index));
            });
          }
          __name(unzip, "unzip");
          function unzipWith(array, iteratee2) {
            if (!(array && array.length)) {
              return [];
            }
            var result2 = unzip(array);
            if (iteratee2 == null) {
              return result2;
            }
            return arrayMap(result2, function(group) {
              return apply(iteratee2, undefined, group);
            });
          }
          __name(unzipWith, "unzipWith");
          var without = baseRest(function(array, values2) {
            return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
          });
          var xor = baseRest(function(arrays) {
            return baseXor(arrayFilter(arrays, isArrayLikeObject));
          });
          var xorBy = baseRest(function(arrays) {
            var iteratee2 = last(arrays);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined;
            }
            return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
          });
          var xorWith = baseRest(function(arrays) {
            var comparator = last(arrays);
            comparator = typeof comparator == "function" ? comparator : undefined;
            return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator);
          });
          var zip = baseRest(unzip);
          function zipObject(props, values2) {
            return baseZipObject(props || [], values2 || [], assignValue);
          }
          __name(zipObject, "zipObject");
          function zipObjectDeep(props, values2) {
            return baseZipObject(props || [], values2 || [], baseSet);
          }
          __name(zipObjectDeep, "zipObjectDeep");
          var zipWith = baseRest(function(arrays) {
            var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined;
            iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined;
            return unzipWith(arrays, iteratee2);
          });
          function chain2(value) {
            var result2 = lodash(value);
            result2.__chain__ = true;
            return result2;
          }
          __name(chain2, "chain");
          function tap(value, interceptor) {
            interceptor(value);
            return value;
          }
          __name(tap, "tap");
          function thru(value, interceptor) {
            return interceptor(value);
          }
          __name(thru, "thru");
          var wrapperAt = flatRest(function(paths) {
            var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = /* @__PURE__ */ __name(function(object) {
              return baseAt(object, paths);
            }, "interceptor");
            if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
              return this.thru(interceptor);
            }
            value = value.slice(start, +start + (length ? 1 : 0));
            value.__actions__.push({
              "func": thru,
              "args": [interceptor],
              "thisArg": undefined
            });
            return new LodashWrapper(value, this.__chain__).thru(function(array) {
              if (length && !array.length) {
                array.push(undefined);
              }
              return array;
            });
          });
          function wrapperChain() {
            return chain2(this);
          }
          __name(wrapperChain, "wrapperChain");
          function wrapperCommit() {
            return new LodashWrapper(this.value(), this.__chain__);
          }
          __name(wrapperCommit, "wrapperCommit");
          function wrapperNext() {
            if (this.__values__ === undefined) {
              this.__values__ = toArray(this.value());
            }
            var done = this.__index__ >= this.__values__.length, value = done ? undefined : this.__values__[this.__index__++];
            return { "done": done, "value": value };
          }
          __name(wrapperNext, "wrapperNext");
          function wrapperToIterator() {
            return this;
          }
          __name(wrapperToIterator, "wrapperToIterator");
          function wrapperPlant(value) {
            var result2, parent2 = this;
            while (parent2 instanceof baseLodash) {
              var clone2 = wrapperClone(parent2);
              clone2.__index__ = 0;
              clone2.__values__ = undefined;
              if (result2) {
                previous.__wrapped__ = clone2;
              } else {
                result2 = clone2;
              }
              var previous = clone2;
              parent2 = parent2.__wrapped__;
            }
            previous.__wrapped__ = value;
            return result2;
          }
          __name(wrapperPlant, "wrapperPlant");
          function wrapperReverse() {
            var value = this.__wrapped__;
            if (value instanceof LazyWrapper) {
              var wrapped = value;
              if (this.__actions__.length) {
                wrapped = new LazyWrapper(this);
              }
              wrapped = wrapped.reverse();
              wrapped.__actions__.push({
                "func": thru,
                "args": [reverse],
                "thisArg": undefined
              });
              return new LodashWrapper(wrapped, this.__chain__);
            }
            return this.thru(reverse);
          }
          __name(wrapperReverse, "wrapperReverse");
          function wrapperValue() {
            return baseWrapperValue(this.__wrapped__, this.__actions__);
          }
          __name(wrapperValue, "wrapperValue");
          var countBy = createAggregator(function(result2, value, key) {
            if (hasOwnProperty.call(result2, key)) {
              ++result2[key];
            } else {
              baseAssignValue(result2, key, 1);
            }
          });
          function every(collection, predicate, guard) {
            var func = isArray(collection) ? arrayEvery : baseEvery;
            if (guard && isIterateeCall(collection, predicate, guard)) {
              predicate = undefined;
            }
            return func(collection, getIteratee(predicate, 3));
          }
          __name(every, "every");
          function filter(collection, predicate) {
            var func = isArray(collection) ? arrayFilter : baseFilter;
            return func(collection, getIteratee(predicate, 3));
          }
          __name(filter, "filter");
          var find = createFind(findIndex);
          var findLast = createFind(findLastIndex);
          function flatMap(collection, iteratee2) {
            return baseFlatten(map(collection, iteratee2), 1);
          }
          __name(flatMap, "flatMap");
          function flatMapDeep(collection, iteratee2) {
            return baseFlatten(map(collection, iteratee2), INFINITY);
          }
          __name(flatMapDeep, "flatMapDeep");
          function flatMapDepth(collection, iteratee2, depth) {
            depth = depth === undefined ? 1 : toInteger(depth);
            return baseFlatten(map(collection, iteratee2), depth);
          }
          __name(flatMapDepth, "flatMapDepth");
          function forEach(collection, iteratee2) {
            var func = isArray(collection) ? arrayEach : baseEach;
            return func(collection, getIteratee(iteratee2, 3));
          }
          __name(forEach, "forEach");
          function forEachRight(collection, iteratee2) {
            var func = isArray(collection) ? arrayEachRight : baseEachRight;
            return func(collection, getIteratee(iteratee2, 3));
          }
          __name(forEachRight, "forEachRight");
          var groupBy = createAggregator(function(result2, value, key) {
            if (hasOwnProperty.call(result2, key)) {
              result2[key].push(value);
            } else {
              baseAssignValue(result2, key, [value]);
            }
          });
          function includes(collection, value, fromIndex, guard) {
            collection = isArrayLike(collection) ? collection : values(collection);
            fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
            var length = collection.length;
            if (fromIndex < 0) {
              fromIndex = nativeMax(length + fromIndex, 0);
            }
            return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
          }
          __name(includes, "includes");
          var invokeMap = baseRest(function(collection, path, args) {
            var index = -1, isFunc = typeof path == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
            baseEach(collection, function(value) {
              result2[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
            });
            return result2;
          });
          var keyBy = createAggregator(function(result2, value, key) {
            baseAssignValue(result2, key, value);
          });
          function map(collection, iteratee2) {
            var func = isArray(collection) ? arrayMap : baseMap;
            return func(collection, getIteratee(iteratee2, 3));
          }
          __name(map, "map");
          function orderBy(collection, iteratees, orders, guard) {
            if (collection == null) {
              return [];
            }
            if (!isArray(iteratees)) {
              iteratees = iteratees == null ? [] : [iteratees];
            }
            orders = guard ? undefined : orders;
            if (!isArray(orders)) {
              orders = orders == null ? [] : [orders];
            }
            return baseOrderBy(collection, iteratees, orders);
          }
          __name(orderBy, "orderBy");
          var partition = createAggregator(function(result2, value, key) {
            result2[key ? 0 : 1].push(value);
          }, function() {
            return [[], []];
          });
          function reduce(collection, iteratee2, accumulator) {
            var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
            return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
          }
          __name(reduce, "reduce");
          function reduceRight(collection, iteratee2, accumulator) {
            var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
            return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
          }
          __name(reduceRight, "reduceRight");
          function reject(collection, predicate) {
            var func = isArray(collection) ? arrayFilter : baseFilter;
            return func(collection, negate(getIteratee(predicate, 3)));
          }
          __name(reject, "reject");
          function sample(collection) {
            var func = isArray(collection) ? arraySample : baseSample;
            return func(collection);
          }
          __name(sample, "sample");
          function sampleSize(collection, n, guard) {
            if (guard ? isIterateeCall(collection, n, guard) : n === undefined) {
              n = 1;
            } else {
              n = toInteger(n);
            }
            var func = isArray(collection) ? arraySampleSize : baseSampleSize;
            return func(collection, n);
          }
          __name(sampleSize, "sampleSize");
          function shuffle(collection) {
            var func = isArray(collection) ? arrayShuffle : baseShuffle;
            return func(collection);
          }
          __name(shuffle, "shuffle");
          function size(collection) {
            if (collection == null) {
              return 0;
            }
            if (isArrayLike(collection)) {
              return isString(collection) ? stringSize(collection) : collection.length;
            }
            var tag = getTag(collection);
            if (tag == mapTag || tag == setTag) {
              return collection.size;
            }
            return baseKeys(collection).length;
          }
          __name(size, "size");
          function some(collection, predicate, guard) {
            var func = isArray(collection) ? arraySome : baseSome;
            if (guard && isIterateeCall(collection, predicate, guard)) {
              predicate = undefined;
            }
            return func(collection, getIteratee(predicate, 3));
          }
          __name(some, "some");
          var sortBy = baseRest(function(collection, iteratees) {
            if (collection == null) {
              return [];
            }
            var length = iteratees.length;
            if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
              iteratees = [];
            } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
              iteratees = [iteratees[0]];
            }
            return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
          });
          var now = ctxNow || function() {
            return root.Date.now();
          };
          function after(n, func) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            n = toInteger(n);
            return function() {
              if (--n < 1) {
                return func.apply(this, arguments);
              }
            };
          }
          __name(after, "after");
          function ary(func, n, guard) {
            n = guard ? undefined : n;
            n = func && n == null ? func.length : n;
            return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
          }
          __name(ary, "ary");
          function before(n, func) {
            var result2;
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            n = toInteger(n);
            return function() {
              if (--n > 0) {
                result2 = func.apply(this, arguments);
              }
              if (n <= 1) {
                func = undefined;
              }
              return result2;
            };
          }
          __name(before, "before");
          var bind = baseRest(function(func, thisArg, partials) {
            var bitmask = WRAP_BIND_FLAG;
            if (partials.length) {
              var holders = replaceHolders(partials, getHolder(bind));
              bitmask |= WRAP_PARTIAL_FLAG;
            }
            return createWrap(func, bitmask, thisArg, partials, holders);
          });
          var bindKey = baseRest(function(object, key, partials) {
            var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
            if (partials.length) {
              var holders = replaceHolders(partials, getHolder(bindKey));
              bitmask |= WRAP_PARTIAL_FLAG;
            }
            return createWrap(key, bitmask, object, partials, holders);
          });
          function curry(func, arity, guard) {
            arity = guard ? undefined : arity;
            var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
            result2.placeholder = curry.placeholder;
            return result2;
          }
          __name(curry, "curry");
          function curryRight(func, arity, guard) {
            arity = guard ? undefined : arity;
            var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
            result2.placeholder = curryRight.placeholder;
            return result2;
          }
          __name(curryRight, "curryRight");
          function debounce(func, wait, options) {
            var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            wait = toNumber(wait) || 0;
            if (isObject(options)) {
              leading = !!options.leading;
              maxing = "maxWait" in options;
              maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
              trailing = "trailing" in options ? !!options.trailing : trailing;
            }
            function invokeFunc(time) {
              var args = lastArgs, thisArg = lastThis;
              lastArgs = lastThis = undefined;
              lastInvokeTime = time;
              result2 = func.apply(thisArg, args);
              return result2;
            }
            __name(invokeFunc, "invokeFunc");
            function leadingEdge(time) {
              lastInvokeTime = time;
              timerId = setTimeout2(timerExpired, wait);
              return leading ? invokeFunc(time) : result2;
            }
            __name(leadingEdge, "leadingEdge");
            function remainingWait(time) {
              var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
              return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
            }
            __name(remainingWait, "remainingWait");
            function shouldInvoke(time) {
              var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
              return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
            }
            __name(shouldInvoke, "shouldInvoke");
            function timerExpired() {
              var time = now();
              if (shouldInvoke(time)) {
                return trailingEdge(time);
              }
              timerId = setTimeout2(timerExpired, remainingWait(time));
            }
            __name(timerExpired, "timerExpired");
            function trailingEdge(time) {
              timerId = undefined;
              if (trailing && lastArgs) {
                return invokeFunc(time);
              }
              lastArgs = lastThis = undefined;
              return result2;
            }
            __name(trailingEdge, "trailingEdge");
            function cancel() {
              if (timerId !== undefined) {
                clearTimeout2(timerId);
              }
              lastInvokeTime = 0;
              lastArgs = lastCallTime = lastThis = timerId = undefined;
            }
            __name(cancel, "cancel");
            function flush() {
              return timerId === undefined ? result2 : trailingEdge(now());
            }
            __name(flush, "flush");
            function debounced() {
              var time = now(), isInvoking = shouldInvoke(time);
              lastArgs = arguments;
              lastThis = this;
              lastCallTime = time;
              if (isInvoking) {
                if (timerId === undefined) {
                  return leadingEdge(lastCallTime);
                }
                if (maxing) {
                  clearTimeout2(timerId);
                  timerId = setTimeout2(timerExpired, wait);
                  return invokeFunc(lastCallTime);
                }
              }
              if (timerId === undefined) {
                timerId = setTimeout2(timerExpired, wait);
              }
              return result2;
            }
            __name(debounced, "debounced");
            debounced.cancel = cancel;
            debounced.flush = flush;
            return debounced;
          }
          __name(debounce, "debounce");
          var defer = baseRest(function(func, args) {
            return baseDelay(func, 1, args);
          });
          var delay = baseRest(function(func, wait, args) {
            return baseDelay(func, toNumber(wait) || 0, args);
          });
          function flip(func) {
            return createWrap(func, WRAP_FLIP_FLAG);
          }
          __name(flip, "flip");
          function memoize(func, resolver) {
            if (typeof func != "function" || resolver != null && typeof resolver != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            var memoized = /* @__PURE__ */ __name(function() {
              var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
              if (cache.has(key)) {
                return cache.get(key);
              }
              var result2 = func.apply(this, args);
              memoized.cache = cache.set(key, result2) || cache;
              return result2;
            }, "memoized");
            memoized.cache = new (memoize.Cache || MapCache)();
            return memoized;
          }
          __name(memoize, "memoize");
          memoize.Cache = MapCache;
          function negate(predicate) {
            if (typeof predicate != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return function() {
              var args = arguments;
              switch (args.length) {
                case 0:
                  return !predicate.call(this);
                case 1:
                  return !predicate.call(this, args[0]);
                case 2:
                  return !predicate.call(this, args[0], args[1]);
                case 3:
                  return !predicate.call(this, args[0], args[1], args[2]);
              }
              return !predicate.apply(this, args);
            };
          }
          __name(negate, "negate");
          function once(func) {
            return before(2, func);
          }
          __name(once, "once");
          var overArgs = castRest(function(func, transforms) {
            transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
            var funcsLength = transforms.length;
            return baseRest(function(args) {
              var index = -1, length = nativeMin(args.length, funcsLength);
              while (++index < length) {
                args[index] = transforms[index].call(this, args[index]);
              }
              return apply(func, this, args);
            });
          });
          var partial = baseRest(function(func, partials) {
            var holders = replaceHolders(partials, getHolder(partial));
            return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders);
          });
          var partialRight = baseRest(function(func, partials) {
            var holders = replaceHolders(partials, getHolder(partialRight));
            return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined, partials, holders);
          });
          var rearg = flatRest(function(func, indexes) {
            return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes);
          });
          function rest(func, start) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            start = start === undefined ? start : toInteger(start);
            return baseRest(func, start);
          }
          __name(rest, "rest");
          function spread(func, start) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            start = start == null ? 0 : nativeMax(toInteger(start), 0);
            return baseRest(function(args) {
              var array = args[start], otherArgs = castSlice(args, 0, start);
              if (array) {
                arrayPush(otherArgs, array);
              }
              return apply(func, this, otherArgs);
            });
          }
          __name(spread, "spread");
          function throttle(func, wait, options) {
            var leading = true, trailing = true;
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            if (isObject(options)) {
              leading = "leading" in options ? !!options.leading : leading;
              trailing = "trailing" in options ? !!options.trailing : trailing;
            }
            return debounce(func, wait, {
              "leading": leading,
              "maxWait": wait,
              "trailing": trailing
            });
          }
          __name(throttle, "throttle");
          function unary(func) {
            return ary(func, 1);
          }
          __name(unary, "unary");
          function wrap(value, wrapper) {
            return partial(castFunction(wrapper), value);
          }
          __name(wrap, "wrap");
          function castArray() {
            if (!arguments.length) {
              return [];
            }
            var value = arguments[0];
            return isArray(value) ? value : [value];
          }
          __name(castArray, "castArray");
          function clone(value) {
            return baseClone(value, CLONE_SYMBOLS_FLAG);
          }
          __name(clone, "clone");
          function cloneWith(value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined;
            return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
          }
          __name(cloneWith, "cloneWith");
          function cloneDeep(value) {
            return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
          }
          __name(cloneDeep, "cloneDeep");
          function cloneDeepWith(value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined;
            return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
          }
          __name(cloneDeepWith, "cloneDeepWith");
          function conformsTo(object, source) {
            return source == null || baseConformsTo(object, source, keys(source));
          }
          __name(conformsTo, "conformsTo");
          function eq(value, other) {
            return value === other || value !== value && other !== other;
          }
          __name(eq, "eq");
          var gt = createRelationalOperation(baseGt);
          var gte = createRelationalOperation(function(value, other) {
            return value >= other;
          });
          var isArguments = baseIsArguments(function() {
            return arguments;
          }()) ? baseIsArguments : function(value) {
            return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
          };
          var isArray = Array2.isArray;
          var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
          function isArrayLike(value) {
            return value != null && isLength(value.length) && !isFunction(value);
          }
          __name(isArrayLike, "isArrayLike");
          function isArrayLikeObject(value) {
            return isObjectLike(value) && isArrayLike(value);
          }
          __name(isArrayLikeObject, "isArrayLikeObject");
          function isBoolean(value) {
            return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
          }
          __name(isBoolean, "isBoolean");
          var isBuffer = nativeIsBuffer || stubFalse;
          var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
          function isElement(value) {
            return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
          }
          __name(isElement, "isElement");
          function isEmpty(value) {
            if (value == null) {
              return true;
            }
            if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
              return !value.length;
            }
            var tag = getTag(value);
            if (tag == mapTag || tag == setTag) {
              return !value.size;
            }
            if (isPrototype(value)) {
              return !baseKeys(value).length;
            }
            for (var key in value) {
              if (hasOwnProperty.call(value, key)) {
                return false;
              }
            }
            return true;
          }
          __name(isEmpty, "isEmpty");
          function isEqual(value, other) {
            return baseIsEqual(value, other);
          }
          __name(isEqual, "isEqual");
          function isEqualWith(value, other, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined;
            var result2 = customizer ? customizer(value, other) : undefined;
            return result2 === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result2;
          }
          __name(isEqualWith, "isEqualWith");
          function isError(value) {
            if (!isObjectLike(value)) {
              return false;
            }
            var tag = baseGetTag(value);
            return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
          }
          __name(isError, "isError");
          function isFinite(value) {
            return typeof value == "number" && nativeIsFinite(value);
          }
          __name(isFinite, "isFinite");
          function isFunction(value) {
            if (!isObject(value)) {
              return false;
            }
            var tag = baseGetTag(value);
            return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
          }
          __name(isFunction, "isFunction");
          function isInteger(value) {
            return typeof value == "number" && value == toInteger(value);
          }
          __name(isInteger, "isInteger");
          function isLength(value) {
            return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
          }
          __name(isLength, "isLength");
          function isObject(value) {
            var type = typeof value;
            return value != null && (type == "object" || type == "function");
          }
          __name(isObject, "isObject");
          function isObjectLike(value) {
            return value != null && typeof value == "object";
          }
          __name(isObjectLike, "isObjectLike");
          var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
          function isMatch(object, source) {
            return object === source || baseIsMatch(object, source, getMatchData(source));
          }
          __name(isMatch, "isMatch");
          function isMatchWith(object, source, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined;
            return baseIsMatch(object, source, getMatchData(source), customizer);
          }
          __name(isMatchWith, "isMatchWith");
          function isNaN2(value) {
            return isNumber(value) && value != +value;
          }
          __name(isNaN2, "isNaN");
          function isNative(value) {
            if (isMaskable(value)) {
              throw new Error2(CORE_ERROR_TEXT);
            }
            return baseIsNative(value);
          }
          __name(isNative, "isNative");
          function isNull(value) {
            return value === null;
          }
          __name(isNull, "isNull");
          function isNil(value) {
            return value == null;
          }
          __name(isNil, "isNil");
          function isNumber(value) {
            return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
          }
          __name(isNumber, "isNumber");
          function isPlainObject(value) {
            if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
              return false;
            }
            var proto = getPrototype(value);
            if (proto === null) {
              return true;
            }
            var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
            return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
          }
          __name(isPlainObject, "isPlainObject");
          var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
          function isSafeInteger(value) {
            return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
          }
          __name(isSafeInteger, "isSafeInteger");
          var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
          function isString(value) {
            return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
          }
          __name(isString, "isString");
          function isSymbol(value) {
            return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
          }
          __name(isSymbol, "isSymbol");
          var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
          function isUndefined(value) {
            return value === undefined;
          }
          __name(isUndefined, "isUndefined");
          function isWeakMap(value) {
            return isObjectLike(value) && getTag(value) == weakMapTag;
          }
          __name(isWeakMap, "isWeakMap");
          function isWeakSet(value) {
            return isObjectLike(value) && baseGetTag(value) == weakSetTag;
          }
          __name(isWeakSet, "isWeakSet");
          var lt = createRelationalOperation(baseLt);
          var lte = createRelationalOperation(function(value, other) {
            return value <= other;
          });
          function toArray(value) {
            if (!value) {
              return [];
            }
            if (isArrayLike(value)) {
              return isString(value) ? stringToArray(value) : copyArray(value);
            }
            if (symIterator && value[symIterator]) {
              return iteratorToArray(value[symIterator]());
            }
            var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
            return func(value);
          }
          __name(toArray, "toArray");
          function toFinite(value) {
            if (!value) {
              return value === 0 ? value : 0;
            }
            value = toNumber(value);
            if (value === INFINITY || value === -INFINITY) {
              var sign = value < 0 ? -1 : 1;
              return sign * MAX_INTEGER;
            }
            return value === value ? value : 0;
          }
          __name(toFinite, "toFinite");
          function toInteger(value) {
            var result2 = toFinite(value), remainder = result2 % 1;
            return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
          }
          __name(toInteger, "toInteger");
          function toLength(value) {
            return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
          }
          __name(toLength, "toLength");
          function toNumber(value) {
            if (typeof value == "number") {
              return value;
            }
            if (isSymbol(value)) {
              return NAN;
            }
            if (isObject(value)) {
              var other = typeof value.valueOf == "function" ? value.valueOf() : value;
              value = isObject(other) ? other + "" : other;
            }
            if (typeof value != "string") {
              return value === 0 ? value : +value;
            }
            value = baseTrim(value);
            var isBinary = reIsBinary.test(value);
            return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
          }
          __name(toNumber, "toNumber");
          function toPlainObject(value) {
            return copyObject(value, keysIn(value));
          }
          __name(toPlainObject, "toPlainObject");
          function toSafeInteger(value) {
            return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
          }
          __name(toSafeInteger, "toSafeInteger");
          function toString(value) {
            return value == null ? "" : baseToString(value);
          }
          __name(toString, "toString");
          var assign = createAssigner(function(object, source) {
            if (isPrototype(source) || isArrayLike(source)) {
              copyObject(source, keys(source), object);
              return;
            }
            for (var key in source) {
              if (hasOwnProperty.call(source, key)) {
                assignValue(object, key, source[key]);
              }
            }
          });
          var assignIn = createAssigner(function(object, source) {
            copyObject(source, keysIn(source), object);
          });
          var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
            copyObject(source, keysIn(source), object, customizer);
          });
          var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
            copyObject(source, keys(source), object, customizer);
          });
          var at = flatRest(baseAt);
          function create(prototype, properties) {
            var result2 = baseCreate(prototype);
            return properties == null ? result2 : baseAssign(result2, properties);
          }
          __name(create, "create");
          var defaults = baseRest(function(object, sources) {
            object = Object2(object);
            var index = -1;
            var length = sources.length;
            var guard = length > 2 ? sources[2] : undefined;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              length = 1;
            }
            while (++index < length) {
              var source = sources[index];
              var props = keysIn(source);
              var propsIndex = -1;
              var propsLength = props.length;
              while (++propsIndex < propsLength) {
                var key = props[propsIndex];
                var value = object[key];
                if (value === undefined || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
                  object[key] = source[key];
                }
              }
            }
            return object;
          });
          var defaultsDeep = baseRest(function(args) {
            args.push(undefined, customDefaultsMerge);
            return apply(mergeWith, undefined, args);
          });
          function findKey(object, predicate) {
            return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
          }
          __name(findKey, "findKey");
          function findLastKey(object, predicate) {
            return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
          }
          __name(findLastKey, "findLastKey");
          function forIn(object, iteratee2) {
            return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
          }
          __name(forIn, "forIn");
          function forInRight(object, iteratee2) {
            return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
          }
          __name(forInRight, "forInRight");
          function forOwn(object, iteratee2) {
            return object && baseForOwn(object, getIteratee(iteratee2, 3));
          }
          __name(forOwn, "forOwn");
          function forOwnRight(object, iteratee2) {
            return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
          }
          __name(forOwnRight, "forOwnRight");
          function functions(object) {
            return object == null ? [] : baseFunctions(object, keys(object));
          }
          __name(functions, "functions");
          function functionsIn(object) {
            return object == null ? [] : baseFunctions(object, keysIn(object));
          }
          __name(functionsIn, "functionsIn");
          function get(object, path, defaultValue) {
            var result2 = object == null ? undefined : baseGet(object, path);
            return result2 === undefined ? defaultValue : result2;
          }
          __name(get, "get");
          function has(object, path) {
            return object != null && hasPath(object, path, baseHas);
          }
          __name(has, "has");
          function hasIn(object, path) {
            return object != null && hasPath(object, path, baseHasIn);
          }
          __name(hasIn, "hasIn");
          var invert = createInverter(function(result2, value, key) {
            if (value != null && typeof value.toString != "function") {
              value = nativeObjectToString.call(value);
            }
            result2[value] = key;
          }, constant(identity));
          var invertBy = createInverter(function(result2, value, key) {
            if (value != null && typeof value.toString != "function") {
              value = nativeObjectToString.call(value);
            }
            if (hasOwnProperty.call(result2, value)) {
              result2[value].push(key);
            } else {
              result2[value] = [key];
            }
          }, getIteratee);
          var invoke = baseRest(baseInvoke);
          function keys(object) {
            return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
          }
          __name(keys, "keys");
          function keysIn(object) {
            return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
          }
          __name(keysIn, "keysIn");
          function mapKeys(object, iteratee2) {
            var result2 = {};
            iteratee2 = getIteratee(iteratee2, 3);
            baseForOwn(object, function(value, key, object2) {
              baseAssignValue(result2, iteratee2(value, key, object2), value);
            });
            return result2;
          }
          __name(mapKeys, "mapKeys");
          function mapValues(object, iteratee2) {
            var result2 = {};
            iteratee2 = getIteratee(iteratee2, 3);
            baseForOwn(object, function(value, key, object2) {
              baseAssignValue(result2, key, iteratee2(value, key, object2));
            });
            return result2;
          }
          __name(mapValues, "mapValues");
          var merge = createAssigner(function(object, source, srcIndex) {
            baseMerge(object, source, srcIndex);
          });
          var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
            baseMerge(object, source, srcIndex, customizer);
          });
          var omit = flatRest(function(object, paths) {
            var result2 = {};
            if (object == null) {
              return result2;
            }
            var isDeep = false;
            paths = arrayMap(paths, function(path) {
              path = castPath(path, object);
              isDeep || (isDeep = path.length > 1);
              return path;
            });
            copyObject(object, getAllKeysIn(object), result2);
            if (isDeep) {
              result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
            }
            var length = paths.length;
            while (length--) {
              baseUnset(result2, paths[length]);
            }
            return result2;
          });
          function omitBy(object, predicate) {
            return pickBy(object, negate(getIteratee(predicate)));
          }
          __name(omitBy, "omitBy");
          var pick = flatRest(function(object, paths) {
            return object == null ? {} : basePick(object, paths);
          });
          function pickBy(object, predicate) {
            if (object == null) {
              return {};
            }
            var props = arrayMap(getAllKeysIn(object), function(prop) {
              return [prop];
            });
            predicate = getIteratee(predicate);
            return basePickBy(object, props, function(value, path) {
              return predicate(value, path[0]);
            });
          }
          __name(pickBy, "pickBy");
          function result(object, path, defaultValue) {
            path = castPath(path, object);
            var index = -1, length = path.length;
            if (!length) {
              length = 1;
              object = undefined;
            }
            while (++index < length) {
              var value = object == null ? undefined : object[toKey(path[index])];
              if (value === undefined) {
                index = length;
                value = defaultValue;
              }
              object = isFunction(value) ? value.call(object) : value;
            }
            return object;
          }
          __name(result, "result");
          function set(object, path, value) {
            return object == null ? object : baseSet(object, path, value);
          }
          __name(set, "set");
          function setWith(object, path, value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined;
            return object == null ? object : baseSet(object, path, value, customizer);
          }
          __name(setWith, "setWith");
          var toPairs = createToPairs(keys);
          var toPairsIn = createToPairs(keysIn);
          function transform2(object, iteratee2, accumulator) {
            var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
            iteratee2 = getIteratee(iteratee2, 4);
            if (accumulator == null) {
              var Ctor = object && object.constructor;
              if (isArrLike) {
                accumulator = isArr ? new Ctor() : [];
              } else if (isObject(object)) {
                accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
              } else {
                accumulator = {};
              }
            }
            (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
              return iteratee2(accumulator, value, index, object2);
            });
            return accumulator;
          }
          __name(transform2, "transform");
          function unset(object, path) {
            return object == null ? true : baseUnset(object, path);
          }
          __name(unset, "unset");
          function update(object, path, updater) {
            return object == null ? object : baseUpdate(object, path, castFunction(updater));
          }
          __name(update, "update");
          function updateWith(object, path, updater, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined;
            return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
          }
          __name(updateWith, "updateWith");
          function values(object) {
            return object == null ? [] : baseValues(object, keys(object));
          }
          __name(values, "values");
          function valuesIn(object) {
            return object == null ? [] : baseValues(object, keysIn(object));
          }
          __name(valuesIn, "valuesIn");
          function clamp(number, lower, upper) {
            if (upper === undefined) {
              upper = lower;
              lower = undefined;
            }
            if (upper !== undefined) {
              upper = toNumber(upper);
              upper = upper === upper ? upper : 0;
            }
            if (lower !== undefined) {
              lower = toNumber(lower);
              lower = lower === lower ? lower : 0;
            }
            return baseClamp(toNumber(number), lower, upper);
          }
          __name(clamp, "clamp");
          function inRange(number, start, end) {
            start = toFinite(start);
            if (end === undefined) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            number = toNumber(number);
            return baseInRange(number, start, end);
          }
          __name(inRange, "inRange");
          function random(lower, upper, floating) {
            if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
              upper = floating = undefined;
            }
            if (floating === undefined) {
              if (typeof upper == "boolean") {
                floating = upper;
                upper = undefined;
              } else if (typeof lower == "boolean") {
                floating = lower;
                lower = undefined;
              }
            }
            if (lower === undefined && upper === undefined) {
              lower = 0;
              upper = 1;
            } else {
              lower = toFinite(lower);
              if (upper === undefined) {
                upper = lower;
                lower = 0;
              } else {
                upper = toFinite(upper);
              }
            }
            if (lower > upper) {
              var temp = lower;
              lower = upper;
              upper = temp;
            }
            if (floating || lower % 1 || upper % 1) {
              var rand = nativeRandom();
              return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
            }
            return baseRandom(lower, upper);
          }
          __name(random, "random");
          var camelCase = createCompounder(function(result2, word, index) {
            word = word.toLowerCase();
            return result2 + (index ? capitalize(word) : word);
          });
          function capitalize(string) {
            return upperFirst(toString(string).toLowerCase());
          }
          __name(capitalize, "capitalize");
          function deburr(string) {
            string = toString(string);
            return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
          }
          __name(deburr, "deburr");
          function endsWith(string, target, position) {
            string = toString(string);
            target = baseToString(target);
            var length = string.length;
            position = position === undefined ? length : baseClamp(toInteger(position), 0, length);
            var end = position;
            position -= target.length;
            return position >= 0 && string.slice(position, end) == target;
          }
          __name(endsWith, "endsWith");
          function escape(string) {
            string = toString(string);
            return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
          }
          __name(escape, "escape");
          function escapeRegExp(string) {
            string = toString(string);
            return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
          }
          __name(escapeRegExp, "escapeRegExp");
          var kebabCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? "-" : "") + word.toLowerCase();
          });
          var lowerCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? " " : "") + word.toLowerCase();
          });
          var lowerFirst = createCaseFirst("toLowerCase");
          function pad(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            if (!length || strLength >= length) {
              return string;
            }
            var mid = (length - strLength) / 2;
            return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
          }
          __name(pad, "pad");
          function padEnd(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
          }
          __name(padEnd, "padEnd");
          function padStart(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
          }
          __name(padStart, "padStart");
          function parseInt2(string, radix, guard) {
            if (guard || radix == null) {
              radix = 0;
            } else if (radix) {
              radix = +radix;
            }
            return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
          }
          __name(parseInt2, "parseInt");
          function repeat(string, n, guard) {
            if (guard ? isIterateeCall(string, n, guard) : n === undefined) {
              n = 1;
            } else {
              n = toInteger(n);
            }
            return baseRepeat(toString(string), n);
          }
          __name(repeat, "repeat");
          function replace() {
            var args = arguments, string = toString(args[0]);
            return args.length < 3 ? string : string.replace(args[1], args[2]);
          }
          __name(replace, "replace");
          var snakeCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? "_" : "") + word.toLowerCase();
          });
          function split(string, separator, limit) {
            if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
              separator = limit = undefined;
            }
            limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
            if (!limit) {
              return [];
            }
            string = toString(string);
            if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
              separator = baseToString(separator);
              if (!separator && hasUnicode(string)) {
                return castSlice(stringToArray(string), 0, limit);
              }
            }
            return string.split(separator, limit);
          }
          __name(split, "split");
          var startCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? " " : "") + upperFirst(word);
          });
          function startsWith(string, target, position) {
            string = toString(string);
            position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
            target = baseToString(target);
            return string.slice(position, position + target.length) == target;
          }
          __name(startsWith, "startsWith");
          function template(string, options, guard) {
            var settings = lodash.templateSettings;
            if (guard && isIterateeCall(string, options, guard)) {
              options = undefined;
            }
            string = toString(string);
            options = assignInWith({}, options, settings, customDefaultsAssignIn);
            var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
            var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
            var reDelimiters = RegExp2(
              (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
              "g"
            );
            var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
            string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
              interpolateValue || (interpolateValue = esTemplateValue);
              source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
              if (escapeValue) {
                isEscaping = true;
                source += "' +\n__e(" + escapeValue + ") +\n'";
              }
              if (evaluateValue) {
                isEvaluating = true;
                source += "';\n" + evaluateValue + ";\n__p += '";
              }
              if (interpolateValue) {
                source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
              }
              index = offset + match.length;
              return match;
            });
            source += "';\n";
            var variable = hasOwnProperty.call(options, "variable") && options.variable;
            if (!variable) {
              source = "with (obj) {\n" + source + "\n}\n";
            } else if (reForbiddenIdentifierChars.test(variable)) {
              throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
            }
            source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
            source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
            var result2 = attempt(function() {
              return Function2(importsKeys, sourceURL + "return " + source).apply(undefined, importsValues);
            });
            result2.source = source;
            if (isError(result2)) {
              throw result2;
            }
            return result2;
          }
          __name(template, "template");
          function toLower(value) {
            return toString(value).toLowerCase();
          }
          __name(toLower, "toLower");
          function toUpper(value) {
            return toString(value).toUpperCase();
          }
          __name(toUpper, "toUpper");
          function trim(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined)) {
              return baseTrim(string);
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
            return castSlice(strSymbols, start, end).join("");
          }
          __name(trim, "trim");
          function trimEnd(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined)) {
              return string.slice(0, trimmedEndIndex(string) + 1);
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
            return castSlice(strSymbols, 0, end).join("");
          }
          __name(trimEnd, "trimEnd");
          function trimStart(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined)) {
              return string.replace(reTrimStart, "");
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
            return castSlice(strSymbols, start).join("");
          }
          __name(trimStart, "trimStart");
          function truncate(string, options) {
            var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
            if (isObject(options)) {
              var separator = "separator" in options ? options.separator : separator;
              length = "length" in options ? toInteger(options.length) : length;
              omission = "omission" in options ? baseToString(options.omission) : omission;
            }
            string = toString(string);
            var strLength = string.length;
            if (hasUnicode(string)) {
              var strSymbols = stringToArray(string);
              strLength = strSymbols.length;
            }
            if (length >= strLength) {
              return string;
            }
            var end = length - stringSize(omission);
            if (end < 1) {
              return omission;
            }
            var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
            if (separator === undefined) {
              return result2 + omission;
            }
            if (strSymbols) {
              end += result2.length - end;
            }
            if (isRegExp(separator)) {
              if (string.slice(end).search(separator)) {
                var match, substring = result2;
                if (!separator.global) {
                  separator = RegExp2(separator.source, toString(reFlags.exec(separator)) + "g");
                }
                separator.lastIndex = 0;
                while (match = separator.exec(substring)) {
                  var newEnd = match.index;
                }
                result2 = result2.slice(0, newEnd === undefined ? end : newEnd);
              }
            } else if (string.indexOf(baseToString(separator), end) != end) {
              var index = result2.lastIndexOf(separator);
              if (index > -1) {
                result2 = result2.slice(0, index);
              }
            }
            return result2 + omission;
          }
          __name(truncate, "truncate");
          function unescape(string) {
            string = toString(string);
            return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
          }
          __name(unescape, "unescape");
          var upperCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? " " : "") + word.toUpperCase();
          });
          var upperFirst = createCaseFirst("toUpperCase");
          function words(string, pattern, guard) {
            string = toString(string);
            pattern = guard ? undefined : pattern;
            if (pattern === undefined) {
              return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
            }
            return string.match(pattern) || [];
          }
          __name(words, "words");
          var attempt = baseRest(function(func, args) {
            try {
              return apply(func, undefined, args);
            } catch (e) {
              return isError(e) ? e : new Error2(e);
            }
          });
          var bindAll = flatRest(function(object, methodNames) {
            arrayEach(methodNames, function(key) {
              key = toKey(key);
              baseAssignValue(object, key, bind(object[key], object));
            });
            return object;
          });
          function cond(pairs) {
            var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
            pairs = !length ? [] : arrayMap(pairs, function(pair) {
              if (typeof pair[1] != "function") {
                throw new TypeError2(FUNC_ERROR_TEXT);
              }
              return [toIteratee(pair[0]), pair[1]];
            });
            return baseRest(function(args) {
              var index = -1;
              while (++index < length) {
                var pair = pairs[index];
                if (apply(pair[0], this, args)) {
                  return apply(pair[1], this, args);
                }
              }
            });
          }
          __name(cond, "cond");
          function conforms(source) {
            return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
          }
          __name(conforms, "conforms");
          function constant(value) {
            return function() {
              return value;
            };
          }
          __name(constant, "constant");
          function defaultTo(value, defaultValue) {
            return value == null || value !== value ? defaultValue : value;
          }
          __name(defaultTo, "defaultTo");
          var flow = createFlow();
          var flowRight = createFlow(true);
          function identity(value) {
            return value;
          }
          __name(identity, "identity");
          function iteratee(func) {
            return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
          }
          __name(iteratee, "iteratee");
          function matches(source) {
            return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
          }
          __name(matches, "matches");
          function matchesProperty(path, srcValue) {
            return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
          }
          __name(matchesProperty, "matchesProperty");
          var method = baseRest(function(path, args) {
            return function(object) {
              return baseInvoke(object, path, args);
            };
          });
          var methodOf = baseRest(function(object, args) {
            return function(path) {
              return baseInvoke(object, path, args);
            };
          });
          function mixin(object, source, options) {
            var props = keys(source), methodNames = baseFunctions(source, props);
            if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
              options = source;
              source = object;
              object = this;
              methodNames = baseFunctions(source, keys(source));
            }
            var chain3 = !(isObject(options) && "chain" in options) || !!options.chain, isFunc = isFunction(object);
            arrayEach(methodNames, function(methodName) {
              var func = source[methodName];
              object[methodName] = func;
              if (isFunc) {
                object.prototype[methodName] = function() {
                  var chainAll = this.__chain__;
                  if (chain3 || chainAll) {
                    var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                    actions.push({ "func": func, "args": arguments, "thisArg": object });
                    result2.__chain__ = chainAll;
                    return result2;
                  }
                  return func.apply(object, arrayPush([this.value()], arguments));
                };
              }
            });
            return object;
          }
          __name(mixin, "mixin");
          function noConflict() {
            if (root._ === this) {
              root._ = oldDash;
            }
            return this;
          }
          __name(noConflict, "noConflict");
          function noop() {
          }
          __name(noop, "noop");
          function nthArg(n) {
            n = toInteger(n);
            return baseRest(function(args) {
              return baseNth(args, n);
            });
          }
          __name(nthArg, "nthArg");
          var over = createOver(arrayMap);
          var overEvery = createOver(arrayEvery);
          var overSome = createOver(arraySome);
          function property(path) {
            return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
          }
          __name(property, "property");
          function propertyOf(object) {
            return function(path) {
              return object == null ? undefined : baseGet(object, path);
            };
          }
          __name(propertyOf, "propertyOf");
          var range = createRange();
          var rangeRight = createRange(true);
          function stubArray() {
            return [];
          }
          __name(stubArray, "stubArray");
          function stubFalse() {
            return false;
          }
          __name(stubFalse, "stubFalse");
          function stubObject() {
            return {};
          }
          __name(stubObject, "stubObject");
          function stubString() {
            return "";
          }
          __name(stubString, "stubString");
          function stubTrue() {
            return true;
          }
          __name(stubTrue, "stubTrue");
          function times(n, iteratee2) {
            n = toInteger(n);
            if (n < 1 || n > MAX_SAFE_INTEGER) {
              return [];
            }
            var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
            iteratee2 = getIteratee(iteratee2);
            n -= MAX_ARRAY_LENGTH;
            var result2 = baseTimes(length, iteratee2);
            while (++index < n) {
              iteratee2(index);
            }
            return result2;
          }
          __name(times, "times");
          function toPath(value) {
            if (isArray(value)) {
              return arrayMap(value, toKey);
            }
            return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
          }
          __name(toPath, "toPath");
          function uniqueId(prefix) {
            var id = ++idCounter;
            return toString(prefix) + id;
          }
          __name(uniqueId, "uniqueId");
          var add = createMathOperation(function(augend, addend) {
            return augend + addend;
          }, 0);
          var ceil = createRound("ceil");
          var divide = createMathOperation(function(dividend, divisor) {
            return dividend / divisor;
          }, 1);
          var floor = createRound("floor");
          function max(array) {
            return array && array.length ? baseExtremum(array, identity, baseGt) : undefined;
          }
          __name(max, "max");
          function maxBy(array, iteratee2) {
            return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined;
          }
          __name(maxBy, "maxBy");
          function mean(array) {
            return baseMean(array, identity);
          }
          __name(mean, "mean");
          function meanBy(array, iteratee2) {
            return baseMean(array, getIteratee(iteratee2, 2));
          }
          __name(meanBy, "meanBy");
          function min(array) {
            return array && array.length ? baseExtremum(array, identity, baseLt) : undefined;
          }
          __name(min, "min");
          function minBy(array, iteratee2) {
            return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined;
          }
          __name(minBy, "minBy");
          var multiply = createMathOperation(function(multiplier, multiplicand) {
            return multiplier * multiplicand;
          }, 1);
          var round = createRound("round");
          var subtract = createMathOperation(function(minuend, subtrahend) {
            return minuend - subtrahend;
          }, 0);
          function sum(array) {
            return array && array.length ? baseSum(array, identity) : 0;
          }
          __name(sum, "sum");
          function sumBy(array, iteratee2) {
            return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
          }
          __name(sumBy, "sumBy");
          lodash.after = after;
          lodash.ary = ary;
          lodash.assign = assign;
          lodash.assignIn = assignIn;
          lodash.assignInWith = assignInWith;
          lodash.assignWith = assignWith;
          lodash.at = at;
          lodash.before = before;
          lodash.bind = bind;
          lodash.bindAll = bindAll;
          lodash.bindKey = bindKey;
          lodash.castArray = castArray;
          lodash.chain = chain2;
          lodash.chunk = chunk;
          lodash.compact = compact;
          lodash.concat = concat;
          lodash.cond = cond;
          lodash.conforms = conforms;
          lodash.constant = constant;
          lodash.countBy = countBy;
          lodash.create = create;
          lodash.curry = curry;
          lodash.curryRight = curryRight;
          lodash.debounce = debounce;
          lodash.defaults = defaults;
          lodash.defaultsDeep = defaultsDeep;
          lodash.defer = defer;
          lodash.delay = delay;
          lodash.difference = difference;
          lodash.differenceBy = differenceBy;
          lodash.differenceWith = differenceWith;
          lodash.drop = drop;
          lodash.dropRight = dropRight;
          lodash.dropRightWhile = dropRightWhile;
          lodash.dropWhile = dropWhile;
          lodash.fill = fill;
          lodash.filter = filter;
          lodash.flatMap = flatMap;
          lodash.flatMapDeep = flatMapDeep;
          lodash.flatMapDepth = flatMapDepth;
          lodash.flatten = flatten;
          lodash.flattenDeep = flattenDeep;
          lodash.flattenDepth = flattenDepth;
          lodash.flip = flip;
          lodash.flow = flow;
          lodash.flowRight = flowRight;
          lodash.fromPairs = fromPairs;
          lodash.functions = functions;
          lodash.functionsIn = functionsIn;
          lodash.groupBy = groupBy;
          lodash.initial = initial;
          lodash.intersection = intersection;
          lodash.intersectionBy = intersectionBy;
          lodash.intersectionWith = intersectionWith;
          lodash.invert = invert;
          lodash.invertBy = invertBy;
          lodash.invokeMap = invokeMap;
          lodash.iteratee = iteratee;
          lodash.keyBy = keyBy;
          lodash.keys = keys;
          lodash.keysIn = keysIn;
          lodash.map = map;
          lodash.mapKeys = mapKeys;
          lodash.mapValues = mapValues;
          lodash.matches = matches;
          lodash.matchesProperty = matchesProperty;
          lodash.memoize = memoize;
          lodash.merge = merge;
          lodash.mergeWith = mergeWith;
          lodash.method = method;
          lodash.methodOf = methodOf;
          lodash.mixin = mixin;
          lodash.negate = negate;
          lodash.nthArg = nthArg;
          lodash.omit = omit;
          lodash.omitBy = omitBy;
          lodash.once = once;
          lodash.orderBy = orderBy;
          lodash.over = over;
          lodash.overArgs = overArgs;
          lodash.overEvery = overEvery;
          lodash.overSome = overSome;
          lodash.partial = partial;
          lodash.partialRight = partialRight;
          lodash.partition = partition;
          lodash.pick = pick;
          lodash.pickBy = pickBy;
          lodash.property = property;
          lodash.propertyOf = propertyOf;
          lodash.pull = pull;
          lodash.pullAll = pullAll;
          lodash.pullAllBy = pullAllBy;
          lodash.pullAllWith = pullAllWith;
          lodash.pullAt = pullAt;
          lodash.range = range;
          lodash.rangeRight = rangeRight;
          lodash.rearg = rearg;
          lodash.reject = reject;
          lodash.remove = remove;
          lodash.rest = rest;
          lodash.reverse = reverse;
          lodash.sampleSize = sampleSize;
          lodash.set = set;
          lodash.setWith = setWith;
          lodash.shuffle = shuffle;
          lodash.slice = slice;
          lodash.sortBy = sortBy;
          lodash.sortedUniq = sortedUniq;
          lodash.sortedUniqBy = sortedUniqBy;
          lodash.split = split;
          lodash.spread = spread;
          lodash.tail = tail;
          lodash.take = take;
          lodash.takeRight = takeRight;
          lodash.takeRightWhile = takeRightWhile;
          lodash.takeWhile = takeWhile;
          lodash.tap = tap;
          lodash.throttle = throttle;
          lodash.thru = thru;
          lodash.toArray = toArray;
          lodash.toPairs = toPairs;
          lodash.toPairsIn = toPairsIn;
          lodash.toPath = toPath;
          lodash.toPlainObject = toPlainObject;
          lodash.transform = transform2;
          lodash.unary = unary;
          lodash.union = union;
          lodash.unionBy = unionBy;
          lodash.unionWith = unionWith;
          lodash.uniq = uniq;
          lodash.uniqBy = uniqBy;
          lodash.uniqWith = uniqWith;
          lodash.unset = unset;
          lodash.unzip = unzip;
          lodash.unzipWith = unzipWith;
          lodash.update = update;
          lodash.updateWith = updateWith;
          lodash.values = values;
          lodash.valuesIn = valuesIn;
          lodash.without = without;
          lodash.words = words;
          lodash.wrap = wrap;
          lodash.xor = xor;
          lodash.xorBy = xorBy;
          lodash.xorWith = xorWith;
          lodash.zip = zip;
          lodash.zipObject = zipObject;
          lodash.zipObjectDeep = zipObjectDeep;
          lodash.zipWith = zipWith;
          lodash.entries = toPairs;
          lodash.entriesIn = toPairsIn;
          lodash.extend = assignIn;
          lodash.extendWith = assignInWith;
          mixin(lodash, lodash);
          lodash.add = add;
          lodash.attempt = attempt;
          lodash.camelCase = camelCase;
          lodash.capitalize = capitalize;
          lodash.ceil = ceil;
          lodash.clamp = clamp;
          lodash.clone = clone;
          lodash.cloneDeep = cloneDeep;
          lodash.cloneDeepWith = cloneDeepWith;
          lodash.cloneWith = cloneWith;
          lodash.conformsTo = conformsTo;
          lodash.deburr = deburr;
          lodash.defaultTo = defaultTo;
          lodash.divide = divide;
          lodash.endsWith = endsWith;
          lodash.eq = eq;
          lodash.escape = escape;
          lodash.escapeRegExp = escapeRegExp;
          lodash.every = every;
          lodash.find = find;
          lodash.findIndex = findIndex;
          lodash.findKey = findKey;
          lodash.findLast = findLast;
          lodash.findLastIndex = findLastIndex;
          lodash.findLastKey = findLastKey;
          lodash.floor = floor;
          lodash.forEach = forEach;
          lodash.forEachRight = forEachRight;
          lodash.forIn = forIn;
          lodash.forInRight = forInRight;
          lodash.forOwn = forOwn;
          lodash.forOwnRight = forOwnRight;
          lodash.get = get;
          lodash.gt = gt;
          lodash.gte = gte;
          lodash.has = has;
          lodash.hasIn = hasIn;
          lodash.head = head;
          lodash.identity = identity;
          lodash.includes = includes;
          lodash.indexOf = indexOf;
          lodash.inRange = inRange;
          lodash.invoke = invoke;
          lodash.isArguments = isArguments;
          lodash.isArray = isArray;
          lodash.isArrayBuffer = isArrayBuffer;
          lodash.isArrayLike = isArrayLike;
          lodash.isArrayLikeObject = isArrayLikeObject;
          lodash.isBoolean = isBoolean;
          lodash.isBuffer = isBuffer;
          lodash.isDate = isDate;
          lodash.isElement = isElement;
          lodash.isEmpty = isEmpty;
          lodash.isEqual = isEqual;
          lodash.isEqualWith = isEqualWith;
          lodash.isError = isError;
          lodash.isFinite = isFinite;
          lodash.isFunction = isFunction;
          lodash.isInteger = isInteger;
          lodash.isLength = isLength;
          lodash.isMap = isMap;
          lodash.isMatch = isMatch;
          lodash.isMatchWith = isMatchWith;
          lodash.isNaN = isNaN2;
          lodash.isNative = isNative;
          lodash.isNil = isNil;
          lodash.isNull = isNull;
          lodash.isNumber = isNumber;
          lodash.isObject = isObject;
          lodash.isObjectLike = isObjectLike;
          lodash.isPlainObject = isPlainObject;
          lodash.isRegExp = isRegExp;
          lodash.isSafeInteger = isSafeInteger;
          lodash.isSet = isSet;
          lodash.isString = isString;
          lodash.isSymbol = isSymbol;
          lodash.isTypedArray = isTypedArray;
          lodash.isUndefined = isUndefined;
          lodash.isWeakMap = isWeakMap;
          lodash.isWeakSet = isWeakSet;
          lodash.join = join;
          lodash.kebabCase = kebabCase;
          lodash.last = last;
          lodash.lastIndexOf = lastIndexOf;
          lodash.lowerCase = lowerCase;
          lodash.lowerFirst = lowerFirst;
          lodash.lt = lt;
          lodash.lte = lte;
          lodash.max = max;
          lodash.maxBy = maxBy;
          lodash.mean = mean;
          lodash.meanBy = meanBy;
          lodash.min = min;
          lodash.minBy = minBy;
          lodash.stubArray = stubArray;
          lodash.stubFalse = stubFalse;
          lodash.stubObject = stubObject;
          lodash.stubString = stubString;
          lodash.stubTrue = stubTrue;
          lodash.multiply = multiply;
          lodash.nth = nth;
          lodash.noConflict = noConflict;
          lodash.noop = noop;
          lodash.now = now;
          lodash.pad = pad;
          lodash.padEnd = padEnd;
          lodash.padStart = padStart;
          lodash.parseInt = parseInt2;
          lodash.random = random;
          lodash.reduce = reduce;
          lodash.reduceRight = reduceRight;
          lodash.repeat = repeat;
          lodash.replace = replace;
          lodash.result = result;
          lodash.round = round;
          lodash.runInContext = runInContext2;
          lodash.sample = sample;
          lodash.size = size;
          lodash.snakeCase = snakeCase;
          lodash.some = some;
          lodash.sortedIndex = sortedIndex;
          lodash.sortedIndexBy = sortedIndexBy;
          lodash.sortedIndexOf = sortedIndexOf;
          lodash.sortedLastIndex = sortedLastIndex;
          lodash.sortedLastIndexBy = sortedLastIndexBy;
          lodash.sortedLastIndexOf = sortedLastIndexOf;
          lodash.startCase = startCase;
          lodash.startsWith = startsWith;
          lodash.subtract = subtract;
          lodash.sum = sum;
          lodash.sumBy = sumBy;
          lodash.template = template;
          lodash.times = times;
          lodash.toFinite = toFinite;
          lodash.toInteger = toInteger;
          lodash.toLength = toLength;
          lodash.toLower = toLower;
          lodash.toNumber = toNumber;
          lodash.toSafeInteger = toSafeInteger;
          lodash.toString = toString;
          lodash.toUpper = toUpper;
          lodash.trim = trim;
          lodash.trimEnd = trimEnd;
          lodash.trimStart = trimStart;
          lodash.truncate = truncate;
          lodash.unescape = unescape;
          lodash.uniqueId = uniqueId;
          lodash.upperCase = upperCase;
          lodash.upperFirst = upperFirst;
          lodash.each = forEach;
          lodash.eachRight = forEachRight;
          lodash.first = head;
          mixin(lodash, function() {
            var source = {};
            baseForOwn(lodash, function(func, methodName) {
              if (!hasOwnProperty.call(lodash.prototype, methodName)) {
                source[methodName] = func;
              }
            });
            return source;
          }(), { "chain": false });
          lodash.VERSION = VERSION;
          arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
            lodash[methodName].placeholder = lodash;
          });
          arrayEach(["drop", "take"], function(methodName, index) {
            LazyWrapper.prototype[methodName] = function(n) {
              n = n === undefined ? 1 : nativeMax(toInteger(n), 0);
              var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
              if (result2.__filtered__) {
                result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
              } else {
                result2.__views__.push({
                  "size": nativeMin(n, MAX_ARRAY_LENGTH),
                  "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
                });
              }
              return result2;
            };
            LazyWrapper.prototype[methodName + "Right"] = function(n) {
              return this.reverse()[methodName](n).reverse();
            };
          });
          arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
            var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
            LazyWrapper.prototype[methodName] = function(iteratee2) {
              var result2 = this.clone();
              result2.__iteratees__.push({
                "iteratee": getIteratee(iteratee2, 3),
                "type": type
              });
              result2.__filtered__ = result2.__filtered__ || isFilter;
              return result2;
            };
          });
          arrayEach(["head", "last"], function(methodName, index) {
            var takeName = "take" + (index ? "Right" : "");
            LazyWrapper.prototype[methodName] = function() {
              return this[takeName](1).value()[0];
            };
          });
          arrayEach(["initial", "tail"], function(methodName, index) {
            var dropName = "drop" + (index ? "" : "Right");
            LazyWrapper.prototype[methodName] = function() {
              return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
            };
          });
          LazyWrapper.prototype.compact = function() {
            return this.filter(identity);
          };
          LazyWrapper.prototype.find = function(predicate) {
            return this.filter(predicate).head();
          };
          LazyWrapper.prototype.findLast = function(predicate) {
            return this.reverse().find(predicate);
          };
          LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
            if (typeof path == "function") {
              return new LazyWrapper(this);
            }
            return this.map(function(value) {
              return baseInvoke(value, path, args);
            });
          });
          LazyWrapper.prototype.reject = function(predicate) {
            return this.filter(negate(getIteratee(predicate)));
          };
          LazyWrapper.prototype.slice = function(start, end) {
            start = toInteger(start);
            var result2 = this;
            if (result2.__filtered__ && (start > 0 || end < 0)) {
              return new LazyWrapper(result2);
            }
            if (start < 0) {
              result2 = result2.takeRight(-start);
            } else if (start) {
              result2 = result2.drop(start);
            }
            if (end !== undefined) {
              end = toInteger(end);
              result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
            }
            return result2;
          };
          LazyWrapper.prototype.takeRightWhile = function(predicate) {
            return this.reverse().takeWhile(predicate).reverse();
          };
          LazyWrapper.prototype.toArray = function() {
            return this.take(MAX_ARRAY_LENGTH);
          };
          baseForOwn(LazyWrapper.prototype, function(func, methodName) {
            var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
            if (!lodashFunc) {
              return;
            }
            lodash.prototype[methodName] = function() {
              var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray(value);
              var interceptor = /* @__PURE__ */ __name(function(value2) {
                var result3 = lodashFunc.apply(lodash, arrayPush([value2], args));
                return isTaker && chainAll ? result3[0] : result3;
              }, "interceptor");
              if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
                isLazy = useLazy = false;
              }
              var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
              if (!retUnwrapped && useLazy) {
                value = onlyLazy ? value : new LazyWrapper(this);
                var result2 = func.apply(value, args);
                result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined });
                return new LodashWrapper(result2, chainAll);
              }
              if (isUnwrapped && onlyLazy) {
                return func.apply(this, args);
              }
              result2 = this.thru(interceptor);
              return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
            };
          });
          arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
            var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
            lodash.prototype[methodName] = function() {
              var args = arguments;
              if (retUnwrapped && !this.__chain__) {
                var value = this.value();
                return func.apply(isArray(value) ? value : [], args);
              }
              return this[chainName](function(value2) {
                return func.apply(isArray(value2) ? value2 : [], args);
              });
            };
          });
          baseForOwn(LazyWrapper.prototype, function(func, methodName) {
            var lodashFunc = lodash[methodName];
            if (lodashFunc) {
              var key = lodashFunc.name + "";
              if (!hasOwnProperty.call(realNames, key)) {
                realNames[key] = [];
              }
              realNames[key].push({ "name": methodName, "func": lodashFunc });
            }
          });
          realNames[createHybrid(undefined, WRAP_BIND_KEY_FLAG).name] = [{
            "name": "wrapper",
            "func": undefined
          }];
          LazyWrapper.prototype.clone = lazyClone;
          LazyWrapper.prototype.reverse = lazyReverse;
          LazyWrapper.prototype.value = lazyValue;
          lodash.prototype.at = wrapperAt;
          lodash.prototype.chain = wrapperChain;
          lodash.prototype.commit = wrapperCommit;
          lodash.prototype.next = wrapperNext;
          lodash.prototype.plant = wrapperPlant;
          lodash.prototype.reverse = wrapperReverse;
          lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
          lodash.prototype.first = lodash.prototype.head;
          if (symIterator) {
            lodash.prototype[symIterator] = wrapperToIterator;
          }
          return lodash;
        }, "runInContext");
        var _ = runInContext();
        if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
          root._ = _;
          define(function() {
            return _;
          });
        } else if (freeModule) {
          (freeModule.exports = _)._ = _;
          freeExports._ = _;
        } else {
          root._ = _;
        }
      }).call(exports);
    }
  });

  // ../../node_modules/esbuild-wasm/lib/browser.js
  var require_browser = __commonJS({
    "../../node_modules/esbuild-wasm/lib/browser.js"(exports, module) {
      init_define_process();
      ((module2) => {
        "use strict";
        var __defProp2 = Object.defineProperty;
        var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
        var __getOwnPropNames2 = Object.getOwnPropertyNames;
        var __hasOwnProp2 = Object.prototype.hasOwnProperty;
        var __export = /* @__PURE__ */ __name((target, all) => {
          for (var name in all)
            __defProp2(target, name, { get: all[name], enumerable: true });
        }, "__export");
        var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
          if (from && typeof from === "object" || typeof from === "function") {
            for (let key of __getOwnPropNames2(from))
              if (!__hasOwnProp2.call(to, key) && key !== except)
                __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
          }
          return to;
        }, "__copyProps");
        var __toCommonJS = /* @__PURE__ */ __name((mod2) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod2), "__toCommonJS");
        var __async = /* @__PURE__ */ __name((__this, __arguments, generator) => {
          return new Promise((resolve, reject) => {
            var fulfilled = /* @__PURE__ */ __name((value) => {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }, "fulfilled");
            var rejected = /* @__PURE__ */ __name((value) => {
              try {
                step(generator.throw(value));
              } catch (e) {
                reject(e);
              }
            }, "rejected");
            var step = /* @__PURE__ */ __name((x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected), "step");
            step((generator = generator.apply(__this, __arguments)).next());
          });
        }, "__async");
        var browser_exports = {};
        __export(browser_exports, {
          analyzeMetafile: () => analyzeMetafile,
          analyzeMetafileSync: () => analyzeMetafileSync,
          build: () => build,
          buildSync: () => buildSync,
          default: () => browser_default,
          formatMessages: () => formatMessages,
          formatMessagesSync: () => formatMessagesSync,
          initialize: () => initialize2,
          serve: () => serve,
          transform: () => transform2,
          transformSync: () => transformSync,
          version: () => version
        });
        module2.exports = __toCommonJS(browser_exports);
        function encodePacket(packet) {
          let visit = /* @__PURE__ */ __name((value) => {
            if (value === null) {
              bb.write8(0);
            } else if (typeof value === "boolean") {
              bb.write8(1);
              bb.write8(+value);
            } else if (typeof value === "number") {
              bb.write8(2);
              bb.write32(value | 0);
            } else if (typeof value === "string") {
              bb.write8(3);
              bb.write(encodeUTF8(value));
            } else if (value instanceof Uint8Array) {
              bb.write8(4);
              bb.write(value);
            } else if (value instanceof Array) {
              bb.write8(5);
              bb.write32(value.length);
              for (let item of value) {
                visit(item);
              }
            } else {
              let keys = Object.keys(value);
              bb.write8(6);
              bb.write32(keys.length);
              for (let key of keys) {
                bb.write(encodeUTF8(key));
                visit(value[key]);
              }
            }
          }, "visit");
          let bb = new ByteBuffer();
          bb.write32(0);
          bb.write32(packet.id << 1 | +!packet.isRequest);
          visit(packet.value);
          writeUInt32LE(bb.buf, bb.len - 4, 0);
          return bb.buf.subarray(0, bb.len);
        }
        __name(encodePacket, "encodePacket");
        function decodePacket(bytes) {
          let visit = /* @__PURE__ */ __name(() => {
            switch (bb.read8()) {
              case 0:
                return null;
              case 1:
                return !!bb.read8();
              case 2:
                return bb.read32();
              case 3:
                return decodeUTF8(bb.read());
              case 4:
                return bb.read();
              case 5: {
                let count = bb.read32();
                let value2 = [];
                for (let i = 0; i < count; i++) {
                  value2.push(visit());
                }
                return value2;
              }
              case 6: {
                let count = bb.read32();
                let value2 = {};
                for (let i = 0; i < count; i++) {
                  value2[decodeUTF8(bb.read())] = visit();
                }
                return value2;
              }
              default:
                throw new Error("Invalid packet");
            }
          }, "visit");
          let bb = new ByteBuffer(bytes);
          let id = bb.read32();
          let isRequest = (id & 1) === 0;
          id >>>= 1;
          let value = visit();
          if (bb.ptr !== bytes.length) {
            throw new Error("Invalid packet");
          }
          return { id, isRequest, value };
        }
        __name(decodePacket, "decodePacket");
        var ByteBuffer = /* @__PURE__ */ __name(class {
          constructor(buf = new Uint8Array(1024)) {
            this.buf = buf;
            this.len = 0;
            this.ptr = 0;
          }
          _write(delta) {
            if (this.len + delta > this.buf.length) {
              let clone = new Uint8Array((this.len + delta) * 2);
              clone.set(this.buf);
              this.buf = clone;
            }
            this.len += delta;
            return this.len - delta;
          }
          write8(value) {
            let offset = this._write(1);
            this.buf[offset] = value;
          }
          write32(value) {
            let offset = this._write(4);
            writeUInt32LE(this.buf, value, offset);
          }
          write(bytes) {
            let offset = this._write(4 + bytes.length);
            writeUInt32LE(this.buf, bytes.length, offset);
            this.buf.set(bytes, offset + 4);
          }
          _read(delta) {
            if (this.ptr + delta > this.buf.length) {
              throw new Error("Invalid packet");
            }
            this.ptr += delta;
            return this.ptr - delta;
          }
          read8() {
            return this.buf[this._read(1)];
          }
          read32() {
            return readUInt32LE(this.buf, this._read(4));
          }
          read() {
            let length = this.read32();
            let bytes = new Uint8Array(length);
            let ptr = this._read(bytes.length);
            bytes.set(this.buf.subarray(ptr, ptr + length));
            return bytes;
          }
        }, "ByteBuffer");
        var encodeUTF8;
        var decodeUTF8;
        var encodeInvariant;
        if (typeof TextEncoder !== "undefined" && typeof TextDecoder !== "undefined") {
          let encoder = new TextEncoder();
          let decoder = new TextDecoder();
          encodeUTF8 = /* @__PURE__ */ __name((text) => encoder.encode(text), "encodeUTF8");
          decodeUTF8 = /* @__PURE__ */ __name((bytes) => decoder.decode(bytes), "decodeUTF8");
          encodeInvariant = 'new TextEncoder().encode("")';
        } else if (typeof Buffer !== "undefined") {
          encodeUTF8 = /* @__PURE__ */ __name((text) => Buffer.from(text), "encodeUTF8");
          decodeUTF8 = /* @__PURE__ */ __name((bytes) => {
            let { buffer, byteOffset, byteLength } = bytes;
            return Buffer.from(buffer, byteOffset, byteLength).toString();
          }, "decodeUTF8");
          encodeInvariant = 'Buffer.from("")';
        } else {
          throw new Error("No UTF-8 codec found");
        }
        if (!(encodeUTF8("") instanceof Uint8Array))
          throw new Error(`Invariant violation: "${encodeInvariant} instanceof Uint8Array" is incorrectly false

This indicates that your JavaScript environment is broken. You cannot use
esbuild in this environment because esbuild relies on this invariant. This
is not a problem with esbuild. You need to fix your environment instead.
`);
        function readUInt32LE(buffer, offset) {
          return buffer[offset++] | buffer[offset++] << 8 | buffer[offset++] << 16 | buffer[offset++] << 24;
        }
        __name(readUInt32LE, "readUInt32LE");
        function writeUInt32LE(buffer, value, offset) {
          buffer[offset++] = value;
          buffer[offset++] = value >> 8;
          buffer[offset++] = value >> 16;
          buffer[offset++] = value >> 24;
        }
        __name(writeUInt32LE, "writeUInt32LE");
        var quote = JSON.stringify;
        var buildLogLevelDefault = "warning";
        var transformLogLevelDefault = "silent";
        function validateTarget(target) {
          validateStringValue(target, "target");
          if (target.indexOf(",") >= 0)
            throw new Error(`Invalid target: ${target}`);
          return target;
        }
        __name(validateTarget, "validateTarget");
        var canBeAnything = /* @__PURE__ */ __name(() => null, "canBeAnything");
        var mustBeBoolean = /* @__PURE__ */ __name((value) => typeof value === "boolean" ? null : "a boolean", "mustBeBoolean");
        var mustBeBooleanOrObject = /* @__PURE__ */ __name((value) => typeof value === "boolean" || typeof value === "object" && !Array.isArray(value) ? null : "a boolean or an object", "mustBeBooleanOrObject");
        var mustBeString = /* @__PURE__ */ __name((value) => typeof value === "string" ? null : "a string", "mustBeString");
        var mustBeRegExp = /* @__PURE__ */ __name((value) => value instanceof RegExp ? null : "a RegExp object", "mustBeRegExp");
        var mustBeInteger = /* @__PURE__ */ __name((value) => typeof value === "number" && value === (value | 0) ? null : "an integer", "mustBeInteger");
        var mustBeFunction = /* @__PURE__ */ __name((value) => typeof value === "function" ? null : "a function", "mustBeFunction");
        var mustBeArray = /* @__PURE__ */ __name((value) => Array.isArray(value) ? null : "an array", "mustBeArray");
        var mustBeObject = /* @__PURE__ */ __name((value) => typeof value === "object" && value !== null && !Array.isArray(value) ? null : "an object", "mustBeObject");
        var mustBeWebAssemblyModule = /* @__PURE__ */ __name((value) => value instanceof WebAssembly.Module ? null : "a WebAssembly.Module", "mustBeWebAssemblyModule");
        var mustBeArrayOrRecord = /* @__PURE__ */ __name((value) => typeof value === "object" && value !== null ? null : "an array or an object", "mustBeArrayOrRecord");
        var mustBeObjectOrNull = /* @__PURE__ */ __name((value) => typeof value === "object" && !Array.isArray(value) ? null : "an object or null", "mustBeObjectOrNull");
        var mustBeStringOrBoolean = /* @__PURE__ */ __name((value) => typeof value === "string" || typeof value === "boolean" ? null : "a string or a boolean", "mustBeStringOrBoolean");
        var mustBeStringOrObject = /* @__PURE__ */ __name((value) => typeof value === "string" || typeof value === "object" && value !== null && !Array.isArray(value) ? null : "a string or an object", "mustBeStringOrObject");
        var mustBeStringOrArray = /* @__PURE__ */ __name((value) => typeof value === "string" || Array.isArray(value) ? null : "a string or an array", "mustBeStringOrArray");
        var mustBeStringOrUint8Array = /* @__PURE__ */ __name((value) => typeof value === "string" || value instanceof Uint8Array ? null : "a string or a Uint8Array", "mustBeStringOrUint8Array");
        var mustBeStringOrURL = /* @__PURE__ */ __name((value) => typeof value === "string" || value instanceof URL ? null : "a string or a URL", "mustBeStringOrURL");
        function getFlag(object, keys, key, mustBeFn) {
          let value = object[key];
          keys[key + ""] = true;
          if (value === void 0)
            return void 0;
          let mustBe = mustBeFn(value);
          if (mustBe !== null)
            throw new Error(`${quote(key)} must be ${mustBe}`);
          return value;
        }
        __name(getFlag, "getFlag");
        function checkForInvalidFlags(object, keys, where) {
          for (let key in object) {
            if (!(key in keys)) {
              throw new Error(`Invalid option ${where}: ${quote(key)}`);
            }
          }
        }
        __name(checkForInvalidFlags, "checkForInvalidFlags");
        function validateInitializeOptions(options) {
          let keys = /* @__PURE__ */ Object.create(null);
          let wasmURL = getFlag(options, keys, "wasmURL", mustBeStringOrURL);
          let wasmModule = getFlag(options, keys, "wasmModule", mustBeWebAssemblyModule);
          let worker = getFlag(options, keys, "worker", mustBeBoolean);
          checkForInvalidFlags(options, keys, "in initialize() call");
          return {
            wasmURL,
            wasmModule,
            worker
          };
        }
        __name(validateInitializeOptions, "validateInitializeOptions");
        function validateMangleCache(mangleCache) {
          let validated;
          if (mangleCache !== void 0) {
            validated = /* @__PURE__ */ Object.create(null);
            for (let key in mangleCache) {
              let value = mangleCache[key];
              if (typeof value === "string" || value === false) {
                validated[key] = value;
              } else {
                throw new Error(`Expected ${quote(key)} in mangle cache to map to either a string or false`);
              }
            }
          }
          return validated;
        }
        __name(validateMangleCache, "validateMangleCache");
        function pushLogFlags(flags, options, keys, isTTY, logLevelDefault) {
          let color = getFlag(options, keys, "color", mustBeBoolean);
          let logLevel = getFlag(options, keys, "logLevel", mustBeString);
          let logLimit = getFlag(options, keys, "logLimit", mustBeInteger);
          if (color !== void 0)
            flags.push(`--color=${color}`);
          else if (isTTY)
            flags.push(`--color=true`);
          flags.push(`--log-level=${logLevel || logLevelDefault}`);
          flags.push(`--log-limit=${logLimit || 0}`);
        }
        __name(pushLogFlags, "pushLogFlags");
        function validateStringValue(value, what, key) {
          if (typeof value !== "string") {
            throw new Error(`Expected value for ${what}${key !== void 0 ? " " + quote(key) : ""} to be a string, got ${typeof value} instead`);
          }
          return value;
        }
        __name(validateStringValue, "validateStringValue");
        function pushCommonFlags(flags, options, keys) {
          let legalComments = getFlag(options, keys, "legalComments", mustBeString);
          let sourceRoot = getFlag(options, keys, "sourceRoot", mustBeString);
          let sourcesContent = getFlag(options, keys, "sourcesContent", mustBeBoolean);
          let target = getFlag(options, keys, "target", mustBeStringOrArray);
          let format = getFlag(options, keys, "format", mustBeString);
          let globalName = getFlag(options, keys, "globalName", mustBeString);
          let mangleProps = getFlag(options, keys, "mangleProps", mustBeRegExp);
          let reserveProps = getFlag(options, keys, "reserveProps", mustBeRegExp);
          let mangleQuoted = getFlag(options, keys, "mangleQuoted", mustBeBoolean);
          let minify = getFlag(options, keys, "minify", mustBeBoolean);
          let minifySyntax = getFlag(options, keys, "minifySyntax", mustBeBoolean);
          let minifyWhitespace = getFlag(options, keys, "minifyWhitespace", mustBeBoolean);
          let minifyIdentifiers = getFlag(options, keys, "minifyIdentifiers", mustBeBoolean);
          let drop = getFlag(options, keys, "drop", mustBeArray);
          let charset = getFlag(options, keys, "charset", mustBeString);
          let treeShaking = getFlag(options, keys, "treeShaking", mustBeBoolean);
          let ignoreAnnotations = getFlag(options, keys, "ignoreAnnotations", mustBeBoolean);
          let jsx = getFlag(options, keys, "jsx", mustBeString);
          let jsxFactory = getFlag(options, keys, "jsxFactory", mustBeString);
          let jsxFragment = getFlag(options, keys, "jsxFragment", mustBeString);
          let jsxImportSource = getFlag(options, keys, "jsxImportSource", mustBeString);
          let jsxDev = getFlag(options, keys, "jsxDev", mustBeBoolean);
          let jsxSideEffects = getFlag(options, keys, "jsxSideEffects", mustBeBoolean);
          let define2 = getFlag(options, keys, "define", mustBeObject);
          let logOverride = getFlag(options, keys, "logOverride", mustBeObject);
          let supported = getFlag(options, keys, "supported", mustBeObject);
          let pure = getFlag(options, keys, "pure", mustBeArray);
          let keepNames = getFlag(options, keys, "keepNames", mustBeBoolean);
          let platform = getFlag(options, keys, "platform", mustBeString);
          if (legalComments)
            flags.push(`--legal-comments=${legalComments}`);
          if (sourceRoot !== void 0)
            flags.push(`--source-root=${sourceRoot}`);
          if (sourcesContent !== void 0)
            flags.push(`--sources-content=${sourcesContent}`);
          if (target) {
            if (Array.isArray(target))
              flags.push(`--target=${Array.from(target).map(validateTarget).join(",")}`);
            else
              flags.push(`--target=${validateTarget(target)}`);
          }
          if (format)
            flags.push(`--format=${format}`);
          if (globalName)
            flags.push(`--global-name=${globalName}`);
          if (platform)
            flags.push(`--platform=${platform}`);
          if (minify)
            flags.push("--minify");
          if (minifySyntax)
            flags.push("--minify-syntax");
          if (minifyWhitespace)
            flags.push("--minify-whitespace");
          if (minifyIdentifiers)
            flags.push("--minify-identifiers");
          if (charset)
            flags.push(`--charset=${charset}`);
          if (treeShaking !== void 0)
            flags.push(`--tree-shaking=${treeShaking}`);
          if (ignoreAnnotations)
            flags.push(`--ignore-annotations`);
          if (drop)
            for (let what of drop)
              flags.push(`--drop:${validateStringValue(what, "drop")}`);
          if (mangleProps)
            flags.push(`--mangle-props=${mangleProps.source}`);
          if (reserveProps)
            flags.push(`--reserve-props=${reserveProps.source}`);
          if (mangleQuoted !== void 0)
            flags.push(`--mangle-quoted=${mangleQuoted}`);
          if (jsx)
            flags.push(`--jsx=${jsx}`);
          if (jsxFactory)
            flags.push(`--jsx-factory=${jsxFactory}`);
          if (jsxFragment)
            flags.push(`--jsx-fragment=${jsxFragment}`);
          if (jsxImportSource)
            flags.push(`--jsx-import-source=${jsxImportSource}`);
          if (jsxDev)
            flags.push(`--jsx-dev`);
          if (jsxSideEffects)
            flags.push(`--jsx-side-effects`);
          if (define2) {
            for (let key in define2) {
              if (key.indexOf("=") >= 0)
                throw new Error(`Invalid define: ${key}`);
              flags.push(`--define:${key}=${validateStringValue(define2[key], "define", key)}`);
            }
          }
          if (logOverride) {
            for (let key in logOverride) {
              if (key.indexOf("=") >= 0)
                throw new Error(`Invalid log override: ${key}`);
              flags.push(`--log-override:${key}=${validateStringValue(logOverride[key], "log override", key)}`);
            }
          }
          if (supported) {
            for (let key in supported) {
              if (key.indexOf("=") >= 0)
                throw new Error(`Invalid supported: ${key}`);
              const value = supported[key];
              if (typeof value !== "boolean")
                throw new Error(`Expected value for supported ${quote(key)} to be a boolean, got ${typeof value} instead`);
              flags.push(`--supported:${key}=${value}`);
            }
          }
          if (pure)
            for (let fn of pure)
              flags.push(`--pure:${validateStringValue(fn, "pure")}`);
          if (keepNames)
            flags.push(`--keep-names`);
        }
        __name(pushCommonFlags, "pushCommonFlags");
        function flagsForBuildOptions(callName, options, isTTY, logLevelDefault, writeDefault) {
          var _a;
          let flags = [];
          let entries = [];
          let keys = /* @__PURE__ */ Object.create(null);
          let stdinContents = null;
          let stdinResolveDir = null;
          let watchMode = null;
          pushLogFlags(flags, options, keys, isTTY, logLevelDefault);
          pushCommonFlags(flags, options, keys);
          let sourcemap = getFlag(options, keys, "sourcemap", mustBeStringOrBoolean);
          let bundle = getFlag(options, keys, "bundle", mustBeBoolean);
          let watch = getFlag(options, keys, "watch", mustBeBooleanOrObject);
          let splitting = getFlag(options, keys, "splitting", mustBeBoolean);
          let preserveSymlinks = getFlag(options, keys, "preserveSymlinks", mustBeBoolean);
          let metafile = getFlag(options, keys, "metafile", mustBeBoolean);
          let outfile = getFlag(options, keys, "outfile", mustBeString);
          let outdir = getFlag(options, keys, "outdir", mustBeString);
          let outbase = getFlag(options, keys, "outbase", mustBeString);
          let tsconfig = getFlag(options, keys, "tsconfig", mustBeString);
          let resolveExtensions = getFlag(options, keys, "resolveExtensions", mustBeArray);
          let nodePathsInput = getFlag(options, keys, "nodePaths", mustBeArray);
          let mainFields = getFlag(options, keys, "mainFields", mustBeArray);
          let conditions = getFlag(options, keys, "conditions", mustBeArray);
          let external = getFlag(options, keys, "external", mustBeArray);
          let alias = getFlag(options, keys, "alias", mustBeObject);
          let loader = getFlag(options, keys, "loader", mustBeObject);
          let outExtension = getFlag(options, keys, "outExtension", mustBeObject);
          let publicPath = getFlag(options, keys, "publicPath", mustBeString);
          let entryNames = getFlag(options, keys, "entryNames", mustBeString);
          let chunkNames = getFlag(options, keys, "chunkNames", mustBeString);
          let assetNames = getFlag(options, keys, "assetNames", mustBeString);
          let inject = getFlag(options, keys, "inject", mustBeArray);
          let banner = getFlag(options, keys, "banner", mustBeObject);
          let footer = getFlag(options, keys, "footer", mustBeObject);
          let entryPoints = getFlag(options, keys, "entryPoints", mustBeArrayOrRecord);
          let absWorkingDir = getFlag(options, keys, "absWorkingDir", mustBeString);
          let stdin = getFlag(options, keys, "stdin", mustBeObject);
          let write = (_a = getFlag(options, keys, "write", mustBeBoolean)) != null ? _a : writeDefault;
          let allowOverwrite = getFlag(options, keys, "allowOverwrite", mustBeBoolean);
          let incremental = getFlag(options, keys, "incremental", mustBeBoolean) === true;
          let mangleCache = getFlag(options, keys, "mangleCache", mustBeObject);
          keys.plugins = true;
          checkForInvalidFlags(options, keys, `in ${callName}() call`);
          if (sourcemap)
            flags.push(`--sourcemap${sourcemap === true ? "" : `=${sourcemap}`}`);
          if (bundle)
            flags.push("--bundle");
          if (allowOverwrite)
            flags.push("--allow-overwrite");
          if (watch) {
            flags.push("--watch");
            if (typeof watch === "boolean") {
              watchMode = {};
            } else {
              let watchKeys = /* @__PURE__ */ Object.create(null);
              let onRebuild = getFlag(watch, watchKeys, "onRebuild", mustBeFunction);
              checkForInvalidFlags(watch, watchKeys, `on "watch" in ${callName}() call`);
              watchMode = { onRebuild };
            }
          }
          if (splitting)
            flags.push("--splitting");
          if (preserveSymlinks)
            flags.push("--preserve-symlinks");
          if (metafile)
            flags.push(`--metafile`);
          if (outfile)
            flags.push(`--outfile=${outfile}`);
          if (outdir)
            flags.push(`--outdir=${outdir}`);
          if (outbase)
            flags.push(`--outbase=${outbase}`);
          if (tsconfig)
            flags.push(`--tsconfig=${tsconfig}`);
          if (resolveExtensions) {
            let values = [];
            for (let value of resolveExtensions) {
              validateStringValue(value, "resolve extension");
              if (value.indexOf(",") >= 0)
                throw new Error(`Invalid resolve extension: ${value}`);
              values.push(value);
            }
            flags.push(`--resolve-extensions=${values.join(",")}`);
          }
          if (publicPath)
            flags.push(`--public-path=${publicPath}`);
          if (entryNames)
            flags.push(`--entry-names=${entryNames}`);
          if (chunkNames)
            flags.push(`--chunk-names=${chunkNames}`);
          if (assetNames)
            flags.push(`--asset-names=${assetNames}`);
          if (mainFields) {
            let values = [];
            for (let value of mainFields) {
              validateStringValue(value, "main field");
              if (value.indexOf(",") >= 0)
                throw new Error(`Invalid main field: ${value}`);
              values.push(value);
            }
            flags.push(`--main-fields=${values.join(",")}`);
          }
          if (conditions) {
            let values = [];
            for (let value of conditions) {
              validateStringValue(value, "condition");
              if (value.indexOf(",") >= 0)
                throw new Error(`Invalid condition: ${value}`);
              values.push(value);
            }
            flags.push(`--conditions=${values.join(",")}`);
          }
          if (external)
            for (let name of external)
              flags.push(`--external:${validateStringValue(name, "external")}`);
          if (alias) {
            for (let old in alias) {
              if (old.indexOf("=") >= 0)
                throw new Error(`Invalid package name in alias: ${old}`);
              flags.push(`--alias:${old}=${validateStringValue(alias[old], "alias", old)}`);
            }
          }
          if (banner) {
            for (let type in banner) {
              if (type.indexOf("=") >= 0)
                throw new Error(`Invalid banner file type: ${type}`);
              flags.push(`--banner:${type}=${validateStringValue(banner[type], "banner", type)}`);
            }
          }
          if (footer) {
            for (let type in footer) {
              if (type.indexOf("=") >= 0)
                throw new Error(`Invalid footer file type: ${type}`);
              flags.push(`--footer:${type}=${validateStringValue(footer[type], "footer", type)}`);
            }
          }
          if (inject)
            for (let path of inject)
              flags.push(`--inject:${validateStringValue(path, "inject")}`);
          if (loader) {
            for (let ext in loader) {
              if (ext.indexOf("=") >= 0)
                throw new Error(`Invalid loader extension: ${ext}`);
              flags.push(`--loader:${ext}=${validateStringValue(loader[ext], "loader", ext)}`);
            }
          }
          if (outExtension) {
            for (let ext in outExtension) {
              if (ext.indexOf("=") >= 0)
                throw new Error(`Invalid out extension: ${ext}`);
              flags.push(`--out-extension:${ext}=${validateStringValue(outExtension[ext], "out extension", ext)}`);
            }
          }
          if (entryPoints) {
            if (Array.isArray(entryPoints)) {
              for (let entryPoint of entryPoints) {
                entries.push(["", validateStringValue(entryPoint, "entry point")]);
              }
            } else {
              for (let key in entryPoints) {
                entries.push([key, validateStringValue(entryPoints[key], "entry point", key)]);
              }
            }
          }
          if (stdin) {
            let stdinKeys = /* @__PURE__ */ Object.create(null);
            let contents = getFlag(stdin, stdinKeys, "contents", mustBeStringOrUint8Array);
            let resolveDir = getFlag(stdin, stdinKeys, "resolveDir", mustBeString);
            let sourcefile = getFlag(stdin, stdinKeys, "sourcefile", mustBeString);
            let loader2 = getFlag(stdin, stdinKeys, "loader", mustBeString);
            checkForInvalidFlags(stdin, stdinKeys, 'in "stdin" object');
            if (sourcefile)
              flags.push(`--sourcefile=${sourcefile}`);
            if (loader2)
              flags.push(`--loader=${loader2}`);
            if (resolveDir)
              stdinResolveDir = resolveDir;
            if (typeof contents === "string")
              stdinContents = encodeUTF8(contents);
            else if (contents instanceof Uint8Array)
              stdinContents = contents;
          }
          let nodePaths = [];
          if (nodePathsInput) {
            for (let value of nodePathsInput) {
              value += "";
              nodePaths.push(value);
            }
          }
          return {
            entries,
            flags,
            write,
            stdinContents,
            stdinResolveDir,
            absWorkingDir,
            incremental,
            nodePaths,
            watch: watchMode,
            mangleCache: validateMangleCache(mangleCache)
          };
        }
        __name(flagsForBuildOptions, "flagsForBuildOptions");
        function flagsForTransformOptions(callName, options, isTTY, logLevelDefault) {
          let flags = [];
          let keys = /* @__PURE__ */ Object.create(null);
          pushLogFlags(flags, options, keys, isTTY, logLevelDefault);
          pushCommonFlags(flags, options, keys);
          let sourcemap = getFlag(options, keys, "sourcemap", mustBeStringOrBoolean);
          let tsconfigRaw = getFlag(options, keys, "tsconfigRaw", mustBeStringOrObject);
          let sourcefile = getFlag(options, keys, "sourcefile", mustBeString);
          let loader = getFlag(options, keys, "loader", mustBeString);
          let banner = getFlag(options, keys, "banner", mustBeString);
          let footer = getFlag(options, keys, "footer", mustBeString);
          let mangleCache = getFlag(options, keys, "mangleCache", mustBeObject);
          checkForInvalidFlags(options, keys, `in ${callName}() call`);
          if (sourcemap)
            flags.push(`--sourcemap=${sourcemap === true ? "external" : sourcemap}`);
          if (tsconfigRaw)
            flags.push(`--tsconfig-raw=${typeof tsconfigRaw === "string" ? tsconfigRaw : JSON.stringify(tsconfigRaw)}`);
          if (sourcefile)
            flags.push(`--sourcefile=${sourcefile}`);
          if (loader)
            flags.push(`--loader=${loader}`);
          if (banner)
            flags.push(`--banner=${banner}`);
          if (footer)
            flags.push(`--footer=${footer}`);
          return {
            flags,
            mangleCache: validateMangleCache(mangleCache)
          };
        }
        __name(flagsForTransformOptions, "flagsForTransformOptions");
        function createChannel(streamIn) {
          const requestCallbacksByKey = {};
          const closeData = { didClose: false, reason: "" };
          let responseCallbacks = {};
          let nextRequestID = 0;
          let nextBuildKey = 0;
          let stdout = new Uint8Array(16 * 1024);
          let stdoutUsed = 0;
          let readFromStdout = /* @__PURE__ */ __name((chunk) => {
            let limit = stdoutUsed + chunk.length;
            if (limit > stdout.length) {
              let swap = new Uint8Array(limit * 2);
              swap.set(stdout);
              stdout = swap;
            }
            stdout.set(chunk, stdoutUsed);
            stdoutUsed += chunk.length;
            let offset = 0;
            while (offset + 4 <= stdoutUsed) {
              let length = readUInt32LE(stdout, offset);
              if (offset + 4 + length > stdoutUsed) {
                break;
              }
              offset += 4;
              handleIncomingPacket(stdout.subarray(offset, offset + length));
              offset += length;
            }
            if (offset > 0) {
              stdout.copyWithin(0, offset, stdoutUsed);
              stdoutUsed -= offset;
            }
          }, "readFromStdout");
          let afterClose = /* @__PURE__ */ __name((error) => {
            closeData.didClose = true;
            if (error)
              closeData.reason = ": " + (error.message || error);
            const text = "The service was stopped" + closeData.reason;
            for (let id in responseCallbacks) {
              responseCallbacks[id](text, null);
            }
            responseCallbacks = {};
          }, "afterClose");
          let sendRequest = /* @__PURE__ */ __name((refs, value, callback) => {
            if (closeData.didClose)
              return callback("The service is no longer running" + closeData.reason, null);
            let id = nextRequestID++;
            responseCallbacks[id] = (error, response) => {
              try {
                callback(error, response);
              } finally {
                if (refs)
                  refs.unref();
              }
            };
            if (refs)
              refs.ref();
            streamIn.writeToStdin(encodePacket({ id, isRequest: true, value }));
          }, "sendRequest");
          let sendResponse = /* @__PURE__ */ __name((id, value) => {
            if (closeData.didClose)
              throw new Error("The service is no longer running" + closeData.reason);
            streamIn.writeToStdin(encodePacket({ id, isRequest: false, value }));
          }, "sendResponse");
          let handleRequest = /* @__PURE__ */ __name((id, request) => __async(this, null, function* () {
            try {
              if (request.command === "ping") {
                sendResponse(id, {});
                return;
              }
              if (typeof request.key === "number") {
                const requestCallbacks = requestCallbacksByKey[request.key];
                if (requestCallbacks) {
                  const callback = requestCallbacks[request.command];
                  if (callback) {
                    yield callback(id, request);
                    return;
                  }
                }
              }
              throw new Error(`Invalid command: ` + request.command);
            } catch (e) {
              sendResponse(id, { errors: [extractErrorMessageV8(e, streamIn, null, void 0, "")] });
            }
          }), "handleRequest");
          let isFirstPacket = true;
          let handleIncomingPacket = /* @__PURE__ */ __name((bytes) => {
            if (isFirstPacket) {
              isFirstPacket = false;
              let binaryVersion = String.fromCharCode(...bytes);
              if (binaryVersion !== "0.16.3") {
                throw new Error(`Cannot start service: Host version "${"0.16.3"}" does not match binary version ${quote(binaryVersion)}`);
              }
              return;
            }
            let packet = decodePacket(bytes);
            if (packet.isRequest) {
              handleRequest(packet.id, packet.value);
            } else {
              let callback = responseCallbacks[packet.id];
              delete responseCallbacks[packet.id];
              if (packet.value.error)
                callback(packet.value.error, {});
              else
                callback(null, packet.value);
            }
          }, "handleIncomingPacket");
          let buildOrServe = /* @__PURE__ */ __name(({ callName, refs, serveOptions, options, isTTY, defaultWD, callback }) => {
            let refCount = 0;
            const buildKey = nextBuildKey++;
            const requestCallbacks = {};
            const buildRefs = {
              ref() {
                if (++refCount === 1) {
                  if (refs)
                    refs.ref();
                }
              },
              unref() {
                if (--refCount === 0) {
                  delete requestCallbacksByKey[buildKey];
                  if (refs)
                    refs.unref();
                }
              }
            };
            requestCallbacksByKey[buildKey] = requestCallbacks;
            buildRefs.ref();
            buildOrServeImpl(
              callName,
              buildKey,
              sendRequest,
              sendResponse,
              buildRefs,
              streamIn,
              requestCallbacks,
              options,
              serveOptions,
              isTTY,
              defaultWD,
              closeData,
              (err, res) => {
                try {
                  callback(err, res);
                } finally {
                  buildRefs.unref();
                }
              }
            );
          }, "buildOrServe");
          let transform22 = /* @__PURE__ */ __name(({ callName, refs, input, options, isTTY, fs, callback }) => {
            const details = createObjectStash();
            let start = /* @__PURE__ */ __name((inputPath) => {
              try {
                if (typeof input !== "string" && !(input instanceof Uint8Array))
                  throw new Error('The input to "transform" must be a string or a Uint8Array');
                let {
                  flags,
                  mangleCache
                } = flagsForTransformOptions(callName, options, isTTY, transformLogLevelDefault);
                let request = {
                  command: "transform",
                  flags,
                  inputFS: inputPath !== null,
                  input: inputPath !== null ? encodeUTF8(inputPath) : typeof input === "string" ? encodeUTF8(input) : input
                };
                if (mangleCache)
                  request.mangleCache = mangleCache;
                sendRequest(refs, request, (error, response) => {
                  if (error)
                    return callback(new Error(error), null);
                  let errors = replaceDetailsInMessages(response.errors, details);
                  let warnings = replaceDetailsInMessages(response.warnings, details);
                  let outstanding = 1;
                  let next = /* @__PURE__ */ __name(() => {
                    if (--outstanding === 0) {
                      let result = { warnings, code: response.code, map: response.map };
                      if (response.mangleCache)
                        result.mangleCache = response == null ? void 0 : response.mangleCache;
                      callback(null, result);
                    }
                  }, "next");
                  if (errors.length > 0)
                    return callback(failureErrorWithLog("Transform failed", errors, warnings), null);
                  if (response.codeFS) {
                    outstanding++;
                    fs.readFile(response.code, (err, contents) => {
                      if (err !== null) {
                        callback(err, null);
                      } else {
                        response.code = contents;
                        next();
                      }
                    });
                  }
                  if (response.mapFS) {
                    outstanding++;
                    fs.readFile(response.map, (err, contents) => {
                      if (err !== null) {
                        callback(err, null);
                      } else {
                        response.map = contents;
                        next();
                      }
                    });
                  }
                  next();
                });
              } catch (e) {
                let flags = [];
                try {
                  pushLogFlags(flags, options, {}, isTTY, transformLogLevelDefault);
                } catch (e2) {
                }
                const error = extractErrorMessageV8(e, streamIn, details, void 0, "");
                sendRequest(refs, { command: "error", flags, error }, () => {
                  error.detail = details.load(error.detail);
                  callback(failureErrorWithLog("Transform failed", [error], []), null);
                });
              }
            }, "start");
            if ((typeof input === "string" || input instanceof Uint8Array) && input.length > 1024 * 1024) {
              let next = start;
              start = /* @__PURE__ */ __name(() => fs.writeFile(input, next), "start");
            }
            start(null);
          }, "transform2");
          let formatMessages2 = /* @__PURE__ */ __name(({ callName, refs, messages, options, callback }) => {
            let result = sanitizeMessages(messages, "messages", null, "");
            if (!options)
              throw new Error(`Missing second argument in ${callName}() call`);
            let keys = {};
            let kind = getFlag(options, keys, "kind", mustBeString);
            let color = getFlag(options, keys, "color", mustBeBoolean);
            let terminalWidth = getFlag(options, keys, "terminalWidth", mustBeInteger);
            checkForInvalidFlags(options, keys, `in ${callName}() call`);
            if (kind === void 0)
              throw new Error(`Missing "kind" in ${callName}() call`);
            if (kind !== "error" && kind !== "warning")
              throw new Error(`Expected "kind" to be "error" or "warning" in ${callName}() call`);
            let request = {
              command: "format-msgs",
              messages: result,
              isWarning: kind === "warning"
            };
            if (color !== void 0)
              request.color = color;
            if (terminalWidth !== void 0)
              request.terminalWidth = terminalWidth;
            sendRequest(refs, request, (error, response) => {
              if (error)
                return callback(new Error(error), null);
              callback(null, response.messages);
            });
          }, "formatMessages2");
          let analyzeMetafile2 = /* @__PURE__ */ __name(({ callName, refs, metafile, options, callback }) => {
            if (options === void 0)
              options = {};
            let keys = {};
            let color = getFlag(options, keys, "color", mustBeBoolean);
            let verbose = getFlag(options, keys, "verbose", mustBeBoolean);
            checkForInvalidFlags(options, keys, `in ${callName}() call`);
            let request = {
              command: "analyze-metafile",
              metafile
            };
            if (color !== void 0)
              request.color = color;
            if (verbose !== void 0)
              request.verbose = verbose;
            sendRequest(refs, request, (error, response) => {
              if (error)
                return callback(new Error(error), null);
              callback(null, response.result);
            });
          }, "analyzeMetafile2");
          return {
            readFromStdout,
            afterClose,
            service: {
              buildOrServe,
              transform: transform22,
              formatMessages: formatMessages2,
              analyzeMetafile: analyzeMetafile2
            }
          };
        }
        __name(createChannel, "createChannel");
        function buildOrServeImpl(callName, buildKey, sendRequest, sendResponse, refs, streamIn, requestCallbacks, options, serveOptions, isTTY, defaultWD, closeData, callback) {
          const details = createObjectStash();
          const logPluginError = /* @__PURE__ */ __name((e, pluginName, note, done) => {
            const flags = [];
            try {
              pushLogFlags(flags, options, {}, isTTY, buildLogLevelDefault);
            } catch (e2) {
            }
            const message = extractErrorMessageV8(e, streamIn, details, note, pluginName);
            sendRequest(refs, { command: "error", flags, error: message }, () => {
              message.detail = details.load(message.detail);
              done(message);
            });
          }, "logPluginError");
          const handleError = /* @__PURE__ */ __name((e, pluginName) => {
            logPluginError(e, pluginName, void 0, (error) => {
              callback(failureErrorWithLog("Build failed", [error], []), null);
            });
          }, "handleError");
          let plugins;
          if (typeof options === "object") {
            const value = options.plugins;
            if (value !== void 0) {
              if (!Array.isArray(value))
                throw new Error(`"plugins" must be an array`);
              plugins = value;
            }
          }
          if (plugins && plugins.length > 0) {
            if (streamIn.isSync) {
              handleError(new Error("Cannot use plugins in synchronous API calls"), "");
              return;
            }
            handlePlugins(
              buildKey,
              sendRequest,
              sendResponse,
              refs,
              streamIn,
              requestCallbacks,
              options,
              plugins,
              details
            ).then(
              (result) => {
                if (!result.ok) {
                  handleError(result.error, result.pluginName);
                  return;
                }
                try {
                  buildOrServeContinue(result.requestPlugins, result.runOnEndCallbacks);
                } catch (e) {
                  handleError(e, "");
                }
              },
              (e) => handleError(e, "")
            );
            return;
          }
          try {
            buildOrServeContinue(null, (result, logPluginError2, done) => done());
          } catch (e) {
            handleError(e, "");
          }
          function buildOrServeContinue(requestPlugins, runOnEndCallbacks) {
            let writeDefault = !streamIn.isWriteUnavailable;
            let {
              entries,
              flags,
              write,
              stdinContents,
              stdinResolveDir,
              absWorkingDir,
              incremental,
              nodePaths,
              watch,
              mangleCache
            } = flagsForBuildOptions(callName, options, isTTY, buildLogLevelDefault, writeDefault);
            let request = {
              command: "build",
              key: buildKey,
              entries,
              flags,
              write,
              stdinContents,
              stdinResolveDir,
              absWorkingDir: absWorkingDir || defaultWD,
              incremental,
              nodePaths
            };
            if (requestPlugins)
              request.plugins = requestPlugins;
            if (mangleCache)
              request.mangleCache = mangleCache;
            let serve2 = serveOptions && buildServeData(buildKey, sendRequest, sendResponse, refs, requestCallbacks, serveOptions, request);
            let rebuild;
            let stop;
            let copyResponseToResult = /* @__PURE__ */ __name((response, result) => {
              if (response.outputFiles)
                result.outputFiles = response.outputFiles.map(convertOutputFiles);
              if (response.metafile)
                result.metafile = JSON.parse(response.metafile);
              if (response.mangleCache)
                result.mangleCache = response.mangleCache;
              if (response.writeToStdout !== void 0)
                console.log(decodeUTF8(response.writeToStdout).replace(/\n$/, ""));
            }, "copyResponseToResult");
            let buildResponseToResult = /* @__PURE__ */ __name((response, callback2) => {
              let result = {
                errors: replaceDetailsInMessages(response.errors, details),
                warnings: replaceDetailsInMessages(response.warnings, details)
              };
              copyResponseToResult(response, result);
              runOnEndCallbacks(result, logPluginError, () => {
                if (result.errors.length > 0) {
                  return callback2(failureErrorWithLog("Build failed", result.errors, result.warnings), null);
                }
                if (response.rebuild) {
                  if (!rebuild) {
                    let isDisposed = false;
                    rebuild = /* @__PURE__ */ __name(() => new Promise((resolve, reject) => {
                      if (isDisposed || closeData.didClose)
                        throw new Error("Cannot rebuild");
                      sendRequest(
                        refs,
                        { command: "rebuild", key: buildKey },
                        (error2, response2) => {
                          if (error2) {
                            const message = { id: "", pluginName: "", text: error2, location: null, notes: [], detail: void 0 };
                            return callback2(failureErrorWithLog("Build failed", [message], []), null);
                          }
                          buildResponseToResult(response2, (error3, result3) => {
                            if (error3)
                              reject(error3);
                            else
                              resolve(result3);
                          });
                        }
                      );
                    }), "rebuild");
                    refs.ref();
                    rebuild.dispose = () => {
                      if (isDisposed)
                        return;
                      isDisposed = true;
                      sendRequest(refs, { command: "rebuild-dispose", key: buildKey }, () => {
                      });
                      refs.unref();
                    };
                  }
                  result.rebuild = rebuild;
                }
                if (response.watch) {
                  if (!stop) {
                    let isStopped = false;
                    refs.ref();
                    stop = /* @__PURE__ */ __name(() => {
                      if (isStopped)
                        return;
                      isStopped = true;
                      delete requestCallbacks["watch-rebuild"];
                      sendRequest(refs, { command: "watch-stop", key: buildKey }, () => {
                      });
                      refs.unref();
                    }, "stop");
                    if (watch) {
                      requestCallbacks["watch-rebuild"] = (id, request2) => {
                        try {
                          let watchResponse = request2.args;
                          let result2 = {
                            errors: replaceDetailsInMessages(watchResponse.errors, details),
                            warnings: replaceDetailsInMessages(watchResponse.warnings, details)
                          };
                          copyResponseToResult(watchResponse, result2);
                          runOnEndCallbacks(result2, logPluginError, () => {
                            if (result2.errors.length > 0) {
                              if (watch.onRebuild)
                                watch.onRebuild(failureErrorWithLog("Build failed", result2.errors, result2.warnings), null);
                              return;
                            }
                            result2.stop = stop;
                            if (watch.onRebuild)
                              watch.onRebuild(null, result2);
                          });
                        } catch (err) {
                          console.error(err);
                        }
                        sendResponse(id, {});
                      };
                    }
                  }
                  result.stop = stop;
                }
                callback2(null, result);
              });
            }, "buildResponseToResult");
            if (write && streamIn.isWriteUnavailable)
              throw new Error(`The "write" option is unavailable in this environment`);
            if (incremental && streamIn.isSync)
              throw new Error(`Cannot use "incremental" with a synchronous build`);
            if (watch && streamIn.isSync)
              throw new Error(`Cannot use "watch" with a synchronous build`);
            sendRequest(refs, request, (error, response) => {
              if (error)
                return callback(new Error(error), null);
              if (serve2) {
                let serveResponse = response;
                let isStopped = false;
                refs.ref();
                let result = {
                  port: serveResponse.port,
                  host: serveResponse.host,
                  wait: serve2.wait,
                  stop() {
                    if (isStopped)
                      return;
                    isStopped = true;
                    serve2.stop();
                    refs.unref();
                  }
                };
                refs.ref();
                serve2.wait.then(refs.unref, refs.unref);
                return callback(null, result);
              }
              return buildResponseToResult(response, callback);
            });
          }
          __name(buildOrServeContinue, "buildOrServeContinue");
        }
        __name(buildOrServeImpl, "buildOrServeImpl");
        var buildServeData = /* @__PURE__ */ __name((buildKey, sendRequest, sendResponse, refs, requestCallbacks, options, request) => {
          let keys = {};
          let port = getFlag(options, keys, "port", mustBeInteger);
          let host = getFlag(options, keys, "host", mustBeString);
          let servedir = getFlag(options, keys, "servedir", mustBeString);
          let onRequest = getFlag(options, keys, "onRequest", mustBeFunction);
          let wait = new Promise((resolve, reject) => {
            requestCallbacks["serve-wait"] = (id, request2) => {
              if (request2.error !== null)
                reject(new Error(request2.error));
              else
                resolve();
              sendResponse(id, {});
            };
          });
          request.serve = {};
          checkForInvalidFlags(options, keys, `in serve() call`);
          if (port !== void 0)
            request.serve.port = port;
          if (host !== void 0)
            request.serve.host = host;
          if (servedir !== void 0)
            request.serve.servedir = servedir;
          requestCallbacks["serve-request"] = (id, request2) => {
            if (onRequest)
              onRequest(request2.args);
            sendResponse(id, {});
          };
          return {
            wait,
            stop() {
              sendRequest(refs, { command: "serve-stop", key: buildKey }, () => {
              });
            }
          };
        }, "buildServeData");
        var handlePlugins = /* @__PURE__ */ __name((buildKey, sendRequest, sendResponse, refs, streamIn, requestCallbacks, initialOptions, plugins, details) => __async(void 0, null, function* () {
          let onStartCallbacks = [];
          let onEndCallbacks = [];
          let onResolveCallbacks = {};
          let onLoadCallbacks = {};
          let nextCallbackID = 0;
          let i = 0;
          let requestPlugins = [];
          let isSetupDone = false;
          plugins = [...plugins];
          for (let item of plugins) {
            let keys = {};
            if (typeof item !== "object")
              throw new Error(`Plugin at index ${i} must be an object`);
            const name = getFlag(item, keys, "name", mustBeString);
            if (typeof name !== "string" || name === "")
              throw new Error(`Plugin at index ${i} is missing a name`);
            try {
              let setup = getFlag(item, keys, "setup", mustBeFunction);
              if (typeof setup !== "function")
                throw new Error(`Plugin is missing a setup function`);
              checkForInvalidFlags(item, keys, `on plugin ${quote(name)}`);
              let plugin = {
                name,
                onResolve: [],
                onLoad: []
              };
              i++;
              let resolve = /* @__PURE__ */ __name((path, options = {}) => {
                if (!isSetupDone)
                  throw new Error('Cannot call "resolve" before plugin setup has completed');
                if (typeof path !== "string")
                  throw new Error(`The path to resolve must be a string`);
                let keys2 = /* @__PURE__ */ Object.create(null);
                let pluginName = getFlag(options, keys2, "pluginName", mustBeString);
                let importer = getFlag(options, keys2, "importer", mustBeString);
                let namespace = getFlag(options, keys2, "namespace", mustBeString);
                let resolveDir = getFlag(options, keys2, "resolveDir", mustBeString);
                let kind = getFlag(options, keys2, "kind", mustBeString);
                let pluginData = getFlag(options, keys2, "pluginData", canBeAnything);
                checkForInvalidFlags(options, keys2, "in resolve() call");
                return new Promise((resolve2, reject) => {
                  const request = {
                    command: "resolve",
                    path,
                    key: buildKey,
                    pluginName: name
                  };
                  if (pluginName != null)
                    request.pluginName = pluginName;
                  if (importer != null)
                    request.importer = importer;
                  if (namespace != null)
                    request.namespace = namespace;
                  if (resolveDir != null)
                    request.resolveDir = resolveDir;
                  if (kind != null)
                    request.kind = kind;
                  else
                    throw new Error(`Must specify "kind" when calling "resolve"`);
                  if (pluginData != null)
                    request.pluginData = details.store(pluginData);
                  sendRequest(refs, request, (error, response) => {
                    if (error !== null)
                      reject(new Error(error));
                    else
                      resolve2({
                        errors: replaceDetailsInMessages(response.errors, details),
                        warnings: replaceDetailsInMessages(response.warnings, details),
                        path: response.path,
                        external: response.external,
                        sideEffects: response.sideEffects,
                        namespace: response.namespace,
                        suffix: response.suffix,
                        pluginData: details.load(response.pluginData)
                      });
                  });
                });
              }, "resolve");
              let promise = setup({
                initialOptions,
                resolve,
                onStart(callback) {
                  let registeredText = `This error came from the "onStart" callback registered here:`;
                  let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onStart");
                  onStartCallbacks.push({ name, callback, note: registeredNote });
                },
                onEnd(callback) {
                  let registeredText = `This error came from the "onEnd" callback registered here:`;
                  let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onEnd");
                  onEndCallbacks.push({ name, callback, note: registeredNote });
                },
                onResolve(options, callback) {
                  let registeredText = `This error came from the "onResolve" callback registered here:`;
                  let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onResolve");
                  let keys2 = {};
                  let filter = getFlag(options, keys2, "filter", mustBeRegExp);
                  let namespace = getFlag(options, keys2, "namespace", mustBeString);
                  checkForInvalidFlags(options, keys2, `in onResolve() call for plugin ${quote(name)}`);
                  if (filter == null)
                    throw new Error(`onResolve() call is missing a filter`);
                  let id = nextCallbackID++;
                  onResolveCallbacks[id] = { name, callback, note: registeredNote };
                  plugin.onResolve.push({ id, filter: filter.source, namespace: namespace || "" });
                },
                onLoad(options, callback) {
                  let registeredText = `This error came from the "onLoad" callback registered here:`;
                  let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onLoad");
                  let keys2 = {};
                  let filter = getFlag(options, keys2, "filter", mustBeRegExp);
                  let namespace = getFlag(options, keys2, "namespace", mustBeString);
                  checkForInvalidFlags(options, keys2, `in onLoad() call for plugin ${quote(name)}`);
                  if (filter == null)
                    throw new Error(`onLoad() call is missing a filter`);
                  let id = nextCallbackID++;
                  onLoadCallbacks[id] = { name, callback, note: registeredNote };
                  plugin.onLoad.push({ id, filter: filter.source, namespace: namespace || "" });
                },
                esbuild: streamIn.esbuild
              });
              if (promise)
                yield promise;
              requestPlugins.push(plugin);
            } catch (e) {
              return { ok: false, error: e, pluginName: name };
            }
          }
          requestCallbacks["on-start"] = (id, request) => __async(void 0, null, function* () {
            let response = { errors: [], warnings: [] };
            yield Promise.all(onStartCallbacks.map((_0) => __async(void 0, [_0], function* ({ name, callback, note }) {
              try {
                let result = yield callback();
                if (result != null) {
                  if (typeof result !== "object")
                    throw new Error(`Expected onStart() callback in plugin ${quote(name)} to return an object`);
                  let keys = {};
                  let errors = getFlag(result, keys, "errors", mustBeArray);
                  let warnings = getFlag(result, keys, "warnings", mustBeArray);
                  checkForInvalidFlags(result, keys, `from onStart() callback in plugin ${quote(name)}`);
                  if (errors != null)
                    response.errors.push(...sanitizeMessages(errors, "errors", details, name));
                  if (warnings != null)
                    response.warnings.push(...sanitizeMessages(warnings, "warnings", details, name));
                }
              } catch (e) {
                response.errors.push(extractErrorMessageV8(e, streamIn, details, note && note(), name));
              }
            })));
            sendResponse(id, response);
          });
          requestCallbacks["on-resolve"] = (id, request) => __async(void 0, null, function* () {
            let response = {}, name = "", callback, note;
            for (let id2 of request.ids) {
              try {
                ({ name, callback, note } = onResolveCallbacks[id2]);
                let result = yield callback({
                  path: request.path,
                  importer: request.importer,
                  namespace: request.namespace,
                  resolveDir: request.resolveDir,
                  kind: request.kind,
                  pluginData: details.load(request.pluginData)
                });
                if (result != null) {
                  if (typeof result !== "object")
                    throw new Error(`Expected onResolve() callback in plugin ${quote(name)} to return an object`);
                  let keys = {};
                  let pluginName = getFlag(result, keys, "pluginName", mustBeString);
                  let path = getFlag(result, keys, "path", mustBeString);
                  let namespace = getFlag(result, keys, "namespace", mustBeString);
                  let suffix = getFlag(result, keys, "suffix", mustBeString);
                  let external = getFlag(result, keys, "external", mustBeBoolean);
                  let sideEffects = getFlag(result, keys, "sideEffects", mustBeBoolean);
                  let pluginData = getFlag(result, keys, "pluginData", canBeAnything);
                  let errors = getFlag(result, keys, "errors", mustBeArray);
                  let warnings = getFlag(result, keys, "warnings", mustBeArray);
                  let watchFiles = getFlag(result, keys, "watchFiles", mustBeArray);
                  let watchDirs = getFlag(result, keys, "watchDirs", mustBeArray);
                  checkForInvalidFlags(result, keys, `from onResolve() callback in plugin ${quote(name)}`);
                  response.id = id2;
                  if (pluginName != null)
                    response.pluginName = pluginName;
                  if (path != null)
                    response.path = path;
                  if (namespace != null)
                    response.namespace = namespace;
                  if (suffix != null)
                    response.suffix = suffix;
                  if (external != null)
                    response.external = external;
                  if (sideEffects != null)
                    response.sideEffects = sideEffects;
                  if (pluginData != null)
                    response.pluginData = details.store(pluginData);
                  if (errors != null)
                    response.errors = sanitizeMessages(errors, "errors", details, name);
                  if (warnings != null)
                    response.warnings = sanitizeMessages(warnings, "warnings", details, name);
                  if (watchFiles != null)
                    response.watchFiles = sanitizeStringArray(watchFiles, "watchFiles");
                  if (watchDirs != null)
                    response.watchDirs = sanitizeStringArray(watchDirs, "watchDirs");
                  break;
                }
              } catch (e) {
                response = { id: id2, errors: [extractErrorMessageV8(e, streamIn, details, note && note(), name)] };
                break;
              }
            }
            sendResponse(id, response);
          });
          requestCallbacks["on-load"] = (id, request) => __async(void 0, null, function* () {
            let response = {}, name = "", callback, note;
            for (let id2 of request.ids) {
              try {
                ({ name, callback, note } = onLoadCallbacks[id2]);
                let result = yield callback({
                  path: request.path,
                  namespace: request.namespace,
                  suffix: request.suffix,
                  pluginData: details.load(request.pluginData)
                });
                if (result != null) {
                  if (typeof result !== "object")
                    throw new Error(`Expected onLoad() callback in plugin ${quote(name)} to return an object`);
                  let keys = {};
                  let pluginName = getFlag(result, keys, "pluginName", mustBeString);
                  let contents = getFlag(result, keys, "contents", mustBeStringOrUint8Array);
                  let resolveDir = getFlag(result, keys, "resolveDir", mustBeString);
                  let pluginData = getFlag(result, keys, "pluginData", canBeAnything);
                  let loader = getFlag(result, keys, "loader", mustBeString);
                  let errors = getFlag(result, keys, "errors", mustBeArray);
                  let warnings = getFlag(result, keys, "warnings", mustBeArray);
                  let watchFiles = getFlag(result, keys, "watchFiles", mustBeArray);
                  let watchDirs = getFlag(result, keys, "watchDirs", mustBeArray);
                  checkForInvalidFlags(result, keys, `from onLoad() callback in plugin ${quote(name)}`);
                  response.id = id2;
                  if (pluginName != null)
                    response.pluginName = pluginName;
                  if (contents instanceof Uint8Array)
                    response.contents = contents;
                  else if (contents != null)
                    response.contents = encodeUTF8(contents);
                  if (resolveDir != null)
                    response.resolveDir = resolveDir;
                  if (pluginData != null)
                    response.pluginData = details.store(pluginData);
                  if (loader != null)
                    response.loader = loader;
                  if (errors != null)
                    response.errors = sanitizeMessages(errors, "errors", details, name);
                  if (warnings != null)
                    response.warnings = sanitizeMessages(warnings, "warnings", details, name);
                  if (watchFiles != null)
                    response.watchFiles = sanitizeStringArray(watchFiles, "watchFiles");
                  if (watchDirs != null)
                    response.watchDirs = sanitizeStringArray(watchDirs, "watchDirs");
                  break;
                }
              } catch (e) {
                response = { id: id2, errors: [extractErrorMessageV8(e, streamIn, details, note && note(), name)] };
                break;
              }
            }
            sendResponse(id, response);
          });
          let runOnEndCallbacks = /* @__PURE__ */ __name((result, logPluginError, done) => done(), "runOnEndCallbacks");
          if (onEndCallbacks.length > 0) {
            runOnEndCallbacks = /* @__PURE__ */ __name((result, logPluginError, done) => {
              (() => __async(void 0, null, function* () {
                for (const { name, callback, note } of onEndCallbacks) {
                  try {
                    yield callback(result);
                  } catch (e) {
                    result.errors.push(yield new Promise((resolve) => logPluginError(e, name, note && note(), resolve)));
                  }
                }
              }))().then(done);
            }, "runOnEndCallbacks");
          }
          isSetupDone = true;
          return {
            ok: true,
            requestPlugins,
            runOnEndCallbacks
          };
        }), "handlePlugins");
        function createObjectStash() {
          const map = /* @__PURE__ */ new Map();
          let nextID = 0;
          return {
            load(id) {
              return map.get(id);
            },
            store(value) {
              if (value === void 0)
                return -1;
              const id = nextID++;
              map.set(id, value);
              return id;
            }
          };
        }
        __name(createObjectStash, "createObjectStash");
        function extractCallerV8(e, streamIn, ident) {
          let note;
          let tried = false;
          return () => {
            if (tried)
              return note;
            tried = true;
            try {
              let lines = (e.stack + "").split("\n");
              lines.splice(1, 1);
              let location2 = parseStackLinesV8(streamIn, lines, ident);
              if (location2) {
                note = { text: e.message, location: location2 };
                return note;
              }
            } catch (e2) {
            }
          };
        }
        __name(extractCallerV8, "extractCallerV8");
        function extractErrorMessageV8(e, streamIn, stash, note, pluginName) {
          let text = "Internal error";
          let location2 = null;
          try {
            text = (e && e.message || e) + "";
          } catch (e2) {
          }
          try {
            location2 = parseStackLinesV8(streamIn, (e.stack + "").split("\n"), "");
          } catch (e2) {
          }
          return { id: "", pluginName, text, location: location2, notes: note ? [note] : [], detail: stash ? stash.store(e) : -1 };
        }
        __name(extractErrorMessageV8, "extractErrorMessageV8");
        function parseStackLinesV8(streamIn, lines, ident) {
          let at = "    at ";
          if (streamIn.readFileSync && !lines[0].startsWith(at) && lines[1].startsWith(at)) {
            for (let i = 1; i < lines.length; i++) {
              let line = lines[i];
              if (!line.startsWith(at))
                continue;
              line = line.slice(at.length);
              while (true) {
                let match = /^(?:new |async )?\S+ \((.*)\)$/.exec(line);
                if (match) {
                  line = match[1];
                  continue;
                }
                match = /^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(line);
                if (match) {
                  line = match[1];
                  continue;
                }
                match = /^(\S+):(\d+):(\d+)$/.exec(line);
                if (match) {
                  let contents;
                  try {
                    contents = streamIn.readFileSync(match[1], "utf8");
                  } catch (e) {
                    break;
                  }
                  let lineText = contents.split(/\r\n|\r|\n|\u2028|\u2029/)[+match[2] - 1] || "";
                  let column = +match[3] - 1;
                  let length = lineText.slice(column, column + ident.length) === ident ? ident.length : 0;
                  return {
                    file: match[1],
                    namespace: "file",
                    line: +match[2],
                    column: encodeUTF8(lineText.slice(0, column)).length,
                    length: encodeUTF8(lineText.slice(column, column + length)).length,
                    lineText: lineText + "\n" + lines.slice(1).join("\n"),
                    suggestion: ""
                  };
                }
                break;
              }
            }
          }
          return null;
        }
        __name(parseStackLinesV8, "parseStackLinesV8");
        function failureErrorWithLog(text, errors, warnings) {
          let limit = 5;
          let summary = errors.length < 1 ? "" : ` with ${errors.length} error${errors.length < 2 ? "" : "s"}:` + errors.slice(0, limit + 1).map((e, i) => {
            if (i === limit)
              return "\n...";
            if (!e.location)
              return `
error: ${e.text}`;
            let { file, line, column } = e.location;
            let pluginText = e.pluginName ? `[plugin: ${e.pluginName}] ` : "";
            return `
${file}:${line}:${column}: ERROR: ${pluginText}${e.text}`;
          }).join("");
          let error = new Error(`${text}${summary}`);
          error.errors = errors;
          error.warnings = warnings;
          return error;
        }
        __name(failureErrorWithLog, "failureErrorWithLog");
        function replaceDetailsInMessages(messages, stash) {
          for (const message of messages) {
            message.detail = stash.load(message.detail);
          }
          return messages;
        }
        __name(replaceDetailsInMessages, "replaceDetailsInMessages");
        function sanitizeLocation(location2, where) {
          if (location2 == null)
            return null;
          let keys = {};
          let file = getFlag(location2, keys, "file", mustBeString);
          let namespace = getFlag(location2, keys, "namespace", mustBeString);
          let line = getFlag(location2, keys, "line", mustBeInteger);
          let column = getFlag(location2, keys, "column", mustBeInteger);
          let length = getFlag(location2, keys, "length", mustBeInteger);
          let lineText = getFlag(location2, keys, "lineText", mustBeString);
          let suggestion = getFlag(location2, keys, "suggestion", mustBeString);
          checkForInvalidFlags(location2, keys, where);
          return {
            file: file || "",
            namespace: namespace || "",
            line: line || 0,
            column: column || 0,
            length: length || 0,
            lineText: lineText || "",
            suggestion: suggestion || ""
          };
        }
        __name(sanitizeLocation, "sanitizeLocation");
        function sanitizeMessages(messages, property, stash, fallbackPluginName) {
          let messagesClone = [];
          let index = 0;
          for (const message of messages) {
            let keys = {};
            let id = getFlag(message, keys, "id", mustBeString);
            let pluginName = getFlag(message, keys, "pluginName", mustBeString);
            let text = getFlag(message, keys, "text", mustBeString);
            let location2 = getFlag(message, keys, "location", mustBeObjectOrNull);
            let notes = getFlag(message, keys, "notes", mustBeArray);
            let detail = getFlag(message, keys, "detail", canBeAnything);
            let where = `in element ${index} of "${property}"`;
            checkForInvalidFlags(message, keys, where);
            let notesClone = [];
            if (notes) {
              for (const note of notes) {
                let noteKeys = {};
                let noteText = getFlag(note, noteKeys, "text", mustBeString);
                let noteLocation = getFlag(note, noteKeys, "location", mustBeObjectOrNull);
                checkForInvalidFlags(note, noteKeys, where);
                notesClone.push({
                  text: noteText || "",
                  location: sanitizeLocation(noteLocation, where)
                });
              }
            }
            messagesClone.push({
              id: id || "",
              pluginName: pluginName || fallbackPluginName,
              text: text || "",
              location: sanitizeLocation(location2, where),
              notes: notesClone,
              detail: stash ? stash.store(detail) : -1
            });
            index++;
          }
          return messagesClone;
        }
        __name(sanitizeMessages, "sanitizeMessages");
        function sanitizeStringArray(values, property) {
          const result = [];
          for (const value of values) {
            if (typeof value !== "string")
              throw new Error(`${quote(property)} must be an array of strings`);
            result.push(value);
          }
          return result;
        }
        __name(sanitizeStringArray, "sanitizeStringArray");
        function convertOutputFiles({ path, contents }) {
          let text = null;
          return {
            path,
            contents,
            get text() {
              const binary = this.contents;
              if (text === null || binary !== contents) {
                contents = binary;
                text = decodeUTF8(binary);
              }
              return text;
            }
          };
        }
        __name(convertOutputFiles, "convertOutputFiles");
        var version = "0.16.3";
        var build = /* @__PURE__ */ __name((options) => ensureServiceIsRunning().build(options), "build");
        var serve = /* @__PURE__ */ __name(() => {
          throw new Error(`The "serve" API only works in node`);
        }, "serve");
        var transform2 = /* @__PURE__ */ __name((input, options) => ensureServiceIsRunning().transform(input, options), "transform");
        var formatMessages = /* @__PURE__ */ __name((messages, options) => ensureServiceIsRunning().formatMessages(messages, options), "formatMessages");
        var analyzeMetafile = /* @__PURE__ */ __name((metafile, options) => ensureServiceIsRunning().analyzeMetafile(metafile, options), "analyzeMetafile");
        var buildSync = /* @__PURE__ */ __name(() => {
          throw new Error(`The "buildSync" API only works in node`);
        }, "buildSync");
        var transformSync = /* @__PURE__ */ __name(() => {
          throw new Error(`The "transformSync" API only works in node`);
        }, "transformSync");
        var formatMessagesSync = /* @__PURE__ */ __name(() => {
          throw new Error(`The "formatMessagesSync" API only works in node`);
        }, "formatMessagesSync");
        var analyzeMetafileSync = /* @__PURE__ */ __name(() => {
          throw new Error(`The "analyzeMetafileSync" API only works in node`);
        }, "analyzeMetafileSync");
        var initializePromise;
        var longLivedService;
        var ensureServiceIsRunning = /* @__PURE__ */ __name(() => {
          if (longLivedService)
            return longLivedService;
          if (initializePromise)
            throw new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this');
          throw new Error('You need to call "initialize" before calling this');
        }, "ensureServiceIsRunning");
        var initialize2 = /* @__PURE__ */ __name((options) => {
          options = validateInitializeOptions(options || {});
          let wasmURL = options.wasmURL;
          let wasmModule = options.wasmModule;
          let useWorker = options.worker !== false;
          if (!wasmURL && !wasmModule)
            throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');
          if (initializePromise)
            throw new Error('Cannot call "initialize" more than once');
          initializePromise = startRunningService(wasmURL || "", wasmModule, useWorker);
          initializePromise.catch(() => {
            initializePromise = void 0;
          });
          return initializePromise;
        }, "initialize");
        var startRunningService = /* @__PURE__ */ __name((wasmURL, wasmModule, useWorker) => __async(void 0, null, function* () {
          let worker;
          if (useWorker) {
            let blob = new Blob([`onmessage=${'((postMessage) => {\n      // Copyright 2018 The Go Authors. All rights reserved.\n      // Use of this source code is governed by a BSD-style\n      // license that can be found in the LICENSE file.\n      var __async = (__this, __arguments, generator) => {\n        return new Promise((resolve, reject) => {\n          var fulfilled = (value) => {\n            try {\n              step(generator.next(value));\n            } catch (e) {\n              reject(e);\n            }\n          };\n          var rejected = (value) => {\n            try {\n              step(generator.throw(value));\n            } catch (e) {\n              reject(e);\n            }\n          };\n          var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);\n          step((generator = generator.apply(__this, __arguments)).next());\n        });\n      };\n      let onmessage;\n      let globalThis = {};\n      for (let o = self; o; o = Object.getPrototypeOf(o))\n        for (let k of Object.getOwnPropertyNames(o))\n          if (!(k in globalThis))\n            Object.defineProperty(globalThis, k, { get: () => self[k] });\n      "use strict";\n      (() => {\n        const enosys = () => {\n          const err = new Error("not implemented");\n          err.code = "ENOSYS";\n          return err;\n        };\n        if (!globalThis.fs) {\n          let outputBuf = "";\n          globalThis.fs = {\n            constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 },\n            writeSync(fd, buf) {\n              outputBuf += decoder.decode(buf);\n              const nl = outputBuf.lastIndexOf("\\n");\n              if (nl != -1) {\n                console.log(outputBuf.substr(0, nl));\n                outputBuf = outputBuf.substr(nl + 1);\n              }\n              return buf.length;\n            },\n            write(fd, buf, offset, length, position, callback) {\n              if (offset !== 0 || length !== buf.length || position !== null) {\n                callback(enosys());\n                return;\n              }\n              const n = this.writeSync(fd, buf);\n              callback(null, n);\n            },\n            chmod(path, mode, callback) {\n              callback(enosys());\n            },\n            chown(path, uid, gid, callback) {\n              callback(enosys());\n            },\n            close(fd, callback) {\n              callback(enosys());\n            },\n            fchmod(fd, mode, callback) {\n              callback(enosys());\n            },\n            fchown(fd, uid, gid, callback) {\n              callback(enosys());\n            },\n            fstat(fd, callback) {\n              callback(enosys());\n            },\n            fsync(fd, callback) {\n              callback(null);\n            },\n            ftruncate(fd, length, callback) {\n              callback(enosys());\n            },\n            lchown(path, uid, gid, callback) {\n              callback(enosys());\n            },\n            link(path, link, callback) {\n              callback(enosys());\n            },\n            lstat(path, callback) {\n              callback(enosys());\n            },\n            mkdir(path, perm, callback) {\n              callback(enosys());\n            },\n            open(path, flags, mode, callback) {\n              callback(enosys());\n            },\n            read(fd, buffer, offset, length, position, callback) {\n              callback(enosys());\n            },\n            readdir(path, callback) {\n              callback(enosys());\n            },\n            readlink(path, callback) {\n              callback(enosys());\n            },\n            rename(from, to, callback) {\n              callback(enosys());\n            },\n            rmdir(path, callback) {\n              callback(enosys());\n            },\n            stat(path, callback) {\n              callback(enosys());\n            },\n            symlink(path, link, callback) {\n              callback(enosys());\n            },\n            truncate(path, length, callback) {\n              callback(enosys());\n            },\n            unlink(path, callback) {\n              callback(enosys());\n            },\n            utimes(path, atime, mtime, callback) {\n              callback(enosys());\n            }\n          };\n        }\n        if (!globalThis.process) {\n          globalThis.process = {\n            getuid() {\n              return -1;\n            },\n            getgid() {\n              return -1;\n            },\n            geteuid() {\n              return -1;\n            },\n            getegid() {\n              return -1;\n            },\n            getgroups() {\n              throw enosys();\n            },\n            pid: -1,\n            ppid: -1,\n            umask() {\n              throw enosys();\n            },\n            cwd() {\n              throw enosys();\n            },\n            chdir() {\n              throw enosys();\n            }\n          };\n        }\n        if (!globalThis.crypto) {\n          throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");\n        }\n        if (!globalThis.performance) {\n          throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");\n        }\n        if (!globalThis.TextEncoder) {\n          throw new Error("globalThis.TextEncoder is not available, polyfill required");\n        }\n        if (!globalThis.TextDecoder) {\n          throw new Error("globalThis.TextDecoder is not available, polyfill required");\n        }\n        const encoder = new TextEncoder("utf-8");\n        const decoder = new TextDecoder("utf-8");\n        globalThis.Go = class {\n          constructor() {\n            this.argv = ["js"];\n            this.env = {};\n            this.exit = (code) => {\n              if (code !== 0) {\n                console.warn("exit code:", code);\n              }\n            };\n            this._exitPromise = new Promise((resolve) => {\n              this._resolveExitPromise = resolve;\n            });\n            this._pendingEvent = null;\n            this._scheduledTimeouts = /* @__PURE__ */ new Map();\n            this._nextCallbackTimeoutID = 1;\n            const setInt64 = (addr, v) => {\n              this.mem.setUint32(addr + 0, v, true);\n              this.mem.setUint32(addr + 4, Math.floor(v / 4294967296), true);\n            };\n            const getInt64 = (addr) => {\n              const low = this.mem.getUint32(addr + 0, true);\n              const high = this.mem.getInt32(addr + 4, true);\n              return low + high * 4294967296;\n            };\n            const loadValue = (addr) => {\n              const f = this.mem.getFloat64(addr, true);\n              if (f === 0) {\n                return void 0;\n              }\n              if (!isNaN(f)) {\n                return f;\n              }\n              const id = this.mem.getUint32(addr, true);\n              return this._values[id];\n            };\n            const storeValue = (addr, v) => {\n              const nanHead = 2146959360;\n              if (typeof v === "number" && v !== 0) {\n                if (isNaN(v)) {\n                  this.mem.setUint32(addr + 4, nanHead, true);\n                  this.mem.setUint32(addr, 0, true);\n                  return;\n                }\n                this.mem.setFloat64(addr, v, true);\n                return;\n              }\n              if (v === void 0) {\n                this.mem.setFloat64(addr, 0, true);\n                return;\n              }\n              let id = this._ids.get(v);\n              if (id === void 0) {\n                id = this._idPool.pop();\n                if (id === void 0) {\n                  id = this._values.length;\n                }\n                this._values[id] = v;\n                this._goRefCounts[id] = 0;\n                this._ids.set(v, id);\n              }\n              this._goRefCounts[id]++;\n              let typeFlag = 0;\n              switch (typeof v) {\n                case "object":\n                  if (v !== null) {\n                    typeFlag = 1;\n                  }\n                  break;\n                case "string":\n                  typeFlag = 2;\n                  break;\n                case "symbol":\n                  typeFlag = 3;\n                  break;\n                case "function":\n                  typeFlag = 4;\n                  break;\n              }\n              this.mem.setUint32(addr + 4, nanHead | typeFlag, true);\n              this.mem.setUint32(addr, id, true);\n            };\n            const loadSlice = (addr) => {\n              const array = getInt64(addr + 0);\n              const len = getInt64(addr + 8);\n              return new Uint8Array(this._inst.exports.mem.buffer, array, len);\n            };\n            const loadSliceOfValues = (addr) => {\n              const array = getInt64(addr + 0);\n              const len = getInt64(addr + 8);\n              const a = new Array(len);\n              for (let i = 0; i < len; i++) {\n                a[i] = loadValue(array + i * 8);\n              }\n              return a;\n            };\n            const loadString = (addr) => {\n              const saddr = getInt64(addr + 0);\n              const len = getInt64(addr + 8);\n              return decoder.decode(new DataView(this._inst.exports.mem.buffer, saddr, len));\n            };\n            const timeOrigin = Date.now() - performance.now();\n            this.importObject = {\n              go: {\n                "runtime.wasmExit": (sp) => {\n                  sp >>>= 0;\n                  const code = this.mem.getInt32(sp + 8, true);\n                  this.exited = true;\n                  delete this._inst;\n                  delete this._values;\n                  delete this._goRefCounts;\n                  delete this._ids;\n                  delete this._idPool;\n                  this.exit(code);\n                },\n                "runtime.wasmWrite": (sp) => {\n                  sp >>>= 0;\n                  const fd = getInt64(sp + 8);\n                  const p = getInt64(sp + 16);\n                  const n = this.mem.getInt32(sp + 24, true);\n                  globalThis.fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p, n));\n                },\n                "runtime.resetMemoryDataView": (sp) => {\n                  sp >>>= 0;\n                  this.mem = new DataView(this._inst.exports.mem.buffer);\n                },\n                "runtime.nanotime1": (sp) => {\n                  sp >>>= 0;\n                  setInt64(sp + 8, (timeOrigin + performance.now()) * 1e6);\n                },\n                "runtime.walltime": (sp) => {\n                  sp >>>= 0;\n                  const msec = new Date().getTime();\n                  setInt64(sp + 8, msec / 1e3);\n                  this.mem.setInt32(sp + 16, msec % 1e3 * 1e6, true);\n                },\n                "runtime.scheduleTimeoutEvent": (sp) => {\n                  sp >>>= 0;\n                  const id = this._nextCallbackTimeoutID;\n                  this._nextCallbackTimeoutID++;\n                  this._scheduledTimeouts.set(id, setTimeout(\n                    () => {\n                      this._resume();\n                      while (this._scheduledTimeouts.has(id)) {\n                        console.warn("scheduleTimeoutEvent: missed timeout event");\n                        this._resume();\n                      }\n                    },\n                    getInt64(sp + 8) + 1\n                  ));\n                  this.mem.setInt32(sp + 16, id, true);\n                },\n                "runtime.clearTimeoutEvent": (sp) => {\n                  sp >>>= 0;\n                  const id = this.mem.getInt32(sp + 8, true);\n                  clearTimeout(this._scheduledTimeouts.get(id));\n                  this._scheduledTimeouts.delete(id);\n                },\n                "runtime.getRandomData": (sp) => {\n                  sp >>>= 0;\n                  crypto.getRandomValues(loadSlice(sp + 8));\n                },\n                "syscall/js.finalizeRef": (sp) => {\n                  sp >>>= 0;\n                  const id = this.mem.getUint32(sp + 8, true);\n                  this._goRefCounts[id]--;\n                  if (this._goRefCounts[id] === 0) {\n                    const v = this._values[id];\n                    this._values[id] = null;\n                    this._ids.delete(v);\n                    this._idPool.push(id);\n                  }\n                },\n                "syscall/js.stringVal": (sp) => {\n                  sp >>>= 0;\n                  storeValue(sp + 24, loadString(sp + 8));\n                },\n                "syscall/js.valueGet": (sp) => {\n                  sp >>>= 0;\n                  const result = Reflect.get(loadValue(sp + 8), loadString(sp + 16));\n                  sp = this._inst.exports.getsp() >>> 0;\n                  storeValue(sp + 32, result);\n                },\n                "syscall/js.valueSet": (sp) => {\n                  sp >>>= 0;\n                  Reflect.set(loadValue(sp + 8), loadString(sp + 16), loadValue(sp + 32));\n                },\n                "syscall/js.valueDelete": (sp) => {\n                  sp >>>= 0;\n                  Reflect.deleteProperty(loadValue(sp + 8), loadString(sp + 16));\n                },\n                "syscall/js.valueIndex": (sp) => {\n                  sp >>>= 0;\n                  storeValue(sp + 24, Reflect.get(loadValue(sp + 8), getInt64(sp + 16)));\n                },\n                "syscall/js.valueSetIndex": (sp) => {\n                  sp >>>= 0;\n                  Reflect.set(loadValue(sp + 8), getInt64(sp + 16), loadValue(sp + 24));\n                },\n                "syscall/js.valueCall": (sp) => {\n                  sp >>>= 0;\n                  try {\n                    const v = loadValue(sp + 8);\n                    const m = Reflect.get(v, loadString(sp + 16));\n                    const args = loadSliceOfValues(sp + 32);\n                    const result = Reflect.apply(m, v, args);\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 56, result);\n                    this.mem.setUint8(sp + 64, 1);\n                  } catch (err) {\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 56, err);\n                    this.mem.setUint8(sp + 64, 0);\n                  }\n                },\n                "syscall/js.valueInvoke": (sp) => {\n                  sp >>>= 0;\n                  try {\n                    const v = loadValue(sp + 8);\n                    const args = loadSliceOfValues(sp + 16);\n                    const result = Reflect.apply(v, void 0, args);\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 40, result);\n                    this.mem.setUint8(sp + 48, 1);\n                  } catch (err) {\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 40, err);\n                    this.mem.setUint8(sp + 48, 0);\n                  }\n                },\n                "syscall/js.valueNew": (sp) => {\n                  sp >>>= 0;\n                  try {\n                    const v = loadValue(sp + 8);\n                    const args = loadSliceOfValues(sp + 16);\n                    const result = Reflect.construct(v, args);\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 40, result);\n                    this.mem.setUint8(sp + 48, 1);\n                  } catch (err) {\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 40, err);\n                    this.mem.setUint8(sp + 48, 0);\n                  }\n                },\n                "syscall/js.valueLength": (sp) => {\n                  sp >>>= 0;\n                  setInt64(sp + 16, parseInt(loadValue(sp + 8).length));\n                },\n                "syscall/js.valuePrepareString": (sp) => {\n                  sp >>>= 0;\n                  const str = encoder.encode(String(loadValue(sp + 8)));\n                  storeValue(sp + 16, str);\n                  setInt64(sp + 24, str.length);\n                },\n                "syscall/js.valueLoadString": (sp) => {\n                  sp >>>= 0;\n                  const str = loadValue(sp + 8);\n                  loadSlice(sp + 16).set(str);\n                },\n                "syscall/js.valueInstanceOf": (sp) => {\n                  sp >>>= 0;\n                  this.mem.setUint8(sp + 24, loadValue(sp + 8) instanceof loadValue(sp + 16) ? 1 : 0);\n                },\n                "syscall/js.copyBytesToGo": (sp) => {\n                  sp >>>= 0;\n                  const dst = loadSlice(sp + 8);\n                  const src = loadValue(sp + 32);\n                  if (!(src instanceof Uint8Array || src instanceof Uint8ClampedArray)) {\n                    this.mem.setUint8(sp + 48, 0);\n                    return;\n                  }\n                  const toCopy = src.subarray(0, dst.length);\n                  dst.set(toCopy);\n                  setInt64(sp + 40, toCopy.length);\n                  this.mem.setUint8(sp + 48, 1);\n                },\n                "syscall/js.copyBytesToJS": (sp) => {\n                  sp >>>= 0;\n                  const dst = loadValue(sp + 8);\n                  const src = loadSlice(sp + 16);\n                  if (!(dst instanceof Uint8Array || dst instanceof Uint8ClampedArray)) {\n                    this.mem.setUint8(sp + 48, 0);\n                    return;\n                  }\n                  const toCopy = src.subarray(0, dst.length);\n                  dst.set(toCopy);\n                  setInt64(sp + 40, toCopy.length);\n                  this.mem.setUint8(sp + 48, 1);\n                },\n                "debug": (value) => {\n                  console.log(value);\n                }\n              }\n            };\n          }\n          run(instance) {\n            return __async(this, null, function* () {\n              if (!(instance instanceof WebAssembly.Instance)) {\n                throw new Error("Go.run: WebAssembly.Instance expected");\n              }\n              this._inst = instance;\n              this.mem = new DataView(this._inst.exports.mem.buffer);\n              this._values = [\n                NaN,\n                0,\n                null,\n                true,\n                false,\n                globalThis,\n                this\n              ];\n              this._goRefCounts = new Array(this._values.length).fill(Infinity);\n              this._ids = /* @__PURE__ */ new Map([\n                [0, 1],\n                [null, 2],\n                [true, 3],\n                [false, 4],\n                [globalThis, 5],\n                [this, 6]\n              ]);\n              this._idPool = [];\n              this.exited = false;\n              let offset = 4096;\n              const strPtr = (str) => {\n                const ptr = offset;\n                const bytes = encoder.encode(str + "\\0");\n                new Uint8Array(this.mem.buffer, offset, bytes.length).set(bytes);\n                offset += bytes.length;\n                if (offset % 8 !== 0) {\n                  offset += 8 - offset % 8;\n                }\n                return ptr;\n              };\n              const argc = this.argv.length;\n              const argvPtrs = [];\n              this.argv.forEach((arg) => {\n                argvPtrs.push(strPtr(arg));\n              });\n              argvPtrs.push(0);\n              const keys = Object.keys(this.env).sort();\n              keys.forEach((key) => {\n                argvPtrs.push(strPtr(`${key}=${this.env[key]}`));\n              });\n              argvPtrs.push(0);\n              const argv = offset;\n              argvPtrs.forEach((ptr) => {\n                this.mem.setUint32(offset, ptr, true);\n                this.mem.setUint32(offset + 4, 0, true);\n                offset += 8;\n              });\n              const wasmMinDataAddr = 4096 + 8192;\n              if (offset >= wasmMinDataAddr) {\n                throw new Error("total length of command line and environment variables exceeds limit");\n              }\n              this._inst.exports.run(argc, argv);\n              if (this.exited) {\n                this._resolveExitPromise();\n              }\n              yield this._exitPromise;\n            });\n          }\n          _resume() {\n            if (this.exited) {\n              throw new Error("Go program has already exited");\n            }\n            this._inst.exports.resume();\n            if (this.exited) {\n              this._resolveExitPromise();\n            }\n          }\n          _makeFuncWrapper(id) {\n            const go = this;\n            return function() {\n              const event = { id, this: this, args: arguments };\n              go._pendingEvent = event;\n              go._resume();\n              return event.result;\n            };\n          }\n        };\n      })();\n      onmessage = ({ data: wasm }) => {\n        let decoder = new TextDecoder();\n        let fs = globalThis.fs;\n        let stderr = "";\n        fs.writeSync = (fd, buffer) => {\n          if (fd === 1) {\n            postMessage(buffer);\n          } else if (fd === 2) {\n            stderr += decoder.decode(buffer);\n            let parts = stderr.split("\\n");\n            if (parts.length > 1)\n              console.log(parts.slice(0, -1).join("\\n"));\n            stderr = parts[parts.length - 1];\n          } else {\n            throw new Error("Bad write");\n          }\n          return buffer.length;\n        };\n        let stdin = [];\n        let resumeStdin;\n        let stdinPos = 0;\n        onmessage = ({ data }) => {\n          if (data.length > 0) {\n            stdin.push(data);\n            if (resumeStdin)\n              resumeStdin();\n          }\n        };\n        fs.read = (fd, buffer, offset, length, position, callback) => {\n          if (fd !== 0 || offset !== 0 || length !== buffer.length || position !== null) {\n            throw new Error("Bad read");\n          }\n          if (stdin.length === 0) {\n            resumeStdin = () => fs.read(fd, buffer, offset, length, position, callback);\n            return;\n          }\n          let first = stdin[0];\n          let count = Math.max(0, Math.min(length, first.length - stdinPos));\n          buffer.set(first.subarray(stdinPos, stdinPos + count), offset);\n          stdinPos += count;\n          if (stdinPos === first.length) {\n            stdin.shift();\n            stdinPos = 0;\n          }\n          callback(null, count);\n        };\n        let go = new globalThis.Go();\n        go.argv = ["", `--service=${"0.16.3"}`];\n        tryToInstantiateModule(wasm, go).then(\n          (instance) => {\n            postMessage(null);\n            go.run(instance);\n          },\n          (error) => {\n            postMessage(error);\n          }\n        );\n      };\n      function tryToInstantiateModule(wasm, go) {\n        return __async(this, null, function* () {\n          if (wasm instanceof WebAssembly.Module) {\n            return WebAssembly.instantiate(wasm, go.importObject);\n          }\n          const res = yield fetch(wasm);\n          if (!res.ok)\n            throw new Error(`Failed to download ${JSON.stringify(wasm)}`);\n          if ("instantiateStreaming" in WebAssembly && /^application\\/wasm($|;)/i.test(res.headers.get("Content-Type") || "")) {\n            const result2 = yield WebAssembly.instantiateStreaming(res, go.importObject);\n            return result2.instance;\n          }\n          const bytes = yield res.arrayBuffer();\n          const result = yield WebAssembly.instantiate(bytes, go.importObject);\n          return result.instance;\n        });\n      }\n      return (m) => onmessage(m);\n    })'}(postMessage)`], { type: "text/javascript" });
            worker = new Worker(URL.createObjectURL(blob));
          } else {
            let onmessage = ((postMessage) => {
              var __async2 = /* @__PURE__ */ __name((__this, __arguments, generator) => {
                return new Promise((resolve, reject) => {
                  var fulfilled = /* @__PURE__ */ __name((value) => {
                    try {
                      step(generator.next(value));
                    } catch (e) {
                      reject(e);
                    }
                  }, "fulfilled");
                  var rejected = /* @__PURE__ */ __name((value) => {
                    try {
                      step(generator.throw(value));
                    } catch (e) {
                      reject(e);
                    }
                  }, "rejected");
                  var step = /* @__PURE__ */ __name((x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected), "step");
                  step((generator = generator.apply(__this, __arguments)).next());
                });
              }, "__async");
              let onmessage2;
              let globalThis2 = {};
              for (let o = self; o; o = Object.getPrototypeOf(o))
                for (let k of Object.getOwnPropertyNames(o))
                  if (!(k in globalThis2))
                    Object.defineProperty(globalThis2, k, { get: () => self[k] });
              "use strict";
              (() => {
                const enosys = /* @__PURE__ */ __name(() => {
                  const err = new Error("not implemented");
                  err.code = "ENOSYS";
                  return err;
                }, "enosys");
                if (!globalThis2.fs) {
                  let outputBuf = "";
                  globalThis2.fs = {
                    constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 },
                    writeSync(fd, buf) {
                      outputBuf += decoder.decode(buf);
                      const nl = outputBuf.lastIndexOf("\n");
                      if (nl != -1) {
                        console.log(outputBuf.substr(0, nl));
                        outputBuf = outputBuf.substr(nl + 1);
                      }
                      return buf.length;
                    },
                    write(fd, buf, offset, length, position, callback) {
                      if (offset !== 0 || length !== buf.length || position !== null) {
                        callback(enosys());
                        return;
                      }
                      const n = this.writeSync(fd, buf);
                      callback(null, n);
                    },
                    chmod(path, mode, callback) {
                      callback(enosys());
                    },
                    chown(path, uid, gid, callback) {
                      callback(enosys());
                    },
                    close(fd, callback) {
                      callback(enosys());
                    },
                    fchmod(fd, mode, callback) {
                      callback(enosys());
                    },
                    fchown(fd, uid, gid, callback) {
                      callback(enosys());
                    },
                    fstat(fd, callback) {
                      callback(enosys());
                    },
                    fsync(fd, callback) {
                      callback(null);
                    },
                    ftruncate(fd, length, callback) {
                      callback(enosys());
                    },
                    lchown(path, uid, gid, callback) {
                      callback(enosys());
                    },
                    link(path, link, callback) {
                      callback(enosys());
                    },
                    lstat(path, callback) {
                      callback(enosys());
                    },
                    mkdir(path, perm, callback) {
                      callback(enosys());
                    },
                    open(path, flags, mode, callback) {
                      callback(enosys());
                    },
                    read(fd, buffer, offset, length, position, callback) {
                      callback(enosys());
                    },
                    readdir(path, callback) {
                      callback(enosys());
                    },
                    readlink(path, callback) {
                      callback(enosys());
                    },
                    rename(from, to, callback) {
                      callback(enosys());
                    },
                    rmdir(path, callback) {
                      callback(enosys());
                    },
                    stat(path, callback) {
                      callback(enosys());
                    },
                    symlink(path, link, callback) {
                      callback(enosys());
                    },
                    truncate(path, length, callback) {
                      callback(enosys());
                    },
                    unlink(path, callback) {
                      callback(enosys());
                    },
                    utimes(path, atime, mtime, callback) {
                      callback(enosys());
                    }
                  };
                }
                if (!globalThis2.process) {
                  globalThis2.process = {
                    getuid() {
                      return -1;
                    },
                    getgid() {
                      return -1;
                    },
                    geteuid() {
                      return -1;
                    },
                    getegid() {
                      return -1;
                    },
                    getgroups() {
                      throw enosys();
                    },
                    pid: -1,
                    ppid: -1,
                    umask() {
                      throw enosys();
                    },
                    cwd() {
                      throw enosys();
                    },
                    chdir() {
                      throw enosys();
                    }
                  };
                }
                if (!globalThis2.crypto) {
                  throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");
                }
                if (!globalThis2.performance) {
                  throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");
                }
                if (!globalThis2.TextEncoder) {
                  throw new Error("globalThis.TextEncoder is not available, polyfill required");
                }
                if (!globalThis2.TextDecoder) {
                  throw new Error("globalThis.TextDecoder is not available, polyfill required");
                }
                const encoder = new TextEncoder("utf-8");
                const decoder = new TextDecoder("utf-8");
                globalThis2.Go = class {
                  constructor() {
                    this.argv = ["js"];
                    this.env = {};
                    this.exit = (code) => {
                      if (code !== 0) {
                        console.warn("exit code:", code);
                      }
                    };
                    this._exitPromise = new Promise((resolve) => {
                      this._resolveExitPromise = resolve;
                    });
                    this._pendingEvent = null;
                    this._scheduledTimeouts = /* @__PURE__ */ new Map();
                    this._nextCallbackTimeoutID = 1;
                    const setInt64 = /* @__PURE__ */ __name((addr, v) => {
                      this.mem.setUint32(addr + 0, v, true);
                      this.mem.setUint32(addr + 4, Math.floor(v / 4294967296), true);
                    }, "setInt64");
                    const getInt64 = /* @__PURE__ */ __name((addr) => {
                      const low = this.mem.getUint32(addr + 0, true);
                      const high = this.mem.getInt32(addr + 4, true);
                      return low + high * 4294967296;
                    }, "getInt64");
                    const loadValue = /* @__PURE__ */ __name((addr) => {
                      const f = this.mem.getFloat64(addr, true);
                      if (f === 0) {
                        return void 0;
                      }
                      if (!isNaN(f)) {
                        return f;
                      }
                      const id = this.mem.getUint32(addr, true);
                      return this._values[id];
                    }, "loadValue");
                    const storeValue = /* @__PURE__ */ __name((addr, v) => {
                      const nanHead = 2146959360;
                      if (typeof v === "number" && v !== 0) {
                        if (isNaN(v)) {
                          this.mem.setUint32(addr + 4, nanHead, true);
                          this.mem.setUint32(addr, 0, true);
                          return;
                        }
                        this.mem.setFloat64(addr, v, true);
                        return;
                      }
                      if (v === void 0) {
                        this.mem.setFloat64(addr, 0, true);
                        return;
                      }
                      let id = this._ids.get(v);
                      if (id === void 0) {
                        id = this._idPool.pop();
                        if (id === void 0) {
                          id = this._values.length;
                        }
                        this._values[id] = v;
                        this._goRefCounts[id] = 0;
                        this._ids.set(v, id);
                      }
                      this._goRefCounts[id]++;
                      let typeFlag = 0;
                      switch (typeof v) {
                        case "object":
                          if (v !== null) {
                            typeFlag = 1;
                          }
                          break;
                        case "string":
                          typeFlag = 2;
                          break;
                        case "symbol":
                          typeFlag = 3;
                          break;
                        case "function":
                          typeFlag = 4;
                          break;
                      }
                      this.mem.setUint32(addr + 4, nanHead | typeFlag, true);
                      this.mem.setUint32(addr, id, true);
                    }, "storeValue");
                    const loadSlice = /* @__PURE__ */ __name((addr) => {
                      const array = getInt64(addr + 0);
                      const len = getInt64(addr + 8);
                      return new Uint8Array(this._inst.exports.mem.buffer, array, len);
                    }, "loadSlice");
                    const loadSliceOfValues = /* @__PURE__ */ __name((addr) => {
                      const array = getInt64(addr + 0);
                      const len = getInt64(addr + 8);
                      const a = new Array(len);
                      for (let i = 0; i < len; i++) {
                        a[i] = loadValue(array + i * 8);
                      }
                      return a;
                    }, "loadSliceOfValues");
                    const loadString = /* @__PURE__ */ __name((addr) => {
                      const saddr = getInt64(addr + 0);
                      const len = getInt64(addr + 8);
                      return decoder.decode(new DataView(this._inst.exports.mem.buffer, saddr, len));
                    }, "loadString");
                    const timeOrigin = Date.now() - performance.now();
                    this.importObject = {
                      go: {
                        "runtime.wasmExit": (sp) => {
                          sp >>>= 0;
                          const code = this.mem.getInt32(sp + 8, true);
                          this.exited = true;
                          delete this._inst;
                          delete this._values;
                          delete this._goRefCounts;
                          delete this._ids;
                          delete this._idPool;
                          this.exit(code);
                        },
                        "runtime.wasmWrite": (sp) => {
                          sp >>>= 0;
                          const fd = getInt64(sp + 8);
                          const p = getInt64(sp + 16);
                          const n = this.mem.getInt32(sp + 24, true);
                          globalThis2.fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p, n));
                        },
                        "runtime.resetMemoryDataView": (sp) => {
                          sp >>>= 0;
                          this.mem = new DataView(this._inst.exports.mem.buffer);
                        },
                        "runtime.nanotime1": (sp) => {
                          sp >>>= 0;
                          setInt64(sp + 8, (timeOrigin + performance.now()) * 1e6);
                        },
                        "runtime.walltime": (sp) => {
                          sp >>>= 0;
                          const msec = new Date().getTime();
                          setInt64(sp + 8, msec / 1e3);
                          this.mem.setInt32(sp + 16, msec % 1e3 * 1e6, true);
                        },
                        "runtime.scheduleTimeoutEvent": (sp) => {
                          sp >>>= 0;
                          const id = this._nextCallbackTimeoutID;
                          this._nextCallbackTimeoutID++;
                          this._scheduledTimeouts.set(id, setTimeout(
                            () => {
                              this._resume();
                              while (this._scheduledTimeouts.has(id)) {
                                console.warn("scheduleTimeoutEvent: missed timeout event");
                                this._resume();
                              }
                            },
                            getInt64(sp + 8) + 1
                          ));
                          this.mem.setInt32(sp + 16, id, true);
                        },
                        "runtime.clearTimeoutEvent": (sp) => {
                          sp >>>= 0;
                          const id = this.mem.getInt32(sp + 8, true);
                          clearTimeout(this._scheduledTimeouts.get(id));
                          this._scheduledTimeouts.delete(id);
                        },
                        "runtime.getRandomData": (sp) => {
                          sp >>>= 0;
                          crypto.getRandomValues(loadSlice(sp + 8));
                        },
                        "syscall/js.finalizeRef": (sp) => {
                          sp >>>= 0;
                          const id = this.mem.getUint32(sp + 8, true);
                          this._goRefCounts[id]--;
                          if (this._goRefCounts[id] === 0) {
                            const v = this._values[id];
                            this._values[id] = null;
                            this._ids.delete(v);
                            this._idPool.push(id);
                          }
                        },
                        "syscall/js.stringVal": (sp) => {
                          sp >>>= 0;
                          storeValue(sp + 24, loadString(sp + 8));
                        },
                        "syscall/js.valueGet": (sp) => {
                          sp >>>= 0;
                          const result = Reflect.get(loadValue(sp + 8), loadString(sp + 16));
                          sp = this._inst.exports.getsp() >>> 0;
                          storeValue(sp + 32, result);
                        },
                        "syscall/js.valueSet": (sp) => {
                          sp >>>= 0;
                          Reflect.set(loadValue(sp + 8), loadString(sp + 16), loadValue(sp + 32));
                        },
                        "syscall/js.valueDelete": (sp) => {
                          sp >>>= 0;
                          Reflect.deleteProperty(loadValue(sp + 8), loadString(sp + 16));
                        },
                        "syscall/js.valueIndex": (sp) => {
                          sp >>>= 0;
                          storeValue(sp + 24, Reflect.get(loadValue(sp + 8), getInt64(sp + 16)));
                        },
                        "syscall/js.valueSetIndex": (sp) => {
                          sp >>>= 0;
                          Reflect.set(loadValue(sp + 8), getInt64(sp + 16), loadValue(sp + 24));
                        },
                        "syscall/js.valueCall": (sp) => {
                          sp >>>= 0;
                          try {
                            const v = loadValue(sp + 8);
                            const m = Reflect.get(v, loadString(sp + 16));
                            const args = loadSliceOfValues(sp + 32);
                            const result = Reflect.apply(m, v, args);
                            sp = this._inst.exports.getsp() >>> 0;
                            storeValue(sp + 56, result);
                            this.mem.setUint8(sp + 64, 1);
                          } catch (err) {
                            sp = this._inst.exports.getsp() >>> 0;
                            storeValue(sp + 56, err);
                            this.mem.setUint8(sp + 64, 0);
                          }
                        },
                        "syscall/js.valueInvoke": (sp) => {
                          sp >>>= 0;
                          try {
                            const v = loadValue(sp + 8);
                            const args = loadSliceOfValues(sp + 16);
                            const result = Reflect.apply(v, void 0, args);
                            sp = this._inst.exports.getsp() >>> 0;
                            storeValue(sp + 40, result);
                            this.mem.setUint8(sp + 48, 1);
                          } catch (err) {
                            sp = this._inst.exports.getsp() >>> 0;
                            storeValue(sp + 40, err);
                            this.mem.setUint8(sp + 48, 0);
                          }
                        },
                        "syscall/js.valueNew": (sp) => {
                          sp >>>= 0;
                          try {
                            const v = loadValue(sp + 8);
                            const args = loadSliceOfValues(sp + 16);
                            const result = Reflect.construct(v, args);
                            sp = this._inst.exports.getsp() >>> 0;
                            storeValue(sp + 40, result);
                            this.mem.setUint8(sp + 48, 1);
                          } catch (err) {
                            sp = this._inst.exports.getsp() >>> 0;
                            storeValue(sp + 40, err);
                            this.mem.setUint8(sp + 48, 0);
                          }
                        },
                        "syscall/js.valueLength": (sp) => {
                          sp >>>= 0;
                          setInt64(sp + 16, parseInt(loadValue(sp + 8).length));
                        },
                        "syscall/js.valuePrepareString": (sp) => {
                          sp >>>= 0;
                          const str = encoder.encode(String(loadValue(sp + 8)));
                          storeValue(sp + 16, str);
                          setInt64(sp + 24, str.length);
                        },
                        "syscall/js.valueLoadString": (sp) => {
                          sp >>>= 0;
                          const str = loadValue(sp + 8);
                          loadSlice(sp + 16).set(str);
                        },
                        "syscall/js.valueInstanceOf": (sp) => {
                          sp >>>= 0;
                          this.mem.setUint8(sp + 24, loadValue(sp + 8) instanceof loadValue(sp + 16) ? 1 : 0);
                        },
                        "syscall/js.copyBytesToGo": (sp) => {
                          sp >>>= 0;
                          const dst = loadSlice(sp + 8);
                          const src = loadValue(sp + 32);
                          if (!(src instanceof Uint8Array || src instanceof Uint8ClampedArray)) {
                            this.mem.setUint8(sp + 48, 0);
                            return;
                          }
                          const toCopy = src.subarray(0, dst.length);
                          dst.set(toCopy);
                          setInt64(sp + 40, toCopy.length);
                          this.mem.setUint8(sp + 48, 1);
                        },
                        "syscall/js.copyBytesToJS": (sp) => {
                          sp >>>= 0;
                          const dst = loadValue(sp + 8);
                          const src = loadSlice(sp + 16);
                          if (!(dst instanceof Uint8Array || dst instanceof Uint8ClampedArray)) {
                            this.mem.setUint8(sp + 48, 0);
                            return;
                          }
                          const toCopy = src.subarray(0, dst.length);
                          dst.set(toCopy);
                          setInt64(sp + 40, toCopy.length);
                          this.mem.setUint8(sp + 48, 1);
                        },
                        "debug": (value) => {
                          console.log(value);
                        }
                      }
                    };
                  }
                  run(instance) {
                    return __async2(this, null, function* () {
                      if (!(instance instanceof WebAssembly.Instance)) {
                        throw new Error("Go.run: WebAssembly.Instance expected");
                      }
                      this._inst = instance;
                      this.mem = new DataView(this._inst.exports.mem.buffer);
                      this._values = [
                        NaN,
                        0,
                        null,
                        true,
                        false,
                        globalThis2,
                        this
                      ];
                      this._goRefCounts = new Array(this._values.length).fill(Infinity);
                      this._ids = /* @__PURE__ */ new Map([
                        [0, 1],
                        [null, 2],
                        [true, 3],
                        [false, 4],
                        [globalThis2, 5],
                        [this, 6]
                      ]);
                      this._idPool = [];
                      this.exited = false;
                      let offset = 4096;
                      const strPtr = /* @__PURE__ */ __name((str) => {
                        const ptr = offset;
                        const bytes = encoder.encode(str + "\0");
                        new Uint8Array(this.mem.buffer, offset, bytes.length).set(bytes);
                        offset += bytes.length;
                        if (offset % 8 !== 0) {
                          offset += 8 - offset % 8;
                        }
                        return ptr;
                      }, "strPtr");
                      const argc = this.argv.length;
                      const argvPtrs = [];
                      this.argv.forEach((arg) => {
                        argvPtrs.push(strPtr(arg));
                      });
                      argvPtrs.push(0);
                      const keys = Object.keys(this.env).sort();
                      keys.forEach((key) => {
                        argvPtrs.push(strPtr(`${key}=${this.env[key]}`));
                      });
                      argvPtrs.push(0);
                      const argv = offset;
                      argvPtrs.forEach((ptr) => {
                        this.mem.setUint32(offset, ptr, true);
                        this.mem.setUint32(offset + 4, 0, true);
                        offset += 8;
                      });
                      const wasmMinDataAddr = 4096 + 8192;
                      if (offset >= wasmMinDataAddr) {
                        throw new Error("total length of command line and environment variables exceeds limit");
                      }
                      this._inst.exports.run(argc, argv);
                      if (this.exited) {
                        this._resolveExitPromise();
                      }
                      yield this._exitPromise;
                    });
                  }
                  _resume() {
                    if (this.exited) {
                      throw new Error("Go program has already exited");
                    }
                    this._inst.exports.resume();
                    if (this.exited) {
                      this._resolveExitPromise();
                    }
                  }
                  _makeFuncWrapper(id) {
                    const go = this;
                    return function() {
                      const event = { id, this: this, args: arguments };
                      go._pendingEvent = event;
                      go._resume();
                      return event.result;
                    };
                  }
                };
              })();
              onmessage2 = /* @__PURE__ */ __name(({ data: wasm }) => {
                let decoder = new TextDecoder();
                let fs = globalThis2.fs;
                let stderr = "";
                fs.writeSync = (fd, buffer) => {
                  if (fd === 1) {
                    postMessage(buffer);
                  } else if (fd === 2) {
                    stderr += decoder.decode(buffer);
                    let parts = stderr.split("\n");
                    if (parts.length > 1)
                      console.log(parts.slice(0, -1).join("\n"));
                    stderr = parts[parts.length - 1];
                  } else {
                    throw new Error("Bad write");
                  }
                  return buffer.length;
                };
                let stdin = [];
                let resumeStdin;
                let stdinPos = 0;
                onmessage2 = /* @__PURE__ */ __name(({ data }) => {
                  if (data.length > 0) {
                    stdin.push(data);
                    if (resumeStdin)
                      resumeStdin();
                  }
                }, "onmessage");
                fs.read = (fd, buffer, offset, length, position, callback) => {
                  if (fd !== 0 || offset !== 0 || length !== buffer.length || position !== null) {
                    throw new Error("Bad read");
                  }
                  if (stdin.length === 0) {
                    resumeStdin = /* @__PURE__ */ __name(() => fs.read(fd, buffer, offset, length, position, callback), "resumeStdin");
                    return;
                  }
                  let first = stdin[0];
                  let count = Math.max(0, Math.min(length, first.length - stdinPos));
                  buffer.set(first.subarray(stdinPos, stdinPos + count), offset);
                  stdinPos += count;
                  if (stdinPos === first.length) {
                    stdin.shift();
                    stdinPos = 0;
                  }
                  callback(null, count);
                };
                let go = new globalThis2.Go();
                go.argv = ["", `--service=${"0.16.3"}`];
                tryToInstantiateModule(wasm, go).then(
                  (instance) => {
                    postMessage(null);
                    go.run(instance);
                  },
                  (error) => {
                    postMessage(error);
                  }
                );
              }, "onmessage");
              function tryToInstantiateModule(wasm, go) {
                return __async2(this, null, function* () {
                  if (wasm instanceof WebAssembly.Module) {
                    return WebAssembly.instantiate(wasm, go.importObject);
                  }
                  const res = yield fetch(wasm);
                  if (!res.ok)
                    throw new Error(`Failed to download ${JSON.stringify(wasm)}`);
                  if ("instantiateStreaming" in WebAssembly && /^application\/wasm($|;)/i.test(res.headers.get("Content-Type") || "")) {
                    const result2 = yield WebAssembly.instantiateStreaming(res, go.importObject);
                    return result2.instance;
                  }
                  const bytes = yield res.arrayBuffer();
                  const result = yield WebAssembly.instantiate(bytes, go.importObject);
                  return result.instance;
                });
              }
              __name(tryToInstantiateModule, "tryToInstantiateModule");
              return (m) => onmessage2(m);
            })((data) => worker.onmessage({ data }));
            worker = {
              onmessage: null,
              postMessage: (data) => setTimeout(() => onmessage({ data })),
              terminate() {
              }
            };
          }
          let firstMessageResolve;
          let firstMessageReject;
          const firstMessagePromise = new Promise((resolve, reject) => {
            firstMessageResolve = resolve;
            firstMessageReject = reject;
          });
          worker.onmessage = ({ data: error }) => {
            worker.onmessage = ({ data }) => readFromStdout(data);
            if (error)
              firstMessageReject(error);
            else
              firstMessageResolve();
          };
          worker.postMessage(wasmModule || new URL(wasmURL, location.href).toString());
          let { readFromStdout, service } = createChannel({
            writeToStdin(bytes) {
              worker.postMessage(bytes);
            },
            isSync: false,
            isWriteUnavailable: true,
            esbuild: browser_exports
          });
          yield firstMessagePromise;
          longLivedService = {
            build: (options) => new Promise((resolve, reject) => service.buildOrServe({
              callName: "build",
              refs: null,
              serveOptions: null,
              options,
              isTTY: false,
              defaultWD: "/",
              callback: (err, res) => err ? reject(err) : resolve(res)
            })),
            transform: (input, options) => new Promise((resolve, reject) => service.transform({
              callName: "transform",
              refs: null,
              input,
              options: options || {},
              isTTY: false,
              fs: {
                readFile(_, callback) {
                  callback(new Error("Internal error"), null);
                },
                writeFile(_, callback) {
                  callback(null);
                }
              },
              callback: (err, res) => err ? reject(err) : resolve(res)
            })),
            formatMessages: (messages, options) => new Promise((resolve, reject) => service.formatMessages({
              callName: "formatMessages",
              refs: null,
              messages,
              options,
              callback: (err, res) => err ? reject(err) : resolve(res)
            })),
            analyzeMetafile: (metafile, options) => new Promise((resolve, reject) => service.analyzeMetafile({
              callName: "analyzeMetafile",
              refs: null,
              metafile: typeof metafile === "string" ? metafile : JSON.stringify(metafile),
              options,
              callback: (err, res) => err ? reject(err) : resolve(res)
            }))
          };
        }), "startRunningService");
        var browser_default = browser_exports;
      })(typeof module === "object" ? module : { set exports(x) {
        (typeof self !== "undefined" ? self : this).esbuild = x;
      } });
    }
  });

  // js/sw.ts
  init_define_process();
  var import_lodash = __toESM(require_lodash(), 1);

  // js/esmTransform.ts
  init_define_process();
  var import_esbuild_wasm = __toESM(require_browser(), 1);
  var mod = {
    init: false,
    initialize: () => {
      if (mod.init !== false)
        return mod.init;
      return fetch(`${location.origin}/files.json`).then((f) => f.json()).then((k) => {
        const wasmURL = new URL(
          k[Object.keys(k).find(
            (i) => i.indexOf(".wasm") !== -1 && i.indexOf("esbuild") !== -1
          )],
          location.origin
        ).toString();
        mod.init = (0, import_esbuild_wasm.initialize)({
          wasmURL
        }).then(() => mod.init = true);
        return mod.init;
      });
    }
  };
  var transform = /* @__PURE__ */ __name(async (code, opts) => {
    const initFinished = mod.initialize();
    if (initFinished !== true)
      await initFinished;
    return (0, import_esbuild_wasm.transform)(code, opts);
  }, "transform");

  // js/sw.ts
  self.addEventListener("activate", () => {
  });
  var npmCache;
  var chunkCache;
  var fileCache;
  self.addEventListener("fetch", function(event) {
    return event.respondWith(
      (async () => {
        let url = new URL(event.request.url);
        let isChunk = url.pathname.includes("chunk-");
        if (url.pathname.indexOf("/live/") !== -1) {
          const controller = new AbortController();
          let req = new Request(event.request.url, {
            ...event.request,
            signal: controller.signal
          });
          let resp = await fetch(req);
          if (!resp.ok)
            return resp;
          resp = new Response(resp.body, resp);
          const contentHash = resp.headers.has("content_hash") ? resp.headers.get("content_hash") : null;
          if (contentHash) {
            chunkCache = chunkCache || await caches.open("chunks");
            let cacheKey2 = new Request(new URL("/" + contentHash, url).toString());
            let cachedResp = await chunkCache.match(cacheKey2);
            if (cachedResp) {
              controller.abort();
              return cachedResp;
            }
            cachedResp = new Response(await resp.blob(), resp);
            event.waitUntil(chunkCache.put(cacheKey2, cachedResp.clone()));
            return cachedResp;
          }
          resp = new Response(resp.body, resp);
          return resp;
        }
        const myCache = url.pathname.includes("npm:/v") ? npmCache = npmCache || await caches.open(url.pathname.slice(0, 10)) : url.pathname.includes("chunk-") || isChunk ? chunkCache = chunkCache || await caches.open("chunks") : fileCache = fileCache || await caches.open(`fileCache`);
        if (url.pathname.length < 2)
          return fetch(event.request);
        let request = event.request;
        const cacheKey = new Request(
          url
        );
        let response = await myCache.match(cacheKey);
        if (response)
          return response;
        try {
          request = new Request(request.url, request);
          response = await fetch(request);
          response = new Response(response.body, response);
          if (response.status === 307 || !response.ok || !response.body)
            return response;
          if (url.pathname.indexOf(".ts") !== -1 && url.pathname.indexOf(".d.ts") === -1 && url.pathname.indexOf(".tsx") === -1) {
            const transformed = (await transform(await response.text(), { format: "esm", loader: "ts", target: "es2022" })).code;
            if (typeof transformed !== "string")
              return new Response("500 transpile error", { status: 500 });
            response = new Response(transformed, {
              ...response,
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "no-cache",
                "Content-Type": "application/json; charset=UTF-8"
              }
            });
          }
          if (response.headers.get("Cache-Control") !== "no-cache" || isChunk) {
            event.waitUntil(myCache.put(cacheKey, response.clone()));
          }
          return response;
        } catch {
          return new Response("oh no!", {
            status: 500,
            statusText: `Could not fetch:  ${request.url}`
          });
        }
      })()
    );
  });
})();

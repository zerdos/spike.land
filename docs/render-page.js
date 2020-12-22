(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("/z/monorepo/node_modules/@reach/router/index.js"), require("fs"), require("/z/monorepo/node_modules/lodash/lodash.js"), require("path"), require("react"), require("react-dom/server"), require("react-helmet"));
	else if(typeof define === 'function' && define.amd)
		define("lib", ["/z/monorepo/node_modules/@reach/router/index.js", "fs", "/z/monorepo/node_modules/lodash/lodash.js", "path", "react", "react-dom/server", "react-helmet"], factory);
	else if(typeof exports === 'object')
		exports["lib"] = factory(require("/z/monorepo/node_modules/@reach/router/index.js"), require("fs"), require("/z/monorepo/node_modules/lodash/lodash.js"), require("path"), require("react"), require("react-dom/server"), require("react-helmet"));
	else
		root["lib"] = factory(root["/z/monorepo/node_modules/@reach/router/index.js"], root["fs"], root["/z/monorepo/node_modules/lodash/lodash.js"], root["path"], root["react"], root["react-dom/server"], root["react-helmet"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__reach_router__, __WEBPACK_EXTERNAL_MODULE_fs__, __WEBPACK_EXTERNAL_MODULE_lodash__, __WEBPACK_EXTERNAL_MODULE_path__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_react_dom_server__, __WEBPACK_EXTERNAL_MODULE_react_helmet__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./.cache/static-entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!***************************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!****************************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray */ "../../node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!********************************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/construct.js":
/*!********************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/construct.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "../../node_modules/@babel/runtime/helpers/setPrototypeOf.js");

var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct */ "../../node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js");

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/defineProperty.js":
/*!*************************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!*******************************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _arrayLikeToArray; });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
/*!********************************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _arrayWithoutHoles; });
/* harmony import */ var _babel_runtime_helpers_esm_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/arrayLikeToArray */ "../../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return Object(_babel_runtime_helpers_esm_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
}

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*****************************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _defineProperty; });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
/*!******************************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _iterableToArray; });
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
/*!********************************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _nonIterableSpread; });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
/*!********************************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _toConsumableArray; });
/* harmony import */ var _babel_runtime_helpers_esm_arrayWithoutHoles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/arrayWithoutHoles */ "../../node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _babel_runtime_helpers_esm_iterableToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/iterableToArray */ "../../node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_unsupportedIterableToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/unsupportedIterableToArray */ "../../node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_nonIterableSpread__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/nonIterableSpread */ "../../node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");




function _toConsumableArray(arr) {
  return Object(_babel_runtime_helpers_esm_arrayWithoutHoles__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || Object(_babel_runtime_helpers_esm_iterableToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(arr) || Object(_babel_runtime_helpers_esm_unsupportedIterableToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(arr) || Object(_babel_runtime_helpers_esm_nonIterableSpread__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!*****************************************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _unsupportedIterableToArray; });
/* harmony import */ var _babel_runtime_helpers_esm_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/arrayLikeToArray */ "../../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return Object(_babel_runtime_helpers_esm_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Object(_babel_runtime_helpers_esm_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
}

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/extends.js":
/*!******************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/extends.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
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

module.exports = _extends;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/inheritsLoose.js":
/*!************************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/inheritsLoose.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

module.exports = _inheritsLoose;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!********************************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/interopRequireWildcard.js":
/*!*********************************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/interopRequireWildcard.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "../../node_modules/@babel/runtime/helpers/typeof.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js":
/*!***********************************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = _isNativeReflectConstruct;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!**************************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!****************************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/objectWithoutProperties.js":
/*!**********************************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/objectWithoutProperties.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var objectWithoutPropertiesLoose = __webpack_require__(/*! ./objectWithoutPropertiesLoose */ "../../node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

module.exports = _objectWithoutProperties;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js":
/*!***************************************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!*************************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!****************************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles */ "../../node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");

var iterableToArray = __webpack_require__(/*! ./iterableToArray */ "../../node_modules/@babel/runtime/helpers/iterableToArray.js");

var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray */ "../../node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");

var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread */ "../../node_modules/@babel/runtime/helpers/nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/typeof.js":
/*!*****************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/typeof.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!*************************************************************************************!*\
  !*** /z/monorepo/node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray */ "../../node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;

/***/ }),

/***/ "../../node_modules/@emotion/is-prop-valid/dist/is-prop-valid.esm.js":
/*!*********************************************************************************!*\
  !*** /z/monorepo/node_modules/@emotion/is-prop-valid/dist/is-prop-valid.esm.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/memoize */ "../../node_modules/@emotion/is-prop-valid/node_modules/@emotion/memoize/dist/memoize.esm.js");


var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var index = Object(_emotion_memoize__WEBPACK_IMPORTED_MODULE_0__["default"])(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);

/* harmony default export */ __webpack_exports__["default"] = (index);


/***/ }),

/***/ "../../node_modules/@emotion/is-prop-valid/node_modules/@emotion/memoize/dist/memoize.esm.js":
/*!*********************************************************************************************************!*\
  !*** /z/monorepo/node_modules/@emotion/is-prop-valid/node_modules/@emotion/memoize/dist/memoize.esm.js ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function memoize(fn) {
  var cache = {};
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

/* harmony default export */ __webpack_exports__["default"] = (memoize);


/***/ }),

/***/ "../../node_modules/@mdx-js/react/dist/esm.js":
/*!**********************************************************!*\
  !*** /z/monorepo/node_modules/@mdx-js/react/dist/esm.js ***!
  \**********************************************************/
/*! exports provided: MDXContext, MDXProvider, mdx, useMDXComponents, withMDXComponents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDXContext", function() { return MDXContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDXProvider", function() { return MDXProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mdx", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useMDXComponents", function() { return useMDXComponents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withMDXComponents", function() { return withMDXComponents; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var isFunction = function isFunction(obj) {
  return typeof obj === 'function';
};

var MDXContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext({});
var withMDXComponents = function withMDXComponents(Component) {
  return function (props) {
    var allComponents = useMDXComponents(props.components);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, _extends({}, props, {
      components: allComponents
    }));
  };
};
var useMDXComponents = function useMDXComponents(components) {
  var contextComponents = react__WEBPACK_IMPORTED_MODULE_0___default.a.useContext(MDXContext);
  var allComponents = contextComponents;

  if (components) {
    allComponents = isFunction(components) ? components(contextComponents) : _objectSpread2(_objectSpread2({}, contextComponents), components);
  }

  return allComponents;
};
var MDXProvider = function MDXProvider(props) {
  var allComponents = useMDXComponents(props.components);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MDXContext.Provider, {
    value: allComponents
  }, props.children);
};

var TYPE_PROP_NAME = 'mdxType';
var DEFAULTS = {
  inlineCode: 'code',
  wrapper: function wrapper(_ref) {
    var children = _ref.children;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {}, children);
  }
};
var MDXCreateElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef(function (props, ref) {
  var propComponents = props.components,
      mdxType = props.mdxType,
      originalType = props.originalType,
      parentName = props.parentName,
      etc = _objectWithoutProperties(props, ["components", "mdxType", "originalType", "parentName"]);

  var components = useMDXComponents(propComponents);
  var type = mdxType;
  var Component = components["".concat(parentName, ".").concat(type)] || components[type] || DEFAULTS[type] || originalType;

  if (propComponents) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, _objectSpread2(_objectSpread2({
      ref: ref
    }, etc), {}, {
      components: propComponents
    }));
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, _objectSpread2({
    ref: ref
  }, etc));
});
MDXCreateElement.displayName = 'MDXCreateElement';
function createElement (type, props) {
  var args = arguments;
  var mdxType = props && props.mdxType;

  if (typeof type === 'string' || mdxType) {
    var argsLength = args.length;
    var createElementArgArray = new Array(argsLength);
    createElementArgArray[0] = MDXCreateElement;
    var newProps = {};

    for (var key in props) {
      if (hasOwnProperty.call(props, key)) {
        newProps[key] = props[key];
      }
    }

    newProps.originalType = type;
    newProps[TYPE_PROP_NAME] = typeof type === 'string' ? type : mdxType;
    createElementArgArray[1] = newProps;

    for (var i = 2; i < argsLength; i++) {
      createElementArgArray[i] = args[i];
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement.apply(null, createElementArgArray);
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement.apply(null, args);
}




/***/ }),

/***/ "../../node_modules/@reach/router/lib/utils.js":
/*!***********************************************************!*\
  !*** /z/monorepo/node_modules/@reach/router/lib/utils.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.shallowCompare = exports.validateRedirect = exports.insertParams = exports.resolve = exports.match = exports.pick = exports.startsWith = undefined;

var _invariant = __webpack_require__(/*! invariant */ "../../node_modules/invariant/invariant.js");

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

////////////////////////////////////////////////////////////////////////////////
// startsWith(string, search) - Check if `string` starts with `search`
var startsWith = function startsWith(string, search) {
  return string.substr(0, search.length) === search;
};

////////////////////////////////////////////////////////////////////////////////
// pick(routes, uri)
//
// Ranks and picks the best route to match. Each segment gets the highest
// amount of points, then the type of segment gets an additional amount of
// points where
//
//     static > dynamic > splat > root
//
// This way we don't have to worry about the order of our routes, let the
// computers do it.
//
// A route looks like this
//
//     { path, default, value }
//
// And a returned match looks like:
//
//     { route, params, uri }
//
// I know, I should use TypeScript not comments for these types.
var pick = function pick(routes, uri) {
  var match = void 0;
  var default_ = void 0;

  var _uri$split = uri.split("?"),
      uriPathname = _uri$split[0];

  var uriSegments = segmentize(uriPathname);
  var isRootUri = uriSegments[0] === "";
  var ranked = rankRoutes(routes);

  for (var i = 0, l = ranked.length; i < l; i++) {
    var missed = false;
    var route = ranked[i].route;

    if (route.default) {
      default_ = {
        route: route,
        params: {},
        uri: uri
      };
      continue;
    }

    var routeSegments = segmentize(route.path);
    var params = {};
    var max = Math.max(uriSegments.length, routeSegments.length);
    var index = 0;

    for (; index < max; index++) {
      var routeSegment = routeSegments[index];
      var uriSegment = uriSegments[index];

      if (isSplat(routeSegment)) {
        // Hit a splat, just grab the rest, and return a match
        // uri:   /files/documents/work
        // route: /files/*
        var param = routeSegment.slice(1) || "*";
        params[param] = uriSegments.slice(index).map(decodeURIComponent).join("/");
        break;
      }

      if (uriSegment === undefined) {
        // URI is shorter than the route, no match
        // uri:   /users
        // route: /users/:userId
        missed = true;
        break;
      }

      var dynamicMatch = paramRe.exec(routeSegment);

      if (dynamicMatch && !isRootUri) {
        var matchIsNotReserved = reservedNames.indexOf(dynamicMatch[1]) === -1;
        !matchIsNotReserved ?  false ? undefined : (0, _invariant2.default)(false) : void 0;
        var value = decodeURIComponent(uriSegment);
        params[dynamicMatch[1]] = value;
      } else if (routeSegment !== uriSegment) {
        // Current segments don't match, not dynamic, not splat, so no match
        // uri:   /users/123/settings
        // route: /users/:id/profile
        missed = true;
        break;
      }
    }

    if (!missed) {
      match = {
        route: route,
        params: params,
        uri: "/" + uriSegments.slice(0, index).join("/")
      };
      break;
    }
  }

  return match || default_ || null;
};

////////////////////////////////////////////////////////////////////////////////
// match(path, uri) - Matches just one path to a uri, also lol
var match = function match(path, uri) {
  return pick([{ path: path }], uri);
};

////////////////////////////////////////////////////////////////////////////////
// resolve(to, basepath)
//
// Resolves URIs as though every path is a directory, no files.  Relative URIs
// in the browser can feel awkward because not only can you be "in a directory"
// you can be "at a file", too. For example
//
//     browserSpecResolve('foo', '/bar/') => /bar/foo
//     browserSpecResolve('foo', '/bar') => /foo
//
// But on the command line of a file system, it's not as complicated, you can't
// `cd` from a file, only directories.  This way, links have to know less about
// their current path. To go deeper you can do this:
//
//     <Link to="deeper"/>
//     // instead of
//     <Link to=`{${props.uri}/deeper}`/>
//
// Just like `cd`, if you want to go deeper from the command line, you do this:
//
//     cd deeper
//     # not
//     cd $(pwd)/deeper
//
// By treating every path as a directory, linking to relative paths should
// require less contextual information and (fingers crossed) be more intuitive.
var resolve = function resolve(to, base) {
  // /foo/bar, /baz/qux => /foo/bar
  if (startsWith(to, "/")) {
    return to;
  }

  var _to$split = to.split("?"),
      toPathname = _to$split[0],
      toQuery = _to$split[1];

  var _base$split = base.split("?"),
      basePathname = _base$split[0];

  var toSegments = segmentize(toPathname);
  var baseSegments = segmentize(basePathname);

  // ?a=b, /users?b=c => /users?a=b
  if (toSegments[0] === "") {
    return addQuery(basePathname, toQuery);
  }

  // profile, /users/789 => /users/789/profile
  if (!startsWith(toSegments[0], ".")) {
    var pathname = baseSegments.concat(toSegments).join("/");
    return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
  }

  // ./         /users/123  =>  /users/123
  // ../        /users/123  =>  /users
  // ../..      /users/123  =>  /
  // ../../one  /a/b/c/d    =>  /a/b/one
  // .././one   /a/b/c/d    =>  /a/b/c/one
  var allSegments = baseSegments.concat(toSegments);
  var segments = [];
  for (var i = 0, l = allSegments.length; i < l; i++) {
    var segment = allSegments[i];
    if (segment === "..") segments.pop();else if (segment !== ".") segments.push(segment);
  }

  return addQuery("/" + segments.join("/"), toQuery);
};

////////////////////////////////////////////////////////////////////////////////
// insertParams(path, params)

var insertParams = function insertParams(path, params) {
  var _path$split = path.split("?"),
      pathBase = _path$split[0],
      _path$split$ = _path$split[1],
      query = _path$split$ === undefined ? "" : _path$split$;

  var segments = segmentize(pathBase);
  var constructedPath = "/" + segments.map(function (segment) {
    var match = paramRe.exec(segment);
    return match ? params[match[1]] : segment;
  }).join("/");
  var _params$location = params.location;
  _params$location = _params$location === undefined ? {} : _params$location;
  var _params$location$sear = _params$location.search,
      search = _params$location$sear === undefined ? "" : _params$location$sear;

  var searchSplit = search.split("?")[1] || "";
  constructedPath = addQuery(constructedPath, query, searchSplit);
  return constructedPath;
};

var validateRedirect = function validateRedirect(from, to) {
  var filter = function filter(segment) {
    return isDynamic(segment);
  };
  var fromString = segmentize(from).filter(filter).sort().join("/");
  var toString = segmentize(to).filter(filter).sort().join("/");
  return fromString === toString;
};

////////////////////////////////////////////////////////////////////////////////
// Junk
var paramRe = /^:(.+)/;

var SEGMENT_POINTS = 4;
var STATIC_POINTS = 3;
var DYNAMIC_POINTS = 2;
var SPLAT_PENALTY = 1;
var ROOT_POINTS = 1;

var isRootSegment = function isRootSegment(segment) {
  return segment === "";
};
var isDynamic = function isDynamic(segment) {
  return paramRe.test(segment);
};
var isSplat = function isSplat(segment) {
  return segment && segment[0] === "*";
};

var rankRoute = function rankRoute(route, index) {
  var score = route.default ? 0 : segmentize(route.path).reduce(function (score, segment) {
    score += SEGMENT_POINTS;
    if (isRootSegment(segment)) score += ROOT_POINTS;else if (isDynamic(segment)) score += DYNAMIC_POINTS;else if (isSplat(segment)) score -= SEGMENT_POINTS + SPLAT_PENALTY;else score += STATIC_POINTS;
    return score;
  }, 0);
  return { route: route, score: score, index: index };
};

var rankRoutes = function rankRoutes(routes) {
  return routes.map(rankRoute).sort(function (a, b) {
    return a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index;
  });
};

var segmentize = function segmentize(uri) {
  return uri
  // strip starting/ending slashes
  .replace(/(^\/+|\/+$)/g, "").split("/");
};

var addQuery = function addQuery(pathname) {
  for (var _len = arguments.length, query = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    query[_key - 1] = arguments[_key];
  }

  query = query.filter(function (q) {
    return q && q.length > 0;
  });
  return pathname + (query && query.length > 0 ? "?" + query.join("&") : "");
};

var reservedNames = ["uri", "path"];

/**
 * Shallow compares two objects.
 * @param {Object} obj1 The first object to compare.
 * @param {Object} obj2 The second object to compare.
 */
var shallowCompare = function shallowCompare(obj1, obj2) {
  var obj1Keys = Object.keys(obj1);
  return obj1Keys.length === Object.keys(obj2).length && obj1Keys.every(function (key) {
    return obj2.hasOwnProperty(key) && obj1[key] === obj2[key];
  });
};

////////////////////////////////////////////////////////////////////////////////
exports.startsWith = startsWith;
exports.pick = pick;
exports.match = match;
exports.resolve = resolve;
exports.insertParams = insertParams;
exports.validateRedirect = validateRedirect;
exports.shallowCompare = shallowCompare;

/***/ }),

/***/ "../../node_modules/framer-motion/dist/framer-motion.es.js":
/*!***********************************************************************!*\
  !*** /z/monorepo/node_modules/framer-motion/dist/framer-motion.es.js ***!
  \***********************************************************************/
/*! exports provided: AnimateLayoutFeature, AnimatePresence, AnimateSharedLayout, AnimationControls, AnimationFeature, DragControls, DragFeature, ExitFeature, FramerTreeLayoutContext, GesturesFeature, HTMLVisualElement, LayoutGroupContext, MotionConfig, MotionConfigContext, MotionValue, PresenceContext, SharedLayoutContext, VisibilityAction, addScaleCorrection, animate, animateVisualElement, animationControls, createBatcher, createDomMotionComponent, createMotionComponent, isValidMotionProp, m, motion, motionValue, resolveMotionValue, transform, useAnimation, useCycle, useDeprecatedAnimatedState, useDeprecatedInvertedScale, useDomEvent, useDragControls, useElementScroll, useExternalRef, useGestures, useIsPresent, useMotionTemplate, useMotionValue, usePanGesture, usePresence, useReducedMotion, useSpring, useTapGesture, useTransform, useViewportScroll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimateLayoutFeature", function() { return AnimateLayout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimatePresence", function() { return AnimatePresence; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimateSharedLayout", function() { return AnimateSharedLayout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationControls", function() { return AnimationControls; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationFeature", function() { return Animation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragControls", function() { return DragControls; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragFeature", function() { return Drag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExitFeature", function() { return Exit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FramerTreeLayoutContext", function() { return FramerTreeLayoutContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GesturesFeature", function() { return Gestures; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HTMLVisualElement", function() { return HTMLVisualElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutGroupContext", function() { return LayoutGroupContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MotionConfig", function() { return MotionConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MotionConfigContext", function() { return MotionConfigContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MotionValue", function() { return MotionValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PresenceContext", function() { return PresenceContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedLayoutContext", function() { return SharedLayoutContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisibilityAction", function() { return VisibilityAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addScaleCorrection", function() { return addScaleCorrection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animate", function() { return animate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animateVisualElement", function() { return animateVisualElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animationControls", function() { return animationControls; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createBatcher", function() { return createBatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDomMotionComponent", function() { return createDomMotionComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMotionComponent", function() { return createMotionComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidMotionProp", function() { return isValidMotionProp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return m; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "motion", function() { return motion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "motionValue", function() { return motionValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveMotionValue", function() { return resolveMotionValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transform", function() { return transform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useAnimation", function() { return useAnimation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useCycle", function() { return useCycle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useDeprecatedAnimatedState", function() { return useAnimatedState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useDeprecatedInvertedScale", function() { return useInvertedScale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useDomEvent", function() { return useDomEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useDragControls", function() { return useDragControls; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useElementScroll", function() { return useElementScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useExternalRef", function() { return useExternalRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useGestures", function() { return useGestures; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useIsPresent", function() { return useIsPresent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useMotionTemplate", function() { return useMotionTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useMotionValue", function() { return useMotionValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "usePanGesture", function() { return usePanGesture; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "usePresence", function() { return usePresence; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useReducedMotion", function() { return useReducedMotion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useSpring", function() { return useSpring; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useTapGesture", function() { return useTapGesture; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useTransform", function() { return useTransform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useViewportScroll", function() { return useViewportScroll; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/framer-motion/node_modules/tslib/tslib.es6.js");
/* harmony import */ var framesync__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! framesync */ "../../node_modules/framesync/dist/framesync.es.js");
/* harmony import */ var popmotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! popmotion */ "../../node_modules/popmotion/dist/popmotion.es.js");
/* harmony import */ var hey_listen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! hey-listen */ "../../node_modules/hey-listen/dist/hey-listen.es.js");
/* harmony import */ var style_value_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! style-value-types */ "../../node_modules/style-value-types/dist/style-value-types.es.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);







var isRefObject = function (ref) {
    return typeof ref === "object" && ref.hasOwnProperty("current");
};

/**
 * A generic subscription manager.
 */
var SubscriptionManager = /** @class */ (function () {
    function SubscriptionManager() {
        this.subscriptions = new Set();
    }
    SubscriptionManager.prototype.add = function (handler) {
        var _this = this;
        this.subscriptions.add(handler);
        return function () { return void _this.subscriptions.delete(handler); };
    };
    SubscriptionManager.prototype.notify = function (
    /**
     * Using ...args would be preferable but it's array creation and this
     * might be fired every frame.
     */
    a, b, c) {
        var e_1, _a;
        if (!this.subscriptions.size)
            return;
        try {
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(this.subscriptions), _c = _b.next(); !_c.done; _c = _b.next()) {
                var handler = _c.value;
                handler(a, b, c);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    SubscriptionManager.prototype.clear = function () {
        this.subscriptions.clear();
    };
    return SubscriptionManager;
}());

var isFloat = function (value) {
    return !isNaN(parseFloat(value));
};
/**
 * `MotionValue` is used to track the state and velocity of motion values.
 *
 * @public
 */
var MotionValue = /** @class */ (function () {
    /**
     * @param init - The initiating value
     * @param config - Optional configuration options
     *
     * -  `transformer`: A function to transform incoming values with.
     *
     * @internal
     */
    function MotionValue(init) {
        var _this = this;
        /**
         * Duration, in milliseconds, since last updating frame.
         *
         * @internal
         */
        this.timeDelta = 0;
        /**
         * Timestamp of the last time this `MotionValue` was updated.
         *
         * @internal
         */
        this.lastUpdated = 0;
        /**
         * Functions to notify when the `MotionValue` updates.
         *
         * @internal
         */
        this.updateSubscribers = new SubscriptionManager();
        /**
         * Functions to notify when the `MotionValue` updates and `render` is set to `true`.
         *
         * @internal
         */
        this.renderSubscribers = new SubscriptionManager();
        /**
         * Tracks whether this value can output a velocity. Currently this is only true
         * if the value is numerical, but we might be able to widen the scope here and support
         * other value types.
         *
         * @internal
         */
        this.canTrackVelocity = false;
        this.updateAndNotify = function (v, render) {
            if (render === void 0) { render = true; }
            _this.prev = _this.current;
            _this.current = v;
            if (_this.prev !== _this.current) {
                _this.updateSubscribers.notify(_this.current);
            }
            if (render) {
                _this.renderSubscribers.notify(_this.current);
            }
            // Update timestamp
            var _a = Object(framesync__WEBPACK_IMPORTED_MODULE_1__["getFrameData"])(), delta = _a.delta, timestamp = _a.timestamp;
            if (_this.lastUpdated !== timestamp) {
                _this.timeDelta = delta;
                _this.lastUpdated = timestamp;
                framesync__WEBPACK_IMPORTED_MODULE_1__["default"].postRender(_this.scheduleVelocityCheck);
            }
        };
        /**
         * Schedule a velocity check for the next frame.
         *
         * This is an instanced and bound function to prevent generating a new
         * function once per frame.
         *
         * @internal
         */
        this.scheduleVelocityCheck = function () { return framesync__WEBPACK_IMPORTED_MODULE_1__["default"].postRender(_this.velocityCheck); };
        /**
         * Updates `prev` with `current` if the value hasn't been updated this frame.
         * This ensures velocity calculations return `0`.
         *
         * This is an instanced and bound function to prevent generating a new
         * function once per frame.
         *
         * @internal
         */
        this.velocityCheck = function (_a) {
            var timestamp = _a.timestamp;
            if (timestamp !== _this.lastUpdated) {
                _this.prev = _this.current;
            }
        };
        this.current = init;
        this.canTrackVelocity = isFloat(this.current);
    }
    /**
     * Adds a function that will be notified when the `MotionValue` is updated.
     *
     * It returns a function that, when called, will cancel the subscription.
     *
     * When calling `onChange` inside a React component, it should be wrapped with the
     * `useEffect` hook. As it returns an unsubscribe function, this should be returned
     * from the `useEffect` function to ensure you don't add duplicate subscribers..
     *
     * @library
     *
     * ```jsx
     * function MyComponent() {
     *   const x = useMotionValue(0)
     *   const y = useMotionValue(0)
     *   const opacity = useMotionValue(1)
     *
     *   useEffect(() => {
     *     function updateOpacity() {
     *       const maxXY = Math.max(x.get(), y.get())
     *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
     *       opacity.set(newOpacity)
     *     }
     *
     *     const unsubscribeX = x.onChange(updateOpacity)
     *     const unsubscribeY = y.onChange(updateOpacity)
     *
     *     return () => {
     *       unsubscribeX()
     *       unsubscribeY()
     *     }
     *   }, [])
     *
     *   return <Frame x={x} />
     * }
     * ```
     *
     * @motion
     *
     * ```jsx
     * export const MyComponent = () => {
     *   const x = useMotionValue(0)
     *   const y = useMotionValue(0)
     *   const opacity = useMotionValue(1)
     *
     *   useEffect(() => {
     *     function updateOpacity() {
     *       const maxXY = Math.max(x.get(), y.get())
     *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
     *       opacity.set(newOpacity)
     *     }
     *
     *     const unsubscribeX = x.onChange(updateOpacity)
     *     const unsubscribeY = y.onChange(updateOpacity)
     *
     *     return () => {
     *       unsubscribeX()
     *       unsubscribeY()
     *     }
     *   }, [])
     *
     *   return <motion.div style={{ x }} />
     * }
     * ```
     *
     * @internalremarks
     *
     * We could look into a `useOnChange` hook if the above lifecycle management proves confusing.
     *
     * ```jsx
     * useOnChange(x, () => {})
     * ```
     *
     * @param subscriber - A function that receives the latest value.
     * @returns A function that, when called, will cancel this subscription.
     *
     * @public
     */
    MotionValue.prototype.onChange = function (subscription) {
        return this.updateSubscribers.add(subscription);
    };
    MotionValue.prototype.clearListeners = function () {
        this.updateSubscribers.clear();
    };
    /**
     * Adds a function that will be notified when the `MotionValue` requests a render.
     *
     * @param subscriber - A function that's provided the latest value.
     * @returns A function that, when called, will cancel this subscription.
     *
     * @internal
     */
    MotionValue.prototype.onRenderRequest = function (subscription) {
        // Render immediately
        subscription(this.get());
        return this.renderSubscribers.add(subscription);
    };
    /**
     * Attaches a passive effect to the `MotionValue`.
     *
     * @internal
     */
    MotionValue.prototype.attach = function (passiveEffect) {
        this.passiveEffect = passiveEffect;
    };
    /**
     * Sets the state of the `MotionValue`.
     *
     * @remarks
     *
     * ```jsx
     * const x = useMotionValue(0)
     * x.set(10)
     * ```
     *
     * @param latest - Latest value to set.
     * @param render - Whether to notify render subscribers. Defaults to `true`
     *
     * @public
     */
    MotionValue.prototype.set = function (v, render) {
        if (render === void 0) { render = true; }
        if (!render || !this.passiveEffect) {
            this.updateAndNotify(v, render);
        }
        else {
            this.passiveEffect(v, this.updateAndNotify);
        }
    };
    /**
     * Returns the latest state of `MotionValue`
     *
     * @returns - The latest state of `MotionValue`
     *
     * @public
     */
    MotionValue.prototype.get = function () {
        return this.current;
    };
    /**
     * @public
     */
    MotionValue.prototype.getPrevious = function () {
        return this.prev;
    };
    /**
     * Returns the latest velocity of `MotionValue`
     *
     * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
     *
     * @public
     */
    MotionValue.prototype.getVelocity = function () {
        // This could be isFloat(this.prev) && isFloat(this.current), but that would be wasteful
        return this.canTrackVelocity
            ? // These casts could be avoided if parseFloat would be typed better
                Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["velocityPerSecond"])(parseFloat(this.current) -
                    parseFloat(this.prev), this.timeDelta)
            : 0;
    };
    /**
     * Registers a new animation to control this `MotionValue`. Only one
     * animation can drive a `MotionValue` at one time.
     *
     * ```jsx
     * value.start()
     * ```
     *
     * @param animation - A function that starts the provided animation
     *
     * @internal
     */
    MotionValue.prototype.start = function (animation) {
        var _this = this;
        this.stop();
        return new Promise(function (resolve) {
            _this.stopAnimation = animation(resolve);
        }).then(function () { return _this.clearAnimation(); });
    };
    /**
     * Stop the currently active animation.
     *
     * @public
     */
    MotionValue.prototype.stop = function () {
        if (this.stopAnimation)
            this.stopAnimation();
        this.clearAnimation();
    };
    /**
     * Returns `true` if this value is currently animating.
     *
     * @public
     */
    MotionValue.prototype.isAnimating = function () {
        return !!this.stopAnimation;
    };
    MotionValue.prototype.clearAnimation = function () {
        this.stopAnimation = null;
    };
    /**
     * Destroy and clean up subscribers to this `MotionValue`.
     *
     * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
     * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
     * created a `MotionValue` via the `motionValue` function.
     *
     * @public
     */
    MotionValue.prototype.destroy = function () {
        this.updateSubscribers.clear();
        this.renderSubscribers.clear();
        this.stop();
    };
    return MotionValue;
}());
/**
 * @internal
 */
function motionValue(init) {
    return new MotionValue(init);
}

/**
 * VisualElement is an abstract class that provides a generic animation-optimised interface to the
 * underlying renderer.
 *
 * Currently many features interact directly with HTMLVisualElement/SVGVisualElement
 * but the idea is we can create, for instance, a ThreeVisualElement that extends
 * VisualElement and we can quickly offer all the same features.
 */
var VisualElement = /** @class */ (function () {
    function VisualElement(parent, ref) {
        var _this = this;
        // An iterable list of current children
        this.children = new Set();
        /**
         * A set of values that we animate back to when a value is cleared of all overrides.
         */
        this.baseTarget = {};
        // The latest resolved MotionValues
        this.latest = {};
        // A map of MotionValues used to animate this element
        this.values = new Map();
        // Unsubscription callbacks for MotionValue subscriptions
        this.valueSubscriptions = new Map();
        // A configuration for this VisualElement, each derived class can extend this.
        this.config = {};
        this.isMounted = false;
        // A pre-bound call to the user-provided `onUpdate` callback. This won't
        // be called more than once per frame.
        this.update = function () { return _this.config.onUpdate(_this.latest); };
        // Pre-bound version of render
        this.triggerRender = function () { return _this.render(); };
        // This function gets passed to the rendered component's `ref` prop
        // and is used to mount/unmount the VisualElement
        this.ref = function (element) {
            element ? _this.mount(element) : _this.unmount();
            if (!_this.externalRef)
                return;
            if (typeof _this.externalRef === "function") {
                _this.externalRef(element);
            }
            else if (isRefObject(_this.externalRef)) {
                _this.externalRef.current = element;
            }
        };
        // Create a relationship with the provided parent.
        this.parent = parent;
        this.rootParent = parent ? parent.rootParent : this;
        this.treePath = parent ? Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(parent.treePath, [parent]) : [];
        // Calculate the depth of this node in the VisualElement graph
        this.depth = parent ? parent.depth + 1 : 0;
        // A reference to any externally-defined React ref. This might live better
        // outside the VisualElement and be handled in a hook.
        this.externalRef = ref;
    }
    VisualElement.prototype.getVariantPayload = function () {
        return this.config.custom;
    };
    VisualElement.prototype.getVariant = function (label) {
        var _a;
        return (_a = this.config.variants) === null || _a === void 0 ? void 0 : _a[label];
    };
    VisualElement.prototype.addVariantChild = function (visualElement) {
        var _this = this;
        if (!this.variantChildren)
            this.variantChildren = new Set();
        this.variantChildren.add(visualElement);
        return function () { return _this.variantChildren.delete(visualElement); };
    };
    VisualElement.prototype.addVariantChildOrder = function (visualElement) {
        if (!this.variantChildrenOrder)
            this.variantChildrenOrder = new Set();
        this.variantChildrenOrder.add(visualElement);
    };
    VisualElement.prototype.onAnimationStart = function () {
        var _a, _b;
        (_b = (_a = this.config).onAnimationStart) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    VisualElement.prototype.onAnimationComplete = function () {
        var _a, _b;
        this.isMounted && ((_b = (_a = this.config).onAnimationComplete) === null || _b === void 0 ? void 0 : _b.call(_a));
    };
    VisualElement.prototype.getDefaultTransition = function () {
        return this.config.transition;
    };
    VisualElement.prototype.subscribe = function (child) {
        var _this = this;
        this.children.add(child);
        return function () { return _this.children.delete(child); };
    };
    // Check whether this element has a MotionValue of the provided key
    VisualElement.prototype.hasValue = function (key) {
        return this.values.has(key);
    };
    // Add a MotionValue
    VisualElement.prototype.addValue = function (key, value) {
        if (this.hasValue(key))
            this.removeValue(key);
        this.values.set(key, value);
        this.setSingleStaticValue(key, value.get());
        this.subscribeToValue(key, value);
    };
    // Remove a MotionValue
    VisualElement.prototype.removeValue = function (key) {
        var _a;
        (_a = this.valueSubscriptions.get(key)) === null || _a === void 0 ? void 0 : _a();
        this.valueSubscriptions.delete(key);
        this.values.delete(key);
        delete this.latest[key];
    };
    VisualElement.prototype.getValue = function (key, defaultValue) {
        var value = this.values.get(key);
        if (value === undefined && defaultValue !== undefined) {
            value = new MotionValue(defaultValue);
            this.addValue(key, value);
        }
        return value;
    };
    // Iterate over all MotionValues
    VisualElement.prototype.forEachValue = function (callback) {
        this.values.forEach(callback);
    };
    // Get the underlying rendered instance of this VisualElement. For instance in
    // HTMLVisualElement this will be a HTMLElement.
    VisualElement.prototype.getInstance = function () {
        return this.element;
    };
    VisualElement.prototype.updateConfig = function (config) {
        if (config === void 0) { config = {}; }
        this.config = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, config);
    };
    VisualElement.prototype.getBaseValue = function (key, _props) {
        return this.baseTarget[key];
    };
    // Set a single `latest` value
    VisualElement.prototype.setSingleStaticValue = function (key, value) {
        this.latest[key] = value;
    };
    // Statically set values to `latest` without needing a MotionValue
    VisualElement.prototype.setStaticValues = function (values, value) {
        if (typeof values === "string") {
            this.setSingleStaticValue(values, value);
        }
        else {
            for (var key in values) {
                this.setSingleStaticValue(key, values[key]);
            }
        }
    };
    VisualElement.prototype.scheduleRender = function () {
        framesync__WEBPACK_IMPORTED_MODULE_1__["default"].render(this.triggerRender, false, true);
    };
    VisualElement.prototype.scheduleUpdateLayoutDelta = function () {
        framesync__WEBPACK_IMPORTED_MODULE_1__["default"].preRender(this.rootParent.updateLayoutDelta, false, true);
    };
    VisualElement.prototype.subscribeToValue = function (key, value) {
        var _this = this;
        var onChange = function (latest) {
            _this.setSingleStaticValue(key, latest);
            // Schedule onUpdate if we have an onUpdate listener and the component has mounted
            _this.element &&
                _this.config.onUpdate &&
                framesync__WEBPACK_IMPORTED_MODULE_1__["default"].update(_this.update, false, true);
        };
        var onRender = function () {
            _this.element && _this.scheduleRender();
        };
        var unsubscribeOnChange = value.onChange(onChange);
        var unsubscribeOnRender = value.onRenderRequest(onRender);
        this.valueSubscriptions.set(key, function () {
            unsubscribeOnChange();
            unsubscribeOnRender();
        });
    };
    // Mount the VisualElement with the actual DOM element
    VisualElement.prototype.mount = function (element) {
        Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__["invariant"])(!!element, "No ref found. Ensure components created with motion.custom forward refs using React.forwardRef");
        if (this.parent) {
            this.removeFromParent = this.parent.subscribe(this);
        }
        /**
         * Save the element to this.element as a semantic API, this.current to the VisualElement
         * is compatible with existing RefObject APIs.
         */
        this.element = this.current = element;
    };
    // Unmount the VisualElement and cancel any scheduled updates
    VisualElement.prototype.unmount = function () {
        var _this = this;
        this.forEachValue(function (_, key) { return _this.removeValue(key); });
        framesync__WEBPACK_IMPORTED_MODULE_1__["cancelSync"].update(this.update);
        framesync__WEBPACK_IMPORTED_MODULE_1__["cancelSync"].render(this.render);
        this.removeFromParent && this.removeFromParent();
    };
    return VisualElement;
}());

function noop(any) {
    return any;
}

/**
 * Bounding boxes tend to be defined as top, left, right, bottom. For various operations
 * it's easier to consider each axis individually. This function returns a bounding box
 * as a map of single-axis min/max values.
 */
function convertBoundingBoxToAxisBox(_a) {
    var top = _a.top, left = _a.left, right = _a.right, bottom = _a.bottom;
    return {
        x: { min: left, max: right },
        y: { min: top, max: bottom },
    };
}
function convertAxisBoxToBoundingBox(_a) {
    var x = _a.x, y = _a.y;
    return {
        top: y.min,
        bottom: y.max,
        left: x.min,
        right: x.max,
    };
}
/**
 * Applies a TransformPoint function to a bounding box. TransformPoint is usually a function
 * provided by Framer to allow measured points to be corrected for device scaling. This is used
 * when measuring DOM elements and DOM event points.
 */
function transformBoundingBox(_a, transformPoint) {
    var top = _a.top, left = _a.left, bottom = _a.bottom, right = _a.right;
    if (transformPoint === void 0) { transformPoint = noop; }
    var topLeft = transformPoint({ x: left, y: top });
    var bottomRight = transformPoint({ x: right, y: bottom });
    return {
        top: topLeft.y,
        left: topLeft.x,
        bottom: bottomRight.y,
        right: bottomRight.x,
    };
}
/**
 * Create an empty axis box of zero size
 */
function axisBox() {
    return { x: { min: 0, max: 1 }, y: { min: 0, max: 1 } };
}
function copyAxisBox(box) {
    return {
        x: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, box.x),
        y: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, box.y),
    };
}
/**
 * Create an empty box delta
 */
var zeroDelta = {
    translate: 0,
    scale: 1,
    origin: 0,
    originPoint: 0,
};
function delta() {
    return {
        x: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, zeroDelta),
        y: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, zeroDelta),
    };
}

/**
 * ValueType for "auto"
 */
var auto = {
    test: function (v) { return v === "auto"; },
    parse: function (v) { return v; },
};
/**
 * ValueType for ints
 */
var int = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, style_value_types__WEBPACK_IMPORTED_MODULE_4__["number"]), { transform: Math.round });
/**
 * A map of default value types for common values
 */
var defaultValueTypes = {
    // Color props
    color: style_value_types__WEBPACK_IMPORTED_MODULE_4__["color"],
    backgroundColor: style_value_types__WEBPACK_IMPORTED_MODULE_4__["color"],
    outlineColor: style_value_types__WEBPACK_IMPORTED_MODULE_4__["color"],
    fill: style_value_types__WEBPACK_IMPORTED_MODULE_4__["color"],
    stroke: style_value_types__WEBPACK_IMPORTED_MODULE_4__["color"],
    // Border props
    borderColor: style_value_types__WEBPACK_IMPORTED_MODULE_4__["color"],
    borderTopColor: style_value_types__WEBPACK_IMPORTED_MODULE_4__["color"],
    borderRightColor: style_value_types__WEBPACK_IMPORTED_MODULE_4__["color"],
    borderBottomColor: style_value_types__WEBPACK_IMPORTED_MODULE_4__["color"],
    borderLeftColor: style_value_types__WEBPACK_IMPORTED_MODULE_4__["color"],
    borderWidth: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    borderTopWidth: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    borderRightWidth: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    borderBottomWidth: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    borderLeftWidth: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    borderRadius: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    radius: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    borderTopLeftRadius: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    borderTopRightRadius: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    borderBottomRightRadius: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    borderBottomLeftRadius: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    // Positioning props
    width: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    maxWidth: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    height: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    maxHeight: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    size: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    top: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    right: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    bottom: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    left: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    // Spacing props
    padding: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    paddingTop: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    paddingRight: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    paddingBottom: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    paddingLeft: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    margin: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    marginTop: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    marginRight: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    marginBottom: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    marginLeft: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    // Transform props
    rotate: style_value_types__WEBPACK_IMPORTED_MODULE_4__["degrees"],
    rotateX: style_value_types__WEBPACK_IMPORTED_MODULE_4__["degrees"],
    rotateY: style_value_types__WEBPACK_IMPORTED_MODULE_4__["degrees"],
    rotateZ: style_value_types__WEBPACK_IMPORTED_MODULE_4__["degrees"],
    scale: style_value_types__WEBPACK_IMPORTED_MODULE_4__["scale"],
    scaleX: style_value_types__WEBPACK_IMPORTED_MODULE_4__["scale"],
    scaleY: style_value_types__WEBPACK_IMPORTED_MODULE_4__["scale"],
    scaleZ: style_value_types__WEBPACK_IMPORTED_MODULE_4__["scale"],
    skew: style_value_types__WEBPACK_IMPORTED_MODULE_4__["degrees"],
    skewX: style_value_types__WEBPACK_IMPORTED_MODULE_4__["degrees"],
    skewY: style_value_types__WEBPACK_IMPORTED_MODULE_4__["degrees"],
    distance: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    translateX: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    translateY: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    translateZ: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    x: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    y: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    z: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    perspective: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    transformPerspective: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    opacity: style_value_types__WEBPACK_IMPORTED_MODULE_4__["alpha"],
    originX: style_value_types__WEBPACK_IMPORTED_MODULE_4__["progressPercentage"],
    originY: style_value_types__WEBPACK_IMPORTED_MODULE_4__["progressPercentage"],
    originZ: style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"],
    // Misc
    zIndex: int,
    // SVG
    fillOpacity: style_value_types__WEBPACK_IMPORTED_MODULE_4__["alpha"],
    strokeOpacity: style_value_types__WEBPACK_IMPORTED_MODULE_4__["alpha"],
    numOctaves: int,
};
/**
 * A list of value types commonly used for dimensions
 */
var dimensionValueTypes = [style_value_types__WEBPACK_IMPORTED_MODULE_4__["number"], style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"], style_value_types__WEBPACK_IMPORTED_MODULE_4__["percent"], style_value_types__WEBPACK_IMPORTED_MODULE_4__["degrees"], style_value_types__WEBPACK_IMPORTED_MODULE_4__["vw"], style_value_types__WEBPACK_IMPORTED_MODULE_4__["vh"], auto];
/**
 * Tests a provided value against a ValueType
 */
var testValueType = function (v) { return function (type) { return type.test(v); }; };
/**
 * Tests a dimensional value against the list of dimension ValueTypes
 */
var findDimensionValueType = function (v) {
    return dimensionValueTypes.find(testValueType(v));
};
/**
 * A list of all ValueTypes
 */
var valueTypes = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(dimensionValueTypes, [style_value_types__WEBPACK_IMPORTED_MODULE_4__["color"], style_value_types__WEBPACK_IMPORTED_MODULE_4__["complex"]]);
/**
 * Tests a value against the list of ValueTypes
 */
var findValueType = function (v) { return valueTypes.find(testValueType(v)); };
/**
 * Gets the default ValueType for the provided value key
 */
var getDefaultValueType = function (key) { return defaultValueTypes[key]; };
/**
 * Provided a value and a ValueType, returns the value as that value type.
 */
var getValueAsType = function (value, type) {
    return type && typeof value === "number"
        ? type.transform(value)
        : value;
};

/**
 * A list of all transformable axes. We'll use this list to generated a version
 * of each axes for each transform.
 */
var transformAxes = ["", "X", "Y", "Z"];
/**
 * An ordered array of each transformable value. By default, transform values
 * will be sorted to this order.
 */
var order = ["perspective", "translate", "scale", "rotate", "skew"];
/**
 * Generate a list of every possible transform key.
 */
var transformProps = ["transformPerspective", "x", "y", "z"];
order.forEach(function (operationKey) {
    transformAxes.forEach(function (axesKey) {
        var key = operationKey + axesKey;
        transformProps.push(key);
    });
});
/**
 * A function to use with Array.sort to sort transform keys by their default order.
 */
function sortTransformProps(a, b) {
    return transformProps.indexOf(a) - transformProps.indexOf(b);
}
/**
 * A quick lookup for transform props.
 */
var transformPropSet = new Set(transformProps);
function isTransformProp(key) {
    return transformPropSet.has(key);
}
/**
 * A quick lookup for transform origin props
 */
var transformOriginProps = new Set(["originX", "originY", "originZ"]);
function isTransformOriginProp(key) {
    return transformOriginProps.has(key);
}

var translateAlias = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
};
/**
 * Build a CSS transform style from individual x/y/scale etc properties.
 *
 * This outputs with a default order of transforms/scales/rotations, this can be customised by
 * providing a transformTemplate function.
 */
function buildTransform(transform, transformKeys, transformTemplate, transformIsDefault, enableHardwareAcceleration, allowTransformNone) {
    if (enableHardwareAcceleration === void 0) { enableHardwareAcceleration = true; }
    if (allowTransformNone === void 0) { allowTransformNone = true; }
    // The transform string we're going to build into.
    var transformString = "";
    // Transform keys into their default order - this will determine the output order.
    transformKeys.sort(sortTransformProps);
    // Track whether the defined transform has a defined z so we don't add a
    // second to enable hardware acceleration
    var transformHasZ = false;
    // Loop over each transform and build them into transformString
    var numTransformKeys = transformKeys.length;
    for (var i = 0; i < numTransformKeys; i++) {
        var key = transformKeys[i];
        transformString += (translateAlias[key] || key) + "(" + transform[key] + ") ";
        if (key === "z")
            transformHasZ = true;
    }
    if (!transformHasZ && enableHardwareAcceleration) {
        transformString += "translateZ(0)";
    }
    else {
        transformString = transformString.trim();
    }
    // If we have a custom `transform` template, pass our transform values and
    // generated transformString to that before returning
    if (transformTemplate) {
        transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
    }
    else if (allowTransformNone && transformIsDefault) {
        transformString = "none";
    }
    return transformString;
}
/**
 * Build a transformOrigin style. Uses the same defaults as the browser for
 * undefined origins.
 */
function buildTransformOrigin(_a) {
    var _b = _a.originX, originX = _b === void 0 ? "50%" : _b, _c = _a.originY, originY = _c === void 0 ? "50%" : _c, _d = _a.originZ, originZ = _d === void 0 ? 0 : _d;
    return originX + " " + originY + " " + originZ;
}
/**
 * Build a transform style that takes a calculated delta between the element's current
 * space on screen and projects it into the desired space.
 */
function buildLayoutProjectionTransform(_a, treeScale, latestTransform) {
    var x = _a.x, y = _a.y;
    /**
     * The translations we use to calculate are always relative to the viewport coordinate space.
     * But when we apply scales, we also scale the coordinate space of an element and its children.
     * For instance if we have a treeScale (the culmination of all parent scales) of 0.5 and we need
     * to move an element 100 pixels, we actually need to move it 200 in within that scaled space.
     */
    var xTranslate = x.translate / treeScale.x;
    var yTranslate = y.translate / treeScale.y;
    var transform = "translate3d(" + xTranslate + "px, " + yTranslate + "px, 0) ";
    if (latestTransform) {
        var rotate = latestTransform.rotate, rotateX = latestTransform.rotateX, rotateY = latestTransform.rotateY;
        if (rotate)
            transform += "rotate(" + rotate + ") ";
        if (rotateX)
            transform += "rotateX(" + rotateX + ") ";
        if (rotateY)
            transform += "rotateY(" + rotateY + ") ";
    }
    transform += "scale(" + x.scale + ", " + y.scale + ")";
    return !latestTransform && transform === identityProjection ? "" : transform;
}
var identityProjection = buildLayoutProjectionTransform(delta(), {
    x: 1,
    y: 1,
});
/**
 * Take the calculated delta origin and apply it as a transform string.
 */
function buildLayoutProjectionTransformOrigin(_a) {
    var x = _a.x, y = _a.y;
    return x.origin * 100 + "% " + y.origin * 100 + "% 0";
}

/**
 * Returns true if the provided key is a CSS variable
 */
function isCSSVariable(key) {
    return key.startsWith("--");
}

function isCSSVariable$1(value) {
    return typeof value === "string" && value.startsWith("var(--");
}
/**
 * Parse Framer's special CSS variable format into a CSS token and a fallback.
 *
 * ```
 * `var(--foo, #fff)` => [`--foo`, '#fff']
 * ```
 *
 * @param current
 */
var cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function parseCSSVariable(current) {
    var match = cssVariableRegex.exec(current);
    if (!match)
        return [,];
    var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(match, 3), token = _a[1], fallback = _a[2];
    return [token, fallback];
}
var maxDepth = 4;
function getVariableValue(current, element, depth) {
    if (depth === void 0) { depth = 1; }
    Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__["invariant"])(depth <= maxDepth, "Max CSS variable fallback depth detected in property \"" + current + "\". This may indicate a circular fallback dependency.");
    var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(parseCSSVariable(current), 2), token = _a[0], fallback = _a[1];
    // No CSS variable detected
    if (!token)
        return;
    // Attempt to read this CSS variable off the element
    var resolved = window.getComputedStyle(element).getPropertyValue(token);
    if (resolved) {
        return resolved.trim();
    }
    else if (isCSSVariable$1(fallback)) {
        // The fallback might itself be a CSS variable, in which case we attempt to resolve it too.
        return getVariableValue(fallback, element, depth + 1);
    }
    else {
        return fallback;
    }
}
/**
 * Resolve CSS variables from
 *
 * @internal
 */
function resolveCSSVariables(visualElement, _a, transitionEnd) {
    var _b;
    var target = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, []);
    var element = visualElement.getInstance();
    if (!(element instanceof HTMLElement))
        return { target: target, transitionEnd: transitionEnd };
    // If `transitionEnd` isn't `undefined`, clone it. We could clone `target` and `transitionEnd`
    // only if they change but I think this reads clearer and this isn't a performance-critical path.
    if (transitionEnd) {
        transitionEnd = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, transitionEnd);
    }
    // Go through existing `MotionValue`s and ensure any existing CSS variables are resolved
    visualElement.forEachValue(function (value) {
        var current = value.get();
        if (!isCSSVariable$1(current))
            return;
        var resolved = getVariableValue(current, element);
        if (resolved)
            value.set(resolved);
    });
    // Cycle through every target property and resolve CSS variables. Currently
    // we only read single-var properties like `var(--foo)`, not `calc(var(--foo) + 20px)`
    for (var key in target) {
        var current = target[key];
        if (!isCSSVariable$1(current))
            continue;
        var resolved = getVariableValue(current, element);
        if (!resolved)
            continue;
        // Clone target if it hasn't already been
        target[key] = resolved;
        // If the user hasn't already set this key on `transitionEnd`, set it to the unresolved
        // CSS variable. This will ensure that after the animation the component will reflect
        // changes in the value of the CSS variable.
        if (transitionEnd)
            (_b = transitionEnd[key]) !== null && _b !== void 0 ? _b : (transitionEnd[key] = current);
    }
    return { target: target, transitionEnd: transitionEnd };
}

function pixelsToPercent(pixels, axis) {
    return (pixels / (axis.max - axis.min)) * 100;
}
/**
 * We always correct borderRadius as a percentage rather than pixels to reduce paints.
 * For example, if you are projecting a box that is 100px wide with a 10px borderRadius
 * into a box that is 200px wide with a 20px borderRadius, that is actually a 10%
 * borderRadius in both states. If we animate between the two in pixels that will trigger
 * a paint each time. If we animate between the two in percentage we'll avoid a paint.
 */
function correctBorderRadius(latest, viewportBox) {
    /**
     * If latest is a string, if it's a percentage we can return immediately as it's
     * going to be stretched appropriately. Otherwise, if it's a pixel, convert it to a number.
     */
    if (typeof latest === "string") {
        if (style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"].test(latest)) {
            latest = parseFloat(latest);
        }
        else {
            return latest;
        }
    }
    /**
     * If latest is a number, it's a pixel value. We use the current viewportBox to calculate that
     * pixel value as a percentage of each axis
     */
    var x = pixelsToPercent(latest, viewportBox.x);
    var y = pixelsToPercent(latest, viewportBox.y);
    return x + "% " + y + "%";
}
var varToken = "_$css";
function correctBoxShadow(latest, _viewportBox, delta, treeScale) {
    var original = latest;
    /**
     * We need to first strip and store CSS variables from the string.
     */
    var containsCSSVariables = latest.includes("var(");
    var cssVariables = [];
    if (containsCSSVariables) {
        latest = latest.replace(cssVariableRegex, function (match) {
            cssVariables.push(match);
            return varToken;
        });
    }
    var shadow = style_value_types__WEBPACK_IMPORTED_MODULE_4__["complex"].parse(latest);
    // TODO: Doesn't support multiple shadows
    if (shadow.length > 5)
        return original;
    var template = style_value_types__WEBPACK_IMPORTED_MODULE_4__["complex"].createTransformer(latest);
    var offset = typeof shadow[0] !== "number" ? 1 : 0;
    // Calculate the overall context scale
    var xScale = delta.x.scale * treeScale.x;
    var yScale = delta.y.scale * treeScale.y;
    shadow[0 + offset] /= xScale;
    shadow[1 + offset] /= yScale;
    /**
     * Ideally we'd correct x and y scales individually, but because blur and
     * spread apply to both we have to take a scale average and apply that instead.
     * We could potentially improve the outcome of this by incorporating the ratio between
     * the two scales.
     */
    var averageScale = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["mix"])(xScale, yScale, 0.5);
    // Blur
    if (typeof shadow[2 + offset] === "number")
        shadow[2 + offset] /= averageScale;
    // Spread
    if (typeof shadow[3 + offset] === "number")
        shadow[3 + offset] /= averageScale;
    var output = template(shadow);
    if (containsCSSVariables) {
        var i_1 = 0;
        output = output.replace(varToken, function () {
            var cssVariable = cssVariables[i_1];
            i_1++;
            return cssVariable;
        });
    }
    return output;
}
var borderCorrectionDefinition = {
    process: correctBorderRadius,
};
var valueScaleCorrection = {
    borderRadius: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, borderCorrectionDefinition), { applyTo: [
            "borderTopLeftRadius",
            "borderTopRightRadius",
            "borderBottomLeftRadius",
            "borderBottomRightRadius",
        ] }),
    borderTopLeftRadius: borderCorrectionDefinition,
    borderTopRightRadius: borderCorrectionDefinition,
    borderBottomLeftRadius: borderCorrectionDefinition,
    borderBottomRightRadius: borderCorrectionDefinition,
    boxShadow: {
        process: correctBoxShadow,
    },
};
/**
 * @internal
 */
function addScaleCorrection(correctors) {
    for (var key in correctors) {
        valueScaleCorrection[key] = correctors[key];
    }
}

/**
 * Build style and CSS variables
 *
 * This function converts a Motion style prop:
 *
 * { x: 100, width: 100, originX: 0.5 }
 *
 * Into an object with default value types applied and default
 * transform order set:
 *
 * {
 *   transform: 'translateX(100px) translateZ(0)`,
 *   width: '100px',
 *   transformOrigin: '50% 50%'
 * }
 *
 * Styles are saved to `style` and CSS vars to `vars`.
 *
 * This function works with mutative data structures.
 */
function buildHTMLStyles(latest, style, vars, transform, transformOrigin, transformKeys, _a, isLayoutProjectionEnabled, delta, deltaFinal, treeScale, targetBox) {
    var enableHardwareAcceleration = _a.enableHardwareAcceleration, transformTemplate = _a.transformTemplate, allowTransformNone = _a.allowTransformNone;
    // Empty the transformKeys array. As we're throwing out refs to its items
    // this might not be as cheap as suspected. Maybe using the array as a buffer
    // with a manual incrementation would be better.
    transformKeys.length = 0;
    // Track whether we encounter any transform or transformOrigin values.
    var hasTransform = false;
    var hasTransformOrigin = false;
    // Does the calculated transform essentially equal "none"?
    var transformIsNone = true;
    /**
     * Loop over all our latest animated values and decide whether to handle them
     * as a style or CSS variable. Transforms and transform origins are kept seperately
     * for further processing
     */
    for (var key in latest) {
        var value = latest[key];
        // Convert the value to its default value type, ie 0 -> "0px"
        var valueType = getDefaultValueType(key);
        var valueAsType = getValueAsType(value, valueType);
        if (isTransformProp(key)) {
            // If this is a transform, flag and enable further transform processing
            hasTransform = true;
            transform[key] = valueAsType;
            transformKeys.push(key);
            if (!transformIsNone)
                continue;
            // If all the transform keys we've so far encountered are their default value
            // then check to see if this one isn't
            var defaultValue = valueType.default !== undefined ? valueType.default : 0;
            if (value !== defaultValue)
                transformIsNone = false;
        }
        else if (isTransformOriginProp(key)) {
            // If this is a transform origin, flag and enable further transform-origin processing
            transformOrigin[key] = valueAsType;
            hasTransformOrigin = true;
        }
        else if (key !== "transform" || typeof value !== "function") {
            // Handle all remaining values. Decide which map to save to depending
            // on whether this is a CSS variable
            var bucket = isCSSVariable(key) ? vars : style;
            // If we need to perform scale correction, and we have a handler for this
            // value type (ie borderRadius), perform it
            if (isLayoutProjectionEnabled && valueScaleCorrection[key]) {
                var corrected = valueScaleCorrection[key].process(value, targetBox, delta, treeScale);
                /**
                 * Scale-correctable values can define a number of other values to break
                 * down into. For instance borderRadius needs applying to borderBottomLeftRadius etc
                 */
                var applyTo = valueScaleCorrection[key].applyTo;
                if (applyTo) {
                    var num = applyTo.length;
                    for (var i = 0; i < num; i++) {
                        bucket[applyTo[i]] = corrected;
                    }
                }
                else {
                    bucket[key] = corrected;
                }
            }
            else {
                bucket[key] = valueAsType;
            }
        }
    }
    /**
     * Build transform and transformOrigin. If we're performing layout projection these need
     * to be based off the deltaFinal data. Any user-set origins will have been pre-baked
     * into the deltaFinal.
     */
    if (isLayoutProjectionEnabled) {
        style.transform = buildLayoutProjectionTransform(deltaFinal, treeScale, hasTransform ? transform : undefined);
        if (transformTemplate) {
            style.transform = transformTemplate(transform, style.transform);
        }
        style.transformOrigin = buildLayoutProjectionTransformOrigin(deltaFinal);
    }
    else {
        if (hasTransform) {
            style.transform = buildTransform(transform, transformKeys, transformTemplate, transformIsNone, enableHardwareAcceleration, allowTransformNone);
        }
        if (hasTransformOrigin) {
            style.transformOrigin = buildTransformOrigin(transformOrigin);
        }
    }
}

/**
 * Reset an axis to the provided origin box.
 *
 * This is a mutative operation.
 */
function resetAxis(axis, originAxis) {
    axis.min = originAxis.min;
    axis.max = originAxis.max;
}
/**
 * Reset a box to the provided origin box.
 *
 * This is a mutative operation.
 */
function resetBox(box, originBox) {
    resetAxis(box.x, originBox.x);
    resetAxis(box.y, originBox.y);
}
/**
 * Scales a point based on a factor and an originPoint
 */
function scalePoint(point, scale, originPoint) {
    var distanceFromOrigin = point - originPoint;
    var scaled = scale * distanceFromOrigin;
    return originPoint + scaled;
}
/**
 * Applies a translate/scale delta to a point
 */
function applyPointDelta(point, translate, scale, originPoint, boxScale) {
    if (boxScale !== undefined) {
        point = scalePoint(point, boxScale, originPoint);
    }
    return scalePoint(point, scale, originPoint) + translate;
}
/**
 * Applies a translate/scale delta to an axis
 */
function applyAxisDelta(axis, translate, scale, originPoint, boxScale) {
    if (translate === void 0) { translate = 0; }
    if (scale === void 0) { scale = 1; }
    axis.min = applyPointDelta(axis.min, translate, scale, originPoint, boxScale);
    axis.max = applyPointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
 * Applies a translate/scale delta to a box
 */
function applyBoxDelta(box, _a) {
    var x = _a.x, y = _a.y;
    applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
    applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
/**
 * Apply a transform to an axis from the latest resolved motion values.
 * This function basically acts as a bridge between a flat motion value map
 * and applyAxisDelta
 */
function applyAxisTransforms(final, axis, transforms, _a) {
    var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 3), key = _b[0], scaleKey = _b[1], originKey = _b[2];
    // Copy the current axis to the final axis before mutation
    final.min = axis.min;
    final.max = axis.max;
    var axisOrigin = transforms[originKey] !== undefined ? transforms[originKey] : 0.5;
    var originPoint = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["mix"])(axis.min, axis.max, axisOrigin);
    // Apply the axis delta to the final axis
    applyAxisDelta(final, transforms[key], transforms[scaleKey], originPoint, transforms.scale);
}
/**
 * The names of the motion values we want to apply as translation, scale and origin.
 */
var xKeys = ["x", "scaleX", "originX"];
var yKeys = ["y", "scaleY", "originY"];
/**
 * Apply a transform to a box from the latest resolved motion values.
 */
function applyBoxTransforms(finalBox, box, transforms) {
    applyAxisTransforms(finalBox.x, box.x, transforms, xKeys);
    applyAxisTransforms(finalBox.y, box.y, transforms, yKeys);
}
/**
 * Remove a delta from a point. This is essentially the steps of applyPointDelta in reverse
 */
function removePointDelta(point, translate, scale, originPoint, boxScale) {
    point -= translate;
    point = scalePoint(point, 1 / scale, originPoint);
    if (boxScale !== undefined) {
        point = scalePoint(point, 1 / boxScale, originPoint);
    }
    return point;
}
/**
 * Remove a delta from an axis. This is essentially the steps of applyAxisDelta in reverse
 */
function removeAxisDelta(axis, translate, scale, origin, boxScale) {
    if (translate === void 0) { translate = 0; }
    if (scale === void 0) { scale = 1; }
    if (origin === void 0) { origin = 0.5; }
    var originPoint = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["mix"])(axis.min, axis.max, origin) - translate;
    axis.min = removePointDelta(axis.min, translate, scale, originPoint, boxScale);
    axis.max = removePointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
 * Remove a transforms from an axis. This is essentially the steps of applyAxisTransforms in reverse
 * and acts as a bridge between motion values and removeAxisDelta
 */
function removeAxisTransforms(axis, transforms, _a) {
    var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 3), key = _b[0], scaleKey = _b[1], originKey = _b[2];
    removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale);
}
/**
 * Remove a transforms from an box. This is essentially the steps of applyAxisBox in reverse
 * and acts as a bridge between motion values and removeAxisDelta
 */
function removeBoxTransforms(box, transforms) {
    removeAxisTransforms(box.x, transforms, xKeys);
    removeAxisTransforms(box.y, transforms, yKeys);
}
/**
 * Apply a tree of deltas to a box. We do this to calculate the effect of all the transforms
 * in a tree upon our box before then calculating how to project it into our desired viewport-relative box
 *
 * This is the final nested loop within HTMLVisualElement.updateLayoutDelta
 */
function applyTreeDeltas(box, treeScale, treePath) {
    var treeLength = treePath.length;
    if (!treeLength)
        return;
    // Reset the treeScale
    treeScale.x = treeScale.y = 1;
    for (var i = 0; i < treeLength; i++) {
        var delta = treePath[i].delta;
        // Incoporate each ancestor's scale into a culmulative treeScale for this component
        treeScale.x *= delta.x.scale;
        treeScale.y *= delta.y.scale;
        // Apply each ancestor's calculated delta into this component's recorded layout box
        applyBoxDelta(box, delta);
    }
}

var clampProgress = function (v) { return Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["clamp"])(0, 1, v); };
/**
 * Returns true if the provided value is within maxDistance of the provided target
 */
function isNear(value, target, maxDistance) {
    if (target === void 0) { target = 0; }
    if (maxDistance === void 0) { maxDistance = 0.01; }
    return Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["distance"])(value, target) < maxDistance;
}
function calcLength(axis) {
    return axis.max - axis.min;
}
/**
 * Calculate a transform origin relative to the source axis, between 0-1, that results
 * in an asthetically pleasing scale/transform needed to project from source to target.
 */
function calcOrigin(source, target) {
    var origin = 0.5;
    var sourceLength = calcLength(source);
    var targetLength = calcLength(target);
    if (targetLength > sourceLength) {
        origin = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["progress"])(target.min, target.max - sourceLength, source.min);
    }
    else if (sourceLength > targetLength) {
        origin = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["progress"])(source.min, source.max - targetLength, target.min);
    }
    return clampProgress(origin);
}
/**
 * Update the AxisDelta with a transform that projects source into target.
 *
 * The transform `origin` is optional. If not provided, it'll be automatically
 * calculated based on the relative positions of the two bounding boxes.
 */
function updateAxisDelta(delta, source, target, origin) {
    delta.origin = origin === undefined ? calcOrigin(source, target) : origin;
    delta.originPoint = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["mix"])(source.min, source.max, delta.origin);
    delta.scale = calcLength(target) / calcLength(source);
    if (isNear(delta.scale, 1, 0.0001))
        delta.scale = 1;
    delta.translate =
        Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["mix"])(target.min, target.max, delta.origin) - delta.originPoint;
    if (isNear(delta.translate))
        delta.translate = 0;
}
/**
 * Update the BoxDelta with a transform that projects the source into the target.
 *
 * The transform `origin` is optional. If not provided, it'll be automatically
 * calculated based on the relative positions of the two bounding boxes.
 */
function updateBoxDelta(delta, source, target, origin) {
    updateAxisDelta(delta.x, source.x, target.x, origin);
    updateAxisDelta(delta.y, source.y, target.y, origin);
}

// Call a handler once for each axis
function eachAxis(handler) {
    return [handler("x"), handler("y")];
}

/**
 * Measure and return the element bounding box.
 *
 * We convert the box into an AxisBox2D to make it easier to work with each axis
 * individually and programmatically.
 *
 * This function optionally accepts a transformPagePoint function which allows us to compensate
 * for, for instance, measuring the element within a scaled plane like a Framer devivce preview component.
 */
function getBoundingBox(element, transformPagePoint) {
    var box = element.getBoundingClientRect();
    return convertBoundingBoxToAxisBox(transformBoundingBox(box, transformPagePoint));
}

var isKeyframesTarget = function (v) {
    return Array.isArray(v);
};

var positionalKeys = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    "x",
    "y",
]);
var isPositionalKey = function (key) { return positionalKeys.has(key); };
var hasPositionalKey = function (target) {
    return Object.keys(target).some(isPositionalKey);
};
var setAndResetVelocity = function (value, to) {
    // Looks odd but setting it twice doesn't render, it'll just
    // set both prev and current to the latest value
    value.set(to, false);
    value.set(to);
};
var isNumOrPxType = function (v) {
    return v === style_value_types__WEBPACK_IMPORTED_MODULE_4__["number"] || v === style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"];
};
var BoundingBoxDimension;
(function (BoundingBoxDimension) {
    BoundingBoxDimension["width"] = "width";
    BoundingBoxDimension["height"] = "height";
    BoundingBoxDimension["left"] = "left";
    BoundingBoxDimension["right"] = "right";
    BoundingBoxDimension["top"] = "top";
    BoundingBoxDimension["bottom"] = "bottom";
})(BoundingBoxDimension || (BoundingBoxDimension = {}));
var getPosFromMatrix = function (matrix, pos) {
    return parseFloat(matrix.split(", ")[pos]);
};
var getTranslateFromMatrix = function (pos2, pos3) { return function (_bbox, _a) {
    var transform = _a.transform;
    if (transform === "none" || !transform)
        return 0;
    var matrix3d = transform.match(/^matrix3d\((.+)\)$/);
    if (matrix3d) {
        return getPosFromMatrix(matrix3d[1], pos3);
    }
    else {
        var matrix = transform.match(/^matrix\((.+)\)$/);
        if (matrix) {
            return getPosFromMatrix(matrix[1], pos2);
        }
        else {
            return 0;
        }
    }
}; };
var transformKeys = new Set(["x", "y", "z"]);
var nonTranslationalTransformKeys = transformProps.filter(function (key) { return !transformKeys.has(key); });
function removeNonTranslationalTransform(visualElement) {
    var removedTransforms = [];
    nonTranslationalTransformKeys.forEach(function (key) {
        var value = visualElement.getValue(key);
        if (value !== undefined) {
            removedTransforms.push([key, value.get()]);
            value.set(key.startsWith("scale") ? 1 : 0);
        }
    });
    // Apply changes to element before measurement
    if (removedTransforms.length)
        visualElement.render();
    return removedTransforms;
}
var positionalValues = {
    // Dimensions
    width: function (_a) {
        var x = _a.x;
        return x.max - x.min;
    },
    height: function (_a) {
        var y = _a.y;
        return y.max - y.min;
    },
    top: function (_bbox, _a) {
        var top = _a.top;
        return parseFloat(top);
    },
    left: function (_bbox, _a) {
        var left = _a.left;
        return parseFloat(left);
    },
    bottom: function (_a, _b) {
        var y = _a.y;
        var top = _b.top;
        return parseFloat(top) + (y.max - y.min);
    },
    right: function (_a, _b) {
        var x = _a.x;
        var left = _b.left;
        return parseFloat(left) + (x.max - x.min);
    },
    // Transform
    x: getTranslateFromMatrix(4, 13),
    y: getTranslateFromMatrix(5, 14),
};
var convertChangedValueTypes = function (target, visualElement, changedKeys) {
    var originBbox = visualElement.getBoundingBox();
    var elementComputedStyle = visualElement.getComputedStyle();
    var display = elementComputedStyle.display, top = elementComputedStyle.top, left = elementComputedStyle.left, bottom = elementComputedStyle.bottom, right = elementComputedStyle.right, transform = elementComputedStyle.transform;
    var originComputedStyle = { top: top, left: left, bottom: bottom, right: right, transform: transform };
    // If the element is currently set to display: "none", make it visible before
    // measuring the target bounding box
    if (display === "none") {
        visualElement.setStaticValues("display", target.display || "block");
    }
    // Apply the latest values (as set in checkAndConvertChangedValueTypes)
    visualElement.render();
    var targetBbox = visualElement.getBoundingBox();
    changedKeys.forEach(function (key) {
        // Restore styles to their **calculated computed style**, not their actual
        // originally set style. This allows us to animate between equivalent pixel units.
        var value = visualElement.getValue(key);
        setAndResetVelocity(value, positionalValues[key](originBbox, originComputedStyle));
        target[key] = positionalValues[key](targetBbox, elementComputedStyle);
    });
    return target;
};
var checkAndConvertChangedValueTypes = function (visualElement, target, origin, transitionEnd) {
    if (origin === void 0) { origin = {}; }
    if (transitionEnd === void 0) { transitionEnd = {}; }
    target = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, target);
    transitionEnd = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, transitionEnd);
    var targetPositionalKeys = Object.keys(target).filter(isPositionalKey);
    // We want to remove any transform values that could affect the element's bounding box before
    // it's measured. We'll reapply these later.
    var removedTransformValues = [];
    var hasAttemptedToRemoveTransformValues = false;
    var changedValueTypeKeys = [];
    targetPositionalKeys.forEach(function (key) {
        var value = visualElement.getValue(key);
        if (!visualElement.hasValue(key))
            return;
        var from = origin[key];
        var to = target[key];
        var fromType = findDimensionValueType(from);
        var toType;
        // TODO: The current implementation of this basically throws an error
        // if you try and do value conversion via keyframes. There's probably
        // a way of doing this but the performance implications would need greater scrutiny,
        // as it'd be doing multiple resize-remeasure operations.
        if (isKeyframesTarget(to)) {
            var numKeyframes = to.length;
            for (var i = to[0] === null ? 1 : 0; i < numKeyframes; i++) {
                if (!toType) {
                    toType = findDimensionValueType(to[i]);
                    Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__["invariant"])(toType === fromType ||
                        (isNumOrPxType(fromType) && isNumOrPxType(toType)), "Keyframes must be of the same dimension as the current value");
                }
                else {
                    Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__["invariant"])(findDimensionValueType(to[i]) === toType, "All keyframes must be of the same type");
                }
            }
        }
        else {
            toType = findDimensionValueType(to);
        }
        if (fromType !== toType) {
            // If they're both just number or px, convert them both to numbers rather than
            // relying on resize/remeasure to convert (which is wasteful in this situation)
            if (isNumOrPxType(fromType) && isNumOrPxType(toType)) {
                var current = value.get();
                if (typeof current === "string") {
                    value.set(parseFloat(current));
                }
                if (typeof to === "string") {
                    target[key] = parseFloat(to);
                }
                else if (Array.isArray(to) && toType === style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"]) {
                    target[key] = to.map(parseFloat);
                }
            }
            else if ((fromType === null || fromType === void 0 ? void 0 : fromType.transform) && (toType === null || toType === void 0 ? void 0 : toType.transform) &&
                (from === 0 || to === 0)) {
                // If one or the other value is 0, it's safe to coerce it to the
                // type of the other without measurement
                if (from === 0) {
                    value.set(toType.transform(from));
                }
                else {
                    target[key] = fromType.transform(to);
                }
            }
            else {
                // If we're going to do value conversion via DOM measurements, we first
                // need to remove non-positional transform values that could affect the bbox measurements.
                if (!hasAttemptedToRemoveTransformValues) {
                    removedTransformValues = removeNonTranslationalTransform(visualElement);
                    hasAttemptedToRemoveTransformValues = true;
                }
                changedValueTypeKeys.push(key);
                transitionEnd[key] =
                    transitionEnd[key] !== undefined
                        ? transitionEnd[key]
                        : target[key];
                setAndResetVelocity(value, to);
            }
        }
    });
    if (changedValueTypeKeys.length) {
        var convertedTarget = convertChangedValueTypes(target, visualElement, changedValueTypeKeys);
        // If we removed transform values, reapply them before the next render
        if (removedTransformValues.length) {
            removedTransformValues.forEach(function (_a) {
                var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), key = _b[0], value = _b[1];
                visualElement.getValue(key).set(value);
            });
        }
        // Reapply original values
        visualElement.render();
        return { target: convertedTarget, transitionEnd: transitionEnd };
    }
    else {
        return { target: target, transitionEnd: transitionEnd };
    }
};
/**
 * Convert value types for x/y/width/height/top/left/bottom/right
 *
 * Allows animation between `'auto'` -> `'100%'` or `0` -> `'calc(50% - 10vw)'`
 *
 * @internal
 */
function unitConversion(visualElement, target, origin, transitionEnd) {
    return hasPositionalKey(target)
        ? checkAndConvertChangedValueTypes(visualElement, target, origin, transitionEnd)
        : { target: target, transitionEnd: transitionEnd };
}

/**
 * Parse a DOM variant to make it animatable. This involves resolving CSS variables
 * and ensuring animations like "20%" => "calc(50vw)" are performed in pixels.
 */
var parseDomVariant = function (visualElement, target, origin, transitionEnd) {
    var resolved = resolveCSSVariables(visualElement, target, transitionEnd);
    target = resolved.target;
    transitionEnd = resolved.transitionEnd;
    return unitConversion(visualElement, target, origin, transitionEnd);
};

/**
 * Check if value is a numerical string, ie a string that is purely a number eg "100" or "-100.1"
 */
var isNumericalString = function (v) { return /^\-?\d*\.?\d+$/.test(v); };

var isCustomValue = function (v) {
    return Boolean(v && typeof v === "object" && v.mix && v.toValue);
};
var resolveFinalValueInKeyframes = function (v) {
    // TODO maybe throw if v.length - 1 is placeholder token?
    return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
};

/**
 * Decides if the supplied variable is an array of variant labels
 */
function isVariantLabels(v) {
    return Array.isArray(v);
}
/**
 * Decides if the supplied variable is variant label
 */
function isVariantLabel(v) {
    return typeof v === "string" || isVariantLabels(v);
}
/**
 * Creates an object containing the latest state of every MotionValue on a VisualElement
 */
function getCurrent(visualElement) {
    var current = {};
    visualElement.forEachValue(function (value, key) { return (current[key] = value.get()); });
    return current;
}
/**
 * Creates an object containing the latest velocity of every MotionValue on a VisualElement
 */
function getVelocity(visualElement) {
    var velocity = {};
    visualElement.forEachValue(function (value, key) { return (velocity[key] = value.getVelocity()); });
    return velocity;
}
/**
 * Resovles a variant if it's a variant resolver
 */
function resolveVariant(visualElement, definition, custom) {
    if (typeof definition === "string") {
        definition = visualElement.getVariant(definition);
    }
    return typeof definition === "function"
        ? definition(custom !== null && custom !== void 0 ? custom : visualElement.getVariantPayload(), getCurrent(visualElement), getVelocity(visualElement))
        : definition;
}

/**
 * Set VisualElement's MotionValue, creating a new MotionValue for it if
 * it doesn't exist.
 */
function setMotionValue(visualElement, key, value) {
    if (visualElement.hasValue(key)) {
        visualElement.getValue(key).set(value);
    }
    else {
        visualElement.addValue(key, motionValue(value));
    }
}
function setTarget(visualElement, definition) {
    var resolved = resolveVariant(visualElement, definition);
    var _a = resolved
        ? visualElement.makeTargetAnimatable(resolved, false)
        : {}, _b = _a.transitionEnd, transitionEnd = _b === void 0 ? {} : _b, _c = _a.transition, target = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["transitionEnd", "transition"]);
    target = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, target), transitionEnd);
    for (var key in target) {
        var value = resolveFinalValueInKeyframes(target[key]);
        setMotionValue(visualElement, key, value);
    }
}
function setVariants(visualElement, variantLabels) {
    var reversedLabels = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(variantLabels).reverse();
    reversedLabels.forEach(function (key) {
        var _a;
        setTarget(visualElement, visualElement.getVariant(key));
        (_a = visualElement.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach(function (child) {
            setVariants(child, variantLabels);
        });
    });
}
function setValues(visualElement, definition) {
    if (Array.isArray(definition)) {
        return setVariants(visualElement, definition);
    }
    else if (typeof definition === "string") {
        return setVariants(visualElement, [definition]);
    }
    else {
        setTarget(visualElement, definition);
    }
}
function checkTargetForNewValues(visualElement, target, origin) {
    var _a, _b;
    var _c;
    var newValueKeys = Object.keys(target).filter(function (key) { return !visualElement.hasValue(key); });
    var numNewValues = newValueKeys.length;
    if (!numNewValues)
        return;
    for (var i = 0; i < numNewValues; i++) {
        var key = newValueKeys[i];
        var targetValue = target[key];
        var value = null;
        // If this is a keyframes value, we can attempt to use the first value in the
        // array as that's going to be the first value of the animation anyway
        if (Array.isArray(targetValue)) {
            value = targetValue[0];
        }
        // If it isn't a keyframes or the first keyframes value was set as `null`, read the
        // value from the DOM. It might be worth investigating whether to check props (for SVG)
        // or props.style (for HTML) if the value exists there before attempting to read.
        if (value === null) {
            var readValue = (_a = origin[key]) !== null && _a !== void 0 ? _a : visualElement.readNativeValue(key);
            value = readValue !== undefined ? readValue : target[key];
            Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__["invariant"])(value !== null, "No initial value for \"" + key + "\" can be inferred. Ensure an initial value for \"" + key + "\" is defined on the component.");
        }
        if (typeof value === "string" && isNumericalString(value)) {
            // If this is a number read as a string, ie "0" or "200", convert it to a number
            value = parseFloat(value);
        }
        else if (!findValueType(value) && style_value_types__WEBPACK_IMPORTED_MODULE_4__["complex"].test(targetValue)) {
            // If value is not recognised as animatable, ie "none", create an animatable version origin based on the target
            value = style_value_types__WEBPACK_IMPORTED_MODULE_4__["complex"].getAnimatableNone(targetValue);
        }
        visualElement.addValue(key, motionValue(value));
        (_b = (_c = origin)[key]) !== null && _b !== void 0 ? _b : (_c[key] = value);
        visualElement.baseTarget[key] = value;
    }
}
function getOriginFromTransition(key, transition) {
    if (!transition)
        return;
    var valueTransition = transition[key] || transition["default"] || transition;
    return valueTransition.from;
}
function getOrigin(target, transition, visualElement) {
    var _a, _b;
    var origin = {};
    for (var key in target) {
        origin[key] = (_a = getOriginFromTransition(key, transition)) !== null && _a !== void 0 ? _a : (_b = visualElement.getValue(key)) === null || _b === void 0 ? void 0 : _b.get();
    }
    return origin;
}

var isMotionValue = function (value) {
    return value instanceof MotionValue;
};

/**
 * A VisualElement for HTMLElements
 */
var HTMLVisualElement = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(HTMLVisualElement, _super);
    function HTMLVisualElement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         *
         */
        _this.defaultConfig = {
            enableHardwareAcceleration: true,
            allowTransformNone: true,
        };
        /**
         * A mutable record of styles we want to apply directly to the rendered Element
         * every frame. We use a mutable data structure to reduce GC during animations.
         */
        _this.style = {};
        /**
         * A record of styles we only want to apply via React. This gets set in useMotionValues
         * and applied in the render function. I'd prefer this to live somewhere else to decouple
         * VisualElement from React but works for now.
         */
        _this.reactStyle = {};
        /**
         * A mutable record of CSS variables we want to apply directly to the rendered Element
         * every frame. We use a mutable data structure to reduce GC during animations.
         */
        _this.vars = {};
        /**
         * A mutable record of transforms we want to apply directly to the rendered Element
         * every frame. We use a mutable data structure to reduce GC during animations.
         */
        _this.transform = {};
        /**
         * A mutable record of transform origins we want to apply directly to the rendered Element
         * every frame. We use a mutable data structure to reduce GC during animations.
         */
        _this.transformOrigin = {};
        /**
         * A mutable record of transform keys we want to apply to the rendered Element. We order
         * this to order transforms in the desired order. We use a mutable data structure to reduce GC during animations.
         */
        _this.transformKeys = [];
        _this.config = _this.defaultConfig;
        /**
         * ========================================
         * Layout
         * ========================================
         */
        _this.isLayoutProjectionEnabled = false;
        /**
         * A set of layout update event handlers. These are only called once all layouts have been read,
         * making it safe to perform DOM write operations.
         */
        _this.layoutUpdateListeners = new SubscriptionManager();
        _this.layoutMeasureListeners = new SubscriptionManager();
        _this.viewportBoxUpdateListeners = new SubscriptionManager();
        /**
         * Keep track of whether the viewport box has been updated since the last render.
         * If it has, we want to fire the onViewportBoxUpdate listener.
         */
        _this.hasViewportBoxUpdated = false;
        /**
         * The visual target we want to project our component into on a given frame
         * before applying transforms defined in `animate` or `style`.
         *
         * This is considered mutable to avoid object creation on each frame.
         */
        _this.targetBoxFinal = axisBox();
        /**
         * The overall scale of the local coordinate system as transformed by all parents
         * of this component. We use this for scale correction on our calculated layouts
         * and scale-affected values like `boxShadow`.
         *
         * This is considered mutable to avoid object creation on each frame.
         */
        _this.treeScale = { x: 1, y: 1 };
        /**
         * The delta between the boxCorrected and the desired
         * targetBox (before user-set transforms are applied). The calculated output will be
         * handed to the renderer and used as part of the style correction calculations, for
         * instance calculating how to display the desired border-radius correctly.
         *
         * This is considered mutable to avoid object creation on each frame.
         */
        _this.delta = delta();
        /**
         * The delta between the boxCorrected and the desired targetBoxFinal. The calculated
         * output will be handed to the renderer and used to project the boxCorrected into
         * the targetBoxFinal.
         *
         * This is considered mutable to avoid object creation on each frame.
         */
        _this.deltaFinal = delta();
        /**
         * The computed transform string to apply deltaFinal to the element. Currently this is only
         * being used to diff and decide whether to render on the current frame, but a minor optimisation
         * could be to provide this to the buildHTMLStyle function.
         */
        _this.deltaTransform = identityProjection;
        /**
         *
         */
        _this.stopLayoutAxisAnimation = {
            x: function () { },
            y: function () { },
        };
        _this.isTargetBoxLocked = false;
        _this.updateLayoutDelta = function () {
            _this.isLayoutProjectionEnabled && _this.box && _this.updateLayoutDeltas();
            /**
             * Ensure all children layouts are also updated.
             *
             * This uses a pre-bound function executor rather than a lamda to avoid creating a new function
             * multiple times per frame (source of mid-animation GC)
             */
            _this.children.forEach(fireUpdateLayoutDelta);
        };
        return _this;
    }
    /**
     * When a value is removed, we want to make sure it's removed from all rendered data structures.
     */
    HTMLVisualElement.prototype.removeValue = function (key) {
        _super.prototype.removeValue.call(this, key);
        delete this.vars[key];
        delete this.style[key];
    };
    /**
     * Empty the mutable data structures by re-creating them. We can do this every React render
     * as the comparative workload to the rest of the render is very low and this is also when
     * we want to reflect values that might have been removed by the render.
     */
    HTMLVisualElement.prototype.clean = function () {
        this.style = {};
        this.vars = {};
        this.transform = {};
    };
    HTMLVisualElement.prototype.updateConfig = function (config) {
        if (config === void 0) { config = {}; }
        this.config = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.defaultConfig), config);
    };
    /**
     * Read a value directly from the HTMLElement style.
     */
    HTMLVisualElement.prototype.read = function (key) {
        var computedStyle = this.getComputedStyle();
        return ((isCSSVariable(key)
            ? computedStyle.getPropertyValue(key)
            : computedStyle[key]) || 0);
    };
    HTMLVisualElement.prototype.addValue = function (key, value) {
        _super.prototype.addValue.call(this, key, value);
        // If we have rotate values we want to foce the layoutOrigin used in layout projection
        // to the center of the element.
        if (key.startsWith("rotate"))
            this.layoutOrigin = 0.5;
    };
    /**
     * Read a value directly from the HTMLElement in case it's not defined by a Motion
     * prop. If it's a transform, we just return a pre-defined default value as reading these
     * out of a matrix is either error-prone or can incur a big payload for little benefit.
     */
    HTMLVisualElement.prototype.readNativeValue = function (key) {
        if (isTransformProp(key)) {
            var defaultValueType = getDefaultValueType(key);
            return defaultValueType ? defaultValueType.default || 0 : 0;
        }
        else {
            return this.read(key);
        }
    };
    HTMLVisualElement.prototype.getBaseValue = function (key, props) {
        var _a;
        var style = (_a = props.style) === null || _a === void 0 ? void 0 : _a[key];
        return style !== undefined && !isMotionValue(style)
            ? style
            : _super.prototype.getBaseValue.call(this, key, props);
    };
    /**
     * Ensure that HTML and Framer-specific value types like `px`->`%` and `Color`
     * can be animated by Motion.
     */
    HTMLVisualElement.prototype.makeTargetAnimatable = function (_a, parseDOMValues) {
        if (parseDOMValues === void 0) { parseDOMValues = true; }
        var transition = _a.transition, transitionEnd = _a.transitionEnd, target = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["transition", "transitionEnd"]);
        var transformValues = this.config.transformValues;
        var origin = getOrigin(target, transition || {}, this);
        /**
         * If Framer has provided a function to convert `Color` etc value types, convert them
         */
        if (transformValues) {
            if (transitionEnd)
                transitionEnd = transformValues(transitionEnd);
            if (target)
                target = transformValues(target);
            if (origin)
                origin = transformValues(origin);
        }
        if (parseDOMValues) {
            checkTargetForNewValues(this, target, origin);
            var parsed = parseDomVariant(this, target, origin, transitionEnd);
            transitionEnd = parsed.transitionEnd;
            target = parsed.target;
        }
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ transition: transition,
            transitionEnd: transitionEnd }, target);
    };
    HTMLVisualElement.prototype.enableLayoutProjection = function () {
        this.isLayoutProjectionEnabled = true;
    };
    HTMLVisualElement.prototype.hide = function () {
        if (this.isVisible === false)
            return;
        this.isVisible = false;
        this.scheduleRender();
    };
    HTMLVisualElement.prototype.show = function () {
        if (this.isVisible === true)
            return;
        this.isVisible = true;
        this.scheduleRender();
    };
    /**
     * Register an event listener to fire when the layout is updated. We might want to expose support
     * for this via a `motion` prop.
     */
    HTMLVisualElement.prototype.onLayoutUpdate = function (callback) {
        return this.layoutUpdateListeners.add(callback);
    };
    HTMLVisualElement.prototype.onLayoutMeasure = function (callback) {
        return this.layoutMeasureListeners.add(callback);
    };
    HTMLVisualElement.prototype.onViewportBoxUpdate = function (callback) {
        return this.viewportBoxUpdateListeners.add(callback);
    };
    /**
     * To be called when all layouts are successfully updated. In turn we can notify layoutUpdate
     * subscribers.
     */
    HTMLVisualElement.prototype.layoutReady = function (config) {
        this.layoutUpdateListeners.notify(this.box, this.prevViewportBox || this.box, config);
    };
    /**
     * Measure and return the Element's bounding box. We convert it to a AxisBox2D
     * structure to make it easier to work on each individual axis generically.
     */
    HTMLVisualElement.prototype.getBoundingBox = function () {
        var transformPagePoint = this.config.transformPagePoint;
        return getBoundingBox(this.element, transformPagePoint);
    };
    HTMLVisualElement.prototype.getBoundingBoxWithoutTransforms = function () {
        var bbox = this.getBoundingBox();
        removeBoxTransforms(bbox, this.latest);
        return bbox;
    };
    /**
     * Return the computed style after a render.
     */
    HTMLVisualElement.prototype.getComputedStyle = function () {
        return window.getComputedStyle(this.element);
    };
    /**
     * Record the bounding box as it exists before a re-render.
     */
    HTMLVisualElement.prototype.snapshotBoundingBox = function () {
        this.prevViewportBox = this.getBoundingBoxWithoutTransforms();
        /**
         * Update targetBox to match the prevViewportBox. This is just to ensure
         * that targetBox is affected by scroll in the same way as the measured box
         */
        this.rebaseTargetBox(false, this.prevViewportBox);
    };
    HTMLVisualElement.prototype.rebaseTargetBox = function (force, box) {
        var _this = this;
        if (force === void 0) { force = false; }
        if (box === void 0) { box = this.box; }
        var _a = this.getAxisProgress(), x = _a.x, y = _a.y;
        var shouldRebase = this.box &&
            !this.isTargetBoxLocked &&
            !x.isAnimating() &&
            !y.isAnimating();
        if (force || shouldRebase) {
            eachAxis(function (axis) {
                var _a = box[axis], min = _a.min, max = _a.max;
                _this.setAxisTarget(axis, min, max);
            });
        }
    };
    HTMLVisualElement.prototype.measureLayout = function () {
        var _this = this;
        this.box = this.getBoundingBox();
        this.boxCorrected = copyAxisBox(this.box);
        if (!this.targetBox)
            this.targetBox = copyAxisBox(this.box);
        this.layoutMeasureListeners.notify(this.box, this.prevViewportBox || this.box);
        framesync__WEBPACK_IMPORTED_MODULE_1__["default"].update(function () { return _this.rebaseTargetBox(); });
    };
    HTMLVisualElement.prototype.lockTargetBox = function () {
        this.isTargetBoxLocked = true;
    };
    HTMLVisualElement.prototype.unlockTargetBox = function () {
        this.stopLayoutAnimation();
        this.isTargetBoxLocked = false;
    };
    /**
     * Reset the transform on the current Element. This is called as part
     * of a batched process across the entire layout tree. To remove this write
     * cycle it'd be interesting to see if it's possible to "undo" all the current
     * layout transforms up the tree in the same way this.getBoundingBoxWithoutTransforms
     * works
     */
    HTMLVisualElement.prototype.resetTransform = function () {
        var transformTemplate = this.config.transformTemplate;
        this.element.style.transform = transformTemplate
            ? transformTemplate({}, "")
            : "none";
        // Ensure that whatever happens next, we restore our transform
        this.scheduleRender();
    };
    /**
     * Set new min/max boundaries to project an axis into
     */
    HTMLVisualElement.prototype.setAxisTarget = function (axis, min, max) {
        var targetAxis = this.targetBox[axis];
        targetAxis.min = min;
        targetAxis.max = max;
        // Flag that we want to fire the onViewportBoxUpdate event handler
        this.hasViewportBoxUpdated = true;
        this.rootParent.scheduleUpdateLayoutDelta();
    };
    HTMLVisualElement.prototype.getAxisProgress = function () {
        if (!this.axisProgress) {
            this.axisProgress = {
                x: motionValue(0),
                y: motionValue(0),
            };
        }
        return this.axisProgress;
    };
    /**
     *
     */
    HTMLVisualElement.prototype.startLayoutAxisAnimation = function (axis, transition) {
        var _this = this;
        var _a;
        var progress = this.getAxisProgress()[axis];
        var _b = this.targetBox[axis], min = _b.min, max = _b.max;
        var length = max - min;
        progress.clearListeners();
        progress.set(min);
        progress.set(min); // Set twice to hard-reset velocity
        progress.onChange(function (v) { return _this.setAxisTarget(axis, v, v + length); });
        return (_a = this.animateMotionValue) === null || _a === void 0 ? void 0 : _a.call(this, axis, progress, 0, transition);
    };
    HTMLVisualElement.prototype.stopLayoutAnimation = function () {
        var _this = this;
        eachAxis(function (axis) { return _this.getAxisProgress()[axis].stop(); });
    };
    HTMLVisualElement.prototype.withoutTransform = function (callback) {
        if (this.isLayoutProjectionEnabled) {
            this.resetTransform();
        }
        if (this.parent) {
            this.parent.withoutTransform(callback);
        }
        else {
            callback();
        }
        if (this.isLayoutProjectionEnabled) {
            this.element.style.transform = this.style.transform;
        }
    };
    /**
     * Update the layout deltas to reflect the relative positions of the layout
     * and the desired target box
     */
    HTMLVisualElement.prototype.updateLayoutDeltas = function () {
        /**
         * Reset the corrected box with the latest values from box, as we're then going
         * to perform mutative operations on it.
         */
        resetBox(this.boxCorrected, this.box);
        var prevTreeScaleX = this.treeScale.x;
        var prevTreeScaleY = this.treeScale.y;
        /**
         * Apply all the parent deltas to this box to produce the corrected box. This
         * is the layout box, as it will appear on screen as a result of the transforms of its parents.
         */
        applyTreeDeltas(this.boxCorrected, this.treeScale, this.treePath);
        /**
         * Update the delta between the corrected box and the target box before user-set transforms were applied.
         * This will allow us to calculate the corrected borderRadius and boxShadow to compensate
         * for our layout reprojection, but still allow them to be scaled correctly by the user.
         * It might be that to simplify this we may want to accept that user-set scale is also corrected
         * and we wouldn't have to keep and calc both deltas, OR we could support a user setting
         * to allow people to choose whether these styles are corrected based on just the
         * layout reprojection or the final bounding box.
         */
        updateBoxDelta(this.delta, this.boxCorrected, this.targetBox, this.layoutOrigin);
        /**
         * If we have a listener for the viewport box, fire it.
         */
        this.hasViewportBoxUpdated &&
            this.viewportBoxUpdateListeners.notify(this.targetBox, this.delta);
        this.hasViewportBoxUpdated = false;
        /**
         * Ensure this element renders on the next frame if the projection transform has changed.
         */
        var deltaTransform = buildLayoutProjectionTransform(this.delta, this.treeScale);
        if (deltaTransform !== this.deltaTransform ||
            // Also compare calculated treeScale, for values that rely on only this for scale correction.
            prevTreeScaleX !== this.treeScale.x ||
            prevTreeScaleY !== this.treeScale.y) {
            this.scheduleRender();
        }
        this.deltaTransform = deltaTransform;
    };
    HTMLVisualElement.prototype.updateTransformDeltas = function () {
        if (!this.isLayoutProjectionEnabled || !this.box)
            return;
        /**
         * Apply the latest user-set transforms to the targetBox to produce the targetBoxFinal.
         * This is the final box that we will then project into by calculating a transform delta and
         * applying it to the corrected box.
         */
        applyBoxTransforms(this.targetBoxFinal, this.targetBox, this.latest);
        /**
         * Update the delta between the corrected box and the final target box, after
         * user-set transforms are applied to it. This will be used by the renderer to
         * create a transform style that will reproject the element from its actual layout
         * into the desired bounding box.
         */
        updateBoxDelta(this.deltaFinal, this.boxCorrected, this.targetBoxFinal, this.layoutOrigin);
    };
    /**
     * ========================================
     * Build & render
     * ========================================
     */
    /**
     * Build a style prop using the latest resolved MotionValues
     */
    HTMLVisualElement.prototype.build = function () {
        this.updateTransformDeltas();
        if (this.isVisible !== undefined) {
            this.style.visibility = this.isVisible ? "visible" : "hidden";
        }
        buildHTMLStyles(this.latest, this.style, this.vars, this.transform, this.transformOrigin, this.transformKeys, this.config, this.isLayoutProjectionEnabled && !!this.box, this.delta, this.deltaFinal, this.treeScale, this.targetBoxFinal);
    };
    /**
     * Render the Element by rebuilding and applying the latest styles and vars.
     */
    HTMLVisualElement.prototype.render = function () {
        // Rebuild the latest animated values into style and vars caches.
        this.build();
        // Directly assign style into the Element's style prop. In tests Object.assign is the
        // fastest way to assign styles.
        Object.assign(this.element.style, this.style);
        // Loop over any CSS variables and assign those.
        for (var key in this.vars) {
            this.element.style.setProperty(key, this.vars[key]);
        }
    };
    return HTMLVisualElement;
}(VisualElement));
/**
 * Pre-bound version of updateLayoutDelta so we're not creating a new function multiple
 * times per frame.
 */
var fireUpdateLayoutDelta = function (child) {
    return child.updateLayoutDelta();
};

/**
 * Creates a constant value over the lifecycle of a component.
 *
 * Even if `useMemo` is provided an empty array as its final argument, it doesn't offer
 * a guarantee that it won't re-run for performance reasons later on. By using `useConstant`
 * you can ensure that initialisers don't execute twice or more.
 */
function useConstant(init) {
    var ref = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(null);
    if (ref.current === null) {
        ref.current = init();
    }
    return ref.current;
}

function calcOrigin$1(origin, offset, size) {
    return typeof origin === "string"
        ? origin
        : style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"].transform(offset + size * origin);
}
/**
 * The SVG transform origin defaults are different to CSS and is less intuitive,
 * so we use the measured dimensions of the SVG to reconcile these.
 */
function calcSVGTransformOrigin(dimensions, originX, originY) {
    var pxOriginX = calcOrigin$1(originX, dimensions.x, dimensions.width);
    var pxOriginY = calcOrigin$1(originY, dimensions.y, dimensions.height);
    return pxOriginX + " " + pxOriginY;
}

// Convert a progress 0-1 to a pixels value based on the provided length
var progressToPixels = function (progress, length) {
    return style_value_types__WEBPACK_IMPORTED_MODULE_4__["px"].transform(progress * length);
};
var dashKeys = {
    offset: "stroke-dashoffset",
    array: "stroke-dasharray",
};
var camelKeys = {
    offset: "strokeDashoffset",
    array: "strokeDasharray",
};
/**
 * Build SVG path properties. Uses the path's measured length to convert
 * our custom pathLength, pathSpacing and pathOffset into stroke-dashoffset
 * and stroke-dasharray attributes.
 *
 * This function is mutative to reduce per-frame GC.
 */
function buildSVGPath(attrs, totalLength, length, spacing, offset, useDashCase) {
    if (spacing === void 0) { spacing = 1; }
    if (offset === void 0) { offset = 0; }
    if (useDashCase === void 0) { useDashCase = true; }
    // We use dash case when setting attributes directly to the DOM node and camel case
    // when defining props on a React component.
    var keys = useDashCase ? dashKeys : camelKeys;
    // Build the dash offset
    attrs[keys.offset] = progressToPixels(-offset, totalLength);
    // Build the dash array
    var pathLength = progressToPixels(length, totalLength);
    var pathSpacing = progressToPixels(spacing, totalLength);
    attrs[keys.array] = pathLength + " " + pathSpacing;
}

var unmeasured = { x: 0, y: 0, width: 0, height: 0 };
/**
 * Build SVG visual attrbutes, like cx and style.transform
 */
function buildSVGAttrs(_a, style, vars, attrs, transform, transformOrigin, transformKeys, config, dimensions, totalPathLength, isLayoutProjectionEnabled, delta, deltaFinal, treeScale, targetBox) {
    var attrX = _a.attrX, attrY = _a.attrY, originX = _a.originX, originY = _a.originY, pathLength = _a.pathLength, _b = _a.pathSpacing, pathSpacing = _b === void 0 ? 1 : _b, _c = _a.pathOffset, pathOffset = _c === void 0 ? 0 : _c, 
    // This is object creation, which we try to avoid per-frame.
    latest = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["attrX", "attrY", "originX", "originY", "pathLength", "pathSpacing", "pathOffset"]);
    /**
     * With SVG we treat all animated values as attributes rather than CSS, so we build into attrs
     */
    buildHTMLStyles(latest, attrs, vars, transform, transformOrigin, transformKeys, config, isLayoutProjectionEnabled, delta, deltaFinal, treeScale, targetBox);
    /**
     * However, we apply transforms as CSS transforms. So if we detect a transform we take it from attrs
     * and copy it into style.
     */
    if (attrs.transform) {
        style.transform = attrs.transform;
        delete attrs.transform;
    }
    // Parse transformOrigin
    if (originX !== undefined || originY !== undefined || style.transform) {
        style.transformOrigin = calcSVGTransformOrigin(dimensions || unmeasured, originX !== undefined ? originX : 0.5, originY !== undefined ? originY : 0.5);
    }
    // Treat x/y not as shortcuts but as actual attributes
    if (attrX !== undefined)
        attrs.x = attrX;
    if (attrY !== undefined)
        attrs.y = attrY;
    // Build SVG path if one has been measured
    if (totalPathLength !== undefined && pathLength !== undefined) {
        buildSVGPath(attrs, totalPathLength, pathLength, pathSpacing, pathOffset, false);
    }
    return attrs;
}

/**
 * A set of attribute names that are always read/written as camel case.
 */
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
]);

var CAMEL_CASE_PATTERN = /([a-z])([A-Z])/g;
var REPLACE_TEMPLATE = "$1-$2";
/**
 * Convert camelCase to dash-case properties.
 */
var camelToDash = function (str) {
    return str.replace(CAMEL_CASE_PATTERN, REPLACE_TEMPLATE).toLowerCase();
};

/**
 * A VisualElement for SVGElements. Inherits from and extends HTMLVisualElement as the two
 * share data structures.
 */
var SVGVisualElement = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(SVGVisualElement, _super);
    function SVGVisualElement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * A mutable record of attributes we want to apply directly to the rendered Element
         * every frame. We use a mutable data structure to reduce GC during animations.
         */
        _this.attrs = {};
        /**
         * We disable hardware acceleration for SVG transforms as they're not currently able to be accelerated.
         */
        _this.defaultConfig = {
            enableHardwareAcceleration: false,
        };
        /**
         * Without duplicating this call from HTMLVisualElement we end up with HTMLVisualElement.defaultConfig
         * being assigned to config
         */
        _this.config = _this.defaultConfig;
        return _this;
    }
    /**
     * Measure the SVG element on mount. This can affect page rendering so there might be a
     * better time to perform this - for instance dynamically only if there's a transform-origin dependent
     * transform being set (like rotate)
     */
    SVGVisualElement.prototype.mount = function (element) {
        _super.prototype.mount.call(this, element);
        this.measure();
    };
    /**
     * Update the SVG dimensions and path length
     */
    SVGVisualElement.prototype.measure = function () {
        var _this = this;
        try {
            this.dimensions =
                typeof this.element.getBBox ===
                    "function"
                    ? this.element.getBBox()
                    : this.element.getBoundingClientRect();
        }
        catch (e) {
            // Most likely trying to measure an unrendered element under Firefox
            this.dimensions = { x: 0, y: 0, width: 0, height: 0 };
        }
        if (isPath(this.element)) {
            this.totalPathLength = this.element.getTotalLength();
        }
        /**
         * Ensure we render the element as soon as possible to reflect the measured dimensions.
         * Preferably this would happen synchronously but we put it in rAF to prevent layout thrashing.
         */
        framesync__WEBPACK_IMPORTED_MODULE_1__["default"].render(function () { return _this.render(); });
    };
    SVGVisualElement.prototype.getBaseValue = function (key, props) {
        var prop = props[key];
        return prop !== undefined && !isMotionValue(prop)
            ? prop
            : _super.prototype.getBaseValue.call(this, key, props);
    };
    /**
     * Empty the mutable data structures in case attrs have been removed between renders.
     */
    SVGVisualElement.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.attrs = {};
    };
    /**
     * Read an attribute directly from the SVGElement
     */
    SVGVisualElement.prototype.read = function (key) {
        key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
        return this.element.getAttribute(key);
    };
    SVGVisualElement.prototype.build = function () {
        this.updateTransformDeltas();
        buildSVGAttrs(this.latest, this.style, this.vars, this.attrs, this.transform, this.transformOrigin, this.transformKeys, this.config, this.dimensions, this.totalPathLength, this.isLayoutProjectionEnabled && !!this.box, this.delta, this.deltaFinal, this.treeScale, this.targetBoxFinal);
    };
    SVGVisualElement.prototype.render = function () {
        // Update HTML styles and CSS variables
        _super.prototype.render.call(this);
        // Loop through attributes and apply them to the SVGElement
        for (var key in this.attrs) {
            this.element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, this.attrs[key]);
        }
    };
    return SVGVisualElement;
}(HTMLVisualElement));
function isPath(element) {
    return element.tagName === "path";
}

/**
 * @internal
 */
/**
 * @internal
 */
var svgElements = [
    "animate",
    "circle",
    "clipPath",
    "defs",
    "desc",
    "ellipse",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "filter",
    "foreignObject",
    "g",
    "image",
    "line",
    "linearGradient",
    "marker",
    "mask",
    "metadata",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "stop",
    "svg",
    "switch",
    "symbol",
    "text",
    "textPath",
    "tspan",
    "use",
    "view",
];

var svgTagNames = new Set(svgElements);
/**
 * Determine whether this is a HTML or SVG component based on if the provided
 * Component is a string and a recognised SVG tag. A potentially better way to
 * do this would be to offer a `motion.customSVG` function and determine this
 * when we generate the `motion.circle` etc components.
 */
function isSVGComponent(Component) {
    return typeof Component === "string" && svgTagNames.has(Component);
}

/**
 * @public
 */
var PresenceContext = Object(react__WEBPACK_IMPORTED_MODULE_5__["createContext"])(null);

var MotionContext = Object(react__WEBPACK_IMPORTED_MODULE_5__["createContext"])({
    variantContext: {},
});
function useVariantContext() {
    return Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(MotionContext).variantContext;
}
function useVisualElementContext() {
    return Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(MotionContext).visualElement;
}

/**
 * @internal
 */
var LayoutGroupContext = Object(react__WEBPACK_IMPORTED_MODULE_5__["createContext"])(null);

/**
 * DOM-flavoured variation of the useVisualElement hook. Used to create either a HTMLVisualElement
 * or SVGVisualElement for the component.
 *
 */
var useDomVisualElement = function (Component, props, isStatic, ref) {
    var parent = useVisualElementContext();
    var visualElement = useConstant(function () {
        var DOMVisualElement = isSVGComponent(Component)
            ? SVGVisualElement
            : HTMLVisualElement;
        return new DOMVisualElement(parent, ref);
    });
    /**
     * If this is a static component, for instance on the Framer canvas, we essentially want to
     * treat it as a new component every render.
     * TODO: This shouldn't live in a DOM-specific hook but there'll be a better sense of where this
     * and much of this hook should live when creating a new type of VisualElement (e.g Three.js).
     */
    if (isStatic) {
        visualElement.values.clear();
        visualElement.latest = {};
    }
    visualElement.updateConfig(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, visualElement.config), { enableHardwareAcceleration: !isStatic }), props));
    var layoutGroupId = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(LayoutGroupContext);
    visualElement.layoutId =
        layoutGroupId && props.layoutId
            ? layoutGroupId + "-" + props.layoutId
            : props.layoutId;
    var presenceContext = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(PresenceContext);
    /**
     * Update VisualElement with presence data.
     */
    var isPresent = presenceContext === null ? true : presenceContext.isPresent;
    visualElement.isPresent =
        props.isPresent !== undefined ? props.isPresent : isPresent;
    /**
     *
     */
    var presenceId = presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.id;
    visualElement.isPresenceRoot = !parent || parent.presenceId !== presenceId;
    /**
     * TODO: Investigate if we need this
     */
    Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
        if (props.onViewportBoxUpdate) {
            return visualElement.onViewportBoxUpdate(props.onViewportBoxUpdate);
        }
    }, [props.onViewportBoxUpdate]);
    return visualElement;
};

/**
 * @public
 */
var MotionConfigContext = Object(react__WEBPACK_IMPORTED_MODULE_5__["createContext"])({
    transformPagePoint: function (p) { return p; },
    features: [],
    isStatic: false,
});
/**
 * MotionConfig can be used in combination with the `m` component to cut bundle size
 * and dynamically load only the features you use.
 *
 * ```jsx
 * import {
 *   m as motion,
 *   AnimationFeature,
 *   MotionConfig
 * } from "framer-motion"
 *
 * export function App() {
 *   return (
 *     <MotionConfig features={[AnimationFeature]}>
 *       <motion.div animate={{ x: 100 }} />
 *     </MotionConfig>
 *   )
 * }
 * ```
 *
 * @public
 */
function MotionConfig(_a) {
    var children = _a.children, _b = _a.features, features = _b === void 0 ? [] : _b, props = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["children", "features"]);
    var pluginContext = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(MotionConfigContext);
    var loadedFeatures = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(pluginContext.features, features);
    // We do want to rerender children when the number of loaded features changes
    var value = Object(react__WEBPACK_IMPORTED_MODULE_5__["useMemo"])(function () { return ({ features: loadedFeatures }); }, [
        loadedFeatures.length,
    ]);
    // Mutative to prevent triggering rerenders in all listening
    // components every time this component renders
    for (var key in props) {
        value[key] = props[key];
    }
    return (Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(MotionConfigContext.Provider, { value: value }, children));
}

function useUnmountEffect(callback) {
    return Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () { return function () { return callback(); }; }, []);
}

function addDomEvent(target, eventName, handler, options) {
    target.addEventListener(eventName, handler, options);
    return function () { return target.removeEventListener(eventName, handler, options); };
}
/**
 * Attaches an event listener directly to the provided DOM element.
 *
 * Bypassing React's event system can be desirable, for instance when attaching non-passive
 * event handlers.
 *
 * ```jsx
 * const ref = useRef(null)
 *
 * useDomEvent(ref, 'wheel', onWheel, { passive: false })
 *
 * return <div ref={ref} />
 * ```
 *
 * @param ref - React.RefObject that's been provided to the element you want to bind the listener to.
 * @param eventName - Name of the event you want listen for.
 * @param handler - Function to fire when receiving the event.
 * @param options - Options to pass to `Event.addEventListener`.
 *
 * @public
 */
function useDomEvent(ref, eventName, handler, options) {
    Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
        var element = ref.current;
        if (handler && element) {
            return addDomEvent(element, eventName, handler, options);
        }
    }, [ref, eventName, handler, options]);
}

function isMouseEvent(event) {
    // PointerEvent inherits from MouseEvent so we can't use a straight instanceof check.
    if (typeof PointerEvent !== "undefined" && event instanceof PointerEvent) {
        return !!(event.pointerType === "mouse");
    }
    return event instanceof MouseEvent;
}
function isTouchEvent(event) {
    var hasTouches = !!event.touches;
    return hasTouches;
}

/**
 * Filters out events not attached to the primary pointer (currently left mouse button)
 * @param eventHandler
 */
function filterPrimaryPointer(eventHandler) {
    return function (event) {
        var isMouseEvent = event instanceof MouseEvent;
        var isPrimaryPointer = !isMouseEvent ||
            (isMouseEvent && event.button === 0);
        if (isPrimaryPointer) {
            eventHandler(event);
        }
    };
}
var defaultPagePoint = { pageX: 0, pageY: 0 };
function pointFromTouch(e, pointType) {
    if (pointType === void 0) { pointType = "page"; }
    var primaryTouch = e.touches[0] || e.changedTouches[0];
    var point = primaryTouch || defaultPagePoint;
    return {
        x: point[pointType + "X"],
        y: point[pointType + "Y"],
    };
}
function pointFromMouse(point, pointType) {
    if (pointType === void 0) { pointType = "page"; }
    return {
        x: point[pointType + "X"],
        y: point[pointType + "Y"],
    };
}
function extractEventInfo(event, pointType) {
    if (pointType === void 0) { pointType = "page"; }
    return {
        point: isTouchEvent(event)
            ? pointFromTouch(event, pointType)
            : pointFromMouse(event, pointType),
    };
}
function getViewportPointFromEvent(event) {
    return extractEventInfo(event, "client");
}
var wrapHandler = function (handler, shouldFilterPrimaryPointer) {
    if (shouldFilterPrimaryPointer === void 0) { shouldFilterPrimaryPointer = false; }
    var listener = function (event) {
        return handler(event, extractEventInfo(event));
    };
    return shouldFilterPrimaryPointer
        ? filterPrimaryPointer(listener)
        : listener;
};

var isBrowser = typeof window !== "undefined";
// We check for event support via functions in case they've been mocked by a testing suite.
var supportsPointerEvents = function () {
    return isBrowser && window.onpointerdown === null;
};
var supportsTouchEvents = function () {
    return isBrowser && window.ontouchstart === null;
};
var supportsMouseEvents = function () {
    return isBrowser && window.onmousedown === null;
};

var mouseEventNames = {
    pointerdown: "mousedown",
    pointermove: "mousemove",
    pointerup: "mouseup",
    pointercancel: "mousecancel",
    pointerover: "mouseover",
    pointerout: "mouseout",
    pointerenter: "mouseenter",
    pointerleave: "mouseleave",
};
var touchEventNames = {
    pointerdown: "touchstart",
    pointermove: "touchmove",
    pointerup: "touchend",
    pointercancel: "touchcancel",
};
function getPointerEventName(name) {
    if (supportsPointerEvents()) {
        return name;
    }
    else if (supportsTouchEvents()) {
        return touchEventNames[name];
    }
    else if (supportsMouseEvents()) {
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

/**
 * Converts seconds to milliseconds
 *
 * @param seconds - Time in seconds.
 * @return milliseconds - Converted time in milliseconds.
 */
var secondsToMilliseconds = function (seconds) { return seconds * 1000; };

/**
 * @internal
 */
var PanSession = /** @class */ (function () {
    function PanSession(event, handlers, _a) {
        var _this = this;
        var transformPagePoint = (_a === void 0 ? {} : _a).transformPagePoint;
        /**
         * @internal
         */
        this.startEvent = null;
        /**
         * @internal
         */
        this.lastMoveEvent = null;
        /**
         * @internal
         */
        this.lastMoveEventInfo = null;
        /**
         * @internal
         */
        this.handlers = {};
        this.updatePoint = function () {
            if (!(_this.lastMoveEvent && _this.lastMoveEventInfo))
                return;
            var info = getPanInfo(_this.lastMoveEventInfo, _this.history);
            var isPanStarted = _this.startEvent !== null;
            // Only start panning if the offset is larger than 3 pixels. If we make it
            // any larger than this we'll want to reset the pointer history
            // on the first update to avoid visual snapping to the cursoe.
            var isDistancePastThreshold = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["distance"])(info.offset, { x: 0, y: 0 }) >= 3;
            if (!isPanStarted && !isDistancePastThreshold)
                return;
            var point = info.point;
            var timestamp = Object(framesync__WEBPACK_IMPORTED_MODULE_1__["getFrameData"])().timestamp;
            _this.history.push(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, point), { timestamp: timestamp }));
            var _a = _this.handlers, onStart = _a.onStart, onMove = _a.onMove;
            if (!isPanStarted) {
                onStart && onStart(_this.lastMoveEvent, info);
                _this.startEvent = _this.lastMoveEvent;
            }
            onMove && onMove(_this.lastMoveEvent, info);
        };
        this.handlePointerMove = function (event, info) {
            _this.lastMoveEvent = event;
            _this.lastMoveEventInfo = transformPoint(info, _this.transformPagePoint);
            // Because Safari doesn't trigger mouseup events when it's above a `<select>`
            if (isMouseEvent(event) && event.buttons === 0) {
                _this.handlePointerUp(event, info);
                return;
            }
            // Throttle mouse move event to once per frame
            framesync__WEBPACK_IMPORTED_MODULE_1__["default"].update(_this.updatePoint, true);
        };
        this.handlePointerUp = function (event, info) {
            _this.end();
            var onEnd = _this.handlers.onEnd;
            if (!onEnd)
                return;
            var panInfo = getPanInfo(transformPoint(info, _this.transformPagePoint), _this.history);
            onEnd && onEnd(event, panInfo);
        };
        // If we have more than one touch, don't start detecting this gesture
        if (isTouchEvent(event) && event.touches.length > 1)
            return;
        this.handlers = handlers;
        this.transformPagePoint = transformPagePoint;
        var info = extractEventInfo(event);
        var initialInfo = transformPoint(info, this.transformPagePoint);
        var point = initialInfo.point;
        var timestamp = Object(framesync__WEBPACK_IMPORTED_MODULE_1__["getFrameData"])().timestamp;
        this.history = [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, point), { timestamp: timestamp })];
        var onSessionStart = handlers.onSessionStart;
        onSessionStart &&
            onSessionStart(event, getPanInfo(initialInfo, this.history));
        this.removeListeners = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["pipe"])(addPointerEvent(window, "pointermove", this.handlePointerMove), addPointerEvent(window, "pointerup", this.handlePointerUp), addPointerEvent(window, "pointercancel", this.handlePointerUp));
    }
    PanSession.prototype.updateHandlers = function (handlers) {
        this.handlers = handlers;
    };
    PanSession.prototype.end = function () {
        this.removeListeners && this.removeListeners();
        framesync__WEBPACK_IMPORTED_MODULE_1__["cancelSync"].update(this.updatePoint);
    };
    return PanSession;
}());
function transformPoint(info, transformPagePoint) {
    return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a, b) {
    return { x: a.x - b.x, y: a.y - b.y };
}
function getPanInfo(_a, history) {
    var point = _a.point;
    return {
        point: point,
        delta: subtractPoint(point, lastDevicePoint(history)),
        offset: subtractPoint(point, startDevicePoint(history)),
        velocity: getVelocity$1(history, 0.1),
    };
}
function startDevicePoint(history) {
    return history[0];
}
function lastDevicePoint(history) {
    return history[history.length - 1];
}
function getVelocity$1(history, timeDelta) {
    if (history.length < 2) {
        return { x: 0, y: 0 };
    }
    var i = history.length - 1;
    var timestampedPoint = null;
    var lastPoint = lastDevicePoint(history);
    while (i >= 0) {
        timestampedPoint = history[i];
        if (lastPoint.timestamp - timestampedPoint.timestamp >
            secondsToMilliseconds(timeDelta)) {
            break;
        }
        i--;
    }
    if (!timestampedPoint) {
        return { x: 0, y: 0 };
    }
    var time = (lastPoint.timestamp - timestampedPoint.timestamp) / 1000;
    if (time === 0) {
        return { x: 0, y: 0 };
    }
    var currentVelocity = {
        x: (lastPoint.x - timestampedPoint.x) / time,
        y: (lastPoint.y - timestampedPoint.y) / time,
    };
    if (currentVelocity.x === Infinity) {
        currentVelocity.x = 0;
    }
    if (currentVelocity.y === Infinity) {
        currentVelocity.y = 0;
    }
    return currentVelocity;
}

/**
 *
 * @param handlers -
 * @param ref -
 *
 * @internalremarks
 * Currently this sets new pan gesture functions every render. The memo route has been explored
 * in the past but ultimately we're still creating new functions every render. An optimisation
 * to explore is creating the pan gestures and loading them into a `ref`.
 *
 * @internal
 */
function usePanGesture(_a, ref) {
    var onPan = _a.onPan, onPanStart = _a.onPanStart, onPanEnd = _a.onPanEnd, onPanSessionStart = _a.onPanSessionStart;
    var hasPanEvents = onPan || onPanStart || onPanEnd || onPanSessionStart;
    var panSession = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(null);
    var transformPagePoint = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(MotionConfigContext).transformPagePoint;
    var handlers = {
        onSessionStart: onPanSessionStart,
        onStart: onPanStart,
        onMove: onPan,
        onEnd: function (event, info) {
            panSession.current = null;
            onPanEnd && onPanEnd(event, info);
        },
    };
    Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
        if (panSession.current !== null) {
            panSession.current.updateHandlers(handlers);
        }
    });
    function onPointerDown(event) {
        panSession.current = new PanSession(event, handlers, {
            transformPagePoint: transformPagePoint,
        });
    }
    usePointerEvent(ref, "pointerdown", hasPanEvents && onPointerDown);
    useUnmountEffect(function () { return panSession.current && panSession.current.end(); });
}

/**
 * Recursively traverse up the tree to check whether the provided child node
 * is the parent or a descendant of it.
 *
 * @param parent - Element to find
 * @param child - Element to test against parent
 */
var isNodeOrChild = function (parent, child) {
    if (!child) {
        return false;
    }
    else if (parent === child) {
        return true;
    }
    else {
        return isNodeOrChild(parent, child.parentElement);
    }
};

function createLock(name) {
    var lock = null;
    return function () {
        var openLock = function () {
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
function getGlobalLock(drag) {
    var lock = false;
    if (drag === "y") {
        lock = globalVerticalLock();
    }
    else if (drag === "x") {
        lock = globalHorizontalLock();
    }
    else {
        var openHorizontal_1 = globalHorizontalLock();
        var openVertical_1 = globalVerticalLock();
        if (openHorizontal_1 && openVertical_1) {
            lock = function () {
                openHorizontal_1();
                openVertical_1();
            };
        }
        else {
            // Release the locks because we don't use them
            if (openHorizontal_1)
                openHorizontal_1();
            if (openVertical_1)
                openVertical_1();
        }
    }
    return lock;
}

var easingLookup = {
    linear: popmotion__WEBPACK_IMPORTED_MODULE_2__["linear"],
    easeIn: popmotion__WEBPACK_IMPORTED_MODULE_2__["easeIn"],
    easeInOut: popmotion__WEBPACK_IMPORTED_MODULE_2__["easeInOut"],
    easeOut: popmotion__WEBPACK_IMPORTED_MODULE_2__["easeOut"],
    circIn: popmotion__WEBPACK_IMPORTED_MODULE_2__["circIn"],
    circInOut: popmotion__WEBPACK_IMPORTED_MODULE_2__["circInOut"],
    circOut: popmotion__WEBPACK_IMPORTED_MODULE_2__["circOut"],
    backIn: popmotion__WEBPACK_IMPORTED_MODULE_2__["backIn"],
    backInOut: popmotion__WEBPACK_IMPORTED_MODULE_2__["backInOut"],
    backOut: popmotion__WEBPACK_IMPORTED_MODULE_2__["backOut"],
    anticipate: popmotion__WEBPACK_IMPORTED_MODULE_2__["anticipate"],
    bounceIn: popmotion__WEBPACK_IMPORTED_MODULE_2__["bounceIn"],
    bounceInOut: popmotion__WEBPACK_IMPORTED_MODULE_2__["bounceInOut"],
    bounceOut: popmotion__WEBPACK_IMPORTED_MODULE_2__["bounceOut"],
};
var easingDefinitionToFunction = function (definition) {
    if (Array.isArray(definition)) {
        // If cubic bezier definition, create bezier curve
        Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__["invariant"])(definition.length === 4, "Cubic bezier arrays must contain four numerical values.");
        var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(definition, 4), x1 = _a[0], y1 = _a[1], x2 = _a[2], y2 = _a[3];
        return Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["cubicBezier"])(x1, y1, x2, y2);
    }
    else if (typeof definition === "string") {
        // Else lookup from table
        Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__["invariant"])(easingLookup[definition] !== undefined, "Invalid easing type '" + definition + "'");
        return easingLookup[definition];
    }
    return definition;
};
var isEasingArray = function (ease) {
    return Array.isArray(ease) && typeof ease[0] !== "number";
};

/**
 * Check if a value is animatable. Examples:
 *
 * ✅: 100, "100px", "#fff"
 * ❌: "block", "url(2.jpg)"
 * @param value
 *
 * @internal
 */
var isAnimatable = function (key, value) {
    // If the list of keys tat might be non-animatable grows, replace with Set
    if (key === "zIndex")
        return false;
    // If it's a number or a keyframes array, we can animate it. We might at some point
    // need to do a deep isAnimatable check of keyframes, or let Popmotion handle this,
    // but for now lets leave it like this for performance reasons
    if (typeof value === "number" || Array.isArray(value))
        return true;
    if (typeof value === "string" && // It's animatable if we have a string
        style_value_types__WEBPACK_IMPORTED_MODULE_4__["complex"].test(value) && // And it contains numbers and/or colors
        !value.startsWith("url(") // Unless it starts with "url("
    ) {
        return true;
    }
    return false;
};

var underDampedSpring = function () { return ({
    type: "spring",
    stiffness: 500,
    damping: 25,
    restDelta: 0.5,
    restSpeed: 10,
}); };
var overDampedSpring = function (to) { return ({
    type: "spring",
    stiffness: 550,
    damping: to === 0 ? 100 : 30,
    restDelta: 0.01,
    restSpeed: 10,
}); };
var linearTween = function () { return ({
    type: "keyframes",
    ease: "linear",
    duration: 0.3,
}); };
var keyframes = function (values) { return ({
    type: "keyframes",
    duration: 0.8,
    values: values,
}); };
var defaultTransitions = {
    x: underDampedSpring,
    y: underDampedSpring,
    z: underDampedSpring,
    rotate: underDampedSpring,
    rotateX: underDampedSpring,
    rotateY: underDampedSpring,
    rotateZ: underDampedSpring,
    scaleX: overDampedSpring,
    scaleY: overDampedSpring,
    scale: overDampedSpring,
    opacity: linearTween,
    backgroundColor: linearTween,
    color: linearTween,
    default: overDampedSpring,
};
var getDefaultTransition = function (valueKey, to) {
    var transitionFactory;
    if (isKeyframesTarget(to)) {
        transitionFactory = keyframes;
    }
    else {
        transitionFactory =
            defaultTransitions[valueKey] || defaultTransitions.default;
    }
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ to: to }, transitionFactory(to));
};

/**
 * Decide whether a transition is defined on a given Transition.
 * This filters out orchestration options and returns true
 * if any options are left.
 */
function isTransitionDefined(_a) {
    var when = _a.when, delay = _a.delay, delayChildren = _a.delayChildren, staggerChildren = _a.staggerChildren, staggerDirection = _a.staggerDirection, repeat = _a.repeat, repeatType = _a.repeatType, repeatDelay = _a.repeatDelay, from = _a.from, transition = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["when", "delay", "delayChildren", "staggerChildren", "staggerDirection", "repeat", "repeatType", "repeatDelay", "from"]);
    return !!Object.keys(transition).length;
}
var legacyRepeatWarning = false;
/**
 * Convert Framer Motion's Transition type into Popmotion-compatible options.
 */
function convertTransitionToAnimationOptions(_a) {
    var ease = _a.ease, times = _a.times, yoyo = _a.yoyo, flip = _a.flip, loop = _a.loop, transition = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["ease", "times", "yoyo", "flip", "loop"]);
    var options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, transition);
    if (times)
        options["offset"] = times;
    /**
     * Convert any existing durations from seconds to milliseconds
     */
    if (transition.duration)
        options["duration"] = secondsToMilliseconds(transition.duration);
    if (transition.repeatDelay)
        options.repeatDelay = secondsToMilliseconds(transition.repeatDelay);
    /**
     * Map easing names to Popmotion's easing functions
     */
    if (ease) {
        options["ease"] = isEasingArray(ease)
            ? ease.map(easingDefinitionToFunction)
            : easingDefinitionToFunction(ease);
    }
    /**
     * Support legacy transition API
     */
    if (transition.type === "tween")
        options.type = "keyframes";
    /**
     * TODO: These options are officially removed from the API.
     */
    if (yoyo || loop || flip) {
        Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__["warning"])(!legacyRepeatWarning, "yoyo, loop and flip have been removed from the API. Replace with repeat and repeatType options.");
        legacyRepeatWarning = true;
        if (yoyo) {
            options.repeatType = "reverse";
        }
        else if (loop) {
            options.repeatType = "loop";
        }
        else if (flip) {
            options.repeatType = "mirror";
        }
        options.repeat = loop || yoyo || flip || transition.repeat;
    }
    /**
     * TODO: Popmotion 9 has the ability to automatically detect whether to use
     * a keyframes or spring animation, but does so by detecting velocity and other spring options.
     * It'd be good to introduce a similar thing here.
     */
    if (transition.type !== "spring")
        options.type = "keyframes";
    return options;
}
/**
 * Get the delay for a value by checking Transition with decreasing specificity.
 */
function getDelayFromTransition(transition, key) {
    var _a, _b, _c, _d, _e;
    return ((_e = (_d = (_b = (_a = transition[key]) === null || _a === void 0 ? void 0 : _a.delay) !== null && _b !== void 0 ? _b : (_c = transition["default"]) === null || _c === void 0 ? void 0 : _c.delay) !== null && _d !== void 0 ? _d : transition.delay) !== null && _e !== void 0 ? _e : 0);
}
function hydrateKeyframes(options) {
    if (Array.isArray(options.to) && options.to[0] === null) {
        options.to = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(options.to);
        options.to[0] = options.from;
    }
    return options;
}
function getPopmotionAnimationOptions(transition, options, key) {
    var _a;
    if (Array.isArray(options.to)) {
        (_a = transition.duration) !== null && _a !== void 0 ? _a : (transition.duration = 0.8);
    }
    hydrateKeyframes(options);
    /**
     * Get a default transition if none is determined to be defined.
     */
    if (!isTransitionDefined(transition)) {
        transition = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, transition), getDefaultTransition(key, options.to));
    }
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), convertTransitionToAnimationOptions(transition));
}
/**
 *
 */
function getAnimation(key, value, target, transition, onComplete) {
    var _a;
    var valueTransition = getValueTransition(transition, key);
    var origin = (_a = valueTransition.from) !== null && _a !== void 0 ? _a : value.get();
    var isTargetAnimatable = isAnimatable(key, target);
    /**
     * If we're trying to animate from "none", try and get an animatable version
     * of the target. This could be improved to work both ways.
     */
    if (origin === "none" && isTargetAnimatable && typeof target === "string") {
        origin = style_value_types__WEBPACK_IMPORTED_MODULE_4__["complex"].getAnimatableNone(target);
    }
    var isOriginAnimatable = isAnimatable(key, origin);
    Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__["warning"])(isOriginAnimatable === isTargetAnimatable, "You are trying to animate " + key + " from \"" + origin + "\" to \"" + target + "\". " + origin + " is not an animatable value - to enable this animation set " + origin + " to a value animatable to " + target + " via the `style` property.");
    function start() {
        var options = {
            from: origin,
            to: target,
            velocity: value.getVelocity(),
            onComplete: onComplete,
            onUpdate: function (v) { return value.set(v); },
        };
        return valueTransition.type === "inertia" ||
            valueTransition.type === "decay"
            ? Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["inertia"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), valueTransition))
            : Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["animate"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, getPopmotionAnimationOptions(valueTransition, options, key)), { onUpdate: function (v) {
                    var _a;
                    options.onUpdate(v);
                    (_a = valueTransition.onUpdate) === null || _a === void 0 ? void 0 : _a.call(valueTransition, v);
                }, onComplete: function () {
                    var _a;
                    options.onComplete();
                    (_a = valueTransition.onComplete) === null || _a === void 0 ? void 0 : _a.call(valueTransition);
                } }));
    }
    function set() {
        var _a;
        value.set(target);
        onComplete();
        (_a = valueTransition === null || valueTransition === void 0 ? void 0 : valueTransition.onComplete) === null || _a === void 0 ? void 0 : _a.call(valueTransition);
        return { stop: function () { } };
    }
    return !isOriginAnimatable ||
        !isTargetAnimatable ||
        valueTransition.type === false
        ? set
        : start;
}
function getValueTransition(transition, key) {
    return transition[key] || transition["default"] || transition;
}
/**
 * Start animation on a MotionValue. This function is an interface between
 * Framer Motion and Popmotion
 *
 * @internal
 */
function startAnimation(key, value, target, transition) {
    if (transition === void 0) { transition = {}; }
    return value.start(function (onComplete) {
        var delayTimer;
        var controls;
        var animation = getAnimation(key, value, target, transition, onComplete);
        var delay = getDelayFromTransition(transition, key);
        var start = function () { return (controls = animation()); };
        if (delay) {
            delayTimer = setTimeout(start, secondsToMilliseconds(delay));
        }
        else {
            start();
        }
        return function () {
            clearTimeout(delayTimer);
            controls === null || controls === void 0 ? void 0 : controls.stop();
        };
    });
}

/**
 * @internal
 */
function animateVisualElement(visualElement, definition, options) {
    visualElement.onAnimationStart();
    var animation;
    if (Array.isArray(definition)) {
        var animations = definition.map(function (variant) {
            return animateVariant(visualElement, variant, options);
        });
        animation = Promise.all(animations);
    }
    else if (typeof definition === "string") {
        animation = animateVariant(visualElement, definition, options);
    }
    else {
        // TODO: Remove any and handle TargetResolver
        animation = animateTarget(visualElement, definition, options);
    }
    return animation.then(function () { return visualElement.onAnimationComplete(); });
}
function animateVariant(visualElement, variant, options) {
    var _a;
    if (options === void 0) { options = {}; }
    var resolved = resolveVariant(visualElement, variant, options.custom);
    var _b = (resolved || {}).transition, transition = _b === void 0 ? visualElement.getDefaultTransition() || {} : _b;
    if (options.transitionOverride) {
        transition = options.transitionOverride;
    }
    /**
     * If we have a variant, create a callback that runs it as an animation.
     * Otherwise, we resolve a Promise immediately for a composable no-op.
     */
    var getAnimation = resolved
        ? function () { return animateTarget(visualElement, resolved, options); }
        : function () { return Promise.resolve(); };
    /**
     * If we have children, create a callback that runs all their animations.
     * Otherwise, we resolve a Promise immediately for a composable no-op.
     */
    var getChildAnimations = ((_a = visualElement.variantChildrenOrder) === null || _a === void 0 ? void 0 : _a.size) ? function (forwardDelay) {
        if (forwardDelay === void 0) { forwardDelay = 0; }
        var _a = transition.delayChildren, delayChildren = _a === void 0 ? 0 : _a, staggerChildren = transition.staggerChildren, staggerDirection = transition.staggerDirection;
        return animateChildren(visualElement, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
    }
        : function () { return Promise.resolve(); };
    /**
     * If the transition explicitly defines a "when" option, we need to resolve either
     * this animation or all children animations before playing the other.
     */
    var when = transition.when;
    if (when) {
        var _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(when === "beforeChildren"
            ? [getAnimation, getChildAnimations]
            : [getChildAnimations, getAnimation], 2), first = _c[0], last = _c[1];
        return first().then(last);
    }
    else {
        return Promise.all([getAnimation(), getChildAnimations(options.delay)]);
    }
}
/**
 * @internal
 */
function animateTarget(visualElement, definition, _a) {
    var _b;
    var _c = _a === void 0 ? {} : _a, _d = _c.delay, delay = _d === void 0 ? 0 : _d, transitionOverride = _c.transitionOverride, type = _c.type;
    var _e = visualElement.makeTargetAnimatable(definition), _f = _e.transition, transition = _f === void 0 ? visualElement.getDefaultTransition() : _f, transitionEnd = _e.transitionEnd, target = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_e, ["transition", "transitionEnd"]);
    if (transitionOverride)
        transition = transitionOverride;
    var animations = [];
    var protectedValues = type && ((_b = visualElement.animationState) === null || _b === void 0 ? void 0 : _b.getProtectedKeys(type));
    for (var key in target) {
        var value = visualElement.getValue(key);
        var valueTarget = target[key];
        if (!value ||
            valueTarget === undefined ||
            (protectedValues === null || protectedValues === void 0 ? void 0 : protectedValues[key]) !== undefined) {
            continue;
        }
        var animation = startAnimation(key, value, valueTarget, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ delay: delay }, transition));
        animations.push(animation);
    }
    return Promise.all(animations).then(function () {
        transitionEnd && setTarget(visualElement, transitionEnd);
    });
}
function animateChildren(visualElement, variant, delayChildren, staggerChildren, staggerDirection, options) {
    if (delayChildren === void 0) { delayChildren = 0; }
    if (staggerChildren === void 0) { staggerChildren = 0; }
    if (staggerDirection === void 0) { staggerDirection = 1; }
    var animations = [];
    var maxStaggerDuration = (visualElement.variantChildrenOrder.size - 1) * staggerChildren;
    var generateStaggerDuration = staggerDirection === 1
        ? function (i) {
            if (i === void 0) { i = 0; }
            return i * staggerChildren;
        }
        : function (i) {
            if (i === void 0) { i = 0; }
            return maxStaggerDuration - i * staggerChildren;
        };
    Array.from(visualElement.variantChildrenOrder).forEach(function (child, i) {
        var animation = animateVariant(child, variant, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), { delay: delayChildren + generateStaggerDuration(i) }));
        animations.push(animation);
    });
    return Promise.all(animations);
}
function stopAnimation(visualElement) {
    visualElement.forEachValue(function (value) { return value.stop(); });
}

/**
 * Control animations on one or more components.
 *
 * @public
 */
var AnimationControls = /** @class */ (function () {
    function AnimationControls() {
        /**
         * Track whether the host component has mounted.
         *
         * @internal
         */
        this.hasMounted = false;
        /**
         * Pending animations that are started before a component is mounted.
         *
         * @internal
         */
        this.pendingAnimations = [];
        /**
         * A collection of linked component animation controls.
         *
         * @internal
         */
        this.subscribers = new Set();
    }
    /**
     * Subscribes a component's animation controls to this.
     *
     * @param controls - The controls to subscribe
     * @returns An unsubscribe function.
     *
     * @internal
     */
    AnimationControls.prototype.subscribe = function (visualElement) {
        var _this = this;
        this.subscribers.add(visualElement);
        return function () { return _this.subscribers.delete(visualElement); };
    };
    /**
     * Starts an animation on all linked components.
     *
     * @remarks
     *
     * ```jsx
     * controls.start("variantLabel")
     * controls.start({
     *   x: 0,
     *   transition: { duration: 1 }
     * })
     * ```
     *
     * @param definition - Properties or variant label to animate to
     * @param transition - Optional `transtion` to apply to a variant
     * @returns - A `Promise` that resolves when all animations have completed.
     *
     * @public
     */
    AnimationControls.prototype.start = function (definition, transitionOverride) {
        var _this = this;
        if (this.hasMounted) {
            var animations_1 = [];
            this.subscribers.forEach(function (visualElement) {
                animations_1.push(animateVisualElement(visualElement, definition, {
                    transitionOverride: transitionOverride,
                }));
            });
            return Promise.all(animations_1);
        }
        else {
            return new Promise(function (resolve) {
                _this.pendingAnimations.push({
                    animation: [definition, transitionOverride],
                    resolve: resolve,
                });
            });
        }
    };
    /**
     * Instantly set to a set of properties or a variant.
     *
     * ```jsx
     * // With properties
     * controls.set({ opacity: 0 })
     *
     * // With variants
     * controls.set("hidden")
     * ```
     *
     * @internalremarks
     * We could perform a similar trick to `.start` where this can be called before mount
     * and we maintain a list of of pending actions that get applied on mount. But the
     * expectation of `set` is that it happens synchronously and this would be difficult
     * to do before any children have even attached themselves. It's also poor practise
     * and we should discourage render-synchronous `.start` calls rather than lean into this.
     *
     * @public
     */
    AnimationControls.prototype.set = function (definition) {
        Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__["invariant"])(this.hasMounted, "controls.set() should only be called after a component has mounted. Consider calling within a useEffect hook.");
        return this.subscribers.forEach(function (visualElement) {
            setValues(visualElement, definition);
        });
    };
    /**
     * Stops animations on all linked components.
     *
     * ```jsx
     * controls.stop()
     * ```
     *
     * @public
     */
    AnimationControls.prototype.stop = function () {
        this.subscribers.forEach(function (visualElement) {
            stopAnimation(visualElement);
        });
    };
    /**
     * Initialises the animation controls.
     *
     * @internal
     */
    AnimationControls.prototype.mount = function () {
        var _this = this;
        this.hasMounted = true;
        this.pendingAnimations.forEach(function (_a) {
            var animation = _a.animation, resolve = _a.resolve;
            _this.start.apply(_this, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(animation)).then(resolve);
        });
    };
    /**
     * Stops all child animations when the host component unmounts.
     *
     * @internal
     */
    AnimationControls.prototype.unmount = function () {
        this.hasMounted = false;
        this.stop();
    };
    return AnimationControls;
}());
/**
 * @internal
 */
var animationControls = function () { return new AnimationControls(); };

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

var AnimationType;
(function (AnimationType) {
    AnimationType["Animate"] = "animate";
    AnimationType["Hover"] = "whileHover";
    AnimationType["Tap"] = "whileTap";
    AnimationType["Drag"] = "whileDrag";
    AnimationType["Focus"] = "whileFocus";
    AnimationType["Exit"] = "exit";
})(AnimationType || (AnimationType = {}));
var variantPriorityOrder = [
    AnimationType.Animate,
    AnimationType.Hover,
    AnimationType.Tap,
    AnimationType.Drag,
    AnimationType.Focus,
    AnimationType.Exit,
];
var reversePriorityOrder = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(variantPriorityOrder).reverse();
var numAnimationTypes = variantPriorityOrder.length;
function animateList(visualElement) {
    return function (animations) {
        return Promise.all(animations.map(function (_a) {
            var animation = _a.animation, options = _a.options;
            return animateVisualElement(visualElement, animation, options);
        }));
    };
}
function createAnimationState(visualElement) {
    var animate = animateList(visualElement);
    var state = createState();
    var isInitialRender = true;
    /**
     * This function will be used to reduce the animation definitions for
     * each active animation type into an object of resolved values for it.
     */
    var buildResolvedTypeValues = function (acc, definition) {
        var resolved = resolveVariant(visualElement, definition);
        if (resolved) {
            var transition = resolved.transition, transitionEnd = resolved.transitionEnd, target = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(resolved, ["transition", "transitionEnd"]);
            acc = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, acc), target), transitionEnd);
        }
        return acc;
    };
    function getProtectedKeys(type) {
        return state[type].protectedKeys;
    }
    /**
     * This just allows us to inject mocked animation functions
     * @internal
     */
    function setAnimateFunction(makeAnimator) {
        animate = makeAnimator(visualElement);
    }
    var currentProps;
    var currentContext;
    /**
     * When we receive new props, we need to:
     * 1. Create a list of protected keys for each type. This is a directory of
     *    value keys that are currently being "handled" by types of a higher priority
     *    so that whenever an animation is played of a given type, these values are
     *    protected from being animated.
     * 2. Determine if an animation type needs animating.
     * 3. Determine if any values have been removed from a type and figure out
     *    what to animate those to.
     */
    function setProps(props, context, options, changedActiveType) {
        if (context === void 0) { context = {}; }
        /**
         * Keep track of the most recent props and contexts. setActive can pass these
         * straight through rather than requiring external callers to have access to these.
         */
        currentProps = props;
        currentContext = context;
        /**
         * A list of animations that we'll build into as we iterate through the animation
         * types. This will get executed at the end of the function.
         */
        var animations = [];
        /**
         * Keep track of which values have been removed. Then, as we hit lower priority
         * animation types, we can check if they contain removed values and animate to that.
         */
        var removedKeys = new Set();
        /**
         * A dictionary of all encountered keys. This is an object to let us build into and
         * copy it without iteration. Each time we hit an animation type we set its protected
         * keys - the keys its not allowed to animate - to the latest version of this object.
         */
        var encounteredKeys = {};
        // TODO Reconcile with other update config
        if (props.variants) {
            visualElement.updateConfig(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, visualElement.config), { variants: props.variants }));
        }
        /**
         * If a variant has been removed at a given index, and this component is controlling
         * variant animations, we want to ensure lower-priority variants are forced to animate.
         */
        var removedVariantIndex = Infinity;
        var _loop_1 = function (i) {
            var type = reversePriorityOrder[i];
            var typeState = state[type];
            var prop = (_a = props[type]) !== null && _a !== void 0 ? _a : context[type];
            var propIsVariant = isVariantLabel(prop);
            /**
             * If this type has *just* changed isActive status, set activeDelta
             * to that status. Otherwise set to null.
             */
            var activeDelta = type === changedActiveType ? typeState.isActive : null;
            if (activeDelta === false)
                removedVariantIndex = i;
            /**
             * If this prop is an inherited variant, rather than been set directly on the
             * component itself, we want to make sure we allow the parent to trigger animations.
             */
            var isInherited = prop === context[type] && propIsVariant;
            /**
             *
             */
            if (isInherited &&
                isInitialRender &&
                visualElement.manuallyAnimateOnMount) {
                isInherited = false;
            }
            /**
             * Resume from previous snapshot if it's the first render
             */
            if (isInitialRender &&
                type === AnimationType.Animate &&
                visualElement.prevSnapshot) {
                isInitialRender = false;
                typeState.prevResolvedValues = visualElement.prevSnapshot;
            }
            /**
             * Set all encountered keys so far as the protected keys for this type. This will
             * be any key that has been animated or otherwise handled by active, higher-priortiy types.
             */
            typeState.protectedKeys = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, encounteredKeys);
            // Check if we can skip analysing this prop early
            if (
            // If it isn't active and hasn't *just* been set as inactive
            (!typeState.isActive && activeDelta === null) ||
                // If we didn't and don't have any defined prop for this animation type
                (!prop && !typeState.prevProp) ||
                // Or if the prop doesn't define an animation
                prop instanceof AnimationControls ||
                typeof prop === "boolean") {
                return "continue";
            }
            /**
             * As we go look through the values defined on this type, if we detect
             * a changed value or a value that was removed in a higher priority, we set
             * this to true and add this prop to the animation list.
             */
            var shouldAnimateType = variantsHaveChanged(typeState.prevProp, prop) ||
                // If we're making this variant active, we want to always make it active
                (type === changedActiveType &&
                    typeState.isActive &&
                    !isInherited &&
                    propIsVariant) ||
                // If we removed a higher-priority variant (i is in reverse order)
                (i > removedVariantIndex && propIsVariant);
            /**
             * As animations can be set as variant lists, variants or target objects, we
             * coerce everything to an array if it isn't one already
             */
            var definitionList = Array.isArray(prop) ? prop : [prop];
            /**
             * Build an object of all the resolved values. We'll use this in the subsequent
             * setProps calls to determine whether a value has changed.
             */
            var resolvedValues = definitionList.reduce(buildResolvedTypeValues, {});
            if (activeDelta === false)
                resolvedValues = {};
            /**
             * Now we need to loop through all the keys in the prev prop and this prop,
             * and decide:
             * 1. If the value has changed, and needs animating
             * 2. If it has been removed, and needs adding to the removedKeys set
             * 3. If it has been removed in a higher priority type and needs animating
             * 4. If it hasn't been removed in a higher priority but hasn't changed, and
             *    needs adding to the type's protectedKeys list.
             */
            var _a = typeState.prevResolvedValues, prevResolvedValues = _a === void 0 ? {} : _a;
            var allKeys = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prevResolvedValues), resolvedValues);
            for (var key in allKeys) {
                var next = resolvedValues[key];
                var prev = prevResolvedValues[key];
                // If we've already handled this we can just skip ahead
                if (encounteredKeys.hasOwnProperty(key))
                    continue;
                if (next !== prev) {
                    if (next !== undefined) {
                        // If next is defined and doesn't equal prev, it needs animating
                        shouldAnimateType = true;
                        removedKeys.delete(key);
                    }
                    else {
                        // If it's undefined, it's been removed.
                        removedKeys.add(key);
                    }
                }
                else if (next !== undefined && removedKeys.has(key)) {
                    /**
                     * If next hasn't changed and it isn't undefined, we want to check if it's
                     * been removed by a higher priority
                     */
                    shouldAnimateType = true;
                    removedKeys.delete(key);
                }
                else {
                    typeState.protectedKeys[key] = true;
                }
            }
            /**
             * Update the typeState so next time setProps is called we can compare the
             * latest prop and resolvedValues to these.
             */
            typeState.prevProp = prop;
            typeState.prevResolvedValues = resolvedValues;
            /**
             *
             */
            if (typeState.isActive) {
                encounteredKeys = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, encounteredKeys), resolvedValues);
            }
            /**
             * If this is an inherited prop we want to hard-block animations
             * TODO: Test as this should probably still handle animations triggered
             * by removed values?
             */
            if (shouldAnimateType && !isInherited) {
                animations.push.apply(animations, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(definitionList.map(function (animation) { return ({
                    animation: animation,
                    options: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ type: type }, options),
                }); })));
            }
        };
        /**
         * Iterate through all animation types in reverse priority order. For each, we want to
         * detect which values it's handling and whether or not they've changed (and therefore
         * need to be animated). If any values have been removed, we want to detect those in
         * lower priority props and flag for animation.
         */
        for (var i = 0; i < numAnimationTypes; i++) {
            _loop_1(i);
        }
        /**
         * If there are some removed value that haven't been dealt with,
         * we need to create a new animation that falls back either to the value
         * defined in the style prop, or the last read value.
         */
        if (removedKeys.size) {
            var fallbackAnimation_1 = {};
            removedKeys.forEach(function (key) {
                var fallbackTarget = visualElement.getBaseValue(key, props);
                if (fallbackTarget !== undefined) {
                    fallbackAnimation_1[key] = fallbackTarget;
                }
            });
            animations.push({ animation: fallbackAnimation_1 });
        }
        var shouldAnimate = Boolean(animations.length);
        if (isInitialRender &&
            props.initial === false &&
            !visualElement.manuallyAnimateOnMount) {
            shouldAnimate = false;
        }
        isInitialRender = false;
        return shouldAnimate ? animate(animations) : Promise.resolve();
    }
    /**
     * Change whether a certain animation type is active.
     */
    function setActive(type, isActive, options) {
        var _a;
        // If the active state hasn't changed, we can safely do nothing here
        if (state[type].isActive === isActive)
            return Promise.resolve();
        // Propagate active change to children
        (_a = visualElement.variantChildrenOrder) === null || _a === void 0 ? void 0 : _a.forEach(function (child) { var _a; return (_a = child.animationState) === null || _a === void 0 ? void 0 : _a.setActive(type, isActive); });
        state[type].isActive = isActive;
        return setProps(currentProps, currentContext, options, type);
    }
    return { getProtectedKeys: getProtectedKeys, setProps: setProps, setActive: setActive, setAnimateFunction: setAnimateFunction };
}
function variantsHaveChanged(prev, next) {
    if (typeof next === "string") {
        return next !== prev;
    }
    else if (isVariantLabels(next)) {
        return !shallowCompare(next, prev);
    }
    return false;
}
function createTypeState(isActive) {
    if (isActive === void 0) { isActive = false; }
    return {
        isActive: isActive,
        protectedKeys: {},
        prevResolvedValues: {},
    };
}
function createState() {
    var _a;
    return _a = {},
        _a[AnimationType.Animate] = createTypeState(true),
        _a[AnimationType.Hover] = createTypeState(),
        _a[AnimationType.Tap] = createTypeState(),
        _a[AnimationType.Drag] = createTypeState(),
        _a[AnimationType.Focus] = createTypeState(),
        _a[AnimationType.Exit] = createTypeState(),
        _a;
}

/**
 * @param handlers -
 * @internal
 */
function useTapGesture(_a, visualElement) {
    var onTap = _a.onTap, onTapStart = _a.onTapStart, onTapCancel = _a.onTapCancel, whileTap = _a.whileTap;
    var hasPressListeners = onTap || onTapStart || onTapCancel || whileTap;
    var isPressing = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(false);
    var cancelPointerEventListener = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(null);
    function removePointerUp() {
        var _a;
        (_a = cancelPointerEventListener.current) === null || _a === void 0 ? void 0 : _a.call(cancelPointerEventListener);
        cancelPointerEventListener.current = null;
    }
    // We load this event handler into a ref so we can later refer to
    // onPointerUp.current which will always have reference to the latest props
    var onPointerUp = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(null);
    onPointerUp.current = function (event, info) {
        var _a;
        var element = visualElement.getInstance();
        removePointerUp();
        if (!isPressing.current || !element)
            return;
        isPressing.current = false;
        (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Tap, false);
        // Check the gesture lock - if we get it, it means no drag gesture is active
        // and we can safely fire the tap gesture.
        var openGestureLock = getGlobalLock(true);
        if (!openGestureLock)
            return;
        openGestureLock();
        if (!isNodeOrChild(element, event.target)) {
            onTapCancel === null || onTapCancel === void 0 ? void 0 : onTapCancel(event, info);
        }
        else {
            onTap === null || onTap === void 0 ? void 0 : onTap(event, info);
        }
    };
    function onPointerDown(event, info) {
        var _a;
        removePointerUp();
        cancelPointerEventListener.current = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["pipe"])(addPointerEvent(window, "pointerup", function (event, info) { var _a; return (_a = onPointerUp.current) === null || _a === void 0 ? void 0 : _a.call(onPointerUp, event, info); }), addPointerEvent(window, "pointercancel", function (event, info) { var _a; return (_a = onPointerUp.current) === null || _a === void 0 ? void 0 : _a.call(onPointerUp, event, info); }));
        var element = visualElement.getInstance();
        if (!element || isPressing.current)
            return;
        isPressing.current = true;
        onTapStart === null || onTapStart === void 0 ? void 0 : onTapStart(event, info);
        (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Tap, true);
    }
    usePointerEvent(visualElement, "pointerdown", hasPressListeners ? onPointerDown : undefined);
    useUnmountEffect(removePointerUp);
}

var filterTouch = function (listener) { return function (event, info) {
    if (isMouseEvent(event))
        listener(event, info);
}; };
/**
 *
 * @param props
 * @param ref
 * @internal
 */
function useHoverGesture(_a, visualElement) {
    var onHoverStart = _a.onHoverStart, onHoverEnd = _a.onHoverEnd, whileHover = _a.whileHover;
    var onPointerEnter = filterTouch(function (event, info) {
        var _a;
        onHoverStart === null || onHoverStart === void 0 ? void 0 : onHoverStart(event, info);
        (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Hover, true);
    });
    var onPointerLeave = filterTouch(function (event, info) {
        var _a;
        onHoverEnd === null || onHoverEnd === void 0 ? void 0 : onHoverEnd(event, info);
        (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Hover, false);
    });
    usePointerEvent(visualElement, "pointerenter", onHoverStart || whileHover ? onPointerEnter : undefined);
    usePointerEvent(visualElement, "pointerleave", onHoverEnd || whileHover ? onPointerLeave : undefined);
}

/**
 *
 * @param props
 * @param ref
 * @internal
 */
function useFocusGesture(_a, visualElement) {
    var whileFocus = _a.whileFocus;
    var onFocus = function () {
        var _a;
        (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Focus, true);
    };
    var onBlur = function () {
        var _a;
        (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Focus, false);
    };
    useDomEvent(visualElement, "focus", whileFocus ? onFocus : undefined);
    useDomEvent(visualElement, "blur", whileFocus ? onBlur : undefined);
}

/**
 * Add pan and tap gesture recognition to an element.
 *
 * @param props - Gesture event handlers
 * @param ref - React `ref` containing a DOM `Element`
 * @public
 */
function useGestures(props, visualElement) {
    usePanGesture(props, visualElement);
    useTapGesture(props, visualElement);
    useHoverGesture(props, visualElement);
    useFocusGesture(props, visualElement);
}

var makeRenderlessComponent = function (hook) { return function (props) {
    hook(props);
    return null;
}; };

var gestureProps = [
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
];
var GestureComponent = makeRenderlessComponent(function (_a) {
    var visualElement = _a.visualElement, props = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["visualElement"]);
    useGestures(props, visualElement);
});
/**
 * @public
 */
var Gestures = {
    key: "gestures",
    shouldRender: function (props) {
        return gestureProps.some(function (key) { return props.hasOwnProperty(key); });
    },
    getComponent: function () { return GestureComponent; },
};

/**
 * A list of all valid MotionProps.
 *
 * @internalremarks
 * This doesn't throw if a `MotionProp` name is missing - it should.
 */
var validMotionProps = new Set(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])([
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
    "onLayoutAnimationComplete",
    "onViewportBoxUpdate",
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
    "whileDrag"
], gestureProps));
/**
 * Check whether a prop name is a valid `MotionProp` key.
 *
 * @param key - Name of the property to check
 * @returns `true` is key is a valid `MotionProp`.
 *
 * @public
 */
function isValidMotionProp(key) {
    return validMotionProps.has(key);
}

var isPropValid = function (key) { return !isValidMotionProp(key); };
/**
 * Emotion and Styled Components both allow users to pass through arbitrary props to their components
 * to dynamically generate CSS. They both use the `@emotion/is-prop-valid` package to determine which
 * of these should be passed to the underlying DOM node.
 *
 * However, when styling a Motion component `styled(motion.div)`, both packages pass through *all* props
 * as it's seen as an arbitrary component rather than a DOM node. Motion only allows arbitrary props
 * passed through the `custom` prop so it doesn't *need* the payload or computational overhead of
 * `@emotion/is-prop-valid`, however to fix this problem we need to use it.
 *
 * By making it an optionalDependency we can offer this functionality only in the situations where it's
 * actually required.
 */
try {
    var emotionIsPropValid_1 = __webpack_require__(/*! @emotion/is-prop-valid */ "../../node_modules/@emotion/is-prop-valid/dist/is-prop-valid.esm.js").default;
    isPropValid = function (key) {
        // Handle events explicitly as Emotion validates them all as true
        if (key.startsWith("on")) {
            return !isValidMotionProp(key);
        }
        else {
            return emotionIsPropValid_1(key);
        }
    };
}
catch (_a) {
    // We don't need to actually do anything here - the fallback is the existing `isPropValid`.
}
function filterProps(props) {
    var domProps = {};
    for (var key in props) {
        if (isPropValid(key))
            domProps[key] = props[key];
    }
    return domProps;
}

function buildHTMLProps(visualElement, _a) {
    var drag = _a.drag;
    // The `any` isn't ideal but it is the type of createElement props argument
    var htmlProps = {};
    var style = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, visualElement.reactStyle), visualElement.style), visualElement.vars);
    if (!!drag) {
        // Disable the ghost element when a user drags
        htmlProps.draggable = false;
        // Disable text selection
        style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout =
            "none";
        // Disable scrolling on the draggable direction
        style.touchAction =
            drag === true ? "none" : "pan-" + (drag === "x" ? "y" : "x");
    }
    htmlProps.style = style;
    return htmlProps;
}

/**
 * Build React props for SVG elements
 */
function buildSVGProps(visualElement) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, visualElement.attrs), { style: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, visualElement.reactStyle) });
}

function useRender(Component, props, visualElement) {
    // Only filter props from components we control, ie `motion.div`. If this
    // is a custom component pass along everything provided to it.
    var forwardedProps = typeof Component === "string" ? filterProps(props) : props;
    /**
     * Every render, empty and rebuild the animated values to be applied to our Element.
     * During animation these data structures are used in a mutable fashion to reduce
     * garbage collection, but between renders we can flush them to remove values
     * that might have been taken out of the provided props.
     */
    visualElement.clean();
    visualElement.build();
    // Generate props to visually render this component
    var visualProps = isSVGComponent(Component)
        ? buildSVGProps(visualElement)
        : buildHTMLProps(visualElement, props);
    return Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(Component, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, forwardedProps), { ref: visualElement.ref }), visualProps));
}

function isForcedMotionValue(key, _a) {
    var layout = _a.layout, layoutId = _a.layoutId;
    return (isTransformProp(key) ||
        isTransformOriginProp(key) ||
        ((layout || layoutId !== undefined) && !!valueScaleCorrection[key]));
}
/**
 * Scrape props for MotionValues and add/remove them to this component's
 * VisualElement
 */
function useMotionValues(visualElement, props) {
    var prev = useConstant(empty);
    /**
     * Remove MotionValues that are no longer present
     */
    for (var key in prev) {
        var isForced = isForcedMotionValue(key, props);
        var existsAsProp = props[key] !== undefined;
        var existsAsStyle = props.style && props.style[key] !== undefined;
        var propIsMotionValue = existsAsProp && isMotionValue(props[key]);
        var styleIsMotionValue = existsAsStyle && isMotionValue(props.style[key]);
        var transformRemoved = isForced && !existsAsProp && !existsAsStyle;
        var motionValueRemoved = !isForced && !propIsMotionValue && !styleIsMotionValue;
        if (transformRemoved || motionValueRemoved) {
            visualElement.removeValue(key);
            delete prev[key];
        }
    }
    /**
     * Add incoming MotionValues
     */
    addMotionValues(visualElement, prev, props, false, props);
    if (props.style)
        addMotionValues(visualElement, prev, props.style, true, props);
    /**
     * Transform custom values if provided a handler, ie size -> width/height
     * Ideally we'd ditch this by removing support for size and other custom values from Framer.
     */
    if (props.transformValues) {
        visualElement.reactStyle = props.transformValues(visualElement.reactStyle);
    }
}
/**
 * Add incoming MotionValues
 *
 * TODO: Type the VisualElements properly
 */
function addMotionValues(visualElement, prev, source, isStyle, props) {
    if (isStyle === void 0) { isStyle = false; }
    if (isStyle)
        visualElement.reactStyle = {};
    for (var key in source) {
        var value = source[key];
        var foundMotionValue = false;
        if (isMotionValue(value)) {
            // If this is a MotionValue, add it if it isn't a reserved key
            if (!reservedNames.has(key)) {
                visualElement.addValue(key, value);
                foundMotionValue = true;
            }
        }
        else if (isForcedMotionValue(key, props)) {
            // If this is a transform prop, always create a MotionValue
            // to ensure we can reconcile them all together.
            if (!visualElement.hasValue(key)) {
                visualElement.addValue(key, motionValue(value));
            }
            else if (value !== prev[key]) {
                if (isMotionValue(prev[key])) {
                    /**
                     * If the previous value was a MotionValue, and this value isn't,
                     * we want to create a new MotionValue rather than update one that's been removed.
                     */
                    visualElement.addValue(key, motionValue(value));
                }
                else {
                    /**
                     * Otherwise, we just want to ensure the MotionValue is of the latest value.
                     */
                    var motion = visualElement.getValue(key);
                    motion.set(value);
                }
            }
            foundMotionValue = true;
        }
        else if (isStyle) {
            visualElement.reactStyle[key] = value;
        }
        if (foundMotionValue)
            prev[key] = value;
    }
}
/**
 * These are props we accept as MotionValues but don't want to add
 * to the VisualElement
 */
var reservedNames = new Set([]);
var empty = function () { return ({}); };

/**
 * Load features via renderless components based on the provided MotionProps
 */
function useFeatures(defaultFeatures, isStatic, visualElement, props) {
    var plugins = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(MotionConfigContext);
    // If this is a static component, or we're rendering on the server, we don't load
    // any feature components
    if (isStatic || typeof window === "undefined")
        return null;
    var allFeatures = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(defaultFeatures, plugins.features);
    var numFeatures = allFeatures.length;
    var features = [];
    // Decide which features we should render and add them to the returned array
    for (var i = 0; i < numFeatures; i++) {
        var _a = allFeatures[i], shouldRender = _a.shouldRender, key = _a.key, getComponent = _a.getComponent;
        if (shouldRender(props)) {
            var Component = getComponent(props);
            Component &&
                features.push(Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(Component, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ key: key }, props, { visualElement: visualElement })));
        }
    }
    return features;
}

var Presence;
(function (Presence) {
    Presence[Presence["Entering"] = 0] = "Entering";
    Presence[Presence["Present"] = 1] = "Present";
    Presence[Presence["Exiting"] = 2] = "Exiting";
})(Presence || (Presence = {}));
var VisibilityAction;
(function (VisibilityAction) {
    VisibilityAction[VisibilityAction["Hide"] = 0] = "Hide";
    VisibilityAction[VisibilityAction["Show"] = 1] = "Show";
})(VisibilityAction || (VisibilityAction = {}));

/**
 * Default handlers for batching VisualElements
 */
var defaultHandler = {
    measureLayout: function (child) { return child.measureLayout(); },
    layoutReady: function (child) { return child.layoutReady(); },
};
/**
 * Sort VisualElements by tree depth, so we process the highest elements first.
 */
var sortByDepth = function (a, b) {
    return a.depth - b.depth;
};
/**
 * Create a batcher to process VisualElements
 */
function createBatcher() {
    var queue = new Set();
    var add = function (child) { return queue.add(child); };
    var flush = function (_a) {
        var _b = _a === void 0 ? defaultHandler : _a, measureLayout = _b.measureLayout, layoutReady = _b.layoutReady, parent = _b.parent;
        var order = Array.from(queue).sort(sortByDepth);
        var resetAndMeasure = function () {
            /**
             * Write: Reset any transforms on children elements so we can read their actual layout
             */
            order.forEach(function (child) { return child.resetTransform(); });
            /**
             * Read: Measure the actual layout
             */
            order.forEach(measureLayout);
        };
        parent ? parent.withoutTransform(resetAndMeasure) : resetAndMeasure();
        /**
         * Write: Notify the VisualElements they're ready for further write operations.
         */
        order.forEach(layoutReady);
        /**
         * After all children have started animating, ensure any Entering components are set to Present.
         * If we add deferred animations (set up all animations and then start them in two loops) this
         * could be moved to the start loop. But it needs to happen after all the animations configs
         * are generated in AnimateSharedLayout as this relies on presence data
         */
        order.forEach(function (child) {
            if (child.isPresent)
                child.presence = Presence.Present;
        });
        queue.clear();
    };
    return { add: add, flush: flush };
}
function isSharedLayout(context) {
    return !!context.forceUpdate;
}
var SharedLayoutContext = Object(react__WEBPACK_IMPORTED_MODULE_5__["createContext"])(createBatcher());
/**
 * @internal
 */
var FramerTreeLayoutContext = Object(react__WEBPACK_IMPORTED_MODULE_5__["createContext"])(createBatcher());

var isBrowser$1 = typeof window !== "undefined";
var useIsomorphicLayoutEffect = isBrowser$1 ? react__WEBPACK_IMPORTED_MODULE_5__["useLayoutEffect"] : react__WEBPACK_IMPORTED_MODULE_5__["useEffect"];

function useSnapshotOnUnmount(visualElement) {
    var syncLayout = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(SharedLayoutContext);
    var framerSyncLayout = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(FramerTreeLayoutContext);
    useIsomorphicLayoutEffect(function () { return function () {
        if (isSharedLayout(syncLayout)) {
            syncLayout.remove(visualElement);
        }
        if (isSharedLayout(framerSyncLayout)) {
            framerSyncLayout.remove(visualElement);
        }
    }; }, []);
}

/**
 * When a component is the child of `AnimatePresence`, it can use `usePresence`
 * to access information about whether it's still present in the React tree.
 *
 * ```jsx
 * import { usePresence } from "framer-motion"
 *
 * export const Component = () => {
 *   const [isPresent, safeToRemove] = usePresence()
 *
 *   useEffect(() => {
 *     !isPresent && setTimeout(safeToRemove, 1000)
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * If `isPresent` is `false`, it means that a component has been removed the tree, but
 * `AnimatePresence` won't really remove it until `safeToRemove` has been called.
 *
 * @public
 */
function usePresence() {
    var context = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(PresenceContext);
    if (context === null)
        return [true, null];
    var isPresent = context.isPresent, onExitComplete = context.onExitComplete, register = context.register;
    // It's safe to call the following hooks conditionally (after an early return) because the context will always
    // either be null or non-null for the lifespan of the component.
    // Replace with useOpaqueId when released in React
    var id = useUniqueId();
    Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () { return register(id); }, []);
    var safeToRemove = function () { return onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete(id); };
    return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}
/**
 * Similar to `usePresence`, except `useIsPresent` simply returns whether or not the component is present.
 * There is no `safeToRemove` function.
 *
 * ```jsx
 * import { useIsPresent } from "framer-motion"
 *
 * export const Component = () => {
 *   const isPresent = useIsPresent()
 *
 *   useEffect(() => {
 *     !isPresent && console.log("I've been removed!")
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * @public
 */
function useIsPresent() {
    return isPresent(Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(PresenceContext));
}
function isPresent(context) {
    return context === null ? true : context.isPresent;
}
var counter = 0;
var incrementId = function () { return counter++; };
var useUniqueId = function () { return useConstant(incrementId); };

/**
 * Use callback either only on the initial render or on all renders. In concurrent mode
 * the "initial" render might run multiple times
 *
 * @param callback - Callback to run
 * @param isInitialOnly - Set to `true` to only run on initial render, or `false` for all renders. Defaults to `false`.
 *
 * @public
 */
function useInitialOrEveryRender(callback, isInitialOnly) {
    if (isInitialOnly === void 0) { isInitialOnly = false; }
    var isInitialRender = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(true);
    if (!isInitialOnly || (isInitialOnly && isInitialRender.current)) {
        callback();
    }
    isInitialRender.current = false;
}

function checkShouldInheritVariant(_a) {
    var animate = _a.animate, variants = _a.variants, inherit = _a.inherit;
    return inherit !== null && inherit !== void 0 ? inherit : (!!variants && !animate);
}

/**
 * This hook is resonsible for creating the variant-propagation tree
 * relationship between VisualElements.
 */
function useVariants(visualElement, props, isStatic) {
    var _a, _b, _c;
    var variantContext = useVariantContext();
    var presenceContext = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(PresenceContext);
    /**
     * We only add this VisualElement to the variant tree *if* we're:
     * 1. Being provided a variants prop
     * 2. Or being used to control variants (ie animate, whileHover etc)
     * 3. Or being passed AnimationControls, which we have to assume may control variants.
     * Otherwise this component should be "invisible" to variant propagation.
     */
    var shouldInheritVariants = checkShouldInheritVariant(props);
    var contextDependencies = [];
    var context = {};
    var isControllingVariants = false;
    if (checkIfControllingVariants(props)) {
        isControllingVariants = true;
        variantContext = {};
    }
    var isVariantNode = isControllingVariants || props.variants;
    /**
     * Loop through each animation prop. Create context dependencies.
     */
    for (var i = 0; i < numVariantProps; i++) {
        var name_1 = variantProps[i];
        var prop = props[name_1];
        var contextProp = variantContext[name_1];
        if (isVariantLabel$1(prop) || prop === false) {
            context[name_1] = prop;
            contextDependencies.push(prop);
        }
        else {
            if (isVariantLabel$1(contextProp) || contextProp === false) {
                context[name_1] = contextProp;
            }
            contextDependencies.push(null);
        }
        contextDependencies.push(isVariantLabel$1(contextProp) ? contextProp : null);
    }
    var animate = (_a = props.animate) !== null && _a !== void 0 ? _a : context.animate;
    var initial = props.initial;
    if (initial === undefined &&
        (isVariantLabel$1(animate) || context.initial !== false)) {
        initial = context.initial;
    }
    if ((presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.initial) === false) {
        initial = context.initial = false;
    }
    context.parent = isVariantNode ? visualElement : variantContext.parent;
    useInitialOrEveryRender(function () {
        var initialToSet = initial === false ? animate : initial;
        if (initialToSet &&
            typeof initialToSet !== "boolean" &&
            !isAnimationControls(initialToSet)) {
            setValues(visualElement, initialToSet);
        }
    }, !isStatic);
    /**
     * We want to update the "base" (or fallback) value on the initial render.
     */
    useInitialOrEveryRender(function () {
        visualElement.forEachValue(function (value, key) {
            visualElement.baseTarget[key] = value.get();
        });
    }, true);
    var nextContext = Object(react__WEBPACK_IMPORTED_MODULE_5__["useMemo"])(function () { return context; }, contextDependencies);
    /**
     * Subscribe to the parent visualElement if this is a participant in the variant tree
     */
    var remove;
    if (isVariantNode && shouldInheritVariants && !isControllingVariants) {
        remove = (_b = variantContext.parent) === null || _b === void 0 ? void 0 : _b.addVariantChild(visualElement);
        visualElement.inheritsVariants = true;
    }
    /**
     *
     */
    if (!isControllingVariants &&
        shouldInheritVariants && ((_c = visualElement.parent) === null || _c === void 0 ? void 0 : _c.isMounted) &&
        initial !== false &&
        animate) {
        visualElement.manuallyAnimateOnMount = true;
    }
    Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
        visualElement.isMounted = true;
        return function () {
            visualElement.isMounted = false;
            remove === null || remove === void 0 ? void 0 : remove();
        };
    }, []);
    /**
     * What we want here is to clear the order of variant children in useLayoutEffect
     * then children can re-add themselves in useEffect. This should add them in the intended order
     * for staggerChildren to work correctly.
     */
    useIsomorphicLayoutEffect(function () {
        var _a;
        isPresent(presenceContext) && ((_a = visualElement.variantChildrenOrder) === null || _a === void 0 ? void 0 : _a.clear());
    });
    Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
        var _a;
        isVariantNode && ((_a = variantContext.parent) === null || _a === void 0 ? void 0 : _a.addVariantChildOrder(visualElement));
    });
    return nextContext;
}
var variantProps = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(["initial"], variantPriorityOrder);
var numVariantProps = variantProps.length;
function isVariantLabel$1(v) {
    return typeof v === "string" || Array.isArray(v);
}
function isAnimationControls(v) {
    return typeof v === "object" && typeof v.start === "function";
}
function checkIfControllingVariants(props) {
    var _a;
    return (typeof ((_a = props.animate) === null || _a === void 0 ? void 0 : _a.start) === "function" ||
        isVariantLabel$1(props.animate) ||
        isVariantLabel$1(props.whileHover) ||
        isVariantLabel$1(props.whileDrag) ||
        isVariantLabel$1(props.whileTap) ||
        isVariantLabel$1(props.whileFocus) ||
        isVariantLabel$1(props.exit));
}

/**
 * Create a `motion` component.
 *
 * This function accepts a Component argument, which can be either a string (ie "div"
 * for `motion.div`), or an actual React component.
 *
 * Alongside this is a config option which provides a way of rendering the provided
 * component "offline", or outside the React render cycle.
 *
 * @internal
 */
function createMotionComponent(Component, _a) {
    var defaultFeatures = _a.defaultFeatures, useVisualElement = _a.useVisualElement, useRender = _a.useRender;
    function MotionComponent(props, externalRef) {
        /**
         * If a component is static, we only visually update it as a
         * result of a React re-render, rather than any interactions or animations.
         * If this component or any ancestor is static, we disable hardware acceleration
         * and don't load any additional functionality.
         */
        var isStatic = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(MotionConfigContext).isStatic;
        /**
         * Create a VisualElement for this component. A VisualElement provides a common
         * interface to renderer-specific APIs (ie DOM/Three.js etc) as well as
         * providing a way of rendering to these APIs outside of the React render loop
         * for more performant animations and interactions
         */
        var visualElement = useVisualElement(Component, props, isStatic, externalRef);
        /**
         * Scrape MotionValues from props and add/remove them to/from the VisualElement.
         */
        useMotionValues(visualElement, props);
        /**
         * Add the visualElement as a node in the variant tree.
         */
        var variantContext = useVariants(visualElement, props, isStatic);
        /**
         * Load features as renderless components unless the component isStatic
         */
        var features = useFeatures(defaultFeatures, isStatic, visualElement, props);
        /**
         * Only create a new context value when the sub-contexts change.
         */
        var context = Object(react__WEBPACK_IMPORTED_MODULE_5__["useMemo"])(function () { return ({ visualElement: visualElement, variantContext: variantContext }); }, [
            visualElement,
            variantContext,
        ]);
        var component = useRender(Component, props, visualElement);
        /**
         * If this component is a child of AnimateSharedLayout, we need to snapshot the component
         * before it's unmounted. This lives here rather than in features/layout/Measure because
         * as a child component its unmount effect runs after this component has been unmounted.
         */
        useSnapshotOnUnmount(visualElement);
        // The mount order and hierarchy is specific to ensure our element ref is hydrated by the time
        // all plugins and features has to execute.
        return (Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(react__WEBPACK_IMPORTED_MODULE_5__["Fragment"], null,
            Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(MotionContext.Provider, { value: context }, component),
            features));
    }
    return Object(react__WEBPACK_IMPORTED_MODULE_5__["forwardRef"])(MotionComponent);
}

/**
 * Apply constraints to a point. These constraints are both physical along an
 * axis, and an elastic factor that determines how much to constrain the point
 * by if it does lie outside the defined parameters.
 */
function applyConstraints(point, _a, elastic) {
    var min = _a.min, max = _a.max;
    if (min !== undefined && point < min) {
        // If we have a min point defined, and this is outside of that, constrain
        point = elastic ? Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["mix"])(min, point, elastic) : Math.max(point, min);
    }
    else if (max !== undefined && point > max) {
        // If we have a max point defined, and this is outside of that, constrain
        point = elastic ? Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["mix"])(max, point, elastic) : Math.min(point, max);
    }
    return point;
}
/**
 * Calculates a min projection point based on a pointer, pointer progress
 * within the drag target, and constraints.
 *
 * For instance if an element was 100px width, we were dragging from 0.25
 * along this axis, the pointer is at 200px, and there were no constraints,
 * we would calculate a min projection point of 175px.
 */
function calcConstrainedMinPoint(point, length, progress, constraints, elastic) {
    // Calculate a min point for this axis and apply it to the current pointer
    var min = point - length * progress;
    return constraints ? applyConstraints(min, constraints, elastic) : min;
}
/**
 * Calculate constraints in terms of the viewport when defined relatively to the
 * measured axis. This is measured from the nearest edge, so a max constraint of 200
 * on an axis with a max value of 300 would return a constraint of 500 - axis length
 */
function calcRelativeAxisConstraints(axis, min, max) {
    return {
        min: min !== undefined ? axis.min + min : undefined,
        max: max !== undefined
            ? axis.max + max - (axis.max - axis.min)
            : undefined,
    };
}
/**
 * Calculate constraints in terms of the viewport when
 * defined relatively to the measured bounding box.
 */
function calcRelativeConstraints(layoutBox, _a) {
    var top = _a.top, left = _a.left, bottom = _a.bottom, right = _a.right;
    return {
        x: calcRelativeAxisConstraints(layoutBox.x, left, right),
        y: calcRelativeAxisConstraints(layoutBox.y, top, bottom),
    };
}
/**
 * Calculate viewport constraints when defined as another viewport-relative axis
 */
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
    var _a;
    var min = constraintsAxis.min - layoutAxis.min;
    var max = constraintsAxis.max - layoutAxis.max;
    // If the constraints axis is actually smaller than the layout axis then we can
    // flip the constraints
    if (constraintsAxis.max - constraintsAxis.min <
        layoutAxis.max - layoutAxis.min) {
        _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])([max, min], 2), min = _a[0], max = _a[1];
    }
    return {
        min: layoutAxis.min + min,
        max: layoutAxis.min + max,
    };
}
/**
 * Calculate viewport constraints when defined as another viewport-relative box
 */
function calcViewportConstraints(layoutBox, constraintsBox) {
    return {
        x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
        y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y),
    };
}
/**
 * Calculate the an axis position based on two axes and a progress value.
 */
function calcPositionFromProgress(axis, constraints, progress) {
    var axisLength = axis.max - axis.min;
    var min = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["mix"])(constraints.min, constraints.max - axisLength, progress);
    return { min: min, max: min + axisLength };
}
/**
 * Rebase the calculated viewport constraints relative to the layout.min point.
 */
function rebaseAxisConstraints(layout, constraints) {
    var relativeConstraints = {};
    if (constraints.min !== undefined) {
        relativeConstraints.min = constraints.min - layout.min;
    }
    if (constraints.max !== undefined) {
        relativeConstraints.max = constraints.max - layout.min;
    }
    return relativeConstraints;
}

var elementDragControls = new WeakMap();
/**
 *
 */
var lastPointerEvent;
var VisualElementDragControls = /** @class */ (function () {
    function VisualElementDragControls(_a) {
        var visualElement = _a.visualElement;
        /**
         * Track whether we're currently dragging.
         *
         * @internal
         */
        this.isDragging = false;
        /**
         * The current direction of drag, or `null` if both.
         *
         * @internal
         */
        this.currentDirection = null;
        /**
         * The permitted boundaries of travel, in pixels.
         *
         * @internal
         */
        this.constraints = false;
        /**
         * A reference to the host component's latest props.
         *
         * @internal
         */
        this.props = {};
        /**
         * @internal
         */
        this.hasMutatedConstraints = false;
        /**
         * Track the initial position of the cursor relative to the dragging element
         * when dragging starts as a value of 0-1 on each axis. We then use this to calculate
         * an ideal bounding box for the VisualElement renderer to project into every frame.
         *
         * @internal
         */
        this.cursorProgress = {
            x: 0.5,
            y: 0.5,
        };
        // When updating _dragX, or _dragY instead of the VisualElement,
        // persist their values between drag gestures.
        this.originPoint = {};
        // This is a reference to the global drag gesture lock, ensuring only one component
        // can "capture" the drag of one or both axes.
        // TODO: Look into moving this into pansession?
        this.openGlobalLock = null;
        /**
         * @internal
         */
        this.panSession = null;
        this.visualElement = visualElement;
        this.visualElement.enableLayoutProjection();
        elementDragControls.set(visualElement, this);
    }
    /**
     * Instantiate a PanSession for the drag gesture
     *
     * @public
     */
    VisualElementDragControls.prototype.start = function (originEvent, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.snapToCursor, snapToCursor = _c === void 0 ? false : _c, cursorProgress = _b.cursorProgress;
        /**
         * If this drag session has been manually triggered by the user, it might be from an event
         * outside the draggable element. If snapToCursor is set to true, we need to measure the position
         * of the element and snap it to the cursor.
         */
        snapToCursor && this.snapToCursor(originEvent);
        var onSessionStart = function () {
            // Stop any animations on both axis values immediately. This allows the user to throw and catch
            // the component.
            _this.stopMotion();
        };
        var onStart = function (event, info) {
            var _a, _b, _c;
            // Attempt to grab the global drag gesture lock - maybe make this part of PanSession
            var _d = _this.props, drag = _d.drag, dragPropagation = _d.dragPropagation;
            if (drag && !dragPropagation) {
                if (_this.openGlobalLock)
                    _this.openGlobalLock();
                _this.openGlobalLock = getGlobalLock(drag);
                // If we don 't have the lock, don't start dragging
                if (!_this.openGlobalLock)
                    return;
            }
            /**
             * Record the progress of the mouse within the draggable element on each axis.
             * onPan, we're going to use this to calculate a new bounding box for the element to
             * project into. This will ensure that even if the DOM element moves via a relayout, it'll
             * stick to the correct place under the pointer.
             */
            _this.prepareBoundingBox();
            _this.visualElement.lockTargetBox();
            /**
             * Resolve the drag constraints. These are either set as top/right/bottom/left constraints
             * relative to the element's layout, or a ref to another element. Both need converting to
             * viewport coordinates.
             */
            _this.resolveDragConstraints();
            /**
             * When dragging starts, we want to find where the cursor is relative to the bounding box
             * of the element. Every frame, we calculate a new bounding box using this relative position
             * and let the visualElement renderer figure out how to reproject the element into this bounding
             * box.
             *
             * By doing it this way, rather than applying an x/y transform directly to the element,
             * we can ensure the component always visually sticks to the cursor as we'd expect, even
             * if the DOM element itself changes layout as a result of React updates the user might
             * make based on the drag position.
             */
            var point = getViewportPointFromEvent(event).point;
            eachAxis(function (axis) {
                var _a = _this.visualElement.targetBox[axis], min = _a.min, max = _a.max;
                _this.cursorProgress[axis] = cursorProgress
                    ? cursorProgress[axis]
                    : Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["progress"])(min, max, point[axis]);
                /**
                 * If we have external drag MotionValues, record their origin point. On pointermove
                 * we'll apply the pan gesture offset directly to this value.
                 */
                var axisValue = _this.getAxisMotionValue(axis);
                if (axisValue) {
                    _this.originPoint[axis] = axisValue.get();
                }
            });
            // Set current drag status
            _this.isDragging = true;
            _this.currentDirection = null;
            // Fire onDragStart event
            (_b = (_a = _this.props).onDragStart) === null || _b === void 0 ? void 0 : _b.call(_a, event, info);
            (_c = _this.visualElement.animationState) === null || _c === void 0 ? void 0 : _c.setActive(AnimationType.Drag, true);
        };
        var onMove = function (event, info) {
            var _a, _b, _c, _d;
            var _e = _this.props, dragPropagation = _e.dragPropagation, dragDirectionLock = _e.dragDirectionLock;
            // If we didn't successfully receive the gesture lock, early return.
            if (!dragPropagation && !_this.openGlobalLock)
                return;
            var offset = info.offset;
            // Attempt to detect drag direction if directionLock is true
            if (dragDirectionLock && _this.currentDirection === null) {
                _this.currentDirection = getCurrentDirection(offset);
                // If we've successfully set a direction, notify listener
                if (_this.currentDirection !== null) {
                    (_b = (_a = _this.props).onDirectionLock) === null || _b === void 0 ? void 0 : _b.call(_a, _this.currentDirection);
                }
                return;
            }
            // Update each point with the latest position
            _this.updateAxis("x", event, offset);
            _this.updateAxis("y", event, offset);
            // Fire onDrag event
            (_d = (_c = _this.props).onDrag) === null || _d === void 0 ? void 0 : _d.call(_c, event, info);
            // Update the last pointer event
            lastPointerEvent = event;
        };
        var onEnd = function (event, info) { return _this.stop(event, info); };
        var transformPagePoint = this.props.transformPagePoint;
        this.panSession = new PanSession(originEvent, {
            onSessionStart: onSessionStart,
            onStart: onStart,
            onMove: onMove,
            onEnd: onEnd,
        }, { transformPagePoint: transformPagePoint });
    };
    /**
     * Ensure the component's layout and target bounding boxes are up-to-date.
     */
    VisualElementDragControls.prototype.prepareBoundingBox = function () {
        var visualElement = this.visualElement;
        visualElement.withoutTransform(function () {
            visualElement.measureLayout();
        });
        visualElement.rebaseTargetBox(true, visualElement.getBoundingBoxWithoutTransforms());
    };
    VisualElementDragControls.prototype.resolveDragConstraints = function () {
        var _this = this;
        var dragConstraints = this.props.dragConstraints;
        if (dragConstraints) {
            this.constraints = isRefObject(dragConstraints)
                ? this.resolveRefConstraints(this.visualElement.box, dragConstraints)
                : calcRelativeConstraints(this.visualElement.box, dragConstraints);
        }
        else {
            this.constraints = false;
        }
        /**
         * If we're outputting to external MotionValues, we want to rebase the measured constraints
         * from viewport-relative to component-relative.
         */
        if (this.constraints && !this.hasMutatedConstraints) {
            eachAxis(function (axis) {
                if (_this.getAxisMotionValue(axis)) {
                    _this.constraints[axis] = rebaseAxisConstraints(_this.visualElement.box[axis], _this.constraints[axis]);
                }
            });
        }
    };
    VisualElementDragControls.prototype.resolveRefConstraints = function (layoutBox, constraints) {
        var _a = this.props, onMeasureDragConstraints = _a.onMeasureDragConstraints, transformPagePoint = _a.transformPagePoint;
        var constraintsElement = constraints.current;
        Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__["invariant"])(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
        this.constraintsBox = getBoundingBox(constraintsElement, transformPagePoint);
        var measuredConstraints = calcViewportConstraints(layoutBox, this.constraintsBox);
        /**
         * If there's an onMeasureDragConstraints listener we call it and
         * if different constraints are returned, set constraints to that
         */
        if (onMeasureDragConstraints) {
            var userConstraints = onMeasureDragConstraints(convertAxisBoxToBoundingBox(measuredConstraints));
            this.hasMutatedConstraints = !!userConstraints;
            if (userConstraints) {
                measuredConstraints = convertBoundingBoxToAxisBox(userConstraints);
            }
        }
        return measuredConstraints;
    };
    VisualElementDragControls.prototype.cancelDrag = function () {
        var _a;
        this.isDragging = false;
        this.panSession && this.panSession.end();
        this.panSession = null;
        if (!this.props.dragPropagation && this.openGlobalLock) {
            this.openGlobalLock();
            this.openGlobalLock = null;
        }
        (_a = this.visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Drag, false);
    };
    VisualElementDragControls.prototype.stop = function (event, info) {
        var _a;
        this.visualElement.unlockTargetBox();
        (_a = this.panSession) === null || _a === void 0 ? void 0 : _a.end();
        this.panSession = null;
        var isDragging = this.isDragging;
        this.cancelDrag();
        if (!isDragging)
            return;
        var _b = this.props, dragMomentum = _b.dragMomentum, dragElastic = _b.dragElastic, onDragEnd = _b.onDragEnd;
        if (dragMomentum || dragElastic) {
            var velocity = info.velocity;
            this.animateDragEnd(velocity);
        }
        onDragEnd === null || onDragEnd === void 0 ? void 0 : onDragEnd(event, info);
    };
    VisualElementDragControls.prototype.snapToCursor = function (event) {
        var _this = this;
        this.prepareBoundingBox();
        eachAxis(function (axis) {
            var axisValue = _this.getAxisMotionValue(axis);
            if (axisValue) {
                var point = getViewportPointFromEvent(event).point;
                var box = _this.visualElement.box;
                var length_1 = box[axis].max - box[axis].min;
                var center = box[axis].min + length_1 / 2;
                var offset = point[axis] - center;
                _this.originPoint[axis] = point[axis];
                axisValue.set(offset);
            }
            else {
                _this.cursorProgress[axis] = 0.5;
                _this.updateVisualElementAxis(axis, event);
            }
        });
    };
    /**
     * Update the specified axis with the latest pointer information.
     */
    VisualElementDragControls.prototype.updateAxis = function (axis, event, offset) {
        var drag = this.props.drag;
        // If we're not dragging this axis, do an early return.
        if (!shouldDrag(axis, drag, this.currentDirection))
            return;
        return this.getAxisMotionValue(axis)
            ? this.updateAxisMotionValue(axis, offset)
            : this.updateVisualElementAxis(axis, event);
    };
    VisualElementDragControls.prototype.updateAxisMotionValue = function (axis, offset) {
        var axisValue = this.getAxisMotionValue(axis);
        if (!offset || !axisValue)
            return;
        var dragElastic = this.props.dragElastic;
        var nextValue = this.originPoint[axis] + offset[axis];
        var update = this.constraints
            ? applyConstraints(nextValue, this.constraints[axis], dragElastic)
            : nextValue;
        axisValue.set(update);
    };
    VisualElementDragControls.prototype.updateVisualElementAxis = function (axis, event) {
        var _a;
        var dragElastic = this.props.dragElastic;
        // Get the actual layout bounding box of the element
        var axisLayout = this.visualElement.box[axis];
        // Calculate its current length. In the future we might want to lerp this to animate
        // between lengths if the layout changes as we change the DOM
        var axisLength = axisLayout.max - axisLayout.min;
        // Get the initial progress that the pointer sat on this axis on gesture start.
        var axisProgress = this.cursorProgress[axis];
        var point = getViewportPointFromEvent(event).point;
        // Calculate a new min point based on the latest pointer position, constraints and elastic
        var min = calcConstrainedMinPoint(point[axis], axisLength, axisProgress, (_a = this.constraints) === null || _a === void 0 ? void 0 : _a[axis], dragElastic);
        // Update the axis viewport target with this new min and the length
        this.visualElement.setAxisTarget(axis, min, min + axisLength);
    };
    VisualElementDragControls.prototype.updateProps = function (_a) {
        var _b = _a.drag, drag = _b === void 0 ? false : _b, _c = _a.dragDirectionLock, dragDirectionLock = _c === void 0 ? false : _c, _d = _a.dragPropagation, dragPropagation = _d === void 0 ? false : _d, _e = _a.dragConstraints, dragConstraints = _e === void 0 ? false : _e, _f = _a.dragElastic, dragElastic = _f === void 0 ? 0.35 : _f, _g = _a.dragMomentum, dragMomentum = _g === void 0 ? true : _g, remainingProps = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["drag", "dragDirectionLock", "dragPropagation", "dragConstraints", "dragElastic", "dragMomentum"]);
        this.props = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ drag: drag,
            dragDirectionLock: dragDirectionLock,
            dragPropagation: dragPropagation,
            dragConstraints: dragConstraints,
            dragElastic: dragElastic,
            dragMomentum: dragMomentum }, remainingProps);
    };
    /**
     * Drag works differently depending on which props are provided.
     *
     * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
     * - If the component will perform layout animations, we output the gesture to the component's
     *      visual bounding box
     * - Otherwise, we apply the delta to the x/y motion values.
     */
    VisualElementDragControls.prototype.getAxisMotionValue = function (axis) {
        var _a = this.props, layout = _a.layout, layoutId = _a.layoutId;
        var dragKey = "_drag" + axis.toUpperCase();
        if (this.props[dragKey]) {
            return this.props[dragKey];
        }
        else if (!layout && layoutId === undefined) {
            return this.visualElement.getValue(axis, 0);
        }
    };
    VisualElementDragControls.prototype.animateDragEnd = function (velocity) {
        var _this = this;
        var _a = this.props, drag = _a.drag, dragMomentum = _a.dragMomentum, dragElastic = _a.dragElastic, dragTransition = _a.dragTransition;
        var momentumAnimations = eachAxis(function (axis) {
            if (!shouldDrag(axis, drag, _this.currentDirection)) {
                return;
            }
            var transition = _this.constraints ? _this.constraints[axis] : {};
            /**
             * Overdamp the boundary spring if `dragElastic` is disabled. There's still a frame
             * of spring animations so we should look into adding a disable spring option to `inertia`.
             * We could do something here where we affect the `bounceStiffness` and `bounceDamping`
             * using the value of `dragElastic`.
             */
            var bounceStiffness = dragElastic ? 200 : 1000000;
            var bounceDamping = dragElastic ? 40 : 10000000;
            var inertia = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ type: "inertia", velocity: dragMomentum ? velocity[axis] : 0, bounceStiffness: bounceStiffness,
                bounceDamping: bounceDamping, timeConstant: 750, restDelta: 1, restSpeed: 10 }, dragTransition), transition);
            // If we're not animating on an externally-provided `MotionValue` we can use the
            // component's animation controls which will handle interactions with whileHover (etc),
            // otherwise we just have to animate the `MotionValue` itself.
            return _this.getAxisMotionValue(axis)
                ? _this.startAxisValueAnimation(axis, inertia)
                : _this.visualElement.startLayoutAxisAnimation(axis, inertia);
        });
        // Run all animations and then resolve the new drag constraints.
        return Promise.all(momentumAnimations).then(function () {
            var _a, _b;
            (_b = (_a = _this.props).onDragTransitionEnd) === null || _b === void 0 ? void 0 : _b.call(_a);
        });
    };
    VisualElementDragControls.prototype.stopMotion = function () {
        var _this = this;
        eachAxis(function (axis) {
            var axisValue = _this.getAxisMotionValue(axis);
            axisValue
                ? axisValue.stop()
                : _this.visualElement.stopLayoutAnimation();
        });
    };
    VisualElementDragControls.prototype.startAxisValueAnimation = function (axis, transition) {
        var axisValue = this.getAxisMotionValue(axis);
        if (!axisValue)
            return;
        var currentValue = axisValue.get();
        axisValue.set(currentValue);
        axisValue.set(currentValue); // Set twice to hard-reset velocity
        return startAnimation(axis, axisValue, 0, transition);
    };
    VisualElementDragControls.prototype.scalePoint = function () {
        var _this = this;
        var _a = this.props, drag = _a.drag, dragConstraints = _a.dragConstraints;
        if (!isRefObject(dragConstraints) || !this.constraintsBox)
            return;
        // Stop any current animations as there can be some visual glitching if we resize mid animation
        this.stopMotion();
        // Record the relative progress of the targetBox relative to the constraintsBox
        var boxProgress = { x: 0, y: 0 };
        eachAxis(function (axis) {
            boxProgress[axis] = calcOrigin(_this.visualElement.targetBox[axis], _this.constraintsBox[axis]);
        });
        /**
         * For each axis, calculate the current progress of the layout axis within the constraints.
         * Then, using the latest layout and constraints measurements, reposition the new layout axis
         * proportionally within the constraints.
         */
        this.prepareBoundingBox();
        this.resolveDragConstraints();
        eachAxis(function (axis) {
            if (!shouldDrag(axis, drag, null))
                return;
            // Calculate the position of the targetBox relative to the constraintsBox using the
            // previously calculated progress
            var _a = calcPositionFromProgress(_this.visualElement.targetBox[axis], _this.constraintsBox[axis], boxProgress[axis]), min = _a.min, max = _a.max;
            _this.visualElement.setAxisTarget(axis, min, max);
        });
    };
    VisualElementDragControls.prototype.mount = function (visualElement) {
        var _this = this;
        var element = visualElement.getInstance();
        /**
         * Attach a pointerdown event listener on this DOM element to initiate drag tracking.
         */
        var stopPointerListener = addPointerEvent(element, "pointerdown", function (event) {
            var _a = _this.props, drag = _a.drag, _b = _a.dragListener, dragListener = _b === void 0 ? true : _b;
            drag && dragListener && _this.start(event);
        });
        /**
         * Attach a window resize listener to scale the draggable target within its defined
         * constraints as the window resizes.
         */
        var stopResizeListener = addDomEvent(window, "resize", function () {
            _this.scalePoint();
        });
        /**
         * Ensure drag constraints are resolved correctly relative to the dragging element
         * whenever its layout changes.
         */
        var stopLayoutUpdateListener = visualElement.onLayoutUpdate(function () {
            if (_this.isDragging)
                _this.resolveDragConstraints();
        });
        /**
         * If the previous component with this same layoutId was dragging at the time
         * it was unmounted, we want to continue the same gesture on this component.
         */
        var prevSnapshot = visualElement.prevSnapshot;
        (prevSnapshot === null || prevSnapshot === void 0 ? void 0 : prevSnapshot.isDragging) &&
            this.start(lastPointerEvent, {
                cursorProgress: prevSnapshot.cursorProgress,
            });
        /**
         * Return a function that will teardown the drag gesture
         */
        return function () {
            stopPointerListener === null || stopPointerListener === void 0 ? void 0 : stopPointerListener();
            stopResizeListener === null || stopResizeListener === void 0 ? void 0 : stopResizeListener();
            stopLayoutUpdateListener === null || stopLayoutUpdateListener === void 0 ? void 0 : stopLayoutUpdateListener();
            _this.cancelDrag();
        };
    };
    return VisualElementDragControls;
}());
function shouldDrag(direction, drag, currentDirection) {
    return ((drag === true || drag === direction) &&
        (currentDirection === null || currentDirection === direction));
}
/**
 * Based on an x/y offset determine the current drag direction. If both axis' offsets are lower
 * than the provided threshold, return `null`.
 *
 * @param offset - The x/y offset from origin.
 * @param lockThreshold - (Optional) - the minimum absolute offset before we can determine a drag direction.
 */
function getCurrentDirection(offset, lockThreshold) {
    if (lockThreshold === void 0) { lockThreshold = 10; }
    var direction = null;
    if (Math.abs(offset.y) > lockThreshold) {
        direction = "y";
    }
    else if (Math.abs(offset.x) > lockThreshold) {
        direction = "x";
    }
    return direction;
}

/**
 * A hook that allows an element to be dragged.
 *
 * @internal
 */
function useDrag(props, visualElement) {
    var groupDragControls = props.dragControls;
    var transformPagePoint = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(MotionConfigContext).transformPagePoint;
    var dragControls = useConstant(function () {
        return new VisualElementDragControls({
            visualElement: visualElement,
        });
    });
    dragControls.updateProps(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, props), { transformPagePoint: transformPagePoint }));
    // If we've been provided a DragControls for manual control over the drag gesture,
    // subscribe this component to it on mount.
    Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () { return groupDragControls && groupDragControls.subscribe(dragControls); }, [dragControls]);
    // Mount the drag controls with the visualElement
    Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () { return dragControls.mount(visualElement); }, []);
}

var Component = makeRenderlessComponent(function (_a) {
    var visualElement = _a.visualElement, props = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["visualElement"]);
    return useDrag(props, visualElement);
});
/**
 * @public
 */
var Drag = {
    key: "drag",
    shouldRender: function (props) { return !!props.drag || !!props.dragControls; },
    getComponent: function () { return Component; },
};

/**
 * TODO: This component is quite small and no longer directly imports animation code.
 * It could be a candidate for folding back into the main `motion` component.
 */
var ExitComponent = makeRenderlessComponent(function (props) {
    var custom = props.custom, visualElement = props.visualElement;
    var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(usePresence(), 2), isPresent = _a[0], onExitComplete = _a[1];
    var presenceContext = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(PresenceContext);
    Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
        var _a, _b;
        var animation = (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Exit, !isPresent, { custom: (_b = presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.custom) !== null && _b !== void 0 ? _b : custom });
        !isPresent && (animation === null || animation === void 0 ? void 0 : animation.then(onExitComplete));
    }, [isPresent]);
});
/**
 * @public
 */
var Exit = {
    key: "exit",
    shouldRender: function (props) { return !!props.exit && !checkShouldInheritVariant(props); },
    getComponent: function () { return ExitComponent; },
};

/**
 * `useAnimationGroupSubscription` allows a component to subscribe to an
 * externally-created `AnimationControls`, created by the `useAnimation` hook.
 *
 * @param animation
 * @param controls
 *
 * @internal
 */
function useAnimationGroupSubscription(visualElement, animation) {
    var unsubscribe = Object(react__WEBPACK_IMPORTED_MODULE_5__["useMemo"])(function () { return animation.subscribe(visualElement); }, [
        animation,
    ]);
    useUnmountEffect(function () { return unsubscribe === null || unsubscribe === void 0 ? void 0 : unsubscribe(); });
}

var AnimationState = makeRenderlessComponent(function (props) {
    var visualElement = props.visualElement, animate = props.animate;
    /**
     * We dynamically generate the AnimationState manager as it contains a reference
     * to the underlying animation library. We only want to load that if we load this,
     * so people can optionally code split it out using the `m` component.
     */
    if (!visualElement.animationState) {
        visualElement.animationState = createAnimationState(visualElement);
    }
    var variantContext = useVariantContext();
    /**
     * Every render, we want to update the AnimationState with the latest props
     * and context. We could add these to the dependency list but as many of these
     * props can be objects or arrays it's not clear that we'd gain much performance.
     */
    Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
        visualElement.animationState.setProps(props, visualElement.inheritsVariants ? variantContext : undefined);
    });
    /**
     * Subscribe any provided AnimationControls to the component's VisualElement
     */
    if (animate instanceof AnimationControls) {
        useAnimationGroupSubscription(visualElement, animate);
    }
});
/**
 * @public
 */
var Animation = {
    key: "animation",
    shouldRender: function () { return true; },
    getComponent: function (_a) {
        var animate = _a.animate, whileHover = _a.whileHover, whileFocus = _a.whileFocus, whileTap = _a.whileTap, whileDrag = _a.whileDrag, exit = _a.exit, variants = _a.variants;
        return animate ||
            whileHover ||
            whileFocus ||
            whileTap ||
            whileDrag ||
            exit ||
            variants
            ? AnimationState
            : undefined;
    },
};

function tweenAxis(target, prev, next, p) {
    target.min = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["mix"])(prev.min, next.min, p);
    target.max = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["mix"])(prev.max, next.max, p);
}

var progressTarget = 1000;
var Animate = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Animate, _super);
    function Animate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.frameTarget = {
            x: { min: 0, max: 0 },
            y: { min: 0, max: 0 },
        };
        _this.stopAxisAnimation = {
            x: undefined,
            y: undefined,
        };
        _this.animate = function (target, origin, _a) {
            if (_a === void 0) { _a = {}; }
            var originBox = _a.originBox, targetBox = _a.targetBox, visibilityAction = _a.visibilityAction, shouldStackAnimate = _a.shouldStackAnimate, config = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["originBox", "targetBox", "visibilityAction", "shouldStackAnimate"]);
            var _b = _this.props, visualElement = _b.visualElement, layout = _b.layout;
            /**
             * Early return if we've been instructed not to animate this render.
             */
            if (shouldStackAnimate === false)
                return _this.safeToRemove();
            /**
             * Allow the measured origin (prev bounding box) and target (actual layout) to be
             * overridden by the provided config.
             */
            origin = originBox || origin;
            target = targetBox || target;
            var boxHasMoved = hasMoved(origin, target);
            var animations = eachAxis(function (axis) {
                /**
                 * If layout is set to "position", we can resize the origin box based on the target
                 * box and only animate its position.
                 */
                if (layout === "position") {
                    var targetLength = target[axis].max - target[axis].min;
                    origin[axis].max = origin[axis].min + targetLength;
                }
                if (visualElement.isTargetBoxLocked) {
                    return;
                }
                else if (visibilityAction !== undefined) {
                    // If we're meant to show/hide the visualElement, do so
                    visibilityAction === VisibilityAction.Hide
                        ? visualElement.hide()
                        : visualElement.show();
                }
                else if (boxHasMoved) {
                    // If the box has moved, animate between it's current visual state and its
                    // final state
                    return _this.animateAxis(axis, target[axis], origin[axis], config);
                }
                else {
                    // If the box has remained in the same place, immediately set the axis target
                    // to the final desired state
                    return visualElement.setAxisTarget(axis, target[axis].min, target[axis].max);
                }
            });
            // Force a render to ensure there's no flash of uncorrected bounding box.
            visualElement.render();
            /**
             * If this visualElement isn't present (ie it's been removed from the tree by the user but
             * kept in by the tree by AnimatePresence) then call safeToRemove when all axis animations
             * have successfully finished.
             */
            return Promise.all(animations).then(function () {
                var _a, _b;
                (_b = (_a = _this.props).onLayoutAnimationComplete) === null || _b === void 0 ? void 0 : _b.call(_a);
                if (visualElement.isPresent) {
                    visualElement.presence = Presence.Present;
                }
                else {
                    _this.safeToRemove();
                }
            });
        };
        return _this;
    }
    Animate.prototype.componentDidMount = function () {
        var _this = this;
        var visualElement = this.props.visualElement;
        visualElement.animateMotionValue = startAnimation;
        visualElement.enableLayoutProjection();
        this.unsubLayoutReady = visualElement.onLayoutUpdate(this.animate);
        visualElement.updateConfig(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, visualElement.config), { safeToRemove: function () { return _this.safeToRemove(); } }));
    };
    Animate.prototype.componentWillUnmount = function () {
        var _this = this;
        this.unsubLayoutReady();
        eachAxis(function (axis) { var _a, _b; return (_b = (_a = _this.stopAxisAnimation)[axis]) === null || _b === void 0 ? void 0 : _b.call(_a); });
    };
    /**
     * TODO: This manually performs animations on the visualElement's layout progress
     * values. It'd be preferable to amend the HTMLVisualElement.startLayoutAxisAnimation
     * API to accept more custom animations like this.
     */
    Animate.prototype.animateAxis = function (axis, target, origin, _a) {
        var _b, _c;
        var _d = _a === void 0 ? {} : _a, transition = _d.transition, crossfadeOpacity = _d.crossfadeOpacity;
        (_c = (_b = this.stopAxisAnimation)[axis]) === null || _c === void 0 ? void 0 : _c.call(_b);
        var visualElement = this.props.visualElement;
        var frameTarget = this.frameTarget[axis];
        var layoutProgress = visualElement.getAxisProgress()[axis];
        /**
         * Set layout progress back to 0. We set it twice to hard-reset any velocity that might
         * be re-incoporated into a subsequent spring animation.
         */
        layoutProgress.clearListeners();
        layoutProgress.set(0);
        layoutProgress.set(0);
        /**
         * If this is a crossfade animation, create a function that updates both the opacity of this component
         * and the one being crossfaded out.
         */
        var crossfade;
        if (crossfadeOpacity) {
            crossfade = this.createCrossfadeAnimation(crossfadeOpacity);
            visualElement.show();
        }
        /**
         * Create an animation function to run once per frame. This will tween the visual bounding box from
         * origin to target using the latest progress value.
         */
        var frame = function () {
            // Convert the latest layoutProgress, which is a value from 0-1000, into a 0-1 progress
            var p = layoutProgress.get() / progressTarget;
            // Tween the axis and update the visualElement with the latest values
            tweenAxis(frameTarget, origin, target, p);
            visualElement.setAxisTarget(axis, frameTarget.min, frameTarget.max);
            // If this is a crossfade animation, update both elements.
            crossfade === null || crossfade === void 0 ? void 0 : crossfade(p);
        };
        // Synchronously run a frame to ensure there's no flash of the uncorrected bounding box.
        frame();
        // Ensure that the layout delta is updated for this frame.
        visualElement.updateLayoutDelta();
        // Create a function to stop animation on this specific axis
        var unsubscribeProgress = layoutProgress.onChange(frame);
        // Start the animation on this axis
        var animation = startAnimation(axis === "x" ? "layoutX" : "layoutY", layoutProgress, progressTarget, transition || this.props.transition || defaultTransition).then(unsubscribeProgress);
        this.stopAxisAnimation[axis] = function () {
            layoutProgress.stop();
            unsubscribeProgress();
        };
        return animation;
    };
    Animate.prototype.createCrossfadeAnimation = function (crossfadeOpacity) {
        var visualElement = this.props.visualElement;
        var opacity = visualElement.getValue("opacity", 0);
        return function (p) {
            opacity.set(easeCrossfadeIn(Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["mix"])(0, 1, p)));
            crossfadeOpacity.set(easeCrossfadeOut(Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["mix"])(1, 0, p)));
        };
    };
    Animate.prototype.safeToRemove = function () {
        var _a, _b;
        (_b = (_a = this.props).safeToRemove) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    Animate.prototype.render = function () {
        return null;
    };
    return Animate;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]));
function AnimateLayoutContextProvider(props) {
    var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(usePresence(), 2), safeToRemove = _a[1];
    return Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(Animate, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, props, { safeToRemove: safeToRemove }));
}
function hasMoved(a, b) {
    return hasAxisMoved(a.x, b.x) || hasAxisMoved(a.y, b.y);
}
function hasAxisMoved(a, b) {
    return a.min !== b.min || a.max !== b.max;
}
var defaultTransition = {
    duration: 0.45,
    ease: [0.4, 0, 0.1, 1],
};
function compress(min, max, easing) {
    return function (p) {
        // Could replace ifs with clamp
        if (p < min)
            return 0;
        if (p > max)
            return 1;
        return easing(Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["progress"])(min, max, p));
    };
}
var easeCrossfadeIn = compress(0, 0.5, popmotion__WEBPACK_IMPORTED_MODULE_2__["circOut"]);
var easeCrossfadeOut = compress(0.5, 0.95, popmotion__WEBPACK_IMPORTED_MODULE_2__["linear"]);
/**
 * @public
 */
var AnimateLayout = {
    key: "animate-layout",
    shouldRender: function (props) { return !!props.layout || !!props.layoutId; },
    getComponent: function () { return AnimateLayoutContextProvider; },
};

/**
 * This component is responsible for scheduling the measuring of the motion component
 */
var Measure = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Measure, _super);
    function Measure() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * If this is a child of a SyncContext, register the VisualElement with it on mount.
     */
    Measure.prototype.componentDidMount = function () {
        var _a = this.props, syncLayout = _a.syncLayout, framerSyncLayout = _a.framerSyncLayout, visualElement = _a.visualElement;
        isSharedLayout(syncLayout) && syncLayout.register(visualElement);
        isSharedLayout(framerSyncLayout) &&
            framerSyncLayout.register(visualElement);
    };
    /**
     * If this is a child of a SyncContext, notify it that it needs to re-render. It will then
     * handle the snapshotting.
     *
     * If it is stand-alone component, add it to the batcher.
     */
    Measure.prototype.getSnapshotBeforeUpdate = function () {
        var _a = this.props, syncLayout = _a.syncLayout, visualElement = _a.visualElement;
        if (isSharedLayout(syncLayout)) {
            syncLayout.syncUpdate();
        }
        else {
            visualElement.snapshotBoundingBox();
            syncLayout.add(visualElement);
        }
        return null;
    };
    Measure.prototype.componentDidUpdate = function () {
        var _a = this.props, syncLayout = _a.syncLayout, visualElement = _a.visualElement;
        if (!isSharedLayout(syncLayout))
            syncLayout.flush();
        /**
         * If this axis isn't animating as a result of this render we want to reset the targetBox
         * to the measured box
         */
        visualElement.rebaseTargetBox();
    };
    Measure.prototype.render = function () {
        return null;
    };
    return Measure;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component));
function MeasureContextProvider(props) {
    var syncLayout = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(SharedLayoutContext);
    var framerSyncLayout = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(FramerTreeLayoutContext);
    return (react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Measure, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, props, { syncLayout: syncLayout, framerSyncLayout: framerSyncLayout })));
}
var MeasureLayout = {
    key: "measure-layout",
    shouldRender: function (props) {
        return !!props.drag || !!props.layout || !!props.layoutId;
    },
    getComponent: function () { return MeasureContextProvider; },
};

var allMotionFeatures = [
    MeasureLayout,
    Animation,
    Drag,
    Gestures,
    Exit,
    AnimateLayout,
];
var domBaseConfig = {
    useVisualElement: useDomVisualElement,
    useRender: useRender,
};
/**
 * Convert any React component into a `motion` component. The provided component
 * **must** use `React.forwardRef` to the underlying DOM component you want to animate.
 *
 * ```jsx
 * const Component = React.forwardRef((props, ref) => {
 *   return <div ref={ref} />
 * })
 *
 * const MotionComponent = motion.custom(Component)
 * ```
 *
 * @public
 */
function createMotionProxy(defaultFeatures) {
    var config = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, domBaseConfig), { defaultFeatures: defaultFeatures });
    function custom(Component) {
        return createMotionComponent(Component, config);
    }
    var componentCache = new Map();
    function get(target, key) {
        if (key === "custom")
            return target.custom;
        if (!componentCache.has(key)) {
            componentCache.set(key, createMotionComponent(key, config));
        }
        return componentCache.get(key);
    }
    return new Proxy({ custom: custom }, { get: get });
}
/**
 * HTML & SVG components, optimised for use with gestures and animation. These can be used as
 * drop-in replacements for any HTML & SVG component, all CSS & SVG properties are supported.
 *
 * @public
 */
var motion = /*@__PURE__*/ createMotionProxy(allMotionFeatures);
/**
 * Create a DOM `motion` component with the provided string. This is primarily intended
 * as a full alternative to `motion` for consumers who have to support environments that don't
 * support `Proxy`.
 *
 * ```javascript
 * import { createDomMotionComponent } from "framer-motion"
 *
 * const motion = {
 *   div: createDomMotionComponent('div')
 * }
 * ```
 *
 * @public
 */
function createDomMotionComponent(key) {
    return createMotionComponent(key, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, domBaseConfig), { defaultFeatures: allMotionFeatures }));
}

/**
 * @public
 */
var m = /*@__PURE__*/ createMotionProxy([MeasureLayout]);

function useForceUpdate() {
    var unloadingRef = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(false);
    var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(0), 2), forcedRenderCount = _a[0], setForcedRenderCount = _a[1];
    useUnmountEffect(function () { return (unloadingRef.current = true); });
    return Object(react__WEBPACK_IMPORTED_MODULE_5__["useCallback"])(function () {
        !unloadingRef.current && setForcedRenderCount(forcedRenderCount + 1);
    }, [forcedRenderCount]);
}

var presenceId = 0;
function getPresenceId() {
    var id = presenceId;
    presenceId++;
    return id;
}
var PresenceChild = function (_a) {
    var children = _a.children, initial = _a.initial, isPresent = _a.isPresent, onExitComplete = _a.onExitComplete, custom = _a.custom, presenceAffectsLayout = _a.presenceAffectsLayout;
    var presenceChildren = useConstant(newChildrenMap);
    var id = useConstant(getPresenceId);
    var context = Object(react__WEBPACK_IMPORTED_MODULE_5__["useMemo"])(function () {
        return {
            id: id,
            initial: initial,
            isPresent: isPresent,
            custom: custom,
            onExitComplete: function (childId) {
                presenceChildren.set(childId, true);
                var allComplete = true;
                presenceChildren.forEach(function (isComplete) {
                    if (!isComplete)
                        allComplete = false;
                });
                allComplete && (onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete());
            },
            register: function (childId) {
                presenceChildren.set(childId, false);
                return function () { return presenceChildren.delete(childId); };
            },
        };
    }, 
    /**
     * If the presence of a child affects the layout of the components around it,
     * we want to make a new context value to ensure they get re-rendered
     * so they can detect that layout change.
     */
    presenceAffectsLayout ? undefined : [isPresent]);
    Object(react__WEBPACK_IMPORTED_MODULE_5__["useMemo"])(function () {
        presenceChildren.forEach(function (_, key) { return presenceChildren.set(key, false); });
    }, [isPresent]);
    return (Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(PresenceContext.Provider, { value: context }, children));
};
function newChildrenMap() {
    return new Map();
}

function getChildKey(child) {
    return child.key || "";
}
function updateChildLookup(children, allChildren) {
    var seenChildren =  false ? undefined : null;
    children.forEach(function (child) {
        var key = getChildKey(child);
        if (false) {}
        allChildren.set(key, child);
    });
}
function onlyElements(children) {
    var filtered = [];
    // We use forEach here instead of map as map mutates the component key by preprending `.$`
    react__WEBPACK_IMPORTED_MODULE_5__["Children"].forEach(children, function (child) {
        if (Object(react__WEBPACK_IMPORTED_MODULE_5__["isValidElement"])(child))
            filtered.push(child);
    });
    return filtered;
}
/**
 * `AnimatePresence` enables the animation of components that have been removed from the tree.
 *
 * When adding/removing more than a single child, every child **must** be given a unique `key` prop.
 *
 * @library
 *
 * Any `Frame` components that have an `exit` property defined will animate out when removed from
 * the tree.
 *
 * ```jsx
 * import { Frame, AnimatePresence } from 'framer'
 *
 * // As items are added and removed from `items`
 * export function Items({ items }) {
 *   return (
 *     <AnimatePresence>
 *       {items.map(item => (
 *         <Frame
 *           key={item.id}
 *           initial={{ opacity: 0 }}
 *           animate={{ opacity: 1 }}
 *           exit={{ opacity: 0 }}
 *         />
 *       ))}
 *     </AnimatePresence>
 *   )
 * }
 * ```
 *
 * You can sequence exit animations throughout a tree using variants.
 *
 * @motion
 *
 * Any `motion` components that have an `exit` property defined will animate out when removed from
 * the tree.
 *
 * ```jsx
 * import { motion, AnimatePresence } from 'framer-motion'
 *
 * export const Items = ({ items }) => (
 *   <AnimatePresence>
 *     {items.map(item => (
 *       <motion.div
 *         key={item.id}
 *         initial={{ opacity: 0 }}
 *         animate={{ opacity: 1 }}
 *         exit={{ opacity: 0 }}
 *       />
 *     ))}
 *   </AnimatePresence>
 * )
 * ```
 *
 * You can sequence exit animations throughout a tree using variants.
 *
 * If a child contains multiple `motion` components with `exit` props, it will only unmount the child
 * once all `motion` components have finished animating out. Likewise, any components using
 * `usePresence` all need to call `safeToRemove`.
 *
 * @public
 */
var AnimatePresence = function (_a) {
    var children = _a.children, custom = _a.custom, _b = _a.initial, initial = _b === void 0 ? true : _b, onExitComplete = _a.onExitComplete, exitBeforeEnter = _a.exitBeforeEnter, _c = _a.presenceAffectsLayout, presenceAffectsLayout = _c === void 0 ? true : _c;
    // We want to force a re-render once all exiting animations have finished. We
    // either use a local forceRender function, or one from a parent context if it exists.
    var forceRender = useForceUpdate();
    var layoutContext = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(SharedLayoutContext);
    if (isSharedLayout(layoutContext)) {
        forceRender = layoutContext.forceUpdate;
    }
    var isInitialRender = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(true);
    // Filter out any children that aren't ReactElements. We can only track ReactElements with a props.key
    var filteredChildren = onlyElements(children);
    // Keep a living record of the children we're actually rendering so we
    // can diff to figure out which are entering and exiting
    var presentChildren = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(filteredChildren);
    // A lookup table to quickly reference components by key
    var allChildren = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(new Map())
        .current;
    // A living record of all currently exiting components.
    var exiting = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(new Set()).current;
    updateChildLookup(filteredChildren, allChildren);
    // If this is the initial component render, just deal with logic surrounding whether
    // we play onMount animations or not.
    if (isInitialRender.current) {
        isInitialRender.current = false;
        return (Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(react__WEBPACK_IMPORTED_MODULE_5__["Fragment"], null, filteredChildren.map(function (child) { return (Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(PresenceChild, { key: getChildKey(child), isPresent: true, initial: initial ? undefined : false, presenceAffectsLayout: presenceAffectsLayout }, child)); })));
    }
    // If this is a subsequent render, deal with entering and exiting children
    var childrenToRender = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(filteredChildren);
    // Diff the keys of the currently-present and target children to update our
    // exiting list.
    var presentKeys = presentChildren.current.map(getChildKey);
    var targetKeys = filteredChildren.map(getChildKey);
    // Diff the present children with our target children and mark those that are exiting
    var numPresent = presentKeys.length;
    for (var i = 0; i < numPresent; i++) {
        var key = presentKeys[i];
        if (targetKeys.indexOf(key) === -1) {
            exiting.add(key);
        }
        else {
            // In case this key has re-entered, remove from the exiting list
            exiting.delete(key);
        }
    }
    // If we currently have exiting children, and we're deferring rendering incoming children
    // until after all current children have exiting, empty the childrenToRender array
    if (exitBeforeEnter && exiting.size) {
        childrenToRender = [];
    }
    // Loop through all currently exiting components and clone them to overwrite `animate`
    // with any `exit` prop they might have defined.
    exiting.forEach(function (key) {
        // If this component is actually entering again, early return
        if (targetKeys.indexOf(key) !== -1)
            return;
        var child = allChildren.get(key);
        if (!child)
            return;
        var insertionIndex = presentKeys.indexOf(key);
        var onExit = function () {
            allChildren.delete(key);
            exiting.delete(key);
            // Remove this child from the present children
            var removeIndex = presentChildren.current.findIndex(function (presentChild) { return presentChild.key === key; });
            presentChildren.current.splice(removeIndex, 1);
            // Defer re-rendering until all exiting children have indeed left
            if (!exiting.size) {
                presentChildren.current = filteredChildren;
                forceRender();
                onExitComplete && onExitComplete();
            }
        };
        childrenToRender.splice(insertionIndex, 0, Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(PresenceChild, { key: getChildKey(child), isPresent: false, onExitComplete: onExit, custom: custom, presenceAffectsLayout: presenceAffectsLayout }, child));
    });
    // Add `MotionContext` even to children that don't need it to ensure we're rendering
    // the same tree between renders
    childrenToRender = childrenToRender.map(function (child) {
        var key = child.key;
        return exiting.has(key) ? (child) : (Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(PresenceChild, { key: getChildKey(child), isPresent: true, presenceAffectsLayout: presenceAffectsLayout }, child));
    });
    presentChildren.current = childrenToRender;
    if (false) {}
    return (Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(react__WEBPACK_IMPORTED_MODULE_5__["Fragment"], null, exiting.size
        ? childrenToRender
        : childrenToRender.map(function (child) { return Object(react__WEBPACK_IMPORTED_MODULE_5__["cloneElement"])(child); })));
};

function createSwitchAnimation(child, stack) {
    if (stack && child !== stack.lead) {
        return { visibilityAction: VisibilityAction.Hide };
    }
    else if (stack &&
        child.presence !== Presence.Entering &&
        child === stack.lead &&
        stack.lead !== stack.prevLead) {
        return { visibilityAction: VisibilityAction.Show };
    }
    var originBox;
    var targetBox;
    if (child.presence === Presence.Entering) {
        originBox = stack === null || stack === void 0 ? void 0 : stack.getFollowOrigin();
    }
    else if (child.presence === Presence.Exiting) {
        targetBox = stack === null || stack === void 0 ? void 0 : stack.getFollowTarget();
    }
    return { originBox: originBox, targetBox: targetBox };
}
function createCrossfadeAnimation(child, stack) {
    var _a, _b, _c;
    var config = {};
    var stackLead = stack && stack.lead;
    var stackLeadPresence = stackLead === null || stackLead === void 0 ? void 0 : stackLead.presence;
    if (stack && child === stackLead) {
        if (child.presence === Presence.Entering) {
            config.originBox = stack.getFollowOrigin();
        }
        else if (child.presence === Presence.Exiting) {
            config.targetBox = stack.getFollowTarget();
        }
    }
    else if (stack && child === stack.follow) {
        config.transition = stack.getLeadTransition();
        if (stackLeadPresence === Presence.Entering) {
            config.targetBox = stack.getLeadTarget();
        }
        else if (stackLeadPresence === Presence.Exiting) {
            config.originBox = stack.getLeadOrigin();
        }
    }
    // If neither the lead or follow component is the root child of AnimatePresence,
    // don't handle crossfade animations
    if (!((_a = stack === null || stack === void 0 ? void 0 : stack.follow) === null || _a === void 0 ? void 0 : _a.isPresenceRoot) && !(stackLead === null || stackLead === void 0 ? void 0 : stackLead.isPresenceRoot)) {
        return config;
    }
    if (!stack || child === stackLead) {
        if (child.presence === Presence.Entering) {
            config.crossfadeOpacity = (_b = stack === null || stack === void 0 ? void 0 : stack.follow) === null || _b === void 0 ? void 0 : _b.getValue("opacity", 0);
        }
    }
    else if (stack && child === stack.follow) {
        if (!stackLead || stackLeadPresence === Presence.Entering) ;
        else if (stackLeadPresence === Presence.Exiting) {
            config.crossfadeOpacity = (_c = stack === null || stack === void 0 ? void 0 : stack.lead) === null || _c === void 0 ? void 0 : _c.getValue("opacity", 1);
        }
    }
    else {
        config.visibilityAction = VisibilityAction.Hide;
    }
    return config;
}

/**
 * For each layout animation, we want to identify two components
 * within a stack that will serve as the "lead" and "follow" components.
 *
 * In the switch animation, the lead component performs the entire animation.
 * It uses the follow bounding box to animate out from and back to. The follow
 * component is hidden.
 *
 * In the crossfade animation, both the lead and follow components perform
 * the entire animation, animating from the follow origin bounding box to the lead
 * target bounding box.
 *
 * Generalising a stack as First In Last Out, *searching from the end* we can
 * generally consider the lead component to be:
 *  - If the last child is present, the last child
 *  - If the last child is exiting, the last *encountered* exiting component
 */
function findLeadAndFollow(stack, _a) {
    var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), prevLead = _b[0], prevFollow = _b[1];
    var lead = undefined;
    var leadIndex = 0;
    var follow = undefined;
    // Find the lead child first
    var numInStack = stack.length;
    var lastIsPresent = false;
    for (var i = numInStack - 1; i >= 0; i--) {
        var child = stack[i];
        var isLastInStack = i === numInStack - 1;
        if (isLastInStack)
            lastIsPresent = child.isPresent;
        if (lastIsPresent) {
            lead = child;
        }
        else {
            // If the child before this will be present, make this the
            // lead.
            var prev = stack[i - 1];
            if (prev && prev.isPresent)
                lead = child;
        }
        if (lead) {
            leadIndex = i;
            break;
        }
    }
    if (!lead)
        lead = stack[0];
    // Find the follow child
    follow = stack[leadIndex - 1];
    // If the lead component is exiting, find the closest follow
    // present component
    if (lead) {
        for (var i = leadIndex - 1; i >= 0; i--) {
            var child = stack[i];
            if (child.isPresent) {
                follow = child;
                break;
            }
        }
    }
    // If the lead has changed and the previous lead still exists in the
    // stack, set it to the previous lead. This allows us to differentiate between
    // a, b, c(exit) -> a, b(exit), c(exit)
    // and
    // a, b(exit), c -> a, b(exit), c(exit)
    if (lead !== prevLead &&
        !lastIsPresent &&
        follow === prevFollow &&
        stack.find(function (stackChild) { return stackChild === prevLead; })) {
        lead = prevLead;
    }
    return [lead, follow];
}
var LayoutStack = /** @class */ (function () {
    function LayoutStack() {
        this.order = [];
        // Track whether we've ever had a child
        this.hasChildren = false;
    }
    LayoutStack.prototype.add = function (child) {
        var _a;
        this.order.push(child);
        // Load previous values from snapshot into this child
        // TODO Neaten up
        // TODO Double check when reimplementing move
        // TODO Add isDragging status and
        if (this.snapshot) {
            child.prevSnapshot = this.snapshot;
            // TODO Remove in favour of above
            child.prevViewportBox = this.snapshot.boundingBox;
            var latest = this.snapshot.latestMotionValues;
            for (var key in latest) {
                if (!child.hasValue(key)) {
                    child.addValue(key, motionValue(latest[key]));
                }
                else {
                    (_a = child.getValue(key)) === null || _a === void 0 ? void 0 : _a.set(latest[key]);
                }
            }
        }
        this.hasChildren = true;
    };
    LayoutStack.prototype.remove = function (child) {
        var index = this.order.findIndex(function (stackChild) { return child === stackChild; });
        if (index !== -1)
            this.order.splice(index, 1);
    };
    LayoutStack.prototype.updateLeadAndFollow = function () {
        this.prevLead = this.lead;
        this.prevFollow = this.follow;
        var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(findLeadAndFollow(this.order, [
            this.lead,
            this.follow,
        ]), 2), lead = _a[0], follow = _a[1];
        this.lead = lead;
        this.follow = follow;
    };
    LayoutStack.prototype.updateSnapshot = function () {
        if (!this.lead)
            return;
        var snapshot = {
            boundingBox: this.lead.prevViewportBox,
            latestMotionValues: {},
        };
        this.lead.forEachValue(function (value, key) {
            var latest = value.get();
            if (!isTransformProp(latest)) {
                snapshot.latestMotionValues[key] = latest;
            }
        });
        var dragControls = elementDragControls.get(this.lead);
        if (dragControls && dragControls.isDragging) {
            snapshot.isDragging = true;
            snapshot.cursorProgress = dragControls.cursorProgress;
        }
        this.snapshot = snapshot;
    };
    LayoutStack.prototype.isLeadPresent = function () {
        var _a;
        return this.lead && ((_a = this.lead) === null || _a === void 0 ? void 0 : _a.presence) !== Presence.Exiting;
    };
    LayoutStack.prototype.getFollowOrigin = function () {
        var _a;
        return this.follow
            ? this.follow.prevViewportBox
            : (_a = this.snapshot) === null || _a === void 0 ? void 0 : _a.boundingBox;
    };
    LayoutStack.prototype.getFollowTarget = function () {
        var _a;
        return (_a = this.follow) === null || _a === void 0 ? void 0 : _a.box;
    };
    LayoutStack.prototype.getLeadOrigin = function () {
        var _a;
        return (_a = this.lead) === null || _a === void 0 ? void 0 : _a.prevViewportBox;
    };
    LayoutStack.prototype.getLeadTarget = function () {
        var _a;
        return (_a = this.lead) === null || _a === void 0 ? void 0 : _a.box;
    };
    LayoutStack.prototype.getLeadTransition = function () {
        var _a;
        return (_a = this.lead) === null || _a === void 0 ? void 0 : _a.config.transition;
    };
    return LayoutStack;
}());

function resetRotate(child) {
    // If there's no detected rotation values, we can early return without a forced render.
    var hasRotate = false;
    // Keep a record of all the values we've reset
    var resetValues = {};
    // Check the rotate value of all axes and reset to 0
    for (var i = 0; i < transformAxes.length; i++) {
        var axis = transformAxes[i];
        var key = "rotate" + axis;
        // If this rotation doesn't exist as a motion value, then we don't
        // need to reset it
        if (!child.hasValue(key) || child.latest[key] === 0)
            continue;
        hasRotate = true;
        // Record the rotation and then temporarily set it to 0
        resetValues[key] = child.latest[key];
        child.latest[key] = 0;
    }
    // If there's no rotation values, we don't need to do any more.
    if (!hasRotate)
        return;
    // Force a render of this element to apply the transform with all rotations
    // set to 0.
    child.render();
    // Put back all the values we reset
    for (var key in resetValues) {
        child.latest[key] = resetValues[key];
    }
    // Schedule a render for the next frame. This ensures we won't visually
    // see the element with the reset rotate value applied.
    child.scheduleRender();
}

/**
 * @public
 */
var AnimateSharedLayout = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(AnimateSharedLayout, _super);
    function AnimateSharedLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * A list of all the children in the shared layout
         */
        _this.children = new Set();
        /**
         * As animate components with a defined `layoutId` are added/removed to the tree,
         * we store them in order. When one is added, it will animate out from the
         * previous one, and when it's removed, it'll animate to the previous one.
         */
        _this.stacks = new Map();
        /**
         * Track whether the component has mounted. If it hasn't, the presence of added children
         * are set to Present, whereas if it has they're considered Entering
         */
        _this.hasMounted = false;
        /**
         * Track whether we already have an update scheduled. If we don't, we'll run snapshots
         * and schedule one.
         */
        _this.updateScheduled = false;
        /**
         * Tracks whether we already have a render scheduled. If we don't, we'll force one with this.forceRender
         */
        _this.renderScheduled = false;
        /**
         * The methods provided to all children in the shared layout tree.
         */
        _this.syncContext = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, createBatcher()), { syncUpdate: function (force) { return _this.scheduleUpdate(force); }, forceUpdate: function () {
                // By copying syncContext to itself, when this component re-renders it'll also re-render
                // all children subscribed to the SharedLayout context.
                _this.syncContext = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, _this.syncContext);
                _this.scheduleUpdate(true);
            }, register: function (child) { return _this.addChild(child); }, remove: function (child) { return _this.removeChild(child); } });
        return _this;
    }
    AnimateSharedLayout.prototype.componentDidMount = function () {
        this.hasMounted = true;
        this.updateStacks();
    };
    AnimateSharedLayout.prototype.componentDidUpdate = function () {
        this.startLayoutAnimation();
    };
    AnimateSharedLayout.prototype.shouldComponentUpdate = function () {
        this.renderScheduled = true;
        return true;
    };
    AnimateSharedLayout.prototype.startLayoutAnimation = function () {
        var _this = this;
        /**
         * Reset update and render scheduled status
         */
        this.renderScheduled = this.updateScheduled = false;
        var type = this.props.type;
        /**
         * Update presence metadata based on the latest AnimatePresence status.
         * This is a kind of goofy way of dealing with this, perhaps there's a better model to find.
         */
        this.children.forEach(function (child) {
            if (!child.isPresent) {
                child.presence = Presence.Exiting;
            }
            else if (child.presence !== Presence.Entering) {
                child.presence =
                    child.presence === Presence.Exiting
                        ? Presence.Entering
                        : Presence.Present;
            }
        });
        /**
         * In every layoutId stack, nominate a component to lead the animation and another
         * to follow
         */
        this.updateStacks();
        /**
         * Decide which animation to use between shared layoutId components
         */
        var createAnimation = type === "crossfade"
            ? createCrossfadeAnimation
            : createSwitchAnimation;
        /**
         * Create a handler which we can use to flush the children animations
         */
        var handler = {
            measureLayout: function (child) { return child.measureLayout(); },
            layoutReady: function (child) {
                var layoutId = child.layoutId;
                child.layoutReady(createAnimation(child, _this.getStack(layoutId)));
            },
            parent: this.context.visualElement,
        };
        /**
         * Shared layout animations can be used without the AnimateSharedLayout wrapping component.
         * This requires some co-ordination across components to stop layout thrashing
         * and ensure measurements are taken at the correct time.
         *
         * Here we use that same mechanism of schedule/flush.
         */
        this.children.forEach(function (child) { return _this.syncContext.add(child); });
        this.syncContext.flush(handler);
        /**
         * Clear snapshots so subsequent rerenders don't retain memory of outgoing components
         */
        this.stacks.forEach(function (stack) { return (stack.snapshot = undefined); });
    };
    AnimateSharedLayout.prototype.updateStacks = function () {
        this.stacks.forEach(function (stack) { return stack.updateLeadAndFollow(); });
    };
    AnimateSharedLayout.prototype.scheduleUpdate = function (force) {
        if (force === void 0) { force = false; }
        if (!(force || !this.updateScheduled))
            return;
        /**
         * Flag we've scheduled an update
         */
        this.updateScheduled = true;
        /**
         * Write: Reset rotation transforms so bounding boxes can be accurately measured.
         */
        this.children.forEach(function (child) { return resetRotate(child); });
        /**
         * Read: Snapshot children
         */
        this.children.forEach(function (child) { return child.snapshotBoundingBox(); });
        /**
         * Every child keeps a local snapshot, but we also want to record
         * snapshots of the visible children as, if they're are being removed
         * in this render, we can still access them.
         */
        this.stacks.forEach(function (stack) { return stack.updateSnapshot(); });
        /**
         * Force a rerender by setting state if we aren't already going to render.
         */
        if (force || !this.renderScheduled) {
            this.renderScheduled = true;
            this.forceUpdate();
        }
    };
    AnimateSharedLayout.prototype.addChild = function (child) {
        this.children.add(child);
        this.addToStack(child);
        child.presence = this.hasMounted ? Presence.Entering : Presence.Present;
    };
    AnimateSharedLayout.prototype.removeChild = function (child) {
        this.scheduleUpdate();
        this.children.delete(child);
        this.removeFromStack(child);
    };
    AnimateSharedLayout.prototype.addToStack = function (child) {
        var stack = this.getStack(child.layoutId);
        stack === null || stack === void 0 ? void 0 : stack.add(child);
    };
    AnimateSharedLayout.prototype.removeFromStack = function (child) {
        var stack = this.getStack(child.layoutId);
        stack === null || stack === void 0 ? void 0 : stack.remove(child);
    };
    /**
     * Return a stack of animate children based on the provided layoutId.
     * Will create a stack if none currently exists with that layoutId.
     */
    AnimateSharedLayout.prototype.getStack = function (id) {
        if (id === undefined)
            return;
        // Create stack if it doesn't already exist
        !this.stacks.has(id) && this.stacks.set(id, new LayoutStack());
        return this.stacks.get(id);
    };
    AnimateSharedLayout.prototype.render = function () {
        return (Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(SharedLayoutContext.Provider, { value: this.syncContext }, this.props.children));
    };
    AnimateSharedLayout.contextType = MotionContext;
    return AnimateSharedLayout;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]));

/**
 * Creates a `MotionValue` to track the state and velocity of a value.
 *
 * Usually, these are created automatically. For advanced use-cases, like use with `useTransform`, you can create `MotionValue`s externally and pass them into the animated component via the `style` prop.
 *
 * @library
 *
 * ```jsx
 * export function MyComponent() {
 *   const scale = useMotionValue(1)
 *
 *   return <Frame scale={scale} />
 * }
 * ```
 *
 * @motion
 *
 * ```jsx
 * export const MyComponent = () => {
 *   const scale = useMotionValue(1)
 *
 *   return <motion.div style={{ scale }} />
 * }
 * ```
 *
 * @param initial - The initial state.
 *
 * @public
 */
function useMotionValue(initial) {
    return useConstant(function () { return motionValue(initial); });
}

function useOnChange(value, callback) {
    Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
        return isMotionValue(value) ? value.onChange(callback) : undefined;
    });
}
function useMultiOnChange(values, handler) {
    Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
        var subscriptions = values.map(function (value) { return value.onChange(handler); });
        return function () { return subscriptions.forEach(function (unsubscribe) { return unsubscribe(); }); };
    });
}

function useCombineMotionValues(values, combineValues) {
    /**
     * Initialise the returned motion value. This remains the same between renders.
     */
    var value = useMotionValue(combineValues());
    /**
     * Create a function that will update the template motion value with the latest values.
     * This is pre-bound so whenever a motion value updates it can schedule its
     * execution in Framesync. If it's already been scheduled it won't be fired twice
     * in a single frame.
     */
    var updateValue = function () { return value.set(combineValues()); };
    /**
     * Synchronously update the motion value with the latest values during the render.
     * This ensures that within a React render, the styles applied to the DOM are up-to-date.
     */
    updateValue();
    /**
     * Subscribe to all motion values found within the template. Whenever any of them change,
     * schedule an update.
     */
    useMultiOnChange(values, function () { return framesync__WEBPACK_IMPORTED_MODULE_1__["default"].update(updateValue, false, true); });
    return value;
}

/**
 * Combine multiple motion values into a new one using a string template literal.
 *
 * ```jsx
 * import {
 *   motion,
 *   useSpring,
 *   useMotionValue,
 *   useMotionTemplate
 * } from "framer-motion"
 *
 * function Component() {
 *   const shadowX = useSpring(0)
 *   const shadowY = useMotionValue(0)
 *   const shadow = useMotionTemplate`drop-shadow(${shadowX}px ${shadowY}px 20px rgba(0,0,0,0.3))`
 *
 *   return <motion.div style={{ filter: shadow }} />
 * }
 * ```
 *
 * @public
 */
function useMotionTemplate(fragments) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    /**
     * Create a function that will build a string from the latest motion values.
     */
    var numFragments = fragments.length;
    function buildValue() {
        var output = "";
        for (var i = 0; i < numFragments; i++) {
            output += fragments[i];
            var value = values[i];
            if (value)
                output += values[i].get();
        }
        return output;
    }
    return useCombineMotionValues(values, buildValue);
}

/**
 * If the provided value is a MotionValue, this returns the actual value, otherwise just the value itself
 *
 * TODO: Remove and move to library
 *
 * @internal
 */
function resolveMotionValue(value) {
    var unwrappedValue = value instanceof MotionValue ? value.get() : value;
    return isCustomValue(unwrappedValue)
        ? unwrappedValue.toValue()
        : unwrappedValue;
}

var isCustomValueType = function (v) {
    return typeof v === "object" && v.mix;
};
var getMixer = function (v) { return (isCustomValueType(v) ? v.mix : undefined); };
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
    var interpolator = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["interpolate"])(inputRange, outputRange, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ mixer: getMixer(outputRange[0]) }, options));
    return useImmediate ? interpolator(inputValue) : interpolator;
}

function useTransform(input, inputRangeOrTransformer, outputRange, options) {
    var transformer = typeof inputRangeOrTransformer === "function"
        ? inputRangeOrTransformer
        : transform(inputRangeOrTransformer, outputRange, options);
    return Array.isArray(input)
        ? useListTransform(input, transformer)
        : useListTransform([input], function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 1), latest = _b[0];
            return transformer(latest);
        });
}
function useListTransform(values, transformer) {
    var latest = useConstant(function () { return []; });
    return useCombineMotionValues(values, function () {
        latest.length = 0;
        var numValues = values.length;
        for (var i = 0; i < numValues; i++) {
            latest[i] = values[i].get();
        }
        return transformer(latest);
    });
}

/**
 * Creates a `MotionValue` that, when `set`, will use a spring animation to animate to its new state.
 *
 * It can either work as a stand-alone `MotionValue` by initialising it with a value, or as a subscriber
 * to another `MotionValue`.
 *
 * @remarks
 *
 * ```jsx
 * const x = useSpring(0, { stiffness: 300 })
 * const y = useSpring(x, { damping: 10 })
 * ```
 *
 * @param inputValue - `MotionValue` or number. If provided a `MotionValue`, when the input `MotionValue` changes, the created `MotionValue` will spring towards that value.
 * @param springConfig - Configuration options for the spring.
 * @returns `MotionValue`
 *
 * @public
 */
function useSpring(source, config) {
    if (config === void 0) { config = {}; }
    var isStatic = Object(react__WEBPACK_IMPORTED_MODULE_5__["useContext"])(MotionConfigContext).isStatic;
    var activeSpringAnimation = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(null);
    var value = useMotionValue(isMotionValue(source) ? source.get() : source);
    Object(react__WEBPACK_IMPORTED_MODULE_5__["useMemo"])(function () {
        return value.attach(function (v, set) {
            /**
             * A more hollistic approach to this might be to use isStatic to fix VisualElement animations
             * at that level, but this will work for now
             */
            if (isStatic)
                return set(v);
            if (activeSpringAnimation.current) {
                activeSpringAnimation.current.stop();
            }
            activeSpringAnimation.current = Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["animate"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ from: value.get(), to: v, velocity: value.getVelocity() }, config), { onUpdate: set }));
            return value.get();
        });
    }, Object.values(config));
    useOnChange(source, function (v) { return value.set(parseFloat(v)); });
    return value;
}

function createScrollMotionValues() {
    return {
        scrollX: motionValue(0),
        scrollY: motionValue(0),
        scrollXProgress: motionValue(0),
        scrollYProgress: motionValue(0),
    };
}
function setProgress(offset, maxOffset, value) {
    value.set(!offset || !maxOffset ? 0 : offset / maxOffset);
}
function createScrollUpdater(values, getOffsets) {
    var update = function () {
        var _a = getOffsets(), xOffset = _a.xOffset, yOffset = _a.yOffset, xMaxOffset = _a.xMaxOffset, yMaxOffset = _a.yMaxOffset;
        // Set absolute positions
        values.scrollX.set(xOffset);
        values.scrollY.set(yOffset);
        // Set 0-1 progress
        setProgress(xOffset, xMaxOffset, values.scrollXProgress);
        setProgress(yOffset, yMaxOffset, values.scrollYProgress);
    };
    update();
    return update;
}

var getElementScrollOffsets = function (element) { return function () {
    return {
        xOffset: element.scrollLeft,
        yOffset: element.scrollTop,
        xMaxOffset: element.scrollWidth - element.offsetWidth,
        yMaxOffset: element.scrollHeight - element.offsetHeight,
    };
}; };
/**
 * Returns MotionValues that update when the provided element scrolls:
 *
 * - `scrollX` — Horizontal scroll distance in pixels.
 * - `scrollY` — Vertical scroll distance in pixels.
 * - `scrollXProgress` — Horizontal scroll progress between `0` and `1`.
 * - `scrollYProgress` — Vertical scroll progress between `0` and `1`.
 *
 * This element must be set to `overflow: scroll` on either or both axes to report scroll offset.
 *
 * @library
 *
 * ```jsx
 * import * as React from "react"
 * import {
 *   Frame,
 *   useElementScroll,
 *   useTransform
 * } from "framer"
 *
 * export function MyComponent() {
 *   const ref = React.useRef()
 *   const { scrollYProgress } = useElementScroll(ref)
 *
 *   return (
 *     <Frame ref={ref}>
 *       <Frame scaleX={scrollYProgress} />
 *     </Frame>
 *   )
 * }
 * ```
 *
 * @motion
 *
 * ```jsx
 * export const MyComponent = () => {
 *   const ref = useRef()
 *   const { scrollYProgress } = useElementScroll(ref)
 *
 *   return (
 *     <div ref={ref}>
 *       <motion.div style={{ scaleX: scrollYProgress }} />
 *     </div>
 *   )
 * }
 * ```
 *
 * @public
 */
function useElementScroll(ref) {
    var values = useConstant(createScrollMotionValues);
    useIsomorphicLayoutEffect(function () {
        var element = ref.current;
        Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__["invariant"])(!!element, "ref provided to useScroll must be passed into a HTML element.");
        if (!element)
            return;
        var updateScrollValues = createScrollUpdater(values, getElementScrollOffsets(element));
        var scrollListener = addDomEvent(element, "scroll", updateScrollValues, { passive: true });
        var resizeListener = addDomEvent(element, "resize", updateScrollValues);
        return function () {
            scrollListener && scrollListener();
            resizeListener && resizeListener();
        };
    }, []);
    return values;
}

var viewportScrollValues;
function getViewportScrollOffsets() {
    return {
        xOffset: window.pageXOffset,
        yOffset: window.pageYOffset,
        xMaxOffset: document.body.clientWidth - window.innerWidth,
        yMaxOffset: document.body.clientHeight - window.innerHeight,
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
/**
 * Returns MotionValues that update when the viewport scrolls:
 *
 * - `scrollX` — Horizontal scroll distance in pixels.
 * - `scrollY` — Vertical scroll distance in pixels.
 * - `scrollXProgress` — Horizontal scroll progress between `0` and `1`.
 * - `scrollYProgress` — Vertical scroll progress between `0` and `1`.
 *
 * @library
 *
 * ```jsx
 * import * as React from "react"
 * import {
 *   Frame,
 *   useViewportScroll,
 *   useTransform
 * } from "framer"
 *
 * export function MyComponent() {
 *   const { scrollYProgress } = useViewportScroll()
 *   return <Frame scaleX={scrollYProgress} />
 * }
 * ```
 *
 * @motion
 *
 * ```jsx
 * export const MyComponent = () => {
 *   const { scrollYProgress } = useViewportScroll()
 *   return <motion.div style={{ scaleX: scrollYProgress }} />
 * }
 * ```
 *
 * @public
 */
function useViewportScroll() {
    /**
     * Lazy-initialise the viewport scroll values
     */
    if (!viewportScrollValues) {
        viewportScrollValues = createScrollMotionValues();
    }
    useIsomorphicLayoutEffect(function () {
        !hasListeners && addEventListeners();
    }, []);
    return viewportScrollValues;
}

// Does this device prefer reduced motion? Returns `null` server-side.
var prefersReducedMotion;
function initPrefersReducedMotion() {
    prefersReducedMotion = motionValue(null);
    if (typeof window === "undefined")
        return;
    if (window.matchMedia) {
        var motionMediaQuery_1 = window.matchMedia("(prefers-reduced-motion)");
        var setReducedMotionPreferences = function () {
            return prefersReducedMotion.set(motionMediaQuery_1.matches);
        };
        motionMediaQuery_1.addListener(setReducedMotionPreferences);
        setReducedMotionPreferences();
    }
    else {
        prefersReducedMotion.set(false);
    }
}
/**
 * A hook that returns `true` if we should be using reduced motion based on the current device's Reduced Motion setting.
 *
 * This can be used to implement changes to your UI based on Reduced Motion. For instance, replacing motion-sickness inducing
 * `x`/`y` animations with `opacity`, disabling the autoplay of background videos, or turning off parallax motion.
 *
 * It will actively respond to changes and re-render your components with the latest setting.
 *
 * ```jsx
 * export function Sidebar({ isOpen }) {
 *   const shouldReduceMotion = useReducedMotion()
 *   const closedX = shouldReduceMotion ? 0 : "-100%"
 *
 *   return (
 *     <motion.div animate={{
 *       opacity: isOpen ? 1 : 0,
 *       x: isOpen ? 0 : closedX
 *     }} />
 *   )
 * }
 * ```
 *
 * @return boolean
 *
 * @public
 */
function useReducedMotion() {
    /**
     * Lazy initialisation of prefersReducedMotion
     */
    !prefersReducedMotion && initPrefersReducedMotion();
    var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(prefersReducedMotion.get()), 2), shouldReduceMotion = _a[0], setShouldReduceMotion = _a[1];
    useOnChange(prefersReducedMotion, setShouldReduceMotion);
    return shouldReduceMotion;
}

/**
 * Creates `AnimationControls`, which can be used to manually start, stop
 * and sequence animations on one or more components.
 *
 * The returned `AnimationControls` should be passed to the `animate` property
 * of the components you want to animate.
 *
 * These components can then be animated with the `start` method.
 *
 * @library
 *
 * ```jsx
 * import * as React from 'react'
 * import { Frame, useAnimation } from 'framer'
 *
 * export function MyComponent(props) {
 *    const controls = useAnimation()
 *
 *    controls.start({
 *        x: 100,
 *        transition: { duration: 0.5 },
 *    })
 *
 *    return <Frame animate={controls} />
 * }
 * ```
 *
 * @motion
 *
 * ```jsx
 * import * as React from 'react'
 * import { motion, useAnimation } from 'framer-motion'
 *
 * export function MyComponent(props) {
 *    const controls = useAnimation()
 *
 *    controls.start({
 *        x: 100,
 *        transition: { duration: 0.5 },
 *    })
 *
 *    return <motion.div animate={controls} />
 * }
 * ```
 *
 * @returns Animation controller with `start` and `stop` methods
 *
 * @public
 */
function useAnimation() {
    var animationControls = useConstant(function () { return new AnimationControls(); });
    Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
        animationControls.mount();
        return function () { return animationControls.unmount(); };
    }, []);
    return animationControls;
}

/**
 * Animate a single value or a `MotionValue`.
 *
 * The first argument is either a `MotionValue` to animate, or an initial animation value.
 *
 * The second is either a value to animate to, or an array of keyframes to animate through.
 *
 * The third argument can be either tween or spring options, and optional lifecycle methods: `onUpdate`, `onPlay`, `onComplete`, `onRepeat` and `onStop`.
 *
 * Returns `PlaybackControls`, currently just a `stop` method.
 *
 * ```javascript
 * const x = useMotionValue(0)
 *
 * useEffect(() => {
 *   const controls = animate(x, 100, {
 *     type: "spring",
 *     stiffness: 2000,
 *     onComplete: v => {}
 *   })
 *
 *   return controls.stop
 * })
 * ```
 *
 * @public
 */
function animate(from, to, transition) {
    if (transition === void 0) { transition = {}; }
    var value = isMotionValue(from) ? from : motionValue(from);
    startAnimation("", value, to, transition);
    return {
        stop: function () { return value.stop(); },
    };
}

/**
 * Cycles through a series of visual properties. Can be used to toggle between or cycle through animations. It works similar to `useState` in React. It is provided an initial array of possible states, and returns an array of two arguments.
 *
 * @library
 *
 * ```jsx
 * import * as React from "react"
 * import { Frame, useCycle } from "framer"
 *
 * export function MyComponent() {
 *   const [x, cycleX] = useCycle(0, 50, 100)
 *
 *   return (
 *     <Frame
 *       animate={{ x: x }}
 *       onTap={() => cycleX()}
 *      />
 *    )
 * }
 * ```
 *
 * @motion
 *
 * An index value can be passed to the returned `cycle` function to cycle to a specific index.
 *
 * ```jsx
 * import * as React from "react"
 * import { motion, useCycle } from "framer-motion"
 *
 * export const MyComponent = () => {
 *   const [x, cycleX] = useCycle(0, 50, 100)
 *
 *   return (
 *     <motion.div
 *       animate={{ x: x }}
 *       onTap={() => cycleX()}
 *      />
 *    )
 * }
 * ```
 *
 * @param items - items to cycle through
 * @returns [currentState, cycleState]
 *
 * @public
 */
function useCycle() {
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
    }
    var index = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(0);
    var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(items[index.current]), 2), item = _a[0], setItem = _a[1];
    return [
        item,
        function (next) {
            index.current =
                typeof next !== "number"
                    ? Object(popmotion__WEBPACK_IMPORTED_MODULE_2__["wrap"])(0, items.length, index.current + 1)
                    : next;
            setItem(items[index.current]);
        },
    ];
}

/**
 * Can manually trigger a drag gesture on one or more `drag`-enabled `motion` components.
 *
 * @library
 *
 * ```jsx
 * const dragControls = useDragControls()
 *
 * function startDrag(event) {
 *   dragControls.start(event, { snapToCursor: true })
 * }
 *
 * return (
 *   <>
 *     <Frame onTapStart={startDrag} />
 *     <Frame drag="x" dragControls={dragControls} />
 *   </>
 * )
 * ```
 *
 * @motion
 *
 * ```jsx
 * const dragControls = useDragControls()
 *
 * function startDrag(event) {
 *   dragControls.start(event, { snapToCursor: true })
 * }
 *
 * return (
 *   <>
 *     <div onPointerDown={startDrag} />
 *     <motion.div drag="x" dragControls={dragControls} />
 *   </>
 * )
 * ```
 *
 * @public
 */
var DragControls = /** @class */ (function () {
    function DragControls() {
        this.componentControls = new Set();
    }
    /**
     * Subscribe a component's internal `VisualElementDragControls` to the user-facing API.
     *
     * @internal
     */
    DragControls.prototype.subscribe = function (controls) {
        var _this = this;
        this.componentControls.add(controls);
        return function () { return _this.componentControls.delete(controls); };
    };
    /**
     * Start a drag gesture on every `motion` component that has this set of drag controls
     * passed into it via the `dragControls` prop.
     *
     * ```jsx
     * dragControls.start(e, {
     *   snapToCursor: true
     * })
     * ```
     *
     * @param event - PointerEvent
     * @param options - Options
     *
     * @public
     */
    DragControls.prototype.start = function (event, options) {
        this.componentControls.forEach(function (controls) {
            controls.start(event.nativeEvent || event, options);
        });
    };
    DragControls.prototype.updateConstraints = function () {
        this.componentControls.forEach(function (controls) {
            controls.prepareBoundingBox();
            controls.resolveDragConstraints();
        });
    };
    return DragControls;
}());
var createDragControls = function () { return new DragControls(); };
/**
 * Usually, dragging is initiated by pressing down on a `motion` component with a `drag` prop
 * and moving it. For some use-cases, for instance clicking at an arbitrary point on a video scrubber, we
 * might want to initiate that dragging from a different component than the draggable one.
 *
 * By creating a `dragControls` using the `useDragControls` hook, we can pass this into
 * the draggable component's `dragControls` prop. It exposes a `start` method
 * that can start dragging from pointer events on other components.
 *
 * @library
 *
 * ```jsx
 * const dragControls = useDragControls()
 *
 * function startDrag(event) {
 *   dragControls.start(event, { snapToCursor: true })
 * }
 *
 * return (
 *   <>
 *     <Frame onTapStart={startDrag} />
 *     <Frame drag="x" dragControls={dragControls} />
 *   </>
 * )
 * ```
 *
 * @motion
 *
 * ```jsx
 * const dragControls = useDragControls()
 *
 * function startDrag(event) {
 *   dragControls.start(event, { snapToCursor: true })
 * }
 *
 * return (
 *   <>
 *     <div onPointerDown={startDrag} />
 *     <motion.div drag="x" dragControls={dragControls} />
 *   </>
 * )
 * ```
 *
 * @public
 */
function useDragControls() {
    return useConstant(createDragControls);
}

/**
 * Uses the ref that is passed in, or creates a new one
 * @param external - External ref
 * @internal
 */
function useExternalRef(externalRef) {
    // We're conditionally calling `useRef` here which is sort of naughty as hooks
    // shouldn't be called conditionally. However, Framer Motion will break if this
    // condition changes anyway. It might be possible to use an invariant here to
    // make it explicit, but I expect changing `ref` is not normal behaviour.
    var ref = !externalRef || typeof externalRef === "function"
        ? Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(null)
        : externalRef;
    // Handle `ref` functions. Again, calling the hook conditionally is kind of naughty
    // but `ref` types changing between renders would break Motion anyway. If we receive
    // bug reports about this, we should track the provided ref and throw an invariant
    // rather than move the conditional to inside the useEffect as this will be fired
    // for every Frame component within Framer.
    if (externalRef && typeof externalRef === "function") {
        Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
            externalRef(ref.current);
            return function () { return externalRef(null); };
        }, []);
    }
    return ref;
}

/**
 * This is just a very basic VisualElement, more of a hack to keep supporting useAnimatedState with
 * the latest APIs.
 */
var StateVisualElement = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(StateVisualElement, _super);
    function StateVisualElement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.initialState = {};
        return _this;
    }
    StateVisualElement.prototype.updateLayoutDelta = function () { };
    StateVisualElement.prototype.build = function () { };
    StateVisualElement.prototype.clean = function () { };
    StateVisualElement.prototype.makeTargetAnimatable = function (_a) {
        var transition = _a.transition, transitionEnd = _a.transitionEnd, target = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["transition", "transitionEnd"]);
        var origin = getOrigin(target, transition || {}, this);
        checkTargetForNewValues(this, target, origin);
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ transition: transition, transitionEnd: transitionEnd }, target);
    };
    StateVisualElement.prototype.getBoundingBox = function () {
        return { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
    };
    StateVisualElement.prototype.readNativeValue = function (key) {
        return this.initialState[key] || 0;
    };
    StateVisualElement.prototype.render = function () {
        this.build();
    };
    return StateVisualElement;
}(VisualElement));
/**
 * This is not an officially supported API and may be removed
 * on any version.
 * @internal
 */
function useAnimatedState(initialState) {
    var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(initialState), 2), animationState = _a[0], setAnimationState = _a[1];
    var visualElement = useConstant(function () { return new StateVisualElement(); });
    visualElement.updateConfig({
        onUpdate: function (v) { return setAnimationState(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, v)); },
    });
    visualElement.initialState = initialState;
    Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
        visualElement.mount({});
        return function () { return visualElement.unmount(); };
    }, []);
    var startAnimation = useConstant(function () { return function (animationDefinition) {
        return animateVisualElement(visualElement, animationDefinition);
    }; });
    return [animationState, startAnimation];
}

// Keep things reasonable and avoid scale: Infinity. In practise we might need
// to add another value, opacity, that could interpolate scaleX/Y [0,0.01] => [0,1]
// to simply hide content at unreasonable scales.
var maxScale = 100000;
var invertScale = function (scale) {
    return scale > 0.001 ? 1 / scale : maxScale;
};
var hasWarned = false;
/**
 * Returns a `MotionValue` each for `scaleX` and `scaleY` that update with the inverse
 * of their respective parent scales.
 *
 * This is useful for undoing the distortion of content when scaling a parent component.
 *
 * By default, `useInvertedScale` will automatically fetch `scaleX` and `scaleY` from the nearest parent.
 * By passing other `MotionValue`s in as `useInvertedScale({ scaleX, scaleY })`, it will invert the output
 * of those instead.
 *
 * @motion
 *
 * ```jsx
 * const MyComponent = () => {
 *   const { scaleX, scaleY } = useInvertedScale()
 *   return <motion.div style={{ scaleX, scaleY }} />
 * }
 * ```
 *
 * @library
 *
 * ```jsx
 * function MyComponent() {
 *   const { scaleX, scaleY } = useInvertedScale()
 *   return <Frame scaleX={scaleX} scaleY={scaleY} />
 * }
 * ```
 *
 * @deprecated
 */
function useInvertedScale(scale) {
    var parentScaleX = useMotionValue(1);
    var parentScaleY = useMotionValue(1);
    var visualElement = useVisualElementContext();
    Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__["invariant"])(!!(scale || visualElement), "If no scale values are provided, useInvertedScale must be used within a child of another motion component.");
    Object(hey_listen__WEBPACK_IMPORTED_MODULE_3__["warning"])(hasWarned, "useInvertedScale is deprecated and will be removed in 3.0. Use the layout prop instead.");
    hasWarned = true;
    if (scale) {
        parentScaleX = scale.scaleX || parentScaleX;
        parentScaleY = scale.scaleY || parentScaleY;
    }
    else if (visualElement) {
        parentScaleX = visualElement.getValue("scaleX", 1);
        parentScaleY = visualElement.getValue("scaleY", 1);
    }
    var scaleX = useTransform(parentScaleX, invertScale);
    var scaleY = useTransform(parentScaleY, invertScale);
    return { scaleX: scaleX, scaleY: scaleY };
}




/***/ }),

/***/ "../../node_modules/framer-motion/node_modules/tslib/tslib.es6.js":
/*!******************************************************************************!*\
  !*** /z/monorepo/node_modules/framer-motion/node_modules/tslib/tslib.es6.js ***!
  \******************************************************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
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

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
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


/***/ }),

/***/ "../../node_modules/framesync/dist/framesync.es.js":
/*!***************************************************************!*\
  !*** /z/monorepo/node_modules/framesync/dist/framesync.es.js ***!
  \***************************************************************/
/*! exports provided: default, cancelSync, getFrameData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cancelSync", function() { return cancelSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFrameData", function() { return getFrameData; });
var defaultTimestep = 1 / 60 * 1000;
var onNextFrame = typeof window !== "undefined" ? function (callback) {
    return window.requestAnimationFrame(callback);
} : function (callback) {
    return setTimeout(function () {
        return callback(performance.now());
    }, defaultTimestep);
};

function createRenderStep(runNextFrame) {
    var toRun = [];
    var toRunNextFrame = [];
    var numToRun = 0;
    var isProcessing = false;
    var toKeepAlive = new WeakSet();
    var step = {
        schedule: function (callback, keepAlive, immediate) {
            if (keepAlive === void 0) {
                keepAlive = false;
            }
            if (immediate === void 0) {
                immediate = false;
            }
            var addToCurrentFrame = immediate && isProcessing;
            var buffer = addToCurrentFrame ? toRun : toRunNextFrame;
            if (keepAlive) toKeepAlive.add(callback);
            if (buffer.indexOf(callback) === -1) {
                buffer.push(callback);
                if (addToCurrentFrame && isProcessing) numToRun = toRun.length;
            }
            return callback;
        },
        cancel: function (callback) {
            var index = toRunNextFrame.indexOf(callback);
            if (index !== -1) toRunNextFrame.splice(index, 1);
            toKeepAlive.delete(callback);
        },
        process: function (frameData) {
            var _a;
            isProcessing = true;
            _a = [toRunNextFrame, toRun], toRun = _a[0], toRunNextFrame = _a[1];
            toRunNextFrame.length = 0;
            numToRun = toRun.length;
            if (numToRun) {
                for (var i = 0; i < numToRun; i++) {
                    var callback = toRun[i];
                    callback(frameData);
                    if (toKeepAlive.has(callback)) {
                        step.schedule(callback);
                        runNextFrame();
                    }
                }
            }
            isProcessing = false;
        }
    };
    return step;
}

var maxElapsed = 40;
var useDefaultElapsed = true;
var runNextFrame = false;
var isProcessing = false;
var frame = {
    delta: 0,
    timestamp: 0
};
var stepsOrder = ["read", "update", "preRender", "render", "postRender"];
var steps = /*#__PURE__*/stepsOrder.reduce(function (acc, key) {
    acc[key] = createRenderStep(function () {
        return runNextFrame = true;
    });
    return acc;
}, {});
var sync = /*#__PURE__*/stepsOrder.reduce(function (acc, key) {
    var step = steps[key];
    acc[key] = function (process, keepAlive, immediate) {
        if (keepAlive === void 0) {
            keepAlive = false;
        }
        if (immediate === void 0) {
            immediate = false;
        }
        if (!runNextFrame) startLoop();
        return step.schedule(process, keepAlive, immediate);
    };
    return acc;
}, {});
var cancelSync = /*#__PURE__*/stepsOrder.reduce(function (acc, key) {
    acc[key] = steps[key].cancel;
    return acc;
}, {});
var processStep = function (stepId) {
    return steps[stepId].process(frame);
};
var processFrame = function (timestamp) {
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
var startLoop = function () {
    runNextFrame = true;
    useDefaultElapsed = true;
    if (!isProcessing) onNextFrame(processFrame);
};
var getFrameData = function () {
    return frame;
};

/* harmony default export */ __webpack_exports__["default"] = (sync);



/***/ }),

/***/ "../../node_modules/gatsby-link/index.js":
/*!*****************************************************!*\
  !*** /z/monorepo/node_modules/gatsby-link/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.withPrefix = withPrefix;
exports.withAssetPrefix = withAssetPrefix;
exports.navigateTo = exports.replace = exports.push = exports.navigate = exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "../../node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "../../node_modules/@babel/runtime/helpers/inheritsLoose.js"));

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "../../node_modules/@babel/runtime/helpers/extends.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "../../node_modules/prop-types/index.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router = __webpack_require__(/*! @reach/router */ "@reach/router");

var _utils = __webpack_require__(/*! @reach/router/lib/utils */ "../../node_modules/@reach/router/lib/utils.js");

var _parsePath = __webpack_require__(/*! ./parse-path */ "../../node_modules/gatsby-link/parse-path.js");

exports.parsePath = _parsePath.parsePath;

var isAbsolutePath = function isAbsolutePath(path) {
  return path === null || path === void 0 ? void 0 : path.startsWith("/");
};

function withPrefix(path, prefix) {
  var _ref, _prefix;

  if (prefix === void 0) {
    prefix = getGlobalBasePrefix();
  }

  if (!isLocalLink(path)) {
    return path;
  }

  if (path.startsWith("./") || path.startsWith("../")) {
    return path;
  }

  var base = (_ref = (_prefix = prefix) !== null && _prefix !== void 0 ? _prefix : getGlobalPathPrefix()) !== null && _ref !== void 0 ? _ref : "/";
  return "" + ((base === null || base === void 0 ? void 0 : base.endsWith("/")) ? base.slice(0, -1) : base) + (path.startsWith("/") ? path : "/" + path);
} // These global values are wrapped in typeof clauses to ensure the values exist.
// This is especially problematic in unit testing of this component.


var getGlobalPathPrefix = function getGlobalPathPrefix() {
  return  false ? undefined : "";
};

var getGlobalBasePrefix = function getGlobalBasePrefix() {
  return  false ? undefined : "";
};

var isLocalLink = function isLocalLink(path) {
  return path && !path.startsWith("http://") && !path.startsWith("https://") && !path.startsWith("//");
};

function withAssetPrefix(path) {
  return withPrefix(path, getGlobalPathPrefix());
}

function absolutify(path, current) {
  // If it's already absolute, return as-is
  if (isAbsolutePath(path)) {
    return path;
  }

  return (0, _utils.resolve)(path, current);
}

var rewriteLinkPath = function rewriteLinkPath(path, relativeTo) {
  if (typeof path === "number") {
    return path;
  }

  if (!isLocalLink(path)) {
    return path;
  }

  return isAbsolutePath(path) ? withPrefix(path) : absolutify(path, relativeTo);
};

var NavLinkPropTypes = {
  activeClassName: _propTypes.default.string,
  activeStyle: _propTypes.default.object,
  partiallyActive: _propTypes.default.bool
}; // Set up IntersectionObserver

var createIntersectionObserver = function createIntersectionObserver(el, cb) {
  var io = new window.IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (el === entry.target) {
        // Check if element is within viewport, remove listener, destroy observer, and run link callback.
        // MSEdge doesn't currently support isIntersecting, so also test for  an intersectionRatio > 0
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          io.unobserve(el);
          io.disconnect();
          cb();
        }
      }
    });
  }); // Add element to the observer

  io.observe(el);
  return {
    instance: io,
    el: el
  };
};

function GatsbyLinkLocationWrapper(props) {
  return /*#__PURE__*/_react.default.createElement(_router.Location, null, function (_ref2) {
    var location = _ref2.location;
    return /*#__PURE__*/_react.default.createElement(GatsbyLink, (0, _extends2.default)({}, props, {
      _location: location
    }));
  });
}

var GatsbyLink = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2.default)(GatsbyLink, _React$Component);

  function GatsbyLink(props) {
    var _this;

    _this = _React$Component.call(this, props) || this; // Default to no support for IntersectionObserver

    _this.defaultGetProps = function (_ref3) {
      var isPartiallyCurrent = _ref3.isPartiallyCurrent,
          isCurrent = _ref3.isCurrent;

      if (_this.props.partiallyActive ? isPartiallyCurrent : isCurrent) {
        return {
          className: [_this.props.className, _this.props.activeClassName].filter(Boolean).join(" "),
          style: (0, _extends2.default)({}, _this.props.style, _this.props.activeStyle)
        };
      }

      return null;
    };

    var IOSupported = false;

    if (typeof window !== "undefined" && window.IntersectionObserver) {
      IOSupported = true;
    }

    _this.state = {
      IOSupported: IOSupported
    };
    _this.handleRef = _this.handleRef.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  var _proto = GatsbyLink.prototype;

  _proto._prefetch = function _prefetch() {
    var currentPath = window.location.pathname; // reach router should have the correct state

    if (this.props._location && this.props._location.pathname) {
      currentPath = this.props._location.pathname;
    }

    var rewrittenPath = rewriteLinkPath(this.props.to, currentPath);
    var newPathName = (0, _parsePath.parsePath)(rewrittenPath).pathname; // Prefech is used to speed up next navigations. When you use it on the current navigation,
    // there could be a race-condition where Chrome uses the stale data instead of waiting for the network to complete

    if (currentPath !== newPathName) {
      ___loader.enqueue(newPathName);
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    // Preserve non IO functionality if no support
    if (this.props.to !== prevProps.to && !this.state.IOSupported) {
      this._prefetch();
    }
  };

  _proto.componentDidMount = function componentDidMount() {
    // Preserve non IO functionality if no support
    if (!this.state.IOSupported) {
      this._prefetch();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (!this.io) {
      return;
    }

    var _this$io = this.io,
        instance = _this$io.instance,
        el = _this$io.el;
    instance.unobserve(el);
    instance.disconnect();
  };

  _proto.handleRef = function handleRef(ref) {
    var _this2 = this;

    if (this.props.innerRef && this.props.innerRef.hasOwnProperty("current")) {
      this.props.innerRef.current = ref;
    } else if (this.props.innerRef) {
      this.props.innerRef(ref);
    }

    if (this.state.IOSupported && ref) {
      // If IO supported and element reference found, setup Observer functionality
      this.io = createIntersectionObserver(ref, function () {
        _this2._prefetch();
      });
    }
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props = this.props,
        to = _this$props.to,
        _this$props$getProps = _this$props.getProps,
        getProps = _this$props$getProps === void 0 ? this.defaultGetProps : _this$props$getProps,
        _onClick = _this$props.onClick,
        _onMouseEnter = _this$props.onMouseEnter,
        $activeClassName = _this$props.activeClassName,
        $activeStyle = _this$props.activeStyle,
        $innerRef = _this$props.innerRef,
        partiallyActive = _this$props.partiallyActive,
        state = _this$props.state,
        replace = _this$props.replace,
        _location = _this$props._location,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["to", "getProps", "onClick", "onMouseEnter", "activeClassName", "activeStyle", "innerRef", "partiallyActive", "state", "replace", "_location"]);

    if (false) {}

    var prefixedTo = rewriteLinkPath(to, _location.pathname);

    if (!isLocalLink(prefixedTo)) {
      return /*#__PURE__*/_react.default.createElement("a", (0, _extends2.default)({
        href: prefixedTo
      }, rest));
    }

    return /*#__PURE__*/_react.default.createElement(_router.Link, (0, _extends2.default)({
      to: prefixedTo,
      state: state,
      getProps: getProps,
      innerRef: this.handleRef,
      onMouseEnter: function onMouseEnter(e) {
        if (_onMouseEnter) {
          _onMouseEnter(e);
        }

        ___loader.hovering((0, _parsePath.parsePath)(prefixedTo).pathname);
      },
      onClick: function onClick(e) {
        if (_onClick) {
          _onClick(e);
        }

        if (e.button === 0 && // ignore right clicks
        !_this3.props.target && // let browser handle "target=_blank"
        !e.defaultPrevented && // onClick prevented default
        !e.metaKey && // ignore clicks with modifier keys...
        !e.altKey && !e.ctrlKey && !e.shiftKey) {
          e.preventDefault();
          var shouldReplace = replace;

          var isCurrent = encodeURI(prefixedTo) === _location.pathname;

          if (typeof replace !== "boolean" && isCurrent) {
            shouldReplace = true;
          } // Make sure the necessary scripts and data are
          // loaded before continuing.


          window.___navigate(prefixedTo, {
            state: state,
            replace: shouldReplace
          });
        }

        return true;
      }
    }, rest));
  };

  return GatsbyLink;
}(_react.default.Component);

GatsbyLink.propTypes = (0, _extends2.default)({}, NavLinkPropTypes, {
  onClick: _propTypes.default.func,
  to: _propTypes.default.string.isRequired,
  replace: _propTypes.default.bool,
  state: _propTypes.default.object
});

var showDeprecationWarning = function showDeprecationWarning(functionName, altFunctionName, version) {
  return console.warn("The \"" + functionName + "\" method is now deprecated and will be removed in Gatsby v" + version + ". Please use \"" + altFunctionName + "\" instead.");
};

var _default = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(GatsbyLinkLocationWrapper, (0, _extends2.default)({
    innerRef: ref
  }, props));
});

exports.default = _default;

var navigate = function navigate(to, options) {
  window.___navigate(rewriteLinkPath(to, window.location.pathname), options);
};

exports.navigate = navigate;

var push = function push(to) {
  showDeprecationWarning("push", "navigate", 3);

  window.___push(rewriteLinkPath(to, window.location.pathname));
};

exports.push = push;

var replace = function replace(to) {
  showDeprecationWarning("replace", "navigate", 3);

  window.___replace(rewriteLinkPath(to, window.location.pathname));
}; // TODO: Remove navigateTo for Gatsby v3


exports.replace = replace;

var navigateTo = function navigateTo(to) {
  showDeprecationWarning("navigateTo", "navigate", 3);
  return push(to);
};

exports.navigateTo = navigateTo;

/***/ }),

/***/ "../../node_modules/gatsby-link/parse-path.js":
/*!**********************************************************!*\
  !*** /z/monorepo/node_modules/gatsby-link/parse-path.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.parsePath = parsePath;

function parsePath(path) {
  var pathname = path || "/";
  var search = "";
  var hash = "";
  var hashIndex = pathname.indexOf("#");

  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf("?");

  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === "?" ? "" : search,
    hash: hash === "#" ? "" : hash
  };
}

/***/ }),

/***/ "../../node_modules/gatsby-plugin-manifest/common.js":
/*!*****************************************************************!*\
  !*** /z/monorepo/node_modules/gatsby-plugin-manifest/common.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");var _fs=_interopRequireDefault(__webpack_require__(/*! fs */ "fs"));var _path=_interopRequireDefault(__webpack_require__(/*! path */ "path"));exports.favicons=[{src:"favicon-32x32.png",sizes:"32x32",type:"image/png"}];// default icons for generating icons
exports.defaultIcons=[{src:"icons/icon-48x48.png",sizes:"48x48",type:"image/png"},{src:"icons/icon-72x72.png",sizes:"72x72",type:"image/png"},{src:"icons/icon-96x96.png",sizes:"96x96",type:"image/png"},{src:"icons/icon-144x144.png",sizes:"144x144",type:"image/png"},{src:"icons/icon-192x192.png",sizes:"192x192",type:"image/png"},{src:"icons/icon-256x256.png",sizes:"256x256",type:"image/png"},{src:"icons/icon-384x384.png",sizes:"384x384",type:"image/png"},{src:"icons/icon-512x512.png",sizes:"512x512",type:"image/png"}];/**
 * Check if the icon exists on the filesystem
 *
 * @param {String} srcIcon Path of the icon
 */exports.doesIconExist=function doesIconExist(srcIcon){try{return _fs.default.statSync(srcIcon).isFile();}catch(e){if(e.code!=="ENOENT"){throw e;}return false;}};/**
 * @param {string} path The generic path to an icon
 * @param {string} digest The digest of the icon provided in the plugin's options.
 */exports.addDigestToPath=function(path,digest,method){if(method==="name"){var parsedPath=_path.default.parse(path);return parsedPath.dir+"/"+parsedPath.name+"-"+digest+parsedPath.ext;}if(method==="query"){return path+"?v="+digest;}return path;};

/***/ }),

/***/ "../../node_modules/gatsby-plugin-manifest/gatsby-ssr.js":
/*!*********************************************************************!*\
  !*** /z/monorepo/node_modules/gatsby-plugin-manifest/gatsby-ssr.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");var _interopRequireWildcard=__webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../../node_modules/@babel/runtime/helpers/interopRequireWildcard.js");var React=_interopRequireWildcard(__webpack_require__(/*! react */ "react"));var _gatsby=__webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");var _common=__webpack_require__(/*! ./common.js */ "../../node_modules/gatsby-plugin-manifest/common.js");var _getManifestPathname=_interopRequireDefault(__webpack_require__(/*! ./get-manifest-pathname */ "../../node_modules/gatsby-plugin-manifest/get-manifest-pathname.js"));// TODO: remove for v3
var withPrefix=_gatsby.withAssetPrefix||_gatsby.withPrefix;exports.onRenderBody=function(_ref,_ref2){var setHeadComponents=_ref.setHeadComponents,_ref$pathname=_ref.pathname,pathname=_ref$pathname===void 0?"/":_ref$pathname;var localize=_ref2.localize,legacy=_ref2.legacy,cacheBusting=_ref2.cache_busting_mode,cacheDigest=_ref2.cacheDigest,icon=_ref2.icon,pluginIcons=_ref2.icons,insertFaviconLinkTag=_ref2.include_favicon,insertMetaTag=_ref2.theme_color_in_head,theme_color=_ref2.theme_color,_ref2$crossOrigin=_ref2.crossOrigin,crossOrigin=_ref2$crossOrigin===void 0?"anonymous":_ref2$crossOrigin;// We use this to build a final array to pass as the argument to setHeadComponents at the end of onRenderBody.
var headComponents=[];var srcIconExists=!!icon;var icons=pluginIcons||_common.defaultIcons;var manifestFileName=(0,_getManifestPathname.default)(pathname,localize);// If icons were generated, also add a favicon link.
if(srcIconExists){if(insertFaviconLinkTag){_common.favicons.forEach(function(favicon){headComponents.push(/*#__PURE__*/React.createElement("link",{key:"gatsby-plugin-manifest-icon-link-png",rel:"icon",href:withPrefix((0,_common.addDigestToPath)(favicon.src,cacheDigest,cacheBusting)),type:"image/png"}));});if(icon===null||icon===void 0?void 0:icon.endsWith(".svg")){headComponents.push(/*#__PURE__*/React.createElement("link",{key:"gatsby-plugin-manifest-icon-link-svg",rel:"icon",href:withPrefix((0,_common.addDigestToPath)("favicon.svg",cacheDigest,cacheBusting)),type:"image/svg+xml"}));}}}// Add manifest link tag.
headComponents.push(/*#__PURE__*/React.createElement("link",{key:"gatsby-plugin-manifest-link",rel:"manifest",href:(0,_gatsby.withPrefix)("/"+manifestFileName),crossOrigin:crossOrigin}));// The user has an option to opt out of the theme_color meta tag being inserted into the head.
if(theme_color&&insertMetaTag){headComponents.push(/*#__PURE__*/React.createElement("meta",{key:"gatsby-plugin-manifest-meta",name:"theme-color",content:theme_color}));}if(legacy){icons.forEach(function(icon){headComponents.push(/*#__PURE__*/React.createElement("link",{key:"gatsby-plugin-manifest-apple-touch-icon-"+icon.sizes,rel:"apple-touch-icon",sizes:icon.sizes,href:withPrefix((0,_common.addDigestToPath)(icon.src,cacheDigest,srcIconExists?cacheBusting:"none"))}));});}setHeadComponents(headComponents);return true;};

/***/ }),

/***/ "../../node_modules/gatsby-plugin-manifest/get-manifest-pathname.js":
/*!********************************************************************************!*\
  !*** /z/monorepo/node_modules/gatsby-plugin-manifest/get-manifest-pathname.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
exports.__esModule=true;exports.default=void 0;/**
 * Get a manifest filename depending on localized pathname
 *
 * @param {string} pathname
 * @param {Array<{start_url: string, lang: string}>} localizedManifests
 * @return string
 */var _default=function _default(pathname,localizedManifests){var defaultFilename="manifest.webmanifest";if(!Array.isArray(localizedManifests)){return defaultFilename;}var localizedManifest=localizedManifests.find(function(app){return pathname.startsWith(app.start_url);});if(!localizedManifest){return defaultFilename;}return"manifest_"+localizedManifest.lang+".webmanifest";};exports.default=_default;

/***/ }),

/***/ "../../node_modules/gatsby-plugin-mdx/context.js":
/*!*************************************************************!*\
  !*** /z/monorepo/node_modules/gatsby-plugin-mdx/context.js ***!
  \*************************************************************/
/*! exports provided: useMDXScope, MDXScopeProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useMDXScope", function() { return useMDXScope; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDXScopeProvider", function() { return MDXScopeProvider; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
const GatsbyMDXScopeContext=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])({});const useMDXScope=scope=>{const contextScope=Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(GatsbyMDXScopeContext);return scope||contextScope;};const MDXScopeProvider=({__mdxScope,children})=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(GatsbyMDXScopeContext.Provider,{value:__mdxScope},children);

/***/ }),

/***/ "../../node_modules/gatsby-plugin-mdx/gatsby-ssr.js":
/*!****************************************************************!*\
  !*** /z/monorepo/node_modules/gatsby-plugin-mdx/gatsby-ssr.js ***!
  \****************************************************************/
/*! exports provided: wrapRootElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapRootElement", function() { return wrapRootElement; });
/* harmony import */ var _wrap_root_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wrap-root-element */ "../../node_modules/gatsby-plugin-mdx/wrap-root-element.js");
const wrapRootElement=_wrap_root_element__WEBPACK_IMPORTED_MODULE_0__["default"];

/***/ }),

/***/ "../../node_modules/gatsby-plugin-mdx/index.js":
/*!***********************************************************!*\
  !*** /z/monorepo/node_modules/gatsby-plugin-mdx/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Welcome to gatsby-plugin-mdx!
 *
 * Start reading in gatsby-node.js
 */const MDXRenderer=__webpack_require__(/*! ./mdx-renderer */ "../../node_modules/gatsby-plugin-mdx/mdx-renderer.js");module.exports={MDXRenderer:MDXRenderer};

/***/ }),

/***/ "../../node_modules/gatsby-plugin-mdx/loaders/mdx-components.js":
/*!****************************************************************************!*\
  !*** /z/monorepo/node_modules/gatsby-plugin-mdx/loaders/mdx-components.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={plugins:[]};

/***/ }),

/***/ "../../node_modules/gatsby-plugin-mdx/loaders/mdx-scopes.js":
/*!************************************************************************!*\
  !*** /z/monorepo/node_modules/gatsby-plugin-mdx/loaders/mdx-scopes.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var scope_0=__webpack_require__(/*! ./.cache/caches/gatsby-plugin-mdx/mdx-scopes-dir/619e4c1544d023b87009049ac4fcd614.js */ "./.cache/caches/gatsby-plugin-mdx/mdx-scopes-dir/619e4c1544d023b87009049ac4fcd614.js").default;var scope_1=__webpack_require__(/*! ./.cache/caches/gatsby-plugin-mdx/mdx-scopes-dir/e92f8988d65cf25c087d226e6c0ef06f.js */ "./.cache/caches/gatsby-plugin-mdx/mdx-scopes-dir/e92f8988d65cf25c087d226e6c0ef06f.js").default;/* harmony default export */ __webpack_exports__["default"] = (Object.assign({},scope_0,scope_1));

/***/ }),

/***/ "../../node_modules/gatsby-plugin-mdx/mdx-renderer.js":
/*!******************************************************************!*\
  !*** /z/monorepo/node_modules/gatsby-plugin-mdx/mdx-renderer.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _construct=__webpack_require__(/*! @babel/runtime/helpers/construct */ "../../node_modules/@babel/runtime/helpers/construct.js");var _toConsumableArray=__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../../node_modules/@babel/runtime/helpers/toConsumableArray.js");var _defineProperty=__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../node_modules/@babel/runtime/helpers/defineProperty.js");var _objectWithoutProperties=__webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "../../node_modules/@babel/runtime/helpers/objectWithoutProperties.js");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}const React=__webpack_require__(/*! react */ "react");const{mdx}=__webpack_require__(/*! @mdx-js/react */ "../../node_modules/@mdx-js/react/dist/esm.js");const{useMDXScope}=__webpack_require__(/*! ./context */ "../../node_modules/gatsby-plugin-mdx/context.js");module.exports=function MDXRenderer(_ref){let{scope,children}=_ref,props=_objectWithoutProperties(_ref,["scope","children"]);const mdxScope=useMDXScope(scope);// Memoize the compiled component
const End=React.useMemo(()=>{if(!children){return null;}const fullScope=_objectSpread({// React is here just in case the user doesn't pass them in
// in a manual usage of the renderer
React,mdx},mdxScope);const keys=Object.keys(fullScope);const values=keys.map(key=>fullScope[key]);const fn=_construct(Function,[`_fn`].concat(_toConsumableArray(keys),[`${children}`]));return fn.apply(void 0,[{}].concat(_toConsumableArray(values)));},[children,scope]);return React.createElement(End,_objectSpread({},props));};

/***/ }),

/***/ "../../node_modules/gatsby-plugin-mdx/wrap-root-element.js":
/*!***********************************************************************!*\
  !*** /z/monorepo/node_modules/gatsby-plugin-mdx/wrap-root-element.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "../../node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mdx_js_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mdx-js/react */ "../../node_modules/@mdx-js/react/dist/esm.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./context */ "../../node_modules/gatsby-plugin-mdx/context.js");
/* harmony import */ var _loaders_mdx_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./loaders/mdx-components */ "../../node_modules/gatsby-plugin-mdx/loaders/mdx-components.js");
/* harmony import */ var _loaders_mdx_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_loaders_mdx_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _loaders_mdx_scopes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./loaders/mdx-scopes */ "../../node_modules/gatsby-plugin-mdx/loaders/mdx-scopes.js");
function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}/**
 * so, this import is weird right?
 *
 * # What it looks like:
 * we're importing a webpack loader directly into our runtime bundle
 *
 * # What it's actually doing:
 * We configure the `mdx-components` loader in gatsby-node's
 * `onCreateWebpackConfig`. The configuration sets the loader to handle its
 * own file, so if we import `./loaders/mdx-components`, the `mdx-components`
 * loader handles loading itself.
 *
 * # Why does this work?
 * The loader doesn't use the file argument to itself and instead returns
 * a generated file that includes the `gatsby-config` mdxPlugins wrapped in
 * require() statements. This results in the `mdxPlugins` being required
 * and available to the code after this import.
 *
 * # Have a better solution to this?
 * Submit a PR
 */const componentsAndGuards={};const componentFromGuards=arr=>function GatsbyMDXComponentFinder(props){const{Component}=arr.find(({guard})=>guard?guard(props):true);return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Component,props);};_loaders_mdx_components__WEBPACK_IMPORTED_MODULE_4__["plugins"].forEach(({guards={},components})=>{Object.entries(components).forEach(([componentName,Component])=>{if(componentsAndGuards[componentName]){componentsAndGuards.push({guard:guards[componentName],Component});}else{componentsAndGuards[componentName]=[{guard:guards[componentName],Component}];}});});const components=Object.entries(componentsAndGuards).map(([name,arr])=>{return{[name]:componentFromGuards(arr.concat({guard:undefined,Component:name}))};}).reduce((acc,obj)=>{return _objectSpread(_objectSpread({},acc),obj);},{});// merge any components in wrapRootElement above this wrapRoot
const MDXConsumer=Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__["withMDXComponents"])(({components:componentsFromContext,children})=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_context__WEBPACK_IMPORTED_MODULE_3__["MDXScopeProvider"],{__mdxScope:_loaders_mdx_scopes__WEBPACK_IMPORTED_MODULE_5__["default"]},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__["MDXProvider"],{components:_objectSpread(_objectSpread({},componentsFromContext),components)},children)));const WrapRootElement=({element})=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(MDXConsumer,null,element);/* harmony default export */ __webpack_exports__["default"] = (WrapRootElement);

/***/ }),

/***/ "../../node_modules/gatsby-plugin-react-helmet/gatsby-ssr.js":
/*!*************************************************************************!*\
  !*** /z/monorepo/node_modules/gatsby-plugin-react-helmet/gatsby-ssr.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
exports.__esModule=true;exports.onRenderBody=void 0;var _reactHelmet=__webpack_require__(/*! react-helmet */ "react-helmet");var onRenderBody=function onRenderBody(_ref){var setHeadComponents=_ref.setHeadComponents,setHtmlAttributes=_ref.setHtmlAttributes,setBodyAttributes=_ref.setBodyAttributes;var helmet=_reactHelmet.Helmet.renderStatic();// These action functions were added partway through the Gatsby 1.x cycle.
if(setHtmlAttributes){setHtmlAttributes(helmet.htmlAttributes.toComponent());}if(setBodyAttributes){setBodyAttributes(helmet.bodyAttributes.toComponent());}setHeadComponents([helmet.title.toComponent(),helmet.link.toComponent(),helmet.meta.toComponent(),helmet.noscript.toComponent(),helmet.script.toComponent(),helmet.style.toComponent(),helmet.base.toComponent()]);};exports.onRenderBody=onRenderBody;

/***/ }),

/***/ "../../node_modules/gatsby-plugin-remove-generator/gatsby-ssr.js":
/*!*****************************************************************************!*\
  !*** /z/monorepo/node_modules/gatsby-plugin-remove-generator/gatsby-ssr.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const isGeneratorTag=(type,name)=>type==='meta'&&name==='generator';/**
 *
 * @param apiContext Context provided by Gatsby
 * @param pluginOpts User supplied plugin options
 * @see https://www.gatsbyjs.org/docs/ssr-apis/#onPreRenderHTML
 */exports.onPreRenderHTML=({getHeadComponents,replaceHeadComponents},{removeVersionOnly=false,content}={})=>{// TODO: something strange going on when inlining this below. Leave here for now
const keepTag=removeVersionOnly||content!=undefined;const headComponents=getHeadComponents().map(c=>isGeneratorTag(c.type,c.props?c.props.name:'')?Object.assign({},c,{props:Object.assign({},c.props,{content:content||'Gatsby'})}):c).filter(({type,props:{name,content}={}})=>keepTag?true:!isGeneratorTag(type,name));replaceHeadComponents(headComponents);};

/***/ }),

/***/ "../../node_modules/gatsby-plugin-workerize-loader/constants.js":
/*!****************************************************************************!*\
  !*** /z/monorepo/node_modules/gatsby-plugin-workerize-loader/constants.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
const PREFIX='built';module.exports={PREFIX};

/***/ }),

/***/ "../../node_modules/gatsby-plugin-workerize-loader/gatsby-ssr.js":
/*!*****************************************************************************!*\
  !*** /z/monorepo/node_modules/gatsby-plugin-workerize-loader/gatsby-ssr.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
const React=__webpack_require__(/*! react */ "react");const{readdirSync}=__webpack_require__(/*! fs */ "fs");const{PREFIX}=__webpack_require__(/*! ./constants */ "../../node_modules/gatsby-plugin-workerize-loader/constants.js");const publicFolder='./public';const isWorker=file=>file.includes(PREFIX)&&file.endsWith('.worker.js');const shouldPreload=(file,preloads)=>file.startsWith(PREFIX)&&preloads.some(preload=>file.includes(preload));let preloadScripts=[];// For some reason, this does not work as expected on Chrome.
// So for now, I'm not mentioning preloads option in README.
exports.onRenderBody=({setHeadComponents},{preloads=[]}={})=>{if(!preloads.length)return;if(!preloadScripts.length){preloadScripts=readdirSync(publicFolder).filter(file=>isWorker(file)&&shouldPreload(file,preloads)).map(file=>/*#__PURE__*/React.createElement("link",{key:file,as:"worker",crossOrigin:"anonymous",href:`/${file}`,rel:"preload"}));}setHeadComponents(preloadScripts);};

/***/ }),

/***/ "../../node_modules/gatsby-react-router-scroll/index.js":
/*!********************************************************************!*\
  !*** /z/monorepo/node_modules/gatsby-react-router-scroll/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useScrollRestoration = exports.ScrollContainer = exports.ScrollContext = void 0;

var _scrollHandler = __webpack_require__(/*! ./scroll-handler */ "../../node_modules/gatsby-react-router-scroll/scroll-handler.js");

exports.ScrollContext = _scrollHandler.ScrollHandler;

var _scrollContainer = __webpack_require__(/*! ./scroll-container */ "../../node_modules/gatsby-react-router-scroll/scroll-container.js");

exports.ScrollContainer = _scrollContainer.ScrollContainer;

var _useScrollRestoration = __webpack_require__(/*! ./use-scroll-restoration */ "../../node_modules/gatsby-react-router-scroll/use-scroll-restoration.js");

exports.useScrollRestoration = _useScrollRestoration.useScrollRestoration;

/***/ }),

/***/ "../../node_modules/gatsby-react-router-scroll/scroll-container.js":
/*!*******************************************************************************!*\
  !*** /z/monorepo/node_modules/gatsby-react-router-scroll/scroll-container.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../../node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.ScrollContainer = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "../../node_modules/@babel/runtime/helpers/extends.js"));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "../../node_modules/@babel/runtime/helpers/inheritsLoose.js"));

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "../../node_modules/react-dom/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "../../node_modules/prop-types/index.js"));

var _scrollHandler = __webpack_require__(/*! ./scroll-handler */ "../../node_modules/gatsby-react-router-scroll/scroll-handler.js");

var _router = __webpack_require__(/*! @reach/router */ "@reach/router");

// TODO: In Gatsby v3, this file should be removed.
// We are deprecating this in V2 in favor of useScrollRestoration
var propTypes = {
  scrollKey: _propTypes.default.string.isRequired,
  shouldUpdateScroll: _propTypes.default.func,
  children: _propTypes.default.element.isRequired
};
var hasNotWarnedDeprecation = true;

var ScrollContainerImplementation = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2.default)(ScrollContainerImplementation, _React$Component);

  function ScrollContainerImplementation(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    if (false) {}

    return _this;
  }

  var _proto = ScrollContainerImplementation.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    // eslint-disable-next-line react/no-find-dom-node
    var node = _reactDom.default.findDOMNode(this);

    var _this$props = this.props,
        location = _this$props.location,
        scrollKey = _this$props.scrollKey;
    if (!node) return;
    node.addEventListener("scroll", function () {
      _this2.props.context.save(location, scrollKey, node.scrollTop);
    });
    var position = this.props.context.read(location, scrollKey);
    node.scrollTo(0, position || 0);
  };

  _proto.render = function render() {
    return this.props.children;
  };

  return ScrollContainerImplementation;
}(React.Component);

var ScrollContainer = function ScrollContainer(props) {
  return /*#__PURE__*/React.createElement(_router.Location, null, function (_ref) {
    var location = _ref.location;
    return /*#__PURE__*/React.createElement(_scrollHandler.ScrollContext.Consumer, null, function (context) {
      return /*#__PURE__*/React.createElement(ScrollContainerImplementation, (0, _extends2.default)({}, props, {
        context: context,
        location: location
      }));
    });
  });
};

exports.ScrollContainer = ScrollContainer;
ScrollContainer.propTypes = propTypes;

/***/ }),

/***/ "../../node_modules/gatsby-react-router-scroll/scroll-handler.js":
/*!*****************************************************************************!*\
  !*** /z/monorepo/node_modules/gatsby-react-router-scroll/scroll-handler.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../../node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.ScrollHandler = exports.ScrollContext = void 0;

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "../../node_modules/@babel/runtime/helpers/inheritsLoose.js"));

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "../../node_modules/prop-types/index.js"));

var _sessionStorage = __webpack_require__(/*! ./session-storage */ "../../node_modules/gatsby-react-router-scroll/session-storage.js");

var ScrollContext = /*#__PURE__*/React.createContext(new _sessionStorage.SessionStorage());
exports.ScrollContext = ScrollContext;
ScrollContext.displayName = "GatsbyScrollContext";

var ScrollHandler = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2.default)(ScrollHandler, _React$Component);

  function ScrollHandler() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this._stateStorage = new _sessionStorage.SessionStorage();

    _this.scrollListener = function () {
      var key = _this.props.location.key;

      if (key) {
        _this._stateStorage.save(_this.props.location, key, window.scrollY);
      }
    };

    _this.windowScroll = function (position, prevProps) {
      if (_this.shouldUpdateScroll(prevProps, _this.props)) {
        window.scrollTo(0, position);
      }
    };

    _this.scrollToHash = function (hash, prevProps) {
      var node = document.getElementById(hash.substring(1));

      if (node && _this.shouldUpdateScroll(prevProps, _this.props)) {
        node.scrollIntoView();
      }
    };

    _this.shouldUpdateScroll = function (prevRouterProps, routerProps) {
      var shouldUpdateScroll = _this.props.shouldUpdateScroll;

      if (!shouldUpdateScroll) {
        return true;
      } // Hack to allow accessing this._stateStorage.


      return shouldUpdateScroll.call((0, _assertThisInitialized2.default)(_this), prevRouterProps, routerProps);
    };

    return _this;
  }

  var _proto = ScrollHandler.prototype;

  _proto.componentDidMount = function componentDidMount() {
    window.addEventListener("scroll", this.scrollListener);
    var scrollPosition;
    var _this$props$location = this.props.location,
        key = _this$props$location.key,
        hash = _this$props$location.hash;

    if (key) {
      scrollPosition = this._stateStorage.read(this.props.location, key);
    }

    if (scrollPosition) {
      this.windowScroll(scrollPosition, undefined);
    } else if (hash) {
      this.scrollToHash(decodeURI(hash), undefined);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollListener);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props$location2 = this.props.location,
        hash = _this$props$location2.hash,
        key = _this$props$location2.key;
    var scrollPosition;

    if (key) {
      scrollPosition = this._stateStorage.read(this.props.location, key);
    }
    /**  There are two pieces of state: the browser url and
     * history state which keeps track of scroll position
     * Native behaviour prescribes that we ought to restore scroll position
     * when a user navigates back in their browser (this is the `POP` action)
     * Currently, reach router has a bug that prevents this at https://github.com/reach/router/issues/228
     * So we _always_ stick to the url as a source of truth — if the url
     * contains a hash, we scroll to it
     */


    if (hash) {
      this.scrollToHash(decodeURI(hash), prevProps);
    } else {
      this.windowScroll(scrollPosition, prevProps);
    }
  };

  _proto.render = function render() {
    return /*#__PURE__*/React.createElement(ScrollContext.Provider, {
      value: this._stateStorage
    }, this.props.children);
  };

  return ScrollHandler;
}(React.Component);

exports.ScrollHandler = ScrollHandler;
ScrollHandler.propTypes = {
  shouldUpdateScroll: _propTypes.default.func,
  children: _propTypes.default.element.isRequired,
  location: _propTypes.default.object.isRequired
};

/***/ }),

/***/ "../../node_modules/gatsby-react-router-scroll/session-storage.js":
/*!******************************************************************************!*\
  !*** /z/monorepo/node_modules/gatsby-react-router-scroll/session-storage.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.SessionStorage = void 0;
var STATE_KEY_PREFIX = "@@scroll|";
var GATSBY_ROUTER_SCROLL_STATE = "___GATSBY_REACT_ROUTER_SCROLL";

var SessionStorage = /*#__PURE__*/function () {
  function SessionStorage() {}

  var _proto = SessionStorage.prototype;

  _proto.read = function read(location, key) {
    var stateKey = this.getStateKey(location, key);

    try {
      var value = window.sessionStorage.getItem(stateKey);
      return value ? JSON.parse(value) : 0;
    } catch (e) {
      if (false) {}

      if (window && window[GATSBY_ROUTER_SCROLL_STATE] && window[GATSBY_ROUTER_SCROLL_STATE][stateKey]) {
        return window[GATSBY_ROUTER_SCROLL_STATE][stateKey];
      }

      return 0;
    }
  };

  _proto.save = function save(location, key, value) {
    var stateKey = this.getStateKey(location, key);
    var storedValue = JSON.stringify(value);

    try {
      window.sessionStorage.setItem(stateKey, storedValue);
    } catch (e) {
      if (window && window[GATSBY_ROUTER_SCROLL_STATE]) {
        window[GATSBY_ROUTER_SCROLL_STATE][stateKey] = JSON.parse(storedValue);
      } else {
        window[GATSBY_ROUTER_SCROLL_STATE] = {};
        window[GATSBY_ROUTER_SCROLL_STATE][stateKey] = JSON.parse(storedValue);
      }

      if (false) {}
    }
  };

  _proto.getStateKey = function getStateKey(location, key) {
    var stateKeyBase = "" + STATE_KEY_PREFIX + location.pathname;
    return key === null || typeof key === "undefined" ? stateKeyBase : stateKeyBase + "|" + key;
  };

  return SessionStorage;
}();

exports.SessionStorage = SessionStorage;

/***/ }),

/***/ "../../node_modules/gatsby-react-router-scroll/use-scroll-restoration.js":
/*!*************************************************************************************!*\
  !*** /z/monorepo/node_modules/gatsby-react-router-scroll/use-scroll-restoration.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useScrollRestoration = useScrollRestoration;

var _scrollHandler = __webpack_require__(/*! ./scroll-handler */ "../../node_modules/gatsby-react-router-scroll/scroll-handler.js");

var _react = __webpack_require__(/*! react */ "react");

var _router = __webpack_require__(/*! @reach/router */ "@reach/router");

function useScrollRestoration(identifier) {
  var location = (0, _router.useLocation)();
  var state = (0, _react.useContext)(_scrollHandler.ScrollContext);
  var ref = (0, _react.useRef)();
  (0, _react.useLayoutEffect)(function () {
    if (ref.current) {
      var position = state.read(location, identifier);
      ref.current.scrollTo(0, position || 0);
    }
  }, []);
  return {
    ref: ref,
    onScroll: function onScroll() {
      if (ref.current) {
        state.save(location, identifier, ref.current.scrollTop);
      }
    }
  };
}

/***/ }),

/***/ "../../node_modules/gatsby/package.json":
/*!****************************************************!*\
  !*** /z/monorepo/node_modules/gatsby/package.json ***!
  \****************************************************/
/*! exports provided: name, description, version, author, bin, bugs, dependencies, devDependencies, engines, files, homepage, keywords, license, main, module, peerDependencies, repository, resolutions, scripts, types, yargs, gitHead, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"gatsby\",\"description\":\"Blazing fast modern site generator for React\",\"version\":\"2.29.1\",\"author\":\"Kyle Mathews <mathews.kyle@gmail.com>\",\"bin\":{\"gatsby\":\"./cli.js\"},\"bugs\":{\"url\":\"https://github.com/gatsbyjs/gatsby/issues\"},\"dependencies\":{\"@babel/code-frame\":\"^7.10.4\",\"@babel/core\":\"^7.12.3\",\"@babel/parser\":\"^7.12.5\",\"@babel/runtime\":\"^7.12.5\",\"@babel/traverse\":\"^7.12.5\",\"@babel/types\":\"^7.12.6\",\"@hapi/joi\":\"^15.1.1\",\"@mikaelkristiansson/domready\":\"^1.0.10\",\"@nodelib/fs.walk\":\"^1.2.4\",\"@pieh/friendly-errors-webpack-plugin\":\"1.7.0-chalk-2\",\"@pmmmwh/react-refresh-webpack-plugin\":\"^0.4.1\",\"@reach/router\":\"^1.3.4\",\"@types/http-proxy\":\"^1.17.4\",\"@typescript-eslint/eslint-plugin\":\"^2.24.0\",\"@typescript-eslint/parser\":\"^2.24.0\",\"address\":\"1.1.2\",\"anser\":\"^2.0.1\",\"ansi-html\":\"^0.0.7\",\"autoprefixer\":\"^9.8.4\",\"axios\":\"^0.20.0\",\"babel-core\":\"7.0.0-bridge.0\",\"babel-eslint\":\"^10.1.0\",\"babel-loader\":\"^8.1.0\",\"babel-plugin-add-module-exports\":\"^0.3.3\",\"babel-plugin-dynamic-import-node\":\"^2.3.3\",\"babel-plugin-lodash\":\"3.3.4\",\"babel-plugin-remove-graphql-queries\":\"^2.13.0\",\"babel-preset-gatsby\":\"^0.9.0\",\"better-opn\":\"^2.0.0\",\"better-queue\":\"^3.8.10\",\"bluebird\":\"^3.7.2\",\"body-parser\":\"^1.19.0\",\"browserslist\":\"^4.12.2\",\"cache-manager\":\"^2.11.1\",\"chalk\":\"^4.1.0\",\"chokidar\":\"^3.4.2\",\"common-tags\":\"^1.8.0\",\"compression\":\"^1.7.4\",\"convert-hrtime\":\"^3.0.0\",\"copyfiles\":\"^2.3.0\",\"core-js\":\"^3.6.5\",\"cors\":\"^2.8.5\",\"css-loader\":\"^1.0.1\",\"date-fns\":\"^2.14.0\",\"debug\":\"^3.2.6\",\"del\":\"^5.1.0\",\"detect-port\":\"^1.3.0\",\"devcert\":\"^1.1.3\",\"dotenv\":\"^8.2.0\",\"eslint\":\"^6.8.0\",\"eslint-config-react-app\":\"^5.2.1\",\"eslint-loader\":\"^2.2.1\",\"eslint-plugin-flowtype\":\"^3.13.0\",\"eslint-plugin-graphql\":\"^4.0.0\",\"eslint-plugin-import\":\"^2.22.0\",\"eslint-plugin-jsx-a11y\":\"^6.3.1\",\"eslint-plugin-react\":\"^7.20.6\",\"eslint-plugin-react-hooks\":\"^1.7.0\",\"event-source-polyfill\":\"^1.0.15\",\"execa\":\"^4.0.3\",\"express\":\"^4.17.1\",\"express-graphql\":\"^0.9.0\",\"fastest-levenshtein\":\"^1.0.12\",\"file-loader\":\"^1.1.11\",\"find-cache-dir\":\"^3.3.1\",\"fs-exists-cached\":\"1.0.0\",\"fs-extra\":\"^8.1.0\",\"gatsby-cli\":\"^2.16.1\",\"gatsby-core-utils\":\"^1.7.0\",\"gatsby-graphiql-explorer\":\"^0.8.0\",\"gatsby-legacy-polyfills\":\"^0.4.0\",\"gatsby-link\":\"^2.8.0\",\"gatsby-plugin-page-creator\":\"^2.7.1\",\"gatsby-plugin-typescript\":\"^2.9.0\",\"gatsby-plugin-utils\":\"^0.6.0\",\"gatsby-react-router-scroll\":\"^3.4.0\",\"gatsby-telemetry\":\"^1.7.0\",\"glob\":\"^7.1.6\",\"got\":\"8.3.2\",\"graphql\":\"^14.6.0\",\"graphql-compose\":\"^6.3.8\",\"graphql-playground-middleware-express\":\"^1.7.18\",\"hasha\":\"^5.2.0\",\"http-proxy\":\"^1.18.1\",\"invariant\":\"^2.2.4\",\"is-relative\":\"^1.0.0\",\"is-relative-url\":\"^3.0.0\",\"jest-worker\":\"^24.9.0\",\"joi\":\"^17.2.1\",\"json-loader\":\"^0.5.7\",\"json-stringify-safe\":\"^5.0.1\",\"latest-version\":\"5.1.0\",\"lodash\":\"^4.17.20\",\"md5-file\":\"^5.0.0\",\"meant\":\"^1.0.1\",\"micromatch\":\"^4.0.2\",\"mime\":\"^2.4.6\",\"mini-css-extract-plugin\":\"^0.11.2\",\"mitt\":\"^1.2.0\",\"mkdirp\":\"^0.5.1\",\"moment\":\"^2.27.0\",\"name-all-modules-plugin\":\"^1.0.1\",\"normalize-path\":\"^3.0.0\",\"null-loader\":\"^3.0.0\",\"opentracing\":\"^0.14.4\",\"optimize-css-assets-webpack-plugin\":\"^5.0.3\",\"p-defer\":\"^3.0.0\",\"parseurl\":\"^1.3.3\",\"physical-cpu-count\":\"^2.0.0\",\"pnp-webpack-plugin\":\"^1.6.4\",\"postcss-flexbugs-fixes\":\"^4.2.1\",\"postcss-loader\":\"^3.0.0\",\"prompts\":\"^2.3.2\",\"prop-types\":\"^15.7.2\",\"query-string\":\"^6.13.1\",\"raw-loader\":\"^0.5.1\",\"react-dev-utils\":\"^4.2.3\",\"react-error-overlay\":\"^3.0.0\",\"react-hot-loader\":\"^4.12.21\",\"react-refresh\":\"^0.8.3\",\"redux\":\"^4.0.5\",\"redux-thunk\":\"^2.3.0\",\"semver\":\"^7.3.2\",\"shallow-compare\":\"^1.2.2\",\"signal-exit\":\"^3.0.3\",\"slugify\":\"^1.4.4\",\"socket.io\":\"^2.3.0\",\"socket.io-client\":\"2.3.0\",\"source-map\":\"^0.7.3\",\"source-map-support\":\"^0.5.19\",\"st\":\"^2.0.0\",\"stack-trace\":\"^0.0.10\",\"string-similarity\":\"^1.2.2\",\"strip-ansi\":\"^5.2.0\",\"style-loader\":\"^0.23.1\",\"terminal-link\":\"^2.1.1\",\"terser-webpack-plugin\":\"^2.3.8\",\"tmp\":\"^0.2.1\",\"true-case-path\":\"^2.2.1\",\"type-of\":\"^2.0.1\",\"url-loader\":\"^1.1.2\",\"util.promisify\":\"^1.0.1\",\"uuid\":\"3.4.0\",\"v8-compile-cache\":\"^1.1.2\",\"webpack\":\"^4.44.1\",\"webpack-dev-middleware\":\"^3.7.2\",\"webpack-dev-server\":\"^3.11.0\",\"webpack-hot-middleware\":\"^2.25.0\",\"webpack-merge\":\"^4.2.2\",\"webpack-stats-plugin\":\"^0.3.2\",\"webpack-virtual-modules\":\"^0.2.2\",\"xstate\":\"^4.11.0\",\"yaml-loader\":\"^0.6.0\"},\"devDependencies\":{\"@babel/cli\":\"^7.12.1\",\"@babel/runtime\":\"^7.12.5\",\"@types/hapi__joi\":\"^16.0.12\",\"@types/micromatch\":\"^4.0.1\",\"@types/normalize-path\":\"^3.0.0\",\"@types/reach__router\":\"^1.3.5\",\"@types/semver\":\"^7.1.0\",\"@types/signal-exit\":\"^3.0.0\",\"@types/socket.io\":\"^2.1.4\",\"@types/string-similarity\":\"^3.0.0\",\"@types/tmp\":\"^0.2.0\",\"@types/webpack-dev-middleware\":\"^3.7.1\",\"@types/webpack-virtual-modules\":\"^0.1.0\",\"babel-preset-gatsby-package\":\"^0.9.0\",\"cross-env\":\"^7.0.3\",\"documentation\":\"^12.3.0\",\"enhanced-resolve\":\"^4.2.0\",\"eslint-plugin-jsx-a11y\":\"^6.3.1\",\"react\":\"^16.12.0\",\"react-dom\":\"^16.12.0\",\"rimraf\":\"^3.0.2\",\"typescript\":\"^3.9.5\",\"xhr-mock\":\"^2.5.1\",\"zipkin\":\"^0.22.0\",\"zipkin-javascript-opentracing\":\"^3.0.0\",\"zipkin-transport-http\":\"^0.22.0\"},\"engines\":{\"node\":\">=10.13.0\"},\"files\":[\"apis.json\",\"ipc.json\",\"cache-dir/\",\"cli.js\",\"dist/\",\"gatsby-admin-public/\",\"graphql.js\",\"graphql.d.ts\",\"index.d.ts\",\"scripts/postinstall.js\",\"utils.js\",\"internal.js\",\"internal.d.ts\",\"!**/__tests__/\"],\"homepage\":\"https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby#readme\",\"keywords\":[\"blog\",\"generator\",\"jekyll\",\"markdown\",\"react\",\"ssg\",\"website\"],\"license\":\"MIT\",\"main\":\"cache-dir/commonjs/gatsby-browser-entry.js\",\"module\":\"cache-dir/gatsby-browser-entry.js\",\"peerDependencies\":{\"react\":\"^16.4.2\",\"react-dom\":\"^16.4.2\"},\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/gatsbyjs/gatsby.git\"},\"resolutions\":{\"graphql\":\"^14.6.0\",\"@mdx-js/mdx\":\"^2.0.0-next.3\",\"@mdx-js/react\":\"^2.0.0-next.3\",\"@mdx-js/runtime\":\"^2.0.0-next.3\",\"remark-mdx\":\"^2.0.0-next.3\",\"remark-mdxjs\":\"^2.0.0-next.3\"},\"scripts\":{\"build\":\"npm run build:types && npm run build:src && npm run build:internal-plugins && npm run build:rawfiles && npm run build:cjs\",\"postbuild\":\"node scripts/output-api-file.js && yarn workspace gatsby-admin build\",\"build:internal-plugins\":\"copyfiles -u 1 src/internal-plugins/**/package.json dist\",\"build:rawfiles\":\"copyfiles -u 1 src/internal-plugins/**/raw_* dist\",\"build:cjs\":\"babel cache-dir --out-dir cache-dir/commonjs --ignore \\\"**/__tests__\\\" --ignore \\\"**/__mocks__\\\"\",\"build:src\":\"babel src --out-dir dist --source-maps --verbose --ignore \\\"**/gatsby-cli.js,src/internal-plugins/dev-404-page/raw_dev-404-page.js,**/__tests__,**/__mocks__\\\" --extensions \\\".ts,.js\\\"\",\"build:types\":\"tsc --emitDeclarationOnly --declaration --declarationDir dist\",\"clean-test-bundles\":\"find test/ -type f -name bundle.js* -exec rm -rf {} +\",\"prebuild\":\"rimraf dist && rimraf cache-dir/commonjs\",\"postinstall\":\"node scripts/postinstall.js\",\"prepare\":\"cross-env NODE_ENV=production npm run build\",\"watch\":\"rimraf dist && mkdir dist && npm run build:internal-plugins && npm run build:rawfiles && npm run build:src -- --watch\"},\"types\":\"index.d.ts\",\"yargs\":{\"boolean-negation\":false},\"gitHead\":\"5a0489d7d56353af92c89882b7f5b0e3242487bd\"}");

/***/ }),

/***/ "../../node_modules/gray-percentage/index.js":
/*!*********************************************************!*\
  !*** /z/monorepo/node_modules/gray-percentage/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


module.exports = function(lightness, hue, darkBackground) {
  if (typeof hue === "undefined") {
    hue = 0;
  }
  if (typeof darkBackground === "undefined") {
    darkBackground = false;
  }

  // Convert named hues into numeric lightness value.
  if (hue === "cool") {
    hue = 237;
  }
  else if (hue === "slate") {
    hue = 122;
  }
  else if (hue === "warm") {
    hue = 69;
  }

  if (!isNumeric(hue)) {
    throw new Error("Hue is not a number");
  }

  if (!isNumeric(lightness)) {
    throw new Error("Lightness is not a number");
  }

  if (lightness > 100) {
    lightness = 100;
  }
  if (lightness < 0) {
    lightness = 0;
  }

  var saturation = 0;
  if (hue !== 0) {
    var a = 19.92978;
    var b = -0.3651759;
    var c = 0.001737214;
    saturation = a + b * lightness + c * Math.pow(lightness, 2);
  }

  var opacity = 0
  if (darkBackground) {
    opacity = lightness / 100
    lightness = '100%,'
  } else {
    opacity = (100 - lightness) / 100
    lightness = '0%,'
  }

  return "hsla(" + hue + "," + saturation + "%," + lightness + opacity + ")";
};


/***/ }),

/***/ "../../node_modules/hey-listen/dist/hey-listen.es.js":
/*!*****************************************************************!*\
  !*** /z/monorepo/node_modules/hey-listen/dist/hey-listen.es.js ***!
  \*****************************************************************/
/*! exports provided: invariant, warning */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invariant", function() { return invariant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "warning", function() { return warning; });
var warning = function () { };
var invariant = function () { };
if (false) {}




/***/ }),

/***/ "../../node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/*!********************************************************************************************!*\
  !*** /z/monorepo/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var reactIs = __webpack_require__(/*! react-is */ "../../node_modules/react-is/index.js");

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
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
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
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
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
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
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ "../../node_modules/invariant/invariant.js":
/*!*******************************************************!*\
  !*** /z/monorepo/node_modules/invariant/invariant.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var NODE_ENV = "production";

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),

/***/ "../../node_modules/mitt/dist/mitt.es.js":
/*!*****************************************************!*\
  !*** /z/monorepo/node_modules/mitt/dist/mitt.es.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//      
// An event handler can take an optional event argument
// and should not return a value
                                          
                                                               

// An array of all currently registered event handlers for a type
                                            
                                                            
// A map of event types and their corresponding event handlers.
                        
                                 
                                   
  

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
function mitt(all                 ) {
	all = all || Object.create(null);

	return {
		/**
		 * Register an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to listen for, or `"*"` for all events
		 * @param  {Function} handler Function to call in response to given event
		 * @memberOf mitt
		 */
		on: function on(type        , handler              ) {
			(all[type] || (all[type] = [])).push(handler);
		},

		/**
		 * Remove an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
		 * @param  {Function} handler Handler function to remove
		 * @memberOf mitt
		 */
		off: function off(type        , handler              ) {
			if (all[type]) {
				all[type].splice(all[type].indexOf(handler) >>> 0, 1);
			}
		},

		/**
		 * Invoke all handlers for the given type.
		 * If present, `"*"` handlers are invoked after type-matched handlers.
		 *
		 * @param {String} type  The event type to invoke
		 * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
		 * @memberOf mitt
		 */
		emit: function emit(type        , evt     ) {
			(all[type] || []).slice().map(function (handler) { handler(evt); });
			(all['*'] || []).slice().map(function (handler) { handler(type, evt); });
		}
	};
}

/* harmony default export */ __webpack_exports__["default"] = (mitt);
//# sourceMappingURL=mitt.es.js.map


/***/ }),

/***/ "../../node_modules/object-assign/index.js":
/*!*******************************************************!*\
  !*** /z/monorepo/node_modules/object-assign/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
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


/***/ }),

/***/ "../../node_modules/popmotion/dist/popmotion.es.js":
/*!***************************************************************!*\
  !*** /z/monorepo/node_modules/popmotion/dist/popmotion.es.js ***!
  \***************************************************************/
/*! exports provided: angle, animate, anticipate, applyOffset, attract, attractExpo, backIn, backInOut, backOut, bounceIn, bounceInOut, bounceOut, circIn, circInOut, circOut, clamp, createAnticipate, createAttractor, createBackIn, createExpoIn, cubicBezier, decay, degreesToRadians, distance, easeIn, easeInOut, easeOut, inertia, interpolate, isPoint, isPoint3D, keyframes, linear, mirrorEasing, mix, mixColor, mixComplex, pipe, pointFromVector, progress, radiansToDegrees, reverseEasing, smooth, smoothFrame, snap, spring, steps, toDecimal, velocityPerFrame, velocityPerSecond, wrap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "angle", function() { return angle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animate", function() { return animate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "anticipate", function() { return anticipate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyOffset", function() { return applyOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attract", function() { return attract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attractExpo", function() { return attractExpo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backIn", function() { return backIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backInOut", function() { return backInOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backOut", function() { return backOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bounceIn", function() { return bounceIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bounceInOut", function() { return bounceInOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bounceOut", function() { return bounceOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circIn", function() { return circIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circInOut", function() { return circInOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circOut", function() { return circOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAnticipate", function() { return createAnticipate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAttractor", function() { return createAttractor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createBackIn", function() { return createBackIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createExpoIn", function() { return createExpoIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cubicBezier", function() { return cubicBezier; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decay", function() { return decay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "degreesToRadians", function() { return degreesToRadians; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distance", function() { return distance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeIn", function() { return easeIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeInOut", function() { return easeInOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeOut", function() { return easeOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inertia", function() { return inertia; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interpolate", function() { return interpolate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPoint", function() { return isPoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPoint3D", function() { return isPoint3D; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyframes", function() { return keyframes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linear", function() { return linear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mirrorEasing", function() { return mirrorEasing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mix", function() { return mix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mixColor", function() { return mixColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mixComplex", function() { return mixComplex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pipe", function() { return pipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pointFromVector", function() { return pointFromVector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "progress", function() { return progress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "radiansToDegrees", function() { return radiansToDegrees; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reverseEasing", function() { return reverseEasing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "smooth", function() { return smooth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "smoothFrame", function() { return smoothFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "snap", function() { return snap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spring", function() { return spring; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "steps", function() { return steps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toDecimal", function() { return toDecimal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "velocityPerFrame", function() { return velocityPerFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "velocityPerSecond", function() { return velocityPerSecond; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrap", function() { return wrap; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/popmotion/node_modules/tslib/tslib.es6.js");
/* harmony import */ var hey_listen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hey-listen */ "../../node_modules/hey-listen/dist/hey-listen.es.js");
/* harmony import */ var style_value_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! style-value-types */ "../../node_modules/style-value-types/dist/style-value-types.es.js");
/* harmony import */ var framesync__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! framesync */ "../../node_modules/framesync/dist/framesync.es.js");





var clamp = function (min, max, v) {
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
    Object(hey_listen__WEBPACK_IMPORTED_MODULE_1__["warning"])(duration <= maxDuration * 1000, "Spring duration must be 10 seconds or less");
    var dampingRatio = 1 - bounce;
    dampingRatio = clamp(minDamping, maxDamping, dampingRatio);
    duration = clamp(minDuration, maxDuration, duration / 1000);
    if (dampingRatio < 1) {
        envelope = function (undampedFreq) {
            var exponentialDecay = undampedFreq * dampingRatio;
            var delta = exponentialDecay * duration;
            var a = exponentialDecay - velocity;
            var b = calcAngularFreq(undampedFreq, dampingRatio);
            var c = Math.exp(-delta);
            return safeMin - a / b * c;
        };
        derivative = function (undampedFreq) {
            var exponentialDecay = undampedFreq * dampingRatio;
            var delta = exponentialDecay * duration;
            var d = delta * velocity + velocity;
            var e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq, 2) * duration;
            var f = Math.exp(-delta);
            var g = calcAngularFreq(Math.pow(undampedFreq, 2), dampingRatio);
            var factor = -envelope(undampedFreq) + safeMin > 0 ? -1 : 1;
            return factor * ((d - e) * f) / g;
        };
    } else {
        envelope = function (undampedFreq) {
            var a = Math.exp(-undampedFreq * duration);
            var b = (undampedFreq - velocity) * duration + 1;
            return -safeMin + a * b;
        };
        derivative = function (undampedFreq) {
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
            damping: 10
        };
    } else {
        var stiffness = Math.pow(undampedFreq, 2) * mass;
        return {
            stiffness: stiffness,
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

var durationKeys = ["duration", "bounce"];
var physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys) {
    return keys.some(function (key) {
        return options[key] !== undefined;
    });
}
function getSpringOptions(options) {
    var springOptions = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ velocity: 0.0, stiffness: 100, damping: 10, mass: 1.0, isResolvedFromDuration: false }, options);
    if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
        var derived = findSpring(options);
        springOptions = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, springOptions), derived), { velocity: 0.0, mass: 1.0 });
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
        options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["from", "to", "restSpeed", "restDelta"]);
    var state = { done: false, value: from };
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
        restDelta !== null && restDelta !== void 0 ? restDelta : restDelta = Math.abs(to - from) <= 1 ? 0.01 : 0.4;
        if (dampingRatio < 1) {
            var angularFreq_1 = calcAngularFreq(undampedAngularFreq, dampingRatio);
            resolveSpring = function (t) {
                var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
                return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq_1 * Math.sin(angularFreq_1 * t) + initialDelta * Math.cos(angularFreq_1 * t));
            };
            resolveVelocity = function (t) {
                var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
                return dampingRatio * undampedAngularFreq * envelope * (Math.sin(angularFreq_1 * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq_1 + initialDelta * Math.cos(angularFreq_1 * t)) - envelope * (Math.cos(angularFreq_1 * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) - angularFreq_1 * initialDelta * Math.sin(angularFreq_1 * t));
            };
        } else if (dampingRatio === 1) {
            resolveSpring = function (t) {
                return to - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
            };
        } else {
            var dampedAngularFreq_1 = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
            resolveSpring = function (t) {
                var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
                var freqForT = Math.min(dampedAngularFreq_1 * t, 300);
                return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq_1 * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq_1;
            };
        }
    }
    createSpring();
    return {
        next: function (t) {
            var current = resolveSpring(t);
            if (!isResolvedFromDuration) {
                var currentVelocity = resolveVelocity(t) * 1000;
                var isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
                var isBelowDisplacementThreshold = Math.abs(to - current) <= restDelta;
                state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
            } else {
                state.done = t >= options.duration;
            }
            state.value = state.done ? to : current;
            return state;
        },
        flipTarget: function () {
            var _a;
            velocity = -velocity;
            _a = [to, from], from = _a[0], to = _a[1];
            createSpring();
        }
    };
}
spring.needsInterpolation = function (a, b) {
    return typeof a === "string" || typeof b === "string";
};
var zero = function (_t) {
    return 0;
};

var progress = function (from, to, value) {
    var toFromDifference = to - from;
    return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};

var mix = function (from, to, progress) {
    return -progress * from + progress * to + from;
};

var mixLinearColor = function (from, to, v) {
    var fromExpo = from * from;
    var toExpo = to * to;
    return Math.sqrt(Math.max(0, v * (toExpo - fromExpo) + fromExpo));
};
var colorTypes = [style_value_types__WEBPACK_IMPORTED_MODULE_2__["hex"], style_value_types__WEBPACK_IMPORTED_MODULE_2__["rgba"], style_value_types__WEBPACK_IMPORTED_MODULE_2__["hsla"]];
var getColorType = function (v) {
    return colorTypes.find(function (type) {
        return type.test(v);
    });
};
var notAnimatable = function (color) {
    return "'" + color + "' is not an animatable color. Use the equivalent color code instead.";
};
var mixColor = function (from, to) {
    var fromColorType = getColorType(from);
    var toColorType = getColorType(to);
    Object(hey_listen__WEBPACK_IMPORTED_MODULE_1__["invariant"])(!!fromColorType, notAnimatable(from));
    Object(hey_listen__WEBPACK_IMPORTED_MODULE_1__["invariant"])(!!toColorType, notAnimatable(to));
    Object(hey_listen__WEBPACK_IMPORTED_MODULE_1__["invariant"])(fromColorType.transform === toColorType.transform, 'Both colors must be hex/RGBA, OR both must be HSLA.');
    var fromColor = fromColorType.parse(from);
    var toColor = toColorType.parse(to);
    var blended = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, fromColor);
    var mixFunc = fromColorType === style_value_types__WEBPACK_IMPORTED_MODULE_2__["hsla"] ? mix : mixLinearColor;
    return function (v) {
        for (var key in blended) {
            if (key !== 'alpha') {
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
    z: 0
};
var isNum = function (v) {
    return typeof v === 'number';
};

var combineFunctions = function (a, b) {
    return function (v) {
        return b(a(v));
    };
};
var pipe = function () {
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
    } else if (style_value_types__WEBPACK_IMPORTED_MODULE_2__["color"].test(origin)) {
        return mixColor(origin, target);
    } else {
        return mixComplex(origin, target);
    }
}
var mixArray = function (from, to) {
    var output = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArrays"])(from);
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
var mixObject = function (origin, target) {
    var output = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, origin), target);
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
    var parsed = style_value_types__WEBPACK_IMPORTED_MODULE_2__["complex"].parse(value);
    var numValues = parsed.length;
    var numNumbers = 0;
    var numRGB = 0;
    var numHSL = 0;
    for (var i = 0; i < numValues; i++) {
        if (numNumbers || typeof parsed[i] === 'number') {
            numNumbers++;
        } else {
            if (parsed[i].hue !== undefined) {
                numHSL++;
            } else {
                numRGB++;
            }
        }
    }
    return { parsed: parsed, numNumbers: numNumbers, numRGB: numRGB, numHSL: numHSL };
}
var mixComplex = function (origin, target) {
    var template = style_value_types__WEBPACK_IMPORTED_MODULE_2__["complex"].createTransformer(target);
    var originStats = analyse(origin);
    var targetStats = analyse(target);
    Object(hey_listen__WEBPACK_IMPORTED_MODULE_1__["invariant"])(originStats.numHSL === targetStats.numHSL && originStats.numRGB === targetStats.numRGB && originStats.numNumbers >= targetStats.numNumbers, "Complex values '" + origin + "' and '" + target + "' too different to mix. Ensure all colors are of the same type.");
    return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
};

var mixNumber = function (from, to) {
    return function (p) {
        return mix(from, to, p);
    };
};
function detectMixerFactory(v) {
    if (typeof v === 'number') {
        return mixNumber;
    } else if (typeof v === 'string') {
        if (style_value_types__WEBPACK_IMPORTED_MODULE_2__["color"].test(v)) {
            return mixColor;
        } else {
            return mixComplex;
        }
    } else if (Array.isArray(v)) {
        return mixArray;
    } else if (typeof v === 'object') {
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
        var progressInRange = progress(input[mixerIndex], input[mixerIndex + 1], v);
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
    Object(hey_listen__WEBPACK_IMPORTED_MODULE_1__["invariant"])(inputLength === output.length, 'Both input and output ranges must be the same length');
    Object(hey_listen__WEBPACK_IMPORTED_MODULE_1__["invariant"])(!ease || !Array.isArray(ease) || ease.length === inputLength - 1, 'Array of easing functions must be of length `input.length - 1`, as it applies to the transitions **between** the defined values.');
    if (input[0] > input[inputLength - 1]) {
        input = [].concat(input);
        output = [].concat(output);
        input.reverse();
        output.reverse();
    }
    var mixers = createMixers(output, ease, mixer);
    var interpolator = inputLength === 2 ? fastInterpolate(input, mixers) : slowInterpolate(input, mixers);
    return isClamp ? function (v) {
        return interpolator(clamp(input[0], input[inputLength - 1], v));
    } : interpolator;
}

var reverseEasing = function (easing) {
    return function (p) {
        return 1 - easing(1 - p);
    };
};
var mirrorEasing = function (easing) {
    return function (p) {
        return p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
    };
};
var createExpoIn = function (power) {
    return function (p) {
        return Math.pow(p, power);
    };
};
var createBackIn = function (power) {
    return function (p) {
        return p * p * ((power + 1) * p - power);
    };
};
var createAnticipate = function (power) {
    var backEasing = createBackIn(power);
    return function (p) {
        return (p *= 2) < 1 ? 0.5 * backEasing(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
    };
};

var DEFAULT_OVERSHOOT_STRENGTH = 1.525;
var BOUNCE_FIRST_THRESHOLD = 4.0 / 11.0;
var BOUNCE_SECOND_THRESHOLD = 8.0 / 11.0;
var BOUNCE_THIRD_THRESHOLD = 9.0 / 10.0;
var linear = function (p) {
    return p;
};
var easeIn = /*#__PURE__*/createExpoIn(2);
var easeOut = /*#__PURE__*/reverseEasing(easeIn);
var easeInOut = /*#__PURE__*/mirrorEasing(easeIn);
var circIn = function (p) {
    return 1 - Math.sin(Math.acos(p));
};
var circOut = /*#__PURE__*/reverseEasing(circIn);
var circInOut = /*#__PURE__*/mirrorEasing(circOut);
var backIn = /*#__PURE__*/createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
var backOut = /*#__PURE__*/reverseEasing(backIn);
var backInOut = /*#__PURE__*/mirrorEasing(backIn);
var anticipate = /*#__PURE__*/createAnticipate(DEFAULT_OVERSHOOT_STRENGTH);
var ca = 4356.0 / 361.0;
var cb = 35442.0 / 1805.0;
var cc = 16061.0 / 1805.0;
var bounceOut = function (p) {
    if (p === 1 || p === 0) return p;
    var p2 = p * p;
    return p < BOUNCE_FIRST_THRESHOLD ? 7.5625 * p2 : p < BOUNCE_SECOND_THRESHOLD ? 9.075 * p2 - 9.9 * p + 3.4 : p < BOUNCE_THIRD_THRESHOLD ? ca * p2 - cb * p + cc : 10.8 * p * p - 20.52 * p + 10.72;
};
var bounceIn = /*#__PURE__*/reverseEasing(bounceOut);
var bounceInOut = function (p) {
    return p < 0.5 ? 0.5 * (1.0 - bounceOut(1.0 - p * 2.0)) : 0.5 * bounceOut(p * 2.0 - 1.0) + 0.5;
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
    var state = { done: false, value: from };
    var values = Array.isArray(to) ? to : [from, to];
    var times = convertOffsetToTimes(offset && offset.length === values.length ? offset : defaultOffset(values), duration);
    function createInterpolator() {
        return interpolate(times, values, {
            ease: Array.isArray(ease) ? ease : defaultEasing(values, ease)
        });
    }
    var interpolator = createInterpolator();
    return {
        next: function (t) {
            state.value = interpolator(t);
            state.done = t >= duration;
            return state;
        },
        flipTarget: function () {
            values.reverse();
            interpolator = createInterpolator();
        }
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
    var state = { done: false, value: from };
    var amplitude = power * velocity;
    var ideal = from + amplitude;
    var target = modifyTarget === undefined ? ideal : modifyTarget(ideal);
    if (target !== ideal) amplitude = target - from;
    return {
        next: function (t) {
            var delta = -amplitude * Math.exp(-t / timeConstant);
            state.done = !(delta > restDelta || delta < -restDelta);
            state.value = state.done ? target : target + delta;
            return state;
        },
        flipTarget: function () {}
    };
}

var types = { keyframes: keyframes, spring: spring, decay: decay };
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
    return isForwardPlayback ? loopElapsed(duration + -elapsed, duration, delay) : duration - (elapsed - duration) + delay;
}
function hasRepeatDelayElapsed(elapsed, duration, delay, isForwardPlayback) {
    return isForwardPlayback ? elapsed >= duration + delay : elapsed <= -delay;
}

var framesync = function (update) {
    var passTimestamp = function (_a) {
        var delta = _a.delta;
        return update(delta);
    };
    return {
        start: function () {
            return framesync__WEBPACK_IMPORTED_MODULE_3__["default"].update(passTimestamp, true, true);
        },
        stop: function () {
            return framesync__WEBPACK_IMPORTED_MODULE_3__["cancelSync"].update(passTimestamp);
        }
    };
};
function animate(_a) {
    var _b, _c;
    var from = _a.from,
        _d = _a.autoplay,
        autoplay = _d === void 0 ? true : _d,
        _e = _a.driver,
        driver = _e === void 0 ? framesync : _e,
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
        options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["from", "autoplay", "driver", "elapsed", "repeat", "repeatType", "repeatDelay", "onPlay", "onStop", "onComplete", "onRepeat", "onUpdate"]);
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
    var animation = animator(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), { from: from, to: to }));
    function repeat() {
        repeatCount++;
        if (repeatType === "reverse") {
            isForwardPlayback = repeatCount % 2 === 0;
            elapsed = reverseElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback);
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
            if (repeatCount === 0) computedDuration !== null && computedDuration !== void 0 ? computedDuration : computedDuration = elapsed;
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
        stop: function () {
            onStop === null || onStop === void 0 ? void 0 : onStop();
            driverControls.stop();
        }
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
        onUpdate = _a.onUpdate,
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
        currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
        currentAnimation = animate(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), { driver: driver, onUpdate: function (v) {
                var _a;
                onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(v);
                (_a = options.onUpdate) === null || _a === void 0 ? void 0 : _a.call(options, v);
            }, onComplete: onComplete }));
    }
    function startSpring(options) {
        startAnimation(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ type: "spring", stiffness: bounceStiffness, damping: bounceDamping, restDelta: restDelta }, options));
    }
    if (isOutOfBounds(from)) {
        startSpring({ from: from, velocity: velocity, to: boundaryNearest(from) });
    } else {
        var target = power * velocity + from;
        if (typeof modifyTarget !== "undefined") target = modifyTarget(target);
        var boundary_1 = boundaryNearest(target);
        var heading_1 = boundary_1 === min ? -1 : 1;
        var prev_1;
        var current_1;
        var checkBoundary = function (v) {
            prev_1 = current_1;
            current_1 = v;
            velocity = velocityPerSecond(v - prev_1, Object(framesync__WEBPACK_IMPORTED_MODULE_3__["getFrameData"])().delta);
            if (heading_1 === 1 && v > boundary_1 || heading_1 === -1 && v < boundary_1) {
                startSpring({ from: v, to: boundary_1, velocity: velocity });
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
            onUpdate: isOutOfBounds(target) ? checkBoundary : undefined
        });
    }
    return {
        stop: function () {
            return currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
        }
    };
}

var radiansToDegrees = function (radians) {
    return radians * 180 / Math.PI;
};

var angle = function (a, b) {
    if (b === void 0) {
        b = zeroPoint;
    }
    return radiansToDegrees(Math.atan2(b.y - a.y, b.x - a.x));
};

var applyOffset = function (from, to) {
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

var identity = function (v) {
    return v;
};
var createAttractor = function (alterDisplacement) {
    if (alterDisplacement === void 0) {
        alterDisplacement = identity;
    }
    return function (constant, origin, v) {
        var displacement = origin - v;
        var springModifiedDisplacement = -(0 - constant + 1) * (0 - alterDisplacement(Math.abs(displacement)));
        return displacement <= 0 ? origin + springModifiedDisplacement : origin - springModifiedDisplacement;
    };
};
var attract = /*#__PURE__*/createAttractor();
var attractExpo = /*#__PURE__*/createAttractor(Math.sqrt);

var degreesToRadians = function (degrees) {
    return degrees * Math.PI / 180;
};

var isPoint = function (point) {
    return point.hasOwnProperty('x') && point.hasOwnProperty('y');
};

var isPoint3D = function (point) {
    return isPoint(point) && point.hasOwnProperty('z');
};

var distance1D = function (a, b) {
    return Math.abs(a - b);
};
function distance(a, b) {
    if (isNum(a) && isNum(b)) {
        return distance1D(a, b);
    } else if (isPoint(a) && isPoint(b)) {
        var xDelta = distance1D(a.x, b.x);
        var yDelta = distance1D(a.y, b.y);
        var zDelta = isPoint3D(a) && isPoint3D(b) ? distance1D(a.z, b.z) : 0;
        return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2) + Math.pow(zDelta, 2));
    }
}

var pointFromVector = function (origin, angle, distance) {
    angle = degreesToRadians(angle);
    return {
        x: distance * Math.cos(angle) + origin.x,
        y: distance * Math.sin(angle) + origin.y
    };
};

var toDecimal = function (num, precision) {
    if (precision === void 0) {
        precision = 2;
    }
    precision = Math.pow(10, precision);
    return Math.round(num * precision) / precision;
};

var smoothFrame = function (prevValue, nextValue, duration, smoothing) {
    if (smoothing === void 0) {
        smoothing = 0;
    }
    return toDecimal(prevValue + duration * (nextValue - prevValue) / Math.max(smoothing, duration));
};

var smooth = function (strength) {
    if (strength === void 0) {
        strength = 50;
    }
    var previousValue = 0;
    var lastUpdated = 0;
    return function (v) {
        var currentFramestamp = Object(framesync__WEBPACK_IMPORTED_MODULE_3__["getFrameData"])().timestamp;
        var timeDelta = currentFramestamp !== lastUpdated ? currentFramestamp - lastUpdated : 0;
        var newValue = timeDelta ? smoothFrame(previousValue, v, timeDelta, strength) : previousValue;
        lastUpdated = currentFramestamp;
        previousValue = newValue;
        return newValue;
    };
};

var snap = function (points) {
    if (typeof points === 'number') {
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

var wrap = function (min, max, v) {
    var rangeSize = max - min;
    return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
};

var a = function (a1, a2) {
    return 1.0 - 3.0 * a2 + 3.0 * a1;
};
var b = function (a1, a2) {
    return 3.0 * a2 - 6.0 * a1;
};
var c = function (a1) {
    return 3.0 * a1;
};
var calcBezier = function (t, a1, a2) {
    return ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
};
var getSlope = function (t, a1, a2) {
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
    } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
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
        for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
            intervalStart += kSampleStepSize;
        }
        --currentSample;
        var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
        var guessForT = intervalStart + dist * kSampleStepSize;
        var initialSlope = getSlope(guessForT, mX1, mX2);
        if (initialSlope >= newtonMinSlope) {
            return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
        } else if (initialSlope === 0.0) {
            return guessForT;
        } else {
            return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
        }
    }
    return function (t) {
        return t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
    };
}

var steps = function (steps, direction) {
    if (direction === void 0) {
        direction = 'end';
    }
    return function (progress) {
        progress = direction === 'end' ? Math.min(progress, 0.999) : Math.max(progress, 0.001);
        var expanded = progress * steps;
        var rounded = direction === 'end' ? Math.floor(expanded) : Math.ceil(expanded);
        return clamp(0, 1, rounded / steps);
    };
};




/***/ }),

/***/ "../../node_modules/popmotion/node_modules/tslib/tslib.es6.js":
/*!**************************************************************************!*\
  !*** /z/monorepo/node_modules/popmotion/node_modules/tslib/tslib.es6.js ***!
  \**************************************************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
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

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
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


/***/ }),

/***/ "../../node_modules/prop-types/factoryWithThrowingShims.js":
/*!***********************************************************************!*\
  !*** /z/monorepo/node_modules/prop-types/factoryWithThrowingShims.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "../../node_modules/prop-types/lib/ReactPropTypesSecret.js");

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
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


/***/ }),

/***/ "../../node_modules/prop-types/index.js":
/*!****************************************************!*\
  !*** /z/monorepo/node_modules/prop-types/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(/*! ./factoryWithThrowingShims */ "../../node_modules/prop-types/factoryWithThrowingShims.js")();
}


/***/ }),

/***/ "../../node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!***********************************************************************!*\
  !*** /z/monorepo/node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "../../node_modules/react-dom/cjs/react-dom.production.min.js":
/*!**************************************************************************!*\
  !*** /z/monorepo/node_modules/react-dom/cjs/react-dom.production.min.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v17.0.1
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
var aa=__webpack_require__(/*! react */ "react"),m=__webpack_require__(/*! object-assign */ "../../node_modules/object-assign/index.js"),r=__webpack_require__(/*! scheduler */ "../../node_modules/scheduler/index.js");function y(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}if(!aa)throw Error(y(227));var ba=new Set,ca={};function da(a,b){ea(a,b);ea(a+"Capture",b)}
function ea(a,b){ca[a]=b;for(a=0;a<b.length;a++)ba.add(b[a])}
var fa=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),ha=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ia=Object.prototype.hasOwnProperty,
ja={},ka={};function la(a){if(ia.call(ka,a))return!0;if(ia.call(ja,a))return!1;if(ha.test(a))return ka[a]=!0;ja[a]=!0;return!1}function ma(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}
function na(a,b,c,d){if(null===b||"undefined"===typeof b||ma(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function B(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g}var D={};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){D[a]=new B(a,0,!1,a,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];D[b]=new B(b,1,!1,a[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){D[a]=new B(a,2,!1,a.toLowerCase(),null,!1,!1)});
["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){D[a]=new B(a,2,!1,a,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){D[a]=new B(a,3,!1,a.toLowerCase(),null,!1,!1)});
["checked","multiple","muted","selected"].forEach(function(a){D[a]=new B(a,3,!0,a,null,!1,!1)});["capture","download"].forEach(function(a){D[a]=new B(a,4,!1,a,null,!1,!1)});["cols","rows","size","span"].forEach(function(a){D[a]=new B(a,6,!1,a,null,!1,!1)});["rowSpan","start"].forEach(function(a){D[a]=new B(a,5,!1,a.toLowerCase(),null,!1,!1)});var oa=/[\-:]([a-z])/g;function pa(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(oa,
pa);D[b]=new B(b,1,!1,a,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(oa,pa);D[b]=new B(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(oa,pa);D[b]=new B(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(a){D[a]=new B(a,1,!1,a.toLowerCase(),null,!1,!1)});
D.xlinkHref=new B("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){D[a]=new B(a,1,!1,a.toLowerCase(),null,!0,!0)});
function qa(a,b,c,d){var e=D.hasOwnProperty(b)?D[b]:null;var f=null!==e?0===e.type:d?!1:!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1]?!1:!0;f||(na(b,c,e,d)&&(c=null),d||null===e?la(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c))))}
var ra=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,sa=60103,ta=60106,ua=60107,wa=60108,xa=60114,ya=60109,za=60110,Aa=60112,Ba=60113,Ca=60120,Da=60115,Ea=60116,Fa=60121,Ga=60128,Ha=60129,Ia=60130,Ja=60131;
if("function"===typeof Symbol&&Symbol.for){var E=Symbol.for;sa=E("react.element");ta=E("react.portal");ua=E("react.fragment");wa=E("react.strict_mode");xa=E("react.profiler");ya=E("react.provider");za=E("react.context");Aa=E("react.forward_ref");Ba=E("react.suspense");Ca=E("react.suspense_list");Da=E("react.memo");Ea=E("react.lazy");Fa=E("react.block");E("react.scope");Ga=E("react.opaque.id");Ha=E("react.debug_trace_mode");Ia=E("react.offscreen");Ja=E("react.legacy_hidden")}
var Ka="function"===typeof Symbol&&Symbol.iterator;function La(a){if(null===a||"object"!==typeof a)return null;a=Ka&&a[Ka]||a["@@iterator"];return"function"===typeof a?a:null}var Ma;function Na(a){if(void 0===Ma)try{throw Error();}catch(c){var b=c.stack.trim().match(/\n( *(at )?)/);Ma=b&&b[1]||""}return"\n"+Ma+a}var Oa=!1;
function Pa(a,b){if(!a||Oa)return"";Oa=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[])}catch(k){var d=k}Reflect.construct(a,[],b)}else{try{b.call()}catch(k){d=k}a.call(b.prototype)}else{try{throw Error();}catch(k){d=k}a()}}catch(k){if(k&&d&&"string"===typeof k.stack){for(var e=k.stack.split("\n"),
f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h])return"\n"+e[g].replace(" at new "," at ");while(1<=g&&0<=h)}break}}}finally{Oa=!1,Error.prepareStackTrace=c}return(a=a?a.displayName||a.name:"")?Na(a):""}
function Qa(a){switch(a.tag){case 5:return Na(a.type);case 16:return Na("Lazy");case 13:return Na("Suspense");case 19:return Na("SuspenseList");case 0:case 2:case 15:return a=Pa(a.type,!1),a;case 11:return a=Pa(a.type.render,!1),a;case 22:return a=Pa(a.type._render,!1),a;case 1:return a=Pa(a.type,!0),a;default:return""}}
function Ra(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case ua:return"Fragment";case ta:return"Portal";case xa:return"Profiler";case wa:return"StrictMode";case Ba:return"Suspense";case Ca:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case za:return(a.displayName||"Context")+".Consumer";case ya:return(a._context.displayName||"Context")+".Provider";case Aa:var b=a.render;b=b.displayName||b.name||"";
return a.displayName||(""!==b?"ForwardRef("+b+")":"ForwardRef");case Da:return Ra(a.type);case Fa:return Ra(a._render);case Ea:b=a._payload;a=a._init;try{return Ra(a(b))}catch(c){}}return null}function Sa(a){switch(typeof a){case "boolean":case "number":case "object":case "string":case "undefined":return a;default:return""}}function Ta(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function Ua(a){var b=Ta(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function Va(a){a._valueTracker||(a._valueTracker=Ua(a))}function Wa(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=Ta(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function Xa(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}
function Ya(a,b){var c=b.checked;return m({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function Za(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Sa(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function $a(a,b){b=b.checked;null!=b&&qa(a,"checked",b,!1)}
function ab(a,b){$a(a,b);var c=Sa(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?bb(a,b.type,c):b.hasOwnProperty("defaultValue")&&bb(a,b.type,Sa(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
function cb(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c)}
function bb(a,b,c){if("number"!==b||Xa(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}function db(a){var b="";aa.Children.forEach(a,function(a){null!=a&&(b+=a)});return b}function eb(a,b){a=m({children:void 0},b);if(b=db(b.children))a.children=b;return a}
function fb(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+Sa(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
function gb(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(y(91));return m({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function hb(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(y(92));if(Array.isArray(c)){if(!(1>=c.length))throw Error(y(93));c=c[0]}b=c}null==b&&(b="");c=b}a._wrapperState={initialValue:Sa(c)}}
function ib(a,b){var c=Sa(b.value),d=Sa(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d)}function jb(a){var b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b)}var kb={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
function lb(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function mb(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?lb(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
var nb,ob=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if(a.namespaceURI!==kb.svg||"innerHTML"in a)a.innerHTML=b;else{nb=nb||document.createElement("div");nb.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=nb.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
function pb(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}
var qb={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,
floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},rb=["Webkit","ms","Moz","O"];Object.keys(qb).forEach(function(a){rb.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);qb[b]=qb[a]})});function sb(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||qb.hasOwnProperty(a)&&qb[a]?(""+b).trim():b+"px"}
function tb(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=sb(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var ub=m({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
function vb(a,b){if(b){if(ub[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(y(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(y(60));if(!("object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML))throw Error(y(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(y(62));}}
function wb(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}function xb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}var yb=null,zb=null,Ab=null;
function Bb(a){if(a=Cb(a)){if("function"!==typeof yb)throw Error(y(280));var b=a.stateNode;b&&(b=Db(b),yb(a.stateNode,a.type,b))}}function Eb(a){zb?Ab?Ab.push(a):Ab=[a]:zb=a}function Fb(){if(zb){var a=zb,b=Ab;Ab=zb=null;Bb(a);if(b)for(a=0;a<b.length;a++)Bb(b[a])}}function Gb(a,b){return a(b)}function Hb(a,b,c,d,e){return a(b,c,d,e)}function Ib(){}var Jb=Gb,Kb=!1,Lb=!1;function Mb(){if(null!==zb||null!==Ab)Ib(),Fb()}
function Nb(a,b,c){if(Lb)return a(b,c);Lb=!0;try{return Jb(a,b,c)}finally{Lb=!1,Mb()}}
function Ob(a,b){var c=a.stateNode;if(null===c)return null;var d=Db(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;if(c&&"function"!==
typeof c)throw Error(y(231,b,typeof c));return c}var Pb=!1;if(fa)try{var Qb={};Object.defineProperty(Qb,"passive",{get:function(){Pb=!0}});window.addEventListener("test",Qb,Qb);window.removeEventListener("test",Qb,Qb)}catch(a){Pb=!1}function Rb(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l)}catch(n){this.onError(n)}}var Sb=!1,Tb=null,Ub=!1,Vb=null,Wb={onError:function(a){Sb=!0;Tb=a}};function Xb(a,b,c,d,e,f,g,h,k){Sb=!1;Tb=null;Rb.apply(Wb,arguments)}
function Yb(a,b,c,d,e,f,g,h,k){Xb.apply(this,arguments);if(Sb){if(Sb){var l=Tb;Sb=!1;Tb=null}else throw Error(y(198));Ub||(Ub=!0,Vb=l)}}function Zb(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.flags&1026)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function $b(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function ac(a){if(Zb(a)!==a)throw Error(y(188));}
function bc(a){var b=a.alternate;if(!b){b=Zb(a);if(null===b)throw Error(y(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return ac(e),a;if(f===d)return ac(e),b;f=f.sibling}throw Error(y(188));}if(c.return!==d.return)c=e,d=f;else{for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===
c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}if(!g)throw Error(y(189));}}if(c.alternate!==d)throw Error(y(190));}if(3!==c.tag)throw Error(y(188));return c.stateNode.current===c?a:b}function cc(a){a=bc(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child.return=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}}return null}
function dc(a,b){for(var c=a.alternate;null!==b;){if(b===a||b===c)return!0;b=b.return}return!1}var ec,fc,gc,hc,ic=!1,jc=[],kc=null,lc=null,mc=null,nc=new Map,oc=new Map,pc=[],qc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function rc(a,b,c,d,e){return{blockedOn:a,domEventName:b,eventSystemFlags:c|16,nativeEvent:e,targetContainers:[d]}}function sc(a,b){switch(a){case "focusin":case "focusout":kc=null;break;case "dragenter":case "dragleave":lc=null;break;case "mouseover":case "mouseout":mc=null;break;case "pointerover":case "pointerout":nc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":oc.delete(b.pointerId)}}
function tc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a=rc(b,c,d,e,f),null!==b&&(b=Cb(b),null!==b&&fc(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}
function uc(a,b,c,d,e){switch(b){case "focusin":return kc=tc(kc,a,b,c,d,e),!0;case "dragenter":return lc=tc(lc,a,b,c,d,e),!0;case "mouseover":return mc=tc(mc,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;nc.set(f,tc(nc.get(f)||null,a,b,c,d,e));return!0;case "gotpointercapture":return f=e.pointerId,oc.set(f,tc(oc.get(f)||null,a,b,c,d,e)),!0}return!1}
function vc(a){var b=wc(a.target);if(null!==b){var c=Zb(b);if(null!==c)if(b=c.tag,13===b){if(b=$b(c),null!==b){a.blockedOn=b;hc(a.lanePriority,function(){r.unstable_runWithPriority(a.priority,function(){gc(c)})});return}}else if(3===b&&c.stateNode.hydrate){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null}
function xc(a){if(null!==a.blockedOn)return!1;for(var b=a.targetContainers;0<b.length;){var c=yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null!==c)return b=Cb(c),null!==b&&fc(b),a.blockedOn=c,!1;b.shift()}return!0}function zc(a,b,c){xc(a)&&c.delete(b)}
function Ac(){for(ic=!1;0<jc.length;){var a=jc[0];if(null!==a.blockedOn){a=Cb(a.blockedOn);null!==a&&ec(a);break}for(var b=a.targetContainers;0<b.length;){var c=yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null!==c){a.blockedOn=c;break}b.shift()}null===a.blockedOn&&jc.shift()}null!==kc&&xc(kc)&&(kc=null);null!==lc&&xc(lc)&&(lc=null);null!==mc&&xc(mc)&&(mc=null);nc.forEach(zc);oc.forEach(zc)}
function Bc(a,b){a.blockedOn===b&&(a.blockedOn=null,ic||(ic=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Ac)))}
function Cc(a){function b(b){return Bc(b,a)}if(0<jc.length){Bc(jc[0],a);for(var c=1;c<jc.length;c++){var d=jc[c];d.blockedOn===a&&(d.blockedOn=null)}}null!==kc&&Bc(kc,a);null!==lc&&Bc(lc,a);null!==mc&&Bc(mc,a);nc.forEach(b);oc.forEach(b);for(c=0;c<pc.length;c++)d=pc[c],d.blockedOn===a&&(d.blockedOn=null);for(;0<pc.length&&(c=pc[0],null===c.blockedOn);)vc(c),null===c.blockedOn&&pc.shift()}
function Dc(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var Ec={animationend:Dc("Animation","AnimationEnd"),animationiteration:Dc("Animation","AnimationIteration"),animationstart:Dc("Animation","AnimationStart"),transitionend:Dc("Transition","TransitionEnd")},Fc={},Gc={};
fa&&(Gc=document.createElement("div").style,"AnimationEvent"in window||(delete Ec.animationend.animation,delete Ec.animationiteration.animation,delete Ec.animationstart.animation),"TransitionEvent"in window||delete Ec.transitionend.transition);function Hc(a){if(Fc[a])return Fc[a];if(!Ec[a])return a;var b=Ec[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Gc)return Fc[a]=b[c];return a}
var Ic=Hc("animationend"),Jc=Hc("animationiteration"),Kc=Hc("animationstart"),Lc=Hc("transitionend"),Mc=new Map,Nc=new Map,Oc=["abort","abort",Ic,"animationEnd",Jc,"animationIteration",Kc,"animationStart","canplay","canPlay","canplaythrough","canPlayThrough","durationchange","durationChange","emptied","emptied","encrypted","encrypted","ended","ended","error","error","gotpointercapture","gotPointerCapture","load","load","loadeddata","loadedData","loadedmetadata","loadedMetadata","loadstart","loadStart",
"lostpointercapture","lostPointerCapture","playing","playing","progress","progress","seeking","seeking","stalled","stalled","suspend","suspend","timeupdate","timeUpdate",Lc,"transitionEnd","waiting","waiting"];function Pc(a,b){for(var c=0;c<a.length;c+=2){var d=a[c],e=a[c+1];e="on"+(e[0].toUpperCase()+e.slice(1));Nc.set(d,b);Mc.set(d,e);da(e,[d])}}var Qc=r.unstable_now;Qc();var F=8;
function Rc(a){if(0!==(1&a))return F=15,1;if(0!==(2&a))return F=14,2;if(0!==(4&a))return F=13,4;var b=24&a;if(0!==b)return F=12,b;if(0!==(a&32))return F=11,32;b=192&a;if(0!==b)return F=10,b;if(0!==(a&256))return F=9,256;b=3584&a;if(0!==b)return F=8,b;if(0!==(a&4096))return F=7,4096;b=4186112&a;if(0!==b)return F=6,b;b=62914560&a;if(0!==b)return F=5,b;if(a&67108864)return F=4,67108864;if(0!==(a&134217728))return F=3,134217728;b=805306368&a;if(0!==b)return F=2,b;if(0!==(1073741824&a))return F=1,1073741824;
F=8;return a}function Sc(a){switch(a){case 99:return 15;case 98:return 10;case 97:case 96:return 8;case 95:return 2;default:return 0}}function Tc(a){switch(a){case 15:case 14:return 99;case 13:case 12:case 11:case 10:return 98;case 9:case 8:case 7:case 6:case 4:case 5:return 97;case 3:case 2:case 1:return 95;case 0:return 90;default:throw Error(y(358,a));}}
function Uc(a,b){var c=a.pendingLanes;if(0===c)return F=0;var d=0,e=0,f=a.expiredLanes,g=a.suspendedLanes,h=a.pingedLanes;if(0!==f)d=f,e=F=15;else if(f=c&134217727,0!==f){var k=f&~g;0!==k?(d=Rc(k),e=F):(h&=f,0!==h&&(d=Rc(h),e=F))}else f=c&~g,0!==f?(d=Rc(f),e=F):0!==h&&(d=Rc(h),e=F);if(0===d)return 0;d=31-Vc(d);d=c&((0>d?0:1<<d)<<1)-1;if(0!==b&&b!==d&&0===(b&g)){Rc(b);if(e<=F)return b;F=e}b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-Vc(b),e=1<<c,d|=a[c],b&=~e;return d}
function Wc(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function Xc(a,b){switch(a){case 15:return 1;case 14:return 2;case 12:return a=Yc(24&~b),0===a?Xc(10,b):a;case 10:return a=Yc(192&~b),0===a?Xc(8,b):a;case 8:return a=Yc(3584&~b),0===a&&(a=Yc(4186112&~b),0===a&&(a=512)),a;case 2:return b=Yc(805306368&~b),0===b&&(b=268435456),b}throw Error(y(358,a));}function Yc(a){return a&-a}function Zc(a){for(var b=[],c=0;31>c;c++)b.push(a);return b}
function $c(a,b,c){a.pendingLanes|=b;var d=b-1;a.suspendedLanes&=d;a.pingedLanes&=d;a=a.eventTimes;b=31-Vc(b);a[b]=c}var Vc=Math.clz32?Math.clz32:ad,bd=Math.log,cd=Math.LN2;function ad(a){return 0===a?32:31-(bd(a)/cd|0)|0}var dd=r.unstable_UserBlockingPriority,ed=r.unstable_runWithPriority,fd=!0;function gd(a,b,c,d){Kb||Ib();var e=hd,f=Kb;Kb=!0;try{Hb(e,a,b,c,d)}finally{(Kb=f)||Mb()}}function id(a,b,c,d){ed(dd,hd.bind(null,a,b,c,d))}
function hd(a,b,c,d){if(fd){var e;if((e=0===(b&4))&&0<jc.length&&-1<qc.indexOf(a))a=rc(null,a,b,c,d),jc.push(a);else{var f=yc(a,b,c,d);if(null===f)e&&sc(a,d);else{if(e){if(-1<qc.indexOf(a)){a=rc(f,a,b,c,d);jc.push(a);return}if(uc(f,a,b,c,d))return;sc(a,d)}jd(a,b,d,null,c)}}}}
function yc(a,b,c,d){var e=xb(d);e=wc(e);if(null!==e){var f=Zb(e);if(null===f)e=null;else{var g=f.tag;if(13===g){e=$b(f);if(null!==e)return e;e=null}else if(3===g){if(f.stateNode.hydrate)return 3===f.tag?f.stateNode.containerInfo:null;e=null}else f!==e&&(e=null)}}jd(a,b,d,e,c);return null}var kd=null,ld=null,md=null;
function nd(){if(md)return md;var a,b=ld,c=b.length,d,e="value"in kd?kd.value:kd.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return md=e.slice(a,1<d?1-d:void 0)}function od(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function pd(){return!0}function qd(){return!1}
function rd(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:!1===f.returnValue)?pd:qd;this.isPropagationStopped=qd;return this}m(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&
(a.returnValue=!1),this.isDefaultPrevented=pd)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=pd)},persist:function(){},isPersistent:pd});return b}
var sd={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},td=rd(sd),ud=m({},sd,{view:0,detail:0}),vd=rd(ud),wd,xd,yd,Ad=m({},ud,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zd,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:a.relatedTarget},movementX:function(a){if("movementX"in
a)return a.movementX;a!==yd&&(yd&&"mousemove"===a.type?(wd=a.screenX-yd.screenX,xd=a.screenY-yd.screenY):xd=wd=0,yd=a);return wd},movementY:function(a){return"movementY"in a?a.movementY:xd}}),Bd=rd(Ad),Cd=m({},Ad,{dataTransfer:0}),Dd=rd(Cd),Ed=m({},ud,{relatedTarget:0}),Fd=rd(Ed),Gd=m({},sd,{animationName:0,elapsedTime:0,pseudoElement:0}),Hd=rd(Gd),Id=m({},sd,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),Jd=rd(Id),Kd=m({},sd,{data:0}),Ld=rd(Kd),Md={Esc:"Escape",
Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Nd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",
119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Od={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Pd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Od[a])?!!b[a]:!1}function zd(){return Pd}
var Qd=m({},ud,{key:function(a){if(a.key){var b=Md[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=od(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?Nd[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zd,charCode:function(a){return"keypress"===a.type?od(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===
a.type?od(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Rd=rd(Qd),Sd=m({},Ad,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Td=rd(Sd),Ud=m({},ud,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zd}),Vd=rd(Ud),Wd=m({},sd,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xd=rd(Wd),Yd=m({},Ad,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},
deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),Zd=rd(Yd),$d=[9,13,27,32],ae=fa&&"CompositionEvent"in window,be=null;fa&&"documentMode"in document&&(be=document.documentMode);var ce=fa&&"TextEvent"in window&&!be,de=fa&&(!ae||be&&8<be&&11>=be),ee=String.fromCharCode(32),fe=!1;
function ge(a,b){switch(a){case "keyup":return-1!==$d.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return!0;default:return!1}}function he(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var ie=!1;function je(a,b){switch(a){case "compositionend":return he(b);case "keypress":if(32!==b.which)return null;fe=!0;return ee;case "textInput":return a=b.data,a===ee&&fe?null:a;default:return null}}
function ke(a,b){if(ie)return"compositionend"===a||!ae&&ge(a,b)?(a=nd(),md=ld=kd=null,ie=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return de&&"ko"!==b.locale?null:b.data;default:return null}}
var le={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function me(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!le[a.type]:"textarea"===b?!0:!1}function ne(a,b,c,d){Eb(d);b=oe(b,"onChange");0<b.length&&(c=new td("onChange","change",null,c,d),a.push({event:c,listeners:b}))}var pe=null,qe=null;function re(a){se(a,0)}function te(a){var b=ue(a);if(Wa(b))return a}
function ve(a,b){if("change"===a)return b}var we=!1;if(fa){var xe;if(fa){var ye="oninput"in document;if(!ye){var ze=document.createElement("div");ze.setAttribute("oninput","return;");ye="function"===typeof ze.oninput}xe=ye}else xe=!1;we=xe&&(!document.documentMode||9<document.documentMode)}function Ae(){pe&&(pe.detachEvent("onpropertychange",Be),qe=pe=null)}function Be(a){if("value"===a.propertyName&&te(qe)){var b=[];ne(b,qe,a,xb(a));a=re;if(Kb)a(b);else{Kb=!0;try{Gb(a,b)}finally{Kb=!1,Mb()}}}}
function Ce(a,b,c){"focusin"===a?(Ae(),pe=b,qe=c,pe.attachEvent("onpropertychange",Be)):"focusout"===a&&Ae()}function De(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return te(qe)}function Ee(a,b){if("click"===a)return te(b)}function Fe(a,b){if("input"===a||"change"===a)return te(b)}function Ge(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var He="function"===typeof Object.is?Object.is:Ge,Ie=Object.prototype.hasOwnProperty;
function Je(a,b){if(He(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++)if(!Ie.call(b,c[d])||!He(a[c[d]],b[c[d]]))return!1;return!0}function Ke(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
function Le(a,b){var c=Ke(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=Ke(c)}}function Me(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?Me(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}
function Ne(){for(var a=window,b=Xa();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href}catch(d){c=!1}if(c)a=b.contentWindow;else break;b=Xa(a.document)}return b}function Oe(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
var Pe=fa&&"documentMode"in document&&11>=document.documentMode,Qe=null,Re=null,Se=null,Te=!1;
function Ue(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Te||null==Qe||Qe!==Xa(d)||(d=Qe,"selectionStart"in d&&Oe(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d={anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),Se&&Je(Se,d)||(Se=d,d=oe(Re,"onSelect"),0<d.length&&(b=new td("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Qe)))}
Pc("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "),
0);Pc("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "),1);Pc(Oc,2);for(var Ve="change selectionchange textInput compositionstart compositionend compositionupdate".split(" "),We=0;We<Ve.length;We++)Nc.set(Ve[We],0);ea("onMouseEnter",["mouseout","mouseover"]);
ea("onMouseLeave",["mouseout","mouseover"]);ea("onPointerEnter",["pointerout","pointerover"]);ea("onPointerLeave",["pointerout","pointerover"]);da("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));da("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));da("onBeforeInput",["compositionend","keypress","textInput","paste"]);da("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));
da("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));da("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Xe="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ye=new Set("cancel close invalid load scroll toggle".split(" ").concat(Xe));
function Ze(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;Yb(d,b,void 0,a);a.currentTarget=null}
function se(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;Ze(e,h,l);f=k}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;Ze(e,h,l);f=k}}}if(Ub)throw a=Vb,Ub=!1,Vb=null,a;}
function G(a,b){var c=$e(b),d=a+"__bubble";c.has(d)||(af(b,a,2,!1),c.add(d))}var bf="_reactListening"+Math.random().toString(36).slice(2);function cf(a){a[bf]||(a[bf]=!0,ba.forEach(function(b){Ye.has(b)||df(b,!1,a,null);df(b,!0,a,null)}))}
function df(a,b,c,d){var e=4<arguments.length&&void 0!==arguments[4]?arguments[4]:0,f=c;"selectionchange"===a&&9!==c.nodeType&&(f=c.ownerDocument);if(null!==d&&!b&&Ye.has(a)){if("scroll"!==a)return;e|=2;f=d}var g=$e(f),h=a+"__"+(b?"capture":"bubble");g.has(h)||(b&&(e|=4),af(f,a,e,b),g.add(h))}
function af(a,b,c,d){var e=Nc.get(b);switch(void 0===e?2:e){case 0:e=gd;break;case 1:e=id;break;default:e=hd}c=e.bind(null,b,c,a);e=void 0;!Pb||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=!0);d?void 0!==e?a.addEventListener(b,c,{capture:!0,passive:e}):a.addEventListener(b,c,!0):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,!1)}
function jd(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return}for(;null!==h;){g=wc(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode}}d=d.return}Nb(function(){var d=f,e=xb(c),g=[];
a:{var h=Mc.get(a);if(void 0!==h){var k=td,x=a;switch(a){case "keypress":if(0===od(c))break a;case "keydown":case "keyup":k=Rd;break;case "focusin":x="focus";k=Fd;break;case "focusout":x="blur";k=Fd;break;case "beforeblur":case "afterblur":k=Fd;break;case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=Bd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=
Dd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Vd;break;case Ic:case Jc:case Kc:k=Hd;break;case Lc:k=Xd;break;case "scroll":k=vd;break;case "wheel":k=Zd;break;case "copy":case "cut":case "paste":k=Jd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=Td}var w=0!==(b&4),z=!w&&"scroll"===a,u=w?null!==h?h+"Capture":null:h;w=[];for(var t=d,q;null!==
t;){q=t;var v=q.stateNode;5===q.tag&&null!==v&&(q=v,null!==u&&(v=Ob(t,u),null!=v&&w.push(ef(t,v,q))));if(z)break;t=t.return}0<w.length&&(h=new k(h,x,null,c,e),g.push({event:h,listeners:w}))}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===a;k="mouseout"===a||"pointerout"===a;if(h&&0===(b&16)&&(x=c.relatedTarget||c.fromElement)&&(wc(x)||x[ff]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(x=c.relatedTarget||c.toElement,k=d,x=x?wc(x):null,null!==
x&&(z=Zb(x),x!==z||5!==x.tag&&6!==x.tag))x=null}else k=null,x=d;if(k!==x){w=Bd;v="onMouseLeave";u="onMouseEnter";t="mouse";if("pointerout"===a||"pointerover"===a)w=Td,v="onPointerLeave",u="onPointerEnter",t="pointer";z=null==k?h:ue(k);q=null==x?h:ue(x);h=new w(v,t+"leave",k,c,e);h.target=z;h.relatedTarget=q;v=null;wc(e)===d&&(w=new w(u,t+"enter",x,c,e),w.target=q,w.relatedTarget=z,v=w);z=v;if(k&&x)b:{w=k;u=x;t=0;for(q=w;q;q=gf(q))t++;q=0;for(v=u;v;v=gf(v))q++;for(;0<t-q;)w=gf(w),t--;for(;0<q-t;)u=
gf(u),q--;for(;t--;){if(w===u||null!==u&&w===u.alternate)break b;w=gf(w);u=gf(u)}w=null}else w=null;null!==k&&hf(g,h,k,w,!1);null!==x&&null!==z&&hf(g,z,x,w,!0)}}}a:{h=d?ue(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===k&&"file"===h.type)var J=ve;else if(me(h))if(we)J=Fe;else{J=De;var K=Ce}else(k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(J=Ee);if(J&&(J=J(a,d))){ne(g,J,c,e);break a}K&&K(a,h,d);"focusout"===a&&(K=h._wrapperState)&&
K.controlled&&"number"===h.type&&bb(h,"number",h.value)}K=d?ue(d):window;switch(a){case "focusin":if(me(K)||"true"===K.contentEditable)Qe=K,Re=d,Se=null;break;case "focusout":Se=Re=Qe=null;break;case "mousedown":Te=!0;break;case "contextmenu":case "mouseup":case "dragend":Te=!1;Ue(g,c,e);break;case "selectionchange":if(Pe)break;case "keydown":case "keyup":Ue(g,c,e)}var Q;if(ae)b:{switch(a){case "compositionstart":var L="onCompositionStart";break b;case "compositionend":L="onCompositionEnd";break b;
case "compositionupdate":L="onCompositionUpdate";break b}L=void 0}else ie?ge(a,c)&&(L="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(L="onCompositionStart");L&&(de&&"ko"!==c.locale&&(ie||"onCompositionStart"!==L?"onCompositionEnd"===L&&ie&&(Q=nd()):(kd=e,ld="value"in kd?kd.value:kd.textContent,ie=!0)),K=oe(d,L),0<K.length&&(L=new Ld(L,a,null,c,e),g.push({event:L,listeners:K}),Q?L.data=Q:(Q=he(c),null!==Q&&(L.data=Q))));if(Q=ce?je(a,c):ke(a,c))d=oe(d,"onBeforeInput"),0<d.length&&(e=new Ld("onBeforeInput",
"beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=Q)}se(g,b)})}function ef(a,b,c){return{instance:a,listener:b,currentTarget:c}}function oe(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==f&&(e=f,f=Ob(a,c),null!=f&&d.unshift(ef(a,f,e)),f=Ob(a,b),null!=f&&d.push(ef(a,f,e)));a=a.return}return d}function gf(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}
function hf(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,l=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==l&&(h=l,e?(k=Ob(c,f),null!=k&&g.unshift(ef(c,k,h))):e||(k=Ob(c,f),null!=k&&g.push(ef(c,k,h))));c=c.return}0!==g.length&&a.push({event:b,listeners:g})}function jf(){}var kf=null,lf=null;function mf(a,b){switch(a){case "button":case "input":case "select":case "textarea":return!!b.autoFocus}return!1}
function nf(a,b){return"textarea"===a||"option"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}var of="function"===typeof setTimeout?setTimeout:void 0,pf="function"===typeof clearTimeout?clearTimeout:void 0;function qf(a){1===a.nodeType?a.textContent="":9===a.nodeType&&(a=a.body,null!=a&&(a.textContent=""))}
function rf(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break}return a}function sf(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--}else"/$"===c&&b++}a=a.previousSibling}return null}var tf=0;function uf(a){return{$$typeof:Ga,toString:a,valueOf:a}}var vf=Math.random().toString(36).slice(2),wf="__reactFiber$"+vf,xf="__reactProps$"+vf,ff="__reactContainer$"+vf,yf="__reactEvents$"+vf;
function wc(a){var b=a[wf];if(b)return b;for(var c=a.parentNode;c;){if(b=c[ff]||c[wf]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=sf(a);null!==a;){if(c=a[wf])return c;a=sf(a)}return b}a=c;c=a.parentNode}return null}function Cb(a){a=a[wf]||a[ff];return!a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function ue(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(y(33));}function Db(a){return a[xf]||null}
function $e(a){var b=a[yf];void 0===b&&(b=a[yf]=new Set);return b}var zf=[],Af=-1;function Bf(a){return{current:a}}function H(a){0>Af||(a.current=zf[Af],zf[Af]=null,Af--)}function I(a,b){Af++;zf[Af]=a.current;a.current=b}var Cf={},M=Bf(Cf),N=Bf(!1),Df=Cf;
function Ef(a,b){var c=a.type.contextTypes;if(!c)return Cf;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function Ff(a){a=a.childContextTypes;return null!==a&&void 0!==a}function Gf(){H(N);H(M)}function Hf(a,b,c){if(M.current!==Cf)throw Error(y(168));I(M,b);I(N,c)}
function If(a,b,c){var d=a.stateNode;a=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in a))throw Error(y(108,Ra(b)||"Unknown",e));return m({},c,d)}function Jf(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||Cf;Df=M.current;I(M,a);I(N,N.current);return!0}function Kf(a,b,c){var d=a.stateNode;if(!d)throw Error(y(169));c?(a=If(a,b,Df),d.__reactInternalMemoizedMergedChildContext=a,H(N),H(M),I(M,a)):H(N);I(N,c)}
var Lf=null,Mf=null,Nf=r.unstable_runWithPriority,Of=r.unstable_scheduleCallback,Pf=r.unstable_cancelCallback,Qf=r.unstable_shouldYield,Rf=r.unstable_requestPaint,Sf=r.unstable_now,Tf=r.unstable_getCurrentPriorityLevel,Uf=r.unstable_ImmediatePriority,Vf=r.unstable_UserBlockingPriority,Wf=r.unstable_NormalPriority,Xf=r.unstable_LowPriority,Yf=r.unstable_IdlePriority,Zf={},$f=void 0!==Rf?Rf:function(){},ag=null,bg=null,cg=!1,dg=Sf(),O=1E4>dg?Sf:function(){return Sf()-dg};
function eg(){switch(Tf()){case Uf:return 99;case Vf:return 98;case Wf:return 97;case Xf:return 96;case Yf:return 95;default:throw Error(y(332));}}function fg(a){switch(a){case 99:return Uf;case 98:return Vf;case 97:return Wf;case 96:return Xf;case 95:return Yf;default:throw Error(y(332));}}function gg(a,b){a=fg(a);return Nf(a,b)}function hg(a,b,c){a=fg(a);return Of(a,b,c)}function ig(){if(null!==bg){var a=bg;bg=null;Pf(a)}jg()}
function jg(){if(!cg&&null!==ag){cg=!0;var a=0;try{var b=ag;gg(99,function(){for(;a<b.length;a++){var c=b[a];do c=c(!0);while(null!==c)}});ag=null}catch(c){throw null!==ag&&(ag=ag.slice(a+1)),Of(Uf,ig),c;}finally{cg=!1}}}var kg=ra.ReactCurrentBatchConfig;function lg(a,b){if(a&&a.defaultProps){b=m({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}var mg=Bf(null),ng=null,og=null,pg=null;function qg(){pg=og=ng=null}
function rg(a){var b=mg.current;H(mg);a.type._context._currentValue=b}function sg(a,b){for(;null!==a;){var c=a.alternate;if((a.childLanes&b)===b)if(null===c||(c.childLanes&b)===b)break;else c.childLanes|=b;else a.childLanes|=b,null!==c&&(c.childLanes|=b);a=a.return}}function tg(a,b){ng=a;pg=og=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(ug=!0),a.firstContext=null)}
function vg(a,b){if(pg!==a&&!1!==b&&0!==b){if("number"!==typeof b||1073741823===b)pg=a,b=1073741823;b={context:a,observedBits:b,next:null};if(null===og){if(null===ng)throw Error(y(308));og=b;ng.dependencies={lanes:0,firstContext:b,responders:null}}else og=og.next=b}return a._currentValue}var wg=!1;function xg(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null},effects:null}}
function yg(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects})}function zg(a,b){return{eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}function Ag(a,b){a=a.updateQueue;if(null!==a){a=a.shared;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b}}
function Bg(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next}while(null!==c);null===f?e=f=b:f=f.next=b}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=
b;c.lastBaseUpdate=b}
function Cg(a,b,c,d){var e=a.updateQueue;wg=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,l=k.next;k.next=null;null===g?f=l:g.next=l;g=k;var n=a.alternate;if(null!==n){n=n.updateQueue;var A=n.lastBaseUpdate;A!==g&&(null===A?n.firstBaseUpdate=l:A.next=l,n.lastBaseUpdate=k)}}if(null!==f){A=e.baseState;g=0;n=l=k=null;do{h=f.lane;var p=f.eventTime;if((d&h)===h){null!==n&&(n=n.next={eventTime:p,lane:0,tag:f.tag,payload:f.payload,callback:f.callback,
next:null});a:{var C=a,x=f;h=b;p=c;switch(x.tag){case 1:C=x.payload;if("function"===typeof C){A=C.call(p,A,h);break a}A=C;break a;case 3:C.flags=C.flags&-4097|64;case 0:C=x.payload;h="function"===typeof C?C.call(p,A,h):C;if(null===h||void 0===h)break a;A=m({},A,h);break a;case 2:wg=!0}}null!==f.callback&&(a.flags|=32,h=e.effects,null===h?e.effects=[f]:h.push(f))}else p={eventTime:p,lane:h,tag:f.tag,payload:f.payload,callback:f.callback,next:null},null===n?(l=n=p,k=A):n=n.next=p,g|=h;f=f.next;if(null===
f)if(h=e.shared.pending,null===h)break;else f=h.next,h.next=null,e.lastBaseUpdate=h,e.shared.pending=null}while(1);null===n&&(k=A);e.baseState=k;e.firstBaseUpdate=l;e.lastBaseUpdate=n;Dg|=g;a.lanes=g;a.memoizedState=A}}function Eg(a,b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(y(191,e));e.call(d)}}}var Fg=(new aa.Component).refs;
function Gg(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:m({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c)}
var Kg={isMounted:function(a){return(a=a._reactInternals)?Zb(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=Hg(),e=Ig(a),f=zg(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);Ag(a,f);Jg(a,e,d)},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=Hg(),e=Ig(a),f=zg(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);Ag(a,f);Jg(a,e,d)},enqueueForceUpdate:function(a,b){a=a._reactInternals;var c=Hg(),d=Ig(a),e=zg(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=
b);Ag(a,e);Jg(a,d,c)}};function Lg(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!Je(c,d)||!Je(e,f):!0}
function Mg(a,b,c){var d=!1,e=Cf;var f=b.contextType;"object"===typeof f&&null!==f?f=vg(f):(e=Ff(b)?Df:M.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Ef(a,e):Cf);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Kg;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
function Ng(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Kg.enqueueReplaceState(b,b.state,null)}
function Og(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs=Fg;xg(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=vg(f):(f=Ff(b)?Df:M.current,e.context=Ef(a,f));Cg(a,c,e,d);e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(Gg(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||
(b=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Kg.enqueueReplaceState(e,e.state,null),Cg(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4)}var Pg=Array.isArray;
function Qg(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(y(309));var d=c.stateNode}if(!d)throw Error(y(147,a));var e=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===e)return b.ref;b=function(a){var b=d.refs;b===Fg&&(b=d.refs={});null===a?delete b[e]:b[e]=a};b._stringRef=e;return b}if("string"!==typeof a)throw Error(y(284));if(!c._owner)throw Error(y(290,a));}return a}
function Rg(a,b){if("textarea"!==a.type)throw Error(y(31,"[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b));}
function Sg(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.flags=8}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=Tg(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags=2,
c):d;b.flags=2;return c}function g(b){a&&null===b.alternate&&(b.flags=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Ug(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){if(null!==b&&b.elementType===c.type)return d=e(b,c.props),d.ref=Qg(a,b,c),d.return=a,d;d=Vg(c.type,c.key,c.props,null,a.mode,d);d.ref=Qg(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=
Wg(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function n(a,b,c,d,f){if(null===b||7!==b.tag)return b=Xg(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function A(a,b,c){if("string"===typeof b||"number"===typeof b)return b=Ug(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case sa:return c=Vg(b.type,b.key,b.props,null,a.mode,c),c.ref=Qg(a,null,b),c.return=a,c;case ta:return b=Wg(b,a.mode,c),b.return=a,b}if(Pg(b)||La(b))return b=Xg(b,
a.mode,c,null),b.return=a,b;Rg(a,b)}return null}function p(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case sa:return c.key===e?c.type===ua?n(a,b,c.props.children,d,e):k(a,b,c,d):null;case ta:return c.key===e?l(a,b,c,d):null}if(Pg(c)||La(c))return null!==e?null:n(a,b,c,d,null);Rg(a,c)}return null}function C(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=a.get(c)||
null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case sa:return a=a.get(null===d.key?c:d.key)||null,d.type===ua?n(b,a,d.props.children,e,d.key):k(b,a,d,e);case ta:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e)}if(Pg(d)||La(d))return a=a.get(c)||null,n(b,a,d,e,null);Rg(b,d)}return null}function x(e,g,h,k){for(var l=null,t=null,u=g,z=g=0,q=null;null!==u&&z<h.length;z++){u.index>z?(q=u,u=null):q=u.sibling;var n=p(e,u,h[z],k);if(null===n){null===u&&(u=q);break}a&&u&&null===
n.alternate&&b(e,u);g=f(n,g,z);null===t?l=n:t.sibling=n;t=n;u=q}if(z===h.length)return c(e,u),l;if(null===u){for(;z<h.length;z++)u=A(e,h[z],k),null!==u&&(g=f(u,g,z),null===t?l=u:t.sibling=u,t=u);return l}for(u=d(e,u);z<h.length;z++)q=C(u,e,z,h[z],k),null!==q&&(a&&null!==q.alternate&&u.delete(null===q.key?z:q.key),g=f(q,g,z),null===t?l=q:t.sibling=q,t=q);a&&u.forEach(function(a){return b(e,a)});return l}function w(e,g,h,k){var l=La(h);if("function"!==typeof l)throw Error(y(150));h=l.call(h);if(null==
h)throw Error(y(151));for(var t=l=null,u=g,z=g=0,q=null,n=h.next();null!==u&&!n.done;z++,n=h.next()){u.index>z?(q=u,u=null):q=u.sibling;var w=p(e,u,n.value,k);if(null===w){null===u&&(u=q);break}a&&u&&null===w.alternate&&b(e,u);g=f(w,g,z);null===t?l=w:t.sibling=w;t=w;u=q}if(n.done)return c(e,u),l;if(null===u){for(;!n.done;z++,n=h.next())n=A(e,n.value,k),null!==n&&(g=f(n,g,z),null===t?l=n:t.sibling=n,t=n);return l}for(u=d(e,u);!n.done;z++,n=h.next())n=C(u,e,z,n.value,k),null!==n&&(a&&null!==n.alternate&&
u.delete(null===n.key?z:n.key),g=f(n,g,z),null===t?l=n:t.sibling=n,t=n);a&&u.forEach(function(a){return b(e,a)});return l}return function(a,d,f,h){var k="object"===typeof f&&null!==f&&f.type===ua&&null===f.key;k&&(f=f.props.children);var l="object"===typeof f&&null!==f;if(l)switch(f.$$typeof){case sa:a:{l=f.key;for(k=d;null!==k;){if(k.key===l){switch(k.tag){case 7:if(f.type===ua){c(a,k.sibling);d=e(k,f.props.children);d.return=a;a=d;break a}break;default:if(k.elementType===f.type){c(a,k.sibling);
d=e(k,f.props);d.ref=Qg(a,k,f);d.return=a;a=d;break a}}c(a,k);break}else b(a,k);k=k.sibling}f.type===ua?(d=Xg(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=Vg(f.type,f.key,f.props,null,a.mode,h),h.ref=Qg(a,d,f),h.return=a,a=h)}return g(a);case ta:a:{for(k=f.key;null!==d;){if(d.key===k)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=
Wg(f,a.mode,h);d.return=a;a=d}return g(a)}if("string"===typeof f||"number"===typeof f)return f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):(c(a,d),d=Ug(f,a.mode,h),d.return=a,a=d),g(a);if(Pg(f))return x(a,d,f,h);if(La(f))return w(a,d,f,h);l&&Rg(a,f);if("undefined"===typeof f&&!k)switch(a.tag){case 1:case 22:case 0:case 11:case 15:throw Error(y(152,Ra(a.type)||"Component"));}return c(a,d)}}var Yg=Sg(!0),Zg=Sg(!1),$g={},ah=Bf($g),bh=Bf($g),ch=Bf($g);
function dh(a){if(a===$g)throw Error(y(174));return a}function eh(a,b){I(ch,b);I(bh,a);I(ah,$g);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:mb(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=mb(b,a)}H(ah);I(ah,b)}function fh(){H(ah);H(bh);H(ch)}function gh(a){dh(ch.current);var b=dh(ah.current);var c=mb(b,a.type);b!==c&&(I(bh,a),I(ah,c))}function hh(a){bh.current===a&&(H(ah),H(bh))}var P=Bf(0);
function ih(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&64))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}return null}var jh=null,kh=null,lh=!1;
function mh(a,b){var c=nh(5,null,null,0);c.elementType="DELETED";c.type="DELETED";c.stateNode=b;c.return=a;c.flags=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c}function oh(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,!0):!1;case 13:return!1;default:return!1}}
function ph(a){if(lh){var b=kh;if(b){var c=b;if(!oh(a,b)){b=rf(c.nextSibling);if(!b||!oh(a,b)){a.flags=a.flags&-1025|2;lh=!1;jh=a;return}mh(jh,c)}jh=a;kh=rf(b.firstChild)}else a.flags=a.flags&-1025|2,lh=!1,jh=a}}function qh(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;jh=a}
function rh(a){if(a!==jh)return!1;if(!lh)return qh(a),lh=!0,!1;var b=a.type;if(5!==a.tag||"head"!==b&&"body"!==b&&!nf(b,a.memoizedProps))for(b=kh;b;)mh(a,b),b=rf(b.nextSibling);qh(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(y(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){kh=rf(a.nextSibling);break a}b--}else"$"!==c&&"$!"!==c&&"$?"!==c||b++}a=a.nextSibling}kh=null}}else kh=jh?rf(a.stateNode.nextSibling):null;return!0}
function sh(){kh=jh=null;lh=!1}var th=[];function uh(){for(var a=0;a<th.length;a++)th[a]._workInProgressVersionPrimary=null;th.length=0}var vh=ra.ReactCurrentDispatcher,wh=ra.ReactCurrentBatchConfig,xh=0,R=null,S=null,T=null,yh=!1,zh=!1;function Ah(){throw Error(y(321));}function Bh(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!He(a[c],b[c]))return!1;return!0}
function Ch(a,b,c,d,e,f){xh=f;R=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;vh.current=null===a||null===a.memoizedState?Dh:Eh;a=c(d,e);if(zh){f=0;do{zh=!1;if(!(25>f))throw Error(y(301));f+=1;T=S=null;b.updateQueue=null;vh.current=Fh;a=c(d,e)}while(zh)}vh.current=Gh;b=null!==S&&null!==S.next;xh=0;T=S=R=null;yh=!1;if(b)throw Error(y(300));return a}function Hh(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===T?R.memoizedState=T=a:T=T.next=a;return T}
function Ih(){if(null===S){var a=R.alternate;a=null!==a?a.memoizedState:null}else a=S.next;var b=null===T?R.memoizedState:T.next;if(null!==b)T=b,S=a;else{if(null===a)throw Error(y(310));S=a;a={memoizedState:S.memoizedState,baseState:S.baseState,baseQueue:S.baseQueue,queue:S.queue,next:null};null===T?R.memoizedState=T=a:T=T.next=a}return T}function Jh(a,b){return"function"===typeof b?b(a):b}
function Kh(a){var b=Ih(),c=b.queue;if(null===c)throw Error(y(311));c.lastRenderedReducer=a;var d=S,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g}d.baseQueue=e=f;c.pending=null}if(null!==e){e=e.next;d=d.baseState;var h=g=f=null,k=e;do{var l=k.lane;if((xh&l)===l)null!==h&&(h=h.next={lane:0,action:k.action,eagerReducer:k.eagerReducer,eagerState:k.eagerState,next:null}),d=k.eagerReducer===a?k.eagerState:a(d,k.action);else{var n={lane:l,action:k.action,eagerReducer:k.eagerReducer,
eagerState:k.eagerState,next:null};null===h?(g=h=n,f=d):h=h.next=n;R.lanes|=l;Dg|=l}k=k.next}while(null!==k&&k!==e);null===h?f=d:h.next=g;He(d,b.memoizedState)||(ug=!0);b.memoizedState=d;b.baseState=f;b.baseQueue=h;c.lastRenderedState=d}return[b.memoizedState,c.dispatch]}
function Lh(a){var b=Ih(),c=b.queue;if(null===c)throw Error(y(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);He(f,b.memoizedState)||(ug=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f}return[f,d]}
function Mh(a,b,c){var d=b._getVersion;d=d(b._source);var e=b._workInProgressVersionPrimary;if(null!==e)a=e===d;else if(a=a.mutableReadLanes,a=(xh&a)===a)b._workInProgressVersionPrimary=d,th.push(b);if(a)return c(b._source);th.push(b);throw Error(y(350));}
function Nh(a,b,c,d){var e=U;if(null===e)throw Error(y(349));var f=b._getVersion,g=f(b._source),h=vh.current,k=h.useState(function(){return Mh(e,b,c)}),l=k[1],n=k[0];k=T;var A=a.memoizedState,p=A.refs,C=p.getSnapshot,x=A.source;A=A.subscribe;var w=R;a.memoizedState={refs:p,source:b,subscribe:d};h.useEffect(function(){p.getSnapshot=c;p.setSnapshot=l;var a=f(b._source);if(!He(g,a)){a=c(b._source);He(n,a)||(l(a),a=Ig(w),e.mutableReadLanes|=a&e.pendingLanes);a=e.mutableReadLanes;e.entangledLanes|=a;for(var d=
e.entanglements,h=a;0<h;){var k=31-Vc(h),v=1<<k;d[k]|=a;h&=~v}}},[c,b,d]);h.useEffect(function(){return d(b._source,function(){var a=p.getSnapshot,c=p.setSnapshot;try{c(a(b._source));var d=Ig(w);e.mutableReadLanes|=d&e.pendingLanes}catch(q){c(function(){throw q;})}})},[b,d]);He(C,c)&&He(x,b)&&He(A,d)||(a={pending:null,dispatch:null,lastRenderedReducer:Jh,lastRenderedState:n},a.dispatch=l=Oh.bind(null,R,a),k.queue=a,k.baseQueue=null,n=Mh(e,b,c),k.memoizedState=k.baseState=n);return n}
function Ph(a,b,c){var d=Ih();return Nh(d,a,b,c)}function Qh(a){var b=Hh();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a=b.queue={pending:null,dispatch:null,lastRenderedReducer:Jh,lastRenderedState:a};a=a.dispatch=Oh.bind(null,R,a);return[b.memoizedState,a]}
function Rh(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};b=R.updateQueue;null===b?(b={lastEffect:null},R.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function Sh(a){var b=Hh();a={current:a};return b.memoizedState=a}function Th(){return Ih().memoizedState}function Uh(a,b,c,d){var e=Hh();R.flags|=a;e.memoizedState=Rh(1|b,c,void 0,void 0===d?null:d)}
function Vh(a,b,c,d){var e=Ih();d=void 0===d?null:d;var f=void 0;if(null!==S){var g=S.memoizedState;f=g.destroy;if(null!==d&&Bh(d,g.deps)){Rh(b,c,f,d);return}}R.flags|=a;e.memoizedState=Rh(1|b,c,f,d)}function Wh(a,b){return Uh(516,4,a,b)}function Xh(a,b){return Vh(516,4,a,b)}function Yh(a,b){return Vh(4,2,a,b)}function Zh(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}
function $h(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Vh(4,2,Zh.bind(null,b,a),c)}function ai(){}function bi(a,b){var c=Ih();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Bh(b,d[1]))return d[0];c.memoizedState=[a,b];return a}function ci(a,b){var c=Ih();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Bh(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}
function di(a,b){var c=eg();gg(98>c?98:c,function(){a(!0)});gg(97<c?97:c,function(){var c=wh.transition;wh.transition=1;try{a(!1),b()}finally{wh.transition=c}})}
function Oh(a,b,c){var d=Hg(),e=Ig(a),f={lane:e,action:c,eagerReducer:null,eagerState:null,next:null},g=b.pending;null===g?f.next=f:(f.next=g.next,g.next=f);b.pending=f;g=a.alternate;if(a===R||null!==g&&g===R)zh=yh=!0;else{if(0===a.lanes&&(null===g||0===g.lanes)&&(g=b.lastRenderedReducer,null!==g))try{var h=b.lastRenderedState,k=g(h,c);f.eagerReducer=g;f.eagerState=k;if(He(k,h))return}catch(l){}finally{}Jg(a,e,d)}}
var Gh={readContext:vg,useCallback:Ah,useContext:Ah,useEffect:Ah,useImperativeHandle:Ah,useLayoutEffect:Ah,useMemo:Ah,useReducer:Ah,useRef:Ah,useState:Ah,useDebugValue:Ah,useDeferredValue:Ah,useTransition:Ah,useMutableSource:Ah,useOpaqueIdentifier:Ah,unstable_isNewReconciler:!1},Dh={readContext:vg,useCallback:function(a,b){Hh().memoizedState=[a,void 0===b?null:b];return a},useContext:vg,useEffect:Wh,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Uh(4,2,Zh.bind(null,
b,a),c)},useLayoutEffect:function(a,b){return Uh(4,2,a,b)},useMemo:function(a,b){var c=Hh();b=void 0===b?null:b;a=a();c.memoizedState=[a,b];return a},useReducer:function(a,b,c){var d=Hh();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a=d.queue={pending:null,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};a=a.dispatch=Oh.bind(null,R,a);return[d.memoizedState,a]},useRef:Sh,useState:Qh,useDebugValue:ai,useDeferredValue:function(a){var b=Qh(a),c=b[0],d=b[1];Wh(function(){var b=wh.transition;
wh.transition=1;try{d(a)}finally{wh.transition=b}},[a]);return c},useTransition:function(){var a=Qh(!1),b=a[0];a=di.bind(null,a[1]);Sh(a);return[a,b]},useMutableSource:function(a,b,c){var d=Hh();d.memoizedState={refs:{getSnapshot:b,setSnapshot:null},source:a,subscribe:c};return Nh(d,a,b,c)},useOpaqueIdentifier:function(){if(lh){var a=!1,b=uf(function(){a||(a=!0,c("r:"+(tf++).toString(36)));throw Error(y(355));}),c=Qh(b)[1];0===(R.mode&2)&&(R.flags|=516,Rh(5,function(){c("r:"+(tf++).toString(36))},
void 0,null));return b}b="r:"+(tf++).toString(36);Qh(b);return b},unstable_isNewReconciler:!1},Eh={readContext:vg,useCallback:bi,useContext:vg,useEffect:Xh,useImperativeHandle:$h,useLayoutEffect:Yh,useMemo:ci,useReducer:Kh,useRef:Th,useState:function(){return Kh(Jh)},useDebugValue:ai,useDeferredValue:function(a){var b=Kh(Jh),c=b[0],d=b[1];Xh(function(){var b=wh.transition;wh.transition=1;try{d(a)}finally{wh.transition=b}},[a]);return c},useTransition:function(){var a=Kh(Jh)[0];return[Th().current,
a]},useMutableSource:Ph,useOpaqueIdentifier:function(){return Kh(Jh)[0]},unstable_isNewReconciler:!1},Fh={readContext:vg,useCallback:bi,useContext:vg,useEffect:Xh,useImperativeHandle:$h,useLayoutEffect:Yh,useMemo:ci,useReducer:Lh,useRef:Th,useState:function(){return Lh(Jh)},useDebugValue:ai,useDeferredValue:function(a){var b=Lh(Jh),c=b[0],d=b[1];Xh(function(){var b=wh.transition;wh.transition=1;try{d(a)}finally{wh.transition=b}},[a]);return c},useTransition:function(){var a=Lh(Jh)[0];return[Th().current,
a]},useMutableSource:Ph,useOpaqueIdentifier:function(){return Lh(Jh)[0]},unstable_isNewReconciler:!1},ei=ra.ReactCurrentOwner,ug=!1;function fi(a,b,c,d){b.child=null===a?Zg(b,null,c,d):Yg(b,a.child,c,d)}function gi(a,b,c,d,e){c=c.render;var f=b.ref;tg(b,e);d=Ch(a,b,c,d,f,e);if(null!==a&&!ug)return b.updateQueue=a.updateQueue,b.flags&=-517,a.lanes&=~e,hi(a,b,e);b.flags|=1;fi(a,b,d,e);return b.child}
function ii(a,b,c,d,e,f){if(null===a){var g=c.type;if("function"===typeof g&&!ji(g)&&void 0===g.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=g,ki(a,b,g,d,e,f);a=Vg(c.type,null,d,b,b.mode,f);a.ref=b.ref;a.return=b;return b.child=a}g=a.child;if(0===(e&f)&&(e=g.memoizedProps,c=c.compare,c=null!==c?c:Je,c(e,d)&&a.ref===b.ref))return hi(a,b,f);b.flags|=1;a=Tg(g,d);a.ref=b.ref;a.return=b;return b.child=a}
function ki(a,b,c,d,e,f){if(null!==a&&Je(a.memoizedProps,d)&&a.ref===b.ref)if(ug=!1,0!==(f&e))0!==(a.flags&16384)&&(ug=!0);else return b.lanes=a.lanes,hi(a,b,f);return li(a,b,c,d,f)}
function mi(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode||"unstable-defer-without-hiding"===d.mode)if(0===(b.mode&4))b.memoizedState={baseLanes:0},ni(b,c);else if(0!==(c&1073741824))b.memoizedState={baseLanes:0},ni(b,null!==f?f.baseLanes:c);else return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a},ni(b,a),null;else null!==f?(d=f.baseLanes|c,b.memoizedState=null):d=c,ni(b,d);fi(a,b,e,c);return b.child}
function oi(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=128}function li(a,b,c,d,e){var f=Ff(c)?Df:M.current;f=Ef(b,f);tg(b,e);c=Ch(a,b,c,d,f,e);if(null!==a&&!ug)return b.updateQueue=a.updateQueue,b.flags&=-517,a.lanes&=~e,hi(a,b,e);b.flags|=1;fi(a,b,c,e);return b.child}
function pi(a,b,c,d,e){if(Ff(c)){var f=!0;Jf(b)}else f=!1;tg(b,e);if(null===b.stateNode)null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2),Mg(b,c,d),Og(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=vg(l):(l=Ff(c)?Df:M.current,l=Ef(b,l));var n=c.getDerivedStateFromProps,A="function"===typeof n||"function"===typeof g.getSnapshotBeforeUpdate;A||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&
"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==l)&&Ng(b,g,d,l);wg=!1;var p=b.memoizedState;g.state=p;Cg(b,d,g,e);k=b.memoizedState;h!==d||p!==k||N.current||wg?("function"===typeof n&&(Gg(b,c,n,d),k=b.memoizedState),(h=wg||Lg(b,c,h,d,p,k,l))?(A||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===
typeof g.componentDidMount&&(b.flags|=4)):("function"===typeof g.componentDidMount&&(b.flags|=4),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4),d=!1)}else{g=b.stateNode;yg(a,b);h=b.memoizedProps;l=b.type===b.elementType?h:lg(b.type,h);g.props=l;A=b.pendingProps;p=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=vg(k):(k=Ff(c)?Df:M.current,k=Ef(b,k));var C=c.getDerivedStateFromProps;(n="function"===typeof C||
"function"===typeof g.getSnapshotBeforeUpdate)||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==A||p!==k)&&Ng(b,g,d,k);wg=!1;p=b.memoizedState;g.state=p;Cg(b,d,g,e);var x=b.memoizedState;h!==A||p!==x||N.current||wg?("function"===typeof C&&(Gg(b,c,C,d),x=b.memoizedState),(l=wg||Lg(b,c,l,d,p,x,k))?(n||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,
x,k),"function"===typeof g.UNSAFE_componentWillUpdate&&g.UNSAFE_componentWillUpdate(d,x,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=256)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=256),b.memoizedProps=d,b.memoizedState=x),g.props=d,g.state=x,g.context=k,d=l):("function"!==typeof g.componentDidUpdate||
h===a.memoizedProps&&p===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=256),d=!1)}return qi(a,b,c,d,f,e)}
function qi(a,b,c,d,e,f){oi(a,b);var g=0!==(b.flags&64);if(!d&&!g)return e&&Kf(b,c,!1),hi(a,b,f);d=b.stateNode;ei.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Yg(b,a.child,null,f),b.child=Yg(b,null,h,f)):fi(a,b,h,f);b.memoizedState=d.state;e&&Kf(b,c,!0);return b.child}function ri(a){var b=a.stateNode;b.pendingContext?Hf(a,b.pendingContext,b.pendingContext!==b.context):b.context&&Hf(a,b.context,!1);eh(a,b.containerInfo)}
var si={dehydrated:null,retryLane:0};
function ti(a,b,c){var d=b.pendingProps,e=P.current,f=!1,g;(g=0!==(b.flags&64))||(g=null!==a&&null===a.memoizedState?!1:0!==(e&2));g?(f=!0,b.flags&=-65):null!==a&&null===a.memoizedState||void 0===d.fallback||!0===d.unstable_avoidThisFallback||(e|=1);I(P,e&1);if(null===a){void 0!==d.fallback&&ph(b);a=d.children;e=d.fallback;if(f)return a=ui(b,a,e,c),b.child.memoizedState={baseLanes:c},b.memoizedState=si,a;if("number"===typeof d.unstable_expectedLoadTime)return a=ui(b,a,e,c),b.child.memoizedState={baseLanes:c},
b.memoizedState=si,b.lanes=33554432,a;c=vi({mode:"visible",children:a},b.mode,c,null);c.return=b;return b.child=c}if(null!==a.memoizedState){if(f)return d=wi(a,b,d.children,d.fallback,c),f=b.child,e=a.child.memoizedState,f.memoizedState=null===e?{baseLanes:c}:{baseLanes:e.baseLanes|c},f.childLanes=a.childLanes&~c,b.memoizedState=si,d;c=xi(a,b,d.children,c);b.memoizedState=null;return c}if(f)return d=wi(a,b,d.children,d.fallback,c),f=b.child,e=a.child.memoizedState,f.memoizedState=null===e?{baseLanes:c}:
{baseLanes:e.baseLanes|c},f.childLanes=a.childLanes&~c,b.memoizedState=si,d;c=xi(a,b,d.children,c);b.memoizedState=null;return c}function ui(a,b,c,d){var e=a.mode,f=a.child;b={mode:"hidden",children:b};0===(e&2)&&null!==f?(f.childLanes=0,f.pendingProps=b):f=vi(b,e,0,null);c=Xg(c,e,d,null);f.return=a;c.return=a;f.sibling=c;a.child=f;return c}
function xi(a,b,c,d){var e=a.child;a=e.sibling;c=Tg(e,{mode:"visible",children:c});0===(b.mode&2)&&(c.lanes=d);c.return=b;c.sibling=null;null!==a&&(a.nextEffect=null,a.flags=8,b.firstEffect=b.lastEffect=a);return b.child=c}
function wi(a,b,c,d,e){var f=b.mode,g=a.child;a=g.sibling;var h={mode:"hidden",children:c};0===(f&2)&&b.child!==g?(c=b.child,c.childLanes=0,c.pendingProps=h,g=c.lastEffect,null!==g?(b.firstEffect=c.firstEffect,b.lastEffect=g,g.nextEffect=null):b.firstEffect=b.lastEffect=null):c=Tg(g,h);null!==a?d=Tg(a,d):(d=Xg(d,f,e,null),d.flags|=2);d.return=b;c.return=b;c.sibling=d;b.child=c;return d}function yi(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);sg(a.return,b)}
function zi(a,b,c,d,e,f){var g=a.memoizedState;null===g?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e,lastEffect:f}:(g.isBackwards=b,g.rendering=null,g.renderingStartTime=0,g.last=d,g.tail=c,g.tailMode=e,g.lastEffect=f)}
function Ai(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;fi(a,b,d.children,c);d=P.current;if(0!==(d&2))d=d&1|2,b.flags|=64;else{if(null!==a&&0!==(a.flags&64))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&yi(a,c);else if(19===a.tag)yi(a,c);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}I(P,d);if(0===(b.mode&2))b.memoizedState=
null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===ih(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);zi(b,!1,e,c,f,b.lastEffect);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===ih(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}zi(b,!0,c,null,f,b.lastEffect);break;case "together":zi(b,!1,null,null,void 0,b.lastEffect);break;default:b.memoizedState=null}return b.child}
function hi(a,b,c){null!==a&&(b.dependencies=a.dependencies);Dg|=b.lanes;if(0!==(c&b.childLanes)){if(null!==a&&b.child!==a.child)throw Error(y(153));if(null!==b.child){a=b.child;c=Tg(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=Tg(a,a.pendingProps),c.return=b;c.sibling=null}return b.child}return null}var Bi,Ci,Di,Ei;
Bi=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=c.return;c=c.sibling}};Ci=function(){};
Di=function(a,b,c,d){var e=a.memoizedProps;if(e!==d){a=b.stateNode;dh(ah.current);var f=null;switch(c){case "input":e=Ya(a,e);d=Ya(a,d);f=[];break;case "option":e=eb(a,e);d=eb(a,d);f=[];break;case "select":e=m({},e,{value:void 0});d=m({},d,{value:void 0});f=[];break;case "textarea":e=gb(a,e);d=gb(a,d);f=[];break;default:"function"!==typeof e.onClick&&"function"===typeof d.onClick&&(a.onclick=jf)}vb(c,d);var g;c=null;for(l in e)if(!d.hasOwnProperty(l)&&e.hasOwnProperty(l)&&null!=e[l])if("style"===
l){var h=e[l];for(g in h)h.hasOwnProperty(g)&&(c||(c={}),c[g]="")}else"dangerouslySetInnerHTML"!==l&&"children"!==l&&"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&(ca.hasOwnProperty(l)?f||(f=[]):(f=f||[]).push(l,null));for(l in d){var k=d[l];h=null!=e?e[l]:void 0;if(d.hasOwnProperty(l)&&k!==h&&(null!=k||null!=h))if("style"===l)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||
(c={}),c[g]=k[g])}else c||(f||(f=[]),f.push(l,c)),c=k;else"dangerouslySetInnerHTML"===l?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(f=f||[]).push(l,k)):"children"===l?"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(l,""+k):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&(ca.hasOwnProperty(l)?(null!=k&&"onScroll"===l&&G("scroll",a),f||h===k||(f=[])):"object"===typeof k&&null!==k&&k.$$typeof===Ga?k.toString():(f=f||[]).push(l,k))}c&&(f=f||[]).push("style",
c);var l=f;if(b.updateQueue=l)b.flags|=4}};Ei=function(a,b,c,d){c!==d&&(b.flags|=4)};function Fi(a,b){if(!lh)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}
function Gi(a,b,c){var d=b.pendingProps;switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return null;case 1:return Ff(b.type)&&Gf(),null;case 3:fh();H(N);H(M);uh();d=b.stateNode;d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)rh(b)?b.flags|=4:d.hydrate||(b.flags|=256);Ci(b);return null;case 5:hh(b);var e=dh(ch.current);c=b.type;if(null!==a&&null!=b.stateNode)Di(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=128);else{if(!d){if(null===
b.stateNode)throw Error(y(166));return null}a=dh(ah.current);if(rh(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[wf]=b;d[xf]=f;switch(c){case "dialog":G("cancel",d);G("close",d);break;case "iframe":case "object":case "embed":G("load",d);break;case "video":case "audio":for(a=0;a<Xe.length;a++)G(Xe[a],d);break;case "source":G("error",d);break;case "img":case "image":case "link":G("error",d);G("load",d);break;case "details":G("toggle",d);break;case "input":Za(d,f);G("invalid",d);break;case "select":d._wrapperState=
{wasMultiple:!!f.multiple};G("invalid",d);break;case "textarea":hb(d,f),G("invalid",d)}vb(c,f);a=null;for(var g in f)f.hasOwnProperty(g)&&(e=f[g],"children"===g?"string"===typeof e?d.textContent!==e&&(a=["children",e]):"number"===typeof e&&d.textContent!==""+e&&(a=["children",""+e]):ca.hasOwnProperty(g)&&null!=e&&"onScroll"===g&&G("scroll",d));switch(c){case "input":Va(d);cb(d,f,!0);break;case "textarea":Va(d);jb(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=
jf)}d=a;b.updateQueue=d;null!==d&&(b.flags|=4)}else{g=9===e.nodeType?e:e.ownerDocument;a===kb.html&&(a=lb(c));a===kb.html?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):"string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[wf]=b;a[xf]=d;Bi(a,b,!1,!1);b.stateNode=a;g=wb(c,d);switch(c){case "dialog":G("cancel",a);G("close",a);
e=d;break;case "iframe":case "object":case "embed":G("load",a);e=d;break;case "video":case "audio":for(e=0;e<Xe.length;e++)G(Xe[e],a);e=d;break;case "source":G("error",a);e=d;break;case "img":case "image":case "link":G("error",a);G("load",a);e=d;break;case "details":G("toggle",a);e=d;break;case "input":Za(a,d);e=Ya(a,d);G("invalid",a);break;case "option":e=eb(a,d);break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=m({},d,{value:void 0});G("invalid",a);break;case "textarea":hb(a,d);e=
gb(a,d);G("invalid",a);break;default:e=d}vb(c,e);var h=e;for(f in h)if(h.hasOwnProperty(f)){var k=h[f];"style"===f?tb(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&ob(a,k)):"children"===f?"string"===typeof k?("textarea"!==c||""!==k)&&pb(a,k):"number"===typeof k&&pb(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&(ca.hasOwnProperty(f)?null!=k&&"onScroll"===f&&G("scroll",a):null!=k&&qa(a,f,k,g))}switch(c){case "input":Va(a);cb(a,d,!1);
break;case "textarea":Va(a);jb(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Sa(d.value));break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?fb(a,!!d.multiple,f,!1):null!=d.defaultValue&&fb(a,!!d.multiple,d.defaultValue,!0);break;default:"function"===typeof e.onClick&&(a.onclick=jf)}mf(c,d)&&(b.flags|=4)}null!==b.ref&&(b.flags|=128)}return null;case 6:if(a&&null!=b.stateNode)Ei(a,b,a.memoizedProps,d);else{if("string"!==typeof d&&null===b.stateNode)throw Error(y(166));
c=dh(ch.current);dh(ah.current);rh(b)?(d=b.stateNode,c=b.memoizedProps,d[wf]=b,d.nodeValue!==c&&(b.flags|=4)):(d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[wf]=b,b.stateNode=d)}return null;case 13:H(P);d=b.memoizedState;if(0!==(b.flags&64))return b.lanes=c,b;d=null!==d;c=!1;null===a?void 0!==b.memoizedProps.fallback&&rh(b):c=null!==a.memoizedState;if(d&&!c&&0!==(b.mode&2))if(null===a&&!0!==b.memoizedProps.unstable_avoidThisFallback||0!==(P.current&1))0===V&&(V=3);else{if(0===V||3===V)V=
4;null===U||0===(Dg&134217727)&&0===(Hi&134217727)||Ii(U,W)}if(d||c)b.flags|=4;return null;case 4:return fh(),Ci(b),null===a&&cf(b.stateNode.containerInfo),null;case 10:return rg(b),null;case 17:return Ff(b.type)&&Gf(),null;case 19:H(P);d=b.memoizedState;if(null===d)return null;f=0!==(b.flags&64);g=d.rendering;if(null===g)if(f)Fi(d,!1);else{if(0!==V||null!==a&&0!==(a.flags&64))for(a=b.child;null!==a;){g=ih(a);if(null!==g){b.flags|=64;Fi(d,!1);f=g.updateQueue;null!==f&&(b.updateQueue=f,b.flags|=4);
null===d.lastEffect&&(b.firstEffect=null);b.lastEffect=d.lastEffect;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=2,f.nextEffect=null,f.firstEffect=null,f.lastEffect=null,g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,
f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;I(P,P.current&1|2);return b.child}a=a.sibling}null!==d.tail&&O()>Ji&&(b.flags|=64,f=!0,Fi(d,!1),b.lanes=33554432)}else{if(!f)if(a=ih(g),null!==a){if(b.flags|=64,f=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Fi(d,!0),null===d.tail&&"hidden"===d.tailMode&&!g.alternate&&!lh)return b=b.lastEffect=d.lastEffect,null!==b&&(b.nextEffect=null),null}else 2*O()-d.renderingStartTime>Ji&&1073741824!==c&&(b.flags|=
64,f=!0,Fi(d,!1),b.lanes=33554432);d.isBackwards?(g.sibling=b.child,b.child=g):(c=d.last,null!==c?c.sibling=g:b.child=g,d.last=g)}return null!==d.tail?(c=d.tail,d.rendering=c,d.tail=c.sibling,d.lastEffect=b.lastEffect,d.renderingStartTime=O(),c.sibling=null,b=P.current,I(P,f?b&1|2:b&1),c):null;case 23:case 24:return Ki(),null!==a&&null!==a.memoizedState!==(null!==b.memoizedState)&&"unstable-defer-without-hiding"!==d.mode&&(b.flags|=4),null}throw Error(y(156,b.tag));}
function Li(a){switch(a.tag){case 1:Ff(a.type)&&Gf();var b=a.flags;return b&4096?(a.flags=b&-4097|64,a):null;case 3:fh();H(N);H(M);uh();b=a.flags;if(0!==(b&64))throw Error(y(285));a.flags=b&-4097|64;return a;case 5:return hh(a),null;case 13:return H(P),b=a.flags,b&4096?(a.flags=b&-4097|64,a):null;case 19:return H(P),null;case 4:return fh(),null;case 10:return rg(a),null;case 23:case 24:return Ki(),null;default:return null}}
function Mi(a,b){try{var c="",d=b;do c+=Qa(d),d=d.return;while(d);var e=c}catch(f){e="\nError generating stack: "+f.message+"\n"+f.stack}return{value:a,source:b,stack:e}}function Ni(a,b){try{console.error(b.value)}catch(c){setTimeout(function(){throw c;})}}var Oi="function"===typeof WeakMap?WeakMap:Map;function Pi(a,b,c){c=zg(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Qi||(Qi=!0,Ri=d);Ni(a,b)};return c}
function Si(a,b,c){c=zg(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){Ni(a,b);return d(e)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){"function"!==typeof d&&(null===Ti?Ti=new Set([this]):Ti.add(this),Ni(a,b));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}var Ui="function"===typeof WeakSet?WeakSet:Set;
function Vi(a){var b=a.ref;if(null!==b)if("function"===typeof b)try{b(null)}catch(c){Wi(a,c)}else b.current=null}function Xi(a,b){switch(b.tag){case 0:case 11:case 15:case 22:return;case 1:if(b.flags&256&&null!==a){var c=a.memoizedProps,d=a.memoizedState;a=b.stateNode;b=a.getSnapshotBeforeUpdate(b.elementType===b.type?c:lg(b.type,c),d);a.__reactInternalSnapshotBeforeUpdate=b}return;case 3:b.flags&256&&qf(b.stateNode.containerInfo);return;case 5:case 6:case 4:case 17:return}throw Error(y(163));}
function Yi(a,b,c){switch(c.tag){case 0:case 11:case 15:case 22:b=c.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){a=b=b.next;do{if(3===(a.tag&3)){var d=a.create;a.destroy=d()}a=a.next}while(a!==b)}b=c.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){a=b=b.next;do{var e=a;d=e.next;e=e.tag;0!==(e&4)&&0!==(e&1)&&(Zi(c,a),$i(c,a));a=d}while(a!==b)}return;case 1:a=c.stateNode;c.flags&4&&(null===b?a.componentDidMount():(d=c.elementType===c.type?b.memoizedProps:lg(c.type,b.memoizedProps),a.componentDidUpdate(d,
b.memoizedState,a.__reactInternalSnapshotBeforeUpdate)));b=c.updateQueue;null!==b&&Eg(c,b,a);return;case 3:b=c.updateQueue;if(null!==b){a=null;if(null!==c.child)switch(c.child.tag){case 5:a=c.child.stateNode;break;case 1:a=c.child.stateNode}Eg(c,b,a)}return;case 5:a=c.stateNode;null===b&&c.flags&4&&mf(c.type,c.memoizedProps)&&a.focus();return;case 6:return;case 4:return;case 12:return;case 13:null===c.memoizedState&&(c=c.alternate,null!==c&&(c=c.memoizedState,null!==c&&(c=c.dehydrated,null!==c&&Cc(c))));
return;case 19:case 17:case 20:case 21:case 23:case 24:return}throw Error(y(163));}
function aj(a,b){for(var c=a;;){if(5===c.tag){var d=c.stateNode;if(b)d=d.style,"function"===typeof d.setProperty?d.setProperty("display","none","important"):d.display="none";else{d=c.stateNode;var e=c.memoizedProps.style;e=void 0!==e&&null!==e&&e.hasOwnProperty("display")?e.display:null;d.style.display=sb("display",e)}}else if(6===c.tag)c.stateNode.nodeValue=b?"":c.memoizedProps;else if((23!==c.tag&&24!==c.tag||null===c.memoizedState||c===a)&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===
a)break;for(;null===c.sibling;){if(null===c.return||c.return===a)return;c=c.return}c.sibling.return=c.return;c=c.sibling}}
function bj(a,b){if(Mf&&"function"===typeof Mf.onCommitFiberUnmount)try{Mf.onCommitFiberUnmount(Lf,b)}catch(f){}switch(b.tag){case 0:case 11:case 14:case 15:case 22:a=b.updateQueue;if(null!==a&&(a=a.lastEffect,null!==a)){var c=a=a.next;do{var d=c,e=d.destroy;d=d.tag;if(void 0!==e)if(0!==(d&4))Zi(b,c);else{d=b;try{e()}catch(f){Wi(d,f)}}c=c.next}while(c!==a)}break;case 1:Vi(b);a=b.stateNode;if("function"===typeof a.componentWillUnmount)try{a.props=b.memoizedProps,a.state=b.memoizedState,a.componentWillUnmount()}catch(f){Wi(b,
f)}break;case 5:Vi(b);break;case 4:cj(a,b)}}function dj(a){a.alternate=null;a.child=null;a.dependencies=null;a.firstEffect=null;a.lastEffect=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.return=null;a.updateQueue=null}function ej(a){return 5===a.tag||3===a.tag||4===a.tag}
function fj(a){a:{for(var b=a.return;null!==b;){if(ej(b))break a;b=b.return}throw Error(y(160));}var c=b;b=c.stateNode;switch(c.tag){case 5:var d=!1;break;case 3:b=b.containerInfo;d=!0;break;case 4:b=b.containerInfo;d=!0;break;default:throw Error(y(161));}c.flags&16&&(pb(b,""),c.flags&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c.return||ej(c.return)){c=null;break a}c=c.return}c.sibling.return=c.return;for(c=c.sibling;5!==c.tag&&6!==c.tag&&18!==c.tag;){if(c.flags&2)continue b;if(null===
c.child||4===c.tag)continue b;else c.child.return=c,c=c.child}if(!(c.flags&2)){c=c.stateNode;break a}}d?gj(a,c,b):hj(a,c,b)}
function gj(a,b,c){var d=a.tag,e=5===d||6===d;if(e)a=e?a.stateNode:a.stateNode.instance,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=jf));else if(4!==d&&(a=a.child,null!==a))for(gj(a,b,c),a=a.sibling;null!==a;)gj(a,b,c),a=a.sibling}
function hj(a,b,c){var d=a.tag,e=5===d||6===d;if(e)a=e?a.stateNode:a.stateNode.instance,b?c.insertBefore(a,b):c.appendChild(a);else if(4!==d&&(a=a.child,null!==a))for(hj(a,b,c),a=a.sibling;null!==a;)hj(a,b,c),a=a.sibling}
function cj(a,b){for(var c=b,d=!1,e,f;;){if(!d){d=c.return;a:for(;;){if(null===d)throw Error(y(160));e=d.stateNode;switch(d.tag){case 5:f=!1;break a;case 3:e=e.containerInfo;f=!0;break a;case 4:e=e.containerInfo;f=!0;break a}d=d.return}d=!0}if(5===c.tag||6===c.tag){a:for(var g=a,h=c,k=h;;)if(bj(g,k),null!==k.child&&4!==k.tag)k.child.return=k,k=k.child;else{if(k===h)break a;for(;null===k.sibling;){if(null===k.return||k.return===h)break a;k=k.return}k.sibling.return=k.return;k=k.sibling}f?(g=e,h=c.stateNode,
8===g.nodeType?g.parentNode.removeChild(h):g.removeChild(h)):e.removeChild(c.stateNode)}else if(4===c.tag){if(null!==c.child){e=c.stateNode.containerInfo;f=!0;c.child.return=c;c=c.child;continue}}else if(bj(a,c),null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return;4===c.tag&&(d=!1)}c.sibling.return=c.return;c=c.sibling}}
function ij(a,b){switch(b.tag){case 0:case 11:case 14:case 15:case 22:var c=b.updateQueue;c=null!==c?c.lastEffect:null;if(null!==c){var d=c=c.next;do 3===(d.tag&3)&&(a=d.destroy,d.destroy=void 0,void 0!==a&&a()),d=d.next;while(d!==c)}return;case 1:return;case 5:c=b.stateNode;if(null!=c){d=b.memoizedProps;var e=null!==a?a.memoizedProps:d;a=b.type;var f=b.updateQueue;b.updateQueue=null;if(null!==f){c[xf]=d;"input"===a&&"radio"===d.type&&null!=d.name&&$a(c,d);wb(a,e);b=wb(a,d);for(e=0;e<f.length;e+=
2){var g=f[e],h=f[e+1];"style"===g?tb(c,h):"dangerouslySetInnerHTML"===g?ob(c,h):"children"===g?pb(c,h):qa(c,g,h,b)}switch(a){case "input":ab(c,d);break;case "textarea":ib(c,d);break;case "select":a=c._wrapperState.wasMultiple,c._wrapperState.wasMultiple=!!d.multiple,f=d.value,null!=f?fb(c,!!d.multiple,f,!1):a!==!!d.multiple&&(null!=d.defaultValue?fb(c,!!d.multiple,d.defaultValue,!0):fb(c,!!d.multiple,d.multiple?[]:"",!1))}}}return;case 6:if(null===b.stateNode)throw Error(y(162));b.stateNode.nodeValue=
b.memoizedProps;return;case 3:c=b.stateNode;c.hydrate&&(c.hydrate=!1,Cc(c.containerInfo));return;case 12:return;case 13:null!==b.memoizedState&&(jj=O(),aj(b.child,!0));kj(b);return;case 19:kj(b);return;case 17:return;case 23:case 24:aj(b,null!==b.memoizedState);return}throw Error(y(163));}function kj(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Ui);b.forEach(function(b){var d=lj.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}
function mj(a,b){return null!==a&&(a=a.memoizedState,null===a||null!==a.dehydrated)?(b=b.memoizedState,null!==b&&null===b.dehydrated):!1}var nj=Math.ceil,oj=ra.ReactCurrentDispatcher,pj=ra.ReactCurrentOwner,X=0,U=null,Y=null,W=0,qj=0,rj=Bf(0),V=0,sj=null,tj=0,Dg=0,Hi=0,uj=0,vj=null,jj=0,Ji=Infinity;function wj(){Ji=O()+500}var Z=null,Qi=!1,Ri=null,Ti=null,xj=!1,yj=null,zj=90,Aj=[],Bj=[],Cj=null,Dj=0,Ej=null,Fj=-1,Gj=0,Hj=0,Ij=null,Jj=!1;function Hg(){return 0!==(X&48)?O():-1!==Fj?Fj:Fj=O()}
function Ig(a){a=a.mode;if(0===(a&2))return 1;if(0===(a&4))return 99===eg()?1:2;0===Gj&&(Gj=tj);if(0!==kg.transition){0!==Hj&&(Hj=null!==vj?vj.pendingLanes:0);a=Gj;var b=4186112&~Hj;b&=-b;0===b&&(a=4186112&~a,b=a&-a,0===b&&(b=8192));return b}a=eg();0!==(X&4)&&98===a?a=Xc(12,Gj):(a=Sc(a),a=Xc(a,Gj));return a}
function Jg(a,b,c){if(50<Dj)throw Dj=0,Ej=null,Error(y(185));a=Kj(a,b);if(null===a)return null;$c(a,b,c);a===U&&(Hi|=b,4===V&&Ii(a,W));var d=eg();1===b?0!==(X&8)&&0===(X&48)?Lj(a):(Mj(a,c),0===X&&(wj(),ig())):(0===(X&4)||98!==d&&99!==d||(null===Cj?Cj=new Set([a]):Cj.add(a)),Mj(a,c));vj=a}function Kj(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}
function Mj(a,b){for(var c=a.callbackNode,d=a.suspendedLanes,e=a.pingedLanes,f=a.expirationTimes,g=a.pendingLanes;0<g;){var h=31-Vc(g),k=1<<h,l=f[h];if(-1===l){if(0===(k&d)||0!==(k&e)){l=b;Rc(k);var n=F;f[h]=10<=n?l+250:6<=n?l+5E3:-1}}else l<=b&&(a.expiredLanes|=k);g&=~k}d=Uc(a,a===U?W:0);b=F;if(0===d)null!==c&&(c!==Zf&&Pf(c),a.callbackNode=null,a.callbackPriority=0);else{if(null!==c){if(a.callbackPriority===b)return;c!==Zf&&Pf(c)}15===b?(c=Lj.bind(null,a),null===ag?(ag=[c],bg=Of(Uf,jg)):ag.push(c),
c=Zf):14===b?c=hg(99,Lj.bind(null,a)):(c=Tc(b),c=hg(c,Nj.bind(null,a)));a.callbackPriority=b;a.callbackNode=c}}
function Nj(a){Fj=-1;Hj=Gj=0;if(0!==(X&48))throw Error(y(327));var b=a.callbackNode;if(Oj()&&a.callbackNode!==b)return null;var c=Uc(a,a===U?W:0);if(0===c)return null;var d=c;var e=X;X|=16;var f=Pj();if(U!==a||W!==d)wj(),Qj(a,d);do try{Rj();break}catch(h){Sj(a,h)}while(1);qg();oj.current=f;X=e;null!==Y?d=0:(U=null,W=0,d=V);if(0!==(tj&Hi))Qj(a,0);else if(0!==d){2===d&&(X|=64,a.hydrate&&(a.hydrate=!1,qf(a.containerInfo)),c=Wc(a),0!==c&&(d=Tj(a,c)));if(1===d)throw b=sj,Qj(a,0),Ii(a,c),Mj(a,O()),b;a.finishedWork=
a.current.alternate;a.finishedLanes=c;switch(d){case 0:case 1:throw Error(y(345));case 2:Uj(a);break;case 3:Ii(a,c);if((c&62914560)===c&&(d=jj+500-O(),10<d)){if(0!==Uc(a,0))break;e=a.suspendedLanes;if((e&c)!==c){Hg();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=of(Uj.bind(null,a),d);break}Uj(a);break;case 4:Ii(a,c);if((c&4186112)===c)break;d=a.eventTimes;for(e=-1;0<c;){var g=31-Vc(c);f=1<<g;g=d[g];g>e&&(e=g);c&=~f}c=e;c=O()-c;c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3E3>c?3E3:4320>
c?4320:1960*nj(c/1960))-c;if(10<c){a.timeoutHandle=of(Uj.bind(null,a),c);break}Uj(a);break;case 5:Uj(a);break;default:throw Error(y(329));}}Mj(a,O());return a.callbackNode===b?Nj.bind(null,a):null}function Ii(a,b){b&=~uj;b&=~Hi;a.suspendedLanes|=b;a.pingedLanes&=~b;for(a=a.expirationTimes;0<b;){var c=31-Vc(b),d=1<<c;a[c]=-1;b&=~d}}
function Lj(a){if(0!==(X&48))throw Error(y(327));Oj();if(a===U&&0!==(a.expiredLanes&W)){var b=W;var c=Tj(a,b);0!==(tj&Hi)&&(b=Uc(a,b),c=Tj(a,b))}else b=Uc(a,0),c=Tj(a,b);0!==a.tag&&2===c&&(X|=64,a.hydrate&&(a.hydrate=!1,qf(a.containerInfo)),b=Wc(a),0!==b&&(c=Tj(a,b)));if(1===c)throw c=sj,Qj(a,0),Ii(a,b),Mj(a,O()),c;a.finishedWork=a.current.alternate;a.finishedLanes=b;Uj(a);Mj(a,O());return null}
function Vj(){if(null!==Cj){var a=Cj;Cj=null;a.forEach(function(a){a.expiredLanes|=24&a.pendingLanes;Mj(a,O())})}ig()}function Wj(a,b){var c=X;X|=1;try{return a(b)}finally{X=c,0===X&&(wj(),ig())}}function Xj(a,b){var c=X;X&=-2;X|=8;try{return a(b)}finally{X=c,0===X&&(wj(),ig())}}function ni(a,b){I(rj,qj);qj|=b;tj|=b}function Ki(){qj=rj.current;H(rj)}
function Qj(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,pf(c));if(null!==Y)for(c=Y.return;null!==c;){var d=c;switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&Gf();break;case 3:fh();H(N);H(M);uh();break;case 5:hh(d);break;case 4:fh();break;case 13:H(P);break;case 19:H(P);break;case 10:rg(d);break;case 23:case 24:Ki()}c=c.return}U=a;Y=Tg(a.current,null);W=qj=tj=b;V=0;sj=null;uj=Hi=Dg=0}
function Sj(a,b){do{var c=Y;try{qg();vh.current=Gh;if(yh){for(var d=R.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next}yh=!1}xh=0;T=S=R=null;zh=!1;pj.current=null;if(null===c||null===c.return){V=1;sj=b;Y=null;break}a:{var f=a,g=c.return,h=c,k=b;b=W;h.flags|=2048;h.firstEffect=h.lastEffect=null;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var l=k;if(0===(h.mode&2)){var n=h.alternate;n?(h.updateQueue=n.updateQueue,h.memoizedState=n.memoizedState,h.lanes=n.lanes):
(h.updateQueue=null,h.memoizedState=null)}var A=0!==(P.current&1),p=g;do{var C;if(C=13===p.tag){var x=p.memoizedState;if(null!==x)C=null!==x.dehydrated?!0:!1;else{var w=p.memoizedProps;C=void 0===w.fallback?!1:!0!==w.unstable_avoidThisFallback?!0:A?!1:!0}}if(C){var z=p.updateQueue;if(null===z){var u=new Set;u.add(l);p.updateQueue=u}else z.add(l);if(0===(p.mode&2)){p.flags|=64;h.flags|=16384;h.flags&=-2981;if(1===h.tag)if(null===h.alternate)h.tag=17;else{var t=zg(-1,1);t.tag=2;Ag(h,t)}h.lanes|=1;break a}k=
void 0;h=b;var q=f.pingCache;null===q?(q=f.pingCache=new Oi,k=new Set,q.set(l,k)):(k=q.get(l),void 0===k&&(k=new Set,q.set(l,k)));if(!k.has(h)){k.add(h);var v=Yj.bind(null,f,l,h);l.then(v,v)}p.flags|=4096;p.lanes=b;break a}p=p.return}while(null!==p);k=Error((Ra(h.type)||"A React component")+" suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.")}5!==V&&(V=2);k=Mi(k,h);p=
g;do{switch(p.tag){case 3:f=k;p.flags|=4096;b&=-b;p.lanes|=b;var J=Pi(p,f,b);Bg(p,J);break a;case 1:f=k;var K=p.type,Q=p.stateNode;if(0===(p.flags&64)&&("function"===typeof K.getDerivedStateFromError||null!==Q&&"function"===typeof Q.componentDidCatch&&(null===Ti||!Ti.has(Q)))){p.flags|=4096;b&=-b;p.lanes|=b;var L=Si(p,f,b);Bg(p,L);break a}}p=p.return}while(null!==p)}Zj(c)}catch(va){b=va;Y===c&&null!==c&&(Y=c=c.return);continue}break}while(1)}
function Pj(){var a=oj.current;oj.current=Gh;return null===a?Gh:a}function Tj(a,b){var c=X;X|=16;var d=Pj();U===a&&W===b||Qj(a,b);do try{ak();break}catch(e){Sj(a,e)}while(1);qg();X=c;oj.current=d;if(null!==Y)throw Error(y(261));U=null;W=0;return V}function ak(){for(;null!==Y;)bk(Y)}function Rj(){for(;null!==Y&&!Qf();)bk(Y)}function bk(a){var b=ck(a.alternate,a,qj);a.memoizedProps=a.pendingProps;null===b?Zj(a):Y=b;pj.current=null}
function Zj(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&2048)){c=Gi(c,b,qj);if(null!==c){Y=c;return}c=b;if(24!==c.tag&&23!==c.tag||null===c.memoizedState||0!==(qj&1073741824)||0===(c.mode&4)){for(var d=0,e=c.child;null!==e;)d|=e.lanes|e.childLanes,e=e.sibling;c.childLanes=d}null!==a&&0===(a.flags&2048)&&(null===a.firstEffect&&(a.firstEffect=b.firstEffect),null!==b.lastEffect&&(null!==a.lastEffect&&(a.lastEffect.nextEffect=b.firstEffect),a.lastEffect=b.lastEffect),1<b.flags&&(null!==
a.lastEffect?a.lastEffect.nextEffect=b:a.firstEffect=b,a.lastEffect=b))}else{c=Li(b);if(null!==c){c.flags&=2047;Y=c;return}null!==a&&(a.firstEffect=a.lastEffect=null,a.flags|=2048)}b=b.sibling;if(null!==b){Y=b;return}Y=b=a}while(null!==b);0===V&&(V=5)}function Uj(a){var b=eg();gg(99,dk.bind(null,a,b));return null}
function dk(a,b){do Oj();while(null!==yj);if(0!==(X&48))throw Error(y(327));var c=a.finishedWork;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(y(177));a.callbackNode=null;var d=c.lanes|c.childLanes,e=d,f=a.pendingLanes&~e;a.pendingLanes=e;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=e;a.mutableReadLanes&=e;a.entangledLanes&=e;e=a.entanglements;for(var g=a.eventTimes,h=a.expirationTimes;0<f;){var k=31-Vc(f),l=1<<k;e[k]=0;g[k]=-1;h[k]=-1;f&=~l}null!==
Cj&&0===(d&24)&&Cj.has(a)&&Cj.delete(a);a===U&&(Y=U=null,W=0);1<c.flags?null!==c.lastEffect?(c.lastEffect.nextEffect=c,d=c.firstEffect):d=c:d=c.firstEffect;if(null!==d){e=X;X|=32;pj.current=null;kf=fd;g=Ne();if(Oe(g)){if("selectionStart"in g)h={start:g.selectionStart,end:g.selectionEnd};else a:if(h=(h=g.ownerDocument)&&h.defaultView||window,(l=h.getSelection&&h.getSelection())&&0!==l.rangeCount){h=l.anchorNode;f=l.anchorOffset;k=l.focusNode;l=l.focusOffset;try{h.nodeType,k.nodeType}catch(va){h=null;
break a}var n=0,A=-1,p=-1,C=0,x=0,w=g,z=null;b:for(;;){for(var u;;){w!==h||0!==f&&3!==w.nodeType||(A=n+f);w!==k||0!==l&&3!==w.nodeType||(p=n+l);3===w.nodeType&&(n+=w.nodeValue.length);if(null===(u=w.firstChild))break;z=w;w=u}for(;;){if(w===g)break b;z===h&&++C===f&&(A=n);z===k&&++x===l&&(p=n);if(null!==(u=w.nextSibling))break;w=z;z=w.parentNode}w=u}h=-1===A||-1===p?null:{start:A,end:p}}else h=null;h=h||{start:0,end:0}}else h=null;lf={focusedElem:g,selectionRange:h};fd=!1;Ij=null;Jj=!1;Z=d;do try{ek()}catch(va){if(null===
Z)throw Error(y(330));Wi(Z,va);Z=Z.nextEffect}while(null!==Z);Ij=null;Z=d;do try{for(g=a;null!==Z;){var t=Z.flags;t&16&&pb(Z.stateNode,"");if(t&128){var q=Z.alternate;if(null!==q){var v=q.ref;null!==v&&("function"===typeof v?v(null):v.current=null)}}switch(t&1038){case 2:fj(Z);Z.flags&=-3;break;case 6:fj(Z);Z.flags&=-3;ij(Z.alternate,Z);break;case 1024:Z.flags&=-1025;break;case 1028:Z.flags&=-1025;ij(Z.alternate,Z);break;case 4:ij(Z.alternate,Z);break;case 8:h=Z;cj(g,h);var J=h.alternate;dj(h);null!==
J&&dj(J)}Z=Z.nextEffect}}catch(va){if(null===Z)throw Error(y(330));Wi(Z,va);Z=Z.nextEffect}while(null!==Z);v=lf;q=Ne();t=v.focusedElem;g=v.selectionRange;if(q!==t&&t&&t.ownerDocument&&Me(t.ownerDocument.documentElement,t)){null!==g&&Oe(t)&&(q=g.start,v=g.end,void 0===v&&(v=q),"selectionStart"in t?(t.selectionStart=q,t.selectionEnd=Math.min(v,t.value.length)):(v=(q=t.ownerDocument||document)&&q.defaultView||window,v.getSelection&&(v=v.getSelection(),h=t.textContent.length,J=Math.min(g.start,h),g=void 0===
g.end?J:Math.min(g.end,h),!v.extend&&J>g&&(h=g,g=J,J=h),h=Le(t,J),f=Le(t,g),h&&f&&(1!==v.rangeCount||v.anchorNode!==h.node||v.anchorOffset!==h.offset||v.focusNode!==f.node||v.focusOffset!==f.offset)&&(q=q.createRange(),q.setStart(h.node,h.offset),v.removeAllRanges(),J>g?(v.addRange(q),v.extend(f.node,f.offset)):(q.setEnd(f.node,f.offset),v.addRange(q))))));q=[];for(v=t;v=v.parentNode;)1===v.nodeType&&q.push({element:v,left:v.scrollLeft,top:v.scrollTop});"function"===typeof t.focus&&t.focus();for(t=
0;t<q.length;t++)v=q[t],v.element.scrollLeft=v.left,v.element.scrollTop=v.top}fd=!!kf;lf=kf=null;a.current=c;Z=d;do try{for(t=a;null!==Z;){var K=Z.flags;K&36&&Yi(t,Z.alternate,Z);if(K&128){q=void 0;var Q=Z.ref;if(null!==Q){var L=Z.stateNode;switch(Z.tag){case 5:q=L;break;default:q=L}"function"===typeof Q?Q(q):Q.current=q}}Z=Z.nextEffect}}catch(va){if(null===Z)throw Error(y(330));Wi(Z,va);Z=Z.nextEffect}while(null!==Z);Z=null;$f();X=e}else a.current=c;if(xj)xj=!1,yj=a,zj=b;else for(Z=d;null!==Z;)b=
Z.nextEffect,Z.nextEffect=null,Z.flags&8&&(K=Z,K.sibling=null,K.stateNode=null),Z=b;d=a.pendingLanes;0===d&&(Ti=null);1===d?a===Ej?Dj++:(Dj=0,Ej=a):Dj=0;c=c.stateNode;if(Mf&&"function"===typeof Mf.onCommitFiberRoot)try{Mf.onCommitFiberRoot(Lf,c,void 0,64===(c.current.flags&64))}catch(va){}Mj(a,O());if(Qi)throw Qi=!1,a=Ri,Ri=null,a;if(0!==(X&8))return null;ig();return null}
function ek(){for(;null!==Z;){var a=Z.alternate;Jj||null===Ij||(0!==(Z.flags&8)?dc(Z,Ij)&&(Jj=!0):13===Z.tag&&mj(a,Z)&&dc(Z,Ij)&&(Jj=!0));var b=Z.flags;0!==(b&256)&&Xi(a,Z);0===(b&512)||xj||(xj=!0,hg(97,function(){Oj();return null}));Z=Z.nextEffect}}function Oj(){if(90!==zj){var a=97<zj?97:zj;zj=90;return gg(a,fk)}return!1}function $i(a,b){Aj.push(b,a);xj||(xj=!0,hg(97,function(){Oj();return null}))}function Zi(a,b){Bj.push(b,a);xj||(xj=!0,hg(97,function(){Oj();return null}))}
function fk(){if(null===yj)return!1;var a=yj;yj=null;if(0!==(X&48))throw Error(y(331));var b=X;X|=32;var c=Bj;Bj=[];for(var d=0;d<c.length;d+=2){var e=c[d],f=c[d+1],g=e.destroy;e.destroy=void 0;if("function"===typeof g)try{g()}catch(k){if(null===f)throw Error(y(330));Wi(f,k)}}c=Aj;Aj=[];for(d=0;d<c.length;d+=2){e=c[d];f=c[d+1];try{var h=e.create;e.destroy=h()}catch(k){if(null===f)throw Error(y(330));Wi(f,k)}}for(h=a.current.firstEffect;null!==h;)a=h.nextEffect,h.nextEffect=null,h.flags&8&&(h.sibling=
null,h.stateNode=null),h=a;X=b;ig();return!0}function gk(a,b,c){b=Mi(c,b);b=Pi(a,b,1);Ag(a,b);b=Hg();a=Kj(a,1);null!==a&&($c(a,1,b),Mj(a,b))}
function Wi(a,b){if(3===a.tag)gk(a,a,b);else for(var c=a.return;null!==c;){if(3===c.tag){gk(c,a,b);break}else if(1===c.tag){var d=c.stateNode;if("function"===typeof c.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Ti||!Ti.has(d))){a=Mi(b,a);var e=Si(c,a,1);Ag(c,e);e=Hg();c=Kj(c,1);if(null!==c)$c(c,1,e),Mj(c,e);else if("function"===typeof d.componentDidCatch&&(null===Ti||!Ti.has(d)))try{d.componentDidCatch(b,a)}catch(f){}break}}c=c.return}}
function Yj(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);b=Hg();a.pingedLanes|=a.suspendedLanes&c;U===a&&(W&c)===c&&(4===V||3===V&&(W&62914560)===W&&500>O()-jj?Qj(a,0):uj|=c);Mj(a,b)}function lj(a,b){var c=a.stateNode;null!==c&&c.delete(b);b=0;0===b&&(b=a.mode,0===(b&2)?b=1:0===(b&4)?b=99===eg()?1:2:(0===Gj&&(Gj=tj),b=Yc(62914560&~Gj),0===b&&(b=4194304)));c=Hg();a=Kj(a,b);null!==a&&($c(a,b,c),Mj(a,c))}var ck;
ck=function(a,b,c){var d=b.lanes;if(null!==a)if(a.memoizedProps!==b.pendingProps||N.current)ug=!0;else if(0!==(c&d))ug=0!==(a.flags&16384)?!0:!1;else{ug=!1;switch(b.tag){case 3:ri(b);sh();break;case 5:gh(b);break;case 1:Ff(b.type)&&Jf(b);break;case 4:eh(b,b.stateNode.containerInfo);break;case 10:d=b.memoizedProps.value;var e=b.type._context;I(mg,e._currentValue);e._currentValue=d;break;case 13:if(null!==b.memoizedState){if(0!==(c&b.child.childLanes))return ti(a,b,c);I(P,P.current&1);b=hi(a,b,c);return null!==
b?b.sibling:null}I(P,P.current&1);break;case 19:d=0!==(c&b.childLanes);if(0!==(a.flags&64)){if(d)return Ai(a,b,c);b.flags|=64}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);I(P,P.current);if(d)break;else return null;case 23:case 24:return b.lanes=0,mi(a,b,c)}return hi(a,b,c)}else ug=!1;b.lanes=0;switch(b.tag){case 2:d=b.type;null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2);a=b.pendingProps;e=Ef(b,M.current);tg(b,c);e=Ch(null,b,d,a,e,c);b.flags|=1;if("object"===
typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof){b.tag=1;b.memoizedState=null;b.updateQueue=null;if(Ff(d)){var f=!0;Jf(b)}else f=!1;b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null;xg(b);var g=d.getDerivedStateFromProps;"function"===typeof g&&Gg(b,d,g,a);e.updater=Kg;b.stateNode=e;e._reactInternals=b;Og(b,d,a,c);b=qi(null,b,d,!0,f,c)}else b.tag=0,fi(null,b,e,c),b=b.child;return b;case 16:e=b.elementType;a:{null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2);
a=b.pendingProps;f=e._init;e=f(e._payload);b.type=e;f=b.tag=hk(e);a=lg(e,a);switch(f){case 0:b=li(null,b,e,a,c);break a;case 1:b=pi(null,b,e,a,c);break a;case 11:b=gi(null,b,e,a,c);break a;case 14:b=ii(null,b,e,lg(e.type,a),d,c);break a}throw Error(y(306,e,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),li(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),pi(a,b,d,e,c);case 3:ri(b);d=b.updateQueue;if(null===a||null===d)throw Error(y(282));
d=b.pendingProps;e=b.memoizedState;e=null!==e?e.element:null;yg(a,b);Cg(b,d,null,c);d=b.memoizedState.element;if(d===e)sh(),b=hi(a,b,c);else{e=b.stateNode;if(f=e.hydrate)kh=rf(b.stateNode.containerInfo.firstChild),jh=b,f=lh=!0;if(f){a=e.mutableSourceEagerHydrationData;if(null!=a)for(e=0;e<a.length;e+=2)f=a[e],f._workInProgressVersionPrimary=a[e+1],th.push(f);c=Zg(b,null,d,c);for(b.child=c;c;)c.flags=c.flags&-3|1024,c=c.sibling}else fi(a,b,d,c),sh();b=b.child}return b;case 5:return gh(b),null===a&&
ph(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,nf(d,e)?g=null:null!==f&&nf(d,f)&&(b.flags|=16),oi(a,b),fi(a,b,g,c),b.child;case 6:return null===a&&ph(b),null;case 13:return ti(a,b,c);case 4:return eh(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Yg(b,null,d,c):fi(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),gi(a,b,d,e,c);case 7:return fi(a,b,b.pendingProps,c),b.child;case 8:return fi(a,b,b.pendingProps.children,
c),b.child;case 12:return fi(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;g=b.memoizedProps;f=e.value;var h=b.type._context;I(mg,h._currentValue);h._currentValue=f;if(null!==g)if(h=g.value,f=He(h,f)?0:("function"===typeof d._calculateChangedBits?d._calculateChangedBits(h,f):1073741823)|0,0===f){if(g.children===e.children&&!N.current){b=hi(a,b,c);break a}}else for(h=b.child,null!==h&&(h.return=b);null!==h;){var k=h.dependencies;if(null!==k){g=h.child;for(var l=
k.firstContext;null!==l;){if(l.context===d&&0!==(l.observedBits&f)){1===h.tag&&(l=zg(-1,c&-c),l.tag=2,Ag(h,l));h.lanes|=c;l=h.alternate;null!==l&&(l.lanes|=c);sg(h.return,c);k.lanes|=c;break}l=l.next}}else g=10===h.tag?h.type===b.type?null:h.child:h.child;if(null!==g)g.return=h;else for(g=h;null!==g;){if(g===b){g=null;break}h=g.sibling;if(null!==h){h.return=g.return;g=h;break}g=g.return}h=g}fi(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,f=b.pendingProps,d=f.children,tg(b,c),e=vg(e,
f.unstable_observedBits),d=d(e),b.flags|=1,fi(a,b,d,c),b.child;case 14:return e=b.type,f=lg(e,b.pendingProps),f=lg(e.type,f),ii(a,b,e,f,d,c);case 15:return ki(a,b,b.type,b.pendingProps,d,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2),b.tag=1,Ff(d)?(a=!0,Jf(b)):a=!1,tg(b,c),Mg(b,d,e),Og(b,d,e,c),qi(null,b,d,!0,a,c);case 19:return Ai(a,b,c);case 23:return mi(a,b,c);case 24:return mi(a,b,c)}throw Error(y(156,b.tag));
};function ik(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.flags=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.childLanes=this.lanes=0;this.alternate=null}function nh(a,b,c,d){return new ik(a,b,c,d)}function ji(a){a=a.prototype;return!(!a||!a.isReactComponent)}
function hk(a){if("function"===typeof a)return ji(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===Aa)return 11;if(a===Da)return 14}return 2}
function Tg(a,b){var c=a.alternate;null===c?(c=nh(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.nextEffect=null,c.firstEffect=null,c.lastEffect=null);c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};
c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
function Vg(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)ji(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case ua:return Xg(c.children,e,f,b);case Ha:g=8;e|=16;break;case wa:g=8;e|=1;break;case xa:return a=nh(12,c,b,e|8),a.elementType=xa,a.type=xa,a.lanes=f,a;case Ba:return a=nh(13,c,b,e),a.type=Ba,a.elementType=Ba,a.lanes=f,a;case Ca:return a=nh(19,c,b,e),a.elementType=Ca,a.lanes=f,a;case Ia:return vi(c,e,f,b);case Ja:return a=nh(24,c,b,e),a.elementType=Ja,a.lanes=f,a;default:if("object"===
typeof a&&null!==a)switch(a.$$typeof){case ya:g=10;break a;case za:g=9;break a;case Aa:g=11;break a;case Da:g=14;break a;case Ea:g=16;d=null;break a;case Fa:g=22;break a}throw Error(y(130,null==a?a:typeof a,""));}b=nh(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function Xg(a,b,c,d){a=nh(7,a,d,b);a.lanes=c;return a}function vi(a,b,c,d){a=nh(23,a,d,b);a.elementType=Ia;a.lanes=c;return a}function Ug(a,b,c){a=nh(6,a,null,b);a.lanes=c;return a}
function Wg(a,b,c){b=nh(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
function jk(a,b,c){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.pendingContext=this.context=null;this.hydrate=c;this.callbackNode=null;this.callbackPriority=0;this.eventTimes=Zc(0);this.expirationTimes=Zc(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=Zc(0);this.mutableSourceEagerHydrationData=null}
function kk(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:ta,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}
function lk(a,b,c,d){var e=b.current,f=Hg(),g=Ig(e);a:if(c){c=c._reactInternals;b:{if(Zb(c)!==c||1!==c.tag)throw Error(y(170));var h=c;do{switch(h.tag){case 3:h=h.stateNode.context;break b;case 1:if(Ff(h.type)){h=h.stateNode.__reactInternalMemoizedMergedChildContext;break b}}h=h.return}while(null!==h);throw Error(y(171));}if(1===c.tag){var k=c.type;if(Ff(k)){c=If(c,k,h);break a}}c=h}else c=Cf;null===b.context?b.context=c:b.pendingContext=c;b=zg(f,g);b.payload={element:a};d=void 0===d?null:d;null!==
d&&(b.callback=d);Ag(e,b);Jg(e,g,f);return g}function mk(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function nk(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b}}function ok(a,b){nk(a,b);(a=a.alternate)&&nk(a,b)}function pk(){return null}
function qk(a,b,c){var d=null!=c&&null!=c.hydrationOptions&&c.hydrationOptions.mutableSources||null;c=new jk(a,b,null!=c&&!0===c.hydrate);b=nh(3,null,null,2===b?7:1===b?3:0);c.current=b;b.stateNode=c;xg(b);a[ff]=c.current;cf(8===a.nodeType?a.parentNode:a);if(d)for(a=0;a<d.length;a++){b=d[a];var e=b._getVersion;e=e(b._source);null==c.mutableSourceEagerHydrationData?c.mutableSourceEagerHydrationData=[b,e]:c.mutableSourceEagerHydrationData.push(b,e)}this._internalRoot=c}
qk.prototype.render=function(a){lk(a,this._internalRoot,null,null)};qk.prototype.unmount=function(){var a=this._internalRoot,b=a.containerInfo;lk(null,a,null,function(){b[ff]=null})};function rk(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}
function sk(a,b){b||(b=a?9===a.nodeType?a.documentElement:a.firstChild:null,b=!(!b||1!==b.nodeType||!b.hasAttribute("data-reactroot")));if(!b)for(var c;c=a.lastChild;)a.removeChild(c);return new qk(a,0,b?{hydrate:!0}:void 0)}
function tk(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f._internalRoot;if("function"===typeof e){var h=e;e=function(){var a=mk(g);h.call(a)}}lk(b,g,a,e)}else{f=c._reactRootContainer=sk(c,d);g=f._internalRoot;if("function"===typeof e){var k=e;e=function(){var a=mk(g);k.call(a)}}Xj(function(){lk(b,g,a,e)})}return mk(g)}ec=function(a){if(13===a.tag){var b=Hg();Jg(a,4,b);ok(a,4)}};fc=function(a){if(13===a.tag){var b=Hg();Jg(a,67108864,b);ok(a,67108864)}};
gc=function(a){if(13===a.tag){var b=Hg(),c=Ig(a);Jg(a,c,b);ok(a,c)}};hc=function(a,b){return b()};
yb=function(a,b,c){switch(b){case "input":ab(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Db(d);if(!e)throw Error(y(90));Wa(d);ab(d,e)}}}break;case "textarea":ib(a,c);break;case "select":b=c.value,null!=b&&fb(a,!!c.multiple,b,!1)}};Gb=Wj;
Hb=function(a,b,c,d,e){var f=X;X|=4;try{return gg(98,a.bind(null,b,c,d,e))}finally{X=f,0===X&&(wj(),ig())}};Ib=function(){0===(X&49)&&(Vj(),Oj())};Jb=function(a,b){var c=X;X|=2;try{return a(b)}finally{X=c,0===X&&(wj(),ig())}};function uk(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!rk(b))throw Error(y(200));return kk(a,b,null,c)}var vk={Events:[Cb,ue,Db,Eb,Fb,Oj,{current:!1}]},wk={findFiberByHostInstance:wc,bundleType:0,version:"17.0.1",rendererPackageName:"react-dom"};
var xk={bundleType:wk.bundleType,version:wk.version,rendererPackageName:wk.rendererPackageName,rendererConfig:wk.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ra.ReactCurrentDispatcher,findHostInstanceByFiber:function(a){a=cc(a);return null===a?null:a.stateNode},findFiberByHostInstance:wk.findFiberByHostInstance||
pk,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var yk=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!yk.isDisabled&&yk.supportsFiber)try{Lf=yk.inject(xk),Mf=yk}catch(a){}}exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=vk;exports.createPortal=uk;
exports.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(y(188));throw Error(y(268,Object.keys(a)));}a=cc(b);a=null===a?null:a.stateNode;return a};exports.flushSync=function(a,b){var c=X;if(0!==(c&48))return a(b);X|=1;try{if(a)return gg(99,a.bind(null,b))}finally{X=c,ig()}};exports.hydrate=function(a,b,c){if(!rk(b))throw Error(y(200));return tk(null,a,b,!0,c)};
exports.render=function(a,b,c){if(!rk(b))throw Error(y(200));return tk(null,a,b,!1,c)};exports.unmountComponentAtNode=function(a){if(!rk(a))throw Error(y(40));return a._reactRootContainer?(Xj(function(){tk(null,null,a,!1,function(){a._reactRootContainer=null;a[ff]=null})}),!0):!1};exports.unstable_batchedUpdates=Wj;exports.unstable_createPortal=function(a,b){return uk(a,b,2<arguments.length&&void 0!==arguments[2]?arguments[2]:null)};
exports.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!rk(c))throw Error(y(200));if(null==a||void 0===a._reactInternals)throw Error(y(38));return tk(a,b,c,!1,d)};exports.version="17.0.1";


/***/ }),

/***/ "../../node_modules/react-dom/index.js":
/*!***************************************************!*\
  !*** /z/monorepo/node_modules/react-dom/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  if (false) {}
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(/*! ./cjs/react-dom.production.min.js */ "../../node_modules/react-dom/cjs/react-dom.production.min.js");
} else {}


/***/ }),

/***/ "../../node_modules/react-hot-loader/root.js":
/*!*********************************************************!*\
  !*** /z/monorepo/node_modules/react-hot-loader/root.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

if (false) { var parent, cache, hot; } else {
  // prod mode
  fallbackHot();
}

function fallbackHot() {
  exports.hot = function (a) {
    return a;
  };
}


/***/ }),

/***/ "../../node_modules/react-is/cjs/react-is.production.min.js":
/*!************************************************************************!*\
  !*** /z/monorepo/node_modules/react-is/cjs/react-is.production.min.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;exports.Fragment=e;exports.Lazy=t;exports.Memo=r;exports.Portal=d;
exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isAsyncMode=function(a){return A(a)||z(a)===l};exports.isConcurrentMode=A;exports.isContextConsumer=function(a){return z(a)===k};exports.isContextProvider=function(a){return z(a)===h};exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return z(a)===n};exports.isFragment=function(a){return z(a)===e};exports.isLazy=function(a){return z(a)===t};
exports.isMemo=function(a){return z(a)===r};exports.isPortal=function(a){return z(a)===d};exports.isProfiler=function(a){return z(a)===g};exports.isStrictMode=function(a){return z(a)===f};exports.isSuspense=function(a){return z(a)===p};
exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};exports.typeOf=z;


/***/ }),

/***/ "../../node_modules/react-is/index.js":
/*!**************************************************!*\
  !*** /z/monorepo/node_modules/react-is/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(/*! ./cjs/react-is.production.min.js */ "../../node_modules/react-is/cjs/react-is.production.min.js");
} else {}


/***/ }),

/***/ "../../node_modules/scheduler/cjs/scheduler.production.min.js":
/*!**************************************************************************!*\
  !*** /z/monorepo/node_modules/scheduler/cjs/scheduler.production.min.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v0.20.1
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f,g,h,k;if("object"===typeof performance&&"function"===typeof performance.now){var l=performance;exports.unstable_now=function(){return l.now()}}else{var p=Date,q=p.now();exports.unstable_now=function(){return p.now()-q}}
if("undefined"===typeof window||"function"!==typeof MessageChannel){var t=null,u=null,w=function(){if(null!==t)try{var a=exports.unstable_now();t(!0,a);t=null}catch(b){throw setTimeout(w,0),b;}};f=function(a){null!==t?setTimeout(f,0,a):(t=a,setTimeout(w,0))};g=function(a,b){u=setTimeout(a,b)};h=function(){clearTimeout(u)};exports.unstable_shouldYield=function(){return!1};k=exports.unstable_forceFrameRate=function(){}}else{var x=window.setTimeout,y=window.clearTimeout;if("undefined"!==typeof console){var z=
window.cancelAnimationFrame;"function"!==typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");"function"!==typeof z&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills")}var A=!1,B=null,C=-1,D=5,E=0;exports.unstable_shouldYield=function(){return exports.unstable_now()>=
E};k=function(){};exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):D=0<a?Math.floor(1E3/a):5};var F=new MessageChannel,G=F.port2;F.port1.onmessage=function(){if(null!==B){var a=exports.unstable_now();E=a+D;try{B(!0,a)?G.postMessage(null):(A=!1,B=null)}catch(b){throw G.postMessage(null),b;}}else A=!1};f=function(a){B=a;A||(A=!0,G.postMessage(null))};g=function(a,b){C=
x(function(){a(exports.unstable_now())},b)};h=function(){y(C);C=-1}}function H(a,b){var c=a.length;a.push(b);a:for(;;){var d=c-1>>>1,e=a[d];if(void 0!==e&&0<I(e,b))a[d]=b,a[c]=e,c=d;else break a}}function J(a){a=a[0];return void 0===a?null:a}
function K(a){var b=a[0];if(void 0!==b){var c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length;d<e;){var m=2*(d+1)-1,n=a[m],v=m+1,r=a[v];if(void 0!==n&&0>I(n,c))void 0!==r&&0>I(r,n)?(a[d]=r,a[v]=c,d=v):(a[d]=n,a[m]=c,d=m);else if(void 0!==r&&0>I(r,c))a[d]=r,a[v]=c,d=v;else break a}}return b}return null}function I(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}var L=[],M=[],N=1,O=null,P=3,Q=!1,R=!1,S=!1;
function T(a){for(var b=J(M);null!==b;){if(null===b.callback)K(M);else if(b.startTime<=a)K(M),b.sortIndex=b.expirationTime,H(L,b);else break;b=J(M)}}function U(a){S=!1;T(a);if(!R)if(null!==J(L))R=!0,f(V);else{var b=J(M);null!==b&&g(U,b.startTime-a)}}
function V(a,b){R=!1;S&&(S=!1,h());Q=!0;var c=P;try{T(b);for(O=J(L);null!==O&&(!(O.expirationTime>b)||a&&!exports.unstable_shouldYield());){var d=O.callback;if("function"===typeof d){O.callback=null;P=O.priorityLevel;var e=d(O.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?O.callback=e:O===J(L)&&K(L);T(b)}else K(L);O=J(L)}if(null!==O)var m=!0;else{var n=J(M);null!==n&&g(U,n.startTime-b);m=!1}return m}finally{O=null,P=c,Q=!1}}var W=k;exports.unstable_IdlePriority=5;
exports.unstable_ImmediatePriority=1;exports.unstable_LowPriority=4;exports.unstable_NormalPriority=3;exports.unstable_Profiling=null;exports.unstable_UserBlockingPriority=2;exports.unstable_cancelCallback=function(a){a.callback=null};exports.unstable_continueExecution=function(){R||Q||(R=!0,f(V))};exports.unstable_getCurrentPriorityLevel=function(){return P};exports.unstable_getFirstCallbackNode=function(){return J(L)};
exports.unstable_next=function(a){switch(P){case 1:case 2:case 3:var b=3;break;default:b=P}var c=P;P=b;try{return a()}finally{P=c}};exports.unstable_pauseExecution=function(){};exports.unstable_requestPaint=W;exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=P;P=a;try{return b()}finally{P=c}};
exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?d+c:d):c=d;switch(a){case 1:var e=-1;break;case 2:e=250;break;case 5:e=1073741823;break;case 4:e=1E4;break;default:e=5E3}e=c+e;a={id:N++,callback:b,priorityLevel:a,startTime:c,expirationTime:e,sortIndex:-1};c>d?(a.sortIndex=c,H(M,a),null===J(L)&&a===J(M)&&(S?h():S=!0,g(U,c-d))):(a.sortIndex=e,H(L,a),R||Q||(R=!0,f(V)));return a};
exports.unstable_wrapCallback=function(a){var b=P;return function(){var c=P;P=b;try{return a.apply(this,arguments)}finally{P=c}}};


/***/ }),

/***/ "../../node_modules/scheduler/index.js":
/*!***************************************************!*\
  !*** /z/monorepo/node_modules/scheduler/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(/*! ./cjs/scheduler.production.min.js */ "../../node_modules/scheduler/cjs/scheduler.production.min.js");
} else {}


/***/ }),

/***/ "../../node_modules/style-value-types/dist/style-value-types.es.js":
/*!*******************************************************************************!*\
  !*** /z/monorepo/node_modules/style-value-types/dist/style-value-types.es.js ***!
  \*******************************************************************************/
/*! exports provided: alpha, color, complex, degrees, hex, hsla, number, percent, progressPercentage, px, rgbUnit, rgba, scale, vh, vw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alpha", function() { return alpha; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "color", function() { return color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "complex", function() { return complex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "degrees", function() { return degrees; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hex", function() { return hex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hsla", function() { return hsla; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "number", function() { return number; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "percent", function() { return percent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "progressPercentage", function() { return progressPercentage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "px", function() { return px; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbUnit", function() { return rgbUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgba", function() { return rgba; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vh", function() { return vh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vw", function() { return vw; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/style-value-types/node_modules/tslib/tslib.es6.js");


var clamp = function (min, max) { return function (v) {
    return Math.max(Math.min(v, max), min);
}; };
var sanitize = function (v) { return (v % 1 ? Number(v.toFixed(5)) : v); };
var floatRegex = /(-)?(\d[\d\.]*)/g;
var colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))/gi;
var singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))$/i;

var number = {
    test: function (v) { return typeof v === 'number'; },
    parse: parseFloat,
    transform: function (v) { return v; }
};
var alpha = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, number), { transform: clamp(0, 1) });
var scale = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, number), { default: 1 });

var createUnitType = function (unit) { return ({
    test: function (v) {
        return typeof v === 'string' && v.endsWith(unit) && v.split(' ').length === 1;
    },
    parse: parseFloat,
    transform: function (v) { return "" + v + unit; }
}); };
var degrees = createUnitType('deg');
var percent = createUnitType('%');
var px = createUnitType('px');
var vh = createUnitType('vh');
var vw = createUnitType('vw');
var progressPercentage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, percent), { parse: function (v) { return percent.parse(v) / 100; }, transform: function (v) { return percent.transform(v * 100); } });

var getValueFromFunctionString = function (value) {
    return value.substring(value.indexOf('(') + 1, value.lastIndexOf(')'));
};
var clampRgbUnit = clamp(0, 255);
var isRgba = function (v) { return v.red !== undefined; };
var isHsla = function (v) { return v.hue !== undefined; };
function getValuesAsArray(value) {
    return getValueFromFunctionString(value)
        .replace(/(,|\/)/g, ' ')
        .split(/ \s*/);
}
var splitColorValues = function (terms) {
    return function (v) {
        if (typeof v !== 'string')
            return v;
        var values = {};
        var valuesArray = getValuesAsArray(v);
        for (var i = 0; i < 4; i++) {
            values[terms[i]] =
                valuesArray[i] !== undefined ? parseFloat(valuesArray[i]) : 1;
        }
        return values;
    };
};
var rgbaTemplate = function (_a) {
    var red = _a.red, green = _a.green, blue = _a.blue, _b = _a.alpha, alpha = _b === void 0 ? 1 : _b;
    return "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
};
var hslaTemplate = function (_a) {
    var hue = _a.hue, saturation = _a.saturation, lightness = _a.lightness, _b = _a.alpha, alpha = _b === void 0 ? 1 : _b;
    return "hsla(" + hue + ", " + saturation + ", " + lightness + ", " + alpha + ")";
};
var rgbUnit = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, number), { transform: function (v) { return Math.round(clampRgbUnit(v)); } });
function isColorString(color, colorType) {
    return color.startsWith(colorType) && singleColorRegex.test(color);
}
var rgba = {
    test: function (v) { return (typeof v === 'string' ? isColorString(v, 'rgb') : isRgba(v)); },
    parse: splitColorValues(['red', 'green', 'blue', 'alpha']),
    transform: function (_a) {
        var red = _a.red, green = _a.green, blue = _a.blue, _b = _a.alpha, alpha$1 = _b === void 0 ? 1 : _b;
        return rgbaTemplate({
            red: rgbUnit.transform(red),
            green: rgbUnit.transform(green),
            blue: rgbUnit.transform(blue),
            alpha: sanitize(alpha.transform(alpha$1))
        });
    }
};
var hsla = {
    test: function (v) { return (typeof v === 'string' ? isColorString(v, 'hsl') : isHsla(v)); },
    parse: splitColorValues(['hue', 'saturation', 'lightness', 'alpha']),
    transform: function (_a) {
        var hue = _a.hue, saturation = _a.saturation, lightness = _a.lightness, _b = _a.alpha, alpha$1 = _b === void 0 ? 1 : _b;
        return hslaTemplate({
            hue: Math.round(hue),
            saturation: percent.transform(sanitize(saturation)),
            lightness: percent.transform(sanitize(lightness)),
            alpha: sanitize(alpha.transform(alpha$1))
        });
    }
};
var hex = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, rgba), { test: function (v) { return typeof v === 'string' && isColorString(v, '#'); }, parse: function (v) {
        var r = '';
        var g = '';
        var b = '';
        if (v.length > 4) {
            r = v.substr(1, 2);
            g = v.substr(3, 2);
            b = v.substr(5, 2);
        }
        else {
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
            alpha: 1
        };
    } });
var color = {
    test: function (v) {
        return (typeof v === 'string' && singleColorRegex.test(v)) ||
            isRgba(v) ||
            isHsla(v);
    },
    parse: function (v) {
        if (rgba.test(v)) {
            return rgba.parse(v);
        }
        else if (hsla.test(v)) {
            return hsla.parse(v);
        }
        else if (hex.test(v)) {
            return hex.parse(v);
        }
        return v;
    },
    transform: function (v) {
        if (isRgba(v)) {
            return rgba.transform(v);
        }
        else if (isHsla(v)) {
            return hsla.transform(v);
        }
        return v;
    }
};

var COLOR_TOKEN = '${c}';
var NUMBER_TOKEN = '${n}';
var convertNumbersToZero = function (v) {
    return typeof v === 'number' ? 0 : v;
};
var complex = {
    test: function (v) {
        if (typeof v !== 'string' || !isNaN(v))
            return false;
        var numValues = 0;
        var foundNumbers = v.match(floatRegex);
        var foundColors = v.match(colorRegex);
        if (foundNumbers)
            numValues += foundNumbers.length;
        if (foundColors)
            numValues += foundColors.length;
        return numValues > 0;
    },
    parse: function (v) {
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
    createTransformer: function (prop) {
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
                output = output.replace(i < numColors ? COLOR_TOKEN : NUMBER_TOKEN, i < numColors ? color.transform(v[i]) : sanitize(v[i]));
            }
            return output;
        };
    },
    getAnimatableNone: function (target) {
        var parsedTarget = complex.parse(target);
        var targetTransformer = complex.createTransformer(target);
        return targetTransformer(parsedTarget.map(convertNumbersToZero));
    }
};




/***/ }),

/***/ "../../node_modules/style-value-types/node_modules/tslib/tslib.es6.js":
/*!**********************************************************************************!*\
  !*** /z/monorepo/node_modules/style-value-types/node_modules/tslib/tslib.es6.js ***!
  \**********************************************************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
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

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
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


/***/ }),

/***/ "../../node_modules/stylis/dist/stylis.mjs":
/*!*******************************************************!*\
  !*** /z/monorepo/node_modules/stylis/dist/stylis.mjs ***!
  \*******************************************************/
/*! exports provided: CHARSET, COMMENT, COUNTER_STYLE, DECLARATION, DOCUMENT, FONT_FACE, FONT_FEATURE_VALUES, IMPORT, KEYFRAMES, MEDIA, MOZ, MS, NAMESPACE, PAGE, RULESET, SUPPORTS, VIEWPORT, WEBKIT, abs, alloc, append, caret, char, character, characters, charat, column, combine, comment, commenter, compile, copy, dealloc, declaration, delimit, delimiter, from, hash, identifier, indexof, length, line, match, middleware, namespace, next, node, parse, peek, position, prefix, prefixer, replace, ruleset, rulesheet, serialize, sizeof, slice, stringify, strlen, substr, token, tokenize, tokenizer, trim, whitespace */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHARSET", function() { return f; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMMENT", function() { return c; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COUNTER_STYLE", function() { return b; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DECLARATION", function() { return t; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCUMENT", function() { return v; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FONT_FACE", function() { return w; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FONT_FEATURE_VALUES", function() { return $; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IMPORT", function() { return i; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KEYFRAMES", function() { return p; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MEDIA", function() { return u; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOZ", function() { return r; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MS", function() { return e; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NAMESPACE", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAGE", function() { return s; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RULESET", function() { return n; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SUPPORTS", function() { return l; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIEWPORT", function() { return o; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WEBKIT", function() { return a; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "abs", function() { return k; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alloc", function() { return R; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "append", function() { return O; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "caret", function() { return N; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "char", function() { return J; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "character", function() { return F; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "characters", function() { return G; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "charat", function() { return z; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "column", function() { return B; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combine", function() { return S; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "comment", function() { return ce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commenter", function() { return Z; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compile", function() { return ee; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return I; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dealloc", function() { return T; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "declaration", function() { return ne; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delimit", function() { return U; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delimiter", function() { return Y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "from", function() { return d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hash", function() { return m; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identifier", function() { return _; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "indexof", function() { return j; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return D; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "line", function() { return q; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "match", function() { return x; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "middleware", function() { return ie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "namespace", function() { return le; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "next", function() { return K; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "node", function() { return H; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return re; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "peek", function() { return L; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "position", function() { return E; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prefix", function() { return te; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prefixer", function() { return oe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replace", function() { return y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ruleset", function() { return ae; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rulesheet", function() { return fe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serialize", function() { return se; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sizeof", function() { return M; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slice", function() { return P; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringify", function() { return ue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strlen", function() { return A; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "substr", function() { return C; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "token", function() { return Q; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokenize", function() { return V; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokenizer", function() { return X; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trim", function() { return g; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whitespace", function() { return W; });
var e="-ms-";var r="-moz-";var a="-webkit-";var c="comm";var n="rule";var t="decl";var s="@page";var u="@media";var i="@import";var f="@charset";var o="@viewport";var l="@supports";var v="@document";var h="@namespace";var p="@keyframes";var w="@font-face";var b="@counter-style";var $="@font-feature-values";var k=Math.abs;var d=String.fromCharCode;function m(e,r){return(((r<<2^z(e,0))<<2^z(e,1))<<2^z(e,2))<<2^z(e,3)}function g(e){return e.trim()}function x(e,r){return(e=r.exec(e))?e[0]:e}function y(e,r,a){return e.replace(r,a)}function j(e,r){return e.indexOf(r)}function z(e,r){return e.charCodeAt(r)|0}function C(e,r,a){return e.slice(r,a)}function A(e){return e.length}function M(e){return e.length}function O(e,r){return r.push(e),e}function S(e,r){return e.map(r).join("")}var q=1;var B=1;var D=0;var E=0;var F=0;var G="";function H(e,r,a,c,n,t,s){return{value:e,root:r,parent:a,type:c,props:n,children:t,line:q,column:B,length:s,return:""}}function I(e,r,a){return H(e,r.root,r.parent,a,r.props,r.children,0)}function J(){return F}function K(){F=E<D?z(G,E++):0;if(B++,F===10)B=1,q++;return F}function L(){return z(G,E)}function N(){return E}function P(e,r){return C(G,e,r)}function Q(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function R(e){return q=B=1,D=A(G=e),E=0,[]}function T(e){return G="",e}function U(e){return g(P(E-1,Y(e===91?e+2:e===40?e+1:e)))}function V(e){return T(X(R(e)))}function W(e){while(F=L())if(F<33)K();else break;return Q(e)>2||Q(F)>3?"":" "}function X(e){while(K())switch(Q(F)){case 0:O(_(E-1),e);break;case 2:O(U(F),e);break;default:O(d(F),e)}return e}function Y(e){while(K())switch(F){case e:return E;case 34:case 39:return Y(e===34||e===39?e:F);case 40:if(e===41)Y(e);break;case 92:K();break}return E}function Z(e,r){while(K())if(e+F===47+10)break;else if(e+F===42+42&&L()===47)break;return"/*"+P(r,E-1)+"*"+d(e===47?e:K())}function _(e){while(!Q(L()))K();return P(e,E)}function ee(e){return T(re("",null,null,null,[""],e=R(e),0,[0],e))}function re(e,r,a,c,n,t,s,u,i){var f=0;var o=0;var l=s;var v=0;var h=0;var p=0;var w=1;var b=1;var $=1;var k=0;var m="";var g=n;var x=t;var j=c;var z=m;while(b)switch(p=k,k=K()){case 34:case 39:case 91:case 40:z+=U(k);break;case 9:case 10:case 13:case 32:z+=W(p);break;case 47:switch(L()){case 42:case 47:O(ce(Z(K(),N()),r,a),i);break;default:z+="/"}break;case 123*w:u[f++]=A(z)*$;case 125*w:case 59:case 0:switch(k){case 0:case 125:b=0;case 59+o:if(h>0)O(h>32?ne(z+";",c,a,l-1):ne(y(z," ","")+";",c,a,l-2),i);break;case 59:z+=";";default:O(j=ae(z,r,a,f,o,n,u,m,g=[],x=[],l),t);if(k===123)if(o===0)re(z,r,j,j,g,t,l,u,x);else switch(v){case 100:case 109:case 115:re(e,j,j,c&&O(ae(e,j,j,0,0,n,u,m,n,g=[],l),x),n,x,l,u,c?g:x);break;default:re(z,j,j,j,[""],x,l,u,x)}}f=o=h=0,w=$=1,m=z="",l=s;break;case 58:l=1+A(z),h=p;default:switch(z+=d(k),k*w){case 38:$=o>0?1:(z+="\f",-1);break;case 44:u[f++]=(A(z)-1)*$,$=1;break;case 64:if(L()===45)z+=U(K());v=L(),o=A(m=z+=_(N())),k++;break;case 45:if(p===45&&A(z)==2)w=0}}return t}function ae(e,r,a,c,t,s,u,i,f,o,l){var v=t-1;var h=t===0?s:[""];var p=M(h);for(var w=0,b=0,$=0;w<c;++w)for(var d=0,m=C(e,v+1,v=k(b=u[w])),x=e;d<p;++d)if(x=g(b>0?h[d]+" "+m:y(m,/&\f/g,h[d])))f[$++]=x;return H(e,r,a,t===0?n:i,f,o,l)}function ce(e,r,a){return H(e,r,a,c,d(J()),C(e,2,-2),0)}function ne(e,r,a,c){return H(e,r,a,t,C(e,0,c),C(e,c+1,-1),c)}function te(c,n){switch(m(c,n)){case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return a+c+c;case 5349:case 4246:case 4810:case 6968:case 2756:return a+c+r+c+e+c+c;case 6828:case 4268:return a+c+e+c+c;case 6165:return a+c+e+"flex-"+c+c;case 5187:return a+c+y(c,/(\w+).+(:[^]+)/,a+"box-$1$2"+e+"flex-$1$2")+c;case 5443:return a+c+e+"flex-item-"+y(c,/flex-|-self/,"")+c;case 4675:return a+c+e+"flex-line-pack"+y(c,/align-content|flex-|-self/,"")+c;case 5548:return a+c+e+y(c,"shrink","negative")+c;case 5292:return a+c+e+y(c,"basis","preferred-size")+c;case 6060:return a+"box-"+y(c,"-grow","")+a+c+e+y(c,"grow","positive")+c;case 4554:return a+y(c,/([^-])(transform)/g,"$1"+a+"$2")+c;case 6187:return y(y(y(c,/(zoom-|grab)/,a+"$1"),/(image-set)/,a+"$1"),c,"")+c;case 5495:case 3959:return y(c,/(image-set\([^]*)/,a+"$1"+"$`$1");case 4968:return y(y(c,/(.+:)(flex-)?(.*)/,a+"box-pack:$3"+e+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+a+c+c;case 4095:case 3583:case 4068:case 2532:return y(c,/(.+)-inline(.+)/,a+"$1$2")+c;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(A(c)-1-n>6)switch(z(c,n+1)){case 102:n=z(c,n+3);case 109:return y(c,/(.+:)(.+)-([^]+)/,"$1"+a+"$2-$3"+"$1"+r+(n==108?"$3":"$2-$3"))+c;case 115:return~j(c,"stretch")?te(y(c,"stretch","fill-available"),n)+c:c}break;case 4949:if(z(c,n+1)!==115)break;case 6444:switch(z(c,A(c)-3-(~j(c,"!important")&&10))){case 107:case 111:return y(c,c,a+c)+c;case 101:return y(c,/(.+:)([^;!]+)(;|!.+)?/,"$1"+a+(z(c,14)===45?"inline-":"")+"box$3"+"$1"+a+"$2$3"+"$1"+e+"$2box$3")+c}break;case 5936:switch(z(c,n+11)){case 114:return a+c+e+y(c,/[svh]\w+-[tblr]{2}/,"tb")+c;case 108:return a+c+e+y(c,/[svh]\w+-[tblr]{2}/,"tb-rl")+c;case 45:return a+c+e+y(c,/[svh]\w+-[tblr]{2}/,"lr")+c}return a+c+e+c+c}return c}function se(e,r){var a="";var c=M(e);for(var n=0;n<c;n++)a+=r(e[n],n,e,r)||"";return a}function ue(e,r,a,s){switch(e.type){case i:case t:return e.return=e.return||e.value;case c:return"";case n:e.value=e.props.join(",")}return A(a=se(e.children,s))?e.return=e.value+"{"+a+"}":""}function ie(e){var r=M(e);return function(a,c,n,t){var s="";for(var u=0;u<r;u++)s+=e[u](a,c,n,t)||"";return s}}function fe(e){return function(r){if(!r.root)if(r=r.return)e(r)}}function oe(c,s,u,i){if(!c.return)switch(c.type){case t:c.return=te(c.value,c.length);break;case p:return se([I(y(c.value,"@","@"+a),c,"")],i);case n:if(c.length)return S(c.props,(function(n){switch(x(n,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return se([I(y(n,/:(read-\w+)/,":"+r+"$1"),c,"")],i);case"::placeholder":return se([I(y(n,/:(plac\w+)/,":"+a+"input-$1"),c,""),I(y(n,/:(plac\w+)/,":"+r+"$1"),c,""),I(y(n,/:(plac\w+)/,e+"input-$1"),c,"")],i)}return""}))}}function le(e){switch(e.type){case n:e.props=e.props.map((function(r){return S(V(r),(function(r,a,c){switch(z(r,0)){case 12:return C(r,1,A(r));case 0:case 40:case 43:case 62:case 126:return r;case 58:if(c[a+1]==="global")c[a+1]="",c[a+2]="\f"+C(c[a+2],a=1,-1);case 32:return a===1?"":r;default:switch(a){case 0:e=r;return M(c)>1?"":r;case a=M(c)-1:case 2:return a===2?r+e+e:r+e;default:return r}}}))}))}}
//# sourceMappingURL=stylis.mjs.map


/***/ }),

/***/ "../../node_modules/typography-breakpoint-constants/dist/index.js":
/*!******************************************************************************!*\
  !*** /z/monorepo/node_modules/typography-breakpoint-constants/dist/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LARGER_DISPLAY_WIDTH = exports.LARGER_DISPLAY_WIDTH = "1600px";
var LARGE_DISPLAY_WIDTH = exports.LARGE_DISPLAY_WIDTH = "1280px";
var DEFAULT_WIDTH = exports.DEFAULT_WIDTH = "980px";
var TABLET_WIDTH = exports.TABLET_WIDTH = "768px";
var MOBILE_WIDTH = exports.MOBILE_WIDTH = "480px";

var LARGER_DISPLAY_MEDIA_QUERY = exports.LARGER_DISPLAY_MEDIA_QUERY = "@media only screen and (max-width:1600px)";
var LARGE_DISPLAY_MEDIA_QUERY = exports.LARGE_DISPLAY_MEDIA_QUERY = "@media only screen and (max-width:1280px)";
var DEFAULT_MEDIA_QUERY = exports.DEFAULT_MEDIA_QUERY = "@media only screen and (max-width:980px)";
var TABLET_MEDIA_QUERY = exports.TABLET_MEDIA_QUERY = "@media only screen and (max-width:768px)";
var MOBILE_MEDIA_QUERY = exports.MOBILE_MEDIA_QUERY = "@media only screen and (max-width:480px)";

var MIN_LARGER_DISPLAY_MEDIA_QUERY = exports.MIN_LARGER_DISPLAY_MEDIA_QUERY = "@media (min-width:1600px)";
var MIN_LARGE_DISPLAY_MEDIA_QUERY = exports.MIN_LARGE_DISPLAY_MEDIA_QUERY = "@media (min-width:1280px)";
var MIN_DEFAULT_MEDIA_QUERY = exports.MIN_DEFAULT_MEDIA_QUERY = "@media (min-width:980px)";
var MIN_TABLET_MEDIA_QUERY = exports.MIN_TABLET_MEDIA_QUERY = "@media (min-width:768px)";
var MIN_MOBILE_MEDIA_QUERY = exports.MIN_MOBILE_MEDIA_QUERY = "@media (min-width:480px)";

/***/ }),

/***/ "../../node_modules/typography-theme-wordpress-2016/dist/index.js":
/*!******************************************************************************!*\
  !*** /z/monorepo/node_modules/typography-theme-wordpress-2016/dist/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _grayPercentage = __webpack_require__(/*! gray-percentage */ "../../node_modules/gray-percentage/index.js");

var _grayPercentage2 = _interopRequireDefault(_grayPercentage);

var _typographyBreakpointConstants = __webpack_require__(/*! typography-breakpoint-constants */ "../../node_modules/typography-breakpoint-constants/dist/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var theme = {
  title: "Wordpress Theme 2016",
  baseFontSize: "16px",
  baseLineHeight: 1.75,
  scaleRatio: 5 / 2,
  googleFonts: [{
    name: "Montserrat",
    styles: ["700"]
  }, {
    name: "Merriweather",
    styles: ["400", "400i", "700", "700i", "900", "900i"]
  }],
  headerFontFamily: ["Merriweather", "Georgia", "serif"],
  bodyFontFamily: ["Merriweather", "Georgia", "serif"],
  bodyColor: "hsla(0,0%,0%,0.9)",
  headerWeight: 900,
  bodyWeight: 400,
  boldWeight: 700,
  overrideStyles: function overrideStyles(_ref, options) {
    var _ref2;

    var adjustFontSizeTo = _ref.adjustFontSizeTo,
        scale = _ref.scale,
        rhythm = _ref.rhythm;
    return _ref2 = {
      h1: {
        fontFamily: ["Montserrat", "sans-serif"].join(",")
      },
      blockquote: _extends({}, scale(1 / 5), {
        color: (0, _grayPercentage2.default)(41),
        fontStyle: "italic",
        paddingLeft: rhythm(13 / 16),
        marginLeft: rhythm(-1),
        borderLeft: rhythm(3 / 16) + " solid " + (0, _grayPercentage2.default)(10)
      }),
      "blockquote > :last-child": {
        marginBottom: 0
      },
      "blockquote cite": _extends({}, adjustFontSizeTo(options.baseFontSize), {
        color: options.bodyColor,
        fontWeight: options.bodyWeight
      }),
      "blockquote cite:before": {
        content: '"— "'
      },
      ul: {
        listStyle: "disc"
      },
      "ul,ol": {
        marginLeft: 0
      }
    }, _defineProperty(_ref2, _typographyBreakpointConstants.MOBILE_MEDIA_QUERY, {
      "ul,ol": {
        marginLeft: rhythm(1)
      },
      blockquote: {
        marginLeft: rhythm(-3 / 4),
        marginRight: 0,
        paddingLeft: rhythm(9 / 16)
      }
    }), _defineProperty(_ref2, "h1,h2,h3,h4,h5,h6", {
      marginTop: rhythm(2)
    }), _defineProperty(_ref2, "h4", {
      letterSpacing: "0.140625em",
      textTransform: "uppercase"
    }), _defineProperty(_ref2, "h6", {
      fontStyle: "italic"
    }), _defineProperty(_ref2, "a", {
      boxShadow: "0 1px 0 0 currentColor",
      color: "#007acc",
      textDecoration: "none"
    }), _defineProperty(_ref2, "a:hover,a:active", {
      boxShadow: "none"
    }), _defineProperty(_ref2, "mark,ins", {
      background: "#007acc",
      color: "white",
      padding: rhythm(1 / 16) + " " + rhythm(1 / 8),
      textDecoration: "none"
    }), _ref2;
  }
};

exports.default = theme;

/***/ }),

/***/ "../../node_modules/typography/dist/index.js":
/*!*********************************************************!*\
  !*** /z/monorepo/node_modules/typography/dist/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var t=Object.getOwnPropertySymbols,e=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;var n,o,i=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},r=0;r<10;r++)e["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(e).map(function(t){return e[t]}).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach(function(t){n[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(t){return!1}}()?Object.assign:function(n,o){for(var i,a,u=function(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}(n),c=1;c<arguments.length;c++){for(var l in i=Object(arguments[c]))e.call(i,l)&&(u[l]=i[l]);if(t){a=t(i);for(var f=0;f<a.length;f++)r.call(i,a[f])&&(u[a[f]]=i[a[f]])}}return u},a=function(t,e){e||(e=[0,""]),t=String(t);var r=parseFloat(t,10);return e[0]=r,e[1]=t.match(/[\d.\-\+]*\s*(.*)/)[1]||"",e},u=function(t){return a(t)[0]},c=function(t){return null==t&&(t=t),function(e,r,n,o){null==n&&(n=t),null==o&&(o=n);var i=a(e)[1];if(i===r)return e;var c=u(e);if("px"!==i)if("em"===i)c=u(e)*u(n);else if("rem"===i)c=u(e)*u(t);else{if("ex"!==i)return e;c=u(e)*u(n)*2}var l=c;if("px"!==r)if("em"===r)l=c/u(o);else if("rem"===r)l=c/u(t);else{if("ex"!==r)return e;l=c/u(o)/2}return parseFloat(l.toFixed(5))+r}},l=a,f=function(t){return l(t)[1]},s=function(t){return l(t)[0]},p={baseFontSize:"16px",baseLineHeight:1.5,rhythmUnit:"rem",defaultRhythmBorderWidth:"1px",defaultRhythmBorderStyle:"solid",roundToNearestHalfLine:!0,minLinePadding:"2px"},v=function(t,e){var r,n=c(e.baseFontSize),o=s(n(t,"px")),i=s(e.baseLineHeightInPx),a=s(n(e.minLinePadding,"px"));return(r=e.roundToNearestHalfLine?Math.ceil(2*o/i)/2:Math.ceil(o/i))*i-o<2*a&&(r+=e.roundToNearestHalfLine?.5:1),r},h=function(t){var e=c(t.baseFontSize);return function(r,n,o){null==r&&(r=1),null==n&&(n=t.baseFontSize),null==o&&(o=0);var i=r*s(t.baseLineHeightInPx)-o+"px",a=e(i,t.rhythmUnit,n);return"px"===f(a)&&(a=Math.floor(s(a))+f(a)),parseFloat(s(a).toFixed(5))+f(a)}},d="[object Number]",b=Object.prototype.toString;n=function(t){return"number"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&b.call(t)==d},o={"minor second":16/15,"major second":9/8,"minor third":1.2,"major third":4/3,"diminished fourth":Math.sqrt(2),"perfect fifth":1.5,"minor sixth":1.6,golden:1.61803398875,phi:1.61803398875,"major sixth":5/3,"minor seventh":16/9,"major seventh":15/8,octave:2,"major tenth":2.5,"major eleventh":8/3,"major twelfth":3,"double octave":4};function g(t){return!isNaN(parseFloat(t))&&isFinite(t)}var y=function(t,e,r){if(void 0===e&&(e=0),void 0===r&&(r=!1),"cool"===e?e=237:"slate"===e?e=122:"warm"===e&&(e=69),!g(e))throw new Error("Hue is not a number");if(!g(t))throw new Error("Lightness is not a number");t>100&&(t=100),t<0&&(t=0);var n=0;if(0!==e){n=19.92978+-.3651759*t+.001737214*Math.pow(t,2)}var o=0;return r?(o=t/100,t="100%,"):(o=(100-t)/100,t="0%,"),"hsla("+e+","+n+"%,"+t+o+")"},m="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function j(t,e){return t(e={exports:{}},e.exports),e.exports}var _="object"==typeof m&&m&&m.Object===Object&&m,w="object"==typeof self&&self&&self.Object===Object&&self,O=_||w||Function("return this")(),S=O.Symbol,x=Object.prototype,z=x.hasOwnProperty,F=x.toString,k=S?S.toStringTag:void 0;var A=function(t){var e=z.call(t,k),r=t[k];try{t[k]=void 0;var n=!0}catch(t){}var o=F.call(t);return n&&(e?t[k]=r:delete t[k]),o},L=Object.prototype.toString;var B=function(t){return L.call(t)},P="[object Null]",T="[object Undefined]",M=S?S.toStringTag:void 0;var E=function(t){return null==t?void 0===t?T:P:M&&M in Object(t)?A(t):B(t)};var H=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)},N="[object AsyncFunction]",W="[object Function]",C="[object GeneratorFunction]",I="[object Proxy]";var R,$=function(t){if(!H(t))return!1;var e=E(t);return e==W||e==C||e==N||e==I},U=O["__core-js_shared__"],D=(R=/[^.]+$/.exec(U&&U.keys&&U.keys.IE_PROTO||""))?"Symbol(src)_1."+R:"";var q=function(t){return!!D&&D in t},V=Function.prototype.toString;var J=function(t){if(null!=t){try{return V.call(t)}catch(t){}try{return t+""}catch(t){}}return""},Z=/^\[object .+?Constructor\]$/,G=Function.prototype,K=Object.prototype,Y=RegExp("^"+G.toString.call(K.hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");var Q=function(t){return!(!H(t)||q(t))&&($(t)?Y:Z).test(J(t))};var X=function(t,e){return null==t?void 0:t[e]};var tt=function(t,e){var r=X(t,e);return Q(r)?r:void 0},et=function(){try{var t=tt(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();var rt=function(t,e,r){"__proto__"==e&&et?et(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r};var nt=function(t,e){return t===e||t!=t&&e!=e},ot=Object.prototype.hasOwnProperty;var it=function(t,e,r){var n=t[e];ot.call(t,e)&&nt(n,r)&&(void 0!==r||e in t)||rt(t,e,r)},at=Array.isArray;var ut=function(t){return null!=t&&"object"==typeof t},ct="[object Symbol]";var lt=function(t){return"symbol"==typeof t||ut(t)&&E(t)==ct},ft=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,st=/^\w*$/;var pt=function(t,e){if(at(t))return!1;var r=typeof t;return!("number"!=r&&"symbol"!=r&&"boolean"!=r&&null!=t&&!lt(t))||st.test(t)||!ft.test(t)||null!=e&&t in Object(e)},vt=tt(Object,"create");var ht=function(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e},dt="__lodash_hash_undefined__",bt=Object.prototype.hasOwnProperty;var gt=function(t){var e=this.__data__;if(vt){var r=e[t];return r===dt?void 0:r}return bt.call(e,t)?e[t]:void 0},yt=Object.prototype.hasOwnProperty;var mt=function(t){var e=this.__data__;return vt?void 0!==e[t]:yt.call(e,t)},jt="__lodash_hash_undefined__";var _t=function(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=vt&&void 0===e?jt:e,this};function wt(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}wt.prototype.clear=function(){this.__data__=vt?vt(null):{},this.size=0},wt.prototype.delete=ht,wt.prototype.get=gt,wt.prototype.has=mt,wt.prototype.set=_t;var Ot=wt;var St=function(t,e){for(var r=t.length;r--;)if(nt(t[r][0],e))return r;return-1},xt=Array.prototype.splice;var zt=function(t){var e=this.__data__,r=St(e,t);return!(r<0||(r==e.length-1?e.pop():xt.call(e,r,1),--this.size,0))};var Ft=function(t){var e=this.__data__,r=St(e,t);return r<0?void 0:e[r][1]};var kt=function(t){return St(this.__data__,t)>-1};var At=function(t,e){var r=this.__data__,n=St(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this};function Lt(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Lt.prototype.clear=function(){this.__data__=[],this.size=0},Lt.prototype.delete=zt,Lt.prototype.get=Ft,Lt.prototype.has=kt,Lt.prototype.set=At;var Bt=Lt,Pt=tt(O,"Map");var Tt=function(t){var e=typeof t;return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t};var Mt=function(t,e){var r=t.__data__;return Tt(e)?r["string"==typeof e?"string":"hash"]:r.map};var Et=function(t){var e=Mt(this,t).delete(t);return this.size-=e?1:0,e};var Ht=function(t){return Mt(this,t).get(t)};var Nt=function(t){return Mt(this,t).has(t)};var Wt=function(t,e){var r=Mt(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this};function Ct(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Ct.prototype.clear=function(){this.size=0,this.__data__={hash:new Ot,map:new(Pt||Bt),string:new Ot}},Ct.prototype.delete=Et,Ct.prototype.get=Ht,Ct.prototype.has=Nt,Ct.prototype.set=Wt;var It=Ct,Rt="Expected a function";function $t(t,e){if("function"!=typeof t||null!=e&&"function"!=typeof e)throw new TypeError(Rt);var r=function(){var n=arguments,o=e?e.apply(this,n):n[0],i=r.cache;if(i.has(o))return i.get(o);var a=t.apply(this,n);return r.cache=i.set(o,a)||i,a};return r.cache=new($t.Cache||It),r}$t.Cache=It;var Ut=$t,Dt=500;var qt=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Vt=/\\(\\)?/g,Jt=function(t){var e=Ut(t,function(t){return r.size===Dt&&r.clear(),t}),r=e.cache;return e}(function(t){var e=[];return 46===t.charCodeAt(0)&&e.push(""),t.replace(qt,function(t,r,n,o){e.push(n?o.replace(Vt,"$1"):r||t)}),e});var Zt=function(t,e){for(var r=-1,n=null==t?0:t.length,o=Array(n);++r<n;)o[r]=e(t[r],r,t);return o},Gt=1/0,Kt=S?S.prototype:void 0,Yt=Kt?Kt.toString:void 0;var Qt=function t(e){if("string"==typeof e)return e;if(at(e))return Zt(e,t)+"";if(lt(e))return Yt?Yt.call(e):"";var r=e+"";return"0"==r&&1/e==-Gt?"-0":r};var Xt=function(t){return null==t?"":Qt(t)};var te=function(t,e){return at(t)?t:pt(t,e)?[t]:Jt(Xt(t))},ee=9007199254740991,re=/^(?:0|[1-9]\d*)$/;var ne=function(t,e){var r=typeof t;return!!(e=null==e?ee:e)&&("number"==r||"symbol"!=r&&re.test(t))&&t>-1&&t%1==0&&t<e},oe=1/0;var ie=function(t){if("string"==typeof t||lt(t))return t;var e=t+"";return"0"==e&&1/t==-oe?"-0":e};var ae=function(t,e,r,n){if(!H(t))return t;for(var o=-1,i=(e=te(e,t)).length,a=i-1,u=t;null!=u&&++o<i;){var c=ie(e[o]),l=r;if(o!=a){var f=u[c];void 0===(l=n?n(f,c,u):void 0)&&(l=H(f)?f:ne(e[o+1])?[]:{})}it(u,c,l),u=u[c]}return t};var ue=function(t,e,r){return null==t?t:ae(t,e,r)};var ce=function(t,e){for(var r=-1,n=null==t?0:t.length;++r<n&&!1!==e(t[r],r,t););return t};var le=function(t){return function(e,r,n){for(var o=-1,i=Object(e),a=n(e),u=a.length;u--;){var c=a[t?u:++o];if(!1===r(i[c],c,i))break}return e}}();var fe=function(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n},se="[object Arguments]";var pe=function(t){return ut(t)&&E(t)==se},ve=Object.prototype,he=ve.hasOwnProperty,de=ve.propertyIsEnumerable,be=pe(function(){return arguments}())?pe:function(t){return ut(t)&&he.call(t,"callee")&&!de.call(t,"callee")};var ge=function(){return!1},ye=j(function(t,e){var r=e&&!e.nodeType&&e,n=r&&t&&!t.nodeType&&t,o=n&&n.exports===r?O.Buffer:void 0;t.exports=(o?o.isBuffer:void 0)||ge}),me=9007199254740991;var je=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=me},_e={};_e["[object Float32Array]"]=_e["[object Float64Array]"]=_e["[object Int8Array]"]=_e["[object Int16Array]"]=_e["[object Int32Array]"]=_e["[object Uint8Array]"]=_e["[object Uint8ClampedArray]"]=_e["[object Uint16Array]"]=_e["[object Uint32Array]"]=!0,_e["[object Arguments]"]=_e["[object Array]"]=_e["[object ArrayBuffer]"]=_e["[object Boolean]"]=_e["[object DataView]"]=_e["[object Date]"]=_e["[object Error]"]=_e["[object Function]"]=_e["[object Map]"]=_e["[object Number]"]=_e["[object Object]"]=_e["[object RegExp]"]=_e["[object Set]"]=_e["[object String]"]=_e["[object WeakMap]"]=!1;var we=function(t){return ut(t)&&je(t.length)&&!!_e[E(t)]};var Oe=function(t){return function(e){return t(e)}},Se=j(function(t,e){var r=e&&!e.nodeType&&e,n=r&&t&&!t.nodeType&&t,o=n&&n.exports===r&&_.process,i=function(){try{var t=n&&n.require&&n.require("util").types;return t||o&&o.binding&&o.binding("util")}catch(t){}}();t.exports=i}),xe=Se&&Se.isTypedArray,ze=xe?Oe(xe):we,Fe=Object.prototype.hasOwnProperty;var ke=function(t,e){var r=at(t),n=!r&&be(t),o=!r&&!n&&ye(t),i=!r&&!n&&!o&&ze(t),a=r||n||o||i,u=a?fe(t.length,String):[],c=u.length;for(var l in t)!e&&!Fe.call(t,l)||a&&("length"==l||o&&("offset"==l||"parent"==l)||i&&("buffer"==l||"byteLength"==l||"byteOffset"==l)||ne(l,c))||u.push(l);return u},Ae=Object.prototype;var Le=function(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||Ae)};var Be=function(t,e){return function(r){return t(e(r))}},Pe=Be(Object.keys,Object),Te=Object.prototype.hasOwnProperty;var Me=function(t){if(!Le(t))return Pe(t);var e=[];for(var r in Object(t))Te.call(t,r)&&"constructor"!=r&&e.push(r);return e};var Ee=function(t){return null!=t&&je(t.length)&&!$(t)};var He=function(t){return Ee(t)?ke(t):Me(t)};var Ne=function(t,e){return function(r,n){if(null==r)return r;if(!Ee(r))return t(r,n);for(var o=r.length,i=e?o:-1,a=Object(r);(e?i--:++i<o)&&!1!==n(a[i],i,a););return r}}(function(t,e){return t&&le(t,e,He)});var We=function(t){return t};var Ce=function(t){return"function"==typeof t?t:We};var Ie=function(t,e){return(at(t)?ce:Ne)(t,Ce(e))},Re="[object Number]";var $e=function(t){return"number"==typeof t||ut(t)&&E(t)==Re},Ue="[object String]";var De=function(t){return"string"==typeof t||!at(t)&&ut(t)&&E(t)==Ue};var qe=function(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r};var Ve=function(t){return this.__data__.get(t)};var Je=function(t){return this.__data__.has(t)},Ze=200;var Ge=function(t,e){var r=this.__data__;if(r instanceof Bt){var n=r.__data__;if(!Pt||n.length<Ze-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new It(n)}return r.set(t,e),this.size=r.size,this};function Ke(t){var e=this.__data__=new Bt(t);this.size=e.size}Ke.prototype.clear=function(){this.__data__=new Bt,this.size=0},Ke.prototype.delete=qe,Ke.prototype.get=Ve,Ke.prototype.has=Je,Ke.prototype.set=Ge;var Ye=Ke;var Qe=function(t,e,r){(void 0===r||nt(t[e],r))&&(void 0!==r||e in t)||rt(t,e,r)},Xe=j(function(t,e){var r=e&&!e.nodeType&&e,n=r&&t&&!t.nodeType&&t,o=n&&n.exports===r?O.Buffer:void 0,i=o?o.allocUnsafe:void 0;t.exports=function(t,e){if(e)return t.slice();var r=t.length,n=i?i(r):new t.constructor(r);return t.copy(n),n}}),tr=O.Uint8Array;var er=function(t){var e=new t.constructor(t.byteLength);return new tr(e).set(new tr(t)),e};var rr=function(t,e){var r=e?er(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)};var nr=function(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e},or=Object.create,ir=function(){function t(){}return function(e){if(!H(e))return{};if(or)return or(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}(),ar=Be(Object.getPrototypeOf,Object);var ur=function(t){return"function"!=typeof t.constructor||Le(t)?{}:ir(ar(t))};var cr=function(t){return ut(t)&&Ee(t)},lr="[object Object]",fr=Function.prototype,sr=Object.prototype,pr=fr.toString,vr=sr.hasOwnProperty,hr=pr.call(Object);var dr=function(t){if(!ut(t)||E(t)!=lr)return!1;var e=ar(t);if(null===e)return!0;var r=vr.call(e,"constructor")&&e.constructor;return"function"==typeof r&&r instanceof r&&pr.call(r)==hr};var br=function(t,e){return"__proto__"==e?void 0:t[e]};var gr=function(t,e,r,n){var o=!r;r||(r={});for(var i=-1,a=e.length;++i<a;){var u=e[i],c=n?n(r[u],t[u],u,r,t):void 0;void 0===c&&(c=t[u]),o?rt(r,u,c):it(r,u,c)}return r};var yr=function(t){var e=[];if(null!=t)for(var r in Object(t))e.push(r);return e},mr=Object.prototype.hasOwnProperty;var jr=function(t){if(!H(t))return yr(t);var e=Le(t),r=[];for(var n in t)("constructor"!=n||!e&&mr.call(t,n))&&r.push(n);return r};var _r=function(t){return Ee(t)?ke(t,!0):jr(t)};var wr=function(t){return gr(t,_r(t))};var Or=function(t,e,r,n,o,i,a){var u=br(t,r),c=br(e,r),l=a.get(c);if(l)Qe(t,r,l);else{var f=i?i(u,c,r+"",t,e,a):void 0,s=void 0===f;if(s){var p=at(c),v=!p&&ye(c),h=!p&&!v&&ze(c);f=c,p||v||h?at(u)?f=u:cr(u)?f=nr(u):v?(s=!1,f=Xe(c,!0)):h?(s=!1,f=rr(c,!0)):f=[]:dr(c)||be(c)?(f=u,be(u)?f=wr(u):(!H(u)||n&&$(u))&&(f=ur(c))):s=!1}s&&(a.set(c,f),o(f,c,n,i,a),a.delete(c)),Qe(t,r,f)}};var Sr=function t(e,r,n,o,i){e!==r&&le(r,function(a,u){if(H(a))i||(i=new Ye),Or(e,r,u,n,t,o,i);else{var c=o?o(br(e,u),a,u+"",e,r,i):void 0;void 0===c&&(c=a),Qe(e,u,c)}},_r)};var xr=function(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)},zr=Math.max;var Fr=function(t,e,r){return e=zr(void 0===e?t.length-1:e,0),function(){for(var n=arguments,o=-1,i=zr(n.length-e,0),a=Array(i);++o<i;)a[o]=n[e+o];o=-1;for(var u=Array(e+1);++o<e;)u[o]=n[o];return u[e]=r(a),xr(t,this,u)}};var kr=function(t){return function(){return t}},Ar=800,Lr=16,Br=Date.now;var Pr=function(t){var e=0,r=0;return function(){var n=Br(),o=Lr-(n-r);if(r=n,o>0){if(++e>=Ar)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}(et?function(t,e){return et(t,"toString",{configurable:!0,enumerable:!1,value:kr(e),writable:!0})}:We);var Tr=function(t,e){return Pr(Fr(t,e,We),t+"")};var Mr=function(t,e,r){if(!H(r))return!1;var n=typeof e;return!!("number"==n?Ee(r)&&ne(e,r.length):"string"==n&&e in r)&&nt(r[e],t)};var Er=function(t){return Tr(function(e,r){var n=-1,o=r.length,i=o>1?r[o-1]:void 0,a=o>2?r[2]:void 0;for(i=t.length>3&&"function"==typeof i?(o--,i):void 0,a&&Mr(r[0],r[1],a)&&(i=o<3?void 0:i,o=1),e=Object(e);++n<o;){var u=r[n];u&&t(e,u,n,i)}return e})}(function(t,e,r){Sr(t,e,r)});var Hr=function(t,e,r,n){var o=-1,i=null==t?0:t.length;for(n&&i&&(r=t[++o]);++o<i;)r=e(r,t[o],o,t);return r},Nr="__lodash_hash_undefined__";var Wr=function(t){return this.__data__.has(t)};function Cr(t){var e=-1,r=null==t?0:t.length;for(this.__data__=new It;++e<r;)this.add(t[e])}Cr.prototype.add=Cr.prototype.push=function(t){return this.__data__.set(t,Nr),this},Cr.prototype.has=Wr;var Ir=Cr;var Rr=function(t,e){for(var r=-1,n=null==t?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1};var $r=function(t,e){return t.has(e)},Ur=1,Dr=2;var qr=function(t,e,r,n,o,i){var a=r&Ur,u=t.length,c=e.length;if(u!=c&&!(a&&c>u))return!1;var l=i.get(t);if(l&&i.get(e))return l==e;var f=-1,s=!0,p=r&Dr?new Ir:void 0;for(i.set(t,e),i.set(e,t);++f<u;){var v=t[f],h=e[f];if(n)var d=a?n(h,v,f,e,t,i):n(v,h,f,t,e,i);if(void 0!==d){if(d)continue;s=!1;break}if(p){if(!Rr(e,function(t,e){if(!$r(p,e)&&(v===t||o(v,t,r,n,i)))return p.push(e)})){s=!1;break}}else if(v!==h&&!o(v,h,r,n,i)){s=!1;break}}return i.delete(t),i.delete(e),s};var Vr=function(t){var e=-1,r=Array(t.size);return t.forEach(function(t,n){r[++e]=[n,t]}),r};var Jr=function(t){var e=-1,r=Array(t.size);return t.forEach(function(t){r[++e]=t}),r},Zr=1,Gr=2,Kr="[object Boolean]",Yr="[object Date]",Qr="[object Error]",Xr="[object Map]",tn="[object Number]",en="[object RegExp]",rn="[object Set]",nn="[object String]",on="[object Symbol]",an="[object ArrayBuffer]",un="[object DataView]",cn=S?S.prototype:void 0,ln=cn?cn.valueOf:void 0;var fn=function(t,e,r,n,o,i,a){switch(r){case un:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case an:return!(t.byteLength!=e.byteLength||!i(new tr(t),new tr(e)));case Kr:case Yr:case tn:return nt(+t,+e);case Qr:return t.name==e.name&&t.message==e.message;case en:case nn:return t==e+"";case Xr:var u=Vr;case rn:if(u||(u=Jr),t.size!=e.size&&!(n&Zr))return!1;var c=a.get(t);if(c)return c==e;n|=Gr,a.set(t,e);var l=qr(u(t),u(e),n,o,i,a);return a.delete(t),l;case on:if(ln)return ln.call(t)==ln.call(e)}return!1};var sn=function(t,e){for(var r=-1,n=e.length,o=t.length;++r<n;)t[o+r]=e[r];return t};var pn=function(t,e,r){var n=e(t);return at(t)?n:sn(n,r(t))};var vn=function(t,e){for(var r=-1,n=null==t?0:t.length,o=0,i=[];++r<n;){var a=t[r];e(a,r,t)&&(i[o++]=a)}return i};var hn=Object.prototype.propertyIsEnumerable,dn=Object.getOwnPropertySymbols,bn=dn?function(t){return null==t?[]:(t=Object(t),vn(dn(t),function(e){return hn.call(t,e)}))}:function(){return[]};var gn=function(t){return pn(t,He,bn)},yn=1,mn=Object.prototype.hasOwnProperty;var jn=function(t,e,r,n,o,i){var a=r&yn,u=gn(t),c=u.length;if(c!=gn(e).length&&!a)return!1;for(var l=c;l--;){var f=u[l];if(!(a?f in e:mn.call(e,f)))return!1}var s=i.get(t);if(s&&i.get(e))return s==e;var p=!0;i.set(t,e),i.set(e,t);for(var v=a;++l<c;){var h=t[f=u[l]],d=e[f];if(n)var b=a?n(d,h,f,e,t,i):n(h,d,f,t,e,i);if(!(void 0===b?h===d||o(h,d,r,n,i):b)){p=!1;break}v||(v="constructor"==f)}if(p&&!v){var g=t.constructor,y=e.constructor;g!=y&&"constructor"in t&&"constructor"in e&&!("function"==typeof g&&g instanceof g&&"function"==typeof y&&y instanceof y)&&(p=!1)}return i.delete(t),i.delete(e),p},_n=tt(O,"DataView"),wn=tt(O,"Promise"),On=tt(O,"Set"),Sn=tt(O,"WeakMap"),xn=J(_n),zn=J(Pt),Fn=J(wn),kn=J(On),An=J(Sn),Ln=E;(_n&&"[object DataView]"!=Ln(new _n(new ArrayBuffer(1)))||Pt&&"[object Map]"!=Ln(new Pt)||wn&&"[object Promise]"!=Ln(wn.resolve())||On&&"[object Set]"!=Ln(new On)||Sn&&"[object WeakMap]"!=Ln(new Sn))&&(Ln=function(t){var e=E(t),r="[object Object]"==e?t.constructor:void 0,n=r?J(r):"";if(n)switch(n){case xn:return"[object DataView]";case zn:return"[object Map]";case Fn:return"[object Promise]";case kn:return"[object Set]";case An:return"[object WeakMap]"}return e});var Bn=Ln,Pn=1,Tn="[object Arguments]",Mn="[object Array]",En="[object Object]",Hn=Object.prototype.hasOwnProperty;var Nn=function(t,e,r,n,o,i){var a=at(t),u=at(e),c=a?Mn:Bn(t),l=u?Mn:Bn(e),f=(c=c==Tn?En:c)==En,s=(l=l==Tn?En:l)==En,p=c==l;if(p&&ye(t)){if(!ye(e))return!1;a=!0,f=!1}if(p&&!f)return i||(i=new Ye),a||ze(t)?qr(t,e,r,n,o,i):fn(t,e,c,r,n,o,i);if(!(r&Pn)){var v=f&&Hn.call(t,"__wrapped__"),h=s&&Hn.call(e,"__wrapped__");if(v||h){var d=v?t.value():t,b=h?e.value():e;return i||(i=new Ye),o(d,b,r,n,i)}}return!!p&&(i||(i=new Ye),jn(t,e,r,n,o,i))};var Wn=function t(e,r,n,o,i){return e===r||(null==e||null==r||!ut(e)&&!ut(r)?e!=e&&r!=r:Nn(e,r,n,o,t,i))},Cn=1,In=2;var Rn=function(t,e,r,n){var o=r.length,i=o,a=!n;if(null==t)return!i;for(t=Object(t);o--;){var u=r[o];if(a&&u[2]?u[1]!==t[u[0]]:!(u[0]in t))return!1}for(;++o<i;){var c=(u=r[o])[0],l=t[c],f=u[1];if(a&&u[2]){if(void 0===l&&!(c in t))return!1}else{var s=new Ye;if(n)var p=n(l,f,c,t,e,s);if(!(void 0===p?Wn(f,l,Cn|In,n,s):p))return!1}}return!0};var $n=function(t){return t==t&&!H(t)};var Un=function(t){for(var e=He(t),r=e.length;r--;){var n=e[r],o=t[n];e[r]=[n,o,$n(o)]}return e};var Dn=function(t,e){return function(r){return null!=r&&r[t]===e&&(void 0!==e||t in Object(r))}};var qn=function(t){var e=Un(t);return 1==e.length&&e[0][2]?Dn(e[0][0],e[0][1]):function(r){return r===t||Rn(r,t,e)}};var Vn=function(t,e){for(var r=0,n=(e=te(e,t)).length;null!=t&&r<n;)t=t[ie(e[r++])];return r&&r==n?t:void 0};var Jn=function(t,e,r){var n=null==t?void 0:Vn(t,e);return void 0===n?r:n};var Zn=function(t,e){return null!=t&&e in Object(t)};var Gn=function(t,e,r){for(var n=-1,o=(e=te(e,t)).length,i=!1;++n<o;){var a=ie(e[n]);if(!(i=null!=t&&r(t,a)))break;t=t[a]}return i||++n!=o?i:!!(o=null==t?0:t.length)&&je(o)&&ne(a,o)&&(at(t)||be(t))};var Kn=function(t,e){return null!=t&&Gn(t,e,Zn)},Yn=1,Qn=2;var Xn=function(t,e){return pt(t)&&$n(e)?Dn(ie(t),e):function(r){var n=Jn(r,t);return void 0===n&&n===e?Kn(r,t):Wn(e,n,Yn|Qn)}};var to=function(t){return function(e){return null==e?void 0:e[t]}};var eo=function(t){return function(e){return Vn(e,t)}};var ro=function(t){return pt(t)?to(ie(t)):eo(t)};var no=function(t){return"function"==typeof t?t:null==t?We:"object"==typeof t?at(t)?Xn(t[0],t[1]):qn(t):ro(t)};var oo=function(t,e,r,n,o){return o(t,function(t,o,i){r=n?(n=!1,t):e(r,t,o,i)}),r};var io=function(t,e,r){var n=at(t)?Hr:oo,o=arguments.length<3;return n(t,no(e,4),r,o,Ne)},ao=function(t,e,r){var n;return void 0===t&&(t={}),n=at(e)?e:[e],Ie(n,function(e){Ie(r,function(r,n){ue(t,e+"."+n,r)})}),t},uo=["inherit","default","serif","sans-serif","monospace","fantasy","cursive","-apple-system"],co=function(t){return-1!==uo.indexOf(t)?t:"'"+t+"'"};var lo,fo=j(function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default="html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block}audio:not([controls]){display:none;height:0}progress{vertical-align:baseline}[hidden],template{display:none}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit;font-weight:bolder}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}svg:not(:root){overflow:hidden}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}button,input,optgroup,select,textarea{font:inherit;margin:0}optgroup{font-weight:700}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-input-placeholder{color:inherit;opacity:.54}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}"}),so=(lo=fo)&&lo.__esModule&&Object.prototype.hasOwnProperty.call(lo,"default")?lo.default:lo,po=function(t){return io(t,function(t,e,r){return t+=r+"{",Ie(e,function(e,r){if(H(e)){var n={};n[r]=e,t+=po(n)}else{var o=function(t,e){if("string"!=typeof t)throw new TypeError("Expected a string");return t.replace(/([a-z\d])([A-Z])/g,"$1"+(e=void 0===e?"_":e)+"$2").replace(/([A-Z]+)([A-Z][a-z\d]+)/g,"$1"+e+"$2").toLowerCase()}(r,"-")+":"+e+";";["Webkit","ms","Moz","O"].forEach(function(t){r.slice(0,t.length)===t&&(o="-"+o)}),t+=o}}),t+="}"},"")};module.exports=function(t){var e,r,a,u,l=i({},{baseFontSize:"16px",baseLineHeight:1.45,headerLineHeight:1.1,scaleRatio:2,googleFonts:[],headerFontFamily:["-apple-system","BlinkMacSystemFont","Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue","sans-serif"],bodyFontFamily:["georgia","serif"],headerColor:"inherit",bodyColor:"hsla(0,0%,0%,0.8)",headerWeight:"bold",bodyWeight:"normal",boldWeight:"bold",includeNormalize:!0,blockMarginBottom:1},t),d=(e=l,r=JSON.parse(JSON.stringify(p)),a=Object.assign({},r,e),u=c(a.baseFontSize),f(a.baseLineHeight)?(s(u(a.baseFontSize,"px")),a.baseLineHeightInPx=u(a.baseLineHeight,"px")):a.baseLineHeightInPx=s(a.baseFontSize)*a.baseLineHeight+"px",{rhythm:h(a),establishBaseline:function(){return c((t=a).baseFontSize),{fontSize:s(t.baseFontSize)/16*100+"%",lineHeight:t.baseLineHeight.toString()};var t},linesForFontSize:function(t){return v(t,a)},adjustFontSizeTo:function(t,e,r){return null==e&&(e="auto"),function(t,e,r,n){null==r&&(r=n.baseFontSize),"%"===f(t)&&(t=s(n.baseFontSize)*(s(t)/100)+"px");var o=c(n.baseFontSize);t=o(t,"px",r=o(r,"px"));var i=h(n);return"auto"===e&&(e=v(t,n)),{fontSize:o(t,n.rhythmUnit,r),lineHeight:i(e,r)}}(t,e,r,a)}});return d.scale=function(t){var e=parseInt(l.baseFontSize,10),r=function(t,e){var r;return null==t&&(t=0),null==e&&(e="golden"),r=n(e)?e:null!=o[e]?o[e]:o.golden,Math.pow(r,t)}(t,l.scaleRatio)*e+"px";return d.adjustFontSizeTo(r)},Object.assign({},{options:l},d,{createStyles:function(){return this.toString()},toJSON:function(){return function(t,e){var r={},n=t.establishBaseline();r=ao(r,"html",{font:n.fontSize+"/"+n.lineHeight+" "+e.bodyFontFamily.map(co).join(","),boxSizing:"border-box",overflowY:"scroll"}),r=ao(r,["*","*:before","*:after"],{boxSizing:"inherit"}),r=ao(r,"body",{color:e.bodyColor,fontFamily:e.bodyFontFamily.map(co).join(","),fontWeight:e.bodyWeight,wordWrap:"break-word",fontKerning:"normal",MozFontFeatureSettings:'"kern", "liga", "clig", "calt"',msFontFeatureSettings:'"kern", "liga", "clig", "calt"',WebkitFontFeatureSettings:'"kern", "liga", "clig", "calt"',fontFeatureSettings:'"kern", "liga", "clig", "calt"'}),r=ao(r,"img",{maxWidth:"100%"});var o="";o=$e(e.blockMarginBottom)?t.rhythm(e.blockMarginBottom):De(e.blockMarginBottom)?e.blockMarginBottom:t.rhythm(1),r=ao(r,["h1","h2","h3","h4","h5","h6","hgroup","ul","ol","dl","dd","p","figure","pre","table","fieldset","blockquote","form","noscript","iframe","img","hr","address"],{marginLeft:0,marginRight:0,marginTop:0,paddingBottom:0,paddingLeft:0,paddingRight:0,paddingTop:0,marginBottom:o}),r=ao(r,"blockquote",{marginRight:t.rhythm(1),marginBottom:o,marginLeft:t.rhythm(1)}),r=ao(r,["b","strong","dt","th"],{fontWeight:e.boldWeight}),r=ao(r,"hr",{background:y(80),border:"none",height:"1px",marginBottom:"calc("+o+" - 1px)"}),r=ao(r,["ol","ul"],{listStylePosition:"outside",listStyleImage:"none",marginLeft:t.rhythm(1)}),r=ao(r,"li",{marginBottom:"calc("+o+" / 2)"}),r=ao(r,["ol li","ul li"],{paddingLeft:0}),r=ao(r,["li > ol","li > ul"],{marginLeft:t.rhythm(1),marginBottom:"calc("+o+" / 2)",marginTop:"calc("+o+" / 2)"}),r=ao(r,["blockquote *:last-child","li *:last-child","p *:last-child"],{marginBottom:0}),r=ao(r,["li > p"],{marginBottom:"calc("+o+" / 2)"}),r=ao(r,["code","kbd","pre","samp"],Object.assign({},t.adjustFontSizeTo("85%"))),(r=ao(r,["abbr","acronym"],{borderBottom:"1px dotted "+y(50),cursor:"help"}))["abbr[title]"]={borderBottom:"1px dotted "+y(50),cursor:"help",textDecoration:"none"},r=ao(r,["table"],Object.assign({},t.adjustFontSizeTo(e.baseFontSize),{borderCollapse:"collapse",width:"100%"})),r=ao(r,["thead"],{textAlign:"left"}),r=ao(r,["td,th"],{textAlign:"left",borderBottom:"1px solid "+y(88),fontFeatureSettings:'"tnum"',MozFontFeatureSettings:'"tnum"',msFontFeatureSettings:'"tnum"',WebkitFontFeatureSettings:'"tnum"',paddingLeft:t.rhythm(2/3),paddingRight:t.rhythm(2/3),paddingTop:t.rhythm(.5),paddingBottom:"calc("+t.rhythm(.5)+" - 1px)"}),r=ao(r,"th:first-child,td:first-child",{paddingLeft:0}),r=ao(r,"th:last-child,td:last-child",{paddingRight:0}),r=ao(r,["h1","h2","h3","h4","h5","h6"],{color:e.headerColor,fontFamily:e.headerFontFamily.map(co).join(","),fontWeight:e.headerWeight,textRendering:"optimizeLegibility"});var i=t.scale(1),a=t.scale(.6),u=t.scale(.4),c=t.scale(0),l=t.scale(-.2),f=t.scale(-.3);return Ie([i,a,u,c,l,f],function(t,n){r=ue(r,"h"+(n+1)+".fontSize",t.fontSize),r=ue(r,"h"+(n+1)+".lineHeight",e.headerLineHeight)}),at(e.plugins)&&(r=io(e.plugins,function(r,n){return Er(r,n(t,e,r))},r)),e.overrideStyles&&$(e.overrideStyles)&&(r=Er(r,e.overrideStyles(t,e,r))),e.overrideThemeStyles&&$(e.overrideThemeStyles)&&(r=Er(r,e.overrideThemeStyles(t,e,r))),r}(d,l)},toString:function(){return function(t,e,r){var n=po(r);return e.includeNormalize&&(n=""+so+n),n}(0,l,this.toJSON())},injectStyles:function(){if("undefined"!=typeof document)if(document.getElementById("typography.js"))document.getElementById("typography.js").innerHTML=this.toString();else{var t=document.createElement("style");t.id="typography.js",t.innerHTML=this.toString();var e=document.head;e.firstChild?e.insertBefore(t,e.firstChild):e.appendChild(t)}}})};
//# sourceMappingURL=index.js.map


/***/ }),

/***/ "../../node_modules/workerize-loader/dist/rpc-wrapper.js":
/*!*********************************************************************!*\
  !*** /z/monorepo/node_modules/workerize-loader/dist/rpc-wrapper.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function addMethods(worker, methods) {
  var c = 0;
  var callbacks = {};
  worker.addEventListener('message', function (e) {
    var d = e.data;
    if (d.type !== 'RPC') return;

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
      var evt = document.createEvent('Event');
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
          type: 'RPC',
          id: id,
          method: method,
          params: [].slice.call(_arguments)
        });
      });
    };
  });
}

module.exports = addMethods;
//# sourceMappingURL=rpc-wrapper.js.map


/***/ }),

/***/ "../emotion-cache/dist/emotion-cache.modern.js":
/*!*****************************************************!*\
  !*** ../emotion-cache/dist/emotion-cache.modern.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _zedvision_emotion_sheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zedvision/emotion-sheet */ "../emotion-sheet/dist/emotion-sheet.modern.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! stylis */ "../../node_modules/stylis/dist/stylis.mjs");
/* harmony import */ var _zedvision_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zedvision/emotion-weak-memoize */ "../emotion-weak-memoize/dist/emotion-weak-memoize.modern.js");
/* harmony import */ var _zedvision_emotion_memoize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zedvision/emotion-memoize */ "../emotion-memoize/dist/emotion-memoize.modern.js");
const E=new WeakMap();let w=e=>{if("rule"!==e.type||!e.parent||!e.length)return;let{value:u,parent:p}=e,d=e.column===p.column&&e.line===p.line;for(;"rule"!==p.type;)if(p=p.parent,!p)return;if(1===e.props.length&&58!==u.charCodeAt(0)&&!E.get(p))return;if(d)return;E.set(e,!0);const h=[],m=((e,u)=>Object(stylis__WEBPACK_IMPORTED_MODULE_1__["dealloc"])(((e,t)=>{let r=-1,u=44;do{switch(Object(stylis__WEBPACK_IMPORTED_MODULE_1__["token"])(u)){case 0:38===u&&12===Object(stylis__WEBPACK_IMPORTED_MODULE_1__["peek"])()&&(t[r]=1),e[r]+=Object(stylis__WEBPACK_IMPORTED_MODULE_1__["identifier"])(stylis__WEBPACK_IMPORTED_MODULE_1__["position"]-1);break;case 2:e[r]+=Object(stylis__WEBPACK_IMPORTED_MODULE_1__["delimit"])(u);break;case 4:if(44===u){e[++r]=58===Object(stylis__WEBPACK_IMPORTED_MODULE_1__["peek"])()?"&\f":"",t[r]=e[r].length;break;}default:e[r]+=Object(stylis__WEBPACK_IMPORTED_MODULE_1__["from"])(u);}}while(u=Object(stylis__WEBPACK_IMPORTED_MODULE_1__["next"])());return e;})(Object(stylis__WEBPACK_IMPORTED_MODULE_1__["alloc"])(e),u)))(u,h),f=p.props;for(let t=0,r=0;t<m.length;t++)for(let o=0;o<f.length;o++,r++)e.props[r]=h[t]?m[t].replace(/&\f/g,f[o]):`${f[o]} ${m[t]}`;},b=e=>{if("decl"===e.type){var t=e.value;108===t.charCodeAt(0)&&98===t.charCodeAt(2)&&(e.return="",e.value="");}},k=e=>105===e.type.charCodeAt(1)&&64===e.type.charCodeAt(0);const N=e=>{e.type="",e.value="",e.return="",e.children="",e.props="";};let A=(e,t,r)=>{k(e)&&(e.parent?(console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."),N(e)):((e,t)=>{for(let r=e-1;r>=0;r--)if(!k(t[r]))return!0;return!1;})(t,r)&&(console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."),N(e)));},$="undefined"!=typeof document,O=$?void 0:Object(_zedvision_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_2__["default"])(()=>Object(_zedvision_emotion_memoize__WEBPACK_IMPORTED_MODULE_3__["default"])(()=>{let e={};return t=>e[t];}));const z=[stylis__WEBPACK_IMPORTED_MODULE_1__["prefixer"]];/* harmony default export */ __webpack_exports__["default"] = (t=>{let r=t.key;if(false){}if($&&"css"===r){const e=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(e,e=>{document.head.appendChild(e),e.setAttribute("data-s","");});}const o=t.stylisPlugins||z;if(false){}let n,s={};const i=[];let l;$&&(n=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll("style[data-emotion]"),e=>{const t=e.getAttribute("data-emotion").split(" ");if(t[0]===r){for(let e=1;e<t.length;e++)s[t[e]]=!0;i.push(e);}}));const a=[w,b];if( false&&false,$){let e;const t=[stylis__WEBPACK_IMPORTED_MODULE_1__["stringify"], false?undefined:Object(stylis__WEBPACK_IMPORTED_MODULE_1__["rulesheet"])(t=>{e.insert(t);})],r=Object(stylis__WEBPACK_IMPORTED_MODULE_1__["middleware"])(a.concat(o,t)),n=e=>Object(stylis__WEBPACK_IMPORTED_MODULE_1__["serialize"])(Object(stylis__WEBPACK_IMPORTED_MODULE_1__["compile"])(e),r);l=(t,r,o,s)=>{e=o, false&&(false),n(t?`${t}{${r.styles}}`:r.styles),s&&(c.inserted[r.name]=!0);};}else{const e=Object(stylis__WEBPACK_IMPORTED_MODULE_1__["middleware"])(a.concat(o,[stylis__WEBPACK_IMPORTED_MODULE_1__["stringify"]])),t=t=>Object(stylis__WEBPACK_IMPORTED_MODULE_1__["serialize"])(Object(stylis__WEBPACK_IMPORTED_MODULE_1__["compile"])(t),e);let n=O(o)(r),s=(e,r)=>{let o=r.name;return void 0===n[o]&&(n[o]=t(e?`${e}{${r.styles}}`:r.styles)),n[o];};l=(e,t,r,o)=>{let n=t.name,i=s(e,t);return void 0===c.compat?(o&&(c.inserted[n]=!0), false?undefined:i):o?void(c.inserted[n]=i):i;};}const c={key:r,sheet:new _zedvision_emotion_sheet__WEBPACK_IMPORTED_MODULE_0__["StyleSheet"]({key:r,container:n,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend}),nonce:t.nonce,inserted:s,registered:{},insert:l};return c.sheet.hydrate(i),c;});

/***/ }),

/***/ "../emotion-hash/dist/emotion-hash.modern.js":
/*!***************************************************!*\
  !*** ../emotion-hash/dist/emotion-hash.modern.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function t(t){for(var e,r=0,a=0,c=t.length;c>=4;++a,c-=4)e=1540483477*(65535&(e=255&t.charCodeAt(a)|(255&t.charCodeAt(++a))<<8|(255&t.charCodeAt(++a))<<16|(255&t.charCodeAt(++a))<<24))+(59797*(e>>>16)<<16),r=1540483477*(65535&(e^=e>>>24))+(59797*(e>>>16)<<16)^1540483477*(65535&r)+(59797*(r>>>16)<<16);switch(c){case 3:r^=(255&t.charCodeAt(a+2))<<16;case 2:r^=(255&t.charCodeAt(a+1))<<8;case 1:r=1540483477*(65535&(r^=255&t.charCodeAt(a)))+(59797*(r>>>16)<<16);}return(((r=1540483477*(65535&(r^=r>>>13))+(59797*(r>>>16)<<16))^r>>>15)>>>0).toString(36);}/* harmony default export */ __webpack_exports__["default"] = (t);

/***/ }),

/***/ "../emotion-is-prop-valid/dist/emotion-is-prop-valid.modern.js":
/*!*********************************************************************!*\
  !*** ../emotion-is-prop-valid/dist/emotion-is-prop-valid.modern.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _zedvision_emotion_memoize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zedvision/emotion-memoize */ "../emotion-memoize/dist/emotion-memoize.modern.js");
var t="/^(("+Object.keys({children:!0,dangerouslySetInnerHTML:!0,key:!0,ref:!0,autoFocus:!0,defaultValue:!0,defaultChecked:!0,innerHTML:!0,suppressContentEditableWarning:!0,suppressHydrationWarning:!0,valueLink:!0,accept:!0,acceptCharset:!0,accessKey:!0,action:!0,allow:!0,allowUserMedia:!0,allowPaymentRequest:!0,allowFullScreen:!0,allowTransparency:!0,alt:!0,async:!0,autoComplete:!0,autoPlay:!0,capture:!0,cellPadding:!0,cellSpacing:!0,challenge:!0,charSet:!0,checked:!0,cite:!0,classID:!0,className:!0,cols:!0,colSpan:!0,content:!0,contentEditable:!0,contextMenu:!0,controls:!0,controlsList:!0,coords:!0,crossOrigin:!0,data:!0,dateTime:!0,decoding:!0,default:!0,defer:!0,dir:!0,disabled:!0,disablePictureInPicture:!0,download:!0,draggable:!0,encType:!0,form:!0,formAction:!0,formEncType:!0,formMethod:!0,formNoValidate:!0,formTarget:!0,frameBorder:!0,headers:!0,height:!0,hidden:!0,high:!0,href:!0,hrefLang:!0,htmlFor:!0,httpEquiv:!0,id:!0,inputMode:!0,integrity:!0,is:!0,keyParams:!0,keyType:!0,kind:!0,label:!0,lang:!0,list:!0,loading:!0,loop:!0,low:!0,marginHeight:!0,marginWidth:!0,max:!0,maxLength:!0,media:!0,mediaGroup:!0,method:!0,min:!0,minLength:!0,multiple:!0,muted:!0,name:!0,nonce:!0,noValidate:!0,open:!0,optimum:!0,pattern:!0,placeholder:!0,playsInline:!0,poster:!0,preload:!0,profile:!0,radioGroup:!0,readOnly:!0,referrerPolicy:!0,rel:!0,required:!0,reversed:!0,role:!0,rows:!0,rowSpan:!0,sandbox:!0,scope:!0,scoped:!0,scrolling:!0,seamless:!0,selected:!0,shape:!0,size:!0,sizes:!0,slot:!0,span:!0,spellCheck:!0,src:!0,srcDoc:!0,srcLang:!0,srcSet:!0,start:!0,step:!0,style:!0,summary:!0,tabIndex:!0,target:!0,title:!0,translate:!0,type:!0,useMap:!0,value:!0,width:!0,wmode:!0,wrap:!0,about:!0,datatype:!0,inlist:!0,prefix:!0,property:!0,resource:!0,typeof:!0,vocab:!0,autoCapitalize:!0,autoCorrect:!0,autoSave:!0,color:!0,inert:!0,itemProp:!0,itemScope:!0,itemType:!0,itemID:!0,itemRef:!0,on:!0,results:!0,security:!0,unselectable:!0,accentHeight:!0,accumulate:!0,additive:!0,alignmentBaseline:!0,allowReorder:!0,alphabetic:!0,amplitude:!0,arabicForm:!0,ascent:!0,attributeName:!0,attributeType:!0,autoReverse:!0,azimuth:!0,baseFrequency:!0,baselineShift:!0,baseProfile:!0,bbox:!0,begin:!0,bias:!0,by:!0,calcMode:!0,capHeight:!0,clip:!0,clipPathUnits:!0,clipPath:!0,clipRule:!0,colorInterpolation:!0,colorInterpolationFilters:!0,colorProfile:!0,colorRendering:!0,contentScriptType:!0,contentStyleType:!0,cursor:!0,cx:!0,cy:!0,d:!0,decelerate:!0,descent:!0,diffuseConstant:!0,direction:!0,display:!0,divisor:!0,dominantBaseline:!0,dur:!0,dx:!0,dy:!0,edgeMode:!0,elevation:!0,enableBackground:!0,end:!0,exponent:!0,externalResourcesRequired:!0,fill:!0,fillOpacity:!0,fillRule:!0,filter:!0,filterRes:!0,filterUnits:!0,floodColor:!0,floodOpacity:!0,focusable:!0,fontFamily:!0,fontSize:!0,fontSizeAdjust:!0,fontStretch:!0,fontStyle:!0,fontVariant:!0,fontWeight:!0,format:!0,from:!0,fr:!0,fx:!0,fy:!0,g1:!0,g2:!0,glyphName:!0,glyphOrientationHorizontal:!0,glyphOrientationVertical:!0,glyphRef:!0,gradientTransform:!0,gradientUnits:!0,hanging:!0,horizAdvX:!0,horizOriginX:!0,ideographic:!0,imageRendering:!0,in:!0,in2:!0,intercept:!0,k:!0,k1:!0,k2:!0,k3:!0,k4:!0,kernelMatrix:!0,kernelUnitLength:!0,kerning:!0,keyPoints:!0,keySplines:!0,keyTimes:!0,lengthAdjust:!0,letterSpacing:!0,lightingColor:!0,limitingConeAngle:!0,local:!0,markerEnd:!0,markerMid:!0,markerStart:!0,markerHeight:!0,markerUnits:!0,markerWidth:!0,mask:!0,maskContentUnits:!0,maskUnits:!0,mathematical:!0,mode:!0,numOctaves:!0,offset:!0,opacity:!0,operator:!0,order:!0,orient:!0,orientation:!0,origin:!0,overflow:!0,overlinePosition:!0,overlineThickness:!0,panose1:!0,paintOrder:!0,pathLength:!0,patternContentUnits:!0,patternTransform:!0,patternUnits:!0,pointerEvents:!0,points:!0,pointsAtX:!0,pointsAtY:!0,pointsAtZ:!0,preserveAlpha:!0,preserveAspectRatio:!0,primitiveUnits:!0,r:!0,radius:!0,refX:!0,refY:!0,renderingIntent:!0,repeatCount:!0,repeatDur:!0,requiredExtensions:!0,requiredFeatures:!0,restart:!0,result:!0,rotate:!0,rx:!0,ry:!0,scale:!0,seed:!0,shapeRendering:!0,slope:!0,spacing:!0,specularConstant:!0,specularExponent:!0,speed:!0,spreadMethod:!0,startOffset:!0,stdDeviation:!0,stemh:!0,stemv:!0,stitchTiles:!0,stopColor:!0,stopOpacity:!0,strikethroughPosition:!0,strikethroughThickness:!0,string:!0,stroke:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeLinecap:!0,strokeLinejoin:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0,surfaceScale:!0,systemLanguage:!0,tableValues:!0,targetX:!0,targetY:!0,textAnchor:!0,textDecoration:!0,textRendering:!0,textLength:!0,to:!0,transform:!0,u1:!0,u2:!0,underlinePosition:!0,underlineThickness:!0,unicode:!0,unicodeBidi:!0,unicodeRange:!0,unitsPerEm:!0,vAlphabetic:!0,vHanging:!0,vIdeographic:!0,vMathematical:!0,values:!0,vectorEffect:!0,version:!0,vertAdvY:!0,vertOriginX:!0,vertOriginY:!0,viewBox:!0,viewTarget:!0,visibility:!0,widths:!0,wordSpacing:!0,writingMode:!0,x:!0,xHeight:!0,x1:!0,x2:!0,xChannelSelector:!0,xlinkActuate:!0,xlinkArcrole:!0,xlinkHref:!0,xlinkRole:!0,xlinkShow:!0,xlinkTitle:!0,xlinkType:!0,xmlBase:!0,xmlns:!0,xmlnsXlink:!0,xmlLang:!0,xmlSpace:!0,y:!0,y1:!0,y2:!0,yChannelSelector:!0,z:!0,zoomAndPan:!0,for:!0,class:!0,autofocus:!0}).join("|")+")|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/",i=new RegExp(t),r=Object(_zedvision_emotion_memoize__WEBPACK_IMPORTED_MODULE_0__["default"])(function(e){return i.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)<91;});/* harmony default export */ __webpack_exports__["default"] = (r);

/***/ }),

/***/ "../emotion-memoize/dist/emotion-memoize.modern.js":
/*!*********************************************************!*\
  !*** ../emotion-memoize/dist/emotion-memoize.modern.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function t(t){const e=Object.create(null);return n=>(void 0===e[n]&&(e[n]=t(n)),e[n]);}/* harmony default export */ __webpack_exports__["default"] = (t);

/***/ }),

/***/ "../emotion-react/dist/emotion-react.modern.js":
/*!*****************************************************!*\
  !*** ../emotion-react/dist/emotion-react.modern.js ***!
  \*****************************************************/
/*! exports provided: CacheProvider, ClassNames, Global, ThemeContext, ThemeProvider, createElement, css, jsx, keyframes, useTheme, withEmotionCache, withTheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CacheProvider", function() { return y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClassNames", function() { return I; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Global", function() { return V; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeContext", function() { return N; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeProvider", function() { return b; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return T; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "css", function() { return j; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsx", function() { return T; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyframes", function() { return z; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useTheme", function() { return g; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withEmotionCache", function() { return E; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withTheme", function() { return w; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _zedvision_emotion_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zedvision/emotion-cache */ "../emotion-cache/dist/emotion-cache.modern.js");
/* harmony import */ var _zedvision_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zedvision/emotion-weak-memoize */ "../emotion-weak-memoize/dist/emotion-weak-memoize.modern.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! hoist-non-react-statics */ "../../node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _zedvision_emotion_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zedvision/emotion-utils */ "../emotion-utils/dist/emotion-utils.modern.js");
/* harmony import */ var _zedvision_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @zedvision/emotion-serialize */ "../emotion-serialize/dist/emotion-serialize.modern.js");
/* harmony import */ var _zedvision_emotion_sheet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @zedvision/emotion-sheet */ "../emotion-sheet/dist/emotion-sheet.modern.js");
var f="undefined"!=typeof document,p=Object.prototype.hasOwnProperty,v=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])("undefined"!=typeof HTMLElement?Object(_zedvision_emotion_cache__WEBPACK_IMPORTED_MODULE_1__["default"])({key:"css"}):null),y=v.Provider,E=function(r){return/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function(e,t){var o=Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(v);return r(e,o,t);});};function _(){return(_=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t]);}return e;}).apply(this,arguments);}f||(E=function(e){return function(r){var t=Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(v);return null===t?(t=Object(_zedvision_emotion_cache__WEBPACK_IMPORTED_MODULE_1__["default"])({key:"css"}),h(v.Provider,{value:t},e(r,t))):e(r,t);};});var N=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])({}),g=function(){return Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(N);},O=Object(_zedvision_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_2__["default"])(function(e){return Object(_zedvision_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_2__["default"])(function(n){return function(e,n){if("function"==typeof n){var r=n(e);if(false){}return r;}if(false){}return _({},e,n);}(e,n);});}),b=function(e){var r=Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(N);return e.theme!==r&&(r=O(r)(e.theme)),h(N.Provider,{value:r},e.children);};function w(r){var t=r.displayName||r.name||"Component",o=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function(e,t){var o=Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(N);return h(r,_({theme:o,ref:t},e));});return o.displayName="WithTheme("+t+")",hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_3___default()(o,r);}var k="__EMOTION_TYPE_PLEASE_DO_NOT_USE__",A="__EMOTION_LABEL_PLEASE_DO_NOT_USE__",D=function(e,n){if(false){}var r={};for(var t in n)p.call(n,t)&&(r[t]=n[t]);if(r[k]=e,"production"!=="production"){var o=new Error();if(o.stack){var s=o.stack.match(/at (?:Object\.|Module\.|)(?:jsx|createEmotionProps).*\n\s+at (?:Object\.|)([A-Z][A-Za-z0-9$]+) /);s||(s=o.stack.match(/.*\n([A-Z][A-Za-z0-9$]+)@/)),s&&(r[A]=s[1].replace(/\$/g,"-"));}}return r;},x=E(function(e,r,o){var s=e.css;"string"==typeof s&&void 0!==r.registered[s]&&(s=r.registered[s]);var a=e[k],i=[s],c="";"string"==typeof e.className?c=Object(_zedvision_emotion_utils__WEBPACK_IMPORTED_MODULE_4__["getRegisteredStyles"])(r.registered,i,e.className):null!=e.className&&(c=e.className+" ");var d=Object(_zedvision_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__["serializeStyles"])(i,void 0,"function"==typeof s||Array.isArray(s)?Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(N):void 0);if(false){ var v; }var y=Object(_zedvision_emotion_utils__WEBPACK_IMPORTED_MODULE_4__["insertStyles"])(r,d,"string"==typeof a);c+=r.key+"-"+d.name;var E={};for(var _ in e)!p.call(e,_)||"css"===_||_===k|| false&&false||(E[_]=e[_]);E.ref=o,E.className=c;var g=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(a,E);if(!f&&void 0!==y){for(var O,b=d.name,w=d.next;void 0!==w;)b+=" "+w.name,w=w.next;return h(Fragment,null,h("style",((O={})["data-emotion"]=r.key+" "+b,O.dangerouslySetInnerHTML={__html:y},O.nonce=r.sheet.nonce,O)),g);}return g;}); false&&(false);var T=function(e,n){var r=arguments;if(null==n||!p.call(n,"css"))return react__WEBPACK_IMPORTED_MODULE_0__["createElement"].apply(void 0,r);var o=r.length,s=new Array(o);s[0]=x,s[1]=D(e,n);for(var a=2;a<o;a++)s[a]=r[a];return react__WEBPACK_IMPORTED_MODULE_0__["createElement"].apply(null,s);},P=!1,V=E(function(e,r){ true||(false);var t=e.styles,a=Object(_zedvision_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__["serializeStyles"])([t],void 0,"function"==typeof t||Array.isArray(t)?Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(N):void 0);if(!f){for(var i,c=a.name,l=a.styles,p=a.next;void 0!==p;)c+=" "+p.name,l+=p.styles,p=p.next;var v=!0===r.compat,y=r.insert("",{name:c,styles:l},r.sheet,v);return v?null:h("style",((i={})["data-emotion"]=r.key+"-global "+c,i.dangerouslySetInnerHTML={__html:y},i.nonce=r.sheet.nonce,i));}var E=Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();return Object(react__WEBPACK_IMPORTED_MODULE_0__["useLayoutEffect"])(function(){var e=r.key+"-global",n=new _zedvision_emotion_sheet__WEBPACK_IMPORTED_MODULE_6__["StyleSheet"]({key:e,nonce:r.sheet.nonce,container:r.sheet.container,speedy:r.sheet.isSpeedy}),t=document.querySelector('style[data-emotion="'+e+" "+a.name+'"]');return r.sheet.tags.length&&(n.before=r.sheet.tags[0]),null!==t&&n.hydrate([t]),E.current=n,function(){n.flush();};},[r]),Object(react__WEBPACK_IMPORTED_MODULE_0__["useLayoutEffect"])(function(){void 0!==a.next&&Object(_zedvision_emotion_utils__WEBPACK_IMPORTED_MODULE_4__["insertStyles"])(r,a.next,!0);var e=E.current;e.tags.length&&(e.before=e.tags[e.tags.length-1].nextElementSibling,e.flush()),r.insert("",a,e,!1);},[r,a.name]),null;});function j(){return Object(_zedvision_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__["serializeStyles"])([].slice.call(arguments));} false&&(false);var z=function(){var e=j.apply(void 0,[].slice.call(arguments)),n="animation-"+e.name;return{name:n,styles:"@keyframes "+n+"{"+e.styles+"}",anim:1,toString:function(){return"_EMO_"+this.name+"_"+this.styles+"_EMO_";}};},S=function e(n){for(var r=n.length,t=0,o="";t<r;t++){var s=n[t];if(null!=s){var a=void 0;switch(typeof s){case"boolean":break;case"object":if(Array.isArray(s))a=e(s);else for(var i in false&&false,a="",s)s[i]&&i&&(a&&(a+=" "),a+=i);break;default:a=s;}a&&(o&&(o+=" "),o+=a);}}return o;};function M(e,n,r){var t=[],o=Object(_zedvision_emotion_utils__WEBPACK_IMPORTED_MODULE_4__["getRegisteredStyles"])(e,t,r);return t.length<2?r:o+n(t);}var I=E(function(e,r){var t,o="",s="",a=!1,i=function(){if(a&&"production"!=="production")throw new Error("css can only be used during render");var e=Object(_zedvision_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__["serializeStyles"])([].slice.call(arguments),r.registered);if(f)Object(_zedvision_emotion_utils__WEBPACK_IMPORTED_MODULE_4__["insertStyles"])(r,e,!1);else{var n=Object(_zedvision_emotion_utils__WEBPACK_IMPORTED_MODULE_4__["insertStyles"])(r,e,!1);void 0!==n&&(o+=n);}return f||(s+=" "+e.name),r.key+"-"+e.name;},c={css:i,cx:function(){if(a&&"production"!=="production")throw new Error("cx can only be used during render");return M(r.registered,i,S([].slice.call(arguments)));},theme:Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(N)},l=e.children(c);return a=!0,f||0===o.length?l:h(Fragment,null,h("style",((t={})["data-emotion"]=r.key+" "+s.substring(1),t.dangerouslySetInnerHTML={__html:o},t.nonce=r.sheet.nonce,t)),l);});if( false&&(false),"production"!=="production"){var L="undefined"!=typeof document,C="undefined"!=typeof jest;if(L&&!C){var H=L?window:global,Z="__EMOTION_REACT_"+"10.10.28".split(".")[0]+"__";H[Z]&&console.warn("You are loading @zedvision/emotion-react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used."),H[Z]=!0;}}

/***/ }),

/***/ "../emotion-serialize/dist/emotion-serialize.modern.js":
/*!*************************************************************!*\
  !*** ../emotion-serialize/dist/emotion-serialize.modern.js ***!
  \*************************************************************/
/*! exports provided: serializeStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serializeStyles", function() { return f; });
/* harmony import */ var _zedvision_emotion_hash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zedvision/emotion-hash */ "../emotion-hash/dist/emotion-hash.modern.js");
/* harmony import */ var _zedvision_emotion_unitless__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zedvision/emotion-unitless */ "../emotion-unitless/dist/emotion-unitless.esm.js");
/* harmony import */ var _zedvision_emotion_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zedvision/emotion-memoize */ "../emotion-memoize/dist/emotion-memoize.modern.js");
const n="You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";let s=/[A-Z]|^ms/g,r=/_EMO_([^_]+?)_([^]*?)_EMO_/g;const i=e=>45===e.charCodeAt(1),a=e=>null!=e&&"boolean"!=typeof e,l=Object(_zedvision_emotion_memoize__WEBPACK_IMPORTED_MODULE_2__["default"])(e=>i(e)?e:e.replace(s,"-$&").toLowerCase());let c=(e,t)=>{switch(e){case"animation":case"animationName":if("string"==typeof t)return t.replace(r,(e,o,t)=>(d={name:o,styles:t,next:d},o));}return 1===_zedvision_emotion_unitless__WEBPACK_IMPORTED_MODULE_1__["default"][e]||i(e)||"number"!=typeof t||0===t?t:t+"px";};if(false){}function p(e,o,t){if(null==t)return"";if(void 0!==t.__emotion_styles){if(false){}return t;}switch(typeof t){case"boolean":return"";case"object":if(1===t.anim)return d={name:t.name,styles:t.styles,next:d},t.name;if(void 0!==t.styles){let e=t.next;if(void 0!==e)for(;void 0!==e;)d={name:e.name,styles:e.styles,next:d},e=e.next;let o=`${t.styles};`;return false&&(false),o;}return function(e,o,t){let n="";if(Array.isArray(t))for(let s=0;s<t.length;s++)n+=`${p(e,o,t[s])};`;else for(let s in t){let r=t[s];if("object"!=typeof r)null!=o&&void 0!==o[r]?n+=`${s}{${o[r]}}`:a(r)&&(n+=`${l(s)}:${c(s,r)};`);else{if("NO_COMPONENT_SELECTOR"===s&&"production"!=="production")throw new Error("Component selectors can only be used in conjunction with @emotion/babel-plugin.");if(!Array.isArray(r)||"string"!=typeof r[0]||null!=o&&void 0!==o[r[0]]){const t=p(e,o,r);switch(s){case"animation":case"animationName":n+=`${l(s)}:${t};`;break;default: false&&false,n+=`${s}{${t}}`;}}else for(let e=0;e<r.length;e++)a(r[e])&&(n+=`${l(s)}:${c(s,r[e])};`);}}return n;}(e,o,t);case"function":if(void 0!==e){let n=d,s=t(e);return d=n,p(e,o,s);} false&&false;break;case"string":if(false){}}if(null==o)return t;const n=o[t];return void 0!==n?n:t;}let u,d,m=/label:\s*([^\s;\n{]+)\s*;/g; false&&(false);const f=function(o,t,s){if(1===o.length&&"object"==typeof o[0]&&null!==o[0]&&void 0!==o[0].styles)return o[0];let r=!0,i="";d=void 0;let a,l=o[0];null==l||void 0===l.raw?(r=!1,i+=p(s,t,l)):( false&&false,i+=l[0]);for(let e=1;e<o.length;e++)i+=p(s,t,o[e]),r&&( false&&false,i+=l[e]); false&&(false),m.lastIndex=0;let c,f="";for(;null!==(c=m.exec(i));)f+="-"+c[1];let y=Object(_zedvision_emotion_hash__WEBPACK_IMPORTED_MODULE_0__["default"])(i)+f;return false?undefined:{name:y,styles:i,next:d};};

/***/ }),

/***/ "../emotion-sheet/dist/emotion-sheet.modern.js":
/*!*****************************************************!*\
  !*** ../emotion-sheet/dist/emotion-sheet.modern.js ***!
  \*****************************************************/
/*! exports provided: StyleSheet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyleSheet", function() { return e; });
class e{constructor(e){this._insertTag=e=>{let t;t=0===this.tags.length?this.prepend?this.container.firstChild:this.before:this.tags[this.tags.length-1].nextSibling,this.container.insertBefore(e,t),this.tags.push(e);},this.isSpeedy=void 0===e.speedy?"production"==="production":e.speedy,this.tags=[],this.ctr=0,this.nonce=e.nonce,this.key=e.key,this.container=e.container,this.prepend=e.prepend,this.before=null;}hydrate(e){e.forEach(this._insertTag);}insert(e){this.ctr%(this.isSpeedy?65e3:1)==0&&this._insertTag(function(e){let t=document.createElement("style");return t.setAttribute("data-emotion",e.key),void 0!==e.nonce&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t;}(this));const t=this.tags[this.tags.length-1];if(false){}if(this.isSpeedy){const s=function(e){if(e.sheet)return e.sheet;for(let t=0;t<document.styleSheets.length;t++){if(document.styleSheets[t].ownerNode===e){return document.styleSheets[t];}}}(t);try{s.insertRule(e,s.cssRules.length);}catch(t){ true||false;}}else t.appendChild(document.createTextNode(e));this.ctr++;}flush(){this.tags.forEach(e=>e.parentNode.removeChild(e)),this.tags=[],this.ctr=0, false&&(false);}}

/***/ }),

/***/ "../emotion-styled/dist/emotion-styled.modern.js":
/*!*******************************************************!*\
  !*** ../emotion-styled/dist/emotion-styled.modern.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "../../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _zedvision_emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zedvision/emotion-is-prop-valid */ "../emotion-is-prop-valid/dist/emotion-is-prop-valid.modern.js");
/* harmony import */ var _zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zedvision/emotion-react */ "../emotion-react/dist/emotion-react.modern.js");
/* harmony import */ var _zedvision_emotion_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zedvision/emotion-utils */ "../emotion-utils/dist/emotion-utils.modern.js");
/* harmony import */ var _zedvision_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @zedvision/emotion-serialize */ "../emotion-serialize/dist/emotion-serialize.modern.js");
function l(){return(l=Object.assign||function(e){for(var o=1;o<arguments.length;o++){var t=arguments[o];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);}return e;}).apply(this,arguments);}const d=_zedvision_emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_2__["default"],p=e=>"theme"!==e,c=e=>"string"==typeof e&&e.charCodeAt(0)>96?d:p,m=(e,o,t)=>{let r;if(o){const t=o.shouldForwardProp;r=e.__emotion_forwardProp&&t?o=>e.__emotion_forwardProp(o)&&t(o):t;}return"function"!=typeof r&&t&&(r=e.__emotion_forwardProp),r;},u="You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";let f="undefined"!=typeof document,_=(t,d)=>{if(false){}const p=t.__emotion_real===t,v=p&&t.__emotion_base||t;let y,g;void 0!==d&&(y=d.label,g=d.target);const b=m(t,d,p),N=b||c(v),w=!N("as");return function(){let E=arguments,O=p&&void 0!==t.__emotion_styles?t.__emotion_styles.slice(0):[];if(void 0!==y&&O.push(`label:${y};`),null==E[0]||void 0===E[0].raw)O.push.apply(O,E);else{ false&&false,O.push(E[0][0]);let e=E.length,o=1;for(;o<e;o++) false&&false,O.push(E[o],E[0][o]);}const P=Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_3__["withEmotionCache"])((t,r,l)=>{const d=w&&t.as||v;let p="",m=[],u=t;if(null==t.theme){u={};for(let e in t)u[e]=t[e];u.theme=Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_3__["ThemeContext"]);}"string"==typeof t.className?p=Object(_zedvision_emotion_utils__WEBPACK_IMPORTED_MODULE_4__["getRegisteredStyles"])(r.registered,m,t.className):null!=t.className&&(p=`${t.className} `);const _=Object(_zedvision_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__["serializeStyles"])(O.concat(m),r.registered,u),y=Object(_zedvision_emotion_utils__WEBPACK_IMPORTED_MODULE_4__["insertStyles"])(r,_,"string"==typeof d);p+=`${r.key}-${_.name}`,void 0!==g&&(p+=` ${g}`);const E=w&&void 0===b?c(d):N;let P={};for(let e in t)w&&"as"===e||E(e)&&(P[e]=t[e]);P.className=p,P.ref=l;const k=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(d,P);if(!f&&void 0!==y){let e=_.name,o=_.next;for(;void 0!==o;)e+=" "+o.name,o=o.next;return h(Fragment,null,h("style",{"data-emotion":`${r.key} ${e}`,dangerouslySetInnerHTML:{__html:y},nonce:r.sheet.nonce}),k);}return k;});return P.displayName=void 0!==y?y:`Styled(${"string"==typeof v?v:v.displayName||v.name||"Component"})`,P.defaultProps=t.defaultProps,P.__emotion_real=P,P.__emotion_base=v,P.__emotion_styles=O,P.__emotion_forwardProp=b,Object.defineProperty(P,"toString",{value:()=>void 0===g&&"production"!=="production"?"NO_COMPONENT_SELECTOR":`.${g}`}),P.withComponent=(e,o)=>_(e,l({},d,o,{shouldForwardProp:m(P,o,!0)})).apply(void 0,Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(O)),P;};};const v=_.bind();["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach(e=>{v[e]=v(e);});/* harmony default export */ __webpack_exports__["default"] = (v);

/***/ }),

/***/ "../emotion-unitless/dist/emotion-unitless.esm.js":
/*!********************************************************!*\
  !*** ../emotion-unitless/dist/emotion-unitless.esm.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var unitlessKeys={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,// SVG-related properties
fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};/* harmony default export */ __webpack_exports__["default"] = (unitlessKeys);

/***/ }),

/***/ "../emotion-utils/dist/emotion-utils.modern.js":
/*!*****************************************************!*\
  !*** ../emotion-utils/dist/emotion-utils.modern.js ***!
  \*****************************************************/
/*! exports provided: getRegisteredStyles, insertStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRegisteredStyles", function() { return t; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertStyles", function() { return i; });
const e="undefined"!=typeof document;function t(e,t,i){let n="";return i.split(" ").forEach(i=>{void 0!==e[i]?t.push(`${e[i]};`):n+=`${i} `;}),n;}const i=(t,i,n)=>{let o=`${t.key}-${i.name}`;if((!1===n||!1===e&&void 0!==t.compat)&&void 0===t.registered[o]&&(t.registered[o]=i.styles),void 0===t.inserted[i.name]){let n="",d=i;do{let r=t.insert(i===d?`.${o}`:"",d,t.sheet,!0);e||void 0===r||(n+=r),d=d.next;}while(void 0!==d);if(!e&&0!==n.length)return n;}};

/***/ }),

/***/ "../emotion-weak-memoize/dist/emotion-weak-memoize.modern.js":
/*!*******************************************************************!*\
  !*** ../emotion-weak-memoize/dist/emotion-weak-memoize.modern.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(e){let t=new WeakMap();return r=>{if(t.has(r))return t.get(r);let n=e(r);return t.set(r,n),n;};});

/***/ }),

/***/ "./.cache/_this_is_virtual_fs_path_/$virtual/sync-requires.js":
/*!********************************************************************!*\
  !*** ./.cache/_this_is_virtual_fs_path_/$virtual/sync-requires.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const{hot}=__webpack_require__(/*! react-hot-loader/root */ "../../node_modules/react-hot-loader/root.js");// prefer default export if available
const preferDefault=m=>m&&m.default||m;exports.components={"component---src-pages-404-tsx":hot(preferDefault(__webpack_require__(/*! ./src/pages/404.tsx */ "./src/pages/404.tsx"))),"component---src-pages-codebox-tsx":hot(preferDefault(__webpack_require__(/*! ./src/pages/codebox.tsx */ "./src/pages/codebox.tsx"))),"component---src-pages-example-tsx":hot(preferDefault(__webpack_require__(/*! ./src/pages/example.tsx */ "./src/pages/example.tsx"))),"component---src-pages-index-tsx":hot(preferDefault(__webpack_require__(/*! ./src/pages/index.tsx */ "./src/pages/index.tsx"))),"component---src-pages-offline-plugin-app-shell-fallback-tsx":hot(preferDefault(__webpack_require__(/*! ./src/pages/offline-plugin-app-shell-fallback.tsx */ "./src/pages/offline-plugin-app-shell-fallback.tsx"))),"component---src-pages-using-typescript-tsx":hot(preferDefault(__webpack_require__(/*! ./src/pages/using-typescript.tsx */ "./src/pages/using-typescript.tsx"))),"component---src-templates-blog-post-tsx":hot(preferDefault(__webpack_require__(/*! ./src/templates/blog-post.tsx */ "./src/templates/blog-post.tsx")))};

/***/ }),

/***/ "./.cache/api-runner-ssr.js":
/*!**********************************!*\
  !*** ./.cache/api-runner-ssr.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var plugins=[{plugin:__webpack_require__(/*! /z/monorepo/node_modules/gatsby-plugin-remove-generator/gatsby-ssr */ "../../node_modules/gatsby-plugin-remove-generator/gatsby-ssr.js"),options:{"plugins":[]}},{plugin:__webpack_require__(/*! /z/monorepo/node_modules/gatsby-plugin-workerize-loader/gatsby-ssr */ "../../node_modules/gatsby-plugin-workerize-loader/gatsby-ssr.js"),options:{"plugins":[]}},{plugin:__webpack_require__(/*! /z/monorepo/node_modules/gatsby-plugin-mdx/gatsby-ssr */ "../../node_modules/gatsby-plugin-mdx/gatsby-ssr.js"),options:{"plugins":[],"extensions":[".mdx"],"defaultLayouts":{},"gatsbyRemarkPlugins":[],"lessBabel":false,"remarkPlugins":[],"rehypePlugins":[],"mediaTypes":["text/markdown","text/x-markdown"]}},{plugin:__webpack_require__(/*! /z/monorepo/node_modules/gatsby-plugin-react-helmet/gatsby-ssr */ "../../node_modules/gatsby-plugin-react-helmet/gatsby-ssr.js"),options:{"plugins":[]}},{plugin:__webpack_require__(/*! /z/monorepo/node_modules/gatsby-plugin-manifest/gatsby-ssr */ "../../node_modules/gatsby-plugin-manifest/gatsby-ssr.js"),options:{"plugins":[],"icon":"assets/android-chrome-512x512.png","name":"Zed Vision - Development experience, Testing, and everything between","short_name":"ZedVision","description":"Blog and tech experiments","start_url":"/","background_color":"#f7f0eb","theme_color":"#a2466c","display":"standalone","cache_busting_mode":"none","legacy":true,"theme_color_in_head":true,"crossOrigin":"anonymous","include_favicon":true,"cacheDigest":null}}];// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]
const apis=__webpack_require__(/*! ./api-ssr-docs */ "./.cache/api-ssr-docs.js");// Run the specified API in any plugins that have implemented it
module.exports=(api,args,defaultReturn,argTransform)=>{if(!apis[api]){console.log(`This API doesn't exist`,api);}// Run each plugin in series.
// eslint-disable-next-line no-undef
let results=plugins.map(plugin=>{if(!plugin.plugin[api]){return undefined;}const result=plugin.plugin[api](args,plugin.options);if(result&&argTransform){args=argTransform({args,result});}return result;});// Filter out undefined results.
results=results.filter(result=>typeof result!==`undefined`);if(results.length>0){return results;}else{return[defaultReturn];}};

/***/ }),

/***/ "./.cache/api-ssr-docs.js":
/*!********************************!*\
  !*** ./.cache/api-ssr-docs.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Object containing options defined in `gatsby-config.js`
 * @typedef {object} pluginOptions
 */ /**
 * Replace the default server renderer. This is useful for integration with
 * Redux, css-in-js libraries, etc. that need custom setups for server
 * rendering.
 * @param {object} $0
 * @param {string} $0.pathname The pathname of the page currently being rendered.
 * @param {ReactNode} $0.bodyComponent The React element to be rendered as the page body
 * @param {function} $0.replaceBodyHTMLString Call this with the HTML string
 * you render. **WARNING** if multiple plugins implement this API it's the
 * last plugin that "wins". TODO implement an automated warning against this.
 * @param {function} $0.setHeadComponents Takes an array of components as its
 * first argument which are added to the `headComponents` array which is passed
 * to the `html.js` component.
 * @param {function} $0.setHtmlAttributes Takes an object of props which will
 * spread into the `<html>` component.
 * @param {function} $0.setBodyAttributes Takes an object of props which will
 * spread into the `<body>` component.
 * @param {function} $0.setPreBodyComponents Takes an array of components as its
 * first argument which are added to the `preBodyComponents` array which is passed
 * to the `html.js` component.
 * @param {function} $0.setPostBodyComponents Takes an array of components as its
 * first argument which are added to the `postBodyComponents` array which is passed
 * to the `html.js` component.
 * @param {function} $0.setBodyProps Takes an object of data which
 * is merged with other body props and passed to `html.js` as `bodyProps`.
 * @param {pluginOptions} pluginOptions
 * @example
 * // From gatsby-plugin-glamor
 * const { renderToString } = require("react-dom/server")
 * const inline = require("glamor-inline")
 *
 * exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
 *   const bodyHTML = renderToString(bodyComponent)
 *   const inlinedHTML = inline(bodyHTML)
 *
 *   replaceBodyHTMLString(inlinedHTML)
 * }
 */exports.replaceRenderer=true;/**
 * Called after every page Gatsby server renders while building HTML so you can
 * set head and body components to be rendered in your `html.js`.
 *
 * Gatsby does a two-pass render for HTML. It loops through your pages first
 * rendering only the body and then takes the result body HTML string and
 * passes it as the `body` prop to your `html.js` to complete the render.
 *
 * It's often handy to be able to send custom components to your `html.js`.
 * For example, it's a very common pattern for React.js libraries that
 * support server rendering to pull out data generated during the render to
 * add to your HTML.
 *
 * Using this API over [`replaceRenderer`](#replaceRenderer) is preferable as
 * multiple plugins can implement this API where only one plugin can take
 * over server rendering. However, if your plugin requires taking over server
 * rendering then that's the one to
 * use
 * @param {object} $0
 * @param {string} $0.pathname The pathname of the page currently being rendered.
 * @param {function} $0.setHeadComponents Takes an array of components as its
 * first argument which are added to the `headComponents` array which is passed
 * to the `html.js` component.
 * @param {function} $0.setHtmlAttributes Takes an object of props which will
 * spread into the `<html>` component.
 * @param {function} $0.setBodyAttributes Takes an object of props which will
 * spread into the `<body>` component.
 * @param {function} $0.setPreBodyComponents Takes an array of components as its
 * first argument which are added to the `preBodyComponents` array which is passed
 * to the `html.js` component.
 * @param {function} $0.setPostBodyComponents Takes an array of components as its
 * first argument which are added to the `postBodyComponents` array which is passed
 * to the `html.js` component.
 * @param {function} $0.setBodyProps Takes an object of data which
 * is merged with other body props and passed to `html.js` as `bodyProps`.
 * @param {pluginOptions} pluginOptions
 * @example
 * // Import React so that you can use JSX in HeadComponents
 * const React = require("react")
 *
 * const HtmlAttributes = {
 *   lang: "en"
 * }
 *
 * const HeadComponents = [
 *   <script key="my-script" src="https://gatsby.dev/my-script" />
 * ]
 *
 * const BodyAttributes = {
 *   "data-theme": "dark"
 * }
 *
 * exports.onRenderBody = ({
 *   setHeadComponents,
 *   setHtmlAttributes,
 *   setBodyAttributes
 * }, pluginOptions) => {
 *   setHtmlAttributes(HtmlAttributes)
 *   setHeadComponents(HeadComponents)
 *   setBodyAttributes(BodyAttributes)
 * }
 */exports.onRenderBody=true;/**
 * Called after every page Gatsby server renders while building HTML so you can
 * replace head components to be rendered in your `html.js`. This is useful if
 * you need to reorder scripts or styles added by other plugins.
 * @param {object} $0
 * @param {string} $0.pathname The pathname of the page currently being rendered.
 * @param {Array<ReactNode>} $0.getHeadComponents Returns the current `headComponents` array.
 * @param {function} $0.replaceHeadComponents Takes an array of components as its
 * first argument which replace the `headComponents` array which is passed
 * to the `html.js` component. **WARNING** if multiple plugins implement this
 * API it's the last plugin that "wins".
 * @param {Array<ReactNode>} $0.getPreBodyComponents Returns the current `preBodyComponents` array.
 *  @param {function} $0.replacePreBodyComponents Takes an array of components as its
 * first argument which replace the `preBodyComponents` array which is passed
 * to the `html.js` component. **WARNING** if multiple plugins implement this
 * API it's the last plugin that "wins".
 * @param {Array<ReactNode>} $0.getPostBodyComponents Returns the current `postBodyComponents` array.
 *  @param {function} $0.replacePostBodyComponents Takes an array of components as its
 * first argument which replace the `postBodyComponents` array which is passed
 * to the `html.js` component. **WARNING** if multiple plugins implement this
 * API it's the last plugin that "wins".
 * @param {pluginOptions} pluginOptions
 * @example
 * // Move Typography.js styles to the top of the head section so they're loaded first.
 * exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
 *   const headComponents = getHeadComponents()
 *   headComponents.sort((x, y) => {
 *     if (x.key === 'TypographyStyle') {
 *       return -1
 *     } else if (y.key === 'TypographyStyle') {
 *       return 1
 *     }
 *     return 0
 *   })
 *   replaceHeadComponents(headComponents)
 * }
 */exports.onPreRenderHTML=true;/**
 * Allow a plugin to wrap the page element.
 *
 * This is useful for setting wrapper components around pages that won't get
 * unmounted on page changes. For setting Provider components, use [wrapRootElement](#wrapRootElement).
 *
 * _Note:_
 * There is an equivalent hook in Gatsby's [Browser API](/docs/browser-apis/#wrapPageElement).
 * It is recommended to use both APIs together.
 * For example usage, check out [Using i18n](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-i18n).
 * @param {object} $0
 * @param {ReactNode} $0.element The "Page" React Element built by Gatsby.
 * @param {object} $0.props Props object used by page.
 * @param {pluginOptions} pluginOptions
 * @returns {ReactNode} Wrapped element
 * @example
 * const React = require("react")
 * const Layout = require("./src/components/layout").default
 *
 * exports.wrapPageElement = ({ element, props }) => {
 *   // props provide same data to Layout as Page element will get
 *   // including location, data, etc - you don't need to pass it
 *   return <Layout {...props}>{element}</Layout>
 * }
 */exports.wrapPageElement=true;/**
 * Allow a plugin to wrap the root element.
 *
 * This is useful to set up any Provider components that will wrap your application.
 * For setting persistent UI elements around pages use [wrapPageElement](#wrapPageElement).
 *
 * _Note:_
 * There is an equivalent hook in Gatsby's [Browser API](/docs/browser-apis/#wrapRootElement).
 * It is recommended to use both APIs together.
 * For example usage, check out [Using redux](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-redux).
 * @param {object} $0
 * @param {ReactNode} $0.element The "Root" React Element built by Gatsby.
 * @param {pluginOptions} pluginOptions
 * @returns {ReactNode} Wrapped element
 * @example
 * const React = require("react")
 * const { Provider } = require("react-redux")
 *
 * const createStore = require("./src/state/createStore")
 * const store = createStore()
 *
 * exports.wrapRootElement = ({ element }) => {
 *   return (
 *     <Provider store={store}>
 *       {element}
 *     </Provider>
 *   )
 * }
 */exports.wrapRootElement=true;

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-mdx/mdx-scopes-dir/619e4c1544d023b87009049ac4fcd614.js":
/*!********************************************************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-mdx/mdx-scopes-dir/619e4c1544d023b87009049ac4fcd614.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_components_Counter_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../src/components/Counter.tsx */ "./src/components/Counter.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony default export */ __webpack_exports__["default"] = ({Counter: _src_components_Counter_tsx__WEBPACK_IMPORTED_MODULE_0__["Counter"],React: react__WEBPACK_IMPORTED_MODULE_1__});

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-mdx/mdx-scopes-dir/e92f8988d65cf25c087d226e6c0ef06f.js":
/*!********************************************************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-mdx/mdx-scopes-dir/e92f8988d65cf25c087d226e6c0ef06f.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony default export */ __webpack_exports__["default"] = ({React: react__WEBPACK_IMPORTED_MODULE_0__});

/***/ }),

/***/ "./.cache/default-html.js":
/*!********************************!*\
  !*** ./.cache/default-html.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTML; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function HTML(props){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("html",props.htmlAttributes,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("head",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta",{charSet:"utf-8"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta",{httpEquiv:"x-ua-compatible",content:"ie=edge"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1, shrink-to-fit=no"}),props.headComponents),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("body",props.bodyAttributes,props.preBodyComponents,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",{key:`body`,id:"___gatsby",dangerouslySetInnerHTML:{__html:props.body}}),props.postBodyComponents));}HTML.propTypes={htmlAttributes:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,headComponents:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,bodyAttributes:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,preBodyComponents:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,body:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,postBodyComponents:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array};

/***/ }),

/***/ "./.cache/emitter.js":
/*!***************************!*\
  !*** ./.cache/emitter.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mitt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mitt */ "../../node_modules/mitt/dist/mitt.es.js");
const emitter=Object(mitt__WEBPACK_IMPORTED_MODULE_0__["default"])();/* harmony default export */ __webpack_exports__["default"] = (emitter);

/***/ }),

/***/ "./.cache/find-path.js":
/*!*****************************!*\
  !*** ./.cache/find-path.js ***!
  \*****************************/
/*! exports provided: setMatchPaths, findMatchPath, grabMatchParams, findPath, cleanPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMatchPaths", function() { return setMatchPaths; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findMatchPath", function() { return findMatchPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "grabMatchParams", function() { return grabMatchParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findPath", function() { return findPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cleanPath", function() { return cleanPath; });
/* harmony import */ var _reach_router_lib_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reach/router/lib/utils */ "../../node_modules/@reach/router/lib/utils.js");
/* harmony import */ var _reach_router_lib_utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reach_router_lib_utils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _strip_prefix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./strip-prefix */ "./.cache/strip-prefix.js");
/* harmony import */ var _normalize_page_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./normalize-page-path */ "./.cache/normalize-page-path.js");
const pathCache=new Map();let matchPaths=[];const trimPathname=rawPathname=>{const pathname=decodeURIComponent(rawPathname);// Remove the pathPrefix from the pathname.
const trimmedPathname=Object(_strip_prefix__WEBPACK_IMPORTED_MODULE_1__["default"])(pathname,"")// Remove any hashfragment
.split(`#`)[0]// Remove search query
.split(`?`)[0];return trimmedPathname;};function absolutify(path){// If it's already absolute, return as-is
if(path.startsWith(`/`)||path.startsWith(`https://`)||path.startsWith(`http://`)){return path;}// Calculate path relative to current location, adding a trailing slash to
// match behavior of @reach/router
return new URL(path,window.location.href+(window.location.href.endsWith(`/`)?``:`/`)).pathname;}/**
 * Set list of matchPaths
 *
 * @param {Array<{path: string, matchPath: string}>} value collection of matchPaths
 */const setMatchPaths=value=>{matchPaths=value;};/**
 * Return a matchpath url
 * if `match-paths.json` contains `{ "/foo*": "/page1", ...}`, then
 * `/foo?bar=far` => `/page1`
 *
 * @param {string} rawPathname A raw pathname
 * @return {string|null}
 */const findMatchPath=rawPathname=>{const trimmedPathname=cleanPath(rawPathname);const pickPaths=matchPaths.map(({path,matchPath})=>{return{path:matchPath,originalPath:path};});const path=Object(_reach_router_lib_utils__WEBPACK_IMPORTED_MODULE_0__["pick"])(pickPaths,trimmedPathname);if(path){return Object(_normalize_page_path__WEBPACK_IMPORTED_MODULE_2__["default"])(path.route.originalPath);}return null;};/**
 * Return a matchpath params from reach/router rules
 * if `match-paths.json` contains `{ ":bar/*foo" }`, and the path is /baz/zaz/zoo
 * then it returns
 *  { bar: baz, foo: zaz/zoo }
 *
 * @param {string} rawPathname A raw pathname
 * @return {object}
 */const grabMatchParams=rawPathname=>{const trimmedPathname=cleanPath(rawPathname);const pickPaths=matchPaths.map(({path,matchPath})=>{return{path:matchPath,originalPath:path};});const path=Object(_reach_router_lib_utils__WEBPACK_IMPORTED_MODULE_0__["pick"])(pickPaths,trimmedPathname);if(path){return path.params;}return{};};// Given a raw URL path, returns the cleaned version of it (trim off
// `#` and query params), or if it matches an entry in
// `match-paths.json`, its matched path is returned
//
// E.g. `/foo?bar=far` => `/foo`
//
// Or if `match-paths.json` contains `{ "/foo*": "/page1", ...}`, then
// `/foo?bar=far` => `/page1`
const findPath=rawPathname=>{const trimmedPathname=trimPathname(absolutify(rawPathname));if(pathCache.has(trimmedPathname)){return pathCache.get(trimmedPathname);}let foundPath=findMatchPath(trimmedPathname);if(!foundPath){foundPath=cleanPath(rawPathname);}pathCache.set(trimmedPathname,foundPath);return foundPath;};/**
 * Clean a url and converts /index.html => /
 * E.g. `/foo?bar=far` => `/foo`
 *
 * @param {string} rawPathname A raw pathname
 * @return {string}
 */const cleanPath=rawPathname=>{const trimmedPathname=trimPathname(absolutify(rawPathname));let foundPath=trimmedPathname;if(foundPath===`/index.html`){foundPath=`/`;}foundPath=Object(_normalize_page_path__WEBPACK_IMPORTED_MODULE_2__["default"])(foundPath);return foundPath;};

/***/ }),

/***/ "./.cache/gatsby-browser-entry.js":
/*!****************************************!*\
  !*** ./.cache/gatsby-browser-entry.js ***!
  \****************************************/
/*! exports provided: Link, withAssetPrefix, withPrefix, graphql, parsePath, navigate, push, replace, navigateTo, useScrollRestoration, StaticQueryContext, StaticQuery, PageRenderer, useStaticQuery, prefetchPathname */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graphql", function() { return graphql; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaticQueryContext", function() { return StaticQueryContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaticQuery", function() { return StaticQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useStaticQuery", function() { return useStaticQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prefetchPathname", function() { return prefetchPathname; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gatsby_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gatsby-link */ "../../node_modules/gatsby-link/index.js");
/* harmony import */ var gatsby_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(gatsby_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return gatsby_link__WEBPACK_IMPORTED_MODULE_2___default.a; });
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withAssetPrefix", function() { return gatsby_link__WEBPACK_IMPORTED_MODULE_2__["withAssetPrefix"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withPrefix", function() { return gatsby_link__WEBPACK_IMPORTED_MODULE_2__["withPrefix"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parsePath", function() { return gatsby_link__WEBPACK_IMPORTED_MODULE_2__["parsePath"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "navigate", function() { return gatsby_link__WEBPACK_IMPORTED_MODULE_2__["navigate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "push", function() { return gatsby_link__WEBPACK_IMPORTED_MODULE_2__["push"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "replace", function() { return gatsby_link__WEBPACK_IMPORTED_MODULE_2__["replace"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "navigateTo", function() { return gatsby_link__WEBPACK_IMPORTED_MODULE_2__["navigateTo"]; });

/* harmony import */ var gatsby_react_router_scroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gatsby-react-router-scroll */ "../../node_modules/gatsby-react-router-scroll/index.js");
/* harmony import */ var gatsby_react_router_scroll__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(gatsby_react_router_scroll__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useScrollRestoration", function() { return gatsby_react_router_scroll__WEBPACK_IMPORTED_MODULE_3__["useScrollRestoration"]; });

/* harmony import */ var _public_page_renderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./public-page-renderer */ "./.cache/public-page-renderer.js");
/* harmony import */ var _public_page_renderer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_public_page_renderer__WEBPACK_IMPORTED_MODULE_4__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "PageRenderer", function() { return _public_page_renderer__WEBPACK_IMPORTED_MODULE_4___default.a; });
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./loader */ "./.cache/loader.js");
const prefetchPathname=_loader__WEBPACK_IMPORTED_MODULE_5__["default"].enqueue;const StaticQueryContext=/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext({});function StaticQueryDataRenderer({staticQueryData,data,query,render}){const finalData=data?data.data:staticQueryData[query]&&staticQueryData[query].data;return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,null,finalData&&render(finalData),!finalData&&/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",null,"Loading (StaticQuery)"));}const StaticQuery=props=>{const{data,query,render,children}=props;return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StaticQueryContext.Consumer,null,staticQueryData=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StaticQueryDataRenderer,{data:data,query:query,render:render||children,staticQueryData:staticQueryData}));};const useStaticQuery=query=>{var _context$query;if(typeof react__WEBPACK_IMPORTED_MODULE_0___default.a.useContext!==`function`&&"production"===`development`){throw new Error(`You're likely using a version of React that doesn't support Hooks\n`+`Please update React and ReactDOM to 16.8.0 or later to use the useStaticQuery hook.`);}const context=react__WEBPACK_IMPORTED_MODULE_0___default.a.useContext(StaticQueryContext);// query is a stringified number like `3303882` when wrapped with graphql, If a user forgets
// to wrap the query in a grqphql, then casting it to a Number results in `NaN` allowing us to
// catch the misuse of the API and give proper direction
if(isNaN(Number(query))){throw new Error(`useStaticQuery was called with a string but expects to be called using \`graphql\`. Try this:

import { useStaticQuery, graphql } from 'gatsby';

useStaticQuery(graphql\`${query}\`);
`);}if((_context$query=context[query])!==null&&_context$query!==void 0&&_context$query.data){return context[query].data;}else{throw new Error(`The result of this StaticQuery could not be fetched.\n\n`+`This is likely a bug in Gatsby and if refreshing the page does not fix it, `+`please open an issue in https://github.com/gatsbyjs/gatsby/issues`);}};StaticQuery.propTypes={data:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,query:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,render:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,children:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func};function graphql(){throw new Error(`It appears like Gatsby is misconfigured. Gatsby related \`graphql\` calls `+`are supposed to only be evaluated at compile time, and then compiled away. `+`Unfortunately, something went wrong and the query was left in the compiled code.\n\n`+`Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.`);}

/***/ }),

/***/ "./.cache/loader.js":
/*!**************************!*\
  !*** ./.cache/loader.js ***!
  \**************************/
/*! exports provided: PageResourceStatus, BaseLoader, ProdLoader, setLoader, publicLoader, default, getStaticQueryResults */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageResourceStatus", function() { return PageResourceStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseLoader", function() { return BaseLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProdLoader", function() { return ProdLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLoader", function() { return setLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publicLoader", function() { return publicLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStaticQueryResults", function() { return getStaticQueryResults; });
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "../../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "../../node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _prefetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./prefetch */ "./.cache/prefetch.js");
/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./emitter */ "./.cache/emitter.js");
/* harmony import */ var _find_path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./find-path */ "./.cache/find-path.js");
function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}/**
 * Available resource loading statuses
 */const PageResourceStatus={/**
   * At least one of critical resources failed to load
   */Error:`error`,/**
   * Resources loaded successfully
   */Success:`success`};const preferDefault=m=>m&&m.default||m;const stripSurroundingSlashes=s=>{s=s[0]===`/`?s.slice(1):s;s=s.endsWith(`/`)?s.slice(0,-1):s;return s;};const createPageDataUrl=path=>{const fixedPath=path===`/`?`index`:stripSurroundingSlashes(path);return`${""}/page-data/${fixedPath}/page-data.json`;};function doFetch(url,method=`GET`){return new Promise((resolve,reject)=>{const req=new XMLHttpRequest();req.open(method,url,true);req.onreadystatechange=()=>{if(req.readyState==4){resolve(req);}};req.send(null);});}const doesConnectionSupportPrefetch=()=>{if(`connection`in navigator&&typeof navigator.connection!==`undefined`){if((navigator.connection.effectiveType||``).includes(`2g`)){return false;}if(navigator.connection.saveData){return false;}}return true;};const toPageResources=(pageData,component=null)=>{const page={componentChunkName:pageData.componentChunkName,path:pageData.path,webpackCompilationHash:pageData.webpackCompilationHash,matchPath:pageData.matchPath,staticQueryHashes:pageData.staticQueryHashes};return{component,json:pageData.result,page};};class BaseLoader{constructor(loadComponent,matchPaths){this.inFlightNetworkRequests=new Map();// Map of pagePath -> Page. Where Page is an object with: {
//   status: PageResourceStatus.Success || PageResourceStatus.Error,
//   payload: PageResources, // undefined if PageResourceStatus.Error
// }
// PageResources is {
//   component,
//   json: pageData.result,
//   page: {
//     componentChunkName,
//     path,
//     webpackCompilationHash,
//     staticQueryHashes
//   },
//   staticQueryResults
// }
this.pageDb=new Map();this.inFlightDb=new Map();this.staticQueryDb={};this.pageDataDb=new Map();this.prefetchTriggered=new Set();this.prefetchCompleted=new Set();this.loadComponent=loadComponent;Object(_find_path__WEBPACK_IMPORTED_MODULE_4__["setMatchPaths"])(matchPaths);}memoizedGet(url){let inFlightPromise=this.inFlightNetworkRequests.get(url);if(!inFlightPromise){inFlightPromise=doFetch(url,`GET`);this.inFlightNetworkRequests.set(url,inFlightPromise);}// Prefer duplication with then + catch over .finally to prevent problems in ie11 + firefox
return inFlightPromise.then(response=>{this.inFlightNetworkRequests.delete(url);return response;}).catch(err=>{this.inFlightNetworkRequests.delete(url);throw err;});}setApiRunner(apiRunner){this.apiRunner=apiRunner;this.prefetchDisabled=apiRunner(`disableCorePrefetching`).some(a=>a);}fetchPageDataJson(loadObj){const{pagePath,retries=0}=loadObj;const url=createPageDataUrl(pagePath);return this.memoizedGet(url).then(req=>{const{status,responseText}=req;// Handle 200
if(status===200){try{const jsonPayload=JSON.parse(responseText);if(jsonPayload.path===undefined){throw new Error(`not a valid pageData response`);}return Object.assign(loadObj,{status:PageResourceStatus.Success,payload:jsonPayload});}catch(err){// continue regardless of error
}}// Handle 404
if(status===404||status===200){// If the request was for a 404 page and it doesn't exist, we're done
if(pagePath===`/404.html`){return Object.assign(loadObj,{status:PageResourceStatus.Error});}// Need some code here to cache the 404 request. In case
// multiple loadPageDataJsons result in 404s
return this.fetchPageDataJson(Object.assign(loadObj,{pagePath:`/404.html`,notFound:true}));}// handle 500 response (Unrecoverable)
if(status===500){return Object.assign(loadObj,{status:PageResourceStatus.Error});}// Handle everything else, including status === 0, and 503s. Should retry
if(retries<3){return this.fetchPageDataJson(Object.assign(loadObj,{retries:retries+1}));}// Retried 3 times already, result is an error.
return Object.assign(loadObj,{status:PageResourceStatus.Error});});}loadPageDataJson(rawPath){const pagePath=Object(_find_path__WEBPACK_IMPORTED_MODULE_4__["findPath"])(rawPath);if(this.pageDataDb.has(pagePath)){const pageData=this.pageDataDb.get(pagePath);if(true){return Promise.resolve(pageData);}}return this.fetchPageDataJson({pagePath}).then(pageData=>{this.pageDataDb.set(pagePath,pageData);return pageData;});}findMatchPath(rawPath){return Object(_find_path__WEBPACK_IMPORTED_MODULE_4__["findMatchPath"])(rawPath);}// TODO check all uses of this and whether they use undefined for page resources not exist
loadPage(rawPath){const pagePath=Object(_find_path__WEBPACK_IMPORTED_MODULE_4__["findPath"])(rawPath);if(this.pageDb.has(pagePath)){const page=this.pageDb.get(pagePath);if(true){return Promise.resolve(page.payload);}}if(this.inFlightDb.has(pagePath)){return this.inFlightDb.get(pagePath);}const inFlightPromise=Promise.all([this.loadAppData(),this.loadPageDataJson(pagePath)]).then(allData=>{const result=allData[1];if(result.status===PageResourceStatus.Error){return{status:PageResourceStatus.Error};}let pageData=result.payload;const{componentChunkName,staticQueryHashes=[]}=pageData;const finalResult={};const componentChunkPromise=this.loadComponent(componentChunkName).then(component=>{finalResult.createdAt=new Date();let pageResources;if(!component){finalResult.status=PageResourceStatus.Error;}else{finalResult.status=PageResourceStatus.Success;if(result.notFound===true){finalResult.notFound=true;}pageData=Object.assign(pageData,{webpackCompilationHash:allData[0]?allData[0].webpackCompilationHash:``});pageResources=toPageResources(pageData,component);}// undefined if final result is an error
return pageResources;});const staticQueryBatchPromise=Promise.all(staticQueryHashes.map(staticQueryHash=>{// Check for cache in case this static query result has already been loaded
if(this.staticQueryDb[staticQueryHash]){const jsonPayload=this.staticQueryDb[staticQueryHash];return{staticQueryHash,jsonPayload};}return this.memoizedGet(`${""}/page-data/sq/d/${staticQueryHash}.json`).then(req=>{const jsonPayload=JSON.parse(req.responseText);return{staticQueryHash,jsonPayload};});})).then(staticQueryResults=>{const staticQueryResultsMap={};staticQueryResults.forEach(({staticQueryHash,jsonPayload})=>{staticQueryResultsMap[staticQueryHash]=jsonPayload;this.staticQueryDb[staticQueryHash]=jsonPayload;});return staticQueryResultsMap;});return Promise.all([componentChunkPromise,staticQueryBatchPromise]).then(([pageResources,staticQueryResults])=>{let payload;if(pageResources){payload=_objectSpread(_objectSpread({},pageResources),{},{staticQueryResults});finalResult.payload=payload;_emitter__WEBPACK_IMPORTED_MODULE_3__["default"].emit(`onPostLoadPageResources`,{page:payload,pageResources:payload});}this.pageDb.set(pagePath,finalResult);return payload;});});inFlightPromise.then(response=>{this.inFlightDb.delete(pagePath);}).catch(error=>{this.inFlightDb.delete(pagePath);throw error;});this.inFlightDb.set(pagePath,inFlightPromise);return inFlightPromise;}// returns undefined if loading page ran into errors
loadPageSync(rawPath){const pagePath=Object(_find_path__WEBPACK_IMPORTED_MODULE_4__["findPath"])(rawPath);if(this.pageDb.has(pagePath)){const pageData=this.pageDb.get(pagePath).payload;return pageData;}return undefined;}shouldPrefetch(pagePath){// Skip prefetching if we know user is on slow or constrained connection
if(!doesConnectionSupportPrefetch()){return false;}// Check if the page exists.
if(this.pageDb.has(pagePath)){return false;}return true;}prefetch(pagePath){if(!this.shouldPrefetch(pagePath)){return false;}// Tell plugins with custom prefetching logic that they should start
// prefetching this path.
if(!this.prefetchTriggered.has(pagePath)){this.apiRunner(`onPrefetchPathname`,{pathname:pagePath});this.prefetchTriggered.add(pagePath);}// If a plugin has disabled core prefetching, stop now.
if(this.prefetchDisabled){return false;}const realPath=Object(_find_path__WEBPACK_IMPORTED_MODULE_4__["findPath"])(pagePath);// Todo make doPrefetch logic cacheable
// eslint-disable-next-line consistent-return
this.doPrefetch(realPath).then(()=>{if(!this.prefetchCompleted.has(pagePath)){this.apiRunner(`onPostPrefetchPathname`,{pathname:pagePath});this.prefetchCompleted.add(pagePath);}});return true;}doPrefetch(pagePath){const pageDataUrl=createPageDataUrl(pagePath);return Object(_prefetch__WEBPACK_IMPORTED_MODULE_2__["default"])(pageDataUrl,{crossOrigin:`anonymous`,as:`fetch`}).then(()=>// This was just prefetched, so will return a response from
// the cache instead of making another request to the server
this.loadPageDataJson(pagePath));}hovering(rawPath){this.loadPage(rawPath);}getResourceURLsForPathname(rawPath){const pagePath=Object(_find_path__WEBPACK_IMPORTED_MODULE_4__["findPath"])(rawPath);const page=this.pageDataDb.get(pagePath);if(page){const pageResources=toPageResources(page.payload);return[].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(createComponentUrls(pageResources.page.componentChunkName)),[createPageDataUrl(pagePath)]);}else{return null;}}isPageNotFound(rawPath){const pagePath=Object(_find_path__WEBPACK_IMPORTED_MODULE_4__["findPath"])(rawPath);const page=this.pageDb.get(pagePath);return!page||page.notFound;}loadAppData(retries=0){return this.memoizedGet(`${""}/page-data/app-data.json`).then(req=>{const{status,responseText}=req;let appData;if(status!==200&&retries<3){// Retry 3 times incase of non-200 responses
return this.loadAppData(retries+1);}// Handle 200
if(status===200){try{const jsonPayload=JSON.parse(responseText);if(jsonPayload.webpackCompilationHash===undefined){throw new Error(`not a valid app-data response`);}appData=jsonPayload;}catch(err){// continue regardless of error
}}return appData;});}}const createComponentUrls=componentChunkName=>(window.___chunkMapping[componentChunkName]||[]).map(chunk=>""+chunk);class ProdLoader extends BaseLoader{constructor(asyncRequires,matchPaths){const loadComponent=chunkName=>asyncRequires.components[chunkName]?asyncRequires.components[chunkName]().then(preferDefault)// loader will handle the case when component is null
.catch(()=>null):Promise.resolve();super(loadComponent,matchPaths);}doPrefetch(pagePath){return super.doPrefetch(pagePath).then(result=>{if(result.status!==PageResourceStatus.Success){return Promise.resolve();}const pageData=result.payload;const chunkName=pageData.componentChunkName;const componentUrls=createComponentUrls(chunkName);return Promise.all(componentUrls.map(_prefetch__WEBPACK_IMPORTED_MODULE_2__["default"])).then(()=>pageData);});}loadPageDataJson(rawPath){return super.loadPageDataJson(rawPath).then(data=>{if(data.notFound){// check if html file exist using HEAD request:
// if it does we should navigate to it instead of showing 404
return doFetch(rawPath,`HEAD`).then(req=>{if(req.status===200){// page (.html file) actually exist (or we asked for 404 )
// returning page resources status as errored to trigger
// regular browser navigation to given page
return{status:PageResourceStatus.Error};}// if HEAD request wasn't 200, return notFound result
// and show 404 page
return data;});}return data;});}}let instance;const setLoader=_loader=>{instance=_loader;};const publicLoader={// Deprecated methods. As far as we're aware, these are only used by
// core gatsby and the offline plugin, however there's a very small
// chance they're called by others.
getResourcesForPathname:rawPath=>{console.warn(`Warning: getResourcesForPathname is deprecated. Use loadPage instead`);return instance.i.loadPage(rawPath);},getResourcesForPathnameSync:rawPath=>{console.warn(`Warning: getResourcesForPathnameSync is deprecated. Use loadPageSync instead`);return instance.i.loadPageSync(rawPath);},enqueue:rawPath=>instance.prefetch(rawPath),// Real methods
getResourceURLsForPathname:rawPath=>instance.getResourceURLsForPathname(rawPath),loadPage:rawPath=>instance.loadPage(rawPath),loadPageSync:rawPath=>instance.loadPageSync(rawPath),prefetch:rawPath=>instance.prefetch(rawPath),isPageNotFound:rawPath=>instance.isPageNotFound(rawPath),hovering:rawPath=>instance.hovering(rawPath),loadAppData:()=>instance.loadAppData()};/* harmony default export */ __webpack_exports__["default"] = (publicLoader);function getStaticQueryResults(){if(instance){return instance.staticQueryDb;}else{return{};}}

/***/ }),

/***/ "./.cache/normalize-page-path.js":
/*!***************************************!*\
  !*** ./.cache/normalize-page-path.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (path=>{if(path===undefined){return path;}if(path===`/`){return`/`;}if(path.charAt(path.length-1)===`/`){return path.slice(0,-1);}return path;});

/***/ }),

/***/ "./.cache/prefetch.js":
/*!****************************!*\
  !*** ./.cache/prefetch.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const support=function(feature){if(typeof document===`undefined`){return false;}const fakeLink=document.createElement(`link`);try{if(fakeLink.relList&&typeof fakeLink.relList.supports===`function`){return fakeLink.relList.supports(feature);}}catch(err){return false;}return false;};const linkPrefetchStrategy=function(url,options){return new Promise((resolve,reject)=>{if(typeof document===`undefined`){reject();return;}const link=document.createElement(`link`);link.setAttribute(`rel`,`prefetch`);link.setAttribute(`href`,url);Object.keys(options).forEach(key=>{link.setAttribute(key,options[key]);});link.onload=resolve;link.onerror=reject;const parentElement=document.getElementsByTagName(`head`)[0]||document.getElementsByName(`script`)[0].parentNode;parentElement.appendChild(link);});};const xhrPrefetchStrategy=function(url){return new Promise((resolve,reject)=>{const req=new XMLHttpRequest();req.open(`GET`,url,true);req.onload=()=>{if(req.status===200){resolve();}else{reject();}};req.send(null);});};const supportedPrefetchStrategy=support(`prefetch`)?linkPrefetchStrategy:xhrPrefetchStrategy;const preFetched={};const prefetch=function(url,options){return new Promise(resolve=>{if(preFetched[url]){resolve();return;}supportedPrefetchStrategy(url,options).then(()=>{resolve();preFetched[url]=true;}).catch(()=>{});// 404s are logged to the console anyway
});};/* harmony default export */ __webpack_exports__["default"] = (prefetch);

/***/ }),

/***/ "./.cache/public-page-renderer.js":
/*!****************************************!*\
  !*** ./.cache/public-page-renderer.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const preferDefault=m=>m&&m.default||m;if(false){}else if(false){}else{module.exports=()=>null;}

/***/ }),

/***/ "./.cache/route-announcer-props.js":
/*!*****************************************!*\
  !*** ./.cache/route-announcer-props.js ***!
  \*****************************************/
/*! exports provided: RouteAnnouncerProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RouteAnnouncerProps", function() { return RouteAnnouncerProps; });
// This is extracted to separate module because it's shared
// between browser and SSR code
const RouteAnnouncerProps={id:`gatsby-announcer`,style:{position:`absolute`,top:0,width:1,height:1,padding:0,overflow:`hidden`,clip:`rect(0, 0, 0, 0)`,whiteSpace:`nowrap`,border:0},"aria-live":`assertive`,"aria-atomic":`true`};

/***/ }),

/***/ "./.cache/static-entry.js":
/*!********************************!*\
  !*** ./.cache/static-entry.js ***!
  \********************************/
/*! exports provided: sanitizeComponents, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sanitizeComponents", function() { return sanitizeComponents; });
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "../../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "../../node_modules/@babel/runtime/helpers/esm/defineProperty.js");
function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}const React=__webpack_require__(/*! react */ "react");const fs=__webpack_require__(/*! fs */ "fs");const{join}=__webpack_require__(/*! path */ "path");const{renderToString,renderToStaticMarkup}=__webpack_require__(/*! react-dom/server */ "react-dom/server");const{ServerLocation,Router,isRedirect}=__webpack_require__(/*! @reach/router */ "@reach/router");const{get,merge,isObject,flatten,uniqBy,flattenDeep,replace,concat,memoize}=__webpack_require__(/*! lodash */ "lodash");const{RouteAnnouncerProps}=__webpack_require__(/*! ./route-announcer-props */ "./.cache/route-announcer-props.js");const apiRunner=__webpack_require__(/*! ./api-runner-ssr */ "./.cache/api-runner-ssr.js");const syncRequires=__webpack_require__(/*! $virtual/sync-requires */ "./.cache/_this_is_virtual_fs_path_/$virtual/sync-requires.js");const{version:gatsbyVersion}=__webpack_require__(/*! gatsby/package.json */ "../../node_modules/gatsby/package.json");const{grabMatchParams}=__webpack_require__(/*! ./find-path */ "./.cache/find-path.js");const stats=JSON.parse(fs.readFileSync(`${process.cwd()}/public/webpack.stats.json`,`utf-8`));const chunkMapping=JSON.parse(fs.readFileSync(`${process.cwd()}/public/chunk-map.json`,`utf-8`));// const testRequireError = require("./test-require-error")
// For some extremely mysterious reason, webpack adds the above module *after*
// this module so that when this code runs, testRequireError is undefined.
// So in the meantime, we'll just inline it.
const testRequireError=(moduleName,err)=>{const regex=new RegExp(`Error: Cannot find module\\s.${moduleName}`);const firstLine=err.toString().split(`\n`)[0];return regex.test(firstLine);};let Html;try{Html=__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module '../src/html'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));}catch(err){if(testRequireError(`../src/html`,err)){Html=__webpack_require__(/*! ./default-html */ "./.cache/default-html.js");}else{throw err;}}Html=Html&&Html.__esModule?Html.default:Html;const getPageDataPath=path=>{const fixedPagePath=path===`/`?`index`:path;return join(`page-data`,fixedPagePath,`page-data.json`);};const getPageDataUrl=pagePath=>{const pageDataPath=getPageDataPath(pagePath);return`${""}/${pageDataPath}`;};const getStaticQueryUrl=hash=>`${""}/page-data/sq/d/${hash}.json`;const getPageData=pagePath=>{const pageDataPath=getPageDataPath(pagePath);const absolutePageDataPath=join(process.cwd(),`public`,pageDataPath);const pageDataRaw=fs.readFileSync(absolutePageDataPath);try{return JSON.parse(pageDataRaw.toString());}catch(err){return null;}};const appDataPath=join(`page-data`,`app-data.json`);const getAppDataUrl=memoize(()=>{let appData;try{const absoluteAppDataPath=join(process.cwd(),`public`,appDataPath);const appDataRaw=fs.readFileSync(absoluteAppDataPath);appData=JSON.parse(appDataRaw.toString());if(!appData){return null;}}catch(err){return null;}return`${""}/${appDataPath}`;});const loadPageDataSync=pagePath=>{const pageDataPath=getPageDataPath(pagePath);const pageDataFile=join(process.cwd(),`public`,pageDataPath);try{const pageDataJson=fs.readFileSync(pageDataFile);return JSON.parse(pageDataJson);}catch(error){// not an error if file is not found. There's just no page data
return null;}};const createElement=React.createElement;const sanitizeComponents=components=>{const componentsArray=ensureArray(components);return componentsArray.map(component=>{// Ensure manifest is always loaded from content server
// And not asset server when an assetPrefix is used
if(false){}return component;});};const ensureArray=components=>{if(Array.isArray(components)){// remove falsy items and flatten
return flattenDeep(components.filter(val=>Array.isArray(val)?val.length>0:val));}else{// we also accept single components, so we need to handle this case as well
return components?[components]:[];}};/* harmony default export */ __webpack_exports__["default"] = ((pagePath,callback)=>{var _postBodyComponents;let bodyHtml=``;let headComponents=[/*#__PURE__*/React.createElement("meta",{name:"generator",content:`Gatsby ${gatsbyVersion}`,key:`generator-${gatsbyVersion}`})];let htmlAttributes={};let bodyAttributes={};let preBodyComponents=[];let postBodyComponents=[];let bodyProps={};const replaceBodyHTMLString=body=>{bodyHtml=body;};const setHeadComponents=components=>{headComponents=headComponents.concat(sanitizeComponents(components));};const setHtmlAttributes=attributes=>{htmlAttributes=merge(htmlAttributes,attributes);};const setBodyAttributes=attributes=>{bodyAttributes=merge(bodyAttributes,attributes);};const setPreBodyComponents=components=>{preBodyComponents=preBodyComponents.concat(sanitizeComponents(components));};const setPostBodyComponents=components=>{postBodyComponents=postBodyComponents.concat(sanitizeComponents(components));};const setBodyProps=props=>{bodyProps=merge({},bodyProps,props);};const getHeadComponents=()=>headComponents;const replaceHeadComponents=components=>{headComponents=sanitizeComponents(components);};const getPreBodyComponents=()=>preBodyComponents;const replacePreBodyComponents=components=>{preBodyComponents=sanitizeComponents(components);};const getPostBodyComponents=()=>postBodyComponents;const replacePostBodyComponents=components=>{postBodyComponents=sanitizeComponents(components);};const pageData=getPageData(pagePath);const pageDataUrl=getPageDataUrl(pagePath);const appDataUrl=getAppDataUrl();const{componentChunkName,staticQueryHashes=[]}=pageData;const staticQueryUrls=staticQueryHashes.map(getStaticQueryUrl);class RouteHandler extends React.Component{render(){var _pageData$result,_pageData$result$page;const props=_objectSpread(_objectSpread(_objectSpread({},this.props),pageData.result),{},{params:_objectSpread(_objectSpread({},grabMatchParams(this.props.location.pathname)),((_pageData$result=pageData.result)===null||_pageData$result===void 0?void 0:(_pageData$result$page=_pageData$result.pageContext)===null||_pageData$result$page===void 0?void 0:_pageData$result$page.__params)||{}),// pathContext was deprecated in v2. Renamed to pageContext
pathContext:pageData.result?pageData.result.pageContext:undefined});const pageElement=createElement(syncRequires.components[componentChunkName],props);const wrappedPage=apiRunner(`wrapPageElement`,{element:pageElement,props},pageElement,({result})=>{return{element:result,props};}).pop();return wrappedPage;}}const routerElement=/*#__PURE__*/React.createElement(ServerLocation,{url:`${""}${pagePath}`},/*#__PURE__*/React.createElement(Router,{id:"gatsby-focus-wrapper",baseuri:""},/*#__PURE__*/React.createElement(RouteHandler,{path:"/*"})),/*#__PURE__*/React.createElement("div",RouteAnnouncerProps));const bodyComponent=apiRunner(`wrapRootElement`,{element:routerElement,pathname:pagePath},routerElement,({result})=>{return{element:result,pathname:pagePath};}).pop();// Let the site or plugin render the page component.
apiRunner(`replaceRenderer`,{bodyComponent,replaceBodyHTMLString,setHeadComponents,setHtmlAttributes,setBodyAttributes,setPreBodyComponents,setPostBodyComponents,setBodyProps,pathname:pagePath,pathPrefix:""});// If no one stepped up, we'll handle it.
if(!bodyHtml){try{bodyHtml=renderToString(bodyComponent);}catch(e){// ignore @reach/router redirect errors
if(!isRedirect(e))throw e;}}// Create paths to scripts
let scriptsAndStyles=flatten([`app`,componentChunkName].map(s=>{const fetchKey=`assetsByChunkName[${s}]`;let chunks=get(stats,fetchKey);const namedChunkGroups=get(stats,`namedChunkGroups`);if(!chunks){return null;}chunks=chunks.map(chunk=>{if(chunk===`/`){return null;}return{rel:`preload`,name:chunk};});namedChunkGroups[s].assets.forEach(asset=>chunks.push({rel:`preload`,name:asset}));const childAssets=namedChunkGroups[s].childAssets;for(const rel in childAssets){chunks=concat(chunks,childAssets[rel].map(chunk=>{return{rel,name:chunk};}));}return chunks;})).filter(s=>isObject(s)).sort((s1,s2)=>s1.rel==`preload`?-1:1);// given priority to preload
scriptsAndStyles=uniqBy(scriptsAndStyles,item=>item.name);const scripts=scriptsAndStyles.filter(script=>script.name&&script.name.endsWith(`.js`));const styles=scriptsAndStyles.filter(style=>style.name&&style.name.endsWith(`.css`));apiRunner(`onRenderBody`,{setHeadComponents,setHtmlAttributes,setBodyAttributes,setPreBodyComponents,setPostBodyComponents,setBodyProps,pathname:pagePath,loadPageDataSync,bodyHtml,scripts,styles,pathPrefix:""});scripts.slice(0).reverse().forEach(script=>{// Add preload/prefetch <link>s for scripts.
headComponents.push(/*#__PURE__*/React.createElement("link",{as:"script",rel:script.rel,key:script.name,href:`${""}/${script.name}`}));});if(pageData){headComponents.push(/*#__PURE__*/React.createElement("link",{as:"fetch",rel:"preload",key:pageDataUrl,href:pageDataUrl,crossOrigin:"anonymous"}));}staticQueryUrls.forEach(staticQueryUrl=>headComponents.push(/*#__PURE__*/React.createElement("link",{as:"fetch",rel:"preload",key:staticQueryUrl,href:staticQueryUrl,crossOrigin:"anonymous"})));if(appDataUrl){headComponents.push(/*#__PURE__*/React.createElement("link",{as:"fetch",rel:"preload",key:appDataUrl,href:appDataUrl,crossOrigin:"anonymous"}));}styles.slice(0).reverse().forEach(style=>{// Add <link>s for styles that should be prefetched
// otherwise, inline as a <style> tag
if(style.rel===`prefetch`){headComponents.push(/*#__PURE__*/React.createElement("link",{as:"style",rel:style.rel,key:style.name,href:`${""}/${style.name}`}));}else{headComponents.unshift(/*#__PURE__*/React.createElement("style",{"data-href":`${""}/${style.name}`,id:`gatsby-global-css`,dangerouslySetInnerHTML:{__html:fs.readFileSync(join(process.cwd(),`public`,style.name),`utf-8`)}}));}});// Add page metadata for the current page
const windowPageData=`/*<![CDATA[*/window.pagePath="${pagePath}";/*]]>*/`;postBodyComponents.push(/*#__PURE__*/React.createElement("script",{key:`script-loader`,id:`gatsby-script-loader`,dangerouslySetInnerHTML:{__html:windowPageData}}));// Add chunk mapping metadata
const scriptChunkMapping=`/*<![CDATA[*/window.___chunkMapping=${JSON.stringify(chunkMapping)};/*]]>*/`;postBodyComponents.push(/*#__PURE__*/React.createElement("script",{key:`chunk-mapping`,id:`gatsby-chunk-mapping`,dangerouslySetInnerHTML:{__html:scriptChunkMapping}}));let bodyScripts=[];if(chunkMapping[`polyfill`]){chunkMapping[`polyfill`].forEach(script=>{const scriptPath=`${""}${script}`;bodyScripts.push(/*#__PURE__*/React.createElement("script",{key:scriptPath,src:scriptPath,noModule:true}));});}// Filter out prefetched bundles as adding them as a script tag
// would force high priority fetching.
bodyScripts=bodyScripts.concat(scripts.filter(s=>s.rel!==`prefetch`).map(s=>{const scriptPath=`${""}/${JSON.stringify(s.name).slice(1,-1)}`;return/*#__PURE__*/React.createElement("script",{key:scriptPath,src:scriptPath,async:true});}));(_postBodyComponents=postBodyComponents).push.apply(_postBodyComponents,Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(bodyScripts));apiRunner(`onPreRenderHTML`,{getHeadComponents,replaceHeadComponents,getPreBodyComponents,replacePreBodyComponents,getPostBodyComponents,replacePostBodyComponents,pathname:pagePath,pathPrefix:""});const html=`<!DOCTYPE html>${renderToStaticMarkup(/*#__PURE__*/React.createElement(Html,Object.assign({},bodyProps,{headComponents:headComponents,htmlAttributes:htmlAttributes,bodyAttributes:bodyAttributes,preBodyComponents:preBodyComponents,postBodyComponents:postBodyComponents,body:bodyHtml,path:pagePath})))}`;callback(null,html);});

/***/ }),

/***/ "./.cache/strip-prefix.js":
/*!********************************!*\
  !*** ./.cache/strip-prefix.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return stripPrefix; });
/**
 * Remove a prefix from a string. Return the input string if the given prefix
 * isn't found.
 */function stripPrefix(str,prefix=``){if(!prefix){return str;}if(str===prefix){return`/`;}if(str.startsWith(`${prefix}/`)){return str.slice(prefix.length);}return str;}

/***/ }),

/***/ "./assets/forkMe.png":
/*!***************************!*\
  !*** ./assets/forkMe.png ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/forkMe-1a2bcb7dd2c870c3afe5d50466500c18.png";

/***/ }),

/***/ "./public/page-data/sq/d/2841359383.json":
/*!***********************************************!*\
  !*** ./public/page-data/sq/d/2841359383.json ***!
  \***********************************************/
/*! exports provided: data, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"data\":{\"site\":{\"siteMetadata\":{\"title\":\"Zed vision\",\"description\":\"A starter blog demonstrating what Gatsby can do.\",\"social\":{\"twitter\":\"ZoltanErdos\"}}}}}");

/***/ }),

/***/ "./src/components/Counter.tsx":
/*!************************************!*\
  !*** ./src/components/Counter.tsx ***!
  \************************************/
/*! exports provided: Counter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Counter", function() { return Counter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const Counter = ({
  initial = 0
}) => {
  const {
    0: clicks,
    1: setClicks
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(initial);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Clicks: ", clicks), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: () => setClicks(clicks + 1)
  }, "+"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: () => setClicks(clicks - 1)
  }, "-"));
};

/***/ }),

/***/ "./src/components/bio.tsx":
/*!********************************!*\
  !*** ./src/components/bio.tsx ***!
  \********************************/
/*! exports provided: Bio */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bio", function() { return Bio; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _zedvision_emotion_styled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zedvision/emotion-styled */ "../emotion-styled/dist/emotion-styled.modern.js");
/* harmony import */ var _utils_typography__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/typography */ "./src/components/utils/typography.ts");
/* harmony import */ var _zed_profile_pic_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./zed-profile-pic.jpg */ "./src/components/zed-profile-pic.jpg");
/* harmony import */ var _zed_profile_pic_jpg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_zed_profile_pic_jpg__WEBPACK_IMPORTED_MODULE_3__);




const Container = _zedvision_emotion_styled__WEBPACK_IMPORTED_MODULE_1__["default"].div`
  margin-top: ${Object(_utils_typography__WEBPACK_IMPORTED_MODULE_2__["rhythm"])(2.5)};
  display: flex;
  margin-bottom: ${Object(_utils_typography__WEBPACK_IMPORTED_MODULE_2__["rhythm"])(2.5)};
`;
const StyledImgDiv = _zedvision_emotion_styled__WEBPACK_IMPORTED_MODULE_1__["default"].div`
  margin-right: ${Object(_utils_typography__WEBPACK_IMPORTED_MODULE_2__["rhythm"])(1 / 2)};
  margin-bottom: 0;
  overflow: hidden;
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;
const objectives = [`a bit less
  frustrating.`, `more fun`, `great again`];
const Bio = () => {
  let random = Math.random();
  if (typeof window === "undefined") random = 0.4; //have a consistent ssr

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](Container, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](StyledImgDiv, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("img", {
    alt: "Zoltan Erdos",
    src: _zed_profile_pic_jpg__WEBPACK_IMPORTED_MODULE_3___default.a
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "Written by ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("strong", null, "Zoltan Erdos"), ", who is interested to make software development", ` ` + (objectives[Math.floor(random * objectives.length)] || "crazy."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
    href: `https://twitter.com/ZoltanErdos`
  }, "Follow me on Twitter")));
};

/***/ }),

/***/ "./src/components/code/Qr.tsx":
/*!************************************!*\
  !*** ./src/components/code/Qr.tsx ***!
  \************************************/
/*! exports provided: Qr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Qr", function() { return Qr; });
/* harmony import */ var _zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zedvision/emotion-react */ "../emotion-react/dist/emotion-react.modern.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _importScript_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./importScript.js */ "./src/components/code/importScript.js");
/** @jsx jsx */



const Qr = () => {
  const ref = react__WEBPACK_IMPORTED_MODULE_1___default.a.useRef(null);
  const [retry, setRetry] = react__WEBPACK_IMPORTED_MODULE_1___default.a.useState(3);
  const [counter, setCounter] = react__WEBPACK_IMPORTED_MODULE_1___default.a.useState(0);
  react__WEBPACK_IMPORTED_MODULE_1___default.a.useEffect(() => {
    let qr;

    const connect = async () => {
      await Object(_importScript_js__WEBPACK_IMPORTED_MODULE_2__["importScript"])("https://unpkg.com/@zedvision/qrious@8.5.7/dist/qrious.min.js");
      const req = await fetch("https://code.zed.vision/token");
      const data = await req.json();
      setCounter(60);
      const key = data.key;
      const url = `https://zed.vision/${key}`;
      const options = {
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
        qr = new window.QRious(options);
      }

      const check = await fetch(`https://code.zed.vision/check?key=${key}`);
      const res = await check.json();

      if (res.expired === false) {
        location.href = "https://zed.vision/code/";
      }

      setRetry(retry - 1);
    };

    if (typeof window !== "undefined" && retry > 0) connect();
  }, [retry]);
  react__WEBPACK_IMPORTED_MODULE_1___default.a.useEffect(() => {
    if (typeof window !== "undefined" && counter) {
      setTimeout(() => setCounter(x => x - 1), 1000);
    }
  }, [counter]);
  return Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__["jsx"])("a", {
    href: "/code/"
  }, retry > 0 && Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
    css: _zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__["css"]`
        background: blue;
        display: inline-block;
        padding: 10px 10px 0px 10px;
        border-radius: 12px;
        text-align: center;
    `
  }, Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__["jsx"])("img", {
    css: _zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__["css"]`
              display: block;
              box-shadow: 0 0 ${10 + counter}px 5px ${retry === 3 ? "darkorange" : retry === 2 ? "green" : "darkred"};
          `,
    ref: ref
  }), Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
    css: _zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__["css"]`
              font-family: Roboto;
              font-size: 20px;
              text-transform: uppercase; 
              color: white;
            `
  }, "Connect device")));
}; //

/***/ }),

/***/ "./src/components/code/getUser.ts":
/*!****************************************!*\
  !*** ./src/components/code/getUser.ts ***!
  \****************************************/
/*! exports provided: getUserId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserId", function() { return getUserId; });
async function getUserId() {
  if (typeof window === "undefined") return "";
  const {
    getDB
  } = await new Function(`
  return import("https://unpkg.com/@zedvision/shadb@8.7.0/dist/shaDB.js");
`)();
  const shaDB = await getDB();
  const uuid = await shaDB.get("uuid");

  if (!uuid) {
    const resp = await fetch("https://code.zed.vision/register");
    const data = await resp.json();
    shaDB.put("uuid", data.uuid);
    return data.uuid;
  }

  return uuid;
}

/***/ }),

/***/ "./src/components/code/importScript.js":
/*!*********************************************!*\
  !*** ./src/components/code/importScript.js ***!
  \*********************************************/
/*! exports provided: importScript */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "importScript", function() { return importScript; });
const cache={};const importScript=(src,res=[])=>{if(typeof window==="undefined")return{};const prefix=src.slice(0,8);if(prefix==="https://"){return window.document.head.querySelector(`script[src="${src}"]`)||new Promise(function(resolve,reject){const s=window.document.createElement("script");s.src=src;s.async="async";s.type="application/javascript";s.onload=()=>{if(res.length===0){resolve(window);}const ret={};res.forEach(x=>Object.assign(ret,window[x]));resolve(ret);};s.onerror=reject;window.document.head.appendChild(s);});}else if(prefix==="@zedvisi"){// if (!cache[src]) cache[src] = import(`https://unpkg.com/${src}`);
// return cache[src];
}};

/***/ }),

/***/ "./src/components/codeBox/CodeBox.tsx":
/*!********************************************!*\
  !*** ./src/components/codeBox/CodeBox.tsx ***!
  \********************************************/
/*! exports provided: CodeBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeBox", function() { return CodeBox; });
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "../../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "../../node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_babel_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/babel.ts */ "./src/components/utils/babel.ts");
/* harmony import */ var _utils_renderer_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/renderer.ts */ "./src/components/utils/renderer.ts");
/* harmony import */ var _utils_sha_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/sha.ts */ "./src/components/utils/sha.ts");
/* harmony import */ var _example_ts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./example.ts */ "./src/components/codeBox/example.ts");
/* harmony import */ var _styledCodeBoxComps_tsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./styledCodeBoxComps.tsx */ "./src/components/codeBox/styledCodeBoxComps.tsx");
/* harmony import */ var _codeboxComponents_tsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./codeboxComponents.tsx */ "./src/components/codeBox/codeboxComponents.tsx");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }








const CodeBox = ({
  title,
  children
}) => {
  const starterCode = (children === null || children === void 0 ? void 0 : children.toString().trim()) || _example_ts__WEBPACK_IMPORTED_MODULE_6__["counterExample"];
  if (typeof window === "undefined") return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("pre", null, "Loading");
  const [{
    events,
    hashArr
  }, changeProps] = react__WEBPACK_IMPORTED_MODULE_2__["useState"]({
    events: _example_ts__WEBPACK_IMPORTED_MODULE_6__["defaultProps"].events,
    hashEvents: "",
    hashArr: []
  });
  const [{
    transformed,
    error
  }, changeWorkerRenderedComponent] = react__WEBPACK_IMPORTED_MODULE_2__["useState"]({
    transformed: [],
    error: ""
  });
  const [code, changeCode] = react__WEBPACK_IMPORTED_MODULE_2__["useState"](starterCode);
  const [editorAttached, setEditorAttached] = react__WEBPACK_IMPORTED_MODULE_2__["useState"](false);
  react__WEBPACK_IMPORTED_MODULE_2__["useEffect"](() => {
    async function transformCode(codeHash, errorMessage) {
      if (errorMessage) {
        changeWorkerRenderedComponent(s => _objectSpread(_objectSpread({}, s), {}, {
          error: errorMessage
        }));
      }

      try {
        return Object(_utils_babel_ts__WEBPACK_IMPORTED_MODULE_3__["transform"])(codeHash);
      } catch (e) {
        const errorMessage = await Object(_utils_sha_ts__WEBPACK_IMPORTED_MODULE_5__["unHash"])(e);
        changeWorkerRenderedComponent(s => _objectSpread(_objectSpread({}, s), {}, {
          error: errorMessage
        }));
        return false;
      }
    }

    const runner = async c => {
      if (!editorAttached) {
        setEditorAttached(true);
        const {
          startMonaco
        } = await new Function(`return function(){
            return  import("https://unpkg.com/@zedvision/smart-monaco-editor/lib/editor.js")
          }`)();
        await startMonaco({
          language: "typescript",
          code: c,
          onChange: code => changeCode(code)
        });
      }

      const monaco = window["monaco"];
      const model = monaco.editor.getModel("file:///main.tsx");
      const tsWorker = await window["monaco"].languages.typescript.getTypeScriptWorker();
      const modelUri = model === null || model === void 0 ? void 0 : model.uri;
      if (!modelUri) return;
      const diag = await (await tsWorker(modelUri)).getSemanticDiagnostics("file:///main.tsx");
      const comp = await (await tsWorker(modelUri)).getCompilerOptionsDiagnostics("file:///main.tsx");
      const syntax = await (await tsWorker(modelUri)).getSyntacticDiagnostics("file:///main.tsx");
      const tsErrorMessageArr = [].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(diag), Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(comp), Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(syntax));
      const tsErrorMessage = tsErrorMessageArr.length === 0 ? "" : tsErrorMessageArr[0].messageText.toString();
      const codeHash = await Object(_utils_sha_ts__WEBPACK_IMPORTED_MODULE_5__["hash"])(c);
      const tHash = await transformCode(codeHash, tsErrorMessage);
      const hashArrValue = await Object(_utils_sha_ts__WEBPACK_IMPORTED_MODULE_5__["hash"])({
        events: [_example_ts__WEBPACK_IMPORTED_MODULE_6__["defaultProps"].events[0]]
      });
      if (!tHash || tsErrorMessage) return;
      const renderedHashContentHash = await Object(_utils_renderer_ts__WEBPACK_IMPORTED_MODULE_4__["render"])(tHash, hashArrValue);
      const renderedHashContent = typeof renderedHashContentHash === "string" ? await Object(_utils_sha_ts__WEBPACK_IMPORTED_MODULE_5__["unHash"])(renderedHashContentHash) : "<p>Error</p>";
      const prevIndex = transformed.findIndex(x => x.hash === tHash);

      if (prevIndex > 0) {
        const t = Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(transformed.slice(prevIndex, transformed.length));

        if (t[0].code[0] !== codeHash) t[0].code = [codeHash].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(t[0].code));

        if (code === c) {
          changeWorkerRenderedComponent(s => _objectSpread(_objectSpread({}, s), {}, {
            error: "",
            transformed: Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(transformed.slice(prevIndex))
          }));
        }

        return;
      }

      const rendered = [typeof renderedHashContent === "string" ? renderedHashContent : "<p>Error</p>"];
      const renderedHash = await Object(_utils_sha_ts__WEBPACK_IMPORTED_MODULE_5__["hash"])(rendered);

      if (code === c) {
        changeWorkerRenderedComponent(s => _objectSpread(_objectSpread({}, s), {}, {
          error: "",
          transformed: [{
            hash: tHash,
            code: [codeHash],
            renderedHash: renderedHash,
            rendered
          }].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(s.transformed))
        }));
        hashArr.forEach((h, hashI) => {
          if (hashI > rendered.length) {
            hashArr.forEach(async (h, tk) => {
              const renderedHash = await Object(_utils_renderer_ts__WEBPACK_IMPORTED_MODULE_4__["render"])(tHash, h);

              if (typeof renderedHash === "string") {
                const renderHtml = await Object(_utils_sha_ts__WEBPACK_IMPORTED_MODULE_5__["unHash"])(renderedHash);
                rendered[tk] = renderHtml;
                const renderedHashVal = rendered.length === hashArr.length ? await Object(_utils_sha_ts__WEBPACK_IMPORTED_MODULE_5__["hash"])(rendered) : "";
                changeWorkerRenderedComponent(s => {
                  s.transformed[0].rendered[tk] = renderHtml;

                  if (s.transformed[0].rendered.length === hashArr.length) {
                    s.transformed[0].renderedHash = renderedHashVal;
                  }

                  return s;
                });
              }
            });
          }
        });
      }
    };

    runner(code);
  }, [code]);
  react__WEBPACK_IMPORTED_MODULE_2__["useEffect"](() => {
    if (events.length !== hashArr.length) return;
    hashArr.forEach((h, hashI) => {
      if (hashI > transformed[0].rendered.length) {
        transformed.forEach(async (t, tk) => {
          if (t.rendered.length < hashI) {
            const renderedHash = await Object(_utils_renderer_ts__WEBPACK_IMPORTED_MODULE_4__["render"])(t.hash, h);

            if (typeof renderedHash === "string") {
              const rendered = await Object(_utils_sha_ts__WEBPACK_IMPORTED_MODULE_5__["unHash"])(renderedHash);

              const renderedCopy = Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(t.rendered);

              renderedCopy[tk] = rendered;
              const renderedHashVal = await Object(_utils_sha_ts__WEBPACK_IMPORTED_MODULE_5__["hash"])(renderedCopy);
              changeWorkerRenderedComponent(s => {
                s.transformed[tk].rendered[hashI] = rendered;

                if (s.transformed[tk].rendered.length === hashArr.length) {
                  s.transformed[tk].renderedHash = renderedHashVal;
                }

                return s;
              });
            }
          }
        });
      }
    });
  }, [transformed.length]);
  react__WEBPACK_IMPORTED_MODULE_2__["useEffect"](() => {
    if (events.length > hashArr.length || events.length > transformed[0].rendered.length) {
      events.forEach(async (v, k) => {
        if (k < hashArr.length) return; // changeProps((p)=>{p.hashArr[k] = p.hashArr[k] || p.hashArr[k-1]; return p;});

        const hashArrValue = await Object(_utils_sha_ts__WEBPACK_IMPORTED_MODULE_5__["hash"])({
          events: events.slice(0, k)
        });

        const hashCopy = Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(hashArrValue);

        hashCopy[k] = hashArrValue;
        const hashArrHash = await Object(_utils_sha_ts__WEBPACK_IMPORTED_MODULE_5__["hash"])(hashCopy);
        changeProps(p => {
          p.hashArr[k] = hashArrValue;
          p.hashEvents = hashArrHash;
          return p;
        });
        transformed.forEach(async (t, tk) => {
          if (t.rendered.length < k) {
            const renderedHash = await Object(_utils_renderer_ts__WEBPACK_IMPORTED_MODULE_4__["render"])(t.hash, hashArrValue);

            if (typeof renderedHash === "string") {
              const rendered = await Object(_utils_sha_ts__WEBPACK_IMPORTED_MODULE_5__["unHash"])(renderedHash);

              const renderedCopy = Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(t.rendered);

              renderedCopy[tk] = rendered;
              const renderedHashVal = await Object(_utils_sha_ts__WEBPACK_IMPORTED_MODULE_5__["hash"])(renderedCopy);
              changeWorkerRenderedComponent(s => {
                s.transformed[tk].rendered[k] = rendered;
                s.transformed[tk].renderedHash = renderedHashVal;
                return s;
              });
            }
          }
        });
      });
    }
  }, [events.length]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], null, !!title && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_styledCodeBoxComps_tsx__WEBPACK_IMPORTED_MODULE_7__["Header"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", null, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("button", {
    onClick: async () => {
      const hash = transformed[0].code[0];
      const dataObj = {
        codeHash: hash,
        transpiledHash: transformed[0].hash,
        code: await Object(_utils_sha_ts__WEBPACK_IMPORTED_MODULE_5__["unHash"])(transformed[0].code[0]),
        transpiledCode: await Object(_utils_sha_ts__WEBPACK_IMPORTED_MODULE_5__["unHash"])(transformed[0].hash)
      };
      const body = {
        results: [dataObj],
        errors: null,
        msg: ""
      };
      const request = new Request("https://code.zed.vision", {
        body: JSON.stringify(body),
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }); //const response =

      await fetch(request); // console.log(response);
    }
  }, "Save")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_styledCodeBoxComps_tsx__WEBPACK_IMPORTED_MODULE_7__["CodeContainer"], {
    id: "container"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_styledCodeBoxComps_tsx__WEBPACK_IMPORTED_MODULE_7__["CodeContainer"], {
    style: {
      display: "none"
    },
    id: "ace"
  }), error ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_styledCodeBoxComps_tsx__WEBPACK_IMPORTED_MODULE_7__["ErrorContainer"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("pre", null, error.toString()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("button", {
    onClick: async () => {
      const code = await Object(_utils_sha_ts__WEBPACK_IMPORTED_MODULE_5__["unHash"])(transformed[0].code[0]);
      const monacoEditor = monaco.editor.getModel("file:///main.tsx");
      monacoEditor.setValue(code);
      changeCode(code);
    }
  }, "Restore to the last working version")) : transformed.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_styledCodeBoxComps_tsx__WEBPACK_IMPORTED_MODULE_7__["ResultContainer"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_codeboxComponents_tsx__WEBPACK_IMPORTED_MODULE_8__["ResultComponent"], {
    transformed: transformed,
    key: transformed[0].renderedHash,
    events: events,
    onEvent: ev => {
      changeProps(p => _objectSpread(_objectSpread({}, p), {}, {
        events: [].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(p.events), [ev])
      }));
    }
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], null));
};

/***/ }),

/***/ "./src/components/codeBox/codeboxComponents.tsx":
/*!******************************************************!*\
  !*** ./src/components/codeBox/codeboxComponents.tsx ***!
  \******************************************************/
/*! exports provided: HtmlPlayer, ResultComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HtmlPlayer", function() { return HtmlPlayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResultComponent", function() { return ResultComponent; });
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! framer-motion */ "../../node_modules/framer-motion/dist/framer-motion.es.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styledCodeBoxComps_tsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styledCodeBoxComps.tsx */ "./src/components/codeBox/styledCodeBoxComps.tsx");



const HtmlPlayer = ({
  content,
  onEvent
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_styledCodeBoxComps_tsx__WEBPACK_IMPORTED_MODULE_2__["ResultBoxContainer"], {
    onClick: e => {
      const clickEvent = e.target.getAttribute("data-onclick");

      if (clickEvent) {
        onEvent(clickEvent);
      }
    },
    dangerouslySetInnerHTML: {
      __html: String(content)
    }
  }));
};
const ResultComponent = ({
  height = "100%",
  width = "100%",
  transformed,
  onEvent,
  events
}) => {
  // const x = useMotionValue(0);
  // const background = useTransform(
  //   x,
  //   [0, 300, 600],
  //   ["#ff008c", "#7700ff", "rgb(230, 255, 0)"],
  // );
  // const [{ xxx, yyy }, setIndexToShow] = React.useSta\te({ xxx: 0, yyy: 0 });
  const [{
    content
  }, setContent] = react__WEBPACK_IMPORTED_MODULE_1__["useState"]({
    content: transformed[0].rendered[transformed[0].rendered.length - 1] || "<p></p>"
  });
  react__WEBPACK_IMPORTED_MODULE_1__["useEffect"](() => {
    setContent({
      content: transformed[0].rendered[transformed[0].rendered.length - 1] || "<p></p>"
    });
  }, [transformed[0].renderedHash]);

  if (transformed[0].rendered.length === 0) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("p", null, "loading ", transformed[0].renderedHash);
  } // function _html(x: number, y: number) {
  //   // console.log(rendered );
  //   return transformed[Number(x)] &&
  //       transformed[Number(x)].rendered[Number(y)] || "<p>uu</p>";
  // }transformed[Number(x)].rendered[Number(y)];


  const divLength = 1000 / (events.length + 1); // const transCopy = [...transformed].map((t)=>{t.rendered=[...t.rendered].reverse(); return t;});

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    style: {
      position: "relative",
      textAlign: "right",
      width
    }
  }, transformed.map((t, k) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    key: t.renderedHash + k
  }, "ss ", t.renderedHash, "ss", events.map((event, renderContentKey) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    onMouseEnter: () => setContent({
      content: t.rendered[renderContentKey]
    }),
    style: {
      display: "inline-block",
      textAlign: "center",
      borderLeft: "1px solid red",
      height: "20px",
      width: divLength
    },
    key: t.renderedHash + renderContentKey
  }, event)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](framer_motion__WEBPACK_IMPORTED_MODULE_0__["motion"].div, {
    // layout
    drag: true,
    dragElastic: 0.5,
    dragMomentum: false,
    dragListener: true // onDrag={(event) => {
    //   const e = event as unknown as { layerX: number; layerY: number };
    //   // const htmlArray = new Array(100).fill(100);
    //   //console.log(event.layerY );
    //   const indexMaxY = transformed[0].rendered.length;
    //   let newIndexY = Math.floor(
    //     (indexMaxY * (e.layerY + 220)) / 200,
    //   );
    //   // console.log(event.layerY, newIndexY );
    //   if (newIndexc0 = 0;
    //   }
    //   if (newIndexY >= indexMaxY) {
    //     newIndexY = indexMaxY - 1;
    //   }
    //   const indexMax = transformed.length;
    //   let newIndex = Math.floor(
    //     (indexMax * (e.layerX + 909)) / 1000,
    //   );
    //   if (newIndex < 0) {
    //     // setIndexToShow({ yyy: newIndexY, xxx: 0 });
    //   }
    //   if (newIndex > indexMax) {
    //     // setIndexToShow({ yyy: newIndexY, xxx: indexMaxY });
    //     return;
    //   }
    //   setIndexToShow({ yyy: newIndexY, xxx: newIndex });
    // }}
    ,
    style: {
      position: "absolute",
      top: -220,
      right: 40
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_styledCodeBoxComps_tsx__WEBPACK_IMPORTED_MODULE_2__["ResultBox"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](HtmlPlayer, {
    key: content,
    content: content,
    onEvent: onEvent
  }))));
};

/***/ }),

/***/ "./src/components/codeBox/example.ts":
/*!*******************************************!*\
  !*** ./src/components/codeBox/example.ts ***!
  \*******************************************/
/*! exports provided: defaultProps, counterExample */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultProps", function() { return defaultProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "counterExample", function() { return counterExample; });
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "../../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");

const defaultProps = {
  events: ["reset"].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(new Array(8).fill("+1")))
};
const counterExample = `import React, { FC, useState } from "react";
import ReactDOM from "react-dom";

const Counter: FC<{ initial?: number }> = (
  { initial = 0 },
) => {
  const [clicks, setClicks] = useState(initial);

  return <div>
    <p>Clicks: {clicks}</p>
    <button onClick={() => setClicks(clicks + 1)}>+</button>
    <button onClick={() => setClicks(clicks - 1)}>-</button>
  </div>;
};

const rootElement = document.createElement("div");

ReactDOM.render(<Counter initial={0} />, rootElement);
document.body.appendChild(rootElement);

`;

/***/ }),

/***/ "./src/components/codeBox/styledCodeBoxComps.tsx":
/*!*******************************************************!*\
  !*** ./src/components/codeBox/styledCodeBoxComps.tsx ***!
  \*******************************************************/
/*! exports provided: Header, CodeContainer, ResultContainer, ErrorContainer, ResultBox, ResultBoxContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Header", function() { return Header; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeContainer", function() { return CodeContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResultContainer", function() { return ResultContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorContainer", function() { return ErrorContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResultBox", function() { return ResultBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResultBoxContainer", function() { return ResultBoxContainer; });
/* harmony import */ var _zedvision_emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zedvision/emotion-styled */ "../emotion-styled/dist/emotion-styled.modern.js");

const Header = _zedvision_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div`
    background: #3f51b5;
    font-family: "Roboto";
    margin: 0;@emotion/styled
    padding: 10px 20px 10px;
    color: white;
`;
const CodeContainer = _zedvision_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div`
    display: block;
    width: 100%;
    height: 70vh;
`;
const ResultContainer = _zedvision_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div`
    display: block;
    width: 100%;
`;
const ErrorContainer = _zedvision_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div`
    display: block;
    width: 100%;
    padding: 10px;
    color: white;
    background: red;
    height: 220px;
    pre{
        font-size: 1em;
        line-height: 1;
    }
`;
const ResultBox = _zedvision_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div`
    text-align: center;
    border-radius: 12px;
    width: 200px;
    height: 200px;
    display: flex;
    place-content: center;
    place-items: center;
    margin: 0;
    padding: 0;
    background: rgb(255, 255, 255) none repeat scroll 0% 0%;
    user-select: none;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 3px 0px, rgba(0, 0, 0, 0.06) 0px 10px 15px 0px;
`;
const ResultBoxContainer = _zedvision_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div`
    display: block;
    width: 150px;
    height: 150px;
    overflow: hidden;
`;

/***/ }),

/***/ "./src/components/layout.tsx":
/*!***********************************!*\
  !*** ./src/components/layout.tsx ***!
  \***********************************/
/*! exports provided: Layout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return Layout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_globalStyle_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/globalStyle.tsx */ "./src/components/utils/globalStyle.tsx");


const Layout = ({
  children
}) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_utils_globalStyle_tsx__WEBPACK_IMPORTED_MODULE_1__["GlobalStyle"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_utils_globalStyle_tsx__WEBPACK_IMPORTED_MODULE_1__["MainContainer"], null, children));

/***/ }),

/***/ "./src/components/seo.tsx":
/*!********************************!*\
  !*** ./src/components/seo.tsx ***!
  \********************************/
/*! exports provided: SEO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEO", function() { return SEO; });
/* harmony import */ var _public_page_data_sq_d_2841359383_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/page-data/sq/d/2841359383.json */ "./public/page-data/sq/d/2841359383.json");
var _public_page_data_sq_d_2841359383_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../public/page-data/sq/d/2841359383.json */ "./public/page-data/sq/d/2841359383.json", 1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-helmet */ "react-helmet");
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_2__);



/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

const SEO = ({
  description = "",
  lang = "en",
  meta = [],
  title
}) => {
  const {
    site
  } = _public_page_data_sq_d_2841359383_json__WEBPACK_IMPORTED_MODULE_0__.data;
  const metaDescription = description || site.siteMetadata.description;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_helmet__WEBPACK_IMPORTED_MODULE_2__["Helmet"], {
    htmlAttributes: {
      lang
    },
    title: title,
    titleTemplate: `%s | ${site.siteMetadata.title}`,
    meta: [{
      name: `description`,
      content: metaDescription
    }, {
      property: `og:title`,
      content: title
    }, {
      property: `og:description`,
      content: metaDescription
    }, {
      property: `og:type`,
      content: `website`
    }, {
      name: `twitter:card`,
      content: `summary`
    }, {
      name: `twitter:creator`,
      content: site.siteMetadata.social.twitter
    }, {
      name: `twitter:title`,
      content: title
    }, {
      name: `twitter:description`,
      content: metaDescription
    }].concat(meta)
  });
};

/***/ }),

/***/ "./src/components/utils/babel.ts":
/*!***************************************!*\
  !*** ./src/components/utils/babel.ts ***!
  \***************************************/
/*! exports provided: transform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transform", function() { return transform; });
/* harmony import */ var _sha_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sha.ts */ "./src/components/utils/sha.ts");

const cache = {};
const worker = typeof window !== "undefined" ? new Worker(URL.createObjectURL(new window.Blob([`
importScripts('https://unpkg.com/@babel/standalone@7.12.11/babel.min.js');

self.onmessage=(message)=>{
  const hash = message.data.hash;

try{
  const translatedMessage = Babel.transform(message.data.code, {
plugins: [],
presets: ["react", ["typescript", { isTSX: true, allExtensions: true }]],
}).code.replace("export const", "const").replace("import ", "//mport ").replace("import ", "//mport ")

    postMessage({hash, translatedCode: translatedMessage})
} catch(e){
  postMessage({hash, translatedCode: "error", error: e})
}

}
`], {
  type: "application/javascript"
}))) : {
  onmessage: () => {},
  postMessage: () => {}
};

worker.onmessage = async (message) => {
  const codeHash = message.data.hash;
  if (typeof cache[codeHash] === "string") return;

  if (typeof cache[codeHash] === "object") {
    if (message.data.error) {
      const errorHash = await Object(_sha_ts__WEBPACK_IMPORTED_MODULE_0__["hash"])(message.data.error);
      cache[codeHash].reject(errorHash);
      cache[codeHash] = {
        error: errorHash
      };
      return;
    }

    const transformedCodeHash = await Object(_sha_ts__WEBPACK_IMPORTED_MODULE_0__["hash"])(message.data.translatedCode);
    cache[codeHash].resolve(transformedCodeHash);
    cache[codeHash] = transformedCodeHash;
  }
};

const transform = async codeHash => {
  const code = await Object(_sha_ts__WEBPACK_IMPORTED_MODULE_0__["unHash"])(codeHash);
  if (typeof cache[codeHash] === "string") return cache[codeHash];

  if (typeof cache[codeHash] === "undefined") {
    worker.postMessage({
      hash: codeHash,
      code
    });
    const returnPromise = new Promise((resolve, reject) => {
      cache[codeHash] = {
        resolve,
        reject,
        promise: returnPromise
      };
    });
    return returnPromise;
  }

  if (cache[codeHash] && cache[codeHash].error) {
    return Promise.reject(cache[codeHash].error);
  }

  return cache[codeHash].promise;
};

/***/ }),

/***/ "./src/components/utils/fonts.ts":
/*!***************************************!*\
  !*** ./src/components/utils/fonts.ts ***!
  \***************************************/
/*! exports provided: fonts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fonts", function() { return fonts; });
// @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,800;0,900;1,500&display=swap');
const fonts = `
/* cyrillic-ext */
@font-face {
    font-family: 'Montserrat';
    font-style: italic;
    font-weight: 500;
    font-display: swap;
    src: local('Montserrat Medium Italic'), local('Montserrat-MediumItalic'), url(https://fonts.gstatic.com/s/montserrat/v15/JTUPjIg1_i6t8kCHKm459WxZOg3z8fZwnCo.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'Montserrat';
    font-style: italic;
    font-weight: 500;
    font-display: swap;
    src: local('Montserrat Medium Italic'), local('Montserrat-MediumItalic'), url(https://fonts.gstatic.com/s/montserrat/v15/JTUPjIg1_i6t8kCHKm459WxZOg3z-PZwnCo.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'Montserrat';
    font-style: italic;
    font-weight: 500;
    font-display: swap;
    src: local('Montserrat Medium Italic'), local('Montserrat-MediumItalic'), url(https://fonts.gstatic.com/s/montserrat/v15/JTUPjIg1_i6t8kCHKm459WxZOg3z8_ZwnCo.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'Montserrat';
    font-style: italic;
    font-weight: 500;
    font-display: swap;
    src: local('Montserrat Medium Italic'), local('Montserrat-MediumItalic'), url(https://fonts.gstatic.com/s/montserrat/v15/JTUPjIg1_i6t8kCHKm459WxZOg3z8vZwnCo.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Montserrat';
    font-style: italic;
    font-weight: 500;
    font-display: swap;
    src: local('Montserrat Medium Italic'), local('Montserrat-MediumItalic'), url(https://fonts.gstatic.com/s/montserrat/v15/JTUPjIg1_i6t8kCHKm459WxZOg3z_PZw.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: local('Montserrat ExtraBold'), local('Montserrat-ExtraBold'), url(https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_c5H3gTD_u50.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: local('Montserrat ExtraBold'), local('Montserrat-ExtraBold'), url(https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_c5H3g3D_u50.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: local('Montserrat ExtraBold'), local('Montserrat-ExtraBold'), url(https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_c5H3gbD_u50.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: local('Montserrat ExtraBold'), local('Montserrat-ExtraBold'), url(https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_c5H3gfD_u50.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: local('Montserrat ExtraBold'), local('Montserrat-ExtraBold'), url(https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_c5H3gnD_g.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: local('Montserrat Black'), local('Montserrat-Black'), url(https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_epG3gTD_u50.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: local('Montserrat Black'), local('Montserrat-Black'), url(https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_epG3g3D_u50.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: local('Montserrat Black'), local('Montserrat-Black'), url(https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_epG3gbD_u50.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: local('Montserrat Black'), local('Montserrat-Black'), url(https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_epG3gfD_u50.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: local('Montserrat Black'), local('Montserrat-Black'), url(https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_epG3gnD_g.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  `;

/***/ }),

/***/ "./src/components/utils/globalStyle.tsx":
/*!**********************************************!*\
  !*** ./src/components/utils/globalStyle.tsx ***!
  \**********************************************/
/*! exports provided: GlobalStyle, MainContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalStyle", function() { return GlobalStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainContainer", function() { return MainContainer; });
/* harmony import */ var _typography_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typography.ts */ "./src/components/utils/typography.ts");
/* harmony import */ var _normalize_css_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./normalize-css.tsx */ "./src/components/utils/normalize-css.tsx");
/* harmony import */ var _fonts_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fonts.ts */ "./src/components/utils/fonts.ts");
/* harmony import */ var _zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @zedvision/emotion-react */ "../emotion-react/dist/emotion-react.modern.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);



/** @jsx jsx */



const styles = _typography_ts__WEBPACK_IMPORTED_MODULE_0__["default"].createStyles().replace(/first-child/gi, "first-of-type");
const GlobalStyle = () => Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_3__["jsx"])(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_3__["jsx"])(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_3__["Global"], {
  styles: _zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_3__["css"]`
      ${_normalize_css_tsx__WEBPACK_IMPORTED_MODULE_1__["normalize"]}
      `
}));
const MainContainer = ({
  children
}) => Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_3__["jsx"])("div", {
  css: _zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_3__["css"]`
      ${_fonts_ts__WEBPACK_IMPORTED_MODULE_2__["fonts"]}
      ${styles}
  `
}, Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_3__["jsx"])("main", {
  css: _zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_3__["css"]`  
  max-width: 1140px;
  margin: auto;
  `
}, children));

/***/ }),

/***/ "./src/components/utils/normalize-css.tsx":
/*!************************************************!*\
  !*** ./src/components/utils/normalize-css.tsx ***!
  \************************************************/
/*! exports provided: normalize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
const normalize = `html {
  line-height: 1.15; 
  -webkit-text-size-adjust: 100%; 
}
body {
  margin: 0;
}
main {
  display: block;
}
h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
hr {
  box-sizing: content-box; 
  height: 0; 
  overflow: visible; 
}
pre {
  font-family: monospace, monospace; 
  font-size: 1em; 
}
a {
  background-color: transparent;
}
abbr[title] {
  border-bottom: none; 
  text-decoration: underline; 
  text-decoration: underline dotted; 
}
b,
strong {
  font-weight: bolder;
}
code,
kbd,
samp {
  font-family: monospace, monospace; 
  font-size: 1em; 
}
small {
  font-size: 80%;
}
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sub {
  bottom: -0.25em;
}
sup {
  top: -0.5em;
}
img {
  border-style: none;
}
button,
input,
optgroup,
select,
textarea {
  font-family: inherit; 
  font-size: 100%; 
  line-height: 1.15;
  margin: 0; 
}
button,
input {
  overflow: visible;
}
button,
select { 
  text-transform: none;
}
button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}
button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}
button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}
fieldset {
  padding: 0.35em 0.75em 0.625em;
}
legend {
  box-sizing: border-box; 
  color: inherit; 
  display: table; 
  max-width: 100%; 
  padding: 0; 
  white-space: normal; 
}
progress {
  vertical-align: baseline;
}

textarea {
  overflow: auto;
}

[type="checkbox"],
[type="radio"] {
  box-sizing: border-box; 
  padding: 0; 
}

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}
[type="search"] {
  -webkit-appearance: textfield; 
  outline-offset: -2px; 
}
[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}
::-webkit-file-upload-button {
  -webkit-appearance: button; 
  font: inherit; 
}
details {
  display: block;
}
summary {
  display: list-item;
}
template {
  display: none;
}
[hidden] {
  display: none;
}`;

/***/ }),

/***/ "./src/components/utils/renderer.ts":
/*!******************************************!*\
  !*** ./src/components/utils/renderer.ts ***!
  \******************************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var _renderer_renderer_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer/renderer.worker */ "./src/components/utils/renderer/renderer.worker.js");
/* harmony import */ var _renderer_renderer_worker__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_renderer_renderer_worker__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sha__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sha */ "./src/components/utils/sha.ts");


const {
  renderWorker
} = typeof window !== "undefined" && _renderer_renderer_worker__WEBPACK_IMPORTED_MODULE_0__();
const render = async (transformedCodeHash, defaultPropsHash) => {
  try {
    const code = await Object(_sha__WEBPACK_IMPORTED_MODULE_1__["unHash"])(transformedCodeHash);
    const defaultProps = await Object(_sha__WEBPACK_IMPORTED_MODULE_1__["unHash"])(defaultPropsHash);
    const renderResult = await renderWorker(code, defaultProps);
    if (typeof renderResult != "string") throw renderResult.error;
    const renderedStringHash = await Object(_sha__WEBPACK_IMPORTED_MODULE_1__["hash"])(renderResult);
    return renderedStringHash;
  } catch (e) {
    return {
      error: e
    };
  }
};

/***/ }),

/***/ "./src/components/utils/renderer/renderer.worker.js":
/*!**********************************************************!*\
  !*** ./src/components/utils/renderer/renderer.worker.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var addMethods=__webpack_require__(/*! ../../../../../../node_modules/workerize-loader/dist/rpc-wrapper.js */ "../../node_modules/workerize-loader/dist/rpc-wrapper.js");var methods=[];module.exports=function(){var w=new Worker(__webpack_require__.p+"f55a1c9de97ceb28d5fd.worker.js",{name:"[hash].worker.js"});addMethods(w,methods);return w;};

/***/ }),

/***/ "./src/components/utils/sha.ts":
/*!*************************************!*\
  !*** ./src/components/utils/sha.ts ***!
  \*************************************/
/*! exports provided: hash, unHash */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hash", function() { return hash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unHash", function() { return unHash; });
/* harmony import */ var _sha256_sha256_worker_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sha256/sha256.worker.ts */ "./src/components/utils/sha256/sha256.worker.ts");
/* harmony import */ var _sha256_sha256_worker_ts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sha256_sha256_worker_ts__WEBPACK_IMPORTED_MODULE_0__);

const hashTable = {};
const {
  sha256
} = typeof window !== "undefined" && _sha256_sha256_worker_ts__WEBPACK_IMPORTED_MODULE_0__();
const hash = async input => {
  const strInput = typeof input !== "string" ? JSON.stringify(input) : input;
  const hash = await sha256(strInput);
  const shorterHash = shortener(hash);
  hashTable[hash] = input;
  return shorterHash;

  function shortener(hash) {
    for (let i = 4; i < 64; i++) {
      const shorterHash = hash.substr(0, i);

      if (hashTable[shorterHash] === undefined) {
        hashTable[shorterHash] = hash;
        return shorterHash;
      }

      if (hashTable[shorterHash] === hash) return shorterHash;
    }

    return hash;
  }
};
const unHash = async (hash) => hashTable[hashTable[hash]];

/***/ }),

/***/ "./src/components/utils/sha256/sha256.ts":
/*!***********************************************!*\
  !*** ./src/components/utils/sha256/sha256.ts ***!
  \***********************************************/
/*! exports provided: sha256 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sha256", function() { return sha256; });
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert bytes to hex string

  const hashHex = hashArray.map(b => ("00" + b.toString(16)).slice(-2)).join("");
  return hashHex;
}

/***/ }),

/***/ "./src/components/utils/sha256/sha256.worker.ts":
/*!******************************************************!*\
  !*** ./src/components/utils/sha256/sha256.worker.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


				var addMethods = __webpack_require__(/*! ../../../../../../node_modules/workerize-loader/dist/rpc-wrapper.js */ "../../node_modules/workerize-loader/dist/rpc-wrapper.js")
				var methods = ["sha256"]
				module.exports = function() {
					var w = new Worker(__webpack_require__.p + "60279455279f06c16ede.worker.js", { name: "[hash].worker.js" })
					addMethods(w, methods)
					
					return w
				}
			

/***/ }),

/***/ "./src/components/utils/typography.ts":
/*!********************************************!*\
  !*** ./src/components/utils/typography.ts ***!
  \********************************************/
/*! exports provided: rhythm, scale, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rhythm", function() { return rhythm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony import */ var typography__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typography */ "../../node_modules/typography/dist/index.js");
/* harmony import */ var typography__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typography__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typography_theme_wordpress_2016__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typography-theme-wordpress-2016 */ "../../node_modules/typography-theme-wordpress-2016/dist/index.js");
/* harmony import */ var typography_theme_wordpress_2016__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typography_theme_wordpress_2016__WEBPACK_IMPORTED_MODULE_1__);


const typography = new typography__WEBPACK_IMPORTED_MODULE_0___default.a(typography_theme_wordpress_2016__WEBPACK_IMPORTED_MODULE_1___default.a); // // Hot reload typography in development.
// if (process.env.NODE_ENV !== `production`) {
//   typography.injectStyles();
// }

const rhythm = typography.rhythm;
const scale = typography.scale;
/* harmony default export */ __webpack_exports__["default"] = (typography);

/***/ }),

/***/ "./src/components/zed-profile-pic.jpg":
/*!********************************************!*\
  !*** ./src/components/zed-profile-pic.jpg ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/zed-profile-pic-cd941e033fafca9e98b23dae7e5a0ccc.jpg";

/***/ }),

/***/ "./src/pages/404.tsx":
/*!***************************!*\
  !*** ./src/pages/404.tsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "../../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_layout_tsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/layout.tsx */ "./src/components/layout.tsx");
/* harmony import */ var _components_seo_tsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/seo.tsx */ "./src/components/seo.tsx");
/* harmony import */ var _components_utils_sha256_sha256_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/utils/sha256/sha256.ts */ "./src/components/utils/sha256/sha256.ts");
/* harmony import */ var _components_code_getUser_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/code/getUser.ts */ "./src/components/code/getUser.ts");






/* harmony default export */ __webpack_exports__["default"] = (function () {
  let pathname = "";

  if (typeof window !== `undefined`) {
    pathname = new URL(location.href).pathname.substr(1);
  }

  const isKey = str => Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(str.slice(0, 8)).filter(x => x < "0" || x > "f").length === 0;

  const needToCheck = pathname.length === 8 && isKey(pathname);
  const [is404, set404] = react__WEBPACK_IMPORTED_MODULE_1___default.a.useState(false);
  react__WEBPACK_IMPORTED_MODULE_1___default.a.useEffect(() => {
    const runner = async () => {
      try {
        console.log(pathname);
        const key = pathname;
        const uuid = await Object(_components_code_getUser_ts__WEBPACK_IMPORTED_MODULE_5__["getUserId"])();
        console.log(uuid);
        const uuidHash = (await Object(_components_utils_sha256_sha256_ts__WEBPACK_IMPORTED_MODULE_4__["sha256"])(uuid)).substring(0, 8);
        console.log(uuidHash);
        const checkKeyUuid = (await Object(_components_utils_sha256_sha256_ts__WEBPACK_IMPORTED_MODULE_4__["sha256"])(key + uuid)).substring(0, 8);
        const checkHashUuidHash = (await Object(_components_utils_sha256_sha256_ts__WEBPACK_IMPORTED_MODULE_4__["sha256"])(key + uuidHash)).substring(0, 8);
        console.log({
          key,
          uuidHash,
          checkKeyUuid,
          checkHashUuidHash
        });
        const response = await fetch(`https://code.zed.vision/connect?key=${key}${uuidHash}${checkKeyUuid}${checkHashUuidHash}`);
        const data = await response.json();

        if (data.success) {
          location.href = "https://zed.vision/code/";
        } else {
          set404(true);
        }
      } catch (e) {
        console.error(e);
        set404(true);
      }
    };

    if (typeof window !== "undefined") {
      if (needToCheck) runner();else set404(true);
    }
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, is404 === true && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_layout_tsx__WEBPACK_IMPORTED_MODULE_2__["Layout"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_seo_tsx__WEBPACK_IMPORTED_MODULE_3__["SEO"], {
    title: "404: Not Found"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", null, "This page is not a page: ", pathname), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "Let's say, its a 404 page.")), is404 === false && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null));
});

/***/ }),

/***/ "./src/pages/codebox.tsx":
/*!*******************************!*\
  !*** ./src/pages/codebox.tsx ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Page; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_codeBox_CodeBox_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/codeBox/CodeBox.tsx */ "./src/components/codeBox/CodeBox.tsx");
/* harmony import */ var _components_layout_tsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/layout.tsx */ "./src/components/layout.tsx");
/* harmony import */ var _components_seo_tsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/seo.tsx */ "./src/components/seo.tsx");




function Page() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_layout_tsx__WEBPACK_IMPORTED_MODULE_2__["Layout"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_seo_tsx__WEBPACK_IMPORTED_MODULE_3__["SEO"], {
    title: "Code Box"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", null, "Code box"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "Lets see!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_codeBox_CodeBox_tsx__WEBPACK_IMPORTED_MODULE_1__["CodeBox"], {
    title: "Example1 :)"
  }));
}

/***/ }),

/***/ "./src/pages/example.tsx":
/*!*******************************!*\
  !*** ./src/pages/example.tsx ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zedvision/emotion-react */ "../emotion-react/dist/emotion-react.modern.js");

/** @jsx jsx */



const Slider = () => {
  const steps = 128;
  const {
    0: sliderValue,
    1: setSlider
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(steps / 2);
  return Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_1__["jsx"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_1__["jsx"])("input", {
    max: steps,
    css: _zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_1__["css"]`
        appearance: none;
        width: 100%;
        height: 40px; 
        background: rgb(${255 / steps * sliderValue} ${255 / steps * (steps - sliderValue)} 0); 
        outline: none; 
    `,
    type: "range",
    "aria-label": "font size changer",
    value: sliderValue,
    step: "1",
    onChangeCapture: e => setSlider(Number(e.currentTarget.value))
  }), Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_1__["jsx"])("p", {
    css: _zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_1__["css"]`
        font-size: ${72 / steps * sliderValue}px
        `
  }, "Example when the text gets bigger..."), Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_1__["jsx"])("p", {
    css: _zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_1__["css"]`
        font-size: ${72 / steps * (steps - sliderValue)}px
        `
  }, "...or smaller"));
};

/* harmony default export */ __webpack_exports__["default"] = (() => Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_1__["jsx"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_1__["jsx"])(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_1__["Global"], {
  styles: _zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_1__["css"]`
      body{
          margin: 0;
          overflow: overlay;
        }  
    `
}), Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_1__["jsx"])(Slider, null)));

/***/ }),

/***/ "./src/pages/index.tsx":
/*!*****************************!*\
  !*** ./src/pages/index.tsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zedvision/emotion-react */ "../emotion-react/dist/emotion-react.modern.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var _components_bio__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/bio */ "./src/components/bio.tsx");
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/layout */ "./src/components/layout.tsx");
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/seo */ "./src/components/seo.tsx");
/* harmony import */ var _components_code_getUser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/code/getUser */ "./src/components/code/getUser.ts");
/* harmony import */ var _components_utils_typography__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/utils/typography */ "./src/components/utils/typography.ts");
/* harmony import */ var _components_code_Qr__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/code/Qr */ "./src/components/code/Qr.tsx");
/* harmony import */ var _assets_forkMe_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../assets/forkMe.png */ "./assets/forkMe.png");
/* harmony import */ var _assets_forkMe_png__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_assets_forkMe_png__WEBPACK_IMPORTED_MODULE_9__);
/// <reference types="@zedvision/emotion-react/types/css-prop" />

/** @jsx jsx */











const isMobile = () => {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
};

const BlogIndex = ({
  data
}) => {
  const edges = data.allMdx.edges;
  react__WEBPACK_IMPORTED_MODULE_1__["useEffect"](() => {
    if (typeof window !== "undefined") {
      const install = async () => {
        console.log(await Object(_components_code_getUser__WEBPACK_IMPORTED_MODULE_6__["getUserId"])());
      };

      install(); // registerSW();
    }
  }, []);
  return Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_layout__WEBPACK_IMPORTED_MODULE_4__["Layout"], null, Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_seo__WEBPACK_IMPORTED_MODULE_5__["SEO"], {
    title: "This is Zed vision"
  }), isMobile() === false ? Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h1", null, "Link your mobile with this code: ", Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_code_Qr__WEBPACK_IMPORTED_MODULE_8__["Qr"], null)) : Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h1", null, "This is my blog."), Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__["jsx"])("a", {
    href: "https://github.com/zed-vision/monorepo"
  }, Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__["jsx"])("img", {
    loading: "lazy",
    width: "149",
    height: "149",
    src: _assets_forkMe_png__WEBPACK_IMPORTED_MODULE_9___default.a,
    style: {
      position: "absolute",
      top: 0,
      right: 0
    },
    alt: "Fork me on GitHub"
  })), edges.map(({
    node
  }) => {
    const title = node.frontmatter.title || node.fields.slug;
    return Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__["jsx"])("article", {
      key: node.fields.slug
    }, Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__["jsx"])("header", null, Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h3", {
      css: _zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__["css"]`  
                      margin-bottom: ${Object(_components_utils_typography__WEBPACK_IMPORTED_MODULE_7__["rhythm"])(1 / 4)};
                      `
    }, Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__["jsx"])(gatsby__WEBPACK_IMPORTED_MODULE_2__["Link"], {
      css: _zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__["css"]`    
                    box-shadow: "none";
                  `,
      to: node.fields.slug
    }, title)), Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__["jsx"])("small", null, node.frontmatter.date)), Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__["jsx"])("section", null, Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
      dangerouslySetInnerHTML: {
        __html: node.frontmatter.description || node.excerpt
      }
    })));
  }), Object(_zedvision_emotion_react__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_bio__WEBPACK_IMPORTED_MODULE_3__["Bio"], null));
};

/* harmony default export */ __webpack_exports__["default"] = (BlogIndex);
const pageQuery = "497448492";

/***/ }),

/***/ "./src/pages/offline-plugin-app-shell-fallback.tsx":
/*!*********************************************************!*\
  !*** ./src/pages/offline-plugin-app-shell-fallback.tsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layout_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/layout.tsx */ "./src/components/layout.tsx");
/* harmony import */ var _components_seo_tsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/seo.tsx */ "./src/components/seo.tsx");




const NotFoundPage = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_layout_tsx__WEBPACK_IMPORTED_MODULE_1__["Layout"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_seo_tsx__WEBPACK_IMPORTED_MODULE_2__["SEO"], {
    title: "... offline"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", null, "Maybe you are offline"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "Check your internet connection"));
};

/* harmony default export */ __webpack_exports__["default"] = (NotFoundPage);
const pageQuery = "3159585216";

/***/ }),

/***/ "./src/pages/using-typescript.tsx":
/*!****************************************!*\
  !*** ./src/pages/using-typescript.tsx ***!
  \****************************************/
/*! exports provided: default, query */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "query", function() { return query; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/layout */ "./src/components/layout.tsx");
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/seo */ "./src/components/seo.tsx");
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");



 // If you don't want to use TypeScript you can delete this file!

const UsingTypescript = ({
  path
}) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_layout__WEBPACK_IMPORTED_MODULE_1__["Layout"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_seo__WEBPACK_IMPORTED_MODULE_2__["SEO"], {
  title: "Using TypeScript"
}), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", null, "Gatsby supports TypeScript by default!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "This means that you can create and write ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("em", null, ".ts/.tsx"), "files for your pages, components etc. Please note that the ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("em", null, "gatsby-*.js"), " files (like gatsby-node.js) currently do not support TypeScript yet."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "For type checking you will want to install ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("em", null, "typescript"), "via npm and run ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("em", null, "tsc --init"), " to create a ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("em", null, ".tsconfig"), " file."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "You are currently on the page ", path, "\\\\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](gatsby__WEBPACK_IMPORTED_MODULE_3__["Link"], {
  to: "/"
}, "Go back to the homepage"));

/* harmony default export */ __webpack_exports__["default"] = (UsingTypescript);
const query = null;

/***/ }),

/***/ "./src/templates/blog-post.tsx":
/*!*************************************!*\
  !*** ./src/templates/blog-post.tsx ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var _components_bio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/bio */ "./src/components/bio.tsx");
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/layout */ "./src/components/layout.tsx");
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/seo */ "./src/components/seo.tsx");
/* harmony import */ var _components_utils_typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/utils/typography */ "./src/components/utils/typography.ts");
/* harmony import */ var gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gatsby-plugin-mdx */ "../../node_modules/gatsby-plugin-mdx/index.js");
/* harmony import */ var gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _zedvision_emotion_styled__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @zedvision/emotion-styled */ "../emotion-styled/dist/emotion-styled.modern.js");
/* harmony import */ var _components_codeBox_CodeBox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/codeBox/CodeBox */ "./src/components/codeBox/CodeBox.tsx");
/* harmony import */ var _mdx_js_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mdx-js/react */ "../../node_modules/@mdx-js/react/dist/esm.js");










const components = {
  pre: function PreComp(props) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", props);
  },
  code: _components_codeBox_CodeBox__WEBPACK_IMPORTED_MODULE_8__["CodeBox"]
};
const StyledHeader = _zedvision_emotion_styled__WEBPACK_IMPORTED_MODULE_7__["default"].h1`
  margin-top: ${Object(_components_utils_typography__WEBPACK_IMPORTED_MODULE_5__["rhythm"])(1)};
  margin-bottom: 0;
`;
const {
  fontSize,
  lineHeight
} = Object(_components_utils_typography__WEBPACK_IMPORTED_MODULE_5__["scale"])(1 / 5);
const StyledDate = _zedvision_emotion_styled__WEBPACK_IMPORTED_MODULE_7__["default"].p`
  font-size: ${fontSize};
  line-height: ${lineHeight};
  display: block;
  margin-bottom: ${Object(_components_utils_typography__WEBPACK_IMPORTED_MODULE_5__["rhythm"])(1)};
`;
const Hr = _zedvision_emotion_styled__WEBPACK_IMPORTED_MODULE_7__["default"].hr`
  margin-bottom: ${Object(_components_utils_typography__WEBPACK_IMPORTED_MODULE_5__["rhythm"])(1)};
`;

const BlogPostTemplate = ({
  data,
  pageContext
}) => {
  const post = data.mdx;
  const {
    previous,
    next
  } = pageContext;

  const BlogPost = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_mdx_js_react__WEBPACK_IMPORTED_MODULE_9__["MDXProvider"], {
    components: components
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_6__["MDXRenderer"], null, post.body));

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_layout__WEBPACK_IMPORTED_MODULE_3__["Layout"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_seo__WEBPACK_IMPORTED_MODULE_4__["SEO"], {
    title: post.frontmatter.title,
    description: post.frontmatter.description || post.excerpt
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("header", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](StyledHeader, null, post.frontmatter.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](StyledDate, null, post.frontmatter.date)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](BlogPost, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](Hr, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("footer", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_bio__WEBPACK_IMPORTED_MODULE_2__["Bio"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("nav", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", null, previous && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](gatsby__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: previous.fields.slug,
    rel: "prev"
  }, "\u2190 ", previous.frontmatter.title)), next && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](gatsby__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: next.fields.slug,
    rel: "next"
  }, next.frontmatter.title, " \u2192"))))));
};

/* harmony default export */ __webpack_exports__["default"] = (BlogPostTemplate);
const pageQuery = "2168380918";

/***/ }),

/***/ "@reach/router":
/*!******************************************************************!*\
  !*** external "/z/monorepo/node_modules/@reach/router/index.js" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__reach_router__;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_fs__;

/***/ }),

/***/ "lodash":
/*!************************************************************!*\
  !*** external "/z/monorepo/node_modules/lodash/lodash.js" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_path__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react_dom_server__;

/***/ }),

/***/ "react-helmet":
/*!*******************************!*\
  !*** external "react-helmet" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react_helmet__;

/***/ })

/******/ });
});
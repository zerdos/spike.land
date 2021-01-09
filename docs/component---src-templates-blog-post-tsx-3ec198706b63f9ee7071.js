(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[14],{

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(45);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _components_bio__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(76);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15);
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(16);
/* harmony import */ var _components_utils_typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(42);
/* harmony import */ var gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(163);
/* harmony import */ var gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_codeBox_CodeBox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(78);
/* harmony import */ var _mdx_js_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(33);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1);











var components = {
  pre: function PreComp(props) {
    return Object(_emotion_react__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])("div", props);
  },
  code: _components_codeBox_CodeBox__WEBPACK_IMPORTED_MODULE_8__[/* CodeBox */ "a"]
};

var StyledHeader = Object(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])("h1", {
  target: "e1mbanj62",
  label: "StyledHeader"
})("margin-top:", Object(_components_utils_typography__WEBPACK_IMPORTED_MODULE_6__[/* rhythm */ "a"])(1), ";margin-bottom:0;" + ( true ? "" : undefined));

var _scale = Object(_components_utils_typography__WEBPACK_IMPORTED_MODULE_6__[/* scale */ "b"])(1 / 5),
    fontSize = _scale.fontSize,
    lineHeight = _scale.lineHeight;

var StyledDate = Object(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])("p", {
  target: "e1mbanj61",
  label: "StyledDate"
})("font-size:", fontSize, ";line-height:", lineHeight, ";display:block;margin-bottom:", Object(_components_utils_typography__WEBPACK_IMPORTED_MODULE_6__[/* rhythm */ "a"])(1), ";" + ( true ? "" : undefined));

var Hr = Object(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])("hr", {
  target: "e1mbanj60",
  label: "Hr"
})("margin-bottom:", Object(_components_utils_typography__WEBPACK_IMPORTED_MODULE_6__[/* rhythm */ "a"])(1), ";" + ( true ? "" : undefined));

var BlogPostTemplate = function BlogPostTemplate(_ref) {
  var data = _ref.data,
      pageContext = _ref.pageContext;
  var post = data.mdx;
  var previous = pageContext.previous,
      next = pageContext.next;

  var BlogPost = function BlogPost() {
    return Object(_emotion_react__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_mdx_js_react__WEBPACK_IMPORTED_MODULE_9__["MDXProvider"], {
      components: components
    }, Object(_emotion_react__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_7__["MDXRenderer"], null, post.body));
  };

  return Object(_emotion_react__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_emotion_react__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_components_layout__WEBPACK_IMPORTED_MODULE_4__[/* Layout */ "a"], null, Object(_emotion_react__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_components_seo__WEBPACK_IMPORTED_MODULE_5__[/* SEO */ "a"], {
    title: post.frontmatter.title,
    description: post.frontmatter.description || post.excerpt
  }), Object(_emotion_react__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])("header", null, Object(_emotion_react__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(StyledHeader, null, post.frontmatter.title), Object(_emotion_react__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(StyledDate, null, post.frontmatter.date)), Object(_emotion_react__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(BlogPost, null), Object(_emotion_react__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(Hr, null), Object(_emotion_react__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])("footer", null, Object(_emotion_react__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_components_bio__WEBPACK_IMPORTED_MODULE_3__[/* Bio */ "a"], null)), Object(_emotion_react__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])("nav", null, Object(_emotion_react__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])("ul", null, previous && Object(_emotion_react__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])("li", null, Object(_emotion_react__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(gatsby__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    to: previous.fields.slug,
    rel: "prev"
  }, "\u2190 ", previous.frontmatter.title)), next && Object(_emotion_react__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])("li", null, Object(_emotion_react__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(gatsby__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    to: next.fields.slug,
    rel: "next"
  }, next.frontmatter.title, " \u2192"))))));
};

/* harmony default export */ __webpack_exports__["default"] = (BlogPostTemplate);
var pageQuery = "2168380918";

/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Welcome to gatsby-plugin-mdx!
 *
 * Start reading in gatsby-node.js
 */var MDXRenderer=__webpack_require__(164);module.exports={MDXRenderer:MDXRenderer};

/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

var _construct=__webpack_require__(165);var _toConsumableArray=__webpack_require__(168);var _defineProperty=__webpack_require__(173);var _objectWithoutPropertiesLoose=__webpack_require__(64);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}var React=__webpack_require__(0);var _require=__webpack_require__(33),mdx=_require.mdx;var _require2=__webpack_require__(60),useMDXScope=_require2.useMDXScope;module.exports=function MDXRenderer(_ref){var scope=_ref.scope,children=_ref.children,props=_objectWithoutPropertiesLoose(_ref,["scope","children"]);var mdxScope=useMDXScope(scope);// Memoize the compiled component
var End=React.useMemo(function(){if(!children){return null;}var fullScope=_objectSpread({// React is here just in case the user doesn't pass them in
// in a manual usage of the renderer
React:React,mdx:mdx},mdxScope);var keys=Object.keys(fullScope);var values=keys.map(function(key){return fullScope[key];});var fn=_construct(Function,["_fn"].concat(_toConsumableArray(keys),[""+children]));return fn.apply(void 0,[{}].concat(_toConsumableArray(values)));},[children,scope]);return React.createElement(End,_objectSpread({},props));};

/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(166);

var isNativeReflectConstruct = __webpack_require__(167);

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

/***/ 166:
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

/***/ 167:
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

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(169);

var iterableToArray = __webpack_require__(170);

var unsupportedIterableToArray = __webpack_require__(171);

var nonIterableSpread = __webpack_require__(172);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(77);

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ 170:
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(77);

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

/***/ 172:
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ 173:
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

/***/ 77:
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;

/***/ })

}]);
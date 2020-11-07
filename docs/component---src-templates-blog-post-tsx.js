(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[16],{

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageQuery", function() { return pageQuery; });
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony import */ var _components_bio__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(52);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(20);
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(17);
/* harmony import */ var _components_utils_typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(26);
/* harmony import */ var gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(174);
/* harmony import */ var gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_codeBox_CodeBox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(88);
/* harmony import */ var _mdx_js_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(42);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1);











var components = {
  pre: function PreComp(props) {
    return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "b"])("div", props);
  },
  code: _components_codeBox_CodeBox__WEBPACK_IMPORTED_MODULE_8__[/* CodeBox */ "a"]
};

var StyledHeader = Object(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])("h1", {
  target: "egkikmm0"
})("margin-top:", Object(_components_utils_typography__WEBPACK_IMPORTED_MODULE_6__[/* rhythm */ "b"])(1), ";margin-bottom:0;" + ( true ? "" : undefined));

var _scale = Object(_components_utils_typography__WEBPACK_IMPORTED_MODULE_6__[/* scale */ "c"])(1 / 5),
    fontSize = _scale.fontSize,
    lineHeight = _scale.lineHeight;

var StyledDate = Object(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])("p", {
  target: "egkikmm1"
})("font-size:", fontSize, ";line-height:", lineHeight, ";display:block;margin-bottom:", Object(_components_utils_typography__WEBPACK_IMPORTED_MODULE_6__[/* rhythm */ "b"])(1), ";" + ( true ? "" : undefined));

var Hr = Object(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])("hr", {
  target: "egkikmm2"
})("margin-bottom:", Object(_components_utils_typography__WEBPACK_IMPORTED_MODULE_6__[/* rhythm */ "b"])(1), ";" + ( true ? "" : undefined));

var BlogPostTemplate = function BlogPostTemplate(_ref) {
  var data = _ref.data,
      pageContext = _ref.pageContext;
  var post = data.mdx;
  var previous = pageContext.previous,
      next = pageContext.next;

  var BlogPost = function BlogPost() {
    return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "b"])(_mdx_js_react__WEBPACK_IMPORTED_MODULE_9__["MDXProvider"], {
      components: components
    }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "b"])(gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_7__["MDXRenderer"], null, post.body));
  };

  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "b"])(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "b"])(_components_layout__WEBPACK_IMPORTED_MODULE_4__[/* Layout */ "a"], null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "b"])(_components_seo__WEBPACK_IMPORTED_MODULE_5__[/* SEO */ "a"], {
    title: post.frontmatter.title,
    description: post.frontmatter.description || post.excerpt
  }), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "b"])("header", null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "b"])(StyledHeader, null, post.frontmatter.title), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "b"])(StyledDate, null, post.frontmatter.date)), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "b"])(BlogPost, null), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "b"])(Hr, null), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "b"])("footer", null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "b"])(_components_bio__WEBPACK_IMPORTED_MODULE_3__[/* Bio */ "a"], null)), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "b"])("nav", null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "b"])("ul", null, previous && Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "b"])("li", null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "b"])(gatsby__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    to: previous.fields.slug,
    rel: "prev"
  }, "\u2190 ", previous.frontmatter.title)), next && Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "b"])("li", null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "b"])(gatsby__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    to: next.fields.slug,
    rel: "next"
  }, next.frontmatter.title, " \u2192"))))));
};

/* harmony default export */ __webpack_exports__["default"] = (BlogPostTemplate);
var pageQuery = "2168380918";

/***/ }),

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Welcome to gatsby-plugin-mdx!
 *
 * Start reading in gatsby-node.js
 */var MDXRenderer=__webpack_require__(175);module.exports={MDXRenderer:MDXRenderer};

/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

var _construct=__webpack_require__(176);var _toConsumableArray=__webpack_require__(54);var _defineProperty=__webpack_require__(34);var _objectWithoutPropertiesLoose=__webpack_require__(77);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}var React=__webpack_require__(0);var _require=__webpack_require__(42),mdx=_require.mdx;var _require2=__webpack_require__(75),useMDXScope=_require2.useMDXScope;module.exports=function MDXRenderer(_ref){var scope=_ref.scope,children=_ref.children,props=_objectWithoutPropertiesLoose(_ref,["scope","children"]);var mdxScope=useMDXScope(scope);// Memoize the compiled component
var End=React.useMemo(function(){if(!children){return null;}var fullScope=_objectSpread({// React is here just in case the user doesn't pass them in
// in a manual usage of the renderer
React:React,mdx:mdx},mdxScope);var keys=Object.keys(fullScope);var values=keys.map(function(key){return fullScope[key];});var fn=_construct(Function,["_fn"].concat(_toConsumableArray(keys),[""+children]));return fn.apply(void 0,[{}].concat(_toConsumableArray(values)));},[children,scope]);return React.createElement(End,_objectSpread({},props));};

/***/ }),

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(177);

var isNativeReflectConstruct = __webpack_require__(178);

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

/***/ 177:
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

/***/ 178:
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

/***/ 27:
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

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bio; });
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_typography__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(26);
/* harmony import */ var _zed_profile_pic_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(53);
/* harmony import */ var _zed_profile_pic_jpg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_zed_profile_pic_jpg__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1);






var Container = Object(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])("div", {
  target: "e10dbsa30"
})("margin-top:", Object(_utils_typography__WEBPACK_IMPORTED_MODULE_2__[/* rhythm */ "b"])(2.5), ";display:flex;margin-bottom:", Object(_utils_typography__WEBPACK_IMPORTED_MODULE_2__[/* rhythm */ "b"])(2.5), ";" + ( true ? "" : undefined));

var StyledImgDiv = Object(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])("div", {
  target: "e10dbsa31"
})("margin-right:", Object(_utils_typography__WEBPACK_IMPORTED_MODULE_2__[/* rhythm */ "b"])(1 / 2), ";margin-bottom:0;overflow:hidden;width:50px;height:50px;border-radius:25px;" + ( true ? "" : undefined));

var Bio = function Bio() {
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_4__[/* jsx */ "b"])(Container, null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_4__[/* jsx */ "b"])(StyledImgDiv, null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_4__[/* jsx */ "b"])("img", {
    alt: "Zoltan Erdos",
    src: _zed_profile_pic_jpg__WEBPACK_IMPORTED_MODULE_3___default.a
  })), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_4__[/* jsx */ "b"])("p", null, "Written by ", Object(_emotion_core__WEBPACK_IMPORTED_MODULE_4__[/* jsx */ "b"])("strong", null, "Zoltan Erdos"), "developer experience and software quality expert", Object(_emotion_core__WEBPACK_IMPORTED_MODULE_4__[/* jsx */ "b"])("br", null), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_4__[/* jsx */ "b"])("a", {
    href: "https://twitter.com/ZoltanErdos"
  }, "Follow me on Twitter")));
};

/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/zed-profile-pic-5e9304b71289e19e25c128ce8fa758fe.jpg";

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(55);

var iterableToArray = __webpack_require__(56);

var unsupportedIterableToArray = __webpack_require__(57);

var nonIterableSpread = __webpack_require__(58);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(27);

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ 56:
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(27);

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

/***/ 58:
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ })

}]);
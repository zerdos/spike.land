(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "0yTM":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Welcome to gatsby-plugin-mdx!
 *
 * Start reading in gatsby-node.js
 */var MDXRenderer=__webpack_require__("M6MO");module.exports={MDXRenderer:MDXRenderer};

/***/ }),

/***/ "KEM+":
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

/***/ "M6MO":
/***/ (function(module, exports, __webpack_require__) {

var _construct=__webpack_require__("rDK1");var _toConsumableArray=__webpack_require__("RhWx");var _defineProperty=__webpack_require__("KEM+");var _objectWithoutPropertiesLoose=__webpack_require__("LdEA");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}var React=__webpack_require__("ERkP");var _require=__webpack_require__("ZVZ0"),mdx=_require.mdx;var _require2=__webpack_require__("Amv9"),useMDXScope=_require2.useMDXScope;module.exports=function MDXRenderer(_ref){var scope=_ref.scope,children=_ref.children,props=_objectWithoutPropertiesLoose(_ref,["scope","children"]);var mdxScope=useMDXScope(scope);// Memoize the compiled component
var End=React.useMemo(function(){if(!children){return null;}var fullScope=_objectSpread({// React is here just in case the user doesn't pass them in
// in a manual usage of the renderer
React:React,mdx:mdx},mdxScope);var keys=Object.keys(fullScope);var values=keys.map(function(key){return fullScope[key];});var fn=_construct(Function,["_fn"].concat(_toConsumableArray(keys),[""+children]));return fn.apply(void 0,[{}].concat(_toConsumableArray(values)));},[children,scope]);return React.createElement(End,_objectSpread({},props));};

/***/ }),

/***/ "RhWx":
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__("tGbD");

var iterableToArray = __webpack_require__("twbh");

var unsupportedIterableToArray = __webpack_require__("peMk");

var nonIterableSpread = __webpack_require__("d8WC");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ "TcdR":
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

/***/ "cZrw":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: /home/z/z/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteralLoose.js
var taggedTemplateLiteralLoose = __webpack_require__("fhSp");

// EXTERNAL MODULE: /home/z/z/node_modules/@emotion/react/dist/emotion-react.browser.esm.js + 12 modules
var emotion_react_browser_esm = __webpack_require__("f7k3");

// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js
var gatsby_browser_entry = __webpack_require__("Wbzz");

// EXTERNAL MODULE: ./src/components/bio.tsx
var bio = __webpack_require__("IgZc");

// EXTERNAL MODULE: ./src/components/layout.tsx
var layout = __webpack_require__("9Dj+");

// EXTERNAL MODULE: ./src/components/seo.tsx
var seo = __webpack_require__("H8eV");

// EXTERNAL MODULE: ./src/components/utils/typography.ts
var typography = __webpack_require__("cINY");

// EXTERNAL MODULE: /home/z/z/node_modules/gatsby-plugin-mdx/index.js
var gatsby_plugin_mdx = __webpack_require__("0yTM");

// EXTERNAL MODULE: /home/z/z/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__("VtSi");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: /home/z/z/node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("3yYM");

// EXTERNAL MODULE: /home/z/z/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("QsI/");

// EXTERNAL MODULE: /home/z/z/node_modules/react/index.js
var react = __webpack_require__("ERkP");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// CONCATENATED MODULE: ./src/components/codeBox/CodeBox.tsx




var CodeBox_CodeBox = function CodeBox(_ref) {
  var title = _ref.title,
      children = _ref.children;
  var starterCode = children === null || children === void 0 ? void 0 : children.toString().trim();
  if (typeof window === "undefined") return /*#__PURE__*/react_default.a.createElement("pre", null, "Loading");
  react_default.a.useEffect(function () {
    function start() {
      return _start.apply(this, arguments);
    }

    function _start() {
      _start = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
        var _yield$Function, run;

        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return new Function("return import(\"https://code.zed.vision/js/codeLoader.js\")")();

              case 2:
                _yield$Function = _context.sent;
                run = _yield$Function.run;
                run("embedded", window, starterCode);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _start.apply(this, arguments);
    }

    start();
  }, []);
  return /*#__PURE__*/react_default.a.createElement("div", null, !!title && /*#__PURE__*/react_default.a.createElement("div", {
    style: {
      background: "#3f51b5",
      fontFamily: "Roboto",
      margin: 0,
      padding: "10px 20px 10px",
      color: "white"
    }
  }, /*#__PURE__*/react_default.a.createElement("span", null, title), /*#__PURE__*/react_default.a.createElement("button", {
    onClick: function onClick() {
      //@ts-ignore
      var _window = window,
          monaco = _window.monaco;
      monaco.editor.getModel("file:///main.tsx").setValue(starterCode);
    }
  }, "Reset")), /*#__PURE__*/react_default.a.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/react_default.a.createElement("div", {
    style: {
      width: "100%",
      height: "70vh"
    },
    id: "editor"
  }), /*#__PURE__*/react_default.a.createElement("div", {
    style: {
      height: "0px"
    },
    id: "preview"
  })));
};
// EXTERNAL MODULE: /home/z/z/node_modules/@mdx-js/react/dist/esm.js
var esm = __webpack_require__("ZVZ0");

// CONCATENATED MODULE: ./src/templates/blog-post.tsx


var _templateObject, _templateObject2, _templateObject3;


/** @jsx jsx */









var components = {
  pre: function PreComp(props) {
    return Object(emotion_react_browser_esm["c" /* jsx */])("div", props);
  },
  code: CodeBox_CodeBox
};

var _scale = Object(typography["b" /* scale */])(1 / 5),
    fontSize = _scale.fontSize,
    lineHeight = _scale.lineHeight;

var blog_post_BlogPostTemplate = function BlogPostTemplate(_ref) {
  var data = _ref.data,
      pageContext = _ref.pageContext;
  var post = data.mdx;
  var previous = pageContext.previous,
      next = pageContext.next;

  var BlogPost = function BlogPost() {
    return Object(emotion_react_browser_esm["c" /* jsx */])(esm["MDXProvider"], {
      components: components
    }, Object(emotion_react_browser_esm["c" /* jsx */])(gatsby_plugin_mdx["MDXRenderer"], null, post.body));
  };

  return Object(emotion_react_browser_esm["c" /* jsx */])(layout["a" /* Layout */], null, Object(emotion_react_browser_esm["c" /* jsx */])(seo["a" /* SEO */], {
    title: post.frontmatter.title,
    description: post.frontmatter.description || post.excerpt
  }), Object(emotion_react_browser_esm["c" /* jsx */])("header", null, Object(emotion_react_browser_esm["c" /* jsx */])("div", {
    css: Object(emotion_react_browser_esm["b" /* css */])(_templateObject || (_templateObject = Object(taggedTemplateLiteralLoose["a" /* default */])(["\n                  margin-top: ", ";\n                  margin-bottom: 0;\n                  "])), Object(typography["a" /* rhythm */])(1))
  }, post.frontmatter.title), Object(emotion_react_browser_esm["c" /* jsx */])("p", {
    css: Object(emotion_react_browser_esm["b" /* css */])(_templateObject2 || (_templateObject2 = Object(taggedTemplateLiteralLoose["a" /* default */])(["\n                    font-size: ", ";\n                    line-height: ", ";\n                    display: block;\n                    margin-bottom: ", ";"])), fontSize, lineHeight, Object(typography["a" /* rhythm */])(1))
  }, post.frontmatter.date)), Object(emotion_react_browser_esm["c" /* jsx */])(BlogPost, null), Object(emotion_react_browser_esm["c" /* jsx */])("hr", {
    css: Object(emotion_react_browser_esm["b" /* css */])(_templateObject3 || (_templateObject3 = Object(taggedTemplateLiteralLoose["a" /* default */])(["\n                  margin-bottom: ", ";\n                  "])), Object(typography["a" /* rhythm */])(1))
  }), Object(emotion_react_browser_esm["c" /* jsx */])("footer", null, Object(emotion_react_browser_esm["c" /* jsx */])(bio["a" /* Bio */], null)), Object(emotion_react_browser_esm["c" /* jsx */])("nav", null, Object(emotion_react_browser_esm["c" /* jsx */])("ul", null, previous && Object(emotion_react_browser_esm["c" /* jsx */])("li", null, Object(emotion_react_browser_esm["c" /* jsx */])(gatsby_browser_entry["Link"], {
    to: previous.fields.slug,
    rel: "prev"
  }, "\u2190 ", previous.frontmatter.title)), next && Object(emotion_react_browser_esm["c" /* jsx */])("li", null, Object(emotion_react_browser_esm["c" /* jsx */])(gatsby_browser_entry["Link"], {
    to: next.fields.slug,
    rel: "next"
  }, next.frontmatter.title, " \u2192")))));
};

/* harmony default export */ var blog_post = __webpack_exports__["default"] = (blog_post_BlogPostTemplate);
var pageQuery = "2168380918";

/***/ }),

/***/ "d8WC":
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ "iQ7j":
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

/***/ "peMk":
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__("iQ7j");

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

/***/ "rDK1":
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__("695J");

var isNativeReflectConstruct = __webpack_require__("TcdR");

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

/***/ "tGbD":
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__("iQ7j");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ "twbh":
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ })

}]);
//# sourceMappingURL=component---src-templates-blog-post-tsx-69c151c6463b96d03bd8.js.map
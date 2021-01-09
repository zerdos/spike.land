(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[12],{

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _components_bio__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(72);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15);
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(16);
/* harmony import */ var _components_utils_typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(42);
/* harmony import */ var gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(153);
/* harmony import */ var gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_codeBox_CodeBox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(44);
/* harmony import */ var _mdx_js_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(34);
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

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Welcome to gatsby-plugin-mdx!
 *
 * Start reading in gatsby-node.js
 */var MDXRenderer=__webpack_require__(154);module.exports={MDXRenderer:MDXRenderer};

/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

var _construct=__webpack_require__(155);var _toConsumableArray=__webpack_require__(158);var _defineProperty=__webpack_require__(163);var _objectWithoutPropertiesLoose=__webpack_require__(64);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}var React=__webpack_require__(0);var _require=__webpack_require__(34),mdx=_require.mdx;var _require2=__webpack_require__(60),useMDXScope=_require2.useMDXScope;module.exports=function MDXRenderer(_ref){var scope=_ref.scope,children=_ref.children,props=_objectWithoutPropertiesLoose(_ref,["scope","children"]);var mdxScope=useMDXScope(scope);// Memoize the compiled component
var End=React.useMemo(function(){if(!children){return null;}var fullScope=_objectSpread({// React is here just in case the user doesn't pass them in
// in a manual usage of the renderer
React:React,mdx:mdx},mdxScope);var keys=Object.keys(fullScope);var values=keys.map(function(key){return fullScope[key];});var fn=_construct(Function,["_fn"].concat(_toConsumableArray(keys),[""+children]));return fn.apply(void 0,[{}].concat(_toConsumableArray(values)));},[children,scope]);return React.createElement(End,_objectSpread({},props));};

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(156);

var isNativeReflectConstruct = __webpack_require__(157);

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

/***/ 156:
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

/***/ 157:
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

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(159);

var iterableToArray = __webpack_require__(160);

var unsupportedIterableToArray = __webpack_require__(161);

var nonIterableSpread = __webpack_require__(162);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(73);

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ 160:
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(73);

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

/***/ 162:
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ 163:
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

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ CodeBox_CodeBox; });

// EXTERNAL MODULE: /home/zed/z/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(3);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: /home/zed/z/node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(2);

// EXTERNAL MODULE: /home/zed/z/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(4);

// EXTERNAL MODULE: /home/zed/z/node_modules/react/index.js
var react = __webpack_require__(0);

// EXTERNAL MODULE: /home/zed/z/node_modules/@emotion/react/dist/emotion-react.browser.esm.js
var emotion_react_browser_esm = __webpack_require__(1);

// EXTERNAL MODULE: /home/zed/z/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 5 modules
var toConsumableArray = __webpack_require__(28);

// CONCATENATED MODULE: ./src/components/codeBox/example.ts

var defaultProps = {
  events: ["reset"].concat(Object(toConsumableArray["a" /* default */])(new Array(8).fill("+1")))
};
var counterExample = "import { FC, useState } from \"react\";\n\nconst Counter: FC<{ initial?: number }> = (\n  { initial = 0 },\n) => {\n  const [clicks, setClicks] = useState(initial);\n\n  return <div>\n    <p>Clicks: {clicks}</p>\n    <button onClick={() => setClicks(clicks + 1)}>+</button>\n    <button onClick={() => setClicks(clicks - 1)}>-</button>\n  </div>;\n};\n\nconst rootElement = document.createElement(\"div\");\n\nReactDOM.render(<Counter initial={0} />, rootElement);\ndocument.body.appendChild(rootElement);\n\n";
// EXTERNAL MODULE: /home/zed/z/node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js + 1 modules
var emotion_styled_base_browser_esm = __webpack_require__(29);

// CONCATENATED MODULE: ./src/components/codeBox/styledCodeBoxComps.tsx


function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

var Header = Object(emotion_styled_base_browser_esm["a" /* default */])("div", {
  target: "eeuhj1l4",
  label: "Header"
})( true ? {
  name: "mw3krp",
  styles: "background:#3f51b5;font-family:\"Roboto\";margin:0;padding:10px 20px 10px;color:white"
} : undefined);
var ResultContainer = Object(emotion_styled_base_browser_esm["a" /* default */])("div", {
  target: "eeuhj1l3",
  label: "ResultContainer"
})( true ? {
  name: "1082qq3",
  styles: "display:block;width:100%"
} : undefined);
var ErrorContainer = Object(emotion_styled_base_browser_esm["a" /* default */])("div", {
  target: "eeuhj1l2",
  label: "ErrorContainer"
})( true ? {
  name: "13si4fh",
  styles: "display:block;width:100%;padding:10px;color:white;background:red;height:220px;pre{font-size:1em;line-height:1;}"
} : undefined);
var ResultBox = Object(emotion_styled_base_browser_esm["a" /* default */])("div", {
  target: "eeuhj1l1",
  label: "ResultBox"
})( true ? {
  name: "y6vqu",
  styles: "text-align:center;border-radius:12px;width:200px;height:200px;display:flex;place-content:center;place-items:center;margin:0;padding:0;background:rgb(255, 255, 255) none repeat scroll 0% 0%;user-select:none;box-shadow:rgba(0, 0, 0, 0.1) 0px 2px 3px 0px,rgba(0, 0, 0, 0.06) 0px 10px 15px 0px"
} : undefined);
var ResultBoxContainer = Object(emotion_styled_base_browser_esm["a" /* default */])("div", {
  target: "eeuhj1l0",
  label: "ResultBoxContainer"
})( true ? {
  name: "t2hrcs",
  styles: "display:block;width:150px;height:150px;overflow:hidden"
} : undefined);
// CONCATENATED MODULE: ./src/components/codeBox/CodeBox.tsx




function CodeBox_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }



/** @jsx jsx */





var _ref =  true ? {
  name: "j36qhl",
  styles: "width:100%;height:70vh"
} : undefined;

var CodeBox_CodeBox = function CodeBox(_ref2) {
  var title = _ref2.title,
      children = _ref2.children;
  var starterCode = (children === null || children === void 0 ? void 0 : children.toString().trim()) || counterExample;
  if (typeof window === "undefined") return Object(emotion_react_browser_esm["c" /* jsx */])("pre", null, "Loading");
  react["useEffect"](function () {
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
                return new Function("return import(\"https://blog.zed.vision/code/src/codeLoader.js\")")();

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

    if (typeof window !== undefined) start();
  }, []);
  return Object(emotion_react_browser_esm["c" /* jsx */])(react["Fragment"], null, !!title && Object(emotion_react_browser_esm["c" /* jsx */])(Header, null, Object(emotion_react_browser_esm["c" /* jsx */])("span", null, title), Object(emotion_react_browser_esm["c" /* jsx */])("button", null, "Save")), Object(emotion_react_browser_esm["c" /* jsx */])("div", {
    css: _ref,
    id: "editor"
  }));
};

/***/ }),

/***/ 73:
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
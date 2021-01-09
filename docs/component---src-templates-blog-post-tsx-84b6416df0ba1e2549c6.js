(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[10],{

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Welcome to gatsby-plugin-mdx!
 *
 * Start reading in gatsby-node.js
 */var MDXRenderer=__webpack_require__(151);module.exports={MDXRenderer:MDXRenderer};

/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

var _construct=__webpack_require__(152);var _toConsumableArray=__webpack_require__(155);var _defineProperty=__webpack_require__(160);var _objectWithoutPropertiesLoose=__webpack_require__(63);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}var React=__webpack_require__(0);var _require=__webpack_require__(32),mdx=_require.mdx;var _require2=__webpack_require__(59),useMDXScope=_require2.useMDXScope;module.exports=function MDXRenderer(_ref){var scope=_ref.scope,children=_ref.children,props=_objectWithoutPropertiesLoose(_ref,["scope","children"]);var mdxScope=useMDXScope(scope);// Memoize the compiled component
var End=React.useMemo(function(){if(!children){return null;}var fullScope=_objectSpread({// React is here just in case the user doesn't pass them in
// in a manual usage of the renderer
React:React,mdx:mdx},mdxScope);var keys=Object.keys(fullScope);var values=keys.map(function(key){return fullScope[key];});var fn=_construct(Function,["_fn"].concat(_toConsumableArray(keys),[""+children]));return fn.apply(void 0,[{}].concat(_toConsumableArray(values)));},[children,scope]);return React.createElement(End,_objectSpread({},props));};

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(153);

var isNativeReflectConstruct = __webpack_require__(154);

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

/***/ 153:
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

/***/ 154:
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

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(156);

var iterableToArray = __webpack_require__(157);

var unsupportedIterableToArray = __webpack_require__(158);

var nonIterableSpread = __webpack_require__(159);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(72);

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ 157:
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(72);

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

/***/ 159:
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ 160:
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

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: /home/zed/z/node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js + 1 modules
var emotion_styled_base_browser_esm = __webpack_require__(44);

// EXTERNAL MODULE: /home/zed/z/node_modules/react/index.js
var react = __webpack_require__(0);

// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js
var gatsby_browser_entry = __webpack_require__(13);

// EXTERNAL MODULE: ./src/components/bio.tsx
var bio = __webpack_require__(71);

// EXTERNAL MODULE: ./src/components/layout.tsx
var layout = __webpack_require__(20);

// EXTERNAL MODULE: ./src/components/seo.tsx
var seo = __webpack_require__(21);

// EXTERNAL MODULE: ./src/components/utils/typography.ts
var typography = __webpack_require__(40);

// EXTERNAL MODULE: /home/zed/z/node_modules/gatsby-plugin-mdx/index.js
var gatsby_plugin_mdx = __webpack_require__(150);

// EXTERNAL MODULE: /home/zed/z/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(4);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: /home/zed/z/node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(2);

// EXTERNAL MODULE: /home/zed/z/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(5);

// EXTERNAL MODULE: /home/zed/z/node_modules/@emotion/react/dist/emotion-react.browser.esm.js
var emotion_react_browser_esm = __webpack_require__(1);

// EXTERNAL MODULE: /home/zed/z/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 5 modules
var toConsumableArray = __webpack_require__(41);

// CONCATENATED MODULE: ./src/components/codeBox/example.ts

var defaultProps = {
  events: ["reset"].concat(Object(toConsumableArray["a" /* default */])(new Array(8).fill("+1")))
};
var counterExample = "import { FC, useState } from \"react\";\n\nconst Counter: FC<{ initial?: number }> = (\n  { initial = 0 },\n) => {\n  const [clicks, setClicks] = useState(initial);\n\n  return <div>\n    <p>Clicks: {clicks}</p>\n    <button onClick={() => setClicks(clicks + 1)}>+</button>\n    <button onClick={() => setClicks(clicks - 1)}>-</button>\n  </div>;\n};\n\nconst rootElement = document.createElement(\"div\");\n\nReactDOM.render(<Counter initial={0} />, rootElement);\ndocument.body.appendChild(rootElement);\n\n";
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





var CodeBox_ref =  true ? {
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
    css: CodeBox_ref,
    id: "editor"
  }));
};
// EXTERNAL MODULE: /home/zed/z/node_modules/@mdx-js/react/dist/esm.js
var esm = __webpack_require__(32);

// CONCATENATED MODULE: ./src/templates/blog-post.tsx











var components = {
  pre: function PreComp(props) {
    return Object(emotion_react_browser_esm["c" /* jsx */])("div", props);
  },
  code: CodeBox_CodeBox
};

var StyledHeader = Object(emotion_styled_base_browser_esm["a" /* default */])("h1", {
  target: "e1mbanj62",
  label: "StyledHeader"
})("margin-top:", Object(typography["a" /* rhythm */])(1), ";margin-bottom:0;" + ( true ? "" : undefined));

var _scale = Object(typography["b" /* scale */])(1 / 5),
    fontSize = _scale.fontSize,
    lineHeight = _scale.lineHeight;

var StyledDate = Object(emotion_styled_base_browser_esm["a" /* default */])("p", {
  target: "e1mbanj61",
  label: "StyledDate"
})("font-size:", fontSize, ";line-height:", lineHeight, ";display:block;margin-bottom:", Object(typography["a" /* rhythm */])(1), ";" + ( true ? "" : undefined));

var Hr = Object(emotion_styled_base_browser_esm["a" /* default */])("hr", {
  target: "e1mbanj60",
  label: "Hr"
})("margin-bottom:", Object(typography["a" /* rhythm */])(1), ";" + ( true ? "" : undefined));

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

  return Object(emotion_react_browser_esm["c" /* jsx */])(react["Fragment"], null, Object(emotion_react_browser_esm["c" /* jsx */])(layout["a" /* Layout */], null, Object(emotion_react_browser_esm["c" /* jsx */])(seo["a" /* SEO */], {
    title: post.frontmatter.title,
    description: post.frontmatter.description || post.excerpt
  }), Object(emotion_react_browser_esm["c" /* jsx */])("header", null, Object(emotion_react_browser_esm["c" /* jsx */])(StyledHeader, null, post.frontmatter.title), Object(emotion_react_browser_esm["c" /* jsx */])(StyledDate, null, post.frontmatter.date)), Object(emotion_react_browser_esm["c" /* jsx */])(BlogPost, null), Object(emotion_react_browser_esm["c" /* jsx */])(Hr, null), Object(emotion_react_browser_esm["c" /* jsx */])("footer", null, Object(emotion_react_browser_esm["c" /* jsx */])(bio["a" /* Bio */], null)), Object(emotion_react_browser_esm["c" /* jsx */])("nav", null, Object(emotion_react_browser_esm["c" /* jsx */])("ul", null, previous && Object(emotion_react_browser_esm["c" /* jsx */])("li", null, Object(emotion_react_browser_esm["c" /* jsx */])(gatsby_browser_entry["Link"], {
    to: previous.fields.slug,
    rel: "prev"
  }, "\u2190 ", previous.frontmatter.title)), next && Object(emotion_react_browser_esm["c" /* jsx */])("li", null, Object(emotion_react_browser_esm["c" /* jsx */])(gatsby_browser_entry["Link"], {
    to: next.fields.slug,
    rel: "next"
  }, next.frontmatter.title, " \u2192"))))));
};

/* harmony default export */ var blog_post = __webpack_exports__["default"] = (blog_post_BlogPostTemplate);
var pageQuery = "2168380918";

/***/ }),

/***/ 72:
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
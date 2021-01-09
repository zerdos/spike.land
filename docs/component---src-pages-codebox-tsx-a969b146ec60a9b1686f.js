(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[7],{

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Page; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_codeBox_CodeBox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1);





function Page() {
  return Object(_emotion_react__WEBPACK_IMPORTED_MODULE_4__[/* jsx */ "c"])(_components_layout__WEBPACK_IMPORTED_MODULE_2__[/* Layout */ "a"], null, Object(_emotion_react__WEBPACK_IMPORTED_MODULE_4__[/* jsx */ "c"])(_components_seo__WEBPACK_IMPORTED_MODULE_3__[/* SEO */ "a"], {
    title: "Code Box"
  }), Object(_emotion_react__WEBPACK_IMPORTED_MODULE_4__[/* jsx */ "c"])("h1", null, "Code box"), Object(_emotion_react__WEBPACK_IMPORTED_MODULE_4__[/* jsx */ "c"])("p", null, "Lets see!"), Object(_emotion_react__WEBPACK_IMPORTED_MODULE_4__[/* jsx */ "c"])(_components_codeBox_CodeBox__WEBPACK_IMPORTED_MODULE_1__[/* CodeBox */ "a"], {
    title: "Example1 :)"
  }));
}

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ CodeBox_CodeBox; });

// EXTERNAL MODULE: /home/zed/z/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(4);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: /home/zed/z/node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(2);

// EXTERNAL MODULE: /home/zed/z/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(5);

// EXTERNAL MODULE: /home/zed/z/node_modules/react/index.js
var react = __webpack_require__(0);

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
  target: "eeuhj1l5",
  label: "Header"
})( true ? {
  name: "13dn9u0",
  styles: "background:#3f51b5;font-family:\"Roboto\";margin:0;@emotion/styled padding:10px 20px 10px;{}color:white"
} : undefined);
var CodeContainer = Object(emotion_styled_base_browser_esm["a" /* default */])("div", {
  target: "eeuhj1l4",
  label: "CodeContainer"
})( true ? {
  name: "1rosqx9",
  styles: "display:block;width:100%;height:70vh"
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
// EXTERNAL MODULE: /home/zed/z/node_modules/@emotion/react/dist/emotion-react.browser.esm.js
var emotion_react_browser_esm = __webpack_require__(1);

// CONCATENATED MODULE: ./src/components/codeBox/CodeBox.tsx







var CodeBox_CodeBox = function CodeBox(_ref) {
  var title = _ref.title,
      children = _ref.children;
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
                return new Function("return import(\"https://blog.code.zed.vision/code/src/codeLoader.js\")")();

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
  return Object(emotion_react_browser_esm["c" /* jsx */])(react["Fragment"], null, !!title && Object(emotion_react_browser_esm["c" /* jsx */])(Header, null, Object(emotion_react_browser_esm["c" /* jsx */])("span", null, title), Object(emotion_react_browser_esm["c" /* jsx */])("button", null, "Save")), Object(emotion_react_browser_esm["c" /* jsx */])(CodeContainer, {
    id: "editor"
  }));
};

/***/ })

}]);
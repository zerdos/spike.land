(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[15],{

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyComponent", function() { return MyComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Page; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_utils_sha__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(36);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(50);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1);





function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }


 // import { CounterTS } from "../components/Counter";





var Styled = Object(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])("div", {
  target: "e1rzoatq0"
})( true ? {
  name: "t1r55p",
  styles: "text-align:center;border-radius:12px;width:200px;height:200px;display:flex;place-content:center;place-items:center;margin:0;padding:0;background:rgb(255,255,255) none repeat scroll 0% 0%;user-select:none;box-shadow:rgba(0,0,0,0.1) 0px 2px 3px 0px,rgba(0,0,0,0.06) 0px 10px 15px 0px;"
} : undefined);

var DivContainer = Object(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])("div", {
  target: "e1rzoatq1"
})( true ? {
  name: "1e9tybj",
  styles: "display:block;width:150px;height:150px;overflow:hidden;"
} : undefined);

var StyledTextArea = Object(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])("textarea", {
  target: "e1rzoatq2"
})( true ? {
  name: "1d6k1hz",
  styles: "width:100%;max-height:100%;"
} : undefined);

var Sha256Writer = function Sha256Writer(_ref) {
  var onNew = _ref.onNew;

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_4__["useState"]({
    text: "",
    sha256Hash: ""
  }),
      _React$useState$ = _React$useState[0],
      text = _React$useState$.text,
      sha256Hash = _React$useState$.sha256Hash,
      changeText = _React$useState[1];

  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "b"])(DivContainer, null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "b"])("p", null, "Start to type"), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "b"])(StyledTextArea, {
    onChange: /*#__PURE__*/function () {
      var _ref2 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(e) {
        var textContent, sha256Hash;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                textContent = e.target.value;
                _context.next = 3;
                return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_5__[/* hash */ "a"])(textContent);

              case 3:
                sha256Hash = _context.sent;
                onNew(sha256Hash);
                changeText({
                  text: textContent,
                  sha256Hash: sha256Hash
                });

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
    }(),
    value: text
  }), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "b"])("pre", null, sha256Hash));
};

var MyComponent = function MyComponent(_ref3) {
  var _ref3$height = _ref3.height,
      height = _ref3$height === void 0 ? 400 : _ref3$height,
      _ref3$width = _ref3.width,
      width = _ref3$width === void 0 ? 400 : _ref3$width,
      adjust = _ref3.adjust;
  var x = Object(framer_motion__WEBPACK_IMPORTED_MODULE_7__[/* useMotionValue */ "b"])(0);
  var background = Object(framer_motion__WEBPACK_IMPORTED_MODULE_7__[/* useTransform */ "c"])(x, [-100, 0, 100], ["#ff008c", "#7700ff", "rgb(230, 255, 0)"]);
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "b"])(react__WEBPACK_IMPORTED_MODULE_4__["Fragment"], null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "b"])(framer_motion__WEBPACK_IMPORTED_MODULE_7__[/* motion */ "a"].div, {
    layout: true,
    style: {
      background: background,
      height: height,
      width: width,
      position: "relative"
    }
  }), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "b"])(framer_motion__WEBPACK_IMPORTED_MODULE_7__[/* motion */ "a"].div, {
    // layout
    drag: true,
    dragElastic: 0.5 // dragListener={true}
    // onDrag={
    // (event, info) => {if (event.layerX<0) adjust(event.layerX, event.layerY);}
    // }
    ,
    dragConstraints: {
      top: 0,
      bottom: height - 100,
      left: 0,
      right: width - 100
    },
    style: {
      position: "absolute",
      x: x
    }
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "b"])(Styled, null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "b"])(Sha256Writer, {
    onNew: function onNew(hash) {
      return console.log(hash);
    }
  }))));
};

var Container = Object(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])("div", {
  target: "e1rzoatq3"
})( true ? {
  name: "1di27ou",
  styles: "height:100vh;width:100vw;overflow:hidden;text-align:center;display:flex;place-content:center;place-items:center;background:rgba(0,85,255,1);perspective:1000px;"
} : undefined);

function Page() {
  var _React$useState2 = react__WEBPACK_IMPORTED_MODULE_4__["useState"]({
    height: 600,
    width: 400
  }),
      _React$useState2$ = _React$useState2[0],
      width = _React$useState2$.width,
      height = _React$useState2$.height,
      changeSize = _React$useState2[1];

  react__WEBPACK_IMPORTED_MODULE_4__["useEffect"](function () {
    setInterval(function () {
      var x = Math.random() * 200 - 100;
      var total = 600 * 400;
      var newWith = Math.floor(width - x);
      var newHeight = Math.floor(total / newWith);
      changeSize({
        height: newHeight,
        width: newWith
      });
    }, 1000);
  }, []);
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "b"])(react__WEBPACK_IMPORTED_MODULE_4__["Fragment"], null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "b"])(react_helmet__WEBPACK_IMPORTED_MODULE_6__[/* Helmet */ "a"], null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "b"])("style", {
    type: "text/css"
  }, "\n      html {\n          height: 100vh;\n          width: 100vw;\n          overflow: hidden;\n      }")), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "b"])(Container, null, typeof window !== "undefined" ? Object(_emotion_core__WEBPACK_IMPORTED_MODULE_8__[/* jsx */ "b"])(MyComponent, {
    height: height,
    width: width,
    adjust: function adjust(x, y) {
      var total = width * height;
      var newWith = width - x;
      var newHeight = total / newWith;
      changeSize({
        height: newHeight,
        width: newWith
      });
    }
  }) : "Loading"));
}

/***/ })

}]);
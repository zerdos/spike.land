(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[6],{

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }


/** @jsx jsx */




var Slider = function Slider() {
  var steps = 128;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(steps / 2),
      sliderValue = _useState[0],
      setSlider = _useState[1];

  return Object(_emotion_react__WEBPACK_IMPORTED_MODULE_1__[/* jsx */ "c"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, Object(_emotion_react__WEBPACK_IMPORTED_MODULE_1__[/* jsx */ "c"])("input", {
    max: steps,
    css: /*#__PURE__*/Object(_emotion_react__WEBPACK_IMPORTED_MODULE_1__[/* css */ "b"])("appearance:none;width:100%;height:40px;background:rgb(", 255 / steps * sliderValue, " ", 255 / steps * (steps - sliderValue), " 0);outline:none;" + ( true ? "" : undefined),  true ? "" : undefined),
    type: "range",
    "aria-label": "font size changer",
    value: sliderValue,
    step: "1",
    onChangeCapture: function onChangeCapture(e) {
      return setSlider(Number(e.currentTarget.value));
    }
  }), Object(_emotion_react__WEBPACK_IMPORTED_MODULE_1__[/* jsx */ "c"])("p", {
    css: /*#__PURE__*/Object(_emotion_react__WEBPACK_IMPORTED_MODULE_1__[/* css */ "b"])("font-size:", 72 / steps * sliderValue, "px;" + ( true ? "" : undefined),  true ? "" : undefined)
  }, "Example when the text gets bigger..."), Object(_emotion_react__WEBPACK_IMPORTED_MODULE_1__[/* jsx */ "c"])("p", {
    css: /*#__PURE__*/Object(_emotion_react__WEBPACK_IMPORTED_MODULE_1__[/* css */ "b"])("font-size:", 72 / steps * (steps - sliderValue), "px;" + ( true ? "" : undefined),  true ? "" : undefined)
  }, "...or smaller"));
};

var _ref =  true ? {
  name: "17zeuhv",
  styles: "body{margin:0;overflow:overlay;}"
} : undefined;

/* harmony default export */ __webpack_exports__["default"] = (function () {
  return Object(_emotion_react__WEBPACK_IMPORTED_MODULE_1__[/* jsx */ "c"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, Object(_emotion_react__WEBPACK_IMPORTED_MODULE_1__[/* jsx */ "c"])(_emotion_react__WEBPACK_IMPORTED_MODULE_1__[/* Global */ "a"], {
    styles: _ref
  }), Object(_emotion_react__WEBPACK_IMPORTED_MODULE_1__[/* jsx */ "c"])(Slider, null));
});

/***/ })

}]);
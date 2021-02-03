(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "Y5mc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fhSp");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ERkP");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("f7k3");


var _templateObject, _templateObject2, _templateObject3, _templateObject4;


/** @jsx jsx */



var Slider = function Slider() {
  var steps = 128;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(steps / 2),
      sliderValue = _useState[0],
      setSlider = _useState[1];

  return Object(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[/* jsx */ "c"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, Object(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[/* jsx */ "c"])("input", {
    max: steps,
    css: Object(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[/* css */ "b"])(_templateObject || (_templateObject = Object(_babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(["\n        appearance: none;\n        width: 100%;\n        height: 40px; \n        background: rgb(", " ", " 0); \n        outline: none; \n    "])), 255 / steps * sliderValue, 255 / steps * (steps - sliderValue)),
    type: "range",
    "aria-label": "font size changer",
    value: sliderValue,
    step: "1",
    onChangeCapture: function onChangeCapture(e) {
      return setSlider(Number(e.currentTarget.value));
    }
  }), Object(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[/* jsx */ "c"])("p", {
    css: Object(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[/* css */ "b"])(_templateObject2 || (_templateObject2 = Object(_babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(["\n        font-size: ", "px\n        "])), 72 / steps * sliderValue)
  }, "Example when the text gets bigger..."), Object(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[/* jsx */ "c"])("p", {
    css: Object(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[/* css */ "b"])(_templateObject3 || (_templateObject3 = Object(_babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(["\n        font-size: ", "px\n        "])), 72 / steps * (steps - sliderValue))
  }, "...or smaller"));
};

/* harmony default export */ __webpack_exports__["default"] = (function () {
  return Object(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[/* jsx */ "c"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, Object(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[/* jsx */ "c"])(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[/* Global */ "a"], {
    styles: Object(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[/* css */ "b"])(_templateObject4 || (_templateObject4 = Object(_babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(["\n      body{\n          margin: 0;\n          overflow: overlay;\n        }  \n    "])))
  }), Object(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[/* jsx */ "c"])(Slider, null));
});

/***/ })

}]);
//# sourceMappingURL=component---src-pages-example-tsx-8a2cfb63568f45b3ff19.js.map
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "Y5mc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("MUpH");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("AeFk");


function _templateObject4() {
  var data = Object(_babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(["\n      body{\n          margin: 0;\n          overflow: overlay;\n        }  \n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = Object(_babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(["\n        font-size: ", "px\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = Object(_babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(["\n        font-size: ", "px\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = Object(_babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(["\n        appearance: none;\n        width: 100%;\n        height: 40px; \n        background: rgb(", " ", " 0); \n        outline: none; \n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}


/** @jsx jsx */



var Slider = function Slider() {
  var steps = 128;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(steps / 2),
      sliderValue = _useState[0],
      setSlider = _useState[1];

  return Object(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[/* jsx */ "c"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, Object(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[/* jsx */ "c"])("input", {
    max: steps,
    css: Object(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[/* css */ "b"])(_templateObject(), 255 / steps * sliderValue, 255 / steps * (steps - sliderValue)),
    type: "range",
    "aria-label": "font size changer",
    value: sliderValue,
    step: "1",
    onChangeCapture: function onChangeCapture(e) {
      return setSlider(Number(e.currentTarget.value));
    }
  }), Object(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[/* jsx */ "c"])("p", {
    css: Object(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[/* css */ "b"])(_templateObject2(), 72 / steps * sliderValue)
  }, "Example when the text gets bigger..."), Object(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[/* jsx */ "c"])("p", {
    css: Object(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[/* css */ "b"])(_templateObject3(), 72 / steps * (steps - sliderValue))
  }, "...or smaller"));
};

/* harmony default export */ __webpack_exports__["default"] = (function () {
  return Object(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[/* jsx */ "c"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, Object(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[/* jsx */ "c"])(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[/* Global */ "a"], {
    styles: Object(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[/* css */ "b"])(_templateObject4())
  }), Object(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[/* jsx */ "c"])(Slider, null));
});

/***/ })

}]);
//# sourceMappingURL=component---src-pages-example-tsx-d959974fa0e5db32ad40.js.map
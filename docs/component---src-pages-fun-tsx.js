(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[10],{

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShaContainer", function() { return ShaContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Page; });
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_utils_sha__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(39);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(61);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1);






function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }







var Styled = Object(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])("div", {
  target: "e1w0tlto0"
})( true ? {
  name: "t1r55p",
  styles: "text-align:center;border-radius:12px;width:200px;height:200px;display:flex;place-content:center;place-items:center;margin:0;padding:0;background:rgb(255,255,255) none repeat scroll 0% 0%;user-select:none;box-shadow:rgba(0,0,0,0.1) 0px 2px 3px 0px,rgba(0,0,0,0.06) 0px 10px 15px 0px;"
} : undefined);

var DivContainer = Object(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])("div", {
  target: "e1w0tlto1"
})( true ? {
  name: "1e9tybj",
  styles: "display:block;width:150px;height:150px;overflow:hidden;"
} : undefined);

var StyledTextArea = Object(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])("textarea", {
  target: "e1w0tlto2"
})( true ? {
  name: "g49eaj",
  styles: "width:100%;min-height:120px;max-height:100%;"
} : undefined);

var Sha256Writer = function Sha256Writer(_ref) {
  var onNew = _ref.onNew,
      prevText = _ref.prevText;

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_5__["useState"]({
    text: prevText
  }),
      text = _React$useState[0].text,
      changeText = _React$useState[1];

  react__WEBPACK_IMPORTED_MODULE_5__["useEffect"](function () {
    changeText({
      text: prevText
    });
  }, [prevText]);
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_9__[/* jsx */ "b"])(DivContainer, null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_9__[/* jsx */ "b"])("p", null, "Start to type"), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_9__[/* jsx */ "b"])(StyledTextArea, {
    onChange: /*#__PURE__*/function () {
      var _ref2 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(e) {
        var textContent, sha256Hash;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                textContent = e.target.value;
                _context.next = 3;
                return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_6__[/* hash */ "a"])(textContent);

              case 3:
                sha256Hash = _context.sent;
                onNew(sha256Hash);
                changeText({
                  text: textContent
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
  }));
};

var ShaContainer = function ShaContainer() {
  var x = Object(framer_motion__WEBPACK_IMPORTED_MODULE_8__[/* useMotionValue */ "b"])(0);

  var _React$useState2 = react__WEBPACK_IMPORTED_MODULE_5__["useState"]([]),
      hashList = _React$useState2[0],
      changeBoxes = _React$useState2[1];

  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_5__["useState"]({
    locX: 40,
    locY: 40,
    activeText: ""
  }),
      _React$useState3$ = _React$useState3[0],
      locX = _React$useState3$.locX,
      locY = _React$useState3$.locY,
      activeText = _React$useState3$.activeText,
      setCords = _React$useState3[1];

  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_9__[/* jsx */ "b"])("div", null, hashList.map(function (hash) {
    var _hashToCoordinates = hashToCoordinates(hash),
        locationX = _hashToCoordinates.locationX,
        locationY = _hashToCoordinates.locationY;

    return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_9__[/* jsx */ "b"])("div", {
      onMouseEnter: /*#__PURE__*/Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2() {
        var text, _hashToCoordinates2, locationX, locationY;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_6__[/* unHash */ "b"])(hash);

              case 2:
                text = _context2.sent;
                _hashToCoordinates2 = hashToCoordinates(hash), locationX = _hashToCoordinates2.locationX, locationY = _hashToCoordinates2.locationY;
                setCords({
                  locX: locationX,
                  locY: locationY,
                  activeText: text
                });

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      })),
      style: {
        fontSize: "small",
        display: "inline-block",
        width: 10,
        height: 10,
        borderRadius: 5,
        background: "white",
        padding: 5,
        top: locationY + "%",
        left: locationX + "%",
        position: "absolute"
      },
      key: hash
    });
  }), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_9__[/* jsx */ "b"])(framer_motion__WEBPACK_IMPORTED_MODULE_8__[/* motion */ "a"].div, {
    animate: {
      x: locX * window.innerWidth / 105 - 100,
      y: locY * window.innerHeight / 105 - 50,
      scale: 1,
      rotate: 0
    },
    style: {
      position: "absolute",
      x: x
    }
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_9__[/* jsx */ "b"])(Styled, null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_9__[/* jsx */ "b"])(Sha256Writer, {
    prevText: activeText,
    onNew: function onNew(hash) {
      var _hashToCoordinates3 = hashToCoordinates(hash),
          locationY = _hashToCoordinates3.locationY,
          locationX = _hashToCoordinates3.locationX;

      setCords({
        locX: locationX,
        locY: locationY,
        activeText: activeText
      });
      if (hashList.includes(hash)) return;
      changeBoxes([].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(hashList), [hash]));
    }
  }))));
};

var Container = Object(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])("div", {
  target: "e1w0tlto3"
})( true ? {
  name: "1mzexlt",
  styles: "height:100vh;width:100vw;overflow:hidden;text-align:center;display:relative;background:rgba(0,85,255,1);perspective:1000px;"
} : undefined);

function Page() {
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_9__[/* jsx */ "b"])(react__WEBPACK_IMPORTED_MODULE_5__["Fragment"], null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_9__[/* jsx */ "b"])(react_helmet__WEBPACK_IMPORTED_MODULE_7__[/* Helmet */ "a"], null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_9__[/* jsx */ "b"])("style", {
    type: "text/css"
  }, "\n      html {\n          height: 100vh;\n          width: 100vw;\n          overflow: hidden;\n      }")), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_9__[/* jsx */ "b"])(Container, null, typeof window !== "undefined" ? Object(_emotion_core__WEBPACK_IMPORTED_MODULE_9__[/* jsx */ "b"])(ShaContainer, null) : "Loading"));
}

function hashToCoordinates(hash) {
  var length = hash.length;
  var size = 100 / Math.pow(4, length);
  var locationX = 0;
  var locationY = 0;

  for (var i = 1; i <= hash.length; i++) {
    var decNumber = parseInt(hash.substr(i - 1, 1), 16);
    var multiplier = 100 / Math.pow(4, i);
    locationY += decNumber % 4 * multiplier; // decNumber -= decNumber%4;

    locationX += Math.floor(decNumber / 4) * multiplier;
  }

  return {
    size: size,
    locationX: locationX,
    locationY: locationY
  };
}

/***/ })

}]);
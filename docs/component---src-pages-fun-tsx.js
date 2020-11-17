(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[10],{

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShaContainer", function() { return ShaContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Page; });
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6);
/* harmony import */ var _components_utils_sha__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(25);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(33);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(51);






function _templateObject4() {
  var data = Object(_babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(["\n  height: 100vh;\n  width: 100vw;\n  overflow: hidden;\n  text-align: center;\n  display: relative;\n  background: rgba(0, 85, 255, 1);\n  perspective: 1000px;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = Object(_babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(["\nwidth: 100%;\nmin-height: 120px;\nmax-height: 100%;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = Object(_babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(["\ndisplay: block;\nwidth: 150px;\nheight: 150px;\noverflow: hidden;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = Object(_babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(["\n  text-align: center;\n  border-radius: 12px;\n  width: 200px;\n  height: 200px;\n  display: flex;\n  place-content: center;\n  place-items: center;\n  margin: 0;\n  padding: 0;\n  background: rgb(255, 255, 255) none repeat scroll 0% 0%;\n  user-select: none;\n  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 3px 0px, rgba(0, 0, 0, 0.06) 0px 10px 15px 0px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}






var Styled = _emotion_styled__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].div(_templateObject());
var DivContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].div(_templateObject2());
var StyledTextArea = _emotion_styled__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].textarea(_templateObject3());

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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"](DivContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("p", null, "Start to type"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"](StyledTextArea, {
    onChange: /*#__PURE__*/function () {
      var _ref2 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(e) {
        var textContent, sha256Hash;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                textContent = e.target.value;
                _context.next = 3;
                return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_7__[/* hash */ "a"])(textContent);

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
  var x = Object(framer_motion__WEBPACK_IMPORTED_MODULE_9__[/* useMotionValue */ "b"])(0);

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

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", null, hashList.map(function (hash) {
    var _hashToCoordinates = hashToCoordinates(hash),
        locationX = _hashToCoordinates.locationX,
        locationY = _hashToCoordinates.locationY;

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
      onMouseEnter: /*#__PURE__*/Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2() {
        var text, _hashToCoordinates2, locationX, locationY;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Object(_components_utils_sha__WEBPACK_IMPORTED_MODULE_7__[/* unHash */ "b"])(hash);

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
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"](framer_motion__WEBPACK_IMPORTED_MODULE_9__[/* motion */ "a"].div, {
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
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"](Styled, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"](Sha256Writer, {
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
var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].div(_templateObject4());
function Page() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"](react__WEBPACK_IMPORTED_MODULE_5__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"](react_helmet__WEBPACK_IMPORTED_MODULE_8__[/* Helmet */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("style", {
    type: "text/css"
  }, "\n      html {\n          height: 100vh;\n          width: 100vw;\n          overflow: hidden;\n      }")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"](Container, null, typeof window !== "undefined" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"](ShaContainer, null) : "Loading"));
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
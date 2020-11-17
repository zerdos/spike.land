(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[14], {
  /***/ 228:
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "MyComponent",
        function () {
          return MyComponent;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "default",
        function () {
          return Page;
        },
      );
      /* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(8);
      /* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/ __webpack_require__.n(
          _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__,
        );
      /* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(5);
      /* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default =
        /*#__PURE__*/ __webpack_require__.n(
          regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__,
        );
      /* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ =
        __webpack_require__(9);
      /* harmony import */ var _babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_3__ =
        __webpack_require__(4);
      /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ =
        __webpack_require__(0);
      /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default =
        /*#__PURE__*/ __webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
      /* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_5__ =
        __webpack_require__(6);
      /* harmony import */ var _components_utils_sha__WEBPACK_IMPORTED_MODULE_6__ =
        __webpack_require__(25);
      /* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_7__ =
        __webpack_require__(33);
      /* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_8__ =
        __webpack_require__(51);

      function _templateObject4() {
        var data = Object(
          _babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_3__ /* default */[
            "a"
          ],
        )([
          "\n  height: 100vh;\n  width: 100vw;\n  overflow: hidden;\n  text-align: center;\n  display: flex;\n  place-content: center;\n  place-items: center;\n  background: rgba(0, 85, 255, 1);\n  perspective: 1000px;\n",
        ]);

        _templateObject4 = function _templateObject4() {
          return data;
        };

        return data;
      }

      function _templateObject3() {
        var data = Object(
          _babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_3__ /* default */[
            "a"
          ],
        )(["\nwidth: 100%;\nmax-height: 100%;\n"]);

        _templateObject3 = function _templateObject3() {
          return data;
        };

        return data;
      }

      function _templateObject2() {
        var data = Object(
          _babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_3__ /* default */[
            "a"
          ],
        )([
          "\ndisplay: block;\nwidth: 150px;\nheight: 150px;\noverflow: hidden;\n",
        ]);

        _templateObject2 = function _templateObject2() {
          return data;
        };

        return data;
      }

      function _templateObject() {
        var data = Object(
          _babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_3__ /* default */[
            "a"
          ],
        )([
          "\n  text-align: center;\n  border-radius: 12px;\n  width: 200px;\n  height: 200px;\n  display: flex;\n  place-content: center;\n  place-items: center;\n  margin: 0;\n  padding: 0;\n  background: rgb(255, 255, 255) none repeat scroll 0% 0%;\n  user-select: none;\n  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 3px 0px, rgba(0, 0, 0, 0.06) 0px 10px 15px 0px;\n",
        ]);

        _templateObject = function _templateObject() {
          return data;
        };

        return data;
      }

      // import { CounterTS } from "../components/Counter";

      var Styled =
        _emotion_styled__WEBPACK_IMPORTED_MODULE_5__ /* default */["a"].div(
          _templateObject(),
        );
      var DivContainer =
        _emotion_styled__WEBPACK_IMPORTED_MODULE_5__ /* default */["a"].div(
          _templateObject2(),
        );
      var StyledTextArea =
        _emotion_styled__WEBPACK_IMPORTED_MODULE_5__ /* default */["a"]
          .textarea(_templateObject3());

      var Sha256Writer = function Sha256Writer(_ref) {
        var onNew = _ref.onNew;

        var _React$useState = react__WEBPACK_IMPORTED_MODULE_4__["useState"]({
            text: "",
            sha256Hash: "",
          }),
          _React$useState$ = _React$useState[0],
          text = _React$useState$.text,
          sha256Hash = _React$useState$.sha256Hash,
          changeText = _React$useState[1];

        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__[
          "createElement"
        ](
          DivContainer,
          null,
          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__["createElement"](
            "p",
            null,
            "Start to type",
          ),
          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__["createElement"](
            StyledTextArea,
            {
              onChange: /*#__PURE__*/ function () {
                var _ref2 = Object(
                  _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ /* default */[
                    "a"
                  ],
                )(/*#__PURE__*/ _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default
                  .a.mark(function _callee(e) {
                    var textContent, sha256Hash;
                    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default
                      .a.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              textContent = e.target.value;
                              _context.next = 3;
                              return Object(
                                _components_utils_sha__WEBPACK_IMPORTED_MODULE_6__ /* hash */[
                                  "a"
                                ],
                              )(textContent);

                            case 3:
                              sha256Hash = _context.sent;
                              onNew(sha256Hash);
                              changeText({
                                text: textContent,
                                sha256Hash: sha256Hash,
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
              value: text,
            },
          ),
          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__["createElement"](
            "pre",
            null,
            sha256Hash,
          ),
        );
      };

      var MyComponent = function MyComponent(_ref3) {
        var _ref3$height = _ref3.height,
          height = _ref3$height === void 0 ? 400 : _ref3$height,
          _ref3$width = _ref3.width,
          width = _ref3$width === void 0 ? 400 : _ref3$width,
          adjust = _ref3.adjust;
        var x = Object(
          framer_motion__WEBPACK_IMPORTED_MODULE_8__ /* useMotionValue */["b"],
        )(0);
        var background = Object(
          framer_motion__WEBPACK_IMPORTED_MODULE_8__ /* useTransform */["c"],
        )(x, [-100, 0, 100], ["#ff008c", "#7700ff", "rgb(230, 255, 0)"]);
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__[
          "createElement"
        ](
          react__WEBPACK_IMPORTED_MODULE_4__["Fragment"],
          null,
          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__["createElement"](
            framer_motion__WEBPACK_IMPORTED_MODULE_8__ /* motion */["a"].div,
            {
              layout: true,
              style: {
                background: background,
                height: height,
                width: width,
                position: "relative",
              },
            },
          ),
          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__["createElement"](
            framer_motion__WEBPACK_IMPORTED_MODULE_8__ /* motion */["a"].div,
            {
              // layout
              drag: true,
              dragElastic: 0.5, // dragListener={true}
              dragConstraints: {
                top: 0,
                bottom: height - 100,
                left: 0,
                right: width - 100,
              },
              style: {
                position: "absolute",
                x: x,
              },
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__["createElement"](
              Styled,
              null,
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__["createElement"](
                Sha256Writer,
                {
                  onNew: function onNew(hash) {
                    return console.log(hash);
                  },
                },
              ),
            ),
          ),
        );
      };
      var Container =
        _emotion_styled__WEBPACK_IMPORTED_MODULE_5__ /* default */["a"].div(
          _templateObject4(),
        );
      function Page() {
        var _React$useState2 = react__WEBPACK_IMPORTED_MODULE_4__["useState"]({
            height: 600,
            width: 400,
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
              width: newWith,
            });
          }, 1000);
        }, []);
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__[
          "createElement"
        ](
          react__WEBPACK_IMPORTED_MODULE_4__["Fragment"],
          null,
          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__["createElement"](
            react_helmet__WEBPACK_IMPORTED_MODULE_7__ /* Helmet */["a"],
            null,
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__["createElement"](
              "style",
              {
                type: "text/css",
              },
              "\n      html {\n          height: 100vh;\n          width: 100vw;\n          overflow: hidden;\n      }",
            ),
          ),
          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__["createElement"](
            Container,
            null,
            typeof window !== "undefined"
              ? /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_4__[
                "createElement"
              ](MyComponent, {
                height: height,
                width: width,
                adjust: function adjust(x, y) {
                  var total = width * height;
                  var newWith = width - x;
                  var newHeight = total / newWith;
                  changeSize({
                    height: newHeight,
                    width: newWith,
                  });
                },
              })
              : "Loading",
          ),
        );
      }

      /***/
    }),
}]);

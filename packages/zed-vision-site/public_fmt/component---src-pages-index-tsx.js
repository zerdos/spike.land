(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[8], {
  /***/ 231: /***/ (function (module, exports, __webpack_require__) {
    module.exports = __webpack_require__.p +
      "static/forkMe-1a2bcb7dd2c870c3afe5d50466500c18.png";

    /***/
  }),

  /***/ 249:
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      // ESM COMPAT FLAG
      __webpack_require__.r(__webpack_exports__);

      // EXPORTS
      __webpack_require__.d(__webpack_exports__, "pageQuery", function () {
        return /* binding */ pageQuery;
      });

      // EXTERNAL MODULE: /z/monorepo/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteralLoose.js
      var taggedTemplateLiteralLoose = __webpack_require__(8);

      // EXTERNAL MODULE: /z/monorepo/node_modules/react/index.js
      var react = __webpack_require__(0);

      // EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js
      var gatsby_browser_entry = __webpack_require__(15);

      // EXTERNAL MODULE: ./src/components/bio.tsx
      var bio = __webpack_require__(56);

      // EXTERNAL MODULE: ./src/components/layout.tsx + 2 modules
      var layout = __webpack_require__(22);

      // EXTERNAL MODULE: ./src/components/seo.tsx
      var seo = __webpack_require__(18);

      // EXTERNAL MODULE: ./src/components/utils/typography.ts
      var typography = __webpack_require__(28);

      // EXTERNAL MODULE: /z/monorepo/node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js + 2 modules
      var emotion_styled_browser_esm = __webpack_require__(10);

      // EXTERNAL MODULE: ./assets/forkMe.png
      var forkMe = __webpack_require__(231);
      var forkMe_default = /*#__PURE__*/ __webpack_require__.n(forkMe);

      // EXTERNAL MODULE: /z/monorepo/node_modules/@babel/runtime/regenerator/index.js
      var regenerator = __webpack_require__(19);
      var regenerator_default = /*#__PURE__*/ __webpack_require__.n(
        regenerator,
      );

      // EXTERNAL MODULE: /z/monorepo/node_modules/regenerator-runtime/runtime.js
      var runtime = __webpack_require__(9);

      // EXTERNAL MODULE: /z/monorepo/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
      var asyncToGenerator = __webpack_require__(20);

      // CONCATENATED MODULE: ./src/sw-reg.js
      function _createForOfIteratorHelperLoose(o, allowArrayLike) {
        var it;
        if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
          if (
            Array.isArray(o) || (it = _unsupportedIterableToArray(o)) ||
            allowArrayLike && o && typeof o.length === "number"
          ) {
            if (it) o = it;
            var i = 0;
            return function () {
              if (i >= o.length) return { done: true };
              return { done: false, value: o[i++] };
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
          );
        }
        it = o[Symbol.iterator]();
        return it.next.bind(it);
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (
          n === "Arguments" ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
        ) {
          return _arrayLikeToArray(o, minLen);
        }
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
      }
      var registerSW = /*#__PURE__*/ function () {
        var _ref = Object(
          asyncToGenerator["a"/* default */
          ],
        )(/*#__PURE__*/ regenerator_default.a.mark(function _callee() {
          return regenerator_default.a.wrap(
            function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    if (
                      !((window.location.hostname === "localhost" ||
                        window.location.hostname === "127.0.0.1" ||
                        window.location.hostname === "0.0.0.0") &&
                        "serviceWorker" in navigator)
                    ) {
                      _context.next = 4;
                      break;
                    }
                    navigator.serviceWorker.getRegistrations().then(
                      function (registrations) {
                        for (
                          var _iterator = _createForOfIteratorHelperLoose(
                              registrations,
                            ),
                            _step;
                          !(_step = _iterator()).done;
                        ) {
                          var registration = _step.value;
                          registration.unregister();
                        }
                      },
                    );
                    return _context.abrupt("return");
                  case 4:
                    _context.next = 6;
                    return navigator.serviceWorker.register(
                      "/service-worker.js",
                      { updateViaCache: "imports", scope: "/" },
                    );
                  case 6:
                    _context.next = 11;
                    break;
                  case 8:
                    _context.prev = 8;
                    _context.t0 = _context["catch"](0);
                    console.log("Registration failed with " + _context.t0);
                  case 11:
                    if ("serviceWorker" in navigator) {
                      window.addEventListener("load", function () {
                        return registerSW();
                      });
                    }
                  case 12:
                  case "end":
                    return _context.stop();
                }
              }
            },
            _callee,
            null,
            [[0, 8]],
          );
        }));
        return function registerSW() {
          return _ref.apply(this, arguments);
        };
      }();
      // CONCATENATED MODULE: ./src/pages/index.tsx

      function _templateObject2() {
        var data = Object(
          taggedTemplateLiteralLoose["a"/* default */
          ],
        )(["\n  margin-bottom: ", ";\n"]);

        _templateObject2 = function _templateObject2() {
          return data;
        };

        return data;
      }

      function _templateObject() {
        var data = Object(
          taggedTemplateLiteralLoose["a"/* default */
          ],
        )(['\n  box-shadow: "none";\n']);

        _templateObject = function _templateObject() {
          return data;
        };

        return data;
      }

      var StyledLink = Object(
        emotion_styled_browser_esm["a"/* default */
        ],
      )(gatsby_browser_entry["Link"])(_templateObject());
      var H3 = emotion_styled_browser_esm["a"/* default */
      ].h3(
        _templateObject2(),
        Object(
          typography["b"/* rhythm */
          ],
        )(1 / 4),
      );

      var pages_BlogIndex = function BlogIndex(_ref) {
        var data = _ref.data;
        var edges = data.allMdx.edges;
        react["useEffect"](function () {
          if (typeof window !== "undefined") {
            registerSW();
          }
        }, []);
        return /*#__PURE__*/ react["createElement"](
          layout["a"/* Layout */
          ],
          null,
          /*#__PURE__*/ react["createElement"](
            seo["a"/* SEO */
            ],
            {
              title: "This is Zed vision",
            },
          ),
          /*#__PURE__*/ react["createElement"](
            "h1",
            null,
            "Hi, this is my playground",
          ),
          /*#__PURE__*/ react["createElement"](
            "a",
            {
              href: "https://github.com/zed-vision/monorepo",
            },
            /*#__PURE__*/ react["createElement"]("img", {
              loading: "lazy",
              width: "149",
              height: "149",
              src: forkMe_default.a,
              style: {
                position: "absolute",
                top: 0,
                right: 0,
              },
              alt: "Fork me on GitHub",
            }),
          ),
          edges.map(function (_ref2) {
            var node = _ref2.node;
            var title = node.frontmatter.title || node.fields.slug;
            return /*#__PURE__*/ react["createElement"](
              "article",
              {
                key: node.fields.slug,
              },
              /*#__PURE__*/ react["createElement"](
                "header",
                null,
                /*#__PURE__*/ react["createElement"](
                  H3,
                  null,
                  /*#__PURE__*/ react["createElement"](StyledLink, {
                    to: node.fields.slug,
                  }, title),
                ),
                /*#__PURE__*/ react["createElement"](
                  "small",
                  null,
                  node.frontmatter.date,
                ),
              ),
              /*#__PURE__*/ react["createElement"](
                "section",
                null,
                /*#__PURE__*/ react["createElement"]("p", {
                  dangerouslySetInnerHTML: {
                    __html: node.frontmatter.description || node.excerpt,
                  },
                }),
              ),
            );
          }),
          /*#__PURE__*/ react["createElement"](
            bio["a"/* Bio */
            ],
            null,
          ),
        );
      };

      /* harmony default export */ var pages = __webpack_exports__["default"] =
        (pages_BlogIndex);
      var pageQuery = "497448492";

      /***/
    }),

  /***/ 56: /***/ (function (module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony export (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "a",
      function () {
        return Bio;
      },
    );
    /* harmony import */ var _babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(8);
    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(0);
    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default =
      /*#__PURE__*/ __webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(10);
    /* harmony import */ var _utils_typography__WEBPACK_IMPORTED_MODULE_3__ =
      __webpack_require__(28);
    /* harmony import */ var _zed_profile_pic_jpg__WEBPACK_IMPORTED_MODULE_4__ =
      __webpack_require__(57);
    /* harmony import */ var _zed_profile_pic_jpg__WEBPACK_IMPORTED_MODULE_4___default =
      /*#__PURE__*/ __webpack_require__.n(
        _zed_profile_pic_jpg__WEBPACK_IMPORTED_MODULE_4__,
      );

    function _templateObject2() {
      var data = Object(
        _babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__/* default */ [
          "a"
        ],
      )([
        "\n  margin-right: ",
        ";\n  margin-bottom: 0;\n  overflow: hidden;\n  width: 50px;\n  height: 50px;\n  border-radius: 25px;\n",
      ]);

      _templateObject2 = function _templateObject2() {
        return data;
      };

      return data;
    }

    function _templateObject() {
      var data = Object(
        _babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__/* default */ [
          "a"
        ],
      )(["\n  margin-top: ", ";\n  display: flex;\n  margin-bottom: ", ";\n"]);

      _templateObject = function _templateObject() {
        return data;
      };

      return data;
    }

    var Container =
      _emotion_styled__WEBPACK_IMPORTED_MODULE_2__/* default */ ["a"].div(
        _templateObject(),
        Object(
          _utils_typography__WEBPACK_IMPORTED_MODULE_3__/* rhythm */ ["b"],
        )(2.5),
        Object(
          _utils_typography__WEBPACK_IMPORTED_MODULE_3__/* rhythm */ ["b"],
        )(2.5),
      );
    var StyledImgDiv =
      _emotion_styled__WEBPACK_IMPORTED_MODULE_2__/* default */ ["a"].div(
        _templateObject2(),
        Object(
          _utils_typography__WEBPACK_IMPORTED_MODULE_3__/* rhythm */ ["b"],
        )(1 / 2),
      );
    var Bio = function Bio() {
      return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__["createElement"](
        Container,
        null,
        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__["createElement"](
          StyledImgDiv,
          null,
          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__["createElement"](
            "img",
            {
              alt: "Zoltan Erdos",
              src: _zed_profile_pic_jpg__WEBPACK_IMPORTED_MODULE_4___default.a,
            },
          ),
        ),
        /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__["createElement"](
          "p",
          null,
          "Written by ",
          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__["createElement"](
            "strong",
            null,
            "Zoltan Erdos",
          ),
          "developer experience and software quality expert",
          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__["createElement"](
            "br",
            null,
          ),
          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__["createElement"](
            "a",
            {
              href: "https://twitter.com/ZoltanErdos",
            },
            "Follow me on Twitter",
          ),
        ),
      );
    };

    /***/
  }),

  /***/ 57: /***/ (function (module, exports, __webpack_require__) {
    module.exports = __webpack_require__.p +
      "static/zed-profile-pic-cd941e033fafca9e98b23dae7e5a0ccc.jpg";

    /***/
  }),
}]);

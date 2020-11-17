(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[15], {
  /***/ 229:
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "pageQuery",
        function () {
          return pageQuery;
        },
      );
      /* harmony import */ var _babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(4);
      /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(0);
      /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default =
        /*#__PURE__*/ __webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
      /* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ =
        __webpack_require__(17);
      /* harmony import */ var _components_bio__WEBPACK_IMPORTED_MODULE_3__ =
        __webpack_require__(53);
      /* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_4__ =
        __webpack_require__(20);
      /* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_5__ =
        __webpack_require__(19);
      /* harmony import */ var _components_utils_typography__WEBPACK_IMPORTED_MODULE_6__ =
        __webpack_require__(24);
      /* harmony import */ var gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_7__ =
        __webpack_require__(230);
      /* harmony import */ var gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_7___default =
        /*#__PURE__*/ __webpack_require__.n(
          gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_7__,
        );
      /* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_8__ =
        __webpack_require__(6);
      /* harmony import */ var _components_codeBox_CodeBox__WEBPACK_IMPORTED_MODULE_9__ =
        __webpack_require__(90);
      /* harmony import */ var _mdx_js_react__WEBPACK_IMPORTED_MODULE_10__ =
        __webpack_require__(44);

      function _templateObject3() {
        var data = Object(
          _babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__ /* default */[
            "a"
          ],
        )(["\n  margin-bottom: ", ";\n"]);

        _templateObject3 = function _templateObject3() {
          return data;
        };

        return data;
      }

      function _templateObject2() {
        var data = Object(
          _babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__ /* default */[
            "a"
          ],
        )([
          "\n  font-size: ",
          ";\n  line-height: ",
          ";\n  display: block;\n  margin-bottom: ",
          ";\n",
        ]);

        _templateObject2 = function _templateObject2() {
          return data;
        };

        return data;
      }

      function _templateObject() {
        var data = Object(
          _babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__ /* default */[
            "a"
          ],
        )(["\n  margin-top: ", ";\n  margin-bottom: 0;\n"]);

        _templateObject = function _templateObject() {
          return data;
        };

        return data;
      }

      var components = {
        pre: function PreComp(props) {
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__[
            "createElement"
          ]("div", props);
        },
        code:
          _components_codeBox_CodeBox__WEBPACK_IMPORTED_MODULE_9__ /* CodeBox */[
            "a"
          ],
      };
      var StyledHeader =
        _emotion_styled__WEBPACK_IMPORTED_MODULE_8__ /* default */["a"].h1(
          _templateObject(),
          Object(
            _components_utils_typography__WEBPACK_IMPORTED_MODULE_6__ /* rhythm */[
              "b"
            ],
          )(1),
        );

      var _scale = Object(
          _components_utils_typography__WEBPACK_IMPORTED_MODULE_6__ /* scale */[
            "c"
          ],
        )(1 / 5),
        fontSize = _scale.fontSize,
        lineHeight = _scale.lineHeight;

      var StyledDate =
        _emotion_styled__WEBPACK_IMPORTED_MODULE_8__ /* default */["a"].p(
          _templateObject2(),
          fontSize,
          lineHeight,
          Object(
            _components_utils_typography__WEBPACK_IMPORTED_MODULE_6__ /* rhythm */[
              "b"
            ],
          )(1),
        );
      var Hr = _emotion_styled__WEBPACK_IMPORTED_MODULE_8__ /* default */["a"]
        .hr(
          _templateObject3(),
          Object(
            _components_utils_typography__WEBPACK_IMPORTED_MODULE_6__ /* rhythm */[
              "b"
            ],
          )(1),
        );

      var BlogPostTemplate = function BlogPostTemplate(_ref) {
        var data = _ref.data,
          pageContext = _ref.pageContext;
        var post = data.mdx;
        var previous = pageContext.previous,
          next = pageContext.next;

        var BlogPost = function BlogPost() {
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__[
            "createElement"
          ](
            _mdx_js_react__WEBPACK_IMPORTED_MODULE_10__["MDXProvider"],
            {
              components: components,
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__["createElement"](
              gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_7__["MDXRenderer"],
              null,
              post.body,
            ),
          );
        };

        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__[
          "createElement"
        ](
          react__WEBPACK_IMPORTED_MODULE_1__["Fragment"],
          null,
          /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__["createElement"](
            _components_layout__WEBPACK_IMPORTED_MODULE_4__ /* Layout */["a"],
            null,
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__["createElement"](
              _components_seo__WEBPACK_IMPORTED_MODULE_5__ /* SEO */["a"],
              {
                title: post.frontmatter.title,
                description: post.frontmatter.description || post.excerpt,
              },
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__["createElement"](
              "header",
              null,
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__["createElement"](
                StyledHeader,
                null,
                post.frontmatter.title,
              ),
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__["createElement"](
                StyledDate,
                null,
                post.frontmatter.date,
              ),
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__["createElement"](
              BlogPost,
              null,
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__["createElement"](
              Hr,
              null,
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__["createElement"](
              "footer",
              null,
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__["createElement"](
                _components_bio__WEBPACK_IMPORTED_MODULE_3__ /* Bio */["a"],
                null,
              ),
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__["createElement"](
              "nav",
              null,
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__["createElement"](
                "ul",
                null,
                previous && /*#__PURE__*/
                  react__WEBPACK_IMPORTED_MODULE_1__["createElement"](
                    "li",
                    null,
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__[
                      "createElement"
                    ](
                      gatsby__WEBPACK_IMPORTED_MODULE_2__["Link"],
                      {
                        to: previous.fields.slug,
                        rel: "prev",
                      },
                      "\u2190 ",
                      previous.frontmatter.title,
                    ),
                  ),
                next && /*#__PURE__*/
                  react__WEBPACK_IMPORTED_MODULE_1__["createElement"](
                    "li",
                    null,
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__[
                      "createElement"
                    ](
                      gatsby__WEBPACK_IMPORTED_MODULE_2__["Link"],
                      {
                        to: next.fields.slug,
                        rel: "next",
                      },
                      next.frontmatter.title,
                      " \u2192",
                    ),
                  ),
              ),
            ),
          ),
        );
      };

      /* harmony default export */ __webpack_exports__["default"] =
        (BlogPostTemplate);
      var pageQuery = "2168380918";

      /***/
    }),

  /***/ 230: /***/ (function (module, exports, __webpack_require__) {
    /**
 * Welcome to gatsby-plugin-mdx!
 *
 * Start reading in gatsby-node.js
 */ var MDXRenderer = __webpack_require__(231);
    module.exports = { MDXRenderer: MDXRenderer };

    /***/
  }),

  /***/ 231: /***/ (function (module, exports, __webpack_require__) {
    var _construct = __webpack_require__(232);
    var _toConsumableArray = __webpack_require__(235);
    var _defineProperty = __webpack_require__(240);
    var _objectWithoutPropertiesLoose = __webpack_require__(72);
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
          symbols = symbols.filter(function (sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        }
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function (key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(
            target,
            Object.getOwnPropertyDescriptors(source),
          );
        } else {
          ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(
              target,
              key,
              Object.getOwnPropertyDescriptor(source, key),
            );
          });
        }
      }
      return target;
    }
    var React = __webpack_require__(0);
    var _require = __webpack_require__(44), mdx = _require.mdx;
    var _require2 = __webpack_require__(71),
      useMDXScope = _require2.useMDXScope;
    module.exports = function MDXRenderer(_ref) {
      var scope = _ref.scope,
        children = _ref.children,
        props = _objectWithoutPropertiesLoose(_ref, ["scope", "children"]);
      var mdxScope = useMDXScope(scope); // Memoize the compiled component
      var End = React.useMemo(function () {
        if (!children) return null;
        var fullScope = _objectSpread({ // React is here just in case the user doesn't pass them in
          // in a manual usage of the renderer
          React: React,
          mdx: mdx,
        }, mdxScope);
        var keys = Object.keys(fullScope);
        var values = keys.map(function (key) {
          return fullScope[key];
        });
        var fn = _construct(
          Function,
          ["_fn"].concat(_toConsumableArray(keys), ["" + children]),
        );
        return fn.apply(void 0, [{}].concat(_toConsumableArray(values)));
      }, [children, scope]);
      return React.createElement(End, _objectSpread({}, props));
    };

    /***/
  }),

  /***/ 232: /***/ (function (module, exports, __webpack_require__) {
    var setPrototypeOf = __webpack_require__(233);

    var isNativeReflectConstruct = __webpack_require__(234);

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

    /***/
  }),

  /***/ 233: /***/ (function (module, exports) {
    function _setPrototypeOf(o, p) {
      module.exports = _setPrototypeOf = Object.setPrototypeOf ||
        function _setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
        };

      return _setPrototypeOf(o, p);
    }

    module.exports = _setPrototypeOf;

    /***/
  }),

  /***/ 234: /***/ (function (module, exports) {
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;

      try {
        Date.prototype.toString.call(
          Reflect.construct(Date, [], function () {}),
        );
        return true;
      } catch (e) {
        return false;
      }
    }

    module.exports = _isNativeReflectConstruct;

    /***/
  }),

  /***/ 235: /***/ (function (module, exports, __webpack_require__) {
    var arrayWithoutHoles = __webpack_require__(236);

    var iterableToArray = __webpack_require__(237);

    var unsupportedIterableToArray = __webpack_require__(238);

    var nonIterableSpread = __webpack_require__(239);

    function _toConsumableArray(arr) {
      return arrayWithoutHoles(arr) || iterableToArray(arr) ||
        unsupportedIterableToArray(arr) || nonIterableSpread();
    }

    module.exports = _toConsumableArray;

    /***/
  }),

  /***/ 236: /***/ (function (module, exports, __webpack_require__) {
    var arrayLikeToArray = __webpack_require__(89);

    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return arrayLikeToArray(arr);
    }

    module.exports = _arrayWithoutHoles;

    /***/
  }),

  /***/ 237: /***/ (function (module, exports) {
    function _iterableToArray(iter) {
      if (
        typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)
      ) {
        return Array.from(iter);
      }
    }

    module.exports = _iterableToArray;

    /***/
  }),

  /***/ 238: /***/ (function (module, exports, __webpack_require__) {
    var arrayLikeToArray = __webpack_require__(89);

    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (
        n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
      ) {
        return arrayLikeToArray(o, minLen);
      }
    }

    module.exports = _unsupportedIterableToArray;

    /***/
  }),

  /***/ 239: /***/ (function (module, exports) {
    function _nonIterableSpread() {
      throw new TypeError(
        "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
      );
    }

    module.exports = _nonIterableSpread;

    /***/
  }),

  /***/ 240: /***/ (function (module, exports) {
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true,
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    module.exports = _defineProperty;

    /***/
  }),

  /***/ 53: /***/ (function (module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony export (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "a",
      function () {
        return Bio;
      },
    );
    /* harmony import */ var _babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(4);
    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(0);
    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default =
      /*#__PURE__*/ __webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(6);
    /* harmony import */ var _utils_typography__WEBPACK_IMPORTED_MODULE_3__ =
      __webpack_require__(24);
    /* harmony import */ var _zed_profile_pic_jpg__WEBPACK_IMPORTED_MODULE_4__ =
      __webpack_require__(54);
    /* harmony import */ var _zed_profile_pic_jpg__WEBPACK_IMPORTED_MODULE_4___default =
      /*#__PURE__*/ __webpack_require__.n(
        _zed_profile_pic_jpg__WEBPACK_IMPORTED_MODULE_4__,
      );

    function _templateObject2() {
      var data = Object(
        _babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__ /* default */[
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
        _babel_runtime_helpers_esm_taggedTemplateLiteralLoose__WEBPACK_IMPORTED_MODULE_0__ /* default */[
          "a"
        ],
      )(["\n  margin-top: ", ";\n  display: flex;\n  margin-bottom: ", ";\n"]);

      _templateObject = function _templateObject() {
        return data;
      };

      return data;
    }

    var Container =
      _emotion_styled__WEBPACK_IMPORTED_MODULE_2__ /* default */["a"].div(
        _templateObject(),
        Object(
          _utils_typography__WEBPACK_IMPORTED_MODULE_3__ /* rhythm */["b"],
        )(2.5),
        Object(
          _utils_typography__WEBPACK_IMPORTED_MODULE_3__ /* rhythm */["b"],
        )(2.5),
      );
    var StyledImgDiv =
      _emotion_styled__WEBPACK_IMPORTED_MODULE_2__ /* default */["a"].div(
        _templateObject2(),
        Object(
          _utils_typography__WEBPACK_IMPORTED_MODULE_3__ /* rhythm */["b"],
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

  /***/ 54: /***/ (function (module, exports, __webpack_require__) {
    module.exports = __webpack_require__.p +
      "static/zed-profile-pic-5e9304b71289e19e25c128ce8fa758fe.jpg";

    /***/
  }),

  /***/ 89: /***/ (function (module, exports) {
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }

    module.exports = _arrayLikeToArray;

    /***/
  }),
}]);

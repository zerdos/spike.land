/*! jsframe v6.0.0 Copyright (c) 2007-2020 Tom Misawa */
(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === "object" && typeof module === "object") {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define([], factory);
  } else {
    var a = factory();
    for (var i in a) (typeof exports === "object" ? exports : root)[i] = a[i];
  }
})(self, function () {
  return /******/ (() => { // webpackBootstrap
    /******/ var __webpack_modules__ = ({
      /***/ "./node_modules/@riversun/event-emitter/lib/event-emitter.js":
        /*!*******************************************************************!*
  !*** ./node_modules/@riversun/event-emitter/lib/event-emitter.js ***!
  \*******************************************************************/
        /***/ (function (module) {
          /*! event-emitter(https://github.com/riversun/event-emitter) v1.5.0 Copyright (c) 2020 riversun.org@gmail.com */
          !function (e, t) {
            true ? module.exports = t() : 0;
          }(
            this,
            (function () {
              return (() => {
                "use strict";
                var e = {
                    561: (e, t, n) => {
                      function r(e, t) {
                        return function (e) {
                          if (Array.isArray(e)) return e;
                        }(e) || function (e, t) {
                          if (
                            "undefined" == typeof Symbol ||
                            !(Symbol.iterator in Object(e))
                          ) {
                            return;
                          }
                          var n = [], r = !0, i = !1, o = void 0;
                          try {
                            for (
                              var s, u = e[Symbol.iterator]();
                              !(r = (s = u.next()).done) &&
                              (n.push(s.value), !t || n.length !== t);
                              r = !0
                            );
                          } catch (e) {
                            i = !0, o = e;
                          } finally {
                            try {
                              r || null == u.return || u.return();
                            } finally {
                              if (i) throw o;
                            }
                          }
                          return n;
                        }(e, t) || o(e, t) || function () {
                          throw new TypeError(
                            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                          );
                        }();
                      }
                      function i(e, t) {
                        var n;
                        if (
                          "undefined" == typeof Symbol ||
                          null == e[Symbol.iterator]
                        ) {
                          if (
                            Array.isArray(e) || (n = o(e)) ||
                            t && e && "number" == typeof e.length
                          ) {
                            n && (e = n);
                            var r = 0, i = function () {};
                            return {
                              s: i,
                              n: function () {
                                return r >= e.length
                                  ? { done: !0 }
                                  : { done: !1, value: e[r++] };
                              },
                              e: function (e) {
                                throw e;
                              },
                              f: i,
                            };
                          }
                          throw new TypeError(
                            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                          );
                        }
                        var s, u = !0, c = !1;
                        return {
                          s: function () {
                            n = e[Symbol.iterator]();
                          },
                          n: function () {
                            var e = n.next();
                            return u = e.done, e;
                          },
                          e: function (e) {
                            c = !0, s = e;
                          },
                          f: function () {
                            try {
                              u || null == n.return || n.return();
                            } finally {
                              if (c) throw s;
                            }
                          },
                        };
                      }
                      function o(e, t) {
                        if (e) {
                          if ("string" == typeof e) return s(e, t);
                          var n = Object.prototype.toString.call(e).slice(
                            8,
                            -1,
                          );
                          return "Object" === n && e.constructor &&
                            (n = e.constructor.name),
                            "Map" === n || "Set" === n
                              ? Array.from(e)
                              : "Arguments" === n ||
                                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/
                                    .test(n)
                              ? s(e, t)
                              : void 0;
                        }
                      }
                      function s(e, t) {
                        (null == t || t > e.length) && (t = e.length);
                        for (var n = 0, r = new Array(t); n < t; n++) {
                          r[n] = e[n];
                        }
                        return r;
                      }
                      function u(e, t) {
                        if (!(e instanceof t)) {
                          throw new TypeError(
                            "Cannot call a class as a function",
                          );
                        }
                      }
                      function c(e, t) {
                        for (var n = 0; n < t.length; n++) {
                          var r = t[n];
                          r.enumerable = r.enumerable || !1,
                            r.configurable = !0,
                            "value" in r && (r.writable = !0),
                            Object.defineProperty(e, r.key, r);
                        }
                      }
                      function a(e, t, n) {
                        return t && c(e.prototype, t), n && c(e, n), e;
                      }
                      n.d(t, { default: () => l });
                      var l = function () {
                          function e(t) {
                            if (
                              u(this, e),
                                this.onListeners = new Map(),
                                this.onlyListeners = new Map(),
                                t
                            ) {
                              var n, r = i(t);
                              try {
                                for (r.s(); !(n = r.n()).done;) {
                                  var o = n.value, s = new f();
                                  this.onListeners.set(o, s);
                                }
                              } catch (e) {
                                r.e(e);
                              } finally {
                                r.f();
                              }
                            }
                            this.childEventEmitters = [],
                              this.onIntercepterFuncs = {};
                          }
                          return a(e, [
                            {
                              key: "on",
                              value: function (e, t) {
                                var n = this.onListeners.get(e);
                                if (
                                  n ||
                                  (n = new f(), this.onListeners.set(e, n)),
                                    n.addListenerFunc(t),
                                    this.onIntercepterFuncs
                                ) {
                                  for (
                                    var i = 0,
                                      o = Object.entries(
                                        this.onIntercepterFuncs,
                                      );
                                    i < o.length;
                                    i++
                                  ) {
                                    var s = r(o[i], 2), u = s[0];
                                    (0, s[1])(
                                      {
                                        eventType: e,
                                        func: t,
                                        onIntercepterFuncname: u,
                                      },
                                    );
                                  }
                                }
                              },
                            },
                            {
                              key: "removeListener",
                              value: function (e, t) {
                                var n = this.onListeners.get(e);
                                n && n.removeListener(t);
                              },
                            },
                            {
                              key: "only",
                              value: function (e, t, n) {
                                var r = this.onlyListeners.get(e);
                                r ||
                                (r = new h(), this.onlyListeners.set(e, r)),
                                  r.putListenerFunc(t, n);
                              },
                            },
                            {
                              key: "pipe",
                              value: function (e) {
                                this.childEventEmitters.push(e);
                              },
                            },
                            {
                              key: "emit",
                              value: function (e, t) {
                                var n = this.onListeners.get(e);
                                n && (t.eventType = e, n.callListenerFunc(t));
                                var r = this.onlyListeners.get(e);
                                r && (t.eventType = e, r.callListenerFunc(t));
                                var o, s = i(this.childEventEmitters);
                                try {
                                  for (s.s(); !(o = s.n()).done;) {
                                    o.value.emit(e, t);
                                  }
                                } catch (e) {
                                  s.e(e);
                                } finally {
                                  s.f();
                                }
                              },
                            },
                            {
                              key: "getAllListeners",
                              value: function () {
                                var e = {};
                                this.onListeners.forEach(
                                  (function (t, n) {
                                    var r = n, i = t.getAllListeners();
                                    e[r] || (e[r] = {}), e[r].listeners = i;
                                  }),
                                );
                                var t, n = 0, r = i(this.childEventEmitters);
                                try {
                                  for (r.s(); !(t = r.n()).done;) {
                                    t.value.onListeners.forEach(
                                      (function (t, r) {
                                        var i = r, o = t.getAllListeners();
                                        e[i] || (e[i] = {}),
                                          e[i].childEventEmitters ||
                                          (e[i].childEventEmitters = []),
                                          e[i].childEventEmitters.push(
                                            {
                                              childEmitterIdx: n,
                                              listeners: o,
                                            },
                                          );
                                      }),
                                    ), n++;
                                  }
                                } catch (e) {
                                  r.e(e);
                                } finally {
                                  r.f();
                                }
                                return e;
                              },
                            },
                            {
                              key: "hasListenerFuncs",
                              value: function (e) {
                                if (this.onListeners.has(e)) {
                                  var t = this.onListeners.get(e);
                                  if (t && t.hasListenerFunc()) return !0;
                                }
                                var n, r = i(this.childEventEmitters);
                                try {
                                  for (r.s(); !(n = r.n()).done;) {
                                    if (n.value.hasListenerFuncs(e)) return !0;
                                  }
                                } catch (e) {
                                  r.e(e);
                                } finally {
                                  r.f();
                                }
                                return !1;
                              },
                            },
                            {
                              key: "clearAll",
                              value: function () {
                                var e, t = i(this.onListeners.values());
                                try {
                                  for (t.s(); !(e = t.n()).done;) {
                                    e.value.clearAll();
                                  }
                                } catch (e) {
                                  t.e(e);
                                } finally {
                                  t.f();
                                }
                                this.onListeners.clear();
                                var n, r = i(this.onlyListeners.values());
                                try {
                                  for (r.s(); !(n = r.n()).done;) {
                                    n.value.clearAll();
                                  }
                                } catch (e) {
                                  r.e(e);
                                } finally {
                                  r.f();
                                }
                                this.onlyListeners.clear(),
                                  this.childEventEmitters = [];
                              },
                            },
                            {
                              key: "addOnIntercepterFunc",
                              value: function (e, t) {
                                if (this.onIntercepterFuncs[e]) {
                                  throw Error(
                                    'Always registered intercepter func "'
                                      .concat(e, '".'),
                                  );
                                }
                                this.onIntercepterFuncs[e] = t;
                              },
                            },
                            {
                              key: "removeOnIntercepterFunc",
                              value: function (e) {
                                delete this.onIntercepterFuncs[e];
                              },
                            },
                            {
                              key: "getAllOnIntercepterFuncs",
                              value: function () {
                                for (
                                  var e = [],
                                    t = 0,
                                    n = Object.entries(this.onIntercepterFuncs);
                                  t < n.length;
                                  t++
                                ) {
                                  var i = r(n[t], 2), o = i[0], s = i[1];
                                  e.push({ funcName: o, func: s });
                                }
                                return e;
                              },
                            },
                          ]),
                            e;
                        }(),
                        f = function () {
                          function e() {
                            u(this, e), this.listenerFuncs = [];
                          }
                          return a(e, [
                            {
                              key: "clearAll",
                              value: function () {
                                this.listenerFuncs = [];
                              },
                            },
                            {
                              key: "getAllListeners",
                              value: function () {
                                return this.listenerFuncs;
                              },
                            },
                            {
                              key: "hasListenerFunc",
                              value: function () {
                                return this.listenerFuncs.length > 0;
                              },
                            },
                            {
                              key: "addListenerFunc",
                              value: function (e) {
                                this.listenerFuncs.push(e);
                              },
                            },
                            {
                              key: "callListenerFunc",
                              value: function (e) {
                                var t, n = i(this.listenerFuncs);
                                try {
                                  for (n.s(); !(t = n.n()).done;) {
                                    var r = t.value;
                                    if ("Function" !== this.typeOf(r)) {
                                      throw Error(
                                        '[@riversun/event-emitter] listenerFunction you set is not a function. listenerFunction:"'
                                          .concat(
                                            r,
                                            '".Check args of #only method or #on method.',
                                          ),
                                      );
                                    }
                                    r(e);
                                  }
                                } catch (e) {
                                  n.e(e);
                                } finally {
                                  n.f();
                                }
                              },
                            },
                            {
                              key: "removeListener",
                              value: function (e) {
                                this.removeArrayItemOnce(this.listenerFuncs, e);
                              },
                            },
                            {
                              key: "removeArrayItemOnce",
                              value: function (e, t) {
                                var n = e.indexOf(t);
                                return n > -1 && e.splice(n, 1), e;
                              },
                            },
                            {
                              key: "typeOf",
                              value: function (e) {
                                return Object.prototype.toString.call(e).slice(
                                  8,
                                  -1,
                                );
                              },
                            },
                          ]),
                            e;
                        }(),
                        h = function () {
                          function e() {
                            u(this, e), this.listenerFuncMap = new Map();
                          }
                          return a(e, [{
                            key: "clearAll",
                            value: function () {
                              this.listenerFuncMap.clear();
                            },
                          }, {
                            key: "hasListenerFunc",
                            value: function (e) {
                              return this.listenerFuncMap.has(e);
                            },
                          }, {
                            key: "putListenerFunc",
                            value: function (e, t) {
                              this.listenerFuncMap.set(e, t);
                            },
                          }, {
                            key: "callListenerFunc",
                            value: function (e) {
                              var t, n = i(this.listenerFuncMap.values());
                              try {
                                for (n.s(); !(t = n.n()).done;) {
                                  var r = t.value;
                                  if ("Function" !== this.typeOf(r)) {
                                    throw Error(
                                      '[@riversun/event-emitter] listenerFunction you set is not a function. listenerFunction:"'
                                        .concat(
                                          r,
                                          '".Check args of #only method or #on method.',
                                        ),
                                    );
                                  }
                                  r(e);
                                }
                              } catch (e) {
                                n.e(e);
                              } finally {
                                n.f();
                              }
                            },
                          }, {
                            key: "typeOf",
                            value: function (e) {
                              return Object.prototype.toString.call(e).slice(
                                8,
                                -1,
                              );
                            },
                          }]),
                            e;
                        }();
                    },
                  },
                  t = {};
                function n(r) {
                  if (t[r]) return t[r].exports;
                  var i = t[r] = { exports: {} };
                  return e[r](i, i.exports, n), i.exports;
                }
                return n.d = (e, t) => {
                  for (var r in t) {
                    n.o(t, r) && !n.o(e, r) &&
                      Object.defineProperty(
                        e,
                        r,
                        { enumerable: !0, get: t[r] },
                      );
                  }
                },
                  n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t),
                  n(561);
              })().default;
            }),
          );

          /***/
        }),

      /***/ "./node_modules/css-loader/dist/cjs.js!./src/JSFrame.css":
        /*!***************************************************************!*
  !*** ./node_modules/css-loader/dist/cjs.js!./src/JSFrame.css ***!
  \***************************************************************/
        /***/ ((module, __webpack_exports__, __webpack_require__) => {
          "use strict";
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ "default": () => __WEBPACK_DEFAULT_EXPORT__,
            /* harmony export */
          });
          /* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js",
            );
          /* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default =
            /*#__PURE__*/ __webpack_require__.n(
              _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__,
            );
          /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js",
            );
          /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default =
            /*#__PURE__*/ __webpack_require__.n(
              _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__,
            );
          // Imports

          var ___CSS_LOADER_EXPORT___ =
            _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(
              (_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()),
            );
          // Module
          ___CSS_LOADER_EXPORT___.push(
            [
              module.id,
              ".jsframe-titlebar-default {\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #f5f5f5, color-stop(1.0, #f8f7f2)));\n    background: -webkit-linear-gradient(top, #f5f5f5, #f8f7f2);\n    background: -moz-linear-gradient(top, #f5f5f5, #f8f7f2);\n    background: linear-gradient(top, #f5f5f5, #f8f7f2);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.jsframe-titlebar-focused {\n    /* (c)2015 Johannes Jakob\n       Made with <3 in Germany */\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #ebebeb, color-stop(1.0, #d5d5d5)));\n    background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5);\n    background: -moz-linear-gradient(top, #ebebeb, #d5d5d5);\n    background: linear-gradient(top, #ebebeb, #d5d5d5);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.jsframe-modal-window-background {\n    background: rgba(0, 0, 0, 0.6);\n    height: 100%;\n    widdth: 100%\n}",
              "",
              {
                "version": 3,
                "sources": ["webpack://./src/JSFrame.css"],
                "names": [],
                "mappings":
                  "AAAA;IACI,+GAA+G;IAC/G,0DAA0D;IAC1D,uDAAuD;IACvD,kDAAkD;IAClD,2BAA2B;IAC3B,4BAA4B;AAChC;;AAEA;IACI;gCAC4B;IAC5B,+GAA+G;IAC/G,0DAA0D;IAC1D,uDAAuD;IACvD,kDAAkD;IAClD,2BAA2B;IAC3B,4BAA4B;AAChC;;AAEA;IACI,8BAA8B;IAC9B,YAAY;IACZ;AACJ",
                "sourcesContent": [
                  ".jsframe-titlebar-default {\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #f5f5f5, color-stop(1.0, #f8f7f2)));\n    background: -webkit-linear-gradient(top, #f5f5f5, #f8f7f2);\n    background: -moz-linear-gradient(top, #f5f5f5, #f8f7f2);\n    background: linear-gradient(top, #f5f5f5, #f8f7f2);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.jsframe-titlebar-focused {\n    /* (c)2015 Johannes Jakob\n       Made with <3 in Germany */\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #ebebeb, color-stop(1.0, #d5d5d5)));\n    background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5);\n    background: -moz-linear-gradient(top, #ebebeb, #d5d5d5);\n    background: linear-gradient(top, #ebebeb, #d5d5d5);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.jsframe-modal-window-background {\n    background: rgba(0, 0, 0, 0.6);\n    height: 100%;\n    widdth: 100%\n}",
                ],
                "sourceRoot": "",
              },
            ],
          );
          // Exports
          /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
            (___CSS_LOADER_EXPORT___);

          /***/
        }),

      /***/ "./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStyleMaterial.css":
        /*!**********************************************************************************************!*
  !*** ./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStyleMaterial.css ***!
  \**********************************************************************************************/
        /***/ ((module, __webpack_exports__, __webpack_require__) => {
          "use strict";
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ "default": () => __WEBPACK_DEFAULT_EXPORT__,
            /* harmony export */
          });
          /* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! ../../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js",
            );
          /* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default =
            /*#__PURE__*/ __webpack_require__.n(
              _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__,
            );
          /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js",
            );
          /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default =
            /*#__PURE__*/ __webpack_require__.n(
              _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__,
            );
          // Imports

          var ___CSS_LOADER_EXPORT___ =
            _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(
              (_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()),
            );
          // Module
          ___CSS_LOADER_EXPORT___.push(
            [
              module.id,
              ".jsframe-preset-style-material-default {\n    background: black;\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.jsframe-preset-style-material-focused {\n    background: black;\n    border-top-left-radius: 36px;\n    border-top-right-radius: 36px;\n}\n",
              "",
              {
                "version": 3,
                "sources": [
                  "webpack://./src/presets/appearance/PresetStyleMaterial.css",
                ],
                "names": [],
                "mappings":
                  "AAAA;IACI,iBAAiB;IACjB,2BAA2B;IAC3B,4BAA4B;AAChC;;AAEA;IACI,iBAAiB;IACjB,4BAA4B;IAC5B,6BAA6B;AACjC",
                "sourcesContent": [
                  ".jsframe-preset-style-material-default {\n    background: black;\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.jsframe-preset-style-material-focused {\n    background: black;\n    border-top-left-radius: 36px;\n    border-top-right-radius: 36px;\n}\n",
                ],
                "sourceRoot": "",
              },
            ],
          );
          // Exports
          /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
            (___CSS_LOADER_EXPORT___);

          /***/
        }),

      /***/ "./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStylePopup.css":
        /*!*******************************************************************************************!*
  !*** ./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStylePopup.css ***!
  \*******************************************************************************************/
        /***/ ((module, __webpack_exports__, __webpack_require__) => {
          "use strict";
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ "default": () => __WEBPACK_DEFAULT_EXPORT__,
            /* harmony export */
          });
          /* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! ../../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js",
            );
          /* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default =
            /*#__PURE__*/ __webpack_require__.n(
              _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__,
            );
          /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js",
            );
          /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default =
            /*#__PURE__*/ __webpack_require__.n(
              _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__,
            );
          // Imports

          var ___CSS_LOADER_EXPORT___ =
            _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(
              (_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()),
            );
          // Module
          ___CSS_LOADER_EXPORT___.push(
            [
              module.id,
              ".jsframe-preset-style-popup-default {\n    background: white;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n}\n\n.jsframe-preset-style-popup-focused {\n    background: white;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n}\n",
              "",
              {
                "version": 3,
                "sources": [
                  "webpack://./src/presets/appearance/PresetStylePopup.css",
                ],
                "names": [],
                "mappings":
                  "AAAA;IACI,iBAAiB;IACjB,2BAA2B;IAC3B,4BAA4B;AAChC;;AAEA;IACI,iBAAiB;IACjB,2BAA2B;IAC3B,4BAA4B;AAChC",
                "sourcesContent": [
                  ".jsframe-preset-style-popup-default {\n    background: white;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n}\n\n.jsframe-preset-style-popup-focused {\n    background: white;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n}\n",
                ],
                "sourceRoot": "",
              },
            ],
          );
          // Exports
          /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
            (___CSS_LOADER_EXPORT___);

          /***/
        }),

      /***/ "./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStyleRedstone.css":
        /*!**********************************************************************************************!*
  !*** ./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStyleRedstone.css ***!
  \**********************************************************************************************/
        /***/ ((module, __webpack_exports__, __webpack_require__) => {
          "use strict";
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ "default": () => __WEBPACK_DEFAULT_EXPORT__,
            /* harmony export */
          });
          /* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! ../../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js",
            );
          /* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default =
            /*#__PURE__*/ __webpack_require__.n(
              _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__,
            );
          /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js",
            );
          /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default =
            /*#__PURE__*/ __webpack_require__.n(
              _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__,
            );
          // Imports

          var ___CSS_LOADER_EXPORT___ =
            _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(
              (_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()),
            );
          // Module
          ___CSS_LOADER_EXPORT___.push(
            [
              module.id,
              ".jsframe-preset-style-redstone-default {\n    background: white;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n}\n\n.jsframe-preset-style-redstone-focused {\n    background: white;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n}\n",
              "",
              {
                "version": 3,
                "sources": [
                  "webpack://./src/presets/appearance/PresetStyleRedstone.css",
                ],
                "names": [],
                "mappings":
                  "AAAA;IACI,iBAAiB;IACjB,2BAA2B;IAC3B,4BAA4B;AAChC;;AAEA;IACI,iBAAiB;IACjB,2BAA2B;IAC3B,4BAA4B;AAChC",
                "sourcesContent": [
                  ".jsframe-preset-style-redstone-default {\n    background: white;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n}\n\n.jsframe-preset-style-redstone-focused {\n    background: white;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n}\n",
                ],
                "sourceRoot": "",
              },
            ],
          );
          // Exports
          /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
            (___CSS_LOADER_EXPORT___);

          /***/
        }),

      /***/ "./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStyleYosemite.css":
        /*!**********************************************************************************************!*
  !*** ./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStyleYosemite.css ***!
  \**********************************************************************************************/
        /***/ ((module, __webpack_exports__, __webpack_require__) => {
          "use strict";
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ "default": () => __WEBPACK_DEFAULT_EXPORT__,
            /* harmony export */
          });
          /* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! ../../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js",
            );
          /* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default =
            /*#__PURE__*/ __webpack_require__.n(
              _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__,
            );
          /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js",
            );
          /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default =
            /*#__PURE__*/ __webpack_require__.n(
              _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__,
            );
          // Imports

          var ___CSS_LOADER_EXPORT___ =
            _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(
              (_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()),
            );
          // Module
          ___CSS_LOADER_EXPORT___.push(
            [
              module.id,
              ".jsframe-preset-style-yosemite-default {\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #f5f5f5, color-stop(1.0, #f8f7f2)));\n    background: -webkit-linear-gradient(top, #f5f5f5, #f8f7f2);\n    background: -moz-linear-gradient(top, #f5f5f5, #f8f7f2);\n    background: linear-gradient(top, #f5f5f5, #f8f7f2);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.jsframe-preset-style-yosemite-focused {\n    /* (c)2015 Johannes Jakob\n       Made with <3 in Germany */\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #ebebeb, color-stop(1.0, #d5d5d5)));\n    background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5);\n    background: -moz-linear-gradient(top, #ebebeb, #d5d5d5);\n    background: linear-gradient(top, #ebebeb, #d5d5d5);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n",
              "",
              {
                "version": 3,
                "sources": [
                  "webpack://./src/presets/appearance/PresetStyleYosemite.css",
                ],
                "names": [],
                "mappings":
                  "AAAA;IACI,+GAA+G;IAC/G,0DAA0D;IAC1D,uDAAuD;IACvD,kDAAkD;IAClD,2BAA2B;IAC3B,4BAA4B;AAChC;;AAEA;IACI;gCAC4B;IAC5B,+GAA+G;IAC/G,0DAA0D;IAC1D,uDAAuD;IACvD,kDAAkD;IAClD,2BAA2B;IAC3B,4BAA4B;AAChC",
                "sourcesContent": [
                  ".jsframe-preset-style-yosemite-default {\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #f5f5f5, color-stop(1.0, #f8f7f2)));\n    background: -webkit-linear-gradient(top, #f5f5f5, #f8f7f2);\n    background: -moz-linear-gradient(top, #f5f5f5, #f8f7f2);\n    background: linear-gradient(top, #f5f5f5, #f8f7f2);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.jsframe-preset-style-yosemite-focused {\n    /* (c)2015 Johannes Jakob\n       Made with <3 in Germany */\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #ebebeb, color-stop(1.0, #d5d5d5)));\n    background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5);\n    background: -moz-linear-gradient(top, #ebebeb, #d5d5d5);\n    background: linear-gradient(top, #ebebeb, #d5d5d5);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n",
                ],
                "sourceRoot": "",
              },
            ],
          );
          // Exports
          /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
            (___CSS_LOADER_EXPORT___);

          /***/
        }),

      /***/ "./node_modules/css-loader/dist/runtime/api.js":
        /*!*****************************************************!*
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
        /***/ ((module) => {
          "use strict";

          /*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
          */
          // css base code, injected by the css-loader
          // eslint-disable-next-line func-names
          module.exports = function (cssWithMappingToString) {
            var list = []; // return the list of modules as css string

            list.toString = function toString() {
              return this.map(function (item) {
                var content = cssWithMappingToString(item);

                if (item[2]) {
                  return "@media ".concat(item[2], " {").concat(content, "}");
                }

                return content;
              }).join("");
            }; // import a list of modules into the list
            // eslint-disable-next-line func-names

            list.i = function (modules, mediaQuery, dedupe) {
              if (typeof modules === "string") {
                // eslint-disable-next-line no-param-reassign
                modules = [[null, modules, ""]];
              }

              var alreadyImportedModules = {};

              if (dedupe) {
                for (var i = 0; i < this.length; i++) {
                  // eslint-disable-next-line prefer-destructuring
                  var id = this[i][0];

                  if (id != null) {
                    alreadyImportedModules[id] = true;
                  }
                }
              }

              for (var _i = 0; _i < modules.length; _i++) {
                var item = [].concat(modules[_i]);

                if (dedupe && alreadyImportedModules[item[0]]) {
                  // eslint-disable-next-line no-continue
                  continue;
                }

                if (mediaQuery) {
                  if (!item[2]) {
                    item[2] = mediaQuery;
                  } else {
                    item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
                  }
                }

                list.push(item);
              }
            };

            return list;
          };

          /***/
        }),

      /***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
        /*!************************************************************************!*
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
        /***/ ((module) => {
          "use strict";

          function _slicedToArray(arr, i) {
            return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) ||
              _unsupportedIterableToArray(arr, i) || _nonIterableRest();
          }

          function _nonIterableRest() {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
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
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          }

          function _iterableToArrayLimit(arr, i) {
            if (
              typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))
            ) {
              return;
            }
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;
            try {
              for (
                var _i = arr[Symbol.iterator](), _s;
                !(_n = (_s = _i.next()).done);
                _n = true
              ) {
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
              }
            } catch (err) {
              _d = true;
              _e = err;
            } finally {
              try {
                if (!_n && _i["return"] != null) _i["return"]();
              } finally {
                if (_d) throw _e;
              }
            }
            return _arr;
          }

          function _arrayWithHoles(arr) {
            if (Array.isArray(arr)) return arr;
          }

          module.exports = function cssWithMappingToString(item) {
            var _item = _slicedToArray(item, 4),
              content = _item[1],
              cssMapping = _item[3];

            if (typeof btoa === "function") {
              // eslint-disable-next-line no-undef
              var base64 = btoa(
                unescape(encodeURIComponent(JSON.stringify(cssMapping))),
              );
              var data =
                "sourceMappingURL=data:application/json;charset=utf-8;base64,"
                  .concat(base64);
              var sourceMapping = "/*# ".concat(data, " */");
              var sourceURLs = cssMapping.sources.map(function (source) {
                return "/*# sourceURL=".concat(cssMapping.sourceRoot || "")
                  .concat(source, " */");
              });
              return [content].concat(sourceURLs).concat([sourceMapping]).join(
                "\n",
              );
            }

            return [content].join("\n");
          };

          /***/
        }),

      /***/ "./node_modules/event-listener-helper/lib/event-listener-helper.js":
        /*!*************************************************************************!*
  !*** ./node_modules/event-listener-helper/lib/event-listener-helper.js ***!
  \*************************************************************************/
        /***/ (function (module) {
          /*! event-listener-helper(https://github.com/riversun/event-listener-helper) v1.1.2 Copyright (c) 2020 riversun.org@gmail.com */
          !function (e, t) {
            true ? module.exports = t() : 0;
          }(
            this,
            (function () {
              return function (e) {
                var t = {};
                function n(r) {
                  if (t[r]) return t[r].exports;
                  var i = t[r] = { i: r, l: !1, exports: {} };
                  return e[r].call(i.exports, i, i.exports, n),
                    i.l = !0,
                    i.exports;
                }
                return n.m = e,
                  n.c = t,
                  n.d = function (e, t, r) {
                    n.o(e, t) ||
                      Object.defineProperty(e, t, { enumerable: !0, get: r });
                  },
                  n.r = function (e) {
                    "undefined" != typeof Symbol && Symbol.toStringTag &&
                    Object.defineProperty(
                      e,
                      Symbol.toStringTag,
                      { value: "Module" },
                    ), Object.defineProperty(e, "__esModule", { value: !0 });
                  },
                  n.t = function (e, t) {
                    if (1 & t && (e = n(e)), 8 & t) return e;
                    if (4 & t && "object" == typeof e && e && e.__esModule) {
                      return e;
                    }
                    var r = Object.create(null);
                    if (
                      n.r(r),
                        Object.defineProperty(
                          r,
                          "default",
                          { enumerable: !0, value: e },
                        ),
                        2 & t && "string" != typeof e
                    ) {
                      for (var i in e) {
                        n.d(
                          r,
                          i,
                          function (t) {
                            return e[t];
                          }.bind(null, i),
                        );
                      }
                    }
                    return r;
                  },
                  n.n = function (e) {
                    var t = e && e.__esModule
                      ? function () {
                        return e.default;
                      }
                      : function () {
                        return e;
                      };
                    return n.d(t, "a", t), t;
                  },
                  n.o = function (e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t);
                  },
                  n.p = "/",
                  n(n.s = 0);
              }([function (e, t, n) {
                e.exports = n(1);
              }, function (e, t, n) {
                "use strict";
                function r(e) {
                  return (r = "function" == typeof Symbol &&
                      "symbol" == typeof Symbol.iterator
                    ? function (e) {
                      return typeof e;
                    }
                    : function (e) {
                      return e && "function" == typeof Symbol &&
                          e.constructor === Symbol && e !== Symbol.prototype
                        ? "symbol"
                        : typeof e;
                    })(e);
                }
                function i(e, t) {
                  return function (e) {
                    if (Array.isArray(e)) return e;
                  }(e) || function (e, t) {
                    if (
                      "undefined" == typeof Symbol ||
                      !(Symbol.iterator in Object(e))
                    ) {
                      return;
                    }
                    var n = [], r = !0, i = !1, o = void 0;
                    try {
                      for (
                        var a, s = e[Symbol.iterator]();
                        !(r = (a = s.next()).done) &&
                        (n.push(a.value), !t || n.length !== t);
                        r = !0
                      );
                    } catch (e) {
                      i = !0, o = e;
                    } finally {
                      try {
                        r || null == s.return || s.return();
                      } finally {
                        if (i) throw o;
                      }
                    }
                    return n;
                  }(e, t) || a(e, t) || function () {
                    throw new TypeError(
                      "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                    );
                  }();
                }
                function o(e, t) {
                  var n;
                  if (
                    "undefined" == typeof Symbol || null == e[Symbol.iterator]
                  ) {
                    if (
                      Array.isArray(e) || (n = a(e)) ||
                      t && e && "number" == typeof e.length
                    ) {
                      n && (e = n);
                      var r = 0, i = function () {};
                      return {
                        s: i,
                        n: function () {
                          return r >= e.length
                            ? { done: !0 }
                            : { done: !1, value: e[r++] };
                        },
                        e: function (e) {
                          throw e;
                        },
                        f: i,
                      };
                    }
                    throw new TypeError(
                      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                    );
                  }
                  var o, s = !0, l = !1;
                  return {
                    s: function () {
                      n = e[Symbol.iterator]();
                    },
                    n: function () {
                      var e = n.next();
                      return s = e.done, e;
                    },
                    e: function (e) {
                      l = !0, o = e;
                    },
                    f: function () {
                      try {
                        s || null == n.return || n.return();
                      } finally {
                        if (l) throw o;
                      }
                    },
                  };
                }
                function a(e, t) {
                  if (e) {
                    if ("string" == typeof e) return s(e, t);
                    var n = Object.prototype.toString.call(e).slice(8, -1);
                    return "Object" === n && e.constructor &&
                      (n = e.constructor.name),
                      "Map" === n || "Set" === n
                        ? Array.from(e)
                        : "Arguments" === n ||
                            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                        ? s(e, t)
                        : void 0;
                  }
                }
                function s(e, t) {
                  (null == t || t > e.length) && (t = e.length);
                  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
                  return r;
                }
                function l(e, t) {
                  for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                      r.configurable = !0,
                      "value" in r && (r.writable = !0),
                      Object.defineProperty(e, r.key, r);
                  }
                }
                n.r(t),
                  n.d(
                    t,
                    "default",
                    (function () {
                      return u;
                    }),
                  );
                var u = function () {
                  function e() {
                    !function (e, t) {
                      if (!(e instanceof t)) {
                        throw new TypeError(
                          "Cannot call a class as a function",
                        );
                      }
                    }(this, e),
                      this.evTargetListenersMap = new Map(),
                      this.listenerNum = 0;
                  }
                  var t, n, a;
                  return t = e,
                    (n = [
                      {
                        key: "addEventListener",
                        value: function (e, t, n, r) {
                          var i = this, o = null;
                          if (
                            r && (o = this._cloneJson(r)), arguments.length > 4
                          ) {
                            throw Error(
                              "Too many arguments. Number of arguments can be specified 4.",
                            );
                          }
                          this._checkTypeOfOptions(o);
                          var a = null;
                          o && o.listenerName && (a = o.listenerName);
                          var s = null;
                          o && o.once &&
                            (delete o.once,
                              o.callbackOnce = !0,
                              s = function (r) {
                                n(r), i.removeEventListener(e, t, null, o);
                              });
                          var l = { listenerName: null, success: !0 };
                          s
                            ? e.addEventListener(t, s, o)
                            : e.addEventListener(t, n, o);
                          var u = this.evTargetListenersMap.get(e);
                          u ||
                            (u = new Map(),
                              this.evTargetListenersMap.set(e, u));
                          var c = u.get(t);
                          if (c || (c = new Map(), u.set(t, c)), null !== a) {
                            if (c.has(a)) {
                              throw Error(
                                'The listenerName "'.concat(
                                  a,
                                  '" is already used for the specified event type ',
                                ).concat(t),
                              );
                            }
                            c.set(
                              a,
                              { listener: n, onceListener: s, options: o },
                            ), l.listenerName = a;
                          } else {
                            var f = "listener-".concat(this.listenerNum);
                            o || (o = {}),
                              o.listenerName = f,
                              c.set(
                                f,
                                { listener: n, onceListener: s, options: o },
                              ),
                              l.listenerName = f,
                              this.listenerNum += 1;
                          }
                          return l;
                        },
                      },
                      {
                        key: "removeEventListener",
                        value: function (e, t, n, r) {
                          if (arguments.length < 3) {
                            throw Error(
                              "Three or four arguments are required.",
                            );
                          }
                          if (
                            "Function" !== this.typeOf(n) &&
                            "Null" !== this.typeOf(n)
                          ) {
                            throw Error(
                              'Type of 3rd arg should be a "Function" or "Null".',
                            );
                          }
                          this._checkTypeOfOptions(r);
                          var i = null;
                          r && r.listenerName && (i = r.listenerName);
                          var o = { success: !1, message: "unknown error" },
                            a = this.evTargetListenersMap.get(e);
                          if (!a) {
                            return o.message = "DOM element ".concat(e, "(id=")
                              .concat(e.id, ") doesn't have any listeners."),
                              o;
                          }
                          var s = a.get(t);
                          if (!s) {
                            return o.message = "DOM element ".concat(e, "(id=")
                              .concat(e.id, ") doesn't have \"").concat(
                                t,
                                '" listeners.',
                              ),
                              o;
                          }
                          if (i) {
                            var l = s.get(i);
                            if (!l) {
                              return o.message = "DOM element ".concat(
                                e,
                                "(id=",
                              ).concat(e.id, ") doesn't have \"").concat(
                                t,
                                '" listener "',
                              ).concat(i, '"'),
                                o;
                            }
                            s.delete(i),
                              l.options && l.options.callbackOnce
                                ? e.removeEventListener(
                                  t,
                                  l.onceListener,
                                  l.options,
                                )
                                : e.removeEventListener(
                                  t,
                                  l.listener,
                                  l.options,
                                ),
                              o.success = !0;
                          } else if (!i) {
                            if (!n) {
                              return o.message =
                                "options.listenerName is not found",
                                o;
                            }
                            var u = "listener",
                              c = n,
                              f = this._searchKeyInValueContent(s, u, c);
                            if (f) {
                              var v = s.get(f),
                                y = v.onceListener,
                                p = v.options;
                              s.delete(f),
                                y
                                  ? e.removeEventListener(t, y, p)
                                  : e.removeEventListener(t, n, p),
                                o.success = !0;
                            } else {
                              o.success = !1,
                                o.message =
                                  "Specified listener could not be deleted from DOM element "
                                    .concat(e, "(id=").concat(
                                      e.id,
                                      ").\n        Since the specified listener is not registered as an event listener,\n        it may have been registered outside of event-listener-helper.",
                                    );
                            }
                          }
                          return o;
                        },
                      },
                      {
                        key: "getEventListeners",
                        value: function (e, t) {
                          return e
                            ? t
                              ? this._getEventListenersWith2Args(e, t)
                              : this._getEventListenersWith1Arg(e)
                            : [];
                        },
                      },
                      {
                        key: "getAllEventListeners",
                        value: function () {
                          var e = this, t = new Map();
                          return this.evTargetListenersMap.forEach(
                            (function (n, r) {
                              var i = r,
                                a = e._getEventListenersWith1Arg(i),
                                s = new Map();
                              t.set(i, s);
                              var l, u = o(a);
                              try {
                                for (u.s(); !(l = u.n()).done;) {
                                  var c = l.value;
                                  s.set(c.eventType, c.listeners);
                                }
                              } catch (e) {
                                u.e(e);
                              } finally {
                                u.f();
                              }
                            }),
                          ),
                            t;
                        },
                      },
                      {
                        key: "_getEventListenersWith1Arg",
                        value: function (e) {
                          var t = [], n = this.evTargetListenersMap.get(e);
                          if (!n) return t;
                          var r, a = o(n);
                          try {
                            for (a.s(); !(r = a.n()).done;) {
                              var s,
                                l = i(r.value, 2),
                                u = l[0],
                                c = l[1],
                                f = [],
                                v = o(c.values());
                              try {
                                for (v.s(); !(s = v.n()).done;) {
                                  var y = s.value;
                                  f.push(this._getFrozenListenerDef(y));
                                }
                              } catch (e) {
                                v.e(e);
                              } finally {
                                v.f();
                              }
                              f.length > 0 &&
                                t.push({ eventType: u, listeners: f });
                            }
                          } catch (e) {
                            a.e(e);
                          } finally {
                            a.f();
                          }
                          return t;
                        },
                      },
                      {
                        key: "_getEventListenersWith2Args",
                        value: function (e, t) {
                          if (2 !== arguments.length) {
                            throw Error("Only two arguments can be specified");
                          }
                          var n = [], r = this.evTargetListenersMap.get(e);
                          if (!r) return n;
                          var i = r.get(t);
                          if (!i) {
                            return n;
                          }
                          var a, s = o(i.values());
                          try {
                            for (s.s(); !(a = s.n()).done;) {
                              var l = a.value,
                                u = this._getFrozenListenerDef(l);
                              n.push(u);
                            }
                          } catch (e) {
                            s.e(e);
                          } finally {
                            s.f();
                          }
                          return n;
                        },
                      },
                      {
                        key: "getEventListener",
                        value: function (e, t, n) {
                          if (3 !== arguments.length) {
                            throw Error("Only 3 arguments can be specified");
                          }
                          var r = this.evTargetListenersMap.get(e);
                          if (!r) return null;
                          var i = r.get(t);
                          if (!i) return null;
                          var o = i.get(n), a = this._getFrozenListenerDef(o);
                          return a;
                        },
                      },
                      {
                        key: "hasEventListeners",
                        value: function (e, t) {
                          if (2 !== arguments.length) {
                            throw Error("Only two arguments can be specified");
                          }
                          var n = this.evTargetListenersMap.get(e);
                          if (!n) {
                            return !1;
                          }
                          var r = n.get(t);
                          return !(!r || 0 === r.size);
                        },
                      },
                      {
                        key: "hasEventListener",
                        value: function (e, t, n) {
                          if (3 !== arguments.length) {
                            throw Error("Only 3 arguments can be specified");
                          }
                          var r = this.evTargetListenersMap.get(e);
                          if (!r) return !1;
                          var i = r.get(t);
                          if (!i) return !1;
                          var o = i.get(n);
                          return !!o;
                        },
                      },
                      {
                        key: "_getFrozenListenerDef",
                        value: function (e) {
                          if (!e) return null;
                          var t = {}, n = null, r = e.options;
                          return r &&
                            (n = {},
                              t.options = n,
                              r.capture && (n.capture = r.capture),
                              r.callbackOnce && (n.once = r.callbackOnce),
                              r.listenerName &&
                              (n.listenerName = r.listenerName)),
                            t.listener = e.listener,
                            Object.freeze(n),
                            Object.freeze(t),
                            t;
                        },
                      },
                      {
                        key: "clearAllEventListeners",
                        value: function () {
                          var e, t = o(this.getAllEventTargets());
                          try {
                            for (t.s(); !(e = t.n()).done;) {
                              var n = e.value;
                              this.clearEventListeners(n);
                            }
                          } catch (e) {
                            t.e(e);
                          } finally {
                            t.f();
                          }
                        },
                      },
                      {
                        key: "clearEventListeners",
                        value: function (e, t) {
                          if (!e) {
                            throw Error(
                              "At least the EventTarget must be specified as an argument",
                            );
                          }
                          var n = this.getEventListeners(e, t);
                          if (t) {
                            if (t) {
                              var r, i = o(n);
                              try {
                                for (i.s(); !(r = i.n()).done;) {
                                  var a = r.value;
                                  this.removeEventListener(
                                    e,
                                    t,
                                    null,
                                    a.options,
                                  );
                                }
                              } catch (e) {
                                i.e(e);
                              } finally {
                                i.f();
                              }
                            }
                          } else {
                            var s, l = o(n);
                            try {
                              for (l.s(); !(s = l.n()).done;) {
                                var u,
                                  c = s.value,
                                  f = c.eventType,
                                  v = o(c.listeners);
                                try {
                                  for (v.s(); !(u = v.n()).done;) {
                                    var y = u.value.options;
                                    this.removeEventListener(e, f, null, y);
                                  }
                                } catch (e) {
                                  v.e(e);
                                } finally {
                                  v.f();
                                }
                              }
                            } catch (e) {
                              l.e(e);
                            } finally {
                              l.f();
                            }
                          }
                        },
                      },
                      {
                        key: "clearEventListener",
                        value: function (e, t, n) {
                          var r = this.getEventListener(e, t, n);
                          r && r.options &&
                            this.removeEventListener(e, t, null, r.options);
                        },
                      },
                      {
                        key: "getAllEventTargets",
                        value: function () {
                          return Array.from(this.evTargetListenersMap.keys());
                        },
                      },
                      {
                        key: "searchEventListenersByName",
                        value: function (e) {
                          var t, n = [], r = o(this.getAllEventTargets());
                          try {
                            for (r.s(); !(t = r.n()).done;) {
                              var i,
                                a = t.value,
                                s = this.evTargetListenersMap.get(a),
                                l = o(s.keys());
                              try {
                                for (l.s(); !(i = l.n()).done;) {
                                  var u = i.value,
                                    c = s.get(u),
                                    f = this._getFrozenListenerDef(c.get(e));
                                  f && n.push(f);
                                }
                              } catch (e) {
                                l.e(e);
                              } finally {
                                l.f();
                              }
                            }
                          } catch (e) {
                            r.e(e);
                          } finally {
                            r.f();
                          }
                          return n;
                        },
                      },
                      {
                        key: "_searchKeyInValueContent",
                        value: function (e, t, n) {
                          var r, a = o(e);
                          try {
                            for (a.s(); !(r = a.n()).done;) {
                              var s = i(r.value, 2), l = s[0];
                              if (s[1][t] === n) return l;
                            }
                          } catch (e) {
                            a.e(e);
                          } finally {
                            a.f();
                          }
                          return null;
                        },
                      },
                      {
                        key: "_checkTypeOfOptions",
                        value: function (e) {
                          if ("object" !== r(e) && void 0 !== e) {
                            throw "boolean" == typeof e
                              ? new Error(
                                "Type of boolean is not accepted as the fourth argument you specify.\n      If you want to enable useCapture, specify {capture: true} as the fourth parameter instead.",
                              )
                              : new Error(
                                "Type of ".concat(
                                  r(e),
                                  " is not accepted as the fourth argument you specify.\n      If you want to specify options, specify an object like {capture: true, listenerName:'my-listener-01'}.",
                                ),
                              );
                          }
                        },
                      },
                      {
                        key: "_cloneJson",
                        value: function (e) {
                          return JSON.parse(JSON.stringify(e));
                        },
                      },
                      {
                        key: "typeOf",
                        value: function (e) {
                          return Object.prototype.toString.call(e).slice(8, -1);
                        },
                      },
                    ]) && l(t.prototype, n),
                    a && l(t, a),
                    e;
                }();
              }]).default;
            }),
          );

          /***/
        }),

      /***/ "./node_modules/merge-deeply/lib/merge-deeply.js":
        /*!*******************************************************!*
  !*** ./node_modules/merge-deeply/lib/merge-deeply.js ***!
  \*******************************************************/
        /***/ (function (module) {
          /*! merge-deeply v3.0.0 Copyright (c) 2019-2020 riversun.org@gmail.com */
          !function (e, r) {
            true ? module.exports = r() : 0;
          }(
            this,
            (function () {
              return function (e) {
                var r = {};
                function t(n) {
                  if (r[n]) return r[n].exports;
                  var o = r[n] = { i: n, l: !1, exports: {} };
                  return e[n].call(o.exports, o, o.exports, t),
                    o.l = !0,
                    o.exports;
                }
                return t.m = e,
                  t.c = r,
                  t.d = function (e, r, n) {
                    t.o(e, r) ||
                      Object.defineProperty(e, r, { enumerable: !0, get: n });
                  },
                  t.r = function (e) {
                    "undefined" != typeof Symbol && Symbol.toStringTag &&
                    Object.defineProperty(
                      e,
                      Symbol.toStringTag,
                      { value: "Module" },
                    ), Object.defineProperty(e, "__esModule", { value: !0 });
                  },
                  t.t = function (e, r) {
                    if (1 & r && (e = t(e)), 8 & r) return e;
                    if (4 & r && "object" == typeof e && e && e.__esModule) {
                      return e;
                    }
                    var n = Object.create(null);
                    if (
                      t.r(n),
                        Object.defineProperty(
                          n,
                          "default",
                          { enumerable: !0, value: e },
                        ),
                        2 & r && "string" != typeof e
                    ) {
                      for (var o in e) {
                        t.d(
                          n,
                          o,
                          function (r) {
                            return e[r];
                          }.bind(null, o),
                        );
                      }
                    }
                    return n;
                  },
                  t.n = function (e) {
                    var r = e && e.__esModule ? function () {
                      return e.default;
                    } : function () {
                      return e;
                    };
                    return t.d(r, "a", r), r;
                  },
                  t.o = function (e, r) {
                    return Object.prototype.hasOwnProperty.call(e, r);
                  },
                  t.p = "/",
                  t(t.s = 0);
              }([function (e, r, t) {
                e.exports = t(1);
              }, function (e, r, t) {
                "use strict";
                function n(e, r) {
                  var t;
                  if (
                    "undefined" == typeof Symbol || null == e[Symbol.iterator]
                  ) {
                    if (
                      Array.isArray(e) || (t = a(e)) ||
                      r && e && "number" == typeof e.length
                    ) {
                      t && (e = t);
                      var n = 0, o = function () {};
                      return {
                        s: o,
                        n: function () {
                          return n >= e.length
                            ? { done: !0 }
                            : { done: !1, value: e[n++] };
                        },
                        e: function (e) {
                          throw e;
                        },
                        f: o,
                      };
                    }
                    throw new TypeError(
                      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                    );
                  }
                  var i, u = !0, c = !1;
                  return {
                    s: function () {
                      t = e[Symbol.iterator]();
                    },
                    n: function () {
                      var e = t.next();
                      return u = e.done, e;
                    },
                    e: function (e) {
                      c = !0, i = e;
                    },
                    f: function () {
                      try {
                        u || null == t.return || t.return();
                      } finally {
                        if (c) throw i;
                      }
                    },
                  };
                }
                function o(e) {
                  return function (e) {
                    if (Array.isArray(e)) return u(e);
                  }(e) || function (e) {
                    if (
                      "undefined" != typeof Symbol &&
                      Symbol.iterator in Object(e)
                    ) {
                      return Array.from(e);
                    }
                  }(e) || a(e) || function () {
                    throw new TypeError(
                      "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                    );
                  }();
                }
                function i(e, r) {
                  return function (e) {
                    if (Array.isArray(e)) return e;
                  }(e) || function (e, r) {
                    if (
                      "undefined" == typeof Symbol ||
                      !(Symbol.iterator in Object(e))
                    ) {
                      return;
                    }
                    var t = [], n = !0, o = !1, i = void 0;
                    try {
                      for (
                        var a, u = e[Symbol.iterator]();
                        !(n = (a = u.next()).done) &&
                        (t.push(a.value), !r || t.length !== r);
                        n = !0
                      );
                    } catch (e) {
                      o = !0, i = e;
                    } finally {
                      try {
                        n || null == u.return || u.return();
                      } finally {
                        if (o) throw i;
                      }
                    }
                    return t;
                  }(e, r) || a(e, r) || function () {
                    throw new TypeError(
                      "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                    );
                  }();
                }
                function a(e, r) {
                  if (e) {
                    if ("string" == typeof e) return u(e, r);
                    var t = Object.prototype.toString.call(e).slice(8, -1);
                    return "Object" === t && e.constructor &&
                      (t = e.constructor.name),
                      "Map" === t || "Set" === t
                        ? Array.from(e)
                        : "Arguments" === t ||
                            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
                        ? u(e, r)
                        : void 0;
                  }
                }
                function u(e, r) {
                  (null == r || r > e.length) && (r = e.length);
                  for (var t = 0, n = new Array(r); t < r; t++) n[t] = e[t];
                  return n;
                }
                function c(e) {
                  return (c = "function" == typeof Symbol &&
                      "symbol" == typeof Symbol.iterator
                    ? function (e) {
                      return typeof e;
                    }
                    : function (e) {
                      return e && "function" == typeof Symbol &&
                          e.constructor === Symbol && e !== Symbol.prototype
                        ? "symbol"
                        : typeof e;
                    })(e);
                }
                function f(e, r, t) {
                  var a = function (e) {
                      return e && "object" === c(e) && !Array.isArray(e);
                    },
                    u = t && t.concatArray,
                    l = t.isCloneMode,
                    y = {};
                  t && t.assignToObject &&
                    (y = t.assignToObject, t.assignToObject = null);
                  var s, b, p, d = null;
                  if (d = y === e ? e : Object.assign(y, e), a(e) && a(r)) {
                    for (var m = 0, j = Object.entries(r); m < j.length; m++) {
                      var v = i(j[m], 2), g = v[0], h = v[1], O = e[g];
                      if (
                        u && Array.isArray(h) && Array.isArray(O) && r !== e
                      ) {
                        d[g] = O.concat.apply(O, o(h));
                      } else if (
                        a(h) && Object.prototype.hasOwnProperty.call(e, g)
                      ) {
                        d[g] = f(O, h, t);
                      } else {
                        var A = h;
                        if (l && Array.isArray(h)) {
                          var S, w = [], x = n(h);
                          try {
                            for (x.s(); !(S = x.n()).done;) {
                              var T = S.value,
                                P = JSON.parse(JSON.stringify(T));
                              w.push(P);
                            }
                          } catch (e) {
                            x.e(e);
                          } finally {
                            x.f();
                          }
                          A = w;
                        }
                        Object.assign(
                          d,
                          (p = A,
                            (b = g) in (s = {})
                              ? Object.defineProperty(
                                s,
                                b,
                                {
                                  value: p,
                                  enumerable: !0,
                                  configurable: !0,
                                  writable: !0,
                                },
                              )
                              : s[b] = p,
                            s),
                        );
                      }
                    }
                  }
                  return d;
                }
                function l(e) {
                  var r = null, t = null, n = e.op;
                  if (!n) {
                    throw Error(
                      'The initialization property "op" cannot be omitted. "merge","overwrite-merge","clone" can be specified.',
                    );
                  }
                  var o = "merge" === n,
                    i = "clone" === n,
                    a = "overwrite-merge" === n;
                  if (o) {
                    if (r = e.object1, t = e.object2, !r || !t) {
                      throw Error("object1 or object2 is not specified.");
                    }
                  } else if (a) {
                    if (r = e.object1, t = e.object2, !r || !t) {
                      throw Error("object1 or object2 is not specified.");
                    }
                    if (0 === Object.keys(t).length) return null;
                  } else {
                    if (!i) {
                      throw Error(
                        'An invalid "op" property value "'.concat(
                          n,
                          '" has been specified.',
                        ),
                      );
                    }
                    r = e.object1, t = {};
                  }
                  var u,
                    c = Object.create(Object.getPrototypeOf(r)),
                    l = null,
                    y = (u = r, Object.getPrototypeOf(u) !== Object.prototype);
                  return o && y || i
                    ? (f(
                      r,
                      r,
                      {
                        assignToObject: c,
                        concatArray: e && e.concatArray,
                        isCloneMode: i,
                      },
                    ),
                      l = c)
                    : l = {},
                    f(
                      i ? l : r,
                      t,
                      {
                        assignToObject: a ? r : l,
                        concatArray: e && e.concatArray,
                      },
                    ),
                    l;
                }
                t.r(r),
                  t.d(
                    r,
                    "default",
                    (function () {
                      return l;
                    }),
                  );
              }]).default;
            }),
          );

          /***/
        }),

      /***/ "./src/JSFrame.css":
        /*!*************************!*
  !*** ./src/JSFrame.css ***!
  \*************************/
        /***/ ((
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          "use strict";
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ "default": () => __WEBPACK_DEFAULT_EXPORT__,
            /* harmony export */
          });
          /* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js",
            );
          /* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default =
            /*#__PURE__*/ __webpack_require__.n(
              _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__,
            );
          /* harmony import */ var _node_modules_css_loader_dist_cjs_js_JSFrame_css__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! !!../node_modules/css-loader/dist/cjs.js!./JSFrame.css */ "./node_modules/css-loader/dist/cjs.js!./src/JSFrame.css",
            );

          var options = {};

          options.insert = "head";
          options.singleton = false;

          var update =
            _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(
              _node_modules_css_loader_dist_cjs_js_JSFrame_css__WEBPACK_IMPORTED_MODULE_1__
                .default,
              options,
            );

          /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
            (_node_modules_css_loader_dist_cjs_js_JSFrame_css__WEBPACK_IMPORTED_MODULE_1__
              .default.locals || {});

          /***/
        }),

      /***/ "./src/presets/appearance/PresetStyleMaterial.css":
        /*!********************************************************!*
  !*** ./src/presets/appearance/PresetStyleMaterial.css ***!
  \********************************************************/
        /***/ ((
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          "use strict";
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ "default": () => __WEBPACK_DEFAULT_EXPORT__,
            /* harmony export */
          });
          /* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js",
            );
          /* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default =
            /*#__PURE__*/ __webpack_require__.n(
              _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__,
            );
          /* harmony import */ var _node_modules_css_loader_dist_cjs_js_PresetStyleMaterial_css__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! !!../../../node_modules/css-loader/dist/cjs.js!./PresetStyleMaterial.css */ "./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStyleMaterial.css",
            );

          var options = {};

          options.insert = "head";
          options.singleton = false;

          var update =
            _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(
              _node_modules_css_loader_dist_cjs_js_PresetStyleMaterial_css__WEBPACK_IMPORTED_MODULE_1__
                .default,
              options,
            );

          /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
            (_node_modules_css_loader_dist_cjs_js_PresetStyleMaterial_css__WEBPACK_IMPORTED_MODULE_1__
              .default.locals || {});

          /***/
        }),

      /***/ "./src/presets/appearance/PresetStylePopup.css":
        /*!*****************************************************!*
  !*** ./src/presets/appearance/PresetStylePopup.css ***!
  \*****************************************************/
        /***/ ((
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          "use strict";
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ "default": () => __WEBPACK_DEFAULT_EXPORT__,
            /* harmony export */
          });
          /* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js",
            );
          /* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default =
            /*#__PURE__*/ __webpack_require__.n(
              _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__,
            );
          /* harmony import */ var _node_modules_css_loader_dist_cjs_js_PresetStylePopup_css__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! !!../../../node_modules/css-loader/dist/cjs.js!./PresetStylePopup.css */ "./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStylePopup.css",
            );

          var options = {};

          options.insert = "head";
          options.singleton = false;

          var update =
            _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(
              _node_modules_css_loader_dist_cjs_js_PresetStylePopup_css__WEBPACK_IMPORTED_MODULE_1__
                .default,
              options,
            );

          /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
            (_node_modules_css_loader_dist_cjs_js_PresetStylePopup_css__WEBPACK_IMPORTED_MODULE_1__
              .default.locals || {});

          /***/
        }),

      /***/ "./src/presets/appearance/PresetStyleRedstone.css":
        /*!********************************************************!*
  !*** ./src/presets/appearance/PresetStyleRedstone.css ***!
  \********************************************************/
        /***/ ((
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          "use strict";
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ "default": () => __WEBPACK_DEFAULT_EXPORT__,
            /* harmony export */
          });
          /* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js",
            );
          /* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default =
            /*#__PURE__*/ __webpack_require__.n(
              _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__,
            );
          /* harmony import */ var _node_modules_css_loader_dist_cjs_js_PresetStyleRedstone_css__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! !!../../../node_modules/css-loader/dist/cjs.js!./PresetStyleRedstone.css */ "./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStyleRedstone.css",
            );

          var options = {};

          options.insert = "head";
          options.singleton = false;

          var update =
            _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(
              _node_modules_css_loader_dist_cjs_js_PresetStyleRedstone_css__WEBPACK_IMPORTED_MODULE_1__
                .default,
              options,
            );

          /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
            (_node_modules_css_loader_dist_cjs_js_PresetStyleRedstone_css__WEBPACK_IMPORTED_MODULE_1__
              .default.locals || {});

          /***/
        }),

      /***/ "./src/presets/appearance/PresetStyleYosemite.css":
        /*!********************************************************!*
  !*** ./src/presets/appearance/PresetStyleYosemite.css ***!
  \********************************************************/
        /***/ ((
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          "use strict";
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ "default": () => __WEBPACK_DEFAULT_EXPORT__,
            /* harmony export */
          });
          /* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js",
            );
          /* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default =
            /*#__PURE__*/ __webpack_require__.n(
              _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__,
            );
          /* harmony import */ var _node_modules_css_loader_dist_cjs_js_PresetStyleYosemite_css__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! !!../../../node_modules/css-loader/dist/cjs.js!./PresetStyleYosemite.css */ "./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStyleYosemite.css",
            );

          var options = {};

          options.insert = "head";
          options.singleton = false;

          var update =
            _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(
              _node_modules_css_loader_dist_cjs_js_PresetStyleYosemite_css__WEBPACK_IMPORTED_MODULE_1__
                .default,
              options,
            );

          /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
            (_node_modules_css_loader_dist_cjs_js_PresetStyleYosemite_css__WEBPACK_IMPORTED_MODULE_1__
              .default.locals || {});

          /***/
        }),

      /***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
        /*!****************************************************************************!*
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
        /***/ ((module, __unused_webpack_exports, __webpack_require__) => {
          "use strict";

          var isOldIE = function isOldIE() {
            var memo;
            return function memorize() {
              if (typeof memo === "undefined") {
                // Test for IE <= 9 as proposed by Browserhacks
                // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
                // Tests for existence of standard globals is to allow style-loader
                // to operate correctly into non-standard environments
                // @see https://github.com/webpack-contrib/style-loader/issues/177
                memo = Boolean(
                  window && document && document.all && !window.atob,
                );
              }

              return memo;
            };
          }();

          var getTarget = function getTarget() {
            var memo = {};
            return function memorize(target) {
              if (typeof memo[target] === "undefined") {
                var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

                if (
                  window.HTMLIFrameElement &&
                  styleTarget instanceof window.HTMLIFrameElement
                ) {
                  try {
                    // This will throw an exception if access to iframe is blocked
                    // due to cross-origin restrictions
                    styleTarget = styleTarget.contentDocument.head;
                  } catch (e) {
                    // istanbul ignore next
                    styleTarget = null;
                  }
                }

                memo[target] = styleTarget;
              }

              return memo[target];
            };
          }();

          var stylesInDom = [];

          function getIndexByIdentifier(identifier) {
            var result = -1;

            for (var i = 0; i < stylesInDom.length; i++) {
              if (stylesInDom[i].identifier === identifier) {
                result = i;
                break;
              }
            }

            return result;
          }

          function modulesToDom(list, options) {
            var idCountMap = {};
            var identifiers = [];

            for (var i = 0; i < list.length; i++) {
              var item = list[i];
              var id = options.base ? item[0] + options.base : item[0];
              var count = idCountMap[id] || 0;
              var identifier = "".concat(id, " ").concat(count);
              idCountMap[id] = count + 1;
              var index = getIndexByIdentifier(identifier);
              var obj = {
                css: item[1],
                media: item[2],
                sourceMap: item[3],
              };

              if (index !== -1) {
                stylesInDom[index].references++;
                stylesInDom[index].updater(obj);
              } else {
                stylesInDom.push({
                  identifier: identifier,
                  updater: addStyle(obj, options),
                  references: 1,
                });
              }

              identifiers.push(identifier);
            }

            return identifiers;
          }

          function insertStyleElement(options) {
            var style = document.createElement("style");
            var attributes = options.attributes || {};

            if (typeof attributes.nonce === "undefined") {
              var nonce = true ? __webpack_require__.nc : 0;

              if (nonce) {
                attributes.nonce = nonce;
              }
            }

            Object.keys(attributes).forEach(function (key) {
              style.setAttribute(key, attributes[key]);
            });

            if (typeof options.insert === "function") {
              options.insert(style);
            } else {
              var target = getTarget(options.insert || "head");

              if (!target) {
                throw new Error(
                  "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.",
                );
              }

              target.appendChild(style);
            }

            return style;
          }

          function removeStyleElement(style) {
            // istanbul ignore if
            if (style.parentNode === null) {
              return false;
            }

            style.parentNode.removeChild(style);
          }
          /* istanbul ignore next  */

          var replaceText = function replaceText() {
            var textStore = [];
            return function replace(index, replacement) {
              textStore[index] = replacement;
              return textStore.filter(Boolean).join("\n");
            };
          }();

          function applyToSingletonTag(style, index, remove, obj) {
            var css = remove ? ""
            : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}")
            : obj.css; // For old IE

            /* istanbul ignore if  */

            if (style.styleSheet) {
              style.styleSheet.cssText = replaceText(index, css);
            } else {
              var cssNode = document.createTextNode(css);
              var childNodes = style.childNodes;

              if (childNodes[index]) {
                style.removeChild(childNodes[index]);
              }

              if (childNodes.length) {
                style.insertBefore(cssNode, childNodes[index]);
              } else {
                style.appendChild(cssNode);
              }
            }
          }

          function applyToTag(style, options, obj) {
            var css = obj.css;
            var media = obj.media;
            var sourceMap = obj.sourceMap;

            if (media) {
              style.setAttribute("media", media);
            } else {
              style.removeAttribute("media");
            }

            if (sourceMap && typeof btoa !== "undefined") {
              css += "\n/*# sourceMappingURL=data:application/json;base64,"
                .concat(
                  btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))),
                  " */",
                );
            } // For old IE

            /* istanbul ignore if  */

            if (style.styleSheet) {
              style.styleSheet.cssText = css;
            } else {
              while (style.firstChild) {
                style.removeChild(style.firstChild);
              }

              style.appendChild(document.createTextNode(css));
            }
          }

          var singleton = null;
          var singletonCounter = 0;

          function addStyle(obj, options) {
            var style;
            var update;
            var remove;

            if (options.singleton) {
              var styleIndex = singletonCounter++;
              style = singleton || (singleton = insertStyleElement(options));
              update = applyToSingletonTag.bind(null, style, styleIndex, false);
              remove = applyToSingletonTag.bind(null, style, styleIndex, true);
            } else {
              style = insertStyleElement(options);
              update = applyToTag.bind(null, style, options);

              remove = function remove() {
                removeStyleElement(style);
              };
            }

            update(obj);
            return function updateStyle(newObj) {
              if (newObj) {
                if (
                  newObj.css === obj.css && newObj.media === obj.media &&
                  newObj.sourceMap === obj.sourceMap
                ) {
                  return;
                }

                update(obj = newObj);
              } else {
                remove();
              }
            };
          }

          module.exports = function (list, options) {
            options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
            // tags it will allow on a page

            if (!options.singleton && typeof options.singleton !== "boolean") {
              options.singleton = isOldIE();
            }

            list = list || [];
            var lastIdentifiers = modulesToDom(list, options);
            return function update(newList) {
              newList = newList || [];

              if (
                Object.prototype.toString.call(newList) !== "[object Array]"
              ) {
                return;
              }

              for (var i = 0; i < lastIdentifiers.length; i++) {
                var identifier = lastIdentifiers[i];
                var index = getIndexByIdentifier(identifier);
                stylesInDom[index].references--;
              }

              var newLastIdentifiers = modulesToDom(newList, options);

              for (var _i = 0; _i < lastIdentifiers.length; _i++) {
                var _identifier = lastIdentifiers[_i];

                var _index = getIndexByIdentifier(_identifier);

                if (stylesInDom[_index].references === 0) {
                  stylesInDom[_index].updater();

                  stylesInDom.splice(_index, 1);
                }
              }

              lastIdentifiers = newLastIdentifiers;
            };
          };

          /***/
        }),

      /***/ "./src/CCommon.js":
        /*!************************!*
  !*** ./src/CCommon.js ***!
  \************************/
        /***/ ((module) => {
          CALIGN = {};

          CALIGN.LEFT_TOP = "LEFT_TOP";
          CALIGN.HCENTER_TOP = "CENTER_TOP";
          CALIGN.RIGHT_TOP = "RIGHT_TOP";
          CALIGN.LEFT_VCENTER = "LEFT_CENTER";
          CALIGN.HCENTER_VCENTER = "CENTER_CENTER";
          CALIGN.CENTER = CALIGN.HCENTER_VCENTER;
          CALIGN.RIGHT_VCENTER = "RIGHT_CENTER";
          CALIGN.LEFT_BOTTOM = "LEFT_BOTTOM";
          CALIGN.HCENTER_BOTTOM = "CENTER_BOTTOM";
          CALIGN.RIGHT_BOTTOM = "RIGHT_BOTTOM";

          module.exports = CALIGN;

          /***/
        }),

      /***/ "./src/JSFrame.js":
        /*!************************!*
  !*** ./src/JSFrame.js ***!
  \************************/
        /***/ ((module, __unused_webpack_exports, __webpack_require__) => {
          "use strict";

          __webpack_require__(/*! ./JSFrame.css */ "./src/JSFrame.css");
          var EventEmitter = __webpack_require__(
            /*! @riversun/event-emitter */ "./node_modules/@riversun/event-emitter/lib/event-emitter.js",
          );
          var CALIGN = __webpack_require__(
            /*! ./CCommon.js */ "./src/CCommon.js",
          );
          var WindowEventHelper = __webpack_require__(
            /*! ./utils/WindowEventHelper.js */ "./src/utils/WindowEventHelper.js",
          );
          var inherit = __webpack_require__(
            /*! ./utils/Inherit.js */ "./src/utils/Inherit.js",
          );
          var CFrameAppearance = __webpack_require__(
            /*! ./appearance/CFrameAppearance.js */ "./src/appearance/CFrameAppearance.js",
          );
          var CDomPartsBuilder = __webpack_require__(
            /*! ./appearance/CDomPartsBuilder.js */ "./src/appearance/CDomPartsBuilder.js",
          );
          var CSimpleLayoutAnimator = __webpack_require__(
            /*! ./utils/CSimpleLayoutAnimator.js */ "./src/utils/CSimpleLayoutAnimator.js",
          );
          var EventListenerHelper = __webpack_require__(
            /*! event-listener-helper */ "./node_modules/event-listener-helper/lib/event-listener-helper.js",
          );

          //If you don't want to bundle preset styles in JsFrame.js ,comment out below.
          var presetStyles = {
            "yosemite": __webpack_require__(
              /*! ./presets/appearance/PresetStyleYosemite.js */ "./src/presets/appearance/PresetStyleYosemite.js",
            ),
            "redstone": __webpack_require__(
              /*! ./presets/appearance/PresetStyleRedstone.js */ "./src/presets/appearance/PresetStyleRedstone.js",
            ),
            "popup": __webpack_require__(
              /*! ./presets/appearance/PresetStylePopup.js */ "./src/presets/appearance/PresetStylePopup.js",
            ),
            "toast": __webpack_require__(
              /*! ./presets/appearance/PresetStyleToast.js */ "./src/presets/appearance/PresetStyleToast.js",
            ),
            "material": __webpack_require__(
              /*! ./presets/appearance/PresetStyleMaterial.js */ "./src/presets/appearance/PresetStyleMaterial.js",
            ),
          };

          var presetWindows = {
            "yosemite": __webpack_require__(
              /*! ./presets/window/PresetWindowYosemite.js */ "./src/presets/window/PresetWindowYosemite.js",
            ),
          };

          var DEF = {};

          // true:Support mouse on mouse-enabled devices
          var MOUSE_ENABLED = true;

          // true:Support touch on touch-enabled devices
          var TOUCH_ENABLED = true;

          //true:Allow the window to be moved only in the case of one finger
          // (the window cannot be moved in the case of two or more fingers)
          var TOUCH_MOVE_ONLY_WITH_ONE_FINGER = true;

          /**
 * DEFINITIONS
 */
          DEF.CBEAN = {};
          DEF.CBEAN.HTML_ELEMENT = "span";
          DEF.CBEAN.HTML_ELEMENT_ID_PREFIX = "htmlElement_";
          DEF.CBEAN.TYPE_NAME = "bean";

          //+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

          /**
 * CBeanFrame Class<p>
 * The smallest window. It is responsible for basic processing only.
 *
 * @param beanId id of this small window
 * @param left
 * @param top
 * @param width
 * @param height
 * @param zindex
 * @constructor
 */
          function CBeanFrame(
            beanId,
            left,
            top,
            width,
            height,
            zindex,
            w_border_width,
            appearance,
          ) {
            var me = this;

            me.movable = true;

            //fields
            me.id = beanId;
            me.property = {};

            me.extra = {};

            me.parentCanvas = null;
            me.htmlElement = null;

            me.pullUpDisabled = false;
            if (appearance) {
              me.pullUpDisabled = appearance.pullUpDisabled;
            }

            //initialize
            me.htmlElement = document.createElement(DEF.CBEAN.HTML_ELEMENT);
            me.htmlElement.id = DEF.CBEAN.HTML_ELEMENT_ID_PREFIX + beanId;
            me.htmlElement.style.position = "absolute";
            me.htmlElement.style.left = parseInt(left, 10) + "px";
            me.htmlElement.style.top = parseInt(top, 10) + "px";
            me.htmlElement.style.width = parseInt(width, 10) + "px";
            me.htmlElement.style.height = parseInt(height, 10) + "px";

            //Zindex may become 'undefined' in some cases.
            if (zindex !== null) {
              me.htmlElement.style.zIndex = zindex;
            }
            me.htmlElement.style.borderColor = "#000000";

            //If I set a larger font size, width and height of window will be affected....
            me.htmlElement.style.fontSize = "1px";

            //Refer parents to each other.(sougo-sansho)
            me.htmlElement.parent = me;

            if (MOUSE_ENABLED) {
              //Note that 'mouseDown' is mapped to 'onmousedown' of htmlElement,
              //so when 'onmouseDown' fires ,the 'this' will indicate 'htmlElement'
              me.htmlElement.onmousedown = me.onmouseDown;
            }

            if (TOUCH_ENABLED) {
              if ("ontouchstart" in window) {
                var funcOnTouchStart = function (evt) {
                  // The "mousedown" event happens right after "touchstart" event,
                  // but I don't call #preventdefault because #preventdefault prevents "onclick".
                  // So, perform #preventdefault only for "touchmove"
                  evt.preventDefault();
                  me.onmouseDown.bind(this)(evt);
                };
                me.htmlElement.ontouchstart = funcOnTouchStart;
              }
            }

            //Type name of this class
            me.htmlElement.typeName = DEF.CBEAN.TYPE_NAME;

            //Special field indicating usage of this class
            me.htmlElement.usage = "nothing";

            //Whether it can move outside the frame(waku).
            me.htmlElement.isRangeLimited = false;

            //Movement magnification in the X direction
            //(If it is 0, it can not move in the X direction.)
            me.htmlElement.argX = 1;

            //Movement magnification in Y direction
            // (If it is 0, it can not move in Y direction)
            me.htmlElement.argY = 1;
            me.externalAreaClickedListener = null;

            me.onMoveListener = null;
          }

          CBeanFrame.prototype.getWindowType = function () {
            return "CBeanFrame";
          };

          CBeanFrame.prototype.setOnMoveListener = function (listener) {
            var me = this;
            me.onMoveListener = listener;
          };
          CBeanFrame.prototype._onMove = function (e) {
            var me = this;
            if (me.onMoveListener) {
              me.onMoveListener(e);
            }
          };

          /**
 * Set whether the frame can be moved while dragging with the mouse
 * @param enabled
 */
          CBeanFrame.prototype.setMovable = function (enabled) {
            var me = this;

            if (enabled) {
              me.htmlElement.argX = 1;
              me.htmlElement.argY = 1;
            } else {
              me.htmlElement.argX = 0;
              me.htmlElement.argY = 0;
            }

            me.movable = enabled;

            return me;
          };

          CBeanFrame.prototype.setParentCanvas = function (parentCanvas) {
            var me = this;
            me.parentCanvas = parentCanvas;
            me.htmlElement.parentCanvas = me.parentCanvas;
            return me;
          };
          CBeanFrame.prototype.setOnExternalAreaClickedListener = function (
            listener,
          ) {
            var me = this;
            me.externalAreaClickedListener = listener;
            return me;
          };
          CBeanFrame.prototype.onBodyClicked = function (e) {
            var me = this;

            var clickX = e.pageX;
            var clickY = e.pageY;

            var left = parseInt(me.htmlElement.style.left);
            var top = parseInt(me.htmlElement.style.top);
            var width = parseInt(me.htmlElement.style.width);
            var height = parseInt(me.htmlElement.style.height);

            if (
              left < clickX && clickX < (left + width) && top < clickY &&
              (clickY < top + height)
            ) {
              //- clicked internal area of this frame
            } else {
              //- clicked external area of this frame
              if (me.externalAreaClickedListener) {
                me.externalAreaClickedListener();
              }
            }
          };
          CBeanFrame.prototype.onmouseDown = function (evt) {
            // Typically, if you mouse down on the title portion, the onmousedown fires to move the window.
            // Mousing down the bottom of the window, the left side of the window,
            // or the bottom of the window will fire the onmouseDown of the window itself (CBeanFrame)
            // as well as the onmouseDown of the CMarkerWindow for resizing.
            // Each mousedown element is set to a currentObject as being selected,
            // whether it's a window or a marker.

            // this means htmlElement of CBeanFrame object
            var refHtmlElement = this;

            var e = evt;

            if (TOUCH_ENABLED) {
              if (evt.type === "touchstart") {
                var changedTouches = evt.changedTouches;
                if (TOUCH_MOVE_ONLY_WITH_ONE_FINGER) {
                  var touches = evt.touches;
                  if (touches.length === 1) {
                    e = changedTouches[0];
                  } else {
                    return true;
                  }
                } else {
                  e = changedTouches[0];
                }
              }
            }

            //Retrieve CBeanFrame object itself
            var refCBeanFrame = refHtmlElement.parent;

            if (e.button == 0 || evt.type === "touchstart") {
              // for modal background window
              if (refCBeanFrame.pullUpDisabled) {
                return false;
              } else {
                // Set the current CBeanFrame to be selected(=currentObject) among other CBeanFrames in the parent canvas.
                refHtmlElement.parentCanvas.currentObject = refHtmlElement;

                // Bring the current bean to the top
                refHtmlElement.parentCanvas.pullUp(refCBeanFrame.id);
              }
            } else if (e.button == 2) {
              return false;
            }

            if (refHtmlElement.parentCanvas.currentObject) {
              refHtmlElement.parentCanvas.offsetX = e.pageX -
                parseInt(
                  refHtmlElement.parentCanvas.currentObject.style.left,
                  10,
                );
              refHtmlElement.parentCanvas.offsetY = e.pageY -
                parseInt(
                  refHtmlElement.parentCanvas.currentObject.style.top,
                  10,
                );
            }

            return false;
          };
          /**
 * End of CBeanFrame Class <p>
 */

          //+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

          DEF.CANVAS = {};
          DEF.CANVAS.HTML_ELEMENT = "div";
          DEF.CANVAS.WIDTH_ADJUST_20180722 = 2;
          DEF.CANVAS.HEIGHT_ADJUST_20180722 = 3;

          /**
 * CCanvas class
 * A canvas is a place where windows are arranged, where you can drag and move freely.
 *
 * @param parentElement
 * @param canvasId
 * @param left
 * @param top
 * @param width
 * @param height
 * @constructor
 */
          function CCanvas(parentElement, canvasId, left, top, width, height) {
            //Event data to be transmitted
            function EventData() {
              this.x = 0;
              this.y = 0;
              this.screenX = 0;
              this.screenY = 0;
              this.deltaX = 0;
              this.deltaY = 0;
              this.isMoved = false;
              this.targetTypeName = null;
              this.targetUsage = null;
              this.targetObject = null;
            }

            var me = this;

            me.enablePullUp = true; // true:Pull-up sorting to bring the window to the forefront by clicking to get focus.
            me.currentObject = null;
            me.onTopObject = null;
            me.offsetX = 0;
            me.offsetY = 0;

            //Object which generated 'mouseDown' event at the very beginning(ichiban-saisho)
            me.mouseDownSource = null;

            me.id = canvasId;
            me.canvasElement = null;
            me.parentElement = parentElement;
            me.beanList = new Array();

            me.beanIdName = {}; //key:beanId value:beanName
            me.beanNameId = {}; //key:beanName value:beanId

            me.eventData = new EventData();

            me.baseZIndex = 0;
            me.setBaseZIndex = function (baseZIndex) {
              me.baseZIndex = baseZIndex;
            };
            me.getBaseZIndex = function () {
              return me.baseZIndex;
            };

            me.canvasElement = document.createElement(DEF.CANVAS.HTML_ELEMENT);

            me.canvasElement.style.zIndex = 2000;
            me.canvasElement.id = me.id;
            me.canvasElement.style.boxSizing = "border-box";
            me.canvasElement.style.position = "absolute";
            me.canvasElement.style.left = parseInt(left) + "px";
            me.canvasElement.style.top = parseInt(top) + "px";
            //Added an adjustment value.Because transparent part appears at the bottom of the screen,
            me.canvasElement.style.width =
              (parseInt(width) + DEF.CANVAS.WIDTH_ADJUST_20180722) + "px";
            me.canvasElement.style.height =
              (parseInt(height) + DEF.CANVAS.HEIGHT_ADJUST_20180722) + "px";
            me.canvasElement.style.backgroundColor = "transparent";
            me.canvasElement.style.borderStyle = "none";
            me.canvasElement.style.margin = "0px";
            me.canvasElement.style.borderWidth = "0px";
            me.canvasElement.style.borderColor = "transparent";

            //Add the Canvas's html element into the canvas's parent html element
            me.parentElement.appendChild(me.canvasElement);
          }

          CCanvas.prototype.mouseMove = function (evt) {
            var me = this;
            var e = evt;
            if (TOUCH_ENABLED) {
              if (evt.type === "touchmove") {
                var changedTouches = evt.changedTouches;
                if (TOUCH_MOVE_ONLY_WITH_ONE_FINGER) {
                  var touches = evt.touches;
                  if (touches.length === 1) {
                    e = changedTouches[0];
                  } else {
                    return true;
                  }
                } else {
                  e = changedTouches[0];
                }
              }
            }
            if (me.currentObject) {
              //eventData.isMoved=true;The presence of event data means that it has moved.
              me.eventData.targetTypeName = me.currentObject.typeName;
              me.eventData.targetUsage = me.currentObject.usage;
              me.eventData.targetObject = me.currentObject;

              //Even when obj is not being dragged, mouse coordinates are used here because they are needed.
              var newObjLeftPx = e.pageX - me.offsetX;
              var newObjTopPx = e.pageY - me.offsetY;

              var absoluteMouseX = e.pageX;
              var absoluteMouseY = e.pageY;

              //Take the snapshot before updating the location.
              var oldObjLeftPx = me.currentObject.style.left;
              var oldObjTopPx = me.currentObject.style.top;

              //When the mouse cursor goes out of range,
              //the addition in the X direction and Y direction (delta X, delta Y) is set to zero.
              //this.left=Cavas's left side edge, this.top=Canvas's top side edge.
              var tmpLeft = parseInt(newObjLeftPx, 10);
              var tmpTop = parseInt(newObjTopPx, 10);

              var tmpRight = tmpLeft +
                parseInt(me.currentObject.style.width, 10);
              var tmpBottom = tmpTop +
                parseInt(me.currentObject.style.height, 10);

              var styleWidth = parseInt(me.canvasElement.style.width, 10);
              var styleHeight = parseInt(me.canvasElement.style.height, 10);

              var deltaX = 0;
              var deltaY = 0;

              if (
                me.currentObject.isRangeLimited == true &&
                (tmpLeft <= 0 || tmpRight > styleWidth || tmpTop <= 0 ||
                  tmpBottom > styleHeight)
              ) {
                deltaX = 0;
                deltaY = 0;
              } else {
                deltaX =
                  (parseInt(newObjLeftPx, 10) - parseInt(oldObjLeftPx, 10));
                deltaY =
                  (parseInt(newObjTopPx, 10) - parseInt(oldObjTopPx, 10));
                me.currentObject.style.left =
                  (parseInt(me.currentObject.style.left) +
                    deltaX * me.currentObject.argX) + "px";
                me.currentObject.style.top =
                  (parseInt(me.currentObject.style.top) +
                    deltaY * me.currentObject.argY) + "px";

                var parentObject = me.currentObject.parent;
                if (parentObject && parentObject._onMove) {
                  parentObject._onMove();
                }
              }
              me.eventData.deltaX = deltaX;
              me.eventData.deltaY = deltaY;

              return me.eventData;
            }
            //Returns null if none of the objects are clicked and the only mouse just moves.
            return null;
          };

          CCanvas.prototype.mouseUp = function (e) {
            var me = this;
            me.currentObject = null;
            me.mouseDownSource = null;
          };

          //Bring the object in front
          CCanvas.prototype.pullUp = function (targetBeanId) {
            var me = this;

            var tmpBeanArray = [];

            var beanList = me.beanList;

            for (var i in beanList) {
              tmpBeanArray.push(beanList[i]);
            }

            //Bring the target object in front and set zindex to 1.
            var targetBean = beanList[targetBeanId];

            if (me.enablePullUp) {
              me.pullUpSort(targetBean, tmpBeanArray, me.baseZIndex);
            }

            //Remember the top object
            me.onTopObject = targetBean;
          };

          //Calculate the front / back information of the window accurately.
          CCanvas.prototype.pullUpSort = function (
            pullupObject,
            objectArray,
            baseIndex,
          ) {
            var me = this;

            //Increase the index number of the target object
            pullupObject.htmlElement.style.zIndex = objectArray.length +
              baseIndex;

            //sort by index
            objectArray.sort(function (b, a) {
              return -parseInt(b.htmlElement.style.zIndex, 10) +
                parseInt(a.htmlElement.style.zIndex, 10);
            });

            //Redefine number of the index
            for (var i in objectArray) {
              objectArray[i].htmlElement.style.zIndex =
                (objectArray.length - 1) - i + baseIndex;
            }
          };

          /**
 * remove the bean object
 * @param beanId
 */
          CCanvas.prototype.removeBean = function (beanId) {
            var me = this;

            //Retrieve the target beanFrame
            var beanList = me.beanList;
            var targetBean = beanList[beanId];

            //Remove bean's htmlElement from canvasElement
            me.canvasElement.removeChild(targetBean.htmlElement);

            //Delete the bean object in the associative array.
            delete beanList[beanId];
          };

          /**
 * Add bean into this canvas
 * @param bean
 */
          CCanvas.prototype.addBean = function (bean) {
            var me = this;

            var beanList = me.beanList;

            var beanIdName = me.beanIdName; //key:beanId value:beanName
            var beanNameId = me.beanNameId; //key:beanName value:beanId

            beanList[bean.id] = bean;

            if (bean.property.name) {
              beanNameId[bean.property.name] = bean.id;
              beanIdName[bean.id] = bean.property.name;
            }

            //In this usage case the 'length' property is invalid ..
            var num = 0;

            for (var j in beanList) {
              num++;
            }

            //Set zIndex so that what you add later will come up.
            bean.htmlElement.style.zIndex = num + me.baseZIndex;

            //On the bean side, specify the parent of the bean to me.
            bean.setParentCanvas(me);

            this.canvasElement.appendChild(bean.htmlElement);
          };

          CCanvas.prototype.getParentElement = function () {
            var me = this;
            return me.parentElement;
          };

          /**
 * End of canvas class
 */

          //+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

          DEF.CFRAME = {};
          DEF.CFRAME.CANVAS_ELEMENT_BGCOLOR = "transparent";
          DEF.CFRAME.MODAL_BACKGROUND_FRAME_ID_PREFIX =
            "window__modal_window_background_";

          inherit(CFrame, CBeanFrame);

          /**
 * CFrame class
 * <p>
 * This class represents a window whose size can be changed ,
 * can move freely on the screen,
 * can have a title bar,
 *
 * @param windowId
 * @param w_left
 * @param w_top
 * @param w_width
 * @param w_height
 * @param zindex
 * @param w_border_width
 * @param appearance
 * @constructor
 */
          function CFrame(
            windowId,
            w_left,
            w_top,
            w_width,
            w_height,
            zindex,
            w_border_width,
            appearance,
          ) {
            var me = this;

            //call constructor of superclass
            CFrame.superConstructor.call(
              this,
              windowId,
              w_left,
              w_top,
              w_width,
              w_height,
              zindex,
              w_border_width,
              appearance,
            );

            me.anchor = CALIGN.LEFT_TOP;

            me.showTitleBar = appearance.showTitleBar;

            me.canvasNetHeight = null;
            me.canvasNetWidth = null;
            me.frameHeightAdjust = appearance.frameHeightAdjust;

            me.frameComponentMap = {};

            //initialize the field
            me.canvas = null;

            //canvas id
            me.myCanvasId = null;

            //Buttons to be placed on the screen (positioning same as the close button)
            me.floatingButton = null;

            me.titleBarClassNameDefault = "jsframe-titlebar-default"; // DEF.CFRAME.TITLE_BAR_CLASS_DEFAULT;
            me.titleBarClassNameFocused = "jsframe-titlebar-focused"; //DEF.CFRAME.TITLE_BAR_CLASS_FOCUSED;

            //height of titlebar
            me.titleBarHeight = appearance.titleBarHeight;

            me.titleBarCaption = appearance.titleBarCaption;
            me.titleBarCaptionLeftMargin = appearance.titleBarCaptionLeftMargin;
            me.titleBarCaptionFontSize = appearance.titleBarCaptionFontSize;
            me.titleBarCaptionFontWeight = appearance.titleBarCaptionFontWeight;
            me.titleBarBorderBottomDefault =
              appearance.titleBarBorderBottomDefault;
            me.titleBarBorderBottomFocused =
              appearance.titleBarBorderBottomFocused;
            me.titleBarCaptionTextShadow = appearance.titleBarCaptionTextShadow;
            me.titleBarCaptionTextAlign = appearance.titleBarCaptionTextAlign;

            //Title bar width adjustment value
            me.titleAdjustWidth = 2;

            me.windowId = windowId;

            me.exBorderWidth = 0;

            me.myCanvasId = windowId + "_canvas";

            //img element for icon placed on the left-top
            var appIcon = document.createElement("img");
            //		appIcon.src='img/ico_app_file16.gif';

            //url of icon image
            appIcon.src = "";
            appIcon.style.position = "absolute";
            appIcon.style.left = "2px";
            appIcon.style.top = "2px";
            appIcon.style.width = "16px";
            appIcon.style.height = "16px";
            appIcon.style.visibility = "hidden";

            //The title bar must be on the front of the canvas.
            me.titleBar = document.createElement("div");

            me.titleBar.className = "jsframetitlebar";

            if (me.showTitleBar) {
              me.titleBar.id = windowId + "_title";
              me.titleBar.style.position = "absolute";
              me.titleBar.style.boxSizing = "border-box";
              me.titleBar.style.top = "0px";
              me.titleBar.style.left = "0px";
              me.titleBar.style.width = (w_width - me.titleAdjustWidth +
                DEF.CANVAS.WIDTH_ADJUST_20180722) + "px";
              me.titleBar.style.userSelect = "none";

              if (me.titleBarHeight) {
                var titleBarAdjust = 0;

                if (me.titleBarBorderBottomDefault) {
                  titleBarAdjust = 0;
                }

                me.titleBar.style.height =
                  (parseInt(me.titleBarHeight, 10) + 0) + "px";
              }

              if (me.titleBarColorDefault) {
                me.titleBar.style.background = me.titleBarColorDefault;
              }
              me.titleBar.style.zIndex = 0;

              me.titleBar.style.color = me.titleBarCaptionColorDefault;
              me.titleBar.style.fontSize = me.titleBarCaptionFontSize;
              me.titleBar.style.fontWeight = me.titleBarCaptionFontWeight;
              me.titleBar.style.textShadow = me.titleBarCaptionTextShadow;
              me.titleBar.style.textAlign = me.titleBarCaptionTextAlign;
              // me.titleBar.style.textShadow = "0 1px 0 rgba(255,255,255,.7)";
              // me.titleBar.style.textAlign = 'center';

              me.titleBar.style.lineHeight = me.titleBar.style.height;

              me.titleBar.style.borderBottom = me.titleBarBorderBottomDefault;
              //me.titleBar.style.boxShadow = '0 1px 0 rgba(255,255,255,0.5)';

              //Set not to display overflow character string
              me.titleBar.style.overflow = "hidden";

              var titleBarText = document.createTextNode("");

              //'span' to store text
              var titleBarTextSpan = document.createElement("span");

              titleBarTextSpan.id = me.id + "_titleBarText";
              if (me.titleBarCaptionLeftMargin != null) {
                titleBarTextSpan.style.position = "absolute";
                titleBarTextSpan.style.left =
                  parseInt(me.titleBarCaptionLeftMargin, 10) + "px";
              } else {
                titleBarTextSpan.style.position = "absolute";
                titleBarTextSpan.style.left = "0px";
                titleBarTextSpan.style.right = "0px";
              }
              titleBarTextSpan.style.top = "0px";
              titleBarTextSpan.appendChild(titleBarText);
              me.titleBar.appendChild(titleBarTextSpan);

              //Discontinue appicon(20061011)
              //me.titleBar.appendChild(appIcon);
            }

            me.htmlElement.appendChild(me.titleBar);

            //Set Canvas throughout the window

            //parseInt(me.titleBar.style.height);//me.titleBarHeight);
            var canvasMoreHeight = parseInt(me.titleBarHeight, 10) -
              titleBarAdjust;
            var canvasMoreSpacing = parseInt(me.titleAdjustWidth, 10);

            if (me.showTitleBar) {
            } else {
              canvasMoreHeight = 0;
              canvasMoreSpacing = 0;
              titleBarAdjust = 0;
            }

            me.canvasNetWidth = w_width - canvasMoreSpacing;
            me.canvasNetHeight = w_height - canvasMoreHeight -
              canvasMoreSpacing - 1 - titleBarAdjust + me.frameHeightAdjust;

            //Change the style of htmlElement of CFrame (CBean).
            me.htmlElement.style.cursor = "move";

            //Create a canvas
            me.canvas = new CCanvas(
              me.htmlElement,
              me.myCanvasId,
              0,
              canvasMoreHeight,
              w_width - canvasMoreSpacing,
              w_height - canvasMoreHeight - canvasMoreSpacing,
            );

            me.canvas.enablePullUp = false;
            me.canvas.canvasElement.style.backgroundColor =
              DEF.CFRAME.CANVAS_ELEMENT_BGCOLOR;
            me.canvas.canvasElement.style.cursor = "default";

            if (MOUSE_ENABLED) {
              //Handling the omousedown event that occurred in Canvas which is a child element of CFrame
              me.canvas.canvasElement.onmousedown = me.canvasMouseDown;
            }

            if (TOUCH_ENABLED) {
              if ("ontouchstart" in window) {
                var funcOnTouchStart = function (evt) {
                  // The "mousedown" event happens right after "touchstart" event,
                  // but I don't call #preventdefault because #preventdefault prevents "onclick" (like button on titlebar).
                  // So, perform #preventdefault only for "touchmove"
                  // evt.preventDefault();
                  var touchStartEvent = evt.changedTouches[0];
                  me.canvasMouseDown.bind(this)(touchStartEvent);
                };
                me.canvas.canvasElement.ontouchstart = funcOnTouchStart;
              }
            }

            //Set the canvas as a reference to the parent of the canvas html element canvasElement.
            me.canvas.canvasElement.parentCFrame = me;

            var tmpCanvasWidth = parseInt(
              me.canvas.canvasElement.style.width,
              10,
            );
            var tmpCanvasHeight = parseInt(
              me.canvas.canvasElement.style.height,
              10,
            );

            var markerWidth = appearance.resizeAreaWidth;
            var markerHeight = appearance.resizeAreaHeight;

            //Offset from marker edge
            var edgeMargin = appearance.resizeAreaOffset;
            var markerZIndex = 0;

            var colorRD, colorDD, colorRR;

            if (appearance.resizeAreaVisible) {
              colorRD = "rgba(255, 0, 0, 0.5)";
              colorDD = "rgba(0, 0, 255, 0.5)";
              colorRR = "rgba(0, 255, 0, 0.5)";
            }

            //Lower right(R-D)
            var markerRD = new CMarkerWindow(
              me.myCanvasId + "_RD",
              tmpCanvasWidth + edgeMargin,
              tmpCanvasHeight + edgeMargin,
              markerWidth,
              markerHeight,
              markerZIndex,
              "RD",
              colorRD,
            );

            markerRD.htmlElement.style.cursor = "se-resize"; //nw-resize';

            //Since only the deltaX and deltaY are acquired and the movement of the marker itself is
            // performed by CFrame_resize, the movement coefficient of the marker itself is set to 0.
            markerRD.htmlElement.argX = 0;
            markerRD.htmlElement.argY = 0;

            //Bottom(D-D)
            var markerDD = new CMarkerWindow(
              me.myCanvasId + "_DD",
              0,
              tmpCanvasHeight + edgeMargin,
              tmpCanvasWidth + edgeMargin,
              markerHeight,
              markerZIndex,
              "DD",
              colorDD,
            );

            markerDD.htmlElement.style.cursor = "n-resize";

            //Since only the deltaX and deltaY are acquired and the movement of the marker itself is
            // performed by CFrame_resize, the movement coefficient of the marker itself is set to 0.
            markerDD.htmlElement.argX = 0;
            markerDD.htmlElement.argY = 0;

            //Right(R-R)
            var markerRR = new CMarkerWindow(
              me.myCanvasId + "_RR",
              tmpCanvasWidth + edgeMargin,
              0,
              markerWidth,
              tmpCanvasHeight + edgeMargin,
              markerZIndex,
              "RR",
              colorRR,
            );

            markerRR.htmlElement.style.cursor = "w-resize";

            //Since only the deltaX and deltaY are acquired and the movement of the marker itself is
            // performed by CFrame_resize, the movement coefficient of the marker itself is set to 0.
            markerRR.htmlElement.argY = 0;
            markerRR.htmlElement.argX = 0;

            //Add size change marker to canvas.
            me.canvas.addBean(markerRD);
            me.canvas.addBean(markerDD);
            me.canvas.addBean(markerRR);

            //Method to remove size change marker (can not resize)
            me.removeMarkers = function () {
              me.canvas.removeBean(markerRD.id);
              me.canvas.removeBean(markerDD.id);
              me.canvas.removeBean(markerRR.id);
              me.htmlElement.style.cursor = "default";
            };

            me.removeMarkers2 = function () {
              me.canvas.removeBean(markerRD.id);
              me.canvas.removeBean(markerDD.id);
              me.canvas.removeBean(markerRR.id);
            };
            me.enableMarkers = function (enabled) {
              if (enabled) {
                markerRD.htmlElement.style.display = "flex";
                markerDD.htmlElement.style.display = "flex";
                markerRR.htmlElement.style.display = "flex";
                markerRD.htmlElement.style.cursor = "se-resize";
                markerDD.htmlElement.style.cursor = "n-resize";
                markerRR.htmlElement.style.cursor = "w-resize";
              } else {
                markerRD.htmlElement.style.display = "none";
                markerDD.htmlElement.style.display = "none";
                markerRR.htmlElement.style.display = "none";
              }
              // me.canvas.removeBean(markerRD.id);
              // me.canvas.removeBean(markerDD.id);
              // me.canvas.removeBean(markerRR.id);
            };

            for (var idx in appearance.frameComponents) {
              var frameComponent = appearance.frameComponents[idx];
              frameComponent.setFrame(me);

              //if frameComponent has special name 'closeButton', it will act as a close button.
              if ("closeButton" == frameComponent.id) {
                frameComponent.htmlElement.onclick = me.close;
              }

              // Handle child menu open/close
              var frameComponentHasChildMenu = frameComponent.htmlElement
                .querySelector(".jsframe-child-menu");
              if (frameComponentHasChildMenu) {
                me.eventListenerHelper.addEventListener(
                  frameComponent.htmlElement,
                  "click",
                  function (e) {
                    var frameComponentId = e.target.getAttribute(
                      "component-id",
                    );

                    // Close all frame component's childmenu once because other frame component's childmenu may be open.
                    // If {exceptFrameComponentId:[frameComponentId]} is specified for the argument,
                    // the child menu will not be closed.
                    me.hideFrameComponentChildMenus(
                      { exceptFrameComponentId: frameComponentId },
                    );

                    if (frameComponentId) {
                      var frameComponentHtmlElement = me
                        .getFrameComponentElement(frameComponentId);
                      var frameComponentChildMenu = frameComponentHtmlElement
                        .querySelector(".jsframe-child-menu");
                      if (frameComponentChildMenu) {
                        // By making the display a table,
                        // the width of the childMenu can be accurately reflected.
                        // (flex does not set the width correctly.)
                        if (frameComponentChildMenu.style.display == "table") {
                          frameComponentChildMenu.style.display = "none";
                        } else {
                          frameComponentChildMenu.style.display = "table";
                        }
                      } else {
                        console.error(
                          "frameComponent child menu isnt found. frameComponentId=" +
                            frameComponentId,
                        );
                      }
                    }
                  },
                  { listenerName: "frame-component_child-menu-listener" },
                );
              }

              me.addFrameComponent(frameComponent);
            } // /add frameComponents[end]

            //override the field
            me.htmlElement.style.backgroundColor = "transparent";

            me.htmlElement.oncontextmenu = this.contextMenu;

            //The policy of Border drawing seems to be different between IE and FF.
            var caribVal = 0;

            me.caribValue = caribVal;

            if (me.exBorderWidth) {
              me.htmlElement.style.borderWidth = me.exBorderWidth + "px";
            }
            me.htmlElement.style.width =
              (parseInt(me.htmlElement.style.width, 10) - caribVal) + "px";
            me.htmlElement.style.height =
              (parseInt(me.htmlElement.style.height, 10) - caribVal + 1) + "px";
            me.htmlElement.typeName = "cwindow";
            me.htmlElement.overflow = "auto";
            me.htmlElement.style.boxSizing = "content-box";

            if (appearance.frameBorderStyle) {
              me.htmlElement.style.borderStyle = appearance.frameBorderStyle;
            }

            if (appearance.frameBoxShadow) {
              me.htmlElement.style.boxShadow = appearance.frameBoxShadow;
            }

            //TODO deprecation(because CIfFrame is extended this operation)
            if (parseInt(appearance.frameBorderWidthDefault, 10) >= 0) {
              me.htmlElement.style.borderWidth =
                appearance.frameBorderWidthDefault;
              me.htmlElement.style.borderColor =
                appearance.frameBorderColorDefault;
            }
            if (parseInt(appearance.frameBorderRadius, 10) >= 0) {
              me.htmlElement.style.borderRadius = appearance.frameBorderRadius;
            }

            me.onCloseFrameListener = null;
          }

          CFrame.prototype.setTitleBarClassName = function (
            classNameForDefault,
            classNameForFocused,
          ) {
            var me = this;
            if (classNameForDefault) {
              me.titleBarClassNameDefault = classNameForDefault;
              me.titleBarClassNameFocused = classNameForDefault;
            }
            if (classNameForFocused) {
              me.titleBarClassNameFocused = classNameForFocused;
            }
            return me;
          };
          /**
 * Add frameComponent(Wrapped DOM element like 'div' to display above the frame) to frame
 * @param frameComponent
 */
          CFrame.prototype.addFrameComponent = function (frameComponent) {
            var me = this;

            me.frameComponentMap[frameComponent.id] = frameComponent;
            me.canvas.canvasElement.appendChild(frameComponent.htmlElement);
            return me;
          };

          /**
 * Get stored frame component by id
 * @param frameComponent
 */
          CFrame.prototype.getFrameComponentElement = function (id) {
            var me = this;
            if (me.frameComponentMap[id]) {
              return me.frameComponentMap[id].htmlElement;
            } else {
              return null;
            }
          };

          CFrame.prototype.removeFrameComponentById = function (
            frameComponentId,
          ) {
            var me = this;

            var frameComponent = me.frameComponentMap[frameComponentId];

            me.canvas.canvasElement.removeChild(frameComponent.htmlElement);
            delete me.frameComponentMap[frameComponentId];
          };

          CFrame.prototype.showFrameComponent = function (
            frameComponentId,
            display,
          ) {
            var me = this;
            var comp = me.getFrameComponentElement(frameComponentId);
            if (comp) {
              if (display) {
                comp.style.display = display;
              } else {
                comp.style.display = "flex";
              }
            }
            return me;
          };

          CFrame.prototype.hideFrameComponent = function (frameComponentId) {
            var me = this;
            var comp = me.getFrameComponentElement(frameComponentId);
            if (comp) {
              comp.style.display = "none";
            }
            return me;
          };

          CFrame.prototype.hideAllVisibleFrameComponents = function () {
            var me = this;

            var compMap = me.frameComponentMap;
            for (var key in compMap) {
              if (compMap.hasOwnProperty(key)) {
                var comp = compMap[key].htmlElement;
                if (comp.style.display === "none") {
                  comp._alreadyNone = true;
                }
                comp.style.display = "none";
              }
            }
          };
          CFrame.prototype.showAllVisibleFrameComponents = function () {
            var me = this;
            var compMap = me.frameComponentMap;
            for (var key in compMap) {
              if (compMap.hasOwnProperty(key)) {
                var comp = compMap[key].htmlElement;
                if (comp._alreadyNone) {
                  comp._alreadyNone = null;
                } else {
                  comp.style.display = "flex";
                }
              }
            }
          };

          /**
 * Close all childMenu
 If {exceptFrameComponentId:[frameComponentId]} is specified for the argument,
 the child menu will not be closed.

 * @param opt
 */
          CFrame.prototype.hideFrameComponentChildMenus = function (opt) {
            var me = this;

            var compMap = me.frameComponentMap;
            for (var frameComponentId in compMap) {
              if (compMap.hasOwnProperty(frameComponentId)) {
                if (opt && opt.exceptFrameComponentId) {
                  if (frameComponentId === opt.exceptFrameComponentId) {
                    continue;
                  }
                }
                var comp = compMap[frameComponentId];
                if (comp.childMenu) {
                  comp.childMenu.style.display = "none";
                }
              }
            }
          };

          CFrame.prototype.setTitle = function (str) {
            var me = this;
            me.title = str;
            if (me.showTitleBar) {
              var textNode = document.createTextNode(str);
              //firstChildのfirstChildがspan
              me.titleBar.firstChild.replaceChild(
                textNode,
                me.titleBar.firstChild.firstChild,
              );
            }
            return me;
          };

          CFrame.prototype.resize = function (
            deltaLeft,
            deltaTop,
            deltaWidth,
            deltaHeight,
          ) {
            var me = this;

            var tmpLeft = parseInt(me.htmlElement.style.left, 10);
            var tmpTop = parseInt(me.htmlElement.style.top, 10);
            var tmpWidth = parseInt(me.htmlElement.style.width, 10);
            var tmpHeight = parseInt(me.htmlElement.style.height, 10);

            me.htmlElement.style.left = parseInt(tmpLeft + deltaLeft, 10) +
              "px";
            me.htmlElement.style.top = parseInt(tmpTop + deltaTop, 10) + "px";

            me.htmlElement.style.width = parseInt(tmpWidth + deltaWidth, 10) +
              "px";
            me.htmlElement.style.height =
              parseInt(tmpHeight + deltaHeight, 10) + "px";

            var tmpCanvasWidth = parseInt(
              me.canvas.canvasElement.style.width,
              10,
            );
            var tmpCanvasHeight = parseInt(
              me.canvas.canvasElement.style.height,
              10,
            );

            //Since canvasElement is a (0, 0) relative coordinate with respect to the parent element,
            // so it is not necessary to change left and top.
            me.canvas.canvasElement.style.width =
              (tmpCanvasWidth + deltaWidth) + "px";
            me.canvas.canvasElement.style.height =
              (tmpCanvasHeight + deltaHeight) + "px";

            if (me.showTitleBar) {
              //Change the size of the title bar. TitleAdjustWidth etc.
              //The reason why you do not have to use titleAdjustWidth is because
              // these scaling are done with differences (deltaX, deltaY).
              //Therefore, if you adjust with the titleAdjustWidth as
              // the initial value, the other will stretch relative.
              //You do not think you can use ifDelta
              me.titleBar.style.width = (tmpCanvasWidth + deltaWidth) + "px";
            } else {
            }

            for (var beanName in me.canvas.beanList) {
              var tmpBean = me.canvas.beanList[beanName];

              if (tmpBean.htmlElement.typeName == "cmarkerwindow") {
                if (tmpBean.htmlElement.usage == "RD") {
                  //Move the size change lower right(RD) marker according to the amount of movement.
                  tmpBean.htmlElement.style.left =
                    (parseInt(tmpBean.htmlElement.style.left, 10) +
                      deltaWidth) + "px";
                  tmpBean.htmlElement.style.top =
                    (parseInt(tmpBean.htmlElement.style.top, 10) +
                      deltaHeight) + "px";
                } else if (tmpBean.htmlElement.usage == "DD") {
                  //Move the size change lower marker according to the movement amount.
                  // Do not move left.Only the width wil increase or decrease.
                  tmpBean.htmlElement.style.width =
                    (parseInt(tmpBean.htmlElement.style.width, 10) +
                      deltaWidth) + "px";
                  tmpBean.htmlElement.style.top =
                    (parseInt(tmpBean.htmlElement.style.top, 10) +
                      deltaHeight) + "px";
                } else if (tmpBean.htmlElement.usage == "RR") {
                  //Move the size change right marker according to the movement amount
                  //Do not move top,Only the height will increase or decrease.
                  tmpBean.htmlElement.style.left =
                    (parseInt(tmpBean.htmlElement.style.left, 10) +
                      deltaWidth) + "px";
                  tmpBean.htmlElement.style.height =
                    (parseInt(tmpBean.htmlElement.style.height, 10) +
                      deltaHeight) + "px";
                }
              }
            }
          };

          CFrame.prototype.canvasMouseDown = function (e) {
            var me = this;

            //Mousedown processing of CFrame.canvas

            //'This' in this method indicates 'Cwindow.canvas.canvasElement'.
            if (this.parentCFrame.parentCanvas.mouseDownSource == null) {
              this.parentCFrame.parentCanvas.mouseDownSource = "childcanvas";
            }
          };
          CFrame.prototype.mouseUp = function (e) {
            this.canvas.mouseUp(e);
          };

          CFrame.prototype.close = function (e) {
            var me = this;
            //Close processing of CFrame from CloseButton

            var parentCanvas = this.parentObject.parentCanvas;
            var cframeObj = this.parentObject;

            console.log(
              'CFrame#close "' + cframeObj.title + "(@" + cframeObj.getName() +
                ")" + '" @' + cframeObj.windowId,
            );

            var windowId = cframeObj.id;
            cframeObj.closeInternally(e, parentCanvas, windowId);
          };

          CFrame.prototype.closeFrame = function (e) {
            //Close processing of CFrame
            var me = this;

            console.log(
              'CFrame#closeFrame "' + me.title + "(" + me.getName() + ")" +
                '" @' + me.windowId,
            );

            var parentCanvas = this.parentCanvas;
            me.closeInternally(e, parentCanvas, me.windowId);
          };

          CFrame.prototype.closeInternally = function (
            e,
            parentCanvas,
            windowId,
          ) {
            var me = this;

            if (!parentCanvas) {
              console.error("Window(" + windowId + ") may have been closed");
              return;
            }
            parentCanvas.removeBean(windowId);

            //added for modal window
            if (me.modalBackgroundWindowId) {
              parentCanvas.removeBean(me.modalBackgroundWindowId);
              me.modalBackgroundWindowId = null;
            }

            if (me.onCloseFrameListener) {
              me.onCloseFrameListener(me);
            }
          };

          CFrame.prototype.setOnCloseFrameListener = function (listener) {
            var me = this;
            me.onCloseFrameListener = listener;
          };

          CFrame.prototype.contextMenu = function () {
            //If you issue the right-click menu in the window, set the source to CFrame.
            var contextMenuSource = "CFrame";
            return false;
          };

          CFrame.prototype.setTitleBarTextColor = function (str) {
            var me = this;
            me.titleBar.style.color = str;
          };

          /**
 * Set window position with anchor
 * @param {number} x
 * @param {number} y
 * @param {string} anchor anchor means the position of the window with respect to which the position is specified.<br>
 *   The following values can be specified for the anchor
 LEFT_TOP
 CENTER_TOP
 RIGHT_TOP
 LEFT_CENTER
 CENTER_CENTER
 RIGHT_CENTER
 LEFT_BOTTOM
 CENTER_BOTTOM
 RIGHT_BOTTOM
 * @returns {CFrame}
 */
          CFrame.prototype.setPosition = function (x, y, anchor) {
            var me = this;

            var frameWidth = me.getWidth();
            var frameHeight = me.getHeight();

            me._setPositionInternally(x, y, anchor, frameWidth, frameHeight);

            return me;
          };
          CFrame.prototype._setPositionInternally = function (
            x,
            y,
            anchor,
            frameWidth,
            frameHeight,
          ) {
            var me = this;

            if (anchor) {
              me.anchor = anchor;
            }

            if (!anchor || CALIGN.LEFT_TOP == anchor) {
              me.htmlElement.style.left = x + "px";
              me.htmlElement.style.top = y + "px";
            } else if (CALIGN.HCENTER_TOP == anchor) {
              me.htmlElement.style.left = (-frameWidth / 2 + x) + "px";
              me.htmlElement.style.top = y + "px";
            } else if (CALIGN.RIGHT_TOP == anchor) {
              me.htmlElement.style.left = (-frameWidth + x) + "px";
              me.htmlElement.style.top = y + "px";
            } else if (CALIGN.LEFT_VCENTER == anchor) {
              me.htmlElement.style.left = x + "px";
              me.htmlElement.style.top = (-frameHeight / 2 + y) + "px";
            } else if (CALIGN.HCENTER_VCENTER == anchor) {
              me.htmlElement.style.left = (-frameWidth / 2 + x) + "px";
              me.htmlElement.style.top = (-frameHeight / 2 + y) + "px";
            } else if (CALIGN.RIGHT_VCENTER == anchor) {
              me.htmlElement.style.left = (-frameWidth + x) + "px";
              me.htmlElement.style.top = (-frameHeight / 2 + y) + "px";
            } else if (CALIGN.LEFT_BOTTOM == anchor) {
              me.htmlElement.style.left = x + "px";
              me.htmlElement.style.top = (-frameHeight + y) + "px";
            } else if (CALIGN.HCENTER_BOTTOM == anchor) {
              me.htmlElement.style.left = (-frameWidth / 2 + x) + "px";
              me.htmlElement.style.top = (-frameHeight + y) + "px";
            } else if (CALIGN.RIGHT_BOTTOM == anchor) {
              me.htmlElement.style.left = (-frameWidth + x) + "px";
              me.htmlElement.style.top = (-frameHeight + y) + "px";
            }
          };

          /**
 * Returns relative position with anchor
 * @returns {{x: *, y: *, anchor: *}}
 */
          CFrame.prototype.getPosition = function () {
            var me = this;
            var frameWidth = me.getWidth();
            var frameHeight = me.getHeight();
            var x;
            var y;
            var anchor = me.anchor;
            if (!anchor || CALIGN.LEFT_TOP == anchor) {
              x = parseInt(me.htmlElement.style.left, 10);
              y = parseInt(me.htmlElement.style.top, 10);
            } else if (CALIGN.HCENTER_TOP == anchor) {
              x = parseInt(me.htmlElement.style.left, 10) + frameWidth / 2;
              y = parseInt(me.htmlElement.style.top, 10);
            } else if (CALIGN.RIGHT_TOP == anchor) {
              x = parseInt(me.htmlElement.style.left, 10) + frameWidth;
              y = parseInt(me.htmlElement.style.top, 10);
            } else if (CALIGN.LEFT_VCENTER == anchor) {
              x = parseInt(me.htmlElement.style.left, 10);
              y = parseInt(me.htmlElement.style.top, 10) + frameHeight / 2;
            } else if (CALIGN.HCENTER_VCENTER == anchor) {
              x = parseInt(me.htmlElement.style.left, 10) + frameWidth / 2;
              y = parseInt(me.htmlElement.style.top, 10) + frameHeight / 2;
            } else if (CALIGN.RIGHT_VCENTER == anchor) {
              x = parseInt(me.htmlElement.style.left, 10) + frameWidth;
              y = parseInt(me.htmlElement.style.top, 10) + frameHeight / 2;
            } else if (CALIGN.LEFT_BOTTOM == anchor) {
              x = parseInt(me.htmlElement.style.left, 10);
              y = parseInt(me.htmlElement.style.top, 10) + frameHeight;
            } else if (CALIGN.HCENTER_BOTTOM == anchor) {
              x = parseInt(me.htmlElement.style.left, 10) + frameWidth / 2;
              y = parseInt(me.htmlElement.style.top, 10) + frameHeight;
            } else if (CALIGN.RIGHT_BOTTOM == anchor) {
              x = parseInt(me.htmlElement.style.left, 10) + frameWidth;
              y = parseInt(me.htmlElement.style.top, 10) + frameHeight;
            }
            return { x: x, y: y, anchor: anchor };
          };

          CFrame.prototype.getLeft = function () {
            var me = this;
            return parseInt(me.htmlElement.style.left, 10);
          };

          CFrame.prototype.getTop = function () {
            var me = this;
            return parseInt(me.htmlElement.style.top, 10);
          };
          CFrame.prototype.getWidth = function () {
            var me = this;
            return parseInt(me.htmlElement.style.width, 10);
          };
          CFrame.prototype.getHeight = function () {
            var me = this;
            return parseInt(me.htmlElement.style.height, 10);
          };

          CFrame.prototype.getSize = function () {
            var me = this;
            return { width: me.getWidth(), height: me.getHeight() };
          };

          CFrame.prototype.setSize = function (width, height, force) {
            var me = this;

            var byUser = true;

            if (force) {
              byUser = false;
            }

            //call CIFrame#resize instead of CFrame#resize
            me.resize(
              0,
              0,
              width - me.getWidth(),
              height - me.getHeight(),
              byUser,
            );
            return me;
          };

          CFrame.prototype.getWindowId = function () {
            var me = this;
            return me.windowId;
          };

          CFrame.prototype.getName = function () {
            var me = this;
            return me.property.name;
          };

          CFrame.prototype.setName = function (name) {
            var me = this;
            me.property.name = name;
          };
          /**
 * end of CFrame class
 */

          //+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

          inherit(CIfFrame, CFrame);

          /**
 * CIfFrame class
 * Extension class with contents frame of CFrame as iframe
 * @param windowId
 * @param appearance
 * @constructor
 */
          function CIfFrame(windowId, left, top, width, height, appearance) {
            var wleft = left;
            var wtop = top;
            var wwidth = width;
            var wheight = height;
            var zindex = appearance.zindex;
            var wborderwidth = null;

            var me = this;

            this.jsFrame = null;
            this.control = null;

            this.minFrameWidth = 128;
            this.minWindowHeight = 32;

            this.eventListenerHelper = new EventListenerHelper();

            /**
   * If this value is true, the focus will move when tapping the iframe area,
   * but if the window do not have the focus, you can not click on the element in the iframe.
   */
            this.overrayTransparentScreenEnabled = false;

            /**
   *  Only in the case of resizing a transparent screen can be displayed on the iframe
   *  and the size can be adjusted smoothly.
   *  true is recommended.
   */
            //Change history
            //20181226
            //Changed to false.
            // So it becomes necessary to click twice to react when you call the #setSize,I changed the value to false.
            //20181231
            //I found the way that iframe will be changed the size smoothly.so the final answer is true.
            this.overrayTransparentScreenOnResize = true;

            this.titleBarColorFocused = appearance.titleBarColorFocused;

            this.titleBarColorDefault = appearance.titleBarColorDefault;

            this.titleBarCaptionColorDefault =
              appearance.titleBarCaptionColorDefault;
            this.titleBarCaptionColorFocused =
              appearance.titleBarCaptionColorFocused;

            //call super constructor
            CIfFrame.superConstructor.call(
              me,
              windowId,
              wleft,
              wtop,
              wwidth,
              wheight,
              zindex,
              wborderwidth,
              appearance,
            );

            //border color
            me.frameBorderColorDefault = appearance.frameBorderColorDefault;
            me.frameBorderColorFocused = appearance.frameBorderColorFocused;

            //border width
            me.frameBorderWidthDefault = appearance.frameBorderWidthDefault;
            me.frameBorderWidthFocused = appearance.frameBorderWidthFocused;

            me.iframe = null;

            //Offset value for width adjustment of iframe
            me.ifDelta = 0;

            me.resizable = true;

            me.onMouseMoveOnIframe = null;
            me.onMouseUpOnIframe = null;

            me._hasFocus = false;

            me._hasFocusTime = 0;

            me.htmlElement.typeName = "cifwindow";

            //name of iframe
            var exIframeName = "riversun_" + windowId;

            me.dframe = document.createElement("div");

            me.iframe = document.createElement("iframe");

            me.iframe.name = exIframeName;

            me.iframe.id = exIframeName;

            me.iframe.frameBorder = "0";
            //me.iframe.scrolling = 'no';

            me.iframe.zIndex = -1;

            //Allow transparent of iframe background.
            me.iframe.allowTransparency = "true";
            me.iframe.width = me.canvasNetWidth - me.ifDelta + 0;
            me.iframe.height = me.canvasNetHeight - me.ifDelta + 0;

            me.showTitleBar = appearance.showTitleBar;

            me.getFrameInnerBorderRadius = appearance.getFrameInnerBorderRadius;

            me.frameBorderRadius = appearance.frameBorderRadius;

            me.adjustFrameBorderRadius();

            me.useIframe = false;

            me.canvas.canvasElement.appendChild(me.iframe);

            me.canvas.canvasElement.appendChild(me.dframe);

            this.setUseIframe = function (useIframe) {
              me.useIframe = useIframe;
              me.iframe.style.visibility = "hidden";
              me.iframe.style.position = "absolute";
              me.iframe.style.left = "0px";
              me.iframe.style.top = "0px";
              me.iframe.style.width = "100%";
              me.iframe.style.height = "100%";

              me.dframe.style.visibility = "hidden";
              me.dframe.style.position = "absolute";
              me.dframe.style.left = "0px";
              me.dframe.style.boxSizing = "content-box";

              me.dframe.style.top = "0px";
              me.dframe.style.width = "100%";
              me.dframe.style.height = "100%";
              //me.dframe.style.borderStyle="solid";
              me.dframe.style.backgroundColor = "white";

              if (useIframe) {
                me.iframe.style.visibility = "visible";
                me.dframe.style.visibility = "hidden";
              } else {
                me.iframe.style.visibility = "hidden";
                me.dframe.style.visibility = "visible";
              }
            };

            me.setUseIframe(appearance.useIframe);

            // If it is IE, set the canvasElement of the canvas which is the parent of the iframe to transparent.

            if (
              me.overrayTransparentScreenEnabled ||
              me.overrayTransparentScreenOnResize
            ) {
              //Create a transparent screen.
              me.transparence = document.createElement("span");
              // me.transparence.style.backgroundImage = 'url(img/img_baron_tp.gif)';

              me.transparence.style.position = "absolute";
              me.transparence.style.left = "0px";
              me.transparence.style.top = "0px";

              //Transparent screen is 0px when creating window
              me.transparence.style.width = "0px";
              me.transparence.style.height = "0px";

              me.transparence.style.zIndex = 4;
              me.transparence.style.borderWidth = "0px";
              me.transparence.style.borderColor = "#ff00ee";
              me.transparence.style.borderStyle = "none";
              me.transparence.style.cursor = "default";

              me.transparence.style.pointerEvents = "none";
              me.canvas.canvasElement.style.backgroundColor =
                appearance.frameBackgroundColor;

              me.canvas.canvasElement.appendChild(me.transparence);
            }

            me.eventEmitter = new EventEmitter();

            me.appearance = appearance;
          }

          CIfFrame.prototype.getFrameView = function () {
            var me = this;
            return me.dframe;
          };

          CIfFrame.prototype.getFrameAppearance = function () {
            var me = this;
            return me.appearance;
          };

          CIfFrame.prototype.setHTML = function (html) {
            var me = this;
            me.dframe.innerHTML = html;
          };
          CIfFrame.prototype.setFrameInFrame = function (enabled) {
            // Why i had to (bother to:) ) make a setFrameInFrame
            // The element specified at the top of the content of the parent window (for example, div element)
            // may NOT be able to get the resize event using addEventListener.
            // Therefore, when the resize event issued by jsFrame in the parent window occurs,
            // its custom attribute (WindowEventHelper.MATCH_PARENT_CHANGE_MARKER_ATTR) is attached
            // to the element at the top of the parent window content
            // and it is captured by the mutationObserver on the child window side.

            var me = this;

            var contentsEle = me.dframe ? me.dframe.firstChild : null;

            if (contentsEle) {
              // polyfill for #now
              if (!Date.now) {
                Date.now = function now() {
                  return new Date().getTime();
                };
              }
              if (enabled) {
                me.eventEmitter.only("resize", "fif-listener", function () {
                  contentsEle.setAttribute(
                    WindowEventHelper.MATCH_PARENT_CHANGE_MARKER_ATTR,
                    Date.now(),
                  );
                });
              } else {
                contentsEle.removeAttribute(
                  WindowEventHelper.MATCH_PARENT_CHANGE_MARKER_ATTR,
                );
                me.eventEmitter.only("resize", "fif-listener", function () {
                  // do nothing
                });
              }
            }
          };
          /**
 * Find DOM Element in the frame by querySelector<br>
 *  Examples<br>
 *      frame.$("#my_id_name");
 *      frame.$(".my_class_name");
 *      frame.$("div>img");
 *      frame.$("input[type='submit]");
 * @param {string} q selector query
 * @returns {Node}
 */
          CIfFrame.prototype.$ = function (q) {
            var me = this;

            if (me.useIframe) {
              var docInIframe = me.iframe.contentWindow.document;
              return docInIframe.querySelector(q);
            } else {
              return me.dframe.querySelector(q);
            }
          };

          /**
 * Sets an event listener for the window itself or elements in the contents of the window.
 It is possible to register multiple listeners to the same event type.

 * @param {string} id
 If the "id" is prefixed with "#",
 an event listener can be set to a DOM element (eventTarget) identified by the id in the content.<br>
 This is the same behavior as the usual eventTarget#addEventListener.<br>
 <br>
 In addition to the DOM element in the content, the following special names are reserved for the "id"<br>
 "closeButton" ... close button.<br>
 "minimizeButton" ... Minimize Button<br>
 "zoomButton"...zoom button.<br>
 "restoreButton" ... the button that restores the window size.<br>
 "deminimizeButton" ... the button to return from the minimized state.<br>
 <br>
 You can also receive events such as window resizing, moving, and focusing.
 In this case, specify the following as "id"<br>
 "frame" or "window".<br>
 <br>
 You can specify a frameComponent name that is uniquely defined by addFrameComponent.
 (Generic buttons such as closeButton are one of the frame components.
 * @param {string} eventType The element in the content (HTML) of a window whose "id" starts with "#"
 * can be the same as the eventType(https://developer.mozilla.org/en-US/docs/Web/API/Event/type) used by the normal addEventListener.<br>
 <br>
 If the "id" is a frame or a window, the following can be used<br>
 "move"... When a window is moved, it fires.<br>
 "resize"... Fires when the window is resized.<br>
 "focus"... "focus" means got focus. It fires when the window is in focus.<br>
 "blur"... "blur" means lost focus.It fires when the window loses focus.<br>
 <br>
 * @param {function} callbackFunc
 */
          CIfFrame.prototype.on = function (id, eventType, callbackFunc) {
            var me = this;
            var component = me.getFrameComponentElement(id);

            // if id indicates frame component like CTextButton,CImageButton
            if (component) {
              //Since we want to specify only one handler for frame components at the same time,
              // use eventListenerHelper instead of an event listener
              me.eventListenerHelper.addEventListener(
                component,
                eventType,
                function (e) {
                  callbackFunc(me, e, {
                    type: "frameComponent",
                    id: id,
                    eventType: eventType,
                    //child: childMenuEle
                  });
                },
                { listenerName: "frame-component-listener" },
              );
            }

            if (id === "frame" || id === "window") {
              if (
                eventType === "move" &&
                !me.eventEmitter.hasListenerFuncs("move")
              ) {
                me.setOnMoveListener(function (e) {
                  //refCIfFrame.eventEmitter.emit('resize',);
                  me.eventEmitter.emit("move", me._getCurrentSizePos());
                });
              }

              me.eventEmitter.on(eventType, callbackFunc);
            }

            // DOM element in iframe or DOM element on dframe
            var domElement = me.$(id);

            if (domElement) {
              if (
                me.eventListenerHelper.hasEventListener(
                  domElement,
                  eventType,
                  "frame-dom-listener",
                )
              ) {
                me.eventListenerHelper.removeEventListener(
                  domElement,
                  eventType,
                  null,
                  { listenerName: "frame-dom-listener" },
                );
              }
              me.eventListenerHelper.addEventListener(
                domElement,
                eventType,
                function (e) {
                  callbackFunc(me, e, {
                    type: "dom",
                    id: id,
                    eventType: eventType,
                  });
                },
                { listenerName: "frame-dom-listener" },
              );
            }

            // Search DOM element on frameComponent
            if (!domElement) {
              var domElementOnCanvasElement = me.canvas.canvasElement
                .querySelector(id);
              if (domElementOnCanvasElement) {
                domElementOnCanvasElement.addEventListener(
                  eventType,
                  function (e) {
                    callbackFunc(me, e, {
                      type: "dom",
                      id: id,
                      eventType: eventType,
                    });
                  },
                );
              }
            }
          };

          CIfFrame.prototype.adjustFrameBorderRadius = function () {
            var me = this;

            if (parseInt(me.frameBorderRadius, 10) > 0) {
              var borderData = me.getFrameInnerBorderRadius(me, me._hasFocus);
              var frameAppearance = borderData.frameAppearance;
              var innerBorderRadius = borderData.innerBorderRadius;
              var titleBarHeight = parseInt(frameAppearance.titleBarHeight, 10);

              if (me.showTitleBar) {
                //title bar exists
                me.canvas.canvasElement.style.borderBottomRightRadius =
                  innerBorderRadius;
                me.canvas.canvasElement.style.borderBottomLeftRadius =
                  innerBorderRadius;
                me.iframe.style.borderBottomRightRadius = innerBorderRadius;
                me.iframe.style.borderBottomLeftRadius = innerBorderRadius;

                me.titleBar.style.borderTopLeftRadius = innerBorderRadius;
                me.titleBar.style.borderTopRightRadius = innerBorderRadius;
              } else {
                //title bar not exits
                me.canvas.canvasElement.style.borderRadius = innerBorderRadius;
                me.iframe.style.borderRadius = innerBorderRadius;
              }

              if (me.dframe) {
                if (titleBarHeight === 0) {
                  if (!me.dframe.style.borderTopRightRadius) {
                    me.dframe.style.borderTopRightRadius = innerBorderRadius;
                  }
                  if (!me.dframe.style.borderTopLeftRadius) {
                    me.dframe.style.borderTopLeftRadius = innerBorderRadius;
                  }
                }
                me.dframe.style.borderBottomRightRadius = innerBorderRadius;
                me.dframe.style.borderBottomLeftRadius = innerBorderRadius;
              }
            }
          };

          CIfFrame.prototype.handleReleasingFocus = function (e) {
            var me = this;

            var focused = me._hasFocus;

            me._hasFocus = false;

            //update style class
            me.titleBar.className = me.titleBarClassNameDefault;

            if (me.titleBarColorDefault) {
              me.titleBar.style.background = me.titleBarColorDefault;
            }
            me.titleBar.style.color = me.titleBarCaptionColorDefault;

            //border color
            if (me.frameBorderColorDefault) {
              me.htmlElement.style.borderColor = me.frameBorderColorDefault;
            }

            //border width
            if (me.frameBorderWidthDefault) {
              me.htmlElement.style.borderWidth = me.frameBorderWidthDefault;
              me.adjustFrameBorderRadius();
            }

            if (me.htmlElement.typeName == "cifwindow") {
              if (me.overrayTransparentScreenEnabled) {
                me.transparence.style.width = parseInt(me.iframe.width, 10) +
                  "px";
                me.transparence.style.height = parseInt(me.iframe.height, 10) +
                  "px";
              }
            }

            //handling for child frameComponents
            for (var frameComponentId in me.frameComponentMap) {
              var frameComponent = me.frameComponentMap[frameComponentId];
              frameComponent.handleReleasingFocus();
            }

            //border bottom
            if (me.titleBarBorderBottomDefault) {
              me.titleBar.style.borderBottom = me.titleBarBorderBottomDefault;
            }

            if (focused) {
              me.eventEmitter.emit("blur", { target: me });
            }

            return me;
          };

          CIfFrame.prototype.handleTakingFocus = function (e) {
            var me = this;
            var focused = me._hasFocus;
            me._hasFocus = true;
            me._hasFocus = Date.now();

            if (me.overrayTransparentScreenEnabled) {
              //close transparence screen
              me.transparence.style.width = "0px";
              me.transparence.style.height = "0px";
            }

            //update style class
            me.titleBar.className = me.titleBarClassNameFocused;

            if (me.titleBarColorFocused) {
              me.titleBar.style.background = me.titleBarColorFocused;
            }
            me.titleBar.style.color = me.titleBarCaptionColorFocused;

            //border color
            if (me.frameBorderColorFocused) {
              me.htmlElement.style.borderColor = me.frameBorderColorFocused;
            }

            //border width
            if (me.frameBorderWidthFocused) {
              me.htmlElement.style.borderWidth = me.frameBorderWidthFocused;
              me.adjustFrameBorderRadius();
            }

            //border bottom
            if (me.titleBarBorderBottomFocused) {
              me.titleBar.style.borderBottom = me.titleBarBorderBottomFocused;
            }

            //handling for child frameComponents
            for (var frameComponentId in me.frameComponentMap) {
              var frameComponent = me.frameComponentMap[frameComponentId];
              frameComponent.handleTakingFocus();
            }

            if (!focused) {
              me.eventEmitter.emit("focus", { target: me });
            }

            return me;
          };

          CFrame.prototype.show = function (model) {
            var me = this;
            //me.htmlElement.style.visibility = 'visible';
            me.htmlElement.style.display = "flex"; //hidden';

            if (model && model.requestFocus == false) {
            } else {
              me.requestFocus();
            }
            return me;
          };

          CFrame.prototype.showModal = function (onCloseListener) {
            var me = this;

            var appearance = new CFrameAppearance();
            appearance.showTitleBar = true;
            appearance.showCloseButton = false;
            appearance.frameBorderRadius = "0px";
            appearance.frameBorderStyle = "none";
            appearance.frameBorderWidthDefault = "0px";
            appearance.frameBorderWidthFocused = "0px";
            appearance.frameBoxShadow = null;
            appearance.frameBackgroundColor = "transparent";
            appearance.frameComponents = [];
            appearance.frameHeightAdjust = 0;
            appearance.titleBarHeight = "0px";
            appearance.titleBarBorderBottomFocused = null;
            appearance.titleBarCaptionLeftMargin = "0px";

            appearance.onInitialize = function () {
            };

            //added for modal window
            appearance.pullUpDisabled = true;

            var windowManager = me.parentCanvas;

            var modalBackgroundWindowId =
              DEF.CFRAME.MODAL_BACKGROUND_FRAME_ID_PREFIX + me.id;

            //create background window for preventing click background
            var modalBackgroundFrame = new CIfFrame(
              modalBackgroundWindowId,
              0,
              0,
              1,
              1,
              appearance,
            );
            modalBackgroundFrame.setSize(
              window.innerWidth,
              window.innerHeight,
              true,
            );
            modalBackgroundFrame.setResizable(false);

            window.addEventListener("resize", function () {
              modalBackgroundFrame.setSize(
                window.innerWidth,
                window.innerHeight,
                true,
              );
            });

            //remember id of modal background frame
            me.modalBackgroundWindowId = modalBackgroundWindowId;

            // if (properties && properties.windowName) {
            //     frame.setName(properties.windowName);
            // }

            modalBackgroundFrame.hide();
            windowManager.addWindow(modalBackgroundFrame);

            modalBackgroundFrame.setTitle("").getFrameView().innerHTML =
              '<div class="jsframe-modal-window-background"></div>';
            modalBackgroundFrame.getFrameView().style.backgroundColor =
              "rgba(0,0,0,0.0)";
            modalBackgroundFrame.show();

            me.show();

            if (onCloseListener) {
              me.setOnCloseFrameListener(onCloseListener);
            }
          };
          CFrame.prototype.getWindowManager = function () {
            var me = this;
            return me.parentCanvas;
          };

          CIfFrame.prototype.hide = function () {
            var me = this;
            //  me.htmlElement.style.visibility = 'hidden';
            me.htmlElement.style.display = "none"; //hidden';
            return me;
          };

          //Overriding CBeanFrame.prototype.onmouseDown
          CIfFrame.prototype.onmouseDown = function (e) {
            var refHtmlElement = this;

            //Do not select it when dragging by the mouse.
            document.body.ondrag = function () {
              return false;
            };
            // document.body.onselectstart = function () {
            //     return false;
            // };

            //Override decorator with onmouseDown of parent class
            refHtmlElement.decorator = CFrame.prototype.onmouseDown;
            refHtmlElement.decorator(e);

            //Deploy a transparent screen.
            // Since mouseDown is pointed to this.htmlElement.onmousedown in the CBean class,
            // this 'this' will indicate this.htmlElement.
            //In other words,
            //if you want to refer 'CIfFrame',you need to specify 'this.parent.'
            //See CBeanFrame class, you can find 'this.htmlElement.parent = this'
            var refCIfFrame = refHtmlElement.parent;

            var refCWindowManager = refHtmlElement.parentCanvas;

            //When somewhere window(CFrame,CIfFrame) fires 'mouseDown',
            // Close all transparency screens so that the mouse cursor can pass over any iFrame
            for (var windowId in refCWindowManager.beanList) {
              var objCIfFrame = refCWindowManager.beanList[windowId];
              if (windowId == refCIfFrame.getWindowId()) {
                //skip
              } else {
                objCIfFrame.handleReleasingFocus();
              }
            }

            refCIfFrame.handleTakingFocus();
          };

          CIfFrame.prototype.mouseUp = function (e) {
            var refCIfFrame = this;

            if (
              refCIfFrame.overrayTransparentScreenEnabled ||
              refCIfFrame.overrayTransparentScreenOnResize
            ) {
              if (refCIfFrame.parentCanvas.onTopObject == refCIfFrame) {
                //Minimize the window at the front.
                refCIfFrame.transparence.style.width = "0px";
                refCIfFrame.transparence.style.height = "0px";
              } else {
                //The window which is not the at the front expands the screen so that it can respond to clicks.

                if (refCIfFrame.overrayTransparentScreenEnabled) {
                  refCIfFrame.transparence.style.width =
                    parseInt(refCIfFrame.iframe.width) + "px";
                  refCIfFrame.transparence.style.height =
                    parseInt(refCIfFrame.iframe.height) + "px";
                }
              }
            }

            refCIfFrame.decorator = CFrame.prototype.mouseUp;
            refCIfFrame.decorator(e);

            //Cancel selecting "Do not select when dragging mouse while releasing button" is canceled
            document.body.ondrag = null;
            document.body.onselectstart = null;

            //Disable when stopping moving.(Enable transparent window only when moving.)
            //This will work smoothly even with iframe content
            refCIfFrame.transparence.style.pointerEvents = "none";
          };

          CIfFrame.prototype.setMinFrameSize = function (width, height) {
            var me = this;
            me.minFrameWidth = width;
            me.minWindowHeight = height;
          };

          CIfFrame.prototype.resize = function (
            deltaLeft,
            deltaTop,
            deltaWidth,
            deltaHeight,
            byUser,
          ) {
            var refCIfFrame = this;

            if (!refCIfFrame.resizable && byUser) {
              return null;
            }

            var prevSize = refCIfFrame.getSize();

            //Resize processing should be overridden directly rather than adopting a decorator pattern because it has better performance.
            var tmpLeft = parseInt(refCIfFrame.htmlElement.style.left, 10);
            var tmpTop = parseInt(refCIfFrame.htmlElement.style.top, 10);
            var tmpWidth = parseInt(refCIfFrame.htmlElement.style.width, 10);
            var tmpHeight = parseInt(refCIfFrame.htmlElement.style.height, 10);

            //Important logic to handle the minimum of Window well
            if (
              byUser &&
              (tmpWidth + deltaWidth < refCIfFrame.minFrameWidth &
                deltaWidth < 0)
            ) {
              //Minimum adjustment of width
              refCIfFrame.htmlElement.style.width = tmpWidth + "px";
              deltaWidth = 0;
            }

            if (
              byUser &&
              (tmpHeight + deltaHeight < refCIfFrame.minWindowHeight &
                deltaHeight < 0)
            ) {
              //Minimum adjustment of height
              refCIfFrame.htmlElement.style.height = tmpHeight + "px";
              deltaHeight = 0;
            }
            refCIfFrame.htmlElement.style.left = (tmpLeft + deltaLeft) + "px";
            refCIfFrame.htmlElement.style.top = (tmpTop + deltaTop) + "px";
            refCIfFrame.htmlElement.style.width = (tmpWidth + deltaWidth) +
              "px";
            refCIfFrame.htmlElement.style.height = (tmpHeight + deltaHeight) +
              "px";

            var tmpCanvasWidth = parseInt(
              refCIfFrame.canvas.canvasElement.style.width,
              10,
            );
            var tmpCanvasHeight = parseInt(
              refCIfFrame.canvas.canvasElement.style.height,
              10,
            );

            //Since canvasElement is a (0, 0) relative coordinate with respect
            // to the parent element, it is not necessary to change left and top.
            refCIfFrame.canvas.canvasElement.style.width =
              (tmpCanvasWidth + deltaWidth) + "px";
            refCIfFrame.canvas.canvasElement.style.height =
              (tmpCanvasHeight + deltaHeight) + "px";

            //Change the size of the title bar. TitleAdjustWidth etc.
            // The reason why you do not have to use titleAdjustWidth is
            // because these scaling are done with differences (deltaX, deltaY).
            //Therefore, if you adjust with the titleAdjustWidth
            // as the initial value, the other will stretch relative.
            refCIfFrame.titleBar.style.width =
              (tmpCanvasWidth - refCIfFrame.ifDelta + deltaWidth + 0) + "px";

            //Image resizing for iframe that is the child element of canvas
            refCIfFrame.iframe.width =
              (tmpCanvasWidth - refCIfFrame.ifDelta + deltaWidth + 0) + "px";
            refCIfFrame.iframe.height =
              (tmpCanvasHeight - refCIfFrame.ifDelta + deltaHeight +
                refCIfFrame.frameHeightAdjust) + "px";

            if (
              refCIfFrame.overrayTransparentScreenEnabled ||
              refCIfFrame.overrayTransparentScreenOnResize
            ) {
              //Deploy a transparent screen.
              refCIfFrame.transparence.style.width =
                parseInt(refCIfFrame.iframe.width) + "px";
              refCIfFrame.transparence.style.height =
                parseInt(refCIfFrame.iframe.height) + "px";
            }

            //move frameComponent(like closeButton) corresponding to moving window edge for resize
            for (var frameComponentId in refCIfFrame.frameComponentMap) {
              var frameComponent =
                refCIfFrame.frameComponentMap[frameComponentId];
              //update alignment of frameComponent corresponding to moving window edge for resize
              frameComponent.updateAlign();
            }

            for (var beanName in refCIfFrame.canvas.beanList) {
              var tmpBean = refCIfFrame.canvas.beanList[beanName];

              if (tmpBean.htmlElement.typeName == "cmarkerwindow") {
                if (tmpBean.htmlElement.usage == "RD") {
                  tmpBean.htmlElement.style.left =
                    (parseInt(tmpBean.htmlElement.style.left) + deltaWidth) +
                    "px";
                  tmpBean.htmlElement.style.top =
                    (parseInt(tmpBean.htmlElement.style.top) + deltaHeight) +
                    "px";
                } else if (tmpBean.htmlElement.usage == "DD") {
                  tmpBean.htmlElement.style.width =
                    (parseInt(tmpBean.htmlElement.style.width) + deltaWidth) +
                    "px";
                  tmpBean.htmlElement.style.top =
                    (parseInt(tmpBean.htmlElement.style.top) + deltaHeight) +
                    "px";
                } else if (tmpBean.htmlElement.usage == "RR") {
                  tmpBean.htmlElement.style.left =
                    (parseInt(tmpBean.htmlElement.style.left) + deltaWidth) +
                    "px";
                  tmpBean.htmlElement.style.height =
                    (parseInt(tmpBean.htmlElement.style.height) + deltaHeight) +
                    "px";
                }
              }
            }

            var crrSize = refCIfFrame.getSize();
            if (
              prevSize.width !== crrSize.width ||
              prevSize.height !== crrSize.height
            ) {
              refCIfFrame.eventEmitter.emit(
                "resize",
                refCIfFrame._getCurrentSizePos(),
              );
            }
          }; //resize

          CIfFrame.prototype._getCurrentSizePos = function () {
            var me = this;
            var crrSize = me.getSize();
            var crrPos = me.getPosition();
            return { target: me, pos: crrPos, size: crrSize };
          };

          CIfFrame.prototype.resizeDirect = function (width, height, byUser) {
            var refCIfFrame = this;

            if (!refCIfFrame.resizable && byUser) {
              return null;
            }

            refCIfFrame.htmlElement.style.width = width + "px";
            refCIfFrame.htmlElement.style.height = height + "px";

            var tmpCanvasWidth = parseInt(
              refCIfFrame.canvas.canvasElement.style.width,
            );
            var tmpCanvasHeight = parseInt(
              refCIfFrame.canvas.canvasElement.style.height,
            );

            //Since canvasElement is a (0, 0) relative coordinate with respect
            // to the parent element, it is not necessary to change left and top.
            refCIfFrame.canvas.canvasElement.style.width = width + "px";
            refCIfFrame.canvas.canvasElement.style.height =
              (height - refCIfFrame.titleBar.style.height) + "px";

            //Change the size of the title bar. TitleAdjustWidth etc.
            // The reason why you do not have to use titleAdjustWidth is
            // because these scaling are done with differences (deltaX, deltaY).
            //Therefore, if you adjust with the titleAdjustWidth
            // as the initial value, the other will stretch relative.
            refCIfFrame.titleBar.style.width = (width - refCIfFrame.ifDelta) +
              "px";

            //Image resizing for iframe that is the child element of canvas
            refCIfFrame.iframe.width = width - refCIfFrame.ifDelta + "px";
            refCIfFrame.iframe.height = height - refCIfFrame.ifDelta +
              refCIfFrame.frameHeightAdjust + "px";

            if (
              refCIfFrame.overrayTransparentScreenEnabled ||
              refCIfFrame.overrayTransparentScreenOnResize
            ) {
              //Deploy a transparent screen.
              refCIfFrame.transparence.style.width =
                parseInt(refCIfFrame.iframe.width) + "px";
              refCIfFrame.transparence.style.height =
                parseInt(refCIfFrame.iframe.height) + "px";
            }

            //move frameComponent(like closeButton) corresponding to moving window edge for resize
            for (var frameComponentId in refCIfFrame.frameComponentMap) {
              var frameComponent =
                refCIfFrame.frameComponentMap[frameComponentId];
              //update alignment of frameComponent corresponding to moving window edge for resize
              frameComponent.updateAlign();
            }

            for (var beanName in refCIfFrame.canvas.beanList) {
              var tmpBean = refCIfFrame.canvas.beanList[beanName];

              if (tmpBean.htmlElement.typeName == "cmarkerwindow") {
                if (tmpBean.htmlElement.usage == "RD") {
                  tmpBean.htmlElement.style.left = width + "px"; // parseInt(tmpBean.htmlElement.style.left) + deltaWidth + 'px';
                  tmpBean.htmlElement.style.top = height + "px"; //parseInt(tmpBean.htmlElement.style.top) + deltaHeight + 'px';
                } else if (tmpBean.htmlElement.usage == "DD") {
                  tmpBean.htmlElement.style.width = width + "px";
                  tmpBean.htmlElement.style.top = height + "px"; //heightparseInt(tmpBean.htmlElement.style.top) + deltaHeight + 'px';
                } else if (tmpBean.htmlElement.usage == "RR") {
                  tmpBean.htmlElement.style.left = width + "px"; //+parseInt(tmpBean.htmlElement.style.left) + deltaWidth + 'px';
                  tmpBean.htmlElement.style.height = height + "px";
                }
              }
            }
          }; //resize

          /**
 * Focus on this frame
 */
          CIfFrame.prototype.requestFocus = function () {
            var me = this;

            var beanList = me.parentCanvas.beanList;

            for (var windowId in beanList) {
              var tmpIfWindow = beanList[windowId];

              //If it's my own window, minimize the transparent screen and change the color of the title bar.
              if (windowId == me.getWindowId()) {
                //if this frame is a target frame
                tmpIfWindow.handleTakingFocus();
              } else {
                //if this frame is NOT a target frame
                tmpIfWindow.handleReleasingFocus();
              }
            }

            me.parentCanvas.pullUp(me.id);
          };

          /**
 * URL for iframe
 * @param url
 */
          CIfFrame.prototype.setUrl = function (url) {
            var me = this;

            return new Promise(function (resolve, reject) {
              if (url) {
                me.setUseIframe(true);
              } else {
                me.setUseIframe(false);
                resolve();
              }

              me.iframe.src = url;

              me.iframe.onload = function () {
                var funcOnMouseMove = function (e) {
                  var clientX = e.pageX;
                  var clientY = e.pageY;

                  if (TOUCH_ENABLED) {
                    if (e.type === "touchmove") {
                      var changedTouches = e.changedTouches;
                      if (TOUCH_MOVE_ONLY_WITH_ONE_FINGER) {
                        var touches = e.touches;
                        if (touches.length === 1) {
                          clientX = changedTouches[0].pageX;
                          clientY = changedTouches[0].pageY;
                        } else {
                          return true;
                        }
                      } else {
                        clientX = changedTouches[0].pageX;
                        clientY = changedTouches[0].pageY;
                      }
                    }
                  }
                  var frameLeft = me.getLeft();
                  var frameTop = me.getTop();
                  var eventFromIframe = document.createEvent("MouseEvents");
                  // Processing to make it look like mouse move even if you are moving by touch
                  eventFromIframe.initMouseEvent(
                    "mousemove",
                    true,
                    false,
                    window,
                    e.detail,
                    e.screenX,
                    e.screenY,
                    (clientX + frameLeft),
                    (clientY + frameTop),
                    e.ctrlKey,
                    e.altKey,
                    e.shiftKey,
                    e.metaKey,
                    e.button,
                    null,
                  );

                  //smooth dragging during iframe mode
                  me.parentCanvas.windowMouseMove(eventFromIframe);

                  if (me.onMouseMoveOnIframe) {
                    me.onMouseMoveOnIframe(eventFromIframe);
                  }
                };
                me.iframe.contentWindow.document.onmousemove = funcOnMouseMove;
                me.iframe.contentWindow.document.ontouchmove = funcOnMouseMove;

                //mouse up
                var funcOnMouseUp = function (e) {
                  var clientX = e.pageX;
                  var clientY = e.pageY;

                  if (TOUCH_ENABLED) {
                    if (e.type === "touchend") {
                      var changedTouches = e.changedTouches;
                      clientX = changedTouches[0].pageX;
                      clientY = changedTouches[0].pageY;
                    }
                  }
                  var frameLeft = me.getLeft();
                  var frameTop = me.getTop();
                  var eventFromIframe = document.createEvent("MouseEvents");
                  // Processing to make it look like mouse up even if you mouseup by touch
                  eventFromIframe.initMouseEvent(
                    "mouseup",
                    true,
                    false,
                    window,
                    e.detail,
                    e.screenX,
                    e.screenY,
                    (clientX + frameLeft),
                    (clientY + frameTop),
                    e.ctrlKey,
                    e.altKey,
                    e.shiftKey,
                    e.metaKey,
                    e.button,
                    null,
                  );

                  //smooth dragging during iframe mode
                  me.parentCanvas.windowMouseUp(eventFromIframe);

                  if (me.onMouseUpOnIframe) {
                    me.onMouseUpOnIframe(eventFromIframe);
                  }
                };
                me.iframe.contentWindow.document.onmouseup = funcOnMouseUp;
                me.iframe.contentWindow.document.ontouchend = funcOnMouseUp;

                resolve(me, me.iframe.contentWindow.document);
              };
            });
          };

          /**
 * Returns DOM-document of iframe
 * @returns {*|HTMLDocument}
 */
          CIfFrame.prototype.getIfDocument = function () {
            var me = this;
            return me.iframe.contentWindow.document;
          };

          CIfFrame.prototype.setScrolling = function (str) {
            var me = this;
            me.iframe.scrolling = str;
          };

          CIfFrame.prototype.getScrolling = function (str) {
            var me = this;
            return me.iframe.scrolling;
          };

          CIfFrame.prototype.setResizable = function (enabled) {
            var me = this;
            me.resizable = enabled;
            me.enableMarkers(enabled);
            return me;
          };

          CIfFrame.prototype.setControl = function (model) {
            var me = this;

            if (model) {
              model.frame = me;
              me.control = me.jsFrame.createWindowEventHelper(model);
              me.control.setupDefaultEvents();
            }
          };

          /**
 * end of CIFrame class
 */

          //+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

          inherit(CWindowManager, CCanvas);

          /**
 * CWindowManager class
 * <p>
 * A canvas class that displays multiple frames. Handle events on the window to coordinate multiple windows<br>
 *
 * @param parentElement
 * @param canvasId
 * @param left
 * @param top
 * @param width
 * @param height
 * @constructor
 */
          function CWindowManager(
            parentElement,
            canvasId,
            left,
            top,
            width,
            height,
          ) {
            CWindowManager.superConstructor.call(
              this,
              parentElement,
              canvasId,
              left,
              top,
              width,
              height,
            );
            var me = this;
            // document.body.addEventListener('click', function(evt) {
            document.addEventListener("click", function (evt) {
              for (var windowId in me.beanList) {
                var beanFrame = me.beanList[windowId];
                beanFrame.onBodyClicked(evt);
              }
            });
          }

          CWindowManager.prototype.getWindow = function (windowId) {
            var me = this;
            return me.beanList[windowId];
          };

          //Wrapping the 'addBean' of the parent class
          CWindowManager.prototype.addWindow = function (window) {
            var me = this;

            var windowId = window.getWindowId();
            var name = window.getName();
            me.beanIdName[windowId] = name;
            me.beanNameId[name] = windowId;

            me.addBean(window);
          };

          //if contains window named specified name
          CWindowManager.prototype.containsWindowName = function (name) {
            var me = this;

            var windowId = me.beanNameId[name];

            if (windowId) {
              return true;
            }
            return false;
          };

          CWindowManager.prototype.getWindowByName = function (name) {
            var me = this;
            var windowId = me.beanNameId[name];

            if (windowId) {
              return me.getWindow(windowId);
            } else {
              return null;
            }
          };

          //Wrapping the 'mouseMove' method of the parent class
          CWindowManager.prototype.windowMouseMove = function (e) {
            var me = this;
            if (me.currentObject == null) {
              return null;
            }

            var childWindowMoved = false;

            //Loop processing of each CWindow held by CWindowManager
            var beanList = me.beanList;

            for (var windowId in beanList) {
              var targetWindow = beanList[windowId];

              //Since this 'mouseMove' is canvas of CWindow's 'mouseMove',so do move CBeanFrames in the canvas.
              var eventData = targetWindow.canvas.mouseMove(e);

              //Whether any one of the beans in the Canvas has moved or not.
              //Yes.(When it moves), eventData is set.
              //NO. If it does not move it is set to null.
              childWindowMoved = childWindowMoved | (eventData != null);
              if (eventData != null) {
                //If it is the marker for resizing
                if (eventData.targetTypeName == "cmarkerwindow") {
                  var targetObject = eventData.targetObject;

                  //Enable transparent window only when moving.
                  //This will work smoothly even with iframe content
                  targetWindow.transparence.style.pointerEvents = "auto";

                  if (targetObject.usage == "RD") {
                    targetWindow.resize(
                      0,
                      0,
                      eventData.deltaX,
                      eventData.deltaY,
                      true,
                    );
                  } else if (targetObject.usage == "DD") {
                    targetWindow.resize(0, 0, 0, eventData.deltaY, true);
                  } else if (targetObject.usage == "RR") {
                    targetWindow.resize(0, 0, eventData.deltaX, 0, true);
                  }
                }
              }
            }

            //If any one of the beans in the Canvas has moved.Do not do 'Cwindow's mouseMove'
            if (!childWindowMoved && this.mouseDownSource != "childcanvas") {
              //Moving logic for CWindow which is holded by CWindowManager as a child window.
              me.mouseMove(e);
            }
          };

          //Wrapping the method 'mouseUp' of the parent class
          CWindowManager.prototype.windowMouseUp = function (e) {
            var me = this;

            //run 'mouseUp' of parent class
            me.mouseUp(e);

            var beanList = me.beanList;

            for (var windowId in beanList) {
              var objWindow = beanList[windowId];

              //run CWindow's 'mouseUp'(it's child window).
              objWindow.mouseUp(e);
            }
          };

          /**
 * (override CCanvas.removeBean)
 * @param windowId
 */
          CWindowManager.prototype.removeBean = function (windowId) {
            var me = this;

            //Retrieve the target beanFrame
            var beanList = me.beanList;
            var targetBean = beanList[windowId];

            if (targetBean == null) {
              return;
            }

            var removeTargetBeanHasFocus = targetBean._hasFocus;

            //Remove bean's htmlElement from canvasElement
            me.canvasElement.removeChild(targetBean.htmlElement);

            //Delete the bean object in the associative array.
            delete beanList[windowId];

            var beanName = me.beanIdName[windowId];
            if (beanName) {
              //-if bean name exist
              delete me.beanIdName[windowId];
              delete me.beanNameId[beanName];
            }

            //focus on last focused window after removing
            var maxFocusTime = 0;
            var lastFocusedFrame = null;

            if (removeTargetBeanHasFocus) {
              for (var windowId in beanList) {
                var frame = beanList[windowId];

                //pullUpDisabled=true means that the frame is modal background window
                if (
                  maxFocusTime <= frame._hasFocusTime && !frame.pullUpDisabled
                ) {
                  maxFocusTime = frame._hasFocusTime;

                  lastFocusedFrame = frame;
                }
              }
              if (lastFocusedFrame) {
                lastFocusedFrame.requestFocus();
              }
            }

            targetBean.parentCanvas = null;
          };
          /**
 * end of CWindowManager class
 */

          //+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

          inherit(CMarkerWindow, CBeanFrame);

          /**
 * CMarkerWindow class
 * @param windowId
 * @param left
 * @param top
 * @param width
 * @param height
 * @param zindex
 * @param usage
 * @constructor
 */
          function CMarkerWindow(
            windowId,
            left,
            top,
            width,
            height,
            zindex,
            usage,
            color,
          ) {
            var me = this;

            CMarkerWindow.superConstructor.call(
              this,
              windowId,
              left,
              top,
              width,
              height,
              zindex,
              usage,
            );

            me.htmlElement.typeName = "cmarkerwindow";
            me.htmlElement.usage = usage;
            me.htmlElement.isRangeLimited = false;
            me.htmlElement.style.borderStyle = "none";
            me.htmlElement.style.zIndex = 1;
            if (color) {
              me.htmlElement.style.background = color;
            }
            //me.pullUpDisabled = true;

            me.getWindowType = function () {
              return "CMarkerWindow";
            };
          }

          /**
 * End of CMarkerWindow class
 * @constructor
 */

          //+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

          /**
 * FrameManager class
 * @constructor
 */
          function JSFrame(model) {
            var me = this;

            var parentElement = null;

            // Frames will be fixed(Frames keep staying in the same place) even if the user scrolls the browser.
            me.isWindowManagerFixed = true; //default is true.

            //Initialization parameter check

            if (model && model.fixed == false) {
              me.isWindowManagerFixed = false;
            }

            if (model && model.parentElement) {
              parentElement = model.parentElement;
            }

            me.hAlign = "left";
            me.vAlign = "top";

            if (model && model.horizontalAlign) {
              me.hAlign = model.horizontalAlign;
            }

            if (model && model.verticalAlign) {
              me.vAlign = model.verticalAlign;
            }

            me.pullToRefresh = false;
            if (model && typeof model.pullToRefresh === "boolean") {
              me.pullToRefresh = model.pullToRefresh;
            }

            me.touchActionManipulation = true;
            if (model && typeof model.touchActionManipulation === "boolean") {
              me.touchActionManipulation = model.touchActionManipulation;
            }

            if (!parentElement) {
              if (me.isWindowManagerFixed) {
                var topParentDiv = document.createElement("div");
                topParentDiv.id = "jsFrame_fixed_" + me.generateUUID();
                topParentDiv.setAttribute(
                  "style",
                  "position:fixed;" + me.hAlign + ":0px;" + me.vAlign +
                    ":0px;margin:0px;padding:0px;",
                );
                document.body.appendChild(topParentDiv);
                parentElement = topParentDiv;
              } else {
                var topParentDiv = document.createElement("div");
                topParentDiv.id = "jsFrame_absolute_" + me.generateUUID();
                topParentDiv.setAttribute(
                  "style",
                  "position:absolute;" + me.hAlign + ":0px;" + me.vAlign +
                    ":0px;margin:0px;padding:0px;",
                );
                document.body.appendChild(topParentDiv);
                parentElement = topParentDiv;
              }
            } else {
              if (me.isWindowManagerFixed) {
                //parentElement set
                var topParentDiv = document.createElement("div");
                topParentDiv.id = "jsFrame_fixed_" + me.generateUUID();
                topParentDiv.setAttribute(
                  "style",
                  "position:fixed;" + me.hAlign + ":0px;" + me.vAlign +
                    ":0px;margin:0px;padding:0px;",
                );
                parentElement.appendChild(topParentDiv);
              } else {
                var topParentDiv = document.createElement("div");
                topParentDiv.id = "jsFrame_absolute_" + me.generateUUID();
                topParentDiv.setAttribute(
                  "style",
                  "position:absolute;" + me.hAlign + ":0px;" + me.vAlign +
                    ":0px;margin:0px;padding:0px;",
                );
                parentElement.appendChild(topParentDiv);
              }
            }

            if (MOUSE_ENABLED) {
              document.addEventListener("mouseup", mouseUp);
              document.addEventListener("mousemove", mouseMove);
            }

            if (TOUCH_ENABLED) {
              if ("ontouchend" in window) {
                var funcOnTouchEnd = function (evt) {
                  // The "mouseup" event happens right after "touchend" event,
                  // but I don't call #preventdefault because #preventdefault prevents "onclick".
                  // So, perform #preventdefault only for "touchmove"
                  // evt.preventDefault();
                  mouseUp.bind(this)(evt);
                };
                document.addEventListener("touchend", funcOnTouchEnd);
              }

              if ("ontouchmove" in window) {
                // To remove the 300ms tap delay between touchend and click,
                // To disable double-tap to zoom
                if (me.touchActionManipulation) {
                  me.doEnableTouchActionManipulation();
                }

                if (!me.pullToRefresh) {
                  // The Android version of Chrome has a feature that refreshes the page by sliding downward
                  // while touching on the screen, but when this feature is enabled, the downward movement of the window is inhibited,
                  // so this feature can be explicitly turned off.
                  me.doDisablePullToRefresh();
                }

                var funcOnTouchMove = function (evt) {
                  // Call #preventDefault to prevent simultaneous ignition of mousemove
                  evt.preventDefault();
                  mouseMove.bind(this)(evt);
                };
                document.addEventListener("touchmove", funcOnTouchMove);
              }
            }

            me.windowManager = new CWindowManager(
              parentElement,
              "windowManager_" + me.generateUUID(),
              0,
              0,
              0,
              0,
            );
            //me.windowManager = new CWindowManager(document.body, 'windowManager_' + me.generateUUID(), 0, 0, 0, 0);
            me.domPartsBuilder = null;

            function mouseUp(e) {
              me.windowManager.windowMouseUp(e);
            }

            function mouseMove(e) {
              me.windowManager.windowMouseMove(e);
            }
          }

          JSFrame.prototype.doEnableTouchActionManipulation = function () {
            var bodyStyle = document.documentElement.getAttribute("style");
            if (!bodyStyle) {
              bodyStyle = "";
            } else {
              if (!bodyStyle.endsWith(";")) {
                bodyStyle += ";";
              }
            }
            if (bodyStyle.indexOf("touch-action") === -1) {
              bodyStyle +=
                "-ms-touch-action: manipulation;touch-action: manipulation;";
              document.documentElement.setAttribute("style", bodyStyle);
            }
          };

          JSFrame.prototype.doDisablePullToRefresh = function () {
            var bodyStyle = document.body.getAttribute("style");
            if (!bodyStyle) {
              bodyStyle = "";
            } else {
              if (!bodyStyle.endsWith(";")) {
                bodyStyle += ";";
              }
            }
            if (bodyStyle.indexOf("overscroll-behavior-y") === -1) {
              bodyStyle += "overscroll-behavior-y: contain;";
              document.body.setAttribute("style", bodyStyle);
            }
          };
          JSFrame.prototype.getDomPartsBuilder = function () {
            var me = this;

            if (!me.domPartsBuilder) {
              me.domPartsBuilder = new CDomPartsBuilder();
            }
            return me.domPartsBuilder;
          };

          JSFrame.prototype.create = function (model) {
            var me = this;

            var properties = {};
            properties.name = model.name;
            var title = model.title;
            var left = model.left;
            var top = model.top;
            var width = model.width;
            var height = model.height;
            var appearance = model.appearance;
            var presetWindowName = model.preset;
            var presetWindowParam = model.presetParam;
            var appearanceName = model.appearanceName;
            var appearanceParam = model.appearanceParam;
            var style = model.style;

            var minWidth = model.minWidth;
            var minHeight = model.minHeight;

            var html = model.html;
            var resizable = model.resizable;
            var movable = model.movable;
            var url = model.url;
            var urlLoaded = model.urlLoaded;

            var presetParam = model.presetParam;
            var presetWindow;

            if (presetWindowName) {
              var presetWindowObj = this.getPresetWindow(presetWindowName);
              presetWindow = presetWindowObj.getPresetWindow(presetParam);
              appearance = this.createPresetStyle(
                presetWindow.appearanceName,
                { appearanceParam: presetWindow.appearanceParam },
              );
            } else if (appearanceName) {
              appearance = this.createPresetStyle(
                appearanceName,
                { appearanceParam: appearanceParam },
              );
            }

            if (model.clientHeight) {
              var windowTitleBarHeight =
                parseInt(appearance.titleBarHeight || 0) -
                appearance.frameHeightAdjust;
              height = model.clientHeight + windowTitleBarHeight;
            }

            var frame = this.createFrame(
              left,
              top,
              width,
              height,
              appearance,
              properties,
            );

            if (title) {
              frame.setTitle(title);
            }

            if (html) {
              frame.setHTML(html);
            }
            if (url) {
              var urlPromise = frame.setUrl(url);
              if (urlLoaded) {
                urlPromise.then(urlLoaded);
              }
            }
            if (resizable == false) {
              frame.setResizable(false);
            }
            if (movable == false) {
              frame.setMovable(false);
            }

            if (minWidth && minHeight) {
              frame.minFrameWidth = minWidth;
            }
            if (minHeight) {
              frame.minWindowHeight = minHeight;

              if (model.clientHeight) {
                frame.minWindowHeight = minHeight + windowTitleBarHeight;
              }
            }

            if (style) {
              var frameView = frame.getFrameView();

              for (var name in style) {
                if (style.hasOwnProperty(name)) {
                  frameView.style[name] = style[name];
                }
              }
            }

            if (presetWindow) {
              presetWindow.setupPresetWindow(frame);
            }

            return frame;
          };

          /**
 * Create a new window
 *
 * @returns {CIfFrame}
 */
          JSFrame.prototype.createFrame = function (
            left,
            top,
            width,
            height,
            appearance,
            properties,
          ) {
            var me = this;

            if (!appearance) {
              appearance = me.createFrameAppearance();
            }

            appearance.initialize();

            var windowId = "window_" + me.generateUUID();

            if (!left) {
              left = 0;
            }
            if (!top) {
              top = 0;
            }
            if (!width) {
              width = 128;
            }
            if (!height) {
              height = 128;
            }

            var frame = new CIfFrame(
              windowId,
              left,
              top,
              width,
              height,
              appearance,
            );

            //experimental
            frame.jsFrame = me;

            if (properties && properties.name) {
              frame.setName(properties.name);
            }
            frame.hide();

            me.windowManager.addWindow(frame);

            // getTitleBarStyle is deprecated
            if (appearance.getTitleBarStyle) {
              var titleBarStyle = appearance.getTitleBarStyle();
              if (titleBarStyle) {
                frame.setTitleBarClassName(
                  titleBarStyle.titleBarClassNameDefault,
                  titleBarStyle.titleBarClassNameFocused,
                );
              }
            } else if (
              appearance.titleBarClassNameDefault &&
              appearance.titleBarClassNameFocused
            ) {
              frame.setTitleBarClassName(
                appearance.titleBarClassNameDefault,
                appearance.titleBarClassNameFocused,
              );
            } else if (appearance.titleBarClassNameDefault) {
              frame.setTitleBarClassName(
                appearance.titleBarClassNameDefault,
                appearance.titleBarClassNameDefault,
              );
            }

            return frame;
          };

          JSFrame.prototype.containsWindowName = function (windowName) {
            var me = this;
            return me.windowManager.containsWindowName(windowName);
          };

          JSFrame.prototype.getWindowByName = function (windowName) {
            var me = this;
            return me.windowManager.getWindowByName(windowName);
          };

          JSFrame.prototype.generateUUID = function () {
            var unixTime = Date.now();

            var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
              /[xy]/g,
              function (c) {
                var r = (unixTime + Math.random() * 16) % 16 | 0;
                unixTime = Math.floor(unixTime / 16);
                return (c == "x" ? r : (r & 0x3 | 0x8)).toString(16);
              },
            );
            return uuid;
          };

          JSFrame.prototype.createFrameAppearance = function () {
            return new CFrameAppearance();
          };

          JSFrame.prototype.createAnimator = function () {
            return new CSimpleLayoutAnimator();
          };

          /**
 * Helper class for maximizing and minimizing windows(frames) and handling animations accordingly
 */
          JSFrame.prototype.createWindowEventHelper = function (model) {
            var me = this;

            if (!model) {
              model = {};
            }

            model.verticalAlign = me.vAlign;
            model.horizontalAlign = me.hAlign;

            var wndEventHelper = new WindowEventHelper(model);
            return wndEventHelper;
          };

          JSFrame.prototype.getPresetWindow = function (presetName, param) {
            if (presetWindows[presetName]) {
              var presetObj = presetWindows[presetName];
              return presetObj;
            } else {
              return null;
            }
          };
          JSFrame.prototype.createPresetStyle = function (presetName, param) {
            var me = this;
            var apr = me.createFrameAppearance();
            if (param && param.focusedFrameOnly) {
              apr.focusedFrameOnly = param.focusedFrameOnly;
            }

            if (presetStyles[presetName]) {
              var styleObj = presetStyles[presetName];
              var appearanceParam = null;

              if (param && param.appearanceParam) {
                appearanceParam = param.appearanceParam;
              }

              return styleObj.getStyle(apr, appearanceParam);
            }

            console.error(
              '[JSFrame] Preset appearance "' + presetName + '" not found.',
            );
            return apr;
          };

          JSFrame.prototype.showToast = function (model) {
            if (!model) {
              return;
            }

            var me = this;
            var toastHeight = 60;
            var toastWidth = 260;
            var openCloseDurationMs = 300;
            var stayDurationMs = 1000;
            var startY = window.innerHeight - 10 - toastHeight / 2;
            var endY = window.innerHeight - 20 - toastHeight / 2;
            var myHtml = "";
            var showButton = false;
            var style = {
              borderRadius: "10px",
              background: "rgba(0,0,0,0.8)",
            };

            if (model.style) {
              style = model.style;
            }
            if (model.height) {
              toastHeight = model.height;
            }
            if (model.width) {
              toastWidth = model.width;
            }
            if (model.duration) {
              stayDurationMs = model.duration;
            }
            if (model.align) {
              if (model.align == "top") {
                startY = 10 + toastHeight / 2;
                endY = 20 + toastHeight / 2;
              } else if (model.align == "center") {
                startY = window.innerHeight / 2;
                endY = window.innerHeight / 2;
              } else {
                //bottom
              }
            }
            if (model.html) {
              myHtml = model.html;
            }
            if (model.text) {
              myHtml = model.text;
            }
            if (model.closeButton == true) {
              showButton = true;
            } else {
              showButton = false;
            }

            var apr = me.createPresetStyle("toast");

            if (style.borderRadius) {
              apr.frameBorderRadius = style.borderRadius;
            }

            if (model.closeButtonColor) {
              apr.captionClor = model.closeButtonColor;
            }

            var frame = me.create({
              name: "toast_" + me.generateUUID(),
              width: toastWidth,
              height: toastHeight,
              movable: false,
              resizable: false,
              appearance: apr,
              style: style,
              html:
                '<div id="my_element" style="box-sizing:border-box;display: flex;justify-content: center;align-items: center;padding:10px;font-size:16px;color:darkgray;height:' +
                (toastHeight) + 'px">' +
                myHtml +
                "</div>",
            });

            if (showButton) {
            } else {
              frame.hideFrameComponent("closeButton");
            }

            var requestFocusAfterAnimation = false;

            var startX = window.innerWidth / 2;

            if (me.hAlign == "right") {
              startX = -startX; // -500;
            }

            if (me.vAlign == "bottom") {
              startY = startY - window.innerHeight;
              endY = endY - window.innerHeight;
            }

            var animator = me.createAnimator();
            animator.set(frame)
              .setDuration(openCloseDurationMs)
              .fromPosition(startX, startY, "CENTER_CENTER")
              .toPosition(startX, endY, "CENTER_CENTER")
              .toAlpha(1.0)
              .fromAlpha(0.0)
              .start(0, requestFocusAfterAnimation)
              .then(function (animatorObj) {
                return animatorObj
                  .setDuration(openCloseDurationMs)
                  .fromPosition(startX, endY, "CENTER_CENTER")
                  .toPosition(startX, startY, "CENTER_CENTER")
                  .fromAlpha(1.0)
                  .toAlpha(0.5)
                  .start(stayDurationMs, requestFocusAfterAnimation);
              })
              .then(function (animatorObj) {
                var _frame = animatorObj.get();
                _frame.closeFrame();
              });
          };

          /**
 * end of FrameManager class
 */

          Object.freeze(DEF);

          module.exports = JSFrame;

          /***/
        }),

      /***/ "./src/appearance/CButtonAppearance.js":
        /*!*********************************************!*
  !*** ./src/appearance/CButtonAppearance.js ***!
  \*********************************************/
        /***/ ((module) => {
          function CTextButtonAppearance() {
            var crossMark0 = "\u274c";

            this.size = 14;
            this.width = null;
            this.height = null;

            //border
            this.borderRadius = 2;
            this.borderWidth = 0;
            this.borderColorDefault = "#aaaaaa";
            this.borderColorFocused = this.borderColorDefault;
            this.borderColorHovered = null;
            this.borderColorPressed = this.borderColorDefault;

            this.borderStyleDefault = "solid";
            this.borderStyleFocused = this.borderStyleDefault;
            this.borderStyleHovered = null;
            this.borderStylePressed = this.borderStyleDefault;

            this.backgroundBoxShadow = null;

            //background
            this.backgroundColorDefault = "transparent";
            this.backgroundColorFocused = this.backgroundColorDefault;
            this.backgroundColorHovered = null;
            this.backgroundColorPressed = this.backgroundColorDefault;

            //caption
            this.caption = null;
            this.captionColorDefault = "white";
            this.captionColorFocused = this.captionColorDefault;
            this.captionColorHovered = null;
            this.captionColorPressed = this.captionColorDefault;
            this.captionShiftYpx = 0;
            this.captionFontRatio = 1.0;
          }
          module.exports = CTextButtonAppearance;

          /***/
        }),

      /***/ "./src/appearance/CChildMenuAppearance.js":
        /*!************************************************!*
  !*** ./src/appearance/CChildMenuAppearance.js ***!
  \************************************************/
        /***/ ((module) => {
          function CChildMenuAppearance(model) {
            this.childMenuHTML = "";
            this.childMenuWidth = 0;
            this.childMenuAlign = "LEFT"; // off set position from parent frameComponent "LEFT" "RIGHT" "CENTER"
            this.yOffset = 0;
            this.xOffset = 0;
          }

          module.exports = CChildMenuAppearance;

          /***/
        }),

      /***/ "./src/appearance/CDomPartsBuilder.js":
        /*!********************************************!*
  !*** ./src/appearance/CDomPartsBuilder.js ***!
  \********************************************/
        /***/ ((module, __unused_webpack_exports, __webpack_require__) => {
          var mergeDeeply = __webpack_require__(
            /*! merge-deeply */ "./node_modules/merge-deeply/lib/merge-deeply.js",
          );
          var CTextButtonAppearance = __webpack_require__(
            /*! ./CButtonAppearance.js */ "./src/appearance/CButtonAppearance.js",
          );
          var CImageButtonAppearance = __webpack_require__(
            /*! ./CImageButtonAppearance.js */ "./src/appearance/CImageButtonAppearance.js",
          );
          var CChildMenuAppearance = __webpack_require__(
            /*! ./CChildMenuAppearance.js */ "./src/appearance/CChildMenuAppearance.js",
          );

          /**
 * CDomPartsBuilder class
 * Easy to build a beautiful or typical dom parts(htmlElement)
 * @constructor
 */
          function CDomPartsBuilder() {
          }

          CDomPartsBuilder.prototype.buildChildMenuAppearance = function (
            frameAppearance,
          ) {
            return new CChildMenuAppearance(frameAppearance);
          };
          CDomPartsBuilder.prototype.buildTextButtonAppearance = function (
            src,
          ) {
            if (src) {
              var result = mergeDeeply(
                { op: "clone", object1: src, concatArray: true },
              );
              return result;
            } else {
              return new CTextButtonAppearance();
            }
          };
          CDomPartsBuilder.prototype.buildImageButtonAppearance = function (
            src,
          ) {
            if (src) {
              var clonedImageButtonAppearance = mergeDeeply(
                { op: "clone", object1: src },
              );
              return clonedImageButtonAppearance;
            } else {
              return new CImageButtonAppearance();
            }
          };

          CDomPartsBuilder.prototype.buildButton = function (btnAppearance) {
            var me = this;
            return me.buildTextButton(btnAppearance);
          };

          CDomPartsBuilder.prototype.appendChildMenuTo = function (
            childMenuAppearance,
            parentEle,
          ) {
            var me = this;
            var ndiv = document.createElement("div");
            ndiv.classList.add("jsframe-child-menu");
            ndiv.innerHTML = childMenuAppearance.childMenuHTML;
            ndiv.style.position = "absolute";
            ndiv.style.pointerEvents = "none";
            ndiv.style.width = childMenuAppearance.childMenuWidth + "px";
            // ndiv.style.top = childMenuAppearance.childMenuTop + 'px';
            // ndiv.style.left = childMenuAppearance.childMenuLeft + 'px';
            ndiv.style.display = "none";

            var posX = childMenuAppearance.xOffset;
            var posY = parseInt(parentEle.style.height, 10) +
              childMenuAppearance.yOffset + 2;

            if (childMenuAppearance.childMenuAlign === "LEFT") {
              ndiv.style.left = posX + "px";
            } else if (childMenuAppearance.childMenuAlign === "RIGHT") {
              ndiv.style.right = posX + "px";
            } else if (childMenuAppearance.childMenuAlign === "CENTER") {
              posX = -childMenuAppearance.childMenuWidth / 2 +
                parseInt(parentEle.style.height, 10) / 2;
              ndiv.style.left = posX + "px";
            }
            ndiv.style.top = posY + "px";

            // ndiv.style.pointerEvents is none to avoid referring clicks to extra areas.
            // But we want its children to be responsive, so we set pointerEvents to auto
            ndiv.firstChild.style.pointerEvents = "auto";

            parentEle.appendChild(ndiv);
            //return ndiv;
          };

          /**
 * Creates an actual DOM element from the specified appearance
 * @param btnAppearance
 * @returns {HTMLDivElement}
 */
          CDomPartsBuilder.prototype.buildTextButton = function (
            btnAppearance,
          ) {
            var size = btnAppearance.size;
            var width = size;
            var height = size;

            if (btnAppearance.width != null) {
              width = btnAppearance.width;
            }

            if (btnAppearance.height != null) {
              height = btnAppearance.height;
            }

            var divElement = document.createElement("div");

            //border
            var borderWidth = btnAppearance.borderWidth;
            var borderRadius = btnAppearance.borderRadius;

            var borderColorDefault = btnAppearance.borderColorDefault;
            var borderColorFocused = btnAppearance.borderColorFocused;
            var borderColorHovered = btnAppearance.borderColorHovered;
            var borderColorPressed = btnAppearance.borderColorPressed;

            var borderStyleDefault = btnAppearance.borderStyleDefault;
            var borderStyleFocused = btnAppearance.borderStyleFocused;
            var borderStyleHovered = btnAppearance.borderStyleHovered;
            var borderStylePressed = btnAppearance.borderStylePressed;

            //background
            var backgroundColorDefault = btnAppearance.backgroundColorDefault;
            var backgroundColorFocused = btnAppearance.backgroundColorFocused;
            var backgroundColorHovered = btnAppearance.backgroundColorHovered;
            var backgroundColorPressed = btnAppearance.backgroundColorPressed;

            var backgroundBoxShadow = btnAppearance.backgroundBoxShadow;

            var fa = btnAppearance.fa;

            //caption
            var caption = btnAppearance.caption;
            var btnImageDefault = btnAppearance.imageDefault;
            var btnImageFocused = btnAppearance.imageFocused;
            var btnImageHovered = btnAppearance.imageHovered;
            var btnImagePressed = btnAppearance.imagePressed;

            //prevent to catch mouse events
            if (btnImageDefault) {
              btnImageDefault.style.pointerEvents = "none";
            }
            if (btnImageFocused) {
              btnImageFocused.style.pointerEvents = "none";
            }
            if (btnImageHovered) {
              btnImageHovered.style.pointerEvents = "none";
            }
            if (btnImagePressed) {
              btnImagePressed.style.pointerEvents = "none";
            }

            var _captionColorDefault = btnAppearance.captionColorDefault;
            var captionColorFocused = btnAppearance.captionColorFocused;
            var captionColorHovered = btnAppearance.captionColorHovered;
            var captionColorPressed = btnAppearance.captionColorPressed;

            var captionShiftYpx = btnAppearance.captionShiftYpx;
            var captionFontRatio = btnAppearance.captionFontRatio;

            //Set whether parent frame has focus or not internally
            divElement._hasFrameFocus = false;

            //Set whether mouse is pressing or not internally.
            divElement._isMouseDown = false;

            divElement.style.position = "absolute";

            divElement.style.top = "0px";
            divElement.style.left = "0px";
            divElement.style.width = (width) + "px";
            divElement.style.height = (height) + "px";

            if (btnAppearance.cursor) {
              divElement.style.cursor = btnAppearance.cursor;
            } else {
              divElement.style.cursor = "pointer";
            }
            divElement.style.margin = "0px";
            divElement.style.padding = "0px";
            //added for preventing bootstrap.css pollution
            divElement.style.boxSizing = "content-box";
            divElement.style.fontFamily = "sans-serif";

            divElement.onmousedown = function (e) {
              divElement._isMouseDown = true;
              divElement._handleFocusDrawing("onmousedown");
            };

            divElement.onmouseout = function (e) {
              divElement._isMouseDown = false;
              divElement._handleFocusDrawing("onmouseout");
            };

            divElement.onmouseover = function (e) {
              divElement._handleHoverDrawing();
            };

            divElement.onmouseup = function (e) {
              divElement._isMouseDown = false;
              divElement._handleFocusDrawing("onmouseup");
            };

            /**
   * The parent notifies that the parent's frame got focus
   */
            divElement._onTakeFocus = function () {
              divElement._hasFrameFocus = true;
              divElement._handleFocusDrawing("_onTakeFocus");
            };

            /**
   * The parent notifies that the parent's frame has lost focus
   */
            divElement._onReleaseFocus = function () {
              divElement._hasFrameFocus = false;
              divElement._handleFocusDrawing("_onReleaseFocus");
            };

            /**
   *  To handle 2x2 matrix.
   *  (_hasFrameFocus true/false x _isMouseDown true/false)
   */
            divElement._handleFocusDrawing = function (evtName) {
              if (divElement._hasFrameFocus) {
                //When this element has focus

                if (divElement._isMouseDown) {
                  //border
                  divElement.style.borderColor = borderColorPressed;
                  divElement.style.borderStyle = borderStylePressed;

                  //background
                  divElement.style.backgroundColor = backgroundColorPressed;

                  //caption
                  divElement.style.color = captionColorPressed;

                  if (btnImagePressed) {
                    // divElement.innerHTML = '';
                    // divElement.appendChild(btnImagePressed);
                    updateImage(btnImagePressed, divElement);
                  }
                } else {
                  //border
                  divElement.style.borderColor = borderColorFocused;
                  divElement.style.borderStyle = borderStyleFocused;

                  //background
                  divElement.style.backgroundColor = backgroundColorFocused;

                  //caption
                  divElement.style.color = captionColorFocused;

                  if (btnImageFocused) {
                    // divElement.innerHTML = '';
                    // divElement.appendChild(btnImageFocused);
                    updateImage(btnImageFocused, divElement);
                  }
                }
              } else {
                //When this element doesn't have focus
                if (divElement._isMouseDown) {
                  //border
                  divElement.style.borderColor = borderColorPressed;
                  divElement.style.borderStyle = borderStylePressed;

                  //background
                  divElement.style.backgroundColor = backgroundColorPressed;

                  //caption
                  divElement.style.color = captionColorPressed;

                  if (btnImagePressed) {
                    // divElement.innerHTML = '';
                    // divElement.appendChild(btnImagePressed);
                    updateImage(btnImagePressed, divElement);
                  }
                } else {
                  //border
                  divElement.style.borderColor = borderColorDefault;
                  divElement.style.borderStyle = borderStyleDefault;

                  //background
                  divElement.style.backgroundColor = backgroundColorDefault;

                  //caption
                  divElement.style.color = _captionColorDefault;

                  if (btnImageDefault) {
                    // divElement.innerHTML = '';
                    // divElement.appendChild(btnImageDefault);
                    updateImage(btnImageDefault, divElement);
                  }
                }
              }
            };

            divElement._handleHoverDrawing = function () {
              if (divElement._hasFrameFocus) {
                //When this element has focus
              } else {
                //When this element doesn't have focus
              }
              //border
              if (borderColorHovered) {
                divElement.style.borderColor = borderColorHovered;
              }
              if (borderStyleHovered) {
                divElement.style.borderStyle = borderStyleHovered;
              }

              //background
              if (backgroundColorHovered) {
                divElement.style.backgroundColor = backgroundColorHovered;
              }

              if (captionColorHovered) {
                //caption
                divElement.style.color = captionColorHovered;
              }
              if (btnImageHovered) {
                // divElement.innerHTML = '';
                // divElement.appendChild(btnImageHovered);
                updateImage(btnImageHovered, divElement);
              }
            };
            divElement.style.padding = "0px";

            divElement.style.textAlign = "center";
            divElement.style.fontSize = (height * captionFontRatio) + "px";

            divElement.style.lineHeight = (height) + "px";

            divElement.style.borderWidth = "1px";

            if (borderWidth != null) {
              divElement.style.borderWidth = borderWidth + "px";
            }

            if (backgroundBoxShadow != null) {
              divElement.style.boxShadow = backgroundBoxShadow;
            }

            divElement.style.borderRadius =
              (borderRadius + parseInt(divElement.style.borderWidth)) + "px";

            var childMode = true;

            if (childMode && btnImageDefault) {
              // divElement.innerHTML = '';
              // divElement.appendChild(btnImageDefault);
              updateImage(btnImageDefault, divElement);
            } else if (childMode && caption) {
              var span = document.createElement("span");
              //span.style.position='absolute';
              span.style.width = "100%";
              span.style.marginTop = captionShiftYpx + "px";
              span.style.display = "inline-block";
              span.style.textAlign = "center";
              span.style.fontFamily = "sans-serif";
              span.appendChild(document.createTextNode(caption));
              divElement.appendChild(span);
            } else if (childMode && fa) {
              var span = document.createElement("span");
              span.style.pointerEvents = "none";
              span.style.width = "100%";
              span.style.marginTop = captionShiftYpx + "px";
              span.style.display = "inline-block";
              span.style.textAlign = "center";
              span.style.fontFamily = "sans-serif";
              span.innerHTML = '<i class="' + fa + '"></i>';
              divElement.appendChild(span);
            } else if (!childMode && caption) {
              divElement.style.paddingTop = captionShiftYpx + "px";
              divElement.appendChild(document.createTextNode(caption));
            }

            divElement._handleFocusDrawing();
            return divElement;
          };

          // Don't use innerHTML='' because there may be a child below this 'img' element.
          // A child that may be a child is a childMenu.
          function updateImage(image, parentElement) {
            var imgs = parentElement.querySelectorAll("img");
            if (parentElement.firstChild) {
              parentElement.insertBefore(image, parentElement.firstChild);
            } else {
              parentElement.appendChild(image);
            }
            for (var i = 0; i < imgs.length; i++) {
              var img = imgs[i];
              if (image !== img) {
                parentElement.removeChild(img);
              }
            }
          }

          //+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

          /**
 * end of CDomPartsBuilder class
 */
          module.exports = CDomPartsBuilder;

          /***/
        }),

      /***/ "./src/appearance/CFrameAppearance.js":
        /*!********************************************!*
  !*** ./src/appearance/CFrameAppearance.js ***!
  \********************************************/
        /***/ ((module, __unused_webpack_exports, __webpack_require__) => {
          var CDomPartsBuilder = __webpack_require__(
            /*! ./CDomPartsBuilder.js */ "./src/appearance/CDomPartsBuilder.js",
          );
          var CFrameComponent = __webpack_require__(
            /*! ./CFrameComponent.js */ "./src/appearance/CFrameComponent.js",
          );

          /**
 * CFrameAppearance class<br>
 * Appearance Model Class for Frame
 *
 */
          function CFrameAppearance() {
            var me = this;

            this.showTitleBar = true;
            this.showCloseButton = true;
            this.titleBarCaption = "";
            this.titleBarCaptionFontSize = "12px";
            this.titleBarCaptionFontWeight = "bold";
            this.titleBarHeight = "24px";
            this.useIframe = false;
            this.useFrame = true;

            this.titleBarClassNameDefault = null;
            this.titleBarClassNameFocused = null;

            this.setUseIFrame = function (value) {
              me.useIframe = value;
              me.useFrame = !value;
              return me;
            };

            /**
   * The position from the left side of the caption. If this value is null, caption will be centered.
   */
            this.titleBarCaptionLeftMargin = "5px";

            this.titleBarColorDefault = null;
            this.titleBarColorFocused = null;
            this.titleBarCaptionColorDefault = "";
            this.titleBarCaptionColorFocused = "";
            this.titleBarCaptionTextShadow = "0 1px 0 rgba(255,255,255,.7)";
            this.titleBarCaptionTextAlign = "center";

            this.titleBarBorderBottomDefault = "1px solid rgba(0,0,0,0.2)";
            this.titleBarBorderBottomFocused = null;

            this.frameBorderRadius = "6px";

            this.frameBorderWidthDefault = "1px";
            this.frameBorderWidthFocused = this.frameBorderWidthDefault;

            this.frameBorderColorDefault = "rgba(1, 1, 1, 0.2)";
            this.frameBorderColorFocused = this.frameBorderColorDefault;

            this.frameBorderStyle = "solid";
            this.frameBoxShadow = "2px 3px 16px rgba(0,0,0,.6)";
            this.frameBackgroundColor = "transparent";

            this._partsBuilder = null;

            this.frameComponents = [];

            this.frameHeightAdjust = 1;

            this.resizeAreaWidth = 20;
            this.resizeAreaHeight = 20;
            this.resizeAreaOffset = 0;
            this.resizeAreaVisible = false;

            this.getFrameInnerBorderRadius = function (ref, hasFocus) {
              if (!ref) {
                return null;
              }
              if (hasFocus) {
                return {
                  frameAppearance: me,
                  innerBorderRadius: (parseInt(ref.frameBorderRadius, 10) -
                    parseInt(ref.frameBorderWidthFocused, 10)) + "px",
                };
              }
              return {
                frameAppearance: me,
                innerBorderRadius: (parseInt(ref.frameBorderRadius, 10) -
                  parseInt(ref.frameBorderWidthDefault, 10)) + "px",
              };
            };

            this.onInitialize = function () {
              //Add close button if needed
              if (me.showCloseButton) {
                var partsBuilder = me.getPartsBuilder(),
                  crossMark0 = "\u274c",
                  crossMark1 = "\u2716",
                  crossMark2 = "\u274e";

                var btnAppearance = partsBuilder.buildTextButtonAppearance();

                btnAppearance.size = 14;
                btnAppearance.captionShiftYpx = 0;
                btnAppearance.captionFontRatio = 1.0;
                btnAppearance.borderRadius = 2;
                btnAppearance.backgroundColorPressed = "transparent";
                btnAppearance.backgroundColorDefault = "transparent";
                btnAppearance.caption = crossMark1;

                btnAppearance.captionColorDefault = "gray";
                btnAppearance.captionColorFocused = "gray";
                btnAppearance.captionColorHovered = "silver";
                btnAppearance.captionColorPressed = "black";

                btnAppearance.borderWidth = 0;
                btnAppearance.borderColorDefault = "#aaaaaa";
                btnAppearance.borderStyle = "solid";

                var closeBtnEle = partsBuilder.buildTextButton(btnAppearance);
                var eleLeft = -10;
                var eleTop = -18;
                var eleAlign = "RIGHT_TOP";

                //closeButton is a special name
                var frameComponent = me.addFrameComponent(
                  "closeButton",
                  closeBtnEle,
                  eleLeft,
                  eleTop,
                  eleAlign,
                );
              }
            };

            this.onTitleBarStyleInitialize = function () {
            };
          }

          CFrameAppearance.prototype.getPartsBuilder = function () {
            var me = this;
            if (me._partsBuilder === null) {
              me._partsBuilder = new CDomPartsBuilder();
            }
            return me._partsBuilder;
          };
          CFrameAppearance.prototype.initialize = function () {
            var me = this;
            me.onInitialize();
          };

          /**
 *  Add FrameComponent into frame
 *  FrameComponent is attached to Frame and it moves with Frame.
 *
 * @param id
 * @param myDomElement DOM element.
 * @param x  Relative x coodinate from the snap position specified by alignment
 * @param y  Relative y coodinate from the snap position specified by alignment
 * @param align 'LEFT_TOP' 'CENTER_TOP' 'RIGHT_TOP' 'LEFT_CENTER' 'CENTER_CENTER' 'RIGHT_CENTER' 'LEFT_BOTTOM' 'CENTER_BOTTOM' 'RIGHT_BOTTOM'
 * @returns {CFrameComponent}
 *
 */
          CFrameAppearance.prototype.addFrameComponent = function (
            id,
            myDomElement,
            x,
            y,
            align,
            extra,
          ) {
            //(id, frame, htmlElement, x, y, align)
            var frameComponent = new CFrameComponent(
              id,
              myDomElement,
              x,
              y,
              align,
              extra,
            );

            if (myDomElement._onTakeFocus && myDomElement._onReleaseFocus) {
              //if this DOM element has special method for focus
              //set focus callback
              frameComponent.setFocusCallback(
                myDomElement._onTakeFocus,
                myDomElement._onReleaseFocus,
              );
            }

            this.frameComponents.push(frameComponent);

            return frameComponent;
          };

          //+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

          /**
 *  End of CFrameAppearance class
 */
          module.exports = CFrameAppearance;

          /***/
        }),

      /***/ "./src/appearance/CFrameComponent.js":
        /*!*******************************************!*
  !*** ./src/appearance/CFrameComponent.js ***!
  \*******************************************/
        /***/ ((module) => {
          /**
 * CFrameComponent class
 * <p>
 * Wrapped DOM element like 'div' to display above the frame<br>
 *
 * ex.An object such as closeButton
 *
 * @param id
 * @param frame
 * @param htmlElement DOM-element
 * @param x relative x-position in the frame respect to align
 * @param y relative y-position in the frame respect to align
 * @param align relative alignment in the frame
 * @constructor
 */
          function CFrameComponent(id, htmlElement, x, y, align, extra) {
            var me = this;

            me.id = id;
            me.x = x;
            me.y = y;
            me.frame = null;

            me._focusTakingCallabck = null;
            me._focusReleasingCallabck = null;

            if (align) {
              me.frameComponentAlign = align;
            } else {
              me.frameComponentAlign = CALIGN.LEFT_TOP;
            }
            me.htmlElement = htmlElement;
            me.htmlElement.style.zIndex = 50;
            me.htmlElement.setAttribute("component-id", id);

            if (extra && extra.childMenu) {
              me.childMenu = extra.childMenu;
            } else if (htmlElement.querySelector(".jsframe-child-menu")) {
              me.childMenu = htmlElement.querySelector(".jsframe-child-menu");
            }
          }

          CFrameComponent.prototype.setFocusCallback = function (
            focusTakingCallback,
            focusReleasingCallback,
          ) {
            var me = this;
            me._focusTakingCallabck = focusTakingCallback;
            me._focusReleasingCallabck = focusReleasingCallback;
          };

          /**
 * Set parent frame of this frameComponent
 * @param frame
 */
          CFrameComponent.prototype.setFrame = function (frame) {
            var me = this;

            me.frame = frame;
            me.htmlElement.parentObject = frame;
            me.updateAlign();
          };

          /**
 * Place the FrameComponent relative to the parent's frame.
 * Relocate relative to parent frame when window resize event occurs
 */
          CFrameComponent.prototype.updateAlign = function () {
            var me = this;

            var frameComponentAlign = me.frameComponentAlign;

            var frame = me.frame;
            var eleStyle = me.htmlElement.style;
            eleStyle.userSelect = "none";

            var x = me.x;
            var y = me.y;

            var frameWidth = frame.getWidth();
            var frameHeight = frame.getHeight();
            var eleStyleWidth = eleStyle.width;
            var eleStyleHeight = eleStyle.height;

            if (CALIGN.LEFT_TOP == frameComponentAlign) {
              eleStyle.left = x + "px";
              eleStyle.top = y + "px";
            } else if (CALIGN.HCENTER_TOP == frameComponentAlign) {
              eleStyle.left =
                (parseInt(frameWidth) / 2 - parseInt(eleStyleWidth) / 2 + x) +
                "px";
              eleStyle.top = y + "px";
            } else if (CALIGN.RIGHT_TOP == frameComponentAlign) {
              eleStyle.left =
                (parseInt(frameWidth) - parseInt(eleStyleWidth) + x) + "px";
              eleStyle.top = y + "px";
            } else if (CALIGN.LEFT_VCENTER == frameComponentAlign) {
              eleStyle.left = x + "px";
              eleStyle.top =
                (parseInt(frameHeight) / 2 - parseInt(eleStyleHeight) / 2 + y) +
                "px";
            } else if (CALIGN.HCENTER_VCENTER == frameComponentAlign) {
              eleStyle.left =
                (parseInt(frameWidth) / 2 - parseInt(eleStyleWidth) / 2 + x) +
                "px";
              eleStyle.top =
                (parseInt(frameHeight) / 2 - parseInt(eleStyleHeight) / 2 + y) +
                "px";
            } else if (CALIGN.RIGHT_VCENTER == frameComponentAlign) {
              eleStyle.left =
                (parseInt(frameWidth) - parseInt(eleStyleWidth) + x) + "px";
              eleStyle.top =
                (parseInt(frameHeight) / 2 - parseInt(eleStyleHeight) / 2 + y) +
                "px";
            } else if (CALIGN.LEFT_BOTTOM == frameComponentAlign) {
              eleStyle.left = x + "px";
              eleStyle.top =
                (parseInt(frameHeight) - parseInt(eleStyleHeight) + y) + "px";
            } else if (CALIGN.HCENTER_BOTTOM == frameComponentAlign) {
              eleStyle.left =
                (parseInt(frameWidth) / 2 - parseInt(eleStyleWidth) / 2 + x) +
                "px";
              eleStyle.top =
                (parseInt(frameHeight) - parseInt(eleStyleHeight) + y) + "px";
            } else if (CALIGN.RIGHT_BOTTOM == frameComponentAlign) {
              eleStyle.left =
                (parseInt(frameWidth) - parseInt(eleStyleWidth) + x) + "px";
              eleStyle.top =
                (parseInt(frameHeight) - parseInt(eleStyleHeight) + y) + "px";
            }
          };

          CFrameComponent.prototype.handleTakingFocus = function () {
            var me = this;
            if (me._focusTakingCallabck) {
              me._focusTakingCallabck();
            }
          };

          CFrameComponent.prototype.handleReleasingFocus = function () {
            var me = this;
            if (me._focusReleasingCallabck) {
              me._focusReleasingCallabck();
            }
          };

          /**
 * end of CFrameComponent class
 */

          module.exports = CFrameComponent;

          /***/
        }),

      /***/ "./src/appearance/CImageButtonAppearance.js":
        /*!**************************************************!*
  !*** ./src/appearance/CImageButtonAppearance.js ***!
  \**************************************************/
        /***/ ((module, __unused_webpack_exports, __webpack_require__) => {
          var inherit = __webpack_require__(
            /*! ../utils/Inherit.js */ "./src/utils/Inherit.js",
          );
          var CTextButtonAppearance = __webpack_require__(
            /*! ./CButtonAppearance.js */ "./src/appearance/CButtonAppearance.js",
          );

          inherit(CImageButtonAppearance, CTextButtonAppearance);

          function CImageButtonAppearance() {
            this.imageDefault = null;
            this.imageHovered = null;
            this.imagePressed = null;
            this.imageFocused = null;

            this.imageStore = {};
          }

          CImageButtonAppearance.prototype._setImage = function (
            src,
            width,
            height,
          ) {
            var me = this;

            var storedImgEle = me.imageStore[src];

            if (storedImgEle) {
              return storedImgEle;
            } else {
              var imgEle = document.createElement("img");
              imgEle.src = src;
              if (width && height) {
                var imgWidth = width;
                var imgHeight = height;
                var imgStyle = "margin:0px;padding:0px;width:" + imgWidth +
                  "px;height:" + imgHeight + "px";
                imgEle.setAttribute("style", imgStyle);
              }
              me.imageStore[src] = imgEle;

              return imgEle;
            }
          };
          CImageButtonAppearance.prototype.setSrc = function (model) {
            var me = this;
            if (model.default) {
              me.imageDefault = me._setImage(
                model.default,
                model.width,
                model.height,
              );
            }
            if (model.hovered) {
              me.imageHovered = me._setImage(
                model.hovered,
                model.width,
                model.height,
              );
            }
            if (model.pressed) {
              me.imagePressed = me._setImage(
                model.pressed,
                model.width,
                model.height,
              );
            }
            if (model.focused) {
              me.imageFocused = me._setImage(
                model.focused,
                model.width,
                model.height,
              );
            }
          };

          module.exports = CImageButtonAppearance;

          /***/
        }),

      /***/ "./src/index.js":
        /*!**********************!*
  !*** ./src/index.js ***!
  \**********************/
        /***/ ((module, __unused_webpack_exports, __webpack_require__) => {
          //export { default as JSFrame } from './JSFrame.js';
          module.exports = {
            JSFrame: __webpack_require__(/*! ./JSFrame */ "./src/JSFrame.js"),
          };

          /***/
        }),

      /***/ "./src/presets/appearance/PresetStyleMaterial.js":
        /*!*******************************************************!*
  !*** ./src/presets/appearance/PresetStyleMaterial.js ***!
  \*******************************************************/
        /***/ ((module, __unused_webpack_exports, __webpack_require__) => {
          __webpack_require__(
            /*! ./PresetStyleMaterial.css */ "./src/presets/appearance/PresetStyleMaterial.css",
          );
          var ObjectAssigner = __webpack_require__(
            /*! ../../utils/ObjectAssigner.js */ "./src/utils/ObjectAssigner.js",
          );

          function getStyle(fApr, userParam) {
            var srcParam = {
              border: {
                color: "transparent",
                width: 0,
                radius: 6,
              },
              control: {
                maximizeWithoutTitleBar: false,
                restoreKey: "Escape",
              },
              titleBar: {
                color: "white",
                background: "black",
                leftMargin: 20,
                height: 30,
                fontSize: 12,
                buttonWidth: 36,
                buttonHeight: 16,
                buttonColor: "white",
                buttons: [
                  {
                    fa: "fas fa-times",
                    name: "closeButton",
                    visible: true,
                  },
                  {
                    fa: "far fa-window-maximize",
                    name: "maximizeButton",
                    visible: true,
                  },
                  {
                    fa: "far fa-window-restore",
                    name: "restoreButton",
                    visible: false,
                  },
                  {
                    fa: "far fa-window-minimize",
                    name: "minimizeButton",
                    visible: true,
                  },
                  {
                    fa: "fas fa-caret-up",
                    name: "deminimizeButton",
                    visible: false,
                  },
                ],
                buttonsOnLeft: [],
              },
            };

            var param = srcParam;

            if (userParam) {
              //param=Object.assign({},srcParam, userParam);
              ObjectAssigner.objectAssign(srcParam, userParam);
            }

            fApr.showTitleBar = true;
            fApr.showCloseButton = true;

            fApr.titleBarCaptionFontSize = param.titleBar.fontSize + "px"; //'12px';
            fApr.titleBarCaptionFontWeight = "normal";
            fApr.titleBarCaptionLeftMargin = param.titleBar.leftMargin + "px";
            fApr.titleBarCaptionColorDefault = param.titleBar.color;
            fApr.titleBarCaptionColorFocused = param.titleBar.color;
            fApr.titleBarCaptionTextShadow = null;
            fApr.titleBarCaptionTextAlign = "left";

            fApr.titleBarHeight = param.titleBar.height + "px"; // '50px';

            fApr.titleBarColorDefault = param.titleBar.background;
            fApr.titleBarColorFocused = param.titleBar.background;

            fApr.titleBarBorderBottomDefault = "solid 0px #aaaaaa";
            fApr.titleBarBorderBottomFocused = "solid 0px #1883d7";

            fApr.frameBorderRadius = param.border.radius + "px"; // '6px';

            //border width
            fApr.frameBorderWidthDefault = param.border.width + "px";
            fApr.frameBorderWidthFocused = param.border.width + "px";

            //border color
            fApr.frameBorderColorDefault = param.border.color;
            fApr.frameBorderColorFocused = param.border.color;

            fApr.frameBorderStyle = "solid";

            //window shadow
            fApr.frameBoxShadow = param.border.shadow; //'2px 2px 10px  rgba(0, 0, 0, 0.5)';

            fApr.frameBackgroundColor = "transparent";

            fApr.frameComponents = new Array();

            fApr.frameHeightAdjust = 0; //default is 1

            fApr.getTitleBarStyle = function () {
              if (fApr.focusedFrameOnly) {
                return {
                  titleBarClassNameDefault: " ",
                  titleBarClassNameFocused: " ",
                };
              } else {
                return {
                  titleBarClassNameDefault: " ",
                  titleBarClassNameFocused: " ",
                };
              }
            };

            fApr.onInitialize = function () {
              alignButtons(fApr, param, false);
              alignButtons(fApr, param, true);
            };

            //

            return fApr;
          }

          function alignButtons(fApr, param, fromLeft) {
            var partsBuilder = fApr.getPartsBuilder();
            var rbtX = 0;
            var buttons;

            if (fromLeft) {
              buttons = param.titleBar.buttonsOnLeft;
            } else {
              buttons = param.titleBar.buttons;
            }

            for (var rbtIdx in buttons) {
              var rbtSrc = buttons[rbtIdx];

              var rbt = partsBuilder.buildTextButtonAppearance();

              //caption
              rbt.fa = rbtSrc.fa;

              rbt.width = param.titleBar.buttonWidth;
              rbt.height = param.titleBar.buttonHeight;

              rbt.borderRadius = 0;
              rbt.borderWidth = 0;

              rbt.borderColorDefault = "#c6c6c6";
              rbt.borderColorFocused = "#fc615c";
              rbt.borderColorHovered = rbt.borderColorFocused;
              rbt.borderColorPressed = "#e64842";

              rbt.borderStyleDefault = "solid";
              rbt.borderStyleFocused = rbt.borderStyleDefault;
              rbt.borderStyleHovered = rbt.borderStyleDefault;
              rbt.borderStylePressed = rbt.borderStyleDefault;

              //background
              rbt.backgroundColorDefault = "transparent";
              rbt.backgroundColorFocused = "transparent";
              rbt.backgroundColorHovered = "transparent";
              rbt.backgroundColorPressed = "transparent";

              var colors = getSubColor(param.titleBar.buttonColor);
              rbt.captionColorDefault = param.titleBar.buttonColor;
              rbt.captionColorFocused = param.titleBar.buttonColor;
              rbt.captionColorHovered = colors.hovered;
              rbt.captionColorPressed = colors.pressed;

              rbt.captionShiftYpx = 0;
              rbt.captionFontRatio = 1;

              var rbtEle = partsBuilder.buildTextButton(rbt);

              if (rbtSrc.visible) {
                rbtEle.style.display = "flex";
              } else {
                if (fromLeft) {
                  rbtX -= param.titleBar.buttonWidth;
                } else {
                  rbtX += param.titleBar.buttonWidth;
                }
                rbtEle.style.display = "none";
              }

              var titleBarHeight = parseInt(fApr.titleBarHeight);

              var rbtEleLeft = rbtX;

              //compute vertical center

              var rbtEleTop = -titleBarHeight +
                (titleBarHeight - rbt.height) / 2;

              var rbtEleAlign;
              if (fromLeft) {
                rbtEleAlign = "LEFT_TOP";
              } else {
                rbtEleAlign = "RIGHT_TOP";
              }

              var ndiv;
              if (rbtSrc.childMenuHTML) {
                ndiv = document.createElement("div");
                ndiv.id = rbtSrc.name + "_child_menu";

                ndiv.innerHTML = rbtSrc.childMenuHTML;
                ndiv.style.position = "absolute";
                ndiv.style.width =
                  (rbtSrc.childMenuWidth ? rbtSrc.childMenuWidth : 200) + "px";
                ndiv.style.top = (parseInt(rbtEle.style.top, 10) +
                  parseInt(rbtEle.style.height, 10) / 2 +
                  titleBarHeight / 2) + "px";
                ndiv.style.left = rbtEle.style.left;
                ndiv.style.display = "none";

                rbtEle.appendChild(ndiv);
              }

              fApr.addFrameComponent(
                rbtSrc.name,
                rbtEle,
                rbtEleLeft,
                rbtEleTop,
                rbtEleAlign,
                { childMenu: ndiv },
              );

              if (fromLeft) {
                rbtX += param.titleBar.buttonWidth;
              } else {
                rbtX += -param.titleBar.buttonWidth;
              }
            }
          }

          function getSubColor(color) {
            var canvas = document.createElement("canvas");
            canvas.height = 1;
            canvas.width = 1;
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 1, 1);
            var colorData = ctx.getImageData(0, 0, 1, 1).data;

            var r = colorData[0];
            var g = colorData[1];
            var b = colorData[2];
            var alpha = colorData[3] / 255;
            var alpha2 = alpha * 0.85;
            var alpha3 = alpha * 0.75;

            var ret = "rgb(" + r + "," + g + "," + b + "," + alpha2 + ")";
            var ret2 = "rgb(" + r + "," + g + "," + b + "," + alpha2 + ")";
            var ret3 = "rgb(" + r + "," + g + "," + b + "," + alpha3 + ")";
            return { src: ret, hovered: ret2, pressed: ret3 };
          }

          module.exports.getStyle = getStyle;

          /***/
        }),

      /***/ "./src/presets/appearance/PresetStylePopup.js":
        /*!****************************************************!*
  !*** ./src/presets/appearance/PresetStylePopup.js ***!
  \****************************************************/
        /***/ ((module, __unused_webpack_exports, __webpack_require__) => {
          __webpack_require__(
            /*! ./PresetStylePopup.css */ "./src/presets/appearance/PresetStylePopup.css",
          );

          function getStyle(fApr) {
            fApr.showTitleBar = false;
            fApr.showCloseButton = true;

            fApr.titleBarCaptionFontSize = "12px";
            fApr.titleBarCaptionFontWeight = "normal";
            fApr.titleBarCaptionLeftMargin = "10px";
            fApr.titleBarCaptionColorDefault = "#4d494d";
            fApr.titleBarCaptionColorFocused = "#4d494d";

            fApr.titleBarHeight = "5px";

            fApr.titleBarColorDefault = "white";
            fApr.titleBarColorFocused = "white";

            fApr.titleBarBorderBottomDefault = null;
            fApr.titleBarBorderBottomFocused = null;

            fApr.frameBorderRadius = "6px";

            //border width
            fApr.frameBorderWidthDefault = "1px";
            fApr.frameBorderWidthFocused = "1px";

            //border color
            fApr.frameBorderColorDefault = "#aaaaaa";
            fApr.frameBorderColorFocused = "#aaaaaa";

            fApr.frameBorderStyle = "solid";

            //window shadow
            fApr.frameBoxShadow = "2px 2px 5px  rgba(0, 0, 0, 0.5)";

            fApr.frameBackgroundColor = "white";

            fApr.frameComponents = new Array();

            //adjustment value
            fApr.frameHeightAdjust = 2; //default is 1
            fApr.getTitleBarStyle = function () {
              if (fApr.focusedFrameOnly) {
                return {
                  titleBarClassNameDefault:
                    "jsframe-preset-style-popup-focused",
                  titleBarClassNameFocused:
                    "jsframe-preset-style-popup-focused",
                };
              } else {
                return {
                  titleBarClassNameDefault:
                    "jsframe-preset-style-popup-default",
                  titleBarClassNameFocused:
                    "jsframe-preset-style-popup-focused",
                };
              }
            };
            fApr.onInitialize = function () {
              var partsBuilder = fApr.getPartsBuilder();

              //configure close button appearance[begin]//////////////

              var crossMark0 = "\u274c";
              var crossMark1 = "\u2716";
              var crossMark2 = "\u274e";
              var CROSS_MARK = crossMark1;

              var cbApr = partsBuilder.buildTextButtonAppearance();

              cbApr.width = 20;
              cbApr.height = 20;

              cbApr.borderRadius = 10;
              cbApr.borderWidth = 1;

              cbApr.borderColorDefault = "#cccccc";
              cbApr.borderColorFocused = "#cccccc";
              cbApr.borderColorHovered = "#dddddd";
              cbApr.borderColorPressed = "#eeeeee";

              cbApr.borderStyleDefault = "solid";
              cbApr.borderStyleFocused = cbApr.borderStyleDefault;
              cbApr.borderStyleHovered = cbApr.borderStyleDefault;
              cbApr.borderStylePressed = cbApr.borderStyleDefault;

              //background
              cbApr.backgroundColorDefault = "white";
              cbApr.backgroundColorFocused = "white";
              cbApr.backgroundColorHovered = "#eeeeee";
              cbApr.backgroundColorPressed = "#dddddd";

              cbApr.backgroundBoxShadow = "2px 2px 5px  rgba(0, 0, 0, 0.5)";

              //caption
              cbApr.caption = CROSS_MARK;

              cbApr.captionColorDefault = "black";
              cbApr.captionColorFocused = "black";
              cbApr.captionColorHovered = "white";
              cbApr.captionColorPressed = "white";

              cbApr.captionShiftYpx = 1;
              cbApr.captionFontRatio = 0.6;

              var closeBtnEle = partsBuilder.buildTextButton(cbApr);
              var eleLeft = 10;
              var eleTop = -6 - parseInt(fApr.titleBarHeight);
              var eleAlign = "RIGHT_TOP";

              // 'closeButton' is a special name
              fApr.addFrameComponent(
                "closeButton",
                closeBtnEle,
                eleLeft,
                eleTop,
                eleAlign,
              );

              //configure close button appearance[end]//////////////
            };
            //

            return fApr;
          }

          module.exports.getStyle = getStyle;

          /***/
        }),

      /***/ "./src/presets/appearance/PresetStyleRedstone.js":
        /*!*******************************************************!*
  !*** ./src/presets/appearance/PresetStyleRedstone.js ***!
  \*******************************************************/
        /***/ ((module, __unused_webpack_exports, __webpack_require__) => {
          __webpack_require__(
            /*! ./PresetStyleRedstone.css */ "./src/presets/appearance/PresetStyleRedstone.css",
          );

          function getStyle(fApr) {
            fApr.showTitleBar = true;
            fApr.showCloseButton = true;

            fApr.titleBarCaptionFontSize = "12px";
            fApr.titleBarCaptionFontWeight = "normal";
            fApr.titleBarCaptionLeftMargin = "10px";
            fApr.titleBarCaptionColorDefault = "#9b9a9b";
            fApr.titleBarCaptionColorFocused = "#4d494d";

            fApr.titleBarHeight = "30px";

            fApr.titleBarColorDefault = null;
            fApr.titleBarColorFocused = null;

            fApr.titleBarBorderBottomDefault = "solid 1px #aaaaaa";
            fApr.titleBarBorderBottomFocused = "solid 1px #1883d7";

            fApr.frameBorderRadius = "0px";

            //border width
            fApr.frameBorderWidthDefault = "1px";
            fApr.frameBorderWidthFocused = "1px";

            //border color
            fApr.frameBorderColorDefault = "#aaaaaa";
            fApr.frameBorderColorFocused = "#1883d7";

            fApr.frameBorderStyle = "solid";

            //window shadow
            fApr.frameBoxShadow = null;

            fApr.frameBackgroundColor = "transparent";

            fApr.frameComponents = new Array();

            //adjustment value
            fApr.frameHeightAdjust = 0; //default is 1

            fApr.getTitleBarStyle = function () {
              if (fApr.focusedFrameOnly) {
                return {
                  titleBarClassNameDefault:
                    "jsframe-preset-style-redstone-focused",
                  titleBarClassNameFocused:
                    "jsframe-preset-style-redstone-focused",
                };
              } else {
                return {
                  titleBarClassNameDefault:
                    "jsframe-preset-style-redstone-default",
                  titleBarClassNameFocused:
                    "jsframe-preset-style-redstone-focused",
                };
              }
            };

            fApr.onInitialize = function () {
              var partsBuilder = fApr.getPartsBuilder();

              {
                //configure close button appearance[begin]//////////////

                var CROSS_MARK = "\u2573";

                var cbApr = partsBuilder.buildTextButtonAppearance();

                cbApr.width = 45;
                cbApr.height = 28;

                cbApr.borderRadius = 0;
                cbApr.borderWidth = 0;

                cbApr.borderColorDefault = "#c6c6c6";
                cbApr.borderColorFocused = "#fc615c";
                cbApr.borderColorHovered = cbApr.borderColorFocused;
                cbApr.borderColorPressed = "#e64842";

                cbApr.borderStyleDefault = "solid";
                cbApr.borderStyleFocused = cbApr.borderStyleDefault;
                cbApr.borderStyleHovered = cbApr.borderStyleDefault;
                cbApr.borderStylePressed = cbApr.borderStyleDefault;

                //background
                cbApr.backgroundColorDefault = "white";
                cbApr.backgroundColorFocused = "white";
                cbApr.backgroundColorHovered = "#e81123";
                cbApr.backgroundColorPressed = "#f1707a";

                //caption
                cbApr.caption = CROSS_MARK;

                cbApr.captionColorDefault = "#9b9a9b";
                cbApr.captionColorFocused = "black";
                cbApr.captionColorHovered = "white";
                cbApr.captionColorPressed = "white";

                cbApr.captionShiftYpx = 1;
                cbApr.captionFontRatio = 0.6;

                var closeBtnEle = partsBuilder.buildTextButton(cbApr);
                var eleLeft = 0;
                var eleTop = -parseInt(fApr.titleBarHeight);
                var eleAlign = "RIGHT_TOP";

                // 'closeButton' is a special name
                fApr.addFrameComponent(
                  "closeButton",
                  closeBtnEle,
                  eleLeft,
                  eleTop,
                  eleAlign,
                );

                //configure close button appearance[end]//////////////
              }

              {
                //configure close button appearance[begin]//////////////

                var MAXIMIZE_MARK = "\u2610";

                var maxApr = partsBuilder.buildTextButtonAppearance();

                maxApr.width = 45;
                maxApr.height = 28;

                maxApr.borderRadius = 0;
                maxApr.borderWidth = 0;

                maxApr.borderColorDefault = "#c6c6c6";
                maxApr.borderColorFocused = "#fc615c";
                maxApr.borderColorHovered = maxApr.borderColorFocused;
                maxApr.borderColorPressed = "#e64842";

                maxApr.borderStyleDefault = "solid";
                maxApr.borderStyleFocused = maxApr.borderStyleDefault;
                maxApr.borderStyleHovered = maxApr.borderStyleDefault;
                maxApr.borderStylePressed = maxApr.borderStyleDefault;

                //background
                maxApr.backgroundColorDefault = "white";
                maxApr.backgroundColorFocused = "white";
                maxApr.backgroundColorHovered = "#e5e5e5";
                maxApr.backgroundColorPressed = "#cccccc";

                //caption
                maxApr.caption = MAXIMIZE_MARK;

                maxApr.captionColorDefault = "#9b9a9b";
                maxApr.captionColorFocused = "black";
                maxApr.captionColorHovered = "black";
                maxApr.captionColorPressed = "black";

                maxApr.captionShiftYpx = 1;
                maxApr.captionFontRatio = 0.55;

                var maxBtnEle = partsBuilder.buildTextButton(maxApr);
                var eleLeft = -46;
                var eleTop = -parseInt(fApr.titleBarHeight);
                var eleAlign = "RIGHT_TOP";

                // 'closeButton' is a special name
                fApr.addFrameComponent(
                  "maximizeButton",
                  maxBtnEle,
                  eleLeft,
                  eleTop,
                  eleAlign,
                );

                //configure close button appearance[end]//////////////
              }

              {
                //configure close button appearance[begin]//////////////

                var MINIMIZE_MARK = "\uff3f";

                var minApr = partsBuilder.buildTextButtonAppearance();

                minApr.width = 45;
                minApr.height = 28;

                minApr.borderRadius = 0;
                minApr.borderWidth = 0;

                minApr.borderColorDefault = "#c6c6c6";
                minApr.borderColorFocused = "#fc615c";
                minApr.borderColorHovered = minApr.borderColorFocused;
                minApr.borderColorPressed = "#e64842";

                minApr.borderStyleDefault = "solid";
                minApr.borderStyleFocused = minApr.borderStyleDefault;
                minApr.borderStyleHovered = minApr.borderStyleDefault;
                minApr.borderStylePressed = minApr.borderStyleDefault;

                //background
                minApr.backgroundColorDefault = "white";
                minApr.backgroundColorFocused = "white";
                minApr.backgroundColorHovered = "#e5e5e5";
                minApr.backgroundColorPressed = "#cccccc";

                //caption
                minApr.caption = MINIMIZE_MARK;

                minApr.captionColorDefault = "#9b9a9b";
                minApr.captionColorFocused = "black";
                minApr.captionColorHovered = "black";
                minApr.captionColorPressed = "black";

                minApr.captionShiftYpx = -2;
                minApr.captionFontRatio = 0.3;

                var minBtnEle = partsBuilder.buildTextButton(minApr);
                var eleLeft = -92;
                var eleTop = -parseInt(fApr.titleBarHeight);
                var eleAlign = "RIGHT_TOP";

                // 'closeButton' is a special name
                fApr.addFrameComponent(
                  "minimizeButton",
                  minBtnEle,
                  eleLeft,
                  eleTop,
                  eleAlign,
                );

                //configure close button appearance[end]//////////////
              }
              {
                //configure close button appearance[begin]//////////////

                var deminApr = partsBuilder.buildTextButtonAppearance();

                deminApr.width = 45;
                deminApr.height = 28;

                deminApr.borderRadius = 0;
                deminApr.borderWidth = 0;

                deminApr.borderColorDefault = "#c6c6c6";
                deminApr.borderColorFocused = "#fc615c";
                deminApr.borderColorHovered = deminApr.borderColorFocused;
                deminApr.borderColorPressed = "#e64842";

                deminApr.borderStyleDefault = "solid";
                deminApr.borderStyleFocused = deminApr.borderStyleDefault;
                deminApr.borderStyleHovered = deminApr.borderStyleDefault;
                deminApr.borderStylePressed = deminApr.borderStyleDefault;

                //background
                deminApr.backgroundColorDefault = "white";
                deminApr.backgroundColorFocused = "white";
                deminApr.backgroundColorHovered = "#e5e5e5";
                deminApr.backgroundColorPressed = "#cccccc";

                //caption
                deminApr.caption = "\u25A3";

                deminApr.captionColorDefault = "#9b9a9b";
                deminApr.captionColorFocused = "black";
                deminApr.captionColorHovered = "black";
                deminApr.captionColorPressed = "black";

                deminApr.captionShiftYpx = 1;
                deminApr.captionFontRatio = 0.6;

                var deminBtnEle = partsBuilder.buildTextButton(deminApr);
                var eleLeft = -92;
                var eleTop = -parseInt(fApr.titleBarHeight);
                var eleAlign = "RIGHT_TOP";

                deminBtnEle.style.display = "none";

                // 'closeButton' is a special name
                fApr.addFrameComponent(
                  "deminimizeButton",
                  deminBtnEle,
                  eleLeft,
                  eleTop,
                  eleAlign,
                );

                //configure close button appearance[end]//////////////
              }
              {
                //configure close button appearance[begin]//////////////

                var RESTORE_MARK = "\u274F";

                var rbApr = partsBuilder.buildTextButtonAppearance();

                rbApr.width = 45;
                rbApr.height = 28;

                rbApr.borderRadius = 0;
                rbApr.borderWidth = 0;

                rbApr.borderColorDefault = "#c6c6c6";
                rbApr.borderColorFocused = "#fc615c";
                rbApr.borderColorHovered = rbApr.borderColorFocused;
                rbApr.borderColorPressed = "#e64842";

                rbApr.borderStyleDefault = "solid";
                rbApr.borderStyleFocused = rbApr.borderStyleDefault;
                rbApr.borderStyleHovered = rbApr.borderStyleDefault;
                rbApr.borderStylePressed = rbApr.borderStyleDefault;

                //background
                rbApr.backgroundColorDefault = "white";
                rbApr.backgroundColorFocused = "white";
                rbApr.backgroundColorHovered = "#e5e5e5";
                rbApr.backgroundColorPressed = "#cccccc";

                //caption
                rbApr.caption = RESTORE_MARK;

                rbApr.captionColorDefault = "#9b9a9b";
                rbApr.captionColorFocused = "black";
                rbApr.captionColorHovered = "black";
                rbApr.captionColorPressed = "black";

                rbApr.captionShiftYpx = 1;
                rbApr.captionFontRatio = 0.55;

                var restoreBtnEle = partsBuilder.buildTextButton(rbApr);
                var eleLeft = -46;
                var eleTop = -parseInt(fApr.titleBarHeight);
                var eleAlign = "RIGHT_TOP";

                restoreBtnEle.style.display = "none";

                // 'closeButton' is a special name
                fApr.addFrameComponent(
                  "restoreButton",
                  restoreBtnEle,
                  eleLeft,
                  eleTop,
                  eleAlign,
                );

                //configure close button appearance[end]//////////////
              }
            };
            //

            return fApr;
          }

          module.exports.getStyle = getStyle;

          /***/
        }),

      /***/ "./src/presets/appearance/PresetStyleToast.js":
        /*!****************************************************!*
  !*** ./src/presets/appearance/PresetStyleToast.js ***!
  \****************************************************/
        /***/ ((module) => {
          function getStyle(fApr) {
            fApr.showTitleBar = false;
            fApr.showCloseButton = true;

            fApr.titleBarCaptionFontSize = "0px";
            fApr.titleBarCaptionFontWeight = "normal";
            fApr.titleBarCaptionLeftMargin = "0px";
            fApr.titleBarCaptionColorDefault = "transparent";
            fApr.titleBarCaptionColorFocused = "transparent";

            fApr.titleBarHeight = "0px";

            fApr.titleBarColorDefault = "transparent";
            fApr.titleBarColorFocused = "transparent";

            fApr.titleBarBorderBottomDefault = null;
            fApr.titleBarBorderBottomFocused = null;

            fApr.frameBorderRadius = "10px";

            //border width
            fApr.frameBorderWidthDefault = "0px";
            fApr.frameBorderWidthFocused = "0px";

            //border color
            fApr.frameBorderColorDefault = "transparent";
            fApr.frameBorderColorFocused = "transparent";
            fApr.frameBorderStyle = "solid";
            fApr.frameBoxShadow = "2px 2px 15px  rgba(0, 0, 0, 0.5)";
            fApr.frameBackgroundColor = "transparent";

            fApr.frameComponents = [];
            fApr.frameHeightAdjust = 1; //default is 1

            fApr.captionClor = "darkgray";

            fApr.pullUpDisabled = false;

            fApr.getTitleBarStyle = function () {
              if (fApr.focusedFrameOnly) {
                return {
                  titleBarClassNameDefault: " ",
                  titleBarClassNameFocused: " ",
                };
              } else {
                return {
                  titleBarClassNameDefault: " ",
                  titleBarClassNameFocused: " ",
                };
              }
            };

            fApr.onInitialize = function () {
              var partsBuilder = fApr.getPartsBuilder();

              //configure close button appearance[begin]//////////////

              var crossMark0 = "\u274c";
              var crossMark1 = "\u2716";
              var crossMark2 = "\u274e";
              var CROSS_MARK = crossMark1;

              var cbApr = partsBuilder.buildTextButtonAppearance();

              cbApr.width = 20;
              cbApr.height = 20;

              cbApr.borderRadius = 10;
              cbApr.borderWidth = 0;

              cbApr.borderColorDefault = "#cccccc";
              cbApr.borderColorFocused = "#cccccc";
              cbApr.borderColorHovered = "#dddddd";
              cbApr.borderColorPressed = "#eeeeee";

              cbApr.borderStyleDefault = "solid";
              cbApr.borderStyleFocused = cbApr.borderStyleDefault;
              cbApr.borderStyleHovered = cbApr.borderStyleDefault;
              cbApr.borderStylePressed = cbApr.borderStyleDefault;

              //background
              cbApr.backgroundColorDefault = "transparent";
              cbApr.backgroundColorFocused = "transparent";
              cbApr.backgroundColorHovered = "transparent";
              cbApr.backgroundColorPressed = "transparent";

              cbApr.backgroundBoxShadow = null; // '2px 2px 5px  rgba(0, 0, 0, 0.5)';

              //caption
              cbApr.caption = CROSS_MARK;

              cbApr.captionColorDefault = fApr.captionClor;
              cbApr.captionColorFocused = fApr.captionClor;
              cbApr.captionColorHovered = fApr.captionClor;
              cbApr.captionColorPressed = fApr.captionClor;

              cbApr.captionShiftYpx = 1;
              cbApr.captionFontRatio = 0.6;

              var closeBtnEle = partsBuilder.buildTextButton(cbApr);
              var eleLeft = -6;
              var eleTop = 3;
              var eleAlign = "RIGHT_TOP";

              // 'closeButton' is a special name
              fApr.addFrameComponent(
                "closeButton",
                closeBtnEle,
                eleLeft,
                eleTop,
                eleAlign,
              );

              //configure close button appearance[end]//////////////
            };
            //

            return fApr;
          }

          module.exports.getStyle = getStyle;

          /***/
        }),

      /***/ "./src/presets/appearance/PresetStyleYosemite.js":
        /*!*******************************************************!*
  !*** ./src/presets/appearance/PresetStyleYosemite.js ***!
  \*******************************************************/
        /***/ ((module, __unused_webpack_exports, __webpack_require__) => {
          __webpack_require__(
            /*! ./PresetStyleYosemite.css */ "./src/presets/appearance/PresetStyleYosemite.css",
          );
          var ObjectAssigner = __webpack_require__(
            /*! ../../utils/ObjectAssigner.js */ "./src/utils/ObjectAssigner.js",
          );

          function getStyle(fApr, userParam) {
            var srcParam = {
              titleBar: {
                greenButton: "maximize", //'maximize' or 'fullscreen'
              },
            };

            var param = srcParam;

            if (userParam) {
              //param=Object.assign({},srcParam, userParam);
              ObjectAssigner.objectAssign(srcParam, userParam);
            }

            fApr.showTitleBar = true;
            fApr.showCloseButton = true;

            fApr.titleBarCaptionFontSize = "11px";
            fApr.titleBarCaptionFontWeight = "normal";
            fApr.titleBarCaptionLeftMargin = null;
            fApr.titleBarCaptionColorDefault = "#4d494d";
            fApr.titleBarCaptionColorFocused = "#4d494d";

            fApr.titleBarHeight = "26px";

            fApr.titleBarColorDefault = null;
            fApr.titleBarColorFocused = null;

            fApr.titleBarBorderBottomDefault = "1px solid #b1aeb1";
            fApr.titleBarBorderBottomFocused = fApr.titleBarBorderBottomDefault;

            fApr.frameBorderRadius = "6px";

            //border width
            fApr.frameBorderWidthDefault = "1px";
            fApr.frameBorderWidthFocused = "1px";

            //border color
            fApr.frameBorderColorDefault = "#acacac";
            fApr.frameBorderColorFocused = "#acacac";

            fApr.frameBorderStyle = "solid";

            //window shadow
            fApr.frameBoxShadow = "0px 0px 20px rgba(0, 0, 0, 0.3)";

            fApr.frameBackgroundColor = "transparent";

            fApr.frameComponents = new Array();

            fApr.getTitleBarStyle = function () {
              if (fApr.focusedFrameOnly) {
                return {
                  titleBarClassNameDefault:
                    "jsframe-preset-style-yosemite-focused",
                  titleBarClassNameFocused:
                    "jsframe-preset-style-yosemite-focused",
                };
              } else {
                return {
                  titleBarClassNameDefault:
                    "jsframe-preset-style-yosemite-default",
                  titleBarClassNameFocused:
                    "jsframe-preset-style-yosemite-focused",
                };
              }
            };

            fApr.onInitialize = function () {
              var partsBuilder = fApr.getPartsBuilder();

              var img_data_close_hovered =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAWElEQVQoU2NkIBIwEqmOAa6wgZWlH6Sp4fefQjCNxkdRyMjAUPCf4f8CkEJGBsaE/wwME2AaUaxuYGWeD1IAUgjS0PD7byLMaaQrBLmJKKuJ9gyhYCI6HAGlFDALf9s7eQAAAABJRU5ErkJggg==";
              var img_data_maximize_hovered =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAVElEQVQoU2NkIBIwoqvjixFoAIl9WvIBTMMAhkLeGP79IMnPSz46kq8QZN1/hv/2IBMYGRgMQPR/BoYLED7jQZAzwFYTrRDZLdRxI7KJRAcPrvAHAATYKgvLH0fAAAAAAElFTkSuQmCC";
              if (param.titleBar.greenButton === "fullscreen") {
                img_data_maximize_hovered =
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAZElEQVQoU2NkIBIwEqmOAUWhQIKAwL8///czMDAYwAz4tOQjWA1cIUjRhwUfPqArxlDIF8N/nomF0RFdMTaF/xkYGC6gK/605KMhitV8MfwghSCAohhkAy6FKIphniIvePCFKQDzGzsLS+7n2AAAAABJRU5ErkJggg==";
              }
              var img_data_demaximize_hovered =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAiUlEQVQoU2NkwAIEogQMPiz7cAFZihGbQt4Y/v0MjIwLPy/+sAAmj1MhIwODw39GxkSYYrwKQabBFGNVyBfL1///P6MBzFrmf4yFjCCH/2X63w93C+P/C58WfypEdzvYRN5YgQTG///ng61iYDjweclHR6wKkRUTVAhTzPD/fzxeE2FWYQtskBwAKwQ7tVjAL4MAAAAASUVORK5CYII=";
              var img_data_minimize_hovered =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAMUlEQVQoU2NkIBIwEqmOgUYKa7w4Ghj+M9hjdQYjw8GWbT8awFYTrZAYD9HIM8RYDQBsEAwLkq4IAgAAAABJRU5ErkJggg==";
              var img_data_1dot_transparent =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABBJREFUeNpi+P//PwNAgAEACPwC/tuiTRYAAAAASUVORK5CYII=";
              var img_width = 10;
              var img_height = 10;
              var img_style = "margin:0px;padding:0px;width:" + img_width +
                "px;height:" + img_height + "px";

              var imageMaximize = document.createElement("img");
              imageMaximize.src = img_data_maximize_hovered;
              imageMaximize.setAttribute("style", img_style);

              var imageDemaximize = document.createElement("img");
              imageDemaximize.src = img_data_demaximize_hovered;
              imageDemaximize.setAttribute("style", img_style);

              // var imageFullScreen = document.createElement('img');
              // imageFullScreen.src = img_data_maximize_hovered;
              // imageFullScreen.setAttribute('style', img_style);

              var imageMinimize = document.createElement("img");
              imageMinimize.src = img_data_minimize_hovered;
              imageMinimize.setAttribute("style", img_style);

              var imageClose = document.createElement("img");
              imageClose.src = img_data_close_hovered;
              imageClose.setAttribute("style", img_style);

              var imgTransparent = document.createElement("img");
              imgTransparent.src = img_data_1dot_transparent;
              imgTransparent.setAttribute(
                "style",
                "margin:0px;padding:0px;width:6px;height:6px",
              );

              {
                //configure close button appearance[begin]//////////////

                var cbApr = partsBuilder.buildImageButtonAppearance();
                cbApr.imageDefault = imgTransparent;
                cbApr.imageHovered = imageClose;
                cbApr.imagePressed = imageClose;
                cbApr.imageFocused = imgTransparent;
                cbApr.size = 10;

                cbApr.borderRadius = 5;
                cbApr.borderWidth = 1;

                cbApr.borderColorDefault = "#c6c6c6";
                cbApr.borderColorFocused = "#d3524e";
                cbApr.borderColorHovered = cbApr.borderColorFocused;
                cbApr.borderColorPressed = "#e64842";

                cbApr.borderStyleDefault = "solid";
                cbApr.borderStyleFocused = cbApr.borderStyleDefault;
                cbApr.borderStyleHovered = cbApr.borderStyleDefault;
                cbApr.borderStylePressed = cbApr.borderStyleDefault;

                //background
                cbApr.backgroundColorDefault = "#d0d0d0";
                cbApr.backgroundColorFocused = "#fc615c";
                cbApr.backgroundColorHovered = cbApr.backgroundColorFocused;
                cbApr.backgroundColorPressed = cbApr.backgroundColorDefault;
                cbApr.setSrc({
                  default: img_data_1dot_transparent,
                  focused: img_data_1dot_transparent,
                  hovered: img_data_close_hovered,
                  pressed: img_data_close_hovered,
                });

                var closeBtnEle = partsBuilder.buildButton(cbApr);
                var eleLeft = 8;
                var eleTop = -19;
                var eleAlign = "LEFT_TOP";

                // 'closeButton' is a special name
                fApr.addFrameComponent(
                  param.closeButtonName || "closeButton",
                  closeBtnEle,
                  eleLeft,
                  eleTop,
                  eleAlign,
                );

                //prepare [minimize button]
                var minBtnApr = partsBuilder.buildImageButtonAppearance(cbApr);
                minBtnApr.borderColorDefault = "#c6c6c6";
                minBtnApr.borderColorFocused = "#e6b347";
                minBtnApr.borderColorHovered = minBtnApr.borderColorFocused;
                minBtnApr.borderColorPressed = "#e1a12d";
                minBtnApr.backgroundColorDefault = "#d0d0d0";
                minBtnApr.backgroundColorFocused = "#fdbe40";
                minBtnApr.backgroundColorHovered =
                  minBtnApr.backgroundColorFocused;
                minBtnApr.backgroundColorPressed =
                  minBtnApr.backgroundColorDefault;
                minBtnApr.imageDefault = imgTransparent;
                minBtnApr.imageHovered = imageMinimize;
                minBtnApr.imagePressed = imageMinimize;
                minBtnApr.imageFocused = imgTransparent;

                var minBtnEle = partsBuilder.buildButton(minBtnApr);
                var deminimizeBtnEle = partsBuilder.buildButton(minBtnApr);
                deminimizeBtnEle.style.display = "none";
                var eleLeft = 28;
                var eleTop = -19;
                var eleAlign = "LEFT_TOP";
                fApr.addFrameComponent(
                  "minimizeButton",
                  minBtnEle,
                  eleLeft,
                  eleTop,
                  eleAlign,
                );
                fApr.addFrameComponent(
                  "deminimizeButton",
                  deminimizeBtnEle,
                  eleLeft,
                  eleTop,
                  eleAlign,
                );

                // prepare [maximize button]
                //configure zoom button appearance[begin]//////////////
                var maxBtnApr = partsBuilder.buildImageButtonAppearance(cbApr);
                maxBtnApr.borderColorDefault = "#c6c6c6";
                maxBtnApr.borderColorFocused = "#67b657";
                maxBtnApr.borderColorHovered = maxBtnApr.borderColorFocused;
                maxBtnApr.borderColorPressed = "#00af38";
                maxBtnApr.backgroundColorDefault = "#d0d0d0";
                maxBtnApr.backgroundColorFocused = "#34ca49";
                maxBtnApr.backgroundColorHovered =
                  maxBtnApr.backgroundColorFocused;
                maxBtnApr.backgroundColorPressed =
                  maxBtnApr.backgroundColorDefault;
                maxBtnApr.imageDefault = imgTransparent;
                maxBtnApr.imageHovered = imageMaximize;
                maxBtnApr.imagePressed = imageMaximize;
                maxBtnApr.imageFocused = imgTransparent;

                var zoomBtnEle = partsBuilder.buildButton(maxBtnApr);

                var demaxBtnApr = partsBuilder.buildImageButtonAppearance(
                  cbApr,
                );
                demaxBtnApr.borderColorDefault = "#c6c6c6";
                demaxBtnApr.borderColorFocused = "#67b657";
                demaxBtnApr.borderColorHovered = demaxBtnApr.borderColorFocused;
                demaxBtnApr.borderColorPressed = "#00af38";
                demaxBtnApr.backgroundColorDefault = "#d0d0d0";
                demaxBtnApr.backgroundColorFocused = "#34ca49";
                demaxBtnApr.backgroundColorHovered =
                  demaxBtnApr.backgroundColorFocused;
                demaxBtnApr.backgroundColorPressed =
                  demaxBtnApr.backgroundColorDefault;
                demaxBtnApr.imageDefault = imgTransparent;
                demaxBtnApr.imageHovered = imageDemaximize;
                demaxBtnApr.imagePressed = imageDemaximize;
                demaxBtnApr.imageFocused = imgTransparent;
                var demaxBtnEle = partsBuilder.buildButton(demaxBtnApr);
                demaxBtnEle.style.display = "none";

                var eleLeft = 48;
                var eleTop = -19;
                var eleAlign = "LEFT_TOP";

                fApr.addFrameComponent(
                  "dezoomButton",
                  demaxBtnEle,
                  eleLeft,
                  eleTop,
                  eleAlign,
                );
                fApr.addFrameComponent(
                  "zoomButton",
                  zoomBtnEle,
                  eleLeft,
                  eleTop,
                  eleAlign,
                );

                //configure zoom button appearance[end]//////////////
              }
              //
            };
            //

            return fApr;
          }

          module.exports.getStyle = getStyle;

          /***/
        }),

      /***/ "./src/presets/window/PresetWindowYosemite.js":
        /*!****************************************************!*
  !*** ./src/presets/window/PresetWindowYosemite.js ***!
  \****************************************************/
        /***/ ((module, __unused_webpack_exports, __webpack_require__) => {
          var mergeDeeply = __webpack_require__(
            /*! merge-deeply */ "./node_modules/merge-deeply/lib/merge-deeply.js",
          );

          function getPreset(param) {
            var result = {};
            result.appearanceName = "yosemite";
            result.appearanceParam = {};

            var presetParam = {};

            if (param) {
              presetParam = param;
            }

            var isFullScreen =
              presetParam.maximizeButtonBehavior === "fullscreen";
            var minimizeButton =
              presetParam.minimizeButtonBehavior === "minimize"
                ? "minimizeButton" : null;
            var hideButton1 = presetParam.minimizeButtonBehavior === "hide"
              ? "minimizeButton" : null;
            var hideButton2 = presetParam.closeButtonBehavior === "hide"
              ? "custom-close-button"
              : null;
            var windowControlParam = presetParam.control;

            var closeButtonNameByCloseButtonBehavior = hideButton2;
            var closeButtonName = presetParam.closeButtonName;

            if (isFullScreen) {
              result.appearanceParam.titleBar = {
                greenButton: "fullscreen", //'maximize' icon or 'fullscreen' icon
              };
            }
            // Set this to 'closeButton' to automatically close when clicking
            result.appearanceParam.closeButtonName =
              closeButtonNameByCloseButtonBehavior || closeButtonName ||
              "closeButton";

            result.setupPresetWindow = function (frame) {
              var defaultWindowControlParam = {
                maximizeButton: "zoomButton",
                maximizeParam: {
                  fullScreen: isFullScreen, // true:maximized without title bar,false:maximized with title bar
                  restoreKey: "Escape", //Set key code from https://www.w3.org/TR/uievents-code/#keyboard-key-codes
                },

                demaximizeButton: "dezoomButton",
                deminimizeButton: "deminimizeButton",
                minimizeButton: minimizeButton,
                hideButtons: [hideButton1, hideButton2],
                hideParam: {
                  align: "CENTER_CENTER", //ABSOLUTE:If you want the window to disappear after transitioning to the position you specified

                  duration: 300,
                },
                dehideParam: {
                  duration: 300,
                },
                styleDisplay: "inline",
                animation: true,
                animationDuration: 100, //The whole animation duration(millisec)
              };

              if (windowControlParam) {
                mergeDeeply(
                  {
                    op: "overwrite-merge",
                    object1: defaultWindowControlParam,
                    object2: windowControlParam,
                  },
                );
              }

              frame.setControl(defaultWindowControlParam);
            };
            return result;
          }

          module.exports.getPresetWindow = getPreset;

          /***/
        }),

      /***/ "./src/utils/CSimpleLayoutAnimator.js":
        /*!********************************************!*
  !*** ./src/utils/CSimpleLayoutAnimator.js ***!
  \********************************************/
        /***/ ((module, __unused_webpack_exports, __webpack_require__) => {
          var CTimer = __webpack_require__(
            /*! ./CTimer.js */ "./src/utils/CTimer.js",
          );

          /**
 * CSimpleLayoutAnimator class
 * Class for moving animation · scaling animation of frame.
 * <p>
 * @constructor
 */
          function CSimpleLayoutAnimator() {
            this.fps = 30;
            this.durationMillis = 200;
            this.targetFrame = null;

            this._crrAlpha = 1.0;
            this._toAlpha = 1.0;

            //current width/height
            this._crrWidth = 0;
            this._crrHeight = 0;
            this._toWidth = 0;
            this._toHeight = 0;

            //current position(x,y)
            //this._crrX = 0;
            //this._crrY = 0;
            this._toX = 0;
            this._toY = 0;

            this.pinnedAnimationEnabled = false;
            this._pinX = 0;
            this._pinY = 0;
            this._pinAnchor = null;
          }

          /**
 * Set CIFrame object to be resized
 * @param ciframe
 * @returns {*}
 */
          CSimpleLayoutAnimator.prototype.set = function (ciframe) {
            var me = this;
            me.targetFrame = ciframe;

            me.fromWidth(ciframe.getWidth());
            me.fromHeight(ciframe.getHeight());

            me.toWidth(ciframe.getWidth());
            me.toHeight(ciframe.getHeight());

            var crrPos = ciframe.getPosition();

            me.fromPosition(crrPos.x, crrPos.y, crrPos.anchor);

            return me;
          };

          /**
 * Get CIFrame object
 * @returns {*}
 */
          CSimpleLayoutAnimator.prototype.get = function () {
            var me = this;
            return me.targetFrame;
          };

          /**
 * Set animation duration time millis
 * @param durationMillis
 * @returns {*}
 */
          CSimpleLayoutAnimator.prototype.setDuration = function (
            durationMillis,
          ) {
            var me = this;

            me.durationMillis = durationMillis;
            return me;
          };

          /**
 * Set expected FPS
 * @param fps
 * @returns {*}
 */
          CSimpleLayoutAnimator.prototype.setFPS = function (fps) {
            var me = this;
            me.fps = fps;
            return me;
          };

          /**
 * Set PIN position
 * @param x
 * @param y
 * @param anchor Position where animation starts from.Expected parameters as follows.
 'LEFT_TOP':Default.Specify the position starting from the upper left.
 'CENTER_TOP'
 'RIGHT_TOP'
 'LEFT_CENTER'
 'CENTER_CENTER'
 'RIGHT_CENTER'
 'LEFT_BOTTOM'
 'CENTER_BOTTOM'
 'RIGHT_BOTTOM'
 * @returns {*}
 */
          CSimpleLayoutAnimator.prototype.fromPosition = function (
            x,
            y,
            anchor,
          ) {
            var me = this;
            me.pinnedAnimationEnabled = true;

            me._pinX = x;
            me._pinY = y;

            me.toPosition(x, y);

            if (anchor) {
              me._pinAnchor = anchor;
            }
            return me;
          };
          /**
 * Set resizeFrom width
 * @param fromWidth
 * @returns {*}
 */
          CSimpleLayoutAnimator.prototype.fromWidth = function (fromWidth) {
            var me = this;
            me._crrWidth = fromWidth;

            return me;
          };

          /**
 * Set resizeFrom height
 * @param fromHeight
 * @returns {*}
 */
          CSimpleLayoutAnimator.prototype.fromHeight = function (fromHeight) {
            var me = this;
            me._crrHeight = fromHeight;

            return me;
          };

          /**
 * Set resizeTo width
 * @param toWidth
 * @returns {*}
 */
          CSimpleLayoutAnimator.prototype.toWidth = function (toWidth) {
            var me = this;
            me._toWidth = toWidth;

            return me;
          };

          /**
 * Set resizeTo height
 * @param toHeight
 * @returns {*}
 */
          CSimpleLayoutAnimator.prototype.toHeight = function (toHeight) {
            var me = this;
            me._toHeight = toHeight;
            return me;
          };

          /**
 * Set from alpha
 * @param fromAlpha
 * @returns {*}
 */
          CSimpleLayoutAnimator.prototype.fromAlpha = function (fromAlpha) {
            var me = this;
            me._crrAlpha = fromAlpha;

            return me;
          };

          /**
 * Set to alpha
 * @param toAlpha
 * @returns {*}
 */
          CSimpleLayoutAnimator.prototype.toAlpha = function (toAlpha) {
            var me = this;
            me._toAlpha = toAlpha;

            return me;
          };

          /**
 * Get CIFrame object
 * @returns {*}
 */
          CSimpleLayoutAnimator.prototype.ease = function (ease) {
            var me = this;
            me._ease = ease;
            return me;
          };

          /**
 * Set move to position
 * @param x
 * @param y
 * @returns {*}
 */
          CSimpleLayoutAnimator.prototype.toPosition = function (x, y) {
            var me = this;
            me._toX = x;
            me._toY = y;
            return me;
          };

          /**
 * Set move to x
 * @param x
 * @returns {*}
 */
          CSimpleLayoutAnimator.prototype.toX = function (x) {
            var me = this;
            me._toX = x;
            return me;
          };

          /**
 * Set move to y
 * @param t
 * @returns {*}
 */
          CSimpleLayoutAnimator.prototype.toY = function (t) {
            var me = this;
            me._toY = t;
            return me;
          };

          CSimpleLayoutAnimator.prototype.start = function (
            waitMillis,
            requestFocusEnabled,
          ) {
            var me = this;

            var fromWidth = me._crrWidth;
            var fromHeight = me._crrHeight;

            var fromX = me._pinX;
            var fromY = me._pinY;

            var fromAlpha = me._crrAlpha;

            return new Promise(function (resolve, reject) {
              var numOfSteps = parseInt(me.fps * (me.durationMillis / 1000));
              if (numOfSteps == 0) {
                numOfSteps = 1;
              }

              var deltaWidth = (me._toWidth - fromWidth) / numOfSteps;
              var deltaHeight = (me._toHeight - fromHeight) / numOfSteps;

              var deltaX = (me._toX - fromX) / numOfSteps;
              var deltaY = (me._toY - fromY) / numOfSteps;

              var deltaAlpha = (me._toAlpha - fromAlpha) / numOfSteps;
              if (me._ease) {
                deltaAlpha = deltaAlpha / 1.24;
              }

              var unitMillis = me.durationMillis / numOfSteps;

              var idx = 0;

              function loop() {
                var timer = new CTimer();

                timer.setIntervalMillis(unitMillis);

                timer.setCallback(function (timer) {
                  if (idx == numOfSteps) {
                    var _width = me._toWidth;
                    var _height = me._toHeight;

                    var _x = fromX + deltaX * idx;
                    var _y = fromY + deltaY * idx;

                    var _alpha = me._toAlpha;

                    if (me.pinnedAnimationEnabled) {
                      //me.targetFrame._setPositionInternally(me._pinX, me._pinY, me._pinAnchor, _width, _height);

                      me.targetFrame._setPositionInternally(
                        _x,
                        _y,
                        me._pinAnchor,
                        _width,
                        _height,
                      );
                    }

                    if (me.targetFrame.htmlElement.style) {
                      me.targetFrame.htmlElement.style.opacity = _alpha;
                    }

                    //me.targetFrame.resizeDirect(_width, _height,false);
                    me.targetFrame.setSize(_width, _height, true);

                    me._crrWidth = _width;
                    me._crrHeight = _height;

                    me._pinX = _x;
                    me._pinY = _y;
                  }

                  if (idx == (numOfSteps + 1)) {
                    //Stop timer after last draw update.
                    timer.stopTimer();

                    if (me.targetFrame.htmlElement.style) {
                      me.targetFrame.htmlElement.style.opacity = me._toAlpha;
                    }
                    resolve(me);
                    return;
                  }

                  var _width = fromWidth + deltaWidth * idx;
                  var _height = fromHeight + deltaHeight * idx;

                  var _x = fromX + deltaX * idx;
                  var _y = fromY + deltaY * idx;

                  var _alpha = fromAlpha + deltaAlpha * idx;

                  if (me.pinnedAnimationEnabled) {
                    //me.targetFrame._setPositionInternally(me._pinX, me._pinY, me._pinAnchor, _width, _height);
                    me.targetFrame._setPositionInternally(
                      _x,
                      _y,
                      me._pinAnchor,
                      _width,
                      _height,
                    );
                  }

                  if (me.targetFrame.htmlElement.style) {
                    me.targetFrame.htmlElement.style.opacity = _alpha;
                  }

                  //me.targetFrame.resizeDirect(_width, _height,false);
                  me.targetFrame.setSize(_width, _height, true);

                  if (idx == 0) {
                    //check window existence
                    var wmgr = me.targetFrame.parentCanvas;
                    if (wmgr) {
                      var _targetFrame = wmgr.getWindow(me.targetFrame.id);
                      if (_targetFrame) {
                        me.targetFrame.show(
                          { requestFocus: requestFocusEnabled },
                        );
                      } else {
                        //the target window must be deleted.
                      }
                    }
                  }

                  idx++;
                });

                timer.startTimer();
              }

              if (waitMillis) {
                var waiter = new CTimer();
                waiter.setIntervalMillis(waitMillis);
                waiter.setCallback(function (_timer) {
                  _timer.stopTimer();

                  loop();
                });
                waiter.startTimer();
              } else {
                loop();
              }
            });
          }; //start

          /**
 * end of CSimpleLayoutAnimator class
 */
          //+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

          module.exports = CSimpleLayoutAnimator;

          /***/
        }),

      /***/ "./src/utils/CTimer.js":
        /*!*****************************!*
  !*** ./src/utils/CTimer.js ***!
  \*****************************/
        /***/ ((module) => {
          /**
 * CTimer class<br>
 *
 * How to use:
 *  var timer = new CTimer();
 *    var value = 0;
 *
 *    timer.setCallback(function (timerObj) {
 *        value++;
 *        console.log(value);
 *        if (value == 100) {
 *            timerObj.stopTimer();
 *        }
 *    });
 *    timer.setIntervalMillis(100);
 *    timer.startTimer();
 *
 * @author Tom Misawa (riversun.org@gmail.com)
 */
          var CTimer = (function () {
            function CTimer() {
              var me = this;

              me._timerId = null;
              me._isRunning = false;
              me._timerInterval = 0;

              me._internalCallback = _internalCallback;
              me._timerMethod = null;

              function _internalCallback() {
                if (me._timerMethod) {
                  me._timerMethod(me);
                }
                if (me._isRunning) {
                  clearTimeout(me._timerId);
                  me._timerId = setTimeout(
                    me._internalCallback,
                    me._timerInterval,
                  );
                }
              }
            }

            CTimer.prototype.setCallback = function (callback_func) {
              var me = this;
              me._timerMethod = callback_func;
              return me;
            };

            CTimer.prototype.setIntervalMillis = function (interval) {
              var me = this;
              me._timerInterval = interval;
              return me;
            };

            CTimer.prototype.stopTimer = function () {
              var me = this;
              me._isRunning = false;
              return me;
            };

            CTimer.prototype.startTimer = function () {
              var me = this;
              if (me._timerInterval > 0) {
                me._timerId = setTimeout(
                  me._internalCallback,
                  me._timerInterval,
                );
                me._isRunning = true;
              }
              return me;
            };

            return CTimer;
          })();
          /**
 * end of CTimer class
 */
          //+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
          module.exports = CTimer;

          /***/
        }),

      /***/ "./src/utils/Inherit.js":
        /*!******************************!*
  !*** ./src/utils/Inherit.js ***!
  \******************************/
        /***/ ((module) => {
          /**
 * Inheritance function
 *
 * @param subClass
 * @param baseClass
 */
          function inherit(subClass, baseClass) {
            function clazz() {
            }

            clazz.prototype = baseClass.prototype;
            subClass.prototype = new clazz();

            subClass.prototype.constructor = subClass;
            subClass.superConstructor = baseClass;
            subClass.superClass = baseClass.prototype;
          }

          /**
 * End of inheritance function
 */

          //+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

          module.exports = inherit;

          /***/
        }),

      /***/ "./src/utils/ObjectAssigner.js":
        /*!*************************************!*
  !*** ./src/utils/ObjectAssigner.js ***!
  \*************************************/
        /***/ ((module) => {
          var _typeof =
            typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
              ? function (obj) {
                return typeof obj;
              }
              : function (obj) {
                return obj &&
                    typeof Symbol === "function" &&
                    obj.constructor === Symbol &&
                    obj !== Symbol.prototype
                  ? "symbol"
                  : typeof obj;
              };

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

          function isObject(item) {
            return (
              item &&
              (typeof item === "undefined" ? "undefined" : _typeof(item)) ===
                "object" &&
              !Array.isArray(item)
            );
          }

          function objectAssign(target) {
            for (
              var _len = arguments.length,
                sources = Array(_len > 1 ? _len - 1 : 0),
                _key = 1;
              _key < _len;
              _key++
            ) {
              sources[_key - 1] = arguments[_key];
            }

            if (!sources.length) return target;
            var source = sources.shift();

            if (isObject(target) && isObject(source)) {
              for (var key in source) {
                if (isObject(source[key])) {
                  if (!target[key]) {
                    Object.assign(target, _defineProperty({}, key, {}));
                  }
                  objectAssign(target[key], source[key]);
                } else {
                  Object.assign(target, _defineProperty({}, key, source[key]));
                }
              }
            }
            return objectAssign.apply(undefined, [target].concat(sources));
          }

          module.exports.objectAssign = objectAssign;

          /***/
        }),

      /***/ "./src/utils/WindowEventHelper.js":
        /*!****************************************!*
  !*** ./src/utils/WindowEventHelper.js ***!
  \****************************************/
        /***/ ((module, __unused_webpack_exports, __webpack_require__) => {
          "use strict";

          var CSimpleLayoutAnimator = __webpack_require__(
            /*! ./CSimpleLayoutAnimator.js */ "./src/utils/CSimpleLayoutAnimator.js",
          );
          var CALIGN = __webpack_require__(
            /*! ../CCommon.js */ "./src/CCommon.js",
          );
          var mergeDeeply = __webpack_require__(
            /*! merge-deeply */ "./node_modules/merge-deeply/lib/merge-deeply.js",
          );
          var EventListenerHelper = __webpack_require__(
            /*! event-listener-helper */ "./node_modules/event-listener-helper/lib/event-listener-helper.js",
          );

          function WindowEventHelper(model) {
            this.eventListenerHelper = new EventListenerHelper();
            this.windowMode = "default";
            this.styleDisplay = "flex";
            this.horizontalAlign = "left";
            this.verticalAlign = "top";

            this.keyListener = null;

            this.minimizeButton = null;
            this.maximizeButton = null;
            this.demaximizeButton = null;
            this.deminimizeButton = null;

            this.opts = model;

            this.isWindowManagerFixed =
              model.frame.jsFrame.isWindowManagerFixed;

            if (model.styleDisplay) {
              this.styleDisplay = model.styleDisplay;
            }
            if (model.minimizeButton) {
              this.minimizeButton = model.minimizeButton;
            }
            if (model.deminimizeButton) {
              this.deminimizeButton = model.deminimizeButton;
            }
            if (model.maximizeButton) {
              this.maximizeButton = model.maximizeButton;
            }
            if (model.demaximizeButton) {
              this.demaximizeButton = model.demaximizeButton;
            }

            if (model.hideButton) {
              this.hideButton = model.hideButton;
            }
            if (model.hideButtons) {
              this.hideButtons = model.hideButtons;
            }

            this.maximizeParam = model.maximizeParam;
            this.demaximizeParam = model.demaximizeParam;
            this.minimizeParam = model.minimizeParam;
            this.deminimizeParam = model.deminimizeParam;
            this.hideParam = model.hideParam;
            this.dehideParam = model.dehideParam;

            if (model.horizontalAlign) {
              this.horizontalAlign = model.horizontalAlign;
            }
            if (model.verticalAlign) {
              this.verticalAlign = model.verticalAlign;
            }

            this.animationEnabled = false;
            this.animationDuration = 100;
            this.frame = model.frame;
            this.hideFrameBorder = true;
            this.hideTitleBar = true;

            this.restoreKey = null;
            this.restoreDuration = null;
            this.restoreCallback = null;

            this.statsStore = {};

            if (model.animation) {
              this.animationEnabled = model.animation;
            }
            if (model.animationDuration) {
              this.animationDuration = model.animationDuration;
            }
            this.eventListeners = {};

            //If the user changes the window size when the window is maximized state,
            // adjust the size so that window looks maximized.
            this.resizeListener = this.handleOnResize.bind(this);

            if (this.maximizeParam && this.maximizeParam.matchParent) {
              this.resizeListener = this.handleOnVirtualResize.bind(this);
            }
          }

          WindowEventHelper.MATCH_PARENT_CHANGE_MARKER_ATTR =
            "__jsframe-mp-marker";

          WindowEventHelper.prototype.on = function (eventType, callback) {
            var me = this;
            me.eventListeners[eventType] = callback;
          };

          //---------------------------------------------------------------------------------------------------------------------
          WindowEventHelper.prototype.doMaximize = function (model) {
            var me = this;

            if (me.windowMode === "hid") {
              throw Error(
                "[JSrame] It is not possible to change directly from the hid state to the maximized state",
              );
              return;
            }

            if (
              me.windowMode === "maximized" || me.windowMode === "maximizing"
            ) {
              // If it's already 'maximized' status, it doesn't do anything.
              return;
            }

            me.windowMode = "maximizing";

            var frame = me.frame;

            if (model && model.matchParent) {
              // The div element does not issue the resize event. Furthermore,
              // div is specified as 100%, so style.width is always 100%.
              // So I want to get the clientWidth but I can't get it with mutationObserver.
              // Therefore, we adopt a mechanism to catch the parent window
              // resize event and change the attribute of the parent window content
              // by differentiation to catch it.
              var windowManager = frame.getWindowManager();
              var parentElement = windowManager.getParentElement();

              if (!me.matchParentResizeObserver) {
                var matchParentResizeObserver = new MutationObserver(
                  function () {
                    // console.log("on virtual resize");
                    me.resizeListener();
                  },
                );
                matchParentResizeObserver.observe(parentElement, {
                  attributeFilter: [
                    WindowEventHelper.MATCH_PARENT_CHANGE_MARKER_ATTR,
                  ],
                  attributes: true,
                });
                me.matchParentResizeObserver = matchParentResizeObserver;
              }
            } //set onresize listener
            //window.addEventListener('resize', me.resizeListener);
            else if (
              !me.eventListenerHelper.hasEventListener(
                window,
                "resize",
                "window-resize-listener",
              )
            ) {
              me.eventListenerHelper.addEventListener(
                window,
                "resize",
                me.resizeListener,
                { listenerName: "window-resize-listener" },
              );
            }

            //Remember the status of the window before maximizing the window size
            me.saveCurrentWindowStats("maximize_mode");

            me.hideTitleBar = model ? model.fullScreen : false;

            if (me.hideTitleBar) {
              //Hide only the currently visible FrameComponent
              //ウィンドウのモードを変更する前の今の状態で可視状態にあるフレームコンポーネント（閉じるボタン類）を不可視にする
              //(タイトルバー非表示の場合には最大化するときのアニメーションでフレームコンポーネントを見せないようにする)
              frame.hideAllVisibleFrameComponents();

              //またhideAllVisibleFrameComponentを実施するときに、個別のhideFrameComponentやshowFrameComponentを実行すると
              //管理ステートが破綻するため、タイトルバー非表示の場合はどうせ操作できないということもあり
              //hideFrameComponent や showFrameComponentは実行しない
            } else {
              //Process required for maximization
              if (me.maximizeButton) {
                frame.hideFrameComponent(me.maximizeButton);
              }
              if (me.demaximizeButton) {
                frame.showFrameComponent(me.demaximizeButton, me.styleDisplay);
              }
            }

            frame.setMovable(false);
            frame.setResizable(false);

            if (model && model.restoreKey) {
              me.restoreKey = model.restoreKey;
            }
            if (model && model.restoreDuration) {
              me.restoreDuration = model.restoreDuration;
            }
            if (model && model.restoreCallback) {
              me.restoreCallback = model.restoreCallback;
            }
            //Render maximization itself
            me.renderMaximizedMode({
              animation: me.animationEnabled,
              callback: (model && model.callback) ? model.callback : null, //set maximized finished callback
              duration: (model && model.duration) ? model.duration : null,
              matchParent: (model && model.matchParent)
                ? model.matchParent
                : false,
            });
          };

          /**
 * Render window as a maximized mode( full screen )
 */
          WindowEventHelper.prototype.renderMaximizedMode = function (model) {
            var me = this;
            var frame = me.frame;
            var from = me.loadWindowStats("maximize_mode");

            var _toX = 0;
            var _toY = 0;
            var _toWidth = 0;
            var _toHeight = 0;

            //compute position and size[begin]
            if (me.hideTitleBar) {
              _toX = 0;
              _toY = -from.titleBarHeight;
            }

            var parentWidth = window.innerWidth;
            var parentHeight = window.innerHeight;

            if (model.matchParent) {
              // If matchParent is specified
              // When maximizing, use the size of parentElement specified at initialization
              // ParentlElement is often used only for adjusting the display order.
              // Therefore, only if matchParent is specified, match the size of parentElement
              var windowManager = frame.getWindowManager();
              var parentElement = windowManager.getParentElement();
              parentWidth = parentElement.clientWidth;
              parentHeight = parentElement.clientHeight;
            }

            if (me.hideFrameBorder) {
              _toWidth = parentWidth;
              _toHeight = parentHeight +
                (me.hideTitleBar ? from.titleBarHeight : 0);
            } else {
              _toWidth = parentWidth - from.frameBorderWidthDefault * 2;
              _toHeight = parentHeight - from.frameBorderWidthDefault * 2 +
                (me.hideTitleBar ? from.titleBarHeight : 0);
            }
            //compute position and size[end]

            if (me.horizontalAlign == "right") {
              _toX = -_toWidth;
            }
            if (me.verticalAlign == "bottom") {
              _toY = -_toHeight;
            }

            //render position and size[begin]
            var funcDoRender = function (opt) {
              var disableCallback = opt && opt.disableCallback;

              frame.setPosition(_toX, _toY);

              if (me.hideFrameBorder) {
                frame.frameBorderWidthDefault = 0;
                frame.frameBorderWidthFocused = 0;
                frame.htmlElement.style.borderWidth = "0px";
              }
              frame.setSize(_toWidth, _toHeight, true);

              if (disableCallback) {
                return;
              }

              if (me.hideTitleBar) {
                // when full screen mode(means hidden title bar)

                if (me.restoreKey) {
                  me.keyListener = function (event) {
                    if (event.code === me.restoreKey) {
                      me.doCommand("restore");
                    }
                  };
                }
                window.addEventListener("keydown", me.keyListener);

                //add keylistener for inside the iframe
                if (frame.iframe) {
                  frame.iframe.contentWindow.addEventListener(
                    "keydown",
                    me.keyListener,
                  );
                }
              }

              me.windowMode = "maximized";

              if (model && model.callback) {
                model.callback(me.frame, { eventType: "maximized" });
              }
              if (me.eventListeners["maximized"]) {
                me.eventListeners["maximized"](
                  me.frame,
                  { eventType: "maximized" },
                );
              }
            }; // end of funcDoRender

            if (model && model.animation) {
              me.animateFrame({
                frame: frame,
                from: from,
                to: {
                  left: _toX,
                  top: _toY,
                  width: _toWidth,
                  height: _toHeight,
                },
                duration: model.duration
                  ? model.duration
                  : me.animationDuration,
                callback: funcDoRender,
              });
            } else {
              if (model && model.caller === "handleOnResize") {
                funcDoRender({ disableCallback: true });
              } else {
                funcDoRender();
              }
            }
            //render position and size[end]
          };

          WindowEventHelper.prototype.getWindowMode = function () {
            return this.windowMode;
          };
          /**
 * Restore window from maximized mode
 */
          WindowEventHelper.prototype.doDemaximize = function (model) {
            var me = this;
            var frame = me.frame;

            if (me.windowMode === "hid") {
              //console.error('demaximize(=recovery from maximized) cannot be performed in hid state.');
              throw Error(
                "[JSFrame] demaximize(=recovery from maximized) cannot be performed in hid state.",
              );
              return;
            }

            if (!me.hasWindowStats("maximize_mode")) {
              return;
            }

            if (me.hideTitleBar) {
            } else {
              if (me.maximizeButton) {
                frame.showFrameComponent(me.maximizeButton, me.styleDisplay);
              }
              if (me.demaximizeButton) {
                frame.hideFrameComponent(me.demaximizeButton);
              }
            }

            me.restoreWindow({
              restorePosition: true,
              restoreMode: "maximize_mode",
              animation: me.animationEnabled,
              callback: (model && model.callback) ? model.callback : null,
              forceShowFrameComponents:
                (me.animationEnabled && me.hideTitleBar),
              duration: (model && model.duration) ? model.duration : null,
              eventType: "demaximized",
            });
          };

          /**
 * Called when changing the window size by user operation in maximized mode
 */
          WindowEventHelper.prototype.handleOnResize = function () {
            var me = this;
            me.renderMaximizedMode({
              caller: "handleOnResize",
              //matchParent: true
            });
          };
          WindowEventHelper.prototype.handleOnVirtualResize = function () {
            var me = this;
            me.renderMaximizedMode({
              caller: "handleOnResize",
              matchParent: true,
            });
          };

          //---------------------------------------------------------------------------------------------------------------------

          /**
 * Make window minimized mode
 */
          WindowEventHelper.prototype.doMinimize = function (model) {
            var me = this;

            if (
              me.windowMode === "minimized" || me.windowMode === "minimizing"
            ) {
              // If it's already 'minimized' status, it doesn't do anything.
              return;
            }

            me.windowMode = "minimizing";

            var frame = me.frame;

            //Remember the stats of the window before maximizing the window
            me.saveCurrentWindowStats("minimize_mode");

            frame.setResizable(false);

            me.renderMinimizedMode({
              animation: me.animationEnabled,
              callback: (model && model.callback) ? model.callback : null,
              duration: (model && model.duration) ? model.duration : null,
              toWidth: (model && model.toWidth) ? model.toWidth : null,
            });
          };

          /**
 * Render window as minimized mode
 */
          WindowEventHelper.prototype.renderMinimizedMode = function (model) {
            var me = this;
            var frame = me.frame;
            var ri = me.loadWindowStats("minimize_mode");

            var from = me.getCurrentWindowStats();
            var to = me.getCurrentWindowStats();

            to.height = ri.titleBarHeight;
            if (model && model.toWidth) {
              to.width = model.toWidth;
            }

            var funcDoRender = function () {
              var forceSetSize = true;
              frame.setSize(to.width, to.height, forceSetSize);

              me.windowMode = "minimized";

              if (me.minimizeButton) {
                frame.hideFrameComponent(me.minimizeButton);
              }

              if (me.deminimizeButton) {
                frame.showFrameComponent(me.deminimizeButton, me.styleDisplay);
              }

              if (model.callback) {
                model.callback(me.frame, { eventType: "minimized" });
              }
              if (me.eventListeners["minimized"]) {
                me.eventListeners["minimized"](
                  me.frame,
                  { eventType: "minimized" },
                );
              }
            };

            if (model && model.animation) {
              me.animateFrame({
                toAlpha: 1.0,
                duration: model.duration
                  ? model.duration
                  : me.animationDuration,
                frame: frame,
                from: from,
                to: to,
                callback: funcDoRender,
              });
            } else {
              funcDoRender();
            }
          };

          /**
 * Restore window from minimized mode
 */
          WindowEventHelper.prototype.doDeminimize = function (model) {
            var me = this;

            var frame = me.frame;

            if (!me.hasWindowStats("minimize_mode")) {
              return;
            }

            if (me.minimizeButton) {
              frame.showFrameComponent(me.minimizeButton, me.styleDisplay);
            }
            if (me.deminimizeButton) {
              frame.hideFrameComponent(me.deminimizeButton);
            }

            me.restoreWindow(
              {
                restorePosition: false,
                restoreMode: "minimize_mode",
                animation: me.animationEnabled,
                duration: (model && model.duration) ? model.duration : null,
                callback: (model && model.callback) ? model.callback : null,
                eventType: "deminimized",
              },
            );
          };

          //---------------------------------------------------------------------------------------------------------------------
          /**
 * Make window hidden mode
 */
          WindowEventHelper.prototype.doHide = function (model) {
            var me = this;

            if (me.windowMode === "hid" || me.windowMode === "hiding") {
              // If it's already 'hid' status, it doesn't do anything.
              return;
            }

            me.windowMode = "hiding";

            var frame = me.frame;

            //Remember the stats of the window before maximizing the window
            me.saveCurrentWindowStats("hide_mode");

            frame.setResizable(false);

            var arg = {
              //    silent: model.silent,
              animation: me.animationEnabled,
              // duration: (model && model.duration) ? model.duration : null,
              // callback: (model && model.callback) ? model.callback : null,
              // align: (model && model.align) ? model.align : null,
              // offset: (model && model.align) ? model.offset : null,
            };
            if (model) {
              mergeDeeply(
                { op: "overwrite-merge", object1: arg, object2: model },
              );
            }
            me.renderHideMode(arg);
          };

          /**
 * Render window as hidden mode
 */
          WindowEventHelper.prototype.renderHideMode = function (model) {
            var me = this;
            var frame = me.frame;
            var ri = me.loadWindowStats("hide_mode");

            var from = me.getCurrentWindowStats();

            var offset = { x: 0, y: 0 };
            var toElement = model.toElement;

            if (model.offset) {
              offset = model.offset;
            }

            var left = 0;
            var top = 0;
            {
              var align = (model && model.align) ? model.align : "LEFT_TOP";

              if (!align || CALIGN.LEFT_TOP == align) {
                left = from.left;
                top = from.top;
              } else if (CALIGN.HCENTER_TOP == align) {
                left = from.left + from.width / 2;
                top = from.top;
              } else if (CALIGN.RIGHT_TOP == align) {
                left = from.left + from.width;
                top = from.top;
              } else if (CALIGN.LEFT_VCENTER == align) {
                left = from.left;
                top = from.top + from.height / 2;
              } else if (CALIGN.HCENTER_VCENTER == align) {
                left = from.left + from.width / 2;
                top = from.top + from.height / 2;
              } else if (CALIGN.RIGHT_VCENTER == align) {
                left = from.left + from.width;
                top = from.top + from.height / 2;
              } else if (CALIGN.LEFT_BOTTOM == align) {
                left = from.left;
                top = from.top + from.height;
              } else if (CALIGN.HCENTER_BOTTOM == align) {
                left = from.left + from.width / 2;
                top = from.top + from.height;
              } else if (CALIGN.RIGHT_BOTTOM == align) {
                left = from.left + from.width;
                top = from.top + from.height;
              } else if ("ABSOLUTE" == align) {
                if (toElement) {
                  var elementRect = toElement.getBoundingClientRect();
                  if (me.isWindowManagerFixed) {
                    left = elementRect.left;
                    top = elementRect.top;
                  } else {
                    left = elementRect.left + window.pageXOffset;
                    top = elementRect.top + window.pageYOffset;
                  }
                } else {
                  left = offset.x;
                  top = offset.y;
                }
              }
            }

            var to = {
              left: left,
              top: top,
              width: 0,
              //minimum height must be titleBarHeight
              height: ri.titleBarHeight,
            };

            var funcDoRender = function () {
              var forceSetSize = true;
              frame.setSize(to.width, to.height, forceSetSize);
              //frame.hide();

              me.windowMode = "hid";

              if (model && model.callback) {
                model.callback(me.frame, { eventType: "hid" });
              }
              if (me.eventListeners["hid"]) {
                me.eventListeners["hid"](me.frame, { eventType: "hid" });
              }
            };

            //Hide only the currently visible FrameComponent
            frame.hideAllVisibleFrameComponents();

            if (model && model.animation) {
              me.animateFrame({
                fromAlpha: model.silent ? 0 : 1.0,
                toAlpha: 0,
                ease: true,
                duration: model.duration
                  ? model.duration
                  : me.animationDuration,
                frame: frame,
                from: from,
                to: to,
                callback: funcDoRender,
              });
            } else {
              funcDoRender();
            }
          };

          /**
 * Restore window from hided mode
 */
          WindowEventHelper.prototype.doDehide = function (model) {
            var me = this;
            var frame = me.frame;

            if (!me.hasWindowStats("hide_mode")) {
              return;
            }

            me.restoreWindow(
              {
                duration: (model && model.duration) ? model.duration : null,
                restorePosition: true,
                restoreMode: "hide_mode",
                animation: me.animationEnabled,
                forceShowFrameComponents: true,
                callback: (model && model.callback) ? model.callback : null,
                eventType: "dehided",
              },
            );
          };
          //---------------------------------------------------------------------------------------------------------------------
          WindowEventHelper.prototype.loadWindowStats = function (
            storeKeyName,
          ) {
            var me = this;
            return me.statsStore[storeKeyName];
          };

          /**
 * Remember the status of the window before maximizing or minimizing the window size
 * @param storeKeyName
 * @returns {boolean} Returns true if the status of the window has been updated or is a new status.
 * Returns false if the status has not been updated.
 */
          WindowEventHelper.prototype.saveCurrentWindowStats = function (
            storeKeyName,
          ) {
            var me = this;

            var crrWindowStats = me.getCurrentWindowStats();

            if (me.hasWindowStats(storeKeyName)) {
              var storedStats = me.loadWindowStats(storeKeyName);
              var isWindowStatsUpdated = !me.windowStatsEquals(
                crrWindowStats,
                storedStats,
              );

              if (isWindowStatsUpdated) {
                me.statsStore[storeKeyName] = crrWindowStats;
              }

              return isWindowStatsUpdated;
            } else {
              me.statsStore[storeKeyName] = crrWindowStats;
              return true;
            }
          };

          WindowEventHelper.prototype.windowStatsEquals = function (
            windowStats1,
            windowStats2,
          ) {
            if (windowStats1 && windowStats2) {
              var result =
                JSON.stringify(windowStats1) === JSON.stringify(windowStats2);
              return result;
            } else {
              return false;
            }
          };

          WindowEventHelper.prototype.clearWindowStats = function (
            storeKeyName,
          ) {
            var me = this;
            me.statsStore[storeKeyName] = null;
          };

          WindowEventHelper.prototype.hasWindowStats = function (storeKeyName) {
            var me = this;
            return me.statsStore[storeKeyName];
          };

          WindowEventHelper.prototype.getCurrentWindowStats = function () {
            var me = this;
            var frame = me.frame;

            //Acquire window's stats
            var __titleBarHeight = parseInt(frame.titleBar.style.height, 10);
            var __frameBorderWidthDefault = frame.frameBorderWidthDefault; // parseInt(frame.htmlElement.style.borderWidth, 10);
            var __frameBorderWidthFocused = frame.frameBorderWidthFocused;
            var __left = frame.getLeft();
            var __top = frame.getTop();
            var __width = frame.getWidth();
            var __height = frame.getHeight();
            var __resizable = frame.resizable;
            var __movable = frame.movable;

            return {
              left: __left,
              top: __top,
              width: __width,
              height: __height,
              titleBarHeight: __titleBarHeight,
              frameBorderWidthDefault: __frameBorderWidthDefault,
              frameBorderWidthFocused: __frameBorderWidthFocused,
              resizable: __resizable,
              movable: __movable,
            };
          };

          /**
 * Restore the state of the window
 * @param model
 */
          WindowEventHelper.prototype.restoreWindow = function (model) {
            var me = this;
            var frame = me.frame;
            var to = me.loadWindowStats(model.restoreMode);
            //現在の状態を一時保存する
            //me.saveCurrentWindowStats('temp');
            var crr = me.getCurrentWindowStats(); //loadWindowStats('temp');

            //以下の3つは、ボーダーを太さを変更するためのものだが
            // funcDoRender内で処理してしまうとアニメーション中にはボーダーが描かれなくなる
            //アニメーション中にはボーダーは復活していたほうが自然なのでfuncDoRender外で実行する
            frame.frameBorderWidthDefault = to.frameBorderWidthDefault;
            frame.frameBorderWidthFocused = to.frameBorderWidthFocused;
            frame.htmlElement.style.borderWidth = frame.frameBorderWidthFocused;

            var funcDoRender = function () {
              if (model && model.restorePosition == false) {
                //位置の移動を伴わない場合（最小化から戻すときなど)
                to.left = crr.left;
                to.top = crr.top;
              }

              frame.setPosition(to.left, to.top);

              var force = true;
              frame.setSize(to.width, to.height, force);

              frame.setResizable(to.resizable);
              frame.setMovable(to.movable);

              me.clearWindowStats(model.restoreMode);

              if (me.keyListener) {
                //タイトルバー無し最大化状態から戻すためのキーリスナーは削除する

                window.removeEventListener("keydown", me.keyListener);
                if (frame.iframe) {
                  frame.iframe.contentWindow.removeEventListener(
                    "keydown",
                    me.keyListener,
                  );
                }
                me.keyListener = null;
              }

              me.windowMode = "default";

              if (model && model.forceShowFrameComponents) {
                //ウィンドウのモード変更前に可視状態にあったフレームコンポーネント（閉じるボタン類）を可視状態にする
                frame.showAllVisibleFrameComponents();
              }

              frame.show();

              var eventType = "restored";
              if (model && model.eventType) {
                eventType = model.eventType;
              }

              if (model && model.callback) {
                model.callback(
                  me.frame,
                  { eventType: eventType },
                );
              }
              if (me.eventListeners[eventType]) {
                me.eventListeners[eventType](
                  me.frame,
                  { eventType: eventType },
                );
              }
            };

            if (model && model.animation) {
              me.animateFrame({
                duration: model.duration
                  ? model.duration
                  : me.animationDuration,
                frame: frame,
                fromAlpha: 0,
                toAlpha: 1,
                from: crr,
                to: to,
                callback: funcDoRender,
              });
            } else {
              funcDoRender();
            }

            //window.removeEventListener('resize', me.resizeListener);
            me.eventListenerHelper.removeEventListener(
              window,
              "resize",
              me.resizeListener,
            );
            if (me.matchParentResizeObserver) {
              me.matchParentResizeObserver.disconnect();
              me.matchParentResizeObserver = null;
            }
          };

          WindowEventHelper.prototype.animateFrame = function (model) {
            var me = this;
            var needRequestFocusAfterAnimation = false;

            var fromAlpha = !isNaN(model.fromAlpha) ? model.fromAlpha : 1.0;

            var from = model.from;
            var to = model.to;

            var animator = new CSimpleLayoutAnimator();

            animator.set(model.frame)
              .setDuration(
                model.duration ? model.duration : me.animationDuration,
              )
              .fromPosition(from.left, from.top, "LEFT_TOP")
              .toPosition(to.left, to.top, "LEFT_TOP")
              .fromWidth(from.width)
              .fromHeight(from.height)
              .toWidth(to.width)
              .toHeight(to.height)
              .fromAlpha(fromAlpha)
              .toAlpha((model.toAlpha == 0) ? 0 : 1.0)
              .ease(model.ease)
              .start(0, needRequestFocusAfterAnimation)
              .then(function (animatorObj) {
                model["callback"]();
              });
          };

          /**
 * Perform complex windowing with simple commands
 * @param cmd
 * @param opt
 */
          WindowEventHelper.prototype.doCommand = function (cmd, opt) {
            var me = this;

            if (cmd === "maximize") {
              me._defaultFunctionMaximize(me.frame);
            }
            if (cmd === "demaximize") {
              me._defaultFunctionDemaximize(me.frame);
            }
            if (cmd === "restore") {
              me._defaultFunctionRestoreFromFullscreen(me.frame);
            }
            if (cmd === "minimize") {
              me._defaultFunctionMinimize(me.frame);
            }
            if (cmd === "deminimize") {
              me._defaultFunctionDeminimize(me.frame);
            }
            if (cmd === "hide") {
              me._defaultFunctionHide(me.frame);
            }
            if (cmd === "dehide") {
              me._defaultFunctionDehide(me.frame);
            }
          };

          WindowEventHelper.prototype._defaultFunctionMaximize = function (
            _frame,
            evt,
          ) {
            var me = this;
            var model = me.opts;

            var param = {
              // DEPRECATED: maximizeWithoutTitleBar is deprecated
              // USE maximizeParam.fullScreen
              fullScreen: (model.maximizeWithoutTitleBar === true)
                ? true
                : false,

              // DEPRECATED: model.restoreKey is deprecated
              // USE maximizeParam.restoreKey

              // If you want to use the key input instead of the title bar,
              // you can specify the key because it is not possible
              // to recover with the button when hiding the title bar.
              restoreKey: model.restoreKey ? model.restoreKey : "Escape",

              // DEPRECATED: model.restoreDuration is deprecated
              // USE maximizeParam.restoreDuration
              restoreDuration: model.restoreDuration,
            };

            if (this.maximizeParam) {
              // write maximizeParam into param
              mergeDeeply(
                {
                  op: "overwrite-merge",
                  object1: param,
                  object2: this.maximizeParam,
                },
              );
            }

            //ウィンドウを最大化する
            _frame.control.doMaximize(param);
          };

          WindowEventHelper.prototype._defaultFunctionDemaximize = function (
            _frame,
            evt,
          ) {
            _frame.control.doDemaximize(
              {},
            );
          };

          WindowEventHelper.prototype._defaultFunctionRestoreFromFullscreen =
            function (_frame, evt) {
              var me = this;
              _frame.control.doDemaximize({
                duration: me.restoreDuration ? me.restoreDuration : null,
                callback: me.restoreCallback ? me.restoreCallback : null,
              });
            };

          WindowEventHelper.prototype._defaultFunctionMinimize = function (
            _frame,
            evt,
          ) {
            //'minimizeButton'が押されたときに、最小化したい場合
            _frame.control.doMinimize(this.minimizeParam);
          };

          WindowEventHelper.prototype._defaultFunctionDeminimize = function (
            _frame,
            evt,
          ) {
            _frame.control.doDeminimize(this.deminimizeParam);
          };

          WindowEventHelper.prototype._defaultFunctionHide = function (
            _frame,
            evt,
          ) {
            var param = {
              align: "CENTER_BOTTOM",
            };
            if (this.hideParam) {
              param = this.hideParam;
            }
            _frame.control.doHide(param);
          };

          WindowEventHelper.prototype._defaultFunctionDehide = function (
            _frame,
            evt,
          ) {
            var me = this;
            _frame.control.doDehide(me.dehideParam);
          };

          WindowEventHelper.prototype.setupDefaultEvents = function () {
            var me = this;

            if (me.maximizeButton) {
              //イベントはオーバーライドされる
              me.frame.on(
                me.maximizeButton,
                "click",
                me._defaultFunctionMaximize.bind(me),
              );
            }

            if (me.demaximizeButton) {
              me.frame.on(
                me.demaximizeButton,
                "click",
                me._defaultFunctionDemaximize.bind(me),
              );
            }

            if (me.minimizeButton) {
              me.frame.on(
                me.minimizeButton,
                "click",
                me._defaultFunctionMinimize.bind(me),
              );
            }

            if (me.deminimizeButton) {
              me.frame.on(
                me.deminimizeButton,
                "click",
                me._defaultFunctionDeminimize.bind(me),
              );
            }

            if (me.hideButton) {
              me.frame.on(
                me.hideButton,
                "click",
                me._defaultFunctionHide.bind(me),
              );
            }

            if (me.hideButtons) {
              for (var key in me.hideButtons) {
                var hideButton = me.hideButtons[key];
                if (hideButton) {
                  me.frame.on(
                    hideButton,
                    "click",
                    me._defaultFunctionHide.bind(me),
                  );
                }
              }
            }
          };

          module.exports = WindowEventHelper;

          /***/
        }),
      /******/
    });
    /************************************************************************/
    /******/
    // The module cache
    /******/ var __webpack_module_cache__ = {};
    /******/
    /******/
    // The require function
    /******/ function __webpack_require__(moduleId) {
      /******/
      // Check if module is in cache
      /******/ if (__webpack_module_cache__[moduleId]) {
        /******/ return __webpack_module_cache__[moduleId].exports;
        /******/
      }
      /******/
      // Create a new module (and put it into the cache)
      /******/ var module = __webpack_module_cache__[moduleId] = {
        /******/ id: moduleId,
        /******/
        // no module.loaded needed
        /******/ exports: {},
        /******/
      };
      /******/
      /******/
      // Execute the module function
      /******/ __webpack_modules__[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__,
      );
      /******/
      /******/
      // Return the exports of the module
      /******/ return module.exports;
      /******/
    }
    /******/
    /************************************************************************/
    /******/
    /* webpack/runtime/compat get default export */
    /******/ (() => {
      /******/
      // getDefaultExport function for compatibility with non-harmony modules
      /******/ __webpack_require__.n = (module) => {
        /******/ var getter = module && module.__esModule
          ? /******/ () => module["default"]
          : /******/ () => module;
        /******/ __webpack_require__.d(getter, { a: getter });
        /******/ return getter;
        /******/
      };
      /******/
    })();
    /******/
    /******/
    /* webpack/runtime/define property getters */
    /******/ (() => {
      /******/
      // define getter functions for harmony exports
      /******/ __webpack_require__.d = (exports, definition) => {
        /******/ for (var key in definition) {
          /******/ if (
            __webpack_require__.o(definition, key) &&
            !__webpack_require__.o(exports, key)
          ) {
            /******/ Object.defineProperty(
              exports,
              key,
              { enumerable: true, get: definition[key] },
            );
            /******/
          }
          /******/
        }
        /******/
      };
      /******/
    })();
    /******/
    /******/
    /* webpack/runtime/hasOwnProperty shorthand */
    /******/ (() => {
      /******/ __webpack_require__.o = (obj, prop) =>
        Object.prototype.hasOwnProperty.call(obj, prop);
      /******/
    })();
    /******/
    /******/
    /* webpack/runtime/make namespace object */
    /******/ (() => {
      /******/
      // define __esModule on exports
      /******/ __webpack_require__.r = (exports) => {
        /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
          /******/ Object.defineProperty(
            exports,
            Symbol.toStringTag,
            { value: "Module" },
          );
          /******/
        }
        /******/ Object.defineProperty(exports, "__esModule", { value: true });
        /******/
      };
      /******/
    })();
    /******/
    /************************************************************************/
    /******/
    // module exports must be returned from runtime so entry inlining is disabled
    /******/
    // startup
    /******/
    // Load entry module and return exports
    /******/ return __webpack_require__("./src/index.js");
    /******/
  })();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL0B6ZWR2aXNpb24vanNmcmFtZS8uL25vZGVfbW9kdWxlcy9Acml2ZXJzdW4vZXZlbnQtZW1pdHRlci9saWIvZXZlbnQtZW1pdHRlci5qcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9zcmMvSlNGcmFtZS5jc3MiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lLy4vc3JjL3ByZXNldHMvYXBwZWFyYW5jZS9QcmVzZXRTdHlsZU1hdGVyaWFsLmNzcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9zcmMvcHJlc2V0cy9hcHBlYXJhbmNlL1ByZXNldFN0eWxlUG9wdXAuY3NzIiwid2VicGFjazovL0B6ZWR2aXNpb24vanNmcmFtZS8uL3NyYy9wcmVzZXRzL2FwcGVhcmFuY2UvUHJlc2V0U3R5bGVSZWRzdG9uZS5jc3MiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lLy4vc3JjL3ByZXNldHMvYXBwZWFyYW5jZS9QcmVzZXRTdHlsZVlvc2VtaXRlLmNzcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL0B6ZWR2aXNpb24vanNmcmFtZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzIiwid2VicGFjazovL0B6ZWR2aXNpb24vanNmcmFtZS8uL25vZGVfbW9kdWxlcy9ldmVudC1saXN0ZW5lci1oZWxwZXIvbGliL2V2ZW50LWxpc3RlbmVyLWhlbHBlci5qcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9ub2RlX21vZHVsZXMvbWVyZ2UtZGVlcGx5L2xpYi9tZXJnZS1kZWVwbHkuanMiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lLy4vc3JjL0pTRnJhbWUuY3NzPzZiZWQiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lLy4vc3JjL3ByZXNldHMvYXBwZWFyYW5jZS9QcmVzZXRTdHlsZU1hdGVyaWFsLmNzcz9iM2U5Iiwid2VicGFjazovL0B6ZWR2aXNpb24vanNmcmFtZS8uL3NyYy9wcmVzZXRzL2FwcGVhcmFuY2UvUHJlc2V0U3R5bGVQb3B1cC5jc3M/OGE3OCIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9zcmMvcHJlc2V0cy9hcHBlYXJhbmNlL1ByZXNldFN0eWxlUmVkc3RvbmUuY3NzPzZkYmQiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lLy4vc3JjL3ByZXNldHMvYXBwZWFyYW5jZS9QcmVzZXRTdHlsZVlvc2VtaXRlLmNzcz9jZWM1Iiwid2VicGFjazovL0B6ZWR2aXNpb24vanNmcmFtZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9zcmMvQ0NvbW1vbi5qcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9zcmMvSlNGcmFtZS5qcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9zcmMvYXBwZWFyYW5jZS9DQnV0dG9uQXBwZWFyYW5jZS5qcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9zcmMvYXBwZWFyYW5jZS9DQ2hpbGRNZW51QXBwZWFyYW5jZS5qcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9zcmMvYXBwZWFyYW5jZS9DRG9tUGFydHNCdWlsZGVyLmpzIiwid2VicGFjazovL0B6ZWR2aXNpb24vanNmcmFtZS8uL3NyYy9hcHBlYXJhbmNlL0NGcmFtZUFwcGVhcmFuY2UuanMiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lLy4vc3JjL2FwcGVhcmFuY2UvQ0ZyYW1lQ29tcG9uZW50LmpzIiwid2VicGFjazovL0B6ZWR2aXNpb24vanNmcmFtZS8uL3NyYy9hcHBlYXJhbmNlL0NJbWFnZUJ1dHRvbkFwcGVhcmFuY2UuanMiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL0B6ZWR2aXNpb24vanNmcmFtZS8uL3NyYy9wcmVzZXRzL2FwcGVhcmFuY2UvUHJlc2V0U3R5bGVNYXRlcmlhbC5qcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9zcmMvcHJlc2V0cy9hcHBlYXJhbmNlL1ByZXNldFN0eWxlUG9wdXAuanMiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lLy4vc3JjL3ByZXNldHMvYXBwZWFyYW5jZS9QcmVzZXRTdHlsZVJlZHN0b25lLmpzIiwid2VicGFjazovL0B6ZWR2aXNpb24vanNmcmFtZS8uL3NyYy9wcmVzZXRzL2FwcGVhcmFuY2UvUHJlc2V0U3R5bGVUb2FzdC5qcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9zcmMvcHJlc2V0cy9hcHBlYXJhbmNlL1ByZXNldFN0eWxlWW9zZW1pdGUuanMiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lLy4vc3JjL3ByZXNldHMvd2luZG93L1ByZXNldFdpbmRvd1lvc2VtaXRlLmpzIiwid2VicGFjazovL0B6ZWR2aXNpb24vanNmcmFtZS8uL3NyYy91dGlscy9DU2ltcGxlTGF5b3V0QW5pbWF0b3IuanMiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lLy4vc3JjL3V0aWxzL0NUaW1lci5qcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9zcmMvdXRpbHMvSW5oZXJpdC5qcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9zcmMvdXRpbHMvT2JqZWN0QXNzaWduZXIuanMiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lLy4vc3JjL3V0aWxzL1dpbmRvd0V2ZW50SGVscGVyLmpzIiwid2VicGFjazovL0B6ZWR2aXNpb24vanNmcmFtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7O0FDVkE7QUFDQSxlQUFlLEtBQWlELG9CQUFvQixDQUFzSSxDQUFDLGtCQUFrQixZQUFZLGFBQWEsT0FBTyxjQUFjLGdCQUFnQixtQkFBbUIsNkJBQTZCLG1CQUFtQixzRUFBc0UsNEJBQTRCLElBQUksaUNBQWlDLDJEQUEyRCxPQUFPLFNBQVMsU0FBUyxRQUFRLElBQUksOEJBQThCLFFBQVEsY0FBYyxTQUFTLDBCQUEwQixpS0FBaUssR0FBRyxnQkFBZ0IsTUFBTSx5REFBeUQsZ0VBQWdFLFNBQVMsdUJBQXVCLE9BQU8saUJBQWlCLG9CQUFvQixRQUFRLEVBQUUsc0JBQXNCLGVBQWUsUUFBUSxNQUFNLDZKQUE2SixnQkFBZ0IsT0FBTyxhQUFhLHVCQUF1QixjQUFjLGVBQWUsa0JBQWtCLGVBQWUsU0FBUyxjQUFjLElBQUksOEJBQThCLFFBQVEsZ0JBQWdCLGdCQUFnQixNQUFNLG9DQUFvQyxvREFBb0QsZ0xBQWdMLGdCQUFnQixvQ0FBb0MsMkJBQTJCLElBQUksY0FBYyxTQUFTLGdCQUFnQiw4RUFBOEUsZ0JBQWdCLFlBQVksV0FBVyxLQUFLLFdBQVcsK0dBQStHLGtCQUFrQix1Q0FBdUMsT0FBTyxjQUFjLEVBQUUsaUJBQWlCLGNBQWMsb0VBQW9FLGFBQWEsSUFBSSxVQUFVLGdCQUFnQixFQUFFLHNCQUFzQiwyQkFBMkIsU0FBUyxPQUFPLFFBQVEsT0FBTyxzREFBc0QsYUFBYSw2QkFBNkIsOEJBQThCLDZJQUE2SSxXQUFXLEtBQUssdUJBQXVCLFVBQVUsMkNBQTJDLElBQUksRUFBRSx5Q0FBeUMsOEJBQThCLHdCQUF3QixFQUFFLGlDQUFpQyxnQ0FBZ0MsaUVBQWlFLEVBQUUsNkJBQTZCLGlDQUFpQyxFQUFFLCtCQUErQiw4QkFBOEIseUNBQXlDLGdDQUFnQyx5Q0FBeUMsbUNBQW1DLElBQUksVUFBVSxnQkFBZ0IsRUFBRSxtQkFBbUIsU0FBUyxPQUFPLFFBQVEsUUFBUSxFQUFFLHVDQUF1QyxTQUFTLHdDQUF3Qyw4QkFBOEIsY0FBYyxtQkFBbUIsR0FBRyx1Q0FBdUMsSUFBSSxVQUFVLGdCQUFnQixFQUFFLDJDQUEyQyw4QkFBOEIsY0FBYyxzRkFBc0YsOEJBQThCLEVBQUUsUUFBUSxTQUFTLE9BQU8sUUFBUSxNQUFNLFVBQVUsRUFBRSx5Q0FBeUMsNEJBQTRCLDhCQUE4QixtQ0FBbUMsbUNBQW1DLElBQUksVUFBVSxnQkFBZ0IsRUFBRSx5Q0FBeUMsU0FBUyxPQUFPLFFBQVEsTUFBTSxVQUFVLEVBQUUsZ0NBQWdDLHFDQUFxQyxJQUFJLFVBQVUsZ0JBQWdCLEVBQUUsb0JBQW9CLFNBQVMsT0FBTyxRQUFRLE1BQU0seUJBQXlCLHVDQUF1QyxJQUFJLFVBQVUsZ0JBQWdCLEVBQUUsb0JBQW9CLFNBQVMsT0FBTyxRQUFRLE1BQU0sdURBQXVELEVBQUUsK0NBQStDLGlHQUFpRyw4QkFBOEIsRUFBRSxnREFBZ0QsbUNBQW1DLEVBQUUsZ0RBQWdELDJEQUEyRCxXQUFXLEtBQUssOEJBQThCLFFBQVEsa0JBQWtCLEVBQUUsVUFBVSxLQUFLLGdCQUFnQixhQUFhLGdDQUFnQyxhQUFhLGdDQUFnQyx1QkFBdUIsRUFBRSx1Q0FBdUMsMkJBQTJCLEVBQUUsdUNBQXVDLG9DQUFvQyxFQUFFLHdDQUF3Qyw0QkFBNEIsRUFBRSx5Q0FBeUMsOEJBQThCLElBQUksVUFBVSxnQkFBZ0IsRUFBRSxjQUFjLCtMQUErTCxNQUFNLFNBQVMsT0FBTyxRQUFRLFFBQVEsRUFBRSx1Q0FBdUMsZ0RBQWdELEVBQUUsOENBQThDLG1CQUFtQiw4QkFBOEIsRUFBRSwrQkFBK0Isc0RBQXNELEtBQUssZ0JBQWdCLGFBQWEsdUNBQXVDLGFBQWEsZ0NBQWdDLDhCQUE4QixFQUFFLHdDQUF3QyxvQ0FBb0MsRUFBRSwwQ0FBMEMsK0JBQStCLEVBQUUseUNBQXlDLHlDQUF5QyxJQUFJLFVBQVUsZ0JBQWdCLEVBQUUsY0FBYywrTEFBK0wsTUFBTSxTQUFTLE9BQU8sUUFBUSxRQUFRLEVBQUUsK0JBQStCLHNEQUFzRCxLQUFLLElBQUksTUFBTSxjQUFjLDRCQUE0QixZQUFZLFlBQVkscUNBQXFDLG1CQUFtQiwrREFBK0QsdUJBQXVCLEVBQUUsNkRBQTZELFlBQVksRzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0RyME47QUFDc0g7QUFDN0I7QUFDekYsOEJBQThCLG1GQUEyQixDQUFDLHdHQUFxQztBQUMvRjtBQUNBLHFFQUFxRSxzSEFBc0gsaUVBQWlFLDhEQUE4RCx5REFBeUQsa0NBQWtDLG1DQUFtQyxHQUFHLCtCQUErQix3TEFBd0wsaUVBQWlFLDhEQUE4RCx5REFBeUQsa0NBQWtDLG1DQUFtQyxHQUFHLHNDQUFzQyxxQ0FBcUMsbUJBQW1CLHFCQUFxQixPQUFPLGtGQUFrRixZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssS0FBSyxPQUFPLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsS0FBSyxvREFBb0Qsc0hBQXNILGlFQUFpRSw4REFBOEQseURBQXlELGtDQUFrQyxtQ0FBbUMsR0FBRywrQkFBK0Isd0xBQXdMLGlFQUFpRSw4REFBOEQseURBQXlELGtDQUFrQyxtQ0FBbUMsR0FBRyxzQ0FBc0MscUNBQXFDLG1CQUFtQixxQkFBcUIsbUJBQW1CO0FBQ2gwRTtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1B2QztBQUM0SDtBQUM3QjtBQUMvRiw4QkFBOEIsbUZBQTJCLENBQUMsd0dBQXFDO0FBQy9GO0FBQ0Esa0ZBQWtGLHdCQUF3QixrQ0FBa0MsbUNBQW1DLEdBQUcsNENBQTRDLHdCQUF3QixtQ0FBbUMsb0NBQW9DLEdBQUcsU0FBUyxpSEFBaUgsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGtFQUFrRSx3QkFBd0Isa0NBQWtDLG1DQUFtQyxHQUFHLDRDQUE0Qyx3QkFBd0IsbUNBQW1DLG9DQUFvQyxHQUFHLHFCQUFxQjtBQUN2MUI7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQdkM7QUFDNEg7QUFDN0I7QUFDL0YsOEJBQThCLG1GQUEyQixDQUFDLHdHQUFxQztBQUMvRjtBQUNBLCtFQUErRSx3QkFBd0Isa0NBQWtDLG1DQUFtQyxHQUFHLHlDQUF5Qyx3QkFBd0Isa0NBQWtDLG1DQUFtQyxHQUFHLFNBQVMsOEdBQThHLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSwrREFBK0Qsd0JBQXdCLGtDQUFrQyxtQ0FBbUMsR0FBRyx5Q0FBeUMsd0JBQXdCLGtDQUFrQyxtQ0FBbUMsR0FBRyxxQkFBcUI7QUFDcDBCO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUHZDO0FBQzRIO0FBQzdCO0FBQy9GLDhCQUE4QixtRkFBMkIsQ0FBQyx3R0FBcUM7QUFDL0Y7QUFDQSxrRkFBa0Ysd0JBQXdCLGtDQUFrQyxtQ0FBbUMsR0FBRyw0Q0FBNEMsd0JBQXdCLGtDQUFrQyxtQ0FBbUMsR0FBRyxTQUFTLGlIQUFpSCxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsa0VBQWtFLHdCQUF3QixrQ0FBa0MsbUNBQW1DLEdBQUcsNENBQTRDLHdCQUF3QixrQ0FBa0MsbUNBQW1DLEdBQUcscUJBQXFCO0FBQ24xQjtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1B2QztBQUM0SDtBQUM3QjtBQUMvRiw4QkFBOEIsbUZBQTJCLENBQUMsd0dBQXFDO0FBQy9GO0FBQ0Esa0ZBQWtGLHNIQUFzSCxpRUFBaUUsOERBQThELHlEQUF5RCxrQ0FBa0MsbUNBQW1DLEdBQUcsNENBQTRDLHdMQUF3TCxpRUFBaUUsOERBQThELHlEQUF5RCxrQ0FBa0MsbUNBQW1DLEdBQUcsU0FBUyxpSEFBaUgsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLEtBQUssT0FBTyxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxrRUFBa0Usc0hBQXNILGlFQUFpRSw4REFBOEQseURBQXlELGtDQUFrQyxtQ0FBbUMsR0FBRyw0Q0FBNEMsd0xBQXdMLGlFQUFpRSw4REFBOEQseURBQXlELGtDQUFrQyxtQ0FBbUMsR0FBRyxxQkFBcUI7QUFDMW9FO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7OztBQ1AxQjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjs7QUFFaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNENBQTRDLHFCQUFxQjtBQUNqRTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxxQkFBcUIsaUJBQWlCO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IscUJBQXFCO0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUNqRWE7O0FBRWIsaUNBQWlDLDJIQUEySDs7QUFFNUosNkJBQTZCLGtLQUFrSzs7QUFFL0wsaURBQWlELGdCQUFnQixnRUFBZ0Usd0RBQXdELDZEQUE2RCxzREFBc0Qsa0hBQWtIOztBQUU5WixzQ0FBc0MsdURBQXVELHVDQUF1QyxTQUFTLE9BQU8sa0JBQWtCLEVBQUUsYUFBYTs7QUFFckwsd0NBQXdDLGdGQUFnRixlQUFlLGVBQWUsZ0JBQWdCLG9CQUFvQixNQUFNLDBDQUEwQywrQkFBK0IsYUFBYSxxQkFBcUIsbUNBQW1DLEVBQUUsRUFBRSxjQUFjLFdBQVcsVUFBVSxFQUFFLFVBQVUsTUFBTSxpREFBaUQsRUFBRSxVQUFVLGtCQUFrQixFQUFFLEVBQUUsYUFBYTs7QUFFdmUsK0JBQStCLG9DQUFvQzs7QUFFbkU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGNBQWM7QUFDckU7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxFOzs7Ozs7Ozs7O0FDL0JBO0FBQ0EsZUFBZSxLQUFpRCxvQkFBb0IsQ0FBMkosQ0FBQyxrQkFBa0IsbUJBQW1CLFNBQVMsY0FBYyw0QkFBNEIsWUFBWSxxQkFBcUIsMkRBQTJELHVDQUF1QyxxQ0FBcUMsb0JBQW9CLEVBQUUsaUJBQWlCLDRGQUE0RixlQUFlLHdDQUF3QyxTQUFTLEVBQUUsbUJBQW1CLDhCQUE4QixxREFBcUQsMEJBQTBCLDZDQUE2QyxzQkFBc0IsNkRBQTZELFlBQVksZUFBZSxTQUFTLGlCQUFpQixpQ0FBaUMsaUJBQWlCLFlBQVksVUFBVSxzQkFBc0IsbUJBQW1CLGlEQUFpRCxrQkFBa0Isa0JBQWtCLGVBQWUsaUJBQWlCLGFBQWEsY0FBYyxpRkFBaUYsZ0JBQWdCLGFBQWEsb0dBQW9HLEtBQUssZ0JBQWdCLG1CQUFtQiw2QkFBNkIsbUJBQW1CLHNFQUFzRSw0QkFBNEIsSUFBSSxpQ0FBaUMsMkRBQTJELE9BQU8sU0FBUyxTQUFTLFFBQVEsSUFBSSw4QkFBOEIsUUFBUSxjQUFjLFNBQVMsMEJBQTBCLGlLQUFpSyxHQUFHLGdCQUFnQixNQUFNLHlEQUF5RCxnRUFBZ0UsU0FBUyx1QkFBdUIsT0FBTyxpQkFBaUIsb0JBQW9CLFFBQVEsRUFBRSxzQkFBc0IsZUFBZSxRQUFRLE1BQU0sNkpBQTZKLGdCQUFnQixPQUFPLGFBQWEsdUJBQXVCLGNBQWMsZUFBZSxrQkFBa0IsZUFBZSxTQUFTLGNBQWMsSUFBSSw4QkFBOEIsUUFBUSxnQkFBZ0IsZ0JBQWdCLE1BQU0sb0NBQW9DLG9EQUFvRCxnTEFBZ0wsZ0JBQWdCLG9DQUFvQywyQkFBMkIsSUFBSSxjQUFjLFNBQVMsZ0JBQWdCLFlBQVksV0FBVyxLQUFLLFdBQVcsK0dBQStHLG1DQUFtQyxTQUFTLEdBQUcsaUJBQWlCLGFBQWEsZUFBZSw4RUFBOEUsOERBQThELFVBQVUsZ0JBQWdCLCtDQUErQyxrQkFBa0IsMkhBQTJILDRCQUE0QixXQUFXLHNDQUFzQyxXQUFXLDBEQUEwRCx1Q0FBdUMsRUFBRSxPQUFPLDhCQUE4QixzREFBc0QsdUNBQXVDLGtEQUFrRCxlQUFlLHVDQUF1QyxvSEFBb0gsU0FBUyxvQ0FBb0MsbUJBQW1CLEtBQUssMkNBQTJDLFFBQVEsNEJBQTRCLG9DQUFvQyx1Q0FBdUMsVUFBVSxFQUFFLGtEQUFrRCwyRUFBMkUseUhBQXlILDRCQUE0QixXQUFXLHNDQUFzQyxPQUFPLG1DQUFtQyxvQ0FBb0Msc0dBQXNHLGVBQWUsbUhBQW1ILE1BQU0sZUFBZSxpSUFBaUksMkpBQTJKLFlBQVksNkRBQTZELDREQUE0RCxNQUFNLDRDQUE0QyxxRkFBcUYsZ1JBQWdSLFVBQVUsRUFBRSw0Q0FBNEMsd0ZBQXdGLEVBQUUsNENBQTRDLHFCQUFxQix3REFBd0Qsb0RBQW9ELFdBQVcsYUFBYSxJQUFJLFVBQVUsZ0JBQWdCLEVBQUUsY0FBYyxnQ0FBZ0MsU0FBUyxPQUFPLFFBQVEsT0FBTyxNQUFNLEVBQUUsbURBQW1ELDRDQUE0QyxlQUFlLGFBQWEsSUFBSSxVQUFVLGdCQUFnQixFQUFFLHdEQUF3RCxJQUFJLFVBQVUsZ0JBQWdCLEVBQUUsY0FBYyx1Q0FBdUMsU0FBUyxPQUFPLFFBQVEsTUFBTSxvQkFBb0Isd0JBQXdCLEdBQUcsU0FBUyxPQUFPLFFBQVEsTUFBTSxVQUFVLEVBQUUsc0RBQXNELDJFQUEyRSw0Q0FBNEMsZUFBZSxlQUFlLGVBQWUsc0JBQXNCLElBQUksVUFBVSxnQkFBZ0IsRUFBRSw4Q0FBOEMsV0FBVyxTQUFTLE9BQU8sUUFBUSxNQUFNLFVBQVUsRUFBRSw2Q0FBNkMseUVBQXlFLHVDQUF1QyxrQkFBa0IsZUFBZSxrQkFBa0IsK0NBQStDLFVBQVUsRUFBRSw0Q0FBNEMsMkVBQTJFLHVDQUF1QyxlQUFlLGVBQWUseUJBQXlCLEVBQUUsNkNBQTZDLHlFQUF5RSx1Q0FBdUMsZUFBZSxlQUFlLGVBQWUsZUFBZSxXQUFXLEVBQUUsOENBQThDLGtCQUFrQixRQUFRLG9CQUFvQixlQUFlLGtNQUFrTSxFQUFFLDhDQUE4QyxxQ0FBcUMsSUFBSSxVQUFVLGdCQUFnQixFQUFFLGNBQWMsNkJBQTZCLFNBQVMsT0FBTyxRQUFRLFFBQVEsRUFBRSw4Q0FBOEMsK0VBQStFLGtDQUFrQyxNQUFNLE1BQU0sYUFBYSxJQUFJLFVBQVUsZ0JBQWdCLEVBQUUsY0FBYyw4Q0FBOEMsU0FBUyxPQUFPLFFBQVEsUUFBUSxLQUFLLGFBQWEsSUFBSSxVQUFVLGdCQUFnQixFQUFFLCtDQUErQyxJQUFJLFVBQVUsZ0JBQWdCLEVBQUUsc0JBQXNCLHNDQUFzQyxTQUFTLE9BQU8sUUFBUSxRQUFRLFNBQVMsT0FBTyxRQUFRLFNBQVMsRUFBRSwrQ0FBK0MsbUNBQW1DLDREQUE0RCxFQUFFLDBDQUEwQyxxREFBcUQsRUFBRSxtREFBbUQsMENBQTBDLElBQUksVUFBVSxnQkFBZ0IsRUFBRSxpRUFBaUUsSUFBSSxVQUFVLGdCQUFnQixFQUFFLGdFQUFnRSxjQUFjLFNBQVMsT0FBTyxRQUFRLFFBQVEsU0FBUyxPQUFPLFFBQVEsTUFBTSxVQUFVLEVBQUUscURBQXFELGFBQWEsSUFBSSxVQUFVLGdCQUFnQixFQUFFLDBCQUEwQix5QkFBeUIsU0FBUyxPQUFPLFFBQVEsTUFBTSxhQUFhLEVBQUUsNENBQTRDLHlMQUF5TCxjQUFjLDBMQUEwTCw2Q0FBNkMsTUFBTSxFQUFFLG1DQUFtQyxzQ0FBc0MsRUFBRSwrQkFBK0Isc0RBQXNELGlDQUFpQyxHQUFHLFdBQVcsRzs7Ozs7Ozs7OztBQ0Qvc1U7QUFDQSxlQUFlLEtBQWlELG9CQUFvQixDQUFtSSxDQUFDLGtCQUFrQixtQkFBbUIsU0FBUyxjQUFjLDRCQUE0QixZQUFZLHFCQUFxQiwyREFBMkQsdUNBQXVDLHFDQUFxQyxvQkFBb0IsRUFBRSxpQkFBaUIsNEZBQTRGLGVBQWUsd0NBQXdDLFNBQVMsRUFBRSxtQkFBbUIsOEJBQThCLHFEQUFxRCwwQkFBMEIsNkNBQTZDLHNCQUFzQiw2REFBNkQsWUFBWSxlQUFlLFNBQVMsaUJBQWlCLGlDQUFpQyxpQkFBaUIsWUFBWSxVQUFVLHNCQUFzQixtQkFBbUIsaURBQWlELGtCQUFrQixrQkFBa0IsZUFBZSxpQkFBaUIsYUFBYSxnQkFBZ0IsTUFBTSx5REFBeUQsZ0VBQWdFLFNBQVMsdUJBQXVCLE9BQU8saUJBQWlCLG9CQUFvQixRQUFRLEVBQUUsc0JBQXNCLGVBQWUsUUFBUSxNQUFNLDZKQUE2SixnQkFBZ0IsT0FBTyxhQUFhLHVCQUF1QixjQUFjLGVBQWUsa0JBQWtCLGVBQWUsU0FBUyxjQUFjLElBQUksOEJBQThCLFFBQVEsZ0JBQWdCLGNBQWMsbUJBQW1CLGdDQUFnQyxpQkFBaUIsaUZBQWlGLHNCQUFzQiw0SkFBNEosR0FBRyxnQkFBZ0IsbUJBQW1CLDZCQUE2QixtQkFBbUIsc0VBQXNFLDRCQUE0QixJQUFJLGlDQUFpQywyREFBMkQsT0FBTyxTQUFTLFNBQVMsUUFBUSxJQUFJLDhCQUE4QixRQUFRLGNBQWMsU0FBUywwQkFBMEIsaUtBQWlLLEdBQUcsZ0JBQWdCLE1BQU0sb0NBQW9DLG9EQUFvRCxnTEFBZ0wsZ0JBQWdCLG9DQUFvQywyQkFBMkIsSUFBSSxjQUFjLFNBQVMsY0FBYyxpRkFBaUYsZ0JBQWdCLGFBQWEsb0dBQW9HLEtBQUssa0JBQWtCLGtCQUFrQiw2Q0FBNkMseUNBQXlDLGdFQUFnRSxpQkFBaUIsMkVBQTJFLFdBQVcsS0FBSyxxQ0FBcUMsNEVBQTRFLHNFQUFzRSxLQUFLLFFBQVEsd0JBQXdCLGtCQUFrQixJQUFJLFVBQVUsZ0JBQWdCLEVBQUUsOENBQThDLFdBQVcsU0FBUyxPQUFPLFFBQVEsTUFBTSxJQUFJLGlDQUFpQyw2QkFBNkIsa0RBQWtELGNBQWMsU0FBUyxjQUFjLHlCQUF5Qiw2SEFBNkgsd0RBQXdELE1BQU0sc0ZBQXNGLFdBQVcsc0ZBQXNGLHlDQUF5QyxLQUFLLHdGQUF3RixpQkFBaUIsMkdBQTJHLHVCQUF1Qiw0REFBNEQsV0FBVyxZQUFZLGtEQUFrRCxJQUFJLG1DQUFtQyxTQUFTLEdBQUcsV0FBVyxHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNEaDNKO0FBQ3pGLFlBQXlGOztBQUV6Rjs7QUFFQTtBQUNBOztBQUVBLGFBQWEsMEdBQUcsQ0FBQyxxRkFBTzs7OztBQUl4QixpRUFBZSw0RkFBYyxNQUFNLEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1o0RDtBQUMvRixZQUEyRzs7QUFFM0c7O0FBRUE7QUFDQTs7QUFFQSxhQUFhLDBHQUFHLENBQUMsaUdBQU87Ozs7QUFJeEIsaUVBQWUsd0dBQWMsTUFBTSxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaNEQ7QUFDL0YsWUFBd0c7O0FBRXhHOztBQUVBO0FBQ0E7O0FBRUEsYUFBYSwwR0FBRyxDQUFDLDhGQUFPOzs7O0FBSXhCLGlFQUFlLHFHQUFjLE1BQU0sRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWjREO0FBQy9GLFlBQTJHOztBQUUzRzs7QUFFQTtBQUNBOztBQUVBLGFBQWEsMEdBQUcsQ0FBQyxpR0FBTzs7OztBQUl4QixpRUFBZSx3R0FBYyxNQUFNLEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1o0RDtBQUMvRixZQUEyRzs7QUFFM0c7O0FBRUE7QUFDQTs7QUFFQSxhQUFhLDBHQUFHLENBQUMsaUdBQU87Ozs7QUFJeEIsaUVBQWUsd0dBQWMsTUFBTSxFOzs7Ozs7Ozs7OztBQ1p0Qjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEOztBQUV2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsd0JBQXdCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLGlCQUFpQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTs7QUFFbkY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EscUVBQXFFLHFCQUFxQixhQUFhOztBQUV2Rzs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0EseURBQXlEO0FBQ3pELEdBQUc7O0FBRUg7OztBQUdBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEI7QUFDMUI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsNEJBQTRCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG9CQUFvQiw2QkFBNkI7QUFDakQ7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7QUM1UUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ2JhOztBQUViLG1CQUFPLENBQUMsd0NBQWU7QUFDdkIsbUJBQW1CLG1CQUFPLENBQUMsNEZBQXlCO0FBQ3BELGFBQWEsbUJBQU8sQ0FBQyxzQ0FBYztBQUNuQyx3QkFBd0IsbUJBQU8sQ0FBQyxzRUFBOEI7QUFDOUQsY0FBYyxtQkFBTyxDQUFDLGtEQUFvQjtBQUMxQyx1QkFBdUIsbUJBQU8sQ0FBQyw4RUFBa0M7QUFDakUsdUJBQXVCLG1CQUFPLENBQUMsOEVBQWtDO0FBQ2pFLDRCQUE0QixtQkFBTyxDQUFDLDhFQUFrQztBQUN0RSwwQkFBMEIsbUJBQU8sQ0FBQyxnR0FBdUI7O0FBRXpEO0FBQ0E7QUFDQSxjQUFjLG1CQUFPLENBQUMsb0dBQTZDO0FBQ25FLGNBQWMsbUJBQU8sQ0FBQyxvR0FBNkM7QUFDbkUsV0FBVyxtQkFBTyxDQUFDLDhGQUEwQztBQUM3RCxXQUFXLG1CQUFPLENBQUMsOEZBQTBDO0FBQzdELGNBQWMsbUJBQU8sQ0FBQyxvR0FBNkM7QUFDbkU7O0FBRUE7QUFDQSxjQUFjLG1CQUFPLENBQUMsOEZBQTBDO0FBQ2hFOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCO0FBQ3JCLHFCQUFxQjs7QUFFckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsaUNBQWlDO0FBQ2pDLGlDQUFpQzs7O0FBR2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsMkRBQTJEO0FBQzNELDJEQUEyRDs7O0FBRzNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOzs7QUFHQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTs7O0FBR0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBLHVDQUF1QztBQUN2QztBQUNBOztBQUVBOzs7QUFHQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7OztBQUdBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0RBQWtEOztBQUVsRDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGlCQUFpQiwwQ0FBMEM7QUFDM0Q7QUFDQSwyQ0FBMkMsMkNBQTJDOztBQUV0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUyxzREFBc0Q7QUFDL0Q7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLLDBDQUEwQztBQUMvQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7OztBQUdIOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTs7O0FBR0E7O0FBRUE7QUFDQTs7O0FBR0E7OztBQUdBOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOzs7QUFHQTs7QUFFQTs7O0FBR0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLLEdBQUcsMkNBQTJDO0FBQ25EOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtFQUErRSxxQ0FBcUM7QUFDcEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUssR0FBRyxxQ0FBcUM7QUFDN0M7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0NBQWtDLGFBQWE7QUFDL0M7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLG1DQUFtQyxhQUFhO0FBQ2hEOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3Qzs7QUFFeEM7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHNEQUFzRDtBQUN0RCxzREFBc0Q7QUFDdEQsT0FBTztBQUNQO0FBQ0Esc0RBQXNEO0FBQ3RELE9BQU87QUFDUCxzREFBc0Q7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7QUFHQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLGlDQUFpQzs7QUFFakM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixzQkFBc0Isc0JBQXNCLFdBQVcsWUFBWTtBQUMzRjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHNCQUFzQixzQkFBc0IsV0FBVyxZQUFZO0FBQzlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isc0JBQXNCLHNCQUFzQixXQUFXLFlBQVk7QUFDM0Y7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHNCQUFzQixzQkFBc0IsV0FBVyxZQUFZO0FBQzlGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsOEJBQThCO0FBQzlCLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsMkJBQTJCO0FBQzVFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCw4QkFBOEI7QUFDOUIscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTyxnREFBZ0Q7O0FBRXZELEdBQUc7QUFDSDtBQUNBLE9BQU8sbUNBQW1DO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxjQUFjLHdCQUF3QixvQkFBb0IsYUFBYSxlQUFlLGVBQWU7QUFDbEs7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTs7Ozs7Ozs7Ozs7QUNudEdBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLHVDOzs7Ozs7Ozs7O0FDekNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7O0FBRUEsc0M7Ozs7Ozs7Ozs7QUNSQSxrQkFBa0IsbUJBQU8sQ0FBQyxxRUFBYztBQUN4Qyw0QkFBNEIsbUJBQU8sQ0FBQyxxRUFBd0I7QUFDNUQsNkJBQTZCLG1CQUFPLENBQUMsK0VBQTZCO0FBQ2xFLDJCQUEyQixtQkFBTyxDQUFDLDJFQUEyQjs7QUFFOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QiwrQ0FBK0M7QUFDN0U7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCw0QkFBNEI7QUFDL0U7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsaUJBQWlCLGlCQUFpQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2paQSx1QkFBdUIsbUJBQU8sQ0FBQyxtRUFBdUI7QUFDdEQsc0JBQXNCLG1CQUFPLENBQUMsaUVBQXNCOztBQUVwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDbklBLGNBQWMsbUJBQU8sQ0FBQyxtREFBcUI7QUFDM0MsNEJBQTRCLG1CQUFPLENBQUMscUVBQXdCOztBQUU1RDs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxZQUFZLHlCQUF5QjtBQUN0RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdDOzs7Ozs7Ozs7O0FDckRBLFVBQVUscUJBQXFCO0FBQy9CO0FBQ0EsV0FBVyxtQkFBTyxDQUFDLG1DQUFXO0FBQzlCOzs7Ozs7Ozs7Ozs7QUNIQSxtQkFBTyxDQUFDLG1GQUEyQjtBQUNuQyxxQkFBcUIsbUJBQU8sQ0FBQyxvRUFBK0I7OztBQUc1RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDs7QUFFQTs7QUFFQTtBQUNBLDRCQUE0QjtBQUM1Qjs7QUFFQTs7O0FBR0E7QUFDQTs7QUFFQSxnRUFBZ0U7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFEQUFxRDs7QUFFckQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHNEQUFzRDs7QUFFdEQ7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSw0Q0FBNEM7O0FBRTVDOztBQUVBOztBQUVBLDZCQUE2Qjs7QUFFN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0EscUZBQXFGLGtCQUFrQjs7QUFFdkc7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7OztBQUdBLHVCQUF1Qjs7Ozs7Ozs7Ozs7QUM5UXZCLG1CQUFPLENBQUMsNkVBQXdCOztBQUVoQzs7O0FBR0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7O0FBR0E7O0FBRUE7QUFDQSw2QkFBNkI7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7O0FBRUE7OztBQUdBOzs7QUFHQSx1QkFBdUI7Ozs7Ozs7Ozs7O0FDcEl2QixtQkFBTyxDQUFDLG1GQUEyQjs7QUFFbkM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQTs7QUFFQTtBQUNBLDZCQUE2Qjs7QUFFN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBOzs7QUFHQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQSx1QkFBdUI7Ozs7Ozs7Ozs7O0FDL1V2Qjs7O0FBR0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSw2QkFBNkI7O0FBRTdCOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7O0FBR0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTs7O0FBR0E7QUFDQTs7O0FBR0EsdUJBQXVCOzs7Ozs7Ozs7OztBQ2pJdkIsbUJBQU8sQ0FBQyxtRkFBMkI7QUFDbkMscUJBQXFCLG1CQUFPLENBQUMsb0VBQStCOztBQUU1RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsNEJBQTRCO0FBQzVCOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsaURBQWlEO0FBQ2pELG9EQUFvRDtBQUNwRDtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBLHNEQUFzRDtBQUN0RCxvREFBb0Q7QUFDcEQsb0RBQW9EO0FBQ3BEO0FBQ0E7QUFDQSxnQ0FBZ0MsWUFBWSwwQkFBMEI7O0FBRXRFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxxREFBcUQsWUFBWSxVQUFVOztBQUUzRTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHVCQUF1Qjs7Ozs7Ozs7Ozs7QUMzT3ZCLGtCQUFrQixtQkFBTyxDQUFDLHFFQUFjOztBQUV4Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLHlGQUF5RjtBQUM1Rzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsOEJBQThCOzs7Ozs7Ozs7OztBQ2xFOUIsYUFBYSxtQkFBTyxDQUFDLDBDQUFhOztBQUVsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLG9DQUFvQztBQUN2RSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPOzs7QUFHUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7OztBQUdBLEdBQUc7O0FBRUgsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7Ozs7Ozs7Ozs7O0FDM1lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLHlCOzs7Ozs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBFQUEwRSxTQUFTO0FBQ25GO0FBQ0EsYUFBYTtBQUNiLHdEQUF3RDtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUEsMkJBQTJCOzs7Ozs7Ozs7Ozs7QUNqRWQ7O0FBRWIsNEJBQTRCLG1CQUFPLENBQUMsd0VBQTRCO0FBQ2hFLGFBQWEsbUJBQU8sQ0FBQyx1Q0FBZTtBQUNwQyxrQkFBa0IsbUJBQU8sQ0FBQyxxRUFBYztBQUN4QywwQkFBMEIsbUJBQU8sQ0FBQyxnR0FBdUI7O0FBRXpEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLHlDQUF5QztBQUNoRDs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQSxnQ0FBZ0MseUJBQXlCO0FBQ3pEO0FBQ0E7QUFDQSxnREFBZ0QseUJBQXlCO0FBQ3pFOztBQUVBLElBQUk7OztBQUdKOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0Esb0JBQW9CLHdCQUF3QjtBQUM1QyxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBZ0MseUJBQXlCO0FBQ3pEO0FBQ0E7QUFDQSxnREFBZ0QseUJBQXlCO0FBQ3pFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixzREFBc0Q7QUFDdkU7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGdDQUFnQyxtQkFBbUI7QUFDbkQ7QUFDQTtBQUNBLDBDQUEwQyxtQkFBbUI7QUFDN0Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOzs7QUFHQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnRUFBZ0U7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7OztBQUd2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsdUJBQXVCO0FBQzFDO0FBQ0E7QUFDQSw4Q0FBOEMsdUJBQXVCO0FBQ3JFO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixxRUFBcUU7QUFDdEY7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7Ozs7O1VDNWdDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGdDQUFnQyxZQUFZO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsc0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJqc2ZyYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHNlbGYsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIi8qISBldmVudC1lbWl0dGVyKGh0dHBzOi8vZ2l0aHViLmNvbS9yaXZlcnN1bi9ldmVudC1lbWl0dGVyKSB2MS41LjAgQ29weXJpZ2h0IChjKSAyMDIwIHJpdmVyc3VuLm9yZ0BnbWFpbC5jb20gKi9cbiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwiRXZlbnRFbWl0dGVyXCIsW10sdCk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0cy5FdmVudEVtaXR0ZXI9dCgpOmUuRXZlbnRFbWl0dGVyPXQoKX0odGhpcywoZnVuY3Rpb24oKXtyZXR1cm4oKCk9PntcInVzZSBzdHJpY3RcIjt2YXIgZT17NTYxOihlLHQsbik9PntmdW5jdGlvbiByKGUsdCl7cmV0dXJuIGZ1bmN0aW9uKGUpe2lmKEFycmF5LmlzQXJyYXkoZSkpcmV0dXJuIGV9KGUpfHxmdW5jdGlvbihlLHQpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBTeW1ib2x8fCEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChlKSkpcmV0dXJuO3ZhciBuPVtdLHI9ITAsaT0hMSxvPXZvaWQgMDt0cnl7Zm9yKHZhciBzLHU9ZVtTeW1ib2wuaXRlcmF0b3JdKCk7IShyPShzPXUubmV4dCgpKS5kb25lKSYmKG4ucHVzaChzLnZhbHVlKSwhdHx8bi5sZW5ndGghPT10KTtyPSEwKTt9Y2F0Y2goZSl7aT0hMCxvPWV9ZmluYWxseXt0cnl7cnx8bnVsbD09dS5yZXR1cm58fHUucmV0dXJuKCl9ZmluYWxseXtpZihpKXRocm93IG99fXJldHVybiBufShlLHQpfHxvKGUsdCl8fGZ1bmN0aW9uKCl7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKX0oKX1mdW5jdGlvbiBpKGUsdCl7dmFyIG47aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFN5bWJvbHx8bnVsbD09ZVtTeW1ib2wuaXRlcmF0b3JdKXtpZihBcnJheS5pc0FycmF5KGUpfHwobj1vKGUpKXx8dCYmZSYmXCJudW1iZXJcIj09dHlwZW9mIGUubGVuZ3RoKXtuJiYoZT1uKTt2YXIgcj0wLGk9ZnVuY3Rpb24oKXt9O3JldHVybntzOmksbjpmdW5jdGlvbigpe3JldHVybiByPj1lLmxlbmd0aD97ZG9uZTohMH06e2RvbmU6ITEsdmFsdWU6ZVtyKytdfX0sZTpmdW5jdGlvbihlKXt0aHJvdyBlfSxmOml9fXRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gaXRlcmF0ZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKX12YXIgcyx1PSEwLGM9ITE7cmV0dXJue3M6ZnVuY3Rpb24oKXtuPWVbU3ltYm9sLml0ZXJhdG9yXSgpfSxuOmZ1bmN0aW9uKCl7dmFyIGU9bi5uZXh0KCk7cmV0dXJuIHU9ZS5kb25lLGV9LGU6ZnVuY3Rpb24oZSl7Yz0hMCxzPWV9LGY6ZnVuY3Rpb24oKXt0cnl7dXx8bnVsbD09bi5yZXR1cm58fG4ucmV0dXJuKCl9ZmluYWxseXtpZihjKXRocm93IHN9fX19ZnVuY3Rpb24gbyhlLHQpe2lmKGUpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiBlKXJldHVybiBzKGUsdCk7dmFyIG49T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpLnNsaWNlKDgsLTEpO3JldHVyblwiT2JqZWN0XCI9PT1uJiZlLmNvbnN0cnVjdG9yJiYobj1lLmNvbnN0cnVjdG9yLm5hbWUpLFwiTWFwXCI9PT1ufHxcIlNldFwiPT09bj9BcnJheS5mcm9tKGUpOlwiQXJndW1lbnRzXCI9PT1ufHwvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKT9zKGUsdCk6dm9pZCAwfX1mdW5jdGlvbiBzKGUsdCl7KG51bGw9PXR8fHQ+ZS5sZW5ndGgpJiYodD1lLmxlbmd0aCk7Zm9yKHZhciBuPTAscj1uZXcgQXJyYXkodCk7bjx0O24rKylyW25dPWVbbl07cmV0dXJuIHJ9ZnVuY3Rpb24gdShlLHQpe2lmKCEoZSBpbnN0YW5jZW9mIHQpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9ZnVuY3Rpb24gYyhlLHQpe2Zvcih2YXIgbj0wO248dC5sZW5ndGg7bisrKXt2YXIgcj10W25dO3IuZW51bWVyYWJsZT1yLmVudW1lcmFibGV8fCExLHIuY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIHImJihyLndyaXRhYmxlPSEwKSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxyLmtleSxyKX19ZnVuY3Rpb24gYShlLHQsbil7cmV0dXJuIHQmJmMoZS5wcm90b3R5cGUsdCksbiYmYyhlLG4pLGV9bi5kKHQse2RlZmF1bHQ6KCk9Pmx9KTt2YXIgbD1mdW5jdGlvbigpe2Z1bmN0aW9uIGUodCl7aWYodSh0aGlzLGUpLHRoaXMub25MaXN0ZW5lcnM9bmV3IE1hcCx0aGlzLm9ubHlMaXN0ZW5lcnM9bmV3IE1hcCx0KXt2YXIgbixyPWkodCk7dHJ5e2ZvcihyLnMoKTshKG49ci5uKCkpLmRvbmU7KXt2YXIgbz1uLnZhbHVlLHM9bmV3IGY7dGhpcy5vbkxpc3RlbmVycy5zZXQobyxzKX19Y2F0Y2goZSl7ci5lKGUpfWZpbmFsbHl7ci5mKCl9fXRoaXMuY2hpbGRFdmVudEVtaXR0ZXJzPVtdLHRoaXMub25JbnRlcmNlcHRlckZ1bmNzPXt9fXJldHVybiBhKGUsW3trZXk6XCJvblwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7dmFyIG49dGhpcy5vbkxpc3RlbmVycy5nZXQoZSk7aWYobnx8KG49bmV3IGYsdGhpcy5vbkxpc3RlbmVycy5zZXQoZSxuKSksbi5hZGRMaXN0ZW5lckZ1bmModCksdGhpcy5vbkludGVyY2VwdGVyRnVuY3MpZm9yKHZhciBpPTAsbz1PYmplY3QuZW50cmllcyh0aGlzLm9uSW50ZXJjZXB0ZXJGdW5jcyk7aTxvLmxlbmd0aDtpKyspe3ZhciBzPXIob1tpXSwyKSx1PXNbMF07KDAsc1sxXSkoe2V2ZW50VHlwZTplLGZ1bmM6dCxvbkludGVyY2VwdGVyRnVuY25hbWU6dX0pfX19LHtrZXk6XCJyZW1vdmVMaXN0ZW5lclwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7dmFyIG49dGhpcy5vbkxpc3RlbmVycy5nZXQoZSk7biYmbi5yZW1vdmVMaXN0ZW5lcih0KX19LHtrZXk6XCJvbmx5XCIsdmFsdWU6ZnVuY3Rpb24oZSx0LG4pe3ZhciByPXRoaXMub25seUxpc3RlbmVycy5nZXQoZSk7cnx8KHI9bmV3IGgsdGhpcy5vbmx5TGlzdGVuZXJzLnNldChlLHIpKSxyLnB1dExpc3RlbmVyRnVuYyh0LG4pfX0se2tleTpcInBpcGVcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLmNoaWxkRXZlbnRFbWl0dGVycy5wdXNoKGUpfX0se2tleTpcImVtaXRcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3ZhciBuPXRoaXMub25MaXN0ZW5lcnMuZ2V0KGUpO24mJih0LmV2ZW50VHlwZT1lLG4uY2FsbExpc3RlbmVyRnVuYyh0KSk7dmFyIHI9dGhpcy5vbmx5TGlzdGVuZXJzLmdldChlKTtyJiYodC5ldmVudFR5cGU9ZSxyLmNhbGxMaXN0ZW5lckZ1bmModCkpO3ZhciBvLHM9aSh0aGlzLmNoaWxkRXZlbnRFbWl0dGVycyk7dHJ5e2ZvcihzLnMoKTshKG89cy5uKCkpLmRvbmU7KXtvLnZhbHVlLmVtaXQoZSx0KX19Y2F0Y2goZSl7cy5lKGUpfWZpbmFsbHl7cy5mKCl9fX0se2tleTpcImdldEFsbExpc3RlbmVyc1wiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9e307dGhpcy5vbkxpc3RlbmVycy5mb3JFYWNoKChmdW5jdGlvbih0LG4pe3ZhciByPW4saT10LmdldEFsbExpc3RlbmVycygpO2Vbcl18fChlW3JdPXt9KSxlW3JdLmxpc3RlbmVycz1pfSkpO3ZhciB0LG49MCxyPWkodGhpcy5jaGlsZEV2ZW50RW1pdHRlcnMpO3RyeXtmb3Ioci5zKCk7ISh0PXIubigpKS5kb25lOyl7dC52YWx1ZS5vbkxpc3RlbmVycy5mb3JFYWNoKChmdW5jdGlvbih0LHIpe3ZhciBpPXIsbz10LmdldEFsbExpc3RlbmVycygpO2VbaV18fChlW2ldPXt9KSxlW2ldLmNoaWxkRXZlbnRFbWl0dGVyc3x8KGVbaV0uY2hpbGRFdmVudEVtaXR0ZXJzPVtdKSxlW2ldLmNoaWxkRXZlbnRFbWl0dGVycy5wdXNoKHtjaGlsZEVtaXR0ZXJJZHg6bixsaXN0ZW5lcnM6b30pfSkpLG4rK319Y2F0Y2goZSl7ci5lKGUpfWZpbmFsbHl7ci5mKCl9cmV0dXJuIGV9fSx7a2V5OlwiaGFzTGlzdGVuZXJGdW5jc1wiLHZhbHVlOmZ1bmN0aW9uKGUpe2lmKHRoaXMub25MaXN0ZW5lcnMuaGFzKGUpKXt2YXIgdD10aGlzLm9uTGlzdGVuZXJzLmdldChlKTtpZih0JiZ0Lmhhc0xpc3RlbmVyRnVuYygpKXJldHVybiEwfXZhciBuLHI9aSh0aGlzLmNoaWxkRXZlbnRFbWl0dGVycyk7dHJ5e2ZvcihyLnMoKTshKG49ci5uKCkpLmRvbmU7KXtpZihuLnZhbHVlLmhhc0xpc3RlbmVyRnVuY3MoZSkpcmV0dXJuITB9fWNhdGNoKGUpe3IuZShlKX1maW5hbGx5e3IuZigpfXJldHVybiExfX0se2tleTpcImNsZWFyQWxsXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZSx0PWkodGhpcy5vbkxpc3RlbmVycy52YWx1ZXMoKSk7dHJ5e2Zvcih0LnMoKTshKGU9dC5uKCkpLmRvbmU7KXtlLnZhbHVlLmNsZWFyQWxsKCl9fWNhdGNoKGUpe3QuZShlKX1maW5hbGx5e3QuZigpfXRoaXMub25MaXN0ZW5lcnMuY2xlYXIoKTt2YXIgbixyPWkodGhpcy5vbmx5TGlzdGVuZXJzLnZhbHVlcygpKTt0cnl7Zm9yKHIucygpOyEobj1yLm4oKSkuZG9uZTspe24udmFsdWUuY2xlYXJBbGwoKX19Y2F0Y2goZSl7ci5lKGUpfWZpbmFsbHl7ci5mKCl9dGhpcy5vbmx5TGlzdGVuZXJzLmNsZWFyKCksdGhpcy5jaGlsZEV2ZW50RW1pdHRlcnM9W119fSx7a2V5OlwiYWRkT25JbnRlcmNlcHRlckZ1bmNcIix2YWx1ZTpmdW5jdGlvbihlLHQpe2lmKHRoaXMub25JbnRlcmNlcHRlckZ1bmNzW2VdKXRocm93IEVycm9yKCdBbHdheXMgcmVnaXN0ZXJlZCBpbnRlcmNlcHRlciBmdW5jIFwiJy5jb25jYXQoZSwnXCIuJykpO3RoaXMub25JbnRlcmNlcHRlckZ1bmNzW2VdPXR9fSx7a2V5OlwicmVtb3ZlT25JbnRlcmNlcHRlckZ1bmNcIix2YWx1ZTpmdW5jdGlvbihlKXtkZWxldGUgdGhpcy5vbkludGVyY2VwdGVyRnVuY3NbZV19fSx7a2V5OlwiZ2V0QWxsT25JbnRlcmNlcHRlckZ1bmNzXCIsdmFsdWU6ZnVuY3Rpb24oKXtmb3IodmFyIGU9W10sdD0wLG49T2JqZWN0LmVudHJpZXModGhpcy5vbkludGVyY2VwdGVyRnVuY3MpO3Q8bi5sZW5ndGg7dCsrKXt2YXIgaT1yKG5bdF0sMiksbz1pWzBdLHM9aVsxXTtlLnB1c2goe2Z1bmNOYW1lOm8sZnVuYzpzfSl9cmV0dXJuIGV9fV0pLGV9KCksZj1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoKXt1KHRoaXMsZSksdGhpcy5saXN0ZW5lckZ1bmNzPVtdfXJldHVybiBhKGUsW3trZXk6XCJjbGVhckFsbFwiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5saXN0ZW5lckZ1bmNzPVtdfX0se2tleTpcImdldEFsbExpc3RlbmVyc1wiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubGlzdGVuZXJGdW5jc319LHtrZXk6XCJoYXNMaXN0ZW5lckZ1bmNcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmxpc3RlbmVyRnVuY3MubGVuZ3RoPjB9fSx7a2V5OlwiYWRkTGlzdGVuZXJGdW5jXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5saXN0ZW5lckZ1bmNzLnB1c2goZSl9fSx7a2V5OlwiY2FsbExpc3RlbmVyRnVuY1wiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0LG49aSh0aGlzLmxpc3RlbmVyRnVuY3MpO3RyeXtmb3Iobi5zKCk7ISh0PW4ubigpKS5kb25lOyl7dmFyIHI9dC52YWx1ZTtpZihcIkZ1bmN0aW9uXCIhPT10aGlzLnR5cGVPZihyKSl0aHJvdyBFcnJvcignW0ByaXZlcnN1bi9ldmVudC1lbWl0dGVyXSBsaXN0ZW5lckZ1bmN0aW9uIHlvdSBzZXQgaXMgbm90IGEgZnVuY3Rpb24uIGxpc3RlbmVyRnVuY3Rpb246XCInLmNvbmNhdChyLCdcIi5DaGVjayBhcmdzIG9mICNvbmx5IG1ldGhvZCBvciAjb24gbWV0aG9kLicpKTtyKGUpfX1jYXRjaChlKXtuLmUoZSl9ZmluYWxseXtuLmYoKX19fSx7a2V5OlwicmVtb3ZlTGlzdGVuZXJcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLnJlbW92ZUFycmF5SXRlbU9uY2UodGhpcy5saXN0ZW5lckZ1bmNzLGUpfX0se2tleTpcInJlbW92ZUFycmF5SXRlbU9uY2VcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3ZhciBuPWUuaW5kZXhPZih0KTtyZXR1cm4gbj4tMSYmZS5zcGxpY2UobiwxKSxlfX0se2tleTpcInR5cGVPZlwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSkuc2xpY2UoOCwtMSl9fV0pLGV9KCksaD1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoKXt1KHRoaXMsZSksdGhpcy5saXN0ZW5lckZ1bmNNYXA9bmV3IE1hcH1yZXR1cm4gYShlLFt7a2V5OlwiY2xlYXJBbGxcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMubGlzdGVuZXJGdW5jTWFwLmNsZWFyKCl9fSx7a2V5OlwiaGFzTGlzdGVuZXJGdW5jXCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMubGlzdGVuZXJGdW5jTWFwLmhhcyhlKX19LHtrZXk6XCJwdXRMaXN0ZW5lckZ1bmNcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3RoaXMubGlzdGVuZXJGdW5jTWFwLnNldChlLHQpfX0se2tleTpcImNhbGxMaXN0ZW5lckZ1bmNcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdCxuPWkodGhpcy5saXN0ZW5lckZ1bmNNYXAudmFsdWVzKCkpO3RyeXtmb3Iobi5zKCk7ISh0PW4ubigpKS5kb25lOyl7dmFyIHI9dC52YWx1ZTtpZihcIkZ1bmN0aW9uXCIhPT10aGlzLnR5cGVPZihyKSl0aHJvdyBFcnJvcignW0ByaXZlcnN1bi9ldmVudC1lbWl0dGVyXSBsaXN0ZW5lckZ1bmN0aW9uIHlvdSBzZXQgaXMgbm90IGEgZnVuY3Rpb24uIGxpc3RlbmVyRnVuY3Rpb246XCInLmNvbmNhdChyLCdcIi5DaGVjayBhcmdzIG9mICNvbmx5IG1ldGhvZCBvciAjb24gbWV0aG9kLicpKTtyKGUpfX1jYXRjaChlKXtuLmUoZSl9ZmluYWxseXtuLmYoKX19fSx7a2V5OlwidHlwZU9mXCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKS5zbGljZSg4LC0xKX19XSksZX0oKX19LHQ9e307ZnVuY3Rpb24gbihyKXtpZih0W3JdKXJldHVybiB0W3JdLmV4cG9ydHM7dmFyIGk9dFtyXT17ZXhwb3J0czp7fX07cmV0dXJuIGVbcl0oaSxpLmV4cG9ydHMsbiksaS5leHBvcnRzfXJldHVybiBuLmQ9KGUsdCk9Pntmb3IodmFyIHIgaW4gdCluLm8odCxyKSYmIW4ubyhlLHIpJiZPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxyLHtlbnVtZXJhYmxlOiEwLGdldDp0W3JdfSl9LG4ubz0oZSx0KT0+T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCksbig1NjEpfSkoKS5kZWZhdWx0fSkpOyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLmpzZnJhbWUtdGl0bGViYXItZGVmYXVsdCB7XFxuICAgIGJhY2tncm91bmQ6IC13ZWJraXQtZ3JhZGllbnQobGluZWFyLCBsZWZ0IHRvcCwgbGVmdCBib3R0b20sIGNvbG9yLXN0b3AoMC4wLCAjZjVmNWY1LCBjb2xvci1zdG9wKDEuMCwgI2Y4ZjdmMikpKTtcXG4gICAgYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLCAjZjVmNWY1LCAjZjhmN2YyKTtcXG4gICAgYmFja2dyb3VuZDogLW1vei1saW5lYXItZ3JhZGllbnQodG9wLCAjZjVmNWY1LCAjZjhmN2YyKTtcXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvcCwgI2Y1ZjVmNSwgI2Y4ZjdmMik7XFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDZweDtcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDZweDtcXG59XFxuXFxuLmpzZnJhbWUtdGl0bGViYXItZm9jdXNlZCB7XFxuICAgIC8qIChjKTIwMTUgSm9oYW5uZXMgSmFrb2JcXG4gICAgICAgTWFkZSB3aXRoIDwzIGluIEdlcm1hbnkgKi9cXG4gICAgYmFja2dyb3VuZDogLXdlYmtpdC1ncmFkaWVudChsaW5lYXIsIGxlZnQgdG9wLCBsZWZ0IGJvdHRvbSwgY29sb3Itc3RvcCgwLjAsICNlYmViZWIsIGNvbG9yLXN0b3AoMS4wLCAjZDVkNWQ1KSkpO1xcbiAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICNlYmViZWIsICNkNWQ1ZDUpO1xcbiAgICBiYWNrZ3JvdW5kOiAtbW96LWxpbmVhci1ncmFkaWVudCh0b3AsICNlYmViZWIsICNkNWQ1ZDUpO1xcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG9wLCAjZWJlYmViLCAjZDVkNWQ1KTtcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNnB4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNnB4O1xcbn1cXG5cXG4uanNmcmFtZS1tb2RhbC13aW5kb3ctYmFja2dyb3VuZCB7XFxuICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC42KTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICB3aWRkdGg6IDEwMCVcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL0pTRnJhbWUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksK0dBQStHO0lBQy9HLDBEQUEwRDtJQUMxRCx1REFBdUQ7SUFDdkQsa0RBQWtEO0lBQ2xELDJCQUEyQjtJQUMzQiw0QkFBNEI7QUFDaEM7O0FBRUE7SUFDSTtnQ0FDNEI7SUFDNUIsK0dBQStHO0lBQy9HLDBEQUEwRDtJQUMxRCx1REFBdUQ7SUFDdkQsa0RBQWtEO0lBQ2xELDJCQUEyQjtJQUMzQiw0QkFBNEI7QUFDaEM7O0FBRUE7SUFDSSw4QkFBOEI7SUFDOUIsWUFBWTtJQUNaO0FBQ0pcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmpzZnJhbWUtdGl0bGViYXItZGVmYXVsdCB7XFxuICAgIGJhY2tncm91bmQ6IC13ZWJraXQtZ3JhZGllbnQobGluZWFyLCBsZWZ0IHRvcCwgbGVmdCBib3R0b20sIGNvbG9yLXN0b3AoMC4wLCAjZjVmNWY1LCBjb2xvci1zdG9wKDEuMCwgI2Y4ZjdmMikpKTtcXG4gICAgYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLCAjZjVmNWY1LCAjZjhmN2YyKTtcXG4gICAgYmFja2dyb3VuZDogLW1vei1saW5lYXItZ3JhZGllbnQodG9wLCAjZjVmNWY1LCAjZjhmN2YyKTtcXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvcCwgI2Y1ZjVmNSwgI2Y4ZjdmMik7XFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDZweDtcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDZweDtcXG59XFxuXFxuLmpzZnJhbWUtdGl0bGViYXItZm9jdXNlZCB7XFxuICAgIC8qIChjKTIwMTUgSm9oYW5uZXMgSmFrb2JcXG4gICAgICAgTWFkZSB3aXRoIDwzIGluIEdlcm1hbnkgKi9cXG4gICAgYmFja2dyb3VuZDogLXdlYmtpdC1ncmFkaWVudChsaW5lYXIsIGxlZnQgdG9wLCBsZWZ0IGJvdHRvbSwgY29sb3Itc3RvcCgwLjAsICNlYmViZWIsIGNvbG9yLXN0b3AoMS4wLCAjZDVkNWQ1KSkpO1xcbiAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICNlYmViZWIsICNkNWQ1ZDUpO1xcbiAgICBiYWNrZ3JvdW5kOiAtbW96LWxpbmVhci1ncmFkaWVudCh0b3AsICNlYmViZWIsICNkNWQ1ZDUpO1xcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG9wLCAjZWJlYmViLCAjZDVkNWQ1KTtcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNnB4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNnB4O1xcbn1cXG5cXG4uanNmcmFtZS1tb2RhbC13aW5kb3ctYmFja2dyb3VuZCB7XFxuICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC42KTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICB3aWRkdGg6IDEwMCVcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLmpzZnJhbWUtcHJlc2V0LXN0eWxlLW1hdGVyaWFsLWRlZmF1bHQge1xcbiAgICBiYWNrZ3JvdW5kOiBibGFjaztcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNnB4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNnB4O1xcbn1cXG5cXG4uanNmcmFtZS1wcmVzZXQtc3R5bGUtbWF0ZXJpYWwtZm9jdXNlZCB7XFxuICAgIGJhY2tncm91bmQ6IGJsYWNrO1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAzNnB4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMzZweDtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3ByZXNldHMvYXBwZWFyYW5jZS9QcmVzZXRTdHlsZU1hdGVyaWFsLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLGlCQUFpQjtJQUNqQiwyQkFBMkI7SUFDM0IsNEJBQTRCO0FBQ2hDOztBQUVBO0lBQ0ksaUJBQWlCO0lBQ2pCLDRCQUE0QjtJQUM1Qiw2QkFBNkI7QUFDakNcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmpzZnJhbWUtcHJlc2V0LXN0eWxlLW1hdGVyaWFsLWRlZmF1bHQge1xcbiAgICBiYWNrZ3JvdW5kOiBibGFjaztcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNnB4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNnB4O1xcbn1cXG5cXG4uanNmcmFtZS1wcmVzZXQtc3R5bGUtbWF0ZXJpYWwtZm9jdXNlZCB7XFxuICAgIGJhY2tncm91bmQ6IGJsYWNrO1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAzNnB4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMzZweDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLmpzZnJhbWUtcHJlc2V0LXN0eWxlLXBvcHVwLWRlZmF1bHQge1xcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMHB4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMHB4O1xcbn1cXG5cXG4uanNmcmFtZS1wcmVzZXQtc3R5bGUtcG9wdXAtZm9jdXNlZCB7XFxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwcHg7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAwcHg7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9wcmVzZXRzL2FwcGVhcmFuY2UvUHJlc2V0U3R5bGVQb3B1cC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxpQkFBaUI7SUFDakIsMkJBQTJCO0lBQzNCLDRCQUE0QjtBQUNoQzs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQiwyQkFBMkI7SUFDM0IsNEJBQTRCO0FBQ2hDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5qc2ZyYW1lLXByZXNldC1zdHlsZS1wb3B1cC1kZWZhdWx0IHtcXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDBweDtcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDBweDtcXG59XFxuXFxuLmpzZnJhbWUtcHJlc2V0LXN0eWxlLXBvcHVwLWZvY3VzZWQge1xcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMHB4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMHB4O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIuanNmcmFtZS1wcmVzZXQtc3R5bGUtcmVkc3RvbmUtZGVmYXVsdCB7XFxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwcHg7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAwcHg7XFxufVxcblxcbi5qc2ZyYW1lLXByZXNldC1zdHlsZS1yZWRzdG9uZS1mb2N1c2VkIHtcXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDBweDtcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDBweDtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3ByZXNldHMvYXBwZWFyYW5jZS9QcmVzZXRTdHlsZVJlZHN0b25lLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLGlCQUFpQjtJQUNqQiwyQkFBMkI7SUFDM0IsNEJBQTRCO0FBQ2hDOztBQUVBO0lBQ0ksaUJBQWlCO0lBQ2pCLDJCQUEyQjtJQUMzQiw0QkFBNEI7QUFDaENcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmpzZnJhbWUtcHJlc2V0LXN0eWxlLXJlZHN0b25lLWRlZmF1bHQge1xcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMHB4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMHB4O1xcbn1cXG5cXG4uanNmcmFtZS1wcmVzZXQtc3R5bGUtcmVkc3RvbmUtZm9jdXNlZCB7XFxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwcHg7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAwcHg7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi5qc2ZyYW1lLXByZXNldC1zdHlsZS15b3NlbWl0ZS1kZWZhdWx0IHtcXG4gICAgYmFja2dyb3VuZDogLXdlYmtpdC1ncmFkaWVudChsaW5lYXIsIGxlZnQgdG9wLCBsZWZ0IGJvdHRvbSwgY29sb3Itc3RvcCgwLjAsICNmNWY1ZjUsIGNvbG9yLXN0b3AoMS4wLCAjZjhmN2YyKSkpO1xcbiAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICNmNWY1ZjUsICNmOGY3ZjIpO1xcbiAgICBiYWNrZ3JvdW5kOiAtbW96LWxpbmVhci1ncmFkaWVudCh0b3AsICNmNWY1ZjUsICNmOGY3ZjIpO1xcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG9wLCAjZjVmNWY1LCAjZjhmN2YyKTtcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNnB4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNnB4O1xcbn1cXG5cXG4uanNmcmFtZS1wcmVzZXQtc3R5bGUteW9zZW1pdGUtZm9jdXNlZCB7XFxuICAgIC8qIChjKTIwMTUgSm9oYW5uZXMgSmFrb2JcXG4gICAgICAgTWFkZSB3aXRoIDwzIGluIEdlcm1hbnkgKi9cXG4gICAgYmFja2dyb3VuZDogLXdlYmtpdC1ncmFkaWVudChsaW5lYXIsIGxlZnQgdG9wLCBsZWZ0IGJvdHRvbSwgY29sb3Itc3RvcCgwLjAsICNlYmViZWIsIGNvbG9yLXN0b3AoMS4wLCAjZDVkNWQ1KSkpO1xcbiAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICNlYmViZWIsICNkNWQ1ZDUpO1xcbiAgICBiYWNrZ3JvdW5kOiAtbW96LWxpbmVhci1ncmFkaWVudCh0b3AsICNlYmViZWIsICNkNWQ1ZDUpO1xcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG9wLCAjZWJlYmViLCAjZDVkNWQ1KTtcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNnB4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNnB4O1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvcHJlc2V0cy9hcHBlYXJhbmNlL1ByZXNldFN0eWxlWW9zZW1pdGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksK0dBQStHO0lBQy9HLDBEQUEwRDtJQUMxRCx1REFBdUQ7SUFDdkQsa0RBQWtEO0lBQ2xELDJCQUEyQjtJQUMzQiw0QkFBNEI7QUFDaEM7O0FBRUE7SUFDSTtnQ0FDNEI7SUFDNUIsK0dBQStHO0lBQy9HLDBEQUEwRDtJQUMxRCx1REFBdUQ7SUFDdkQsa0RBQWtEO0lBQ2xELDJCQUEyQjtJQUMzQiw0QkFBNEI7QUFDaENcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmpzZnJhbWUtcHJlc2V0LXN0eWxlLXlvc2VtaXRlLWRlZmF1bHQge1xcbiAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWdyYWRpZW50KGxpbmVhciwgbGVmdCB0b3AsIGxlZnQgYm90dG9tLCBjb2xvci1zdG9wKDAuMCwgI2Y1ZjVmNSwgY29sb3Itc3RvcCgxLjAsICNmOGY3ZjIpKSk7XFxuICAgIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgI2Y1ZjVmNSwgI2Y4ZjdmMik7XFxuICAgIGJhY2tncm91bmQ6IC1tb3otbGluZWFyLWdyYWRpZW50KHRvcCwgI2Y1ZjVmNSwgI2Y4ZjdmMik7XFxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0b3AsICNmNWY1ZjUsICNmOGY3ZjIpO1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA2cHg7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA2cHg7XFxufVxcblxcbi5qc2ZyYW1lLXByZXNldC1zdHlsZS15b3NlbWl0ZS1mb2N1c2VkIHtcXG4gICAgLyogKGMpMjAxNSBKb2hhbm5lcyBKYWtvYlxcbiAgICAgICBNYWRlIHdpdGggPDMgaW4gR2VybWFueSAqL1xcbiAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWdyYWRpZW50KGxpbmVhciwgbGVmdCB0b3AsIGxlZnQgYm90dG9tLCBjb2xvci1zdG9wKDAuMCwgI2ViZWJlYiwgY29sb3Itc3RvcCgxLjAsICNkNWQ1ZDUpKSk7XFxuICAgIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgI2ViZWJlYiwgI2Q1ZDVkNSk7XFxuICAgIGJhY2tncm91bmQ6IC1tb3otbGluZWFyLWdyYWRpZW50KHRvcCwgI2ViZWJlYiwgI2Q1ZDVkNSk7XFxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0b3AsICNlYmViZWIsICNkNWQ1ZDUpO1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA2cHg7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA2cHg7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGNvbnRlbnQsIFwifVwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbignJyk7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSwgZGVkdXBlKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCAnJ11dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbW9kdWxlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2ldKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250aW51ZVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsyXSA9IFwiXCIuY29uY2F0KG1lZGlhUXVlcnksIFwiIGFuZCBcIikuY29uY2F0KGl0ZW1bMl0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSkge1xuICB2YXIgX2l0ZW0gPSBfc2xpY2VkVG9BcnJheShpdGVtLCA0KSxcbiAgICAgIGNvbnRlbnQgPSBfaXRlbVsxXSxcbiAgICAgIGNzc01hcHBpbmcgPSBfaXRlbVszXTtcblxuICBpZiAodHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgJycpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn07IiwiLyohIGV2ZW50LWxpc3RlbmVyLWhlbHBlcihodHRwczovL2dpdGh1Yi5jb20vcml2ZXJzdW4vZXZlbnQtbGlzdGVuZXItaGVscGVyKSB2MS4xLjIgQ29weXJpZ2h0IChjKSAyMDIwIHJpdmVyc3VuLm9yZ0BnbWFpbC5jb20gKi9cbiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwiRXZlbnRMaXN0ZW5lckhlbHBlclwiLFtdLHQpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHMuRXZlbnRMaXN0ZW5lckhlbHBlcj10KCk6ZS5FdmVudExpc3RlbmVySGVscGVyPXQoKX0odGhpcywoZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSl7dmFyIHQ9e307ZnVuY3Rpb24gbihyKXtpZih0W3JdKXJldHVybiB0W3JdLmV4cG9ydHM7dmFyIGk9dFtyXT17aTpyLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIGVbcl0uY2FsbChpLmV4cG9ydHMsaSxpLmV4cG9ydHMsbiksaS5sPSEwLGkuZXhwb3J0c31yZXR1cm4gbi5tPWUsbi5jPXQsbi5kPWZ1bmN0aW9uKGUsdCxyKXtuLm8oZSx0KXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6cn0pfSxuLnI9ZnVuY3Rpb24oZSl7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbCYmU3ltYm9sLnRvU3RyaW5nVGFnJiZPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxTeW1ib2wudG9TdHJpbmdUYWcse3ZhbHVlOlwiTW9kdWxlXCJ9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KX0sbi50PWZ1bmN0aW9uKGUsdCl7aWYoMSZ0JiYoZT1uKGUpKSw4JnQpcmV0dXJuIGU7aWYoNCZ0JiZcIm9iamVjdFwiPT10eXBlb2YgZSYmZSYmZS5fX2VzTW9kdWxlKXJldHVybiBlO3ZhciByPU9iamVjdC5jcmVhdGUobnVsbCk7aWYobi5yKHIpLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyLFwiZGVmYXVsdFwiLHtlbnVtZXJhYmxlOiEwLHZhbHVlOmV9KSwyJnQmJlwic3RyaW5nXCIhPXR5cGVvZiBlKWZvcih2YXIgaSBpbiBlKW4uZChyLGksZnVuY3Rpb24odCl7cmV0dXJuIGVbdF19LmJpbmQobnVsbCxpKSk7cmV0dXJuIHJ9LG4ubj1mdW5jdGlvbihlKXt2YXIgdD1lJiZlLl9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gZS5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiBlfTtyZXR1cm4gbi5kKHQsXCJhXCIsdCksdH0sbi5vPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpfSxuLnA9XCIvXCIsbihuLnM9MCl9KFtmdW5jdGlvbihlLHQsbil7ZS5leHBvcnRzPW4oMSl9LGZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe3JldHVybihyPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbihlKXtyZXR1cm4gdHlwZW9mIGV9OmZ1bmN0aW9uKGUpe3JldHVybiBlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJmUuY29uc3RydWN0b3I9PT1TeW1ib2wmJmUhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIGV9KShlKX1mdW5jdGlvbiBpKGUsdCl7cmV0dXJuIGZ1bmN0aW9uKGUpe2lmKEFycmF5LmlzQXJyYXkoZSkpcmV0dXJuIGV9KGUpfHxmdW5jdGlvbihlLHQpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBTeW1ib2x8fCEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChlKSkpcmV0dXJuO3ZhciBuPVtdLHI9ITAsaT0hMSxvPXZvaWQgMDt0cnl7Zm9yKHZhciBhLHM9ZVtTeW1ib2wuaXRlcmF0b3JdKCk7IShyPShhPXMubmV4dCgpKS5kb25lKSYmKG4ucHVzaChhLnZhbHVlKSwhdHx8bi5sZW5ndGghPT10KTtyPSEwKTt9Y2F0Y2goZSl7aT0hMCxvPWV9ZmluYWxseXt0cnl7cnx8bnVsbD09cy5yZXR1cm58fHMucmV0dXJuKCl9ZmluYWxseXtpZihpKXRocm93IG99fXJldHVybiBufShlLHQpfHxhKGUsdCl8fGZ1bmN0aW9uKCl7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKX0oKX1mdW5jdGlvbiBvKGUsdCl7dmFyIG47aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFN5bWJvbHx8bnVsbD09ZVtTeW1ib2wuaXRlcmF0b3JdKXtpZihBcnJheS5pc0FycmF5KGUpfHwobj1hKGUpKXx8dCYmZSYmXCJudW1iZXJcIj09dHlwZW9mIGUubGVuZ3RoKXtuJiYoZT1uKTt2YXIgcj0wLGk9ZnVuY3Rpb24oKXt9O3JldHVybntzOmksbjpmdW5jdGlvbigpe3JldHVybiByPj1lLmxlbmd0aD97ZG9uZTohMH06e2RvbmU6ITEsdmFsdWU6ZVtyKytdfX0sZTpmdW5jdGlvbihlKXt0aHJvdyBlfSxmOml9fXRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gaXRlcmF0ZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKX12YXIgbyxzPSEwLGw9ITE7cmV0dXJue3M6ZnVuY3Rpb24oKXtuPWVbU3ltYm9sLml0ZXJhdG9yXSgpfSxuOmZ1bmN0aW9uKCl7dmFyIGU9bi5uZXh0KCk7cmV0dXJuIHM9ZS5kb25lLGV9LGU6ZnVuY3Rpb24oZSl7bD0hMCxvPWV9LGY6ZnVuY3Rpb24oKXt0cnl7c3x8bnVsbD09bi5yZXR1cm58fG4ucmV0dXJuKCl9ZmluYWxseXtpZihsKXRocm93IG99fX19ZnVuY3Rpb24gYShlLHQpe2lmKGUpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiBlKXJldHVybiBzKGUsdCk7dmFyIG49T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpLnNsaWNlKDgsLTEpO3JldHVyblwiT2JqZWN0XCI9PT1uJiZlLmNvbnN0cnVjdG9yJiYobj1lLmNvbnN0cnVjdG9yLm5hbWUpLFwiTWFwXCI9PT1ufHxcIlNldFwiPT09bj9BcnJheS5mcm9tKGUpOlwiQXJndW1lbnRzXCI9PT1ufHwvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKT9zKGUsdCk6dm9pZCAwfX1mdW5jdGlvbiBzKGUsdCl7KG51bGw9PXR8fHQ+ZS5sZW5ndGgpJiYodD1lLmxlbmd0aCk7Zm9yKHZhciBuPTAscj1uZXcgQXJyYXkodCk7bjx0O24rKylyW25dPWVbbl07cmV0dXJuIHJ9ZnVuY3Rpb24gbChlLHQpe2Zvcih2YXIgbj0wO248dC5sZW5ndGg7bisrKXt2YXIgcj10W25dO3IuZW51bWVyYWJsZT1yLmVudW1lcmFibGV8fCExLHIuY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIHImJihyLndyaXRhYmxlPSEwKSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxyLmtleSxyKX19bi5yKHQpLG4uZCh0LFwiZGVmYXVsdFwiLChmdW5jdGlvbigpe3JldHVybiB1fSkpO3ZhciB1PWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSgpeyFmdW5jdGlvbihlLHQpe2lmKCEoZSBpbnN0YW5jZW9mIHQpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9KHRoaXMsZSksdGhpcy5ldlRhcmdldExpc3RlbmVyc01hcD1uZXcgTWFwLHRoaXMubGlzdGVuZXJOdW09MH12YXIgdCxuLGE7cmV0dXJuIHQ9ZSwobj1be2tleTpcImFkZEV2ZW50TGlzdGVuZXJcIix2YWx1ZTpmdW5jdGlvbihlLHQsbixyKXt2YXIgaT10aGlzLG89bnVsbDtpZihyJiYobz10aGlzLl9jbG9uZUpzb24ocikpLGFyZ3VtZW50cy5sZW5ndGg+NCl0aHJvdyBFcnJvcihcIlRvbyBtYW55IGFyZ3VtZW50cy4gTnVtYmVyIG9mIGFyZ3VtZW50cyBjYW4gYmUgc3BlY2lmaWVkIDQuXCIpO3RoaXMuX2NoZWNrVHlwZU9mT3B0aW9ucyhvKTt2YXIgYT1udWxsO28mJm8ubGlzdGVuZXJOYW1lJiYoYT1vLmxpc3RlbmVyTmFtZSk7dmFyIHM9bnVsbDtvJiZvLm9uY2UmJihkZWxldGUgby5vbmNlLG8uY2FsbGJhY2tPbmNlPSEwLHM9ZnVuY3Rpb24ocil7bihyKSxpLnJlbW92ZUV2ZW50TGlzdGVuZXIoZSx0LG51bGwsbyl9KTt2YXIgbD17bGlzdGVuZXJOYW1lOm51bGwsc3VjY2VzczohMH07cz9lLmFkZEV2ZW50TGlzdGVuZXIodCxzLG8pOmUuYWRkRXZlbnRMaXN0ZW5lcih0LG4sbyk7dmFyIHU9dGhpcy5ldlRhcmdldExpc3RlbmVyc01hcC5nZXQoZSk7dXx8KHU9bmV3IE1hcCx0aGlzLmV2VGFyZ2V0TGlzdGVuZXJzTWFwLnNldChlLHUpKTt2YXIgYz11LmdldCh0KTtpZihjfHwoYz1uZXcgTWFwLHUuc2V0KHQsYykpLG51bGwhPT1hKXtpZihjLmhhcyhhKSl0aHJvdyBFcnJvcignVGhlIGxpc3RlbmVyTmFtZSBcIicuY29uY2F0KGEsJ1wiIGlzIGFscmVhZHkgdXNlZCBmb3IgdGhlIHNwZWNpZmllZCBldmVudCB0eXBlICcpLmNvbmNhdCh0KSk7Yy5zZXQoYSx7bGlzdGVuZXI6bixvbmNlTGlzdGVuZXI6cyxvcHRpb25zOm99KSxsLmxpc3RlbmVyTmFtZT1hfWVsc2V7dmFyIGY9XCJsaXN0ZW5lci1cIi5jb25jYXQodGhpcy5saXN0ZW5lck51bSk7b3x8KG89e30pLG8ubGlzdGVuZXJOYW1lPWYsYy5zZXQoZix7bGlzdGVuZXI6bixvbmNlTGlzdGVuZXI6cyxvcHRpb25zOm99KSxsLmxpc3RlbmVyTmFtZT1mLHRoaXMubGlzdGVuZXJOdW0rPTF9cmV0dXJuIGx9fSx7a2V5OlwicmVtb3ZlRXZlbnRMaXN0ZW5lclwiLHZhbHVlOmZ1bmN0aW9uKGUsdCxuLHIpe2lmKGFyZ3VtZW50cy5sZW5ndGg8Myl0aHJvdyBFcnJvcihcIlRocmVlIG9yIGZvdXIgYXJndW1lbnRzIGFyZSByZXF1aXJlZC5cIik7aWYoXCJGdW5jdGlvblwiIT09dGhpcy50eXBlT2YobikmJlwiTnVsbFwiIT09dGhpcy50eXBlT2YobikpdGhyb3cgRXJyb3IoJ1R5cGUgb2YgM3JkIGFyZyBzaG91bGQgYmUgYSBcIkZ1bmN0aW9uXCIgb3IgXCJOdWxsXCIuJyk7dGhpcy5fY2hlY2tUeXBlT2ZPcHRpb25zKHIpO3ZhciBpPW51bGw7ciYmci5saXN0ZW5lck5hbWUmJihpPXIubGlzdGVuZXJOYW1lKTt2YXIgbz17c3VjY2VzczohMSxtZXNzYWdlOlwidW5rbm93biBlcnJvclwifSxhPXRoaXMuZXZUYXJnZXRMaXN0ZW5lcnNNYXAuZ2V0KGUpO2lmKCFhKXJldHVybiBvLm1lc3NhZ2U9XCJET00gZWxlbWVudCBcIi5jb25jYXQoZSxcIihpZD1cIikuY29uY2F0KGUuaWQsXCIpIGRvZXNuJ3QgaGF2ZSBhbnkgbGlzdGVuZXJzLlwiKSxvO3ZhciBzPWEuZ2V0KHQpO2lmKCFzKXJldHVybiBvLm1lc3NhZ2U9XCJET00gZWxlbWVudCBcIi5jb25jYXQoZSxcIihpZD1cIikuY29uY2F0KGUuaWQsXCIpIGRvZXNuJ3QgaGF2ZSBcXFwiXCIpLmNvbmNhdCh0LCdcIiBsaXN0ZW5lcnMuJyksbztpZihpKXt2YXIgbD1zLmdldChpKTtpZighbClyZXR1cm4gby5tZXNzYWdlPVwiRE9NIGVsZW1lbnQgXCIuY29uY2F0KGUsXCIoaWQ9XCIpLmNvbmNhdChlLmlkLFwiKSBkb2Vzbid0IGhhdmUgXFxcIlwiKS5jb25jYXQodCwnXCIgbGlzdGVuZXIgXCInKS5jb25jYXQoaSwnXCInKSxvO3MuZGVsZXRlKGkpLGwub3B0aW9ucyYmbC5vcHRpb25zLmNhbGxiYWNrT25jZT9lLnJlbW92ZUV2ZW50TGlzdGVuZXIodCxsLm9uY2VMaXN0ZW5lcixsLm9wdGlvbnMpOmUucmVtb3ZlRXZlbnRMaXN0ZW5lcih0LGwubGlzdGVuZXIsbC5vcHRpb25zKSxvLnN1Y2Nlc3M9ITB9ZWxzZSBpZighaSl7aWYoIW4pcmV0dXJuIG8ubWVzc2FnZT1cIm9wdGlvbnMubGlzdGVuZXJOYW1lIGlzIG5vdCBmb3VuZFwiLG87dmFyIHU9XCJsaXN0ZW5lclwiLGM9bixmPXRoaXMuX3NlYXJjaEtleUluVmFsdWVDb250ZW50KHMsdSxjKTtpZihmKXt2YXIgdj1zLmdldChmKSx5PXYub25jZUxpc3RlbmVyLHA9di5vcHRpb25zO3MuZGVsZXRlKGYpLHk/ZS5yZW1vdmVFdmVudExpc3RlbmVyKHQseSxwKTplLnJlbW92ZUV2ZW50TGlzdGVuZXIodCxuLHApLG8uc3VjY2Vzcz0hMH1lbHNlIG8uc3VjY2Vzcz0hMSxvLm1lc3NhZ2U9XCJTcGVjaWZpZWQgbGlzdGVuZXIgY291bGQgbm90IGJlIGRlbGV0ZWQgZnJvbSBET00gZWxlbWVudCBcIi5jb25jYXQoZSxcIihpZD1cIikuY29uY2F0KGUuaWQsXCIpLlxcbiAgICAgICAgU2luY2UgdGhlIHNwZWNpZmllZCBsaXN0ZW5lciBpcyBub3QgcmVnaXN0ZXJlZCBhcyBhbiBldmVudCBsaXN0ZW5lcixcXG4gICAgICAgIGl0IG1heSBoYXZlIGJlZW4gcmVnaXN0ZXJlZCBvdXRzaWRlIG9mIGV2ZW50LWxpc3RlbmVyLWhlbHBlci5cIil9cmV0dXJuIG99fSx7a2V5OlwiZ2V0RXZlbnRMaXN0ZW5lcnNcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3JldHVybiBlP3Q/dGhpcy5fZ2V0RXZlbnRMaXN0ZW5lcnNXaXRoMkFyZ3MoZSx0KTp0aGlzLl9nZXRFdmVudExpc3RlbmVyc1dpdGgxQXJnKGUpOltdfX0se2tleTpcImdldEFsbEV2ZW50TGlzdGVuZXJzXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9bmV3IE1hcDtyZXR1cm4gdGhpcy5ldlRhcmdldExpc3RlbmVyc01hcC5mb3JFYWNoKChmdW5jdGlvbihuLHIpe3ZhciBpPXIsYT1lLl9nZXRFdmVudExpc3RlbmVyc1dpdGgxQXJnKGkpLHM9bmV3IE1hcDt0LnNldChpLHMpO3ZhciBsLHU9byhhKTt0cnl7Zm9yKHUucygpOyEobD11Lm4oKSkuZG9uZTspe3ZhciBjPWwudmFsdWU7cy5zZXQoYy5ldmVudFR5cGUsYy5saXN0ZW5lcnMpfX1jYXRjaChlKXt1LmUoZSl9ZmluYWxseXt1LmYoKX19KSksdH19LHtrZXk6XCJfZ2V0RXZlbnRMaXN0ZW5lcnNXaXRoMUFyZ1wiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PVtdLG49dGhpcy5ldlRhcmdldExpc3RlbmVyc01hcC5nZXQoZSk7aWYoIW4pcmV0dXJuIHQ7dmFyIHIsYT1vKG4pO3RyeXtmb3IoYS5zKCk7IShyPWEubigpKS5kb25lOyl7dmFyIHMsbD1pKHIudmFsdWUsMiksdT1sWzBdLGM9bFsxXSxmPVtdLHY9byhjLnZhbHVlcygpKTt0cnl7Zm9yKHYucygpOyEocz12Lm4oKSkuZG9uZTspe3ZhciB5PXMudmFsdWU7Zi5wdXNoKHRoaXMuX2dldEZyb3plbkxpc3RlbmVyRGVmKHkpKX19Y2F0Y2goZSl7di5lKGUpfWZpbmFsbHl7di5mKCl9Zi5sZW5ndGg+MCYmdC5wdXNoKHtldmVudFR5cGU6dSxsaXN0ZW5lcnM6Zn0pfX1jYXRjaChlKXthLmUoZSl9ZmluYWxseXthLmYoKX1yZXR1cm4gdH19LHtrZXk6XCJfZ2V0RXZlbnRMaXN0ZW5lcnNXaXRoMkFyZ3NcIix2YWx1ZTpmdW5jdGlvbihlLHQpe2lmKDIhPT1hcmd1bWVudHMubGVuZ3RoKXRocm93IEVycm9yKFwiT25seSB0d28gYXJndW1lbnRzIGNhbiBiZSBzcGVjaWZpZWRcIik7dmFyIG49W10scj10aGlzLmV2VGFyZ2V0TGlzdGVuZXJzTWFwLmdldChlKTtpZighcilyZXR1cm4gbjt2YXIgaT1yLmdldCh0KTtpZighaSlyZXR1cm4gbjt2YXIgYSxzPW8oaS52YWx1ZXMoKSk7dHJ5e2ZvcihzLnMoKTshKGE9cy5uKCkpLmRvbmU7KXt2YXIgbD1hLnZhbHVlLHU9dGhpcy5fZ2V0RnJvemVuTGlzdGVuZXJEZWYobCk7bi5wdXNoKHUpfX1jYXRjaChlKXtzLmUoZSl9ZmluYWxseXtzLmYoKX1yZXR1cm4gbn19LHtrZXk6XCJnZXRFdmVudExpc3RlbmVyXCIsdmFsdWU6ZnVuY3Rpb24oZSx0LG4pe2lmKDMhPT1hcmd1bWVudHMubGVuZ3RoKXRocm93IEVycm9yKFwiT25seSAzIGFyZ3VtZW50cyBjYW4gYmUgc3BlY2lmaWVkXCIpO3ZhciByPXRoaXMuZXZUYXJnZXRMaXN0ZW5lcnNNYXAuZ2V0KGUpO2lmKCFyKXJldHVybiBudWxsO3ZhciBpPXIuZ2V0KHQpO2lmKCFpKXJldHVybiBudWxsO3ZhciBvPWkuZ2V0KG4pLGE9dGhpcy5fZ2V0RnJvemVuTGlzdGVuZXJEZWYobyk7cmV0dXJuIGF9fSx7a2V5OlwiaGFzRXZlbnRMaXN0ZW5lcnNcIix2YWx1ZTpmdW5jdGlvbihlLHQpe2lmKDIhPT1hcmd1bWVudHMubGVuZ3RoKXRocm93IEVycm9yKFwiT25seSB0d28gYXJndW1lbnRzIGNhbiBiZSBzcGVjaWZpZWRcIik7dmFyIG49dGhpcy5ldlRhcmdldExpc3RlbmVyc01hcC5nZXQoZSk7aWYoIW4pcmV0dXJuITE7dmFyIHI9bi5nZXQodCk7cmV0dXJuISghcnx8MD09PXIuc2l6ZSl9fSx7a2V5OlwiaGFzRXZlbnRMaXN0ZW5lclwiLHZhbHVlOmZ1bmN0aW9uKGUsdCxuKXtpZigzIT09YXJndW1lbnRzLmxlbmd0aCl0aHJvdyBFcnJvcihcIk9ubHkgMyBhcmd1bWVudHMgY2FuIGJlIHNwZWNpZmllZFwiKTt2YXIgcj10aGlzLmV2VGFyZ2V0TGlzdGVuZXJzTWFwLmdldChlKTtpZighcilyZXR1cm4hMTt2YXIgaT1yLmdldCh0KTtpZighaSlyZXR1cm4hMTt2YXIgbz1pLmdldChuKTtyZXR1cm4hIW99fSx7a2V5OlwiX2dldEZyb3plbkxpc3RlbmVyRGVmXCIsdmFsdWU6ZnVuY3Rpb24oZSl7aWYoIWUpcmV0dXJuIG51bGw7dmFyIHQ9e30sbj1udWxsLHI9ZS5vcHRpb25zO3JldHVybiByJiYobj17fSx0Lm9wdGlvbnM9bixyLmNhcHR1cmUmJihuLmNhcHR1cmU9ci5jYXB0dXJlKSxyLmNhbGxiYWNrT25jZSYmKG4ub25jZT1yLmNhbGxiYWNrT25jZSksci5saXN0ZW5lck5hbWUmJihuLmxpc3RlbmVyTmFtZT1yLmxpc3RlbmVyTmFtZSkpLHQubGlzdGVuZXI9ZS5saXN0ZW5lcixPYmplY3QuZnJlZXplKG4pLE9iamVjdC5mcmVlemUodCksdH19LHtrZXk6XCJjbGVhckFsbEV2ZW50TGlzdGVuZXJzXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZSx0PW8odGhpcy5nZXRBbGxFdmVudFRhcmdldHMoKSk7dHJ5e2Zvcih0LnMoKTshKGU9dC5uKCkpLmRvbmU7KXt2YXIgbj1lLnZhbHVlO3RoaXMuY2xlYXJFdmVudExpc3RlbmVycyhuKX19Y2F0Y2goZSl7dC5lKGUpfWZpbmFsbHl7dC5mKCl9fX0se2tleTpcImNsZWFyRXZlbnRMaXN0ZW5lcnNcIix2YWx1ZTpmdW5jdGlvbihlLHQpe2lmKCFlKXRocm93IEVycm9yKFwiQXQgbGVhc3QgdGhlIEV2ZW50VGFyZ2V0IG11c3QgYmUgc3BlY2lmaWVkIGFzIGFuIGFyZ3VtZW50XCIpO3ZhciBuPXRoaXMuZ2V0RXZlbnRMaXN0ZW5lcnMoZSx0KTtpZih0KXtpZih0KXt2YXIgcixpPW8obik7dHJ5e2ZvcihpLnMoKTshKHI9aS5uKCkpLmRvbmU7KXt2YXIgYT1yLnZhbHVlO3RoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLHQsbnVsbCxhLm9wdGlvbnMpfX1jYXRjaChlKXtpLmUoZSl9ZmluYWxseXtpLmYoKX19fWVsc2V7dmFyIHMsbD1vKG4pO3RyeXtmb3IobC5zKCk7IShzPWwubigpKS5kb25lOyl7dmFyIHUsYz1zLnZhbHVlLGY9Yy5ldmVudFR5cGUsdj1vKGMubGlzdGVuZXJzKTt0cnl7Zm9yKHYucygpOyEodT12Lm4oKSkuZG9uZTspe3ZhciB5PXUudmFsdWUub3B0aW9uczt0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoZSxmLG51bGwseSl9fWNhdGNoKGUpe3YuZShlKX1maW5hbGx5e3YuZigpfX19Y2F0Y2goZSl7bC5lKGUpfWZpbmFsbHl7bC5mKCl9fX19LHtrZXk6XCJjbGVhckV2ZW50TGlzdGVuZXJcIix2YWx1ZTpmdW5jdGlvbihlLHQsbil7dmFyIHI9dGhpcy5nZXRFdmVudExpc3RlbmVyKGUsdCxuKTtyJiZyLm9wdGlvbnMmJnRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLHQsbnVsbCxyLm9wdGlvbnMpfX0se2tleTpcImdldEFsbEV2ZW50VGFyZ2V0c1wiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIEFycmF5LmZyb20odGhpcy5ldlRhcmdldExpc3RlbmVyc01hcC5rZXlzKCkpfX0se2tleTpcInNlYXJjaEV2ZW50TGlzdGVuZXJzQnlOYW1lXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQsbj1bXSxyPW8odGhpcy5nZXRBbGxFdmVudFRhcmdldHMoKSk7dHJ5e2ZvcihyLnMoKTshKHQ9ci5uKCkpLmRvbmU7KXt2YXIgaSxhPXQudmFsdWUscz10aGlzLmV2VGFyZ2V0TGlzdGVuZXJzTWFwLmdldChhKSxsPW8ocy5rZXlzKCkpO3RyeXtmb3IobC5zKCk7IShpPWwubigpKS5kb25lOyl7dmFyIHU9aS52YWx1ZSxjPXMuZ2V0KHUpLGY9dGhpcy5fZ2V0RnJvemVuTGlzdGVuZXJEZWYoYy5nZXQoZSkpO2YmJm4ucHVzaChmKX19Y2F0Y2goZSl7bC5lKGUpfWZpbmFsbHl7bC5mKCl9fX1jYXRjaChlKXtyLmUoZSl9ZmluYWxseXtyLmYoKX1yZXR1cm4gbn19LHtrZXk6XCJfc2VhcmNoS2V5SW5WYWx1ZUNvbnRlbnRcIix2YWx1ZTpmdW5jdGlvbihlLHQsbil7dmFyIHIsYT1vKGUpO3RyeXtmb3IoYS5zKCk7IShyPWEubigpKS5kb25lOyl7dmFyIHM9aShyLnZhbHVlLDIpLGw9c1swXTtpZihzWzFdW3RdPT09bilyZXR1cm4gbH19Y2F0Y2goZSl7YS5lKGUpfWZpbmFsbHl7YS5mKCl9cmV0dXJuIG51bGx9fSx7a2V5OlwiX2NoZWNrVHlwZU9mT3B0aW9uc1wiLHZhbHVlOmZ1bmN0aW9uKGUpe2lmKFwib2JqZWN0XCIhPT1yKGUpJiZ2b2lkIDAhPT1lKXRocm93XCJib29sZWFuXCI9PXR5cGVvZiBlP25ldyBFcnJvcihcIlR5cGUgb2YgYm9vbGVhbiBpcyBub3QgYWNjZXB0ZWQgYXMgdGhlIGZvdXJ0aCBhcmd1bWVudCB5b3Ugc3BlY2lmeS5cXG4gICAgICBJZiB5b3Ugd2FudCB0byBlbmFibGUgdXNlQ2FwdHVyZSwgc3BlY2lmeSB7Y2FwdHVyZTogdHJ1ZX0gYXMgdGhlIGZvdXJ0aCBwYXJhbWV0ZXIgaW5zdGVhZC5cIik6bmV3IEVycm9yKFwiVHlwZSBvZiBcIi5jb25jYXQocihlKSxcIiBpcyBub3QgYWNjZXB0ZWQgYXMgdGhlIGZvdXJ0aCBhcmd1bWVudCB5b3Ugc3BlY2lmeS5cXG4gICAgICBJZiB5b3Ugd2FudCB0byBzcGVjaWZ5IG9wdGlvbnMsIHNwZWNpZnkgYW4gb2JqZWN0IGxpa2Uge2NhcHR1cmU6IHRydWUsIGxpc3RlbmVyTmFtZTonbXktbGlzdGVuZXItMDEnfS5cIikpfX0se2tleTpcIl9jbG9uZUpzb25cIix2YWx1ZTpmdW5jdGlvbihlKXtyZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShlKSl9fSx7a2V5OlwidHlwZU9mXCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKS5zbGljZSg4LC0xKX19XSkmJmwodC5wcm90b3R5cGUsbiksYSYmbCh0LGEpLGV9KCl9XSkuZGVmYXVsdH0pKTsiLCIvKiEgbWVyZ2UtZGVlcGx5IHYzLjAuMCBDb3B5cmlnaHQgKGMpIDIwMTktMjAyMCByaXZlcnN1bi5vcmdAZ21haWwuY29tICovXG4hZnVuY3Rpb24oZSxyKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1yKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShcIm1lcmdlRGVlcGx5XCIsW10scik6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0cy5tZXJnZURlZXBseT1yKCk6ZS5tZXJnZURlZXBseT1yKCl9KHRoaXMsKGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKGUpe3ZhciByPXt9O2Z1bmN0aW9uIHQobil7aWYocltuXSlyZXR1cm4gcltuXS5leHBvcnRzO3ZhciBvPXJbbl09e2k6bixsOiExLGV4cG9ydHM6e319O3JldHVybiBlW25dLmNhbGwoby5leHBvcnRzLG8sby5leHBvcnRzLHQpLG8ubD0hMCxvLmV4cG9ydHN9cmV0dXJuIHQubT1lLHQuYz1yLHQuZD1mdW5jdGlvbihlLHIsbil7dC5vKGUscil8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLHIse2VudW1lcmFibGU6ITAsZ2V0Om59KX0sdC5yPWZ1bmN0aW9uKGUpe1widW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2wmJlN5bWJvbC50b1N0cmluZ1RhZyYmT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsU3ltYm9sLnRvU3RyaW5nVGFnLHt2YWx1ZTpcIk1vZHVsZVwifSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSl9LHQudD1mdW5jdGlvbihlLHIpe2lmKDEmciYmKGU9dChlKSksOCZyKXJldHVybiBlO2lmKDQmciYmXCJvYmplY3RcIj09dHlwZW9mIGUmJmUmJmUuX19lc01vZHVsZSlyZXR1cm4gZTt2YXIgbj1PYmplY3QuY3JlYXRlKG51bGwpO2lmKHQucihuKSxPYmplY3QuZGVmaW5lUHJvcGVydHkobixcImRlZmF1bHRcIix7ZW51bWVyYWJsZTohMCx2YWx1ZTplfSksMiZyJiZcInN0cmluZ1wiIT10eXBlb2YgZSlmb3IodmFyIG8gaW4gZSl0LmQobixvLGZ1bmN0aW9uKHIpe3JldHVybiBlW3JdfS5iaW5kKG51bGwsbykpO3JldHVybiBufSx0Lm49ZnVuY3Rpb24oZSl7dmFyIHI9ZSYmZS5fX2VzTW9kdWxlP2Z1bmN0aW9uKCl7cmV0dXJuIGUuZGVmYXVsdH06ZnVuY3Rpb24oKXtyZXR1cm4gZX07cmV0dXJuIHQuZChyLFwiYVwiLHIpLHJ9LHQubz1mdW5jdGlvbihlLHIpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSxyKX0sdC5wPVwiL1wiLHQodC5zPTApfShbZnVuY3Rpb24oZSxyLHQpe2UuZXhwb3J0cz10KDEpfSxmdW5jdGlvbihlLHIsdCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbihlLHIpe3ZhciB0O2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBTeW1ib2x8fG51bGw9PWVbU3ltYm9sLml0ZXJhdG9yXSl7aWYoQXJyYXkuaXNBcnJheShlKXx8KHQ9YShlKSl8fHImJmUmJlwibnVtYmVyXCI9PXR5cGVvZiBlLmxlbmd0aCl7dCYmKGU9dCk7dmFyIG49MCxvPWZ1bmN0aW9uKCl7fTtyZXR1cm57czpvLG46ZnVuY3Rpb24oKXtyZXR1cm4gbj49ZS5sZW5ndGg/e2RvbmU6ITB9Ontkb25lOiExLHZhbHVlOmVbbisrXX19LGU6ZnVuY3Rpb24oZSl7dGhyb3cgZX0sZjpvfX10aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGl0ZXJhdGUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIil9dmFyIGksdT0hMCxjPSExO3JldHVybntzOmZ1bmN0aW9uKCl7dD1lW1N5bWJvbC5pdGVyYXRvcl0oKX0sbjpmdW5jdGlvbigpe3ZhciBlPXQubmV4dCgpO3JldHVybiB1PWUuZG9uZSxlfSxlOmZ1bmN0aW9uKGUpe2M9ITAsaT1lfSxmOmZ1bmN0aW9uKCl7dHJ5e3V8fG51bGw9PXQucmV0dXJufHx0LnJldHVybigpfWZpbmFsbHl7aWYoYyl0aHJvdyBpfX19fWZ1bmN0aW9uIG8oZSl7cmV0dXJuIGZ1bmN0aW9uKGUpe2lmKEFycmF5LmlzQXJyYXkoZSkpcmV0dXJuIHUoZSl9KGUpfHxmdW5jdGlvbihlKXtpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sJiZTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGUpKXJldHVybiBBcnJheS5mcm9tKGUpfShlKXx8YShlKXx8ZnVuY3Rpb24oKXt0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKX0oKX1mdW5jdGlvbiBpKGUscil7cmV0dXJuIGZ1bmN0aW9uKGUpe2lmKEFycmF5LmlzQXJyYXkoZSkpcmV0dXJuIGV9KGUpfHxmdW5jdGlvbihlLHIpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBTeW1ib2x8fCEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChlKSkpcmV0dXJuO3ZhciB0PVtdLG49ITAsbz0hMSxpPXZvaWQgMDt0cnl7Zm9yKHZhciBhLHU9ZVtTeW1ib2wuaXRlcmF0b3JdKCk7IShuPShhPXUubmV4dCgpKS5kb25lKSYmKHQucHVzaChhLnZhbHVlKSwhcnx8dC5sZW5ndGghPT1yKTtuPSEwKTt9Y2F0Y2goZSl7bz0hMCxpPWV9ZmluYWxseXt0cnl7bnx8bnVsbD09dS5yZXR1cm58fHUucmV0dXJuKCl9ZmluYWxseXtpZihvKXRocm93IGl9fXJldHVybiB0fShlLHIpfHxhKGUscil8fGZ1bmN0aW9uKCl7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKX0oKX1mdW5jdGlvbiBhKGUscil7aWYoZSl7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGUpcmV0dXJuIHUoZSxyKTt2YXIgdD1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSkuc2xpY2UoOCwtMSk7cmV0dXJuXCJPYmplY3RcIj09PXQmJmUuY29uc3RydWN0b3ImJih0PWUuY29uc3RydWN0b3IubmFtZSksXCJNYXBcIj09PXR8fFwiU2V0XCI9PT10P0FycmF5LmZyb20oZSk6XCJBcmd1bWVudHNcIj09PXR8fC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KHQpP3UoZSxyKTp2b2lkIDB9fWZ1bmN0aW9uIHUoZSxyKXsobnVsbD09cnx8cj5lLmxlbmd0aCkmJihyPWUubGVuZ3RoKTtmb3IodmFyIHQ9MCxuPW5ldyBBcnJheShyKTt0PHI7dCsrKW5bdF09ZVt0XTtyZXR1cm4gbn1mdW5jdGlvbiBjKGUpe3JldHVybihjPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbihlKXtyZXR1cm4gdHlwZW9mIGV9OmZ1bmN0aW9uKGUpe3JldHVybiBlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJmUuY29uc3RydWN0b3I9PT1TeW1ib2wmJmUhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIGV9KShlKX1mdW5jdGlvbiBmKGUscix0KXt2YXIgYT1mdW5jdGlvbihlKXtyZXR1cm4gZSYmXCJvYmplY3RcIj09PWMoZSkmJiFBcnJheS5pc0FycmF5KGUpfSx1PXQmJnQuY29uY2F0QXJyYXksbD10LmlzQ2xvbmVNb2RlLHk9e307dCYmdC5hc3NpZ25Ub09iamVjdCYmKHk9dC5hc3NpZ25Ub09iamVjdCx0LmFzc2lnblRvT2JqZWN0PW51bGwpO3ZhciBzLGIscCxkPW51bGw7aWYoZD15PT09ZT9lOk9iamVjdC5hc3NpZ24oeSxlKSxhKGUpJiZhKHIpKWZvcih2YXIgbT0wLGo9T2JqZWN0LmVudHJpZXMocik7bTxqLmxlbmd0aDttKyspe3ZhciB2PWkoalttXSwyKSxnPXZbMF0saD12WzFdLE89ZVtnXTtpZih1JiZBcnJheS5pc0FycmF5KGgpJiZBcnJheS5pc0FycmF5KE8pJiZyIT09ZSlkW2ddPU8uY29uY2F0LmFwcGx5KE8sbyhoKSk7ZWxzZSBpZihhKGgpJiZPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSxnKSlkW2ddPWYoTyxoLHQpO2Vsc2V7dmFyIEE9aDtpZihsJiZBcnJheS5pc0FycmF5KGgpKXt2YXIgUyx3PVtdLHg9bihoKTt0cnl7Zm9yKHgucygpOyEoUz14Lm4oKSkuZG9uZTspe3ZhciBUPVMudmFsdWUsUD1KU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KFQpKTt3LnB1c2goUCl9fWNhdGNoKGUpe3guZShlKX1maW5hbGx5e3guZigpfUE9d31PYmplY3QuYXNzaWduKGQsKHA9QSwoYj1nKWluKHM9e30pP09iamVjdC5kZWZpbmVQcm9wZXJ0eShzLGIse3ZhbHVlOnAsZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITB9KTpzW2JdPXAscykpfX1yZXR1cm4gZH1mdW5jdGlvbiBsKGUpe3ZhciByPW51bGwsdD1udWxsLG49ZS5vcDtpZighbil0aHJvdyBFcnJvcignVGhlIGluaXRpYWxpemF0aW9uIHByb3BlcnR5IFwib3BcIiBjYW5ub3QgYmUgb21pdHRlZC4gXCJtZXJnZVwiLFwib3ZlcndyaXRlLW1lcmdlXCIsXCJjbG9uZVwiIGNhbiBiZSBzcGVjaWZpZWQuJyk7dmFyIG89XCJtZXJnZVwiPT09bixpPVwiY2xvbmVcIj09PW4sYT1cIm92ZXJ3cml0ZS1tZXJnZVwiPT09bjtpZihvKXtpZihyPWUub2JqZWN0MSx0PWUub2JqZWN0Miwhcnx8IXQpdGhyb3cgRXJyb3IoXCJvYmplY3QxIG9yIG9iamVjdDIgaXMgbm90IHNwZWNpZmllZC5cIil9ZWxzZSBpZihhKXtpZihyPWUub2JqZWN0MSx0PWUub2JqZWN0Miwhcnx8IXQpdGhyb3cgRXJyb3IoXCJvYmplY3QxIG9yIG9iamVjdDIgaXMgbm90IHNwZWNpZmllZC5cIik7aWYoMD09PU9iamVjdC5rZXlzKHQpLmxlbmd0aClyZXR1cm4gbnVsbH1lbHNle2lmKCFpKXRocm93IEVycm9yKCdBbiBpbnZhbGlkIFwib3BcIiBwcm9wZXJ0eSB2YWx1ZSBcIicuY29uY2F0KG4sJ1wiIGhhcyBiZWVuIHNwZWNpZmllZC4nKSk7cj1lLm9iamVjdDEsdD17fX12YXIgdSxjPU9iamVjdC5jcmVhdGUoT2JqZWN0LmdldFByb3RvdHlwZU9mKHIpKSxsPW51bGwseT0odT1yLE9iamVjdC5nZXRQcm90b3R5cGVPZih1KSE9PU9iamVjdC5wcm90b3R5cGUpO3JldHVybiBvJiZ5fHxpPyhmKHIscix7YXNzaWduVG9PYmplY3Q6Yyxjb25jYXRBcnJheTplJiZlLmNvbmNhdEFycmF5LGlzQ2xvbmVNb2RlOml9KSxsPWMpOmw9e30sZihpP2w6cix0LHthc3NpZ25Ub09iamVjdDphP3I6bCxjb25jYXRBcnJheTplJiZlLmNvbmNhdEFycmF5fSksbH10LnIociksdC5kKHIsXCJkZWZhdWx0XCIsKGZ1bmN0aW9uKCl7cmV0dXJuIGx9KSl9XSkuZGVmYXVsdH0pKTsiLCJpbXBvcnQgYXBpIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICAgICAgICBpbXBvcnQgY29udGVudCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL0pTRnJhbWUuY3NzXCI7XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY29udGVudC5sb2NhbHMgfHwge307IiwiaW1wb3J0IGFwaSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgICAgICAgaW1wb3J0IGNvbnRlbnQgZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9QcmVzZXRTdHlsZU1hdGVyaWFsLmNzc1wiO1xuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IGFwaShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRlbnQubG9jYWxzIHx8IHt9OyIsImltcG9ydCBhcGkgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgICAgICAgIGltcG9ydCBjb250ZW50IGZyb20gXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vUHJlc2V0U3R5bGVQb3B1cC5jc3NcIjtcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjb250ZW50LmxvY2FscyB8fCB7fTsiLCJpbXBvcnQgYXBpIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICAgICAgICBpbXBvcnQgY29udGVudCBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL1ByZXNldFN0eWxlUmVkc3RvbmUuY3NzXCI7XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY29udGVudC5sb2NhbHMgfHwge307IiwiaW1wb3J0IGFwaSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgICAgICAgaW1wb3J0IGNvbnRlbnQgZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9QcmVzZXRTdHlsZVlvc2VtaXRlLmNzc1wiO1xuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IGFwaShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRlbnQubG9jYWxzIHx8IHt9OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNPbGRJRSA9IGZ1bmN0aW9uIGlzT2xkSUUoKSB7XG4gIHZhciBtZW1vO1xuICByZXR1cm4gZnVuY3Rpb24gbWVtb3JpemUoKSB7XG4gICAgaWYgKHR5cGVvZiBtZW1vID09PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3NcbiAgICAgIC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcbiAgICAgIC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcbiAgICAgIC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuICAgICAgLy8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG4gICAgICBtZW1vID0gQm9vbGVhbih3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbW87XG4gIH07XG59KCk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiBnZXRUYXJnZXQoKSB7XG4gIHZhciBtZW1vID0ge307XG4gIHJldHVybiBmdW5jdGlvbiBtZW1vcml6ZSh0YXJnZXQpIHtcbiAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbiAgfTtcbn0oKTtcblxudmFyIHN0eWxlc0luRG9tID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5Eb20ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5Eb21baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVzSW5Eb20ucHVzaCh7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IGFkZFN0eWxlKG9iaiwgb3B0aW9ucyksXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHZhciBhdHRyaWJ1dGVzID0gb3B0aW9ucy5hdHRyaWJ1dGVzIHx8IHt9O1xuXG4gIGlmICh0eXBlb2YgYXR0cmlidXRlcy5ub25jZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09ICd1bmRlZmluZWQnID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gICAgaWYgKG5vbmNlKSB7XG4gICAgICBhdHRyaWJ1dGVzLm5vbmNlID0gbm9uY2U7XG4gICAgfVxuICB9XG5cbiAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgfSk7XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG9wdGlvbnMuaW5zZXJ0KHN0eWxlKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KG9wdGlvbnMuaW5zZXJ0IHx8ICdoZWFkJyk7XG5cbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgICB9XG5cbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICB9XG5cbiAgcmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG52YXIgcmVwbGFjZVRleHQgPSBmdW5jdGlvbiByZXBsYWNlVGV4dCgpIHtcbiAgdmFyIHRleHRTdG9yZSA9IFtdO1xuICByZXR1cm4gZnVuY3Rpb24gcmVwbGFjZShpbmRleCwgcmVwbGFjZW1lbnQpIHtcbiAgICB0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG4gICAgcmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG4gIH07XG59KCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuICB2YXIgY3NzID0gcmVtb3ZlID8gJycgOiBvYmoubWVkaWEgPyBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpLmNvbmNhdChvYmouY3NzLCBcIn1cIikgOiBvYmouY3NzOyAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuICAgIHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuICAgIGlmIChjaGlsZE5vZGVzW2luZGV4XSkge1xuICAgICAgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuICAgIH1cblxuICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgc3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGUsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gb2JqLmNzcztcbiAgdmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAobWVkaWEpIHtcbiAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlLnJlbW92ZUF0dHJpYnV0ZSgnbWVkaWEnKTtcbiAgfVxuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZS5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMDtcblxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBzdHlsZTtcbiAgdmFyIHVwZGF0ZTtcbiAgdmFyIHJlbW92ZTtcblxuICBpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcbiAgICB2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcbiAgICBzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcbiAgICB1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcbiAgICByZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cbiAgICByZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuICAgIH07XG4gIH1cblxuICB1cGRhdGUob2JqKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9OyAvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbiAgLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXG4gIGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSAnYm9vbGVhbicpIHtcbiAgICBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcbiAgfVxuXG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobmV3TGlzdCkgIT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5Eb21bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRG9tW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRG9tLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiQ0FMSUdOID0ge307XG5cbkNBTElHTi5MRUZUX1RPUCA9ICdMRUZUX1RPUCc7XG5DQUxJR04uSENFTlRFUl9UT1AgPSAnQ0VOVEVSX1RPUCc7XG5DQUxJR04uUklHSFRfVE9QID0gJ1JJR0hUX1RPUCc7XG5DQUxJR04uTEVGVF9WQ0VOVEVSID0gJ0xFRlRfQ0VOVEVSJztcbkNBTElHTi5IQ0VOVEVSX1ZDRU5URVIgPSAnQ0VOVEVSX0NFTlRFUic7XG5DQUxJR04uQ0VOVEVSID0gQ0FMSUdOLkhDRU5URVJfVkNFTlRFUjtcbkNBTElHTi5SSUdIVF9WQ0VOVEVSID0gJ1JJR0hUX0NFTlRFUic7XG5DQUxJR04uTEVGVF9CT1RUT00gPSAnTEVGVF9CT1RUT00nO1xuQ0FMSUdOLkhDRU5URVJfQk9UVE9NID0gJ0NFTlRFUl9CT1RUT00nO1xuQ0FMSUdOLlJJR0hUX0JPVFRPTSA9ICdSSUdIVF9CT1RUT00nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENBTElHTjtcbiIsIid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9KU0ZyYW1lLmNzcycpO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ0ByaXZlcnN1bi9ldmVudC1lbWl0dGVyJyk7XG52YXIgQ0FMSUdOID0gcmVxdWlyZSgnLi9DQ29tbW9uLmpzJyk7XG52YXIgV2luZG93RXZlbnRIZWxwZXIgPSByZXF1aXJlKCcuL3V0aWxzL1dpbmRvd0V2ZW50SGVscGVyLmpzJyk7XG52YXIgaW5oZXJpdCA9IHJlcXVpcmUoJy4vdXRpbHMvSW5oZXJpdC5qcycpO1xudmFyIENGcmFtZUFwcGVhcmFuY2UgPSByZXF1aXJlKCcuL2FwcGVhcmFuY2UvQ0ZyYW1lQXBwZWFyYW5jZS5qcycpO1xudmFyIENEb21QYXJ0c0J1aWxkZXIgPSByZXF1aXJlKCcuL2FwcGVhcmFuY2UvQ0RvbVBhcnRzQnVpbGRlci5qcycpO1xudmFyIENTaW1wbGVMYXlvdXRBbmltYXRvciA9IHJlcXVpcmUoJy4vdXRpbHMvQ1NpbXBsZUxheW91dEFuaW1hdG9yLmpzJyk7XG52YXIgRXZlbnRMaXN0ZW5lckhlbHBlciA9IHJlcXVpcmUoJ2V2ZW50LWxpc3RlbmVyLWhlbHBlcicpO1xuXG4vL0lmIHlvdSBkb24ndCB3YW50IHRvIGJ1bmRsZSBwcmVzZXQgc3R5bGVzIGluIEpzRnJhbWUuanMgLGNvbW1lbnQgb3V0IGJlbG93LlxudmFyIHByZXNldFN0eWxlcyA9IHtcbiAgJ3lvc2VtaXRlJzogcmVxdWlyZSgnLi9wcmVzZXRzL2FwcGVhcmFuY2UvUHJlc2V0U3R5bGVZb3NlbWl0ZS5qcycpLFxuICAncmVkc3RvbmUnOiByZXF1aXJlKCcuL3ByZXNldHMvYXBwZWFyYW5jZS9QcmVzZXRTdHlsZVJlZHN0b25lLmpzJyksXG4gICdwb3B1cCc6IHJlcXVpcmUoJy4vcHJlc2V0cy9hcHBlYXJhbmNlL1ByZXNldFN0eWxlUG9wdXAuanMnKSxcbiAgJ3RvYXN0JzogcmVxdWlyZSgnLi9wcmVzZXRzL2FwcGVhcmFuY2UvUHJlc2V0U3R5bGVUb2FzdC5qcycpLFxuICAnbWF0ZXJpYWwnOiByZXF1aXJlKCcuL3ByZXNldHMvYXBwZWFyYW5jZS9QcmVzZXRTdHlsZU1hdGVyaWFsLmpzJyksXG59O1xuXG52YXIgcHJlc2V0V2luZG93cyA9IHtcbiAgJ3lvc2VtaXRlJzogcmVxdWlyZSgnLi9wcmVzZXRzL3dpbmRvdy9QcmVzZXRXaW5kb3dZb3NlbWl0ZS5qcycpLFxufTtcblxudmFyIERFRiA9IHt9O1xuXG4vLyB0cnVlOlN1cHBvcnQgbW91c2Ugb24gbW91c2UtZW5hYmxlZCBkZXZpY2VzXG52YXIgTU9VU0VfRU5BQkxFRCA9IHRydWU7XG5cbi8vIHRydWU6U3VwcG9ydCB0b3VjaCBvbiB0b3VjaC1lbmFibGVkIGRldmljZXNcbnZhciBUT1VDSF9FTkFCTEVEID0gdHJ1ZTtcblxuLy90cnVlOkFsbG93IHRoZSB3aW5kb3cgdG8gYmUgbW92ZWQgb25seSBpbiB0aGUgY2FzZSBvZiBvbmUgZmluZ2VyXG4vLyAodGhlIHdpbmRvdyBjYW5ub3QgYmUgbW92ZWQgaW4gdGhlIGNhc2Ugb2YgdHdvIG9yIG1vcmUgZmluZ2VycylcbnZhciBUT1VDSF9NT1ZFX09OTFlfV0lUSF9PTkVfRklOR0VSID0gdHJ1ZTtcblxuXG4vKipcbiAqIERFRklOSVRJT05TXG4gKi9cbkRFRi5DQkVBTiA9IHt9O1xuREVGLkNCRUFOLkhUTUxfRUxFTUVOVCA9ICdzcGFuJztcbkRFRi5DQkVBTi5IVE1MX0VMRU1FTlRfSURfUFJFRklYID0gJ2h0bWxFbGVtZW50Xyc7XG5ERUYuQ0JFQU4uVFlQRV9OQU1FID0gJ2JlYW4nO1xuXG5cbi8vKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLVxuXG5cbi8qKlxuICogQ0JlYW5GcmFtZSBDbGFzczxwPlxuICogVGhlIHNtYWxsZXN0IHdpbmRvdy4gSXQgaXMgcmVzcG9uc2libGUgZm9yIGJhc2ljIHByb2Nlc3Npbmcgb25seS5cbiAqXG4gKiBAcGFyYW0gYmVhbklkIGlkIG9mIHRoaXMgc21hbGwgd2luZG93XG4gKiBAcGFyYW0gbGVmdFxuICogQHBhcmFtIHRvcFxuICogQHBhcmFtIHdpZHRoXG4gKiBAcGFyYW0gaGVpZ2h0XG4gKiBAcGFyYW0gemluZGV4XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ0JlYW5GcmFtZShiZWFuSWQsIGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCwgemluZGV4LCB3X2JvcmRlcl93aWR0aCwgYXBwZWFyYW5jZSkge1xuXG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgbWUubW92YWJsZSA9IHRydWU7XG5cblxuICAvL2ZpZWxkc1xuICBtZS5pZCA9IGJlYW5JZDtcbiAgbWUucHJvcGVydHkgPSB7fTtcblxuICBtZS5leHRyYSA9IHt9O1xuXG4gIG1lLnBhcmVudENhbnZhcyA9IG51bGw7XG4gIG1lLmh0bWxFbGVtZW50ID0gbnVsbDtcblxuICBtZS5wdWxsVXBEaXNhYmxlZCA9IGZhbHNlO1xuICBpZiAoYXBwZWFyYW5jZSkge1xuICAgIG1lLnB1bGxVcERpc2FibGVkID0gYXBwZWFyYW5jZS5wdWxsVXBEaXNhYmxlZDtcbiAgfVxuXG5cbiAgLy9pbml0aWFsaXplXG4gIG1lLmh0bWxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChERUYuQ0JFQU4uSFRNTF9FTEVNRU5UKTtcbiAgbWUuaHRtbEVsZW1lbnQuaWQgPSBERUYuQ0JFQU4uSFRNTF9FTEVNRU5UX0lEX1BSRUZJWCArIGJlYW5JZDtcbiAgbWUuaHRtbEVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICBtZS5odG1sRWxlbWVudC5zdHlsZS5sZWZ0ID0gcGFyc2VJbnQobGVmdCwgMTApICsgJ3B4JztcbiAgbWUuaHRtbEVsZW1lbnQuc3R5bGUudG9wID0gcGFyc2VJbnQodG9wLCAxMCkgKyAncHgnO1xuICBtZS5odG1sRWxlbWVudC5zdHlsZS53aWR0aCA9IHBhcnNlSW50KHdpZHRoLCAxMCkgKyAncHgnO1xuICBtZS5odG1sRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBwYXJzZUludChoZWlnaHQsIDEwKSArICdweCc7XG5cblxuICAvL1ppbmRleCBtYXkgYmVjb21lICd1bmRlZmluZWQnIGluIHNvbWUgY2FzZXMuXG4gIGlmICh6aW5kZXggIT09IG51bGwpIHtcbiAgICBtZS5odG1sRWxlbWVudC5zdHlsZS56SW5kZXggPSB6aW5kZXg7XG4gIH1cbiAgbWUuaHRtbEVsZW1lbnQuc3R5bGUuYm9yZGVyQ29sb3IgPSAnIzAwMDAwMCc7XG5cbiAgLy9JZiBJIHNldCBhIGxhcmdlciBmb250IHNpemUsIHdpZHRoIGFuZCBoZWlnaHQgb2Ygd2luZG93IHdpbGwgYmUgYWZmZWN0ZWQuLi4uXG4gIG1lLmh0bWxFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gJzFweCc7XG5cbiAgLy9SZWZlciBwYXJlbnRzIHRvIGVhY2ggb3RoZXIuKHNvdWdvLXNhbnNobylcbiAgbWUuaHRtbEVsZW1lbnQucGFyZW50ID0gbWU7XG5cbiAgaWYgKE1PVVNFX0VOQUJMRUQpIHtcbiAgICAvL05vdGUgdGhhdCAnbW91c2VEb3duJyBpcyBtYXBwZWQgdG8gJ29ubW91c2Vkb3duJyBvZiBodG1sRWxlbWVudCxcbiAgICAvL3NvIHdoZW4gJ29ubW91c2VEb3duJyBmaXJlcyAsdGhlICd0aGlzJyB3aWxsIGluZGljYXRlICdodG1sRWxlbWVudCdcbiAgICBtZS5odG1sRWxlbWVudC5vbm1vdXNlZG93biA9IG1lLm9ubW91c2VEb3duO1xuICB9XG5cbiAgaWYgKFRPVUNIX0VOQUJMRUQpIHtcbiAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB7XG4gICAgICB2YXIgZnVuY09uVG91Y2hTdGFydCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAvLyBUaGUgXCJtb3VzZWRvd25cIiBldmVudCBoYXBwZW5zIHJpZ2h0IGFmdGVyIFwidG91Y2hzdGFydFwiIGV2ZW50LFxuICAgICAgICAvLyBidXQgSSBkb24ndCBjYWxsICNwcmV2ZW50ZGVmYXVsdCBiZWNhdXNlICNwcmV2ZW50ZGVmYXVsdCBwcmV2ZW50cyBcIm9uY2xpY2tcIi5cbiAgICAgICAgLy8gU28sIHBlcmZvcm0gI3ByZXZlbnRkZWZhdWx0IG9ubHkgZm9yIFwidG91Y2htb3ZlXCJcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIG1lLm9ubW91c2VEb3duLmJpbmQodGhpcykoZXZ0KTtcbiAgICAgIH07XG4gICAgICBtZS5odG1sRWxlbWVudC5vbnRvdWNoc3RhcnQgPSBmdW5jT25Ub3VjaFN0YXJ0O1xuICAgIH1cbiAgfVxuXG4gIC8vVHlwZSBuYW1lIG9mIHRoaXMgY2xhc3NcbiAgbWUuaHRtbEVsZW1lbnQudHlwZU5hbWUgPSBERUYuQ0JFQU4uVFlQRV9OQU1FO1xuXG4gIC8vU3BlY2lhbCBmaWVsZCBpbmRpY2F0aW5nIHVzYWdlIG9mIHRoaXMgY2xhc3NcbiAgbWUuaHRtbEVsZW1lbnQudXNhZ2UgPSAnbm90aGluZyc7XG5cbiAgLy9XaGV0aGVyIGl0IGNhbiBtb3ZlIG91dHNpZGUgdGhlIGZyYW1lKHdha3UpLlxuICBtZS5odG1sRWxlbWVudC5pc1JhbmdlTGltaXRlZCA9IGZhbHNlO1xuXG4gIC8vTW92ZW1lbnQgbWFnbmlmaWNhdGlvbiBpbiB0aGUgWCBkaXJlY3Rpb25cbiAgLy8oSWYgaXQgaXMgMCwgaXQgY2FuIG5vdCBtb3ZlIGluIHRoZSBYIGRpcmVjdGlvbi4pXG4gIG1lLmh0bWxFbGVtZW50LmFyZ1ggPSAxO1xuXG4gIC8vTW92ZW1lbnQgbWFnbmlmaWNhdGlvbiBpbiBZIGRpcmVjdGlvblxuICAvLyAoSWYgaXQgaXMgMCwgaXQgY2FuIG5vdCBtb3ZlIGluIFkgZGlyZWN0aW9uKVxuICBtZS5odG1sRWxlbWVudC5hcmdZID0gMTtcbiAgbWUuZXh0ZXJuYWxBcmVhQ2xpY2tlZExpc3RlbmVyID0gbnVsbDtcblxuICBtZS5vbk1vdmVMaXN0ZW5lciA9IG51bGw7XG59XG5cbkNCZWFuRnJhbWUucHJvdG90eXBlLmdldFdpbmRvd1R5cGUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICdDQmVhbkZyYW1lJztcbn07XG5cbkNCZWFuRnJhbWUucHJvdG90eXBlLnNldE9uTW92ZUxpc3RlbmVyID0gZnVuY3Rpb24obGlzdGVuZXIpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgbWUub25Nb3ZlTGlzdGVuZXIgPSBsaXN0ZW5lcjtcbn07XG5DQmVhbkZyYW1lLnByb3RvdHlwZS5fb25Nb3ZlID0gZnVuY3Rpb24oZSkge1xuICB2YXIgbWUgPSB0aGlzO1xuICBpZiAobWUub25Nb3ZlTGlzdGVuZXIpIHtcbiAgICBtZS5vbk1vdmVMaXN0ZW5lcihlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTZXQgd2hldGhlciB0aGUgZnJhbWUgY2FuIGJlIG1vdmVkIHdoaWxlIGRyYWdnaW5nIHdpdGggdGhlIG1vdXNlXG4gKiBAcGFyYW0gZW5hYmxlZFxuICovXG5DQmVhbkZyYW1lLnByb3RvdHlwZS5zZXRNb3ZhYmxlID0gZnVuY3Rpb24oZW5hYmxlZCkge1xuICB2YXIgbWUgPSB0aGlzO1xuXG4gIGlmIChlbmFibGVkKSB7XG4gICAgbWUuaHRtbEVsZW1lbnQuYXJnWCA9IDE7XG4gICAgbWUuaHRtbEVsZW1lbnQuYXJnWSA9IDE7XG4gIH0gZWxzZSB7XG4gICAgbWUuaHRtbEVsZW1lbnQuYXJnWCA9IDA7XG4gICAgbWUuaHRtbEVsZW1lbnQuYXJnWSA9IDA7XG4gIH1cblxuICBtZS5tb3ZhYmxlID0gZW5hYmxlZDtcblxuICByZXR1cm4gbWU7XG59O1xuXG5cbkNCZWFuRnJhbWUucHJvdG90eXBlLnNldFBhcmVudENhbnZhcyA9IGZ1bmN0aW9uKHBhcmVudENhbnZhcykge1xuICB2YXIgbWUgPSB0aGlzO1xuICBtZS5wYXJlbnRDYW52YXMgPSBwYXJlbnRDYW52YXM7XG4gIG1lLmh0bWxFbGVtZW50LnBhcmVudENhbnZhcyA9IG1lLnBhcmVudENhbnZhcztcbiAgcmV0dXJuIG1lO1xufTtcbkNCZWFuRnJhbWUucHJvdG90eXBlLnNldE9uRXh0ZXJuYWxBcmVhQ2xpY2tlZExpc3RlbmVyID0gZnVuY3Rpb24obGlzdGVuZXIpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgbWUuZXh0ZXJuYWxBcmVhQ2xpY2tlZExpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHJldHVybiBtZTtcbn07XG5DQmVhbkZyYW1lLnByb3RvdHlwZS5vbkJvZHlDbGlja2VkID0gZnVuY3Rpb24oZSkge1xuXG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgdmFyIGNsaWNrWCA9IGUucGFnZVg7XG4gIHZhciBjbGlja1kgPSBlLnBhZ2VZO1xuXG4gIHZhciBsZWZ0ID0gcGFyc2VJbnQobWUuaHRtbEVsZW1lbnQuc3R5bGUubGVmdCk7XG4gIHZhciB0b3AgPSBwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS50b3ApO1xuICB2YXIgd2lkdGggPSBwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS53aWR0aCk7XG4gIHZhciBoZWlnaHQgPSBwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS5oZWlnaHQpO1xuXG4gIGlmIChsZWZ0IDwgY2xpY2tYICYmIGNsaWNrWCA8IChsZWZ0ICsgd2lkdGgpICYmIHRvcCA8IGNsaWNrWSAmJiAoY2xpY2tZIDwgdG9wICsgaGVpZ2h0KSkge1xuICAgIC8vLSBjbGlja2VkIGludGVybmFsIGFyZWEgb2YgdGhpcyBmcmFtZVxuICB9IGVsc2Uge1xuXG4gICAgLy8tIGNsaWNrZWQgZXh0ZXJuYWwgYXJlYSBvZiB0aGlzIGZyYW1lXG4gICAgaWYgKG1lLmV4dGVybmFsQXJlYUNsaWNrZWRMaXN0ZW5lcikge1xuICAgICAgbWUuZXh0ZXJuYWxBcmVhQ2xpY2tlZExpc3RlbmVyKCk7XG4gICAgfVxuXG4gIH1cblxuXG59O1xuQ0JlYW5GcmFtZS5wcm90b3R5cGUub25tb3VzZURvd24gPSBmdW5jdGlvbihldnQpIHtcblxuICAvLyBUeXBpY2FsbHksIGlmIHlvdSBtb3VzZSBkb3duIG9uIHRoZSB0aXRsZSBwb3J0aW9uLCB0aGUgb25tb3VzZWRvd24gZmlyZXMgdG8gbW92ZSB0aGUgd2luZG93LlxuICAvLyBNb3VzaW5nIGRvd24gdGhlIGJvdHRvbSBvZiB0aGUgd2luZG93LCB0aGUgbGVmdCBzaWRlIG9mIHRoZSB3aW5kb3csXG4gIC8vIG9yIHRoZSBib3R0b20gb2YgdGhlIHdpbmRvdyB3aWxsIGZpcmUgdGhlIG9ubW91c2VEb3duIG9mIHRoZSB3aW5kb3cgaXRzZWxmIChDQmVhbkZyYW1lKVxuICAvLyBhcyB3ZWxsIGFzIHRoZSBvbm1vdXNlRG93biBvZiB0aGUgQ01hcmtlcldpbmRvdyBmb3IgcmVzaXppbmcuXG4gIC8vIEVhY2ggbW91c2Vkb3duIGVsZW1lbnQgaXMgc2V0IHRvIGEgY3VycmVudE9iamVjdCBhcyBiZWluZyBzZWxlY3RlZCxcbiAgLy8gd2hldGhlciBpdCdzIGEgd2luZG93IG9yIGEgbWFya2VyLlxuXG4gIC8vIHRoaXMgbWVhbnMgaHRtbEVsZW1lbnQgb2YgQ0JlYW5GcmFtZSBvYmplY3RcbiAgdmFyIHJlZkh0bWxFbGVtZW50ID0gdGhpcztcblxuICB2YXIgZSA9IGV2dDtcblxuICBpZiAoVE9VQ0hfRU5BQkxFRCkge1xuICAgIGlmIChldnQudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgICB2YXIgY2hhbmdlZFRvdWNoZXMgPSBldnQuY2hhbmdlZFRvdWNoZXM7XG4gICAgICBpZiAoVE9VQ0hfTU9WRV9PTkxZX1dJVEhfT05FX0ZJTkdFUikge1xuICAgICAgICB2YXIgdG91Y2hlcyA9IGV2dC50b3VjaGVzO1xuICAgICAgICBpZiAodG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBlID0gY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGUgPSBjaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvL1JldHJpZXZlIENCZWFuRnJhbWUgb2JqZWN0IGl0c2VsZlxuICB2YXIgcmVmQ0JlYW5GcmFtZSA9IHJlZkh0bWxFbGVtZW50LnBhcmVudDtcblxuICBpZiAoZS5idXR0b24gPT0gMCB8fCBldnQudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgLy8gZm9yIG1vZGFsIGJhY2tncm91bmQgd2luZG93XG4gICAgaWYgKHJlZkNCZWFuRnJhbWUucHVsbFVwRGlzYWJsZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAvLyBTZXQgdGhlIGN1cnJlbnQgQ0JlYW5GcmFtZSB0byBiZSBzZWxlY3RlZCg9Y3VycmVudE9iamVjdCkgYW1vbmcgb3RoZXIgQ0JlYW5GcmFtZXMgaW4gdGhlIHBhcmVudCBjYW52YXMuXG4gICAgICByZWZIdG1sRWxlbWVudC5wYXJlbnRDYW52YXMuY3VycmVudE9iamVjdCA9IHJlZkh0bWxFbGVtZW50O1xuXG4gICAgICAvLyBCcmluZyB0aGUgY3VycmVudCBiZWFuIHRvIHRoZSB0b3BcbiAgICAgIHJlZkh0bWxFbGVtZW50LnBhcmVudENhbnZhcy5wdWxsVXAocmVmQ0JlYW5GcmFtZS5pZCk7XG4gICAgfVxuXG4gIH0gZWxzZSBpZiAoZS5idXR0b24gPT0gMikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChyZWZIdG1sRWxlbWVudC5wYXJlbnRDYW52YXMuY3VycmVudE9iamVjdCkge1xuXG4gICAgcmVmSHRtbEVsZW1lbnQucGFyZW50Q2FudmFzLm9mZnNldFggPSBlLnBhZ2VYIC0gcGFyc2VJbnQocmVmSHRtbEVsZW1lbnQucGFyZW50Q2FudmFzLmN1cnJlbnRPYmplY3Quc3R5bGUubGVmdCwgMTApO1xuICAgIHJlZkh0bWxFbGVtZW50LnBhcmVudENhbnZhcy5vZmZzZXRZID0gZS5wYWdlWSAtIHBhcnNlSW50KHJlZkh0bWxFbGVtZW50LnBhcmVudENhbnZhcy5jdXJyZW50T2JqZWN0LnN0eWxlLnRvcCwgMTApO1xuICB9XG5cblxuICByZXR1cm4gZmFsc2U7XG59O1xuLyoqXG4gKiBFbmQgb2YgQ0JlYW5GcmFtZSBDbGFzcyA8cD5cbiAqL1xuXG4vLystKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy1cblxuXG5ERUYuQ0FOVkFTID0ge307XG5ERUYuQ0FOVkFTLkhUTUxfRUxFTUVOVCA9ICdkaXYnO1xuREVGLkNBTlZBUy5XSURUSF9BREpVU1RfMjAxODA3MjIgPSAyO1xuREVGLkNBTlZBUy5IRUlHSFRfQURKVVNUXzIwMTgwNzIyID0gMztcblxuLyoqXG4gKiBDQ2FudmFzIGNsYXNzXG4gKiBBIGNhbnZhcyBpcyBhIHBsYWNlIHdoZXJlIHdpbmRvd3MgYXJlIGFycmFuZ2VkLCB3aGVyZSB5b3UgY2FuIGRyYWcgYW5kIG1vdmUgZnJlZWx5LlxuICpcbiAqIEBwYXJhbSBwYXJlbnRFbGVtZW50XG4gKiBAcGFyYW0gY2FudmFzSWRcbiAqIEBwYXJhbSBsZWZ0XG4gKiBAcGFyYW0gdG9wXG4gKiBAcGFyYW0gd2lkdGhcbiAqIEBwYXJhbSBoZWlnaHRcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDQ2FudmFzKHBhcmVudEVsZW1lbnQsIGNhbnZhc0lkLCBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQpIHtcblxuICAvL0V2ZW50IGRhdGEgdG8gYmUgdHJhbnNtaXR0ZWRcbiAgZnVuY3Rpb24gRXZlbnREYXRhKCkge1xuICAgIHRoaXMueCA9IDA7XG4gICAgdGhpcy55ID0gMDtcbiAgICB0aGlzLnNjcmVlblggPSAwO1xuICAgIHRoaXMuc2NyZWVuWSA9IDA7XG4gICAgdGhpcy5kZWx0YVggPSAwO1xuICAgIHRoaXMuZGVsdGFZID0gMDtcbiAgICB0aGlzLmlzTW92ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnRhcmdldFR5cGVOYW1lID0gbnVsbDtcbiAgICB0aGlzLnRhcmdldFVzYWdlID0gbnVsbDtcbiAgICB0aGlzLnRhcmdldE9iamVjdCA9IG51bGw7XG4gIH1cblxuICB2YXIgbWUgPSB0aGlzO1xuXG5cbiAgbWUuZW5hYmxlUHVsbFVwID0gdHJ1ZTsvLyB0cnVlOlB1bGwtdXAgc29ydGluZyB0byBicmluZyB0aGUgd2luZG93IHRvIHRoZSBmb3JlZnJvbnQgYnkgY2xpY2tpbmcgdG8gZ2V0IGZvY3VzLlxuICBtZS5jdXJyZW50T2JqZWN0ID0gbnVsbDtcbiAgbWUub25Ub3BPYmplY3QgPSBudWxsO1xuICBtZS5vZmZzZXRYID0gMDtcbiAgbWUub2Zmc2V0WSA9IDA7XG5cblxuICAvL09iamVjdCB3aGljaCBnZW5lcmF0ZWQgJ21vdXNlRG93bicgZXZlbnQgYXQgdGhlIHZlcnkgYmVnaW5uaW5nKGljaGliYW4tc2Fpc2hvKVxuICBtZS5tb3VzZURvd25Tb3VyY2UgPSBudWxsO1xuXG4gIG1lLmlkID0gY2FudmFzSWQ7XG4gIG1lLmNhbnZhc0VsZW1lbnQgPSBudWxsO1xuICBtZS5wYXJlbnRFbGVtZW50ID0gcGFyZW50RWxlbWVudDtcbiAgbWUuYmVhbkxpc3QgPSBuZXcgQXJyYXkoKTtcblxuICBtZS5iZWFuSWROYW1lID0ge307Ly9rZXk6YmVhbklkIHZhbHVlOmJlYW5OYW1lXG4gIG1lLmJlYW5OYW1lSWQgPSB7fTsvL2tleTpiZWFuTmFtZSB2YWx1ZTpiZWFuSWRcblxuICBtZS5ldmVudERhdGEgPSBuZXcgRXZlbnREYXRhKCk7XG5cblxuICBtZS5iYXNlWkluZGV4ID0gMDtcbiAgbWUuc2V0QmFzZVpJbmRleCA9IGZ1bmN0aW9uKGJhc2VaSW5kZXgpIHtcbiAgICBtZS5iYXNlWkluZGV4ID0gYmFzZVpJbmRleDtcbiAgfTtcbiAgbWUuZ2V0QmFzZVpJbmRleCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBtZS5iYXNlWkluZGV4O1xuICB9O1xuXG5cbiAgbWUuY2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoREVGLkNBTlZBUy5IVE1MX0VMRU1FTlQpO1xuXG4gIG1lLmNhbnZhc0VsZW1lbnQuc3R5bGUuekluZGV4ID0gMjAwMDtcbiAgbWUuY2FudmFzRWxlbWVudC5pZCA9IG1lLmlkO1xuICBtZS5jYW52YXNFbGVtZW50LnN0eWxlLmJveFNpemluZyA9ICdib3JkZXItYm94JztcbiAgbWUuY2FudmFzRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gIG1lLmNhbnZhc0VsZW1lbnQuc3R5bGUubGVmdCA9IHBhcnNlSW50KGxlZnQpICsgJ3B4JztcbiAgbWUuY2FudmFzRWxlbWVudC5zdHlsZS50b3AgPSBwYXJzZUludCh0b3ApICsgJ3B4JztcbiAgLy9BZGRlZCBhbiBhZGp1c3RtZW50IHZhbHVlLkJlY2F1c2UgdHJhbnNwYXJlbnQgcGFydCBhcHBlYXJzIGF0IHRoZSBib3R0b20gb2YgdGhlIHNjcmVlbixcbiAgbWUuY2FudmFzRWxlbWVudC5zdHlsZS53aWR0aCA9IChwYXJzZUludCh3aWR0aCkgKyBERUYuQ0FOVkFTLldJRFRIX0FESlVTVF8yMDE4MDcyMikgKyAncHgnO1xuICBtZS5jYW52YXNFbGVtZW50LnN0eWxlLmhlaWdodCA9IChwYXJzZUludChoZWlnaHQpICsgREVGLkNBTlZBUy5IRUlHSFRfQURKVVNUXzIwMTgwNzIyKSArICdweCc7XG4gIG1lLmNhbnZhc0VsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3RyYW5zcGFyZW50JztcbiAgbWUuY2FudmFzRWxlbWVudC5zdHlsZS5ib3JkZXJTdHlsZSA9ICdub25lJztcbiAgbWUuY2FudmFzRWxlbWVudC5zdHlsZS5tYXJnaW4gPSAnMHB4JztcbiAgbWUuY2FudmFzRWxlbWVudC5zdHlsZS5ib3JkZXJXaWR0aCA9ICcwcHgnO1xuICBtZS5jYW52YXNFbGVtZW50LnN0eWxlLmJvcmRlckNvbG9yID0gJ3RyYW5zcGFyZW50JztcblxuICAvL0FkZCB0aGUgQ2FudmFzJ3MgaHRtbCBlbGVtZW50IGludG8gdGhlIGNhbnZhcydzIHBhcmVudCBodG1sIGVsZW1lbnRcbiAgbWUucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChtZS5jYW52YXNFbGVtZW50KTtcblxufVxuXG5cbkNDYW52YXMucHJvdG90eXBlLm1vdXNlTW92ZSA9IGZ1bmN0aW9uKGV2dCkge1xuXG4gIHZhciBtZSA9IHRoaXM7XG4gIHZhciBlID0gZXZ0O1xuICBpZiAoVE9VQ0hfRU5BQkxFRCkge1xuICAgIGlmIChldnQudHlwZSA9PT0gJ3RvdWNobW92ZScpIHtcbiAgICAgIHZhciBjaGFuZ2VkVG91Y2hlcyA9IGV2dC5jaGFuZ2VkVG91Y2hlcztcbiAgICAgIGlmIChUT1VDSF9NT1ZFX09OTFlfV0lUSF9PTkVfRklOR0VSKSB7XG4gICAgICAgIHZhciB0b3VjaGVzID0gZXZ0LnRvdWNoZXM7XG4gICAgICAgIGlmICh0b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGUgPSBjaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZSA9IGNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAobWUuY3VycmVudE9iamVjdCkge1xuXG4gICAgLy9ldmVudERhdGEuaXNNb3ZlZD10cnVlO1RoZSBwcmVzZW5jZSBvZiBldmVudCBkYXRhIG1lYW5zIHRoYXQgaXQgaGFzIG1vdmVkLlxuICAgIG1lLmV2ZW50RGF0YS50YXJnZXRUeXBlTmFtZSA9IG1lLmN1cnJlbnRPYmplY3QudHlwZU5hbWU7XG4gICAgbWUuZXZlbnREYXRhLnRhcmdldFVzYWdlID0gbWUuY3VycmVudE9iamVjdC51c2FnZTtcbiAgICBtZS5ldmVudERhdGEudGFyZ2V0T2JqZWN0ID0gbWUuY3VycmVudE9iamVjdDtcblxuICAgIC8vRXZlbiB3aGVuIG9iaiBpcyBub3QgYmVpbmcgZHJhZ2dlZCwgbW91c2UgY29vcmRpbmF0ZXMgYXJlIHVzZWQgaGVyZSBiZWNhdXNlIHRoZXkgYXJlIG5lZWRlZC5cbiAgICB2YXIgbmV3T2JqTGVmdFB4ID0gZS5wYWdlWCAtIG1lLm9mZnNldFg7XG4gICAgdmFyIG5ld09ialRvcFB4ID0gZS5wYWdlWSAtIG1lLm9mZnNldFk7XG5cbiAgICB2YXIgYWJzb2x1dGVNb3VzZVggPSBlLnBhZ2VYO1xuICAgIHZhciBhYnNvbHV0ZU1vdXNlWSA9IGUucGFnZVk7XG5cbiAgICAvL1Rha2UgdGhlIHNuYXBzaG90IGJlZm9yZSB1cGRhdGluZyB0aGUgbG9jYXRpb24uXG4gICAgdmFyIG9sZE9iakxlZnRQeCA9IG1lLmN1cnJlbnRPYmplY3Quc3R5bGUubGVmdDtcbiAgICB2YXIgb2xkT2JqVG9wUHggPSBtZS5jdXJyZW50T2JqZWN0LnN0eWxlLnRvcDtcblxuICAgIC8vV2hlbiB0aGUgbW91c2UgY3Vyc29yIGdvZXMgb3V0IG9mIHJhbmdlLFxuICAgIC8vdGhlIGFkZGl0aW9uIGluIHRoZSBYIGRpcmVjdGlvbiBhbmQgWSBkaXJlY3Rpb24gKGRlbHRhIFgsIGRlbHRhIFkpIGlzIHNldCB0byB6ZXJvLlxuICAgIC8vdGhpcy5sZWZ0PUNhdmFzJ3MgbGVmdCBzaWRlIGVkZ2UsIHRoaXMudG9wPUNhbnZhcydzIHRvcCBzaWRlIGVkZ2UuXG4gICAgdmFyIHRtcExlZnQgPSBwYXJzZUludChuZXdPYmpMZWZ0UHgsIDEwKTtcbiAgICB2YXIgdG1wVG9wID0gcGFyc2VJbnQobmV3T2JqVG9wUHgsIDEwKTtcblxuICAgIHZhciB0bXBSaWdodCA9IHRtcExlZnQgKyBwYXJzZUludChtZS5jdXJyZW50T2JqZWN0LnN0eWxlLndpZHRoLCAxMCk7XG4gICAgdmFyIHRtcEJvdHRvbSA9IHRtcFRvcCArIHBhcnNlSW50KG1lLmN1cnJlbnRPYmplY3Quc3R5bGUuaGVpZ2h0LCAxMCk7XG5cbiAgICB2YXIgc3R5bGVXaWR0aCA9IHBhcnNlSW50KG1lLmNhbnZhc0VsZW1lbnQuc3R5bGUud2lkdGgsIDEwKTtcbiAgICB2YXIgc3R5bGVIZWlnaHQgPSBwYXJzZUludChtZS5jYW52YXNFbGVtZW50LnN0eWxlLmhlaWdodCwgMTApO1xuXG4gICAgdmFyIGRlbHRhWCA9IDA7XG4gICAgdmFyIGRlbHRhWSA9IDA7XG5cbiAgICBpZiAobWUuY3VycmVudE9iamVjdC5pc1JhbmdlTGltaXRlZCA9PSB0cnVlICYmXG4gICAgICAodG1wTGVmdCA8PSAwIHx8IHRtcFJpZ2h0ID4gc3R5bGVXaWR0aCB8fCB0bXBUb3AgPD0gMCB8fCB0bXBCb3R0b20gPiBzdHlsZUhlaWdodClcbiAgICApIHtcbiAgICAgIGRlbHRhWCA9IDA7XG4gICAgICBkZWx0YVkgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWx0YVggPSAocGFyc2VJbnQobmV3T2JqTGVmdFB4LCAxMCkgLSBwYXJzZUludChvbGRPYmpMZWZ0UHgsIDEwKSk7XG4gICAgICBkZWx0YVkgPSAocGFyc2VJbnQobmV3T2JqVG9wUHgsIDEwKSAtIHBhcnNlSW50KG9sZE9ialRvcFB4LCAxMCkpO1xuICAgICAgbWUuY3VycmVudE9iamVjdC5zdHlsZS5sZWZ0ID0gKHBhcnNlSW50KG1lLmN1cnJlbnRPYmplY3Quc3R5bGUubGVmdCkgKyBkZWx0YVggKiBtZS5jdXJyZW50T2JqZWN0LmFyZ1gpICsgJ3B4JztcbiAgICAgIG1lLmN1cnJlbnRPYmplY3Quc3R5bGUudG9wID0gKHBhcnNlSW50KG1lLmN1cnJlbnRPYmplY3Quc3R5bGUudG9wKSArIGRlbHRhWSAqIG1lLmN1cnJlbnRPYmplY3QuYXJnWSkgKyAncHgnO1xuXG4gICAgICB2YXIgcGFyZW50T2JqZWN0ID0gbWUuY3VycmVudE9iamVjdC5wYXJlbnQ7XG4gICAgICBpZiAocGFyZW50T2JqZWN0ICYmIHBhcmVudE9iamVjdC5fb25Nb3ZlKSB7XG4gICAgICAgIHBhcmVudE9iamVjdC5fb25Nb3ZlKCk7XG4gICAgICB9XG5cbiAgICB9XG4gICAgbWUuZXZlbnREYXRhLmRlbHRhWCA9IGRlbHRhWDtcbiAgICBtZS5ldmVudERhdGEuZGVsdGFZID0gZGVsdGFZO1xuXG4gICAgcmV0dXJuIG1lLmV2ZW50RGF0YTtcblxuICB9XG4gIC8vUmV0dXJucyBudWxsIGlmIG5vbmUgb2YgdGhlIG9iamVjdHMgYXJlIGNsaWNrZWQgYW5kIHRoZSBvbmx5IG1vdXNlIGp1c3QgbW92ZXMuXG4gIHJldHVybiBudWxsO1xufTtcblxuXG5DQ2FudmFzLnByb3RvdHlwZS5tb3VzZVVwID0gZnVuY3Rpb24oZSkge1xuICB2YXIgbWUgPSB0aGlzO1xuICBtZS5jdXJyZW50T2JqZWN0ID0gbnVsbDtcbiAgbWUubW91c2VEb3duU291cmNlID0gbnVsbDtcbn07XG5cblxuLy9CcmluZyB0aGUgb2JqZWN0IGluIGZyb250XG5DQ2FudmFzLnByb3RvdHlwZS5wdWxsVXAgPSBmdW5jdGlvbih0YXJnZXRCZWFuSWQpIHtcblxuICB2YXIgbWUgPSB0aGlzO1xuXG4gIHZhciB0bXBCZWFuQXJyYXkgPSBbXTtcblxuICB2YXIgYmVhbkxpc3QgPSBtZS5iZWFuTGlzdDtcblxuICBmb3IgKHZhciBpIGluIGJlYW5MaXN0KSB7XG4gICAgdG1wQmVhbkFycmF5LnB1c2goYmVhbkxpc3RbaV0pO1xuICB9XG5cbiAgLy9CcmluZyB0aGUgdGFyZ2V0IG9iamVjdCBpbiBmcm9udCBhbmQgc2V0IHppbmRleCB0byAxLlxuICB2YXIgdGFyZ2V0QmVhbiA9IGJlYW5MaXN0W3RhcmdldEJlYW5JZF07XG5cbiAgaWYgKG1lLmVuYWJsZVB1bGxVcCkge1xuICAgIG1lLnB1bGxVcFNvcnQodGFyZ2V0QmVhbiwgdG1wQmVhbkFycmF5LCBtZS5iYXNlWkluZGV4KTtcbiAgfVxuXG5cbiAgLy9SZW1lbWJlciB0aGUgdG9wIG9iamVjdFxuICBtZS5vblRvcE9iamVjdCA9IHRhcmdldEJlYW47XG5cblxufTtcblxuLy9DYWxjdWxhdGUgdGhlIGZyb250IC8gYmFjayBpbmZvcm1hdGlvbiBvZiB0aGUgd2luZG93IGFjY3VyYXRlbHkuXG5DQ2FudmFzLnByb3RvdHlwZS5wdWxsVXBTb3J0ID0gZnVuY3Rpb24ocHVsbHVwT2JqZWN0LCBvYmplY3RBcnJheSwgYmFzZUluZGV4KSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgLy9JbmNyZWFzZSB0aGUgaW5kZXggbnVtYmVyIG9mIHRoZSB0YXJnZXQgb2JqZWN0XG4gIHB1bGx1cE9iamVjdC5odG1sRWxlbWVudC5zdHlsZS56SW5kZXggPSBvYmplY3RBcnJheS5sZW5ndGggKyBiYXNlSW5kZXg7XG5cbiAgLy9zb3J0IGJ5IGluZGV4XG4gIG9iamVjdEFycmF5LnNvcnQoZnVuY3Rpb24oYiwgYSkge1xuICAgIHJldHVybiAtcGFyc2VJbnQoYi5odG1sRWxlbWVudC5zdHlsZS56SW5kZXgsIDEwKSArIHBhcnNlSW50KGEuaHRtbEVsZW1lbnQuc3R5bGUuekluZGV4LCAxMCk7XG4gIH0pO1xuXG4gIC8vUmVkZWZpbmUgbnVtYmVyIG9mIHRoZSBpbmRleFxuICBmb3IgKHZhciBpIGluIG9iamVjdEFycmF5KSB7XG4gICAgb2JqZWN0QXJyYXlbaV0uaHRtbEVsZW1lbnQuc3R5bGUuekluZGV4ID0gKG9iamVjdEFycmF5Lmxlbmd0aCAtIDEpIC0gaSArIGJhc2VJbmRleDtcbiAgfVxuXG59O1xuXG5cbi8qKlxuICogcmVtb3ZlIHRoZSBiZWFuIG9iamVjdFxuICogQHBhcmFtIGJlYW5JZFxuICovXG5DQ2FudmFzLnByb3RvdHlwZS5yZW1vdmVCZWFuID0gZnVuY3Rpb24oYmVhbklkKSB7XG5cbiAgdmFyIG1lID0gdGhpcztcblxuICAvL1JldHJpZXZlIHRoZSB0YXJnZXQgYmVhbkZyYW1lXG4gIHZhciBiZWFuTGlzdCA9IG1lLmJlYW5MaXN0O1xuICB2YXIgdGFyZ2V0QmVhbiA9IGJlYW5MaXN0W2JlYW5JZF07XG5cbiAgLy9SZW1vdmUgYmVhbidzIGh0bWxFbGVtZW50IGZyb20gY2FudmFzRWxlbWVudFxuICBtZS5jYW52YXNFbGVtZW50LnJlbW92ZUNoaWxkKHRhcmdldEJlYW4uaHRtbEVsZW1lbnQpO1xuXG4gIC8vRGVsZXRlIHRoZSBiZWFuIG9iamVjdCBpbiB0aGUgYXNzb2NpYXRpdmUgYXJyYXkuXG4gIGRlbGV0ZSBiZWFuTGlzdFtiZWFuSWRdO1xuXG5cbn07XG5cblxuLyoqXG4gKiBBZGQgYmVhbiBpbnRvIHRoaXMgY2FudmFzXG4gKiBAcGFyYW0gYmVhblxuICovXG5DQ2FudmFzLnByb3RvdHlwZS5hZGRCZWFuID0gZnVuY3Rpb24oYmVhbikge1xuXG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgdmFyIGJlYW5MaXN0ID0gbWUuYmVhbkxpc3Q7XG5cbiAgdmFyIGJlYW5JZE5hbWUgPSBtZS5iZWFuSWROYW1lOy8va2V5OmJlYW5JZCB2YWx1ZTpiZWFuTmFtZVxuICB2YXIgYmVhbk5hbWVJZCA9IG1lLmJlYW5OYW1lSWQ7IC8va2V5OmJlYW5OYW1lIHZhbHVlOmJlYW5JZFxuXG5cbiAgYmVhbkxpc3RbYmVhbi5pZF0gPSBiZWFuO1xuXG4gIGlmIChiZWFuLnByb3BlcnR5Lm5hbWUpIHtcbiAgICBiZWFuTmFtZUlkW2JlYW4ucHJvcGVydHkubmFtZV0gPSBiZWFuLmlkO1xuICAgIGJlYW5JZE5hbWVbYmVhbi5pZF0gPSBiZWFuLnByb3BlcnR5Lm5hbWU7XG4gIH1cblxuICAvL0luIHRoaXMgdXNhZ2UgY2FzZSB0aGUgJ2xlbmd0aCcgcHJvcGVydHkgaXMgaW52YWxpZCAuLlxuICB2YXIgbnVtID0gMDtcblxuICBmb3IgKHZhciBqIGluIGJlYW5MaXN0KSB7XG4gICAgbnVtKys7XG4gIH1cblxuICAvL1NldCB6SW5kZXggc28gdGhhdCB3aGF0IHlvdSBhZGQgbGF0ZXIgd2lsbCBjb21lIHVwLlxuICBiZWFuLmh0bWxFbGVtZW50LnN0eWxlLnpJbmRleCA9IG51bSArIG1lLmJhc2VaSW5kZXg7XG5cbiAgLy9PbiB0aGUgYmVhbiBzaWRlLCBzcGVjaWZ5IHRoZSBwYXJlbnQgb2YgdGhlIGJlYW4gdG8gbWUuXG4gIGJlYW4uc2V0UGFyZW50Q2FudmFzKG1lKTtcblxuXG4gIHRoaXMuY2FudmFzRWxlbWVudC5hcHBlbmRDaGlsZChiZWFuLmh0bWxFbGVtZW50KTtcbn07XG5cbkNDYW52YXMucHJvdG90eXBlLmdldFBhcmVudEVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgcmV0dXJuIG1lLnBhcmVudEVsZW1lbnQ7XG59O1xuXG4vKipcbiAqIEVuZCBvZiBjYW52YXMgY2xhc3NcbiAqL1xuXG4vLystKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy1cblxuXG5ERUYuQ0ZSQU1FID0ge307XG5ERUYuQ0ZSQU1FLkNBTlZBU19FTEVNRU5UX0JHQ09MT1IgPSAndHJhbnNwYXJlbnQnO1xuREVGLkNGUkFNRS5NT0RBTF9CQUNLR1JPVU5EX0ZSQU1FX0lEX1BSRUZJWCA9ICd3aW5kb3dfX21vZGFsX3dpbmRvd19iYWNrZ3JvdW5kXyc7XG5cblxuaW5oZXJpdChDRnJhbWUsIENCZWFuRnJhbWUpO1xuXG5cbi8qKlxuICogQ0ZyYW1lIGNsYXNzXG4gKiA8cD5cbiAqIFRoaXMgY2xhc3MgcmVwcmVzZW50cyBhIHdpbmRvdyB3aG9zZSBzaXplIGNhbiBiZSBjaGFuZ2VkICxcbiAqIGNhbiBtb3ZlIGZyZWVseSBvbiB0aGUgc2NyZWVuLFxuICogY2FuIGhhdmUgYSB0aXRsZSBiYXIsXG4gKlxuICogQHBhcmFtIHdpbmRvd0lkXG4gKiBAcGFyYW0gd19sZWZ0XG4gKiBAcGFyYW0gd190b3BcbiAqIEBwYXJhbSB3X3dpZHRoXG4gKiBAcGFyYW0gd19oZWlnaHRcbiAqIEBwYXJhbSB6aW5kZXhcbiAqIEBwYXJhbSB3X2JvcmRlcl93aWR0aFxuICogQHBhcmFtIGFwcGVhcmFuY2VcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDRnJhbWUod2luZG93SWQsIHdfbGVmdCwgd190b3AsIHdfd2lkdGgsIHdfaGVpZ2h0LCB6aW5kZXgsIHdfYm9yZGVyX3dpZHRoLCBhcHBlYXJhbmNlKSB7XG5cbiAgdmFyIG1lID0gdGhpcztcblxuICAvL2NhbGwgY29uc3RydWN0b3Igb2Ygc3VwZXJjbGFzc1xuICBDRnJhbWUuc3VwZXJDb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHdpbmRvd0lkLCB3X2xlZnQsIHdfdG9wLCB3X3dpZHRoLCB3X2hlaWdodCwgemluZGV4LCB3X2JvcmRlcl93aWR0aCwgYXBwZWFyYW5jZSk7XG5cbiAgbWUuYW5jaG9yID0gQ0FMSUdOLkxFRlRfVE9QO1xuXG4gIG1lLnNob3dUaXRsZUJhciA9IGFwcGVhcmFuY2Uuc2hvd1RpdGxlQmFyO1xuXG4gIG1lLmNhbnZhc05ldEhlaWdodCA9IG51bGw7XG4gIG1lLmNhbnZhc05ldFdpZHRoID0gbnVsbDtcbiAgbWUuZnJhbWVIZWlnaHRBZGp1c3QgPSBhcHBlYXJhbmNlLmZyYW1lSGVpZ2h0QWRqdXN0O1xuXG4gIG1lLmZyYW1lQ29tcG9uZW50TWFwID0ge307XG5cblxuICAvL2luaXRpYWxpemUgdGhlIGZpZWxkXG4gIG1lLmNhbnZhcyA9IG51bGw7XG5cbiAgLy9jYW52YXMgaWRcbiAgbWUubXlDYW52YXNJZCA9IG51bGw7XG5cbiAgLy9CdXR0b25zIHRvIGJlIHBsYWNlZCBvbiB0aGUgc2NyZWVuIChwb3NpdGlvbmluZyBzYW1lIGFzIHRoZSBjbG9zZSBidXR0b24pXG4gIG1lLmZsb2F0aW5nQnV0dG9uID0gbnVsbDtcblxuICBtZS50aXRsZUJhckNsYXNzTmFtZURlZmF1bHQgPSAnanNmcmFtZS10aXRsZWJhci1kZWZhdWx0JzsvLyBERUYuQ0ZSQU1FLlRJVExFX0JBUl9DTEFTU19ERUZBVUxUO1xuICBtZS50aXRsZUJhckNsYXNzTmFtZUZvY3VzZWQgPSAnanNmcmFtZS10aXRsZWJhci1mb2N1c2VkJzsvL0RFRi5DRlJBTUUuVElUTEVfQkFSX0NMQVNTX0ZPQ1VTRUQ7XG5cblxuICAvL2hlaWdodCBvZiB0aXRsZWJhclxuICBtZS50aXRsZUJhckhlaWdodCA9IGFwcGVhcmFuY2UudGl0bGVCYXJIZWlnaHQ7XG5cbiAgbWUudGl0bGVCYXJDYXB0aW9uID0gYXBwZWFyYW5jZS50aXRsZUJhckNhcHRpb247XG4gIG1lLnRpdGxlQmFyQ2FwdGlvbkxlZnRNYXJnaW4gPSBhcHBlYXJhbmNlLnRpdGxlQmFyQ2FwdGlvbkxlZnRNYXJnaW47XG4gIG1lLnRpdGxlQmFyQ2FwdGlvbkZvbnRTaXplID0gYXBwZWFyYW5jZS50aXRsZUJhckNhcHRpb25Gb250U2l6ZTtcbiAgbWUudGl0bGVCYXJDYXB0aW9uRm9udFdlaWdodCA9IGFwcGVhcmFuY2UudGl0bGVCYXJDYXB0aW9uRm9udFdlaWdodDtcbiAgbWUudGl0bGVCYXJCb3JkZXJCb3R0b21EZWZhdWx0ID0gYXBwZWFyYW5jZS50aXRsZUJhckJvcmRlckJvdHRvbURlZmF1bHQ7XG4gIG1lLnRpdGxlQmFyQm9yZGVyQm90dG9tRm9jdXNlZCA9IGFwcGVhcmFuY2UudGl0bGVCYXJCb3JkZXJCb3R0b21Gb2N1c2VkO1xuICBtZS50aXRsZUJhckNhcHRpb25UZXh0U2hhZG93ID0gYXBwZWFyYW5jZS50aXRsZUJhckNhcHRpb25UZXh0U2hhZG93O1xuICBtZS50aXRsZUJhckNhcHRpb25UZXh0QWxpZ24gPSBhcHBlYXJhbmNlLnRpdGxlQmFyQ2FwdGlvblRleHRBbGlnbjtcblxuICAvL1RpdGxlIGJhciB3aWR0aCBhZGp1c3RtZW50IHZhbHVlXG4gIG1lLnRpdGxlQWRqdXN0V2lkdGggPSAyO1xuXG4gIG1lLndpbmRvd0lkID0gd2luZG93SWQ7XG5cbiAgbWUuZXhCb3JkZXJXaWR0aCA9IDA7XG5cblxuICBtZS5teUNhbnZhc0lkID0gd2luZG93SWQgKyAnX2NhbnZhcyc7XG5cblxuICAvL2ltZyBlbGVtZW50IGZvciBpY29uIHBsYWNlZCBvbiB0aGUgbGVmdC10b3BcbiAgdmFyIGFwcEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgLy9cdFx0YXBwSWNvbi5zcmM9J2ltZy9pY29fYXBwX2ZpbGUxNi5naWYnO1xuXG4gIC8vdXJsIG9mIGljb24gaW1hZ2VcbiAgYXBwSWNvbi5zcmMgPSAnJztcbiAgYXBwSWNvbi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gIGFwcEljb24uc3R5bGUubGVmdCA9ICcycHgnO1xuICBhcHBJY29uLnN0eWxlLnRvcCA9ICcycHgnO1xuICBhcHBJY29uLnN0eWxlLndpZHRoID0gJzE2cHgnO1xuICBhcHBJY29uLnN0eWxlLmhlaWdodCA9ICcxNnB4JztcbiAgYXBwSWNvbi5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG5cblxuICAvL1RoZSB0aXRsZSBiYXIgbXVzdCBiZSBvbiB0aGUgZnJvbnQgb2YgdGhlIGNhbnZhcy5cbiAgbWUudGl0bGVCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICBtZS50aXRsZUJhci5jbGFzc05hbWUgPSAnanNmcmFtZXRpdGxlYmFyJztcblxuICBpZiAobWUuc2hvd1RpdGxlQmFyKSB7XG5cbiAgICBtZS50aXRsZUJhci5pZCA9IHdpbmRvd0lkICsgJ190aXRsZSc7XG4gICAgbWUudGl0bGVCYXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIG1lLnRpdGxlQmFyLnN0eWxlLmJveFNpemluZyA9ICdib3JkZXItYm94JztcbiAgICBtZS50aXRsZUJhci5zdHlsZS50b3AgPSAnMHB4JztcbiAgICBtZS50aXRsZUJhci5zdHlsZS5sZWZ0ID0gJzBweCc7XG4gICAgbWUudGl0bGVCYXIuc3R5bGUud2lkdGggPSAod193aWR0aCAtIG1lLnRpdGxlQWRqdXN0V2lkdGggKyBERUYuQ0FOVkFTLldJRFRIX0FESlVTVF8yMDE4MDcyMikgKyAncHgnO1xuICAgIG1lLnRpdGxlQmFyLnN0eWxlLnVzZXJTZWxlY3QgPSAnbm9uZSc7XG5cblxuICAgIGlmIChtZS50aXRsZUJhckhlaWdodCkge1xuXG4gICAgICB2YXIgdGl0bGVCYXJBZGp1c3QgPSAwO1xuXG4gICAgICBpZiAobWUudGl0bGVCYXJCb3JkZXJCb3R0b21EZWZhdWx0KSB7XG4gICAgICAgIHRpdGxlQmFyQWRqdXN0ID0gMDtcbiAgICAgIH1cblxuXG4gICAgICBtZS50aXRsZUJhci5zdHlsZS5oZWlnaHQgPSAocGFyc2VJbnQobWUudGl0bGVCYXJIZWlnaHQsIDEwKSArIDApICsgJ3B4JztcbiAgICB9XG5cbiAgICBpZiAobWUudGl0bGVCYXJDb2xvckRlZmF1bHQpIHtcbiAgICAgIG1lLnRpdGxlQmFyLnN0eWxlLmJhY2tncm91bmQgPSBtZS50aXRsZUJhckNvbG9yRGVmYXVsdDtcbiAgICB9XG4gICAgbWUudGl0bGVCYXIuc3R5bGUuekluZGV4ID0gMDtcblxuICAgIG1lLnRpdGxlQmFyLnN0eWxlLmNvbG9yID0gbWUudGl0bGVCYXJDYXB0aW9uQ29sb3JEZWZhdWx0O1xuICAgIG1lLnRpdGxlQmFyLnN0eWxlLmZvbnRTaXplID0gbWUudGl0bGVCYXJDYXB0aW9uRm9udFNpemU7XG4gICAgbWUudGl0bGVCYXIuc3R5bGUuZm9udFdlaWdodCA9IG1lLnRpdGxlQmFyQ2FwdGlvbkZvbnRXZWlnaHQ7XG4gICAgbWUudGl0bGVCYXIuc3R5bGUudGV4dFNoYWRvdyA9IG1lLnRpdGxlQmFyQ2FwdGlvblRleHRTaGFkb3c7XG4gICAgbWUudGl0bGVCYXIuc3R5bGUudGV4dEFsaWduID0gbWUudGl0bGVCYXJDYXB0aW9uVGV4dEFsaWduO1xuICAgIC8vIG1lLnRpdGxlQmFyLnN0eWxlLnRleHRTaGFkb3cgPSBcIjAgMXB4IDAgcmdiYSgyNTUsMjU1LDI1NSwuNylcIjtcbiAgICAvLyBtZS50aXRsZUJhci5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcblxuICAgIG1lLnRpdGxlQmFyLnN0eWxlLmxpbmVIZWlnaHQgPSBtZS50aXRsZUJhci5zdHlsZS5oZWlnaHQ7XG5cblxuICAgIG1lLnRpdGxlQmFyLnN0eWxlLmJvcmRlckJvdHRvbSA9IG1lLnRpdGxlQmFyQm9yZGVyQm90dG9tRGVmYXVsdDtcbiAgICAvL21lLnRpdGxlQmFyLnN0eWxlLmJveFNoYWRvdyA9ICcwIDFweCAwIHJnYmEoMjU1LDI1NSwyNTUsMC41KSc7XG5cblxuICAgIC8vU2V0IG5vdCB0byBkaXNwbGF5IG92ZXJmbG93IGNoYXJhY3RlciBzdHJpbmdcbiAgICBtZS50aXRsZUJhci5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuXG5cbiAgICB2YXIgdGl0bGVCYXJUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuXG4gICAgLy8nc3BhbicgdG8gc3RvcmUgdGV4dFxuICAgIHZhciB0aXRsZUJhclRleHRTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgdGl0bGVCYXJUZXh0U3Bhbi5pZCA9IG1lLmlkICsgJ190aXRsZUJhclRleHQnO1xuICAgIGlmIChtZS50aXRsZUJhckNhcHRpb25MZWZ0TWFyZ2luICE9IG51bGwpIHtcbiAgICAgIHRpdGxlQmFyVGV4dFNwYW4uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgdGl0bGVCYXJUZXh0U3Bhbi5zdHlsZS5sZWZ0ID0gcGFyc2VJbnQobWUudGl0bGVCYXJDYXB0aW9uTGVmdE1hcmdpbiwgMTApICsgJ3B4JztcbiAgICB9IGVsc2Uge1xuICAgICAgdGl0bGVCYXJUZXh0U3Bhbi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICB0aXRsZUJhclRleHRTcGFuLnN0eWxlLmxlZnQgPSAnMHB4JztcbiAgICAgIHRpdGxlQmFyVGV4dFNwYW4uc3R5bGUucmlnaHQgPSAnMHB4JztcbiAgICB9XG4gICAgdGl0bGVCYXJUZXh0U3Bhbi5zdHlsZS50b3AgPSAnMHB4JztcbiAgICB0aXRsZUJhclRleHRTcGFuLmFwcGVuZENoaWxkKHRpdGxlQmFyVGV4dCk7XG4gICAgbWUudGl0bGVCYXIuYXBwZW5kQ2hpbGQodGl0bGVCYXJUZXh0U3Bhbik7XG5cbiAgICAvL0Rpc2NvbnRpbnVlIGFwcGljb24oMjAwNjEwMTEpXG4gICAgLy9tZS50aXRsZUJhci5hcHBlbmRDaGlsZChhcHBJY29uKTtcbiAgfVxuXG4gIG1lLmh0bWxFbGVtZW50LmFwcGVuZENoaWxkKG1lLnRpdGxlQmFyKTtcblxuXG4gIC8vU2V0IENhbnZhcyB0aHJvdWdob3V0IHRoZSB3aW5kb3dcblxuICAvL3BhcnNlSW50KG1lLnRpdGxlQmFyLnN0eWxlLmhlaWdodCk7Ly9tZS50aXRsZUJhckhlaWdodCk7XG4gIHZhciBjYW52YXNNb3JlSGVpZ2h0ID0gcGFyc2VJbnQobWUudGl0bGVCYXJIZWlnaHQsIDEwKSAtIHRpdGxlQmFyQWRqdXN0O1xuICB2YXIgY2FudmFzTW9yZVNwYWNpbmcgPSBwYXJzZUludChtZS50aXRsZUFkanVzdFdpZHRoLCAxMCk7XG5cbiAgaWYgKG1lLnNob3dUaXRsZUJhcikge1xuXG5cbiAgfSBlbHNlIHtcbiAgICBjYW52YXNNb3JlSGVpZ2h0ID0gMDtcbiAgICBjYW52YXNNb3JlU3BhY2luZyA9IDA7XG4gICAgdGl0bGVCYXJBZGp1c3QgPSAwO1xuICB9XG5cblxuICBtZS5jYW52YXNOZXRXaWR0aCA9IHdfd2lkdGggLSBjYW52YXNNb3JlU3BhY2luZztcbiAgbWUuY2FudmFzTmV0SGVpZ2h0ID0gd19oZWlnaHQgLSBjYW52YXNNb3JlSGVpZ2h0IC0gY2FudmFzTW9yZVNwYWNpbmcgLSAxIC0gdGl0bGVCYXJBZGp1c3QgKyBtZS5mcmFtZUhlaWdodEFkanVzdDtcblxuXG4gIC8vQ2hhbmdlIHRoZSBzdHlsZSBvZiBodG1sRWxlbWVudCBvZiBDRnJhbWUgKENCZWFuKS5cbiAgbWUuaHRtbEVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ21vdmUnO1xuXG5cbiAgLy9DcmVhdGUgYSBjYW52YXNcbiAgbWUuY2FudmFzID0gbmV3IENDYW52YXMobWUuaHRtbEVsZW1lbnQsIG1lLm15Q2FudmFzSWQsIDAsIGNhbnZhc01vcmVIZWlnaHQsIHdfd2lkdGggLSBjYW52YXNNb3JlU3BhY2luZywgd19oZWlnaHQgLSBjYW52YXNNb3JlSGVpZ2h0IC0gY2FudmFzTW9yZVNwYWNpbmcpO1xuXG4gIG1lLmNhbnZhcy5lbmFibGVQdWxsVXAgPSBmYWxzZTtcbiAgbWUuY2FudmFzLmNhbnZhc0VsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gREVGLkNGUkFNRS5DQU5WQVNfRUxFTUVOVF9CR0NPTE9SO1xuICBtZS5jYW52YXMuY2FudmFzRWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG5cbiAgaWYgKE1PVVNFX0VOQUJMRUQpIHtcbiAgICAvL0hhbmRsaW5nIHRoZSBvbW91c2Vkb3duIGV2ZW50IHRoYXQgb2NjdXJyZWQgaW4gQ2FudmFzIHdoaWNoIGlzIGEgY2hpbGQgZWxlbWVudCBvZiBDRnJhbWVcbiAgICBtZS5jYW52YXMuY2FudmFzRWxlbWVudC5vbm1vdXNlZG93biA9IG1lLmNhbnZhc01vdXNlRG93bjtcbiAgfVxuXG4gIGlmIChUT1VDSF9FTkFCTEVEKSB7XG4gICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykge1xuICAgICAgdmFyIGZ1bmNPblRvdWNoU3RhcnQgPSBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgLy8gVGhlIFwibW91c2Vkb3duXCIgZXZlbnQgaGFwcGVucyByaWdodCBhZnRlciBcInRvdWNoc3RhcnRcIiBldmVudCxcbiAgICAgICAgLy8gYnV0IEkgZG9uJ3QgY2FsbCAjcHJldmVudGRlZmF1bHQgYmVjYXVzZSAjcHJldmVudGRlZmF1bHQgcHJldmVudHMgXCJvbmNsaWNrXCIgKGxpa2UgYnV0dG9uIG9uIHRpdGxlYmFyKS5cbiAgICAgICAgLy8gU28sIHBlcmZvcm0gI3ByZXZlbnRkZWZhdWx0IG9ubHkgZm9yIFwidG91Y2htb3ZlXCJcbiAgICAgICAgLy8gZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciB0b3VjaFN0YXJ0RXZlbnQgPSBldnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgIG1lLmNhbnZhc01vdXNlRG93bi5iaW5kKHRoaXMpKHRvdWNoU3RhcnRFdmVudCk7XG4gICAgICB9O1xuICAgICAgbWUuY2FudmFzLmNhbnZhc0VsZW1lbnQub250b3VjaHN0YXJ0ID0gZnVuY09uVG91Y2hTdGFydDtcbiAgICB9XG4gIH1cblxuICAvL1NldCB0aGUgY2FudmFzIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgb2YgdGhlIGNhbnZhcyBodG1sIGVsZW1lbnQgY2FudmFzRWxlbWVudC5cbiAgbWUuY2FudmFzLmNhbnZhc0VsZW1lbnQucGFyZW50Q0ZyYW1lID0gbWU7XG5cblxuICB2YXIgdG1wQ2FudmFzV2lkdGggPSBwYXJzZUludChtZS5jYW52YXMuY2FudmFzRWxlbWVudC5zdHlsZS53aWR0aCwgMTApO1xuICB2YXIgdG1wQ2FudmFzSGVpZ2h0ID0gcGFyc2VJbnQobWUuY2FudmFzLmNhbnZhc0VsZW1lbnQuc3R5bGUuaGVpZ2h0LCAxMCk7XG5cbiAgdmFyIG1hcmtlcldpZHRoID0gYXBwZWFyYW5jZS5yZXNpemVBcmVhV2lkdGg7XG4gIHZhciBtYXJrZXJIZWlnaHQgPSBhcHBlYXJhbmNlLnJlc2l6ZUFyZWFIZWlnaHQ7XG5cbiAgLy9PZmZzZXQgZnJvbSBtYXJrZXIgZWRnZVxuICB2YXIgZWRnZU1hcmdpbiA9IGFwcGVhcmFuY2UucmVzaXplQXJlYU9mZnNldDtcbiAgdmFyIG1hcmtlclpJbmRleCA9IDA7XG5cbiAgdmFyIGNvbG9yUkQsIGNvbG9yREQsIGNvbG9yUlI7XG5cbiAgaWYgKGFwcGVhcmFuY2UucmVzaXplQXJlYVZpc2libGUpIHtcbiAgICBjb2xvclJEID0gJ3JnYmEoMjU1LCAwLCAwLCAwLjUpJztcbiAgICBjb2xvckREID0gJ3JnYmEoMCwgMCwgMjU1LCAwLjUpJztcbiAgICBjb2xvclJSID0gJ3JnYmEoMCwgMjU1LCAwLCAwLjUpJztcbiAgfVxuXG4gIC8vTG93ZXIgcmlnaHQoUi1EKVxuICB2YXIgbWFya2VyUkQgPSBuZXcgQ01hcmtlcldpbmRvdyhcbiAgICBtZS5teUNhbnZhc0lkICsgJ19SRCcsXG4gICAgdG1wQ2FudmFzV2lkdGggKyBlZGdlTWFyZ2luLFxuICAgIHRtcENhbnZhc0hlaWdodCArIGVkZ2VNYXJnaW4sXG4gICAgbWFya2VyV2lkdGgsXG4gICAgbWFya2VySGVpZ2h0LFxuICAgIG1hcmtlclpJbmRleCxcbiAgICAnUkQnLCBjb2xvclJEKTtcblxuICBtYXJrZXJSRC5odG1sRWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnc2UtcmVzaXplJzsvL253LXJlc2l6ZSc7XG5cbiAgLy9TaW5jZSBvbmx5IHRoZSBkZWx0YVggYW5kIGRlbHRhWSBhcmUgYWNxdWlyZWQgYW5kIHRoZSBtb3ZlbWVudCBvZiB0aGUgbWFya2VyIGl0c2VsZiBpc1xuICAvLyBwZXJmb3JtZWQgYnkgQ0ZyYW1lX3Jlc2l6ZSwgdGhlIG1vdmVtZW50IGNvZWZmaWNpZW50IG9mIHRoZSBtYXJrZXIgaXRzZWxmIGlzIHNldCB0byAwLlxuICBtYXJrZXJSRC5odG1sRWxlbWVudC5hcmdYID0gMDtcbiAgbWFya2VyUkQuaHRtbEVsZW1lbnQuYXJnWSA9IDA7XG5cblxuICAvL0JvdHRvbShELUQpXG4gIHZhciBtYXJrZXJERCA9IG5ldyBDTWFya2VyV2luZG93KFxuICAgIG1lLm15Q2FudmFzSWQgKyAnX0REJyxcbiAgICAwLFxuICAgIHRtcENhbnZhc0hlaWdodCArIGVkZ2VNYXJnaW4sXG4gICAgdG1wQ2FudmFzV2lkdGggKyBlZGdlTWFyZ2luLFxuICAgIG1hcmtlckhlaWdodCxcbiAgICBtYXJrZXJaSW5kZXgsXG4gICAgJ0REJywgY29sb3JERCk7XG5cbiAgbWFya2VyREQuaHRtbEVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ24tcmVzaXplJztcblxuICAvL1NpbmNlIG9ubHkgdGhlIGRlbHRhWCBhbmQgZGVsdGFZIGFyZSBhY3F1aXJlZCBhbmQgdGhlIG1vdmVtZW50IG9mIHRoZSBtYXJrZXIgaXRzZWxmIGlzXG4gIC8vIHBlcmZvcm1lZCBieSBDRnJhbWVfcmVzaXplLCB0aGUgbW92ZW1lbnQgY29lZmZpY2llbnQgb2YgdGhlIG1hcmtlciBpdHNlbGYgaXMgc2V0IHRvIDAuXG4gIG1hcmtlckRELmh0bWxFbGVtZW50LmFyZ1ggPSAwO1xuICBtYXJrZXJERC5odG1sRWxlbWVudC5hcmdZID0gMDtcblxuICAvL1JpZ2h0KFItUilcbiAgdmFyIG1hcmtlclJSID0gbmV3IENNYXJrZXJXaW5kb3coXG4gICAgbWUubXlDYW52YXNJZCArICdfUlInLFxuICAgIHRtcENhbnZhc1dpZHRoICsgZWRnZU1hcmdpbixcbiAgICAwLFxuICAgIG1hcmtlcldpZHRoLFxuICAgIHRtcENhbnZhc0hlaWdodCArIGVkZ2VNYXJnaW4sXG4gICAgbWFya2VyWkluZGV4LFxuICAgICdSUicsIGNvbG9yUlIpO1xuXG4gIG1hcmtlclJSLmh0bWxFbGVtZW50LnN0eWxlLmN1cnNvciA9ICd3LXJlc2l6ZSc7XG5cbiAgLy9TaW5jZSBvbmx5IHRoZSBkZWx0YVggYW5kIGRlbHRhWSBhcmUgYWNxdWlyZWQgYW5kIHRoZSBtb3ZlbWVudCBvZiB0aGUgbWFya2VyIGl0c2VsZiBpc1xuICAvLyBwZXJmb3JtZWQgYnkgQ0ZyYW1lX3Jlc2l6ZSwgdGhlIG1vdmVtZW50IGNvZWZmaWNpZW50IG9mIHRoZSBtYXJrZXIgaXRzZWxmIGlzIHNldCB0byAwLlxuICBtYXJrZXJSUi5odG1sRWxlbWVudC5hcmdZID0gMDtcbiAgbWFya2VyUlIuaHRtbEVsZW1lbnQuYXJnWCA9IDA7XG5cbiAgLy9BZGQgc2l6ZSBjaGFuZ2UgbWFya2VyIHRvIGNhbnZhcy5cbiAgbWUuY2FudmFzLmFkZEJlYW4obWFya2VyUkQpO1xuICBtZS5jYW52YXMuYWRkQmVhbihtYXJrZXJERCk7XG4gIG1lLmNhbnZhcy5hZGRCZWFuKG1hcmtlclJSKTtcblxuICAvL01ldGhvZCB0byByZW1vdmUgc2l6ZSBjaGFuZ2UgbWFya2VyIChjYW4gbm90IHJlc2l6ZSlcbiAgbWUucmVtb3ZlTWFya2VycyA9IGZ1bmN0aW9uKCkge1xuICAgIG1lLmNhbnZhcy5yZW1vdmVCZWFuKG1hcmtlclJELmlkKTtcbiAgICBtZS5jYW52YXMucmVtb3ZlQmVhbihtYXJrZXJERC5pZCk7XG4gICAgbWUuY2FudmFzLnJlbW92ZUJlYW4obWFya2VyUlIuaWQpO1xuICAgIG1lLmh0bWxFbGVtZW50LnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcbiAgfTtcblxuXG4gIG1lLnJlbW92ZU1hcmtlcnMyID0gZnVuY3Rpb24oKSB7XG4gICAgbWUuY2FudmFzLnJlbW92ZUJlYW4obWFya2VyUkQuaWQpO1xuICAgIG1lLmNhbnZhcy5yZW1vdmVCZWFuKG1hcmtlckRELmlkKTtcbiAgICBtZS5jYW52YXMucmVtb3ZlQmVhbihtYXJrZXJSUi5pZCk7XG4gIH07XG4gIG1lLmVuYWJsZU1hcmtlcnMgPSBmdW5jdGlvbihlbmFibGVkKSB7XG4gICAgaWYgKGVuYWJsZWQpIHtcblxuICAgICAgbWFya2VyUkQuaHRtbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgIG1hcmtlckRELmh0bWxFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICBtYXJrZXJSUi5odG1sRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgbWFya2VyUkQuaHRtbEVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ3NlLXJlc2l6ZSc7XG4gICAgICBtYXJrZXJERC5odG1sRWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnbi1yZXNpemUnO1xuICAgICAgbWFya2VyUlIuaHRtbEVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ3ctcmVzaXplJztcbiAgICB9IGVsc2Uge1xuICAgICAgbWFya2VyUkQuaHRtbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIG1hcmtlckRELmh0bWxFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBtYXJrZXJSUi5odG1sRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbiAgICAvLyBtZS5jYW52YXMucmVtb3ZlQmVhbihtYXJrZXJSRC5pZCk7XG4gICAgLy8gbWUuY2FudmFzLnJlbW92ZUJlYW4obWFya2VyREQuaWQpO1xuICAgIC8vIG1lLmNhbnZhcy5yZW1vdmVCZWFuKG1hcmtlclJSLmlkKTtcbiAgfTtcblxuICBmb3IgKHZhciBpZHggaW4gYXBwZWFyYW5jZS5mcmFtZUNvbXBvbmVudHMpIHtcblxuICAgIHZhciBmcmFtZUNvbXBvbmVudCA9IGFwcGVhcmFuY2UuZnJhbWVDb21wb25lbnRzW2lkeF07XG4gICAgZnJhbWVDb21wb25lbnQuc2V0RnJhbWUobWUpO1xuXG4gICAgLy9pZiBmcmFtZUNvbXBvbmVudCBoYXMgc3BlY2lhbCBuYW1lICdjbG9zZUJ1dHRvbicsIGl0IHdpbGwgYWN0IGFzIGEgY2xvc2UgYnV0dG9uLlxuICAgIGlmICgnY2xvc2VCdXR0b24nID09IGZyYW1lQ29tcG9uZW50LmlkKSB7XG4gICAgICBmcmFtZUNvbXBvbmVudC5odG1sRWxlbWVudC5vbmNsaWNrID0gbWUuY2xvc2U7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIGNoaWxkIG1lbnUgb3Blbi9jbG9zZVxuICAgIHZhciBmcmFtZUNvbXBvbmVudEhhc0NoaWxkTWVudSA9IGZyYW1lQ29tcG9uZW50Lmh0bWxFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc2ZyYW1lLWNoaWxkLW1lbnUnKTtcbiAgICBpZiAoZnJhbWVDb21wb25lbnRIYXNDaGlsZE1lbnUpIHtcbiAgICAgIG1lLmV2ZW50TGlzdGVuZXJIZWxwZXIuYWRkRXZlbnRMaXN0ZW5lcihmcmFtZUNvbXBvbmVudC5odG1sRWxlbWVudCwgJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgdmFyIGZyYW1lQ29tcG9uZW50SWQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2NvbXBvbmVudC1pZCcpO1xuXG4gICAgICAgICAgLy8gQ2xvc2UgYWxsIGZyYW1lIGNvbXBvbmVudCdzIGNoaWxkbWVudSBvbmNlIGJlY2F1c2Ugb3RoZXIgZnJhbWUgY29tcG9uZW50J3MgY2hpbGRtZW51IG1heSBiZSBvcGVuLlxuICAgICAgICAgIC8vIElmIHtleGNlcHRGcmFtZUNvbXBvbmVudElkOltmcmFtZUNvbXBvbmVudElkXX0gaXMgc3BlY2lmaWVkIGZvciB0aGUgYXJndW1lbnQsXG4gICAgICAgICAgLy8gdGhlIGNoaWxkIG1lbnUgd2lsbCBub3QgYmUgY2xvc2VkLlxuICAgICAgICAgIG1lLmhpZGVGcmFtZUNvbXBvbmVudENoaWxkTWVudXMoeyBleGNlcHRGcmFtZUNvbXBvbmVudElkOiBmcmFtZUNvbXBvbmVudElkIH0pO1xuXG4gICAgICAgICAgaWYgKGZyYW1lQ29tcG9uZW50SWQpIHtcbiAgICAgICAgICAgIHZhciBmcmFtZUNvbXBvbmVudEh0bWxFbGVtZW50ID0gbWUuZ2V0RnJhbWVDb21wb25lbnRFbGVtZW50KGZyYW1lQ29tcG9uZW50SWQpO1xuICAgICAgICAgICAgdmFyIGZyYW1lQ29tcG9uZW50Q2hpbGRNZW51ID0gZnJhbWVDb21wb25lbnRIdG1sRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuanNmcmFtZS1jaGlsZC1tZW51Jyk7XG4gICAgICAgICAgICBpZiAoZnJhbWVDb21wb25lbnRDaGlsZE1lbnUpIHtcbiAgICAgICAgICAgICAgLy8gQnkgbWFraW5nIHRoZSBkaXNwbGF5IGEgdGFibGUsXG4gICAgICAgICAgICAgIC8vIHRoZSB3aWR0aCBvZiB0aGUgY2hpbGRNZW51IGNhbiBiZSBhY2N1cmF0ZWx5IHJlZmxlY3RlZC5cbiAgICAgICAgICAgICAgLy8gKGZsZXggZG9lcyBub3Qgc2V0IHRoZSB3aWR0aCBjb3JyZWN0bHkuKVxuICAgICAgICAgICAgICBpZiAoZnJhbWVDb21wb25lbnRDaGlsZE1lbnUuc3R5bGUuZGlzcGxheSA9PSAndGFibGUnKSB7XG4gICAgICAgICAgICAgICAgZnJhbWVDb21wb25lbnRDaGlsZE1lbnUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmcmFtZUNvbXBvbmVudENoaWxkTWVudS5zdHlsZS5kaXNwbGF5ID0gJ3RhYmxlJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignZnJhbWVDb21wb25lbnQgY2hpbGQgbWVudSBpc250IGZvdW5kLiBmcmFtZUNvbXBvbmVudElkPScgKyBmcmFtZUNvbXBvbmVudElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHsgbGlzdGVuZXJOYW1lOiAnZnJhbWUtY29tcG9uZW50X2NoaWxkLW1lbnUtbGlzdGVuZXInIH0pO1xuICAgIH1cblxuICAgIG1lLmFkZEZyYW1lQ29tcG9uZW50KGZyYW1lQ29tcG9uZW50KTtcbiAgfSAgLy8gL2FkZCBmcmFtZUNvbXBvbmVudHNbZW5kXVxuXG4gIC8vb3ZlcnJpZGUgdGhlIGZpZWxkXG4gIG1lLmh0bWxFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd0cmFuc3BhcmVudCc7XG5cbiAgbWUuaHRtbEVsZW1lbnQub25jb250ZXh0bWVudSA9IHRoaXMuY29udGV4dE1lbnU7XG5cblxuICAvL1RoZSBwb2xpY3kgb2YgQm9yZGVyIGRyYXdpbmcgc2VlbXMgdG8gYmUgZGlmZmVyZW50IGJldHdlZW4gSUUgYW5kIEZGLlxuICB2YXIgY2FyaWJWYWwgPSAwO1xuXG5cbiAgbWUuY2FyaWJWYWx1ZSA9IGNhcmliVmFsO1xuXG4gIGlmIChtZS5leEJvcmRlcldpZHRoKSB7XG4gICAgbWUuaHRtbEVsZW1lbnQuc3R5bGUuYm9yZGVyV2lkdGggPSBtZS5leEJvcmRlcldpZHRoICsgJ3B4JztcbiAgfVxuICBtZS5odG1sRWxlbWVudC5zdHlsZS53aWR0aCA9IChwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS53aWR0aCwgMTApIC0gY2FyaWJWYWwpICsgJ3B4JztcbiAgbWUuaHRtbEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gKHBhcnNlSW50KG1lLmh0bWxFbGVtZW50LnN0eWxlLmhlaWdodCwgMTApIC0gY2FyaWJWYWwgKyAxKSArICdweCc7XG4gIG1lLmh0bWxFbGVtZW50LnR5cGVOYW1lID0gJ2N3aW5kb3cnO1xuICBtZS5odG1sRWxlbWVudC5vdmVyZmxvdyA9ICdhdXRvJztcbiAgbWUuaHRtbEVsZW1lbnQuc3R5bGUuYm94U2l6aW5nID0gJ2NvbnRlbnQtYm94JztcblxuXG4gIGlmIChhcHBlYXJhbmNlLmZyYW1lQm9yZGVyU3R5bGUpIHtcbiAgICBtZS5odG1sRWxlbWVudC5zdHlsZS5ib3JkZXJTdHlsZSA9IGFwcGVhcmFuY2UuZnJhbWVCb3JkZXJTdHlsZTtcbiAgfVxuXG4gIGlmIChhcHBlYXJhbmNlLmZyYW1lQm94U2hhZG93KSB7XG4gICAgbWUuaHRtbEVsZW1lbnQuc3R5bGUuYm94U2hhZG93ID0gYXBwZWFyYW5jZS5mcmFtZUJveFNoYWRvdztcbiAgfVxuXG4gIC8vVE9ETyBkZXByZWNhdGlvbihiZWNhdXNlIENJZkZyYW1lIGlzIGV4dGVuZGVkIHRoaXMgb3BlcmF0aW9uKVxuICBpZiAocGFyc2VJbnQoYXBwZWFyYW5jZS5mcmFtZUJvcmRlcldpZHRoRGVmYXVsdCwgMTApID49IDApIHtcbiAgICBtZS5odG1sRWxlbWVudC5zdHlsZS5ib3JkZXJXaWR0aCA9IGFwcGVhcmFuY2UuZnJhbWVCb3JkZXJXaWR0aERlZmF1bHQ7XG4gICAgbWUuaHRtbEVsZW1lbnQuc3R5bGUuYm9yZGVyQ29sb3IgPSBhcHBlYXJhbmNlLmZyYW1lQm9yZGVyQ29sb3JEZWZhdWx0O1xuXG4gIH1cbiAgaWYgKHBhcnNlSW50KGFwcGVhcmFuY2UuZnJhbWVCb3JkZXJSYWRpdXMsIDEwKSA+PSAwKSB7XG4gICAgbWUuaHRtbEVsZW1lbnQuc3R5bGUuYm9yZGVyUmFkaXVzID0gYXBwZWFyYW5jZS5mcmFtZUJvcmRlclJhZGl1cztcbiAgfVxuXG4gIG1lLm9uQ2xvc2VGcmFtZUxpc3RlbmVyID0gbnVsbDtcblxufVxuXG5cbkNGcmFtZS5wcm90b3R5cGUuc2V0VGl0bGVCYXJDbGFzc05hbWUgPSBmdW5jdGlvbihjbGFzc05hbWVGb3JEZWZhdWx0LCBjbGFzc05hbWVGb3JGb2N1c2VkKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIGlmIChjbGFzc05hbWVGb3JEZWZhdWx0KSB7XG4gICAgbWUudGl0bGVCYXJDbGFzc05hbWVEZWZhdWx0ID0gY2xhc3NOYW1lRm9yRGVmYXVsdDtcbiAgICBtZS50aXRsZUJhckNsYXNzTmFtZUZvY3VzZWQgPSBjbGFzc05hbWVGb3JEZWZhdWx0O1xuICB9XG4gIGlmIChjbGFzc05hbWVGb3JGb2N1c2VkKSB7XG4gICAgbWUudGl0bGVCYXJDbGFzc05hbWVGb2N1c2VkID0gY2xhc3NOYW1lRm9yRm9jdXNlZDtcbiAgfVxuICByZXR1cm4gbWU7XG59O1xuLyoqXG4gKiBBZGQgZnJhbWVDb21wb25lbnQoV3JhcHBlZCBET00gZWxlbWVudCBsaWtlICdkaXYnIHRvIGRpc3BsYXkgYWJvdmUgdGhlIGZyYW1lKSB0byBmcmFtZVxuICogQHBhcmFtIGZyYW1lQ29tcG9uZW50XG4gKi9cbkNGcmFtZS5wcm90b3R5cGUuYWRkRnJhbWVDb21wb25lbnQgPSBmdW5jdGlvbihmcmFtZUNvbXBvbmVudCkge1xuICB2YXIgbWUgPSB0aGlzO1xuXG4gIG1lLmZyYW1lQ29tcG9uZW50TWFwW2ZyYW1lQ29tcG9uZW50LmlkXSA9IGZyYW1lQ29tcG9uZW50O1xuICBtZS5jYW52YXMuY2FudmFzRWxlbWVudC5hcHBlbmRDaGlsZChmcmFtZUNvbXBvbmVudC5odG1sRWxlbWVudCk7XG4gIHJldHVybiBtZTtcbn07XG5cbi8qKlxuICogR2V0IHN0b3JlZCBmcmFtZSBjb21wb25lbnQgYnkgaWRcbiAqIEBwYXJhbSBmcmFtZUNvbXBvbmVudFxuICovXG5DRnJhbWUucHJvdG90eXBlLmdldEZyYW1lQ29tcG9uZW50RWxlbWVudCA9IGZ1bmN0aW9uKGlkKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIGlmIChtZS5mcmFtZUNvbXBvbmVudE1hcFtpZF0pIHtcbiAgICByZXR1cm4gbWUuZnJhbWVDb21wb25lbnRNYXBbaWRdLmh0bWxFbGVtZW50O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5cbkNGcmFtZS5wcm90b3R5cGUucmVtb3ZlRnJhbWVDb21wb25lbnRCeUlkID0gZnVuY3Rpb24oZnJhbWVDb21wb25lbnRJZCkge1xuICB2YXIgbWUgPSB0aGlzO1xuXG4gIHZhciBmcmFtZUNvbXBvbmVudCA9IG1lLmZyYW1lQ29tcG9uZW50TWFwW2ZyYW1lQ29tcG9uZW50SWRdO1xuXG4gIG1lLmNhbnZhcy5jYW52YXNFbGVtZW50LnJlbW92ZUNoaWxkKGZyYW1lQ29tcG9uZW50Lmh0bWxFbGVtZW50KTtcbiAgZGVsZXRlIG1lLmZyYW1lQ29tcG9uZW50TWFwW2ZyYW1lQ29tcG9uZW50SWRdO1xufTtcblxuQ0ZyYW1lLnByb3RvdHlwZS5zaG93RnJhbWVDb21wb25lbnQgPSBmdW5jdGlvbihmcmFtZUNvbXBvbmVudElkLCBkaXNwbGF5KSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHZhciBjb21wID0gbWUuZ2V0RnJhbWVDb21wb25lbnRFbGVtZW50KGZyYW1lQ29tcG9uZW50SWQpO1xuICBpZiAoY29tcCkge1xuICAgIGlmIChkaXNwbGF5KSB7XG4gICAgICBjb21wLnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xuICAgIH0gZWxzZSB7XG4gICAgICBjb21wLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgfVxuICB9XG4gIHJldHVybiBtZTtcbn07XG5cbkNGcmFtZS5wcm90b3R5cGUuaGlkZUZyYW1lQ29tcG9uZW50ID0gZnVuY3Rpb24oZnJhbWVDb21wb25lbnRJZCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICB2YXIgY29tcCA9IG1lLmdldEZyYW1lQ29tcG9uZW50RWxlbWVudChmcmFtZUNvbXBvbmVudElkKTtcbiAgaWYgKGNvbXApIHtcbiAgICBjb21wLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cbiAgcmV0dXJuIG1lO1xufTtcblxuQ0ZyYW1lLnByb3RvdHlwZS5oaWRlQWxsVmlzaWJsZUZyYW1lQ29tcG9uZW50cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbWUgPSB0aGlzO1xuXG4gIHZhciBjb21wTWFwID0gbWUuZnJhbWVDb21wb25lbnRNYXA7XG4gIGZvciAodmFyIGtleSBpbiBjb21wTWFwKSB7XG4gICAgaWYgKGNvbXBNYXAuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgdmFyIGNvbXAgPSBjb21wTWFwW2tleV0uaHRtbEVsZW1lbnQ7XG4gICAgICBpZiAoY29tcC5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScpIHtcbiAgICAgICAgY29tcC5fYWxyZWFkeU5vbmUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgY29tcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbiAgfVxufTtcbkNGcmFtZS5wcm90b3R5cGUuc2hvd0FsbFZpc2libGVGcmFtZUNvbXBvbmVudHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgdmFyIGNvbXBNYXAgPSBtZS5mcmFtZUNvbXBvbmVudE1hcDtcbiAgZm9yICh2YXIga2V5IGluIGNvbXBNYXApIHtcbiAgICBpZiAoY29tcE1hcC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICB2YXIgY29tcCA9IGNvbXBNYXBba2V5XS5odG1sRWxlbWVudDtcbiAgICAgIGlmIChjb21wLl9hbHJlYWR5Tm9uZSkge1xuICAgICAgICBjb21wLl9hbHJlYWR5Tm9uZSA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIENsb3NlIGFsbCBjaGlsZE1lbnVcbiBJZiB7ZXhjZXB0RnJhbWVDb21wb25lbnRJZDpbZnJhbWVDb21wb25lbnRJZF19IGlzIHNwZWNpZmllZCBmb3IgdGhlIGFyZ3VtZW50LFxuIHRoZSBjaGlsZCBtZW51IHdpbGwgbm90IGJlIGNsb3NlZC5cblxuICogQHBhcmFtIG9wdFxuICovXG5DRnJhbWUucHJvdG90eXBlLmhpZGVGcmFtZUNvbXBvbmVudENoaWxkTWVudXMgPSBmdW5jdGlvbihvcHQpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICB2YXIgY29tcE1hcCA9IG1lLmZyYW1lQ29tcG9uZW50TWFwO1xuICBmb3IgKHZhciBmcmFtZUNvbXBvbmVudElkIGluIGNvbXBNYXApIHtcbiAgICBpZiAoY29tcE1hcC5oYXNPd25Qcm9wZXJ0eShmcmFtZUNvbXBvbmVudElkKSkge1xuICAgICAgaWYgKG9wdCAmJiBvcHQuZXhjZXB0RnJhbWVDb21wb25lbnRJZCkge1xuICAgICAgICBpZiAoZnJhbWVDb21wb25lbnRJZCA9PT0gb3B0LmV4Y2VwdEZyYW1lQ29tcG9uZW50SWQpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIGNvbXAgPSBjb21wTWFwW2ZyYW1lQ29tcG9uZW50SWRdO1xuICAgICAgaWYgKGNvbXAuY2hpbGRNZW51KSB7XG4gICAgICAgIGNvbXAuY2hpbGRNZW51LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5cbkNGcmFtZS5wcm90b3R5cGUuc2V0VGl0bGUgPSBmdW5jdGlvbihzdHIpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgbWUudGl0bGUgPSBzdHI7XG4gIGlmIChtZS5zaG93VGl0bGVCYXIpIHtcblxuICAgIHZhciB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0cik7XG4gICAgLy9maXJzdENoaWxk44GuZmlyc3RDaGlsZOOBjHNwYW5cbiAgICBtZS50aXRsZUJhci5maXJzdENoaWxkLnJlcGxhY2VDaGlsZCh0ZXh0Tm9kZSwgbWUudGl0bGVCYXIuZmlyc3RDaGlsZC5maXJzdENoaWxkKTtcbiAgfVxuICByZXR1cm4gbWU7XG59O1xuXG5DRnJhbWUucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uKGRlbHRhTGVmdCwgZGVsdGFUb3AsIGRlbHRhV2lkdGgsIGRlbHRhSGVpZ2h0KSB7XG5cbiAgdmFyIG1lID0gdGhpcztcblxuICB2YXIgdG1wTGVmdCA9IHBhcnNlSW50KG1lLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQsIDEwKTtcbiAgdmFyIHRtcFRvcCA9IHBhcnNlSW50KG1lLmh0bWxFbGVtZW50LnN0eWxlLnRvcCwgMTApO1xuICB2YXIgdG1wV2lkdGggPSBwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS53aWR0aCwgMTApO1xuICB2YXIgdG1wSGVpZ2h0ID0gcGFyc2VJbnQobWUuaHRtbEVsZW1lbnQuc3R5bGUuaGVpZ2h0LCAxMCk7XG5cbiAgbWUuaHRtbEVsZW1lbnQuc3R5bGUubGVmdCA9IHBhcnNlSW50KHRtcExlZnQgKyBkZWx0YUxlZnQsIDEwKSArICdweCc7XG4gIG1lLmh0bWxFbGVtZW50LnN0eWxlLnRvcCA9IHBhcnNlSW50KHRtcFRvcCArIGRlbHRhVG9wLCAxMCkgKyAncHgnO1xuXG4gIG1lLmh0bWxFbGVtZW50LnN0eWxlLndpZHRoID0gcGFyc2VJbnQodG1wV2lkdGggKyBkZWx0YVdpZHRoLCAxMCkgKyAncHgnO1xuICBtZS5odG1sRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBwYXJzZUludCh0bXBIZWlnaHQgKyBkZWx0YUhlaWdodCwgMTApICsgJ3B4JztcblxuXG4gIHZhciB0bXBDYW52YXNXaWR0aCA9IHBhcnNlSW50KG1lLmNhbnZhcy5jYW52YXNFbGVtZW50LnN0eWxlLndpZHRoLCAxMCk7XG4gIHZhciB0bXBDYW52YXNIZWlnaHQgPSBwYXJzZUludChtZS5jYW52YXMuY2FudmFzRWxlbWVudC5zdHlsZS5oZWlnaHQsIDEwKTtcblxuICAvL1NpbmNlIGNhbnZhc0VsZW1lbnQgaXMgYSAoMCwgMCkgcmVsYXRpdmUgY29vcmRpbmF0ZSB3aXRoIHJlc3BlY3QgdG8gdGhlIHBhcmVudCBlbGVtZW50LFxuICAvLyBzbyBpdCBpcyBub3QgbmVjZXNzYXJ5IHRvIGNoYW5nZSBsZWZ0IGFuZCB0b3AuXG4gIG1lLmNhbnZhcy5jYW52YXNFbGVtZW50LnN0eWxlLndpZHRoID0gKHRtcENhbnZhc1dpZHRoICsgZGVsdGFXaWR0aCkgKyAncHgnO1xuICBtZS5jYW52YXMuY2FudmFzRWxlbWVudC5zdHlsZS5oZWlnaHQgPSAodG1wQ2FudmFzSGVpZ2h0ICsgZGVsdGFIZWlnaHQpICsgJ3B4JztcblxuXG4gIGlmIChtZS5zaG93VGl0bGVCYXIpIHtcblxuICAgIC8vQ2hhbmdlIHRoZSBzaXplIG9mIHRoZSB0aXRsZSBiYXIuIFRpdGxlQWRqdXN0V2lkdGggZXRjLlxuICAgIC8vVGhlIHJlYXNvbiB3aHkgeW91IGRvIG5vdCBoYXZlIHRvIHVzZSB0aXRsZUFkanVzdFdpZHRoIGlzIGJlY2F1c2VcbiAgICAvLyB0aGVzZSBzY2FsaW5nIGFyZSBkb25lIHdpdGggZGlmZmVyZW5jZXMgKGRlbHRhWCwgZGVsdGFZKS5cbiAgICAvL1RoZXJlZm9yZSwgaWYgeW91IGFkanVzdCB3aXRoIHRoZSB0aXRsZUFkanVzdFdpZHRoIGFzXG4gICAgLy8gdGhlIGluaXRpYWwgdmFsdWUsIHRoZSBvdGhlciB3aWxsIHN0cmV0Y2ggcmVsYXRpdmUuXG4gICAgLy9Zb3UgZG8gbm90IHRoaW5rIHlvdSBjYW4gdXNlIGlmRGVsdGFcbiAgICBtZS50aXRsZUJhci5zdHlsZS53aWR0aCA9ICh0bXBDYW52YXNXaWR0aCArIGRlbHRhV2lkdGgpICsgJ3B4JztcblxuICB9IGVsc2Uge1xuXG5cbiAgfVxuXG5cbiAgZm9yICh2YXIgYmVhbk5hbWUgaW4gbWUuY2FudmFzLmJlYW5MaXN0KSB7XG4gICAgdmFyIHRtcEJlYW4gPSBtZS5jYW52YXMuYmVhbkxpc3RbYmVhbk5hbWVdO1xuXG4gICAgaWYgKHRtcEJlYW4uaHRtbEVsZW1lbnQudHlwZU5hbWUgPT0gJ2NtYXJrZXJ3aW5kb3cnKSB7XG4gICAgICBpZiAodG1wQmVhbi5odG1sRWxlbWVudC51c2FnZSA9PSAnUkQnKSB7XG4gICAgICAgIC8vTW92ZSB0aGUgc2l6ZSBjaGFuZ2UgbG93ZXIgcmlnaHQoUkQpIG1hcmtlciBhY2NvcmRpbmcgdG8gdGhlIGFtb3VudCBvZiBtb3ZlbWVudC5cbiAgICAgICAgdG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS5sZWZ0ID0gKHBhcnNlSW50KHRtcEJlYW4uaHRtbEVsZW1lbnQuc3R5bGUubGVmdCwgMTApICsgZGVsdGFXaWR0aCkgKyAncHgnO1xuICAgICAgICB0bXBCZWFuLmh0bWxFbGVtZW50LnN0eWxlLnRvcCA9IChwYXJzZUludCh0bXBCZWFuLmh0bWxFbGVtZW50LnN0eWxlLnRvcCwgMTApICsgZGVsdGFIZWlnaHQpICsgJ3B4JztcbiAgICAgIH0gZWxzZSBpZiAodG1wQmVhbi5odG1sRWxlbWVudC51c2FnZSA9PSAnREQnKSB7XG4gICAgICAgIC8vTW92ZSB0aGUgc2l6ZSBjaGFuZ2UgbG93ZXIgbWFya2VyIGFjY29yZGluZyB0byB0aGUgbW92ZW1lbnQgYW1vdW50LlxuICAgICAgICAvLyBEbyBub3QgbW92ZSBsZWZ0Lk9ubHkgdGhlIHdpZHRoIHdpbCBpbmNyZWFzZSBvciBkZWNyZWFzZS5cbiAgICAgICAgdG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS53aWR0aCA9IChwYXJzZUludCh0bXBCZWFuLmh0bWxFbGVtZW50LnN0eWxlLndpZHRoLCAxMCkgKyBkZWx0YVdpZHRoKSArICdweCc7XG4gICAgICAgIHRtcEJlYW4uaHRtbEVsZW1lbnQuc3R5bGUudG9wID0gKHBhcnNlSW50KHRtcEJlYW4uaHRtbEVsZW1lbnQuc3R5bGUudG9wLCAxMCkgKyBkZWx0YUhlaWdodCkgKyAncHgnO1xuICAgICAgfSBlbHNlIGlmICh0bXBCZWFuLmh0bWxFbGVtZW50LnVzYWdlID09ICdSUicpIHtcbiAgICAgICAgLy9Nb3ZlIHRoZSBzaXplIGNoYW5nZSByaWdodCBtYXJrZXIgYWNjb3JkaW5nIHRvIHRoZSBtb3ZlbWVudCBhbW91bnRcbiAgICAgICAgLy9EbyBub3QgbW92ZSB0b3AsT25seSB0aGUgaGVpZ2h0IHdpbGwgaW5jcmVhc2Ugb3IgZGVjcmVhc2UuXG4gICAgICAgIHRtcEJlYW4uaHRtbEVsZW1lbnQuc3R5bGUubGVmdCA9IChwYXJzZUludCh0bXBCZWFuLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQsIDEwKSArIGRlbHRhV2lkdGgpICsgJ3B4JztcbiAgICAgICAgdG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS5oZWlnaHQgPSAocGFyc2VJbnQodG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS5oZWlnaHQsIDEwKSArIGRlbHRhSGVpZ2h0KSArICdweCc7XG4gICAgICB9XG5cbiAgICB9XG4gIH1cbn07XG5cblxuQ0ZyYW1lLnByb3RvdHlwZS5jYW52YXNNb3VzZURvd24gPSBmdW5jdGlvbihlKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgLy9Nb3VzZWRvd24gcHJvY2Vzc2luZyBvZiBDRnJhbWUuY2FudmFzXG5cbiAgLy8nVGhpcycgaW4gdGhpcyBtZXRob2QgaW5kaWNhdGVzICdDd2luZG93LmNhbnZhcy5jYW52YXNFbGVtZW50Jy5cbiAgaWYgKHRoaXMucGFyZW50Q0ZyYW1lLnBhcmVudENhbnZhcy5tb3VzZURvd25Tb3VyY2UgPT0gbnVsbCkge1xuICAgIHRoaXMucGFyZW50Q0ZyYW1lLnBhcmVudENhbnZhcy5tb3VzZURvd25Tb3VyY2UgPSAnY2hpbGRjYW52YXMnO1xuICB9XG5cblxufTtcbkNGcmFtZS5wcm90b3R5cGUubW91c2VVcCA9IGZ1bmN0aW9uKGUpIHtcbiAgdGhpcy5jYW52YXMubW91c2VVcChlKTtcbn07XG5cbkNGcmFtZS5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbihlKSB7XG5cbiAgdmFyIG1lID0gdGhpcztcbiAgLy9DbG9zZSBwcm9jZXNzaW5nIG9mIENGcmFtZSBmcm9tIENsb3NlQnV0dG9uXG5cblxuICB2YXIgcGFyZW50Q2FudmFzID0gdGhpcy5wYXJlbnRPYmplY3QucGFyZW50Q2FudmFzO1xuICB2YXIgY2ZyYW1lT2JqID0gdGhpcy5wYXJlbnRPYmplY3Q7XG5cbiAgY29uc29sZS5sb2coJ0NGcmFtZSNjbG9zZSBcIicgKyBjZnJhbWVPYmoudGl0bGUgKyAnKEAnICsgY2ZyYW1lT2JqLmdldE5hbWUoKSArICcpJyArICdcIiBAJyArIGNmcmFtZU9iai53aW5kb3dJZCk7XG5cbiAgdmFyIHdpbmRvd0lkID0gY2ZyYW1lT2JqLmlkO1xuICBjZnJhbWVPYmouY2xvc2VJbnRlcm5hbGx5KGUsIHBhcmVudENhbnZhcywgd2luZG93SWQpO1xuXG5cbn07XG5cbkNGcmFtZS5wcm90b3R5cGUuY2xvc2VGcmFtZSA9IGZ1bmN0aW9uKGUpIHtcblxuXG4gIC8vQ2xvc2UgcHJvY2Vzc2luZyBvZiBDRnJhbWVcbiAgdmFyIG1lID0gdGhpcztcblxuICBjb25zb2xlLmxvZygnQ0ZyYW1lI2Nsb3NlRnJhbWUgXCInICsgbWUudGl0bGUgKyAnKCcgKyBtZS5nZXROYW1lKCkgKyAnKScgKyAnXCIgQCcgKyBtZS53aW5kb3dJZCk7XG5cbiAgdmFyIHBhcmVudENhbnZhcyA9IHRoaXMucGFyZW50Q2FudmFzO1xuICBtZS5jbG9zZUludGVybmFsbHkoZSwgcGFyZW50Q2FudmFzLCBtZS53aW5kb3dJZCk7XG5cblxufTtcblxuQ0ZyYW1lLnByb3RvdHlwZS5jbG9zZUludGVybmFsbHkgPSBmdW5jdGlvbihlLCBwYXJlbnRDYW52YXMsIHdpbmRvd0lkKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgaWYgKCFwYXJlbnRDYW52YXMpIHtcbiAgICBjb25zb2xlLmVycm9yKCdXaW5kb3coJyArIHdpbmRvd0lkICsgJykgbWF5IGhhdmUgYmVlbiBjbG9zZWQnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgcGFyZW50Q2FudmFzLnJlbW92ZUJlYW4od2luZG93SWQpO1xuXG5cbiAgLy9hZGRlZCBmb3IgbW9kYWwgd2luZG93XG4gIGlmIChtZS5tb2RhbEJhY2tncm91bmRXaW5kb3dJZCkge1xuICAgIHBhcmVudENhbnZhcy5yZW1vdmVCZWFuKG1lLm1vZGFsQmFja2dyb3VuZFdpbmRvd0lkKTtcbiAgICBtZS5tb2RhbEJhY2tncm91bmRXaW5kb3dJZCA9IG51bGw7XG4gIH1cblxuICBpZiAobWUub25DbG9zZUZyYW1lTGlzdGVuZXIpIHtcbiAgICBtZS5vbkNsb3NlRnJhbWVMaXN0ZW5lcihtZSk7XG4gIH1cbn07XG5cbkNGcmFtZS5wcm90b3R5cGUuc2V0T25DbG9zZUZyYW1lTGlzdGVuZXIgPSBmdW5jdGlvbihsaXN0ZW5lcikge1xuICB2YXIgbWUgPSB0aGlzO1xuICBtZS5vbkNsb3NlRnJhbWVMaXN0ZW5lciA9IGxpc3RlbmVyO1xuXG59O1xuXG5DRnJhbWUucHJvdG90eXBlLmNvbnRleHRNZW51ID0gZnVuY3Rpb24oKSB7XG4gIC8vSWYgeW91IGlzc3VlIHRoZSByaWdodC1jbGljayBtZW51IGluIHRoZSB3aW5kb3csIHNldCB0aGUgc291cmNlIHRvIENGcmFtZS5cbiAgdmFyIGNvbnRleHRNZW51U291cmNlID0gJ0NGcmFtZSc7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cblxuQ0ZyYW1lLnByb3RvdHlwZS5zZXRUaXRsZUJhclRleHRDb2xvciA9IGZ1bmN0aW9uKHN0cikge1xuICB2YXIgbWUgPSB0aGlzO1xuICBtZS50aXRsZUJhci5zdHlsZS5jb2xvciA9IHN0cjtcbn07XG5cbi8qKlxuICogU2V0IHdpbmRvdyBwb3NpdGlvbiB3aXRoIGFuY2hvclxuICogQHBhcmFtIHtudW1iZXJ9IHhcbiAqIEBwYXJhbSB7bnVtYmVyfSB5XG4gKiBAcGFyYW0ge3N0cmluZ30gYW5jaG9yIGFuY2hvciBtZWFucyB0aGUgcG9zaXRpb24gb2YgdGhlIHdpbmRvdyB3aXRoIHJlc3BlY3QgdG8gd2hpY2ggdGhlIHBvc2l0aW9uIGlzIHNwZWNpZmllZC48YnI+XG4gKiAgIFRoZSBmb2xsb3dpbmcgdmFsdWVzIGNhbiBiZSBzcGVjaWZpZWQgZm9yIHRoZSBhbmNob3JcbiBMRUZUX1RPUFxuIENFTlRFUl9UT1BcbiBSSUdIVF9UT1BcbiBMRUZUX0NFTlRFUlxuIENFTlRFUl9DRU5URVJcbiBSSUdIVF9DRU5URVJcbiBMRUZUX0JPVFRPTVxuIENFTlRFUl9CT1RUT01cbiBSSUdIVF9CT1RUT01cbiAqIEByZXR1cm5zIHtDRnJhbWV9XG4gKi9cbkNGcmFtZS5wcm90b3R5cGUuc2V0UG9zaXRpb24gPSBmdW5jdGlvbih4LCB5LCBhbmNob3IpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICB2YXIgZnJhbWVXaWR0aCA9IG1lLmdldFdpZHRoKCk7XG4gIHZhciBmcmFtZUhlaWdodCA9IG1lLmdldEhlaWdodCgpO1xuXG4gIG1lLl9zZXRQb3NpdGlvbkludGVybmFsbHkoeCwgeSwgYW5jaG9yLCBmcmFtZVdpZHRoLCBmcmFtZUhlaWdodCk7XG5cbiAgcmV0dXJuIG1lO1xufTtcbkNGcmFtZS5wcm90b3R5cGUuX3NldFBvc2l0aW9uSW50ZXJuYWxseSA9IGZ1bmN0aW9uKHgsIHksIGFuY2hvciwgZnJhbWVXaWR0aCwgZnJhbWVIZWlnaHQpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICBpZiAoYW5jaG9yKSB7XG4gICAgbWUuYW5jaG9yID0gYW5jaG9yO1xuICB9XG5cbiAgaWYgKCFhbmNob3IgfHwgQ0FMSUdOLkxFRlRfVE9QID09IGFuY2hvcikge1xuICAgIG1lLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQgPSB4ICsgJ3B4JztcbiAgICBtZS5odG1sRWxlbWVudC5zdHlsZS50b3AgPSB5ICsgJ3B4JztcbiAgfSBlbHNlIGlmIChDQUxJR04uSENFTlRFUl9UT1AgPT0gYW5jaG9yKSB7XG4gICAgbWUuaHRtbEVsZW1lbnQuc3R5bGUubGVmdCA9ICgtZnJhbWVXaWR0aCAvIDIgKyB4KSArICdweCc7XG4gICAgbWUuaHRtbEVsZW1lbnQuc3R5bGUudG9wID0geSArICdweCc7XG4gIH0gZWxzZSBpZiAoQ0FMSUdOLlJJR0hUX1RPUCA9PSBhbmNob3IpIHtcbiAgICBtZS5odG1sRWxlbWVudC5zdHlsZS5sZWZ0ID0gKC1mcmFtZVdpZHRoICsgeCkgKyAncHgnO1xuICAgIG1lLmh0bWxFbGVtZW50LnN0eWxlLnRvcCA9IHkgKyAncHgnO1xuICB9IGVsc2UgaWYgKENBTElHTi5MRUZUX1ZDRU5URVIgPT0gYW5jaG9yKSB7XG4gICAgbWUuaHRtbEVsZW1lbnQuc3R5bGUubGVmdCA9IHggKyAncHgnO1xuICAgIG1lLmh0bWxFbGVtZW50LnN0eWxlLnRvcCA9ICgtZnJhbWVIZWlnaHQgLyAyICsgeSkgKyAncHgnO1xuICB9IGVsc2UgaWYgKENBTElHTi5IQ0VOVEVSX1ZDRU5URVIgPT0gYW5jaG9yKSB7XG4gICAgbWUuaHRtbEVsZW1lbnQuc3R5bGUubGVmdCA9ICgtZnJhbWVXaWR0aCAvIDIgKyB4KSArICdweCc7XG4gICAgbWUuaHRtbEVsZW1lbnQuc3R5bGUudG9wID0gKC1mcmFtZUhlaWdodCAvIDIgKyB5KSArICdweCc7XG4gIH0gZWxzZSBpZiAoQ0FMSUdOLlJJR0hUX1ZDRU5URVIgPT0gYW5jaG9yKSB7XG4gICAgbWUuaHRtbEVsZW1lbnQuc3R5bGUubGVmdCA9ICgtZnJhbWVXaWR0aCArIHgpICsgJ3B4JztcbiAgICBtZS5odG1sRWxlbWVudC5zdHlsZS50b3AgPSAoLWZyYW1lSGVpZ2h0IC8gMiArIHkpICsgJ3B4JztcbiAgfSBlbHNlIGlmIChDQUxJR04uTEVGVF9CT1RUT00gPT0gYW5jaG9yKSB7XG4gICAgbWUuaHRtbEVsZW1lbnQuc3R5bGUubGVmdCA9IHggKyAncHgnO1xuICAgIG1lLmh0bWxFbGVtZW50LnN0eWxlLnRvcCA9ICgtZnJhbWVIZWlnaHQgKyB5KSArICdweCc7XG4gIH0gZWxzZSBpZiAoQ0FMSUdOLkhDRU5URVJfQk9UVE9NID09IGFuY2hvcikge1xuICAgIG1lLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQgPSAoLWZyYW1lV2lkdGggLyAyICsgeCkgKyAncHgnO1xuICAgIG1lLmh0bWxFbGVtZW50LnN0eWxlLnRvcCA9ICgtZnJhbWVIZWlnaHQgKyB5KSArICdweCc7XG4gIH0gZWxzZSBpZiAoQ0FMSUdOLlJJR0hUX0JPVFRPTSA9PSBhbmNob3IpIHtcbiAgICBtZS5odG1sRWxlbWVudC5zdHlsZS5sZWZ0ID0gKC1mcmFtZVdpZHRoICsgeCkgKyAncHgnO1xuICAgIG1lLmh0bWxFbGVtZW50LnN0eWxlLnRvcCA9ICgtZnJhbWVIZWlnaHQgKyB5KSArICdweCc7XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyByZWxhdGl2ZSBwb3NpdGlvbiB3aXRoIGFuY2hvclxuICogQHJldHVybnMge3t4OiAqLCB5OiAqLCBhbmNob3I6ICp9fVxuICovXG5DRnJhbWUucHJvdG90eXBlLmdldFBvc2l0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHZhciBmcmFtZVdpZHRoID0gbWUuZ2V0V2lkdGgoKTtcbiAgdmFyIGZyYW1lSGVpZ2h0ID0gbWUuZ2V0SGVpZ2h0KCk7XG4gIHZhciB4O1xuICB2YXIgeTtcbiAgdmFyIGFuY2hvciA9IG1lLmFuY2hvcjtcbiAgaWYgKCFhbmNob3IgfHwgQ0FMSUdOLkxFRlRfVE9QID09IGFuY2hvcikge1xuICAgIHggPSBwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS5sZWZ0LCAxMCk7XG4gICAgeSA9IHBhcnNlSW50KG1lLmh0bWxFbGVtZW50LnN0eWxlLnRvcCwgMTApO1xuICB9IGVsc2UgaWYgKENBTElHTi5IQ0VOVEVSX1RPUCA9PSBhbmNob3IpIHtcbiAgICB4ID0gcGFyc2VJbnQobWUuaHRtbEVsZW1lbnQuc3R5bGUubGVmdCwgMTApICsgZnJhbWVXaWR0aCAvIDI7XG4gICAgeSA9IHBhcnNlSW50KG1lLmh0bWxFbGVtZW50LnN0eWxlLnRvcCwgMTApO1xuICB9IGVsc2UgaWYgKENBTElHTi5SSUdIVF9UT1AgPT0gYW5jaG9yKSB7XG4gICAgeCA9IHBhcnNlSW50KG1lLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQsIDEwKSArIGZyYW1lV2lkdGg7XG4gICAgeSA9IHBhcnNlSW50KG1lLmh0bWxFbGVtZW50LnN0eWxlLnRvcCwgMTApO1xuICB9IGVsc2UgaWYgKENBTElHTi5MRUZUX1ZDRU5URVIgPT0gYW5jaG9yKSB7XG4gICAgeCA9IHBhcnNlSW50KG1lLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQsIDEwKTtcbiAgICB5ID0gcGFyc2VJbnQobWUuaHRtbEVsZW1lbnQuc3R5bGUudG9wLCAxMCkgKyBmcmFtZUhlaWdodCAvIDI7XG4gIH0gZWxzZSBpZiAoQ0FMSUdOLkhDRU5URVJfVkNFTlRFUiA9PSBhbmNob3IpIHtcbiAgICB4ID0gcGFyc2VJbnQobWUuaHRtbEVsZW1lbnQuc3R5bGUubGVmdCwgMTApICsgZnJhbWVXaWR0aCAvIDI7XG4gICAgeSA9IHBhcnNlSW50KG1lLmh0bWxFbGVtZW50LnN0eWxlLnRvcCwgMTApICsgZnJhbWVIZWlnaHQgLyAyO1xuICB9IGVsc2UgaWYgKENBTElHTi5SSUdIVF9WQ0VOVEVSID09IGFuY2hvcikge1xuICAgIHggPSBwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS5sZWZ0LCAxMCkgKyBmcmFtZVdpZHRoO1xuICAgIHkgPSBwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS50b3AsIDEwKSArIGZyYW1lSGVpZ2h0IC8gMjtcbiAgfSBlbHNlIGlmIChDQUxJR04uTEVGVF9CT1RUT00gPT0gYW5jaG9yKSB7XG4gICAgeCA9IHBhcnNlSW50KG1lLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQsIDEwKTtcbiAgICB5ID0gcGFyc2VJbnQobWUuaHRtbEVsZW1lbnQuc3R5bGUudG9wLCAxMCkgKyBmcmFtZUhlaWdodDtcbiAgfSBlbHNlIGlmIChDQUxJR04uSENFTlRFUl9CT1RUT00gPT0gYW5jaG9yKSB7XG4gICAgeCA9IHBhcnNlSW50KG1lLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQsIDEwKSArIGZyYW1lV2lkdGggLyAyO1xuICAgIHkgPSBwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS50b3AsIDEwKSArIGZyYW1lSGVpZ2h0O1xuICB9IGVsc2UgaWYgKENBTElHTi5SSUdIVF9CT1RUT00gPT0gYW5jaG9yKSB7XG4gICAgeCA9IHBhcnNlSW50KG1lLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQsIDEwKSArIGZyYW1lV2lkdGg7XG4gICAgeSA9IHBhcnNlSW50KG1lLmh0bWxFbGVtZW50LnN0eWxlLnRvcCwgMTApICsgZnJhbWVIZWlnaHQ7XG4gIH1cbiAgcmV0dXJuIHsgeDogeCwgeTogeSwgYW5jaG9yOiBhbmNob3IgfTtcbn07XG5cbkNGcmFtZS5wcm90b3R5cGUuZ2V0TGVmdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICByZXR1cm4gcGFyc2VJbnQobWUuaHRtbEVsZW1lbnQuc3R5bGUubGVmdCwgMTApO1xufTtcblxuXG5DRnJhbWUucHJvdG90eXBlLmdldFRvcCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICByZXR1cm4gcGFyc2VJbnQobWUuaHRtbEVsZW1lbnQuc3R5bGUudG9wLCAxMCk7XG59O1xuQ0ZyYW1lLnByb3RvdHlwZS5nZXRXaWR0aCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICByZXR1cm4gcGFyc2VJbnQobWUuaHRtbEVsZW1lbnQuc3R5bGUud2lkdGgsIDEwKTtcbn07XG5DRnJhbWUucHJvdG90eXBlLmdldEhlaWdodCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICByZXR1cm4gcGFyc2VJbnQobWUuaHRtbEVsZW1lbnQuc3R5bGUuaGVpZ2h0LCAxMCk7XG59O1xuXG5DRnJhbWUucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgcmV0dXJuIHsgd2lkdGg6IG1lLmdldFdpZHRoKCksIGhlaWdodDogbWUuZ2V0SGVpZ2h0KCkgfTtcbn07XG5cbkNGcmFtZS5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQsIGZvcmNlKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgdmFyIGJ5VXNlciA9IHRydWU7XG5cbiAgaWYgKGZvcmNlKSB7XG4gICAgYnlVc2VyID0gZmFsc2U7XG4gIH1cblxuXG4gIC8vY2FsbCBDSUZyYW1lI3Jlc2l6ZSBpbnN0ZWFkIG9mIENGcmFtZSNyZXNpemVcbiAgbWUucmVzaXplKDAsIDAsIHdpZHRoIC0gbWUuZ2V0V2lkdGgoKSwgaGVpZ2h0IC0gbWUuZ2V0SGVpZ2h0KCksIGJ5VXNlcik7XG4gIHJldHVybiBtZTtcbn07XG5cbkNGcmFtZS5wcm90b3R5cGUuZ2V0V2luZG93SWQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgcmV0dXJuIG1lLndpbmRvd0lkO1xufTtcblxuQ0ZyYW1lLnByb3RvdHlwZS5nZXROYW1lID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHJldHVybiBtZS5wcm9wZXJ0eS5uYW1lO1xufTtcblxuQ0ZyYW1lLnByb3RvdHlwZS5zZXROYW1lID0gZnVuY3Rpb24obmFtZSkge1xuICB2YXIgbWUgPSB0aGlzO1xuICBtZS5wcm9wZXJ0eS5uYW1lID0gbmFtZTtcbn07XG4vKipcbiAqIGVuZCBvZiBDRnJhbWUgY2xhc3NcbiAqL1xuXG4vLystKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy1cblxuXG5pbmhlcml0KENJZkZyYW1lLCBDRnJhbWUpO1xuXG4vKipcbiAqIENJZkZyYW1lIGNsYXNzXG4gKiBFeHRlbnNpb24gY2xhc3Mgd2l0aCBjb250ZW50cyBmcmFtZSBvZiBDRnJhbWUgYXMgaWZyYW1lXG4gKiBAcGFyYW0gd2luZG93SWRcbiAqIEBwYXJhbSBhcHBlYXJhbmNlXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ0lmRnJhbWUod2luZG93SWQsIGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCwgYXBwZWFyYW5jZSkge1xuXG5cbiAgdmFyIHdsZWZ0ID0gbGVmdDtcbiAgdmFyIHd0b3AgPSB0b3A7XG4gIHZhciB3d2lkdGggPSB3aWR0aDtcbiAgdmFyIHdoZWlnaHQgPSBoZWlnaHQ7XG4gIHZhciB6aW5kZXggPSBhcHBlYXJhbmNlLnppbmRleDtcbiAgdmFyIHdib3JkZXJ3aWR0aCA9IG51bGw7XG5cblxuICB2YXIgbWUgPSB0aGlzO1xuXG4gIHRoaXMuanNGcmFtZSA9IG51bGw7XG4gIHRoaXMuY29udHJvbCA9IG51bGw7XG5cbiAgdGhpcy5taW5GcmFtZVdpZHRoID0gMTI4O1xuICB0aGlzLm1pbldpbmRvd0hlaWdodCA9IDMyO1xuXG4gIHRoaXMuZXZlbnRMaXN0ZW5lckhlbHBlciA9IG5ldyBFdmVudExpc3RlbmVySGVscGVyKCk7XG5cbiAgLyoqXG4gICAqIElmIHRoaXMgdmFsdWUgaXMgdHJ1ZSwgdGhlIGZvY3VzIHdpbGwgbW92ZSB3aGVuIHRhcHBpbmcgdGhlIGlmcmFtZSBhcmVhLFxuICAgKiBidXQgaWYgdGhlIHdpbmRvdyBkbyBub3QgaGF2ZSB0aGUgZm9jdXMsIHlvdSBjYW4gbm90IGNsaWNrIG9uIHRoZSBlbGVtZW50IGluIHRoZSBpZnJhbWUuXG4gICAqL1xuICB0aGlzLm92ZXJyYXlUcmFuc3BhcmVudFNjcmVlbkVuYWJsZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogIE9ubHkgaW4gdGhlIGNhc2Ugb2YgcmVzaXppbmcgYSB0cmFuc3BhcmVudCBzY3JlZW4gY2FuIGJlIGRpc3BsYXllZCBvbiB0aGUgaWZyYW1lXG4gICAqICBhbmQgdGhlIHNpemUgY2FuIGJlIGFkanVzdGVkIHNtb290aGx5LlxuICAgKiAgdHJ1ZSBpcyByZWNvbW1lbmRlZC5cbiAgICovXG4gIC8vQ2hhbmdlIGhpc3RvcnlcbiAgLy8yMDE4MTIyNlxuICAvL0NoYW5nZWQgdG8gZmFsc2UuXG4gIC8vIFNvIGl0IGJlY29tZXMgbmVjZXNzYXJ5IHRvIGNsaWNrIHR3aWNlIHRvIHJlYWN0IHdoZW4geW91IGNhbGwgdGhlICNzZXRTaXplLEkgY2hhbmdlZCB0aGUgdmFsdWUgdG8gZmFsc2UuXG4gIC8vMjAxODEyMzFcbiAgLy9JIGZvdW5kIHRoZSB3YXkgdGhhdCBpZnJhbWUgd2lsbCBiZSBjaGFuZ2VkIHRoZSBzaXplIHNtb290aGx5LnNvIHRoZSBmaW5hbCBhbnN3ZXIgaXMgdHJ1ZS5cbiAgdGhpcy5vdmVycmF5VHJhbnNwYXJlbnRTY3JlZW5PblJlc2l6ZSA9IHRydWU7XG5cbiAgdGhpcy50aXRsZUJhckNvbG9yRm9jdXNlZCA9IGFwcGVhcmFuY2UudGl0bGVCYXJDb2xvckZvY3VzZWQ7XG5cbiAgdGhpcy50aXRsZUJhckNvbG9yRGVmYXVsdCA9IGFwcGVhcmFuY2UudGl0bGVCYXJDb2xvckRlZmF1bHQ7XG5cbiAgdGhpcy50aXRsZUJhckNhcHRpb25Db2xvckRlZmF1bHQgPSBhcHBlYXJhbmNlLnRpdGxlQmFyQ2FwdGlvbkNvbG9yRGVmYXVsdDtcbiAgdGhpcy50aXRsZUJhckNhcHRpb25Db2xvckZvY3VzZWQgPSBhcHBlYXJhbmNlLnRpdGxlQmFyQ2FwdGlvbkNvbG9yRm9jdXNlZDtcblxuICAvL2NhbGwgc3VwZXIgY29uc3RydWN0b3JcbiAgQ0lmRnJhbWUuc3VwZXJDb25zdHJ1Y3Rvci5jYWxsKG1lLCB3aW5kb3dJZCwgd2xlZnQsIHd0b3AsIHd3aWR0aCwgd2hlaWdodCwgemluZGV4LCB3Ym9yZGVyd2lkdGgsIGFwcGVhcmFuY2UpO1xuXG4gIC8vYm9yZGVyIGNvbG9yXG4gIG1lLmZyYW1lQm9yZGVyQ29sb3JEZWZhdWx0ID0gYXBwZWFyYW5jZS5mcmFtZUJvcmRlckNvbG9yRGVmYXVsdDtcbiAgbWUuZnJhbWVCb3JkZXJDb2xvckZvY3VzZWQgPSBhcHBlYXJhbmNlLmZyYW1lQm9yZGVyQ29sb3JGb2N1c2VkO1xuXG4gIC8vYm9yZGVyIHdpZHRoXG4gIG1lLmZyYW1lQm9yZGVyV2lkdGhEZWZhdWx0ID0gYXBwZWFyYW5jZS5mcmFtZUJvcmRlcldpZHRoRGVmYXVsdDtcbiAgbWUuZnJhbWVCb3JkZXJXaWR0aEZvY3VzZWQgPSBhcHBlYXJhbmNlLmZyYW1lQm9yZGVyV2lkdGhGb2N1c2VkO1xuXG4gIG1lLmlmcmFtZSA9IG51bGw7XG5cblxuICAvL09mZnNldCB2YWx1ZSBmb3Igd2lkdGggYWRqdXN0bWVudCBvZiBpZnJhbWVcbiAgbWUuaWZEZWx0YSA9IDA7XG5cbiAgbWUucmVzaXphYmxlID0gdHJ1ZTtcblxuXG4gIG1lLm9uTW91c2VNb3ZlT25JZnJhbWUgPSBudWxsO1xuICBtZS5vbk1vdXNlVXBPbklmcmFtZSA9IG51bGw7XG5cbiAgbWUuX2hhc0ZvY3VzID0gZmFsc2U7XG5cbiAgbWUuX2hhc0ZvY3VzVGltZSA9IDA7XG5cblxuICBtZS5odG1sRWxlbWVudC50eXBlTmFtZSA9ICdjaWZ3aW5kb3cnO1xuXG4gIC8vbmFtZSBvZiBpZnJhbWVcbiAgdmFyIGV4SWZyYW1lTmFtZSA9ICdyaXZlcnN1bl8nICsgd2luZG93SWQ7XG5cblxuICBtZS5kZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXG4gIG1lLmlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuXG5cbiAgbWUuaWZyYW1lLm5hbWUgPSBleElmcmFtZU5hbWU7XG5cbiAgbWUuaWZyYW1lLmlkID0gZXhJZnJhbWVOYW1lO1xuXG4gIG1lLmlmcmFtZS5mcmFtZUJvcmRlciA9ICcwJztcbiAgLy9tZS5pZnJhbWUuc2Nyb2xsaW5nID0gJ25vJztcblxuICBtZS5pZnJhbWUuekluZGV4ID0gLTE7XG5cbiAgLy9BbGxvdyB0cmFuc3BhcmVudCBvZiBpZnJhbWUgYmFja2dyb3VuZC5cbiAgbWUuaWZyYW1lLmFsbG93VHJhbnNwYXJlbmN5ID0gJ3RydWUnO1xuICBtZS5pZnJhbWUud2lkdGggPSBtZS5jYW52YXNOZXRXaWR0aCAtIG1lLmlmRGVsdGEgKyAwO1xuICBtZS5pZnJhbWUuaGVpZ2h0ID0gbWUuY2FudmFzTmV0SGVpZ2h0IC0gbWUuaWZEZWx0YSArIDA7XG5cbiAgbWUuc2hvd1RpdGxlQmFyID0gYXBwZWFyYW5jZS5zaG93VGl0bGVCYXI7XG5cbiAgbWUuZ2V0RnJhbWVJbm5lckJvcmRlclJhZGl1cyA9IGFwcGVhcmFuY2UuZ2V0RnJhbWVJbm5lckJvcmRlclJhZGl1cztcblxuICBtZS5mcmFtZUJvcmRlclJhZGl1cyA9IGFwcGVhcmFuY2UuZnJhbWVCb3JkZXJSYWRpdXM7XG5cblxuICBtZS5hZGp1c3RGcmFtZUJvcmRlclJhZGl1cygpO1xuXG4gIG1lLnVzZUlmcmFtZSA9IGZhbHNlO1xuXG5cbiAgbWUuY2FudmFzLmNhbnZhc0VsZW1lbnQuYXBwZW5kQ2hpbGQobWUuaWZyYW1lKTtcblxuICBtZS5jYW52YXMuY2FudmFzRWxlbWVudC5hcHBlbmRDaGlsZChtZS5kZnJhbWUpO1xuXG5cbiAgdGhpcy5zZXRVc2VJZnJhbWUgPSBmdW5jdGlvbih1c2VJZnJhbWUpIHtcbiAgICBtZS51c2VJZnJhbWUgPSB1c2VJZnJhbWU7XG4gICAgbWUuaWZyYW1lLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICBtZS5pZnJhbWUuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIG1lLmlmcmFtZS5zdHlsZS5sZWZ0ID0gJzBweCc7XG4gICAgbWUuaWZyYW1lLnN0eWxlLnRvcCA9ICcwcHgnO1xuICAgIG1lLmlmcmFtZS5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBtZS5pZnJhbWUuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuXG4gICAgbWUuZGZyYW1lLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICBtZS5kZnJhbWUuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIG1lLmRmcmFtZS5zdHlsZS5sZWZ0ID0gJzBweCc7XG4gICAgbWUuZGZyYW1lLnN0eWxlLmJveFNpemluZyA9ICdjb250ZW50LWJveCc7XG5cbiAgICBtZS5kZnJhbWUuc3R5bGUudG9wID0gJzBweCc7XG4gICAgbWUuZGZyYW1lLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIG1lLmRmcmFtZS5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgLy9tZS5kZnJhbWUuc3R5bGUuYm9yZGVyU3R5bGU9XCJzb2xpZFwiO1xuICAgIG1lLmRmcmFtZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuXG4gICAgaWYgKHVzZUlmcmFtZSkge1xuICAgICAgbWUuaWZyYW1lLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICBtZS5kZnJhbWUuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZS5pZnJhbWUuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgbWUuZGZyYW1lLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgfVxuICB9O1xuXG4gIG1lLnNldFVzZUlmcmFtZShhcHBlYXJhbmNlLnVzZUlmcmFtZSk7XG5cbiAgLy8gSWYgaXQgaXMgSUUsIHNldCB0aGUgY2FudmFzRWxlbWVudCBvZiB0aGUgY2FudmFzIHdoaWNoIGlzIHRoZSBwYXJlbnQgb2YgdGhlIGlmcmFtZSB0byB0cmFuc3BhcmVudC5cblxuICBpZiAobWUub3ZlcnJheVRyYW5zcGFyZW50U2NyZWVuRW5hYmxlZCB8fCBtZS5vdmVycmF5VHJhbnNwYXJlbnRTY3JlZW5PblJlc2l6ZSkge1xuICAgIC8vQ3JlYXRlIGEgdHJhbnNwYXJlbnQgc2NyZWVuLlxuICAgIG1lLnRyYW5zcGFyZW5jZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAvLyBtZS50cmFuc3BhcmVuY2Uuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybChpbWcvaW1nX2Jhcm9uX3RwLmdpZiknO1xuXG4gICAgbWUudHJhbnNwYXJlbmNlLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBtZS50cmFuc3BhcmVuY2Uuc3R5bGUubGVmdCA9ICcwcHgnO1xuICAgIG1lLnRyYW5zcGFyZW5jZS5zdHlsZS50b3AgPSAnMHB4JztcblxuICAgIC8vVHJhbnNwYXJlbnQgc2NyZWVuIGlzIDBweCB3aGVuIGNyZWF0aW5nIHdpbmRvd1xuICAgIG1lLnRyYW5zcGFyZW5jZS5zdHlsZS53aWR0aCA9ICcwcHgnO1xuICAgIG1lLnRyYW5zcGFyZW5jZS5zdHlsZS5oZWlnaHQgPSAnMHB4JztcblxuICAgIG1lLnRyYW5zcGFyZW5jZS5zdHlsZS56SW5kZXggPSA0O1xuICAgIG1lLnRyYW5zcGFyZW5jZS5zdHlsZS5ib3JkZXJXaWR0aCA9ICcwcHgnO1xuICAgIG1lLnRyYW5zcGFyZW5jZS5zdHlsZS5ib3JkZXJDb2xvciA9ICcjZmYwMGVlJztcbiAgICBtZS50cmFuc3BhcmVuY2Uuc3R5bGUuYm9yZGVyU3R5bGUgPSAnbm9uZSc7XG4gICAgbWUudHJhbnNwYXJlbmNlLnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcblxuICAgIG1lLnRyYW5zcGFyZW5jZS5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgIG1lLmNhbnZhcy5jYW52YXNFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGFwcGVhcmFuY2UuZnJhbWVCYWNrZ3JvdW5kQ29sb3I7XG5cblxuICAgIG1lLmNhbnZhcy5jYW52YXNFbGVtZW50LmFwcGVuZENoaWxkKG1lLnRyYW5zcGFyZW5jZSk7XG4gIH1cblxuICBtZS5ldmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgbWUuYXBwZWFyYW5jZSA9IGFwcGVhcmFuY2U7XG5cbn1cblxuXG5DSWZGcmFtZS5wcm90b3R5cGUuZ2V0RnJhbWVWaWV3ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHJldHVybiBtZS5kZnJhbWU7XG59O1xuXG5DSWZGcmFtZS5wcm90b3R5cGUuZ2V0RnJhbWVBcHBlYXJhbmNlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHJldHVybiBtZS5hcHBlYXJhbmNlO1xufTtcblxuQ0lmRnJhbWUucHJvdG90eXBlLnNldEhUTUwgPSBmdW5jdGlvbihodG1sKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIG1lLmRmcmFtZS5pbm5lckhUTUwgPSBodG1sO1xufTtcbkNJZkZyYW1lLnByb3RvdHlwZS5zZXRGcmFtZUluRnJhbWUgPSBmdW5jdGlvbihlbmFibGVkKSB7XG5cbiAgLy8gV2h5IGkgaGFkIHRvIChib3RoZXIgdG86KSApIG1ha2UgYSBzZXRGcmFtZUluRnJhbWVcbiAgLy8gVGhlIGVsZW1lbnQgc3BlY2lmaWVkIGF0IHRoZSB0b3Agb2YgdGhlIGNvbnRlbnQgb2YgdGhlIHBhcmVudCB3aW5kb3cgKGZvciBleGFtcGxlLCBkaXYgZWxlbWVudClcbiAgLy8gbWF5IE5PVCBiZSBhYmxlIHRvIGdldCB0aGUgcmVzaXplIGV2ZW50IHVzaW5nIGFkZEV2ZW50TGlzdGVuZXIuXG4gIC8vIFRoZXJlZm9yZSwgd2hlbiB0aGUgcmVzaXplIGV2ZW50IGlzc3VlZCBieSBqc0ZyYW1lIGluIHRoZSBwYXJlbnQgd2luZG93IG9jY3VycyxcbiAgLy8gaXRzIGN1c3RvbSBhdHRyaWJ1dGUgKFdpbmRvd0V2ZW50SGVscGVyLk1BVENIX1BBUkVOVF9DSEFOR0VfTUFSS0VSX0FUVFIpIGlzIGF0dGFjaGVkXG4gIC8vIHRvIHRoZSBlbGVtZW50IGF0IHRoZSB0b3Agb2YgdGhlIHBhcmVudCB3aW5kb3cgY29udGVudFxuICAvLyBhbmQgaXQgaXMgY2FwdHVyZWQgYnkgdGhlIG11dGF0aW9uT2JzZXJ2ZXIgb24gdGhlIGNoaWxkIHdpbmRvdyBzaWRlLlxuXG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgdmFyIGNvbnRlbnRzRWxlID0gbWUuZGZyYW1lID8gbWUuZGZyYW1lLmZpcnN0Q2hpbGQgOiBudWxsO1xuXG4gIGlmIChjb250ZW50c0VsZSkge1xuICAgIC8vIHBvbHlmaWxsIGZvciAjbm93XG4gICAgaWYgKCFEYXRlLm5vdykge1xuICAgICAgRGF0ZS5ub3cgPSBmdW5jdGlvbiBub3coKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIH07XG4gICAgfVxuICAgIGlmIChlbmFibGVkKSB7XG4gICAgICBtZS5ldmVudEVtaXR0ZXIub25seSgncmVzaXplJywgJ2ZpZi1saXN0ZW5lcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50c0VsZS5zZXRBdHRyaWJ1dGUoV2luZG93RXZlbnRIZWxwZXIuTUFUQ0hfUEFSRU5UX0NIQU5HRV9NQVJLRVJfQVRUUiwgRGF0ZS5ub3coKSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29udGVudHNFbGUucmVtb3ZlQXR0cmlidXRlKFdpbmRvd0V2ZW50SGVscGVyLk1BVENIX1BBUkVOVF9DSEFOR0VfTUFSS0VSX0FUVFIpO1xuICAgICAgbWUuZXZlbnRFbWl0dGVyLm9ubHkoJ3Jlc2l6ZScsICdmaWYtbGlzdGVuZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuLyoqXG4gKiBGaW5kIERPTSBFbGVtZW50IGluIHRoZSBmcmFtZSBieSBxdWVyeVNlbGVjdG9yPGJyPlxuICogIEV4YW1wbGVzPGJyPlxuICogICAgICBmcmFtZS4kKFwiI215X2lkX25hbWVcIik7XG4gKiAgICAgIGZyYW1lLiQoXCIubXlfY2xhc3NfbmFtZVwiKTtcbiAqICAgICAgZnJhbWUuJChcImRpdj5pbWdcIik7XG4gKiAgICAgIGZyYW1lLiQoXCJpbnB1dFt0eXBlPSdzdWJtaXRdXCIpO1xuICogQHBhcmFtIHtzdHJpbmd9IHEgc2VsZWN0b3IgcXVlcnlcbiAqIEByZXR1cm5zIHtOb2RlfVxuICovXG5DSWZGcmFtZS5wcm90b3R5cGUuJCA9IGZ1bmN0aW9uKHEpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICBpZiAobWUudXNlSWZyYW1lKSB7XG5cbiAgICB2YXIgZG9jSW5JZnJhbWUgPSBtZS5pZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgICByZXR1cm4gZG9jSW5JZnJhbWUucXVlcnlTZWxlY3RvcihxKTtcblxuICB9IGVsc2Uge1xuICAgIHJldHVybiBtZS5kZnJhbWUucXVlcnlTZWxlY3RvcihxKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTZXRzIGFuIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgd2luZG93IGl0c2VsZiBvciBlbGVtZW50cyBpbiB0aGUgY29udGVudHMgb2YgdGhlIHdpbmRvdy5cbiBJdCBpcyBwb3NzaWJsZSB0byByZWdpc3RlciBtdWx0aXBsZSBsaXN0ZW5lcnMgdG8gdGhlIHNhbWUgZXZlbnQgdHlwZS5cblxuICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gSWYgdGhlIFwiaWRcIiBpcyBwcmVmaXhlZCB3aXRoIFwiI1wiLFxuIGFuIGV2ZW50IGxpc3RlbmVyIGNhbiBiZSBzZXQgdG8gYSBET00gZWxlbWVudCAoZXZlbnRUYXJnZXQpIGlkZW50aWZpZWQgYnkgdGhlIGlkIGluIHRoZSBjb250ZW50Ljxicj5cbiBUaGlzIGlzIHRoZSBzYW1lIGJlaGF2aW9yIGFzIHRoZSB1c3VhbCBldmVudFRhcmdldCNhZGRFdmVudExpc3RlbmVyLjxicj5cbiA8YnI+XG4gSW4gYWRkaXRpb24gdG8gdGhlIERPTSBlbGVtZW50IGluIHRoZSBjb250ZW50LCB0aGUgZm9sbG93aW5nIHNwZWNpYWwgbmFtZXMgYXJlIHJlc2VydmVkIGZvciB0aGUgXCJpZFwiPGJyPlxuIFwiY2xvc2VCdXR0b25cIiAuLi4gY2xvc2UgYnV0dG9uLjxicj5cbiBcIm1pbmltaXplQnV0dG9uXCIgLi4uIE1pbmltaXplIEJ1dHRvbjxicj5cbiBcInpvb21CdXR0b25cIi4uLnpvb20gYnV0dG9uLjxicj5cbiBcInJlc3RvcmVCdXR0b25cIiAuLi4gdGhlIGJ1dHRvbiB0aGF0IHJlc3RvcmVzIHRoZSB3aW5kb3cgc2l6ZS48YnI+XG4gXCJkZW1pbmltaXplQnV0dG9uXCIgLi4uIHRoZSBidXR0b24gdG8gcmV0dXJuIGZyb20gdGhlIG1pbmltaXplZCBzdGF0ZS48YnI+XG4gPGJyPlxuIFlvdSBjYW4gYWxzbyByZWNlaXZlIGV2ZW50cyBzdWNoIGFzIHdpbmRvdyByZXNpemluZywgbW92aW5nLCBhbmQgZm9jdXNpbmcuXG4gSW4gdGhpcyBjYXNlLCBzcGVjaWZ5IHRoZSBmb2xsb3dpbmcgYXMgXCJpZFwiPGJyPlxuIFwiZnJhbWVcIiBvciBcIndpbmRvd1wiLjxicj5cbiA8YnI+XG4gWW91IGNhbiBzcGVjaWZ5IGEgZnJhbWVDb21wb25lbnQgbmFtZSB0aGF0IGlzIHVuaXF1ZWx5IGRlZmluZWQgYnkgYWRkRnJhbWVDb21wb25lbnQuXG4gKEdlbmVyaWMgYnV0dG9ucyBzdWNoIGFzIGNsb3NlQnV0dG9uIGFyZSBvbmUgb2YgdGhlIGZyYW1lIGNvbXBvbmVudHMuXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlIFRoZSBlbGVtZW50IGluIHRoZSBjb250ZW50IChIVE1MKSBvZiBhIHdpbmRvdyB3aG9zZSBcImlkXCIgc3RhcnRzIHdpdGggXCIjXCJcbiAqIGNhbiBiZSB0aGUgc2FtZSBhcyB0aGUgZXZlbnRUeXBlKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FdmVudC90eXBlKSB1c2VkIGJ5IHRoZSBub3JtYWwgYWRkRXZlbnRMaXN0ZW5lci48YnI+XG4gPGJyPlxuIElmIHRoZSBcImlkXCIgaXMgYSBmcmFtZSBvciBhIHdpbmRvdywgdGhlIGZvbGxvd2luZyBjYW4gYmUgdXNlZDxicj5cbiBcIm1vdmVcIi4uLiBXaGVuIGEgd2luZG93IGlzIG1vdmVkLCBpdCBmaXJlcy48YnI+XG4gXCJyZXNpemVcIi4uLiBGaXJlcyB3aGVuIHRoZSB3aW5kb3cgaXMgcmVzaXplZC48YnI+XG4gXCJmb2N1c1wiLi4uIFwiZm9jdXNcIiBtZWFucyBnb3QgZm9jdXMuIEl0IGZpcmVzIHdoZW4gdGhlIHdpbmRvdyBpcyBpbiBmb2N1cy48YnI+XG4gXCJibHVyXCIuLi4gXCJibHVyXCIgbWVhbnMgbG9zdCBmb2N1cy5JdCBmaXJlcyB3aGVuIHRoZSB3aW5kb3cgbG9zZXMgZm9jdXMuPGJyPlxuIDxicj5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrRnVuY1xuICovXG5DSWZGcmFtZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbihpZCwgZXZlbnRUeXBlLCBjYWxsYmFja0Z1bmMpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgdmFyIGNvbXBvbmVudCA9IG1lLmdldEZyYW1lQ29tcG9uZW50RWxlbWVudChpZCk7XG5cbiAgLy8gaWYgaWQgaW5kaWNhdGVzIGZyYW1lIGNvbXBvbmVudCBsaWtlIENUZXh0QnV0dG9uLENJbWFnZUJ1dHRvblxuICBpZiAoY29tcG9uZW50KSB7XG5cbiAgICAvL1NpbmNlIHdlIHdhbnQgdG8gc3BlY2lmeSBvbmx5IG9uZSBoYW5kbGVyIGZvciBmcmFtZSBjb21wb25lbnRzIGF0IHRoZSBzYW1lIHRpbWUsXG4gICAgLy8gdXNlIGV2ZW50TGlzdGVuZXJIZWxwZXIgaW5zdGVhZCBvZiBhbiBldmVudCBsaXN0ZW5lclxuICAgIG1lLmV2ZW50TGlzdGVuZXJIZWxwZXIuYWRkRXZlbnRMaXN0ZW5lcihjb21wb25lbnQsIGV2ZW50VHlwZSwgZnVuY3Rpb24oZSkge1xuICAgICAgY2FsbGJhY2tGdW5jKG1lLCBlLFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2ZyYW1lQ29tcG9uZW50JyxcbiAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgZXZlbnRUeXBlOiBldmVudFR5cGUsXG4gICAgICAgICAgLy9jaGlsZDogY2hpbGRNZW51RWxlXG4gICAgICAgIH0pO1xuICAgIH0sIHsgbGlzdGVuZXJOYW1lOiAnZnJhbWUtY29tcG9uZW50LWxpc3RlbmVyJyB9KTtcbiAgfVxuXG4gIGlmIChpZCA9PT0gJ2ZyYW1lJyB8fCBpZCA9PT0gJ3dpbmRvdycpIHtcblxuICAgIGlmIChldmVudFR5cGUgPT09ICdtb3ZlJyAmJiAhbWUuZXZlbnRFbWl0dGVyLmhhc0xpc3RlbmVyRnVuY3MoJ21vdmUnKSkge1xuICAgICAgbWUuc2V0T25Nb3ZlTGlzdGVuZXIoZnVuY3Rpb24oZSkge1xuICAgICAgICAvL3JlZkNJZkZyYW1lLmV2ZW50RW1pdHRlci5lbWl0KCdyZXNpemUnLCk7XG4gICAgICAgIG1lLmV2ZW50RW1pdHRlci5lbWl0KCdtb3ZlJywgbWUuX2dldEN1cnJlbnRTaXplUG9zKCkpO1xuICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBtZS5ldmVudEVtaXR0ZXIub24oZXZlbnRUeXBlLCBjYWxsYmFja0Z1bmMpO1xuICB9XG5cbiAgLy8gRE9NIGVsZW1lbnQgaW4gaWZyYW1lIG9yIERPTSBlbGVtZW50IG9uIGRmcmFtZVxuICB2YXIgZG9tRWxlbWVudCA9IG1lLiQoaWQpO1xuXG4gIGlmIChkb21FbGVtZW50KSB7XG4gICAgaWYgKG1lLmV2ZW50TGlzdGVuZXJIZWxwZXIuaGFzRXZlbnRMaXN0ZW5lcihkb21FbGVtZW50LCBldmVudFR5cGUsICdmcmFtZS1kb20tbGlzdGVuZXInKSkge1xuICAgICAgbWUuZXZlbnRMaXN0ZW5lckhlbHBlci5yZW1vdmVFdmVudExpc3RlbmVyKGRvbUVsZW1lbnQsIGV2ZW50VHlwZSwgbnVsbCwgeyBsaXN0ZW5lck5hbWU6ICdmcmFtZS1kb20tbGlzdGVuZXInIH0pO1xuICAgIH1cbiAgICBtZS5ldmVudExpc3RlbmVySGVscGVyLmFkZEV2ZW50TGlzdGVuZXIoZG9tRWxlbWVudCwgZXZlbnRUeXBlLCBmdW5jdGlvbihlKSB7XG4gICAgICBjYWxsYmFja0Z1bmMobWUsIGUsIHtcbiAgICAgICAgdHlwZTogJ2RvbScsXG4gICAgICAgIGlkOiBpZCxcbiAgICAgICAgZXZlbnRUeXBlOiBldmVudFR5cGVcbiAgICAgIH0pO1xuICAgIH0sIHsgbGlzdGVuZXJOYW1lOiAnZnJhbWUtZG9tLWxpc3RlbmVyJyB9KTtcbiAgfVxuXG4gIC8vIFNlYXJjaCBET00gZWxlbWVudCBvbiBmcmFtZUNvbXBvbmVudFxuICBpZiAoIWRvbUVsZW1lbnQpIHtcblxuICAgIHZhciBkb21FbGVtZW50T25DYW52YXNFbGVtZW50ID0gbWUuY2FudmFzLmNhbnZhc0VsZW1lbnQucXVlcnlTZWxlY3RvcihpZCk7XG4gICAgaWYgKGRvbUVsZW1lbnRPbkNhbnZhc0VsZW1lbnQpIHtcbiAgICAgIGRvbUVsZW1lbnRPbkNhbnZhc0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY2FsbGJhY2tGdW5jKG1lLCBlLCB7XG4gICAgICAgICAgdHlwZTogJ2RvbScsXG4gICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgIGV2ZW50VHlwZTogZXZlbnRUeXBlXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuXG5cbkNJZkZyYW1lLnByb3RvdHlwZS5hZGp1c3RGcmFtZUJvcmRlclJhZGl1cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbWUgPSB0aGlzO1xuXG4gIGlmIChwYXJzZUludChtZS5mcmFtZUJvcmRlclJhZGl1cywgMTApID4gMCkge1xuXG4gICAgdmFyIGJvcmRlckRhdGEgPSBtZS5nZXRGcmFtZUlubmVyQm9yZGVyUmFkaXVzKG1lLCBtZS5faGFzRm9jdXMpO1xuICAgIHZhciBmcmFtZUFwcGVhcmFuY2UgPSBib3JkZXJEYXRhLmZyYW1lQXBwZWFyYW5jZTtcbiAgICB2YXIgaW5uZXJCb3JkZXJSYWRpdXMgPSBib3JkZXJEYXRhLmlubmVyQm9yZGVyUmFkaXVzO1xuICAgIHZhciB0aXRsZUJhckhlaWdodCA9IHBhcnNlSW50KGZyYW1lQXBwZWFyYW5jZS50aXRsZUJhckhlaWdodCwgMTApO1xuXG4gICAgaWYgKG1lLnNob3dUaXRsZUJhcikge1xuXG4gICAgICAvL3RpdGxlIGJhciBleGlzdHNcbiAgICAgIG1lLmNhbnZhcy5jYW52YXNFbGVtZW50LnN0eWxlLmJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzID0gaW5uZXJCb3JkZXJSYWRpdXM7XG4gICAgICBtZS5jYW52YXMuY2FudmFzRWxlbWVudC5zdHlsZS5ib3JkZXJCb3R0b21MZWZ0UmFkaXVzID0gaW5uZXJCb3JkZXJSYWRpdXM7XG4gICAgICBtZS5pZnJhbWUuc3R5bGUuYm9yZGVyQm90dG9tUmlnaHRSYWRpdXMgPSBpbm5lckJvcmRlclJhZGl1cztcbiAgICAgIG1lLmlmcmFtZS5zdHlsZS5ib3JkZXJCb3R0b21MZWZ0UmFkaXVzID0gaW5uZXJCb3JkZXJSYWRpdXM7XG5cbiAgICAgIG1lLnRpdGxlQmFyLnN0eWxlLmJvcmRlclRvcExlZnRSYWRpdXMgPSBpbm5lckJvcmRlclJhZGl1cztcbiAgICAgIG1lLnRpdGxlQmFyLnN0eWxlLmJvcmRlclRvcFJpZ2h0UmFkaXVzID0gaW5uZXJCb3JkZXJSYWRpdXM7XG5cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8vdGl0bGUgYmFyIG5vdCBleGl0c1xuICAgICAgbWUuY2FudmFzLmNhbnZhc0VsZW1lbnQuc3R5bGUuYm9yZGVyUmFkaXVzID0gaW5uZXJCb3JkZXJSYWRpdXM7XG4gICAgICBtZS5pZnJhbWUuc3R5bGUuYm9yZGVyUmFkaXVzID0gaW5uZXJCb3JkZXJSYWRpdXM7XG5cbiAgICB9XG5cbiAgICBpZiAobWUuZGZyYW1lKSB7XG4gICAgICBpZiAodGl0bGVCYXJIZWlnaHQgPT09IDApIHtcbiAgICAgICAgaWYgKCFtZS5kZnJhbWUuc3R5bGUuYm9yZGVyVG9wUmlnaHRSYWRpdXMpIHtcbiAgICAgICAgICBtZS5kZnJhbWUuc3R5bGUuYm9yZGVyVG9wUmlnaHRSYWRpdXMgPSBpbm5lckJvcmRlclJhZGl1cztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1lLmRmcmFtZS5zdHlsZS5ib3JkZXJUb3BMZWZ0UmFkaXVzKSB7XG4gICAgICAgICAgbWUuZGZyYW1lLnN0eWxlLmJvcmRlclRvcExlZnRSYWRpdXMgPSBpbm5lckJvcmRlclJhZGl1cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbWUuZGZyYW1lLnN0eWxlLmJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzID0gaW5uZXJCb3JkZXJSYWRpdXM7XG4gICAgICBtZS5kZnJhbWUuc3R5bGUuYm9yZGVyQm90dG9tTGVmdFJhZGl1cyA9IGlubmVyQm9yZGVyUmFkaXVzO1xuICAgIH1cblxuXG4gIH1cbn07XG5cbkNJZkZyYW1lLnByb3RvdHlwZS5oYW5kbGVSZWxlYXNpbmdGb2N1cyA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICB2YXIgZm9jdXNlZCA9IG1lLl9oYXNGb2N1cztcblxuICBtZS5faGFzRm9jdXMgPSBmYWxzZTtcblxuICAvL3VwZGF0ZSBzdHlsZSBjbGFzc1xuICBtZS50aXRsZUJhci5jbGFzc05hbWUgPSBtZS50aXRsZUJhckNsYXNzTmFtZURlZmF1bHQ7XG5cbiAgaWYgKG1lLnRpdGxlQmFyQ29sb3JEZWZhdWx0KSB7XG4gICAgbWUudGl0bGVCYXIuc3R5bGUuYmFja2dyb3VuZCA9IG1lLnRpdGxlQmFyQ29sb3JEZWZhdWx0O1xuICB9XG4gIG1lLnRpdGxlQmFyLnN0eWxlLmNvbG9yID0gbWUudGl0bGVCYXJDYXB0aW9uQ29sb3JEZWZhdWx0O1xuXG4gIC8vYm9yZGVyIGNvbG9yXG4gIGlmIChtZS5mcmFtZUJvcmRlckNvbG9yRGVmYXVsdCkge1xuICAgIG1lLmh0bWxFbGVtZW50LnN0eWxlLmJvcmRlckNvbG9yID0gbWUuZnJhbWVCb3JkZXJDb2xvckRlZmF1bHQ7XG4gIH1cblxuICAvL2JvcmRlciB3aWR0aFxuICBpZiAobWUuZnJhbWVCb3JkZXJXaWR0aERlZmF1bHQpIHtcbiAgICBtZS5odG1sRWxlbWVudC5zdHlsZS5ib3JkZXJXaWR0aCA9IG1lLmZyYW1lQm9yZGVyV2lkdGhEZWZhdWx0O1xuICAgIG1lLmFkanVzdEZyYW1lQm9yZGVyUmFkaXVzKCk7XG4gIH1cblxuICBpZiAobWUuaHRtbEVsZW1lbnQudHlwZU5hbWUgPT0gJ2NpZndpbmRvdycpIHtcbiAgICBpZiAobWUub3ZlcnJheVRyYW5zcGFyZW50U2NyZWVuRW5hYmxlZCkge1xuICAgICAgbWUudHJhbnNwYXJlbmNlLnN0eWxlLndpZHRoID0gcGFyc2VJbnQobWUuaWZyYW1lLndpZHRoLCAxMCkgKyAncHgnO1xuICAgICAgbWUudHJhbnNwYXJlbmNlLnN0eWxlLmhlaWdodCA9IHBhcnNlSW50KG1lLmlmcmFtZS5oZWlnaHQsIDEwKSArICdweCc7XG4gICAgfVxuICB9XG5cbiAgLy9oYW5kbGluZyBmb3IgY2hpbGQgZnJhbWVDb21wb25lbnRzXG4gIGZvciAodmFyIGZyYW1lQ29tcG9uZW50SWQgaW4gbWUuZnJhbWVDb21wb25lbnRNYXApIHtcbiAgICB2YXIgZnJhbWVDb21wb25lbnQgPSBtZS5mcmFtZUNvbXBvbmVudE1hcFtmcmFtZUNvbXBvbmVudElkXTtcbiAgICBmcmFtZUNvbXBvbmVudC5oYW5kbGVSZWxlYXNpbmdGb2N1cygpO1xuICB9XG5cbiAgLy9ib3JkZXIgYm90dG9tXG4gIGlmIChtZS50aXRsZUJhckJvcmRlckJvdHRvbURlZmF1bHQpIHtcbiAgICBtZS50aXRsZUJhci5zdHlsZS5ib3JkZXJCb3R0b20gPSBtZS50aXRsZUJhckJvcmRlckJvdHRvbURlZmF1bHQ7XG4gIH1cblxuICBpZiAoZm9jdXNlZCkge1xuICAgIG1lLmV2ZW50RW1pdHRlci5lbWl0KCdibHVyJywgeyB0YXJnZXQ6IG1lIH0pO1xuICB9XG5cblxuICByZXR1cm4gbWU7XG59O1xuXG5DSWZGcmFtZS5wcm90b3R5cGUuaGFuZGxlVGFraW5nRm9jdXMgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHZhciBmb2N1c2VkID0gbWUuX2hhc0ZvY3VzO1xuICBtZS5faGFzRm9jdXMgPSB0cnVlO1xuICBtZS5faGFzRm9jdXMgPSBEYXRlLm5vdygpO1xuXG4gIGlmIChtZS5vdmVycmF5VHJhbnNwYXJlbnRTY3JlZW5FbmFibGVkKSB7XG5cbiAgICAvL2Nsb3NlIHRyYW5zcGFyZW5jZSBzY3JlZW5cbiAgICBtZS50cmFuc3BhcmVuY2Uuc3R5bGUud2lkdGggPSAnMHB4JztcbiAgICBtZS50cmFuc3BhcmVuY2Uuc3R5bGUuaGVpZ2h0ID0gJzBweCc7XG5cbiAgfVxuXG4gIC8vdXBkYXRlIHN0eWxlIGNsYXNzXG4gIG1lLnRpdGxlQmFyLmNsYXNzTmFtZSA9IG1lLnRpdGxlQmFyQ2xhc3NOYW1lRm9jdXNlZDtcblxuICBpZiAobWUudGl0bGVCYXJDb2xvckZvY3VzZWQpIHtcbiAgICBtZS50aXRsZUJhci5zdHlsZS5iYWNrZ3JvdW5kID0gbWUudGl0bGVCYXJDb2xvckZvY3VzZWQ7XG4gIH1cbiAgbWUudGl0bGVCYXIuc3R5bGUuY29sb3IgPSBtZS50aXRsZUJhckNhcHRpb25Db2xvckZvY3VzZWQ7XG5cblxuICAvL2JvcmRlciBjb2xvclxuICBpZiAobWUuZnJhbWVCb3JkZXJDb2xvckZvY3VzZWQpIHtcbiAgICBtZS5odG1sRWxlbWVudC5zdHlsZS5ib3JkZXJDb2xvciA9IG1lLmZyYW1lQm9yZGVyQ29sb3JGb2N1c2VkO1xuICB9XG5cbiAgLy9ib3JkZXIgd2lkdGhcbiAgaWYgKG1lLmZyYW1lQm9yZGVyV2lkdGhGb2N1c2VkKSB7XG4gICAgbWUuaHRtbEVsZW1lbnQuc3R5bGUuYm9yZGVyV2lkdGggPSBtZS5mcmFtZUJvcmRlcldpZHRoRm9jdXNlZDtcbiAgICBtZS5hZGp1c3RGcmFtZUJvcmRlclJhZGl1cygpO1xuICB9XG5cbiAgLy9ib3JkZXIgYm90dG9tXG4gIGlmIChtZS50aXRsZUJhckJvcmRlckJvdHRvbUZvY3VzZWQpIHtcbiAgICBtZS50aXRsZUJhci5zdHlsZS5ib3JkZXJCb3R0b20gPSBtZS50aXRsZUJhckJvcmRlckJvdHRvbUZvY3VzZWQ7XG4gIH1cblxuICAvL2hhbmRsaW5nIGZvciBjaGlsZCBmcmFtZUNvbXBvbmVudHNcbiAgZm9yICh2YXIgZnJhbWVDb21wb25lbnRJZCBpbiBtZS5mcmFtZUNvbXBvbmVudE1hcCkge1xuICAgIHZhciBmcmFtZUNvbXBvbmVudCA9IG1lLmZyYW1lQ29tcG9uZW50TWFwW2ZyYW1lQ29tcG9uZW50SWRdO1xuICAgIGZyYW1lQ29tcG9uZW50LmhhbmRsZVRha2luZ0ZvY3VzKCk7XG4gIH1cblxuXG4gIGlmICghZm9jdXNlZCkge1xuICAgIG1lLmV2ZW50RW1pdHRlci5lbWl0KCdmb2N1cycsIHsgdGFyZ2V0OiBtZSB9KTtcbiAgfVxuXG4gIHJldHVybiBtZTtcbn07XG5cblxuQ0ZyYW1lLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24obW9kZWwpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgLy9tZS5odG1sRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICBtZS5odG1sRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnOy8vaGlkZGVuJztcblxuICBpZiAobW9kZWwgJiYgbW9kZWwucmVxdWVzdEZvY3VzID09IGZhbHNlKSB7XG5cbiAgfSBlbHNlIHtcbiAgICBtZS5yZXF1ZXN0Rm9jdXMoKTtcbiAgfVxuICByZXR1cm4gbWU7XG59O1xuXG5cbkNGcmFtZS5wcm90b3R5cGUuc2hvd01vZGFsID0gZnVuY3Rpb24ob25DbG9zZUxpc3RlbmVyKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgdmFyIGFwcGVhcmFuY2UgPSBuZXcgQ0ZyYW1lQXBwZWFyYW5jZSgpO1xuICBhcHBlYXJhbmNlLnNob3dUaXRsZUJhciA9IHRydWU7XG4gIGFwcGVhcmFuY2Uuc2hvd0Nsb3NlQnV0dG9uID0gZmFsc2U7XG4gIGFwcGVhcmFuY2UuZnJhbWVCb3JkZXJSYWRpdXMgPSAnMHB4JztcbiAgYXBwZWFyYW5jZS5mcmFtZUJvcmRlclN0eWxlID0gJ25vbmUnO1xuICBhcHBlYXJhbmNlLmZyYW1lQm9yZGVyV2lkdGhEZWZhdWx0ID0gJzBweCc7XG4gIGFwcGVhcmFuY2UuZnJhbWVCb3JkZXJXaWR0aEZvY3VzZWQgPSAnMHB4JztcbiAgYXBwZWFyYW5jZS5mcmFtZUJveFNoYWRvdyA9IG51bGw7XG4gIGFwcGVhcmFuY2UuZnJhbWVCYWNrZ3JvdW5kQ29sb3IgPSAndHJhbnNwYXJlbnQnO1xuICBhcHBlYXJhbmNlLmZyYW1lQ29tcG9uZW50cyA9IFtdO1xuICBhcHBlYXJhbmNlLmZyYW1lSGVpZ2h0QWRqdXN0ID0gMDtcbiAgYXBwZWFyYW5jZS50aXRsZUJhckhlaWdodCA9ICcwcHgnO1xuICBhcHBlYXJhbmNlLnRpdGxlQmFyQm9yZGVyQm90dG9tRm9jdXNlZCA9IG51bGw7XG4gIGFwcGVhcmFuY2UudGl0bGVCYXJDYXB0aW9uTGVmdE1hcmdpbiA9ICcwcHgnO1xuXG5cbiAgYXBwZWFyYW5jZS5vbkluaXRpYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgfTtcblxuICAvL2FkZGVkIGZvciBtb2RhbCB3aW5kb3dcbiAgYXBwZWFyYW5jZS5wdWxsVXBEaXNhYmxlZCA9IHRydWU7XG5cbiAgdmFyIHdpbmRvd01hbmFnZXIgPSBtZS5wYXJlbnRDYW52YXM7XG5cbiAgdmFyIG1vZGFsQmFja2dyb3VuZFdpbmRvd0lkID0gREVGLkNGUkFNRS5NT0RBTF9CQUNLR1JPVU5EX0ZSQU1FX0lEX1BSRUZJWCArIG1lLmlkO1xuXG4gIC8vY3JlYXRlIGJhY2tncm91bmQgd2luZG93IGZvciBwcmV2ZW50aW5nIGNsaWNrIGJhY2tncm91bmRcbiAgdmFyIG1vZGFsQmFja2dyb3VuZEZyYW1lID0gbmV3IENJZkZyYW1lKG1vZGFsQmFja2dyb3VuZFdpbmRvd0lkLCAwLCAwLCAxLCAxLCBhcHBlYXJhbmNlKTtcbiAgbW9kYWxCYWNrZ3JvdW5kRnJhbWUuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0LCB0cnVlKTtcbiAgbW9kYWxCYWNrZ3JvdW5kRnJhbWUuc2V0UmVzaXphYmxlKGZhbHNlKTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgbW9kYWxCYWNrZ3JvdW5kRnJhbWUuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0LCB0cnVlKTtcbiAgfSk7XG5cblxuICAvL3JlbWVtYmVyIGlkIG9mIG1vZGFsIGJhY2tncm91bmQgZnJhbWVcbiAgbWUubW9kYWxCYWNrZ3JvdW5kV2luZG93SWQgPSBtb2RhbEJhY2tncm91bmRXaW5kb3dJZDtcblxuICAvLyBpZiAocHJvcGVydGllcyAmJiBwcm9wZXJ0aWVzLndpbmRvd05hbWUpIHtcbiAgLy8gICAgIGZyYW1lLnNldE5hbWUocHJvcGVydGllcy53aW5kb3dOYW1lKTtcbiAgLy8gfVxuXG4gIG1vZGFsQmFja2dyb3VuZEZyYW1lLmhpZGUoKTtcbiAgd2luZG93TWFuYWdlci5hZGRXaW5kb3cobW9kYWxCYWNrZ3JvdW5kRnJhbWUpO1xuXG5cbiAgbW9kYWxCYWNrZ3JvdW5kRnJhbWUuc2V0VGl0bGUoJycpLmdldEZyYW1lVmlldygpLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwianNmcmFtZS1tb2RhbC13aW5kb3ctYmFja2dyb3VuZFwiPjwvZGl2Pic7XG4gIG1vZGFsQmFja2dyb3VuZEZyYW1lLmdldEZyYW1lVmlldygpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDAsMCwwLDAuMCknO1xuICBtb2RhbEJhY2tncm91bmRGcmFtZS5zaG93KCk7XG5cbiAgbWUuc2hvdygpO1xuXG4gIGlmIChvbkNsb3NlTGlzdGVuZXIpIHtcbiAgICBtZS5zZXRPbkNsb3NlRnJhbWVMaXN0ZW5lcihvbkNsb3NlTGlzdGVuZXIpO1xuICB9XG59O1xuQ0ZyYW1lLnByb3RvdHlwZS5nZXRXaW5kb3dNYW5hZ2VyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHJldHVybiBtZS5wYXJlbnRDYW52YXM7XG59XG5cblxuQ0lmRnJhbWUucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgLy8gIG1lLmh0bWxFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgbWUuaHRtbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJzsvL2hpZGRlbic7XG4gIHJldHVybiBtZTtcbn07XG5cbi8vT3ZlcnJpZGluZyBDQmVhbkZyYW1lLnByb3RvdHlwZS5vbm1vdXNlRG93blxuQ0lmRnJhbWUucHJvdG90eXBlLm9ubW91c2VEb3duID0gZnVuY3Rpb24oZSkge1xuXG4gIHZhciByZWZIdG1sRWxlbWVudCA9IHRoaXM7XG5cbiAgLy9EbyBub3Qgc2VsZWN0IGl0IHdoZW4gZHJhZ2dpbmcgYnkgdGhlIG1vdXNlLlxuICBkb2N1bWVudC5ib2R5Lm9uZHJhZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcbiAgLy8gZG9jdW1lbnQuYm9keS5vbnNlbGVjdHN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAvLyAgICAgcmV0dXJuIGZhbHNlO1xuICAvLyB9O1xuXG5cbiAgLy9PdmVycmlkZSBkZWNvcmF0b3Igd2l0aCBvbm1vdXNlRG93biBvZiBwYXJlbnQgY2xhc3NcbiAgcmVmSHRtbEVsZW1lbnQuZGVjb3JhdG9yID0gQ0ZyYW1lLnByb3RvdHlwZS5vbm1vdXNlRG93bjtcbiAgcmVmSHRtbEVsZW1lbnQuZGVjb3JhdG9yKGUpO1xuXG4gIC8vRGVwbG95IGEgdHJhbnNwYXJlbnQgc2NyZWVuLlxuICAvLyBTaW5jZSBtb3VzZURvd24gaXMgcG9pbnRlZCB0byB0aGlzLmh0bWxFbGVtZW50Lm9ubW91c2Vkb3duIGluIHRoZSBDQmVhbiBjbGFzcyxcbiAgLy8gdGhpcyAndGhpcycgd2lsbCBpbmRpY2F0ZSB0aGlzLmh0bWxFbGVtZW50LlxuICAvL0luIG90aGVyIHdvcmRzLFxuICAvL2lmIHlvdSB3YW50IHRvIHJlZmVyICdDSWZGcmFtZScseW91IG5lZWQgdG8gc3BlY2lmeSAndGhpcy5wYXJlbnQuJ1xuICAvL1NlZSBDQmVhbkZyYW1lIGNsYXNzLCB5b3UgY2FuIGZpbmQgJ3RoaXMuaHRtbEVsZW1lbnQucGFyZW50ID0gdGhpcydcbiAgdmFyIHJlZkNJZkZyYW1lID0gcmVmSHRtbEVsZW1lbnQucGFyZW50O1xuXG5cbiAgdmFyIHJlZkNXaW5kb3dNYW5hZ2VyID0gcmVmSHRtbEVsZW1lbnQucGFyZW50Q2FudmFzO1xuXG4gIC8vV2hlbiBzb21ld2hlcmUgd2luZG93KENGcmFtZSxDSWZGcmFtZSkgZmlyZXMgJ21vdXNlRG93bicsXG4gIC8vIENsb3NlIGFsbCB0cmFuc3BhcmVuY3kgc2NyZWVucyBzbyB0aGF0IHRoZSBtb3VzZSBjdXJzb3IgY2FuIHBhc3Mgb3ZlciBhbnkgaUZyYW1lXG4gIGZvciAodmFyIHdpbmRvd0lkIGluIHJlZkNXaW5kb3dNYW5hZ2VyLmJlYW5MaXN0KSB7XG4gICAgdmFyIG9iakNJZkZyYW1lID0gcmVmQ1dpbmRvd01hbmFnZXIuYmVhbkxpc3Rbd2luZG93SWRdO1xuICAgIGlmICh3aW5kb3dJZCA9PSByZWZDSWZGcmFtZS5nZXRXaW5kb3dJZCgpKSB7XG4gICAgICAvL3NraXBcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqQ0lmRnJhbWUuaGFuZGxlUmVsZWFzaW5nRm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICByZWZDSWZGcmFtZS5oYW5kbGVUYWtpbmdGb2N1cygpO1xuXG59O1xuXG5DSWZGcmFtZS5wcm90b3R5cGUubW91c2VVcCA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIHJlZkNJZkZyYW1lID0gdGhpcztcblxuXG4gIGlmIChyZWZDSWZGcmFtZS5vdmVycmF5VHJhbnNwYXJlbnRTY3JlZW5FbmFibGVkIHx8IHJlZkNJZkZyYW1lLm92ZXJyYXlUcmFuc3BhcmVudFNjcmVlbk9uUmVzaXplKSB7XG4gICAgaWYgKHJlZkNJZkZyYW1lLnBhcmVudENhbnZhcy5vblRvcE9iamVjdCA9PSByZWZDSWZGcmFtZSkge1xuICAgICAgLy9NaW5pbWl6ZSB0aGUgd2luZG93IGF0IHRoZSBmcm9udC5cbiAgICAgIHJlZkNJZkZyYW1lLnRyYW5zcGFyZW5jZS5zdHlsZS53aWR0aCA9ICcwcHgnO1xuICAgICAgcmVmQ0lmRnJhbWUudHJhbnNwYXJlbmNlLnN0eWxlLmhlaWdodCA9ICcwcHgnO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL1RoZSB3aW5kb3cgd2hpY2ggaXMgbm90IHRoZSBhdCB0aGUgZnJvbnQgZXhwYW5kcyB0aGUgc2NyZWVuIHNvIHRoYXQgaXQgY2FuIHJlc3BvbmQgdG8gY2xpY2tzLlxuXG4gICAgICBpZiAocmVmQ0lmRnJhbWUub3ZlcnJheVRyYW5zcGFyZW50U2NyZWVuRW5hYmxlZCkge1xuICAgICAgICByZWZDSWZGcmFtZS50cmFuc3BhcmVuY2Uuc3R5bGUud2lkdGggPSBwYXJzZUludChyZWZDSWZGcmFtZS5pZnJhbWUud2lkdGgpICsgJ3B4JztcbiAgICAgICAgcmVmQ0lmRnJhbWUudHJhbnNwYXJlbmNlLnN0eWxlLmhlaWdodCA9IHBhcnNlSW50KHJlZkNJZkZyYW1lLmlmcmFtZS5oZWlnaHQpICsgJ3B4JztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZWZDSWZGcmFtZS5kZWNvcmF0b3IgPSBDRnJhbWUucHJvdG90eXBlLm1vdXNlVXA7XG4gIHJlZkNJZkZyYW1lLmRlY29yYXRvcihlKTtcblxuXG4gIC8vQ2FuY2VsIHNlbGVjdGluZyBcIkRvIG5vdCBzZWxlY3Qgd2hlbiBkcmFnZ2luZyBtb3VzZSB3aGlsZSByZWxlYXNpbmcgYnV0dG9uXCIgaXMgY2FuY2VsZWRcbiAgZG9jdW1lbnQuYm9keS5vbmRyYWcgPSBudWxsO1xuICBkb2N1bWVudC5ib2R5Lm9uc2VsZWN0c3RhcnQgPSBudWxsO1xuXG4gIC8vRGlzYWJsZSB3aGVuIHN0b3BwaW5nIG1vdmluZy4oRW5hYmxlIHRyYW5zcGFyZW50IHdpbmRvdyBvbmx5IHdoZW4gbW92aW5nLilcbiAgLy9UaGlzIHdpbGwgd29yayBzbW9vdGhseSBldmVuIHdpdGggaWZyYW1lIGNvbnRlbnRcbiAgcmVmQ0lmRnJhbWUudHJhbnNwYXJlbmNlLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG59O1xuXG5DSWZGcmFtZS5wcm90b3R5cGUuc2V0TWluRnJhbWVTaXplID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICBtZS5taW5GcmFtZVdpZHRoID0gd2lkdGg7XG4gIG1lLm1pbldpbmRvd0hlaWdodCA9IGhlaWdodDtcbn07XG5cbkNJZkZyYW1lLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbihkZWx0YUxlZnQsIGRlbHRhVG9wLCBkZWx0YVdpZHRoLCBkZWx0YUhlaWdodCwgYnlVc2VyKSB7XG5cblxuICB2YXIgcmVmQ0lmRnJhbWUgPSB0aGlzO1xuXG4gIGlmICghcmVmQ0lmRnJhbWUucmVzaXphYmxlICYmIGJ5VXNlcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmFyIHByZXZTaXplID0gcmVmQ0lmRnJhbWUuZ2V0U2l6ZSgpO1xuXG5cbiAgLy9SZXNpemUgcHJvY2Vzc2luZyBzaG91bGQgYmUgb3ZlcnJpZGRlbiBkaXJlY3RseSByYXRoZXIgdGhhbiBhZG9wdGluZyBhIGRlY29yYXRvciBwYXR0ZXJuIGJlY2F1c2UgaXQgaGFzIGJldHRlciBwZXJmb3JtYW5jZS5cbiAgdmFyIHRtcExlZnQgPSBwYXJzZUludChyZWZDSWZGcmFtZS5odG1sRWxlbWVudC5zdHlsZS5sZWZ0LCAxMCk7XG4gIHZhciB0bXBUb3AgPSBwYXJzZUludChyZWZDSWZGcmFtZS5odG1sRWxlbWVudC5zdHlsZS50b3AsIDEwKTtcbiAgdmFyIHRtcFdpZHRoID0gcGFyc2VJbnQocmVmQ0lmRnJhbWUuaHRtbEVsZW1lbnQuc3R5bGUud2lkdGgsIDEwKTtcbiAgdmFyIHRtcEhlaWdodCA9IHBhcnNlSW50KHJlZkNJZkZyYW1lLmh0bWxFbGVtZW50LnN0eWxlLmhlaWdodCwgMTApO1xuXG4gIC8vSW1wb3J0YW50IGxvZ2ljIHRvIGhhbmRsZSB0aGUgbWluaW11bSBvZiBXaW5kb3cgd2VsbFxuICBpZiAoYnlVc2VyICYmICh0bXBXaWR0aCArIGRlbHRhV2lkdGggPCByZWZDSWZGcmFtZS5taW5GcmFtZVdpZHRoICYgZGVsdGFXaWR0aCA8IDApKSB7XG4gICAgLy9NaW5pbXVtIGFkanVzdG1lbnQgb2Ygd2lkdGhcbiAgICByZWZDSWZGcmFtZS5odG1sRWxlbWVudC5zdHlsZS53aWR0aCA9IHRtcFdpZHRoICsgJ3B4JztcbiAgICBkZWx0YVdpZHRoID0gMDtcbiAgfVxuXG4gIGlmIChieVVzZXIgJiYgKHRtcEhlaWdodCArIGRlbHRhSGVpZ2h0IDwgcmVmQ0lmRnJhbWUubWluV2luZG93SGVpZ2h0ICYgZGVsdGFIZWlnaHQgPCAwKSkge1xuICAgIC8vTWluaW11bSBhZGp1c3RtZW50IG9mIGhlaWdodFxuICAgIHJlZkNJZkZyYW1lLmh0bWxFbGVtZW50LnN0eWxlLmhlaWdodCA9IHRtcEhlaWdodCArICdweCc7XG4gICAgZGVsdGFIZWlnaHQgPSAwO1xuICB9XG4gIHJlZkNJZkZyYW1lLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQgPSAodG1wTGVmdCArIGRlbHRhTGVmdCkgKyAncHgnO1xuICByZWZDSWZGcmFtZS5odG1sRWxlbWVudC5zdHlsZS50b3AgPSAodG1wVG9wICsgZGVsdGFUb3ApICsgJ3B4JztcbiAgcmVmQ0lmRnJhbWUuaHRtbEVsZW1lbnQuc3R5bGUud2lkdGggPSAodG1wV2lkdGggKyBkZWx0YVdpZHRoKSArICdweCc7XG4gIHJlZkNJZkZyYW1lLmh0bWxFbGVtZW50LnN0eWxlLmhlaWdodCA9ICh0bXBIZWlnaHQgKyBkZWx0YUhlaWdodCkgKyAncHgnO1xuXG5cbiAgdmFyIHRtcENhbnZhc1dpZHRoID0gcGFyc2VJbnQocmVmQ0lmRnJhbWUuY2FudmFzLmNhbnZhc0VsZW1lbnQuc3R5bGUud2lkdGgsIDEwKTtcbiAgdmFyIHRtcENhbnZhc0hlaWdodCA9IHBhcnNlSW50KHJlZkNJZkZyYW1lLmNhbnZhcy5jYW52YXNFbGVtZW50LnN0eWxlLmhlaWdodCwgMTApO1xuXG4gIC8vU2luY2UgY2FudmFzRWxlbWVudCBpcyBhICgwLCAwKSByZWxhdGl2ZSBjb29yZGluYXRlIHdpdGggcmVzcGVjdFxuICAvLyB0byB0aGUgcGFyZW50IGVsZW1lbnQsIGl0IGlzIG5vdCBuZWNlc3NhcnkgdG8gY2hhbmdlIGxlZnQgYW5kIHRvcC5cbiAgcmVmQ0lmRnJhbWUuY2FudmFzLmNhbnZhc0VsZW1lbnQuc3R5bGUud2lkdGggPSAodG1wQ2FudmFzV2lkdGggKyBkZWx0YVdpZHRoKSArICdweCc7XG4gIHJlZkNJZkZyYW1lLmNhbnZhcy5jYW52YXNFbGVtZW50LnN0eWxlLmhlaWdodCA9ICh0bXBDYW52YXNIZWlnaHQgKyBkZWx0YUhlaWdodCkgKyAncHgnO1xuXG4gIC8vQ2hhbmdlIHRoZSBzaXplIG9mIHRoZSB0aXRsZSBiYXIuIFRpdGxlQWRqdXN0V2lkdGggZXRjLlxuICAvLyBUaGUgcmVhc29uIHdoeSB5b3UgZG8gbm90IGhhdmUgdG8gdXNlIHRpdGxlQWRqdXN0V2lkdGggaXNcbiAgLy8gYmVjYXVzZSB0aGVzZSBzY2FsaW5nIGFyZSBkb25lIHdpdGggZGlmZmVyZW5jZXMgKGRlbHRhWCwgZGVsdGFZKS5cbiAgLy9UaGVyZWZvcmUsIGlmIHlvdSBhZGp1c3Qgd2l0aCB0aGUgdGl0bGVBZGp1c3RXaWR0aFxuICAvLyBhcyB0aGUgaW5pdGlhbCB2YWx1ZSwgdGhlIG90aGVyIHdpbGwgc3RyZXRjaCByZWxhdGl2ZS5cbiAgcmVmQ0lmRnJhbWUudGl0bGVCYXIuc3R5bGUud2lkdGggPSAodG1wQ2FudmFzV2lkdGggLSByZWZDSWZGcmFtZS5pZkRlbHRhICsgZGVsdGFXaWR0aCArIDApICsgJ3B4JztcblxuICAvL0ltYWdlIHJlc2l6aW5nIGZvciBpZnJhbWUgdGhhdCBpcyB0aGUgY2hpbGQgZWxlbWVudCBvZiBjYW52YXNcbiAgcmVmQ0lmRnJhbWUuaWZyYW1lLndpZHRoID0gKHRtcENhbnZhc1dpZHRoIC0gcmVmQ0lmRnJhbWUuaWZEZWx0YSArIGRlbHRhV2lkdGggKyAwKSArICdweCc7XG4gIHJlZkNJZkZyYW1lLmlmcmFtZS5oZWlnaHQgPSAodG1wQ2FudmFzSGVpZ2h0IC0gcmVmQ0lmRnJhbWUuaWZEZWx0YSArIGRlbHRhSGVpZ2h0ICsgcmVmQ0lmRnJhbWUuZnJhbWVIZWlnaHRBZGp1c3QpICsgJ3B4JztcblxuICBpZiAocmVmQ0lmRnJhbWUub3ZlcnJheVRyYW5zcGFyZW50U2NyZWVuRW5hYmxlZCB8fCByZWZDSWZGcmFtZS5vdmVycmF5VHJhbnNwYXJlbnRTY3JlZW5PblJlc2l6ZSkge1xuICAgIC8vRGVwbG95IGEgdHJhbnNwYXJlbnQgc2NyZWVuLlxuICAgIHJlZkNJZkZyYW1lLnRyYW5zcGFyZW5jZS5zdHlsZS53aWR0aCA9IHBhcnNlSW50KHJlZkNJZkZyYW1lLmlmcmFtZS53aWR0aCkgKyAncHgnO1xuICAgIHJlZkNJZkZyYW1lLnRyYW5zcGFyZW5jZS5zdHlsZS5oZWlnaHQgPSBwYXJzZUludChyZWZDSWZGcmFtZS5pZnJhbWUuaGVpZ2h0KSArICdweCc7XG4gIH1cblxuICAvL21vdmUgZnJhbWVDb21wb25lbnQobGlrZSBjbG9zZUJ1dHRvbikgY29ycmVzcG9uZGluZyB0byBtb3Zpbmcgd2luZG93IGVkZ2UgZm9yIHJlc2l6ZVxuICBmb3IgKHZhciBmcmFtZUNvbXBvbmVudElkIGluIHJlZkNJZkZyYW1lLmZyYW1lQ29tcG9uZW50TWFwKSB7XG4gICAgdmFyIGZyYW1lQ29tcG9uZW50ID0gcmVmQ0lmRnJhbWUuZnJhbWVDb21wb25lbnRNYXBbZnJhbWVDb21wb25lbnRJZF07XG4gICAgLy91cGRhdGUgYWxpZ25tZW50IG9mIGZyYW1lQ29tcG9uZW50IGNvcnJlc3BvbmRpbmcgdG8gbW92aW5nIHdpbmRvdyBlZGdlIGZvciByZXNpemVcbiAgICBmcmFtZUNvbXBvbmVudC51cGRhdGVBbGlnbigpO1xuICB9XG5cblxuICBmb3IgKHZhciBiZWFuTmFtZSBpbiByZWZDSWZGcmFtZS5jYW52YXMuYmVhbkxpc3QpIHtcbiAgICB2YXIgdG1wQmVhbiA9IHJlZkNJZkZyYW1lLmNhbnZhcy5iZWFuTGlzdFtiZWFuTmFtZV07XG5cbiAgICBpZiAodG1wQmVhbi5odG1sRWxlbWVudC50eXBlTmFtZSA9PSAnY21hcmtlcndpbmRvdycpIHtcblxuICAgICAgaWYgKHRtcEJlYW4uaHRtbEVsZW1lbnQudXNhZ2UgPT0gJ1JEJykge1xuICAgICAgICB0bXBCZWFuLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQgPSAocGFyc2VJbnQodG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS5sZWZ0KSArIGRlbHRhV2lkdGgpICsgJ3B4JztcbiAgICAgICAgdG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS50b3AgPSAocGFyc2VJbnQodG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS50b3ApICsgZGVsdGFIZWlnaHQpICsgJ3B4JztcbiAgICAgIH0gZWxzZSBpZiAodG1wQmVhbi5odG1sRWxlbWVudC51c2FnZSA9PSAnREQnKSB7XG4gICAgICAgIHRtcEJlYW4uaHRtbEVsZW1lbnQuc3R5bGUud2lkdGggPSAocGFyc2VJbnQodG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS53aWR0aCkgKyBkZWx0YVdpZHRoKSArICdweCc7XG4gICAgICAgIHRtcEJlYW4uaHRtbEVsZW1lbnQuc3R5bGUudG9wID0gKHBhcnNlSW50KHRtcEJlYW4uaHRtbEVsZW1lbnQuc3R5bGUudG9wKSArIGRlbHRhSGVpZ2h0KSArICdweCc7XG4gICAgICB9IGVsc2UgaWYgKHRtcEJlYW4uaHRtbEVsZW1lbnQudXNhZ2UgPT0gJ1JSJykge1xuICAgICAgICB0bXBCZWFuLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQgPSAocGFyc2VJbnQodG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS5sZWZ0KSArIGRlbHRhV2lkdGgpICsgJ3B4JztcbiAgICAgICAgdG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS5oZWlnaHQgPSAocGFyc2VJbnQodG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS5oZWlnaHQpICsgZGVsdGFIZWlnaHQpICsgJ3B4JztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgY3JyU2l6ZSA9IHJlZkNJZkZyYW1lLmdldFNpemUoKTtcbiAgaWYgKHByZXZTaXplLndpZHRoICE9PSBjcnJTaXplLndpZHRoIHx8IHByZXZTaXplLmhlaWdodCAhPT0gY3JyU2l6ZS5oZWlnaHQpIHtcbiAgICByZWZDSWZGcmFtZS5ldmVudEVtaXR0ZXIuZW1pdCgncmVzaXplJywgcmVmQ0lmRnJhbWUuX2dldEN1cnJlbnRTaXplUG9zKCkpO1xuICB9XG5cblxufTsvL3Jlc2l6ZVxuXG5DSWZGcmFtZS5wcm90b3R5cGUuX2dldEN1cnJlbnRTaXplUG9zID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHZhciBjcnJTaXplID0gbWUuZ2V0U2l6ZSgpO1xuICB2YXIgY3JyUG9zID0gbWUuZ2V0UG9zaXRpb24oKTtcbiAgcmV0dXJuIHsgdGFyZ2V0OiBtZSwgcG9zOiBjcnJQb3MsIHNpemU6IGNyclNpemUgfTtcbn07XG5cbkNJZkZyYW1lLnByb3RvdHlwZS5yZXNpemVEaXJlY3QgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0LCBieVVzZXIpIHtcblxuICB2YXIgcmVmQ0lmRnJhbWUgPSB0aGlzO1xuXG5cbiAgaWYgKCFyZWZDSWZGcmFtZS5yZXNpemFibGUgJiYgYnlVc2VyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZWZDSWZGcmFtZS5odG1sRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgcmVmQ0lmRnJhbWUuaHRtbEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcblxuXG4gIHZhciB0bXBDYW52YXNXaWR0aCA9IHBhcnNlSW50KHJlZkNJZkZyYW1lLmNhbnZhcy5jYW52YXNFbGVtZW50LnN0eWxlLndpZHRoKTtcbiAgdmFyIHRtcENhbnZhc0hlaWdodCA9IHBhcnNlSW50KHJlZkNJZkZyYW1lLmNhbnZhcy5jYW52YXNFbGVtZW50LnN0eWxlLmhlaWdodCk7XG5cbiAgLy9TaW5jZSBjYW52YXNFbGVtZW50IGlzIGEgKDAsIDApIHJlbGF0aXZlIGNvb3JkaW5hdGUgd2l0aCByZXNwZWN0XG4gIC8vIHRvIHRoZSBwYXJlbnQgZWxlbWVudCwgaXQgaXMgbm90IG5lY2Vzc2FyeSB0byBjaGFuZ2UgbGVmdCBhbmQgdG9wLlxuICByZWZDSWZGcmFtZS5jYW52YXMuY2FudmFzRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgcmVmQ0lmRnJhbWUuY2FudmFzLmNhbnZhc0VsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gKGhlaWdodCAtIHJlZkNJZkZyYW1lLnRpdGxlQmFyLnN0eWxlLmhlaWdodCkgKyAncHgnO1xuXG4gIC8vQ2hhbmdlIHRoZSBzaXplIG9mIHRoZSB0aXRsZSBiYXIuIFRpdGxlQWRqdXN0V2lkdGggZXRjLlxuICAvLyBUaGUgcmVhc29uIHdoeSB5b3UgZG8gbm90IGhhdmUgdG8gdXNlIHRpdGxlQWRqdXN0V2lkdGggaXNcbiAgLy8gYmVjYXVzZSB0aGVzZSBzY2FsaW5nIGFyZSBkb25lIHdpdGggZGlmZmVyZW5jZXMgKGRlbHRhWCwgZGVsdGFZKS5cbiAgLy9UaGVyZWZvcmUsIGlmIHlvdSBhZGp1c3Qgd2l0aCB0aGUgdGl0bGVBZGp1c3RXaWR0aFxuICAvLyBhcyB0aGUgaW5pdGlhbCB2YWx1ZSwgdGhlIG90aGVyIHdpbGwgc3RyZXRjaCByZWxhdGl2ZS5cbiAgcmVmQ0lmRnJhbWUudGl0bGVCYXIuc3R5bGUud2lkdGggPSAod2lkdGggLSByZWZDSWZGcmFtZS5pZkRlbHRhKSArICdweCc7XG5cbiAgLy9JbWFnZSByZXNpemluZyBmb3IgaWZyYW1lIHRoYXQgaXMgdGhlIGNoaWxkIGVsZW1lbnQgb2YgY2FudmFzXG4gIHJlZkNJZkZyYW1lLmlmcmFtZS53aWR0aCA9IHdpZHRoIC0gcmVmQ0lmRnJhbWUuaWZEZWx0YSArICdweCc7XG4gIHJlZkNJZkZyYW1lLmlmcmFtZS5oZWlnaHQgPSBoZWlnaHQgLSByZWZDSWZGcmFtZS5pZkRlbHRhICsgcmVmQ0lmRnJhbWUuZnJhbWVIZWlnaHRBZGp1c3QgKyAncHgnO1xuXG5cbiAgaWYgKHJlZkNJZkZyYW1lLm92ZXJyYXlUcmFuc3BhcmVudFNjcmVlbkVuYWJsZWQgfHwgcmVmQ0lmRnJhbWUub3ZlcnJheVRyYW5zcGFyZW50U2NyZWVuT25SZXNpemUpIHtcbiAgICAvL0RlcGxveSBhIHRyYW5zcGFyZW50IHNjcmVlbi5cbiAgICByZWZDSWZGcmFtZS50cmFuc3BhcmVuY2Uuc3R5bGUud2lkdGggPSBwYXJzZUludChyZWZDSWZGcmFtZS5pZnJhbWUud2lkdGgpICsgJ3B4JztcbiAgICByZWZDSWZGcmFtZS50cmFuc3BhcmVuY2Uuc3R5bGUuaGVpZ2h0ID0gcGFyc2VJbnQocmVmQ0lmRnJhbWUuaWZyYW1lLmhlaWdodCkgKyAncHgnO1xuICB9XG5cbiAgLy9tb3ZlIGZyYW1lQ29tcG9uZW50KGxpa2UgY2xvc2VCdXR0b24pIGNvcnJlc3BvbmRpbmcgdG8gbW92aW5nIHdpbmRvdyBlZGdlIGZvciByZXNpemVcbiAgZm9yICh2YXIgZnJhbWVDb21wb25lbnRJZCBpbiByZWZDSWZGcmFtZS5mcmFtZUNvbXBvbmVudE1hcCkge1xuICAgIHZhciBmcmFtZUNvbXBvbmVudCA9IHJlZkNJZkZyYW1lLmZyYW1lQ29tcG9uZW50TWFwW2ZyYW1lQ29tcG9uZW50SWRdO1xuICAgIC8vdXBkYXRlIGFsaWdubWVudCBvZiBmcmFtZUNvbXBvbmVudCBjb3JyZXNwb25kaW5nIHRvIG1vdmluZyB3aW5kb3cgZWRnZSBmb3IgcmVzaXplXG4gICAgZnJhbWVDb21wb25lbnQudXBkYXRlQWxpZ24oKTtcbiAgfVxuXG5cbiAgZm9yICh2YXIgYmVhbk5hbWUgaW4gcmVmQ0lmRnJhbWUuY2FudmFzLmJlYW5MaXN0KSB7XG4gICAgdmFyIHRtcEJlYW4gPSByZWZDSWZGcmFtZS5jYW52YXMuYmVhbkxpc3RbYmVhbk5hbWVdO1xuXG4gICAgaWYgKHRtcEJlYW4uaHRtbEVsZW1lbnQudHlwZU5hbWUgPT0gJ2NtYXJrZXJ3aW5kb3cnKSB7XG5cbiAgICAgIGlmICh0bXBCZWFuLmh0bWxFbGVtZW50LnVzYWdlID09ICdSRCcpIHtcbiAgICAgICAgdG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS5sZWZ0ID0gd2lkdGggKyAncHgnOy8vIHBhcnNlSW50KHRtcEJlYW4uaHRtbEVsZW1lbnQuc3R5bGUubGVmdCkgKyBkZWx0YVdpZHRoICsgJ3B4JztcbiAgICAgICAgdG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS50b3AgPSBoZWlnaHQgKyAncHgnOy8vcGFyc2VJbnQodG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS50b3ApICsgZGVsdGFIZWlnaHQgKyAncHgnO1xuICAgICAgfSBlbHNlIGlmICh0bXBCZWFuLmh0bWxFbGVtZW50LnVzYWdlID09ICdERCcpIHtcbiAgICAgICAgdG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICAgICAgdG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS50b3AgPSBoZWlnaHQgKyAncHgnOy8vaGVpZ2h0cGFyc2VJbnQodG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS50b3ApICsgZGVsdGFIZWlnaHQgKyAncHgnO1xuICAgICAgfSBlbHNlIGlmICh0bXBCZWFuLmh0bWxFbGVtZW50LnVzYWdlID09ICdSUicpIHtcbiAgICAgICAgdG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS5sZWZ0ID0gd2lkdGggKyAncHgnOy8vK3BhcnNlSW50KHRtcEJlYW4uaHRtbEVsZW1lbnQuc3R5bGUubGVmdCkgKyBkZWx0YVdpZHRoICsgJ3B4JztcbiAgICAgICAgdG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTsvL3Jlc2l6ZVxuXG4vKipcbiAqIEZvY3VzIG9uIHRoaXMgZnJhbWVcbiAqL1xuQ0lmRnJhbWUucHJvdG90eXBlLnJlcXVlc3RGb2N1cyA9IGZ1bmN0aW9uKCkge1xuXG5cbiAgdmFyIG1lID0gdGhpcztcblxuICB2YXIgYmVhbkxpc3QgPSBtZS5wYXJlbnRDYW52YXMuYmVhbkxpc3Q7XG5cbiAgZm9yICh2YXIgd2luZG93SWQgaW4gYmVhbkxpc3QpIHtcblxuICAgIHZhciB0bXBJZldpbmRvdyA9IGJlYW5MaXN0W3dpbmRvd0lkXTtcblxuICAgIC8vSWYgaXQncyBteSBvd24gd2luZG93LCBtaW5pbWl6ZSB0aGUgdHJhbnNwYXJlbnQgc2NyZWVuIGFuZCBjaGFuZ2UgdGhlIGNvbG9yIG9mIHRoZSB0aXRsZSBiYXIuXG4gICAgaWYgKHdpbmRvd0lkID09IG1lLmdldFdpbmRvd0lkKCkpIHtcblxuICAgICAgLy9pZiB0aGlzIGZyYW1lIGlzIGEgdGFyZ2V0IGZyYW1lXG4gICAgICB0bXBJZldpbmRvdy5oYW5kbGVUYWtpbmdGb2N1cygpO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8vaWYgdGhpcyBmcmFtZSBpcyBOT1QgYSB0YXJnZXQgZnJhbWVcbiAgICAgIHRtcElmV2luZG93LmhhbmRsZVJlbGVhc2luZ0ZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgbWUucGFyZW50Q2FudmFzLnB1bGxVcChtZS5pZCk7XG5cbn07XG5cbi8qKlxuICogVVJMIGZvciBpZnJhbWVcbiAqIEBwYXJhbSB1cmxcbiAqL1xuQ0lmRnJhbWUucHJvdG90eXBlLnNldFVybCA9IGZ1bmN0aW9uKHVybCkge1xuXG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG5cbiAgICBpZiAodXJsKSB7XG4gICAgICBtZS5zZXRVc2VJZnJhbWUodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lLnNldFVzZUlmcmFtZShmYWxzZSk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfVxuXG5cbiAgICBtZS5pZnJhbWUuc3JjID0gdXJsO1xuXG4gICAgbWUuaWZyYW1lLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGZ1bmNPbk1vdXNlTW92ZSA9IGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICB2YXIgY2xpZW50WCA9IGUucGFnZVg7XG4gICAgICAgIHZhciBjbGllbnRZID0gZS5wYWdlWTtcblxuICAgICAgICBpZiAoVE9VQ0hfRU5BQkxFRCkge1xuICAgICAgICAgIGlmIChlLnR5cGUgPT09ICd0b3VjaG1vdmUnKSB7XG4gICAgICAgICAgICB2YXIgY2hhbmdlZFRvdWNoZXMgPSBlLmNoYW5nZWRUb3VjaGVzO1xuICAgICAgICAgICAgaWYgKFRPVUNIX01PVkVfT05MWV9XSVRIX09ORV9GSU5HRVIpIHtcbiAgICAgICAgICAgICAgdmFyIHRvdWNoZXMgPSBlLnRvdWNoZXM7XG4gICAgICAgICAgICAgIGlmICh0b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGNsaWVudFggPSBjaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcbiAgICAgICAgICAgICAgICBjbGllbnRZID0gY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNsaWVudFggPSBjaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcbiAgICAgICAgICAgICAgY2xpZW50WSA9IGNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgZnJhbWVMZWZ0ID0gbWUuZ2V0TGVmdCgpO1xuICAgICAgICB2YXIgZnJhbWVUb3AgPSBtZS5nZXRUb3AoKTtcbiAgICAgICAgdmFyIGV2ZW50RnJvbUlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50cycpO1xuICAgICAgICAvLyBQcm9jZXNzaW5nIHRvIG1ha2UgaXQgbG9vayBsaWtlIG1vdXNlIG1vdmUgZXZlbiBpZiB5b3UgYXJlIG1vdmluZyBieSB0b3VjaFxuICAgICAgICBldmVudEZyb21JZnJhbWUuaW5pdE1vdXNlRXZlbnQoJ21vdXNlbW92ZScsIHRydWUsIGZhbHNlLCB3aW5kb3csIGUuZGV0YWlsLCBlLnNjcmVlblgsIGUuc2NyZWVuWSwgKGNsaWVudFggKyBmcmFtZUxlZnQpLCAoY2xpZW50WSArIGZyYW1lVG9wKSxcbiAgICAgICAgICBlLmN0cmxLZXksIGUuYWx0S2V5LCBlLnNoaWZ0S2V5LCBlLm1ldGFLZXksIGUuYnV0dG9uLCBudWxsKTtcblxuICAgICAgICAvL3Ntb290aCBkcmFnZ2luZyBkdXJpbmcgaWZyYW1lIG1vZGVcbiAgICAgICAgbWUucGFyZW50Q2FudmFzLndpbmRvd01vdXNlTW92ZShldmVudEZyb21JZnJhbWUpO1xuXG4gICAgICAgIGlmIChtZS5vbk1vdXNlTW92ZU9uSWZyYW1lKSB7XG4gICAgICAgICAgbWUub25Nb3VzZU1vdmVPbklmcmFtZShldmVudEZyb21JZnJhbWUpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgbWUuaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQub25tb3VzZW1vdmUgPSBmdW5jT25Nb3VzZU1vdmU7XG4gICAgICBtZS5pZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5vbnRvdWNobW92ZSA9IGZ1bmNPbk1vdXNlTW92ZTtcblxuXG4gICAgICAvL21vdXNlIHVwXG4gICAgICB2YXIgZnVuY09uTW91c2VVcCA9IGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICB2YXIgY2xpZW50WCA9IGUucGFnZVg7XG4gICAgICAgIHZhciBjbGllbnRZID0gZS5wYWdlWTtcblxuICAgICAgICBpZiAoVE9VQ0hfRU5BQkxFRCkge1xuICAgICAgICAgIGlmIChlLnR5cGUgPT09ICd0b3VjaGVuZCcpIHtcbiAgICAgICAgICAgIHZhciBjaGFuZ2VkVG91Y2hlcyA9IGUuY2hhbmdlZFRvdWNoZXM7XG4gICAgICAgICAgICBjbGllbnRYID0gY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVg7XG4gICAgICAgICAgICBjbGllbnRZID0gY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBmcmFtZUxlZnQgPSBtZS5nZXRMZWZ0KCk7XG4gICAgICAgIHZhciBmcmFtZVRvcCA9IG1lLmdldFRvcCgpO1xuICAgICAgICB2YXIgZXZlbnRGcm9tSWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnRzJyk7XG4gICAgICAgIC8vIFByb2Nlc3NpbmcgdG8gbWFrZSBpdCBsb29rIGxpa2UgbW91c2UgdXAgZXZlbiBpZiB5b3UgbW91c2V1cCBieSB0b3VjaFxuICAgICAgICBldmVudEZyb21JZnJhbWUuaW5pdE1vdXNlRXZlbnQoJ21vdXNldXAnLCB0cnVlLCBmYWxzZSwgd2luZG93LCBlLmRldGFpbCwgZS5zY3JlZW5YLCBlLnNjcmVlblksIChjbGllbnRYICsgZnJhbWVMZWZ0KSwgKGNsaWVudFkgKyBmcmFtZVRvcCksXG4gICAgICAgICAgZS5jdHJsS2V5LCBlLmFsdEtleSwgZS5zaGlmdEtleSwgZS5tZXRhS2V5LCBlLmJ1dHRvbiwgbnVsbCk7XG5cbiAgICAgICAgLy9zbW9vdGggZHJhZ2dpbmcgZHVyaW5nIGlmcmFtZSBtb2RlXG4gICAgICAgIG1lLnBhcmVudENhbnZhcy53aW5kb3dNb3VzZVVwKGV2ZW50RnJvbUlmcmFtZSk7XG5cbiAgICAgICAgaWYgKG1lLm9uTW91c2VVcE9uSWZyYW1lKSB7XG4gICAgICAgICAgbWUub25Nb3VzZVVwT25JZnJhbWUoZXZlbnRGcm9tSWZyYW1lKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIG1lLmlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50Lm9ubW91c2V1cCA9IGZ1bmNPbk1vdXNlVXA7XG4gICAgICBtZS5pZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5vbnRvdWNoZW5kID0gZnVuY09uTW91c2VVcDtcblxuICAgICAgcmVzb2x2ZShtZSwgbWUuaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQpO1xuICAgIH07XG4gIH0pO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgRE9NLWRvY3VtZW50IG9mIGlmcmFtZVxuICogQHJldHVybnMgeyp8SFRNTERvY3VtZW50fVxuICovXG5DSWZGcmFtZS5wcm90b3R5cGUuZ2V0SWZEb2N1bWVudCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICByZXR1cm4gbWUuaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG59O1xuXG5cbkNJZkZyYW1lLnByb3RvdHlwZS5zZXRTY3JvbGxpbmcgPSBmdW5jdGlvbihzdHIpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgbWUuaWZyYW1lLnNjcm9sbGluZyA9IHN0cjtcbn07XG5cbkNJZkZyYW1lLnByb3RvdHlwZS5nZXRTY3JvbGxpbmcgPSBmdW5jdGlvbihzdHIpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgcmV0dXJuIG1lLmlmcmFtZS5zY3JvbGxpbmc7XG59O1xuXG5cbkNJZkZyYW1lLnByb3RvdHlwZS5zZXRSZXNpemFibGUgPSBmdW5jdGlvbihlbmFibGVkKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIG1lLnJlc2l6YWJsZSA9IGVuYWJsZWQ7XG4gIG1lLmVuYWJsZU1hcmtlcnMoZW5hYmxlZCk7XG4gIHJldHVybiBtZTtcbn07XG5cblxuQ0lmRnJhbWUucHJvdG90eXBlLnNldENvbnRyb2wgPSBmdW5jdGlvbihtb2RlbCkge1xuICB2YXIgbWUgPSB0aGlzO1xuXG4gIGlmIChtb2RlbCkge1xuICAgIG1vZGVsLmZyYW1lID0gbWU7XG4gICAgbWUuY29udHJvbCA9IG1lLmpzRnJhbWUuY3JlYXRlV2luZG93RXZlbnRIZWxwZXIobW9kZWwpO1xuICAgIG1lLmNvbnRyb2wuc2V0dXBEZWZhdWx0RXZlbnRzKCk7XG4gIH1cblxufTtcblxuLyoqXG4gKiBlbmQgb2YgQ0lGcmFtZSBjbGFzc1xuICovXG5cbi8vKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLVxuXG5cbmluaGVyaXQoQ1dpbmRvd01hbmFnZXIsIENDYW52YXMpO1xuXG4vKipcbiAqIENXaW5kb3dNYW5hZ2VyIGNsYXNzXG4gKiA8cD5cbiAqIEEgY2FudmFzIGNsYXNzIHRoYXQgZGlzcGxheXMgbXVsdGlwbGUgZnJhbWVzLiBIYW5kbGUgZXZlbnRzIG9uIHRoZSB3aW5kb3cgdG8gY29vcmRpbmF0ZSBtdWx0aXBsZSB3aW5kb3dzPGJyPlxuICpcbiAqIEBwYXJhbSBwYXJlbnRFbGVtZW50XG4gKiBAcGFyYW0gY2FudmFzSWRcbiAqIEBwYXJhbSBsZWZ0XG4gKiBAcGFyYW0gdG9wXG4gKiBAcGFyYW0gd2lkdGhcbiAqIEBwYXJhbSBoZWlnaHRcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDV2luZG93TWFuYWdlcihwYXJlbnRFbGVtZW50LCBjYW52YXNJZCwgbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0KSB7XG4gIENXaW5kb3dNYW5hZ2VyLnN1cGVyQ29uc3RydWN0b3IuY2FsbCh0aGlzLCBwYXJlbnRFbGVtZW50LCBjYW52YXNJZCwgbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0KTtcbiAgdmFyIG1lID0gdGhpcztcbiAgLy8gZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2dCkge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2dCkge1xuICAgIGZvciAodmFyIHdpbmRvd0lkIGluIG1lLmJlYW5MaXN0KSB7XG4gICAgICB2YXIgYmVhbkZyYW1lID0gbWUuYmVhbkxpc3Rbd2luZG93SWRdO1xuICAgICAgYmVhbkZyYW1lLm9uQm9keUNsaWNrZWQoZXZ0KTtcbiAgICB9XG4gIH0pO1xuXG59XG5cbkNXaW5kb3dNYW5hZ2VyLnByb3RvdHlwZS5nZXRXaW5kb3cgPSBmdW5jdGlvbih3aW5kb3dJZCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICByZXR1cm4gbWUuYmVhbkxpc3Rbd2luZG93SWRdO1xufTtcblxuLy9XcmFwcGluZyB0aGUgJ2FkZEJlYW4nIG9mIHRoZSBwYXJlbnQgY2xhc3NcbkNXaW5kb3dNYW5hZ2VyLnByb3RvdHlwZS5hZGRXaW5kb3cgPSBmdW5jdGlvbih3aW5kb3cpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICB2YXIgd2luZG93SWQgPSB3aW5kb3cuZ2V0V2luZG93SWQoKTtcbiAgdmFyIG5hbWUgPSB3aW5kb3cuZ2V0TmFtZSgpO1xuICBtZS5iZWFuSWROYW1lW3dpbmRvd0lkXSA9IG5hbWU7XG4gIG1lLmJlYW5OYW1lSWRbbmFtZV0gPSB3aW5kb3dJZDtcblxuICBtZS5hZGRCZWFuKHdpbmRvdyk7XG59O1xuXG4vL2lmIGNvbnRhaW5zIHdpbmRvdyBuYW1lZCBzcGVjaWZpZWQgbmFtZVxuQ1dpbmRvd01hbmFnZXIucHJvdG90eXBlLmNvbnRhaW5zV2luZG93TmFtZSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuXG4gIHZhciB3aW5kb3dJZCA9IG1lLmJlYW5OYW1lSWRbbmFtZV07XG5cbiAgaWYgKHdpbmRvd0lkKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuQ1dpbmRvd01hbmFnZXIucHJvdG90eXBlLmdldFdpbmRvd0J5TmFtZSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgdmFyIHdpbmRvd0lkID0gbWUuYmVhbk5hbWVJZFtuYW1lXTtcblxuICBpZiAod2luZG93SWQpIHtcbiAgICByZXR1cm4gbWUuZ2V0V2luZG93KHdpbmRvd0lkKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuLy9XcmFwcGluZyB0aGUgJ21vdXNlTW92ZScgbWV0aG9kIG9mIHRoZSBwYXJlbnQgY2xhc3NcbkNXaW5kb3dNYW5hZ2VyLnByb3RvdHlwZS53aW5kb3dNb3VzZU1vdmUgPSBmdW5jdGlvbihlKSB7XG5cbiAgdmFyIG1lID0gdGhpcztcbiAgaWYgKG1lLmN1cnJlbnRPYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmFyIGNoaWxkV2luZG93TW92ZWQgPSBmYWxzZTtcblxuICAvL0xvb3AgcHJvY2Vzc2luZyBvZiBlYWNoIENXaW5kb3cgaGVsZCBieSBDV2luZG93TWFuYWdlclxuICB2YXIgYmVhbkxpc3QgPSBtZS5iZWFuTGlzdDtcblxuICBmb3IgKHZhciB3aW5kb3dJZCBpbiBiZWFuTGlzdCkge1xuXG4gICAgdmFyIHRhcmdldFdpbmRvdyA9IGJlYW5MaXN0W3dpbmRvd0lkXTtcblxuXG4gICAgLy9TaW5jZSB0aGlzICdtb3VzZU1vdmUnIGlzIGNhbnZhcyBvZiBDV2luZG93J3MgJ21vdXNlTW92ZScsc28gZG8gbW92ZSBDQmVhbkZyYW1lcyBpbiB0aGUgY2FudmFzLlxuICAgIHZhciBldmVudERhdGEgPSB0YXJnZXRXaW5kb3cuY2FudmFzLm1vdXNlTW92ZShlKTtcblxuICAgIC8vV2hldGhlciBhbnkgb25lIG9mIHRoZSBiZWFucyBpbiB0aGUgQ2FudmFzIGhhcyBtb3ZlZCBvciBub3QuXG4gICAgLy9ZZXMuKFdoZW4gaXQgbW92ZXMpLCBldmVudERhdGEgaXMgc2V0LlxuICAgIC8vTk8uIElmIGl0IGRvZXMgbm90IG1vdmUgaXQgaXMgc2V0IHRvIG51bGwuXG4gICAgY2hpbGRXaW5kb3dNb3ZlZCA9IGNoaWxkV2luZG93TW92ZWQgfCAoZXZlbnREYXRhICE9IG51bGwpO1xuICAgIGlmIChldmVudERhdGEgIT0gbnVsbCkge1xuXG4gICAgICAvL0lmIGl0IGlzIHRoZSBtYXJrZXIgZm9yIHJlc2l6aW5nXG4gICAgICBpZiAoZXZlbnREYXRhLnRhcmdldFR5cGVOYW1lID09ICdjbWFya2Vyd2luZG93Jykge1xuXG4gICAgICAgIHZhciB0YXJnZXRPYmplY3QgPSBldmVudERhdGEudGFyZ2V0T2JqZWN0O1xuXG4gICAgICAgIC8vRW5hYmxlIHRyYW5zcGFyZW50IHdpbmRvdyBvbmx5IHdoZW4gbW92aW5nLlxuICAgICAgICAvL1RoaXMgd2lsbCB3b3JrIHNtb290aGx5IGV2ZW4gd2l0aCBpZnJhbWUgY29udGVudFxuICAgICAgICB0YXJnZXRXaW5kb3cudHJhbnNwYXJlbmNlLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG5cbiAgICAgICAgaWYgKHRhcmdldE9iamVjdC51c2FnZSA9PSAnUkQnKSB7XG4gICAgICAgICAgdGFyZ2V0V2luZG93LnJlc2l6ZSgwLCAwLCBldmVudERhdGEuZGVsdGFYLCBldmVudERhdGEuZGVsdGFZLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXRPYmplY3QudXNhZ2UgPT0gJ0REJykge1xuICAgICAgICAgIHRhcmdldFdpbmRvdy5yZXNpemUoMCwgMCwgMCwgZXZlbnREYXRhLmRlbHRhWSwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0T2JqZWN0LnVzYWdlID09ICdSUicpIHtcbiAgICAgICAgICB0YXJnZXRXaW5kb3cucmVzaXplKDAsIDAsIGV2ZW50RGF0YS5kZWx0YVgsIDAsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvL0lmIGFueSBvbmUgb2YgdGhlIGJlYW5zIGluIHRoZSBDYW52YXMgaGFzIG1vdmVkLkRvIG5vdCBkbyAnQ3dpbmRvdydzIG1vdXNlTW92ZSdcbiAgaWYgKCFjaGlsZFdpbmRvd01vdmVkICYmIHRoaXMubW91c2VEb3duU291cmNlICE9ICdjaGlsZGNhbnZhcycpIHtcblxuICAgIC8vTW92aW5nIGxvZ2ljIGZvciBDV2luZG93IHdoaWNoIGlzIGhvbGRlZCBieSBDV2luZG93TWFuYWdlciBhcyBhIGNoaWxkIHdpbmRvdy5cbiAgICBtZS5tb3VzZU1vdmUoZSk7XG4gIH1cblxufTtcblxuLy9XcmFwcGluZyB0aGUgbWV0aG9kICdtb3VzZVVwJyBvZiB0aGUgcGFyZW50IGNsYXNzXG5DV2luZG93TWFuYWdlci5wcm90b3R5cGUud2luZG93TW91c2VVcCA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICAvL3J1biAnbW91c2VVcCcgb2YgcGFyZW50IGNsYXNzXG4gIG1lLm1vdXNlVXAoZSk7XG5cbiAgdmFyIGJlYW5MaXN0ID0gbWUuYmVhbkxpc3Q7XG5cbiAgZm9yICh2YXIgd2luZG93SWQgaW4gYmVhbkxpc3QpIHtcblxuICAgIHZhciBvYmpXaW5kb3cgPSBiZWFuTGlzdFt3aW5kb3dJZF07XG5cbiAgICAvL3J1biBDV2luZG93J3MgJ21vdXNlVXAnKGl0J3MgY2hpbGQgd2luZG93KS5cbiAgICBvYmpXaW5kb3cubW91c2VVcChlKTtcbiAgfVxuXG59O1xuXG4vKipcbiAqIChvdmVycmlkZSBDQ2FudmFzLnJlbW92ZUJlYW4pXG4gKiBAcGFyYW0gd2luZG93SWRcbiAqL1xuQ1dpbmRvd01hbmFnZXIucHJvdG90eXBlLnJlbW92ZUJlYW4gPSBmdW5jdGlvbih3aW5kb3dJZCkge1xuXG5cbiAgdmFyIG1lID0gdGhpcztcblxuICAvL1JldHJpZXZlIHRoZSB0YXJnZXQgYmVhbkZyYW1lXG4gIHZhciBiZWFuTGlzdCA9IG1lLmJlYW5MaXN0O1xuICB2YXIgdGFyZ2V0QmVhbiA9IGJlYW5MaXN0W3dpbmRvd0lkXTtcblxuICBpZiAodGFyZ2V0QmVhbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHJlbW92ZVRhcmdldEJlYW5IYXNGb2N1cyA9IHRhcmdldEJlYW4uX2hhc0ZvY3VzO1xuXG5cbiAgLy9SZW1vdmUgYmVhbidzIGh0bWxFbGVtZW50IGZyb20gY2FudmFzRWxlbWVudFxuICBtZS5jYW52YXNFbGVtZW50LnJlbW92ZUNoaWxkKHRhcmdldEJlYW4uaHRtbEVsZW1lbnQpO1xuXG4gIC8vRGVsZXRlIHRoZSBiZWFuIG9iamVjdCBpbiB0aGUgYXNzb2NpYXRpdmUgYXJyYXkuXG4gIGRlbGV0ZSBiZWFuTGlzdFt3aW5kb3dJZF07XG5cblxuICB2YXIgYmVhbk5hbWUgPSBtZS5iZWFuSWROYW1lW3dpbmRvd0lkXTtcbiAgaWYgKGJlYW5OYW1lKSB7XG4gICAgLy8taWYgYmVhbiBuYW1lIGV4aXN0XG4gICAgZGVsZXRlIG1lLmJlYW5JZE5hbWVbd2luZG93SWRdO1xuICAgIGRlbGV0ZSBtZS5iZWFuTmFtZUlkW2JlYW5OYW1lXTtcbiAgfVxuXG5cbiAgLy9mb2N1cyBvbiBsYXN0IGZvY3VzZWQgd2luZG93IGFmdGVyIHJlbW92aW5nXG4gIHZhciBtYXhGb2N1c1RpbWUgPSAwO1xuICB2YXIgbGFzdEZvY3VzZWRGcmFtZSA9IG51bGw7XG5cbiAgaWYgKHJlbW92ZVRhcmdldEJlYW5IYXNGb2N1cykge1xuICAgIGZvciAodmFyIHdpbmRvd0lkIGluIGJlYW5MaXN0KSB7XG4gICAgICB2YXIgZnJhbWUgPSBiZWFuTGlzdFt3aW5kb3dJZF07XG5cbiAgICAgIC8vcHVsbFVwRGlzYWJsZWQ9dHJ1ZSBtZWFucyB0aGF0IHRoZSBmcmFtZSBpcyBtb2RhbCBiYWNrZ3JvdW5kIHdpbmRvd1xuICAgICAgaWYgKG1heEZvY3VzVGltZSA8PSBmcmFtZS5faGFzRm9jdXNUaW1lICYmICFmcmFtZS5wdWxsVXBEaXNhYmxlZCkge1xuXG4gICAgICAgIG1heEZvY3VzVGltZSA9IGZyYW1lLl9oYXNGb2N1c1RpbWU7XG5cbiAgICAgICAgbGFzdEZvY3VzZWRGcmFtZSA9IGZyYW1lO1xuXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChsYXN0Rm9jdXNlZEZyYW1lKSB7XG4gICAgICBsYXN0Rm9jdXNlZEZyYW1lLnJlcXVlc3RGb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHRhcmdldEJlYW4ucGFyZW50Q2FudmFzID0gbnVsbDtcblxufTtcbi8qKlxuICogZW5kIG9mIENXaW5kb3dNYW5hZ2VyIGNsYXNzXG4gKi9cblxuLy8rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstXG5cbmluaGVyaXQoQ01hcmtlcldpbmRvdywgQ0JlYW5GcmFtZSk7XG5cbi8qKlxuICogQ01hcmtlcldpbmRvdyBjbGFzc1xuICogQHBhcmFtIHdpbmRvd0lkXG4gKiBAcGFyYW0gbGVmdFxuICogQHBhcmFtIHRvcFxuICogQHBhcmFtIHdpZHRoXG4gKiBAcGFyYW0gaGVpZ2h0XG4gKiBAcGFyYW0gemluZGV4XG4gKiBAcGFyYW0gdXNhZ2VcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDTWFya2VyV2luZG93KHdpbmRvd0lkLCBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQsIHppbmRleCwgdXNhZ2UsIGNvbG9yKSB7XG5cbiAgdmFyIG1lID0gdGhpcztcblxuICBDTWFya2VyV2luZG93LnN1cGVyQ29uc3RydWN0b3IuY2FsbCh0aGlzLCB3aW5kb3dJZCwgbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0LCB6aW5kZXgsIHVzYWdlKTtcblxuICBtZS5odG1sRWxlbWVudC50eXBlTmFtZSA9ICdjbWFya2Vyd2luZG93JztcbiAgbWUuaHRtbEVsZW1lbnQudXNhZ2UgPSB1c2FnZTtcbiAgbWUuaHRtbEVsZW1lbnQuaXNSYW5nZUxpbWl0ZWQgPSBmYWxzZTtcbiAgbWUuaHRtbEVsZW1lbnQuc3R5bGUuYm9yZGVyU3R5bGUgPSAnbm9uZSc7XG4gIG1lLmh0bWxFbGVtZW50LnN0eWxlLnpJbmRleCA9IDE7XG4gIGlmIChjb2xvcikge1xuICAgIG1lLmh0bWxFbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSBjb2xvcjtcbiAgfVxuICAvL21lLnB1bGxVcERpc2FibGVkID0gdHJ1ZTtcblxuICBtZS5nZXRXaW5kb3dUeXBlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICdDTWFya2VyV2luZG93JztcbiAgfTtcbn1cblxuLyoqXG4gKiBFbmQgb2YgQ01hcmtlcldpbmRvdyBjbGFzc1xuICogQGNvbnN0cnVjdG9yXG4gKi9cblxuLy8rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstXG5cbi8qKlxuICogRnJhbWVNYW5hZ2VyIGNsYXNzXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gSlNGcmFtZShtb2RlbCkge1xuXG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgdmFyIHBhcmVudEVsZW1lbnQgPSBudWxsO1xuXG4gIC8vIEZyYW1lcyB3aWxsIGJlIGZpeGVkKEZyYW1lcyBrZWVwIHN0YXlpbmcgaW4gdGhlIHNhbWUgcGxhY2UpIGV2ZW4gaWYgdGhlIHVzZXIgc2Nyb2xscyB0aGUgYnJvd3Nlci5cbiAgbWUuaXNXaW5kb3dNYW5hZ2VyRml4ZWQgPSB0cnVlOy8vZGVmYXVsdCBpcyB0cnVlLlxuXG4gIC8vSW5pdGlhbGl6YXRpb24gcGFyYW1ldGVyIGNoZWNrXG5cbiAgaWYgKG1vZGVsICYmIG1vZGVsLmZpeGVkID09IGZhbHNlKSB7XG4gICAgbWUuaXNXaW5kb3dNYW5hZ2VyRml4ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChtb2RlbCAmJiBtb2RlbC5wYXJlbnRFbGVtZW50KSB7XG4gICAgcGFyZW50RWxlbWVudCA9IG1vZGVsLnBhcmVudEVsZW1lbnQ7XG4gIH1cblxuICBtZS5oQWxpZ24gPSAnbGVmdCc7XG4gIG1lLnZBbGlnbiA9ICd0b3AnO1xuXG4gIGlmIChtb2RlbCAmJiBtb2RlbC5ob3Jpem9udGFsQWxpZ24pIHtcbiAgICBtZS5oQWxpZ24gPSBtb2RlbC5ob3Jpem9udGFsQWxpZ247XG4gIH1cblxuICBpZiAobW9kZWwgJiYgbW9kZWwudmVydGljYWxBbGlnbikge1xuICAgIG1lLnZBbGlnbiA9IG1vZGVsLnZlcnRpY2FsQWxpZ247XG4gIH1cblxuICBtZS5wdWxsVG9SZWZyZXNoID0gZmFsc2U7XG4gIGlmIChtb2RlbCAmJiB0eXBlb2YgbW9kZWwucHVsbFRvUmVmcmVzaCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgbWUucHVsbFRvUmVmcmVzaCA9IG1vZGVsLnB1bGxUb1JlZnJlc2g7XG4gIH1cblxuICBtZS50b3VjaEFjdGlvbk1hbmlwdWxhdGlvbiA9IHRydWU7XG4gIGlmIChtb2RlbCAmJiB0eXBlb2YgbW9kZWwudG91Y2hBY3Rpb25NYW5pcHVsYXRpb24gPT09ICdib29sZWFuJykge1xuICAgIG1lLnRvdWNoQWN0aW9uTWFuaXB1bGF0aW9uID0gbW9kZWwudG91Y2hBY3Rpb25NYW5pcHVsYXRpb247XG4gIH1cblxuICBpZiAoIXBhcmVudEVsZW1lbnQpIHtcbiAgICBpZiAobWUuaXNXaW5kb3dNYW5hZ2VyRml4ZWQpIHtcbiAgICAgIHZhciB0b3BQYXJlbnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRvcFBhcmVudERpdi5pZCA9ICdqc0ZyYW1lX2ZpeGVkXycgKyBtZS5nZW5lcmF0ZVVVSUQoKTtcbiAgICAgIHRvcFBhcmVudERpdi5zZXRBdHRyaWJ1dGUoJ3N0eWxlJyxcbiAgICAgICAgJ3Bvc2l0aW9uOmZpeGVkOycgKyBtZS5oQWxpZ24gKyAnOjBweDsnICsgbWUudkFsaWduICsgJzowcHg7bWFyZ2luOjBweDtwYWRkaW5nOjBweDsnXG4gICAgICApO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0b3BQYXJlbnREaXYpO1xuICAgICAgcGFyZW50RWxlbWVudCA9IHRvcFBhcmVudERpdjtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHRvcFBhcmVudERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdG9wUGFyZW50RGl2LmlkID0gJ2pzRnJhbWVfYWJzb2x1dGVfJyArIG1lLmdlbmVyYXRlVVVJRCgpO1xuICAgICAgdG9wUGFyZW50RGl2LnNldEF0dHJpYnV0ZSgnc3R5bGUnLFxuICAgICAgICAncG9zaXRpb246YWJzb2x1dGU7JyArIG1lLmhBbGlnbiArICc6MHB4OycgKyBtZS52QWxpZ24gKyAnOjBweDttYXJnaW46MHB4O3BhZGRpbmc6MHB4OydcbiAgICAgICk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRvcFBhcmVudERpdik7XG4gICAgICBwYXJlbnRFbGVtZW50ID0gdG9wUGFyZW50RGl2O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAobWUuaXNXaW5kb3dNYW5hZ2VyRml4ZWQpIHtcbiAgICAgIC8vcGFyZW50RWxlbWVudCBzZXRcbiAgICAgIHZhciB0b3BQYXJlbnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRvcFBhcmVudERpdi5pZCA9ICdqc0ZyYW1lX2ZpeGVkXycgKyBtZS5nZW5lcmF0ZVVVSUQoKTtcbiAgICAgIHRvcFBhcmVudERpdi5zZXRBdHRyaWJ1dGUoJ3N0eWxlJyxcbiAgICAgICAgJ3Bvc2l0aW9uOmZpeGVkOycgKyBtZS5oQWxpZ24gKyAnOjBweDsnICsgbWUudkFsaWduICsgJzowcHg7bWFyZ2luOjBweDtwYWRkaW5nOjBweDsnXG4gICAgICApO1xuICAgICAgcGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZCh0b3BQYXJlbnREaXYpO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgIHZhciB0b3BQYXJlbnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRvcFBhcmVudERpdi5pZCA9ICdqc0ZyYW1lX2Fic29sdXRlXycgKyBtZS5nZW5lcmF0ZVVVSUQoKTtcbiAgICAgIHRvcFBhcmVudERpdi5zZXRBdHRyaWJ1dGUoJ3N0eWxlJyxcbiAgICAgICAgJ3Bvc2l0aW9uOmFic29sdXRlOycgKyBtZS5oQWxpZ24gKyAnOjBweDsnICsgbWUudkFsaWduICsgJzowcHg7bWFyZ2luOjBweDtwYWRkaW5nOjBweDsnXG4gICAgICApO1xuICAgICAgcGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZCh0b3BQYXJlbnREaXYpO1xuXG4gICAgfVxuICB9XG5cbiAgaWYgKE1PVVNFX0VOQUJMRUQpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlKTtcbiAgfVxuXG4gIGlmIChUT1VDSF9FTkFCTEVEKSB7XG4gICAgaWYgKCdvbnRvdWNoZW5kJyBpbiB3aW5kb3cpIHtcbiAgICAgIHZhciBmdW5jT25Ub3VjaEVuZCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAvLyBUaGUgXCJtb3VzZXVwXCIgZXZlbnQgaGFwcGVucyByaWdodCBhZnRlciBcInRvdWNoZW5kXCIgZXZlbnQsXG4gICAgICAgIC8vIGJ1dCBJIGRvbid0IGNhbGwgI3ByZXZlbnRkZWZhdWx0IGJlY2F1c2UgI3ByZXZlbnRkZWZhdWx0IHByZXZlbnRzIFwib25jbGlja1wiLlxuICAgICAgICAvLyBTbywgcGVyZm9ybSAjcHJldmVudGRlZmF1bHQgb25seSBmb3IgXCJ0b3VjaG1vdmVcIlxuICAgICAgICAvLyBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbW91c2VVcC5iaW5kKHRoaXMpKGV2dCk7XG4gICAgICB9O1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBmdW5jT25Ub3VjaEVuZCk7XG4gICAgfVxuXG4gICAgaWYgKCdvbnRvdWNobW92ZScgaW4gd2luZG93KSB7XG5cbiAgICAgIC8vIFRvIHJlbW92ZSB0aGUgMzAwbXMgdGFwIGRlbGF5IGJldHdlZW4gdG91Y2hlbmQgYW5kIGNsaWNrLFxuICAgICAgLy8gVG8gZGlzYWJsZSBkb3VibGUtdGFwIHRvIHpvb21cbiAgICAgIGlmIChtZS50b3VjaEFjdGlvbk1hbmlwdWxhdGlvbikge1xuICAgICAgICBtZS5kb0VuYWJsZVRvdWNoQWN0aW9uTWFuaXB1bGF0aW9uKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghbWUucHVsbFRvUmVmcmVzaCkge1xuICAgICAgICAvLyBUaGUgQW5kcm9pZCB2ZXJzaW9uIG9mIENocm9tZSBoYXMgYSBmZWF0dXJlIHRoYXQgcmVmcmVzaGVzIHRoZSBwYWdlIGJ5IHNsaWRpbmcgZG93bndhcmRcbiAgICAgICAgLy8gd2hpbGUgdG91Y2hpbmcgb24gdGhlIHNjcmVlbiwgYnV0IHdoZW4gdGhpcyBmZWF0dXJlIGlzIGVuYWJsZWQsIHRoZSBkb3dud2FyZCBtb3ZlbWVudCBvZiB0aGUgd2luZG93IGlzIGluaGliaXRlZCxcbiAgICAgICAgLy8gc28gdGhpcyBmZWF0dXJlIGNhbiBiZSBleHBsaWNpdGx5IHR1cm5lZCBvZmYuXG4gICAgICAgIG1lLmRvRGlzYWJsZVB1bGxUb1JlZnJlc2goKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGZ1bmNPblRvdWNoTW92ZSA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAvLyBDYWxsICNwcmV2ZW50RGVmYXVsdCB0byBwcmV2ZW50IHNpbXVsdGFuZW91cyBpZ25pdGlvbiBvZiBtb3VzZW1vdmVcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIG1vdXNlTW92ZS5iaW5kKHRoaXMpKGV2dCk7XG4gICAgICB9O1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY09uVG91Y2hNb3ZlKTtcbiAgICB9XG4gIH1cblxuXG4gIG1lLndpbmRvd01hbmFnZXIgPSBuZXcgQ1dpbmRvd01hbmFnZXIocGFyZW50RWxlbWVudCwgJ3dpbmRvd01hbmFnZXJfJyArIG1lLmdlbmVyYXRlVVVJRCgpLCAwLCAwLCAwLCAwKTtcbiAgLy9tZS53aW5kb3dNYW5hZ2VyID0gbmV3IENXaW5kb3dNYW5hZ2VyKGRvY3VtZW50LmJvZHksICd3aW5kb3dNYW5hZ2VyXycgKyBtZS5nZW5lcmF0ZVVVSUQoKSwgMCwgMCwgMCwgMCk7XG4gIG1lLmRvbVBhcnRzQnVpbGRlciA9IG51bGw7XG5cbiAgZnVuY3Rpb24gbW91c2VVcChlKSB7XG4gICAgbWUud2luZG93TWFuYWdlci53aW5kb3dNb3VzZVVwKGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gbW91c2VNb3ZlKGUpIHtcbiAgICBtZS53aW5kb3dNYW5hZ2VyLndpbmRvd01vdXNlTW92ZShlKTtcbiAgfVxufVxuXG5KU0ZyYW1lLnByb3RvdHlwZS5kb0VuYWJsZVRvdWNoQWN0aW9uTWFuaXB1bGF0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHZhciBib2R5U3R5bGUgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzdHlsZScpO1xuICBpZiAoIWJvZHlTdHlsZSkge1xuICAgIGJvZHlTdHlsZSA9ICcnO1xuICB9IGVsc2Uge1xuICAgIGlmICghYm9keVN0eWxlLmVuZHNXaXRoKCc7JykpIHtcbiAgICAgIGJvZHlTdHlsZSArPSAnOyc7XG4gICAgfVxuICB9XG4gIGlmIChib2R5U3R5bGUuaW5kZXhPZigndG91Y2gtYWN0aW9uJykgPT09IC0xKSB7XG4gICAgYm9keVN0eWxlICs9ICctbXMtdG91Y2gtYWN0aW9uOiBtYW5pcHVsYXRpb247dG91Y2gtYWN0aW9uOiBtYW5pcHVsYXRpb247JztcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIGJvZHlTdHlsZSk7XG4gIH1cbn07XG5cbkpTRnJhbWUucHJvdG90eXBlLmRvRGlzYWJsZVB1bGxUb1JlZnJlc2ggPSBmdW5jdGlvbigpIHtcbiAgdmFyIGJvZHlTdHlsZSA9IGRvY3VtZW50LmJvZHkuZ2V0QXR0cmlidXRlKCdzdHlsZScpO1xuICBpZiAoIWJvZHlTdHlsZSkge1xuICAgIGJvZHlTdHlsZSA9ICcnO1xuICB9IGVsc2Uge1xuICAgIGlmICghYm9keVN0eWxlLmVuZHNXaXRoKCc7JykpIHtcbiAgICAgIGJvZHlTdHlsZSArPSAnOyc7XG4gICAgfVxuICB9XG4gIGlmIChib2R5U3R5bGUuaW5kZXhPZignb3ZlcnNjcm9sbC1iZWhhdmlvci15JykgPT09IC0xKSB7XG4gICAgYm9keVN0eWxlICs9ICdvdmVyc2Nyb2xsLWJlaGF2aW9yLXk6IGNvbnRhaW47JztcbiAgICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBib2R5U3R5bGUpO1xuICB9XG59O1xuSlNGcmFtZS5wcm90b3R5cGUuZ2V0RG9tUGFydHNCdWlsZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgaWYgKCFtZS5kb21QYXJ0c0J1aWxkZXIpIHtcbiAgICBtZS5kb21QYXJ0c0J1aWxkZXIgPSBuZXcgQ0RvbVBhcnRzQnVpbGRlcigpO1xuICB9XG4gIHJldHVybiBtZS5kb21QYXJ0c0J1aWxkZXI7XG59O1xuXG5KU0ZyYW1lLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbihtb2RlbCkge1xuICB2YXIgbWUgPSB0aGlzO1xuXG4gIHZhciBwcm9wZXJ0aWVzID0ge307XG4gIHByb3BlcnRpZXMubmFtZSA9IG1vZGVsLm5hbWU7XG4gIHZhciB0aXRsZSA9IG1vZGVsLnRpdGxlO1xuICB2YXIgbGVmdCA9IG1vZGVsLmxlZnQ7XG4gIHZhciB0b3AgPSBtb2RlbC50b3A7XG4gIHZhciB3aWR0aCA9IG1vZGVsLndpZHRoO1xuICB2YXIgaGVpZ2h0ID0gbW9kZWwuaGVpZ2h0O1xuICB2YXIgYXBwZWFyYW5jZSA9IG1vZGVsLmFwcGVhcmFuY2U7XG4gIHZhciBwcmVzZXRXaW5kb3dOYW1lID0gbW9kZWwucHJlc2V0O1xuICB2YXIgcHJlc2V0V2luZG93UGFyYW0gPSBtb2RlbC5wcmVzZXRQYXJhbTtcbiAgdmFyIGFwcGVhcmFuY2VOYW1lID0gbW9kZWwuYXBwZWFyYW5jZU5hbWU7XG4gIHZhciBhcHBlYXJhbmNlUGFyYW0gPSBtb2RlbC5hcHBlYXJhbmNlUGFyYW07XG4gIHZhciBzdHlsZSA9IG1vZGVsLnN0eWxlO1xuXG4gIHZhciBtaW5XaWR0aCA9IG1vZGVsLm1pbldpZHRoO1xuICB2YXIgbWluSGVpZ2h0ID0gbW9kZWwubWluSGVpZ2h0O1xuXG5cbiAgdmFyIGh0bWwgPSBtb2RlbC5odG1sO1xuICB2YXIgcmVzaXphYmxlID0gbW9kZWwucmVzaXphYmxlO1xuICB2YXIgbW92YWJsZSA9IG1vZGVsLm1vdmFibGU7XG4gIHZhciB1cmwgPSBtb2RlbC51cmw7XG4gIHZhciB1cmxMb2FkZWQgPSBtb2RlbC51cmxMb2FkZWQ7XG5cbiAgdmFyIHByZXNldFBhcmFtID0gbW9kZWwucHJlc2V0UGFyYW07XG4gIHZhciBwcmVzZXRXaW5kb3c7XG5cbiAgaWYgKHByZXNldFdpbmRvd05hbWUpIHtcblxuICAgIHZhciBwcmVzZXRXaW5kb3dPYmogPSB0aGlzLmdldFByZXNldFdpbmRvdyhwcmVzZXRXaW5kb3dOYW1lKTtcbiAgICBwcmVzZXRXaW5kb3cgPSBwcmVzZXRXaW5kb3dPYmouZ2V0UHJlc2V0V2luZG93KHByZXNldFBhcmFtKTtcbiAgICBhcHBlYXJhbmNlID0gdGhpcy5jcmVhdGVQcmVzZXRTdHlsZShwcmVzZXRXaW5kb3cuYXBwZWFyYW5jZU5hbWUsXG4gICAgICB7IGFwcGVhcmFuY2VQYXJhbTogcHJlc2V0V2luZG93LmFwcGVhcmFuY2VQYXJhbSB9KTtcblxuICB9IGVsc2UgaWYgKGFwcGVhcmFuY2VOYW1lKSB7XG4gICAgYXBwZWFyYW5jZSA9IHRoaXMuY3JlYXRlUHJlc2V0U3R5bGUoYXBwZWFyYW5jZU5hbWUsXG4gICAgICB7IGFwcGVhcmFuY2VQYXJhbTogYXBwZWFyYW5jZVBhcmFtIH0pO1xuICB9XG5cbiAgaWYgKG1vZGVsLmNsaWVudEhlaWdodCkge1xuICAgIHZhciB3aW5kb3dUaXRsZUJhckhlaWdodCA9IHBhcnNlSW50KGFwcGVhcmFuY2UudGl0bGVCYXJIZWlnaHQgfHwgMCkgLSBhcHBlYXJhbmNlLmZyYW1lSGVpZ2h0QWRqdXN0O1xuICAgIGhlaWdodCA9IG1vZGVsLmNsaWVudEhlaWdodCArIHdpbmRvd1RpdGxlQmFySGVpZ2h0O1xuICB9XG5cblxuICB2YXIgZnJhbWUgPSB0aGlzLmNyZWF0ZUZyYW1lKGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCwgYXBwZWFyYW5jZSwgcHJvcGVydGllcyk7XG5cbiAgaWYgKHRpdGxlKSB7XG4gICAgZnJhbWUuc2V0VGl0bGUodGl0bGUpO1xuICB9XG5cbiAgaWYgKGh0bWwpIHtcbiAgICBmcmFtZS5zZXRIVE1MKGh0bWwpO1xuICB9XG4gIGlmICh1cmwpIHtcbiAgICB2YXIgdXJsUHJvbWlzZSA9IGZyYW1lLnNldFVybCh1cmwpO1xuICAgIGlmICh1cmxMb2FkZWQpIHtcbiAgICAgIHVybFByb21pc2UudGhlbih1cmxMb2FkZWQpO1xuICAgIH1cbiAgfVxuICBpZiAocmVzaXphYmxlID09IGZhbHNlKSB7XG4gICAgZnJhbWUuc2V0UmVzaXphYmxlKGZhbHNlKTtcbiAgfVxuICBpZiAobW92YWJsZSA9PSBmYWxzZSkge1xuICAgIGZyYW1lLnNldE1vdmFibGUoZmFsc2UpO1xuICB9XG5cbiAgaWYgKG1pbldpZHRoICYmIG1pbkhlaWdodCkge1xuICAgIGZyYW1lLm1pbkZyYW1lV2lkdGggPSBtaW5XaWR0aDtcbiAgfVxuICBpZiAobWluSGVpZ2h0KSB7XG4gICAgZnJhbWUubWluV2luZG93SGVpZ2h0ID0gbWluSGVpZ2h0O1xuXG4gICAgaWYgKG1vZGVsLmNsaWVudEhlaWdodCkge1xuICAgICAgZnJhbWUubWluV2luZG93SGVpZ2h0ID0gbWluSGVpZ2h0ICsgd2luZG93VGl0bGVCYXJIZWlnaHQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0eWxlKSB7XG4gICAgdmFyIGZyYW1lVmlldyA9IGZyYW1lLmdldEZyYW1lVmlldygpO1xuXG4gICAgZm9yICh2YXIgbmFtZSBpbiBzdHlsZSkge1xuICAgICAgaWYgKHN0eWxlLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIGZyYW1lVmlldy5zdHlsZVtuYW1lXSA9IHN0eWxlW25hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChwcmVzZXRXaW5kb3cpIHtcbiAgICBwcmVzZXRXaW5kb3cuc2V0dXBQcmVzZXRXaW5kb3coZnJhbWUpO1xuICB9XG5cbiAgcmV0dXJuIGZyYW1lO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgd2luZG93XG4gKlxuICogQHJldHVybnMge0NJZkZyYW1lfVxuICovXG5KU0ZyYW1lLnByb3RvdHlwZS5jcmVhdGVGcmFtZSA9IGZ1bmN0aW9uKGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCwgYXBwZWFyYW5jZSwgcHJvcGVydGllcykge1xuICB2YXIgbWUgPSB0aGlzO1xuXG4gIGlmICghYXBwZWFyYW5jZSkge1xuICAgIGFwcGVhcmFuY2UgPSBtZS5jcmVhdGVGcmFtZUFwcGVhcmFuY2UoKTtcbiAgfVxuXG5cbiAgYXBwZWFyYW5jZS5pbml0aWFsaXplKCk7XG5cbiAgdmFyIHdpbmRvd0lkID0gJ3dpbmRvd18nICsgbWUuZ2VuZXJhdGVVVUlEKCk7XG5cbiAgaWYgKCFsZWZ0KSB7XG4gICAgbGVmdCA9IDA7XG4gIH1cbiAgaWYgKCF0b3ApIHtcbiAgICB0b3AgPSAwO1xuICB9XG4gIGlmICghd2lkdGgpIHtcbiAgICB3aWR0aCA9IDEyODtcbiAgfVxuICBpZiAoIWhlaWdodCkge1xuICAgIGhlaWdodCA9IDEyODtcbiAgfVxuXG5cbiAgdmFyIGZyYW1lID0gbmV3IENJZkZyYW1lKHdpbmRvd0lkLCBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQsIGFwcGVhcmFuY2UpO1xuXG4gIC8vZXhwZXJpbWVudGFsXG4gIGZyYW1lLmpzRnJhbWUgPSBtZTtcblxuICBpZiAocHJvcGVydGllcyAmJiBwcm9wZXJ0aWVzLm5hbWUpIHtcbiAgICBmcmFtZS5zZXROYW1lKHByb3BlcnRpZXMubmFtZSk7XG4gIH1cbiAgZnJhbWUuaGlkZSgpO1xuXG4gIG1lLndpbmRvd01hbmFnZXIuYWRkV2luZG93KGZyYW1lKTtcblxuXG4gIC8vIGdldFRpdGxlQmFyU3R5bGUgaXMgZGVwcmVjYXRlZFxuICBpZiAoYXBwZWFyYW5jZS5nZXRUaXRsZUJhclN0eWxlKSB7XG5cbiAgICB2YXIgdGl0bGVCYXJTdHlsZSA9IGFwcGVhcmFuY2UuZ2V0VGl0bGVCYXJTdHlsZSgpO1xuICAgIGlmICh0aXRsZUJhclN0eWxlKSB7XG4gICAgICBmcmFtZS5zZXRUaXRsZUJhckNsYXNzTmFtZSh0aXRsZUJhclN0eWxlLnRpdGxlQmFyQ2xhc3NOYW1lRGVmYXVsdCwgdGl0bGVCYXJTdHlsZS50aXRsZUJhckNsYXNzTmFtZUZvY3VzZWQpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChhcHBlYXJhbmNlLnRpdGxlQmFyQ2xhc3NOYW1lRGVmYXVsdCAmJiBhcHBlYXJhbmNlLnRpdGxlQmFyQ2xhc3NOYW1lRm9jdXNlZCkge1xuICAgIGZyYW1lLnNldFRpdGxlQmFyQ2xhc3NOYW1lKGFwcGVhcmFuY2UudGl0bGVCYXJDbGFzc05hbWVEZWZhdWx0LCBhcHBlYXJhbmNlLnRpdGxlQmFyQ2xhc3NOYW1lRm9jdXNlZCk7XG4gIH0gZWxzZSBpZiAoYXBwZWFyYW5jZS50aXRsZUJhckNsYXNzTmFtZURlZmF1bHQpIHtcbiAgICBmcmFtZS5zZXRUaXRsZUJhckNsYXNzTmFtZShhcHBlYXJhbmNlLnRpdGxlQmFyQ2xhc3NOYW1lRGVmYXVsdCwgYXBwZWFyYW5jZS50aXRsZUJhckNsYXNzTmFtZURlZmF1bHQpO1xuICB9XG5cbiAgcmV0dXJuIGZyYW1lO1xuXG59O1xuXG5cbkpTRnJhbWUucHJvdG90eXBlLmNvbnRhaW5zV2luZG93TmFtZSA9IGZ1bmN0aW9uKHdpbmRvd05hbWUpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgcmV0dXJuIG1lLndpbmRvd01hbmFnZXIuY29udGFpbnNXaW5kb3dOYW1lKHdpbmRvd05hbWUpO1xufTtcblxuSlNGcmFtZS5wcm90b3R5cGUuZ2V0V2luZG93QnlOYW1lID0gZnVuY3Rpb24od2luZG93TmFtZSkge1xuICB2YXIgbWUgPSB0aGlzO1xuICByZXR1cm4gbWUud2luZG93TWFuYWdlci5nZXRXaW5kb3dCeU5hbWUod2luZG93TmFtZSk7XG59O1xuXG5KU0ZyYW1lLnByb3RvdHlwZS5nZW5lcmF0ZVVVSUQgPSBmdW5jdGlvbigpIHtcblxuICB2YXIgdW5peFRpbWUgPSBEYXRlLm5vdygpO1xuXG4gIHZhciB1dWlkID0gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbihjKSB7XG4gICAgdmFyIHIgPSAodW5peFRpbWUgKyBNYXRoLnJhbmRvbSgpICogMTYpICUgMTYgfCAwO1xuICAgIHVuaXhUaW1lID0gTWF0aC5mbG9vcih1bml4VGltZSAvIDE2KTtcbiAgICByZXR1cm4gKGMgPT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KSkudG9TdHJpbmcoMTYpO1xuICB9KTtcbiAgcmV0dXJuIHV1aWQ7XG5cbn07XG5cbkpTRnJhbWUucHJvdG90eXBlLmNyZWF0ZUZyYW1lQXBwZWFyYW5jZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IENGcmFtZUFwcGVhcmFuY2UoKTtcbn07XG5cbkpTRnJhbWUucHJvdG90eXBlLmNyZWF0ZUFuaW1hdG9yID0gZnVuY3Rpb24oKSB7XG5cbiAgcmV0dXJuIG5ldyBDU2ltcGxlTGF5b3V0QW5pbWF0b3IoKTtcbn07XG5cbi8qKlxuICogSGVscGVyIGNsYXNzIGZvciBtYXhpbWl6aW5nIGFuZCBtaW5pbWl6aW5nIHdpbmRvd3MoZnJhbWVzKSBhbmQgaGFuZGxpbmcgYW5pbWF0aW9ucyBhY2NvcmRpbmdseVxuICovXG5KU0ZyYW1lLnByb3RvdHlwZS5jcmVhdGVXaW5kb3dFdmVudEhlbHBlciA9IGZ1bmN0aW9uKG1vZGVsKSB7XG5cbiAgdmFyIG1lID0gdGhpcztcblxuICBpZiAoIW1vZGVsKSB7XG4gICAgbW9kZWwgPSB7fTtcbiAgfVxuXG4gIG1vZGVsLnZlcnRpY2FsQWxpZ24gPSBtZS52QWxpZ247XG4gIG1vZGVsLmhvcml6b250YWxBbGlnbiA9IG1lLmhBbGlnbjtcblxuICB2YXIgd25kRXZlbnRIZWxwZXIgPSBuZXcgV2luZG93RXZlbnRIZWxwZXIobW9kZWwpO1xuICByZXR1cm4gd25kRXZlbnRIZWxwZXI7XG59O1xuXG5KU0ZyYW1lLnByb3RvdHlwZS5nZXRQcmVzZXRXaW5kb3cgPSBmdW5jdGlvbihwcmVzZXROYW1lLCBwYXJhbSkge1xuXG4gIGlmIChwcmVzZXRXaW5kb3dzW3ByZXNldE5hbWVdKSB7XG4gICAgdmFyIHByZXNldE9iaiA9IHByZXNldFdpbmRvd3NbcHJlc2V0TmFtZV07XG4gICAgcmV0dXJuIHByZXNldE9iajtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuSlNGcmFtZS5wcm90b3R5cGUuY3JlYXRlUHJlc2V0U3R5bGUgPSBmdW5jdGlvbihwcmVzZXROYW1lLCBwYXJhbSkge1xuXG4gIHZhciBtZSA9IHRoaXM7XG4gIHZhciBhcHIgPSBtZS5jcmVhdGVGcmFtZUFwcGVhcmFuY2UoKTtcbiAgaWYgKHBhcmFtICYmIHBhcmFtLmZvY3VzZWRGcmFtZU9ubHkpIHtcbiAgICBhcHIuZm9jdXNlZEZyYW1lT25seSA9IHBhcmFtLmZvY3VzZWRGcmFtZU9ubHk7XG4gIH1cblxuICBpZiAocHJlc2V0U3R5bGVzW3ByZXNldE5hbWVdKSB7XG4gICAgdmFyIHN0eWxlT2JqID0gcHJlc2V0U3R5bGVzW3ByZXNldE5hbWVdO1xuICAgIHZhciBhcHBlYXJhbmNlUGFyYW0gPSBudWxsO1xuXG4gICAgaWYgKHBhcmFtICYmIHBhcmFtLmFwcGVhcmFuY2VQYXJhbSkge1xuICAgICAgYXBwZWFyYW5jZVBhcmFtID0gcGFyYW0uYXBwZWFyYW5jZVBhcmFtO1xuICAgIH1cblxuICAgIHJldHVybiBzdHlsZU9iai5nZXRTdHlsZShhcHIsIGFwcGVhcmFuY2VQYXJhbSk7XG4gIH1cblxuICBjb25zb2xlLmVycm9yKCdbSlNGcmFtZV0gUHJlc2V0IGFwcGVhcmFuY2UgXCInICsgcHJlc2V0TmFtZSArICdcIiBub3QgZm91bmQuJyk7XG4gIHJldHVybiBhcHI7XG59O1xuXG5KU0ZyYW1lLnByb3RvdHlwZS5zaG93VG9hc3QgPSBmdW5jdGlvbihtb2RlbCkge1xuICBpZiAoIW1vZGVsKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIG1lID0gdGhpcztcbiAgdmFyIHRvYXN0SGVpZ2h0ID0gNjA7XG4gIHZhciB0b2FzdFdpZHRoID0gMjYwO1xuICB2YXIgb3BlbkNsb3NlRHVyYXRpb25NcyA9IDMwMDtcbiAgdmFyIHN0YXlEdXJhdGlvbk1zID0gMTAwMDtcbiAgdmFyIHN0YXJ0WSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDEwIC0gdG9hc3RIZWlnaHQgLyAyO1xuICB2YXIgZW5kWSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDIwIC0gdG9hc3RIZWlnaHQgLyAyO1xuICB2YXIgbXlIdG1sID0gJyc7XG4gIHZhciBzaG93QnV0dG9uID0gZmFsc2U7XG4gIHZhciBzdHlsZSA9IHtcbiAgICBib3JkZXJSYWRpdXM6ICcxMHB4JyxcbiAgICBiYWNrZ3JvdW5kOiAncmdiYSgwLDAsMCwwLjgpJyxcbiAgfTtcblxuICBpZiAobW9kZWwuc3R5bGUpIHtcbiAgICBzdHlsZSA9IG1vZGVsLnN0eWxlO1xuICB9XG4gIGlmIChtb2RlbC5oZWlnaHQpIHtcbiAgICB0b2FzdEhlaWdodCA9IG1vZGVsLmhlaWdodDtcbiAgfVxuICBpZiAobW9kZWwud2lkdGgpIHtcbiAgICB0b2FzdFdpZHRoID0gbW9kZWwud2lkdGg7XG4gIH1cbiAgaWYgKG1vZGVsLmR1cmF0aW9uKSB7XG4gICAgc3RheUR1cmF0aW9uTXMgPSBtb2RlbC5kdXJhdGlvbjtcbiAgfVxuICBpZiAobW9kZWwuYWxpZ24pIHtcblxuICAgIGlmIChtb2RlbC5hbGlnbiA9PSAndG9wJykge1xuICAgICAgc3RhcnRZID0gMTAgKyB0b2FzdEhlaWdodCAvIDI7XG4gICAgICBlbmRZID0gMjAgKyB0b2FzdEhlaWdodCAvIDI7XG4gICAgfSBlbHNlIGlmIChtb2RlbC5hbGlnbiA9PSAnY2VudGVyJykge1xuICAgICAgc3RhcnRZID0gd2luZG93LmlubmVySGVpZ2h0IC8gMjtcbiAgICAgIGVuZFkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL2JvdHRvbVxuICAgIH1cbiAgfVxuICBpZiAobW9kZWwuaHRtbCkge1xuICAgIG15SHRtbCA9IG1vZGVsLmh0bWw7XG4gIH1cbiAgaWYgKG1vZGVsLnRleHQpIHtcbiAgICBteUh0bWwgPSBtb2RlbC50ZXh0O1xuICB9XG4gIGlmIChtb2RlbC5jbG9zZUJ1dHRvbiA9PSB0cnVlKSB7XG4gICAgc2hvd0J1dHRvbiA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgc2hvd0J1dHRvbiA9IGZhbHNlO1xuICB9XG5cblxuICB2YXIgYXByID0gbWUuY3JlYXRlUHJlc2V0U3R5bGUoJ3RvYXN0Jyk7XG5cbiAgaWYgKHN0eWxlLmJvcmRlclJhZGl1cykge1xuICAgIGFwci5mcmFtZUJvcmRlclJhZGl1cyA9IHN0eWxlLmJvcmRlclJhZGl1cztcbiAgfVxuXG4gIGlmIChtb2RlbC5jbG9zZUJ1dHRvbkNvbG9yKSB7XG4gICAgYXByLmNhcHRpb25DbG9yID0gbW9kZWwuY2xvc2VCdXR0b25Db2xvcjtcblxuICB9XG5cblxuICB2YXIgZnJhbWUgPSBtZS5jcmVhdGUoe1xuICAgIG5hbWU6ICd0b2FzdF8nICsgbWUuZ2VuZXJhdGVVVUlEKCksXG4gICAgd2lkdGg6IHRvYXN0V2lkdGgsIGhlaWdodDogdG9hc3RIZWlnaHQsXG4gICAgbW92YWJsZTogZmFsc2UsXG4gICAgcmVzaXphYmxlOiBmYWxzZSxcbiAgICBhcHBlYXJhbmNlOiBhcHIsXG4gICAgc3R5bGU6IHN0eWxlLFxuICAgIGh0bWw6ICc8ZGl2IGlkPVwibXlfZWxlbWVudFwiIHN0eWxlPVwiYm94LXNpemluZzpib3JkZXItYm94O2Rpc3BsYXk6IGZsZXg7anVzdGlmeS1jb250ZW50OiBjZW50ZXI7YWxpZ24taXRlbXM6IGNlbnRlcjtwYWRkaW5nOjEwcHg7Zm9udC1zaXplOjE2cHg7Y29sb3I6ZGFya2dyYXk7aGVpZ2h0OicgKyAodG9hc3RIZWlnaHQpICsgJ3B4XCI+JyArXG4gICAgICBteUh0bWwgK1xuICAgICAgJzwvZGl2PidcbiAgfSk7XG5cblxuICBpZiAoc2hvd0J1dHRvbikge1xuICB9IGVsc2Uge1xuICAgIGZyYW1lLmhpZGVGcmFtZUNvbXBvbmVudCgnY2xvc2VCdXR0b24nKTtcbiAgfVxuXG4gIHZhciByZXF1ZXN0Rm9jdXNBZnRlckFuaW1hdGlvbiA9IGZhbHNlO1xuXG4gIHZhciBzdGFydFggPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDI7XG5cbiAgaWYgKG1lLmhBbGlnbiA9PSAncmlnaHQnKSB7XG4gICAgc3RhcnRYID0gLXN0YXJ0WDsvLyAtNTAwO1xuICB9XG5cbiAgaWYgKG1lLnZBbGlnbiA9PSAnYm90dG9tJykge1xuICAgIHN0YXJ0WSA9IHN0YXJ0WSAtIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBlbmRZID0gZW5kWSAtIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgfVxuXG5cbiAgdmFyIGFuaW1hdG9yID0gbWUuY3JlYXRlQW5pbWF0b3IoKTtcbiAgYW5pbWF0b3Iuc2V0KGZyYW1lKVxuICAgIC5zZXREdXJhdGlvbihvcGVuQ2xvc2VEdXJhdGlvbk1zKVxuICAgIC5mcm9tUG9zaXRpb24oc3RhcnRYLCBzdGFydFksICdDRU5URVJfQ0VOVEVSJylcbiAgICAudG9Qb3NpdGlvbihzdGFydFgsIGVuZFksICdDRU5URVJfQ0VOVEVSJylcbiAgICAudG9BbHBoYSgxLjApXG4gICAgLmZyb21BbHBoYSgwLjApXG4gICAgLnN0YXJ0KDAsIHJlcXVlc3RGb2N1c0FmdGVyQW5pbWF0aW9uKVxuICAgIC50aGVuKGZ1bmN0aW9uKGFuaW1hdG9yT2JqKSB7XG4gICAgICByZXR1cm4gYW5pbWF0b3JPYmpcbiAgICAgICAgLnNldER1cmF0aW9uKG9wZW5DbG9zZUR1cmF0aW9uTXMpXG4gICAgICAgIC5mcm9tUG9zaXRpb24oc3RhcnRYLCBlbmRZLCAnQ0VOVEVSX0NFTlRFUicpXG4gICAgICAgIC50b1Bvc2l0aW9uKHN0YXJ0WCwgc3RhcnRZLCAnQ0VOVEVSX0NFTlRFUicpXG4gICAgICAgIC5mcm9tQWxwaGEoMS4wKVxuICAgICAgICAudG9BbHBoYSgwLjUpXG4gICAgICAgIC5zdGFydChzdGF5RHVyYXRpb25NcywgcmVxdWVzdEZvY3VzQWZ0ZXJBbmltYXRpb24pO1xuICAgIH0pXG4gICAgLnRoZW4oZnVuY3Rpb24oYW5pbWF0b3JPYmopIHtcbiAgICAgIHZhciBfZnJhbWUgPSBhbmltYXRvck9iai5nZXQoKTtcbiAgICAgIF9mcmFtZS5jbG9zZUZyYW1lKCk7XG4gICAgfSk7XG5cbn07XG5cbi8qKlxuICogZW5kIG9mIEZyYW1lTWFuYWdlciBjbGFzc1xuICovXG5cblxuT2JqZWN0LmZyZWV6ZShERUYpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEpTRnJhbWU7XG4iLCJmdW5jdGlvbiBDVGV4dEJ1dHRvbkFwcGVhcmFuY2UoKSB7XG5cbiAgdmFyIGNyb3NzTWFyazAgPSAnXFx1Mjc0Yyc7XG5cbiAgdGhpcy5zaXplID0gMTQ7XG4gIHRoaXMud2lkdGggPSBudWxsO1xuICB0aGlzLmhlaWdodCA9IG51bGw7XG5cbiAgLy9ib3JkZXJcbiAgdGhpcy5ib3JkZXJSYWRpdXMgPSAyO1xuICB0aGlzLmJvcmRlcldpZHRoID0gMDtcbiAgdGhpcy5ib3JkZXJDb2xvckRlZmF1bHQgPSAnI2FhYWFhYSc7XG4gIHRoaXMuYm9yZGVyQ29sb3JGb2N1c2VkID0gdGhpcy5ib3JkZXJDb2xvckRlZmF1bHQ7XG4gIHRoaXMuYm9yZGVyQ29sb3JIb3ZlcmVkID0gbnVsbDtcbiAgdGhpcy5ib3JkZXJDb2xvclByZXNzZWQgPSB0aGlzLmJvcmRlckNvbG9yRGVmYXVsdDtcblxuICB0aGlzLmJvcmRlclN0eWxlRGVmYXVsdCA9ICdzb2xpZCc7XG4gIHRoaXMuYm9yZGVyU3R5bGVGb2N1c2VkID0gdGhpcy5ib3JkZXJTdHlsZURlZmF1bHQ7XG4gIHRoaXMuYm9yZGVyU3R5bGVIb3ZlcmVkID0gbnVsbDtcbiAgdGhpcy5ib3JkZXJTdHlsZVByZXNzZWQgPSB0aGlzLmJvcmRlclN0eWxlRGVmYXVsdDtcblxuICB0aGlzLmJhY2tncm91bmRCb3hTaGFkb3cgPSBudWxsO1xuXG5cbiAgLy9iYWNrZ3JvdW5kXG4gIHRoaXMuYmFja2dyb3VuZENvbG9yRGVmYXVsdCA9ICd0cmFuc3BhcmVudCc7XG4gIHRoaXMuYmFja2dyb3VuZENvbG9yRm9jdXNlZCA9IHRoaXMuYmFja2dyb3VuZENvbG9yRGVmYXVsdDtcbiAgdGhpcy5iYWNrZ3JvdW5kQ29sb3JIb3ZlcmVkID0gbnVsbDtcbiAgdGhpcy5iYWNrZ3JvdW5kQ29sb3JQcmVzc2VkID0gdGhpcy5iYWNrZ3JvdW5kQ29sb3JEZWZhdWx0O1xuXG4gIC8vY2FwdGlvblxuICB0aGlzLmNhcHRpb24gPSBudWxsO1xuICB0aGlzLmNhcHRpb25Db2xvckRlZmF1bHQgPSAnd2hpdGUnO1xuICB0aGlzLmNhcHRpb25Db2xvckZvY3VzZWQgPSB0aGlzLmNhcHRpb25Db2xvckRlZmF1bHQ7XG4gIHRoaXMuY2FwdGlvbkNvbG9ySG92ZXJlZCA9IG51bGw7XG4gIHRoaXMuY2FwdGlvbkNvbG9yUHJlc3NlZCA9IHRoaXMuY2FwdGlvbkNvbG9yRGVmYXVsdDtcbiAgdGhpcy5jYXB0aW9uU2hpZnRZcHggPSAwO1xuICB0aGlzLmNhcHRpb25Gb250UmF0aW8gPSAxLjA7XG5cblxufVxubW9kdWxlLmV4cG9ydHMgPSBDVGV4dEJ1dHRvbkFwcGVhcmFuY2U7IiwiZnVuY3Rpb24gQ0NoaWxkTWVudUFwcGVhcmFuY2UobW9kZWwpIHtcbiAgdGhpcy5jaGlsZE1lbnVIVE1MID0gJyc7XG4gIHRoaXMuY2hpbGRNZW51V2lkdGggPSAwO1xuICB0aGlzLmNoaWxkTWVudUFsaWduID0gJ0xFRlQnOy8vIG9mZiBzZXQgcG9zaXRpb24gZnJvbSBwYXJlbnQgZnJhbWVDb21wb25lbnQgXCJMRUZUXCIgXCJSSUdIVFwiIFwiQ0VOVEVSXCJcbiAgdGhpcy55T2Zmc2V0ID0gMDtcbiAgdGhpcy54T2Zmc2V0ID0gMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDQ2hpbGRNZW51QXBwZWFyYW5jZTsiLCJ2YXIgbWVyZ2VEZWVwbHkgPSByZXF1aXJlKCdtZXJnZS1kZWVwbHknKTtcbnZhciBDVGV4dEJ1dHRvbkFwcGVhcmFuY2UgPSByZXF1aXJlKCcuL0NCdXR0b25BcHBlYXJhbmNlLmpzJyk7XG52YXIgQ0ltYWdlQnV0dG9uQXBwZWFyYW5jZSA9IHJlcXVpcmUoJy4vQ0ltYWdlQnV0dG9uQXBwZWFyYW5jZS5qcycpO1xudmFyIENDaGlsZE1lbnVBcHBlYXJhbmNlID0gcmVxdWlyZSgnLi9DQ2hpbGRNZW51QXBwZWFyYW5jZS5qcycpO1xuXG4vKipcbiAqIENEb21QYXJ0c0J1aWxkZXIgY2xhc3NcbiAqIEVhc3kgdG8gYnVpbGQgYSBiZWF1dGlmdWwgb3IgdHlwaWNhbCBkb20gcGFydHMoaHRtbEVsZW1lbnQpXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ0RvbVBhcnRzQnVpbGRlcigpIHtcbn1cblxuQ0RvbVBhcnRzQnVpbGRlci5wcm90b3R5cGUuYnVpbGRDaGlsZE1lbnVBcHBlYXJhbmNlID0gZnVuY3Rpb24oZnJhbWVBcHBlYXJhbmNlKSB7XG4gIHJldHVybiBuZXcgQ0NoaWxkTWVudUFwcGVhcmFuY2UoZnJhbWVBcHBlYXJhbmNlKTtcbn07XG5DRG9tUGFydHNCdWlsZGVyLnByb3RvdHlwZS5idWlsZFRleHRCdXR0b25BcHBlYXJhbmNlID0gZnVuY3Rpb24oc3JjKSB7XG4gIGlmIChzcmMpIHtcbiAgICB2YXIgcmVzdWx0ID0gbWVyZ2VEZWVwbHkoeyBvcDogJ2Nsb25lJywgb2JqZWN0MTogc3JjLCBjb25jYXRBcnJheTogdHJ1ZSB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgQ1RleHRCdXR0b25BcHBlYXJhbmNlKCk7XG4gIH1cbn07XG5DRG9tUGFydHNCdWlsZGVyLnByb3RvdHlwZS5idWlsZEltYWdlQnV0dG9uQXBwZWFyYW5jZSA9IGZ1bmN0aW9uKHNyYykge1xuICBpZiAoc3JjKSB7XG4gICAgdmFyIGNsb25lZEltYWdlQnV0dG9uQXBwZWFyYW5jZSA9IG1lcmdlRGVlcGx5KHsgb3A6ICdjbG9uZScsIG9iamVjdDE6IHNyYyB9KTtcbiAgICByZXR1cm4gY2xvbmVkSW1hZ2VCdXR0b25BcHBlYXJhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgQ0ltYWdlQnV0dG9uQXBwZWFyYW5jZSgpO1xuICB9XG59O1xuXG5DRG9tUGFydHNCdWlsZGVyLnByb3RvdHlwZS5idWlsZEJ1dHRvbiA9IGZ1bmN0aW9uKGJ0bkFwcGVhcmFuY2UpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgcmV0dXJuIG1lLmJ1aWxkVGV4dEJ1dHRvbihidG5BcHBlYXJhbmNlKTtcbn07XG5cbkNEb21QYXJ0c0J1aWxkZXIucHJvdG90eXBlLmFwcGVuZENoaWxkTWVudVRvID0gZnVuY3Rpb24oY2hpbGRNZW51QXBwZWFyYW5jZSwgcGFyZW50RWxlKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHZhciBuZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG5kaXYuY2xhc3NMaXN0LmFkZCgnanNmcmFtZS1jaGlsZC1tZW51Jyk7XG4gIG5kaXYuaW5uZXJIVE1MID0gY2hpbGRNZW51QXBwZWFyYW5jZS5jaGlsZE1lbnVIVE1MO1xuICBuZGl2LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgbmRpdi5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICBuZGl2LnN0eWxlLndpZHRoID0gY2hpbGRNZW51QXBwZWFyYW5jZS5jaGlsZE1lbnVXaWR0aCArICdweCc7XG4gIC8vIG5kaXYuc3R5bGUudG9wID0gY2hpbGRNZW51QXBwZWFyYW5jZS5jaGlsZE1lbnVUb3AgKyAncHgnO1xuICAvLyBuZGl2LnN0eWxlLmxlZnQgPSBjaGlsZE1lbnVBcHBlYXJhbmNlLmNoaWxkTWVudUxlZnQgKyAncHgnO1xuICBuZGl2LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgdmFyIHBvc1ggPSBjaGlsZE1lbnVBcHBlYXJhbmNlLnhPZmZzZXQ7XG4gIHZhciBwb3NZID0gcGFyc2VJbnQocGFyZW50RWxlLnN0eWxlLmhlaWdodCwgMTApICsgY2hpbGRNZW51QXBwZWFyYW5jZS55T2Zmc2V0ICsgMjtcblxuICBpZiAoY2hpbGRNZW51QXBwZWFyYW5jZS5jaGlsZE1lbnVBbGlnbiA9PT0gJ0xFRlQnKSB7XG4gICAgbmRpdi5zdHlsZS5sZWZ0ID0gcG9zWCArICdweCc7XG4gIH0gZWxzZSBpZiAoY2hpbGRNZW51QXBwZWFyYW5jZS5jaGlsZE1lbnVBbGlnbiA9PT0gJ1JJR0hUJykge1xuICAgIG5kaXYuc3R5bGUucmlnaHQgPSBwb3NYICsgJ3B4JztcbiAgfSBlbHNlIGlmIChjaGlsZE1lbnVBcHBlYXJhbmNlLmNoaWxkTWVudUFsaWduID09PSAnQ0VOVEVSJykge1xuICAgIHBvc1ggPSAtY2hpbGRNZW51QXBwZWFyYW5jZS5jaGlsZE1lbnVXaWR0aCAvIDIgKyBwYXJzZUludChwYXJlbnRFbGUuc3R5bGUuaGVpZ2h0LCAxMCkgLyAyO1xuICAgIG5kaXYuc3R5bGUubGVmdCA9IHBvc1ggKyAncHgnO1xuICB9XG4gIG5kaXYuc3R5bGUudG9wID0gcG9zWSArICdweCc7XG5cbiAgLy8gbmRpdi5zdHlsZS5wb2ludGVyRXZlbnRzIGlzIG5vbmUgdG8gYXZvaWQgcmVmZXJyaW5nIGNsaWNrcyB0byBleHRyYSBhcmVhcy5cbiAgLy8gQnV0IHdlIHdhbnQgaXRzIGNoaWxkcmVuIHRvIGJlIHJlc3BvbnNpdmUsIHNvIHdlIHNldCBwb2ludGVyRXZlbnRzIHRvIGF1dG9cbiAgbmRpdi5maXJzdENoaWxkLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG5cbiAgcGFyZW50RWxlLmFwcGVuZENoaWxkKG5kaXYpO1xuICAvL3JldHVybiBuZGl2O1xufTtcblxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYWN0dWFsIERPTSBlbGVtZW50IGZyb20gdGhlIHNwZWNpZmllZCBhcHBlYXJhbmNlXG4gKiBAcGFyYW0gYnRuQXBwZWFyYW5jZVxuICogQHJldHVybnMge0hUTUxEaXZFbGVtZW50fVxuICovXG5DRG9tUGFydHNCdWlsZGVyLnByb3RvdHlwZS5idWlsZFRleHRCdXR0b24gPSBmdW5jdGlvbihidG5BcHBlYXJhbmNlKSB7XG5cbiAgdmFyIHNpemUgPSBidG5BcHBlYXJhbmNlLnNpemU7XG4gIHZhciB3aWR0aCA9IHNpemU7XG4gIHZhciBoZWlnaHQgPSBzaXplO1xuXG4gIGlmIChidG5BcHBlYXJhbmNlLndpZHRoICE9IG51bGwpIHtcbiAgICB3aWR0aCA9IGJ0bkFwcGVhcmFuY2Uud2lkdGg7XG4gIH1cblxuICBpZiAoYnRuQXBwZWFyYW5jZS5oZWlnaHQgIT0gbnVsbCkge1xuICAgIGhlaWdodCA9IGJ0bkFwcGVhcmFuY2UuaGVpZ2h0O1xuICB9XG5cblxuICB2YXIgZGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gIC8vYm9yZGVyXG4gIHZhciBib3JkZXJXaWR0aCA9IGJ0bkFwcGVhcmFuY2UuYm9yZGVyV2lkdGg7XG4gIHZhciBib3JkZXJSYWRpdXMgPSBidG5BcHBlYXJhbmNlLmJvcmRlclJhZGl1cztcblxuICB2YXIgYm9yZGVyQ29sb3JEZWZhdWx0ID0gYnRuQXBwZWFyYW5jZS5ib3JkZXJDb2xvckRlZmF1bHQ7XG4gIHZhciBib3JkZXJDb2xvckZvY3VzZWQgPSBidG5BcHBlYXJhbmNlLmJvcmRlckNvbG9yRm9jdXNlZDtcbiAgdmFyIGJvcmRlckNvbG9ySG92ZXJlZCA9IGJ0bkFwcGVhcmFuY2UuYm9yZGVyQ29sb3JIb3ZlcmVkO1xuICB2YXIgYm9yZGVyQ29sb3JQcmVzc2VkID0gYnRuQXBwZWFyYW5jZS5ib3JkZXJDb2xvclByZXNzZWQ7XG5cbiAgdmFyIGJvcmRlclN0eWxlRGVmYXVsdCA9IGJ0bkFwcGVhcmFuY2UuYm9yZGVyU3R5bGVEZWZhdWx0O1xuICB2YXIgYm9yZGVyU3R5bGVGb2N1c2VkID0gYnRuQXBwZWFyYW5jZS5ib3JkZXJTdHlsZUZvY3VzZWQ7XG4gIHZhciBib3JkZXJTdHlsZUhvdmVyZWQgPSBidG5BcHBlYXJhbmNlLmJvcmRlclN0eWxlSG92ZXJlZDtcbiAgdmFyIGJvcmRlclN0eWxlUHJlc3NlZCA9IGJ0bkFwcGVhcmFuY2UuYm9yZGVyU3R5bGVQcmVzc2VkO1xuXG4gIC8vYmFja2dyb3VuZFxuICB2YXIgYmFja2dyb3VuZENvbG9yRGVmYXVsdCA9IGJ0bkFwcGVhcmFuY2UuYmFja2dyb3VuZENvbG9yRGVmYXVsdDtcbiAgdmFyIGJhY2tncm91bmRDb2xvckZvY3VzZWQgPSBidG5BcHBlYXJhbmNlLmJhY2tncm91bmRDb2xvckZvY3VzZWQ7XG4gIHZhciBiYWNrZ3JvdW5kQ29sb3JIb3ZlcmVkID0gYnRuQXBwZWFyYW5jZS5iYWNrZ3JvdW5kQ29sb3JIb3ZlcmVkO1xuICB2YXIgYmFja2dyb3VuZENvbG9yUHJlc3NlZCA9IGJ0bkFwcGVhcmFuY2UuYmFja2dyb3VuZENvbG9yUHJlc3NlZDtcblxuICB2YXIgYmFja2dyb3VuZEJveFNoYWRvdyA9IGJ0bkFwcGVhcmFuY2UuYmFja2dyb3VuZEJveFNoYWRvdztcblxuICB2YXIgZmEgPSBidG5BcHBlYXJhbmNlLmZhO1xuXG4gIC8vY2FwdGlvblxuICB2YXIgY2FwdGlvbiA9IGJ0bkFwcGVhcmFuY2UuY2FwdGlvbjtcbiAgdmFyIGJ0bkltYWdlRGVmYXVsdCA9IGJ0bkFwcGVhcmFuY2UuaW1hZ2VEZWZhdWx0O1xuICB2YXIgYnRuSW1hZ2VGb2N1c2VkID0gYnRuQXBwZWFyYW5jZS5pbWFnZUZvY3VzZWQ7XG4gIHZhciBidG5JbWFnZUhvdmVyZWQgPSBidG5BcHBlYXJhbmNlLmltYWdlSG92ZXJlZDtcbiAgdmFyIGJ0bkltYWdlUHJlc3NlZCA9IGJ0bkFwcGVhcmFuY2UuaW1hZ2VQcmVzc2VkO1xuXG4gIC8vcHJldmVudCB0byBjYXRjaCBtb3VzZSBldmVudHNcbiAgaWYgKGJ0bkltYWdlRGVmYXVsdCkge1xuICAgIGJ0bkltYWdlRGVmYXVsdC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICB9XG4gIGlmIChidG5JbWFnZUZvY3VzZWQpIHtcbiAgICBidG5JbWFnZUZvY3VzZWQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgfVxuICBpZiAoYnRuSW1hZ2VIb3ZlcmVkKSB7XG4gICAgYnRuSW1hZ2VIb3ZlcmVkLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gIH1cbiAgaWYgKGJ0bkltYWdlUHJlc3NlZCkge1xuICAgIGJ0bkltYWdlUHJlc3NlZC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICB9XG5cbiAgdmFyIF9jYXB0aW9uQ29sb3JEZWZhdWx0ID0gYnRuQXBwZWFyYW5jZS5jYXB0aW9uQ29sb3JEZWZhdWx0O1xuICB2YXIgY2FwdGlvbkNvbG9yRm9jdXNlZCA9IGJ0bkFwcGVhcmFuY2UuY2FwdGlvbkNvbG9yRm9jdXNlZDtcbiAgdmFyIGNhcHRpb25Db2xvckhvdmVyZWQgPSBidG5BcHBlYXJhbmNlLmNhcHRpb25Db2xvckhvdmVyZWQ7XG4gIHZhciBjYXB0aW9uQ29sb3JQcmVzc2VkID0gYnRuQXBwZWFyYW5jZS5jYXB0aW9uQ29sb3JQcmVzc2VkO1xuXG4gIHZhciBjYXB0aW9uU2hpZnRZcHggPSBidG5BcHBlYXJhbmNlLmNhcHRpb25TaGlmdFlweDtcbiAgdmFyIGNhcHRpb25Gb250UmF0aW8gPSBidG5BcHBlYXJhbmNlLmNhcHRpb25Gb250UmF0aW87XG5cbiAgLy9TZXQgd2hldGhlciBwYXJlbnQgZnJhbWUgaGFzIGZvY3VzIG9yIG5vdCBpbnRlcm5hbGx5XG4gIGRpdkVsZW1lbnQuX2hhc0ZyYW1lRm9jdXMgPSBmYWxzZTtcblxuICAvL1NldCB3aGV0aGVyIG1vdXNlIGlzIHByZXNzaW5nIG9yIG5vdCBpbnRlcm5hbGx5LlxuICBkaXZFbGVtZW50Ll9pc01vdXNlRG93biA9IGZhbHNlO1xuXG4gIGRpdkVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXG4gIGRpdkVsZW1lbnQuc3R5bGUudG9wID0gJzBweCc7XG4gIGRpdkVsZW1lbnQuc3R5bGUubGVmdCA9ICcwcHgnO1xuICBkaXZFbGVtZW50LnN0eWxlLndpZHRoID0gKHdpZHRoKSArICdweCc7XG4gIGRpdkVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gKGhlaWdodCkgKyAncHgnO1xuXG4gIGlmIChidG5BcHBlYXJhbmNlLmN1cnNvcikge1xuICAgIGRpdkVsZW1lbnQuc3R5bGUuY3Vyc29yID0gYnRuQXBwZWFyYW5jZS5jdXJzb3I7XG4gIH0gZWxzZSB7XG4gICAgZGl2RWxlbWVudC5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gIH1cbiAgZGl2RWxlbWVudC5zdHlsZS5tYXJnaW4gPSAnMHB4JztcbiAgZGl2RWxlbWVudC5zdHlsZS5wYWRkaW5nID0gJzBweCc7XG4gIC8vYWRkZWQgZm9yIHByZXZlbnRpbmcgYm9vdHN0cmFwLmNzcyBwb2xsdXRpb25cbiAgZGl2RWxlbWVudC5zdHlsZS5ib3hTaXppbmcgPSAnY29udGVudC1ib3gnO1xuICBkaXZFbGVtZW50LnN0eWxlLmZvbnRGYW1pbHkgPSAnc2Fucy1zZXJpZic7XG5cbiAgZGl2RWxlbWVudC5vbm1vdXNlZG93biA9IGZ1bmN0aW9uKGUpIHtcbiAgICBkaXZFbGVtZW50Ll9pc01vdXNlRG93biA9IHRydWU7XG4gICAgZGl2RWxlbWVudC5faGFuZGxlRm9jdXNEcmF3aW5nKCdvbm1vdXNlZG93bicpO1xuICB9O1xuXG4gIGRpdkVsZW1lbnQub25tb3VzZW91dCA9IGZ1bmN0aW9uKGUpIHtcbiAgICBkaXZFbGVtZW50Ll9pc01vdXNlRG93biA9IGZhbHNlO1xuICAgIGRpdkVsZW1lbnQuX2hhbmRsZUZvY3VzRHJhd2luZygnb25tb3VzZW91dCcpO1xuICB9O1xuXG4gIGRpdkVsZW1lbnQub25tb3VzZW92ZXIgPSBmdW5jdGlvbihlKSB7XG4gICAgZGl2RWxlbWVudC5faGFuZGxlSG92ZXJEcmF3aW5nKCk7XG4gIH07XG5cbiAgZGl2RWxlbWVudC5vbm1vdXNldXAgPSBmdW5jdGlvbihlKSB7XG4gICAgZGl2RWxlbWVudC5faXNNb3VzZURvd24gPSBmYWxzZTtcbiAgICBkaXZFbGVtZW50Ll9oYW5kbGVGb2N1c0RyYXdpbmcoJ29ubW91c2V1cCcpO1xuICB9O1xuXG5cbiAgLyoqXG4gICAqIFRoZSBwYXJlbnQgbm90aWZpZXMgdGhhdCB0aGUgcGFyZW50J3MgZnJhbWUgZ290IGZvY3VzXG4gICAqL1xuICBkaXZFbGVtZW50Ll9vblRha2VGb2N1cyA9IGZ1bmN0aW9uKCkge1xuICAgIGRpdkVsZW1lbnQuX2hhc0ZyYW1lRm9jdXMgPSB0cnVlO1xuICAgIGRpdkVsZW1lbnQuX2hhbmRsZUZvY3VzRHJhd2luZygnX29uVGFrZUZvY3VzJyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoZSBwYXJlbnQgbm90aWZpZXMgdGhhdCB0aGUgcGFyZW50J3MgZnJhbWUgaGFzIGxvc3QgZm9jdXNcbiAgICovXG4gIGRpdkVsZW1lbnQuX29uUmVsZWFzZUZvY3VzID0gZnVuY3Rpb24oKSB7XG5cbiAgICBkaXZFbGVtZW50Ll9oYXNGcmFtZUZvY3VzID0gZmFsc2U7XG4gICAgZGl2RWxlbWVudC5faGFuZGxlRm9jdXNEcmF3aW5nKCdfb25SZWxlYXNlRm9jdXMnKTtcbiAgfTtcblxuICAvKipcbiAgICogIFRvIGhhbmRsZSAyeDIgbWF0cml4LlxuICAgKiAgKF9oYXNGcmFtZUZvY3VzIHRydWUvZmFsc2UgeCBfaXNNb3VzZURvd24gdHJ1ZS9mYWxzZSlcbiAgICovXG4gIGRpdkVsZW1lbnQuX2hhbmRsZUZvY3VzRHJhd2luZyA9IGZ1bmN0aW9uKGV2dE5hbWUpIHtcbiAgICBpZiAoZGl2RWxlbWVudC5faGFzRnJhbWVGb2N1cykge1xuICAgICAgLy9XaGVuIHRoaXMgZWxlbWVudCBoYXMgZm9jdXNcblxuICAgICAgaWYgKGRpdkVsZW1lbnQuX2lzTW91c2VEb3duKSB7XG4gICAgICAgIC8vYm9yZGVyXG4gICAgICAgIGRpdkVsZW1lbnQuc3R5bGUuYm9yZGVyQ29sb3IgPSBib3JkZXJDb2xvclByZXNzZWQ7XG4gICAgICAgIGRpdkVsZW1lbnQuc3R5bGUuYm9yZGVyU3R5bGUgPSBib3JkZXJTdHlsZVByZXNzZWQ7XG5cbiAgICAgICAgLy9iYWNrZ3JvdW5kXG4gICAgICAgIGRpdkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYmFja2dyb3VuZENvbG9yUHJlc3NlZDtcblxuICAgICAgICAvL2NhcHRpb25cbiAgICAgICAgZGl2RWxlbWVudC5zdHlsZS5jb2xvciA9IGNhcHRpb25Db2xvclByZXNzZWQ7XG5cbiAgICAgICAgaWYgKGJ0bkltYWdlUHJlc3NlZCkge1xuICAgICAgICAgIC8vIGRpdkVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgLy8gZGl2RWxlbWVudC5hcHBlbmRDaGlsZChidG5JbWFnZVByZXNzZWQpO1xuICAgICAgICAgIHVwZGF0ZUltYWdlKGJ0bkltYWdlUHJlc3NlZCwgZGl2RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vYm9yZGVyXG4gICAgICAgIGRpdkVsZW1lbnQuc3R5bGUuYm9yZGVyQ29sb3IgPSBib3JkZXJDb2xvckZvY3VzZWQ7XG4gICAgICAgIGRpdkVsZW1lbnQuc3R5bGUuYm9yZGVyU3R5bGUgPSBib3JkZXJTdHlsZUZvY3VzZWQ7XG5cbiAgICAgICAgLy9iYWNrZ3JvdW5kXG4gICAgICAgIGRpdkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYmFja2dyb3VuZENvbG9yRm9jdXNlZDtcblxuICAgICAgICAvL2NhcHRpb25cbiAgICAgICAgZGl2RWxlbWVudC5zdHlsZS5jb2xvciA9IGNhcHRpb25Db2xvckZvY3VzZWQ7XG5cbiAgICAgICAgaWYgKGJ0bkltYWdlRm9jdXNlZCkge1xuICAgICAgICAgIC8vIGRpdkVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgLy8gZGl2RWxlbWVudC5hcHBlbmRDaGlsZChidG5JbWFnZUZvY3VzZWQpO1xuICAgICAgICAgIHVwZGF0ZUltYWdlKGJ0bkltYWdlRm9jdXNlZCwgZGl2RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvL1doZW4gdGhpcyBlbGVtZW50IGRvZXNuJ3QgaGF2ZSBmb2N1c1xuICAgICAgaWYgKGRpdkVsZW1lbnQuX2lzTW91c2VEb3duKSB7XG4gICAgICAgIC8vYm9yZGVyXG4gICAgICAgIGRpdkVsZW1lbnQuc3R5bGUuYm9yZGVyQ29sb3IgPSBib3JkZXJDb2xvclByZXNzZWQ7XG4gICAgICAgIGRpdkVsZW1lbnQuc3R5bGUuYm9yZGVyU3R5bGUgPSBib3JkZXJTdHlsZVByZXNzZWQ7XG5cbiAgICAgICAgLy9iYWNrZ3JvdW5kXG4gICAgICAgIGRpdkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYmFja2dyb3VuZENvbG9yUHJlc3NlZDtcblxuICAgICAgICAvL2NhcHRpb25cbiAgICAgICAgZGl2RWxlbWVudC5zdHlsZS5jb2xvciA9IGNhcHRpb25Db2xvclByZXNzZWQ7XG5cbiAgICAgICAgaWYgKGJ0bkltYWdlUHJlc3NlZCkge1xuICAgICAgICAgIC8vIGRpdkVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgLy8gZGl2RWxlbWVudC5hcHBlbmRDaGlsZChidG5JbWFnZVByZXNzZWQpO1xuICAgICAgICAgIHVwZGF0ZUltYWdlKGJ0bkltYWdlUHJlc3NlZCwgZGl2RWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICAvL2JvcmRlclxuICAgICAgICBkaXZFbGVtZW50LnN0eWxlLmJvcmRlckNvbG9yID0gYm9yZGVyQ29sb3JEZWZhdWx0O1xuICAgICAgICBkaXZFbGVtZW50LnN0eWxlLmJvcmRlclN0eWxlID0gYm9yZGVyU3R5bGVEZWZhdWx0O1xuXG4gICAgICAgIC8vYmFja2dyb3VuZFxuICAgICAgICBkaXZFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGJhY2tncm91bmRDb2xvckRlZmF1bHQ7XG5cbiAgICAgICAgLy9jYXB0aW9uXG4gICAgICAgIGRpdkVsZW1lbnQuc3R5bGUuY29sb3IgPSBfY2FwdGlvbkNvbG9yRGVmYXVsdDtcblxuICAgICAgICBpZiAoYnRuSW1hZ2VEZWZhdWx0KSB7XG4gICAgICAgICAgLy8gZGl2RWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAvLyBkaXZFbGVtZW50LmFwcGVuZENoaWxkKGJ0bkltYWdlRGVmYXVsdCk7XG4gICAgICAgICAgdXBkYXRlSW1hZ2UoYnRuSW1hZ2VEZWZhdWx0LCBkaXZFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBkaXZFbGVtZW50Ll9oYW5kbGVIb3ZlckRyYXdpbmcgPSBmdW5jdGlvbigpIHtcblxuICAgIGlmIChkaXZFbGVtZW50Ll9oYXNGcmFtZUZvY3VzKSB7XG4gICAgICAvL1doZW4gdGhpcyBlbGVtZW50IGhhcyBmb2N1c1xuICAgIH0gZWxzZSB7XG4gICAgICAvL1doZW4gdGhpcyBlbGVtZW50IGRvZXNuJ3QgaGF2ZSBmb2N1c1xuICAgIH1cbiAgICAvL2JvcmRlclxuICAgIGlmIChib3JkZXJDb2xvckhvdmVyZWQpIHtcbiAgICAgIGRpdkVsZW1lbnQuc3R5bGUuYm9yZGVyQ29sb3IgPSBib3JkZXJDb2xvckhvdmVyZWQ7XG4gICAgfVxuICAgIGlmIChib3JkZXJTdHlsZUhvdmVyZWQpIHtcbiAgICAgIGRpdkVsZW1lbnQuc3R5bGUuYm9yZGVyU3R5bGUgPSBib3JkZXJTdHlsZUhvdmVyZWQ7XG4gICAgfVxuXG4gICAgLy9iYWNrZ3JvdW5kXG4gICAgaWYgKGJhY2tncm91bmRDb2xvckhvdmVyZWQpIHtcbiAgICAgIGRpdkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYmFja2dyb3VuZENvbG9ySG92ZXJlZDtcbiAgICB9XG5cbiAgICBpZiAoY2FwdGlvbkNvbG9ySG92ZXJlZCkge1xuICAgICAgLy9jYXB0aW9uXG4gICAgICBkaXZFbGVtZW50LnN0eWxlLmNvbG9yID0gY2FwdGlvbkNvbG9ySG92ZXJlZDtcbiAgICB9XG4gICAgaWYgKGJ0bkltYWdlSG92ZXJlZCkge1xuICAgICAgLy8gZGl2RWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgIC8vIGRpdkVsZW1lbnQuYXBwZW5kQ2hpbGQoYnRuSW1hZ2VIb3ZlcmVkKTtcbiAgICAgIHVwZGF0ZUltYWdlKGJ0bkltYWdlSG92ZXJlZCwgZGl2RWxlbWVudCk7XG4gICAgfVxuICB9O1xuICBkaXZFbGVtZW50LnN0eWxlLnBhZGRpbmcgPSAnMHB4JztcblxuICBkaXZFbGVtZW50LnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICBkaXZFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gKGhlaWdodCAqIGNhcHRpb25Gb250UmF0aW8pICsgJ3B4JztcblxuICBkaXZFbGVtZW50LnN0eWxlLmxpbmVIZWlnaHQgPSAoaGVpZ2h0KSArICdweCc7XG5cbiAgZGl2RWxlbWVudC5zdHlsZS5ib3JkZXJXaWR0aCA9ICcxcHgnO1xuXG4gIGlmIChib3JkZXJXaWR0aCAhPSBudWxsKSB7XG4gICAgZGl2RWxlbWVudC5zdHlsZS5ib3JkZXJXaWR0aCA9IGJvcmRlcldpZHRoICsgJ3B4JztcbiAgfVxuXG4gIGlmIChiYWNrZ3JvdW5kQm94U2hhZG93ICE9IG51bGwpIHtcbiAgICBkaXZFbGVtZW50LnN0eWxlLmJveFNoYWRvdyA9IGJhY2tncm91bmRCb3hTaGFkb3c7XG4gIH1cblxuICBkaXZFbGVtZW50LnN0eWxlLmJvcmRlclJhZGl1cyA9IChib3JkZXJSYWRpdXMgKyBwYXJzZUludChkaXZFbGVtZW50LnN0eWxlLmJvcmRlcldpZHRoKSkgKyAncHgnO1xuXG4gIHZhciBjaGlsZE1vZGUgPSB0cnVlO1xuXG4gIGlmIChjaGlsZE1vZGUgJiYgYnRuSW1hZ2VEZWZhdWx0KSB7XG4gICAgLy8gZGl2RWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICAvLyBkaXZFbGVtZW50LmFwcGVuZENoaWxkKGJ0bkltYWdlRGVmYXVsdCk7XG4gICAgdXBkYXRlSW1hZ2UoYnRuSW1hZ2VEZWZhdWx0LCBkaXZFbGVtZW50KTtcbiAgfSBlbHNlIGlmIChjaGlsZE1vZGUgJiYgY2FwdGlvbikge1xuXG4gICAgdmFyIHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgLy9zcGFuLnN0eWxlLnBvc2l0aW9uPSdhYnNvbHV0ZSc7XG4gICAgc3Bhbi5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBzcGFuLnN0eWxlLm1hcmdpblRvcCA9IGNhcHRpb25TaGlmdFlweCArICdweCc7XG4gICAgc3Bhbi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG4gICAgc3Bhbi5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICBzcGFuLnN0eWxlLmZvbnRGYW1pbHkgPSAnc2Fucy1zZXJpZic7XG4gICAgc3Bhbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjYXB0aW9uKSk7XG4gICAgZGl2RWxlbWVudC5hcHBlbmRDaGlsZChzcGFuKTtcblxuICB9IGVsc2UgaWYgKGNoaWxkTW9kZSAmJiBmYSkge1xuXG4gICAgdmFyIHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgc3Bhbi5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgIHNwYW4uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgc3Bhbi5zdHlsZS5tYXJnaW5Ub3AgPSBjYXB0aW9uU2hpZnRZcHggKyAncHgnO1xuICAgIHNwYW4uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICAgIHNwYW4uc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgc3Bhbi5zdHlsZS5mb250RmFtaWx5ID0gJ3NhbnMtc2VyaWYnO1xuICAgIHNwYW4uaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiJyArIGZhICsgJ1wiPjwvaT4nO1xuICAgIGRpdkVsZW1lbnQuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gIH0gZWxzZSBpZiAoIWNoaWxkTW9kZSAmJiBjYXB0aW9uKSB7XG4gICAgZGl2RWxlbWVudC5zdHlsZS5wYWRkaW5nVG9wID0gY2FwdGlvblNoaWZ0WXB4ICsgJ3B4JztcbiAgICBkaXZFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNhcHRpb24pKTtcbiAgfVxuXG4gIGRpdkVsZW1lbnQuX2hhbmRsZUZvY3VzRHJhd2luZygpO1xuICByZXR1cm4gZGl2RWxlbWVudDtcblxufTtcblxuLy8gRG9uJ3QgdXNlIGlubmVySFRNTD0nJyBiZWNhdXNlIHRoZXJlIG1heSBiZSBhIGNoaWxkIGJlbG93IHRoaXMgJ2ltZycgZWxlbWVudC5cbi8vIEEgY2hpbGQgdGhhdCBtYXkgYmUgYSBjaGlsZCBpcyBhIGNoaWxkTWVudS5cbmZ1bmN0aW9uIHVwZGF0ZUltYWdlKGltYWdlLCBwYXJlbnRFbGVtZW50KSB7XG4gIHZhciBpbWdzID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbWcnKTtcbiAgaWYgKHBhcmVudEVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgIHBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGltYWdlLCBwYXJlbnRFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICB9IGVsc2Uge1xuICAgIHBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaW1ncy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpbWcgPSBpbWdzW2ldO1xuICAgIGlmIChpbWFnZSAhPT0gaW1nKSB7XG4gICAgICBwYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGltZyk7XG4gICAgfVxuICB9XG59XG5cbi8vKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLVxuXG5cbi8qKlxuICogZW5kIG9mIENEb21QYXJ0c0J1aWxkZXIgY2xhc3NcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBDRG9tUGFydHNCdWlsZGVyO1xuIiwidmFyIENEb21QYXJ0c0J1aWxkZXIgPSByZXF1aXJlKCcuL0NEb21QYXJ0c0J1aWxkZXIuanMnKTtcbnZhciBDRnJhbWVDb21wb25lbnQgPSByZXF1aXJlKCcuL0NGcmFtZUNvbXBvbmVudC5qcycpO1xuXG4vKipcbiAqIENGcmFtZUFwcGVhcmFuY2UgY2xhc3M8YnI+XG4gKiBBcHBlYXJhbmNlIE1vZGVsIENsYXNzIGZvciBGcmFtZVxuICpcbiAqL1xuZnVuY3Rpb24gQ0ZyYW1lQXBwZWFyYW5jZSgpIHtcblxuICB2YXIgbWUgPSB0aGlzO1xuXG4gIHRoaXMuc2hvd1RpdGxlQmFyID0gdHJ1ZTtcbiAgdGhpcy5zaG93Q2xvc2VCdXR0b24gPSB0cnVlO1xuICB0aGlzLnRpdGxlQmFyQ2FwdGlvbiA9ICcnO1xuICB0aGlzLnRpdGxlQmFyQ2FwdGlvbkZvbnRTaXplID0gJzEycHgnO1xuICB0aGlzLnRpdGxlQmFyQ2FwdGlvbkZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gIHRoaXMudGl0bGVCYXJIZWlnaHQgPSAnMjRweCc7XG4gIHRoaXMudXNlSWZyYW1lID0gZmFsc2U7XG4gIHRoaXMudXNlRnJhbWUgPSB0cnVlO1xuXG4gIHRoaXMudGl0bGVCYXJDbGFzc05hbWVEZWZhdWx0PW51bGw7XG4gIHRoaXMudGl0bGVCYXJDbGFzc05hbWVGb2N1c2VkPW51bGw7XG5cbiAgdGhpcy5zZXRVc2VJRnJhbWUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIG1lLnVzZUlmcmFtZSA9IHZhbHVlO1xuICAgIG1lLnVzZUZyYW1lID0gIXZhbHVlO1xuICAgIHJldHVybiBtZTtcbiAgfTtcblxuXG4gIC8qKlxuICAgKiBUaGUgcG9zaXRpb24gZnJvbSB0aGUgbGVmdCBzaWRlIG9mIHRoZSBjYXB0aW9uLiBJZiB0aGlzIHZhbHVlIGlzIG51bGwsIGNhcHRpb24gd2lsbCBiZSBjZW50ZXJlZC5cbiAgICovXG4gIHRoaXMudGl0bGVCYXJDYXB0aW9uTGVmdE1hcmdpbiA9ICc1cHgnO1xuXG4gIHRoaXMudGl0bGVCYXJDb2xvckRlZmF1bHQgPSBudWxsO1xuICB0aGlzLnRpdGxlQmFyQ29sb3JGb2N1c2VkID0gbnVsbDtcbiAgdGhpcy50aXRsZUJhckNhcHRpb25Db2xvckRlZmF1bHQgPSAnJztcbiAgdGhpcy50aXRsZUJhckNhcHRpb25Db2xvckZvY3VzZWQgPSAnJztcbiAgdGhpcy50aXRsZUJhckNhcHRpb25UZXh0U2hhZG93ID0gJzAgMXB4IDAgcmdiYSgyNTUsMjU1LDI1NSwuNyknO1xuICB0aGlzLnRpdGxlQmFyQ2FwdGlvblRleHRBbGlnbiA9ICdjZW50ZXInO1xuXG4gIHRoaXMudGl0bGVCYXJCb3JkZXJCb3R0b21EZWZhdWx0ID0gJzFweCBzb2xpZCByZ2JhKDAsMCwwLDAuMiknO1xuICB0aGlzLnRpdGxlQmFyQm9yZGVyQm90dG9tRm9jdXNlZCA9IG51bGw7XG5cbiAgdGhpcy5mcmFtZUJvcmRlclJhZGl1cyA9ICc2cHgnO1xuXG4gIHRoaXMuZnJhbWVCb3JkZXJXaWR0aERlZmF1bHQgPSAnMXB4JztcbiAgdGhpcy5mcmFtZUJvcmRlcldpZHRoRm9jdXNlZCA9IHRoaXMuZnJhbWVCb3JkZXJXaWR0aERlZmF1bHQ7XG5cbiAgdGhpcy5mcmFtZUJvcmRlckNvbG9yRGVmYXVsdCA9ICdyZ2JhKDEsIDEsIDEsIDAuMiknO1xuICB0aGlzLmZyYW1lQm9yZGVyQ29sb3JGb2N1c2VkID0gdGhpcy5mcmFtZUJvcmRlckNvbG9yRGVmYXVsdDtcblxuICB0aGlzLmZyYW1lQm9yZGVyU3R5bGUgPSAnc29saWQnO1xuICB0aGlzLmZyYW1lQm94U2hhZG93ID0gJzJweCAzcHggMTZweCByZ2JhKDAsMCwwLC42KSc7XG4gIHRoaXMuZnJhbWVCYWNrZ3JvdW5kQ29sb3IgPSAndHJhbnNwYXJlbnQnO1xuXG4gIHRoaXMuX3BhcnRzQnVpbGRlciA9IG51bGw7XG5cbiAgdGhpcy5mcmFtZUNvbXBvbmVudHMgPSBbXTtcblxuICB0aGlzLmZyYW1lSGVpZ2h0QWRqdXN0ID0gMTtcblxuICB0aGlzLnJlc2l6ZUFyZWFXaWR0aCA9IDIwO1xuICB0aGlzLnJlc2l6ZUFyZWFIZWlnaHQgPSAyMDtcbiAgdGhpcy5yZXNpemVBcmVhT2Zmc2V0ID0gMDtcbiAgdGhpcy5yZXNpemVBcmVhVmlzaWJsZSA9IGZhbHNlO1xuXG4gIHRoaXMuZ2V0RnJhbWVJbm5lckJvcmRlclJhZGl1cyA9IGZ1bmN0aW9uKHJlZiwgaGFzRm9jdXMpIHtcblxuICAgIGlmICghcmVmKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKGhhc0ZvY3VzKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBmcmFtZUFwcGVhcmFuY2U6IG1lLFxuICAgICAgICBpbm5lckJvcmRlclJhZGl1czogKHBhcnNlSW50KHJlZi5mcmFtZUJvcmRlclJhZGl1cywgMTApIC0gcGFyc2VJbnQocmVmLmZyYW1lQm9yZGVyV2lkdGhGb2N1c2VkLCAxMCkpICsgJ3B4J1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGZyYW1lQXBwZWFyYW5jZTogbWUsXG4gICAgICBpbm5lckJvcmRlclJhZGl1czogKHBhcnNlSW50KHJlZi5mcmFtZUJvcmRlclJhZGl1cywgMTApIC0gcGFyc2VJbnQocmVmLmZyYW1lQm9yZGVyV2lkdGhEZWZhdWx0LCAxMCkpICsgJ3B4J1xuICAgIH07XG4gIH07XG5cblxuICB0aGlzLm9uSW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgLy9BZGQgY2xvc2UgYnV0dG9uIGlmIG5lZWRlZFxuICAgIGlmIChtZS5zaG93Q2xvc2VCdXR0b24pIHtcbiAgICAgIHZhciBwYXJ0c0J1aWxkZXIgPSBtZS5nZXRQYXJ0c0J1aWxkZXIoKSxcbiAgICAgICAgY3Jvc3NNYXJrMCA9ICdcXHUyNzRjJyxcbiAgICAgICAgY3Jvc3NNYXJrMSA9ICdcXHUyNzE2JyxcbiAgICAgICAgY3Jvc3NNYXJrMiA9ICdcXHUyNzRlJztcblxuXG4gICAgICB2YXIgYnRuQXBwZWFyYW5jZSA9IHBhcnRzQnVpbGRlci5idWlsZFRleHRCdXR0b25BcHBlYXJhbmNlKCk7XG5cbiAgICAgIGJ0bkFwcGVhcmFuY2Uuc2l6ZSA9IDE0O1xuICAgICAgYnRuQXBwZWFyYW5jZS5jYXB0aW9uU2hpZnRZcHggPSAwO1xuICAgICAgYnRuQXBwZWFyYW5jZS5jYXB0aW9uRm9udFJhdGlvID0gMS4wO1xuICAgICAgYnRuQXBwZWFyYW5jZS5ib3JkZXJSYWRpdXMgPSAyO1xuICAgICAgYnRuQXBwZWFyYW5jZS5iYWNrZ3JvdW5kQ29sb3JQcmVzc2VkID0gJ3RyYW5zcGFyZW50JztcbiAgICAgIGJ0bkFwcGVhcmFuY2UuYmFja2dyb3VuZENvbG9yRGVmYXVsdCA9ICd0cmFuc3BhcmVudCc7XG4gICAgICBidG5BcHBlYXJhbmNlLmNhcHRpb24gPSBjcm9zc01hcmsxO1xuXG4gICAgICBidG5BcHBlYXJhbmNlLmNhcHRpb25Db2xvckRlZmF1bHQgPSAnZ3JheSc7XG4gICAgICBidG5BcHBlYXJhbmNlLmNhcHRpb25Db2xvckZvY3VzZWQgPSAnZ3JheSc7XG4gICAgICBidG5BcHBlYXJhbmNlLmNhcHRpb25Db2xvckhvdmVyZWQgPSAnc2lsdmVyJztcbiAgICAgIGJ0bkFwcGVhcmFuY2UuY2FwdGlvbkNvbG9yUHJlc3NlZCA9ICdibGFjayc7XG5cbiAgICAgIGJ0bkFwcGVhcmFuY2UuYm9yZGVyV2lkdGggPSAwO1xuICAgICAgYnRuQXBwZWFyYW5jZS5ib3JkZXJDb2xvckRlZmF1bHQgPSAnI2FhYWFhYSc7XG4gICAgICBidG5BcHBlYXJhbmNlLmJvcmRlclN0eWxlID0gJ3NvbGlkJztcblxuICAgICAgdmFyIGNsb3NlQnRuRWxlID0gcGFydHNCdWlsZGVyLmJ1aWxkVGV4dEJ1dHRvbihidG5BcHBlYXJhbmNlKTtcbiAgICAgIHZhciBlbGVMZWZ0ID0gLTEwO1xuICAgICAgdmFyIGVsZVRvcCA9IC0xODtcbiAgICAgIHZhciBlbGVBbGlnbiA9ICdSSUdIVF9UT1AnO1xuXG4gICAgICAvL2Nsb3NlQnV0dG9uIGlzIGEgc3BlY2lhbCBuYW1lXG4gICAgICB2YXIgZnJhbWVDb21wb25lbnQgPSBtZS5hZGRGcmFtZUNvbXBvbmVudCgnY2xvc2VCdXR0b24nLCBjbG9zZUJ0bkVsZSwgZWxlTGVmdCwgZWxlVG9wLCBlbGVBbGlnbik7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMub25UaXRsZUJhclN0eWxlSW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuXG4gIH07XG5cbn1cblxuXG5DRnJhbWVBcHBlYXJhbmNlLnByb3RvdHlwZS5nZXRQYXJ0c0J1aWxkZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgaWYgKG1lLl9wYXJ0c0J1aWxkZXIgPT09IG51bGwpIHtcbiAgICBtZS5fcGFydHNCdWlsZGVyID0gbmV3IENEb21QYXJ0c0J1aWxkZXIoKTtcbiAgfVxuICByZXR1cm4gbWUuX3BhcnRzQnVpbGRlcjtcbn07XG5DRnJhbWVBcHBlYXJhbmNlLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIG1lLm9uSW5pdGlhbGl6ZSgpO1xufTtcblxuLyoqXG4gKiAgQWRkIEZyYW1lQ29tcG9uZW50IGludG8gZnJhbWVcbiAqICBGcmFtZUNvbXBvbmVudCBpcyBhdHRhY2hlZCB0byBGcmFtZSBhbmQgaXQgbW92ZXMgd2l0aCBGcmFtZS5cbiAqXG4gKiBAcGFyYW0gaWRcbiAqIEBwYXJhbSBteURvbUVsZW1lbnQgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0geCAgUmVsYXRpdmUgeCBjb29kaW5hdGUgZnJvbSB0aGUgc25hcCBwb3NpdGlvbiBzcGVjaWZpZWQgYnkgYWxpZ25tZW50XG4gKiBAcGFyYW0geSAgUmVsYXRpdmUgeSBjb29kaW5hdGUgZnJvbSB0aGUgc25hcCBwb3NpdGlvbiBzcGVjaWZpZWQgYnkgYWxpZ25tZW50XG4gKiBAcGFyYW0gYWxpZ24gJ0xFRlRfVE9QJyAnQ0VOVEVSX1RPUCcgJ1JJR0hUX1RPUCcgJ0xFRlRfQ0VOVEVSJyAnQ0VOVEVSX0NFTlRFUicgJ1JJR0hUX0NFTlRFUicgJ0xFRlRfQk9UVE9NJyAnQ0VOVEVSX0JPVFRPTScgJ1JJR0hUX0JPVFRPTSdcbiAqIEByZXR1cm5zIHtDRnJhbWVDb21wb25lbnR9XG4gKlxuICovXG5DRnJhbWVBcHBlYXJhbmNlLnByb3RvdHlwZS5hZGRGcmFtZUNvbXBvbmVudCA9IGZ1bmN0aW9uKGlkLCBteURvbUVsZW1lbnQsIHgsIHksIGFsaWduLCBleHRyYSkge1xuXG4gIC8vKGlkLCBmcmFtZSwgaHRtbEVsZW1lbnQsIHgsIHksIGFsaWduKVxuICB2YXIgZnJhbWVDb21wb25lbnQgPSBuZXcgQ0ZyYW1lQ29tcG9uZW50KGlkLCBteURvbUVsZW1lbnQsIHgsIHksIGFsaWduLCBleHRyYSk7XG5cbiAgaWYgKG15RG9tRWxlbWVudC5fb25UYWtlRm9jdXMgJiYgbXlEb21FbGVtZW50Ll9vblJlbGVhc2VGb2N1cykge1xuICAgIC8vaWYgdGhpcyBET00gZWxlbWVudCBoYXMgc3BlY2lhbCBtZXRob2QgZm9yIGZvY3VzXG4gICAgLy9zZXQgZm9jdXMgY2FsbGJhY2tcbiAgICBmcmFtZUNvbXBvbmVudC5zZXRGb2N1c0NhbGxiYWNrKG15RG9tRWxlbWVudC5fb25UYWtlRm9jdXMsIG15RG9tRWxlbWVudC5fb25SZWxlYXNlRm9jdXMpO1xuICB9XG5cbiAgdGhpcy5mcmFtZUNvbXBvbmVudHMucHVzaChmcmFtZUNvbXBvbmVudCk7XG5cbiAgcmV0dXJuIGZyYW1lQ29tcG9uZW50O1xufTtcblxuXG4vLystKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy1cblxuLyoqXG4gKiAgRW5kIG9mIENGcmFtZUFwcGVhcmFuY2UgY2xhc3NcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBDRnJhbWVBcHBlYXJhbmNlO1xuIiwiLyoqXG4gKiBDRnJhbWVDb21wb25lbnQgY2xhc3NcbiAqIDxwPlxuICogV3JhcHBlZCBET00gZWxlbWVudCBsaWtlICdkaXYnIHRvIGRpc3BsYXkgYWJvdmUgdGhlIGZyYW1lPGJyPlxuICpcbiAqIGV4LkFuIG9iamVjdCBzdWNoIGFzIGNsb3NlQnV0dG9uXG4gKlxuICogQHBhcmFtIGlkXG4gKiBAcGFyYW0gZnJhbWVcbiAqIEBwYXJhbSBodG1sRWxlbWVudCBET00tZWxlbWVudFxuICogQHBhcmFtIHggcmVsYXRpdmUgeC1wb3NpdGlvbiBpbiB0aGUgZnJhbWUgcmVzcGVjdCB0byBhbGlnblxuICogQHBhcmFtIHkgcmVsYXRpdmUgeS1wb3NpdGlvbiBpbiB0aGUgZnJhbWUgcmVzcGVjdCB0byBhbGlnblxuICogQHBhcmFtIGFsaWduIHJlbGF0aXZlIGFsaWdubWVudCBpbiB0aGUgZnJhbWVcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDRnJhbWVDb21wb25lbnQoaWQsIGh0bWxFbGVtZW50LCB4LCB5LCBhbGlnbiwgZXh0cmEpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICBtZS5pZCA9IGlkO1xuICBtZS54ID0geDtcbiAgbWUueSA9IHk7XG4gIG1lLmZyYW1lID0gbnVsbDtcblxuICBtZS5fZm9jdXNUYWtpbmdDYWxsYWJjayA9IG51bGw7XG4gIG1lLl9mb2N1c1JlbGVhc2luZ0NhbGxhYmNrID0gbnVsbDtcblxuICBpZiAoYWxpZ24pIHtcbiAgICBtZS5mcmFtZUNvbXBvbmVudEFsaWduID0gYWxpZ247XG4gIH0gZWxzZSB7XG4gICAgbWUuZnJhbWVDb21wb25lbnRBbGlnbiA9IENBTElHTi5MRUZUX1RPUDtcbiAgfVxuICBtZS5odG1sRWxlbWVudCA9IGh0bWxFbGVtZW50O1xuICBtZS5odG1sRWxlbWVudC5zdHlsZS56SW5kZXggPSA1MDtcbiAgbWUuaHRtbEVsZW1lbnQuc2V0QXR0cmlidXRlKCdjb21wb25lbnQtaWQnLCBpZCk7XG5cbiAgaWYgKGV4dHJhICYmIGV4dHJhLmNoaWxkTWVudSkge1xuICAgIG1lLmNoaWxkTWVudSA9IGV4dHJhLmNoaWxkTWVudTtcbiAgfSBlbHNlIGlmIChodG1sRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuanNmcmFtZS1jaGlsZC1tZW51JykpIHtcbiAgICBtZS5jaGlsZE1lbnUgPSBodG1sRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuanNmcmFtZS1jaGlsZC1tZW51Jyk7XG4gIH1cblxufVxuXG5DRnJhbWVDb21wb25lbnQucHJvdG90eXBlLnNldEZvY3VzQ2FsbGJhY2sgPSBmdW5jdGlvbihmb2N1c1Rha2luZ0NhbGxiYWNrLCBmb2N1c1JlbGVhc2luZ0NhbGxiYWNrKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIG1lLl9mb2N1c1Rha2luZ0NhbGxhYmNrID0gZm9jdXNUYWtpbmdDYWxsYmFjaztcbiAgbWUuX2ZvY3VzUmVsZWFzaW5nQ2FsbGFiY2sgPSBmb2N1c1JlbGVhc2luZ0NhbGxiYWNrO1xufTtcblxuLyoqXG4gKiBTZXQgcGFyZW50IGZyYW1lIG9mIHRoaXMgZnJhbWVDb21wb25lbnRcbiAqIEBwYXJhbSBmcmFtZVxuICovXG5DRnJhbWVDb21wb25lbnQucHJvdG90eXBlLnNldEZyYW1lID0gZnVuY3Rpb24oZnJhbWUpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICBtZS5mcmFtZSA9IGZyYW1lO1xuICBtZS5odG1sRWxlbWVudC5wYXJlbnRPYmplY3QgPSBmcmFtZTtcbiAgbWUudXBkYXRlQWxpZ24oKTtcbn07XG5cbi8qKlxuICogUGxhY2UgdGhlIEZyYW1lQ29tcG9uZW50IHJlbGF0aXZlIHRvIHRoZSBwYXJlbnQncyBmcmFtZS5cbiAqIFJlbG9jYXRlIHJlbGF0aXZlIHRvIHBhcmVudCBmcmFtZSB3aGVuIHdpbmRvdyByZXNpemUgZXZlbnQgb2NjdXJzXG4gKi9cbkNGcmFtZUNvbXBvbmVudC5wcm90b3R5cGUudXBkYXRlQWxpZ24gPSBmdW5jdGlvbigpIHtcblxuICB2YXIgbWUgPSB0aGlzO1xuXG4gIHZhciBmcmFtZUNvbXBvbmVudEFsaWduID0gbWUuZnJhbWVDb21wb25lbnRBbGlnbjtcblxuICB2YXIgZnJhbWUgPSBtZS5mcmFtZTtcbiAgdmFyIGVsZVN0eWxlID0gbWUuaHRtbEVsZW1lbnQuc3R5bGU7XG4gIGVsZVN0eWxlLnVzZXJTZWxlY3QgPSAnbm9uZSc7XG5cbiAgdmFyIHggPSBtZS54O1xuICB2YXIgeSA9IG1lLnk7XG5cbiAgdmFyIGZyYW1lV2lkdGggPSBmcmFtZS5nZXRXaWR0aCgpO1xuICB2YXIgZnJhbWVIZWlnaHQgPSBmcmFtZS5nZXRIZWlnaHQoKTtcbiAgdmFyIGVsZVN0eWxlV2lkdGggPSBlbGVTdHlsZS53aWR0aDtcbiAgdmFyIGVsZVN0eWxlSGVpZ2h0ID0gZWxlU3R5bGUuaGVpZ2h0O1xuXG4gIGlmIChDQUxJR04uTEVGVF9UT1AgPT0gZnJhbWVDb21wb25lbnRBbGlnbikge1xuICAgIGVsZVN0eWxlLmxlZnQgPSB4ICsgJ3B4JztcbiAgICBlbGVTdHlsZS50b3AgPSB5ICsgJ3B4JztcbiAgfSBlbHNlIGlmIChDQUxJR04uSENFTlRFUl9UT1AgPT0gZnJhbWVDb21wb25lbnRBbGlnbikge1xuICAgIGVsZVN0eWxlLmxlZnQgPSAocGFyc2VJbnQoZnJhbWVXaWR0aCkgLyAyIC0gcGFyc2VJbnQoZWxlU3R5bGVXaWR0aCkgLyAyICsgeCkgKyAncHgnO1xuICAgIGVsZVN0eWxlLnRvcCA9IHkgKyAncHgnO1xuICB9IGVsc2UgaWYgKENBTElHTi5SSUdIVF9UT1AgPT0gZnJhbWVDb21wb25lbnRBbGlnbikge1xuICAgIGVsZVN0eWxlLmxlZnQgPSAocGFyc2VJbnQoZnJhbWVXaWR0aCkgLSBwYXJzZUludChlbGVTdHlsZVdpZHRoKSArIHgpICsgJ3B4JztcbiAgICBlbGVTdHlsZS50b3AgPSB5ICsgJ3B4JztcbiAgfSBlbHNlIGlmIChDQUxJR04uTEVGVF9WQ0VOVEVSID09IGZyYW1lQ29tcG9uZW50QWxpZ24pIHtcbiAgICBlbGVTdHlsZS5sZWZ0ID0geCArICdweCc7XG4gICAgZWxlU3R5bGUudG9wID0gKHBhcnNlSW50KGZyYW1lSGVpZ2h0KSAvIDIgLSBwYXJzZUludChlbGVTdHlsZUhlaWdodCkgLyAyICsgeSkgKyAncHgnO1xuICB9IGVsc2UgaWYgKENBTElHTi5IQ0VOVEVSX1ZDRU5URVIgPT0gZnJhbWVDb21wb25lbnRBbGlnbikge1xuICAgIGVsZVN0eWxlLmxlZnQgPSAocGFyc2VJbnQoZnJhbWVXaWR0aCkgLyAyIC0gcGFyc2VJbnQoZWxlU3R5bGVXaWR0aCkgLyAyICsgeCkgKyAncHgnO1xuICAgIGVsZVN0eWxlLnRvcCA9IChwYXJzZUludChmcmFtZUhlaWdodCkgLyAyIC0gcGFyc2VJbnQoZWxlU3R5bGVIZWlnaHQpIC8gMiArIHkpICsgJ3B4JztcbiAgfSBlbHNlIGlmIChDQUxJR04uUklHSFRfVkNFTlRFUiA9PSBmcmFtZUNvbXBvbmVudEFsaWduKSB7XG4gICAgZWxlU3R5bGUubGVmdCA9IChwYXJzZUludChmcmFtZVdpZHRoKSAtIHBhcnNlSW50KGVsZVN0eWxlV2lkdGgpICsgeCkgKyAncHgnO1xuICAgIGVsZVN0eWxlLnRvcCA9IChwYXJzZUludChmcmFtZUhlaWdodCkgLyAyIC0gcGFyc2VJbnQoZWxlU3R5bGVIZWlnaHQpIC8gMiArIHkpICsgJ3B4JztcbiAgfSBlbHNlIGlmIChDQUxJR04uTEVGVF9CT1RUT00gPT0gZnJhbWVDb21wb25lbnRBbGlnbikge1xuICAgIGVsZVN0eWxlLmxlZnQgPSB4ICsgJ3B4JztcbiAgICBlbGVTdHlsZS50b3AgPSAocGFyc2VJbnQoZnJhbWVIZWlnaHQpIC0gcGFyc2VJbnQoZWxlU3R5bGVIZWlnaHQpICsgeSkgKyAncHgnO1xuICB9IGVsc2UgaWYgKENBTElHTi5IQ0VOVEVSX0JPVFRPTSA9PSBmcmFtZUNvbXBvbmVudEFsaWduKSB7XG4gICAgZWxlU3R5bGUubGVmdCA9IChwYXJzZUludChmcmFtZVdpZHRoKSAvIDIgLSBwYXJzZUludChlbGVTdHlsZVdpZHRoKSAvIDIgKyB4KSArICdweCc7XG4gICAgZWxlU3R5bGUudG9wID0gKHBhcnNlSW50KGZyYW1lSGVpZ2h0KSAtIHBhcnNlSW50KGVsZVN0eWxlSGVpZ2h0KSArIHkpICsgJ3B4JztcbiAgfSBlbHNlIGlmIChDQUxJR04uUklHSFRfQk9UVE9NID09IGZyYW1lQ29tcG9uZW50QWxpZ24pIHtcbiAgICBlbGVTdHlsZS5sZWZ0ID0gKHBhcnNlSW50KGZyYW1lV2lkdGgpIC0gcGFyc2VJbnQoZWxlU3R5bGVXaWR0aCkgKyB4KSArICdweCc7XG4gICAgZWxlU3R5bGUudG9wID0gKHBhcnNlSW50KGZyYW1lSGVpZ2h0KSAtIHBhcnNlSW50KGVsZVN0eWxlSGVpZ2h0KSArIHkpICsgJ3B4JztcbiAgfVxufTtcblxuQ0ZyYW1lQ29tcG9uZW50LnByb3RvdHlwZS5oYW5kbGVUYWtpbmdGb2N1cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICBpZiAobWUuX2ZvY3VzVGFraW5nQ2FsbGFiY2spIHtcbiAgICBtZS5fZm9jdXNUYWtpbmdDYWxsYWJjaygpO1xuICB9XG59O1xuXG5DRnJhbWVDb21wb25lbnQucHJvdG90eXBlLmhhbmRsZVJlbGVhc2luZ0ZvY3VzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIGlmIChtZS5fZm9jdXNSZWxlYXNpbmdDYWxsYWJjaykge1xuICAgIG1lLl9mb2N1c1JlbGVhc2luZ0NhbGxhYmNrKCk7XG4gIH1cbn07XG5cbi8qKlxuICogZW5kIG9mIENGcmFtZUNvbXBvbmVudCBjbGFzc1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gQ0ZyYW1lQ29tcG9uZW50O1xuIiwidmFyIGluaGVyaXQgPSByZXF1aXJlKCcuLi91dGlscy9Jbmhlcml0LmpzJylcbnZhciBDVGV4dEJ1dHRvbkFwcGVhcmFuY2UgPSByZXF1aXJlKCcuL0NCdXR0b25BcHBlYXJhbmNlLmpzJyk7XG5cbmluaGVyaXQoQ0ltYWdlQnV0dG9uQXBwZWFyYW5jZSwgQ1RleHRCdXR0b25BcHBlYXJhbmNlKTtcblxuZnVuY3Rpb24gQ0ltYWdlQnV0dG9uQXBwZWFyYW5jZSgpIHtcblxuXG4gIHRoaXMuaW1hZ2VEZWZhdWx0ID0gbnVsbDtcbiAgdGhpcy5pbWFnZUhvdmVyZWQgPSBudWxsO1xuICB0aGlzLmltYWdlUHJlc3NlZCA9IG51bGw7XG4gIHRoaXMuaW1hZ2VGb2N1c2VkID0gbnVsbDtcblxuICB0aGlzLmltYWdlU3RvcmUgPSB7fTtcbn1cblxuQ0ltYWdlQnV0dG9uQXBwZWFyYW5jZS5wcm90b3R5cGUuX3NldEltYWdlID0gZnVuY3Rpb24oc3JjLCB3aWR0aCwgaGVpZ2h0KSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgdmFyIHN0b3JlZEltZ0VsZSA9IG1lLmltYWdlU3RvcmVbc3JjXTtcblxuICBpZiAoc3RvcmVkSW1nRWxlKSB7XG4gICAgcmV0dXJuIHN0b3JlZEltZ0VsZTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgaW1nRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaW1nRWxlLnNyYyA9IHNyYztcbiAgICBpZiAod2lkdGggJiYgaGVpZ2h0KSB7XG4gICAgICB2YXIgaW1nV2lkdGggPSB3aWR0aDtcbiAgICAgIHZhciBpbWdIZWlnaHQgPSBoZWlnaHQ7XG4gICAgICB2YXIgaW1nU3R5bGUgPSAnbWFyZ2luOjBweDtwYWRkaW5nOjBweDt3aWR0aDonICsgaW1nV2lkdGggKyAncHg7aGVpZ2h0OicgKyBpbWdIZWlnaHQgKyAncHgnO1xuICAgICAgaW1nRWxlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBpbWdTdHlsZSk7XG4gICAgfVxuICAgIG1lLmltYWdlU3RvcmVbc3JjXSA9IGltZ0VsZTtcblxuICAgIHJldHVybiBpbWdFbGU7XG4gIH1cbn1cbkNJbWFnZUJ1dHRvbkFwcGVhcmFuY2UucHJvdG90eXBlLnNldFNyYyA9IGZ1bmN0aW9uKG1vZGVsKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIGlmIChtb2RlbC5kZWZhdWx0KSB7XG4gICAgbWUuaW1hZ2VEZWZhdWx0ID0gbWUuX3NldEltYWdlKG1vZGVsLmRlZmF1bHQsIG1vZGVsLndpZHRoLCBtb2RlbC5oZWlnaHQpO1xuICB9XG4gIGlmIChtb2RlbC5ob3ZlcmVkKSB7XG4gICAgbWUuaW1hZ2VIb3ZlcmVkID0gbWUuX3NldEltYWdlKG1vZGVsLmhvdmVyZWQsIG1vZGVsLndpZHRoLCBtb2RlbC5oZWlnaHQpO1xuICB9XG4gIGlmIChtb2RlbC5wcmVzc2VkKSB7XG4gICAgbWUuaW1hZ2VQcmVzc2VkID0gbWUuX3NldEltYWdlKG1vZGVsLnByZXNzZWQsIG1vZGVsLndpZHRoLCBtb2RlbC5oZWlnaHQpO1xuICB9XG4gIGlmIChtb2RlbC5mb2N1c2VkKSB7XG4gICAgbWUuaW1hZ2VGb2N1c2VkID0gbWUuX3NldEltYWdlKG1vZGVsLmZvY3VzZWQsIG1vZGVsLndpZHRoLCBtb2RlbC5oZWlnaHQpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ0ltYWdlQnV0dG9uQXBwZWFyYW5jZTsiLCIvL2V4cG9ydCB7IGRlZmF1bHQgYXMgSlNGcmFtZSB9IGZyb20gJy4vSlNGcmFtZS5qcyc7XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgSlNGcmFtZTogcmVxdWlyZSgnLi9KU0ZyYW1lJylcbn1cblxuIiwicmVxdWlyZSgnLi9QcmVzZXRTdHlsZU1hdGVyaWFsLmNzcycpO1xudmFyIE9iamVjdEFzc2lnbmVyID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvT2JqZWN0QXNzaWduZXIuanMnKTtcblxuXG5mdW5jdGlvbiBnZXRTdHlsZShmQXByLCB1c2VyUGFyYW0pIHtcblxuICB2YXIgc3JjUGFyYW0gPSB7XG4gICAgYm9yZGVyOiB7XG4gICAgICBjb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICAgIHdpZHRoOiAwLFxuICAgICAgcmFkaXVzOiA2LFxuXG4gICAgfSxcbiAgICBjb250cm9sOiB7XG4gICAgICBtYXhpbWl6ZVdpdGhvdXRUaXRsZUJhcjogZmFsc2UsXG4gICAgICByZXN0b3JlS2V5OiAnRXNjYXBlJyxcbiAgICB9LFxuICAgIHRpdGxlQmFyOiB7XG4gICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgIGJhY2tncm91bmQ6ICdibGFjaycsXG4gICAgICBsZWZ0TWFyZ2luOiAyMCxcbiAgICAgIGhlaWdodDogMzAsXG4gICAgICBmb250U2l6ZTogMTIsXG4gICAgICBidXR0b25XaWR0aDogMzYsXG4gICAgICBidXR0b25IZWlnaHQ6IDE2LFxuICAgICAgYnV0dG9uQ29sb3I6ICd3aGl0ZScsXG4gICAgICBidXR0b25zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBmYTogJ2ZhcyBmYS10aW1lcycsXG4gICAgICAgICAgbmFtZTogJ2Nsb3NlQnV0dG9uJyxcbiAgICAgICAgICB2aXNpYmxlOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmYTogJ2ZhciBmYS13aW5kb3ctbWF4aW1pemUnLFxuICAgICAgICAgIG5hbWU6ICdtYXhpbWl6ZUJ1dHRvbicsXG4gICAgICAgICAgdmlzaWJsZTogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZmE6ICdmYXIgZmEtd2luZG93LXJlc3RvcmUnLFxuICAgICAgICAgIG5hbWU6ICdyZXN0b3JlQnV0dG9uJyxcbiAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZmE6ICdmYXIgZmEtd2luZG93LW1pbmltaXplJyxcbiAgICAgICAgICBuYW1lOiAnbWluaW1pemVCdXR0b24nLFxuICAgICAgICAgIHZpc2libGU6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGZhOiAnZmFzIGZhLWNhcmV0LXVwJyxcbiAgICAgICAgICBuYW1lOiAnZGVtaW5pbWl6ZUJ1dHRvbicsXG4gICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICBdLFxuICAgICAgYnV0dG9uc09uTGVmdDogW10sXG4gICAgfSxcblxuXG4gIH07XG5cbiAgdmFyIHBhcmFtID0gc3JjUGFyYW07XG5cbiAgaWYgKHVzZXJQYXJhbSkge1xuICAgIC8vcGFyYW09T2JqZWN0LmFzc2lnbih7fSxzcmNQYXJhbSwgdXNlclBhcmFtKTtcbiAgICBPYmplY3RBc3NpZ25lci5vYmplY3RBc3NpZ24oc3JjUGFyYW0sIHVzZXJQYXJhbSk7XG5cbiAgfVxuXG5cbiAgZkFwci5zaG93VGl0bGVCYXIgPSB0cnVlO1xuICBmQXByLnNob3dDbG9zZUJ1dHRvbiA9IHRydWU7XG5cbiAgZkFwci50aXRsZUJhckNhcHRpb25Gb250U2l6ZSA9IHBhcmFtLnRpdGxlQmFyLmZvbnRTaXplICsgJ3B4JzsvLycxMnB4JztcbiAgZkFwci50aXRsZUJhckNhcHRpb25Gb250V2VpZ2h0ID0gJ25vcm1hbCc7XG4gIGZBcHIudGl0bGVCYXJDYXB0aW9uTGVmdE1hcmdpbiA9IHBhcmFtLnRpdGxlQmFyLmxlZnRNYXJnaW4gKyAncHgnO1xuICBmQXByLnRpdGxlQmFyQ2FwdGlvbkNvbG9yRGVmYXVsdCA9IHBhcmFtLnRpdGxlQmFyLmNvbG9yO1xuICBmQXByLnRpdGxlQmFyQ2FwdGlvbkNvbG9yRm9jdXNlZCA9IHBhcmFtLnRpdGxlQmFyLmNvbG9yO1xuICBmQXByLnRpdGxlQmFyQ2FwdGlvblRleHRTaGFkb3cgPSBudWxsO1xuICBmQXByLnRpdGxlQmFyQ2FwdGlvblRleHRBbGlnbiA9ICdsZWZ0JztcblxuICBmQXByLnRpdGxlQmFySGVpZ2h0ID0gcGFyYW0udGl0bGVCYXIuaGVpZ2h0ICsgJ3B4JzsvLyAnNTBweCc7XG5cbiAgZkFwci50aXRsZUJhckNvbG9yRGVmYXVsdCA9IHBhcmFtLnRpdGxlQmFyLmJhY2tncm91bmQ7XG4gIGZBcHIudGl0bGVCYXJDb2xvckZvY3VzZWQgPSBwYXJhbS50aXRsZUJhci5iYWNrZ3JvdW5kO1xuXG4gIGZBcHIudGl0bGVCYXJCb3JkZXJCb3R0b21EZWZhdWx0ID0gJ3NvbGlkIDBweCAjYWFhYWFhJztcbiAgZkFwci50aXRsZUJhckJvcmRlckJvdHRvbUZvY3VzZWQgPSAnc29saWQgMHB4ICMxODgzZDcnO1xuXG4gIGZBcHIuZnJhbWVCb3JkZXJSYWRpdXMgPSBwYXJhbS5ib3JkZXIucmFkaXVzICsgJ3B4JzsvLyAnNnB4JztcblxuICAvL2JvcmRlciB3aWR0aFxuICBmQXByLmZyYW1lQm9yZGVyV2lkdGhEZWZhdWx0ID0gcGFyYW0uYm9yZGVyLndpZHRoICsgJ3B4JztcbiAgZkFwci5mcmFtZUJvcmRlcldpZHRoRm9jdXNlZCA9IHBhcmFtLmJvcmRlci53aWR0aCArICdweCc7XG5cblxuICAvL2JvcmRlciBjb2xvclxuICBmQXByLmZyYW1lQm9yZGVyQ29sb3JEZWZhdWx0ID0gcGFyYW0uYm9yZGVyLmNvbG9yO1xuICBmQXByLmZyYW1lQm9yZGVyQ29sb3JGb2N1c2VkID0gcGFyYW0uYm9yZGVyLmNvbG9yO1xuXG4gIGZBcHIuZnJhbWVCb3JkZXJTdHlsZSA9ICdzb2xpZCc7XG5cbiAgLy93aW5kb3cgc2hhZG93XG4gIGZBcHIuZnJhbWVCb3hTaGFkb3cgPSBwYXJhbS5ib3JkZXIuc2hhZG93Oy8vJzJweCAycHggMTBweCAgcmdiYSgwLCAwLCAwLCAwLjUpJztcblxuICBmQXByLmZyYW1lQmFja2dyb3VuZENvbG9yID0gJ3RyYW5zcGFyZW50JztcblxuICBmQXByLmZyYW1lQ29tcG9uZW50cyA9IG5ldyBBcnJheSgpO1xuXG4gIGZBcHIuZnJhbWVIZWlnaHRBZGp1c3QgPSAwOy8vZGVmYXVsdCBpcyAxXG5cbiAgZkFwci5nZXRUaXRsZUJhclN0eWxlID0gZnVuY3Rpb24oKSB7XG5cbiAgICBpZiAoZkFwci5mb2N1c2VkRnJhbWVPbmx5KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZUJhckNsYXNzTmFtZURlZmF1bHQ6ICcgJyxcbiAgICAgICAgdGl0bGVCYXJDbGFzc05hbWVGb2N1c2VkOiAnICdcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRpdGxlQmFyQ2xhc3NOYW1lRGVmYXVsdDogJyAnLFxuICAgICAgICB0aXRsZUJhckNsYXNzTmFtZUZvY3VzZWQ6ICcgJ1xuICAgICAgfTtcbiAgICB9XG4gIH07XG5cbiAgZkFwci5vbkluaXRpYWxpemUgPSBmdW5jdGlvbigpIHtcblxuICAgIGFsaWduQnV0dG9ucyhmQXByLCBwYXJhbSwgZmFsc2UpO1xuICAgIGFsaWduQnV0dG9ucyhmQXByLCBwYXJhbSwgdHJ1ZSk7XG5cbiAgfTtcblxuICAvL1xuXG4gIHJldHVybiBmQXByO1xufVxuXG5mdW5jdGlvbiBhbGlnbkJ1dHRvbnMoZkFwciwgcGFyYW0sIGZyb21MZWZ0KSB7XG4gIHZhciBwYXJ0c0J1aWxkZXIgPSBmQXByLmdldFBhcnRzQnVpbGRlcigpO1xuICB2YXIgcmJ0WCA9IDA7XG4gIHZhciBidXR0b25zO1xuXG4gIGlmIChmcm9tTGVmdCkge1xuICAgIGJ1dHRvbnMgPSBwYXJhbS50aXRsZUJhci5idXR0b25zT25MZWZ0O1xuXG4gIH0gZWxzZSB7XG4gICAgYnV0dG9ucyA9IHBhcmFtLnRpdGxlQmFyLmJ1dHRvbnM7XG4gIH1cblxuICBmb3IgKHZhciByYnRJZHggaW4gYnV0dG9ucykge1xuXG4gICAgdmFyIHJidFNyYyA9IGJ1dHRvbnNbcmJ0SWR4XTtcblxuICAgIHZhciByYnQgPSBwYXJ0c0J1aWxkZXIuYnVpbGRUZXh0QnV0dG9uQXBwZWFyYW5jZSgpO1xuXG4gICAgLy9jYXB0aW9uXG4gICAgcmJ0LmZhID0gcmJ0U3JjLmZhO1xuXG4gICAgcmJ0LndpZHRoID0gcGFyYW0udGl0bGVCYXIuYnV0dG9uV2lkdGg7XG4gICAgcmJ0LmhlaWdodCA9IHBhcmFtLnRpdGxlQmFyLmJ1dHRvbkhlaWdodDtcblxuICAgIHJidC5ib3JkZXJSYWRpdXMgPSAwO1xuICAgIHJidC5ib3JkZXJXaWR0aCA9IDA7XG5cbiAgICByYnQuYm9yZGVyQ29sb3JEZWZhdWx0ID0gJyNjNmM2YzYnO1xuICAgIHJidC5ib3JkZXJDb2xvckZvY3VzZWQgPSAnI2ZjNjE1Yyc7XG4gICAgcmJ0LmJvcmRlckNvbG9ySG92ZXJlZCA9IHJidC5ib3JkZXJDb2xvckZvY3VzZWQ7XG4gICAgcmJ0LmJvcmRlckNvbG9yUHJlc3NlZCA9ICcjZTY0ODQyJztcblxuICAgIHJidC5ib3JkZXJTdHlsZURlZmF1bHQgPSAnc29saWQnO1xuICAgIHJidC5ib3JkZXJTdHlsZUZvY3VzZWQgPSByYnQuYm9yZGVyU3R5bGVEZWZhdWx0O1xuICAgIHJidC5ib3JkZXJTdHlsZUhvdmVyZWQgPSByYnQuYm9yZGVyU3R5bGVEZWZhdWx0O1xuICAgIHJidC5ib3JkZXJTdHlsZVByZXNzZWQgPSByYnQuYm9yZGVyU3R5bGVEZWZhdWx0O1xuXG4gICAgLy9iYWNrZ3JvdW5kXG4gICAgcmJ0LmJhY2tncm91bmRDb2xvckRlZmF1bHQgPSAndHJhbnNwYXJlbnQnO1xuICAgIHJidC5iYWNrZ3JvdW5kQ29sb3JGb2N1c2VkID0gJ3RyYW5zcGFyZW50JztcbiAgICByYnQuYmFja2dyb3VuZENvbG9ySG92ZXJlZCA9ICd0cmFuc3BhcmVudCc7XG4gICAgcmJ0LmJhY2tncm91bmRDb2xvclByZXNzZWQgPSAndHJhbnNwYXJlbnQnO1xuXG4gICAgdmFyIGNvbG9ycyA9IGdldFN1YkNvbG9yKHBhcmFtLnRpdGxlQmFyLmJ1dHRvbkNvbG9yKTtcbiAgICByYnQuY2FwdGlvbkNvbG9yRGVmYXVsdCA9IHBhcmFtLnRpdGxlQmFyLmJ1dHRvbkNvbG9yO1xuICAgIHJidC5jYXB0aW9uQ29sb3JGb2N1c2VkID0gcGFyYW0udGl0bGVCYXIuYnV0dG9uQ29sb3I7XG4gICAgcmJ0LmNhcHRpb25Db2xvckhvdmVyZWQgPSBjb2xvcnMuaG92ZXJlZDtcbiAgICByYnQuY2FwdGlvbkNvbG9yUHJlc3NlZCA9IGNvbG9ycy5wcmVzc2VkO1xuXG4gICAgcmJ0LmNhcHRpb25TaGlmdFlweCA9IDA7XG4gICAgcmJ0LmNhcHRpb25Gb250UmF0aW8gPSAxO1xuXG4gICAgdmFyIHJidEVsZSA9IHBhcnRzQnVpbGRlci5idWlsZFRleHRCdXR0b24ocmJ0KTtcblxuICAgIGlmIChyYnRTcmMudmlzaWJsZSkge1xuICAgICAgcmJ0RWxlLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChmcm9tTGVmdCkge1xuICAgICAgICByYnRYIC09IHBhcmFtLnRpdGxlQmFyLmJ1dHRvbldpZHRoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmJ0WCArPSBwYXJhbS50aXRsZUJhci5idXR0b25XaWR0aDtcbiAgICAgIH1cbiAgICAgIHJidEVsZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuICAgIHZhciB0aXRsZUJhckhlaWdodCA9IHBhcnNlSW50KGZBcHIudGl0bGVCYXJIZWlnaHQpO1xuXG4gICAgdmFyIHJidEVsZUxlZnQgPSByYnRYO1xuXG4gICAgLy9jb21wdXRlIHZlcnRpY2FsIGNlbnRlclxuXG4gICAgdmFyIHJidEVsZVRvcCA9IC10aXRsZUJhckhlaWdodCArICh0aXRsZUJhckhlaWdodCAtIHJidC5oZWlnaHQpIC8gMjtcblxuICAgIHZhciByYnRFbGVBbGlnbjtcbiAgICBpZiAoZnJvbUxlZnQpIHtcbiAgICAgIHJidEVsZUFsaWduID0gJ0xFRlRfVE9QJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmJ0RWxlQWxpZ24gPSAnUklHSFRfVE9QJztcbiAgICB9XG5cbiAgICB2YXIgbmRpdjtcbiAgICBpZiAocmJ0U3JjLmNoaWxkTWVudUhUTUwpIHtcblxuICAgICAgbmRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgbmRpdi5pZCA9IHJidFNyYy5uYW1lICsgJ19jaGlsZF9tZW51JztcblxuICAgICAgbmRpdi5pbm5lckhUTUwgPSByYnRTcmMuY2hpbGRNZW51SFRNTDtcbiAgICAgIG5kaXYuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgbmRpdi5zdHlsZS53aWR0aCA9IChyYnRTcmMuY2hpbGRNZW51V2lkdGggPyByYnRTcmMuY2hpbGRNZW51V2lkdGggOiAyMDApICsgJ3B4JztcbiAgICAgIG5kaXYuc3R5bGUudG9wID0gKHBhcnNlSW50KHJidEVsZS5zdHlsZS50b3AsIDEwKSArIHBhcnNlSW50KHJidEVsZS5zdHlsZS5oZWlnaHQsIDEwKSAvIDIgKyB0aXRsZUJhckhlaWdodCAvIDIpICsgJ3B4JztcbiAgICAgIG5kaXYuc3R5bGUubGVmdCA9IHJidEVsZS5zdHlsZS5sZWZ0O1xuICAgICAgbmRpdi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICByYnRFbGUuYXBwZW5kQ2hpbGQobmRpdik7XG4gICAgfVxuXG5cbiAgICBmQXByLmFkZEZyYW1lQ29tcG9uZW50KHJidFNyYy5uYW1lLCByYnRFbGUsIHJidEVsZUxlZnQsIHJidEVsZVRvcCwgcmJ0RWxlQWxpZ24sIHsgY2hpbGRNZW51OiBuZGl2IH0pO1xuXG4gICAgaWYgKGZyb21MZWZ0KSB7XG4gICAgICByYnRYICs9IHBhcmFtLnRpdGxlQmFyLmJ1dHRvbldpZHRoO1xuICAgIH0gZWxzZSB7XG4gICAgICByYnRYICs9IC1wYXJhbS50aXRsZUJhci5idXR0b25XaWR0aDtcbiAgICB9XG5cbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGdldFN1YkNvbG9yKGNvbG9yKSB7XG5cbiAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICBjYW52YXMuaGVpZ2h0ID0gMTtcbiAgY2FudmFzLndpZHRoID0gMTtcbiAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gIGN0eC5maWxsUmVjdCgwLCAwLCAxLCAxKTtcbiAgdmFyIGNvbG9yRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgMSwgMSkuZGF0YTtcblxuICB2YXIgciA9IGNvbG9yRGF0YVswXTtcbiAgdmFyIGcgPSBjb2xvckRhdGFbMV07XG4gIHZhciBiID0gY29sb3JEYXRhWzJdO1xuICB2YXIgYWxwaGEgPSBjb2xvckRhdGFbM10gLyAyNTU7XG4gIHZhciBhbHBoYTIgPSBhbHBoYSAqIDAuODU7XG4gIHZhciBhbHBoYTMgPSBhbHBoYSAqIDAuNzU7XG5cbiAgdmFyIHJldCA9ICdyZ2IoJyArIHIgKyAnLCcgKyBnICsgJywnICsgYiArICcsJyArIGFscGhhMiArICcpJztcbiAgdmFyIHJldDIgPSAncmdiKCcgKyByICsgJywnICsgZyArICcsJyArIGIgKyAnLCcgKyBhbHBoYTIgKyAnKSc7XG4gIHZhciByZXQzID0gJ3JnYignICsgciArICcsJyArIGcgKyAnLCcgKyBiICsgJywnICsgYWxwaGEzICsgJyknO1xuICByZXR1cm4geyBzcmM6IHJldCwgaG92ZXJlZDogcmV0MiwgcHJlc3NlZDogcmV0MyB9O1xufVxuXG5cbm1vZHVsZS5leHBvcnRzLmdldFN0eWxlID0gZ2V0U3R5bGU7XG4iLCJyZXF1aXJlKCcuL1ByZXNldFN0eWxlUG9wdXAuY3NzJyk7XG5cbmZ1bmN0aW9uIGdldFN0eWxlKGZBcHIpIHtcblxuXG4gIGZBcHIuc2hvd1RpdGxlQmFyID0gZmFsc2U7XG4gIGZBcHIuc2hvd0Nsb3NlQnV0dG9uID0gdHJ1ZTtcblxuXG4gIGZBcHIudGl0bGVCYXJDYXB0aW9uRm9udFNpemUgPSAnMTJweCc7XG4gIGZBcHIudGl0bGVCYXJDYXB0aW9uRm9udFdlaWdodCA9ICdub3JtYWwnO1xuICBmQXByLnRpdGxlQmFyQ2FwdGlvbkxlZnRNYXJnaW4gPSAnMTBweCc7XG4gIGZBcHIudGl0bGVCYXJDYXB0aW9uQ29sb3JEZWZhdWx0ID0gJyM0ZDQ5NGQnO1xuICBmQXByLnRpdGxlQmFyQ2FwdGlvbkNvbG9yRm9jdXNlZCA9ICcjNGQ0OTRkJztcblxuICBmQXByLnRpdGxlQmFySGVpZ2h0ID0gJzVweCc7XG5cbiAgZkFwci50aXRsZUJhckNvbG9yRGVmYXVsdCA9ICd3aGl0ZSc7XG4gIGZBcHIudGl0bGVCYXJDb2xvckZvY3VzZWQgPSAnd2hpdGUnO1xuXG4gIGZBcHIudGl0bGVCYXJCb3JkZXJCb3R0b21EZWZhdWx0ID0gbnVsbDtcbiAgZkFwci50aXRsZUJhckJvcmRlckJvdHRvbUZvY3VzZWQgPSBudWxsO1xuXG4gIGZBcHIuZnJhbWVCb3JkZXJSYWRpdXMgPSAnNnB4JztcblxuICAvL2JvcmRlciB3aWR0aFxuICBmQXByLmZyYW1lQm9yZGVyV2lkdGhEZWZhdWx0ID0gJzFweCc7XG4gIGZBcHIuZnJhbWVCb3JkZXJXaWR0aEZvY3VzZWQgPSAnMXB4JztcblxuXG4gIC8vYm9yZGVyIGNvbG9yXG4gIGZBcHIuZnJhbWVCb3JkZXJDb2xvckRlZmF1bHQgPSAnI2FhYWFhYSc7XG4gIGZBcHIuZnJhbWVCb3JkZXJDb2xvckZvY3VzZWQgPSAnI2FhYWFhYSc7XG5cbiAgZkFwci5mcmFtZUJvcmRlclN0eWxlID0gJ3NvbGlkJztcblxuICAvL3dpbmRvdyBzaGFkb3dcbiAgZkFwci5mcmFtZUJveFNoYWRvdyA9ICcycHggMnB4IDVweCAgcmdiYSgwLCAwLCAwLCAwLjUpJztcblxuICBmQXByLmZyYW1lQmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcblxuXG4gIGZBcHIuZnJhbWVDb21wb25lbnRzID0gbmV3IEFycmF5KCk7XG5cbiAgLy9hZGp1c3RtZW50IHZhbHVlXG4gIGZBcHIuZnJhbWVIZWlnaHRBZGp1c3QgPSAyOy8vZGVmYXVsdCBpcyAxXG4gIGZBcHIuZ2V0VGl0bGVCYXJTdHlsZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgaWYgKGZBcHIuZm9jdXNlZEZyYW1lT25seSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGVCYXJDbGFzc05hbWVEZWZhdWx0OiAnanNmcmFtZS1wcmVzZXQtc3R5bGUtcG9wdXAtZm9jdXNlZCcsXG4gICAgICAgIHRpdGxlQmFyQ2xhc3NOYW1lRm9jdXNlZDogJ2pzZnJhbWUtcHJlc2V0LXN0eWxlLXBvcHVwLWZvY3VzZWQnXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZUJhckNsYXNzTmFtZURlZmF1bHQ6ICdqc2ZyYW1lLXByZXNldC1zdHlsZS1wb3B1cC1kZWZhdWx0JyxcbiAgICAgICAgdGl0bGVCYXJDbGFzc05hbWVGb2N1c2VkOiAnanNmcmFtZS1wcmVzZXQtc3R5bGUtcG9wdXAtZm9jdXNlZCdcbiAgICAgIH07XG4gICAgfVxuICB9O1xuICBmQXByLm9uSW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuXG5cbiAgICB2YXIgcGFydHNCdWlsZGVyID0gZkFwci5nZXRQYXJ0c0J1aWxkZXIoKTtcblxuXG4gICAgLy9jb25maWd1cmUgY2xvc2UgYnV0dG9uIGFwcGVhcmFuY2VbYmVnaW5dLy8vLy8vLy8vLy8vLy9cblxuICAgIHZhciBjcm9zc01hcmswID0gJ1xcdTI3NGMnO1xuICAgIHZhciBjcm9zc01hcmsxID0gJ1xcdTI3MTYnO1xuICAgIHZhciBjcm9zc01hcmsyID0gJ1xcdTI3NGUnO1xuICAgIHZhciBDUk9TU19NQVJLID0gY3Jvc3NNYXJrMTtcblxuXG4gICAgdmFyIGNiQXByID0gcGFydHNCdWlsZGVyLmJ1aWxkVGV4dEJ1dHRvbkFwcGVhcmFuY2UoKTtcblxuICAgIGNiQXByLndpZHRoID0gMjA7XG4gICAgY2JBcHIuaGVpZ2h0ID0gMjA7XG5cblxuICAgIGNiQXByLmJvcmRlclJhZGl1cyA9IDEwO1xuICAgIGNiQXByLmJvcmRlcldpZHRoID0gMTtcblxuICAgIGNiQXByLmJvcmRlckNvbG9yRGVmYXVsdCA9ICcjY2NjY2NjJztcbiAgICBjYkFwci5ib3JkZXJDb2xvckZvY3VzZWQgPSAnI2NjY2NjYyc7XG4gICAgY2JBcHIuYm9yZGVyQ29sb3JIb3ZlcmVkID0gJyNkZGRkZGQnO1xuICAgIGNiQXByLmJvcmRlckNvbG9yUHJlc3NlZCA9ICcjZWVlZWVlJztcblxuICAgIGNiQXByLmJvcmRlclN0eWxlRGVmYXVsdCA9ICdzb2xpZCc7XG4gICAgY2JBcHIuYm9yZGVyU3R5bGVGb2N1c2VkID0gY2JBcHIuYm9yZGVyU3R5bGVEZWZhdWx0O1xuICAgIGNiQXByLmJvcmRlclN0eWxlSG92ZXJlZCA9IGNiQXByLmJvcmRlclN0eWxlRGVmYXVsdDtcbiAgICBjYkFwci5ib3JkZXJTdHlsZVByZXNzZWQgPSBjYkFwci5ib3JkZXJTdHlsZURlZmF1bHQ7XG5cbiAgICAvL2JhY2tncm91bmRcbiAgICBjYkFwci5iYWNrZ3JvdW5kQ29sb3JEZWZhdWx0ID0gJ3doaXRlJztcbiAgICBjYkFwci5iYWNrZ3JvdW5kQ29sb3JGb2N1c2VkID0gJ3doaXRlJztcbiAgICBjYkFwci5iYWNrZ3JvdW5kQ29sb3JIb3ZlcmVkID0gJyNlZWVlZWUnO1xuICAgIGNiQXByLmJhY2tncm91bmRDb2xvclByZXNzZWQgPSAnI2RkZGRkZCc7XG5cbiAgICBjYkFwci5iYWNrZ3JvdW5kQm94U2hhZG93ID0gJzJweCAycHggNXB4ICByZ2JhKDAsIDAsIDAsIDAuNSknO1xuXG4gICAgLy9jYXB0aW9uXG4gICAgY2JBcHIuY2FwdGlvbiA9IENST1NTX01BUks7XG5cbiAgICBjYkFwci5jYXB0aW9uQ29sb3JEZWZhdWx0ID0gJ2JsYWNrJztcbiAgICBjYkFwci5jYXB0aW9uQ29sb3JGb2N1c2VkID0gJ2JsYWNrJztcbiAgICBjYkFwci5jYXB0aW9uQ29sb3JIb3ZlcmVkID0gJ3doaXRlJztcbiAgICBjYkFwci5jYXB0aW9uQ29sb3JQcmVzc2VkID0gJ3doaXRlJztcblxuICAgIGNiQXByLmNhcHRpb25TaGlmdFlweCA9IDE7XG4gICAgY2JBcHIuY2FwdGlvbkZvbnRSYXRpbyA9IDAuNjtcblxuICAgIHZhciBjbG9zZUJ0bkVsZSA9IHBhcnRzQnVpbGRlci5idWlsZFRleHRCdXR0b24oY2JBcHIpO1xuICAgIHZhciBlbGVMZWZ0ID0gMTA7XG4gICAgdmFyIGVsZVRvcCA9IC02IC0gcGFyc2VJbnQoZkFwci50aXRsZUJhckhlaWdodCk7XG4gICAgdmFyIGVsZUFsaWduID0gJ1JJR0hUX1RPUCc7XG5cbiAgICAvLyAnY2xvc2VCdXR0b24nIGlzIGEgc3BlY2lhbCBuYW1lXG4gICAgZkFwci5hZGRGcmFtZUNvbXBvbmVudCgnY2xvc2VCdXR0b24nLCBjbG9zZUJ0bkVsZSwgZWxlTGVmdCwgZWxlVG9wLCBlbGVBbGlnbik7XG5cbiAgICAvL2NvbmZpZ3VyZSBjbG9zZSBidXR0b24gYXBwZWFyYW5jZVtlbmRdLy8vLy8vLy8vLy8vLy9cblxuXG4gIH07XG4gIC8vXG5cbiAgcmV0dXJuIGZBcHI7XG5cblxufVxuXG5cbm1vZHVsZS5leHBvcnRzLmdldFN0eWxlID0gZ2V0U3R5bGU7XG4iLCJyZXF1aXJlKCcuL1ByZXNldFN0eWxlUmVkc3RvbmUuY3NzJyk7XG5cbmZ1bmN0aW9uIGdldFN0eWxlKGZBcHIpIHtcblxuICBmQXByLnNob3dUaXRsZUJhciA9IHRydWU7XG4gIGZBcHIuc2hvd0Nsb3NlQnV0dG9uID0gdHJ1ZTtcblxuICBmQXByLnRpdGxlQmFyQ2FwdGlvbkZvbnRTaXplID0gJzEycHgnO1xuICBmQXByLnRpdGxlQmFyQ2FwdGlvbkZvbnRXZWlnaHQgPSAnbm9ybWFsJztcbiAgZkFwci50aXRsZUJhckNhcHRpb25MZWZ0TWFyZ2luID0gJzEwcHgnO1xuICBmQXByLnRpdGxlQmFyQ2FwdGlvbkNvbG9yRGVmYXVsdCA9ICcjOWI5YTliJztcbiAgZkFwci50aXRsZUJhckNhcHRpb25Db2xvckZvY3VzZWQgPSAnIzRkNDk0ZCc7XG5cbiAgZkFwci50aXRsZUJhckhlaWdodCA9ICczMHB4JztcblxuICBmQXByLnRpdGxlQmFyQ29sb3JEZWZhdWx0ID0gbnVsbDtcbiAgZkFwci50aXRsZUJhckNvbG9yRm9jdXNlZCA9IG51bGw7XG5cbiAgZkFwci50aXRsZUJhckJvcmRlckJvdHRvbURlZmF1bHQgPSAnc29saWQgMXB4ICNhYWFhYWEnO1xuICBmQXByLnRpdGxlQmFyQm9yZGVyQm90dG9tRm9jdXNlZCA9ICdzb2xpZCAxcHggIzE4ODNkNyc7XG5cbiAgZkFwci5mcmFtZUJvcmRlclJhZGl1cyA9ICcwcHgnO1xuXG4gIC8vYm9yZGVyIHdpZHRoXG4gIGZBcHIuZnJhbWVCb3JkZXJXaWR0aERlZmF1bHQgPSAnMXB4JztcbiAgZkFwci5mcmFtZUJvcmRlcldpZHRoRm9jdXNlZCA9ICcxcHgnO1xuXG5cbiAgLy9ib3JkZXIgY29sb3JcbiAgZkFwci5mcmFtZUJvcmRlckNvbG9yRGVmYXVsdCA9ICcjYWFhYWFhJztcbiAgZkFwci5mcmFtZUJvcmRlckNvbG9yRm9jdXNlZCA9ICcjMTg4M2Q3JztcblxuICBmQXByLmZyYW1lQm9yZGVyU3R5bGUgPSAnc29saWQnO1xuXG4gIC8vd2luZG93IHNoYWRvd1xuICBmQXByLmZyYW1lQm94U2hhZG93ID0gbnVsbDtcblxuICBmQXByLmZyYW1lQmFja2dyb3VuZENvbG9yID0gJ3RyYW5zcGFyZW50JztcblxuXG4gIGZBcHIuZnJhbWVDb21wb25lbnRzID0gbmV3IEFycmF5KCk7XG5cbiAgLy9hZGp1c3RtZW50IHZhbHVlXG4gIGZBcHIuZnJhbWVIZWlnaHRBZGp1c3QgPSAwOy8vZGVmYXVsdCBpcyAxXG5cbiAgZkFwci5nZXRUaXRsZUJhclN0eWxlID0gZnVuY3Rpb24oKSB7XG5cbiAgICBpZiAoZkFwci5mb2N1c2VkRnJhbWVPbmx5KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZUJhckNsYXNzTmFtZURlZmF1bHQ6ICdqc2ZyYW1lLXByZXNldC1zdHlsZS1yZWRzdG9uZS1mb2N1c2VkJyxcbiAgICAgICAgdGl0bGVCYXJDbGFzc05hbWVGb2N1c2VkOiAnanNmcmFtZS1wcmVzZXQtc3R5bGUtcmVkc3RvbmUtZm9jdXNlZCdcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRpdGxlQmFyQ2xhc3NOYW1lRGVmYXVsdDogJ2pzZnJhbWUtcHJlc2V0LXN0eWxlLXJlZHN0b25lLWRlZmF1bHQnLFxuICAgICAgICB0aXRsZUJhckNsYXNzTmFtZUZvY3VzZWQ6ICdqc2ZyYW1lLXByZXNldC1zdHlsZS1yZWRzdG9uZS1mb2N1c2VkJ1xuICAgICAgfTtcbiAgICB9XG4gIH07XG5cbiAgZkFwci5vbkluaXRpYWxpemUgPSBmdW5jdGlvbigpIHtcblxuXG4gICAgdmFyIHBhcnRzQnVpbGRlciA9IGZBcHIuZ2V0UGFydHNCdWlsZGVyKCk7XG5cblxuICAgIHtcbiAgICAgIC8vY29uZmlndXJlIGNsb3NlIGJ1dHRvbiBhcHBlYXJhbmNlW2JlZ2luXS8vLy8vLy8vLy8vLy8vXG5cbiAgICAgIHZhciBDUk9TU19NQVJLID0gJ1xcdTI1NzMnO1xuXG4gICAgICB2YXIgY2JBcHIgPSBwYXJ0c0J1aWxkZXIuYnVpbGRUZXh0QnV0dG9uQXBwZWFyYW5jZSgpO1xuXG4gICAgICBjYkFwci53aWR0aCA9IDQ1O1xuICAgICAgY2JBcHIuaGVpZ2h0ID0gMjg7XG5cblxuICAgICAgY2JBcHIuYm9yZGVyUmFkaXVzID0gMDtcbiAgICAgIGNiQXByLmJvcmRlcldpZHRoID0gMDtcblxuICAgICAgY2JBcHIuYm9yZGVyQ29sb3JEZWZhdWx0ID0gJyNjNmM2YzYnO1xuICAgICAgY2JBcHIuYm9yZGVyQ29sb3JGb2N1c2VkID0gJyNmYzYxNWMnO1xuICAgICAgY2JBcHIuYm9yZGVyQ29sb3JIb3ZlcmVkID0gY2JBcHIuYm9yZGVyQ29sb3JGb2N1c2VkO1xuICAgICAgY2JBcHIuYm9yZGVyQ29sb3JQcmVzc2VkID0gJyNlNjQ4NDInO1xuXG4gICAgICBjYkFwci5ib3JkZXJTdHlsZURlZmF1bHQgPSAnc29saWQnO1xuICAgICAgY2JBcHIuYm9yZGVyU3R5bGVGb2N1c2VkID0gY2JBcHIuYm9yZGVyU3R5bGVEZWZhdWx0O1xuICAgICAgY2JBcHIuYm9yZGVyU3R5bGVIb3ZlcmVkID0gY2JBcHIuYm9yZGVyU3R5bGVEZWZhdWx0O1xuICAgICAgY2JBcHIuYm9yZGVyU3R5bGVQcmVzc2VkID0gY2JBcHIuYm9yZGVyU3R5bGVEZWZhdWx0O1xuXG4gICAgICAvL2JhY2tncm91bmRcbiAgICAgIGNiQXByLmJhY2tncm91bmRDb2xvckRlZmF1bHQgPSAnd2hpdGUnO1xuICAgICAgY2JBcHIuYmFja2dyb3VuZENvbG9yRm9jdXNlZCA9ICd3aGl0ZSc7XG4gICAgICBjYkFwci5iYWNrZ3JvdW5kQ29sb3JIb3ZlcmVkID0gJyNlODExMjMnO1xuICAgICAgY2JBcHIuYmFja2dyb3VuZENvbG9yUHJlc3NlZCA9ICcjZjE3MDdhJztcblxuICAgICAgLy9jYXB0aW9uXG4gICAgICBjYkFwci5jYXB0aW9uID0gQ1JPU1NfTUFSSztcblxuICAgICAgY2JBcHIuY2FwdGlvbkNvbG9yRGVmYXVsdCA9ICcjOWI5YTliJztcbiAgICAgIGNiQXByLmNhcHRpb25Db2xvckZvY3VzZWQgPSAnYmxhY2snO1xuICAgICAgY2JBcHIuY2FwdGlvbkNvbG9ySG92ZXJlZCA9ICd3aGl0ZSc7XG4gICAgICBjYkFwci5jYXB0aW9uQ29sb3JQcmVzc2VkID0gJ3doaXRlJztcblxuICAgICAgY2JBcHIuY2FwdGlvblNoaWZ0WXB4ID0gMTtcbiAgICAgIGNiQXByLmNhcHRpb25Gb250UmF0aW8gPSAwLjY7XG5cbiAgICAgIHZhciBjbG9zZUJ0bkVsZSA9IHBhcnRzQnVpbGRlci5idWlsZFRleHRCdXR0b24oY2JBcHIpO1xuICAgICAgdmFyIGVsZUxlZnQgPSAwO1xuICAgICAgdmFyIGVsZVRvcCA9IC1wYXJzZUludChmQXByLnRpdGxlQmFySGVpZ2h0KTtcbiAgICAgIHZhciBlbGVBbGlnbiA9ICdSSUdIVF9UT1AnO1xuXG4gICAgICAvLyAnY2xvc2VCdXR0b24nIGlzIGEgc3BlY2lhbCBuYW1lXG4gICAgICBmQXByLmFkZEZyYW1lQ29tcG9uZW50KCdjbG9zZUJ1dHRvbicsIGNsb3NlQnRuRWxlLCBlbGVMZWZ0LCBlbGVUb3AsIGVsZUFsaWduKTtcblxuICAgICAgLy9jb25maWd1cmUgY2xvc2UgYnV0dG9uIGFwcGVhcmFuY2VbZW5kXS8vLy8vLy8vLy8vLy8vXG4gICAgfVxuXG4gICAge1xuICAgICAgLy9jb25maWd1cmUgY2xvc2UgYnV0dG9uIGFwcGVhcmFuY2VbYmVnaW5dLy8vLy8vLy8vLy8vLy9cblxuICAgICAgdmFyIE1BWElNSVpFX01BUksgPSAnXFx1MjYxMCc7XG5cbiAgICAgIHZhciBtYXhBcHIgPSBwYXJ0c0J1aWxkZXIuYnVpbGRUZXh0QnV0dG9uQXBwZWFyYW5jZSgpO1xuXG4gICAgICBtYXhBcHIud2lkdGggPSA0NTtcbiAgICAgIG1heEFwci5oZWlnaHQgPSAyODtcblxuXG4gICAgICBtYXhBcHIuYm9yZGVyUmFkaXVzID0gMDtcbiAgICAgIG1heEFwci5ib3JkZXJXaWR0aCA9IDA7XG5cbiAgICAgIG1heEFwci5ib3JkZXJDb2xvckRlZmF1bHQgPSAnI2M2YzZjNic7XG4gICAgICBtYXhBcHIuYm9yZGVyQ29sb3JGb2N1c2VkID0gJyNmYzYxNWMnO1xuICAgICAgbWF4QXByLmJvcmRlckNvbG9ySG92ZXJlZCA9IG1heEFwci5ib3JkZXJDb2xvckZvY3VzZWQ7XG4gICAgICBtYXhBcHIuYm9yZGVyQ29sb3JQcmVzc2VkID0gJyNlNjQ4NDInO1xuXG4gICAgICBtYXhBcHIuYm9yZGVyU3R5bGVEZWZhdWx0ID0gJ3NvbGlkJztcbiAgICAgIG1heEFwci5ib3JkZXJTdHlsZUZvY3VzZWQgPSBtYXhBcHIuYm9yZGVyU3R5bGVEZWZhdWx0O1xuICAgICAgbWF4QXByLmJvcmRlclN0eWxlSG92ZXJlZCA9IG1heEFwci5ib3JkZXJTdHlsZURlZmF1bHQ7XG4gICAgICBtYXhBcHIuYm9yZGVyU3R5bGVQcmVzc2VkID0gbWF4QXByLmJvcmRlclN0eWxlRGVmYXVsdDtcblxuICAgICAgLy9iYWNrZ3JvdW5kXG4gICAgICBtYXhBcHIuYmFja2dyb3VuZENvbG9yRGVmYXVsdCA9ICd3aGl0ZSc7XG4gICAgICBtYXhBcHIuYmFja2dyb3VuZENvbG9yRm9jdXNlZCA9ICd3aGl0ZSc7XG4gICAgICBtYXhBcHIuYmFja2dyb3VuZENvbG9ySG92ZXJlZCA9ICcjZTVlNWU1JztcbiAgICAgIG1heEFwci5iYWNrZ3JvdW5kQ29sb3JQcmVzc2VkID0gJyNjY2NjY2MnO1xuXG4gICAgICAvL2NhcHRpb25cbiAgICAgIG1heEFwci5jYXB0aW9uID0gTUFYSU1JWkVfTUFSSztcblxuICAgICAgbWF4QXByLmNhcHRpb25Db2xvckRlZmF1bHQgPSAnIzliOWE5Yic7XG4gICAgICBtYXhBcHIuY2FwdGlvbkNvbG9yRm9jdXNlZCA9ICdibGFjayc7XG4gICAgICBtYXhBcHIuY2FwdGlvbkNvbG9ySG92ZXJlZCA9ICdibGFjayc7XG4gICAgICBtYXhBcHIuY2FwdGlvbkNvbG9yUHJlc3NlZCA9ICdibGFjayc7XG5cbiAgICAgIG1heEFwci5jYXB0aW9uU2hpZnRZcHggPSAxO1xuICAgICAgbWF4QXByLmNhcHRpb25Gb250UmF0aW8gPSAwLjU1O1xuXG4gICAgICB2YXIgbWF4QnRuRWxlID0gcGFydHNCdWlsZGVyLmJ1aWxkVGV4dEJ1dHRvbihtYXhBcHIpO1xuICAgICAgdmFyIGVsZUxlZnQgPSAtNDY7XG4gICAgICB2YXIgZWxlVG9wID0gLXBhcnNlSW50KGZBcHIudGl0bGVCYXJIZWlnaHQpO1xuICAgICAgdmFyIGVsZUFsaWduID0gJ1JJR0hUX1RPUCc7XG5cbiAgICAgIC8vICdjbG9zZUJ1dHRvbicgaXMgYSBzcGVjaWFsIG5hbWVcbiAgICAgIGZBcHIuYWRkRnJhbWVDb21wb25lbnQoJ21heGltaXplQnV0dG9uJywgbWF4QnRuRWxlLCBlbGVMZWZ0LCBlbGVUb3AsIGVsZUFsaWduKTtcblxuICAgICAgLy9jb25maWd1cmUgY2xvc2UgYnV0dG9uIGFwcGVhcmFuY2VbZW5kXS8vLy8vLy8vLy8vLy8vXG4gICAgfVxuXG4gICAge1xuICAgICAgLy9jb25maWd1cmUgY2xvc2UgYnV0dG9uIGFwcGVhcmFuY2VbYmVnaW5dLy8vLy8vLy8vLy8vLy9cblxuICAgICAgdmFyIE1JTklNSVpFX01BUksgPSAnXFx1ZmYzZic7XG5cbiAgICAgIHZhciBtaW5BcHIgPSBwYXJ0c0J1aWxkZXIuYnVpbGRUZXh0QnV0dG9uQXBwZWFyYW5jZSgpO1xuXG4gICAgICBtaW5BcHIud2lkdGggPSA0NTtcbiAgICAgIG1pbkFwci5oZWlnaHQgPSAyODtcblxuXG4gICAgICBtaW5BcHIuYm9yZGVyUmFkaXVzID0gMDtcbiAgICAgIG1pbkFwci5ib3JkZXJXaWR0aCA9IDA7XG5cbiAgICAgIG1pbkFwci5ib3JkZXJDb2xvckRlZmF1bHQgPSAnI2M2YzZjNic7XG4gICAgICBtaW5BcHIuYm9yZGVyQ29sb3JGb2N1c2VkID0gJyNmYzYxNWMnO1xuICAgICAgbWluQXByLmJvcmRlckNvbG9ySG92ZXJlZCA9IG1pbkFwci5ib3JkZXJDb2xvckZvY3VzZWQ7XG4gICAgICBtaW5BcHIuYm9yZGVyQ29sb3JQcmVzc2VkID0gJyNlNjQ4NDInO1xuXG4gICAgICBtaW5BcHIuYm9yZGVyU3R5bGVEZWZhdWx0ID0gJ3NvbGlkJztcbiAgICAgIG1pbkFwci5ib3JkZXJTdHlsZUZvY3VzZWQgPSBtaW5BcHIuYm9yZGVyU3R5bGVEZWZhdWx0O1xuICAgICAgbWluQXByLmJvcmRlclN0eWxlSG92ZXJlZCA9IG1pbkFwci5ib3JkZXJTdHlsZURlZmF1bHQ7XG4gICAgICBtaW5BcHIuYm9yZGVyU3R5bGVQcmVzc2VkID0gbWluQXByLmJvcmRlclN0eWxlRGVmYXVsdDtcblxuICAgICAgLy9iYWNrZ3JvdW5kXG4gICAgICBtaW5BcHIuYmFja2dyb3VuZENvbG9yRGVmYXVsdCA9ICd3aGl0ZSc7XG4gICAgICBtaW5BcHIuYmFja2dyb3VuZENvbG9yRm9jdXNlZCA9ICd3aGl0ZSc7XG4gICAgICBtaW5BcHIuYmFja2dyb3VuZENvbG9ySG92ZXJlZCA9ICcjZTVlNWU1JztcbiAgICAgIG1pbkFwci5iYWNrZ3JvdW5kQ29sb3JQcmVzc2VkID0gJyNjY2NjY2MnO1xuXG4gICAgICAvL2NhcHRpb25cbiAgICAgIG1pbkFwci5jYXB0aW9uID0gTUlOSU1JWkVfTUFSSztcblxuICAgICAgbWluQXByLmNhcHRpb25Db2xvckRlZmF1bHQgPSAnIzliOWE5Yic7XG4gICAgICBtaW5BcHIuY2FwdGlvbkNvbG9yRm9jdXNlZCA9ICdibGFjayc7XG4gICAgICBtaW5BcHIuY2FwdGlvbkNvbG9ySG92ZXJlZCA9ICdibGFjayc7XG4gICAgICBtaW5BcHIuY2FwdGlvbkNvbG9yUHJlc3NlZCA9ICdibGFjayc7XG5cbiAgICAgIG1pbkFwci5jYXB0aW9uU2hpZnRZcHggPSAtMjtcbiAgICAgIG1pbkFwci5jYXB0aW9uRm9udFJhdGlvID0gMC4zO1xuXG4gICAgICB2YXIgbWluQnRuRWxlID0gcGFydHNCdWlsZGVyLmJ1aWxkVGV4dEJ1dHRvbihtaW5BcHIpO1xuICAgICAgdmFyIGVsZUxlZnQgPSAtOTI7XG4gICAgICB2YXIgZWxlVG9wID0gLXBhcnNlSW50KGZBcHIudGl0bGVCYXJIZWlnaHQpO1xuICAgICAgdmFyIGVsZUFsaWduID0gJ1JJR0hUX1RPUCc7XG5cbiAgICAgIC8vICdjbG9zZUJ1dHRvbicgaXMgYSBzcGVjaWFsIG5hbWVcbiAgICAgIGZBcHIuYWRkRnJhbWVDb21wb25lbnQoJ21pbmltaXplQnV0dG9uJywgbWluQnRuRWxlLCBlbGVMZWZ0LCBlbGVUb3AsIGVsZUFsaWduKTtcblxuICAgICAgLy9jb25maWd1cmUgY2xvc2UgYnV0dG9uIGFwcGVhcmFuY2VbZW5kXS8vLy8vLy8vLy8vLy8vXG4gICAgfVxuICAgIHtcbiAgICAgIC8vY29uZmlndXJlIGNsb3NlIGJ1dHRvbiBhcHBlYXJhbmNlW2JlZ2luXS8vLy8vLy8vLy8vLy8vXG5cblxuICAgICAgdmFyIGRlbWluQXByID0gcGFydHNCdWlsZGVyLmJ1aWxkVGV4dEJ1dHRvbkFwcGVhcmFuY2UoKTtcblxuICAgICAgZGVtaW5BcHIud2lkdGggPSA0NTtcbiAgICAgIGRlbWluQXByLmhlaWdodCA9IDI4O1xuXG5cbiAgICAgIGRlbWluQXByLmJvcmRlclJhZGl1cyA9IDA7XG4gICAgICBkZW1pbkFwci5ib3JkZXJXaWR0aCA9IDA7XG5cbiAgICAgIGRlbWluQXByLmJvcmRlckNvbG9yRGVmYXVsdCA9ICcjYzZjNmM2JztcbiAgICAgIGRlbWluQXByLmJvcmRlckNvbG9yRm9jdXNlZCA9ICcjZmM2MTVjJztcbiAgICAgIGRlbWluQXByLmJvcmRlckNvbG9ySG92ZXJlZCA9IGRlbWluQXByLmJvcmRlckNvbG9yRm9jdXNlZDtcbiAgICAgIGRlbWluQXByLmJvcmRlckNvbG9yUHJlc3NlZCA9ICcjZTY0ODQyJztcblxuICAgICAgZGVtaW5BcHIuYm9yZGVyU3R5bGVEZWZhdWx0ID0gJ3NvbGlkJztcbiAgICAgIGRlbWluQXByLmJvcmRlclN0eWxlRm9jdXNlZCA9IGRlbWluQXByLmJvcmRlclN0eWxlRGVmYXVsdDtcbiAgICAgIGRlbWluQXByLmJvcmRlclN0eWxlSG92ZXJlZCA9IGRlbWluQXByLmJvcmRlclN0eWxlRGVmYXVsdDtcbiAgICAgIGRlbWluQXByLmJvcmRlclN0eWxlUHJlc3NlZCA9IGRlbWluQXByLmJvcmRlclN0eWxlRGVmYXVsdDtcblxuICAgICAgLy9iYWNrZ3JvdW5kXG4gICAgICBkZW1pbkFwci5iYWNrZ3JvdW5kQ29sb3JEZWZhdWx0ID0gJ3doaXRlJztcbiAgICAgIGRlbWluQXByLmJhY2tncm91bmRDb2xvckZvY3VzZWQgPSAnd2hpdGUnO1xuICAgICAgZGVtaW5BcHIuYmFja2dyb3VuZENvbG9ySG92ZXJlZCA9ICcjZTVlNWU1JztcbiAgICAgIGRlbWluQXByLmJhY2tncm91bmRDb2xvclByZXNzZWQgPSAnI2NjY2NjYyc7XG5cbiAgICAgIC8vY2FwdGlvblxuICAgICAgZGVtaW5BcHIuY2FwdGlvbiA9ICdcXHUyNUEzJztcblxuICAgICAgZGVtaW5BcHIuY2FwdGlvbkNvbG9yRGVmYXVsdCA9ICcjOWI5YTliJztcbiAgICAgIGRlbWluQXByLmNhcHRpb25Db2xvckZvY3VzZWQgPSAnYmxhY2snO1xuICAgICAgZGVtaW5BcHIuY2FwdGlvbkNvbG9ySG92ZXJlZCA9ICdibGFjayc7XG4gICAgICBkZW1pbkFwci5jYXB0aW9uQ29sb3JQcmVzc2VkID0gJ2JsYWNrJztcblxuICAgICAgZGVtaW5BcHIuY2FwdGlvblNoaWZ0WXB4ID0gMTtcbiAgICAgIGRlbWluQXByLmNhcHRpb25Gb250UmF0aW8gPSAwLjY7XG5cbiAgICAgIHZhciBkZW1pbkJ0bkVsZSA9IHBhcnRzQnVpbGRlci5idWlsZFRleHRCdXR0b24oZGVtaW5BcHIpO1xuICAgICAgdmFyIGVsZUxlZnQgPSAtOTI7XG4gICAgICB2YXIgZWxlVG9wID0gLXBhcnNlSW50KGZBcHIudGl0bGVCYXJIZWlnaHQpO1xuICAgICAgdmFyIGVsZUFsaWduID0gJ1JJR0hUX1RPUCc7XG5cbiAgICAgIGRlbWluQnRuRWxlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgIC8vICdjbG9zZUJ1dHRvbicgaXMgYSBzcGVjaWFsIG5hbWVcbiAgICAgIGZBcHIuYWRkRnJhbWVDb21wb25lbnQoJ2RlbWluaW1pemVCdXR0b24nLCBkZW1pbkJ0bkVsZSwgZWxlTGVmdCwgZWxlVG9wLCBlbGVBbGlnbik7XG5cbiAgICAgIC8vY29uZmlndXJlIGNsb3NlIGJ1dHRvbiBhcHBlYXJhbmNlW2VuZF0vLy8vLy8vLy8vLy8vL1xuICAgIH1cbiAgICB7XG4gICAgICAvL2NvbmZpZ3VyZSBjbG9zZSBidXR0b24gYXBwZWFyYW5jZVtiZWdpbl0vLy8vLy8vLy8vLy8vL1xuXG4gICAgICB2YXIgUkVTVE9SRV9NQVJLID0gJ1xcdTI3NEYnO1xuXG4gICAgICB2YXIgcmJBcHIgPSBwYXJ0c0J1aWxkZXIuYnVpbGRUZXh0QnV0dG9uQXBwZWFyYW5jZSgpO1xuXG4gICAgICByYkFwci53aWR0aCA9IDQ1O1xuICAgICAgcmJBcHIuaGVpZ2h0ID0gMjg7XG5cblxuICAgICAgcmJBcHIuYm9yZGVyUmFkaXVzID0gMDtcbiAgICAgIHJiQXByLmJvcmRlcldpZHRoID0gMDtcblxuICAgICAgcmJBcHIuYm9yZGVyQ29sb3JEZWZhdWx0ID0gJyNjNmM2YzYnO1xuICAgICAgcmJBcHIuYm9yZGVyQ29sb3JGb2N1c2VkID0gJyNmYzYxNWMnO1xuICAgICAgcmJBcHIuYm9yZGVyQ29sb3JIb3ZlcmVkID0gcmJBcHIuYm9yZGVyQ29sb3JGb2N1c2VkO1xuICAgICAgcmJBcHIuYm9yZGVyQ29sb3JQcmVzc2VkID0gJyNlNjQ4NDInO1xuXG4gICAgICByYkFwci5ib3JkZXJTdHlsZURlZmF1bHQgPSAnc29saWQnO1xuICAgICAgcmJBcHIuYm9yZGVyU3R5bGVGb2N1c2VkID0gcmJBcHIuYm9yZGVyU3R5bGVEZWZhdWx0O1xuICAgICAgcmJBcHIuYm9yZGVyU3R5bGVIb3ZlcmVkID0gcmJBcHIuYm9yZGVyU3R5bGVEZWZhdWx0O1xuICAgICAgcmJBcHIuYm9yZGVyU3R5bGVQcmVzc2VkID0gcmJBcHIuYm9yZGVyU3R5bGVEZWZhdWx0O1xuXG4gICAgICAvL2JhY2tncm91bmRcbiAgICAgIHJiQXByLmJhY2tncm91bmRDb2xvckRlZmF1bHQgPSAnd2hpdGUnO1xuICAgICAgcmJBcHIuYmFja2dyb3VuZENvbG9yRm9jdXNlZCA9ICd3aGl0ZSc7XG4gICAgICByYkFwci5iYWNrZ3JvdW5kQ29sb3JIb3ZlcmVkID0gJyNlNWU1ZTUnO1xuICAgICAgcmJBcHIuYmFja2dyb3VuZENvbG9yUHJlc3NlZCA9ICcjY2NjY2NjJztcblxuICAgICAgLy9jYXB0aW9uXG4gICAgICByYkFwci5jYXB0aW9uID0gUkVTVE9SRV9NQVJLO1xuXG4gICAgICByYkFwci5jYXB0aW9uQ29sb3JEZWZhdWx0ID0gJyM5YjlhOWInO1xuICAgICAgcmJBcHIuY2FwdGlvbkNvbG9yRm9jdXNlZCA9ICdibGFjayc7XG4gICAgICByYkFwci5jYXB0aW9uQ29sb3JIb3ZlcmVkID0gJ2JsYWNrJztcbiAgICAgIHJiQXByLmNhcHRpb25Db2xvclByZXNzZWQgPSAnYmxhY2snO1xuXG4gICAgICByYkFwci5jYXB0aW9uU2hpZnRZcHggPSAxO1xuICAgICAgcmJBcHIuY2FwdGlvbkZvbnRSYXRpbyA9IDAuNTU7XG5cbiAgICAgIHZhciByZXN0b3JlQnRuRWxlID0gcGFydHNCdWlsZGVyLmJ1aWxkVGV4dEJ1dHRvbihyYkFwcik7XG4gICAgICB2YXIgZWxlTGVmdCA9IC00NjtcbiAgICAgIHZhciBlbGVUb3AgPSAtcGFyc2VJbnQoZkFwci50aXRsZUJhckhlaWdodCk7XG4gICAgICB2YXIgZWxlQWxpZ24gPSAnUklHSFRfVE9QJztcblxuICAgICAgcmVzdG9yZUJ0bkVsZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICAvLyAnY2xvc2VCdXR0b24nIGlzIGEgc3BlY2lhbCBuYW1lXG4gICAgICBmQXByLmFkZEZyYW1lQ29tcG9uZW50KCdyZXN0b3JlQnV0dG9uJywgcmVzdG9yZUJ0bkVsZSwgZWxlTGVmdCwgZWxlVG9wLCBlbGVBbGlnbik7XG5cbiAgICAgIC8vY29uZmlndXJlIGNsb3NlIGJ1dHRvbiBhcHBlYXJhbmNlW2VuZF0vLy8vLy8vLy8vLy8vL1xuICAgIH1cblxuXG4gIH07XG4gIC8vXG5cbiAgcmV0dXJuIGZBcHI7XG59XG5cblxubW9kdWxlLmV4cG9ydHMuZ2V0U3R5bGUgPSBnZXRTdHlsZTtcbiIsImZ1bmN0aW9uIGdldFN0eWxlKGZBcHIpIHtcblxuXG4gIGZBcHIuc2hvd1RpdGxlQmFyID0gZmFsc2U7XG4gIGZBcHIuc2hvd0Nsb3NlQnV0dG9uID0gdHJ1ZTtcblxuXG4gIGZBcHIudGl0bGVCYXJDYXB0aW9uRm9udFNpemUgPSAnMHB4JztcbiAgZkFwci50aXRsZUJhckNhcHRpb25Gb250V2VpZ2h0ID0gJ25vcm1hbCc7XG4gIGZBcHIudGl0bGVCYXJDYXB0aW9uTGVmdE1hcmdpbiA9ICcwcHgnO1xuICBmQXByLnRpdGxlQmFyQ2FwdGlvbkNvbG9yRGVmYXVsdCA9ICd0cmFuc3BhcmVudCc7XG4gIGZBcHIudGl0bGVCYXJDYXB0aW9uQ29sb3JGb2N1c2VkID0gJ3RyYW5zcGFyZW50JztcblxuICBmQXByLnRpdGxlQmFySGVpZ2h0ID0gJzBweCc7XG5cbiAgZkFwci50aXRsZUJhckNvbG9yRGVmYXVsdCA9ICd0cmFuc3BhcmVudCc7XG4gIGZBcHIudGl0bGVCYXJDb2xvckZvY3VzZWQgPSAndHJhbnNwYXJlbnQnO1xuXG4gIGZBcHIudGl0bGVCYXJCb3JkZXJCb3R0b21EZWZhdWx0ID0gbnVsbDtcbiAgZkFwci50aXRsZUJhckJvcmRlckJvdHRvbUZvY3VzZWQgPSBudWxsO1xuXG4gIGZBcHIuZnJhbWVCb3JkZXJSYWRpdXMgPSAnMTBweCc7XG5cbiAgLy9ib3JkZXIgd2lkdGhcbiAgZkFwci5mcmFtZUJvcmRlcldpZHRoRGVmYXVsdCA9ICcwcHgnO1xuICBmQXByLmZyYW1lQm9yZGVyV2lkdGhGb2N1c2VkID0gJzBweCc7XG5cbiAgLy9ib3JkZXIgY29sb3JcbiAgZkFwci5mcmFtZUJvcmRlckNvbG9yRGVmYXVsdCA9ICd0cmFuc3BhcmVudCc7XG4gIGZBcHIuZnJhbWVCb3JkZXJDb2xvckZvY3VzZWQgPSAndHJhbnNwYXJlbnQnO1xuICBmQXByLmZyYW1lQm9yZGVyU3R5bGUgPSAnc29saWQnO1xuICBmQXByLmZyYW1lQm94U2hhZG93ID0gJzJweCAycHggMTVweCAgcmdiYSgwLCAwLCAwLCAwLjUpJztcbiAgZkFwci5mcmFtZUJhY2tncm91bmRDb2xvciA9ICd0cmFuc3BhcmVudCc7XG5cblxuICBmQXByLmZyYW1lQ29tcG9uZW50cyA9IFtdO1xuICBmQXByLmZyYW1lSGVpZ2h0QWRqdXN0ID0gMTsvL2RlZmF1bHQgaXMgMVxuXG4gIGZBcHIuY2FwdGlvbkNsb3IgPSAnZGFya2dyYXknO1xuXG4gIGZBcHIucHVsbFVwRGlzYWJsZWQgPSBmYWxzZTtcblxuICBmQXByLmdldFRpdGxlQmFyU3R5bGUgPSBmdW5jdGlvbigpIHtcblxuICAgIGlmIChmQXByLmZvY3VzZWRGcmFtZU9ubHkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRpdGxlQmFyQ2xhc3NOYW1lRGVmYXVsdDogJyAnLFxuICAgICAgICB0aXRsZUJhckNsYXNzTmFtZUZvY3VzZWQ6ICcgJ1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGVCYXJDbGFzc05hbWVEZWZhdWx0OiAnICcsXG4gICAgICAgIHRpdGxlQmFyQ2xhc3NOYW1lRm9jdXNlZDogJyAnXG4gICAgICB9O1xuICAgIH1cbiAgfTtcblxuXG4gIGZBcHIub25Jbml0aWFsaXplID0gZnVuY3Rpb24oKSB7XG5cblxuICAgIHZhciBwYXJ0c0J1aWxkZXIgPSBmQXByLmdldFBhcnRzQnVpbGRlcigpO1xuXG5cbiAgICAvL2NvbmZpZ3VyZSBjbG9zZSBidXR0b24gYXBwZWFyYW5jZVtiZWdpbl0vLy8vLy8vLy8vLy8vL1xuXG4gICAgdmFyIGNyb3NzTWFyazAgPSAnXFx1Mjc0Yyc7XG4gICAgdmFyIGNyb3NzTWFyazEgPSAnXFx1MjcxNic7XG4gICAgdmFyIGNyb3NzTWFyazIgPSAnXFx1Mjc0ZSc7XG4gICAgdmFyIENST1NTX01BUksgPSBjcm9zc01hcmsxO1xuXG5cbiAgICB2YXIgY2JBcHIgPSBwYXJ0c0J1aWxkZXIuYnVpbGRUZXh0QnV0dG9uQXBwZWFyYW5jZSgpO1xuXG4gICAgY2JBcHIud2lkdGggPSAyMDtcbiAgICBjYkFwci5oZWlnaHQgPSAyMDtcblxuXG4gICAgY2JBcHIuYm9yZGVyUmFkaXVzID0gMTA7XG4gICAgY2JBcHIuYm9yZGVyV2lkdGggPSAwO1xuXG4gICAgY2JBcHIuYm9yZGVyQ29sb3JEZWZhdWx0ID0gJyNjY2NjY2MnO1xuICAgIGNiQXByLmJvcmRlckNvbG9yRm9jdXNlZCA9ICcjY2NjY2NjJztcbiAgICBjYkFwci5ib3JkZXJDb2xvckhvdmVyZWQgPSAnI2RkZGRkZCc7XG4gICAgY2JBcHIuYm9yZGVyQ29sb3JQcmVzc2VkID0gJyNlZWVlZWUnO1xuXG4gICAgY2JBcHIuYm9yZGVyU3R5bGVEZWZhdWx0ID0gJ3NvbGlkJztcbiAgICBjYkFwci5ib3JkZXJTdHlsZUZvY3VzZWQgPSBjYkFwci5ib3JkZXJTdHlsZURlZmF1bHQ7XG4gICAgY2JBcHIuYm9yZGVyU3R5bGVIb3ZlcmVkID0gY2JBcHIuYm9yZGVyU3R5bGVEZWZhdWx0O1xuICAgIGNiQXByLmJvcmRlclN0eWxlUHJlc3NlZCA9IGNiQXByLmJvcmRlclN0eWxlRGVmYXVsdDtcblxuICAgIC8vYmFja2dyb3VuZFxuICAgIGNiQXByLmJhY2tncm91bmRDb2xvckRlZmF1bHQgPSAndHJhbnNwYXJlbnQnO1xuICAgIGNiQXByLmJhY2tncm91bmRDb2xvckZvY3VzZWQgPSAndHJhbnNwYXJlbnQnO1xuICAgIGNiQXByLmJhY2tncm91bmRDb2xvckhvdmVyZWQgPSAndHJhbnNwYXJlbnQnO1xuICAgIGNiQXByLmJhY2tncm91bmRDb2xvclByZXNzZWQgPSAndHJhbnNwYXJlbnQnO1xuXG4gICAgY2JBcHIuYmFja2dyb3VuZEJveFNoYWRvdyA9IG51bGw7Ly8gJzJweCAycHggNXB4ICByZ2JhKDAsIDAsIDAsIDAuNSknO1xuXG4gICAgLy9jYXB0aW9uXG4gICAgY2JBcHIuY2FwdGlvbiA9IENST1NTX01BUks7XG5cbiAgICBjYkFwci5jYXB0aW9uQ29sb3JEZWZhdWx0ID0gZkFwci5jYXB0aW9uQ2xvcjtcbiAgICBjYkFwci5jYXB0aW9uQ29sb3JGb2N1c2VkID0gZkFwci5jYXB0aW9uQ2xvcjtcbiAgICBjYkFwci5jYXB0aW9uQ29sb3JIb3ZlcmVkID0gZkFwci5jYXB0aW9uQ2xvcjtcbiAgICBjYkFwci5jYXB0aW9uQ29sb3JQcmVzc2VkID0gZkFwci5jYXB0aW9uQ2xvcjtcblxuICAgIGNiQXByLmNhcHRpb25TaGlmdFlweCA9IDE7XG4gICAgY2JBcHIuY2FwdGlvbkZvbnRSYXRpbyA9IDAuNjtcblxuICAgIHZhciBjbG9zZUJ0bkVsZSA9IHBhcnRzQnVpbGRlci5idWlsZFRleHRCdXR0b24oY2JBcHIpO1xuICAgIHZhciBlbGVMZWZ0ID0gLTY7XG4gICAgdmFyIGVsZVRvcCA9IDM7XG4gICAgdmFyIGVsZUFsaWduID0gJ1JJR0hUX1RPUCc7XG5cbiAgICAvLyAnY2xvc2VCdXR0b24nIGlzIGEgc3BlY2lhbCBuYW1lXG4gICAgZkFwci5hZGRGcmFtZUNvbXBvbmVudCgnY2xvc2VCdXR0b24nLCBjbG9zZUJ0bkVsZSwgZWxlTGVmdCwgZWxlVG9wLCBlbGVBbGlnbik7XG5cbiAgICAvL2NvbmZpZ3VyZSBjbG9zZSBidXR0b24gYXBwZWFyYW5jZVtlbmRdLy8vLy8vLy8vLy8vLy9cblxuXG4gIH07XG4gIC8vXG5cblxuICByZXR1cm4gZkFwcjtcbn1cblxuXG5tb2R1bGUuZXhwb3J0cy5nZXRTdHlsZSA9IGdldFN0eWxlO1xuIiwicmVxdWlyZSgnLi9QcmVzZXRTdHlsZVlvc2VtaXRlLmNzcycpO1xudmFyIE9iamVjdEFzc2lnbmVyID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvT2JqZWN0QXNzaWduZXIuanMnKTtcblxuZnVuY3Rpb24gZ2V0U3R5bGUoZkFwciwgdXNlclBhcmFtKSB7XG5cbiAgdmFyIHNyY1BhcmFtID0ge1xuICAgIHRpdGxlQmFyOiB7XG4gICAgICBncmVlbkJ1dHRvbjogJ21heGltaXplJywvLydtYXhpbWl6ZScgb3IgJ2Z1bGxzY3JlZW4nXG4gICAgfVxuICB9O1xuXG4gIHZhciBwYXJhbSA9IHNyY1BhcmFtO1xuXG4gIGlmICh1c2VyUGFyYW0pIHtcbiAgICAvL3BhcmFtPU9iamVjdC5hc3NpZ24oe30sc3JjUGFyYW0sIHVzZXJQYXJhbSk7XG4gICAgT2JqZWN0QXNzaWduZXIub2JqZWN0QXNzaWduKHNyY1BhcmFtLCB1c2VyUGFyYW0pO1xuXG4gIH1cblxuICBmQXByLnNob3dUaXRsZUJhciA9IHRydWU7XG4gIGZBcHIuc2hvd0Nsb3NlQnV0dG9uID0gdHJ1ZTtcblxuICBmQXByLnRpdGxlQmFyQ2FwdGlvbkZvbnRTaXplID0gJzExcHgnO1xuICBmQXByLnRpdGxlQmFyQ2FwdGlvbkZvbnRXZWlnaHQgPSAnbm9ybWFsJztcbiAgZkFwci50aXRsZUJhckNhcHRpb25MZWZ0TWFyZ2luID0gbnVsbDtcbiAgZkFwci50aXRsZUJhckNhcHRpb25Db2xvckRlZmF1bHQgPSAnIzRkNDk0ZCc7XG4gIGZBcHIudGl0bGVCYXJDYXB0aW9uQ29sb3JGb2N1c2VkID0gJyM0ZDQ5NGQnO1xuXG4gIGZBcHIudGl0bGVCYXJIZWlnaHQgPSAnMjZweCc7XG5cbiAgZkFwci50aXRsZUJhckNvbG9yRGVmYXVsdCA9IG51bGw7XG4gIGZBcHIudGl0bGVCYXJDb2xvckZvY3VzZWQgPSBudWxsO1xuXG4gIGZBcHIudGl0bGVCYXJCb3JkZXJCb3R0b21EZWZhdWx0ID0gJzFweCBzb2xpZCAjYjFhZWIxJztcbiAgZkFwci50aXRsZUJhckJvcmRlckJvdHRvbUZvY3VzZWQgPSBmQXByLnRpdGxlQmFyQm9yZGVyQm90dG9tRGVmYXVsdDtcblxuICBmQXByLmZyYW1lQm9yZGVyUmFkaXVzID0gJzZweCc7XG5cbiAgLy9ib3JkZXIgd2lkdGhcbiAgZkFwci5mcmFtZUJvcmRlcldpZHRoRGVmYXVsdCA9ICcxcHgnO1xuICBmQXByLmZyYW1lQm9yZGVyV2lkdGhGb2N1c2VkID0gJzFweCc7XG5cblxuICAvL2JvcmRlciBjb2xvclxuICBmQXByLmZyYW1lQm9yZGVyQ29sb3JEZWZhdWx0ID0gJyNhY2FjYWMnO1xuICBmQXByLmZyYW1lQm9yZGVyQ29sb3JGb2N1c2VkID0gJyNhY2FjYWMnO1xuXG4gIGZBcHIuZnJhbWVCb3JkZXJTdHlsZSA9ICdzb2xpZCc7XG5cbiAgLy93aW5kb3cgc2hhZG93XG4gIGZBcHIuZnJhbWVCb3hTaGFkb3cgPSAnMHB4IDBweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4zKSc7XG5cbiAgZkFwci5mcmFtZUJhY2tncm91bmRDb2xvciA9ICd0cmFuc3BhcmVudCc7XG5cblxuICBmQXByLmZyYW1lQ29tcG9uZW50cyA9IG5ldyBBcnJheSgpO1xuXG4gIGZBcHIuZ2V0VGl0bGVCYXJTdHlsZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgaWYgKGZBcHIuZm9jdXNlZEZyYW1lT25seSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGVCYXJDbGFzc05hbWVEZWZhdWx0OiAnanNmcmFtZS1wcmVzZXQtc3R5bGUteW9zZW1pdGUtZm9jdXNlZCcsXG4gICAgICAgIHRpdGxlQmFyQ2xhc3NOYW1lRm9jdXNlZDogJ2pzZnJhbWUtcHJlc2V0LXN0eWxlLXlvc2VtaXRlLWZvY3VzZWQnXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZUJhckNsYXNzTmFtZURlZmF1bHQ6ICdqc2ZyYW1lLXByZXNldC1zdHlsZS15b3NlbWl0ZS1kZWZhdWx0JyxcbiAgICAgICAgdGl0bGVCYXJDbGFzc05hbWVGb2N1c2VkOiAnanNmcmFtZS1wcmVzZXQtc3R5bGUteW9zZW1pdGUtZm9jdXNlZCdcbiAgICAgIH07XG4gICAgfVxuICB9O1xuXG4gIGZBcHIub25Jbml0aWFsaXplID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgcGFydHNCdWlsZGVyID0gZkFwci5nZXRQYXJ0c0J1aWxkZXIoKTtcblxuICAgIHZhciBpbWdfZGF0YV9jbG9zZV9ob3ZlcmVkID0gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQW9BQUFBS0NBWUFBQUNOTXMrOUFBQUFXRWxFUVZRb1UyTmtJQkl3RXFtT0FhNndnWldsSDZTcDRmZWZRakNOeGtkUnlNakFVUENmNGY4Q2tFSkdCc2FFL3d3TUUyQWFVYXh1WUdXZUQxSUFVZ2pTMFBEN2J5TE1hYVFyQkxtSktLdUo5Z3loWUNJNkhBR2xGREFMZjlzN2VRQUFBQUJKUlU1RXJrSmdnZz09JztcbiAgICB2YXIgaW1nX2RhdGFfbWF4aW1pemVfaG92ZXJlZCA9ICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFvQUFBQUtDQVlBQUFDTk1zKzlBQUFBVkVsRVFWUW9VMk5rSUJJd29xdmppeEZvQUlsOVd2SUJUTU1BaGtMZUdQNzlJTW5QU3o0NmtxOFFaTjEvaHYvMklCTVlHUmdNUVBSL0JvWUxFRDdqUVpBendGWVRyUkRaTGRSeEk3S0pSQWNQcnZBSEFBVFlLZ3ZMSDBmQUFBQUFBRWxGVGtTdVFtQ0MnO1xuICAgIGlmIChwYXJhbS50aXRsZUJhci5ncmVlbkJ1dHRvbiA9PT0gJ2Z1bGxzY3JlZW4nKSB7XG4gICAgICBpbWdfZGF0YV9tYXhpbWl6ZV9ob3ZlcmVkID0gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQW9BQUFBS0NBWUFBQUNOTXMrOUFBQUFaRWxFUVZRb1UyTmtJQkl3RXFtT0FVV2hRSUtBd0w4Ly8vY3pNREFZd0F6NHRPUWpXQTFjSVVqUmh3VWZQcUFyeGxESUY4Ti9ub21GMFJGZE1UYUYveGtZR0M2Z0svNjA1S01oaXRWOE1md2doU0NBb2hoa0F5NkZLSXBobmlJdmVQQ0ZLUUR6R3pzTFMrN24yQUFBQUFCSlJVNUVya0pnZ2c9PSc7XG4gICAgfVxuICAgIHZhciBpbWdfZGF0YV9kZW1heGltaXplX2hvdmVyZWQgPSAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBb0FBQUFLQ0FZQUFBQ05Ncys5QUFBQWlVbEVRVlFvVTJOa3dBSUVvZ1FNUGl6N2NBRlppaEdiUXQ0WS92ME1qSXdMUHkvK3NBQW1qMU1oSXdPRHczOUd4a1NZWXJ3S1FhYkJGR05WeUJmTDEvLy9QNk1CekZybWY0eUZqQ0NILzJYNjN3OTNDK1AvQzU4V2Z5cEVkenZZUk41WWdRVEcvLy9uZzYxaVlEandlY2xIUjZ3S2tSVVRWQWhUelBEL2Z6eGVFMkZXWVF0c2tCd0FLd1E3dFZqQUw0TUFBQUFBU1VWT1JLNUNZSUk9JztcbiAgICB2YXIgaW1nX2RhdGFfbWluaW1pemVfaG92ZXJlZCA9ICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFvQUFBQUtDQVlBQUFDTk1zKzlBQUFBTVVsRVFWUW9VMk5rSUJJd0VxbU9nVVlLYTd3NEdoaitNOWhqZFFZanc4R1diVDhhd0ZZVHJaQVlEOUhJTThSWURRQnNFQXdMa3E0SUFnQUFBQUJKUlU1RXJrSmdnZz09JztcbiAgICB2YXIgaW1nX2RhdGFfMWRvdF90cmFuc3BhcmVudCA9ICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFFQUFBQUJDQVlBQUFBZkZjU0pBQUFBR1hSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBQUJCSlJFRlVlTnBpK1AvL1B3TkFnQUVBQ1B3Qy90dWlUUllBQUFBQVNVVk9SSzVDWUlJPSc7XG4gICAgdmFyIGltZ193aWR0aCA9IDEwO1xuICAgIHZhciBpbWdfaGVpZ2h0ID0gMTA7XG4gICAgdmFyIGltZ19zdHlsZSA9ICdtYXJnaW46MHB4O3BhZGRpbmc6MHB4O3dpZHRoOicgKyBpbWdfd2lkdGggKyAncHg7aGVpZ2h0OicgKyBpbWdfaGVpZ2h0ICsgJ3B4JztcblxuICAgIHZhciBpbWFnZU1heGltaXplID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaW1hZ2VNYXhpbWl6ZS5zcmMgPSBpbWdfZGF0YV9tYXhpbWl6ZV9ob3ZlcmVkO1xuICAgIGltYWdlTWF4aW1pemUuc2V0QXR0cmlidXRlKCdzdHlsZScsIGltZ19zdHlsZSk7XG5cbiAgICB2YXIgaW1hZ2VEZW1heGltaXplID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaW1hZ2VEZW1heGltaXplLnNyYyA9IGltZ19kYXRhX2RlbWF4aW1pemVfaG92ZXJlZDtcbiAgICBpbWFnZURlbWF4aW1pemUuc2V0QXR0cmlidXRlKCdzdHlsZScsIGltZ19zdHlsZSk7XG5cbiAgICAvLyB2YXIgaW1hZ2VGdWxsU2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgLy8gaW1hZ2VGdWxsU2NyZWVuLnNyYyA9IGltZ19kYXRhX21heGltaXplX2hvdmVyZWQ7XG4gICAgLy8gaW1hZ2VGdWxsU2NyZWVuLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBpbWdfc3R5bGUpO1xuXG4gICAgdmFyIGltYWdlTWluaW1pemUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpbWFnZU1pbmltaXplLnNyYyA9IGltZ19kYXRhX21pbmltaXplX2hvdmVyZWQ7XG4gICAgaW1hZ2VNaW5pbWl6ZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgaW1nX3N0eWxlKTtcblxuICAgIHZhciBpbWFnZUNsb3NlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaW1hZ2VDbG9zZS5zcmMgPSBpbWdfZGF0YV9jbG9zZV9ob3ZlcmVkO1xuICAgIGltYWdlQ2xvc2Uuc2V0QXR0cmlidXRlKCdzdHlsZScsIGltZ19zdHlsZSk7XG5cblxuICAgIHZhciBpbWdUcmFuc3BhcmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGltZ1RyYW5zcGFyZW50LnNyYyA9IGltZ19kYXRhXzFkb3RfdHJhbnNwYXJlbnQ7XG4gICAgaW1nVHJhbnNwYXJlbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsICdtYXJnaW46MHB4O3BhZGRpbmc6MHB4O3dpZHRoOjZweDtoZWlnaHQ6NnB4Jyk7XG5cbiAgICB7XG4gICAgICAvL2NvbmZpZ3VyZSBjbG9zZSBidXR0b24gYXBwZWFyYW5jZVtiZWdpbl0vLy8vLy8vLy8vLy8vL1xuXG5cbiAgICAgIHZhciBjYkFwciA9IHBhcnRzQnVpbGRlci5idWlsZEltYWdlQnV0dG9uQXBwZWFyYW5jZSgpO1xuICAgICAgY2JBcHIuaW1hZ2VEZWZhdWx0ID0gaW1nVHJhbnNwYXJlbnQ7XG4gICAgICBjYkFwci5pbWFnZUhvdmVyZWQgPSBpbWFnZUNsb3NlO1xuICAgICAgY2JBcHIuaW1hZ2VQcmVzc2VkID0gaW1hZ2VDbG9zZTtcbiAgICAgIGNiQXByLmltYWdlRm9jdXNlZCA9IGltZ1RyYW5zcGFyZW50O1xuICAgICAgY2JBcHIuc2l6ZSA9IDEwO1xuXG4gICAgICBjYkFwci5ib3JkZXJSYWRpdXMgPSA1O1xuICAgICAgY2JBcHIuYm9yZGVyV2lkdGggPSAxO1xuXG4gICAgICBjYkFwci5ib3JkZXJDb2xvckRlZmF1bHQgPSAnI2M2YzZjNic7XG4gICAgICBjYkFwci5ib3JkZXJDb2xvckZvY3VzZWQgPSAnI2QzNTI0ZSc7XG4gICAgICBjYkFwci5ib3JkZXJDb2xvckhvdmVyZWQgPSBjYkFwci5ib3JkZXJDb2xvckZvY3VzZWQ7XG4gICAgICBjYkFwci5ib3JkZXJDb2xvclByZXNzZWQgPSAnI2U2NDg0Mic7XG5cbiAgICAgIGNiQXByLmJvcmRlclN0eWxlRGVmYXVsdCA9ICdzb2xpZCc7XG4gICAgICBjYkFwci5ib3JkZXJTdHlsZUZvY3VzZWQgPSBjYkFwci5ib3JkZXJTdHlsZURlZmF1bHQ7XG4gICAgICBjYkFwci5ib3JkZXJTdHlsZUhvdmVyZWQgPSBjYkFwci5ib3JkZXJTdHlsZURlZmF1bHQ7XG4gICAgICBjYkFwci5ib3JkZXJTdHlsZVByZXNzZWQgPSBjYkFwci5ib3JkZXJTdHlsZURlZmF1bHQ7XG5cbiAgICAgIC8vYmFja2dyb3VuZFxuICAgICAgY2JBcHIuYmFja2dyb3VuZENvbG9yRGVmYXVsdCA9ICcjZDBkMGQwJztcbiAgICAgIGNiQXByLmJhY2tncm91bmRDb2xvckZvY3VzZWQgPSAnI2ZjNjE1Yyc7XG4gICAgICBjYkFwci5iYWNrZ3JvdW5kQ29sb3JIb3ZlcmVkID0gY2JBcHIuYmFja2dyb3VuZENvbG9yRm9jdXNlZDtcbiAgICAgIGNiQXByLmJhY2tncm91bmRDb2xvclByZXNzZWQgPSBjYkFwci5iYWNrZ3JvdW5kQ29sb3JEZWZhdWx0O1xuICAgICAgY2JBcHIuc2V0U3JjKHtcbiAgICAgICAgZGVmYXVsdDogaW1nX2RhdGFfMWRvdF90cmFuc3BhcmVudCxcbiAgICAgICAgZm9jdXNlZDogaW1nX2RhdGFfMWRvdF90cmFuc3BhcmVudCxcbiAgICAgICAgaG92ZXJlZDogaW1nX2RhdGFfY2xvc2VfaG92ZXJlZCxcbiAgICAgICAgcHJlc3NlZDogaW1nX2RhdGFfY2xvc2VfaG92ZXJlZCxcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgY2xvc2VCdG5FbGUgPSBwYXJ0c0J1aWxkZXIuYnVpbGRCdXR0b24oY2JBcHIpO1xuICAgICAgdmFyIGVsZUxlZnQgPSA4O1xuICAgICAgdmFyIGVsZVRvcCA9IC0xOTtcbiAgICAgIHZhciBlbGVBbGlnbiA9ICdMRUZUX1RPUCc7XG5cbiAgICAgIC8vICdjbG9zZUJ1dHRvbicgaXMgYSBzcGVjaWFsIG5hbWVcbiAgICAgIGZBcHIuYWRkRnJhbWVDb21wb25lbnQocGFyYW0uY2xvc2VCdXR0b25OYW1lIHx8ICdjbG9zZUJ1dHRvbicsIGNsb3NlQnRuRWxlLCBlbGVMZWZ0LCBlbGVUb3AsIGVsZUFsaWduKTtcblxuICAgICAgLy9wcmVwYXJlIFttaW5pbWl6ZSBidXR0b25dXG4gICAgICB2YXIgbWluQnRuQXByID0gcGFydHNCdWlsZGVyLmJ1aWxkSW1hZ2VCdXR0b25BcHBlYXJhbmNlKGNiQXByKTtcbiAgICAgIG1pbkJ0bkFwci5ib3JkZXJDb2xvckRlZmF1bHQgPSAnI2M2YzZjNic7XG4gICAgICBtaW5CdG5BcHIuYm9yZGVyQ29sb3JGb2N1c2VkID0gJyNlNmIzNDcnO1xuICAgICAgbWluQnRuQXByLmJvcmRlckNvbG9ySG92ZXJlZCA9IG1pbkJ0bkFwci5ib3JkZXJDb2xvckZvY3VzZWQ7XG4gICAgICBtaW5CdG5BcHIuYm9yZGVyQ29sb3JQcmVzc2VkID0gJyNlMWExMmQnO1xuICAgICAgbWluQnRuQXByLmJhY2tncm91bmRDb2xvckRlZmF1bHQgPSAnI2QwZDBkMCc7XG4gICAgICBtaW5CdG5BcHIuYmFja2dyb3VuZENvbG9yRm9jdXNlZCA9ICcjZmRiZTQwJztcbiAgICAgIG1pbkJ0bkFwci5iYWNrZ3JvdW5kQ29sb3JIb3ZlcmVkID0gbWluQnRuQXByLmJhY2tncm91bmRDb2xvckZvY3VzZWQ7XG4gICAgICBtaW5CdG5BcHIuYmFja2dyb3VuZENvbG9yUHJlc3NlZCA9IG1pbkJ0bkFwci5iYWNrZ3JvdW5kQ29sb3JEZWZhdWx0O1xuICAgICAgbWluQnRuQXByLmltYWdlRGVmYXVsdCA9IGltZ1RyYW5zcGFyZW50O1xuICAgICAgbWluQnRuQXByLmltYWdlSG92ZXJlZCA9IGltYWdlTWluaW1pemU7XG4gICAgICBtaW5CdG5BcHIuaW1hZ2VQcmVzc2VkID0gaW1hZ2VNaW5pbWl6ZTtcbiAgICAgIG1pbkJ0bkFwci5pbWFnZUZvY3VzZWQgPSBpbWdUcmFuc3BhcmVudDtcblxuICAgICAgdmFyIG1pbkJ0bkVsZSA9IHBhcnRzQnVpbGRlci5idWlsZEJ1dHRvbihtaW5CdG5BcHIpO1xuICAgICAgdmFyIGRlbWluaW1pemVCdG5FbGUgPSBwYXJ0c0J1aWxkZXIuYnVpbGRCdXR0b24obWluQnRuQXByKTtcbiAgICAgIGRlbWluaW1pemVCdG5FbGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIHZhciBlbGVMZWZ0ID0gMjg7XG4gICAgICB2YXIgZWxlVG9wID0gLTE5O1xuICAgICAgdmFyIGVsZUFsaWduID0gJ0xFRlRfVE9QJztcbiAgICAgIGZBcHIuYWRkRnJhbWVDb21wb25lbnQoJ21pbmltaXplQnV0dG9uJywgbWluQnRuRWxlLCBlbGVMZWZ0LCBlbGVUb3AsIGVsZUFsaWduKTtcbiAgICAgIGZBcHIuYWRkRnJhbWVDb21wb25lbnQoJ2RlbWluaW1pemVCdXR0b24nLCBkZW1pbmltaXplQnRuRWxlLCBlbGVMZWZ0LCBlbGVUb3AsIGVsZUFsaWduKTtcblxuXG4gICAgICAvLyBwcmVwYXJlIFttYXhpbWl6ZSBidXR0b25dXG4gICAgICAvL2NvbmZpZ3VyZSB6b29tIGJ1dHRvbiBhcHBlYXJhbmNlW2JlZ2luXS8vLy8vLy8vLy8vLy8vXG4gICAgICB2YXIgbWF4QnRuQXByID0gcGFydHNCdWlsZGVyLmJ1aWxkSW1hZ2VCdXR0b25BcHBlYXJhbmNlKGNiQXByKTtcbiAgICAgIG1heEJ0bkFwci5ib3JkZXJDb2xvckRlZmF1bHQgPSAnI2M2YzZjNic7XG4gICAgICBtYXhCdG5BcHIuYm9yZGVyQ29sb3JGb2N1c2VkID0gJyM2N2I2NTcnO1xuICAgICAgbWF4QnRuQXByLmJvcmRlckNvbG9ySG92ZXJlZCA9IG1heEJ0bkFwci5ib3JkZXJDb2xvckZvY3VzZWQ7XG4gICAgICBtYXhCdG5BcHIuYm9yZGVyQ29sb3JQcmVzc2VkID0gJyMwMGFmMzgnO1xuICAgICAgbWF4QnRuQXByLmJhY2tncm91bmRDb2xvckRlZmF1bHQgPSAnI2QwZDBkMCc7XG4gICAgICBtYXhCdG5BcHIuYmFja2dyb3VuZENvbG9yRm9jdXNlZCA9ICcjMzRjYTQ5JztcbiAgICAgIG1heEJ0bkFwci5iYWNrZ3JvdW5kQ29sb3JIb3ZlcmVkID0gbWF4QnRuQXByLmJhY2tncm91bmRDb2xvckZvY3VzZWQ7XG4gICAgICBtYXhCdG5BcHIuYmFja2dyb3VuZENvbG9yUHJlc3NlZCA9IG1heEJ0bkFwci5iYWNrZ3JvdW5kQ29sb3JEZWZhdWx0O1xuICAgICAgbWF4QnRuQXByLmltYWdlRGVmYXVsdCA9IGltZ1RyYW5zcGFyZW50O1xuICAgICAgbWF4QnRuQXByLmltYWdlSG92ZXJlZCA9IGltYWdlTWF4aW1pemU7XG4gICAgICBtYXhCdG5BcHIuaW1hZ2VQcmVzc2VkID0gaW1hZ2VNYXhpbWl6ZTtcbiAgICAgIG1heEJ0bkFwci5pbWFnZUZvY3VzZWQgPSBpbWdUcmFuc3BhcmVudDtcblxuICAgICAgdmFyIHpvb21CdG5FbGUgPSBwYXJ0c0J1aWxkZXIuYnVpbGRCdXR0b24obWF4QnRuQXByKTtcblxuXG4gICAgICB2YXIgZGVtYXhCdG5BcHIgPSBwYXJ0c0J1aWxkZXIuYnVpbGRJbWFnZUJ1dHRvbkFwcGVhcmFuY2UoY2JBcHIpO1xuICAgICAgZGVtYXhCdG5BcHIuYm9yZGVyQ29sb3JEZWZhdWx0ID0gJyNjNmM2YzYnO1xuICAgICAgZGVtYXhCdG5BcHIuYm9yZGVyQ29sb3JGb2N1c2VkID0gJyM2N2I2NTcnO1xuICAgICAgZGVtYXhCdG5BcHIuYm9yZGVyQ29sb3JIb3ZlcmVkID0gZGVtYXhCdG5BcHIuYm9yZGVyQ29sb3JGb2N1c2VkO1xuICAgICAgZGVtYXhCdG5BcHIuYm9yZGVyQ29sb3JQcmVzc2VkID0gJyMwMGFmMzgnO1xuICAgICAgZGVtYXhCdG5BcHIuYmFja2dyb3VuZENvbG9yRGVmYXVsdCA9ICcjZDBkMGQwJztcbiAgICAgIGRlbWF4QnRuQXByLmJhY2tncm91bmRDb2xvckZvY3VzZWQgPSAnIzM0Y2E0OSc7XG4gICAgICBkZW1heEJ0bkFwci5iYWNrZ3JvdW5kQ29sb3JIb3ZlcmVkID0gZGVtYXhCdG5BcHIuYmFja2dyb3VuZENvbG9yRm9jdXNlZDtcbiAgICAgIGRlbWF4QnRuQXByLmJhY2tncm91bmRDb2xvclByZXNzZWQgPSBkZW1heEJ0bkFwci5iYWNrZ3JvdW5kQ29sb3JEZWZhdWx0O1xuICAgICAgZGVtYXhCdG5BcHIuaW1hZ2VEZWZhdWx0ID0gaW1nVHJhbnNwYXJlbnQ7XG4gICAgICBkZW1heEJ0bkFwci5pbWFnZUhvdmVyZWQgPSBpbWFnZURlbWF4aW1pemU7XG4gICAgICBkZW1heEJ0bkFwci5pbWFnZVByZXNzZWQgPSBpbWFnZURlbWF4aW1pemU7XG4gICAgICBkZW1heEJ0bkFwci5pbWFnZUZvY3VzZWQgPSBpbWdUcmFuc3BhcmVudDtcbiAgICAgIHZhciBkZW1heEJ0bkVsZSA9IHBhcnRzQnVpbGRlci5idWlsZEJ1dHRvbihkZW1heEJ0bkFwcik7XG4gICAgICBkZW1heEJ0bkVsZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICB2YXIgZWxlTGVmdCA9IDQ4O1xuICAgICAgdmFyIGVsZVRvcCA9IC0xOTtcbiAgICAgIHZhciBlbGVBbGlnbiA9ICdMRUZUX1RPUCc7XG5cblxuICAgICAgZkFwci5hZGRGcmFtZUNvbXBvbmVudCgnZGV6b29tQnV0dG9uJywgZGVtYXhCdG5FbGUsIGVsZUxlZnQsIGVsZVRvcCwgZWxlQWxpZ24pO1xuICAgICAgZkFwci5hZGRGcmFtZUNvbXBvbmVudCgnem9vbUJ1dHRvbicsIHpvb21CdG5FbGUsIGVsZUxlZnQsIGVsZVRvcCwgZWxlQWxpZ24pO1xuXG4gICAgICAvL2NvbmZpZ3VyZSB6b29tIGJ1dHRvbiBhcHBlYXJhbmNlW2VuZF0vLy8vLy8vLy8vLy8vL1xuICAgIH1cbiAgICAvL1xuXG4gIH07XG4gIC8vXG5cbiAgcmV0dXJuIGZBcHI7XG59XG5cbm1vZHVsZS5leHBvcnRzLmdldFN0eWxlID0gZ2V0U3R5bGU7XG4iLCJ2YXIgbWVyZ2VEZWVwbHkgPSByZXF1aXJlKCdtZXJnZS1kZWVwbHknKTtcblxuZnVuY3Rpb24gZ2V0UHJlc2V0KHBhcmFtKSB7XG5cbiAgdmFyIHJlc3VsdCA9IHt9O1xuICByZXN1bHQuYXBwZWFyYW5jZU5hbWUgPSAneW9zZW1pdGUnO1xuICByZXN1bHQuYXBwZWFyYW5jZVBhcmFtID0ge307XG5cbiAgdmFyIHByZXNldFBhcmFtID0ge307XG5cbiAgaWYgKHBhcmFtKSB7XG4gICAgcHJlc2V0UGFyYW0gPSBwYXJhbTtcbiAgfVxuXG4gIHZhciBpc0Z1bGxTY3JlZW4gPSBwcmVzZXRQYXJhbS5tYXhpbWl6ZUJ1dHRvbkJlaGF2aW9yID09PSAnZnVsbHNjcmVlbic7XG4gIHZhciBtaW5pbWl6ZUJ1dHRvbiA9IHByZXNldFBhcmFtLm1pbmltaXplQnV0dG9uQmVoYXZpb3IgPT09ICdtaW5pbWl6ZScgPyAnbWluaW1pemVCdXR0b24nIDogbnVsbDtcbiAgdmFyIGhpZGVCdXR0b24xID0gcHJlc2V0UGFyYW0ubWluaW1pemVCdXR0b25CZWhhdmlvciA9PT0gJ2hpZGUnID8gJ21pbmltaXplQnV0dG9uJyA6IG51bGw7XG4gIHZhciBoaWRlQnV0dG9uMiA9IHByZXNldFBhcmFtLmNsb3NlQnV0dG9uQmVoYXZpb3IgPT09ICdoaWRlJyA/ICdjdXN0b20tY2xvc2UtYnV0dG9uJyA6IG51bGw7XG4gIHZhciB3aW5kb3dDb250cm9sUGFyYW0gPSBwcmVzZXRQYXJhbS5jb250cm9sO1xuXG4gIHZhciBjbG9zZUJ1dHRvbk5hbWVCeUNsb3NlQnV0dG9uQmVoYXZpb3IgPSBoaWRlQnV0dG9uMjtcbiAgdmFyIGNsb3NlQnV0dG9uTmFtZSA9IHByZXNldFBhcmFtLmNsb3NlQnV0dG9uTmFtZTtcblxuICBpZiAoaXNGdWxsU2NyZWVuKSB7XG4gICAgcmVzdWx0LmFwcGVhcmFuY2VQYXJhbS50aXRsZUJhciA9IHtcbiAgICAgIGdyZWVuQnV0dG9uOiAnZnVsbHNjcmVlbicsLy8nbWF4aW1pemUnIGljb24gb3IgJ2Z1bGxzY3JlZW4nIGljb25cbiAgICB9O1xuICB9XG4gIC8vIFNldCB0aGlzIHRvICdjbG9zZUJ1dHRvbicgdG8gYXV0b21hdGljYWxseSBjbG9zZSB3aGVuIGNsaWNraW5nXG4gIHJlc3VsdC5hcHBlYXJhbmNlUGFyYW0uY2xvc2VCdXR0b25OYW1lID0gY2xvc2VCdXR0b25OYW1lQnlDbG9zZUJ1dHRvbkJlaGF2aW9yIHx8IGNsb3NlQnV0dG9uTmFtZSB8fCAnY2xvc2VCdXR0b24nO1xuXG4gIHJlc3VsdC5zZXR1cFByZXNldFdpbmRvdyA9IGZ1bmN0aW9uKGZyYW1lKSB7XG4gICAgdmFyIGRlZmF1bHRXaW5kb3dDb250cm9sUGFyYW0gPSB7XG4gICAgICBtYXhpbWl6ZUJ1dHRvbjogJ3pvb21CdXR0b24nLFxuICAgICAgbWF4aW1pemVQYXJhbToge1xuICAgICAgICBmdWxsU2NyZWVuOiBpc0Z1bGxTY3JlZW4sLy8gdHJ1ZTptYXhpbWl6ZWQgd2l0aG91dCB0aXRsZSBiYXIsZmFsc2U6bWF4aW1pemVkIHdpdGggdGl0bGUgYmFyXG4gICAgICAgIHJlc3RvcmVLZXk6ICdFc2NhcGUnLC8vU2V0IGtleSBjb2RlIGZyb20gaHR0cHM6Ly93d3cudzMub3JnL1RSL3VpZXZlbnRzLWNvZGUvI2tleWJvYXJkLWtleS1jb2Rlc1xuICAgICAgfSxcblxuICAgICAgZGVtYXhpbWl6ZUJ1dHRvbjogJ2Rlem9vbUJ1dHRvbicsXG4gICAgICBkZW1pbmltaXplQnV0dG9uOiAnZGVtaW5pbWl6ZUJ1dHRvbicsXG4gICAgICBtaW5pbWl6ZUJ1dHRvbjogbWluaW1pemVCdXR0b24sXG4gICAgICBoaWRlQnV0dG9uczogW2hpZGVCdXR0b24xLCBoaWRlQnV0dG9uMl0sXG4gICAgICBoaWRlUGFyYW06IHtcbiAgICAgICAgYWxpZ246ICdDRU5URVJfQ0VOVEVSJywvL0FCU09MVVRFOklmIHlvdSB3YW50IHRoZSB3aW5kb3cgdG8gZGlzYXBwZWFyIGFmdGVyIHRyYW5zaXRpb25pbmcgdG8gdGhlIHBvc2l0aW9uIHlvdSBzcGVjaWZpZWRcblxuICAgICAgICBkdXJhdGlvbjogMzAwXG4gICAgICB9LFxuICAgICAgZGVoaWRlUGFyYW06IHtcbiAgICAgICAgZHVyYXRpb246IDMwMFxuICAgICAgfSxcbiAgICAgIHN0eWxlRGlzcGxheTogJ2lubGluZScsXG4gICAgICBhbmltYXRpb246IHRydWUsXG4gICAgICBhbmltYXRpb25EdXJhdGlvbjogMTAwLC8vVGhlIHdob2xlIGFuaW1hdGlvbiBkdXJhdGlvbihtaWxsaXNlYylcbiAgICB9O1xuXG4gICAgaWYgKHdpbmRvd0NvbnRyb2xQYXJhbSkge1xuICAgICAgbWVyZ2VEZWVwbHkoeyBvcDogJ292ZXJ3cml0ZS1tZXJnZScsIG9iamVjdDE6IGRlZmF1bHRXaW5kb3dDb250cm9sUGFyYW0sIG9iamVjdDI6IHdpbmRvd0NvbnRyb2xQYXJhbSB9KTtcbiAgICB9XG5cbiAgICBmcmFtZS5zZXRDb250cm9sKGRlZmF1bHRXaW5kb3dDb250cm9sUGFyYW0pO1xuICB9O1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbm1vZHVsZS5leHBvcnRzLmdldFByZXNldFdpbmRvdyA9IGdldFByZXNldDtcbiIsInZhciBDVGltZXIgPSByZXF1aXJlKCcuL0NUaW1lci5qcycpO1xuXG4vKipcbiAqIENTaW1wbGVMYXlvdXRBbmltYXRvciBjbGFzc1xuICogQ2xhc3MgZm9yIG1vdmluZyBhbmltYXRpb24gwrcgc2NhbGluZyBhbmltYXRpb24gb2YgZnJhbWUuXG4gKiA8cD5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDU2ltcGxlTGF5b3V0QW5pbWF0b3IoKSB7XG5cbiAgdGhpcy5mcHMgPSAzMDtcbiAgdGhpcy5kdXJhdGlvbk1pbGxpcyA9IDIwMDtcbiAgdGhpcy50YXJnZXRGcmFtZSA9IG51bGw7XG5cbiAgdGhpcy5fY3JyQWxwaGEgPSAxLjA7XG4gIHRoaXMuX3RvQWxwaGEgPSAxLjA7XG5cbiAgLy9jdXJyZW50IHdpZHRoL2hlaWdodFxuICB0aGlzLl9jcnJXaWR0aCA9IDA7XG4gIHRoaXMuX2NyckhlaWdodCA9IDA7XG4gIHRoaXMuX3RvV2lkdGggPSAwO1xuICB0aGlzLl90b0hlaWdodCA9IDA7XG5cbiAgLy9jdXJyZW50IHBvc2l0aW9uKHgseSlcbiAgLy90aGlzLl9jcnJYID0gMDtcbiAgLy90aGlzLl9jcnJZID0gMDtcbiAgdGhpcy5fdG9YID0gMDtcbiAgdGhpcy5fdG9ZID0gMDtcblxuXG4gIHRoaXMucGlubmVkQW5pbWF0aW9uRW5hYmxlZCA9IGZhbHNlO1xuICB0aGlzLl9waW5YID0gMDtcbiAgdGhpcy5fcGluWSA9IDA7XG4gIHRoaXMuX3BpbkFuY2hvciA9IG51bGw7XG5cbn1cblxuLyoqXG4gKiBTZXQgQ0lGcmFtZSBvYmplY3QgdG8gYmUgcmVzaXplZFxuICogQHBhcmFtIGNpZnJhbWVcbiAqIEByZXR1cm5zIHsqfVxuICovXG5DU2ltcGxlTGF5b3V0QW5pbWF0b3IucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKGNpZnJhbWUpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgbWUudGFyZ2V0RnJhbWUgPSBjaWZyYW1lO1xuXG5cbiAgbWUuZnJvbVdpZHRoKGNpZnJhbWUuZ2V0V2lkdGgoKSk7XG4gIG1lLmZyb21IZWlnaHQoY2lmcmFtZS5nZXRIZWlnaHQoKSk7XG5cbiAgbWUudG9XaWR0aChjaWZyYW1lLmdldFdpZHRoKCkpO1xuICBtZS50b0hlaWdodChjaWZyYW1lLmdldEhlaWdodCgpKTtcblxuICB2YXIgY3JyUG9zID0gY2lmcmFtZS5nZXRQb3NpdGlvbigpO1xuXG4gIG1lLmZyb21Qb3NpdGlvbihjcnJQb3MueCwgY3JyUG9zLnksIGNyclBvcy5hbmNob3IpO1xuXG5cbiAgcmV0dXJuIG1lO1xuXG59O1xuXG4vKipcbiAqIEdldCBDSUZyYW1lIG9iamVjdFxuICogQHJldHVybnMgeyp9XG4gKi9cbkNTaW1wbGVMYXlvdXRBbmltYXRvci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHJldHVybiBtZS50YXJnZXRGcmFtZTtcbn07XG5cbi8qKlxuICogU2V0IGFuaW1hdGlvbiBkdXJhdGlvbiB0aW1lIG1pbGxpc1xuICogQHBhcmFtIGR1cmF0aW9uTWlsbGlzXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuQ1NpbXBsZUxheW91dEFuaW1hdG9yLnByb3RvdHlwZS5zZXREdXJhdGlvbiA9IGZ1bmN0aW9uKGR1cmF0aW9uTWlsbGlzKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgbWUuZHVyYXRpb25NaWxsaXMgPSBkdXJhdGlvbk1pbGxpcztcbiAgcmV0dXJuIG1lO1xufTtcblxuLyoqXG4gKiBTZXQgZXhwZWN0ZWQgRlBTXG4gKiBAcGFyYW0gZnBzXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuQ1NpbXBsZUxheW91dEFuaW1hdG9yLnByb3RvdHlwZS5zZXRGUFMgPSBmdW5jdGlvbihmcHMpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgbWUuZnBzID0gZnBzO1xuICByZXR1cm4gbWU7XG59O1xuXG4vKipcbiAqIFNldCBQSU4gcG9zaXRpb25cbiAqIEBwYXJhbSB4XG4gKiBAcGFyYW0geVxuICogQHBhcmFtIGFuY2hvciBQb3NpdGlvbiB3aGVyZSBhbmltYXRpb24gc3RhcnRzIGZyb20uRXhwZWN0ZWQgcGFyYW1ldGVycyBhcyBmb2xsb3dzLlxuICdMRUZUX1RPUCc6RGVmYXVsdC5TcGVjaWZ5IHRoZSBwb3NpdGlvbiBzdGFydGluZyBmcm9tIHRoZSB1cHBlciBsZWZ0LlxuICdDRU5URVJfVE9QJ1xuICdSSUdIVF9UT1AnXG4gJ0xFRlRfQ0VOVEVSJ1xuICdDRU5URVJfQ0VOVEVSJ1xuICdSSUdIVF9DRU5URVInXG4gJ0xFRlRfQk9UVE9NJ1xuICdDRU5URVJfQk9UVE9NJ1xuICdSSUdIVF9CT1RUT00nXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuQ1NpbXBsZUxheW91dEFuaW1hdG9yLnByb3RvdHlwZS5mcm9tUG9zaXRpb24gPSBmdW5jdGlvbih4LCB5LCBhbmNob3IpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgbWUucGlubmVkQW5pbWF0aW9uRW5hYmxlZCA9IHRydWU7XG5cbiAgbWUuX3BpblggPSB4O1xuICBtZS5fcGluWSA9IHk7XG5cbiAgbWUudG9Qb3NpdGlvbih4LCB5KTtcblxuICBpZiAoYW5jaG9yKSB7XG4gICAgbWUuX3BpbkFuY2hvciA9IGFuY2hvcjtcbiAgfVxuICByZXR1cm4gbWU7XG59O1xuLyoqXG4gKiBTZXQgcmVzaXplRnJvbSB3aWR0aFxuICogQHBhcmFtIGZyb21XaWR0aFxuICogQHJldHVybnMgeyp9XG4gKi9cbkNTaW1wbGVMYXlvdXRBbmltYXRvci5wcm90b3R5cGUuZnJvbVdpZHRoID0gZnVuY3Rpb24oZnJvbVdpZHRoKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIG1lLl9jcnJXaWR0aCA9IGZyb21XaWR0aDtcblxuICByZXR1cm4gbWU7XG59O1xuXG4vKipcbiAqIFNldCByZXNpemVGcm9tIGhlaWdodFxuICogQHBhcmFtIGZyb21IZWlnaHRcbiAqIEByZXR1cm5zIHsqfVxuICovXG5DU2ltcGxlTGF5b3V0QW5pbWF0b3IucHJvdG90eXBlLmZyb21IZWlnaHQgPSBmdW5jdGlvbihmcm9tSGVpZ2h0KSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIG1lLl9jcnJIZWlnaHQgPSBmcm9tSGVpZ2h0O1xuXG4gIHJldHVybiBtZTtcbn07XG5cbi8qKlxuICogU2V0IHJlc2l6ZVRvIHdpZHRoXG4gKiBAcGFyYW0gdG9XaWR0aFxuICogQHJldHVybnMgeyp9XG4gKi9cbkNTaW1wbGVMYXlvdXRBbmltYXRvci5wcm90b3R5cGUudG9XaWR0aCA9IGZ1bmN0aW9uKHRvV2lkdGgpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgbWUuX3RvV2lkdGggPSB0b1dpZHRoO1xuXG4gIHJldHVybiBtZTtcbn07XG5cbi8qKlxuICogU2V0IHJlc2l6ZVRvIGhlaWdodFxuICogQHBhcmFtIHRvSGVpZ2h0XG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuQ1NpbXBsZUxheW91dEFuaW1hdG9yLnByb3RvdHlwZS50b0hlaWdodCA9IGZ1bmN0aW9uKHRvSGVpZ2h0KSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIG1lLl90b0hlaWdodCA9IHRvSGVpZ2h0O1xuICByZXR1cm4gbWU7XG59O1xuXG4vKipcbiAqIFNldCBmcm9tIGFscGhhXG4gKiBAcGFyYW0gZnJvbUFscGhhXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuQ1NpbXBsZUxheW91dEFuaW1hdG9yLnByb3RvdHlwZS5mcm9tQWxwaGEgPSBmdW5jdGlvbihmcm9tQWxwaGEpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgbWUuX2NyckFscGhhID0gZnJvbUFscGhhO1xuXG4gIHJldHVybiBtZTtcbn07XG5cbi8qKlxuICogU2V0IHRvIGFscGhhXG4gKiBAcGFyYW0gdG9BbHBoYVxuICogQHJldHVybnMgeyp9XG4gKi9cbkNTaW1wbGVMYXlvdXRBbmltYXRvci5wcm90b3R5cGUudG9BbHBoYSA9IGZ1bmN0aW9uKHRvQWxwaGEpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgbWUuX3RvQWxwaGEgPSB0b0FscGhhO1xuXG4gIHJldHVybiBtZTtcbn07XG5cbi8qKlxuICogR2V0IENJRnJhbWUgb2JqZWN0XG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuQ1NpbXBsZUxheW91dEFuaW1hdG9yLnByb3RvdHlwZS5lYXNlID0gZnVuY3Rpb24oZWFzZSkge1xuICB2YXIgbWUgPSB0aGlzO1xuICBtZS5fZWFzZT1lYXNlO1xuICByZXR1cm4gbWU7XG59O1xuXG4vKipcbiAqIFNldCBtb3ZlIHRvIHBvc2l0aW9uXG4gKiBAcGFyYW0geFxuICogQHBhcmFtIHlcbiAqIEByZXR1cm5zIHsqfVxuICovXG5DU2ltcGxlTGF5b3V0QW5pbWF0b3IucHJvdG90eXBlLnRvUG9zaXRpb24gPSBmdW5jdGlvbih4LCB5KSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIG1lLl90b1ggPSB4O1xuICBtZS5fdG9ZID0geTtcbiAgcmV0dXJuIG1lO1xufTtcblxuLyoqXG4gKiBTZXQgbW92ZSB0byB4XG4gKiBAcGFyYW0geFxuICogQHJldHVybnMgeyp9XG4gKi9cbkNTaW1wbGVMYXlvdXRBbmltYXRvci5wcm90b3R5cGUudG9YID0gZnVuY3Rpb24oeCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICBtZS5fdG9YID0geDtcbiAgcmV0dXJuIG1lO1xufTtcblxuLyoqXG4gKiBTZXQgbW92ZSB0byB5XG4gKiBAcGFyYW0gdFxuICogQHJldHVybnMgeyp9XG4gKi9cbkNTaW1wbGVMYXlvdXRBbmltYXRvci5wcm90b3R5cGUudG9ZID0gZnVuY3Rpb24odCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICBtZS5fdG9ZID0gdDtcbiAgcmV0dXJuIG1lO1xufTtcblxuXG5DU2ltcGxlTGF5b3V0QW5pbWF0b3IucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24od2FpdE1pbGxpcywgcmVxdWVzdEZvY3VzRW5hYmxlZCkge1xuXG5cbiAgdmFyIG1lID0gdGhpcztcblxuICB2YXIgZnJvbVdpZHRoID0gbWUuX2NycldpZHRoO1xuICB2YXIgZnJvbUhlaWdodCA9IG1lLl9jcnJIZWlnaHQ7XG5cbiAgdmFyIGZyb21YID0gbWUuX3Bpblg7XG4gIHZhciBmcm9tWSA9IG1lLl9waW5ZO1xuXG4gIHZhciBmcm9tQWxwaGEgPSBtZS5fY3JyQWxwaGE7XG5cblxuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cblxuICAgIHZhciBudW1PZlN0ZXBzID0gcGFyc2VJbnQobWUuZnBzICogKG1lLmR1cmF0aW9uTWlsbGlzIC8gMTAwMCkpO1xuICAgIGlmIChudW1PZlN0ZXBzID09IDApIHtcbiAgICAgIG51bU9mU3RlcHMgPSAxO1xuICAgIH1cblxuICAgIHZhciBkZWx0YVdpZHRoID0gKG1lLl90b1dpZHRoIC0gZnJvbVdpZHRoKSAvIG51bU9mU3RlcHM7XG4gICAgdmFyIGRlbHRhSGVpZ2h0ID0gKG1lLl90b0hlaWdodCAtIGZyb21IZWlnaHQpIC8gbnVtT2ZTdGVwcztcblxuICAgIHZhciBkZWx0YVggPSAobWUuX3RvWCAtIGZyb21YKSAvIG51bU9mU3RlcHM7XG4gICAgdmFyIGRlbHRhWSA9IChtZS5fdG9ZIC0gZnJvbVkpIC8gbnVtT2ZTdGVwcztcblxuICAgIHZhciBkZWx0YUFscGhhID0gKG1lLl90b0FscGhhIC0gZnJvbUFscGhhKSAvIG51bU9mU3RlcHM7XG4gICAgaWYobWUuX2Vhc2Upe1xuICAgICAgZGVsdGFBbHBoYT1kZWx0YUFscGhhLzEuMjQ7XG4gICAgfVxuXG4gICAgdmFyIHVuaXRNaWxsaXMgPSBtZS5kdXJhdGlvbk1pbGxpcyAvIG51bU9mU3RlcHM7XG5cbiAgICB2YXIgaWR4ID0gMDtcblxuXG4gICAgZnVuY3Rpb24gbG9vcCgpIHtcbiAgICAgIHZhciB0aW1lciA9IG5ldyBDVGltZXIoKTtcblxuICAgICAgdGltZXIuc2V0SW50ZXJ2YWxNaWxsaXModW5pdE1pbGxpcyk7XG5cbiAgICAgIHRpbWVyLnNldENhbGxiYWNrKGZ1bmN0aW9uKHRpbWVyKSB7XG5cbiAgICAgICAgaWYgKGlkeCA9PSBudW1PZlN0ZXBzKSB7XG5cbiAgICAgICAgICB2YXIgX3dpZHRoID0gbWUuX3RvV2lkdGg7XG4gICAgICAgICAgdmFyIF9oZWlnaHQgPSBtZS5fdG9IZWlnaHQ7XG5cbiAgICAgICAgICB2YXIgX3ggPSBmcm9tWCArIGRlbHRhWCAqIGlkeDtcbiAgICAgICAgICB2YXIgX3kgPSBmcm9tWSArIGRlbHRhWSAqIGlkeDtcblxuICAgICAgICAgIHZhciBfYWxwaGEgPSBtZS5fdG9BbHBoYTtcblxuICAgICAgICAgIGlmIChtZS5waW5uZWRBbmltYXRpb25FbmFibGVkKSB7XG4gICAgICAgICAgICAvL21lLnRhcmdldEZyYW1lLl9zZXRQb3NpdGlvbkludGVybmFsbHkobWUuX3BpblgsIG1lLl9waW5ZLCBtZS5fcGluQW5jaG9yLCBfd2lkdGgsIF9oZWlnaHQpO1xuXG4gICAgICAgICAgICBtZS50YXJnZXRGcmFtZS5fc2V0UG9zaXRpb25JbnRlcm5hbGx5KF94LCBfeSwgbWUuX3BpbkFuY2hvciwgX3dpZHRoLCBfaGVpZ2h0KTtcbiAgICAgICAgICB9XG5cblxuICAgICAgICAgIGlmIChtZS50YXJnZXRGcmFtZS5odG1sRWxlbWVudC5zdHlsZSkge1xuICAgICAgICAgICAgbWUudGFyZ2V0RnJhbWUuaHRtbEVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IF9hbHBoYTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvL21lLnRhcmdldEZyYW1lLnJlc2l6ZURpcmVjdChfd2lkdGgsIF9oZWlnaHQsZmFsc2UpO1xuICAgICAgICAgIG1lLnRhcmdldEZyYW1lLnNldFNpemUoX3dpZHRoLCBfaGVpZ2h0LCB0cnVlKTtcblxuICAgICAgICAgIG1lLl9jcnJXaWR0aCA9IF93aWR0aDtcbiAgICAgICAgICBtZS5fY3JySGVpZ2h0ID0gX2hlaWdodDtcblxuICAgICAgICAgIG1lLl9waW5YID0gX3g7XG4gICAgICAgICAgbWUuX3BpblkgPSBfeTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpZHggPT0gKG51bU9mU3RlcHMgKyAxKSkge1xuICAgICAgICAgIC8vU3RvcCB0aW1lciBhZnRlciBsYXN0IGRyYXcgdXBkYXRlLlxuICAgICAgICAgIHRpbWVyLnN0b3BUaW1lcigpO1xuXG4gICAgICAgICAgaWYgKG1lLnRhcmdldEZyYW1lLmh0bWxFbGVtZW50LnN0eWxlKSB7XG4gICAgICAgICAgICBtZS50YXJnZXRGcmFtZS5odG1sRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gbWUuX3RvQWxwaGE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUobWUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdmFyIF93aWR0aCA9IGZyb21XaWR0aCArIGRlbHRhV2lkdGggKiBpZHg7XG4gICAgICAgIHZhciBfaGVpZ2h0ID0gZnJvbUhlaWdodCArIGRlbHRhSGVpZ2h0ICogaWR4O1xuXG4gICAgICAgIHZhciBfeCA9IGZyb21YICsgZGVsdGFYICogaWR4O1xuICAgICAgICB2YXIgX3kgPSBmcm9tWSArIGRlbHRhWSAqIGlkeDtcblxuICAgICAgICB2YXIgX2FscGhhID0gZnJvbUFscGhhICsgZGVsdGFBbHBoYSAqIGlkeDtcblxuICAgICAgICBpZiAobWUucGlubmVkQW5pbWF0aW9uRW5hYmxlZCkge1xuICAgICAgICAgIC8vbWUudGFyZ2V0RnJhbWUuX3NldFBvc2l0aW9uSW50ZXJuYWxseShtZS5fcGluWCwgbWUuX3BpblksIG1lLl9waW5BbmNob3IsIF93aWR0aCwgX2hlaWdodCk7XG4gICAgICAgICAgbWUudGFyZ2V0RnJhbWUuX3NldFBvc2l0aW9uSW50ZXJuYWxseShfeCwgX3ksIG1lLl9waW5BbmNob3IsIF93aWR0aCwgX2hlaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWUudGFyZ2V0RnJhbWUuaHRtbEVsZW1lbnQuc3R5bGUpIHtcbiAgICAgICAgICBtZS50YXJnZXRGcmFtZS5odG1sRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gX2FscGhhO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9tZS50YXJnZXRGcmFtZS5yZXNpemVEaXJlY3QoX3dpZHRoLCBfaGVpZ2h0LGZhbHNlKTtcbiAgICAgICAgbWUudGFyZ2V0RnJhbWUuc2V0U2l6ZShfd2lkdGgsIF9oZWlnaHQsIHRydWUpO1xuXG4gICAgICAgIGlmIChpZHggPT0gMCkge1xuXG4gICAgICAgICAgLy9jaGVjayB3aW5kb3cgZXhpc3RlbmNlXG4gICAgICAgICAgdmFyIHdtZ3IgPSBtZS50YXJnZXRGcmFtZS5wYXJlbnRDYW52YXM7XG4gICAgICAgICAgaWYgKHdtZ3IpIHtcbiAgICAgICAgICAgIHZhciBfdGFyZ2V0RnJhbWUgPSB3bWdyLmdldFdpbmRvdyhtZS50YXJnZXRGcmFtZS5pZCk7XG4gICAgICAgICAgICBpZiAoX3RhcmdldEZyYW1lKSB7XG4gICAgICAgICAgICAgIG1lLnRhcmdldEZyYW1lLnNob3coeyByZXF1ZXN0Rm9jdXM6IHJlcXVlc3RGb2N1c0VuYWJsZWQgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvL3RoZSB0YXJnZXQgd2luZG93IG11c3QgYmUgZGVsZXRlZC5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZHgrKztcbiAgICAgIH0pO1xuXG5cbiAgICAgIHRpbWVyLnN0YXJ0VGltZXIoKTtcbiAgICB9XG5cbiAgICBpZiAod2FpdE1pbGxpcykge1xuXG4gICAgICB2YXIgd2FpdGVyID0gbmV3IENUaW1lcigpO1xuICAgICAgd2FpdGVyLnNldEludGVydmFsTWlsbGlzKHdhaXRNaWxsaXMpO1xuICAgICAgd2FpdGVyLnNldENhbGxiYWNrKGZ1bmN0aW9uKF90aW1lcikge1xuICAgICAgICBfdGltZXIuc3RvcFRpbWVyKCk7XG5cbiAgICAgICAgbG9vcCgpO1xuICAgICAgfSk7XG4gICAgICB3YWl0ZXIuc3RhcnRUaW1lcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb29wKCk7XG4gICAgfVxuXG5cbiAgfSk7XG5cbn07Ly9zdGFydFxuXG4vKipcbiAqIGVuZCBvZiBDU2ltcGxlTGF5b3V0QW5pbWF0b3IgY2xhc3NcbiAqL1xuLy8rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstXG5cblxubW9kdWxlLmV4cG9ydHMgPSBDU2ltcGxlTGF5b3V0QW5pbWF0b3I7XG4iLCIvKipcbiAqIENUaW1lciBjbGFzczxicj5cbiAqXG4gKiBIb3cgdG8gdXNlOlxuICogIHZhciB0aW1lciA9IG5ldyBDVGltZXIoKTtcbiAqICAgIHZhciB2YWx1ZSA9IDA7XG4gKlxuICogICAgdGltZXIuc2V0Q2FsbGJhY2soZnVuY3Rpb24gKHRpbWVyT2JqKSB7XG4gKiAgICAgICAgdmFsdWUrKztcbiAqICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gKiAgICAgICAgaWYgKHZhbHVlID09IDEwMCkge1xuICogICAgICAgICAgICB0aW1lck9iai5zdG9wVGltZXIoKTtcbiAqICAgICAgICB9XG4gKiAgICB9KTtcbiAqICAgIHRpbWVyLnNldEludGVydmFsTWlsbGlzKDEwMCk7XG4gKiAgICB0aW1lci5zdGFydFRpbWVyKCk7XG4gKlxuICogQGF1dGhvciBUb20gTWlzYXdhIChyaXZlcnN1bi5vcmdAZ21haWwuY29tKVxuICovXG52YXIgQ1RpbWVyID1cbiAgKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIENUaW1lcigpIHtcbiAgICAgIHZhciBtZSA9IHRoaXM7XG5cbiAgICAgIG1lLl90aW1lcklkID0gbnVsbDtcbiAgICAgIG1lLl9pc1J1bm5pbmcgPSBmYWxzZTtcbiAgICAgIG1lLl90aW1lckludGVydmFsID0gMDtcblxuICAgICAgbWUuX2ludGVybmFsQ2FsbGJhY2sgPSBfaW50ZXJuYWxDYWxsYmFjaztcbiAgICAgIG1lLl90aW1lck1ldGhvZCA9IG51bGw7XG5cblxuICAgICAgZnVuY3Rpb24gX2ludGVybmFsQ2FsbGJhY2soKSB7XG4gICAgICAgIGlmIChtZS5fdGltZXJNZXRob2QpIHtcbiAgICAgICAgICBtZS5fdGltZXJNZXRob2QobWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZS5faXNSdW5uaW5nKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KG1lLl90aW1lcklkKTtcbiAgICAgICAgICBtZS5fdGltZXJJZCA9IHNldFRpbWVvdXQobWUuX2ludGVybmFsQ2FsbGJhY2ssIG1lLl90aW1lckludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIENUaW1lci5wcm90b3R5cGUuc2V0Q2FsbGJhY2sgPSBmdW5jdGlvbihjYWxsYmFja19mdW5jKSB7XG4gICAgICB2YXIgbWUgPSB0aGlzO1xuICAgICAgbWUuX3RpbWVyTWV0aG9kID0gY2FsbGJhY2tfZnVuYztcbiAgICAgIHJldHVybiBtZTtcbiAgICB9O1xuXG4gICAgQ1RpbWVyLnByb3RvdHlwZS5zZXRJbnRlcnZhbE1pbGxpcyA9IGZ1bmN0aW9uKGludGVydmFsKSB7XG4gICAgICB2YXIgbWUgPSB0aGlzO1xuICAgICAgbWUuX3RpbWVySW50ZXJ2YWwgPSBpbnRlcnZhbDtcbiAgICAgIHJldHVybiBtZTtcbiAgICB9O1xuXG4gICAgQ1RpbWVyLnByb3RvdHlwZS5zdG9wVGltZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBtZSA9IHRoaXM7XG4gICAgICBtZS5faXNSdW5uaW5nID0gZmFsc2U7XG4gICAgICByZXR1cm4gbWU7XG4gICAgfTtcblxuICAgIENUaW1lci5wcm90b3R5cGUuc3RhcnRUaW1lciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG1lID0gdGhpcztcbiAgICAgIGlmIChtZS5fdGltZXJJbnRlcnZhbCA+IDApIHtcbiAgICAgICAgbWUuX3RpbWVySWQgPSBzZXRUaW1lb3V0KG1lLl9pbnRlcm5hbENhbGxiYWNrLCBtZS5fdGltZXJJbnRlcnZhbCk7XG4gICAgICAgIG1lLl9pc1J1bm5pbmcgPSB0cnVlO1xuXG4gICAgICB9XG4gICAgICByZXR1cm4gbWU7XG4gICAgfTtcblxuXG4gICAgcmV0dXJuIENUaW1lcjtcbiAgfSkoKTtcbi8qKlxuICogZW5kIG9mIENUaW1lciBjbGFzc1xuICovXG4vLystKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy1cbm1vZHVsZS5leHBvcnRzID0gQ1RpbWVyO1xuIiwiLyoqXG4gKiBJbmhlcml0YW5jZSBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSBzdWJDbGFzc1xuICogQHBhcmFtIGJhc2VDbGFzc1xuICovXG5mdW5jdGlvbiBpbmhlcml0KHN1YkNsYXNzLCBiYXNlQ2xhc3MpIHtcblxuICBmdW5jdGlvbiBjbGF6eigpIHtcbiAgfVxuXG4gIGNsYXp6LnByb3RvdHlwZSA9IGJhc2VDbGFzcy5wcm90b3R5cGU7XG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IG5ldyBjbGF6eigpO1xuXG4gIHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzO1xuICBzdWJDbGFzcy5zdXBlckNvbnN0cnVjdG9yID0gYmFzZUNsYXNzO1xuICBzdWJDbGFzcy5zdXBlckNsYXNzID0gYmFzZUNsYXNzLnByb3RvdHlwZTtcblxufVxuXG4vKipcbiAqIEVuZCBvZiBpbmhlcml0YW5jZSBmdW5jdGlvblxuICovXG5cbi8vKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluaGVyaXQ7IiwidmFyIF90eXBlb2YgPVxuICAgIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiXG4gICAgICAgID8gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgICAgIH1cbiAgICAgICAgOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqICYmXG4gICAgICAgICAgICB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgICAgIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmXG4gICAgICAgICAgICBvYmogIT09IFN5bWJvbC5wcm90b3R5cGVcbiAgICAgICAgICAgICAgICA/IFwic3ltYm9sXCJcbiAgICAgICAgICAgICAgICA6IHR5cGVvZiBvYmo7XG4gICAgICAgIH07XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBpZiAoa2V5IGluIG9iaikge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChpdGVtKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgaXRlbSAmJlxuICAgICAgICAodHlwZW9mIGl0ZW0gPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihpdGVtKSkgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgIUFycmF5LmlzQXJyYXkoaXRlbSlcbiAgICApO1xufVxuXG5mdW5jdGlvbiBvYmplY3RBc3NpZ24odGFyZ2V0KSB7XG4gICAgZm9yIChcbiAgICAgICAgdmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLFxuICAgICAgICAgICAgc291cmNlcyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSxcbiAgICAgICAgICAgIF9rZXkgPSAxO1xuICAgICAgICBfa2V5IDwgX2xlbjtcbiAgICAgICAgX2tleSsrXG4gICAgKSB7XG4gICAgICAgIHNvdXJjZXNbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIGlmICghc291cmNlcy5sZW5ndGgpIHJldHVybiB0YXJnZXQ7XG4gICAgdmFyIHNvdXJjZSA9IHNvdXJjZXMuc2hpZnQoKTtcblxuICAgIGlmIChpc09iamVjdCh0YXJnZXQpICYmIGlzT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KHNvdXJjZVtrZXldKSkge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0W2tleV0pIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBfZGVmaW5lUHJvcGVydHkoe30sIGtleSwge30pKTtcbiAgICAgICAgICAgICAgICBvYmplY3RBc3NpZ24odGFyZ2V0W2tleV0sIHNvdXJjZVtrZXldKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0YXJnZXQsIF9kZWZpbmVQcm9wZXJ0eSh7fSwga2V5LCBzb3VyY2Vba2V5XSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3RBc3NpZ24uYXBwbHkodW5kZWZpbmVkLCBbdGFyZ2V0XS5jb25jYXQoc291cmNlcykpO1xufVxuXG5cblxubW9kdWxlLmV4cG9ydHMub2JqZWN0QXNzaWduID0gb2JqZWN0QXNzaWduO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ1NpbXBsZUxheW91dEFuaW1hdG9yID0gcmVxdWlyZSgnLi9DU2ltcGxlTGF5b3V0QW5pbWF0b3IuanMnKTtcbnZhciBDQUxJR04gPSByZXF1aXJlKCcuLi9DQ29tbW9uLmpzJyk7XG52YXIgbWVyZ2VEZWVwbHkgPSByZXF1aXJlKCdtZXJnZS1kZWVwbHknKTtcbnZhciBFdmVudExpc3RlbmVySGVscGVyID0gcmVxdWlyZSgnZXZlbnQtbGlzdGVuZXItaGVscGVyJyk7XG5cbmZ1bmN0aW9uIFdpbmRvd0V2ZW50SGVscGVyKG1vZGVsKSB7XG5cbiAgdGhpcy5ldmVudExpc3RlbmVySGVscGVyID0gbmV3IEV2ZW50TGlzdGVuZXJIZWxwZXIoKTtcbiAgdGhpcy53aW5kb3dNb2RlID0gJ2RlZmF1bHQnO1xuICB0aGlzLnN0eWxlRGlzcGxheSA9ICdmbGV4JztcbiAgdGhpcy5ob3Jpem9udGFsQWxpZ24gPSAnbGVmdCc7XG4gIHRoaXMudmVydGljYWxBbGlnbiA9ICd0b3AnO1xuXG4gIHRoaXMua2V5TGlzdGVuZXIgPSBudWxsO1xuXG4gIHRoaXMubWluaW1pemVCdXR0b24gPSBudWxsO1xuICB0aGlzLm1heGltaXplQnV0dG9uID0gbnVsbDtcbiAgdGhpcy5kZW1heGltaXplQnV0dG9uID0gbnVsbDtcbiAgdGhpcy5kZW1pbmltaXplQnV0dG9uID0gbnVsbDtcblxuICB0aGlzLm9wdHMgPSBtb2RlbDtcblxuICB0aGlzLmlzV2luZG93TWFuYWdlckZpeGVkID0gbW9kZWwuZnJhbWUuanNGcmFtZS5pc1dpbmRvd01hbmFnZXJGaXhlZDtcblxuICBpZiAobW9kZWwuc3R5bGVEaXNwbGF5KSB7XG4gICAgdGhpcy5zdHlsZURpc3BsYXkgPSBtb2RlbC5zdHlsZURpc3BsYXk7XG4gIH1cbiAgaWYgKG1vZGVsLm1pbmltaXplQnV0dG9uKSB7XG4gICAgdGhpcy5taW5pbWl6ZUJ1dHRvbiA9IG1vZGVsLm1pbmltaXplQnV0dG9uO1xuICB9XG4gIGlmIChtb2RlbC5kZW1pbmltaXplQnV0dG9uKSB7XG4gICAgdGhpcy5kZW1pbmltaXplQnV0dG9uID0gbW9kZWwuZGVtaW5pbWl6ZUJ1dHRvbjtcbiAgfVxuICBpZiAobW9kZWwubWF4aW1pemVCdXR0b24pIHtcbiAgICB0aGlzLm1heGltaXplQnV0dG9uID0gbW9kZWwubWF4aW1pemVCdXR0b247XG4gIH1cbiAgaWYgKG1vZGVsLmRlbWF4aW1pemVCdXR0b24pIHtcbiAgICB0aGlzLmRlbWF4aW1pemVCdXR0b24gPSBtb2RlbC5kZW1heGltaXplQnV0dG9uO1xuICB9XG5cbiAgaWYgKG1vZGVsLmhpZGVCdXR0b24pIHtcbiAgICB0aGlzLmhpZGVCdXR0b24gPSBtb2RlbC5oaWRlQnV0dG9uO1xuICB9XG4gIGlmIChtb2RlbC5oaWRlQnV0dG9ucykge1xuICAgIHRoaXMuaGlkZUJ1dHRvbnMgPSBtb2RlbC5oaWRlQnV0dG9ucztcbiAgfVxuXG4gIHRoaXMubWF4aW1pemVQYXJhbSA9IG1vZGVsLm1heGltaXplUGFyYW07XG4gIHRoaXMuZGVtYXhpbWl6ZVBhcmFtID0gbW9kZWwuZGVtYXhpbWl6ZVBhcmFtO1xuICB0aGlzLm1pbmltaXplUGFyYW0gPSBtb2RlbC5taW5pbWl6ZVBhcmFtO1xuICB0aGlzLmRlbWluaW1pemVQYXJhbSA9IG1vZGVsLmRlbWluaW1pemVQYXJhbTtcbiAgdGhpcy5oaWRlUGFyYW0gPSBtb2RlbC5oaWRlUGFyYW07XG4gIHRoaXMuZGVoaWRlUGFyYW0gPSBtb2RlbC5kZWhpZGVQYXJhbTtcblxuXG4gIGlmIChtb2RlbC5ob3Jpem9udGFsQWxpZ24pIHtcbiAgICB0aGlzLmhvcml6b250YWxBbGlnbiA9IG1vZGVsLmhvcml6b250YWxBbGlnbjtcbiAgfVxuICBpZiAobW9kZWwudmVydGljYWxBbGlnbikge1xuICAgIHRoaXMudmVydGljYWxBbGlnbiA9IG1vZGVsLnZlcnRpY2FsQWxpZ247XG4gIH1cblxuXG4gIHRoaXMuYW5pbWF0aW9uRW5hYmxlZCA9IGZhbHNlO1xuICB0aGlzLmFuaW1hdGlvbkR1cmF0aW9uID0gMTAwO1xuICB0aGlzLmZyYW1lID0gbW9kZWwuZnJhbWU7XG4gIHRoaXMuaGlkZUZyYW1lQm9yZGVyID0gdHJ1ZTtcbiAgdGhpcy5oaWRlVGl0bGVCYXIgPSB0cnVlO1xuXG4gIHRoaXMucmVzdG9yZUtleSA9IG51bGw7XG4gIHRoaXMucmVzdG9yZUR1cmF0aW9uID0gbnVsbDtcbiAgdGhpcy5yZXN0b3JlQ2FsbGJhY2sgPSBudWxsO1xuXG4gIHRoaXMuc3RhdHNTdG9yZSA9IHt9O1xuXG4gIGlmIChtb2RlbC5hbmltYXRpb24pIHtcbiAgICB0aGlzLmFuaW1hdGlvbkVuYWJsZWQgPSBtb2RlbC5hbmltYXRpb247XG4gIH1cbiAgaWYgKG1vZGVsLmFuaW1hdGlvbkR1cmF0aW9uKSB7XG4gICAgdGhpcy5hbmltYXRpb25EdXJhdGlvbiA9IG1vZGVsLmFuaW1hdGlvbkR1cmF0aW9uO1xuICB9XG4gIHRoaXMuZXZlbnRMaXN0ZW5lcnMgPSB7fTtcblxuXG4gIC8vSWYgdGhlIHVzZXIgY2hhbmdlcyB0aGUgd2luZG93IHNpemUgd2hlbiB0aGUgd2luZG93IGlzIG1heGltaXplZCBzdGF0ZSxcbiAgLy8gYWRqdXN0IHRoZSBzaXplIHNvIHRoYXQgd2luZG93IGxvb2tzIG1heGltaXplZC5cbiAgdGhpcy5yZXNpemVMaXN0ZW5lciA9IHRoaXMuaGFuZGxlT25SZXNpemUuYmluZCh0aGlzKTtcblxuICBpZiAodGhpcy5tYXhpbWl6ZVBhcmFtICYmIHRoaXMubWF4aW1pemVQYXJhbS5tYXRjaFBhcmVudCkge1xuICAgIHRoaXMucmVzaXplTGlzdGVuZXIgPSB0aGlzLmhhbmRsZU9uVmlydHVhbFJlc2l6ZS5iaW5kKHRoaXMpO1xuICB9XG5cblxufVxuXG5XaW5kb3dFdmVudEhlbHBlci5NQVRDSF9QQVJFTlRfQ0hBTkdFX01BUktFUl9BVFRSID0gJ19fanNmcmFtZS1tcC1tYXJrZXInO1xuXG5XaW5kb3dFdmVudEhlbHBlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbihldmVudFR5cGUsIGNhbGxiYWNrKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIG1lLmV2ZW50TGlzdGVuZXJzW2V2ZW50VHlwZV0gPSBjYWxsYmFjaztcbn07XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5XaW5kb3dFdmVudEhlbHBlci5wcm90b3R5cGUuZG9NYXhpbWl6ZSA9IGZ1bmN0aW9uKG1vZGVsKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgaWYgKG1lLndpbmRvd01vZGUgPT09ICdoaWQnKSB7XG4gICAgdGhyb3cgRXJyb3IoJ1tKU3JhbWVdIEl0IGlzIG5vdCBwb3NzaWJsZSB0byBjaGFuZ2UgZGlyZWN0bHkgZnJvbSB0aGUgaGlkIHN0YXRlIHRvIHRoZSBtYXhpbWl6ZWQgc3RhdGUnKTtcbiAgICByZXR1cm47XG4gIH1cblxuXG4gIGlmIChtZS53aW5kb3dNb2RlID09PSAnbWF4aW1pemVkJyB8fCBtZS53aW5kb3dNb2RlID09PSAnbWF4aW1pemluZycpIHtcbiAgICAvLyBJZiBpdCdzIGFscmVhZHkgJ21heGltaXplZCcgc3RhdHVzLCBpdCBkb2Vzbid0IGRvIGFueXRoaW5nLlxuICAgIHJldHVybjtcbiAgfVxuXG4gIG1lLndpbmRvd01vZGUgPSAnbWF4aW1pemluZyc7XG5cblxuICB2YXIgZnJhbWUgPSBtZS5mcmFtZTtcblxuICBpZiAobW9kZWwgJiYgbW9kZWwubWF0Y2hQYXJlbnQpIHtcbiAgICAvLyBUaGUgZGl2IGVsZW1lbnQgZG9lcyBub3QgaXNzdWUgdGhlIHJlc2l6ZSBldmVudC4gRnVydGhlcm1vcmUsXG4gICAgLy8gZGl2IGlzIHNwZWNpZmllZCBhcyAxMDAlLCBzbyBzdHlsZS53aWR0aCBpcyBhbHdheXMgMTAwJS5cbiAgICAvLyBTbyBJIHdhbnQgdG8gZ2V0IHRoZSBjbGllbnRXaWR0aCBidXQgSSBjYW4ndCBnZXQgaXQgd2l0aCBtdXRhdGlvbk9ic2VydmVyLlxuICAgIC8vIFRoZXJlZm9yZSwgd2UgYWRvcHQgYSBtZWNoYW5pc20gdG8gY2F0Y2ggdGhlIHBhcmVudCB3aW5kb3dcbiAgICAvLyByZXNpemUgZXZlbnQgYW5kIGNoYW5nZSB0aGUgYXR0cmlidXRlIG9mIHRoZSBwYXJlbnQgd2luZG93IGNvbnRlbnRcbiAgICAvLyBieSBkaWZmZXJlbnRpYXRpb24gdG8gY2F0Y2ggaXQuXG4gICAgdmFyIHdpbmRvd01hbmFnZXIgPSBmcmFtZS5nZXRXaW5kb3dNYW5hZ2VyKCk7XG4gICAgdmFyIHBhcmVudEVsZW1lbnQgPSB3aW5kb3dNYW5hZ2VyLmdldFBhcmVudEVsZW1lbnQoKTtcblxuICAgIGlmICghbWUubWF0Y2hQYXJlbnRSZXNpemVPYnNlcnZlcikge1xuICAgICAgdmFyIG1hdGNoUGFyZW50UmVzaXplT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJvbiB2aXJ0dWFsIHJlc2l6ZVwiKTtcbiAgICAgICAgbWUucmVzaXplTGlzdGVuZXIoKTtcbiAgICAgIH0pO1xuICAgICAgbWF0Y2hQYXJlbnRSZXNpemVPYnNlcnZlci5vYnNlcnZlKHBhcmVudEVsZW1lbnQsIHtcbiAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbV2luZG93RXZlbnRIZWxwZXIuTUFUQ0hfUEFSRU5UX0NIQU5HRV9NQVJLRVJfQVRUUl0sXG4gICAgICAgIGF0dHJpYnV0ZXM6IHRydWVcbiAgICAgIH0pO1xuICAgICAgbWUubWF0Y2hQYXJlbnRSZXNpemVPYnNlcnZlciA9IG1hdGNoUGFyZW50UmVzaXplT2JzZXJ2ZXI7XG4gICAgfVxuICB9XG4gICAgLy9zZXQgb25yZXNpemUgbGlzdGVuZXJcbiAgLy93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgbWUucmVzaXplTGlzdGVuZXIpO1xuICBlbHNlIGlmICghbWUuZXZlbnRMaXN0ZW5lckhlbHBlci5oYXNFdmVudExpc3RlbmVyKHdpbmRvdywgJ3Jlc2l6ZScsICd3aW5kb3ctcmVzaXplLWxpc3RlbmVyJykpIHtcbiAgICBtZS5ldmVudExpc3RlbmVySGVscGVyLmFkZEV2ZW50TGlzdGVuZXIod2luZG93LCAncmVzaXplJywgbWUucmVzaXplTGlzdGVuZXIsXG4gICAgICB7IGxpc3RlbmVyTmFtZTogJ3dpbmRvdy1yZXNpemUtbGlzdGVuZXInIH0pO1xuICB9XG5cbiAgLy9SZW1lbWJlciB0aGUgc3RhdHVzIG9mIHRoZSB3aW5kb3cgYmVmb3JlIG1heGltaXppbmcgdGhlIHdpbmRvdyBzaXplXG4gIG1lLnNhdmVDdXJyZW50V2luZG93U3RhdHMoJ21heGltaXplX21vZGUnKTtcblxuICBtZS5oaWRlVGl0bGVCYXIgPSBtb2RlbCA/IG1vZGVsLmZ1bGxTY3JlZW4gOiBmYWxzZTtcblxuICBpZiAobWUuaGlkZVRpdGxlQmFyKSB7XG5cbiAgICAvL0hpZGUgb25seSB0aGUgY3VycmVudGx5IHZpc2libGUgRnJhbWVDb21wb25lbnRcbiAgICAvL+OCpuOCo+ODs+ODieOCpuOBruODouODvOODieOCkuWkieabtOOBmeOCi+WJjeOBruS7iuOBrueKtuaFi+OBp+WPr+imlueKtuaFi+OBq+OBguOCi+ODleODrOODvOODoOOCs+ODs+ODneODvOODjeODs+ODiO+8iOmWieOBmOOCi+ODnOOCv+ODs+mhnu+8ieOCkuS4jeWPr+imluOBq+OBmeOCi1xuICAgIC8vKOOCv+OCpOODiOODq+ODkOODvOmdnuihqOekuuOBruWgtOWQiOOBq+OBr+acgOWkp+WMluOBmeOCi+OBqOOBjeOBruOCouODi+ODoeODvOOCt+ODp+ODs+OBp+ODleODrOODvOODoOOCs+ODs+ODneODvOODjeODs+ODiOOCkuimi+OBm+OBquOBhOOCiOOBhuOBq+OBmeOCiylcbiAgICBmcmFtZS5oaWRlQWxsVmlzaWJsZUZyYW1lQ29tcG9uZW50cygpO1xuXG4gICAgLy/jgb7jgZ9oaWRlQWxsVmlzaWJsZUZyYW1lQ29tcG9uZW5044KS5a6f5pa944GZ44KL44Go44GN44Gr44CB5YCL5Yil44GuaGlkZUZyYW1lQ29tcG9uZW5044KEc2hvd0ZyYW1lQ29tcG9uZW5044KS5a6f6KGM44GZ44KL44GoXG4gICAgLy/nrqHnkIbjgrnjg4bjg7zjg4jjgYznoLTntrvjgZnjgovjgZ/jgoHjgIHjgr/jgqTjg4jjg6vjg5Djg7zpnZ7ooajnpLrjga7loLTlkIjjga/jganjgYbjgZvmk43kvZzjgafjgY3jgarjgYTjgajjgYTjgYbjgZPjgajjgoLjgYLjgopcbiAgICAvL2hpZGVGcmFtZUNvbXBvbmVudCDjgoQgc2hvd0ZyYW1lQ29tcG9uZW5044Gv5a6f6KGM44GX44Gq44GEXG5cbiAgfSBlbHNlIHtcblxuICAgIC8vUHJvY2VzcyByZXF1aXJlZCBmb3IgbWF4aW1pemF0aW9uXG4gICAgaWYgKG1lLm1heGltaXplQnV0dG9uKSB7XG4gICAgICBmcmFtZS5oaWRlRnJhbWVDb21wb25lbnQobWUubWF4aW1pemVCdXR0b24pO1xuICAgIH1cbiAgICBpZiAobWUuZGVtYXhpbWl6ZUJ1dHRvbikge1xuICAgICAgZnJhbWUuc2hvd0ZyYW1lQ29tcG9uZW50KG1lLmRlbWF4aW1pemVCdXR0b24sIG1lLnN0eWxlRGlzcGxheSk7XG4gICAgfVxuICB9XG5cblxuICBmcmFtZS5zZXRNb3ZhYmxlKGZhbHNlKTtcbiAgZnJhbWUuc2V0UmVzaXphYmxlKGZhbHNlKTtcblxuXG4gIGlmIChtb2RlbCAmJiBtb2RlbC5yZXN0b3JlS2V5KSB7XG4gICAgbWUucmVzdG9yZUtleSA9IG1vZGVsLnJlc3RvcmVLZXk7XG4gIH1cbiAgaWYgKG1vZGVsICYmIG1vZGVsLnJlc3RvcmVEdXJhdGlvbikge1xuICAgIG1lLnJlc3RvcmVEdXJhdGlvbiA9IG1vZGVsLnJlc3RvcmVEdXJhdGlvbjtcbiAgfVxuICBpZiAobW9kZWwgJiYgbW9kZWwucmVzdG9yZUNhbGxiYWNrKSB7XG4gICAgbWUucmVzdG9yZUNhbGxiYWNrID0gbW9kZWwucmVzdG9yZUNhbGxiYWNrO1xuICB9XG4gIC8vUmVuZGVyIG1heGltaXphdGlvbiBpdHNlbGZcbiAgbWUucmVuZGVyTWF4aW1pemVkTW9kZSh7XG4gICAgYW5pbWF0aW9uOiBtZS5hbmltYXRpb25FbmFibGVkLFxuICAgIGNhbGxiYWNrOiAobW9kZWwgJiYgbW9kZWwuY2FsbGJhY2spID8gbW9kZWwuY2FsbGJhY2sgOiBudWxsLCAvL3NldCBtYXhpbWl6ZWQgZmluaXNoZWQgY2FsbGJhY2tcbiAgICBkdXJhdGlvbjogKG1vZGVsICYmIG1vZGVsLmR1cmF0aW9uKSA/IG1vZGVsLmR1cmF0aW9uIDogbnVsbCxcbiAgICBtYXRjaFBhcmVudDogKG1vZGVsICYmIG1vZGVsLm1hdGNoUGFyZW50KSA/IG1vZGVsLm1hdGNoUGFyZW50IDogZmFsc2UsXG4gIH0pO1xufTtcblxuXG4vKipcbiAqIFJlbmRlciB3aW5kb3cgYXMgYSBtYXhpbWl6ZWQgbW9kZSggZnVsbCBzY3JlZW4gKVxuICovXG5XaW5kb3dFdmVudEhlbHBlci5wcm90b3R5cGUucmVuZGVyTWF4aW1pemVkTW9kZSA9IGZ1bmN0aW9uKG1vZGVsKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHZhciBmcmFtZSA9IG1lLmZyYW1lO1xuICB2YXIgZnJvbSA9IG1lLmxvYWRXaW5kb3dTdGF0cygnbWF4aW1pemVfbW9kZScpO1xuXG4gIHZhciBfdG9YID0gMDtcbiAgdmFyIF90b1kgPSAwO1xuICB2YXIgX3RvV2lkdGggPSAwO1xuICB2YXIgX3RvSGVpZ2h0ID0gMDtcblxuICAvL2NvbXB1dGUgcG9zaXRpb24gYW5kIHNpemVbYmVnaW5dXG4gIGlmIChtZS5oaWRlVGl0bGVCYXIpIHtcbiAgICBfdG9YID0gMDtcbiAgICBfdG9ZID0gLWZyb20udGl0bGVCYXJIZWlnaHQ7XG4gIH1cblxuICB2YXIgcGFyZW50V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgdmFyIHBhcmVudEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICBpZiAobW9kZWwubWF0Y2hQYXJlbnQpIHtcbiAgICAvLyBJZiBtYXRjaFBhcmVudCBpcyBzcGVjaWZpZWRcbiAgICAvLyBXaGVuIG1heGltaXppbmcsIHVzZSB0aGUgc2l6ZSBvZiBwYXJlbnRFbGVtZW50IHNwZWNpZmllZCBhdCBpbml0aWFsaXphdGlvblxuICAgIC8vIFBhcmVudGxFbGVtZW50IGlzIG9mdGVuIHVzZWQgb25seSBmb3IgYWRqdXN0aW5nIHRoZSBkaXNwbGF5IG9yZGVyLlxuICAgIC8vIFRoZXJlZm9yZSwgb25seSBpZiBtYXRjaFBhcmVudCBpcyBzcGVjaWZpZWQsIG1hdGNoIHRoZSBzaXplIG9mIHBhcmVudEVsZW1lbnRcbiAgICB2YXIgd2luZG93TWFuYWdlciA9IGZyYW1lLmdldFdpbmRvd01hbmFnZXIoKTtcbiAgICB2YXIgcGFyZW50RWxlbWVudCA9IHdpbmRvd01hbmFnZXIuZ2V0UGFyZW50RWxlbWVudCgpO1xuICAgIHBhcmVudFdpZHRoID0gcGFyZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICBwYXJlbnRIZWlnaHQgPSBwYXJlbnRFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgfVxuXG4gIGlmIChtZS5oaWRlRnJhbWVCb3JkZXIpIHtcbiAgICBfdG9XaWR0aCA9IHBhcmVudFdpZHRoO1xuICAgIF90b0hlaWdodCA9IHBhcmVudEhlaWdodCArIChtZS5oaWRlVGl0bGVCYXIgPyBmcm9tLnRpdGxlQmFySGVpZ2h0IDogMCk7XG4gIH0gZWxzZSB7XG4gICAgX3RvV2lkdGggPSBwYXJlbnRXaWR0aCAtIGZyb20uZnJhbWVCb3JkZXJXaWR0aERlZmF1bHQgKiAyO1xuICAgIF90b0hlaWdodCA9IHBhcmVudEhlaWdodCAtIGZyb20uZnJhbWVCb3JkZXJXaWR0aERlZmF1bHQgKiAyICsgKG1lLmhpZGVUaXRsZUJhciA/IGZyb20udGl0bGVCYXJIZWlnaHQgOiAwKTtcbiAgfVxuICAvL2NvbXB1dGUgcG9zaXRpb24gYW5kIHNpemVbZW5kXVxuXG4gIGlmIChtZS5ob3Jpem9udGFsQWxpZ24gPT0gJ3JpZ2h0Jykge1xuICAgIF90b1ggPSAtX3RvV2lkdGg7XG4gIH1cbiAgaWYgKG1lLnZlcnRpY2FsQWxpZ24gPT0gJ2JvdHRvbScpIHtcbiAgICBfdG9ZID0gLV90b0hlaWdodDtcbiAgfVxuXG5cbiAgLy9yZW5kZXIgcG9zaXRpb24gYW5kIHNpemVbYmVnaW5dXG4gIHZhciBmdW5jRG9SZW5kZXIgPSBmdW5jdGlvbihvcHQpIHtcblxuICAgIHZhciBkaXNhYmxlQ2FsbGJhY2sgPSBvcHQgJiYgb3B0LmRpc2FibGVDYWxsYmFjaztcblxuICAgIGZyYW1lLnNldFBvc2l0aW9uKF90b1gsIF90b1kpO1xuXG4gICAgaWYgKG1lLmhpZGVGcmFtZUJvcmRlcikge1xuICAgICAgZnJhbWUuZnJhbWVCb3JkZXJXaWR0aERlZmF1bHQgPSAwO1xuICAgICAgZnJhbWUuZnJhbWVCb3JkZXJXaWR0aEZvY3VzZWQgPSAwO1xuICAgICAgZnJhbWUuaHRtbEVsZW1lbnQuc3R5bGUuYm9yZGVyV2lkdGggPSAnMHB4JztcbiAgICB9XG4gICAgZnJhbWUuc2V0U2l6ZShfdG9XaWR0aCwgX3RvSGVpZ2h0LCB0cnVlKTtcblxuICAgIGlmIChkaXNhYmxlQ2FsbGJhY2spIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobWUuaGlkZVRpdGxlQmFyKSB7XG4gICAgICAvLyB3aGVuIGZ1bGwgc2NyZWVuIG1vZGUobWVhbnMgaGlkZGVuIHRpdGxlIGJhcilcblxuICAgICAgaWYgKG1lLnJlc3RvcmVLZXkpIHtcbiAgICAgICAgbWUua2V5TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSBtZS5yZXN0b3JlS2V5KSB7XG4gICAgICAgICAgICBtZS5kb0NvbW1hbmQoJ3Jlc3RvcmUnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG1lLmtleUxpc3RlbmVyKTtcblxuICAgICAgLy9hZGQga2V5bGlzdGVuZXIgZm9yIGluc2lkZSB0aGUgaWZyYW1lXG4gICAgICBpZiAoZnJhbWUuaWZyYW1lKSB7XG4gICAgICAgIGZyYW1lLmlmcmFtZS5jb250ZW50V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBtZS5rZXlMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWUud2luZG93TW9kZSA9ICdtYXhpbWl6ZWQnO1xuXG5cbiAgICBpZiAobW9kZWwgJiYgbW9kZWwuY2FsbGJhY2spIHtcbiAgICAgIG1vZGVsLmNhbGxiYWNrKG1lLmZyYW1lLCB7IGV2ZW50VHlwZTogJ21heGltaXplZCcgfSk7XG4gICAgfVxuICAgIGlmIChtZS5ldmVudExpc3RlbmVyc1snbWF4aW1pemVkJ10pIHtcbiAgICAgIG1lLmV2ZW50TGlzdGVuZXJzWydtYXhpbWl6ZWQnXShtZS5mcmFtZSwgeyBldmVudFR5cGU6ICdtYXhpbWl6ZWQnIH0pO1xuICAgIH1cblxuICB9Oy8vIGVuZCBvZiBmdW5jRG9SZW5kZXJcblxuXG4gIGlmIChtb2RlbCAmJiBtb2RlbC5hbmltYXRpb24pIHtcblxuXG4gICAgbWUuYW5pbWF0ZUZyYW1lKHtcbiAgICAgIGZyYW1lOiBmcmFtZSxcbiAgICAgIGZyb206IGZyb20sXG4gICAgICB0bzoge1xuICAgICAgICBsZWZ0OiBfdG9YLFxuICAgICAgICB0b3A6IF90b1ksXG4gICAgICAgIHdpZHRoOiBfdG9XaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBfdG9IZWlnaHRcbiAgICAgIH0sXG4gICAgICBkdXJhdGlvbjogbW9kZWwuZHVyYXRpb24gPyBtb2RlbC5kdXJhdGlvbiA6IG1lLmFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgY2FsbGJhY2s6IGZ1bmNEb1JlbmRlclxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGlmIChtb2RlbCAmJiBtb2RlbC5jYWxsZXIgPT09ICdoYW5kbGVPblJlc2l6ZScpIHtcbiAgICAgIGZ1bmNEb1JlbmRlcih7IGRpc2FibGVDYWxsYmFjazogdHJ1ZSB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnVuY0RvUmVuZGVyKCk7XG4gICAgfVxuICB9XG4gIC8vcmVuZGVyIHBvc2l0aW9uIGFuZCBzaXplW2VuZF1cbn07XG5cbldpbmRvd0V2ZW50SGVscGVyLnByb3RvdHlwZS5nZXRXaW5kb3dNb2RlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLndpbmRvd01vZGU7XG59O1xuLyoqXG4gKiBSZXN0b3JlIHdpbmRvdyBmcm9tIG1heGltaXplZCBtb2RlXG4gKi9cbldpbmRvd0V2ZW50SGVscGVyLnByb3RvdHlwZS5kb0RlbWF4aW1pemUgPSBmdW5jdGlvbihtb2RlbCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICB2YXIgZnJhbWUgPSBtZS5mcmFtZTtcblxuICBpZiAobWUud2luZG93TW9kZSA9PT0gJ2hpZCcpIHtcbiAgICAvL2NvbnNvbGUuZXJyb3IoJ2RlbWF4aW1pemUoPXJlY292ZXJ5IGZyb20gbWF4aW1pemVkKSBjYW5ub3QgYmUgcGVyZm9ybWVkIGluIGhpZCBzdGF0ZS4nKTtcbiAgICB0aHJvdyBFcnJvcignW0pTRnJhbWVdIGRlbWF4aW1pemUoPXJlY292ZXJ5IGZyb20gbWF4aW1pemVkKSBjYW5ub3QgYmUgcGVyZm9ybWVkIGluIGhpZCBzdGF0ZS4nKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIW1lLmhhc1dpbmRvd1N0YXRzKCdtYXhpbWl6ZV9tb2RlJykpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAobWUuaGlkZVRpdGxlQmFyKSB7XG5cbiAgfSBlbHNlIHtcbiAgICBpZiAobWUubWF4aW1pemVCdXR0b24pIHtcbiAgICAgIGZyYW1lLnNob3dGcmFtZUNvbXBvbmVudChtZS5tYXhpbWl6ZUJ1dHRvbiwgbWUuc3R5bGVEaXNwbGF5KTtcbiAgICB9XG4gICAgaWYgKG1lLmRlbWF4aW1pemVCdXR0b24pIHtcbiAgICAgIGZyYW1lLmhpZGVGcmFtZUNvbXBvbmVudChtZS5kZW1heGltaXplQnV0dG9uKTtcbiAgICB9XG4gIH1cblxuICBtZS5yZXN0b3JlV2luZG93KHtcbiAgICByZXN0b3JlUG9zaXRpb246IHRydWUsXG4gICAgcmVzdG9yZU1vZGU6ICdtYXhpbWl6ZV9tb2RlJyxcbiAgICBhbmltYXRpb246IG1lLmFuaW1hdGlvbkVuYWJsZWQsXG4gICAgY2FsbGJhY2s6IChtb2RlbCAmJiBtb2RlbC5jYWxsYmFjaykgPyBtb2RlbC5jYWxsYmFjayA6IG51bGwsXG4gICAgZm9yY2VTaG93RnJhbWVDb21wb25lbnRzOiAobWUuYW5pbWF0aW9uRW5hYmxlZCAmJiBtZS5oaWRlVGl0bGVCYXIpLFxuICAgIGR1cmF0aW9uOiAobW9kZWwgJiYgbW9kZWwuZHVyYXRpb24pID8gbW9kZWwuZHVyYXRpb24gOiBudWxsLFxuICAgIGV2ZW50VHlwZTogJ2RlbWF4aW1pemVkJ1xuICB9KTtcbn07XG5cblxuLyoqXG4gKiBDYWxsZWQgd2hlbiBjaGFuZ2luZyB0aGUgd2luZG93IHNpemUgYnkgdXNlciBvcGVyYXRpb24gaW4gbWF4aW1pemVkIG1vZGVcbiAqL1xuV2luZG93RXZlbnRIZWxwZXIucHJvdG90eXBlLmhhbmRsZU9uUmVzaXplID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIG1lLnJlbmRlck1heGltaXplZE1vZGUoe1xuICAgIGNhbGxlcjogJ2hhbmRsZU9uUmVzaXplJyxcbiAgICAvL21hdGNoUGFyZW50OiB0cnVlXG4gIH0pO1xufTtcbldpbmRvd0V2ZW50SGVscGVyLnByb3RvdHlwZS5oYW5kbGVPblZpcnR1YWxSZXNpemUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgbWUucmVuZGVyTWF4aW1pemVkTW9kZSh7XG4gICAgY2FsbGVyOiAnaGFuZGxlT25SZXNpemUnLFxuICAgIG1hdGNoUGFyZW50OiB0cnVlXG4gIH0pO1xufTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLyoqXG4gKiBNYWtlIHdpbmRvdyBtaW5pbWl6ZWQgbW9kZVxuICovXG5XaW5kb3dFdmVudEhlbHBlci5wcm90b3R5cGUuZG9NaW5pbWl6ZSA9IGZ1bmN0aW9uKG1vZGVsKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgaWYgKG1lLndpbmRvd01vZGUgPT09ICdtaW5pbWl6ZWQnIHx8IG1lLndpbmRvd01vZGUgPT09ICdtaW5pbWl6aW5nJykge1xuICAgIC8vIElmIGl0J3MgYWxyZWFkeSAnbWluaW1pemVkJyBzdGF0dXMsIGl0IGRvZXNuJ3QgZG8gYW55dGhpbmcuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbWUud2luZG93TW9kZSA9ICdtaW5pbWl6aW5nJztcblxuXG4gIHZhciBmcmFtZSA9IG1lLmZyYW1lO1xuXG4gIC8vUmVtZW1iZXIgdGhlIHN0YXRzIG9mIHRoZSB3aW5kb3cgYmVmb3JlIG1heGltaXppbmcgdGhlIHdpbmRvd1xuICBtZS5zYXZlQ3VycmVudFdpbmRvd1N0YXRzKCdtaW5pbWl6ZV9tb2RlJyk7XG5cblxuICBmcmFtZS5zZXRSZXNpemFibGUoZmFsc2UpO1xuXG4gIG1lLnJlbmRlck1pbmltaXplZE1vZGUoe1xuICAgIGFuaW1hdGlvbjogbWUuYW5pbWF0aW9uRW5hYmxlZCxcbiAgICBjYWxsYmFjazogKG1vZGVsICYmIG1vZGVsLmNhbGxiYWNrKSA/IG1vZGVsLmNhbGxiYWNrIDogbnVsbCxcbiAgICBkdXJhdGlvbjogKG1vZGVsICYmIG1vZGVsLmR1cmF0aW9uKSA/IG1vZGVsLmR1cmF0aW9uIDogbnVsbCxcbiAgICB0b1dpZHRoOiAobW9kZWwgJiYgbW9kZWwudG9XaWR0aCkgPyBtb2RlbC50b1dpZHRoIDogbnVsbCxcbiAgfSk7XG59O1xuXG5cbi8qKlxuICogUmVuZGVyIHdpbmRvdyBhcyBtaW5pbWl6ZWQgbW9kZVxuICovXG5XaW5kb3dFdmVudEhlbHBlci5wcm90b3R5cGUucmVuZGVyTWluaW1pemVkTW9kZSA9IGZ1bmN0aW9uKG1vZGVsKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHZhciBmcmFtZSA9IG1lLmZyYW1lO1xuICB2YXIgcmkgPSBtZS5sb2FkV2luZG93U3RhdHMoJ21pbmltaXplX21vZGUnKTtcblxuICB2YXIgZnJvbSA9IG1lLmdldEN1cnJlbnRXaW5kb3dTdGF0cygpO1xuICB2YXIgdG8gPSBtZS5nZXRDdXJyZW50V2luZG93U3RhdHMoKTtcblxuICB0by5oZWlnaHQgPSByaS50aXRsZUJhckhlaWdodDtcbiAgaWYgKG1vZGVsICYmIG1vZGVsLnRvV2lkdGgpIHtcbiAgICB0by53aWR0aCA9IG1vZGVsLnRvV2lkdGhcbiAgfVxuXG4gIHZhciBmdW5jRG9SZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZm9yY2VTZXRTaXplID0gdHJ1ZTtcbiAgICBmcmFtZS5zZXRTaXplKHRvLndpZHRoLCB0by5oZWlnaHQsIGZvcmNlU2V0U2l6ZSk7XG5cbiAgICBtZS53aW5kb3dNb2RlID0gJ21pbmltaXplZCc7XG5cbiAgICBpZiAobWUubWluaW1pemVCdXR0b24pIHtcbiAgICAgIGZyYW1lLmhpZGVGcmFtZUNvbXBvbmVudChtZS5taW5pbWl6ZUJ1dHRvbik7XG4gICAgfVxuXG4gICAgaWYgKG1lLmRlbWluaW1pemVCdXR0b24pIHtcbiAgICAgIGZyYW1lLnNob3dGcmFtZUNvbXBvbmVudChtZS5kZW1pbmltaXplQnV0dG9uLCBtZS5zdHlsZURpc3BsYXkpO1xuICAgIH1cblxuICAgIGlmIChtb2RlbC5jYWxsYmFjaykge1xuICAgICAgbW9kZWwuY2FsbGJhY2sobWUuZnJhbWUsIHsgZXZlbnRUeXBlOiAnbWluaW1pemVkJyB9KTtcbiAgICB9XG4gICAgaWYgKG1lLmV2ZW50TGlzdGVuZXJzWydtaW5pbWl6ZWQnXSkge1xuICAgICAgbWUuZXZlbnRMaXN0ZW5lcnNbJ21pbmltaXplZCddKG1lLmZyYW1lLCB7IGV2ZW50VHlwZTogJ21pbmltaXplZCcgfSk7XG4gICAgfVxuICB9O1xuXG4gIGlmIChtb2RlbCAmJiBtb2RlbC5hbmltYXRpb24pIHtcbiAgICBtZS5hbmltYXRlRnJhbWUoe1xuICAgICAgdG9BbHBoYTogMS4wLFxuICAgICAgZHVyYXRpb246IG1vZGVsLmR1cmF0aW9uID8gbW9kZWwuZHVyYXRpb24gOiBtZS5hbmltYXRpb25EdXJhdGlvbixcbiAgICAgIGZyYW1lOiBmcmFtZSxcbiAgICAgIGZyb206IGZyb20sXG4gICAgICB0bzogdG8sXG4gICAgICBjYWxsYmFjazogZnVuY0RvUmVuZGVyXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZnVuY0RvUmVuZGVyKCk7XG4gIH1cblxuXG59O1xuXG5cbi8qKlxuICogUmVzdG9yZSB3aW5kb3cgZnJvbSBtaW5pbWl6ZWQgbW9kZVxuICovXG5XaW5kb3dFdmVudEhlbHBlci5wcm90b3R5cGUuZG9EZW1pbmltaXplID0gZnVuY3Rpb24obW9kZWwpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICB2YXIgZnJhbWUgPSBtZS5mcmFtZTtcblxuICBpZiAoIW1lLmhhc1dpbmRvd1N0YXRzKCdtaW5pbWl6ZV9tb2RlJykpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAobWUubWluaW1pemVCdXR0b24pIHtcbiAgICBmcmFtZS5zaG93RnJhbWVDb21wb25lbnQobWUubWluaW1pemVCdXR0b24sIG1lLnN0eWxlRGlzcGxheSk7XG4gIH1cbiAgaWYgKG1lLmRlbWluaW1pemVCdXR0b24pIHtcbiAgICBmcmFtZS5oaWRlRnJhbWVDb21wb25lbnQobWUuZGVtaW5pbWl6ZUJ1dHRvbik7XG4gIH1cblxuICBtZS5yZXN0b3JlV2luZG93KFxuICAgIHtcbiAgICAgIHJlc3RvcmVQb3NpdGlvbjogZmFsc2UsXG4gICAgICByZXN0b3JlTW9kZTogJ21pbmltaXplX21vZGUnLFxuICAgICAgYW5pbWF0aW9uOiBtZS5hbmltYXRpb25FbmFibGVkLFxuICAgICAgZHVyYXRpb246IChtb2RlbCAmJiBtb2RlbC5kdXJhdGlvbikgPyBtb2RlbC5kdXJhdGlvbiA6IG51bGwsXG4gICAgICBjYWxsYmFjazogKG1vZGVsICYmIG1vZGVsLmNhbGxiYWNrKSA/IG1vZGVsLmNhbGxiYWNrIDogbnVsbCxcbiAgICAgIGV2ZW50VHlwZTogJ2RlbWluaW1pemVkJ1xuICAgIH0pO1xufTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8qKlxuICogTWFrZSB3aW5kb3cgaGlkZGVuIG1vZGVcbiAqL1xuV2luZG93RXZlbnRIZWxwZXIucHJvdG90eXBlLmRvSGlkZSA9IGZ1bmN0aW9uKG1vZGVsKSB7XG5cbiAgdmFyIG1lID0gdGhpcztcblxuICBpZiAobWUud2luZG93TW9kZSA9PT0gJ2hpZCcgfHwgbWUud2luZG93TW9kZSA9PT0gJ2hpZGluZycpIHtcbiAgICAvLyBJZiBpdCdzIGFscmVhZHkgJ2hpZCcgc3RhdHVzLCBpdCBkb2Vzbid0IGRvIGFueXRoaW5nLlxuICAgIHJldHVybjtcbiAgfVxuXG4gIG1lLndpbmRvd01vZGUgPSAnaGlkaW5nJztcblxuICB2YXIgZnJhbWUgPSBtZS5mcmFtZTtcblxuICAvL1JlbWVtYmVyIHRoZSBzdGF0cyBvZiB0aGUgd2luZG93IGJlZm9yZSBtYXhpbWl6aW5nIHRoZSB3aW5kb3dcbiAgbWUuc2F2ZUN1cnJlbnRXaW5kb3dTdGF0cygnaGlkZV9tb2RlJyk7XG5cblxuICBmcmFtZS5zZXRSZXNpemFibGUoZmFsc2UpO1xuXG5cbiAgdmFyIGFyZyA9IHtcbi8vICAgIHNpbGVudDogbW9kZWwuc2lsZW50LFxuICAgIGFuaW1hdGlvbjogbWUuYW5pbWF0aW9uRW5hYmxlZCxcbiAgICAvLyBkdXJhdGlvbjogKG1vZGVsICYmIG1vZGVsLmR1cmF0aW9uKSA/IG1vZGVsLmR1cmF0aW9uIDogbnVsbCxcbiAgICAvLyBjYWxsYmFjazogKG1vZGVsICYmIG1vZGVsLmNhbGxiYWNrKSA/IG1vZGVsLmNhbGxiYWNrIDogbnVsbCxcbiAgICAvLyBhbGlnbjogKG1vZGVsICYmIG1vZGVsLmFsaWduKSA/IG1vZGVsLmFsaWduIDogbnVsbCxcbiAgICAvLyBvZmZzZXQ6IChtb2RlbCAmJiBtb2RlbC5hbGlnbikgPyBtb2RlbC5vZmZzZXQgOiBudWxsLFxuICB9O1xuICBpZiAobW9kZWwpIHtcbiAgICBtZXJnZURlZXBseSh7IG9wOiAnb3ZlcndyaXRlLW1lcmdlJywgb2JqZWN0MTogYXJnLCBvYmplY3QyOiBtb2RlbCB9KTtcbiAgfVxuICBtZS5yZW5kZXJIaWRlTW9kZShhcmcpO1xufTtcblxuXG4vKipcbiAqIFJlbmRlciB3aW5kb3cgYXMgaGlkZGVuIG1vZGVcbiAqL1xuV2luZG93RXZlbnRIZWxwZXIucHJvdG90eXBlLnJlbmRlckhpZGVNb2RlID0gZnVuY3Rpb24obW9kZWwpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgdmFyIGZyYW1lID0gbWUuZnJhbWU7XG4gIHZhciByaSA9IG1lLmxvYWRXaW5kb3dTdGF0cygnaGlkZV9tb2RlJyk7XG5cbiAgdmFyIGZyb20gPSBtZS5nZXRDdXJyZW50V2luZG93U3RhdHMoKTtcblxuICB2YXIgb2Zmc2V0ID0geyB4OiAwLCB5OiAwIH07XG4gIHZhciB0b0VsZW1lbnQgPSBtb2RlbC50b0VsZW1lbnQ7XG5cbiAgaWYgKG1vZGVsLm9mZnNldCkge1xuICAgIG9mZnNldCA9IG1vZGVsLm9mZnNldDtcbiAgfVxuXG4gIHZhciBsZWZ0ID0gMDtcbiAgdmFyIHRvcCA9IDA7XG4gIHtcbiAgICB2YXIgYWxpZ24gPSAobW9kZWwgJiYgbW9kZWwuYWxpZ24pID8gbW9kZWwuYWxpZ24gOiAnTEVGVF9UT1AnO1xuXG5cbiAgICBpZiAoIWFsaWduIHx8IENBTElHTi5MRUZUX1RPUCA9PSBhbGlnbikge1xuICAgICAgbGVmdCA9IGZyb20ubGVmdDtcbiAgICAgIHRvcCA9IGZyb20udG9wO1xuICAgIH0gZWxzZSBpZiAoQ0FMSUdOLkhDRU5URVJfVE9QID09IGFsaWduKSB7XG4gICAgICBsZWZ0ID0gZnJvbS5sZWZ0ICsgZnJvbS53aWR0aCAvIDI7XG4gICAgICB0b3AgPSBmcm9tLnRvcDtcbiAgICB9IGVsc2UgaWYgKENBTElHTi5SSUdIVF9UT1AgPT0gYWxpZ24pIHtcbiAgICAgIGxlZnQgPSBmcm9tLmxlZnQgKyBmcm9tLndpZHRoO1xuICAgICAgdG9wID0gZnJvbS50b3A7XG4gICAgfSBlbHNlIGlmIChDQUxJR04uTEVGVF9WQ0VOVEVSID09IGFsaWduKSB7XG4gICAgICBsZWZ0ID0gZnJvbS5sZWZ0O1xuICAgICAgdG9wID0gZnJvbS50b3AgKyBmcm9tLmhlaWdodCAvIDI7XG4gICAgfSBlbHNlIGlmIChDQUxJR04uSENFTlRFUl9WQ0VOVEVSID09IGFsaWduKSB7XG4gICAgICBsZWZ0ID0gZnJvbS5sZWZ0ICsgZnJvbS53aWR0aCAvIDI7XG4gICAgICB0b3AgPSBmcm9tLnRvcCArIGZyb20uaGVpZ2h0IC8gMjtcbiAgICB9IGVsc2UgaWYgKENBTElHTi5SSUdIVF9WQ0VOVEVSID09IGFsaWduKSB7XG4gICAgICBsZWZ0ID0gZnJvbS5sZWZ0ICsgZnJvbS53aWR0aDtcbiAgICAgIHRvcCA9IGZyb20udG9wICsgZnJvbS5oZWlnaHQgLyAyO1xuICAgIH0gZWxzZSBpZiAoQ0FMSUdOLkxFRlRfQk9UVE9NID09IGFsaWduKSB7XG4gICAgICBsZWZ0ID0gZnJvbS5sZWZ0O1xuICAgICAgdG9wID0gZnJvbS50b3AgKyBmcm9tLmhlaWdodDtcbiAgICB9IGVsc2UgaWYgKENBTElHTi5IQ0VOVEVSX0JPVFRPTSA9PSBhbGlnbikge1xuICAgICAgbGVmdCA9IGZyb20ubGVmdCArIGZyb20ud2lkdGggLyAyO1xuICAgICAgdG9wID0gZnJvbS50b3AgKyBmcm9tLmhlaWdodDtcbiAgICB9IGVsc2UgaWYgKENBTElHTi5SSUdIVF9CT1RUT00gPT0gYWxpZ24pIHtcbiAgICAgIGxlZnQgPSBmcm9tLmxlZnQgKyBmcm9tLndpZHRoO1xuICAgICAgdG9wID0gZnJvbS50b3AgKyBmcm9tLmhlaWdodDtcblxuICAgIH0gZWxzZSBpZiAoJ0FCU09MVVRFJyA9PSBhbGlnbikge1xuICAgICAgaWYgKHRvRWxlbWVudCkge1xuICAgICAgICB2YXIgZWxlbWVudFJlY3QgPSB0b0VsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGlmIChtZS5pc1dpbmRvd01hbmFnZXJGaXhlZCkge1xuICAgICAgICAgIGxlZnQgPSBlbGVtZW50UmVjdC5sZWZ0O1xuICAgICAgICAgIHRvcCA9IGVsZW1lbnRSZWN0LnRvcDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZWZ0ID0gZWxlbWVudFJlY3QubGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldDtcbiAgICAgICAgICB0b3AgPSBlbGVtZW50UmVjdC50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxlZnQgPSBvZmZzZXQueDtcbiAgICAgICAgdG9wID0gb2Zmc2V0Lnk7XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuICB2YXIgdG8gPSB7XG4gICAgbGVmdDogbGVmdCxcbiAgICB0b3A6IHRvcCxcbiAgICB3aWR0aDogMCxcbiAgICAvL21pbmltdW0gaGVpZ2h0IG11c3QgYmUgdGl0bGVCYXJIZWlnaHRcbiAgICBoZWlnaHQ6IHJpLnRpdGxlQmFySGVpZ2h0XG4gIH07XG5cbiAgdmFyIGZ1bmNEb1JlbmRlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBmb3JjZVNldFNpemUgPSB0cnVlO1xuICAgIGZyYW1lLnNldFNpemUodG8ud2lkdGgsIHRvLmhlaWdodCwgZm9yY2VTZXRTaXplKTtcbiAgICAvL2ZyYW1lLmhpZGUoKTtcblxuICAgIG1lLndpbmRvd01vZGUgPSAnaGlkJztcblxuICAgIGlmIChtb2RlbCAmJiBtb2RlbC5jYWxsYmFjaykge1xuICAgICAgbW9kZWwuY2FsbGJhY2sobWUuZnJhbWUsIHsgZXZlbnRUeXBlOiAnaGlkJyB9KTtcbiAgICB9XG4gICAgaWYgKG1lLmV2ZW50TGlzdGVuZXJzWydoaWQnXSkge1xuICAgICAgbWUuZXZlbnRMaXN0ZW5lcnNbJ2hpZCddKG1lLmZyYW1lLCB7IGV2ZW50VHlwZTogJ2hpZCcgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8vSGlkZSBvbmx5IHRoZSBjdXJyZW50bHkgdmlzaWJsZSBGcmFtZUNvbXBvbmVudFxuICBmcmFtZS5oaWRlQWxsVmlzaWJsZUZyYW1lQ29tcG9uZW50cygpO1xuXG4gIGlmIChtb2RlbCAmJiBtb2RlbC5hbmltYXRpb24pIHtcbiAgICBtZS5hbmltYXRlRnJhbWUoe1xuICAgICAgZnJvbUFscGhhOiBtb2RlbC5zaWxlbnQgPyAwIDogMS4wLFxuICAgICAgdG9BbHBoYTogMCxcbiAgICAgIGVhc2U6IHRydWUsXG4gICAgICBkdXJhdGlvbjogbW9kZWwuZHVyYXRpb24gPyBtb2RlbC5kdXJhdGlvbiA6IG1lLmFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgZnJhbWU6IGZyYW1lLFxuICAgICAgZnJvbTogZnJvbSxcbiAgICAgIHRvOiB0byxcbiAgICAgIGNhbGxiYWNrOiBmdW5jRG9SZW5kZXJcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBmdW5jRG9SZW5kZXIoKTtcbiAgfVxuXG5cbn07XG5cblxuLyoqXG4gKiBSZXN0b3JlIHdpbmRvdyBmcm9tIGhpZGVkIG1vZGVcbiAqL1xuV2luZG93RXZlbnRIZWxwZXIucHJvdG90eXBlLmRvRGVoaWRlID0gZnVuY3Rpb24obW9kZWwpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgdmFyIGZyYW1lID0gbWUuZnJhbWU7XG5cbiAgaWYgKCFtZS5oYXNXaW5kb3dTdGF0cygnaGlkZV9tb2RlJykpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBtZS5yZXN0b3JlV2luZG93KFxuICAgIHtcbiAgICAgIGR1cmF0aW9uOiAobW9kZWwgJiYgbW9kZWwuZHVyYXRpb24pID8gbW9kZWwuZHVyYXRpb24gOiBudWxsLFxuICAgICAgcmVzdG9yZVBvc2l0aW9uOiB0cnVlLFxuICAgICAgcmVzdG9yZU1vZGU6ICdoaWRlX21vZGUnLFxuICAgICAgYW5pbWF0aW9uOiBtZS5hbmltYXRpb25FbmFibGVkLFxuICAgICAgZm9yY2VTaG93RnJhbWVDb21wb25lbnRzOiB0cnVlLFxuICAgICAgY2FsbGJhY2s6IChtb2RlbCAmJiBtb2RlbC5jYWxsYmFjaykgPyBtb2RlbC5jYWxsYmFjayA6IG51bGwsXG4gICAgICBldmVudFR5cGU6ICdkZWhpZGVkJ1xuICAgIH0pO1xufTtcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5XaW5kb3dFdmVudEhlbHBlci5wcm90b3R5cGUubG9hZFdpbmRvd1N0YXRzID0gZnVuY3Rpb24oc3RvcmVLZXlOYW1lKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHJldHVybiBtZS5zdGF0c1N0b3JlW3N0b3JlS2V5TmFtZV07XG59O1xuXG5cbi8qKlxuICogUmVtZW1iZXIgdGhlIHN0YXR1cyBvZiB0aGUgd2luZG93IGJlZm9yZSBtYXhpbWl6aW5nIG9yIG1pbmltaXppbmcgdGhlIHdpbmRvdyBzaXplXG4gKiBAcGFyYW0gc3RvcmVLZXlOYW1lXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBzdGF0dXMgb2YgdGhlIHdpbmRvdyBoYXMgYmVlbiB1cGRhdGVkIG9yIGlzIGEgbmV3IHN0YXR1cy5cbiAqIFJldHVybnMgZmFsc2UgaWYgdGhlIHN0YXR1cyBoYXMgbm90IGJlZW4gdXBkYXRlZC5cbiAqL1xuV2luZG93RXZlbnRIZWxwZXIucHJvdG90eXBlLnNhdmVDdXJyZW50V2luZG93U3RhdHMgPSBmdW5jdGlvbihzdG9yZUtleU5hbWUpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICB2YXIgY3JyV2luZG93U3RhdHMgPSBtZS5nZXRDdXJyZW50V2luZG93U3RhdHMoKTtcblxuICBpZiAobWUuaGFzV2luZG93U3RhdHMoc3RvcmVLZXlOYW1lKSkge1xuXG4gICAgdmFyIHN0b3JlZFN0YXRzID0gbWUubG9hZFdpbmRvd1N0YXRzKHN0b3JlS2V5TmFtZSk7XG4gICAgdmFyIGlzV2luZG93U3RhdHNVcGRhdGVkID0gIW1lLndpbmRvd1N0YXRzRXF1YWxzKGNycldpbmRvd1N0YXRzLCBzdG9yZWRTdGF0cyk7XG5cbiAgICBpZiAoaXNXaW5kb3dTdGF0c1VwZGF0ZWQpIHtcbiAgICAgIG1lLnN0YXRzU3RvcmVbc3RvcmVLZXlOYW1lXSA9IGNycldpbmRvd1N0YXRzO1xuICAgIH1cblxuICAgIHJldHVybiBpc1dpbmRvd1N0YXRzVXBkYXRlZDtcblxuICB9IGVsc2Uge1xuICAgIG1lLnN0YXRzU3RvcmVbc3RvcmVLZXlOYW1lXSA9IGNycldpbmRvd1N0YXRzO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cblxufTtcblxuV2luZG93RXZlbnRIZWxwZXIucHJvdG90eXBlLndpbmRvd1N0YXRzRXF1YWxzID0gZnVuY3Rpb24od2luZG93U3RhdHMxLCB3aW5kb3dTdGF0czIpIHtcblxuICBpZiAod2luZG93U3RhdHMxICYmIHdpbmRvd1N0YXRzMikge1xuICAgIHZhciByZXN1bHQgPSBKU09OLnN0cmluZ2lmeSh3aW5kb3dTdGF0czEpID09PSBKU09OLnN0cmluZ2lmeSh3aW5kb3dTdGF0czIpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbn07XG5cbldpbmRvd0V2ZW50SGVscGVyLnByb3RvdHlwZS5jbGVhcldpbmRvd1N0YXRzID0gZnVuY3Rpb24oc3RvcmVLZXlOYW1lKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIG1lLnN0YXRzU3RvcmVbc3RvcmVLZXlOYW1lXSA9IG51bGw7XG59O1xuXG5XaW5kb3dFdmVudEhlbHBlci5wcm90b3R5cGUuaGFzV2luZG93U3RhdHMgPSBmdW5jdGlvbihzdG9yZUtleU5hbWUpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgcmV0dXJuIG1lLnN0YXRzU3RvcmVbc3RvcmVLZXlOYW1lXTtcbn07XG5cbldpbmRvd0V2ZW50SGVscGVyLnByb3RvdHlwZS5nZXRDdXJyZW50V2luZG93U3RhdHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgdmFyIGZyYW1lID0gbWUuZnJhbWU7XG5cbiAgLy9BY3F1aXJlIHdpbmRvdydzIHN0YXRzXG4gIHZhciBfX3RpdGxlQmFySGVpZ2h0ID0gcGFyc2VJbnQoZnJhbWUudGl0bGVCYXIuc3R5bGUuaGVpZ2h0LCAxMCk7XG4gIHZhciBfX2ZyYW1lQm9yZGVyV2lkdGhEZWZhdWx0ID0gZnJhbWUuZnJhbWVCb3JkZXJXaWR0aERlZmF1bHQ7Ly8gcGFyc2VJbnQoZnJhbWUuaHRtbEVsZW1lbnQuc3R5bGUuYm9yZGVyV2lkdGgsIDEwKTtcbiAgdmFyIF9fZnJhbWVCb3JkZXJXaWR0aEZvY3VzZWQgPSBmcmFtZS5mcmFtZUJvcmRlcldpZHRoRm9jdXNlZDtcbiAgdmFyIF9fbGVmdCA9IGZyYW1lLmdldExlZnQoKTtcbiAgdmFyIF9fdG9wID0gZnJhbWUuZ2V0VG9wKCk7XG4gIHZhciBfX3dpZHRoID0gZnJhbWUuZ2V0V2lkdGgoKTtcbiAgdmFyIF9faGVpZ2h0ID0gZnJhbWUuZ2V0SGVpZ2h0KCk7XG4gIHZhciBfX3Jlc2l6YWJsZSA9IGZyYW1lLnJlc2l6YWJsZTtcbiAgdmFyIF9fbW92YWJsZSA9IGZyYW1lLm1vdmFibGU7XG5cblxuICByZXR1cm4ge1xuICAgIGxlZnQ6IF9fbGVmdCxcbiAgICB0b3A6IF9fdG9wLFxuICAgIHdpZHRoOiBfX3dpZHRoLFxuICAgIGhlaWdodDogX19oZWlnaHQsXG4gICAgdGl0bGVCYXJIZWlnaHQ6IF9fdGl0bGVCYXJIZWlnaHQsXG4gICAgZnJhbWVCb3JkZXJXaWR0aERlZmF1bHQ6IF9fZnJhbWVCb3JkZXJXaWR0aERlZmF1bHQsXG4gICAgZnJhbWVCb3JkZXJXaWR0aEZvY3VzZWQ6IF9fZnJhbWVCb3JkZXJXaWR0aEZvY3VzZWQsXG4gICAgcmVzaXphYmxlOiBfX3Jlc2l6YWJsZSxcbiAgICBtb3ZhYmxlOiBfX21vdmFibGUsXG4gIH07XG59O1xuXG5cbi8qKlxuICogUmVzdG9yZSB0aGUgc3RhdGUgb2YgdGhlIHdpbmRvd1xuICogQHBhcmFtIG1vZGVsXG4gKi9cbldpbmRvd0V2ZW50SGVscGVyLnByb3RvdHlwZS5yZXN0b3JlV2luZG93ID0gZnVuY3Rpb24obW9kZWwpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgdmFyIGZyYW1lID0gbWUuZnJhbWU7XG4gIHZhciB0byA9IG1lLmxvYWRXaW5kb3dTdGF0cyhtb2RlbC5yZXN0b3JlTW9kZSk7XG4gIC8v54++5Zyo44Gu54q25oWL44KS5LiA5pmC5L+d5a2Y44GZ44KLXG4gIC8vbWUuc2F2ZUN1cnJlbnRXaW5kb3dTdGF0cygndGVtcCcpO1xuICB2YXIgY3JyID0gbWUuZ2V0Q3VycmVudFdpbmRvd1N0YXRzKCk7Ly9sb2FkV2luZG93U3RhdHMoJ3RlbXAnKTtcblxuXG4gIC8v5Lul5LiL44GuM+OBpOOBr+OAgeODnOODvOODgOODvOOCkuWkquOBleOCkuWkieabtOOBmeOCi+OBn+OCgeOBruOCguOBruOBoOOBjFxuICAvLyBmdW5jRG9SZW5kZXLlhoXjgaflh6bnkIbjgZfjgabjgZfjgb7jgYbjgajjgqLjg4vjg6Hjg7zjgrfjg6fjg7PkuK3jgavjga/jg5zjg7zjg4Djg7zjgYzmj4/jgYvjgozjgarjgY/jgarjgotcbiAgLy/jgqLjg4vjg6Hjg7zjgrfjg6fjg7PkuK3jgavjga/jg5zjg7zjg4Djg7zjga/lvqnmtLvjgZfjgabjgYTjgZ/jgbvjgYbjgYzoh6rnhLbjgarjga7jgadmdW5jRG9SZW5kZXLlpJbjgaflrp/ooYzjgZnjgotcbiAgZnJhbWUuZnJhbWVCb3JkZXJXaWR0aERlZmF1bHQgPSB0by5mcmFtZUJvcmRlcldpZHRoRGVmYXVsdDtcbiAgZnJhbWUuZnJhbWVCb3JkZXJXaWR0aEZvY3VzZWQgPSB0by5mcmFtZUJvcmRlcldpZHRoRm9jdXNlZDtcbiAgZnJhbWUuaHRtbEVsZW1lbnQuc3R5bGUuYm9yZGVyV2lkdGggPSBmcmFtZS5mcmFtZUJvcmRlcldpZHRoRm9jdXNlZDtcblxuICB2YXIgZnVuY0RvUmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cblxuICAgIGlmIChtb2RlbCAmJiBtb2RlbC5yZXN0b3JlUG9zaXRpb24gPT0gZmFsc2UpIHtcbiAgICAgIC8v5L2N572u44Gu56e75YuV44KS5Ly044KP44Gq44GE5aC05ZCI77yI5pyA5bCP5YyW44GL44KJ5oi744GZ44Go44GN44Gq44GpKVxuICAgICAgdG8ubGVmdCA9IGNyci5sZWZ0O1xuICAgICAgdG8udG9wID0gY3JyLnRvcDtcbiAgICB9XG5cbiAgICBmcmFtZS5zZXRQb3NpdGlvbih0by5sZWZ0LCB0by50b3ApO1xuXG4gICAgdmFyIGZvcmNlID0gdHJ1ZTtcbiAgICBmcmFtZS5zZXRTaXplKHRvLndpZHRoLCB0by5oZWlnaHQsIGZvcmNlKTtcblxuICAgIGZyYW1lLnNldFJlc2l6YWJsZSh0by5yZXNpemFibGUpO1xuICAgIGZyYW1lLnNldE1vdmFibGUodG8ubW92YWJsZSk7XG5cbiAgICBtZS5jbGVhcldpbmRvd1N0YXRzKG1vZGVsLnJlc3RvcmVNb2RlKTtcblxuICAgIGlmIChtZS5rZXlMaXN0ZW5lcikge1xuICAgICAgLy/jgr/jgqTjg4jjg6vjg5Djg7znhKHjgZfmnIDlpKfljJbnirbmhYvjgYvjgonmiLvjgZnjgZ/jgoHjga7jgq3jg7zjg6rjgrnjg4rjg7zjga/liYrpmaTjgZnjgotcblxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBtZS5rZXlMaXN0ZW5lcik7XG4gICAgICBpZiAoZnJhbWUuaWZyYW1lKSB7XG4gICAgICAgIGZyYW1lLmlmcmFtZS5jb250ZW50V2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBtZS5rZXlMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICBtZS5rZXlMaXN0ZW5lciA9IG51bGw7XG4gICAgfVxuXG4gICAgbWUud2luZG93TW9kZSA9ICdkZWZhdWx0JztcblxuICAgIGlmIChtb2RlbCAmJiBtb2RlbC5mb3JjZVNob3dGcmFtZUNvbXBvbmVudHMpIHtcbiAgICAgIC8v44Km44Kj44Oz44OJ44Km44Gu44Oi44O844OJ5aSJ5pu05YmN44Gr5Y+v6KaW54q25oWL44Gr44GC44Gj44Gf44OV44Os44O844Og44Kz44Oz44Od44O844ON44Oz44OI77yI6ZaJ44GY44KL44Oc44K/44Oz6aGe77yJ44KS5Y+v6KaW54q25oWL44Gr44GZ44KLXG4gICAgICBmcmFtZS5zaG93QWxsVmlzaWJsZUZyYW1lQ29tcG9uZW50cygpO1xuICAgIH1cblxuICAgIGZyYW1lLnNob3coKTtcblxuICAgIHZhciBldmVudFR5cGUgPSAncmVzdG9yZWQnO1xuICAgIGlmIChtb2RlbCAmJiBtb2RlbC5ldmVudFR5cGUpIHtcbiAgICAgIGV2ZW50VHlwZSA9IG1vZGVsLmV2ZW50VHlwZTtcbiAgICB9XG5cbiAgICBpZiAobW9kZWwgJiYgbW9kZWwuY2FsbGJhY2spIHtcbiAgICAgIG1vZGVsLmNhbGxiYWNrKFxuICAgICAgICBtZS5mcmFtZSwgeyBldmVudFR5cGU6IGV2ZW50VHlwZSB9KTtcbiAgICB9XG4gICAgaWYgKG1lLmV2ZW50TGlzdGVuZXJzW2V2ZW50VHlwZV0pIHtcbiAgICAgIG1lLmV2ZW50TGlzdGVuZXJzW2V2ZW50VHlwZV0obWUuZnJhbWUsIHsgZXZlbnRUeXBlOiBldmVudFR5cGUgfSk7XG4gICAgfVxuICB9O1xuXG5cbiAgaWYgKG1vZGVsICYmIG1vZGVsLmFuaW1hdGlvbikge1xuICAgIG1lLmFuaW1hdGVGcmFtZSh7XG4gICAgICBkdXJhdGlvbjogbW9kZWwuZHVyYXRpb24gPyBtb2RlbC5kdXJhdGlvbiA6IG1lLmFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgZnJhbWU6IGZyYW1lLFxuICAgICAgZnJvbUFscGhhOiAwLFxuICAgICAgdG9BbHBoYTogMSxcbiAgICAgIGZyb206IGNycixcbiAgICAgIHRvOiB0byxcbiAgICAgIGNhbGxiYWNrOiBmdW5jRG9SZW5kZXJcbiAgICB9KTtcbiAgfSBlbHNlIHtcblxuICAgIGZ1bmNEb1JlbmRlcigpO1xuICB9XG5cbiAgLy93aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgbWUucmVzaXplTGlzdGVuZXIpO1xuICBtZS5ldmVudExpc3RlbmVySGVscGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIod2luZG93LCAncmVzaXplJywgbWUucmVzaXplTGlzdGVuZXIpO1xuICBpZiAobWUubWF0Y2hQYXJlbnRSZXNpemVPYnNlcnZlcikge1xuICAgIG1lLm1hdGNoUGFyZW50UmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIG1lLm1hdGNoUGFyZW50UmVzaXplT2JzZXJ2ZXIgPSBudWxsO1xuICB9XG5cbn07XG5cblxuV2luZG93RXZlbnRIZWxwZXIucHJvdG90eXBlLmFuaW1hdGVGcmFtZSA9IGZ1bmN0aW9uKG1vZGVsKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHZhciBuZWVkUmVxdWVzdEZvY3VzQWZ0ZXJBbmltYXRpb24gPSBmYWxzZTtcblxuXG4gIHZhciBmcm9tQWxwaGEgPSAhaXNOYU4obW9kZWwuZnJvbUFscGhhKSA/IG1vZGVsLmZyb21BbHBoYSA6IDEuMDtcblxuICB2YXIgZnJvbSA9IG1vZGVsLmZyb207XG4gIHZhciB0byA9IG1vZGVsLnRvO1xuXG4gIHZhciBhbmltYXRvciA9IG5ldyBDU2ltcGxlTGF5b3V0QW5pbWF0b3IoKTtcblxuICBhbmltYXRvci5zZXQobW9kZWwuZnJhbWUpXG4gICAgLnNldER1cmF0aW9uKG1vZGVsLmR1cmF0aW9uID8gbW9kZWwuZHVyYXRpb24gOiBtZS5hbmltYXRpb25EdXJhdGlvbilcbiAgICAuZnJvbVBvc2l0aW9uKGZyb20ubGVmdCwgZnJvbS50b3AsICdMRUZUX1RPUCcpXG4gICAgLnRvUG9zaXRpb24odG8ubGVmdCwgdG8udG9wLCAnTEVGVF9UT1AnKVxuICAgIC5mcm9tV2lkdGgoZnJvbS53aWR0aClcbiAgICAuZnJvbUhlaWdodChmcm9tLmhlaWdodClcbiAgICAudG9XaWR0aCh0by53aWR0aClcbiAgICAudG9IZWlnaHQodG8uaGVpZ2h0KVxuICAgIC5mcm9tQWxwaGEoZnJvbUFscGhhKVxuICAgIC50b0FscGhhKChtb2RlbC50b0FscGhhID09IDApID8gMCA6IDEuMClcbiAgICAuZWFzZShtb2RlbC5lYXNlKVxuICAgIC5zdGFydCgwLCBuZWVkUmVxdWVzdEZvY3VzQWZ0ZXJBbmltYXRpb24pXG4gICAgLnRoZW4oZnVuY3Rpb24oYW5pbWF0b3JPYmopIHtcbiAgICAgIG1vZGVsWydjYWxsYmFjayddKCk7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFBlcmZvcm0gY29tcGxleCB3aW5kb3dpbmcgd2l0aCBzaW1wbGUgY29tbWFuZHNcbiAqIEBwYXJhbSBjbWRcbiAqIEBwYXJhbSBvcHRcbiAqL1xuV2luZG93RXZlbnRIZWxwZXIucHJvdG90eXBlLmRvQ29tbWFuZCA9IGZ1bmN0aW9uKGNtZCwgb3B0KSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cblxuICBpZiAoY21kID09PSAnbWF4aW1pemUnKSB7XG4gICAgbWUuX2RlZmF1bHRGdW5jdGlvbk1heGltaXplKG1lLmZyYW1lKTtcbiAgfVxuICBpZiAoY21kID09PSAnZGVtYXhpbWl6ZScpIHtcbiAgICBtZS5fZGVmYXVsdEZ1bmN0aW9uRGVtYXhpbWl6ZShtZS5mcmFtZSk7XG4gIH1cbiAgaWYgKGNtZCA9PT0gJ3Jlc3RvcmUnKSB7XG4gICAgbWUuX2RlZmF1bHRGdW5jdGlvblJlc3RvcmVGcm9tRnVsbHNjcmVlbihtZS5mcmFtZSlcbiAgfVxuICBpZiAoY21kID09PSAnbWluaW1pemUnKSB7XG4gICAgbWUuX2RlZmF1bHRGdW5jdGlvbk1pbmltaXplKG1lLmZyYW1lKTtcbiAgfVxuICBpZiAoY21kID09PSAnZGVtaW5pbWl6ZScpIHtcbiAgICBtZS5fZGVmYXVsdEZ1bmN0aW9uRGVtaW5pbWl6ZShtZS5mcmFtZSk7XG4gIH1cbiAgaWYgKGNtZCA9PT0gJ2hpZGUnKSB7XG4gICAgbWUuX2RlZmF1bHRGdW5jdGlvbkhpZGUobWUuZnJhbWUpO1xuICB9XG4gIGlmIChjbWQgPT09ICdkZWhpZGUnKSB7XG4gICAgbWUuX2RlZmF1bHRGdW5jdGlvbkRlaGlkZShtZS5mcmFtZSk7XG4gIH1cbn1cblxuV2luZG93RXZlbnRIZWxwZXIucHJvdG90eXBlLl9kZWZhdWx0RnVuY3Rpb25NYXhpbWl6ZSA9IGZ1bmN0aW9uKF9mcmFtZSwgZXZ0KSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHZhciBtb2RlbCA9IG1lLm9wdHM7XG5cbiAgdmFyIHBhcmFtID0ge1xuICAgIC8vIERFUFJFQ0FURUQ6IG1heGltaXplV2l0aG91dFRpdGxlQmFyIGlzIGRlcHJlY2F0ZWRcbiAgICAvLyBVU0UgbWF4aW1pemVQYXJhbS5mdWxsU2NyZWVuXG4gICAgZnVsbFNjcmVlbjogKG1vZGVsLm1heGltaXplV2l0aG91dFRpdGxlQmFyID09PSB0cnVlKSA/IHRydWUgOiBmYWxzZSxcblxuICAgIC8vIERFUFJFQ0FURUQ6IG1vZGVsLnJlc3RvcmVLZXkgaXMgZGVwcmVjYXRlZFxuICAgIC8vIFVTRSBtYXhpbWl6ZVBhcmFtLnJlc3RvcmVLZXlcblxuICAgIC8vIElmIHlvdSB3YW50IHRvIHVzZSB0aGUga2V5IGlucHV0IGluc3RlYWQgb2YgdGhlIHRpdGxlIGJhcixcbiAgICAvLyB5b3UgY2FuIHNwZWNpZnkgdGhlIGtleSBiZWNhdXNlIGl0IGlzIG5vdCBwb3NzaWJsZVxuICAgIC8vIHRvIHJlY292ZXIgd2l0aCB0aGUgYnV0dG9uIHdoZW4gaGlkaW5nIHRoZSB0aXRsZSBiYXIuXG4gICAgcmVzdG9yZUtleTogbW9kZWwucmVzdG9yZUtleSA/IG1vZGVsLnJlc3RvcmVLZXkgOiAnRXNjYXBlJyxcblxuICAgIC8vIERFUFJFQ0FURUQ6IG1vZGVsLnJlc3RvcmVEdXJhdGlvbiBpcyBkZXByZWNhdGVkXG4gICAgLy8gVVNFIG1heGltaXplUGFyYW0ucmVzdG9yZUR1cmF0aW9uXG4gICAgcmVzdG9yZUR1cmF0aW9uOiBtb2RlbC5yZXN0b3JlRHVyYXRpb24sXG4gIH07XG5cbiAgaWYgKHRoaXMubWF4aW1pemVQYXJhbSkge1xuICAgIC8vIHdyaXRlIG1heGltaXplUGFyYW0gaW50byBwYXJhbVxuICAgIG1lcmdlRGVlcGx5KHsgb3A6ICdvdmVyd3JpdGUtbWVyZ2UnLCBvYmplY3QxOiBwYXJhbSwgb2JqZWN0MjogdGhpcy5tYXhpbWl6ZVBhcmFtIH0pO1xuICB9XG5cbiAgLy/jgqbjgqPjg7Pjg4njgqbjgpLmnIDlpKfljJbjgZnjgotcbiAgX2ZyYW1lLmNvbnRyb2wuZG9NYXhpbWl6ZShwYXJhbSk7XG59O1xuXG5XaW5kb3dFdmVudEhlbHBlci5wcm90b3R5cGUuX2RlZmF1bHRGdW5jdGlvbkRlbWF4aW1pemUgPSBmdW5jdGlvbihfZnJhbWUsIGV2dCkge1xuICBfZnJhbWUuY29udHJvbC5kb0RlbWF4aW1pemUoXG4gICAge30pO1xufTtcblxuV2luZG93RXZlbnRIZWxwZXIucHJvdG90eXBlLl9kZWZhdWx0RnVuY3Rpb25SZXN0b3JlRnJvbUZ1bGxzY3JlZW4gPSBmdW5jdGlvbihfZnJhbWUsIGV2dCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICBfZnJhbWUuY29udHJvbC5kb0RlbWF4aW1pemUoe1xuICAgIGR1cmF0aW9uOiBtZS5yZXN0b3JlRHVyYXRpb24gPyBtZS5yZXN0b3JlRHVyYXRpb24gOiBudWxsLFxuICAgIGNhbGxiYWNrOiBtZS5yZXN0b3JlQ2FsbGJhY2sgPyBtZS5yZXN0b3JlQ2FsbGJhY2sgOiBudWxsXG4gIH0pO1xufTtcblxuV2luZG93RXZlbnRIZWxwZXIucHJvdG90eXBlLl9kZWZhdWx0RnVuY3Rpb25NaW5pbWl6ZSA9IGZ1bmN0aW9uKF9mcmFtZSwgZXZ0KSB7XG5cbiAgLy8nbWluaW1pemVCdXR0b24n44GM5oq844GV44KM44Gf44Go44GN44Gr44CB5pyA5bCP5YyW44GX44Gf44GE5aC05ZCIXG4gIF9mcmFtZS5jb250cm9sLmRvTWluaW1pemUodGhpcy5taW5pbWl6ZVBhcmFtKTtcblxufTtcblxuV2luZG93RXZlbnRIZWxwZXIucHJvdG90eXBlLl9kZWZhdWx0RnVuY3Rpb25EZW1pbmltaXplID0gZnVuY3Rpb24oX2ZyYW1lLCBldnQpIHtcbiAgX2ZyYW1lLmNvbnRyb2wuZG9EZW1pbmltaXplKHRoaXMuZGVtaW5pbWl6ZVBhcmFtKTtcbn07XG5cbldpbmRvd0V2ZW50SGVscGVyLnByb3RvdHlwZS5fZGVmYXVsdEZ1bmN0aW9uSGlkZSA9IGZ1bmN0aW9uKF9mcmFtZSwgZXZ0KSB7XG5cbiAgdmFyIHBhcmFtID0ge1xuICAgIGFsaWduOiAnQ0VOVEVSX0JPVFRPTSdcbiAgfTtcbiAgaWYgKHRoaXMuaGlkZVBhcmFtKSB7XG4gICAgcGFyYW0gPSB0aGlzLmhpZGVQYXJhbTtcbiAgfVxuICBfZnJhbWUuY29udHJvbC5kb0hpZGUocGFyYW0pO1xuXG59O1xuXG5XaW5kb3dFdmVudEhlbHBlci5wcm90b3R5cGUuX2RlZmF1bHRGdW5jdGlvbkRlaGlkZSA9IGZ1bmN0aW9uKF9mcmFtZSwgZXZ0KSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIF9mcmFtZS5jb250cm9sLmRvRGVoaWRlKG1lLmRlaGlkZVBhcmFtKTtcbn07XG5cbldpbmRvd0V2ZW50SGVscGVyLnByb3RvdHlwZS5zZXR1cERlZmF1bHRFdmVudHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICBpZiAobWUubWF4aW1pemVCdXR0b24pIHtcbiAgICAvL+OCpOODmeODs+ODiOOBr+OCquODvOODkOODvOODqeOCpOODieOBleOCjOOCi1xuICAgIG1lLmZyYW1lLm9uKG1lLm1heGltaXplQnV0dG9uLCAnY2xpY2snLCBtZS5fZGVmYXVsdEZ1bmN0aW9uTWF4aW1pemUuYmluZChtZSkpO1xuICB9XG5cbiAgaWYgKG1lLmRlbWF4aW1pemVCdXR0b24pIHtcbiAgICBtZS5mcmFtZS5vbihtZS5kZW1heGltaXplQnV0dG9uLCAnY2xpY2snLCBtZS5fZGVmYXVsdEZ1bmN0aW9uRGVtYXhpbWl6ZS5iaW5kKG1lKSk7XG4gIH1cblxuICBpZiAobWUubWluaW1pemVCdXR0b24pIHtcbiAgICBtZS5mcmFtZS5vbihtZS5taW5pbWl6ZUJ1dHRvbiwgJ2NsaWNrJywgbWUuX2RlZmF1bHRGdW5jdGlvbk1pbmltaXplLmJpbmQobWUpKTtcbiAgfVxuXG4gIGlmIChtZS5kZW1pbmltaXplQnV0dG9uKSB7XG4gICAgbWUuZnJhbWUub24obWUuZGVtaW5pbWl6ZUJ1dHRvbiwgJ2NsaWNrJywgbWUuX2RlZmF1bHRGdW5jdGlvbkRlbWluaW1pemUuYmluZChtZSkpO1xuICB9XG5cbiAgaWYgKG1lLmhpZGVCdXR0b24pIHtcbiAgICBtZS5mcmFtZS5vbihtZS5oaWRlQnV0dG9uLCAnY2xpY2snLCBtZS5fZGVmYXVsdEZ1bmN0aW9uSGlkZS5iaW5kKG1lKSk7XG4gIH1cblxuICBpZiAobWUuaGlkZUJ1dHRvbnMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gbWUuaGlkZUJ1dHRvbnMpIHtcbiAgICAgIHZhciBoaWRlQnV0dG9uID0gbWUuaGlkZUJ1dHRvbnNba2V5XTtcbiAgICAgIGlmIChoaWRlQnV0dG9uKSB7XG4gICAgICAgIG1lLmZyYW1lLm9uKGhpZGVCdXR0b24sICdjbGljaycsIG1lLl9kZWZhdWx0RnVuY3Rpb25IaWRlLmJpbmQobWUpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBXaW5kb3dFdmVudEhlbHBlcjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gbW9kdWxlWydkZWZhdWx0J10gOlxuXHRcdCgpID0+IG1vZHVsZTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbW9kdWxlIGV4cG9ydHMgbXVzdCBiZSByZXR1cm5lZCBmcm9tIHJ1bnRpbWUgc28gZW50cnkgaW5saW5pbmcgaXMgZGlzYWJsZWRcbi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xucmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=

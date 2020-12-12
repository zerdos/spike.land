/*! jsframe v8.4.0 Copyright (c) 2007-2020 Tom Misawa */
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
      /***/ "../../node_modules/@riversun/event-emitter/lib/event-emitter.js":
        /*!***********************************************************************!*\
  !*** ../../node_modules/@riversun/event-emitter/lib/event-emitter.js ***!
  \***********************************************************************/
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

      /***/ "../../node_modules/event-listener-helper/lib/event-listener-helper.js":
        /*!*****************************************************************************!*\
  !*** ../../node_modules/event-listener-helper/lib/event-listener-helper.js ***!
  \*****************************************************************************/
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
                  if (t[r])return t[r].exports;
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
                    if (1 & t && (e = n(e)), 8 & t)return e;
                    if (
                      4 & t && "object" == typeof e && e && e.__esModule
                    ) {
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
                    var t = e && e.__esModule ? function () {
                      return e.default;
                    } : function () {
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
                  return (r =
                    "function" == typeof Symbol &&
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
                  for (var n = 0, r = new Array(t); n < t; n++) {
                    r[n] = e[n];
                  }
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
                          if (!i) return n;
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
                          if (!n) return !1;
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

      /***/ "../../node_modules/merge-deeply/lib/merge-deeply.js":
        /*!***********************************************************!*\
  !*** ../../node_modules/merge-deeply/lib/merge-deeply.js ***!
  \***********************************************************/
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
                    if (1 & r && (e = t(e)), 8 & r)return e;
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
                    var r = e && e.__esModule
                      ? function () {
                        return e.default;
                      }
                      : function () {
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
                  return (c =
                    "function" == typeof Symbol &&
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
                      i
                        ? l
                        : r,
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

      /***/ "./node_modules/css-loader/dist/cjs.js!./src/JSFrame.css":
        /*!***************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/JSFrame.css ***!
  \***************************************************************/
        /***/ ((module, __webpack_exports__, __webpack_require__) => {
          "use strict";
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ "default": () => __WEBPACK_DEFAULT_EXPORT__,
            /* harmony export */
          });
          /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js",
            );
          /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default =
            /*#__PURE__*/ __webpack_require__.n(
              _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__,
            );
          // Imports

          var ___CSS_LOADER_EXPORT___ =
            _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(
              function (i) {
                return i[1];
              },
            );
          // Module
          ___CSS_LOADER_EXPORT___.push(
            [
              module.id,
              ".jsframe-titlebar-default {\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #f5f5f5, color-stop(1.0, #f8f7f2)));\n    background: -webkit-linear-gradient(top, #f5f5f5, #f8f7f2);\n    background: -moz-linear-gradient(top, #f5f5f5, #f8f7f2);\n    background: linear-gradient(top, #f5f5f5, #f8f7f2);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.jsframe-titlebar-focused {\n    /* (c)2015 Johannes Jakob\n       Made with <3 in Germany */\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #ebebeb, color-stop(1.0, #d5d5d5)));\n    background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5);\n    background: -moz-linear-gradient(top, #ebebeb, #d5d5d5);\n    background: linear-gradient(top, #ebebeb, #d5d5d5);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.jsframe-modal-window-background {\n    background: rgba(0, 0, 0, 0.6);\n    height: 100%;\n    widdth: 100%\n}",
              "",
            ],
          );
          // Exports
          /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
            (___CSS_LOADER_EXPORT___);

          /***/
        }),

      /***/ "./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStyleMaterial.css":
        /*!**********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStyleMaterial.css ***!
  \**********************************************************************************************/
        /***/ ((module, __webpack_exports__, __webpack_require__) => {
          "use strict";
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ "default": () => __WEBPACK_DEFAULT_EXPORT__,
            /* harmony export */
          });
          /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js",
            );
          /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default =
            /*#__PURE__*/ __webpack_require__.n(
              _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__,
            );
          // Imports

          var ___CSS_LOADER_EXPORT___ =
            _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(
              function (i) {
                return i[1];
              },
            );
          // Module
          ___CSS_LOADER_EXPORT___.push(
            [
              module.id,
              ".jsframe-preset-style-material-default {\n    background: black;\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.jsframe-preset-style-material-focused {\n    background: black;\n    border-top-left-radius: 36px;\n    border-top-right-radius: 36px;\n}\n",
              "",
            ],
          );
          // Exports
          /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
            (___CSS_LOADER_EXPORT___);

          /***/
        }),

      /***/ "./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStylePopup.css":
        /*!*******************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStylePopup.css ***!
  \*******************************************************************************************/
        /***/ ((module, __webpack_exports__, __webpack_require__) => {
          "use strict";
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ "default": () => __WEBPACK_DEFAULT_EXPORT__,
            /* harmony export */
          });
          /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js",
            );
          /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default =
            /*#__PURE__*/ __webpack_require__.n(
              _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__,
            );
          // Imports

          var ___CSS_LOADER_EXPORT___ =
            _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(
              function (i) {
                return i[1];
              },
            );
          // Module
          ___CSS_LOADER_EXPORT___.push(
            [
              module.id,
              ".jsframe-preset-style-popup-default {\n    background: white;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n}\n\n.jsframe-preset-style-popup-focused {\n    background: white;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n}\n",
              "",
            ],
          );
          // Exports
          /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
            (___CSS_LOADER_EXPORT___);

          /***/
        }),

      /***/ "./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStyleRedstone.css":
        /*!**********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStyleRedstone.css ***!
  \**********************************************************************************************/
        /***/ ((module, __webpack_exports__, __webpack_require__) => {
          "use strict";
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ "default": () => __WEBPACK_DEFAULT_EXPORT__,
            /* harmony export */
          });
          /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js",
            );
          /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default =
            /*#__PURE__*/ __webpack_require__.n(
              _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__,
            );
          // Imports

          var ___CSS_LOADER_EXPORT___ =
            _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(
              function (i) {
                return i[1];
              },
            );
          // Module
          ___CSS_LOADER_EXPORT___.push(
            [
              module.id,
              ".jsframe-preset-style-redstone-default {\n    background: white;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n}\n\n.jsframe-preset-style-redstone-focused {\n    background: white;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n}\n",
              "",
            ],
          );
          // Exports
          /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
            (___CSS_LOADER_EXPORT___);

          /***/
        }),

      /***/ "./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStyleYosemite.css":
        /*!**********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStyleYosemite.css ***!
  \**********************************************************************************************/
        /***/ ((module, __webpack_exports__, __webpack_require__) => {
          "use strict";
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ "default": () => __WEBPACK_DEFAULT_EXPORT__,
            /* harmony export */
          });
          /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js",
            );
          /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default =
            /*#__PURE__*/ __webpack_require__.n(
              _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__,
            );
          // Imports

          var ___CSS_LOADER_EXPORT___ =
            _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(
              function (i) {
                return i[1];
              },
            );
          // Module
          ___CSS_LOADER_EXPORT___.push(
            [
              module.id,
              ".jsframe-preset-style-yosemite-default {\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #f5f5f5, color-stop(1.0, #f8f7f2)));\n    background: -webkit-linear-gradient(top, #f5f5f5, #f8f7f2);\n    background: -moz-linear-gradient(top, #f5f5f5, #f8f7f2);\n    background: linear-gradient(top, #f5f5f5, #f8f7f2);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.jsframe-preset-style-yosemite-focused {\n    /* (c)2015 Johannes Jakob\n       Made with <3 in Germany */\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #ebebeb, color-stop(1.0, #d5d5d5)));\n    background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5);\n    background: -moz-linear-gradient(top, #ebebeb, #d5d5d5);\n    background: linear-gradient(top, #ebebeb, #d5d5d5);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n",
              "",
            ],
          );
          // Exports
          /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
            (___CSS_LOADER_EXPORT___);

          /***/
        }),

      /***/ "./node_modules/css-loader/dist/runtime/api.js":
        /*!*****************************************************!*\
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

      /***/ "./src/JSFrame.css":
        /*!*************************!*\
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
        /*!********************************************************!*\
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
        /*!*****************************************************!*\
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
        /*!********************************************************!*\
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
        /*!********************************************************!*\
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
        /*!****************************************************************************!*\
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
            var css = remove ? "" : obj.media
              ? "@media ".concat(obj.media, " {").concat(obj.css, "}")
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
        /*!************************!*\
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
        /*!************************!*\
  !*** ./src/JSFrame.js ***!
  \************************/
        /***/ ((module, __unused_webpack_exports, __webpack_require__) => {
          "use strict";

          __webpack_require__(/*! ./JSFrame.css */ "./src/JSFrame.css");
          var EventEmitter = __webpack_require__(
            /*! @riversun/event-emitter */ "../../node_modules/@riversun/event-emitter/lib/event-emitter.js",
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
            /*! event-listener-helper */ "../../node_modules/event-listener-helper/lib/event-listener-helper.js",
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
                (objectArray.length - 1) - i +
                baseIndex;
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
              me.titleBar.style.width =
                (w_width - me.titleAdjustWidth +
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
                  parseInt(me.titleBarCaptionLeftMargin, 10) +
                  "px";
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
              canvasMoreSpacing - 1 -
              titleBarAdjust + me.frameHeightAdjust;

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
                .querySelector(
                  ".jsframe-child-menu",
                );
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
                        .getFrameComponentElement(
                          frameComponentId,
                        );
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
                ")" +
                '" @' + cframeObj.windowId,
            );

            var windowId = cframeObj.id;
            cframeObj.closeInternally(e, parentCanvas, windowId);
          };

          CFrame.prototype.closeFrame = function (e) {
            //Close processing of CFrame
            var me = this;

            console.log(
              'CFrame#closeFrame "' + me.title + "(" + me.getName() + ")" +
                '" @' +
                me.windowId,
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
              DEF.CFRAME.MODAL_BACKGROUND_FRAME_ID_PREFIX +
              me.id;

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
              (tmpCanvasWidth + deltaWidth) +
              "px";
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
                parseInt(refCIfFrame.iframe.width) +
                "px";
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
                parseInt(refCIfFrame.iframe.width) +
                "px";
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
        /*!*********************************************!*\
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
        /*!************************************************!*\
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
        /*!********************************************!*\
  !*** ./src/appearance/CDomPartsBuilder.js ***!
  \********************************************/
        /***/ ((module, __unused_webpack_exports, __webpack_require__) => {
          var mergeDeeply = __webpack_require__(
            /*! merge-deeply */ "../../node_modules/merge-deeply/lib/merge-deeply.js",
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
        /*!********************************************!*\
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
        /*!*******************************************!*\
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
                (parseInt(frameHeight) - parseInt(eleStyleHeight) + y) +
                "px";
            } else if (CALIGN.HCENTER_BOTTOM == frameComponentAlign) {
              eleStyle.left =
                (parseInt(frameWidth) / 2 - parseInt(eleStyleWidth) / 2 + x) +
                "px";
              eleStyle.top =
                (parseInt(frameHeight) - parseInt(eleStyleHeight) + y) +
                "px";
            } else if (CALIGN.RIGHT_BOTTOM == frameComponentAlign) {
              eleStyle.left =
                (parseInt(frameWidth) - parseInt(eleStyleWidth) + x) + "px";
              eleStyle.top =
                (parseInt(frameHeight) - parseInt(eleStyleHeight) + y) +
                "px";
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
        /*!**************************************************!*\
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
                  "px;height:" +
                  imgHeight + "px";
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
        /*!**********************!*\
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
        /*!*******************************************************!*\
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
                ndiv.style.width = (rbtSrc.childMenuWidth
                  ? rbtSrc.childMenuWidth
                  : 200) +
                  "px";
                ndiv.style.top = (parseInt(rbtEle.style.top, 10) +
                  parseInt(rbtEle.style.height, 10) / 2 + titleBarHeight / 2) +
                  "px";
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
        /*!****************************************************!*\
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
        /*!*******************************************************!*\
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
        /*!****************************************************!*\
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
        /*!*******************************************************!*\
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
                "px;height:" +
                img_height + "px";

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
        /*!****************************************************!*\
  !*** ./src/presets/window/PresetWindowYosemite.js ***!
  \****************************************************/
        /***/ ((module, __unused_webpack_exports, __webpack_require__) => {
          var mergeDeeply = __webpack_require__(
            /*! merge-deeply */ "../../node_modules/merge-deeply/lib/merge-deeply.js",
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
                ? "minimizeButton"
                : null;
            var hideButton1 = presetParam.minimizeButtonBehavior === "hide"
              ? "minimizeButton"
              : null;
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
        /*!********************************************!*\
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
        /*!*****************************!*\
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
        /*!******************************!*\
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
        /*!*************************************!*\
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
                  if (!target[key]) {Object.assign(
                      target,
                      _defineProperty({}, key, {}),
                    );}
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
        /*!****************************************!*\
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
            /*! merge-deeply */ "../../node_modules/merge-deeply/lib/merge-deeply.js",
          );
          var EventListenerHelper = __webpack_require__(
            /*! event-listener-helper */ "../../node_modules/event-listener-helper/lib/event-listener-helper.js",
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
              fullScreen: (model.maximizeWithoutTitleBar === true) ? true
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
            function (
              _frame,
              evt,
            ) {
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

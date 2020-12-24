var _ = (e, r) =>
    () => (r || (r = { exports: {} }, e(r.exports, r)), r.exports),
  w = _((ne, C) => {
    "use strict";
    var $ = Object.getOwnPropertySymbols,
      G = Object.hasOwnProperty,
      J = Object.propertyIsEnumerable;
    function K(e) {
      if (e == null) {
        throw new TypeError(
          "Object.assign cannot be called with null or undefined",
        );
      }
      return Object(e);
    }
    function Q() {
      try {
        if (!Object.assign) return !1;
        var e = new String("abc");
        if (e[5] = "de", Object.getOwnPropertyNames(e)[0] === "5") return !1;
        for (var r = {}, t = 0; t < 10; t++) {
          r["_" + String.fromCharCode(t)] = t;
        }
        var u = Object.getOwnPropertyNames(r).map(function (i) {
          return r[i];
        });
        if (u.join("") !== "0123456789") return !1;
        var n = {};
        return "abcdefghijklmnopqrst".split("").forEach(function (i) {
          n[i] = i;
        }),
          !(Object.keys(Object.assign({}, n)).join("") !==
            "abcdefghijklmnopqrst");
      } catch (i) {
        return !1;
      }
    }
    C.exports = Q() ? Object.assign : function (e, r) {
      for (var t, u = K(e), n, i = 1; i < arguments.length; i++) {
        t = Object(arguments[i]);
        for (var f in t) G.call(t, f) && (u[f] = t[f]);
        if ($) {
          n = $(t);
          for (var c = 0; c < n.length; c++) {
            J.call(t, n[c]) && (u[n[c]] = t[n[c]]);
          }
        }
      }
      return u;
    };
  }),
  B = _((o) => {
    "use strict";
    var g = w(), y = 60103, P = 60106;
    o.Fragment = 60107;
    o.StrictMode = 60108;
    o.Profiler = 60114;
    var R = 60109, b = 60110, x = 60112;
    o.Suspense = 60113;
    var q = 60115, A = 60116;
    typeof Symbol == "function" && Symbol.for &&
      (l = Symbol.for,
        y = l("react.element"),
        P = l("react.portal"),
        o.Fragment = l("react.fragment"),
        o.StrictMode = l("react.strict_mode"),
        o.Profiler = l("react.profiler"),
        R = l("react.provider"),
        b = l("react.context"),
        x = l("react.forward_ref"),
        o.Suspense = l("react.suspense"),
        q = l("react.memo"),
        A = l("react.lazy"));
    var l, I = typeof Symbol == "function" && Symbol.iterator;
    function W(e) {
      return e === null || typeof e != "object"
        ? null
        : (e = I && e[I] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    function d(e) {
      for (
        var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
          t = 1;
        t < arguments.length;
        t++
      ) {
        r += "&args[]=" + encodeURIComponent(arguments[t]);
      }
      return "Minified React error #" + e + "; visit " + r +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var N = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      U = {};
    function v(e, r, t) {
      this.props = e, this.context = r, this.refs = U, this.updater = t || N;
    }
    v.isReactComponent = {};
    v.setState = function (e, r) {
      if (typeof e != "object" && typeof e != "function" && e != null) {
        throw Error(d(85));
      }
      this.updater.enqueueSetState(this, e, r, "setState");
    };
    v.forceUpdate = function (e) {
      this.updater.enqueueForceUpdate(this, e, "forceUpdate");
    };
    function F() {}
    F.prototype = v.prototype;
    function j(e, r, t) {
      this.props = e, this.context = r, this.refs = U, this.updater = t || N;
    }
    var O = j.prototype = new F();
    O.constructor = j;
    g(O, v.prototype);
    O.isPureReactComponent = !0;
    var S = { current: null },
      M = Object.hasOwnProperty,
      D = { key: !0, ref: !0, __self: !0, __source: !0 };
    function L(e, r, t) {
      var u, n = {}, i = null, f = null;
      if (r != null) {
        for (
          u in r.ref !== void 0 && (f = r.ref),
            r.key !== void 0 && (i = "" + r.key),
            r
        ) {
          M.call(r, u) && !D.hasOwnProperty(u) && (n[u] = r[u]);
        }
      }
      var c = arguments.length - 2;
      if (c === 1) {
        n.children = t;
      } else if (1 < c) {
        for (var s = Array(c), a = 0; a < c; a++) s[a] = arguments[a + 2];
        n.children = s;
      }
      if (e && e.defaultProps) {
        for (u in c = e.defaultProps, c) n[u] === void 0 && (n[u] = c[u]);
      }
      return {
        $$typeof: y,
        type: e,
        key: i,
        ref: f,
        props: n,
        _owner: S.current,
      };
    }
    function Y(e, r) {
      return {
        $$typeof: y,
        type: e.type,
        key: r,
        ref: e.ref,
        props: e.props,
        _owner: e._owner,
      };
    }
    function E(e) {
      return typeof e == "object" && e !== null && e.$$typeof === y;
    }
    function X(e) {
      var r = { "=": "=0", ":": "=2" };
      return "$" + e.replace(/[=:]/g, function (t) {
        return r[t];
      });
    }
    var T = /\/+/g;
    function k(e, r) {
      return typeof e == "object" && e !== null && e.key != null
        ? X("" + e.key)
        : r.toString(36);
    }
    function h(e, r, t, u, n) {
      var i = typeof e;
      (i === "undefined" || i === "boolean") && (e = null);
      var f = !1;
      if (e === null) f = !0;
      else {
        switch (i) {
          case "string":
          case "number":
            f = !0;
            break;
          case "object":
            switch (e.$$typeof) {
              case y:
              case P:
                f = !0;
            }
        }
      }
      if (f) {
        return f = e,
          n = n(f),
          e = u === "" ? "." + k(f, 0) : u,
          Array.isArray(n)
            ? (t = "",
              e != null && (t = e.replace(T, "$&/") + "/"),
              h(n, r, t, "", function (a) {
                return a;
              }))
            : n != null &&
              (E(n) && (n = Y(
                n,
                t + (!n.key || f && f.key === n.key
                  ? ""
                  : ("" + n.key).replace(T, "$&/") + "/") +
                  e,
              )),
                r.push(n)),
          1;
      }
      if (f = 0, u = u === "" ? "." : u + ":", Array.isArray(e)) {
        for (var c = 0; c < e.length; c++) {
          i = e[c];
          var s = u + k(i, c);
          f += h(i, r, t, s, n);
        }
      } else if (s = W(e), typeof s == "function") {
        for (e = s.call(e), c = 0; !(i = e.next()).done;) {
          i = i.value, s = u + k(i, c++), f += h(i, r, t, s, n);
        }
      } else if (i === "object") {
        throw r = "" + e,
          Error(d(
            31,
            r === "[object Object]"
              ? "object with keys {" + Object.keys(e).join(", ") + "}"
              : r,
          ));
      }
      return f;
    }
    function m(e, r, t) {
      if (e == null) return e;
      var u = [], n = 0;
      return h(e, u, "", "", function (i) {
        return r.call(t, i, n++);
      }),
        u;
    }
    function Z(e) {
      if (e._status === -1) {
        var r = e._result;
        r = r(),
          e._status = 0,
          e._result = r,
          r.then(function (t) {
            e._status === 0 && (t = t.default, e._status = 1, e._result = t);
          }, function (t) {
            e._status === 0 && (e._status = 2, e._result = t);
          });
      }
      if (e._status === 1) return e._result;
      throw e._result;
    }
    var V = { current: null };
    function p() {
      var e = V.current;
      if (e === null) throw Error(d(321));
      return e;
    }
    var ee = {
      ReactCurrentDispatcher: V,
      ReactCurrentBatchConfig: { transition: 0 },
      ReactCurrentOwner: S,
      IsSomeRendererActing: { current: !1 },
      assign: g,
    };
    o.Children = {
      map: m,
      forEach: function (e, r, t) {
        m(e, function () {
          r.apply(this, arguments);
        }, t);
      },
      count: function (e) {
        var r = 0;
        return m(e, function () {
          r++;
        }),
          r;
      },
      toArray: function (e) {
        return m(e, function (r) {
          return r;
        }) || [];
      },
      only: function (e) {
        if (!E(e)) throw Error(d(143));
        return e;
      },
    };
    o.Component = v;
    o.PureComponent = j;
    o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ee;
    o.cloneElement = function (e, r, t) {
      if (e == null) throw Error(d(267, e));
      var u = g({}, e.props), n = e.key, i = e.ref, f = e._owner;
      if (r != null) {
        if (
          r.ref !== void 0 && (i = r.ref, f = S.current),
            r.key !== void 0 && (n = "" + r.key),
            e.type && e.type.defaultProps
        ) {
          var c = e.type.defaultProps;
        }
        for (s in r) {
          M.call(r, s) && !D.hasOwnProperty(s) &&
            (u[s] = r[s] === void 0 && c !== void 0 ? c[s] : r[s]);
        }
      }
      var s = arguments.length - 2;
      if (s === 1) u.children = t;
      else if (1 < s) {
        c = Array(s);
        for (var a = 0; a < s; a++) c[a] = arguments[a + 2];
        u.children = c;
      }
      return { $$typeof: y, type: e.type, key: n, ref: i, props: u, _owner: f };
    };
    o.createContext = function (e, r) {
      return r === void 0 && (r = null),
        e = {
          $$typeof: b,
          _calculateChangedBits: r,
          _currentValue: e,
          _currentValue2: e,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        },
        e.Provider = { $$typeof: R, _context: e },
        e.Consumer = e;
    };
    o.createElement = L;
    o.createFactory = function (e) {
      var r = L.bind(null, e);
      return r.type = e, r;
    };
    o.createRef = function () {
      return { current: null };
    };
    o.forwardRef = function (e) {
      return { $$typeof: x, render: e };
    };
    o.isValidElement = E;
    o.lazy = function (e) {
      return { $$typeof: A, _payload: { _status: -1, _result: e }, _init: Z };
    };
    o.memo = function (e, r) {
      return { $$typeof: q, type: e, compare: r === void 0 ? null : r };
    };
    o.useCallback = function (e, r) {
      return p().useCallback(e, r);
    };
    o.useContext = function (e, r) {
      return p().useContext(e, r);
    };
    o.useDebugValue = function () {};
    o.useEffect = function (e, r) {
      return p().useEffect(e, r);
    };
    o.useImperativeHandle = function (e, r, t) {
      return p().useImperativeHandle(e, r, t);
    };
    o.useLayoutEffect = function (e, r) {
      return p().useLayoutEffect(e, r);
    };
    o.useMemo = function (e, r) {
      return p().useMemo(e, r);
    };
    o.useReducer = function (e, r, t) {
      return p().useReducer(e, r, t);
    };
    o.useRef = function (e) {
      return p().useRef(e);
    };
    o.useState = function (e) {
      return p().useState(e);
    };
    o.version = "17.0.1";
  }),
  H = _((ue, z) => {
    "use strict";
    z.exports = B();
  }),
  { useState: re } = H();
export { re as useState };
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/** @license React v17.0.1
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

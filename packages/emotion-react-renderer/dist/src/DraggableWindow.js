var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (callback, module) => () => {
  if (!module) {
    module = {exports: {}};
    callback(module.exports, module);
  }
  return module.exports;
};
var __exportStar = (target, module, desc) => {
  __markAsModule(target);
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module) => {
  if (module && module.__esModule)
    return module;
  return __exportStar(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", {value: module, enumerable: true}), module);
};

// ../../node_modules/object-assign/index.js
var require_object_assign = __commonJS((exports, module) => {
  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  "use strict";
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;
  function toObject(val) {
    if (val === null || val === void 0) {
      throw new TypeError("Object.assign cannot be called with null or undefined");
    }
    return Object(val);
  }
  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      }
      var test1 = new String("abc");
      test1[5] = "de";
      if (Object.getOwnPropertyNames(test1)[0] === "5") {
        return false;
      }
      var test2 = {};
      for (var i2 = 0; i2 < 10; i2++) {
        test2["_" + String.fromCharCode(i2)] = i2;
      }
      var order2 = Object.getOwnPropertyNames(test2).map(function(n2) {
        return test2[n2];
      });
      if (order2.join("") !== "0123456789") {
        return false;
      }
      var test3 = {};
      "abcdefghijklmnopqrst".split("").forEach(function(letter) {
        test3[letter] = letter;
      });
      if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }
  module.exports = shouldUseNative() ? Object.assign : function(target, source) {
    var from;
    var to = toObject(target);
    var symbols;
    for (var s = 1; s < arguments.length; s++) {
      from = Object(arguments[s]);
      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }
      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from);
        for (var i2 = 0; i2 < symbols.length; i2++) {
          if (propIsEnumerable.call(from, symbols[i2])) {
            to[symbols[i2]] = from[symbols[i2]];
          }
        }
      }
    }
    return to;
  };
});

// ../../node_modules/react/cjs/react.production.min.js
var require_react_production_min = __commonJS((exports) => {
  /** @license React v17.0.1
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  "use strict";
  var l = require_object_assign();
  var n2 = 60103;
  var p2 = 60106;
  exports.Fragment = 60107;
  exports.StrictMode = 60108;
  exports.Profiler = 60114;
  var q2 = 60109;
  var r2 = 60110;
  var t2 = 60112;
  exports.Suspense = 60113;
  var u = 60115;
  var v = 60116;
  if (typeof Symbol === "function" && Symbol.for) {
    w = Symbol.for;
    n2 = w("react.element");
    p2 = w("react.portal");
    exports.Fragment = w("react.fragment");
    exports.StrictMode = w("react.strict_mode");
    exports.Profiler = w("react.profiler");
    q2 = w("react.provider");
    r2 = w("react.context");
    t2 = w("react.forward_ref");
    exports.Suspense = w("react.suspense");
    u = w("react.memo");
    v = w("react.lazy");
  }
  var w;
  var x2 = typeof Symbol === "function" && Symbol.iterator;
  function y2(a2) {
    if (a2 === null || typeof a2 !== "object")
      return null;
    a2 = x2 && a2[x2] || a2["@@iterator"];
    return typeof a2 === "function" ? a2 : null;
  }
  function z2(a2) {
    for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c2 = 1; c2 < arguments.length; c2++)
      b += "&args[]=" + encodeURIComponent(arguments[c2]);
    return "Minified React error #" + a2 + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var A2 = {isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  }};
  var B2 = {};
  function C2(a2, b, c2) {
    this.props = a2;
    this.context = b;
    this.refs = B2;
    this.updater = c2 || A2;
  }
  C2.prototype.isReactComponent = {};
  C2.prototype.setState = function(a2, b) {
    if (typeof a2 !== "object" && typeof a2 !== "function" && a2 != null)
      throw Error(z2(85));
    this.updater.enqueueSetState(this, a2, b, "setState");
  };
  C2.prototype.forceUpdate = function(a2) {
    this.updater.enqueueForceUpdate(this, a2, "forceUpdate");
  };
  function D2() {
  }
  D2.prototype = C2.prototype;
  function E2(a2, b, c2) {
    this.props = a2;
    this.context = b;
    this.refs = B2;
    this.updater = c2 || A2;
  }
  var F2 = E2.prototype = new D2();
  F2.constructor = E2;
  l(F2, C2.prototype);
  F2.isPureReactComponent = true;
  var G2 = {current: null};
  var H2 = Object.prototype.hasOwnProperty;
  var I2 = {key: true, ref: true, __self: true, __source: true};
  function J2(a2, b, c2) {
    var e2, d2 = {}, k2 = null, h = null;
    if (b != null)
      for (e2 in b.ref !== void 0 && (h = b.ref), b.key !== void 0 && (k2 = "" + b.key), b)
        H2.call(b, e2) && !I2.hasOwnProperty(e2) && (d2[e2] = b[e2]);
    var g2 = arguments.length - 2;
    if (g2 === 1)
      d2.children = c2;
    else if (1 < g2) {
      for (var f = Array(g2), m2 = 0; m2 < g2; m2++)
        f[m2] = arguments[m2 + 2];
      d2.children = f;
    }
    if (a2 && a2.defaultProps)
      for (e2 in g2 = a2.defaultProps, g2)
        d2[e2] === void 0 && (d2[e2] = g2[e2]);
    return {$$typeof: n2, type: a2, key: k2, ref: h, props: d2, _owner: G2.current};
  }
  function K2(a2, b) {
    return {$$typeof: n2, type: a2.type, key: b, ref: a2.ref, props: a2.props, _owner: a2._owner};
  }
  function L2(a2) {
    return typeof a2 === "object" && a2 !== null && a2.$$typeof === n2;
  }
  function escape2(a2) {
    var b = {"=": "=0", ":": "=2"};
    return "$" + a2.replace(/[=:]/g, function(a3) {
      return b[a3];
    });
  }
  var M2 = /\/+/g;
  function N2(a2, b) {
    return typeof a2 === "object" && a2 !== null && a2.key != null ? escape2("" + a2.key) : b.toString(36);
  }
  function O2(a2, b, c2, e2, d2) {
    var k2 = typeof a2;
    if (k2 === "undefined" || k2 === "boolean")
      a2 = null;
    var h = false;
    if (a2 === null)
      h = true;
    else
      switch (k2) {
        case "string":
        case "number":
          h = true;
          break;
        case "object":
          switch (a2.$$typeof) {
            case n2:
            case p2:
              h = true;
          }
      }
    if (h)
      return h = a2, d2 = d2(h), a2 = e2 === "" ? "." + N2(h, 0) : e2, Array.isArray(d2) ? (c2 = "", a2 != null && (c2 = a2.replace(M2, "$&/") + "/"), O2(d2, b, c2, "", function(a3) {
        return a3;
      })) : d2 != null && (L2(d2) && (d2 = K2(d2, c2 + (!d2.key || h && h.key === d2.key ? "" : ("" + d2.key).replace(M2, "$&/") + "/") + a2)), b.push(d2)), 1;
    h = 0;
    e2 = e2 === "" ? "." : e2 + ":";
    if (Array.isArray(a2))
      for (var g2 = 0; g2 < a2.length; g2++) {
        k2 = a2[g2];
        var f = e2 + N2(k2, g2);
        h += O2(k2, b, c2, f, d2);
      }
    else if (f = y2(a2), typeof f === "function")
      for (a2 = f.call(a2), g2 = 0; !(k2 = a2.next()).done; )
        k2 = k2.value, f = e2 + N2(k2, g2++), h += O2(k2, b, c2, f, d2);
    else if (k2 === "object")
      throw b = "" + a2, Error(z2(31, b === "[object Object]" ? "object with keys {" + Object.keys(a2).join(", ") + "}" : b));
    return h;
  }
  function P2(a2, b, c2) {
    if (a2 == null)
      return a2;
    var e2 = [], d2 = 0;
    O2(a2, e2, "", "", function(a3) {
      return b.call(c2, a3, d2++);
    });
    return e2;
  }
  function Q2(a2) {
    if (a2._status === -1) {
      var b = a2._result;
      b = b();
      a2._status = 0;
      a2._result = b;
      b.then(function(b2) {
        a2._status === 0 && (b2 = b2.default, a2._status = 1, a2._result = b2);
      }, function(b2) {
        a2._status === 0 && (a2._status = 2, a2._result = b2);
      });
    }
    if (a2._status === 1)
      return a2._result;
    throw a2._result;
  }
  var R2 = {current: null};
  function S2() {
    var a2 = R2.current;
    if (a2 === null)
      throw Error(z2(321));
    return a2;
  }
  var T2 = {ReactCurrentDispatcher: R2, ReactCurrentBatchConfig: {transition: 0}, ReactCurrentOwner: G2, IsSomeRendererActing: {current: false}, assign: l};
  exports.Children = {map: P2, forEach: function(a2, b, c2) {
    P2(a2, function() {
      b.apply(this, arguments);
    }, c2);
  }, count: function(a2) {
    var b = 0;
    P2(a2, function() {
      b++;
    });
    return b;
  }, toArray: function(a2) {
    return P2(a2, function(a3) {
      return a3;
    }) || [];
  }, only: function(a2) {
    if (!L2(a2))
      throw Error(z2(143));
    return a2;
  }};
  exports.Component = C2;
  exports.PureComponent = E2;
  exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T2;
  exports.cloneElement = function(a2, b, c2) {
    if (a2 === null || a2 === void 0)
      throw Error(z2(267, a2));
    var e2 = l({}, a2.props), d2 = a2.key, k2 = a2.ref, h = a2._owner;
    if (b != null) {
      b.ref !== void 0 && (k2 = b.ref, h = G2.current);
      b.key !== void 0 && (d2 = "" + b.key);
      if (a2.type && a2.type.defaultProps)
        var g2 = a2.type.defaultProps;
      for (f in b)
        H2.call(b, f) && !I2.hasOwnProperty(f) && (e2[f] = b[f] === void 0 && g2 !== void 0 ? g2[f] : b[f]);
    }
    var f = arguments.length - 2;
    if (f === 1)
      e2.children = c2;
    else if (1 < f) {
      g2 = Array(f);
      for (var m2 = 0; m2 < f; m2++)
        g2[m2] = arguments[m2 + 2];
      e2.children = g2;
    }
    return {
      $$typeof: n2,
      type: a2.type,
      key: d2,
      ref: k2,
      props: e2,
      _owner: h
    };
  };
  exports.createContext = function(a2, b) {
    b === void 0 && (b = null);
    a2 = {$$typeof: r2, _calculateChangedBits: b, _currentValue: a2, _currentValue2: a2, _threadCount: 0, Provider: null, Consumer: null};
    a2.Provider = {$$typeof: q2, _context: a2};
    return a2.Consumer = a2;
  };
  exports.createElement = J2;
  exports.createFactory = function(a2) {
    var b = J2.bind(null, a2);
    b.type = a2;
    return b;
  };
  exports.createRef = function() {
    return {current: null};
  };
  exports.forwardRef = function(a2) {
    return {$$typeof: t2, render: a2};
  };
  exports.isValidElement = L2;
  exports.lazy = function(a2) {
    return {$$typeof: v, _payload: {_status: -1, _result: a2}, _init: Q2};
  };
  exports.memo = function(a2, b) {
    return {$$typeof: u, type: a2, compare: b === void 0 ? null : b};
  };
  exports.useCallback = function(a2, b) {
    return S2().useCallback(a2, b);
  };
  exports.useContext = function(a2, b) {
    return S2().useContext(a2, b);
  };
  exports.useDebugValue = function() {
  };
  exports.useEffect = function(a2, b) {
    return S2().useEffect(a2, b);
  };
  exports.useImperativeHandle = function(a2, b, c2) {
    return S2().useImperativeHandle(a2, b, c2);
  };
  exports.useLayoutEffect = function(a2, b) {
    return S2().useLayoutEffect(a2, b);
  };
  exports.useMemo = function(a2, b) {
    return S2().useMemo(a2, b);
  };
  exports.useReducer = function(a2, b, c2) {
    return S2().useReducer(a2, b, c2);
  };
  exports.useRef = function(a2) {
    return S2().useRef(a2);
  };
  exports.useState = function(a2) {
    return S2().useState(a2);
  };
  exports.version = "17.0.1";
});

// ../../node_modules/react/index.js
var require_react = __commonJS((exports, module) => {
  "use strict";
  if (true) {
    module.exports = require_react_production_min();
  } else {
    module.exports = null;
  }
});

// ../../node_modules/prop-types/lib/ReactPropTypesSecret.js
var require_ReactPropTypesSecret = __commonJS((exports, module) => {
  "use strict";
  var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  module.exports = ReactPropTypesSecret;
});

// ../../node_modules/prop-types/factoryWithThrowingShims.js
var require_factoryWithThrowingShims = __commonJS((exports, module) => {
  "use strict";
  var ReactPropTypesSecret = require_ReactPropTypesSecret();
  function emptyFunction() {
  }
  function emptyFunctionWithReset() {
  }
  emptyFunctionWithReset.resetWarningCache = emptyFunction;
  module.exports = function() {
    function shim(props, propName, componentName, location, propFullName, secret) {
      if (secret === ReactPropTypesSecret) {
        return;
      }
      var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
      err.name = "Invariant Violation";
      throw err;
    }
    ;
    shim.isRequired = shim;
    function getShim() {
      return shim;
    }
    ;
    var ReactPropTypes = {
      array: shim,
      bool: shim,
      func: shim,
      number: shim,
      object: shim,
      string: shim,
      symbol: shim,
      any: shim,
      arrayOf: getShim,
      element: shim,
      elementType: shim,
      instanceOf: getShim,
      node: shim,
      objectOf: getShim,
      oneOf: getShim,
      oneOfType: getShim,
      shape: getShim,
      exact: getShim,
      checkPropTypes: emptyFunctionWithReset,
      resetWarningCache: emptyFunction
    };
    ReactPropTypes.PropTypes = ReactPropTypes;
    return ReactPropTypes;
  };
});

// ../../node_modules/prop-types/index.js
var require_prop_types = __commonJS((exports, module) => {
  if (false) {
    ReactIs = null;
    throwOnDirectAccess = true;
    module.exports = null(ReactIs.isElement, throwOnDirectAccess);
  } else {
    module.exports = require_factoryWithThrowingShims()();
  }
  var ReactIs;
  var throwOnDirectAccess;
});

// ../../node_modules/react-is/cjs/react-is.production.min.js
var require_react_is_production_min = __commonJS((exports) => {
  /** @license React v16.13.1
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  "use strict";
  var b = typeof Symbol === "function" && Symbol.for;
  var c2 = b ? Symbol.for("react.element") : 60103;
  var d2 = b ? Symbol.for("react.portal") : 60106;
  var e2 = b ? Symbol.for("react.fragment") : 60107;
  var f = b ? Symbol.for("react.strict_mode") : 60108;
  var g2 = b ? Symbol.for("react.profiler") : 60114;
  var h = b ? Symbol.for("react.provider") : 60109;
  var k2 = b ? Symbol.for("react.context") : 60110;
  var l = b ? Symbol.for("react.async_mode") : 60111;
  var m2 = b ? Symbol.for("react.concurrent_mode") : 60111;
  var n2 = b ? Symbol.for("react.forward_ref") : 60112;
  var p2 = b ? Symbol.for("react.suspense") : 60113;
  var q2 = b ? Symbol.for("react.suspense_list") : 60120;
  var r2 = b ? Symbol.for("react.memo") : 60115;
  var t2 = b ? Symbol.for("react.lazy") : 60116;
  var v = b ? Symbol.for("react.block") : 60121;
  var w = b ? Symbol.for("react.fundamental") : 60117;
  var x2 = b ? Symbol.for("react.responder") : 60118;
  var y2 = b ? Symbol.for("react.scope") : 60119;
  function z2(a2) {
    if (typeof a2 === "object" && a2 !== null) {
      var u = a2.$$typeof;
      switch (u) {
        case c2:
          switch (a2 = a2.type, a2) {
            case l:
            case m2:
            case e2:
            case g2:
            case f:
            case p2:
              return a2;
            default:
              switch (a2 = a2 && a2.$$typeof, a2) {
                case k2:
                case n2:
                case t2:
                case r2:
                case h:
                  return a2;
                default:
                  return u;
              }
          }
        case d2:
          return u;
      }
    }
  }
  function A2(a2) {
    return z2(a2) === m2;
  }
  exports.AsyncMode = l;
  exports.ConcurrentMode = m2;
  exports.ContextConsumer = k2;
  exports.ContextProvider = h;
  exports.Element = c2;
  exports.ForwardRef = n2;
  exports.Fragment = e2;
  exports.Lazy = t2;
  exports.Memo = r2;
  exports.Portal = d2;
  exports.Profiler = g2;
  exports.StrictMode = f;
  exports.Suspense = p2;
  exports.isAsyncMode = function(a2) {
    return A2(a2) || z2(a2) === l;
  };
  exports.isConcurrentMode = A2;
  exports.isContextConsumer = function(a2) {
    return z2(a2) === k2;
  };
  exports.isContextProvider = function(a2) {
    return z2(a2) === h;
  };
  exports.isElement = function(a2) {
    return typeof a2 === "object" && a2 !== null && a2.$$typeof === c2;
  };
  exports.isForwardRef = function(a2) {
    return z2(a2) === n2;
  };
  exports.isFragment = function(a2) {
    return z2(a2) === e2;
  };
  exports.isLazy = function(a2) {
    return z2(a2) === t2;
  };
  exports.isMemo = function(a2) {
    return z2(a2) === r2;
  };
  exports.isPortal = function(a2) {
    return z2(a2) === d2;
  };
  exports.isProfiler = function(a2) {
    return z2(a2) === g2;
  };
  exports.isStrictMode = function(a2) {
    return z2(a2) === f;
  };
  exports.isSuspense = function(a2) {
    return z2(a2) === p2;
  };
  exports.isValidElementType = function(a2) {
    return typeof a2 === "string" || typeof a2 === "function" || a2 === e2 || a2 === m2 || a2 === g2 || a2 === f || a2 === p2 || a2 === q2 || typeof a2 === "object" && a2 !== null && (a2.$$typeof === t2 || a2.$$typeof === r2 || a2.$$typeof === h || a2.$$typeof === k2 || a2.$$typeof === n2 || a2.$$typeof === w || a2.$$typeof === x2 || a2.$$typeof === y2 || a2.$$typeof === v);
  };
  exports.typeOf = z2;
});

// ../../node_modules/react-is/index.js
var require_react_is = __commonJS((exports, module) => {
  "use strict";
  if (true) {
    module.exports = require_react_is_production_min();
  } else {
    module.exports = null;
  }
});

// ../../node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var require_hoist_non_react_statics_cjs = __commonJS((exports, module) => {
  "use strict";
  var reactIs = require_react_is();
  var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
  };
  var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
  };
  var FORWARD_REF_STATICS = {
    $$typeof: true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
  };
  var MEMO_STATICS = {
    $$typeof: true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
  };
  var TYPE_STATICS = {};
  TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
  TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
  function getStatics(component) {
    if (reactIs.isMemo(component)) {
      return MEMO_STATICS;
    }
    return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
  }
  var defineProperty = Object.defineProperty;
  var getOwnPropertyNames = Object.getOwnPropertyNames;
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var getPrototypeOf = Object.getPrototypeOf;
  var objectPrototype = Object.prototype;
  function hoistNonReactStatics2(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== "string") {
      if (objectPrototype) {
        var inheritedComponent = getPrototypeOf(sourceComponent);
        if (inheritedComponent && inheritedComponent !== objectPrototype) {
          hoistNonReactStatics2(targetComponent, inheritedComponent, blacklist);
        }
      }
      var keys = getOwnPropertyNames(sourceComponent);
      if (getOwnPropertySymbols) {
        keys = keys.concat(getOwnPropertySymbols(sourceComponent));
      }
      var targetStatics = getStatics(targetComponent);
      var sourceStatics = getStatics(sourceComponent);
      for (var i2 = 0; i2 < keys.length; ++i2) {
        var key = keys[i2];
        if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
          var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
          try {
            defineProperty(targetComponent, key, descriptor);
          } catch (e2) {
          }
        }
      }
    }
    return targetComponent;
  }
  module.exports = hoistNonReactStatics2;
});

// ../../node_modules/@babel/runtime/helpers/extends.js
var require_extends = __commonJS((exports, module) => {
  function _extends2() {
    module.exports = _extends2 = Object.assign || function(target) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        var source = arguments[i2];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends2.apply(this, arguments);
  }
  module.exports = _extends2;
});

// ../../node_modules/@material-ui/core/node_modules/react-is/cjs/react-is.production.min.js
var require_react_is_production_min2 = __commonJS((exports) => {
  /** @license React v17.0.1
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  "use strict";
  var b = 60103;
  var c2 = 60106;
  var d2 = 60107;
  var e2 = 60108;
  var f = 60114;
  var g2 = 60109;
  var h = 60110;
  var k2 = 60112;
  var l = 60113;
  var m2 = 60120;
  var n2 = 60115;
  var p2 = 60116;
  var q2 = 60121;
  var r2 = 60122;
  var u = 60117;
  var v = 60129;
  var w = 60131;
  if (typeof Symbol === "function" && Symbol.for) {
    x2 = Symbol.for;
    b = x2("react.element");
    c2 = x2("react.portal");
    d2 = x2("react.fragment");
    e2 = x2("react.strict_mode");
    f = x2("react.profiler");
    g2 = x2("react.provider");
    h = x2("react.context");
    k2 = x2("react.forward_ref");
    l = x2("react.suspense");
    m2 = x2("react.suspense_list");
    n2 = x2("react.memo");
    p2 = x2("react.lazy");
    q2 = x2("react.block");
    r2 = x2("react.server.block");
    u = x2("react.fundamental");
    v = x2("react.debug_trace_mode");
    w = x2("react.legacy_hidden");
  }
  var x2;
  function y2(a2) {
    if (typeof a2 === "object" && a2 !== null) {
      var t2 = a2.$$typeof;
      switch (t2) {
        case b:
          switch (a2 = a2.type, a2) {
            case d2:
            case f:
            case e2:
            case l:
            case m2:
              return a2;
            default:
              switch (a2 = a2 && a2.$$typeof, a2) {
                case h:
                case k2:
                case p2:
                case n2:
                case g2:
                  return a2;
                default:
                  return t2;
              }
          }
        case c2:
          return t2;
      }
    }
  }
  var z2 = g2;
  var A2 = b;
  var B2 = k2;
  var C2 = d2;
  var D2 = p2;
  var E2 = n2;
  var F2 = c2;
  var G2 = f;
  var H2 = e2;
  var I2 = l;
  exports.ContextConsumer = h;
  exports.ContextProvider = z2;
  exports.Element = A2;
  exports.ForwardRef = B2;
  exports.Fragment = C2;
  exports.Lazy = D2;
  exports.Memo = E2;
  exports.Portal = F2;
  exports.Profiler = G2;
  exports.StrictMode = H2;
  exports.Suspense = I2;
  exports.isAsyncMode = function() {
    return false;
  };
  exports.isConcurrentMode = function() {
    return false;
  };
  exports.isContextConsumer = function(a2) {
    return y2(a2) === h;
  };
  exports.isContextProvider = function(a2) {
    return y2(a2) === g2;
  };
  exports.isElement = function(a2) {
    return typeof a2 === "object" && a2 !== null && a2.$$typeof === b;
  };
  exports.isForwardRef = function(a2) {
    return y2(a2) === k2;
  };
  exports.isFragment = function(a2) {
    return y2(a2) === d2;
  };
  exports.isLazy = function(a2) {
    return y2(a2) === p2;
  };
  exports.isMemo = function(a2) {
    return y2(a2) === n2;
  };
  exports.isPortal = function(a2) {
    return y2(a2) === c2;
  };
  exports.isProfiler = function(a2) {
    return y2(a2) === f;
  };
  exports.isStrictMode = function(a2) {
    return y2(a2) === e2;
  };
  exports.isSuspense = function(a2) {
    return y2(a2) === l;
  };
  exports.isValidElementType = function(a2) {
    return typeof a2 === "string" || typeof a2 === "function" || a2 === d2 || a2 === f || a2 === v || a2 === e2 || a2 === l || a2 === m2 || a2 === w || typeof a2 === "object" && a2 !== null && (a2.$$typeof === p2 || a2.$$typeof === n2 || a2.$$typeof === g2 || a2.$$typeof === h || a2.$$typeof === k2 || a2.$$typeof === u || a2.$$typeof === q2 || a2[0] === r2) ? true : false;
  };
  exports.typeOf = y2;
});

// ../../node_modules/@material-ui/core/node_modules/react-is/index.js
var require_react_is2 = __commonJS((exports, module) => {
  "use strict";
  if (true) {
    module.exports = require_react_is_production_min2();
  } else {
    module.exports = null;
  }
});

// ../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key = sourceKeys[i2];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}

// ../../node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

// ../../node_modules/@material-ui/core/Fab/Fab.js
var React19 = __toModule(require_react());
var import_prop_types10 = __toModule(require_prop_types());

// ../../node_modules/clsx/dist/clsx.m.js
function toVal(mix) {
  var k2, y2, str = "";
  if (typeof mix === "string" || typeof mix === "number") {
    str += mix;
  } else if (typeof mix === "object") {
    if (Array.isArray(mix)) {
      for (k2 = 0; k2 < mix.length; k2++) {
        if (mix[k2]) {
          if (y2 = toVal(mix[k2])) {
            str && (str += " ");
            str += y2;
          }
        }
      }
    } else {
      for (k2 in mix) {
        if (mix[k2]) {
          str && (str += " ");
          str += k2;
        }
      }
    }
  }
  return str;
}
function clsx_m_default() {
  var i2 = 0, tmp, x2, str = "";
  while (i2 < arguments.length) {
    if (tmp = arguments[i2++]) {
      if (x2 = toVal(tmp)) {
        str && (str += " ");
        str += x2;
      }
    }
  }
  return str;
}

// ../../node_modules/@material-ui/utils/esm/deepmerge.js
function isPlainObject(item) {
  return item !== null && typeof item === "object" && item.constructor === Object;
}
function deepmerge(target, source, options = {
  clone: true
}) {
  const output = options.clone ? _extends({}, target) : target;
  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach((key) => {
      if (key === "__proto__") {
        return;
      }
      if (isPlainObject(source[key]) && key in target && isPlainObject(target[key])) {
        output[key] = deepmerge(target[key], source[key], options);
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
}

// ../../node_modules/@material-ui/utils/esm/formatMuiErrorMessage.js
function formatMuiErrorMessage(code) {
  let url = "https://material-ui.com/production-error/?code=" + code;
  for (let i2 = 1; i2 < arguments.length; i2 += 1) {
    url += "&args[]=" + encodeURIComponent(arguments[i2]);
  }
  return "Minified Material-UI error #" + code + "; visit " + url + " for the full message.";
}

// ../../node_modules/@material-ui/utils/esm/capitalize.js
function capitalize(string) {
  if (typeof string !== "string") {
    throw new Error(`Material-UI: \`capitalize(string)\` expects a string argument.`);
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// ../../node_modules/@material-ui/utils/esm/ownerDocument.js
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}

// ../../node_modules/@material-ui/utils/esm/setRef.js
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

// ../../node_modules/@material-ui/utils/esm/useEnhancedEffect.js
var React = __toModule(require_react());
var useEnhancedEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
var useEnhancedEffect_default = useEnhancedEffect;

// ../../node_modules/@material-ui/utils/esm/useControlled.js
var React2 = __toModule(require_react());
function useControlled({
  controlled,
  default: defaultProp,
  name,
  state = "value"
}) {
  const {
    current: isControlled
  } = React2.useRef(controlled !== void 0);
  const [valueState, setValue] = React2.useState(defaultProp);
  const value = isControlled ? controlled : valueState;
  if (false) {
    React2.useEffect(() => {
      if (isControlled !== (controlled !== void 0)) {
        console.error([`Material-UI: A component is changing the ${isControlled ? "" : "un"}controlled ${state} state of ${name} to be ${isControlled ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${name} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join("\n"));
      }
    }, [state, name, controlled]);
    const {
      current: defaultValue
    } = React2.useRef(defaultProp);
    React2.useEffect(() => {
      if (!isControlled && defaultValue !== defaultProp) {
        console.error([`Material-UI: A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. To suppress this warning opt to use a controlled ${name}.`].join("\n"));
      }
    }, [JSON.stringify(defaultProp)]);
  }
  const setValueIfUncontrolled = React2.useCallback((newValue) => {
    if (!isControlled) {
      setValue(newValue);
    }
  }, []);
  return [value, setValueIfUncontrolled];
}

// ../../node_modules/@material-ui/utils/esm/useEventCallback.js
var React3 = __toModule(require_react());
function useEventCallback(fn) {
  const ref = React3.useRef(fn);
  useEnhancedEffect_default(() => {
    ref.current = fn;
  });
  return React3.useCallback((...args) => (0, ref.current)(...args), []);
}

// ../../node_modules/@material-ui/utils/esm/useForkRef.js
var React4 = __toModule(require_react());
function useForkRef(refA, refB) {
  return React4.useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}

// ../../node_modules/@material-ui/utils/esm/useIsFocusVisible.js
var React5 = __toModule(require_react());
var hadKeyboardEvent = true;
var hadFocusVisibleRecently = false;
var hadFocusVisibleRecentlyTimeout = null;
var inputTypesWhitelist = {
  text: true,
  search: true,
  url: true,
  tel: true,
  email: true,
  password: true,
  number: true,
  date: true,
  month: true,
  week: true,
  time: true,
  datetime: true,
  "datetime-local": true
};
function focusTriggersKeyboardModality(node) {
  const {
    type,
    tagName
  } = node;
  if (tagName === "INPUT" && inputTypesWhitelist[type] && !node.readOnly) {
    return true;
  }
  if (tagName === "TEXTAREA" && !node.readOnly) {
    return true;
  }
  if (node.isContentEditable) {
    return true;
  }
  return false;
}
function handleKeyDown(event) {
  if (event.metaKey || event.altKey || event.ctrlKey) {
    return;
  }
  hadKeyboardEvent = true;
}
function handlePointerDown() {
  hadKeyboardEvent = false;
}
function handleVisibilityChange() {
  if (this.visibilityState === "hidden") {
    if (hadFocusVisibleRecently) {
      hadKeyboardEvent = true;
    }
  }
}
function prepare(doc) {
  doc.addEventListener("keydown", handleKeyDown, true);
  doc.addEventListener("mousedown", handlePointerDown, true);
  doc.addEventListener("pointerdown", handlePointerDown, true);
  doc.addEventListener("touchstart", handlePointerDown, true);
  doc.addEventListener("visibilitychange", handleVisibilityChange, true);
}
function isFocusVisible(event) {
  const {
    target
  } = event;
  try {
    return target.matches(":focus-visible");
  } catch (error) {
  }
  return hadKeyboardEvent || focusTriggersKeyboardModality(target);
}
function useIsFocusVisible() {
  const ref = React5.useCallback((node) => {
    if (node != null) {
      prepare(node.ownerDocument);
    }
  }, []);
  const isFocusVisibleRef = React5.useRef(false);
  function handleBlurVisible() {
    if (isFocusVisibleRef.current) {
      hadFocusVisibleRecently = true;
      window.clearTimeout(hadFocusVisibleRecentlyTimeout);
      hadFocusVisibleRecentlyTimeout = window.setTimeout(() => {
        hadFocusVisibleRecently = false;
      }, 100);
      isFocusVisibleRef.current = false;
      return true;
    }
    return false;
  }
  function handleFocusVisible(event) {
    if (isFocusVisible(event)) {
      isFocusVisibleRef.current = true;
      return true;
    }
    return false;
  }
  return {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref
  };
}

// ../../node_modules/@material-ui/utils/esm/visuallyHidden.js
var visuallyHidden = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1
};
var visuallyHidden_default = visuallyHidden;

// ../../node_modules/@material-ui/styles/ThemeProvider/nested.js
var hasSymbol = typeof Symbol === "function" && Symbol.for;
var nested_default = hasSymbol ? Symbol.for("mui.nested") : "__THEME_NESTED__";

// ../../node_modules/@material-ui/styles/createGenerateClassName/createGenerateClassName.js
var pseudoClasses = ["checked", "disabled", "error", "focused", "focusVisible", "required", "expanded", "selected"];
function createGenerateClassName(options = {}) {
  const {
    disableGlobal = false,
    productionPrefix = "jss",
    seed = ""
  } = options;
  const seedPrefix = seed === "" ? "" : `${seed}-`;
  let ruleCounter = 0;
  const getNextCounterId = () => {
    ruleCounter += 1;
    if (false) {
      if (ruleCounter >= 1e10) {
        console.warn(["Material-UI: You might have a memory leak.", "The ruleCounter is not supposed to grow that much."].join(""));
      }
    }
    return ruleCounter;
  };
  return (rule, styleSheet) => {
    const name = styleSheet.options.name;
    if (name && name.indexOf("Mui") === 0 && !styleSheet.options.link && !disableGlobal) {
      if (pseudoClasses.indexOf(rule.key) !== -1) {
        return `Mui-${rule.key}`;
      }
      const prefix2 = `${seedPrefix}${name}-${rule.key}`;
      if (!styleSheet.options.theme[nested_default] || seed !== "") {
        return prefix2;
      }
      return `${prefix2}-${getNextCounterId()}`;
    }
    if (true) {
      return `${seedPrefix}${productionPrefix}${getNextCounterId()}`;
    }
    const suffix = `${rule.key}-${getNextCounterId()}`;
    if (styleSheet.options.classNamePrefix) {
      return `${seedPrefix}${styleSheet.options.classNamePrefix}-${suffix}`;
    }
    return `${seedPrefix}${suffix}`;
  };
}

// ../../node_modules/@material-ui/styles/getThemeProps/getThemeProps.js
function getThemeProps(params) {
  const {
    theme,
    name,
    props
  } = params;
  if (!theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps) {
    return props;
  }
  const defaultProps2 = theme.components[name].defaultProps;
  let propName;
  for (propName in defaultProps2) {
    if (props[propName] === void 0) {
      props[propName] = defaultProps2[propName];
    }
  }
  return props;
}

// ../../node_modules/is-in-browser/dist/module.js
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
  return typeof obj;
} : function(obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
var isBrowser = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && (typeof document === "undefined" ? "undefined" : _typeof(document)) === "object" && document.nodeType === 9;
var module_default = isBrowser;

// ../../node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}

// ../../node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

// ../../node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}

// ../../node_modules/jss/dist/jss.esm.js
var plainObjectConstrurctor = {}.constructor;
function cloneStyle(style3) {
  if (style3 == null || typeof style3 !== "object")
    return style3;
  if (Array.isArray(style3))
    return style3.map(cloneStyle);
  if (style3.constructor !== plainObjectConstrurctor)
    return style3;
  var newStyle = {};
  for (var name in style3) {
    newStyle[name] = cloneStyle(style3[name]);
  }
  return newStyle;
}
function createRule(name, decl, options) {
  if (name === void 0) {
    name = "unnamed";
  }
  var jss3 = options.jss;
  var declCopy = cloneStyle(decl);
  var rule = jss3.plugins.onCreateRule(name, declCopy, options);
  if (rule)
    return rule;
  if (name[0] === "@") {
    false ? tiny_warning_esm_default(false, "[JSS] Unknown rule " + name) : void 0;
  }
  return null;
}
var join = function join2(value, by) {
  var result = "";
  for (var i2 = 0; i2 < value.length; i2++) {
    if (value[i2] === "!important")
      break;
    if (result)
      result += by;
    result += value[i2];
  }
  return result;
};
var toCssValue = function toCssValue2(value, ignoreImportant) {
  if (ignoreImportant === void 0) {
    ignoreImportant = false;
  }
  if (!Array.isArray(value))
    return value;
  var cssValue = "";
  if (Array.isArray(value[0])) {
    for (var i2 = 0; i2 < value.length; i2++) {
      if (value[i2] === "!important")
        break;
      if (cssValue)
        cssValue += ", ";
      cssValue += join(value[i2], " ");
    }
  } else
    cssValue = join(value, ", ");
  if (!ignoreImportant && value[value.length - 1] === "!important") {
    cssValue += " !important";
  }
  return cssValue;
};
function indentStr(str, indent) {
  var result = "";
  for (var index = 0; index < indent; index++) {
    result += "  ";
  }
  return result + str;
}
function toCss(selector, style3, options) {
  if (options === void 0) {
    options = {};
  }
  var result = "";
  if (!style3)
    return result;
  var _options = options, _options$indent = _options.indent, indent = _options$indent === void 0 ? 0 : _options$indent;
  var fallbacks = style3.fallbacks;
  if (selector)
    indent++;
  if (fallbacks) {
    if (Array.isArray(fallbacks)) {
      for (var index = 0; index < fallbacks.length; index++) {
        var fallback = fallbacks[index];
        for (var prop in fallback) {
          var value = fallback[prop];
          if (value != null) {
            if (result)
              result += "\n";
            result += "" + indentStr(prop + ": " + toCssValue(value) + ";", indent);
          }
        }
      }
    } else {
      for (var _prop in fallbacks) {
        var _value = fallbacks[_prop];
        if (_value != null) {
          if (result)
            result += "\n";
          result += "" + indentStr(_prop + ": " + toCssValue(_value) + ";", indent);
        }
      }
    }
  }
  for (var _prop2 in style3) {
    var _value2 = style3[_prop2];
    if (_value2 != null && _prop2 !== "fallbacks") {
      if (result)
        result += "\n";
      result += "" + indentStr(_prop2 + ": " + toCssValue(_value2) + ";", indent);
    }
  }
  if (!result && !options.allowEmpty)
    return result;
  if (!selector)
    return result;
  indent--;
  if (result)
    result = "\n" + result + "\n";
  return indentStr(selector + " {" + result, indent) + indentStr("}", indent);
}
var escapeRegex = /([[\].#*$><+~=|^:(),"'`\s])/g;
var nativeEscape = typeof CSS !== "undefined" && CSS.escape;
var escape = function(str) {
  return nativeEscape ? nativeEscape(str) : str.replace(escapeRegex, "\\$1");
};
var BaseStyleRule = /* @__PURE__ */ function() {
  function BaseStyleRule2(key, style3, options) {
    this.type = "style";
    this.key = void 0;
    this.isProcessed = false;
    this.style = void 0;
    this.renderer = void 0;
    this.renderable = void 0;
    this.options = void 0;
    var sheet = options.sheet, Renderer = options.Renderer;
    this.key = key;
    this.options = options;
    this.style = style3;
    if (sheet)
      this.renderer = sheet.renderer;
    else if (Renderer)
      this.renderer = new Renderer();
  }
  var _proto = BaseStyleRule2.prototype;
  _proto.prop = function prop(name, value, options) {
    if (value === void 0)
      return this.style[name];
    var force = options ? options.force : false;
    if (!force && this.style[name] === value)
      return this;
    var newValue = value;
    if (!options || options.process !== false) {
      newValue = this.options.jss.plugins.onChangeValue(value, name, this);
    }
    var isEmpty3 = newValue == null || newValue === false;
    var isDefined = name in this.style;
    if (isEmpty3 && !isDefined && !force)
      return this;
    var remove = isEmpty3 && isDefined;
    if (remove)
      delete this.style[name];
    else
      this.style[name] = newValue;
    if (this.renderable && this.renderer) {
      if (remove)
        this.renderer.removeProperty(this.renderable, name);
      else
        this.renderer.setProperty(this.renderable, name, newValue);
      return this;
    }
    var sheet = this.options.sheet;
    if (sheet && sheet.attached) {
      false ? tiny_warning_esm_default(false, '[JSS] Rule is not linked. Missing sheet option "link: true".') : void 0;
    }
    return this;
  };
  return BaseStyleRule2;
}();
var StyleRule = /* @__PURE__ */ function(_BaseStyleRule) {
  _inheritsLoose(StyleRule2, _BaseStyleRule);
  function StyleRule2(key, style3, options) {
    var _this;
    _this = _BaseStyleRule.call(this, key, style3, options) || this;
    _this.selectorText = void 0;
    _this.id = void 0;
    _this.renderable = void 0;
    var selector = options.selector, scoped = options.scoped, sheet = options.sheet, generateId = options.generateId;
    if (selector) {
      _this.selectorText = selector;
    } else if (scoped !== false) {
      _this.id = generateId(_assertThisInitialized(_assertThisInitialized(_this)), sheet);
      _this.selectorText = "." + escape(_this.id);
    }
    return _this;
  }
  var _proto2 = StyleRule2.prototype;
  _proto2.applyTo = function applyTo(renderable) {
    var renderer = this.renderer;
    if (renderer) {
      var json = this.toJSON();
      for (var prop in json) {
        renderer.setProperty(renderable, prop, json[prop]);
      }
    }
    return this;
  };
  _proto2.toJSON = function toJSON() {
    var json = {};
    for (var prop in this.style) {
      var value = this.style[prop];
      if (typeof value !== "object")
        json[prop] = value;
      else if (Array.isArray(value))
        json[prop] = toCssValue(value);
    }
    return json;
  };
  _proto2.toString = function toString(options) {
    var sheet = this.options.sheet;
    var link = sheet ? sheet.options.link : false;
    var opts = link ? _extends({}, options, {
      allowEmpty: true
    }) : options;
    return toCss(this.selectorText, this.style, opts);
  };
  _createClass(StyleRule2, [{
    key: "selector",
    set: function set(selector) {
      if (selector === this.selectorText)
        return;
      this.selectorText = selector;
      var renderer = this.renderer, renderable = this.renderable;
      if (!renderable || !renderer)
        return;
      var hasChanged = renderer.setSelector(renderable, selector);
      if (!hasChanged) {
        renderer.replaceRule(renderable, this);
      }
    },
    get: function get() {
      return this.selectorText;
    }
  }]);
  return StyleRule2;
}(BaseStyleRule);
var pluginStyleRule = {
  onCreateRule: function onCreateRule(name, style3, options) {
    if (name[0] === "@" || options.parent && options.parent.type === "keyframes") {
      return null;
    }
    return new StyleRule(name, style3, options);
  }
};
var defaultToStringOptions = {
  indent: 1,
  children: true
};
var atRegExp = /@([\w-]+)/;
var ConditionalRule = /* @__PURE__ */ function() {
  function ConditionalRule2(key, styles4, options) {
    this.type = "conditional";
    this.at = void 0;
    this.key = void 0;
    this.query = void 0;
    this.rules = void 0;
    this.options = void 0;
    this.isProcessed = false;
    this.renderable = void 0;
    this.key = key;
    var atMatch = key.match(atRegExp);
    this.at = atMatch ? atMatch[1] : "unknown";
    this.query = options.name || "@" + this.at;
    this.options = options;
    this.rules = new RuleList(_extends({}, options, {
      parent: this
    }));
    for (var name in styles4) {
      this.rules.add(name, styles4[name]);
    }
    this.rules.process();
  }
  var _proto = ConditionalRule2.prototype;
  _proto.getRule = function getRule(name) {
    return this.rules.get(name);
  };
  _proto.indexOf = function indexOf(rule) {
    return this.rules.indexOf(rule);
  };
  _proto.addRule = function addRule(name, style3, options) {
    var rule = this.rules.add(name, style3, options);
    if (!rule)
      return null;
    this.options.jss.plugins.onProcessRule(rule);
    return rule;
  };
  _proto.toString = function toString(options) {
    if (options === void 0) {
      options = defaultToStringOptions;
    }
    if (options.indent == null)
      options.indent = defaultToStringOptions.indent;
    if (options.children == null)
      options.children = defaultToStringOptions.children;
    if (options.children === false) {
      return this.query + " {}";
    }
    var children = this.rules.toString(options);
    return children ? this.query + " {\n" + children + "\n}" : "";
  };
  return ConditionalRule2;
}();
var keyRegExp = /@media|@supports\s+/;
var pluginConditionalRule = {
  onCreateRule: function onCreateRule2(key, styles4, options) {
    return keyRegExp.test(key) ? new ConditionalRule(key, styles4, options) : null;
  }
};
var defaultToStringOptions$1 = {
  indent: 1,
  children: true
};
var nameRegExp = /@keyframes\s+([\w-]+)/;
var KeyframesRule = /* @__PURE__ */ function() {
  function KeyframesRule2(key, frames, options) {
    this.type = "keyframes";
    this.at = "@keyframes";
    this.key = void 0;
    this.name = void 0;
    this.id = void 0;
    this.rules = void 0;
    this.options = void 0;
    this.isProcessed = false;
    this.renderable = void 0;
    var nameMatch = key.match(nameRegExp);
    if (nameMatch && nameMatch[1]) {
      this.name = nameMatch[1];
    } else {
      this.name = "noname";
      false ? tiny_warning_esm_default(false, "[JSS] Bad keyframes name " + key) : void 0;
    }
    this.key = this.type + "-" + this.name;
    this.options = options;
    var scoped = options.scoped, sheet = options.sheet, generateId = options.generateId;
    this.id = scoped === false ? this.name : escape(generateId(this, sheet));
    this.rules = new RuleList(_extends({}, options, {
      parent: this
    }));
    for (var name in frames) {
      this.rules.add(name, frames[name], _extends({}, options, {
        parent: this
      }));
    }
    this.rules.process();
  }
  var _proto = KeyframesRule2.prototype;
  _proto.toString = function toString(options) {
    if (options === void 0) {
      options = defaultToStringOptions$1;
    }
    if (options.indent == null)
      options.indent = defaultToStringOptions$1.indent;
    if (options.children == null)
      options.children = defaultToStringOptions$1.children;
    if (options.children === false) {
      return this.at + " " + this.id + " {}";
    }
    var children = this.rules.toString(options);
    if (children)
      children = "\n" + children + "\n";
    return this.at + " " + this.id + " {" + children + "}";
  };
  return KeyframesRule2;
}();
var keyRegExp$1 = /@keyframes\s+/;
var refRegExp = /\$([\w-]+)/g;
var findReferencedKeyframe = function findReferencedKeyframe2(val, keyframes3) {
  if (typeof val === "string") {
    return val.replace(refRegExp, function(match, name) {
      if (name in keyframes3) {
        return keyframes3[name];
      }
      false ? tiny_warning_esm_default(false, '[JSS] Referenced keyframes rule "' + name + '" is not defined.') : void 0;
      return match;
    });
  }
  return val;
};
var replaceRef = function replaceRef2(style3, prop, keyframes3) {
  var value = style3[prop];
  var refKeyframe = findReferencedKeyframe(value, keyframes3);
  if (refKeyframe !== value) {
    style3[prop] = refKeyframe;
  }
};
var plugin = {
  onCreateRule: function onCreateRule3(key, frames, options) {
    return typeof key === "string" && keyRegExp$1.test(key) ? new KeyframesRule(key, frames, options) : null;
  },
  onProcessStyle: function onProcessStyle(style3, rule, sheet) {
    if (rule.type !== "style" || !sheet)
      return style3;
    if ("animation-name" in style3)
      replaceRef(style3, "animation-name", sheet.keyframes);
    if ("animation" in style3)
      replaceRef(style3, "animation", sheet.keyframes);
    return style3;
  },
  onChangeValue: function onChangeValue(val, prop, rule) {
    var sheet = rule.options.sheet;
    if (!sheet) {
      return val;
    }
    switch (prop) {
      case "animation":
        return findReferencedKeyframe(val, sheet.keyframes);
      case "animation-name":
        return findReferencedKeyframe(val, sheet.keyframes);
      default:
        return val;
    }
  }
};
var KeyframeRule = /* @__PURE__ */ function(_BaseStyleRule) {
  _inheritsLoose(KeyframeRule2, _BaseStyleRule);
  function KeyframeRule2() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _BaseStyleRule.call.apply(_BaseStyleRule, [this].concat(args)) || this;
    _this.renderable = void 0;
    return _this;
  }
  var _proto = KeyframeRule2.prototype;
  _proto.toString = function toString(options) {
    var sheet = this.options.sheet;
    var link = sheet ? sheet.options.link : false;
    var opts = link ? _extends({}, options, {
      allowEmpty: true
    }) : options;
    return toCss(this.key, this.style, opts);
  };
  return KeyframeRule2;
}(BaseStyleRule);
var pluginKeyframeRule = {
  onCreateRule: function onCreateRule4(key, style3, options) {
    if (options.parent && options.parent.type === "keyframes") {
      return new KeyframeRule(key, style3, options);
    }
    return null;
  }
};
var FontFaceRule = /* @__PURE__ */ function() {
  function FontFaceRule2(key, style3, options) {
    this.type = "font-face";
    this.at = "@font-face";
    this.key = void 0;
    this.style = void 0;
    this.options = void 0;
    this.isProcessed = false;
    this.renderable = void 0;
    this.key = key;
    this.style = style3;
    this.options = options;
  }
  var _proto = FontFaceRule2.prototype;
  _proto.toString = function toString(options) {
    if (Array.isArray(this.style)) {
      var str = "";
      for (var index = 0; index < this.style.length; index++) {
        str += toCss(this.at, this.style[index]);
        if (this.style[index + 1])
          str += "\n";
      }
      return str;
    }
    return toCss(this.at, this.style, options);
  };
  return FontFaceRule2;
}();
var keyRegExp$2 = /@font-face/;
var pluginFontFaceRule = {
  onCreateRule: function onCreateRule5(key, style3, options) {
    return keyRegExp$2.test(key) ? new FontFaceRule(key, style3, options) : null;
  }
};
var ViewportRule = /* @__PURE__ */ function() {
  function ViewportRule2(key, style3, options) {
    this.type = "viewport";
    this.at = "@viewport";
    this.key = void 0;
    this.style = void 0;
    this.options = void 0;
    this.isProcessed = false;
    this.renderable = void 0;
    this.key = key;
    this.style = style3;
    this.options = options;
  }
  var _proto = ViewportRule2.prototype;
  _proto.toString = function toString(options) {
    return toCss(this.key, this.style, options);
  };
  return ViewportRule2;
}();
var pluginViewportRule = {
  onCreateRule: function onCreateRule6(key, style3, options) {
    return key === "@viewport" || key === "@-ms-viewport" ? new ViewportRule(key, style3, options) : null;
  }
};
var SimpleRule = /* @__PURE__ */ function() {
  function SimpleRule2(key, value, options) {
    this.type = "simple";
    this.key = void 0;
    this.value = void 0;
    this.options = void 0;
    this.isProcessed = false;
    this.renderable = void 0;
    this.key = key;
    this.value = value;
    this.options = options;
  }
  var _proto = SimpleRule2.prototype;
  _proto.toString = function toString(options) {
    if (Array.isArray(this.value)) {
      var str = "";
      for (var index = 0; index < this.value.length; index++) {
        str += this.key + " " + this.value[index] + ";";
        if (this.value[index + 1])
          str += "\n";
      }
      return str;
    }
    return this.key + " " + this.value + ";";
  };
  return SimpleRule2;
}();
var keysMap = {
  "@charset": true,
  "@import": true,
  "@namespace": true
};
var pluginSimpleRule = {
  onCreateRule: function onCreateRule7(key, value, options) {
    return key in keysMap ? new SimpleRule(key, value, options) : null;
  }
};
var plugins = [pluginStyleRule, pluginConditionalRule, plugin, pluginKeyframeRule, pluginFontFaceRule, pluginViewportRule, pluginSimpleRule];
var defaultUpdateOptions = {
  process: true
};
var forceUpdateOptions = {
  force: true,
  process: true
};
var RuleList = /* @__PURE__ */ function() {
  function RuleList2(options) {
    this.map = {};
    this.raw = {};
    this.index = [];
    this.counter = 0;
    this.options = void 0;
    this.classes = void 0;
    this.keyframes = void 0;
    this.options = options;
    this.classes = options.classes;
    this.keyframes = options.keyframes;
  }
  var _proto = RuleList2.prototype;
  _proto.add = function add(name, decl, ruleOptions) {
    var _this$options = this.options, parent = _this$options.parent, sheet = _this$options.sheet, jss3 = _this$options.jss, Renderer = _this$options.Renderer, generateId = _this$options.generateId, scoped = _this$options.scoped;
    var options = _extends({
      classes: this.classes,
      parent,
      sheet,
      jss: jss3,
      Renderer,
      generateId,
      scoped,
      name,
      keyframes: this.keyframes,
      selector: void 0
    }, ruleOptions);
    var key = name;
    if (name in this.raw) {
      key = name + "-d" + this.counter++;
    }
    this.raw[key] = decl;
    if (key in this.classes) {
      options.selector = "." + escape(this.classes[key]);
    }
    var rule = createRule(key, decl, options);
    if (!rule)
      return null;
    this.register(rule);
    var index = options.index === void 0 ? this.index.length : options.index;
    this.index.splice(index, 0, rule);
    return rule;
  };
  _proto.get = function get(name) {
    return this.map[name];
  };
  _proto.remove = function remove(rule) {
    this.unregister(rule);
    delete this.raw[rule.key];
    this.index.splice(this.index.indexOf(rule), 1);
  };
  _proto.indexOf = function indexOf(rule) {
    return this.index.indexOf(rule);
  };
  _proto.process = function process2() {
    var plugins3 = this.options.jss.plugins;
    this.index.slice(0).forEach(plugins3.onProcessRule, plugins3);
  };
  _proto.register = function register(rule) {
    this.map[rule.key] = rule;
    if (rule instanceof StyleRule) {
      this.map[rule.selector] = rule;
      if (rule.id)
        this.classes[rule.key] = rule.id;
    } else if (rule instanceof KeyframesRule && this.keyframes) {
      this.keyframes[rule.name] = rule.id;
    }
  };
  _proto.unregister = function unregister(rule) {
    delete this.map[rule.key];
    if (rule instanceof StyleRule) {
      delete this.map[rule.selector];
      delete this.classes[rule.key];
    } else if (rule instanceof KeyframesRule) {
      delete this.keyframes[rule.name];
    }
  };
  _proto.update = function update2() {
    var name;
    var data;
    var options;
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) === "string") {
      name = arguments.length <= 0 ? void 0 : arguments[0];
      data = arguments.length <= 1 ? void 0 : arguments[1];
      options = arguments.length <= 2 ? void 0 : arguments[2];
    } else {
      data = arguments.length <= 0 ? void 0 : arguments[0];
      options = arguments.length <= 1 ? void 0 : arguments[1];
      name = null;
    }
    if (name) {
      this.updateOne(this.map[name], data, options);
    } else {
      for (var index = 0; index < this.index.length; index++) {
        this.updateOne(this.index[index], data, options);
      }
    }
  };
  _proto.updateOne = function updateOne(rule, data, options) {
    if (options === void 0) {
      options = defaultUpdateOptions;
    }
    var _this$options2 = this.options, plugins3 = _this$options2.jss.plugins, sheet = _this$options2.sheet;
    if (rule.rules instanceof RuleList2) {
      rule.rules.update(data, options);
      return;
    }
    var styleRule = rule;
    var style3 = styleRule.style;
    plugins3.onUpdate(data, rule, sheet, options);
    if (options.process && style3 && style3 !== styleRule.style) {
      plugins3.onProcessStyle(styleRule.style, styleRule, sheet);
      for (var prop in styleRule.style) {
        var nextValue = styleRule.style[prop];
        var prevValue = style3[prop];
        if (nextValue !== prevValue) {
          styleRule.prop(prop, nextValue, forceUpdateOptions);
        }
      }
      for (var _prop in style3) {
        var _nextValue = styleRule.style[_prop];
        var _prevValue = style3[_prop];
        if (_nextValue == null && _nextValue !== _prevValue) {
          styleRule.prop(_prop, null, forceUpdateOptions);
        }
      }
    }
  };
  _proto.toString = function toString(options) {
    var str = "";
    var sheet = this.options.sheet;
    var link = sheet ? sheet.options.link : false;
    for (var index = 0; index < this.index.length; index++) {
      var rule = this.index[index];
      var css3 = rule.toString(options);
      if (!css3 && !link)
        continue;
      if (str)
        str += "\n";
      str += css3;
    }
    return str;
  };
  return RuleList2;
}();
var StyleSheet = /* @__PURE__ */ function() {
  function StyleSheet3(styles4, options) {
    this.options = void 0;
    this.deployed = void 0;
    this.attached = void 0;
    this.rules = void 0;
    this.renderer = void 0;
    this.classes = void 0;
    this.keyframes = void 0;
    this.queue = void 0;
    this.attached = false;
    this.deployed = false;
    this.classes = {};
    this.keyframes = {};
    this.options = _extends({}, options, {
      sheet: this,
      parent: this,
      classes: this.classes,
      keyframes: this.keyframes
    });
    if (options.Renderer) {
      this.renderer = new options.Renderer(this);
    }
    this.rules = new RuleList(this.options);
    for (var name in styles4) {
      this.rules.add(name, styles4[name]);
    }
    this.rules.process();
  }
  var _proto = StyleSheet3.prototype;
  _proto.attach = function attach2() {
    if (this.attached)
      return this;
    if (this.renderer)
      this.renderer.attach();
    this.attached = true;
    if (!this.deployed)
      this.deploy();
    return this;
  };
  _proto.detach = function detach2() {
    if (!this.attached)
      return this;
    if (this.renderer)
      this.renderer.detach();
    this.attached = false;
    return this;
  };
  _proto.addRule = function addRule(name, decl, options) {
    var queue = this.queue;
    if (this.attached && !queue)
      this.queue = [];
    var rule = this.rules.add(name, decl, options);
    if (!rule)
      return null;
    this.options.jss.plugins.onProcessRule(rule);
    if (this.attached) {
      if (!this.deployed)
        return rule;
      if (queue)
        queue.push(rule);
      else {
        this.insertRule(rule);
        if (this.queue) {
          this.queue.forEach(this.insertRule, this);
          this.queue = void 0;
        }
      }
      return rule;
    }
    this.deployed = false;
    return rule;
  };
  _proto.insertRule = function insertRule2(rule) {
    if (this.renderer) {
      this.renderer.insertRule(rule);
    }
  };
  _proto.addRules = function addRules(styles4, options) {
    var added = [];
    for (var name in styles4) {
      var rule = this.addRule(name, styles4[name], options);
      if (rule)
        added.push(rule);
    }
    return added;
  };
  _proto.getRule = function getRule(name) {
    return this.rules.get(name);
  };
  _proto.deleteRule = function deleteRule(name) {
    var rule = typeof name === "object" ? name : this.rules.get(name);
    if (!rule || this.attached && !rule.renderable) {
      return false;
    }
    this.rules.remove(rule);
    if (this.attached && rule.renderable && this.renderer) {
      return this.renderer.deleteRule(rule.renderable);
    }
    return true;
  };
  _proto.indexOf = function indexOf(rule) {
    return this.rules.indexOf(rule);
  };
  _proto.deploy = function deploy() {
    if (this.renderer)
      this.renderer.deploy();
    this.deployed = true;
    return this;
  };
  _proto.update = function update2() {
    var _this$rules;
    (_this$rules = this.rules).update.apply(_this$rules, arguments);
    return this;
  };
  _proto.updateOne = function updateOne(rule, data, options) {
    this.rules.updateOne(rule, data, options);
    return this;
  };
  _proto.toString = function toString(options) {
    return this.rules.toString(options);
  };
  return StyleSheet3;
}();
var PluginsRegistry = /* @__PURE__ */ function() {
  function PluginsRegistry2() {
    this.plugins = {
      internal: [],
      external: []
    };
    this.registry = void 0;
  }
  var _proto = PluginsRegistry2.prototype;
  _proto.onCreateRule = function onCreateRule8(name, decl, options) {
    for (var i2 = 0; i2 < this.registry.onCreateRule.length; i2++) {
      var rule = this.registry.onCreateRule[i2](name, decl, options);
      if (rule)
        return rule;
    }
    return null;
  };
  _proto.onProcessRule = function onProcessRule(rule) {
    if (rule.isProcessed)
      return;
    var sheet = rule.options.sheet;
    for (var i2 = 0; i2 < this.registry.onProcessRule.length; i2++) {
      this.registry.onProcessRule[i2](rule, sheet);
    }
    if (rule.style)
      this.onProcessStyle(rule.style, rule, sheet);
    rule.isProcessed = true;
  };
  _proto.onProcessStyle = function onProcessStyle2(style3, rule, sheet) {
    for (var i2 = 0; i2 < this.registry.onProcessStyle.length; i2++) {
      rule.style = this.registry.onProcessStyle[i2](rule.style, rule, sheet);
    }
  };
  _proto.onProcessSheet = function onProcessSheet(sheet) {
    for (var i2 = 0; i2 < this.registry.onProcessSheet.length; i2++) {
      this.registry.onProcessSheet[i2](sheet);
    }
  };
  _proto.onUpdate = function onUpdate(data, rule, sheet, options) {
    for (var i2 = 0; i2 < this.registry.onUpdate.length; i2++) {
      this.registry.onUpdate[i2](data, rule, sheet, options);
    }
  };
  _proto.onChangeValue = function onChangeValue2(value, prop, rule) {
    var processedValue = value;
    for (var i2 = 0; i2 < this.registry.onChangeValue.length; i2++) {
      processedValue = this.registry.onChangeValue[i2](processedValue, prop, rule);
    }
    return processedValue;
  };
  _proto.use = function use(newPlugin, options) {
    if (options === void 0) {
      options = {
        queue: "external"
      };
    }
    var plugins3 = this.plugins[options.queue];
    if (plugins3.indexOf(newPlugin) !== -1) {
      return;
    }
    plugins3.push(newPlugin);
    this.registry = [].concat(this.plugins.external, this.plugins.internal).reduce(function(registry2, plugin2) {
      for (var name in plugin2) {
        if (name in registry2) {
          registry2[name].push(plugin2[name]);
        } else {
          false ? tiny_warning_esm_default(false, '[JSS] Unknown hook "' + name + '".') : void 0;
        }
      }
      return registry2;
    }, {
      onCreateRule: [],
      onProcessRule: [],
      onProcessStyle: [],
      onProcessSheet: [],
      onChangeValue: [],
      onUpdate: []
    });
  };
  return PluginsRegistry2;
}();
var SheetsRegistry = /* @__PURE__ */ function() {
  function SheetsRegistry2() {
    this.registry = [];
  }
  var _proto = SheetsRegistry2.prototype;
  _proto.add = function add(sheet) {
    var registry2 = this.registry;
    var index = sheet.options.index;
    if (registry2.indexOf(sheet) !== -1)
      return;
    if (registry2.length === 0 || index >= this.index) {
      registry2.push(sheet);
      return;
    }
    for (var i2 = 0; i2 < registry2.length; i2++) {
      if (registry2[i2].options.index > index) {
        registry2.splice(i2, 0, sheet);
        return;
      }
    }
  };
  _proto.reset = function reset() {
    this.registry = [];
  };
  _proto.remove = function remove(sheet) {
    var index = this.registry.indexOf(sheet);
    this.registry.splice(index, 1);
  };
  _proto.toString = function toString(_temp) {
    var _ref = _temp === void 0 ? {} : _temp, attached = _ref.attached, options = _objectWithoutPropertiesLoose(_ref, ["attached"]);
    var css3 = "";
    for (var i2 = 0; i2 < this.registry.length; i2++) {
      var sheet = this.registry[i2];
      if (attached != null && sheet.attached !== attached) {
        continue;
      }
      if (css3)
        css3 += "\n";
      css3 += sheet.toString(options);
    }
    return css3;
  };
  _createClass(SheetsRegistry2, [{
    key: "index",
    get: function get() {
      return this.registry.length === 0 ? 0 : this.registry[this.registry.length - 1].options.index;
    }
  }]);
  return SheetsRegistry2;
}();
var registry = new SheetsRegistry();
var globalThis = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
var ns = "2f1acc6c3a606b082e5eef5e54414ffb";
if (globalThis[ns] == null)
  globalThis[ns] = 0;
var moduleId = globalThis[ns]++;
var maxRules = 1e10;
var createGenerateId = function createGenerateId2(options) {
  if (options === void 0) {
    options = {};
  }
  var ruleCounter = 0;
  return function(rule, sheet) {
    ruleCounter += 1;
    if (ruleCounter > maxRules) {
      false ? tiny_warning_esm_default(false, "[JSS] You might have a memory leak. Rule counter is at " + ruleCounter + ".") : void 0;
    }
    var jssId = "";
    var prefix2 = "";
    if (sheet) {
      if (sheet.options.classNamePrefix) {
        prefix2 = sheet.options.classNamePrefix;
      }
      if (sheet.options.jss.id != null) {
        jssId = String(sheet.options.jss.id);
      }
    }
    if (options.minify) {
      return "" + (prefix2 || "c") + moduleId + jssId + ruleCounter;
    }
    return prefix2 + rule.key + "-" + moduleId + (jssId ? "-" + jssId : "") + "-" + ruleCounter;
  };
};
var memoize = function memoize2(fn) {
  var value;
  return function() {
    if (!value)
      value = fn();
    return value;
  };
};
var getPropertyValue = function getPropertyValue2(cssRule, prop) {
  try {
    if (cssRule.attributeStyleMap) {
      return cssRule.attributeStyleMap.get(prop);
    }
    return cssRule.style.getPropertyValue(prop);
  } catch (err) {
    return "";
  }
};
var setProperty = function setProperty2(cssRule, prop, value) {
  try {
    var cssValue = value;
    if (Array.isArray(value)) {
      cssValue = toCssValue(value, true);
      if (value[value.length - 1] === "!important") {
        cssRule.style.setProperty(prop, cssValue, "important");
        return true;
      }
    }
    if (cssRule.attributeStyleMap) {
      cssRule.attributeStyleMap.set(prop, cssValue);
    } else {
      cssRule.style.setProperty(prop, cssValue);
    }
  } catch (err) {
    return false;
  }
  return true;
};
var removeProperty = function removeProperty2(cssRule, prop) {
  try {
    if (cssRule.attributeStyleMap) {
      cssRule.attributeStyleMap.delete(prop);
    } else {
      cssRule.style.removeProperty(prop);
    }
  } catch (err) {
    false ? tiny_warning_esm_default(false, '[JSS] DOMException "' + err.message + '" was thrown. Tried to remove property "' + prop + '".') : void 0;
  }
};
var setSelector = function setSelector2(cssRule, selectorText) {
  cssRule.selectorText = selectorText;
  return cssRule.selectorText === selectorText;
};
var getHead = memoize(function() {
  return document.querySelector("head");
});
function findHigherSheet(registry2, options) {
  for (var i2 = 0; i2 < registry2.length; i2++) {
    var sheet = registry2[i2];
    if (sheet.attached && sheet.options.index > options.index && sheet.options.insertionPoint === options.insertionPoint) {
      return sheet;
    }
  }
  return null;
}
function findHighestSheet(registry2, options) {
  for (var i2 = registry2.length - 1; i2 >= 0; i2--) {
    var sheet = registry2[i2];
    if (sheet.attached && sheet.options.insertionPoint === options.insertionPoint) {
      return sheet;
    }
  }
  return null;
}
function findCommentNode(text) {
  var head = getHead();
  for (var i2 = 0; i2 < head.childNodes.length; i2++) {
    var node = head.childNodes[i2];
    if (node.nodeType === 8 && node.nodeValue.trim() === text) {
      return node;
    }
  }
  return null;
}
function findPrevNode(options) {
  var registry$1 = registry.registry;
  if (registry$1.length > 0) {
    var sheet = findHigherSheet(registry$1, options);
    if (sheet && sheet.renderer) {
      return {
        parent: sheet.renderer.element.parentNode,
        node: sheet.renderer.element
      };
    }
    sheet = findHighestSheet(registry$1, options);
    if (sheet && sheet.renderer) {
      return {
        parent: sheet.renderer.element.parentNode,
        node: sheet.renderer.element.nextSibling
      };
    }
  }
  var insertionPoint = options.insertionPoint;
  if (insertionPoint && typeof insertionPoint === "string") {
    var comment = findCommentNode(insertionPoint);
    if (comment) {
      return {
        parent: comment.parentNode,
        node: comment.nextSibling
      };
    }
    false ? tiny_warning_esm_default(false, '[JSS] Insertion point "' + insertionPoint + '" not found.') : void 0;
  }
  return false;
}
function insertStyle(style3, options) {
  var insertionPoint = options.insertionPoint;
  var nextNode = findPrevNode(options);
  if (nextNode !== false && nextNode.parent) {
    nextNode.parent.insertBefore(style3, nextNode.node);
    return;
  }
  if (insertionPoint && typeof insertionPoint.nodeType === "number") {
    var insertionPointElement = insertionPoint;
    var parentNode = insertionPointElement.parentNode;
    if (parentNode)
      parentNode.insertBefore(style3, insertionPointElement.nextSibling);
    else
      false ? tiny_warning_esm_default(false, "[JSS] Insertion point is not in the DOM.") : void 0;
    return;
  }
  getHead().appendChild(style3);
}
var getNonce = memoize(function() {
  var node = document.querySelector('meta[property="csp-nonce"]');
  return node ? node.getAttribute("content") : null;
});
var _insertRule = function insertRule(container, rule, index) {
  try {
    if ("insertRule" in container) {
      var c2 = container;
      c2.insertRule(rule, index);
    } else if ("appendRule" in container) {
      var _c = container;
      _c.appendRule(rule);
    }
  } catch (err) {
    false ? tiny_warning_esm_default(false, "[JSS] " + err.message) : void 0;
    return false;
  }
  return container.cssRules[index];
};
var getValidRuleInsertionIndex = function getValidRuleInsertionIndex2(container, index) {
  var maxIndex = container.cssRules.length;
  if (index === void 0 || index > maxIndex) {
    return maxIndex;
  }
  return index;
};
var createStyle = function createStyle2() {
  var el2 = document.createElement("style");
  el2.textContent = "\n";
  return el2;
};
var DomRenderer = /* @__PURE__ */ function() {
  function DomRenderer2(sheet) {
    this.getPropertyValue = getPropertyValue;
    this.setProperty = setProperty;
    this.removeProperty = removeProperty;
    this.setSelector = setSelector;
    this.element = void 0;
    this.sheet = void 0;
    this.hasInsertedRules = false;
    this.cssRules = [];
    if (sheet)
      registry.add(sheet);
    this.sheet = sheet;
    var _ref = this.sheet ? this.sheet.options : {}, media = _ref.media, meta = _ref.meta, element = _ref.element;
    this.element = element || createStyle();
    this.element.setAttribute("data-jss", "");
    if (media)
      this.element.setAttribute("media", media);
    if (meta)
      this.element.setAttribute("data-meta", meta);
    var nonce = getNonce();
    if (nonce)
      this.element.setAttribute("nonce", nonce);
  }
  var _proto = DomRenderer2.prototype;
  _proto.attach = function attach2() {
    if (this.element.parentNode || !this.sheet)
      return;
    insertStyle(this.element, this.sheet.options);
    var deployed = Boolean(this.sheet && this.sheet.deployed);
    if (this.hasInsertedRules && deployed) {
      this.hasInsertedRules = false;
      this.deploy();
    }
  };
  _proto.detach = function detach2() {
    if (!this.sheet)
      return;
    var parentNode = this.element.parentNode;
    if (parentNode)
      parentNode.removeChild(this.element);
    if (this.sheet.options.link) {
      this.cssRules = [];
      this.element.textContent = "\n";
    }
  };
  _proto.deploy = function deploy() {
    var sheet = this.sheet;
    if (!sheet)
      return;
    if (sheet.options.link) {
      this.insertRules(sheet.rules);
      return;
    }
    this.element.textContent = "\n" + sheet.toString() + "\n";
  };
  _proto.insertRules = function insertRules(rules, nativeParent) {
    for (var i2 = 0; i2 < rules.index.length; i2++) {
      this.insertRule(rules.index[i2], i2, nativeParent);
    }
  };
  _proto.insertRule = function insertRule2(rule, index, nativeParent) {
    if (nativeParent === void 0) {
      nativeParent = this.element.sheet;
    }
    if (rule.rules) {
      var parent = rule;
      var latestNativeParent = nativeParent;
      if (rule.type === "conditional" || rule.type === "keyframes") {
        var _insertionIndex = getValidRuleInsertionIndex(nativeParent, index);
        latestNativeParent = _insertRule(nativeParent, parent.toString({
          children: false
        }), _insertionIndex);
        if (latestNativeParent === false) {
          return false;
        }
        this.refCssRule(rule, _insertionIndex, latestNativeParent);
      }
      this.insertRules(parent.rules, latestNativeParent);
      return latestNativeParent;
    }
    var ruleStr = rule.toString();
    if (!ruleStr)
      return false;
    var insertionIndex = getValidRuleInsertionIndex(nativeParent, index);
    var nativeRule = _insertRule(nativeParent, ruleStr, insertionIndex);
    if (nativeRule === false) {
      return false;
    }
    this.hasInsertedRules = true;
    this.refCssRule(rule, insertionIndex, nativeRule);
    return nativeRule;
  };
  _proto.refCssRule = function refCssRule(rule, index, cssRule) {
    rule.renderable = cssRule;
    if (rule.options.parent instanceof StyleSheet) {
      this.cssRules[index] = cssRule;
    }
  };
  _proto.deleteRule = function deleteRule(cssRule) {
    var sheet = this.element.sheet;
    var index = this.indexOf(cssRule);
    if (index === -1)
      return false;
    sheet.deleteRule(index);
    this.cssRules.splice(index, 1);
    return true;
  };
  _proto.indexOf = function indexOf(cssRule) {
    return this.cssRules.indexOf(cssRule);
  };
  _proto.replaceRule = function replaceRule(cssRule, rule) {
    var index = this.indexOf(cssRule);
    if (index === -1)
      return false;
    this.element.sheet.deleteRule(index);
    this.cssRules.splice(index, 1);
    return this.insertRule(rule, index);
  };
  _proto.getRules = function getRules3() {
    return this.element.sheet.cssRules;
  };
  return DomRenderer2;
}();
var instanceCounter = 0;
var Jss = /* @__PURE__ */ function() {
  function Jss2(options) {
    this.id = instanceCounter++;
    this.version = "10.5.1";
    this.plugins = new PluginsRegistry();
    this.options = {
      id: {
        minify: false
      },
      createGenerateId,
      Renderer: module_default ? DomRenderer : null,
      plugins: []
    };
    this.generateId = createGenerateId({
      minify: false
    });
    for (var i2 = 0; i2 < plugins.length; i2++) {
      this.plugins.use(plugins[i2], {
        queue: "internal"
      });
    }
    this.setup(options);
  }
  var _proto = Jss2.prototype;
  _proto.setup = function setup(options) {
    if (options === void 0) {
      options = {};
    }
    if (options.createGenerateId) {
      this.options.createGenerateId = options.createGenerateId;
    }
    if (options.id) {
      this.options.id = _extends({}, this.options.id, options.id);
    }
    if (options.createGenerateId || options.id) {
      this.generateId = this.options.createGenerateId(this.options.id);
    }
    if (options.insertionPoint != null)
      this.options.insertionPoint = options.insertionPoint;
    if ("Renderer" in options) {
      this.options.Renderer = options.Renderer;
    }
    if (options.plugins)
      this.use.apply(this, options.plugins);
    return this;
  };
  _proto.createStyleSheet = function createStyleSheet(styles4, options) {
    if (options === void 0) {
      options = {};
    }
    var _options = options, index = _options.index;
    if (typeof index !== "number") {
      index = registry.index === 0 ? 0 : registry.index + 1;
    }
    var sheet = new StyleSheet(styles4, _extends({}, options, {
      jss: this,
      generateId: options.generateId || this.generateId,
      insertionPoint: this.options.insertionPoint,
      Renderer: this.options.Renderer,
      index
    }));
    this.plugins.onProcessSheet(sheet);
    return sheet;
  };
  _proto.removeStyleSheet = function removeStyleSheet(sheet) {
    sheet.detach();
    registry.remove(sheet);
    return this;
  };
  _proto.createRule = function createRule$1(name, style3, options) {
    if (style3 === void 0) {
      style3 = {};
    }
    if (options === void 0) {
      options = {};
    }
    if (typeof name === "object") {
      return this.createRule(void 0, name, style3);
    }
    var ruleOptions = _extends({}, options, {
      name,
      jss: this,
      Renderer: this.options.Renderer
    });
    if (!ruleOptions.generateId)
      ruleOptions.generateId = this.generateId;
    if (!ruleOptions.classes)
      ruleOptions.classes = {};
    if (!ruleOptions.keyframes)
      ruleOptions.keyframes = {};
    var rule = createRule(name, style3, ruleOptions);
    if (rule)
      this.plugins.onProcessRule(rule);
    return rule;
  };
  _proto.use = function use() {
    var _this = this;
    for (var _len = arguments.length, plugins3 = new Array(_len), _key = 0; _key < _len; _key++) {
      plugins3[_key] = arguments[_key];
    }
    plugins3.forEach(function(plugin2) {
      _this.plugins.use(plugin2);
    });
    return this;
  };
  return Jss2;
}();
function getDynamicStyles(styles4) {
  var to = null;
  for (var key in styles4) {
    var value = styles4[key];
    var type = typeof value;
    if (type === "function") {
      if (!to)
        to = {};
      to[key] = value;
    } else if (type === "object" && value !== null && !Array.isArray(value)) {
      var extracted = getDynamicStyles(value);
      if (extracted) {
        if (!to)
          to = {};
        to[key] = extracted;
      }
    }
  }
  return to;
}
/**
 * A better abstraction over CSS.
 *
 * @copyright Oleg Isonen (Slobodskoi) / Isonen 2014-present
 * @website https://github.com/cssinjs/jss
 * @license MIT
 */
var hasCSSTOMSupport = typeof CSS === "object" && CSS != null && "number" in CSS;
var create = function create2(options) {
  return new Jss(options);
};
var jss = create();

// ../../node_modules/jss-plugin-rule-value-function/dist/jss-plugin-rule-value-function.esm.js
var now = Date.now();
var fnValuesNs = "fnValues" + now;
var fnRuleNs = "fnStyle" + ++now;
var functionPlugin = function functionPlugin2() {
  return {
    onCreateRule: function onCreateRule8(name, decl, options) {
      if (typeof decl !== "function")
        return null;
      var rule = createRule(name, {}, options);
      rule[fnRuleNs] = decl;
      return rule;
    },
    onProcessStyle: function onProcessStyle2(style3, rule) {
      if (fnValuesNs in rule || fnRuleNs in rule)
        return style3;
      var fnValues = {};
      for (var prop in style3) {
        var value = style3[prop];
        if (typeof value !== "function")
          continue;
        delete style3[prop];
        fnValues[prop] = value;
      }
      rule[fnValuesNs] = fnValues;
      return style3;
    },
    onUpdate: function onUpdate(data, rule, sheet, options) {
      var styleRule = rule;
      var fnRule = styleRule[fnRuleNs];
      if (fnRule) {
        styleRule.style = fnRule(data) || {};
        if (false) {
          for (var prop in styleRule.style) {
            if (typeof styleRule.style[prop] === "function") {
              false ? tiny_warning_esm_default(false, "[JSS] Function values inside function rules are not supported.") : void 0;
              break;
            }
          }
        }
      }
      var fnValues = styleRule[fnValuesNs];
      if (fnValues) {
        for (var _prop in fnValues) {
          styleRule.prop(_prop, fnValues[_prop](data), options);
        }
      }
    }
  };
};
var jss_plugin_rule_value_function_esm_default = functionPlugin;

// ../../node_modules/jss-plugin-global/dist/jss-plugin-global.esm.js
var at = "@global";
var atPrefix = "@global ";
var GlobalContainerRule = /* @__PURE__ */ function() {
  function GlobalContainerRule2(key, styles4, options) {
    this.type = "global";
    this.at = at;
    this.rules = void 0;
    this.options = void 0;
    this.key = void 0;
    this.isProcessed = false;
    this.key = key;
    this.options = options;
    this.rules = new RuleList(_extends({}, options, {
      parent: this
    }));
    for (var selector in styles4) {
      this.rules.add(selector, styles4[selector]);
    }
    this.rules.process();
  }
  var _proto = GlobalContainerRule2.prototype;
  _proto.getRule = function getRule(name) {
    return this.rules.get(name);
  };
  _proto.addRule = function addRule(name, style3, options) {
    var rule = this.rules.add(name, style3, options);
    if (rule)
      this.options.jss.plugins.onProcessRule(rule);
    return rule;
  };
  _proto.indexOf = function indexOf(rule) {
    return this.rules.indexOf(rule);
  };
  _proto.toString = function toString() {
    return this.rules.toString();
  };
  return GlobalContainerRule2;
}();
var GlobalPrefixedRule = /* @__PURE__ */ function() {
  function GlobalPrefixedRule2(key, style3, options) {
    this.type = "global";
    this.at = at;
    this.options = void 0;
    this.rule = void 0;
    this.isProcessed = false;
    this.key = void 0;
    this.key = key;
    this.options = options;
    var selector = key.substr(atPrefix.length);
    this.rule = options.jss.createRule(selector, style3, _extends({}, options, {
      parent: this
    }));
  }
  var _proto2 = GlobalPrefixedRule2.prototype;
  _proto2.toString = function toString(options) {
    return this.rule ? this.rule.toString(options) : "";
  };
  return GlobalPrefixedRule2;
}();
var separatorRegExp = /\s*,\s*/g;
function addScope(selector, scope) {
  var parts = selector.split(separatorRegExp);
  var scoped = "";
  for (var i2 = 0; i2 < parts.length; i2++) {
    scoped += scope + " " + parts[i2].trim();
    if (parts[i2 + 1])
      scoped += ", ";
  }
  return scoped;
}
function handleNestedGlobalContainerRule(rule, sheet) {
  var options = rule.options, style3 = rule.style;
  var rules = style3 ? style3[at] : null;
  if (!rules)
    return;
  for (var name in rules) {
    sheet.addRule(name, rules[name], _extends({}, options, {
      selector: addScope(name, rule.selector)
    }));
  }
  delete style3[at];
}
function handlePrefixedGlobalRule(rule, sheet) {
  var options = rule.options, style3 = rule.style;
  for (var prop in style3) {
    if (prop[0] !== "@" || prop.substr(0, at.length) !== at)
      continue;
    var selector = addScope(prop.substr(at.length), rule.selector);
    sheet.addRule(selector, style3[prop], _extends({}, options, {
      selector
    }));
    delete style3[prop];
  }
}
function jssGlobal() {
  function onCreateRule8(name, styles4, options) {
    if (!name)
      return null;
    if (name === at) {
      return new GlobalContainerRule(name, styles4, options);
    }
    if (name[0] === "@" && name.substr(0, atPrefix.length) === atPrefix) {
      return new GlobalPrefixedRule(name, styles4, options);
    }
    var parent = options.parent;
    if (parent) {
      if (parent.type === "global" || parent.options.parent && parent.options.parent.type === "global") {
        options.scoped = false;
      }
    }
    if (options.scoped === false) {
      options.selector = name;
    }
    return null;
  }
  function onProcessRule(rule, sheet) {
    if (rule.type !== "style" || !sheet)
      return;
    handleNestedGlobalContainerRule(rule, sheet);
    handlePrefixedGlobalRule(rule, sheet);
  }
  return {
    onCreateRule: onCreateRule8,
    onProcessRule
  };
}
var jss_plugin_global_esm_default = jssGlobal;

// ../../node_modules/jss-plugin-nested/dist/jss-plugin-nested.esm.js
var separatorRegExp2 = /\s*,\s*/g;
var parentRegExp = /&/g;
var refRegExp2 = /\$([\w-]+)/g;
function jssNested() {
  function getReplaceRef(container, sheet) {
    return function(match, key) {
      var rule = container.getRule(key) || sheet && sheet.getRule(key);
      if (rule) {
        rule = rule;
        return rule.selector;
      }
      false ? tiny_warning_esm_default(false, '[JSS] Could not find the referenced rule "' + key + '" in "' + (container.options.meta || container.toString()) + '".') : void 0;
      return key;
    };
  }
  function replaceParentRefs(nestedProp, parentProp) {
    var parentSelectors = parentProp.split(separatorRegExp2);
    var nestedSelectors = nestedProp.split(separatorRegExp2);
    var result = "";
    for (var i2 = 0; i2 < parentSelectors.length; i2++) {
      var parent = parentSelectors[i2];
      for (var j2 = 0; j2 < nestedSelectors.length; j2++) {
        var nested = nestedSelectors[j2];
        if (result)
          result += ", ";
        result += nested.indexOf("&") !== -1 ? nested.replace(parentRegExp, parent) : parent + " " + nested;
      }
    }
    return result;
  }
  function getOptions(rule, container, prevOptions) {
    if (prevOptions)
      return _extends({}, prevOptions, {
        index: prevOptions.index + 1
      });
    var nestingLevel = rule.options.nestingLevel;
    nestingLevel = nestingLevel === void 0 ? 1 : nestingLevel + 1;
    var options = _extends({}, rule.options, {
      nestingLevel,
      index: container.indexOf(rule) + 1
    });
    delete options.name;
    return options;
  }
  function onProcessStyle2(style3, rule, sheet) {
    if (rule.type !== "style")
      return style3;
    var styleRule = rule;
    var container = styleRule.options.parent;
    var options;
    var replaceRef3;
    for (var prop in style3) {
      var isNested = prop.indexOf("&") !== -1;
      var isNestedConditional = prop[0] === "@";
      if (!isNested && !isNestedConditional)
        continue;
      options = getOptions(styleRule, container, options);
      if (isNested) {
        var selector = replaceParentRefs(prop, styleRule.selector);
        if (!replaceRef3)
          replaceRef3 = getReplaceRef(container, sheet);
        selector = selector.replace(refRegExp2, replaceRef3);
        container.addRule(selector, style3[prop], _extends({}, options, {
          selector
        }));
      } else if (isNestedConditional) {
        container.addRule(prop, {}, options).addRule(styleRule.key, style3[prop], {
          selector: styleRule.selector
        });
      }
      delete style3[prop];
    }
    return style3;
  }
  return {
    onProcessStyle: onProcessStyle2
  };
}
var jss_plugin_nested_esm_default = jssNested;

// ../../node_modules/hyphenate-style-name/index.js
var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var cache = {};
function toHyphenLower(match) {
  return "-" + match.toLowerCase();
}
function hyphenateStyleName(name) {
  if (cache.hasOwnProperty(name)) {
    return cache[name];
  }
  var hName = name.replace(uppercasePattern, toHyphenLower);
  return cache[name] = msPattern.test(hName) ? "-" + hName : hName;
}
var hyphenate_style_name_default = hyphenateStyleName;

// ../../node_modules/jss-plugin-camel-case/dist/jss-plugin-camel-case.esm.js
function convertCase(style3) {
  var converted = {};
  for (var prop in style3) {
    var key = prop.indexOf("--") === 0 ? prop : hyphenate_style_name_default(prop);
    converted[key] = style3[prop];
  }
  if (style3.fallbacks) {
    if (Array.isArray(style3.fallbacks))
      converted.fallbacks = style3.fallbacks.map(convertCase);
    else
      converted.fallbacks = convertCase(style3.fallbacks);
  }
  return converted;
}
function camelCase() {
  function onProcessStyle2(style3) {
    if (Array.isArray(style3)) {
      for (var index = 0; index < style3.length; index++) {
        style3[index] = convertCase(style3[index]);
      }
      return style3;
    }
    return convertCase(style3);
  }
  function onChangeValue2(value, prop, rule) {
    if (prop.indexOf("--") === 0) {
      return value;
    }
    var hyphenatedProp = hyphenate_style_name_default(prop);
    if (prop === hyphenatedProp)
      return value;
    rule.prop(hyphenatedProp, value);
    return null;
  }
  return {
    onProcessStyle: onProcessStyle2,
    onChangeValue: onChangeValue2
  };
}
var jss_plugin_camel_case_esm_default = camelCase;

// ../../node_modules/jss-plugin-default-unit/dist/jss-plugin-default-unit.esm.js
var px = hasCSSTOMSupport && CSS ? CSS.px : "px";
var ms = hasCSSTOMSupport && CSS ? CSS.ms : "ms";
var percent = hasCSSTOMSupport && CSS ? CSS.percent : "%";
var defaultUnits = {
  "animation-delay": ms,
  "animation-duration": ms,
  "background-position": px,
  "background-position-x": px,
  "background-position-y": px,
  "background-size": px,
  border: px,
  "border-bottom": px,
  "border-bottom-left-radius": px,
  "border-bottom-right-radius": px,
  "border-bottom-width": px,
  "border-left": px,
  "border-left-width": px,
  "border-radius": px,
  "border-right": px,
  "border-right-width": px,
  "border-top": px,
  "border-top-left-radius": px,
  "border-top-right-radius": px,
  "border-top-width": px,
  "border-width": px,
  "border-block": px,
  "border-block-end": px,
  "border-block-end-width": px,
  "border-block-start": px,
  "border-block-start-width": px,
  "border-block-width": px,
  "border-inline": px,
  "border-inline-end": px,
  "border-inline-end-width": px,
  "border-inline-start": px,
  "border-inline-start-width": px,
  "border-inline-width": px,
  "border-start-start-radius": px,
  "border-start-end-radius": px,
  "border-end-start-radius": px,
  "border-end-end-radius": px,
  margin: px,
  "margin-bottom": px,
  "margin-left": px,
  "margin-right": px,
  "margin-top": px,
  "margin-block": px,
  "margin-block-end": px,
  "margin-block-start": px,
  "margin-inline": px,
  "margin-inline-end": px,
  "margin-inline-start": px,
  padding: px,
  "padding-bottom": px,
  "padding-left": px,
  "padding-right": px,
  "padding-top": px,
  "padding-block": px,
  "padding-block-end": px,
  "padding-block-start": px,
  "padding-inline": px,
  "padding-inline-end": px,
  "padding-inline-start": px,
  "mask-position-x": px,
  "mask-position-y": px,
  "mask-size": px,
  height: px,
  width: px,
  "min-height": px,
  "max-height": px,
  "min-width": px,
  "max-width": px,
  bottom: px,
  left: px,
  top: px,
  right: px,
  inset: px,
  "inset-block": px,
  "inset-block-end": px,
  "inset-block-start": px,
  "inset-inline": px,
  "inset-inline-end": px,
  "inset-inline-start": px,
  "box-shadow": px,
  "text-shadow": px,
  "column-gap": px,
  "column-rule": px,
  "column-rule-width": px,
  "column-width": px,
  "font-size": px,
  "font-size-delta": px,
  "letter-spacing": px,
  "text-decoration-thickness": px,
  "text-indent": px,
  "text-stroke": px,
  "text-stroke-width": px,
  "word-spacing": px,
  motion: px,
  "motion-offset": px,
  outline: px,
  "outline-offset": px,
  "outline-width": px,
  perspective: px,
  "perspective-origin-x": percent,
  "perspective-origin-y": percent,
  "transform-origin": percent,
  "transform-origin-x": percent,
  "transform-origin-y": percent,
  "transform-origin-z": percent,
  "transition-delay": ms,
  "transition-duration": ms,
  "vertical-align": px,
  "flex-basis": px,
  "shape-margin": px,
  size: px,
  gap: px,
  grid: px,
  "grid-gap": px,
  "row-gap": px,
  "grid-row-gap": px,
  "grid-column-gap": px,
  "grid-template-rows": px,
  "grid-template-columns": px,
  "grid-auto-rows": px,
  "grid-auto-columns": px,
  "box-shadow-x": px,
  "box-shadow-y": px,
  "box-shadow-blur": px,
  "box-shadow-spread": px,
  "font-line-height": px,
  "text-shadow-x": px,
  "text-shadow-y": px,
  "text-shadow-blur": px
};
function addCamelCasedVersion(obj) {
  var regExp2 = /(-[a-z])/g;
  var replace = function replace2(str) {
    return str[1].toUpperCase();
  };
  var newObj = {};
  for (var _key in obj) {
    newObj[_key] = obj[_key];
    newObj[_key.replace(regExp2, replace)] = obj[_key];
  }
  return newObj;
}
var units = addCamelCasedVersion(defaultUnits);
function iterate(prop, value, options) {
  if (value == null)
    return value;
  if (Array.isArray(value)) {
    for (var i2 = 0; i2 < value.length; i2++) {
      value[i2] = iterate(prop, value[i2], options);
    }
  } else if (typeof value === "object") {
    if (prop === "fallbacks") {
      for (var innerProp in value) {
        value[innerProp] = iterate(innerProp, value[innerProp], options);
      }
    } else {
      for (var _innerProp in value) {
        value[_innerProp] = iterate(prop + "-" + _innerProp, value[_innerProp], options);
      }
    }
  } else if (typeof value === "number" && !Number.isNaN(value)) {
    var unit = options[prop] || units[prop];
    if (unit && !(value === 0 && unit === px)) {
      return typeof unit === "function" ? unit(value).toString() : "" + value + unit;
    }
    return value.toString();
  }
  return value;
}
function defaultUnit(options) {
  if (options === void 0) {
    options = {};
  }
  var camelCasedOptions = addCamelCasedVersion(options);
  function onProcessStyle2(style3, rule) {
    if (rule.type !== "style")
      return style3;
    for (var prop in style3) {
      style3[prop] = iterate(prop, style3[prop], camelCasedOptions);
    }
    return style3;
  }
  function onChangeValue2(value, prop) {
    return iterate(prop, value, camelCasedOptions);
  }
  return {
    onProcessStyle: onProcessStyle2,
    onChangeValue: onChangeValue2
  };
}
var jss_plugin_default_unit_esm_default = defaultUnit;

// ../../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
    arr2[i2] = arr[i2];
  }
  return arr2;
}

// ../../node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}

// ../../node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
    return Array.from(iter);
}

// ../../node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n2 = Object.prototype.toString.call(o).slice(8, -1);
  if (n2 === "Object" && o.constructor)
    n2 = o.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray(o, minLen);
}

// ../../node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// ../../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

// ../../node_modules/css-vendor/dist/css-vendor.esm.js
var js = "";
var css = "";
var vendor = "";
var browser = "";
var isTouch = module_default && "ontouchstart" in document.documentElement;
if (module_default) {
  jsCssMap = {
    Moz: "-moz-",
    ms: "-ms-",
    O: "-o-",
    Webkit: "-webkit-"
  };
  _document$createEleme = document.createElement("p"), style3 = _document$createEleme.style;
  testProp = "Transform";
  for (var key in jsCssMap) {
    if (key + testProp in style3) {
      js = key;
      css = jsCssMap[key];
      break;
    }
  }
  if (js === "Webkit" && "msHyphens" in style3) {
    js = "ms";
    css = jsCssMap.ms;
    browser = "edge";
  }
  if (js === "Webkit" && "-apple-trailing-word" in style3) {
    vendor = "apple";
  }
}
var jsCssMap;
var _document$createEleme;
var style3;
var testProp;
var prefix = {
  js,
  css,
  vendor,
  browser,
  isTouch
};
function supportedKeyframes(key) {
  if (key[1] === "-")
    return key;
  if (prefix.js === "ms")
    return key;
  return "@" + prefix.css + "keyframes" + key.substr(10);
}
var appearence = {
  noPrefill: ["appearance"],
  supportedProperty: function supportedProperty(prop) {
    if (prop !== "appearance")
      return false;
    if (prefix.js === "ms")
      return "-webkit-" + prop;
    return prefix.css + prop;
  }
};
var colorAdjust = {
  noPrefill: ["color-adjust"],
  supportedProperty: function supportedProperty2(prop) {
    if (prop !== "color-adjust")
      return false;
    if (prefix.js === "Webkit")
      return prefix.css + "print-" + prop;
    return prop;
  }
};
var regExp = /[-\s]+(.)?/g;
function toUpper(match, c2) {
  return c2 ? c2.toUpperCase() : "";
}
function camelize(str) {
  return str.replace(regExp, toUpper);
}
function pascalize(str) {
  return camelize("-" + str);
}
var mask = {
  noPrefill: ["mask"],
  supportedProperty: function supportedProperty3(prop, style3) {
    if (!/^mask/.test(prop))
      return false;
    if (prefix.js === "Webkit") {
      var longhand = "mask-image";
      if (camelize(longhand) in style3) {
        return prop;
      }
      if (prefix.js + pascalize(longhand) in style3) {
        return prefix.css + prop;
      }
    }
    return prop;
  }
};
var textOrientation = {
  noPrefill: ["text-orientation"],
  supportedProperty: function supportedProperty4(prop) {
    if (prop !== "text-orientation")
      return false;
    if (prefix.vendor === "apple" && !prefix.isTouch) {
      return prefix.css + prop;
    }
    return prop;
  }
};
var transform = {
  noPrefill: ["transform"],
  supportedProperty: function supportedProperty5(prop, style3, options) {
    if (prop !== "transform")
      return false;
    if (options.transform) {
      return prop;
    }
    return prefix.css + prop;
  }
};
var transition = {
  noPrefill: ["transition"],
  supportedProperty: function supportedProperty6(prop, style3, options) {
    if (prop !== "transition")
      return false;
    if (options.transition) {
      return prop;
    }
    return prefix.css + prop;
  }
};
var writingMode = {
  noPrefill: ["writing-mode"],
  supportedProperty: function supportedProperty7(prop) {
    if (prop !== "writing-mode")
      return false;
    if (prefix.js === "Webkit" || prefix.js === "ms" && prefix.browser !== "edge") {
      return prefix.css + prop;
    }
    return prop;
  }
};
var userSelect = {
  noPrefill: ["user-select"],
  supportedProperty: function supportedProperty8(prop) {
    if (prop !== "user-select")
      return false;
    if (prefix.js === "Moz" || prefix.js === "ms" || prefix.vendor === "apple") {
      return prefix.css + prop;
    }
    return prop;
  }
};
var breakPropsOld = {
  supportedProperty: function supportedProperty9(prop, style3) {
    if (!/^break-/.test(prop))
      return false;
    if (prefix.js === "Webkit") {
      var jsProp = "WebkitColumn" + pascalize(prop);
      return jsProp in style3 ? prefix.css + "column-" + prop : false;
    }
    if (prefix.js === "Moz") {
      var _jsProp = "page" + pascalize(prop);
      return _jsProp in style3 ? "page-" + prop : false;
    }
    return false;
  }
};
var inlineLogicalOld = {
  supportedProperty: function supportedProperty10(prop, style3) {
    if (!/^(border|margin|padding)-inline/.test(prop))
      return false;
    if (prefix.js === "Moz")
      return prop;
    var newProp = prop.replace("-inline", "");
    return prefix.js + pascalize(newProp) in style3 ? prefix.css + newProp : false;
  }
};
var unprefixed = {
  supportedProperty: function supportedProperty11(prop, style3) {
    return camelize(prop) in style3 ? prop : false;
  }
};
var prefixed = {
  supportedProperty: function supportedProperty12(prop, style3) {
    var pascalized = pascalize(prop);
    if (prop[0] === "-")
      return prop;
    if (prop[0] === "-" && prop[1] === "-")
      return prop;
    if (prefix.js + pascalized in style3)
      return prefix.css + prop;
    if (prefix.js !== "Webkit" && "Webkit" + pascalized in style3)
      return "-webkit-" + prop;
    return false;
  }
};
var scrollSnap = {
  supportedProperty: function supportedProperty13(prop) {
    if (prop.substring(0, 11) !== "scroll-snap")
      return false;
    if (prefix.js === "ms") {
      return "" + prefix.css + prop;
    }
    return prop;
  }
};
var overscrollBehavior = {
  supportedProperty: function supportedProperty14(prop) {
    if (prop !== "overscroll-behavior")
      return false;
    if (prefix.js === "ms") {
      return prefix.css + "scroll-chaining";
    }
    return prop;
  }
};
var propMap = {
  "flex-grow": "flex-positive",
  "flex-shrink": "flex-negative",
  "flex-basis": "flex-preferred-size",
  "justify-content": "flex-pack",
  order: "flex-order",
  "align-items": "flex-align",
  "align-content": "flex-line-pack"
};
var flex2012 = {
  supportedProperty: function supportedProperty15(prop, style3) {
    var newProp = propMap[prop];
    if (!newProp)
      return false;
    return prefix.js + pascalize(newProp) in style3 ? prefix.css + newProp : false;
  }
};
var propMap$1 = {
  flex: "box-flex",
  "flex-grow": "box-flex",
  "flex-direction": ["box-orient", "box-direction"],
  order: "box-ordinal-group",
  "align-items": "box-align",
  "flex-flow": ["box-orient", "box-direction"],
  "justify-content": "box-pack"
};
var propKeys = Object.keys(propMap$1);
var prefixCss = function prefixCss2(p2) {
  return prefix.css + p2;
};
var flex2009 = {
  supportedProperty: function supportedProperty16(prop, style3, _ref) {
    var multiple = _ref.multiple;
    if (propKeys.indexOf(prop) > -1) {
      var newProp = propMap$1[prop];
      if (!Array.isArray(newProp)) {
        return prefix.js + pascalize(newProp) in style3 ? prefix.css + newProp : false;
      }
      if (!multiple)
        return false;
      for (var i2 = 0; i2 < newProp.length; i2++) {
        if (!(prefix.js + pascalize(newProp[0]) in style3)) {
          return false;
        }
      }
      return newProp.map(prefixCss);
    }
    return false;
  }
};
var plugins2 = [appearence, colorAdjust, mask, textOrientation, transform, transition, writingMode, userSelect, breakPropsOld, inlineLogicalOld, unprefixed, prefixed, scrollSnap, overscrollBehavior, flex2012, flex2009];
var propertyDetectors = plugins2.filter(function(p2) {
  return p2.supportedProperty;
}).map(function(p2) {
  return p2.supportedProperty;
});
var noPrefill = plugins2.filter(function(p2) {
  return p2.noPrefill;
}).reduce(function(a2, p2) {
  a2.push.apply(a2, _toConsumableArray(p2.noPrefill));
  return a2;
}, []);
var el;
var cache2 = {};
if (module_default) {
  el = document.createElement("p");
  computed = window.getComputedStyle(document.documentElement, "");
  for (var key$1 in computed) {
    if (!isNaN(key$1))
      cache2[computed[key$1]] = computed[key$1];
  }
  noPrefill.forEach(function(x2) {
    return delete cache2[x2];
  });
}
var computed;
function supportedProperty17(prop, options) {
  if (options === void 0) {
    options = {};
  }
  if (!el)
    return prop;
  if (cache2[prop] != null) {
    return cache2[prop];
  }
  if (prop === "transition" || prop === "transform") {
    options[prop] = prop in el.style;
  }
  for (var i2 = 0; i2 < propertyDetectors.length; i2++) {
    cache2[prop] = propertyDetectors[i2](prop, el.style, options);
    if (cache2[prop])
      break;
  }
  try {
    el.style[prop] = "";
  } catch (err) {
    return false;
  }
  return cache2[prop];
}
var cache$1 = {};
var transitionProperties = {
  transition: 1,
  "transition-property": 1,
  "-webkit-transition": 1,
  "-webkit-transition-property": 1
};
var transPropsRegExp = /(^\s*[\w-]+)|, (\s*[\w-]+)(?![^()]*\))/g;
var el$1;
function prefixTransitionCallback(match, p1, p2) {
  if (p1 === "var")
    return "var";
  if (p1 === "all")
    return "all";
  if (p2 === "all")
    return ", all";
  var prefixedValue = p1 ? supportedProperty17(p1) : ", " + supportedProperty17(p2);
  if (!prefixedValue)
    return p1 || p2;
  return prefixedValue;
}
if (module_default)
  el$1 = document.createElement("p");
function supportedValue(property, value) {
  var prefixedValue = value;
  if (!el$1 || property === "content")
    return value;
  if (typeof prefixedValue !== "string" || !isNaN(parseInt(prefixedValue, 10))) {
    return prefixedValue;
  }
  var cacheKey = property + prefixedValue;
  if (cache$1[cacheKey] != null) {
    return cache$1[cacheKey];
  }
  try {
    el$1.style[property] = prefixedValue;
  } catch (err) {
    cache$1[cacheKey] = false;
    return false;
  }
  if (transitionProperties[property]) {
    prefixedValue = prefixedValue.replace(transPropsRegExp, prefixTransitionCallback);
  } else if (el$1.style[property] === "") {
    prefixedValue = prefix.css + prefixedValue;
    if (prefixedValue === "-ms-flex")
      el$1.style[property] = "-ms-flexbox";
    el$1.style[property] = prefixedValue;
    if (el$1.style[property] === "") {
      cache$1[cacheKey] = false;
      return false;
    }
  }
  el$1.style[property] = "";
  cache$1[cacheKey] = prefixedValue;
  return cache$1[cacheKey];
}

// ../../node_modules/jss-plugin-vendor-prefixer/dist/jss-plugin-vendor-prefixer.esm.js
function jssVendorPrefixer() {
  function onProcessRule(rule) {
    if (rule.type === "keyframes") {
      var atRule = rule;
      atRule.at = supportedKeyframes(atRule.at);
    }
  }
  function prefixStyle(style3) {
    for (var prop in style3) {
      var value = style3[prop];
      if (prop === "fallbacks" && Array.isArray(value)) {
        style3[prop] = value.map(prefixStyle);
        continue;
      }
      var changeProp = false;
      var supportedProp = supportedProperty17(prop);
      if (supportedProp && supportedProp !== prop)
        changeProp = true;
      var changeValue = false;
      var supportedValue$1 = supportedValue(supportedProp, toCssValue(value));
      if (supportedValue$1 && supportedValue$1 !== value)
        changeValue = true;
      if (changeProp || changeValue) {
        if (changeProp)
          delete style3[prop];
        style3[supportedProp || prop] = supportedValue$1 || value;
      }
    }
    return style3;
  }
  function onProcessStyle2(style3, rule) {
    if (rule.type !== "style")
      return style3;
    return prefixStyle(style3);
  }
  function onChangeValue2(value, prop) {
    return supportedValue(prop, toCssValue(value)) || value;
  }
  return {
    onProcessRule,
    onProcessStyle: onProcessStyle2,
    onChangeValue: onChangeValue2
  };
}
var jss_plugin_vendor_prefixer_esm_default = jssVendorPrefixer;

// ../../node_modules/jss-plugin-props-sort/dist/jss-plugin-props-sort.esm.js
function jssPropsSort() {
  var sort = function sort2(prop0, prop1) {
    if (prop0.length === prop1.length) {
      return prop0 > prop1 ? 1 : -1;
    }
    return prop0.length - prop1.length;
  };
  return {
    onProcessStyle: function onProcessStyle2(style3, rule) {
      if (rule.type !== "style")
        return style3;
      var newStyle = {};
      var props = Object.keys(style3).sort(sort);
      for (var i2 = 0; i2 < props.length; i2++) {
        newStyle[props[i2]] = style3[props[i2]];
      }
      return newStyle;
    }
  };
}
var jss_plugin_props_sort_esm_default = jssPropsSort;

// ../../node_modules/@material-ui/styles/jssPreset/jssPreset.js
function jssPreset() {
  return {
    plugins: [
      jss_plugin_rule_value_function_esm_default(),
      jss_plugin_global_esm_default(),
      jss_plugin_nested_esm_default(),
      jss_plugin_camel_case_esm_default(),
      jss_plugin_default_unit_esm_default(),
      typeof window === "undefined" ? null : jss_plugin_vendor_prefixer_esm_default(),
      jss_plugin_props_sort_esm_default()
    ]
  };
}

// ../../node_modules/@material-ui/styles/makeStyles/makeStyles.js
var React9 = __toModule(require_react());

// ../../node_modules/@material-ui/styles/mergeClasses/mergeClasses.js
function mergeClasses(options = {}) {
  const {
    baseClasses,
    newClasses,
    Component
  } = options;
  if (!newClasses) {
    return baseClasses;
  }
  const nextClasses = _extends({}, baseClasses);
  if (false) {
    if (typeof newClasses === "string") {
      console.error([`Material-UI: The value \`${newClasses}\` provided to the classes prop of ${getDisplayName(Component)} is incorrect.`, "You might want to use the className prop instead."].join("\n"));
      return baseClasses;
    }
  }
  Object.keys(newClasses).forEach((key) => {
    if (false) {
      if (!baseClasses[key] && newClasses[key]) {
        console.error([`Material-UI: The key \`${key}\` provided to the classes prop is not implemented in ${getDisplayName(Component)}.`, `You can only override one of the following: ${Object.keys(baseClasses).join(",")}.`].join("\n"));
      }
      if (newClasses[key] && typeof newClasses[key] !== "string") {
        console.error([`Material-UI: The key \`${key}\` provided to the classes prop is not valid for ${getDisplayName(Component)}.`, `You need to provide a non empty string instead of: ${newClasses[key]}.`].join("\n"));
      }
    }
    if (newClasses[key]) {
      nextClasses[key] = `${baseClasses[key]} ${newClasses[key]}`;
    }
  });
  return nextClasses;
}

// ../../node_modules/@material-ui/styles/makeStyles/multiKeyStore.js
var multiKeyStore = {
  set: (cache3, key1, key2, value) => {
    let subCache = cache3.get(key1);
    if (!subCache) {
      subCache = new Map();
      cache3.set(key1, subCache);
    }
    subCache.set(key2, value);
  },
  get: (cache3, key1, key2) => {
    const subCache = cache3.get(key1);
    return subCache ? subCache.get(key2) : void 0;
  },
  delete: (cache3, key1, key2) => {
    const subCache = cache3.get(key1);
    subCache.delete(key2);
  }
};
var multiKeyStore_default = multiKeyStore;

// ../../node_modules/@material-ui/styles/useTheme/useTheme.js
var React7 = __toModule(require_react());

// ../../node_modules/@material-ui/styles/useTheme/ThemeContext.js
var React6 = __toModule(require_react());
var ThemeContext = /* @__PURE__ */ React6.createContext(null);
if (false) {
  ThemeContext.displayName = "ThemeContext";
}
var ThemeContext_default = ThemeContext;

// ../../node_modules/@material-ui/styles/useTheme/useTheme.js
function useTheme() {
  const theme = React7.useContext(ThemeContext_default);
  if (false) {
    React7.useDebugValue(theme);
  }
  return theme;
}

// ../../node_modules/@material-ui/styles/StylesProvider/StylesProvider.js
var React8 = __toModule(require_react());
var import_prop_types = __toModule(require_prop_types());
var jss2 = create(jssPreset());
var generateClassName = createGenerateClassName();
var sheetsManager = new Map();
var defaultOptions = {
  disableGeneration: false,
  generateClassName,
  jss: jss2,
  sheetsCache: null,
  sheetsManager,
  sheetsRegistry: null
};
var StylesContext = /* @__PURE__ */ React8.createContext(defaultOptions);
if (false) {
  StylesContext.displayName = "StylesContext";
}
false ? StylesProvider.propTypes = {
  children: import_prop_types.default.node,
  disableGeneration: import_prop_types.default.bool,
  generateClassName: import_prop_types.default.func,
  injectFirst: import_prop_types.default.bool,
  jss: import_prop_types.default.object,
  serverGenerateClassName: import_prop_types.default.func,
  sheetsCache: import_prop_types.default.object,
  sheetsManager: import_prop_types.default.object,
  sheetsRegistry: import_prop_types.default.object
} : void 0;
if (false) {
  false ? StylesProvider.propTypes = exactProp(StylesProvider.propTypes) : void 0;
}

// ../../node_modules/@material-ui/styles/makeStyles/indexCounter.js
var indexCounter = -1e9;
function increment() {
  indexCounter += 1;
  if (false) {
    if (indexCounter >= 0) {
      console.warn(["Material-UI: You might have a memory leak.", "The indexCounter is not supposed to grow that much."].join("\n"));
    }
  }
  return indexCounter;
}

// ../../node_modules/@material-ui/styles/propsToClassKey/propsToClassKey.js
function capitalize2(string) {
  if (typeof string !== "string") {
    throw new Error(false ? `Material-UI: capitalize(string) expects a string argument.` : formatMuiErrorMessage(7));
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function isEmpty(string) {
  return string.length === 0;
}
function propsToClassKey(props) {
  const {
    variant
  } = props, other = _objectWithoutPropertiesLoose(props, ["variant"]);
  let classKey = variant || "";
  Object.keys(other).sort().forEach((key) => {
    if (key === "color") {
      classKey += isEmpty(classKey) ? props[key] : capitalize2(props[key]);
    } else {
      classKey += `${isEmpty(classKey) ? key : capitalize2(key)}${capitalize2(props[key].toString())}`;
    }
  });
  return classKey;
}

// ../../node_modules/@material-ui/styles/getStylesCreator/noopTheme.js
var noopTheme = {};
var noopTheme_default = noopTheme;

// ../../node_modules/@material-ui/styles/getStylesCreator/getStylesCreator.js
function getStylesCreator(stylesOrCreator) {
  const themingEnabled = typeof stylesOrCreator === "function";
  if (false) {
    if (typeof stylesOrCreator !== "object" && !themingEnabled) {
      console.error(["Material-UI: The `styles` argument provided is invalid.", "You need to provide a function generating the styles or a styles object."].join("\n"));
    }
  }
  return {
    create: (theme, name) => {
      let styles4;
      try {
        styles4 = themingEnabled ? stylesOrCreator(theme) : stylesOrCreator;
      } catch (err) {
        if (false) {
          if (themingEnabled === true && theme === noopTheme_default) {
            console.error(["Material-UI: The `styles` argument provided is invalid.", "You are providing a function without a theme in the context.", "One of the parent elements needs to use a ThemeProvider."].join("\n"));
          }
        }
        throw err;
      }
      if (!name || !theme.components || !theme.components[name] || !theme.components[name].styleOverrides && !theme.components[name].variants) {
        return styles4;
      }
      const overrides = theme.components[name].styleOverrides || {};
      const variants = theme.components[name].variants || [];
      const stylesWithOverrides = _extends({}, styles4);
      Object.keys(overrides).forEach((key) => {
        if (false) {
          if (!stylesWithOverrides[key]) {
            console.warn(["Material-UI: You are trying to override a style that does not exist.", `Fix the \`${key}\` key of \`theme.overrides.${name}\`.`, "", `If you intentionally wanted to add a new key, please use the theme.components[${name}].variants option.`].join("\n"));
          }
        }
        stylesWithOverrides[key] = deepmerge(stylesWithOverrides[key] || {}, overrides[key]);
      });
      variants.forEach((definition) => {
        const classKey = propsToClassKey(definition.props);
        stylesWithOverrides[classKey] = deepmerge(stylesWithOverrides[classKey] || {}, definition.style);
      });
      return stylesWithOverrides;
    },
    options: {}
  };
}

// ../../node_modules/@material-ui/styles/makeStyles/makeStyles.js
function getClasses({
  state,
  stylesOptions
}, classes, Component) {
  if (stylesOptions.disableGeneration) {
    return classes || {};
  }
  if (!state.cacheClasses) {
    state.cacheClasses = {
      value: null,
      lastProp: null,
      lastJSS: {}
    };
  }
  let generate = false;
  if (state.classes !== state.cacheClasses.lastJSS) {
    state.cacheClasses.lastJSS = state.classes;
    generate = true;
  }
  if (classes !== state.cacheClasses.lastProp) {
    state.cacheClasses.lastProp = classes;
    generate = true;
  }
  if (generate) {
    state.cacheClasses.value = mergeClasses({
      baseClasses: state.cacheClasses.lastJSS,
      newClasses: classes,
      Component
    });
  }
  return state.cacheClasses.value;
}
function attach({
  state,
  theme,
  stylesOptions,
  stylesCreator,
  name
}, props) {
  if (stylesOptions.disableGeneration) {
    return;
  }
  let sheetManager = multiKeyStore_default.get(stylesOptions.sheetsManager, stylesCreator, theme);
  if (!sheetManager) {
    sheetManager = {
      refs: 0,
      staticSheet: null,
      dynamicStyles: null
    };
    multiKeyStore_default.set(stylesOptions.sheetsManager, stylesCreator, theme, sheetManager);
  }
  const options = _extends({}, stylesCreator.options, stylesOptions, {
    theme,
    flip: typeof stylesOptions.flip === "boolean" ? stylesOptions.flip : theme.direction === "rtl"
  });
  options.generateId = options.serverGenerateClassName || options.generateClassName;
  const sheetsRegistry = stylesOptions.sheetsRegistry;
  if (sheetManager.refs === 0) {
    let staticSheet;
    if (stylesOptions.sheetsCache) {
      staticSheet = multiKeyStore_default.get(stylesOptions.sheetsCache, stylesCreator, theme);
    }
    const styles4 = stylesCreator.create(theme, name);
    if (!staticSheet) {
      staticSheet = stylesOptions.jss.createStyleSheet(styles4, _extends({
        link: false
      }, options));
      staticSheet.attach();
      if (stylesOptions.sheetsCache) {
        multiKeyStore_default.set(stylesOptions.sheetsCache, stylesCreator, theme, staticSheet);
      }
    }
    if (sheetsRegistry) {
      sheetsRegistry.add(staticSheet);
    }
    sheetManager.staticSheet = staticSheet;
    sheetManager.dynamicStyles = getDynamicStyles(styles4);
  }
  if (sheetManager.dynamicStyles) {
    const dynamicSheet = stylesOptions.jss.createStyleSheet(sheetManager.dynamicStyles, _extends({
      link: true
    }, options));
    dynamicSheet.update(props);
    dynamicSheet.attach();
    state.dynamicSheet = dynamicSheet;
    state.classes = mergeClasses({
      baseClasses: sheetManager.staticSheet.classes,
      newClasses: dynamicSheet.classes
    });
    if (sheetsRegistry) {
      sheetsRegistry.add(dynamicSheet);
    }
  } else {
    state.classes = sheetManager.staticSheet.classes;
  }
  sheetManager.refs += 1;
}
function update({
  state
}, props) {
  if (state.dynamicSheet) {
    state.dynamicSheet.update(props);
  }
}
function detach({
  state,
  theme,
  stylesOptions,
  stylesCreator
}) {
  if (stylesOptions.disableGeneration) {
    return;
  }
  const sheetManager = multiKeyStore_default.get(stylesOptions.sheetsManager, stylesCreator, theme);
  sheetManager.refs -= 1;
  const sheetsRegistry = stylesOptions.sheetsRegistry;
  if (sheetManager.refs === 0) {
    multiKeyStore_default.delete(stylesOptions.sheetsManager, stylesCreator, theme);
    stylesOptions.jss.removeStyleSheet(sheetManager.staticSheet);
    if (sheetsRegistry) {
      sheetsRegistry.remove(sheetManager.staticSheet);
    }
  }
  if (state.dynamicSheet) {
    stylesOptions.jss.removeStyleSheet(state.dynamicSheet);
    if (sheetsRegistry) {
      sheetsRegistry.remove(state.dynamicSheet);
    }
  }
}
function useSynchronousEffect(func, values3) {
  const key = React9.useRef([]);
  let output;
  const currentKey = React9.useMemo(() => ({}), values3);
  if (key.current !== currentKey) {
    key.current = currentKey;
    output = func();
  }
  React9.useEffect(() => () => {
    if (output) {
      output();
    }
  }, [currentKey]);
}
function makeStyles(stylesOrCreator, options = {}) {
  const {
    name,
    classNamePrefix: classNamePrefixOption,
    Component,
    defaultTheme: defaultTheme2 = noopTheme_default
  } = options, stylesOptions2 = _objectWithoutPropertiesLoose(options, ["name", "classNamePrefix", "Component", "defaultTheme"]);
  const stylesCreator = getStylesCreator(stylesOrCreator);
  const classNamePrefix = name || classNamePrefixOption || "makeStyles";
  stylesCreator.options = {
    index: increment(),
    name,
    meta: classNamePrefix,
    classNamePrefix
  };
  const useStyles = (props = {}) => {
    const theme = useTheme() || defaultTheme2;
    const stylesOptions = _extends({}, React9.useContext(StylesContext), stylesOptions2);
    const instance = React9.useRef();
    const shouldUpdate = React9.useRef();
    useSynchronousEffect(() => {
      const current = {
        name,
        state: {},
        stylesCreator,
        stylesOptions,
        theme
      };
      attach(current, props);
      shouldUpdate.current = false;
      instance.current = current;
      return () => {
        detach(current);
      };
    }, [theme, stylesCreator]);
    React9.useEffect(() => {
      if (shouldUpdate.current) {
        update(instance.current, props);
      }
      shouldUpdate.current = true;
    });
    const classes = getClasses(instance.current, props.classes, Component);
    if (false) {
      React9.useDebugValue(classes);
    }
    if (false) {
      const supportedComponents = ["MuiAvatar", "MuiBadge", "MuiButton", "MuiButtonGroup", "MuiChip", "MuiDivider", "MuiFab", "MuiPaper", "MuiToolbar", "MuiTypography", "MuiAlert", "MuiPagination", "MuiPaginationItem", "MuiSkeleton", "MuiTimelineDot"];
      if (name && supportedComponents.indexOf(name) >= 0 && props.variant && !classes[props.variant]) {
        console.error([
          `Material-UI: You are using a variant value \`${props.variant}\` for which you didn't define styles.`,
          `Please create a new variant matcher in your theme for this variant. To learn more about matchers visit https://next.material-ui.com/r/custom-component-variants.`
        ].join("\n"));
      }
    }
    return classes;
  };
  return useStyles;
}

// ../../node_modules/@material-ui/styles/useThemeVariants/useThemeVariants.js
var useThemeVariants = (props, name) => {
  const {
    classes = {}
  } = props;
  const theme = useTheme();
  let variantsClasses = "";
  if (theme && theme.components && theme.components[name] && theme.components[name].variants) {
    const themeVariants = theme.components[name].variants;
    themeVariants.forEach((themeVariant) => {
      let isMatch = true;
      Object.keys(themeVariant.props).forEach((key) => {
        if (props[key] !== themeVariant.props[key]) {
          isMatch = false;
        }
      });
      if (isMatch) {
        variantsClasses = `${variantsClasses}${classes[propsToClassKey(themeVariant.props)]} `;
      }
    });
  }
  return variantsClasses;
};
var useThemeVariants_default = useThemeVariants;

// ../../node_modules/@material-ui/styles/withStyles/withStyles.js
var React10 = __toModule(require_react());
var import_prop_types2 = __toModule(require_prop_types());
var import_hoist_non_react_statics = __toModule(require_hoist_non_react_statics_cjs());
var withStyles = (stylesOrCreator, options = {}) => (Component) => {
  const {
    defaultTheme: defaultTheme2,
    withTheme = false,
    name
  } = options, stylesOptions = _objectWithoutPropertiesLoose(options, ["defaultTheme", "withTheme", "name"]);
  if (false) {
    if (Component === void 0) {
      throw new Error(["You are calling withStyles(styles)(Component) with an undefined component.", "You may have forgotten to import it."].join("\n"));
    }
  }
  let classNamePrefix = name;
  if (false) {
    if (!name) {
      const displayName = getDisplayName(Component);
      if (displayName !== void 0) {
        classNamePrefix = displayName;
      }
    }
  }
  const useStyles = makeStyles(stylesOrCreator, _extends({
    defaultTheme: defaultTheme2,
    Component,
    name: name || Component.displayName,
    classNamePrefix
  }, stylesOptions));
  const WithStyles = /* @__PURE__ */ React10.forwardRef(function WithStyles2(props, ref) {
    const {
      innerRef
    } = props, other = _objectWithoutPropertiesLoose(props, ["classes", "innerRef"]);
    const classes = useStyles(_extends({}, Component.defaultProps, props));
    let theme;
    let more = other;
    if (typeof name === "string" || withTheme) {
      theme = useTheme() || defaultTheme2;
      if (name) {
        more = getThemeProps({
          theme,
          name,
          props: other
        });
      }
      if (withTheme && !more.theme) {
        more.theme = theme;
      }
    }
    return /* @__PURE__ */ React10.createElement(Component, _extends({
      ref: innerRef || ref,
      classes
    }, more));
  });
  false ? WithStyles.propTypes = {
    classes: import_prop_types2.default.object,
    innerRef: chainPropTypes(import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object]), (props) => {
      if (props.innerRef == null) {
        return null;
      }
      return null;
    })
  } : void 0;
  if (false) {
    WithStyles.displayName = `WithStyles(${getDisplayName(Component)})`;
  }
  import_hoist_non_react_statics.default(WithStyles, Component);
  if (false) {
    WithStyles.Naked = Component;
    WithStyles.options = options;
    WithStyles.useStyles = useStyles;
  }
  return WithStyles;
};
var withStyles_default = withStyles;

// ../../node_modules/@material-ui/unstyled/utils/isHostComponent.js
function isHostComponent(element) {
  return typeof element === "string";
}
var isHostComponent_default = isHostComponent;

// ../../node_modules/@material-ui/unstyled/composeClasses/composeClasses.js
function composeClasses(slots, getUtilityClass, classes) {
  const output = {};
  Object.keys(slots).forEach((slot) => {
    output[slot] = slots[slot].reduce((acc, key) => {
      if (key) {
        if (classes && classes[key]) {
          acc.push(classes[key]);
        }
        acc.push(getUtilityClass(key));
      }
      return acc;
    }, []).join(" ");
  });
  return output;
}

// ../../node_modules/@material-ui/unstyled/generateUtilityClass/generateUtilityClass.js
var globalPseudoClassesMapping = {
  active: "Mui-active",
  checked: "Mui-checked",
  disabled: "Mui-disabled",
  error: "Mui-error",
  focused: "Mui-focused",
  focusVisible: "Mui-focusVisible",
  required: "Mui-required",
  expanded: "Mui-expanded",
  selected: "Mui-selected"
};
function generateUtilityClass(componentName, slot) {
  const globalPseudoClass = globalPseudoClassesMapping[slot];
  return globalPseudoClass || `${componentName}-${slot}`;
}

// ../../node_modules/@material-ui/unstyled/generateUtilityClasses/generateUtilityClasses.js
function generateUtilityClasses(componentName, slots) {
  const result = {};
  slots.forEach((slot) => {
    result[slot] = generateUtilityClass(componentName, slot);
  });
  return result;
}

// ../../node_modules/@material-ui/unstyled/SliderUnstyled/SliderUnstyled.js
var React12 = __toModule(require_react());
var import_prop_types4 = __toModule(require_prop_types());

// ../../node_modules/@material-ui/unstyled/SliderUnstyled/sliderUnstyledClasses.js
function getSliderUtilityClass(slot) {
  return generateUtilityClass("MuiSlider", slot);
}
var sliderUnstyledClasses = generateUtilityClasses("MuiSlider", ["root", "active", "focusVisible", "disabled", "marked", "vertical", "trackInverted", "trackFalse", "rail", "track", "mark", "markActive", "markLabel", "markLabelActive", "thumb", "valueLabel", "valueLabelOffset", "valueLabelOpen", "valueLabelCircle", "valueLabelLabel"]);
var sliderUnstyledClasses_default = sliderUnstyledClasses;

// ../../node_modules/@material-ui/unstyled/SliderUnstyled/SliderValueLabelUnstyled.js
var React11 = __toModule(require_react());
var import_prop_types3 = __toModule(require_prop_types());
var useValueLabelClasses = (props) => {
  const {
    open
  } = props;
  const utilityClasses = {
    offset: clsx_m_default(sliderUnstyledClasses_default.valueLabel, sliderUnstyledClasses_default.valueLabelOffset, open && sliderUnstyledClasses_default.valueLabelOpen),
    circle: sliderUnstyledClasses_default.valueLabelCircle,
    label: sliderUnstyledClasses_default.valueLabelLabel
  };
  return utilityClasses;
};
function SliderValueLabelUnstyled(props) {
  const {
    children,
    className,
    value,
    components = {},
    theme
  } = props;
  const classes = useValueLabelClasses(props);
  const Root = components.Root || "span";
  return /* @__PURE__ */ React11.cloneElement(children, {
    className: clsx_m_default(children.props.className)
  }, /* @__PURE__ */ React11.createElement(React11.Fragment, null, children.props.children, /* @__PURE__ */ React11.createElement(Root, {
    className: clsx_m_default(classes.offset, className),
    theme,
    "aria-hidden": true
  }, /* @__PURE__ */ React11.createElement("span", {
    className: classes.circle
  }, /* @__PURE__ */ React11.createElement("span", {
    className: classes.label
  }, value)))));
}
false ? SliderValueLabelUnstyled.propTypes = {
  children: import_prop_types3.default.element.isRequired,
  className: import_prop_types3.default.string,
  components: import_prop_types3.default.shape({
    Root: import_prop_types3.default.elementType
  }),
  theme: import_prop_types3.default.any,
  value: import_prop_types3.default.node
} : void 0;
var SliderValueLabelUnstyled_default = SliderValueLabelUnstyled;

// ../../node_modules/@material-ui/unstyled/SliderUnstyled/SliderUnstyled.js
function asc(a2, b) {
  return a2 - b;
}
function clamp(value, min, max) {
  if (value == null) {
    return min;
  }
  return Math.min(Math.max(min, value), max);
}
function findClosest(values3, currentValue) {
  const {
    index: closestIndex
  } = values3.reduce((acc, value, index) => {
    const distance = Math.abs(currentValue - value);
    if (acc === null || distance < acc.distance || distance === acc.distance) {
      return {
        distance,
        index
      };
    }
    return acc;
  }, null);
  return closestIndex;
}
function trackFinger(event, touchId) {
  if (touchId.current !== void 0 && event.changedTouches) {
    for (let i2 = 0; i2 < event.changedTouches.length; i2 += 1) {
      const touch = event.changedTouches[i2];
      if (touch.identifier === touchId.current) {
        return {
          x: touch.clientX,
          y: touch.clientY
        };
      }
    }
    return false;
  }
  return {
    x: event.clientX,
    y: event.clientY
  };
}
function valueToPercent(value, min, max) {
  return (value - min) * 100 / (max - min);
}
function percentToValue(percent2, min, max) {
  return (max - min) * percent2 + min;
}
function getDecimalPrecision(num) {
  if (Math.abs(num) < 1) {
    const parts = num.toExponential().split("e-");
    const matissaDecimalPart = parts[0].split(".")[1];
    return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
  }
  const decimalPart = num.toString().split(".")[1];
  return decimalPart ? decimalPart.length : 0;
}
function roundValueToStep(value, step, min) {
  const nearest = Math.round((value - min) / step) * step + min;
  return Number(nearest.toFixed(getDecimalPrecision(step)));
}
function setValueIndex({
  values: values3,
  source,
  newValue,
  index
}) {
  if (source[index] === newValue) {
    return source;
  }
  const output = values3.slice();
  output[index] = newValue;
  return output;
}
function focusThumb({
  sliderRef,
  activeIndex,
  setActive
}) {
  const doc = ownerDocument(sliderRef.current);
  if (!sliderRef.current.contains(doc.activeElement) || Number(doc.activeElement.getAttribute("data-index")) !== activeIndex) {
    sliderRef.current.querySelector(`[type="range"][data-index="${activeIndex}"]`).focus();
  }
  if (setActive) {
    setActive(activeIndex);
  }
}
var axisProps = {
  horizontal: {
    offset: (percent2) => ({
      left: `${percent2}%`
    }),
    leap: (percent2) => ({
      width: `${percent2}%`
    })
  },
  "horizontal-reverse": {
    offset: (percent2) => ({
      right: `${percent2}%`
    }),
    leap: (percent2) => ({
      width: `${percent2}%`
    })
  },
  vertical: {
    offset: (percent2) => ({
      bottom: `${percent2}%`
    }),
    leap: (percent2) => ({
      height: `${percent2}%`
    })
  }
};
var Identity = (x2) => x2;
var cachedSupportsTouchActionNone;
function doesSupportTouchActionNone() {
  if (cachedSupportsTouchActionNone === void 0) {
    const element = document.createElement("div");
    element.style.touchAction = "none";
    document.body.appendChild(element);
    cachedSupportsTouchActionNone = window.getComputedStyle(element).touchAction === "none";
    element.parentElement.removeChild(element);
  }
  return cachedSupportsTouchActionNone;
}
var useUtilityClasses = (styleProps) => {
  const {
    disabled,
    marked,
    orientation,
    track,
    classes
  } = styleProps;
  const slots = {
    root: ["root", disabled && "disabled", marked && "marked", orientation === "vertical" && "vertical", track === "inverted" && "trackInverted", track === false && "trackFalse"],
    rail: ["rail"],
    track: ["track"],
    mark: ["mark"],
    markActive: ["markActive"],
    markLabel: ["markLabel"],
    markLabelActive: ["markLabelActive"],
    valueLabel: ["valueLabel"],
    thumb: ["thumb", disabled && "disabled"],
    active: ["active"],
    disabled: ["disabled"],
    focusVisible: ["focusVisible"]
  };
  return composeClasses(slots, getSliderUtilityClass, classes);
};
var Forward = ({
  children
}) => children;
var SliderUnstyled = /* @__PURE__ */ React12.forwardRef(function SliderUnstyled2(props, ref) {
  const {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    "aria-valuetext": ariaValuetext,
    className,
    component: Component = "span",
    classes: classesProp = {},
    defaultValue,
    disabled = false,
    getAriaLabel,
    getAriaValueText,
    marks: marksProp = false,
    max = 100,
    min = 0,
    name,
    onChange,
    onChangeCommitted,
    onMouseDown,
    orientation = "horizontal",
    scale = Identity,
    step = 1,
    track = "normal",
    value: valueProp,
    valueLabelDisplay = "off",
    valueLabelFormat = Identity,
    isRtl = false,
    components = {},
    componentsProps = {},
    theme
  } = props, other = _objectWithoutPropertiesLoose(props, ["aria-label", "aria-labelledby", "aria-valuetext", "className", "component", "classes", "defaultValue", "disabled", "getAriaLabel", "getAriaValueText", "marks", "max", "min", "name", "onChange", "onChangeCommitted", "onMouseDown", "orientation", "scale", "step", "track", "value", "valueLabelDisplay", "valueLabelFormat", "isRtl", "components", "componentsProps", "theme"]);
  const touchId = React12.useRef();
  const [active, setActive] = React12.useState(-1);
  const [open, setOpen] = React12.useState(-1);
  const [valueDerived, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue !== null && defaultValue !== void 0 ? defaultValue : min,
    name: "Slider"
  });
  const handleChange = onChange && ((event, value) => {
    if (!(event instanceof Event))
      event.persist();
    Object.defineProperty(event, "target", {
      writable: true,
      value: {
        value,
        name
      }
    });
    onChange(event, value);
  });
  const range = Array.isArray(valueDerived);
  let values3 = range ? valueDerived.slice().sort(asc) : [valueDerived];
  values3 = values3.map((value) => clamp(value, min, max));
  const marks = marksProp === true && step !== null ? [...Array(Math.floor((max - min) / step) + 1)].map((_3, index) => ({
    value: min + step * index
  })) : marksProp || [];
  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React12.useState(-1);
  const sliderRef = React12.useRef();
  const handleFocusRef = useForkRef(focusVisibleRef, sliderRef);
  const handleRef = useForkRef(ref, handleFocusRef);
  const handleFocus = useEventCallback((event) => {
    const index = Number(event.currentTarget.getAttribute("data-index"));
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(index);
    }
    setOpen(index);
  });
  const handleBlur = useEventCallback((event) => {
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(-1);
    }
    setOpen(-1);
  });
  const handleMouseOver = useEventCallback((event) => {
    const index = Number(event.currentTarget.getAttribute("data-index"));
    setOpen(index);
  });
  const handleMouseLeave = useEventCallback(() => {
    setOpen(-1);
  });
  useEnhancedEffect_default(() => {
    if (disabled && sliderRef.current.contains(document.activeElement)) {
      document.activeElement.blur();
    }
  }, [disabled]);
  if (disabled && active !== -1) {
    setActive(-1);
  }
  if (disabled && focusVisible !== -1) {
    setFocusVisible(-1);
  }
  const handleHiddenInputChange = useEventCallback((event) => {
    const index = Number(event.currentTarget.getAttribute("data-index"));
    const value = values3[index];
    const marksValues = marks.map((mark) => mark.value);
    const marksIndex = marksValues.indexOf(value);
    let newValue = event.target.valueAsNumber;
    if (marks && step == null) {
      newValue = newValue < value ? marksValues[marksIndex - 1] : marksValues[marksIndex + 1];
    }
    newValue = clamp(newValue, min, max);
    if (marks && step == null) {
      const markValues = marks.map((mark) => mark.value);
      const currentMarkIndex = markValues.indexOf(values3[index]);
      newValue = newValue < values3[index] ? markValues[currentMarkIndex - 1] : markValues[currentMarkIndex + 1];
    }
    if (range) {
      const previousValue = newValue;
      newValue = setValueIndex({
        values: values3,
        source: valueDerived,
        newValue,
        index
      }).sort(asc);
      focusThumb({
        sliderRef,
        activeIndex: newValue.indexOf(previousValue)
      });
    }
    setValueState(newValue);
    setFocusVisible(index);
    if (handleChange) {
      handleChange(event, newValue);
    }
    if (onChangeCommitted) {
      onChangeCommitted(event, newValue);
    }
  });
  const previousIndex = React12.useRef();
  let axis = orientation;
  if (isRtl && orientation !== "vertical") {
    axis += "-reverse";
  }
  const getFingerNewValue = ({
    finger,
    move = false,
    values: values22,
    source
  }) => {
    const {
      current: slider
    } = sliderRef;
    const {
      width: width2,
      height: height2,
      bottom: bottom2,
      left: left2
    } = slider.getBoundingClientRect();
    let percent2;
    if (axis.indexOf("vertical") === 0) {
      percent2 = (bottom2 - finger.y) / height2;
    } else {
      percent2 = (finger.x - left2) / width2;
    }
    if (axis.indexOf("-reverse") !== -1) {
      percent2 = 1 - percent2;
    }
    let newValue;
    newValue = percentToValue(percent2, min, max);
    if (step) {
      newValue = roundValueToStep(newValue, step, min);
    } else {
      const marksValues = marks.map((mark) => mark.value);
      const closestIndex = findClosest(marksValues, newValue);
      newValue = marksValues[closestIndex];
    }
    newValue = clamp(newValue, min, max);
    let activeIndex = 0;
    if (range) {
      if (!move) {
        activeIndex = findClosest(values22, newValue);
      } else {
        activeIndex = previousIndex.current;
      }
      const previousValue = newValue;
      newValue = setValueIndex({
        values: values22,
        source,
        newValue,
        index: activeIndex
      }).sort(asc);
      activeIndex = newValue.indexOf(previousValue);
      previousIndex.current = activeIndex;
    }
    return {
      newValue,
      activeIndex
    };
  };
  const handleTouchMove = useEventCallback((nativeEvent) => {
    const finger = trackFinger(nativeEvent, touchId);
    if (!finger) {
      return;
    }
    if (nativeEvent.type === "mousemove" && nativeEvent.buttons === 0) {
      handleTouchEnd(nativeEvent);
      return;
    }
    const {
      newValue,
      activeIndex
    } = getFingerNewValue({
      finger,
      move: true,
      values: values3,
      source: valueDerived
    });
    focusThumb({
      sliderRef,
      activeIndex,
      setActive
    });
    setValueState(newValue);
    if (handleChange) {
      handleChange(nativeEvent, newValue);
    }
  });
  const handleTouchEnd = useEventCallback((nativeEvent) => {
    const finger = trackFinger(nativeEvent, touchId);
    if (!finger) {
      return;
    }
    const {
      newValue
    } = getFingerNewValue({
      finger,
      values: values3,
      source: valueDerived
    });
    setActive(-1);
    if (nativeEvent.type === "touchend") {
      setOpen(-1);
    }
    if (onChangeCommitted) {
      onChangeCommitted(nativeEvent, newValue);
    }
    touchId.current = void 0;
    stopListening();
  });
  const handleTouchStart = useEventCallback((event) => {
    if (!doesSupportTouchActionNone()) {
      event.preventDefault();
    }
    const touch = event.changedTouches[0];
    if (touch != null) {
      touchId.current = touch.identifier;
    }
    const finger = trackFinger(event, touchId);
    const {
      newValue,
      activeIndex
    } = getFingerNewValue({
      finger,
      values: values3,
      source: valueDerived
    });
    focusThumb({
      sliderRef,
      activeIndex,
      setActive
    });
    setValueState(newValue);
    if (handleChange) {
      handleChange(event, newValue);
    }
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener("touchmove", handleTouchMove);
    doc.addEventListener("touchend", handleTouchEnd);
  });
  const stopListening = React12.useCallback(() => {
    const doc = ownerDocument(sliderRef.current);
    doc.removeEventListener("mousemove", handleTouchMove);
    doc.removeEventListener("mouseup", handleTouchEnd);
    doc.removeEventListener("touchmove", handleTouchMove);
    doc.removeEventListener("touchend", handleTouchEnd);
  }, [handleTouchEnd, handleTouchMove]);
  React12.useEffect(() => {
    const {
      current: slider
    } = sliderRef;
    slider.addEventListener("touchstart", handleTouchStart, {
      passive: doesSupportTouchActionNone()
    });
    return () => {
      slider.removeEventListener("touchstart", handleTouchStart, {
        passive: doesSupportTouchActionNone()
      });
      stopListening();
    };
  }, [stopListening, handleTouchStart]);
  React12.useEffect(() => {
    if (disabled) {
      stopListening();
    }
  }, [disabled, stopListening]);
  const handleMouseDown = useEventCallback((event) => {
    if (onMouseDown) {
      onMouseDown(event);
    }
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    const finger = trackFinger(event, touchId);
    const {
      newValue,
      activeIndex
    } = getFingerNewValue({
      finger,
      values: values3,
      source: valueDerived
    });
    focusThumb({
      sliderRef,
      activeIndex,
      setActive
    });
    setValueState(newValue);
    if (handleChange) {
      handleChange(event, newValue);
    }
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener("mousemove", handleTouchMove);
    doc.addEventListener("mouseup", handleTouchEnd);
  });
  const trackOffset = valueToPercent(range ? values3[0] : min, min, max);
  const trackLeap = valueToPercent(values3[values3.length - 1], min, max) - trackOffset;
  const trackStyle = _extends({}, axisProps[axis].offset(trackOffset), axisProps[axis].leap(trackLeap));
  const Root = components.Root || "span";
  const rootProps = componentsProps.root || {};
  const Rail = components.Rail || "span";
  const railProps = componentsProps.rail || {};
  const Track = components.Track || "span";
  const trackProps = componentsProps.track || {};
  const Thumb = components.Thumb || "span";
  const thumbProps = componentsProps.thumb || {};
  const ValueLabel = components.ValueLabel || SliderValueLabelUnstyled_default;
  const valueLabelProps = componentsProps.valueLabel || {};
  const Mark = components.Mark || "span";
  const markProps = componentsProps.mark || {};
  const MarkLabel = components.MarkLabel || "span";
  const markLabelProps = componentsProps.markLabel || {};
  const styleProps = _extends({}, props, {
    classes: {},
    disabled,
    max,
    min,
    orientation,
    scale,
    step,
    track,
    valueLabelDisplay,
    valueLabelFormat,
    isRtl,
    marked: marks.length > 0 && marks.some((mark) => mark.label)
  });
  const utilityClasses = useUtilityClasses(_extends({}, styleProps, {
    classes: classesProp
  }));
  return /* @__PURE__ */ React12.createElement(Root, _extends({
    ref: handleRef,
    onMouseDown: handleMouseDown
  }, rootProps, !isHostComponent_default(Root) && {
    as: Component,
    styleProps: _extends({}, styleProps, rootProps.styleProps),
    theme
  }, other, {
    className: clsx_m_default(utilityClasses.root, rootProps.className, className)
  }), /* @__PURE__ */ React12.createElement(Rail, _extends({}, railProps, !isHostComponent_default(Rail) && {
    styleProps: _extends({}, styleProps, railProps.styleProps),
    theme
  }, {
    className: clsx_m_default(utilityClasses.rail, railProps.className)
  })), /* @__PURE__ */ React12.createElement(Track, _extends({}, trackProps, !isHostComponent_default(Track) && {
    styleProps: _extends({}, styleProps, trackProps.styleProps),
    theme
  }, {
    className: clsx_m_default(utilityClasses.track, trackProps.className),
    style: _extends({}, trackStyle, trackProps.style)
  })), marks.map((mark, index) => {
    const percent2 = valueToPercent(mark.value, min, max);
    const style3 = axisProps[axis].offset(percent2);
    let markActive;
    if (track === false) {
      markActive = values3.indexOf(mark.value) !== -1;
    } else {
      markActive = track === "normal" && (range ? mark.value >= values3[0] && mark.value <= values3[values3.length - 1] : mark.value <= values3[0]) || track === "inverted" && (range ? mark.value <= values3[0] || mark.value >= values3[values3.length - 1] : mark.value >= values3[0]);
    }
    return /* @__PURE__ */ React12.createElement(React12.Fragment, {
      key: mark.value
    }, /* @__PURE__ */ React12.createElement(Mark, _extends({
      "data-index": index
    }, markProps, !isHostComponent_default(Mark) && {
      styleProps: _extends({}, styleProps, markProps.styleProps, {
        markActive
      }),
      theme
    }, {
      style: _extends({}, style3, markProps.style),
      className: clsx_m_default(utilityClasses.mark, markProps.className, markActive && utilityClasses.markActive)
    })), mark.label != null ? /* @__PURE__ */ React12.createElement(MarkLabel, _extends({
      "aria-hidden": true,
      "data-index": index
    }, markLabelProps, !isHostComponent_default(MarkLabel) && {
      styleProps: _extends({}, styleProps, markLabelProps.styleProps, {
        markLabelActive: markActive
      }),
      theme
    }, {
      style: _extends({}, style3, markLabelProps.style),
      className: clsx_m_default(utilityClasses.markLabel, markLabelProps.className, markActive && utilityClasses.markLabelActive)
    }), mark.label) : null);
  }), values3.map((value, index) => {
    const percent2 = valueToPercent(value, min, max);
    const style3 = axisProps[axis].offset(percent2);
    const ValueLabelComponent = valueLabelDisplay === "off" ? Forward : ValueLabel;
    return /* @__PURE__ */ React12.createElement(React12.Fragment, {
      key: index
    }, /* @__PURE__ */ React12.createElement(ValueLabelComponent, _extends({
      valueLabelFormat,
      valueLabelDisplay,
      value: typeof valueLabelFormat === "function" ? valueLabelFormat(scale(value), index) : valueLabelFormat,
      index,
      open: open === index || active === index || valueLabelDisplay === "on",
      disabled
    }, valueLabelProps, {
      className: clsx_m_default(utilityClasses.valueLabel, valueLabelProps.className)
    }, !isHostComponent_default(ValueLabel) && {
      styleProps: _extends({}, styleProps, valueLabelProps.styleProps),
      theme
    }), /* @__PURE__ */ React12.createElement(Thumb, _extends({
      "data-index": index,
      onMouseOver: handleMouseOver,
      onMouseLeave: handleMouseLeave
    }, thumbProps, {
      className: clsx_m_default(utilityClasses.thumb, thumbProps.className, active === index && utilityClasses["active"], focusVisible === index && utilityClasses["focusVisible"])
    }, !isHostComponent_default(Thumb) && {
      styleProps: _extends({}, styleProps, thumbProps.styleProps),
      theme
    }, {
      style: _extends({}, style3, thumbProps.style)
    }), /* @__PURE__ */ React12.createElement("input", {
      "data-index": index,
      "aria-label": getAriaLabel ? getAriaLabel(index) : ariaLabel,
      "aria-labelledby": ariaLabelledby,
      "aria-orientation": orientation,
      "aria-valuemax": scale(max),
      "aria-valuemin": scale(min),
      "aria-valuenow": scale(value),
      "aria-valuetext": getAriaValueText ? getAriaValueText(scale(value), index) : ariaValuetext,
      onFocus: handleFocus,
      onBlur: handleBlur,
      name,
      type: "range",
      min: props.min,
      max: props.max,
      step: props.step,
      disabled,
      value: values3[index],
      onChange: handleHiddenInputChange,
      style: _extends({}, visuallyHidden_default, {
        direction: isRtl ? "rtl" : "ltr",
        width: "100%",
        height: "100%"
      })
    }))));
  }));
});
false ? SliderUnstyled.propTypes = {
  "aria-label": chainPropTypes(import_prop_types4.default.string, (props) => {
    const range = Array.isArray(props.value || props.defaultValue);
    if (range && props["aria-label"] != null) {
      return new Error("Material-UI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.");
    }
    return null;
  }),
  "aria-labelledby": import_prop_types4.default.string,
  "aria-valuetext": chainPropTypes(import_prop_types4.default.string, (props) => {
    const range = Array.isArray(props.value || props.defaultValue);
    if (range && props["aria-valuetext"] != null) {
      return new Error("Material-UI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.");
    }
    return null;
  }),
  children: import_prop_types4.default.node,
  classes: import_prop_types4.default.object,
  className: import_prop_types4.default.string,
  component: import_prop_types4.default.elementType,
  components: import_prop_types4.default.shape({
    Mark: import_prop_types4.default.elementType,
    MarkLabel: import_prop_types4.default.elementType,
    Rail: import_prop_types4.default.elementType,
    Root: import_prop_types4.default.elementType,
    Thumb: import_prop_types4.default.elementType,
    Track: import_prop_types4.default.elementType,
    ValueLabel: import_prop_types4.default.elementType
  }),
  componentsProps: import_prop_types4.default.object,
  defaultValue: import_prop_types4.default.oneOfType([import_prop_types4.default.arrayOf(import_prop_types4.default.number), import_prop_types4.default.number]),
  disabled: import_prop_types4.default.bool,
  getAriaLabel: import_prop_types4.default.func,
  getAriaValueText: import_prop_types4.default.func,
  isRtl: import_prop_types4.default.bool,
  marks: import_prop_types4.default.oneOfType([import_prop_types4.default.arrayOf(import_prop_types4.default.shape({
    label: import_prop_types4.default.node,
    value: import_prop_types4.default.number.isRequired
  })), import_prop_types4.default.bool]),
  max: import_prop_types4.default.number,
  min: import_prop_types4.default.number,
  name: import_prop_types4.default.string,
  onChange: import_prop_types4.default.func,
  onChangeCommitted: import_prop_types4.default.func,
  onMouseDown: import_prop_types4.default.func,
  orientation: import_prop_types4.default.oneOf(["horizontal", "vertical"]),
  scale: import_prop_types4.default.func,
  step: import_prop_types4.default.number,
  track: import_prop_types4.default.oneOf(["inverted", "normal", false]),
  value: import_prop_types4.default.oneOfType([import_prop_types4.default.arrayOf(import_prop_types4.default.number), import_prop_types4.default.number]),
  valueLabelDisplay: import_prop_types4.default.oneOf(["auto", "off", "on"]),
  valueLabelFormat: import_prop_types4.default.oneOfType([import_prop_types4.default.func, import_prop_types4.default.string])
} : void 0;
var SliderUnstyled_default = SliderUnstyled;

// ../../node_modules/@material-ui/core/styles/createBreakpoints.js
function createBreakpoints(breakpoints) {
  const {
    values: values3 = {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    },
    unit = "px",
    step = 5
  } = breakpoints, other = _objectWithoutPropertiesLoose(breakpoints, ["values", "unit", "step"]);
  const keys = Object.keys(values3);
  function up(key) {
    const value = typeof values3[key] === "number" ? values3[key] : key;
    return `@media (min-width:${value}${unit})`;
  }
  function down(key) {
    const value = typeof values3[key] === "number" ? values3[key] : key;
    return `@media (max-width:${value - step / 100}${unit})`;
  }
  function between(start, end) {
    const endIndex = keys.indexOf(end);
    return `@media (min-width:${typeof values3[start] === "number" ? values3[start] : start}${unit}) and (max-width:${(endIndex !== -1 && typeof values3[keys[endIndex]] === "number" ? values3[keys[endIndex]] : end) - step / 100}${unit})`;
  }
  function only(key) {
    if (keys.indexOf(key) + 1 < keys.length) {
      return between(key, keys[keys.indexOf(key) + 1]);
    }
    return up(key);
  }
  function width2(key) {
    return values3[key];
  }
  return _extends({
    keys,
    values: values3,
    up,
    down,
    between,
    only,
    width: width2,
    unit
  }, other);
}

// ../../node_modules/@material-ui/core/styles/createMixins.js
function createMixins(breakpoints, spacing2, mixins) {
  return _extends({
    toolbar: {
      minHeight: 56,
      [`${breakpoints.up("xs")} and (orientation: landscape)`]: {
        minHeight: 48
      },
      [breakpoints.up("sm")]: {
        minHeight: 64
      }
    }
  }, mixins);
}

// ../../node_modules/@material-ui/core/colors/common.js
var common = {
  black: "#000",
  white: "#fff"
};
var common_default = common;

// ../../node_modules/@material-ui/core/colors/grey.js
var grey = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#d5d5d5",
  A200: "#aaaaaa",
  A400: "#303030",
  A700: "#616161"
};
var grey_default = grey;

// ../../node_modules/@material-ui/core/colors/indigo.js
var indigo = {
  50: "#e8eaf6",
  100: "#c5cae9",
  200: "#9fa8da",
  300: "#7986cb",
  400: "#5c6bc0",
  500: "#3f51b5",
  600: "#3949ab",
  700: "#303f9f",
  800: "#283593",
  900: "#1a237e",
  A100: "#8c9eff",
  A200: "#536dfe",
  A400: "#3d5afe",
  A700: "#304ffe"
};
var indigo_default = indigo;

// ../../node_modules/@material-ui/core/colors/pink.js
var pink = {
  50: "#fce4ec",
  100: "#f8bbd0",
  200: "#f48fb1",
  300: "#f06292",
  400: "#ec407a",
  500: "#e91e63",
  600: "#d81b60",
  700: "#c2185b",
  800: "#ad1457",
  900: "#880e4f",
  A100: "#ff80ab",
  A200: "#ff4081",
  A400: "#f50057",
  A700: "#c51162"
};
var pink_default = pink;

// ../../node_modules/@material-ui/core/colors/red.js
var red = {
  50: "#ffebee",
  100: "#ffcdd2",
  200: "#ef9a9a",
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  600: "#e53935",
  700: "#d32f2f",
  800: "#c62828",
  900: "#b71c1c",
  A100: "#ff8a80",
  A200: "#ff5252",
  A400: "#ff1744",
  A700: "#d50000"
};
var red_default = red;

// ../../node_modules/@material-ui/core/colors/orange.js
var orange = {
  50: "#fff3e0",
  100: "#ffe0b2",
  200: "#ffcc80",
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  600: "#fb8c00",
  700: "#f57c00",
  800: "#ef6c00",
  900: "#e65100",
  A100: "#ffd180",
  A200: "#ffab40",
  A400: "#ff9100",
  A700: "#ff6d00"
};
var orange_default = orange;

// ../../node_modules/@material-ui/core/colors/blue.js
var blue = {
  50: "#e3f2fd",
  100: "#bbdefb",
  200: "#90caf9",
  300: "#64b5f6",
  400: "#42a5f5",
  500: "#2196f3",
  600: "#1e88e5",
  700: "#1976d2",
  800: "#1565c0",
  900: "#0d47a1",
  A100: "#82b1ff",
  A200: "#448aff",
  A400: "#2979ff",
  A700: "#2962ff"
};
var blue_default = blue;

// ../../node_modules/@material-ui/core/colors/green.js
var green = {
  50: "#e8f5e9",
  100: "#c8e6c9",
  200: "#a5d6a7",
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  600: "#43a047",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20",
  A100: "#b9f6ca",
  A200: "#69f0ae",
  A400: "#00e676",
  A700: "#00c853"
};
var green_default = green;

// ../../node_modules/@material-ui/core/styles/colorManipulator.js
function clamp2(value, min = 0, max = 1) {
  if (false) {
    if (value < min || value > max) {
      console.error(`Material-UI: The value provided ${value} is out of range [${min}, ${max}].`);
    }
  }
  return Math.min(Math.max(min, value), max);
}
function hexToRgb(color2) {
  color2 = color2.substr(1);
  const re2 = new RegExp(`.{1,${color2.length >= 6 ? 2 : 1}}`, "g");
  let colors = color2.match(re2);
  if (colors && colors[0].length === 1) {
    colors = colors.map((n2) => n2 + n2);
  }
  return colors ? `rgb${colors.length === 4 ? "a" : ""}(${colors.map((n2, index) => {
    return index < 3 ? parseInt(n2, 16) : Math.round(parseInt(n2, 16) / 255 * 1e3) / 1e3;
  }).join(", ")})` : "";
}
function hslToRgb(color2) {
  color2 = decomposeColor(color2);
  const {
    values: values3
  } = color2;
  const h = values3[0];
  const s = values3[1] / 100;
  const l = values3[2] / 100;
  const a2 = s * Math.min(l, 1 - l);
  const f = (n2, k2 = (n2 + h / 30) % 12) => l - a2 * Math.max(Math.min(k2 - 3, 9 - k2, 1), -1);
  let type = "rgb";
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
  if (color2.type === "hsla") {
    type += "a";
    rgb.push(values3[3]);
  }
  return recomposeColor({
    type,
    values: rgb
  });
}
function decomposeColor(color2) {
  if (color2.type) {
    return color2;
  }
  if (color2.charAt(0) === "#") {
    return decomposeColor(hexToRgb(color2));
  }
  const marker = color2.indexOf("(");
  const type = color2.substring(0, marker);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(type) === -1) {
    throw new Error(false ? `Material-UI: Unsupported \`${color2}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : formatMuiErrorMessage(9, color2));
  }
  let values3 = color2.substring(marker + 1, color2.length - 1);
  let colorSpace;
  if (type === "color") {
    values3 = values3.split(" ");
    colorSpace = values3.shift();
    if (values3.length === 4 && values3[3].charAt(0) === "/") {
      values3[3] = values3[3].substr(1);
    }
    if (["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(colorSpace) === -1) {
      throw new Error(false ? `Material-UI: unsupported \`${colorSpace}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : formatMuiErrorMessage(10, colorSpace));
    }
  } else {
    values3 = values3.split(",");
  }
  values3 = values3.map((value) => parseFloat(value));
  return {
    type,
    values: values3,
    colorSpace
  };
}
function recomposeColor(color2) {
  const {
    type,
    colorSpace
  } = color2;
  let {
    values: values3
  } = color2;
  if (type.indexOf("rgb") !== -1) {
    values3 = values3.map((n2, i2) => i2 < 3 ? parseInt(n2, 10) : n2);
  } else if (type.indexOf("hsl") !== -1) {
    values3[1] = `${values3[1]}%`;
    values3[2] = `${values3[2]}%`;
  }
  if (type.indexOf("color") !== -1) {
    values3 = `${colorSpace} ${values3.join(" ")}`;
  } else {
    values3 = `${values3.join(", ")}`;
  }
  return `${type}(${values3})`;
}
function getContrastRatio(foreground, background) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
function getLuminance(color2) {
  color2 = decomposeColor(color2);
  let rgb = color2.type === "hsl" ? decomposeColor(hslToRgb(color2)).values : color2.values;
  rgb = rgb.map((val) => {
    if (color2.type !== "color") {
      val /= 255;
    }
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });
  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
}
function alpha(color2, value) {
  color2 = decomposeColor(color2);
  value = clamp2(value);
  if (color2.type === "rgb" || color2.type === "hsl") {
    color2.type += "a";
  }
  if (color2.type === "color") {
    color2.values[3] = `/${value}`;
  } else {
    color2.values[3] = value;
  }
  return recomposeColor(color2);
}
function darken(color2, coefficient) {
  color2 = decomposeColor(color2);
  coefficient = clamp2(coefficient);
  if (color2.type.indexOf("hsl") !== -1) {
    color2.values[2] *= 1 - coefficient;
  } else if (color2.type.indexOf("rgb") !== -1 || color2.type.indexOf("color") !== -1) {
    for (let i2 = 0; i2 < 3; i2 += 1) {
      color2.values[i2] *= 1 - coefficient;
    }
  }
  return recomposeColor(color2);
}
function lighten(color2, coefficient) {
  color2 = decomposeColor(color2);
  coefficient = clamp2(coefficient);
  if (color2.type.indexOf("hsl") !== -1) {
    color2.values[2] += (100 - color2.values[2]) * coefficient;
  } else if (color2.type.indexOf("rgb") !== -1) {
    for (let i2 = 0; i2 < 3; i2 += 1) {
      color2.values[i2] += (255 - color2.values[i2]) * coefficient;
    }
  } else if (color2.type.indexOf("color") !== -1) {
    for (let i2 = 0; i2 < 3; i2 += 1) {
      color2.values[i2] += (1 - color2.values[i2]) * coefficient;
    }
  }
  return recomposeColor(color2);
}

// ../../node_modules/@material-ui/core/styles/createPalette.js
var light = {
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.54)",
    disabled: "rgba(0, 0, 0, 0.38)"
  },
  divider: "rgba(0, 0, 0, 0.12)",
  background: {
    paper: common_default.white,
    default: grey_default[50]
  },
  action: {
    active: "rgba(0, 0, 0, 0.54)",
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  }
};
var dark = {
  text: {
    primary: common_default.white,
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
    icon: "rgba(255, 255, 255, 0.5)"
  },
  divider: "rgba(255, 255, 255, 0.12)",
  background: {
    paper: grey_default[800],
    default: "#303030"
  },
  action: {
    active: common_default.white,
    hover: "rgba(255, 255, 255, 0.08)",
    hoverOpacity: 0.08,
    selected: "rgba(255, 255, 255, 0.16)",
    selectedOpacity: 0.16,
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(255, 255, 255, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  }
};
function addLightOrDark(intent, direction, shade, tonalOffset) {
  const tonalOffsetLight = tonalOffset.light || tonalOffset;
  const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === "light") {
      intent.light = lighten(intent.main, tonalOffsetLight);
    } else if (direction === "dark") {
      intent.dark = darken(intent.main, tonalOffsetDark);
    }
  }
}
function createPalette(palette2) {
  const {
    primary = {
      light: indigo_default[300],
      main: indigo_default[500],
      dark: indigo_default[700]
    },
    secondary = {
      light: pink_default.A200,
      main: pink_default.A400,
      dark: pink_default.A700
    },
    error = {
      light: red_default[300],
      main: red_default[500],
      dark: red_default[700]
    },
    warning = {
      light: orange_default[300],
      main: orange_default[500],
      dark: orange_default[700]
    },
    info = {
      light: blue_default[300],
      main: blue_default[500],
      dark: blue_default[700]
    },
    success = {
      light: green_default[300],
      main: green_default[500],
      dark: green_default[700]
    },
    mode = "light",
    contrastThreshold = 3,
    tonalOffset = 0.2
  } = palette2, other = _objectWithoutPropertiesLoose(palette2, ["primary", "secondary", "error", "warning", "info", "success", "mode", "contrastThreshold", "tonalOffset"]);
  function getContrastText(background) {
    const contrastText = getContrastRatio(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;
    if (false) {
      const contrast = getContrastRatio(background, contrastText);
      if (contrast < 3) {
        console.error([`Material-UI: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join("\n"));
      }
    }
    return contrastText;
  }
  const augmentColor = ({
    color: color2,
    name,
    mainShade = 500,
    lightShade = 300,
    darkShade = 700
  }) => {
    color2 = _extends({}, color2);
    if (!color2.main && color2[mainShade]) {
      color2.main = color2[mainShade];
    }
    if (!color2.hasOwnProperty("main")) {
      throw new Error(false ? `Material-UI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${mainShade}\` property.` : formatMuiErrorMessage(11, name ? ` (${name})` : "", mainShade));
    }
    if (typeof color2.main !== "string") {
      throw new Error(false ? `Material-UI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(color2.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@material-ui/core/colors";

const theme1 = createMuiTheme({ palette: {
  primary: green,
} });

const theme2 = createMuiTheme({ palette: {
  primary: { main: green[500] },
} });` : formatMuiErrorMessage(12, name ? ` (${name})` : "", JSON.stringify(color2.main)));
    }
    addLightOrDark(color2, "light", lightShade, tonalOffset);
    addLightOrDark(color2, "dark", darkShade, tonalOffset);
    if (!color2.contrastText) {
      color2.contrastText = getContrastText(color2.main);
    }
    return color2;
  };
  const modes = {
    dark,
    light
  };
  if (false) {
    if (!modes[mode]) {
      console.error(`Material-UI: The palette mode \`${mode}\` is not supported.`);
    }
  }
  const paletteOutput = deepmerge(_extends({
    common: common_default,
    mode,
    primary: augmentColor({
      color: primary,
      name: "primary"
    }),
    secondary: augmentColor({
      color: secondary,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    error: augmentColor({
      color: error,
      name: "error"
    }),
    warning: augmentColor({
      color: warning,
      name: "warning"
    }),
    info: augmentColor({
      color: info,
      name: "info"
    }),
    success: augmentColor({
      color: success,
      name: "succes"
    }),
    grey: grey_default,
    contrastThreshold,
    getContrastText,
    augmentColor,
    tonalOffset
  }, modes[mode]), other);
  return paletteOutput;
}

// ../../node_modules/@material-ui/core/styles/createTypography.js
function round(value) {
  return Math.round(value * 1e5) / 1e5;
}
var caseAllCaps = {
  textTransform: "uppercase"
};
var defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';
function createTypography(palette2, typography2) {
  const _ref = typeof typography2 === "function" ? typography2(palette2) : typography2, {
    fontFamily: fontFamily2 = defaultFontFamily,
    fontSize: fontSize2 = 14,
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 700,
    htmlFontSize = 16,
    allVariants,
    pxToRem: pxToRem2
  } = _ref, other = _objectWithoutPropertiesLoose(_ref, ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"]);
  if (false) {
    if (typeof fontSize2 !== "number") {
      console.error("Material-UI: `fontSize` is required to be a number.");
    }
    if (typeof htmlFontSize !== "number") {
      console.error("Material-UI: `htmlFontSize` is required to be a number.");
    }
  }
  const coef = fontSize2 / 14;
  const pxToRem = pxToRem2 || ((size) => `${size / htmlFontSize * coef}rem`);
  const buildVariant = (fontWeight2, size, lineHeight2, letterSpacing2, casing) => _extends({
    fontFamily: fontFamily2,
    fontWeight: fontWeight2,
    fontSize: pxToRem(size),
    lineHeight: lineHeight2
  }, fontFamily2 === defaultFontFamily ? {
    letterSpacing: `${round(letterSpacing2 / size)}em`
  } : {}, casing, allVariants);
  const variants = {
    h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
    body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
    button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
    caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps)
  };
  return deepmerge(_extends({
    htmlFontSize,
    pxToRem,
    round,
    fontFamily: fontFamily2,
    fontSize: fontSize2,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold
  }, variants), other, {
    clone: false
  });
}

// ../../node_modules/@material-ui/core/styles/shadows.js
var shadowKeyUmbraOpacity = 0.2;
var shadowKeyPenumbraOpacity = 0.14;
var shadowAmbientShadowOpacity = 0.12;
function createShadow(...px2) {
  return [`${px2[0]}px ${px2[1]}px ${px2[2]}px ${px2[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`, `${px2[4]}px ${px2[5]}px ${px2[6]}px ${px2[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`, `${px2[8]}px ${px2[9]}px ${px2[10]}px ${px2[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`].join(",");
}
var shadows = ["none", createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)];
var shadows_default = shadows;

// ../../node_modules/@material-ui/core/styles/shape.js
var shape = {
  borderRadius: 4
};
var shape_default = shape;

// ../../node_modules/@material-ui/system/esm/breakpoints.js
var import_prop_types5 = __toModule(require_prop_types());

// ../../node_modules/@material-ui/system/esm/merge.js
function merge(acc, item) {
  if (!item) {
    return acc;
  }
  return deepmerge(acc, item, {
    clone: false
  });
}
var merge_default = merge;

// ../../node_modules/@material-ui/system/esm/breakpoints.js
var values = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
};
var defaultBreakpoints = {
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (key) => `@media (min-width:${values[key]}px)`
};
function handleBreakpoints(props, propValue, styleFromPropValue) {
  if (false) {
    if (!props.theme) {
      console.error("Material-UI: You are calling a style function without a theme value.");
    }
  }
  if (Array.isArray(propValue)) {
    const themeBreakpoints = props.theme.breakpoints || defaultBreakpoints;
    return propValue.reduce((acc, item, index) => {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }
  if (typeof propValue === "object") {
    const themeBreakpoints = props.theme.breakpoints || defaultBreakpoints;
    return Object.keys(propValue).reduce((acc, breakpoint) => {
      if (Object.keys(themeBreakpoints.values || values).indexOf(breakpoint) !== -1) {
        acc[themeBreakpoints.up(breakpoint)] = styleFromPropValue(propValue[breakpoint]);
      } else {
        const cssKey = breakpoint;
        acc[cssKey] = propValue[cssKey];
      }
      return acc;
    }, {});
  }
  const output = styleFromPropValue(propValue);
  return output;
}
function createEmptyBreakpointObject(breakpointsInput = {}) {
  var _breakpointsInput$key;
  const breakpointsInOrder = breakpointsInput === null || breakpointsInput === void 0 ? void 0 : (_breakpointsInput$key = breakpointsInput.keys) === null || _breakpointsInput$key === void 0 ? void 0 : _breakpointsInput$key.reduce((acc, key) => {
    const breakpointStyleKey = breakpointsInput.up(key);
    acc[breakpointStyleKey] = {};
    return acc;
  }, {});
  return breakpointsInOrder || {};
}
function removeUnusedBreakpoints(breakpointKeys, style3) {
  return breakpointKeys.reduce((acc, key) => {
    const breakpointOutput = acc[key];
    const isBreakpointUnused = Object.keys(breakpointOutput).length === 0;
    if (isBreakpointUnused) {
      delete acc[key];
    }
    return acc;
  }, style3);
}

// ../../node_modules/@material-ui/system/esm/style.js
function getPath(obj, path) {
  if (!path || typeof path !== "string") {
    return null;
  }
  return path.split(".").reduce((acc, item) => acc && acc[item] ? acc[item] : null, obj);
}
function getValue(themeMapping, transform3, propValueFinal, userValue = propValueFinal) {
  let value;
  if (typeof themeMapping === "function") {
    value = themeMapping(propValueFinal);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[propValueFinal] || userValue;
  } else {
    value = getPath(themeMapping, propValueFinal) || userValue;
  }
  if (transform3) {
    value = transform3(value);
  }
  return value;
}
function style(options) {
  const {
    prop,
    cssProperty = options.prop,
    themeKey,
    transform: transform3
  } = options;
  const fn = (props) => {
    if (props[prop] == null) {
      return null;
    }
    const propValue = props[prop];
    const theme = props.theme;
    const themeMapping = getPath(theme, themeKey) || {};
    const styleFromPropValue = (propValueFinal) => {
      let value = getValue(themeMapping, transform3, propValueFinal);
      if (propValueFinal === value && typeof propValueFinal === "string") {
        value = getValue(themeMapping, transform3, `${prop}${propValueFinal === "default" ? "" : capitalize(propValueFinal)}`, propValueFinal);
      }
      if (cssProperty === false) {
        return value;
      }
      return {
        [cssProperty]: value
      };
    };
    return handleBreakpoints(props, propValue, styleFromPropValue);
  };
  fn.propTypes = false ? {
    [prop]: responsivePropType_default
  } : {};
  fn.filterProps = [prop];
  return fn;
}
var style_default = style;

// ../../node_modules/@material-ui/system/esm/compose.js
function compose(...styles4) {
  const handlers = styles4.reduce((acc, style3) => {
    style3.filterProps.forEach((prop) => {
      acc[prop] = style3;
    });
    return acc;
  }, {});
  const fn = (props) => {
    return Object.keys(props).reduce((acc, prop) => {
      if (handlers[prop]) {
        return merge_default(acc, handlers[prop](props));
      }
      return acc;
    }, {});
  };
  fn.propTypes = false ? styles4.reduce((acc, style3) => Object.assign(acc, style3.propTypes), {}) : {};
  fn.filterProps = styles4.reduce((acc, style3) => acc.concat(style3.filterProps), []);
  return fn;
}
var compose_default = compose;

// ../../node_modules/@material-ui/system/esm/memoize.js
function memoize3(fn) {
  const cache3 = {};
  return (arg) => {
    if (cache3[arg] === void 0) {
      cache3[arg] = fn(arg);
    }
    return cache3[arg];
  };
}

// ../../node_modules/@material-ui/system/esm/spacing.js
var properties = {
  m: "margin",
  p: "padding"
};
var directions = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
};
var aliases = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
};
var getCssProperties = memoize3((prop) => {
  if (prop.length > 2) {
    if (aliases[prop]) {
      prop = aliases[prop];
    } else {
      return [prop];
    }
  }
  const [a2, b] = prop.split("");
  const property = properties[a2];
  const direction = directions[b] || "";
  return Array.isArray(direction) ? direction.map((dir) => property + dir) : [property + direction];
});
var marginKeys = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY"];
var paddingKeys = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY"];
var spacingKeys = [...marginKeys, ...paddingKeys];
function createUnaryUnit(theme, themeKey, defaultValue, propName) {
  const themeSpacing = getPath(theme, themeKey) || defaultValue;
  if (typeof themeSpacing === "number") {
    return (abs) => {
      if (typeof abs === "string") {
        return abs;
      }
      if (false) {
        if (typeof abs !== "number") {
          console.error(`Material-UI: Expected ${propName} argument to be a number or a string, got ${abs}.`);
        }
      }
      return themeSpacing * abs;
    };
  }
  if (Array.isArray(themeSpacing)) {
    return (abs) => {
      if (typeof abs === "string") {
        return abs;
      }
      if (false) {
        if (!Number.isInteger(abs)) {
          console.error([`Material-UI: The \`theme.${themeKey}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${themeKey}\` as a number.`].join("\n"));
        } else if (abs > themeSpacing.length - 1) {
          console.error([`Material-UI: The value provided (${abs}) overflows.`, `The supported values are: ${JSON.stringify(themeSpacing)}.`, `${abs} > ${themeSpacing.length - 1}, you need to add the missing values.`].join("\n"));
        }
      }
      return themeSpacing[abs];
    };
  }
  if (typeof themeSpacing === "function") {
    return themeSpacing;
  }
  if (false) {
    console.error([`Material-UI: The \`theme.${themeKey}\` value (${themeSpacing}) is invalid.`, "It should be a number, an array or a function."].join("\n"));
  }
  return () => void 0;
}
function createUnarySpacing(theme) {
  return createUnaryUnit(theme, "spacing", 8, "spacing");
}
function getValue2(transformer, propValue) {
  if (typeof propValue === "string" || propValue == null) {
    return propValue;
  }
  const abs = Math.abs(propValue);
  const transformed = transformer(abs);
  if (propValue >= 0) {
    return transformed;
  }
  if (typeof transformed === "number") {
    return -transformed;
  }
  return `-${transformed}`;
}
function getStyleFromPropValue(cssProperties, transformer) {
  return (propValue) => cssProperties.reduce((acc, cssProperty) => {
    acc[cssProperty] = getValue2(transformer, propValue);
    return acc;
  }, {});
}
function resolveCssProperty(props, keys, prop, transformer) {
  if (keys.indexOf(prop) === -1) {
    return null;
  }
  const cssProperties = getCssProperties(prop);
  const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);
  const propValue = props[prop];
  return handleBreakpoints(props, propValue, styleFromPropValue);
}
function style2(props, keys) {
  const transformer = createUnarySpacing(props.theme);
  return Object.keys(props).map((prop) => resolveCssProperty(props, keys, prop, transformer)).reduce(merge_default, {});
}
function margin(props) {
  return style2(props, marginKeys);
}
margin.propTypes = false ? marginKeys.reduce((obj, key) => {
  obj[key] = responsivePropType_default;
  return obj;
}, {}) : {};
margin.filterProps = marginKeys;
function padding(props) {
  return style2(props, paddingKeys);
}
padding.propTypes = false ? paddingKeys.reduce((obj, key) => {
  obj[key] = responsivePropType_default;
  return obj;
}, {}) : {};
padding.filterProps = paddingKeys;
function spacing(props) {
  return style2(props, spacingKeys);
}
spacing.propTypes = false ? spacingKeys.reduce((obj, key) => {
  obj[key] = responsivePropType_default;
  return obj;
}, {}) : {};
spacing.filterProps = spacingKeys;
var spacing_default = spacing;

// ../../node_modules/@material-ui/system/esm/borders.js
function getBorder(value) {
  if (typeof value !== "number") {
    return value;
  }
  return `${value}px solid`;
}
var border = style_default({
  prop: "border",
  themeKey: "borders",
  transform: getBorder
});
var borderTop = style_default({
  prop: "borderTop",
  themeKey: "borders",
  transform: getBorder
});
var borderRight = style_default({
  prop: "borderRight",
  themeKey: "borders",
  transform: getBorder
});
var borderBottom = style_default({
  prop: "borderBottom",
  themeKey: "borders",
  transform: getBorder
});
var borderLeft = style_default({
  prop: "borderLeft",
  themeKey: "borders",
  transform: getBorder
});
var borderColor = style_default({
  prop: "borderColor",
  themeKey: "palette"
});
function resolveCssProperty2(props, prop, transformer) {
  if (prop !== "borderRadius") {
    return null;
  }
  const cssProperties = ["borderRadius"];
  const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);
  const propValue = props[prop];
  return handleBreakpoints(props, propValue, styleFromPropValue);
}
var borderRadius = (props) => {
  const transformer = createUnaryUnit(props.theme, "shape.borderRadius", 4, "borderRadius");
  return props.borderRadius ? resolveCssProperty2(props, "borderRadius", transformer) : {};
};
borderRadius.propTypes = false ? {
  borderRadius: responsivePropType_default
} : {};
borderRadius.filterProps = ["borderRadius"];
var borders = compose_default(border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderRadius);
var borders_default = borders;

// ../../node_modules/@material-ui/system/esm/display.js
var displayPrint = style_default({
  prop: "displayPrint",
  cssProperty: false,
  transform: (value) => ({
    "@media print": {
      display: value
    }
  })
});
var displayRaw = style_default({
  prop: "display"
});
var overflow = style_default({
  prop: "overflow"
});
var textOverflow = style_default({
  prop: "textOverflow"
});
var visibility = style_default({
  prop: "visibility"
});
var whiteSpace = style_default({
  prop: "whiteSpace"
});
var display_default = compose_default(displayPrint, displayRaw, overflow, textOverflow, visibility, whiteSpace);

// ../../node_modules/@material-ui/system/esm/flexbox.js
var flexBasis = style_default({
  prop: "flexBasis"
});
var flexDirection = style_default({
  prop: "flexDirection"
});
var flexWrap = style_default({
  prop: "flexWrap"
});
var justifyContent = style_default({
  prop: "justifyContent"
});
var alignItems = style_default({
  prop: "alignItems"
});
var alignContent = style_default({
  prop: "alignContent"
});
var order = style_default({
  prop: "order"
});
var flex = style_default({
  prop: "flex"
});
var flexGrow = style_default({
  prop: "flexGrow"
});
var flexShrink = style_default({
  prop: "flexShrink"
});
var alignSelf = style_default({
  prop: "alignSelf"
});
var justifyItems = style_default({
  prop: "justifyItems"
});
var justifySelf = style_default({
  prop: "justifySelf"
});
var flexbox = compose_default(flexBasis, flexDirection, flexWrap, justifyContent, alignItems, alignContent, order, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf);
var flexbox_default = flexbox;

// ../../node_modules/@material-ui/system/esm/grid.js
var gap = style_default({
  prop: "gap"
});
var columnGap = style_default({
  prop: "columnGap"
});
var rowGap = style_default({
  prop: "rowGap"
});
var gridColumn = style_default({
  prop: "gridColumn"
});
var gridRow = style_default({
  prop: "gridRow"
});
var gridAutoFlow = style_default({
  prop: "gridAutoFlow"
});
var gridAutoColumns = style_default({
  prop: "gridAutoColumns"
});
var gridAutoRows = style_default({
  prop: "gridAutoRows"
});
var gridTemplateColumns = style_default({
  prop: "gridTemplateColumns"
});
var gridTemplateRows = style_default({
  prop: "gridTemplateRows"
});
var gridTemplateAreas = style_default({
  prop: "gridTemplateAreas"
});
var gridArea = style_default({
  prop: "gridArea"
});
var grid = compose_default(gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);
var grid_default = grid;

// ../../node_modules/@material-ui/system/esm/palette.js
var color = style_default({
  prop: "color",
  themeKey: "palette"
});
var bgcolor = style_default({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette"
});
var backgroundColor = style_default({
  prop: "backgroundColor",
  themeKey: "palette"
});
var palette = compose_default(color, bgcolor, backgroundColor);
var palette_default = palette;

// ../../node_modules/@material-ui/system/esm/positions.js
var position = style_default({
  prop: "position"
});
var zIndex = style_default({
  prop: "zIndex",
  themeKey: "zIndex"
});
var top = style_default({
  prop: "top"
});
var right = style_default({
  prop: "right"
});
var bottom = style_default({
  prop: "bottom"
});
var left = style_default({
  prop: "left"
});
var positions_default = compose_default(position, zIndex, top, right, bottom, left);

// ../../node_modules/@material-ui/system/esm/shadows.js
var boxShadow = style_default({
  prop: "boxShadow",
  themeKey: "shadows"
});
var shadows_default2 = boxShadow;

// ../../node_modules/@material-ui/system/esm/sizing.js
function transform2(value) {
  return value <= 1 ? `${value * 100}%` : value;
}
var width = style_default({
  prop: "width",
  transform: transform2
});
var maxWidth = style_default({
  prop: "maxWidth",
  transform: transform2
});
var minWidth = style_default({
  prop: "minWidth",
  transform: transform2
});
var height = style_default({
  prop: "height",
  transform: transform2
});
var maxHeight = style_default({
  prop: "maxHeight",
  transform: transform2
});
var minHeight = style_default({
  prop: "minHeight",
  transform: transform2
});
var sizeWidth = style_default({
  prop: "size",
  cssProperty: "width",
  transform: transform2
});
var sizeHeight = style_default({
  prop: "size",
  cssProperty: "height",
  transform: transform2
});
var boxSizing = style_default({
  prop: "boxSizing"
});
var sizing = compose_default(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);
var sizing_default = sizing;

// ../../node_modules/@material-ui/system/esm/typography.js
var fontFamily = style_default({
  prop: "fontFamily",
  themeKey: "typography"
});
var fontSize = style_default({
  prop: "fontSize",
  themeKey: "typography"
});
var fontStyle = style_default({
  prop: "fontStyle",
  themeKey: "typography"
});
var fontWeight = style_default({
  prop: "fontWeight",
  themeKey: "typography"
});
var letterSpacing = style_default({
  prop: "letterSpacing"
});
var lineHeight = style_default({
  prop: "lineHeight"
});
var textAlign = style_default({
  prop: "textAlign"
});
var typographyVariant = style_default({
  prop: "typography",
  cssProperty: false,
  themeKey: "typography"
});
var typography = compose_default(typographyVariant, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign);
var typography_default = typography;

// ../../node_modules/@material-ui/system/esm/getThemeValue.js
var filterPropsMapping = {
  borders: borders_default.filterProps,
  display: display_default.filterProps,
  flexbox: flexbox_default.filterProps,
  grid: grid_default.filterProps,
  positions: positions_default.filterProps,
  palette: palette_default.filterProps,
  shadows: shadows_default2.filterProps,
  sizing: sizing_default.filterProps,
  spacing: spacing_default.filterProps,
  typography: typography_default.filterProps
};
var styleFunctionMapping = {
  borders: borders_default,
  display: display_default,
  flexbox: flexbox_default,
  grid: grid_default,
  positions: positions_default,
  palette: palette_default,
  shadows: shadows_default2,
  sizing: sizing_default,
  spacing: spacing_default,
  typography: typography_default
};
var propToStyleFunction = Object.keys(filterPropsMapping).reduce((acc, styleFnName) => {
  filterPropsMapping[styleFnName].forEach((propName) => {
    acc[propName] = styleFunctionMapping[styleFnName];
  });
  return acc;
}, {});
function getThemeValue(prop, value, theme) {
  const inputProps = {
    [prop]: value,
    theme
  };
  const styleFunction = propToStyleFunction[prop];
  return styleFunction ? styleFunction(inputProps) : {
    [prop]: value
  };
}
var getThemeValue_default = getThemeValue;

// ../../node_modules/@material-ui/system/esm/styleFunctionSx/styleFunctionSx.js
function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every((object) => union.size === Object.keys(object).length);
}
function callIfFn(maybeFn, arg) {
  return typeof maybeFn === "function" ? maybeFn(arg) : maybeFn;
}
function styleFunctionSx(props) {
  const {
    sx: styles4,
    theme = {}
  } = props || {};
  if (!styles4)
    return null;
  if (typeof styles4 === "function") {
    return styles4(theme);
  }
  if (typeof styles4 !== "object") {
    return styles4;
  }
  const emptyBreakpoints = createEmptyBreakpointObject(theme.breakpoints);
  const breakpointsKeys = Object.keys(emptyBreakpoints);
  let css3 = emptyBreakpoints;
  Object.keys(styles4).forEach((styleKey) => {
    const value = callIfFn(styles4[styleKey], theme);
    if (typeof value === "object") {
      if (propToStyleFunction[styleKey]) {
        css3 = merge_default(css3, getThemeValue_default(styleKey, value, theme));
      } else {
        const breakpointsValues = handleBreakpoints({
          theme
        }, value, (x2) => ({
          [styleKey]: x2
        }));
        if (objectsHaveSameKeys(breakpointsValues, value)) {
          css3[styleKey] = styleFunctionSx({
            sx: value,
            theme
          });
        } else {
          css3 = merge_default(css3, breakpointsValues);
        }
      }
    } else {
      css3 = merge_default(css3, getThemeValue_default(styleKey, value, theme));
    }
  });
  return removeUnusedBreakpoints(breakpointsKeys, css3);
}
styleFunctionSx.filterProps = ["sx"];
var styleFunctionSx_default = styleFunctionSx;

// ../../node_modules/@material-ui/core/styles/createSpacing.js
function createSpacing(spacingInput = 8) {
  if (spacingInput.mui) {
    return spacingInput;
  }
  const transform3 = createUnarySpacing({
    spacing: spacingInput
  });
  const spacing2 = (...args) => {
    if (false) {
      if (!(args.length <= 4)) {
        console.error(`Material-UI: Too many arguments provided, expected between 0 and 4, got ${args.length}`);
      }
    }
    if (args.length === 0) {
      args[0] = 1;
    }
    return args.map((argument) => {
      const output = transform3(argument);
      return typeof output === "number" ? `${output}px` : output;
    }).join(" ");
  };
  spacing2.mui = true;
  return spacing2;
}

// ../../node_modules/@material-ui/core/styles/transitions.js
var easing = {
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
};
var duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  standard: 300,
  complex: 375,
  enteringScreen: 225,
  leavingScreen: 195
};
function formatMs(milliseconds) {
  return `${Math.round(milliseconds)}ms`;
}
function create3(props = ["all"], options = {}) {
  const {
    duration: durationOption = duration.standard,
    easing: easingOption = easing.easeInOut,
    delay = 0
  } = options, other = _objectWithoutPropertiesLoose(options, ["duration", "easing", "delay"]);
  if (false) {
    const isString = (value) => typeof value === "string";
    const isNumber = (value) => !isNaN(parseFloat(value));
    if (!isString(props) && !Array.isArray(props)) {
      console.error('Material-UI: Argument "props" must be a string or Array.');
    }
    if (!isNumber(durationOption) && !isString(durationOption)) {
      console.error(`Material-UI: Argument "duration" must be a number or a string but found ${durationOption}.`);
    }
    if (!isString(easingOption)) {
      console.error('Material-UI: Argument "easing" must be a string.');
    }
    if (!isNumber(delay) && !isString(delay)) {
      console.error('Material-UI: Argument "delay" must be a number or a string.');
    }
    if (Object.keys(other).length !== 0) {
      console.error(`Material-UI: Unrecognized argument(s) [${Object.keys(other).join(",")}].`);
    }
  }
  return (Array.isArray(props) ? props : [props]).map((animatedProp) => `${animatedProp} ${typeof durationOption === "string" ? durationOption : formatMs(durationOption)} ${easingOption} ${typeof delay === "string" ? delay : formatMs(delay)}`).join(",");
}
function getAutoHeightDuration(height2) {
  if (!height2) {
    return 0;
  }
  const constant = height2 / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}

// ../../node_modules/@material-ui/core/styles/zIndex.js
var zIndex2 = {
  mobileStepper: 1e3,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
var zIndex_default = zIndex2;

// ../../node_modules/@material-ui/core/styles/createMuiTheme.js
function createMuiTheme(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput = {},
    mixins: mixinsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    typography: typographyInput = {}
  } = options, other = _objectWithoutPropertiesLoose(options, ["breakpoints", "mixins", "palette", "spacing", "typography"]);
  const palette2 = createPalette(paletteInput);
  const breakpoints = createBreakpoints(breakpointsInput);
  const spacing2 = createSpacing(spacingInput);
  let muiTheme = deepmerge({
    breakpoints,
    direction: "ltr",
    mixins: createMixins(breakpoints, spacing2, mixinsInput),
    components: {},
    palette: palette2,
    shadows: shadows_default.slice(),
    typography: createTypography(palette2, typographyInput),
    spacing: spacing2,
    shape: _extends({}, shape_default),
    transitions: {
      duration,
      easing,
      create: create3,
      getAutoHeightDuration
    },
    zIndex: _extends({}, zIndex_default)
  }, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  if (false) {
    const pseudoClasses2 = ["active", "checked", "disabled", "error", "focused", "focusVisible", "required", "expanded", "selected"];
    const traverse = (node, component) => {
      let key;
      for (key in node) {
        const child = node[key];
        if (pseudoClasses2.indexOf(key) !== -1 && Object.keys(child).length > 0) {
          if (false) {
            const pseudoClass = generateUtilityClass("", key);
            console.error([`Material-UI: The \`${component}\` component increases the CSS specificity of the \`${key}\` internal state.`, "You can not override it like this: ", JSON.stringify(node, null, 2), "", `Instead, you need to use the '&.${pseudoClass}' syntax:`, JSON.stringify({
              root: {
                [`&.${pseudoClass}`]: child
              }
            }, null, 2), "", "https://material-ui.com/r/pseudo-classes-guide"].join("\n"));
          }
          node[key] = {};
        }
      }
    };
    Object.keys(muiTheme.components).forEach((component) => {
      const styleOverrides = muiTheme.components[component].styleOverrides;
      if (styleOverrides && component.indexOf("Mui") === 0) {
        traverse(styleOverrides, component);
      }
    });
  }
  return muiTheme;
}
var createMuiTheme_default = createMuiTheme;

// ../../node_modules/@material-ui/core/styles/defaultTheme.js
var defaultTheme = createMuiTheme_default();
var defaultTheme_default = defaultTheme;

// ../../node_modules/@material-ui/core/styles/withStyles.js
function withStyles2(stylesOrCreator, options) {
  return withStyles_default(stylesOrCreator, _extends({
    defaultTheme: defaultTheme_default
  }, options));
}
var withStyles_default2 = withStyles2;

// ../../node_modules/@material-ui/core/ButtonBase/ButtonBase.js
var React18 = __toModule(require_react());
var import_prop_types9 = __toModule(require_prop_types());

// ../../node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js
var import_extends21 = __toModule(require_extends());
var import_react5 = __toModule(require_react());

// ../../node_modules/@emotion/memoize/dist/emotion-memoize.browser.esm.js
function memoize4(fn) {
  var cache3 = Object.create(null);
  return function(arg) {
    if (cache3[arg] === void 0)
      cache3[arg] = fn(arg);
    return cache3[arg];
  };
}
var emotion_memoize_browser_esm_default = memoize4;

// ../../node_modules/@emotion/styled/node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.browser.esm.js
var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
var isPropValid = /* @__PURE__ */ emotion_memoize_browser_esm_default(function(prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
});
var emotion_is_prop_valid_browser_esm_default = isPropValid;

// ../../node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js
var import_react3 = __toModule(require_react());

// ../../node_modules/@emotion/react/dist/emotion-react.browser.esm.js
var import_react2 = __toModule(require_react());

// ../../node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js
function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }
  for (var i2 = 0; i2 < document.styleSheets.length; i2++) {
    if (document.styleSheets[i2].ownerNode === tag) {
      return document.styleSheets[i2];
    }
  }
}
function createStyleElement(options) {
  var tag = document.createElement("style");
  tag.setAttribute("data-emotion", options.key);
  if (options.nonce !== void 0) {
    tag.setAttribute("nonce", options.nonce);
  }
  tag.appendChild(document.createTextNode(""));
  tag.setAttribute("data-s", "");
  return tag;
}
var StyleSheet2 = /* @__PURE__ */ function() {
  function StyleSheet3(options) {
    var _this = this;
    this._insertTag = function(tag) {
      var before;
      if (_this.tags.length === 0) {
        before = _this.prepend ? _this.container.firstChild : _this.before;
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }
      _this.container.insertBefore(tag, before);
      _this.tags.push(tag);
    };
    this.isSpeedy = options.speedy === void 0 ? true : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce;
    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.before = null;
  }
  var _proto = StyleSheet3.prototype;
  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };
  _proto.insert = function insert(rule) {
    if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }
    var tag = this.tags[this.tags.length - 1];
    if (false) {
      var isImportRule = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;
      if (isImportRule && this._alreadyInsertedOrderInsensitiveRule) {
        console.error("You're attempting to insert the following rule:\n" + rule + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.");
      }
      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule;
    }
    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);
      try {
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e2) {
        if (false) {
          console.error('There was a problem inserting the following rule: "' + rule + '"', e2);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }
    this.ctr++;
  };
  _proto.flush = function flush() {
    this.tags.forEach(function(tag) {
      return tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
    if (false) {
      this._alreadyInsertedOrderInsensitiveRule = false;
    }
  };
  return StyleSheet3;
}();

// ../../node_modules/stylis/dist/stylis.mjs
var e = "-ms-";
var r = "-moz-";
var a = "-webkit-";
var c = "comm";
var n = "rule";
var t = "decl";
var i = "@import";
var p = "@keyframes";
var k = Math.abs;
var d = String.fromCharCode;
function m(e2, r2) {
  return (((r2 << 2 ^ z(e2, 0)) << 2 ^ z(e2, 1)) << 2 ^ z(e2, 2)) << 2 ^ z(e2, 3);
}
function g(e2) {
  return e2.trim();
}
function x(e2, r2) {
  return (e2 = r2.exec(e2)) ? e2[0] : e2;
}
function y(e2, r2, a2) {
  return e2.replace(r2, a2);
}
function j(e2, r2) {
  return e2.indexOf(r2);
}
function z(e2, r2) {
  return e2.charCodeAt(r2) | 0;
}
function C(e2, r2, a2) {
  return e2.slice(r2, a2);
}
function A(e2) {
  return e2.length;
}
function M(e2) {
  return e2.length;
}
function O(e2, r2) {
  return r2.push(e2), e2;
}
function S(e2, r2) {
  return e2.map(r2).join("");
}
var q = 1;
var B = 1;
var D = 0;
var E = 0;
var F = 0;
var G = "";
function H(e2, r2, a2, c2, n2, t2, s) {
  return {value: e2, root: r2, parent: a2, type: c2, props: n2, children: t2, line: q, column: B, length: s, return: ""};
}
function I(e2, r2, a2) {
  return H(e2, r2.root, r2.parent, a2, r2.props, r2.children, 0);
}
function J() {
  return F;
}
function K() {
  F = E < D ? z(G, E++) : 0;
  if (B++, F === 10)
    B = 1, q++;
  return F;
}
function L() {
  return z(G, E);
}
function N() {
  return E;
}
function P(e2, r2) {
  return C(G, e2, r2);
}
function Q(e2) {
  switch (e2) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function R(e2) {
  return q = B = 1, D = A(G = e2), E = 0, [];
}
function T(e2) {
  return G = "", e2;
}
function U(e2) {
  return g(P(E - 1, Y(e2 === 91 ? e2 + 2 : e2 === 40 ? e2 + 1 : e2)));
}
function W(e2) {
  while (F = L())
    if (F < 33)
      K();
    else
      break;
  return Q(e2) > 2 || Q(F) > 3 ? "" : " ";
}
function Y(e2) {
  while (K())
    switch (F) {
      case e2:
        return E;
      case 34:
      case 39:
        return Y(e2 === 34 || e2 === 39 ? e2 : F);
      case 40:
        if (e2 === 41)
          Y(e2);
        break;
      case 92:
        K();
        break;
    }
  return E;
}
function Z(e2, r2) {
  while (K())
    if (e2 + F === 47 + 10)
      break;
    else if (e2 + F === 42 + 42 && L() === 47)
      break;
  return "/*" + P(r2, E - 1) + "*" + d(e2 === 47 ? e2 : K());
}
function _(e2) {
  while (!Q(L()))
    K();
  return P(e2, E);
}
function ee(e2) {
  return T(re("", null, null, null, [""], e2 = R(e2), 0, [0], e2));
}
function re(e2, r2, a2, c2, n2, t2, s, u, i2) {
  var f = 0;
  var o = 0;
  var l = s;
  var v = 0;
  var h = 0;
  var p2 = 0;
  var w = 1;
  var b = 1;
  var $ = 1;
  var k2 = 0;
  var m2 = "";
  var g2 = n2;
  var x2 = t2;
  var j2 = c2;
  var z2 = m2;
  while (b)
    switch (p2 = k2, k2 = K()) {
      case 34:
      case 39:
      case 91:
      case 40:
        z2 += U(k2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        z2 += W(p2);
        break;
      case 47:
        switch (L()) {
          case 42:
          case 47:
            O(ce(Z(K(), N()), r2, a2), i2);
            break;
          default:
            z2 += "/";
        }
        break;
      case 123 * w:
        u[f++] = A(z2) * $;
      case 125 * w:
      case 59:
      case 0:
        switch (k2) {
          case 0:
          case 125:
            b = 0;
          case 59 + o:
            if (h > 0)
              O(h > 32 ? ne(z2 + ";", c2, a2, l - 1) : ne(y(z2, " ", "") + ";", c2, a2, l - 2), i2);
            break;
          case 59:
            z2 += ";";
          default:
            O(j2 = ae(z2, r2, a2, f, o, n2, u, m2, g2 = [], x2 = [], l), t2);
            if (k2 === 123)
              if (o === 0)
                re(z2, r2, j2, j2, g2, t2, l, u, x2);
              else
                switch (v) {
                  case 100:
                  case 109:
                  case 115:
                    re(e2, j2, j2, c2 && O(ae(e2, j2, j2, 0, 0, n2, u, m2, n2, g2 = [], l), x2), n2, x2, l, u, c2 ? g2 : x2);
                    break;
                  default:
                    re(z2, j2, j2, j2, [""], x2, l, u, x2);
                }
        }
        f = o = h = 0, w = $ = 1, m2 = z2 = "", l = s;
        break;
      case 58:
        l = 1 + A(z2), h = p2;
      default:
        switch (z2 += d(k2), k2 * w) {
          case 38:
            $ = o > 0 ? 1 : (z2 += "\f", -1);
            break;
          case 44:
            u[f++] = (A(z2) - 1) * $, $ = 1;
            break;
          case 64:
            if (L() === 45)
              z2 += U(K());
            v = L(), o = A(m2 = z2 += _(N())), k2++;
            break;
          case 45:
            if (p2 === 45 && A(z2) == 2)
              w = 0;
        }
    }
  return t2;
}
function ae(e2, r2, a2, c2, t2, s, u, i2, f, o, l) {
  var v = t2 - 1;
  var h = t2 === 0 ? s : [""];
  var p2 = M(h);
  for (var w = 0, b = 0, $ = 0; w < c2; ++w)
    for (var d2 = 0, m2 = C(e2, v + 1, v = k(b = u[w])), x2 = e2; d2 < p2; ++d2)
      if (x2 = g(b > 0 ? h[d2] + " " + m2 : y(m2, /&\f/g, h[d2])))
        f[$++] = x2;
  return H(e2, r2, a2, t2 === 0 ? n : i2, f, o, l);
}
function ce(e2, r2, a2) {
  return H(e2, r2, a2, c, d(J()), C(e2, 2, -2), 0);
}
function ne(e2, r2, a2, c2) {
  return H(e2, r2, a2, t, C(e2, 0, c2), C(e2, c2 + 1, -1), c2);
}
function te(c2, n2) {
  switch (m(c2, n2)) {
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return a + c2 + c2;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return a + c2 + r + c2 + e + c2 + c2;
    case 6828:
    case 4268:
      return a + c2 + e + c2 + c2;
    case 6165:
      return a + c2 + e + "flex-" + c2 + c2;
    case 5187:
      return a + c2 + y(c2, /(\w+).+(:[^]+)/, a + "box-$1$2" + e + "flex-$1$2") + c2;
    case 5443:
      return a + c2 + e + "flex-item-" + y(c2, /flex-|-self/, "") + c2;
    case 4675:
      return a + c2 + e + "flex-line-pack" + y(c2, /align-content|flex-|-self/, "") + c2;
    case 5548:
      return a + c2 + e + y(c2, "shrink", "negative") + c2;
    case 5292:
      return a + c2 + e + y(c2, "basis", "preferred-size") + c2;
    case 6060:
      return a + "box-" + y(c2, "-grow", "") + a + c2 + e + y(c2, "grow", "positive") + c2;
    case 4554:
      return a + y(c2, /([^-])(transform)/g, "$1" + a + "$2") + c2;
    case 6187:
      return y(y(y(c2, /(zoom-|grab)/, a + "$1"), /(image-set)/, a + "$1"), c2, "") + c2;
    case 5495:
    case 3959:
      return y(c2, /(image-set\([^]*)/, a + "$1$`$1");
    case 4968:
      return y(y(c2, /(.+:)(flex-)?(.*)/, a + "box-pack:$3" + e + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + a + c2 + c2;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return y(c2, /(.+)-inline(.+)/, a + "$1$2") + c2;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (A(c2) - 1 - n2 > 6)
        switch (z(c2, n2 + 1)) {
          case 102:
            n2 = z(c2, n2 + 3);
          case 109:
            return y(c2, /(.+:)(.+)-([^]+)/, "$1" + a + "$2-$3$1" + r + (n2 == 108 ? "$3" : "$2-$3")) + c2;
          case 115:
            return ~j(c2, "stretch") ? te(y(c2, "stretch", "fill-available"), n2) + c2 : c2;
        }
      break;
    case 4949:
      if (z(c2, n2 + 1) !== 115)
        break;
    case 6444:
      switch (z(c2, A(c2) - 3 - (~j(c2, "!important") && 10))) {
        case 107:
        case 111:
          return y(c2, c2, a + c2) + c2;
        case 101:
          return y(c2, /(.+:)([^;!]+)(;|!.+)?/, "$1" + a + (z(c2, 14) === 45 ? "inline-" : "") + "box$3$1" + a + "$2$3$1" + e + "$2box$3") + c2;
      }
      break;
    case 5936:
      switch (z(c2, n2 + 11)) {
        case 114:
          return a + c2 + e + y(c2, /[svh]\w+-[tblr]{2}/, "tb") + c2;
        case 108:
          return a + c2 + e + y(c2, /[svh]\w+-[tblr]{2}/, "tb-rl") + c2;
        case 45:
          return a + c2 + e + y(c2, /[svh]\w+-[tblr]{2}/, "lr") + c2;
      }
      return a + c2 + e + c2 + c2;
  }
  return c2;
}
function se(e2, r2) {
  var a2 = "";
  var c2 = M(e2);
  for (var n2 = 0; n2 < c2; n2++)
    a2 += r2(e2[n2], n2, e2, r2) || "";
  return a2;
}
function ue(e2, r2, a2, s) {
  switch (e2.type) {
    case i:
    case t:
      return e2.return = e2.return || e2.value;
    case c:
      return "";
    case n:
      e2.value = e2.props.join(",");
  }
  return A(a2 = se(e2.children, s)) ? e2.return = e2.value + "{" + a2 + "}" : "";
}
function ie(e2) {
  var r2 = M(e2);
  return function(a2, c2, n2, t2) {
    var s = "";
    for (var u = 0; u < r2; u++)
      s += e2[u](a2, c2, n2, t2) || "";
    return s;
  };
}
function fe(e2) {
  return function(r2) {
    if (!r2.root) {
      if (r2 = r2.return)
        e2(r2);
    }
  };
}
function oe(c2, s, u, i2) {
  if (!c2.return)
    switch (c2.type) {
      case t:
        c2.return = te(c2.value, c2.length);
        break;
      case p:
        return se([I(y(c2.value, "@", "@" + a), c2, "")], i2);
      case n:
        if (c2.length)
          return S(c2.props, function(n2) {
            switch (x(n2, /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                return se([I(y(n2, /:(read-\w+)/, ":" + r + "$1"), c2, "")], i2);
              case "::placeholder":
                return se([I(y(n2, /:(plac\w+)/, ":" + a + "input-$1"), c2, ""), I(y(n2, /:(plac\w+)/, ":" + r + "$1"), c2, ""), I(y(n2, /:(plac\w+)/, e + "input-$1"), c2, "")], i2);
            }
            return "";
          });
    }
}

// ../../node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js
var toRules = function toRules2(parsed, points) {
  var index = -1;
  var character = 44;
  do {
    switch (Q(character)) {
      case 0:
        if (character === 38 && L() === 12) {
          points[index] = 1;
        }
        parsed[index] += _(E - 1);
        break;
      case 2:
        parsed[index] += U(character);
        break;
      case 4:
        if (character === 44) {
          parsed[++index] = L() === 58 ? "&\f" : "";
          points[index] = parsed[index].length;
          break;
        }
      default:
        parsed[index] += d(character);
    }
  } while (character = K());
  return parsed;
};
var getRules = function getRules2(value, points) {
  return T(toRules(R(value), points));
};
var fixedElements = /* @__PURE__ */ new WeakMap();
var compat = function compat2(element) {
  if (element.type !== "rule" || !element.parent || !element.length) {
    return;
  }
  var value = element.value, parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;
  while (parent.type !== "rule") {
    parent = parent.parent;
    if (!parent)
      return;
  }
  if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
    return;
  }
  if (isImplicitRule) {
    return;
  }
  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;
  for (var i2 = 0, k2 = 0; i2 < rules.length; i2++) {
    for (var j2 = 0; j2 < parentRules.length; j2++, k2++) {
      element.props[k2] = points[i2] ? rules[i2].replace(/&\f/g, parentRules[j2]) : parentRules[j2] + " " + rules[i2];
    }
  }
};
var removeLabel = function removeLabel2(element) {
  if (element.type === "decl") {
    var value = element.value;
    if (value.charCodeAt(0) === 108 && value.charCodeAt(2) === 98) {
      element["return"] = "";
      element.value = "";
    }
  }
};
var defaultStylisPlugins = [oe];
var createCache = function createCache2(options) {
  var key = options.key;
  if (false) {
    throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements.");
  }
  if (key === "css") {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(ssrStyles, function(node) {
      document.head.appendChild(node);
      node.setAttribute("data-s", "");
    });
  }
  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
  if (false) {
    if (/[^a-z-]/.test(key)) {
      throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + key + '" was passed');
    }
  }
  var inserted = {};
  var container;
  var nodesToHydrate = [];
  {
    container = options.container || document.head;
    Array.prototype.forEach.call(document.querySelectorAll("style[data-emotion]"), function(node) {
      var attrib = node.getAttribute("data-emotion").split(" ");
      if (attrib[0] !== key) {
        return;
      }
      for (var i2 = 1; i2 < attrib.length; i2++) {
        inserted[attrib[i2]] = true;
      }
      nodesToHydrate.push(node);
    });
  }
  var _insert;
  var omnipresentPlugins = [compat, removeLabel];
  if (false) {
    omnipresentPlugins.push(createUnsafeSelectorsAlarm({
      get compat() {
        return cache3.compat;
      }
    }), incorrectImportAlarm);
  }
  {
    var currentSheet;
    var finalizingPlugins = [ue, false ? function(element) {
      if (!element.root) {
        if (element["return"]) {
          currentSheet.insert(element["return"]);
        } else if (element.value && element.type !== c) {
          currentSheet.insert(element.value + "{}");
        }
      }
    } : fe(function(rule) {
      currentSheet.insert(rule);
    })];
    var serializer = ie(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
    var stylis = function stylis2(styles4) {
      return se(ee(styles4), serializer);
    };
    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;
      if (false) {
        currentSheet = {
          insert: function insert2(rule) {
            sheet.insert(rule + serialized.map);
          }
        };
      }
      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      if (shouldCache) {
        cache3.inserted[serialized.name] = true;
      }
    };
  }
  var cache3 = {
    key,
    sheet: new StyleSheet2({
      key,
      container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend
    }),
    nonce: options.nonce,
    inserted,
    registered: {},
    insert: _insert
  };
  cache3.sheet.hydrate(nodesToHydrate);
  return cache3;
};
var emotion_cache_browser_esm_default = createCache;

// ../../node_modules/@emotion/react/dist/emotion-element-4fbd89c5.browser.esm.js
var import_react = __toModule(require_react());

// ../../node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js
var isBrowser2 = true;
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = "";
  classNames.split(" ").forEach(function(className) {
    if (registered[className] !== void 0) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var insertStyles = function insertStyles2(cache3, serialized, isStringTag) {
  var className = cache3.key + "-" + serialized.name;
  if ((isStringTag === false || isBrowser2 === false) && cache3.registered[className] === void 0) {
    cache3.registered[className] = serialized.styles;
  }
  if (cache3.inserted[serialized.name] === void 0) {
    var current = serialized;
    do {
      var maybeStyles = cache3.insert(serialized === current ? "." + className : "", current, cache3.sheet, true);
      current = current.next;
    } while (current !== void 0);
  }
};

// ../../node_modules/@emotion/hash/dist/hash.browser.esm.js
function murmur2(str) {
  var h = 0;
  var k2, i2 = 0, len = str.length;
  for (; len >= 4; ++i2, len -= 4) {
    k2 = str.charCodeAt(i2) & 255 | (str.charCodeAt(++i2) & 255) << 8 | (str.charCodeAt(++i2) & 255) << 16 | (str.charCodeAt(++i2) & 255) << 24;
    k2 = (k2 & 65535) * 1540483477 + ((k2 >>> 16) * 59797 << 16);
    k2 ^= k2 >>> 24;
    h = (k2 & 65535) * 1540483477 + ((k2 >>> 16) * 59797 << 16) ^ (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i2 + 2) & 255) << 16;
    case 2:
      h ^= (str.charCodeAt(i2 + 1) & 255) << 8;
    case 1:
      h ^= str.charCodeAt(i2) & 255;
      h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  h ^= h >>> 13;
  h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}
var hash_browser_esm_default = murmur2;

// ../../node_modules/@emotion/unitless/dist/unitless.browser.esm.js
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
var unitless_browser_esm_default = unitlessKeys;

// ../../node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var isCustomProperty = function isCustomProperty2(property) {
  return property.charCodeAt(1) === 45;
};
var isProcessableValue = function isProcessableValue2(value) {
  return value != null && typeof value !== "boolean";
};
var processStyleName = /* @__PURE__ */ emotion_memoize_browser_esm_default(function(styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
});
var processStyleValue = function processStyleValue2(key, value) {
  switch (key) {
    case "animation":
    case "animationName": {
      if (typeof value === "string") {
        return value.replace(animationRegex, function(match, p1, p2) {
          cursor = {
            name: p1,
            styles: p2,
            next: cursor
          };
          return p1;
        });
      }
    }
  }
  if (unitless_browser_esm_default[key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) {
    return value + "px";
  }
  return value;
};
if (false) {
  contentValuePattern = /(attr|calc|counters?|url)\(/;
  contentValues = ["normal", "none", "counter", "open-quote", "close-quote", "no-open-quote", "no-close-quote", "initial", "inherit", "unset"];
  oldProcessStyleValue = processStyleValue;
  msPattern2 = /^-ms-/;
  hyphenPattern = /-(.)/g;
  hyphenatedCache = {};
  processStyleValue = function processStyleValue3(key, value) {
    if (key === "content") {
      if (typeof value !== "string" || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }
    var processed = oldProcessStyleValue(key, value);
    if (processed !== "" && !isCustomProperty(key) && key.indexOf("-") !== -1 && hyphenatedCache[key] === void 0) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern2, "ms-").replace(hyphenPattern, function(str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }
    return processed;
  };
}
var contentValuePattern;
var contentValues;
var oldProcessStyleValue;
var msPattern2;
var hyphenPattern;
var hyphenatedCache;
function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return "";
  }
  if (interpolation.__emotion_styles !== void 0) {
    if (false) {
      throw new Error("Component selectors can only be used in conjunction with @emotion/babel-plugin.");
    }
    return interpolation;
  }
  switch (typeof interpolation) {
    case "boolean": {
      return "";
    }
    case "object": {
      if (interpolation.anim === 1) {
        cursor = {
          name: interpolation.name,
          styles: interpolation.styles,
          next: cursor
        };
        return interpolation.name;
      }
      if (interpolation.styles !== void 0) {
        var next = interpolation.next;
        if (next !== void 0) {
          while (next !== void 0) {
            cursor = {
              name: next.name,
              styles: next.styles,
              next: cursor
            };
            next = next.next;
          }
        }
        var styles4 = interpolation.styles + ";";
        if (false) {
          styles4 += interpolation.map;
        }
        return styles4;
      }
      return createStringFromObject(mergedProps, registered, interpolation);
    }
    case "function": {
      if (mergedProps !== void 0) {
        var previousCursor = cursor;
        var result = interpolation(mergedProps);
        cursor = previousCursor;
        return handleInterpolation(mergedProps, registered, result);
      } else if (false) {
        console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
      }
      break;
    }
    case "string":
      if (false) {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function(match, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, "") + "`");
          return "${" + fakeVarName + "}";
        });
        if (matched.length) {
          console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(matched, ["`" + replaced + "`"]).join("\n") + "\n\nYou should wrap it with `css` like this:\n\n" + ("css`" + replaced + "`"));
        }
      }
      break;
  }
  if (registered == null) {
    return interpolation;
  }
  var cached = registered[interpolation];
  return cached !== void 0 ? cached : interpolation;
}
function createStringFromObject(mergedProps, registered, obj) {
  var string = "";
  if (Array.isArray(obj)) {
    for (var i2 = 0; i2 < obj.length; i2++) {
      string += handleInterpolation(mergedProps, registered, obj[i2]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];
      if (typeof value !== "object") {
        if (registered != null && registered[value] !== void 0) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === "NO_COMPONENT_SELECTOR" && false) {
          throw new Error("Component selectors can only be used in conjunction with @emotion/babel-plugin.");
        }
        if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);
          switch (_key) {
            case "animation":
            case "animationName": {
              string += processStyleName(_key) + ":" + interpolated + ";";
              break;
            }
            default: {
              if (false) {
                console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
              }
              string += _key + "{" + interpolated + "}";
            }
          }
        }
      }
    }
  }
  return string;
}
var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;
var sourceMapPattern;
if (false) {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
}
var cursor;
var serializeStyles = function serializeStyles2(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
    return args[0];
  }
  var stringMode = true;
  var styles4 = "";
  cursor = void 0;
  var strings = args[0];
  if (strings == null || strings.raw === void 0) {
    stringMode = false;
    styles4 += handleInterpolation(mergedProps, registered, strings);
  } else {
    if (false) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }
    styles4 += strings[0];
  }
  for (var i2 = 1; i2 < args.length; i2++) {
    styles4 += handleInterpolation(mergedProps, registered, args[i2]);
    if (stringMode) {
      if (false) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }
      styles4 += strings[i2];
    }
  }
  var sourceMap;
  if (false) {
    styles4 = styles4.replace(sourceMapPattern, function(match2) {
      sourceMap = match2;
      return "";
    });
  }
  labelPattern.lastIndex = 0;
  var identifierName = "";
  var match;
  while ((match = labelPattern.exec(styles4)) !== null) {
    identifierName += "-" + match[1];
  }
  var name = hash_browser_esm_default(styles4) + identifierName;
  if (false) {
    return {
      name,
      styles: styles4,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }
  return {
    name,
    styles: styles4,
    next: cursor
  };
};

// ../../node_modules/@emotion/react/dist/emotion-element-4fbd89c5.browser.esm.js
var EmotionCacheContext = /* @__PURE__ */ import_react.createContext(typeof HTMLElement !== "undefined" ? /* @__PURE__ */ emotion_cache_browser_esm_default({
  key: "css"
}) : null);
var CacheProvider = EmotionCacheContext.Provider;
var withEmotionCache = function withEmotionCache2(func) {
  return /* @__PURE__ */ import_react.forwardRef(function(props, ref) {
    var cache3 = import_react.useContext(EmotionCacheContext);
    return func(props, cache3, ref);
  });
};
var ThemeContext2 = /* @__PURE__ */ import_react.createContext({});
if (false) {
  Emotion.displayName = "EmotionCssPropInternal";
}

// ../../node_modules/@emotion/react/dist/emotion-react.browser.esm.js
var import_extends19 = __toModule(require_extends());
var import_hoist_non_react_statics2 = __toModule(require_hoist_non_react_statics_cjs());
if (false) {
  Global.displayName = "EmotionGlobal";
}
function css2() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return serializeStyles(args);
}
var keyframes = function keyframes2() {
  var insertable = css2.apply(void 0, arguments);
  var name = "animation-" + insertable.name;
  return {
    name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};
if (false) {
  ClassNames.displayName = "EmotionClassNames";
}
if (false) {
  isBrowser3 = true;
  isJest = typeof jest !== "undefined";
  if (isBrowser3 && !isJest) {
    globalContext = isBrowser3 ? window : global;
    globalKey = "__EMOTION_REACT_" + pkg.version.split(".")[0] + "__";
    if (globalContext[globalKey]) {
      console.warn("You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.");
    }
    globalContext[globalKey] = true;
  }
}
var isBrowser3;
var isJest;
var globalContext;
var globalKey;

// ../../node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js
var testOmitPropsOnStringTag = emotion_is_prop_valid_browser_esm_default;
var testOmitPropsOnComponent = function testOmitPropsOnComponent2(key) {
  return key !== "theme";
};
var getDefaultShouldForwardProp = function getDefaultShouldForwardProp2(tag) {
  return typeof tag === "string" && tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
};
var composeShouldForwardProps = function composeShouldForwardProps2(tag, options, isReal) {
  var shouldForwardProp2;
  if (options) {
    var optionsShouldForwardProp = options.shouldForwardProp;
    shouldForwardProp2 = tag.__emotion_forwardProp && optionsShouldForwardProp ? function(propName) {
      return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
    } : optionsShouldForwardProp;
  }
  if (typeof shouldForwardProp2 !== "function" && isReal) {
    shouldForwardProp2 = tag.__emotion_forwardProp;
  }
  return shouldForwardProp2;
};
var createStyled = function createStyled2(tag, options) {
  if (false) {
    if (tag === void 0) {
      throw new Error("You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.");
    }
  }
  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;
  var identifierName;
  var targetClassName;
  if (options !== void 0) {
    identifierName = options.label;
    targetClassName = options.target;
  }
  var shouldForwardProp2 = composeShouldForwardProps(tag, options, isReal);
  var defaultShouldForwardProp = shouldForwardProp2 || getDefaultShouldForwardProp(baseTag);
  var shouldUseAs = !defaultShouldForwardProp("as");
  return function() {
    var args = arguments;
    var styles4 = isReal && tag.__emotion_styles !== void 0 ? tag.__emotion_styles.slice(0) : [];
    if (identifierName !== void 0) {
      styles4.push("label:" + identifierName + ";");
    }
    if (args[0] == null || args[0].raw === void 0) {
      styles4.push.apply(styles4, args);
    } else {
      if (false) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }
      styles4.push(args[0][0]);
      var len = args.length;
      var i2 = 1;
      for (; i2 < len; i2++) {
        if (false) {
          console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
        }
        styles4.push(args[i2], args[0][i2]);
      }
    }
    var Styled = withEmotionCache(function(props, cache3, ref) {
      var finalTag = shouldUseAs && props.as || baseTag;
      var className = "";
      var classInterpolations = [];
      var mergedProps = props;
      if (props.theme == null) {
        mergedProps = {};
        for (var key in props) {
          mergedProps[key] = props[key];
        }
        mergedProps.theme = import_react3.useContext(ThemeContext2);
      }
      if (typeof props.className === "string") {
        className = getRegisteredStyles(cache3.registered, classInterpolations, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }
      var serialized = serializeStyles(styles4.concat(classInterpolations), cache3.registered, mergedProps);
      var rules = insertStyles(cache3, serialized, typeof finalTag === "string");
      className += cache3.key + "-" + serialized.name;
      if (targetClassName !== void 0) {
        className += " " + targetClassName;
      }
      var finalShouldForwardProp = shouldUseAs && shouldForwardProp2 === void 0 ? getDefaultShouldForwardProp(finalTag) : defaultShouldForwardProp;
      var newProps = {};
      for (var _key in props) {
        if (shouldUseAs && _key === "as")
          continue;
        if (finalShouldForwardProp(_key)) {
          newProps[_key] = props[_key];
        }
      }
      newProps.className = className;
      newProps.ref = ref;
      var ele = /* @__PURE__ */ import_react3.createElement(finalTag, newProps);
      return ele;
    });
    Styled.displayName = identifierName !== void 0 ? identifierName : "Styled(" + (typeof baseTag === "string" ? baseTag : baseTag.displayName || baseTag.name || "Component") + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles4;
    Styled.__emotion_forwardProp = shouldForwardProp2;
    Object.defineProperty(Styled, "toString", {
      value: function value() {
        if (targetClassName === void 0 && false) {
          return "NO_COMPONENT_SELECTOR";
        }
        return "." + targetClassName;
      }
    });
    Styled.withComponent = function(nextTag, nextOptions) {
      return createStyled2(nextTag, _extends({}, options, {}, nextOptions, {
        shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
      })).apply(void 0, styles4);
    };
    return Styled;
  };
};
var emotion_styled_base_browser_esm_default = createStyled;

// ../../node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js
var tags = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
var newStyled = emotion_styled_base_browser_esm_default.bind();
tags.forEach(function(tagName) {
  newStyled[tagName] = newStyled(tagName);
});
var emotion_styled_browser_esm_default = newStyled;

// ../../node_modules/@material-ui/core/styles/experimentalStyled.js
function isEmpty2(obj) {
  return Object.keys(obj).length === 0;
}
var getStyleOverrides = (name, theme) => {
  if (theme.components && theme.components[name] && theme.components[name].styleOverrides) {
    return theme.components[name].styleOverrides;
  }
  return null;
};
var getVariantStyles = (name, theme) => {
  let variants = [];
  if (theme && theme.components && theme.components[name] && theme.components[name].variants) {
    variants = theme.components[name].variants;
  }
  const variantsStyles = {};
  variants.forEach((definition) => {
    const key = propsToClassKey(definition.props);
    variantsStyles[key] = definition.style;
  });
  return variantsStyles;
};
var variantsResolver = (props, styles4, theme, name) => {
  var _theme$components, _theme$components$nam;
  const {
    styleProps = {}
  } = props;
  let variantsStyles = {};
  const themeVariants = theme === null || theme === void 0 ? void 0 : (_theme$components = theme.components) === null || _theme$components === void 0 ? void 0 : (_theme$components$nam = _theme$components[name]) === null || _theme$components$nam === void 0 ? void 0 : _theme$components$nam.variants;
  if (themeVariants) {
    themeVariants.forEach((themeVariant) => {
      let isMatch = true;
      Object.keys(themeVariant.props).forEach((key) => {
        if (styleProps[key] !== themeVariant.props[key] && props[key] !== themeVariant.props[key]) {
          isMatch = false;
        }
      });
      if (isMatch) {
        variantsStyles = _extends({}, variantsStyles, styles4[propsToClassKey(themeVariant.props)]);
      }
    });
  }
  return variantsStyles;
};
var shouldForwardProp = (prop) => prop !== "styleProps" && prop !== "theme" && prop !== "isRtl" && prop !== "sx" && prop !== "as" && prop !== "classes";
var lowercaseFirstLetter = (string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};
var experimentalStyled = (tag, options, muiOptions = {}) => {
  const componentName = muiOptions.name;
  const componentSlot = muiOptions.slot;
  const overridesResolver3 = muiOptions.overridesResolver;
  const skipVariantsResolver = muiOptions.skipVariantsResolver || false;
  const skipSx = muiOptions.skipSx || false;
  let displayName;
  let name;
  let className;
  if (componentName) {
    displayName = `${componentName}${componentSlot || ""}`;
    name = !componentSlot || componentSlot === "Root" ? `${componentName}` : null;
    className = `${componentName}-${lowercaseFirstLetter(componentSlot || "Root")}`;
  }
  const defaultStyledResolver = emotion_styled_browser_esm_default(tag, _extends({
    shouldForwardProp,
    label: className || componentName || ""
  }, options));
  const muiStyledResolver = (styleArg, ...expressions) => {
    const expressionsWithDefaultTheme = expressions ? expressions.map((stylesArg) => {
      return typeof stylesArg === "function" ? (_ref) => {
        let {
          theme: themeInput
        } = _ref, other = _objectWithoutPropertiesLoose(_ref, ["theme"]);
        return stylesArg(_extends({
          theme: isEmpty2(themeInput) ? defaultTheme_default : themeInput
        }, other));
      } : stylesArg;
    }) : [];
    let transformedStyleArg = styleArg;
    if (name && overridesResolver3) {
      expressionsWithDefaultTheme.push((props) => {
        const theme = isEmpty2(props.theme) ? defaultTheme_default : props.theme;
        const styleOverrides = getStyleOverrides(name, theme);
        if (styleOverrides) {
          return overridesResolver3(props, styleOverrides);
        }
        return null;
      });
    }
    if (name && !skipVariantsResolver) {
      expressionsWithDefaultTheme.push((props) => {
        const theme = isEmpty2(props.theme) ? defaultTheme_default : props.theme;
        return variantsResolver(props, getVariantStyles(name, theme), theme, name);
      });
    }
    if (!skipSx) {
      expressionsWithDefaultTheme.push((props) => {
        const theme = isEmpty2(props.theme) ? defaultTheme_default : props.theme;
        return styleFunctionSx_default(_extends({}, props, {
          theme
        }));
      });
    }
    const numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;
    if (Array.isArray(styleArg) && numOfCustomFnsApplied > 0) {
      const placeholders = new Array(numOfCustomFnsApplied).fill("");
      transformedStyleArg = [...styleArg, ...placeholders];
      transformedStyleArg.raw = [...styleArg.raw, ...placeholders];
    } else if (typeof styleArg === "function") {
      transformedStyleArg = (_ref2) => {
        let {
          theme: themeInput
        } = _ref2, other = _objectWithoutPropertiesLoose(_ref2, ["theme"]);
        return styleArg(_extends({
          theme: isEmpty2(themeInput) ? defaultTheme_default : themeInput
        }, other));
      };
    }
    const Component = defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);
    if (displayName || name) {
      Component.displayName = displayName || name;
    }
    return Component;
  };
  return muiStyledResolver;
};
var experimentalStyled_default = experimentalStyled;

// ../../node_modules/@material-ui/core/styles/useTheme.js
var React13 = __toModule(require_react());
function useTheme2() {
  const theme = useTheme() || defaultTheme_default;
  if (false) {
    React13.useDebugValue(theme);
  }
  return theme;
}

// ../../node_modules/@material-ui/core/styles/useThemeProps.js
function useThemeProps({
  props: inputProps,
  name
}) {
  const props = _extends({}, inputProps);
  const contextTheme = useTheme2() || defaultTheme_default;
  const more = getThemeProps({
    theme: contextTheme,
    name,
    props
  });
  const theme = more.theme || contextTheme;
  const isRtl = theme.direction === "rtl";
  return _extends({
    theme,
    isRtl
  }, more);
}

// ../../node_modules/@material-ui/core/utils/useForkRef.js
var useForkRef_default = useForkRef;

// ../../node_modules/@material-ui/core/utils/useEventCallback.js
var useEventCallback_default = useEventCallback;

// ../../node_modules/@material-ui/core/utils/useIsFocusVisible.js
var useIsFocusVisible_default = useIsFocusVisible;

// ../../node_modules/@material-ui/core/ButtonBase/TouchRipple.js
var React17 = __toModule(require_react());
var import_prop_types8 = __toModule(require_prop_types());

// ../../node_modules/react-transition-group/esm/TransitionGroupContext.js
var import_react6 = __toModule(require_react());
var TransitionGroupContext_default = import_react6.default.createContext(null);

// ../../node_modules/react-transition-group/esm/TransitionGroup.js
var import_prop_types6 = __toModule(require_prop_types());
var import_react8 = __toModule(require_react());

// ../../node_modules/react-transition-group/esm/utils/ChildMapping.js
var import_react7 = __toModule(require_react());
function getChildMapping(children, mapFn) {
  var mapper = function mapper2(child) {
    return mapFn && import_react7.isValidElement(child) ? mapFn(child) : child;
  };
  var result = Object.create(null);
  if (children)
    import_react7.Children.map(children, function(c2) {
      return c2;
    }).forEach(function(child) {
      result[child.key] = mapper(child);
    });
  return result;
}
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};
  function getValueForKey(key) {
    return key in next ? next[key] : prev[key];
  }
  var nextKeysPending = Object.create(null);
  var pendingKeys = [];
  for (var prevKey in prev) {
    if (prevKey in next) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }
  var i2;
  var childMapping = {};
  for (var nextKey in next) {
    if (nextKeysPending[nextKey]) {
      for (i2 = 0; i2 < nextKeysPending[nextKey].length; i2++) {
        var pendingNextKey = nextKeysPending[nextKey][i2];
        childMapping[nextKeysPending[nextKey][i2]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }
  for (i2 = 0; i2 < pendingKeys.length; i2++) {
    childMapping[pendingKeys[i2]] = getValueForKey(pendingKeys[i2]);
  }
  return childMapping;
}
function getProp(child, prop, props) {
  return props[prop] != null ? props[prop] : child.props[prop];
}
function getInitialChildMapping(props, onExited) {
  return getChildMapping(props.children, function(child) {
    return import_react7.cloneElement(child, {
      onExited: onExited.bind(null, child),
      in: true,
      appear: getProp(child, "appear", props),
      enter: getProp(child, "enter", props),
      exit: getProp(child, "exit", props)
    });
  });
}
function getNextChildMapping(nextProps, prevChildMapping, onExited) {
  var nextChildMapping = getChildMapping(nextProps.children);
  var children = mergeChildMappings(prevChildMapping, nextChildMapping);
  Object.keys(children).forEach(function(key) {
    var child = children[key];
    if (!import_react7.isValidElement(child))
      return;
    var hasPrev = key in prevChildMapping;
    var hasNext = key in nextChildMapping;
    var prevChild = prevChildMapping[key];
    var isLeaving = import_react7.isValidElement(prevChild) && !prevChild.props.in;
    if (hasNext && (!hasPrev || isLeaving)) {
      children[key] = import_react7.cloneElement(child, {
        onExited: onExited.bind(null, child),
        in: true,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    } else if (!hasNext && hasPrev && !isLeaving) {
      children[key] = import_react7.cloneElement(child, {
        in: false
      });
    } else if (hasNext && hasPrev && import_react7.isValidElement(prevChild)) {
      children[key] = import_react7.cloneElement(child, {
        onExited: onExited.bind(null, child),
        in: prevChild.props.in,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    }
  });
  return children;
}

// ../../node_modules/react-transition-group/esm/TransitionGroup.js
var values2 = Object.values || function(obj) {
  return Object.keys(obj).map(function(k2) {
    return obj[k2];
  });
};
var defaultProps = {
  component: "div",
  childFactory: function childFactory(child) {
    return child;
  }
};
var TransitionGroup = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(TransitionGroup2, _React$Component);
  function TransitionGroup2(props, context) {
    var _this;
    _this = _React$Component.call(this, props, context) || this;
    var handleExited = _this.handleExited.bind(_assertThisInitialized(_this));
    _this.state = {
      contextValue: {
        isMounting: true
      },
      handleExited,
      firstRender: true
    };
    return _this;
  }
  var _proto = TransitionGroup2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.mounted = true;
    this.setState({
      contextValue: {
        isMounting: false
      }
    });
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
  };
  TransitionGroup2.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
    var prevChildMapping = _ref.children, handleExited = _ref.handleExited, firstRender = _ref.firstRender;
    return {
      children: firstRender ? getInitialChildMapping(nextProps, handleExited) : getNextChildMapping(nextProps, prevChildMapping, handleExited),
      firstRender: false
    };
  };
  _proto.handleExited = function handleExited(child, node) {
    var currentChildMapping = getChildMapping(this.props.children);
    if (child.key in currentChildMapping)
      return;
    if (child.props.onExited) {
      child.props.onExited(node);
    }
    if (this.mounted) {
      this.setState(function(state) {
        var children = _extends({}, state.children);
        delete children[child.key];
        return {
          children
        };
      });
    }
  };
  _proto.render = function render() {
    var _this$props = this.props, Component = _this$props.component, childFactory2 = _this$props.childFactory, props = _objectWithoutPropertiesLoose(_this$props, ["component", "childFactory"]);
    var contextValue = this.state.contextValue;
    var children = values2(this.state.children).map(childFactory2);
    delete props.appear;
    delete props.enter;
    delete props.exit;
    if (Component === null) {
      return /* @__PURE__ */ import_react8.default.createElement(TransitionGroupContext_default.Provider, {
        value: contextValue
      }, children);
    }
    return /* @__PURE__ */ import_react8.default.createElement(TransitionGroupContext_default.Provider, {
      value: contextValue
    }, /* @__PURE__ */ import_react8.default.createElement(Component, props, children));
  };
  return TransitionGroup2;
}(import_react8.default.Component);
TransitionGroup.propTypes = false ? {
  component: import_prop_types6.default.any,
  children: import_prop_types6.default.node,
  appear: import_prop_types6.default.bool,
  enter: import_prop_types6.default.bool,
  exit: import_prop_types6.default.bool,
  childFactory: import_prop_types6.default.func
} : {};
TransitionGroup.defaultProps = defaultProps;
var TransitionGroup_default = TransitionGroup;

// ../../node_modules/@material-ui/core/ButtonBase/Ripple.js
var React16 = __toModule(require_react());
var import_prop_types7 = __toModule(require_prop_types());

// ../../node_modules/@material-ui/core/utils/useEnhancedEffect.js
var useEnhancedEffect_default2 = useEnhancedEffect_default;

// ../../node_modules/@material-ui/core/ButtonBase/Ripple.js
function Ripple(props) {
  const {
    className,
    classes,
    pulsate = false,
    rippleX,
    rippleY,
    rippleSize,
    in: inProp,
    onExited = () => {
    },
    timeout
  } = props;
  const [leaving, setLeaving] = React16.useState(false);
  const rippleClassName = clsx_m_default(className, classes.ripple, classes.rippleVisible, pulsate && classes.ripplePulsate);
  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX
  };
  const childClassName = clsx_m_default(classes.child, leaving && classes.childLeaving, pulsate && classes.childPulsate);
  const handleExited = useEventCallback_default(onExited);
  useEnhancedEffect_default2(() => {
    if (!inProp) {
      setLeaving(true);
      const timeoutId = setTimeout(handleExited, timeout);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    return void 0;
  }, [handleExited, inProp, timeout]);
  return /* @__PURE__ */ React16.createElement("span", {
    className: rippleClassName,
    style: rippleStyles
  }, /* @__PURE__ */ React16.createElement("span", {
    className: childClassName
  }));
}
false ? Ripple.propTypes = {
  classes: import_prop_types7.default.object.isRequired,
  className: import_prop_types7.default.string,
  in: import_prop_types7.default.bool,
  onExited: import_prop_types7.default.func,
  pulsate: import_prop_types7.default.bool,
  rippleSize: import_prop_types7.default.number,
  rippleX: import_prop_types7.default.number,
  rippleY: import_prop_types7.default.number,
  timeout: import_prop_types7.default.number.isRequired
} : void 0;
var Ripple_default = Ripple;

// ../../node_modules/@material-ui/core/ButtonBase/touchRippleClasses.js
var touchRippleClasses = generateUtilityClasses("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]);
var touchRippleClasses_default = touchRippleClasses;

// ../../node_modules/@material-ui/core/ButtonBase/TouchRipple.js
var _2 = (t2) => t2;
var _t;
var _t2;
var _t3;
var _t4;
var DURATION = 550;
var DELAY_RIPPLE = 80;
var enterKeyframe = keyframes(_t || (_t = _2`
0% {
  transform: scale(0);
  opacity: 0.1;
}
100% {
  transform: scale(1);
  opacity: 0.3;
}
`));
var exitKeyframe = keyframes(_t2 || (_t2 = _2`
0% {
  opacity: 1;
}
100% {
  opacity: 0;
}
`));
var pulsateKeyframe = keyframes(_t3 || (_t3 = _2`
0% {
  transform: scale(1);
}
50% {
  transform: scale(0.92);
}
100% {
  transform: scale(1);
}
`));
var TouchRippleRoot = experimentalStyled_default("span", {}, {
  name: "MuiTouchRipple",
  slot: "Root"
})({
  overflow: "hidden",
  pointerEvents: "none",
  position: "absolute",
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: "inherit"
});
var TouchRippleRipple = experimentalStyled_default(Ripple_default, {
  shouldForwardProp: (prop) => shouldForwardProp(prop) || prop === "classes"
}, {
  name: "MuiTouchRipple",
  slot: "Ripple"
})(_t4 || (_t4 = _2`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    left: 0;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`), touchRippleClasses_default.rippleVisible, enterKeyframe, DURATION, ({
  theme
}) => theme.transitions.easing.easeInOut, touchRippleClasses_default.ripplePulsate, ({
  theme
}) => theme.transitions.duration.shorter, touchRippleClasses_default.child, touchRippleClasses_default.childLeaving, exitKeyframe, DURATION, ({
  theme
}) => theme.transitions.easing.easeInOut, touchRippleClasses_default.childPulsate, pulsateKeyframe, ({
  theme
}) => theme.transitions.easing.easeInOut);
var TouchRipple = /* @__PURE__ */ React17.forwardRef(function TouchRipple2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiTouchRipple"
  });
  const {
    center: centerProp = false,
    classes = {},
    className
  } = props, other = _objectWithoutPropertiesLoose(props, ["center", "classes", "className"]);
  const [ripples, setRipples] = React17.useState([]);
  const nextKey = React17.useRef(0);
  const rippleCallback = React17.useRef(null);
  React17.useEffect(() => {
    if (rippleCallback.current) {
      rippleCallback.current();
      rippleCallback.current = null;
    }
  }, [ripples]);
  const ignoringMouseDown = React17.useRef(false);
  const startTimer = React17.useRef(null);
  const startTimerCommit = React17.useRef(null);
  const container = React17.useRef(null);
  React17.useEffect(() => {
    return () => {
      clearTimeout(startTimer.current);
    };
  }, []);
  const startCommit = React17.useCallback((params) => {
    const {
      pulsate: pulsate2,
      rippleX,
      rippleY,
      rippleSize,
      cb
    } = params;
    setRipples((oldRipples) => [...oldRipples, /* @__PURE__ */ React17.createElement(TouchRippleRipple, {
      key: nextKey.current,
      classes: {
        ripple: clsx_m_default(classes.ripple, touchRippleClasses_default.ripple),
        rippleVisible: clsx_m_default(classes.rippleVisible, touchRippleClasses_default.rippleVisible),
        ripplePulsate: clsx_m_default(classes.ripplePulsate, touchRippleClasses_default.ripplePulsate),
        child: clsx_m_default(classes.child, touchRippleClasses_default.child),
        childLeaving: clsx_m_default(classes.childLeaving, touchRippleClasses_default.childLeaving),
        childPulsate: clsx_m_default(classes.childPulsate, touchRippleClasses_default.childPulsate)
      },
      timeout: DURATION,
      pulsate: pulsate2,
      rippleX,
      rippleY,
      rippleSize
    })]);
    nextKey.current += 1;
    rippleCallback.current = cb;
  }, [classes]);
  const start = React17.useCallback((event = {}, options = {}, cb) => {
    const {
      pulsate: pulsate2 = false,
      center = centerProp || options.pulsate,
      fakeElement = false
    } = options;
    if (event.type === "mousedown" && ignoringMouseDown.current) {
      ignoringMouseDown.current = false;
      return;
    }
    if (event.type === "touchstart") {
      ignoringMouseDown.current = true;
    }
    const element = fakeElement ? null : container.current;
    const rect = element ? element.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
    let rippleX;
    let rippleY;
    let rippleSize;
    if (center || event.clientX === 0 && event.clientY === 0 || !event.clientX && !event.touches) {
      rippleX = Math.round(rect.width / 2);
      rippleY = Math.round(rect.height / 2);
    } else {
      const {
        clientX,
        clientY
      } = event.touches ? event.touches[0] : event;
      rippleX = Math.round(clientX - rect.left);
      rippleY = Math.round(clientY - rect.top);
    }
    if (center) {
      rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);
      if (rippleSize % 2 === 0) {
        rippleSize += 1;
      }
    } else {
      const sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
      const sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
      rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
    }
    if (event.touches) {
      if (startTimerCommit.current === null) {
        startTimerCommit.current = () => {
          startCommit({
            pulsate: pulsate2,
            rippleX,
            rippleY,
            rippleSize,
            cb
          });
        };
        startTimer.current = setTimeout(() => {
          if (startTimerCommit.current) {
            startTimerCommit.current();
            startTimerCommit.current = null;
          }
        }, DELAY_RIPPLE);
      }
    } else {
      startCommit({
        pulsate: pulsate2,
        rippleX,
        rippleY,
        rippleSize,
        cb
      });
    }
  }, [centerProp, startCommit]);
  const pulsate = React17.useCallback(() => {
    start({}, {
      pulsate: true
    });
  }, [start]);
  const stop = React17.useCallback((event, cb) => {
    clearTimeout(startTimer.current);
    if (event.type === "touchend" && startTimerCommit.current) {
      event.persist();
      startTimerCommit.current();
      startTimerCommit.current = null;
      startTimer.current = setTimeout(() => {
        stop(event, cb);
      });
      return;
    }
    startTimerCommit.current = null;
    setRipples((oldRipples) => {
      if (oldRipples.length > 0) {
        return oldRipples.slice(1);
      }
      return oldRipples;
    });
    rippleCallback.current = cb;
  }, []);
  React17.useImperativeHandle(ref, () => ({
    pulsate,
    start,
    stop
  }), [pulsate, start, stop]);
  return /* @__PURE__ */ React17.createElement(TouchRippleRoot, _extends({
    className: clsx_m_default(classes.root, touchRippleClasses_default.root, className),
    ref: container
  }, other), /* @__PURE__ */ React17.createElement(TransitionGroup_default, {
    component: null,
    exit: true
  }, ripples));
});
false ? TouchRipple.propTypes = {
  center: import_prop_types8.default.bool,
  classes: import_prop_types8.default.object,
  className: import_prop_types8.default.string
} : void 0;
var TouchRipple_default = TouchRipple;

// ../../node_modules/@material-ui/core/ButtonBase/buttonBaseClasses.js
function getButtonBaseUtilityClass(slot) {
  return generateUtilityClass("MuiButtonBase", slot);
}
var buttonBaseClasses = generateUtilityClasses("MuiButtonBase", ["root", "disabled", "focusVisible"]);

// ../../node_modules/@material-ui/core/ButtonBase/ButtonBase.js
var overridesResolver = (props, styles4) => styles4.root || {};
var useUtilityClasses2 = (styleProps) => {
  const {
    disabled,
    focusVisible,
    focusVisibleClassName,
    classes
  } = styleProps;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible"]
  };
  const composedClasses = composeClasses(slots, getButtonBaseUtilityClass, classes);
  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }
  return composedClasses;
};
var ButtonBaseRoot = experimentalStyled_default("button", {}, {
  name: "MuiButtonBase",
  slot: "Root",
  overridesResolver
})({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  WebkitTapHighlightColor: "transparent",
  backgroundColor: "transparent",
  outline: 0,
  border: 0,
  margin: 0,
  borderRadius: 0,
  padding: 0,
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  MozAppearance: "none",
  WebkitAppearance: "none",
  textDecoration: "none",
  color: "inherit",
  "&::-moz-focus-inner": {
    borderStyle: "none"
  },
  "&.Mui-disabled": {
    pointerEvents: "none",
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
});
var ButtonBase = /* @__PURE__ */ React18.forwardRef(function ButtonBase2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiButtonBase"
  });
  const {
    action,
    buttonRef: buttonRefProp,
    centerRipple = false,
    children,
    className,
    component = "button",
    disabled = false,
    disableRipple = false,
    disableTouchRipple = false,
    focusRipple = false,
    onBlur,
    onClick,
    onFocus,
    onFocusVisible,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    onDragLeave,
    tabIndex = 0,
    TouchRippleProps
  } = props, other = _objectWithoutPropertiesLoose(props, ["action", "buttonRef", "centerRipple", "children", "className", "component", "disabled", "disableRipple", "disableTouchRipple", "focusRipple", "focusVisibleClassName", "onBlur", "onClick", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchMove", "onTouchStart", "onDragLeave", "tabIndex", "TouchRippleProps"]);
  const buttonRef = React18.useRef(null);
  const rippleRef = React18.useRef(null);
  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible_default();
  const [focusVisible, setFocusVisible] = React18.useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }
  React18.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);
  React18.useImperativeHandle(action, () => ({
    focusVisible: () => {
      setFocusVisible(true);
      buttonRef.current.focus();
    }
  }), []);
  React18.useEffect(() => {
    if (focusVisible && focusRipple && !disableRipple) {
      rippleRef.current.pulsate();
    }
  }, [disableRipple, focusRipple, focusVisible]);
  function useRippleHandler(rippleAction, eventCallback, skipRippleAction = disableTouchRipple) {
    return useEventCallback_default((event) => {
      if (eventCallback) {
        eventCallback(event);
      }
      const ignore = skipRippleAction;
      if (!ignore && rippleRef.current) {
        rippleRef.current[rippleAction](event);
      }
      return true;
    });
  }
  const handleMouseDown = useRippleHandler("start", onMouseDown);
  const handleDragLeave = useRippleHandler("stop", onDragLeave);
  const handleMouseUp = useRippleHandler("stop", onMouseUp);
  const handleMouseLeave = useRippleHandler("stop", (event) => {
    if (focusVisible) {
      event.preventDefault();
    }
    if (onMouseLeave) {
      onMouseLeave(event);
    }
  });
  const handleTouchStart = useRippleHandler("start", onTouchStart);
  const handleTouchEnd = useRippleHandler("stop", onTouchEnd);
  const handleTouchMove = useRippleHandler("stop", onTouchMove);
  const handleBlur = useRippleHandler("stop", (event) => {
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  }, false);
  const handleFocus = useEventCallback_default((event) => {
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
      if (onFocusVisible) {
        onFocusVisible(event);
      }
    }
    if (onFocus) {
      onFocus(event);
    }
  });
  const isNonNativeButton = () => {
    const button = buttonRef.current;
    return component && component !== "button" && !(button.tagName === "A" && button.href);
  };
  const keydownRef = React18.useRef(false);
  const handleKeyDown2 = useEventCallback_default((event) => {
    if (focusRipple && !keydownRef.current && focusVisible && rippleRef.current && event.key === " ") {
      keydownRef.current = true;
      event.persist();
      rippleRef.current.stop(event, () => {
        rippleRef.current.start(event);
      });
    }
    if (event.target === event.currentTarget && isNonNativeButton() && event.key === " ") {
      event.preventDefault();
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
    if (event.target === event.currentTarget && isNonNativeButton() && event.key === "Enter" && !disabled) {
      event.preventDefault();
      if (onClick) {
        onClick(event);
      }
    }
  });
  const handleKeyUp = useEventCallback_default((event) => {
    if (focusRipple && event.key === " " && rippleRef.current && focusVisible && !event.defaultPrevented) {
      keydownRef.current = false;
      event.persist();
      rippleRef.current.stop(event, () => {
        rippleRef.current.pulsate(event);
      });
    }
    if (onKeyUp) {
      onKeyUp(event);
    }
    if (onClick && event.target === event.currentTarget && isNonNativeButton() && event.key === " " && !event.defaultPrevented) {
      onClick(event);
    }
  });
  let ComponentProp = component;
  if (ComponentProp === "button" && other.href) {
    ComponentProp = "a";
  }
  const buttonProps = {};
  if (ComponentProp === "button") {
    buttonProps.type = other.type === void 0 ? "button" : other.type;
    buttonProps.disabled = disabled;
  } else {
    if (ComponentProp !== "a" || !other.href) {
      buttonProps.role = "button";
    }
    buttonProps["aria-disabled"] = disabled;
  }
  const handleUserRef = useForkRef_default(buttonRefProp, ref);
  const handleOwnRef = useForkRef_default(focusVisibleRef, buttonRef);
  const handleRef = useForkRef_default(handleUserRef, handleOwnRef);
  const [mountedState, setMountedState] = React18.useState(false);
  React18.useEffect(() => {
    setMountedState(true);
  }, []);
  const enableTouchRipple = mountedState && !disableRipple && !disabled;
  if (false) {
    React18.useEffect(() => {
      if (enableTouchRipple && !rippleRef.current) {
        console.error(["Material-UI: The `component` prop provided to ButtonBase is invalid.", "Please make sure the children prop is rendered in this custom component."].join("\n"));
      }
    }, [enableTouchRipple]);
  }
  const styleProps = _extends({}, props, {
    centerRipple,
    component,
    disabled,
    disableRipple,
    disableTouchRipple,
    focusRipple,
    tabIndex,
    focusVisible
  });
  const classes = useUtilityClasses2(styleProps);
  return /* @__PURE__ */ React18.createElement(ButtonBaseRoot, _extends({
    as: ComponentProp,
    className: clsx_m_default(classes.root, className),
    styleProps,
    onBlur: handleBlur,
    onClick,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown2,
    onKeyUp: handleKeyUp,
    onMouseDown: handleMouseDown,
    onMouseLeave: handleMouseLeave,
    onMouseUp: handleMouseUp,
    onDragLeave: handleDragLeave,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchMove,
    onTouchStart: handleTouchStart,
    ref: handleRef,
    tabIndex: disabled ? -1 : tabIndex
  }, buttonProps, other), children, enableTouchRipple ? /* @__PURE__ */ React18.createElement(TouchRipple_default, _extends({
    ref: rippleRef,
    center: centerRipple
  }, TouchRippleProps)) : null);
});
false ? ButtonBase.propTypes = {
  action: refType_default,
  buttonRef: refType_default,
  centerRipple: import_prop_types9.default.bool,
  children: import_prop_types9.default.node,
  classes: import_prop_types9.default.object,
  className: import_prop_types9.default.string,
  component: elementTypeAcceptingRef_default,
  disabled: import_prop_types9.default.bool,
  disableRipple: import_prop_types9.default.bool,
  disableTouchRipple: import_prop_types9.default.bool,
  focusRipple: import_prop_types9.default.bool,
  focusVisibleClassName: import_prop_types9.default.string,
  href: import_prop_types9.default.any,
  onBlur: import_prop_types9.default.func,
  onClick: import_prop_types9.default.func,
  onDragLeave: import_prop_types9.default.func,
  onFocus: import_prop_types9.default.func,
  onFocusVisible: import_prop_types9.default.func,
  onKeyDown: import_prop_types9.default.func,
  onKeyUp: import_prop_types9.default.func,
  onMouseDown: import_prop_types9.default.func,
  onMouseLeave: import_prop_types9.default.func,
  onMouseUp: import_prop_types9.default.func,
  onTouchEnd: import_prop_types9.default.func,
  onTouchMove: import_prop_types9.default.func,
  onTouchStart: import_prop_types9.default.func,
  sx: import_prop_types9.default.object,
  tabIndex: import_prop_types9.default.oneOfType([import_prop_types9.default.number, import_prop_types9.default.string]),
  TouchRippleProps: import_prop_types9.default.object,
  type: import_prop_types9.default.oneOfType([import_prop_types9.default.oneOf(["button", "reset", "submit"]), import_prop_types9.default.string])
} : void 0;
var ButtonBase_default = ButtonBase;

// ../../node_modules/@material-ui/core/utils/capitalize.js
var capitalize_default = capitalize;

// ../../node_modules/@material-ui/core/Fab/Fab.js
var styles = (theme) => ({
  root: _extends({}, theme.typography.button, {
    minHeight: 36,
    transition: theme.transitions.create(["background-color", "box-shadow", "border-color"], {
      duration: theme.transitions.duration.short
    }),
    borderRadius: "50%",
    padding: 0,
    minWidth: 0,
    width: 56,
    height: 56,
    boxShadow: theme.shadows[6],
    "&:active": {
      boxShadow: theme.shadows[12]
    },
    color: theme.palette.getContrastText(theme.palette.grey[300]),
    backgroundColor: theme.palette.grey[300],
    "&:hover": {
      backgroundColor: theme.palette.grey.A100,
      "@media (hover: none)": {
        backgroundColor: theme.palette.grey[300]
      },
      textDecoration: "none"
    },
    "&$focusVisible": {
      boxShadow: theme.shadows[6]
    },
    "&$disabled": {
      color: theme.palette.action.disabled,
      boxShadow: theme.shadows[0],
      backgroundColor: theme.palette.action.disabledBackground
    }
  }),
  label: {
    width: "100%",
    display: "inherit",
    alignItems: "inherit",
    justifyContent: "inherit"
  },
  primary: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      "@media (hover: none)": {
        backgroundColor: theme.palette.primary.main
      }
    }
  },
  secondary: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
      "@media (hover: none)": {
        backgroundColor: theme.palette.secondary.main
      }
    }
  },
  extended: {
    borderRadius: 48 / 2,
    padding: "0 16px",
    width: "auto",
    minHeight: "auto",
    minWidth: 48,
    height: 48,
    "&$sizeSmall": {
      width: "auto",
      padding: "0 8px",
      borderRadius: 34 / 2,
      minWidth: 34,
      height: 34
    },
    "&$sizeMedium": {
      width: "auto",
      padding: "0 16px",
      borderRadius: 40 / 2,
      minWidth: 40,
      height: 40
    }
  },
  circular: {},
  focusVisible: {},
  disabled: {},
  colorInherit: {
    color: "inherit"
  },
  sizeSmall: {
    width: 40,
    height: 40
  },
  sizeMedium: {
    width: 48,
    height: 48
  }
});
var Fab = /* @__PURE__ */ React19.forwardRef(function Fab2(props, ref) {
  const {
    children,
    classes,
    className,
    color: color2 = "default",
    component = "button",
    disabled = false,
    disableFocusRipple = false,
    focusVisibleClassName,
    size = "large",
    variant = "circular"
  } = props, other = _objectWithoutPropertiesLoose(props, ["children", "classes", "className", "color", "component", "disabled", "disableFocusRipple", "focusVisibleClassName", "size", "variant"]);
  const themeVariantsClasses = useThemeVariants_default(_extends({}, props, {
    color: color2,
    component,
    disabled,
    disableFocusRipple,
    size,
    variant
  }), "MuiFab");
  return /* @__PURE__ */ React19.createElement(ButtonBase_default, _extends({
    className: clsx_m_default(classes.root, classes[variant], themeVariantsClasses, className, size !== "large" && classes[`size${capitalize_default(size)}`], disabled && classes.disabled, {
      primary: classes.primary,
      secondary: classes.secondary,
      inherit: classes.colorInherit
    }[color2]),
    component,
    disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: clsx_m_default(classes.focusVisible, focusVisibleClassName),
    ref
  }, other), /* @__PURE__ */ React19.createElement("span", {
    className: classes.label
  }, children));
});
false ? Fab.propTypes = {
  children: import_prop_types10.default.node,
  classes: import_prop_types10.default.object,
  className: import_prop_types10.default.string,
  color: import_prop_types10.default.oneOf(["default", "inherit", "primary", "secondary"]),
  component: import_prop_types10.default.elementType,
  disabled: import_prop_types10.default.bool,
  disableFocusRipple: import_prop_types10.default.bool,
  disableRipple: import_prop_types10.default.bool,
  focusVisibleClassName: import_prop_types10.default.string,
  href: import_prop_types10.default.string,
  size: import_prop_types10.default.oneOf(["large", "medium", "small"]),
  variant: import_prop_types10.default.oneOfType([import_prop_types10.default.oneOf(["circular", "extended"]), import_prop_types10.default.string])
} : void 0;
var Fab_default = withStyles_default2(styles, {
  name: "MuiFab"
})(Fab);

// ../../node_modules/@material-ui/core/ToggleButton/ToggleButton.js
var React20 = __toModule(require_react());
var import_prop_types11 = __toModule(require_prop_types());
var styles2 = (theme) => ({
  root: _extends({}, theme.typography.button, {
    borderRadius: theme.shape.borderRadius,
    padding: 11,
    border: `1px solid ${alpha(theme.palette.action.active, 0.12)}`,
    color: alpha(theme.palette.action.active, 0.38),
    "&$selected": {
      color: theme.palette.action.active,
      backgroundColor: alpha(theme.palette.action.active, 0.12),
      "&:hover": {
        backgroundColor: alpha(theme.palette.action.active, 0.15)
      }
    },
    "&$disabled": {
      color: alpha(theme.palette.action.disabled, 0.12)
    },
    "&:hover": {
      textDecoration: "none",
      backgroundColor: alpha(theme.palette.text.primary, 0.05),
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    }
  }),
  disabled: {},
  selected: {},
  label: {
    width: "100%",
    display: "inherit",
    alignItems: "inherit",
    justifyContent: "inherit"
  },
  sizeSmall: {
    padding: 7,
    fontSize: theme.typography.pxToRem(13)
  },
  sizeLarge: {
    padding: 15,
    fontSize: theme.typography.pxToRem(15)
  }
});
var ToggleButton = /* @__PURE__ */ React20.forwardRef(function ToggleButton2(props, ref) {
  const {
    children,
    classes,
    className,
    disabled = false,
    disableFocusRipple = false,
    onChange,
    onClick,
    selected,
    size = "medium",
    value
  } = props, other = _objectWithoutPropertiesLoose(props, ["children", "classes", "className", "disabled", "disableFocusRipple", "onChange", "onClick", "selected", "size", "value"]);
  const handleChange = (event) => {
    if (onClick) {
      onClick(event, value);
      if (event.defaultPrevented) {
        return;
      }
    }
    if (onChange) {
      onChange(event, value);
    }
  };
  return /* @__PURE__ */ React20.createElement(ButtonBase_default, _extends({
    className: clsx_m_default(classes.root, className, disabled && classes.disabled, selected && classes.selected, size !== "medium" && classes[`size${capitalize_default(size)}`]),
    disabled,
    focusRipple: !disableFocusRipple,
    ref,
    onClick: handleChange,
    onChange,
    value,
    "aria-pressed": selected
  }, other), /* @__PURE__ */ React20.createElement("span", {
    className: classes.label
  }, children));
});
false ? ToggleButton.propTypes = {
  children: import_prop_types11.default.node,
  classes: import_prop_types11.default.object,
  className: import_prop_types11.default.string,
  disabled: import_prop_types11.default.bool,
  disableFocusRipple: import_prop_types11.default.bool,
  disableRipple: import_prop_types11.default.bool,
  onChange: import_prop_types11.default.func,
  onClick: import_prop_types11.default.func,
  selected: import_prop_types11.default.bool,
  size: import_prop_types11.default.oneOf(["large", "medium", "small"]),
  value: import_prop_types11.default.any.isRequired
} : void 0;
var ToggleButton_default = withStyles_default2(styles2, {
  name: "MuiToggleButton"
})(ToggleButton);

// ../../node_modules/@material-ui/core/ToggleButtonGroup/ToggleButtonGroup.js
var React21 = __toModule(require_react());
var import_react_is = __toModule(require_react_is2());
var import_prop_types12 = __toModule(require_prop_types());

// ../../node_modules/@material-ui/core/ToggleButtonGroup/isValueSelected.js
function isValueSelected(value, candidate) {
  if (candidate === void 0 || value === void 0) {
    return false;
  }
  if (Array.isArray(candidate)) {
    return candidate.indexOf(value) >= 0;
  }
  return value === candidate;
}

// ../../node_modules/@material-ui/core/ToggleButtonGroup/ToggleButtonGroup.js
var styles3 = (theme) => ({
  root: {
    display: "inline-flex",
    borderRadius: theme.shape.borderRadius
  },
  vertical: {
    flexDirection: "column"
  },
  grouped: {},
  groupedHorizontal: {
    "&:not(:first-child)": {
      marginLeft: -1,
      borderLeft: "1px solid transparent",
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    },
    "&:not(:last-child)": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    },
    "&.Mui-selected + &.Mui-selected": {
      borderLeft: 0,
      marginLeft: 0
    }
  },
  groupedVertical: {
    "&:not(:first-child)": {
      marginTop: -1,
      borderTop: "1px solid transparent",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    },
    "&:not(:last-child)": {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
    "&.Mui-selected + &.Mui-selected": {
      borderTop: 0,
      marginTop: 0
    }
  }
});
var ToggleButtonGroup = /* @__PURE__ */ React21.forwardRef(function ToggleButtonGroup2(props, ref) {
  const {
    children,
    classes,
    className,
    exclusive = false,
    onChange,
    orientation = "horizontal",
    size = "medium",
    value
  } = props, other = _objectWithoutPropertiesLoose(props, ["children", "classes", "className", "exclusive", "onChange", "orientation", "size", "value"]);
  const handleChange = (event, buttonValue) => {
    if (!onChange) {
      return;
    }
    const index = value && value.indexOf(buttonValue);
    let newValue;
    if (value && index >= 0) {
      newValue = value.slice();
      newValue.splice(index, 1);
    } else {
      newValue = value ? value.concat(buttonValue) : [buttonValue];
    }
    onChange(event, newValue);
  };
  const handleExclusiveChange = (event, buttonValue) => {
    if (!onChange) {
      return;
    }
    onChange(event, value === buttonValue ? null : buttonValue);
  };
  return /* @__PURE__ */ React21.createElement("div", _extends({
    role: "group",
    className: clsx_m_default(classes.root, className, orientation === "vertical" && classes.vertical),
    ref
  }, other), React21.Children.map(children, (child) => {
    if (!/* @__PURE__ */ React21.isValidElement(child)) {
      return null;
    }
    if (false) {
      if (import_react_is.isFragment(child)) {
        console.error(["Material-UI: The ToggleButtonGroup component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join("\n"));
      }
    }
    return /* @__PURE__ */ React21.cloneElement(child, {
      className: clsx_m_default(classes.grouped, classes[`grouped${capitalize_default(orientation)}`], child.props.className),
      onChange: exclusive ? handleExclusiveChange : handleChange,
      selected: child.props.selected === void 0 ? isValueSelected(child.props.value, value) : child.props.selected,
      size: child.props.size || size
    });
  }));
});
false ? ToggleButtonGroup.propTypes = {
  children: import_prop_types12.default.node,
  classes: import_prop_types12.default.object,
  className: import_prop_types12.default.string,
  exclusive: import_prop_types12.default.bool,
  onChange: import_prop_types12.default.func,
  orientation: import_prop_types12.default.oneOf(["horizontal", "vertical"]),
  size: import_prop_types12.default.oneOf(["large", "medium", "small"]),
  value: import_prop_types12.default.any
} : void 0;
var ToggleButtonGroup_default = withStyles_default2(styles3, {
  name: "MuiToggleButtonGroup"
})(ToggleButtonGroup);

// ../../node_modules/@material-ui/core/Slider/Slider.js
var React22 = __toModule(require_react());
var import_prop_types13 = __toModule(require_prop_types());
var sliderClasses = _extends({}, sliderUnstyledClasses_default, generateUtilityClasses("MuiSlider", ["colorPrimary", "colorSecondary", "thumbColorPrimary", "thumbColorSecondary"]));
var overridesResolver2 = (props, styles4) => {
  const {
    styleProps
  } = props;
  const marks = styleProps.marksProp === true && styleProps.step !== null ? [...Array(Math.floor((styleProps.max - styleProps.min) / styleProps.step) + 1)].map((_3, index) => ({
    value: styleProps.min + styleProps.step * index
  })) : styleProps.marksProp || [];
  const marked = marks.length > 0 && marks.some((mark) => mark.label);
  return deepmerge(styles4.root || {}, _extends({}, styles4[`color${capitalize_default(styleProps.color)}`], {
    [`&.${sliderClasses.disabled}`]: styles4.disabled
  }, marked && styles4.marked, styleProps.orientation === "vertical" && styles4.vertical, styleProps.track === "inverted" && styles4.trackInverted, styleProps.track === false && styles4.trackFalse, {
    [`& .${sliderClasses.rail}`]: styles4.rail,
    [`& .${sliderClasses.track}`]: styles4.track,
    [`& .${sliderClasses.mark}`]: styles4.mark,
    [`& .${sliderClasses.markLabel}`]: styles4.markLabel,
    [`& .${sliderClasses.valueLabel}`]: styles4.valueLabel,
    [`& .${sliderClasses.thumb}`]: _extends({}, styles4.thumb, styles4[`thumbColor${capitalize_default(styleProps.color)}`], {
      [`&.${sliderClasses.disabled}`]: styles4.disabled
    })
  }));
};
var SliderRoot = experimentalStyled_default("span", {}, {
  name: "MuiSlider",
  slot: "Root",
  overridesResolver: overridesResolver2
})(({
  theme,
  styleProps
}) => _extends({
  height: 2,
  width: "100%",
  boxSizing: "content-box",
  padding: "13px 0",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
  touchAction: "none",
  color: theme.palette.primary.main,
  WebkitTapHighlightColor: "transparent"
}, styleProps.color === "secondary" && {
  color: theme.palette.secondary.main
}, {
  [`&.${sliderClasses.disabled}`]: {
    pointerEvents: "none",
    cursor: "default",
    color: theme.palette.grey[400]
  }
}, styleProps.orientation === "vertical" && {
  width: 2,
  height: "100%",
  padding: "0 13px"
}, {
  "@media (pointer: coarse)": _extends({
    padding: "20px 0"
  }, styleProps.orientation === "vertical" && {
    padding: "0 20px"
  }),
  "@media print": {
    colorAdjust: "exact"
  }
}, styleProps.marked && _extends({
  marginBottom: 20
}, styleProps.orientation === "vertical" && {
  marginBottom: "auto",
  marginRight: 20
}), {
  [`& .${sliderClasses.valueLabelCircle}`]: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "currentColor",
    transform: "rotate(-45deg)"
  },
  [`& .${sliderClasses.valueLabelLabel}`]: {
    color: theme.palette.primary.contrastText,
    transform: "rotate(45deg)",
    textAlign: "center"
  }
}));
var SliderRail = experimentalStyled_default("span", {}, {
  name: "MuiSlider",
  slot: "Rail"
})(({
  styleProps
}) => _extends({
  display: "block",
  position: "absolute",
  width: "100%",
  height: 2,
  borderRadius: 1,
  backgroundColor: "currentColor",
  opacity: 0.38
}, styleProps.orientation === "vertical" && {
  height: "100%",
  width: 2
}, styleProps.track === "inverted" && {
  opacity: 1
}));
var SliderTrack = experimentalStyled_default("span", {}, {
  name: "MuiSlider",
  slot: "Track"
})(({
  theme,
  styleProps
}) => _extends({
  display: "block",
  position: "absolute",
  height: 2,
  borderRadius: 1,
  backgroundColor: "currentColor"
}, styleProps.orientation === "vertical" && {
  width: 2
}, styleProps.track === false && {
  display: "none"
}, styleProps.track === "inverted" && {
  backgroundColor: theme.palette.mode === "light" ? lighten(theme.palette.primary.main, 0.62) : darken(theme.palette.primary.main, 0.5)
}));
var SliderThumb = experimentalStyled_default("span", {}, {
  name: "MuiSlider",
  slot: "Thumb"
})(({
  theme,
  styleProps
}) => _extends({
  position: "absolute",
  width: 12,
  height: 12,
  marginLeft: -6,
  marginTop: -5,
  boxSizing: "border-box",
  borderRadius: "50%",
  outline: 0,
  backgroundColor: "currentColor",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: theme.transitions.create(["box-shadow"], {
    duration: theme.transitions.duration.shortest
  }),
  "&::after": {
    position: "absolute",
    content: '""',
    borderRadius: "50%",
    left: -15,
    top: -15,
    right: -15,
    bottom: -15
  },
  [`&:hover, &.${sliderClasses.focusVisible}`]: {
    boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.primary.main, 0.16)}`,
    "@media (hover: none)": {
      boxShadow: "none"
    }
  },
  [`&.${sliderClasses.active}`]: {
    boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.primary.main, 0.16)}`
  },
  [`&.${sliderClasses.disabled}`]: _extends({
    width: 8,
    height: 8,
    marginLeft: -4,
    marginTop: -3
  }, styleProps.orientation === "vertical" && {
    marginLeft: -3,
    marginBottom: -4
  }, {
    "&:hover": {
      boxShadow: "none"
    }
  })
}, styleProps.orientation === "vertical" && {
  marginLeft: -5,
  marginBottom: -6
}, styleProps.color === "secondary" && {
  [`&:hover, &.${sliderClasses.focusVisible}`]: {
    boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.secondary.main, 0.16)}`
  },
  [`&.${sliderClasses.active}`]: {
    boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.secondary.main, 0.16)}`
  }
}));
var SliderValueLabel = experimentalStyled_default(SliderValueLabelUnstyled_default, {}, {
  name: "MuiSlider",
  slot: "ValueLabel"
})(({
  theme
}) => _extends({
  left: "calc(-50% - 4px)",
  [`&.${sliderClasses.valueLabelOpen}`]: {
    transform: "scale(1) translateY(-10px)"
  },
  zIndex: 1
}, theme.typography.body2, {
  fontSize: theme.typography.pxToRem(12),
  lineHeight: 1.2,
  transition: theme.transitions.create(["transform"], {
    duration: theme.transitions.duration.shortest
  }),
  top: -34,
  transformOrigin: "bottom center",
  transform: "scale(0)",
  position: "absolute"
}));
var SliderMark = experimentalStyled_default("span", {}, {
  name: "MuiSlider",
  slot: "Mark"
})(({
  theme,
  styleProps
}) => _extends({
  position: "absolute",
  width: 2,
  height: 2,
  borderRadius: 1,
  backgroundColor: "currentColor"
}, styleProps.markActive && {
  backgroundColor: theme.palette.background.paper,
  opacity: 0.8
}));
var SliderMarkLabel = experimentalStyled_default("span", {}, {
  name: "MuiSlider",
  slot: "MarkLabel"
})(({
  theme,
  styleProps
}) => _extends({}, theme.typography.body2, {
  color: theme.palette.text.secondary,
  position: "absolute",
  top: 26,
  transform: "translateX(-50%)",
  whiteSpace: "nowrap"
}, styleProps.orientation === "vertical" && {
  top: "auto",
  left: 26,
  transform: "translateY(50%)"
}, {
  "@media (pointer: coarse)": _extends({
    top: 40
  }, styleProps.orientation === "vertical" && {
    left: 31
  })
}, styleProps.markLabelActive && {
  color: theme.palette.text.primary
}));
SliderRoot.propTypes = {
  children: import_prop_types13.default.node,
  styleProps: import_prop_types13.default.shape({
    "aria-label": import_prop_types13.default.string,
    "aria-labelledby": import_prop_types13.default.string,
    "aria-valuetext": import_prop_types13.default.string,
    classes: import_prop_types13.default.object,
    color: import_prop_types13.default.oneOf(["primary", "secondary"]),
    defaultValue: import_prop_types13.default.oneOfType([import_prop_types13.default.arrayOf(import_prop_types13.default.number), import_prop_types13.default.number]),
    disabled: import_prop_types13.default.bool,
    getAriaLabel: import_prop_types13.default.func,
    getAriaValueText: import_prop_types13.default.func,
    isRtl: import_prop_types13.default.bool,
    marks: import_prop_types13.default.oneOfType([import_prop_types13.default.arrayOf(import_prop_types13.default.shape({
      label: import_prop_types13.default.node,
      value: import_prop_types13.default.number.isRequired
    })), import_prop_types13.default.bool]),
    max: import_prop_types13.default.number,
    min: import_prop_types13.default.number,
    name: import_prop_types13.default.string,
    onChange: import_prop_types13.default.func,
    onChangeCommitted: import_prop_types13.default.func,
    orientation: import_prop_types13.default.oneOf(["horizontal", "vertical"]),
    scale: import_prop_types13.default.func,
    step: import_prop_types13.default.number,
    track: import_prop_types13.default.oneOf(["inverted", "normal", false]),
    value: import_prop_types13.default.oneOfType([import_prop_types13.default.arrayOf(import_prop_types13.default.number), import_prop_types13.default.number]),
    valueLabelDisplay: import_prop_types13.default.oneOf(["auto", "off", "on"]),
    valueLabelFormat: import_prop_types13.default.oneOfType([import_prop_types13.default.func, import_prop_types13.default.string])
  })
};
var extendUtilityClasses = (styleProps) => {
  const {
    color: color2,
    classes = {}
  } = styleProps;
  return _extends({}, classes, {
    root: clsx_m_default(classes.root, getSliderUtilityClass(`color${capitalize_default(color2)}`), classes[`color${capitalize_default(color2)}`]),
    thumb: clsx_m_default(classes.thumb, getSliderUtilityClass(`thumbColor${capitalize_default(color2)}`), classes[`thumbColor${capitalize_default(color2)}`])
  });
};
var shouldSpreadStyleProps = (Component) => {
  return !Component || !isHostComponent_default(Component);
};
var Slider = /* @__PURE__ */ React22.forwardRef(function Slider2(inputProps, ref) {
  var _componentsProps$root, _componentsProps$thum;
  const props = useThemeProps({
    props: inputProps,
    name: "MuiSlider"
  });
  const {
    components = {},
    componentsProps = {},
    color: color2 = "primary"
  } = props, other = _objectWithoutPropertiesLoose(props, ["components", "componentsProps", "color"]);
  const styleProps = _extends({}, props, {
    color: color2
  });
  const classes = extendUtilityClasses(styleProps);
  return /* @__PURE__ */ React22.createElement(SliderUnstyled_default, _extends({}, other, {
    components: _extends({
      Root: SliderRoot,
      Rail: SliderRail,
      Track: SliderTrack,
      Thumb: SliderThumb,
      ValueLabel: SliderValueLabel,
      Mark: SliderMark,
      MarkLabel: SliderMarkLabel
    }, components),
    componentsProps: _extends({}, componentsProps, {
      root: _extends({}, componentsProps.root, shouldSpreadStyleProps(components.Root) && {
        styleProps: _extends({}, (_componentsProps$root = componentsProps.root) === null || _componentsProps$root === void 0 ? void 0 : _componentsProps$root.styleProps, {
          color: color2
        })
      }),
      thumb: _extends({}, componentsProps.thumb, shouldSpreadStyleProps(components.Thumb) && {
        styleProps: _extends({}, (_componentsProps$thum = componentsProps.thumb) === null || _componentsProps$thum === void 0 ? void 0 : _componentsProps$thum.styleProps, {
          color: color2
        })
      })
    }),
    classes,
    ref
  }));
});
false ? Slider.propTypes = {
  "aria-label": chainPropTypes(import_prop_types13.default.string, (props) => {
    const range = Array.isArray(props.value || props.defaultValue);
    if (range && props["aria-label"] != null) {
      return new Error("Material-UI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.");
    }
    return null;
  }),
  "aria-labelledby": import_prop_types13.default.string,
  "aria-valuetext": chainPropTypes(import_prop_types13.default.string, (props) => {
    const range = Array.isArray(props.value || props.defaultValue);
    if (range && props["aria-valuetext"] != null) {
      return new Error("Material-UI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.");
    }
    return null;
  }),
  children: import_prop_types13.default.node,
  classes: import_prop_types13.default.object,
  color: import_prop_types13.default.oneOf(["primary", "secondary"]),
  components: import_prop_types13.default.shape({
    Mark: import_prop_types13.default.elementType,
    MarkLabel: import_prop_types13.default.elementType,
    Rail: import_prop_types13.default.elementType,
    Root: import_prop_types13.default.elementType,
    Thumb: import_prop_types13.default.elementType,
    Track: import_prop_types13.default.elementType,
    ValueLabel: import_prop_types13.default.elementType
  }),
  componentsProps: import_prop_types13.default.object,
  defaultValue: import_prop_types13.default.oneOfType([import_prop_types13.default.arrayOf(import_prop_types13.default.number), import_prop_types13.default.number]),
  disabled: import_prop_types13.default.bool,
  getAriaLabel: import_prop_types13.default.func,
  getAriaValueText: import_prop_types13.default.func,
  isRtl: import_prop_types13.default.bool,
  marks: import_prop_types13.default.oneOfType([import_prop_types13.default.arrayOf(import_prop_types13.default.shape({
    label: import_prop_types13.default.node,
    value: import_prop_types13.default.number.isRequired
  })), import_prop_types13.default.bool]),
  max: import_prop_types13.default.number,
  min: import_prop_types13.default.number,
  name: import_prop_types13.default.string,
  onChange: import_prop_types13.default.func,
  onChangeCommitted: import_prop_types13.default.func,
  orientation: import_prop_types13.default.oneOf(["horizontal", "vertical"]),
  scale: import_prop_types13.default.func,
  step: import_prop_types13.default.number,
  sx: import_prop_types13.default.object,
  track: import_prop_types13.default.oneOf(["inverted", "normal", false]),
  value: import_prop_types13.default.oneOfType([import_prop_types13.default.arrayOf(import_prop_types13.default.number), import_prop_types13.default.number]),
  valueLabelDisplay: import_prop_types13.default.oneOf(["auto", "off", "on"]),
  valueLabelFormat: import_prop_types13.default.oneOfType([import_prop_types13.default.func, import_prop_types13.default.string])
} : void 0;
var Slider_default = Slider;

// src/DraggableWindow.tsx
var breakPoints = [640, 750, 1024, 1920];
var dragHelper = {
  drag: false
};
async function getDraggableWindow() {
  const {render, React: React23, jsx, css: css3, motion} = await import("./renderer.js");
  const DraggableWindow = ({onShare, position: position2, children}) => {
    const [scale, changeScale] = React23.useState(100);
    const [width2, setWidth] = React23.useState(breakPoints[0]);
    const ref = React23.useRef(null);
    const zbody = React23.useRef(null);
    const marks = [
      {
        value: 30,
        label: "30%"
      },
      {
        value: 100,
        label: "100%"
      },
      {
        value: 250,
        label: "250%"
      }
    ];
    return /* @__PURE__ */ jsx(motion.div, {
      ref,
      css: css3`
            right: 20px;
            top: 20px;
            white-space: normal;
            position: ${position2 ? position2 : "fixed"};
          `,
      dragElastic: 0.5,
      onDrag: (e2) => {
        dragHelper.drag = true;
      },
      onDragEnd: (e2) => {
        dragHelper.drag = false;
      },
      dragMomentum: false,
      drag: true
    }, /* @__PURE__ */ jsx("div", {
      css: css3`
          background: rgb(204,204,204, 06);
          border-radius: 20px;
          width: 600px;
          position: absolute;
          display: flex;
          right: 0;
          top: 0;
      `
    }, /* @__PURE__ */ jsx(ToggleButtonGroup_default, {
      value: width2,
      exclusive: true,
      onChange: (_e, newSize) => setWidth(newSize)
    }, breakPoints.map((size) => /* @__PURE__ */ jsx(ToggleButton_default, {
      key: size,
      value: size
    }, size, "px"))), /* @__PURE__ */ jsx("div", {
      css: css3`
                margin-left: 40px;
                margin-right: 40px;
                vertical-align: middle;
                display: inline-block;
                width: 200px;
          `
    }, /* @__PURE__ */ jsx(Slider_default, {
      value: scale,
      onChange: (_e, v) => {
        if (typeof v === "object") {
          return;
        }
        _e.stopPropagation();
        changeScale(v);
      },
      step: 10,
      marks,
      min: 30,
      max: 250
    }, scale, "%")), /* @__PURE__ */ jsx(Fab_default, {
      variant: "extended",
      onClick: () => {
        console.log(ref.current.clientHeight);
        onShare();
      }
    }, "Export")), /* @__PURE__ */ jsx(motion.div, {
      animate: {
        transformOrigin: "top right",
        width: width2,
        scale: scale / 100
      },
      css: css3`  
            top: 60px;
            max-width: 100%;
            z-index: 10;
            position: relative;
            min-width: 300px;
            min-height: 250px;
            background: inherit;
            border-radius: 2px;
            overflow-x: hidden;
            padding: 24px;
         
          
          :after{
           content: '';
           z-index: -9;
           background: inherit; 
           position: absolute;
           left: 16px;
           right: 16px;
           top: 16px;  
           bottom: 16px;
           box-shadow: inset 0 0 0 200px rgba(255,255,255,0.35);
           filter: blur(10px);
          }
          >div{
            background: white;
            padding:10px;
            border-radius: 12px;
            opacity: 0.9;
          }
    `
    }, /* @__PURE__ */ jsx("div", {
      id: "zbody",
      ref: zbody
    }, children)));
  };
  return DraggableWindow;
}
export {
  getDraggableWindow
};

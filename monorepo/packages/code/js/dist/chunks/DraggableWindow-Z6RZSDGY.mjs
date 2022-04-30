import {
  emotion_cache_browser_esm_default,
  emotion_memoize_browser_esm_default
} from "./chunk-AQGKM5PG.mjs";
import {
  __commonJS,
  __toESM
} from "./chunk-BZTAI3VG.mjs";

// ../../node_modules/prop-types/lib/ReactPropTypesSecret.js
var require_ReactPropTypesSecret = __commonJS({
  "../../node_modules/prop-types/lib/ReactPropTypesSecret.js"(exports, module) {
    "use strict";
    var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    module.exports = ReactPropTypesSecret;
  }
});

// ../../node_modules/prop-types/factoryWithThrowingShims.js
var require_factoryWithThrowingShims = __commonJS({
  "../../node_modules/prop-types/factoryWithThrowingShims.js"(exports, module) {
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
        bigint: shim,
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
  }
});

// ../../node_modules/prop-types/index.js
var require_prop_types = __commonJS({
  "../../node_modules/prop-types/index.js"(exports, module) {
    if (false) {
      ReactIs = null;
      throwOnDirectAccess = true;
      module.exports = null(ReactIs.isElement, throwOnDirectAccess);
    } else {
      module.exports = require_factoryWithThrowingShims()();
    }
    var ReactIs;
    var throwOnDirectAccess;
  }
});

// ../../node_modules/react-is/cjs/react-is.production.min.js
var require_react_is_production_min = __commonJS({
  "../../node_modules/react-is/cjs/react-is.production.min.js"(exports) {
    "use strict";
    var b2 = 60103;
    var c2 = 60106;
    var d2 = 60107;
    var e3 = 60108;
    var f2 = 60114;
    var g2 = 60109;
    var h2 = 60110;
    var k2 = 60112;
    var l2 = 60113;
    var m2 = 60120;
    var n2 = 60115;
    var p = 60116;
    var q = 60121;
    var r2 = 60122;
    var u3 = 60117;
    var v = 60129;
    var w2 = 60131;
    if (typeof Symbol === "function" && Symbol.for) {
      x2 = Symbol.for;
      b2 = x2("react.element");
      c2 = x2("react.portal");
      d2 = x2("react.fragment");
      e3 = x2("react.strict_mode");
      f2 = x2("react.profiler");
      g2 = x2("react.provider");
      h2 = x2("react.context");
      k2 = x2("react.forward_ref");
      l2 = x2("react.suspense");
      m2 = x2("react.suspense_list");
      n2 = x2("react.memo");
      p = x2("react.lazy");
      q = x2("react.block");
      r2 = x2("react.server.block");
      u3 = x2("react.fundamental");
      v = x2("react.debug_trace_mode");
      w2 = x2("react.legacy_hidden");
    }
    var x2;
    function y2(a2) {
      if (typeof a2 === "object" && a2 !== null) {
        var t2 = a2.$$typeof;
        switch (t2) {
          case b2:
            switch (a2 = a2.type, a2) {
              case d2:
              case f2:
              case e3:
              case l2:
              case m2:
                return a2;
              default:
                switch (a2 = a2 && a2.$$typeof, a2) {
                  case h2:
                  case k2:
                  case p:
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
    var A = b2;
    var B2 = k2;
    var C3 = d2;
    var D2 = p;
    var E2 = n2;
    var F = c2;
    var G = f2;
    var H3 = e3;
    var I3 = l2;
    exports.ContextConsumer = h2;
    exports.ContextProvider = z2;
    exports.Element = A;
    exports.ForwardRef = B2;
    exports.Fragment = C3;
    exports.Lazy = D2;
    exports.Memo = E2;
    exports.Portal = F;
    exports.Profiler = G;
    exports.StrictMode = H3;
    exports.Suspense = I3;
    exports.isAsyncMode = function() {
      return false;
    };
    exports.isConcurrentMode = function() {
      return false;
    };
    exports.isContextConsumer = function(a2) {
      return y2(a2) === h2;
    };
    exports.isContextProvider = function(a2) {
      return y2(a2) === g2;
    };
    exports.isElement = function(a2) {
      return typeof a2 === "object" && a2 !== null && a2.$$typeof === b2;
    };
    exports.isForwardRef = function(a2) {
      return y2(a2) === k2;
    };
    exports.isFragment = function(a2) {
      return y2(a2) === d2;
    };
    exports.isLazy = function(a2) {
      return y2(a2) === p;
    };
    exports.isMemo = function(a2) {
      return y2(a2) === n2;
    };
    exports.isPortal = function(a2) {
      return y2(a2) === c2;
    };
    exports.isProfiler = function(a2) {
      return y2(a2) === f2;
    };
    exports.isStrictMode = function(a2) {
      return y2(a2) === e3;
    };
    exports.isSuspense = function(a2) {
      return y2(a2) === l2;
    };
    exports.isValidElementType = function(a2) {
      return typeof a2 === "string" || typeof a2 === "function" || a2 === d2 || a2 === f2 || a2 === v || a2 === e3 || a2 === l2 || a2 === m2 || a2 === w2 || typeof a2 === "object" && a2 !== null && (a2.$$typeof === p || a2.$$typeof === n2 || a2.$$typeof === g2 || a2.$$typeof === h2 || a2.$$typeof === k2 || a2.$$typeof === u3 || a2.$$typeof === q || a2[0] === r2) ? true : false;
    };
    exports.typeOf = y2;
  }
});

// ../../node_modules/react-is/index.js
var require_react_is = __commonJS({
  "../../node_modules/react-is/index.js"(exports, module) {
    "use strict";
    if (true) {
      module.exports = require_react_is_production_min();
    } else {
      module.exports = null;
    }
  }
});

// js/DraggableWindow.tsx
import { css as css3, jsx as jsx3 } from "https://spike.land/dist/emotion.mjs";
import { useEffect as useEffect29, useRef as useRef29, useState as useState24 } from "https://spike.land/dist/react.mjs";
import { motion as motion2 } from "https://spike.land/dist/framer-motion.mjs";

// js/Qr.tsx
import { jsx as jsx2 } from "https://spike.land/dist/emotion.mjs";
import { css as css2 } from "https://spike.land/dist/emotion.mjs";
import { motion } from "https://spike.land/dist/framer-motion.mjs";
import { useEffect as useEffect28, useRef as useRef28, useState as useState23 } from "https://spike.land/dist/react.mjs";

// ../qrious/dist/QRious.mjs
var ve = Object.create;
var O = Object.defineProperty;
var _e = Object.getOwnPropertyDescriptor;
var be = Object.getOwnPropertyNames;
var me = Object.getPrototypeOf;
var pe = Object.prototype.hasOwnProperty;
var o = (t2, e3) => () => (e3 || t2((e3 = { exports: {} }).exports, e3), e3.exports);
var ke = (t2, e3, i2, r2) => {
  if (e3 && typeof e3 == "object" || typeof e3 == "function")
    for (let x2 of be(e3))
      !pe.call(t2, x2) && x2 !== i2 && O(t2, x2, { get: () => e3[x2], enumerable: !(r2 = _e(e3, x2)) || r2.enumerable });
  return t2;
};
var N = (t2, e3, i2) => (i2 = t2 != null ? ve(me(t2)) : {}, ke(e3 || !t2 || !t2.__esModule ? O(i2, "default", { value: t2, enumerable: true }) : i2, t2));
var E = o((o0, A) => {
  "use strict";
  var w2 = function() {
  }, ge = Object.prototype.hasOwnProperty, we = Array.prototype.slice;
  function Be(t2, e3) {
    var i2;
    return typeof Object.create == "function" ? i2 = Object.create(t2) : (w2.prototype = t2, i2 = new w2(), w2.prototype = null), e3 && y2(true, i2, e3), i2;
  }
  function Me(t2, e3, i2, r2) {
    var x2 = this;
    return typeof t2 != "string" && (r2 = i2, i2 = e3, e3 = t2, t2 = null), typeof e3 != "function" && (r2 = i2, i2 = e3, e3 = function() {
      return x2.apply(this, arguments);
    }), y2(false, e3, x2, r2), e3.prototype = Be(x2.prototype, i2), e3.prototype.constructor = e3, e3.class_ = t2 || x2.class_, e3.super_ = x2, e3;
  }
  function y2(t2, e3, i2) {
    i2 = we.call(arguments, 2);
    for (var r2, x2, s2 = 0, a2 = i2.length; s2 < a2; s2++) {
      x2 = i2[s2];
      for (r2 in x2)
        (!t2 || ge.call(x2, r2)) && (e3[r2] = x2[r2]);
    }
  }
  A.exports = Me;
});
var C = o((c0, S) => {
  "use strict";
  var qe = E();
  function p() {
  }
  p.class_ = "Nevis";
  p.super_ = Object;
  p.extend = qe;
  S.exports = p;
});
var u = o((u0, L2) => {
  "use strict";
  L2.exports = C();
});
var B = o((h0, R) => {
  "use strict";
  var Oe = u(), Ne = Oe.extend(function(t2, e3, i2) {
    this.qrious = t2, this.element = e3, this.element.qrious = t2, this.enabled = Boolean(i2);
  }, { draw: function(t2) {
  }, getElement: function() {
    return this.enabled || (this.enabled = true, this.render()), this.element;
  }, getModuleSize: function(t2) {
    var e3 = this.qrious, i2 = e3.padding || 0, r2 = Math.floor((e3.size - i2 * 2) / t2.width);
    return Math.max(1, r2);
  }, getOffset: function(t2) {
    var e3 = this.qrious, i2 = e3.padding;
    if (i2 != null)
      return i2;
    var r2 = this.getModuleSize(t2), x2 = Math.floor((e3.size - r2 * t2.width) / 2);
    return Math.max(0, x2);
  }, render: function(t2) {
    this.enabled && (this.resize(), this.reset(), this.draw(t2));
  }, reset: function() {
  }, resize: function() {
  } });
  R.exports = Ne;
});
var j = o((d0, T2) => {
  "use strict";
  var ye = B(), Ae = ye.extend({ draw: function(t2) {
    var e3, i2, r2 = this.qrious, x2 = this.getModuleSize(t2), s2 = this.getOffset(t2), a2 = this.element.getContext("2d");
    for (a2.fillStyle = r2.foreground, a2.globalAlpha = r2.foregroundAlpha, e3 = 0; e3 < t2.width; e3++)
      for (i2 = 0; i2 < t2.width; i2++)
        t2.buffer[i2 * t2.width + e3] && a2.fillRect(x2 * e3 + s2, x2 * i2 + s2, x2, x2);
  }, reset: function() {
    var t2 = this.qrious, e3 = this.element.getContext("2d"), i2 = t2.size;
    e3.lineWidth = 1, e3.clearRect(0, 0, i2, i2), e3.fillStyle = t2.background, e3.globalAlpha = t2.backgroundAlpha, e3.fillRect(0, 0, i2, i2);
  }, resize: function() {
    var t2 = this.element;
    t2.width = t2.height = this.qrious.size;
  } });
  T2.exports = Ae;
});
var I = o((l0, z2) => {
  "use strict";
  var Ee = u(), Se = Ee.extend(null, { BLOCK: [0, 11, 15, 19, 23, 27, 31, 16, 18, 20, 22, 24, 26, 28, 20, 22, 24, 24, 26, 28, 28, 22, 24, 24, 26, 26, 28, 28, 24, 24, 26, 26, 26, 28, 28, 24, 26, 26, 26, 28, 28] });
  z2.exports = Se;
});
var V = o((v0, P2) => {
  "use strict";
  var Ce = u(), Le = Ce.extend(null, { BLOCKS: [1, 0, 19, 7, 1, 0, 16, 10, 1, 0, 13, 13, 1, 0, 9, 17, 1, 0, 34, 10, 1, 0, 28, 16, 1, 0, 22, 22, 1, 0, 16, 28, 1, 0, 55, 15, 1, 0, 44, 26, 2, 0, 17, 18, 2, 0, 13, 22, 1, 0, 80, 20, 2, 0, 32, 18, 2, 0, 24, 26, 4, 0, 9, 16, 1, 0, 108, 26, 2, 0, 43, 24, 2, 2, 15, 18, 2, 2, 11, 22, 2, 0, 68, 18, 4, 0, 27, 16, 4, 0, 19, 24, 4, 0, 15, 28, 2, 0, 78, 20, 4, 0, 31, 18, 2, 4, 14, 18, 4, 1, 13, 26, 2, 0, 97, 24, 2, 2, 38, 22, 4, 2, 18, 22, 4, 2, 14, 26, 2, 0, 116, 30, 3, 2, 36, 22, 4, 4, 16, 20, 4, 4, 12, 24, 2, 2, 68, 18, 4, 1, 43, 26, 6, 2, 19, 24, 6, 2, 15, 28, 4, 0, 81, 20, 1, 4, 50, 30, 4, 4, 22, 28, 3, 8, 12, 24, 2, 2, 92, 24, 6, 2, 36, 22, 4, 6, 20, 26, 7, 4, 14, 28, 4, 0, 107, 26, 8, 1, 37, 22, 8, 4, 20, 24, 12, 4, 11, 22, 3, 1, 115, 30, 4, 5, 40, 24, 11, 5, 16, 20, 11, 5, 12, 24, 5, 1, 87, 22, 5, 5, 41, 24, 5, 7, 24, 30, 11, 7, 12, 24, 5, 1, 98, 24, 7, 3, 45, 28, 15, 2, 19, 24, 3, 13, 15, 30, 1, 5, 107, 28, 10, 1, 46, 28, 1, 15, 22, 28, 2, 17, 14, 28, 5, 1, 120, 30, 9, 4, 43, 26, 17, 1, 22, 28, 2, 19, 14, 28, 3, 4, 113, 28, 3, 11, 44, 26, 17, 4, 21, 26, 9, 16, 13, 26, 3, 5, 107, 28, 3, 13, 41, 26, 15, 5, 24, 30, 15, 10, 15, 28, 4, 4, 116, 28, 17, 0, 42, 26, 17, 6, 22, 28, 19, 6, 16, 30, 2, 7, 111, 28, 17, 0, 46, 28, 7, 16, 24, 30, 34, 0, 13, 24, 4, 5, 121, 30, 4, 14, 47, 28, 11, 14, 24, 30, 16, 14, 15, 30, 6, 4, 117, 30, 6, 14, 45, 28, 11, 16, 24, 30, 30, 2, 16, 30, 8, 4, 106, 26, 8, 13, 47, 28, 7, 22, 24, 30, 22, 13, 15, 30, 10, 2, 114, 28, 19, 4, 46, 28, 28, 6, 22, 28, 33, 4, 16, 30, 8, 4, 122, 30, 22, 3, 45, 28, 8, 26, 23, 30, 12, 28, 15, 30, 3, 10, 117, 30, 3, 23, 45, 28, 4, 31, 24, 30, 11, 31, 15, 30, 7, 7, 116, 30, 21, 7, 45, 28, 1, 37, 23, 30, 19, 26, 15, 30, 5, 10, 115, 30, 19, 10, 47, 28, 15, 25, 24, 30, 23, 25, 15, 30, 13, 3, 115, 30, 2, 29, 46, 28, 42, 1, 24, 30, 23, 28, 15, 30, 17, 0, 115, 30, 10, 23, 46, 28, 10, 35, 24, 30, 19, 35, 15, 30, 17, 1, 115, 30, 14, 21, 46, 28, 29, 19, 24, 30, 11, 46, 15, 30, 13, 6, 115, 30, 14, 23, 46, 28, 44, 7, 24, 30, 59, 1, 16, 30, 12, 7, 121, 30, 12, 26, 47, 28, 39, 14, 24, 30, 22, 41, 15, 30, 6, 14, 121, 30, 6, 34, 47, 28, 46, 10, 24, 30, 2, 64, 15, 30, 17, 4, 122, 30, 29, 14, 46, 28, 49, 10, 24, 30, 24, 46, 15, 30, 4, 18, 122, 30, 13, 32, 46, 28, 48, 14, 24, 30, 42, 32, 15, 30, 20, 4, 117, 30, 40, 7, 47, 28, 43, 22, 24, 30, 10, 67, 15, 30, 19, 6, 118, 30, 18, 31, 47, 28, 34, 34, 24, 30, 20, 61, 15, 30], FINAL_FORMAT: [30660, 29427, 32170, 30877, 26159, 25368, 27713, 26998, 21522, 20773, 24188, 23371, 17913, 16590, 20375, 19104, 13663, 12392, 16177, 14854, 9396, 8579, 11994, 11245, 5769, 5054, 7399, 6608, 1890, 597, 3340, 2107], LEVELS: { L: 1, M: 2, Q: 3, H: 4 } });
  P2.exports = Le;
});
var K = o((_0, G) => {
  "use strict";
  var Re = u(), Te = Re.extend(null, { EXPONENT: [1, 2, 4, 8, 16, 32, 64, 128, 29, 58, 116, 232, 205, 135, 19, 38, 76, 152, 45, 90, 180, 117, 234, 201, 143, 3, 6, 12, 24, 48, 96, 192, 157, 39, 78, 156, 37, 74, 148, 53, 106, 212, 181, 119, 238, 193, 159, 35, 70, 140, 5, 10, 20, 40, 80, 160, 93, 186, 105, 210, 185, 111, 222, 161, 95, 190, 97, 194, 153, 47, 94, 188, 101, 202, 137, 15, 30, 60, 120, 240, 253, 231, 211, 187, 107, 214, 177, 127, 254, 225, 223, 163, 91, 182, 113, 226, 217, 175, 67, 134, 17, 34, 68, 136, 13, 26, 52, 104, 208, 189, 103, 206, 129, 31, 62, 124, 248, 237, 199, 147, 59, 118, 236, 197, 151, 51, 102, 204, 133, 23, 46, 92, 184, 109, 218, 169, 79, 158, 33, 66, 132, 21, 42, 84, 168, 77, 154, 41, 82, 164, 85, 170, 73, 146, 57, 114, 228, 213, 183, 115, 230, 209, 191, 99, 198, 145, 63, 126, 252, 229, 215, 179, 123, 246, 241, 255, 227, 219, 171, 75, 150, 49, 98, 196, 149, 55, 110, 220, 165, 87, 174, 65, 130, 25, 50, 100, 200, 141, 7, 14, 28, 56, 112, 224, 221, 167, 83, 166, 81, 162, 89, 178, 121, 242, 249, 239, 195, 155, 43, 86, 172, 69, 138, 9, 18, 36, 72, 144, 61, 122, 244, 245, 247, 243, 251, 235, 203, 139, 11, 22, 44, 88, 176, 125, 250, 233, 207, 131, 27, 54, 108, 216, 173, 71, 142, 0], LOG: [255, 0, 1, 25, 2, 50, 26, 198, 3, 223, 51, 238, 27, 104, 199, 75, 4, 100, 224, 14, 52, 141, 239, 129, 28, 193, 105, 248, 200, 8, 76, 113, 5, 138, 101, 47, 225, 36, 15, 33, 53, 147, 142, 218, 240, 18, 130, 69, 29, 181, 194, 125, 106, 39, 249, 185, 201, 154, 9, 120, 77, 228, 114, 166, 6, 191, 139, 98, 102, 221, 48, 253, 226, 152, 37, 179, 16, 145, 34, 136, 54, 208, 148, 206, 143, 150, 219, 189, 241, 210, 19, 92, 131, 56, 70, 64, 30, 66, 182, 163, 195, 72, 126, 110, 107, 58, 40, 84, 250, 133, 186, 61, 202, 94, 155, 159, 10, 21, 121, 43, 78, 212, 229, 172, 115, 243, 167, 87, 7, 112, 192, 247, 140, 128, 99, 13, 103, 74, 222, 237, 49, 197, 254, 24, 227, 165, 153, 119, 38, 184, 180, 124, 17, 68, 146, 217, 35, 32, 137, 46, 55, 63, 209, 91, 149, 188, 207, 205, 144, 135, 151, 178, 220, 252, 190, 97, 242, 86, 211, 171, 20, 42, 93, 158, 132, 60, 57, 83, 71, 109, 65, 162, 31, 45, 67, 216, 183, 123, 164, 118, 196, 23, 73, 236, 127, 12, 111, 246, 108, 161, 59, 82, 41, 157, 85, 170, 251, 96, 134, 177, 187, 204, 62, 90, 203, 89, 95, 176, 156, 169, 160, 81, 11, 245, 22, 235, 122, 117, 44, 215, 79, 174, 213, 233, 230, 231, 173, 232, 116, 214, 244, 234, 168, 80, 88, 175] });
  G.exports = Te;
});
var D = o((b0, U) => {
  "use strict";
  var je = u(), ze = je.extend(null, { BLOCK: [3220, 1468, 2713, 1235, 3062, 1890, 2119, 1549, 2344, 2936, 1117, 2583, 1330, 2470, 1667, 2249, 2028, 3780, 481, 4011, 142, 3098, 831, 3445, 592, 2517, 1776, 2234, 1951, 2827, 1070, 2660, 1345, 3177] });
  U.exports = ze;
});
var Q = o((m0, F) => {
  "use strict";
  var Ie = u(), Pe = I(), _3 = V(), l2 = K(), Ve = D(), c2 = Ie.extend(function(t2) {
    var e3, i2, r2, x2, s2, a2 = t2.value.length;
    for (this._badness = [], this._level = _3.LEVELS[t2.level], this._polynomial = [], this._value = t2.value, this._version = 0, this._stringBuffer = []; this._version < 40 && (this._version++, r2 = (this._level - 1) * 4 + (this._version - 1) * 16, x2 = _3.BLOCKS[r2++], s2 = _3.BLOCKS[r2++], e3 = _3.BLOCKS[r2++], i2 = _3.BLOCKS[r2], r2 = e3 * (x2 + s2) + s2 - 3 + (this._version <= 9), !(a2 <= r2)); )
      ;
    this._dataBlock = e3, this._eccBlock = i2, this._neccBlock1 = x2, this._neccBlock2 = s2;
    var n2 = this.width = 17 + 4 * this._version;
    this.buffer = c2._createArray(n2 * n2), this._ecc = c2._createArray(e3 + (e3 + i2) * (x2 + s2) + s2), this._mask = c2._createArray((n2 * (n2 + 1) + 1) / 2), this._insertFinders(), this._insertAlignments(), this.buffer[8 + n2 * (n2 - 8)] = 1, this._insertTimingGap(), this._reverseMask(), this._insertTimingRowAndColumn(), this._insertVersion(), this._syncMask(), this._convertBitStream(a2), this._calculatePolynomial(), this._appendEccToData(), this._interleaveBlocks(), this._pack(), this._finish();
  }, { _addAlignment: function(t2, e3) {
    var i2, r2 = this.buffer, x2 = this.width;
    for (r2[t2 + x2 * e3] = 1, i2 = -2; i2 < 2; i2++)
      r2[t2 + i2 + x2 * (e3 - 2)] = 1, r2[t2 - 2 + x2 * (e3 + i2 + 1)] = 1, r2[t2 + 2 + x2 * (e3 + i2)] = 1, r2[t2 + i2 + 1 + x2 * (e3 + 2)] = 1;
    for (i2 = 0; i2 < 2; i2++)
      this._setMask(t2 - 1, e3 + i2), this._setMask(t2 + 1, e3 - i2), this._setMask(t2 - i2, e3 - 1), this._setMask(t2 + i2, e3 + 1);
  }, _appendData: function(t2, e3, i2, r2) {
    var x2, s2, a2, n2 = this._polynomial, f2 = this._stringBuffer;
    for (s2 = 0; s2 < r2; s2++)
      f2[i2 + s2] = 0;
    for (s2 = 0; s2 < e3; s2++) {
      if (x2 = l2.LOG[f2[t2 + s2] ^ f2[i2]], x2 !== 255)
        for (a2 = 1; a2 < r2; a2++)
          f2[i2 + a2 - 1] = f2[i2 + a2] ^ l2.EXPONENT[c2._modN(x2 + n2[r2 - a2])];
      else
        for (a2 = i2; a2 < i2 + r2; a2++)
          f2[a2] = f2[a2 + 1];
      f2[i2 + r2 - 1] = x2 === 255 ? 0 : l2.EXPONENT[c2._modN(x2 + n2[0])];
    }
  }, _appendEccToData: function() {
    var t2, e3 = 0, i2 = this._dataBlock, r2 = this._calculateMaxLength(), x2 = this._eccBlock;
    for (t2 = 0; t2 < this._neccBlock1; t2++)
      this._appendData(e3, i2, r2, x2), e3 += i2, r2 += x2;
    for (t2 = 0; t2 < this._neccBlock2; t2++)
      this._appendData(e3, i2 + 1, r2, x2), e3 += i2 + 1, r2 += x2;
  }, _applyMask: function(t2) {
    var e3, i2, r2, x2, s2 = this.buffer, a2 = this.width;
    switch (t2) {
      case 0:
        for (x2 = 0; x2 < a2; x2++)
          for (r2 = 0; r2 < a2; r2++)
            !(r2 + x2 & 1) && !this._isMasked(r2, x2) && (s2[r2 + x2 * a2] ^= 1);
        break;
      case 1:
        for (x2 = 0; x2 < a2; x2++)
          for (r2 = 0; r2 < a2; r2++)
            !(x2 & 1) && !this._isMasked(r2, x2) && (s2[r2 + x2 * a2] ^= 1);
        break;
      case 2:
        for (x2 = 0; x2 < a2; x2++)
          for (e3 = 0, r2 = 0; r2 < a2; r2++, e3++)
            e3 === 3 && (e3 = 0), !e3 && !this._isMasked(r2, x2) && (s2[r2 + x2 * a2] ^= 1);
        break;
      case 3:
        for (i2 = 0, x2 = 0; x2 < a2; x2++, i2++)
          for (i2 === 3 && (i2 = 0), e3 = i2, r2 = 0; r2 < a2; r2++, e3++)
            e3 === 3 && (e3 = 0), !e3 && !this._isMasked(r2, x2) && (s2[r2 + x2 * a2] ^= 1);
        break;
      case 4:
        for (x2 = 0; x2 < a2; x2++)
          for (e3 = 0, i2 = x2 >> 1 & 1, r2 = 0; r2 < a2; r2++, e3++)
            e3 === 3 && (e3 = 0, i2 = !i2), !i2 && !this._isMasked(r2, x2) && (s2[r2 + x2 * a2] ^= 1);
        break;
      case 5:
        for (i2 = 0, x2 = 0; x2 < a2; x2++, i2++)
          for (i2 === 3 && (i2 = 0), e3 = 0, r2 = 0; r2 < a2; r2++, e3++)
            e3 === 3 && (e3 = 0), !((r2 & x2 & 1) + !(!e3 | !i2)) && !this._isMasked(r2, x2) && (s2[r2 + x2 * a2] ^= 1);
        break;
      case 6:
        for (i2 = 0, x2 = 0; x2 < a2; x2++, i2++)
          for (i2 === 3 && (i2 = 0), e3 = 0, r2 = 0; r2 < a2; r2++, e3++)
            e3 === 3 && (e3 = 0), !((r2 & x2 & 1) + (e3 && e3 === i2) & 1) && !this._isMasked(r2, x2) && (s2[r2 + x2 * a2] ^= 1);
        break;
      case 7:
        for (i2 = 0, x2 = 0; x2 < a2; x2++, i2++)
          for (i2 === 3 && (i2 = 0), e3 = 0, r2 = 0; r2 < a2; r2++, e3++)
            e3 === 3 && (e3 = 0), !((e3 && e3 === i2) + (r2 + x2 & 1) & 1) && !this._isMasked(r2, x2) && (s2[r2 + x2 * a2] ^= 1);
        break;
    }
  }, _calculateMaxLength: function() {
    return this._dataBlock * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;
  }, _calculatePolynomial: function() {
    var t2, e3, i2 = this._eccBlock, r2 = this._polynomial;
    for (r2[0] = 1, t2 = 0; t2 < i2; t2++) {
      for (r2[t2 + 1] = 1, e3 = t2; e3 > 0; e3--)
        r2[e3] = r2[e3] ? r2[e3 - 1] ^ l2.EXPONENT[c2._modN(l2.LOG[r2[e3]] + t2)] : r2[e3 - 1];
      r2[0] = l2.EXPONENT[c2._modN(l2.LOG[r2[0]] + t2)];
    }
    for (t2 = 0; t2 <= i2; t2++)
      r2[t2] = l2.LOG[r2[t2]];
  }, _checkBadness: function() {
    var t2, e3, i2, r2, x2, s2 = 0, a2 = this._badness, n2 = this.buffer, f2 = this.width;
    for (x2 = 0; x2 < f2 - 1; x2++)
      for (r2 = 0; r2 < f2 - 1; r2++)
        (n2[r2 + f2 * x2] && n2[r2 + 1 + f2 * x2] && n2[r2 + f2 * (x2 + 1)] && n2[r2 + 1 + f2 * (x2 + 1)] || !(n2[r2 + f2 * x2] || n2[r2 + 1 + f2 * x2] || n2[r2 + f2 * (x2 + 1)] || n2[r2 + 1 + f2 * (x2 + 1)])) && (s2 += c2.N2);
    var h2 = 0;
    for (x2 = 0; x2 < f2; x2++) {
      for (i2 = 0, a2[0] = 0, t2 = 0, r2 = 0; r2 < f2; r2++)
        e3 = n2[r2 + f2 * x2], t2 === e3 ? a2[i2]++ : a2[++i2] = 1, t2 = e3, h2 += t2 ? 1 : -1;
      s2 += this._getBadness(i2);
    }
    h2 < 0 && (h2 = -h2);
    var q = 0, b2 = h2;
    for (b2 += b2 << 2, b2 <<= 1; b2 > f2 * f2; )
      b2 -= f2 * f2, q++;
    for (s2 += q * c2.N4, r2 = 0; r2 < f2; r2++) {
      for (i2 = 0, a2[0] = 0, t2 = 0, x2 = 0; x2 < f2; x2++)
        e3 = n2[r2 + f2 * x2], t2 === e3 ? a2[i2]++ : a2[++i2] = 1, t2 = e3;
      s2 += this._getBadness(i2);
    }
    return s2;
  }, _convertBitStream: function(t2) {
    var e3, i2, r2 = this._ecc, x2 = this._version;
    for (i2 = 0; i2 < t2; i2++)
      r2[i2] = this._value.charCodeAt(i2);
    var s2 = this._stringBuffer = r2.slice(), a2 = this._calculateMaxLength();
    t2 >= a2 - 2 && (t2 = a2 - 2, x2 > 9 && t2--);
    var n2 = t2;
    if (x2 > 9) {
      for (s2[n2 + 2] = 0, s2[n2 + 3] = 0; n2--; )
        e3 = s2[n2], s2[n2 + 3] |= 255 & e3 << 4, s2[n2 + 2] = e3 >> 4;
      s2[2] |= 255 & t2 << 4, s2[1] = t2 >> 4, s2[0] = 64 | t2 >> 12;
    } else {
      for (s2[n2 + 1] = 0, s2[n2 + 2] = 0; n2--; )
        e3 = s2[n2], s2[n2 + 2] |= 255 & e3 << 4, s2[n2 + 1] = e3 >> 4;
      s2[1] |= 255 & t2 << 4, s2[0] = 64 | t2 >> 4;
    }
    for (n2 = t2 + 3 - (x2 < 10); n2 < a2; )
      s2[n2++] = 236, s2[n2++] = 17;
  }, _getBadness: function(t2) {
    var e3, i2 = 0, r2 = this._badness;
    for (e3 = 0; e3 <= t2; e3++)
      r2[e3] >= 5 && (i2 += c2.N1 + r2[e3] - 5);
    for (e3 = 3; e3 < t2 - 1; e3 += 2)
      r2[e3 - 2] === r2[e3 + 2] && r2[e3 + 2] === r2[e3 - 1] && r2[e3 - 1] === r2[e3 + 1] && r2[e3 - 1] * 3 === r2[e3] && (r2[e3 - 3] === 0 || e3 + 3 > t2 || r2[e3 - 3] * 3 >= r2[e3] * 4 || r2[e3 + 3] * 3 >= r2[e3] * 4) && (i2 += c2.N3);
    return i2;
  }, _finish: function() {
    this._stringBuffer = this.buffer.slice();
    var t2, e3, i2 = 0, r2 = 3e4;
    for (e3 = 0; e3 < 8 && (this._applyMask(e3), t2 = this._checkBadness(), t2 < r2 && (r2 = t2, i2 = e3), i2 !== 7); e3++)
      this.buffer = this._stringBuffer.slice();
    i2 !== e3 && this._applyMask(i2), r2 = _3.FINAL_FORMAT[i2 + (this._level - 1 << 3)];
    var x2 = this.buffer, s2 = this.width;
    for (e3 = 0; e3 < 8; e3++, r2 >>= 1)
      r2 & 1 && (x2[s2 - 1 - e3 + s2 * 8] = 1, e3 < 6 ? x2[8 + s2 * e3] = 1 : x2[8 + s2 * (e3 + 1)] = 1);
    for (e3 = 0; e3 < 7; e3++, r2 >>= 1)
      r2 & 1 && (x2[8 + s2 * (s2 - 7 + e3)] = 1, e3 ? x2[6 - e3 + s2 * 8] = 1 : x2[7 + s2 * 8] = 1);
  }, _interleaveBlocks: function() {
    var t2, e3, i2 = this._dataBlock, r2 = this._ecc, x2 = this._eccBlock, s2 = 0, a2 = this._calculateMaxLength(), n2 = this._neccBlock1, f2 = this._neccBlock2, h2 = this._stringBuffer;
    for (t2 = 0; t2 < i2; t2++) {
      for (e3 = 0; e3 < n2; e3++)
        r2[s2++] = h2[t2 + e3 * i2];
      for (e3 = 0; e3 < f2; e3++)
        r2[s2++] = h2[n2 * i2 + t2 + e3 * (i2 + 1)];
    }
    for (e3 = 0; e3 < f2; e3++)
      r2[s2++] = h2[n2 * i2 + t2 + e3 * (i2 + 1)];
    for (t2 = 0; t2 < x2; t2++)
      for (e3 = 0; e3 < n2 + f2; e3++)
        r2[s2++] = h2[a2 + t2 + e3 * x2];
    this._stringBuffer = r2;
  }, _insertAlignments: function() {
    var t2, e3, i2, r2 = this._version, x2 = this.width;
    if (r2 > 1)
      for (t2 = Pe.BLOCK[r2], i2 = x2 - 7; ; ) {
        for (e3 = x2 - 7; e3 > t2 - 3 && (this._addAlignment(e3, i2), !(e3 < t2)); )
          e3 -= t2;
        if (i2 <= t2 + 9)
          break;
        i2 -= t2, this._addAlignment(6, i2), this._addAlignment(i2, 6);
      }
  }, _insertFinders: function() {
    var t2, e3, i2, r2, x2 = this.buffer, s2 = this.width;
    for (t2 = 0; t2 < 3; t2++) {
      for (e3 = 0, r2 = 0, t2 === 1 && (e3 = s2 - 7), t2 === 2 && (r2 = s2 - 7), x2[r2 + 3 + s2 * (e3 + 3)] = 1, i2 = 0; i2 < 6; i2++)
        x2[r2 + i2 + s2 * e3] = 1, x2[r2 + s2 * (e3 + i2 + 1)] = 1, x2[r2 + 6 + s2 * (e3 + i2)] = 1, x2[r2 + i2 + 1 + s2 * (e3 + 6)] = 1;
      for (i2 = 1; i2 < 5; i2++)
        this._setMask(r2 + i2, e3 + 1), this._setMask(r2 + 1, e3 + i2 + 1), this._setMask(r2 + 5, e3 + i2), this._setMask(r2 + i2 + 1, e3 + 5);
      for (i2 = 2; i2 < 4; i2++)
        x2[r2 + i2 + s2 * (e3 + 2)] = 1, x2[r2 + 2 + s2 * (e3 + i2 + 1)] = 1, x2[r2 + 4 + s2 * (e3 + i2)] = 1, x2[r2 + i2 + 1 + s2 * (e3 + 4)] = 1;
    }
  }, _insertTimingGap: function() {
    var t2, e3, i2 = this.width;
    for (e3 = 0; e3 < 7; e3++)
      this._setMask(7, e3), this._setMask(i2 - 8, e3), this._setMask(7, e3 + i2 - 7);
    for (t2 = 0; t2 < 8; t2++)
      this._setMask(t2, 7), this._setMask(t2 + i2 - 8, 7), this._setMask(t2, i2 - 8);
  }, _insertTimingRowAndColumn: function() {
    var t2, e3 = this.buffer, i2 = this.width;
    for (t2 = 0; t2 < i2 - 14; t2++)
      t2 & 1 ? (this._setMask(8 + t2, 6), this._setMask(6, 8 + t2)) : (e3[8 + t2 + i2 * 6] = 1, e3[6 + i2 * (8 + t2)] = 1);
  }, _insertVersion: function() {
    var t2, e3, i2, r2, x2 = this.buffer, s2 = this._version, a2 = this.width;
    if (s2 > 6)
      for (t2 = Ve.BLOCK[s2 - 7], e3 = 17, i2 = 0; i2 < 6; i2++)
        for (r2 = 0; r2 < 3; r2++, e3--)
          1 & (e3 > 11 ? s2 >> e3 - 12 : t2 >> e3) ? (x2[5 - i2 + a2 * (2 - r2 + a2 - 11)] = 1, x2[2 - r2 + a2 - 11 + a2 * (5 - i2)] = 1) : (this._setMask(5 - i2, 2 - r2 + a2 - 11), this._setMask(2 - r2 + a2 - 11, 5 - i2));
  }, _isMasked: function(t2, e3) {
    var i2 = c2._getMaskBit(t2, e3);
    return this._mask[i2] === 1;
  }, _pack: function() {
    var t2, e3, i2, r2 = 1, x2 = 1, s2 = this.width, a2 = s2 - 1, n2 = s2 - 1, f2 = (this._dataBlock + this._eccBlock) * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;
    for (e3 = 0; e3 < f2; e3++)
      for (t2 = this._stringBuffer[e3], i2 = 0; i2 < 8; i2++, t2 <<= 1) {
        128 & t2 && (this.buffer[a2 + s2 * n2] = 1);
        do
          x2 ? a2-- : (a2++, r2 ? n2 !== 0 ? n2-- : (a2 -= 2, r2 = !r2, a2 === 6 && (a2--, n2 = 9)) : n2 !== s2 - 1 ? n2++ : (a2 -= 2, r2 = !r2, a2 === 6 && (a2--, n2 -= 8))), x2 = !x2;
        while (this._isMasked(a2, n2));
      }
  }, _reverseMask: function() {
    var t2, e3, i2 = this.width;
    for (t2 = 0; t2 < 9; t2++)
      this._setMask(t2, 8);
    for (t2 = 0; t2 < 8; t2++)
      this._setMask(t2 + i2 - 8, 8), this._setMask(8, t2);
    for (e3 = 0; e3 < 7; e3++)
      this._setMask(8, e3 + i2 - 7);
  }, _setMask: function(t2, e3) {
    var i2 = c2._getMaskBit(t2, e3);
    this._mask[i2] = 1;
  }, _syncMask: function() {
    var t2, e3, i2 = this.width;
    for (e3 = 0; e3 < i2; e3++)
      for (t2 = 0; t2 <= e3; t2++)
        this.buffer[t2 + i2 * e3] && this._setMask(t2, e3);
  } }, { _createArray: function(t2) {
    var e3, i2 = [];
    for (e3 = 0; e3 < t2; e3++)
      i2[e3] = 0;
    return i2;
  }, _getMaskBit: function(t2, e3) {
    var i2;
    return t2 > e3 && (i2 = t2, t2 = e3, e3 = i2), i2 = e3, i2 += e3 * e3, i2 >>= 1, i2 += t2, i2;
  }, _modN: function(t2) {
    for (; t2 >= 255; )
      t2 -= 255, t2 = (t2 >> 8) + (t2 & 255);
    return t2;
  }, N1: 3, N2: 3, N3: 40, N4: 10 });
  F.exports = c2;
});
var H = o((p0, X) => {
  "use strict";
  var Ge = B(), Ke = Ge.extend({ draw: function() {
    this.element.src = this.qrious.toDataURL();
  }, reset: function() {
    this.element.src = "";
  }, resize: function() {
    var t2 = this.element;
    t2.width = t2.height = this.qrious.size;
  } });
  X.exports = Ke;
});
var J = o((k0, W) => {
  "use strict";
  var Ue = u(), De = Ue.extend(function(t2, e3, i2, r2) {
    this.name = t2, this.modifiable = Boolean(e3), this.defaultValue = i2, this._valueTransformer = r2;
  }, { transform: function(t2) {
    var e3 = this._valueTransformer;
    return typeof e3 == "function" ? e3(t2, this) : t2;
  } });
  W.exports = De;
});
var M = o((g0, Y) => {
  "use strict";
  var Fe = u(), Qe = Fe.extend(null, { abs: function(t2) {
    return t2 != null ? Math.abs(t2) : null;
  }, hasOwn: function(t2, e3) {
    return Object.prototype.hasOwnProperty.call(t2, e3);
  }, noop: function() {
  }, toUpperCase: function(t2) {
    return t2 != null ? t2.toUpperCase() : null;
  } });
  Y.exports = Qe;
});
var $ = o((w0, Z) => {
  "use strict";
  var Xe = u(), k2 = M(), v = Xe.extend(function(t2) {
    this.options = {}, t2.forEach(function(e3) {
      this.options[e3.name] = e3;
    }, this);
  }, { exists: function(t2) {
    return this.options[t2] != null;
  }, get: function(t2, e3) {
    return v._get(this.options[t2], e3);
  }, getAll: function(t2) {
    var e3, i2 = this.options, r2 = {};
    for (e3 in i2)
      k2.hasOwn(i2, e3) && (r2[e3] = v._get(i2[e3], t2));
    return r2;
  }, init: function(t2, e3, i2) {
    typeof i2 != "function" && (i2 = k2.noop);
    var r2, x2;
    for (r2 in this.options)
      k2.hasOwn(this.options, r2) && (x2 = this.options[r2], v._set(x2, x2.defaultValue, e3), v._createAccessor(x2, e3, i2));
    this._setAll(t2, e3, true);
  }, set: function(t2, e3, i2) {
    return this._set(t2, e3, i2);
  }, setAll: function(t2, e3) {
    return this._setAll(t2, e3);
  }, _set: function(t2, e3, i2, r2) {
    var x2 = this.options[t2];
    if (!x2)
      throw new Error("Invalid option: " + t2);
    if (!x2.modifiable && !r2)
      throw new Error("Option cannot be modified: " + t2);
    return v._set(x2, e3, i2);
  }, _setAll: function(t2, e3, i2) {
    if (!t2)
      return false;
    var r2, x2 = false;
    for (r2 in t2)
      k2.hasOwn(t2, r2) && this._set(r2, t2[r2], e3, i2) && (x2 = true);
    return x2;
  } }, { _createAccessor: function(t2, e3, i2) {
    var r2 = { get: function() {
      return v._get(t2, e3);
    } };
    t2.modifiable && (r2.set = function(x2) {
      v._set(t2, x2, e3) && i2(x2, t2);
    }), Object.defineProperty(e3, t2.name, r2);
  }, _get: function(t2, e3) {
    return e3["_" + t2.name];
  }, _set: function(t2, e3, i2) {
    var r2 = "_" + t2.name, x2 = i2[r2], s2 = t2.transform(e3 != null ? e3 : t2.defaultValue);
    return i2[r2] = s2, s2 !== x2;
  } });
  Z.exports = v;
});
var te = o((B0, ee) => {
  "use strict";
  var He = u(), We = He.extend(function() {
    this._services = {};
  }, { getService: function(t2) {
    var e3 = this._services[t2];
    if (!e3)
      throw new Error("Service is not being managed with name: " + t2);
    return e3;
  }, setService: function(t2, e3) {
    if (this._services[t2])
      throw new Error("Service is already managed with name: " + t2);
    e3 && (this._services[t2] = e3);
  } });
  ee.exports = We;
});
var se = o((M0, xe) => {
  "use strict";
  var Je = u(), Ye = j(), Ze = Q(), $e = H(), d2 = J(), e0 = $(), t0 = te(), m2 = M(), g2 = new e0([new d2("background", true, "white"), new d2("backgroundAlpha", true, 1, m2.abs), new d2("element"), new d2("foreground", true, "black"), new d2("foregroundAlpha", true, 1, m2.abs), new d2("level", true, "L", m2.toUpperCase), new d2("mime", true, "image/png"), new d2("padding", true, null, m2.abs), new d2("size", true, 100, m2.abs), new d2("value", true, "")]), ie = new t0(), re = Je.extend(function(t2) {
    g2.init(t2, this, this.update.bind(this));
    var e3 = g2.get("element", this), i2 = ie.getService("element"), r2 = e3 && i2.isCanvas(e3) ? e3 : i2.createCanvas(), x2 = e3 && i2.isImage(e3) ? e3 : i2.createImage();
    this._canvasRenderer = new Ye(this, r2, true), this._imageRenderer = new $e(this, x2, x2 === e3), this.update();
  }, { get: function() {
    return g2.getAll(this);
  }, set: function(t2) {
    g2.setAll(t2, this) && this.update();
  }, toDataURL: function(t2) {
    return this.canvas.toDataURL(t2 || this.mime);
  }, update: function() {
    var t2 = new Ze({ level: this.level, value: this.value });
    this._canvasRenderer.render(t2), this._imageRenderer.render(t2);
  } }, { use: function(t2) {
    ie.setService(t2.getName(), t2);
  } });
  Object.defineProperties(re.prototype, { canvas: { get: function() {
    return this._canvasRenderer.getElement();
  } }, image: { get: function() {
    return this._imageRenderer.getElement();
  } } });
  xe.exports = re;
});
var ne = o((q0, ae) => {
  "use strict";
  ae.exports = se();
});
var oe = o((O0, fe) => {
  "use strict";
  var i0 = u(), r0 = i0.extend({ getName: function() {
  } });
  fe.exports = r0;
});
var ue = o((N0, ce) => {
  "use strict";
  var x0 = oe(), s0 = x0.extend({ createCanvas: function() {
  }, createImage: function() {
  }, getName: function() {
    return "element";
  }, isCanvas: function(t2) {
  }, isImage: function(t2) {
  } });
  ce.exports = s0;
});
var le = N(ne(), 1);
var he = N(ue(), 1);
var a0 = he.default.extend({ createCanvas: function() {
  return document.createElement("canvas");
}, createImage: function() {
  return document.createElement("img");
}, isCanvas: function(t2) {
  return t2 instanceof HTMLCanvasElement;
}, isImage: function(t2) {
  return t2 instanceof HTMLImageElement;
} });
var de = a0;
var n0 = le.default;
n0.use(new de());

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

// ../../node_modules/@mui/material/Fab/Fab.js
var import_prop_types45 = __toESM(require_prop_types());
import * as React71 from "https://spike.land/dist/react.mjs";

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

// ../../node_modules/@mui/base/utils/isHostComponent.js
function isHostComponent(element) {
  return typeof element === "string";
}
var isHostComponent_default = isHostComponent;

// ../../node_modules/@mui/base/utils/appendOwnerState.js
function appendOwnerState(elementType, existingProps = {}, ownerState) {
  if (isHostComponent_default(elementType)) {
    return existingProps;
  }
  return _extends({}, existingProps, {
    ownerState: _extends({}, existingProps.ownerState, ownerState)
  });
}

// ../../node_modules/@mui/base/utils/areArraysEqual.js
function areArraysEqual(array1, array2, itemComparer = (a2, b2) => a2 === b2) {
  return array1.length === array2.length && array1.every((value, index) => itemComparer(value, array2[index]));
}

// ../../node_modules/@mui/base/utils/extractEventHandlers.js
function extractEventHandlers(object, excludeKeys = []) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => prop.match(/^on[A-Z]/) && typeof object[prop] === "function" && !excludeKeys.includes(prop)).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}

// ../../node_modules/@mui/base/AutocompleteUnstyled/useAutocomplete.js
import * as React9 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/utils/esm/chainPropTypes.js
function chainPropTypes(propType1, propType2) {
  if (true) {
    return () => null;
  }
  return function validate(...args) {
    return propType1(...args) || propType2(...args);
  };
}

// ../../node_modules/@mui/utils/esm/deepmerge.js
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

// ../../node_modules/@mui/utils/esm/elementAcceptingRef.js
var import_prop_types = __toESM(require_prop_types());
function isClassComponent(elementType) {
  const {
    prototype = {}
  } = elementType;
  return Boolean(prototype.isReactComponent);
}
function acceptingRef(props, propName, componentName, location, propFullName) {
  const element = props[propName];
  const safePropName = propFullName || propName;
  if (element == null || typeof window === "undefined") {
    return null;
  }
  let warningHint;
  const elementType = element.type;
  if (typeof elementType === "function" && !isClassComponent(elementType)) {
    warningHint = "Did you accidentally use a plain function component for an element instead?";
  }
  if (warningHint !== void 0) {
    return new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. Expected an element that can hold a ref. ${warningHint} For more information see https://mui.com/r/caveat-with-refs-guide`);
  }
  return null;
}
var elementAcceptingRef = chainPropTypes(import_prop_types.default.element, acceptingRef);
elementAcceptingRef.isRequired = chainPropTypes(import_prop_types.default.element.isRequired, acceptingRef);

// ../../node_modules/@mui/utils/esm/elementTypeAcceptingRef.js
var import_prop_types2 = __toESM(require_prop_types());
function isClassComponent2(elementType) {
  const {
    prototype = {}
  } = elementType;
  return Boolean(prototype.isReactComponent);
}
function elementTypeAcceptingRef(props, propName, componentName, location, propFullName) {
  const propValue = props[propName];
  const safePropName = propFullName || propName;
  if (propValue == null || typeof window === "undefined") {
    return null;
  }
  let warningHint;
  if (typeof propValue === "function" && !isClassComponent2(propValue)) {
    warningHint = "Did you accidentally provide a plain function component instead?";
  }
  if (warningHint !== void 0) {
    return new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. Expected an element type that can hold a ref. ${warningHint} For more information see https://mui.com/r/caveat-with-refs-guide`);
  }
  return null;
}
var elementTypeAcceptingRef_default = chainPropTypes(import_prop_types2.default.elementType, elementTypeAcceptingRef);

// ../../node_modules/@mui/utils/esm/formatMuiErrorMessage.js
function formatMuiErrorMessage(code) {
  let url = "https://mui.com/production-error/?code=" + code;
  for (let i2 = 1; i2 < arguments.length; i2 += 1) {
    url += "&args[]=" + encodeURIComponent(arguments[i2]);
  }
  return "Minified MUI error #" + code + "; visit " + url + " for the full message.";
}

// ../../node_modules/@mui/utils/esm/getDisplayName.js
var import_react_is = __toESM(require_react_is());

// ../../node_modules/@mui/utils/esm/ponyfillGlobal.js
var ponyfillGlobal_default = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();

// ../../node_modules/@mui/utils/esm/refType.js
var import_prop_types3 = __toESM(require_prop_types());
var refType = import_prop_types3.default.oneOfType([import_prop_types3.default.func, import_prop_types3.default.object]);

// ../../node_modules/@mui/utils/esm/capitalize.js
function capitalize(string) {
  if (typeof string !== "string") {
    throw new Error(false ? `MUI: \`capitalize(string)\` expects a string argument.` : formatMuiErrorMessage(7));
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// ../../node_modules/@mui/utils/esm/createChainedFunction.js
function createChainedFunction(...funcs) {
  return funcs.reduce((acc, func) => {
    if (func == null) {
      return acc;
    }
    return function chainedFunction(...args) {
      acc.apply(this, args);
      func.apply(this, args);
    };
  }, () => {
  });
}

// ../../node_modules/@mui/utils/esm/debounce.js
function debounce(func, wait = 166) {
  let timeout2;
  function debounced(...args) {
    const later = () => {
      func.apply(this, args);
    };
    clearTimeout(timeout2);
    timeout2 = setTimeout(later, wait);
  }
  debounced.clear = () => {
    clearTimeout(timeout2);
  };
  return debounced;
}

// ../../node_modules/@mui/utils/esm/isMuiElement.js
import * as React from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/utils/esm/ownerDocument.js
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}

// ../../node_modules/@mui/utils/esm/ownerWindow.js
function ownerWindow(node) {
  const doc = ownerDocument(node);
  return doc.defaultView || window;
}

// ../../node_modules/@mui/utils/esm/setRef.js
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

// ../../node_modules/@mui/utils/esm/useEnhancedEffect.js
import * as React2 from "https://spike.land/dist/react.mjs";
var useEnhancedEffect = typeof window !== "undefined" ? React2.useLayoutEffect : React2.useEffect;
var useEnhancedEffect_default = useEnhancedEffect;

// ../../node_modules/@mui/utils/esm/useId.js
import * as React3 from "https://spike.land/dist/react.mjs";
var globalId = 0;
function useGlobalId(idOverride) {
  const [defaultId, setDefaultId] = React3.useState(idOverride);
  const id = idOverride || defaultId;
  React3.useEffect(() => {
    if (defaultId == null) {
      globalId += 1;
      setDefaultId(`mui-${globalId}`);
    }
  }, [defaultId]);
  return id;
}
var maybeReactUseId = React3["useId"];
function useId2(idOverride) {
  if (maybeReactUseId !== void 0) {
    const reactId = maybeReactUseId();
    return idOverride != null ? idOverride : reactId;
  }
  return useGlobalId(idOverride);
}

// ../../node_modules/@mui/utils/esm/useControlled.js
import * as React4 from "https://spike.land/dist/react.mjs";
function useControlled({
  controlled,
  default: defaultProp,
  name,
  state = "value"
}) {
  const {
    current: isControlled
  } = React4.useRef(controlled !== void 0);
  const [valueState, setValue] = React4.useState(defaultProp);
  const value = isControlled ? controlled : valueState;
  if (false) {
    React4.useEffect(() => {
      if (isControlled !== (controlled !== void 0)) {
        console.error([`MUI: A component is changing the ${isControlled ? "" : "un"}controlled ${state} state of ${name} to be ${isControlled ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${name} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join("\n"));
      }
    }, [state, name, controlled]);
    const {
      current: defaultValue
    } = React4.useRef(defaultProp);
    React4.useEffect(() => {
      if (!isControlled && defaultValue !== defaultProp) {
        console.error([`MUI: A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. To suppress this warning opt to use a controlled ${name}.`].join("\n"));
      }
    }, [JSON.stringify(defaultProp)]);
  }
  const setValueIfUncontrolled = React4.useCallback((newValue) => {
    if (!isControlled) {
      setValue(newValue);
    }
  }, []);
  return [value, setValueIfUncontrolled];
}

// ../../node_modules/@mui/utils/esm/useEventCallback.js
import * as React5 from "https://spike.land/dist/react.mjs";
function useEventCallback(fn2) {
  const ref = React5.useRef(fn2);
  useEnhancedEffect_default(() => {
    ref.current = fn2;
  });
  return React5.useCallback((...args) => (0, ref.current)(...args), []);
}

// ../../node_modules/@mui/utils/esm/useForkRef.js
import * as React6 from "https://spike.land/dist/react.mjs";
function useForkRef(refA, refB) {
  return React6.useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}

// ../../node_modules/@mui/utils/esm/useIsFocusVisible.js
import * as React7 from "https://spike.land/dist/react.mjs";
var hadKeyboardEvent = true;
var hadFocusVisibleRecently = false;
var hadFocusVisibleRecentlyTimeout;
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
  const ref = React7.useCallback((node) => {
    if (node != null) {
      prepare(node.ownerDocument);
    }
  }, []);
  const isFocusVisibleRef = React7.useRef(false);
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

// ../../node_modules/@mui/utils/esm/getScrollbarSize.js
function getScrollbarSize(doc) {
  const documentWidth = doc.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
}

// ../../node_modules/@mui/utils/esm/usePreviousProps.js
import * as React8 from "https://spike.land/dist/react.mjs";
var usePreviousProps = (value) => {
  const ref = React8.useRef({});
  React8.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
var usePreviousProps_default = usePreviousProps;

// ../../node_modules/@mui/utils/esm/visuallyHidden.js
var visuallyHidden = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px"
};
var visuallyHidden_default = visuallyHidden;

// ../../node_modules/@mui/utils/esm/integerPropType.js
function getTypeByValue(value) {
  const valueType = typeof value;
  switch (valueType) {
    case "number":
      if (Number.isNaN(value)) {
        return "NaN";
      }
      if (!Number.isFinite(value)) {
        return "Infinity";
      }
      if (value !== Math.floor(value)) {
        return "float";
      }
      return "number";
    case "object":
      if (value === null) {
        return "null";
      }
      return value.constructor.name;
    default:
      return valueType;
  }
}
function ponyfillIsInteger(x2) {
  return typeof x2 === "number" && isFinite(x2) && Math.floor(x2) === x2;
}
var isInteger = Number.isInteger || ponyfillIsInteger;
function requiredInteger(props, propName, componentName, location) {
  const propValue = props[propName];
  if (propValue == null || !isInteger(propValue)) {
    const propType = getTypeByValue(propValue);
    return new RangeError(`Invalid ${location} \`${propName}\` of type \`${propType}\` supplied to \`${componentName}\`, expected \`integer\`.`);
  }
  return null;
}
function validator(props, propName, ...other) {
  const propValue = props[propName];
  if (propValue === void 0) {
    return null;
  }
  return requiredInteger(props, propName, ...other);
}
function validatorNoop() {
  return null;
}
validator.isRequired = requiredInteger;
validatorNoop.isRequired = validatorNoop;

// ../../node_modules/@mui/utils/esm/resolveProps.js
function resolveProps(defaultProps2, props) {
  const output = _extends({}, props);
  Object.keys(defaultProps2).forEach((propName) => {
    if (output[propName] === void 0) {
      output[propName] = defaultProps2[propName];
    }
  });
  return output;
}

// ../../node_modules/@mui/base/AutocompleteUnstyled/useAutocomplete.js
function stripDiacritics(string) {
  return typeof string.normalize !== "undefined" ? string.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : string;
}
function createFilterOptions(config = {}) {
  const {
    ignoreAccents = true,
    ignoreCase = true,
    limit,
    matchFrom = "any",
    stringify,
    trim = false
  } = config;
  return (options, {
    inputValue,
    getOptionLabel
  }) => {
    let input = trim ? inputValue.trim() : inputValue;
    if (ignoreCase) {
      input = input.toLowerCase();
    }
    if (ignoreAccents) {
      input = stripDiacritics(input);
    }
    const filteredOptions = options.filter((option) => {
      let candidate = (stringify || getOptionLabel)(option);
      if (ignoreCase) {
        candidate = candidate.toLowerCase();
      }
      if (ignoreAccents) {
        candidate = stripDiacritics(candidate);
      }
      return matchFrom === "start" ? candidate.indexOf(input) === 0 : candidate.indexOf(input) > -1;
    });
    return typeof limit === "number" ? filteredOptions.slice(0, limit) : filteredOptions;
  };
}
var defaultFilterOptions = createFilterOptions();

// ../../node_modules/@mui/base/BadgeUnstyled/BadgeUnstyled.js
var import_prop_types4 = __toESM(require_prop_types());
import * as React10 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/base/composeClasses/composeClasses.js
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

// ../../node_modules/@mui/base/BadgeUnstyled/useBadge.js
function useBadge(props) {
  const {
    badgeContent: badgeContentProp,
    invisible: invisibleProp = false,
    max: maxProp = 99,
    showZero = false
  } = props;
  const prevProps = usePreviousProps_default({
    badgeContent: badgeContentProp,
    max: maxProp
  });
  let invisible = invisibleProp;
  if (invisibleProp === false && badgeContentProp === 0 && !showZero) {
    invisible = true;
  }
  const {
    badgeContent,
    max: max2 = maxProp
  } = invisible ? prevProps : props;
  const displayValue = badgeContent && Number(badgeContent) > max2 ? `${max2}+` : badgeContent;
  return {
    badgeContent,
    invisible,
    max: max2,
    displayValue
  };
}

// ../../node_modules/@mui/base/className/ClassNameGenerator.js
var defaultGenerator = (componentName) => componentName;
var createClassNameGenerator = () => {
  let generate = defaultGenerator;
  return {
    configure(generator) {
      generate = generator;
    },
    generate(componentName) {
      return generate(componentName);
    },
    reset() {
      generate = defaultGenerator;
    }
  };
};
var ClassNameGenerator = createClassNameGenerator();
var ClassNameGenerator_default = ClassNameGenerator;

// ../../node_modules/@mui/base/generateUtilityClass/generateUtilityClass.js
var globalStateClassesMapping = {
  active: "Mui-active",
  checked: "Mui-checked",
  completed: "Mui-completed",
  disabled: "Mui-disabled",
  error: "Mui-error",
  expanded: "Mui-expanded",
  focused: "Mui-focused",
  focusVisible: "Mui-focusVisible",
  required: "Mui-required",
  selected: "Mui-selected"
};
function generateUtilityClass(componentName, slot) {
  const globalStateClass = globalStateClassesMapping[slot];
  return globalStateClass || `${ClassNameGenerator_default.generate(componentName)}-${slot}`;
}

// ../../node_modules/@mui/base/generateUtilityClasses/generateUtilityClasses.js
function generateUtilityClasses(componentName, slots) {
  const result = {};
  slots.forEach((slot) => {
    result[slot] = generateUtilityClass(componentName, slot);
  });
  return result;
}

// ../../node_modules/@mui/base/BadgeUnstyled/badgeUnstyledClasses.js
function getBadgeUnstyledUtilityClass(slot) {
  return generateUtilityClass("BaseBadge", slot);
}
var badgeUnstyledClasses = generateUtilityClasses("BaseBadge", ["root", "badge", "invisible"]);

// ../../node_modules/preact/dist/preact.module.js
var n;
var l;
var u2;
var i;
var t;
var o2;
var r;
var f;
var e = {};
var c = [];
var s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function a(n2, l2) {
  for (var u3 in l2)
    n2[u3] = l2[u3];
  return n2;
}
function h(n2) {
  var l2 = n2.parentNode;
  l2 && l2.removeChild(n2);
}
function y(n2, i2, t2, o4, r2) {
  var f2 = { type: n2, props: i2, key: t2, ref: o4, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: r2 == null ? ++u2 : r2 };
  return r2 == null && l.vnode != null && l.vnode(f2), f2;
}
function d(n2) {
  return n2.children;
}
function _(n2, l2) {
  this.props = n2, this.context = l2;
}
function k(n2, l2) {
  if (l2 == null)
    return n2.__ ? k(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
  for (var u3; l2 < n2.__k.length; l2++)
    if ((u3 = n2.__k[l2]) != null && u3.__e != null)
      return u3.__e;
  return typeof n2.type == "function" ? k(n2) : null;
}
function b(n2) {
  var l2, u3;
  if ((n2 = n2.__) != null && n2.__c != null) {
    for (n2.__e = n2.__c.base = null, l2 = 0; l2 < n2.__k.length; l2++)
      if ((u3 = n2.__k[l2]) != null && u3.__e != null) {
        n2.__e = n2.__c.base = u3.__e;
        break;
      }
    return b(n2);
  }
}
function m(n2) {
  (!n2.__d && (n2.__d = true) && t.push(n2) && !g.__r++ || r !== l.debounceRendering) && ((r = l.debounceRendering) || o2)(g);
}
function g() {
  for (var n2; g.__r = t.length; )
    n2 = t.sort(function(n3, l2) {
      return n3.__v.__b - l2.__v.__b;
    }), t = [], n2.some(function(n3) {
      var l2, u3, i2, t2, o4, r2;
      n3.__d && (o4 = (t2 = (l2 = n3).__v).__e, (r2 = l2.__P) && (u3 = [], (i2 = a({}, t2)).__v = t2.__v + 1, j2(r2, t2, i2, l2.__n, r2.ownerSVGElement !== void 0, t2.__h != null ? [o4] : null, u3, o4 == null ? k(t2) : o4, t2.__h), z(u3, t2), t2.__e != o4 && b(t2)));
    });
}
function w(n2, l2, u3, i2, t2, o4, r2, f2, s2, a2) {
  var h2, v, p, _3, b2, m2, g2, w2 = i2 && i2.__k || c, A = w2.length;
  for (u3.__k = [], h2 = 0; h2 < l2.length; h2++)
    if ((_3 = u3.__k[h2] = (_3 = l2[h2]) == null || typeof _3 == "boolean" ? null : typeof _3 == "string" || typeof _3 == "number" || typeof _3 == "bigint" ? y(null, _3, null, null, _3) : Array.isArray(_3) ? y(d, { children: _3 }, null, null, null) : _3.__b > 0 ? y(_3.type, _3.props, _3.key, null, _3.__v) : _3) != null) {
      if (_3.__ = u3, _3.__b = u3.__b + 1, (p = w2[h2]) === null || p && _3.key == p.key && _3.type === p.type)
        w2[h2] = void 0;
      else
        for (v = 0; v < A; v++) {
          if ((p = w2[v]) && _3.key == p.key && _3.type === p.type) {
            w2[v] = void 0;
            break;
          }
          p = null;
        }
      j2(n2, _3, p = p || e, t2, o4, r2, f2, s2, a2), b2 = _3.__e, (v = _3.ref) && p.ref != v && (g2 || (g2 = []), p.ref && g2.push(p.ref, null, _3), g2.push(v, _3.__c || b2, _3)), b2 != null ? (m2 == null && (m2 = b2), typeof _3.type == "function" && _3.__k === p.__k ? _3.__d = s2 = x(_3, s2, n2) : s2 = P(n2, _3, p, w2, b2, s2), typeof u3.type == "function" && (u3.__d = s2)) : s2 && p.__e == s2 && s2.parentNode != n2 && (s2 = k(p));
    }
  for (u3.__e = m2, h2 = A; h2--; )
    w2[h2] != null && (typeof u3.type == "function" && w2[h2].__e != null && w2[h2].__e == u3.__d && (u3.__d = k(i2, h2 + 1)), N2(w2[h2], w2[h2]));
  if (g2)
    for (h2 = 0; h2 < g2.length; h2++)
      M2(g2[h2], g2[++h2], g2[++h2]);
}
function x(n2, l2, u3) {
  for (var i2, t2 = n2.__k, o4 = 0; t2 && o4 < t2.length; o4++)
    (i2 = t2[o4]) && (i2.__ = n2, l2 = typeof i2.type == "function" ? x(i2, l2, u3) : P(u3, i2, i2, t2, i2.__e, l2));
  return l2;
}
function P(n2, l2, u3, i2, t2, o4) {
  var r2, f2, e3;
  if (l2.__d !== void 0)
    r2 = l2.__d, l2.__d = void 0;
  else if (u3 == null || t2 != o4 || t2.parentNode == null)
    n:
      if (o4 == null || o4.parentNode !== n2)
        n2.appendChild(t2), r2 = null;
      else {
        for (f2 = o4, e3 = 0; (f2 = f2.nextSibling) && e3 < i2.length; e3 += 2)
          if (f2 == t2)
            break n;
        n2.insertBefore(t2, o4), r2 = o4;
      }
  return r2 !== void 0 ? r2 : t2.nextSibling;
}
function C2(n2, l2, u3, i2, t2) {
  var o4;
  for (o4 in u3)
    o4 === "children" || o4 === "key" || o4 in l2 || H2(n2, o4, null, u3[o4], i2);
  for (o4 in l2)
    t2 && typeof l2[o4] != "function" || o4 === "children" || o4 === "key" || o4 === "value" || o4 === "checked" || u3[o4] === l2[o4] || H2(n2, o4, l2[o4], u3[o4], i2);
}
function $2(n2, l2, u3) {
  l2[0] === "-" ? n2.setProperty(l2, u3) : n2[l2] = u3 == null ? "" : typeof u3 != "number" || s.test(l2) ? u3 : u3 + "px";
}
function H2(n2, l2, u3, i2, t2) {
  var o4;
  n:
    if (l2 === "style")
      if (typeof u3 == "string")
        n2.style.cssText = u3;
      else {
        if (typeof i2 == "string" && (n2.style.cssText = i2 = ""), i2)
          for (l2 in i2)
            u3 && l2 in u3 || $2(n2.style, l2, "");
        if (u3)
          for (l2 in u3)
            i2 && u3[l2] === i2[l2] || $2(n2.style, l2, u3[l2]);
      }
    else if (l2[0] === "o" && l2[1] === "n")
      o4 = l2 !== (l2 = l2.replace(/Capture$/, "")), l2 = l2.toLowerCase() in n2 ? l2.toLowerCase().slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + o4] = u3, u3 ? i2 || n2.addEventListener(l2, o4 ? T : I2, o4) : n2.removeEventListener(l2, o4 ? T : I2, o4);
    else if (l2 !== "dangerouslySetInnerHTML") {
      if (t2)
        l2 = l2.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if (l2 !== "href" && l2 !== "list" && l2 !== "form" && l2 !== "tabIndex" && l2 !== "download" && l2 in n2)
        try {
          n2[l2] = u3 == null ? "" : u3;
          break n;
        } catch (n3) {
        }
      typeof u3 == "function" || (u3 != null && (u3 !== false || l2[0] === "a" && l2[1] === "r") ? n2.setAttribute(l2, u3) : n2.removeAttribute(l2));
    }
}
function I2(n2) {
  this.l[n2.type + false](l.event ? l.event(n2) : n2);
}
function T(n2) {
  this.l[n2.type + true](l.event ? l.event(n2) : n2);
}
function j2(n2, u3, i2, t2, o4, r2, f2, e3, c2) {
  var s2, h2, v, y2, p, k2, b2, m2, g2, x2, A, P2 = u3.type;
  if (u3.constructor !== void 0)
    return null;
  i2.__h != null && (c2 = i2.__h, e3 = u3.__e = i2.__e, u3.__h = null, r2 = [e3]), (s2 = l.__b) && s2(u3);
  try {
    n:
      if (typeof P2 == "function") {
        if (m2 = u3.props, g2 = (s2 = P2.contextType) && t2[s2.__c], x2 = s2 ? g2 ? g2.props.value : s2.__ : t2, i2.__c ? b2 = (h2 = u3.__c = i2.__c).__ = h2.__E : ("prototype" in P2 && P2.prototype.render ? u3.__c = h2 = new P2(m2, x2) : (u3.__c = h2 = new _(m2, x2), h2.constructor = P2, h2.render = O2), g2 && g2.sub(h2), h2.props = m2, h2.state || (h2.state = {}), h2.context = x2, h2.__n = t2, v = h2.__d = true, h2.__h = []), h2.__s == null && (h2.__s = h2.state), P2.getDerivedStateFromProps != null && (h2.__s == h2.state && (h2.__s = a({}, h2.__s)), a(h2.__s, P2.getDerivedStateFromProps(m2, h2.__s))), y2 = h2.props, p = h2.state, v)
          P2.getDerivedStateFromProps == null && h2.componentWillMount != null && h2.componentWillMount(), h2.componentDidMount != null && h2.__h.push(h2.componentDidMount);
        else {
          if (P2.getDerivedStateFromProps == null && m2 !== y2 && h2.componentWillReceiveProps != null && h2.componentWillReceiveProps(m2, x2), !h2.__e && h2.shouldComponentUpdate != null && h2.shouldComponentUpdate(m2, h2.__s, x2) === false || u3.__v === i2.__v) {
            h2.props = m2, h2.state = h2.__s, u3.__v !== i2.__v && (h2.__d = false), h2.__v = u3, u3.__e = i2.__e, u3.__k = i2.__k, u3.__k.forEach(function(n3) {
              n3 && (n3.__ = u3);
            }), h2.__h.length && f2.push(h2);
            break n;
          }
          h2.componentWillUpdate != null && h2.componentWillUpdate(m2, h2.__s, x2), h2.componentDidUpdate != null && h2.__h.push(function() {
            h2.componentDidUpdate(y2, p, k2);
          });
        }
        h2.context = x2, h2.props = m2, h2.state = h2.__s, (s2 = l.__r) && s2(u3), h2.__d = false, h2.__v = u3, h2.__P = n2, s2 = h2.render(h2.props, h2.state, h2.context), h2.state = h2.__s, h2.getChildContext != null && (t2 = a(a({}, t2), h2.getChildContext())), v || h2.getSnapshotBeforeUpdate == null || (k2 = h2.getSnapshotBeforeUpdate(y2, p)), A = s2 != null && s2.type === d && s2.key == null ? s2.props.children : s2, w(n2, Array.isArray(A) ? A : [A], u3, i2, t2, o4, r2, f2, e3, c2), h2.base = u3.__e, u3.__h = null, h2.__h.length && f2.push(h2), b2 && (h2.__E = h2.__ = null), h2.__e = false;
      } else
        r2 == null && u3.__v === i2.__v ? (u3.__k = i2.__k, u3.__e = i2.__e) : u3.__e = L(i2.__e, u3, i2, t2, o4, r2, f2, c2);
    (s2 = l.diffed) && s2(u3);
  } catch (n3) {
    u3.__v = null, (c2 || r2 != null) && (u3.__e = e3, u3.__h = !!c2, r2[r2.indexOf(e3)] = null), l.__e(n3, u3, i2);
  }
}
function z(n2, u3) {
  l.__c && l.__c(u3, n2), n2.some(function(u4) {
    try {
      n2 = u4.__h, u4.__h = [], n2.some(function(n3) {
        n3.call(u4);
      });
    } catch (n3) {
      l.__e(n3, u4.__v);
    }
  });
}
function L(l2, u3, i2, t2, o4, r2, f2, c2) {
  var s2, a2, v, y2 = i2.props, p = u3.props, d2 = u3.type, _3 = 0;
  if (d2 === "svg" && (o4 = true), r2 != null) {
    for (; _3 < r2.length; _3++)
      if ((s2 = r2[_3]) && "setAttribute" in s2 == !!d2 && (d2 ? s2.localName === d2 : s2.nodeType === 3)) {
        l2 = s2, r2[_3] = null;
        break;
      }
  }
  if (l2 == null) {
    if (d2 === null)
      return document.createTextNode(p);
    l2 = o4 ? document.createElementNS("http://www.w3.org/2000/svg", d2) : document.createElement(d2, p.is && p), r2 = null, c2 = false;
  }
  if (d2 === null)
    y2 === p || c2 && l2.data === p || (l2.data = p);
  else {
    if (r2 = r2 && n.call(l2.childNodes), a2 = (y2 = i2.props || e).dangerouslySetInnerHTML, v = p.dangerouslySetInnerHTML, !c2) {
      if (r2 != null)
        for (y2 = {}, _3 = 0; _3 < l2.attributes.length; _3++)
          y2[l2.attributes[_3].name] = l2.attributes[_3].value;
      (v || a2) && (v && (a2 && v.__html == a2.__html || v.__html === l2.innerHTML) || (l2.innerHTML = v && v.__html || ""));
    }
    if (C2(l2, p, y2, o4, c2), v)
      u3.__k = [];
    else if (_3 = u3.props.children, w(l2, Array.isArray(_3) ? _3 : [_3], u3, i2, t2, o4 && d2 !== "foreignObject", r2, f2, r2 ? r2[0] : i2.__k && k(i2, 0), c2), r2 != null)
      for (_3 = r2.length; _3--; )
        r2[_3] != null && h(r2[_3]);
    c2 || ("value" in p && (_3 = p.value) !== void 0 && (_3 !== l2.value || d2 === "progress" && !_3 || d2 === "option" && _3 !== y2.value) && H2(l2, "value", _3, y2.value, false), "checked" in p && (_3 = p.checked) !== void 0 && _3 !== l2.checked && H2(l2, "checked", _3, y2.checked, false));
  }
  return l2;
}
function M2(n2, u3, i2) {
  try {
    typeof n2 == "function" ? n2(u3) : n2.current = u3;
  } catch (n3) {
    l.__e(n3, i2);
  }
}
function N2(n2, u3, i2) {
  var t2, o4;
  if (l.unmount && l.unmount(n2), (t2 = n2.ref) && (t2.current && t2.current !== n2.__e || M2(t2, null, u3)), (t2 = n2.__c) != null) {
    if (t2.componentWillUnmount)
      try {
        t2.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, u3);
      }
    t2.base = t2.__P = null;
  }
  if (t2 = n2.__k)
    for (o4 = 0; o4 < t2.length; o4++)
      t2[o4] && N2(t2[o4], u3, typeof n2.type != "function");
  i2 || n2.__e == null || h(n2.__e), n2.__e = n2.__d = void 0;
}
function O2(n2, l2, u3) {
  return this.constructor(n2, u3);
}
n = c.slice, l = { __e: function(n2, l2, u3, i2) {
  for (var t2, o4, r2; l2 = l2.__; )
    if ((t2 = l2.__c) && !t2.__)
      try {
        if ((o4 = t2.constructor) && o4.getDerivedStateFromError != null && (t2.setState(o4.getDerivedStateFromError(n2)), r2 = t2.__d), t2.componentDidCatch != null && (t2.componentDidCatch(n2, i2 || {}), r2 = t2.__d), r2)
          return t2.__E = t2;
      } catch (l3) {
        n2 = l3;
      }
  throw n2;
} }, u2 = 0, i = function(n2) {
  return n2 != null && n2.constructor === void 0;
}, _.prototype.setState = function(n2, l2) {
  var u3;
  u3 = this.__s != null && this.__s !== this.state ? this.__s : this.__s = a({}, this.state), typeof n2 == "function" && (n2 = n2(a({}, u3), this.props)), n2 && a(u3, n2), n2 != null && this.__v && (l2 && this.__h.push(l2), m(this));
}, _.prototype.forceUpdate = function(n2) {
  this.__v && (this.__e = true, n2 && this.__h.push(n2), m(this));
}, _.prototype.render = d, t = [], o2 = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, g.__r = 0, f = 0;

// ../../node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var o3 = 0;
function e2(_3, e3, n2, t2, f2) {
  var l2, s2, u3 = {};
  for (s2 in e3)
    s2 == "ref" ? l2 = e3[s2] : u3[s2] = e3[s2];
  var a2 = { type: _3, props: u3, key: n2, ref: l2, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --o3, __source: f2, __self: t2 };
  if (typeof _3 == "function" && (l2 = _3.defaultProps))
    for (s2 in l2)
      u3[s2] === void 0 && (u3[s2] = l2[s2]);
  return l.vnode && l.vnode(a2), a2;
}

// ../../node_modules/@mui/base/BadgeUnstyled/BadgeUnstyled.js
var _excluded = ["badgeContent", "component", "children", "className", "components", "componentsProps", "invisible", "max", "showZero"];
var useUtilityClasses = (ownerState) => {
  const {
    invisible
  } = ownerState;
  const slots = {
    root: ["root"],
    badge: ["badge", invisible && "invisible"]
  };
  return composeClasses(slots, getBadgeUnstyledUtilityClass, void 0);
};
var BadgeUnstyled = React10.forwardRef(function BadgeUnstyled2(props, ref) {
  const {
    component,
    children: children2,
    className,
    components = {},
    componentsProps = {},
    max: maxProp = 99,
    showZero = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const {
    badgeContent,
    max: max2,
    displayValue,
    invisible
  } = useBadge(_extends({}, props, {
    max: maxProp
  }));
  const ownerState = _extends({}, props, {
    badgeContent,
    invisible,
    max: max2,
    showZero
  });
  const classes = useUtilityClasses(ownerState);
  const Root = component || components.Root || "span";
  const rootProps = appendOwnerState(Root, _extends({}, other, componentsProps.root), ownerState);
  const Badge = components.Badge || "span";
  const badgeProps = appendOwnerState(Badge, componentsProps.badge, ownerState);
  return e2(Root, _extends({}, rootProps, {
    ref
  }, other, {
    className: clsx_m_default(classes.root, rootProps.className, className),
    children: [children2, e2(Badge, _extends({}, badgeProps, {
      className: clsx_m_default(classes.badge, badgeProps.className),
      children: displayValue
    }))]
  }));
});
false ? BadgeUnstyled.propTypes = {
  badgeContent: import_prop_types4.default.node,
  children: import_prop_types4.default.node,
  className: import_prop_types4.default.string,
  component: import_prop_types4.default.elementType,
  components: import_prop_types4.default.shape({
    Badge: import_prop_types4.default.elementType,
    Root: import_prop_types4.default.elementType
  }),
  componentsProps: import_prop_types4.default.shape({
    badge: import_prop_types4.default.object,
    root: import_prop_types4.default.object
  }),
  invisible: import_prop_types4.default.bool,
  max: import_prop_types4.default.number,
  showZero: import_prop_types4.default.bool
} : void 0;

// ../../node_modules/@mui/base/ButtonUnstyled/ButtonUnstyled.js
var import_prop_types5 = __toESM(require_prop_types());
import * as React12 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/base/ButtonUnstyled/buttonUnstyledClasses.js
function getButtonUnstyledUtilityClass(slot) {
  return generateUtilityClass("ButtonUnstyled", slot);
}
var buttonUnstyledClasses = generateUtilityClasses("ButtonUnstyled", ["root", "active", "disabled", "focusVisible"]);

// ../../node_modules/@mui/base/ButtonUnstyled/useButton.js
import * as React11 from "https://spike.land/dist/react.mjs";
function useButton(parameters) {
  const {
    component = "button",
    disabled = false,
    focusableWhenDisabled,
    href,
    ref,
    tabIndex,
    to,
    type
  } = parameters;
  const buttonRef = React11.useRef();
  const [active, setActive] = React11.useState(false);
  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React11.useState(false);
  if (disabled && !focusableWhenDisabled && focusVisible) {
    setFocusVisible(false);
  }
  React11.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);
  const createHandleMouseLeave = (otherHandlers) => (event) => {
    var _otherHandlers$onMous;
    if (focusVisible) {
      event.preventDefault();
    }
    (_otherHandlers$onMous = otherHandlers.onMouseLeave) == null ? void 0 : _otherHandlers$onMous.call(otherHandlers, event);
  };
  const createHandleBlur = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur;
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    (_otherHandlers$onBlur = otherHandlers.onBlur) == null ? void 0 : _otherHandlers$onBlur.call(otherHandlers, event);
  };
  const createHandleFocus = (otherHandlers) => (event) => {
    var _otherHandlers$onFocu2;
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      var _otherHandlers$onFocu;
      setFocusVisible(true);
      (_otherHandlers$onFocu = otherHandlers.onFocusVisible) == null ? void 0 : _otherHandlers$onFocu.call(otherHandlers, event);
    }
    (_otherHandlers$onFocu2 = otherHandlers.onFocus) == null ? void 0 : _otherHandlers$onFocu2.call(otherHandlers, event);
  };
  const isNonNativeButton = () => {
    const button = buttonRef.current;
    return component !== "button" && !((button == null ? void 0 : button.tagName) === "A" && button != null && button.href);
  };
  const createHandleClick = (otherHandlers) => (event) => {
    if (!disabled) {
      var _otherHandlers$onClic;
      (_otherHandlers$onClic = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic.call(otherHandlers, event);
    }
  };
  const createHandleMouseDown = (otherHandlers) => (event) => {
    var _otherHandlers$onMous2;
    if (event.target === event.currentTarget && !disabled) {
      setActive(true);
    }
    (_otherHandlers$onMous2 = otherHandlers.onMouseDown) == null ? void 0 : _otherHandlers$onMous2.call(otherHandlers, event);
  };
  const createHandleMouseUp = (otherHandlers) => (event) => {
    var _otherHandlers$onMous3;
    if (event.target === event.currentTarget) {
      setActive(false);
    }
    (_otherHandlers$onMous3 = otherHandlers.onMouseUp) == null ? void 0 : _otherHandlers$onMous3.call(otherHandlers, event);
  };
  const createHandleKeyDown = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyD;
    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null ? void 0 : _otherHandlers$onKeyD.call(otherHandlers, event);
    if (event.defaultPrevented) {
      return;
    }
    if (event.target === event.currentTarget && isNonNativeButton() && event.key === " ") {
      event.preventDefault();
    }
    if (event.target === event.currentTarget && event.key === " " && !disabled) {
      setActive(true);
    }
    if (event.target === event.currentTarget && isNonNativeButton() && event.key === "Enter" && !disabled) {
      var _otherHandlers$onClic2;
      (_otherHandlers$onClic2 = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic2.call(otherHandlers, event);
      event.preventDefault();
    }
  };
  const createHandleKeyUp = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyU;
    if (event.target === event.currentTarget) {
      setActive(false);
    }
    (_otherHandlers$onKeyU = otherHandlers.onKeyUp) == null ? void 0 : _otherHandlers$onKeyU.call(otherHandlers, event);
    if (event.target === event.currentTarget && isNonNativeButton() && !disabled && event.key === " " && !event.defaultPrevented) {
      var _otherHandlers$onClic3;
      (_otherHandlers$onClic3 = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic3.call(otherHandlers, event);
    }
  };
  const handleOwnRef = useForkRef(focusVisibleRef, buttonRef);
  const handleRef = useForkRef(ref, handleOwnRef);
  const [hostElementName, setHostElementName] = React11.useState("");
  const updateRef = (instance) => {
    var _instance$tagName;
    setHostElementName((_instance$tagName = instance == null ? void 0 : instance.tagName) != null ? _instance$tagName : "");
    setRef(handleRef, instance);
  };
  const buttonProps = {};
  if (hostElementName === "BUTTON") {
    buttonProps.type = type != null ? type : "button";
    if (focusableWhenDisabled) {
      buttonProps["aria-disabled"] = disabled;
    } else {
      buttonProps.disabled = disabled;
    }
  } else if (hostElementName !== "") {
    if (!href && !to) {
      buttonProps.role = "button";
      buttonProps.tabIndex = tabIndex != null ? tabIndex : 0;
    }
    if (disabled) {
      buttonProps["aria-disabled"] = disabled;
      buttonProps.tabIndex = focusableWhenDisabled ? tabIndex != null ? tabIndex : 0 : -1;
    }
  }
  const getRootProps = (otherHandlers = {}) => {
    const propsEventHandlers = extractEventHandlers(parameters);
    const externalEventHandlers = _extends({}, propsEventHandlers, otherHandlers);
    delete externalEventHandlers.onFocusVisible;
    return _extends({
      type
    }, externalEventHandlers, buttonProps, {
      onBlur: createHandleBlur(externalEventHandlers),
      onClick: createHandleClick(externalEventHandlers),
      onFocus: createHandleFocus(externalEventHandlers),
      onKeyDown: createHandleKeyDown(externalEventHandlers),
      onKeyUp: createHandleKeyUp(externalEventHandlers),
      onMouseDown: createHandleMouseDown(externalEventHandlers),
      onMouseLeave: createHandleMouseLeave(externalEventHandlers),
      onMouseUp: createHandleMouseUp(externalEventHandlers),
      ref: updateRef
    });
  };
  return {
    getRootProps,
    focusVisible,
    setFocusVisible,
    disabled,
    active
  };
}

// ../../node_modules/@mui/base/ButtonUnstyled/ButtonUnstyled.js
var _excluded2 = ["action", "children", "className", "component", "components", "componentsProps", "disabled", "focusableWhenDisabled", "onBlur", "onClick", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseLeave"];
var useUtilityClasses2 = (ownerState) => {
  const {
    active,
    disabled,
    focusVisible
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible", active && "active"]
  };
  return composeClasses(slots, getButtonUnstyledUtilityClass, {});
};
var ButtonUnstyled = React12.forwardRef(function ButtonUnstyled2(props, forwardedRef) {
  var _ref, _componentsProps$root;
  const {
    action,
    children: children2,
    className,
    component,
    components = {},
    componentsProps = {},
    focusableWhenDisabled = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded2);
  const buttonRef = React12.useRef();
  const handleRef = useForkRef(buttonRef, forwardedRef);
  const ButtonRoot2 = (_ref = component != null ? component : components.Root) != null ? _ref : "button";
  const {
    active,
    focusVisible,
    setFocusVisible,
    getRootProps
  } = useButton(_extends({}, props, {
    component: ButtonRoot2,
    focusableWhenDisabled,
    ref: handleRef
  }));
  React12.useImperativeHandle(action, () => ({
    focusVisible: () => {
      setFocusVisible(true);
      buttonRef.current.focus();
    }
  }), [setFocusVisible]);
  const ownerState = _extends({}, props, {
    active,
    focusableWhenDisabled,
    focusVisible
  });
  const classes = useUtilityClasses2(ownerState);
  const buttonRootProps = appendOwnerState(ButtonRoot2, _extends({}, getRootProps(), other, componentsProps.root, {
    className: clsx_m_default(classes.root, className, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className)
  }), ownerState);
  return e2(ButtonRoot2, _extends({}, buttonRootProps, {
    children: children2
  }));
});
false ? ButtonUnstyled.propTypes = {
  action: import_prop_types5.default.oneOfType([import_prop_types5.default.func, import_prop_types5.default.shape({
    current: import_prop_types5.default.shape({
      focusVisible: import_prop_types5.default.func.isRequired
    })
  })]),
  children: import_prop_types5.default.node,
  className: import_prop_types5.default.string,
  component: import_prop_types5.default.elementType,
  components: import_prop_types5.default.shape({
    Root: import_prop_types5.default.elementType
  }),
  componentsProps: import_prop_types5.default.shape({
    root: import_prop_types5.default.object
  }),
  disabled: import_prop_types5.default.bool,
  focusableWhenDisabled: import_prop_types5.default.bool,
  onFocusVisible: import_prop_types5.default.func
} : void 0;

// ../../node_modules/@mui/base/ClickAwayListener/ClickAwayListener.js
var import_prop_types6 = __toESM(require_prop_types());
import * as React13 from "https://spike.land/dist/react.mjs";
false ? ClickAwayListener.propTypes = {
  children: elementAcceptingRef_default.isRequired,
  disableReactTree: import_prop_types6.default.bool,
  mouseEvent: import_prop_types6.default.oneOf(["onClick", "onMouseDown", "onMouseUp", false]),
  onClickAway: import_prop_types6.default.func.isRequired,
  touchEvent: import_prop_types6.default.oneOf(["onTouchEnd", "onTouchStart", false])
} : void 0;
if (false) {
  ClickAwayListener["propTypes"] = exactProp(ClickAwayListener.propTypes);
}

// ../../node_modules/@mui/base/FormControlUnstyled/FormControlUnstyled.js
var import_prop_types7 = __toESM(require_prop_types());
import * as React15 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/base/FormControlUnstyled/FormControlUnstyledContext.js
import * as React14 from "https://spike.land/dist/react.mjs";
var FormControlUnstyledContext = React14.createContext(void 0);
if (false) {
  FormControlUnstyledContext.displayName = "FormControlUnstyledContext";
}
var FormControlUnstyledContext_default = FormControlUnstyledContext;

// ../../node_modules/@mui/base/FormControlUnstyled/formControlUnstyledClasses.js
var formControlUnstyledClasses = generateUtilityClasses("BaseFormControl", ["root", "disabled", "error", "filled", "focused", "required"]);
var formControlUnstyledClasses_default = formControlUnstyledClasses;

// ../../node_modules/@mui/base/FormControlUnstyled/FormControlUnstyled.js
var _excluded3 = ["defaultValue", "children", "className", "component", "components", "componentsProps", "disabled", "error", "onChange", "required", "value"];
function hasValue(value) {
  return value != null && !(Array.isArray(value) && value.length === 0) && value !== "";
}
var FormControlUnstyled = React15.forwardRef(function FormControlUnstyled2(props, ref) {
  var _ref;
  const {
    defaultValue,
    children: children2,
    className,
    component,
    components = {},
    componentsProps = {},
    disabled = false,
    error = false,
    onChange,
    required = false,
    value: incomingValue
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded3);
  const [value, setValue] = useControlled({
    controlled: incomingValue,
    default: defaultValue,
    name: "FormControl",
    state: "value"
  });
  const filled = hasValue(value);
  const [focused, setFocused] = React15.useState(false);
  if (disabled && focused) {
    setFocused(false);
  }
  const ownerState = _extends({}, props, {
    disabled,
    error,
    filled,
    focused,
    required
  });
  const handleChange = (event) => {
    setValue(event.target.value);
    onChange == null ? void 0 : onChange(event);
  };
  const childContext = {
    disabled,
    error,
    filled,
    focused,
    onBlur: () => {
      setFocused(false);
    },
    onChange: handleChange,
    onFocus: () => {
      setFocused(true);
    },
    required,
    value: value != null ? value : ""
  };
  const Root = (_ref = component != null ? component : components.Root) != null ? _ref : "div";
  const rootProps = appendOwnerState(Root, _extends({}, other, componentsProps.root), ownerState);
  const renderChildren = () => {
    if (typeof children2 === "function") {
      return children2(childContext);
    }
    return children2;
  };
  return e2(FormControlUnstyledContext_default.Provider, {
    value: childContext,
    children: e2(Root, _extends({
      ref
    }, rootProps, {
      className: clsx_m_default(formControlUnstyledClasses_default.root, className, rootProps == null ? void 0 : rootProps.className, disabled && formControlUnstyledClasses_default.disabled, error && formControlUnstyledClasses_default.error, filled && formControlUnstyledClasses_default.filled, focused && formControlUnstyledClasses_default.focused, required && formControlUnstyledClasses_default.required),
      children: renderChildren()
    }))
  });
});
false ? FormControlUnstyled.propTypes = {
  children: import_prop_types7.default.oneOfType([import_prop_types7.default.node, import_prop_types7.default.func]),
  className: import_prop_types7.default.string,
  component: import_prop_types7.default.elementType,
  components: import_prop_types7.default.shape({
    Root: import_prop_types7.default.elementType
  }),
  componentsProps: import_prop_types7.default.shape({
    root: import_prop_types7.default.object
  }),
  defaultValue: import_prop_types7.default.any,
  disabled: import_prop_types7.default.bool,
  error: import_prop_types7.default.bool,
  onChange: import_prop_types7.default.func,
  required: import_prop_types7.default.bool,
  value: import_prop_types7.default.any
} : void 0;

// ../../node_modules/@mui/base/FormControlUnstyled/useFormControlUnstyledContext.js
import * as React16 from "https://spike.land/dist/react.mjs";
function useFormControlUnstyledContext() {
  return React16.useContext(FormControlUnstyledContext_default);
}

// ../../node_modules/@mui/base/InputUnstyled/InputUnstyled.js
import * as React18 from "https://spike.land/dist/react.mjs";
var import_prop_types8 = __toESM(require_prop_types());

// ../../node_modules/@mui/base/InputUnstyled/inputUnstyledClasses.js
var inputBaseClasses = generateUtilityClasses("MuiInput", ["root", "formControl", "focused", "disabled", "error", "multiline", "input", "inputMultiline", "inputTypeSearch", "adornedStart", "adornedEnd"]);
var inputUnstyledClasses_default = inputBaseClasses;

// ../../node_modules/@mui/base/InputUnstyled/useInput.js
import * as React17 from "https://spike.land/dist/react.mjs";
function useInput(props, inputRef) {
  const {
    defaultValue: defaultValueProp,
    disabled: disabledProp = false,
    error: errorProp = false,
    onBlur,
    onChange,
    onFocus,
    required: requiredProp = false,
    value: valueProp
  } = props;
  const formControlContext = useFormControlUnstyledContext();
  let defaultValue;
  let disabled;
  let error;
  let required;
  let value;
  if (formControlContext) {
    var _formControlContext$d, _formControlContext$e, _formControlContext$r;
    defaultValue = void 0;
    disabled = (_formControlContext$d = formControlContext.disabled) != null ? _formControlContext$d : false;
    error = (_formControlContext$e = formControlContext.error) != null ? _formControlContext$e : false;
    required = (_formControlContext$r = formControlContext.required) != null ? _formControlContext$r : false;
    value = formControlContext.value;
    if (false) {
      const definedLocalProps = ["defaultValue", "disabled", "error", "required", "value"].filter((prop) => props[prop] !== void 0);
      if (definedLocalProps.length > 0) {
        console.warn(["MUI: You have set props on an input that is inside a FormControlUnstyled.", "Set these props on a FormControlUnstyled instead. Otherwise they will be ignored.", `Ignored props: ${definedLocalProps.join(", ")}`].join("\n"));
      }
    }
  } else {
    defaultValue = defaultValueProp;
    disabled = disabledProp;
    error = errorProp;
    required = requiredProp;
    value = valueProp;
  }
  const {
    current: isControlled
  } = React17.useRef(value != null);
  const handleInputRefWarning = React17.useCallback((instance) => {
    if (false) {
      if (instance && instance.nodeName !== "INPUT" && !instance.focus) {
        console.error(["MUI: You have provided a `components.Input` to the input component", "that does not correctly handle the `ref` prop.", "Make sure the `ref` prop is called with a HTMLInputElement."].join("\n"));
      }
    }
  }, []);
  const internalInputRef = React17.useRef(null);
  const handleIncomingRef = useForkRef(inputRef, handleInputRefWarning);
  const handleInputRef = useForkRef(internalInputRef, handleIncomingRef);
  const [focused, setFocused] = React17.useState(false);
  React17.useEffect(() => {
    if (!formControlContext && disabled && focused) {
      setFocused(false);
      onBlur == null ? void 0 : onBlur();
    }
  }, [formControlContext, disabled, focused, onBlur]);
  const handleFocus = (otherHandlers) => (event) => {
    var _otherHandlers$onFocu;
    if (formControlContext != null && formControlContext.disabled) {
      event.stopPropagation();
      return;
    }
    (_otherHandlers$onFocu = otherHandlers.onFocus) == null ? void 0 : _otherHandlers$onFocu.call(otherHandlers, event);
    if (formControlContext && formControlContext.onFocus) {
      var _formControlContext$o;
      formControlContext == null ? void 0 : (_formControlContext$o = formControlContext.onFocus) == null ? void 0 : _formControlContext$o.call(formControlContext);
    } else {
      setFocused(true);
    }
  };
  const handleBlur2 = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur;
    (_otherHandlers$onBlur = otherHandlers.onBlur) == null ? void 0 : _otherHandlers$onBlur.call(otherHandlers, event);
    if (formControlContext && formControlContext.onBlur) {
      formControlContext.onBlur();
    } else {
      setFocused(false);
    }
  };
  const handleChange = (otherHandlers) => (event, ...args) => {
    var _formControlContext$o2, _otherHandlers$onChan;
    if (!isControlled) {
      const element = event.target || internalInputRef.current;
      if (element == null) {
        throw new Error(false ? `MUI: Expected valid input target. Did you use a custom \`components.Input\` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info.` : formatMuiErrorMessage(17));
      }
    }
    formControlContext == null ? void 0 : (_formControlContext$o2 = formControlContext.onChange) == null ? void 0 : _formControlContext$o2.call(formControlContext, event);
    (_otherHandlers$onChan = otherHandlers.onChange) == null ? void 0 : _otherHandlers$onChan.call(otherHandlers, event, ...args);
  };
  const handleClick = (otherHandlers) => (event) => {
    var _otherHandlers$onClic;
    if (internalInputRef.current && event.currentTarget === event.target) {
      internalInputRef.current.focus();
    }
    (_otherHandlers$onClic = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic.call(otherHandlers, event);
  };
  const getRootProps = (externalProps) => {
    const propsEventHandlers = extractEventHandlers(props, ["onBlur", "onChange", "onFocus"]);
    const externalEventHandlers = _extends({}, propsEventHandlers, extractEventHandlers(externalProps));
    return _extends({}, externalProps, externalEventHandlers, {
      onClick: handleClick(externalEventHandlers)
    });
  };
  const getInputProps = (externalProps) => {
    const propsEventHandlers = {
      onBlur,
      onChange,
      onFocus
    };
    const externalEventHandlers = _extends({}, propsEventHandlers, extractEventHandlers(externalProps));
    const mergedEventHandlers = _extends({}, externalProps, externalEventHandlers, {
      onBlur: handleBlur2(externalEventHandlers),
      onChange: handleChange(externalEventHandlers),
      onFocus: handleFocus(externalEventHandlers)
    });
    return _extends({}, mergedEventHandlers, {
      "aria-invalid": error || void 0,
      defaultValue,
      ref: handleInputRef,
      value,
      required,
      disabled
    });
  };
  return {
    disabled,
    error,
    focused,
    formControlContext,
    getInputProps,
    getRootProps,
    required,
    value
  };
}

// ../../node_modules/@mui/base/InputUnstyled/InputUnstyled.js
var _excluded4 = ["aria-describedby", "aria-label", "aria-labelledby", "autoComplete", "autoFocus", "className", "component", "components", "componentsProps", "defaultValue", "disabled", "endAdornment", "error", "id", "maxRows", "minRows", "multiline", "name", "onClick", "onChange", "onKeyDown", "onKeyUp", "onFocus", "onBlur", "placeholder", "readOnly", "required", "rows", "type", "startAdornment", "value"];
var _excluded22 = ["ownerState"];
var InputUnstyled = React18.forwardRef(function InputUnstyled2(props, ref) {
  var _componentsProps$inpu, _ref, _componentsProps$root, _components$Input, _componentsProps$inpu2;
  const {
    "aria-describedby": ariaDescribedby,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    autoComplete,
    autoFocus,
    className,
    component,
    components = {},
    componentsProps = {},
    defaultValue,
    disabled,
    endAdornment,
    error,
    id,
    maxRows,
    minRows,
    multiline = false,
    name,
    onClick,
    onChange,
    onKeyDown,
    onKeyUp,
    onFocus,
    onBlur,
    placeholder,
    readOnly,
    required,
    rows,
    type = "text",
    startAdornment,
    value
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded4);
  const {
    getRootProps,
    getInputProps,
    focused,
    formControlContext,
    error: errorState,
    disabled: disabledState
  } = useInput({
    disabled,
    defaultValue,
    error,
    onBlur,
    onClick,
    onChange,
    onFocus,
    required,
    value
  }, (_componentsProps$inpu = componentsProps.input) == null ? void 0 : _componentsProps$inpu.ref);
  const ownerState = _extends({}, props, {
    disabled: disabledState,
    error: errorState,
    focused,
    formControlContext,
    multiline,
    type
  });
  const rootStateClasses = clsx_m_default(disabledState && inputUnstyledClasses_default.disabled, errorState && inputUnstyledClasses_default.error, focused && inputUnstyledClasses_default.focused, Boolean(formControlContext) && inputUnstyledClasses_default.formControl, multiline && inputUnstyledClasses_default.multiline, Boolean(startAdornment) && inputUnstyledClasses_default.adornedStart, Boolean(endAdornment) && inputUnstyledClasses_default.adornedEnd);
  const inputStateClasses = clsx_m_default(disabledState && inputUnstyledClasses_default.disabled, multiline && inputUnstyledClasses_default.multiline);
  const propsToForward = {
    "aria-describedby": ariaDescribedby,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    autoComplete,
    autoFocus,
    id,
    onKeyDown,
    onKeyUp,
    name,
    placeholder,
    readOnly,
    type
  };
  const Root = (_ref = component != null ? component : components.Root) != null ? _ref : "div";
  const rootProps = appendOwnerState(Root, _extends({}, getRootProps(_extends({}, other, componentsProps.root)), {
    className: clsx_m_default(inputUnstyledClasses_default.root, rootStateClasses, className, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className)
  }), ownerState);
  let Input = (_components$Input = components.Input) != null ? _components$Input : "input";
  let inputProps = appendOwnerState(Input, _extends({}, getInputProps(_extends({}, componentsProps.input, propsToForward)), {
    className: clsx_m_default(inputUnstyledClasses_default.input, inputStateClasses, (_componentsProps$inpu2 = componentsProps.input) == null ? void 0 : _componentsProps$inpu2.className)
  }), ownerState);
  if (multiline) {
    var _components$Textarea, _components$Textarea2;
    const hasHostTextarea = isHostComponent_default((_components$Textarea = components.Textarea) != null ? _components$Textarea : "textarea");
    const inputPropsWithoutOwnerState = _objectWithoutPropertiesLoose(inputProps, _excluded22);
    if (rows) {
      if (false) {
        if (minRows || maxRows) {
          console.warn("MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.");
        }
      }
    }
    inputProps = _extends({
      type: void 0
    }, !hasHostTextarea && {
      minRows: rows || minRows,
      maxRows: rows || maxRows
    }, hasHostTextarea ? inputPropsWithoutOwnerState : inputProps);
    Input = (_components$Textarea2 = components.Textarea) != null ? _components$Textarea2 : "textarea";
  }
  return e2(Root, _extends({}, rootProps, {
    ref,
    children: [startAdornment, e2(Input, _extends({}, inputProps)), endAdornment]
  }));
});
false ? InputUnstyled.propTypes = {
  "aria-describedby": import_prop_types8.default.string,
  "aria-label": import_prop_types8.default.string,
  "aria-labelledby": import_prop_types8.default.string,
  autoComplete: import_prop_types8.default.string,
  autoFocus: import_prop_types8.default.bool,
  children: import_prop_types8.default.node,
  className: import_prop_types8.default.string,
  component: import_prop_types8.default.elementType,
  components: import_prop_types8.default.shape({
    Input: import_prop_types8.default.elementType,
    Root: import_prop_types8.default.elementType,
    Textarea: import_prop_types8.default.elementType
  }),
  componentsProps: import_prop_types8.default.shape({
    input: import_prop_types8.default.object,
    root: import_prop_types8.default.object
  }),
  defaultValue: import_prop_types8.default.any,
  disabled: import_prop_types8.default.bool,
  endAdornment: import_prop_types8.default.node,
  error: import_prop_types8.default.bool,
  id: import_prop_types8.default.string,
  maxRows: import_prop_types8.default.number,
  minRows: import_prop_types8.default.number,
  multiline: import_prop_types8.default.bool,
  name: import_prop_types8.default.string,
  onBlur: import_prop_types8.default.func,
  onChange: import_prop_types8.default.func,
  onClick: import_prop_types8.default.func,
  onFocus: import_prop_types8.default.func,
  onKeyDown: import_prop_types8.default.func,
  onKeyUp: import_prop_types8.default.func,
  placeholder: import_prop_types8.default.string,
  readOnly: import_prop_types8.default.bool,
  required: import_prop_types8.default.bool,
  rows: import_prop_types8.default.number,
  startAdornment: import_prop_types8.default.node,
  type: import_prop_types8.default.string,
  value: import_prop_types8.default.any
} : void 0;

// ../../node_modules/@mui/base/ListboxUnstyled/useListbox.js
import * as React20 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/base/ListboxUnstyled/useListbox.types.js
var ActionTypes;
(function(ActionTypes2) {
  ActionTypes2["blur"] = "blur";
  ActionTypes2["focus"] = "focus";
  ActionTypes2["keyDown"] = "keyDown";
  ActionTypes2["optionClick"] = "optionClick";
  ActionTypes2["optionHover"] = "optionHover";
  ActionTypes2["optionsChange"] = "optionsChange";
  ActionTypes2["setValue"] = "setValue";
  ActionTypes2["setHighlight"] = "setHighlight";
  ActionTypes2["textNavigation"] = "textNagivation";
})(ActionTypes || (ActionTypes = {}));

// ../../node_modules/@mui/base/ListboxUnstyled/defaultListboxReducer.js
var pageSize = 5;
function findValidOptionToHighlight(index, lookupDirection, options, focusDisabled, isOptionDisabled, wrapAround) {
  if (options.length === 0 || options.every((o4, i2) => isOptionDisabled(o4, i2))) {
    return -1;
  }
  let nextFocus = index;
  for (; ; ) {
    if (!wrapAround && lookupDirection === "next" && nextFocus === options.length || !wrapAround && lookupDirection === "previous" && nextFocus === -1) {
      return -1;
    }
    const nextFocusDisabled = focusDisabled ? false : isOptionDisabled(options[nextFocus], nextFocus);
    if (nextFocusDisabled) {
      nextFocus += lookupDirection === "next" ? 1 : -1;
      if (wrapAround) {
        nextFocus = (nextFocus + options.length) % options.length;
      }
    } else {
      return nextFocus;
    }
  }
}
function getNewHighlightedOption(options, previouslyHighlightedOption, diff, lookupDirection, highlightDisabled, isOptionDisabled, wrapAround, optionComparer) {
  var _options$nextIndex;
  const maxIndex = options.length - 1;
  const defaultHighlightedIndex = -1;
  let nextIndexCandidate;
  const previouslyHighlightedIndex = previouslyHighlightedOption == null ? -1 : options.findIndex((option) => optionComparer(option, previouslyHighlightedOption));
  if (diff === "reset") {
    var _options$defaultHighl;
    return defaultHighlightedIndex === -1 ? null : (_options$defaultHighl = options[defaultHighlightedIndex]) != null ? _options$defaultHighl : null;
  }
  if (diff === "start") {
    nextIndexCandidate = 0;
  } else if (diff === "end") {
    nextIndexCandidate = maxIndex;
  } else {
    const newIndex = previouslyHighlightedIndex + diff;
    if (newIndex < 0) {
      if (!wrapAround && previouslyHighlightedIndex !== -1 || Math.abs(diff) > 1) {
        nextIndexCandidate = 0;
      } else {
        nextIndexCandidate = maxIndex;
      }
    } else if (newIndex > maxIndex) {
      if (!wrapAround || Math.abs(diff) > 1) {
        nextIndexCandidate = maxIndex;
      } else {
        nextIndexCandidate = 0;
      }
    } else {
      nextIndexCandidate = newIndex;
    }
  }
  const nextIndex = findValidOptionToHighlight(nextIndexCandidate, lookupDirection, options, highlightDisabled, isOptionDisabled, wrapAround);
  return (_options$nextIndex = options[nextIndex]) != null ? _options$nextIndex : null;
}
function handleOptionSelection(option, state, props) {
  const {
    multiple,
    optionComparer = (o4, v) => o4 === v,
    isOptionDisabled = () => false
  } = props;
  const {
    selectedValue
  } = state;
  const optionIndex = props.options.indexOf(option);
  if (isOptionDisabled(option, optionIndex)) {
    return state;
  }
  if (multiple) {
    var _ref, _ref2;
    const selectedValues = (_ref = selectedValue) != null ? _ref : [];
    const newSelectedValues = selectedValues.some((sv) => optionComparer(sv, option)) ? selectedValue.filter((v) => !optionComparer(v, option)) : [...(_ref2 = selectedValue) != null ? _ref2 : [], option];
    return {
      selectedValue: newSelectedValues,
      highlightedValue: option
    };
  }
  if (selectedValue != null && optionComparer(option, selectedValue)) {
    return state;
  }
  return {
    selectedValue: option,
    highlightedValue: option
  };
}
function handleKeyDown2(event, state, props) {
  const {
    options,
    isOptionDisabled,
    disableListWrap,
    disabledItemsFocusable,
    optionComparer
  } = props;
  const moveHighlight = (diff, direction, wrapAround) => {
    return getNewHighlightedOption(options, state.highlightedValue, diff, direction, disabledItemsFocusable != null ? disabledItemsFocusable : false, isOptionDisabled != null ? isOptionDisabled : () => false, wrapAround, optionComparer);
  };
  switch (event.key) {
    case "Home":
      return _extends({}, state, {
        highlightedValue: moveHighlight("start", "next", false)
      });
    case "End":
      return _extends({}, state, {
        highlightedValue: moveHighlight("end", "previous", false)
      });
    case "PageUp":
      return _extends({}, state, {
        highlightedValue: moveHighlight(-pageSize, "previous", false)
      });
    case "PageDown":
      return _extends({}, state, {
        highlightedValue: moveHighlight(pageSize, "next", false)
      });
    case "ArrowUp":
      return _extends({}, state, {
        highlightedValue: moveHighlight(-1, "previous", !(disableListWrap != null ? disableListWrap : false))
      });
    case "ArrowDown":
      return _extends({}, state, {
        highlightedValue: moveHighlight(1, "next", !(disableListWrap != null ? disableListWrap : false))
      });
    case "Enter":
    case " ":
      if (state.highlightedValue === null) {
        return state;
      }
      return handleOptionSelection(state.highlightedValue, state, props);
    default:
      break;
  }
  return state;
}
function handleBlur(state) {
  return _extends({}, state, {
    highlightedValue: null
  });
}
var textCriteriaMatches = (nextFocus, searchString, stringifyOption) => {
  var _stringifyOption;
  const text = (_stringifyOption = stringifyOption(nextFocus)) == null ? void 0 : _stringifyOption.trim().toLowerCase();
  if (!text || text.length === 0) {
    return false;
  }
  return text.indexOf(searchString) === 0;
};
function handleTextNavigation(state, searchString, props) {
  const {
    options,
    isOptionDisabled,
    disableListWrap,
    disabledItemsFocusable,
    optionComparer,
    optionStringifier
  } = props;
  const moveHighlight = (previouslyHighlightedOption) => {
    return getNewHighlightedOption(options, previouslyHighlightedOption, 1, "next", disabledItemsFocusable != null ? disabledItemsFocusable : false, isOptionDisabled != null ? isOptionDisabled : () => false, !(disableListWrap != null ? disableListWrap : false), optionComparer);
  };
  const startWithCurrentOption = searchString.length > 1;
  let nextOption = startWithCurrentOption ? state.highlightedValue : moveHighlight(state.highlightedValue);
  for (let index = 0; index < options.length; index += 1) {
    if (!nextOption || !startWithCurrentOption && state.highlightedValue === nextOption) {
      return state;
    }
    if (textCriteriaMatches(nextOption, searchString, optionStringifier) && (!isOptionDisabled(nextOption, options.indexOf(nextOption)) || disabledItemsFocusable)) {
      return _extends({}, state, {
        highlightedValue: nextOption
      });
    }
    nextOption = moveHighlight(nextOption);
  }
  return state;
}
function handleOptionsChange(options, previousOptions, state, props) {
  var _options$find, _options$find2;
  const {
    multiple,
    optionComparer
  } = props;
  const newHighlightedOption = state.highlightedValue == null ? null : (_options$find = options.find((option) => optionComparer(option, state.highlightedValue))) != null ? _options$find : null;
  if (multiple) {
    var _ref3;
    const selectedValues = (_ref3 = state.selectedValue) != null ? _ref3 : [];
    const newSelectedValues = selectedValues.filter((selectedValue) => options.some((option) => optionComparer(option, selectedValue)));
    return {
      highlightedValue: newHighlightedOption,
      selectedValue: newSelectedValues
    };
  }
  const newSelectedValue = (_options$find2 = options.find((option) => optionComparer(option, state.selectedValue))) != null ? _options$find2 : null;
  return {
    highlightedValue: newHighlightedOption,
    selectedValue: newSelectedValue
  };
}
function defaultListboxReducer(state, action) {
  const {
    type
  } = action;
  switch (type) {
    case ActionTypes.keyDown:
      return handleKeyDown2(action.event, state, action.props);
    case ActionTypes.optionClick:
      return handleOptionSelection(action.option, state, action.props);
    case ActionTypes.blur:
      return handleBlur(state);
    case ActionTypes.setValue:
      return _extends({}, state, {
        selectedValue: action.value
      });
    case ActionTypes.setHighlight:
      return _extends({}, state, {
        highlightedValue: action.highlight
      });
    case ActionTypes.textNavigation:
      return handleTextNavigation(state, action.searchString, action.props);
    case ActionTypes.optionsChange:
      return handleOptionsChange(action.options, action.previousOptions, state, action.props);
    default:
      return state;
  }
}

// ../../node_modules/@mui/base/ListboxUnstyled/useControllableReducer.js
import * as React19 from "https://spike.land/dist/react.mjs";
function useReducerReturnValueHandler(state, value, options, optionComparer, setValueState, onValueChange, onHighlightChange) {
  const valueRef = React19.useRef(value);
  valueRef.current = value;
  const onValueChangeRef = React19.useRef(onValueChange);
  React19.useEffect(() => {
    onValueChangeRef.current = onValueChange;
  }, [onValueChange]);
  const onHighlightChangeRef = React19.useRef(onHighlightChange);
  React19.useEffect(() => {
    onHighlightChangeRef.current = onHighlightChange;
  }, [onHighlightChange]);
  React19.useEffect(() => {
    if (Array.isArray(state.selectedValue)) {
      if (areArraysEqual(state.selectedValue, valueRef.current)) {
        return;
      }
    } else if (state.selectedValue == null && valueRef.current == null || state.selectedValue != null && valueRef.current != null && optionComparer.current(state.selectedValue, valueRef.current)) {
      return;
    }
    setValueState(state.selectedValue);
    if (state.selectedValue != null) {
      var _onValueChangeRef$cur;
      (_onValueChangeRef$cur = onValueChangeRef.current) == null ? void 0 : _onValueChangeRef$cur.call(onValueChangeRef, state.selectedValue);
    }
  }, [state.selectedValue, setValueState, optionComparer]);
  React19.useEffect(() => {
    var _onHighlightChangeRef;
    (_onHighlightChangeRef = onHighlightChangeRef.current) == null ? void 0 : _onHighlightChangeRef.call(onHighlightChangeRef, state.highlightedValue);
  }, [state.highlightedValue]);
}
function useControllableReducer(internalReducer, externalReducer, props) {
  const {
    value: controlledValue,
    defaultValue,
    onChange: onValueChange,
    onHighlightChange,
    options,
    optionComparer
  } = props;
  const propsRef = React19.useRef(props);
  propsRef.current = props;
  const [value, setValueState] = useControlled({
    controlled: controlledValue,
    default: defaultValue,
    name: "useListbox"
  });
  const previousValueRef = React19.useRef(null);
  const [state, dispatch] = React19.useReducer(externalReducer != null ? externalReducer : internalReducer, {
    highlightedValue: null,
    selectedValue: value
  });
  const optionComparerRef = React19.useRef(optionComparer);
  optionComparerRef.current = optionComparer;
  React19.useEffect(() => {
    if (controlledValue === void 0) {
      return;
    }
    if (Array.isArray(controlledValue) && Array.isArray(previousValueRef.current) && areArraysEqual(previousValueRef.current, controlledValue, optionComparerRef.current)) {
      return;
    }
    if (!Array.isArray(controlledValue) && controlledValue != null && previousValueRef.current != null && optionComparerRef.current(controlledValue, previousValueRef.current)) {
      return;
    }
    previousValueRef.current = controlledValue;
    dispatch({
      type: ActionTypes.setValue,
      value: controlledValue
    });
  }, [controlledValue]);
  useReducerReturnValueHandler(state, value, options, optionComparerRef, setValueState, onValueChange, onHighlightChange);
  return [state, dispatch];
}

// ../../node_modules/@mui/base/ListboxUnstyled/useListbox.js
var TEXT_NAVIGATION_RESET_TIMEOUT = 500;
var defaultOptionComparer = (optionA, optionB) => optionA === optionB;
var defaultIsOptionDisabled = () => false;
var defaultOptionStringifier = (option) => typeof option === "string" ? option : String(option);
function useListbox(props) {
  var _props$optionIdGenera, _options$highlightedI;
  const {
    disabledItemsFocusable = false,
    disableListWrap = false,
    focusManagement = "activeDescendant",
    id: idProp,
    isOptionDisabled = defaultIsOptionDisabled,
    listboxRef: externalListboxRef,
    multiple = false,
    optionComparer = defaultOptionComparer,
    optionStringifier = defaultOptionStringifier,
    options,
    stateReducer: externalReducer
  } = props;
  const id = useId2(idProp);
  function defaultIdGenerator(_3, index) {
    return `${id}-option-${index}`;
  }
  const optionIdGenerator = (_props$optionIdGenera = props.optionIdGenerator) != null ? _props$optionIdGenera : defaultIdGenerator;
  const propsWithDefaults = _extends({}, props, {
    disabledItemsFocusable,
    disableListWrap,
    focusManagement,
    isOptionDisabled,
    multiple,
    optionComparer,
    optionStringifier
  });
  const listboxRef = React20.useRef(null);
  const handleRef = useForkRef(externalListboxRef, listboxRef);
  const textCriteriaRef = React20.useRef({
    searchString: "",
    lastTime: null
  });
  const [{
    highlightedValue,
    selectedValue
  }, dispatch] = useControllableReducer(defaultListboxReducer, externalReducer, propsWithDefaults);
  const highlightedIndex = React20.useMemo(() => {
    return highlightedValue == null ? -1 : options.findIndex((option) => optionComparer(option, highlightedValue));
  }, [highlightedValue, options, optionComparer]);
  const previousOptions = React20.useRef([]);
  React20.useEffect(() => {
    if (areArraysEqual(previousOptions.current, options, optionComparer)) {
      return;
    }
    dispatch({
      type: ActionTypes.optionsChange,
      options,
      previousOptions: previousOptions.current,
      props: propsWithDefaults
    });
    previousOptions.current = options;
  }, [options, optionComparer, dispatch]);
  const setSelectedValue = React20.useCallback((option) => {
    dispatch({
      type: ActionTypes.setValue,
      value: option
    });
  }, [dispatch]);
  const setHighlightedValue = React20.useCallback((option) => {
    dispatch({
      type: ActionTypes.setHighlight,
      highlight: option
    });
  }, [dispatch]);
  const createHandleOptionClick = (option, other) => (event) => {
    var _other$onClick;
    (_other$onClick = other.onClick) == null ? void 0 : _other$onClick.call(other, event);
    if (event.defaultPrevented) {
      return;
    }
    event.preventDefault();
    dispatch({
      type: ActionTypes.optionClick,
      option,
      event,
      props: propsWithDefaults
    });
  };
  const createHandleOptionMouseOver = (option, other) => (event) => {
    var _other$onMouseOver;
    (_other$onMouseOver = other.onMouseOver) == null ? void 0 : _other$onMouseOver.call(other, event);
    if (event.defaultPrevented) {
      return;
    }
    dispatch({
      type: ActionTypes.optionHover,
      option,
      event,
      props: propsWithDefaults
    });
  };
  const createHandleKeyDown = (other) => (event) => {
    var _other$onKeyDown;
    (_other$onKeyDown = other.onKeyDown) == null ? void 0 : _other$onKeyDown.call(other, event);
    if (event.defaultPrevented) {
      return;
    }
    const keysToPreventDefault = [" ", "Enter", "ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown"];
    if (keysToPreventDefault.includes(event.key)) {
      event.preventDefault();
    }
    dispatch({
      type: ActionTypes.keyDown,
      event,
      props: propsWithDefaults
    });
    if (event.key.length === 1) {
      const textCriteria = textCriteriaRef.current;
      const lowerKey = event.key.toLowerCase();
      const currentTime = performance.now();
      if (textCriteria.searchString.length > 0 && textCriteria.lastTime && currentTime - textCriteria.lastTime > TEXT_NAVIGATION_RESET_TIMEOUT) {
        textCriteria.searchString = lowerKey;
      } else if (textCriteria.searchString.length !== 1 || lowerKey !== textCriteria.searchString) {
        textCriteria.searchString += lowerKey;
      }
      textCriteria.lastTime = currentTime;
      dispatch({
        type: ActionTypes.textNavigation,
        searchString: textCriteria.searchString,
        props: propsWithDefaults
      });
    }
  };
  const createHandleBlur = (other) => (event) => {
    var _other$onBlur, _listboxRef$current;
    (_other$onBlur = other.onBlur) == null ? void 0 : _other$onBlur.call(other, event);
    if (event.defaultPrevented) {
      return;
    }
    if ((_listboxRef$current = listboxRef.current) != null && _listboxRef$current.contains(document.activeElement)) {
      return;
    }
    dispatch({
      type: ActionTypes.blur,
      event,
      props: propsWithDefaults
    });
  };
  const getRootProps = (otherHandlers = {}) => {
    return _extends({}, otherHandlers, {
      "aria-activedescendant": focusManagement === "activeDescendant" && highlightedValue != null ? optionIdGenerator(highlightedValue, highlightedIndex) : void 0,
      id,
      onBlur: createHandleBlur(otherHandlers),
      onKeyDown: createHandleKeyDown(otherHandlers),
      role: "listbox",
      tabIndex: focusManagement === "DOM" ? -1 : 0,
      ref: handleRef
    });
  };
  const getOptionState = (option) => {
    let selected;
    const index = options.findIndex((opt) => optionComparer(opt, option));
    if (multiple) {
      var _ref;
      selected = ((_ref = selectedValue) != null ? _ref : []).some((value) => value != null && optionComparer(option, value));
    } else {
      selected = optionComparer(option, selectedValue);
    }
    const disabled = isOptionDisabled(option, index);
    return {
      selected,
      disabled,
      highlighted: highlightedIndex === index
    };
  };
  const getOptionTabIndex = (optionState) => {
    if (focusManagement === "activeDescendant") {
      return void 0;
    }
    if (!optionState.highlighted) {
      return -1;
    }
    if (optionState.disabled && !disabledItemsFocusable) {
      return -1;
    }
    return 0;
  };
  const getOptionProps = (option, otherHandlers = {}) => {
    const optionState = getOptionState(option);
    const index = options.findIndex((opt) => optionComparer(opt, option));
    return _extends({}, otherHandlers, {
      "aria-disabled": optionState.disabled || void 0,
      "aria-selected": optionState.selected,
      tabIndex: getOptionTabIndex(optionState),
      id: optionIdGenerator(option, index),
      onClick: createHandleOptionClick(option, otherHandlers),
      onMouseOver: createHandleOptionMouseOver(option, otherHandlers),
      role: "option"
    });
  };
  React20.useDebugValue({
    highlightedOption: options[highlightedIndex],
    selectedOption: selectedValue
  });
  return {
    getRootProps,
    getOptionProps,
    getOptionState,
    highlightedOption: (_options$highlightedI = options[highlightedIndex]) != null ? _options$highlightedI : null,
    selectedOption: selectedValue,
    setSelectedValue,
    setHighlightedValue
  };
}

// ../../node_modules/@mui/base/MenuUnstyled/MenuUnstyled.js
var import_prop_types11 = __toESM(require_prop_types());
import * as React25 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/base/MenuUnstyled/MenuUnstyledContext.js
import * as React21 from "https://spike.land/dist/react.mjs";
var MenuUnstyledContext = React21.createContext(null);
MenuUnstyledContext.displayName = "MenuUnstyledContext";
var MenuUnstyledContext_default = MenuUnstyledContext;

// ../../node_modules/@mui/base/MenuUnstyled/menuUnstyledClasses.js
function getMenuUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiMenuUnstyled", slot);
}
var menuUnstyledClasses = generateUtilityClasses("MuiMenuUnstyled", ["root", "listbox", "expanded"]);

// ../../node_modules/@mui/base/MenuUnstyled/useMenu.js
import * as React22 from "https://spike.land/dist/react.mjs";
function stateReducer(state, action) {
  if (action.type === ActionTypes.blur || action.type === ActionTypes.optionHover || action.type === ActionTypes.setValue) {
    return state;
  }
  const newState = defaultListboxReducer(state, action);
  if (action.type !== ActionTypes.setHighlight && newState.highlightedValue === null && action.props.options.length > 0) {
    return _extends({}, newState, {
      highlightedValue: action.props.options[0]
    });
  }
  return newState;
}
function useMenu(parameters) {
  const {
    listboxRef: listboxRefProp,
    open = false,
    onClose,
    listboxId
  } = parameters;
  const [menuItems, setMenuItems] = React22.useState({});
  const listboxRef = React22.useRef(null);
  const handleRef = useForkRef(listboxRef, listboxRefProp);
  const registerItem = React22.useCallback((id, metadata) => {
    setMenuItems((previousState) => {
      const newState = _extends({}, previousState);
      newState[id] = metadata;
      return newState;
    });
  }, []);
  const unregisterItem = React22.useCallback((id) => {
    setMenuItems((previousState) => {
      const newState = _extends({}, previousState);
      delete newState[id];
      return newState;
    });
  }, []);
  const {
    getOptionState,
    getOptionProps,
    getRootProps,
    highlightedOption,
    setHighlightedValue: setListboxHighlight
  } = useListbox({
    options: Object.keys(menuItems),
    optionStringifier: (id) => {
      var _menuItems$id$ref$cur;
      return menuItems[id].label || ((_menuItems$id$ref$cur = menuItems[id].ref.current) == null ? void 0 : _menuItems$id$ref$cur.innerText);
    },
    isOptionDisabled: (id) => {
      var _menuItems$id;
      return (menuItems == null ? void 0 : (_menuItems$id = menuItems[id]) == null ? void 0 : _menuItems$id.disabled) || false;
    },
    listboxRef: handleRef,
    focusManagement: "DOM",
    id: listboxId,
    stateReducer,
    disabledItemsFocusable: true
  });
  const highlightFirstItem = React22.useCallback(() => {
    if (Object.keys(menuItems).length > 0) {
      setListboxHighlight(menuItems[Object.keys(menuItems)[0]].id);
    }
  }, [menuItems, setListboxHighlight]);
  const highlightLastItem = React22.useCallback(() => {
    if (Object.keys(menuItems).length > 0) {
      setListboxHighlight(menuItems[Object.keys(menuItems)[Object.keys(menuItems).length - 1]].id);
    }
  }, [menuItems, setListboxHighlight]);
  React22.useEffect(() => {
    if (!open) {
      highlightFirstItem();
    }
  }, [open, highlightFirstItem]);
  const createHandleKeyDown = (otherHandlers) => (e3) => {
    var _otherHandlers$onKeyD;
    otherHandlers == null ? void 0 : (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null ? void 0 : _otherHandlers$onKeyD.call(otherHandlers, e3);
    if (e3.defaultPrevented) {
      return;
    }
    if (e3.key === "Escape" && open) {
      onClose == null ? void 0 : onClose();
    }
  };
  const createHandleBlur = (otherHandlers) => (e3) => {
    var _listboxRef$current;
    otherHandlers == null ? void 0 : otherHandlers.onBlur(e3);
    if (!((_listboxRef$current = listboxRef.current) != null && _listboxRef$current.contains(e3.relatedTarget))) {
      onClose == null ? void 0 : onClose();
    }
  };
  React22.useEffect(() => {
    var _listboxRef$current2;
    if ((_listboxRef$current2 = listboxRef.current) != null && _listboxRef$current2.contains(document.activeElement) && highlightedOption !== null) {
      var _menuItems$highlighte, _menuItems$highlighte2;
      menuItems == null ? void 0 : (_menuItems$highlighte = menuItems[highlightedOption]) == null ? void 0 : (_menuItems$highlighte2 = _menuItems$highlighte.ref.current) == null ? void 0 : _menuItems$highlighte2.focus();
    }
  }, [highlightedOption, menuItems]);
  const getListboxProps = (otherHandlers) => _extends({}, otherHandlers, getRootProps(_extends({}, otherHandlers, {
    onBlur: createHandleBlur(otherHandlers),
    onKeyDown: createHandleKeyDown(otherHandlers)
  })), {
    role: "menu"
  });
  const getItemState = (id) => {
    const {
      disabled,
      highlighted
    } = getOptionState(id);
    return {
      disabled,
      highlighted
    };
  };
  React22.useDebugValue({
    menuItems,
    highlightedOption
  });
  return {
    registerItem,
    unregisterItem,
    menuItems,
    getListboxProps,
    getItemState,
    getItemProps: getOptionProps,
    highlightedOption,
    highlightFirstItem,
    highlightLastItem
  };
}

// ../../node_modules/@popperjs/core/lib/enums.js
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

// ../../node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument2 = node.ownerDocument;
    return ownerDocument2 ? ownerDocument2.defaultView || window : window;
  }
  return node;
}

// ../../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// ../../node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style3 = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style3);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style3 = styleProperties.reduce(function(style4, property) {
        style4[property] = "";
        return style4;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style3);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect,
  requires: ["computeStyles"]
};

// ../../node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
  return placement.split("-")[0];
}

// ../../node_modules/@popperjs/core/lib/utils/math.js
var max = Math.max;
var min = Math.min;
var round = Math.round;

// ../../node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (isHTMLElement(element) && includeScale) {
    var offsetHeight = element.offsetHeight;
    var offsetWidth = element.offsetWidth;
    if (offsetWidth > 0) {
      scaleX = round(rect.width) / offsetWidth || 1;
    }
    if (offsetHeight > 0) {
      scaleY = round(rect.height) / offsetHeight || 1;
    }
  }
  return {
    width: rect.width / scaleX,
    height: rect.height / scaleY,
    top: rect.top / scaleY,
    right: rect.right / scaleX,
    bottom: rect.bottom / scaleY,
    left: rect.left / scaleX,
    x: rect.left / scaleX,
    y: rect.top / scaleY
  };
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width2 = element.offsetWidth;
  var height2 = element.offsetHeight;
  if (Math.abs(clientRect.width - width2) <= 1) {
    width2 = clientRect.width;
  }
  if (Math.abs(clientRect.height - height2) <= 1) {
    height2 = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width2,
    height: height2
  };
}

// ../../node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

// ../../node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
  var isIE = navigator.userAgent.indexOf("Trident") !== -1;
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css4 = getComputedStyle(currentNode);
    if (css4.transform !== "none" || css4.perspective !== "none" || css4.contain === "paint" || ["transform", "perspective"].indexOf(css4.willChange) !== -1 || isFirefox && css4.willChange === "filter" || isFirefox && css4.filter && css4.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}

// ../../node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}

// ../../node_modules/@popperjs/core/lib/utils/within.js
function within(min2, value, max2) {
  return max(min2, min(value, max2));
}
function withinMaxClamp(min2, value, max2) {
  var v = within(min2, value, max2);
  return v > max2 ? max2 : v;
}

// ../../node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

// ../../node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

// ../../node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

// ../../node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject2(padding2, state) {
  padding2 = typeof padding2 === "function" ? padding2(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding2;
  return mergePaddingObject(typeof padding2 !== "number" ? padding2 : expandToHashMap(padding2, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect2(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (false) {
    if (!isHTMLElement(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "));
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    if (false) {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
    }
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow_default = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect2,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};

// ../../node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split("-")[1];
}

// ../../node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x2 = _ref.x, y2 = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x2 * dpr) / dpr || 0,
    y: round(y2 * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position2 = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x2 = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y2 = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x: x2,
    y: y2
  }) : {
    x: x2,
    y: y2
  };
  x2 = _ref3.x;
  y2 = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle(offsetParent).position !== "static" && position2 === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
      y2 -= offsetY - popperRect.height;
      y2 *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
      x2 -= offsetX - popperRect.width;
      x2 *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position: position2
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x2,
    y: y2
  }) : {
    x: x2,
    y: y2
  };
  x2 = _ref4.x;
  y2 = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x2 + "px, " + y2 + "px)" : "translate3d(" + x2 + "px, " + y2 + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y2 + "px" : "", _Object$assign2[sideX] = hasX ? x2 + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  if (false) {
    var transitionProperty = getComputedStyle(state.elements.popper).transitionProperty || "";
    if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
    }
  }
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};

// ../../node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = {
  passive: true
};
function effect3(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect: effect3,
  data: {}
};

// ../../node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash[matched];
  });
}

// ../../node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var hash2 = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash2[matched];
  });
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width2 = html.clientWidth;
  var height2 = html.clientHeight;
  var x2 = 0;
  var y2 = 0;
  if (visualViewport) {
    width2 = visualViewport.width;
    height2 = visualViewport.height;
    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x2 = visualViewport.offsetLeft;
      y2 = visualViewport.offsetTop;
    }
  }
  return {
    width: width2,
    height: height2,
    x: x2 + getWindowScrollBarX(element),
    y: y2
  };
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width2 = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height2 = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x2 = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y2 = -winScroll.scrollTop;
  if (getComputedStyle(body || html).direction === "rtl") {
    x2 += max(html.clientWidth, body ? body.clientWidth : 0) - width2;
  }
  return {
    width: width2,
    height: height2,
    x: x2,
    y: y2
  };
}

// ../../node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle(element), overflow2 = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow2 + overflowY + overflowX);
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}

// ../../node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}

// ../../node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

// ../../node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}

// ../../node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding2 = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding2 !== "number" ? padding2 : expandToHashMap(padding2, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}

// ../../node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding2 = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
    if (false) {
      console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" "));
    }
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding: padding2
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a2, b2) {
    return overflows[a2] - overflows[b2];
  });
}

// ../../node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding2 = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding: padding2,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i2 = 0; i2 < placements2.length; i2++) {
    var placement = placements2[i2];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow2 = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding: padding2
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow2[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow2[mainVariationSide] <= 0, overflow2[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip_default = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};

// ../../node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow2, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow2.top - rect.height - preventedOffsets.y,
    right: overflow2.right - rect.width + preventedOffsets.x,
    bottom: overflow2.bottom - rect.height + preventedOffsets.y,
    left: overflow2.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow2) {
  return [top, right, bottom, left].some(function(side) {
    return overflow2[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};

// ../../node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x2 = _data$state$placement.x, y2 = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x2;
    state.modifiersData.popperOffsets.y += y2;
  }
  state.modifiersData[name] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};

// ../../node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};

// ../../node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}

// ../../node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding2 = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow2 = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding: padding2,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min2 = offset2 + overflow2[mainSide];
    var max2 = offset2 - overflow2[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min2, tetherMin) : min2, offset2, tether ? max(max2, tetherMax) : max2);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow2[_mainSide];
    var _max = _offset - overflow2[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow_default = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};

// ../../node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

// ../../node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// ../../node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

// ../../node_modules/@popperjs/core/lib/utils/debounce.js
function debounce2(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}

// ../../node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}

// ../../node_modules/@popperjs/core/lib/createPopper.js
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers3 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper4(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers3, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m2) {
          return m2.enabled;
        });
        if (false) {
          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
            var name = _ref.name;
            return name;
          });
          validateModifiers(modifiers);
          if (getBasePlacement(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function(_ref2) {
              var name = _ref2.name;
              return name === "flip";
            });
            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
            }
          }
          var _getComputedStyle = getComputedStyle(popper2), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
          if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin2) {
            return parseFloat(margin2);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
          }
        }
        runModifierEffects();
        return instance.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          if (false) {
            console.error(INVALID_ELEMENT_ERROR);
          }
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (false) {
            __debug_loops__ += 1;
            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      update: debounce2(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      if (false) {
        console.error(INVALID_ELEMENT_ERROR);
      }
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect4 = _ref3.effect;
        if (typeof effect4 === "function") {
          var cleanupFn = effect4({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var createPopper = popperGenerator();

// ../../node_modules/@popperjs/core/lib/popper-lite.js
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default];
var createPopper2 = popperGenerator({
  defaultModifiers
});

// ../../node_modules/@popperjs/core/lib/popper.js
var defaultModifiers2 = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
var createPopper3 = popperGenerator({
  defaultModifiers: defaultModifiers2
});

// ../../node_modules/@mui/base/PopperUnstyled/PopperUnstyled.js
var import_prop_types10 = __toESM(require_prop_types());
import * as React24 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/base/Portal/Portal.js
var import_prop_types9 = __toESM(require_prop_types());
import * as React23 from "https://spike.land/dist/react.mjs";
import * as ReactDOM from "https://spike.land/dist/react.mjs";
function getContainer(container) {
  return typeof container === "function" ? container() : container;
}
var Portal = React23.forwardRef(function Portal2(props, ref) {
  const {
    children: children2,
    container,
    disablePortal = false
  } = props;
  const [mountNode, setMountNode] = React23.useState(null);
  const handleRef = useForkRef(React23.isValidElement(children2) ? children2.ref : null, ref);
  useEnhancedEffect_default(() => {
    if (!disablePortal) {
      setMountNode(getContainer(container) || document.body);
    }
  }, [container, disablePortal]);
  useEnhancedEffect_default(() => {
    if (mountNode && !disablePortal) {
      setRef(ref, mountNode);
      return () => {
        setRef(ref, null);
      };
    }
    return void 0;
  }, [ref, mountNode, disablePortal]);
  if (disablePortal) {
    if (React23.isValidElement(children2)) {
      return React23.cloneElement(children2, {
        ref: handleRef
      });
    }
    return children2;
  }
  return mountNode ? ReactDOM.createPortal(children2, mountNode) : mountNode;
});
false ? Portal.propTypes = {
  children: import_prop_types9.default.node,
  container: import_prop_types9.default.oneOfType([HTMLElementType, import_prop_types9.default.func]),
  disablePortal: import_prop_types9.default.bool
} : void 0;
if (false) {
  Portal["propTypes"] = exactProp(Portal.propTypes);
}
var Portal_default = Portal;

// ../../node_modules/@mui/base/PopperUnstyled/PopperUnstyled.js
var _excluded5 = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "ownerState", "placement", "popperOptions", "popperRef", "TransitionProps"];
var _excluded23 = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition"];
function flipPlacement(placement, direction) {
  if (direction === "ltr") {
    return placement;
  }
  switch (placement) {
    case "bottom-end":
      return "bottom-start";
    case "bottom-start":
      return "bottom-end";
    case "top-end":
      return "top-start";
    case "top-start":
      return "top-end";
    default:
      return placement;
  }
}
function resolveAnchorEl(anchorEl) {
  return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}
var defaultPopperOptions = {};
var PopperTooltip = React24.forwardRef(function PopperTooltip2(props, ref) {
  const {
    anchorEl,
    children: children2,
    direction,
    disablePortal,
    modifiers,
    open,
    placement: initialPlacement,
    popperOptions,
    popperRef: popperRefProp,
    TransitionProps
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded5);
  const tooltipRef = React24.useRef(null);
  const ownRef = useForkRef(tooltipRef, ref);
  const popperRef = React24.useRef(null);
  const handlePopperRef = useForkRef(popperRef, popperRefProp);
  const handlePopperRefRef = React24.useRef(handlePopperRef);
  useEnhancedEffect_default(() => {
    handlePopperRefRef.current = handlePopperRef;
  }, [handlePopperRef]);
  React24.useImperativeHandle(popperRefProp, () => popperRef.current, []);
  const rtlPlacement = flipPlacement(initialPlacement, direction);
  const [placement, setPlacement] = React24.useState(rtlPlacement);
  React24.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.forceUpdate();
    }
  });
  useEnhancedEffect_default(() => {
    if (!anchorEl || !open) {
      return void 0;
    }
    const handlePopperUpdate = (data) => {
      setPlacement(data.placement);
    };
    const resolvedAnchorEl = resolveAnchorEl(anchorEl);
    if (false) {
      if (resolvedAnchorEl && resolvedAnchorEl.nodeType === 1) {
        const box = resolvedAnchorEl.getBoundingClientRect();
        if (box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
          console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join("\n"));
        }
      }
    }
    let popperModifiers = [{
      name: "preventOverflow",
      options: {
        altBoundary: disablePortal
      }
    }, {
      name: "flip",
      options: {
        altBoundary: disablePortal
      }
    }, {
      name: "onUpdate",
      enabled: true,
      phase: "afterWrite",
      fn: ({
        state
      }) => {
        handlePopperUpdate(state);
      }
    }];
    if (modifiers != null) {
      popperModifiers = popperModifiers.concat(modifiers);
    }
    if (popperOptions && popperOptions.modifiers != null) {
      popperModifiers = popperModifiers.concat(popperOptions.modifiers);
    }
    const popper2 = createPopper3(resolveAnchorEl(anchorEl), tooltipRef.current, _extends({
      placement: rtlPlacement
    }, popperOptions, {
      modifiers: popperModifiers
    }));
    handlePopperRefRef.current(popper2);
    return () => {
      popper2.destroy();
      handlePopperRefRef.current(null);
    };
  }, [anchorEl, disablePortal, modifiers, open, popperOptions, rtlPlacement]);
  const childProps = {
    placement
  };
  if (TransitionProps !== null) {
    childProps.TransitionProps = TransitionProps;
  }
  return e2("div", _extends({
    ref: ownRef,
    role: "tooltip"
  }, other, {
    children: typeof children2 === "function" ? children2(childProps) : children2
  }));
});
var PopperUnstyled = React24.forwardRef(function PopperUnstyled2(props, ref) {
  const {
    anchorEl,
    children: children2,
    container: containerProp,
    direction = "ltr",
    disablePortal = false,
    keepMounted = false,
    modifiers,
    open,
    placement = "bottom",
    popperOptions = defaultPopperOptions,
    popperRef,
    style: style3,
    transition = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded23);
  const [exited, setExited] = React24.useState(true);
  const handleEnter = () => {
    setExited(false);
  };
  const handleExited = () => {
    setExited(true);
  };
  if (!keepMounted && !open && (!transition || exited)) {
    return null;
  }
  const container = containerProp || (anchorEl ? ownerDocument(resolveAnchorEl(anchorEl)).body : void 0);
  return e2(Portal_default, {
    disablePortal,
    container,
    children: e2(PopperTooltip, _extends({
      anchorEl,
      direction,
      disablePortal,
      modifiers,
      ref,
      open: transition ? !exited : open,
      placement,
      popperOptions,
      popperRef
    }, other, {
      style: _extends({
        position: "fixed",
        top: 0,
        left: 0,
        display: !open && keepMounted && (!transition || exited) ? "none" : null
      }, style3),
      TransitionProps: transition ? {
        in: open,
        onEnter: handleEnter,
        onExited: handleExited
      } : null,
      children: children2
    }))
  });
});
false ? PopperUnstyled.propTypes = {
  anchorEl: chainPropTypes(import_prop_types10.default.oneOfType([HTMLElementType, import_prop_types10.default.object, import_prop_types10.default.func]), (props) => {
    if (props.open) {
      const resolvedAnchorEl = resolveAnchorEl(props.anchorEl);
      if (resolvedAnchorEl && resolvedAnchorEl.nodeType === 1) {
        const box = resolvedAnchorEl.getBoundingClientRect();
        if (box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join("\n"));
        }
      } else if (!resolvedAnchorEl || typeof resolvedAnchorEl.getBoundingClientRect !== "function" || resolvedAnchorEl.contextElement != null && resolvedAnchorEl.contextElement.nodeType !== 1) {
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "It should be an HTML element instance or a virtualElement ", "(https://popper.js.org/docs/v2/virtual-elements/)."].join("\n"));
      }
    }
    return null;
  }),
  children: import_prop_types10.default.oneOfType([import_prop_types10.default.node, import_prop_types10.default.func]),
  container: import_prop_types10.default.oneOfType([HTMLElementType, import_prop_types10.default.func]),
  direction: import_prop_types10.default.oneOf(["ltr", "rtl"]),
  disablePortal: import_prop_types10.default.bool,
  keepMounted: import_prop_types10.default.bool,
  modifiers: import_prop_types10.default.arrayOf(import_prop_types10.default.shape({
    data: import_prop_types10.default.object,
    effect: import_prop_types10.default.func,
    enabled: import_prop_types10.default.bool,
    fn: import_prop_types10.default.func,
    name: import_prop_types10.default.any,
    options: import_prop_types10.default.object,
    phase: import_prop_types10.default.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: import_prop_types10.default.arrayOf(import_prop_types10.default.string),
    requiresIfExists: import_prop_types10.default.arrayOf(import_prop_types10.default.string)
  })),
  open: import_prop_types10.default.bool.isRequired,
  placement: import_prop_types10.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  popperOptions: import_prop_types10.default.shape({
    modifiers: import_prop_types10.default.array,
    onFirstUpdate: import_prop_types10.default.func,
    placement: import_prop_types10.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: import_prop_types10.default.oneOf(["absolute", "fixed"])
  }),
  popperRef: refType_default,
  style: import_prop_types10.default.object,
  transition: import_prop_types10.default.bool
} : void 0;
var PopperUnstyled_default = PopperUnstyled;

// ../../node_modules/@mui/base/MenuUnstyled/MenuUnstyled.js
var _excluded6 = ["actions", "anchorEl", "children", "className", "component", "components", "componentsProps", "onClose", "open"];
function getUtilityClasses(ownerState) {
  const {
    open
  } = ownerState;
  const slots = {
    root: ["root", open && "expanded"],
    listbox: ["listbox", open && "expanded"]
  };
  return composeClasses(slots, getMenuUnstyledUtilityClass, {});
}
var MenuUnstyled = React25.forwardRef(function MenuUnstyled2(props, forwardedRef) {
  var _componentsProps$list, _componentsProps$list2, _ref, _componentsProps$root, _components$Listbox, _componentsProps$list3;
  const {
    actions,
    anchorEl,
    children: children2,
    className,
    component,
    components = {},
    componentsProps = {},
    onClose,
    open = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded6);
  const {
    registerItem,
    unregisterItem,
    getListboxProps,
    getItemProps,
    getItemState,
    highlightFirstItem,
    highlightLastItem
  } = useMenu({
    open,
    onClose,
    listboxRef: (_componentsProps$list = componentsProps.listbox) == null ? void 0 : _componentsProps$list.ref,
    listboxId: (_componentsProps$list2 = componentsProps.listbox) == null ? void 0 : _componentsProps$list2.id
  });
  React25.useImperativeHandle(actions, () => ({
    highlightFirstItem,
    highlightLastItem
  }), [highlightFirstItem, highlightLastItem]);
  const ownerState = _extends({}, props, {
    open
  });
  const classes = getUtilityClasses(ownerState);
  const Popper = (_ref = component != null ? component : components.Root) != null ? _ref : PopperUnstyled_default;
  const popperProps = appendOwnerState(Popper, _extends({}, other, {
    anchorEl,
    open,
    keepMounted: true,
    role: void 0
  }, componentsProps.root, {
    className: clsx_m_default(classes.root, className, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className)
  }), ownerState);
  const Listbox = (_components$Listbox = components.Listbox) != null ? _components$Listbox : "ul";
  const listboxProps = appendOwnerState(Listbox, _extends({}, componentsProps.listbox, getListboxProps(), {
    className: clsx_m_default(classes.listbox, (_componentsProps$list3 = componentsProps.listbox) == null ? void 0 : _componentsProps$list3.className)
  }), ownerState);
  const contextValue = {
    registerItem,
    unregisterItem,
    getItemState,
    getItemProps,
    open
  };
  return e2(Popper, _extends({}, popperProps, {
    ref: forwardedRef,
    children: e2(Listbox, _extends({}, listboxProps, {
      children: e2(MenuUnstyledContext_default.Provider, {
        value: contextValue,
        children: children2
      })
    }))
  }));
});
false ? MenuUnstyled.propTypes = {
  actions: refType_default,
  anchorEl: import_prop_types11.default.oneOfType([HTMLElementType, import_prop_types11.default.object, import_prop_types11.default.func]),
  children: import_prop_types11.default.node,
  className: import_prop_types11.default.string,
  component: import_prop_types11.default.elementType,
  components: import_prop_types11.default.shape({
    Listbox: import_prop_types11.default.elementType,
    Root: import_prop_types11.default.elementType
  }),
  componentsProps: import_prop_types11.default.shape({
    listbox: import_prop_types11.default.object,
    root: import_prop_types11.default.object
  }),
  onClose: import_prop_types11.default.func,
  open: import_prop_types11.default.bool
} : void 0;

// ../../node_modules/@mui/base/MenuItemUnstyled/MenuItemUnstyled.js
var import_prop_types12 = __toESM(require_prop_types());
import * as React27 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/base/MenuItemUnstyled/menuItemUnstyledClasses.js
function getMenuItemUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiMenuItemUnstyled", slot);
}
var menuItemUnstyledClasses = generateUtilityClasses("MuiMenuItemUnstyled", ["root", "disabled", "focusVisible"]);

// ../../node_modules/@mui/base/MenuItemUnstyled/useMenuItem.js
import * as React26 from "https://spike.land/dist/react.mjs";
function useMenuItem(props) {
  const {
    component,
    disabled = false,
    ref,
    label
  } = props;
  const id = useId2();
  const menuContext = React26.useContext(MenuUnstyledContext_default);
  const itemRef = React26.useRef(null);
  const handleRef = useForkRef(itemRef, ref);
  if (menuContext === null) {
    throw new Error("MenuItemUnstyled must be used within a MenuUnstyled");
  }
  const {
    registerItem,
    unregisterItem,
    open
  } = menuContext;
  React26.useEffect(() => {
    if (id === void 0) {
      return void 0;
    }
    registerItem(id, {
      disabled,
      id,
      ref: itemRef,
      label
    });
    return () => unregisterItem(id);
  }, [id, registerItem, unregisterItem, disabled, ref, label]);
  const {
    getRootProps: getButtonProps,
    focusVisible
  } = useButton({
    component,
    disabled,
    focusableWhenDisabled: true,
    ref: handleRef
  });
  const [focusRequested, requestFocus] = React26.useState(false);
  const focusIfRequested = React26.useCallback(() => {
    if (focusRequested && itemRef.current != null) {
      itemRef.current.focus();
      requestFocus(false);
    }
  }, [focusRequested]);
  React26.useEffect(() => {
    focusIfRequested();
  });
  React26.useDebugValue({
    id,
    disabled,
    label
  });
  const itemState = menuContext.getItemState(id != null ? id : "");
  const {
    highlighted
  } = itemState != null ? itemState : {
    highlighted: false
  };
  React26.useEffect(() => {
    requestFocus(highlighted && open);
  }, [highlighted, open]);
  if (id === void 0) {
    return {
      getRootProps: (other) => _extends({}, other, getButtonProps(other), {
        role: "menuitem"
      }),
      itemState: null,
      focusVisible
    };
  }
  return {
    getRootProps: (other) => {
      const optionProps = menuContext.getItemProps(id, other);
      return _extends({}, other, getButtonProps(other), {
        tabIndex: optionProps.tabIndex,
        id: optionProps.id,
        role: "menuitem"
      });
    },
    itemState,
    focusVisible
  };
}

// ../../node_modules/@mui/base/MenuItemUnstyled/MenuItemUnstyled.js
var _excluded7 = ["children", "className", "disabled", "component", "components", "componentsProps", "label"];
function getUtilityClasses2(ownerState) {
  const {
    disabled,
    focusVisible
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible"]
  };
  return composeClasses(slots, getMenuItemUnstyledUtilityClass, {});
}
var MenuItemUnstyled = React27.forwardRef(function MenuItemUnstyled2(props, ref) {
  var _ref, _componentsProps$root;
  const {
    children: children2,
    className,
    disabled = false,
    component,
    components = {},
    componentsProps = {},
    label
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded7);
  const Root = (_ref = component != null ? component : components.Root) != null ? _ref : "li";
  const {
    getRootProps,
    itemState,
    focusVisible
  } = useMenuItem({
    component: Root,
    disabled,
    ref,
    label
  });
  if (itemState == null) {
    return null;
  }
  const ownerState = _extends({}, props, itemState, {
    focusVisible
  });
  const classes = getUtilityClasses2(ownerState);
  const rootProps = appendOwnerState(Root, _extends({}, other, componentsProps.root, getRootProps(other), {
    className: clsx_m_default(classes.root, className, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className)
  }), ownerState);
  return e2(Root, _extends({}, rootProps, {
    children: children2
  }));
});
false ? MenuItemUnstyled.propTypes = {
  children: import_prop_types12.default.node,
  className: import_prop_types12.default.string,
  component: import_prop_types12.default.elementType,
  components: import_prop_types12.default.shape({
    Root: import_prop_types12.default.elementType
  }),
  componentsProps: import_prop_types12.default.shape({
    root: import_prop_types12.default.object
  }),
  disabled: import_prop_types12.default.bool,
  label: import_prop_types12.default.string
} : void 0;

// ../../node_modules/@mui/base/ModalUnstyled/ModalUnstyled.js
var import_prop_types14 = __toESM(require_prop_types());
import * as React29 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/base/ModalUnstyled/ModalManager.js
function isOverflowing(container) {
  const doc = ownerDocument(container);
  if (doc.body === container) {
    return ownerWindow(container).innerWidth > doc.documentElement.clientWidth;
  }
  return container.scrollHeight > container.clientHeight;
}
function ariaHidden(element, show) {
  if (show) {
    element.setAttribute("aria-hidden", "true");
  } else {
    element.removeAttribute("aria-hidden");
  }
}
function getPaddingRight(element) {
  return parseInt(ownerWindow(element).getComputedStyle(element).paddingRight, 10) || 0;
}
function ariaHiddenSiblings(container, mountElement, currentElement, elementsToExclude = [], show) {
  const blacklist = [mountElement, currentElement, ...elementsToExclude];
  const blacklistTagNames = ["TEMPLATE", "SCRIPT", "STYLE"];
  [].forEach.call(container.children, (element) => {
    if (blacklist.indexOf(element) === -1 && blacklistTagNames.indexOf(element.tagName) === -1) {
      ariaHidden(element, show);
    }
  });
}
function findIndexOf(items, callback) {
  let idx = -1;
  items.some((item, index) => {
    if (callback(item)) {
      idx = index;
      return true;
    }
    return false;
  });
  return idx;
}
function handleContainer(containerInfo, props) {
  const restoreStyle = [];
  const container = containerInfo.container;
  if (!props.disableScrollLock) {
    if (isOverflowing(container)) {
      const scrollbarSize = getScrollbarSize(ownerDocument(container));
      restoreStyle.push({
        value: container.style.paddingRight,
        property: "padding-right",
        el: container
      });
      container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`;
      const fixedElements = ownerDocument(container).querySelectorAll(".mui-fixed");
      [].forEach.call(fixedElements, (element) => {
        restoreStyle.push({
          value: element.style.paddingRight,
          property: "padding-right",
          el: element
        });
        element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
      });
    }
    const parent = container.parentElement;
    const containerWindow = ownerWindow(container);
    const scrollContainer = (parent == null ? void 0 : parent.nodeName) === "HTML" && containerWindow.getComputedStyle(parent).overflowY === "scroll" ? parent : container;
    restoreStyle.push({
      value: scrollContainer.style.overflow,
      property: "overflow",
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowX,
      property: "overflow-x",
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowY,
      property: "overflow-y",
      el: scrollContainer
    });
    scrollContainer.style.overflow = "hidden";
  }
  const restore = () => {
    restoreStyle.forEach(({
      value,
      el,
      property
    }) => {
      if (value) {
        el.style.setProperty(property, value);
      } else {
        el.style.removeProperty(property);
      }
    });
  };
  return restore;
}
function getHiddenSiblings(container) {
  const hiddenSiblings = [];
  [].forEach.call(container.children, (element) => {
    if (element.getAttribute("aria-hidden") === "true") {
      hiddenSiblings.push(element);
    }
  });
  return hiddenSiblings;
}
var ModalManager = class {
  constructor() {
    this.containers = void 0;
    this.modals = void 0;
    this.modals = [];
    this.containers = [];
  }
  add(modal, container) {
    let modalIndex = this.modals.indexOf(modal);
    if (modalIndex !== -1) {
      return modalIndex;
    }
    modalIndex = this.modals.length;
    this.modals.push(modal);
    if (modal.modalRef) {
      ariaHidden(modal.modalRef, false);
    }
    const hiddenSiblings = getHiddenSiblings(container);
    ariaHiddenSiblings(container, modal.mount, modal.modalRef, hiddenSiblings, true);
    const containerIndex = findIndexOf(this.containers, (item) => item.container === container);
    if (containerIndex !== -1) {
      this.containers[containerIndex].modals.push(modal);
      return modalIndex;
    }
    this.containers.push({
      modals: [modal],
      container,
      restore: null,
      hiddenSiblings
    });
    return modalIndex;
  }
  mount(modal, props) {
    const containerIndex = findIndexOf(this.containers, (item) => item.modals.indexOf(modal) !== -1);
    const containerInfo = this.containers[containerIndex];
    if (!containerInfo.restore) {
      containerInfo.restore = handleContainer(containerInfo, props);
    }
  }
  remove(modal) {
    const modalIndex = this.modals.indexOf(modal);
    if (modalIndex === -1) {
      return modalIndex;
    }
    const containerIndex = findIndexOf(this.containers, (item) => item.modals.indexOf(modal) !== -1);
    const containerInfo = this.containers[containerIndex];
    containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
    this.modals.splice(modalIndex, 1);
    if (containerInfo.modals.length === 0) {
      if (containerInfo.restore) {
        containerInfo.restore();
      }
      if (modal.modalRef) {
        ariaHidden(modal.modalRef, true);
      }
      ariaHiddenSiblings(containerInfo.container, modal.mount, modal.modalRef, containerInfo.hiddenSiblings, false);
      this.containers.splice(containerIndex, 1);
    } else {
      const nextTop = containerInfo.modals[containerInfo.modals.length - 1];
      if (nextTop.modalRef) {
        ariaHidden(nextTop.modalRef, false);
      }
    }
    return modalIndex;
  }
  isTopModal(modal) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
  }
};

// ../../node_modules/@mui/base/TrapFocus/TrapFocus.js
var import_prop_types13 = __toESM(require_prop_types());
import * as React28 from "https://spike.land/dist/react.mjs";
var candidatesSelector = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function getTabIndex(node) {
  const tabindexAttr = parseInt(node.getAttribute("tabindex"), 10);
  if (!Number.isNaN(tabindexAttr)) {
    return tabindexAttr;
  }
  if (node.contentEditable === "true" || (node.nodeName === "AUDIO" || node.nodeName === "VIDEO" || node.nodeName === "DETAILS") && node.getAttribute("tabindex") === null) {
    return 0;
  }
  return node.tabIndex;
}
function isNonTabbableRadio(node) {
  if (node.tagName !== "INPUT" || node.type !== "radio") {
    return false;
  }
  if (!node.name) {
    return false;
  }
  const getRadio = (selector) => node.ownerDocument.querySelector(`input[type="radio"]${selector}`);
  let roving = getRadio(`[name="${node.name}"]:checked`);
  if (!roving) {
    roving = getRadio(`[name="${node.name}"]`);
  }
  return roving !== node;
}
function isNodeMatchingSelectorFocusable(node) {
  if (node.disabled || node.tagName === "INPUT" && node.type === "hidden" || isNonTabbableRadio(node)) {
    return false;
  }
  return true;
}
function defaultGetTabbable(root) {
  const regularTabNodes = [];
  const orderedTabNodes = [];
  Array.from(root.querySelectorAll(candidatesSelector)).forEach((node, i2) => {
    const nodeTabIndex = getTabIndex(node);
    if (nodeTabIndex === -1 || !isNodeMatchingSelectorFocusable(node)) {
      return;
    }
    if (nodeTabIndex === 0) {
      regularTabNodes.push(node);
    } else {
      orderedTabNodes.push({
        documentOrder: i2,
        tabIndex: nodeTabIndex,
        node
      });
    }
  });
  return orderedTabNodes.sort((a2, b2) => a2.tabIndex === b2.tabIndex ? a2.documentOrder - b2.documentOrder : a2.tabIndex - b2.tabIndex).map((a2) => a2.node).concat(regularTabNodes);
}
function defaultIsEnabled() {
  return true;
}
function TrapFocus(props) {
  const {
    children: children2,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableRestoreFocus = false,
    getTabbable = defaultGetTabbable,
    isEnabled = defaultIsEnabled,
    open
  } = props;
  const ignoreNextEnforceFocus = React28.useRef();
  const sentinelStart = React28.useRef(null);
  const sentinelEnd = React28.useRef(null);
  const nodeToRestore = React28.useRef(null);
  const reactFocusEventTarget = React28.useRef(null);
  const activated = React28.useRef(false);
  const rootRef = React28.useRef(null);
  const handleRef = useForkRef(children2.ref, rootRef);
  const lastKeydown = React28.useRef(null);
  React28.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    activated.current = !disableAutoFocus;
  }, [disableAutoFocus, open]);
  React28.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    if (!rootRef.current.contains(doc.activeElement)) {
      if (!rootRef.current.hasAttribute("tabIndex")) {
        if (false) {
          console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join("\n"));
        }
        rootRef.current.setAttribute("tabIndex", -1);
      }
      if (activated.current) {
        rootRef.current.focus();
      }
    }
    return () => {
      if (!disableRestoreFocus) {
        if (nodeToRestore.current && nodeToRestore.current.focus) {
          ignoreNextEnforceFocus.current = true;
          nodeToRestore.current.focus();
        }
        nodeToRestore.current = null;
      }
    };
  }, [open]);
  React28.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    const contain = (nativeEvent) => {
      const {
        current: rootElement
      } = rootRef;
      if (rootElement === null) {
        return;
      }
      if (!doc.hasFocus() || disableEnforceFocus || !isEnabled() || ignoreNextEnforceFocus.current) {
        ignoreNextEnforceFocus.current = false;
        return;
      }
      if (!rootElement.contains(doc.activeElement)) {
        if (nativeEvent && reactFocusEventTarget.current !== nativeEvent.target || doc.activeElement !== reactFocusEventTarget.current) {
          reactFocusEventTarget.current = null;
        } else if (reactFocusEventTarget.current !== null) {
          return;
        }
        if (!activated.current) {
          return;
        }
        let tabbable = [];
        if (doc.activeElement === sentinelStart.current || doc.activeElement === sentinelEnd.current) {
          tabbable = getTabbable(rootRef.current);
        }
        if (tabbable.length > 0) {
          var _lastKeydown$current, _lastKeydown$current2;
          const isShiftTab = Boolean(((_lastKeydown$current = lastKeydown.current) == null ? void 0 : _lastKeydown$current.shiftKey) && ((_lastKeydown$current2 = lastKeydown.current) == null ? void 0 : _lastKeydown$current2.key) === "Tab");
          const focusNext = tabbable[0];
          const focusPrevious = tabbable[tabbable.length - 1];
          if (isShiftTab) {
            focusPrevious.focus();
          } else {
            focusNext.focus();
          }
        } else {
          rootElement.focus();
        }
      }
    };
    const loopFocus = (nativeEvent) => {
      lastKeydown.current = nativeEvent;
      if (disableEnforceFocus || !isEnabled() || nativeEvent.key !== "Tab") {
        return;
      }
      if (doc.activeElement === rootRef.current && nativeEvent.shiftKey) {
        ignoreNextEnforceFocus.current = true;
        sentinelEnd.current.focus();
      }
    };
    doc.addEventListener("focusin", contain);
    doc.addEventListener("keydown", loopFocus, true);
    const interval = setInterval(() => {
      if (doc.activeElement.tagName === "BODY") {
        contain();
      }
    }, 50);
    return () => {
      clearInterval(interval);
      doc.removeEventListener("focusin", contain);
      doc.removeEventListener("keydown", loopFocus, true);
    };
  }, [disableAutoFocus, disableEnforceFocus, disableRestoreFocus, isEnabled, open, getTabbable]);
  const onFocus = (event) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
    reactFocusEventTarget.current = event.target;
    const childrenPropsHandler = children2.props.onFocus;
    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };
  const handleFocusSentinel = (event) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
  };
  return e2(React28.Fragment, {
    children: [e2("div", {
      tabIndex: 0,
      onFocus: handleFocusSentinel,
      ref: sentinelStart,
      "data-test": "sentinelStart"
    }), React28.cloneElement(children2, {
      ref: handleRef,
      onFocus
    }), e2("div", {
      tabIndex: 0,
      onFocus: handleFocusSentinel,
      ref: sentinelEnd,
      "data-test": "sentinelEnd"
    })]
  });
}
false ? TrapFocus.propTypes = {
  children: elementAcceptingRef_default,
  disableAutoFocus: import_prop_types13.default.bool,
  disableEnforceFocus: import_prop_types13.default.bool,
  disableRestoreFocus: import_prop_types13.default.bool,
  getTabbable: import_prop_types13.default.func,
  isEnabled: import_prop_types13.default.func,
  open: import_prop_types13.default.bool.isRequired
} : void 0;
if (false) {
  TrapFocus["propTypes"] = exactProp(TrapFocus.propTypes);
}
var TrapFocus_default = TrapFocus;

// ../../node_modules/@mui/base/ModalUnstyled/modalUnstyledClasses.js
function getModalUtilityClass(slot) {
  return generateUtilityClass("MuiModal", slot);
}
var modalUnstyledClasses = generateUtilityClasses("MuiModal", ["root", "hidden"]);

// ../../node_modules/@mui/base/ModalUnstyled/ModalUnstyled.js
var _excluded8 = ["BackdropComponent", "BackdropProps", "children", "classes", "className", "closeAfterTransition", "component", "components", "componentsProps", "container", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "manager", "onBackdropClick", "onClose", "onKeyDown", "open", "theme", "onTransitionEnter", "onTransitionExited"];
var useUtilityClasses3 = (ownerState) => {
  const {
    open,
    exited,
    classes
  } = ownerState;
  const slots = {
    root: ["root", !open && exited && "hidden"]
  };
  return composeClasses(slots, getModalUtilityClass, classes);
};
function getContainer2(container) {
  return typeof container === "function" ? container() : container;
}
function getHasTransition(props) {
  return props.children ? props.children.props.hasOwnProperty("in") : false;
}
var defaultManager = new ModalManager();
var ModalUnstyled = React29.forwardRef(function ModalUnstyled2(props, ref) {
  const {
    BackdropComponent,
    BackdropProps,
    children: children2,
    classes: classesProp,
    className,
    closeAfterTransition = false,
    component = "div",
    components = {},
    componentsProps = {},
    container,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,
    manager = defaultManager,
    onBackdropClick,
    onClose,
    onKeyDown,
    open,
    theme,
    onTransitionEnter,
    onTransitionExited
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded8);
  const [exited, setExited] = React29.useState(true);
  const modal = React29.useRef({});
  const mountNodeRef = React29.useRef(null);
  const modalRef = React29.useRef(null);
  const handleRef = useForkRef(modalRef, ref);
  const hasTransition = getHasTransition(props);
  const getDoc = () => ownerDocument(mountNodeRef.current);
  const getModal = () => {
    modal.current.modalRef = modalRef.current;
    modal.current.mountNode = mountNodeRef.current;
    return modal.current;
  };
  const handleMounted = () => {
    manager.mount(getModal(), {
      disableScrollLock
    });
    modalRef.current.scrollTop = 0;
  };
  const handleOpen = useEventCallback(() => {
    const resolvedContainer = getContainer2(container) || getDoc().body;
    manager.add(getModal(), resolvedContainer);
    if (modalRef.current) {
      handleMounted();
    }
  });
  const isTopModal = React29.useCallback(() => manager.isTopModal(getModal()), [manager]);
  const handlePortalRef = useEventCallback((node) => {
    mountNodeRef.current = node;
    if (!node) {
      return;
    }
    if (open && isTopModal()) {
      handleMounted();
    } else {
      ariaHidden(modalRef.current, true);
    }
  });
  const handleClose = React29.useCallback(() => {
    manager.remove(getModal());
  }, [manager]);
  React29.useEffect(() => {
    return () => {
      handleClose();
    };
  }, [handleClose]);
  React29.useEffect(() => {
    if (open) {
      handleOpen();
    } else if (!hasTransition || !closeAfterTransition) {
      handleClose();
    }
  }, [open, handleClose, hasTransition, closeAfterTransition, handleOpen]);
  const ownerState = _extends({}, props, {
    classes: classesProp,
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    exited,
    hideBackdrop,
    keepMounted
  });
  const classes = useUtilityClasses3(ownerState);
  if (!keepMounted && !open && (!hasTransition || exited)) {
    return null;
  }
  const handleEnter = () => {
    setExited(false);
    if (onTransitionEnter) {
      onTransitionEnter();
    }
  };
  const handleExited = () => {
    setExited(true);
    if (onTransitionExited) {
      onTransitionExited();
    }
    if (closeAfterTransition) {
      handleClose();
    }
  };
  const handleBackdropClick = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    if (onBackdropClick) {
      onBackdropClick(event);
    }
    if (onClose) {
      onClose(event, "backdropClick");
    }
  };
  const handleKeyDown3 = (event) => {
    if (onKeyDown) {
      onKeyDown(event);
    }
    if (event.key !== "Escape" || !isTopModal()) {
      return;
    }
    if (!disableEscapeKeyDown) {
      event.stopPropagation();
      if (onClose) {
        onClose(event, "escapeKeyDown");
      }
    }
  };
  const childProps = {};
  if (children2.props.tabIndex === void 0) {
    childProps.tabIndex = "-1";
  }
  if (hasTransition) {
    childProps.onEnter = createChainedFunction(handleEnter, children2.props.onEnter);
    childProps.onExited = createChainedFunction(handleExited, children2.props.onExited);
  }
  const Root = components.Root || component;
  const rootProps = componentsProps.root || {};
  return e2(Portal_default, {
    ref: handlePortalRef,
    container,
    disablePortal,
    children: e2(Root, _extends({
      role: "presentation"
    }, rootProps, !isHostComponent_default(Root) && {
      as: component,
      ownerState: _extends({}, ownerState, rootProps.ownerState),
      theme
    }, other, {
      ref: handleRef,
      onKeyDown: handleKeyDown3,
      className: clsx_m_default(classes.root, rootProps.className, className),
      children: [!hideBackdrop && BackdropComponent ? e2(BackdropComponent, _extends({
        "aria-hidden": true,
        open,
        onClick: handleBackdropClick
      }, BackdropProps)) : null, e2(TrapFocus_default, {
        disableEnforceFocus,
        disableAutoFocus,
        disableRestoreFocus,
        isEnabled: isTopModal,
        open,
        children: React29.cloneElement(children2, childProps)
      })]
    }))
  });
});
false ? ModalUnstyled.propTypes = {
  BackdropComponent: import_prop_types14.default.elementType,
  BackdropProps: import_prop_types14.default.object,
  children: elementAcceptingRef_default.isRequired,
  classes: import_prop_types14.default.object,
  className: import_prop_types14.default.string,
  closeAfterTransition: import_prop_types14.default.bool,
  component: import_prop_types14.default.elementType,
  components: import_prop_types14.default.shape({
    Root: import_prop_types14.default.elementType
  }),
  componentsProps: import_prop_types14.default.shape({
    root: import_prop_types14.default.object
  }),
  container: import_prop_types14.default.oneOfType([HTMLElementType, import_prop_types14.default.func]),
  disableAutoFocus: import_prop_types14.default.bool,
  disableEnforceFocus: import_prop_types14.default.bool,
  disableEscapeKeyDown: import_prop_types14.default.bool,
  disablePortal: import_prop_types14.default.bool,
  disableRestoreFocus: import_prop_types14.default.bool,
  disableScrollLock: import_prop_types14.default.bool,
  hideBackdrop: import_prop_types14.default.bool,
  keepMounted: import_prop_types14.default.bool,
  onBackdropClick: import_prop_types14.default.func,
  onClose: import_prop_types14.default.func,
  onKeyDown: import_prop_types14.default.func,
  open: import_prop_types14.default.bool.isRequired
} : void 0;

// ../../node_modules/@mui/base/MultiSelectUnstyled/MultiSelectUnstyled.js
var import_prop_types15 = __toESM(require_prop_types());
import * as React33 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/base/SelectUnstyled/utils.js
import React30 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/base/SelectUnstyled/useSelect.types.js
function isOptionGroup(child) {
  return !!child.options;
}

// ../../node_modules/@mui/base/SelectUnstyled/utils.js
function getOptionsFromChildren(children2) {
  if (children2 == null) {
    return [];
  }
  const selectChildren = [];
  React30.Children.forEach(children2, (node) => {
    var _props, _props2, _element$props$disabl2;
    const nodeChildren = node == null ? void 0 : (_props = node.props) == null ? void 0 : _props.children;
    if ((node == null ? void 0 : (_props2 = node.props) == null ? void 0 : _props2.value) === void 0) {
      if (nodeChildren != null) {
        var _element$props$disabl;
        const element2 = node;
        const group = {
          options: getOptionsFromChildren(nodeChildren),
          label: element2.props.label,
          disabled: (_element$props$disabl = element2.props.disabled) != null ? _element$props$disabl : false
        };
        selectChildren.push(group);
      }
      return;
    }
    const element = node;
    const option = {
      value: element.props.value,
      label: element.props.label || element.props.children,
      disabled: (_element$props$disabl2 = element.props.disabled) != null ? _element$props$disabl2 : false
    };
    selectChildren.push(option);
  });
  return selectChildren != null ? selectChildren : [];
}
function flattenOptionGroups(groupedOptions, isGroupDisabled = false) {
  let flatOptions = [];
  groupedOptions.forEach((optionOrGroup) => {
    if (isOptionGroup(optionOrGroup)) {
      flatOptions = flatOptions.concat(flattenOptionGroups(optionOrGroup.options, optionOrGroup.disabled));
    } else {
      flatOptions.push(_extends({}, optionOrGroup, {
        disabled: isGroupDisabled || optionOrGroup.disabled
      }));
    }
  });
  return flatOptions;
}

// ../../node_modules/@mui/base/SelectUnstyled/useSelect.js
import * as React31 from "https://spike.land/dist/react.mjs";
var defaultOptionStringifier2 = (option) => {
  const {
    label,
    value
  } = option;
  if (typeof label === "string") {
    return label;
  }
  if (typeof value === "string") {
    return value;
  }
  return String(option);
};
function useSelect(props) {
  const {
    buttonComponent,
    buttonRef: buttonRefProp,
    defaultValue,
    disabled = false,
    listboxId,
    listboxRef: listboxRefProp,
    multiple = false,
    onChange,
    onOpenChange,
    open = false,
    options,
    optionStringifier = defaultOptionStringifier2,
    value: valueProp
  } = props;
  const buttonRef = React31.useRef(null);
  const handleButtonRef = useForkRef(buttonRefProp, buttonRef);
  const listboxRef = React31.useRef(null);
  const intermediaryListboxRef = useForkRef(listboxRefProp, listboxRef);
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "SelectUnstyled",
    state: "value"
  });
  const ignoreEnterKeyUp = React31.useRef(false);
  const ignoreClick = React31.useRef(false);
  const [listboxFocusRequested, requestListboxFocus] = React31.useState(false);
  const focusListboxIfRequested = React31.useCallback(() => {
    if (listboxFocusRequested && listboxRef.current != null) {
      listboxRef.current.focus();
      requestListboxFocus(false);
    }
  }, [listboxFocusRequested]);
  const updateListboxRef = (listboxElement) => {
    listboxRef.current = listboxElement;
    focusListboxIfRequested();
  };
  const handleListboxRef = useForkRef(intermediaryListboxRef, updateListboxRef);
  React31.useEffect(() => {
    focusListboxIfRequested();
  }, [focusListboxIfRequested]);
  React31.useEffect(() => {
    requestListboxFocus(open);
  }, [open]);
  const createHandleMouseDown = (otherHandlers) => (event) => {
    var _otherHandlers$onMous;
    otherHandlers == null ? void 0 : (_otherHandlers$onMous = otherHandlers.onMouseDown) == null ? void 0 : _otherHandlers$onMous.call(otherHandlers, event);
    if (!event.defaultPrevented && open) {
      ignoreClick.current = true;
    }
  };
  const createHandleButtonClick = (otherHandlers) => (event) => {
    var _otherHandlers$onClic;
    otherHandlers == null ? void 0 : (_otherHandlers$onClic = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic.call(otherHandlers, event);
    if (!event.defaultPrevented && !ignoreClick.current) {
      onOpenChange == null ? void 0 : onOpenChange(!open);
    }
    ignoreClick.current = false;
  };
  const createHandleButtonKeyDown = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyD;
    otherHandlers == null ? void 0 : (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null ? void 0 : _otherHandlers$onKeyD.call(otherHandlers, event);
    if (event.defaultPrevented) {
      return;
    }
    if (event.key === "Enter") {
      ignoreEnterKeyUp.current = true;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      onOpenChange == null ? void 0 : onOpenChange(true);
    }
  };
  const createHandleListboxKeyUp = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyU;
    otherHandlers == null ? void 0 : (_otherHandlers$onKeyU = otherHandlers.onKeyUp) == null ? void 0 : _otherHandlers$onKeyU.call(otherHandlers, event);
    if (event.defaultPrevented) {
      return;
    }
    const closingKeys = multiple ? ["Escape"] : ["Escape", "Enter", " "];
    if (open && !ignoreEnterKeyUp.current && closingKeys.includes(event.key)) {
      var _buttonRef$current;
      buttonRef == null ? void 0 : (_buttonRef$current = buttonRef.current) == null ? void 0 : _buttonRef$current.focus();
    }
    ignoreEnterKeyUp.current = false;
  };
  const createHandleListboxItemClick = (otherHandlers) => (event) => {
    var _otherHandlers$onClic2;
    otherHandlers == null ? void 0 : (_otherHandlers$onClic2 = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic2.call(otherHandlers, event);
    if (event.defaultPrevented) {
      return;
    }
    if (!multiple) {
      onOpenChange == null ? void 0 : onOpenChange(false);
    }
  };
  const createHandleListboxBlur = (otherHandlers) => (event) => {
    var _otherHandlers$blur;
    otherHandlers == null ? void 0 : (_otherHandlers$blur = otherHandlers.blur) == null ? void 0 : _otherHandlers$blur.call(otherHandlers, event);
    if (!event.defaultPrevented) {
      onOpenChange == null ? void 0 : onOpenChange(false);
    }
  };
  const listboxReducer = (state, action) => {
    const newState = defaultListboxReducer(state, action);
    if (action.type === ActionTypes.keyDown && !open && (action.event.key === "ArrowUp" || action.event.key === "ArrowDown")) {
      return _extends({}, newState, {
        selectedValue: newState.highlightedValue
      });
    }
    if (action.type === ActionTypes.blur || action.type === ActionTypes.setValue || action.type === ActionTypes.optionsChange) {
      return _extends({}, newState, {
        highlightedValue: newState.selectedValue
      });
    }
    return newState;
  };
  const {
    getRootProps: getButtonRootProps,
    active: buttonActive,
    focusVisible: buttonFocusVisible
  } = useButton({
    component: buttonComponent,
    disabled,
    ref: handleButtonRef
  });
  const selectedOption = React31.useMemo(() => {
    var _props$options$find;
    return props.multiple ? props.options.filter((o4) => value.includes(o4.value)) : (_props$options$find = props.options.find((o4) => o4.value === value)) != null ? _props$options$find : null;
  }, [props.multiple, props.options, value]);
  let useListboxParameters;
  if (props.multiple) {
    useListboxParameters = {
      id: listboxId,
      isOptionDisabled: (o4) => {
        var _o$disabled;
        return (_o$disabled = o4 == null ? void 0 : o4.disabled) != null ? _o$disabled : false;
      },
      optionComparer: (o4, v) => (o4 == null ? void 0 : o4.value) === (v == null ? void 0 : v.value),
      listboxRef: handleListboxRef,
      multiple: true,
      onChange: (newOptions) => {
        setValue(newOptions.map((o4) => o4.value));
        onChange == null ? void 0 : onChange(newOptions.map((o4) => o4.value));
      },
      options,
      optionStringifier,
      value: selectedOption
    };
  } else {
    useListboxParameters = {
      id: listboxId,
      isOptionDisabled: (o4) => {
        var _o$disabled2;
        return (_o$disabled2 = o4 == null ? void 0 : o4.disabled) != null ? _o$disabled2 : false;
      },
      optionComparer: (o4, v) => (o4 == null ? void 0 : o4.value) === (v == null ? void 0 : v.value),
      listboxRef: handleListboxRef,
      multiple: false,
      onChange: (option) => {
        var _option$value, _option$value2;
        setValue((_option$value = option == null ? void 0 : option.value) != null ? _option$value : null);
        onChange == null ? void 0 : onChange((_option$value2 = option == null ? void 0 : option.value) != null ? _option$value2 : null);
      },
      options,
      optionStringifier,
      stateReducer: listboxReducer,
      value: selectedOption
    };
  }
  const {
    getRootProps: getListboxRootProps,
    getOptionProps: getListboxOptionProps,
    getOptionState,
    highlightedOption,
    selectedOption: listboxSelectedOption
  } = useListbox(useListboxParameters);
  const getButtonProps = (otherHandlers = {}) => {
    return _extends({}, getButtonRootProps(_extends({}, otherHandlers, {
      onClick: createHandleButtonClick(otherHandlers),
      onMouseDown: createHandleMouseDown(otherHandlers),
      onKeyDown: createHandleButtonKeyDown(otherHandlers)
    })), {
      "aria-expanded": open,
      "aria-haspopup": "listbox"
    });
  };
  const getListboxProps = (otherHandlers = {}) => getListboxRootProps(_extends({}, otherHandlers, {
    onBlur: createHandleListboxBlur(otherHandlers),
    onKeyUp: createHandleListboxKeyUp(otherHandlers)
  }));
  const getOptionProps = (option, otherHandlers = {}) => {
    return getListboxOptionProps(option, _extends({}, otherHandlers, {
      onClick: createHandleListboxItemClick(otherHandlers)
    }));
  };
  React31.useDebugValue({
    selectedOption: listboxSelectedOption,
    open,
    highlightedOption
  });
  return {
    buttonActive,
    buttonFocusVisible,
    disabled,
    getButtonProps,
    getListboxProps,
    getOptionProps,
    getOptionState,
    open,
    value
  };
}
var useSelect_default = useSelect;

// ../../node_modules/@mui/base/SelectUnstyled/SelectUnstyledContext.js
import * as React32 from "https://spike.land/dist/react.mjs";
var SelectUnstyledContext = React32.createContext(void 0);

// ../../node_modules/@mui/base/SelectUnstyled/selectUnstyledClasses.js
function getSelectUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiSelectUnstyled", slot);
}
var selectUnstyledClasses = generateUtilityClasses("MuiSelectUnstyled", ["root", "button", "listbox", "popper", "active", "expanded", "disabled", "focusVisible"]);

// ../../node_modules/@mui/base/MultiSelectUnstyled/MultiSelectUnstyled.js
var _excluded9 = ["autoFocus", "children", "className", "component", "components", "componentsProps", "defaultListboxOpen", "defaultValue", "disabled", "listboxOpen", "onChange", "onListboxOpenChange", "value"];
function defaultRenderMultipleValues(selectedOptions) {
  return e2(React33.Fragment, {
    children: selectedOptions.map((o4) => o4.label).join(", ")
  });
}
function useUtilityClasses4(ownerState) {
  const {
    active,
    disabled,
    open,
    focusVisible
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible", active && "active", open && "expanded"],
    listbox: ["listbox", disabled && "disabled"],
    popper: ["popper"]
  };
  return composeClasses(slots, getSelectUnstyledUtilityClass, {});
}
var MultiSelectUnstyled = React33.forwardRef(function MultiSelectUnstyled2(props, ref) {
  var _props$renderValue, _ref, _components$Listbox, _components$Popper, _componentsProps$list, _componentsProps$list2, _componentsProps$root, _componentsProps$list3, _componentsProps$popp;
  const {
    autoFocus,
    children: children2,
    className,
    component,
    components = {},
    componentsProps = {},
    defaultListboxOpen = false,
    defaultValue = [],
    disabled: disabledProp,
    listboxOpen: listboxOpenProp,
    onChange,
    onListboxOpenChange,
    value: valueProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded9);
  const renderValue = (_props$renderValue = props.renderValue) != null ? _props$renderValue : defaultRenderMultipleValues;
  const [groupedOptions, setGroupedOptions] = React33.useState([]);
  const options = React33.useMemo(() => flattenOptionGroups(groupedOptions), [groupedOptions]);
  const [listboxOpen, setListboxOpen] = useControlled({
    controlled: listboxOpenProp,
    default: defaultListboxOpen,
    name: "MultiSelectUnstyled",
    state: "listboxOpen"
  });
  React33.useEffect(() => {
    setGroupedOptions(getOptionsFromChildren(children2));
  }, [children2]);
  const [buttonDefined, setButtonDefined] = React33.useState(false);
  const buttonRef = React33.useRef(null);
  const listboxRef = React33.useRef(null);
  const Button4 = (_ref = component != null ? component : components.Root) != null ? _ref : "button";
  const ListboxRoot = (_components$Listbox = components.Listbox) != null ? _components$Listbox : "ul";
  const Popper = (_components$Popper = components.Popper) != null ? _components$Popper : PopperUnstyled_default;
  const handleButtonRefChange = (element) => {
    buttonRef.current = element;
    if (element != null) {
      setButtonDefined(true);
    }
  };
  const handleButtonRef = useForkRef(ref, handleButtonRefChange);
  const handleListboxRef = useForkRef(listboxRef, (_componentsProps$list = componentsProps.listbox) == null ? void 0 : _componentsProps$list.ref);
  React33.useEffect(() => {
    if (autoFocus) {
      buttonRef.current.focus();
    }
  }, [autoFocus]);
  const handleOpenChange = (isOpen) => {
    setListboxOpen(isOpen);
    onListboxOpenChange == null ? void 0 : onListboxOpenChange(isOpen);
  };
  const {
    buttonActive,
    buttonFocusVisible,
    disabled,
    getButtonProps,
    getListboxProps,
    getOptionProps,
    getOptionState,
    value
  } = useSelect_default({
    buttonComponent: Button4,
    buttonRef: handleButtonRef,
    defaultValue,
    disabled: disabledProp,
    listboxId: (_componentsProps$list2 = componentsProps.listbox) == null ? void 0 : _componentsProps$list2.id,
    listboxRef: handleListboxRef,
    multiple: true,
    onChange,
    onOpenChange: handleOpenChange,
    open: listboxOpen,
    options,
    value: valueProp
  });
  const ownerState = _extends({}, props, {
    active: buttonActive,
    defaultListboxOpen,
    disabled,
    focusVisible: buttonFocusVisible,
    open: listboxOpen,
    renderValue,
    value
  });
  const classes = useUtilityClasses4(ownerState);
  const selectedOptions = React33.useMemo(() => {
    if (value == null) {
      return [];
    }
    return options.filter((o4) => value.includes(o4.value));
  }, [options, value]);
  const buttonProps = appendOwnerState(Button4, _extends({}, getButtonProps(), other, componentsProps.root, {
    className: clsx_m_default(className, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className, classes.root)
  }), ownerState);
  const listboxProps = appendOwnerState(ListboxRoot, _extends({}, getListboxProps(), componentsProps.listbox, {
    className: clsx_m_default((_componentsProps$list3 = componentsProps.listbox) == null ? void 0 : _componentsProps$list3.className, classes.listbox)
  }), ownerState);
  const popperProps = appendOwnerState(Popper, _extends({
    open: listboxOpen,
    anchorEl: buttonRef.current,
    placement: "bottom-start",
    disablePortal: true,
    role: void 0
  }, componentsProps.popper, {
    className: clsx_m_default((_componentsProps$popp = componentsProps.popper) == null ? void 0 : _componentsProps$popp.className, classes.popper)
  }), ownerState);
  const context = {
    getOptionProps,
    getOptionState,
    listboxRef
  };
  return e2(React33.Fragment, {
    children: [e2(Button4, _extends({}, buttonProps, {
      children: renderValue(selectedOptions)
    })), buttonDefined && e2(Popper, _extends({}, popperProps, {
      children: e2(ListboxRoot, _extends({}, listboxProps, {
        children: e2(SelectUnstyledContext.Provider, {
          value: context,
          children: children2
        })
      }))
    }))]
  });
});
false ? MultiSelectUnstyled.propTypes = {
  autoFocus: import_prop_types15.default.bool,
  children: import_prop_types15.default.node,
  className: import_prop_types15.default.string,
  component: import_prop_types15.default.elementType,
  components: import_prop_types15.default.shape({
    Listbox: import_prop_types15.default.elementType,
    Popper: import_prop_types15.default.elementType,
    Root: import_prop_types15.default.elementType
  }),
  componentsProps: import_prop_types15.default.shape({
    listbox: import_prop_types15.default.object,
    popper: import_prop_types15.default.object,
    root: import_prop_types15.default.object
  }),
  defaultListboxOpen: import_prop_types15.default.bool,
  defaultValue: import_prop_types15.default.array,
  disabled: import_prop_types15.default.bool,
  listboxOpen: import_prop_types15.default.bool,
  onChange: import_prop_types15.default.func,
  onListboxOpenChange: import_prop_types15.default.func,
  renderValue: import_prop_types15.default.func,
  value: import_prop_types15.default.array
} : void 0;

// ../../node_modules/@mui/base/NoSsr/NoSsr.js
var import_prop_types16 = __toESM(require_prop_types());
import * as React34 from "https://spike.land/dist/react.mjs";
false ? NoSsr.propTypes = {
  children: import_prop_types16.default.node,
  defer: import_prop_types16.default.bool,
  fallback: import_prop_types16.default.node
} : void 0;
if (false) {
  NoSsr["propTypes"] = exactProp(NoSsr.propTypes);
}

// ../../node_modules/@mui/base/OptionGroupUnstyled/OptionGroupUnstyled.js
var import_prop_types17 = __toESM(require_prop_types());
import React35 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/base/OptionGroupUnstyled/optionGroupUnstyledClasses.js
function getOptionGroupUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiOptionGroupUnstyled", slot);
}
var optionGroupUnstyledClasses = generateUtilityClasses("MuiOptionGroupUnstyled", ["root", "label", "list"]);

// ../../node_modules/@mui/base/OptionGroupUnstyled/OptionGroupUnstyled.js
var _excluded10 = ["className", "component", "components", "disabled", "componentsProps"];
function useUtilityClasses5(disabled) {
  const slots = {
    root: ["root", disabled && "disabled"],
    label: ["label"],
    list: ["list"]
  };
  return composeClasses(slots, getOptionGroupUnstyledUtilityClass, {});
}
var OptionGroupUnstyled = React35.forwardRef(function OptionGroupUnstyled2(props, ref) {
  var _componentsProps$root, _componentsProps$labe, _componentsProps$list;
  const {
    className,
    component,
    components = {},
    disabled = false,
    componentsProps = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded10);
  const Root = component || (components == null ? void 0 : components.Root) || "li";
  const Label = (components == null ? void 0 : components.Label) || "span";
  const List = (components == null ? void 0 : components.List) || "ul";
  const classes = useUtilityClasses5(disabled);
  const rootProps = _extends({}, other, {
    ref
  }, componentsProps.root, {
    className: clsx_m_default(classes.root, className, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className)
  });
  const labelProps = _extends({}, componentsProps.label, {
    className: clsx_m_default(classes.label, (_componentsProps$labe = componentsProps.label) == null ? void 0 : _componentsProps$labe.className)
  });
  const listProps = _extends({}, componentsProps.list, {
    className: clsx_m_default(classes.list, (_componentsProps$list = componentsProps.list) == null ? void 0 : _componentsProps$list.className)
  });
  return e2(Root, _extends({}, rootProps, {
    children: [e2(Label, _extends({}, labelProps, {
      children: props.label
    })), e2(List, _extends({}, listProps, {
      children: props.children
    }))]
  }));
});
false ? OptionGroupUnstyled.propTypes = {
  children: import_prop_types17.default.node,
  className: import_prop_types17.default.string,
  component: import_prop_types17.default.elementType,
  components: import_prop_types17.default.shape({
    Label: import_prop_types17.default.elementType,
    List: import_prop_types17.default.elementType,
    Root: import_prop_types17.default.elementType
  }),
  componentsProps: import_prop_types17.default.shape({
    label: import_prop_types17.default.object,
    list: import_prop_types17.default.object,
    root: import_prop_types17.default.object
  }),
  disabled: import_prop_types17.default.bool,
  label: import_prop_types17.default.node
} : void 0;

// ../../node_modules/@mui/base/OptionUnstyled/OptionUnstyled.js
import React36 from "https://spike.land/dist/react.mjs";
var import_prop_types18 = __toESM(require_prop_types());

// ../../node_modules/@mui/base/OptionUnstyled/optionUnstyledClasses.js
function getOptionUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiOptionUnstyled", slot);
}
var optionUnstyledClasses = generateUtilityClasses("MuiOptionUnstyled", ["root", "disabled", "selected", "highlighted"]);

// ../../node_modules/@mui/base/OptionUnstyled/OptionUnstyled.js
var _excluded11 = ["children", "className", "component", "components", "componentsProps", "disabled", "value", "label"];
function useUtilityClasses6(ownerState) {
  const {
    disabled,
    highlighted,
    selected
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", highlighted && "highlighted", selected && "selected"]
  };
  return composeClasses(slots, getOptionUnstyledUtilityClass, {});
}
var OptionUnstyled = React36.forwardRef(function OptionUnstyled2(props, ref) {
  var _componentsProps$root;
  const {
    children: children2,
    className,
    component,
    components = {},
    componentsProps = {},
    disabled,
    value,
    label
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded11);
  const selectContext = React36.useContext(SelectUnstyledContext);
  if (!selectContext) {
    throw new Error("OptionUnstyled must be used within a SelectUnstyled");
  }
  const Root = component || components.Root || "li";
  const selectOption = {
    value,
    label: label || children2,
    disabled
  };
  const optionState = selectContext.getOptionState(selectOption);
  const optionProps = selectContext.getOptionProps(selectOption);
  const listboxRef = selectContext.listboxRef;
  const ownerState = _extends({}, props, optionState);
  const optionRef = React36.useRef(null);
  const handleRef = useForkRef(ref, optionRef);
  React36.useEffect(() => {
    if (optionState.highlighted) {
      if (!listboxRef.current || !optionRef.current) {
        return;
      }
      const listboxClientRect = listboxRef.current.getBoundingClientRect();
      const optionClientRect = optionRef.current.getBoundingClientRect();
      if (optionClientRect.top < listboxClientRect.top) {
        listboxRef.current.scrollTop -= listboxClientRect.top - optionClientRect.top;
      } else if (optionClientRect.bottom > listboxClientRect.bottom) {
        listboxRef.current.scrollTop += optionClientRect.bottom - listboxClientRect.bottom;
      }
    }
  }, [optionState.highlighted, listboxRef]);
  const classes = useUtilityClasses6(ownerState);
  const rootProps = appendOwnerState(Root, _extends({}, other, optionProps, componentsProps.root, {
    ref: handleRef,
    className: clsx_m_default(classes.root, className, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className)
  }), ownerState);
  return e2(Root, _extends({}, rootProps, {
    children: children2
  }));
});
false ? OptionUnstyled.propTypes = {
  children: import_prop_types18.default.node,
  className: import_prop_types18.default.string,
  component: import_prop_types18.default.elementType,
  components: import_prop_types18.default.shape({
    Root: import_prop_types18.default.elementType
  }),
  componentsProps: import_prop_types18.default.shape({
    root: import_prop_types18.default.object
  }),
  disabled: import_prop_types18.default.bool,
  label: import_prop_types18.default.string,
  value: import_prop_types18.default.any.isRequired
} : void 0;
var OptionUnstyled_default = React36.memo(OptionUnstyled);

// ../../node_modules/@mui/base/SelectUnstyled/SelectUnstyled.js
var import_prop_types19 = __toESM(require_prop_types());
import * as React37 from "https://spike.land/dist/react.mjs";
var _excluded12 = ["autoFocus", "children", "className", "component", "components", "componentsProps", "defaultValue", "defaultListboxOpen", "disabled", "listboxOpen", "onChange", "onListboxOpenChange", "renderValue", "value"];
function defaultRenderSingleValue(selectedOption) {
  var _selectedOption$label;
  return (_selectedOption$label = selectedOption == null ? void 0 : selectedOption.label) != null ? _selectedOption$label : "";
}
function useUtilityClasses7(ownerState) {
  const {
    active,
    disabled,
    open,
    focusVisible
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible", active && "active", open && "expanded"],
    listbox: ["listbox", disabled && "disabled"],
    popper: ["popper"]
  };
  return composeClasses(slots, getSelectUnstyledUtilityClass, {});
}
var SelectUnstyled = React37.forwardRef(function SelectUnstyled2(props, ref) {
  var _ref, _components$Listbox, _components$Popper, _componentsProps$list, _componentsProps$list2, _componentsProps$root, _componentsProps$list3, _componentsProps$popp;
  const {
    autoFocus,
    children: children2,
    className,
    component,
    components = {},
    componentsProps = {},
    defaultValue,
    defaultListboxOpen = false,
    disabled: disabledProp,
    listboxOpen: listboxOpenProp,
    onChange,
    onListboxOpenChange,
    renderValue: renderValueProp,
    value: valueProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded12);
  const renderValue = renderValueProp != null ? renderValueProp : defaultRenderSingleValue;
  const [groupedOptions, setGroupedOptions] = React37.useState([]);
  const options = React37.useMemo(() => flattenOptionGroups(groupedOptions), [groupedOptions]);
  const [listboxOpen, setListboxOpen] = useControlled({
    controlled: listboxOpenProp,
    default: defaultListboxOpen,
    name: "SelectUnstyled",
    state: "listboxOpen"
  });
  React37.useEffect(() => {
    setGroupedOptions(getOptionsFromChildren(children2));
  }, [children2]);
  const [buttonDefined, setButtonDefined] = React37.useState(false);
  const buttonRef = React37.useRef(null);
  const listboxRef = React37.useRef(null);
  const Button4 = (_ref = component != null ? component : components.Root) != null ? _ref : "button";
  const ListboxRoot = (_components$Listbox = components.Listbox) != null ? _components$Listbox : "ul";
  const Popper = (_components$Popper = components.Popper) != null ? _components$Popper : PopperUnstyled_default;
  const handleButtonRefChange = (element) => {
    buttonRef.current = element;
    if (element != null) {
      setButtonDefined(true);
    }
  };
  const handleButtonRef = useForkRef(ref, handleButtonRefChange);
  const handleListboxRef = useForkRef(listboxRef, (_componentsProps$list = componentsProps.listbox) == null ? void 0 : _componentsProps$list.ref);
  React37.useEffect(() => {
    if (autoFocus) {
      buttonRef.current.focus();
    }
  }, [autoFocus]);
  const handleOpenChange = (isOpen) => {
    setListboxOpen(isOpen);
    onListboxOpenChange == null ? void 0 : onListboxOpenChange(isOpen);
  };
  const {
    buttonActive,
    buttonFocusVisible,
    disabled,
    getButtonProps,
    getListboxProps,
    getOptionProps,
    getOptionState,
    value
  } = useSelect_default({
    buttonComponent: Button4,
    buttonRef: handleButtonRef,
    defaultValue,
    disabled: disabledProp,
    listboxId: (_componentsProps$list2 = componentsProps.listbox) == null ? void 0 : _componentsProps$list2.id,
    listboxRef: handleListboxRef,
    multiple: false,
    onChange,
    onOpenChange: handleOpenChange,
    open: listboxOpen,
    options,
    value: valueProp
  });
  const ownerState = _extends({}, props, {
    active: buttonActive,
    defaultListboxOpen,
    disabled,
    focusVisible: buttonFocusVisible,
    open: listboxOpen,
    renderValue,
    value
  });
  const classes = useUtilityClasses7(ownerState);
  const selectedOptions = React37.useMemo(() => {
    return options.find((o4) => value === o4.value);
  }, [options, value]);
  const buttonProps = appendOwnerState(Button4, _extends({}, getButtonProps(), other, componentsProps.root, {
    className: clsx_m_default(className, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className, classes.root)
  }), ownerState);
  const listboxProps = appendOwnerState(ListboxRoot, _extends({}, getListboxProps(), componentsProps.listbox, {
    className: clsx_m_default((_componentsProps$list3 = componentsProps.listbox) == null ? void 0 : _componentsProps$list3.className, classes.listbox)
  }), ownerState);
  const popperProps = appendOwnerState(Popper, _extends({
    open: listboxOpen,
    anchorEl: buttonRef.current,
    placement: "bottom-start",
    disablePortal: true,
    role: void 0
  }, componentsProps.popper, {
    className: clsx_m_default((_componentsProps$popp = componentsProps.popper) == null ? void 0 : _componentsProps$popp.className, classes.popper)
  }), ownerState);
  const context = {
    getOptionProps,
    getOptionState,
    listboxRef
  };
  return e2(React37.Fragment, {
    children: [e2(Button4, _extends({}, buttonProps, {
      children: renderValue(selectedOptions)
    })), buttonDefined && e2(Popper, _extends({}, popperProps, {
      children: e2(ListboxRoot, _extends({}, listboxProps, {
        children: e2(SelectUnstyledContext.Provider, {
          value: context,
          children: children2
        })
      }))
    }))]
  });
});
false ? SelectUnstyled.propTypes = {
  autoFocus: import_prop_types19.default.bool,
  children: import_prop_types19.default.node,
  className: import_prop_types19.default.string,
  component: import_prop_types19.default.elementType,
  components: import_prop_types19.default.shape({
    Listbox: import_prop_types19.default.elementType,
    Popper: import_prop_types19.default.elementType,
    Root: import_prop_types19.default.elementType
  }),
  componentsProps: import_prop_types19.default.shape({
    listbox: import_prop_types19.default.object,
    popper: import_prop_types19.default.object,
    root: import_prop_types19.default.object
  }),
  defaultListboxOpen: import_prop_types19.default.bool,
  defaultValue: import_prop_types19.default.any,
  disabled: import_prop_types19.default.bool,
  listboxOpen: import_prop_types19.default.bool,
  onChange: import_prop_types19.default.func,
  onListboxOpenChange: import_prop_types19.default.func,
  renderValue: import_prop_types19.default.func,
  value: import_prop_types19.default.any
} : void 0;

// ../../node_modules/@mui/base/SliderUnstyled/SliderUnstyled.js
var import_prop_types21 = __toESM(require_prop_types());
import * as React40 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/base/SliderUnstyled/sliderUnstyledClasses.js
function getSliderUtilityClass(slot) {
  return generateUtilityClass("MuiSlider", slot);
}
var sliderUnstyledClasses = generateUtilityClasses("MuiSlider", ["root", "active", "focusVisible", "disabled", "dragging", "marked", "vertical", "trackInverted", "trackFalse", "rail", "track", "mark", "markActive", "markLabel", "markLabelActive", "thumb", "valueLabel", "valueLabelOpen", "valueLabelCircle", "valueLabelLabel"]);
var sliderUnstyledClasses_default = sliderUnstyledClasses;

// ../../node_modules/@mui/base/SliderUnstyled/SliderValueLabelUnstyled.js
var import_prop_types20 = __toESM(require_prop_types());
import * as React38 from "https://spike.land/dist/react.mjs";
var useValueLabelClasses = (props) => {
  const {
    open
  } = props;
  const utilityClasses = {
    offset: clsx_m_default(open && sliderUnstyledClasses_default.valueLabelOpen),
    circle: sliderUnstyledClasses_default.valueLabelCircle,
    label: sliderUnstyledClasses_default.valueLabelLabel
  };
  return utilityClasses;
};
function SliderValueLabelUnstyled(props) {
  const {
    children: children2,
    className,
    value,
    theme
  } = props;
  const classes = useValueLabelClasses(props);
  return React38.cloneElement(children2, {
    className: clsx_m_default(children2.props.className)
  }, e2(React38.Fragment, {
    children: [children2.props.children, e2("span", {
      className: clsx_m_default(classes.offset, className),
      theme,
      "aria-hidden": true,
      children: e2("span", {
        className: classes.circle,
        children: e2("span", {
          className: classes.label,
          children: value
        })
      })
    })]
  }));
}
false ? SliderValueLabelUnstyled.propTypes = {
  children: import_prop_types20.default.element.isRequired,
  className: import_prop_types20.default.string,
  theme: import_prop_types20.default.any,
  value: import_prop_types20.default.node
} : void 0;
var SliderValueLabelUnstyled_default = SliderValueLabelUnstyled;

// ../../node_modules/@mui/base/SliderUnstyled/useSlider.js
import * as React39 from "https://spike.land/dist/react.mjs";
var INTENTIONAL_DRAG_COUNT_THRESHOLD = 2;
function asc(a2, b2) {
  return a2 - b2;
}
function clamp(value, min2, max2) {
  if (value == null) {
    return min2;
  }
  return Math.min(Math.max(min2, value), max2);
}
function findClosest(values3, currentValue) {
  var _values$reduce;
  const {
    index: closestIndex
  } = (_values$reduce = values3.reduce((acc, value, index) => {
    const distance = Math.abs(currentValue - value);
    if (acc === null || distance < acc.distance || distance === acc.distance) {
      return {
        distance,
        index
      };
    }
    return acc;
  }, null)) != null ? _values$reduce : {};
  return closestIndex;
}
function trackFinger(event, touchId) {
  if (touchId.current !== void 0 && event.changedTouches) {
    const touchEvent = event;
    for (let i2 = 0; i2 < touchEvent.changedTouches.length; i2 += 1) {
      const touch = touchEvent.changedTouches[i2];
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
function valueToPercent(value, min2, max2) {
  return (value - min2) * 100 / (max2 - min2);
}
function percentToValue(percent, min2, max2) {
  return (max2 - min2) * percent + min2;
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
function roundValueToStep(value, step, min2) {
  const nearest = Math.round((value - min2) / step) * step + min2;
  return Number(nearest.toFixed(getDecimalPrecision(step)));
}
function setValueIndex({
  values: values3,
  newValue,
  index
}) {
  const output = values3.slice();
  output[index] = newValue;
  return output.sort(asc);
}
function focusThumb({
  sliderRef,
  activeIndex,
  setActive
}) {
  var _sliderRef$current, _doc$activeElement;
  const doc = ownerDocument(sliderRef.current);
  if (!((_sliderRef$current = sliderRef.current) != null && _sliderRef$current.contains(doc.activeElement)) || Number(doc == null ? void 0 : (_doc$activeElement = doc.activeElement) == null ? void 0 : _doc$activeElement.getAttribute("data-index")) !== activeIndex) {
    var _sliderRef$current2;
    (_sliderRef$current2 = sliderRef.current) == null ? void 0 : _sliderRef$current2.querySelector(`[type="range"][data-index="${activeIndex}"]`).focus();
  }
  if (setActive) {
    setActive(activeIndex);
  }
}
var axisProps = {
  horizontal: {
    offset: (percent) => ({
      left: `${percent}%`
    }),
    leap: (percent) => ({
      width: `${percent}%`
    })
  },
  "horizontal-reverse": {
    offset: (percent) => ({
      right: `${percent}%`
    }),
    leap: (percent) => ({
      width: `${percent}%`
    })
  },
  vertical: {
    offset: (percent) => ({
      bottom: `${percent}%`
    }),
    leap: (percent) => ({
      height: `${percent}%`
    })
  }
};
var Identity = (x2) => x2;
var cachedSupportsTouchActionNone;
function doesSupportTouchActionNone() {
  if (cachedSupportsTouchActionNone === void 0) {
    if (typeof CSS !== "undefined" && typeof CSS.supports === "function") {
      cachedSupportsTouchActionNone = CSS.supports("touch-action", "none");
    } else {
      cachedSupportsTouchActionNone = true;
    }
  }
  return cachedSupportsTouchActionNone;
}
function useSlider(props) {
  const {
    ref,
    "aria-labelledby": ariaLabelledby,
    defaultValue,
    disableSwap = false,
    disabled = false,
    marks: marksProp = false,
    max: max2 = 100,
    min: min2 = 0,
    name,
    onChange,
    onChangeCommitted,
    orientation = "horizontal",
    scale = Identity,
    step = 1,
    tabIndex,
    value: valueProp,
    isRtl = false
  } = props;
  const touchId = React39.useRef();
  const [active, setActive] = React39.useState(-1);
  const [open, setOpen] = React39.useState(-1);
  const [dragging, setDragging] = React39.useState(false);
  const moveCount = React39.useRef(0);
  const [valueDerived, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue != null ? defaultValue : min2,
    name: "Slider"
  });
  const handleChange = onChange && ((event, value, thumbIndex) => {
    const nativeEvent = event.nativeEvent || event;
    const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);
    Object.defineProperty(clonedEvent, "target", {
      writable: true,
      value: {
        value,
        name
      }
    });
    onChange(clonedEvent, value, thumbIndex);
  });
  const range = Array.isArray(valueDerived);
  let values3 = range ? valueDerived.slice().sort(asc) : [valueDerived];
  values3 = values3.map((value) => clamp(value, min2, max2));
  const marks = marksProp === true && step !== null ? [...Array(Math.floor((max2 - min2) / step) + 1)].map((_3, index) => ({
    value: min2 + step * index
  })) : marksProp || [];
  const marksValues = marks.map((mark) => mark.value);
  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React39.useState(-1);
  const sliderRef = React39.useRef();
  const handleFocusRef = useForkRef(focusVisibleRef, sliderRef);
  const handleRef = useForkRef(ref, handleFocusRef);
  const createHandleHiddenInputFocus = (otherHandlers) => (event) => {
    var _otherHandlers$onFocu;
    const index = Number(event.currentTarget.getAttribute("data-index"));
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(index);
    }
    setOpen(index);
    otherHandlers == null ? void 0 : (_otherHandlers$onFocu = otherHandlers.onFocus) == null ? void 0 : _otherHandlers$onFocu.call(otherHandlers, event);
  };
  const createHandleHiddenInputBlur = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur;
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(-1);
    }
    setOpen(-1);
    otherHandlers == null ? void 0 : (_otherHandlers$onBlur = otherHandlers.onBlur) == null ? void 0 : _otherHandlers$onBlur.call(otherHandlers, event);
  };
  useEnhancedEffect_default(() => {
    if (disabled && sliderRef.current.contains(document.activeElement)) {
      var _document$activeEleme;
      (_document$activeEleme = document.activeElement) == null ? void 0 : _document$activeEleme.blur();
    }
  }, [disabled]);
  if (disabled && active !== -1) {
    setActive(-1);
  }
  if (disabled && focusVisible !== -1) {
    setFocusVisible(-1);
  }
  const createHandleHiddenInputChange = (otherHandlers) => (event) => {
    var _otherHandlers$onChan;
    (_otherHandlers$onChan = otherHandlers.onChange) == null ? void 0 : _otherHandlers$onChan.call(otherHandlers, event);
    const index = Number(event.currentTarget.getAttribute("data-index"));
    const value = values3[index];
    const marksIndex = marksValues.indexOf(value);
    let newValue = event.target.valueAsNumber;
    if (marks && step == null) {
      newValue = newValue < value ? marksValues[marksIndex - 1] : marksValues[marksIndex + 1];
    }
    newValue = clamp(newValue, min2, max2);
    if (marks && step == null) {
      const currentMarkIndex = marksValues.indexOf(values3[index]);
      newValue = newValue < values3[index] ? marksValues[currentMarkIndex - 1] : marksValues[currentMarkIndex + 1];
    }
    if (range) {
      if (disableSwap) {
        newValue = clamp(newValue, values3[index - 1] || -Infinity, values3[index + 1] || Infinity);
      }
      const previousValue = newValue;
      newValue = setValueIndex({
        values: values3,
        newValue,
        index
      });
      let activeIndex = index;
      if (!disableSwap) {
        activeIndex = newValue.indexOf(previousValue);
      }
      focusThumb({
        sliderRef,
        activeIndex
      });
    }
    setValueState(newValue);
    setFocusVisible(index);
    if (handleChange) {
      handleChange(event, newValue, index);
    }
    if (onChangeCommitted) {
      onChangeCommitted(event, newValue);
    }
  };
  const previousIndex = React39.useRef();
  let axis = orientation;
  if (isRtl && orientation === "horizontal") {
    axis += "-reverse";
  }
  const getFingerNewValue = ({
    finger,
    move = false,
    values: values22
  }) => {
    const {
      current: slider
    } = sliderRef;
    const {
      width: width2,
      height: height2,
      bottom: bottom3,
      left: left3
    } = slider.getBoundingClientRect();
    let percent;
    if (axis.indexOf("vertical") === 0) {
      percent = (bottom3 - finger.y) / height2;
    } else {
      percent = (finger.x - left3) / width2;
    }
    if (axis.indexOf("-reverse") !== -1) {
      percent = 1 - percent;
    }
    let newValue;
    newValue = percentToValue(percent, min2, max2);
    if (step) {
      newValue = roundValueToStep(newValue, step, min2);
    } else {
      const closestIndex = findClosest(marksValues, newValue);
      newValue = marksValues[closestIndex];
    }
    newValue = clamp(newValue, min2, max2);
    let activeIndex = 0;
    if (range) {
      if (!move) {
        activeIndex = findClosest(values22, newValue);
      } else {
        activeIndex = previousIndex.current;
      }
      if (disableSwap) {
        newValue = clamp(newValue, values22[activeIndex - 1] || -Infinity, values22[activeIndex + 1] || Infinity);
      }
      const previousValue = newValue;
      newValue = setValueIndex({
        values: values22,
        newValue,
        index: activeIndex
      });
      if (!(disableSwap && move)) {
        activeIndex = newValue.indexOf(previousValue);
        previousIndex.current = activeIndex;
      }
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
    moveCount.current += 1;
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
      values: values3
    });
    focusThumb({
      sliderRef,
      activeIndex,
      setActive
    });
    setValueState(newValue);
    if (!dragging && moveCount.current > INTENTIONAL_DRAG_COUNT_THRESHOLD) {
      setDragging(true);
    }
    if (handleChange) {
      handleChange(nativeEvent, newValue, activeIndex);
    }
  });
  const handleTouchEnd = useEventCallback((nativeEvent) => {
    const finger = trackFinger(nativeEvent, touchId);
    setDragging(false);
    if (!finger) {
      return;
    }
    const {
      newValue
    } = getFingerNewValue({
      finger,
      values: values3
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
  const handleTouchStart = useEventCallback((nativeEvent) => {
    if (disabled) {
      return;
    }
    if (!doesSupportTouchActionNone()) {
      nativeEvent.preventDefault();
    }
    const touch = nativeEvent.changedTouches[0];
    if (touch != null) {
      touchId.current = touch.identifier;
    }
    const finger = trackFinger(nativeEvent, touchId);
    if (finger !== false) {
      const {
        newValue,
        activeIndex
      } = getFingerNewValue({
        finger,
        values: values3
      });
      focusThumb({
        sliderRef,
        activeIndex,
        setActive
      });
      setValueState(newValue);
      if (handleChange) {
        handleChange(nativeEvent, newValue, activeIndex);
      }
    }
    moveCount.current = 0;
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener("touchmove", handleTouchMove);
    doc.addEventListener("touchend", handleTouchEnd);
  });
  const stopListening = React39.useCallback(() => {
    const doc = ownerDocument(sliderRef.current);
    doc.removeEventListener("mousemove", handleTouchMove);
    doc.removeEventListener("mouseup", handleTouchEnd);
    doc.removeEventListener("touchmove", handleTouchMove);
    doc.removeEventListener("touchend", handleTouchEnd);
  }, [handleTouchEnd, handleTouchMove]);
  React39.useEffect(() => {
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
  React39.useEffect(() => {
    if (disabled) {
      stopListening();
    }
  }, [disabled, stopListening]);
  const createHandleMouseDown = (otherHandlers) => (event) => {
    var _otherHandlers$onMous;
    (_otherHandlers$onMous = otherHandlers.onMouseDown) == null ? void 0 : _otherHandlers$onMous.call(otherHandlers, event);
    if (disabled) {
      return;
    }
    if (event.defaultPrevented) {
      return;
    }
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    const finger = trackFinger(event, touchId);
    if (finger !== false) {
      const {
        newValue,
        activeIndex
      } = getFingerNewValue({
        finger,
        values: values3
      });
      focusThumb({
        sliderRef,
        activeIndex,
        setActive
      });
      setValueState(newValue);
      if (handleChange) {
        handleChange(event, newValue, activeIndex);
      }
    }
    moveCount.current = 0;
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener("mousemove", handleTouchMove);
    doc.addEventListener("mouseup", handleTouchEnd);
  };
  const trackOffset = valueToPercent(range ? values3[0] : min2, min2, max2);
  const trackLeap = valueToPercent(values3[values3.length - 1], min2, max2) - trackOffset;
  const getRootProps = (otherHandlers) => {
    const ownEventHandlers = {
      onMouseDown: createHandleMouseDown(otherHandlers || {})
    };
    const mergedEventHandlers = _extends({}, otherHandlers, ownEventHandlers);
    return _extends({
      ref: handleRef
    }, mergedEventHandlers);
  };
  const createHandleMouseOver = (otherHandlers) => (event) => {
    var _otherHandlers$onMous2;
    (_otherHandlers$onMous2 = otherHandlers.onMouseOver) == null ? void 0 : _otherHandlers$onMous2.call(otherHandlers, event);
    const index = Number(event.currentTarget.getAttribute("data-index"));
    setOpen(index);
  };
  const createHandleMouseLeave = (otherHandlers) => (event) => {
    var _otherHandlers$onMous3;
    (_otherHandlers$onMous3 = otherHandlers.onMouseLeave) == null ? void 0 : _otherHandlers$onMous3.call(otherHandlers, event);
    setOpen(-1);
  };
  const getThumbProps = (otherHandlers) => {
    const ownEventHandlers = {
      onMouseOver: createHandleMouseOver(otherHandlers || {}),
      onMouseLeave: createHandleMouseLeave(otherHandlers || {})
    };
    const mergedEventHandlers = _extends({}, otherHandlers, ownEventHandlers);
    return _extends({}, mergedEventHandlers);
  };
  const getHiddenInputProps = (otherHandlers) => {
    const ownEventHandlers = {
      onChange: createHandleHiddenInputChange(otherHandlers || {}),
      onFocus: createHandleHiddenInputFocus(otherHandlers || {}),
      onBlur: createHandleHiddenInputBlur(otherHandlers || {})
    };
    const mergedEventHandlers = _extends({}, otherHandlers, ownEventHandlers);
    return _extends({
      tabIndex,
      "aria-labelledby": ariaLabelledby,
      "aria-orientation": orientation,
      "aria-valuemax": scale(max2),
      "aria-valuemin": scale(min2),
      name,
      type: "range",
      min: props.min,
      max: props.max,
      step: props.step,
      disabled
    }, mergedEventHandlers, {
      style: _extends({}, visuallyHidden_default, {
        direction: isRtl ? "rtl" : "ltr",
        width: "100%",
        height: "100%"
      })
    });
  };
  return {
    axis,
    axisProps,
    getRootProps,
    getHiddenInputProps,
    getThumbProps,
    dragging,
    marks,
    values: values3,
    active,
    focusVisible,
    open,
    range,
    trackOffset,
    trackLeap
  };
}

// ../../node_modules/@mui/base/SliderUnstyled/SliderUnstyled.js
var _excluded13 = ["aria-label", "aria-valuetext", "className", "component", "classes", "disableSwap", "disabled", "getAriaLabel", "getAriaValueText", "marks", "max", "min", "name", "onChange", "onChangeCommitted", "onMouseDown", "orientation", "scale", "step", "tabIndex", "track", "value", "valueLabelDisplay", "valueLabelFormat", "isRtl", "components", "componentsProps"];
var Identity2 = (x2) => x2;
var useUtilityClasses8 = (ownerState) => {
  const {
    disabled,
    dragging,
    marked,
    orientation,
    track,
    classes
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", dragging && "dragging", marked && "marked", orientation === "vertical" && "vertical", track === "inverted" && "trackInverted", track === false && "trackFalse"],
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
  children: children2
}) => children2;
var SliderUnstyled = React40.forwardRef(function SliderUnstyled2(props, ref) {
  var _ref, _components$Rail, _components$Track, _components$Thumb, _components$ValueLabe, _components$Mark, _components$MarkLabel;
  const {
    "aria-label": ariaLabel,
    "aria-valuetext": ariaValuetext,
    className,
    component,
    classes: classesProp,
    disableSwap = false,
    disabled = false,
    getAriaLabel,
    getAriaValueText,
    marks: marksProp = false,
    max: max2 = 100,
    min: min2 = 0,
    onMouseDown,
    orientation = "horizontal",
    scale = Identity2,
    step = 1,
    track = "normal",
    valueLabelDisplay = "off",
    valueLabelFormat = Identity2,
    isRtl = false,
    components = {},
    componentsProps = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded13);
  const ownerState = _extends({}, props, {
    mark: marksProp,
    classes: classesProp,
    disabled,
    isRtl,
    max: max2,
    min: min2,
    orientation,
    scale,
    step,
    track,
    valueLabelDisplay,
    valueLabelFormat
  });
  const {
    axisProps: axisProps2,
    getRootProps,
    getHiddenInputProps,
    getThumbProps,
    open,
    active,
    axis,
    range,
    focusVisible,
    dragging,
    marks,
    values: values3,
    trackOffset,
    trackLeap
  } = useSlider(_extends({}, ownerState, {
    ref
  }));
  ownerState.marked = marks.length > 0 && marks.some((mark) => mark.label);
  ownerState.dragging = dragging;
  const Root = (_ref = component != null ? component : components.Root) != null ? _ref : "span";
  const rootProps = appendOwnerState(Root, _extends({}, other, componentsProps.root), ownerState);
  const Rail = (_components$Rail = components.Rail) != null ? _components$Rail : "span";
  const railProps = appendOwnerState(Rail, componentsProps.rail, ownerState);
  const Track = (_components$Track = components.Track) != null ? _components$Track : "span";
  const trackProps = appendOwnerState(Track, componentsProps.track, ownerState);
  const trackStyle = _extends({}, axisProps2[axis].offset(trackOffset), axisProps2[axis].leap(trackLeap));
  const Thumb = (_components$Thumb = components.Thumb) != null ? _components$Thumb : "span";
  const thumbProps = appendOwnerState(Thumb, componentsProps.thumb, ownerState);
  const ValueLabel = (_components$ValueLabe = components.ValueLabel) != null ? _components$ValueLabe : SliderValueLabelUnstyled_default;
  const valueLabelProps = appendOwnerState(ValueLabel, componentsProps.valueLabel, ownerState);
  const Mark = (_components$Mark = components.Mark) != null ? _components$Mark : "span";
  const markProps = appendOwnerState(Mark, componentsProps.mark, ownerState);
  const MarkLabel = (_components$MarkLabel = components.MarkLabel) != null ? _components$MarkLabel : "span";
  const markLabelProps = appendOwnerState(MarkLabel, componentsProps.markLabel, ownerState);
  const Input = components.Input || "input";
  const inputProps = appendOwnerState(Input, componentsProps.input, ownerState);
  const hiddenInputProps = getHiddenInputProps();
  const classes = useUtilityClasses8(ownerState);
  return e2(Root, _extends({}, rootProps, getRootProps({
    onMouseDown
  }), {
    className: clsx_m_default(classes.root, rootProps.className, className),
    children: [e2(Rail, _extends({}, railProps, {
      className: clsx_m_default(classes.rail, railProps.className)
    })), e2(Track, _extends({}, trackProps, {
      className: clsx_m_default(classes.track, trackProps.className),
      style: _extends({}, trackStyle, trackProps.style)
    })), marks.map((mark, index) => {
      const percent = valueToPercent(mark.value, min2, max2);
      const style3 = axisProps2[axis].offset(percent);
      let markActive;
      if (track === false) {
        markActive = values3.indexOf(mark.value) !== -1;
      } else {
        markActive = track === "normal" && (range ? mark.value >= values3[0] && mark.value <= values3[values3.length - 1] : mark.value <= values3[0]) || track === "inverted" && (range ? mark.value <= values3[0] || mark.value >= values3[values3.length - 1] : mark.value >= values3[0]);
      }
      return e2(React40.Fragment, {
        children: [e2(Mark, _extends({
          "data-index": index
        }, markProps, !isHostComponent_default(Mark) && {
          markActive
        }, {
          style: _extends({}, style3, markProps.style),
          className: clsx_m_default(classes.mark, markProps.className, markActive && classes.markActive)
        })), mark.label != null ? e2(MarkLabel, _extends({
          "aria-hidden": true,
          "data-index": index
        }, markLabelProps, !isHostComponent_default(MarkLabel) && {
          markLabelActive: markActive
        }, {
          style: _extends({}, style3, markLabelProps.style),
          className: clsx_m_default(classes.markLabel, markLabelProps.className, markActive && classes.markLabelActive),
          children: mark.label
        })) : null]
      }, mark.value);
    }), values3.map((value, index) => {
      const percent = valueToPercent(value, min2, max2);
      const style3 = axisProps2[axis].offset(percent);
      const ValueLabelComponent = valueLabelDisplay === "off" ? Forward : ValueLabel;
      return e2(React40.Fragment, {
        children: e2(ValueLabelComponent, _extends({}, !isHostComponent_default(ValueLabelComponent) && {
          valueLabelFormat,
          valueLabelDisplay,
          value: typeof valueLabelFormat === "function" ? valueLabelFormat(scale(value), index) : valueLabelFormat,
          index,
          open: open === index || active === index || valueLabelDisplay === "on",
          disabled
        }, valueLabelProps, {
          className: clsx_m_default(classes.valueLabel, valueLabelProps.className),
          children: e2(Thumb, _extends({
            "data-index": index
          }, thumbProps, getThumbProps(), {
            className: clsx_m_default(classes.thumb, thumbProps.className, active === index && classes.active, focusVisible === index && classes.focusVisible)
          }, !isHostComponent_default(Thumb) && {
            ownerState: _extends({}, ownerState, thumbProps.ownerState)
          }, {
            style: _extends({}, style3, {
              pointerEvents: disableSwap && active !== index ? "none" : void 0
            }, thumbProps.style),
            children: e2(Input, _extends({}, hiddenInputProps, {
              "data-index": index,
              "aria-label": getAriaLabel ? getAriaLabel(index) : ariaLabel,
              "aria-valuenow": scale(value),
              "aria-valuetext": getAriaValueText ? getAriaValueText(scale(value), index) : ariaValuetext,
              value: values3[index]
            }, !isHostComponent_default(Input) && {
              ownerState: _extends({}, ownerState, inputProps.ownerState)
            }, inputProps, {
              style: _extends({}, hiddenInputProps.style, inputProps.style)
            }))
          }))
        }))
      }, index);
    })]
  }));
});
false ? SliderUnstyled.propTypes = {
  "aria-label": chainPropTypes(import_prop_types21.default.string, (props) => {
    const range = Array.isArray(props.value || props.defaultValue);
    if (range && props["aria-label"] != null) {
      return new Error("MUI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.");
    }
    return null;
  }),
  "aria-labelledby": import_prop_types21.default.string,
  "aria-valuetext": chainPropTypes(import_prop_types21.default.string, (props) => {
    const range = Array.isArray(props.value || props.defaultValue);
    if (range && props["aria-valuetext"] != null) {
      return new Error("MUI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.");
    }
    return null;
  }),
  children: import_prop_types21.default.node,
  classes: import_prop_types21.default.object,
  className: import_prop_types21.default.string,
  component: import_prop_types21.default.elementType,
  components: import_prop_types21.default.shape({
    Input: import_prop_types21.default.elementType,
    Mark: import_prop_types21.default.elementType,
    MarkLabel: import_prop_types21.default.elementType,
    Rail: import_prop_types21.default.elementType,
    Root: import_prop_types21.default.elementType,
    Thumb: import_prop_types21.default.elementType,
    Track: import_prop_types21.default.elementType,
    ValueLabel: import_prop_types21.default.elementType
  }),
  componentsProps: import_prop_types21.default.shape({
    input: import_prop_types21.default.object,
    mark: import_prop_types21.default.object,
    markLabel: import_prop_types21.default.object,
    rail: import_prop_types21.default.object,
    root: import_prop_types21.default.object,
    thumb: import_prop_types21.default.object,
    track: import_prop_types21.default.object,
    valueLabel: import_prop_types21.default.shape({
      className: import_prop_types21.default.string,
      components: import_prop_types21.default.shape({
        Root: import_prop_types21.default.elementType
      }),
      style: import_prop_types21.default.object,
      value: import_prop_types21.default.oneOfType([import_prop_types21.default.arrayOf(import_prop_types21.default.number), import_prop_types21.default.number]),
      valueLabelDisplay: import_prop_types21.default.oneOf(["auto", "off", "on"])
    })
  }),
  defaultValue: import_prop_types21.default.oneOfType([import_prop_types21.default.arrayOf(import_prop_types21.default.number), import_prop_types21.default.number]),
  disabled: import_prop_types21.default.bool,
  disableSwap: import_prop_types21.default.bool,
  getAriaLabel: import_prop_types21.default.func,
  getAriaValueText: import_prop_types21.default.func,
  isRtl: import_prop_types21.default.bool,
  marks: import_prop_types21.default.oneOfType([import_prop_types21.default.arrayOf(import_prop_types21.default.shape({
    label: import_prop_types21.default.node,
    value: import_prop_types21.default.number.isRequired
  })), import_prop_types21.default.bool]),
  max: import_prop_types21.default.number,
  min: import_prop_types21.default.number,
  name: import_prop_types21.default.string,
  onChange: import_prop_types21.default.func,
  onChangeCommitted: import_prop_types21.default.func,
  onMouseDown: import_prop_types21.default.func,
  orientation: import_prop_types21.default.oneOf(["horizontal", "vertical"]),
  scale: import_prop_types21.default.func,
  step: import_prop_types21.default.number,
  tabIndex: import_prop_types21.default.number,
  track: import_prop_types21.default.oneOf(["inverted", "normal", false]),
  value: import_prop_types21.default.oneOfType([import_prop_types21.default.arrayOf(import_prop_types21.default.number), import_prop_types21.default.number]),
  valueLabelDisplay: import_prop_types21.default.oneOf(["auto", "off", "on"]),
  valueLabelFormat: import_prop_types21.default.oneOfType([import_prop_types21.default.func, import_prop_types21.default.string])
} : void 0;
var SliderUnstyled_default = SliderUnstyled;

// ../../node_modules/@mui/base/SwitchUnstyled/SwitchUnstyled.js
var import_prop_types22 = __toESM(require_prop_types());
import * as React42 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/base/SwitchUnstyled/useSwitch.js
import * as React41 from "https://spike.land/dist/react.mjs";
function useSwitch(props) {
  const {
    checked: checkedProp,
    defaultChecked,
    disabled,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly,
    required
  } = props;
  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: "Switch",
    state: "checked"
  });
  const handleInputChange = (event, otherHandler) => {
    if (event.nativeEvent.defaultPrevented) {
      return;
    }
    setCheckedState(event.target.checked);
    onChange == null ? void 0 : onChange(event);
    otherHandler == null ? void 0 : otherHandler(event);
  };
  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React41.useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }
  React41.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);
  const inputRef = React41.useRef(null);
  const handleFocus = (event, otherHandler) => {
    if (!inputRef.current) {
      inputRef.current = event.currentTarget;
    }
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
      onFocusVisible == null ? void 0 : onFocusVisible(event);
    }
    onFocus == null ? void 0 : onFocus(event);
    otherHandler == null ? void 0 : otherHandler(event);
  };
  const handleBlur2 = (event, otherHandler) => {
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    onBlur == null ? void 0 : onBlur(event);
    otherHandler == null ? void 0 : otherHandler(event);
  };
  const handleRefChange = useForkRef(focusVisibleRef, inputRef);
  const getInputProps = (otherProps = {}) => _extends({
    checked: checkedProp,
    defaultChecked,
    disabled,
    readOnly,
    required,
    type: "checkbox"
  }, otherProps, {
    onChange: (event) => handleInputChange(event, otherProps.onChange),
    onFocus: (event) => handleFocus(event, otherProps.onFocus),
    onBlur: (event) => handleBlur2(event, otherProps.onBlur),
    ref: handleRefChange
  });
  return {
    checked,
    disabled: Boolean(disabled),
    focusVisible,
    getInputProps,
    readOnly: Boolean(readOnly)
  };
}

// ../../node_modules/@mui/base/SwitchUnstyled/switchUnstyledClasses.js
var switchUnstyledClasses = generateUtilityClasses("MuiSwitch", ["root", "input", "track", "thumb", "checked", "disabled", "focusVisible", "readOnly"]);
var switchUnstyledClasses_default = switchUnstyledClasses;

// ../../node_modules/@mui/base/SwitchUnstyled/SwitchUnstyled.js
var _excluded14 = ["checked", "className", "component", "components", "componentsProps", "defaultChecked", "disabled", "onBlur", "onChange", "onFocus", "onFocusVisible", "readOnly", "required"];
var SwitchUnstyled = React42.forwardRef(function SwitchUnstyled2(props, ref) {
  var _ref, _components$Thumb, _componentsProps$thum, _components$Input, _componentsProps$inpu, _components$Track, _componentsProps$trac;
  const {
    checked: checkedProp,
    className,
    component,
    components = {},
    componentsProps = {},
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly: readOnlyProp
  } = props, otherProps = _objectWithoutPropertiesLoose(props, _excluded14);
  const useSwitchProps = {
    checked: checkedProp,
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly: readOnlyProp
  };
  const {
    getInputProps,
    checked,
    disabled,
    focusVisible,
    readOnly
  } = useSwitch(useSwitchProps);
  const ownerState = _extends({}, props, {
    checked,
    disabled,
    focusVisible,
    readOnly
  });
  const Root = (_ref = component != null ? component : components.Root) != null ? _ref : "span";
  const rootProps = appendOwnerState(Root, _extends({}, otherProps, componentsProps.root), ownerState);
  const Thumb = (_components$Thumb = components.Thumb) != null ? _components$Thumb : "span";
  const thumbProps = appendOwnerState(Thumb, (_componentsProps$thum = componentsProps.thumb) != null ? _componentsProps$thum : {}, ownerState);
  const Input = (_components$Input = components.Input) != null ? _components$Input : "input";
  const inputProps = appendOwnerState(Input, (_componentsProps$inpu = componentsProps.input) != null ? _componentsProps$inpu : {}, ownerState);
  const Track = components.Track === null ? () => null : (_components$Track = components.Track) != null ? _components$Track : "span";
  const trackProps = appendOwnerState(Track, (_componentsProps$trac = componentsProps.track) != null ? _componentsProps$trac : {}, ownerState);
  const stateClasses = clsx_m_default(checked && switchUnstyledClasses_default.checked, disabled && switchUnstyledClasses_default.disabled, focusVisible && switchUnstyledClasses_default.focusVisible, readOnly && switchUnstyledClasses_default.readOnly);
  return e2(Root, _extends({
    ref
  }, rootProps, {
    className: clsx_m_default(switchUnstyledClasses_default.root, stateClasses, className, rootProps == null ? void 0 : rootProps.className),
    children: [e2(Track, _extends({}, trackProps, {
      className: clsx_m_default(switchUnstyledClasses_default.track, trackProps == null ? void 0 : trackProps.className)
    })), e2(Thumb, _extends({}, thumbProps, {
      className: clsx_m_default(switchUnstyledClasses_default.thumb, thumbProps == null ? void 0 : thumbProps.className)
    })), e2(Input, _extends({}, getInputProps(inputProps), {
      className: clsx_m_default(switchUnstyledClasses_default.input, inputProps == null ? void 0 : inputProps.className)
    }))]
  }));
});
false ? SwitchUnstyled.propTypes = {
  checked: import_prop_types22.default.bool,
  className: import_prop_types22.default.string,
  component: import_prop_types22.default.elementType,
  components: import_prop_types22.default.shape({
    Input: import_prop_types22.default.elementType,
    Root: import_prop_types22.default.elementType,
    Thumb: import_prop_types22.default.elementType,
    Track: import_prop_types22.default.oneOfType([import_prop_types22.default.elementType, import_prop_types22.default.oneOf([null])])
  }),
  componentsProps: import_prop_types22.default.shape({
    input: import_prop_types22.default.object,
    root: import_prop_types22.default.object,
    thumb: import_prop_types22.default.object,
    track: import_prop_types22.default.object
  }),
  defaultChecked: import_prop_types22.default.bool,
  disabled: import_prop_types22.default.bool,
  onBlur: import_prop_types22.default.func,
  onChange: import_prop_types22.default.func,
  onFocus: import_prop_types22.default.func,
  onFocusVisible: import_prop_types22.default.func,
  readOnly: import_prop_types22.default.bool,
  required: import_prop_types22.default.bool
} : void 0;

// ../../node_modules/@mui/base/TabPanelUnstyled/TabPanelUnstyled.js
var import_prop_types24 = __toESM(require_prop_types());
import * as React46 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/base/TabPanelUnstyled/tabPanelUnstyledClasses.js
function getTabPanelUnstyledUtilityClass(slot) {
  return generateUtilityClass("TabPanelUnstyled", slot);
}
var tabPanelUnstyledClasses = generateUtilityClasses("TabPanelUnstyled", ["root", "hidden"]);

// ../../node_modules/@mui/base/TabsUnstyled/TabsUnstyled.js
var import_prop_types23 = __toESM(require_prop_types());
import * as React45 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/base/TabsUnstyled/tabsUnstyledClasses.js
function getTabsUnstyledUtilityClass(slot) {
  return generateUtilityClass("TabsUnstyled", slot);
}
var tabsUnstyledClasses = generateUtilityClasses("TabsUnstyled", ["root", "horizontal", "vertical"]);

// ../../node_modules/@mui/base/TabsUnstyled/useTabs.js
import * as React43 from "https://spike.land/dist/react.mjs";
var useTabs = (props) => {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    orientation,
    direction,
    selectionFollowsFocus
  } = props;
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "Tabs",
    state: "value"
  });
  const idPrefix = useId2();
  const onSelected = React43.useCallback((e3, newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(e3, newValue);
    }
  }, [onChange, setValue]);
  const getRootProps = () => {
    return {};
  };
  const tabsContextValue = React43.useMemo(() => {
    return {
      idPrefix,
      value,
      onSelected,
      orientation,
      direction,
      selectionFollowsFocus
    };
  }, [idPrefix, value, onSelected, orientation, direction, selectionFollowsFocus]);
  return {
    getRootProps,
    tabsContextValue
  };
};
var useTabs_default = useTabs;

// ../../node_modules/@mui/base/TabsUnstyled/TabsContext.js
import * as React44 from "https://spike.land/dist/react.mjs";
var Context = React44.createContext(null);
if (false) {
  Context.displayName = "TabsContext";
}
function useTabContext() {
  return React44.useContext(Context);
}
function getPanelId(context, value) {
  const {
    idPrefix
  } = context;
  if (idPrefix === null) {
    return null;
  }
  return `${context.idPrefix}-P-${value}`;
}
function getTabId(context, value) {
  const {
    idPrefix
  } = context;
  if (idPrefix === null) {
    return null;
  }
  return `${context.idPrefix}-T-${value}`;
}
var TabsContext_default = Context;

// ../../node_modules/@mui/base/TabsUnstyled/TabsUnstyled.js
var _excluded15 = ["children", "className", "value", "defaultValue", "orientation", "direction", "component", "components", "componentsProps", "onChange", "selectionFollowsFocus"];
var useUtilityClasses9 = (ownerState) => {
  const {
    orientation
  } = ownerState;
  const slots = {
    root: ["root", orientation]
  };
  return composeClasses(slots, getTabsUnstyledUtilityClass, {});
};
var TabsUnstyled = React45.forwardRef((props, ref) => {
  var _ref, _componentsProps$root;
  const {
    children: children2,
    className,
    orientation = "horizontal",
    direction = "ltr",
    component,
    components = {},
    componentsProps = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded15);
  const {
    tabsContextValue,
    getRootProps
  } = useTabs_default(props);
  const ownerState = _extends({}, props, {
    orientation,
    direction
  });
  const classes = useUtilityClasses9(ownerState);
  const TabsRoot = (_ref = component != null ? component : components.Root) != null ? _ref : "div";
  const tabsRootProps = appendOwnerState(TabsRoot, _extends({}, other, componentsProps.root), ownerState);
  return e2(TabsRoot, _extends({}, getRootProps(), tabsRootProps, {
    ref,
    className: clsx_m_default(classes.root, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className, className),
    children: e2(TabsContext_default.Provider, {
      value: tabsContextValue,
      children: children2
    })
  }));
});
false ? TabsUnstyled.propTypes = {
  children: import_prop_types23.default.node,
  className: import_prop_types23.default.string,
  component: import_prop_types23.default.elementType,
  components: import_prop_types23.default.shape({
    Root: import_prop_types23.default.elementType
  }),
  componentsProps: import_prop_types23.default.shape({
    root: import_prop_types23.default.object
  }),
  defaultValue: import_prop_types23.default.oneOfType([import_prop_types23.default.oneOf([false]), import_prop_types23.default.number, import_prop_types23.default.string]),
  direction: import_prop_types23.default.oneOf(["ltr", "rtl"]),
  onChange: import_prop_types23.default.func,
  orientation: import_prop_types23.default.oneOf(["horizontal", "vertical"]),
  selectionFollowsFocus: import_prop_types23.default.bool,
  value: import_prop_types23.default.oneOfType([import_prop_types23.default.oneOf([false]), import_prop_types23.default.number, import_prop_types23.default.string])
} : void 0;

// ../../node_modules/@mui/base/TabPanelUnstyled/useTabPanel.js
var useTabPanel = (props) => {
  const {
    value
  } = props;
  const context = useTabContext();
  if (context === null) {
    throw new Error("No TabContext provided");
  }
  const hidden = value !== context.value;
  const id = getPanelId(context, value);
  const tabId = getTabId(context, value);
  const getRootProps = () => {
    return {
      "aria-labelledby": tabId,
      hidden,
      id
    };
  };
  return {
    hidden,
    getRootProps
  };
};
var useTabPanel_default = useTabPanel;

// ../../node_modules/@mui/base/TabPanelUnstyled/TabPanelUnstyled.js
var _excluded16 = ["children", "className", "value", "components", "componentsProps", "component"];
var useUtilityClasses10 = (ownerState) => {
  const {
    hidden
  } = ownerState;
  const slots = {
    root: ["root", hidden && "hidden"]
  };
  return composeClasses(slots, getTabPanelUnstyledUtilityClass, {});
};
var TabPanelUnstyled = React46.forwardRef(function TabPanelUnstyled2(props, ref) {
  var _ref, _componentsProps$root;
  const {
    children: children2,
    className,
    components = {},
    componentsProps = {},
    component
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded16);
  const {
    hidden,
    getRootProps
  } = useTabPanel_default(props);
  const ownerState = _extends({}, props, {
    hidden
  });
  const classes = useUtilityClasses10(ownerState);
  const TabPanelRoot = (_ref = component != null ? component : components.Root) != null ? _ref : "div";
  const tabPanelRootProps = appendOwnerState(TabPanelRoot, _extends({}, other, componentsProps.root), ownerState);
  return e2(TabPanelRoot, _extends({}, getRootProps(), {
    ref,
    role: "tabpanel"
  }, tabPanelRootProps, {
    className: clsx_m_default(classes.root, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className, className),
    children: !hidden && children2
  }));
});
false ? TabPanelUnstyled.propTypes = {
  children: import_prop_types24.default.node,
  className: import_prop_types24.default.string,
  component: import_prop_types24.default.elementType,
  components: import_prop_types24.default.shape({
    Root: import_prop_types24.default.elementType
  }),
  componentsProps: import_prop_types24.default.shape({
    root: import_prop_types24.default.object
  }),
  value: import_prop_types24.default.oneOfType([import_prop_types24.default.number, import_prop_types24.default.string]).isRequired
} : void 0;

// ../../node_modules/@mui/base/TabsListUnstyled/TabsListUnstyled.js
var import_prop_types25 = __toESM(require_prop_types());
import * as React48 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/base/TabsListUnstyled/tabsListUnstyledClasses.js
function getTabsListUnstyledUtilityClass(slot) {
  return generateUtilityClass("TabsListUnstyled", slot);
}
var tabsListUnstyledClasses = generateUtilityClasses("TabsListUnstyled", ["root", "horizontal", "vertical"]);

// ../../node_modules/@mui/base/TabsListUnstyled/useTabsList.js
import * as React47 from "https://spike.land/dist/react.mjs";
var import_react_is2 = __toESM(require_react_is());
var nextItem = (list, item) => {
  if (!list) {
    return null;
  }
  if (list === item) {
    return list.firstChild;
  }
  if (item && item.nextElementSibling) {
    return item.nextElementSibling;
  }
  return list.firstChild;
};
var previousItem = (list, item) => {
  if (!list) {
    return null;
  }
  if (list === item) {
    return list.lastChild;
  }
  if (item && item.previousElementSibling) {
    return item.previousElementSibling;
  }
  return list.lastChild;
};
var moveFocus = (list, currentFocus, traversalFunction) => {
  let wrappedOnce = false;
  let nextFocus = traversalFunction(list, currentFocus);
  while (list && nextFocus) {
    if (nextFocus === list.firstChild) {
      if (wrappedOnce) {
        return;
      }
      wrappedOnce = true;
    }
    const nextFocusDisabled = nextFocus.disabled || nextFocus.getAttribute("aria-disabled") === "true";
    if (!nextFocus.hasAttribute("tabindex") || nextFocusDisabled) {
      nextFocus = traversalFunction(list, nextFocus);
    } else {
      nextFocus.focus();
      return;
    }
  }
};
var useTabsList = (props) => {
  const {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    children: children2,
    ref
  } = props;
  const tabsListRef = React47.createRef();
  const handleRef = useForkRef(tabsListRef, ref);
  const context = useTabContext();
  if (context === null) {
    throw new Error("No TabContext provided");
  }
  const {
    value,
    orientation = "horizontal",
    direction = "ltr"
  } = context;
  const isRtl = direction === "rtl";
  const handleKeyDown3 = (event) => {
    const list = tabsListRef.current;
    const currentFocus = ownerDocument(list).activeElement;
    const role = currentFocus == null ? void 0 : currentFocus.getAttribute("role");
    if (role !== "tab") {
      return;
    }
    let previousItemKey = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
    let nextItemKey = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
    if (orientation === "horizontal" && isRtl) {
      previousItemKey = "ArrowRight";
      nextItemKey = "ArrowLeft";
    }
    switch (event.key) {
      case previousItemKey:
        event.preventDefault();
        moveFocus(list, currentFocus, previousItem);
        break;
      case nextItemKey:
        event.preventDefault();
        moveFocus(list, currentFocus, nextItem);
        break;
      case "Home":
        event.preventDefault();
        moveFocus(list, null, nextItem);
        break;
      case "End":
        event.preventDefault();
        moveFocus(list, null, previousItem);
        break;
      default:
        break;
    }
  };
  const createHandleKeyDown = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyD;
    handleKeyDown3(event);
    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null ? void 0 : _otherHandlers$onKeyD.call(otherHandlers, event);
  };
  const getRootProps = (otherHandlers) => {
    const propsEventHandlers = extractEventHandlers(props);
    const externalEventHandlers = _extends({}, propsEventHandlers, otherHandlers);
    const ownEventHandlers = {
      onKeyDown: createHandleKeyDown(externalEventHandlers)
    };
    const mergedEventHandlers = _extends({}, externalEventHandlers, ownEventHandlers);
    return _extends({
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-orientation": orientation === "vertical" ? "vertical" : null,
      role: "tablist",
      ref: handleRef
    }, mergedEventHandlers);
  };
  const processChildren = React47.useCallback(() => {
    const valueToIndex = /* @__PURE__ */ new Map();
    let childIndex = 0;
    const processedChildren = React47.Children.map(children2, (child) => {
      if (!React47.isValidElement(child)) {
        return null;
      }
      if (false) {
        if ((0, import_react_is2.isFragment)(child)) {
          console.error(["MUI: The Tabs component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join("\n"));
        }
      }
      const childValue = child.props.value === void 0 ? childIndex : child.props.value;
      valueToIndex.set(childValue, childIndex);
      childIndex += 1;
      return React47.cloneElement(child, _extends({
        value: childValue
      }, childIndex === 1 && value === false && !child.props.tabIndex || value === childValue ? {
        tabIndex: 0
      } : {
        tabIndex: -1
      }));
    });
    return processedChildren;
  }, [children2, value]);
  return {
    isRtl,
    orientation,
    value,
    processChildren,
    getRootProps
  };
};
var useTabsList_default = useTabsList;

// ../../node_modules/@mui/base/TabsListUnstyled/TabsListUnstyled.js
var _excluded17 = ["className", "children", "component", "components", "componentsProps"];
var useUtilityClasses11 = (ownerState) => {
  const {
    orientation
  } = ownerState;
  const slots = {
    root: ["root", orientation]
  };
  return composeClasses(slots, getTabsListUnstyledUtilityClass, {});
};
var TabsListUnstyled = React48.forwardRef((props, ref) => {
  var _ref, _componentsProps$root;
  const {
    className,
    component,
    components = {},
    componentsProps = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded17);
  const {
    isRtl,
    orientation,
    getRootProps,
    processChildren
  } = useTabsList_default(_extends({}, props, {
    ref
  }));
  const ownerState = _extends({}, props, {
    isRtl,
    orientation
  });
  const classes = useUtilityClasses11(ownerState);
  const TabsListRoot = (_ref = component != null ? component : components.Root) != null ? _ref : "div";
  const tabsListRootProps = appendOwnerState(TabsListRoot, _extends({}, other, componentsProps.root), ownerState);
  const processedChildren = processChildren();
  return e2(TabsListRoot, _extends({}, getRootProps(), tabsListRootProps, {
    className: clsx_m_default(className, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className, classes.root),
    children: processedChildren
  }));
});
false ? TabsListUnstyled.propTypes = {
  children: import_prop_types25.default.node,
  className: import_prop_types25.default.string,
  component: import_prop_types25.default.elementType,
  components: import_prop_types25.default.shape({
    Root: import_prop_types25.default.elementType
  }),
  componentsProps: import_prop_types25.default.shape({
    root: import_prop_types25.default.object
  })
} : void 0;

// ../../node_modules/@mui/base/TabUnstyled/TabUnstyled.js
var import_prop_types26 = __toESM(require_prop_types());
import * as React49 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/base/TabUnstyled/tabUnstyledClasses.js
function getTabUnstyledUtilityClass(slot) {
  return generateUtilityClass("TabUnstyled", slot);
}
var tabUnstyledClasses = generateUtilityClasses("TabUnstyled", ["root", "selected", "disabled"]);

// ../../node_modules/@mui/base/TabUnstyled/useTab.js
var _excluded18 = ["getRootProps"];
var useTab = (props) => {
  const {
    value: valueProp,
    onChange,
    onClick,
    onFocus
  } = props;
  const _useButton = useButton(props), {
    getRootProps: getRootPropsButton
  } = _useButton, otherButtonProps = _objectWithoutPropertiesLoose(_useButton, _excluded18);
  const context = useTabContext();
  if (context === null) {
    throw new Error("No TabContext provided");
  }
  const value = valueProp != null ? valueProp : 0;
  const selected = context.value === value;
  const selectionFollowsFocus = context.selectionFollowsFocus;
  const a11yAttributes = {
    role: "tab",
    "aria-controls": getPanelId(context, value),
    id: getTabId(context, value),
    "aria-selected": selected,
    disabled: otherButtonProps.disabled
  };
  const handleFocus = (event) => {
    if (selectionFollowsFocus && !selected) {
      if (onChange) {
        onChange(event, value);
      }
      context.onSelected(event, value);
    }
    if (onFocus) {
      onFocus(event);
    }
  };
  const handleClick = (event) => {
    if (!selected) {
      if (onChange) {
        onChange(event, value);
      }
      context.onSelected(event, value);
    }
    if (onClick) {
      onClick(event);
    }
  };
  const getRootProps = (otherHandlers) => {
    const buttonResolvedProps = getRootPropsButton(_extends({
      onClick: handleClick,
      onFocus: handleFocus
    }, otherHandlers));
    return _extends({}, buttonResolvedProps, a11yAttributes);
  };
  return _extends({
    getRootProps
  }, otherButtonProps, {
    selected
  });
};
var useTab_default = useTab;

// ../../node_modules/@mui/base/TabUnstyled/TabUnstyled.js
var _excluded19 = ["action", "children", "value", "className", "disabled", "onChange", "onClick", "onFocus", "component", "components", "componentsProps"];
var useUtilityClasses12 = (ownerState) => {
  const {
    selected,
    disabled
  } = ownerState;
  const slots = {
    root: ["root", selected && "selected", disabled && "disabled"]
  };
  return composeClasses(slots, getTabUnstyledUtilityClass, {});
};
var TabUnstyled = React49.forwardRef(function TabUnstyled2(props, ref) {
  var _ref, _componentsProps$root;
  const {
    action,
    children: children2,
    className,
    disabled = false,
    component,
    components = {},
    componentsProps = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded19);
  const tabRef = React49.useRef();
  const handleRef = useForkRef(tabRef, ref);
  const {
    active,
    focusVisible,
    setFocusVisible,
    selected,
    getRootProps
  } = useTab_default(_extends({}, props, {
    ref: handleRef
  }));
  React49.useImperativeHandle(action, () => ({
    focusVisible: () => {
      setFocusVisible(true);
      tabRef.current.focus();
    }
  }), [setFocusVisible]);
  const ownerState = _extends({}, props, {
    active,
    focusVisible,
    disabled,
    selected
  });
  const classes = useUtilityClasses12(ownerState);
  const TabRoot = (_ref = component != null ? component : components.Root) != null ? _ref : "button";
  const tabRootProps = appendOwnerState(TabRoot, _extends({}, other, componentsProps.root), ownerState);
  return e2(TabRoot, _extends({}, getRootProps(), tabRootProps, {
    className: clsx_m_default(classes.root, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className, className),
    ref,
    children: children2
  }));
});
false ? TabUnstyled.propTypes = {
  action: import_prop_types26.default.oneOfType([import_prop_types26.default.func, import_prop_types26.default.shape({
    current: import_prop_types26.default.shape({
      focusVisible: import_prop_types26.default.func.isRequired
    })
  })]),
  children: import_prop_types26.default.node,
  className: import_prop_types26.default.string,
  component: import_prop_types26.default.elementType,
  components: import_prop_types26.default.shape({
    Root: import_prop_types26.default.elementType
  }),
  componentsProps: import_prop_types26.default.shape({
    root: import_prop_types26.default.object
  }),
  disabled: import_prop_types26.default.bool,
  onChange: import_prop_types26.default.func,
  onClick: import_prop_types26.default.func,
  onFocus: import_prop_types26.default.func,
  value: import_prop_types26.default.oneOfType([import_prop_types26.default.number, import_prop_types26.default.string])
} : void 0;

// ../../node_modules/@mui/base/TextareaAutosize/TextareaAutosize.js
var import_prop_types27 = __toESM(require_prop_types());
import * as React50 from "https://spike.land/dist/react.mjs";
var _excluded20 = ["onChange", "maxRows", "minRows", "style", "value"];
function getStyleValue(computedStyle, property) {
  return parseInt(computedStyle[property], 10) || 0;
}
var styles = {
  shadow: {
    visibility: "hidden",
    position: "absolute",
    overflow: "hidden",
    height: 0,
    top: 0,
    left: 0,
    transform: "translateZ(0)"
  }
};
var TextareaAutosize = React50.forwardRef(function TextareaAutosize2(props, ref) {
  const {
    onChange,
    maxRows,
    minRows = 1,
    style: style3,
    value
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded20);
  const {
    current: isControlled
  } = React50.useRef(value != null);
  const inputRef = React50.useRef(null);
  const handleRef = useForkRef(ref, inputRef);
  const shadowRef = React50.useRef(null);
  const renders = React50.useRef(0);
  const [state, setState] = React50.useState({});
  const syncHeight = React50.useCallback(() => {
    const input = inputRef.current;
    const containerWindow = ownerWindow(input);
    const computedStyle = containerWindow.getComputedStyle(input);
    if (computedStyle.width === "0px") {
      return;
    }
    const inputShallow = shadowRef.current;
    inputShallow.style.width = computedStyle.width;
    inputShallow.value = input.value || props.placeholder || "x";
    if (inputShallow.value.slice(-1) === "\n") {
      inputShallow.value += " ";
    }
    const boxSizing2 = computedStyle["box-sizing"];
    const padding2 = getStyleValue(computedStyle, "padding-bottom") + getStyleValue(computedStyle, "padding-top");
    const border2 = getStyleValue(computedStyle, "border-bottom-width") + getStyleValue(computedStyle, "border-top-width");
    const innerHeight2 = inputShallow.scrollHeight;
    inputShallow.value = "x";
    const singleRowHeight = inputShallow.scrollHeight;
    let outerHeight = innerHeight2;
    if (minRows) {
      outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
    }
    if (maxRows) {
      outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
    }
    outerHeight = Math.max(outerHeight, singleRowHeight);
    const outerHeightStyle = outerHeight + (boxSizing2 === "border-box" ? padding2 + border2 : 0);
    const overflow2 = Math.abs(outerHeight - innerHeight2) <= 1;
    setState((prevState) => {
      if (renders.current < 20 && (outerHeightStyle > 0 && Math.abs((prevState.outerHeightStyle || 0) - outerHeightStyle) > 1 || prevState.overflow !== overflow2)) {
        renders.current += 1;
        return {
          overflow: overflow2,
          outerHeightStyle
        };
      }
      if (false) {
        if (renders.current === 20) {
          console.error(["MUI: Too many re-renders. The layout is unstable.", "TextareaAutosize limits the number of renders to prevent an infinite loop."].join("\n"));
        }
      }
      return prevState;
    });
  }, [maxRows, minRows, props.placeholder]);
  React50.useEffect(() => {
    const handleResize = debounce(() => {
      renders.current = 0;
      syncHeight();
    });
    const containerWindow = ownerWindow(inputRef.current);
    containerWindow.addEventListener("resize", handleResize);
    let resizeObserver;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(inputRef.current);
    }
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener("resize", handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [syncHeight]);
  useEnhancedEffect_default(() => {
    syncHeight();
  });
  React50.useEffect(() => {
    renders.current = 0;
  }, [value]);
  const handleChange = (event) => {
    renders.current = 0;
    if (!isControlled) {
      syncHeight();
    }
    if (onChange) {
      onChange(event);
    }
  };
  return e2(React50.Fragment, {
    children: [e2("textarea", _extends({
      value,
      onChange: handleChange,
      ref: handleRef,
      rows: minRows,
      style: _extends({
        height: state.outerHeightStyle,
        overflow: state.overflow ? "hidden" : null
      }, style3)
    }, other)), e2("textarea", {
      "aria-hidden": true,
      className: props.className,
      readOnly: true,
      ref: shadowRef,
      tabIndex: -1,
      style: _extends({}, styles.shadow, style3, {
        padding: 0
      })
    })]
  });
});
false ? TextareaAutosize.propTypes = {
  className: import_prop_types27.default.string,
  maxRows: import_prop_types27.default.oneOfType([import_prop_types27.default.number, import_prop_types27.default.string]),
  minRows: import_prop_types27.default.oneOfType([import_prop_types27.default.number, import_prop_types27.default.string]),
  onChange: import_prop_types27.default.func,
  placeholder: import_prop_types27.default.string,
  style: import_prop_types27.default.object,
  value: import_prop_types27.default.oneOfType([import_prop_types27.default.arrayOf(import_prop_types27.default.string), import_prop_types27.default.number, import_prop_types27.default.string])
} : void 0;

// ../../node_modules/@mui/material/ButtonBase/ButtonBase.js
var import_prop_types44 = __toESM(require_prop_types());
import * as React70 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js
import "https://spike.land/dist/react.mjs";

// ../../node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.browser.esm.js
var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
var isPropValid = emotion_memoize_browser_esm_default(function(prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
});
var emotion_is_prop_valid_browser_esm_default = isPropValid;

// ../../node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js
import * as React51 from "https://spike.land/dist/react.mjs";
import { useContext as useContext4, createElement, Fragment as Fragment9 } from "https://spike.land/dist/react.mjs";
import { withEmotionCache, ThemeContext } from "https://spike.land/dist/emotion.mjs";

// ../../node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js
var isBrowser = true;
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
var registerStyles = function registerStyles2(cache2, serialized, isStringTag) {
  var className = cache2.key + "-" + serialized.name;
  if ((isStringTag === false || isBrowser === false) && cache2.registered[className] === void 0) {
    cache2.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles2(cache2, serialized, isStringTag) {
  registerStyles(cache2, serialized, isStringTag);
  var className = cache2.key + "-" + serialized.name;
  if (cache2.inserted[serialized.name] === void 0) {
    var current = serialized;
    do {
      var maybeStyles = cache2.insert(serialized === current ? "." + className : "", current, cache2.sheet, true);
      current = current.next;
    } while (current !== void 0);
  }
};

// ../../node_modules/@emotion/hash/dist/hash.browser.esm.js
function murmur2(str) {
  var h2 = 0;
  var k2, i2 = 0, len = str.length;
  for (; len >= 4; ++i2, len -= 4) {
    k2 = str.charCodeAt(i2) & 255 | (str.charCodeAt(++i2) & 255) << 8 | (str.charCodeAt(++i2) & 255) << 16 | (str.charCodeAt(++i2) & 255) << 24;
    k2 = (k2 & 65535) * 1540483477 + ((k2 >>> 16) * 59797 << 16);
    k2 ^= k2 >>> 24;
    h2 = (k2 & 65535) * 1540483477 + ((k2 >>> 16) * 59797 << 16) ^ (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h2 ^= (str.charCodeAt(i2 + 2) & 255) << 16;
    case 2:
      h2 ^= (str.charCodeAt(i2 + 1) & 255) << 8;
    case 1:
      h2 ^= str.charCodeAt(i2) & 255;
      h2 = (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  }
  h2 ^= h2 >>> 13;
  h2 = (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  return ((h2 ^ h2 >>> 15) >>> 0).toString(36);
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
var processStyleName = emotion_memoize_browser_esm_default(function(styleName) {
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
  contentValuePattern = /(var|attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
  contentValues = ["normal", "none", "initial", "inherit", "unset"];
  oldProcessStyleValue = processStyleValue;
  msPattern = /^-ms-/;
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
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, "ms-").replace(hyphenPattern, function(str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }
    return processed;
  };
}
var contentValuePattern;
var contentValues;
var oldProcessStyleValue;
var msPattern;
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
        var styles2 = interpolation.styles + ";";
        if (false) {
          styles2 += interpolation.map;
        }
        return styles2;
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
var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
if (false) {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
}
var cursor;
var serializeStyles = function serializeStyles2(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
    return args[0];
  }
  var stringMode = true;
  var styles2 = "";
  cursor = void 0;
  var strings = args[0];
  if (strings == null || strings.raw === void 0) {
    stringMode = false;
    styles2 += handleInterpolation(mergedProps, registered, strings);
  } else {
    if (false) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }
    styles2 += strings[0];
  }
  for (var i2 = 1; i2 < args.length; i2++) {
    styles2 += handleInterpolation(mergedProps, registered, args[i2]);
    if (stringMode) {
      if (false) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }
      styles2 += strings[i2];
    }
  }
  var sourceMap;
  if (false) {
    styles2 = styles2.replace(sourceMapPattern, function(match2) {
      sourceMap = match2;
      return "";
    });
  }
  labelPattern.lastIndex = 0;
  var identifierName = "";
  var match;
  while ((match = labelPattern.exec(styles2)) !== null) {
    identifierName += "-" + match[1];
  }
  var name = hash_browser_esm_default(styles2) + identifierName;
  if (false) {
    return {
      name,
      styles: styles2,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }
  return {
    name,
    styles: styles2,
    next: cursor
  };
};

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
var useInsertionEffect2 = React51["useInsertionEffect"] ? React51["useInsertionEffect"] : function useInsertionEffect3(create) {
  create();
};
function useInsertionEffectMaybe(create) {
  useInsertionEffect2(create);
}
var Insertion = function Insertion2(_ref) {
  var cache2 = _ref.cache, serialized = _ref.serialized, isStringTag = _ref.isStringTag;
  registerStyles(cache2, serialized, isStringTag);
  var rules = useInsertionEffectMaybe(function() {
    return insertStyles(cache2, serialized, isStringTag);
  });
  return null;
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
    var styles2 = isReal && tag.__emotion_styles !== void 0 ? tag.__emotion_styles.slice(0) : [];
    if (identifierName !== void 0) {
      styles2.push("label:" + identifierName + ";");
    }
    if (args[0] == null || args[0].raw === void 0) {
      styles2.push.apply(styles2, args);
    } else {
      if (false) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }
      styles2.push(args[0][0]);
      var len = args.length;
      var i2 = 1;
      for (; i2 < len; i2++) {
        if (false) {
          console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
        }
        styles2.push(args[i2], args[0][i2]);
      }
    }
    var Styled = withEmotionCache(function(props, cache2, ref) {
      var FinalTag = shouldUseAs && props.as || baseTag;
      var className = "";
      var classInterpolations = [];
      var mergedProps = props;
      if (props.theme == null) {
        mergedProps = {};
        for (var key in props) {
          mergedProps[key] = props[key];
        }
        mergedProps.theme = useContext4(ThemeContext);
      }
      if (typeof props.className === "string") {
        className = getRegisteredStyles(cache2.registered, classInterpolations, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }
      var serialized = serializeStyles(styles2.concat(classInterpolations), cache2.registered, mergedProps);
      className += cache2.key + "-" + serialized.name;
      if (targetClassName !== void 0) {
        className += " " + targetClassName;
      }
      var finalShouldForwardProp = shouldUseAs && shouldForwardProp2 === void 0 ? getDefaultShouldForwardProp(FinalTag) : defaultShouldForwardProp;
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
      return createElement(Fragment9, null, createElement(Insertion, {
        cache: cache2,
        serialized,
        isStringTag: typeof FinalTag === "string"
      }), createElement(FinalTag, newProps));
    });
    Styled.displayName = identifierName !== void 0 ? identifierName : "Styled(" + (typeof baseTag === "string" ? baseTag : baseTag.displayName || baseTag.name || "Component") + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles2;
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
      return createStyled2(nextTag, _extends({}, options, nextOptions, {
        shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
      })).apply(void 0, styles2);
    };
    return Styled;
  };
};
var emotion_styled_base_browser_esm_default = createStyled;

// ../../node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js
import "https://spike.land/dist/emotion.mjs";
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

// ../../node_modules/@mui/styled-engine/index.js
import { ThemeContext as ThemeContext2, keyframes, css } from "https://spike.land/dist/emotion.mjs";

// ../../node_modules/@mui/styled-engine/StyledEngineProvider/StyledEngineProvider.js
var import_prop_types28 = __toESM(require_prop_types());
import * as React52 from "https://spike.land/dist/react.mjs";
import { CacheProvider } from "https://spike.land/dist/emotion.mjs";
var cache = emotion_cache_browser_esm_default({
  key: "css",
  prepend: true
});
false ? StyledEngineProvider.propTypes = {
  children: import_prop_types28.default.node,
  injectFirst: import_prop_types28.default.bool
} : void 0;

// ../../node_modules/@mui/styled-engine/GlobalStyles/GlobalStyles.js
var import_prop_types29 = __toESM(require_prop_types());
import * as React53 from "https://spike.land/dist/react.mjs";
import { Global } from "https://spike.land/dist/emotion.mjs";
function isEmpty(obj) {
  return obj === void 0 || obj === null || Object.keys(obj).length === 0;
}
function GlobalStyles(props) {
  const {
    styles: styles2,
    defaultTheme: defaultTheme4 = {}
  } = props;
  const globalStyles = typeof styles2 === "function" ? (themeInput) => styles2(isEmpty(themeInput) ? defaultTheme4 : themeInput) : styles2;
  return e2(Global, {
    styles: globalStyles
  });
}
false ? GlobalStyles.propTypes = {
  defaultTheme: import_prop_types29.default.object,
  styles: import_prop_types29.default.oneOfType([import_prop_types29.default.string, import_prop_types29.default.object, import_prop_types29.default.func])
} : void 0;

// ../../node_modules/@mui/styled-engine/index.js
function styled(tag, options) {
  const stylesFactory = emotion_styled_browser_esm_default(tag, options);
  if (false) {
    return (...styles2) => {
      const component = typeof tag === "string" ? `"${tag}"` : "component";
      if (styles2.length === 0) {
        console.error([`MUI: Seems like you called \`styled(${component})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join("\n"));
      } else if (styles2.some((style3) => style3 === void 0)) {
        console.error(`MUI: the styled(${component})(...args) API requires all its args to be defined.`);
      }
      return stylesFactory(...styles2);
    };
  }
  return stylesFactory;
}

// ../../node_modules/@mui/system/esm/responsivePropType.js
var import_prop_types30 = __toESM(require_prop_types());
var responsivePropType = false ? import_prop_types30.default.oneOfType([import_prop_types30.default.number, import_prop_types30.default.string, import_prop_types30.default.object, import_prop_types30.default.array]) : {};

// ../../node_modules/@mui/system/esm/breakpoints.js
var import_prop_types31 = __toESM(require_prop_types());

// ../../node_modules/@mui/system/esm/merge.js
function merge(acc, item) {
  if (!item) {
    return acc;
  }
  return deepmerge(acc, item, {
    clone: false
  });
}
var merge_default = merge;

// ../../node_modules/@mui/system/esm/breakpoints.js
var values = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536
};
var defaultBreakpoints = {
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (key) => `@media (min-width:${values[key]}px)`
};
function handleBreakpoints(props, propValue, styleFromPropValue) {
  const theme = props.theme || {};
  if (Array.isArray(propValue)) {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return propValue.reduce((acc, item, index) => {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }
  if (typeof propValue === "object") {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return Object.keys(propValue).reduce((acc, breakpoint) => {
      if (Object.keys(themeBreakpoints.values || values).indexOf(breakpoint) !== -1) {
        const mediaKey = themeBreakpoints.up(breakpoint);
        acc[mediaKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
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
  const breakpointsInOrder = breakpointsInput == null ? void 0 : (_breakpointsInput$key = breakpointsInput.keys) == null ? void 0 : _breakpointsInput$key.reduce((acc, key) => {
    const breakpointStyleKey = breakpointsInput.up(key);
    acc[breakpointStyleKey] = {};
    return acc;
  }, {});
  return breakpointsInOrder || {};
}
function removeUnusedBreakpoints(breakpointKeys, style3) {
  return breakpointKeys.reduce((acc, key) => {
    const breakpointOutput = acc[key];
    const isBreakpointUnused = !breakpointOutput || Object.keys(breakpointOutput).length === 0;
    if (isBreakpointUnused) {
      delete acc[key];
    }
    return acc;
  }, style3);
}

// ../../node_modules/@mui/system/esm/style.js
function getPath(obj, path) {
  if (!path || typeof path !== "string") {
    return null;
  }
  if (obj && obj.vars) {
    const val = `vars.${path}`.split(".").reduce((acc, item) => acc && acc[item] ? acc[item] : null, obj);
    if (val != null) {
      return val;
    }
  }
  return path.split(".").reduce((acc, item) => {
    if (acc && acc[item] != null) {
      return acc[item];
    }
    return null;
  }, obj);
}
function getValue(themeMapping, transform2, propValueFinal, userValue = propValueFinal) {
  let value;
  if (typeof themeMapping === "function") {
    value = themeMapping(propValueFinal);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[propValueFinal] || userValue;
  } else {
    value = getPath(themeMapping, propValueFinal) || userValue;
  }
  if (transform2) {
    value = transform2(value);
  }
  return value;
}
function style(options) {
  const {
    prop,
    cssProperty = options.prop,
    themeKey,
    transform: transform2
  } = options;
  const fn2 = (props) => {
    if (props[prop] == null) {
      return null;
    }
    const propValue = props[prop];
    const theme = props.theme;
    const themeMapping = getPath(theme, themeKey) || {};
    const styleFromPropValue = (propValueFinal) => {
      let value = getValue(themeMapping, transform2, propValueFinal);
      if (propValueFinal === value && typeof propValueFinal === "string") {
        value = getValue(themeMapping, transform2, `${prop}${propValueFinal === "default" ? "" : capitalize(propValueFinal)}`, propValueFinal);
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
  fn2.propTypes = false ? {
    [prop]: responsivePropType_default
  } : {};
  fn2.filterProps = [prop];
  return fn2;
}
var style_default = style;

// ../../node_modules/@mui/system/esm/compose.js
function compose(...styles2) {
  const handlers = styles2.reduce((acc, style3) => {
    style3.filterProps.forEach((prop) => {
      acc[prop] = style3;
    });
    return acc;
  }, {});
  const fn2 = (props) => {
    return Object.keys(props).reduce((acc, prop) => {
      if (handlers[prop]) {
        return merge_default(acc, handlers[prop](props));
      }
      return acc;
    }, {});
  };
  fn2.propTypes = false ? styles2.reduce((acc, style3) => Object.assign(acc, style3.propTypes), {}) : {};
  fn2.filterProps = styles2.reduce((acc, style3) => acc.concat(style3.filterProps), []);
  return fn2;
}
var compose_default = compose;

// ../../node_modules/@mui/system/esm/memoize.js
function memoize(fn2) {
  const cache2 = {};
  return (arg) => {
    if (cache2[arg] === void 0) {
      cache2[arg] = fn2(arg);
    }
    return cache2[arg];
  };
}

// ../../node_modules/@mui/system/esm/spacing.js
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
var getCssProperties = memoize((prop) => {
  if (prop.length > 2) {
    if (aliases[prop]) {
      prop = aliases[prop];
    } else {
      return [prop];
    }
  }
  const [a2, b2] = prop.split("");
  const property = properties[a2];
  const direction = directions[b2] || "";
  return Array.isArray(direction) ? direction.map((dir) => property + dir) : [property + direction];
});
var marginKeys = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"];
var paddingKeys = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"];
var spacingKeys = [...marginKeys, ...paddingKeys];
function createUnaryUnit(theme, themeKey, defaultValue, propName) {
  var _getPath;
  const themeSpacing = (_getPath = getPath(theme, themeKey)) != null ? _getPath : defaultValue;
  if (typeof themeSpacing === "number") {
    return (abs) => {
      if (typeof abs === "string") {
        return abs;
      }
      if (false) {
        if (typeof abs !== "number") {
          console.error(`MUI: Expected ${propName} argument to be a number or a string, got ${abs}.`);
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
          console.error([`MUI: The \`theme.${themeKey}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${themeKey}\` as a number.`].join("\n"));
        } else if (abs > themeSpacing.length - 1) {
          console.error([`MUI: The value provided (${abs}) overflows.`, `The supported values are: ${JSON.stringify(themeSpacing)}.`, `${abs} > ${themeSpacing.length - 1}, you need to add the missing values.`].join("\n"));
        }
      }
      return themeSpacing[abs];
    };
  }
  if (typeof themeSpacing === "function") {
    return themeSpacing;
  }
  if (false) {
    console.error([`MUI: The \`theme.${themeKey}\` value (${themeSpacing}) is invalid.`, "It should be a number, an array or a function."].join("\n"));
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

// ../../node_modules/@mui/system/esm/borders.js
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
var borderTopColor = style_default({
  prop: "borderTopColor",
  themeKey: "palette"
});
var borderRightColor = style_default({
  prop: "borderRightColor",
  themeKey: "palette"
});
var borderBottomColor = style_default({
  prop: "borderBottomColor",
  themeKey: "palette"
});
var borderLeftColor = style_default({
  prop: "borderLeftColor",
  themeKey: "palette"
});
var borderRadius = (props) => {
  if (props.borderRadius !== void 0 && props.borderRadius !== null) {
    const transformer = createUnaryUnit(props.theme, "shape.borderRadius", 4, "borderRadius");
    const styleFromPropValue = (propValue) => ({
      borderRadius: getValue2(transformer, propValue)
    });
    return handleBreakpoints(props, props.borderRadius, styleFromPropValue);
  }
  return null;
};
borderRadius.propTypes = false ? {
  borderRadius: responsivePropType_default
} : {};
borderRadius.filterProps = ["borderRadius"];
var borders = compose_default(border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, borderRadius);
var borders_default = borders;

// ../../node_modules/@mui/system/esm/display.js
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

// ../../node_modules/@mui/system/esm/flexbox.js
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
var order2 = style_default({
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
var flexbox = compose_default(flexBasis, flexDirection, flexWrap, justifyContent, alignItems, alignContent, order2, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf);
var flexbox_default = flexbox;

// ../../node_modules/@mui/system/esm/grid.js
var gap = (props) => {
  if (props.gap !== void 0 && props.gap !== null) {
    const transformer = createUnaryUnit(props.theme, "spacing", 8, "gap");
    const styleFromPropValue = (propValue) => ({
      gap: getValue2(transformer, propValue)
    });
    return handleBreakpoints(props, props.gap, styleFromPropValue);
  }
  return null;
};
gap.propTypes = false ? {
  gap: responsivePropType_default
} : {};
gap.filterProps = ["gap"];
var columnGap = (props) => {
  if (props.columnGap !== void 0 && props.columnGap !== null) {
    const transformer = createUnaryUnit(props.theme, "spacing", 8, "columnGap");
    const styleFromPropValue = (propValue) => ({
      columnGap: getValue2(transformer, propValue)
    });
    return handleBreakpoints(props, props.columnGap, styleFromPropValue);
  }
  return null;
};
columnGap.propTypes = false ? {
  columnGap: responsivePropType_default
} : {};
columnGap.filterProps = ["columnGap"];
var rowGap = (props) => {
  if (props.rowGap !== void 0 && props.rowGap !== null) {
    const transformer = createUnaryUnit(props.theme, "spacing", 8, "rowGap");
    const styleFromPropValue = (propValue) => ({
      rowGap: getValue2(transformer, propValue)
    });
    return handleBreakpoints(props, props.rowGap, styleFromPropValue);
  }
  return null;
};
rowGap.propTypes = false ? {
  rowGap: responsivePropType_default
} : {};
rowGap.filterProps = ["rowGap"];
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

// ../../node_modules/@mui/system/esm/palette.js
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

// ../../node_modules/@mui/system/esm/positions.js
var position = style_default({
  prop: "position"
});
var zIndex = style_default({
  prop: "zIndex",
  themeKey: "zIndex"
});
var top2 = style_default({
  prop: "top"
});
var right2 = style_default({
  prop: "right"
});
var bottom2 = style_default({
  prop: "bottom"
});
var left2 = style_default({
  prop: "left"
});
var positions_default = compose_default(position, zIndex, top2, right2, bottom2, left2);

// ../../node_modules/@mui/system/esm/shadows.js
var boxShadow = style_default({
  prop: "boxShadow",
  themeKey: "shadows"
});
var shadows_default = boxShadow;

// ../../node_modules/@mui/system/esm/sizing.js
function transform(value) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}
var width = style_default({
  prop: "width",
  transform
});
var maxWidth = (props) => {
  if (props.maxWidth !== void 0 && props.maxWidth !== null) {
    const styleFromPropValue = (propValue) => {
      var _props$theme, _props$theme$breakpoi, _props$theme$breakpoi2;
      const breakpoint = ((_props$theme = props.theme) == null ? void 0 : (_props$theme$breakpoi = _props$theme.breakpoints) == null ? void 0 : (_props$theme$breakpoi2 = _props$theme$breakpoi.values) == null ? void 0 : _props$theme$breakpoi2[propValue]) || values[propValue];
      return {
        maxWidth: breakpoint || transform(propValue)
      };
    };
    return handleBreakpoints(props, props.maxWidth, styleFromPropValue);
  }
  return null;
};
maxWidth.filterProps = ["maxWidth"];
var minWidth = style_default({
  prop: "minWidth",
  transform
});
var height = style_default({
  prop: "height",
  transform
});
var maxHeight = style_default({
  prop: "maxHeight",
  transform
});
var minHeight = style_default({
  prop: "minHeight",
  transform
});
var sizeWidth = style_default({
  prop: "size",
  cssProperty: "width",
  transform
});
var sizeHeight = style_default({
  prop: "size",
  cssProperty: "height",
  transform
});
var boxSizing = style_default({
  prop: "boxSizing"
});
var sizing = compose_default(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);
var sizing_default = sizing;

// ../../node_modules/@mui/system/esm/typography.js
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
var textTransform = style_default({
  prop: "textTransform"
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
var typography = compose_default(typographyVariant, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign, textTransform);
var typography_default = typography;

// ../../node_modules/@mui/system/esm/getThemeValue.js
var filterPropsMapping = {
  borders: borders_default.filterProps,
  display: display_default.filterProps,
  flexbox: flexbox_default.filterProps,
  grid: grid_default.filterProps,
  positions: positions_default.filterProps,
  palette: palette_default.filterProps,
  shadows: shadows_default.filterProps,
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
  shadows: shadows_default,
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

// ../../node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js
function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every((object) => union.size === Object.keys(object).length);
}
function callIfFn(maybeFn, arg) {
  return typeof maybeFn === "function" ? maybeFn(arg) : maybeFn;
}
function unstable_createStyleFunctionSx(styleFunctionMapping2 = styleFunctionMapping) {
  const propToStyleFunction2 = Object.keys(styleFunctionMapping2).reduce((acc, styleFnName) => {
    styleFunctionMapping2[styleFnName].filterProps.forEach((propName) => {
      acc[propName] = styleFunctionMapping2[styleFnName];
    });
    return acc;
  }, {});
  function getThemeValue(prop, value, theme) {
    const inputProps = {
      [prop]: value,
      theme
    };
    const styleFunction = propToStyleFunction2[prop];
    return styleFunction ? styleFunction(inputProps) : {
      [prop]: value
    };
  }
  function styleFunctionSx2(props) {
    const {
      sx,
      theme = {}
    } = props || {};
    if (!sx) {
      return null;
    }
    function traverse(sxInput) {
      let sxObject = sxInput;
      if (typeof sxInput === "function") {
        sxObject = sxInput(theme);
      } else if (typeof sxInput !== "object") {
        return sxInput;
      }
      if (!sxObject) {
        return null;
      }
      const emptyBreakpoints = createEmptyBreakpointObject(theme.breakpoints);
      const breakpointsKeys = Object.keys(emptyBreakpoints);
      let css4 = emptyBreakpoints;
      Object.keys(sxObject).forEach((styleKey) => {
        const value = callIfFn(sxObject[styleKey], theme);
        if (value !== null && value !== void 0) {
          if (typeof value === "object") {
            if (propToStyleFunction2[styleKey]) {
              css4 = merge_default(css4, getThemeValue(styleKey, value, theme));
            } else {
              const breakpointsValues = handleBreakpoints({
                theme
              }, value, (x2) => ({
                [styleKey]: x2
              }));
              if (objectsHaveSameKeys(breakpointsValues, value)) {
                css4[styleKey] = styleFunctionSx2({
                  sx: value,
                  theme
                });
              } else {
                css4 = merge_default(css4, breakpointsValues);
              }
            }
          } else {
            css4 = merge_default(css4, getThemeValue(styleKey, value, theme));
          }
        }
      });
      return removeUnusedBreakpoints(breakpointsKeys, css4);
    }
    return Array.isArray(sx) ? sx.map(traverse) : traverse(sx);
  }
  return styleFunctionSx2;
}
var styleFunctionSx = unstable_createStyleFunctionSx();
styleFunctionSx.filterProps = ["sx"];
var styleFunctionSx_default = styleFunctionSx;

// ../../node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js
var _excluded21 = ["sx"];
var splitProps = (props) => {
  const result = {
    systemProps: {},
    otherProps: {}
  };
  Object.keys(props).forEach((prop) => {
    if (propToStyleFunction[prop]) {
      result.systemProps[prop] = props[prop];
    } else {
      result.otherProps[prop] = props[prop];
    }
  });
  return result;
};
function extendSxProp(props) {
  const {
    sx: inSx
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded21);
  const {
    systemProps,
    otherProps
  } = splitProps(other);
  let finalSx;
  if (Array.isArray(inSx)) {
    finalSx = [systemProps, ...inSx];
  } else if (typeof inSx === "function") {
    finalSx = (...args) => {
      const result = inSx(...args);
      if (!isPlainObject(result)) {
        return systemProps;
      }
      return _extends({}, systemProps, result);
    };
  } else {
    finalSx = _extends({}, systemProps, inSx);
  }
  return _extends({}, otherProps, {
    sx: finalSx
  });
}

// ../../node_modules/@mui/system/esm/Box/Box.js
var import_prop_types33 = __toESM(require_prop_types());

// ../../node_modules/@mui/system/esm/createBox.js
import * as React57 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/system/esm/createTheme/createBreakpoints.js
var _excluded24 = ["values", "unit", "step"];
var sortBreakpointsValues = (values3) => {
  const breakpointsAsArray = Object.keys(values3).map((key) => ({
    key,
    val: values3[key]
  })) || [];
  breakpointsAsArray.sort((breakpoint1, breakpoint2) => breakpoint1.val - breakpoint2.val);
  return breakpointsAsArray.reduce((acc, obj) => {
    return _extends({}, acc, {
      [obj.key]: obj.val
    });
  }, {});
};
function createBreakpoints(breakpoints) {
  const {
    values: values3 = {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    },
    unit = "px",
    step = 5
  } = breakpoints, other = _objectWithoutPropertiesLoose(breakpoints, _excluded24);
  const sortedValues = sortBreakpointsValues(values3);
  const keys = Object.keys(sortedValues);
  function up(key) {
    const value = typeof values3[key] === "number" ? values3[key] : key;
    return `@media (min-width:${value}${unit})`;
  }
  function down(key) {
    const value = typeof values3[key] === "number" ? values3[key] : key;
    return `@media (max-width:${value - step / 100}${unit})`;
  }
  function between(start2, end2) {
    const endIndex = keys.indexOf(end2);
    return `@media (min-width:${typeof values3[start2] === "number" ? values3[start2] : start2}${unit}) and (max-width:${(endIndex !== -1 && typeof values3[keys[endIndex]] === "number" ? values3[keys[endIndex]] : end2) - step / 100}${unit})`;
  }
  function only(key) {
    if (keys.indexOf(key) + 1 < keys.length) {
      return between(key, keys[keys.indexOf(key) + 1]);
    }
    return up(key);
  }
  function not(key) {
    const keyIndex = keys.indexOf(key);
    if (keyIndex === 0) {
      return up(keys[1]);
    }
    if (keyIndex === keys.length - 1) {
      return down(keys[keyIndex]);
    }
    return between(key, keys[keys.indexOf(key) + 1]).replace("@media", "@media not all and");
  }
  return _extends({
    keys,
    values: sortedValues,
    up,
    down,
    between,
    only,
    not,
    unit
  }, other);
}

// ../../node_modules/@mui/system/esm/createTheme/shape.js
var shape = {
  borderRadius: 4
};
var shape_default = shape;

// ../../node_modules/@mui/system/esm/createTheme/createSpacing.js
function createSpacing(spacingInput = 8) {
  if (spacingInput.mui) {
    return spacingInput;
  }
  const transform2 = createUnarySpacing({
    spacing: spacingInput
  });
  const spacing2 = (...argsInput) => {
    if (false) {
      if (!(argsInput.length <= 4)) {
        console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${argsInput.length}`);
      }
    }
    const args = argsInput.length === 0 ? [1] : argsInput;
    return args.map((argument) => {
      const output = transform2(argument);
      return typeof output === "number" ? `${output}px` : output;
    }).join(" ");
  };
  spacing2.mui = true;
  return spacing2;
}

// ../../node_modules/@mui/system/esm/createTheme/createTheme.js
var _excluded25 = ["breakpoints", "palette", "spacing", "shape"];
function createTheme(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    shape: shapeInput = {}
  } = options, other = _objectWithoutPropertiesLoose(options, _excluded25);
  const breakpoints = createBreakpoints(breakpointsInput);
  const spacing2 = createSpacing(spacingInput);
  let muiTheme = deepmerge({
    breakpoints,
    direction: "ltr",
    components: {},
    palette: _extends({
      mode: "light"
    }, paletteInput),
    spacing: spacing2,
    shape: _extends({}, shape_default, shapeInput)
  }, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  return muiTheme;
}
var createTheme_default = createTheme;

// ../../node_modules/@mui/private-theming/ThemeProvider/ThemeProvider.js
var import_prop_types32 = __toESM(require_prop_types());
import * as React56 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/private-theming/useTheme/ThemeContext.js
import * as React54 from "https://spike.land/dist/react.mjs";
var ThemeContext3 = React54.createContext(null);
if (false) {
  ThemeContext3.displayName = "ThemeContext";
}
var ThemeContext_default = ThemeContext3;

// ../../node_modules/@mui/private-theming/useTheme/useTheme.js
import * as React55 from "https://spike.land/dist/react.mjs";
function useTheme() {
  const theme = React55.useContext(ThemeContext_default);
  if (false) {
    React55.useDebugValue(theme);
  }
  return theme;
}

// ../../node_modules/@mui/private-theming/ThemeProvider/nested.js
var hasSymbol = typeof Symbol === "function" && Symbol.for;
var nested_default = hasSymbol ? Symbol.for("mui.nested") : "__THEME_NESTED__";

// ../../node_modules/@mui/private-theming/ThemeProvider/ThemeProvider.js
function mergeOuterLocalTheme(outerTheme, localTheme) {
  if (typeof localTheme === "function") {
    const mergedTheme = localTheme(outerTheme);
    if (false) {
      if (!mergedTheme) {
        console.error(["MUI: You should return an object from your theme function, i.e.", "<ThemeProvider theme={() => ({})} />"].join("\n"));
      }
    }
    return mergedTheme;
  }
  return _extends({}, outerTheme, localTheme);
}
function ThemeProvider(props) {
  const {
    children: children2,
    theme: localTheme
  } = props;
  const outerTheme = useTheme();
  if (false) {
    if (outerTheme === null && typeof localTheme === "function") {
      console.error(["MUI: You are providing a theme function prop to the ThemeProvider component:", "<ThemeProvider theme={outerTheme => outerTheme} />", "", "However, no outer theme is present.", "Make sure a theme is already injected higher in the React tree or provide a theme object."].join("\n"));
    }
  }
  const theme = React56.useMemo(() => {
    const output = outerTheme === null ? localTheme : mergeOuterLocalTheme(outerTheme, localTheme);
    if (output != null) {
      output[nested_default] = outerTheme !== null;
    }
    return output;
  }, [localTheme, outerTheme]);
  return e2(ThemeContext_default.Provider, {
    value: theme,
    children: children2
  });
}
false ? ThemeProvider.propTypes = {
  children: import_prop_types32.default.node,
  theme: import_prop_types32.default.oneOfType([import_prop_types32.default.object, import_prop_types32.default.func]).isRequired
} : void 0;
if (false) {
  false ? ThemeProvider.propTypes = exactProp(ThemeProvider.propTypes) : void 0;
}
var ThemeProvider_default = ThemeProvider;

// ../../node_modules/@mui/system/esm/useThemeWithoutDefault.js
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function useTheme2(defaultTheme4 = null) {
  const contextTheme = useTheme();
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme4 : contextTheme;
}
var useThemeWithoutDefault_default = useTheme2;

// ../../node_modules/@mui/system/esm/useTheme.js
var systemDefaultTheme = createTheme_default();
function useTheme3(defaultTheme4 = systemDefaultTheme) {
  return useThemeWithoutDefault_default(defaultTheme4);
}
var useTheme_default = useTheme3;

// ../../node_modules/@mui/system/esm/createBox.js
var _excluded26 = ["className", "component"];
function createBox(options = {}) {
  const {
    defaultTheme: defaultTheme4,
    defaultClassName = "MuiBox-root",
    generateClassName,
    styleFunctionSx: styleFunctionSx2 = styleFunctionSx_default
  } = options;
  const BoxRoot = styled("div")(styleFunctionSx2);
  const Box3 = React57.forwardRef(function Box4(inProps, ref) {
    const theme = useTheme_default(defaultTheme4);
    const _extendSxProp = extendSxProp(inProps), {
      className,
      component = "div"
    } = _extendSxProp, other = _objectWithoutPropertiesLoose(_extendSxProp, _excluded26);
    return e2(BoxRoot, _extends({
      as: component,
      ref,
      className: clsx_m_default(className, generateClassName ? generateClassName(defaultClassName) : defaultClassName),
      theme
    }, other));
  });
  return Box3;
}

// ../../node_modules/@mui/system/esm/Box/Box.js
var Box = createBox();
false ? Box.propTypes = {
  children: import_prop_types33.default.node,
  component: import_prop_types33.default.elementType,
  sx: import_prop_types33.default.oneOfType([import_prop_types33.default.arrayOf(import_prop_types33.default.oneOfType([import_prop_types33.default.func, import_prop_types33.default.object, import_prop_types33.default.bool])), import_prop_types33.default.func, import_prop_types33.default.object])
} : void 0;

// ../../node_modules/@mui/system/esm/propsToClassKey.js
var _excluded27 = ["variant"];
function isEmpty2(string) {
  return string.length === 0;
}
function propsToClassKey(props) {
  const {
    variant
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded27);
  let classKey = variant || "";
  Object.keys(other).sort().forEach((key) => {
    if (key === "color") {
      classKey += isEmpty2(classKey) ? props[key] : capitalize(props[key]);
    } else {
      classKey += `${isEmpty2(classKey) ? key : capitalize(key)}${capitalize(props[key].toString())}`;
    }
  });
  return classKey;
}

// ../../node_modules/@mui/system/esm/createStyled.js
var _excluded28 = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
var _excluded29 = ["theme"];
var _excluded32 = ["theme"];
function isEmpty3(obj) {
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
var variantsResolver = (props, styles2, theme, name) => {
  var _theme$components, _theme$components$nam;
  const {
    ownerState = {}
  } = props;
  const variantsStyles = [];
  const themeVariants = theme == null ? void 0 : (_theme$components = theme.components) == null ? void 0 : (_theme$components$nam = _theme$components[name]) == null ? void 0 : _theme$components$nam.variants;
  if (themeVariants) {
    themeVariants.forEach((themeVariant) => {
      let isMatch = true;
      Object.keys(themeVariant.props).forEach((key) => {
        if (ownerState[key] !== themeVariant.props[key] && props[key] !== themeVariant.props[key]) {
          isMatch = false;
        }
      });
      if (isMatch) {
        variantsStyles.push(styles2[propsToClassKey(themeVariant.props)]);
      }
    });
  }
  return variantsStyles;
};
function shouldForwardProp(prop) {
  return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
}
var systemDefaultTheme2 = createTheme_default();
function createStyled3(input = {}) {
  const {
    defaultTheme: defaultTheme4 = systemDefaultTheme2,
    rootShouldForwardProp: rootShouldForwardProp2 = shouldForwardProp,
    slotShouldForwardProp: slotShouldForwardProp2 = shouldForwardProp,
    styleFunctionSx: styleFunctionSx2 = styleFunctionSx_default
  } = input;
  return (tag, inputOptions = {}) => {
    const {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      skipSx: inputSkipSx,
      overridesResolver
    } = inputOptions, options = _objectWithoutPropertiesLoose(inputOptions, _excluded28);
    const skipVariantsResolver = inputSkipVariantsResolver !== void 0 ? inputSkipVariantsResolver : componentSlot && componentSlot !== "Root" || false;
    const skipSx = inputSkipSx || false;
    let label;
    if (false) {
      if (componentName) {
        label = `${componentName}-${lowercaseFirstLetter(componentSlot || "Root")}`;
      }
    }
    let shouldForwardPropOption = shouldForwardProp;
    if (componentSlot === "Root") {
      shouldForwardPropOption = rootShouldForwardProp2;
    } else if (componentSlot) {
      shouldForwardPropOption = slotShouldForwardProp2;
    }
    const defaultStyledResolver = styled(tag, _extends({
      shouldForwardProp: shouldForwardPropOption,
      label
    }, options));
    const muiStyledResolver = (styleArg, ...expressions) => {
      const expressionsWithDefaultTheme = expressions ? expressions.map((stylesArg) => {
        return typeof stylesArg === "function" && stylesArg.__emotion_real !== stylesArg ? (_ref) => {
          let {
            theme: themeInput
          } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded29);
          return stylesArg(_extends({
            theme: isEmpty3(themeInput) ? defaultTheme4 : themeInput
          }, other));
        } : stylesArg;
      }) : [];
      let transformedStyleArg = styleArg;
      if (componentName && overridesResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty3(props.theme) ? defaultTheme4 : props.theme;
          const styleOverrides = getStyleOverrides(componentName, theme);
          if (styleOverrides) {
            const resolvedStyleOverrides = {};
            Object.entries(styleOverrides).forEach(([slotKey, slotStyle]) => {
              resolvedStyleOverrides[slotKey] = typeof slotStyle === "function" ? slotStyle(props) : slotStyle;
            });
            return overridesResolver(props, resolvedStyleOverrides);
          }
          return null;
        });
      }
      if (componentName && !skipVariantsResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty3(props.theme) ? defaultTheme4 : props.theme;
          return variantsResolver(props, getVariantStyles(componentName, theme), theme, componentName);
        });
      }
      if (!skipSx) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty3(props.theme) ? defaultTheme4 : props.theme;
          return styleFunctionSx2(_extends({}, props, {
            theme
          }));
        });
      }
      const numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;
      if (Array.isArray(styleArg) && numOfCustomFnsApplied > 0) {
        const placeholders = new Array(numOfCustomFnsApplied).fill("");
        transformedStyleArg = [...styleArg, ...placeholders];
        transformedStyleArg.raw = [...styleArg.raw, ...placeholders];
      } else if (typeof styleArg === "function" && styleArg.__emotion_real !== styleArg) {
        transformedStyleArg = (_ref2) => {
          let {
            theme: themeInput
          } = _ref2, other = _objectWithoutPropertiesLoose(_ref2, _excluded32);
          return styleArg(_extends({
            theme: isEmpty3(themeInput) ? defaultTheme4 : themeInput
          }, other));
        };
      }
      const Component = defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);
      if (false) {
        let displayName;
        if (componentName) {
          displayName = `${componentName}${componentSlot || ""}`;
        }
        if (displayName === void 0) {
          displayName = `Styled(${getDisplayName(tag)})`;
        }
        Component.displayName = displayName;
      }
      return Component;
    };
    if (defaultStyledResolver.withConfig) {
      muiStyledResolver.withConfig = defaultStyledResolver.withConfig;
    }
    return muiStyledResolver;
  };
}

// ../../node_modules/@mui/system/esm/styled.js
var styled2 = createStyled3();

// ../../node_modules/@mui/system/esm/useThemeProps/getThemeProps.js
function getThemeProps(params) {
  const {
    theme,
    name,
    props
  } = params;
  if (!theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps) {
    return props;
  }
  return resolveProps(theme.components[name].defaultProps, props);
}

// ../../node_modules/@mui/system/esm/useThemeProps/useThemeProps.js
function useThemeProps({
  props,
  name,
  defaultTheme: defaultTheme4
}) {
  const theme = useTheme_default(defaultTheme4);
  const mergedProps = getThemeProps({
    theme,
    name,
    props
  });
  return mergedProps;
}

// ../../node_modules/@mui/system/esm/colorManipulator.js
function clamp2(value, min2 = 0, max2 = 1) {
  if (false) {
    if (value < min2 || value > max2) {
      console.error(`MUI: The value provided ${value} is out of range [${min2}, ${max2}].`);
    }
  }
  return Math.min(Math.max(min2, value), max2);
}
function hexToRgb(color2) {
  color2 = color2.slice(1);
  const re = new RegExp(`.{1,${color2.length >= 6 ? 2 : 1}}`, "g");
  let colors = color2.match(re);
  if (colors && colors[0].length === 1) {
    colors = colors.map((n2) => n2 + n2);
  }
  return colors ? `rgb${colors.length === 4 ? "a" : ""}(${colors.map((n2, index) => {
    return index < 3 ? parseInt(n2, 16) : Math.round(parseInt(n2, 16) / 255 * 1e3) / 1e3;
  }).join(", ")})` : "";
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
    throw new Error(false ? `MUI: Unsupported \`${color2}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : formatMuiErrorMessage(9, color2));
  }
  let values3 = color2.substring(marker + 1, color2.length - 1);
  let colorSpace;
  if (type === "color") {
    values3 = values3.split(" ");
    colorSpace = values3.shift();
    if (values3.length === 4 && values3[3].charAt(0) === "/") {
      values3[3] = values3[3].slice(1);
    }
    if (["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(colorSpace) === -1) {
      throw new Error(false ? `MUI: unsupported \`${colorSpace}\` color space.
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
var colorChannel = (color2) => {
  const decomposedColor = decomposeColor(color2);
  return decomposedColor.values.slice(0, 3).map((val, idx) => decomposedColor.type.indexOf("hsl") !== -1 && idx !== 0 ? `${val}%` : val).join(" ");
};
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
function hslToRgb(color2) {
  color2 = decomposeColor(color2);
  const {
    values: values3
  } = color2;
  const h2 = values3[0];
  const s2 = values3[1] / 100;
  const l2 = values3[2] / 100;
  const a2 = s2 * Math.min(l2, 1 - l2);
  const f2 = (n2, k2 = (n2 + h2 / 30) % 12) => l2 - a2 * Math.max(Math.min(k2 - 3, 9 - k2, 1), -1);
  let type = "rgb";
  const rgb = [Math.round(f2(0) * 255), Math.round(f2(8) * 255), Math.round(f2(4) * 255)];
  if (color2.type === "hsla") {
    type += "a";
    rgb.push(values3[3]);
  }
  return recomposeColor({
    type,
    values: rgb
  });
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
function getContrastRatio(foreground, background) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
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

// ../../node_modules/@mui/system/esm/ThemeProvider/ThemeProvider.js
var import_prop_types34 = __toESM(require_prop_types());
import * as React58 from "https://spike.land/dist/react.mjs";
function InnerThemeProvider(props) {
  const theme = useTheme_default();
  return e2(ThemeContext2.Provider, {
    value: typeof theme === "object" ? theme : {},
    children: props.children
  });
}
false ? InnerThemeProvider.propTypes = {
  children: import_prop_types34.default.node
} : void 0;
function ThemeProvider2(props) {
  const {
    children: children2,
    theme: localTheme
  } = props;
  return e2(ThemeProvider_default, {
    theme: localTheme,
    children: e2(InnerThemeProvider, {
      children: children2
    })
  });
}
false ? ThemeProvider2.propTypes = {
  children: import_prop_types34.default.node,
  theme: import_prop_types34.default.oneOfType([import_prop_types34.default.func, import_prop_types34.default.object]).isRequired
} : void 0;
if (false) {
  false ? ThemeProvider2.propTypes = exactProp(ThemeProvider2.propTypes) : void 0;
}
var ThemeProvider_default2 = ThemeProvider2;

// ../../node_modules/@mui/system/esm/cssVars/createCssVarsProvider.js
var import_prop_types35 = __toESM(require_prop_types());
import * as React61 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/system/esm/cssVars/cssVarsParser.js
var assignNestedKeys = (obj, keys, value) => {
  let temp = obj;
  keys.forEach((k2, index) => {
    if (index === keys.length - 1) {
      if (temp && typeof temp === "object") {
        temp[k2] = value;
      }
    } else if (temp && typeof temp === "object") {
      if (!temp[k2]) {
        temp[k2] = {};
      }
      temp = temp[k2];
    }
  });
};
var walkObjectDeep = (obj, callback, shouldSkipPaths) => {
  function recurse(object, parentKeys = []) {
    Object.entries(object).forEach(([key, value]) => {
      if (!shouldSkipPaths || shouldSkipPaths && !shouldSkipPaths([...parentKeys, key])) {
        if (value !== void 0 && value !== null) {
          if (typeof value === "object" && Object.keys(value).length > 0) {
            recurse(value, [...parentKeys, key]);
          } else {
            callback([...parentKeys, key], value, object);
          }
        }
      }
    });
  }
  recurse(obj);
};
var getCssValue = (keys, value) => {
  if (typeof value === "number") {
    if (["lineHeight", "fontWeight", "opacity", "zIndex"].some((prop) => keys.includes(prop))) {
      return value;
    }
    const lastKey = keys[keys.length - 1];
    if (lastKey.toLowerCase().indexOf("opacity") >= 0) {
      return value;
    }
    return `${value}px`;
  }
  return value;
};
function cssVarsParser(theme, options) {
  const {
    prefix,
    basePrefix = "",
    shouldSkipGeneratingVar
  } = options || {};
  const css4 = {};
  const vars = {};
  const parsedTheme = {};
  walkObjectDeep(theme, (keys, value) => {
    if (typeof value === "string" || typeof value === "number") {
      if (typeof value === "string" && value.match(/var\(\s*--/)) {
        if (!basePrefix && prefix) {
          value = value.replace(/var\(\s*--/g, `var(--${prefix}-`);
        } else {
          value = prefix ? value.replace(new RegExp(`var\\(\\s*--${basePrefix}`, "g"), `var(--${prefix}`) : value.replace(new RegExp(`var\\(\\s*--${basePrefix}-`, "g"), "var(--");
        }
      }
      if (!shouldSkipGeneratingVar || shouldSkipGeneratingVar && !shouldSkipGeneratingVar(keys, value)) {
        const cssVar = `--${prefix ? `${prefix}-` : ""}${keys.join("-")}`;
        Object.assign(css4, {
          [cssVar]: getCssValue(keys, value)
        });
        assignNestedKeys(vars, keys, `var(${cssVar})`);
      }
    }
    assignNestedKeys(parsedTheme, keys, value);
  }, (keys) => keys[0] === "vars");
  return {
    css: css4,
    vars,
    parsedTheme
  };
}

// ../../node_modules/@mui/system/esm/cssVars/getInitColorSchemeScript.js
import * as React59 from "https://spike.land/dist/react.mjs";
var DEFAULT_MODE_STORAGE_KEY = "mui-mode";
var DEFAULT_COLOR_SCHEME_STORAGE_KEY = "mui-color-scheme";
var DEFAULT_ATTRIBUTE = "data-mui-color-scheme";
function getInitColorSchemeScript(options) {
  const {
    enableSystem,
    defaultLightColorScheme = "light",
    defaultDarkColorScheme = "dark",
    modeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    attribute = DEFAULT_ATTRIBUTE
  } = options || {};
  return e2("script", {
    dangerouslySetInnerHTML: {
      __html: `(function() { try {
        var mode = localStorage.getItem('${modeStorageKey}');
        var colorScheme = '';
        if (mode === 'system' || (!mode && !!${enableSystem})) {
          // handle system mode
          var mql = window.matchMedia('(prefers-color-scheme: dark)');
          if (mql.matches) {
            colorScheme = localStorage.getItem('${colorSchemeStorageKey}-dark') || '${defaultDarkColorScheme}';
          } else {
            colorScheme = localStorage.getItem('${colorSchemeStorageKey}-light') || '${defaultLightColorScheme}';
          }
        }
        if (mode === 'light') {
          colorScheme = localStorage.getItem('${colorSchemeStorageKey}-light') || '${defaultLightColorScheme}';
        }
        if (mode === 'dark') {
          colorScheme = localStorage.getItem('${colorSchemeStorageKey}-dark') || '${defaultDarkColorScheme}';
        }
        if (colorScheme) {
          document.documentElement.setAttribute('${attribute}', colorScheme);
        }
      } catch (e) {} })();`
    }
  });
}

// ../../node_modules/@mui/system/esm/cssVars/useCurrentColorScheme.js
import * as React60 from "https://spike.land/dist/react.mjs";
function getSystemMode(mode) {
  if (typeof window !== "undefined" && mode === "system") {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    if (mql.matches) {
      return "dark";
    }
    return "light";
  }
  return void 0;
}
function processState(state, callback) {
  if (state.mode === "light" || state.mode === "system" && state.systemMode === "light") {
    return callback("light");
  }
  if (state.mode === "dark" || state.mode === "system" && state.systemMode === "dark") {
    return callback("dark");
  }
  return void 0;
}
function getColorScheme(state) {
  return processState(state, (mode) => {
    if (mode === "light") {
      return state.lightColorScheme;
    }
    if (mode === "dark") {
      return state.darkColorScheme;
    }
    return void 0;
  });
}
function resolveValue(key, defaultValue) {
  if (typeof window === "undefined") {
    return void 0;
  }
  let value;
  try {
    value = localStorage.getItem(key) || void 0;
  } catch (e3) {
  }
  return value || defaultValue;
}
function useCurrentColorScheme(options) {
  const {
    defaultMode = "light",
    defaultLightColorScheme,
    defaultDarkColorScheme,
    supportedColorSchemes = [],
    modeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY
  } = options;
  const joinedColorSchemes = supportedColorSchemes.join(",");
  const [state, setState] = React60.useState(() => {
    const initialMode = resolveValue(modeStorageKey, defaultMode);
    return {
      mode: initialMode,
      systemMode: getSystemMode(initialMode),
      lightColorScheme: resolveValue(`${colorSchemeStorageKey}-light`) || defaultLightColorScheme,
      darkColorScheme: resolveValue(`${colorSchemeStorageKey}-dark`) || defaultDarkColorScheme
    };
  });
  const colorScheme = getColorScheme(state);
  const setMode = React60.useCallback((mode) => {
    setState((currentState) => {
      const newMode = !mode ? defaultMode : mode;
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(modeStorageKey, newMode);
      }
      return _extends({}, currentState, {
        mode: newMode,
        systemMode: getSystemMode(newMode)
      });
    });
  }, [modeStorageKey, defaultMode]);
  const setColorScheme = React60.useCallback((value) => {
    if (!value || typeof value === "string") {
      if (value && !supportedColorSchemes.includes(value)) {
        console.error(`\`${value}\` does not exist in \`theme.colorSchemes\`.`);
      } else {
        setState((currentState) => {
          const newState = _extends({}, currentState);
          if (!value) {
            newState.lightColorScheme = defaultLightColorScheme;
            newState.darkColorScheme = defaultDarkColorScheme;
            return newState;
          }
          processState(currentState, (mode) => {
            localStorage.setItem(`${colorSchemeStorageKey}-${mode}`, value);
            if (mode === "light") {
              newState.lightColorScheme = value;
            }
            if (mode === "dark") {
              newState.darkColorScheme = value;
            }
          });
          return newState;
        });
      }
    } else if (value.light && !supportedColorSchemes.includes(value.light) || value.dark && !supportedColorSchemes.includes(value.dark)) {
      console.error(`\`${value}\` does not exist in \`theme.colorSchemes\`.`);
    } else {
      setState((currentState) => {
        const newState = _extends({}, currentState);
        if (value.light || value.light === null) {
          newState.lightColorScheme = value.light === null ? defaultLightColorScheme : value.light;
        }
        if (value.dark || value.dark === null) {
          newState.darkColorScheme = value.dark === null ? defaultDarkColorScheme : value.dark;
        }
        return newState;
      });
      if (value.light) {
        localStorage.setItem(`${colorSchemeStorageKey}-light`, value.light);
      }
      if (value.dark) {
        localStorage.setItem(`${colorSchemeStorageKey}-dark`, value.dark);
      }
    }
  }, [colorSchemeStorageKey, supportedColorSchemes, defaultLightColorScheme, defaultDarkColorScheme]);
  const handleMediaQuery = React60.useCallback((e3) => {
    if (state.mode === "system") {
      setState((currentState) => _extends({}, currentState, {
        systemMode: e3.matches ? "dark" : "light"
      }));
    }
  }, [state.mode]);
  const mediaListener = React60.useRef(handleMediaQuery);
  mediaListener.current = handleMediaQuery;
  React60.useEffect(() => {
    const handler = (...args) => mediaListener.current(...args);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addListener(handler);
    handler(media);
    return () => media.removeListener(handler);
  }, []);
  React60.useEffect(() => {
    if (state.mode) {
      localStorage.setItem(modeStorageKey, state.mode);
    }
    processState(state, (mode) => {
      if (mode === "light") {
        localStorage.setItem(`${colorSchemeStorageKey}-light`, state.lightColorScheme);
      }
      if (mode === "dark") {
        localStorage.setItem(`${colorSchemeStorageKey}-dark`, state.darkColorScheme);
      }
    });
  }, [state, colorSchemeStorageKey, modeStorageKey]);
  React60.useEffect(() => {
    const handleStorage = (event) => {
      const value = event.newValue;
      if (typeof event.key === "string" && event.key.startsWith(colorSchemeStorageKey) && (!value || joinedColorSchemes.match(value))) {
        if (event.key.endsWith("light")) {
          setColorScheme({
            light: value
          });
        }
        if (event.key.endsWith("dark")) {
          setColorScheme({
            dark: value
          });
        }
      }
      if (event.key === modeStorageKey && (!value || ["light", "dark", "system"].includes(value))) {
        setMode(value || defaultMode);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [setColorScheme, setMode, modeStorageKey, colorSchemeStorageKey, joinedColorSchemes, defaultMode]);
  return _extends({}, state, {
    colorScheme,
    setMode,
    setColorScheme
  });
}

// ../../node_modules/@mui/system/esm/cssVars/createGetCssVar.js
function createGetCssVar(prefix = "") {
  function appendVar(...vars) {
    if (!vars.length) {
      return "";
    }
    const value = vars[0];
    if (typeof value === "string" && !value.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))/)) {
      return `, var(--${prefix ? `${prefix}-` : ""}${value}${appendVar(...vars.slice(1))})`;
    }
    return `, ${value}`;
  }
  const getCssVar = (field, ...vars) => {
    return `var(--${prefix ? `${prefix}-` : ""}${field}${appendVar(...vars)})`;
  };
  return getCssVar;
}

// ../../node_modules/@mui/system/esm/cssVars/createCssVarsProvider.js
var _excluded30 = ["colorSchemes"];
var _excluded210 = ["colorSchemes"];
var _excluded33 = ["components"];
var DISABLE_CSS_TRANSITION = "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
function createCssVarsProvider(options) {
  var _baseTheme$breakpoint;
  const {
    theme: baseTheme = {},
    defaultMode: desisgnSystemMode = "light",
    defaultColorScheme: designSystemColorScheme,
    disableTransitionOnChange: designSystemTransitionOnChange = false,
    enableColorScheme: designSystemEnableColorScheme = true,
    prefix: designSystemPrefix = "",
    shouldSkipGeneratingVar,
    resolveTheme
  } = options;
  const systemSpacing = createSpacing(baseTheme.spacing);
  const systemBreakpoints = createBreakpoints((_baseTheme$breakpoint = baseTheme.breakpoints) != null ? _baseTheme$breakpoint : {});
  if (!baseTheme.colorSchemes || typeof designSystemColorScheme === "string" && !baseTheme.colorSchemes[designSystemColorScheme] || typeof designSystemColorScheme === "object" && !baseTheme.colorSchemes[designSystemColorScheme == null ? void 0 : designSystemColorScheme.light] || typeof designSystemColorScheme === "object" && !baseTheme.colorSchemes[designSystemColorScheme == null ? void 0 : designSystemColorScheme.dark]) {
    console.error(`MUI: \`${designSystemColorScheme}\` does not exist in \`theme.colorSchemes\`.`);
  }
  const ColorSchemeContext = React61.createContext(void 0);
  const useColorScheme2 = () => {
    const value = React61.useContext(ColorSchemeContext);
    if (!value) {
      throw new Error(false ? `MUI: \`useColorScheme\` must be called under <CssVarsProvider />` : formatMuiErrorMessage(19));
    }
    return value;
  };
  function CssVarsProvider({
    children: children2,
    theme: themeProp = {},
    prefix = designSystemPrefix,
    modeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    attribute = DEFAULT_ATTRIBUTE,
    defaultMode = desisgnSystemMode,
    defaultColorScheme = designSystemColorScheme,
    disableTransitionOnChange = designSystemTransitionOnChange,
    enableColorScheme = designSystemEnableColorScheme
  }) {
    const {
      colorSchemes: baseColorSchemes = {}
    } = baseTheme, restBaseTheme = _objectWithoutPropertiesLoose(baseTheme, _excluded30);
    const {
      colorSchemes: colorSchemesProp = {}
    } = themeProp, restThemeProp = _objectWithoutPropertiesLoose(themeProp, _excluded210);
    const hasMounted = React61.useRef(false);
    let _deepmerge = deepmerge(restBaseTheme, restThemeProp), {
      components = {}
    } = _deepmerge, mergedTheme = _objectWithoutPropertiesLoose(_deepmerge, _excluded33);
    const colorSchemes = deepmerge(baseColorSchemes, colorSchemesProp);
    const allColorSchemes = Object.keys(colorSchemes);
    const defaultLightColorScheme = typeof defaultColorScheme === "string" ? defaultColorScheme : defaultColorScheme.light;
    const defaultDarkColorScheme = typeof defaultColorScheme === "string" ? defaultColorScheme : defaultColorScheme.dark;
    const {
      mode,
      setMode,
      systemMode,
      lightColorScheme,
      darkColorScheme,
      colorScheme,
      setColorScheme
    } = useCurrentColorScheme({
      supportedColorSchemes: allColorSchemes,
      defaultLightColorScheme,
      defaultDarkColorScheme,
      modeStorageKey,
      defaultMode
    });
    const resolvedColorScheme = (() => {
      if (!colorScheme) {
        if (defaultMode === "dark") {
          return defaultDarkColorScheme;
        }
        return defaultLightColorScheme;
      }
      return colorScheme;
    })();
    const {
      css: rootCss,
      vars: rootVars,
      parsedTheme
    } = cssVarsParser(mergedTheme, {
      prefix,
      basePrefix: designSystemPrefix,
      shouldSkipGeneratingVar
    });
    mergedTheme = _extends({}, parsedTheme, {
      components,
      colorSchemes,
      prefix,
      vars: rootVars,
      spacing: themeProp.spacing ? createSpacing(themeProp.spacing) : systemSpacing,
      breakpoints: themeProp.breakpoints ? createBreakpoints(themeProp.breakpoints) : systemBreakpoints,
      getCssVar: createGetCssVar(prefix)
    });
    const styleSheet = {};
    Object.entries(colorSchemes).forEach(([key, scheme]) => {
      const {
        css: css4,
        vars,
        parsedTheme: parsedScheme
      } = cssVarsParser(scheme, {
        prefix,
        basePrefix: designSystemPrefix,
        shouldSkipGeneratingVar
      });
      mergedTheme.vars = deepmerge(mergedTheme.vars, vars);
      if (key === resolvedColorScheme) {
        mergedTheme = _extends({}, mergedTheme, parsedScheme);
      }
      const resolvedDefaultColorScheme = (() => {
        if (typeof defaultColorScheme === "string") {
          return defaultColorScheme;
        }
        if (defaultMode === "dark") {
          return defaultColorScheme.dark;
        }
        return defaultColorScheme.light;
      })();
      if (key === resolvedDefaultColorScheme) {
        styleSheet[":root"] = css4;
      } else {
        styleSheet[`[${attribute}="${key}"]`] = css4;
      }
    });
    React61.useEffect(() => {
      if (colorScheme) {
        document.documentElement.setAttribute(attribute, colorScheme);
      }
    }, [colorScheme, attribute]);
    useEnhancedEffect_default(() => {
      if (!mode || !enableColorScheme) {
        return void 0;
      }
      const priorColorScheme = document.documentElement.style.getPropertyValue("color-scheme");
      if (mode === "system") {
        document.documentElement.style.setProperty("color-scheme", systemMode);
      } else {
        document.documentElement.style.setProperty("color-scheme", mode);
      }
      return () => {
        document.documentElement.style.setProperty("color-scheme", priorColorScheme);
      };
    }, [mode, systemMode, enableColorScheme]);
    React61.useEffect(() => {
      let timer;
      if (disableTransitionOnChange && hasMounted.current) {
        const css4 = document.createElement("style");
        css4.appendChild(document.createTextNode(DISABLE_CSS_TRANSITION));
        document.head.appendChild(css4);
        (() => window.getComputedStyle(document.body))();
        timer = setTimeout(() => {
          document.head.removeChild(css4);
        }, 1);
      }
      return () => {
        clearTimeout(timer);
      };
    }, [colorScheme, disableTransitionOnChange]);
    React61.useEffect(() => {
      hasMounted.current = true;
      return () => {
        hasMounted.current = false;
      };
    }, []);
    return e2(ColorSchemeContext.Provider, {
      value: {
        mode,
        setMode,
        lightColorScheme,
        darkColorScheme,
        colorScheme,
        setColorScheme,
        allColorSchemes
      },
      children: [e2(GlobalStyles, {
        styles: {
          ":root": rootCss
        }
      }), e2(GlobalStyles, {
        styles: styleSheet
      }), e2(ThemeProvider_default2, {
        theme: resolveTheme ? resolveTheme(mergedTheme) : mergedTheme,
        children: children2
      })]
    });
  }
  false ? CssVarsProvider.propTypes = {
    attribute: import_prop_types35.default.string,
    children: import_prop_types35.default.node,
    defaultColorScheme: import_prop_types35.default.oneOfType([import_prop_types35.default.string, import_prop_types35.default.object]),
    defaultMode: import_prop_types35.default.string,
    disableTransitionOnChange: import_prop_types35.default.bool,
    enableColorScheme: import_prop_types35.default.bool,
    modeStorageKey: import_prop_types35.default.string,
    prefix: import_prop_types35.default.string,
    theme: import_prop_types35.default.object
  } : void 0;
  return {
    CssVarsProvider,
    useColorScheme: useColorScheme2,
    getInitColorSchemeScript
  };
}

// ../../node_modules/@mui/material/styles/createMixins.js
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

// ../../node_modules/@mui/material/colors/common.js
var common = {
  black: "#000",
  white: "#fff"
};
var common_default = common;

// ../../node_modules/@mui/material/colors/grey.js
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
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161"
};
var grey_default = grey;

// ../../node_modules/@mui/material/colors/purple.js
var purple = {
  50: "#f3e5f5",
  100: "#e1bee7",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  600: "#8e24aa",
  700: "#7b1fa2",
  800: "#6a1b9a",
  900: "#4a148c",
  A100: "#ea80fc",
  A200: "#e040fb",
  A400: "#d500f9",
  A700: "#aa00ff"
};
var purple_default = purple;

// ../../node_modules/@mui/material/colors/red.js
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

// ../../node_modules/@mui/material/colors/orange.js
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

// ../../node_modules/@mui/material/colors/blue.js
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

// ../../node_modules/@mui/material/colors/lightBlue.js
var lightBlue = {
  50: "#e1f5fe",
  100: "#b3e5fc",
  200: "#81d4fa",
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  600: "#039be5",
  700: "#0288d1",
  800: "#0277bd",
  900: "#01579b",
  A100: "#80d8ff",
  A200: "#40c4ff",
  A400: "#00b0ff",
  A700: "#0091ea"
};
var lightBlue_default = lightBlue;

// ../../node_modules/@mui/material/colors/green.js
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

// ../../node_modules/@mui/material/styles/createPalette.js
var _excluded31 = ["mode", "contrastThreshold", "tonalOffset"];
var light = {
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.6)",
    disabled: "rgba(0, 0, 0, 0.38)"
  },
  divider: "rgba(0, 0, 0, 0.12)",
  background: {
    paper: common_default.white,
    default: common_default.white
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
    paper: "#121212",
    default: "#121212"
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
function getDefaultPrimary(mode = "light") {
  if (mode === "dark") {
    return {
      main: blue_default[200],
      light: blue_default[50],
      dark: blue_default[400]
    };
  }
  return {
    main: blue_default[700],
    light: blue_default[400],
    dark: blue_default[800]
  };
}
function getDefaultSecondary(mode = "light") {
  if (mode === "dark") {
    return {
      main: purple_default[200],
      light: purple_default[50],
      dark: purple_default[400]
    };
  }
  return {
    main: purple_default[500],
    light: purple_default[300],
    dark: purple_default[700]
  };
}
function getDefaultError(mode = "light") {
  if (mode === "dark") {
    return {
      main: red_default[500],
      light: red_default[300],
      dark: red_default[700]
    };
  }
  return {
    main: red_default[700],
    light: red_default[400],
    dark: red_default[800]
  };
}
function getDefaultInfo(mode = "light") {
  if (mode === "dark") {
    return {
      main: lightBlue_default[400],
      light: lightBlue_default[300],
      dark: lightBlue_default[700]
    };
  }
  return {
    main: lightBlue_default[700],
    light: lightBlue_default[500],
    dark: lightBlue_default[900]
  };
}
function getDefaultSuccess(mode = "light") {
  if (mode === "dark") {
    return {
      main: green_default[400],
      light: green_default[300],
      dark: green_default[700]
    };
  }
  return {
    main: green_default[800],
    light: green_default[500],
    dark: green_default[900]
  };
}
function getDefaultWarning(mode = "light") {
  if (mode === "dark") {
    return {
      main: orange_default[400],
      light: orange_default[300],
      dark: orange_default[700]
    };
  }
  return {
    main: "#ed6c02",
    light: orange_default[500],
    dark: orange_default[900]
  };
}
function createPalette(palette2) {
  const {
    mode = "light",
    contrastThreshold = 3,
    tonalOffset = 0.2
  } = palette2, other = _objectWithoutPropertiesLoose(palette2, _excluded31);
  const primary = palette2.primary || getDefaultPrimary(mode);
  const secondary = palette2.secondary || getDefaultSecondary(mode);
  const error = palette2.error || getDefaultError(mode);
  const info = palette2.info || getDefaultInfo(mode);
  const success = palette2.success || getDefaultSuccess(mode);
  const warning = palette2.warning || getDefaultWarning(mode);
  function getContrastText(background) {
    const contrastText = getContrastRatio(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;
    if (false) {
      const contrast = getContrastRatio(background, contrastText);
      if (contrast < 3) {
        console.error([`MUI: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join("\n"));
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
      throw new Error(false ? `MUI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${mainShade}\` property.` : formatMuiErrorMessage(11, name ? ` (${name})` : "", mainShade));
    }
    if (typeof color2.main !== "string") {
      throw new Error(false ? `MUI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(color2.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
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
  const modes2 = {
    dark,
    light
  };
  if (false) {
    if (!modes2[mode]) {
      console.error(`MUI: The palette mode \`${mode}\` is not supported.`);
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
      name: "success"
    }),
    grey: grey_default,
    contrastThreshold,
    getContrastText,
    augmentColor,
    tonalOffset
  }, modes2[mode]), other);
  return paletteOutput;
}

// ../../node_modules/@mui/material/styles/createTypography.js
var _excluded34 = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function round2(value) {
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
  } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded34);
  if (false) {
    if (typeof fontSize2 !== "number") {
      console.error("MUI: `fontSize` is required to be a number.");
    }
    if (typeof htmlFontSize !== "number") {
      console.error("MUI: `htmlFontSize` is required to be a number.");
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
    letterSpacing: `${round2(letterSpacing2 / size)}em`
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

// ../../node_modules/@mui/material/styles/shadows.js
var shadowKeyUmbraOpacity = 0.2;
var shadowKeyPenumbraOpacity = 0.14;
var shadowAmbientShadowOpacity = 0.12;
function createShadow(...px) {
  return [`${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`, `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`, `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`].join(",");
}
var shadows = ["none", createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)];
var shadows_default2 = shadows;

// ../../node_modules/@mui/material/styles/createTransitions.js
var _excluded35 = ["duration", "easing", "delay"];
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
function getAutoHeightDuration(height2) {
  if (!height2) {
    return 0;
  }
  const constant = height2 / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}
function createTransitions(inputTransitions) {
  const mergedEasing = _extends({}, easing, inputTransitions.easing);
  const mergedDuration = _extends({}, duration, inputTransitions.duration);
  const create = (props = ["all"], options = {}) => {
    const {
      duration: durationOption = mergedDuration.standard,
      easing: easingOption = mergedEasing.easeInOut,
      delay = 0
    } = options, other = _objectWithoutPropertiesLoose(options, _excluded35);
    if (false) {
      const isString = (value) => typeof value === "string";
      const isNumber = (value) => !isNaN(parseFloat(value));
      if (!isString(props) && !Array.isArray(props)) {
        console.error('MUI: Argument "props" must be a string or Array.');
      }
      if (!isNumber(durationOption) && !isString(durationOption)) {
        console.error(`MUI: Argument "duration" must be a number or a string but found ${durationOption}.`);
      }
      if (!isString(easingOption)) {
        console.error('MUI: Argument "easing" must be a string.');
      }
      if (!isNumber(delay) && !isString(delay)) {
        console.error('MUI: Argument "delay" must be a number or a string.');
      }
      if (Object.keys(other).length !== 0) {
        console.error(`MUI: Unrecognized argument(s) [${Object.keys(other).join(",")}].`);
      }
    }
    return (Array.isArray(props) ? props : [props]).map((animatedProp) => `${animatedProp} ${typeof durationOption === "string" ? durationOption : formatMs(durationOption)} ${easingOption} ${typeof delay === "string" ? delay : formatMs(delay)}`).join(",");
  };
  return _extends({
    getAutoHeightDuration,
    create
  }, inputTransitions, {
    easing: mergedEasing,
    duration: mergedDuration
  });
}

// ../../node_modules/@mui/material/styles/zIndex.js
var zIndex2 = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
var zIndex_default = zIndex2;

// ../../node_modules/@mui/material/styles/createTheme.js
var _excluded36 = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function createTheme2(options = {}, ...args) {
  const {
    mixins: mixinsInput = {},
    palette: paletteInput = {},
    transitions: transitionsInput = {},
    typography: typographyInput = {}
  } = options, other = _objectWithoutPropertiesLoose(options, _excluded36);
  const palette2 = createPalette(paletteInput);
  const systemTheme = createTheme_default(options);
  let muiTheme = deepmerge(systemTheme, {
    mixins: createMixins(systemTheme.breakpoints, systemTheme.spacing, mixinsInput),
    palette: palette2,
    shadows: shadows_default2.slice(),
    typography: createTypography(palette2, typographyInput),
    transitions: createTransitions(transitionsInput),
    zIndex: _extends({}, zIndex_default)
  });
  muiTheme = deepmerge(muiTheme, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  if (false) {
    const stateClasses = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"];
    const traverse = (node, component) => {
      let key;
      for (key in node) {
        const child = node[key];
        if (stateClasses.indexOf(key) !== -1 && Object.keys(child).length > 0) {
          if (false) {
            const stateClass = generateUtilityClass("", key);
            console.error([`MUI: The \`${component}\` component increases the CSS specificity of the \`${key}\` internal state.`, "You can not override it like this: ", JSON.stringify(node, null, 2), "", `Instead, you need to use the '&.${stateClass}' syntax:`, JSON.stringify({
              root: {
                [`&.${stateClass}`]: child
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join("\n"));
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
var createTheme_default2 = createTheme2;

// ../../node_modules/@mui/material/styles/defaultTheme.js
var defaultTheme = createTheme_default2();
var defaultTheme_default = defaultTheme;

// ../../node_modules/@mui/material/styles/styled.js
var rootShouldForwardProp = (prop) => shouldForwardProp(prop) && prop !== "classes";
var slotShouldForwardProp = shouldForwardProp;
var styled3 = createStyled3({
  defaultTheme: defaultTheme_default,
  rootShouldForwardProp
});
var styled_default2 = styled3;

// ../../node_modules/@mui/material/styles/useThemeProps.js
function useThemeProps2({
  props,
  name
}) {
  return useThemeProps({
    props,
    name,
    defaultTheme: defaultTheme_default
  });
}

// ../../node_modules/@mui/material/utils/useForkRef.js
var useForkRef_default = useForkRef;

// ../../node_modules/@mui/material/utils/useEventCallback.js
var useEventCallback_default = useEventCallback;

// ../../node_modules/@mui/material/utils/useIsFocusVisible.js
var useIsFocusVisible_default = useIsFocusVisible;

// ../../node_modules/@mui/material/ButtonBase/TouchRipple.js
var import_prop_types43 = __toESM(require_prop_types());
import * as React69 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o4, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o5, p2) {
    o5.__proto__ = p2;
    return o5;
  };
  return _setPrototypeOf(o4, p);
}

// ../../node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}

// ../../node_modules/react-transition-group/esm/CSSTransition.js
var import_prop_types38 = __toESM(require_prop_types());

// ../../node_modules/dom-helpers/esm/hasClass.js
function hasClass(element, className) {
  if (element.classList)
    return !!className && element.classList.contains(className);
  return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}

// ../../node_modules/dom-helpers/esm/addClass.js
function addClass(element, className) {
  if (element.classList)
    element.classList.add(className);
  else if (!hasClass(element, className))
    if (typeof element.className === "string")
      element.className = element.className + " " + className;
    else
      element.setAttribute("class", (element.className && element.className.baseVal || "") + " " + className);
}

// ../../node_modules/dom-helpers/esm/removeClass.js
function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "");
}
function removeClass(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else if (typeof element.className === "string") {
    element.className = replaceClassName(element.className, className);
  } else {
    element.setAttribute("class", replaceClassName(element.className && element.className.baseVal || "", className));
  }
}

// ../../node_modules/react-transition-group/esm/CSSTransition.js
import React64 from "https://spike.land/dist/react.mjs";

// ../../node_modules/react-transition-group/esm/Transition.js
var import_prop_types37 = __toESM(require_prop_types());
import React63 from "https://spike.land/dist/react.mjs";
import ReactDOM2 from "https://spike.land/dist/react.mjs";

// ../../node_modules/react-transition-group/esm/config.js
var config_default = {
  disabled: false
};

// ../../node_modules/react-transition-group/esm/utils/PropTypes.js
var import_prop_types36 = __toESM(require_prop_types());
var timeoutsShape = false ? import_prop_types36.default.oneOfType([import_prop_types36.default.number, import_prop_types36.default.shape({
  enter: import_prop_types36.default.number,
  exit: import_prop_types36.default.number,
  appear: import_prop_types36.default.number
}).isRequired]) : null;
var classNamesShape = false ? import_prop_types36.default.oneOfType([import_prop_types36.default.string, import_prop_types36.default.shape({
  enter: import_prop_types36.default.string,
  exit: import_prop_types36.default.string,
  active: import_prop_types36.default.string
}), import_prop_types36.default.shape({
  enter: import_prop_types36.default.string,
  enterDone: import_prop_types36.default.string,
  enterActive: import_prop_types36.default.string,
  exit: import_prop_types36.default.string,
  exitDone: import_prop_types36.default.string,
  exitActive: import_prop_types36.default.string
})]) : null;

// ../../node_modules/react-transition-group/esm/TransitionGroupContext.js
import React62 from "https://spike.land/dist/react.mjs";
var TransitionGroupContext_default = React62.createContext(null);

// ../../node_modules/react-transition-group/esm/Transition.js
var UNMOUNTED = "unmounted";
var EXITED = "exited";
var ENTERING = "entering";
var ENTERED = "entered";
var EXITING = "exiting";
var Transition = function(_React$Component) {
  _inheritsLoose(Transition2, _React$Component);
  function Transition2(props, context) {
    var _this;
    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context;
    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;
    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }
    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }
  Transition2.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;
    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }
    return null;
  };
  var _proto = Transition2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;
    if (prevProps !== this.props) {
      var status = this.state.status;
      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }
    this.updateStatus(false, nextStatus);
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };
  _proto.getTimeouts = function getTimeouts() {
    var timeout2 = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout2;
    if (timeout2 != null && typeof timeout2 !== "number") {
      exit = timeout2.exit;
      enter = timeout2.enter;
      appear = timeout2.appear !== void 0 ? timeout2.appear : enter;
    }
    return {
      exit,
      enter,
      appear
    };
  };
  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }
    if (nextStatus !== null) {
      this.cancelNextCallback();
      if (nextStatus === ENTERING) {
        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };
  _proto.performEnter = function performEnter(mounting) {
    var _this2 = this;
    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;
    var _ref2 = this.props.nodeRef ? [appearing] : [ReactDOM2.findDOMNode(this), appearing], maybeNode = _ref2[0], maybeAppearing = _ref2[1];
    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter;
    if (!mounting && !enter || config_default.disabled) {
      this.safeSetState({
        status: ENTERED
      }, function() {
        _this2.props.onEntered(maybeNode);
      });
      return;
    }
    this.props.onEnter(maybeNode, maybeAppearing);
    this.safeSetState({
      status: ENTERING
    }, function() {
      _this2.props.onEntering(maybeNode, maybeAppearing);
      _this2.onTransitionEnd(enterTimeout, function() {
        _this2.safeSetState({
          status: ENTERED
        }, function() {
          _this2.props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };
  _proto.performExit = function performExit() {
    var _this3 = this;
    var exit = this.props.exit;
    var timeouts = this.getTimeouts();
    var maybeNode = this.props.nodeRef ? void 0 : ReactDOM2.findDOMNode(this);
    if (!exit || config_default.disabled) {
      this.safeSetState({
        status: EXITED
      }, function() {
        _this3.props.onExited(maybeNode);
      });
      return;
    }
    this.props.onExit(maybeNode);
    this.safeSetState({
      status: EXITING
    }, function() {
      _this3.props.onExiting(maybeNode);
      _this3.onTransitionEnd(timeouts.exit, function() {
        _this3.safeSetState({
          status: EXITED
        }, function() {
          _this3.props.onExited(maybeNode);
        });
      });
    });
  };
  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };
  _proto.safeSetState = function safeSetState(nextState, callback) {
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };
  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;
    var active = true;
    this.nextCallback = function(event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };
    this.nextCallback.cancel = function() {
      active = false;
    };
    return this.nextCallback;
  };
  _proto.onTransitionEnd = function onTransitionEnd(timeout2, handler) {
    this.setNextCallback(handler);
    var node = this.props.nodeRef ? this.props.nodeRef.current : ReactDOM2.findDOMNode(this);
    var doesNotHaveTimeoutOrListener = timeout2 == null && !this.props.addEndListener;
    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback], maybeNode = _ref3[0], maybeNextCallback = _ref3[1];
      this.props.addEndListener(maybeNode, maybeNextCallback);
    }
    if (timeout2 != null) {
      setTimeout(this.nextCallback, timeout2);
    }
  };
  _proto.render = function render() {
    var status = this.state.status;
    if (status === UNMOUNTED) {
      return null;
    }
    var _this$props = this.props, children2 = _this$props.children, _in = _this$props.in, _mountOnEnter = _this$props.mountOnEnter, _unmountOnExit = _this$props.unmountOnExit, _appear = _this$props.appear, _enter = _this$props.enter, _exit = _this$props.exit, _timeout = _this$props.timeout, _addEndListener = _this$props.addEndListener, _onEnter = _this$props.onEnter, _onEntering = _this$props.onEntering, _onEntered = _this$props.onEntered, _onExit = _this$props.onExit, _onExiting = _this$props.onExiting, _onExited = _this$props.onExited, _nodeRef = _this$props.nodeRef, childProps = _objectWithoutPropertiesLoose(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return React63.createElement(TransitionGroupContext_default.Provider, {
      value: null
    }, typeof children2 === "function" ? children2(status, childProps) : React63.cloneElement(React63.Children.only(children2), childProps));
  };
  return Transition2;
}(React63.Component);
Transition.contextType = TransitionGroupContext_default;
Transition.propTypes = false ? {
  nodeRef: import_prop_types37.default.shape({
    current: typeof Element === "undefined" ? import_prop_types37.default.any : function(propValue, key, componentName, location, propFullName, secret) {
      var value = propValue[key];
      return import_prop_types37.default.instanceOf(value && "ownerDocument" in value ? value.ownerDocument.defaultView.Element : Element)(propValue, key, componentName, location, propFullName, secret);
    }
  }),
  children: import_prop_types37.default.oneOfType([import_prop_types37.default.func.isRequired, import_prop_types37.default.element.isRequired]).isRequired,
  in: import_prop_types37.default.bool,
  mountOnEnter: import_prop_types37.default.bool,
  unmountOnExit: import_prop_types37.default.bool,
  appear: import_prop_types37.default.bool,
  enter: import_prop_types37.default.bool,
  exit: import_prop_types37.default.bool,
  timeout: function timeout(props) {
    var pt = timeoutsShape;
    if (!props.addEndListener)
      pt = pt.isRequired;
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return pt.apply(void 0, [props].concat(args));
  },
  addEndListener: import_prop_types37.default.func,
  onEnter: import_prop_types37.default.func,
  onEntering: import_prop_types37.default.func,
  onEntered: import_prop_types37.default.func,
  onExit: import_prop_types37.default.func,
  onExiting: import_prop_types37.default.func,
  onExited: import_prop_types37.default.func
} : {};
function noop() {
}
Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
var Transition_default = Transition;

// ../../node_modules/react-transition-group/esm/CSSTransition.js
var _addClass = function addClass2(node, classes) {
  return node && classes && classes.split(" ").forEach(function(c2) {
    return addClass(node, c2);
  });
};
var removeClass2 = function removeClass3(node, classes) {
  return node && classes && classes.split(" ").forEach(function(c2) {
    return removeClass(node, c2);
  });
};
var CSSTransition = function(_React$Component) {
  _inheritsLoose(CSSTransition2, _React$Component);
  function CSSTransition2() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.appliedClasses = {
      appear: {},
      enter: {},
      exit: {}
    };
    _this.onEnter = function(maybeNode, maybeAppearing) {
      var _this$resolveArgument = _this.resolveArguments(maybeNode, maybeAppearing), node = _this$resolveArgument[0], appearing = _this$resolveArgument[1];
      _this.removeClasses(node, "exit");
      _this.addClass(node, appearing ? "appear" : "enter", "base");
      if (_this.props.onEnter) {
        _this.props.onEnter(maybeNode, maybeAppearing);
      }
    };
    _this.onEntering = function(maybeNode, maybeAppearing) {
      var _this$resolveArgument2 = _this.resolveArguments(maybeNode, maybeAppearing), node = _this$resolveArgument2[0], appearing = _this$resolveArgument2[1];
      var type = appearing ? "appear" : "enter";
      _this.addClass(node, type, "active");
      if (_this.props.onEntering) {
        _this.props.onEntering(maybeNode, maybeAppearing);
      }
    };
    _this.onEntered = function(maybeNode, maybeAppearing) {
      var _this$resolveArgument3 = _this.resolveArguments(maybeNode, maybeAppearing), node = _this$resolveArgument3[0], appearing = _this$resolveArgument3[1];
      var type = appearing ? "appear" : "enter";
      _this.removeClasses(node, type);
      _this.addClass(node, type, "done");
      if (_this.props.onEntered) {
        _this.props.onEntered(maybeNode, maybeAppearing);
      }
    };
    _this.onExit = function(maybeNode) {
      var _this$resolveArgument4 = _this.resolveArguments(maybeNode), node = _this$resolveArgument4[0];
      _this.removeClasses(node, "appear");
      _this.removeClasses(node, "enter");
      _this.addClass(node, "exit", "base");
      if (_this.props.onExit) {
        _this.props.onExit(maybeNode);
      }
    };
    _this.onExiting = function(maybeNode) {
      var _this$resolveArgument5 = _this.resolveArguments(maybeNode), node = _this$resolveArgument5[0];
      _this.addClass(node, "exit", "active");
      if (_this.props.onExiting) {
        _this.props.onExiting(maybeNode);
      }
    };
    _this.onExited = function(maybeNode) {
      var _this$resolveArgument6 = _this.resolveArguments(maybeNode), node = _this$resolveArgument6[0];
      _this.removeClasses(node, "exit");
      _this.addClass(node, "exit", "done");
      if (_this.props.onExited) {
        _this.props.onExited(maybeNode);
      }
    };
    _this.resolveArguments = function(maybeNode, maybeAppearing) {
      return _this.props.nodeRef ? [_this.props.nodeRef.current, maybeNode] : [maybeNode, maybeAppearing];
    };
    _this.getClassNames = function(type) {
      var classNames = _this.props.classNames;
      var isStringClassNames = typeof classNames === "string";
      var prefix = isStringClassNames && classNames ? classNames + "-" : "";
      var baseClassName = isStringClassNames ? "" + prefix + type : classNames[type];
      var activeClassName = isStringClassNames ? baseClassName + "-active" : classNames[type + "Active"];
      var doneClassName = isStringClassNames ? baseClassName + "-done" : classNames[type + "Done"];
      return {
        baseClassName,
        activeClassName,
        doneClassName
      };
    };
    return _this;
  }
  var _proto = CSSTransition2.prototype;
  _proto.addClass = function addClass3(node, type, phase) {
    var className = this.getClassNames(type)[phase + "ClassName"];
    var _this$getClassNames = this.getClassNames("enter"), doneClassName = _this$getClassNames.doneClassName;
    if (type === "appear" && phase === "done" && doneClassName) {
      className += " " + doneClassName;
    }
    if (phase === "active") {
      node && node.scrollTop;
    }
    if (className) {
      this.appliedClasses[type][phase] = className;
      _addClass(node, className);
    }
  };
  _proto.removeClasses = function removeClasses(node, type) {
    var _this$appliedClasses$ = this.appliedClasses[type], baseClassName = _this$appliedClasses$.base, activeClassName = _this$appliedClasses$.active, doneClassName = _this$appliedClasses$.done;
    this.appliedClasses[type] = {};
    if (baseClassName) {
      removeClass2(node, baseClassName);
    }
    if (activeClassName) {
      removeClass2(node, activeClassName);
    }
    if (doneClassName) {
      removeClass2(node, doneClassName);
    }
  };
  _proto.render = function render() {
    var _this$props = this.props, _3 = _this$props.classNames, props = _objectWithoutPropertiesLoose(_this$props, ["classNames"]);
    return React64.createElement(Transition_default, _extends({}, props, {
      onEnter: this.onEnter,
      onEntered: this.onEntered,
      onEntering: this.onEntering,
      onExit: this.onExit,
      onExiting: this.onExiting,
      onExited: this.onExited
    }));
  };
  return CSSTransition2;
}(React64.Component);
CSSTransition.defaultProps = {
  classNames: ""
};
CSSTransition.propTypes = false ? _extends({}, Transition_default.propTypes, {
  classNames: classNamesShape,
  onEnter: import_prop_types38.default.func,
  onEntering: import_prop_types38.default.func,
  onEntered: import_prop_types38.default.func,
  onExit: import_prop_types38.default.func,
  onExiting: import_prop_types38.default.func,
  onExited: import_prop_types38.default.func
}) : {};

// ../../node_modules/react-transition-group/esm/ReplaceTransition.js
var import_prop_types40 = __toESM(require_prop_types());
import React66 from "https://spike.land/dist/react.mjs";
import ReactDOM3 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}

// ../../node_modules/react-transition-group/esm/TransitionGroup.js
var import_prop_types39 = __toESM(require_prop_types());
import React65 from "https://spike.land/dist/react.mjs";

// ../../node_modules/react-transition-group/esm/utils/ChildMapping.js
import { Children as Children2, cloneElement as cloneElement7, isValidElement as isValidElement4 } from "https://spike.land/dist/react.mjs";
function getChildMapping(children2, mapFn) {
  var mapper = function mapper2(child) {
    return mapFn && isValidElement4(child) ? mapFn(child) : child;
  };
  var result = /* @__PURE__ */ Object.create(null);
  if (children2)
    Children2.map(children2, function(c2) {
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
  var nextKeysPending = /* @__PURE__ */ Object.create(null);
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
    return cloneElement7(child, {
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
  var children2 = mergeChildMappings(prevChildMapping, nextChildMapping);
  Object.keys(children2).forEach(function(key) {
    var child = children2[key];
    if (!isValidElement4(child))
      return;
    var hasPrev = key in prevChildMapping;
    var hasNext = key in nextChildMapping;
    var prevChild = prevChildMapping[key];
    var isLeaving = isValidElement4(prevChild) && !prevChild.props.in;
    if (hasNext && (!hasPrev || isLeaving)) {
      children2[key] = cloneElement7(child, {
        onExited: onExited.bind(null, child),
        in: true,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    } else if (!hasNext && hasPrev && !isLeaving) {
      children2[key] = cloneElement7(child, {
        in: false
      });
    } else if (hasNext && hasPrev && isValidElement4(prevChild)) {
      children2[key] = cloneElement7(child, {
        onExited: onExited.bind(null, child),
        in: prevChild.props.in,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    }
  });
  return children2;
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
var TransitionGroup = function(_React$Component) {
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
        var children2 = _extends({}, state.children);
        delete children2[child.key];
        return {
          children: children2
        };
      });
    }
  };
  _proto.render = function render() {
    var _this$props = this.props, Component = _this$props.component, childFactory2 = _this$props.childFactory, props = _objectWithoutPropertiesLoose(_this$props, ["component", "childFactory"]);
    var contextValue = this.state.contextValue;
    var children2 = values2(this.state.children).map(childFactory2);
    delete props.appear;
    delete props.enter;
    delete props.exit;
    if (Component === null) {
      return React65.createElement(TransitionGroupContext_default.Provider, {
        value: contextValue
      }, children2);
    }
    return React65.createElement(TransitionGroupContext_default.Provider, {
      value: contextValue
    }, React65.createElement(Component, props, children2));
  };
  return TransitionGroup2;
}(React65.Component);
TransitionGroup.propTypes = false ? {
  component: import_prop_types39.default.any,
  children: import_prop_types39.default.node,
  appear: import_prop_types39.default.bool,
  enter: import_prop_types39.default.bool,
  exit: import_prop_types39.default.bool,
  childFactory: import_prop_types39.default.func
} : {};
TransitionGroup.defaultProps = defaultProps;
var TransitionGroup_default = TransitionGroup;

// ../../node_modules/react-transition-group/esm/ReplaceTransition.js
var ReplaceTransition = function(_React$Component) {
  _inheritsLoose(ReplaceTransition2, _React$Component);
  function ReplaceTransition2() {
    var _this;
    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(_args)) || this;
    _this.handleEnter = function() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return _this.handleLifecycle("onEnter", 0, args);
    };
    _this.handleEntering = function() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      return _this.handleLifecycle("onEntering", 0, args);
    };
    _this.handleEntered = function() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return _this.handleLifecycle("onEntered", 0, args);
    };
    _this.handleExit = function() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      return _this.handleLifecycle("onExit", 1, args);
    };
    _this.handleExiting = function() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      return _this.handleLifecycle("onExiting", 1, args);
    };
    _this.handleExited = function() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      return _this.handleLifecycle("onExited", 1, args);
    };
    return _this;
  }
  var _proto = ReplaceTransition2.prototype;
  _proto.handleLifecycle = function handleLifecycle(handler, idx, originalArgs) {
    var _child$props;
    var children2 = this.props.children;
    var child = React66.Children.toArray(children2)[idx];
    if (child.props[handler])
      (_child$props = child.props)[handler].apply(_child$props, originalArgs);
    if (this.props[handler]) {
      var maybeNode = child.props.nodeRef ? void 0 : ReactDOM3.findDOMNode(this);
      this.props[handler](maybeNode);
    }
  };
  _proto.render = function render() {
    var _this$props = this.props, children2 = _this$props.children, inProp = _this$props.in, props = _objectWithoutPropertiesLoose(_this$props, ["children", "in"]);
    var _React$Children$toArr = React66.Children.toArray(children2), first = _React$Children$toArr[0], second = _React$Children$toArr[1];
    delete props.onEnter;
    delete props.onEntering;
    delete props.onEntered;
    delete props.onExit;
    delete props.onExiting;
    delete props.onExited;
    return React66.createElement(TransitionGroup_default, props, inProp ? React66.cloneElement(first, {
      key: "first",
      onEnter: this.handleEnter,
      onEntering: this.handleEntering,
      onEntered: this.handleEntered
    }) : React66.cloneElement(second, {
      key: "second",
      onEnter: this.handleExit,
      onEntering: this.handleExiting,
      onEntered: this.handleExited
    }));
  };
  return ReplaceTransition2;
}(React66.Component);
ReplaceTransition.propTypes = false ? {
  in: import_prop_types40.default.bool.isRequired,
  children: function children(props, propName) {
    if (React66.Children.count(props[propName]) !== 2)
      return new Error('"' + propName + '" must be exactly two transition components.');
    return null;
  }
} : {};

// ../../node_modules/react-transition-group/esm/SwitchTransition.js
var import_prop_types41 = __toESM(require_prop_types());
import React67 from "https://spike.land/dist/react.mjs";
var _leaveRenders;
var _enterRenders;
function areChildrenDifferent(oldChildren, newChildren) {
  if (oldChildren === newChildren)
    return false;
  if (React67.isValidElement(oldChildren) && React67.isValidElement(newChildren) && oldChildren.key != null && oldChildren.key === newChildren.key) {
    return false;
  }
  return true;
}
var modes = {
  out: "out-in",
  in: "in-out"
};
var callHook = function callHook2(element, name, cb) {
  return function() {
    var _element$props;
    element.props[name] && (_element$props = element.props)[name].apply(_element$props, arguments);
    cb();
  };
};
var leaveRenders = (_leaveRenders = {}, _leaveRenders[modes.out] = function(_ref) {
  var current = _ref.current, changeState = _ref.changeState;
  return React67.cloneElement(current, {
    in: false,
    onExited: callHook(current, "onExited", function() {
      changeState(ENTERING, null);
    })
  });
}, _leaveRenders[modes.in] = function(_ref2) {
  var current = _ref2.current, changeState = _ref2.changeState, children2 = _ref2.children;
  return [current, React67.cloneElement(children2, {
    in: true,
    onEntered: callHook(children2, "onEntered", function() {
      changeState(ENTERING);
    })
  })];
}, _leaveRenders);
var enterRenders = (_enterRenders = {}, _enterRenders[modes.out] = function(_ref3) {
  var children2 = _ref3.children, changeState = _ref3.changeState;
  return React67.cloneElement(children2, {
    in: true,
    onEntered: callHook(children2, "onEntered", function() {
      changeState(ENTERED, React67.cloneElement(children2, {
        in: true
      }));
    })
  });
}, _enterRenders[modes.in] = function(_ref4) {
  var current = _ref4.current, children2 = _ref4.children, changeState = _ref4.changeState;
  return [React67.cloneElement(current, {
    in: false,
    onExited: callHook(current, "onExited", function() {
      changeState(ENTERED, React67.cloneElement(children2, {
        in: true
      }));
    })
  }), React67.cloneElement(children2, {
    in: true
  })];
}, _enterRenders);
var SwitchTransition = function(_React$Component) {
  _inheritsLoose(SwitchTransition2, _React$Component);
  function SwitchTransition2() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      status: ENTERED,
      current: null
    };
    _this.appeared = false;
    _this.changeState = function(status, current) {
      if (current === void 0) {
        current = _this.state.current;
      }
      _this.setState({
        status,
        current
      });
    };
    return _this;
  }
  var _proto = SwitchTransition2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.appeared = true;
  };
  SwitchTransition2.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    if (props.children == null) {
      return {
        current: null
      };
    }
    if (state.status === ENTERING && props.mode === modes.in) {
      return {
        status: ENTERING
      };
    }
    if (state.current && areChildrenDifferent(state.current, props.children)) {
      return {
        status: EXITING
      };
    }
    return {
      current: React67.cloneElement(props.children, {
        in: true
      })
    };
  };
  _proto.render = function render() {
    var _this$props = this.props, children2 = _this$props.children, mode = _this$props.mode, _this$state = this.state, status = _this$state.status, current = _this$state.current;
    var data = {
      children: children2,
      current,
      changeState: this.changeState,
      status
    };
    var component;
    switch (status) {
      case ENTERING:
        component = enterRenders[mode](data);
        break;
      case EXITING:
        component = leaveRenders[mode](data);
        break;
      case ENTERED:
        component = current;
    }
    return React67.createElement(TransitionGroupContext_default.Provider, {
      value: {
        isMounting: !this.appeared
      }
    }, component);
  };
  return SwitchTransition2;
}(React67.Component);
SwitchTransition.propTypes = false ? {
  mode: import_prop_types41.default.oneOf([modes.in, modes.out]),
  children: import_prop_types41.default.oneOfType([import_prop_types41.default.element.isRequired])
} : {};
SwitchTransition.defaultProps = {
  mode: modes.out
};

// ../../node_modules/@mui/material/ButtonBase/Ripple.js
var import_prop_types42 = __toESM(require_prop_types());
import * as React68 from "https://spike.land/dist/react.mjs";
function Ripple(props) {
  const {
    className,
    classes,
    pulsate = false,
    rippleX,
    rippleY,
    rippleSize,
    in: inProp,
    onExited,
    timeout: timeout2
  } = props;
  const [leaving, setLeaving] = React68.useState(false);
  const rippleClassName = clsx_m_default(className, classes.ripple, classes.rippleVisible, pulsate && classes.ripplePulsate);
  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX
  };
  const childClassName = clsx_m_default(classes.child, leaving && classes.childLeaving, pulsate && classes.childPulsate);
  if (!inProp && !leaving) {
    setLeaving(true);
  }
  React68.useEffect(() => {
    if (!inProp && onExited != null) {
      const timeoutId = setTimeout(onExited, timeout2);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    return void 0;
  }, [onExited, inProp, timeout2]);
  return e2("span", {
    className: rippleClassName,
    style: rippleStyles,
    children: e2("span", {
      className: childClassName
    })
  });
}
false ? Ripple.propTypes = {
  classes: import_prop_types42.default.object.isRequired,
  className: import_prop_types42.default.string,
  in: import_prop_types42.default.bool,
  onExited: import_prop_types42.default.func,
  pulsate: import_prop_types42.default.bool,
  rippleSize: import_prop_types42.default.number,
  rippleX: import_prop_types42.default.number,
  rippleY: import_prop_types42.default.number,
  timeout: import_prop_types42.default.number.isRequired
} : void 0;
var Ripple_default = Ripple;

// ../../node_modules/@mui/material/ButtonBase/touchRippleClasses.js
var touchRippleClasses = generateUtilityClasses("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]);
var touchRippleClasses_default = touchRippleClasses;

// ../../node_modules/@mui/material/ButtonBase/TouchRipple.js
var _excluded37 = ["center", "classes", "className"];
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
var TouchRippleRoot = styled_default2("span", {
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
var TouchRippleRipple = styled_default2(Ripple_default, {
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
    /* @noflip */
    left: 0px;
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
var TouchRipple = React69.forwardRef(function TouchRipple2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiTouchRipple"
  });
  const {
    center: centerProp = false,
    classes = {},
    className
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded37);
  const [ripples, setRipples] = React69.useState([]);
  const nextKey = React69.useRef(0);
  const rippleCallback = React69.useRef(null);
  React69.useEffect(() => {
    if (rippleCallback.current) {
      rippleCallback.current();
      rippleCallback.current = null;
    }
  }, [ripples]);
  const ignoringMouseDown = React69.useRef(false);
  const startTimer = React69.useRef(null);
  const startTimerCommit = React69.useRef(null);
  const container = React69.useRef(null);
  React69.useEffect(() => {
    return () => {
      clearTimeout(startTimer.current);
    };
  }, []);
  const startCommit = React69.useCallback((params) => {
    const {
      pulsate: pulsate2,
      rippleX,
      rippleY,
      rippleSize,
      cb
    } = params;
    setRipples((oldRipples) => [...oldRipples, e2(TouchRippleRipple, {
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
    }, nextKey.current)]);
    nextKey.current += 1;
    rippleCallback.current = cb;
  }, [classes]);
  const start2 = React69.useCallback((event = {}, options = {}, cb) => {
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
  const pulsate = React69.useCallback(() => {
    start2({}, {
      pulsate: true
    });
  }, [start2]);
  const stop = React69.useCallback((event, cb) => {
    clearTimeout(startTimer.current);
    if (event.type === "touchend" && startTimerCommit.current) {
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
  React69.useImperativeHandle(ref, () => ({
    pulsate,
    start: start2,
    stop
  }), [pulsate, start2, stop]);
  return e2(TouchRippleRoot, _extends({
    className: clsx_m_default(classes.root, touchRippleClasses_default.root, className),
    ref: container
  }, other, {
    children: e2(TransitionGroup_default, {
      component: null,
      exit: true,
      children: ripples
    })
  }));
});
false ? TouchRipple.propTypes = {
  center: import_prop_types43.default.bool,
  classes: import_prop_types43.default.object,
  className: import_prop_types43.default.string
} : void 0;
var TouchRipple_default = TouchRipple;

// ../../node_modules/@mui/material/ButtonBase/buttonBaseClasses.js
function getButtonBaseUtilityClass(slot) {
  return generateUtilityClass("MuiButtonBase", slot);
}
var buttonBaseClasses = generateUtilityClasses("MuiButtonBase", ["root", "disabled", "focusVisible"]);
var buttonBaseClasses_default = buttonBaseClasses;

// ../../node_modules/@mui/material/ButtonBase/ButtonBase.js
var _excluded38 = ["action", "centerRipple", "children", "className", "component", "disabled", "disableRipple", "disableTouchRipple", "focusRipple", "focusVisibleClassName", "LinkComponent", "onBlur", "onClick", "onContextMenu", "onDragLeave", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchMove", "onTouchStart", "tabIndex", "TouchRippleProps", "touchRippleRef", "type"];
var useUtilityClasses13 = (ownerState) => {
  const {
    disabled,
    focusVisible,
    focusVisibleClassName,
    classes
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible"]
  };
  const composedClasses = composeClasses(slots, getButtonBaseUtilityClass, classes);
  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }
  return composedClasses;
};
var ButtonBaseRoot = styled_default2("button", {
  name: "MuiButtonBase",
  slot: "Root",
  overridesResolver: (props, styles2) => styles2.root
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
  [`&.${buttonBaseClasses_default.disabled}`]: {
    pointerEvents: "none",
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
});
var ButtonBase = React70.forwardRef(function ButtonBase2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiButtonBase"
  });
  const {
    action,
    centerRipple = false,
    children: children2,
    className,
    component = "button",
    disabled = false,
    disableRipple = false,
    disableTouchRipple = false,
    focusRipple = false,
    LinkComponent = "a",
    onBlur,
    onClick,
    onContextMenu,
    onDragLeave,
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
    tabIndex = 0,
    TouchRippleProps,
    touchRippleRef,
    type
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded38);
  const buttonRef = React70.useRef(null);
  const rippleRef = React70.useRef(null);
  const handleRippleRef = useForkRef_default(rippleRef, touchRippleRef);
  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible_default();
  const [focusVisible, setFocusVisible] = React70.useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }
  React70.useImperativeHandle(action, () => ({
    focusVisible: () => {
      setFocusVisible(true);
      buttonRef.current.focus();
    }
  }), []);
  const [mountedState, setMountedState] = React70.useState(false);
  React70.useEffect(() => {
    setMountedState(true);
  }, []);
  const enableTouchRipple = mountedState && !disableRipple && !disabled;
  React70.useEffect(() => {
    if (focusVisible && focusRipple && !disableRipple && mountedState) {
      rippleRef.current.pulsate();
    }
  }, [disableRipple, focusRipple, focusVisible, mountedState]);
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
  const handleContextMenu = useRippleHandler("stop", onContextMenu);
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
  const handleBlur2 = useRippleHandler("stop", (event) => {
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
  const keydownRef = React70.useRef(false);
  const handleKeyDown3 = useEventCallback_default((event) => {
    if (focusRipple && !keydownRef.current && focusVisible && rippleRef.current && event.key === " ") {
      keydownRef.current = true;
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
  if (ComponentProp === "button" && (other.href || other.to)) {
    ComponentProp = LinkComponent;
  }
  const buttonProps = {};
  if (ComponentProp === "button") {
    buttonProps.type = type === void 0 ? "button" : type;
    buttonProps.disabled = disabled;
  } else {
    if (!other.href && !other.to) {
      buttonProps.role = "button";
    }
    if (disabled) {
      buttonProps["aria-disabled"] = disabled;
    }
  }
  const handleOwnRef = useForkRef_default(focusVisibleRef, buttonRef);
  const handleRef = useForkRef_default(ref, handleOwnRef);
  if (false) {
    React70.useEffect(() => {
      if (enableTouchRipple && !rippleRef.current) {
        console.error(["MUI: The `component` prop provided to ButtonBase is invalid.", "Please make sure the children prop is rendered in this custom component."].join("\n"));
      }
    }, [enableTouchRipple]);
  }
  const ownerState = _extends({}, props, {
    centerRipple,
    component,
    disabled,
    disableRipple,
    disableTouchRipple,
    focusRipple,
    tabIndex,
    focusVisible
  });
  const classes = useUtilityClasses13(ownerState);
  return e2(ButtonBaseRoot, _extends({
    as: ComponentProp,
    className: clsx_m_default(classes.root, className),
    ownerState,
    onBlur: handleBlur2,
    onClick,
    onContextMenu: handleContextMenu,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown3,
    onKeyUp: handleKeyUp,
    onMouseDown: handleMouseDown,
    onMouseLeave: handleMouseLeave,
    onMouseUp: handleMouseUp,
    onDragLeave: handleDragLeave,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchMove,
    onTouchStart: handleTouchStart,
    ref: handleRef,
    tabIndex: disabled ? -1 : tabIndex,
    type
  }, buttonProps, other, {
    children: [children2, enableTouchRipple ? e2(TouchRipple_default, _extends({
      ref: handleRippleRef,
      center: centerRipple
    }, TouchRippleProps)) : null]
  }));
});
false ? ButtonBase.propTypes = {
  action: refType_default,
  centerRipple: import_prop_types44.default.bool,
  children: import_prop_types44.default.node,
  classes: import_prop_types44.default.object,
  className: import_prop_types44.default.string,
  component: elementTypeAcceptingRef_default,
  disabled: import_prop_types44.default.bool,
  disableRipple: import_prop_types44.default.bool,
  disableTouchRipple: import_prop_types44.default.bool,
  focusRipple: import_prop_types44.default.bool,
  focusVisibleClassName: import_prop_types44.default.string,
  href: import_prop_types44.default.any,
  LinkComponent: import_prop_types44.default.elementType,
  onBlur: import_prop_types44.default.func,
  onClick: import_prop_types44.default.func,
  onContextMenu: import_prop_types44.default.func,
  onDragLeave: import_prop_types44.default.func,
  onFocus: import_prop_types44.default.func,
  onFocusVisible: import_prop_types44.default.func,
  onKeyDown: import_prop_types44.default.func,
  onKeyUp: import_prop_types44.default.func,
  onMouseDown: import_prop_types44.default.func,
  onMouseLeave: import_prop_types44.default.func,
  onMouseUp: import_prop_types44.default.func,
  onTouchEnd: import_prop_types44.default.func,
  onTouchMove: import_prop_types44.default.func,
  onTouchStart: import_prop_types44.default.func,
  sx: import_prop_types44.default.oneOfType([import_prop_types44.default.arrayOf(import_prop_types44.default.oneOfType([import_prop_types44.default.func, import_prop_types44.default.object, import_prop_types44.default.bool])), import_prop_types44.default.func, import_prop_types44.default.object]),
  tabIndex: import_prop_types44.default.number,
  TouchRippleProps: import_prop_types44.default.object,
  touchRippleRef: import_prop_types44.default.oneOfType([import_prop_types44.default.func, import_prop_types44.default.shape({
    current: import_prop_types44.default.shape({
      pulsate: import_prop_types44.default.func.isRequired,
      start: import_prop_types44.default.func.isRequired,
      stop: import_prop_types44.default.func.isRequired
    })
  })]),
  type: import_prop_types44.default.oneOfType([import_prop_types44.default.oneOf(["button", "reset", "submit"]), import_prop_types44.default.string])
} : void 0;
var ButtonBase_default = ButtonBase;

// ../../node_modules/@mui/material/utils/capitalize.js
var capitalize_default = capitalize;

// ../../node_modules/@mui/material/Fab/fabClasses.js
function getFabUtilityClass(slot) {
  return generateUtilityClass("MuiFab", slot);
}
var fabClasses = generateUtilityClasses("MuiFab", ["root", "primary", "secondary", "extended", "circular", "focusVisible", "disabled", "colorInherit", "sizeSmall", "sizeMedium", "sizeLarge", "info", "error", "warning", "success"]);
var fabClasses_default = fabClasses;

// ../../node_modules/@mui/material/Fab/Fab.js
var _excluded39 = ["children", "className", "color", "component", "disabled", "disableFocusRipple", "focusVisibleClassName", "size", "variant"];
var useUtilityClasses14 = (ownerState) => {
  const {
    color: color2,
    variant,
    classes,
    size
  } = ownerState;
  const slots = {
    root: ["root", variant, `size${capitalize_default(size)}`, color2 === "inherit" ? "colorInherit" : color2]
  };
  return composeClasses(slots, getFabUtilityClass, classes);
};
var FabRoot = styled_default2(ButtonBase_default, {
  name: "MuiFab",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, styles2[ownerState.variant], styles2[`size${capitalize_default(ownerState.size)}`], ownerState.color === "inherit" && styles2.colorInherit, styles2[capitalize_default(ownerState.size)], styles2[ownerState.color]];
  }
})(({
  theme,
  ownerState
}) => _extends({}, theme.typography.button, {
  minHeight: 36,
  transition: theme.transitions.create(["background-color", "box-shadow", "border-color"], {
    duration: theme.transitions.duration.short
  }),
  borderRadius: "50%",
  padding: 0,
  minWidth: 0,
  width: 56,
  height: 56,
  zIndex: theme.zIndex.fab,
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
  [`&.${fabClasses_default.focusVisible}`]: {
    boxShadow: theme.shadows[6]
  },
  [`&.${fabClasses_default.disabled}`]: {
    color: theme.palette.action.disabled,
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.action.disabledBackground
  }
}, ownerState.size === "small" && {
  width: 40,
  height: 40
}, ownerState.size === "medium" && {
  width: 48,
  height: 48
}, ownerState.variant === "extended" && {
  borderRadius: 48 / 2,
  padding: "0 16px",
  width: "auto",
  minHeight: "auto",
  minWidth: 48,
  height: 48
}, ownerState.variant === "extended" && ownerState.size === "small" && {
  width: "auto",
  padding: "0 8px",
  borderRadius: 34 / 2,
  minWidth: 34,
  height: 34
}, ownerState.variant === "extended" && ownerState.size === "medium" && {
  width: "auto",
  padding: "0 16px",
  borderRadius: 40 / 2,
  minWidth: 40,
  height: 40
}, ownerState.color === "inherit" && {
  color: "inherit"
}), ({
  theme,
  ownerState
}) => _extends({}, ownerState.color !== "inherit" && ownerState.color !== "default" && theme.palette[ownerState.color] != null && {
  color: theme.palette[ownerState.color].contrastText,
  backgroundColor: theme.palette[ownerState.color].main,
  "&:hover": {
    backgroundColor: theme.palette[ownerState.color].dark,
    "@media (hover: none)": {
      backgroundColor: theme.palette[ownerState.color].main
    }
  }
}));
var Fab = React71.forwardRef(function Fab2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiFab"
  });
  const {
    children: children2,
    className,
    color: color2 = "default",
    component = "button",
    disabled = false,
    disableFocusRipple = false,
    focusVisibleClassName,
    size = "large",
    variant = "circular"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded39);
  const ownerState = _extends({}, props, {
    color: color2,
    component,
    disabled,
    disableFocusRipple,
    size,
    variant
  });
  const classes = useUtilityClasses14(ownerState);
  return e2(FabRoot, _extends({
    className: clsx_m_default(classes.root, className),
    component,
    disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: clsx_m_default(classes.focusVisible, focusVisibleClassName),
    ownerState,
    ref
  }, other, {
    children: children2
  }));
});
false ? Fab.propTypes = {
  children: import_prop_types45.default.node,
  classes: import_prop_types45.default.object,
  className: import_prop_types45.default.string,
  color: import_prop_types45.default.oneOf(["default", "error", "info", "inherit", "primary", "secondary", "success", "warning"]),
  component: import_prop_types45.default.elementType,
  disabled: import_prop_types45.default.bool,
  disableFocusRipple: import_prop_types45.default.bool,
  disableRipple: import_prop_types45.default.bool,
  focusVisibleClassName: import_prop_types45.default.string,
  href: import_prop_types45.default.string,
  size: import_prop_types45.default.oneOfType([import_prop_types45.default.oneOf(["small", "medium", "large"]), import_prop_types45.default.string]),
  sx: import_prop_types45.default.oneOfType([import_prop_types45.default.arrayOf(import_prop_types45.default.oneOfType([import_prop_types45.default.func, import_prop_types45.default.object, import_prop_types45.default.bool])), import_prop_types45.default.func, import_prop_types45.default.object]),
  variant: import_prop_types45.default.oneOfType([import_prop_types45.default.oneOf(["circular", "extended"]), import_prop_types45.default.string])
} : void 0;
var Fab_default = Fab;

// ../../node_modules/@mui/material/Button/Button.js
var import_prop_types46 = __toESM(require_prop_types());
import * as React73 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/material/Button/buttonClasses.js
function getButtonUtilityClass(slot) {
  return generateUtilityClass("MuiButton", slot);
}
var buttonClasses = generateUtilityClasses("MuiButton", ["root", "text", "textInherit", "textPrimary", "textSecondary", "outlined", "outlinedInherit", "outlinedPrimary", "outlinedSecondary", "contained", "containedInherit", "containedPrimary", "containedSecondary", "disableElevation", "focusVisible", "disabled", "colorInherit", "textSizeSmall", "textSizeMedium", "textSizeLarge", "outlinedSizeSmall", "outlinedSizeMedium", "outlinedSizeLarge", "containedSizeSmall", "containedSizeMedium", "containedSizeLarge", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "iconSizeSmall", "iconSizeMedium", "iconSizeLarge"]);
var buttonClasses_default = buttonClasses;

// ../../node_modules/@mui/material/ButtonGroup/ButtonGroupContext.js
import * as React72 from "https://spike.land/dist/react.mjs";
var ButtonGroupContext = React72.createContext({});
if (false) {
  ButtonGroupContext.displayName = "ButtonGroupContext";
}
var ButtonGroupContext_default = ButtonGroupContext;

// ../../node_modules/@mui/material/Button/Button.js
var _excluded40 = ["children", "color", "component", "className", "disabled", "disableElevation", "disableFocusRipple", "endIcon", "focusVisibleClassName", "fullWidth", "size", "startIcon", "type", "variant"];
var useUtilityClasses15 = (ownerState) => {
  const {
    color: color2,
    disableElevation,
    fullWidth,
    size,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ["root", variant, `${variant}${capitalize_default(color2)}`, `size${capitalize_default(size)}`, `${variant}Size${capitalize_default(size)}`, color2 === "inherit" && "colorInherit", disableElevation && "disableElevation", fullWidth && "fullWidth"],
    label: ["label"],
    startIcon: ["startIcon", `iconSize${capitalize_default(size)}`],
    endIcon: ["endIcon", `iconSize${capitalize_default(size)}`]
  };
  const composedClasses = composeClasses(slots, getButtonUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
var commonIconStyles = (ownerState) => _extends({}, ownerState.size === "small" && {
  "& > *:nth-of-type(1)": {
    fontSize: 18
  }
}, ownerState.size === "medium" && {
  "& > *:nth-of-type(1)": {
    fontSize: 20
  }
}, ownerState.size === "large" && {
  "& > *:nth-of-type(1)": {
    fontSize: 22
  }
});
var ButtonRoot = styled_default2(ButtonBase_default, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, styles2[ownerState.variant], styles2[`${ownerState.variant}${capitalize_default(ownerState.color)}`], styles2[`size${capitalize_default(ownerState.size)}`], styles2[`${ownerState.variant}Size${capitalize_default(ownerState.size)}`], ownerState.color === "inherit" && styles2.colorInherit, ownerState.disableElevation && styles2.disableElevation, ownerState.fullWidth && styles2.fullWidth];
  }
})(({
  theme,
  ownerState
}) => {
  var _theme$palette$getCon, _theme$palette;
  return _extends({}, theme.typography.button, {
    minWidth: 64,
    padding: "6px 16px",
    borderRadius: (theme.vars || theme).shape.borderRadius,
    transition: theme.transitions.create(["background-color", "box-shadow", "border-color", "color"], {
      duration: theme.transitions.duration.short
    }),
    "&:hover": _extends({
      textDecoration: "none",
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    }, ownerState.variant === "text" && ownerState.color !== "inherit" && {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    }, ownerState.variant === "outlined" && ownerState.color !== "inherit" && {
      border: `1px solid ${(theme.vars || theme).palette[ownerState.color].main}`,
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    }, ownerState.variant === "contained" && {
      backgroundColor: (theme.vars || theme).palette.grey.A100,
      boxShadow: (theme.vars || theme).shadows[4],
      "@media (hover: none)": {
        boxShadow: (theme.vars || theme).shadows[2],
        backgroundColor: (theme.vars || theme).palette.grey[300]
      }
    }, ownerState.variant === "contained" && ownerState.color !== "inherit" && {
      backgroundColor: (theme.vars || theme).palette[ownerState.color].dark,
      "@media (hover: none)": {
        backgroundColor: (theme.vars || theme).palette[ownerState.color].main
      }
    }),
    "&:active": _extends({}, ownerState.variant === "contained" && {
      boxShadow: (theme.vars || theme).shadows[8]
    }),
    [`&.${buttonClasses_default.focusVisible}`]: _extends({}, ownerState.variant === "contained" && {
      boxShadow: (theme.vars || theme).shadows[6]
    }),
    [`&.${buttonClasses_default.disabled}`]: _extends({
      color: (theme.vars || theme).palette.action.disabled
    }, ownerState.variant === "outlined" && {
      border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`
    }, ownerState.variant === "outlined" && ownerState.color === "secondary" && {
      border: `1px solid ${(theme.vars || theme).palette.action.disabled}`
    }, ownerState.variant === "contained" && {
      color: (theme.vars || theme).palette.action.disabled,
      boxShadow: (theme.vars || theme).shadows[0],
      backgroundColor: (theme.vars || theme).palette.action.disabledBackground
    })
  }, ownerState.variant === "text" && {
    padding: "6px 8px"
  }, ownerState.variant === "text" && ownerState.color !== "inherit" && {
    color: (theme.vars || theme).palette[ownerState.color].main
  }, ownerState.variant === "outlined" && {
    padding: "5px 15px",
    border: "1px solid currentColor"
  }, ownerState.variant === "outlined" && ownerState.color !== "inherit" && {
    color: (theme.vars || theme).palette[ownerState.color].main,
    border: theme.vars ? `1px solid rgba(${theme.vars.palette[ownerState.color].mainChannel} / 0.5)` : `1px solid ${alpha(theme.palette[ownerState.color].main, 0.5)}`
  }, ownerState.variant === "contained" && {
    color: theme.vars ? theme.vars.palette.text.primary : (_theme$palette$getCon = (_theme$palette = theme.palette).getContrastText) == null ? void 0 : _theme$palette$getCon.call(_theme$palette, theme.palette.grey[300]),
    backgroundColor: (theme.vars || theme).palette.grey[300],
    boxShadow: (theme.vars || theme).shadows[2]
  }, ownerState.variant === "contained" && ownerState.color !== "inherit" && {
    color: (theme.vars || theme).palette[ownerState.color].contrastText,
    backgroundColor: (theme.vars || theme).palette[ownerState.color].main
  }, ownerState.color === "inherit" && {
    color: "inherit",
    borderColor: "currentColor"
  }, ownerState.size === "small" && ownerState.variant === "text" && {
    padding: "4px 5px",
    fontSize: theme.typography.pxToRem(13)
  }, ownerState.size === "large" && ownerState.variant === "text" && {
    padding: "8px 11px",
    fontSize: theme.typography.pxToRem(15)
  }, ownerState.size === "small" && ownerState.variant === "outlined" && {
    padding: "3px 9px",
    fontSize: theme.typography.pxToRem(13)
  }, ownerState.size === "large" && ownerState.variant === "outlined" && {
    padding: "7px 21px",
    fontSize: theme.typography.pxToRem(15)
  }, ownerState.size === "small" && ownerState.variant === "contained" && {
    padding: "4px 10px",
    fontSize: theme.typography.pxToRem(13)
  }, ownerState.size === "large" && ownerState.variant === "contained" && {
    padding: "8px 22px",
    fontSize: theme.typography.pxToRem(15)
  }, ownerState.fullWidth && {
    width: "100%"
  });
}, ({
  ownerState
}) => ownerState.disableElevation && {
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none"
  },
  [`&.${buttonClasses_default.focusVisible}`]: {
    boxShadow: "none"
  },
  "&:active": {
    boxShadow: "none"
  },
  [`&.${buttonClasses_default.disabled}`]: {
    boxShadow: "none"
  }
});
var ButtonStartIcon = styled_default2("span", {
  name: "MuiButton",
  slot: "StartIcon",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.startIcon, styles2[`iconSize${capitalize_default(ownerState.size)}`]];
  }
})(({
  ownerState
}) => _extends({
  display: "inherit",
  marginRight: 8,
  marginLeft: -4
}, ownerState.size === "small" && {
  marginLeft: -2
}, commonIconStyles(ownerState)));
var ButtonEndIcon = styled_default2("span", {
  name: "MuiButton",
  slot: "EndIcon",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.endIcon, styles2[`iconSize${capitalize_default(ownerState.size)}`]];
  }
})(({
  ownerState
}) => _extends({
  display: "inherit",
  marginRight: -4,
  marginLeft: 8
}, ownerState.size === "small" && {
  marginRight: -2
}, commonIconStyles(ownerState)));
var Button = React73.forwardRef(function Button2(inProps, ref) {
  const contextProps = React73.useContext(ButtonGroupContext_default);
  const resolvedProps = resolveProps(contextProps, inProps);
  const props = useThemeProps2({
    props: resolvedProps,
    name: "MuiButton"
  });
  const {
    children: children2,
    color: color2 = "primary",
    component = "button",
    className,
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    endIcon: endIconProp,
    focusVisibleClassName,
    fullWidth = false,
    size = "medium",
    startIcon: startIconProp,
    type,
    variant = "text"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded40);
  const ownerState = _extends({}, props, {
    color: color2,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    fullWidth,
    size,
    type,
    variant
  });
  const classes = useUtilityClasses15(ownerState);
  const startIcon = startIconProp && e2(ButtonStartIcon, {
    className: classes.startIcon,
    ownerState,
    children: startIconProp
  });
  const endIcon = endIconProp && e2(ButtonEndIcon, {
    className: classes.endIcon,
    ownerState,
    children: endIconProp
  });
  return e2(ButtonRoot, _extends({
    ownerState,
    className: clsx_m_default(className, contextProps.className),
    component,
    disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: clsx_m_default(classes.focusVisible, focusVisibleClassName),
    ref,
    type
  }, other, {
    classes,
    children: [startIcon, children2, endIcon]
  }));
});
false ? Button.propTypes = {
  children: import_prop_types46.default.node,
  classes: import_prop_types46.default.object,
  className: import_prop_types46.default.string,
  color: import_prop_types46.default.oneOfType([import_prop_types46.default.oneOf(["inherit", "primary", "secondary", "success", "error", "info", "warning"]), import_prop_types46.default.string]),
  component: import_prop_types46.default.elementType,
  disabled: import_prop_types46.default.bool,
  disableElevation: import_prop_types46.default.bool,
  disableFocusRipple: import_prop_types46.default.bool,
  disableRipple: import_prop_types46.default.bool,
  endIcon: import_prop_types46.default.node,
  focusVisibleClassName: import_prop_types46.default.string,
  fullWidth: import_prop_types46.default.bool,
  href: import_prop_types46.default.string,
  size: import_prop_types46.default.oneOfType([import_prop_types46.default.oneOf(["small", "medium", "large"]), import_prop_types46.default.string]),
  startIcon: import_prop_types46.default.node,
  sx: import_prop_types46.default.oneOfType([import_prop_types46.default.arrayOf(import_prop_types46.default.oneOfType([import_prop_types46.default.func, import_prop_types46.default.object, import_prop_types46.default.bool])), import_prop_types46.default.func, import_prop_types46.default.object]),
  type: import_prop_types46.default.oneOfType([import_prop_types46.default.oneOf(["button", "reset", "submit"]), import_prop_types46.default.string]),
  variant: import_prop_types46.default.oneOfType([import_prop_types46.default.oneOf(["contained", "outlined", "text"]), import_prop_types46.default.string])
} : void 0;
var Button_default = Button;

// ../../node_modules/@mui/material/Box/Box.js
var import_prop_types47 = __toESM(require_prop_types());

// ../../node_modules/@mui/material/styles/useTheme.js
import * as React74 from "https://spike.land/dist/react.mjs";
function useTheme4() {
  const theme = useTheme_default(defaultTheme_default);
  if (false) {
    React74.useDebugValue(theme);
  }
  return theme;
}

// ../../node_modules/@mui/material/styles/experimental_extendTheme.js
var _excluded41 = ["colorSchemes", "opacity"];
var _excluded211 = ["palette"];
var defaultOpacity = {
  active: 0.54,
  hover: 0.04,
  selected: 0.08,
  disabled: 0.26,
  focus: 0.12
};
function createTheme3(options = {}, ...args) {
  var _colorSchemesInput$li, _colorSchemesInput$da;
  const {
    colorSchemes: colorSchemesInput = {},
    opacity: opacityInput = {}
  } = options, input = _objectWithoutPropertiesLoose(options, _excluded41);
  let _createThemeWithoutVa = createTheme_default2(_extends({}, input, colorSchemesInput.light && {
    palette: (_colorSchemesInput$li = colorSchemesInput.light) == null ? void 0 : _colorSchemesInput$li.palette
  })), {
    palette: lightPalette
  } = _createThemeWithoutVa, muiTheme = _objectWithoutPropertiesLoose(_createThemeWithoutVa, _excluded211);
  const {
    palette: darkPalette
  } = createTheme_default2({
    palette: _extends({
      mode: "dark"
    }, (_colorSchemesInput$da = colorSchemesInput.dark) == null ? void 0 : _colorSchemesInput$da.palette)
  });
  colorSchemesInput.light = {
    palette: lightPalette
  };
  colorSchemesInput.dark = {
    palette: darkPalette
  };
  const colorSchemes = {};
  Object.keys(colorSchemesInput).forEach((key) => {
    const palette2 = createPalette(colorSchemesInput[key].palette);
    Object.keys(palette2).forEach((color2) => {
      const colors = palette2[color2];
      if (colors.main) {
        palette2[color2].mainChannel = colorChannel(colors.main);
      }
      if (colors.light) {
        palette2[color2].lightChannel = colorChannel(colors.light);
      }
      if (colors.dark) {
        palette2[color2].darkChannel = colorChannel(colors.dark);
      }
      if (colors.primary) {
        palette2[color2].primaryChannel = colorChannel(colors.primary);
      }
      if (colors.secondary) {
        palette2[color2].secondaryChannel = colorChannel(colors.secondary);
      }
      if (colors.disabled) {
        palette2[color2].disabledChannel = colorChannel(colors.disabled);
      }
    });
    colorSchemes[key] = {
      palette: palette2
    };
  });
  const opacity = _extends({}, defaultOpacity, opacityInput);
  muiTheme.colorSchemes = colorSchemes;
  muiTheme.opacity = opacity;
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  return muiTheme;
}
var experimental_extendTheme_default = createTheme3;

// ../../node_modules/@mui/material/styles/CssVarsProvider.js
var defaultTheme2 = experimental_extendTheme_default();
var {
  CssVarsProvider: Experimental_CssVarsProvider,
  useColorScheme,
  getInitColorSchemeScript: getInitColorSchemeScript2
} = createCssVarsProvider({
  theme: defaultTheme2,
  defaultColorScheme: {
    light: "light",
    dark: "dark"
  },
  prefix: "md",
  resolveTheme: (theme) => {
    const newTheme = _extends({}, theme, {
      typography: createTypography(theme.palette, theme.typography)
    });
    return newTheme;
  },
  shouldSkipGeneratingVar: (keys) => !!keys[0].match(/(typography|mixins|breakpoints|direction|transitions)/)
});

// ../../node_modules/@mui/material/Box/Box.js
var defaultTheme3 = createTheme_default2();
var Box2 = createBox({
  defaultTheme: defaultTheme3,
  defaultClassName: "MuiBox-root",
  generateClassName: ClassNameGenerator_default.generate
});
false ? Box2.propTypes = {
  children: import_prop_types47.default.node,
  component: import_prop_types47.default.elementType,
  sx: import_prop_types47.default.oneOfType([import_prop_types47.default.arrayOf(import_prop_types47.default.oneOfType([import_prop_types47.default.func, import_prop_types47.default.object, import_prop_types47.default.bool])), import_prop_types47.default.func, import_prop_types47.default.object])
} : void 0;
var Box_default2 = Box2;

// ../../node_modules/@mui/material/Slider/Slider.js
var import_prop_types48 = __toESM(require_prop_types());
import * as React75 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/material/utils/shouldSpreadAdditionalProps.js
var shouldSpreadAdditionalProps = (Slot) => {
  return !Slot || !isHostComponent_default(Slot);
};
var shouldSpreadAdditionalProps_default = shouldSpreadAdditionalProps;

// ../../node_modules/@mui/material/Slider/Slider.js
var _excluded42 = ["component", "components", "componentsProps", "color", "size"];
var sliderClasses = _extends({}, sliderUnstyledClasses_default, generateUtilityClasses("MuiSlider", ["colorPrimary", "colorSecondary", "thumbColorPrimary", "thumbColorSecondary", "sizeSmall", "thumbSizeSmall"]));
var SliderRoot = styled_default2("span", {
  name: "MuiSlider",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    const marks = ownerState.marksProp === true && ownerState.step !== null ? [...Array(Math.floor((ownerState.max - ownerState.min) / ownerState.step) + 1)].map((_3, index) => ({
      value: ownerState.min + ownerState.step * index
    })) : ownerState.marksProp || [];
    const marked = marks.length > 0 && marks.some((mark) => mark.label);
    return [styles2.root, styles2[`color${capitalize_default(ownerState.color)}`], ownerState.size !== "medium" && styles2[`size${capitalize_default(ownerState.size)}`], marked && styles2.marked, ownerState.orientation === "vertical" && styles2.vertical, ownerState.track === "inverted" && styles2.trackInverted, ownerState.track === false && styles2.trackFalse];
  }
})(({
  theme,
  ownerState
}) => _extends({
  borderRadius: 12,
  boxSizing: "content-box",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
  touchAction: "none",
  color: theme.palette[ownerState.color].main,
  WebkitTapHighlightColor: "transparent"
}, ownerState.orientation === "horizontal" && _extends({
  height: 4,
  width: "100%",
  padding: "13px 0",
  "@media (pointer: coarse)": {
    padding: "20px 0"
  }
}, ownerState.size === "small" && {
  height: 2
}, ownerState.marked && {
  marginBottom: 20
}), ownerState.orientation === "vertical" && _extends({
  height: "100%",
  width: 4,
  padding: "0 13px",
  "@media (pointer: coarse)": {
    padding: "0 20px"
  }
}, ownerState.size === "small" && {
  width: 2
}, ownerState.marked && {
  marginRight: 44
}), {
  "@media print": {
    colorAdjust: "exact"
  },
  [`&.${sliderClasses.disabled}`]: {
    pointerEvents: "none",
    cursor: "default",
    color: theme.palette.grey[400]
  },
  [`&.${sliderClasses.dragging}`]: {
    [`& .${sliderClasses.thumb}, & .${sliderClasses.track}`]: {
      transition: "none"
    }
  }
}));
false ? SliderRoot.propTypes = {
  children: import_prop_types48.default.node
} : void 0;
var SliderRail = styled_default2("span", {
  name: "MuiSlider",
  slot: "Rail",
  overridesResolver: (props, styles2) => styles2.rail
})(({
  ownerState
}) => _extends({
  display: "block",
  position: "absolute",
  borderRadius: "inherit",
  backgroundColor: "currentColor",
  opacity: 0.38
}, ownerState.orientation === "horizontal" && {
  width: "100%",
  height: "inherit",
  top: "50%",
  transform: "translateY(-50%)"
}, ownerState.orientation === "vertical" && {
  height: "100%",
  width: "inherit",
  left: "50%",
  transform: "translateX(-50%)"
}, ownerState.track === "inverted" && {
  opacity: 1
}));
false ? SliderRail.propTypes = {
  children: import_prop_types48.default.node
} : void 0;
var SliderTrack = styled_default2("span", {
  name: "MuiSlider",
  slot: "Track",
  overridesResolver: (props, styles2) => styles2.track
})(({
  theme,
  ownerState
}) => {
  const color2 = theme.palette.mode === "light" ? lighten(theme.palette[ownerState.color].main, 0.62) : darken(theme.palette[ownerState.color].main, 0.5);
  return _extends({
    display: "block",
    position: "absolute",
    borderRadius: "inherit",
    border: "1px solid currentColor",
    backgroundColor: "currentColor",
    transition: theme.transitions.create(["left", "width", "bottom", "height"], {
      duration: theme.transitions.duration.shortest
    })
  }, ownerState.size === "small" && {
    border: "none"
  }, ownerState.orientation === "horizontal" && {
    height: "inherit",
    top: "50%",
    transform: "translateY(-50%)"
  }, ownerState.orientation === "vertical" && {
    width: "inherit",
    left: "50%",
    transform: "translateX(-50%)"
  }, ownerState.track === false && {
    display: "none"
  }, ownerState.track === "inverted" && {
    backgroundColor: color2,
    borderColor: color2
  });
});
false ? SliderTrack.propTypes = {
  children: import_prop_types48.default.node
} : void 0;
var SliderThumb = styled_default2("span", {
  name: "MuiSlider",
  slot: "Thumb",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.thumb, styles2[`thumbColor${capitalize_default(ownerState.color)}`], ownerState.size !== "medium" && styles2[`thumbSize${capitalize_default(ownerState.size)}`]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  position: "absolute",
  width: 20,
  height: 20,
  boxSizing: "border-box",
  borderRadius: "50%",
  outline: 0,
  backgroundColor: "currentColor",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: theme.transitions.create(["box-shadow", "left", "bottom"], {
    duration: theme.transitions.duration.shortest
  })
}, ownerState.size === "small" && {
  width: 12,
  height: 12
}, ownerState.orientation === "horizontal" && {
  top: "50%",
  transform: "translate(-50%, -50%)"
}, ownerState.orientation === "vertical" && {
  left: "50%",
  transform: "translate(-50%, 50%)"
}, {
  "&:before": _extends({
    position: "absolute",
    content: '""',
    borderRadius: "inherit",
    width: "100%",
    height: "100%",
    boxShadow: theme.shadows[2]
  }, ownerState.size === "small" && {
    boxShadow: "none"
  }),
  "&::after": {
    position: "absolute",
    content: '""',
    borderRadius: "50%",
    width: 42,
    height: 42,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  [`&:hover, &.${sliderClasses.focusVisible}`]: {
    boxShadow: `0px 0px 0px 8px ${alpha(theme.palette[ownerState.color].main, 0.16)}`,
    "@media (hover: none)": {
      boxShadow: "none"
    }
  },
  [`&.${sliderClasses.active}`]: {
    boxShadow: `0px 0px 0px 14px ${alpha(theme.palette[ownerState.color].main, 0.16)}`
  },
  [`&.${sliderClasses.disabled}`]: {
    "&:hover": {
      boxShadow: "none"
    }
  }
}));
false ? SliderThumb.propTypes = {
  children: import_prop_types48.default.node
} : void 0;
var SliderValueLabel = styled_default2(SliderValueLabelUnstyled_default, {
  name: "MuiSlider",
  slot: "ValueLabel",
  overridesResolver: (props, styles2) => styles2.valueLabel
})(({
  theme,
  ownerState
}) => _extends({
  [`&.${sliderClasses.valueLabelOpen}`]: {
    transform: "translateY(-100%) scale(1)"
  },
  zIndex: 1,
  whiteSpace: "nowrap"
}, theme.typography.body2, {
  fontWeight: 500,
  transition: theme.transitions.create(["transform"], {
    duration: theme.transitions.duration.shortest
  }),
  top: -10,
  transformOrigin: "bottom center",
  transform: "translateY(-100%) scale(0)",
  position: "absolute",
  backgroundColor: theme.palette.grey[600],
  borderRadius: 2,
  color: theme.palette.common.white,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.25rem 0.75rem"
}, ownerState.size === "small" && {
  fontSize: theme.typography.pxToRem(12),
  padding: "0.25rem 0.5rem"
}, {
  "&:before": {
    position: "absolute",
    content: '""',
    width: 8,
    height: 8,
    bottom: 0,
    left: "50%",
    transform: "translate(-50%, 50%) rotate(45deg)",
    backgroundColor: "inherit"
  }
}));
false ? SliderValueLabel.propTypes = {
  children: import_prop_types48.default.node
} : void 0;
var SliderMark = styled_default2("span", {
  name: "MuiSlider",
  slot: "Mark",
  shouldForwardProp: (prop) => slotShouldForwardProp(prop) && prop !== "markActive",
  overridesResolver: (props, styles2) => styles2.mark
})(({
  theme,
  ownerState,
  markActive
}) => _extends({
  position: "absolute",
  width: 2,
  height: 2,
  borderRadius: 1,
  backgroundColor: "currentColor"
}, ownerState.orientation === "horizontal" && {
  top: "50%",
  transform: "translate(-1px, -50%)"
}, ownerState.orientation === "vertical" && {
  left: "50%",
  transform: "translate(-50%, 1px)"
}, markActive && {
  backgroundColor: theme.palette.background.paper,
  opacity: 0.8
}));
false ? SliderMark.propTypes = {
  children: import_prop_types48.default.node
} : void 0;
var SliderMarkLabel = styled_default2("span", {
  name: "MuiSlider",
  slot: "MarkLabel",
  shouldForwardProp: (prop) => slotShouldForwardProp(prop) && prop !== "markLabelActive",
  overridesResolver: (props, styles2) => styles2.markLabel
})(({
  theme,
  ownerState,
  markLabelActive
}) => _extends({}, theme.typography.body2, {
  color: theme.palette.text.secondary,
  position: "absolute",
  whiteSpace: "nowrap"
}, ownerState.orientation === "horizontal" && {
  top: 30,
  transform: "translateX(-50%)",
  "@media (pointer: coarse)": {
    top: 40
  }
}, ownerState.orientation === "vertical" && {
  left: 36,
  transform: "translateY(50%)",
  "@media (pointer: coarse)": {
    left: 44
  }
}, markLabelActive && {
  color: theme.palette.text.primary
}));
false ? SliderMarkLabel.propTypes = {
  children: import_prop_types48.default.node
} : void 0;
var extendUtilityClasses = (ownerState) => {
  const {
    color: color2,
    size,
    classes = {}
  } = ownerState;
  return _extends({}, classes, {
    root: clsx_m_default(classes.root, getSliderUtilityClass(`color${capitalize_default(color2)}`), classes[`color${capitalize_default(color2)}`], size && [getSliderUtilityClass(`size${capitalize_default(size)}`), classes[`size${capitalize_default(size)}`]]),
    thumb: clsx_m_default(classes.thumb, getSliderUtilityClass(`thumbColor${capitalize_default(color2)}`), classes[`thumbColor${capitalize_default(color2)}`], size && [getSliderUtilityClass(`thumbSize${capitalize_default(size)}`), classes[`thumbSize${capitalize_default(size)}`]])
  });
};
var Slider = React75.forwardRef(function Slider2(inputProps, ref) {
  var _componentsProps$root, _componentsProps$thum, _componentsProps$trac, _componentsProps$valu;
  const props = useThemeProps2({
    props: inputProps,
    name: "MuiSlider"
  });
  const theme = useTheme4();
  const isRtl = theme.direction === "rtl";
  const {
    component = "span",
    components = {},
    componentsProps = {},
    color: color2 = "primary",
    size = "medium"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded42);
  const ownerState = _extends({}, props, {
    color: color2,
    size
  });
  const classes = extendUtilityClasses(ownerState);
  return e2(SliderUnstyled_default, _extends({}, other, {
    isRtl,
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
      root: _extends({}, componentsProps.root, shouldSpreadAdditionalProps_default(components.Root) && {
        as: component,
        ownerState: _extends({}, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.ownerState, {
          color: color2,
          size
        })
      }),
      thumb: _extends({}, componentsProps.thumb, shouldSpreadAdditionalProps_default(components.Thumb) && {
        ownerState: _extends({}, (_componentsProps$thum = componentsProps.thumb) == null ? void 0 : _componentsProps$thum.ownerState, {
          color: color2,
          size
        })
      }),
      track: _extends({}, componentsProps.track, shouldSpreadAdditionalProps_default(components.Track) && {
        ownerState: _extends({}, (_componentsProps$trac = componentsProps.track) == null ? void 0 : _componentsProps$trac.ownerState, {
          color: color2,
          size
        })
      }),
      valueLabel: _extends({}, componentsProps.valueLabel, shouldSpreadAdditionalProps_default(components.ValueLabel) && {
        ownerState: _extends({}, (_componentsProps$valu = componentsProps.valueLabel) == null ? void 0 : _componentsProps$valu.ownerState, {
          color: color2,
          size
        })
      })
    }),
    classes,
    ref
  }));
});
false ? Slider.propTypes = {
  "aria-label": chainPropTypes(import_prop_types48.default.string, (props) => {
    const range = Array.isArray(props.value || props.defaultValue);
    if (range && props["aria-label"] != null) {
      return new Error("MUI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.");
    }
    return null;
  }),
  "aria-labelledby": import_prop_types48.default.string,
  "aria-valuetext": chainPropTypes(import_prop_types48.default.string, (props) => {
    const range = Array.isArray(props.value || props.defaultValue);
    if (range && props["aria-valuetext"] != null) {
      return new Error("MUI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.");
    }
    return null;
  }),
  children: import_prop_types48.default.node,
  classes: import_prop_types48.default.object,
  color: import_prop_types48.default.oneOfType([import_prop_types48.default.oneOf(["primary", "secondary"]), import_prop_types48.default.string]),
  components: import_prop_types48.default.shape({
    Input: import_prop_types48.default.elementType,
    Mark: import_prop_types48.default.elementType,
    MarkLabel: import_prop_types48.default.elementType,
    Rail: import_prop_types48.default.elementType,
    Root: import_prop_types48.default.elementType,
    Thumb: import_prop_types48.default.elementType,
    Track: import_prop_types48.default.elementType,
    ValueLabel: import_prop_types48.default.elementType
  }),
  componentsProps: import_prop_types48.default.shape({
    input: import_prop_types48.default.object,
    mark: import_prop_types48.default.object,
    markLabel: import_prop_types48.default.object,
    rail: import_prop_types48.default.object,
    root: import_prop_types48.default.object,
    thumb: import_prop_types48.default.object,
    track: import_prop_types48.default.object,
    valueLabel: import_prop_types48.default.shape({
      className: import_prop_types48.default.string,
      components: import_prop_types48.default.shape({
        Root: import_prop_types48.default.elementType
      }),
      style: import_prop_types48.default.object,
      value: import_prop_types48.default.oneOfType([import_prop_types48.default.arrayOf(import_prop_types48.default.number), import_prop_types48.default.number]),
      valueLabelDisplay: import_prop_types48.default.oneOf(["auto", "off", "on"])
    })
  }),
  defaultValue: import_prop_types48.default.oneOfType([import_prop_types48.default.arrayOf(import_prop_types48.default.number), import_prop_types48.default.number]),
  disabled: import_prop_types48.default.bool,
  disableSwap: import_prop_types48.default.bool,
  getAriaLabel: import_prop_types48.default.func,
  getAriaValueText: import_prop_types48.default.func,
  isRtl: import_prop_types48.default.bool,
  marks: import_prop_types48.default.oneOfType([import_prop_types48.default.arrayOf(import_prop_types48.default.shape({
    label: import_prop_types48.default.node,
    value: import_prop_types48.default.number.isRequired
  })), import_prop_types48.default.bool]),
  max: import_prop_types48.default.number,
  min: import_prop_types48.default.number,
  name: import_prop_types48.default.string,
  onChange: import_prop_types48.default.func,
  onChangeCommitted: import_prop_types48.default.func,
  orientation: import_prop_types48.default.oneOf(["horizontal", "vertical"]),
  scale: import_prop_types48.default.func,
  size: import_prop_types48.default.oneOfType([import_prop_types48.default.oneOf(["small", "medium"]), import_prop_types48.default.string]),
  step: import_prop_types48.default.number,
  sx: import_prop_types48.default.oneOfType([import_prop_types48.default.arrayOf(import_prop_types48.default.oneOfType([import_prop_types48.default.func, import_prop_types48.default.object, import_prop_types48.default.bool])), import_prop_types48.default.func, import_prop_types48.default.object]),
  tabIndex: import_prop_types48.default.number,
  track: import_prop_types48.default.oneOf(["inverted", "normal", false]),
  value: import_prop_types48.default.oneOfType([import_prop_types48.default.arrayOf(import_prop_types48.default.number), import_prop_types48.default.number]),
  valueLabelDisplay: import_prop_types48.default.oneOf(["auto", "off", "on"]),
  valueLabelFormat: import_prop_types48.default.oneOfType([import_prop_types48.default.func, import_prop_types48.default.string])
} : void 0;
var Slider_default = Slider;

// ../../node_modules/@mui/material/utils/createSvgIcon.js
import * as React77 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/material/SvgIcon/SvgIcon.js
var import_prop_types49 = __toESM(require_prop_types());
import * as React76 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/material/SvgIcon/svgIconClasses.js
function getSvgIconUtilityClass(slot) {
  return generateUtilityClass("MuiSvgIcon", slot);
}
var svgIconClasses = generateUtilityClasses("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);

// ../../node_modules/@mui/material/SvgIcon/SvgIcon.js
var _excluded43 = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"];
var useUtilityClasses16 = (ownerState) => {
  const {
    color: color2,
    fontSize: fontSize2,
    classes
  } = ownerState;
  const slots = {
    root: ["root", color2 !== "inherit" && `color${capitalize_default(color2)}`, `fontSize${capitalize_default(fontSize2)}`]
  };
  return composeClasses(slots, getSvgIconUtilityClass, classes);
};
var SvgIconRoot = styled_default2("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.color !== "inherit" && styles2[`color${capitalize_default(ownerState.color)}`], styles2[`fontSize${capitalize_default(ownerState.fontSize)}`]];
  }
})(({
  theme,
  ownerState
}) => {
  var _theme$transitions, _theme$transitions$cr, _theme$transitions2, _theme$transitions2$d, _theme$typography, _theme$typography$pxT, _theme$typography2, _theme$typography2$px, _theme$typography3, _theme$typography3$px, _theme$palette$ownerS, _theme$palette, _theme$palette$ownerS2, _theme$palette2, _theme$palette2$actio, _theme$palette3, _theme$palette3$actio;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    fill: "currentColor",
    flexShrink: 0,
    transition: (_theme$transitions = theme.transitions) == null ? void 0 : (_theme$transitions$cr = _theme$transitions.create) == null ? void 0 : _theme$transitions$cr.call(_theme$transitions, "fill", {
      duration: (_theme$transitions2 = theme.transitions) == null ? void 0 : (_theme$transitions2$d = _theme$transitions2.duration) == null ? void 0 : _theme$transitions2$d.shorter
    }),
    fontSize: {
      inherit: "inherit",
      small: ((_theme$typography = theme.typography) == null ? void 0 : (_theme$typography$pxT = _theme$typography.pxToRem) == null ? void 0 : _theme$typography$pxT.call(_theme$typography, 20)) || "1.25rem",
      medium: ((_theme$typography2 = theme.typography) == null ? void 0 : (_theme$typography2$px = _theme$typography2.pxToRem) == null ? void 0 : _theme$typography2$px.call(_theme$typography2, 24)) || "1.5rem",
      large: ((_theme$typography3 = theme.typography) == null ? void 0 : (_theme$typography3$px = _theme$typography3.pxToRem) == null ? void 0 : _theme$typography3$px.call(_theme$typography3, 35)) || "2.1875"
    }[ownerState.fontSize],
    color: (_theme$palette$ownerS = (_theme$palette = theme.palette) == null ? void 0 : (_theme$palette$ownerS2 = _theme$palette[ownerState.color]) == null ? void 0 : _theme$palette$ownerS2.main) != null ? _theme$palette$ownerS : {
      action: (_theme$palette2 = theme.palette) == null ? void 0 : (_theme$palette2$actio = _theme$palette2.action) == null ? void 0 : _theme$palette2$actio.active,
      disabled: (_theme$palette3 = theme.palette) == null ? void 0 : (_theme$palette3$actio = _theme$palette3.action) == null ? void 0 : _theme$palette3$actio.disabled,
      inherit: void 0
    }[ownerState.color]
  };
});
var SvgIcon = React76.forwardRef(function SvgIcon2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiSvgIcon"
  });
  const {
    children: children2,
    className,
    color: color2 = "inherit",
    component = "svg",
    fontSize: fontSize2 = "medium",
    htmlColor,
    inheritViewBox = false,
    titleAccess,
    viewBox = "0 0 24 24"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded43);
  const ownerState = _extends({}, props, {
    color: color2,
    component,
    fontSize: fontSize2,
    instanceFontSize: inProps.fontSize,
    inheritViewBox,
    viewBox
  });
  const more = {};
  if (!inheritViewBox) {
    more.viewBox = viewBox;
  }
  const classes = useUtilityClasses16(ownerState);
  return e2(SvgIconRoot, _extends({
    as: component,
    className: clsx_m_default(classes.root, className),
    ownerState,
    focusable: "false",
    color: htmlColor,
    "aria-hidden": titleAccess ? void 0 : true,
    role: titleAccess ? "img" : void 0,
    ref
  }, more, other, {
    children: [children2, titleAccess ? e2("title", {
      children: titleAccess
    }) : null]
  }));
});
false ? SvgIcon.propTypes = {
  children: import_prop_types49.default.node,
  classes: import_prop_types49.default.object,
  className: import_prop_types49.default.string,
  color: import_prop_types49.default.oneOfType([import_prop_types49.default.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types49.default.string]),
  component: import_prop_types49.default.elementType,
  fontSize: import_prop_types49.default.oneOfType([import_prop_types49.default.oneOf(["inherit", "large", "medium", "small"]), import_prop_types49.default.string]),
  htmlColor: import_prop_types49.default.string,
  inheritViewBox: import_prop_types49.default.bool,
  shapeRendering: import_prop_types49.default.string,
  sx: import_prop_types49.default.oneOfType([import_prop_types49.default.arrayOf(import_prop_types49.default.oneOfType([import_prop_types49.default.func, import_prop_types49.default.object, import_prop_types49.default.bool])), import_prop_types49.default.func, import_prop_types49.default.object]),
  titleAccess: import_prop_types49.default.string,
  viewBox: import_prop_types49.default.string
} : void 0;
SvgIcon.muiName = "SvgIcon";
var SvgIcon_default = SvgIcon;

// ../../node_modules/@mui/material/utils/createSvgIcon.js
function createSvgIcon(path, displayName) {
  const Component = (props, ref) => e2(SvgIcon_default, _extends({
    "data-testid": `${displayName}Icon`,
    ref
  }, props, {
    children: path
  }));
  if (false) {
    Component.displayName = `${displayName}Icon`;
  }
  Component.muiName = SvgIcon_default.muiName;
  return React77.memo(React77.forwardRef(Component));
}

// js/mui.tsx
import { jsx } from "https://spike.land/dist/emotion.mjs";

// ../../node_modules/@mui/material/ToggleButton/ToggleButton.js
var import_prop_types50 = __toESM(require_prop_types());
import * as React78 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/material/ToggleButton/toggleButtonClasses.js
function getToggleButtonUtilityClass(slot) {
  return generateUtilityClass("MuiToggleButton", slot);
}
var toggleButtonClasses = generateUtilityClasses("MuiToggleButton", ["root", "disabled", "selected", "standard", "primary", "secondary", "sizeSmall", "sizeMedium", "sizeLarge"]);
var toggleButtonClasses_default = toggleButtonClasses;

// ../../node_modules/@mui/material/ToggleButton/ToggleButton.js
var _excluded44 = ["children", "className", "color", "disabled", "disableFocusRipple", "fullWidth", "onChange", "onClick", "selected", "size", "value"];
var useUtilityClasses17 = (ownerState) => {
  const {
    classes,
    fullWidth,
    selected,
    disabled,
    size,
    color: color2
  } = ownerState;
  const slots = {
    root: ["root", selected && "selected", disabled && "disabled", fullWidth && "fullWidth", `size${capitalize_default(size)}`, color2]
  };
  return composeClasses(slots, getToggleButtonUtilityClass, classes);
};
var ToggleButtonRoot = styled_default2(ButtonBase_default, {
  name: "MuiToggleButton",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, styles2[`size${capitalize_default(ownerState.size)}`]];
  }
})(({
  theme,
  ownerState
}) => {
  const selectedColor = ownerState.color === "standard" ? theme.palette.text.primary : theme.palette[ownerState.color].main;
  return _extends({}, theme.typography.button, {
    borderRadius: theme.shape.borderRadius,
    padding: 11,
    border: `1px solid ${theme.palette.divider}`,
    color: theme.palette.action.active
  }, ownerState.fullWidth && {
    width: "100%"
  }, {
    [`&.${toggleButtonClasses_default.disabled}`]: {
      color: theme.palette.action.disabled,
      border: `1px solid ${theme.palette.action.disabledBackground}`
    },
    "&:hover": {
      textDecoration: "none",
      backgroundColor: alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    },
    [`&.${toggleButtonClasses_default.selected}`]: {
      color: selectedColor,
      backgroundColor: alpha(selectedColor, theme.palette.action.selectedOpacity),
      "&:hover": {
        backgroundColor: alpha(selectedColor, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
        "@media (hover: none)": {
          backgroundColor: alpha(selectedColor, theme.palette.action.selectedOpacity)
        }
      }
    }
  }, ownerState.size === "small" && {
    padding: 7,
    fontSize: theme.typography.pxToRem(13)
  }, ownerState.size === "large" && {
    padding: 15,
    fontSize: theme.typography.pxToRem(15)
  });
});
var ToggleButton = React78.forwardRef(function ToggleButton2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiToggleButton"
  });
  const {
    children: children2,
    className,
    color: color2 = "standard",
    disabled = false,
    disableFocusRipple = false,
    fullWidth = false,
    onChange,
    onClick,
    selected,
    size = "medium",
    value
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded44);
  const ownerState = _extends({}, props, {
    color: color2,
    disabled,
    disableFocusRipple,
    fullWidth,
    size
  });
  const classes = useUtilityClasses17(ownerState);
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
  return e2(ToggleButtonRoot, _extends({
    className: clsx_m_default(classes.root, className),
    disabled,
    focusRipple: !disableFocusRipple,
    ref,
    onClick: handleChange,
    onChange,
    value,
    ownerState,
    "aria-pressed": selected
  }, other, {
    children: children2
  }));
});
false ? ToggleButton.propTypes = {
  children: import_prop_types50.default.node,
  classes: import_prop_types50.default.object,
  className: import_prop_types50.default.string,
  color: import_prop_types50.default.oneOfType([import_prop_types50.default.oneOf(["standard", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types50.default.string]),
  disabled: import_prop_types50.default.bool,
  disableFocusRipple: import_prop_types50.default.bool,
  disableRipple: import_prop_types50.default.bool,
  fullWidth: import_prop_types50.default.bool,
  onChange: import_prop_types50.default.func,
  onClick: import_prop_types50.default.func,
  selected: import_prop_types50.default.bool,
  size: import_prop_types50.default.oneOfType([import_prop_types50.default.oneOf(["small", "medium", "large"]), import_prop_types50.default.string]),
  sx: import_prop_types50.default.oneOfType([import_prop_types50.default.arrayOf(import_prop_types50.default.oneOfType([import_prop_types50.default.func, import_prop_types50.default.object, import_prop_types50.default.bool])), import_prop_types50.default.func, import_prop_types50.default.object]),
  value: import_prop_types50.default.any.isRequired
} : void 0;
var ToggleButton_default = ToggleButton;

// ../../node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroup.js
var import_react_is3 = __toESM(require_react_is());
var import_prop_types51 = __toESM(require_prop_types());
import * as React79 from "https://spike.land/dist/react.mjs";

// ../../node_modules/@mui/material/ToggleButtonGroup/isValueSelected.js
function isValueSelected(value, candidate) {
  if (candidate === void 0 || value === void 0) {
    return false;
  }
  if (Array.isArray(candidate)) {
    return candidate.indexOf(value) >= 0;
  }
  return value === candidate;
}

// ../../node_modules/@mui/material/ToggleButtonGroup/toggleButtonGroupClasses.js
function getToggleButtonGroupUtilityClass(slot) {
  return generateUtilityClass("MuiToggleButtonGroup", slot);
}
var toggleButtonGroupClasses = generateUtilityClasses("MuiToggleButtonGroup", ["root", "selected", "vertical", "disabled", "grouped", "groupedHorizontal", "groupedVertical"]);
var toggleButtonGroupClasses_default = toggleButtonGroupClasses;

// ../../node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroup.js
var _excluded45 = ["children", "className", "color", "disabled", "exclusive", "fullWidth", "onChange", "orientation", "size", "value"];
var useUtilityClasses18 = (ownerState) => {
  const {
    classes,
    orientation,
    fullWidth,
    disabled
  } = ownerState;
  const slots = {
    root: ["root", orientation === "vertical" && "vertical", fullWidth && "fullWidth"],
    grouped: ["grouped", `grouped${capitalize_default(orientation)}`, disabled && "disabled"]
  };
  return composeClasses(slots, getToggleButtonGroupUtilityClass, classes);
};
var ToggleButtonGroupRoot = styled_default2("div", {
  name: "MuiToggleButtonGroup",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${toggleButtonGroupClasses_default.grouped}`]: styles2.grouped
    }, {
      [`& .${toggleButtonGroupClasses_default.grouped}`]: styles2[`grouped${capitalize_default(ownerState.orientation)}`]
    }, styles2.root, ownerState.orientation === "vertical" && styles2.vertical, ownerState.fullWidth && styles2.fullWidth];
  }
})(({
  ownerState,
  theme
}) => _extends({
  display: "inline-flex",
  borderRadius: theme.shape.borderRadius
}, ownerState.orientation === "vertical" && {
  flexDirection: "column"
}, ownerState.fullWidth && {
  width: "100%"
}, {
  [`& .${toggleButtonGroupClasses_default.grouped}`]: _extends({}, ownerState.orientation === "horizontal" ? {
    "&:not(:first-of-type)": {
      marginLeft: -1,
      borderLeft: "1px solid transparent",
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    },
    "&:not(:last-of-type)": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    },
    [`&.${toggleButtonGroupClasses_default.selected} + .${toggleButtonGroupClasses_default.grouped}.${toggleButtonGroupClasses_default.selected}`]: {
      borderLeft: 0,
      marginLeft: 0
    }
  } : {
    "&:not(:first-of-type)": {
      marginTop: -1,
      borderTop: "1px solid transparent",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    },
    "&:not(:last-of-type)": {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
    [`&.${toggleButtonGroupClasses_default.selected} + .${toggleButtonGroupClasses_default.grouped}.${toggleButtonGroupClasses_default.selected}`]: {
      borderTop: 0,
      marginTop: 0
    }
  })
}));
var ToggleButtonGroup = React79.forwardRef(function ToggleButtonGroup2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiToggleButtonGroup"
  });
  const {
    children: children2,
    className,
    color: color2 = "standard",
    disabled = false,
    exclusive = false,
    fullWidth = false,
    onChange,
    orientation = "horizontal",
    size = "medium",
    value
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded45);
  const ownerState = _extends({}, props, {
    disabled,
    fullWidth,
    orientation,
    size
  });
  const classes = useUtilityClasses18(ownerState);
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
  return e2(ToggleButtonGroupRoot, _extends({
    role: "group",
    className: clsx_m_default(classes.root, className),
    ref,
    ownerState
  }, other, {
    children: React79.Children.map(children2, (child) => {
      if (!React79.isValidElement(child)) {
        return null;
      }
      if (false) {
        if ((0, import_react_is3.isFragment)(child)) {
          console.error(["MUI: The ToggleButtonGroup component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join("\n"));
        }
      }
      return React79.cloneElement(child, {
        className: clsx_m_default(classes.grouped, child.props.className),
        onChange: exclusive ? handleExclusiveChange : handleChange,
        selected: child.props.selected === void 0 ? isValueSelected(child.props.value, value) : child.props.selected,
        size: child.props.size || size,
        fullWidth,
        color: child.props.color || color2,
        disabled: child.props.disabled || disabled
      });
    })
  }));
});
false ? ToggleButtonGroup.propTypes = {
  children: import_prop_types51.default.node,
  classes: import_prop_types51.default.object,
  className: import_prop_types51.default.string,
  color: import_prop_types51.default.oneOfType([import_prop_types51.default.oneOf(["standard", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types51.default.string]),
  disabled: import_prop_types51.default.bool,
  exclusive: import_prop_types51.default.bool,
  fullWidth: import_prop_types51.default.bool,
  onChange: import_prop_types51.default.func,
  orientation: import_prop_types51.default.oneOf(["horizontal", "vertical"]),
  size: import_prop_types51.default.oneOfType([import_prop_types51.default.oneOf(["small", "medium", "large"]), import_prop_types51.default.string]),
  sx: import_prop_types51.default.oneOfType([import_prop_types51.default.arrayOf(import_prop_types51.default.oneOfType([import_prop_types51.default.func, import_prop_types51.default.object, import_prop_types51.default.bool])), import_prop_types51.default.func, import_prop_types51.default.object]),
  value: import_prop_types51.default.any
} : void 0;
var ToggleButtonGroup_default = ToggleButtonGroup;

// js/mui.tsx
var FullscreenIcon = createSvgIcon(jsx("path", {
  d: "M17 4h5v5h-2V6h-3V4zM4 9V6h3V4H2v5h2zm16 6v3h-3v2h5v-5h-2zM7 18H4v-3H2v5h5v-2zM18 8H6v8h12V8z"
}), "Fullscreen");
var Phone = createSvgIcon(jsx("path", {
  key: "12",
  d: "M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z"
}), "PhoneAndroid");
var MyButton = ({ onClick, children: children2 }) => jsx(Button_default, {
  variant: "contained",
  color: "primary",
  onClick
}, children2);
var Share = createSvgIcon(jsx("path", {
  key: "12",
  d: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
}), "Share");
var Tablet = createSvgIcon(jsx("path", {
  key: "12",
  d: "M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z"
}), "TabletAndroid");
var Tv = createSvgIcon(jsx("path", {
  key: "12",
  d: "M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"
}), "Tv");
var MyFsb = ({ onClick, children: children2 }) => jsx(Fab_default, {
  variant: "extended",
  color: "primary",
  onClick
}, children2);
var QrCode = createSvgIcon(jsx("path", {
  key: "12",
  d: "M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm8-12v8h8V3h-8zm6 6h-4V5h4v4zm0 10h2v2h-2zm-6-6h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm2 2h2v2h-2zm2-2h2v2h-2zm0-4h2v2h-2zm2 2h2v2h-2z"
}), "QrCode");

// js/Qr.tsx
var QR = ({ url }) => {
  const canvasRef = useRef28(null);
  useEffect28(() => {
    const load = () => {
      const options = {
        size: 200,
        element: canvasRef.current,
        foregroundAlpha: 0.9,
        foreground: "white",
        backgroundAlpha: 1,
        padding: 16,
        background: "#1e1e1e",
        value: url
      };
      new n0(options);
    };
    load();
  }, [url]);
  return jsx2("canvas", {
    css: css2`
        border-radius: 16px;
        margin-bottom: 8px;
  `,
    ref: canvasRef
  });
};
var QRButton = ({ url }) => {
  const [showQR, setQR] = useState23(false);
  return jsx2(motion.div, {
    animate: {
      width: showQR ? 200 : 56,
      height: showQR ? 220 : 48
    },
    onClick: (e3) => {
      setQR(!showQR);
    },
    css: css2`
                margin-bottom: 12px;
              `
  }, showQR ? jsx2(QR, {
    key: url,
    url: url + "/edit/"
  }) : jsx2(MyFsb, {
    onClick: () => {
      setQR(!showQR);
    }
  }, jsx2(QrCode, null)));
};

// js/DraggableWindow.tsx
var Button3 = MyButton;
var ToggleButtonGroup3 = ToggleButtonGroup_default;
var ToggleButton3 = ToggleButton_default;
var breakPoints = [680, 768, 1920];
var breakPointHeights = [1137, 1024, 1080];
var sizes = [10, 25, 50, 75, 100, 150];
var bg = `rgba(${Math.random() * 128 + 64}, ${Math.random() * 128 + 64}, ${Math.random() * 128 + 64}, ${!navigator.userAgent.includes("Firefox") ? 0.3 : 0.7})`;
var DraggableWindow = ({
  onShare,
  onRestore,
  session,
  keepFullScreen,
  children: children2
}) => {
  const [isStable, setIsStable] = useState24(false);
  const [scaleRange, changeScaleRange] = useState24(100);
  const [childArray, setChild] = useState24([children2]);
  const startPositions = { bottom: 0, right: 0 };
  session.setChild = setChild;
  const [qrUrl, setQRUrl] = useState24(session.url);
  const [errorText, setErrorText] = useState24("");
  const [{ bottom: bottom3, right: right3 }, setPositions] = useState24(startPositions);
  const [width2, setWidth] = useState24(window.innerWidth * devicePixelRatio);
  const [height2, setHeight] = useState24(window.innerHeight * devicePixelRatio);
  const ref = useRef29(null);
  const zbody = useRef29(null);
  const [forcedIndie, setForcedIndie] = useState24(0);
  const child = childArray[childArray.length - 1 - forcedIndie];
  useEffect29(() => {
    const handler = setInterval(async () => {
      if (errorText !== session.errorText) {
        const newError = session.errorText;
        setErrorText(newError);
        setIsStable(false);
        if (session.errorText === newError) {
          setIsStable(true);
        }
      }
      if (qrUrl !== session.url) {
        setQRUrl(session.url);
      }
    }, 200);
    return () => {
      clearInterval(handler);
    };
  }, [setErrorText, setQRUrl, errorText, qrUrl]);
  const scale = scaleRange / 100;
  const [isFullScreen, setFullScreen] = useState24(true);
  useEffect29(() => {
    if (forcedIndie > 0) {
      setTimeout(() => {
        setForcedIndie((f2) => f2 - 1);
      }, 100);
    }
  }, [forcedIndie, childArray]);
  useEffect29(() => {
    const reveal = async () => {
      if (keepFullScreen) {
        return;
      }
      setPositions({
        bottom: window.innerHeight * 0.2,
        right: window.innerWidth * 0.2
      });
      if (window.innerWidth / devicePixelRatio < 600) {
        changeScaleRange(50);
        setWidth(breakPoints[0]);
        setHeight(breakPointHeights[0]);
      }
      if (window.innerWidth / devicePixelRatio < 1200) {
        changeScaleRange(75);
        setWidth(breakPoints[0]);
        setHeight(breakPointHeights[0]);
      } else if (window.innerWidth / devicePixelRatio < 1800) {
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);
        changeScaleRange(50);
      } else if (window.innerWidth / devicePixelRatio < 2500) {
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);
        changeScaleRange(75);
      } else if (window.innerWidth / devicePixelRatio > 2500) {
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);
        changeScaleRange(100);
      }
      setPositions({
        bottom: 20,
        right: 20
      });
      setFullScreen(false);
      requestAnimationFrame(() => document.querySelector("#root")?.remove());
    };
    reveal();
  }, []);
  if (isFullScreen) {
    return jsx3("div", {
      css: css3`
          z-index: 10;
          width: 100%;
          height: 100%;
  `
    }, child);
  }
  const internal = jsx3("div", {
    css: css3` 
              display: flex;
              
                `
  }, jsx3("div", {
    css: css3`
            display: flex;
            flex-direction: column;
            align-items: center;
          `
  }, jsx3(ToggleButtonGroup3, {
    value: scaleRange,
    size: "small",
    exclusive: true,
    onChange: (_e2, newScale) => {
      newScale && changeScaleRange(newScale);
    }
  }, sizes.map((size) => jsx3(ToggleButton3, {
    key: size,
    value: size
  }, jsx3("span", {
    css: css3`
                       color: ${size === scaleRange ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                       `
  }, size, "%")))), jsx3(motion2.div, {
    initial: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    animate: {
      width: width2 * scale / devicePixelRatio,
      height: height2 * scale / devicePixelRatio,
      borderRadius: isFullScreen ? 0 : 8
    },
    css: css3`
                width: ${width2 * scale / devicePixelRatio};
                height: ${height2 * scale / devicePixelRatio};
                display: block;
                overflow: hidden;


                /* background-color: red; */
            `
  }, errorText && errorText.trim() !== "" && jsx3("pre", {
    css: css3`
                    position: absolute;
                    z-index:3;
                    color: rgb(255, 240, 240);
                    padding: 24px;
                    font-size: 14pt;
                    background-color: rgb(255, 0, 0);
                    flex: 0 0 auto;
                    overflow: auto;
                    margin: 0;
                    font-family: monospace;
                    white-space: pre-wrap;
                `
  }, isStable && errorText && errorText.trim(), isStable && errorText && errorText.trim() !== "" && jsx3("div", {
    css: css3`
                          text-align: right;
                        `
  }, jsx3(Button3, {
    onClick: () => {
      onRestore();
      setErrorText("");
    }
  }, jsx3("span", null, "Restore")))), jsx3(motion2.div, {
    initial: {
      transformOrigin: "0px 0px",
      width: window.innerWidth / devicePixelRatio,
      height: window.innerHeight / devicePixelRatio,
      scale: scaleRange / 100
    },
    animate: {
      transformOrigin: "0px 0px",
      width: width2 / devicePixelRatio,
      height: height2 / devicePixelRatio,
      scale: scaleRange / 100
    },
    css: css3`
                  overflow:overlay;
                  overflow-y: hidden;
                  >div{
                    width:100%;
                    height:100%;
                    overflow: overlay;
                    background: white;
                  }
              `
  }, errorText ? jsx3("div", {
    id: "zbody",
    css: `${session.css}`,
    dangerouslySetInnerHTML: createMarkup(session.html)
  }) : jsx3("div", {
    id: "zbody",
    key: session.i,
    ref: zbody,
    css: css3`
                        height: 100%;
                      `
  }, child), " ")), jsx3(ToggleButtonGroup3, {
    value: width2,
    size: "small",
    exclusive: true,
    onChange: (_e2, newSize) => {
      if (newSize) {
        setHeight(breakPointHeights[breakPoints.indexOf(newSize)]);
        setWidth(newSize);
      }
    }
  }, breakPoints.map((size) => jsx3(ToggleButton3, {
    key: `size-${size}`,
    value: size
  }, size === 680 ? jsx3(Phone, {
    css: css3`
                        color: ${width2 === 680 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `
  }) : size === 768 ? jsx3(Tablet, {
    css: css3`
                        color: ${width2 === 768 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `
  }) : jsx3(Tv, {
    css: css3`
                        color: ${width2 === 1920 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                      `
  }))))), jsx3("div", {
    css: css3`
              display: flex;
              align-items: center;          
              flex-direction: column;
              padding: 16px;
              `
  }, jsx3(MyFsb, {
    key: "fullscreen",
    onClick: () => {
      setFullScreen(true);
    }
  }, jsx3(FullscreenIcon, {
    key: "fs"
  })), jsx3(QRButton, {
    url: qrUrl,
    key: "QRButton"
  }), jsx3(MyFsb, {
    key: "Share",
    onClick: () => {
      onShare();
    }
  }, jsx3(Share, null)), jsx3(Box_default2, {
    css: css3`
          max-height: 400px;
          min-height: 200px;
          margin-top: 20px;
        `
  }, jsx3(Slider_default, {
    sx: {
      '& input[type="range"]': {
        WebkitAppearance: "slider-vertical"
      }
    },
    max: 0,
    min: 0 - childArray.length,
    orientation: "vertical",
    defaultValue: 0 - forcedIndie,
    value: 0 - forcedIndie,
    onChange: (_3, v) => setForcedIndie(0 - Number(v)),
    "aria-label": "Temperature",
    onKeyDown: () => {
    }
  }))));
  return jsx3(motion2.div, {
    ref,
    initial: { padding: 0, bottom: 0, right: 0 },
    animate: {
      bottom: bottom3,
      padding: 8,
      right: right3
    },
    css: css3`
            background-color:${bg};
            backdrop-filter: blur(15px);
            border-radius: 16px;
            z-index: 10;
            white-space: normal;
            position: fixed;
          `,
    dragElastic: 0.5,
    dragConstraints: {
      left: 0,
      right: width2 - 20 - width2 / 6,
      bottom: innerHeight
    },
    dragMomentum: false,
    drag: !isFullScreen
  }, internal);
};
function createMarkup(__html) {
  return { __html };
}
export {
  DraggableWindow
};

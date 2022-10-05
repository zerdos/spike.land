import {
  applyPatch,
  hashCode,
  mST,
  makePatch,
  makePatchFrom,
  onSessionUpdate,
  patchSync,
  startSession
} from "./chunk-chunk-BZGN6OHY.mjs";
import {
  LazyMotion,
  domAnimation,
  domMax,
  m,
  motion
} from "./chunk-chunk-6KADH7SY.mjs";
import {
  require_emotion_react_jsx_runtime_cjs
} from "./chunk-chunk-M7HCKVPP.mjs";
import {
  require_emotion_react_cjs
} from "./chunk-chunk-P57IUWTQ.mjs";
import {
  $,
  Children,
  PureComponent,
  Suspense,
  cloneElement,
  createRef,
  createRoot,
  h,
  init_react_preact,
  isValidElement,
  lazy,
  p,
  react_preact_default,
  useEffect,
  useMemo,
  useRef,
  useState
} from "./chunk-chunk-I34D7IAY.mjs";
import {
  __commonJS,
  __toESM,
  init_define_process
} from "./chunk-chunk-IA5ZPNWL.mjs";

// ../../../../../Users/z/.yarn/berry/cache/lodash.debounce-npm-4.0.8-f1d6e09799-9.zip/node_modules/lodash.debounce/index.js
var require_lodash = __commonJS({
  "../../../../../Users/z/.yarn/berry/cache/lodash.debounce-npm-4.0.8-f1d6e09799-9.zip/node_modules/lodash.debounce/index.js"(exports, module) {
    init_define_process();
    var FUNC_ERROR_TEXT = "Expected a function";
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var freeGlobal = typeof globalThis == "object" && globalThis && globalThis.Object === Object && globalThis;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    var nativeMax = Math.max;
    var nativeMin = Math.min;
    var now = function() {
      return root.Date.now();
    };
    function debounce2(func, wait2, options) {
      var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait2 = toNumber(wait2) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait2) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = void 0;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }
      function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait2);
        return leading ? invokeFunc(time) : result;
      }
      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait2 - timeSinceLastCall;
        return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
      }
      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return lastCallTime === void 0 || timeSinceLastCall >= wait2 || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
      }
      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
      }
      function trailingEdge(time) {
        timerId = void 0;
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = void 0;
        return result;
      }
      function cancel() {
        if (timerId !== void 0) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = void 0;
      }
      function flush() {
        return timerId === void 0 ? result : trailingEdge(now());
      }
      function debounced() {
        var time = now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
          if (timerId === void 0) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            timerId = setTimeout(timerExpired, wait2);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === void 0) {
          timerId = setTimeout(timerExpired, wait2);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = debounce2;
  }
});

// js/ws.ts
init_define_process();

// js/renderPreviewWindow.tsx
init_define_process();
init_react_preact();
init_react_preact();

// ../../.yarn/__virtual__/react-reverse-portal-virtual-1d0f51ed61/4/Users/z/.yarn/berry/cache/react-reverse-portal-npm-2.1.1-e50ec91de3-9.zip/node_modules/react-reverse-portal/dist/web/index.js
init_define_process();
init_react_preact();
init_react_preact();
var __extends = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p2 in b2)
        if (b2.hasOwnProperty(p2))
          d2[p2] = b2[p2];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var ELEMENT_TYPE_HTML = "html";
var ELEMENT_TYPE_SVG = "svg";
var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
var validateElementType = function(domElement, elementType) {
  if (elementType === ELEMENT_TYPE_HTML) {
    return domElement instanceof HTMLElement;
  }
  if (elementType === ELEMENT_TYPE_SVG) {
    return domElement instanceof SVGElement;
  }
  throw new Error('Unrecognized element type "' + elementType + '" for validateElementType.');
};
var createPortalNode = function(elementType, options) {
  var initialProps = {};
  var parent;
  var lastPlaceholder;
  var element;
  if (elementType === ELEMENT_TYPE_HTML) {
    element = document.createElement("div");
  } else if (elementType === ELEMENT_TYPE_SVG) {
    element = document.createElementNS(SVG_NAMESPACE, "g");
  } else {
    throw new Error('Invalid element type "' + elementType + '" for createPortalNode: must be "html" or "svg".');
  }
  if (options && typeof options === "object") {
    for (var _i = 0, _a = Object.entries(options.attributes); _i < _a.length; _i++) {
      var _b = _a[_i], key = _b[0], value = _b[1];
      element.setAttribute(key, value);
    }
  }
  var portalNode = {
    element,
    elementType,
    setPortalProps: function(props) {
      initialProps = props;
    },
    getInitialPortalProps: function() {
      return initialProps;
    },
    mount: function(newParent, newPlaceholder) {
      if (newPlaceholder === lastPlaceholder) {
        return;
      }
      portalNode.unmount();
      if (newParent !== parent) {
        if (!validateElementType(newParent, elementType)) {
          throw new Error('Invalid element type for portal: "' + elementType + '" portalNodes must be used with ' + elementType + " elements, but OutPortal is within <" + newParent.tagName + ">.");
        }
      }
      newParent.replaceChild(portalNode.element, newPlaceholder);
      parent = newParent;
      lastPlaceholder = newPlaceholder;
    },
    unmount: function(expectedPlaceholder) {
      if (expectedPlaceholder && expectedPlaceholder !== lastPlaceholder) {
        return;
      }
      if (parent && lastPlaceholder) {
        parent.replaceChild(lastPlaceholder, portalNode.element);
        parent = void 0;
        lastPlaceholder = void 0;
      }
    }
  };
  return portalNode;
};
var InPortal = function(_super) {
  __extends(InPortal2, _super);
  function InPortal2(props) {
    var _this = _super.call(this, props) || this;
    _this.addPropsChannel = function() {
      Object.assign(_this.props.node, {
        setPortalProps: function(props2) {
          _this.setState({ nodeProps: props2 });
        }
      });
    };
    _this.state = {
      nodeProps: _this.props.node.getInitialPortalProps()
    };
    return _this;
  }
  InPortal2.prototype.componentDidMount = function() {
    this.addPropsChannel();
  };
  InPortal2.prototype.componentDidUpdate = function() {
    this.addPropsChannel();
  };
  InPortal2.prototype.render = function() {
    var _this = this;
    var _a = this.props, children = _a.children, node = _a.node;
    return $(Children.map(children, function(child) {
      if (!isValidElement(child))
        return child;
      return cloneElement(child, _this.state.nodeProps);
    }), node.element);
  };
  return InPortal2;
}(PureComponent);
var OutPortal = function(_super) {
  __extends(OutPortal2, _super);
  function OutPortal2(props) {
    var _this = _super.call(this, props) || this;
    _this.placeholderNode = createRef();
    _this.passPropsThroughPortal();
    return _this;
  }
  OutPortal2.prototype.passPropsThroughPortal = function() {
    var propsForTarget = Object.assign({}, this.props, { node: void 0 });
    this.props.node.setPortalProps(propsForTarget);
  };
  OutPortal2.prototype.componentDidMount = function() {
    var node = this.props.node;
    this.currentPortalNode = node;
    var placeholder = this.placeholderNode.current;
    var parent = placeholder.parentNode;
    node.mount(parent, placeholder);
    this.passPropsThroughPortal();
  };
  OutPortal2.prototype.componentDidUpdate = function() {
    var node = this.props.node;
    if (this.currentPortalNode && node !== this.currentPortalNode) {
      this.currentPortalNode.unmount(this.placeholderNode.current);
      this.currentPortalNode.setPortalProps({});
      this.currentPortalNode = node;
    }
    var placeholder = this.placeholderNode.current;
    var parent = placeholder.parentNode;
    node.mount(parent, placeholder);
    this.passPropsThroughPortal();
  };
  OutPortal2.prototype.componentWillUnmount = function() {
    var node = this.props.node;
    node.unmount(this.placeholderNode.current);
    node.setPortalProps({});
  };
  OutPortal2.prototype.render = function() {
    return h("div", { ref: this.placeholderNode });
  };
  return OutPortal2;
}(PureComponent);
var createHtmlPortalNode = createPortalNode.bind(null, ELEMENT_TYPE_HTML);
var createSvgPortalNode = createPortalNode.bind(null, ELEMENT_TYPE_SVG);

// js/renderPreviewWindow.tsx
init_react_preact();

// js/starter.tsx
init_define_process();
var import_react2 = __toESM(require_emotion_react_cjs(), 1);

// js/ErrorBoundary.tsx
init_define_process();
init_react_preact();
var import_jsx_runtime = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var ErrorBoundary = class extends react_preact_default.Component {
  constructor(props) {
    super(props);
    this.state = { error: void 0, errorInfo: void 0 };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
  }
  render() {
    if (this.state.errorInfo) {
      return (0, import_jsx_runtime.jsxs)("div", {
        children: [
          (0, import_jsx_runtime.jsx)("h2", {
            children: "Something went wrong."
          }),
          (0, import_jsx_runtime.jsxs)("details", {
            style: { whiteSpace: "pre-wrap" },
            children: [
              this.state.error && this.state.error.toString(),
              (0, import_jsx_runtime.jsx)("br", {}),
              this.state.errorInfo.componentStack
            ]
          })
        ]
      });
    }
    return this.props.children || (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
  }
};
var ErrorBoundary_default = ErrorBoundary;

// js/md5.js
init_define_process();
function md5(inputString) {
  var hc = "0123456789abcdef";
  function rh(n) {
    var j, s = "";
    for (j = 0; j <= 3; j++) {
      s += hc.charAt(n >> j * 8 + 4 & 15) + hc.charAt(n >> j * 8 & 15);
    }
    return s;
  }
  function ad(x2, y) {
    var l = (x2 & 65535) + (y & 65535);
    var m2 = (x2 >> 16) + (y >> 16) + (l >> 16);
    return m2 << 16 | l & 65535;
  }
  function rl(n, c2) {
    return n << c2 | n >>> 32 - c2;
  }
  function cm(q, a2, b2, x2, s, t) {
    return ad(rl(ad(ad(a2, q), ad(x2, t)), s), b2);
  }
  function ff(a2, b2, c2, d2, x2, s, t) {
    return cm(b2 & c2 | ~b2 & d2, a2, b2, x2, s, t);
  }
  function gg(a2, b2, c2, d2, x2, s, t) {
    return cm(b2 & d2 | c2 & ~d2, a2, b2, x2, s, t);
  }
  function hh(a2, b2, c2, d2, x2, s, t) {
    return cm(b2 ^ c2 ^ d2, a2, b2, x2, s, t);
  }
  function ii(a2, b2, c2, d2, x2, s, t) {
    return cm(c2 ^ (b2 | ~d2), a2, b2, x2, s, t);
  }
  function sb(x2) {
    var i2;
    var nblk = (x2.length + 8 >> 6) + 1;
    var blks = new Array(nblk * 16);
    for (i2 = 0; i2 < nblk * 16; i2++)
      blks[i2] = 0;
    for (i2 = 0; i2 < x2.length; i2++) {
      blks[i2 >> 2] |= x2.charCodeAt(i2) << i2 % 4 * 8;
    }
    blks[i2 >> 2] |= 128 << i2 % 4 * 8;
    blks[nblk * 16 - 2] = x2.length * 8;
    return blks;
  }
  var i, x = sb(inputString), a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, olda, oldb, oldc, oldd;
  for (i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;
    a = ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = ff(c, d, a, b, x[i + 10], 17, -42063);
    b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = hh(a, b, c, d, x[i + 5], 4, -378558);
    d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = ad(a, olda);
    b = ad(b, oldb);
    c = ad(c, oldc);
    d = ad(d, oldd);
  }
  return rh(a) + rh(b) + rh(c) + rh(d);
}

// js/starter.tsx
init_react_preact();

// ../../../../../Users/z/.yarn/berry/cache/es-module-shims-npm-1.6.0-8c03442723-9.zip/node_modules/es-module-shims/dist/es-module-shims.js
init_define_process();
(function() {
  const hasWindow = typeof window !== "undefined";
  const hasDocument = typeof document !== "undefined";
  const noop = () => {
  };
  const optionsScript = hasDocument ? document.querySelector("script[type=esms-options]") : void 0;
  const esmsInitOptions = optionsScript ? JSON.parse(optionsScript.innerHTML) : {};
  Object.assign(esmsInitOptions, self.esmsInitOptions || {});
  let shimMode = hasDocument ? !!esmsInitOptions.shimMode : true;
  const importHook = globalHook(shimMode && esmsInitOptions.onimport);
  const resolveHook = globalHook(shimMode && esmsInitOptions.resolve);
  let fetchHook = esmsInitOptions.fetch ? globalHook(esmsInitOptions.fetch) : fetch;
  const metaHook = esmsInitOptions.meta ? globalHook(shimMode && esmsInitOptions.meta) : noop;
  const mapOverrides = esmsInitOptions.mapOverrides;
  let nonce = esmsInitOptions.nonce;
  if (!nonce && hasDocument) {
    const nonceElement = document.querySelector("script[nonce]");
    if (nonceElement)
      nonce = nonceElement.nonce || nonceElement.getAttribute("nonce");
  }
  const onerror = globalHook(esmsInitOptions.onerror || noop);
  const onpolyfill = esmsInitOptions.onpolyfill ? globalHook(esmsInitOptions.onpolyfill) : () => {
    console.log("%c^^ Module TypeError above is polyfilled and can be ignored ^^", "font-weight:900;color:#391");
  };
  const { revokeBlobURLs, noLoadEventRetriggers, enforceIntegrity } = esmsInitOptions;
  function globalHook(name) {
    return typeof name === "string" ? self[name] : name;
  }
  const enable = Array.isArray(esmsInitOptions.polyfillEnable) ? esmsInitOptions.polyfillEnable : [];
  const cssModulesEnabled = enable.includes("css-modules");
  const jsonModulesEnabled = enable.includes("json-modules");
  const edge = !navigator.userAgentData && !!navigator.userAgent.match(/Edge\/\d+\.\d+/);
  const baseUrl = hasDocument ? document.baseURI : `${location.protocol}//${location.host}${location.pathname.includes("/") ? location.pathname.slice(0, location.pathname.lastIndexOf("/") + 1) : location.pathname}`;
  const createBlob = (source, type = "text/javascript") => URL.createObjectURL(new Blob([source], { type }));
  let { skip } = esmsInitOptions;
  if (Array.isArray(skip)) {
    const l2 = skip.map((s2) => new URL(s2, baseUrl).href);
    skip = (s2) => l2.some((i2) => i2[i2.length - 1] === "/" && s2.startsWith(i2) || s2 === i2);
  } else if (typeof skip === "string") {
    const r2 = new RegExp(skip);
    skip = (s2) => s2.test(r2);
  }
  const eoop = (err) => setTimeout(() => {
    throw err;
  });
  const throwError = (err) => {
    (self.reportError || hasWindow && window.safari && console.error || eoop)(err), void onerror(err);
  };
  function fromParent(parent) {
    return parent ? ` imported from ${parent}` : "";
  }
  let importMapSrcOrLazy = false;
  function setImportMapSrcOrLazy() {
    importMapSrcOrLazy = true;
  }
  if (!shimMode) {
    if (document.querySelectorAll("script[type=module-shim],script[type=importmap-shim],link[rel=modulepreload-shim]").length) {
      shimMode = true;
    } else {
      let seenScript = false;
      for (const script of document.querySelectorAll("script[type=module],script[type=importmap]")) {
        if (!seenScript) {
          if (script.type === "module" && !script.ep)
            seenScript = true;
        } else if (script.type === "importmap" && seenScript) {
          importMapSrcOrLazy = true;
          break;
        }
      }
    }
  }
  const backslashRegEx = /\\/g;
  function isURL(url) {
    if (url.indexOf(":") === -1)
      return false;
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }
  function resolveUrl(relUrl, parentUrl) {
    return resolveIfNotPlainOrUrl(relUrl, parentUrl) || (isURL(relUrl) ? relUrl : resolveIfNotPlainOrUrl("./" + relUrl, parentUrl));
  }
  function resolveIfNotPlainOrUrl(relUrl, parentUrl) {
    const hIdx = parentUrl.indexOf("#"), qIdx = parentUrl.indexOf("?");
    if (hIdx + qIdx > -2)
      parentUrl = parentUrl.slice(0, hIdx === -1 ? qIdx : qIdx === -1 || qIdx > hIdx ? hIdx : qIdx);
    if (relUrl.indexOf("\\") !== -1)
      relUrl = relUrl.replace(backslashRegEx, "/");
    if (relUrl[0] === "/" && relUrl[1] === "/") {
      return parentUrl.slice(0, parentUrl.indexOf(":") + 1) + relUrl;
    } else if (relUrl[0] === "." && (relUrl[1] === "/" || relUrl[1] === "." && (relUrl[2] === "/" || relUrl.length === 2 && (relUrl += "/")) || relUrl.length === 1 && (relUrl += "/")) || relUrl[0] === "/") {
      const parentProtocol = parentUrl.slice(0, parentUrl.indexOf(":") + 1);
      let pathname;
      if (parentUrl[parentProtocol.length + 1] === "/") {
        if (parentProtocol !== "file:") {
          pathname = parentUrl.slice(parentProtocol.length + 2);
          pathname = pathname.slice(pathname.indexOf("/") + 1);
        } else {
          pathname = parentUrl.slice(8);
        }
      } else {
        pathname = parentUrl.slice(parentProtocol.length + (parentUrl[parentProtocol.length] === "/"));
      }
      if (relUrl[0] === "/")
        return parentUrl.slice(0, parentUrl.length - pathname.length - 1) + relUrl;
      const segmented = pathname.slice(0, pathname.lastIndexOf("/") + 1) + relUrl;
      const output = [];
      let segmentIndex = -1;
      for (let i2 = 0; i2 < segmented.length; i2++) {
        if (segmentIndex !== -1) {
          if (segmented[i2] === "/") {
            output.push(segmented.slice(segmentIndex, i2 + 1));
            segmentIndex = -1;
          }
          continue;
        } else if (segmented[i2] === ".") {
          if (segmented[i2 + 1] === "." && (segmented[i2 + 2] === "/" || i2 + 2 === segmented.length)) {
            output.pop();
            i2 += 2;
            continue;
          } else if (segmented[i2 + 1] === "/" || i2 + 1 === segmented.length) {
            i2 += 1;
            continue;
          }
        }
        while (segmented[i2] === "/")
          i2++;
        segmentIndex = i2;
      }
      if (segmentIndex !== -1)
        output.push(segmented.slice(segmentIndex));
      return parentUrl.slice(0, parentUrl.length - pathname.length) + output.join("");
    }
  }
  function resolveAndComposeImportMap(json, baseUrl2, parentMap) {
    const outMap = { imports: Object.assign({}, parentMap.imports), scopes: Object.assign({}, parentMap.scopes) };
    if (json.imports)
      resolveAndComposePackages(json.imports, outMap.imports, baseUrl2, parentMap);
    if (json.scopes)
      for (let s2 in json.scopes) {
        const resolvedScope = resolveUrl(s2, baseUrl2);
        resolveAndComposePackages(json.scopes[s2], outMap.scopes[resolvedScope] || (outMap.scopes[resolvedScope] = {}), baseUrl2, parentMap);
      }
    return outMap;
  }
  function getMatch(path, matchObj) {
    if (matchObj[path])
      return path;
    let sepIndex = path.length;
    do {
      const segment = path.slice(0, sepIndex + 1);
      if (segment in matchObj)
        return segment;
    } while ((sepIndex = path.lastIndexOf("/", sepIndex - 1)) !== -1);
  }
  function applyPackages(id, packages) {
    const pkgName = getMatch(id, packages);
    if (pkgName) {
      const pkg = packages[pkgName];
      if (pkg === null)
        return;
      return pkg + id.slice(pkgName.length);
    }
  }
  function resolveImportMap(importMap2, resolvedOrPlain, parentUrl) {
    let scopeUrl = parentUrl && getMatch(parentUrl, importMap2.scopes);
    while (scopeUrl) {
      const packageResolution = applyPackages(resolvedOrPlain, importMap2.scopes[scopeUrl]);
      if (packageResolution)
        return packageResolution;
      scopeUrl = getMatch(scopeUrl.slice(0, scopeUrl.lastIndexOf("/")), importMap2.scopes);
    }
    return applyPackages(resolvedOrPlain, importMap2.imports) || resolvedOrPlain.indexOf(":") !== -1 && resolvedOrPlain;
  }
  function resolveAndComposePackages(packages, outPackages, baseUrl2, parentMap) {
    for (let p3 in packages) {
      const resolvedLhs = resolveIfNotPlainOrUrl(p3, baseUrl2) || p3;
      if ((!shimMode || !mapOverrides) && outPackages[resolvedLhs] && outPackages[resolvedLhs] !== packages[resolvedLhs]) {
        throw Error(`Rejected map override "${resolvedLhs}" from ${outPackages[resolvedLhs]} to ${packages[resolvedLhs]}.`);
      }
      let target = packages[p3];
      if (typeof target !== "string")
        continue;
      const mapped = resolveImportMap(parentMap, resolveIfNotPlainOrUrl(target, baseUrl2) || target, baseUrl2);
      if (mapped) {
        outPackages[resolvedLhs] = mapped;
        continue;
      }
      console.warn(`Mapping "${p3}" -> "${packages[p3]}" does not resolve`);
    }
  }
  let dynamicImport = !hasDocument && (0, eval)("u=>import(u)");
  let supportsDynamicImport;
  const dynamicImportCheck = hasDocument && new Promise((resolve2) => {
    const s2 = Object.assign(document.createElement("script"), {
      src: createBlob("self._d=u=>import(u)"),
      ep: true
    });
    s2.setAttribute("nonce", nonce);
    s2.addEventListener("load", () => {
      if (!(supportsDynamicImport = !!(dynamicImport = self._d))) {
        let err;
        window.addEventListener("error", (_err) => err = _err);
        dynamicImport = (url, opts) => new Promise((resolve3, reject) => {
          const s3 = Object.assign(document.createElement("script"), {
            type: "module",
            src: createBlob(`import*as m from'${url}';self._esmsi=m`)
          });
          err = void 0;
          s3.ep = true;
          if (nonce)
            s3.setAttribute("nonce", nonce);
          s3.addEventListener("error", cb);
          s3.addEventListener("load", cb);
          function cb(_err) {
            document.head.removeChild(s3);
            if (self._esmsi) {
              resolve3(self._esmsi, baseUrl);
              self._esmsi = void 0;
            } else {
              reject(!(_err instanceof Event) && _err || err && err.error || new Error(`Error loading ${opts && opts.errUrl || url} (${s3.src}).`));
              err = void 0;
            }
          }
          document.head.appendChild(s3);
        });
      }
      document.head.removeChild(s2);
      delete self._d;
      resolve2();
    });
    document.head.appendChild(s2);
  });
  let supportsJsonAssertions = false;
  let supportsCssAssertions = false;
  let supportsImportMaps = hasDocument && HTMLScriptElement.supports ? HTMLScriptElement.supports("importmap") : false;
  let supportsImportMeta = supportsImportMaps;
  const importMetaCheck = "import.meta";
  const cssModulesCheck = `import"x"assert{type:"css"}`;
  const jsonModulesCheck = `import"x"assert{type:"json"}`;
  const featureDetectionPromise = Promise.resolve(dynamicImportCheck).then(() => {
    if (!supportsDynamicImport || supportsImportMaps && !cssModulesEnabled && !jsonModulesEnabled)
      return;
    if (!hasDocument)
      return Promise.all([
        supportsImportMaps || dynamicImport(createBlob(importMetaCheck)).then(() => supportsImportMeta = true, noop),
        cssModulesEnabled && dynamicImport(createBlob(cssModulesCheck.replace("x", createBlob("", "text/css")))).then(() => supportsCssAssertions = true, noop),
        jsonModulesEnabled && dynamicImport(createBlob(jsonModulescheck.replace("x", createBlob("{}", "text/json")))).then(() => supportsJsonAssertions = true, noop)
      ]);
    return new Promise((resolve2) => {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.setAttribute("nonce", nonce);
      function cb({ data: [a2, b2, c2, d] }) {
        supportsImportMaps = a2;
        supportsImportMeta = b2;
        supportsCssAssertions = c2;
        supportsJsonAssertions = d;
        resolve2();
        document.head.removeChild(iframe);
        window.removeEventListener("message", cb, false);
      }
      window.addEventListener("message", cb, false);
      const importMapTest = `<script nonce=${nonce || ""}>b=(s,type='text/javascript')=>URL.createObjectURL(new Blob([s],{type}));document.head.appendChild(Object.assign(document.createElement('script'),{type:'importmap',nonce:"${nonce}",innerText:\`{"imports":{"x":"\${b('')}"}}\`}));Promise.all([${supportsImportMaps ? "true,true" : `'x',b('${importMetaCheck}')`}, ${cssModulesEnabled ? `b('${cssModulesCheck}'.replace('x',b('','text/css')))` : "false"}, ${jsonModulesEnabled ? `b('${jsonModulesCheck}'.replace('x',b('{}','text/json')))` : "false"}].map(x =>typeof x==='string'?import(x).then(x =>!!x,()=>false):x)).then(a=>parent.postMessage(a,'*'))<${""}/script>`;
      iframe.onload = () => {
        const doc = iframe.contentDocument;
        if (doc && doc.head.childNodes.length === 0) {
          const s2 = doc.createElement("script");
          if (nonce)
            s2.setAttribute("nonce", nonce);
          s2.innerHTML = importMapTest.slice(15 + (nonce ? nonce.length : 0), -9);
          doc.head.appendChild(s2);
        }
      };
      document.head.appendChild(iframe);
      if ("srcdoc" in iframe)
        iframe.srcdoc = importMapTest;
      else
        iframe.contentDocument.write(importMapTest);
    });
  });
  let e, a, r, i = 2 << 19;
  const s = 1 === new Uint8Array(new Uint16Array([1]).buffer)[0] ? function(e2, a2) {
    const r2 = e2.length;
    let i2 = 0;
    for (; i2 < r2; )
      a2[i2] = e2.charCodeAt(i2++);
  } : function(e2, a2) {
    const r2 = e2.length;
    let i2 = 0;
    for (; i2 < r2; ) {
      const r3 = e2.charCodeAt(i2);
      a2[i2++] = (255 & r3) << 8 | r3 >>> 8;
    }
  }, t = "xportmportlassetafromssertvoyiedelecontininstantybreareturdebuggeawaithrwhileforifcatcfinallels";
  let c$1, f, n;
  function parse(l2, k2 = "@") {
    c$1 = l2, f = k2;
    const u2 = 2 * c$1.length + (2 << 18);
    if (u2 > i || !e) {
      for (; u2 > i; )
        i *= 2;
      a = new ArrayBuffer(i), s(t, new Uint16Array(a, 16, 95)), e = function(e2, a2, r2) {
        ;
        var i2 = new e2.Int8Array(r2), s2 = new e2.Int16Array(r2), t2 = new e2.Int32Array(r2), c2 = new e2.Uint8Array(r2), f2 = new e2.Uint16Array(r2), n2 = 1008;
        function b2(e3) {
          e3 = e3 | 0;
          var a3 = 0, r3 = 0, c3 = 0, b3 = 0, o3 = 0, w3 = 0;
          w3 = n2;
          n2 = n2 + 10240 | 0;
          i2[775] = 1;
          s2[385] = 0;
          s2[386] = 0;
          t2[62] = t2[2];
          i2[776] = 0;
          t2[61] = 0;
          i2[774] = 0;
          t2[63] = w3 + 2048;
          t2[64] = w3;
          i2[777] = 0;
          e3 = (t2[3] | 0) + -2 | 0;
          t2[65] = e3;
          a3 = e3 + (t2[59] << 1) | 0;
          t2[66] = a3;
          e:
            while (1) {
              r3 = e3 + 2 | 0;
              t2[65] = r3;
              if (e3 >>> 0 >= a3 >>> 0) {
                b3 = 18;
                break;
              }
              a:
                do {
                  switch (s2[r3 >> 1] | 0) {
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 32:
                      break;
                    case 101: {
                      if ((((s2[386] | 0) == 0 ? F(r3) | 0 : 0) ? (m2(e3 + 4 | 0, 16, 10) | 0) == 0 : 0) ? (l3(), (i2[775] | 0) == 0) : 0) {
                        b3 = 9;
                        break e;
                      } else
                        b3 = 17;
                      break;
                    }
                    case 105: {
                      if (F(r3) | 0 ? (m2(e3 + 4 | 0, 26, 10) | 0) == 0 : 0) {
                        k3();
                        b3 = 17;
                      } else
                        b3 = 17;
                      break;
                    }
                    case 59: {
                      b3 = 17;
                      break;
                    }
                    case 47:
                      switch (s2[e3 + 4 >> 1] | 0) {
                        case 47: {
                          E();
                          break a;
                        }
                        case 42: {
                          y(1);
                          break a;
                        }
                        default: {
                          b3 = 16;
                          break e;
                        }
                      }
                    default: {
                      b3 = 16;
                      break e;
                    }
                  }
                } while (0);
              if ((b3 | 0) == 17) {
                b3 = 0;
                t2[62] = t2[65];
              }
              e3 = t2[65] | 0;
              a3 = t2[66] | 0;
            }
          if ((b3 | 0) == 9) {
            e3 = t2[65] | 0;
            t2[62] = e3;
            b3 = 19;
          } else if ((b3 | 0) == 16) {
            i2[775] = 0;
            t2[65] = e3;
            b3 = 19;
          } else if ((b3 | 0) == 18)
            if (!(i2[774] | 0)) {
              e3 = r3;
              b3 = 19;
            } else
              e3 = 0;
          do {
            if ((b3 | 0) == 19) {
              e:
                while (1) {
                  a3 = e3 + 2 | 0;
                  t2[65] = a3;
                  c3 = a3;
                  if (e3 >>> 0 >= (t2[66] | 0) >>> 0) {
                    b3 = 82;
                    break;
                  }
                  a:
                    do {
                      switch (s2[a3 >> 1] | 0) {
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                        case 13:
                        case 32:
                          break;
                        case 101: {
                          if (((s2[386] | 0) == 0 ? F(a3) | 0 : 0) ? (m2(e3 + 4 | 0, 16, 10) | 0) == 0 : 0) {
                            l3();
                            b3 = 81;
                          } else
                            b3 = 81;
                          break;
                        }
                        case 105: {
                          if (F(a3) | 0 ? (m2(e3 + 4 | 0, 26, 10) | 0) == 0 : 0) {
                            k3();
                            b3 = 81;
                          } else
                            b3 = 81;
                          break;
                        }
                        case 99: {
                          if ((F(a3) | 0 ? (m2(e3 + 4 | 0, 36, 8) | 0) == 0 : 0) ? R(s2[e3 + 12 >> 1] | 0) | 0 : 0) {
                            i2[777] = 1;
                            b3 = 81;
                          } else
                            b3 = 81;
                          break;
                        }
                        case 40: {
                          c3 = t2[63] | 0;
                          a3 = s2[386] | 0;
                          b3 = a3 & 65535;
                          t2[c3 + (b3 << 3) >> 2] = 1;
                          r3 = t2[62] | 0;
                          s2[386] = a3 + 1 << 16 >> 16;
                          t2[c3 + (b3 << 3) + 4 >> 2] = r3;
                          b3 = 81;
                          break;
                        }
                        case 41: {
                          a3 = s2[386] | 0;
                          if (!(a3 << 16 >> 16)) {
                            b3 = 36;
                            break e;
                          }
                          a3 = a3 + -1 << 16 >> 16;
                          s2[386] = a3;
                          r3 = s2[385] | 0;
                          if (r3 << 16 >> 16 != 0 ? (o3 = t2[(t2[64] | 0) + ((r3 & 65535) + -1 << 2) >> 2] | 0, (t2[o3 + 20 >> 2] | 0) == (t2[(t2[63] | 0) + ((a3 & 65535) << 3) + 4 >> 2] | 0)) : 0) {
                            a3 = o3 + 4 | 0;
                            if (!(t2[a3 >> 2] | 0))
                              t2[a3 >> 2] = c3;
                            t2[o3 + 12 >> 2] = e3 + 4;
                            s2[385] = r3 + -1 << 16 >> 16;
                            b3 = 81;
                          } else
                            b3 = 81;
                          break;
                        }
                        case 123: {
                          b3 = t2[62] | 0;
                          c3 = t2[56] | 0;
                          e3 = b3;
                          do {
                            if ((s2[b3 >> 1] | 0) == 41 & (c3 | 0) != 0 ? (t2[c3 + 4 >> 2] | 0) == (b3 | 0) : 0) {
                              a3 = t2[57] | 0;
                              t2[56] = a3;
                              if (!a3) {
                                t2[52] = 0;
                                break;
                              } else {
                                t2[a3 + 28 >> 2] = 0;
                                break;
                              }
                            }
                          } while (0);
                          c3 = t2[63] | 0;
                          r3 = s2[386] | 0;
                          b3 = r3 & 65535;
                          t2[c3 + (b3 << 3) >> 2] = (i2[777] | 0) == 0 ? 2 : 6;
                          s2[386] = r3 + 1 << 16 >> 16;
                          t2[c3 + (b3 << 3) + 4 >> 2] = e3;
                          i2[777] = 0;
                          b3 = 81;
                          break;
                        }
                        case 125: {
                          e3 = s2[386] | 0;
                          if (!(e3 << 16 >> 16)) {
                            b3 = 49;
                            break e;
                          }
                          c3 = t2[63] | 0;
                          b3 = e3 + -1 << 16 >> 16;
                          s2[386] = b3;
                          if ((t2[c3 + ((b3 & 65535) << 3) >> 2] | 0) == 4) {
                            h4();
                            b3 = 81;
                          } else
                            b3 = 81;
                          break;
                        }
                        case 39: {
                          d2(39);
                          b3 = 81;
                          break;
                        }
                        case 34: {
                          d2(34);
                          b3 = 81;
                          break;
                        }
                        case 47:
                          switch (s2[e3 + 4 >> 1] | 0) {
                            case 47: {
                              E();
                              break a;
                            }
                            case 42: {
                              y(1);
                              break a;
                            }
                            default: {
                              e3 = t2[62] | 0;
                              c3 = s2[e3 >> 1] | 0;
                              r:
                                do {
                                  if (!(U(c3) | 0)) {
                                    switch (c3 << 16 >> 16) {
                                      case 41:
                                        if (z(t2[(t2[63] | 0) + (f2[386] << 3) + 4 >> 2] | 0) | 0) {
                                          b3 = 69;
                                          break r;
                                        } else {
                                          b3 = 66;
                                          break r;
                                        }
                                      case 125:
                                        break;
                                      default: {
                                        b3 = 66;
                                        break r;
                                      }
                                    }
                                    a3 = t2[63] | 0;
                                    r3 = f2[386] | 0;
                                    if (!(p3(t2[a3 + (r3 << 3) + 4 >> 2] | 0) | 0) ? (t2[a3 + (r3 << 3) >> 2] | 0) != 6 : 0)
                                      b3 = 66;
                                    else
                                      b3 = 69;
                                  } else
                                    switch (c3 << 16 >> 16) {
                                      case 46:
                                        if (((s2[e3 + -2 >> 1] | 0) + -48 & 65535) < 10) {
                                          b3 = 66;
                                          break r;
                                        } else {
                                          b3 = 69;
                                          break r;
                                        }
                                      case 43:
                                        if ((s2[e3 + -2 >> 1] | 0) == 43) {
                                          b3 = 66;
                                          break r;
                                        } else {
                                          b3 = 69;
                                          break r;
                                        }
                                      case 45:
                                        if ((s2[e3 + -2 >> 1] | 0) == 45) {
                                          b3 = 66;
                                          break r;
                                        } else {
                                          b3 = 69;
                                          break r;
                                        }
                                      default: {
                                        b3 = 69;
                                        break r;
                                      }
                                    }
                                } while (0);
                              r:
                                do {
                                  if ((b3 | 0) == 66) {
                                    b3 = 0;
                                    if (!(u3(e3) | 0)) {
                                      switch (c3 << 16 >> 16) {
                                        case 0: {
                                          b3 = 69;
                                          break r;
                                        }
                                        case 47: {
                                          if (i2[776] | 0) {
                                            b3 = 69;
                                            break r;
                                          }
                                          break;
                                        }
                                        default: {
                                        }
                                      }
                                      r3 = t2[3] | 0;
                                      a3 = c3;
                                      do {
                                        if (e3 >>> 0 <= r3 >>> 0)
                                          break;
                                        e3 = e3 + -2 | 0;
                                        t2[62] = e3;
                                        a3 = s2[e3 >> 1] | 0;
                                      } while (!(B(a3) | 0));
                                      if (D(a3) | 0) {
                                        do {
                                          if (e3 >>> 0 <= r3 >>> 0)
                                            break;
                                          e3 = e3 + -2 | 0;
                                          t2[62] = e3;
                                        } while (D(s2[e3 >> 1] | 0) | 0);
                                        if ($2(e3) | 0) {
                                          g();
                                          i2[776] = 0;
                                          b3 = 81;
                                          break a;
                                        } else
                                          e3 = 1;
                                      } else
                                        e3 = 1;
                                    } else
                                      b3 = 69;
                                  }
                                } while (0);
                              if ((b3 | 0) == 69) {
                                g();
                                e3 = 0;
                              }
                              i2[776] = e3;
                              b3 = 81;
                              break a;
                            }
                          }
                        case 96: {
                          c3 = t2[63] | 0;
                          r3 = s2[386] | 0;
                          b3 = r3 & 65535;
                          t2[c3 + (b3 << 3) + 4 >> 2] = t2[62];
                          s2[386] = r3 + 1 << 16 >> 16;
                          t2[c3 + (b3 << 3) >> 2] = 3;
                          h4();
                          b3 = 81;
                          break;
                        }
                        default:
                          b3 = 81;
                      }
                    } while (0);
                  if ((b3 | 0) == 81) {
                    b3 = 0;
                    t2[62] = t2[65];
                  }
                  e3 = t2[65] | 0;
                }
              if ((b3 | 0) == 36) {
                Q();
                e3 = 0;
                break;
              } else if ((b3 | 0) == 49) {
                Q();
                e3 = 0;
                break;
              } else if ((b3 | 0) == 82) {
                e3 = (i2[774] | 0) == 0 ? (s2[385] | s2[386]) << 16 >> 16 == 0 : 0;
                break;
              }
            }
          } while (0);
          n2 = w3;
          return e3 | 0;
        }
        function l3() {
          var e3 = 0, a3 = 0, r3 = 0, c3 = 0, f3 = 0, n3 = 0, b3 = 0;
          f3 = t2[65] | 0;
          n3 = t2[58] | 0;
          b3 = f3 + 12 | 0;
          t2[65] = b3;
          r3 = w2(1) | 0;
          e3 = t2[65] | 0;
          if (!((e3 | 0) == (b3 | 0) ? !(I(r3) | 0) : 0))
            c3 = 3;
          e:
            do {
              if ((c3 | 0) == 3) {
                a:
                  do {
                    switch (r3 << 16 >> 16) {
                      case 123: {
                        t2[65] = e3 + 2;
                        e3 = w2(1) | 0;
                        r3 = t2[65] | 0;
                        while (1) {
                          if (T(e3) | 0) {
                            d2(e3);
                            e3 = (t2[65] | 0) + 2 | 0;
                            t2[65] = e3;
                          } else {
                            P(e3) | 0;
                            e3 = t2[65] | 0;
                          }
                          w2(1) | 0;
                          e3 = v(r3, e3) | 0;
                          if (e3 << 16 >> 16 == 44) {
                            t2[65] = (t2[65] | 0) + 2;
                            e3 = w2(1) | 0;
                          }
                          a3 = r3;
                          r3 = t2[65] | 0;
                          if (e3 << 16 >> 16 == 125) {
                            c3 = 15;
                            break;
                          }
                          if ((r3 | 0) == (a3 | 0)) {
                            c3 = 12;
                            break;
                          }
                          if (r3 >>> 0 > (t2[66] | 0) >>> 0) {
                            c3 = 14;
                            break;
                          }
                        }
                        if ((c3 | 0) == 12) {
                          Q();
                          break e;
                        } else if ((c3 | 0) == 14) {
                          Q();
                          break e;
                        } else if ((c3 | 0) == 15) {
                          t2[65] = r3 + 2;
                          break a;
                        }
                        break;
                      }
                      case 42: {
                        t2[65] = e3 + 2;
                        w2(1) | 0;
                        b3 = t2[65] | 0;
                        v(b3, b3) | 0;
                        break;
                      }
                      default: {
                        i2[775] = 0;
                        switch (r3 << 16 >> 16) {
                          case 100: {
                            O(e3, e3 + 14 | 0, 0, 0);
                            break e;
                          }
                          case 97: {
                            t2[65] = e3 + 10;
                            w2(1) | 0;
                            e3 = t2[65] | 0;
                            c3 = 20;
                            break;
                          }
                          case 102: {
                            c3 = 20;
                            break;
                          }
                          case 99: {
                            if ((m2(e3 + 2 | 0, 36, 8) | 0) == 0 ? (a3 = e3 + 10 | 0, B(s2[a3 >> 1] | 0) | 0) : 0) {
                              t2[65] = a3;
                              b3 = w2(1) | 0;
                              n3 = t2[65] | 0;
                              P(b3) | 0;
                              b3 = t2[65] | 0;
                              O(n3, b3, n3, b3);
                              t2[65] = (t2[65] | 0) + -2;
                              break e;
                            }
                            e3 = e3 + 4 | 0;
                            t2[65] = e3;
                            break;
                          }
                          case 108:
                          case 118:
                            break;
                          default:
                            break e;
                        }
                        if ((c3 | 0) == 20) {
                          t2[65] = e3 + 16;
                          e3 = w2(1) | 0;
                          if (e3 << 16 >> 16 == 42) {
                            t2[65] = (t2[65] | 0) + 2;
                            e3 = w2(1) | 0;
                          }
                          n3 = t2[65] | 0;
                          P(e3) | 0;
                          b3 = t2[65] | 0;
                          O(n3, b3, n3, b3);
                          t2[65] = (t2[65] | 0) + -2;
                          break e;
                        }
                        e3 = e3 + 4 | 0;
                        t2[65] = e3;
                        i2[775] = 0;
                        r:
                          while (1) {
                            t2[65] = e3 + 2;
                            b3 = w2(1) | 0;
                            e3 = t2[65] | 0;
                            switch ((P(b3) | 0) << 16 >> 16) {
                              case 91:
                              case 123:
                                break r;
                              default: {
                              }
                            }
                            a3 = t2[65] | 0;
                            if ((a3 | 0) == (e3 | 0))
                              break e;
                            O(e3, a3, e3, a3);
                            if ((w2(1) | 0) << 16 >> 16 != 44)
                              break;
                            e3 = t2[65] | 0;
                          }
                        t2[65] = (t2[65] | 0) + -2;
                        break e;
                      }
                    }
                  } while (0);
                b3 = (w2(1) | 0) << 16 >> 16 == 102;
                e3 = t2[65] | 0;
                if (b3 ? (m2(e3 + 2 | 0, 52, 6) | 0) == 0 : 0) {
                  t2[65] = e3 + 8;
                  o2(f3, w2(1) | 0);
                  e3 = (n3 | 0) == 0 ? 212 : n3 + 16 | 0;
                  while (1) {
                    e3 = t2[e3 >> 2] | 0;
                    if (!e3)
                      break e;
                    t2[e3 + 12 >> 2] = 0;
                    t2[e3 + 8 >> 2] = 0;
                    e3 = e3 + 16 | 0;
                  }
                }
                t2[65] = e3 + -2;
              }
            } while (0);
          return;
        }
        function k3() {
          var e3 = 0, a3 = 0, r3 = 0, c3 = 0, f3 = 0, n3 = 0;
          f3 = t2[65] | 0;
          a3 = f3 + 12 | 0;
          t2[65] = a3;
          e:
            do {
              switch ((w2(1) | 0) << 16 >> 16) {
                case 40: {
                  a3 = t2[63] | 0;
                  n3 = s2[386] | 0;
                  r3 = n3 & 65535;
                  t2[a3 + (r3 << 3) >> 2] = 5;
                  e3 = t2[65] | 0;
                  s2[386] = n3 + 1 << 16 >> 16;
                  t2[a3 + (r3 << 3) + 4 >> 2] = e3;
                  if ((s2[t2[62] >> 1] | 0) != 46) {
                    t2[65] = e3 + 2;
                    n3 = w2(1) | 0;
                    A(f3, t2[65] | 0, 0, e3);
                    a3 = t2[56] | 0;
                    r3 = t2[64] | 0;
                    f3 = s2[385] | 0;
                    s2[385] = f3 + 1 << 16 >> 16;
                    t2[r3 + ((f3 & 65535) << 2) >> 2] = a3;
                    switch (n3 << 16 >> 16) {
                      case 39: {
                        d2(39);
                        break;
                      }
                      case 34: {
                        d2(34);
                        break;
                      }
                      default: {
                        t2[65] = (t2[65] | 0) + -2;
                        break e;
                      }
                    }
                    e3 = (t2[65] | 0) + 2 | 0;
                    t2[65] = e3;
                    switch ((w2(1) | 0) << 16 >> 16) {
                      case 44: {
                        t2[65] = (t2[65] | 0) + 2;
                        w2(1) | 0;
                        f3 = t2[56] | 0;
                        t2[f3 + 4 >> 2] = e3;
                        n3 = t2[65] | 0;
                        t2[f3 + 16 >> 2] = n3;
                        i2[f3 + 24 >> 0] = 1;
                        t2[65] = n3 + -2;
                        break e;
                      }
                      case 41: {
                        s2[386] = (s2[386] | 0) + -1 << 16 >> 16;
                        n3 = t2[56] | 0;
                        t2[n3 + 4 >> 2] = e3;
                        t2[n3 + 12 >> 2] = (t2[65] | 0) + 2;
                        i2[n3 + 24 >> 0] = 1;
                        s2[385] = (s2[385] | 0) + -1 << 16 >> 16;
                        break e;
                      }
                      default: {
                        t2[65] = (t2[65] | 0) + -2;
                        break e;
                      }
                    }
                  }
                  break;
                }
                case 46: {
                  t2[65] = (t2[65] | 0) + 2;
                  if (((w2(1) | 0) << 16 >> 16 == 109 ? (e3 = t2[65] | 0, (m2(e3 + 2 | 0, 44, 6) | 0) == 0) : 0) ? (s2[t2[62] >> 1] | 0) != 46 : 0)
                    A(f3, f3, e3 + 8 | 0, 2);
                  break;
                }
                case 42:
                case 39:
                case 34: {
                  c3 = 17;
                  break;
                }
                case 123: {
                  e3 = t2[65] | 0;
                  if (s2[386] | 0) {
                    t2[65] = e3 + -2;
                    break e;
                  }
                  while (1) {
                    if (e3 >>> 0 >= (t2[66] | 0) >>> 0)
                      break;
                    e3 = w2(1) | 0;
                    if (!(T(e3) | 0)) {
                      if (e3 << 16 >> 16 == 125) {
                        c3 = 32;
                        break;
                      }
                    } else
                      d2(e3);
                    e3 = (t2[65] | 0) + 2 | 0;
                    t2[65] = e3;
                  }
                  if ((c3 | 0) == 32)
                    t2[65] = (t2[65] | 0) + 2;
                  w2(1) | 0;
                  e3 = t2[65] | 0;
                  if (m2(e3, 50, 8) | 0) {
                    Q();
                    break e;
                  }
                  t2[65] = e3 + 8;
                  e3 = w2(1) | 0;
                  if (T(e3) | 0) {
                    o2(f3, e3);
                    break e;
                  } else {
                    Q();
                    break e;
                  }
                }
                default:
                  if ((t2[65] | 0) == (a3 | 0))
                    t2[65] = f3 + 10;
                  else
                    c3 = 17;
              }
            } while (0);
          do {
            if ((c3 | 0) == 17) {
              if (s2[386] | 0) {
                t2[65] = (t2[65] | 0) + -2;
                break;
              }
              e3 = t2[66] | 0;
              a3 = t2[65] | 0;
              while (1) {
                if (a3 >>> 0 >= e3 >>> 0) {
                  c3 = 24;
                  break;
                }
                r3 = s2[a3 >> 1] | 0;
                if (T(r3) | 0) {
                  c3 = 22;
                  break;
                }
                n3 = a3 + 2 | 0;
                t2[65] = n3;
                a3 = n3;
              }
              if ((c3 | 0) == 22) {
                o2(f3, r3);
                break;
              } else if ((c3 | 0) == 24) {
                Q();
                break;
              }
            }
          } while (0);
          return;
        }
        function u3(e3) {
          e3 = e3 | 0;
          e:
            do {
              switch (s2[e3 >> 1] | 0) {
                case 100:
                  switch (s2[e3 + -2 >> 1] | 0) {
                    case 105: {
                      e3 = S(e3 + -4 | 0, 68, 2) | 0;
                      break e;
                    }
                    case 108: {
                      e3 = S(e3 + -4 | 0, 72, 3) | 0;
                      break e;
                    }
                    default: {
                      e3 = 0;
                      break e;
                    }
                  }
                case 101:
                  switch (s2[e3 + -2 >> 1] | 0) {
                    case 115:
                      switch (s2[e3 + -4 >> 1] | 0) {
                        case 108: {
                          e3 = j(e3 + -6 | 0, 101) | 0;
                          break e;
                        }
                        case 97: {
                          e3 = j(e3 + -6 | 0, 99) | 0;
                          break e;
                        }
                        default: {
                          e3 = 0;
                          break e;
                        }
                      }
                    case 116: {
                      e3 = S(e3 + -4 | 0, 78, 4) | 0;
                      break e;
                    }
                    case 117: {
                      e3 = S(e3 + -4 | 0, 86, 6) | 0;
                      break e;
                    }
                    default: {
                      e3 = 0;
                      break e;
                    }
                  }
                case 102: {
                  if ((s2[e3 + -2 >> 1] | 0) == 111 ? (s2[e3 + -4 >> 1] | 0) == 101 : 0)
                    switch (s2[e3 + -6 >> 1] | 0) {
                      case 99: {
                        e3 = S(e3 + -8 | 0, 98, 6) | 0;
                        break e;
                      }
                      case 112: {
                        e3 = S(e3 + -8 | 0, 110, 2) | 0;
                        break e;
                      }
                      default: {
                        e3 = 0;
                        break e;
                      }
                    }
                  else
                    e3 = 0;
                  break;
                }
                case 107: {
                  e3 = S(e3 + -2 | 0, 114, 4) | 0;
                  break;
                }
                case 110: {
                  e3 = e3 + -2 | 0;
                  if (j(e3, 105) | 0)
                    e3 = 1;
                  else
                    e3 = S(e3, 122, 5) | 0;
                  break;
                }
                case 111: {
                  e3 = j(e3 + -2 | 0, 100) | 0;
                  break;
                }
                case 114: {
                  e3 = S(e3 + -2 | 0, 132, 7) | 0;
                  break;
                }
                case 116: {
                  e3 = S(e3 + -2 | 0, 146, 4) | 0;
                  break;
                }
                case 119:
                  switch (s2[e3 + -2 >> 1] | 0) {
                    case 101: {
                      e3 = j(e3 + -4 | 0, 110) | 0;
                      break e;
                    }
                    case 111: {
                      e3 = S(e3 + -4 | 0, 154, 3) | 0;
                      break e;
                    }
                    default: {
                      e3 = 0;
                      break e;
                    }
                  }
                default:
                  e3 = 0;
              }
            } while (0);
          return e3 | 0;
        }
        function o2(e3, a3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          var r3 = 0, i3 = 0;
          r3 = (t2[65] | 0) + 2 | 0;
          switch (a3 << 16 >> 16) {
            case 39: {
              d2(39);
              i3 = 5;
              break;
            }
            case 34: {
              d2(34);
              i3 = 5;
              break;
            }
            default:
              Q();
          }
          do {
            if ((i3 | 0) == 5) {
              A(e3, r3, t2[65] | 0, 1);
              t2[65] = (t2[65] | 0) + 2;
              i3 = (w2(0) | 0) << 16 >> 16 == 97;
              a3 = t2[65] | 0;
              if (i3 ? (m2(a3 + 2 | 0, 58, 10) | 0) == 0 : 0) {
                t2[65] = a3 + 12;
                if ((w2(1) | 0) << 16 >> 16 != 123) {
                  t2[65] = a3;
                  break;
                }
                e3 = t2[65] | 0;
                r3 = e3;
                e:
                  while (1) {
                    t2[65] = r3 + 2;
                    r3 = w2(1) | 0;
                    switch (r3 << 16 >> 16) {
                      case 39: {
                        d2(39);
                        t2[65] = (t2[65] | 0) + 2;
                        r3 = w2(1) | 0;
                        break;
                      }
                      case 34: {
                        d2(34);
                        t2[65] = (t2[65] | 0) + 2;
                        r3 = w2(1) | 0;
                        break;
                      }
                      default:
                        r3 = P(r3) | 0;
                    }
                    if (r3 << 16 >> 16 != 58) {
                      i3 = 16;
                      break;
                    }
                    t2[65] = (t2[65] | 0) + 2;
                    switch ((w2(1) | 0) << 16 >> 16) {
                      case 39: {
                        d2(39);
                        break;
                      }
                      case 34: {
                        d2(34);
                        break;
                      }
                      default: {
                        i3 = 20;
                        break e;
                      }
                    }
                    t2[65] = (t2[65] | 0) + 2;
                    switch ((w2(1) | 0) << 16 >> 16) {
                      case 125: {
                        i3 = 25;
                        break e;
                      }
                      case 44:
                        break;
                      default: {
                        i3 = 24;
                        break e;
                      }
                    }
                    t2[65] = (t2[65] | 0) + 2;
                    if ((w2(1) | 0) << 16 >> 16 == 125) {
                      i3 = 25;
                      break;
                    }
                    r3 = t2[65] | 0;
                  }
                if ((i3 | 0) == 16) {
                  t2[65] = a3;
                  break;
                } else if ((i3 | 0) == 20) {
                  t2[65] = a3;
                  break;
                } else if ((i3 | 0) == 24) {
                  t2[65] = a3;
                  break;
                } else if ((i3 | 0) == 25) {
                  i3 = t2[56] | 0;
                  t2[i3 + 16 >> 2] = e3;
                  t2[i3 + 12 >> 2] = (t2[65] | 0) + 2;
                  break;
                }
              }
              t2[65] = a3 + -2;
            }
          } while (0);
          return;
        }
        function h4() {
          var e3 = 0, a3 = 0, r3 = 0, i3 = 0;
          a3 = t2[66] | 0;
          r3 = t2[65] | 0;
          e:
            while (1) {
              e3 = r3 + 2 | 0;
              if (r3 >>> 0 >= a3 >>> 0) {
                a3 = 10;
                break;
              }
              switch (s2[e3 >> 1] | 0) {
                case 96: {
                  a3 = 7;
                  break e;
                }
                case 36: {
                  if ((s2[r3 + 4 >> 1] | 0) == 123) {
                    a3 = 6;
                    break e;
                  }
                  break;
                }
                case 92: {
                  e3 = r3 + 4 | 0;
                  break;
                }
                default: {
                }
              }
              r3 = e3;
            }
          if ((a3 | 0) == 6) {
            e3 = r3 + 4 | 0;
            t2[65] = e3;
            a3 = t2[63] | 0;
            i3 = s2[386] | 0;
            r3 = i3 & 65535;
            t2[a3 + (r3 << 3) >> 2] = 4;
            s2[386] = i3 + 1 << 16 >> 16;
            t2[a3 + (r3 << 3) + 4 >> 2] = e3;
          } else if ((a3 | 0) == 7) {
            t2[65] = e3;
            r3 = t2[63] | 0;
            i3 = (s2[386] | 0) + -1 << 16 >> 16;
            s2[386] = i3;
            if ((t2[r3 + ((i3 & 65535) << 3) >> 2] | 0) != 3)
              Q();
          } else if ((a3 | 0) == 10) {
            t2[65] = e3;
            Q();
          }
          return;
        }
        function w2(e3) {
          e3 = e3 | 0;
          var a3 = 0, r3 = 0, i3 = 0;
          r3 = t2[65] | 0;
          e:
            do {
              a3 = s2[r3 >> 1] | 0;
              a:
                do {
                  if (a3 << 16 >> 16 != 47)
                    if (e3)
                      if (R(a3) | 0)
                        break;
                      else
                        break e;
                    else if (D(a3) | 0)
                      break;
                    else
                      break e;
                  else
                    switch (s2[r3 + 2 >> 1] | 0) {
                      case 47: {
                        E();
                        break a;
                      }
                      case 42: {
                        y(e3);
                        break a;
                      }
                      default: {
                        a3 = 47;
                        break e;
                      }
                    }
                } while (0);
              i3 = t2[65] | 0;
              r3 = i3 + 2 | 0;
              t2[65] = r3;
            } while (i3 >>> 0 < (t2[66] | 0) >>> 0);
          return a3 | 0;
        }
        function d2(e3) {
          e3 = e3 | 0;
          var a3 = 0, r3 = 0, i3 = 0, c3 = 0;
          c3 = t2[66] | 0;
          a3 = t2[65] | 0;
          while (1) {
            i3 = a3 + 2 | 0;
            if (a3 >>> 0 >= c3 >>> 0) {
              a3 = 9;
              break;
            }
            r3 = s2[i3 >> 1] | 0;
            if (r3 << 16 >> 16 == e3 << 16 >> 16) {
              a3 = 10;
              break;
            }
            if (r3 << 16 >> 16 == 92) {
              r3 = a3 + 4 | 0;
              if ((s2[r3 >> 1] | 0) == 13) {
                a3 = a3 + 6 | 0;
                a3 = (s2[a3 >> 1] | 0) == 10 ? a3 : r3;
              } else
                a3 = r3;
            } else if (X(r3) | 0) {
              a3 = 9;
              break;
            } else
              a3 = i3;
          }
          if ((a3 | 0) == 9) {
            t2[65] = i3;
            Q();
          } else if ((a3 | 0) == 10)
            t2[65] = i3;
          return;
        }
        function v(e3, a3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          var r3 = 0, i3 = 0, c3 = 0, f3 = 0;
          r3 = t2[65] | 0;
          i3 = s2[r3 >> 1] | 0;
          f3 = (e3 | 0) == (a3 | 0);
          c3 = f3 ? 0 : e3;
          f3 = f3 ? 0 : a3;
          if (i3 << 16 >> 16 == 97) {
            t2[65] = r3 + 4;
            r3 = w2(1) | 0;
            e3 = t2[65] | 0;
            if (T(r3) | 0) {
              d2(r3);
              a3 = (t2[65] | 0) + 2 | 0;
              t2[65] = a3;
            } else {
              P(r3) | 0;
              a3 = t2[65] | 0;
            }
            i3 = w2(1) | 0;
            r3 = t2[65] | 0;
          }
          if ((r3 | 0) != (e3 | 0))
            O(e3, a3, c3, f3);
          return i3 | 0;
        }
        function A(e3, a3, r3, s3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          r3 = r3 | 0;
          s3 = s3 | 0;
          var c3 = 0, f3 = 0;
          c3 = t2[60] | 0;
          t2[60] = c3 + 32;
          f3 = t2[56] | 0;
          t2[((f3 | 0) == 0 ? 208 : f3 + 28 | 0) >> 2] = c3;
          t2[57] = f3;
          t2[56] = c3;
          t2[c3 + 8 >> 2] = e3;
          if (2 == (s3 | 0))
            e3 = r3;
          else
            e3 = 1 == (s3 | 0) ? r3 + 2 | 0 : 0;
          t2[c3 + 12 >> 2] = e3;
          t2[c3 >> 2] = a3;
          t2[c3 + 4 >> 2] = r3;
          t2[c3 + 16 >> 2] = 0;
          t2[c3 + 20 >> 2] = s3;
          i2[c3 + 24 >> 0] = 1 == (s3 | 0) & 1;
          t2[c3 + 28 >> 2] = 0;
          return;
        }
        function C() {
          var e3 = 0, a3 = 0, r3 = 0;
          r3 = t2[66] | 0;
          a3 = t2[65] | 0;
          e:
            while (1) {
              e3 = a3 + 2 | 0;
              if (a3 >>> 0 >= r3 >>> 0) {
                a3 = 6;
                break;
              }
              switch (s2[e3 >> 1] | 0) {
                case 13:
                case 10: {
                  a3 = 6;
                  break e;
                }
                case 93: {
                  a3 = 7;
                  break e;
                }
                case 92: {
                  e3 = a3 + 4 | 0;
                  break;
                }
                default: {
                }
              }
              a3 = e3;
            }
          if ((a3 | 0) == 6) {
            t2[65] = e3;
            Q();
            e3 = 0;
          } else if ((a3 | 0) == 7) {
            t2[65] = e3;
            e3 = 93;
          }
          return e3 | 0;
        }
        function g() {
          var e3 = 0, a3 = 0, r3 = 0;
          e:
            while (1) {
              e3 = t2[65] | 0;
              a3 = e3 + 2 | 0;
              t2[65] = a3;
              if (e3 >>> 0 >= (t2[66] | 0) >>> 0) {
                r3 = 7;
                break;
              }
              switch (s2[a3 >> 1] | 0) {
                case 13:
                case 10: {
                  r3 = 7;
                  break e;
                }
                case 47:
                  break e;
                case 91: {
                  C() | 0;
                  break;
                }
                case 92: {
                  t2[65] = e3 + 4;
                  break;
                }
                default: {
                }
              }
            }
          if ((r3 | 0) == 7)
            Q();
          return;
        }
        function p3(e3) {
          e3 = e3 | 0;
          switch (s2[e3 >> 1] | 0) {
            case 62: {
              e3 = (s2[e3 + -2 >> 1] | 0) == 61;
              break;
            }
            case 41:
            case 59: {
              e3 = 1;
              break;
            }
            case 104: {
              e3 = S(e3 + -2 | 0, 180, 4) | 0;
              break;
            }
            case 121: {
              e3 = S(e3 + -2 | 0, 188, 6) | 0;
              break;
            }
            case 101: {
              e3 = S(e3 + -2 | 0, 200, 3) | 0;
              break;
            }
            default:
              e3 = 0;
          }
          return e3 | 0;
        }
        function y(e3) {
          e3 = e3 | 0;
          var a3 = 0, r3 = 0, i3 = 0, c3 = 0, f3 = 0;
          c3 = (t2[65] | 0) + 2 | 0;
          t2[65] = c3;
          r3 = t2[66] | 0;
          while (1) {
            a3 = c3 + 2 | 0;
            if (c3 >>> 0 >= r3 >>> 0)
              break;
            i3 = s2[a3 >> 1] | 0;
            if (!e3 ? X(i3) | 0 : 0)
              break;
            if (i3 << 16 >> 16 == 42 ? (s2[c3 + 4 >> 1] | 0) == 47 : 0) {
              f3 = 8;
              break;
            }
            c3 = a3;
          }
          if ((f3 | 0) == 8) {
            t2[65] = a3;
            a3 = c3 + 4 | 0;
          }
          t2[65] = a3;
          return;
        }
        function m2(e3, a3, r3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          r3 = r3 | 0;
          var s3 = 0, t3 = 0;
          e:
            do {
              if (!r3)
                e3 = 0;
              else {
                while (1) {
                  s3 = i2[e3 >> 0] | 0;
                  t3 = i2[a3 >> 0] | 0;
                  if (s3 << 24 >> 24 != t3 << 24 >> 24)
                    break;
                  r3 = r3 + -1 | 0;
                  if (!r3) {
                    e3 = 0;
                    break e;
                  } else {
                    e3 = e3 + 1 | 0;
                    a3 = a3 + 1 | 0;
                  }
                }
                e3 = (s3 & 255) - (t3 & 255) | 0;
              }
            } while (0);
          return e3 | 0;
        }
        function I(e3) {
          e3 = e3 | 0;
          e:
            do {
              switch (e3 << 16 >> 16) {
                case 38:
                case 37:
                case 33: {
                  e3 = 1;
                  break;
                }
                default:
                  if ((e3 & -8) << 16 >> 16 == 40 | (e3 + -58 & 65535) < 6)
                    e3 = 1;
                  else {
                    switch (e3 << 16 >> 16) {
                      case 91:
                      case 93:
                      case 94: {
                        e3 = 1;
                        break e;
                      }
                      default: {
                      }
                    }
                    e3 = (e3 + -123 & 65535) < 4;
                  }
              }
            } while (0);
          return e3 | 0;
        }
        function U(e3) {
          e3 = e3 | 0;
          e:
            do {
              switch (e3 << 16 >> 16) {
                case 38:
                case 37:
                case 33:
                  break;
                default:
                  if (!((e3 + -58 & 65535) < 6 | (e3 + -40 & 65535) < 7 & e3 << 16 >> 16 != 41)) {
                    switch (e3 << 16 >> 16) {
                      case 91:
                      case 94:
                        break e;
                      default: {
                      }
                    }
                    return e3 << 16 >> 16 != 125 & (e3 + -123 & 65535) < 4 | 0;
                  }
              }
            } while (0);
          return 1;
        }
        function x(e3) {
          e3 = e3 | 0;
          var a3 = 0, r3 = 0, i3 = 0, c3 = 0;
          r3 = n2;
          n2 = n2 + 16 | 0;
          i3 = r3;
          t2[i3 >> 2] = 0;
          t2[59] = e3;
          a3 = t2[3] | 0;
          c3 = a3 + (e3 << 1) | 0;
          e3 = c3 + 2 | 0;
          s2[c3 >> 1] = 0;
          t2[i3 >> 2] = e3;
          t2[60] = e3;
          t2[52] = 0;
          t2[56] = 0;
          t2[54] = 0;
          t2[53] = 0;
          t2[58] = 0;
          t2[55] = 0;
          n2 = r3;
          return a3 | 0;
        }
        function S(e3, a3, r3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          r3 = r3 | 0;
          var i3 = 0, c3 = 0;
          i3 = e3 + (0 - r3 << 1) | 0;
          c3 = i3 + 2 | 0;
          e3 = t2[3] | 0;
          if (c3 >>> 0 >= e3 >>> 0 ? (m2(c3, a3, r3 << 1) | 0) == 0 : 0)
            if ((c3 | 0) == (e3 | 0))
              e3 = 1;
            else
              e3 = B(s2[i3 >> 1] | 0) | 0;
          else
            e3 = 0;
          return e3 | 0;
        }
        function O(e3, a3, r3, i3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          r3 = r3 | 0;
          i3 = i3 | 0;
          var s3 = 0, c3 = 0;
          s3 = t2[60] | 0;
          t2[60] = s3 + 20;
          c3 = t2[58] | 0;
          t2[((c3 | 0) == 0 ? 212 : c3 + 16 | 0) >> 2] = s3;
          t2[58] = s3;
          t2[s3 >> 2] = e3;
          t2[s3 + 4 >> 2] = a3;
          t2[s3 + 8 >> 2] = r3;
          t2[s3 + 12 >> 2] = i3;
          t2[s3 + 16 >> 2] = 0;
          return;
        }
        function $2(e3) {
          e3 = e3 | 0;
          switch (s2[e3 >> 1] | 0) {
            case 107: {
              e3 = S(e3 + -2 | 0, 114, 4) | 0;
              break;
            }
            case 101: {
              if ((s2[e3 + -2 >> 1] | 0) == 117)
                e3 = S(e3 + -4 | 0, 86, 6) | 0;
              else
                e3 = 0;
              break;
            }
            default:
              e3 = 0;
          }
          return e3 | 0;
        }
        function j(e3, a3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          var r3 = 0;
          r3 = t2[3] | 0;
          if (r3 >>> 0 <= e3 >>> 0 ? (s2[e3 >> 1] | 0) == a3 << 16 >> 16 : 0)
            if ((r3 | 0) == (e3 | 0))
              r3 = 1;
            else
              r3 = B(s2[e3 + -2 >> 1] | 0) | 0;
          else
            r3 = 0;
          return r3 | 0;
        }
        function B(e3) {
          e3 = e3 | 0;
          e:
            do {
              if ((e3 + -9 & 65535) < 5)
                e3 = 1;
              else {
                switch (e3 << 16 >> 16) {
                  case 32:
                  case 160: {
                    e3 = 1;
                    break e;
                  }
                  default: {
                  }
                }
                e3 = e3 << 16 >> 16 != 46 & (I(e3) | 0);
              }
            } while (0);
          return e3 | 0;
        }
        function E() {
          var e3 = 0, a3 = 0, r3 = 0;
          e3 = t2[66] | 0;
          r3 = t2[65] | 0;
          e:
            while (1) {
              a3 = r3 + 2 | 0;
              if (r3 >>> 0 >= e3 >>> 0)
                break;
              switch (s2[a3 >> 1] | 0) {
                case 13:
                case 10:
                  break e;
                default:
                  r3 = a3;
              }
            }
          t2[65] = a3;
          return;
        }
        function P(e3) {
          e3 = e3 | 0;
          while (1) {
            if (R(e3) | 0)
              break;
            if (I(e3) | 0)
              break;
            e3 = (t2[65] | 0) + 2 | 0;
            t2[65] = e3;
            e3 = s2[e3 >> 1] | 0;
            if (!(e3 << 16 >> 16)) {
              e3 = 0;
              break;
            }
          }
          return e3 | 0;
        }
        function q() {
          var e3 = 0;
          e3 = t2[(t2[54] | 0) + 20 >> 2] | 0;
          switch (e3 | 0) {
            case 1: {
              e3 = -1;
              break;
            }
            case 2: {
              e3 = -2;
              break;
            }
            default:
              e3 = e3 - (t2[3] | 0) >> 1;
          }
          return e3 | 0;
        }
        function z(e3) {
          e3 = e3 | 0;
          if (!(S(e3, 160, 5) | 0) ? !(S(e3, 170, 3) | 0) : 0)
            e3 = S(e3, 176, 2) | 0;
          else
            e3 = 1;
          return e3 | 0;
        }
        function D(e3) {
          e3 = e3 | 0;
          switch (e3 << 16 >> 16) {
            case 160:
            case 32:
            case 12:
            case 11:
            case 9: {
              e3 = 1;
              break;
            }
            default:
              e3 = 0;
          }
          return e3 | 0;
        }
        function F(e3) {
          e3 = e3 | 0;
          if ((t2[3] | 0) == (e3 | 0))
            e3 = 1;
          else
            e3 = B(s2[e3 + -2 >> 1] | 0) | 0;
          return e3 | 0;
        }
        function G() {
          var e3 = 0;
          e3 = t2[(t2[55] | 0) + 12 >> 2] | 0;
          if (!e3)
            e3 = -1;
          else
            e3 = e3 - (t2[3] | 0) >> 1;
          return e3 | 0;
        }
        function H() {
          var e3 = 0;
          e3 = t2[(t2[54] | 0) + 12 >> 2] | 0;
          if (!e3)
            e3 = -1;
          else
            e3 = e3 - (t2[3] | 0) >> 1;
          return e3 | 0;
        }
        function J() {
          var e3 = 0;
          e3 = t2[(t2[55] | 0) + 8 >> 2] | 0;
          if (!e3)
            e3 = -1;
          else
            e3 = e3 - (t2[3] | 0) >> 1;
          return e3 | 0;
        }
        function K() {
          var e3 = 0;
          e3 = t2[(t2[54] | 0) + 16 >> 2] | 0;
          if (!e3)
            e3 = -1;
          else
            e3 = e3 - (t2[3] | 0) >> 1;
          return e3 | 0;
        }
        function L() {
          var e3 = 0;
          e3 = t2[(t2[54] | 0) + 4 >> 2] | 0;
          if (!e3)
            e3 = -1;
          else
            e3 = e3 - (t2[3] | 0) >> 1;
          return e3 | 0;
        }
        function M() {
          var e3 = 0;
          e3 = t2[54] | 0;
          e3 = t2[((e3 | 0) == 0 ? 208 : e3 + 28 | 0) >> 2] | 0;
          t2[54] = e3;
          return (e3 | 0) != 0 | 0;
        }
        function N() {
          var e3 = 0;
          e3 = t2[55] | 0;
          e3 = t2[((e3 | 0) == 0 ? 212 : e3 + 16 | 0) >> 2] | 0;
          t2[55] = e3;
          return (e3 | 0) != 0 | 0;
        }
        function Q() {
          i2[774] = 1;
          t2[61] = (t2[65] | 0) - (t2[3] | 0) >> 1;
          t2[65] = (t2[66] | 0) + 2;
          return;
        }
        function R(e3) {
          e3 = e3 | 0;
          return (e3 | 128) << 16 >> 16 == 160 | (e3 + -9 & 65535) < 5 | 0;
        }
        function T(e3) {
          e3 = e3 | 0;
          return e3 << 16 >> 16 == 39 | e3 << 16 >> 16 == 34 | 0;
        }
        function V() {
          return (t2[(t2[54] | 0) + 8 >> 2] | 0) - (t2[3] | 0) >> 1 | 0;
        }
        function W() {
          return (t2[(t2[55] | 0) + 4 >> 2] | 0) - (t2[3] | 0) >> 1 | 0;
        }
        function X(e3) {
          e3 = e3 | 0;
          return e3 << 16 >> 16 == 13 | e3 << 16 >> 16 == 10 | 0;
        }
        function Y() {
          return (t2[t2[54] >> 2] | 0) - (t2[3] | 0) >> 1 | 0;
        }
        function Z() {
          return (t2[t2[55] >> 2] | 0) - (t2[3] | 0) >> 1 | 0;
        }
        function _() {
          return c2[(t2[54] | 0) + 24 >> 0] | 0 | 0;
        }
        function ee(e3) {
          e3 = e3 | 0;
          t2[3] = e3;
          return;
        }
        function ae() {
          return (i2[775] | 0) != 0 | 0;
        }
        function re() {
          return t2[61] | 0;
        }
        function ie(e3) {
          e3 = e3 | 0;
          n2 = e3 + 992 + 15 & -16;
          return 992;
        }
        return { su: ie, ai: K, e: re, ee: W, ele: G, els: J, es: Z, f: ae, id: q, ie: L, ip: _, is: Y, p: b2, re: N, ri: M, sa: x, se: H, ses: ee, ss: V };
      }("undefined" != typeof self ? self : globalThis, {}, a), r = e.su(i - (2 << 17));
    }
    const h3 = c$1.length + 1;
    e.ses(r), e.sa(h3 - 1), s(c$1, new Uint16Array(a, r, h3)), e.p() || (n = e.e(), o());
    const w = [], d = [];
    for (; e.ri(); ) {
      const a2 = e.is(), r2 = e.ie(), i2 = e.ai(), s2 = e.id(), t2 = e.ss(), f2 = e.se();
      let n2;
      e.ip() && (n2 = b(-1 === s2 ? a2 : a2 + 1, c$1.charCodeAt(-1 === s2 ? a2 - 1 : a2))), w.push({ n: n2, s: a2, e: r2, ss: t2, se: f2, d: s2, a: i2 });
    }
    for (; e.re(); ) {
      const a2 = e.es(), r2 = e.ee(), i2 = e.els(), s2 = e.ele(), t2 = c$1.charCodeAt(a2), f2 = i2 >= 0 ? c$1.charCodeAt(i2) : -1;
      d.push({ s: a2, e: r2, ls: i2, le: s2, n: 34 === t2 || 39 === t2 ? b(a2 + 1, t2) : c$1.slice(a2, r2), ln: i2 < 0 ? void 0 : 34 === f2 || 39 === f2 ? b(i2 + 1, f2) : c$1.slice(i2, s2) });
    }
    return [w, d, !!e.f()];
  }
  function b(e2, a2) {
    n = e2;
    let r2 = "", i2 = n;
    for (; ; ) {
      n >= c$1.length && o();
      const e3 = c$1.charCodeAt(n);
      if (e3 === a2)
        break;
      92 === e3 ? (r2 += c$1.slice(i2, n), r2 += l(), i2 = n) : (8232 === e3 || 8233 === e3 || u(e3) && o(), ++n);
    }
    return r2 += c$1.slice(i2, n++), r2;
  }
  function l() {
    let e2 = c$1.charCodeAt(++n);
    switch (++n, e2) {
      case 110:
        return "\n";
      case 114:
        return "\r";
      case 120:
        return String.fromCharCode(k(2));
      case 117:
        return function() {
          let e3;
          123 === c$1.charCodeAt(n) ? (++n, e3 = k(c$1.indexOf("}", n) - n), ++n, e3 > 1114111 && o()) : e3 = k(4);
          return e3 <= 65535 ? String.fromCharCode(e3) : (e3 -= 65536, String.fromCharCode(55296 + (e3 >> 10), 56320 + (1023 & e3)));
        }();
      case 116:
        return "	";
      case 98:
        return "\b";
      case 118:
        return "\v";
      case 102:
        return "\f";
      case 13:
        10 === c$1.charCodeAt(n) && ++n;
      case 10:
        return "";
      case 56:
      case 57:
        o();
      default:
        if (e2 >= 48 && e2 <= 55) {
          let a2 = c$1.substr(n - 1, 3).match(/^[0-7]+/)[0], r2 = parseInt(a2, 8);
          return r2 > 255 && (a2 = a2.slice(0, -1), r2 = parseInt(a2, 8)), n += a2.length - 1, e2 = c$1.charCodeAt(n), "0" === a2 && 56 !== e2 && 57 !== e2 || o(), String.fromCharCode(r2);
        }
        return u(e2) ? "" : String.fromCharCode(e2);
    }
  }
  function k(e2) {
    const a2 = n;
    let r2 = 0, i2 = 0;
    for (let a3 = 0; a3 < e2; ++a3, ++n) {
      let e3, s2 = c$1.charCodeAt(n);
      if (95 !== s2) {
        if (s2 >= 97)
          e3 = s2 - 97 + 10;
        else if (s2 >= 65)
          e3 = s2 - 65 + 10;
        else {
          if (!(s2 >= 48 && s2 <= 57))
            break;
          e3 = s2 - 48;
        }
        if (e3 >= 16)
          break;
        i2 = s2, r2 = 16 * r2 + e3;
      } else
        95 !== i2 && 0 !== a3 || o(), i2 = s2;
    }
    return 95 !== i2 && n - a2 === e2 || o(), r2;
  }
  function u(e2) {
    return 13 === e2 || 10 === e2;
  }
  function o() {
    throw Object.assign(Error(`Parse error ${f}:${c$1.slice(0, n).split("\n").length}:${n - c$1.lastIndexOf("\n", n - 1)}`), { idx: n });
  }
  async function _resolve(id, parentUrl) {
    const urlResolved = resolveIfNotPlainOrUrl(id, parentUrl);
    return {
      r: resolveImportMap(importMap, urlResolved || id, parentUrl) || throwUnresolved(id, parentUrl),
      b: !urlResolved && !isURL(id)
    };
  }
  const resolve = resolveHook ? async (id, parentUrl) => {
    let result = resolveHook(id, parentUrl, defaultResolve);
    if (result && result.then)
      result = await result;
    return result ? { r: result, b: !resolveIfNotPlainOrUrl(id, parentUrl) && !isURL(id) } : _resolve(id, parentUrl);
  } : _resolve;
  async function importShim2(id, ...args) {
    let parentUrl = args[args.length - 1];
    if (typeof parentUrl !== "string")
      parentUrl = baseUrl;
    await initPromise;
    if (importHook)
      await importHook(id, typeof args[1] !== "string" ? args[1] : {}, parentUrl);
    if (acceptingImportMaps || shimMode || !baselinePassthrough) {
      if (hasDocument)
        processScriptsAndPreloads(true);
      if (!shimMode)
        acceptingImportMaps = false;
    }
    await importMapPromise;
    return topLevelLoad((await resolve(id, parentUrl)).r, { credentials: "same-origin" });
  }
  self.importShim = importShim2;
  function defaultResolve(id, parentUrl) {
    return resolveImportMap(importMap, resolveIfNotPlainOrUrl(id, parentUrl) || id, parentUrl) || throwUnresolved(id, parentUrl);
  }
  function throwUnresolved(id, parentUrl) {
    throw Error(`Unable to resolve specifier '${id}'${fromParent(parentUrl)}`);
  }
  const resolveSync = (id, parentUrl = baseUrl) => {
    parentUrl = `${parentUrl}`;
    const result = resolveHook && resolveHook(id, parentUrl, defaultResolve);
    return result && !result.then ? result : defaultResolve(id, parentUrl);
  };
  function metaResolve(id, parentUrl = this.url) {
    return resolveSync(id, parentUrl);
  }
  importShim2.resolve = resolveSync;
  importShim2.getImportMap = () => JSON.parse(JSON.stringify(importMap));
  importShim2.addImportMap = (importMapIn) => {
    if (!shimMode)
      throw new Error("Unsupported in polyfill mode.");
    importMap = resolveAndComposeImportMap(importMapIn, baseUrl, importMap);
  };
  const registry = importShim2._r = {};
  async function loadAll(load, seen) {
    if (load.b || seen[load.u])
      return;
    seen[load.u] = 1;
    await load.L;
    await Promise.all(load.d.map((dep) => loadAll(dep, seen)));
    if (!load.n)
      load.n = load.d.some((dep) => dep.n);
  }
  let importMap = { imports: {}, scopes: {} };
  let baselinePassthrough;
  const initPromise = featureDetectionPromise.then(() => {
    baselinePassthrough = esmsInitOptions.polyfillEnable !== true && supportsDynamicImport && supportsImportMeta && supportsImportMaps && (!jsonModulesEnabled || supportsJsonAssertions) && (!cssModulesEnabled || supportsCssAssertions) && !importMapSrcOrLazy && true;
    if (hasDocument) {
      if (!supportsImportMaps) {
        const supports = HTMLScriptElement.supports || ((type) => type === "classic" || type === "module");
        HTMLScriptElement.supports = (type) => type === "importmap" || supports(type);
      }
      if (shimMode || !baselinePassthrough) {
        new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (mutation.type !== "childList")
              continue;
            for (const node of mutation.addedNodes) {
              if (node.tagName === "SCRIPT") {
                if (node.type === (shimMode ? "module-shim" : "module"))
                  processScript(node, true);
                if (node.type === (shimMode ? "importmap-shim" : "importmap"))
                  processImportMap(node, true);
              } else if (node.tagName === "LINK" && node.rel === (shimMode ? "modulepreload-shim" : "modulepreload")) {
                processPreload(node);
              }
            }
          }
        }).observe(document, { childList: true, subtree: true });
        processScriptsAndPreloads();
        if (document.readyState === "complete") {
          readyStateCompleteCheck();
        } else {
          async function readyListener() {
            await initPromise;
            processScriptsAndPreloads();
            if (document.readyState === "complete") {
              readyStateCompleteCheck();
              document.removeEventListener("readystatechange", readyListener);
            }
          }
          document.addEventListener("readystatechange", readyListener);
        }
      }
    }
    return void 0;
  });
  let importMapPromise = initPromise;
  let firstPolyfillLoad = true;
  let acceptingImportMaps = true;
  async function topLevelLoad(url, fetchOpts, source, nativelyLoaded, lastStaticLoadPromise2) {
    if (!shimMode)
      acceptingImportMaps = false;
    await initPromise;
    await importMapPromise;
    if (importHook)
      await importHook(url, typeof fetchOpts !== "string" ? fetchOpts : {}, "");
    if (!shimMode && baselinePassthrough) {
      if (nativelyLoaded)
        return null;
      await lastStaticLoadPromise2;
      return dynamicImport(source ? createBlob(source) : url, { errUrl: url || source });
    }
    const load = getOrCreateLoad(url, fetchOpts, null, source);
    const seen = {};
    await loadAll(load, seen);
    lastLoad = void 0;
    resolveDeps(load, seen);
    await lastStaticLoadPromise2;
    if (source && !shimMode && !load.n && true) {
      const module2 = await dynamicImport(createBlob(source), { errUrl: source });
      if (revokeBlobURLs)
        revokeObjectURLs(Object.keys(seen));
      return module2;
    }
    if (firstPolyfillLoad && !shimMode && load.n && nativelyLoaded) {
      onpolyfill();
      firstPolyfillLoad = false;
    }
    const module = await dynamicImport(!shimMode && !load.n && nativelyLoaded ? load.u : load.b, { errUrl: load.u });
    if (load.s)
      (await dynamicImport(load.s)).u$_(module);
    if (revokeBlobURLs)
      revokeObjectURLs(Object.keys(seen));
    return module;
  }
  function revokeObjectURLs(registryKeys) {
    let batch = 0;
    const keysLength = registryKeys.length;
    const schedule = self.requestIdleCallback ? self.requestIdleCallback : self.requestAnimationFrame;
    schedule(cleanup);
    function cleanup() {
      const batchStartIndex = batch * 100;
      if (batchStartIndex > keysLength)
        return;
      for (const key of registryKeys.slice(batchStartIndex, batchStartIndex + 100)) {
        const load = registry[key];
        if (load)
          URL.revokeObjectURL(load.b);
      }
      batch++;
      schedule(cleanup);
    }
  }
  function urlJsString(url) {
    return `'${url.replace(/'/g, "\\'")}'`;
  }
  let lastLoad;
  function resolveDeps(load, seen) {
    if (load.b || !seen[load.u])
      return;
    seen[load.u] = 0;
    for (const dep of load.d)
      resolveDeps(dep, seen);
    const [imports, exports] = load.a;
    const source = load.S;
    let resolvedSource = edge && lastLoad ? `import '${lastLoad}';` : "";
    if (!imports.length) {
      resolvedSource += source;
    } else {
      let pushStringTo = function(originalIndex) {
        while (dynamicImportEndStack[dynamicImportEndStack.length - 1] < originalIndex) {
          const dynamicImportEnd = dynamicImportEndStack.pop();
          resolvedSource += `${source.slice(lastIndex, dynamicImportEnd)}, ${urlJsString(load.r)}`;
          lastIndex = dynamicImportEnd;
        }
        resolvedSource += source.slice(lastIndex, originalIndex);
        lastIndex = originalIndex;
      };
      let lastIndex = 0, depIndex = 0, dynamicImportEndStack = [];
      for (const { s: start, ss: statementStart, se: statementEnd, d: dynamicImportIndex } of imports) {
        if (dynamicImportIndex === -1) {
          let depLoad = load.d[depIndex++], blobUrl = depLoad.b, cycleShell = !blobUrl;
          if (cycleShell) {
            if (!(blobUrl = depLoad.s)) {
              blobUrl = depLoad.s = createBlob(`export function u$_(m){${depLoad.a[1].map(({ s: s2, e: e2 }, i2) => {
                const q = depLoad.S[s2] === '"' || depLoad.S[s2] === "'";
                return `e$_${i2}=m${q ? `[` : "."}${depLoad.S.slice(s2, e2)}${q ? `]` : ""}`;
              }).join(",")}}${depLoad.a[1].length ? `let ${depLoad.a[1].map((_, i2) => `e$_${i2}`).join(",")};` : ""}export {${depLoad.a[1].map(({ s: s2, e: e2 }, i2) => `e$_${i2} as ${depLoad.S.slice(s2, e2)}`).join(",")}}
//# sourceURL=${depLoad.r}?cycle`);
            }
          }
          pushStringTo(start - 1);
          resolvedSource += `/*${source.slice(start - 1, statementEnd)}*/${urlJsString(blobUrl)}`;
          if (!cycleShell && depLoad.s) {
            resolvedSource += `;import*as m$_${depIndex} from'${depLoad.b}';import{u$_ as u$_${depIndex}}from'${depLoad.s}';u$_${depIndex}(m$_${depIndex})`;
            depLoad.s = void 0;
          }
          lastIndex = statementEnd;
        } else if (dynamicImportIndex === -2) {
          load.m = { url: load.r, resolve: metaResolve };
          metaHook(load.m, load.u);
          pushStringTo(start);
          resolvedSource += `importShim._r[${urlJsString(load.u)}].m`;
          lastIndex = statementEnd;
        } else {
          pushStringTo(statementStart + 6);
          resolvedSource += `Shim(`;
          dynamicImportEndStack.push(statementEnd - 1);
          lastIndex = start;
        }
      }
      if (load.s)
        resolvedSource += `
;import{u$_}from'${load.s}';try{u$_({${exports.filter((e2) => e2.ln).map(({ s: s2, e: e2, ln }) => `${source.slice(s2, e2)}: ${ln}`).join(",")}})}catch(_){};
`;
      pushStringTo(source.length);
    }
    let hasSourceURL = false;
    resolvedSource = resolvedSource.replace(sourceMapURLRegEx, (match, isMapping, url) => (hasSourceURL = !isMapping, match.replace(url, () => new URL(url, load.r))));
    if (!hasSourceURL)
      resolvedSource += "\n//# sourceURL=" + load.r;
    load.b = lastLoad = createBlob(resolvedSource);
    load.S = void 0;
  }
  const sourceMapURLRegEx = /\n\/\/# source(Mapping)?URL=([^\n]+)\s*((;|\/\/[^#][^\n]*)\s*)*$/;
  const jsContentType = /^(text|application)\/(x-)?javascript(;|$)/;
  const jsonContentType = /^(text|application)\/json(;|$)/;
  const cssContentType = /^(text|application)\/css(;|$)/;
  const cssUrlRegEx = /url\(\s*(?:(["'])((?:\\.|[^\n\\"'])+)\1|((?:\\.|[^\s,"'()\\])+))\s*\)/g;
  let p2 = [];
  let c = 0;
  function pushFetchPool() {
    if (++c > 100)
      return new Promise((r2) => p2.push(r2));
  }
  function popFetchPool() {
    c--;
    if (p2.length)
      p2.shift()();
  }
  async function doFetch(url, fetchOpts, parent) {
    if (enforceIntegrity && !fetchOpts.integrity)
      throw Error(`No integrity for ${url}${fromParent(parent)}.`);
    const poolQueue = pushFetchPool();
    if (poolQueue)
      await poolQueue;
    try {
      var res = await fetchHook(url, fetchOpts);
    } catch (e2) {
      e2.message = `Unable to fetch ${url}${fromParent(parent)} - see network log for details.
` + e2.message;
      throw e2;
    } finally {
      popFetchPool();
    }
    if (!res.ok)
      throw Error(`${res.status} ${res.statusText} ${res.url}${fromParent(parent)}`);
    return res;
  }
  async function fetchModule(url, fetchOpts, parent) {
    const res = await doFetch(url, fetchOpts, parent);
    const contentType = res.headers.get("content-type");
    if (jsContentType.test(contentType))
      return { r: res.url, s: await res.text(), t: "js" };
    else if (jsonContentType.test(contentType))
      return { r: res.url, s: `export default ${await res.text()}`, t: "json" };
    else if (cssContentType.test(contentType)) {
      return { r: res.url, s: `var s=new CSSStyleSheet();s.replaceSync(${JSON.stringify((await res.text()).replace(cssUrlRegEx, (_match, quotes = "", relUrl1, relUrl2) => `url(${quotes}${resolveUrl(relUrl1 || relUrl2, url)}${quotes})`))});export default s;`, t: "css" };
    } else
      throw Error(`Unsupported Content-Type "${contentType}" loading ${url}${fromParent(parent)}. Modules must be served with a valid MIME type like application/javascript.`);
  }
  function getOrCreateLoad(url, fetchOpts, parent, source) {
    let load = registry[url];
    if (load && !source)
      return load;
    load = {
      u: url,
      r: source ? url : void 0,
      f: void 0,
      S: void 0,
      L: void 0,
      a: void 0,
      d: void 0,
      b: void 0,
      s: void 0,
      n: false,
      t: null,
      m: null
    };
    if (registry[url]) {
      let i2 = 0;
      while (registry[load.u + ++i2])
        ;
      load.u += i2;
    }
    registry[load.u] = load;
    load.f = (async () => {
      if (!source) {
        let t2;
        ({ r: load.r, s: source, t: t2 } = await (fetchCache[url] || fetchModule(url, fetchOpts, parent)));
        if (t2 && !shimMode) {
          if (t2 === "css" && !cssModulesEnabled || t2 === "json" && !jsonModulesEnabled)
            throw Error(`${t2}-modules require <script type="esms-options">{ "polyfillEnable": ["${t2}-modules"] }<${""}/script>`);
          if (t2 === "css" && !supportsCssAssertions || t2 === "json" && !supportsJsonAssertions)
            load.n = true;
        }
      }
      try {
        load.a = parse(source, load.u);
      } catch (e2) {
        throwError(e2);
        load.a = [[], [], false];
      }
      load.S = source;
      return load;
    })();
    load.L = load.f.then(async () => {
      let childFetchOpts = fetchOpts;
      load.d = (await Promise.all(load.a[0].map(async ({ n: n2, d }) => {
        if (d >= 0 && !supportsDynamicImport || d === -2 && !supportsImportMeta)
          load.n = true;
        if (d !== -1 || !n2)
          return;
        const { r: r2, b: b2 } = await resolve(n2, load.r || load.u);
        if (b2 && (!supportsImportMaps || importMapSrcOrLazy))
          load.n = true;
        if (d !== -1)
          return;
        if (skip && skip.test(r2))
          return { b: r2 };
        if (childFetchOpts.integrity)
          childFetchOpts = Object.assign({}, childFetchOpts, { integrity: void 0 });
        return getOrCreateLoad(r2, childFetchOpts, load.r).f;
      }))).filter((l2) => l2);
    });
    return load;
  }
  function processScriptsAndPreloads(mapsOnly = false) {
    if (!mapsOnly)
      for (const link of document.querySelectorAll(shimMode ? "link[rel=modulepreload-shim]" : "link[rel=modulepreload]"))
        processPreload(link);
    for (const script of document.querySelectorAll(shimMode ? "script[type=importmap-shim]" : "script[type=importmap]"))
      processImportMap(script);
    if (!mapsOnly)
      for (const script of document.querySelectorAll(shimMode ? "script[type=module-shim]" : "script[type=module]"))
        processScript(script);
  }
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  let lastStaticLoadPromise = Promise.resolve();
  let domContentLoadedCnt = 1;
  function domContentLoadedCheck() {
    if (--domContentLoadedCnt === 0 && !noLoadEventRetriggers)
      document.dispatchEvent(new Event("DOMContentLoaded"));
  }
  if (hasDocument) {
    document.addEventListener("DOMContentLoaded", async () => {
      await initPromise;
      if (shimMode || !baselinePassthrough)
        domContentLoadedCheck();
    });
  }
  let readyStateCompleteCnt = 1;
  function readyStateCompleteCheck() {
    if (--readyStateCompleteCnt === 0 && !noLoadEventRetriggers)
      document.dispatchEvent(new Event("readystatechange"));
  }
  const hasNext = (script) => script.nextSibling || script.parentNode && hasNext(script.parentNode);
  const epCheck = (script, ready) => script.ep || !ready && (!script.src && !script.innerHTML || !hasNext(script)) || script.getAttribute("noshim") !== null || !(script.ep = true);
  function processImportMap(script, ready = readyStateCompleteCnt > 0) {
    if (epCheck(script, ready))
      return;
    if (script.src) {
      if (!shimMode)
        return;
      setImportMapSrcOrLazy();
    }
    if (acceptingImportMaps) {
      importMapPromise = importMapPromise.then(async () => {
        importMap = resolveAndComposeImportMap(script.src ? await (await doFetch(script.src, getFetchOpts(script))).json() : JSON.parse(script.innerHTML), script.src || baseUrl, importMap);
      }).catch((e2) => {
        console.log(e2);
        if (e2 instanceof SyntaxError)
          e2 = new Error(`Unable to parse import map ${e2.message} in: ${script.src || script.innerHTML}`);
        throwError(e2);
      });
      if (!shimMode)
        acceptingImportMaps = false;
    }
  }
  function processScript(script, ready = readyStateCompleteCnt > 0) {
    if (epCheck(script, ready))
      return;
    const isBlockingReadyScript = script.getAttribute("async") === null && readyStateCompleteCnt > 0;
    const isDomContentLoadedScript = domContentLoadedCnt > 0;
    if (isBlockingReadyScript)
      readyStateCompleteCnt++;
    if (isDomContentLoadedScript)
      domContentLoadedCnt++;
    const loadPromise = topLevelLoad(script.src || baseUrl, getFetchOpts(script), !script.src && script.innerHTML, !shimMode, isBlockingReadyScript && lastStaticLoadPromise).catch(throwError);
    if (isBlockingReadyScript)
      lastStaticLoadPromise = loadPromise.then(readyStateCompleteCheck);
    if (isDomContentLoadedScript)
      loadPromise.then(domContentLoadedCheck);
  }
  const fetchCache = {};
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    if (fetchCache[link.href])
      return;
    fetchCache[link.href] = fetchModule(link.href, getFetchOpts(link));
  }
})();

// js/starter.tsx
init_react_preact();

// js/renderToString.tsx
init_define_process();
var renderFromString = (codeSpace2, hash) => {
  const md5hash = md5(mST().transpiled).slice(0, 8);
  if (hash !== hashCode())
    return { html: null, css: null };
  mST().transpiled;
  const html = document.getElementById(`${codeSpace2}-${md5hash}`)?.innerHTML;
  const css7 = html ? extractCritical22(html) : "";
  return {
    html: `<div id="${codeSpace2}-${md5hash}" style="height:100%">${html}</div>`,
    css: css7
  };
};
var extractCritical22 = (html) => {
  try {
    const rules = {};
    for (let i in document.styleSheets) {
      let yesFromNow = false;
      const styleSheet = document.styleSheets[i];
      if (styleSheet?.cssRules) {
        Array.from(styleSheet.cssRules).forEach((rule) => {
          if (yesFromNow || rule && rule.cssText && rule.cssText.slice(0, 5) === ".css-") {
            const selector = rule.cssText.slice(1, 9);
            const selectorText = selector;
            if (!rules[selector] && html.includes(selector) && !rule.cssText.slice(10).includes(".css-")) {
              yesFromNow = true;
              rules[selectorText] = rule.cssText;
            }
          }
        });
      }
    }
    return Object.keys(rules).map((r) => rules[r]).join(" ");
  } catch {
    console.error("no css");
    return "";
  }
};

// js/starter.tsx
var import_jsx_runtime2 = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
try {
  if (document.scripts) {
    const scripts = Array.from(document.scripts);
    const imap = scripts.find((s) => s.type === "importmap");
    if (imap) {
      importShim.addImportMap(
        JSON.parse(
          imap.innerText
        )
      );
    }
  }
} catch {
  console.error("no importmap");
}
var apps = {};
var AutoUpdateApp = ({ hash, codeSpace: codeSpace2 }) => {
  const md5Hash = md5(mST().transpiled).slice(0, 8);
  useEffect(() => {
    const { html, css: css7 } = renderFromString(codeSpace2, hash);
    const mst = mST();
    if (html && css7 && (html !== mst.html || css7 !== mst.css)) {
      patchSync({ ...mst, html, css: css7 });
    }
  }, [hash]);
  const ref = useRef(null);
  const transpiled = mST().transpiled;
  const App = apps[md5(transpiled)];
  return (0, import_jsx_runtime2.jsx)(ErrorBoundary_default, {
    ref,
    children: (0, import_jsx_runtime2.jsx)("div", {
      style: {
        height: "100%"
      },
      id: `${codeSpace2}-${md5Hash}`,
      children: (0, import_jsx_runtime2.jsx)(App, {})
    }, hash)
  });
};
async function appFactory(transpiled = "") {
  const trp = transpiled.length ? transpiled : mST().transpiled;
  const hash = md5(trp);
  if (!apps[hash]) {
    try {
      apps[hash] = (await importShim(createJsBlob(trp))).default;
    } catch (err) {
      if (err instanceof SyntaxError) {
        const name = err.name;
        const message = err.message;
        apps[hash] = () => (0, import_jsx_runtime2.jsxs)("div", {
          css: import_react2.css`
        background-color: orange;
        `,
          children: [
            (0, import_jsx_runtime2.jsx)("h1", {
              children: "Syntax Error"
            }),
            (0, import_jsx_runtime2.jsxs)("h2", {
              children: [
                name,
                ": ",
                message
              ]
            }),
            (0, import_jsx_runtime2.jsx)("p", {
              children: JSON.stringify({ err })
            })
          ]
        });
      } else if (err instanceof Error) {
        const name = err.name;
        const message = err.message;
        apps[hash] = () => (0, import_jsx_runtime2.jsxs)("div", {
          css: import_react2.css`
        background-color: orange;
        `,
          children: [
            (0, import_jsx_runtime2.jsx)("h1", {
              children: "Syntax Error"
            }),
            (0, import_jsx_runtime2.jsxs)("h2", {
              children: [
                name,
                ": ",
                message
              ]
            }),
            (0, import_jsx_runtime2.jsx)("p", {
              children: JSON.stringify({ err })
            })
          ]
        });
      } else {
        apps[hash] = () => (0, import_jsx_runtime2.jsx)("div", {
          css: import_react2.css`
        background-color: orange;
      `,
          children: (0, import_jsx_runtime2.jsxs)("h1", {
            children: [
              "Unknown Error: $",
              hash
            ]
          })
        });
      }
    }
  }
  return apps[hash];
}
function createJsBlob(code) {
  const file = new File([code], "index.mjs", {
    type: "application/javascript"
  });
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;
}

// js/renderPreviewWindow.tsx
var import_react17 = __toESM(require_emotion_react_cjs(), 1);

// js/DraggableWindow.tsx
init_define_process();
var import_react11 = __toESM(require_emotion_react_cjs(), 1);
init_react_preact();

// js/Qr.tsx
init_define_process();
var import_react9 = __toESM(require_emotion_react_cjs(), 1);
init_react_preact();

// js/icons.tsx
init_define_process();
var import_react7 = __toESM(require_emotion_react_cjs(), 1);

// ../../.yarn/__virtual__/react-icons-virtual-368142a91f/4/Users/z/.yarn/berry/cache/react-icons-npm-4.4.0-a6c91164a4-9.zip/node_modules/react-icons/md/index.esm.js
init_define_process();

// ../../.yarn/__virtual__/react-icons-virtual-368142a91f/4/Users/z/.yarn/berry/cache/react-icons-npm-4.4.0-a6c91164a4-9.zip/node_modules/react-icons/lib/esm/index.js
init_define_process();

// ../../.yarn/__virtual__/react-icons-virtual-368142a91f/4/Users/z/.yarn/berry/cache/react-icons-npm-4.4.0-a6c91164a4-9.zip/node_modules/react-icons/lib/esm/iconsManifest.js
init_define_process();

// ../../.yarn/__virtual__/react-icons-virtual-368142a91f/4/Users/z/.yarn/berry/cache/react-icons-npm-4.4.0-a6c91164a4-9.zip/node_modules/react-icons/lib/esm/iconBase.js
init_define_process();
init_react_preact();

// ../../.yarn/__virtual__/react-icons-virtual-368142a91f/4/Users/z/.yarn/berry/cache/react-icons-npm-4.4.0-a6c91164a4-9.zip/node_modules/react-icons/lib/esm/iconContext.js
init_define_process();
init_react_preact();
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = react_preact_default.createContext && react_preact_default.createContext(DefaultContext);

// ../../.yarn/__virtual__/react-icons-virtual-368142a91f/4/Users/z/.yarn/berry/cache/react-icons-npm-4.4.0-a6c91164a4-9.zip/node_modules/react-icons/lib/esm/iconBase.js
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t[p2] = s[p2];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = function(s, e) {
  var t = {};
  for (var p2 in s)
    if (Object.prototype.hasOwnProperty.call(s, p2) && e.indexOf(p2) < 0)
      t[p2] = s[p2];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p2 = Object.getOwnPropertySymbols(s); i < p2.length; i++) {
      if (e.indexOf(p2[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p2[i]))
        t[p2[i]] = s[p2[i]];
    }
  return t;
};
function Tree2Element(tree) {
  return tree && tree.map(function(node, i) {
    return react_preact_default.createElement(node.tag, __assign({
      key: i
    }, node.attr), Tree2Element(node.child));
  });
}
function GenIcon(data) {
  return function(props) {
    return react_preact_default.createElement(IconBase, __assign({
      attr: __assign({}, data.attr)
    }, props), Tree2Element(data.child));
  };
}
function IconBase(props) {
  var elem = function(conf) {
    var attr = props.attr, size = props.size, title = props.title, svgProps = __rest(props, ["attr", "size", "title"]);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className)
      className = conf.className;
    if (props.className)
      className = (className ? className + " " : "") + props.className;
    return react_preact_default.createElement("svg", __assign({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: __assign(__assign({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && react_preact_default.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? react_preact_default.createElement(IconContext.Consumer, null, function(conf) {
    return elem(conf);
  }) : elem(DefaultContext);
}

// ../../.yarn/__virtual__/react-icons-virtual-368142a91f/4/Users/z/.yarn/berry/cache/react-icons-npm-4.4.0-a6c91164a4-9.zip/node_modules/react-icons/md/index.esm.js
function MdQrCode(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM19 19h2v2h-2zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM15 19h2v2h-2zM17 17h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2z" } }] })(props);
}
function MdPhoneAndroid(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z" } }] })(props);
}
function MdTabletAndroid(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z" } }] })(props);
}
function MdTv(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" } }] })(props);
}
function MdFullscreen(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" } }] })(props);
}
function MdShare(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" } }] })(props);
}

// js/icons.tsx
var import_jsx_runtime3 = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var Wrap = ({ children }) => (0, import_jsx_runtime3.jsx)("span", {
  css: import_react7.css`
font-size:20pt;
`,
  children
});
var QrCodeIcon = () => (0, import_jsx_runtime3.jsx)(Wrap, {
  children: (0, import_jsx_runtime3.jsx)(MdQrCode, {})
});
var Phone = () => (0, import_jsx_runtime3.jsx)(Wrap, {
  children: (0, import_jsx_runtime3.jsx)(MdPhoneAndroid, {})
});
var Share = () => (0, import_jsx_runtime3.jsx)(Wrap, {
  children: (0, import_jsx_runtime3.jsx)(MdShare, {})
});
var Tablet = () => (0, import_jsx_runtime3.jsx)(Wrap, {
  children: (0, import_jsx_runtime3.jsx)(MdTabletAndroid, {})
});
var Tv = () => (0, import_jsx_runtime3.jsx)(Wrap, {
  children: (0, import_jsx_runtime3.jsx)(MdTv, {})
});

// js/mui.tsx
init_define_process();
init_react_preact();
var import_jsx_runtime4 = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var FabLazy = lazy(() => import("./chunk-Fab-WXUNF66Q.mjs"));
var Fab = (props) => (0, import_jsx_runtime4.jsx)(Suspense, {
  children: (0, import_jsx_runtime4.jsx)(FabLazy, {
    ...props
  })
});
var ToggleButtonLazy = lazy(() => import("./chunk-ToggleButton-VCBL327W.mjs"));
var ToggleButton = (props) => (0, import_jsx_runtime4.jsx)(Suspense, {
  children: (0, import_jsx_runtime4.jsx)(ToggleButtonLazy, {
    ...props
  })
});
var ToggleButtonGroupLazy = lazy(
  () => import("./chunk-ToggleButtonGroup-6RIHSL7H.mjs")
);
var ToggleButtonGroup = (props) => (0, import_jsx_runtime4.jsx)(Suspense, {
  children: (0, import_jsx_runtime4.jsx)(ToggleButtonGroupLazy, {
    ...props
  })
});

// js/Qr.tsx
var import_jsx_runtime5 = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var QR = ({ url }) => (0, import_jsx_runtime5.jsx)(QRious, {
  value: url
});
var QRiousLazy = react_preact_default.lazy(
  () => import("./chunk-lib-AVUUXVQM.mjs").then(({ QRious: QRious2 }) => ({ default: QRious2 }))
);
var QRious = ({ value }) => (0, import_jsx_runtime5.jsx)(Suspense, {
  fallback: (0, import_jsx_runtime5.jsx)("p", {
    children: ".."
  }),
  children: (0, import_jsx_runtime5.jsx)(QRiousLazy, {
    value
  })
});
var QRButton = ({ url }) => {
  const [showQR, setQR] = useState(false);
  return (0, import_jsx_runtime5.jsx)(motion.div, {
    animate: {
      width: showQR ? 200 : 56,
      height: showQR ? 220 : 48
    },
    onClick: () => {
      setQR(!showQR);
    },
    css: import_react9.css`
          margin-top: 12px;
          margin-bottom: 12px;
              `,
    children: showQR ? (0, import_jsx_runtime5.jsx)(QR, {
      url: url || "/live/coder/public"
    }, url || origin + url) : (0, import_jsx_runtime5.jsx)(Fab, {
      children: (0, import_jsx_runtime5.jsx)(QrCodeIcon, {})
    })
  });
};

// js/DraggableWindow.tsx
var import_jsx_runtime6 = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var breakPoints = [680, 768, 1920];
var breakPointHeights = [1137, 1024, 1080];
var sizes = [10, 25, 50, 75, 100];
var bg = `rgba(${Math.random() * 128 + 64}, ${Math.random() * 128 + 64}, ${Math.random() * 128 + 64}, ${!navigator.userAgent.includes("Firefox") ? 0.3 : 0.7})`;
var DraggableWindow = ({
  children,
  room
}) => {
  const [scaleRange, changeScaleRange] = useState(100);
  const startPositions = { bottom: 0, right: 0 };
  const [{ bottom, right }, setPositions] = useState(startPositions);
  const [width, setWidth] = useState(window.innerWidth * devicePixelRatio);
  const [height, setHeight] = useState(window.innerHeight * devicePixelRatio);
  const scale = scaleRange / 100;
  useEffect(() => {
    const reveal = async () => {
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
        changeScaleRange(100);
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
    };
    reveal();
  }, []);
  return (0, import_jsx_runtime6.jsx)(LazyMotion, {
    features: { ...domAnimation, ...domMax },
    children: (0, import_jsx_runtime6.jsx)(m.div, {
      transition: { delay: 0, duration: 0.4 },
      initial: {
        top: 0,
        padding: 0,
        right: 0,
        borderRadius: 0
      },
      animate: {
        top: bottom,
        padding: 8,
        right,
        borderRadius: 16
      },
      css: import_react11.css`
            touch-action: pinch-zoom;
            background-color:${bg};
            backdrop-filter: blur(15px);
            z-index: 10;

            white-space: normal;
            position: fixed;
          `,
      drag: true,
      dragMomentum: false,
      dragConstraints: {
        left: 0,
        right: width - 20 - width / 6,
        bottom: innerHeight
      },
      dragElastic: 0.5,
      children: (0, import_jsx_runtime6.jsxs)("div", {
        css: import_react11.css` 
              display: flex;
              
                `,
        children: [
          (0, import_jsx_runtime6.jsxs)("div", {
            css: import_react11.css`
            display: flex;
            flex-direction: column;
            align-items: center;
          `,
            children: [
              (0, import_jsx_runtime6.jsx)(m.div, {
                transition: { delay: 0, duration: 0.4 },
                initial: { height: 0, width: 0 },
                animate: { height: "auto", width: "auto" },
                children: (0, import_jsx_runtime6.jsx)(ToggleButtonGroup, {
                  value: scaleRange,
                  size: "small",
                  exclusive: true,
                  onChange: (_e, newScale) => {
                    newScale && changeScaleRange(newScale);
                  },
                  children: sizes.map((size, ind) => (0, import_jsx_runtime6.jsx)(ToggleButton, {
                    value: size,
                    children: (0, import_jsx_runtime6.jsxs)("span", {
                      css: import_react11.css`
                       color: ${size === scaleRange ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                       `,
                      children: [
                        size,
                        "%"
                      ]
                    })
                  }, ind))
                })
              }),
              (0, import_jsx_runtime6.jsx)(m.div, {
                transition: { delay: 0, duration: 0.4 },
                initial: {
                  width: window.innerWidth,
                  height: window.innerHeight,
                  borderRadius: 0
                },
                animate: {
                  width: width * scale / devicePixelRatio,
                  height: height * scale / devicePixelRatio,
                  borderRadius: 8
                },
                css: import_react11.css`

                display: block;
                overflow: hidden;
                overflow-y: hidden;
            `,
                children: (0, import_jsx_runtime6.jsx)(m.div, {
                  transition: { delay: 0, duration: 0.4 },
                  initial: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    background: "rgba(0,0,0, 1)",
                    scale: 1
                  },
                  animate: {
                    background: "rgba(92,92,92, 0.5)",
                    transformOrigin: "0px 0px",
                    width: width / devicePixelRatio,
                    height: height / devicePixelRatio,
                    scale: scaleRange / 100
                  },
                  "data-test-id": "z-body",
                  css: import_react11.css`
                  overflow:overlay;
                  overflow-y: hidden;
              `,
                  children
                })
              }),
              (0, import_jsx_runtime6.jsx)(m.div, {
                transition: { delay: 0, duration: 0.4 },
                children: (0, import_jsx_runtime6.jsx)(ToggleButtonGroup, {
                  value: width,
                  size: "small",
                  exclusive: true,
                  onChange: (_e, newSize) => {
                    if (newSize) {
                      setHeight(breakPointHeights[breakPoints.indexOf(newSize)]);
                      setWidth(newSize);
                    }
                  },
                  children: breakPoints.map((size, ind) => (0, import_jsx_runtime6.jsx)(ToggleButton, {
                    value: size,
                    children: size === 680 ? (0, import_jsx_runtime6.jsx)("span", {
                      css: import_react11.css`
                        color: ${width === 680 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `,
                      children: (0, import_jsx_runtime6.jsx)(Phone, {})
                    }) : size === 768 ? (0, import_jsx_runtime6.jsx)("span", {
                      css: import_react11.css`
                        color: ${width === 768 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `,
                      children: (0, import_jsx_runtime6.jsx)(Tablet, {})
                    }) : (0, import_jsx_runtime6.jsx)("span", {
                      css: import_react11.css`
                        color: ${width === 1920 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                      `,
                      children: (0, import_jsx_runtime6.jsx)(Tv, {})
                    })
                  }, ind))
                })
              })
            ]
          }),
          (0, import_jsx_runtime6.jsx)(m.div, {
            transition: { delay: 0, duration: 0.4 },
            initial: { height: 0, width: 0 },
            animate: { height: "100%", width: "auto" },
            children: (0, import_jsx_runtime6.jsxs)("div", {
              css: import_react11.css`
              padding: 16px;
              display: flex;
              overflow: "hidden";
              align-items: center;          
              flex-direction: column;
              `,
              children: [
                (0, import_jsx_runtime6.jsx)(Fab, {
                  onClick: () => {
                    document.getElementById("root")?.requestFullscreen();
                  },
                  children: (0, import_jsx_runtime6.jsx)("span", {
                    css: import_react11.css`
                font-size: 20pt;
              `,
                    children: (0, import_jsx_runtime6.jsx)(MdFullscreen, {}, "fs")
                  })
                }, "fullscreen"),
                (0, import_jsx_runtime6.jsx)(QRButton, {
                  url: location.origin + `/live/${room}/public`
                }),
                (0, import_jsx_runtime6.jsx)(Fab, {
                  onClick: () => open(`/live/${room}/public`),
                  children: (0, import_jsx_runtime6.jsx)(Share, {})
                }, "Share")
              ]
            })
          })
        ]
      })
    })
  });
};

// js/Editor.tsx
init_define_process();
init_react_preact();

// js/isMobile.mjs
init_define_process();
function isMobile() {
  let isIOS = /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel";
  let check = false;
  (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
      check = true;
    }
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check && !isIOS;
}

// js/Editor.tsx
var import_react14 = __toESM(require_emotion_react_cjs(), 1);

// js/wait.ts
init_define_process();
async function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

// js/Editor.tsx
var import_jsx_runtime7 = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var mod = {
  CH: () => {
  },
  code: ""
};
var Editor = ({ code, i, codeSpace: codeSpace2, assets }) => {
  const ref = useRef(null);
  const [
    mySession,
    changeContent
  ] = useState({
    myCode: code,
    counter: i,
    started: false,
    prettierJs: (code2) => code2 + "// " + Math.random(),
    runner: async ({ code: code2, counter: counter2, codeSpace: codeSpace3 }) => {
      const { runner: runner2 } = await import("./chunk-runner-K4JRJS45.mjs");
      const { prettierJs: prettierJs2 } = await import("./chunk-prettierJs-EMB5TKNU.mjs");
      runner2({ code: prettierJs2(code2), counter: counter2, codeSpace: codeSpace3 });
      changeContent((x) => ({
        ...x,
        runner: runner2,
        code: code2,
        counter: counter2,
        prettierJs: prettierJs2
      }));
    },
    myId: "loading",
    getValue: () => "",
    setValue: (_code) => {
    },
    onChange: (_cb) => {
    },
    engine: isMobile() ? "ace" : "monaco"
  });
  mod.CH = () => changeContent;
  const {
    counter,
    myCode,
    started,
    myId,
    runner,
    engine,
    prettierJs,
    getValue,
    setValue,
    onChange
  } = mySession;
  mod.code = myCode;
  useEffect(() => {
    if (!ref?.current)
      return;
    const setMonaco = async () => {
      const link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.href = location.origin + "/" + assets["ws.css"];
      document.head.appendChild(link);
      const { startMonaco } = await import("./chunk-startMonaco-B5W23QK2.mjs");
      const { model, getTypeScriptWorker, setValue: setValue2 } = await startMonaco(
        {
          container: ref.current,
          name: codeSpace2,
          code: mST().code
        }
      );
      changeContent((x) => ({
        ...x,
        started: true,
        setValue: setValue2,
        getValue: () => {
          try {
            (async () => {
              const tsWorker = await (await getTypeScriptWorker())(
                model.uri
              );
              const diag = await tsWorker.getSemanticDiagnostics(
                location.origin + "/live/" + codeSpace2 + ".tsx"
              );
              console.log({ diag });
            })();
          } catch {
            console.error("ts diag error");
          }
          return model.getValue();
        },
        onChange: (cb) => model.onDidChangeContent(cb).dispose,
        myId: "editor"
      }));
    };
    const setAce = async () => {
      const { startAce } = await import("./chunk-startAce-3BAWPW2E.mjs");
      const editor = await startAce(mST().code);
      changeContent((x) => ({
        ...x,
        onChange: (cb) => {
          editor.session.on("change", cb);
          return () => editor.session.off("change", cb);
        },
        started: true,
        getValue: () => editor.session.getValue(),
        setValue: (code2) => editor.session.setValue(code2),
        myId: "editor"
      }));
    };
    const loadEditors = async () => {
      await wait(100);
      if (engine === "monaco") {
        await setMonaco();
      } else {
        await setAce();
      }
      runner({ code, counter, codeSpace: codeSpace2 });
    };
    loadEditors();
  }, [started, ref]);
  useEffect(() => {
    if (!started)
      return;
    const lastCode = mod.code;
    let last = 0;
    const handler = setInterval(() => {
      const now = Date.now();
      if (now - last < 5e3)
        return;
      last = now;
      if (getValue() !== lastCode) {
        const code2 = getValue();
        if (code2 === mST().code || code2 === mod.code)
          return;
        changeContent((x) => ({ ...x, myCode: code2, i: i + 1 }));
        runner({ code: code2, counter, codeSpace: codeSpace2 });
      }
    }, 5e3);
    return () => clearInterval(handler);
  }, [changeContent, i, runner, prettierJs]);
  useEffect(() => {
    if (!started)
      return;
    if (i > counter) {
      changeContent((x) => ({ ...x, myCode: code, counter: i }));
      return;
    }
    const cb = async () => {
      const code2 = getValue();
      const newCode = prettierJs(code2);
      if (newCode === mod.code)
        return;
      if (newCode === mST().code)
        return;
      try {
        changeContent((x) => ({
          ...x,
          counter: counter + 1,
          myCode: newCode
        }));
        await runner({ code: newCode, counter: counter + 1, codeSpace: codeSpace2 });
      } catch (err) {
        console.error({ err });
        console.error("restore editor");
      }
    };
    return onChange(() => cb());
  }, [setValue, getValue, onChange, counter, prettierJs, runner]);
  onSessionUpdate(() => {
    const sess = mST();
    setTimeout(() => {
      if (sess.i <= counter) {
        return;
      }
      if (mST().i > sess.i)
        return;
      console.log("sessUP");
      setValue(sess.code);
      if (mod.CH() !== changeContent) {
        const ch = mod.CH();
        ch((x) => ({
          ...x,
          myCode: sess.code,
          counter: sess.i
        }));
      }
      changeContent((x) => ({
        ...x,
        myCode: sess.code,
        counter: sess.i
      }));
    }, 300);
  }, "editor");
  return (0, import_jsx_runtime7.jsx)("div", {
    "data-test-id": myId,
    id: "editor",
    css: import_react14.css`
        
            max-width: 640px;
            height: 100%;
            
            
        `,
    ref
  });
};

// js/renderPreviewWindow.tsx
var import_jsx_runtime8 = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var RainbowContainer = ({ children }) => (0, import_jsx_runtime8.jsx)("div", {
  css: import_react17.css`
height: 100%;
width: 100%;
background-blend-mode: overlay;
background:  repeating-radial-gradient(circle at bottom left, 
              #fedc00 0, #fedc00 5.5555555556%, 
              #fcb712 0, #fcb712 11.1111111111%, 
              #f7921e 0, #f7921e 16.6666666667%, 
            #e87f24 0, #e87f24 22.2222222222%, 
            #dd6227 0, #dd6227 27.7777777778%,
             #dc4c27 0, #dc4c27 33.3333333333%, 
            #ca3435 0, #ca3435 38.8888888889%, 
            #b82841 0, #b82841 44.4444444444%, 
            #953751 0, #953751 50%, #364c88 0, 
            #364c88 55.5555555556%, #16599d 0, 
            #16599d 61.1111111111%, #02609e 0, 
            #02609e 66.6666666667%, #0073a9 0, 
            #0073a9 72.2222222222%, #008aa4 0, 
            #008aa4 77.7777777778%, #239a87 0, 
            #239a87 83.3333333333%, #7cba6d 0, 
            #7cba6d 88.8888888889%, #becc2f 0, 
            #becc2f 94.4444444444%, #e0d81d 0, 
            #e0d81d 100%), 
            repeating-radial-gradient(circle at bottom right, 
              #fedc00 0, #fedc00 5.5555555556%, 
              #fcb712 0, #fcb712 11.1111111111%, 
              #f7921e 0, #f7921e 16.6666666667%, 
              #e87f24 0, #e87f24 22.2222222222%, 
              #dd6227 0, #dd6227 27.7777777778%, 
              #dc4c27 0, #dc4c27 33.3333333333%, 
              #ca3435 0, #ca3435 38.8888888889%, 
              #b82841 0, #b82841 44.4444444444%, 
              #953751 0, #953751 50%,
               #364c88 0, #364c88 55.5555555556%, 
               #16599d 0, #16599d 61.1111111111%, 
               #02609e 0, #02609e 66.6666666667%, 
               #0073a9 0, #0073a9 72.2222222222%, 
               #008aa4 0, #008aa4 77.7777777778%,
                #239a87 0, #239a87 83.3333333333%, 
                #7cba6d 0, #7cba6d 88.8888888889%, 
                #becc2f 0, #becc2f 94.4444444444%, 
                #e0d81d 0, #e0d81d 100%);
`,
  children
});
var AppToRender = ({ codeSpace: codeSpace2, assets }) => {
  const [hash, setHash] = useState(() => hashCode());
  const [isStandalone, setIsStandalone] = useState(true);
  useEffect(() => {
    onSessionUpdate(async () => {
      const newHash = hashCode();
      if (hash !== newHash) {
        try {
          await appFactory();
          setHash(newHash);
        } catch (e) {
          console.error({ e });
        }
      }
    }, "myApp");
  }, [hash, setHash]);
  useEffect(() => {
    setTimeout(() => {
      const isStandalone2 = location.pathname.endsWith("public") || location.pathname.endsWith("hydrated");
      setIsStandalone(isStandalone2);
    }, 800);
  }, []);
  const portalNode = useMemo(() => createHtmlPortalNode({
    attributes: { id: `root-${codeSpace2}`, style: "height: 100%" }
  }), []);
  return (0, import_jsx_runtime8.jsxs)(p, {
    children: [
      (0, import_jsx_runtime8.jsx)(InPortal, {
        node: portalNode,
        children: (0, import_jsx_runtime8.jsx)(AutoUpdateApp, {
          hash,
          codeSpace: codeSpace2
        })
      }),
      isStandalone ? (0, import_jsx_runtime8.jsx)(OutPortal, {
        node: portalNode
      }) : (0, import_jsx_runtime8.jsx)(RainbowContainer, {
        children: (0, import_jsx_runtime8.jsxs)(p, {
          children: [
            (0, import_jsx_runtime8.jsx)(Editor, {
              code: mST().code,
              i: mST().i,
              codeSpace: codeSpace2,
              assets
            }),
            (0, import_jsx_runtime8.jsx)(DraggableWindow, {
              hashCode: 0,
              room: codeSpace2,
              children: (0, import_jsx_runtime8.jsx)(OutPortal, {
                node: portalNode
              })
            })
          ]
        })
      })
    ]
  });
};
var renderPreviewWindow = ({ codeSpace: codeSpace2, assets }) => {
  const div = document.getElementById("root");
  const root = createRoot(div);
  root.render(
    (0, import_jsx_runtime8.jsx)(p, {
      children: (0, import_jsx_runtime8.jsx)(AppToRender, {
        codeSpace: codeSpace2,
        assets
      })
    })
  );
};

// js/ws.ts
var import_lodash = __toESM(require_lodash(), 1);

// js/uidV4.mjs
init_define_process();
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error(
        "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
      );
    }
  }
  return getRandomValues(rnds8);
}
var __default = /^(?:[\da-f]{8}-[\da-f]{4}-[1-5][\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}|0{8}-(?:0{4}-){3}0{12})$/i;
function validate(uuid) {
  return typeof uuid === "string" && __default.test(uuid);
}
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function stringify(array) {
  const offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  const uuid = (byteToHex[array[offset + 0]] + byteToHex[array[offset + 1]] + byteToHex[array[offset + 2]] + byteToHex[array[offset + 3]] + "-" + byteToHex[array[offset + 4]] + byteToHex[array[offset + 5]] + "-" + byteToHex[array[offset + 6]] + byteToHex[array[offset + 7]] + "-" + byteToHex[array[offset + 8]] + byteToHex[array[offset + 9]] + "-" + byteToHex[array[offset + 10]] + byteToHex[array[offset + 11]] + byteToHex[array[offset + 12]] + byteToHex[array[offset + 13]] + byteToHex[array[offset + 14]] + byteToHex[array[offset + 15]]).toLowerCase();
  if (!validate(uuid)) {
    throw new TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
function v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i1 = 0; i1 < 16; ++i1) {
      buf[offset + i1] = rnds[i1];
    }
    return buf;
  }
  return stringify(rnds);
}

// js/ws.ts
var webRtcArray = [];
var user = (self && self.crypto && self.crypto.randomUUID && self.crypto.randomUUID() || v4()).slice(
  0,
  8
);
var rtcConns = {};
var bc;
var codeSpace;
var address;
var wsLastHashCode = 0;
var webRTCLastSeenHashCode = 0;
var lastSeenTimestamp = 0;
var lastSeenNow = 0;
var ws = null;
var sendWS;
var rejoined = false;
var sendChannel = {
  webRtcArray,
  rtcConns,
  send: (data) => {
    const target = data.target;
    const messageString = JSON.stringify({
      ...data,
      name: data.name || user
    });
    webRtcArray.map((ch) => {
      try {
        console.log("WebRtc send", data, ch);
        if (ch.readyState !== "open")
          return;
        if (!target || ch.target === target && !ignoreUsers.includes(ch.target)) {
          ch.send(messageString);
        }
      } catch (e) {
        console.error("Error in broadcasting event", { e });
      }
    });
  }
};
var setWsLastHashCode = (hashCode2) => {
  wsLastHashCode = Number(hashCode2);
};
var run = async (startState) => {
  if (location.pathname.endsWith("dehydrated"))
    return;
  codeSpace = startState.codeSpace;
  address = startState.address;
  startSession(codeSpace, {
    name: user,
    state: startState.mST
  }, location.origin);
  bc = new BroadcastChannel("spike.land");
  bc.onmessage = async (event) => {
    if (event.data.ignoreUser && event.data.ignoreUser === user)
      return;
    console.log({ event });
    if (event.data.codeSpace === codeSpace && event.data.address && !address) {
      ws?.send(JSON.stringify({ codeSpace, address: event.data.address }));
    }
    if (event.data.ignoreUser) {
      !ignoreUsers.includes(event.data.ignoreUser) && ignoreUsers.push(event.data.ignoreUser);
    }
    if (event.data.codeSpace === codeSpace && event.data.sess.code !== mST().code) {
      const messageData = await makePatch(event.data.sess, setWsLastHashCode);
      await applyPatch(messageData);
    }
  };
  onSessionUpdate(
    (_f, messageData) => {
      bc.postMessage({
        ignoreUser: user,
        sess: mST(),
        codeSpace,
        address,
        messageData
      });
    },
    "broadcast"
  );
  await appFactory(startState.mST.transpiled);
  renderPreviewWindow(startState);
  await join();
};
var intervalHandler = null;
async function rejoin() {
  if (!rejoined || ws === null) {
    ws = null;
    const newWs = await join();
    return newWs;
  }
  return ws;
}
var ignoreUsers = [];
function saveCode() {
  debouncedSyncWs();
  debouncedSyncRTC();
}
var debouncedSyncRTC = (0, import_lodash.default)(syncRTC, 100, {
  trailing: true,
  leading: true,
  maxWait: 500
});
var debouncedSyncWs = (0, import_lodash.default)(syncWS, 1200, {
  trailing: true,
  leading: true,
  maxWait: 2500
});
async function syncWS() {
  try {
    if (ws) {
      if (wsLastHashCode === hashCode())
        return;
      const sess = mST();
      console.log({ wsLastHashCode });
      const message = await makePatchFrom(
        wsLastHashCode,
        sess
      );
      if (!message)
        return;
      if (message.newHash !== hashCode()) {
        console.error("NEW hash is not even hashCode", hashCode());
        return;
      }
      const messageString = JSON.stringify({ ...message, name: user });
      sendWS(messageString);
    } else {
      rejoined = false;
      await rejoin();
    }
  } catch (e) {
    console.error("error 2", { e });
  }
}
async function syncRTC() {
  try {
    if (Object.keys(rtcConns).length > 0) {
      if (webRTCLastSeenHashCode === hashCode())
        return;
      const sess = mST();
      console.log({ wsLastHashCode });
      const message = webRTCLastSeenHashCode ? await makePatchFrom(
        webRTCLastSeenHashCode,
        sess
      ) : await makePatch(sess);
      if (message && message.patch) {
        console.log("sendRTC");
        sendChannel.send(message);
      }
    }
  } catch (e) {
    console.error("Error sending RTC...", { e });
  }
}
async function join() {
  if (ws !== null)
    return ws;
  rejoined = true;
  console.log("WS connect!");
  if (location.host.includes("localhost"))
    return;
  const wsConnection = new WebSocket(
    `wss://${location.host}/live/` + codeSpace + "/websocket"
  );
  rejoined = false;
  wsConnection.addEventListener("open", () => {
    console.log("NEW WS CONNECTION");
    ws = wsConnection;
    const mess = (data) => {
      try {
        ws && ws?.send && ws?.send(data);
      } catch (e) {
        ws = null;
        rejoined = false;
        rejoin();
      }
    };
    sendWS = mess;
    ws.addEventListener(
      "message",
      (message) => processWsMessage(message, "ws")
    );
    if (intervalHandler) {
      clearInterval(intervalHandler);
    }
    intervalHandler = setInterval(() => {
      const now = Date.now();
      const diff = now - lastSeenNow;
      if (diff > 4e4) {
        try {
          if (wsConnection.readyState === wsConnection.OPEN) {
            return wsConnection?.send(
              JSON.stringify({
                name: user,
                timestamp: lastSeenTimestamp + diff
              })
            );
          }
          rejoined = false;
          rejoin();
        } catch {
          rejoined = false;
          rejoin();
        }
      }
    }, 3e4);
    wsConnection.send(JSON.stringify({ name: user }));
    return wsConnection;
  });
  return wsConnection;
}
var h2 = {};
async function processWsMessage(event, source) {
  if (ws == null)
    return;
  lastSeenNow = Date.now();
  const data = JSON.parse(event.data);
  processData(data, source);
}
async function processData(data, source) {
  console.log("ws", data.name, data.oldHash, data.newHash);
  if (source === "ws" && data.timestamp) {
    lastSeenNow = Date.now();
    lastSeenTimestamp = data.timestamp;
  }
  if (source === "ws" && data.hashCode) {
    wsLastHashCode = data.hashCode;
  }
  if (source === "ws" && data.hashCode) {
    wsLastHashCode = data.hashCode;
  }
  if (source === "rtc" && data.hashCode || data.newHash) {
    webRTCLastSeenHashCode = data.hashCode || data.newHash;
  }
  if (ignoreUsers.includes(data.name))
    return;
  if (data.newHash === hashCode())
    return;
  if (data.oldHash && data.newHash) {
    if (h2[data.oldHash] && h2[data.oldHash] === data.newHash)
      return;
    h2[data.oldHash] = data.newHash;
  }
  if (data.newHash === hashCode())
    return;
  (async () => {
    try {
      if (data.type === "new-ice-candidate") {
        await handleNewICECandidateMessage(data.candidate, data.name);
        return;
      }
      if (data.type === "offer") {
        await handleChatOffer(data.offer, data.name);
        return;
      }
      if (data.type === "answer") {
        await handleChatAnswerMessage(data.answer, data.name);
        return;
      }
      if (data.name && data.name !== user && !rtcConns[data.name]) {
        await createPeerConnection(data.name);
        return;
      }
    } catch (error) {
      console.log({ e: error });
      log_error("Error with p2p");
    }
  })();
  if (data.patch && data.name !== user) {
    if (data.newHash === hashCode()) {
      return;
    }
    await applyPatch(data);
    if (data.newHash === hashCode()) {
      if (sendChannel) {
        sendChannel.send({ hashCode: data.newHash });
      }
      return;
    } else {
      console.log("error -sending on sendChannel");
    }
    return;
  }
  if (data.patch && data.name === user) {
    wsLastHashCode = data.newHash;
    return;
  }
  if (data.name === user) {
    return;
  }
  if (wsLastHashCode !== hashCode()) {
  }
  function createPeerConnection(target) {
    log(`Setting up a connection with ${target}`);
    if (rtcConns[target]) {
      log(`Aborting, since we have connection with this ${target}`);
      return;
    }
    rtcConns[target] = new RTCPeerConnection(
      rcpOptions
    );
    rtcConns[target].onicecandidate = (event) => {
      if (event.candidate) {
        log("*** Outgoing ICE candidate: " + event.candidate);
        ws?.send(JSON.stringify({
          type: "new-ice-candidate",
          target,
          name: user,
          candidate: event.candidate.toJSON()
        }));
      }
    };
    rtcConns[target].oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
    rtcConns[target].onicegatheringstatechange = handleICEGatheringStateChangeEvent;
    rtcConns[target].onsignalingstatechange = () => {
      log(
        "*** rtcConns[target].signalingState  changed to: " + rtcConns[target].signalingState
      );
      switch (rtcConns[target].signalingState) {
        case "closed":
          break;
      }
    };
    rtcConns[target].onnegotiationneeded = handleNegotiationNeededEvent;
    rtcConns[target].ontrack = (ev) => console.log(ev);
    rtcConns[target].ondatachannel = (event) => {
      console.log("Receive Channel Callback");
      const rtc2 = event.channel;
      rtc2.binaryType = "arraybuffer";
      rtc2.addEventListener("close", onReceiveChannelClosed);
      rtc2.addEventListener(
        "message",
        (message) => processWsMessage(message, "rtc")
      );
      const rtcWithTarget = Object.assign(rtc2, { target });
      webRtcArray.push(rtcWithTarget);
    };
    const dataChannelOptions = {
      ordered: true,
      reliable: true,
      maxPacketLifeTime: 3e3
    };
    const rtc = Object.assign(
      rtcConns[target].createDataChannel(
        target,
        dataChannelOptions
      ),
      { target }
    );
    rtc.binaryType = "arraybuffer";
    rtc.addEventListener("message", (message) => {
      console.log("***********RTC***", { msg: message });
      const data2 = JSON.parse(message.data);
      if (data2 && data2.hashCode) {
        webRTCLastSeenHashCode = data2.hashCode;
      }
      if (data2 && data2.newHash) {
        webRTCLastSeenHashCode = data2.newHash;
      }
      return processWsMessage(message, "rtc");
    });
    rtc.addEventListener("error", (error) => {
      console.log("xxxxxx-  Data Channel Error:", error);
    });
    rtc.addEventListener("open", () => {
      console.log("@@@@@@@@RTC IS OPEN&&&&&&&&");
      webRtcArray.push(rtc);
    });
    rtc.addEventListener("close", () => {
      console.log("xxxxxxxx- The Data Channel is Closed");
    });
    return rtcConns[target];
    function onReceiveChannelClosed() {
      console.log("Receive channel is closed");
      rtcConns[target].close();
      delete rtcConns[target];
      console.log("Closed remote peer connection");
    }
    async function handleNegotiationNeededEvent() {
      log("*** Negotiation needed");
      try {
        log("---> Creating offer");
        const offer = await rtcConns[target].createOffer();
        if (rtcConns[target].signalingState != "stable") {
          log("The connection isn't stable yet; postponing...");
          return;
        }
        log("---> Setting local description to the offer");
        await rtcConns[target].setLocalDescription(offer);
        log("---> Sending the offer to the remote peer");
        ws?.send(JSON.stringify({
          target,
          name: user,
          type: "offer",
          offer: rtcConns[target].localDescription
        }));
      } catch {
        log(
          "*** The following error occurred while handling the negotiationneeded event:"
        );
      }
    }
    function handleICEConnectionStateChangeEvent() {
      log(
        "*** ICE connection state changed to " + rtcConns[target].iceConnectionState
      );
      switch (rtcConns[target].iceConnectionState) {
        case "closed":
        case "failed":
        case "disconnected":
          break;
      }
    }
    function handleICEGatheringStateChangeEvent() {
      log(
        "*** rtcConns[target].iceGatheringState changed to: " + rtcConns[target].iceGatheringState
      );
    }
  }
  async function handleChatAnswerMessage(answer, target) {
    log("*** Call recipient has accepted our call");
    await rtcConns[target].setRemoteDescription(
      new RTCSessionDescription(
        answer
      )
    ).catch(console.error);
  }
  async function handleChatOffer(offer, target) {
    if (!rtcConns[target])
      createPeerConnection(target);
    await rtcConns[target].setRemoteDescription(
      new RTCSessionDescription(offer)
    );
    log("---> Creating and sending answer to caller");
    const answer = await rtcConns[target].createAnswer();
    await rtcConns[target].setLocalDescription(
      answer
    );
    ws?.send(JSON.stringify({
      target,
      name: user,
      type: "answer",
      answer
    }));
  }
}
function log(text) {
  const time = new Date();
  console.log("[" + time.toLocaleTimeString() + "] " + text);
}
function log_error(text) {
  const time = new Date();
  console.trace("[" + time.toLocaleTimeString() + "] " + text);
}
var rcpOptions = {
  iceServers: ["stun3.l.google.com:19302"].map((url) => ({
    urls: `stun:${url}`
  }))
};
rcpOptions.iceServers = [{ urls: "stun:stun.stunprotocol.org:3478" }, {
  urls: "stun:stun.l.google.com:19302"
}];
async function handleNewICECandidateMessage(init, target) {
  log(
    "*** Adding received ICE candidate: " + JSON.stringify(init)
  );
  const candidate = new RTCIceCandidate(init);
  console.log(rtcConns[target]);
  await rtcConns[target].addIceCandidate(candidate);
}
async function sw() {
  try {
    navigator.serviceWorker.onmessage = async (event) => {
      const serviceWorker = event.source;
      if (serviceWorker == null)
        return;
      switch (event.data.method) {
        case "ipfs-message-port":
          console.log("Message port request");
          const channel = new MessageChannel();
          return serviceWorker.postMessage({
            method: "ipfs-message-port",
            id: event.data.id,
            port: channel.port2
          }, { transfer: [channel.port2] });
      }
    };
    if (document.documentElement.dataset.viewer) {
      const load = async (path) => {
        const paths = path && path.split("/") || [];
        const protocol = paths[0] || "";
        switch (protocol) {
          case "ipfs":
          case "ipns": {
            document.body.innerHTML = `<iframe id="viewer" style="width:100%;height:100%;position:fixed;top:0;left:0;border:none;" src="/view${path}"></iframe>`;
          }
        }
      };
      return load(location.pathname);
    }
  } catch {
    console.log("ipfs load error");
  }
}

export {
  run,
  saveCode,
  join,
  sw
};

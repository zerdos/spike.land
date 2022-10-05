import {
  applyPatch,
  hashCode,
  mST,
  makePatch,
  makePatchFrom,
  onSessionUpdate,
  patchSync,
  startSession
} from "./chunk-chunk-572ETWXX.mjs";
import {
  LazyMotion,
  domAnimation,
  domMax,
  m,
  motion
} from "./chunk-chunk-HOIPHXDO.mjs";
import {
  require_emotion_react_jsx_runtime_cjs
} from "./chunk-chunk-3K5FGABK.mjs";
import {
  require_emotion_react_cjs
} from "./chunk-chunk-C2ZKYUOB.mjs";
import {
  $,
  Children,
  PureComponent,
  Suspense,
  _n,
  cloneElement,
  createRef,
  createRoot,
  h,
  init_react_preact,
  isValidElement,
  lazy,
  p,
  useEffect,
  useMemo,
  useRef,
  useState
} from "./chunk-chunk-QVJ2UJAV.mjs";
import {
  init_define_process
} from "./chunk-chunk-QTIR5YHF.mjs";
import {
  __commonJS,
  __toESM
} from "./chunk-chunk-477FBAEY.mjs";

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
var import_lodash = __toESM(require_lodash(), 1);

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
var import_react15 = __toESM(require_emotion_react_cjs(), 1);

// js/starter.tsx
init_define_process();
var import_react2 = __toESM(require_emotion_react_cjs(), 1);
init_react_preact();

// js/ErrorBoundary.tsx
init_define_process();
init_react_preact();
var import_jsx_runtime = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var ErrorBoundary = class extends _n.Component {
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
  const hc = "0123456789abcdef";
  function rh(n) {
    let j;
    let s = "";
    for (j = 0; j <= 3; j++) {
      s += hc.charAt(n >> j * 8 + 4 & 15) + hc.charAt(n >> j * 8 & 15);
    }
    return s;
  }
  function ad(x2, y) {
    const l = (x2 & 65535) + (y & 65535);
    const m2 = (x2 >> 16) + (y >> 16) + (l >> 16);
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
    let i2;
    const nblk = (x2.length + 8 >> 6) + 1;
    const blks = Array.from({ length: nblk * 16 });
    for (i2 = 0; i2 < nblk * 16; i2++) {
      blks[i2] = 0;
    }
    for (i2 = 0; i2 < x2.length; i2++) {
      blks[i2 >> 2] |= x2.charCodeAt(i2) << i2 % 4 * 8;
    }
    blks[i2 >> 2] |= 128 << i2 % 4 * 8;
    blks[nblk * 16 - 2] = x2.length * 8;
    return blks;
  }
  let i;
  const x = sb(inputString);
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;
  let olda;
  let oldb;
  let oldc;
  let oldd;
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

// js/renderToString.tsx
init_define_process();
var renderFromString = (codeSpace2, hash) => {
  const md5hash = md5(mST().transpiled).slice(0, 8);
  if (hash !== hashCode()) {
    return { html: null, css: null };
  }
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
    for (const i in document.styleSheets) {
      let yesFromNow = false;
      const styleSheet = document.styleSheets[i];
      if (styleSheet?.cssRules) {
        for (const rule of Array.from(styleSheet.cssRules)) {
          if (yesFromNow || rule && rule.cssText && rule.cssText.startsWith(".css-")) {
            const selector = rule.cssText.slice(1, 9);
            const selectorText = selector;
            if (!rules[selector] && html.includes(selector) && !rule.cssText.slice(10).includes(".css-")) {
              yesFromNow = true;
              rules[selectorText] = rule.cssText;
            }
          }
        }
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
async function importShim(scr) {
  if (!document.scripts) {
    throw new Error("document.scripts");
  }
  const scripts = Array.from(document.scripts);
  const imap = scripts.find((s) => s.type === "importmap");
  if (!imap) {
    throw new Error("no imap");
  }
  await import("./chunk-es-module-shims-V26B5OGY.mjs");
  await window.importShim.addImportMap(
    JSON.parse(
      imap.innerText
    )
  );
  importShim = window.importShim;
  return importShim(scr);
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
  const trp = transpiled.length > 0 ? transpiled : mST().transpiled;
  const hash = md5(trp);
  if (!apps[hash]) {
    try {
      apps[hash] = (await importShim(createJsBlob(trp))).default;
    } catch (error) {
      if (error instanceof SyntaxError) {
        const name = error.name;
        const message = error.message;
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
              children: JSON.stringify({ err: error })
            })
          ]
        });
      } else if (error instanceof Error) {
        const name = error.name;
        const message = error.message;
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
              children: JSON.stringify({ err: error })
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

// js/DraggableWindow.tsx
init_define_process();
var import_react10 = __toESM(require_emotion_react_cjs(), 1);
init_react_preact();

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
var IconContext = _n.createContext && _n.createContext(DefaultContext);

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
    return _n.createElement(node.tag, __assign({
      key: i
    }, node.attr), Tree2Element(node.child));
  });
}
function GenIcon(data) {
  return function(props) {
    return _n.createElement(IconBase, __assign({
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
    return _n.createElement("svg", __assign({
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
    }), title && _n.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? _n.createElement(IconContext.Consumer, null, function(conf) {
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

// js/Qr.tsx
init_define_process();
var import_react8 = __toESM(require_emotion_react_cjs(), 1);
init_react_preact();

// js/icons.tsx
init_define_process();
var import_react6 = __toESM(require_emotion_react_cjs(), 1);
var import_jsx_runtime3 = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var Wrap = ({ children }) => (0, import_jsx_runtime3.jsx)("span", {
  css: import_react6.css`
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
var FabLazy = lazy(async () => import("./chunk-Fab-RF5DJ72S.mjs"));
var Fab = (props) => (0, import_jsx_runtime4.jsx)(Suspense, {
  children: (0, import_jsx_runtime4.jsx)(FabLazy, {
    ...props
  })
});
var ToggleButtonLazy = lazy(async () => import("./chunk-ToggleButton-RY4DYHAG.mjs"));
var ToggleButton = (props) => (0, import_jsx_runtime4.jsx)(Suspense, {
  children: (0, import_jsx_runtime4.jsx)(ToggleButtonLazy, {
    ...props
  })
});
var ToggleButtonGroupLazy = lazy(
  async () => import("./chunk-ToggleButtonGroup-6X77VE35.mjs")
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
var QRiousLazy = _n.lazy(
  async () => import("./chunk-lib-3NBL6X55.mjs").then(({ QRious: QRious2 }) => ({ default: QRious2 }))
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
    css: import_react8.css`
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
      css: import_react10.css`
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
        css: import_react10.css` 
              display: flex;
              
                `,
        children: [
          (0, import_jsx_runtime6.jsxs)("div", {
            css: import_react10.css`
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
                      css: import_react10.css`
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
                css: import_react10.css`

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
                  css: import_react10.css`
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
                      css: import_react10.css`
                        color: ${width === 680 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `,
                      children: (0, import_jsx_runtime6.jsx)(Phone, {})
                    }) : size === 768 ? (0, import_jsx_runtime6.jsx)("span", {
                      css: import_react10.css`
                        color: ${width === 768 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `,
                      children: (0, import_jsx_runtime6.jsx)(Tablet, {})
                    }) : (0, import_jsx_runtime6.jsx)("span", {
                      css: import_react10.css`
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
              css: import_react10.css`
              padding: 16px;
              display: flex;
              overflow: "hidden";
              align-items: center;          
              flex-direction: column;
              `,
              children: [
                (0, import_jsx_runtime6.jsx)(Fab, {
                  onClick: () => {
                    document.querySelector("#root")?.requestFullscreen();
                  },
                  children: (0, import_jsx_runtime6.jsx)("span", {
                    css: import_react10.css`
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
var import_react13 = __toESM(require_emotion_react_cjs(), 1);

// js/wait.ts
init_define_process();
async function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

// js/isMobile.mjs
init_define_process();
function isMobile() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel";
  let check = false;
  (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[23]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.slice(0, 4))) {
      check = true;
    }
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check && !isIOS;
}

// js/Editor.tsx
var import_jsx_runtime7 = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var mod = {
  CH() {
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
    async runner({ code: code2, counter: counter2, codeSpace: codeSpace3 }) {
      const { runner: runner2 } = await import("./chunk-runner-JWOGWZNI.mjs");
      const { prettierJs: prettierJs2 } = await import("./chunk-prettierJs-OJUT5PRH.mjs");
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
    setValue(_code) {
    },
    onChange(_cb) {
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
    if (!ref?.current) {
      return;
    }
    const setMonaco = async () => {
      const link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.href = location.origin + "/" + assets["ws.css"];
      document.head.append(link);
      const { startMonaco } = await import("./chunk-startMonaco-GUXWTROU.mjs");
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
        getValue() {
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
      const { startAce } = await import("./chunk-startAce-JLRPKVRX.mjs");
      const editor = await startAce(mST().code);
      changeContent((x) => ({
        ...x,
        onChange(cb) {
          editor.session.on("change", cb);
          return () => {
            editor.session.off("change", cb);
          };
        },
        started: true,
        getValue: () => editor.session.getValue(),
        setValue(code2) {
          editor.session.setValue(code2);
        },
        myId: "editor"
      }));
    };
    const loadEditors = async () => {
      await wait(100);
      await (engine === "monaco" ? setMonaco() : setAce());
      runner({ code, counter, codeSpace: codeSpace2 });
    };
    loadEditors();
  }, [started, ref]);
  useEffect(() => {
    if (!started) {
      return;
    }
    const lastCode = mod.code;
    let last = 0;
    const handler = setInterval(() => {
      const now = Date.now();
      if (now - last < 5e3) {
        return;
      }
      last = now;
      if (getValue() !== lastCode) {
        const code2 = getValue();
        if (code2 === mST().code || code2 === mod.code) {
          return;
        }
        changeContent((x) => ({ ...x, myCode: code2, i: i + 1 }));
        runner({ code: code2, counter, codeSpace: codeSpace2 });
      }
    }, 5e3);
    return () => {
      clearInterval(handler);
    };
  }, [changeContent, i, runner, prettierJs]);
  useEffect(() => {
    if (!started) {
      return;
    }
    if (i > counter) {
      changeContent((x) => ({ ...x, myCode: code, counter: i }));
      return;
    }
    const cb = async () => {
      const code2 = getValue();
      const newCode = prettierJs(code2);
      if (newCode === mod.code) {
        return;
      }
      if (newCode === mST().code) {
        return;
      }
      try {
        changeContent((x) => ({
          ...x,
          counter: counter + 1,
          myCode: newCode
        }));
        await runner({ code: newCode, counter: counter + 1, codeSpace: codeSpace2 });
      } catch (error) {
        console.error({ err: error });
        console.error("restore editor");
      }
    };
    onChange(async () => cb());
  }, [setValue, getValue, onChange, counter, prettierJs, runner]);
  onSessionUpdate(() => {
    const sess = mST();
    setTimeout(() => {
      if (sess.i <= counter) {
        return;
      }
      if (mST().i > sess.i) {
        return;
      }
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
    css: import_react13.css`
        
            max-width: 640px;
            height: 100%;
            
            
        `,
    ref
  });
};

// js/renderPreviewWindow.tsx
var import_jsx_runtime8 = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var RainbowContainer = ({ children }) => (0, import_jsx_runtime8.jsx)("div", {
  css: import_react15.css`
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
        } catch (error) {
          console.error({ e: error });
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
  const div = document.querySelector("#root");
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
  send(data) {
    const target = data.target;
    const messageString = JSON.stringify({
      ...data,
      name: data.name || user
    });
    webRtcArray.map((ch) => {
      try {
        console.log("WebRtc send", data, ch);
        if (ch.readyState !== "open") {
          return;
        }
        if (!target || ch.target === target && !ignoreUsers.includes(ch.target)) {
          ch.send(messageString);
        }
      } catch (error) {
        console.error("Error in broadcasting event", { e: error });
      }
    });
  }
};
var setWsLastHashCode = (hashCode2) => {
  wsLastHashCode = Number(hashCode2);
};
var run = async (startState) => {
  if (location.pathname.endsWith("dehydrated")) {
    return;
  }
  codeSpace = startState.codeSpace;
  address = startState.address;
  startSession(codeSpace, {
    name: user,
    state: startState.mST
  }, location.origin);
  bc = new BroadcastChannel("spike.land");
  bc.onmessage = async (event) => {
    if (event.data.ignoreUser && event.data.ignoreUser === user) {
      return;
    }
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
      if (wsLastHashCode === hashCode()) {
        return;
      }
      const sess = mST();
      console.log({ wsLastHashCode });
      const message = await makePatchFrom(
        wsLastHashCode,
        sess
      );
      if (!message) {
        return;
      }
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
  } catch (error) {
    console.error("error 2", { e: error });
  }
}
async function syncRTC() {
  try {
    if (Object.keys(rtcConns).length > 0) {
      if (webRTCLastSeenHashCode === hashCode()) {
        return;
      }
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
  } catch (error) {
    console.error("Error sending RTC...", { e: error });
  }
}
async function join() {
  if (ws !== null) {
    return ws;
  }
  rejoined = true;
  console.log("WS connect!");
  if (location.host.includes("localhost")) {
    return;
  }
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
      } catch {
        ws = null;
        rejoined = false;
        rejoin();
      }
    };
    sendWS = mess;
    ws.addEventListener(
      "message",
      async (message) => processWsMessage(message, "ws")
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
            wsConnection?.send(
              JSON.stringify({
                name: user,
                timestamp: lastSeenTimestamp + diff
              })
            );
            return;
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
  if (ws == null) {
    return;
  }
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
  if (ignoreUsers.includes(data.name)) {
    return;
  }
  if (data.newHash === hashCode()) {
    return;
  }
  if (data.oldHash && data.newHash) {
    if (h2[data.oldHash] && h2[data.oldHash] === data.newHash) {
      return;
    }
    h2[data.oldHash] = data.newHash;
  }
  if (data.newHash === hashCode()) {
    return;
  }
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
    }
    console.log("error -sending on sendChannel");
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
    rtcConns[target].ontrack = (ev) => {
      console.log(ev);
    };
    rtcConns[target].ondatachannel = (event) => {
      console.log("Receive Channel Callback");
      const rtc2 = event.channel;
      rtc2.binaryType = "arraybuffer";
      rtc2.addEventListener("close", onReceiveChannelClosed);
      rtc2.addEventListener(
        "message",
        async (message) => processWsMessage(message, "rtc")
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
    rtc.addEventListener("message", async (message) => {
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
    if (!rtcConns[target]) {
      createPeerConnection(target);
    }
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
      if (serviceWorker == null) {
        return;
      }
      switch (event.data.method) {
        case "ipfs-message-port":
          console.log("Message port request");
          const channel = new MessageChannel();
          {
            serviceWorker.postMessage({
              method: "ipfs-message-port",
              id: event.data.id,
              port: channel.port2
            }, { transfer: [channel.port2] });
          }
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
      await load(location.pathname);
      return;
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

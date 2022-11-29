import {
  require_emotion_react_cjs
} from "./chunk-chunk-CTKH5FCC.mjs";
import {
  require_emotion_react_jsx_runtime_cjs
} from "./chunk-chunk-MYCITQ4M.mjs";
import {
  require_react
} from "./chunk-chunk-UX3KX3KY.mjs";
import {
  __name,
  __toESM,
  init_define_process
} from "./chunk-chunk-A3E5PINE.mjs";

// ../../.yarn/__virtual__/react-icons-virtual-252d5562a0/0/global/cache/react-icons-npm-4.7.1-27c284b383-9.zip/node_modules/react-icons/md/index.esm.js
init_define_process();

// ../../.yarn/__virtual__/react-icons-virtual-252d5562a0/0/global/cache/react-icons-npm-4.7.1-27c284b383-9.zip/node_modules/react-icons/lib/esm/index.js
init_define_process();

// ../../.yarn/__virtual__/react-icons-virtual-252d5562a0/0/global/cache/react-icons-npm-4.7.1-27c284b383-9.zip/node_modules/react-icons/lib/esm/iconsManifest.js
init_define_process();

// ../../.yarn/__virtual__/react-icons-virtual-252d5562a0/0/global/cache/react-icons-npm-4.7.1-27c284b383-9.zip/node_modules/react-icons/lib/esm/iconBase.js
init_define_process();
var import_react2 = __toESM(require_react());

// ../../.yarn/__virtual__/react-icons-virtual-252d5562a0/0/global/cache/react-icons-npm-4.7.1-27c284b383-9.zip/node_modules/react-icons/lib/esm/iconContext.js
init_define_process();
var import_react = __toESM(require_react());
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = import_react.default.createContext && import_react.default.createContext(DefaultContext);

// ../../.yarn/__virtual__/react-icons-virtual-252d5562a0/0/global/cache/react-icons-npm-4.7.1-27c284b383-9.zip/node_modules/react-icons/lib/esm/iconBase.js
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function Tree2Element(tree) {
  return tree && tree.map(function(node, i) {
    return import_react2.default.createElement(node.tag, __assign({
      key: i
    }, node.attr), Tree2Element(node.child));
  });
}
__name(Tree2Element, "Tree2Element");
function GenIcon(data) {
  return function(props) {
    return import_react2.default.createElement(IconBase, __assign({
      attr: __assign({}, data.attr)
    }, props), Tree2Element(data.child));
  };
}
__name(GenIcon, "GenIcon");
function IconBase(props) {
  var elem = /* @__PURE__ */ __name(function(conf) {
    var attr = props.attr, size = props.size, title = props.title, svgProps = __rest(props, ["attr", "size", "title"]);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className)
      className = conf.className;
    if (props.className)
      className = (className ? className + " " : "") + props.className;
    return import_react2.default.createElement("svg", __assign({
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
    }), title && import_react2.default.createElement("title", null, title), props.children);
  }, "elem");
  return IconContext !== void 0 ? import_react2.default.createElement(IconContext.Consumer, null, function(conf) {
    return elem(conf);
  }) : elem(DefaultContext);
}
__name(IconBase, "IconBase");

// ../../.yarn/__virtual__/react-icons-virtual-252d5562a0/0/global/cache/react-icons-npm-4.7.1-27c284b383-9.zip/node_modules/react-icons/md/index.esm.js
function MdQrCode(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM19 19h2v2h-2zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM15 19h2v2h-2zM17 17h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2z" } }] })(props);
}
__name(MdQrCode, "MdQrCode");
function MdPhoneAndroid(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z" } }] })(props);
}
__name(MdPhoneAndroid, "MdPhoneAndroid");
function MdTabletAndroid(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z" } }] })(props);
}
__name(MdTabletAndroid, "MdTabletAndroid");
function MdTv(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" } }] })(props);
}
__name(MdTv, "MdTv");
function MdFullscreen(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" } }] })(props);
}
__name(MdFullscreen, "MdFullscreen");
function MdShare(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" } }] })(props);
}
__name(MdShare, "MdShare");

// js/icons.tsx
init_define_process();
var import_react3 = __toESM(require_emotion_react_cjs(), 1);
var import_jsx_runtime = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var Wrap = /* @__PURE__ */ __name(({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  "span",
  {
    css: import_react3.css`
font-size:20pt;
`,
    children
  }
), "Wrap");
var QrCodeIcon = /* @__PURE__ */ __name(() => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdQrCode, {}) }), "QrCodeIcon");
var Phone = /* @__PURE__ */ __name(() => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdPhoneAndroid, {}) }), "Phone");
var Share = /* @__PURE__ */ __name(() => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdShare, {}) }), "Share");
var Tablet = /* @__PURE__ */ __name(() => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdTabletAndroid, {}) }), "Tablet");
var Tv = /* @__PURE__ */ __name(() => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdTv, {}) }), "Tv");

// js/mui.tsx
init_define_process();
var import_react4 = __toESM(require_emotion_react_cjs(), 1);
var import_react5 = __toESM(require_react(), 1);
var import_jsx_runtime2 = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var FabLazy = (0, import_react5.lazy)(async () => import("./chunk-Fab-5PNRT4BD.mjs"));
var Fab = /* @__PURE__ */ __name((props) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react5.Suspense, { fallback: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { css: import_react4.css`width: 28px; height:28px` }), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(FabLazy, { ...props }) }), "Fab");
var ToggleButtonLazy = (0, import_react5.lazy)(async () => import("./chunk-ToggleButton-PXWSE7PW.mjs"));
var ToggleButton = /* @__PURE__ */ __name((props) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react5.Suspense, { fallback: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { css: import_react4.css`width: 28px; height:28px` }), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ToggleButtonLazy, { ...props }) }), "ToggleButton");
var ToggleButtonGroupLazy = (0, import_react5.lazy)(async () => import("./chunk-ToggleButtonGroup-EH3OTGGE.mjs"));
var ToggleButtonGroup = /* @__PURE__ */ __name((props) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react5.Suspense, { fallback: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { css: import_react4.css`width: 28px; height:28px` }), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ToggleButtonGroupLazy, { ...props }) }), "ToggleButtonGroup");

export {
  MdFullscreen,
  QrCodeIcon,
  Phone,
  Share,
  Tablet,
  Tv,
  Fab,
  ToggleButton,
  ToggleButtonGroup
};

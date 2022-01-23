import {
  LazySpikeLandComponent
} from "./chunk-SZGP6JU2.mjs";
import {
  wait
} from "./chunk-PL2TSUJW.mjs";
import "./chunk-XHYF4LCB.mjs";

// js/renderPreviewWindow.tsx
import { jsx as jsx4 } from "https://unpkg.com/@spike.land/esm@0.6.71/dist/emotion-react.mjs";

// js/DraggableWindow.tsx
import { css as css2, jsx as jsx3 } from "https://unpkg.com/@spike.land/esm@0.6.71/dist/emotion-react.mjs";
import React2, {
  useEffect,
  useRef,
  useState
} from "https://unpkg.com/@spike.land/esm@0.6.71/dist/react.mjs";
import { motion as motion2 } from "https://unpkg.com/@spike.land/esm@0.6.71/dist/framer-motion.mjs";

// js/mui.tsx
import { jsx } from "https://unpkg.com/@spike.land/esm@0.6.71/dist/emotion-react.mjs";
import Fab from "https://ga.jspm.io/npm:@mui/material@5.3.0/Fab/index.js";
import Button from "https://ga.jspm.io/npm:@mui/material@5.3.0/Button/index.js";
import createSvgIcon from "https://ga.jspm.io/npm:@mui/material@5.3.0/utils/createSvgIcon.js";
import { default as default2 } from "https://ga.jspm.io/npm:@mui/material@5.3.0/ToggleButton/index.js";
import { default as default3 } from "https://ga.jspm.io/npm:@mui/material@5.3.0/ToggleButtonGroup/index.js";
var FullscreenIcon = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M17 4h5v5h-2V6h-3V4zM4 9V6h3V4H2v5h2zm16 6v3h-3v2h5v-5h-2zM7 18H4v-3H2v5h5v-2zM18 8H6v8h12V8z"
}), "Fullscreen");
var Phone = createSvgIcon(/* @__PURE__ */ jsx("path", {
  key: "12",
  d: "M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z"
}), "PhoneAndroid");
var MyButton = ({ onClick, children }) => /* @__PURE__ */ jsx(Button, {
  variant: "contained",
  color: "primary",
  onClick
}, children);
var Share = createSvgIcon(/* @__PURE__ */ jsx("path", {
  key: "12",
  d: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
}), "Share");
var Tablet = createSvgIcon(/* @__PURE__ */ jsx("path", {
  key: "12",
  d: "M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z"
}), "TabletAndroid");
var Tv = createSvgIcon(/* @__PURE__ */ jsx("path", {
  key: "12",
  d: "M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"
}), "Tv");
var MyFsb = ({ onClick, children }) => /* @__PURE__ */ jsx(Fab, {
  variant: "extended",
  color: "primary",
  onClick
}, children);
var QrCode = createSvgIcon(/* @__PURE__ */ jsx("path", {
  key: "12",
  d: "M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm8-12v8h8V3h-8zm6 6h-4V5h4v4zm0 10h2v2h-2zm-6-6h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm2 2h2v2h-2zm2-2h2v2h-2zm0-4h2v2h-2zm2 2h2v2h-2z"
}), "QrCode");

// js/Qr.tsx
import { css, jsx as jsx2 } from "https://unpkg.com/@spike.land/esm@0.6.71/dist/emotion-react.mjs";
import { motion } from "https://unpkg.com/@spike.land/esm@0.6.71/dist/framer-motion.mjs";
import React from "https://unpkg.com/@spike.land/esm@0.6.71/dist/react.mjs";

// ../qrious/dist/QRious.mjs
var ve = Object.create;
var w = Object.defineProperty;
var _e = Object.getOwnPropertyDescriptor;
var be = Object.getOwnPropertyNames;
var me = Object.getPrototypeOf;
var pe = Object.prototype.hasOwnProperty;
var ke = (t) => w(t, "__esModule", { value: true });
var o = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
var ge = (t, e, i, r) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let x of be(e))
      !pe.call(t, x) && (i || x !== "default") && w(t, x, { get: () => e[x], enumerable: !(r = _e(e, x)) || r.enumerable });
  return t;
};
var N = (t, e) => ge(ke(w(t != null ? ve(me(t)) : {}, "default", !e && t && t.__esModule ? { get: () => t.default, enumerable: true } : { value: t, enumerable: true })), t);
var E = o((c0, A) => {
  "use strict";
  var B = function() {
  }, we = Object.prototype.hasOwnProperty, Be = Array.prototype.slice;
  function Me(t, e) {
    var i;
    return typeof Object.create == "function" ? i = Object.create(t) : (B.prototype = t, i = new B(), B.prototype = null), e && y(true, i, e), i;
  }
  function qe(t, e, i, r) {
    var x = this;
    return typeof t != "string" && (r = i, i = e, e = t, t = null), typeof e != "function" && (r = i, i = e, e = function() {
      return x.apply(this, arguments);
    }), y(false, e, x, r), e.prototype = Me(x.prototype, i), e.prototype.constructor = e, e.class_ = t || x.class_, e.super_ = x, e;
  }
  function y(t, e, i) {
    i = Be.call(arguments, 2);
    for (var r, x, s = 0, a = i.length; s < a; s++) {
      x = i[s];
      for (r in x)
        (!t || we.call(x, r)) && (e[r] = x[r]);
    }
  }
  A.exports = qe;
});
var C = o((u0, S) => {
  "use strict";
  var Oe = E();
  function p() {
  }
  p.class_ = "Nevis";
  p.super_ = Object;
  p.extend = Oe;
  S.exports = p;
});
var u = o((h0, L) => {
  "use strict";
  L.exports = C();
});
var M = o((d0, R) => {
  "use strict";
  var Ne = u(), ye = Ne.extend(function(t, e, i) {
    this.qrious = t, this.element = e, this.element.qrious = t, this.enabled = Boolean(i);
  }, { draw: function(t) {
  }, getElement: function() {
    return this.enabled || (this.enabled = true, this.render()), this.element;
  }, getModuleSize: function(t) {
    var e = this.qrious, i = e.padding || 0, r = Math.floor((e.size - i * 2) / t.width);
    return Math.max(1, r);
  }, getOffset: function(t) {
    var e = this.qrious, i = e.padding;
    if (i != null)
      return i;
    var r = this.getModuleSize(t), x = Math.floor((e.size - r * t.width) / 2);
    return Math.max(0, x);
  }, render: function(t) {
    this.enabled && (this.resize(), this.reset(), this.draw(t));
  }, reset: function() {
  }, resize: function() {
  } });
  R.exports = ye;
});
var j = o((l0, T) => {
  "use strict";
  var Ae = M(), Ee = Ae.extend({ draw: function(t) {
    var e, i, r = this.qrious, x = this.getModuleSize(t), s = this.getOffset(t), a = this.element.getContext("2d");
    for (a.fillStyle = r.foreground, a.globalAlpha = r.foregroundAlpha, e = 0; e < t.width; e++)
      for (i = 0; i < t.width; i++)
        t.buffer[i * t.width + e] && a.fillRect(x * e + s, x * i + s, x, x);
  }, reset: function() {
    var t = this.qrious, e = this.element.getContext("2d"), i = t.size;
    e.lineWidth = 1, e.clearRect(0, 0, i, i), e.fillStyle = t.background, e.globalAlpha = t.backgroundAlpha, e.fillRect(0, 0, i, i);
  }, resize: function() {
    var t = this.element;
    t.width = t.height = this.qrious.size;
  } });
  T.exports = Ee;
});
var I = o((v0, z) => {
  "use strict";
  var Se = u(), Ce = Se.extend(null, { BLOCK: [0, 11, 15, 19, 23, 27, 31, 16, 18, 20, 22, 24, 26, 28, 20, 22, 24, 24, 26, 28, 28, 22, 24, 24, 26, 26, 28, 28, 24, 24, 26, 26, 26, 28, 28, 24, 26, 26, 26, 28, 28] });
  z.exports = Ce;
});
var V = o((_0, P) => {
  "use strict";
  var Le = u(), Re = Le.extend(null, { BLOCKS: [1, 0, 19, 7, 1, 0, 16, 10, 1, 0, 13, 13, 1, 0, 9, 17, 1, 0, 34, 10, 1, 0, 28, 16, 1, 0, 22, 22, 1, 0, 16, 28, 1, 0, 55, 15, 1, 0, 44, 26, 2, 0, 17, 18, 2, 0, 13, 22, 1, 0, 80, 20, 2, 0, 32, 18, 2, 0, 24, 26, 4, 0, 9, 16, 1, 0, 108, 26, 2, 0, 43, 24, 2, 2, 15, 18, 2, 2, 11, 22, 2, 0, 68, 18, 4, 0, 27, 16, 4, 0, 19, 24, 4, 0, 15, 28, 2, 0, 78, 20, 4, 0, 31, 18, 2, 4, 14, 18, 4, 1, 13, 26, 2, 0, 97, 24, 2, 2, 38, 22, 4, 2, 18, 22, 4, 2, 14, 26, 2, 0, 116, 30, 3, 2, 36, 22, 4, 4, 16, 20, 4, 4, 12, 24, 2, 2, 68, 18, 4, 1, 43, 26, 6, 2, 19, 24, 6, 2, 15, 28, 4, 0, 81, 20, 1, 4, 50, 30, 4, 4, 22, 28, 3, 8, 12, 24, 2, 2, 92, 24, 6, 2, 36, 22, 4, 6, 20, 26, 7, 4, 14, 28, 4, 0, 107, 26, 8, 1, 37, 22, 8, 4, 20, 24, 12, 4, 11, 22, 3, 1, 115, 30, 4, 5, 40, 24, 11, 5, 16, 20, 11, 5, 12, 24, 5, 1, 87, 22, 5, 5, 41, 24, 5, 7, 24, 30, 11, 7, 12, 24, 5, 1, 98, 24, 7, 3, 45, 28, 15, 2, 19, 24, 3, 13, 15, 30, 1, 5, 107, 28, 10, 1, 46, 28, 1, 15, 22, 28, 2, 17, 14, 28, 5, 1, 120, 30, 9, 4, 43, 26, 17, 1, 22, 28, 2, 19, 14, 28, 3, 4, 113, 28, 3, 11, 44, 26, 17, 4, 21, 26, 9, 16, 13, 26, 3, 5, 107, 28, 3, 13, 41, 26, 15, 5, 24, 30, 15, 10, 15, 28, 4, 4, 116, 28, 17, 0, 42, 26, 17, 6, 22, 28, 19, 6, 16, 30, 2, 7, 111, 28, 17, 0, 46, 28, 7, 16, 24, 30, 34, 0, 13, 24, 4, 5, 121, 30, 4, 14, 47, 28, 11, 14, 24, 30, 16, 14, 15, 30, 6, 4, 117, 30, 6, 14, 45, 28, 11, 16, 24, 30, 30, 2, 16, 30, 8, 4, 106, 26, 8, 13, 47, 28, 7, 22, 24, 30, 22, 13, 15, 30, 10, 2, 114, 28, 19, 4, 46, 28, 28, 6, 22, 28, 33, 4, 16, 30, 8, 4, 122, 30, 22, 3, 45, 28, 8, 26, 23, 30, 12, 28, 15, 30, 3, 10, 117, 30, 3, 23, 45, 28, 4, 31, 24, 30, 11, 31, 15, 30, 7, 7, 116, 30, 21, 7, 45, 28, 1, 37, 23, 30, 19, 26, 15, 30, 5, 10, 115, 30, 19, 10, 47, 28, 15, 25, 24, 30, 23, 25, 15, 30, 13, 3, 115, 30, 2, 29, 46, 28, 42, 1, 24, 30, 23, 28, 15, 30, 17, 0, 115, 30, 10, 23, 46, 28, 10, 35, 24, 30, 19, 35, 15, 30, 17, 1, 115, 30, 14, 21, 46, 28, 29, 19, 24, 30, 11, 46, 15, 30, 13, 6, 115, 30, 14, 23, 46, 28, 44, 7, 24, 30, 59, 1, 16, 30, 12, 7, 121, 30, 12, 26, 47, 28, 39, 14, 24, 30, 22, 41, 15, 30, 6, 14, 121, 30, 6, 34, 47, 28, 46, 10, 24, 30, 2, 64, 15, 30, 17, 4, 122, 30, 29, 14, 46, 28, 49, 10, 24, 30, 24, 46, 15, 30, 4, 18, 122, 30, 13, 32, 46, 28, 48, 14, 24, 30, 42, 32, 15, 30, 20, 4, 117, 30, 40, 7, 47, 28, 43, 22, 24, 30, 10, 67, 15, 30, 19, 6, 118, 30, 18, 31, 47, 28, 34, 34, 24, 30, 20, 61, 15, 30], FINAL_FORMAT: [30660, 29427, 32170, 30877, 26159, 25368, 27713, 26998, 21522, 20773, 24188, 23371, 17913, 16590, 20375, 19104, 13663, 12392, 16177, 14854, 9396, 8579, 11994, 11245, 5769, 5054, 7399, 6608, 1890, 597, 3340, 2107], LEVELS: { L: 1, M: 2, Q: 3, H: 4 } });
  P.exports = Re;
});
var K = o((b0, G) => {
  "use strict";
  var Te = u(), je = Te.extend(null, { EXPONENT: [1, 2, 4, 8, 16, 32, 64, 128, 29, 58, 116, 232, 205, 135, 19, 38, 76, 152, 45, 90, 180, 117, 234, 201, 143, 3, 6, 12, 24, 48, 96, 192, 157, 39, 78, 156, 37, 74, 148, 53, 106, 212, 181, 119, 238, 193, 159, 35, 70, 140, 5, 10, 20, 40, 80, 160, 93, 186, 105, 210, 185, 111, 222, 161, 95, 190, 97, 194, 153, 47, 94, 188, 101, 202, 137, 15, 30, 60, 120, 240, 253, 231, 211, 187, 107, 214, 177, 127, 254, 225, 223, 163, 91, 182, 113, 226, 217, 175, 67, 134, 17, 34, 68, 136, 13, 26, 52, 104, 208, 189, 103, 206, 129, 31, 62, 124, 248, 237, 199, 147, 59, 118, 236, 197, 151, 51, 102, 204, 133, 23, 46, 92, 184, 109, 218, 169, 79, 158, 33, 66, 132, 21, 42, 84, 168, 77, 154, 41, 82, 164, 85, 170, 73, 146, 57, 114, 228, 213, 183, 115, 230, 209, 191, 99, 198, 145, 63, 126, 252, 229, 215, 179, 123, 246, 241, 255, 227, 219, 171, 75, 150, 49, 98, 196, 149, 55, 110, 220, 165, 87, 174, 65, 130, 25, 50, 100, 200, 141, 7, 14, 28, 56, 112, 224, 221, 167, 83, 166, 81, 162, 89, 178, 121, 242, 249, 239, 195, 155, 43, 86, 172, 69, 138, 9, 18, 36, 72, 144, 61, 122, 244, 245, 247, 243, 251, 235, 203, 139, 11, 22, 44, 88, 176, 125, 250, 233, 207, 131, 27, 54, 108, 216, 173, 71, 142, 0], LOG: [255, 0, 1, 25, 2, 50, 26, 198, 3, 223, 51, 238, 27, 104, 199, 75, 4, 100, 224, 14, 52, 141, 239, 129, 28, 193, 105, 248, 200, 8, 76, 113, 5, 138, 101, 47, 225, 36, 15, 33, 53, 147, 142, 218, 240, 18, 130, 69, 29, 181, 194, 125, 106, 39, 249, 185, 201, 154, 9, 120, 77, 228, 114, 166, 6, 191, 139, 98, 102, 221, 48, 253, 226, 152, 37, 179, 16, 145, 34, 136, 54, 208, 148, 206, 143, 150, 219, 189, 241, 210, 19, 92, 131, 56, 70, 64, 30, 66, 182, 163, 195, 72, 126, 110, 107, 58, 40, 84, 250, 133, 186, 61, 202, 94, 155, 159, 10, 21, 121, 43, 78, 212, 229, 172, 115, 243, 167, 87, 7, 112, 192, 247, 140, 128, 99, 13, 103, 74, 222, 237, 49, 197, 254, 24, 227, 165, 153, 119, 38, 184, 180, 124, 17, 68, 146, 217, 35, 32, 137, 46, 55, 63, 209, 91, 149, 188, 207, 205, 144, 135, 151, 178, 220, 252, 190, 97, 242, 86, 211, 171, 20, 42, 93, 158, 132, 60, 57, 83, 71, 109, 65, 162, 31, 45, 67, 216, 183, 123, 164, 118, 196, 23, 73, 236, 127, 12, 111, 246, 108, 161, 59, 82, 41, 157, 85, 170, 251, 96, 134, 177, 187, 204, 62, 90, 203, 89, 95, 176, 156, 169, 160, 81, 11, 245, 22, 235, 122, 117, 44, 215, 79, 174, 213, 233, 230, 231, 173, 232, 116, 214, 244, 234, 168, 80, 88, 175] });
  G.exports = je;
});
var D = o((m0, U) => {
  "use strict";
  var ze = u(), Ie = ze.extend(null, { BLOCK: [3220, 1468, 2713, 1235, 3062, 1890, 2119, 1549, 2344, 2936, 1117, 2583, 1330, 2470, 1667, 2249, 2028, 3780, 481, 4011, 142, 3098, 831, 3445, 592, 2517, 1776, 2234, 1951, 2827, 1070, 2660, 1345, 3177] });
  U.exports = Ie;
});
var Q = o((p0, F) => {
  "use strict";
  var Pe = u(), Ve = I(), _ = V(), l = K(), Ge = D(), c = Pe.extend(function(t) {
    var e, i, r, x, s, a = t.value.length;
    for (this._badness = [], this._level = _.LEVELS[t.level], this._polynomial = [], this._value = t.value, this._version = 0, this._stringBuffer = []; this._version < 40 && (this._version++, r = (this._level - 1) * 4 + (this._version - 1) * 16, x = _.BLOCKS[r++], s = _.BLOCKS[r++], e = _.BLOCKS[r++], i = _.BLOCKS[r], r = e * (x + s) + s - 3 + (this._version <= 9), !(a <= r)); )
      ;
    this._dataBlock = e, this._eccBlock = i, this._neccBlock1 = x, this._neccBlock2 = s;
    var n = this.width = 17 + 4 * this._version;
    this.buffer = c._createArray(n * n), this._ecc = c._createArray(e + (e + i) * (x + s) + s), this._mask = c._createArray((n * (n + 1) + 1) / 2), this._insertFinders(), this._insertAlignments(), this.buffer[8 + n * (n - 8)] = 1, this._insertTimingGap(), this._reverseMask(), this._insertTimingRowAndColumn(), this._insertVersion(), this._syncMask(), this._convertBitStream(a), this._calculatePolynomial(), this._appendEccToData(), this._interleaveBlocks(), this._pack(), this._finish();
  }, { _addAlignment: function(t, e) {
    var i, r = this.buffer, x = this.width;
    for (r[t + x * e] = 1, i = -2; i < 2; i++)
      r[t + i + x * (e - 2)] = 1, r[t - 2 + x * (e + i + 1)] = 1, r[t + 2 + x * (e + i)] = 1, r[t + i + 1 + x * (e + 2)] = 1;
    for (i = 0; i < 2; i++)
      this._setMask(t - 1, e + i), this._setMask(t + 1, e - i), this._setMask(t - i, e - 1), this._setMask(t + i, e + 1);
  }, _appendData: function(t, e, i, r) {
    var x, s, a, n = this._polynomial, f = this._stringBuffer;
    for (s = 0; s < r; s++)
      f[i + s] = 0;
    for (s = 0; s < e; s++) {
      if (x = l.LOG[f[t + s] ^ f[i]], x !== 255)
        for (a = 1; a < r; a++)
          f[i + a - 1] = f[i + a] ^ l.EXPONENT[c._modN(x + n[r - a])];
      else
        for (a = i; a < i + r; a++)
          f[a] = f[a + 1];
      f[i + r - 1] = x === 255 ? 0 : l.EXPONENT[c._modN(x + n[0])];
    }
  }, _appendEccToData: function() {
    var t, e = 0, i = this._dataBlock, r = this._calculateMaxLength(), x = this._eccBlock;
    for (t = 0; t < this._neccBlock1; t++)
      this._appendData(e, i, r, x), e += i, r += x;
    for (t = 0; t < this._neccBlock2; t++)
      this._appendData(e, i + 1, r, x), e += i + 1, r += x;
  }, _applyMask: function(t) {
    var e, i, r, x, s = this.buffer, a = this.width;
    switch (t) {
      case 0:
        for (x = 0; x < a; x++)
          for (r = 0; r < a; r++)
            !(r + x & 1) && !this._isMasked(r, x) && (s[r + x * a] ^= 1);
        break;
      case 1:
        for (x = 0; x < a; x++)
          for (r = 0; r < a; r++)
            !(x & 1) && !this._isMasked(r, x) && (s[r + x * a] ^= 1);
        break;
      case 2:
        for (x = 0; x < a; x++)
          for (e = 0, r = 0; r < a; r++, e++)
            e === 3 && (e = 0), !e && !this._isMasked(r, x) && (s[r + x * a] ^= 1);
        break;
      case 3:
        for (i = 0, x = 0; x < a; x++, i++)
          for (i === 3 && (i = 0), e = i, r = 0; r < a; r++, e++)
            e === 3 && (e = 0), !e && !this._isMasked(r, x) && (s[r + x * a] ^= 1);
        break;
      case 4:
        for (x = 0; x < a; x++)
          for (e = 0, i = x >> 1 & 1, r = 0; r < a; r++, e++)
            e === 3 && (e = 0, i = !i), !i && !this._isMasked(r, x) && (s[r + x * a] ^= 1);
        break;
      case 5:
        for (i = 0, x = 0; x < a; x++, i++)
          for (i === 3 && (i = 0), e = 0, r = 0; r < a; r++, e++)
            e === 3 && (e = 0), !((r & x & 1) + !(!e | !i)) && !this._isMasked(r, x) && (s[r + x * a] ^= 1);
        break;
      case 6:
        for (i = 0, x = 0; x < a; x++, i++)
          for (i === 3 && (i = 0), e = 0, r = 0; r < a; r++, e++)
            e === 3 && (e = 0), !((r & x & 1) + (e && e === i) & 1) && !this._isMasked(r, x) && (s[r + x * a] ^= 1);
        break;
      case 7:
        for (i = 0, x = 0; x < a; x++, i++)
          for (i === 3 && (i = 0), e = 0, r = 0; r < a; r++, e++)
            e === 3 && (e = 0), !((e && e === i) + (r + x & 1) & 1) && !this._isMasked(r, x) && (s[r + x * a] ^= 1);
        break;
    }
  }, _calculateMaxLength: function() {
    return this._dataBlock * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;
  }, _calculatePolynomial: function() {
    var t, e, i = this._eccBlock, r = this._polynomial;
    for (r[0] = 1, t = 0; t < i; t++) {
      for (r[t + 1] = 1, e = t; e > 0; e--)
        r[e] = r[e] ? r[e - 1] ^ l.EXPONENT[c._modN(l.LOG[r[e]] + t)] : r[e - 1];
      r[0] = l.EXPONENT[c._modN(l.LOG[r[0]] + t)];
    }
    for (t = 0; t <= i; t++)
      r[t] = l.LOG[r[t]];
  }, _checkBadness: function() {
    var t, e, i, r, x, s = 0, a = this._badness, n = this.buffer, f = this.width;
    for (x = 0; x < f - 1; x++)
      for (r = 0; r < f - 1; r++)
        (n[r + f * x] && n[r + 1 + f * x] && n[r + f * (x + 1)] && n[r + 1 + f * (x + 1)] || !(n[r + f * x] || n[r + 1 + f * x] || n[r + f * (x + 1)] || n[r + 1 + f * (x + 1)])) && (s += c.N2);
    var h = 0;
    for (x = 0; x < f; x++) {
      for (i = 0, a[0] = 0, t = 0, r = 0; r < f; r++)
        e = n[r + f * x], t === e ? a[i]++ : a[++i] = 1, t = e, h += t ? 1 : -1;
      s += this._getBadness(i);
    }
    h < 0 && (h = -h);
    var O = 0, b = h;
    for (b += b << 2, b <<= 1; b > f * f; )
      b -= f * f, O++;
    for (s += O * c.N4, r = 0; r < f; r++) {
      for (i = 0, a[0] = 0, t = 0, x = 0; x < f; x++)
        e = n[r + f * x], t === e ? a[i]++ : a[++i] = 1, t = e;
      s += this._getBadness(i);
    }
    return s;
  }, _convertBitStream: function(t) {
    var e, i, r = this._ecc, x = this._version;
    for (i = 0; i < t; i++)
      r[i] = this._value.charCodeAt(i);
    var s = this._stringBuffer = r.slice(), a = this._calculateMaxLength();
    t >= a - 2 && (t = a - 2, x > 9 && t--);
    var n = t;
    if (x > 9) {
      for (s[n + 2] = 0, s[n + 3] = 0; n--; )
        e = s[n], s[n + 3] |= 255 & e << 4, s[n + 2] = e >> 4;
      s[2] |= 255 & t << 4, s[1] = t >> 4, s[0] = 64 | t >> 12;
    } else {
      for (s[n + 1] = 0, s[n + 2] = 0; n--; )
        e = s[n], s[n + 2] |= 255 & e << 4, s[n + 1] = e >> 4;
      s[1] |= 255 & t << 4, s[0] = 64 | t >> 4;
    }
    for (n = t + 3 - (x < 10); n < a; )
      s[n++] = 236, s[n++] = 17;
  }, _getBadness: function(t) {
    var e, i = 0, r = this._badness;
    for (e = 0; e <= t; e++)
      r[e] >= 5 && (i += c.N1 + r[e] - 5);
    for (e = 3; e < t - 1; e += 2)
      r[e - 2] === r[e + 2] && r[e + 2] === r[e - 1] && r[e - 1] === r[e + 1] && r[e - 1] * 3 === r[e] && (r[e - 3] === 0 || e + 3 > t || r[e - 3] * 3 >= r[e] * 4 || r[e + 3] * 3 >= r[e] * 4) && (i += c.N3);
    return i;
  }, _finish: function() {
    this._stringBuffer = this.buffer.slice();
    var t, e, i = 0, r = 3e4;
    for (e = 0; e < 8 && (this._applyMask(e), t = this._checkBadness(), t < r && (r = t, i = e), i !== 7); e++)
      this.buffer = this._stringBuffer.slice();
    i !== e && this._applyMask(i), r = _.FINAL_FORMAT[i + (this._level - 1 << 3)];
    var x = this.buffer, s = this.width;
    for (e = 0; e < 8; e++, r >>= 1)
      r & 1 && (x[s - 1 - e + s * 8] = 1, e < 6 ? x[8 + s * e] = 1 : x[8 + s * (e + 1)] = 1);
    for (e = 0; e < 7; e++, r >>= 1)
      r & 1 && (x[8 + s * (s - 7 + e)] = 1, e ? x[6 - e + s * 8] = 1 : x[7 + s * 8] = 1);
  }, _interleaveBlocks: function() {
    var t, e, i = this._dataBlock, r = this._ecc, x = this._eccBlock, s = 0, a = this._calculateMaxLength(), n = this._neccBlock1, f = this._neccBlock2, h = this._stringBuffer;
    for (t = 0; t < i; t++) {
      for (e = 0; e < n; e++)
        r[s++] = h[t + e * i];
      for (e = 0; e < f; e++)
        r[s++] = h[n * i + t + e * (i + 1)];
    }
    for (e = 0; e < f; e++)
      r[s++] = h[n * i + t + e * (i + 1)];
    for (t = 0; t < x; t++)
      for (e = 0; e < n + f; e++)
        r[s++] = h[a + t + e * x];
    this._stringBuffer = r;
  }, _insertAlignments: function() {
    var t, e, i, r = this._version, x = this.width;
    if (r > 1)
      for (t = Ve.BLOCK[r], i = x - 7; ; ) {
        for (e = x - 7; e > t - 3 && (this._addAlignment(e, i), !(e < t)); )
          e -= t;
        if (i <= t + 9)
          break;
        i -= t, this._addAlignment(6, i), this._addAlignment(i, 6);
      }
  }, _insertFinders: function() {
    var t, e, i, r, x = this.buffer, s = this.width;
    for (t = 0; t < 3; t++) {
      for (e = 0, r = 0, t === 1 && (e = s - 7), t === 2 && (r = s - 7), x[r + 3 + s * (e + 3)] = 1, i = 0; i < 6; i++)
        x[r + i + s * e] = 1, x[r + s * (e + i + 1)] = 1, x[r + 6 + s * (e + i)] = 1, x[r + i + 1 + s * (e + 6)] = 1;
      for (i = 1; i < 5; i++)
        this._setMask(r + i, e + 1), this._setMask(r + 1, e + i + 1), this._setMask(r + 5, e + i), this._setMask(r + i + 1, e + 5);
      for (i = 2; i < 4; i++)
        x[r + i + s * (e + 2)] = 1, x[r + 2 + s * (e + i + 1)] = 1, x[r + 4 + s * (e + i)] = 1, x[r + i + 1 + s * (e + 4)] = 1;
    }
  }, _insertTimingGap: function() {
    var t, e, i = this.width;
    for (e = 0; e < 7; e++)
      this._setMask(7, e), this._setMask(i - 8, e), this._setMask(7, e + i - 7);
    for (t = 0; t < 8; t++)
      this._setMask(t, 7), this._setMask(t + i - 8, 7), this._setMask(t, i - 8);
  }, _insertTimingRowAndColumn: function() {
    var t, e = this.buffer, i = this.width;
    for (t = 0; t < i - 14; t++)
      t & 1 ? (this._setMask(8 + t, 6), this._setMask(6, 8 + t)) : (e[8 + t + i * 6] = 1, e[6 + i * (8 + t)] = 1);
  }, _insertVersion: function() {
    var t, e, i, r, x = this.buffer, s = this._version, a = this.width;
    if (s > 6)
      for (t = Ge.BLOCK[s - 7], e = 17, i = 0; i < 6; i++)
        for (r = 0; r < 3; r++, e--)
          1 & (e > 11 ? s >> e - 12 : t >> e) ? (x[5 - i + a * (2 - r + a - 11)] = 1, x[2 - r + a - 11 + a * (5 - i)] = 1) : (this._setMask(5 - i, 2 - r + a - 11), this._setMask(2 - r + a - 11, 5 - i));
  }, _isMasked: function(t, e) {
    var i = c._getMaskBit(t, e);
    return this._mask[i] === 1;
  }, _pack: function() {
    var t, e, i, r = 1, x = 1, s = this.width, a = s - 1, n = s - 1, f = (this._dataBlock + this._eccBlock) * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;
    for (e = 0; e < f; e++)
      for (t = this._stringBuffer[e], i = 0; i < 8; i++, t <<= 1) {
        128 & t && (this.buffer[a + s * n] = 1);
        do
          x ? a-- : (a++, r ? n !== 0 ? n-- : (a -= 2, r = !r, a === 6 && (a--, n = 9)) : n !== s - 1 ? n++ : (a -= 2, r = !r, a === 6 && (a--, n -= 8))), x = !x;
        while (this._isMasked(a, n));
      }
  }, _reverseMask: function() {
    var t, e, i = this.width;
    for (t = 0; t < 9; t++)
      this._setMask(t, 8);
    for (t = 0; t < 8; t++)
      this._setMask(t + i - 8, 8), this._setMask(8, t);
    for (e = 0; e < 7; e++)
      this._setMask(8, e + i - 7);
  }, _setMask: function(t, e) {
    var i = c._getMaskBit(t, e);
    this._mask[i] = 1;
  }, _syncMask: function() {
    var t, e, i = this.width;
    for (e = 0; e < i; e++)
      for (t = 0; t <= e; t++)
        this.buffer[t + i * e] && this._setMask(t, e);
  } }, { _createArray: function(t) {
    var e, i = [];
    for (e = 0; e < t; e++)
      i[e] = 0;
    return i;
  }, _getMaskBit: function(t, e) {
    var i;
    return t > e && (i = t, t = e, e = i), i = e, i += e * e, i >>= 1, i += t, i;
  }, _modN: function(t) {
    for (; t >= 255; )
      t -= 255, t = (t >> 8) + (t & 255);
    return t;
  }, N1: 3, N2: 3, N3: 40, N4: 10 });
  F.exports = c;
});
var H = o((k0, X) => {
  "use strict";
  var Ke = M(), Ue = Ke.extend({ draw: function() {
    this.element.src = this.qrious.toDataURL();
  }, reset: function() {
    this.element.src = "";
  }, resize: function() {
    var t = this.element;
    t.width = t.height = this.qrious.size;
  } });
  X.exports = Ue;
});
var J = o((g0, W) => {
  "use strict";
  var De = u(), Fe = De.extend(function(t, e, i, r) {
    this.name = t, this.modifiable = Boolean(e), this.defaultValue = i, this._valueTransformer = r;
  }, { transform: function(t) {
    var e = this._valueTransformer;
    return typeof e == "function" ? e(t, this) : t;
  } });
  W.exports = Fe;
});
var q = o((w0, Y) => {
  "use strict";
  var Qe = u(), Xe = Qe.extend(null, { abs: function(t) {
    return t != null ? Math.abs(t) : null;
  }, hasOwn: function(t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, noop: function() {
  }, toUpperCase: function(t) {
    return t != null ? t.toUpperCase() : null;
  } });
  Y.exports = Xe;
});
var $ = o((B0, Z) => {
  "use strict";
  var He = u(), k = q(), v = He.extend(function(t) {
    this.options = {}, t.forEach(function(e) {
      this.options[e.name] = e;
    }, this);
  }, { exists: function(t) {
    return this.options[t] != null;
  }, get: function(t, e) {
    return v._get(this.options[t], e);
  }, getAll: function(t) {
    var e, i = this.options, r = {};
    for (e in i)
      k.hasOwn(i, e) && (r[e] = v._get(i[e], t));
    return r;
  }, init: function(t, e, i) {
    typeof i != "function" && (i = k.noop);
    var r, x;
    for (r in this.options)
      k.hasOwn(this.options, r) && (x = this.options[r], v._set(x, x.defaultValue, e), v._createAccessor(x, e, i));
    this._setAll(t, e, true);
  }, set: function(t, e, i) {
    return this._set(t, e, i);
  }, setAll: function(t, e) {
    return this._setAll(t, e);
  }, _set: function(t, e, i, r) {
    var x = this.options[t];
    if (!x)
      throw new Error("Invalid option: " + t);
    if (!x.modifiable && !r)
      throw new Error("Option cannot be modified: " + t);
    return v._set(x, e, i);
  }, _setAll: function(t, e, i) {
    if (!t)
      return false;
    var r, x = false;
    for (r in t)
      k.hasOwn(t, r) && this._set(r, t[r], e, i) && (x = true);
    return x;
  } }, { _createAccessor: function(t, e, i) {
    var r = { get: function() {
      return v._get(t, e);
    } };
    t.modifiable && (r.set = function(x) {
      v._set(t, x, e) && i(x, t);
    }), Object.defineProperty(e, t.name, r);
  }, _get: function(t, e) {
    return e["_" + t.name];
  }, _set: function(t, e, i) {
    var r = "_" + t.name, x = i[r], s = t.transform(e != null ? e : t.defaultValue);
    return i[r] = s, s !== x;
  } });
  Z.exports = v;
});
var te = o((M0, ee) => {
  "use strict";
  var We = u(), Je = We.extend(function() {
    this._services = {};
  }, { getService: function(t) {
    var e = this._services[t];
    if (!e)
      throw new Error("Service is not being managed with name: " + t);
    return e;
  }, setService: function(t, e) {
    if (this._services[t])
      throw new Error("Service is already managed with name: " + t);
    e && (this._services[t] = e);
  } });
  ee.exports = Je;
});
var se = o((q0, xe) => {
  "use strict";
  var Ye = u(), Ze = j(), $e = Q(), e0 = H(), d = J(), t0 = $(), i0 = te(), m = q(), g = new t0([new d("background", true, "white"), new d("backgroundAlpha", true, 1, m.abs), new d("element"), new d("foreground", true, "black"), new d("foregroundAlpha", true, 1, m.abs), new d("level", true, "L", m.toUpperCase), new d("mime", true, "image/png"), new d("padding", true, null, m.abs), new d("size", true, 100, m.abs), new d("value", true, "")]), ie = new i0(), re = Ye.extend(function(t) {
    g.init(t, this, this.update.bind(this));
    var e = g.get("element", this), i = ie.getService("element"), r = e && i.isCanvas(e) ? e : i.createCanvas(), x = e && i.isImage(e) ? e : i.createImage();
    this._canvasRenderer = new Ze(this, r, true), this._imageRenderer = new e0(this, x, x === e), this.update();
  }, { get: function() {
    return g.getAll(this);
  }, set: function(t) {
    g.setAll(t, this) && this.update();
  }, toDataURL: function(t) {
    return this.canvas.toDataURL(t || this.mime);
  }, update: function() {
    var t = new $e({ level: this.level, value: this.value });
    this._canvasRenderer.render(t), this._imageRenderer.render(t);
  } }, { use: function(t) {
    ie.setService(t.getName(), t);
  } });
  Object.defineProperties(re.prototype, { canvas: { get: function() {
    return this._canvasRenderer.getElement();
  } }, image: { get: function() {
    return this._imageRenderer.getElement();
  } } });
  xe.exports = re;
});
var ne = o((O0, ae) => {
  "use strict";
  ae.exports = se();
});
var oe = o((N0, fe) => {
  "use strict";
  var r0 = u(), x0 = r0.extend({ getName: function() {
  } });
  fe.exports = x0;
});
var ue = o((y0, ce) => {
  "use strict";
  var s0 = oe(), a0 = s0.extend({ createCanvas: function() {
  }, createImage: function() {
  }, getName: function() {
    return "element";
  }, isCanvas: function(t) {
  }, isImage: function(t) {
  } });
  ce.exports = a0;
});
var le = N(ne(), 1);
var he = N(ue(), 1);
var n0 = he.default.extend({ createCanvas: function() {
  return document.createElement("canvas");
}, createImage: function() {
  return document.createElement("img");
}, isCanvas: function(t) {
  return t instanceof HTMLCanvasElement;
}, isImage: function(t) {
  return t instanceof HTMLImageElement;
} });
var de = n0;
var f0 = le.default;
f0.use(new de());

// js/Qr.tsx
var QR = ({ url }) => {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
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
      const qr = new f0(options);
    };
    load();
  }, [url]);
  return /* @__PURE__ */ jsx2("canvas", {
    css: css`
        border-radius: 16px;
        margin-bottom: 8px;
  `,
    ref: canvasRef
  });
};
var QRButton = ({ url }) => {
  const [showQR, setQR] = React.useState(false);
  return /* @__PURE__ */ jsx2(motion.div, {
    animate: {
      width: showQR ? 200 : 56,
      height: showQR ? 220 : 48
    },
    onClick: (e) => {
      setQR(!showQR);
    },
    css: css`
                margin-bottom: 12px;
              `
  }, showQR ? /* @__PURE__ */ jsx2(QR, {
    key: url,
    url: url + "/edit/"
  }) : /* @__PURE__ */ jsx2(MyFsb, {
    variant: "extended",
    color: "secondary",
    onClick: () => {
      setQR(!showQR);
    }
  }, /* @__PURE__ */ jsx2(QrCode, null)));
};

// js/DraggableWindow.tsx
var breakPoints = [680, 768, 1920];
var breakPointHeights = [1137, 1024, 1080];
var sizes = [10, 25, 50, 75, 100, 150];
var bg = `rgba(${Math.random() * 128 + 64}, ${Math.random() * 128 + 64}, ${Math.random() * 128 + 64}, ${!navigator.userAgent.includes("Firefox") ? 0.3 : 0.7})`;
var DraggableWindow = ({ onShare, onRestore, position, session, keepFullScreen, room }) => {
  const [isStable, setIsStable] = useState(false);
  const [scaleRange, changeScaleRange] = useState(100);
  const [childArray, setChild] = useState([
    /* @__PURE__ */ jsx3(LazySpikeLandComponent, {
      name: room,
      transpiled: session.transpiled,
      htmlContent: `<div id="root"><style>${session.css}</style><div id="zbody">${session.html}</div></div>`,
      html: session.html
    })
  ]);
  const startPositions = { bottom: -40, right: -90 };
  session.setChild = setChild;
  const [qrUrl, setQRUrl] = useState(session.url);
  const [errorText, setErrorText] = useState("");
  const [{ bottom, right }, setPositions] = useState(startPositions);
  const [width, setWidth] = useState(window.innerWidth * devicePixelRatio);
  const [height, setHeight] = useState(window.innerHeight * devicePixelRatio);
  const ref = useRef(null);
  const zbody = useRef(null);
  const child = childArray[childArray.length - 1];
  useEffect(() => {
    const handler = setInterval(async () => {
      if (errorText !== session.errorText) {
        const newError = session.errorText;
        setErrorText(newError);
        setIsStable(false);
        await wait(1500);
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
  const [isFullScreen, setFullScreen] = useState(true);
  useEffect(() => {
    const reveal = async () => {
      const { bottom: bottom2, right: right2 } = startPositions;
      if (keepFullScreen) {
        return;
      }
      await wait(1200);
      await wait(300);
      setFullScreen(false);
      changeScaleRange(50);
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
      await wait(200);
      setPositions({
        bottom: 20,
        right: 20
      });
    };
    reveal();
  }, []);
  return /* @__PURE__ */ jsx3(React2.StrictMode, null, /* @__PURE__ */ jsx3(motion2.div, {
    ref,
    initial: { bottom: startPositions.bottom, right: startPositions.right },
    animate: {
      bottom,
      right
    },
    css: css2`
            background-color:${bg};
            backdrop-filter: blur(15px);
            padding: 0px 0px 0px 16px;
            border-radius: 16px;
            white-space: normal;
            position: ${position ? position : "fixed"};
          `,
    dragElastic: 0.5,
    dragConstraints: {
      left: 0,
      right: width - 20 - width / 6,
      bottom: innerHeight - 100
    },
    dragMomentum: false,
    drag: !isFullScreen
  }, /* @__PURE__ */ jsx3("div", {
    css: css2` 
              display: flex;
              
                `
  }, /* @__PURE__ */ jsx3("div", {
    css: css2`
            display: flex;
            flex-direction: column;
            align-items: center;
          `
  }, /* @__PURE__ */ jsx3(default3, {
    value: scaleRange,
    size: "small",
    exclusive: true,
    onChange: (_e2, newScale) => {
      newScale && changeScaleRange(newScale);
    }
  }, sizes.map((size) => /* @__PURE__ */ jsx3(default2, {
    key: size,
    value: size
  }, /* @__PURE__ */ jsx3("span", {
    css: css2`
                       color: ${size === scaleRange ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                       `
  }, size, "%")))), /* @__PURE__ */ jsx3(motion2.div, {
    animate: {
      width: width * scale / devicePixelRatio,
      height: height * scale / devicePixelRatio,
      maxHeight: height * scale / devicePixelRatio,
      borderRadius: isFullScreen ? 0 : 8
    },
    css: css2`
                width: ${width * scale / devicePixelRatio};
                height: ${height * scale / devicePixelRatio};
                display: block;
                overflow: hidden;


                /* background-color: red; */
            `
  }, errorText && errorText.trim() !== "" && /* @__PURE__ */ jsx3("pre", {
    css: css2`
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
  }, isStable && errorText && errorText.trim(), isStable && errorText && errorText.trim() !== "" && /* @__PURE__ */ jsx3("div", {
    css: css2`
                          text-align: right;
                        `
  }, /* @__PURE__ */ jsx3(MyButton, {
    onClick: () => {
      onRestore();
      setErrorText("");
    }
  }, "Restore"))), /* @__PURE__ */ jsx3(motion2.div, {
    initial: {
      transformOrigin: "0px 0px",
      width: window.innerWidth / devicePixelRatio,
      height: window.innerHeight / devicePixelRatio,
      scale: scaleRange / 100
    },
    animate: {
      transformOrigin: "0px 0px",
      width: width / devicePixelRatio,
      height: height / devicePixelRatio,
      scale: scaleRange / 100
    },
    css: css2`
                  overflow:overlay;
                  overflow-y: hidden;
                  >div{
                    width:100%;
                    height:100%;
                    overflow: overlay;
                    background: white;
                  }
              `
  }, errorText ? /* @__PURE__ */ jsx3("div", {
    id: "zbody",
    css: `${session.css}`,
    dangerouslySetInnerHTML: createMarkup(session.html)
  }) : /* @__PURE__ */ jsx3("div", {
    id: "zbody",
    key: session.i,
    ref: zbody,
    css: css2`q
                        height: 100%;
                      `
  }, child), " ")), /* @__PURE__ */ jsx3(default3, {
    value: width,
    size: "small",
    exclusive: true,
    onChange: (_e2, newSize) => {
      if (newSize) {
        setHeight(breakPointHeights[breakPoints.indexOf(newSize)]);
        setWidth(newSize);
      }
    }
  }, breakPoints.map((size) => /* @__PURE__ */ jsx3(default2, {
    key: size,
    value: size
  }, size === 680 ? /* @__PURE__ */ jsx3(Phone, {
    css: css2`
                        color: ${width === 680 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `
  }) : size === 768 ? /* @__PURE__ */ jsx3(Tablet, {
    css: css2`
                        color: ${width === 768 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `
  }) : /* @__PURE__ */ jsx3(Tv, {
    css: css2`
                        color: ${width === 1920 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                      `
  }))))), /* @__PURE__ */ jsx3("div", {
    css: css2`
              display: flex;
              align-items: center;          
              flex-direction: column;
              padding: 16px;
              `
  }, /* @__PURE__ */ jsx3(MyFsb, {
    onClick: () => {
      setFullScreen(true);
    }
  }, /* @__PURE__ */ jsx3(FullscreenIcon, null)), /* @__PURE__ */ jsx3(QRButton, {
    url: qrUrl
  }), /* @__PURE__ */ jsx3(MyFsb, {
    onClick: () => {
      onShare();
    }
  }, /* @__PURE__ */ jsx3(Share, null))))));
};
function createMarkup(__html) {
  return { __html };
}

// js/renderPreviewWindow.tsx
var renderPreviewWindow = async (session, room, keepFullScreen) => {
  const target = document.createElement("div");
  const editor = document.querySelector("#monacoEditor");
  editor.style.opacity = "0";
  const { createRoot } = await import("https://unpkg.com/@spike.land/esm@0.6.71/dist/react-dom.mjs");
  const root = createRoot(target, {});
  root.render(/* @__PURE__ */ jsx4(DraggableWindow, {
    onShare: () => open(`https://spike.land/api/room/${room}/public`),
    onRestore: () => {
      const model = session.editor.getModel();
      model.setValue(session.code);
    },
    position: session.mode === "window" ? "fixed" : "absolute",
    session,
    keepFullScreen,
    room
  }));
  const diffy = window.diffy = Date.now() - window.aniStart;
  console.log({ diffy });
  target.style.opacity = "0";
  document.body.append(target);
  console.log("wait....: " + String(2e3 - diffy));
  await wait(2e3 - diffy);
  target.style.display = "block";
  target.style.opacity = "1";
  document.querySelector("#root").remove();
  document.body.style.backgroundImage = 'url("https://unpkg.com/@spike.land/code@0.6.11/js/assets/synthwave.webp")';
  editor.style.opacity = "1";
  editor.style.display = "block";
};
export {
  renderPreviewWindow
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVuZGVyUHJldmlld1dpbmRvdy50c3giLCAiLi4vLi4vRHJhZ2dhYmxlV2luZG93LnRzeCIsICIuLi8uLi9tdWkudHN4IiwgIi4uLy4uL1FyLnRzeCIsICIuLi8uLi8uLi8uLi9xcmlvdXMvZGlzdC9RUmlvdXMubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHt9IGZyb20gXCJyZWFjdC1kb20vbmV4dFwiO1xuLy8gQHRzLWV4cGVjdC1lcnJvclxuaW1wb3J0IHsgRHJhZ2dhYmxlV2luZG93IH0gZnJvbSBcIi4vRHJhZ2dhYmxlV2luZG93LnRzeFwiO1xuLy8gQHRzLWV4cGVjdC1lcnJvclxuaW1wb3J0IHsgd2FpdCB9IGZyb20gXCIuL3dhaXQudHNcIjtcbi8vIEB0cy1leHBlY3QtZXJyb3JcbmltcG9ydCB0eXBlIHsgSUNvZGVTZXNzaW9uIH0gZnJvbSBcIi4vc2Vzc2lvbi50c3hcIjtcbi8vIEltcG9ydCB7IGdldEh0bWxBbmRDc3Ncbi8vICB9IGZyb20gXCIuL3JlbmRlclRvU3RyaW5nXCI7XG5cbmV4cG9ydCBjb25zdCByZW5kZXJQcmV2aWV3V2luZG93ID0gYXN5bmMgKFxuICBzZXNzaW9uOiBJQ29kZVNlc3Npb24sXG4gIHJvb206IHN0cmluZyxcbiAga2VlcEZ1bGxTY3JlZW46IGJvb2xlYW4sXG4pID0+IHtcbiAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgZWRpdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb25hY29FZGl0b3JcIikhO1xuICAvLyBUYXJnZXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICBlZGl0b3Iuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xuXG4gIC8vIENvbnN0IEVsZW1lbnQgPSAoKSA9PiAoXG4gIC8vICAgPERyYWdnYWJsZVdpbmRvd1xuICAvLyAgICAgb25TaGFyZT17KCkgPT4gb3BlbihgaHR0cHM6Ly9zcGlrZS5sYW5kL2FwaS9yb29tLyR7cm9vbX0vcHVibGljYCl9XG4gIC8vICAgICBvblJlc3RvcmU9eygpID0+IHt9fVxuICAvLyAgICAgcG9zaXRpb249e3Nlc3Npb24ubW9kZSA9PT0gXCJ3aW5kb3dcIiA/IFwiZml4ZWRcIiA6IFwiYWJzb2x1dGVcIn1cbiAgLy8gICAgIHNlc3Npb249e3Nlc3Npb259XG4gIC8vICAgLz5cbiAgLy8gKTtcblxuICAvLyBjb25zdCB7aHRtbH0gPSBnZXRIdG1sQW5kQ3NzKCA8RWxlbWVudD48L0VsZW1lbnQ+IGFzIGFueSApO1xuXG4gIC8vIHRhcmdldCAgLmlubmVySFRNTCA9IGh0bWw7XG5cbiAgY29uc3QgeyBjcmVhdGVSb290IH0gPSBhd2FpdCBpbXBvcnQoXCJyZWFjdC1kb21cIik7XG5cbiAgLy8gVGFyZ2V0ICAuaW5uZXJIVE1MID0gaHRtbDtcblxuICBjb25zdCByb290ID0gY3JlYXRlUm9vdCh0YXJnZXQsIHt9KTtcbiAgLy8gUm9vdC5yZW5kZXIoPEVsZW1lbnQ+PC9FbGVtZW50PiBhcyBhbnkpO1xuXG4gIHJvb3QucmVuZGVyKFxuICAgIDxEcmFnZ2FibGVXaW5kb3dcbiAgICAgIG9uU2hhcmU9eygpID0+IG9wZW4oYGh0dHBzOi8vc3Bpa2UubGFuZC9hcGkvcm9vbS8ke3Jvb219L3B1YmxpY2ApfVxuICAgICAgb25SZXN0b3JlPXsoKSA9PiB7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gc2Vzc2lvbi5lZGl0b3IuZ2V0TW9kZWwoKTtcbiAgICAgICAgbW9kZWwuc2V0VmFsdWUoc2Vzc2lvbi5jb2RlKTtcbiAgICAgIH19XG4gICAgICBwb3NpdGlvbj17c2Vzc2lvbi5tb2RlID09PSBcIndpbmRvd1wiID8gXCJmaXhlZFwiIDogXCJhYnNvbHV0ZVwifVxuICAgICAgc2Vzc2lvbj17c2Vzc2lvbn1cbiAgICAgIGtlZXBGdWxsU2NyZWVuPXtrZWVwRnVsbFNjcmVlbn1cbiAgICAgIHJvb209e3Jvb219XG4gICAgLz4sXG4gICk7XG5cbiAgY29uc3QgZGlmZnkgPSB3aW5kb3cuZGlmZnkgPSBEYXRlLm5vdygpIC0gd2luZG93LmFuaVN0YXJ0O1xuXG4gIGNvbnNvbGUubG9nKHsgZGlmZnkgfSk7XG5cbiAgdGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcbiAgLy8gYXdhaXQgd2FpdCgyMDAwKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmQodGFyZ2V0KTtcblxuICBjb25zb2xlLmxvZyhcIndhaXQuLi4uOiBcIiArIFN0cmluZygyMDAwIC0gZGlmZnkpKTtcblxuICBhd2FpdCB3YWl0KDIwMDAgLSBkaWZmeSk7XG5cbiAgdGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIHRhcmdldC5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9vdFwiKSEucmVtb3ZlKCk7XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID1cbiAgICAndXJsKFwiaHR0cHM6Ly91bnBrZy5jb20vQHNwaWtlLmxhbmQvY29kZUAwLjYuMTEvanMvYXNzZXRzL3N5bnRod2F2ZS53ZWJwXCIpJztcblxuICBlZGl0b3Iuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICBlZGl0b3Iuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbn07XG4iLCAiLyoqIEBqc3gganN4ICovXG5cbmltcG9ydCB7IGNzcywganN4IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgUmVhY3QsIHtcbiAgRnJhZ21lbnQsXG4gIGxhenksXG4gIFN1c3BlbnNlLFxuICB1c2VFZmZlY3QsXG4gIHVzZVJlZixcbiAgdXNlU3RhdGUsXG59IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBGQyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgbW90aW9uIH0gZnJvbSBcImZyYW1lci1tb3Rpb25cIjtcbmltcG9ydCB7IHdhaXQgfSBmcm9tIFwiLi93YWl0XCI7XG4vLyBAdHMtZXhwZWN0LWVycm9yXG5pbXBvcnQgeyBMYXp5U3Bpa2VMYW5kQ29tcG9uZW50IH0gZnJvbSBcIi4vTGF6eUxvYWRlZENvbXBvbmVudC50c3hcIjtcblxuLy8gQHRzLWV4cGVjdC1lcnJvclxuaW1wb3J0IHtcbiAgQnV0dG9uLFxuICBGYWIsXG4gIEZ1bGxzY3JlZW5JY29uLFxuICBQaG9uZSxcbiAgU2hhcmUsXG4gIFRhYmxldCxcbiAgVG9nZ2xlQnV0dG9uLFxuICBUb2dnbGVCdXR0b25Hcm91cCxcbiAgVHYsXG59IGZyb20gXCIuL211aS50c3hcIjtcblxuLy8gQHRzLWV4cGVjdC1lcnJvclxuaW1wb3J0IHsgUVJCdXR0b24gfSBmcm9tIFwiLi9Rci50c3hcIjtcblxuLy8gSW1wb3J0IHsgYnJlYWtwb2ludHMgfSBmcm9tIFwiQG11aS9zeXN0ZW1cIjtcblxuLy8gY29uc3Qge21vdGlvbn0gPSBNb3Rpb247XG5cbmNvbnN0IGJyZWFrUG9pbnRzID0gWzY4MCwgNzY4LCAxOTIwXTtcbmNvbnN0IGJyZWFrUG9pbnRIZWlnaHRzID0gWzExMzcsIDEwMjQsIDEwODBdO1xuXG5jb25zdCBzaXplcyA9IFsxMCwgMjUsIDUwLCA3NSwgMTAwLCAxNTBdO1xuXG5jb25zdCBiZyA9IGByZ2JhKCR7TWF0aC5yYW5kb20oKSAqIDEyOCArIDY0fSwgJHtNYXRoLnJhbmRvbSgpICogMTI4ICsgNjR9LCAke1xuICBNYXRoLnJhbmRvbSgpICogMTI4ICsgNjRcbn0sICR7IW5hdmlnYXRvci51c2VyQWdlbnQuaW5jbHVkZXMoXCJGaXJlZm94XCIpID8gMC4zIDogMC43fSlgO1xuXG5pbnRlcmZhY2UgRHJhZ2dhYmxlV2luZG93UHJvcHMge1xuICBvblNoYXJlOiAoKSA9PiB2b2lkO1xuICBvblJlc3RvcmU6ICgoKSA9PiB2b2lkKTtcbiAgc2Vzc2lvbjoge1xuICAgIGk6IG51bWJlcjtcbiAgICB1cmw6IHN0cmluZztcbiAgICBodG1sOiBzdHJpbmc7XG4gICAgdHJhbnNwaWxlZDogc3RyaW5nO1xuICAgIGVycm9yVGV4dDogc3RyaW5nO1xuICAgIGNoaWxkcmVuOiBhbnk7XG4gICAgY3NzOiBzdHJpbmc7XG4gICAgc2V0Q2hpbGQ6IGFueTtcbiAgfTtcbiAga2VlcEZ1bGxTY3JlZW46IGJvb2xlYW47XG4gIHBvc2l0aW9uPzogc3RyaW5nO1xuICByb29tOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBEcmFnZ2FibGVXaW5kb3c6IEZDPERyYWdnYWJsZVdpbmRvd1Byb3BzPiA9IChcbiAgeyBvblNoYXJlLCBvblJlc3RvcmUsIHBvc2l0aW9uLCBzZXNzaW9uLCBrZWVwRnVsbFNjcmVlbiwgcm9vbSB9LFxuKSA9PiB7XG4gIGNvbnN0IFtpc1N0YWJsZSwgc2V0SXNTdGFibGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2NhbGVSYW5nZSwgY2hhbmdlU2NhbGVSYW5nZV0gPSB1c2VTdGF0ZSgxMDApO1xuICAvLyBDb25zdCBbaGVpZ2h0LCBjaGFuZ2VIZWlnaHRdID0gdXNlU3RhdGUoaW5uZXJIZWlnaHQpO1xuXG4gIGNvbnN0IFtjaGlsZEFycmF5LCBzZXRDaGlsZF0gPSB1c2VTdGF0ZShbXG4gICAgPExhenlTcGlrZUxhbmRDb21wb25lbnRcbiAgICAgIG5hbWU9e3Jvb219XG4gICAgICB0cmFuc3BpbGVkPXtzZXNzaW9uLnRyYW5zcGlsZWR9XG4gICAgICBodG1sQ29udGVudD17YDxkaXYgaWQ9XCJyb290XCI+PHN0eWxlPiR7c2Vzc2lvbi5jc3N9PC9zdHlsZT48ZGl2IGlkPVwiemJvZHlcIj4ke3Nlc3Npb24uaHRtbH08L2Rpdj48L2Rpdj5gfVxuICAgICAgaHRtbD17c2Vzc2lvbi5odG1sfVxuICAgIC8+LFxuICBdKTtcblxuICBjb25zdCBzdGFydFBvc2l0aW9ucyA9IHsgYm90dG9tOiAtNDAsIHJpZ2h0OiAtOTAgfTtcblxuICBzZXNzaW9uLnNldENoaWxkID0gc2V0Q2hpbGQ7XG5cbiAgY29uc3QgW3FyVXJsLCBzZXRRUlVybF0gPSB1c2VTdGF0ZShzZXNzaW9uLnVybCk7XG4gIGNvbnN0IFtlcnJvclRleHQsIHNldEVycm9yVGV4dF0gPSB1c2VTdGF0ZShcIlwiKTtcblxuICBjb25zdCBbeyBib3R0b20sIHJpZ2h0IH0sIHNldFBvc2l0aW9uc10gPSB1c2VTdGF0ZShzdGFydFBvc2l0aW9ucyk7XG4gIGNvbnN0IFt3aWR0aCwgc2V0V2lkdGhdID0gdXNlU3RhdGUod2luZG93LmlubmVyV2lkdGggKiBkZXZpY2VQaXhlbFJhdGlvKTtcbiAgY29uc3QgW2hlaWdodCwgc2V0SGVpZ2h0XSA9IHVzZVN0YXRlKHdpbmRvdy5pbm5lckhlaWdodCAqIGRldmljZVBpeGVsUmF0aW8pO1xuICBjb25zdCByZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xuICBjb25zdCB6Ym9keSA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XG5cbiAgY29uc3QgY2hpbGQgPSBjaGlsZEFycmF5W2NoaWxkQXJyYXkubGVuZ3RoIC0gMV07XG5cbiAgLy8gVXNlRWZmZWN0KCgpID0+IHtcbiAgLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4gY2hhbmdlSGVpZ2h0KHdpbmRvdy5pbm5lckhlaWdodCkpO1xuICAvLyB9KTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZXIgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoZXJyb3JUZXh0ICE9PSBzZXNzaW9uLmVycm9yVGV4dCkge1xuICAgICAgICBjb25zdCBuZXdFcnJvciA9IHNlc3Npb24uZXJyb3JUZXh0O1xuICAgICAgICBzZXRFcnJvclRleHQobmV3RXJyb3IpO1xuICAgICAgICBzZXRJc1N0YWJsZShmYWxzZSk7XG4gICAgICAgIGF3YWl0IHdhaXQoMTUwMCk7XG4gICAgICAgIGlmIChzZXNzaW9uLmVycm9yVGV4dCA9PT0gbmV3RXJyb3IpIHtcbiAgICAgICAgICBzZXRJc1N0YWJsZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocXJVcmwgIT09IHNlc3Npb24udXJsKSB7XG4gICAgICAgIHNldFFSVXJsKHNlc3Npb24udXJsKTtcbiAgICAgIH1cbiAgICAgIC8vIFNldENoaWxkKHNlc3Npb24uY2hpbGRyZW4pO1xuICAgIH0sIDIwMCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2xlYXJJbnRlcnZhbChoYW5kbGVyKTtcbiAgICB9O1xuICB9LCBbc2V0RXJyb3JUZXh0LCBzZXRRUlVybCwgZXJyb3JUZXh0LCBxclVybF0pO1xuXG4gIGNvbnN0IHNjYWxlID0gc2NhbGVSYW5nZSAvIDEwMDtcbiAgY29uc3QgW2lzRnVsbFNjcmVlbiwgc2V0RnVsbFNjcmVlbl0gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHJldmVhbCA9IGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHsgYm90dG9tLCByaWdodCB9ID0gc3RhcnRQb3NpdGlvbnM7XG4gICAgICBpZiAoa2VlcEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCB3YWl0KDEyMDApO1xuICAgICAgLy8gQ29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcbiAgICAgIC8vIGlmIChyb290ICYmIHJvb3QucmVtb3ZlKSByb290LnJlbW92ZSgpO1xuICAgICAgYXdhaXQgd2FpdCgzMDApO1xuXG4gICAgICBzZXRGdWxsU2NyZWVuKGZhbHNlKTtcbiAgICAgIGNoYW5nZVNjYWxlUmFuZ2UoNTApO1xuXG4gICAgICBzZXRQb3NpdGlvbnMoe1xuICAgICAgICBib3R0b206IHdpbmRvdy5pbm5lckhlaWdodCAqIDAuMixcbiAgICAgICAgcmlnaHQ6IHdpbmRvdy5pbm5lcldpZHRoICogMC4yLFxuICAgICAgfSk7XG4gICAgICAvLyBDaGFuZ2VTY2FsZVJhbmdlKDc1KTtcbiAgICAgIC8vIHNldEhlaWdodChoZWlnaHQ9PiBoZWlnaHQpXG5cbiAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCAvIGRldmljZVBpeGVsUmF0aW8gPCA2MDApIHtcbiAgICAgICAgY2hhbmdlU2NhbGVSYW5nZSg1MCk7XG4gICAgICAgIHNldFdpZHRoKGJyZWFrUG9pbnRzWzBdKTtcbiAgICAgICAgc2V0SGVpZ2h0KGJyZWFrUG9pbnRIZWlnaHRzWzBdKTtcblxuICAgICAgICAvLyBTZXRIZWlnaHQod2luZG93LmlubmVySGVpZ2h0ICogZGV2aWNlUGl4ZWxSYXRpbyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCAvIGRldmljZVBpeGVsUmF0aW8gPCAxMjAwKSB7XG4gICAgICAgIGNoYW5nZVNjYWxlUmFuZ2UoNzUpO1xuICAgICAgICBzZXRXaWR0aChicmVha1BvaW50c1swXSk7XG4gICAgICAgIHNldEhlaWdodChicmVha1BvaW50SGVpZ2h0c1swXSk7XG5cbiAgICAgICAgLy8gU2V0SGVpZ2h0KHdpbmRvdy5pbm5lckhlaWdodCAqIGRldmljZVBpeGVsUmF0aW8pO1xuICAgICAgfSBlbHNlIGlmICh3aW5kb3cuaW5uZXJXaWR0aCAvIGRldmljZVBpeGVsUmF0aW8gPCAxODAwKSB7XG4gICAgICAgIC8vIFNldEhlaWdodChicmVha1BvaW50c1sxXSk7XG4gICAgICAgIHNldFdpZHRoKGJyZWFrUG9pbnRzWzFdKTtcbiAgICAgICAgc2V0SGVpZ2h0KGJyZWFrUG9pbnRIZWlnaHRzWzFdKTtcblxuICAgICAgICBjaGFuZ2VTY2FsZVJhbmdlKDUwKTtcbiAgICAgIH0gZWxzZSBpZiAod2luZG93LmlubmVyV2lkdGggLyBkZXZpY2VQaXhlbFJhdGlvIDwgMjUwMCkge1xuICAgICAgICAvLyBTZXRIZWlnaHQoYnJlYWtQb2ludEhlaWdodHNbMl0gKiBkZXZpY2VQaXhlbFJhdGlvKTtcbiAgICAgICAgc2V0V2lkdGgoYnJlYWtQb2ludHNbMV0pO1xuICAgICAgICBzZXRIZWlnaHQoYnJlYWtQb2ludEhlaWdodHNbMV0pO1xuXG4gICAgICAgIGNoYW5nZVNjYWxlUmFuZ2UoNzUpO1xuICAgICAgfSBlbHNlIGlmICh3aW5kb3cuaW5uZXJXaWR0aCAvIGRldmljZVBpeGVsUmF0aW8gPiAyNTAwKSB7XG4gICAgICAgIC8vIFNldFdpZHRoKHdpbmRvdyogZGV2aWNlUGl4ZWxSYXRpbylcbiAgICAgICAgc2V0V2lkdGgoYnJlYWtQb2ludHNbMV0pO1xuICAgICAgICBzZXRIZWlnaHQoYnJlYWtQb2ludEhlaWdodHNbMV0pO1xuXG4gICAgICAgIC8vIFNldEhlaWdodChicmVha1BvaW50c1swXSk7XG4gICAgICAgIGNoYW5nZVNjYWxlUmFuZ2UoMTAwKTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgd2FpdCgyMDApO1xuICAgICAgc2V0UG9zaXRpb25zKHtcbiAgICAgICAgYm90dG9tOiAyMCxcbiAgICAgICAgcmlnaHQ6IDIwLFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldmVhbCgpO1xuICB9LCBbXSk7XG5cbiAgLy8gSWYgKGlzRnVsbFNjcmVlbikge1xuICAvLyAgIHJldHVybiAoXG4gIC8vICAgICA8TGF6eVNwaWtlTGFuZENvbXBvbmVudFxuICAvLyAgICAgICBuYW1lPXtyb29tfVxuICAvLyAgICAgICBjc3NUZXh0PXtzZXNzaW9uLmNzc31cbiAgLy8gICAgICAgaHRtbD17c2Vzc2lvbi5odG1sfVxuICAvLyAgICAgLz5cbiAgLy8gICApO1xuICAvLyB9XG5cbiAgcmV0dXJuIChcbiAgICA8UmVhY3QuU3RyaWN0TW9kZT5cbiAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBpbml0aWFsPXt7IGJvdHRvbTogc3RhcnRQb3NpdGlvbnMuYm90dG9tLCByaWdodDogc3RhcnRQb3NpdGlvbnMucmlnaHQgfX1cbiAgICAgICAgYW5pbWF0ZT17e1xuICAgICAgICAgIGJvdHRvbSxcbiAgICAgICAgICByaWdodCxcbiAgICAgICAgfX1cbiAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiR7Ymd9O1xuICAgICAgICAgICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDE1cHgpO1xuICAgICAgICAgICAgcGFkZGluZzogMHB4IDBweCAwcHggMTZweDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xuICAgICAgICAgICAgcG9zaXRpb246ICR7cG9zaXRpb24gPyBwb3NpdGlvbiA6IFwiZml4ZWRcIn07XG4gICAgICAgICAgYH1cbiAgICAgICAgZHJhZ0VsYXN0aWM9ezAuNX1cbiAgICAgICAgZHJhZ0NvbnN0cmFpbnRzPXt7XG4gICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICByaWdodDogd2lkdGggLSAyMCAtIHdpZHRoIC8gNixcbiAgICAgICAgICBib3R0b206IGlubmVySGVpZ2h0IC0gMTAwLFxuICAgICAgICB9fVxuICAgICAgICBkcmFnTW9tZW50dW09e2ZhbHNlfVxuICAgICAgICBkcmFnPXshaXNGdWxsU2NyZWVufVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY3NzPXtjc3NgIFxuICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBgfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgYH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7LyogLy8gQHRzLW5vY2hlY2sgKi99XG4gICAgICAgICAgICA8VG9nZ2xlQnV0dG9uR3JvdXBcbiAgICAgICAgICAgICAgdmFsdWU9e3NjYWxlUmFuZ2V9XG4gICAgICAgICAgICAgIHNpemU9XCJzbWFsbFwiXG4gICAgICAgICAgICAgIGV4Y2x1c2l2ZVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KF9lLCBuZXdTY2FsZSkgPT4ge1xuICAgICAgICAgICAgICAgIG5ld1NjYWxlICYmIGNoYW5nZVNjYWxlUmFuZ2UobmV3U2NhbGUpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7c2l6ZXMubWFwKChzaXplKSA9PiAoXG4gICAgICAgICAgICAgICAgPFRvZ2dsZUJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtzaXplfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3NpemV9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAke1xuICAgICAgICAgICAgICAgICAgICAgIHNpemUgPT09IHNjYWxlUmFuZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgID8gXCJyZ2JhKDI1NSwyNTUsMjU1LC44KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwicmdiYSgwLDAsMCwuMylcIlxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICBgfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7c2l6ZX0lXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9Ub2dnbGVCdXR0b24+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9Ub2dnbGVCdXR0b25Hcm91cD5cbiAgICAgICAgICAgIHsvKiA8c3Bhbj57d2lkdGh9KntoZWlnaHR9PC9zcGFuPiAqL31cblxuICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgLy8gSW5pdGlhbD17e1xuICAgICAgICAgICAgICAvLyAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgICAgLy8gICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICAgICAgICAvLyB9fVxuICAgICAgICAgICAgICAvLyB0cmFuc2l0aW9uPXtcbiAgICAgICAgICAgICAgLy8gICB7ZHVyYXRpb246IDIwMDB9XG4gICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgYW5pbWF0ZT17e1xuICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCAqIHNjYWxlIC8gZGV2aWNlUGl4ZWxSYXRpbyxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCAqIHNjYWxlIC8gZGV2aWNlUGl4ZWxSYXRpbyxcbiAgICAgICAgICAgICAgICBtYXhIZWlnaHQ6IGhlaWdodCAqIHNjYWxlIC8gZGV2aWNlUGl4ZWxSYXRpbyxcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IGlzRnVsbFNjcmVlbiA/IDAgOiA4LFxuICAgICAgICAgICAgICAgIC8vIE9wYWNpdHk6IGlzRnVsbFNjcmVlbiA/IDEgOiAwLjcsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgIHdpZHRoOiAke3dpZHRoICogc2NhbGUgLyBkZXZpY2VQaXhlbFJhdGlvfTtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICR7aGVpZ2h0ICogc2NhbGUgLyBkZXZpY2VQaXhlbFJhdGlvfTtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuXG5cbiAgICAgICAgICAgICAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7ICovXG4gICAgICAgICAgICBgfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7ZXJyb3JUZXh0ICYmIGVycm9yVGV4dC50cmltKCkgIT09IFwiXCIgJiYgKFxuICAgICAgICAgICAgICAgIDxwcmVcbiAgICAgICAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICAgICAgICAgIHotaW5kZXg6MztcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHJnYigyNTUsIDI0MCwgMjQwKTtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMjRweDtcbiAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAxNHB0O1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAwLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgZmxleDogMCAwIGF1dG87XG4gICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiBhdXRvO1xuICAgICAgICAgICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XG4gICAgICAgICAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbiAgICAgICAgICAgICAgICBgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtpc1N0YWJsZSAmJiBlcnJvclRleHQgJiYgZXJyb3JUZXh0LnRyaW0oKX1cbiAgICAgICAgICAgICAgICAgIHtpc1N0YWJsZSAmJiBlcnJvclRleHQgJiYgZXJyb3JUZXh0LnRyaW0oKSAhPT0gXCJcIiAmJlxuICAgICAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblJlc3RvcmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRFcnJvclRleHQoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFJlc3RvcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvcHJlPlxuICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICAgICAgaW5pdGlhbD17e1xuICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiBcIjBweCAwcHhcIixcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCAvIGRldmljZVBpeGVsUmF0aW8sXG4gICAgICAgICAgICAgICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAvIGRldmljZVBpeGVsUmF0aW8sXG4gICAgICAgICAgICAgICAgICBzY2FsZTogc2NhbGVSYW5nZSAvIDEwMCxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIGFuaW1hdGU9e3tcbiAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybU9yaWdpbjogXCIwcHggMHB4XCIsXG5cbiAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCAvIGRldmljZVBpeGVsUmF0aW8sXG4gICAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCAvIGRldmljZVBpeGVsUmF0aW8sXG4gICAgICAgICAgICAgICAgICBzY2FsZTogc2NhbGVSYW5nZSAvIDEwMCxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6b3ZlcmxheTtcbiAgICAgICAgICAgICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcbiAgICAgICAgICAgICAgICAgID5kaXZ7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOjEwMCU7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDoxMDAlO1xuICAgICAgICAgICAgICAgICAgICBvdmVyZmxvdzogb3ZlcmxheTtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7ZXJyb3JUZXh0XG4gICAgICAgICAgICAgICAgICA/IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgIGlkPVwiemJvZHlcIlxuICAgICAgICAgICAgICAgICAgICAgIGNzcz17YCR7c2Vzc2lvbi5jc3N9YH1cbiAgICAgICAgICAgICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17Y3JlYXRlTWFya3VwKHNlc3Npb24uaHRtbCl9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICA6IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgIGlkPVwiemJvZHlcIlxuICAgICAgICAgICAgICAgICAgICAgIGtleT17c2Vzc2lvbi5pfVxuICAgICAgICAgICAgICAgICAgICAgIHJlZj17emJvZHl9XG4gICAgICAgICAgICAgICAgICAgICAgY3NzPXtjc3NgcVxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7Y2hpbGR9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKX0ge1xuICAgICAgICAgICAgICAgICAgLyogIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgIC8vIHsvKiA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGlmcmFtZVxuICAgICAgICAgICAgICAgICAgICAgIGZyYW1lYm9yZGVyPVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsaW5nPVwibm9cIlxuICAgICAgICAgICAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgICAgICAgICAgICBvbkxvYWQ9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5kb2N1bWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICBzcmM9e2BodHRwczovL3NwaWtlLmxhbmQvYXBpL3Jvb20vJHtyb29tfS9oeWRyYXRlZGB9XG4gICAgICAgICAgICAgICAgICAgIC8+ICovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgICA8VG9nZ2xlQnV0dG9uR3JvdXBcbiAgICAgICAgICAgICAgdmFsdWU9e3dpZHRofVxuICAgICAgICAgICAgICBzaXplPVwic21hbGxcIlxuICAgICAgICAgICAgICBleGNsdXNpdmVcbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhfZSwgbmV3U2l6ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChuZXdTaXplKSB7XG4gICAgICAgICAgICAgICAgICBzZXRIZWlnaHQoYnJlYWtQb2ludEhlaWdodHNbYnJlYWtQb2ludHMuaW5kZXhPZihuZXdTaXplKV0pO1xuICAgICAgICAgICAgICAgICAgc2V0V2lkdGgobmV3U2l6ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7YnJlYWtQb2ludHMubWFwKChzaXplKSA9PiAoXG4gICAgICAgICAgICAgICAgPFRvZ2dsZUJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtzaXplfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3NpemV9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3NpemUgPT09IDY4MFxuICAgICAgICAgICAgICAgICAgICA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8UGhvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoID09PSA2ODBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwicmdiYSgyNTUsMjU1LDI1NSwuOClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJyZ2JhKDAsMCwwLC4zKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIDogKHNpemUgPT09IDc2OFxuICAgICAgICAgICAgICAgICAgICAgID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPFRhYmxldFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e2Nzc2BcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoID09PSA3NjhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJyZ2JhKDI1NSwyNTUsMjU1LC44KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwicmdiYSgwLDAsMCwuMylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgPFR2XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGggPT09IDE5MjBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJyZ2JhKDI1NSwyNTUsMjU1LC44KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwicmdiYSgwLDAsMCwuMylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvVG9nZ2xlQnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvVG9nZ2xlQnV0dG9uR3JvdXA+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjc3M9e2Nzc2BcbiAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjsgICAgICAgICAgXG4gICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgICAgICAgICAgIGB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEZhYlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0RnVsbFNjcmVlbih0cnVlKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPEZ1bGxzY3JlZW5JY29uIC8+XG4gICAgICAgICAgICA8L0ZhYj5cblxuICAgICAgICAgICAgPFFSQnV0dG9uIHVybD17cXJVcmx9IC8+XG5cbiAgICAgICAgICAgIDxGYWJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIG9uU2hhcmUoKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFNoYXJlIC8+XG4gICAgICAgICAgICA8L0ZhYj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L21vdGlvbi5kaXY+XG4gICAgPC9SZWFjdC5TdHJpY3RNb2RlPlxuICApO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlTWFya3VwKF9faHRtbDogc3RyaW5nKSB7XG4gIHJldHVybiB7IF9faHRtbCB9O1xufVxuXG5mdW5jdGlvbiByZXNpemVJZnJhbWUob2JqKSB7XG4gIG9iai5zdHlsZS5oZWlnaHQgPSBvYmouY29udGVudFdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0ICtcbiAgICBcInB4XCI7XG59XG4iLCAiLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCBGYWIgZnJvbSBcIkBtdWkvbWF0ZXJpYWwvRmFiXCI7XG5pbXBvcnQgQnV0dG9uIGZyb20gXCJAbXVpL21hdGVyaWFsL0J1dHRvblwiO1xuXG5pbXBvcnQgY3JlYXRlU3ZnSWNvbiBmcm9tIFwiQG11aS9tYXRlcmlhbC91dGlscy9jcmVhdGVTdmdJY29uXCI7XG5cbmltcG9ydCB0eXBlIHsgRkMsIE1vdXNlRXZlbnQgfSBmcm9tIFwicmVhY3RcIjtcblxuLy8gQ29uc3QgTXlUb2dnbGVCdXR0b25Hcm91cDogRkM8e1xuLy8gICB2YWx1ZTogYW55LFxuLy8gICBvbkNoYW5nZUQ6ICggX2U6IE1vdXNlRXZlbnQsIHZhbHVlOiBhbnkpPT52b2lkfT4gPSAoe3ZhbHVlLCBvbkNoYW5nZUQsIGNoaWxkcmVufSkgPT4gPFRvZ2dsZUJ1dHRvbkdyb3VwXG4vLyB2YWx1ZT17dmFsdWV9XG4vLyBzaXplPVwic21hbGxcIlxuLy8gZXhjbHVzaXZlXG4vLyBvbkNoYW5nZT17KF9lLCB2YWx1ZSk9Pntcbi8vICAgY29uc29sZS5sb2coXCJjbGlja2VkXCIpO1xuLy8gICBvbkNoYW5nZUQoX2UsIHZhbHVlKTtcbi8vIH19PntjaGlsZHJlbn08L1RvZ2dsZUJ1dHRvbkdyb3VwPlxuXG4vLyBjb25zdCBNeVRvZ2dsZUJ1dHRvbjogRkM8e2tleTogYW55LCB2YWx1ZTogYW55fT49KHtrZXksIHZhbHVlLCBjaGlsZHJlbn0pID0+IDxUb2dnbGVCdXR0b25cbi8vIGtleT17a2V5fVxuLy8gdmFsdWU9e3ZhbHVlfVxuLy8gPntjaGlsZHJlbn08L1RvZ2dsZUJ1dHRvbj5cblxuY29uc3QgRnVsbHNjcmVlbkljb24gPSBjcmVhdGVTdmdJY29uKFxuICA8cGF0aCBkPVwiTTE3IDRoNXY1aC0yVjZoLTNWNHpNNCA5VjZoM1Y0SDJ2NWgyem0xNiA2djNoLTN2Mmg1di01aC0yek03IDE4SDR2LTNIMnY1aDV2LTJ6TTE4IDhINnY4aDEyVjh6XCIgLz4sXG4gIFwiRnVsbHNjcmVlblwiLFxuKTtcblxuY29uc3QgUGhvbmUgPSBjcmVhdGVTdmdJY29uKFxuICA8cGF0aFxuICAgIGtleT1cIjEyXCJcbiAgICBkPVwiTTE2IDFIOEM2LjM0IDEgNSAyLjM0IDUgNHYxNmMwIDEuNjYgMS4zNCAzIDMgM2g4YzEuNjYgMCAzLTEuMzQgMy0zVjRjMC0xLjY2LTEuMzQtMy0zLTN6bS0yIDIwaC00di0xaDR2MXptMy4yNS0zSDYuNzVWNGgxMC41djE0elwiXG4gIC8+LFxuICBcIlBob25lQW5kcm9pZFwiLFxuKTtcblxuY29uc3QgTXlCdXR0b246IEZDPHsgb25DbGljazogKCkgPT4gYW55IH0+ID0gKHsgb25DbGljaywgY2hpbGRyZW4gfSkgPT4gKFxuICA8QnV0dG9uIHZhcmlhbnQ9XCJjb250YWluZWRcIiBjb2xvcj1cInByaW1hcnlcIiBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICB7Y2hpbGRyZW59XG4gIDwvQnV0dG9uPlxuKTtcblxuY29uc3QgU2hhcmUgPSBjcmVhdGVTdmdJY29uKFxuICA8cGF0aFxuICAgIGtleT1cIjEyXCJcbiAgICBkPVwiTTE4IDE2LjA4Yy0uNzYgMC0xLjQ0LjMtMS45Ni43N0w4LjkxIDEyLjdjLjA1LS4yMy4wOS0uNDYuMDktLjdzLS4wNC0uNDctLjA5LS43bDcuMDUtNC4xMWMuNTQuNSAxLjI1LjgxIDIuMDQuODEgMS42NiAwIDMtMS4zNCAzLTNzLTEuMzQtMy0zLTMtMyAxLjM0LTMgM2MwIC4yNC4wNC40Ny4wOS43TDguMDQgOS44MUM3LjUgOS4zMSA2Ljc5IDkgNiA5Yy0xLjY2IDAtMyAxLjM0LTMgM3MxLjM0IDMgMyAzYy43OSAwIDEuNS0uMzEgMi4wNC0uODFsNy4xMiA0LjE2Yy0uMDUuMjEtLjA4LjQzLS4wOC42NSAwIDEuNjEgMS4zMSAyLjkyIDIuOTIgMi45MiAxLjYxIDAgMi45Mi0xLjMxIDIuOTItMi45MnMtMS4zMS0yLjkyLTIuOTItMi45MnpcIlxuICAvPixcbiAgXCJTaGFyZVwiLFxuKTtcblxuLy8gQ29uc3QgRnVsbFNjciA9IGNyZWF0ZVN2Z0ljb24oXG4vLyAgIDxwYXRoXG4vLyAgICAga2V5PVwiMTJcIlxuLy8gICAgIGQ9XCJNMTkgNEg1YTIgMiAwIDAwLTIgMnYxMmEyIDIgMCAwMDIgMmg0di0ySDVWOGgxNHYxMGgtNHYyaDRjMS4xIDAgMi0uOSAyLTJWNmEyIDIgMCAwMC0yLTJ6bS03IDZsLTQgNGgzdjZoMnYtNmgzbC00LTR6XCJcbi8vICAgLz4sXG4vLyAgIFwiU2hhcmVcIixcbi8vICk7XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBNZE9wZW5JbkJyb3dzZXIgKHByb3BzKSB7XG4vLyAgIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZmlsbFwiOlwibm9uZVwiLFwiZFwiOlwiTTAgMGgyNHYyNEgwelwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwifX1dfSkocHJvcHMpO1xuLy8gfTtcbi8vIE1kT3BlbkluQnJvd3NlclxuXG5jb25zdCBUYWJsZXQgPSBjcmVhdGVTdmdJY29uKFxuICA8cGF0aFxuICAgIGtleT1cIjEyXCJcbiAgICBkPVwiTTE4IDBINkM0LjM0IDAgMyAxLjM0IDMgM3YxOGMwIDEuNjYgMS4zNCAzIDMgM2gxMmMxLjY2IDAgMy0xLjM0IDMtM1YzYzAtMS42Ni0xLjM0LTMtMy0zem0tNCAyMmgtNHYtMWg0djF6bTUuMjUtM0g0Ljc1VjNoMTQuNXYxNnpcIlxuICAvPixcbiAgXCJUYWJsZXRBbmRyb2lkXCIsXG4pO1xuXG5jb25zdCBUdiA9IGNyZWF0ZVN2Z0ljb24oXG4gIDxwYXRoXG4gICAga2V5PVwiMTJcIlxuICAgIGQ9XCJNMjEgM0gzYy0xLjEgMC0yIC45LTIgMnYxMmMwIDEuMS45IDIgMiAyaDV2Mmg4di0yaDVjMS4xIDAgMS45OS0uOSAxLjk5LTJMMjMgNWMwLTEuMS0uOS0yLTItMnptMCAxNEgzVjVoMTh2MTJ6XCJcbiAgLz4sXG4gIFwiVHZcIixcbik7XG5cbmNvbnN0IE15RnNiOiBGQzx7IG9uQ2xpY2s6ICgpID0+IHZvaWQgfT4gPSAoeyBvbkNsaWNrLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxGYWJcbiAgICB2YXJpYW50PVwiZXh0ZW5kZWRcIlxuICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgb25DbGljaz17b25DbGlja31cbiAgPlxuICAgIHtjaGlsZHJlbn1cbiAgPC9GYWI+XG4pO1xuXG5jb25zdCBRckNvZGUgPSBjcmVhdGVTdmdJY29uKFxuICA8cGF0aFxuICAgIGtleT1cIjEyXCJcbiAgICBkPVwiTTMgMTFoOFYzSDN2OHptMi02aDR2NEg1VjV6TTMgMjFoOHYtOEgzdjh6bTItNmg0djRINXYtNHptOC0xMnY4aDhWM2gtOHptNiA2aC00VjVoNHY0em0wIDEwaDJ2MmgtMnptLTYtNmgydjJoLTJ6bTIgMmgydjJoLTJ6bS0yIDJoMnYyaC0yem0yIDJoMnYyaC0yem0yLTJoMnYyaC0yem0wLTRoMnYyaC0yem0yIDJoMnYyaC0yelwiXG4gIC8+LFxuICBcIlFyQ29kZVwiLFxuKTtcblxuZXhwb3J0IHtcbiAgRnVsbHNjcmVlbkljb24sXG4gIE15QnV0dG9uIGFzIEJ1dHRvbixcbiAgTXlGc2IgYXMgRmFiLFxuICBQaG9uZSxcbiAgUXJDb2RlLFxuICBTaGFyZSxcbiAgVGFibGV0LFxuICBUdixcbn07XG5cbmV4cG9ydCB7IGRlZmF1bHQgYXMgVG9nZ2xlQnV0dG9uIH0gZnJvbSBcIkBtdWkvbWF0ZXJpYWwvVG9nZ2xlQnV0dG9uXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRvZ2dsZUJ1dHRvbkdyb3VwIH0gZnJvbSBcIkBtdWkvbWF0ZXJpYWwvVG9nZ2xlQnV0dG9uR3JvdXBcIjtcbiIsICIvKiogQGpzeCBqc3ggKi9cblxuaW1wb3J0IHsgY3NzLCBqc3ggfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IG1vdGlvbiB9IGZyb20gXCJmcmFtZXItbW90aW9uXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBRUmlvdXMgfSBmcm9tIFwiQHNwaWtlLmxhbmQvcXJpb3VzXCI7XG4vLyBAdHMtZXhwZWN0LWVycm9yXG5pbXBvcnQgeyBGYWIsIFFyQ29kZSB9IGZyb20gXCIuL211aS50c3hcIjtcblxuY29uc3QgUVI6IFJlYWN0LkZDPHsgdXJsOiBzdHJpbmcgfT4gPSAoeyB1cmwgfSkgPT4ge1xuICBjb25zdCBjYW52YXNSZWYgPSBSZWFjdC51c2VSZWY8SFRNTENhbnZhc0VsZW1lbnQ+KG51bGwpO1xuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbG9hZCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIHNpemU6IDIwMCxcbiAgICAgICAgZWxlbWVudDogY2FudmFzUmVmLmN1cnJlbnQsXG4gICAgICAgIGZvcmVncm91bmRBbHBoYTogMC45LFxuICAgICAgICBmb3JlZ3JvdW5kOiBcIndoaXRlXCIsXG4gICAgICAgIGJhY2tncm91bmRBbHBoYTogMSxcbiAgICAgICAgcGFkZGluZzogMTYsXG4gICAgICAgIGJhY2tncm91bmQ6IFwiIzFlMWUxZVwiLFxuICAgICAgICB2YWx1ZTogdXJsLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgcXIgPSBuZXcgUVJpb3VzKG9wdGlvbnMpO1xuICAgIH07XG5cbiAgICBsb2FkKCk7XG4gIH0sIFt1cmxdKTtcblxuICByZXR1cm4gKFxuICAgIDxjYW52YXNcbiAgICAgIGNzcz17Y3NzYFxuICAgICAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIGB9XG4gICAgICByZWY9e2NhbnZhc1JlZn1cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IFFSQnV0dG9uOiBSZWFjdC5GQzx7IHVybDogc3RyaW5nIH0+ID0gKHsgdXJsIH0pID0+IHtcbiAgY29uc3QgW3Nob3dRUiwgc2V0UVJdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICByZXR1cm4gKFxuICAgIDxtb3Rpb24uZGl2XG4gICAgICBhbmltYXRlPXt7XG4gICAgICAgIHdpZHRoOiBzaG93UVIgPyAyMDAgOiA1NixcbiAgICAgICAgaGVpZ2h0OiBzaG93UVIgPyAyMjAgOiA0OCxcbiAgICAgIH19XG4gICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICBzZXRRUighc2hvd1FSKTtcbiAgICAgIH19XG4gICAgICBjc3M9e2Nzc2BcbiAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICAgICAgICAgICAgICBgfVxuICAgID5cbiAgICAgIHtzaG93UVIgPyA8UVIga2V5PXt1cmx9IHVybD17dXJsICsgXCIvZWRpdC9cIn0gLz4gOiAoXG4gICAgICAgIDxGYWJcbiAgICAgICAgICB2YXJpYW50PVwiZXh0ZW5kZWRcIlxuICAgICAgICAgIGNvbG9yPVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICBzZXRRUighc2hvd1FSKTtcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPFFyQ29kZSAvPlxuICAgICAgICA8L0ZhYj5cbiAgICAgICl9XG4gICAgPC9tb3Rpb24uZGl2PlxuICApO1xufTtcbiIsICJ2YXIgdmU9T2JqZWN0LmNyZWF0ZTt2YXIgdz1PYmplY3QuZGVmaW5lUHJvcGVydHk7dmFyIF9lPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7dmFyIGJlPU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO3ZhciBtZT1PYmplY3QuZ2V0UHJvdG90eXBlT2YscGU9T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTt2YXIga2U9dD0+dyh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBvPSh0LGUpPT4oKT0+KGV8fHQoKGU9e2V4cG9ydHM6e319KS5leHBvcnRzLGUpLGUuZXhwb3J0cyk7dmFyIGdlPSh0LGUsaSxyKT0+e2lmKGUmJnR5cGVvZiBlPT1cIm9iamVjdFwifHx0eXBlb2YgZT09XCJmdW5jdGlvblwiKWZvcihsZXQgeCBvZiBiZShlKSkhcGUuY2FsbCh0LHgpJiYoaXx8eCE9PVwiZGVmYXVsdFwiKSYmdyh0LHgse2dldDooKT0+ZVt4XSxlbnVtZXJhYmxlOiEocj1fZShlLHgpKXx8ci5lbnVtZXJhYmxlfSk7cmV0dXJuIHR9LE49KHQsZSk9PmdlKGtlKHcodCE9bnVsbD92ZShtZSh0KSk6e30sXCJkZWZhdWx0XCIsIWUmJnQmJnQuX19lc01vZHVsZT97Z2V0OigpPT50LmRlZmF1bHQsZW51bWVyYWJsZTohMH06e3ZhbHVlOnQsZW51bWVyYWJsZTohMH0pKSx0KTt2YXIgRT1vKChjMCxBKT0+e1widXNlIHN0cmljdFwiO3ZhciBCPWZ1bmN0aW9uKCl7fSx3ZT1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LEJlPUFycmF5LnByb3RvdHlwZS5zbGljZTtmdW5jdGlvbiBNZSh0LGUpe3ZhciBpO3JldHVybiB0eXBlb2YgT2JqZWN0LmNyZWF0ZT09XCJmdW5jdGlvblwiP2k9T2JqZWN0LmNyZWF0ZSh0KTooQi5wcm90b3R5cGU9dCxpPW5ldyBCLEIucHJvdG90eXBlPW51bGwpLGUmJnkoITAsaSxlKSxpfWZ1bmN0aW9uIHFlKHQsZSxpLHIpe3ZhciB4PXRoaXM7cmV0dXJuIHR5cGVvZiB0IT1cInN0cmluZ1wiJiYocj1pLGk9ZSxlPXQsdD1udWxsKSx0eXBlb2YgZSE9XCJmdW5jdGlvblwiJiYocj1pLGk9ZSxlPWZ1bmN0aW9uKCl7cmV0dXJuIHguYXBwbHkodGhpcyxhcmd1bWVudHMpfSkseSghMSxlLHgsciksZS5wcm90b3R5cGU9TWUoeC5wcm90b3R5cGUsaSksZS5wcm90b3R5cGUuY29uc3RydWN0b3I9ZSxlLmNsYXNzXz10fHx4LmNsYXNzXyxlLnN1cGVyXz14LGV9ZnVuY3Rpb24geSh0LGUsaSl7aT1CZS5jYWxsKGFyZ3VtZW50cywyKTtmb3IodmFyIHIseCxzPTAsYT1pLmxlbmd0aDtzPGE7cysrKXt4PWlbc107Zm9yKHIgaW4geCkoIXR8fHdlLmNhbGwoeCxyKSkmJihlW3JdPXhbcl0pfX1BLmV4cG9ydHM9cWV9KTt2YXIgQz1vKCh1MCxTKT0+e1widXNlIHN0cmljdFwiO3ZhciBPZT1FKCk7ZnVuY3Rpb24gcCgpe31wLmNsYXNzXz1cIk5ldmlzXCI7cC5zdXBlcl89T2JqZWN0O3AuZXh0ZW5kPU9lO1MuZXhwb3J0cz1wfSk7dmFyIHU9bygoaDAsTCk9PntcInVzZSBzdHJpY3RcIjtMLmV4cG9ydHM9QygpfSk7dmFyIE09bygoZDAsUik9PntcInVzZSBzdHJpY3RcIjt2YXIgTmU9dSgpLHllPU5lLmV4dGVuZChmdW5jdGlvbih0LGUsaSl7dGhpcy5xcmlvdXM9dCx0aGlzLmVsZW1lbnQ9ZSx0aGlzLmVsZW1lbnQucXJpb3VzPXQsdGhpcy5lbmFibGVkPUJvb2xlYW4oaSl9LHtkcmF3OmZ1bmN0aW9uKHQpe30sZ2V0RWxlbWVudDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmVuYWJsZWR8fCh0aGlzLmVuYWJsZWQ9ITAsdGhpcy5yZW5kZXIoKSksdGhpcy5lbGVtZW50fSxnZXRNb2R1bGVTaXplOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMucXJpb3VzLGk9ZS5wYWRkaW5nfHwwLHI9TWF0aC5mbG9vcigoZS5zaXplLWkqMikvdC53aWR0aCk7cmV0dXJuIE1hdGgubWF4KDEscil9LGdldE9mZnNldDpmdW5jdGlvbih0KXt2YXIgZT10aGlzLnFyaW91cyxpPWUucGFkZGluZztpZihpIT1udWxsKXJldHVybiBpO3ZhciByPXRoaXMuZ2V0TW9kdWxlU2l6ZSh0KSx4PU1hdGguZmxvb3IoKGUuc2l6ZS1yKnQud2lkdGgpLzIpO3JldHVybiBNYXRoLm1heCgwLHgpfSxyZW5kZXI6ZnVuY3Rpb24odCl7dGhpcy5lbmFibGVkJiYodGhpcy5yZXNpemUoKSx0aGlzLnJlc2V0KCksdGhpcy5kcmF3KHQpKX0scmVzZXQ6ZnVuY3Rpb24oKXt9LHJlc2l6ZTpmdW5jdGlvbigpe319KTtSLmV4cG9ydHM9eWV9KTt2YXIgaj1vKChsMCxUKT0+e1widXNlIHN0cmljdFwiO3ZhciBBZT1NKCksRWU9QWUuZXh0ZW5kKHtkcmF3OmZ1bmN0aW9uKHQpe3ZhciBlLGkscj10aGlzLnFyaW91cyx4PXRoaXMuZ2V0TW9kdWxlU2l6ZSh0KSxzPXRoaXMuZ2V0T2Zmc2V0KHQpLGE9dGhpcy5lbGVtZW50LmdldENvbnRleHQoXCIyZFwiKTtmb3IoYS5maWxsU3R5bGU9ci5mb3JlZ3JvdW5kLGEuZ2xvYmFsQWxwaGE9ci5mb3JlZ3JvdW5kQWxwaGEsZT0wO2U8dC53aWR0aDtlKyspZm9yKGk9MDtpPHQud2lkdGg7aSsrKXQuYnVmZmVyW2kqdC53aWR0aCtlXSYmYS5maWxsUmVjdCh4KmUrcyx4Kmkrcyx4LHgpfSxyZXNldDpmdW5jdGlvbigpe3ZhciB0PXRoaXMucXJpb3VzLGU9dGhpcy5lbGVtZW50LmdldENvbnRleHQoXCIyZFwiKSxpPXQuc2l6ZTtlLmxpbmVXaWR0aD0xLGUuY2xlYXJSZWN0KDAsMCxpLGkpLGUuZmlsbFN0eWxlPXQuYmFja2dyb3VuZCxlLmdsb2JhbEFscGhhPXQuYmFja2dyb3VuZEFscGhhLGUuZmlsbFJlY3QoMCwwLGksaSl9LHJlc2l6ZTpmdW5jdGlvbigpe3ZhciB0PXRoaXMuZWxlbWVudDt0LndpZHRoPXQuaGVpZ2h0PXRoaXMucXJpb3VzLnNpemV9fSk7VC5leHBvcnRzPUVlfSk7dmFyIEk9bygodjAseik9PntcInVzZSBzdHJpY3RcIjt2YXIgU2U9dSgpLENlPVNlLmV4dGVuZChudWxsLHtCTE9DSzpbMCwxMSwxNSwxOSwyMywyNywzMSwxNiwxOCwyMCwyMiwyNCwyNiwyOCwyMCwyMiwyNCwyNCwyNiwyOCwyOCwyMiwyNCwyNCwyNiwyNiwyOCwyOCwyNCwyNCwyNiwyNiwyNiwyOCwyOCwyNCwyNiwyNiwyNiwyOCwyOF19KTt6LmV4cG9ydHM9Q2V9KTt2YXIgVj1vKChfMCxQKT0+e1widXNlIHN0cmljdFwiO3ZhciBMZT11KCksUmU9TGUuZXh0ZW5kKG51bGwse0JMT0NLUzpbMSwwLDE5LDcsMSwwLDE2LDEwLDEsMCwxMywxMywxLDAsOSwxNywxLDAsMzQsMTAsMSwwLDI4LDE2LDEsMCwyMiwyMiwxLDAsMTYsMjgsMSwwLDU1LDE1LDEsMCw0NCwyNiwyLDAsMTcsMTgsMiwwLDEzLDIyLDEsMCw4MCwyMCwyLDAsMzIsMTgsMiwwLDI0LDI2LDQsMCw5LDE2LDEsMCwxMDgsMjYsMiwwLDQzLDI0LDIsMiwxNSwxOCwyLDIsMTEsMjIsMiwwLDY4LDE4LDQsMCwyNywxNiw0LDAsMTksMjQsNCwwLDE1LDI4LDIsMCw3OCwyMCw0LDAsMzEsMTgsMiw0LDE0LDE4LDQsMSwxMywyNiwyLDAsOTcsMjQsMiwyLDM4LDIyLDQsMiwxOCwyMiw0LDIsMTQsMjYsMiwwLDExNiwzMCwzLDIsMzYsMjIsNCw0LDE2LDIwLDQsNCwxMiwyNCwyLDIsNjgsMTgsNCwxLDQzLDI2LDYsMiwxOSwyNCw2LDIsMTUsMjgsNCwwLDgxLDIwLDEsNCw1MCwzMCw0LDQsMjIsMjgsMyw4LDEyLDI0LDIsMiw5MiwyNCw2LDIsMzYsMjIsNCw2LDIwLDI2LDcsNCwxNCwyOCw0LDAsMTA3LDI2LDgsMSwzNywyMiw4LDQsMjAsMjQsMTIsNCwxMSwyMiwzLDEsMTE1LDMwLDQsNSw0MCwyNCwxMSw1LDE2LDIwLDExLDUsMTIsMjQsNSwxLDg3LDIyLDUsNSw0MSwyNCw1LDcsMjQsMzAsMTEsNywxMiwyNCw1LDEsOTgsMjQsNywzLDQ1LDI4LDE1LDIsMTksMjQsMywxMywxNSwzMCwxLDUsMTA3LDI4LDEwLDEsNDYsMjgsMSwxNSwyMiwyOCwyLDE3LDE0LDI4LDUsMSwxMjAsMzAsOSw0LDQzLDI2LDE3LDEsMjIsMjgsMiwxOSwxNCwyOCwzLDQsMTEzLDI4LDMsMTEsNDQsMjYsMTcsNCwyMSwyNiw5LDE2LDEzLDI2LDMsNSwxMDcsMjgsMywxMyw0MSwyNiwxNSw1LDI0LDMwLDE1LDEwLDE1LDI4LDQsNCwxMTYsMjgsMTcsMCw0MiwyNiwxNyw2LDIyLDI4LDE5LDYsMTYsMzAsMiw3LDExMSwyOCwxNywwLDQ2LDI4LDcsMTYsMjQsMzAsMzQsMCwxMywyNCw0LDUsMTIxLDMwLDQsMTQsNDcsMjgsMTEsMTQsMjQsMzAsMTYsMTQsMTUsMzAsNiw0LDExNywzMCw2LDE0LDQ1LDI4LDExLDE2LDI0LDMwLDMwLDIsMTYsMzAsOCw0LDEwNiwyNiw4LDEzLDQ3LDI4LDcsMjIsMjQsMzAsMjIsMTMsMTUsMzAsMTAsMiwxMTQsMjgsMTksNCw0NiwyOCwyOCw2LDIyLDI4LDMzLDQsMTYsMzAsOCw0LDEyMiwzMCwyMiwzLDQ1LDI4LDgsMjYsMjMsMzAsMTIsMjgsMTUsMzAsMywxMCwxMTcsMzAsMywyMyw0NSwyOCw0LDMxLDI0LDMwLDExLDMxLDE1LDMwLDcsNywxMTYsMzAsMjEsNyw0NSwyOCwxLDM3LDIzLDMwLDE5LDI2LDE1LDMwLDUsMTAsMTE1LDMwLDE5LDEwLDQ3LDI4LDE1LDI1LDI0LDMwLDIzLDI1LDE1LDMwLDEzLDMsMTE1LDMwLDIsMjksNDYsMjgsNDIsMSwyNCwzMCwyMywyOCwxNSwzMCwxNywwLDExNSwzMCwxMCwyMyw0NiwyOCwxMCwzNSwyNCwzMCwxOSwzNSwxNSwzMCwxNywxLDExNSwzMCwxNCwyMSw0NiwyOCwyOSwxOSwyNCwzMCwxMSw0NiwxNSwzMCwxMyw2LDExNSwzMCwxNCwyMyw0NiwyOCw0NCw3LDI0LDMwLDU5LDEsMTYsMzAsMTIsNywxMjEsMzAsMTIsMjYsNDcsMjgsMzksMTQsMjQsMzAsMjIsNDEsMTUsMzAsNiwxNCwxMjEsMzAsNiwzNCw0NywyOCw0NiwxMCwyNCwzMCwyLDY0LDE1LDMwLDE3LDQsMTIyLDMwLDI5LDE0LDQ2LDI4LDQ5LDEwLDI0LDMwLDI0LDQ2LDE1LDMwLDQsMTgsMTIyLDMwLDEzLDMyLDQ2LDI4LDQ4LDE0LDI0LDMwLDQyLDMyLDE1LDMwLDIwLDQsMTE3LDMwLDQwLDcsNDcsMjgsNDMsMjIsMjQsMzAsMTAsNjcsMTUsMzAsMTksNiwxMTgsMzAsMTgsMzEsNDcsMjgsMzQsMzQsMjQsMzAsMjAsNjEsMTUsMzBdLEZJTkFMX0ZPUk1BVDpbMzA2NjAsMjk0MjcsMzIxNzAsMzA4NzcsMjYxNTksMjUzNjgsMjc3MTMsMjY5OTgsMjE1MjIsMjA3NzMsMjQxODgsMjMzNzEsMTc5MTMsMTY1OTAsMjAzNzUsMTkxMDQsMTM2NjMsMTIzOTIsMTYxNzcsMTQ4NTQsOTM5Niw4NTc5LDExOTk0LDExMjQ1LDU3NjksNTA1NCw3Mzk5LDY2MDgsMTg5MCw1OTcsMzM0MCwyMTA3XSxMRVZFTFM6e0w6MSxNOjIsUTozLEg6NH19KTtQLmV4cG9ydHM9UmV9KTt2YXIgSz1vKChiMCxHKT0+e1widXNlIHN0cmljdFwiO3ZhciBUZT11KCksamU9VGUuZXh0ZW5kKG51bGwse0VYUE9ORU5UOlsxLDIsNCw4LDE2LDMyLDY0LDEyOCwyOSw1OCwxMTYsMjMyLDIwNSwxMzUsMTksMzgsNzYsMTUyLDQ1LDkwLDE4MCwxMTcsMjM0LDIwMSwxNDMsMyw2LDEyLDI0LDQ4LDk2LDE5MiwxNTcsMzksNzgsMTU2LDM3LDc0LDE0OCw1MywxMDYsMjEyLDE4MSwxMTksMjM4LDE5MywxNTksMzUsNzAsMTQwLDUsMTAsMjAsNDAsODAsMTYwLDkzLDE4NiwxMDUsMjEwLDE4NSwxMTEsMjIyLDE2MSw5NSwxOTAsOTcsMTk0LDE1Myw0Nyw5NCwxODgsMTAxLDIwMiwxMzcsMTUsMzAsNjAsMTIwLDI0MCwyNTMsMjMxLDIxMSwxODcsMTA3LDIxNCwxNzcsMTI3LDI1NCwyMjUsMjIzLDE2Myw5MSwxODIsMTEzLDIyNiwyMTcsMTc1LDY3LDEzNCwxNywzNCw2OCwxMzYsMTMsMjYsNTIsMTA0LDIwOCwxODksMTAzLDIwNiwxMjksMzEsNjIsMTI0LDI0OCwyMzcsMTk5LDE0Nyw1OSwxMTgsMjM2LDE5NywxNTEsNTEsMTAyLDIwNCwxMzMsMjMsNDYsOTIsMTg0LDEwOSwyMTgsMTY5LDc5LDE1OCwzMyw2NiwxMzIsMjEsNDIsODQsMTY4LDc3LDE1NCw0MSw4MiwxNjQsODUsMTcwLDczLDE0Niw1NywxMTQsMjI4LDIxMywxODMsMTE1LDIzMCwyMDksMTkxLDk5LDE5OCwxNDUsNjMsMTI2LDI1MiwyMjksMjE1LDE3OSwxMjMsMjQ2LDI0MSwyNTUsMjI3LDIxOSwxNzEsNzUsMTUwLDQ5LDk4LDE5NiwxNDksNTUsMTEwLDIyMCwxNjUsODcsMTc0LDY1LDEzMCwyNSw1MCwxMDAsMjAwLDE0MSw3LDE0LDI4LDU2LDExMiwyMjQsMjIxLDE2Nyw4MywxNjYsODEsMTYyLDg5LDE3OCwxMjEsMjQyLDI0OSwyMzksMTk1LDE1NSw0Myw4NiwxNzIsNjksMTM4LDksMTgsMzYsNzIsMTQ0LDYxLDEyMiwyNDQsMjQ1LDI0NywyNDMsMjUxLDIzNSwyMDMsMTM5LDExLDIyLDQ0LDg4LDE3NiwxMjUsMjUwLDIzMywyMDcsMTMxLDI3LDU0LDEwOCwyMTYsMTczLDcxLDE0MiwwXSxMT0c6WzI1NSwwLDEsMjUsMiw1MCwyNiwxOTgsMywyMjMsNTEsMjM4LDI3LDEwNCwxOTksNzUsNCwxMDAsMjI0LDE0LDUyLDE0MSwyMzksMTI5LDI4LDE5MywxMDUsMjQ4LDIwMCw4LDc2LDExMyw1LDEzOCwxMDEsNDcsMjI1LDM2LDE1LDMzLDUzLDE0NywxNDIsMjE4LDI0MCwxOCwxMzAsNjksMjksMTgxLDE5NCwxMjUsMTA2LDM5LDI0OSwxODUsMjAxLDE1NCw5LDEyMCw3NywyMjgsMTE0LDE2Niw2LDE5MSwxMzksOTgsMTAyLDIyMSw0OCwyNTMsMjI2LDE1MiwzNywxNzksMTYsMTQ1LDM0LDEzNiw1NCwyMDgsMTQ4LDIwNiwxNDMsMTUwLDIxOSwxODksMjQxLDIxMCwxOSw5MiwxMzEsNTYsNzAsNjQsMzAsNjYsMTgyLDE2MywxOTUsNzIsMTI2LDExMCwxMDcsNTgsNDAsODQsMjUwLDEzMywxODYsNjEsMjAyLDk0LDE1NSwxNTksMTAsMjEsMTIxLDQzLDc4LDIxMiwyMjksMTcyLDExNSwyNDMsMTY3LDg3LDcsMTEyLDE5MiwyNDcsMTQwLDEyOCw5OSwxMywxMDMsNzQsMjIyLDIzNyw0OSwxOTcsMjU0LDI0LDIyNywxNjUsMTUzLDExOSwzOCwxODQsMTgwLDEyNCwxNyw2OCwxNDYsMjE3LDM1LDMyLDEzNyw0Niw1NSw2MywyMDksOTEsMTQ5LDE4OCwyMDcsMjA1LDE0NCwxMzUsMTUxLDE3OCwyMjAsMjUyLDE5MCw5NywyNDIsODYsMjExLDE3MSwyMCw0Miw5MywxNTgsMTMyLDYwLDU3LDgzLDcxLDEwOSw2NSwxNjIsMzEsNDUsNjcsMjE2LDE4MywxMjMsMTY0LDExOCwxOTYsMjMsNzMsMjM2LDEyNywxMiwxMTEsMjQ2LDEwOCwxNjEsNTksODIsNDEsMTU3LDg1LDE3MCwyNTEsOTYsMTM0LDE3NywxODcsMjA0LDYyLDkwLDIwMyw4OSw5NSwxNzYsMTU2LDE2OSwxNjAsODEsMTEsMjQ1LDIyLDIzNSwxMjIsMTE3LDQ0LDIxNSw3OSwxNzQsMjEzLDIzMywyMzAsMjMxLDE3MywyMzIsMTE2LDIxNCwyNDQsMjM0LDE2OCw4MCw4OCwxNzVdfSk7Ry5leHBvcnRzPWplfSk7dmFyIEQ9bygobTAsVSk9PntcInVzZSBzdHJpY3RcIjt2YXIgemU9dSgpLEllPXplLmV4dGVuZChudWxsLHtCTE9DSzpbMzIyMCwxNDY4LDI3MTMsMTIzNSwzMDYyLDE4OTAsMjExOSwxNTQ5LDIzNDQsMjkzNiwxMTE3LDI1ODMsMTMzMCwyNDcwLDE2NjcsMjI0OSwyMDI4LDM3ODAsNDgxLDQwMTEsMTQyLDMwOTgsODMxLDM0NDUsNTkyLDI1MTcsMTc3NiwyMjM0LDE5NTEsMjgyNywxMDcwLDI2NjAsMTM0NSwzMTc3XX0pO1UuZXhwb3J0cz1JZX0pO3ZhciBRPW8oKHAwLEYpPT57XCJ1c2Ugc3RyaWN0XCI7dmFyIFBlPXUoKSxWZT1JKCksXz1WKCksbD1LKCksR2U9RCgpLGM9UGUuZXh0ZW5kKGZ1bmN0aW9uKHQpe3ZhciBlLGkscix4LHMsYT10LnZhbHVlLmxlbmd0aDtmb3IodGhpcy5fYmFkbmVzcz1bXSx0aGlzLl9sZXZlbD1fLkxFVkVMU1t0LmxldmVsXSx0aGlzLl9wb2x5bm9taWFsPVtdLHRoaXMuX3ZhbHVlPXQudmFsdWUsdGhpcy5fdmVyc2lvbj0wLHRoaXMuX3N0cmluZ0J1ZmZlcj1bXTt0aGlzLl92ZXJzaW9uPDQwJiYodGhpcy5fdmVyc2lvbisrLHI9KHRoaXMuX2xldmVsLTEpKjQrKHRoaXMuX3ZlcnNpb24tMSkqMTYseD1fLkJMT0NLU1tyKytdLHM9Xy5CTE9DS1NbcisrXSxlPV8uQkxPQ0tTW3IrK10saT1fLkJMT0NLU1tyXSxyPWUqKHgrcykrcy0zKyh0aGlzLl92ZXJzaW9uPD05KSwhKGE8PXIpKTspO3RoaXMuX2RhdGFCbG9jaz1lLHRoaXMuX2VjY0Jsb2NrPWksdGhpcy5fbmVjY0Jsb2NrMT14LHRoaXMuX25lY2NCbG9jazI9czt2YXIgbj10aGlzLndpZHRoPTE3KzQqdGhpcy5fdmVyc2lvbjt0aGlzLmJ1ZmZlcj1jLl9jcmVhdGVBcnJheShuKm4pLHRoaXMuX2VjYz1jLl9jcmVhdGVBcnJheShlKyhlK2kpKih4K3MpK3MpLHRoaXMuX21hc2s9Yy5fY3JlYXRlQXJyYXkoKG4qKG4rMSkrMSkvMiksdGhpcy5faW5zZXJ0RmluZGVycygpLHRoaXMuX2luc2VydEFsaWdubWVudHMoKSx0aGlzLmJ1ZmZlcls4K24qKG4tOCldPTEsdGhpcy5faW5zZXJ0VGltaW5nR2FwKCksdGhpcy5fcmV2ZXJzZU1hc2soKSx0aGlzLl9pbnNlcnRUaW1pbmdSb3dBbmRDb2x1bW4oKSx0aGlzLl9pbnNlcnRWZXJzaW9uKCksdGhpcy5fc3luY01hc2soKSx0aGlzLl9jb252ZXJ0Qml0U3RyZWFtKGEpLHRoaXMuX2NhbGN1bGF0ZVBvbHlub21pYWwoKSx0aGlzLl9hcHBlbmRFY2NUb0RhdGEoKSx0aGlzLl9pbnRlcmxlYXZlQmxvY2tzKCksdGhpcy5fcGFjaygpLHRoaXMuX2ZpbmlzaCgpfSx7X2FkZEFsaWdubWVudDpmdW5jdGlvbih0LGUpe3ZhciBpLHI9dGhpcy5idWZmZXIseD10aGlzLndpZHRoO2ZvcihyW3QreCplXT0xLGk9LTI7aTwyO2krKylyW3QraSt4KihlLTIpXT0xLHJbdC0yK3gqKGUraSsxKV09MSxyW3QrMit4KihlK2kpXT0xLHJbdCtpKzEreCooZSsyKV09MTtmb3IoaT0wO2k8MjtpKyspdGhpcy5fc2V0TWFzayh0LTEsZStpKSx0aGlzLl9zZXRNYXNrKHQrMSxlLWkpLHRoaXMuX3NldE1hc2sodC1pLGUtMSksdGhpcy5fc2V0TWFzayh0K2ksZSsxKX0sX2FwcGVuZERhdGE6ZnVuY3Rpb24odCxlLGkscil7dmFyIHgscyxhLG49dGhpcy5fcG9seW5vbWlhbCxmPXRoaXMuX3N0cmluZ0J1ZmZlcjtmb3Iocz0wO3M8cjtzKyspZltpK3NdPTA7Zm9yKHM9MDtzPGU7cysrKXtpZih4PWwuTE9HW2ZbdCtzXV5mW2ldXSx4IT09MjU1KWZvcihhPTE7YTxyO2ErKylmW2krYS0xXT1mW2krYV1ebC5FWFBPTkVOVFtjLl9tb2ROKHgrbltyLWFdKV07ZWxzZSBmb3IoYT1pO2E8aStyO2ErKylmW2FdPWZbYSsxXTtmW2krci0xXT14PT09MjU1PzA6bC5FWFBPTkVOVFtjLl9tb2ROKHgrblswXSldfX0sX2FwcGVuZEVjY1RvRGF0YTpmdW5jdGlvbigpe3ZhciB0LGU9MCxpPXRoaXMuX2RhdGFCbG9jayxyPXRoaXMuX2NhbGN1bGF0ZU1heExlbmd0aCgpLHg9dGhpcy5fZWNjQmxvY2s7Zm9yKHQ9MDt0PHRoaXMuX25lY2NCbG9jazE7dCsrKXRoaXMuX2FwcGVuZERhdGEoZSxpLHIseCksZSs9aSxyKz14O2Zvcih0PTA7dDx0aGlzLl9uZWNjQmxvY2syO3QrKyl0aGlzLl9hcHBlbmREYXRhKGUsaSsxLHIseCksZSs9aSsxLHIrPXh9LF9hcHBseU1hc2s6ZnVuY3Rpb24odCl7dmFyIGUsaSxyLHgscz10aGlzLmJ1ZmZlcixhPXRoaXMud2lkdGg7c3dpdGNoKHQpe2Nhc2UgMDpmb3IoeD0wO3g8YTt4KyspZm9yKHI9MDtyPGE7cisrKSEocit4JjEpJiYhdGhpcy5faXNNYXNrZWQocix4KSYmKHNbcit4KmFdXj0xKTticmVhaztjYXNlIDE6Zm9yKHg9MDt4PGE7eCsrKWZvcihyPTA7cjxhO3IrKykhKHgmMSkmJiF0aGlzLl9pc01hc2tlZChyLHgpJiYoc1tyK3gqYV1ePTEpO2JyZWFrO2Nhc2UgMjpmb3IoeD0wO3g8YTt4KyspZm9yKGU9MCxyPTA7cjxhO3IrKyxlKyspZT09PTMmJihlPTApLCFlJiYhdGhpcy5faXNNYXNrZWQocix4KSYmKHNbcit4KmFdXj0xKTticmVhaztjYXNlIDM6Zm9yKGk9MCx4PTA7eDxhO3grKyxpKyspZm9yKGk9PT0zJiYoaT0wKSxlPWkscj0wO3I8YTtyKyssZSsrKWU9PT0zJiYoZT0wKSwhZSYmIXRoaXMuX2lzTWFza2VkKHIseCkmJihzW3IreCphXV49MSk7YnJlYWs7Y2FzZSA0OmZvcih4PTA7eDxhO3grKylmb3IoZT0wLGk9eD4+MSYxLHI9MDtyPGE7cisrLGUrKyllPT09MyYmKGU9MCxpPSFpKSwhaSYmIXRoaXMuX2lzTWFza2VkKHIseCkmJihzW3IreCphXV49MSk7YnJlYWs7Y2FzZSA1OmZvcihpPTAseD0wO3g8YTt4KyssaSsrKWZvcihpPT09MyYmKGk9MCksZT0wLHI9MDtyPGE7cisrLGUrKyllPT09MyYmKGU9MCksISgociZ4JjEpKyEoIWV8IWkpKSYmIXRoaXMuX2lzTWFza2VkKHIseCkmJihzW3IreCphXV49MSk7YnJlYWs7Y2FzZSA2OmZvcihpPTAseD0wO3g8YTt4KyssaSsrKWZvcihpPT09MyYmKGk9MCksZT0wLHI9MDtyPGE7cisrLGUrKyllPT09MyYmKGU9MCksISgociZ4JjEpKyhlJiZlPT09aSkmMSkmJiF0aGlzLl9pc01hc2tlZChyLHgpJiYoc1tyK3gqYV1ePTEpO2JyZWFrO2Nhc2UgNzpmb3IoaT0wLHg9MDt4PGE7eCsrLGkrKylmb3IoaT09PTMmJihpPTApLGU9MCxyPTA7cjxhO3IrKyxlKyspZT09PTMmJihlPTApLCEoKGUmJmU9PT1pKSsocit4JjEpJjEpJiYhdGhpcy5faXNNYXNrZWQocix4KSYmKHNbcit4KmFdXj0xKTticmVha319LF9jYWxjdWxhdGVNYXhMZW5ndGg6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fZGF0YUJsb2NrKih0aGlzLl9uZWNjQmxvY2sxK3RoaXMuX25lY2NCbG9jazIpK3RoaXMuX25lY2NCbG9jazJ9LF9jYWxjdWxhdGVQb2x5bm9taWFsOmZ1bmN0aW9uKCl7dmFyIHQsZSxpPXRoaXMuX2VjY0Jsb2NrLHI9dGhpcy5fcG9seW5vbWlhbDtmb3IoclswXT0xLHQ9MDt0PGk7dCsrKXtmb3Ioclt0KzFdPTEsZT10O2U+MDtlLS0pcltlXT1yW2VdP3JbZS0xXV5sLkVYUE9ORU5UW2MuX21vZE4obC5MT0dbcltlXV0rdCldOnJbZS0xXTtyWzBdPWwuRVhQT05FTlRbYy5fbW9kTihsLkxPR1tyWzBdXSt0KV19Zm9yKHQ9MDt0PD1pO3QrKylyW3RdPWwuTE9HW3JbdF1dfSxfY2hlY2tCYWRuZXNzOmZ1bmN0aW9uKCl7dmFyIHQsZSxpLHIseCxzPTAsYT10aGlzLl9iYWRuZXNzLG49dGhpcy5idWZmZXIsZj10aGlzLndpZHRoO2Zvcih4PTA7eDxmLTE7eCsrKWZvcihyPTA7cjxmLTE7cisrKShuW3IrZip4XSYmbltyKzErZip4XSYmbltyK2YqKHgrMSldJiZuW3IrMStmKih4KzEpXXx8IShuW3IrZip4XXx8bltyKzErZip4XXx8bltyK2YqKHgrMSldfHxuW3IrMStmKih4KzEpXSkpJiYocys9Yy5OMik7dmFyIGg9MDtmb3IoeD0wO3g8Zjt4Kyspe2ZvcihpPTAsYVswXT0wLHQ9MCxyPTA7cjxmO3IrKyllPW5bcitmKnhdLHQ9PT1lP2FbaV0rKzphWysraV09MSx0PWUsaCs9dD8xOi0xO3MrPXRoaXMuX2dldEJhZG5lc3MoaSl9aDwwJiYoaD0taCk7dmFyIE89MCxiPWg7Zm9yKGIrPWI8PDIsYjw8PTE7Yj5mKmY7KWItPWYqZixPKys7Zm9yKHMrPU8qYy5ONCxyPTA7cjxmO3IrKyl7Zm9yKGk9MCxhWzBdPTAsdD0wLHg9MDt4PGY7eCsrKWU9bltyK2YqeF0sdD09PWU/YVtpXSsrOmFbKytpXT0xLHQ9ZTtzKz10aGlzLl9nZXRCYWRuZXNzKGkpfXJldHVybiBzfSxfY29udmVydEJpdFN0cmVhbTpmdW5jdGlvbih0KXt2YXIgZSxpLHI9dGhpcy5fZWNjLHg9dGhpcy5fdmVyc2lvbjtmb3IoaT0wO2k8dDtpKyspcltpXT10aGlzLl92YWx1ZS5jaGFyQ29kZUF0KGkpO3ZhciBzPXRoaXMuX3N0cmluZ0J1ZmZlcj1yLnNsaWNlKCksYT10aGlzLl9jYWxjdWxhdGVNYXhMZW5ndGgoKTt0Pj1hLTImJih0PWEtMix4PjkmJnQtLSk7dmFyIG49dDtpZih4Pjkpe2ZvcihzW24rMl09MCxzW24rM109MDtuLS07KWU9c1tuXSxzW24rM118PTI1NSZlPDw0LHNbbisyXT1lPj40O3NbMl18PTI1NSZ0PDw0LHNbMV09dD4+NCxzWzBdPTY0fHQ+PjEyfWVsc2V7Zm9yKHNbbisxXT0wLHNbbisyXT0wO24tLTspZT1zW25dLHNbbisyXXw9MjU1JmU8PDQsc1tuKzFdPWU+PjQ7c1sxXXw9MjU1JnQ8PDQsc1swXT02NHx0Pj40fWZvcihuPXQrMy0oeDwxMCk7bjxhOylzW24rK109MjM2LHNbbisrXT0xN30sX2dldEJhZG5lc3M6ZnVuY3Rpb24odCl7dmFyIGUsaT0wLHI9dGhpcy5fYmFkbmVzcztmb3IoZT0wO2U8PXQ7ZSsrKXJbZV0+PTUmJihpKz1jLk4xK3JbZV0tNSk7Zm9yKGU9MztlPHQtMTtlKz0yKXJbZS0yXT09PXJbZSsyXSYmcltlKzJdPT09cltlLTFdJiZyW2UtMV09PT1yW2UrMV0mJnJbZS0xXSozPT09cltlXSYmKHJbZS0zXT09PTB8fGUrMz50fHxyW2UtM10qMz49cltlXSo0fHxyW2UrM10qMz49cltlXSo0KSYmKGkrPWMuTjMpO3JldHVybiBpfSxfZmluaXNoOmZ1bmN0aW9uKCl7dGhpcy5fc3RyaW5nQnVmZmVyPXRoaXMuYnVmZmVyLnNsaWNlKCk7dmFyIHQsZSxpPTAscj0zZTQ7Zm9yKGU9MDtlPDgmJih0aGlzLl9hcHBseU1hc2soZSksdD10aGlzLl9jaGVja0JhZG5lc3MoKSx0PHImJihyPXQsaT1lKSxpIT09Nyk7ZSsrKXRoaXMuYnVmZmVyPXRoaXMuX3N0cmluZ0J1ZmZlci5zbGljZSgpO2khPT1lJiZ0aGlzLl9hcHBseU1hc2soaSkscj1fLkZJTkFMX0ZPUk1BVFtpKyh0aGlzLl9sZXZlbC0xPDwzKV07dmFyIHg9dGhpcy5idWZmZXIscz10aGlzLndpZHRoO2ZvcihlPTA7ZTw4O2UrKyxyPj49MSlyJjEmJih4W3MtMS1lK3MqOF09MSxlPDY/eFs4K3MqZV09MTp4WzgrcyooZSsxKV09MSk7Zm9yKGU9MDtlPDc7ZSsrLHI+Pj0xKXImMSYmKHhbOCtzKihzLTcrZSldPTEsZT94WzYtZStzKjhdPTE6eFs3K3MqOF09MSl9LF9pbnRlcmxlYXZlQmxvY2tzOmZ1bmN0aW9uKCl7dmFyIHQsZSxpPXRoaXMuX2RhdGFCbG9jayxyPXRoaXMuX2VjYyx4PXRoaXMuX2VjY0Jsb2NrLHM9MCxhPXRoaXMuX2NhbGN1bGF0ZU1heExlbmd0aCgpLG49dGhpcy5fbmVjY0Jsb2NrMSxmPXRoaXMuX25lY2NCbG9jazIsaD10aGlzLl9zdHJpbmdCdWZmZXI7Zm9yKHQ9MDt0PGk7dCsrKXtmb3IoZT0wO2U8bjtlKyspcltzKytdPWhbdCtlKmldO2ZvcihlPTA7ZTxmO2UrKylyW3MrK109aFtuKmkrdCtlKihpKzEpXX1mb3IoZT0wO2U8ZjtlKyspcltzKytdPWhbbippK3QrZSooaSsxKV07Zm9yKHQ9MDt0PHg7dCsrKWZvcihlPTA7ZTxuK2Y7ZSsrKXJbcysrXT1oW2ErdCtlKnhdO3RoaXMuX3N0cmluZ0J1ZmZlcj1yfSxfaW5zZXJ0QWxpZ25tZW50czpmdW5jdGlvbigpe3ZhciB0LGUsaSxyPXRoaXMuX3ZlcnNpb24seD10aGlzLndpZHRoO2lmKHI+MSlmb3IodD1WZS5CTE9DS1tyXSxpPXgtNzs7KXtmb3IoZT14LTc7ZT50LTMmJih0aGlzLl9hZGRBbGlnbm1lbnQoZSxpKSwhKGU8dCkpOyllLT10O2lmKGk8PXQrOSlicmVhaztpLT10LHRoaXMuX2FkZEFsaWdubWVudCg2LGkpLHRoaXMuX2FkZEFsaWdubWVudChpLDYpfX0sX2luc2VydEZpbmRlcnM6ZnVuY3Rpb24oKXt2YXIgdCxlLGkscix4PXRoaXMuYnVmZmVyLHM9dGhpcy53aWR0aDtmb3IodD0wO3Q8Mzt0Kyspe2ZvcihlPTAscj0wLHQ9PT0xJiYoZT1zLTcpLHQ9PT0yJiYocj1zLTcpLHhbciszK3MqKGUrMyldPTEsaT0wO2k8NjtpKyspeFtyK2krcyplXT0xLHhbcitzKihlK2krMSldPTEseFtyKzYrcyooZStpKV09MSx4W3IraSsxK3MqKGUrNildPTE7Zm9yKGk9MTtpPDU7aSsrKXRoaXMuX3NldE1hc2socitpLGUrMSksdGhpcy5fc2V0TWFzayhyKzEsZStpKzEpLHRoaXMuX3NldE1hc2socis1LGUraSksdGhpcy5fc2V0TWFzayhyK2krMSxlKzUpO2ZvcihpPTI7aTw0O2krKyl4W3IraStzKihlKzIpXT0xLHhbcisyK3MqKGUraSsxKV09MSx4W3IrNCtzKihlK2kpXT0xLHhbcitpKzErcyooZSs0KV09MX19LF9pbnNlcnRUaW1pbmdHYXA6ZnVuY3Rpb24oKXt2YXIgdCxlLGk9dGhpcy53aWR0aDtmb3IoZT0wO2U8NztlKyspdGhpcy5fc2V0TWFzayg3LGUpLHRoaXMuX3NldE1hc2soaS04LGUpLHRoaXMuX3NldE1hc2soNyxlK2ktNyk7Zm9yKHQ9MDt0PDg7dCsrKXRoaXMuX3NldE1hc2sodCw3KSx0aGlzLl9zZXRNYXNrKHQraS04LDcpLHRoaXMuX3NldE1hc2sodCxpLTgpfSxfaW5zZXJ0VGltaW5nUm93QW5kQ29sdW1uOmZ1bmN0aW9uKCl7dmFyIHQsZT10aGlzLmJ1ZmZlcixpPXRoaXMud2lkdGg7Zm9yKHQ9MDt0PGktMTQ7dCsrKXQmMT8odGhpcy5fc2V0TWFzayg4K3QsNiksdGhpcy5fc2V0TWFzayg2LDgrdCkpOihlWzgrdCtpKjZdPTEsZVs2K2kqKDgrdCldPTEpfSxfaW5zZXJ0VmVyc2lvbjpmdW5jdGlvbigpe3ZhciB0LGUsaSxyLHg9dGhpcy5idWZmZXIscz10aGlzLl92ZXJzaW9uLGE9dGhpcy53aWR0aDtpZihzPjYpZm9yKHQ9R2UuQkxPQ0tbcy03XSxlPTE3LGk9MDtpPDY7aSsrKWZvcihyPTA7cjwzO3IrKyxlLS0pMSYoZT4xMT9zPj5lLTEyOnQ+PmUpPyh4WzUtaSthKigyLXIrYS0xMSldPTEseFsyLXIrYS0xMSthKig1LWkpXT0xKToodGhpcy5fc2V0TWFzayg1LWksMi1yK2EtMTEpLHRoaXMuX3NldE1hc2soMi1yK2EtMTEsNS1pKSl9LF9pc01hc2tlZDpmdW5jdGlvbih0LGUpe3ZhciBpPWMuX2dldE1hc2tCaXQodCxlKTtyZXR1cm4gdGhpcy5fbWFza1tpXT09PTF9LF9wYWNrOmZ1bmN0aW9uKCl7dmFyIHQsZSxpLHI9MSx4PTEscz10aGlzLndpZHRoLGE9cy0xLG49cy0xLGY9KHRoaXMuX2RhdGFCbG9jayt0aGlzLl9lY2NCbG9jaykqKHRoaXMuX25lY2NCbG9jazErdGhpcy5fbmVjY0Jsb2NrMikrdGhpcy5fbmVjY0Jsb2NrMjtmb3IoZT0wO2U8ZjtlKyspZm9yKHQ9dGhpcy5fc3RyaW5nQnVmZmVyW2VdLGk9MDtpPDg7aSsrLHQ8PD0xKXsxMjgmdCYmKHRoaXMuYnVmZmVyW2ErcypuXT0xKTtkbyB4P2EtLTooYSsrLHI/biE9PTA/bi0tOihhLT0yLHI9IXIsYT09PTYmJihhLS0sbj05KSk6biE9PXMtMT9uKys6KGEtPTIscj0hcixhPT09NiYmKGEtLSxuLT04KSkpLHg9IXg7d2hpbGUodGhpcy5faXNNYXNrZWQoYSxuKSl9fSxfcmV2ZXJzZU1hc2s6ZnVuY3Rpb24oKXt2YXIgdCxlLGk9dGhpcy53aWR0aDtmb3IodD0wO3Q8OTt0KyspdGhpcy5fc2V0TWFzayh0LDgpO2Zvcih0PTA7dDw4O3QrKyl0aGlzLl9zZXRNYXNrKHQraS04LDgpLHRoaXMuX3NldE1hc2soOCx0KTtmb3IoZT0wO2U8NztlKyspdGhpcy5fc2V0TWFzayg4LGUraS03KX0sX3NldE1hc2s6ZnVuY3Rpb24odCxlKXt2YXIgaT1jLl9nZXRNYXNrQml0KHQsZSk7dGhpcy5fbWFza1tpXT0xfSxfc3luY01hc2s6ZnVuY3Rpb24oKXt2YXIgdCxlLGk9dGhpcy53aWR0aDtmb3IoZT0wO2U8aTtlKyspZm9yKHQ9MDt0PD1lO3QrKyl0aGlzLmJ1ZmZlclt0K2kqZV0mJnRoaXMuX3NldE1hc2sodCxlKX19LHtfY3JlYXRlQXJyYXk6ZnVuY3Rpb24odCl7dmFyIGUsaT1bXTtmb3IoZT0wO2U8dDtlKyspaVtlXT0wO3JldHVybiBpfSxfZ2V0TWFza0JpdDpmdW5jdGlvbih0LGUpe3ZhciBpO3JldHVybiB0PmUmJihpPXQsdD1lLGU9aSksaT1lLGkrPWUqZSxpPj49MSxpKz10LGl9LF9tb2ROOmZ1bmN0aW9uKHQpe2Zvcig7dD49MjU1Oyl0LT0yNTUsdD0odD4+OCkrKHQmMjU1KTtyZXR1cm4gdH0sTjE6MyxOMjozLE4zOjQwLE40OjEwfSk7Ri5leHBvcnRzPWN9KTt2YXIgSD1vKChrMCxYKT0+e1widXNlIHN0cmljdFwiO3ZhciBLZT1NKCksVWU9S2UuZXh0ZW5kKHtkcmF3OmZ1bmN0aW9uKCl7dGhpcy5lbGVtZW50LnNyYz10aGlzLnFyaW91cy50b0RhdGFVUkwoKX0scmVzZXQ6ZnVuY3Rpb24oKXt0aGlzLmVsZW1lbnQuc3JjPVwiXCJ9LHJlc2l6ZTpmdW5jdGlvbigpe3ZhciB0PXRoaXMuZWxlbWVudDt0LndpZHRoPXQuaGVpZ2h0PXRoaXMucXJpb3VzLnNpemV9fSk7WC5leHBvcnRzPVVlfSk7dmFyIEo9bygoZzAsVyk9PntcInVzZSBzdHJpY3RcIjt2YXIgRGU9dSgpLEZlPURlLmV4dGVuZChmdW5jdGlvbih0LGUsaSxyKXt0aGlzLm5hbWU9dCx0aGlzLm1vZGlmaWFibGU9Qm9vbGVhbihlKSx0aGlzLmRlZmF1bHRWYWx1ZT1pLHRoaXMuX3ZhbHVlVHJhbnNmb3JtZXI9cn0se3RyYW5zZm9ybTpmdW5jdGlvbih0KXt2YXIgZT10aGlzLl92YWx1ZVRyYW5zZm9ybWVyO3JldHVybiB0eXBlb2YgZT09XCJmdW5jdGlvblwiP2UodCx0aGlzKTp0fX0pO1cuZXhwb3J0cz1GZX0pO3ZhciBxPW8oKHcwLFkpPT57XCJ1c2Ugc3RyaWN0XCI7dmFyIFFlPXUoKSxYZT1RZS5leHRlbmQobnVsbCx7YWJzOmZ1bmN0aW9uKHQpe3JldHVybiB0IT1udWxsP01hdGguYWJzKHQpOm51bGx9LGhhc093bjpmdW5jdGlvbih0LGUpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCxlKX0sbm9vcDpmdW5jdGlvbigpe30sdG9VcHBlckNhc2U6ZnVuY3Rpb24odCl7cmV0dXJuIHQhPW51bGw/dC50b1VwcGVyQ2FzZSgpOm51bGx9fSk7WS5leHBvcnRzPVhlfSk7dmFyICQ9bygoQjAsWik9PntcInVzZSBzdHJpY3RcIjt2YXIgSGU9dSgpLGs9cSgpLHY9SGUuZXh0ZW5kKGZ1bmN0aW9uKHQpe3RoaXMub3B0aW9ucz17fSx0LmZvckVhY2goZnVuY3Rpb24oZSl7dGhpcy5vcHRpb25zW2UubmFtZV09ZX0sdGhpcyl9LHtleGlzdHM6ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMub3B0aW9uc1t0XSE9bnVsbH0sZ2V0OmZ1bmN0aW9uKHQsZSl7cmV0dXJuIHYuX2dldCh0aGlzLm9wdGlvbnNbdF0sZSl9LGdldEFsbDpmdW5jdGlvbih0KXt2YXIgZSxpPXRoaXMub3B0aW9ucyxyPXt9O2ZvcihlIGluIGkpay5oYXNPd24oaSxlKSYmKHJbZV09di5fZ2V0KGlbZV0sdCkpO3JldHVybiByfSxpbml0OmZ1bmN0aW9uKHQsZSxpKXt0eXBlb2YgaSE9XCJmdW5jdGlvblwiJiYoaT1rLm5vb3ApO3ZhciByLHg7Zm9yKHIgaW4gdGhpcy5vcHRpb25zKWsuaGFzT3duKHRoaXMub3B0aW9ucyxyKSYmKHg9dGhpcy5vcHRpb25zW3JdLHYuX3NldCh4LHguZGVmYXVsdFZhbHVlLGUpLHYuX2NyZWF0ZUFjY2Vzc29yKHgsZSxpKSk7dGhpcy5fc2V0QWxsKHQsZSwhMCl9LHNldDpmdW5jdGlvbih0LGUsaSl7cmV0dXJuIHRoaXMuX3NldCh0LGUsaSl9LHNldEFsbDpmdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLl9zZXRBbGwodCxlKX0sX3NldDpmdW5jdGlvbih0LGUsaSxyKXt2YXIgeD10aGlzLm9wdGlvbnNbdF07aWYoIXgpdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBvcHRpb246IFwiK3QpO2lmKCF4Lm1vZGlmaWFibGUmJiFyKXRocm93IG5ldyBFcnJvcihcIk9wdGlvbiBjYW5ub3QgYmUgbW9kaWZpZWQ6IFwiK3QpO3JldHVybiB2Ll9zZXQoeCxlLGkpfSxfc2V0QWxsOmZ1bmN0aW9uKHQsZSxpKXtpZighdClyZXR1cm4hMTt2YXIgcix4PSExO2ZvcihyIGluIHQpay5oYXNPd24odCxyKSYmdGhpcy5fc2V0KHIsdFtyXSxlLGkpJiYoeD0hMCk7cmV0dXJuIHh9fSx7X2NyZWF0ZUFjY2Vzc29yOmZ1bmN0aW9uKHQsZSxpKXt2YXIgcj17Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHYuX2dldCh0LGUpfX07dC5tb2RpZmlhYmxlJiYoci5zZXQ9ZnVuY3Rpb24oeCl7di5fc2V0KHQseCxlKSYmaSh4LHQpfSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsdC5uYW1lLHIpfSxfZ2V0OmZ1bmN0aW9uKHQsZSl7cmV0dXJuIGVbXCJfXCIrdC5uYW1lXX0sX3NldDpmdW5jdGlvbih0LGUsaSl7dmFyIHI9XCJfXCIrdC5uYW1lLHg9aVtyXSxzPXQudHJhbnNmb3JtKGUhPW51bGw/ZTp0LmRlZmF1bHRWYWx1ZSk7cmV0dXJuIGlbcl09cyxzIT09eH19KTtaLmV4cG9ydHM9dn0pO3ZhciB0ZT1vKChNMCxlZSk9PntcInVzZSBzdHJpY3RcIjt2YXIgV2U9dSgpLEplPVdlLmV4dGVuZChmdW5jdGlvbigpe3RoaXMuX3NlcnZpY2VzPXt9fSx7Z2V0U2VydmljZTpmdW5jdGlvbih0KXt2YXIgZT10aGlzLl9zZXJ2aWNlc1t0XTtpZighZSl0aHJvdyBuZXcgRXJyb3IoXCJTZXJ2aWNlIGlzIG5vdCBiZWluZyBtYW5hZ2VkIHdpdGggbmFtZTogXCIrdCk7cmV0dXJuIGV9LHNldFNlcnZpY2U6ZnVuY3Rpb24odCxlKXtpZih0aGlzLl9zZXJ2aWNlc1t0XSl0aHJvdyBuZXcgRXJyb3IoXCJTZXJ2aWNlIGlzIGFscmVhZHkgbWFuYWdlZCB3aXRoIG5hbWU6IFwiK3QpO2UmJih0aGlzLl9zZXJ2aWNlc1t0XT1lKX19KTtlZS5leHBvcnRzPUplfSk7dmFyIHNlPW8oKHEwLHhlKT0+e1widXNlIHN0cmljdFwiO3ZhciBZZT11KCksWmU9aigpLCRlPVEoKSxlMD1IKCksZD1KKCksdDA9JCgpLGkwPXRlKCksbT1xKCksZz1uZXcgdDAoW25ldyBkKFwiYmFja2dyb3VuZFwiLCEwLFwid2hpdGVcIiksbmV3IGQoXCJiYWNrZ3JvdW5kQWxwaGFcIiwhMCwxLG0uYWJzKSxuZXcgZChcImVsZW1lbnRcIiksbmV3IGQoXCJmb3JlZ3JvdW5kXCIsITAsXCJibGFja1wiKSxuZXcgZChcImZvcmVncm91bmRBbHBoYVwiLCEwLDEsbS5hYnMpLG5ldyBkKFwibGV2ZWxcIiwhMCxcIkxcIixtLnRvVXBwZXJDYXNlKSxuZXcgZChcIm1pbWVcIiwhMCxcImltYWdlL3BuZ1wiKSxuZXcgZChcInBhZGRpbmdcIiwhMCxudWxsLG0uYWJzKSxuZXcgZChcInNpemVcIiwhMCwxMDAsbS5hYnMpLG5ldyBkKFwidmFsdWVcIiwhMCxcIlwiKV0pLGllPW5ldyBpMCxyZT1ZZS5leHRlbmQoZnVuY3Rpb24odCl7Zy5pbml0KHQsdGhpcyx0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTt2YXIgZT1nLmdldChcImVsZW1lbnRcIix0aGlzKSxpPWllLmdldFNlcnZpY2UoXCJlbGVtZW50XCIpLHI9ZSYmaS5pc0NhbnZhcyhlKT9lOmkuY3JlYXRlQ2FudmFzKCkseD1lJiZpLmlzSW1hZ2UoZSk/ZTppLmNyZWF0ZUltYWdlKCk7dGhpcy5fY2FudmFzUmVuZGVyZXI9bmV3IFplKHRoaXMsciwhMCksdGhpcy5faW1hZ2VSZW5kZXJlcj1uZXcgZTAodGhpcyx4LHg9PT1lKSx0aGlzLnVwZGF0ZSgpfSx7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGcuZ2V0QWxsKHRoaXMpfSxzZXQ6ZnVuY3Rpb24odCl7Zy5zZXRBbGwodCx0aGlzKSYmdGhpcy51cGRhdGUoKX0sdG9EYXRhVVJMOmZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmNhbnZhcy50b0RhdGFVUkwodHx8dGhpcy5taW1lKX0sdXBkYXRlOmZ1bmN0aW9uKCl7dmFyIHQ9bmV3ICRlKHtsZXZlbDp0aGlzLmxldmVsLHZhbHVlOnRoaXMudmFsdWV9KTt0aGlzLl9jYW52YXNSZW5kZXJlci5yZW5kZXIodCksdGhpcy5faW1hZ2VSZW5kZXJlci5yZW5kZXIodCl9fSx7dXNlOmZ1bmN0aW9uKHQpe2llLnNldFNlcnZpY2UodC5nZXROYW1lKCksdCl9fSk7T2JqZWN0LmRlZmluZVByb3BlcnRpZXMocmUucHJvdG90eXBlLHtjYW52YXM6e2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9jYW52YXNSZW5kZXJlci5nZXRFbGVtZW50KCl9fSxpbWFnZTp7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2ltYWdlUmVuZGVyZXIuZ2V0RWxlbWVudCgpfX19KTt4ZS5leHBvcnRzPXJlfSk7dmFyIG5lPW8oKE8wLGFlKT0+e1widXNlIHN0cmljdFwiO2FlLmV4cG9ydHM9c2UoKX0pO3ZhciBvZT1vKChOMCxmZSk9PntcInVzZSBzdHJpY3RcIjt2YXIgcjA9dSgpLHgwPXIwLmV4dGVuZCh7Z2V0TmFtZTpmdW5jdGlvbigpe319KTtmZS5leHBvcnRzPXgwfSk7dmFyIHVlPW8oKHkwLGNlKT0+e1widXNlIHN0cmljdFwiO3ZhciBzMD1vZSgpLGEwPXMwLmV4dGVuZCh7Y3JlYXRlQ2FudmFzOmZ1bmN0aW9uKCl7fSxjcmVhdGVJbWFnZTpmdW5jdGlvbigpe30sZ2V0TmFtZTpmdW5jdGlvbigpe3JldHVyblwiZWxlbWVudFwifSxpc0NhbnZhczpmdW5jdGlvbih0KXt9LGlzSW1hZ2U6ZnVuY3Rpb24odCl7fX0pO2NlLmV4cG9ydHM9YTB9KTt2YXIgbGU9TihuZSgpLDEpO3ZhciBoZT1OKHVlKCksMSksbjA9aGUuZGVmYXVsdC5leHRlbmQoe2NyZWF0ZUNhbnZhczpmdW5jdGlvbigpe3JldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpfSxjcmVhdGVJbWFnZTpmdW5jdGlvbigpe3JldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpfSxpc0NhbnZhczpmdW5jdGlvbih0KXtyZXR1cm4gdCBpbnN0YW5jZW9mIEhUTUxDYW52YXNFbGVtZW50fSxpc0ltYWdlOmZ1bmN0aW9uKHQpe3JldHVybiB0IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudH19KSxkZT1uMDt2YXIgZjA9bGUuZGVmYXVsdDtmMC51c2UobmV3IGRlKTtleHBvcnR7ZjAgYXMgUVJpb3VzfTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7OztBQUNBOzs7QUNDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFTQTs7O0FDWEE7QUFDQTtBQUNBO0FBRUE7QUF5R0E7QUFDQTtBQXRGQSxJQUFNLGlCQUFpQixjQUNyQixvQkFBQyxRQUFEO0FBQUEsRUFBTSxHQUFFO0FBQUEsSUFDUjtBQUdGLElBQU0sUUFBUSxjQUNaLG9CQUFDLFFBQUQ7QUFBQSxFQUNFLEtBQUk7QUFBQSxFQUNKLEdBQUU7QUFBQSxJQUVKO0FBR0YsSUFBTSxXQUF1QyxDQUFDLEVBQUUsU0FBUyxlQUN2RCxvQkFBQyxRQUFEO0FBQUEsRUFBUSxTQUFRO0FBQUEsRUFBWSxPQUFNO0FBQUEsRUFBVTtBQUFBLEdBQ3pDO0FBSUwsSUFBTSxRQUFRLGNBQ1osb0JBQUMsUUFBRDtBQUFBLEVBQ0UsS0FBSTtBQUFBLEVBQ0osR0FBRTtBQUFBLElBRUo7QUFnQkYsSUFBTSxTQUFTLGNBQ2Isb0JBQUMsUUFBRDtBQUFBLEVBQ0UsS0FBSTtBQUFBLEVBQ0osR0FBRTtBQUFBLElBRUo7QUFHRixJQUFNLEtBQUssY0FDVCxvQkFBQyxRQUFEO0FBQUEsRUFDRSxLQUFJO0FBQUEsRUFDSixHQUFFO0FBQUEsSUFFSjtBQUdGLElBQU0sUUFBcUMsQ0FBQyxFQUFFLFNBQVMsZUFDckQsb0JBQUMsS0FBRDtBQUFBLEVBQ0UsU0FBUTtBQUFBLEVBQ1IsT0FBTTtBQUFBLEVBQ047QUFBQSxHQUVDO0FBSUwsSUFBTSxTQUFTLGNBQ2Isb0JBQUMsUUFBRDtBQUFBLEVBQ0UsS0FBSTtBQUFBLEVBQ0osR0FBRTtBQUFBLElBRUo7OztBQzlGRjtBQUNBO0FBQ0E7OztBQ0pBLElBQUksS0FBRyxPQUFPO0FBQU8sSUFBSSxJQUFFLE9BQU87QUFBZSxJQUFJLEtBQUcsT0FBTztBQUF5QixJQUFJLEtBQUcsT0FBTztBQUFvQixJQUFJLEtBQUcsT0FBTztBQUFkLElBQTZCLEtBQUcsT0FBTyxVQUFVO0FBQWUsSUFBSSxLQUFHLE9BQUcsRUFBRSxHQUFFLGNBQWEsRUFBQyxPQUFNO0FBQUssSUFBSSxJQUFFLENBQUMsR0FBRSxNQUFJLE1BQUssTUFBRyxFQUFHLEtBQUUsRUFBQyxTQUFRLE1BQUssU0FBUSxJQUFHLEVBQUU7QUFBUyxJQUFJLEtBQUcsQ0FBQyxHQUFFLEdBQUUsR0FBRSxNQUFJO0FBQUMsTUFBRyxLQUFHLE9BQU8sS0FBRyxZQUFVLE9BQU8sS0FBRztBQUFXLGFBQVEsS0FBSyxHQUFHO0FBQUcsT0FBQyxHQUFHLEtBQUssR0FBRSxNQUFLLE1BQUcsTUFBSSxjQUFZLEVBQUUsR0FBRSxHQUFFLEVBQUMsS0FBSSxNQUFJLEVBQUUsSUFBRyxZQUFXLENBQUUsS0FBRSxHQUFHLEdBQUUsT0FBSyxFQUFFO0FBQWEsU0FBTztBQUFBO0FBQTNMLElBQThMLElBQUUsQ0FBQyxHQUFFLE1BQUksR0FBRyxHQUFHLEVBQUUsS0FBRyxPQUFLLEdBQUcsR0FBRyxNQUFJLElBQUcsV0FBVSxDQUFDLEtBQUcsS0FBRyxFQUFFLGFBQVcsRUFBQyxLQUFJLE1BQUksRUFBRSxTQUFRLFlBQVcsU0FBSSxFQUFDLE9BQU0sR0FBRSxZQUFXLFVBQU07QUFBRyxJQUFJLElBQUUsRUFBRSxDQUFDLElBQUcsTUFBSTtBQUFDO0FBQWEsTUFBSSxJQUFFLFdBQVU7QUFBQSxLQUFHLEtBQUcsT0FBTyxVQUFVLGdCQUFlLEtBQUcsTUFBTSxVQUFVO0FBQU0sY0FBWSxHQUFFLEdBQUU7QUFBQyxRQUFJO0FBQUUsV0FBTyxPQUFPLE9BQU8sVUFBUSxhQUFXLElBQUUsT0FBTyxPQUFPLEtBQUksR0FBRSxZQUFVLEdBQUUsSUFBRSxJQUFJLEtBQUUsRUFBRSxZQUFVLE9BQU0sS0FBRyxFQUFFLE1BQUcsR0FBRSxJQUFHO0FBQUE7QUFBRSxjQUFZLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxRQUFJLElBQUU7QUFBSyxXQUFPLE9BQU8sS0FBRyxZQUFXLEtBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsT0FBTSxPQUFPLEtBQUcsY0FBYSxLQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsV0FBVTtBQUFDLGFBQU8sRUFBRSxNQUFNLE1BQUs7QUFBQSxRQUFhLEVBQUUsT0FBRyxHQUFFLEdBQUUsSUFBRyxFQUFFLFlBQVUsR0FBRyxFQUFFLFdBQVUsSUFBRyxFQUFFLFVBQVUsY0FBWSxHQUFFLEVBQUUsU0FBTyxLQUFHLEVBQUUsUUFBTyxFQUFFLFNBQU8sR0FBRTtBQUFBO0FBQUUsYUFBVyxHQUFFLEdBQUUsR0FBRTtBQUFDLFFBQUUsR0FBRyxLQUFLLFdBQVU7QUFBRyxhQUFRLEdBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sSUFBRSxHQUFFLEtBQUk7QUFBQyxVQUFFLEVBQUU7QUFBRyxXQUFJLEtBQUs7QUFBRSxRQUFDLEVBQUMsS0FBRyxHQUFHLEtBQUssR0FBRSxPQUFNLEdBQUUsS0FBRyxFQUFFO0FBQUE7QUFBQTtBQUFLLElBQUUsVUFBUTtBQUFBO0FBQUssSUFBSSxJQUFFLEVBQUUsQ0FBQyxJQUFHLE1BQUk7QUFBQztBQUFhLE1BQUksS0FBRztBQUFJLGVBQVk7QUFBQTtBQUFFLElBQUUsU0FBTztBQUFRLElBQUUsU0FBTztBQUFPLElBQUUsU0FBTztBQUFHLElBQUUsVUFBUTtBQUFBO0FBQUksSUFBSSxJQUFFLEVBQUUsQ0FBQyxJQUFHLE1BQUk7QUFBQztBQUFhLElBQUUsVUFBUTtBQUFBO0FBQU0sSUFBSSxJQUFFLEVBQUUsQ0FBQyxJQUFHLE1BQUk7QUFBQztBQUFhLE1BQUksS0FBRyxLQUFJLEtBQUcsR0FBRyxPQUFPLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQyxTQUFLLFNBQU8sR0FBRSxLQUFLLFVBQVEsR0FBRSxLQUFLLFFBQVEsU0FBTyxHQUFFLEtBQUssVUFBUSxRQUFRO0FBQUEsS0FBSSxFQUFDLE1BQUssU0FBUyxHQUFFO0FBQUEsS0FBRyxZQUFXLFdBQVU7QUFBQyxXQUFPLEtBQUssV0FBVSxNQUFLLFVBQVEsTUFBRyxLQUFLLFdBQVUsS0FBSztBQUFBLEtBQVMsZUFBYyxTQUFTLEdBQUU7QUFBQyxRQUFJLElBQUUsS0FBSyxRQUFPLElBQUUsRUFBRSxXQUFTLEdBQUUsSUFBRSxLQUFLLE1BQU8sR0FBRSxPQUFLLElBQUUsS0FBRyxFQUFFO0FBQU8sV0FBTyxLQUFLLElBQUksR0FBRTtBQUFBLEtBQUksV0FBVSxTQUFTLEdBQUU7QUFBQyxRQUFJLElBQUUsS0FBSyxRQUFPLElBQUUsRUFBRTtBQUFRLFFBQUcsS0FBRztBQUFLLGFBQU87QUFBRSxRQUFJLElBQUUsS0FBSyxjQUFjLElBQUcsSUFBRSxLQUFLLE1BQU8sR0FBRSxPQUFLLElBQUUsRUFBRSxTQUFPO0FBQUcsV0FBTyxLQUFLLElBQUksR0FBRTtBQUFBLEtBQUksUUFBTyxTQUFTLEdBQUU7QUFBQyxTQUFLLFdBQVUsTUFBSyxVQUFTLEtBQUssU0FBUSxLQUFLLEtBQUs7QUFBQSxLQUFLLE9BQU0sV0FBVTtBQUFBLEtBQUcsUUFBTyxXQUFVO0FBQUE7QUFBSyxJQUFFLFVBQVE7QUFBQTtBQUFLLElBQUksSUFBRSxFQUFFLENBQUMsSUFBRyxNQUFJO0FBQUM7QUFBYSxNQUFJLEtBQUcsS0FBSSxLQUFHLEdBQUcsT0FBTyxFQUFDLE1BQUssU0FBUyxHQUFFO0FBQUMsUUFBSSxHQUFFLEdBQUUsSUFBRSxLQUFLLFFBQU8sSUFBRSxLQUFLLGNBQWMsSUFBRyxJQUFFLEtBQUssVUFBVSxJQUFHLElBQUUsS0FBSyxRQUFRLFdBQVc7QUFBTSxTQUFJLEVBQUUsWUFBVSxFQUFFLFlBQVcsRUFBRSxjQUFZLEVBQUUsaUJBQWdCLElBQUUsR0FBRSxJQUFFLEVBQUUsT0FBTTtBQUFJLFdBQUksSUFBRSxHQUFFLElBQUUsRUFBRSxPQUFNO0FBQUksVUFBRSxPQUFPLElBQUUsRUFBRSxRQUFNLE1BQUksRUFBRSxTQUFTLElBQUUsSUFBRSxHQUFFLElBQUUsSUFBRSxHQUFFLEdBQUU7QUFBQSxLQUFJLE9BQU0sV0FBVTtBQUFDLFFBQUksSUFBRSxLQUFLLFFBQU8sSUFBRSxLQUFLLFFBQVEsV0FBVyxPQUFNLElBQUUsRUFBRTtBQUFLLE1BQUUsWUFBVSxHQUFFLEVBQUUsVUFBVSxHQUFFLEdBQUUsR0FBRSxJQUFHLEVBQUUsWUFBVSxFQUFFLFlBQVcsRUFBRSxjQUFZLEVBQUUsaUJBQWdCLEVBQUUsU0FBUyxHQUFFLEdBQUUsR0FBRTtBQUFBLEtBQUksUUFBTyxXQUFVO0FBQUMsUUFBSSxJQUFFLEtBQUs7QUFBUSxNQUFFLFFBQU0sRUFBRSxTQUFPLEtBQUssT0FBTztBQUFBO0FBQVEsSUFBRSxVQUFRO0FBQUE7QUFBSyxJQUFJLElBQUUsRUFBRSxDQUFDLElBQUcsTUFBSTtBQUFDO0FBQWEsTUFBSSxLQUFHLEtBQUksS0FBRyxHQUFHLE9BQU8sTUFBSyxFQUFDLE9BQU0sQ0FBQyxHQUFFLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHO0FBQU0sSUFBRSxVQUFRO0FBQUE7QUFBSyxJQUFJLElBQUUsRUFBRSxDQUFDLElBQUcsTUFBSTtBQUFDO0FBQWEsTUFBSSxLQUFHLEtBQUksS0FBRyxHQUFHLE9BQU8sTUFBSyxFQUFDLFFBQU8sQ0FBQyxHQUFFLEdBQUUsSUFBRyxHQUFFLEdBQUUsR0FBRSxJQUFHLElBQUcsR0FBRSxHQUFFLElBQUcsSUFBRyxHQUFFLEdBQUUsR0FBRSxJQUFHLEdBQUUsR0FBRSxJQUFHLElBQUcsR0FBRSxHQUFFLElBQUcsSUFBRyxHQUFFLEdBQUUsSUFBRyxJQUFHLEdBQUUsR0FBRSxJQUFHLElBQUcsR0FBRSxHQUFFLElBQUcsSUFBRyxHQUFFLEdBQUUsSUFBRyxJQUFHLEdBQUUsR0FBRSxJQUFHLElBQUcsR0FBRSxHQUFFLElBQUcsSUFBRyxHQUFFLEdBQUUsSUFBRyxJQUFHLEdBQUUsR0FBRSxJQUFHLElBQUcsR0FBRSxHQUFFLElBQUcsSUFBRyxHQUFFLEdBQUUsR0FBRSxJQUFHLEdBQUUsR0FBRSxLQUFJLElBQUcsR0FBRSxHQUFFLElBQUcsSUFBRyxHQUFFLEdBQUUsSUFBRyxJQUFHLEdBQUUsR0FBRSxJQUFHLElBQUcsR0FBRSxHQUFFLElBQUcsSUFBRyxHQUFFLEdBQUUsSUFBRyxJQUFHLEdBQUUsR0FBRSxJQUFHLElBQUcsR0FBRSxHQUFFLElBQUcsSUFBRyxHQUFFLEdBQUUsSUFBRyxJQUFHLEdBQUUsR0FBRSxJQUFHLElBQUcsR0FBRSxHQUFFLElBQUcsSUFBRyxHQUFFLEdBQUUsSUFBRyxJQUFHLEdBQUUsR0FBRSxJQUFHLElBQUcsR0FBRSxHQUFFLElBQUcsSUFBRyxHQUFFLEdBQUUsSUFBRyxJQUFHLEdBQUUsR0FBRSxJQUFHLElBQUcsR0FBRSxHQUFFLEtBQUksSUFBRyxHQUFFLEdBQUUsSUFBRyxJQUFHLEdBQUUsR0FBRSxJQUFHLElBQUcsR0FBRSxHQUFFLElBQUcsSUFBRyxHQUFFLEdBQUUsSUFBRyxJQUFHLEdBQUUsR0FBRSxJQUFHLElBQUcsR0FBRSxHQUFFLElBQUcsSUFBRyxHQUFFLEdBQUUsSUFBRyxJQUFHLEdBQUUsR0FBRSxJQUFHLElBQUcsR0FBRSxHQUFFLElBQUcsSUFBRyxHQUFFLEdBQUUsSUFBRyxJQUFHLEdBQUUsR0FBRSxJQUFHLElBQUcsR0FBRSxHQUFFLElBQUcsSUFBRyxHQUFFLEdBQUUsSUFBRyxJQUFHLEdBQUUsR0FBRSxJQUFHLElBQUcsR0FBRSxHQUFFLElBQUcsSUFBRyxHQUFFLEdBQUUsS0FBSSxJQUFHLEdBQUUsR0FBRSxJQUFHLElBQUcsR0FBRSxHQUFFLElBQUcsSUFBRyxJQUFHLEdBQUUsSUFBRyxJQUFHLEdBQUUsR0FBRSxLQUFJLElBQUcsR0FBRSxHQUFFLElBQUcsSUFBRyxJQUFHLEdBQUUsSUFBRyxJQUFHLElBQUcsR0FBRSxJQUFHLElBQUcsR0FBRSxHQUFFLElBQUcsSUFBRyxHQUFFLEdBQUUsSUFBRyxJQUFHLEdBQUUsR0FBRSxJQUFHLElBQUcsSUFBRyxHQUFFLElBQUcsSUFBRyxHQUFFLEdBQUUsSUFBRyxJQUFHLEdBQUUsR0FBRSxJQUFHLElBQUcsSUFBRyxHQUFFLElBQUcsSUFBRyxHQUFFLElBQUcsSUFBRyxJQUFHLEdBQUUsR0FBRSxLQUFJLElBQUcsSUFBRyxHQUFFLElBQUcsSUFBRyxHQUFFLElBQUcsSUFBRyxJQUFHLEdBQUUsSUFBRyxJQUFHLElBQUcsR0FBRSxHQUFFLEtBQUksSUFBRyxHQUFFLEdBQUUsSUFBRyxJQUFHLElBQUcsR0FBRSxJQUFHLElBQUcsR0FBRSxJQUFHLElBQUcsSUFBRyxHQUFFLEdBQUUsS0FBSSxJQUFHLEdBQUUsSUFBRyxJQUFHLElBQUcsSUFBRyxHQUFFLElBQUcsSUFBRyxHQUFFLElBQUcsSUFBRyxJQUFHLEdBQUUsR0FBRSxLQUFJLElBQUcsR0FBRSxJQUFHLElBQUcsSUFBRyxJQUFHLEdBQUUsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsR0FBRSxHQUFFLEtBQUksSUFBRyxJQUFHLEdBQUUsSUFBRyxJQUFHLElBQUcsR0FBRSxJQUFHLElBQUcsSUFBRyxHQUFFLElBQUcsSUFBRyxHQUFFLEdBQUUsS0FBSSxJQUFHLElBQUcsR0FBRSxJQUFHLElBQUcsR0FBRSxJQUFHLElBQUcsSUFBRyxJQUFHLEdBQUUsSUFBRyxJQUFHLEdBQUUsR0FBRSxLQUFJLElBQUcsR0FBRSxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsR0FBRSxHQUFFLEtBQUksSUFBRyxHQUFFLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxHQUFFLElBQUcsSUFBRyxHQUFFLEdBQUUsS0FBSSxJQUFHLEdBQUUsSUFBRyxJQUFHLElBQUcsR0FBRSxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsR0FBRSxLQUFJLElBQUcsSUFBRyxHQUFFLElBQUcsSUFBRyxJQUFHLEdBQUUsSUFBRyxJQUFHLElBQUcsR0FBRSxJQUFHLElBQUcsR0FBRSxHQUFFLEtBQUksSUFBRyxJQUFHLEdBQUUsSUFBRyxJQUFHLEdBQUUsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxHQUFFLElBQUcsS0FBSSxJQUFHLEdBQUUsSUFBRyxJQUFHLElBQUcsR0FBRSxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLEdBQUUsR0FBRSxLQUFJLElBQUcsSUFBRyxHQUFFLElBQUcsSUFBRyxHQUFFLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsR0FBRSxJQUFHLEtBQUksSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLEdBQUUsS0FBSSxJQUFHLEdBQUUsSUFBRyxJQUFHLElBQUcsSUFBRyxHQUFFLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsR0FBRSxLQUFJLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxHQUFFLEtBQUksSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLEdBQUUsS0FBSSxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxHQUFFLElBQUcsSUFBRyxJQUFHLEdBQUUsSUFBRyxJQUFHLElBQUcsR0FBRSxLQUFJLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsR0FBRSxJQUFHLEtBQUksSUFBRyxHQUFFLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsR0FBRSxJQUFHLElBQUcsSUFBRyxJQUFHLEdBQUUsS0FBSSxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLEdBQUUsSUFBRyxLQUFJLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxHQUFFLEtBQUksSUFBRyxJQUFHLEdBQUUsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLEdBQUUsS0FBSSxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxLQUFJLGNBQWEsQ0FBQyxPQUFNLE9BQU0sT0FBTSxPQUFNLE9BQU0sT0FBTSxPQUFNLE9BQU0sT0FBTSxPQUFNLE9BQU0sT0FBTSxPQUFNLE9BQU0sT0FBTSxPQUFNLE9BQU0sT0FBTSxPQUFNLE9BQU0sTUFBSyxNQUFLLE9BQU0sT0FBTSxNQUFLLE1BQUssTUFBSyxNQUFLLE1BQUssS0FBSSxNQUFLLE9BQU0sUUFBTyxFQUFDLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBSyxJQUFFLFVBQVE7QUFBQTtBQUFLLElBQUksSUFBRSxFQUFFLENBQUMsSUFBRyxNQUFJO0FBQUM7QUFBYSxNQUFJLEtBQUcsS0FBSSxLQUFHLEdBQUcsT0FBTyxNQUFLLEVBQUMsVUFBUyxDQUFDLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRyxJQUFHLElBQUcsS0FBSSxJQUFHLElBQUcsS0FBSSxLQUFJLEtBQUksS0FBSSxJQUFHLElBQUcsSUFBRyxLQUFJLElBQUcsSUFBRyxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksR0FBRSxHQUFFLElBQUcsSUFBRyxJQUFHLElBQUcsS0FBSSxLQUFJLElBQUcsSUFBRyxLQUFJLElBQUcsSUFBRyxLQUFJLElBQUcsS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxJQUFHLElBQUcsS0FBSSxHQUFFLElBQUcsSUFBRyxJQUFHLElBQUcsS0FBSSxJQUFHLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksSUFBRyxLQUFJLElBQUcsS0FBSSxLQUFJLElBQUcsSUFBRyxLQUFJLEtBQUksS0FBSSxLQUFJLElBQUcsSUFBRyxJQUFHLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxJQUFHLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxJQUFHLEtBQUksSUFBRyxJQUFHLElBQUcsS0FBSSxJQUFHLElBQUcsSUFBRyxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxJQUFHLElBQUcsS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLElBQUcsS0FBSSxLQUFJLEtBQUksS0FBSSxJQUFHLEtBQUksS0FBSSxLQUFJLElBQUcsSUFBRyxJQUFHLEtBQUksS0FBSSxLQUFJLEtBQUksSUFBRyxLQUFJLElBQUcsSUFBRyxLQUFJLElBQUcsSUFBRyxJQUFHLEtBQUksSUFBRyxLQUFJLElBQUcsSUFBRyxLQUFJLElBQUcsS0FBSSxJQUFHLEtBQUksSUFBRyxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksSUFBRyxLQUFJLEtBQUksSUFBRyxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxJQUFHLEtBQUksSUFBRyxJQUFHLEtBQUksS0FBSSxJQUFHLEtBQUksS0FBSSxLQUFJLElBQUcsS0FBSSxJQUFHLEtBQUksSUFBRyxJQUFHLEtBQUksS0FBSSxLQUFJLEdBQUUsSUFBRyxJQUFHLElBQUcsS0FBSSxLQUFJLEtBQUksS0FBSSxJQUFHLEtBQUksSUFBRyxLQUFJLElBQUcsS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxJQUFHLElBQUcsS0FBSSxJQUFHLEtBQUksR0FBRSxJQUFHLElBQUcsSUFBRyxLQUFJLElBQUcsS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksSUFBRyxJQUFHLElBQUcsSUFBRyxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxJQUFHLElBQUcsS0FBSSxLQUFJLEtBQUksSUFBRyxLQUFJLElBQUcsS0FBSSxDQUFDLEtBQUksR0FBRSxHQUFFLElBQUcsR0FBRSxJQUFHLElBQUcsS0FBSSxHQUFFLEtBQUksSUFBRyxLQUFJLElBQUcsS0FBSSxLQUFJLElBQUcsR0FBRSxLQUFJLEtBQUksSUFBRyxJQUFHLEtBQUksS0FBSSxLQUFJLElBQUcsS0FBSSxLQUFJLEtBQUksS0FBSSxHQUFFLElBQUcsS0FBSSxHQUFFLEtBQUksS0FBSSxJQUFHLEtBQUksSUFBRyxJQUFHLElBQUcsSUFBRyxLQUFJLEtBQUksS0FBSSxLQUFJLElBQUcsS0FBSSxJQUFHLElBQUcsS0FBSSxLQUFJLEtBQUksS0FBSSxJQUFHLEtBQUksS0FBSSxLQUFJLEtBQUksR0FBRSxLQUFJLElBQUcsS0FBSSxLQUFJLEtBQUksR0FBRSxLQUFJLEtBQUksSUFBRyxLQUFJLEtBQUksSUFBRyxLQUFJLEtBQUksS0FBSSxJQUFHLEtBQUksSUFBRyxLQUFJLElBQUcsS0FBSSxJQUFHLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLElBQUcsSUFBRyxLQUFJLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxLQUFJLEtBQUksS0FBSSxJQUFHLEtBQUksS0FBSSxLQUFJLElBQUcsSUFBRyxJQUFHLEtBQUksS0FBSSxLQUFJLElBQUcsS0FBSSxJQUFHLEtBQUksS0FBSSxJQUFHLElBQUcsS0FBSSxJQUFHLElBQUcsS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksSUFBRyxHQUFFLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxJQUFHLElBQUcsS0FBSSxJQUFHLEtBQUksS0FBSSxJQUFHLEtBQUksS0FBSSxJQUFHLEtBQUksS0FBSSxLQUFJLEtBQUksSUFBRyxLQUFJLEtBQUksS0FBSSxJQUFHLElBQUcsS0FBSSxLQUFJLElBQUcsSUFBRyxLQUFJLElBQUcsSUFBRyxJQUFHLEtBQUksSUFBRyxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksSUFBRyxLQUFJLElBQUcsS0FBSSxLQUFJLElBQUcsSUFBRyxJQUFHLEtBQUksS0FBSSxJQUFHLElBQUcsSUFBRyxJQUFHLEtBQUksSUFBRyxLQUFJLElBQUcsSUFBRyxJQUFHLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLElBQUcsSUFBRyxLQUFJLEtBQUksSUFBRyxLQUFJLEtBQUksS0FBSSxLQUFJLElBQUcsSUFBRyxJQUFHLEtBQUksSUFBRyxLQUFJLEtBQUksSUFBRyxLQUFJLEtBQUksS0FBSSxLQUFJLElBQUcsSUFBRyxLQUFJLElBQUcsSUFBRyxLQUFJLEtBQUksS0FBSSxLQUFJLElBQUcsSUFBRyxLQUFJLElBQUcsS0FBSSxLQUFJLEtBQUksSUFBRyxLQUFJLElBQUcsS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksSUFBRyxJQUFHO0FBQU8sSUFBRSxVQUFRO0FBQUE7QUFBSyxJQUFJLElBQUUsRUFBRSxDQUFDLElBQUcsTUFBSTtBQUFDO0FBQWEsTUFBSSxLQUFHLEtBQUksS0FBRyxHQUFHLE9BQU8sTUFBSyxFQUFDLE9BQU0sQ0FBQyxNQUFLLE1BQUssTUFBSyxNQUFLLE1BQUssTUFBSyxNQUFLLE1BQUssTUFBSyxNQUFLLE1BQUssTUFBSyxNQUFLLE1BQUssTUFBSyxNQUFLLE1BQUssTUFBSyxLQUFJLE1BQUssS0FBSSxNQUFLLEtBQUksTUFBSyxLQUFJLE1BQUssTUFBSyxNQUFLLE1BQUssTUFBSyxNQUFLLE1BQUssTUFBSztBQUFRLElBQUUsVUFBUTtBQUFBO0FBQUssSUFBSSxJQUFFLEVBQUUsQ0FBQyxJQUFHLE1BQUk7QUFBQztBQUFhLE1BQUksS0FBRyxLQUFJLEtBQUcsS0FBSSxJQUFFLEtBQUksSUFBRSxLQUFJLEtBQUcsS0FBSSxJQUFFLEdBQUcsT0FBTyxTQUFTLEdBQUU7QUFBQyxRQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFFLEVBQUUsTUFBTTtBQUFPLFNBQUksS0FBSyxXQUFTLElBQUcsS0FBSyxTQUFPLEVBQUUsT0FBTyxFQUFFLFFBQU8sS0FBSyxjQUFZLElBQUcsS0FBSyxTQUFPLEVBQUUsT0FBTSxLQUFLLFdBQVMsR0FBRSxLQUFLLGdCQUFjLElBQUcsS0FBSyxXQUFTLE1BQUssTUFBSyxZQUFXLElBQUcsTUFBSyxTQUFPLEtBQUcsSUFBRyxNQUFLLFdBQVMsS0FBRyxJQUFHLElBQUUsRUFBRSxPQUFPLE1BQUssSUFBRSxFQUFFLE9BQU8sTUFBSyxJQUFFLEVBQUUsT0FBTyxNQUFLLElBQUUsRUFBRSxPQUFPLElBQUcsSUFBRSxJQUFHLEtBQUUsS0FBRyxJQUFFLElBQUcsTUFBSyxZQUFVLElBQUcsQ0FBRSxNQUFHO0FBQUs7QUFBQyxTQUFLLGFBQVcsR0FBRSxLQUFLLFlBQVUsR0FBRSxLQUFLLGNBQVksR0FBRSxLQUFLLGNBQVk7QUFBRSxRQUFJLElBQUUsS0FBSyxRQUFNLEtBQUcsSUFBRSxLQUFLO0FBQVMsU0FBSyxTQUFPLEVBQUUsYUFBYSxJQUFFLElBQUcsS0FBSyxPQUFLLEVBQUUsYUFBYSxJQUFHLEtBQUUsS0FBSSxLQUFFLEtBQUcsSUFBRyxLQUFLLFFBQU0sRUFBRSxhQUFjLEtBQUcsS0FBRSxLQUFHLEtBQUcsSUFBRyxLQUFLLGtCQUFpQixLQUFLLHFCQUFvQixLQUFLLE9BQU8sSUFBRSxJQUFHLEtBQUUsTUFBSSxHQUFFLEtBQUssb0JBQW1CLEtBQUssZ0JBQWUsS0FBSyw2QkFBNEIsS0FBSyxrQkFBaUIsS0FBSyxhQUFZLEtBQUssa0JBQWtCLElBQUcsS0FBSyx3QkFBdUIsS0FBSyxvQkFBbUIsS0FBSyxxQkFBb0IsS0FBSyxTQUFRLEtBQUs7QUFBQSxLQUFXLEVBQUMsZUFBYyxTQUFTLEdBQUUsR0FBRTtBQUFDLFFBQUksR0FBRSxJQUFFLEtBQUssUUFBTyxJQUFFLEtBQUs7QUFBTSxTQUFJLEVBQUUsSUFBRSxJQUFFLEtBQUcsR0FBRSxJQUFFLElBQUcsSUFBRSxHQUFFO0FBQUksUUFBRSxJQUFFLElBQUUsSUFBRyxLQUFFLE1BQUksR0FBRSxFQUFFLElBQUUsSUFBRSxJQUFHLEtBQUUsSUFBRSxNQUFJLEdBQUUsRUFBRSxJQUFFLElBQUUsSUFBRyxLQUFFLE1BQUksR0FBRSxFQUFFLElBQUUsSUFBRSxJQUFFLElBQUcsS0FBRSxNQUFJO0FBQUUsU0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFO0FBQUksV0FBSyxTQUFTLElBQUUsR0FBRSxJQUFFLElBQUcsS0FBSyxTQUFTLElBQUUsR0FBRSxJQUFFLElBQUcsS0FBSyxTQUFTLElBQUUsR0FBRSxJQUFFLElBQUcsS0FBSyxTQUFTLElBQUUsR0FBRSxJQUFFO0FBQUEsS0FBSSxhQUFZLFNBQVMsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLFFBQUksR0FBRSxHQUFFLEdBQUUsSUFBRSxLQUFLLGFBQVksSUFBRSxLQUFLO0FBQWMsU0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFO0FBQUksUUFBRSxJQUFFLEtBQUc7QUFBRSxTQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSTtBQUFDLFVBQUcsSUFBRSxFQUFFLElBQUksRUFBRSxJQUFFLEtBQUcsRUFBRSxLQUFJLE1BQUk7QUFBSSxhQUFJLElBQUUsR0FBRSxJQUFFLEdBQUU7QUFBSSxZQUFFLElBQUUsSUFBRSxLQUFHLEVBQUUsSUFBRSxLQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sSUFBRSxFQUFFLElBQUU7QUFBQTtBQUFVLGFBQUksSUFBRSxHQUFFLElBQUUsSUFBRSxHQUFFO0FBQUksWUFBRSxLQUFHLEVBQUUsSUFBRTtBQUFHLFFBQUUsSUFBRSxJQUFFLEtBQUcsTUFBSSxNQUFJLElBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxJQUFFLEVBQUU7QUFBQTtBQUFBLEtBQU8sa0JBQWlCLFdBQVU7QUFBQyxRQUFJLEdBQUUsSUFBRSxHQUFFLElBQUUsS0FBSyxZQUFXLElBQUUsS0FBSyx1QkFBc0IsSUFBRSxLQUFLO0FBQVUsU0FBSSxJQUFFLEdBQUUsSUFBRSxLQUFLLGFBQVk7QUFBSSxXQUFLLFlBQVksR0FBRSxHQUFFLEdBQUUsSUFBRyxLQUFHLEdBQUUsS0FBRztBQUFFLFNBQUksSUFBRSxHQUFFLElBQUUsS0FBSyxhQUFZO0FBQUksV0FBSyxZQUFZLEdBQUUsSUFBRSxHQUFFLEdBQUUsSUFBRyxLQUFHLElBQUUsR0FBRSxLQUFHO0FBQUEsS0FBRyxZQUFXLFNBQVMsR0FBRTtBQUFDLFFBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFFLEtBQUssUUFBTyxJQUFFLEtBQUs7QUFBTSxZQUFPO0FBQUEsV0FBUTtBQUFFLGFBQUksSUFBRSxHQUFFLElBQUUsR0FBRTtBQUFJLGVBQUksSUFBRSxHQUFFLElBQUUsR0FBRTtBQUFJLGFBQUUsS0FBRSxJQUFFLE1BQUksQ0FBQyxLQUFLLFVBQVUsR0FBRSxNQUFLLEdBQUUsSUFBRSxJQUFFLE1BQUk7QUFBRztBQUFBLFdBQVc7QUFBRSxhQUFJLElBQUUsR0FBRSxJQUFFLEdBQUU7QUFBSSxlQUFJLElBQUUsR0FBRSxJQUFFLEdBQUU7QUFBSSxhQUFFLEtBQUUsTUFBSSxDQUFDLEtBQUssVUFBVSxHQUFFLE1BQUssR0FBRSxJQUFFLElBQUUsTUFBSTtBQUFHO0FBQUEsV0FBVztBQUFFLGFBQUksSUFBRSxHQUFFLElBQUUsR0FBRTtBQUFJLGVBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSTtBQUFJLGtCQUFJLEtBQUksS0FBRSxJQUFHLENBQUMsS0FBRyxDQUFDLEtBQUssVUFBVSxHQUFFLE1BQUssR0FBRSxJQUFFLElBQUUsTUFBSTtBQUFHO0FBQUEsV0FBVztBQUFFLGFBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSTtBQUFJLGVBQUksTUFBSSxLQUFJLEtBQUUsSUFBRyxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFJO0FBQUksa0JBQUksS0FBSSxLQUFFLElBQUcsQ0FBQyxLQUFHLENBQUMsS0FBSyxVQUFVLEdBQUUsTUFBSyxHQUFFLElBQUUsSUFBRSxNQUFJO0FBQUc7QUFBQSxXQUFXO0FBQUUsYUFBSSxJQUFFLEdBQUUsSUFBRSxHQUFFO0FBQUksZUFBSSxJQUFFLEdBQUUsSUFBRSxLQUFHLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUk7QUFBSSxrQkFBSSxLQUFJLEtBQUUsR0FBRSxJQUFFLENBQUMsSUFBRyxDQUFDLEtBQUcsQ0FBQyxLQUFLLFVBQVUsR0FBRSxNQUFLLEdBQUUsSUFBRSxJQUFFLE1BQUk7QUFBRztBQUFBLFdBQVc7QUFBRSxhQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUk7QUFBSSxlQUFJLE1BQUksS0FBSSxLQUFFLElBQUcsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSTtBQUFJLGtCQUFJLEtBQUksS0FBRSxJQUFHLENBQUcsTUFBRSxJQUFFLEtBQUcsQ0FBRSxFQUFDLElBQUUsQ0FBQyxPQUFLLENBQUMsS0FBSyxVQUFVLEdBQUUsTUFBSyxHQUFFLElBQUUsSUFBRSxNQUFJO0FBQUc7QUFBQSxXQUFXO0FBQUUsYUFBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFJO0FBQUksZUFBSSxNQUFJLEtBQUksS0FBRSxJQUFHLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUk7QUFBSSxrQkFBSSxLQUFJLEtBQUUsSUFBRyxDQUFHLE1BQUUsSUFBRSxLQUFJLE1BQUcsTUFBSSxLQUFHLE1BQUksQ0FBQyxLQUFLLFVBQVUsR0FBRSxNQUFLLEdBQUUsSUFBRSxJQUFFLE1BQUk7QUFBRztBQUFBLFdBQVc7QUFBRSxhQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUk7QUFBSSxlQUFJLE1BQUksS0FBSSxLQUFFLElBQUcsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSTtBQUFJLGtCQUFJLEtBQUksS0FBRSxJQUFHLENBQUcsT0FBRyxNQUFJLEtBQUksS0FBRSxJQUFFLEtBQUcsTUFBSSxDQUFDLEtBQUssVUFBVSxHQUFFLE1BQUssR0FBRSxJQUFFLElBQUUsTUFBSTtBQUFHO0FBQUE7QUFBQSxLQUFRLHFCQUFvQixXQUFVO0FBQUMsV0FBTyxLQUFLLGFBQVksTUFBSyxjQUFZLEtBQUssZUFBYSxLQUFLO0FBQUEsS0FBYSxzQkFBcUIsV0FBVTtBQUFDLFFBQUksR0FBRSxHQUFFLElBQUUsS0FBSyxXQUFVLElBQUUsS0FBSztBQUFZLFNBQUksRUFBRSxLQUFHLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFJO0FBQUMsV0FBSSxFQUFFLElBQUUsS0FBRyxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUU7QUFBSSxVQUFFLEtBQUcsRUFBRSxLQUFHLEVBQUUsSUFBRSxLQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBSSxNQUFJLEVBQUUsSUFBRTtBQUFHLFFBQUUsS0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQUk7QUFBQTtBQUFJLFNBQUksSUFBRSxHQUFFLEtBQUcsR0FBRTtBQUFJLFFBQUUsS0FBRyxFQUFFLElBQUksRUFBRTtBQUFBLEtBQUssZUFBYyxXQUFVO0FBQUMsUUFBSSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsS0FBSyxVQUFTLElBQUUsS0FBSyxRQUFPLElBQUUsS0FBSztBQUFNLFNBQUksSUFBRSxHQUFFLElBQUUsSUFBRSxHQUFFO0FBQUksV0FBSSxJQUFFLEdBQUUsSUFBRSxJQUFFLEdBQUU7QUFBSSxRQUFDLEdBQUUsSUFBRSxJQUFFLE1BQUksRUFBRSxJQUFFLElBQUUsSUFBRSxNQUFJLEVBQUUsSUFBRSxJQUFHLEtBQUUsT0FBSyxFQUFFLElBQUUsSUFBRSxJQUFHLEtBQUUsT0FBSyxDQUFFLEdBQUUsSUFBRSxJQUFFLE1BQUksRUFBRSxJQUFFLElBQUUsSUFBRSxNQUFJLEVBQUUsSUFBRSxJQUFHLEtBQUUsT0FBSyxFQUFFLElBQUUsSUFBRSxJQUFHLEtBQUUsU0FBUSxNQUFHLEVBQUU7QUFBSSxRQUFJLElBQUU7QUFBRSxTQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSTtBQUFDLFdBQUksSUFBRSxHQUFFLEVBQUUsS0FBRyxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFO0FBQUksWUFBRSxFQUFFLElBQUUsSUFBRSxJQUFHLE1BQUksSUFBRSxFQUFFLE9BQUssRUFBRSxFQUFFLEtBQUcsR0FBRSxJQUFFLEdBQUUsS0FBRyxJQUFFLElBQUU7QUFBRyxXQUFHLEtBQUssWUFBWTtBQUFBO0FBQUcsUUFBRSxLQUFJLEtBQUUsQ0FBQztBQUFHLFFBQUksSUFBRSxHQUFFLElBQUU7QUFBRSxTQUFJLEtBQUcsS0FBRyxHQUFFLE1BQUksR0FBRSxJQUFFLElBQUU7QUFBRyxXQUFHLElBQUUsR0FBRTtBQUFJLFNBQUksS0FBRyxJQUFFLEVBQUUsSUFBRyxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUk7QUFBQyxXQUFJLElBQUUsR0FBRSxFQUFFLEtBQUcsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRTtBQUFJLFlBQUUsRUFBRSxJQUFFLElBQUUsSUFBRyxNQUFJLElBQUUsRUFBRSxPQUFLLEVBQUUsRUFBRSxLQUFHLEdBQUUsSUFBRTtBQUFFLFdBQUcsS0FBSyxZQUFZO0FBQUE7QUFBRyxXQUFPO0FBQUEsS0FBRyxtQkFBa0IsU0FBUyxHQUFFO0FBQUMsUUFBSSxHQUFFLEdBQUUsSUFBRSxLQUFLLE1BQUssSUFBRSxLQUFLO0FBQVMsU0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFO0FBQUksUUFBRSxLQUFHLEtBQUssT0FBTyxXQUFXO0FBQUcsUUFBSSxJQUFFLEtBQUssZ0JBQWMsRUFBRSxTQUFRLElBQUUsS0FBSztBQUFzQixTQUFHLElBQUUsS0FBSSxLQUFFLElBQUUsR0FBRSxJQUFFLEtBQUc7QUFBSyxRQUFJLElBQUU7QUFBRSxRQUFHLElBQUUsR0FBRTtBQUFDLFdBQUksRUFBRSxJQUFFLEtBQUcsR0FBRSxFQUFFLElBQUUsS0FBRyxHQUFFO0FBQUssWUFBRSxFQUFFLElBQUcsRUFBRSxJQUFFLE1BQUksTUFBSSxLQUFHLEdBQUUsRUFBRSxJQUFFLEtBQUcsS0FBRztBQUFFLFFBQUUsTUFBSSxNQUFJLEtBQUcsR0FBRSxFQUFFLEtBQUcsS0FBRyxHQUFFLEVBQUUsS0FBRyxLQUFHLEtBQUc7QUFBQSxXQUFPO0FBQUMsV0FBSSxFQUFFLElBQUUsS0FBRyxHQUFFLEVBQUUsSUFBRSxLQUFHLEdBQUU7QUFBSyxZQUFFLEVBQUUsSUFBRyxFQUFFLElBQUUsTUFBSSxNQUFJLEtBQUcsR0FBRSxFQUFFLElBQUUsS0FBRyxLQUFHO0FBQUUsUUFBRSxNQUFJLE1BQUksS0FBRyxHQUFFLEVBQUUsS0FBRyxLQUFHLEtBQUc7QUFBQTtBQUFFLFNBQUksSUFBRSxJQUFFLElBQUcsS0FBRSxLQUFJLElBQUU7QUFBRyxRQUFFLE9BQUssS0FBSSxFQUFFLE9BQUs7QUFBQSxLQUFJLGFBQVksU0FBUyxHQUFFO0FBQUMsUUFBSSxHQUFFLElBQUUsR0FBRSxJQUFFLEtBQUs7QUFBUyxTQUFJLElBQUUsR0FBRSxLQUFHLEdBQUU7QUFBSSxRQUFFLE1BQUksS0FBSSxNQUFHLEVBQUUsS0FBRyxFQUFFLEtBQUc7QUFBRyxTQUFJLElBQUUsR0FBRSxJQUFFLElBQUUsR0FBRSxLQUFHO0FBQUUsUUFBRSxJQUFFLE9BQUssRUFBRSxJQUFFLE1BQUksRUFBRSxJQUFFLE9BQUssRUFBRSxJQUFFLE1BQUksRUFBRSxJQUFFLE9BQUssRUFBRSxJQUFFLE1BQUksRUFBRSxJQUFFLEtBQUcsTUFBSSxFQUFFLE1BQUssR0FBRSxJQUFFLE9BQUssS0FBRyxJQUFFLElBQUUsS0FBRyxFQUFFLElBQUUsS0FBRyxLQUFHLEVBQUUsS0FBRyxLQUFHLEVBQUUsSUFBRSxLQUFHLEtBQUcsRUFBRSxLQUFHLE1BQUssTUFBRyxFQUFFO0FBQUksV0FBTztBQUFBLEtBQUcsU0FBUSxXQUFVO0FBQUMsU0FBSyxnQkFBYyxLQUFLLE9BQU87QUFBUSxRQUFJLEdBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRTtBQUFJLFNBQUksSUFBRSxHQUFFLElBQUUsS0FBSSxNQUFLLFdBQVcsSUFBRyxJQUFFLEtBQUssaUJBQWdCLElBQUUsS0FBSSxLQUFFLEdBQUUsSUFBRSxJQUFHLE1BQUksSUFBRztBQUFJLFdBQUssU0FBTyxLQUFLLGNBQWM7QUFBUSxVQUFJLEtBQUcsS0FBSyxXQUFXLElBQUcsSUFBRSxFQUFFLGFBQWEsSUFBRyxNQUFLLFNBQU8sS0FBRztBQUFJLFFBQUksSUFBRSxLQUFLLFFBQU8sSUFBRSxLQUFLO0FBQU0sU0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUksTUFBSTtBQUFFLFVBQUUsS0FBSSxHQUFFLElBQUUsSUFBRSxJQUFFLElBQUUsS0FBRyxHQUFFLElBQUUsSUFBRSxFQUFFLElBQUUsSUFBRSxLQUFHLElBQUUsRUFBRSxJQUFFLElBQUcsS0FBRSxNQUFJO0FBQUcsU0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUksTUFBSTtBQUFFLFVBQUUsS0FBSSxHQUFFLElBQUUsSUFBRyxLQUFFLElBQUUsTUFBSSxHQUFFLElBQUUsRUFBRSxJQUFFLElBQUUsSUFBRSxLQUFHLElBQUUsRUFBRSxJQUFFLElBQUUsS0FBRztBQUFBLEtBQUksbUJBQWtCLFdBQVU7QUFBQyxRQUFJLEdBQUUsR0FBRSxJQUFFLEtBQUssWUFBVyxJQUFFLEtBQUssTUFBSyxJQUFFLEtBQUssV0FBVSxJQUFFLEdBQUUsSUFBRSxLQUFLLHVCQUFzQixJQUFFLEtBQUssYUFBWSxJQUFFLEtBQUssYUFBWSxJQUFFLEtBQUs7QUFBYyxTQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSTtBQUFDLFdBQUksSUFBRSxHQUFFLElBQUUsR0FBRTtBQUFJLFVBQUUsT0FBSyxFQUFFLElBQUUsSUFBRTtBQUFHLFdBQUksSUFBRSxHQUFFLElBQUUsR0FBRTtBQUFJLFVBQUUsT0FBSyxFQUFFLElBQUUsSUFBRSxJQUFFLElBQUcsS0FBRTtBQUFBO0FBQUksU0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFO0FBQUksUUFBRSxPQUFLLEVBQUUsSUFBRSxJQUFFLElBQUUsSUFBRyxLQUFFO0FBQUksU0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFO0FBQUksV0FBSSxJQUFFLEdBQUUsSUFBRSxJQUFFLEdBQUU7QUFBSSxVQUFFLE9BQUssRUFBRSxJQUFFLElBQUUsSUFBRTtBQUFHLFNBQUssZ0JBQWM7QUFBQSxLQUFHLG1CQUFrQixXQUFVO0FBQUMsUUFBSSxHQUFFLEdBQUUsR0FBRSxJQUFFLEtBQUssVUFBUyxJQUFFLEtBQUs7QUFBTSxRQUFHLElBQUU7QUFBRSxXQUFJLElBQUUsR0FBRyxNQUFNLElBQUcsSUFBRSxJQUFFLE9BQUk7QUFBQyxhQUFJLElBQUUsSUFBRSxHQUFFLElBQUUsSUFBRSxLQUFJLE1BQUssY0FBYyxHQUFFLElBQUcsQ0FBRSxLQUFFO0FBQUssZUFBRztBQUFFLFlBQUcsS0FBRyxJQUFFO0FBQUU7QUFBTSxhQUFHLEdBQUUsS0FBSyxjQUFjLEdBQUUsSUFBRyxLQUFLLGNBQWMsR0FBRTtBQUFBO0FBQUEsS0FBSyxnQkFBZSxXQUFVO0FBQUMsUUFBSSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUUsS0FBSyxRQUFPLElBQUUsS0FBSztBQUFNLFNBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFJO0FBQUMsV0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLE1BQUksS0FBSSxLQUFFLElBQUUsSUFBRyxNQUFJLEtBQUksS0FBRSxJQUFFLElBQUcsRUFBRSxJQUFFLElBQUUsSUFBRyxLQUFFLE1BQUksR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFO0FBQUksVUFBRSxJQUFFLElBQUUsSUFBRSxLQUFHLEdBQUUsRUFBRSxJQUFFLElBQUcsS0FBRSxJQUFFLE1BQUksR0FBRSxFQUFFLElBQUUsSUFBRSxJQUFHLEtBQUUsTUFBSSxHQUFFLEVBQUUsSUFBRSxJQUFFLElBQUUsSUFBRyxLQUFFLE1BQUk7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEdBQUU7QUFBSSxhQUFLLFNBQVMsSUFBRSxHQUFFLElBQUUsSUFBRyxLQUFLLFNBQVMsSUFBRSxHQUFFLElBQUUsSUFBRSxJQUFHLEtBQUssU0FBUyxJQUFFLEdBQUUsSUFBRSxJQUFHLEtBQUssU0FBUyxJQUFFLElBQUUsR0FBRSxJQUFFO0FBQUcsV0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFO0FBQUksVUFBRSxJQUFFLElBQUUsSUFBRyxLQUFFLE1BQUksR0FBRSxFQUFFLElBQUUsSUFBRSxJQUFHLEtBQUUsSUFBRSxNQUFJLEdBQUUsRUFBRSxJQUFFLElBQUUsSUFBRyxLQUFFLE1BQUksR0FBRSxFQUFFLElBQUUsSUFBRSxJQUFFLElBQUcsS0FBRSxNQUFJO0FBQUE7QUFBQSxLQUFJLGtCQUFpQixXQUFVO0FBQUMsUUFBSSxHQUFFLEdBQUUsSUFBRSxLQUFLO0FBQU0sU0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFO0FBQUksV0FBSyxTQUFTLEdBQUUsSUFBRyxLQUFLLFNBQVMsSUFBRSxHQUFFLElBQUcsS0FBSyxTQUFTLEdBQUUsSUFBRSxJQUFFO0FBQUcsU0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFO0FBQUksV0FBSyxTQUFTLEdBQUUsSUFBRyxLQUFLLFNBQVMsSUFBRSxJQUFFLEdBQUUsSUFBRyxLQUFLLFNBQVMsR0FBRSxJQUFFO0FBQUEsS0FBSSwyQkFBMEIsV0FBVTtBQUFDLFFBQUksR0FBRSxJQUFFLEtBQUssUUFBTyxJQUFFLEtBQUs7QUFBTSxTQUFJLElBQUUsR0FBRSxJQUFFLElBQUUsSUFBRztBQUFJLFVBQUUsSUFBRyxNQUFLLFNBQVMsSUFBRSxHQUFFLElBQUcsS0FBSyxTQUFTLEdBQUUsSUFBRSxNQUFLLEdBQUUsSUFBRSxJQUFFLElBQUUsS0FBRyxHQUFFLEVBQUUsSUFBRSxJQUFHLEtBQUUsTUFBSTtBQUFBLEtBQUksZ0JBQWUsV0FBVTtBQUFDLFFBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFFLEtBQUssUUFBTyxJQUFFLEtBQUssVUFBUyxJQUFFLEtBQUs7QUFBTSxRQUFHLElBQUU7QUFBRSxXQUFJLElBQUUsR0FBRyxNQUFNLElBQUUsSUFBRyxJQUFFLElBQUcsSUFBRSxHQUFFLElBQUUsR0FBRTtBQUFJLGFBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFJO0FBQUksY0FBRyxLQUFFLEtBQUcsS0FBRyxJQUFFLEtBQUcsS0FBRyxLQUFJLEdBQUUsSUFBRSxJQUFFLElBQUcsS0FBRSxJQUFFLElBQUUsT0FBSyxHQUFFLEVBQUUsSUFBRSxJQUFFLElBQUUsS0FBRyxJQUFHLEtBQUUsTUFBSSxLQUFJLE1BQUssU0FBUyxJQUFFLEdBQUUsSUFBRSxJQUFFLElBQUUsS0FBSSxLQUFLLFNBQVMsSUFBRSxJQUFFLElBQUUsSUFBRyxJQUFFO0FBQUEsS0FBSyxXQUFVLFNBQVMsR0FBRSxHQUFFO0FBQUMsUUFBSSxJQUFFLEVBQUUsWUFBWSxHQUFFO0FBQUcsV0FBTyxLQUFLLE1BQU0sT0FBSztBQUFBLEtBQUcsT0FBTSxXQUFVO0FBQUMsUUFBSSxHQUFFLEdBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsS0FBSyxPQUFNLElBQUUsSUFBRSxHQUFFLElBQUUsSUFBRSxHQUFFLElBQUcsTUFBSyxhQUFXLEtBQUssYUFBWSxNQUFLLGNBQVksS0FBSyxlQUFhLEtBQUs7QUFBWSxTQUFJLElBQUUsR0FBRSxJQUFFLEdBQUU7QUFBSSxXQUFJLElBQUUsS0FBSyxjQUFjLElBQUcsSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFJLE1BQUksR0FBRTtBQUFDLGNBQUksS0FBSSxNQUFLLE9BQU8sSUFBRSxJQUFFLEtBQUc7QUFBRztBQUFHLGNBQUUsTUFBSyxNQUFJLElBQUUsTUFBSSxJQUFFLE1BQUssTUFBRyxHQUFFLElBQUUsQ0FBQyxHQUFFLE1BQUksS0FBSSxNQUFJLElBQUUsTUFBSSxNQUFJLElBQUUsSUFBRSxNQUFLLE1BQUcsR0FBRSxJQUFFLENBQUMsR0FBRSxNQUFJLEtBQUksTUFBSSxLQUFHLE1BQUssSUFBRSxDQUFDO0FBQUEsZUFBUSxLQUFLLFVBQVUsR0FBRTtBQUFBO0FBQUEsS0FBTSxjQUFhLFdBQVU7QUFBQyxRQUFJLEdBQUUsR0FBRSxJQUFFLEtBQUs7QUFBTSxTQUFJLElBQUUsR0FBRSxJQUFFLEdBQUU7QUFBSSxXQUFLLFNBQVMsR0FBRTtBQUFHLFNBQUksSUFBRSxHQUFFLElBQUUsR0FBRTtBQUFJLFdBQUssU0FBUyxJQUFFLElBQUUsR0FBRSxJQUFHLEtBQUssU0FBUyxHQUFFO0FBQUcsU0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFO0FBQUksV0FBSyxTQUFTLEdBQUUsSUFBRSxJQUFFO0FBQUEsS0FBSSxVQUFTLFNBQVMsR0FBRSxHQUFFO0FBQUMsUUFBSSxJQUFFLEVBQUUsWUFBWSxHQUFFO0FBQUcsU0FBSyxNQUFNLEtBQUc7QUFBQSxLQUFHLFdBQVUsV0FBVTtBQUFDLFFBQUksR0FBRSxHQUFFLElBQUUsS0FBSztBQUFNLFNBQUksSUFBRSxHQUFFLElBQUUsR0FBRTtBQUFJLFdBQUksSUFBRSxHQUFFLEtBQUcsR0FBRTtBQUFJLGFBQUssT0FBTyxJQUFFLElBQUUsTUFBSSxLQUFLLFNBQVMsR0FBRTtBQUFBLE9BQUssRUFBQyxjQUFhLFNBQVMsR0FBRTtBQUFDLFFBQUksR0FBRSxJQUFFO0FBQUcsU0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFO0FBQUksUUFBRSxLQUFHO0FBQUUsV0FBTztBQUFBLEtBQUcsYUFBWSxTQUFTLEdBQUUsR0FBRTtBQUFDLFFBQUk7QUFBRSxXQUFPLElBQUUsS0FBSSxLQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsSUFBRyxJQUFFLEdBQUUsS0FBRyxJQUFFLEdBQUUsTUFBSSxHQUFFLEtBQUcsR0FBRTtBQUFBLEtBQUcsT0FBTSxTQUFTLEdBQUU7QUFBQyxXQUFLLEtBQUc7QUFBSyxXQUFHLEtBQUksSUFBRyxNQUFHLEtBQUksS0FBRTtBQUFLLFdBQU87QUFBQSxLQUFHLElBQUcsR0FBRSxJQUFHLEdBQUUsSUFBRyxJQUFHLElBQUc7QUFBSyxJQUFFLFVBQVE7QUFBQTtBQUFJLElBQUksSUFBRSxFQUFFLENBQUMsSUFBRyxNQUFJO0FBQUM7QUFBYSxNQUFJLEtBQUcsS0FBSSxLQUFHLEdBQUcsT0FBTyxFQUFDLE1BQUssV0FBVTtBQUFDLFNBQUssUUFBUSxNQUFJLEtBQUssT0FBTztBQUFBLEtBQWEsT0FBTSxXQUFVO0FBQUMsU0FBSyxRQUFRLE1BQUk7QUFBQSxLQUFJLFFBQU8sV0FBVTtBQUFDLFFBQUksSUFBRSxLQUFLO0FBQVEsTUFBRSxRQUFNLEVBQUUsU0FBTyxLQUFLLE9BQU87QUFBQTtBQUFRLElBQUUsVUFBUTtBQUFBO0FBQUssSUFBSSxJQUFFLEVBQUUsQ0FBQyxJQUFHLE1BQUk7QUFBQztBQUFhLE1BQUksS0FBRyxLQUFJLEtBQUcsR0FBRyxPQUFPLFNBQVMsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLFNB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

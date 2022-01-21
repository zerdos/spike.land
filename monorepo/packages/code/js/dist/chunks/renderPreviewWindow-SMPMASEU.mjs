import {
  wait
} from "./chunk-PL2TSUJW.mjs";
import {
  LazySpikeLandComponent
} from "./chunk-SZGP6JU2.mjs";
import "./chunk-4IQSHU34.mjs";

// js/renderPreviewWindow.tsx
import { jsx as jsx4 } from "https://unpkg.com/@spike.land/esm@0.6.62/dist/emotion-react.mjs";

// js/DraggableWindow.tsx
import { css as css2, jsx as jsx3 } from "https://unpkg.com/@spike.land/esm@0.6.62/dist/emotion-react.mjs";
import React2, {
  useEffect,
  useRef,
  useState
} from "https://unpkg.com/@spike.land/esm@0.6.62/dist/react.mjs";
import { motion as motion2 } from "https://unpkg.com/@spike.land/esm@0.6.62/dist/framer-motion.mjs";

// js/mui.tsx
import { jsx } from "https://unpkg.com/@spike.land/esm@0.6.62/dist/emotion-react.mjs";
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
import { css, jsx as jsx2 } from "https://unpkg.com/@spike.land/esm@0.6.62/dist/emotion-react.mjs";
import { motion } from "https://unpkg.com/@spike.land/esm@0.6.62/dist/framer-motion.mjs";
import React from "https://unpkg.com/@spike.land/esm@0.6.62/dist/react.mjs";

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
  const editor = document.querySelector("#shadowEditor");
  editor.style.opacity = "0";
  const { createRoot } = await import("https://unpkg.com/@spike.land/esm@0.6.62/dist/react-dom.mjs");
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
//# sourceMappingURL=renderPreviewWindow-SMPMASEU.mjs.map

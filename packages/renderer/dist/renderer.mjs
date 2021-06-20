var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../qrious/dist/QRious.mjs
var QRious_exports = {};
__export(QRious_exports, {
  QRious: () => $e
});
var c, E, S, u, B, L, j, I, V, G, K, X, H, M, Y, $, re, se, ne, ce, ue, $e, e0;
var init_QRious = __esm({
  "../qrious/dist/QRious.mjs"() {
    c = (i, e) => () => (e || i((e = { exports: {} }).exports, e), e.exports);
    E = c((t0, N) => {
      "use strict";
      var w = function() {
      }, he = Object.prototype.hasOwnProperty, le = Array.prototype.slice;
      function ve(i, e) {
        var t;
        return typeof Object.create == "function" ? t = Object.create(i) : (w.prototype = i, t = new w(), w.prototype = null), e && O(true, t, e), t;
      }
      function de(i, e, t, r) {
        var x = this;
        return typeof i != "string" && (r = t, t = e, e = i, i = null), typeof e != "function" && (r = t, t = e, e = function() {
          return x.apply(this, arguments);
        }), O(false, e, x, r), e.prototype = ve(x.prototype, t), e.prototype.constructor = e, e.class_ = i || x.class_, e.super_ = x, e;
      }
      function O(i, e, t) {
        t = le.call(arguments, 2);
        for (var r, x, s = 0, a = t.length; s < a; s++) {
          x = t[s];
          for (r in x)
            (!i || he.call(x, r)) && (e[r] = x[r]);
        }
      }
      N.exports = de;
    });
    S = c((r0, A) => {
      "use strict";
      var _e = E();
      function k() {
      }
      k.class_ = "Nevis";
      k.super_ = Object;
      k.extend = _e;
      A.exports = k;
    });
    u = c((x0, y) => {
      "use strict";
      y.exports = S();
    });
    B = c((s0, C) => {
      "use strict";
      var be = u(), me = be.extend(function(i, e, t) {
        this.qrious = i, this.element = e, this.element.qrious = i, this.enabled = Boolean(t);
      }, { draw: function(i) {
      }, getElement: function() {
        return this.enabled || (this.enabled = true, this.render()), this.element;
      }, getModuleSize: function(i) {
        var e = this.qrious, t = e.padding || 0, r = Math.floor((e.size - t * 2) / i.width);
        return Math.max(1, r);
      }, getOffset: function(i) {
        var e = this.qrious, t = e.padding;
        if (t != null)
          return t;
        var r = this.getModuleSize(i), x = Math.floor((e.size - r * i.width) / 2);
        return Math.max(0, x);
      }, render: function(i) {
        this.enabled && (this.resize(), this.reset(), this.draw(i));
      }, reset: function() {
      }, resize: function() {
      } });
      C.exports = me;
    });
    L = c((a0, R) => {
      "use strict";
      var ke = B(), pe = ke.extend({ draw: function(i) {
        var e, t, r = this.qrious, x = this.getModuleSize(i), s = this.getOffset(i), a = this.element.getContext("2d");
        for (a.fillStyle = r.foreground, a.globalAlpha = r.foregroundAlpha, e = 0; e < i.width; e++)
          for (t = 0; t < i.width; t++)
            i.buffer[t * i.width + e] && a.fillRect(x * e + s, x * t + s, x, x);
      }, reset: function() {
        var i = this.qrious, e = this.element.getContext("2d"), t = i.size;
        e.lineWidth = 1, e.clearRect(0, 0, t, t), e.fillStyle = i.background, e.globalAlpha = i.backgroundAlpha, e.fillRect(0, 0, t, t);
      }, resize: function() {
        var i = this.element;
        i.width = i.height = this.qrious.size;
      } });
      R.exports = pe;
    });
    j = c((n0, T) => {
      "use strict";
      var ge = u(), we = ge.extend(null, { BLOCK: [0, 11, 15, 19, 23, 27, 31, 16, 18, 20, 22, 24, 26, 28, 20, 22, 24, 24, 26, 28, 28, 22, 24, 24, 26, 26, 28, 28, 24, 24, 26, 26, 26, 28, 28, 24, 26, 26, 26, 28, 28] });
      T.exports = we;
    });
    I = c((f0, z) => {
      "use strict";
      var Be = u(), Me = Be.extend(null, { BLOCKS: [1, 0, 19, 7, 1, 0, 16, 10, 1, 0, 13, 13, 1, 0, 9, 17, 1, 0, 34, 10, 1, 0, 28, 16, 1, 0, 22, 22, 1, 0, 16, 28, 1, 0, 55, 15, 1, 0, 44, 26, 2, 0, 17, 18, 2, 0, 13, 22, 1, 0, 80, 20, 2, 0, 32, 18, 2, 0, 24, 26, 4, 0, 9, 16, 1, 0, 108, 26, 2, 0, 43, 24, 2, 2, 15, 18, 2, 2, 11, 22, 2, 0, 68, 18, 4, 0, 27, 16, 4, 0, 19, 24, 4, 0, 15, 28, 2, 0, 78, 20, 4, 0, 31, 18, 2, 4, 14, 18, 4, 1, 13, 26, 2, 0, 97, 24, 2, 2, 38, 22, 4, 2, 18, 22, 4, 2, 14, 26, 2, 0, 116, 30, 3, 2, 36, 22, 4, 4, 16, 20, 4, 4, 12, 24, 2, 2, 68, 18, 4, 1, 43, 26, 6, 2, 19, 24, 6, 2, 15, 28, 4, 0, 81, 20, 1, 4, 50, 30, 4, 4, 22, 28, 3, 8, 12, 24, 2, 2, 92, 24, 6, 2, 36, 22, 4, 6, 20, 26, 7, 4, 14, 28, 4, 0, 107, 26, 8, 1, 37, 22, 8, 4, 20, 24, 12, 4, 11, 22, 3, 1, 115, 30, 4, 5, 40, 24, 11, 5, 16, 20, 11, 5, 12, 24, 5, 1, 87, 22, 5, 5, 41, 24, 5, 7, 24, 30, 11, 7, 12, 24, 5, 1, 98, 24, 7, 3, 45, 28, 15, 2, 19, 24, 3, 13, 15, 30, 1, 5, 107, 28, 10, 1, 46, 28, 1, 15, 22, 28, 2, 17, 14, 28, 5, 1, 120, 30, 9, 4, 43, 26, 17, 1, 22, 28, 2, 19, 14, 28, 3, 4, 113, 28, 3, 11, 44, 26, 17, 4, 21, 26, 9, 16, 13, 26, 3, 5, 107, 28, 3, 13, 41, 26, 15, 5, 24, 30, 15, 10, 15, 28, 4, 4, 116, 28, 17, 0, 42, 26, 17, 6, 22, 28, 19, 6, 16, 30, 2, 7, 111, 28, 17, 0, 46, 28, 7, 16, 24, 30, 34, 0, 13, 24, 4, 5, 121, 30, 4, 14, 47, 28, 11, 14, 24, 30, 16, 14, 15, 30, 6, 4, 117, 30, 6, 14, 45, 28, 11, 16, 24, 30, 30, 2, 16, 30, 8, 4, 106, 26, 8, 13, 47, 28, 7, 22, 24, 30, 22, 13, 15, 30, 10, 2, 114, 28, 19, 4, 46, 28, 28, 6, 22, 28, 33, 4, 16, 30, 8, 4, 122, 30, 22, 3, 45, 28, 8, 26, 23, 30, 12, 28, 15, 30, 3, 10, 117, 30, 3, 23, 45, 28, 4, 31, 24, 30, 11, 31, 15, 30, 7, 7, 116, 30, 21, 7, 45, 28, 1, 37, 23, 30, 19, 26, 15, 30, 5, 10, 115, 30, 19, 10, 47, 28, 15, 25, 24, 30, 23, 25, 15, 30, 13, 3, 115, 30, 2, 29, 46, 28, 42, 1, 24, 30, 23, 28, 15, 30, 17, 0, 115, 30, 10, 23, 46, 28, 10, 35, 24, 30, 19, 35, 15, 30, 17, 1, 115, 30, 14, 21, 46, 28, 29, 19, 24, 30, 11, 46, 15, 30, 13, 6, 115, 30, 14, 23, 46, 28, 44, 7, 24, 30, 59, 1, 16, 30, 12, 7, 121, 30, 12, 26, 47, 28, 39, 14, 24, 30, 22, 41, 15, 30, 6, 14, 121, 30, 6, 34, 47, 28, 46, 10, 24, 30, 2, 64, 15, 30, 17, 4, 122, 30, 29, 14, 46, 28, 49, 10, 24, 30, 24, 46, 15, 30, 4, 18, 122, 30, 13, 32, 46, 28, 48, 14, 24, 30, 42, 32, 15, 30, 20, 4, 117, 30, 40, 7, 47, 28, 43, 22, 24, 30, 10, 67, 15, 30, 19, 6, 118, 30, 18, 31, 47, 28, 34, 34, 24, 30, 20, 61, 15, 30], FINAL_FORMAT: [30660, 29427, 32170, 30877, 26159, 25368, 27713, 26998, 21522, 20773, 24188, 23371, 17913, 16590, 20375, 19104, 13663, 12392, 16177, 14854, 9396, 8579, 11994, 11245, 5769, 5054, 7399, 6608, 1890, 597, 3340, 2107], LEVELS: { L: 1, M: 2, Q: 3, H: 4 } });
      z.exports = Me;
    });
    V = c((c0, P) => {
      "use strict";
      var qe = u(), Oe = qe.extend(null, { EXPONENT: [1, 2, 4, 8, 16, 32, 64, 128, 29, 58, 116, 232, 205, 135, 19, 38, 76, 152, 45, 90, 180, 117, 234, 201, 143, 3, 6, 12, 24, 48, 96, 192, 157, 39, 78, 156, 37, 74, 148, 53, 106, 212, 181, 119, 238, 193, 159, 35, 70, 140, 5, 10, 20, 40, 80, 160, 93, 186, 105, 210, 185, 111, 222, 161, 95, 190, 97, 194, 153, 47, 94, 188, 101, 202, 137, 15, 30, 60, 120, 240, 253, 231, 211, 187, 107, 214, 177, 127, 254, 225, 223, 163, 91, 182, 113, 226, 217, 175, 67, 134, 17, 34, 68, 136, 13, 26, 52, 104, 208, 189, 103, 206, 129, 31, 62, 124, 248, 237, 199, 147, 59, 118, 236, 197, 151, 51, 102, 204, 133, 23, 46, 92, 184, 109, 218, 169, 79, 158, 33, 66, 132, 21, 42, 84, 168, 77, 154, 41, 82, 164, 85, 170, 73, 146, 57, 114, 228, 213, 183, 115, 230, 209, 191, 99, 198, 145, 63, 126, 252, 229, 215, 179, 123, 246, 241, 255, 227, 219, 171, 75, 150, 49, 98, 196, 149, 55, 110, 220, 165, 87, 174, 65, 130, 25, 50, 100, 200, 141, 7, 14, 28, 56, 112, 224, 221, 167, 83, 166, 81, 162, 89, 178, 121, 242, 249, 239, 195, 155, 43, 86, 172, 69, 138, 9, 18, 36, 72, 144, 61, 122, 244, 245, 247, 243, 251, 235, 203, 139, 11, 22, 44, 88, 176, 125, 250, 233, 207, 131, 27, 54, 108, 216, 173, 71, 142, 0], LOG: [255, 0, 1, 25, 2, 50, 26, 198, 3, 223, 51, 238, 27, 104, 199, 75, 4, 100, 224, 14, 52, 141, 239, 129, 28, 193, 105, 248, 200, 8, 76, 113, 5, 138, 101, 47, 225, 36, 15, 33, 53, 147, 142, 218, 240, 18, 130, 69, 29, 181, 194, 125, 106, 39, 249, 185, 201, 154, 9, 120, 77, 228, 114, 166, 6, 191, 139, 98, 102, 221, 48, 253, 226, 152, 37, 179, 16, 145, 34, 136, 54, 208, 148, 206, 143, 150, 219, 189, 241, 210, 19, 92, 131, 56, 70, 64, 30, 66, 182, 163, 195, 72, 126, 110, 107, 58, 40, 84, 250, 133, 186, 61, 202, 94, 155, 159, 10, 21, 121, 43, 78, 212, 229, 172, 115, 243, 167, 87, 7, 112, 192, 247, 140, 128, 99, 13, 103, 74, 222, 237, 49, 197, 254, 24, 227, 165, 153, 119, 38, 184, 180, 124, 17, 68, 146, 217, 35, 32, 137, 46, 55, 63, 209, 91, 149, 188, 207, 205, 144, 135, 151, 178, 220, 252, 190, 97, 242, 86, 211, 171, 20, 42, 93, 158, 132, 60, 57, 83, 71, 109, 65, 162, 31, 45, 67, 216, 183, 123, 164, 118, 196, 23, 73, 236, 127, 12, 111, 246, 108, 161, 59, 82, 41, 157, 85, 170, 251, 96, 134, 177, 187, 204, 62, 90, 203, 89, 95, 176, 156, 169, 160, 81, 11, 245, 22, 235, 122, 117, 44, 215, 79, 174, 213, 233, 230, 231, 173, 232, 116, 214, 244, 234, 168, 80, 88, 175] });
      P.exports = Oe;
    });
    G = c((o0, U) => {
      "use strict";
      var Ne = u(), Ee = Ne.extend(null, { BLOCK: [3220, 1468, 2713, 1235, 3062, 1890, 2119, 1549, 2344, 2936, 1117, 2583, 1330, 2470, 1667, 2249, 2028, 3780, 481, 4011, 142, 3098, 831, 3445, 592, 2517, 1776, 2234, 1951, 2827, 1070, 2660, 1345, 3177] });
      U.exports = Ee;
    });
    K = c((u0, F) => {
      "use strict";
      var Ae = u(), Se = j(), _ = I(), v = V(), ye = G(), o = Ae.extend(function(i) {
        var e, t, r, x, s, a = i.value.length;
        for (this._badness = [], this._level = _.LEVELS[i.level], this._polynomial = [], this._value = i.value, this._version = 0, this._stringBuffer = []; this._version < 40 && (this._version++, r = (this._level - 1) * 4 + (this._version - 1) * 16, x = _.BLOCKS[r++], s = _.BLOCKS[r++], e = _.BLOCKS[r++], t = _.BLOCKS[r], r = e * (x + s) + s - 3 + (this._version <= 9), !(a <= r)); )
          ;
        this._dataBlock = e, this._eccBlock = t, this._neccBlock1 = x, this._neccBlock2 = s;
        var n = this.width = 17 + 4 * this._version;
        this.buffer = o._createArray(n * n), this._ecc = o._createArray(e + (e + t) * (x + s) + s), this._mask = o._createArray((n * (n + 1) + 1) / 2), this._insertFinders(), this._insertAlignments(), this.buffer[8 + n * (n - 8)] = 1, this._insertTimingGap(), this._reverseMask(), this._insertTimingRowAndColumn(), this._insertVersion(), this._syncMask(), this._convertBitStream(a), this._calculatePolynomial(), this._appendEccToData(), this._interleaveBlocks(), this._pack(), this._finish();
      }, { _addAlignment: function(i, e) {
        var t, r = this.buffer, x = this.width;
        for (r[i + x * e] = 1, t = -2; t < 2; t++)
          r[i + t + x * (e - 2)] = 1, r[i - 2 + x * (e + t + 1)] = 1, r[i + 2 + x * (e + t)] = 1, r[i + t + 1 + x * (e + 2)] = 1;
        for (t = 0; t < 2; t++)
          this._setMask(i - 1, e + t), this._setMask(i + 1, e - t), this._setMask(i - t, e - 1), this._setMask(i + t, e + 1);
      }, _appendData: function(i, e, t, r) {
        var x, s, a, n = this._polynomial, f = this._stringBuffer;
        for (s = 0; s < r; s++)
          f[t + s] = 0;
        for (s = 0; s < e; s++) {
          if (x = v.LOG[f[i + s] ^ f[t]], x !== 255)
            for (a = 1; a < r; a++)
              f[t + a - 1] = f[t + a] ^ v.EXPONENT[o._modN(x + n[r - a])];
          else
            for (a = t; a < t + r; a++)
              f[a] = f[a + 1];
          f[t + r - 1] = x === 255 ? 0 : v.EXPONENT[o._modN(x + n[0])];
        }
      }, _appendEccToData: function() {
        var i, e = 0, t = this._dataBlock, r = this._calculateMaxLength(), x = this._eccBlock;
        for (i = 0; i < this._neccBlock1; i++)
          this._appendData(e, t, r, x), e += t, r += x;
        for (i = 0; i < this._neccBlock2; i++)
          this._appendData(e, t + 1, r, x), e += t + 1, r += x;
      }, _applyMask: function(i) {
        var e, t, r, x, s = this.buffer, a = this.width;
        switch (i) {
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
            for (t = 0, x = 0; x < a; x++, t++)
              for (t === 3 && (t = 0), e = t, r = 0; r < a; r++, e++)
                e === 3 && (e = 0), !e && !this._isMasked(r, x) && (s[r + x * a] ^= 1);
            break;
          case 4:
            for (x = 0; x < a; x++)
              for (e = 0, t = x >> 1 & 1, r = 0; r < a; r++, e++)
                e === 3 && (e = 0, t = !t), !t && !this._isMasked(r, x) && (s[r + x * a] ^= 1);
            break;
          case 5:
            for (t = 0, x = 0; x < a; x++, t++)
              for (t === 3 && (t = 0), e = 0, r = 0; r < a; r++, e++)
                e === 3 && (e = 0), !((r & x & 1) + !(!e | !t)) && !this._isMasked(r, x) && (s[r + x * a] ^= 1);
            break;
          case 6:
            for (t = 0, x = 0; x < a; x++, t++)
              for (t === 3 && (t = 0), e = 0, r = 0; r < a; r++, e++)
                e === 3 && (e = 0), !((r & x & 1) + (e && e === t) & 1) && !this._isMasked(r, x) && (s[r + x * a] ^= 1);
            break;
          case 7:
            for (t = 0, x = 0; x < a; x++, t++)
              for (t === 3 && (t = 0), e = 0, r = 0; r < a; r++, e++)
                e === 3 && (e = 0), !((e && e === t) + (r + x & 1) & 1) && !this._isMasked(r, x) && (s[r + x * a] ^= 1);
            break;
        }
      }, _calculateMaxLength: function() {
        return this._dataBlock * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;
      }, _calculatePolynomial: function() {
        var i, e, t = this._eccBlock, r = this._polynomial;
        for (r[0] = 1, i = 0; i < t; i++) {
          for (r[i + 1] = 1, e = i; e > 0; e--)
            r[e] = r[e] ? r[e - 1] ^ v.EXPONENT[o._modN(v.LOG[r[e]] + i)] : r[e - 1];
          r[0] = v.EXPONENT[o._modN(v.LOG[r[0]] + i)];
        }
        for (i = 0; i <= t; i++)
          r[i] = v.LOG[r[i]];
      }, _checkBadness: function() {
        var i, e, t, r, x, s = 0, a = this._badness, n = this.buffer, f = this.width;
        for (x = 0; x < f - 1; x++)
          for (r = 0; r < f - 1; r++)
            (n[r + f * x] && n[r + 1 + f * x] && n[r + f * (x + 1)] && n[r + 1 + f * (x + 1)] || !(n[r + f * x] || n[r + 1 + f * x] || n[r + f * (x + 1)] || n[r + 1 + f * (x + 1)])) && (s += o.N2);
        var h = 0;
        for (x = 0; x < f; x++) {
          for (t = 0, a[0] = 0, i = 0, r = 0; r < f; r++)
            e = n[r + f * x], i === e ? a[t]++ : a[++t] = 1, i = e, h += i ? 1 : -1;
          s += this._getBadness(t);
        }
        h < 0 && (h = -h);
        var q = 0, b = h;
        for (b += b << 2, b <<= 1; b > f * f; )
          b -= f * f, q++;
        for (s += q * o.N4, r = 0; r < f; r++) {
          for (t = 0, a[0] = 0, i = 0, x = 0; x < f; x++)
            e = n[r + f * x], i === e ? a[t]++ : a[++t] = 1, i = e;
          s += this._getBadness(t);
        }
        return s;
      }, _convertBitStream: function(i) {
        var e, t, r = this._ecc, x = this._version;
        for (t = 0; t < i; t++)
          r[t] = this._value.charCodeAt(t);
        var s = this._stringBuffer = r.slice(), a = this._calculateMaxLength();
        i >= a - 2 && (i = a - 2, x > 9 && i--);
        var n = i;
        if (x > 9) {
          for (s[n + 2] = 0, s[n + 3] = 0; n--; )
            e = s[n], s[n + 3] |= 255 & e << 4, s[n + 2] = e >> 4;
          s[2] |= 255 & i << 4, s[1] = i >> 4, s[0] = 64 | i >> 12;
        } else {
          for (s[n + 1] = 0, s[n + 2] = 0; n--; )
            e = s[n], s[n + 2] |= 255 & e << 4, s[n + 1] = e >> 4;
          s[1] |= 255 & i << 4, s[0] = 64 | i >> 4;
        }
        for (n = i + 3 - (x < 10); n < a; )
          s[n++] = 236, s[n++] = 17;
      }, _getBadness: function(i) {
        var e, t = 0, r = this._badness;
        for (e = 0; e <= i; e++)
          r[e] >= 5 && (t += o.N1 + r[e] - 5);
        for (e = 3; e < i - 1; e += 2)
          r[e - 2] === r[e + 2] && r[e + 2] === r[e - 1] && r[e - 1] === r[e + 1] && r[e - 1] * 3 === r[e] && (r[e - 3] === 0 || e + 3 > i || r[e - 3] * 3 >= r[e] * 4 || r[e + 3] * 3 >= r[e] * 4) && (t += o.N3);
        return t;
      }, _finish: function() {
        this._stringBuffer = this.buffer.slice();
        var i, e, t = 0, r = 3e4;
        for (e = 0; e < 8 && (this._applyMask(e), i = this._checkBadness(), i < r && (r = i, t = e), t !== 7); e++)
          this.buffer = this._stringBuffer.slice();
        t !== e && this._applyMask(t), r = _.FINAL_FORMAT[t + (this._level - 1 << 3)];
        var x = this.buffer, s = this.width;
        for (e = 0; e < 8; e++, r >>= 1)
          r & 1 && (x[s - 1 - e + s * 8] = 1, e < 6 ? x[8 + s * e] = 1 : x[8 + s * (e + 1)] = 1);
        for (e = 0; e < 7; e++, r >>= 1)
          r & 1 && (x[8 + s * (s - 7 + e)] = 1, e ? x[6 - e + s * 8] = 1 : x[7 + s * 8] = 1);
      }, _interleaveBlocks: function() {
        var i, e, t = this._dataBlock, r = this._ecc, x = this._eccBlock, s = 0, a = this._calculateMaxLength(), n = this._neccBlock1, f = this._neccBlock2, h = this._stringBuffer;
        for (i = 0; i < t; i++) {
          for (e = 0; e < n; e++)
            r[s++] = h[i + e * t];
          for (e = 0; e < f; e++)
            r[s++] = h[n * t + i + e * (t + 1)];
        }
        for (e = 0; e < f; e++)
          r[s++] = h[n * t + i + e * (t + 1)];
        for (i = 0; i < x; i++)
          for (e = 0; e < n + f; e++)
            r[s++] = h[a + i + e * x];
        this._stringBuffer = r;
      }, _insertAlignments: function() {
        var i, e, t, r = this._version, x = this.width;
        if (r > 1)
          for (i = Se.BLOCK[r], t = x - 7; ; ) {
            for (e = x - 7; e > i - 3 && (this._addAlignment(e, t), !(e < i)); )
              e -= i;
            if (t <= i + 9)
              break;
            t -= i, this._addAlignment(6, t), this._addAlignment(t, 6);
          }
      }, _insertFinders: function() {
        var i, e, t, r, x = this.buffer, s = this.width;
        for (i = 0; i < 3; i++) {
          for (e = 0, r = 0, i === 1 && (e = s - 7), i === 2 && (r = s - 7), x[r + 3 + s * (e + 3)] = 1, t = 0; t < 6; t++)
            x[r + t + s * e] = 1, x[r + s * (e + t + 1)] = 1, x[r + 6 + s * (e + t)] = 1, x[r + t + 1 + s * (e + 6)] = 1;
          for (t = 1; t < 5; t++)
            this._setMask(r + t, e + 1), this._setMask(r + 1, e + t + 1), this._setMask(r + 5, e + t), this._setMask(r + t + 1, e + 5);
          for (t = 2; t < 4; t++)
            x[r + t + s * (e + 2)] = 1, x[r + 2 + s * (e + t + 1)] = 1, x[r + 4 + s * (e + t)] = 1, x[r + t + 1 + s * (e + 4)] = 1;
        }
      }, _insertTimingGap: function() {
        var i, e, t = this.width;
        for (e = 0; e < 7; e++)
          this._setMask(7, e), this._setMask(t - 8, e), this._setMask(7, e + t - 7);
        for (i = 0; i < 8; i++)
          this._setMask(i, 7), this._setMask(i + t - 8, 7), this._setMask(i, t - 8);
      }, _insertTimingRowAndColumn: function() {
        var i, e = this.buffer, t = this.width;
        for (i = 0; i < t - 14; i++)
          i & 1 ? (this._setMask(8 + i, 6), this._setMask(6, 8 + i)) : (e[8 + i + t * 6] = 1, e[6 + t * (8 + i)] = 1);
      }, _insertVersion: function() {
        var i, e, t, r, x = this.buffer, s = this._version, a = this.width;
        if (s > 6)
          for (i = ye.BLOCK[s - 7], e = 17, t = 0; t < 6; t++)
            for (r = 0; r < 3; r++, e--)
              1 & (e > 11 ? s >> e - 12 : i >> e) ? (x[5 - t + a * (2 - r + a - 11)] = 1, x[2 - r + a - 11 + a * (5 - t)] = 1) : (this._setMask(5 - t, 2 - r + a - 11), this._setMask(2 - r + a - 11, 5 - t));
      }, _isMasked: function(i, e) {
        var t = o._getMaskBit(i, e);
        return this._mask[t] === 1;
      }, _pack: function() {
        var i, e, t, r = 1, x = 1, s = this.width, a = s - 1, n = s - 1, f = (this._dataBlock + this._eccBlock) * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;
        for (e = 0; e < f; e++)
          for (i = this._stringBuffer[e], t = 0; t < 8; t++, i <<= 1) {
            128 & i && (this.buffer[a + s * n] = 1);
            do
              x ? a-- : (a++, r ? n !== 0 ? n-- : (a -= 2, r = !r, a === 6 && (a--, n = 9)) : n !== s - 1 ? n++ : (a -= 2, r = !r, a === 6 && (a--, n -= 8))), x = !x;
            while (this._isMasked(a, n));
          }
      }, _reverseMask: function() {
        var i, e, t = this.width;
        for (i = 0; i < 9; i++)
          this._setMask(i, 8);
        for (i = 0; i < 8; i++)
          this._setMask(i + t - 8, 8), this._setMask(8, i);
        for (e = 0; e < 7; e++)
          this._setMask(8, e + t - 7);
      }, _setMask: function(i, e) {
        var t = o._getMaskBit(i, e);
        this._mask[t] = 1;
      }, _syncMask: function() {
        var i, e, t = this.width;
        for (e = 0; e < t; e++)
          for (i = 0; i <= e; i++)
            this.buffer[i + t * e] && this._setMask(i, e);
      } }, { _createArray: function(i) {
        var e, t = [];
        for (e = 0; e < i; e++)
          t[e] = 0;
        return t;
      }, _getMaskBit: function(i, e) {
        var t;
        return i > e && (t = i, i = e, e = t), t = e, t += e * e, t >>= 1, t += i, t;
      }, _modN: function(i) {
        for (; i >= 255; )
          i -= 255, i = (i >> 8) + (i & 255);
        return i;
      }, N1: 3, N2: 3, N3: 40, N4: 10 });
      F.exports = o;
    });
    X = c((h0, D) => {
      "use strict";
      var Ce = B(), Re = Ce.extend({ draw: function() {
        this.element.src = this.qrious.toDataURL();
      }, reset: function() {
        this.element.src = "";
      }, resize: function() {
        var i = this.element;
        i.width = i.height = this.qrious.size;
      } });
      D.exports = Re;
    });
    H = c((l0, Q) => {
      "use strict";
      var Le = u(), Te = Le.extend(function(i, e, t, r) {
        this.name = i, this.modifiable = Boolean(e), this.defaultValue = t, this._valueTransformer = r;
      }, { transform: function(i) {
        var e = this._valueTransformer;
        return typeof e == "function" ? e(i, this) : i;
      } });
      Q.exports = Te;
    });
    M = c((v0, W) => {
      "use strict";
      var je = u(), ze = je.extend(null, { abs: function(i) {
        return i != null ? Math.abs(i) : null;
      }, hasOwn: function(i, e) {
        return Object.prototype.hasOwnProperty.call(i, e);
      }, noop: function() {
      }, toUpperCase: function(i) {
        return i != null ? i.toUpperCase() : null;
      } });
      W.exports = ze;
    });
    Y = c((d0, J) => {
      "use strict";
      var Ie = u(), p = M(), d = Ie.extend(function(i) {
        this.options = {}, i.forEach(function(e) {
          this.options[e.name] = e;
        }, this);
      }, { exists: function(i) {
        return this.options[i] != null;
      }, get: function(i, e) {
        return d._get(this.options[i], e);
      }, getAll: function(i) {
        var e, t = this.options, r = {};
        for (e in t)
          p.hasOwn(t, e) && (r[e] = d._get(t[e], i));
        return r;
      }, init: function(i, e, t) {
        typeof t != "function" && (t = p.noop);
        var r, x;
        for (r in this.options)
          p.hasOwn(this.options, r) && (x = this.options[r], d._set(x, x.defaultValue, e), d._createAccessor(x, e, t));
        this._setAll(i, e, true);
      }, set: function(i, e, t) {
        return this._set(i, e, t);
      }, setAll: function(i, e) {
        return this._setAll(i, e);
      }, _set: function(i, e, t, r) {
        var x = this.options[i];
        if (!x)
          throw new Error("Invalid option: " + i);
        if (!x.modifiable && !r)
          throw new Error("Option cannot be modified: " + i);
        return d._set(x, e, t);
      }, _setAll: function(i, e, t) {
        if (!i)
          return false;
        var r, x = false;
        for (r in i)
          p.hasOwn(i, r) && this._set(r, i[r], e, t) && (x = true);
        return x;
      } }, { _createAccessor: function(i, e, t) {
        var r = { get: function() {
          return d._get(i, e);
        } };
        i.modifiable && (r.set = function(x) {
          d._set(i, x, e) && t(x, i);
        }), Object.defineProperty(e, i.name, r);
      }, _get: function(i, e) {
        return e["_" + i.name];
      }, _set: function(i, e, t) {
        var r = "_" + i.name, x = t[r], s = i.transform(e != null ? e : i.defaultValue);
        return t[r] = s, s !== x;
      } });
      J.exports = d;
    });
    $ = c((_0, Z) => {
      "use strict";
      var Pe = u(), Ve = Pe.extend(function() {
        this._services = {};
      }, { getService: function(i) {
        var e = this._services[i];
        if (!e)
          throw new Error("Service is not being managed with name: " + i);
        return e;
      }, setService: function(i, e) {
        if (this._services[i])
          throw new Error("Service is already managed with name: " + i);
        e && (this._services[i] = e);
      } });
      Z.exports = Ve;
    });
    re = c((b0, te) => {
      "use strict";
      var Ue = u(), Ge = L(), Fe = K(), Ke = X(), l = H(), De = Y(), Xe = $(), m = M(), g = new De([new l("background", true, "white"), new l("backgroundAlpha", true, 1, m.abs), new l("element"), new l("foreground", true, "black"), new l("foregroundAlpha", true, 1, m.abs), new l("level", true, "L", m.toUpperCase), new l("mime", true, "image/png"), new l("padding", true, null, m.abs), new l("size", true, 100, m.abs), new l("value", true, "")]), ee = new Xe(), ie = Ue.extend(function(i) {
        g.init(i, this, this.update.bind(this));
        var e = g.get("element", this), t = ee.getService("element"), r = e && t.isCanvas(e) ? e : t.createCanvas(), x = e && t.isImage(e) ? e : t.createImage();
        this._canvasRenderer = new Ge(this, r, true), this._imageRenderer = new Ke(this, x, x === e), this.update();
      }, { get: function() {
        return g.getAll(this);
      }, set: function(i) {
        g.setAll(i, this) && this.update();
      }, toDataURL: function(i) {
        return this.canvas.toDataURL(i || this.mime);
      }, update: function() {
        var i = new Fe({ level: this.level, value: this.value });
        this._canvasRenderer.render(i), this._imageRenderer.render(i);
      } }, { use: function(i) {
        ee.setService(i.getName(), i);
      } });
      Object.defineProperties(ie.prototype, { canvas: { get: function() {
        return this._canvasRenderer.getElement();
      } }, image: { get: function() {
        return this._imageRenderer.getElement();
      } } });
      te.exports = ie;
    });
    se = c((m0, xe) => {
      "use strict";
      xe.exports = re();
    });
    ne = c((k0, ae) => {
      "use strict";
      var Qe = u(), He = Qe.extend({ getName: function() {
      } });
      ae.exports = He;
    });
    ce = c((p0, fe) => {
      "use strict";
      var We = ne(), Je = We.extend({ createCanvas: function() {
      }, createImage: function() {
      }, getName: function() {
        return "element";
      }, isCanvas: function(i) {
      }, isImage: function(i) {
      } });
      fe.exports = Je;
    });
    ue = c((g0, oe) => {
      "use strict";
      var Ye = ce(), Ze = Ye.extend({ createCanvas: function() {
        return document.createElement("canvas");
      }, createImage: function() {
        return document.createElement("img");
      }, isCanvas: function(i) {
        return i instanceof HTMLCanvasElement;
      }, isImage: function(i) {
        return i instanceof HTMLImageElement;
      } });
      oe.exports = Ze;
    });
    $e = se();
    e0 = ue();
    $e.use(new e0());
  }
});

// src/renderer.ts
import * as Motion from "framer-motion";
import React, { Fragment } from "react";
import {
  createRoot
} from "react-dom";
import { css, Global, jsx } from "@emotion/react";

// src/DraggableWindow.tsx
import Fab2 from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import ToggleButton from "@material-ui/core/ToggleButton";
import ToggleButtonGroup from "@material-ui/core/ToggleButtonGroup";

// src/icons/utils/createSvgIcon.js
import { createSvgIcon } from "@material-ui/core/utils";

// src/icons/Share.tsx
var Share_default = createSvgIcon(/* @__PURE__ */ React.createElement("path", {
  key: "12",
  d: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
}), "Share");

// src/icons/TabletAndroid.tsx
var TabletAndroid_default = createSvgIcon(/* @__PURE__ */ React.createElement("path", {
  key: "12",
  d: "M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z"
}), "TabletAndroid");

// src/icons/Tv.tsx
var Tv_default = createSvgIcon(/* @__PURE__ */ React.createElement("path", {
  key: "12",
  d: "M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"
}), "Tv");

// src/icons/PhoneAndroid.tsx
var PhoneAndroid_default = createSvgIcon(/* @__PURE__ */ React.createElement("path", {
  key: "12",
  d: "M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z"
}), "PhoneAndroid");

// src/Qr.tsx
import Fab from "@material-ui/core/Fab";

// src/icons/QrCode.tsx
var QrCode_default = createSvgIcon(/* @__PURE__ */ React.createElement("path", {
  key: "12",
  d: "M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm8-12v8h8V3h-8zm6 6h-4V5h4v4zm0 10h2v2h-2zm-6-6h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm2 2h2v2h-2zm2-2h2v2h-2zm0-4h2v2h-2zm2 2h2v2h-2z"
}), "QrCode");

// src/Qr.tsx
var QR = ({ url }) => {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const load = async () => {
      const { QRious } = await Promise.resolve().then(() => (init_QRious(), QRious_exports));
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
      const qr = new QRious(options);
    };
    load();
  }, [url]);
  return /* @__PURE__ */ jsx("canvas", {
    css: css`
        border-radius: 16px;
        margin-bottom: 8px;
  `,
    ref: canvasRef
  });
};
var QRButton = ({ url }) => {
  const [showQR, setQR] = React.useState(false);
  return /* @__PURE__ */ jsx(motion.div, {
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
  }, showQR ? /* @__PURE__ */ jsx(QR, {
    key: url,
    url: url + "/edit/"
  }) : /* @__PURE__ */ jsx(Fab, {
    variant: "extended",
    color: "secondary",
    onClick: () => {
      setQR(!showQR);
    }
  }, /* @__PURE__ */ jsx(QrCode_default, null)));
};

// src/DraggableWindow.tsx
var breakPoints = [640, 1024, 1920];
var sizes = [10, 25, 50, 75, 100];
var DraggableWindow = ({ onShare, onRestore, position, session }) => {
  const [isStable, setIsStable] = React.useState(false);
  const [scaleRange, changeScaleRange] = React.useState(75);
  const [height, changeHeight] = React.useState(innerHeight);
  const [childArray, setChild] = React.useState([session.children]);
  session.setChild = setChild;
  const [qrUrl, setQRUrl] = React.useState(session.url);
  const [errorText, setErrorText] = React.useState(" ");
  const [width, setWidth] = React.useState(breakPoints[1]);
  const ref = React.useRef(null);
  const zbody = React.useRef(null);
  const child = childArray[childArray.length - 1];
  React.useEffect(() => {
    window.addEventListener("resize", () => changeHeight(innerHeight));
  });
  React.useEffect(() => {
    const handler = setInterval(() => {
      if (errorText !== session.errorText) {
        const newErr = session.errorText;
        setErrorText(newErr);
        setIsStable(false);
        setTimeout(() => {
          if (session.errorText === newErr) {
            setIsStable(true);
          }
        }, 2e3);
      }
      if (qrUrl !== session.url)
        setQRUrl(session.url);
    }, 200);
    return () => clearInterval(handler);
  }, [setErrorText, setQRUrl, errorText, qrUrl]);
  const scale = scaleRange / 100;
  return /* @__PURE__ */ jsx(motion.div, {
    ref,
    css: css`
            right: 20px;
            background-color:rgba(92 ,92, 152, 0.8);
            backdrop-filter: blur(10px);
            top: 20px;
            padding: 0px 0px 0px 16px;
            border-radius: 16px;
            white-space: normal;
            position: ${position ? position : "fixed"};
          `,
    dragElastic: 0.5,
    dragConstraints: {
      left: 0,
      right: 300,
      top: -height / 4,
      bottom: height / 2
    },
    dragMomentum: false,
    drag: true
  }, /* @__PURE__ */ jsx("div", {
    css: css` 
              display: flex;
                `
  }, /* @__PURE__ */ jsx("div", {
    css: css`
            display: flex;
            flex-direction: column;
            align-items: center;
          `
  }, /* @__PURE__ */ jsx(ToggleButtonGroup, {
    value: scaleRange,
    size: "small",
    exclusive: true,
    onChange: (_e, newScale) => newScale && changeScaleRange(newScale)
  }, sizes.map((size) => /* @__PURE__ */ jsx(ToggleButton, {
    key: size,
    value: size
  }, /* @__PURE__ */ jsx("span", {
    css: css`
                       color: ${size === scaleRange ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                       `
  }, size, "%")))), /* @__PURE__ */ jsx(motion.div, {
    animate: {
      width: width * scale / devicePixelRatio,
      height: height * scale
    },
    css: css`
              display: block;
              overflow: hidden;
              border-radius: 8px;
              opacity: 0.9;
           `
  }, errorText.trim() !== "" && /* @__PURE__ */ jsx("pre", {
    css: css`
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
  }, isStable && errorText.trim(), isStable && errorText.trim() !== "" && /* @__PURE__ */ jsx("div", {
    css: css`
                          text-align: right;
                        `
  }, /* @__PURE__ */ jsx(Button, {
    variant: "contained",
    onClick: () => {
      onRestore();
      setErrorText("");
    },
    color: "primary"
  }, "Restore"))), /* @__PURE__ */ jsx(motion.div, {
    animate: {
      transformOrigin: "top left",
      width: width / devicePixelRatio,
      height,
      scale
    },
    css: css`
                  overflow:overlay;
                  >div{
                    width:100%;
                    height:100%;
                    overflow: overlay;
                    background: white;
                  }
              `
  }, /* @__PURE__ */ jsx(React.Suspense, {
    fallback: /* @__PURE__ */ jsx("div", null, "Error fallback")
  }, /* @__PURE__ */ jsx("div", {
    id: "zbody",
    key: session.i,
    ref: zbody
  }, child)))), /* @__PURE__ */ jsx(ToggleButtonGroup, {
    value: width,
    size: "small",
    exclusive: true,
    onChange: (_e, newSize) => newSize && setWidth(newSize)
  }, breakPoints.map((size) => /* @__PURE__ */ jsx(ToggleButton, {
    key: size,
    value: size
  }, size === 640 ? /* @__PURE__ */ jsx(PhoneAndroid_default, {
    css: css`
                        color: ${width === 640 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `
  }) : size === 1024 ? /* @__PURE__ */ jsx(TabletAndroid_default, {
    css: css`
                        color: ${width === 1024 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `
  }) : /* @__PURE__ */ jsx(Tv_default, {
    css: css`
                        color: ${width === 1920 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                      `
  }))))), /* @__PURE__ */ jsx("div", {
    css: css`
              display: flex;
              align-items: center;          
              flex-direction: column;
              padding: 16px;
              `
  }, /* @__PURE__ */ jsx(QRButton, {
    url: qrUrl
  }), /* @__PURE__ */ jsx(Fab2, {
    variant: "extended",
    color: "primary",
    onClick: () => {
      onShare();
    }
  }, /* @__PURE__ */ jsx(Share_default, null)))));
};

// src/renderer.ts
var { motion } = Motion;
var render = (el, container) => {
  const root = createRoot(container);
  root.render(jsx(Fragment, { children: el }));
};
var renderer_default = React;
export {
  DraggableWindow,
  Fragment,
  Global,
  Motion,
  React,
  css,
  renderer_default as default,
  jsx,
  motion,
  render
};

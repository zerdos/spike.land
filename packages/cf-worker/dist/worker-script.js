const sha256 = async (x) =>
  Array.from(
    new Uint8Array(
      await crypto.subtle.digest(
        "SHA-256",
        typeof x === "string" ? new TextEncoder().encode(x) : x,
      ),
    ).slice(0, 4),
  ).map((b) => ("00" + b.toString(16)).slice(-2)).join("");
(function (d, w) {
  typeof exports == "object" && typeof module != "undefined"
    ? w(exports)
    : typeof define == "function" && define.amd
    ? define([
      "exports",
    ], w)
    : (d = d || self, w(d.Diff = {}));
})(this, function (d) {
  "use strict";
  function w() {
  }
  w.prototype = {
    diff: function (n, t) {
      var r = arguments.length > 2 && arguments[2] !== void 0
          ? arguments[2]
          : {},
        f = r.callback;
      typeof r == "function" && (f = r, r = {}), this.options = r;
      var i = this;
      function l(c) {
        return f
          ? (setTimeout(function () {
            f(void 0, c);
          }, 0),
            !0)
          : c;
      }
      n = this.castInput(n),
        t = this.castInput(t),
        n = this.removeEmpty(this.tokenize(n)),
        t = this.removeEmpty(this.tokenize(t));
      var s = t.length,
        o = n.length,
        u = 1,
        p = s + o,
        v = [
          {
            newPos: -1,
            components: [],
          },
        ],
        a = this.extractCommon(v[0], t, n, 0);
      if (v[0].newPos + 1 >= s && a + 1 >= o) {
        return l([
          {
            value: this.join(t),
            count: t.length,
          },
        ]);
      }
      function h() {
        for (var c = -1 * u; c <= u; c += 2) {
          var L = void 0,
            x = v[c - 1],
            m = v[c + 1],
            F = (m ? m.newPos : 0) - c;
          x && (v[c - 1] = void 0);
          var y = x && x.newPos + 1 < s, E = m && 0 <= F && F < o;
          if (!y && !E) {
            v[c] = void 0;
            continue;
          }
          if (
            !y || E && x.newPos < m.newPos
              ? (L = I(m), i.pushComponent(L.components, void 0, !0))
              : (L = x, L.newPos++, i.pushComponent(L.components, !0, void 0)),
              F = i.extractCommon(L, t, n, c),
              L.newPos + 1 >= s && F + 1 >= o
          ) {
            return l(H(i, L.components, t, n, i.useLongestToken));
          }
          v[c] = L;
        }
        u++;
      }
      if (f) {
        (function c() {
          setTimeout(function () {
            if (u > p) return f();
            h() || c();
          }, 0);
        })();
      } else {
        for (; u <= p;) {
          var g = h();
          if (g) return g;
        }
      }
    },
    pushComponent: function (n, t, r) {
      var f = n[n.length - 1];
      f && f.added === t && f.removed === r
        ? n[n.length - 1] = {
          count: f.count + 1,
          added: t,
          removed: r,
        }
        : n.push({
          count: 1,
          added: t,
          removed: r,
        });
    },
    extractCommon: function (n, t, r, f) {
      for (
        var i = t.length, l = r.length, s = n.newPos, o = s - f, u = 0;
        s + 1 < i && o + 1 < l && this.equals(t[s + 1], r[o + 1]);
      ) {
        s++, o++, u++;
      }
      return u && n.components.push({
        count: u,
      }),
        n.newPos = s,
        o;
    },
    equals: function (n, t) {
      return this.options.comparator
        ? this.options.comparator(n, t)
        : n === t ||
          this.options.ignoreCase && n.toLowerCase() === t.toLowerCase();
    },
    removeEmpty: function (n) {
      for (var t = [], r = 0; r < n.length; r++) n[r] && t.push(n[r]);
      return t;
    },
    castInput: function (n) {
      return n;
    },
    tokenize: function (n) {
      return n.split("");
    },
    join: function (n) {
      return n.join("");
    },
  };
  function H(e, n, t, r, f) {
    for (var i = 0, l = n.length, s = 0, o = 0; i < l; i++) {
      var u = n[i];
      if (u.removed) {
        if (
          (u.value = e.join(r.slice(o, o + u.count)),
            o += u.count,
            i && n[i - 1].added)
        ) {
          var v = n[i - 1];
          n[i - 1] = n[i], n[i] = v;
        }
      } else {
        if (!u.added && f) {
          var p = t.slice(s, s + u.count);
          p = p.map(function (h, g) {
            var c = r[o + g];
            return c.length > h.length ? c : h;
          }), u.value = e.join(p);
        } else u.value = e.join(t.slice(s, s + u.count));
        s += u.count, u.added || (o += u.count);
      }
    }
    var a = n[l - 1];
    return (l > 1 && typeof a.value == "string" && (a.added || a.removed) &&
      e.equals("", a.value) && (n[l - 2].value += a.value, n.pop()),
      n);
  }
  function I(e) {
    return {
      newPos: e.newPos,
      components: e.components.slice(0),
    };
  }
  var S = new w();
  function W(e, n, t) {
    return S.diff(e, n, t);
  }
  function $(e, n) {
    if (typeof e == "function") n.callback = e;
    else if (e) for (var t in e) e.hasOwnProperty(t) && (n[t] = e[t]);
    return n;
  }
  var P = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,
    fe = /\S/,
    U = new w();
  U.equals = function (e, n) {
    return this.options.ignoreCase &&
      (e = e.toLowerCase(), n = n.toLowerCase()),
      e === n || this.options.ignoreWhitespace && !fe.test(e) && !fe.test(n);
  },
    U.tokenize = function (e) {
      for (
        var n = e.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/), t = 0;
        t < n.length - 1;
        t++
      ) {
        !n[t + 1] && n[t + 2] && P.test(n[t]) && P.test(n[t + 2]) &&
          (n[t] += n[t + 2], n.splice(t + 1, 2), t--);
      }
      return n;
    };
  function me(e, n, t) {
    return (t = $(t, {
      ignoreWhitespace: !0,
    }),
      U.diff(e, n, t));
  }
  function xe(e, n, t) {
    return U.diff(e, n, t);
  }
  var V = new w();
  V.tokenize = function (e) {
    var n = [], t = e.split(/(\n|\r\n)/);
    t[t.length - 1] || t.pop();
    for (var r = 0; r < t.length; r++) {
      var f = t[r];
      r % 2 && !this.options.newlineIsToken
        ? n[n.length - 1] += f
        : (this.options.ignoreWhitespace && (f = f.trim()), n.push(f));
    }
    return n;
  };
  function le(e, n, t) {
    return V.diff(e, n, t);
  }
  function Fe(e, n, t) {
    var r = $(t, {
      ignoreWhitespace: !0,
    });
    return V.diff(e, n, r);
  }
  var se = new w();
  se.tokenize = function (e) {
    return e.split(/(\S.+?[.!?])(?=\s+|$)/);
  };
  function Ne(e, n, t) {
    return se.diff(e, n, t);
  }
  var oe = new w();
  oe.tokenize = function (e) {
    return e.split(/([{}:;,]|\s+)/);
  };
  function Se(e, n, t) {
    return oe.diff(e, n, t);
  }
  function X(e) {
    return (typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
      ? X = function (n) {
        return typeof n;
      }
      : X = function (n) {
        return n && typeof Symbol == "function" && n.constructor === Symbol &&
            n !== Symbol.prototype
          ? "symbol"
          : typeof n;
      },
      X(e));
  }
  function b(e) {
    return He(e) || Ie(e) || be(e) || Ee();
  }
  function He(e) {
    if (Array.isArray(e)) return j(e);
  }
  function Ie(e) {
    if (
      typeof Symbol != "undefined" && Symbol.iterator in Object(e)
    ) {
      return Array.from(e);
    }
  }
  function be(e, n) {
    if (!e) return;
    if (typeof e == "string") return j(e, n);
    var t = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (t === "Object" && e.constructor && (t = e.constructor.name),
        t === "Map" || t === "Set")
    ) {
      return Array.from(e);
    }
    if (
      t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
    ) {
      return j(e, n);
    }
  }
  function j(e, n) {
    (n == null || n > e.length) && (n = e.length);
    for (var t = 0, r = new Array(n); t < n; t++) r[t] = e[t];
    return r;
  }
  function Ee() {
    throw new TypeError(
      `Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.`,
    );
  }
  var Ae = Object.prototype.toString, J = new w();
  J.useLongestToken = !0,
    J.tokenize = V.tokenize,
    J.castInput = function (e) {
      var n = this.options,
        t = n.undefinedReplacement,
        r = n.stringifyReplacer,
        f = r === void 0
          ? function (i, l) {
            return typeof l == "undefined" ? t : l;
          }
          : r;
      return typeof e == "string"
        ? e
        : JSON.stringify(Z(e, null, null, f), f, "  ");
    },
    J.equals = function (e, n) {
      return w.prototype.equals.call(
        J,
        e.replace(/,([\r\n])/g, "$1"),
        n.replace(/,([\r\n])/g, "$1"),
      );
    };
  function Te(e, n, t) {
    return J.diff(e, n, t);
  }
  function Z(e, n, t, r, f) {
    n = n || [], t = t || [], r && (e = r(f, e));
    var i;
    for (i = 0; i < n.length; i += 1) if (n[i] === e) return t[i];
    var l;
    if (Ae.call(e) === "[object Array]") {
      for (
        (n.push(e), l = new Array(e.length), t.push(l), i = 0);
        i < e.length;
        i += 1
      ) {
        l[i] = Z(e[i], n, t, r, f);
      }
      return (n.pop(), t.pop(), l);
    }
    if ((e && e.toJSON && (e = e.toJSON()), X(e) === "object" && e !== null)) {
      n.push(e), l = {}, t.push(l);
      var s = [], o;
      for (o in e) e.hasOwnProperty(o) && s.push(o);
      for ((s.sort(), i = 0); i < s.length; i += 1) {o = s[i],
          l[o] = Z(e[o], n, t, r, o);}
      n.pop(), t.pop();
    } else l = e;
    return l;
  }
  var B = new w();
  B.tokenize = function (e) {
    return e.slice();
  },
    B.join = B.removeEmpty = function (e) {
      return e;
    };
  function Oe(e, n, t) {
    return B.diff(e, n, t);
  }
  function G(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      t = e.split(/\r\n|[\n\v\f\r\x85]/),
      r = e.match(/\r\n|[\n\v\f\r\x85]/g) || [],
      f = [],
      i = 0;
    function l() {
      var u = {};
      for (f.push(u); i < t.length;) {
        var p = t[i];
        if (/^(\-\-\-|\+\+\+|@@)\s/.test(p)) break;
        var v = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(p);
        v && (u.index = v[1]), i++;
      }
      for ((s(u), s(u), u.hunks = []); i < t.length;) {
        var a = t[i];
        if (/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(a)) break;
        if (/^@@/.test(a)) u.hunks.push(o());
        else {
          if (a && n.strict) {
            throw new Error(
              "Unknown line " + (i + 1) + " " + JSON.stringify(a),
            );
          }
          i++;
        }
      }
    }
    function s(u) {
      var p = /^(---|\+\+\+)\s+(.*)$/.exec(t[i]);
      if (p) {
        var v = p[1] === "---" ? "old" : "new",
          a = p[2].split("	", 2),
          h = a[0].replace(/\\\\/g, "\\");
        /^".*"$/.test(h) && (h = h.substr(1, h.length - 2)),
          u[v + "FileName"] = h,
          u[v + "Header"] = (a[1] || "").trim(),
          i++;
      }
    }
    function o() {
      var u = i,
        p = t[i++],
        v = p.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/),
        a = {
          oldStart: +v[1],
          oldLines: typeof v[2] == "undefined" ? 1 : +v[2],
          newStart: +v[3],
          newLines: typeof v[4] == "undefined" ? 1 : +v[4],
          lines: [],
          linedelimiters: [],
        };
      a.oldLines === 0 && (a.oldStart += 1),
        a.newLines === 0 && (a.newStart += 1);
      for (
        var h = 0, g = 0;
        i < t.length &&
        !(t[i].indexOf("--- ") === 0 && i + 2 < t.length &&
          t[i + 1].indexOf("+++ ") === 0 && t[i + 2].indexOf("@@") === 0);
        i++
      ) {
        var c = t[i].length == 0 && i != t.length - 1 ? " " : t[i][0];
        if (
          c === "+" || c === "-" || c === " " || c === "\\"
        ) {
          a.lines.push(t[i]),
            a.linedelimiters.push(r[i] || `\n`),
            c === "+" ? h++ : c === "-" ? g++ : c === " " && (h++, g++);
        } else break;
      }
      if (
        (!h && a.newLines === 1 && (a.newLines = 0),
          !g && a.oldLines === 1 && (a.oldLines = 0),
          n.strict)
      ) {
        if (h !== a.newLines) {
          throw new Error(
            "Added line count did not match for hunk at line " + (u + 1),
          );
        }
        if (g !== a.oldLines) {
          throw new Error(
            "Removed line count did not match for hunk at line " + (u + 1),
          );
        }
      }
      return a;
    }
    for (; i < t.length;) l();
    return f;
  }
  function ze(e, n, t) {
    var r = !0, f = !1, i = !1, l = 1;
    return function s() {
      if (r && !i) {
        if ((f ? l++ : r = !1, e + l <= t)) return l;
        i = !0;
      }
      if (!f) return (i || (r = !0), n <= e - l ? -l++ : (f = !0, s()));
    };
  }
  function ue(e, n) {
    var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if ((typeof n == "string" && (n = G(n)), Array.isArray(n))) {
      if (n.length > 1) {
        throw new Error("applyPatch only works with a single input.");
      }
      n = n[0];
    }
    var r = e.split(/\r\n|[\n\v\f\r\x85]/),
      f = e.match(/\r\n|[\n\v\f\r\x85]/g) || [],
      i = n.hunks,
      l = t.compareLine || function (re, D, K, C) {
        return D === C;
      },
      s = 0,
      o = t.fuzzFactor || 0,
      u = 0,
      p = 0,
      v,
      a;
    function h(re, D) {
      for (var K = 0; K < re.lines.length; K++) {
        var C = re.lines[K],
          ie = C.length > 0 ? C[0] : " ",
          Ze = C.length > 0 ? C.substr(1) : C;
        if (ie === " " || ie === "-") {
          if (!l(D + 1, r[D], ie, Ze) && (s++, s > o)) return !1;
          D++;
        }
      }
      return !0;
    }
    for (var g = 0; g < i.length; g++) {
      for (
        var c = i[g],
          L = r.length - c.oldLines,
          x = 0,
          m = p + c.oldStart - 1,
          F = ze(m, u, L);
        x !== void 0;
        x = F()
      ) {
        if (h(c, m + x)) {
          c.offset = p += x;
          break;
        }
      }
      if (x === void 0) return !1;
      u = c.offset + c.oldStart + c.oldLines;
    }
    for (var y = 0, E = 0; E < i.length; E++) {
      var N = i[E], A = N.oldStart + N.offset + y - 1;
      y += N.newLines - N.oldLines;
      for (var T = 0; T < N.lines.length; T++) {
        var O = N.lines[T],
          z = O.length > 0 ? O[0] : " ",
          Y = O.length > 0 ? O.substr(1) : O,
          te = N.linedelimiters[T];
        if (z === " ") A++;
        else if (z === "-") r.splice(A, 1), f.splice(A, 1);
        else if (z === "+") r.splice(A, 0, Y), f.splice(A, 0, te), A++;
        else if (z === "\\") {
          var R = N.lines[T - 1] ? N.lines[T - 1][0] : null;
          R === "+" ? v = !0 : R === "-" && (a = !0);
        }
      }
    }
    if (v) for (; !r[r.length - 1];) r.pop(), f.pop();
    else a && (r.push(""), f.push(`\n`));
    for (var q = 0; q < r.length - 1; q++) r[q] = r[q] + f[q];
    return r.join("");
  }
  function We(e, n) {
    typeof e == "string" && (e = G(e));
    var t = 0;
    function r() {
      var f = e[t++];
      if (!f) return n.complete();
      n.loadFile(f, function (i, l) {
        if (i) return n.complete(i);
        var s = ue(l, f, n);
        n.patched(f, s, function (o) {
          if (o) return n.complete(o);
          r();
        });
      });
    }
    r();
  }
  function _(e, n, t, r, f, i, l) {
    l || (l = {}), typeof l.context == "undefined" && (l.context = 4);
    var s = le(t, r, l);
    s.push({
      value: "",
      lines: [],
    });
    function o(x) {
      return x.map(function (m) {
        return " " + m;
      });
    }
    for (
      var u = [],
        p = 0,
        v = 0,
        a = [],
        h = 1,
        g = 1,
        c = function (m) {
          var F = s[m], y = F.lines || F.value.replace(/\n$/, "").split(`\n`);
          if ((F.lines = y, F.added || F.removed)) {
            var E;
            if (!p) {
              var N = s[m - 1];
              p = h,
                v = g,
                N &&
                (a = l.context > 0 ? o(N.lines.slice(-l.context)) : [],
                  p -= a.length,
                  v -= a.length);
            }
            (E = a).push.apply(
              E,
              b(y.map(function (q) {
                return (F.added ? "+" : "-") + q;
              })),
            ), F.added ? g += y.length : h += y.length;
          } else {
            if (p) {
              if (y.length <= l.context * 2 && m < s.length - 2) {
                var A;
                (A = a).push.apply(A, b(o(y)));
              } else {
                var T, O = Math.min(y.length, l.context);
                (T = a).push.apply(T, b(o(y.slice(0, O))));
                var z = {
                  oldStart: p,
                  oldLines: h - p + O,
                  newStart: v,
                  newLines: g - v + O,
                  lines: a,
                };
                if (m >= s.length - 2 && y.length <= l.context) {
                  var Y = /\n$/.test(t),
                    te = /\n$/.test(r),
                    R = y.length == 0 && a.length > z.oldLines;
                  !Y && R && t.length > 0 &&
                  a.splice(z.oldLines, 0, "\\ No newline at end of file"),
                    (!Y && !R || !te) && a.push("\\ No newline at end of file");
                }
                u.push(z), p = 0, v = 0, a = [];
              }
            }
            h += y.length, g += y.length;
          }
        },
        L = 0;
      L < s.length;
      L++
    ) {
      c(L);
    }
    return {
      oldFileName: e,
      newFileName: n,
      oldHeader: f,
      newHeader: i,
      hunks: u,
    };
  }
  function Me(e) {
    var n = [];
    e.oldFileName == e.newFileName && n.push("Index: " + e.oldFileName),
      n.push(
        "===================================================================",
      ),
      n.push(
        "--- " + e.oldFileName + (typeof e.oldHeader == "undefined"
          ? ""
          : "	" + e.oldHeader),
      ),
      n.push(
        "+++ " + e.newFileName + (typeof e.newHeader == "undefined"
          ? ""
          : "	" + e.newHeader),
      );
    for (var t = 0; t < e.hunks.length; t++) {
      var r = e.hunks[t];
      r.oldLines === 0 && (r.oldStart -= 1),
        r.newLines === 0 && (r.newStart -= 1),
        n.push(
          "@@ -" + r.oldStart + "," + r.oldLines + " +" + r.newStart + "," +
            r.newLines + " @@",
        ),
        n.push.apply(n, r.lines);
    }
    return n.join(`\n`) + `\n`;
  }
  function ae(e, n, t, r, f, i, l) {
    return Me(_(e, n, t, r, f, i, l));
  }
  function qe(e, n, t, r, f, i) {
    return ae(e, e, n, t, r, f, i);
  }
  function Ce(e, n) {
    return e.length !== n.length ? !1 : k(e, n);
  }
  function k(e, n) {
    if (n.length > e.length) return !1;
    for (var t = 0; t < n.length; t++) if (n[t] !== e[t]) return !1;
    return !0;
  }
  function Je(e) {
    var n = ne(e.lines), t = n.oldLines, r = n.newLines;
    t !== void 0 ? e.oldLines = t : delete e.oldLines,
      r !== void 0 ? e.newLines = r : delete e.newLines;
  }
  function $e(e, n, t) {
    e = de(e, t), n = de(n, t);
    var r = {};
    (e.index || n.index) && (r.index = e.index || n.index),
      (e.newFileName || n.newFileName) &&
      (ce(e)
        ? ce(n)
          ? (r.oldFileName = Q(r, e.oldFileName, n.oldFileName),
            r.newFileName = Q(r, e.newFileName, n.newFileName),
            r.oldHeader = Q(r, e.oldHeader, n.oldHeader),
            r.newHeader = Q(r, e.newHeader, n.newHeader))
          : (r.oldFileName = e.oldFileName,
            r.newFileName = e.newFileName,
            r.oldHeader = e.oldHeader,
            r.newHeader = e.newHeader)
        : (r.oldFileName = n.oldFileName || e.oldFileName,
          r.newFileName = n.newFileName || e.newFileName,
          r.oldHeader = n.oldHeader || e.oldHeader,
          r.newHeader = n.newHeader || e.newHeader)),
      r.hunks = [];
    for (
      var f = 0, i = 0, l = 0, s = 0; f < e.hunks.length || i < n.hunks.length;
    ) {
      var o = e.hunks[f] || {
          oldStart: Infinity,
        },
        u = n.hunks[i] || {
          oldStart: Infinity,
        };
      if (pe(o, u)) r.hunks.push(ve(o, l)), f++, s += o.newLines - o.oldLines;
      else if (pe(u, o)) {
        r.hunks.push(ve(u, s)), i++, l += u.newLines - u.oldLines;
      } else {
        var p = {
          oldStart: Math.min(o.oldStart, u.oldStart),
          oldLines: 0,
          newStart: Math.min(o.newStart + l, u.oldStart + s),
          newLines: 0,
          lines: [],
        };
        Re(p, o.oldStart, o.lines, u.oldStart, u.lines),
          i++,
          f++,
          r.hunks.push(p);
      }
    }
    return r;
  }
  function de(e, n) {
    if (typeof e == "string") {
      if (/^@@/m.test(e) || /^Index:/m.test(e)) return G(e)[0];
      if (!n) {
        throw new Error("Must provide a base reference or pass in a patch");
      }
      return _(void 0, void 0, n, e);
    }
    return e;
  }
  function ce(e) {
    return e.newFileName && e.newFileName !== e.oldFileName;
  }
  function Q(e, n, t) {
    return n === t ? n : (e.conflict = !0, {
      mine: n,
      theirs: t,
    });
  }
  function pe(e, n) {
    return e.oldStart < n.oldStart && e.oldStart + e.oldLines < n.oldStart;
  }
  function ve(e, n) {
    return {
      oldStart: e.oldStart,
      oldLines: e.oldLines,
      newStart: e.newStart + n,
      newLines: e.newLines,
      lines: e.lines,
    };
  }
  function Re(e, n, t, r, f) {
    var i = {
        offset: n,
        lines: t,
        index: 0,
      },
      l = {
        offset: r,
        lines: f,
        index: 0,
      };
    for (
      (we(e, i, l), we(e, l, i));
      i.index < i.lines.length && l.index < l.lines.length;
    ) {
      var s = i.lines[i.index], o = l.lines[l.index];
      if ((s[0] === "-" || s[0] === "+") && (o[0] === "-" || o[0] === "+")) {
        De(e, i, l);
      } else if (s[0] === "+" && o[0] === " ") {
        var u;
        (u = e.lines).push.apply(u, b(M(i)));
      } else if (o[0] === "+" && s[0] === " ") {
        var p;
        (p = e.lines).push.apply(p, b(M(l)));
      } else {
        s[0] === "-" && o[0] === " "
          ? he(e, i, l)
          : o[0] === "-" && s[0] === " "
          ? he(e, l, i, !0)
          : s === o
          ? (e.lines.push(s), i.index++, l.index++)
          : ee(e, M(i), M(l));
      }
    }
    ge(e, i), ge(e, l), Je(e);
  }
  function De(e, n, t) {
    var r = M(n), f = M(t);
    if (ye(r) && ye(f)) {
      if (k(r, f) && Le(t, r, r.length - f.length)) {
        var i;
        (i = e.lines).push.apply(i, b(r));
        return;
      } else if (k(f, r) && Le(n, f, f.length - r.length)) {
        var l;
        (l = e.lines).push.apply(l, b(f));
        return;
      }
    } else if (Ce(r, f)) {
      var s;
      (s = e.lines).push.apply(s, b(r));
      return;
    }
    ee(e, r, f);
  }
  function he(e, n, t, r) {
    var f = M(n), i = Pe(t, f);
    if (i.merged) {
      var l;
      (l = e.lines).push.apply(l, b(i.merged));
    } else ee(e, r ? i : f, r ? f : i);
  }
  function ee(e, n, t) {
    e.conflict = !0,
      e.lines.push({
        conflict: !0,
        mine: n,
        theirs: t,
      });
  }
  function we(e, n, t) {
    for (; n.offset < t.offset && n.index < n.lines.length;) {
      var r = n.lines[n.index++];
      e.lines.push(r), n.offset++;
    }
  }
  function ge(e, n) {
    for (; n.index < n.lines.length;) {
      var t = n.lines[n.index++];
      e.lines.push(t);
    }
  }
  function M(e) {
    for (var n = [], t = e.lines[e.index][0]; e.index < e.lines.length;) {
      var r = e.lines[e.index];
      if ((t === "-" && r[0] === "+" && (t = "+"), t === r[0])) {
        n.push(r), e.index++;
      } else break;
    }
    return n;
  }
  function Pe(e, n) {
    for (
      var t = [], r = [], f = 0, i = !1, l = !1;
      f < n.length && e.index < e.lines.length;
    ) {
      var s = e.lines[e.index], o = n[f];
      if (o[0] === "+") break;
      if ((i = i || s[0] !== " ", r.push(o), f++, s[0] === "+")) {
        for (l = !0; s[0] === "+";) {
          t.push(s), s = e.lines[++e.index];
        }
      }
      o.substr(1) === s.substr(1) ? (t.push(s), e.index++) : l = !0;
    }
    if (((n[f] || "")[0] === "+" && i && (l = !0), l)) return t;
    for (; f < n.length;) r.push(n[f++]);
    return {
      merged: r,
      changes: t,
    };
  }
  function ye(e) {
    return e.reduce(function (n, t) {
      return n && t[0] === "-";
    }, !0);
  }
  function Le(e, n, t) {
    for (var r = 0; r < t; r++) {
      var f = n[n.length - t + r].substr(1);
      if (e.lines[e.index + r] !== " " + f) return !1;
    }
    return (e.index += t, !0);
  }
  function ne(e) {
    var n = 0, t = 0;
    return (e.forEach(function (r) {
      if (typeof r != "string") {
        var f = ne(r.mine), i = ne(r.theirs);
        n !== void 0 &&
        (f.oldLines === i.oldLines ? n += f.oldLines : n = void 0),
          t !== void 0 &&
          (f.newLines === i.newLines ? t += f.newLines : t = void 0);
      } else {
        t !== void 0 && (r[0] === "+" || r[0] === " ") && t++,
          n !== void 0 && (r[0] === "-" || r[0] === " ") && n++;
      }
    }),
      {
        oldLines: n,
        newLines: t,
      });
  }
  function Ue(e) {
    for (var n = [], t, r, f = 0; f < e.length; f++) {
      t = e[f],
        t.added ? r = 1 : t.removed ? r = -1 : r = 0,
        n.push([
          r,
          t.value,
        ]);
    }
    return n;
  }
  function Ve(e) {
    for (var n = [], t = 0; t < e.length; t++) {
      var r = e[t];
      r.added ? n.push("<ins>") : r.removed && n.push("<del>"),
        n.push(Xe(r.value)),
        r.added ? n.push("</ins>") : r.removed && n.push("</del>");
    }
    return n.join("");
  }
  function Xe(e) {
    var n = e;
    return (n = n.replace(/&/g, "&amp;"),
      n = n.replace(/</g, "&lt;"),
      n = n.replace(/>/g, "&gt;"),
      n = n.replace(/"/g, "&quot;"),
      n);
  }
  d.Diff = w,
    d.applyPatch = ue,
    d.applyPatches = We,
    d.canonicalize = Z,
    d.convertChangesToDMP = Ue,
    d.convertChangesToXML = Ve,
    d.createPatch = qe,
    d.createTwoFilesPatch = ae,
    d.diffArrays = Oe,
    d.diffChars = W,
    d.diffCss = Se,
    d.diffJson = Te,
    d.diffLines = le,
    d.diffSentences = Ne,
    d.diffTrimmedLines = Fe,
    d.diffWords = me,
    d.diffWordsWithSpace = xe,
    d.merge = $e,
    d.parsePatch = G,
    d.structuredPatch = _,
    Object.defineProperty(d, "__esModule", {
      value: !0,
    });
});
const Be = async (d) =>
  Array.from(
    new Uint8Array(
      await crypto.subtle.digest(
        "SHA-256",
        typeof d == "string" ? new TextEncoder().encode(d) : d,
      ),
    ).slice(0, 4),
  ).map((w) => ("00" + w.toString(16)).slice(-2)).join("");
const diff = async (d, w) => {
    const H = Be(d), I = Diff.diffChars(d, w);
    return {
      b: await H,
      c: I.map((S) => S.added ? S.value : S.removed ? -S.count : S.count),
    };
  },
  isDiff = (d) => {
    if (d.length < 10) return !1;
    const w = [
        ...d.slice(0, 8),
      ].filter((I) => I < "0" || I > "f").length === 0,
      H = d.slice(8);
    if (w && H[0] === "[" && H[H.length - 1] === "]") {
      try {
        return JSON.parse(H).length > 1;
      } catch {
        return !1;
      }
    }
    return !1;
  },
  assemble = (d, w) => {
    const H = JSON.parse(w);
    let I = d.slice(), S = "";
    return H.forEach((W) => {
      if (Number(W) === W) {
        const $ = Math.abs(W), P = I.slice(0, $);
        I = I.slice($), W > 0 && (S += String(P));
      } else S += String(W);
    }),
      S;
  };
const getDbObj = (dbPromise, isIdb = false) => {
  const sha2561 = async (x) =>
    Array.from(
      new Uint8Array(
        await crypto.subtle.digest(
          "SHA-256",
          typeof x === "string" ? new TextEncoder().encode(x) : x,
        ),
      ).slice(0, 4),
    ).map((b) => ("00" + b.toString(16)).slice(-2)).join("");
  const dbObj = {
    async get(key, format = "string") {
      let data;
      try {
        if (isIdb) {
          data = await (await dbPromise).get("codeStore", key);
        } else {
          data = await dbPromise.get(key);
        }
        if (!data) {
          return null;
        }
      } catch (_) {
        return null;
      }
      if (format === "json") {
        return JSON.parse(data);
      }
      if (format === "string") {
        const allData = await data;
        if (typeof allData === "string" && format === "string") {
          const text = allData;
          if (isDiff(allData)) {
            const keyOfDiff = allData.slice(0, 8);
            const instructions = allData.slice(8);
            const oldValue = await dbObj.get(keyOfDiff);
            return assemble(oldValue, instructions);
          }
          return allData;
        }
        return new TextDecoder().decode(allData);
      }
      return data;
    },
    async put(key, val) {
      let prev;
      try {
        const oldKey = await dbObj.get(key);
        if (
          typeof oldKey === "string" && typeof val === "string" &&
          oldKey.length === 8 && oldKey !== val
        ) {
          const actualValue = await dbObj.get(val);
          const prevValue = await dbObj.get(oldKey);
          if (typeof prevValue === "string") {
            const prevSha = await sha2561(prevValue);
            if (prevSha === oldKey) {
              const diffObj = await diff(actualValue, prevValue);
              const diffAsStr = diffObj.b + JSON.stringify(diffObj.c);
              dbObj.put(prevSha, diffAsStr);
            }
          }
        }
      } catch {
        prev = "";
      }
      if (prev !== "" && val === prev) {
        return val;
      }
      let str;
      if (typeof val !== "string") {
        str = new TextDecoder().decode(val);
      } else {
        str = val;
      }
      if (isIdb) {
        return (await dbPromise).put("codeStore", str, key);
      } else {
        return await dbPromise.put(key, str);
      }
    },
    async delete(key) {
      return (await dbPromise).delete("codeStore", key);
    },
    async clear() {
      return (await dbPromise).clear("codeStore");
    },
    async keys() {
      return (await dbPromise).getAllKeys("codeStore");
    },
  };
  return dbObj;
};
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues =
      typeof crypto !== "undefined" && crypto.getRandomValues &&
        crypto.getRandomValues.bind(crypto) ||
      typeof msCrypto !== "undefined" &&
        typeof msCrypto.getRandomValues === "function" &&
        msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error(
        "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported",
      );
    }
  }
  return getRandomValues(rnds8);
}
const __default =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function validate(uuid) {
  return typeof uuid === "string" && __default.test(uuid);
}
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).substr(1));
}
function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined
    ? arguments[1]
    : 0;
  var uuid =
    (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] +
      byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" +
      byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" +
      byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" +
      byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" +
      byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] +
      byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] +
      byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  if (!validate(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (var i1 = 0; i1 < 16; ++i1) {
      buf[offset + i1] = rnds[i1];
    }
    return buf;
  }
  return stringify(rnds);
}
const v41 = () => v4();
var SHAKV;
var USERS;
var LOGS;
var USERKEYS;
var API_KEY;
let now = 0;
function log(message, data = {}) {
  now = now || Date.now();
  const [hour, minute] = new Date().toLocaleTimeString("en-US").split(/:| /);
  return LOGS.put(
    String(2000000000000 - now++),
    JSON.stringify({
      message,
      time: `${hour}:${minute}`,
      data,
    }),
    {
      expirationTtl: 86400 * 7,
    },
  );
}
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
};
function json(resp) {
  return new Response(JSON.stringify(resp), {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}
function text(resp) {
  return new Response(resp, {
    headers: {
      ...corsHeaders,
      "Content-Type": "text/html;charset=UTF-8",
    },
  });
}
function js(resp) {
  return new Response(resp, {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/javascript;charset=UTF-8",
    },
  });
}
function handleOptions(request) {
  const headers = request.headers;
  if (
    headers.get("Origin") !== null &&
    headers.get("Access-Control-Request-Method") !== null &&
    headers.get("Access-Control-Request-Headers") !== null
  ) {
    const respHeaders = {
      ...corsHeaders,
      "Access-Control-Allow-Headers": request.headers.get(
        "Access-Control-Request-Headers",
      ),
    };
    return new Response(null, {
      headers: respHeaders,
    });
  } else {
    return new Response(null, {
      headers: {
        Allow: corsHeaders["Access-Control-Allow-Methods"],
      },
    });
  }
}
async function handleAdmin(request, searchParams, pathname, SHAKV1) {
  if (pathname === "/keys/") {
    const prefix = searchParams.get("prefix");
    const value = await SHAKV1.list({
      prefix,
    });
    return json(value);
  }
  if (pathname === "/keys/delete/") {
    const hash = searchParams.get("hash");
    const value = await SHAKV1.delete(hash);
    return json(value);
  }
  return json({
    error: "not implemented",
  });
}
async function handleCloudRequest(request) {
  const { country, colo } = request.cf || {
    country: "",
    colo: "",
  };
  const url = new URL(request.url);
  const { searchParams, pathname } = url;
  const psk = String(request.headers.get("API_KEY") || "");
  log("request", {
    searchParams,
    pathname,
    country,
    colo,
  });
  if (request.method === "GET" && psk && psk == API_KEY) {
    return handleAdmin(request, searchParams, pathname, SHAKV);
  } else if (request.method === "GET") {
    if (pathname === "/robots.txt") {
      return text("User-agent: * Disallow: /");
    }
    if (pathname === "/connect") {
      if (searchParams.get("key")) {
        const key = searchParams.get("key");
        const tokenKey = key.slice(0, 8);
        const userIdKey = key.slice(8, 16);
        const pass = key.slice(16, 24);
        const tokenPassUserId = key.slice(24, 32);
        const checkTokenPassUserId = await sha256(tokenKey + userIdKey);
        if (
          !tokenKey || !userIdKey || !pass ||
          checkTokenPassUserId !== tokenPassUserId
        ) {
          return json({
            error: "auth error",
          });
        }
        const uuid = await USERKEYS.get(userIdKey);
        if (uuid === null) {
          return json({
            error: 401,
          });
        }
        const tokenUuid = await USERKEYS.get(tokenKey);
        if (tokenUuid === null) {
          return json({
            error: 404,
            message: "token not found",
          });
        }
        const checkPass = await sha256(tokenKey + uuid);
        const checkPassToken = await sha256(tokenUuid + uuid);
        if (checkPass === pass) {
          await USERS.put(
            tokenUuid,
            JSON.stringify({
              uuid,
              connected: userIdKey,
            }),
            {
              expirationTtl: 60,
            },
          );
          return json({
            success: true,
          });
        } else if (checkPassToken === pass) {
          return json({
            success: true,
          });
        }
        return json({
          error: 401,
        });
      }
    }
    if (pathname === "/check") {
      const key = searchParams.get("key");
      if (key === null) return new Response("500");
      const waitForChange = async () => {
        const uuid = await USERKEYS.get(key);
        if (!uuid) return null;
        const data = await USERS.get(uuid, "json");
        if (!data || data.connected) {
          return data;
        }
        return new Promise((resolve) => {
          const clear = setInterval(async () => {
            const data1 = await USERS.get(uuid, "json");
            if (!data1 || data1.connected) {
              clearInterval(clear);
              resolve(data1);
            }
          }, 1000);
        });
      };
      const data = await waitForChange();
      return json({
        expired: data === null,
      });
    }
    if (pathname === "/register") {
      const uuid = v41();
      const uuidHash = await sha256(uuid);
      await USERS.put(
        uuid,
        JSON.stringify({
          uuid,
          uuidHash,
          registered: Date.now(),
          country,
          colo,
        }),
      );
      await log("register", {
        uuidHash,
      });
      await USERKEYS.put(uuidHash, uuid);
      return json({
        uuid,
      });
    }
    if (pathname === "/token") {
      const uuid = v41();
      const uuidHash = await sha256(uuid);
      await USERS.put(
        uuid,
        JSON.stringify({
          uuid,
          registered: Date.now(),
          country,
          colo,
        }),
        {
          expirationTtl: 60,
        },
      );
      await USERKEYS.put(uuidHash, uuid, {
        expirationTtl: 60,
      });
      return json({
        uuid,
        key: uuidHash,
      });
    }
    if (pathname === "/create-project") {
      const uuidHash = request.headers.get("TOKEN");
      const uuid = v41();
      await USERS.put(
        uuid,
        JSON.stringify({
          uuid,
          registered: Date.now(),
          country,
          colo,
        }),
      );
      return json({
        uuid,
      });
    }
    const maybeRoute = pathname.substr(1);
    if (maybeRoute) {
      const shaDB = getDbObj(SHAKV);
      const result = await shaDB.get(maybeRoute);
      if (result !== null) {
        if (result.indexOf("export") === 0) return js(result);
        return text(result);
      }
    }
    return Response.redirect("https://zed.vision/code", 301);
  } else if (request.method === "POST") {
    const zkey = String(request.headers.get("ZKEY") || "");
    const sha = zkey.slice(0, 8);
    const uKey = zkey.slice(8, 16);
    const gKey = zkey.slice(16, 24);
    const proofKey = zkey.slice(24, 32);
    if (!sha || !uKey || !gKey || !proofKey) {
      return json({
        error: 401,
        "message": "not matching keys",
      });
    }
    const checkGkey = await sha256(sha + uKey);
    if (checkGkey !== gKey) {
      return json({
        error: 401,
        "message": "content and userkeys are not a pain",
      });
    }
    const myBuffer = await request.arrayBuffer();
    const hash = await sha256(myBuffer);
    const smallerKey = hash.substring(0, 8);
    if (smallerKey !== sha) {
      return json({
        error: 401,
        message:
          `body hash not matching with the sent hash: ${smallerKey} -- ${zkey}`,
      });
    }
    const uuid = await USERKEYS.get(uKey);
    if (!uuid) {
      return json({
        error: 500,
        message: "user not found",
      });
    }
    const checkProofKey = await sha256(sha + uuid);
    if (checkProofKey !== proofKey) {
      return json({
        error: 401,
        message: "user not verified",
      });
    }
    await log("new html", {
      sha,
      uKey,
    });
    const maybeRoute = pathname.substr(1);
    await SHAKV.put(smallerKey, myBuffer);
    if (maybeRoute) {
      const shaDB = getDbObj(SHAKV);
      const result = await shaDB.put(maybeRoute, smallerKey);
    }
    return json({
      hash: smallerKey,
    });
  }
  return new Response("404");
}
addEventListener("fetch", (event) => {
  if (event.request.method === "OPTIONS") {
    event.respondWith(handleOptions(event.request));
  } else {
    event.respondWith(handleCloudRequest(event.request));
  }
});

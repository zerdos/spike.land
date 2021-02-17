const sha256 = async (x) =>
  Array.from(
    new Uint8Array(
      await crypto.subtle.digest(
        "SHA-256",
        typeof x === "string" ? new TextEncoder().encode(x) : x,
      ),
    ).slice(0, 4),
  ).map((b) => ("00" + b.toString(16)).slice(-2)).join("");
function b() {
}
b.prototype = {
  diff: function (n, r) {
    var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
      s = t.callback;
    typeof t == "function" && (s = t, t = {}), this.options = t;
    var i = this;
    function l(d) {
      return s
        ? (setTimeout(function () {
          s(void 0, d);
        }, 0),
          !0)
        : d;
    }
    n = this.castInput(n),
      r = this.castInput(r),
      n = this.removeEmpty(this.tokenize(n)),
      r = this.removeEmpty(this.tokenize(r));
    var f = r.length,
      a = n.length,
      o = 1,
      p = f + a,
      c = [
        {
          newPos: -1,
          components: [],
        },
      ],
      u = this.extractCommon(c[0], r, n, 0);
    if (c[0].newPos + 1 >= f && u + 1 >= a) {
      return l([
        {
          value: this.join(r),
          count: r.length,
        },
      ]);
    }
    function v() {
      for (var d = -1 * o; d <= o; d += 2) {
        var w = void 0, y = c[d - 1], L = c[d + 1], x = (L ? L.newPos : 0) - d;
        y && (c[d - 1] = void 0);
        var g = y && y.newPos + 1 < f, F = L && 0 <= x && x < a;
        if (!g && !F) {
          c[d] = void 0;
          continue;
        }
        if (
          !g || F && y.newPos < L.newPos
            ? (w = le(L), i.pushComponent(w.components, void 0, !0))
            : (w = y, w.newPos++, i.pushComponent(w.components, !0, void 0)),
            x = i.extractCommon(w, r, n, d),
            w.newPos + 1 >= f && x + 1 >= a
        ) {
          return l(se(i, w.components, r, n, i.useLongestToken));
        }
        c[d] = w;
      }
      o++;
    }
    if (s) {
      (function d() {
        setTimeout(function () {
          if (o > p) return s();
          v() || d();
        }, 0);
      })();
    } else {
      for (; o <= p;) {
        var h = v();
        if (h) return h;
      }
    }
  },
  pushComponent: function (n, r, t) {
    var s = n[n.length - 1];
    s && s.added === r && s.removed === t
      ? n[n.length - 1] = {
        count: s.count + 1,
        added: r,
        removed: t,
      }
      : n.push({
        count: 1,
        added: r,
        removed: t,
      });
  },
  extractCommon: function (n, r, t, s) {
    for (
      var i = r.length, l = t.length, f = n.newPos, a = f - s, o = 0;
      f + 1 < i && a + 1 < l && this.equals(r[f + 1], t[a + 1]);
    ) {
      f++, a++, o++;
    }
    return o && n.components.push({
      count: o,
    }),
      n.newPos = f,
      a;
  },
  equals: function (n, r) {
    return this.options.comparator
      ? this.options.comparator(n, r)
      : n === r ||
        this.options.ignoreCase && n.toLowerCase() === r.toLowerCase();
  },
  removeEmpty: function (n) {
    for (var r = [], t = 0; t < n.length; t++) n[t] && r.push(n[t]);
    return r;
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
function se(e, n, r, t, s) {
  for (var i = 0, l = n.length, f = 0, a = 0; i < l; i++) {
    var o = n[i];
    if (o.removed) {
      if (
        o.value = e.join(t.slice(a, a + o.count)),
          a += o.count,
          i && n[i - 1].added
      ) {
        var c = n[i - 1];
        n[i - 1] = n[i], n[i] = c;
      }
    } else {
      if (!o.added && s) {
        var p = r.slice(f, f + o.count);
        p = p.map(function (v, h) {
          var d = t[a + h];
          return d.length > v.length ? d : v;
        }), o.value = e.join(p);
      } else o.value = e.join(r.slice(f, f + o.count));
      f += o.count, o.added || (a += o.count);
    }
  }
  var u = n[l - 1];
  return l > 1 && typeof u.value == "string" && (u.added || u.removed) &&
    e.equals("", u.value) && (n[l - 2].value += u.value, n.pop()),
    n;
}
function le(e) {
  return {
    newPos: e.newPos,
    components: e.components.slice(0),
  };
}
var fe = new b();
function oe(e, n, r) {
  return fe.diff(e, n, r);
}
var Y = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,
  K = /\S/,
  j = new b();
j.equals = function (e, n) {
  return this.options.ignoreCase && (e = e.toLowerCase(), n = n.toLowerCase()),
    e === n || this.options.ignoreWhitespace && !K.test(e) && !K.test(n);
},
  j.tokenize = function (e) {
    for (
      var n = e.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/), r = 0;
      r < n.length - 1;
      r++
    ) {
      !n[r + 1] && n[r + 2] && Y.test(n[r]) && Y.test(n[r + 2]) &&
        (n[r] += n[r + 2], n.splice(r + 1, 2), r--);
    }
    return n;
  };
var U = new b();
U.tokenize = function (e) {
  var n = [], r = e.split(/(\n|\r\n)/);
  r[r.length - 1] || r.pop();
  for (var t = 0; t < r.length; t++) {
    var s = r[t];
    t % 2 && !this.options.newlineIsToken
      ? n[n.length - 1] += s
      : (this.options.ignoreWhitespace && (s = s.trim()), n.push(s));
  }
  return n;
};
function ue(e, n, r) {
  return U.diff(e, n, r);
}
var ae = new b();
ae.tokenize = function (e) {
  return e.split(/(\S.+?[.!?])(?=\s+|$)/);
};
var de = new b();
de.tokenize = function (e) {
  return e.split(/([{}:;,]|\s+)/);
};
function W(e) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
    ? W = function (n) {
      return typeof n;
    }
    : W = function (n) {
      return n && typeof Symbol == "function" && n.constructor === Symbol &&
          n !== Symbol.prototype
        ? "symbol"
        : typeof n;
    },
    W(e);
}
function C(e) {
  return ce(e) || pe(e) || ve(e) || he();
}
function ce(e) {
  if (Array.isArray(e)) return V(e);
}
function pe(e) {
  if (typeof Symbol != "undefined" && Symbol.iterator in Object(e)) {
    return Array.from(e);
  }
}
function ve(e, n) {
  if (!!e) {
    if (typeof e == "string") return V(e, n);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      r === "Object" && e.constructor && (r = e.constructor.name),
        r === "Map" || r === "Set"
    ) {
      return Array.from(e);
    }
    if (
      r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
    ) {
      return V(e, n);
    }
  }
}
function V(e, n) {
  (n == null || n > e.length) && (n = e.length);
  for (var r = 0, t = new Array(n); r < n; r++) t[r] = e[r];
  return t;
}
function he() {
  throw new TypeError(
    `Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.`,
  );
}
var ge = Object.prototype.toString, q = new b();
q.useLongestToken = !0,
  q.tokenize = U.tokenize,
  q.castInput = function (e) {
    var n = this.options,
      r = n.undefinedReplacement,
      t = n.stringifyReplacer,
      s = t === void 0
        ? function (i, l) {
          return typeof l == "undefined" ? r : l;
        }
        : t;
    return typeof e == "string" ? e
    : JSON.stringify(Z(e, null, null, s), s, "  ");
  },
  q.equals = function (e, n) {
    return b.prototype.equals.call(
      q,
      e.replace(/,([\r\n])/g, "$1"),
      n.replace(/,([\r\n])/g, "$1"),
    );
  };
function Z(e, n, r, t, s) {
  n = n || [], r = r || [], t && (e = t(s, e));
  var i;
  for (i = 0; i < n.length; i += 1) if (n[i] === e) return r[i];
  var l;
  if (ge.call(e) === "[object Array]") {
    for (
      n.push(e), l = new Array(e.length), r.push(l), i = 0; i < e.length; i += 1
    ) {
      l[i] = Z(e[i], n, r, t, s);
    }
    return n.pop(), r.pop(), l;
  }
  if (e && e.toJSON && (e = e.toJSON()), W(e) === "object" && e !== null) {
    n.push(e), l = {}, r.push(l);
    var f = [], a;
    for (a in e) e.hasOwnProperty(a) && f.push(a);
    for (f.sort(), i = 0; i < f.length; i += 1) {
      a = f[i], l[a] = Z(e[a], n, r, t, a);
    }
    n.pop(), r.pop();
  } else l = e;
  return l;
}
var B = new b();
B.tokenize = function (e) {
  return e.slice();
},
  B.join = B.removeEmpty = function (e) {
    return e;
  };
function P(e) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r = e.split(/\r\n|[\n\v\f\r\x85]/),
    t = e.match(/\r\n|[\n\v\f\r\x85]/g) || [],
    s = [],
    i = 0;
  function l() {
    var o = {};
    for (s.push(o); i < r.length;) {
      var p = r[i];
      if (/^(\-\-\-|\+\+\+|@@)\s/.test(p)) break;
      var c = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(p);
      c && (o.index = c[1]), i++;
    }
    for (f(o), f(o), o.hunks = []; i < r.length;) {
      var u = r[i];
      if (/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(u)) break;
      if (/^@@/.test(u)) o.hunks.push(a());
      else {
        if (u && n.strict) {
          throw new Error("Unknown line " + (i + 1) + " " + JSON.stringify(u));
        }
        i++;
      }
    }
  }
  function f(o) {
    var p = /^(---|\+\+\+)\s+(.*)$/.exec(r[i]);
    if (p) {
      var c = p[1] === "---" ? "old" : "new",
        u = p[2].split("	", 2),
        v = u[0].replace(/\\\\/g, "\\");
      /^".*"$/.test(v) && (v = v.substr(1, v.length - 2)),
        o[c + "FileName"] = v,
        o[c + "Header"] = (u[1] || "").trim(),
        i++;
    }
  }
  function a() {
    var o = i,
      p = r[i++],
      c = p.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/),
      u = {
        oldStart: +c[1],
        oldLines: typeof c[2] == "undefined" ? 1 : +c[2],
        newStart: +c[3],
        newLines: typeof c[4] == "undefined" ? 1 : +c[4],
        lines: [],
        linedelimiters: [],
      };
    u.oldLines === 0 && (u.oldStart += 1),
      u.newLines === 0 && (u.newStart += 1);
    for (
      var v = 0, h = 0;
      i < r.length &&
      !(r[i].indexOf("--- ") === 0 && i + 2 < r.length &&
        r[i + 1].indexOf("+++ ") === 0 && r[i + 2].indexOf("@@") === 0);
      i++
    ) {
      var d = r[i].length == 0 && i != r.length - 1 ? " " : r[i][0];
      if (d === "+" || d === "-" || d === " " || d === "\\") {
        u.lines.push(r[i]),
          u.linedelimiters.push(t[i] || `\n`),
          d === "+" ? v++ : d === "-"
            ? h++
            : d === " " && (v++, h++);
      } else break;
    }
    if (
      !v && u.newLines === 1 && (u.newLines = 0),
        !h && u.oldLines === 1 && (u.oldLines = 0),
        n.strict
    ) {
      if (v !== u.newLines) {
        throw new Error(
          "Added line count did not match for hunk at line " + (o + 1),
        );
      }
      if (h !== u.oldLines) {
        throw new Error(
          "Removed line count did not match for hunk at line " + (o + 1),
        );
      }
    }
    return u;
  }
  for (; i < r.length;) l();
  return s;
}
function we(e, n, r) {
  var t = !0, s = !1, i = !1, l = 1;
  return function f() {
    if (t && !i) {
      if (s ? l++ : t = !1, e + l <= r) return l;
      i = !0;
    }
    if (!s) return i || (t = !0), n <= e - l ? -l++ : (s = !0, f());
  };
}
function _(e, n, r, t, s, i, l) {
  l || (l = {}), typeof l.context == "undefined" && (l.context = 4);
  var f = ue(r, t, l);
  f.push({
    value: "",
    lines: [],
  });
  function a(y) {
    return y.map(function (L) {
      return " " + L;
    });
  }
  for (
    var o = [],
      p = 0,
      c = 0,
      u = [],
      v = 1,
      h = 1,
      d = function (L) {
        var x = f[L], g = x.lines || x.value.replace(/\n$/, "").split(`\n`);
        if ((x.lines = g, x.added || x.removed)) {
          var F;
          if (!p) {
            var m = f[L - 1];
            p = v,
              c = h,
              m &&
              (u = l.context > 0 ? a(m.lines.slice(-l.context)) : [],
                p -= u.length,
                c -= u.length);
          }
          (F = u).push.apply(
            F,
            C(g.map(function (A) {
              return (x.added ? "+" : "-") + A;
            })),
          ), x.added ? h += g.length : v += g.length;
        } else {
          if (p) {
            if (g.length <= l.context * 2 && L < f.length - 2) {
              var E;
              (E = u).push.apply(E, C(a(g)));
            } else {
              var I, N = Math.min(g.length, l.context);
              (I = u).push.apply(I, C(a(g.slice(0, N))));
              var z = {
                oldStart: p,
                oldLines: v - p + N,
                newStart: c,
                newLines: h - c + N,
                lines: u,
              };
              if (L >= f.length - 2 && g.length <= l.context) {
                var $ = /\n$/.test(r),
                  J = /\n$/.test(t),
                  T = g.length == 0 && u.length > z.oldLines;
                !$ && T && r.length > 0 &&
                u.splice(z.oldLines, 0, "\\ No newline at end of file"),
                  (!$ && !T || !J) && u.push("\\ No newline at end of file");
              }
              o.push(z), p = 0, c = 0, u = [];
            }
          }
          v += g.length, h += g.length;
        }
      },
      w = 0;
    w < f.length;
    w++
  ) {
    d(w);
  }
  return {
    oldFileName: e,
    newFileName: n,
    oldHeader: s,
    newHeader: i,
    hunks: o,
  };
}
function Le(e) {
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
  for (var r = 0; r < e.hunks.length; r++) {
    var t = e.hunks[r];
    t.oldLines === 0 && (t.oldStart -= 1),
      t.newLines === 0 && (t.newStart -= 1),
      n.push(
        "@@ -" + t.oldStart + "," + t.oldLines + " +" + t.newStart + "," +
          t.newLines + " @@",
      ),
      n.push.apply(n, t.lines);
  }
  return n.join(`\n`) + `\n`;
}
function ye(e, n) {
  return e.length !== n.length ? !1 : G(e, n);
}
function G(e, n) {
  if (n.length > e.length) return !1;
  for (var r = 0; r < n.length; r++) if (n[r] !== e[r]) return !1;
  return !0;
}
function xe(e) {
  var n = X(e.lines), r = n.oldLines, t = n.newLines;
  r !== void 0 ? e.oldLines = r : delete e.oldLines,
    t !== void 0 ? e.newLines = t : delete e.newLines;
}
function me(e, n, r) {
  var t = O(n), s = O(r);
  if (re(t) && re(s)) {
    if (G(t, s) && te(r, t, t.length - s.length)) {
      var i;
      (i = e.lines).push.apply(i, C(t));
      return;
    } else if (G(s, t) && te(n, s, s.length - t.length)) {
      var l;
      (l = e.lines).push.apply(l, C(s));
      return;
    }
  } else if (ye(t, s)) {
    var f;
    (f = e.lines).push.apply(f, C(t));
    return;
  }
  Q(e, t, s);
}
function k(e, n, r, t) {
  var s = O(n), i = Fe(r, s);
  if (i.merged) {
    var l;
    (l = e.lines).push.apply(l, C(i.merged));
  } else Q(e, t ? i : s, t ? s : i);
}
function Q(e, n, r) {
  e.conflict = !0,
    e.lines.push({
      conflict: !0,
      mine: n,
      theirs: r,
    });
}
function ee(e, n, r) {
  for (; n.offset < r.offset && n.index < n.lines.length;) {
    var t = n.lines[n.index++];
    e.lines.push(t), n.offset++;
  }
}
function ne(e, n) {
  for (; n.index < n.lines.length;) {
    var r = n.lines[n.index++];
    e.lines.push(r);
  }
}
function O(e) {
  for (var n = [], r = e.lines[e.index][0]; e.index < e.lines.length;) {
    var t = e.lines[e.index];
    if (r === "-" && t[0] === "+" && (r = "+"), r === t[0]) {
      n.push(t), e.index++;
    } else break;
  }
  return n;
}
function Fe(e, n) {
  for (
    var r = [], t = [], s = 0, i = !1, l = !1;
    s < n.length && e.index < e.lines.length;
  ) {
    var f = e.lines[e.index], a = n[s];
    if (a[0] === "+") break;
    if (i = i || f[0] !== " ", t.push(a), s++, f[0] === "+") {
      for (l = !0; f[0] === "+";) {
        r.push(f), f = e.lines[++e.index];
      }
    }
    a.substr(1) === f.substr(1) ? (r.push(f), e.index++) : l = !0;
  }
  if ((n[s] || "")[0] === "+" && i && (l = !0), l) return r;
  for (; s < n.length;) t.push(n[s++]);
  return {
    merged: t,
    changes: r,
  };
}
function re(e) {
  return e.reduce(function (n, r) {
    return n && r[0] === "-";
  }, !0);
}
function te(e, n, r) {
  for (var t = 0; t < r; t++) {
    var s = n[n.length - r + t].substr(1);
    if (e.lines[e.index + t] !== " " + s) return !1;
  }
  return e.index += r, !0;
}
function X(e) {
  var n = 0, r = 0;
  return e.forEach(function (t) {
    if (typeof t != "string") {
      var s = X(t.mine), i = X(t.theirs);
      n !== void 0 &&
      (s.oldLines === i.oldLines ? n += s.oldLines : n = void 0),
        r !== void 0 &&
        (s.newLines === i.newLines ? r += s.newLines : r = void 0);
    } else {
      r !== void 0 && (t[0] === "+" || t[0] === " ") && r++,
        n !== void 0 && (t[0] === "-" || t[0] === " ") && n++;
    }
  }),
    {
      oldLines: n,
      newLines: r,
    };
}
const diff = async (str1, str2) => {
  const sha1Str1 = sha256(str1);
  const res = oe(str1, str2);
  return {
    b: await sha1Str1,
    c: res.map((x) => x.added ? x.value : x.removed ? -x.count : x.count),
  };
};
const isDiff = (str) => {
  if (str.length < 10) {
    return false;
  }
  const isKey = [
    ...str.slice(0, 8),
  ].filter((x) => x < "0" || x > "f").length === 0;
  const maybeInst = str.slice(8);
  if (
    isKey && maybeInst[0] === "[" && maybeInst[maybeInst.length - 1] === "]"
  ) {
    try {
      return JSON.parse(maybeInst).length > 1;
    } catch (_a) {
      return false;
    }
  }
  return false;
};
const assemble = (oldValue, instructions) => {
  const instArr = JSON.parse(instructions);
  let old = oldValue.slice();
  let ret = "";
  instArr.forEach((element) => {
    if (Number(element) === element) {
      const absNum = Math.abs(element);
      const currentString = old.slice(0, absNum);
      old = old.slice(absNum);
      if (element > 0) {
        ret += String(currentString);
      }
    } else {
      ret += String(element);
    }
  });
  return ret;
};
const getDbObj = (db) => {
  const dbObj = {
    async get(key, format = "string") {
      let data;
      try {
        data = await db.get(key);
        if (!data) {
          return null;
        }
      } catch (_) {
        return null;
      }
      if (format === "json") {
        try {
          const json = JSON.parse(data);
          return json;
        } catch (_a) {
          return data;
        }
      }
      const allData = await data;
      if (format === "string") {
        if (typeof allData === "string" && format === "string") {
          const text = allData;
          if (isDiff(text)) {
            const keyOfDiff = text.slice(0, 8);
            const instructions = text.slice(8);
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
            const prevSha = await sha256(prevValue);
            if (prevSha === oldKey) {
              const diffObj = await diff(actualValue, prevValue);
              const diffAsStr = diffObj.b + JSON.stringify(diffObj.c);
              await dbObj.put(prevSha, diffAsStr);
            }
          }
        }
      } catch (_a) {
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
      return await db.put(key, str);
    },
    async delete(key) {
      return await db.delete(key);
    },
    async clear() {
      return await db.clear();
    },
    async keys() {
      return await db.getAllKeys();
    },
  };
  return dbObj;
};
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
async function handleAdmin(request, searchParams, pathname, SHAKV) {
  if (pathname === "/keys/") {
    const prefix = searchParams.get("prefix");
    const value = await SHAKV.list({
      prefix,
    });
    return json(value);
  }
  if (pathname === "/keys/delete/") {
    const hash = searchParams.get("hash");
    const value = await SHAKV.delete(hash);
    return json(value);
  }
  return json({
    error: "not implemented",
  });
}
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
const publicIpfsGateways = [
  "https://ipfs.io/ipfs/:hash",
  "https://dweb.link/ipfs/:hash",
  "https://gateway.ipfs.io/ipfs/:hash",
  "https://ipfs.infura.io/ipfs/:hash",
  "https://ninetailed.ninja/ipfs/:hash",
  "https://10.via0.com/ipfs/:hash",
  "https://ipfs.eternum.io/ipfs/:hash",
  "https://hardbin.com/ipfs/:hash",
  "https://cloudflare-ipfs.com/ipfs/:hash",
  "https://cf-ipfs.com/ipfs/:hash",
  "https://gateway.pinata.cloud/ipfs/:hash",
  "https://ipfs.sloppyta.co/ipfs/:hash",
  "https://ipfs.greyh.at/ipfs/:hash",
  "https://jorropo.ovh/ipfs/:hash",
  "https://jorropo.net/ipfs/:hash",
  "https://gateway.temporal.cloud/ipfs/:hash",
  "https://ipfs.runfission.com/ipfs/:hash",
  "https://trusti.id/ipfs/:hash",
  "https://ipfs.overpi.com/ipfs/:hash",
  "https://ipfs.ink/ipfs/:hash",
  "https://gateway.ravenland.org/ipfs/:hash",
  "https://ipfs.smartsignature.io/ipfs/:hash",
  "https://ipfs.telos.miami/ipfs/:hash",
  "https://robotizing.net/ipfs/:hash",
  "https://ipfs.mttk.net/ipfs/:hash",
  "https://ipfs.fleek.co/ipfs/:hash",
  "https://ipfs.jbb.one/ipfs/:hash",
  "https://jacl.tech/ipfs/:hash",
  "https://ipfs.k1ic.com/ipfs/:hash",
  "https://ipfs.drink.cafe/ipfs/:hash",
  "https://ipfs.azurewebsites.net/ipfs/:hash",
  "https://gw.ipfspin.com/ipfs/:hash",
  "https://ipfs.denarius.io/ipfs/:hash",
];
function raceToSuccess(promises) {
  let numRejected = 0;
  return new Promise((resolve, reject) =>
    promises.forEach((promise) =>
      promise.then(resolve).catch(() => {
        if ((++numRejected) === promises.length) reject();
      })
    )
  );
}
const raceToSuccess1 = raceToSuccess;
var SHAKV;
var USERS;
var LOGS;
var SIGNALS;
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
async function handleCloudRequest(request) {
  const { country, colo } = request.cf || {
    country: "",
    colo: "",
  };
  const url = new URL(request.url);
  const { searchParams, pathname } = url;
  const psk = String(request.headers.get("API_KEY") || "");
  await log("request", {
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
    if (pathname.slice(0, 7) === "/signal") {
      const cid = searchParams.get("cid") || "";
      const signal = searchParams.get("signal") || "";
      const key = searchParams.get("key") || "";
      if (cid.length === 46 && signal.length === 8) {
        await SIGNALS.put(signal, cid, {
          expirationTtl: 86400 * 7,
        });
        return json({
          success: true,
        });
      } else if (signal.length === 8) {
        const msg = await SIGNALS.get(signal);
        if (msg === null) return text("404");
        return text(msg);
      }
      return text("error....");
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
    const isKey = [
          ...maybeRoute,
        ].filter((x) => x < "0" || x > "f").length === 0 &&
      maybeRoute.length === 8;
    if (maybeRoute && isKey) {
      return Response.redirect(
        `https://code.zed.vision/?signalToQr=${maybeRoute}`,
        307,
      );
    }
    if (pathname.slice(0, 6) === "/ipfs/") {
      const cache = caches.default;
      let response = await cache.match(request);
      if (!response) {
        const random5GatewaysFetch = publicIpfsGateways.sort(() =>
          0.5 - Math.random()
        ).slice(0, 8).map((gw) => gw.replace("/ipfs/:hash", pathname)).map((
          x,
        ) =>
          fetch(x).then((res) =>
            res.status === 200 ? res : (() => {
              throw new Error("Not found");
            })()
          )
        );
        try {
          response = await raceToSuccess1(random5GatewaysFetch);
          if (typeof response === "undefined") return text("Please try again");
          await cache.put(request, response.clone());
        } catch {
          return text("please try again");
        }
      }
      if (response.status > 399) {
        response = new Response(response.statusText, {
          status: response.status,
        });
      }
      return response;
    }
    if (pathname === "/") {
      return Response.redirect(
        "https://code.zed.vision/ipfs/QmauvHh4CRhZDR9zULhSnvguoZP4uashu8AfuMoGUsXKsM/",
        302,
      );
    }
    if (pathname === "/code" || pathname === "/code/") {
      return Response.redirect(`https://code.zed.vision`, 302);
    }
    return text(pathname);
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

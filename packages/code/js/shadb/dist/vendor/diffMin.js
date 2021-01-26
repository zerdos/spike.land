function N() { }
N.prototype = { diff: function (n, r) { var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s = t.callback; typeof t == "function" && (s = t, t = {}), this.options = t; var i = this; function l(d) { return s ? (setTimeout(function () { s(void 0, d); }, 0), !0) : d; } n = this.castInput(n), r = this.castInput(r), n = this.removeEmpty(this.tokenize(n)), r = this.removeEmpty(this.tokenize(r)); var f = r.length, a = n.length, o = 1, p = f + a, c = [{ newPos: -1, components: [] }], u = this.extractCommon(c[0], r, n, 0); if (c[0].newPos + 1 >= f && u + 1 >= a)
        return l([{ value: this.join(r), count: r.length }]); function v() { for (var d = -1 * o; d <= o; d += 2) {
        var w = void 0, y = c[d - 1], L = c[d + 1], x = (L ? L.newPos : 0) - d;
        y && (c[d - 1] = void 0);
        var g = y && y.newPos + 1 < f, F = L && 0 <= x && x < a;
        if (!g && !F) {
            c[d] = void 0;
            continue;
        }
        if (!g || F && y.newPos < L.newPos ? (w = fe(L), i.pushComponent(w.components, void 0, !0)) : (w = y, w.newPos++, i.pushComponent(w.components, !0, void 0)), x = i.extractCommon(w, r, n, d), w.newPos + 1 >= f && x + 1 >= a)
            return l(le(i, w.components, r, n, i.useLongestToken));
        c[d] = w;
    } o++; } if (s)
        (function d() { setTimeout(function () { if (o > p)
            return s(); v() || d(); }, 0); })();
    else
        for (; o <= p;) {
            var h = v();
            if (h)
                return h;
        } }, pushComponent: function (n, r, t) { var s = n[n.length - 1]; s && s.added === r && s.removed === t ? n[n.length - 1] = { count: s.count + 1, added: r, removed: t } : n.push({ count: 1, added: r, removed: t }); }, extractCommon: function (n, r, t, s) { for (var i = r.length, l = t.length, f = n.newPos, a = f - s, o = 0; f + 1 < i && a + 1 < l && this.equals(r[f + 1], t[a + 1]);)
        f++, a++, o++; return o && n.components.push({ count: o }), n.newPos = f, a; }, equals: function (n, r) { return this.options.comparator ? this.options.comparator(n, r) : n === r || this.options.ignoreCase && n.toLowerCase() === r.toLowerCase(); }, removeEmpty: function (n) { for (var r = [], t = 0; t < n.length; t++)
        n[t] && r.push(n[t]); return r; }, castInput: function (n) { return n; }, tokenize: function (n) { return n.split(""); }, join: function (n) { return n.join(""); } };
function le(e, n, r, t, s) { for (var i = 0, l = n.length, f = 0, a = 0; i < l; i++) {
    var o = n[i];
    if (o.removed) {
        if (o.value = e.join(t.slice(a, a + o.count)), a += o.count, i && n[i - 1].added) {
            var c = n[i - 1];
            n[i - 1] = n[i], n[i] = c;
        }
    }
    else {
        if (!o.added && s) {
            var p = r.slice(f, f + o.count);
            p = p.map(function (v, h) { var d = t[a + h]; return d.length > v.length ? d : v; }), o.value = e.join(p);
        }
        else
            o.value = e.join(r.slice(f, f + o.count));
        f += o.count, o.added || (a += o.count);
    }
} var u = n[l - 1]; return l > 1 && typeof u.value == "string" && (u.added || u.removed) && e.equals("", u.value) && (n[l - 2].value += u.value, n.pop()), n; }
function fe(e) { return { newPos: e.newPos, components: e.components.slice(0) }; }
var oe = new N;
function Y(e, n, r) { return oe.diff(e, n, r); }
function Ce(e, n) { if (typeof e == "function")
    n.callback = e;
else if (e)
    for (var r in e)
        e.hasOwnProperty(r) && (n[r] = e[r]); return n; }
var K = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/, j = /\S/, P = new N;
P.equals = function (e, n) { return this.options.ignoreCase && (e = e.toLowerCase(), n = n.toLowerCase()), e === n || this.options.ignoreWhitespace && !j.test(e) && !j.test(n); }, P.tokenize = function (e) { for (var n = e.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/), r = 0; r < n.length - 1; r++)
    !n[r + 1] && n[r + 2] && K.test(n[r]) && K.test(n[r + 2]) && (n[r] += n[r + 2], n.splice(r + 1, 2), r--); return n; };
var U = new N;
U.tokenize = function (e) { var n = [], r = e.split(/(\n|\r\n)/); r[r.length - 1] || r.pop(); for (var t = 0; t < r.length; t++) {
    var s = r[t];
    t % 2 && !this.options.newlineIsToken ? n[n.length - 1] += s : (this.options.ignoreWhitespace && (s = s.trim()), n.push(s));
} return n; };
function ue(e, n, r) { return U.diff(e, n, r); }
var ae = new N;
ae.tokenize = function (e) { return e.split(/(\S.+?[.!?])(?=\s+|$)/); };
var de = new N;
de.tokenize = function (e) { return e.split(/([{}:;,]|\s+)/); };
function W(e) { return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? W = function (n) { return typeof n; } : W = function (n) { return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n; }, W(e); }
function b(e) { return ce(e) || pe(e) || ve(e) || he(); }
function ce(e) { if (Array.isArray(e))
    return V(e); }
function pe(e) { if (typeof Symbol != "undefined" && Symbol.iterator in Object(e))
    return Array.from(e); }
function ve(e, n) { if (!!e) {
    if (typeof e == "string")
        return V(e, n);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
        return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
        return V(e, n);
} }
function V(e, n) { (n == null || n > e.length) && (n = e.length); for (var r = 0, t = new Array(n); r < n; r++)
    t[r] = e[r]; return t; }
function he() {
    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var ge = Object.prototype.toString, q = new N;
q.useLongestToken = !0, q.tokenize = U.tokenize, q.castInput = function (e) { var n = this.options, r = n.undefinedReplacement, t = n.stringifyReplacer, s = t === void 0 ? function (i, l) { return typeof l == "undefined" ? r : l; } : t; return typeof e == "string" ? e : JSON.stringify(Z(e, null, null, s), s, "  "); }, q.equals = function (e, n) { return N.prototype.equals.call(q, e.replace(/,([\r\n])/g, "$1"), n.replace(/,([\r\n])/g, "$1")); };
function Z(e, n, r, t, s) { n = n || [], r = r || [], t && (e = t(s, e)); var i; for (i = 0; i < n.length; i += 1)
    if (n[i] === e)
        return r[i]; var l; if (ge.call(e) === "[object Array]") {
    for (n.push(e), l = new Array(e.length), r.push(l), i = 0; i < e.length; i += 1)
        l[i] = Z(e[i], n, r, t, s);
    return n.pop(), r.pop(), l;
} if (e && e.toJSON && (e = e.toJSON()), W(e) === "object" && e !== null) {
    n.push(e), l = {}, r.push(l);
    var f = [], a;
    for (a in e)
        e.hasOwnProperty(a) && f.push(a);
    for (f.sort(), i = 0; i < f.length; i += 1)
        a = f[i], l[a] = Z(e[a], n, r, t, a);
    n.pop(), r.pop();
}
else
    l = e; return l; }
var B = new N;
B.tokenize = function (e) { return e.slice(); }, B.join = B.removeEmpty = function (e) { return e; };
function _(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = e.split(/\r\n|[\n\v\f\r\x85]/), t = e.match(/\r\n|[\n\v\f\r\x85]/g) || [], s = [], i = 0;
    function l() { var o = {}; for (s.push(o); i < r.length;) {
        var p = r[i];
        if (/^(\-\-\-|\+\+\+|@@)\s/.test(p))
            break;
        var c = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(p);
        c && (o.index = c[1]), i++;
    } for (f(o), f(o), o.hunks = []; i < r.length;) {
        var u = r[i];
        if (/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(u))
            break;
        if (/^@@/.test(u))
            o.hunks.push(a());
        else {
            if (u && n.strict)
                throw new Error("Unknown line " + (i + 1) + " " + JSON.stringify(u));
            i++;
        }
    } }
    function f(o) { var p = /^(---|\+\+\+)\s+(.*)$/.exec(r[i]); if (p) {
        var c = p[1] === "---" ? "old" : "new", u = p[2].split("	", 2), v = u[0].replace(/\\\\/g, "\\");
        /^".*"$/.test(v) && (v = v.substr(1, v.length - 2)), o[c + "FileName"] = v, o[c + "Header"] = (u[1] || "").trim(), i++;
    } }
    function a() {
        var o = i, p = r[i++], c = p.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/), u = { oldStart: +c[1], oldLines: typeof c[2] == "undefined" ? 1 : +c[2], newStart: +c[3], newLines: typeof c[4] == "undefined" ? 1 : +c[4], lines: [], linedelimiters: [] };
        u.oldLines === 0 && (u.oldStart += 1), u.newLines === 0 && (u.newStart += 1);
        for (var v = 0, h = 0; i < r.length && !(r[i].indexOf("--- ") === 0 && i + 2 < r.length && r[i + 1].indexOf("+++ ") === 0 && r[i + 2].indexOf("@@") === 0); i++) {
            var d = r[i].length == 0 && i != r.length - 1 ? " " : r[i][0];
            if (d === "+" || d === "-" || d === " " || d === "\\")
                u.lines.push(r[i]), u.linedelimiters.push(t[i] || `
`), d === "+" ? v++ : d === "-" ? h++ : d === " " && (v++, h++);
            else
                break;
        }
        if (!v && u.newLines === 1 && (u.newLines = 0), !h && u.oldLines === 1 && (u.oldLines = 0), n.strict) {
            if (v !== u.newLines)
                throw new Error("Added line count did not match for hunk at line " + (o + 1));
            if (h !== u.oldLines)
                throw new Error("Removed line count did not match for hunk at line " + (o + 1));
        }
        return u;
    }
    for (; i < r.length;)
        l();
    return s;
}
function we(e, n, r) { var t = !0, s = !1, i = !1, l = 1; return function f() { if (t && !i) {
    if (s ? l++ : t = !1, e + l <= r)
        return l;
    i = !0;
} if (!s)
    return i || (t = !0), n <= e - l ? -l++ : (s = !0, f()); }; }
function Ie(e, n) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (typeof n == "string" && (n = _(n)), Array.isArray(n)) {
        if (n.length > 1)
            throw new Error("applyPatch only works with a single input.");
        n = n[0];
    }
    var t = e.split(/\r\n|[\n\v\f\r\x85]/), s = e.match(/\r\n|[\n\v\f\r\x85]/g) || [], i = n.hunks, l = r.compareLine || function (M, S, R, H) { return S === H; }, f = 0, a = r.fuzzFactor || 0, o = 0, p = 0, c, u;
    function v(M, S) { for (var R = 0; R < M.lines.length; R++) {
        var H = M.lines[R], D = H.length > 0 ? H[0] : " ", se = H.length > 0 ? H.substr(1) : H;
        if (D === " " || D === "-") {
            if (!l(S + 1, t[S], D, se) && (f++, f > a))
                return !1;
            S++;
        }
    } return !0; }
    for (var h = 0; h < i.length; h++) {
        for (var d = i[h], w = t.length - d.oldLines, y = 0, L = p + d.oldStart - 1, x = we(L, o, w); y !== void 0; y = x())
            if (v(d, L + y)) {
                d.offset = p += y;
                break;
            }
        if (y === void 0)
            return !1;
        o = d.offset + d.oldStart + d.oldLines;
    }
    for (var g = 0, F = 0; F < i.length; F++) {
        var m = i[F], E = m.oldStart + m.offset + g - 1;
        g += m.newLines - m.oldLines;
        for (var C = 0; C < m.lines.length; C++) {
            var I = m.lines[C], z = I.length > 0 ? I[0] : " ", $ = I.length > 0 ? I.substr(1) : I, J = m.linedelimiters[C];
            if (z === " ")
                E++;
            else if (z === "-")
                t.splice(E, 1), s.splice(E, 1);
            else if (z === "+")
                t.splice(E, 0, $), s.splice(E, 0, J), E++;
            else if (z === "\\") {
                var T = m.lines[C - 1] ? m.lines[C - 1][0] : null;
                T === "+" ? c = !0 : T === "-" && (u = !0);
            }
        }
    }
    if (c)
        for (; !t[t.length - 1];)
            t.pop(), s.pop();
    else
        u && (t.push(""), s.push(`
`));
    for (var A = 0; A < t.length - 1; A++)
        t[A] = t[A] + s[A];
    return t.join("");
}
function k(e, n, r, t, s, i, l) {
    l || (l = {}), typeof l.context == "undefined" && (l.context = 4);
    var f = ue(r, t, l);
    f.push({ value: "", lines: [] });
    function a(y) { return y.map(function (L) { return " " + L; }); }
    for (var o = [], p = 0, c = 0, u = [], v = 1, h = 1, d = function (L) {
        var x = f[L], g = x.lines || x.value.replace(/\n$/, "").split(`
`);
        if (x.lines = g, x.added || x.removed) {
            var F;
            if (!p) {
                var m = f[L - 1];
                p = v, c = h, m && (u = l.context > 0 ? a(m.lines.slice(-l.context)) : [], p -= u.length, c -= u.length);
            }
            (F = u).push.apply(F, b(g.map(function (A) { return (x.added ? "+" : "-") + A; }))), x.added ? h += g.length : v += g.length;
        }
        else {
            if (p)
                if (g.length <= l.context * 2 && L < f.length - 2) {
                    var E;
                    (E = u).push.apply(E, b(a(g)));
                }
                else {
                    var C, I = Math.min(g.length, l.context);
                    (C = u).push.apply(C, b(a(g.slice(0, I))));
                    var z = { oldStart: p, oldLines: v - p + I, newStart: c, newLines: h - c + I, lines: u };
                    if (L >= f.length - 2 && g.length <= l.context) {
                        var $ = /\n$/.test(r), J = /\n$/.test(t), T = g.length == 0 && u.length > z.oldLines;
                        !$ && T && r.length > 0 && u.splice(z.oldLines, 0, "\\ No newline at end of file"), (!$ && !T || !J) && u.push("\\ No newline at end of file");
                    }
                    o.push(z), p = 0, c = 0, u = [];
                }
            v += g.length, h += g.length;
        }
    }, w = 0; w < f.length; w++)
        d(w);
    return { oldFileName: e, newFileName: n, oldHeader: s, newHeader: i, hunks: o };
}
function Le(e) {
    var n = [];
    e.oldFileName == e.newFileName && n.push("Index: " + e.oldFileName), n.push("==================================================================="), n.push("--- " + e.oldFileName + (typeof e.oldHeader == "undefined" ? "" : "	" + e.oldHeader)), n.push("+++ " + e.newFileName + (typeof e.newHeader == "undefined" ? "" : "	" + e.newHeader));
    for (var r = 0; r < e.hunks.length; r++) {
        var t = e.hunks[r];
        t.oldLines === 0 && (t.oldStart -= 1), t.newLines === 0 && (t.newStart -= 1), n.push("@@ -" + t.oldStart + "," + t.oldLines + " +" + t.newStart + "," + t.newLines + " @@"), n.push.apply(n, t.lines);
    }
    return n.join(`
`) + `
`;
}
function Ne(e, n, r, t, s, i, l) { return Le(k(e, n, r, t, s, i, l)); }
function ye(e, n) { return e.length !== n.length ? !1 : G(e, n); }
function G(e, n) { if (n.length > e.length)
    return !1; for (var r = 0; r < n.length; r++)
    if (n[r] !== e[r])
        return !1; return !0; }
function xe(e) { var n = X(e.lines), r = n.oldLines, t = n.newLines; r !== void 0 ? e.oldLines = r : delete e.oldLines, t !== void 0 ? e.newLines = t : delete e.newLines; }
function be(e, n) { if (typeof e == "string") {
    if (/^@@/m.test(e) || /^Index:/m.test(e))
        return _(e)[0];
    if (!n)
        throw new Error("Must provide a base reference or pass in a patch");
    return k(void 0, void 0, n, e);
} return e; }
function ze(e) { return e.newFileName && e.newFileName !== e.oldFileName; }
function Ae(e, n, r) { return n === r ? n : (e.conflict = !0, { mine: n, theirs: r }); }
function He(e, n) { return e.oldStart < n.oldStart && e.oldStart + e.oldLines < n.oldStart; }
function Oe(e, n) { return { oldStart: e.oldStart, oldLines: e.oldLines, newStart: e.newStart + n, newLines: e.newLines, lines: e.lines }; }
function Te(e, n, r, t, s) { var i = { offset: n, lines: r, index: 0 }, l = { offset: t, lines: s, index: 0 }; for (ne(e, i, l), ne(e, l, i); i.index < i.lines.length && l.index < l.lines.length;) {
    var f = i.lines[i.index], a = l.lines[l.index];
    if ((f[0] === "-" || f[0] === "+") && (a[0] === "-" || a[0] === "+"))
        me(e, i, l);
    else if (f[0] === "+" && a[0] === " ") {
        var o;
        (o = e.lines).push.apply(o, b(O(i)));
    }
    else if (a[0] === "+" && f[0] === " ") {
        var p;
        (p = e.lines).push.apply(p, b(O(l)));
    }
    else
        f[0] === "-" && a[0] === " " ? ee(e, i, l) : a[0] === "-" && f[0] === " " ? ee(e, l, i, !0) : f === a ? (e.lines.push(f), i.index++, l.index++) : Q(e, O(i), O(l));
} re(e, i), re(e, l), xe(e); }
function me(e, n, r) { var t = O(n), s = O(r); if (te(t) && te(s)) {
    if (G(t, s) && ie(r, t, t.length - s.length)) {
        var i;
        (i = e.lines).push.apply(i, b(t));
        return;
    }
    else if (G(s, t) && ie(n, s, s.length - t.length)) {
        var l;
        (l = e.lines).push.apply(l, b(s));
        return;
    }
}
else if (ye(t, s)) {
    var f;
    (f = e.lines).push.apply(f, b(t));
    return;
} Q(e, t, s); }
function ee(e, n, r, t) { var s = O(n), i = Fe(r, s); if (i.merged) {
    var l;
    (l = e.lines).push.apply(l, b(i.merged));
}
else
    Q(e, t ? i : s, t ? s : i); }
function Q(e, n, r) { e.conflict = !0, e.lines.push({ conflict: !0, mine: n, theirs: r }); }
function ne(e, n, r) { for (; n.offset < r.offset && n.index < n.lines.length;) {
    var t = n.lines[n.index++];
    e.lines.push(t), n.offset++;
} }
function re(e, n) { for (; n.index < n.lines.length;) {
    var r = n.lines[n.index++];
    e.lines.push(r);
} }
function O(e) { for (var n = [], r = e.lines[e.index][0]; e.index < e.lines.length;) {
    var t = e.lines[e.index];
    if (r === "-" && t[0] === "+" && (r = "+"), r === t[0])
        n.push(t), e.index++;
    else
        break;
} return n; }
function Fe(e, n) { for (var r = [], t = [], s = 0, i = !1, l = !1; s < n.length && e.index < e.lines.length;) {
    var f = e.lines[e.index], a = n[s];
    if (a[0] === "+")
        break;
    if (i = i || f[0] !== " ", t.push(a), s++, f[0] === "+")
        for (l = !0; f[0] === "+";)
            r.push(f), f = e.lines[++e.index];
    a.substr(1) === f.substr(1) ? (r.push(f), e.index++) : l = !0;
} if ((n[s] || "")[0] === "+" && i && (l = !0), l)
    return r; for (; s < n.length;)
    t.push(n[s++]); return { merged: t, changes: r }; }
function te(e) { return e.reduce(function (n, r) { return n && r[0] === "-"; }, !0); }
function ie(e, n, r) { for (var t = 0; t < r; t++) {
    var s = n[n.length - r + t].substr(1);
    if (e.lines[e.index + t] !== " " + s)
        return !1;
} return e.index += r, !0; }
function X(e) { var n = 0, r = 0; return e.forEach(function (t) { if (typeof t != "string") {
    var s = X(t.mine), i = X(t.theirs);
    n !== void 0 && (s.oldLines === i.oldLines ? n += s.oldLines : n = void 0), r !== void 0 && (s.newLines === i.newLines ? r += s.newLines : r = void 0);
}
else
    r !== void 0 && (t[0] === "+" || t[0] === " ") && r++, n !== void 0 && (t[0] === "-" || t[0] === " ") && n++; }), { oldLines: n, newLines: r }; }
function Se(e) { var n = e; return n = n.replace(/&/g, "&amp;"), n = n.replace(/</g, "&lt;"), n = n.replace(/>/g, "&gt;"), n = n.replace(/"/g, "&quot;"), n; }
const Ee = Y, qe = Y;
export { Ee as diffChars };

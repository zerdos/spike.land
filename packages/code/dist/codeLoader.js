const renderDraggableWindow = (onShare)=>{
    const DraggableWindow = ()=>{
        return jsx(React.Fragment, null, jsx(motion.div, {
            css: `\n            background: red;\n            border: 4px solid red;\n            border-radius: 8px;\n          `,
            animate: {
                scale: 1,
                top: 1,
                left: 600
            },
            dragElastic: 0.5,
            dragMomentum: false,
            initial: {
                top: 1,
                left: 0,
                scale: 0.7
            },
            transition: {
                duration: 0.5
            },
            drag: true,
            dragConstraints: {
                left: -window.innerWidth + 200,
                right: 0,
                bottom: window.innerHeight - 200,
                top: 0
            }
        }, jsx("div", {
            css: `\n      display: block;\n      with: 100%;\n      text-align: right;\n      background: linear-gradient(0deg, darkred, red);\n    `
        }, jsx("button", {
            css: `\n              background: darkred;\n              margin-top: -4px;\n              color: white;\n              cursor: pointer;\n              font-weight: bold;\n              font-family: Roboto;\n              padding: 8px 16px;\n              outline: none;\n              border: none;\n              border-radius: 0px 8px 0px 0px;\n            `,
            onClick: ()=>onShare()
        }, "🌎 SHARE")), jsx("div", {
            css: `  \n      min-width: 200px;\n      padding: 30px;\n      max-width: 600px;\n      background: white;\n      max-height: 800px;\n      border-radius: 0px 0px 8px 8px;\n      overflow-y: overlay;\n    `,
            id: "root"
        })));
    };
    ReactDOM.render(jsx(DraggableWindow), document.getElementById("dragabbleWindow"));
};
function renderDraggableEditor() {
    const jsFrame = new JSFrame();
    const frame = jsFrame.create({
        name: `Win`,
        title: ``,
        width: window.innerWidth / 2 - 40,
        height: 600,
        minWidth: 300,
        minHeight: 300,
        appearanceName: "material",
        appearanceParam: {
            titleBar: {
                color: "white",
                height: 40,
                background: "#1e1e1e"
            }
        },
        style: {
            backgroundColor: "rgba(255,255,255,0.8)",
            overflow: "auto"
        },
        style: {
            backgroundColor: "rgba(0,0,0,0.8)",
            overflow: "hidden",
            width: "100%"
        },
        html: '<div id="container"></div>'
    });
    frame.setPosition(window.innerWidth - 32, 32, "RIGHT_TOP");
    frame.setControl({
        maximizeButton: "maximizeButton",
        demaximizeButton: "restoreButton",
        minimizeButton: "minimizeButton",
        deminimizeButton: "deminimizeButton",
        hideButton: "closeButton",
        animation: true,
        animationDuration: 150
    });
    frame.control.on("hid", (frame1, info)=>{
        frame1.closeFrame();
    });
    frame.control.on("maximized", (frame1, info)=>{
        jsFrame.showToast({
            text: "Maximized"
        });
    });
    frame.control.on("demaximized", (frame1, info)=>{
    });
    frame.control.on("minimized", (frame1, info)=>{
    });
    frame.control.on("dminimized", (frame1, info)=>{
    });
    frame.show();
    console.log(frame);
}
function loadScript(src) {
    return new Promise(function(resolve, reject) {
        var s;
        s = window.document.createElement("script");
        s.src = src;
        s.onload = ()=>resolve(window)
        ;
        s.onerror = reject;
        window.document.head.appendChild(s);
    });
}
const importScript = async (src)=>document.querySelector(`script[src="${src}"]`) || new Promise(function(resolve, reject) {
        const s = window.document.createElement("script");
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        window.document.head.appendChild(s);
    })
;
const starter = `import { useState } from "react";\nimport { motion } from "framer-motion";\nimport { css, Global } from "@emotion/react";;\n\nconst Slider = () => {\n  const [sliderValue, setSlider] = useState(64);\n\n  return <>\n  <Global styles={css\`\n      body{\n          margin: 0;\n          background: rgb(\${sliderValue},\${255-sliderValue},255);\n          overflow: overlay;\n        }  \n    \`}/>\n    <input max="128"\n      css={\`\n        appearance: none;\n        width: 100%;\n        height: 40px; \n        background: rgb(\${sliderValue*2},\${255-2*sliderValue},0); \n        outline: none; \n    \`} type="range"\n      value={sliderValue} step="1"\n      onChangeCapture={(e) => setSlider(Number(e.currentTarget.value))}>\n    </input>\n    <motion.p\n      animate={{ fontSize: sliderValue + \`px\` }}>\n      Example when the text gets bigger...\n    </motion.p>\n      <motion.p animate={{fontSize:128-sliderValue+"px"}}>\n        ...or smaller\n    </motion.p>\n  </>\n}\n\nexport default () => <>\n  <Slider />\n</>\n`;
async function arrBuffSha256(msgBuffer) {
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b)=>("00" + b.toString(16)).slice(-2)
    ).join("");
    return hashHex;
}
(function(c, w) {
    typeof exports == "object" && typeof module != "undefined" ? w(exports) : typeof define == "function" && define.amd ? define([
        "exports"
    ], w) : (c = c || self, w(c.Diff = {
    }));
})(this, function(c) {
    "use strict";
    function w() {
    }
    w.prototype = {
        diff: function(n, t) {
            var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
            }, f = r.callback;
            typeof r == "function" && (f = r, r = {
            }), this.options = r;
            var i = this;
            function l(d) {
                return f ? (setTimeout(function() {
                    f(void 0, d);
                }, 0), !0) : d;
            }
            n = this.castInput(n), t = this.castInput(t), n = this.removeEmpty(this.tokenize(n)), t = this.removeEmpty(this.tokenize(t));
            var s = t.length, o = n.length, u = 1, p = s + o, v = [
                {
                    newPos: -1,
                    components: []
                }
            ], a = this.extractCommon(v[0], t, n, 0);
            if (v[0].newPos + 1 >= s && a + 1 >= o) return l([
                {
                    value: this.join(t),
                    count: t.length
                }
            ]);
            function h() {
                for(var d = -1 * u; d <= u; d += 2){
                    var y = void 0, x = v[d - 1], m = v[d + 1], F = (m ? m.newPos : 0) - d;
                    x && (v[d - 1] = void 0);
                    var L = x && x.newPos + 1 < s, I = m && 0 <= F && F < o;
                    if (!L && !I) {
                        v[d] = void 0;
                        continue;
                    }
                    if (!L || I && x.newPos < m.newPos ? (y = C(m), i.pushComponent(y.components, void 0, !0)) : (y = x, y.newPos++, i.pushComponent(y.components, !0, void 0)), F = i.extractCommon(y, t, n, d), y.newPos + 1 >= s && F + 1 >= o) return l(O(i, y.components, t, n, i.useLongestToken));
                    v[d] = y;
                }
                u++;
            }
            if (f) (function d() {
                setTimeout(function() {
                    if (u > p) return f();
                    h() || d();
                }, 0);
            })();
            else for(; u <= p;){
                var g = h();
                if (g) return g;
            }
        },
        pushComponent: function(n, t, r) {
            var f = n[n.length - 1];
            f && f.added === t && f.removed === r ? n[n.length - 1] = {
                count: f.count + 1,
                added: t,
                removed: r
            } : n.push({
                count: 1,
                added: t,
                removed: r
            });
        },
        extractCommon: function(n, t, r, f) {
            for(var i = t.length, l = r.length, s = n.newPos, o = s - f, u = 0; s + 1 < i && o + 1 < l && this.equals(t[s + 1], r[o + 1]);)s++, o++, u++;
            return u && n.components.push({
                count: u
            }), n.newPos = s, o;
        },
        equals: function(n, t) {
            return this.options.comparator ? this.options.comparator(n, t) : n === t || this.options.ignoreCase && n.toLowerCase() === t.toLowerCase();
        },
        removeEmpty: function(n) {
            for(var t = [], r = 0; r < n.length; r++)n[r] && t.push(n[r]);
            return t;
        },
        castInput: function(n) {
            return n;
        },
        tokenize: function(n) {
            return n.split("");
        },
        join: function(n) {
            return n.join("");
        }
    };
    function O(e, n, t, r, f) {
        for(var i = 0, l = n.length, s = 0, o = 0; i < l; i++){
            var u = n[i];
            if (u.removed) {
                if ((u.value = e.join(r.slice(o, o + u.count)), o += u.count, i && n[i - 1].added)) {
                    var v = n[i - 1];
                    n[i - 1] = n[i], n[i] = v;
                }
            } else {
                if (!u.added && f) {
                    var p = t.slice(s, s + u.count);
                    p = p.map(function(h, g) {
                        var d = r[o + g];
                        return d.length > h.length ? d : h;
                    }), u.value = e.join(p);
                } else u.value = e.join(t.slice(s, s + u.count));
                s += u.count, u.added || (o += u.count);
            }
        }
        var a = n[l - 1];
        return (l > 1 && typeof a.value == "string" && (a.added || a.removed) && e.equals("", a.value) && (n[l - 2].value += a.value, n.pop()), n);
    }
    function C(e) {
        return {
            newPos: e.newPos,
            components: e.components.slice(0)
        };
    }
    var H = new w;
    function ye(e, n, t) {
        return H.diff(e, n, t);
    }
    function te(e, n) {
        if (typeof e == "function") n.callback = e;
        else if (e) for(var t in e)e.hasOwnProperty(t) && (n[t] = e[t]);
        return n;
    }
    var re = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/, ie = /\S/, R = new w;
    R.equals = function(e, n) {
        return this.options.ignoreCase && (e = e.toLowerCase(), n = n.toLowerCase()), e === n || this.options.ignoreWhitespace && !ie.test(e) && !ie.test(n);
    }, R.tokenize = function(e) {
        for(var n = e.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/), t = 0; t < n.length - 1; t++)!n[t + 1] && n[t + 2] && re.test(n[t]) && re.test(n[t + 2]) && (n[t] += n[t + 2], n.splice(t + 1, 2), t--);
        return n;
    };
    function me(e, n, t) {
        return (t = te(t, {
            ignoreWhitespace: !0
        }), R.diff(e, n, t));
    }
    function xe(e, n, t) {
        return R.diff(e, n, t);
    }
    var D = new w;
    D.tokenize = function(e) {
        var n = [], t = e.split(/(\n|\r\n)/);
        t[t.length - 1] || t.pop();
        for(var r = 0; r < t.length; r++){
            var f = t[r];
            r % 2 && !this.options.newlineIsToken ? n[n.length - 1] += f : (this.options.ignoreWhitespace && (f = f.trim()), n.push(f));
        }
        return n;
    };
    function fe(e, n, t) {
        return D.diff(e, n, t);
    }
    function Fe(e, n, t) {
        var r = te(t, {
            ignoreWhitespace: !0
        });
        return D.diff(e, n, r);
    }
    var le = new w;
    le.tokenize = function(e) {
        return e.split(/(\S.+?[.!?])(?=\s+|$)/);
    };
    function Ne(e, n, t) {
        return le.diff(e, n, t);
    }
    var se = new w;
    se.tokenize = function(e) {
        return e.split(/([{}:;,]|\s+)/);
    };
    function He(e, n, t) {
        return se.diff(e, n, t);
    }
    function B(e) {
        return (typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? B = function(n) {
            return typeof n;
        } : B = function(n) {
            return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, B(e));
    }
    function S(e) {
        return Se(e) || Ie(e) || Ae(e) || Ee();
    }
    function Se(e) {
        if (Array.isArray(e)) return Q(e);
    }
    function Ie(e) {
        if (typeof Symbol != "undefined" && Symbol.iterator in Object(e)) return Array.from(e);
    }
    function Ae(e, n) {
        if (!e) return;
        if (typeof e == "string") return Q(e, n);
        var t = Object.prototype.toString.call(e).slice(8, -1);
        if ((t === "Object" && e.constructor && (t = e.constructor.name), t === "Map" || t === "Set")) return Array.from(e);
        if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) return Q(e, n);
    }
    function Q(e, n) {
        (n == null || n > e.length) && (n = e.length);
        for(var t = 0, r = new Array(n); t < n; t++)r[t] = e[t];
        return r;
    }
    function Ee() {
        throw new TypeError(`Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var Te = Object.prototype.toString, q = new w;
    q.useLongestToken = !0, q.tokenize = D.tokenize, q.castInput = function(e) {
        var n = this.options, t = n.undefinedReplacement, r = n.stringifyReplacer, f = r === void 0 ? function(i, l) {
            return typeof l == "undefined" ? t : l;
        } : r;
        return typeof e == "string" ? e : JSON.stringify(P(e, null, null, f), f, "  ");
    }, q.equals = function(e, n) {
        return w.prototype.equals.call(q, e.replace(/,([\r\n])/g, "$1"), n.replace(/,([\r\n])/g, "$1"));
    };
    function be(e, n, t) {
        return q.diff(e, n, t);
    }
    function P(e, n, t, r, f) {
        n = n || [], t = t || [], r && (e = r(f, e));
        var i;
        for(i = 0; i < n.length; i += 1)if (n[i] === e) return t[i];
        var l;
        if (Te.call(e) === "[object Array]") {
            for((n.push(e), l = new Array(e.length), t.push(l), i = 0); i < e.length; i += 1)l[i] = P(e[i], n, t, r, f);
            return (n.pop(), t.pop(), l);
        }
        if ((e && e.toJSON && (e = e.toJSON()), B(e) === "object" && e !== null)) {
            n.push(e), l = {
            }, t.push(l);
            var s = [], o;
            for(o in e)e.hasOwnProperty(o) && s.push(o);
            for((s.sort(), i = 0); i < s.length; i += 1)o = s[i], l[o] = P(e[o], n, t, r, o);
            n.pop(), t.pop();
        } else l = e;
        return l;
    }
    var U = new w;
    U.tokenize = function(e) {
        return e.slice();
    }, U.join = U.removeEmpty = function(e) {
        return e;
    };
    function Oe(e, n, t) {
        return U.diff(e, n, t);
    }
    function V(e) {
        var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
        }, t = e.split(/\r\n|[\n\v\f\r\x85]/), r = e.match(/\r\n|[\n\v\f\r\x85]/g) || [], f = [], i = 0;
        function l() {
            var u = {
            };
            for(f.push(u); i < t.length;){
                var p = t[i];
                if (/^(\-\-\-|\+\+\+|@@)\s/.test(p)) break;
                var v = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(p);
                v && (u.index = v[1]), i++;
            }
            for((s(u), s(u), u.hunks = []); i < t.length;){
                var a = t[i];
                if (/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(a)) break;
                if (/^@@/.test(a)) u.hunks.push(o());
                else {
                    if (a && n.strict) throw new Error("Unknown line " + (i + 1) + " " + JSON.stringify(a));
                    i++;
                }
            }
        }
        function s(u) {
            var p = /^(---|\+\+\+)\s+(.*)$/.exec(t[i]);
            if (p) {
                var v = p[1] === "---" ? "old" : "new", a = p[2].split("	", 2), h = a[0].replace(/\\\\/g, "\\");
                /^".*"$/.test(h) && (h = h.substr(1, h.length - 2)), u[v + "FileName"] = h, u[v + "Header"] = (a[1] || "").trim(), i++;
            }
        }
        function o() {
            var u = i, p = t[i++], v = p.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/), a = {
                oldStart: +v[1],
                oldLines: typeof v[2] == "undefined" ? 1 : +v[2],
                newStart: +v[3],
                newLines: typeof v[4] == "undefined" ? 1 : +v[4],
                lines: [],
                linedelimiters: []
            };
            a.oldLines === 0 && (a.oldStart += 1), a.newLines === 0 && (a.newStart += 1);
            for(var h = 0, g = 0; i < t.length && !(t[i].indexOf("--- ") === 0 && i + 2 < t.length && t[i + 1].indexOf("+++ ") === 0 && t[i + 2].indexOf("@@") === 0); i++){
                var d = t[i].length == 0 && i != t.length - 1 ? " " : t[i][0];
                if (d === "+" || d === "-" || d === " " || d === "\\") a.lines.push(t[i]), a.linedelimiters.push(r[i] || `\n`), d === "+" ? h++ : d === "-" ? g++ : d === " " && (h++, g++);
                else break;
            }
            if ((!h && a.newLines === 1 && (a.newLines = 0), !g && a.oldLines === 1 && (a.oldLines = 0), n.strict)) {
                if (h !== a.newLines) throw new Error("Added line count did not match for hunk at line " + (u + 1));
                if (g !== a.oldLines) throw new Error("Removed line count did not match for hunk at line " + (u + 1));
            }
            return a;
        }
        for(; i < t.length;)l();
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
    function oe(e, n) {
        var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
        };
        if ((typeof n == "string" && (n = V(n)), Array.isArray(n))) {
            if (n.length > 1) throw new Error("applyPatch only works with a single input.");
            n = n[0];
        }
        var r = e.split(/\r\n|[\n\v\f\r\x85]/), f = e.match(/\r\n|[\n\v\f\r\x85]/g) || [], i = n.hunks, l = t.compareLine || function(ee, J, G, M) {
            return J === M;
        }, s = 0, o = t.fuzzFactor || 0, u = 0, p = 0, v, a;
        function h(ee, J) {
            for(var G = 0; G < ee.lines.length; G++){
                var M = ee.lines[G], ne = M.length > 0 ? M[0] : " ", Xe = M.length > 0 ? M.substr(1) : M;
                if (ne === " " || ne === "-") {
                    if (!l(J + 1, r[J], ne, Xe) && (s++, s > o)) return !1;
                    J++;
                }
            }
            return !0;
        }
        for(var g = 0; g < i.length; g++){
            for(var d = i[g], y = r.length - d.oldLines, x = 0, m = p + d.oldStart - 1, F = ze(m, u, y); x !== void 0; x = F())if (h(d, m + x)) {
                d.offset = p += x;
                break;
            }
            if (x === void 0) return !1;
            u = d.offset + d.oldStart + d.oldLines;
        }
        for(var L = 0, I = 0; I < i.length; I++){
            var N = i[I], A = N.oldStart + N.offset + L - 1;
            L += N.newLines - N.oldLines;
            for(var E = 0; E < N.lines.length; E++){
                var T = N.lines[E], b = T.length > 0 ? T[0] : " ", Z = T.length > 0 ? T.substr(1) : T, k = N.linedelimiters[E];
                if (b === " ") A++;
                else if (b === "-") r.splice(A, 1), f.splice(A, 1);
                else if (b === "+") r.splice(A, 0, Z), f.splice(A, 0, k), A++;
                else if (b === "\\") {
                    var $ = N.lines[E - 1] ? N.lines[E - 1][0] : null;
                    $ === "+" ? v = !0 : $ === "-" && (a = !0);
                }
            }
        }
        if (v) for(; !r[r.length - 1];)r.pop(), f.pop();
        else a && (r.push(""), f.push(`\n`));
        for(var W = 0; W < r.length - 1; W++)r[W] = r[W] + f[W];
        return r.join("");
    }
    function We(e, n) {
        typeof e == "string" && (e = V(e));
        var t = 0;
        function r() {
            var f = e[t++];
            if (!f) return n.complete();
            n.loadFile(f, function(i, l) {
                if (i) return n.complete(i);
                var s = oe(l, f, n);
                n.patched(f, s, function(o) {
                    if (o) return n.complete(o);
                    r();
                });
            });
        }
        r();
    }
    function Y(e, n, t, r, f, i, l) {
        l || (l = {
        }), typeof l.context == "undefined" && (l.context = 4);
        var s = fe(t, r, l);
        s.push({
            value: "",
            lines: []
        });
        function o(x) {
            return x.map(function(m) {
                return " " + m;
            });
        }
        for(var u = [], p = 0, v = 0, a = [], h = 1, g = 1, d = function(m) {
            var F = s[m], L = F.lines || F.value.replace(/\n$/, "").split(`\n`);
            if ((F.lines = L, F.added || F.removed)) {
                var I;
                if (!p) {
                    var N = s[m - 1];
                    p = h, v = g, N && (a = l.context > 0 ? o(N.lines.slice(-l.context)) : [], p -= a.length, v -= a.length);
                }
                (I = a).push.apply(I, S(L.map(function(W) {
                    return (F.added ? "+" : "-") + W;
                }))), F.added ? g += L.length : h += L.length;
            } else {
                if (p) {
                    if (L.length <= l.context * 2 && m < s.length - 2) {
                        var A;
                        (A = a).push.apply(A, S(o(L)));
                    } else {
                        var E, T = Math.min(L.length, l.context);
                        (E = a).push.apply(E, S(o(L.slice(0, T))));
                        var b = {
                            oldStart: p,
                            oldLines: h - p + T,
                            newStart: v,
                            newLines: g - v + T,
                            lines: a
                        };
                        if (m >= s.length - 2 && L.length <= l.context) {
                            var Z = /\n$/.test(t), k = /\n$/.test(r), $ = L.length == 0 && a.length > b.oldLines;
                            !Z && $ && t.length > 0 && a.splice(b.oldLines, 0, "\\ No newline at end of file"), (!Z && !$ || !k) && a.push("\\ No newline at end of file");
                        }
                        u.push(b), p = 0, v = 0, a = [];
                    }
                }
                h += L.length, g += L.length;
            }
        }, y = 0; y < s.length; y++)d(y);
        return {
            oldFileName: e,
            newFileName: n,
            oldHeader: f,
            newHeader: i,
            hunks: u
        };
    }
    function Me(e) {
        var n = [];
        e.oldFileName == e.newFileName && n.push("Index: " + e.oldFileName), n.push("==================================================================="), n.push("--- " + e.oldFileName + (typeof e.oldHeader == "undefined" ? "" : "	" + e.oldHeader)), n.push("+++ " + e.newFileName + (typeof e.newHeader == "undefined" ? "" : "	" + e.newHeader));
        for(var t = 0; t < e.hunks.length; t++){
            var r = e.hunks[t];
            r.oldLines === 0 && (r.oldStart -= 1), r.newLines === 0 && (r.newStart -= 1), n.push("@@ -" + r.oldStart + "," + r.oldLines + " +" + r.newStart + "," + r.newLines + " @@"), n.push.apply(n, r.lines);
        }
        return n.join(`\n`) + `\n`;
    }
    function ue(e, n, t, r, f, i, l) {
        return Me(Y(e, n, t, r, f, i, l));
    }
    function qe(e, n, t, r, f, i) {
        return ue(e, e, n, t, r, f, i);
    }
    function Ce(e, n) {
        return e.length !== n.length ? !1 : K(e, n);
    }
    function K(e, n) {
        if (n.length > e.length) return !1;
        for(var t = 0; t < n.length; t++)if (n[t] !== e[t]) return !1;
        return !0;
    }
    function $e(e) {
        var n = _(e.lines), t = n.oldLines, r = n.newLines;
        t !== void 0 ? e.oldLines = t : delete e.oldLines, r !== void 0 ? e.newLines = r : delete e.newLines;
    }
    function Je(e, n, t) {
        e = ae(e, t), n = ae(n, t);
        var r = {
        };
        (e.index || n.index) && (r.index = e.index || n.index), (e.newFileName || n.newFileName) && (de(e) ? de(n) ? (r.oldFileName = X(r, e.oldFileName, n.oldFileName), r.newFileName = X(r, e.newFileName, n.newFileName), r.oldHeader = X(r, e.oldHeader, n.oldHeader), r.newHeader = X(r, e.newHeader, n.newHeader)) : (r.oldFileName = e.oldFileName, r.newFileName = e.newFileName, r.oldHeader = e.oldHeader, r.newHeader = e.newHeader) : (r.oldFileName = n.oldFileName || e.oldFileName, r.newFileName = n.newFileName || e.newFileName, r.oldHeader = n.oldHeader || e.oldHeader, r.newHeader = n.newHeader || e.newHeader)), r.hunks = [];
        for(var f = 0, i = 0, l = 0, s = 0; f < e.hunks.length || i < n.hunks.length;){
            var o = e.hunks[f] || {
                oldStart: Infinity
            }, u = n.hunks[i] || {
                oldStart: Infinity
            };
            if (ce(o, u)) r.hunks.push(pe(o, l)), f++, s += o.newLines - o.oldLines;
            else if (ce(u, o)) r.hunks.push(pe(u, s)), i++, l += u.newLines - u.oldLines;
            else {
                var p = {
                    oldStart: Math.min(o.oldStart, u.oldStart),
                    oldLines: 0,
                    newStart: Math.min(o.newStart + l, u.oldStart + s),
                    newLines: 0,
                    lines: []
                };
                Re(p, o.oldStart, o.lines, u.oldStart, u.lines), i++, f++, r.hunks.push(p);
            }
        }
        return r;
    }
    function ae(e, n) {
        if (typeof e == "string") {
            if (/^@@/m.test(e) || /^Index:/m.test(e)) return V(e)[0];
            if (!n) throw new Error("Must provide a base reference or pass in a patch");
            return Y(void 0, void 0, n, e);
        }
        return e;
    }
    function de(e) {
        return e.newFileName && e.newFileName !== e.oldFileName;
    }
    function X(e, n, t) {
        return n === t ? n : (e.conflict = !0, {
            mine: n,
            theirs: t
        });
    }
    function ce(e, n) {
        return e.oldStart < n.oldStart && e.oldStart + e.oldLines < n.oldStart;
    }
    function pe(e, n) {
        return {
            oldStart: e.oldStart,
            oldLines: e.oldLines,
            newStart: e.newStart + n,
            newLines: e.newLines,
            lines: e.lines
        };
    }
    function Re(e, n, t, r, f) {
        var i = {
            offset: n,
            lines: t,
            index: 0
        }, l = {
            offset: r,
            lines: f,
            index: 0
        };
        for((he(e, i, l), he(e, l, i)); i.index < i.lines.length && l.index < l.lines.length;){
            var s = i.lines[i.index], o = l.lines[l.index];
            if ((s[0] === "-" || s[0] === "+") && (o[0] === "-" || o[0] === "+")) De(e, i, l);
            else if (s[0] === "+" && o[0] === " ") {
                var u;
                (u = e.lines).push.apply(u, S(z(i)));
            } else if (o[0] === "+" && s[0] === " ") {
                var p;
                (p = e.lines).push.apply(p, S(z(l)));
            } else s[0] === "-" && o[0] === " " ? ve(e, i, l) : o[0] === "-" && s[0] === " " ? ve(e, l, i, !0) : s === o ? (e.lines.push(s), i.index++, l.index++) : j(e, z(i), z(l));
        }
        we(e, i), we(e, l), $e(e);
    }
    function De(e, n, t) {
        var r = z(n), f = z(t);
        if (ge(r) && ge(f)) {
            if (K(r, f) && Le(t, r, r.length - f.length)) {
                var i;
                (i = e.lines).push.apply(i, S(r));
                return;
            } else if (K(f, r) && Le(n, f, f.length - r.length)) {
                var l;
                (l = e.lines).push.apply(l, S(f));
                return;
            }
        } else if (Ce(r, f)) {
            var s;
            (s = e.lines).push.apply(s, S(r));
            return;
        }
        j(e, r, f);
    }
    function ve(e, n, t, r) {
        var f = z(n), i = Be(t, f);
        if (i.merged) {
            var l;
            (l = e.lines).push.apply(l, S(i.merged));
        } else j(e, r ? i : f, r ? f : i);
    }
    function j(e, n, t) {
        e.conflict = !0, e.lines.push({
            conflict: !0,
            mine: n,
            theirs: t
        });
    }
    function he(e, n, t) {
        for(; n.offset < t.offset && n.index < n.lines.length;){
            var r = n.lines[n.index++];
            e.lines.push(r), n.offset++;
        }
    }
    function we(e, n) {
        for(; n.index < n.lines.length;){
            var t = n.lines[n.index++];
            e.lines.push(t);
        }
    }
    function z(e) {
        for(var n = [], t = e.lines[e.index][0]; e.index < e.lines.length;){
            var r = e.lines[e.index];
            if ((t === "-" && r[0] === "+" && (t = "+"), t === r[0])) n.push(r), e.index++;
            else break;
        }
        return n;
    }
    function Be(e, n) {
        for(var t = [], r = [], f = 0, i = !1, l = !1; f < n.length && e.index < e.lines.length;){
            var s = e.lines[e.index], o = n[f];
            if (o[0] === "+") break;
            if ((i = i || s[0] !== " ", r.push(o), f++, s[0] === "+")) for(l = !0; s[0] === "+";)t.push(s), s = e.lines[++e.index];
            o.substr(1) === s.substr(1) ? (t.push(s), e.index++) : l = !0;
        }
        if (((n[f] || "")[0] === "+" && i && (l = !0), l)) return t;
        for(; f < n.length;)r.push(n[f++]);
        return {
            merged: r,
            changes: t
        };
    }
    function ge(e) {
        return e.reduce(function(n, t) {
            return n && t[0] === "-";
        }, !0);
    }
    function Le(e, n, t) {
        for(var r = 0; r < t; r++){
            var f = n[n.length - t + r].substr(1);
            if (e.lines[e.index + r] !== " " + f) return !1;
        }
        return (e.index += t, !0);
    }
    function _(e) {
        var n = 0, t = 0;
        return (e.forEach(function(r) {
            if (typeof r != "string") {
                var f = _(r.mine), i = _(r.theirs);
                n !== void 0 && (f.oldLines === i.oldLines ? n += f.oldLines : n = void 0), t !== void 0 && (f.newLines === i.newLines ? t += f.newLines : t = void 0);
            } else t !== void 0 && (r[0] === "+" || r[0] === " ") && t++, n !== void 0 && (r[0] === "-" || r[0] === " ") && n++;
        }), {
            oldLines: n,
            newLines: t
        });
    }
    function Pe(e) {
        for(var n = [], t, r, f = 0; f < e.length; f++)t = e[f], t.added ? r = 1 : t.removed ? r = -1 : r = 0, n.push([
            r,
            t.value
        ]);
        return n;
    }
    function Ue(e) {
        for(var n = [], t = 0; t < e.length; t++){
            var r = e[t];
            r.added ? n.push("<ins>") : r.removed && n.push("<del>"), n.push(Ve(r.value)), r.added ? n.push("</ins>") : r.removed && n.push("</del>");
        }
        return n.join("");
    }
    function Ve(e) {
        var n = e;
        return (n = n.replace(/&/g, "&amp;"), n = n.replace(/</g, "&lt;"), n = n.replace(/>/g, "&gt;"), n = n.replace(/"/g, "&quot;"), n);
    }
    c.Diff = w, c.applyPatch = oe, c.applyPatches = We, c.canonicalize = P, c.convertChangesToDMP = Pe, c.convertChangesToXML = Ue, c.createPatch = qe, c.createTwoFilesPatch = ue, c.diffArrays = Oe, c.diffChars = ye, c.diffCss = He, c.diffJson = be, c.diffLines = fe, c.diffSentences = Ne, c.diffTrimmedLines = Fe, c.diffWords = me, c.diffWordsWithSpace = xe, c.merge = Je, c.parsePatch = V, c.structuredPatch = Y, Object.defineProperty(c, "__esModule", {
        value: !0
    });
});
async function Ze(c) {
    const w = await crypto.subtle.digest("SHA-256", c), O = Array.from(new Uint8Array(w)), C = O.map((H)=>("00" + H.toString(16)).slice(-2)
    ).join("");
    return C;
}
async function Ge(c) {
    const w = new TextEncoder().encode(c), O = await Ze(w);
    return O.substr(0, 8);
}
const diff1 = async (c, w)=>{
    const O = Ge(c), C = Diff.diffChars(c, w);
    return {
        b: await O,
        c: C.map((H)=>H.added ? H.value : H.removed ? -H.count : H.count
        )
    };
};
const instanceOfAny = (object, constructors)=>constructors.some((c)=>object instanceof c
    )
;
let idbProxyableTypes;
let cursorAdvanceMethods;
function getIdbProxyableTypes() {
    return idbProxyableTypes || (idbProxyableTypes = [
        IDBDatabase,
        IDBObjectStore,
        IDBIndex,
        IDBCursor,
        IDBTransaction
    ]);
}
function getCursorAdvanceMethods() {
    return cursorAdvanceMethods || (cursorAdvanceMethods = [
        IDBCursor.prototype.advance,
        IDBCursor.prototype.continue,
        IDBCursor.prototype.continuePrimaryKey
    ]);
}
const cursorRequestMap = new WeakMap();
const transactionDoneMap = new WeakMap();
const transactionStoreNamesMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
function cacheDonePromiseForTransaction(tx) {
    if (transactionDoneMap.has(tx)) return;
    const done = new Promise((resolve, reject)=>{
        const unlisten = ()=>{
            tx.removeEventListener('complete', complete);
            tx.removeEventListener('error', error);
            tx.removeEventListener('abort', error);
        };
        const complete = ()=>{
            resolve();
            unlisten();
        };
        const error = ()=>{
            reject(tx.error || new DOMException('AbortError', 'AbortError'));
            unlisten();
        };
        tx.addEventListener('complete', complete);
        tx.addEventListener('error', error);
        tx.addEventListener('abort', error);
    });
    transactionDoneMap.set(tx, done);
}
const unwrap = (value)=>reverseTransformCache.get(value)
;
const readMethods = [
    'get',
    'getKey',
    'getAll',
    'getAllKeys',
    'count'
];
const writeMethods = [
    'put',
    'add',
    'delete',
    'clear'
];
const cachedMethods = new Map();
function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === 'string')) {
        return;
    }
    if (cachedMethods.get(prop)) return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, '');
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (!(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) {
        return;
    }
    const method = async function(storeName, ...args) {
        const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
        let target1 = tx.store;
        if (useIndex) target1 = target1.index(args.shift());
        const returnVal = await target1[targetFuncName](...args);
        if (isWrite) await tx.done;
        return returnVal;
    };
    cachedMethods.set(prop, method);
    return method;
}
var ReactDOM = window.ReactDOM;
const getUrl = ()=>{
    if (document.location.href.includes("zed.dev")) {
        return "https://code.zed.dev";
    }
    return "https://code.zed.vision";
};
let firstLoad = true;
let latestCode = "";
let busy = 0;
let keystrokeTillNoError = 0;
let errorReported = "";
let latestSavedCode = "";
let latestGoodCode = "";
let shareItAsHtml;
const startMonaco = async ({ onChange , code , language  })=>{
    const container = window.document.getElementById("container");
    if (!container) {
        const el = document.getElementById("container");
        el.id = "container";
        document.body.appendChild(el);
    }
    const modelUri = language === "typescript" ? "file:///main.tsx" : "file:///main.html";
    let aceEditor;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)) {
        const aceEl = window.document.createElement("div");
        aceEl.id = "ace";
        window.document.body.appendChild(aceEl);
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.min.js");
        language === "typescript" ? await loadScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-typescript.min.js") : await loadScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-html.min.js");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/theme-monokai.min.js");
        window.document.getElementById("ace").style.setProperty("display", "block");
        container.style.setProperty("display", "none");
        aceEditor = window["ace"].edit("ace");
        aceEditor.getSession().setMode("ace/mode/typescript");
        const setThemeForAce = (wait)=>setTimeout(()=>{
                let aceEditor1 = window["ace"].edit("ace");
                let theme = aceEditor1.getTheme();
                if (theme !== "ace/theme/monokai ") {
                    aceEditor1.setOptions({
                        fontSize: "14pt"
                    });
                    aceEditor1.setTheme("ace/theme/monokai");
                    setThemeForAce(2 * wait);
                }
            }, wait)
        ;
        setThemeForAce(100);
        aceEditor.setValue(code);
        aceEditor.blur();
    }
    if (window["monaco"] === undefined) {
        const vsPath = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs";
        const { require  } = await loadScript(`${vsPath}/loader.min.js`);
        require.config({
            paths: {
                "vs": vsPath
            }
        });
        await new Promise((resolve)=>require([
                "vs/editor/editor.main"
            ], (monaco)=>{
                resolve(monaco);
            })
        );
    }
    const monaco = window["monaco"];
    const modules = {
        monaco: monaco,
        editor: monaco.editor.create(window.document.getElementById("container"), {
            formatOnType: true,
            scrollbar: {
                horizontal: "hidden",
                verticalHasArrows: true,
                verticalScrollbarSize: 20
            },
            minimap: {
                enabled: false
            },
            folding: false,
            multiCursorModifier: "alt",
            wordWrap: "on",
            wordWrapBreakAfterCharacters: ">([{]))],;} ",
            mouseWheelZoom: false,
            wordWrapColumn: 80,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            autoIndent: "brackets",
            autoClosingQuotes: "always",
            padding: {
                bottom: 300
            },
            lineNumbers: "on",
            autoClosingBrackets: "always",
            autoClosingOvertype: "always",
            suggest: {
            },
            codeLens: true,
            autoSurround: "languageDefined",
            trimAutoWhitespace: true,
            codeActionsOnSaveTimeout: 100,
            model: monaco.editor.getModel(modelUri) || monaco.editor.createModel(code, language, monaco.Uri.parse(modelUri)),
            value: code,
            language: language,
            theme: "vs-dark"
        })
    };
    modules.editor.onDidChangeModelContent(()=>onChange(modules.editor.getValue())
    );
    aceEditor && aceEditor.session.on("change", function() {
        const value = aceEditor.getValue();
        modules.editor.setValue(value);
        onChange(value);
    });
    aceEditor && document.getElementById("container").replaceWith(document.getElementById("ace"));
    modules.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSuggestionDiagnostics: true,
        noSemanticValidation: true,
        noSyntaxValidation: true
    });
    if (language === "typescript") {
        const importHelper = [
            {
                name: "react",
                url: "https://unpkg.com/@types/react@17.0.0/index.d.ts",
                depend: [
                    "global",
                    "csstype",
                    "react-dom",
                    "prop-types"
                ]
            },
            {
                name: "global",
                url: "https://unpkg.com/@types/react@17.0.0/global.d.ts",
                depend: []
            },
            {
                name: "prop-types",
                url: "https://unpkg.com/@types/prop-types@15.7.3/index.d.ts",
                depend: []
            },
            {
                name: "react-dom",
                url: "https://unpkg.com/@types/react-dom@17.0.0/index.d.ts",
                depend: []
            },
            {
                name: "csstype",
                url: "https://unpkg.com/csstype@3.0.5/index.d.ts",
                depend: []
            },
            {
                name: "@emotion/styled/base.d.ts",
                url: "https://unpkg.com/@emotion/styled@11.0.0/types/base.d.ts",
                depend: [
                    "@emotion/react",
                    "@emotion/serialize",
                    "react"
                ]
            },
            {
                name: "@emotion/styled/index.d.ts",
                url: "https://unpkg.com/@emotion/styled@11.0.0/types/index.d.ts",
                depend: [
                    "@emotion/react",
                    "@emotion/serialize",
                    "react"
                ]
            },
            {
                name: "@emotion/cache/index.d.ts",
                url: "https://unpkg.com/@emotion/cache@11.0.0/types/index.d.ts",
                depend: [
                    "@emotion/utils"
                ]
            },
            {
                name: "@emotion/react/index.d.ts",
                url: "https://unpkg.com/@emotion/react@11.1.2/types/index.d.ts",
                depend: [
                    "@emotion/cache"
                ]
            },
            {
                name: "@emotion/react/jsx-namespace.d.ts",
                url: "https://unpkg.com/@emotion/react@11.1.2/types/jsx-namespace.d.ts",
                depend: [
                    "@emotion/utils",
                    "csstype"
                ]
            },
            {
                name: "@emotion/react/css-prop.d.ts",
                url: "https://unpkg.com/@emotion/react@11.1.2/types/css-prop.d.ts",
                depend: [
                    "@emotion/utils",
                    "csstype"
                ]
            },
            {
                name: "@emotion/react/helper.d.ts",
                url: "https://unpkg.com/@emotion/react@11.1.2/types/helper.d.ts",
                depend: [
                    "@emotion/utils",
                    "csstype"
                ]
            },
            {
                name: "@emotion/react/theming.d.ts",
                url: "https://unpkg.com/@emotion/react@11.1.2/types/theming.d.ts",
                depend: [
                    "@emotion/utils",
                    "csstype"
                ]
            },
            {
                name: "@emotion/serialize/index.d.ts",
                url: "https://unpkg.com/@emotion/serialize@1.0.0/types/index.d.ts",
                depend: [
                    "@emotion/utils",
                    "csstype"
                ]
            },
            {
                name: "@emotion/utils/index.d.ts",
                url: "https://unpkg.com/@emotion/utils@1.0.0/types/index.d.ts",
                depend: []
            },
            {
                name: "framer-motion",
                url: "https://unpkg.com/framer-motion@2.9.5/dist/framer-motion.d.ts",
                depend: []
            },
            {
                name: "popmotion",
                url: "https://unpkg.com/browse/popmotion@9.0.1/lib/index.d.ts"
            }, 
        ];
        const dts = importHelper.map(({ name , url  })=>(async ()=>modules.monaco.languages.typescript.typescriptDefaults.addExtraLib(await (await fetch(url)).text(), name.includes("@emotion") ? `file:///node_modules/${name}` : `file:///node_modules/@types/${name}/index.d.ts`)
            )()
        );
        modules.monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            target: modules.monaco.languages.typescript.ScriptTarget.ESNext,
            allowNonTsExtensions: true,
            allowUmdGlobalAccess: true,
            strict: true,
            allowJs: true,
            noEmitOnError: true,
            allowSyntheticDefaultImports: true,
            moduleResolution: modules.monaco.languages.typescript.ModuleResolutionKind.Nodejs,
            module: modules.monaco.languages.typescript.ModuleKind.CommonJS,
            noEmit: true,
            typeRoots: [
                "node_modules/@types"
            ],
            jsx: "react-jsx",
            esModuleInterop: true
        });
        await Promise.all(dts);
        modules.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSuggestionDiagnostics: false,
            noSemanticValidation: false,
            noSyntaxValidation: false
        });
        return modules;
    }
};
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashHex = await arrBuffSha256(msgBuffer);
    return hashHex.substr(0, 8);
}
function promisifyRequest(request) {
    const promise = new Promise((resolve, reject)=>{
        const unlisten = ()=>{
            request.removeEventListener('success', success);
            request.removeEventListener('error', error);
        };
        const success = ()=>{
            resolve(wrap(request.result));
            unlisten();
        };
        const error = ()=>{
            reject(request.error);
            unlisten();
        };
        request.addEventListener('success', success);
        request.addEventListener('error', error);
    });
    promise.then((value)=>{
        if (value instanceof IDBCursor) {
            cursorRequestMap.set(value, request);
        }
    }).catch(()=>{
    });
    reverseTransformCache.set(promise, request);
    return promise;
}
let idbProxyTraps = {
    get (target, prop, receiver) {
        if (target instanceof IDBTransaction) {
            if (prop === 'done') return transactionDoneMap.get(target);
            if (prop === 'objectStoreNames') {
                return target.objectStoreNames || transactionStoreNamesMap.get(target);
            }
            if (prop === 'store') {
                return receiver.objectStoreNames[1] ? undefined : receiver.objectStore(receiver.objectStoreNames[0]);
            }
        }
        return wrap(target[prop]);
    },
    set (target, prop, value) {
        target[prop] = value;
        return true;
    },
    has (target, prop) {
        if (target instanceof IDBTransaction && (prop === 'done' || prop === 'store')) {
            return true;
        }
        return prop in target;
    }
};
function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
    if (func === IDBDatabase.prototype.transaction && !('objectStoreNames' in IDBTransaction.prototype)) {
        return function(storeNames, ...args) {
            const tx = func.call(unwrap(this), storeNames, ...args);
            transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [
                storeNames
            ]);
            return wrap(tx);
        };
    }
    if (getCursorAdvanceMethods().includes(func)) {
        return function(...args) {
            func.apply(unwrap(this), args);
            return wrap(cursorRequestMap.get(this));
        };
    }
    return function(...args) {
        return wrap(func.apply(unwrap(this), args));
    };
}
function transformCachableValue(value) {
    if (typeof value === 'function') return wrapFunction(value);
    if (value instanceof IDBTransaction) cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes())) return new Proxy(value, idbProxyTraps);
    return value;
}
function wrap(value) {
    if (value instanceof IDBRequest) return promisifyRequest(value);
    if (transformCache.has(value)) return transformCache.get(value);
    const newValue = transformCachableValue(value);
    if (newValue !== value) {
        transformCache.set(value, newValue);
        reverseTransformCache.set(newValue, value);
    }
    return newValue;
}
function openDB(name, version, { blocked , upgrade , blocking , terminated  } = {
}) {
    const request = indexedDB.open(name, version);
    const openPromise = wrap(request);
    if (upgrade) {
        request.addEventListener('upgradeneeded', (event)=>{
            upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction));
        });
    }
    if (blocked) request.addEventListener('blocked', ()=>blocked()
    );
    openPromise.then((db)=>{
        if (terminated) db.addEventListener('close', ()=>terminated()
        );
        if (blocking) db.addEventListener('versionchange', ()=>blocking()
        );
    }).catch(()=>{
    });
    return openPromise;
}
replaceTraps((oldTraps)=>({
        ...oldTraps,
        get: (target, prop, receiver)=>getMethod(target, prop) || oldTraps.get(target, prop, receiver)
        ,
        has: (target, prop)=>!!getMethod(target, prop) || oldTraps.has(target, prop)
    })
);
const getDB = async ()=>{
    const dbPromise = openDB("localZedCodeStore", 1, {
        upgrade (db) {
            db.createObjectStore("codeStore");
        }
    });
    const dbObj = {
        async get (key, format = "string") {
            let data;
            try {
                data = (await dbPromise).get("codeStore", key);
                if (!data) return null;
            } catch (_) {
                return null;
            }
            if (format === "json") {
                return JSON.parse(data);
            }
            if (format === "string") {
                const allData = await data;
                if (typeof allData === format) return allData;
                const decoder = new TextDecoder();
                const text = decoder.decode(allData);
                return text;
            }
            return data;
        },
        async put (key, val) {
            let prev;
            try {
                const realKey = await dbObj.get(key);
                if (realKey.length === 8) prev = await dbObj.get(realKey);
                if (prev) {
                    const valVal = await dbObj.get(val);
                    const diffObj = await diff1(prev, valVal);
                    const diffAsStr = diffObj.b + JSON.stringify(diffObj.c);
                    if (prev.length > diffAsStr.length) {
                        (await dbPromise).put("codeStore", diffAsStr, val);
                    }
                }
            } catch  {
                prev = "";
            }
            if (prev !== "" && val === prev) return data;
            let str;
            if (typeof val !== "string") {
                str = new TextDecoder().decode(val);
            } else {
                str = val;
            }
            return (await dbPromise).put("codeStore", str, key);
        },
        async delete (key) {
            return (await dbPromise).delete("codeStore", key);
        },
        async clear () {
            return (await dbPromise).clear("codeStore");
        },
        async keys () {
            return (await dbPromise).getAllKeys("codeStore");
        }
    };
    return dbObj;
};
export const getProjects = async ()=>{
    const uuid = await getUserId();
    const codeDB = await getDB();
    const projects = await codeDB.get(uuid, "json");
    if (!projects) {
        await codeDB.put(uuid, JSON.stringify([]));
        return [];
    }
    return projects;
};
async function getUserId() {
    const codeDB = await getDB();
    const uuid = await codeDB.get("uuid");
    if (!uuid) {
        if (!window.location.href.includes("zed.dev")) {
            const resp = await fetch("https://code.zed.vision/register");
            const data = await resp.json();
            codeDB.put("uuid", data.uuid);
            return data.uuid;
        } else {
            codeDB.put("uuid", "1234");
        }
    }
    return uuid;
}
export async function run(mode = "window") {
    await importScript("https://unpkg.com/@babel/standalone@7.12.9/babel.min.js");
    if (mode === "editor") {
        renderDraggableEditor();
    }
    if (mode == "window") {
        renderDraggableWindow(async ()=>{
            const link = await shareItAsHtml();
            window.open(link);
        });
    }
    const codeDB = await getDB();
    const uuid = await getUserId();
    const example = await getCodeToLoad();
    restartCode(transpileCode(example));
    latestGoodCode = example;
    const modules = await startMonaco({
        language: "typescript",
        code: example,
        onChange
    });
    async function runner(cd) {
        if (busy === 1) {
            return;
        }
        try {
            busy = 1;
            const err = await getErrors();
            const errorDiv = document.getElementById("error");
            busy = 0;
            if (cd !== latestCode) {
                return;
            }
            if (err && err.length) {
                if (latestCode != cd) {
                    return;
                }
                if (errorReported === cd) {
                    return;
                }
                const slices = await diff(latestGoodCode, cd);
                if (slices.c.length <= 3) {
                    modules.monaco.editor.setTheme("hc-black");
                    return;
                }
                errorDiv.innerHTML = err[0].messageText.toString();
                errorDiv.style.display = "block";
                errorReported = cd;
                return;
            }
            latestGoodCode = cd;
            errorDiv.style.display = "none";
            modules.monaco.editor.setTheme("vs-dark");
            keystrokeTillNoError = 0;
            busy = 0;
            restartCode(transpileCode(cd));
        } catch (err) {
            busy = 0;
            if (cd !== latestCode) {
                return;
            }
            modules.monaco.editor.setTheme("vs-light");
            setTimeout(()=>{
                modules.monaco.editor.setTheme("hc-black");
            }, 50);
            console.error(err);
        }
    }
    function onChange(code) {
        if (!modules) return;
        latestCode = code;
        if (!busy) {
            runner(latestCode);
        } else {
            const myCode = code;
            const cl = setInterval(()=>{
                if (code !== latestCode || !busy) {
                    clearInterval(cl);
                }
                if (!busy) {
                    runner(latestCode);
                }
            }, 100);
        }
    }
    async function getErrors() {
        if (!modules || !modules.monaco) return;
        const modelUri = modules.monaco.Uri.parse("file:///main.tsx");
        const tsWorker = await modules.monaco.languages.typescript.getTypeScriptWorker();
        const diag = await (await tsWorker(modelUri)).getSemanticDiagnostics("file:///main.tsx");
        const comp = await (await tsWorker(modelUri)).getCompilerOptionsDiagnostics("file:///main.tsx");
        const syntax = await (await tsWorker(modelUri)).getSyntacticDiagnostics("file:///main.tsx");
        return [
            ...diag,
            ...comp,
            ...syntax
        ];
    }
    importScript("diffLoader.js");
    async function restartCode(transPiled) {
        const searchRegExp = /import/gi;
        const replaceWith = "///";
        const code = `\n    Object.assign(window, React);\n    if (window.Motion) {\n        Object.assign(window, window.Motion);\n    }\n    if (window.emotionStyled){\n      window.styled= window.emotionStyled;\n    }\n    ;\n    ` + transPiled.replaceAll(searchRegExp, replaceWith).replace("export default", "DefaultElement = ");
        const restart = async ()=>{
            const hydrate = new Function("code", `return function(){  \n          let DefaultElement;\n        \n        ${code}\n\n                return ReactDOM.render(jsx(DefaultElement), document.getElementById("root"));\n      }`)();
            hydrate();
            shareItAsHtml = async ()=>{
                const renderToString = new Function("code", `return function(){\n            let DefaultElement;\n  \n          ${code}\n  \n                  return ReactDOMServer.renderToString(jsx(DefaultElement));\n        }`)();
                const HTML = renderToString();
                const css = Array.from(document.querySelector("head > style[data-emotion=css]").sheet.cssRules).map((x)=>x.cssText
                ).filter((cssRule)=>HTML.includes(cssRule.substring(3, 8))
                ).join("\n  ");
                let bodyStylesFix;
                if (code.includes("body{")) {
                    const start = code.indexOf("body{");
                    const firstBit = code.slice(start);
                    const last = firstBit.indexOf("}");
                    bodyStylesFix = firstBit.slice(0, last + 1);
                }
                let motionDep = "";
                let motionScript = "";
                if (code.includes("Motion")) {
                    motionDep = `<script crossorigin src="https://unpkg.com/framer-motion@2.9.5/dist/framer-motion.js"></script>`;
                    motionScript = "const {motion} = Motion";
                }
                const iframe = `<!DOCTYPE html>\n        <html lang="en">\n        <head>\n        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n        <head profile="http://www.w3.org/2005/10/profile">\n        <link rel="icon" \n              type="image/png"\n              href="https://zed.vision/favicon.ico">\n        <style>\n        ${bodyStylesFix}\n        ${css}\n        </style>\n        </head>\n        <body>\n        <div id="root">\n        ${HTML}\n        </div>\n        <script crossorigin src="https://unpkg.com/react@17.0.1/umd/react.production.min.js"></script>\n        ${motionDep}\n        <script crossorigin src="https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js"></script>\n        <script crossorigin src="https://unpkg.com/@emotion/react@11.1.2/dist/emotion-react.umd.min.js"></script>\n        <script crossorigin src="https://unpkg.com/@emotion/styled@11.0.0/dist/emotion-styled.umd.min.js"></script>\n        <script type="module">\n        Object.assign(window, emotionReact);\n\n       const styled = window["emotionStyled"];\n\n        let DefaultElement;\n\n        ${code}\n\n        ReactDOM.hydrate(jsx(DefaultElement), document.body.children[0]);\n        </script>\n        </body>\n        </html>\n        `;
                const iframeBlob = await createHTMLSourceBlob(iframe);
                const link = await saveHtml(iframeBlob);
                return link;
            };
        };
        if (!firstLoad) {
            const saveCode = async (latestCode1)=>{
                if (latestCode1 !== latestGoodCode) return;
                if (latestSavedCode === latestCode1) return;
                latestSavedCode = latestCode1;
                const request = new Request(getUrl(), {
                    body: latestCode1,
                    method: "POST",
                    headers: {
                        "content-type": "text/plain;charset=UTF-8"
                    }
                });
                const response = fetch(request);
                const hash = await sha256(latestCode1);
                try {
                    const prevHash = await codeDB.get("PROJECTNAME");
                    if (prevHash !== hash) {
                        console.log("now put");
                        await codeDB.put(hash, latestCode1);
                        await codeDB.put("PROJECTNAME", hash);
                        setQueryStringParameter("h", hash);
                    }
                } catch (e) {
                }
                await response;
            };
            saveCode(latestCode);
        }
        firstLoad = false;
        restart();
    }
    async function getCodeToLoad() {
        const db = await getDB();
        const search = new URLSearchParams(window.location.search);
        const keyToLoad = search.get("h") || await db.get("PROJECTNAME");
        if (keyToLoad) {
            let code;
            let content;
            try {
                code = await db.get(keyToLoad);
            } catch  {
                console.error("error json parse: " + content);
            }
            if (content) return content;
            let text;
            try {
                const resp = await fetch(getUrl() + "/?h=" + keyToLoad);
                text = await resp.json();
            } catch (e) {
                const shaHash = await sha256(starter);
                db.put(shaHash, starter);
                await db.put("PROJECTNAME", shaHash);
                return starter;
            }
            return text;
        }
        return starter;
    }
    function setQueryStringParameter(name, value) {
        const params = new URLSearchParams(window.location.search);
        params.set(name, value);
        window.history.replaceState({
        }, "", decodeURIComponent(`${window.location.pathname}?${params}`));
    }
    function createHTMLSourceBlob(code) {
        const blob = new Blob([
            code
        ], {
            type: "text/html"
        });
        return blob;
    }
    async function saveHtml(htmlBlob) {
        const cfUrl = getUrl();
        const request = new Request(cfUrl, {
            body: htmlBlob,
            method: "POST",
            headers: {
                "content-type": "text/html;charset=UTF-8",
                "SHARE": "true"
            }
        });
        const response = await fetch(request);
        const { hash  } = await response.json();
        return `${cfUrl}/${hash}`;
    }
    function transpileCode(code) {
        const { transform  } = window["Babel"];
        return transform("/** @jsx jsx */\n" + `\n  Object.assign(window, React);\n  ` + code, {
            plugins: [],
            presets: [
                "react",
                [
                    "typescript",
                    {
                        isTSX: true,
                        allExtensions: true
                    }
                ], 
            ]
        }).code;
    }
}


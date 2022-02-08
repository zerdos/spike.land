// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

var e, n, t, l, o, r, i, u, s = {}, c = [], f = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function a(e11, n1) {
    for(var t11 in n1)e11[t11] = n1[t11];
    return e11;
}
function h(e2) {
    var n2 = e2.parentNode;
    n2 && n2.removeChild(e2);
}
function v(n3, t2, l11) {
    var o11, r11, i11, u1 = {};
    for(i11 in t2)"key" == i11 ? o11 = t2[i11] : "ref" == i11 ? r11 = t2[i11] : u1[i11] = t2[i11];
    if (arguments.length > 2 && (u1.children = arguments.length > 3 ? e.call(arguments, 2) : l11), "function" == typeof n3 && null != n3.defaultProps) for(i11 in n3.defaultProps)void 0 === u1[i11] && (u1[i11] = n3.defaultProps[i11]);
    return y(n3, u1, o11, r11, null);
}
function y(e3, l2, o2, r2, i2) {
    var u2 = {
        type: e3,
        props: l2,
        key: o2,
        ref: r2,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: null == i2 ? ++t : i2
    };
    return null == i2 && null != n.vnode && n.vnode(u2), u2;
}
function p() {
    return {
        current: null
    };
}
function d(e4) {
    return e4.children;
}
function _(e5, n4) {
    this.props = e5, this.context = n4;
}
function k(e6, n5) {
    if (null == n5) return e6.__ ? k(e6.__, e6.__.__k.indexOf(e6) + 1) : null;
    for(var t3; n5 < e6.__k.length; n5++)if (null != (t3 = e6.__k[n5]) && null != t3.__e) return t3.__e;
    return "function" == typeof e6.type ? k(e6) : null;
}
function b(e7) {
    var n6, t4;
    if (null != (e7 = e7.__) && null != e7.__c) {
        for(e7.__e = e7.__c.base = null, n6 = 0; n6 < e7.__k.length; n6++)if (null != (t4 = e7.__k[n6]) && null != t4.__e) {
            e7.__e = e7.__c.base = t4.__e;
            break;
        }
        return b(e7);
    }
}
function m(e8) {
    (!e8.__d && (e8.__d = !0) && o.push(e8) && !g.__r++ || i !== n.debounceRendering) && ((i = n.debounceRendering) || r)(g);
}
function g() {
    for(var e9; g.__r = o.length;)e9 = o.sort(function(e10, n7) {
        return e10.__v.__b - n7.__v.__b;
    }), o = [], e9.some(function(e11) {
        var n8, t5, l3, o3, r3, i3;
        e11.__d && (r3 = (o3 = (n8 = e11).__v).__e, (i3 = n8.__P) && (t5 = [], (l3 = a({}, o3)).__v = o3.__v + 1, j(i3, o3, l3, n8.__n, void 0 !== i3.ownerSVGElement, null != o3.__h ? [
            r3
        ] : null, t5, null == r3 ? k(o3) : r3, o3.__h), z(t5, o3), o3.__e != r3 && b(o3)));
    });
}
function w(e12, n9, t6, l4, o4, r4, i4, u3, f11, E2) {
    var U1, W1, F2, R, V, G1, J1, K1 = l4 && l4.__k || c, Q1 = K1.length;
    for(t6.__k = [], U1 = 0; U1 < n9.length; U1++)if (null != (R = t6.__k[U1] = null == (R = n9[U1]) || "boolean" == typeof R ? null : "string" == typeof R || "number" == typeof R || "bigint" == typeof R ? y(null, R, null, null, R) : Array.isArray(R) ? y(d, {
        children: R
    }, null, null, null) : R.__b > 0 ? y(R.type, R.props, R.key, null, R.__v) : R)) {
        if (R.__ = t6, R.__b = t6.__b + 1, null === (F2 = K1[U1]) || F2 && R.key == F2.key && R.type === F2.type) K1[U1] = void 0;
        else for(W1 = 0; W1 < Q1; W1++){
            if ((F2 = K1[W1]) && R.key == F2.key && R.type === F2.type) {
                K1[W1] = void 0;
                break;
            }
            F2 = null;
        }
        j(e12, R, F2 = F2 || s, o4, r4, i4, u3, f11, E2), V = R.__e, (W1 = R.ref) && F2.ref != W1 && (J1 || (J1 = []), F2.ref && J1.push(F2.ref, null, R), J1.push(W1, R.__c || V, R)), null != V ? (null == G1 && (G1 = V), "function" == typeof R.type && R.__k === F2.__k ? R.__d = f11 = x(R, f11, e12) : f11 = P(e12, R, F2, K1, V, f11), "function" == typeof t6.type && (t6.__d = f11)) : f11 && F2.__e == f11 && f11.parentNode != e12 && (f11 = k(F2));
    }
    for(t6.__e = G1, U1 = Q1; U1--;)null != K1[U1] && ("function" == typeof t6.type && null != K1[U1].__e && K1[U1].__e == t6.__d && (t6.__d = k(l4, U1 + 1)), N(K1[U1], K1[U1]));
    if (J1) for(U1 = 0; U1 < J1.length; U1++)M(J1[U1], J1[++U1], J1[++U1]);
}
function x(e13, n10, t7) {
    for(var l5, o5 = e13.__k, r5 = 0; o5 && r5 < o5.length; r5++)(l5 = o5[r5]) && (l5.__ = e13, n10 = "function" == typeof l5.type ? x(l5, n10, t7) : P(t7, l5, l5, o5, l5.__e, n10));
    return n10;
}
function A(e14, n11) {
    return n11 = n11 || [], null == e14 || "boolean" == typeof e14 || (Array.isArray(e14) ? e14.some(function(e15) {
        A(e15, n11);
    }) : n11.push(e14)), n11;
}
function P(e16, n12, t8, l6, o6, r6) {
    var i5, u4, s11;
    if (void 0 !== n12.__d) i5 = n12.__d, n12.__d = void 0;
    else if (null == t8 || o6 != r6 || null == o6.parentNode) e: if (null == r6 || r6.parentNode !== e16) e16.appendChild(o6), i5 = null;
    else {
        for(u4 = r6, s11 = 0; (u4 = u4.nextSibling) && s11 < l6.length; s11 += 2)if (u4 == o6) break e;
        e16.insertBefore(o6, r6), i5 = r6;
    }
    return void 0 !== i5 ? i5 : o6.nextSibling;
}
function C(e17, n13, t9, l7, o7) {
    var r7;
    for(r7 in t9)"children" === r7 || "key" === r7 || r7 in n13 || H(e17, r7, null, t9[r7], l7);
    for(r7 in n13)o7 && "function" != typeof n13[r7] || "children" === r7 || "key" === r7 || "value" === r7 || "checked" === r7 || t9[r7] === n13[r7] || H(e17, r7, n13[r7], t9[r7], l7);
}
function $(e18, n14, t10) {
    "-" === n14[0] ? e18.setProperty(n14, t10) : e18[n14] = null == t10 ? "" : "number" != typeof t10 || f.test(n14) ? t10 : t10 + "px";
}
function H(e19, n15, t11, l8, o8) {
    var r8;
    e: if ("style" === n15) if ("string" == typeof t11) e19.style.cssText = t11;
    else {
        if ("string" == typeof l8 && (e19.style.cssText = l8 = ""), l8) for(n15 in l8)t11 && n15 in t11 || $(e19.style, n15, "");
        if (t11) for(n15 in t11)l8 && t11[n15] === l8[n15] || $(e19.style, n15, t11[n15]);
    }
    else if ("o" === n15[0] && "n" === n15[1]) r8 = n15 !== (n15 = n15.replace(/Capture$/, "")), n15 = n15.toLowerCase() in e19 ? n15.toLowerCase().slice(2) : n15.slice(2), e19.l || (e19.l = {}), e19.l[n15 + r8] = t11, t11 ? l8 || e19.addEventListener(n15, r8 ? T : I, r8) : e19.removeEventListener(n15, r8 ? T : I, r8);
    else if ("dangerouslySetInnerHTML" !== n15) {
        if (o8) n15 = n15.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
        else if ("href" !== n15 && "list" !== n15 && "form" !== n15 && "tabIndex" !== n15 && "download" !== n15 && n15 in e19) try {
            e19[n15] = null == t11 ? "" : t11;
            break e;
        } catch (e) {}
        "function" == typeof t11 || (null != t11 && (!1 !== t11 || "a" === n15[0] && "r" === n15[1]) ? e19.setAttribute(n15, t11) : e19.removeAttribute(n15));
    }
}
function I(e20) {
    this.l[e20.type + !1](n.event ? n.event(e20) : e20);
}
function T(e21) {
    this.l[e21.type + !0](n.event ? n.event(e21) : e21);
}
function j(e22, t12, l9, o9, r9, i6, u5, s2, c11) {
    var f2, E3, U2, W2, F3, R, V, G2, J2, K2, Q2, X1 = t12.type;
    if (void 0 !== t12.constructor) return null;
    null != l9.__h && (c11 = l9.__h, s2 = t12.__e = l9.__e, t12.__h = null, i6 = [
        s2
    ]), (f2 = n.__b) && f2(t12);
    try {
        e: if ("function" == typeof X1) {
            if (G2 = t12.props, J2 = (f2 = X1.contextType) && o9[f2.__c], K2 = f2 ? J2 ? J2.props.value : f2.__ : o9, l9.__c ? V = (E3 = t12.__c = l9.__c).__ = E3.__E : ("prototype" in X1 && X1.prototype.render ? t12.__c = E3 = new X1(G2, K2) : (t12.__c = E3 = new _(G2, K2), E3.constructor = X1, E3.render = O), J2 && J2.sub(E3), E3.props = G2, E3.state || (E3.state = {}), E3.context = K2, E3.__n = o9, U2 = E3.__d = !0, E3.__h = []), null == E3.__s && (E3.__s = E3.state), null != X1.getDerivedStateFromProps && (E3.__s == E3.state && (E3.__s = a({}, E3.__s)), a(E3.__s, X1.getDerivedStateFromProps(G2, E3.__s))), W2 = E3.props, F3 = E3.state, U2) null == X1.getDerivedStateFromProps && null != E3.componentWillMount && E3.componentWillMount(), null != E3.componentDidMount && E3.__h.push(E3.componentDidMount);
            else {
                if (null == X1.getDerivedStateFromProps && G2 !== W2 && null != E3.componentWillReceiveProps && E3.componentWillReceiveProps(G2, K2), !E3.__e && null != E3.shouldComponentUpdate && !1 === E3.shouldComponentUpdate(G2, E3.__s, K2) || t12.__v === l9.__v) {
                    E3.props = G2, E3.state = E3.__s, t12.__v !== l9.__v && (E3.__d = !1), E3.__v = t12, t12.__e = l9.__e, t12.__k = l9.__k, t12.__k.forEach(function(e23) {
                        e23 && (e23.__ = t12);
                    }), E3.__h.length && u5.push(E3);
                    break e;
                }
                null != E3.componentWillUpdate && E3.componentWillUpdate(G2, E3.__s, K2), null != E3.componentDidUpdate && E3.__h.push(function() {
                    E3.componentDidUpdate(W2, F3, R);
                });
            }
            E3.context = K2, E3.props = G2, E3.state = E3.__s, (f2 = n.__r) && f2(t12), E3.__d = !1, E3.__v = t12, E3.__P = e22, f2 = E3.render(E3.props, E3.state, E3.context), E3.state = E3.__s, null != E3.getChildContext && (o9 = a(a({}, o9), E3.getChildContext())), U2 || null == E3.getSnapshotBeforeUpdate || (R = E3.getSnapshotBeforeUpdate(W2, F3)), Q2 = null != f2 && f2.type === d && null == f2.key ? f2.props.children : f2, w(e22, Array.isArray(Q2) ? Q2 : [
                Q2
            ], t12, l9, o9, r9, i6, u5, s2, c11), E3.base = t12.__e, t12.__h = null, E3.__h.length && u5.push(E3), V && (E3.__E = E3.__ = null), E3.__e = !1;
        } else null == i6 && t12.__v === l9.__v ? (t12.__k = l9.__k, t12.__e = l9.__e) : t12.__e = L(l9.__e, t12, l9, o9, r9, i6, u5, c11);
        (f2 = n.diffed) && f2(t12);
    } catch (e24) {
        t12.__v = null, (c11 || null != i6) && (t12.__e = s2, t12.__h = !!c11, i6[i6.indexOf(s2)] = null), n.__e(e24, t12, l9);
    }
}
function z(e25, t13) {
    n.__c && n.__c(t13, e25), e25.some(function(t14) {
        try {
            e25 = t14.__h, t14.__h = [], e25.some(function(e26) {
                e26.call(t14);
            });
        } catch (e27) {
            n.__e(e27, t14.__v);
        }
    });
}
function L(n16, t15, l10, o10, r10, i7, u6, c2) {
    var f3, E4, U3, W3 = l10.props, F4 = t15.props, R = t15.type, V = 0;
    if ("svg" === R && (r10 = !0), null != i7) {
        for(; V < i7.length; V++)if ((f3 = i7[V]) && "setAttribute" in f3 == !!R && (R ? f3.localName === R : 3 === f3.nodeType)) {
            n16 = f3, i7[V] = null;
            break;
        }
    }
    if (null == n16) {
        if (null === R) return document.createTextNode(F4);
        n16 = r10 ? document.createElementNS("http://www.w3.org/2000/svg", R) : document.createElement(R, F4.is && F4), i7 = null, c2 = !1;
    }
    if (null === R) W3 === F4 || c2 && n16.data === F4 || (n16.data = F4);
    else {
        if (i7 = i7 && e.call(n16.childNodes), E4 = (W3 = l10.props || s).dangerouslySetInnerHTML, U3 = F4.dangerouslySetInnerHTML, !c2) {
            if (null != i7) for(W3 = {}, V = 0; V < n16.attributes.length; V++)W3[n16.attributes[V].name] = n16.attributes[V].value;
            (U3 || E4) && (U3 && (E4 && U3.__html == E4.__html || U3.__html === n16.innerHTML) || (n16.innerHTML = U3 && U3.__html || ""));
        }
        if (C(n16, F4, W3, r10, c2), U3) t15.__k = [];
        else if (V = t15.props.children, w(n16, Array.isArray(V) ? V : [
            V
        ], t15, l10, o10, r10 && "foreignObject" !== R, i7, u6, i7 ? i7[0] : l10.__k && k(l10, 0), c2), null != i7) for(V = i7.length; V--;)null != i7[V] && h(i7[V]);
        c2 || ("value" in F4 && void 0 !== (V = F4.value) && (V !== W3.value || V !== n16.value || "progress" === R && !V) && H(n16, "value", V, W3.value, !1), "checked" in F4 && void 0 !== (V = F4.checked) && V !== n16.checked && H(n16, "checked", V, W3.checked, !1));
    }
    return n16;
}
function M(e28, t16, l11) {
    try {
        "function" == typeof e28 ? e28(t16) : e28.current = t16;
    } catch (e29) {
        n.__e(e29, l11);
    }
}
function N(e30, t17, l12) {
    var o11, r11;
    if (n.unmount && n.unmount(e30), (o11 = e30.ref) && (o11.current && o11.current !== e30.__e || M(o11, null, t17)), null != (o11 = e30.__c)) {
        if (o11.componentWillUnmount) try {
            o11.componentWillUnmount();
        } catch (e31) {
            n.__e(e31, t17);
        }
        o11.base = o11.__P = null;
    }
    if (o11 = e30.__k) for(r11 = 0; r11 < o11.length; r11++)o11[r11] && N(o11[r11], t17, "function" != typeof e30.type);
    l12 || null == e30.__e || h(e30.__e), e30.__e = e30.__d = void 0;
}
function O(e32, n, t18) {
    return this.constructor(e32, t18);
}
function S(t19, l13, o12) {
    var r12, i8, u7;
    n.__ && n.__(t19, l13), i8 = (r12 = "function" == typeof o12) ? null : o12 && o12.__k || l13.__k, u7 = [], j(l13, t19 = (!r12 && o12 || l13).__k = v(d, null, [
        t19
    ]), i8 || s, s, void 0 !== l13.ownerSVGElement, !r12 && o12 ? [
        o12
    ] : i8 ? null : l13.firstChild ? e.call(l13.childNodes) : null, u7, !r12 && o12 ? o12 : i8 ? i8.__e : l13.firstChild, r12), z(u7, t19);
}
function q(e33, n17) {
    S(e33, n17, q);
}
function B(n18, t20, l14) {
    var o13, r13, i9, u8 = a({}, n18.props);
    for(i9 in t20)"key" == i9 ? o13 = t20[i9] : "ref" == i9 ? r13 = t20[i9] : u8[i9] = t20[i9];
    return arguments.length > 2 && (u8.children = arguments.length > 3 ? e.call(arguments, 2) : l14), y(n18.type, u8, o13 || n18.key, r13 || n18.ref, null);
}
function D(e34, n19) {
    var t21 = {
        __c: n19 = "__cC" + u++,
        __: e34,
        Consumer: function(e35, n20) {
            return e35.children(n20);
        },
        Provider: function(e36) {
            var t22, l15;
            return this.getChildContext || (t22 = [], (l15 = {})[n19] = this, this.getChildContext = function() {
                return l15;
            }, this.shouldComponentUpdate = function(e37) {
                this.props.value !== e37.value && t22.some(m);
            }, this.sub = function(e38) {
                t22.push(e38);
                var n21 = e38.componentWillUnmount;
                e38.componentWillUnmount = function() {
                    t22.splice(t22.indexOf(e38), 1), n21 && n21.call(e38);
                };
            }), e36.children;
        }
    };
    return t21.Provider.__ = t21.Consumer.contextType = t21;
}
e = c.slice, n = {
    __e: function(e39, n22) {
        for(var t23, l16, o14; n22 = n22.__;)if ((t23 = n22.__c) && !t23.__) try {
            if ((l16 = t23.constructor) && null != l16.getDerivedStateFromError && (t23.setState(l16.getDerivedStateFromError(e39)), o14 = t23.__d), null != t23.componentDidCatch && (t23.componentDidCatch(e39), o14 = t23.__d), o14) return t23.__E = t23;
        } catch (n23) {
            e39 = n23;
        }
        throw e39;
    }
}, t = 0, l = function(e40) {
    return null != e40 && void 0 === e40.constructor;
}, _.prototype.setState = function(e41, n24) {
    var t24;
    t24 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = a({}, this.state), "function" == typeof e41 && (e41 = e41(a({}, t24), this.props)), e41 && a(t24, e41), null != e41 && this.__v && (n24 && this.__h.push(n24), m(this));
}, _.prototype.forceUpdate = function(e42) {
    this.__v && (this.__e = !0, e42 && this.__h.push(e42), m(this));
}, _.prototype.render = d, o = [], r = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, g.__r = 0, u = 0;
const mod = {
    Component: _,
    Fragment: d,
    cloneElement: B,
    createContext: D,
    createElement: v,
    createRef: p,
    h: v,
    hydrate: q,
    isValidElement: l,
    options: n,
    render: S,
    toChildArray: A
};
var t1, e1, r1, c1 = 0, o1 = [], a1 = n.__b, i1 = n.__r, f1 = n.diffed, v1 = n.__c, H1 = n.unmount;
function m1(t11, r11) {
    n.__h && n.__h(e1, t11, c1 || r11), c1 = 0;
    var o11 = e1.__H || (e1.__H = {
        __: [],
        __h: []
    });
    return t11 >= o11.__.length && o11.__.push({}), o11.__[t11];
}
function l1(n1) {
    return c1 = 1, p1(w1, n1);
}
function p1(n2, r2, c11) {
    var o2 = m1(t1++, 2);
    return o2.t = n2, o2.__c || (o2.__ = [
        c11 ? c11(r2) : w1(void 0, r2),
        function(n3) {
            var t2 = o2.t(o2.__[0], n3);
            o2.__[0] !== t2 && (o2.__ = [
                t2,
                o2.__[1]
            ], o2.__c.setState({}));
        }
    ], o2.__c = e1), o2.__;
}
function y1(r3, c2) {
    var o3 = m1(t1++, 3);
    !n.__s && k1(o3.__H, c2) && (o3.__ = r3, o3.__H = c2, e1.__H.__h.push(o3));
}
function h1(r4, c3) {
    var o4 = m1(t1++, 4);
    !n.__s && k1(o4.__H, c3) && (o4.__ = r4, o4.__H = c3, e1.__h.push(o4));
}
function s1(n4) {
    return c1 = 5, d1(function() {
        return {
            current: n4
        };
    }, []);
}
function _1(n5, t3, e11) {
    c1 = 6, h1(function() {
        "function" == typeof n5 ? n5(t3()) : n5 && (n5.current = t3());
    }, null == e11 ? e11 : e11.concat(n5));
}
function d1(n6, e2) {
    var r5 = m1(t1++, 7);
    return k1(r5.__H, e2) && (r5.__ = n6(), r5.__H = e2, r5.__h = n6), r5.__;
}
function A1(n7, t4) {
    return c1 = 8, d1(function() {
        return n7;
    }, t4);
}
function F(n8) {
    var r6 = e1.context[n8.__c], c4 = m1(t1++, 9);
    return c4.c = n8, r6 ? (null == c4.__ && (c4.__ = !0, r6.sub(e1)), r6.props.value) : n8.__;
}
function T1(t5, e3) {
    n.useDebugValue && n.useDebugValue(e3 ? e3(t5) : t5);
}
function q1(n9) {
    var r7 = m1(t1++, 10), c5 = l1();
    return r7.__ = n9, e1.componentDidCatch || (e1.componentDidCatch = function(n10) {
        r7.__ && r7.__(n10), c5[1](n10);
    }), [
        c5[0],
        function() {
            c5[1](void 0);
        }
    ];
}
function x1() {
    for(var t6; t6 = o1.shift();)if (t6.__P) try {
        t6.__H.__h.forEach(g1), t6.__H.__h.forEach(j1), t6.__H.__h = [];
    } catch (e4) {
        t6.__H.__h = [], n.__e(e4, t6.__v);
    }
}
n.__b = function(n11) {
    e1 = null, a1 && a1(n11);
}, n.__r = function(n12) {
    i1 && i1(n12), t1 = 0;
    var r8 = (e1 = n12.__c).__H;
    r8 && (r8.__h.forEach(g1), r8.__h.forEach(j1), r8.__h = []);
}, n.diffed = function(t7) {
    f1 && f1(t7);
    var c6 = t7.__c;
    c6 && c6.__H && c6.__H.__h.length && (1 !== o1.push(c6) && r1 === n.requestAnimationFrame || ((r1 = n.requestAnimationFrame) || function(n13) {
        var t8, u1 = function() {
            clearTimeout(e5), E && cancelAnimationFrame(t8), setTimeout(n13);
        }, e5 = setTimeout(u1, 100);
        E && (t8 = requestAnimationFrame(u1));
    })(x1)), e1 = null;
}, n.__c = function(t9, e6) {
    e6.some(function(t10) {
        try {
            t10.__h.forEach(g1), t10.__h = t10.__h.filter(function(n14) {
                return !n14.__ || j1(n14);
            });
        } catch (r9) {
            e6.some(function(n15) {
                n15.__h && (n15.__h = []);
            }), e6 = [], n.__e(r9, t10.__v);
        }
    }), v1 && v1(t9, e6);
}, n.unmount = function(t11) {
    H1 && H1(t11);
    var e7, r10 = t11.__c;
    r10 && r10.__H && (r10.__H.__.forEach(function(n16) {
        try {
            g1(n16);
        } catch (n17) {
            e7 = n17;
        }
    }), e7 && n.__e(e7, r10.__v));
};
var E = "function" == typeof requestAnimationFrame;
function g1(n18) {
    var t12 = e1, r11 = n18.__c;
    "function" == typeof r11 && (n18.__c = void 0, r11()), e1 = t12;
}
function j1(n19) {
    var t13 = e1;
    n19.__c = n19.__(), e1 = t13;
}
function k1(n20, t14) {
    return !n20 || n20.length !== t14.length || t14.some(function(t15, e8) {
        return t15 !== n20[e8];
    });
}
function w1(n21, t16) {
    return "function" == typeof t16 ? t16(n21) : t16;
}
function C1(_11, a11) {
    for(var c12 in a11)_11[c12] = a11[c12];
    return _11;
}
function S1(_2, a2) {
    for(var c2 in _2)if ("__source" !== c2 && !(c2 in a2)) return !0;
    for(var s11 in a2)if ("__source" !== s11 && _2[s11] !== a2[s11]) return !0;
    return !1;
}
function E1(_3) {
    this.props = _3;
}
function g2(_4, a3) {
    function e2(_5) {
        var c3 = this.props.ref, s2 = c3 == _5.ref;
        return !s2 && c3 && (c3.call ? c3(null) : c3.current = null), a3 ? !a3(this.props, _5) || !s2 : S1(this.props, _5);
    }
    function r2(a4) {
        return this.shouldComponentUpdate = e2, v(_4, a4);
    }
    return r2.displayName = "Memo(" + (_4.displayName || _4.name) + ")", r2.prototype.isReactComponent = !0, r2.__f = !0, r2;
}
(E1.prototype = new _).isPureReactComponent = !0, E1.prototype.shouldComponentUpdate = function(_6, a5) {
    return S1(this.props, _6) || S1(this.state, a5);
};
var j2 = n.__b;
n.__b = function(_7) {
    _7.type && _7.type.__f && _7.ref && (_7.props.ref = _7.ref, _7.ref = null), j2 && j2(_7);
};
var G = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function x2(_8) {
    function t2(a6, c4) {
        var s3 = C1({}, a6);
        return delete s3.ref, _8(s3, (c4 = a6.ref || c4) && ("object" != typeof c4 || "current" in c4) ? c4 : null);
    }
    return t2.$$typeof = G, t2.render = t2, t2.prototype.isReactComponent = t2.__f = !0, t2.displayName = "ForwardRef(" + (_8.displayName || _8.name) + ")", t2;
}
var N1 = function(_9, a7) {
    return null == _9 ? null : A(A(_9).map(a7));
}, J = {
    map: N1,
    forEach: N1,
    count: function(_10) {
        return _10 ? A(_10).length : 0;
    },
    only: function(_11) {
        var a8 = A(_11);
        if (1 !== a8.length) throw "Children.only";
        return a8[0];
    },
    toArray: A
}, K = n.__e;
n.__e = function(_12, a9, c5) {
    if (_12.then) {
        for(var s4, f11 = a9; f11 = f11.__;)if ((s4 = f11.__c) && s4.__c) return null == a9.__e && (a9.__e = c5.__e, a9.__k = c5.__k), s4.__c(_12, a9);
    }
    K(_12, a9, c5);
};
var Q = n.unmount;
function L1() {
    this.__u = 0, this.t = null, this.__b = null;
}
function U(_13) {
    var a10 = _13.__.__c;
    return a10 && a10.__e && a10.__e(_13);
}
function F1(_14) {
    var a11, c6, s5;
    function u2(f2) {
        if (a11 || (a11 = _14()).then(function(_15) {
            c6 = _15.default || _15;
        }, function(_16) {
            s5 = _16;
        }), s5) throw s5;
        if (!c6) throw a11;
        return v(c6, f2);
    }
    return u2.displayName = "Lazy", u2.__f = !0, u2;
}
function M1() {
    this.u = null, this.o = null;
}
n.unmount = function(_17) {
    var a12 = _17.__c;
    a12 && a12.__R && a12.__R(), a12 && !0 === _17.__h && (_17.type = null), Q && Q(_17);
}, (L1.prototype = new _).__c = function(_18, a13) {
    var c7 = a13.__c, s6 = this;
    null == s6.t && (s6.t = []), s6.t.push(c7);
    var f3 = U(s6.__v), p11 = !1, i2 = function() {
        p11 || (p11 = !0, c7.__R = null, f3 ? f3(l2) : l2());
    };
    c7.__R = i2;
    var l2 = function() {
        if (!--s6.__u) {
            if (s6.state.__e) {
                var _19 = s6.state.__e;
                s6.__v.__k[0] = (function n1(_22, a16, c8) {
                    return _22 && (_22.__v = null, _22.__k = _22.__k && _22.__k.map(function(_23) {
                        return n1(_23, a16, c8);
                    }), _22.__c && _22.__c.__P === a16 && (_22.__e && c8.insertBefore(_22.__e, _22.__d), _22.__c.__e = !0, _22.__c.__P = c8)), _22;
                })(_19, _19.__c.__P, _19.__c.__O);
            }
            var a14;
            for(s6.setState({
                __e: s6.__b = null
            }); a14 = s6.t.pop();)a14.forceUpdate();
        }
    }, d11 = !0 === a13.__h;
    (s6.__u++) || d11 || s6.setState({
        __e: s6.__b = s6.__v.__k[0]
    }), _18.then(i2, i2);
}, L1.prototype.componentWillUnmount = function() {
    this.t = [];
}, L1.prototype.render = function(_24, a17) {
    if (this.__b) {
        if (this.__v.__k) {
            var c9 = document.createElement("div"), s7 = this.__v.__k[0].__c;
            this.__v.__k[0] = (function n2(_25, a18, c12) {
                return _25 && (_25.__c && _25.__c.__H && (_25.__c.__H.__.forEach(function(_26) {
                    "function" == typeof _26.__c && _26.__c();
                }), _25.__c.__H = null), null != (_25 = C1({}, _25)).__c && (_25.__c.__P === c12 && (_25.__c.__P = a18), _25.__c = null), _25.__k = _25.__k && _25.__k.map(function(_27) {
                    return n2(_27, a18, c12);
                })), _25;
            })(this.__b, c9, s7.__O = s7.__P);
        }
        this.__b = null;
    }
    var f4 = a17.__e && v(d, null, _24.fallback);
    return f4 && (f4.__h = null), [
        v(d, null, a17.__e ? null : _24.children),
        f4
    ];
};
var T2 = function(_28, a19, c13) {
    if (++c13[1] === c13[0] && _28.o.delete(a19), _28.props.revealOrder && ("t" !== _28.props.revealOrder[0] || !_28.o.size)) for(c13 = _28.u; c13;){
        for(; c13.length > 3;)c13.pop()();
        if (c13[1] < c13[0]) break;
        _28.u = c13 = c13[2];
    }
};
function D1(_29) {
    return this.getChildContext = function() {
        return _29.context;
    }, _29.children;
}
function I1(_30) {
    var a20 = this, c14 = _30.i;
    a20.componentWillUnmount = function() {
        S(null, a20.l), a20.l = null, a20.i = null;
    }, a20.i && a20.i !== c14 && a20.componentWillUnmount(), _30.__v ? (a20.l || (a20.i = c14, a20.l = {
        nodeType: 1,
        parentNode: c14,
        childNodes: [],
        appendChild: function(_31) {
            this.childNodes.push(_31), a20.i.appendChild(_31);
        },
        insertBefore: function(_32, c) {
            this.childNodes.push(_32), a20.i.appendChild(_32);
        },
        removeChild: function(_33) {
            this.childNodes.splice(this.childNodes.indexOf(_33) >>> 1, 1), a20.i.removeChild(_33);
        }
    }), S(v(D1, {
        context: a20.context
    }, _30.__v), a20.l)) : a20.l && a20.componentWillUnmount();
}
function W(_34, a21) {
    return v(I1, {
        __v: _34,
        i: a21
    });
}
(M1.prototype = new _).__e = function(_35) {
    var a22 = this, c15 = U(a22.__v), s8 = a22.o.get(_35);
    return s8[0]++, function(f5) {
        var o2 = function() {
            a22.props.revealOrder ? (s8.push(f5), T2(a22, _35, s8)) : f5();
        };
        c15 ? c15(o2) : o2();
    };
}, M1.prototype.render = function(_36) {
    this.u = null, this.o = new Map;
    var a23 = A(_36.children);
    _36.revealOrder && "b" === _36.revealOrder[0] && a23.reverse();
    for(var c16 = a23.length; c16--;)this.o.set(a23[c16], this.u = [
        1,
        0,
        this.u
    ]);
    return _36.children;
}, M1.prototype.componentDidUpdate = M1.prototype.componentDidMount = function() {
    var _37 = this;
    this.o.forEach(function(a24, c17) {
        T2(_37, c17, a24);
    });
};
var X = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, ee = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, ne = "undefined" != typeof document, z1 = function(_38) {
    return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i).test(_38);
};
function B1(_39, a25, c18) {
    return null == a25.__k && (a25.textContent = ""), S(_39, a25), "function" == typeof c18 && c18(), _39 ? _39.__c : null;
}
function $1(_40, a26, c19) {
    return q(_40, a26), "function" == typeof c19 && c19(), _40 ? _40.__c : null;
}
_.prototype.isReactComponent = {}, [
    "componentWillMount",
    "componentWillReceiveProps",
    "componentWillUpdate"
].forEach(function(_41) {
    Object.defineProperty(_.prototype, _41, {
        configurable: !0,
        get: function() {
            return this["UNSAFE_" + _41];
        },
        set: function(a27) {
            Object.defineProperty(this, _41, {
                configurable: !0,
                writable: !0,
                value: a27
            });
        }
    });
});
var te = n.event;
function Z() {}
function Y() {
    return this.cancelBubble;
}
function q2() {
    return this.defaultPrevented;
}
n.event = function(_42) {
    return te && (_42 = te(_42)), _42.persist = Z, _42.isPropagationStopped = Y, _42.isDefaultPrevented = q2, _42.nativeEvent = _42;
};
var re, oe = {
    configurable: !0,
    get: function() {
        return this.class;
    }
}, ue = n.vnode;
n.vnode = function(_43) {
    var a28 = _43.type, c20 = _43.props, s9 = c20;
    if ("string" == typeof a28) {
        var f6 = -1 === a28.indexOf("-");
        for(var p2 in s9 = {}, c20){
            var d2 = c20[p2];
            ne && "children" === p2 && "noscript" === a28 || "value" === p2 && "defaultValue" in c20 && null == d2 || ("defaultValue" === p2 && "value" in c20 && null == c20.value ? p2 = "value" : "download" === p2 && !0 === d2 ? d2 = "" : /ondoubleclick/i.test(p2) ? p2 = "ondblclick" : /^onchange(textarea|input)/i.test(p2 + a28) && !z1(c20.type) ? p2 = "oninput" : /^onfocus$/i.test(p2) ? p2 = "onfocusin" : /^onblur$/i.test(p2) ? p2 = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(p2) ? p2 = p2.toLowerCase() : f6 && ee.test(p2) ? p2 = p2.replace(/[A-Z0-9]/, "-$&").toLowerCase() : null === d2 && (d2 = void 0), s9[p2] = d2);
        }
        "select" == a28 && s9.multiple && Array.isArray(s9.value) && (s9.value = A(c20.children).forEach(function(_44) {
            _44.props.selected = -1 != s9.value.indexOf(_44.props.value);
        })), "select" == a28 && null != s9.defaultValue && (s9.value = A(c20.children).forEach(function(_45) {
            _45.props.selected = s9.multiple ? -1 != s9.defaultValue.indexOf(_45.props.value) : s9.defaultValue == _45.props.value;
        })), _43.props = s9, c20.class != c20.className && (oe.enumerable = "className" in c20, null != c20.className && (s9.class = c20.className), Object.defineProperty(s9, "className", oe));
    }
    _43.$$typeof = X, ue && ue(_43);
};
var ie = n.__r;
n.__r = function(_46) {
    ie && ie(_46), re = _46.__c;
};
var _e = {
    ReactCurrentDispatcher: {
        current: {
            readContext: function(_47) {
                return re.__n[_47.__c].props.value;
            }
        }
    }
}, le = "17.0.2";
function tn(_48) {
    return v.bind(null, _48);
}
function en(_49) {
    return !!_49 && _49.$$typeof === X;
}
function rn(_50) {
    return en(_50) ? B.apply(null, arguments) : _50;
}
function un(_51) {
    return !!_51.__k && (S(null, _51), !0);
}
function on(_52) {
    return _52 && (_52.base || 1 === _52.nodeType && _52) || null;
}
var ln = function(_53, a29) {
    return _53(a29);
}, cn = function(_54, a30) {
    return _54(a30);
}, ae = d;
var ce = {
    useState: l1,
    useReducer: p1,
    useEffect: y1,
    useLayoutEffect: h1,
    useRef: s1,
    useImperativeHandle: _1,
    useMemo: d1,
    useCallback: A1,
    useContext: F,
    useDebugValue: T1,
    version: "17.0.2",
    Children: J,
    render: B1,
    hydrate: $1,
    unmountComponentAtNode: un,
    createPortal: W,
    createElement: v,
    createContext: D,
    createFactory: tn,
    cloneElement: rn,
    createRef: p,
    Fragment: d,
    isValidElement: en,
    findDOMNode: on,
    Component: _,
    PureComponent: E1,
    memo: g2,
    forwardRef: x2,
    flushSync: cn,
    unstable_batchedUpdates: ln,
    StrictMode: d,
    Suspense: L1,
    SuspenseList: M1,
    lazy: F1,
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: _e
};
const mod1 = {
    Component: _,
    Fragment: d,
    createContext: D,
    createElement: v,
    createRef: p,
    Children: J,
    PureComponent: E1,
    StrictMode: ae,
    Suspense: L1,
    SuspenseList: M1,
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: _e,
    cloneElement: rn,
    createFactory: tn,
    createPortal: W,
    default: ce,
    findDOMNode: on,
    flushSync: cn,
    forwardRef: x2,
    hydrate: $1,
    isValidElement: en,
    lazy: F1,
    memo: g2,
    render: B1,
    unmountComponentAtNode: un,
    unstable_batchedUpdates: ln,
    version: le,
    useCallback: A1,
    useContext: F,
    useDebugValue: T1,
    useEffect: y1,
    useErrorBoundary: q1,
    useImperativeHandle: _1,
    useLayoutEffect: h1,
    useMemo: d1,
    useReducer: p1,
    useRef: s1,
    useState: l1
};
const react = {
    ...mod,
    ...mod1
};
const { createContext  } = react;
const { useDebugValue  } = react;
const { useState  } = react;
const { useRef  } = react;
const { useContext  } = react;
const { useLayoutEffect  } = react;
const { useEffect  } = react;
const { useReducer  } = react;
const { useCallback  } = react;
const { forwardRef  } = react;
const { createElement  } = react;
const { createFactory  } = react;
const { createRef  } = react;
const { Fragment  } = react;
const { Component  } = react;
const { Suspense  } = react;
const { isValidElement  } = react;
const { memo  } = react;
const { useImperativeHandle  } = react;
const { Children  } = react;
const { lazy  } = react;
const { useMemo  } = react;
const { cloneElement  } = react;
const mod2 = {
    render: B1,
    hydrate: $1,
    createContext: createContext,
    useDebugValue: useDebugValue,
    useState: useState,
    useRef: useRef,
    useContext: useContext,
    useLayoutEffect: useLayoutEffect,
    useEffect: useEffect,
    useReducer: useReducer,
    useCallback: useCallback,
    forwardRef: forwardRef,
    createElement: createElement,
    createFactory: createFactory,
    createRef: createRef,
    Fragment: Fragment,
    Component: Component,
    Suspense: Suspense,
    isValidElement: isValidElement,
    memo: memo,
    useImperativeHandle: useImperativeHandle,
    Children: Children,
    lazy: lazy,
    useMemo: useMemo,
    cloneElement: cloneElement,
    default: react
};
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target)=>__defProp(target, "__esModule", {
        value: true
    })
;
var __require = ((x3)=>typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x3, {
        get: (a2, b2)=>(typeof require !== "undefined" ? require : a2)[b2]
    }) : x3
)(function(x4) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x4 + '" is not supported');
});
var __commonJS = (cb2, mod3)=>function __require2() {
        return mod3 || (0, cb2[__getOwnPropNames(cb2)[0]])((mod3 = {
            exports: {}
        }).exports, mod3), mod3.exports;
    }
;
var __reExport = (target, module, copyDefault, desc)=>{
    if (module && typeof module === "object" || typeof module === "function") {
        for (let key of __getOwnPropNames(module))if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default")) __defProp(target, key, {
            get: ()=>module[key]
            ,
            enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable
        });
    }
    return target;
};
var __toESM = (module, isNodeMode)=>{
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? {
        get: ()=>module.default
        ,
        enumerable: true
    } : {
        value: module,
        enumerable: true
    })), module);
};
var require_tslib = __commonJS({
    "../../node_modules/tslib/tslib.js" (exports, module) {
        var __extends2;
        var __assign2;
        var __rest2;
        var __decorate2;
        var __param2;
        var __metadata2;
        var __awaiter2;
        var __generator2;
        var __exportStar2;
        var __values2;
        var __read2;
        var __spread2;
        var __spreadArrays2;
        var __spreadArray2;
        var __await2;
        var __asyncGenerator2;
        var __asyncDelegator2;
        var __asyncValues2;
        var __makeTemplateObject2;
        var __importStar2;
        var __importDefault2;
        var __classPrivateFieldGet2;
        var __classPrivateFieldSet2;
        var __createBinding2;
        (function(factory) {
            var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
            if (typeof define === "function" && define.amd) {
                define("tslib", [
                    "exports"
                ], function(exports2) {
                    factory(createExporter(root, createExporter(exports2)));
                });
            } else if (typeof module === "object" && typeof module.exports === "object") {
                factory(createExporter(root, createExporter(module.exports)));
            } else {
                factory(createExporter(root));
            }
            function createExporter(exports2, previous) {
                if (exports2 !== root) {
                    if (typeof Object.create === "function") {
                        Object.defineProperty(exports2, "__esModule", {
                            value: true
                        });
                    } else {
                        exports2.__esModule = true;
                    }
                }
                return function(id2, v2) {
                    return exports2[id2] = previous ? previous(id2, v2) : v2;
                };
            }
        })(function(exporter) {
            var extendStatics = Object.setPrototypeOf || ({
                __proto__: []
            }) instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
            } || function(d3, b2) {
                for(var p2 in b2)if (Object.prototype.hasOwnProperty.call(b2, p2)) d3[p2] = b2[p2];
            };
            __extends2 = function(d4, b2) {
                if (typeof b2 !== "function" && b2 !== null) throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
                extendStatics(d4, b2);
                function __() {
                    this.constructor = d4;
                }
                d4.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
            };
            __assign2 = Object.assign || function(t2) {
                for(var s2, i2 = 1, n1 = arguments.length; i2 < n1; i2++){
                    s2 = arguments[i2];
                    for(var p3 in s2)if (Object.prototype.hasOwnProperty.call(s2, p3)) t2[p3] = s2[p3];
                }
                return t2;
            };
            __rest2 = function(s3, e2) {
                var t3 = {};
                for(var p4 in s3)if (Object.prototype.hasOwnProperty.call(s3, p4) && e2.indexOf(p4) < 0) t3[p4] = s3[p4];
                if (s3 != null && typeof Object.getOwnPropertySymbols === "function") for(var i3 = 0, p4 = Object.getOwnPropertySymbols(s3); i3 < p4.length; i3++){
                    if (e2.indexOf(p4[i3]) < 0 && Object.prototype.propertyIsEnumerable.call(s3, p4[i3])) t3[p4[i3]] = s3[p4[i3]];
                }
                return t3;
            };
            __decorate2 = function(decorators, target, key, desc) {
                var c2 = arguments.length, r2 = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d5;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
                else for(var i4 = decorators.length - 1; i4 >= 0; i4--)if (d5 = decorators[i4]) r2 = (c2 < 3 ? d5(r2) : c2 > 3 ? d5(target, key, r2) : d5(target, key)) || r2;
                return c2 > 3 && r2 && Object.defineProperty(target, key, r2), r2;
            };
            __param2 = function(paramIndex, decorator) {
                return function(target, key) {
                    decorator(target, key, paramIndex);
                };
            };
            __metadata2 = function(metadataKey, metadataValue) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
            };
            __awaiter2 = function(thisArg, _arguments, P1, generator) {
                function adopt(value) {
                    return value instanceof P1 ? value : new P1(function(resolve) {
                        resolve(value);
                    });
                }
                return new (P1 || (P1 = Promise))(function(resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e3) {
                            reject(e3);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator["throw"](value));
                        } catch (e4) {
                            reject(e4);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            __generator2 = function(thisArg, body) {
                var _2 = {
                    label: 0,
                    sent: function() {
                        if (t4[0] & 1) throw t4[1];
                        return t4[1];
                    },
                    trys: [],
                    ops: []
                }, f2, y2, t4, g3;
                return g3 = {
                    next: verb(0),
                    "throw": verb(1),
                    "return": verb(2)
                }, typeof Symbol === "function" && (g3[Symbol.iterator] = function() {
                    return this;
                }), g3;
                function verb(n2) {
                    return function(v3) {
                        return step([
                            n2,
                            v3
                        ]);
                    };
                }
                function step(op) {
                    if (f2) throw new TypeError("Generator is already executing.");
                    while(_2)try {
                        if (f2 = 1, y2 && (t4 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t4 = y2["return"]) && t4.call(y2), 0) : y2.next) && !(t4 = t4.call(y2, op[1])).done) return t4;
                        if (y2 = 0, t4) op = [
                            op[0] & 2,
                            t4.value
                        ];
                        switch(op[0]){
                            case 0:
                            case 1:
                                t4 = op;
                                break;
                            case 4:
                                _2.label++;
                                return {
                                    value: op[1],
                                    done: false
                                };
                            case 5:
                                _2.label++;
                                y2 = op[1];
                                op = [
                                    0
                                ];
                                continue;
                            case 7:
                                op = _2.ops.pop();
                                _2.trys.pop();
                                continue;
                            default:
                                if (!(t4 = _2.trys, t4 = t4.length > 0 && t4[t4.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                    _2 = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t4 || op[1] > t4[0] && op[1] < t4[3])) {
                                    _2.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _2.label < t4[1]) {
                                    _2.label = t4[1];
                                    t4 = op;
                                    break;
                                }
                                if (t4 && _2.label < t4[2]) {
                                    _2.label = t4[2];
                                    _2.ops.push(op);
                                    break;
                                }
                                if (t4[2]) _2.ops.pop();
                                _2.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _2);
                    } catch (e5) {
                        op = [
                            6,
                            e5
                        ];
                        y2 = 0;
                    } finally{
                        f2 = t4 = 0;
                    }
                    if (op[0] & 5) throw op[1];
                    return {
                        value: op[0] ? op[1] : void 0,
                        done: true
                    };
                }
            };
            __exportStar2 = function(m2, o2) {
                for(var p5 in m2)if (p5 !== "default" && !Object.prototype.hasOwnProperty.call(o2, p5)) __createBinding2(o2, m2, p5);
            };
            __createBinding2 = Object.create ? function(o3, m3, k3, k2) {
                if (k2 === void 0) k2 = k3;
                Object.defineProperty(o3, k2, {
                    enumerable: true,
                    get: function() {
                        return m3[k3];
                    }
                });
            } : function(o4, m4, k4, k2) {
                if (k2 === void 0) k2 = k4;
                o4[k2] = m4[k4];
            };
            __values2 = function(o5) {
                var s4 = typeof Symbol === "function" && Symbol.iterator, m5 = s4 && o5[s4], i5 = 0;
                if (m5) return m5.call(o5);
                if (o5 && typeof o5.length === "number") return {
                    next: function() {
                        if (o5 && i5 >= o5.length) o5 = void 0;
                        return {
                            value: o5 && o5[i5++],
                            done: !o5
                        };
                    }
                };
                throw new TypeError(s4 ? "Object is not iterable." : "Symbol.iterator is not defined.");
            };
            __read2 = function(o6, n3) {
                var m6 = typeof Symbol === "function" && o6[Symbol.iterator];
                if (!m6) return o6;
                var i6 = m6.call(o6), r3, ar = [], e6;
                try {
                    while((n3 === void 0 || n3-- > 0) && !(r3 = i6.next()).done)ar.push(r3.value);
                } catch (error) {
                    e6 = {
                        error
                    };
                } finally{
                    try {
                        if (r3 && !r3.done && (m6 = i6["return"])) m6.call(i6);
                    } finally{
                        if (e6) throw e6.error;
                    }
                }
                return ar;
            };
            __spread2 = function() {
                for(var ar = [], i7 = 0; i7 < arguments.length; i7++)ar = ar.concat(__read2(arguments[i7]));
                return ar;
            };
            __spreadArrays2 = function() {
                for(var s5 = 0, i8 = 0, il = arguments.length; i8 < il; i8++)s5 += arguments[i8].length;
                for(var r4 = Array(s5), k5 = 0, i8 = 0; i8 < il; i8++)for(var a2 = arguments[i8], j3 = 0, jl = a2.length; j3 < jl; j3++, k5++)r4[k5] = a2[j3];
                return r4;
            };
            __spreadArray2 = function(to, from, pack) {
                if (pack || arguments.length === 2) for(var i9 = 0, l2 = from.length, ar; i9 < l2; i9++){
                    if (ar || !(i9 in from)) {
                        if (!ar) ar = Array.prototype.slice.call(from, 0, i9);
                        ar[i9] = from[i9];
                    }
                }
                return to.concat(ar || Array.prototype.slice.call(from));
            };
            __await2 = function(v4) {
                return this instanceof __await2 ? (this.v = v4, this) : new __await2(v4);
            };
            __asyncGenerator2 = function(thisArg, _arguments, generator) {
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var g4 = generator.apply(thisArg, _arguments || []), i10, q3 = [];
                return i10 = {}, verb("next"), verb("throw"), verb("return"), i10[Symbol.asyncIterator] = function() {
                    return this;
                }, i10;
                function verb(n4) {
                    if (g4[n4]) i10[n4] = function(v5) {
                        return new Promise(function(a2, b2) {
                            q3.push([
                                n4,
                                v5,
                                a2,
                                b2
                            ]) > 1 || resume(n4, v5);
                        });
                    };
                }
                function resume(n5, v6) {
                    try {
                        step(g4[n5](v6));
                    } catch (e7) {
                        settle(q3[0][3], e7);
                    }
                }
                function step(r5) {
                    r5.value instanceof __await2 ? Promise.resolve(r5.value.v).then(fulfill, reject) : settle(q3[0][2], r5);
                }
                function fulfill(value) {
                    resume("next", value);
                }
                function reject(value) {
                    resume("throw", value);
                }
                function settle(f3, v7) {
                    if (f3(v7), q3.shift(), q3.length) resume(q3[0][0], q3[0][1]);
                }
            };
            __asyncDelegator2 = function(o7) {
                var i11, p6;
                return i11 = {}, verb("next"), verb("throw", function(e8) {
                    throw e8;
                }), verb("return"), i11[Symbol.iterator] = function() {
                    return this;
                }, i11;
                function verb(n6, f4) {
                    i11[n6] = o7[n6] ? function(v8) {
                        return (p6 = !p6) ? {
                            value: __await2(o7[n6](v8)),
                            done: n6 === "return"
                        } : f4 ? f4(v8) : v8;
                    } : f4;
                }
            };
            __asyncValues2 = function(o8) {
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var m7 = o8[Symbol.asyncIterator], i12;
                return m7 ? m7.call(o8) : (o8 = typeof __values2 === "function" ? __values2(o8) : o8[Symbol.iterator](), i12 = {}, verb("next"), verb("throw"), verb("return"), i12[Symbol.asyncIterator] = function() {
                    return this;
                }, i12);
                function verb(n7) {
                    i12[n7] = o8[n7] && function(v9) {
                        return new Promise(function(resolve, reject) {
                            v9 = o8[n7](v9), settle(resolve, reject, v9.done, v9.value);
                        });
                    };
                }
                function settle(resolve, reject, d6, v10) {
                    Promise.resolve(v10).then(function(v2) {
                        resolve({
                            value: v2,
                            done: d6
                        });
                    }, reject);
                }
            };
            __makeTemplateObject2 = function(cooked, raw) {
                if (Object.defineProperty) {
                    Object.defineProperty(cooked, "raw", {
                        value: raw
                    });
                } else {
                    cooked.raw = raw;
                }
                return cooked;
            };
            var __setModuleDefault = Object.create ? function(o9, v11) {
                Object.defineProperty(o9, "default", {
                    enumerable: true,
                    value: v11
                });
            } : function(o10, v12) {
                o10["default"] = v12;
            };
            __importStar2 = function(mod4) {
                if (mod4 && mod4.__esModule) return mod4;
                var result = {};
                if (mod4 != null) {
                    for(var k6 in mod4)if (k6 !== "default" && Object.prototype.hasOwnProperty.call(mod4, k6)) __createBinding2(result, mod4, k6);
                }
                __setModuleDefault(result, mod4);
                return result;
            };
            __importDefault2 = function(mod5) {
                return mod5 && mod5.__esModule ? mod5 : {
                    "default": mod5
                };
            };
            __classPrivateFieldGet2 = function(receiver, state, kind, f5) {
                if (kind === "a" && !f5) throw new TypeError("Private accessor was defined without a getter");
                if (typeof state === "function" ? receiver !== state || !f5 : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
                return kind === "m" ? f5 : kind === "a" ? f5.call(receiver) : f5 ? f5.value : state.get(receiver);
            };
            __classPrivateFieldSet2 = function(receiver, state, value, kind, f6) {
                if (kind === "m") throw new TypeError("Private method is not writable");
                if (kind === "a" && !f6) throw new TypeError("Private accessor was defined without a setter");
                if (typeof state === "function" ? receiver !== state || !f6 : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
                return kind === "a" ? f6.call(receiver, value) : f6 ? f6.value = value : state.set(receiver, value), value;
            };
            exporter("__extends", __extends2);
            exporter("__assign", __assign2);
            exporter("__rest", __rest2);
            exporter("__decorate", __decorate2);
            exporter("__param", __param2);
            exporter("__metadata", __metadata2);
            exporter("__awaiter", __awaiter2);
            exporter("__generator", __generator2);
            exporter("__exportStar", __exportStar2);
            exporter("__createBinding", __createBinding2);
            exporter("__values", __values2);
            exporter("__read", __read2);
            exporter("__spread", __spread2);
            exporter("__spreadArrays", __spreadArrays2);
            exporter("__spreadArray", __spreadArray2);
            exporter("__await", __await2);
            exporter("__asyncGenerator", __asyncGenerator2);
            exporter("__asyncDelegator", __asyncDelegator2);
            exporter("__asyncValues", __asyncValues2);
            exporter("__makeTemplateObject", __makeTemplateObject2);
            exporter("__importStar", __importStar2);
            exporter("__importDefault", __importDefault2);
            exporter("__classPrivateFieldGet", __classPrivateFieldGet2);
            exporter("__classPrivateFieldSet", __classPrivateFieldSet2);
        });
    }
});
var import_tslib = __toESM(require_tslib(), 1);
var { __extends , __assign , __rest , __decorate , __param , __metadata , __awaiter , __generator , __exportStar , __createBinding , __values , __read , __spread , __spreadArrays , __spreadArray , __await , __asyncGenerator , __asyncDelegator , __asyncValues , __makeTemplateObject , __importStar , __importDefault , __classPrivateFieldGet , __classPrivateFieldSet  } = import_tslib.default;
var createDefinition = function(propNames) {
    return {
        isEnabled: function(props) {
            return propNames.some(function(name) {
                return !!props[name];
            });
        }
    };
};
var featureDefinitions = {
    measureLayout: createDefinition([
        "layout",
        "layoutId",
        "drag"
    ]),
    animation: createDefinition([
        "animate",
        "exit",
        "variants",
        "whileHover",
        "whileTap",
        "whileFocus",
        "whileDrag",
        "whileInView"
    ]),
    exit: createDefinition([
        "exit"
    ]),
    drag: createDefinition([
        "drag",
        "dragControls"
    ]),
    focus: createDefinition([
        "whileFocus"
    ]),
    hover: createDefinition([
        "whileHover",
        "onHoverStart",
        "onHoverEnd"
    ]),
    tap: createDefinition([
        "whileTap",
        "onTap",
        "onTapStart",
        "onTapCancel"
    ]),
    pan: createDefinition([
        "onPan",
        "onPanStart",
        "onPanSessionStart",
        "onPanEnd"
    ]),
    inView: createDefinition([
        "whileInView",
        "onViewportEnter",
        "onViewportLeave"
    ])
};
function loadFeatures(features) {
    for(var key in features){
        if (features[key] === null) continue;
        if (key === "projectionNodeConstructor") {
            featureDefinitions.projectionNodeConstructor = features[key];
        } else {
            featureDefinitions[key].Component = features[key];
        }
    }
}
var warning = function() {};
var invariant = function() {};
var LazyContext = createContext({
    strict: false
});
var featureNames = Object.keys(featureDefinitions);
var numFeatures = featureNames.length;
function useFeatures(props, visualElement2, preloadedFeatures) {
    var features = [];
    useContext(LazyContext);
    if (!visualElement2) return null;
    for(var i13 = 0; i13 < numFeatures; i13++){
        var name_1 = featureNames[i13];
        var _a = featureDefinitions[name_1], isEnabled = _a.isEnabled, Component1 = _a.Component;
        if (isEnabled(props) && Component1) {
            features.push(mod2.createElement(Component1, __assign({
                key: name_1
            }, props, {
                visualElement: visualElement2
            })));
        }
    }
    return features;
}
var MotionConfigContext = createContext({
    transformPagePoint: function(p7) {
        return p7;
    },
    isStatic: false,
    reducedMotion: "never"
});
var MotionContext = createContext({});
function useVisualElementContext() {
    return useContext(MotionContext).visualElement;
}
var PresenceContext = createContext(null);
var isBrowser = typeof window !== "undefined";
var useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;
var prefersReducedMotion = {
    current: null
};
var hasDetected = false;
function initPrefersReducedMotion() {
    hasDetected = true;
    if (typeof window === "undefined") return;
    if (window.matchMedia) {
        var motionMediaQuery_1 = window.matchMedia("(prefers-reduced-motion)");
        var setReducedMotionPreferences = function() {
            return prefersReducedMotion.current = motionMediaQuery_1.matches;
        };
        motionMediaQuery_1.addListener(setReducedMotionPreferences);
        setReducedMotionPreferences();
    } else {
        prefersReducedMotion.current = false;
    }
}
function useReducedMotion() {
    !hasDetected && initPrefersReducedMotion();
    var _a = __read(useState(prefersReducedMotion.current), 1), shouldReduceMotion = _a[0];
    return shouldReduceMotion;
}
function useReducedMotionConfig() {
    var reducedMotionPreference = useReducedMotion();
    var reducedMotion = useContext(MotionConfigContext).reducedMotion;
    if (reducedMotion === "never") {
        return false;
    } else if (reducedMotion === "always") {
        return true;
    } else {
        return reducedMotionPreference;
    }
}
function useVisualElement(Component2, visualState, props, createVisualElement) {
    var lazyContext = useContext(LazyContext);
    var parent = useVisualElementContext();
    var presenceContext = useContext(PresenceContext);
    var shouldReduceMotion = useReducedMotionConfig();
    var visualElementRef = useRef(void 0);
    if (!createVisualElement) createVisualElement = lazyContext.renderer;
    if (!visualElementRef.current && createVisualElement) {
        visualElementRef.current = createVisualElement(Component2, {
            visualState,
            parent,
            props,
            presenceId: presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.id,
            blockInitialAnimation: (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.initial) === false,
            shouldReduceMotion
        });
    }
    var visualElement2 = visualElementRef.current;
    useIsomorphicLayoutEffect(function() {
        visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.syncRender();
    });
    useEffect(function() {
        var _a;
        (_a = visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.animationState) === null || _a === void 0 ? void 0 : _a.animateChanges();
    });
    useIsomorphicLayoutEffect(function() {
        return function() {
            return visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.notifyUnmount();
        };
    }, []);
    return visualElement2;
}
function isRefObject(ref) {
    return typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}
function useMotionRef(visualState, visualElement2, externalRef) {
    return useCallback(function(instance) {
        var _a;
        instance && ((_a = visualState.mount) === null || _a === void 0 ? void 0 : _a.call(visualState, instance));
        if (visualElement2) {
            instance ? visualElement2.mount(instance) : visualElement2.unmount();
        }
        if (externalRef) {
            if (typeof externalRef === "function") {
                externalRef(instance);
            } else if (isRefObject(externalRef)) {
                externalRef.current = instance;
            }
        }
    }, [
        visualElement2
    ]);
}
function isVariantLabels(v13) {
    return Array.isArray(v13);
}
function isVariantLabel(v14) {
    return typeof v14 === "string" || isVariantLabels(v14);
}
function getCurrent(visualElement2) {
    var current = {};
    visualElement2.forEachValue(function(value, key) {
        return current[key] = value.get();
    });
    return current;
}
function getVelocity(visualElement2) {
    var velocity = {};
    visualElement2.forEachValue(function(value, key) {
        return velocity[key] = value.getVelocity();
    });
    return velocity;
}
function resolveVariantFromProps(props, definition, custom, currentValues, currentVelocity) {
    var _a;
    if (currentValues === void 0) {
        currentValues = {};
    }
    if (currentVelocity === void 0) {
        currentVelocity = {};
    }
    if (typeof definition === "function") {
        definition = definition(custom !== null && custom !== void 0 ? custom : props.custom, currentValues, currentVelocity);
    }
    if (typeof definition === "string") {
        definition = (_a = props.variants) === null || _a === void 0 ? void 0 : _a[definition];
    }
    if (typeof definition === "function") {
        definition = definition(custom !== null && custom !== void 0 ? custom : props.custom, currentValues, currentVelocity);
    }
    return definition;
}
function resolveVariant(visualElement2, definition, custom) {
    var props = visualElement2.getProps();
    return resolveVariantFromProps(props, definition, custom !== null && custom !== void 0 ? custom : props.custom, getCurrent(visualElement2), getVelocity(visualElement2));
}
function checkIfControllingVariants(props) {
    var _a;
    return typeof ((_a = props.animate) === null || _a === void 0 ? void 0 : _a.start) === "function" || isVariantLabel(props.initial) || isVariantLabel(props.animate) || isVariantLabel(props.whileHover) || isVariantLabel(props.whileDrag) || isVariantLabel(props.whileTap) || isVariantLabel(props.whileFocus) || isVariantLabel(props.exit);
}
function checkIfVariantNode(props) {
    return Boolean(checkIfControllingVariants(props) || props.variants);
}
function getCurrentTreeVariants(props, context) {
    if (checkIfControllingVariants(props)) {
        var initial = props.initial, animate3 = props.animate;
        return {
            initial: initial === false || isVariantLabel(initial) ? initial : void 0,
            animate: isVariantLabel(animate3) ? animate3 : void 0
        };
    }
    return props.inherit !== false ? context : {};
}
function useCreateMotionContext(props) {
    var _a = getCurrentTreeVariants(props, useContext(MotionContext)), initial = _a.initial, animate3 = _a.animate;
    return useMemo(function() {
        return {
            initial,
            animate: animate3
        };
    }, [
        variantLabelsAsDependency(initial),
        variantLabelsAsDependency(animate3)
    ]);
}
function variantLabelsAsDependency(prop) {
    return Array.isArray(prop) ? prop.join(" ") : prop;
}
function useConstant(init) {
    var ref = useRef(null);
    if (ref.current === null) {
        ref.current = init();
    }
    return ref.current;
}
var defaultTimestep = 1 / 60 * 1000;
var getCurrentTime = typeof performance !== "undefined" ? ()=>performance.now()
 : ()=>Date.now()
;
var onNextFrame = typeof window !== "undefined" ? (callback)=>window.requestAnimationFrame(callback)
 : (callback)=>setTimeout(()=>callback(getCurrentTime())
    , defaultTimestep)
;
function createRenderStep(runNextFrame2) {
    let toRun = [];
    let toRunNextFrame = [];
    let numToRun = 0;
    let isProcessing2 = false;
    let flushNextFrame = false;
    const toKeepAlive = new WeakSet();
    const step = {
        schedule: (callback, keepAlive = false, immediate = false)=>{
            const addToCurrentFrame = immediate && isProcessing2;
            const buffer = addToCurrentFrame ? toRun : toRunNextFrame;
            if (keepAlive) toKeepAlive.add(callback);
            if (buffer.indexOf(callback) === -1) {
                buffer.push(callback);
                if (addToCurrentFrame && isProcessing2) numToRun = toRun.length;
            }
            return callback;
        },
        cancel: (callback)=>{
            const index = toRunNextFrame.indexOf(callback);
            if (index !== -1) toRunNextFrame.splice(index, 1);
            toKeepAlive.delete(callback);
        },
        process: (frameData)=>{
            if (isProcessing2) {
                flushNextFrame = true;
                return;
            }
            isProcessing2 = true;
            [toRun, toRunNextFrame] = [
                toRunNextFrame,
                toRun
            ];
            toRunNextFrame.length = 0;
            numToRun = toRun.length;
            if (numToRun) {
                for(let i14 = 0; i14 < numToRun; i14++){
                    const callback = toRun[i14];
                    callback(frameData);
                    if (toKeepAlive.has(callback)) {
                        step.schedule(callback);
                        runNextFrame2();
                    }
                }
            }
            isProcessing2 = false;
            if (flushNextFrame) {
                flushNextFrame = false;
                step.process(frameData);
            }
        }
    };
    return step;
}
var maxElapsed = 40;
var useDefaultElapsed = true;
var runNextFrame = false;
var isProcessing = false;
var frame = {
    delta: 0,
    timestamp: 0
};
var stepsOrder = [
    "read",
    "update",
    "preRender",
    "render",
    "postRender"
];
var steps = stepsOrder.reduce((acc, key)=>{
    acc[key] = createRenderStep(()=>runNextFrame = true
    );
    return acc;
}, {});
var sync = stepsOrder.reduce((acc, key)=>{
    const step = steps[key];
    acc[key] = (process2, keepAlive = false, immediate = false)=>{
        if (!runNextFrame) startLoop();
        return step.schedule(process2, keepAlive, immediate);
    };
    return acc;
}, {});
var cancelSync = stepsOrder.reduce((acc, key)=>{
    acc[key] = steps[key].cancel;
    return acc;
}, {});
var flushSync = stepsOrder.reduce((acc, key)=>{
    acc[key] = ()=>steps[key].process(frame)
    ;
    return acc;
}, {});
var processStep = (stepId)=>steps[stepId].process(frame)
;
var processFrame = (timestamp)=>{
    runNextFrame = false;
    frame.delta = useDefaultElapsed ? defaultTimestep : Math.max(Math.min(timestamp - frame.timestamp, maxElapsed), 1);
    frame.timestamp = timestamp;
    isProcessing = true;
    stepsOrder.forEach(processStep);
    isProcessing = false;
    if (runNextFrame) {
        useDefaultElapsed = false;
        onNextFrame(processFrame);
    }
};
var startLoop = ()=>{
    runNextFrame = true;
    useDefaultElapsed = true;
    if (!isProcessing) onNextFrame(processFrame);
};
var getFrameData = ()=>frame
;
var es_default = sync;
var clamp = (min, max, v15)=>Math.min(Math.max(v15, min), max)
;
var safeMin = 0.001;
var minDuration = 0.01;
var maxDuration = 10;
var minDamping = 0.05;
var maxDamping = 1;
function findSpring({ duration =800 , bounce =0.25 , velocity =0 , mass =1  }) {
    let envelope;
    let derivative;
    warning(duration <= maxDuration * 1000, "Spring duration must be 10 seconds or less");
    let dampingRatio = 1 - bounce;
    dampingRatio = clamp(minDamping, maxDamping, dampingRatio);
    duration = clamp(minDuration, maxDuration, duration / 1000);
    if (dampingRatio < 1) {
        envelope = (undampedFreq2)=>{
            const exponentialDecay = undampedFreq2 * dampingRatio;
            const delta = exponentialDecay * duration;
            const a2 = exponentialDecay - velocity;
            const b2 = calcAngularFreq(undampedFreq2, dampingRatio);
            const c2 = Math.exp(-delta);
            return safeMin - a2 / b2 * c2;
        };
        derivative = (undampedFreq2)=>{
            const exponentialDecay = undampedFreq2 * dampingRatio;
            const delta = exponentialDecay * duration;
            const d7 = delta * velocity + velocity;
            const e9 = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
            const f7 = Math.exp(-delta);
            const g5 = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
            const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
            return factor * ((d7 - e9) * f7) / g5;
        };
    } else {
        envelope = (undampedFreq2)=>{
            const a2 = Math.exp(-undampedFreq2 * duration);
            const b2 = (undampedFreq2 - velocity) * duration + 1;
            return -safeMin + a2 * b2;
        };
        derivative = (undampedFreq2)=>{
            const a2 = Math.exp(-undampedFreq2 * duration);
            const b2 = (velocity - undampedFreq2) * (duration * duration);
            return a2 * b2;
        };
    }
    const initialGuess = 5 / duration;
    const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
    duration = duration * 1000;
    if (isNaN(undampedFreq)) {
        return {
            stiffness: 100,
            damping: 10,
            duration
        };
    } else {
        const stiffness = Math.pow(undampedFreq, 2) * mass;
        return {
            stiffness,
            damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
            duration
        };
    }
}
var rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
    let result = initialGuess;
    for(let i15 = 1; i15 < rootIterations; i15++){
        result = result - envelope(result) / derivative(result);
    }
    return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
    return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
var durationKeys = [
    "duration",
    "bounce"
];
var physicsKeys = [
    "stiffness",
    "damping",
    "mass"
];
function isSpringType(options, keys) {
    return keys.some((key)=>options[key] !== void 0
    );
}
function getSpringOptions(options) {
    let springOptions = Object.assign({
        velocity: 0,
        stiffness: 100,
        damping: 10,
        mass: 1,
        isResolvedFromDuration: false
    }, options);
    if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
        const derived = findSpring(options);
        springOptions = Object.assign(Object.assign(Object.assign({}, springOptions), derived), {
            velocity: 0,
            mass: 1
        });
        springOptions.isResolvedFromDuration = true;
    }
    return springOptions;
}
function spring(_a) {
    var { from =0 , to =1 , restSpeed =2 , restDelta  } = _a, options = __rest(_a, [
        "from",
        "to",
        "restSpeed",
        "restDelta"
    ]);
    const state = {
        done: false,
        value: from
    };
    let { stiffness , damping , mass , velocity , duration , isResolvedFromDuration  } = getSpringOptions(options);
    let resolveSpring = zero;
    let resolveVelocity = zero;
    function createSpring() {
        const initialVelocity = velocity ? -(velocity / 1000) : 0;
        const initialDelta = to - from;
        const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
        const undampedAngularFreq = Math.sqrt(stiffness / mass) / 1000;
        if (restDelta === void 0) {
            restDelta = Math.min(Math.abs(to - from) / 100, 0.4);
        }
        if (dampingRatio < 1) {
            const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
            resolveSpring = (t5)=>{
                const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t5);
                return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t5) + initialDelta * Math.cos(angularFreq * t5));
            };
            resolveVelocity = (t6)=>{
                const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t6);
                return dampingRatio * undampedAngularFreq * envelope * (Math.sin(angularFreq * t6) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq + initialDelta * Math.cos(angularFreq * t6)) - envelope * (Math.cos(angularFreq * t6) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) - angularFreq * initialDelta * Math.sin(angularFreq * t6));
            };
        } else if (dampingRatio === 1) {
            resolveSpring = (t7)=>to - Math.exp(-undampedAngularFreq * t7) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t7)
            ;
        } else {
            const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
            resolveSpring = (t8)=>{
                const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t8);
                const freqForT = Math.min(dampedAngularFreq * t8, 300);
                return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
            };
        }
    }
    createSpring();
    return {
        next: (t9)=>{
            const current = resolveSpring(t9);
            if (!isResolvedFromDuration) {
                const currentVelocity = resolveVelocity(t9) * 1000;
                const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
                const isBelowDisplacementThreshold = Math.abs(to - current) <= restDelta;
                state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
            } else {
                state.done = t9 >= duration;
            }
            state.value = state.done ? to : current;
            return state;
        },
        flipTarget: ()=>{
            velocity = -velocity;
            [from, to] = [
                to,
                from
            ];
            createSpring();
        }
    };
}
spring.needsInterpolation = (a2, b2)=>typeof a2 === "string" || typeof b2 === "string"
;
var zero = (_t)=>0
;
var progress = (from, to, value)=>{
    const toFromDifference = to - from;
    return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};
var mix = (from, to, progress2)=>-progress2 * from + progress2 * to + from
;
var clamp2 = (min, max)=>(v16)=>Math.max(Math.min(v16, max), min)
;
var sanitize = (v17)=>v17 % 1 ? Number(v17.toFixed(5)) : v17
;
var floatRegex = /(-)?([\d]*\.?[\d])+/g;
var colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))/gi;
var singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))$/i;
function isString(v18) {
    return typeof v18 === "string";
}
var number = {
    test: (v19)=>typeof v19 === "number"
    ,
    parse: parseFloat,
    transform: (v20)=>v20
};
var alpha = Object.assign(Object.assign({}, number), {
    transform: clamp2(0, 1)
});
var scale = Object.assign(Object.assign({}, number), {
    default: 1
});
var createUnitType = (unit)=>({
        test: (v21)=>isString(v21) && v21.endsWith(unit) && v21.split(" ").length === 1
        ,
        parse: parseFloat,
        transform: (v22)=>`${v22}${unit}`
    })
;
var degrees = createUnitType("deg");
var percent = createUnitType("%");
var px = createUnitType("px");
var vh = createUnitType("vh");
var vw = createUnitType("vw");
var progressPercentage = Object.assign(Object.assign({}, percent), {
    parse: (v23)=>percent.parse(v23) / 100
    ,
    transform: (v24)=>percent.transform(v24 * 100)
});
var isColorString = (type, testProp)=>(v25)=>{
        return Boolean(isString(v25) && singleColorRegex.test(v25) && v25.startsWith(type) || testProp && Object.prototype.hasOwnProperty.call(v25, testProp));
    }
;
var splitColor = (aName, bName, cName)=>(v26)=>{
        if (!isString(v26)) return v26;
        const [a2, b2, c2, alpha2] = v26.match(floatRegex);
        return {
            [aName]: parseFloat(a2),
            [bName]: parseFloat(b2),
            [cName]: parseFloat(c2),
            alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
        };
    }
;
var hsla = {
    test: isColorString("hsl", "hue"),
    parse: splitColor("hue", "saturation", "lightness"),
    transform: ({ hue , saturation , lightness , alpha: alpha$1 = 1  })=>{
        return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
    }
};
var clampRgbUnit = clamp2(0, 255);
var rgbUnit = Object.assign(Object.assign({}, number), {
    transform: (v27)=>Math.round(clampRgbUnit(v27))
});
var rgba = {
    test: isColorString("rgb", "red"),
    parse: splitColor("red", "green", "blue"),
    transform: ({ red , green , blue , alpha: alpha$1 = 1  })=>"rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};
function parseHex(v28) {
    let r6 = "";
    let g6 = "";
    let b2 = "";
    let a2 = "";
    if (v28.length > 5) {
        r6 = v28.substr(1, 2);
        g6 = v28.substr(3, 2);
        b2 = v28.substr(5, 2);
        a2 = v28.substr(7, 2);
    } else {
        r6 = v28.substr(1, 1);
        g6 = v28.substr(2, 1);
        b2 = v28.substr(3, 1);
        a2 = v28.substr(4, 1);
        r6 += r6;
        g6 += g6;
        b2 += b2;
        a2 += a2;
    }
    return {
        red: parseInt(r6, 16),
        green: parseInt(g6, 16),
        blue: parseInt(b2, 16),
        alpha: a2 ? parseInt(a2, 16) / 255 : 1
    };
}
var hex = {
    test: isColorString("#"),
    parse: parseHex,
    transform: rgba.transform
};
var color = {
    test: (v29)=>rgba.test(v29) || hex.test(v29) || hsla.test(v29)
    ,
    parse: (v30)=>{
        if (rgba.test(v30)) {
            return rgba.parse(v30);
        } else if (hsla.test(v30)) {
            return hsla.parse(v30);
        } else {
            return hex.parse(v30);
        }
    },
    transform: (v31)=>{
        return isString(v31) ? v31 : v31.hasOwnProperty("red") ? rgba.transform(v31) : hsla.transform(v31);
    }
};
var colorToken = "${c}";
var numberToken = "${n}";
function test(v32) {
    var _a, _b, _c, _d;
    return isNaN(v32) && isString(v32) && ((_b = (_a = v32.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = v32.match(colorRegex)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0;
}
function analyse(v33) {
    if (typeof v33 === "number") v33 = `${v33}`;
    const values = [];
    let numColors = 0;
    const colors = v33.match(colorRegex);
    if (colors) {
        numColors = colors.length;
        v33 = v33.replace(colorRegex, colorToken);
        values.push(...colors.map(color.parse));
    }
    const numbers = v33.match(floatRegex);
    if (numbers) {
        v33 = v33.replace(floatRegex, numberToken);
        values.push(...numbers.map(number.parse));
    }
    return {
        values,
        numColors,
        tokenised: v33
    };
}
function parse(v34) {
    return analyse(v34).values;
}
function createTransformer(v35) {
    const { values , numColors , tokenised  } = analyse(v35);
    const numValues = values.length;
    return (v2)=>{
        let output = tokenised;
        for(let i16 = 0; i16 < numValues; i16++){
            output = output.replace(i16 < numColors ? colorToken : numberToken, i16 < numColors ? color.transform(v2[i16]) : sanitize(v2[i16]));
        }
        return output;
    };
}
var convertNumbersToZero = (v36)=>typeof v36 === "number" ? 0 : v36
;
function getAnimatableNone(v37) {
    const parsed = parse(v37);
    const transformer = createTransformer(v37);
    return transformer(parsed.map(convertNumbersToZero));
}
var complex = {
    test,
    parse,
    createTransformer,
    getAnimatableNone
};
var maxDefaults = new Set([
    "brightness",
    "contrast",
    "saturate",
    "opacity"
]);
function applyDefaultFilter(v38) {
    let [name, value] = v38.slice(0, -1).split("(");
    if (name === "drop-shadow") return v38;
    const [number2] = value.match(floatRegex) || [];
    if (!number2) return v38;
    const unit = value.replace(number2, "");
    let defaultValue = maxDefaults.has(name) ? 1 : 0;
    if (number2 !== value) defaultValue *= 100;
    return name + "(" + defaultValue + unit + ")";
}
var functionRegex = /([a-z-]*)\(.*?\)/g;
var filter = Object.assign(Object.assign({}, complex), {
    getAnimatableNone: (v39)=>{
        const functions = v39.match(functionRegex);
        return functions ? functions.map(applyDefaultFilter).join(" ") : v39;
    }
});
function hueToRgb(p8, q4, t10) {
    if (t10 < 0) t10 += 1;
    if (t10 > 1) t10 -= 1;
    if (t10 < 1 / 6) return p8 + (q4 - p8) * 6 * t10;
    if (t10 < 1 / 2) return q4;
    if (t10 < 2 / 3) return p8 + (q4 - p8) * (2 / 3 - t10) * 6;
    return p8;
}
function hslaToRgba({ hue , saturation , lightness , alpha: alpha2  }) {
    hue /= 360;
    saturation /= 100;
    lightness /= 100;
    let red = 0;
    let green = 0;
    let blue = 0;
    if (!saturation) {
        red = green = blue = lightness;
    } else {
        const q5 = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
        const p9 = 2 * lightness - q5;
        red = hueToRgb(p9, q5, hue + 1 / 3);
        green = hueToRgb(p9, q5, hue);
        blue = hueToRgb(p9, q5, hue - 1 / 3);
    }
    return {
        red: Math.round(red * 255),
        green: Math.round(green * 255),
        blue: Math.round(blue * 255),
        alpha: alpha2
    };
}
var mixLinearColor = (from, to, v40)=>{
    const fromExpo = from * from;
    const toExpo = to * to;
    return Math.sqrt(Math.max(0, v40 * (toExpo - fromExpo) + fromExpo));
};
var colorTypes = [
    hex,
    rgba,
    hsla
];
var getColorType = (v41)=>colorTypes.find((type)=>type.test(v41)
    )
;
var notAnimatable = (color2)=>`'${color2}' is not an animatable color. Use the equivalent color code instead.`
;
var mixColor = (from, to)=>{
    let fromColorType = getColorType(from);
    let toColorType = getColorType(to);
    invariant(!!fromColorType, notAnimatable(from));
    invariant(!!toColorType, notAnimatable(to));
    let fromColor = fromColorType.parse(from);
    let toColor = toColorType.parse(to);
    if (fromColorType === hsla) {
        fromColor = hslaToRgba(fromColor);
        fromColorType = rgba;
    }
    if (toColorType === hsla) {
        toColor = hslaToRgba(toColor);
        toColorType = rgba;
    }
    const blended = Object.assign({}, fromColor);
    return (v42)=>{
        for(const key in blended){
            if (key !== "alpha") {
                blended[key] = mixLinearColor(fromColor[key], toColor[key], v42);
            }
        }
        blended.alpha = mix(fromColor.alpha, toColor.alpha, v42);
        return fromColorType.transform(blended);
    };
};
var isNum = (v43)=>typeof v43 === "number"
;
var combineFunctions = (a2, b2)=>(v44)=>b2(a2(v44))
;
var pipe = (...transformers)=>transformers.reduce(combineFunctions)
;
function getMixer(origin, target) {
    if (isNum(origin)) {
        return (v45)=>mix(origin, target, v45)
        ;
    } else if (color.test(origin)) {
        return mixColor(origin, target);
    } else {
        return mixComplex(origin, target);
    }
}
var mixArray = (from, to)=>{
    const output = [
        ...from
    ];
    const numValues = output.length;
    const blendValue = from.map((fromThis, i17)=>getMixer(fromThis, to[i17])
    );
    return (v46)=>{
        for(let i18 = 0; i18 < numValues; i18++){
            output[i18] = blendValue[i18](v46);
        }
        return output;
    };
};
var mixObject = (origin, target)=>{
    const output = Object.assign(Object.assign({}, origin), target);
    const blendValue = {};
    for(const key1 in output){
        if (origin[key1] !== void 0 && target[key1] !== void 0) {
            blendValue[key1] = getMixer(origin[key1], target[key1]);
        }
    }
    return (v47)=>{
        for(const key in blendValue){
            output[key] = blendValue[key](v47);
        }
        return output;
    };
};
function analyse2(value) {
    const parsed = complex.parse(value);
    const numValues = parsed.length;
    let numNumbers = 0;
    let numRGB = 0;
    let numHSL = 0;
    for(let i19 = 0; i19 < numValues; i19++){
        if (numNumbers || typeof parsed[i19] === "number") {
            numNumbers++;
        } else {
            if (parsed[i19].hue !== void 0) {
                numHSL++;
            } else {
                numRGB++;
            }
        }
    }
    return {
        parsed,
        numNumbers,
        numRGB,
        numHSL
    };
}
var mixComplex = (origin, target)=>{
    const template = complex.createTransformer(target);
    const originStats = analyse2(origin);
    const targetStats = analyse2(target);
    const canInterpolate = originStats.numHSL === targetStats.numHSL && originStats.numRGB === targetStats.numRGB && originStats.numNumbers >= targetStats.numNumbers;
    if (canInterpolate) {
        return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
    } else {
        warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`);
        return (p10)=>`${p10 > 0 ? target : origin}`
        ;
    }
};
var mixNumber = (from, to)=>(p11)=>mix(from, to, p11)
;
function detectMixerFactory(v48) {
    if (typeof v48 === "number") {
        return mixNumber;
    } else if (typeof v48 === "string") {
        if (color.test(v48)) {
            return mixColor;
        } else {
            return mixComplex;
        }
    } else if (Array.isArray(v48)) {
        return mixArray;
    } else if (typeof v48 === "object") {
        return mixObject;
    }
}
function createMixers(output, ease, customMixer) {
    const mixers = [];
    const mixerFactory = customMixer || detectMixerFactory(output[0]);
    const numMixers = output.length - 1;
    for(let i20 = 0; i20 < numMixers; i20++){
        let mixer = mixerFactory(output[i20], output[i20 + 1]);
        if (ease) {
            const easingFunction = Array.isArray(ease) ? ease[i20] : ease;
            mixer = pipe(easingFunction, mixer);
        }
        mixers.push(mixer);
    }
    return mixers;
}
function fastInterpolate([from, to], [mixer]) {
    return (v49)=>mixer(progress(from, to, v49))
    ;
}
function slowInterpolate(input, mixers) {
    const inputLength = input.length;
    const lastInputIndex = inputLength - 1;
    return (v50)=>{
        let mixerIndex = 0;
        let foundMixerIndex = false;
        if (v50 <= input[0]) {
            foundMixerIndex = true;
        } else if (v50 >= input[lastInputIndex]) {
            mixerIndex = lastInputIndex - 1;
            foundMixerIndex = true;
        }
        if (!foundMixerIndex) {
            let i21 = 1;
            for(; i21 < inputLength; i21++){
                if (input[i21] > v50 || i21 === lastInputIndex) {
                    break;
                }
            }
            mixerIndex = i21 - 1;
        }
        const progressInRange = progress(input[mixerIndex], input[mixerIndex + 1], v50);
        return mixers[mixerIndex](progressInRange);
    };
}
function interpolate(input, output, { clamp: isClamp = true , ease , mixer  } = {}) {
    const inputLength = input.length;
    invariant(inputLength === output.length, "Both input and output ranges must be the same length");
    invariant(!ease || !Array.isArray(ease) || ease.length === inputLength - 1, "Array of easing functions must be of length `input.length - 1`, as it applies to the transitions **between** the defined values.");
    if (input[0] > input[inputLength - 1]) {
        input = [].concat(input);
        output = [].concat(output);
        input.reverse();
        output.reverse();
    }
    const mixers = createMixers(output, ease, mixer);
    const interpolator = inputLength === 2 ? fastInterpolate(input, mixers) : slowInterpolate(input, mixers);
    return isClamp ? (v51)=>interpolator(clamp(input[0], input[inputLength - 1], v51))
     : interpolator;
}
var reverseEasing = (easing)=>(p12)=>1 - easing(1 - p12)
;
var mirrorEasing = (easing)=>(p13)=>p13 <= 0.5 ? easing(2 * p13) / 2 : (2 - easing(2 * (1 - p13))) / 2
;
var createExpoIn = (power)=>(p14)=>Math.pow(p14, power)
;
var createBackIn = (power)=>(p15)=>p15 * p15 * ((power + 1) * p15 - power)
;
var createAnticipate = (power)=>{
    const backEasing = createBackIn(power);
    return (p16)=>(p16 *= 2) < 1 ? 0.5 * backEasing(p16) : 0.5 * (2 - Math.pow(2, -10 * (p16 - 1)))
    ;
};
var DEFAULT_OVERSHOOT_STRENGTH = 1.525;
var BOUNCE_FIRST_THRESHOLD = 4 / 11;
var BOUNCE_SECOND_THRESHOLD = 8 / 11;
var BOUNCE_THIRD_THRESHOLD = 9 / 10;
var linear = (p17)=>p17
;
var easeIn = createExpoIn(2);
var easeOut = reverseEasing(easeIn);
var easeInOut = mirrorEasing(easeIn);
var circIn = (p18)=>1 - Math.sin(Math.acos(p18))
;
var circOut = reverseEasing(circIn);
var circInOut = mirrorEasing(circOut);
var backIn = createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
var backOut = reverseEasing(backIn);
var backInOut = mirrorEasing(backIn);
var anticipate = createAnticipate(DEFAULT_OVERSHOOT_STRENGTH);
var ca = 4356 / 361;
var cb = 35442 / 1805;
var cc = 16061 / 1805;
var bounceOut = (p19)=>{
    if (p19 === 1 || p19 === 0) return p19;
    const p2 = p19 * p19;
    return p19 < BOUNCE_FIRST_THRESHOLD ? 7.5625 * p2 : p19 < BOUNCE_SECOND_THRESHOLD ? 9.075 * p2 - 9.9 * p19 + 3.4 : p19 < BOUNCE_THIRD_THRESHOLD ? ca * p2 - cb * p19 + cc : 10.8 * p19 * p19 - 20.52 * p19 + 10.72;
};
var bounceIn = reverseEasing(bounceOut);
var bounceInOut = (p20)=>p20 < 0.5 ? 0.5 * (1 - bounceOut(1 - p20 * 2)) : 0.5 * bounceOut(p20 * 2 - 1) + 0.5
;
function defaultEasing(values, easing) {
    return values.map(()=>easing || easeInOut
    ).splice(0, values.length - 1);
}
function defaultOffset(values) {
    const numValues = values.length;
    return values.map((_value, i22)=>i22 !== 0 ? i22 / (numValues - 1) : 0
    );
}
function convertOffsetToTimes(offset, duration) {
    return offset.map((o11)=>o11 * duration
    );
}
function keyframes({ from =0 , to =1 , ease , offset , duration =300  }) {
    const state = {
        done: false,
        value: from
    };
    const values = Array.isArray(to) ? to : [
        from,
        to
    ];
    const times = convertOffsetToTimes(offset && offset.length === values.length ? offset : defaultOffset(values), duration);
    function createInterpolator() {
        return interpolate(times, values, {
            ease: Array.isArray(ease) ? ease : defaultEasing(values, ease)
        });
    }
    let interpolator = createInterpolator();
    return {
        next: (t11)=>{
            state.value = interpolator(t11);
            state.done = t11 >= duration;
            return state;
        },
        flipTarget: ()=>{
            values.reverse();
            interpolator = createInterpolator();
        }
    };
}
function decay({ velocity =0 , from =0 , power =0.8 , timeConstant =350 , restDelta =0.5 , modifyTarget  }) {
    const state = {
        done: false,
        value: from
    };
    let amplitude = power * velocity;
    const ideal = from + amplitude;
    const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
    if (target !== ideal) amplitude = target - from;
    return {
        next: (t12)=>{
            const delta = -amplitude * Math.exp(-t12 / timeConstant);
            state.done = !(delta > restDelta || delta < -restDelta);
            state.value = state.done ? target : target + delta;
            return state;
        },
        flipTarget: ()=>{}
    };
}
var types = {
    keyframes,
    spring,
    decay
};
function detectAnimationFromOptions(config) {
    if (Array.isArray(config.to)) {
        return keyframes;
    } else if (types[config.type]) {
        return types[config.type];
    }
    const keys = new Set(Object.keys(config));
    if (keys.has("ease") || keys.has("duration") && !keys.has("dampingRatio")) {
        return keyframes;
    } else if (keys.has("dampingRatio") || keys.has("stiffness") || keys.has("mass") || keys.has("damping") || keys.has("restSpeed") || keys.has("restDelta")) {
        return spring;
    }
    return keyframes;
}
function loopElapsed(elapsed, duration, delay = 0) {
    return elapsed - duration - delay;
}
function reverseElapsed(elapsed, duration, delay = 0, isForwardPlayback = true) {
    return isForwardPlayback ? loopElapsed(duration + -elapsed, duration, delay) : duration - (elapsed - duration) + delay;
}
function hasRepeatDelayElapsed(elapsed, duration, delay, isForwardPlayback) {
    return isForwardPlayback ? elapsed >= duration + delay : elapsed <= -delay;
}
var framesync = (update)=>{
    const passTimestamp = ({ delta  })=>update(delta)
    ;
    return {
        start: ()=>es_default.update(passTimestamp, true)
        ,
        stop: ()=>cancelSync.update(passTimestamp)
    };
};
function animate(_a) {
    var _b, _c;
    var { from , autoplay =true , driver =framesync , elapsed =0 , repeat: repeatMax = 0 , repeatType ="loop" , repeatDelay =0 , onPlay , onStop , onComplete , onRepeat , onUpdate  } = _a, options = __rest(_a, [
        "from",
        "autoplay",
        "driver",
        "elapsed",
        "repeat",
        "repeatType",
        "repeatDelay",
        "onPlay",
        "onStop",
        "onComplete",
        "onRepeat",
        "onUpdate"
    ]);
    let { to  } = options;
    let driverControls;
    let repeatCount = 0;
    let computedDuration = options.duration;
    let latest;
    let isComplete = false;
    let isForwardPlayback = true;
    let interpolateFromNumber;
    const animator = detectAnimationFromOptions(options);
    if ((_c = (_b = animator).needsInterpolation) === null || _c === void 0 ? void 0 : _c.call(_b, from, to)) {
        interpolateFromNumber = interpolate([
            0,
            100
        ], [
            from,
            to
        ], {
            clamp: false
        });
        from = 0;
        to = 100;
    }
    const animation = animator(Object.assign(Object.assign({}, options), {
        from,
        to
    }));
    function repeat() {
        repeatCount++;
        if (repeatType === "reverse") {
            isForwardPlayback = repeatCount % 2 === 0;
            elapsed = reverseElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback);
        } else {
            elapsed = loopElapsed(elapsed, computedDuration, repeatDelay);
            if (repeatType === "mirror") animation.flipTarget();
        }
        isComplete = false;
        onRepeat && onRepeat();
    }
    function complete() {
        driverControls.stop();
        onComplete && onComplete();
    }
    function update(delta) {
        if (!isForwardPlayback) delta = -delta;
        elapsed += delta;
        if (!isComplete) {
            const state = animation.next(Math.max(0, elapsed));
            latest = state.value;
            if (interpolateFromNumber) latest = interpolateFromNumber(latest);
            isComplete = isForwardPlayback ? state.done : elapsed <= 0;
        }
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(latest);
        if (isComplete) {
            if (repeatCount === 0) computedDuration !== null && computedDuration !== void 0 ? computedDuration : computedDuration = elapsed;
            if (repeatCount < repeatMax) {
                hasRepeatDelayElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback) && repeat();
            } else {
                complete();
            }
        }
    }
    function play() {
        onPlay === null || onPlay === void 0 ? void 0 : onPlay();
        driverControls = driver(update);
        driverControls.start();
    }
    autoplay && play();
    return {
        stop: ()=>{
            onStop === null || onStop === void 0 ? void 0 : onStop();
            driverControls.stop();
        }
    };
}
function velocityPerSecond(velocity, frameDuration) {
    return frameDuration ? velocity * (1000 / frameDuration) : 0;
}
function inertia({ from =0 , velocity =0 , min , max , power =0.8 , timeConstant =750 , bounceStiffness =500 , bounceDamping =10 , restDelta =1 , modifyTarget , driver , onUpdate , onComplete , onStop  }) {
    let currentAnimation;
    function isOutOfBounds(v52) {
        return min !== void 0 && v52 < min || max !== void 0 && v52 > max;
    }
    function boundaryNearest(v53) {
        if (min === void 0) return max;
        if (max === void 0) return min;
        return Math.abs(min - v53) < Math.abs(max - v53) ? min : max;
    }
    function startAnimation2(options) {
        currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
        currentAnimation = animate(Object.assign(Object.assign({}, options), {
            driver,
            onUpdate: (v54)=>{
                var _a;
                onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(v54);
                (_a = options.onUpdate) === null || _a === void 0 ? void 0 : _a.call(options, v54);
            },
            onComplete,
            onStop
        }));
    }
    function startSpring(options) {
        startAnimation2(Object.assign({
            type: "spring",
            stiffness: bounceStiffness,
            damping: bounceDamping,
            restDelta
        }, options));
    }
    if (isOutOfBounds(from)) {
        startSpring({
            from,
            velocity,
            to: boundaryNearest(from)
        });
    } else {
        let target = power * velocity + from;
        if (typeof modifyTarget !== "undefined") target = modifyTarget(target);
        const boundary = boundaryNearest(target);
        const heading = boundary === min ? -1 : 1;
        let prev;
        let current;
        const checkBoundary = (v55)=>{
            prev = current;
            current = v55;
            velocity = velocityPerSecond(v55 - prev, getFrameData().delta);
            if (heading === 1 && v55 > boundary || heading === -1 && v55 < boundary) {
                startSpring({
                    from: v55,
                    to: boundary,
                    velocity
                });
            }
        };
        startAnimation2({
            type: "decay",
            from,
            velocity,
            timeConstant,
            power,
            restDelta,
            modifyTarget,
            onUpdate: isOutOfBounds(target) ? checkBoundary : void 0
        });
    }
    return {
        stop: ()=>currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop()
    };
}
var isPoint = (point)=>point.hasOwnProperty("x") && point.hasOwnProperty("y")
;
var isPoint3D = (point)=>isPoint(point) && point.hasOwnProperty("z")
;
var distance1D = (a2, b2)=>Math.abs(a2 - b2)
;
function distance(a2, b2) {
    if (isNum(a2) && isNum(b2)) {
        return distance1D(a2, b2);
    } else if (isPoint(a2) && isPoint(b2)) {
        const xDelta = distance1D(a2.x, b2.x);
        const yDelta = distance1D(a2.y, b2.y);
        const zDelta = isPoint3D(a2) && isPoint3D(b2) ? distance1D(a2.z, b2.z) : 0;
        return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2) + Math.pow(zDelta, 2));
    }
}
var a2 = (a11, a21)=>1 - 3 * a21 + 3 * a11
;
var b1 = (a12, a22)=>3 * a22 - 6 * a12
;
var c2 = (a13)=>3 * a13
;
var calcBezier = (t13, a14, a23)=>((a2(a14, a23) * t13 + b1(a14, a23)) * t13 + c2(a14)) * t13
;
var getSlope = (t14, a15, a24)=>3 * a2(a15, a24) * t14 * t14 + 2 * b1(a15, a24) * t14 + c2(a15)
;
var subdivisionPrecision = 0.0000001;
var subdivisionMaxIterations = 10;
function binarySubdivide(aX, aA, aB, mX1, mX2) {
    let currentX;
    let currentT;
    let i23 = 0;
    do {
        currentT = aA + (aB - aA) / 2;
        currentX = calcBezier(currentT, mX1, mX2) - aX;
        if (currentX > 0) {
            aB = currentT;
        } else {
            aA = currentT;
        }
    }while (Math.abs(currentX) > subdivisionPrecision && ++i23 < subdivisionMaxIterations)
    return currentT;
}
var newtonIterations = 8;
var newtonMinSlope = 0.001;
function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for(let i24 = 0; i24 < newtonIterations; ++i24){
        const currentSlope = getSlope(aGuessT, mX1, mX2);
        if (currentSlope === 0) {
            return aGuessT;
        }
        const currentX = calcBezier(aGuessT, mX1, mX2) - aX;
        aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
}
var kSplineTableSize = 11;
var kSampleStepSize = 1 / (kSplineTableSize - 1);
function cubicBezier(mX1, mY1, mX2, mY2) {
    if (mX1 === mY1 && mX2 === mY2) return linear;
    const sampleValues = new Float32Array(kSplineTableSize);
    for(let i25 = 0; i25 < kSplineTableSize; ++i25){
        sampleValues[i25] = calcBezier(i25 * kSampleStepSize, mX1, mX2);
    }
    function getTForX(aX) {
        let intervalStart = 0;
        let currentSample = 1;
        const lastSample = kSplineTableSize - 1;
        for(; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample){
            intervalStart += kSampleStepSize;
        }
        --currentSample;
        const dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
        const guessForT = intervalStart + dist * kSampleStepSize;
        const initialSlope = getSlope(guessForT, mX1, mX2);
        if (initialSlope >= newtonMinSlope) {
            return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
        } else if (initialSlope === 0) {
            return guessForT;
        } else {
            return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
        }
    }
    return (t15)=>t15 === 0 || t15 === 1 ? t15 : calcBezier(getTForX(t15), mY1, mY2)
    ;
}
function addUniqueItem(arr, item) {
    arr.indexOf(item) === -1 && arr.push(item);
}
function removeItem(arr, item) {
    var index = arr.indexOf(item);
    index > -1 && arr.splice(index, 1);
}
var SubscriptionManager = function() {
    function SubscriptionManager2() {
        this.subscriptions = [];
    }
    SubscriptionManager2.prototype.add = function(handler) {
        var _this = this;
        addUniqueItem(this.subscriptions, handler);
        return function() {
            return removeItem(_this.subscriptions, handler);
        };
    };
    SubscriptionManager2.prototype.notify = function(a25, b2, c21) {
        var numSubscriptions = this.subscriptions.length;
        if (!numSubscriptions) return;
        if (numSubscriptions === 1) {
            this.subscriptions[0](a25, b2, c21);
        } else {
            for(var i26 = 0; i26 < numSubscriptions; i26++){
                var handler = this.subscriptions[i26];
                handler && handler(a25, b2, c21);
            }
        }
    };
    SubscriptionManager2.prototype.getSize = function() {
        return this.subscriptions.length;
    };
    SubscriptionManager2.prototype.clear = function() {
        this.subscriptions.length = 0;
    };
    return SubscriptionManager2;
}();
var isFloat = function(value) {
    return !isNaN(parseFloat(value));
};
var MotionValue = function() {
    function MotionValue2(init) {
        var _this = this;
        this.timeDelta = 0;
        this.lastUpdated = 0;
        this.updateSubscribers = new SubscriptionManager();
        this.velocityUpdateSubscribers = new SubscriptionManager();
        this.renderSubscribers = new SubscriptionManager();
        this.canTrackVelocity = false;
        this.updateAndNotify = function(v56, render) {
            if (render === void 0) {
                render = true;
            }
            _this.prev = _this.current;
            _this.current = v56;
            var _a = getFrameData(), delta = _a.delta, timestamp = _a.timestamp;
            if (_this.lastUpdated !== timestamp) {
                _this.timeDelta = delta;
                _this.lastUpdated = timestamp;
                es_default.postRender(_this.scheduleVelocityCheck);
            }
            if (_this.prev !== _this.current) {
                _this.updateSubscribers.notify(_this.current);
            }
            if (_this.velocityUpdateSubscribers.getSize()) {
                _this.velocityUpdateSubscribers.notify(_this.getVelocity());
            }
            if (render) {
                _this.renderSubscribers.notify(_this.current);
            }
        };
        this.scheduleVelocityCheck = function() {
            return es_default.postRender(_this.velocityCheck);
        };
        this.velocityCheck = function(_a) {
            var timestamp = _a.timestamp;
            if (timestamp !== _this.lastUpdated) {
                _this.prev = _this.current;
                _this.velocityUpdateSubscribers.notify(_this.getVelocity());
            }
        };
        this.hasAnimated = false;
        this.prev = this.current = init;
        this.canTrackVelocity = isFloat(this.current);
    }
    MotionValue2.prototype.onChange = function(subscription) {
        return this.updateSubscribers.add(subscription);
    };
    MotionValue2.prototype.clearListeners = function() {
        this.updateSubscribers.clear();
    };
    MotionValue2.prototype.onRenderRequest = function(subscription) {
        subscription(this.get());
        return this.renderSubscribers.add(subscription);
    };
    MotionValue2.prototype.attach = function(passiveEffect) {
        this.passiveEffect = passiveEffect;
    };
    MotionValue2.prototype.set = function(v57, render) {
        if (render === void 0) {
            render = true;
        }
        if (!render || !this.passiveEffect) {
            this.updateAndNotify(v57, render);
        } else {
            this.passiveEffect(v57, this.updateAndNotify);
        }
    };
    MotionValue2.prototype.get = function() {
        return this.current;
    };
    MotionValue2.prototype.getPrevious = function() {
        return this.prev;
    };
    MotionValue2.prototype.getVelocity = function() {
        return this.canTrackVelocity ? velocityPerSecond(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta) : 0;
    };
    MotionValue2.prototype.start = function(animation) {
        var _this = this;
        this.stop();
        return new Promise(function(resolve) {
            _this.hasAnimated = true;
            _this.stopAnimation = animation(resolve);
        }).then(function() {
            return _this.clearAnimation();
        });
    };
    MotionValue2.prototype.stop = function() {
        if (this.stopAnimation) this.stopAnimation();
        this.clearAnimation();
    };
    MotionValue2.prototype.isAnimating = function() {
        return !!this.stopAnimation;
    };
    MotionValue2.prototype.clearAnimation = function() {
        this.stopAnimation = null;
    };
    MotionValue2.prototype.destroy = function() {
        this.updateSubscribers.clear();
        this.renderSubscribers.clear();
        this.stop();
    };
    return MotionValue2;
}();
function motionValue(init) {
    return new MotionValue(init);
}
var isMotionValue = function(value) {
    return Boolean(value !== null && typeof value === "object" && value.getVelocity);
};
var secondsToMilliseconds = function(seconds) {
    return seconds * 1000;
};
var easingLookup = {
    linear,
    easeIn,
    easeInOut,
    easeOut,
    circIn,
    circInOut,
    circOut,
    backIn,
    backInOut,
    backOut,
    anticipate,
    bounceIn,
    bounceInOut,
    bounceOut
};
var easingDefinitionToFunction = function(definition) {
    if (Array.isArray(definition)) {
        invariant(definition.length === 4, "Cubic bezier arrays must contain four numerical values.");
        var _a = __read(definition, 4), x11 = _a[0], y11 = _a[1], x21 = _a[2], y2 = _a[3];
        return cubicBezier(x11, y11, x21, y2);
    } else if (typeof definition === "string") {
        invariant(easingLookup[definition] !== void 0, "Invalid easing type '".concat(definition, "'"));
        return easingLookup[definition];
    }
    return definition;
};
var isEasingArray = function(ease) {
    return Array.isArray(ease) && typeof ease[0] !== "number";
};
var isAnimatable = function(key, value) {
    if (key === "zIndex") return false;
    if (typeof value === "number" || Array.isArray(value)) return true;
    if (typeof value === "string" && complex.test(value) && !value.startsWith("url(")) {
        return true;
    }
    return false;
};
var isKeyframesTarget = function(v58) {
    return Array.isArray(v58);
};
var underDampedSpring = function() {
    return {
        type: "spring",
        stiffness: 500,
        damping: 25,
        restSpeed: 10
    };
};
var criticallyDampedSpring = function(to) {
    return {
        type: "spring",
        stiffness: 550,
        damping: to === 0 ? 2 * Math.sqrt(550) : 30,
        restSpeed: 10
    };
};
var linearTween = function() {
    return {
        type: "keyframes",
        ease: "linear",
        duration: 0.3
    };
};
var keyframes2 = function(values) {
    return {
        type: "keyframes",
        duration: 0.8,
        values
    };
};
var defaultTransitions = {
    x: underDampedSpring,
    y: underDampedSpring,
    z: underDampedSpring,
    rotate: underDampedSpring,
    rotateX: underDampedSpring,
    rotateY: underDampedSpring,
    rotateZ: underDampedSpring,
    scaleX: criticallyDampedSpring,
    scaleY: criticallyDampedSpring,
    scale: criticallyDampedSpring,
    opacity: linearTween,
    backgroundColor: linearTween,
    color: linearTween,
    default: criticallyDampedSpring
};
var getDefaultTransition = function(valueKey, to) {
    var transitionFactory;
    if (isKeyframesTarget(to)) {
        transitionFactory = keyframes2;
    } else {
        transitionFactory = defaultTransitions[valueKey] || defaultTransitions.default;
    }
    return __assign({
        to
    }, transitionFactory(to));
};
var __int = __assign(__assign({}, number), {
    transform: Math.round
});
var numberValueTypes = {
    borderWidth: px,
    borderTopWidth: px,
    borderRightWidth: px,
    borderBottomWidth: px,
    borderLeftWidth: px,
    borderRadius: px,
    radius: px,
    borderTopLeftRadius: px,
    borderTopRightRadius: px,
    borderBottomRightRadius: px,
    borderBottomLeftRadius: px,
    width: px,
    maxWidth: px,
    height: px,
    maxHeight: px,
    size: px,
    top: px,
    right: px,
    bottom: px,
    left: px,
    padding: px,
    paddingTop: px,
    paddingRight: px,
    paddingBottom: px,
    paddingLeft: px,
    margin: px,
    marginTop: px,
    marginRight: px,
    marginBottom: px,
    marginLeft: px,
    rotate: degrees,
    rotateX: degrees,
    rotateY: degrees,
    rotateZ: degrees,
    scale,
    scaleX: scale,
    scaleY: scale,
    scaleZ: scale,
    skew: degrees,
    skewX: degrees,
    skewY: degrees,
    distance: px,
    translateX: px,
    translateY: px,
    translateZ: px,
    x: px,
    y: px,
    z: px,
    perspective: px,
    transformPerspective: px,
    opacity: alpha,
    originX: progressPercentage,
    originY: progressPercentage,
    originZ: px,
    zIndex: __int,
    fillOpacity: alpha,
    strokeOpacity: alpha,
    numOctaves: __int
};
var defaultValueTypes = __assign(__assign({}, numberValueTypes), {
    color,
    backgroundColor: color,
    outlineColor: color,
    fill: color,
    stroke: color,
    borderColor: color,
    borderTopColor: color,
    borderRightColor: color,
    borderBottomColor: color,
    borderLeftColor: color,
    filter,
    WebkitFilter: filter
});
var getDefaultValueType = function(key) {
    return defaultValueTypes[key];
};
function getAnimatableNone2(key, value) {
    var _a;
    var defaultValueType = getDefaultValueType(key);
    if (defaultValueType !== filter) defaultValueType = complex;
    return (_a = defaultValueType.getAnimatableNone) === null || _a === void 0 ? void 0 : _a.call(defaultValueType, value);
}
var instantAnimationState = {
    current: false
};
var isCustomValue = function(v59) {
    return Boolean(v59 && typeof v59 === "object" && v59.mix && v59.toValue);
};
var resolveFinalValueInKeyframes = function(v60) {
    return isKeyframesTarget(v60) ? v60[v60.length - 1] || 0 : v60;
};
function isTransitionDefined(_a) {
    _a.when;
    _a.delay;
    _a.delayChildren;
    _a.staggerChildren;
    _a.staggerDirection;
    _a.repeat;
    _a.repeatType;
    _a.repeatDelay;
    _a.from;
    var transition = __rest(_a, [
        "when",
        "delay",
        "delayChildren",
        "staggerChildren",
        "staggerDirection",
        "repeat",
        "repeatType",
        "repeatDelay",
        "from"
    ]);
    return !!Object.keys(transition).length;
}
var legacyRepeatWarning = false;
function convertTransitionToAnimationOptions(_a) {
    var ease = _a.ease, times = _a.times, yoyo = _a.yoyo, flip = _a.flip, loop = _a.loop, transition = __rest(_a, [
        "ease",
        "times",
        "yoyo",
        "flip",
        "loop"
    ]);
    var options = __assign({}, transition);
    if (times) options["offset"] = times;
    if (transition.duration) options["duration"] = secondsToMilliseconds(transition.duration);
    if (transition.repeatDelay) options.repeatDelay = secondsToMilliseconds(transition.repeatDelay);
    if (ease) {
        options["ease"] = isEasingArray(ease) ? ease.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease);
    }
    if (transition.type === "tween") options.type = "keyframes";
    if (yoyo || loop || flip) {
        warning(!legacyRepeatWarning, "yoyo, loop and flip have been removed from the API. Replace with repeat and repeatType options.");
        legacyRepeatWarning = true;
        if (yoyo) {
            options.repeatType = "reverse";
        } else if (loop) {
            options.repeatType = "loop";
        } else if (flip) {
            options.repeatType = "mirror";
        }
        options.repeat = loop || yoyo || flip || transition.repeat;
    }
    if (transition.type !== "spring") options.type = "keyframes";
    return options;
}
function getDelayFromTransition(transition, key) {
    var _a, _b;
    var valueTransition = getValueTransition(transition, key) || {};
    return (_b = (_a = valueTransition.delay) !== null && _a !== void 0 ? _a : transition.delay) !== null && _b !== void 0 ? _b : 0;
}
function hydrateKeyframes(options) {
    if (Array.isArray(options.to) && options.to[0] === null) {
        options.to = __spreadArray([], __read(options.to), false);
        options.to[0] = options.from;
    }
    return options;
}
function getPopmotionAnimationOptions(transition, options, key) {
    var _a;
    if (Array.isArray(options.to)) {
        (_a = transition.duration) !== null && _a !== void 0 ? _a : transition.duration = 0.8;
    }
    hydrateKeyframes(options);
    if (!isTransitionDefined(transition)) {
        transition = __assign(__assign({}, transition), getDefaultTransition(key, options.to));
    }
    return __assign(__assign({}, options), convertTransitionToAnimationOptions(transition));
}
function getAnimation(key, value, target, transition, onComplete) {
    var _a;
    var valueTransition = getValueTransition(transition, key);
    var origin = (_a = valueTransition.from) !== null && _a !== void 0 ? _a : value.get();
    var isTargetAnimatable = isAnimatable(key, target);
    if (origin === "none" && isTargetAnimatable && typeof target === "string") {
        origin = getAnimatableNone2(key, target);
    } else if (isZero(origin) && typeof target === "string") {
        origin = getZeroUnit(target);
    } else if (!Array.isArray(target) && isZero(target) && typeof origin === "string") {
        target = getZeroUnit(origin);
    }
    var isOriginAnimatable = isAnimatable(key, origin);
    warning(isOriginAnimatable === isTargetAnimatable, "You are trying to animate ".concat(key, ' from "').concat(origin, '" to "').concat(target, '". ').concat(origin, " is not an animatable value - to enable this animation set ").concat(origin, " to a value animatable to ").concat(target, " via the `style` property."));
    function start() {
        var options = {
            from: origin,
            to: target,
            velocity: value.getVelocity(),
            onComplete,
            onUpdate: function(v61) {
                return value.set(v61);
            }
        };
        return valueTransition.type === "inertia" || valueTransition.type === "decay" ? inertia(__assign(__assign({}, options), valueTransition)) : animate(__assign(__assign({}, getPopmotionAnimationOptions(valueTransition, options, key)), {
            onUpdate: function(v62) {
                var _a2;
                options.onUpdate(v62);
                (_a2 = valueTransition.onUpdate) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition, v62);
            },
            onComplete: function() {
                var _a2;
                options.onComplete();
                (_a2 = valueTransition.onComplete) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition);
            }
        }));
    }
    function set() {
        var _a2, _b;
        var finalTarget = resolveFinalValueInKeyframes(target);
        value.set(finalTarget);
        onComplete();
        (_a2 = valueTransition === null || valueTransition === void 0 ? void 0 : valueTransition.onUpdate) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition, finalTarget);
        (_b = valueTransition === null || valueTransition === void 0 ? void 0 : valueTransition.onComplete) === null || _b === void 0 ? void 0 : _b.call(valueTransition);
        return {
            stop: function() {}
        };
    }
    return !isOriginAnimatable || !isTargetAnimatable || valueTransition.type === false ? set : start;
}
function isZero(value) {
    return value === 0 || typeof value === "string" && parseFloat(value) === 0 && value.indexOf(" ") === -1;
}
function getZeroUnit(potentialUnitType) {
    return typeof potentialUnitType === "number" ? 0 : getAnimatableNone2("", potentialUnitType);
}
function getValueTransition(transition, key) {
    return transition[key] || transition["default"] || transition;
}
function startAnimation(key, value, target, transition) {
    if (transition === void 0) {
        transition = {};
    }
    if (instantAnimationState.current) {
        transition = {
            type: false
        };
    }
    return value.start(function(onComplete) {
        var delayTimer;
        var controls;
        var animation = getAnimation(key, value, target, transition, onComplete);
        var delay = getDelayFromTransition(transition, key);
        var start = function() {
            return controls = animation();
        };
        if (delay) {
            delayTimer = window.setTimeout(start, secondsToMilliseconds(delay));
        } else {
            start();
        }
        return function() {
            clearTimeout(delayTimer);
            controls === null || controls === void 0 ? void 0 : controls.stop();
        };
    });
}
function animate2(from, to, transition) {
    if (transition === void 0) {
        transition = {};
    }
    var value = isMotionValue(from) ? from : motionValue(from);
    startAnimation("", value, to, transition);
    return {
        stop: function() {
            return value.stop();
        },
        isAnimating: function() {
            return value.isAnimating();
        }
    };
}
var borders = [
    "TopLeft",
    "TopRight",
    "BottomLeft",
    "BottomRight"
];
var numBorders = borders.length;
var asNumber = function(value) {
    return typeof value === "string" ? parseFloat(value) : value;
};
var isPx = function(value) {
    return typeof value === "number" || px.test(value);
};
function mixValues(target, follow, lead, progress2, shouldCrossfadeOpacity, isOnlyMember) {
    var _a, _b, _c, _d;
    if (shouldCrossfadeOpacity) {
        target.opacity = mix(0, (_a = lead.opacity) !== null && _a !== void 0 ? _a : 1, easeCrossfadeIn(progress2));
        target.opacityExit = mix((_b = follow.opacity) !== null && _b !== void 0 ? _b : 1, 0, easeCrossfadeOut(progress2));
    } else if (isOnlyMember) {
        target.opacity = mix((_c = follow.opacity) !== null && _c !== void 0 ? _c : 1, (_d = lead.opacity) !== null && _d !== void 0 ? _d : 1, progress2);
    }
    for(var i27 = 0; i27 < numBorders; i27++){
        var borderLabel = "border".concat(borders[i27], "Radius");
        var followRadius = getRadius(follow, borderLabel);
        var leadRadius = getRadius(lead, borderLabel);
        if (followRadius === void 0 && leadRadius === void 0) continue;
        followRadius || (followRadius = 0);
        leadRadius || (leadRadius = 0);
        var canMix = followRadius === 0 || leadRadius === 0 || isPx(followRadius) === isPx(leadRadius);
        if (canMix) {
            target[borderLabel] = Math.max(mix(asNumber(followRadius), asNumber(leadRadius), progress2), 0);
            if (percent.test(leadRadius) || percent.test(followRadius)) {
                target[borderLabel] += "%";
            }
        } else {
            target[borderLabel] = leadRadius;
        }
    }
    if (follow.rotate || lead.rotate) {
        target.rotate = mix(follow.rotate || 0, lead.rotate || 0, progress2);
    }
}
function getRadius(values, radiusName) {
    var _a;
    return (_a = values[radiusName]) !== null && _a !== void 0 ? _a : values.borderRadius;
}
var easeCrossfadeIn = compress(0, 0.5, circOut);
var easeCrossfadeOut = compress(0.5, 0.95, linear);
function compress(min, max, easing) {
    return function(p21) {
        if (p21 < min) return 0;
        if (p21 > max) return 1;
        return easing(progress(min, max, p21));
    };
}
function copyAxisInto(axis, originAxis) {
    axis.min = originAxis.min;
    axis.max = originAxis.max;
}
function copyBoxInto(box, originBox) {
    copyAxisInto(box.x, originBox.x);
    copyAxisInto(box.y, originBox.y);
}
function isIdentityScale(scale2) {
    return scale2 === void 0 || scale2 === 1;
}
function hasScale(_a) {
    var scale2 = _a.scale, scaleX = _a.scaleX, scaleY = _a.scaleY;
    return !isIdentityScale(scale2) || !isIdentityScale(scaleX) || !isIdentityScale(scaleY);
}
function hasTransform(values) {
    return hasScale(values) || hasTranslate(values.x) || hasTranslate(values.y) || values.z || values.rotate || values.rotateX || values.rotateY;
}
function hasTranslate(value) {
    return value && value !== "0%";
}
function scalePoint(point, scale2, originPoint) {
    var distanceFromOrigin = point - originPoint;
    var scaled = scale2 * distanceFromOrigin;
    return originPoint + scaled;
}
function applyPointDelta(point, translate, scale2, originPoint, boxScale) {
    if (boxScale !== void 0) {
        point = scalePoint(point, boxScale, originPoint);
    }
    return scalePoint(point, scale2, originPoint) + translate;
}
function applyAxisDelta(axis, translate, scale2, originPoint, boxScale) {
    if (translate === void 0) {
        translate = 0;
    }
    if (scale2 === void 0) {
        scale2 = 1;
    }
    axis.min = applyPointDelta(axis.min, translate, scale2, originPoint, boxScale);
    axis.max = applyPointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function applyBoxDelta(box, _a) {
    var x5 = _a.x, y3 = _a.y;
    applyAxisDelta(box.x, x5.translate, x5.scale, x5.originPoint);
    applyAxisDelta(box.y, y3.translate, y3.scale, y3.originPoint);
}
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition) {
    var _a, _b;
    if (isSharedTransition === void 0) {
        isSharedTransition = false;
    }
    var treeLength = treePath.length;
    if (!treeLength) return;
    treeScale.x = treeScale.y = 1;
    var node;
    var delta;
    for(var i28 = 0; i28 < treeLength; i28++){
        node = treePath[i28];
        delta = node.projectionDelta;
        if (((_b = (_a = node.instance) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.display) === "contents") continue;
        if (isSharedTransition && node.options.layoutScroll && node.scroll && node !== node.root) {
            transformBox(box, {
                x: -node.scroll.x,
                y: -node.scroll.y
            });
        }
        if (delta) {
            treeScale.x *= delta.x.scale;
            treeScale.y *= delta.y.scale;
            applyBoxDelta(box, delta);
        }
        if (isSharedTransition && hasTransform(node.latestValues)) {
            transformBox(box, node.latestValues);
        }
    }
}
function translateAxis(axis, distance2) {
    axis.min = axis.min + distance2;
    axis.max = axis.max + distance2;
}
function transformAxis(axis, transforms, _a) {
    var _b = __read(_a, 3), key = _b[0], scaleKey = _b[1], originKey = _b[2];
    var axisOrigin = transforms[originKey] !== void 0 ? transforms[originKey] : 0.5;
    var originPoint = mix(axis.min, axis.max, axisOrigin);
    applyAxisDelta(axis, transforms[key], transforms[scaleKey], originPoint, transforms.scale);
}
var xKeys = [
    "x",
    "scaleX",
    "originX"
];
var yKeys = [
    "y",
    "scaleY",
    "originY"
];
function transformBox(box, transform) {
    transformAxis(box.x, transform, xKeys);
    transformAxis(box.y, transform, yKeys);
}
function calcLength(axis) {
    return axis.max - axis.min;
}
function isNear(value, target, maxDistance) {
    if (target === void 0) {
        target = 0;
    }
    if (maxDistance === void 0) {
        maxDistance = 0.01;
    }
    return distance(value, target) < maxDistance;
}
function calcAxisDelta(delta, source, target, origin) {
    if (origin === void 0) {
        origin = 0.5;
    }
    delta.origin = origin;
    delta.originPoint = mix(source.min, source.max, delta.origin);
    delta.scale = calcLength(target) / calcLength(source);
    if (isNear(delta.scale, 1, 0.0001) || isNaN(delta.scale)) delta.scale = 1;
    delta.translate = mix(target.min, target.max, delta.origin) - delta.originPoint;
    if (isNear(delta.translate) || isNaN(delta.translate)) delta.translate = 0;
}
function calcBoxDelta(delta, source, target, origin) {
    calcAxisDelta(delta.x, source.x, target.x, origin === null || origin === void 0 ? void 0 : origin.originX);
    calcAxisDelta(delta.y, source.y, target.y, origin === null || origin === void 0 ? void 0 : origin.originY);
}
function calcRelativeAxis(target, relative, parent) {
    target.min = parent.min + relative.min;
    target.max = target.min + calcLength(relative);
}
function calcRelativeBox(target, relative, parent) {
    calcRelativeAxis(target.x, relative.x, parent.x);
    calcRelativeAxis(target.y, relative.y, parent.y);
}
function calcRelativeAxisPosition(target, layout, parent) {
    target.min = layout.min - parent.min;
    target.max = target.min + calcLength(layout);
}
function calcRelativePosition(target, layout, parent) {
    calcRelativeAxisPosition(target.x, layout.x, parent.x);
    calcRelativeAxisPosition(target.y, layout.y, parent.y);
}
function removePointDelta(point, translate, scale2, originPoint, boxScale) {
    point -= translate;
    point = scalePoint(point, 1 / scale2, originPoint);
    if (boxScale !== void 0) {
        point = scalePoint(point, 1 / boxScale, originPoint);
    }
    return point;
}
function removeAxisDelta(axis, translate, scale2, origin, boxScale, originAxis, sourceAxis) {
    if (translate === void 0) {
        translate = 0;
    }
    if (scale2 === void 0) {
        scale2 = 1;
    }
    if (origin === void 0) {
        origin = 0.5;
    }
    if (originAxis === void 0) {
        originAxis = axis;
    }
    if (sourceAxis === void 0) {
        sourceAxis = axis;
    }
    if (percent.test(translate)) {
        translate = parseFloat(translate);
        var relativeProgress = mix(sourceAxis.min, sourceAxis.max, translate / 100);
        translate = relativeProgress - sourceAxis.min;
    }
    if (typeof translate !== "number") return;
    var originPoint = mix(originAxis.min, originAxis.max, origin);
    if (axis === originAxis) originPoint -= translate;
    axis.min = removePointDelta(axis.min, translate, scale2, originPoint, boxScale);
    axis.max = removePointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function removeAxisTransforms(axis, transforms, _a, origin, sourceAxis) {
    var _b = __read(_a, 3), key = _b[0], scaleKey = _b[1], originKey = _b[2];
    removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale, origin, sourceAxis);
}
var xKeys2 = [
    "x",
    "scaleX",
    "originX"
];
var yKeys2 = [
    "y",
    "scaleY",
    "originY"
];
function removeBoxTransforms(box, transforms, originBox, sourceBox) {
    removeAxisTransforms(box.x, transforms, xKeys2, originBox === null || originBox === void 0 ? void 0 : originBox.x, sourceBox === null || sourceBox === void 0 ? void 0 : sourceBox.x);
    removeAxisTransforms(box.y, transforms, yKeys2, originBox === null || originBox === void 0 ? void 0 : originBox.y, sourceBox === null || sourceBox === void 0 ? void 0 : sourceBox.y);
}
var createAxisDelta = function() {
    return {
        translate: 0,
        scale: 1,
        origin: 0,
        originPoint: 0
    };
};
var createDelta = function() {
    return {
        x: createAxisDelta(),
        y: createAxisDelta()
    };
};
var createAxis = function() {
    return {
        min: 0,
        max: 0
    };
};
var createBox = function() {
    return {
        x: createAxis(),
        y: createAxis()
    };
};
function isAxisDeltaZero(delta) {
    return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero(delta) {
    return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
function boxEquals(a26, b2) {
    return a26.x.min === b2.x.min && a26.x.max === b2.x.max && a26.y.min === b2.y.min && a26.y.max === b2.y.max;
}
var NodeStack = function() {
    function NodeStack2() {
        this.members = [];
    }
    NodeStack2.prototype.add = function(node) {
        addUniqueItem(this.members, node);
        node.scheduleRender();
    };
    NodeStack2.prototype.remove = function(node) {
        removeItem(this.members, node);
        if (node === this.prevLead) {
            this.prevLead = void 0;
        }
        if (node === this.lead) {
            var prevLead = this.members[this.members.length - 1];
            if (prevLead) {
                this.promote(prevLead);
            }
        }
    };
    NodeStack2.prototype.relegate = function(node) {
        var indexOfNode = this.members.findIndex(function(member2) {
            return node === member2;
        });
        if (indexOfNode === 0) return false;
        var prevLead;
        for(var i29 = indexOfNode; i29 >= 0; i29--){
            var member = this.members[i29];
            if (member.isPresent !== false) {
                prevLead = member;
                break;
            }
        }
        if (prevLead) {
            this.promote(prevLead);
            return true;
        } else {
            return false;
        }
    };
    NodeStack2.prototype.promote = function(node, preserveFollowOpacity) {
        var _a;
        var prevLead = this.lead;
        if (node === prevLead) return;
        this.prevLead = prevLead;
        this.lead = node;
        node.show();
        if (prevLead) {
            prevLead.instance && prevLead.scheduleRender();
            node.scheduleRender();
            node.resumeFrom = prevLead;
            if (preserveFollowOpacity) {
                node.resumeFrom.preserveOpacity = true;
            }
            if (prevLead.snapshot) {
                node.snapshot = prevLead.snapshot;
                node.snapshot.latestValues = prevLead.animationValues || prevLead.latestValues;
                node.snapshot.isShared = true;
            }
            if ((_a = node.root) === null || _a === void 0 ? void 0 : _a.isUpdating) {
                node.isLayoutDirty = true;
            }
            var crossfade = node.options.crossfade;
            if (crossfade === false) {
                prevLead.hide();
            }
        }
    };
    NodeStack2.prototype.exitAnimationComplete = function() {
        this.members.forEach(function(node) {
            var _a, _b, _c, _d, _e1;
            (_b = (_a = node.options).onExitComplete) === null || _b === void 0 ? void 0 : _b.call(_a);
            (_e1 = (_c = node.resumingFrom) === null || _c === void 0 ? void 0 : (_d = _c.options).onExitComplete) === null || _e1 === void 0 ? void 0 : _e1.call(_d);
        });
    };
    NodeStack2.prototype.scheduleRender = function() {
        this.members.forEach(function(node) {
            node.instance && node.scheduleRender(false);
        });
    };
    NodeStack2.prototype.removeLeadSnapshot = function() {
        if (this.lead && this.lead.snapshot) {
            this.lead.snapshot = void 0;
        }
    };
    return NodeStack2;
}();
var scaleCorrectors = {};
function addScaleCorrector(correctors) {
    Object.assign(scaleCorrectors, correctors);
}
var identityProjection = "translate3d(0px, 0px, 0) scale(1, 1)";
function buildProjectionTransform(delta, treeScale, latestTransform) {
    var xTranslate = delta.x.translate / treeScale.x;
    var yTranslate = delta.y.translate / treeScale.y;
    var transform = "translate3d(".concat(xTranslate, "px, ").concat(yTranslate, "px, 0) ");
    if (latestTransform) {
        var rotate = latestTransform.rotate, rotateX = latestTransform.rotateX, rotateY = latestTransform.rotateY;
        if (rotate) transform += "rotate(".concat(rotate, "deg) ");
        if (rotateX) transform += "rotateX(".concat(rotateX, "deg) ");
        if (rotateY) transform += "rotateY(".concat(rotateY, "deg) ");
    }
    transform += "scale(".concat(delta.x.scale, ", ").concat(delta.y.scale, ")");
    return transform === identityProjection ? "none" : transform;
}
function eachAxis(callback) {
    return [
        callback("x"),
        callback("y")
    ];
}
var transformAxes = [
    "",
    "X",
    "Y",
    "Z"
];
var order = [
    "translate",
    "scale",
    "rotate",
    "skew"
];
var transformProps = [
    "transformPerspective",
    "x",
    "y",
    "z"
];
order.forEach(function(operationKey) {
    return transformAxes.forEach(function(axesKey) {
        return transformProps.push(operationKey + axesKey);
    });
});
function sortTransformProps(a27, b2) {
    return transformProps.indexOf(a27) - transformProps.indexOf(b2);
}
var transformPropSet = new Set(transformProps);
function isTransformProp(key) {
    return transformPropSet.has(key);
}
var transformOriginProps = new Set([
    "originX",
    "originY",
    "originZ"
]);
function isTransformOriginProp(key) {
    return transformOriginProps.has(key);
}
var compareByDepth = function(a28, b2) {
    return a28.depth - b2.depth;
};
var FlatTree = function() {
    function FlatTree2() {
        this.children = [];
        this.isDirty = false;
    }
    FlatTree2.prototype.add = function(child) {
        addUniqueItem(this.children, child);
        this.isDirty = true;
    };
    FlatTree2.prototype.remove = function(child) {
        removeItem(this.children, child);
        this.isDirty = true;
    };
    FlatTree2.prototype.forEach = function(callback) {
        this.isDirty && this.children.sort(compareByDepth);
        this.isDirty = false;
        this.children.forEach(callback);
    };
    return FlatTree2;
}();
function resolveMotionValue(value) {
    var unwrappedValue = isMotionValue(value) ? value.get() : value;
    return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
}
var animationTarget = 1000;
var globalProjectionState = {
    hasAnimatedSinceResize: true,
    hasEverUpdated: false
};
function createProjectionNode(_a) {
    var attachResizeListener = _a.attachResizeListener, defaultParent = _a.defaultParent, measureScroll = _a.measureScroll, resetTransform = _a.resetTransform;
    return (function() {
        function ProjectionNode(id2, latestValues, parent) {
            var _this = this;
            if (latestValues === void 0) {
                latestValues = {};
            }
            if (parent === void 0) {
                parent = defaultParent === null || defaultParent === void 0 ? void 0 : defaultParent();
            }
            this.children = new Set();
            this.options = {};
            this.isTreeAnimating = false;
            this.isAnimationBlocked = false;
            this.isLayoutDirty = false;
            this.updateManuallyBlocked = false;
            this.updateBlockedByResize = false;
            this.isUpdating = false;
            this.isSVG = false;
            this.needsReset = false;
            this.shouldResetTransform = false;
            this.treeScale = {
                x: 1,
                y: 1
            };
            this.eventHandlers = new Map();
            this.potentialNodes = new Map();
            this.checkUpdateFailed = function() {
                if (_this.isUpdating) {
                    _this.isUpdating = false;
                    _this.clearAllSnapshots();
                }
            };
            this.updateProjection = function() {
                _this.nodes.forEach(resolveTargetDelta);
                _this.nodes.forEach(calcProjection);
            };
            this.hasProjected = false;
            this.isVisible = true;
            this.animationProgress = 0;
            this.sharedNodes = new Map();
            this.id = id2;
            this.latestValues = latestValues;
            this.root = parent ? parent.root || parent : this;
            this.path = parent ? __spreadArray(__spreadArray([], __read(parent.path), false), [
                parent
            ], false) : [];
            this.parent = parent;
            this.depth = parent ? parent.depth + 1 : 0;
            id2 && this.root.registerPotentialNode(id2, this);
            for(var i30 = 0; i30 < this.path.length; i30++){
                this.path[i30].shouldResetTransform = true;
            }
            if (this.root === this) this.nodes = new FlatTree();
        }
        ProjectionNode.prototype.addEventListener = function(name, handler) {
            if (!this.eventHandlers.has(name)) {
                this.eventHandlers.set(name, new SubscriptionManager());
            }
            return this.eventHandlers.get(name).add(handler);
        };
        ProjectionNode.prototype.notifyListeners = function(name) {
            var args = [];
            for(var _i = 1; _i < arguments.length; _i++){
                args[_i - 1] = arguments[_i];
            }
            var subscriptionManager = this.eventHandlers.get(name);
            subscriptionManager === null || subscriptionManager === void 0 ? void 0 : subscriptionManager.notify.apply(subscriptionManager, __spreadArray([], __read(args), false));
        };
        ProjectionNode.prototype.hasListeners = function(name) {
            return this.eventHandlers.has(name);
        };
        ProjectionNode.prototype.registerPotentialNode = function(id2, node) {
            this.potentialNodes.set(id2, node);
        };
        ProjectionNode.prototype.mount = function(instance, isLayoutDirty) {
            var _this = this;
            var _a2;
            if (isLayoutDirty === void 0) {
                isLayoutDirty = false;
            }
            if (this.instance) return;
            this.isSVG = instance instanceof SVGElement && instance.tagName !== "svg";
            this.instance = instance;
            var _b = this.options, layoutId = _b.layoutId, layout = _b.layout, visualElement2 = _b.visualElement;
            if (visualElement2 && !visualElement2.getInstance()) {
                visualElement2.mount(instance);
            }
            this.root.nodes.add(this);
            (_a2 = this.parent) === null || _a2 === void 0 ? void 0 : _a2.children.add(this);
            this.id && this.root.potentialNodes.delete(this.id);
            if (isLayoutDirty && (layout || layoutId)) {
                this.isLayoutDirty = true;
            }
            if (attachResizeListener) {
                var unblockTimeout_1;
                var resizeUnblockUpdate_1 = function() {
                    return _this.root.updateBlockedByResize = false;
                };
                attachResizeListener(instance, function() {
                    _this.root.updateBlockedByResize = true;
                    clearTimeout(unblockTimeout_1);
                    unblockTimeout_1 = window.setTimeout(resizeUnblockUpdate_1, 250);
                    if (globalProjectionState.hasAnimatedSinceResize) {
                        globalProjectionState.hasAnimatedSinceResize = false;
                        _this.nodes.forEach(finishAnimation);
                    }
                });
            }
            if (layoutId) {
                this.root.registerSharedNode(layoutId, this);
            }
            if (this.options.animate !== false && visualElement2 && (layoutId || layout)) {
                this.addEventListener("didUpdate", function(_a3) {
                    var _b2, _c, _d, _e2, _f;
                    var delta = _a3.delta, hasLayoutChanged = _a3.hasLayoutChanged, hasRelativeTargetChanged = _a3.hasRelativeTargetChanged, newLayout = _a3.layout;
                    if (_this.isTreeAnimationBlocked()) {
                        _this.target = void 0;
                        _this.relativeTarget = void 0;
                        return;
                    }
                    var layoutTransition = (_c = (_b2 = _this.options.transition) !== null && _b2 !== void 0 ? _b2 : visualElement2.getDefaultTransition()) !== null && _c !== void 0 ? _c : defaultLayoutTransition;
                    var onLayoutAnimationComplete = visualElement2.getProps().onLayoutAnimationComplete;
                    var targetChanged = !_this.targetLayout || !boxEquals(_this.targetLayout, newLayout) || hasRelativeTargetChanged;
                    var hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeTargetChanged;
                    if (((_d = _this.resumeFrom) === null || _d === void 0 ? void 0 : _d.instance) || hasOnlyRelativeTargetChanged || hasLayoutChanged && (targetChanged || !_this.currentAnimation)) {
                        if (_this.resumeFrom) {
                            _this.resumingFrom = _this.resumeFrom;
                            _this.resumingFrom.resumingFrom = void 0;
                        }
                        _this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
                        var animationOptions = __assign(__assign({}, getValueTransition(layoutTransition, "layout")), {
                            onComplete: onLayoutAnimationComplete
                        });
                        if (visualElement2.shouldReduceMotion) {
                            animationOptions.delay = 0;
                            animationOptions.type = false;
                        }
                        _this.startAnimation(animationOptions);
                    } else {
                        if (!hasLayoutChanged && _this.animationProgress === 0) {
                            _this.finishAnimation();
                        }
                        _this.isLead() && ((_f = (_e2 = _this.options).onExitComplete) === null || _f === void 0 ? void 0 : _f.call(_e2));
                    }
                    _this.targetLayout = newLayout;
                });
            }
        };
        ProjectionNode.prototype.unmount = function() {
            var _a2, _b;
            this.options.layoutId && this.willUpdate();
            this.root.nodes.remove(this);
            (_a2 = this.getStack()) === null || _a2 === void 0 ? void 0 : _a2.remove(this);
            (_b = this.parent) === null || _b === void 0 ? void 0 : _b.children.delete(this);
            this.instance = void 0;
            cancelSync.preRender(this.updateProjection);
        };
        ProjectionNode.prototype.blockUpdate = function() {
            this.updateManuallyBlocked = true;
        };
        ProjectionNode.prototype.unblockUpdate = function() {
            this.updateManuallyBlocked = false;
        };
        ProjectionNode.prototype.isUpdateBlocked = function() {
            return this.updateManuallyBlocked || this.updateBlockedByResize;
        };
        ProjectionNode.prototype.isTreeAnimationBlocked = function() {
            var _a2;
            return this.isAnimationBlocked || ((_a2 = this.parent) === null || _a2 === void 0 ? void 0 : _a2.isTreeAnimationBlocked()) || false;
        };
        ProjectionNode.prototype.startUpdate = function() {
            var _a2;
            if (this.isUpdateBlocked()) return;
            this.isUpdating = true;
            (_a2 = this.nodes) === null || _a2 === void 0 ? void 0 : _a2.forEach(resetRotation);
        };
        ProjectionNode.prototype.willUpdate = function(shouldNotifyListeners) {
            var _a2, _b, _c;
            if (shouldNotifyListeners === void 0) {
                shouldNotifyListeners = true;
            }
            if (this.root.isUpdateBlocked()) {
                (_b = (_a2 = this.options).onExitComplete) === null || _b === void 0 ? void 0 : _b.call(_a2);
                return;
            }
            !this.root.isUpdating && this.root.startUpdate();
            if (this.isLayoutDirty) return;
            this.isLayoutDirty = true;
            for(var i31 = 0; i31 < this.path.length; i31++){
                var node = this.path[i31];
                node.shouldResetTransform = true;
                node.updateScroll();
            }
            var _d = this.options, layoutId = _d.layoutId, layout = _d.layout;
            if (layoutId === void 0 && !layout) return;
            var transformTemplate = (_c = this.options.visualElement) === null || _c === void 0 ? void 0 : _c.getProps().transformTemplate;
            this.prevTransformTemplateValue = transformTemplate === null || transformTemplate === void 0 ? void 0 : transformTemplate(this.latestValues, "");
            this.updateSnapshot();
            shouldNotifyListeners && this.notifyListeners("willUpdate");
        };
        ProjectionNode.prototype.didUpdate = function() {
            var updateWasBlocked = this.isUpdateBlocked();
            if (updateWasBlocked) {
                this.unblockUpdate();
                this.clearAllSnapshots();
                this.nodes.forEach(clearMeasurements);
                return;
            }
            if (!this.isUpdating) return;
            this.isUpdating = false;
            if (this.potentialNodes.size) {
                this.potentialNodes.forEach(mountNodeEarly);
                this.potentialNodes.clear();
            }
            this.nodes.forEach(resetTransformStyle);
            this.nodes.forEach(updateLayout);
            this.nodes.forEach(notifyLayoutUpdate);
            this.clearAllSnapshots();
            flushSync.update();
            flushSync.preRender();
            flushSync.render();
        };
        ProjectionNode.prototype.clearAllSnapshots = function() {
            this.nodes.forEach(clearSnapshot);
            this.sharedNodes.forEach(removeLeadSnapshots);
        };
        ProjectionNode.prototype.scheduleUpdateProjection = function() {
            es_default.preRender(this.updateProjection, false, true);
        };
        ProjectionNode.prototype.scheduleCheckAfterUnmount = function() {
            var _this = this;
            es_default.postRender(function() {
                if (_this.isLayoutDirty) {
                    _this.root.didUpdate();
                } else {
                    _this.root.checkUpdateFailed();
                }
            });
        };
        ProjectionNode.prototype.updateSnapshot = function() {
            if (this.snapshot || !this.instance) return;
            var measured = this.measure();
            var layout = this.removeTransform(this.removeElementScroll(measured));
            roundBox(layout);
            this.snapshot = {
                measured,
                layout,
                latestValues: {}
            };
        };
        ProjectionNode.prototype.updateLayout = function() {
            var _a2;
            if (!this.instance) return;
            this.updateScroll();
            if (!(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty) {
                return;
            }
            if (this.resumeFrom && !this.resumeFrom.instance) {
                for(var i32 = 0; i32 < this.path.length; i32++){
                    var node = this.path[i32];
                    node.updateScroll();
                }
            }
            var measured = this.measure();
            roundBox(measured);
            var prevLayout = this.layout;
            this.layout = {
                measured,
                actual: this.removeElementScroll(measured)
            };
            this.layoutCorrected = createBox();
            this.isLayoutDirty = false;
            this.projectionDelta = void 0;
            this.notifyListeners("measure", this.layout.actual);
            (_a2 = this.options.visualElement) === null || _a2 === void 0 ? void 0 : _a2.notifyLayoutMeasure(this.layout.actual, prevLayout === null || prevLayout === void 0 ? void 0 : prevLayout.actual);
        };
        ProjectionNode.prototype.updateScroll = function() {
            if (this.options.layoutScroll && this.instance) {
                this.scroll = measureScroll(this.instance);
            }
        };
        ProjectionNode.prototype.resetTransform = function() {
            var _a2;
            if (!resetTransform) return;
            var isResetRequested = this.isLayoutDirty || this.shouldResetTransform;
            var hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta);
            var transformTemplate = (_a2 = this.options.visualElement) === null || _a2 === void 0 ? void 0 : _a2.getProps().transformTemplate;
            var transformTemplateValue = transformTemplate === null || transformTemplate === void 0 ? void 0 : transformTemplate(this.latestValues, "");
            var transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
            if (isResetRequested && (hasProjection || hasTransform(this.latestValues) || transformTemplateHasChanged)) {
                resetTransform(this.instance, transformTemplateValue);
                this.shouldResetTransform = false;
                this.scheduleRender();
            }
        };
        ProjectionNode.prototype.measure = function() {
            var visualElement2 = this.options.visualElement;
            if (!visualElement2) return createBox();
            var box = visualElement2.measureViewportBox();
            var scroll = this.root.scroll;
            if (scroll) {
                translateAxis(box.x, scroll.x);
                translateAxis(box.y, scroll.y);
            }
            return box;
        };
        ProjectionNode.prototype.removeElementScroll = function(box) {
            var boxWithoutScroll = createBox();
            copyBoxInto(boxWithoutScroll, box);
            for(var i33 = 0; i33 < this.path.length; i33++){
                var node = this.path[i33];
                var scroll_1 = node.scroll, options = node.options;
                if (node !== this.root && scroll_1 && options.layoutScroll) {
                    translateAxis(boxWithoutScroll.x, scroll_1.x);
                    translateAxis(boxWithoutScroll.y, scroll_1.y);
                }
            }
            return boxWithoutScroll;
        };
        ProjectionNode.prototype.applyTransform = function(box, transformOnly) {
            if (transformOnly === void 0) {
                transformOnly = false;
            }
            var withTransforms = createBox();
            copyBoxInto(withTransforms, box);
            for(var i34 = 0; i34 < this.path.length; i34++){
                var node = this.path[i34];
                if (!transformOnly && node.options.layoutScroll && node.scroll && node !== node.root) {
                    transformBox(withTransforms, {
                        x: -node.scroll.x,
                        y: -node.scroll.y
                    });
                }
                if (!hasTransform(node.latestValues)) continue;
                transformBox(withTransforms, node.latestValues);
            }
            if (hasTransform(this.latestValues)) {
                transformBox(withTransforms, this.latestValues);
            }
            return withTransforms;
        };
        ProjectionNode.prototype.removeTransform = function(box) {
            var _a2;
            var boxWithoutTransform = createBox();
            copyBoxInto(boxWithoutTransform, box);
            for(var i35 = 0; i35 < this.path.length; i35++){
                var node = this.path[i35];
                if (!node.instance) continue;
                if (!hasTransform(node.latestValues)) continue;
                hasScale(node.latestValues) && node.updateSnapshot();
                var sourceBox = createBox();
                var nodeBox = node.measure();
                copyBoxInto(sourceBox, nodeBox);
                removeBoxTransforms(boxWithoutTransform, node.latestValues, (_a2 = node.snapshot) === null || _a2 === void 0 ? void 0 : _a2.layout, sourceBox);
            }
            if (hasTransform(this.latestValues)) {
                removeBoxTransforms(boxWithoutTransform, this.latestValues);
            }
            return boxWithoutTransform;
        };
        ProjectionNode.prototype.setTargetDelta = function(delta) {
            this.targetDelta = delta;
            this.root.scheduleUpdateProjection();
        };
        ProjectionNode.prototype.setOptions = function(options) {
            var _a2;
            this.options = __assign(__assign(__assign({}, this.options), options), {
                crossfade: (_a2 = options.crossfade) !== null && _a2 !== void 0 ? _a2 : true
            });
        };
        ProjectionNode.prototype.clearMeasurements = function() {
            this.scroll = void 0;
            this.layout = void 0;
            this.snapshot = void 0;
            this.prevTransformTemplateValue = void 0;
            this.targetDelta = void 0;
            this.target = void 0;
            this.isLayoutDirty = false;
        };
        ProjectionNode.prototype.resolveTargetDelta = function() {
            var _a2;
            var _b = this.options, layout = _b.layout, layoutId = _b.layoutId;
            if (!this.layout || !(layout || layoutId)) return;
            if (!this.targetDelta && !this.relativeTarget) {
                this.relativeParent = this.getClosestProjectingParent();
                if (this.relativeParent && this.relativeParent.layout) {
                    this.relativeTarget = createBox();
                    this.relativeTargetOrigin = createBox();
                    calcRelativePosition(this.relativeTargetOrigin, this.layout.actual, this.relativeParent.layout.actual);
                    copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
                }
            }
            if (!this.relativeTarget && !this.targetDelta) return;
            if (!this.target) {
                this.target = createBox();
                this.targetWithTransforms = createBox();
            }
            if (this.relativeTarget && this.relativeTargetOrigin && ((_a2 = this.relativeParent) === null || _a2 === void 0 ? void 0 : _a2.target)) {
                calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target);
            } else if (this.targetDelta) {
                if (Boolean(this.resumingFrom)) {
                    this.target = this.applyTransform(this.layout.actual);
                } else {
                    copyBoxInto(this.target, this.layout.actual);
                }
                applyBoxDelta(this.target, this.targetDelta);
            } else {
                copyBoxInto(this.target, this.layout.actual);
            }
            if (this.attemptToResolveRelativeTarget) {
                this.attemptToResolveRelativeTarget = false;
                this.relativeParent = this.getClosestProjectingParent();
                if (this.relativeParent && Boolean(this.relativeParent.resumingFrom) === Boolean(this.resumingFrom) && !this.relativeParent.options.layoutScroll && this.relativeParent.target) {
                    this.relativeTarget = createBox();
                    this.relativeTargetOrigin = createBox();
                    calcRelativePosition(this.relativeTargetOrigin, this.target, this.relativeParent.target);
                    copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
                }
            }
        };
        ProjectionNode.prototype.getClosestProjectingParent = function() {
            if (!this.parent || hasTransform(this.parent.latestValues)) return void 0;
            if ((this.parent.relativeTarget || this.parent.targetDelta) && this.parent.layout) {
                return this.parent;
            } else {
                return this.parent.getClosestProjectingParent();
            }
        };
        ProjectionNode.prototype.calcProjection = function() {
            var _a2;
            var _b = this.options, layout = _b.layout, layoutId = _b.layoutId;
            this.isTreeAnimating = Boolean(((_a2 = this.parent) === null || _a2 === void 0 ? void 0 : _a2.isTreeAnimating) || this.currentAnimation || this.pendingAnimation);
            if (!this.isTreeAnimating) {
                this.targetDelta = this.relativeTarget = void 0;
            }
            if (!this.layout || !(layout || layoutId)) return;
            var lead = this.getLead();
            copyBoxInto(this.layoutCorrected, this.layout.actual);
            applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, Boolean(this.resumingFrom) || this !== lead);
            var target = lead.target;
            if (!target) return;
            if (!this.projectionDelta) {
                this.projectionDelta = createDelta();
                this.projectionDeltaWithTransform = createDelta();
            }
            var prevTreeScaleX = this.treeScale.x;
            var prevTreeScaleY = this.treeScale.y;
            var prevProjectionTransform = this.projectionTransform;
            calcBoxDelta(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
            this.projectionTransform = buildProjectionTransform(this.projectionDelta, this.treeScale);
            if (this.projectionTransform !== prevProjectionTransform || this.treeScale.x !== prevTreeScaleX || this.treeScale.y !== prevTreeScaleY) {
                this.hasProjected = true;
                this.scheduleRender();
                this.notifyListeners("projectionUpdate", target);
            }
        };
        ProjectionNode.prototype.hide = function() {
            this.isVisible = false;
        };
        ProjectionNode.prototype.show = function() {
            this.isVisible = true;
        };
        ProjectionNode.prototype.scheduleRender = function(notifyAll) {
            var _a2, _b, _c;
            if (notifyAll === void 0) {
                notifyAll = true;
            }
            (_b = (_a2 = this.options).scheduleRender) === null || _b === void 0 ? void 0 : _b.call(_a2);
            notifyAll && ((_c = this.getStack()) === null || _c === void 0 ? void 0 : _c.scheduleRender());
            if (this.resumingFrom && !this.resumingFrom.instance) {
                this.resumingFrom = void 0;
            }
        };
        ProjectionNode.prototype.setAnimationOrigin = function(delta, hasOnlyRelativeTargetChanged) {
            var _this = this;
            var _a2;
            if (hasOnlyRelativeTargetChanged === void 0) {
                hasOnlyRelativeTargetChanged = false;
            }
            var snapshot = this.snapshot;
            var snapshotLatestValues = (snapshot === null || snapshot === void 0 ? void 0 : snapshot.latestValues) || {};
            var mixedValues = __assign({}, this.latestValues);
            var targetDelta = createDelta();
            this.relativeTarget = this.relativeTargetOrigin = void 0;
            this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
            var relativeLayout = createBox();
            var isSharedLayoutAnimation = snapshot === null || snapshot === void 0 ? void 0 : snapshot.isShared;
            var isOnlyMember = (((_a2 = this.getStack()) === null || _a2 === void 0 ? void 0 : _a2.members.length) || 0) <= 1;
            var shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation && !isOnlyMember && this.options.crossfade === true && !this.path.some(hasOpacityCrossfade));
            this.animationProgress = 0;
            this.mixTargetDelta = function(latest) {
                var _a3;
                var progress2 = latest / 1000;
                mixAxisDelta(targetDelta.x, delta.x, progress2);
                mixAxisDelta(targetDelta.y, delta.y, progress2);
                _this.setTargetDelta(targetDelta);
                if (_this.relativeTarget && _this.relativeTargetOrigin && _this.layout && ((_a3 = _this.relativeParent) === null || _a3 === void 0 ? void 0 : _a3.layout)) {
                    calcRelativePosition(relativeLayout, _this.layout.actual, _this.relativeParent.layout.actual);
                    mixBox(_this.relativeTarget, _this.relativeTargetOrigin, relativeLayout, progress2);
                }
                if (isSharedLayoutAnimation) {
                    _this.animationValues = mixedValues;
                    mixValues(mixedValues, snapshotLatestValues, _this.latestValues, progress2, shouldCrossfadeOpacity, isOnlyMember);
                }
                _this.root.scheduleUpdateProjection();
                _this.scheduleRender();
                _this.animationProgress = progress2;
            };
            this.mixTargetDelta(0);
        };
        ProjectionNode.prototype.startAnimation = function(options) {
            var _this = this;
            var _a2, _b;
            (_a2 = this.currentAnimation) === null || _a2 === void 0 ? void 0 : _a2.stop();
            if (this.resumingFrom) {
                (_b = this.resumingFrom.currentAnimation) === null || _b === void 0 ? void 0 : _b.stop();
            }
            if (this.pendingAnimation) {
                cancelSync.update(this.pendingAnimation);
                this.pendingAnimation = void 0;
            }
            this.pendingAnimation = es_default.update(function() {
                globalProjectionState.hasAnimatedSinceResize = true;
                _this.currentAnimation = animate2(0, animationTarget, __assign(__assign({}, options), {
                    onUpdate: function(latest) {
                        var _a3;
                        _this.mixTargetDelta(latest);
                        (_a3 = options.onUpdate) === null || _a3 === void 0 ? void 0 : _a3.call(options, latest);
                    },
                    onComplete: function() {
                        var _a3;
                        (_a3 = options.onComplete) === null || _a3 === void 0 ? void 0 : _a3.call(options);
                        _this.completeAnimation();
                    }
                }));
                if (_this.resumingFrom) {
                    _this.resumingFrom.currentAnimation = _this.currentAnimation;
                }
                _this.pendingAnimation = void 0;
            });
        };
        ProjectionNode.prototype.completeAnimation = function() {
            var _a2;
            if (this.resumingFrom) {
                this.resumingFrom.currentAnimation = void 0;
                this.resumingFrom.preserveOpacity = void 0;
            }
            (_a2 = this.getStack()) === null || _a2 === void 0 ? void 0 : _a2.exitAnimationComplete();
            this.resumingFrom = this.currentAnimation = this.animationValues = void 0;
            this.notifyListeners("animationComplete");
        };
        ProjectionNode.prototype.finishAnimation = function() {
            var _a2;
            if (this.currentAnimation) {
                (_a2 = this.mixTargetDelta) === null || _a2 === void 0 ? void 0 : _a2.call(this, animationTarget);
                this.currentAnimation.stop();
            }
            this.completeAnimation();
        };
        ProjectionNode.prototype.applyTransformsToTarget = function() {
            var _a2 = this.getLead(), targetWithTransforms = _a2.targetWithTransforms, target = _a2.target, layout = _a2.layout, latestValues = _a2.latestValues;
            if (!targetWithTransforms || !target || !layout) return;
            copyBoxInto(targetWithTransforms, target);
            transformBox(targetWithTransforms, latestValues);
            calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
        };
        ProjectionNode.prototype.registerSharedNode = function(layoutId, node) {
            var _a2, _b, _c;
            if (!this.sharedNodes.has(layoutId)) {
                this.sharedNodes.set(layoutId, new NodeStack());
            }
            var stack = this.sharedNodes.get(layoutId);
            stack.add(node);
            node.promote({
                transition: (_a2 = node.options.initialPromotionConfig) === null || _a2 === void 0 ? void 0 : _a2.transition,
                preserveFollowOpacity: (_c = (_b = node.options.initialPromotionConfig) === null || _b === void 0 ? void 0 : _b.shouldPreserveFollowOpacity) === null || _c === void 0 ? void 0 : _c.call(_b, node)
            });
        };
        ProjectionNode.prototype.isLead = function() {
            var stack = this.getStack();
            return stack ? stack.lead === this : true;
        };
        ProjectionNode.prototype.getLead = function() {
            var _a2;
            var layoutId = this.options.layoutId;
            return layoutId ? ((_a2 = this.getStack()) === null || _a2 === void 0 ? void 0 : _a2.lead) || this : this;
        };
        ProjectionNode.prototype.getPrevLead = function() {
            var _a2;
            var layoutId = this.options.layoutId;
            return layoutId ? (_a2 = this.getStack()) === null || _a2 === void 0 ? void 0 : _a2.prevLead : void 0;
        };
        ProjectionNode.prototype.getStack = function() {
            var layoutId = this.options.layoutId;
            if (layoutId) return this.root.sharedNodes.get(layoutId);
        };
        ProjectionNode.prototype.promote = function(_a2) {
            var _b = _a2 === void 0 ? {} : _a2, needsReset = _b.needsReset, transition = _b.transition, preserveFollowOpacity = _b.preserveFollowOpacity;
            var stack = this.getStack();
            if (stack) stack.promote(this, preserveFollowOpacity);
            if (needsReset) {
                this.projectionDelta = void 0;
                this.needsReset = true;
            }
            if (transition) this.setOptions({
                transition
            });
        };
        ProjectionNode.prototype.relegate = function() {
            var stack = this.getStack();
            if (stack) {
                return stack.relegate(this);
            } else {
                return false;
            }
        };
        ProjectionNode.prototype.resetRotation = function() {
            var visualElement2 = this.options.visualElement;
            if (!visualElement2) return;
            var hasRotate = false;
            var resetValues = {};
            for(var i36 = 0; i36 < transformAxes.length; i36++){
                var axis = transformAxes[i36];
                var key = "rotate" + axis;
                if (!visualElement2.getStaticValue(key)) {
                    continue;
                }
                hasRotate = true;
                resetValues[key] = visualElement2.getStaticValue(key);
                visualElement2.setStaticValue(key, 0);
            }
            if (!hasRotate) return;
            visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.syncRender();
            for(var key in resetValues){
                visualElement2.setStaticValue(key, resetValues[key]);
            }
            visualElement2.scheduleRender();
        };
        ProjectionNode.prototype.getProjectionStyles = function(styleProp) {
            var _a2, _b, _c, _d, _e3, _f;
            if (styleProp === void 0) {
                styleProp = {};
            }
            var styles = {};
            if (!this.instance || this.isSVG) return styles;
            if (!this.isVisible) {
                return {
                    visibility: "hidden"
                };
            } else {
                styles.visibility = "";
            }
            var transformTemplate = (_a2 = this.options.visualElement) === null || _a2 === void 0 ? void 0 : _a2.getProps().transformTemplate;
            if (this.needsReset) {
                this.needsReset = false;
                styles.opacity = "";
                styles.pointerEvents = resolveMotionValue(styleProp.pointerEvents) || "";
                styles.transform = transformTemplate ? transformTemplate(this.latestValues, "") : "none";
                return styles;
            }
            var lead = this.getLead();
            if (!this.projectionDelta || !this.layout || !lead.target) {
                var emptyStyles = {};
                if (this.options.layoutId) {
                    emptyStyles.opacity = (_b = this.latestValues.opacity) !== null && _b !== void 0 ? _b : 1;
                    emptyStyles.pointerEvents = resolveMotionValue(styleProp.pointerEvents) || "";
                }
                if (this.hasProjected && !hasTransform(this.latestValues)) {
                    emptyStyles.transform = transformTemplate ? transformTemplate({}, "") : "none";
                    this.hasProjected = false;
                }
                return emptyStyles;
            }
            var valuesToRender = lead.animationValues || lead.latestValues;
            this.applyTransformsToTarget();
            styles.transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
            if (transformTemplate) {
                styles.transform = transformTemplate(valuesToRender, styles.transform);
            }
            var _g = this.projectionDelta, x6 = _g.x, y4 = _g.y;
            styles.transformOrigin = "".concat(x6.origin * 100, "% ").concat(y4.origin * 100, "% 0");
            if (lead.animationValues) {
                styles.opacity = lead === this ? (_d = (_c = valuesToRender.opacity) !== null && _c !== void 0 ? _c : this.latestValues.opacity) !== null && _d !== void 0 ? _d : 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
            } else {
                styles.opacity = lead === this ? (_e3 = valuesToRender.opacity) !== null && _e3 !== void 0 ? _e3 : "" : (_f = valuesToRender.opacityExit) !== null && _f !== void 0 ? _f : 0;
            }
            for(var key in scaleCorrectors){
                if (valuesToRender[key] === void 0) continue;
                var _h = scaleCorrectors[key], correct = _h.correct, applyTo = _h.applyTo;
                var corrected = correct(valuesToRender[key], lead);
                if (applyTo) {
                    var num = applyTo.length;
                    for(var i37 = 0; i37 < num; i37++){
                        styles[applyTo[i37]] = corrected;
                    }
                } else {
                    styles[key] = corrected;
                }
            }
            if (this.options.layoutId) {
                styles.pointerEvents = lead === this ? resolveMotionValue(styleProp.pointerEvents) || "" : "none";
            }
            return styles;
        };
        ProjectionNode.prototype.clearSnapshot = function() {
            this.resumeFrom = this.snapshot = void 0;
        };
        ProjectionNode.prototype.resetTree = function() {
            this.root.nodes.forEach(function(node) {
                var _a2;
                return (_a2 = node.currentAnimation) === null || _a2 === void 0 ? void 0 : _a2.stop();
            });
            this.root.nodes.forEach(clearMeasurements);
            this.root.sharedNodes.clear();
        };
        return ProjectionNode;
    })();
}
function updateLayout(node) {
    node.updateLayout();
}
function notifyLayoutUpdate(node) {
    var _a, _b, _c, _d;
    var snapshot = (_b = (_a = node.resumeFrom) === null || _a === void 0 ? void 0 : _a.snapshot) !== null && _b !== void 0 ? _b : node.snapshot;
    if (node.isLead() && node.layout && snapshot && node.hasListeners("didUpdate")) {
        var _e4 = node.layout, layout_1 = _e4.actual, measuredLayout = _e4.measured;
        if (node.options.animationType === "size") {
            eachAxis(function(axis) {
                var axisSnapshot = snapshot.isShared ? snapshot.measured[axis] : snapshot.layout[axis];
                var length = calcLength(axisSnapshot);
                axisSnapshot.min = layout_1[axis].min;
                axisSnapshot.max = axisSnapshot.min + length;
            });
        } else if (node.options.animationType === "position") {
            eachAxis(function(axis) {
                var axisSnapshot = snapshot.isShared ? snapshot.measured[axis] : snapshot.layout[axis];
                var length = calcLength(layout_1[axis]);
                axisSnapshot.max = axisSnapshot.min + length;
            });
        }
        var layoutDelta = createDelta();
        calcBoxDelta(layoutDelta, layout_1, snapshot.layout);
        var visualDelta = createDelta();
        if (snapshot.isShared) {
            calcBoxDelta(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measured);
        } else {
            calcBoxDelta(visualDelta, layout_1, snapshot.layout);
        }
        var hasLayoutChanged = !isDeltaZero(layoutDelta);
        var hasRelativeTargetChanged = false;
        if (!node.resumeFrom) {
            node.relativeParent = node.getClosestProjectingParent();
            if (node.relativeParent && !node.relativeParent.resumeFrom) {
                var _f = node.relativeParent, parentSnapshot = _f.snapshot, parentLayout = _f.layout;
                if (parentSnapshot && parentLayout) {
                    var relativeSnapshot = createBox();
                    calcRelativePosition(relativeSnapshot, snapshot.layout, parentSnapshot.layout);
                    var relativeLayout = createBox();
                    calcRelativePosition(relativeLayout, layout_1, parentLayout.actual);
                    if (!boxEquals(relativeSnapshot, relativeLayout)) {
                        hasRelativeTargetChanged = true;
                    }
                }
            }
        }
        node.notifyListeners("didUpdate", {
            layout: layout_1,
            snapshot,
            delta: visualDelta,
            layoutDelta,
            hasLayoutChanged,
            hasRelativeTargetChanged
        });
    } else if (node.isLead()) {
        (_d = (_c = node.options).onExitComplete) === null || _d === void 0 ? void 0 : _d.call(_c);
    }
    node.options.transition = void 0;
}
function clearSnapshot(node) {
    node.clearSnapshot();
}
function clearMeasurements(node) {
    node.clearMeasurements();
}
function resetTransformStyle(node) {
    var visualElement2 = node.options.visualElement;
    if (visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.getProps().onBeforeLayoutMeasure) {
        visualElement2.notifyBeforeLayoutMeasure();
    }
    node.resetTransform();
}
function finishAnimation(node) {
    node.finishAnimation();
    node.targetDelta = node.relativeTarget = node.target = void 0;
}
function resolveTargetDelta(node) {
    node.resolveTargetDelta();
}
function calcProjection(node) {
    node.calcProjection();
}
function resetRotation(node) {
    node.resetRotation();
}
function removeLeadSnapshots(stack) {
    stack.removeLeadSnapshot();
}
function mixAxisDelta(output, delta, p22) {
    output.translate = mix(delta.translate, 0, p22);
    output.scale = mix(delta.scale, 1, p22);
    output.origin = delta.origin;
    output.originPoint = delta.originPoint;
}
function mixAxis(output, from, to, p23) {
    output.min = mix(from.min, to.min, p23);
    output.max = mix(from.max, to.max, p23);
}
function mixBox(output, from, to, p24) {
    mixAxis(output.x, from.x, to.x, p24);
    mixAxis(output.y, from.y, to.y, p24);
}
function hasOpacityCrossfade(node) {
    return node.animationValues && node.animationValues.opacityExit !== void 0;
}
var defaultLayoutTransition = {
    duration: 0.45,
    ease: [
        0.4,
        0,
        0.1,
        1
    ]
};
function mountNodeEarly(node, id2) {
    var searchNode = node.root;
    for(var i38 = node.path.length - 1; i38 >= 0; i38--){
        if (Boolean(node.path[i38].instance)) {
            searchNode = node.path[i38];
            break;
        }
    }
    var searchElement = searchNode && searchNode !== node.root ? searchNode.instance : document;
    var element = searchElement.querySelector('[data-projection-id="'.concat(id2, '"]'));
    if (element) node.mount(element, true);
}
function roundAxis(axis) {
    axis.min = Math.round(axis.min);
    axis.max = Math.round(axis.max);
}
function roundBox(box) {
    roundAxis(box.x);
    roundAxis(box.y);
}
var id = 1;
function useProjectionId() {
    return useConstant(function() {
        if (globalProjectionState.hasEverUpdated) {
            return id++;
        }
    });
}
var LayoutGroupContext = createContext({});
var SwitchLayoutGroupContext = createContext({});
function useProjection(projectionId, _a, visualElement2, ProjectionNodeConstructor) {
    var _b;
    var layoutId = _a.layoutId, layout = _a.layout, drag2 = _a.drag, dragConstraints = _a.dragConstraints, layoutScroll = _a.layoutScroll;
    var initialPromotionConfig = useContext(SwitchLayoutGroupContext);
    if (!ProjectionNodeConstructor || !visualElement2 || (visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.projection)) {
        return;
    }
    visualElement2.projection = new ProjectionNodeConstructor(projectionId, visualElement2.getLatestValues(), (_b = visualElement2.parent) === null || _b === void 0 ? void 0 : _b.projection);
    visualElement2.projection.setOptions({
        layoutId,
        layout,
        alwaysMeasureLayout: Boolean(drag2) || dragConstraints && isRefObject(dragConstraints),
        visualElement: visualElement2,
        scheduleRender: function() {
            return visualElement2.scheduleRender();
        },
        animationType: typeof layout === "string" ? layout : "both",
        initialPromotionConfig,
        layoutScroll
    });
}
var VisualElementHandler = function(_super) {
    __extends(VisualElementHandler2, _super);
    function VisualElementHandler2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VisualElementHandler2.prototype.getSnapshotBeforeUpdate = function() {
        this.updateProps();
        return null;
    };
    VisualElementHandler2.prototype.componentDidUpdate = function() {};
    VisualElementHandler2.prototype.updateProps = function() {
        var _a = this.props, visualElement2 = _a.visualElement, props = _a.props;
        if (visualElement2) visualElement2.setProps(props);
    };
    VisualElementHandler2.prototype.render = function() {
        return this.props.children;
    };
    return VisualElementHandler2;
}(react.Component);
function createMotionComponent(_a) {
    var preloadedFeatures = _a.preloadedFeatures, createVisualElement = _a.createVisualElement, projectionNodeConstructor = _a.projectionNodeConstructor, useRender = _a.useRender, useVisualState = _a.useVisualState, Component3 = _a.Component;
    preloadedFeatures && loadFeatures(preloadedFeatures);
    function MotionComponent(props, externalRef) {
        var layoutId = useLayoutId(props);
        props = __assign(__assign({}, props), {
            layoutId
        });
        var config = useContext(MotionConfigContext);
        var features = null;
        var context = useCreateMotionContext(props);
        var projectionId = config.isStatic ? void 0 : useProjectionId();
        var visualState = useVisualState(props, config.isStatic);
        if (!config.isStatic && isBrowser) {
            context.visualElement = useVisualElement(Component3, visualState, __assign(__assign({}, config), props), createVisualElement);
            useProjection(projectionId, props, context.visualElement, projectionNodeConstructor || featureDefinitions.projectionNodeConstructor);
            features = useFeatures(props, context.visualElement, preloadedFeatures);
        }
        return createElement(VisualElementHandler, {
            visualElement: context.visualElement,
            props: __assign(__assign({}, config), props)
        }, features, createElement(MotionContext.Provider, {
            value: context
        }, useRender(Component3, props, projectionId, useMotionRef(visualState, context.visualElement, externalRef), visualState, config.isStatic, context.visualElement)));
    }
    return forwardRef(MotionComponent);
}
function useLayoutId(_a) {
    var _b;
    var layoutId = _a.layoutId;
    var layoutGroupId = (_b = useContext(LayoutGroupContext)) === null || _b === void 0 ? void 0 : _b.id;
    return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
}
function createMotionProxy(createConfig) {
    function custom(Component4, customMotionComponentConfig) {
        if (customMotionComponentConfig === void 0) {
            customMotionComponentConfig = {};
        }
        return createMotionComponent(createConfig(Component4, customMotionComponentConfig));
    }
    if (typeof Proxy === "undefined") {
        return custom;
    }
    var componentCache = new Map();
    return new Proxy(custom, {
        get: function(_target, key) {
            if (!componentCache.has(key)) {
                componentCache.set(key, custom(key));
            }
            return componentCache.get(key);
        }
    });
}
var lowercaseSVGElements = [
    "animate",
    "circle",
    "defs",
    "desc",
    "ellipse",
    "g",
    "image",
    "line",
    "filter",
    "marker",
    "mask",
    "metadata",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "rect",
    "stop",
    "svg",
    "switch",
    "symbol",
    "text",
    "tspan",
    "use",
    "view"
];
function isSVGComponent(Component5) {
    if (typeof Component5 !== "string" || Component5.includes("-")) {
        return false;
    } else if (lowercaseSVGElements.indexOf(Component5) > -1 || /[A-Z]/.test(Component5)) {
        return true;
    }
    return false;
}
function isForcedMotionValue(key, _a) {
    var layout = _a.layout, layoutId = _a.layoutId;
    return isTransformProp(key) || isTransformOriginProp(key) || (layout || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
}
var translateAlias = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective"
};
function buildTransform(_a, _b, transformIsDefault, transformTemplate) {
    var transform = _a.transform, transformKeys2 = _a.transformKeys;
    var _c = _b.enableHardwareAcceleration, enableHardwareAcceleration = _c === void 0 ? true : _c, _d = _b.allowTransformNone, allowTransformNone = _d === void 0 ? true : _d;
    var transformString = "";
    transformKeys2.sort(sortTransformProps);
    var transformHasZ = false;
    var numTransformKeys = transformKeys2.length;
    for(var i39 = 0; i39 < numTransformKeys; i39++){
        var key = transformKeys2[i39];
        transformString += "".concat(translateAlias[key] || key, "(").concat(transform[key], ") ");
        if (key === "z") transformHasZ = true;
    }
    if (!transformHasZ && enableHardwareAcceleration) {
        transformString += "translateZ(0)";
    } else {
        transformString = transformString.trim();
    }
    if (transformTemplate) {
        transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
    } else if (allowTransformNone && transformIsDefault) {
        transformString = "none";
    }
    return transformString;
}
function buildTransformOrigin(_a) {
    var _b = _a.originX, originX = _b === void 0 ? "50%" : _b, _c = _a.originY, originY = _c === void 0 ? "50%" : _c, _d = _a.originZ, originZ = _d === void 0 ? 0 : _d;
    return "".concat(originX, " ").concat(originY, " ").concat(originZ);
}
function isCSSVariable(key) {
    return key.startsWith("--");
}
var getValueAsType = function(value, type) {
    return type && typeof value === "number" ? type.transform(value) : value;
};
function buildHTMLStyles(state, latestValues, options, transformTemplate) {
    var _a;
    var style = state.style, vars = state.vars, transform = state.transform, transformKeys2 = state.transformKeys, transformOrigin = state.transformOrigin;
    transformKeys2.length = 0;
    var hasTransform2 = false;
    var hasTransformOrigin = false;
    var transformIsNone = true;
    for(var key in latestValues){
        var value = latestValues[key];
        if (isCSSVariable(key)) {
            vars[key] = value;
            continue;
        }
        var valueType = numberValueTypes[key];
        var valueAsType = getValueAsType(value, valueType);
        if (isTransformProp(key)) {
            hasTransform2 = true;
            transform[key] = valueAsType;
            transformKeys2.push(key);
            if (!transformIsNone) continue;
            if (value !== ((_a = valueType.default) !== null && _a !== void 0 ? _a : 0)) transformIsNone = false;
        } else if (isTransformOriginProp(key)) {
            transformOrigin[key] = valueAsType;
            hasTransformOrigin = true;
        } else {
            style[key] = valueAsType;
        }
    }
    if (hasTransform2) {
        style.transform = buildTransform(state, options, transformIsNone, transformTemplate);
    } else if (transformTemplate) {
        style.transform = transformTemplate({}, "");
    } else if (!latestValues.transform && style.transform) {
        style.transform = "none";
    }
    if (hasTransformOrigin) {
        style.transformOrigin = buildTransformOrigin(transformOrigin);
    }
}
var createHtmlRenderState = function() {
    return {
        style: {},
        transform: {},
        transformKeys: [],
        transformOrigin: {},
        vars: {}
    };
};
function copyRawValuesOnly(target, source, props) {
    for(var key in source){
        if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
            target[key] = source[key];
        }
    }
}
function useInitialMotionValues(_a, visualState, isStatic) {
    var transformTemplate = _a.transformTemplate;
    return useMemo(function() {
        var state = createHtmlRenderState();
        buildHTMLStyles(state, visualState, {
            enableHardwareAcceleration: !isStatic
        }, transformTemplate);
        var vars = state.vars, style = state.style;
        return __assign(__assign({}, vars), style);
    }, [
        visualState
    ]);
}
function useStyle(props, visualState, isStatic) {
    var styleProp = props.style || {};
    var style = {};
    copyRawValuesOnly(style, styleProp, props);
    Object.assign(style, useInitialMotionValues(props, visualState, isStatic));
    if (props.transformValues) {
        style = props.transformValues(style);
    }
    return style;
}
function useHTMLProps(props, visualState, isStatic) {
    var htmlProps = {};
    var style = useStyle(props, visualState, isStatic);
    if (Boolean(props.drag) && props.dragListener !== false) {
        htmlProps.draggable = false;
        style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
        style.touchAction = props.drag === true ? "none" : "pan-".concat(props.drag === "x" ? "y" : "x");
    }
    htmlProps.style = style;
    return htmlProps;
}
var validMotionProps = new Set([
    "initial",
    "animate",
    "exit",
    "style",
    "variants",
    "transition",
    "transformTemplate",
    "transformValues",
    "custom",
    "inherit",
    "layout",
    "layoutId",
    "layoutDependency",
    "onLayoutAnimationComplete",
    "onLayoutMeasure",
    "onBeforeLayoutMeasure",
    "onAnimationStart",
    "onAnimationComplete",
    "onUpdate",
    "onDragStart",
    "onDrag",
    "onDragEnd",
    "onMeasureDragConstraints",
    "onDirectionLock",
    "onDragTransitionEnd",
    "drag",
    "dragControls",
    "dragListener",
    "dragConstraints",
    "dragDirectionLock",
    "dragSnapToOrigin",
    "_dragX",
    "_dragY",
    "dragElastic",
    "dragMomentum",
    "dragPropagation",
    "dragTransition",
    "whileDrag",
    "onPan",
    "onPanStart",
    "onPanEnd",
    "onPanSessionStart",
    "onTap",
    "onTapStart",
    "onTapCancel",
    "onHoverStart",
    "onHoverEnd",
    "whileFocus",
    "whileTap",
    "whileHover",
    "whileInView",
    "onViewportEnter",
    "onViewportLeave",
    "viewport",
    "layoutScroll"
]);
function isValidMotionProp(key) {
    return validMotionProps.has(key);
}
var shouldForward = function(key) {
    return !isValidMotionProp(key);
};
function loadExternalIsValidProp(isValidProp) {
    if (!isValidProp) return;
    shouldForward = function(key) {
        return key.startsWith("on") ? !isValidMotionProp(key) : isValidProp(key);
    };
}
try {
    loadExternalIsValidProp(__require("@emotion/is-prop-valid").default);
} catch (_a) {}
function filterProps(props, isDom, forwardMotionProps) {
    var filteredProps = {};
    for(var key in props){
        if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key) || props["draggable"] && key.startsWith("onDrag")) {
            filteredProps[key] = props[key];
        }
    }
    return filteredProps;
}
function calcOrigin(origin, offset, size) {
    return typeof origin === "string" ? origin : px.transform(offset + size * origin);
}
function calcSVGTransformOrigin(dimensions, originX, originY) {
    var pxOriginX = calcOrigin(originX, dimensions.x, dimensions.width);
    var pxOriginY = calcOrigin(originY, dimensions.y, dimensions.height);
    return "".concat(pxOriginX, " ").concat(pxOriginY);
}
var dashKeys = {
    offset: "stroke-dashoffset",
    array: "stroke-dasharray"
};
var camelKeys = {
    offset: "strokeDashoffset",
    array: "strokeDasharray"
};
function buildSVGPath(attrs, length, spacing, offset, useDashCase) {
    if (spacing === void 0) {
        spacing = 1;
    }
    if (offset === void 0) {
        offset = 0;
    }
    if (useDashCase === void 0) {
        useDashCase = true;
    }
    attrs.pathLength = 1;
    var keys = useDashCase ? dashKeys : camelKeys;
    attrs[keys.offset] = px.transform(-offset);
    var pathLength = px.transform(length);
    var pathSpacing = px.transform(spacing);
    attrs[keys.array] = "".concat(pathLength, " ").concat(pathSpacing);
}
function buildSVGAttrs(state, _a1, options, transformTemplate) {
    var attrX = _a1.attrX, attrY = _a1.attrY, originX = _a1.originX, originY = _a1.originY, pathLength = _a1.pathLength, _b = _a1.pathSpacing, pathSpacing = _b === void 0 ? 1 : _b, _c = _a1.pathOffset, pathOffset = _c === void 0 ? 0 : _c, latest = __rest(_a1, [
        "attrX",
        "attrY",
        "originX",
        "originY",
        "pathLength",
        "pathSpacing",
        "pathOffset"
    ]);
    buildHTMLStyles(state, latest, options, transformTemplate);
    state.attrs = state.style;
    state.style = {};
    var attrs = state.attrs, style = state.style, dimensions = state.dimensions;
    if (attrs.transform) {
        if (dimensions) style.transform = attrs.transform;
        delete attrs.transform;
    }
    if (dimensions && (originX !== void 0 || originY !== void 0 || style.transform)) {
        style.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== void 0 ? originX : 0.5, originY !== void 0 ? originY : 0.5);
    }
    if (attrX !== void 0) attrs.x = attrX;
    if (attrY !== void 0) attrs.y = attrY;
    if (pathLength !== void 0) {
        buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
    }
}
var createSvgRenderState = function() {
    return __assign(__assign({}, createHtmlRenderState()), {
        attrs: {}
    });
};
function useSVGProps(props, visualState) {
    var visualProps = useMemo(function() {
        var state = createSvgRenderState();
        buildSVGAttrs(state, visualState, {
            enableHardwareAcceleration: false
        }, props.transformTemplate);
        return __assign(__assign({}, state.attrs), {
            style: __assign({}, state.style)
        });
    }, [
        visualState
    ]);
    if (props.style) {
        var rawStyles = {};
        copyRawValuesOnly(rawStyles, props.style, props);
        visualProps.style = __assign(__assign({}, rawStyles), visualProps.style);
    }
    return visualProps;
}
function createUseRender(forwardMotionProps) {
    if (forwardMotionProps === void 0) {
        forwardMotionProps = false;
    }
    var useRender = function(Component6, props, projectionId, ref, _a2, isStatic) {
        var latestValues = _a2.latestValues;
        var useVisualProps = isSVGComponent(Component6) ? useSVGProps : useHTMLProps;
        var visualProps = useVisualProps(props, latestValues, isStatic);
        var filteredProps = filterProps(props, typeof Component6 === "string", forwardMotionProps);
        var elementProps = __assign(__assign(__assign({}, filteredProps), visualProps), {
            ref
        });
        if (projectionId) {
            elementProps["data-projection-id"] = projectionId;
        }
        return createElement(Component6, elementProps);
    };
    return useRender;
}
var CAMEL_CASE_PATTERN = /([a-z])([A-Z])/g;
var REPLACE_TEMPLATE = "$1-$2";
var camelToDash = function(str) {
    return str.replace(CAMEL_CASE_PATTERN, REPLACE_TEMPLATE).toLowerCase();
};
function renderHTML(element, _a3, styleProp, projection) {
    var style = _a3.style, vars = _a3.vars;
    Object.assign(element.style, style, projection && projection.getProjectionStyles(styleProp));
    for(var key in vars){
        element.style.setProperty(key, vars[key]);
    }
}
var camelCaseAttributes = new Set([
    "baseFrequency",
    "diffuseConstant",
    "kernelMatrix",
    "kernelUnitLength",
    "keySplines",
    "keyTimes",
    "limitingConeAngle",
    "markerHeight",
    "markerWidth",
    "numOctaves",
    "targetX",
    "targetY",
    "surfaceScale",
    "specularConstant",
    "specularExponent",
    "stdDeviation",
    "tableValues",
    "viewBox",
    "gradientTransform",
    "pathLength"
]);
function renderSVG(element, renderState) {
    renderHTML(element, renderState);
    for(var key in renderState.attrs){
        element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
    }
}
function scrapeMotionValuesFromProps(props) {
    var style = props.style;
    var newValues = {};
    for(var key in style){
        if (isMotionValue(style[key]) || isForcedMotionValue(key, props)) {
            newValues[key] = style[key];
        }
    }
    return newValues;
}
function scrapeMotionValuesFromProps2(props) {
    var newValues = scrapeMotionValuesFromProps(props);
    for(var key in props){
        if (isMotionValue(props[key])) {
            var targetKey = key === "x" || key === "y" ? "attr" + key.toUpperCase() : key;
            newValues[targetKey] = props[key];
        }
    }
    return newValues;
}
function isAnimationControls(v63) {
    return typeof v63 === "object" && typeof v63.start === "function";
}
function makeState(_a4, props, context, presenceContext) {
    var scrapeMotionValuesFromProps3 = _a4.scrapeMotionValuesFromProps, createRenderState = _a4.createRenderState, onMount = _a4.onMount;
    var state = {
        latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps3),
        renderState: createRenderState()
    };
    if (onMount) {
        state.mount = function(instance) {
            return onMount(props, instance, state);
        };
    }
    return state;
}
var makeUseVisualState = function(config) {
    return function(props, isStatic) {
        var context = useContext(MotionContext);
        var presenceContext = useContext(PresenceContext);
        return isStatic ? makeState(config, props, context, presenceContext) : useConstant(function() {
            return makeState(config, props, context, presenceContext);
        });
    };
};
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
    var values = {};
    var blockInitialAnimation = (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.initial) === false;
    var motionValues = scrapeMotionValues(props);
    for(var key in motionValues){
        values[key] = resolveMotionValue(motionValues[key]);
    }
    var initial = props.initial, animate3 = props.animate;
    var isControllingVariants = checkIfControllingVariants(props);
    var isVariantNode = checkIfVariantNode(props);
    if (context && isVariantNode && !isControllingVariants && props.inherit !== false) {
        initial !== null && initial !== void 0 ? initial : initial = context.initial;
        animate3 !== null && animate3 !== void 0 ? animate3 : animate3 = context.animate;
    }
    var initialAnimationIsBlocked = blockInitialAnimation || initial === false;
    var variantToSet = initialAnimationIsBlocked ? animate3 : initial;
    if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
        var list = Array.isArray(variantToSet) ? variantToSet : [
            variantToSet
        ];
        list.forEach(function(definition) {
            var resolved = resolveVariantFromProps(props, definition);
            if (!resolved) return;
            var transitionEnd = resolved.transitionEnd;
            resolved.transition;
            var target = __rest(resolved, [
                "transitionEnd",
                "transition"
            ]);
            for(var key2 in target){
                var valueTarget = target[key2];
                if (Array.isArray(valueTarget)) {
                    var index = initialAnimationIsBlocked ? valueTarget.length - 1 : 0;
                    valueTarget = valueTarget[index];
                }
                if (valueTarget !== null) {
                    values[key2] = valueTarget;
                }
            }
            for(var key2 in transitionEnd)values[key2] = transitionEnd[key2];
        });
    }
    return values;
}
var svgMotionConfig = {
    useVisualState: makeUseVisualState({
        scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2,
        createRenderState: createSvgRenderState,
        onMount: function(props, instance, _a5) {
            var renderState = _a5.renderState, latestValues = _a5.latestValues;
            try {
                renderState.dimensions = typeof instance.getBBox === "function" ? instance.getBBox() : instance.getBoundingClientRect();
            } catch (e) {
                renderState.dimensions = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                };
            }
            buildSVGAttrs(renderState, latestValues, {
                enableHardwareAcceleration: false
            }, props.transformTemplate);
            renderSVG(instance, renderState);
        }
    })
};
var htmlMotionConfig = {
    useVisualState: makeUseVisualState({
        scrapeMotionValuesFromProps,
        createRenderState: createHtmlRenderState
    })
};
function createDomMotionConfig(Component7, _a6, preloadedFeatures, createVisualElement, projectionNodeConstructor) {
    var _b = _a6.forwardMotionProps, forwardMotionProps = _b === void 0 ? false : _b;
    var baseConfig = isSVGComponent(Component7) ? svgMotionConfig : htmlMotionConfig;
    return __assign(__assign({}, baseConfig), {
        preloadedFeatures,
        useRender: createUseRender(forwardMotionProps),
        createVisualElement,
        projectionNodeConstructor,
        Component: Component7
    });
}
var AnimationType;
(function(AnimationType2) {
    AnimationType2["Animate"] = "animate";
    AnimationType2["Hover"] = "whileHover";
    AnimationType2["Tap"] = "whileTap";
    AnimationType2["Drag"] = "whileDrag";
    AnimationType2["Focus"] = "whileFocus";
    AnimationType2["InView"] = "whileInView";
    AnimationType2["Exit"] = "exit";
})(AnimationType || (AnimationType = {}));
function addDomEvent(target, eventName, handler, options) {
    target.addEventListener(eventName, handler, options);
    return function() {
        return target.removeEventListener(eventName, handler, options);
    };
}
function useDomEvent(ref, eventName, handler, options) {
    useEffect(function() {
        var element = ref.current;
        if (handler && element) {
            return addDomEvent(element, eventName, handler, options);
        }
    }, [
        ref,
        eventName,
        handler,
        options
    ]);
}
function useFocusGesture(_a7) {
    var whileFocus = _a7.whileFocus, visualElement2 = _a7.visualElement;
    var onFocus = function() {
        var _a2;
        (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.Focus, true);
    };
    var onBlur = function() {
        var _a2;
        (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.Focus, false);
    };
    useDomEvent(visualElement2, "focus", whileFocus ? onFocus : void 0);
    useDomEvent(visualElement2, "blur", whileFocus ? onBlur : void 0);
}
function isMouseEvent(event) {
    if (typeof PointerEvent !== "undefined" && event instanceof PointerEvent) {
        return !!(event.pointerType === "mouse");
    }
    return event instanceof MouseEvent;
}
function isTouchEvent(event) {
    var hasTouches = !!event.touches;
    return hasTouches;
}
function filterPrimaryPointer(eventHandler) {
    return function(event) {
        var isMouseEvent2 = event instanceof MouseEvent;
        var isPrimaryPointer = !isMouseEvent2 || isMouseEvent2 && event.button === 0;
        if (isPrimaryPointer) {
            eventHandler(event);
        }
    };
}
var defaultPagePoint = {
    pageX: 0,
    pageY: 0
};
function pointFromTouch(e10, pointType) {
    if (pointType === void 0) {
        pointType = "page";
    }
    var primaryTouch = e10.touches[0] || e10.changedTouches[0];
    var point = primaryTouch || defaultPagePoint;
    return {
        x: point[pointType + "X"],
        y: point[pointType + "Y"]
    };
}
function pointFromMouse(point, pointType) {
    if (pointType === void 0) {
        pointType = "page";
    }
    return {
        x: point[pointType + "X"],
        y: point[pointType + "Y"]
    };
}
function extractEventInfo(event, pointType) {
    if (pointType === void 0) {
        pointType = "page";
    }
    return {
        point: isTouchEvent(event) ? pointFromTouch(event, pointType) : pointFromMouse(event, pointType)
    };
}
var wrapHandler = function(handler, shouldFilterPrimaryPointer) {
    if (shouldFilterPrimaryPointer === void 0) {
        shouldFilterPrimaryPointer = false;
    }
    var listener = function(event) {
        return handler(event, extractEventInfo(event));
    };
    return shouldFilterPrimaryPointer ? filterPrimaryPointer(listener) : listener;
};
var supportsPointerEvents = function() {
    return isBrowser && window.onpointerdown === null;
};
var supportsTouchEvents = function() {
    return isBrowser && window.ontouchstart === null;
};
var supportsMouseEvents = function() {
    return isBrowser && window.onmousedown === null;
};
var mouseEventNames = {
    pointerdown: "mousedown",
    pointermove: "mousemove",
    pointerup: "mouseup",
    pointercancel: "mousecancel",
    pointerover: "mouseover",
    pointerout: "mouseout",
    pointerenter: "mouseenter",
    pointerleave: "mouseleave"
};
var touchEventNames = {
    pointerdown: "touchstart",
    pointermove: "touchmove",
    pointerup: "touchend",
    pointercancel: "touchcancel"
};
function getPointerEventName(name) {
    if (supportsPointerEvents()) {
        return name;
    } else if (supportsTouchEvents()) {
        return touchEventNames[name];
    } else if (supportsMouseEvents()) {
        return mouseEventNames[name];
    }
    return name;
}
function addPointerEvent(target, eventName, handler, options) {
    return addDomEvent(target, getPointerEventName(eventName), wrapHandler(handler, eventName === "pointerdown"), options);
}
function usePointerEvent(ref, eventName, handler, options) {
    return useDomEvent(ref, getPointerEventName(eventName), handler && wrapHandler(handler, eventName === "pointerdown"), options);
}
function createLock(name) {
    var lock = null;
    return function() {
        var openLock = function() {
            lock = null;
        };
        if (lock === null) {
            lock = name;
            return openLock;
        }
        return false;
    };
}
var globalHorizontalLock = createLock("dragHorizontal");
var globalVerticalLock = createLock("dragVertical");
function getGlobalLock(drag2) {
    var lock = false;
    if (drag2 === "y") {
        lock = globalVerticalLock();
    } else if (drag2 === "x") {
        lock = globalHorizontalLock();
    } else {
        var openHorizontal_1 = globalHorizontalLock();
        var openVertical_1 = globalVerticalLock();
        if (openHorizontal_1 && openVertical_1) {
            lock = function() {
                openHorizontal_1();
                openVertical_1();
            };
        } else {
            if (openHorizontal_1) openHorizontal_1();
            if (openVertical_1) openVertical_1();
        }
    }
    return lock;
}
function isDragActive() {
    var openGestureLock = getGlobalLock(true);
    if (!openGestureLock) return true;
    openGestureLock();
    return false;
}
function createHoverEvent(visualElement2, isActive, callback) {
    return function(event, info) {
        var _a8;
        if (!isMouseEvent(event) || isDragActive()) return;
        (_a8 = visualElement2.animationState) === null || _a8 === void 0 ? void 0 : _a8.setActive(AnimationType.Hover, isActive);
        callback === null || callback === void 0 ? void 0 : callback(event, info);
    };
}
function useHoverGesture(_a9) {
    var onHoverStart = _a9.onHoverStart, onHoverEnd = _a9.onHoverEnd, whileHover = _a9.whileHover, visualElement2 = _a9.visualElement;
    usePointerEvent(visualElement2, "pointerenter", onHoverStart || whileHover ? createHoverEvent(visualElement2, true, onHoverStart) : void 0);
    usePointerEvent(visualElement2, "pointerleave", onHoverEnd || whileHover ? createHoverEvent(visualElement2, false, onHoverEnd) : void 0);
}
var isNodeOrChild = function(parent, child) {
    if (!child) {
        return false;
    } else if (parent === child) {
        return true;
    } else {
        return isNodeOrChild(parent, child.parentElement);
    }
};
function useUnmountEffect(callback) {
    return useEffect(function() {
        return function() {
            return callback();
        };
    }, []);
}
function useTapGesture(_a10) {
    var onTap = _a10.onTap, onTapStart = _a10.onTapStart, onTapCancel = _a10.onTapCancel, whileTap = _a10.whileTap, visualElement2 = _a10.visualElement;
    var hasPressListeners = onTap || onTapStart || onTapCancel || whileTap;
    var isPressing = useRef(false);
    var cancelPointerEndListeners = useRef(null);
    function removePointerEndListener() {
        var _a2;
        (_a2 = cancelPointerEndListeners.current) === null || _a2 === void 0 ? void 0 : _a2.call(cancelPointerEndListeners);
        cancelPointerEndListeners.current = null;
    }
    function checkPointerEnd() {
        var _a2;
        removePointerEndListener();
        isPressing.current = false;
        (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.Tap, false);
        return !isDragActive();
    }
    function onPointerUp(event, info) {
        if (!checkPointerEnd()) return;
        !isNodeOrChild(visualElement2.getInstance(), event.target) ? onTapCancel === null || onTapCancel === void 0 ? void 0 : onTapCancel(event, info) : onTap === null || onTap === void 0 ? void 0 : onTap(event, info);
    }
    function onPointerCancel(event, info) {
        if (!checkPointerEnd()) return;
        onTapCancel === null || onTapCancel === void 0 ? void 0 : onTapCancel(event, info);
    }
    function onPointerDown(event, info) {
        var _a2;
        removePointerEndListener();
        if (isPressing.current) return;
        isPressing.current = true;
        cancelPointerEndListeners.current = pipe(addPointerEvent(window, "pointerup", onPointerUp), addPointerEvent(window, "pointercancel", onPointerCancel));
        (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.Tap, true);
        onTapStart === null || onTapStart === void 0 ? void 0 : onTapStart(event, info);
    }
    usePointerEvent(visualElement2, "pointerdown", hasPressListeners ? onPointerDown : void 0);
    useUnmountEffect(removePointerEndListener);
}
var observerCallbacks = new WeakMap();
var observers = new WeakMap();
var fireObserverCallback = function(entry) {
    var _a11;
    (_a11 = observerCallbacks.get(entry.target)) === null || _a11 === void 0 ? void 0 : _a11(entry);
};
var fireAllObserverCallbacks = function(entries) {
    entries.forEach(fireObserverCallback);
};
function initIntersectionObserver(_a12) {
    var root = _a12.root, options = __rest(_a12, [
        "root"
    ]);
    var lookupRoot = root || document;
    if (!observers.has(lookupRoot)) {
        observers.set(lookupRoot, {});
    }
    var rootObservers = observers.get(lookupRoot);
    var key = JSON.stringify(options);
    if (!rootObservers[key]) {
        rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, __assign({
            root
        }, options));
    }
    return rootObservers[key];
}
function observeIntersection(element, options, callback) {
    var rootInteresectionObserver = initIntersectionObserver(options);
    observerCallbacks.set(element, callback);
    rootInteresectionObserver.observe(element);
    return function() {
        observerCallbacks.delete(element);
        rootInteresectionObserver.unobserve(element);
    };
}
function useViewport(_a13) {
    var visualElement2 = _a13.visualElement, whileInView = _a13.whileInView, onViewportEnter = _a13.onViewportEnter, onViewportLeave = _a13.onViewportLeave, _b = _a13.viewport, viewport = _b === void 0 ? {} : _b;
    var state = useRef({
        hasEnteredView: false,
        isInView: false
    });
    var shouldObserve = Boolean(whileInView || onViewportEnter || onViewportLeave);
    if (viewport.once && state.current.hasEnteredView) shouldObserve = false;
    var useObserver = typeof IntersectionObserver === "undefined" ? useMissingIntersectionObserver : useIntersectionObserver;
    useObserver(shouldObserve, state.current, visualElement2, viewport);
}
var thresholdNames = {
    some: 0,
    all: 1
};
function useIntersectionObserver(shouldObserve, state, visualElement2, _a14) {
    var root = _a14.root, rootMargin = _a14.margin, _b = _a14.amount, amount = _b === void 0 ? "some" : _b, once = _a14.once;
    useEffect(function() {
        if (!shouldObserve) return;
        var options = {
            root: root === null || root === void 0 ? void 0 : root.current,
            rootMargin,
            threshold: typeof amount === "number" ? amount : thresholdNames[amount]
        };
        var intersectionCallback = function(entry) {
            var _a2;
            var isIntersecting = entry.isIntersecting;
            if (state.isInView === isIntersecting) return;
            state.isInView = isIntersecting;
            if (once && !isIntersecting && state.hasEnteredView) {
                return;
            } else if (isIntersecting) {
                state.hasEnteredView = true;
            }
            (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.InView, isIntersecting);
            var props = visualElement2.getProps();
            var callback = isIntersecting ? props.onViewportEnter : props.onViewportLeave;
            callback === null || callback === void 0 ? void 0 : callback(entry);
        };
        return observeIntersection(visualElement2.getInstance(), options, intersectionCallback);
    }, [
        shouldObserve,
        root,
        rootMargin,
        amount
    ]);
}
function useMissingIntersectionObserver(shouldObserve, state, visualElement2, _a15) {
    var _b = _a15.fallback, fallback = _b === void 0 ? true : _b;
    useEffect(function() {
        if (!shouldObserve || !fallback) return;
        requestAnimationFrame(function() {
            var _a2;
            state.hasEnteredView = true;
            var onViewportEnter = visualElement2.getProps().onViewportEnter;
            onViewportEnter === null || onViewportEnter === void 0 ? void 0 : onViewportEnter(null);
            (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.InView, true);
        });
    }, [
        shouldObserve
    ]);
}
var makeRenderlessComponent = function(hook) {
    return function(props) {
        hook(props);
        return null;
    };
};
var gestureAnimations = {
    inView: makeRenderlessComponent(useViewport),
    tap: makeRenderlessComponent(useTapGesture),
    focus: makeRenderlessComponent(useFocusGesture),
    hover: makeRenderlessComponent(useHoverGesture)
};
function usePresence() {
    var context = useContext(PresenceContext);
    if (context === null) return [
        true,
        null
    ];
    var isPresent = context.isPresent, onExitComplete = context.onExitComplete, register = context.register;
    var id2 = useUniqueId();
    useEffect(function() {
        return register(id2);
    }, []);
    var safeToRemove = function() {
        return onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete(id2);
    };
    return !isPresent && onExitComplete ? [
        false,
        safeToRemove
    ] : [
        true
    ];
}
var counter = 0;
var incrementId = function() {
    return counter++;
};
var useUniqueId = function() {
    return useConstant(incrementId);
};
function shallowCompare(next, prev) {
    if (!Array.isArray(prev)) return false;
    var prevLength = prev.length;
    if (prevLength !== next.length) return false;
    for(var i40 = 0; i40 < prevLength; i40++){
        if (prev[i40] !== next[i40]) return false;
    }
    return true;
}
var isNumericalString = function(v64) {
    return /^\-?\d*\.?\d+$/.test(v64);
};
var isZeroValueString = function(v65) {
    return /^0[^.\s]+$/.test(v65);
};
var testValueType = function(v66) {
    return function(type) {
        return type.test(v66);
    };
};
var auto = {
    test: function(v67) {
        return v67 === "auto";
    },
    parse: function(v68) {
        return v68;
    }
};
var dimensionValueTypes = [
    number,
    px,
    percent,
    degrees,
    vw,
    vh,
    auto
];
var findDimensionValueType = function(v69) {
    return dimensionValueTypes.find(testValueType(v69));
};
var valueTypes = __spreadArray(__spreadArray([], __read(dimensionValueTypes), false), [
    color,
    complex
], false);
var findValueType = function(v70) {
    return valueTypes.find(testValueType(v70));
};
function setMotionValue(visualElement2, key, value) {
    if (visualElement2.hasValue(key)) {
        visualElement2.getValue(key).set(value);
    } else {
        visualElement2.addValue(key, motionValue(value));
    }
}
function setTarget(visualElement2, definition) {
    var resolved = resolveVariant(visualElement2, definition);
    var _a16 = resolved ? visualElement2.makeTargetAnimatable(resolved, false) : {}, _b = _a16.transitionEnd, transitionEnd = _b === void 0 ? {} : _b;
    _a16.transition;
    var target = __rest(_a16, [
        "transitionEnd",
        "transition"
    ]);
    target = __assign(__assign({}, target), transitionEnd);
    for(var key in target){
        var value = resolveFinalValueInKeyframes(target[key]);
        setMotionValue(visualElement2, key, value);
    }
}
function checkTargetForNewValues(visualElement2, target, origin) {
    var _a17, _b, _c;
    var _d;
    var newValueKeys = Object.keys(target).filter(function(key2) {
        return !visualElement2.hasValue(key2);
    });
    var numNewValues = newValueKeys.length;
    if (!numNewValues) return;
    for(var i41 = 0; i41 < numNewValues; i41++){
        var key = newValueKeys[i41];
        var targetValue = target[key];
        var value = null;
        if (Array.isArray(targetValue)) {
            value = targetValue[0];
        }
        if (value === null) {
            value = (_b = (_a17 = origin[key]) !== null && _a17 !== void 0 ? _a17 : visualElement2.readValue(key)) !== null && _b !== void 0 ? _b : target[key];
        }
        if (value === void 0 || value === null) continue;
        if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) {
            value = parseFloat(value);
        } else if (!findValueType(value) && complex.test(targetValue)) {
            value = getAnimatableNone2(key, targetValue);
        }
        visualElement2.addValue(key, motionValue(value));
        (_c = (_d = origin)[key]) !== null && _c !== void 0 ? _c : _d[key] = value;
        visualElement2.setBaseTarget(key, value);
    }
}
function getOriginFromTransition(key, transition) {
    if (!transition) return;
    var valueTransition = transition[key] || transition["default"] || transition;
    return valueTransition.from;
}
function getOrigin(target, transition, visualElement2) {
    var _a18, _b;
    var origin = {};
    for(var key in target){
        origin[key] = (_a18 = getOriginFromTransition(key, transition)) !== null && _a18 !== void 0 ? _a18 : (_b = visualElement2.getValue(key)) === null || _b === void 0 ? void 0 : _b.get();
    }
    return origin;
}
function animateVisualElement(visualElement2, definition, options) {
    if (options === void 0) {
        options = {};
    }
    visualElement2.notifyAnimationStart(definition);
    var animation;
    if (Array.isArray(definition)) {
        var animations2 = definition.map(function(variant) {
            return animateVariant(visualElement2, variant, options);
        });
        animation = Promise.all(animations2);
    } else if (typeof definition === "string") {
        animation = animateVariant(visualElement2, definition, options);
    } else {
        var resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement2, definition, options.custom) : definition;
        animation = animateTarget(visualElement2, resolvedDefinition, options);
    }
    return animation.then(function() {
        return visualElement2.notifyAnimationComplete(definition);
    });
}
function animateVariant(visualElement2, variant, options) {
    var _a19;
    if (options === void 0) {
        options = {};
    }
    var resolved = resolveVariant(visualElement2, variant, options.custom);
    var _b = (resolved || {}).transition, transition = _b === void 0 ? visualElement2.getDefaultTransition() || {} : _b;
    if (options.transitionOverride) {
        transition = options.transitionOverride;
    }
    var getAnimation2 = resolved ? function() {
        return animateTarget(visualElement2, resolved, options);
    } : function() {
        return Promise.resolve();
    };
    var getChildAnimations = ((_a19 = visualElement2.variantChildren) === null || _a19 === void 0 ? void 0 : _a19.size) ? function(forwardDelay) {
        if (forwardDelay === void 0) {
            forwardDelay = 0;
        }
        var _a2 = transition.delayChildren, delayChildren = _a2 === void 0 ? 0 : _a2, staggerChildren = transition.staggerChildren, staggerDirection = transition.staggerDirection;
        return animateChildren(visualElement2, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
    } : function() {
        return Promise.resolve();
    };
    var when = transition.when;
    if (when) {
        var _c = __read(when === "beforeChildren" ? [
            getAnimation2,
            getChildAnimations
        ] : [
            getChildAnimations,
            getAnimation2
        ], 2), first = _c[0], last = _c[1];
        return first().then(last);
    } else {
        return Promise.all([
            getAnimation2(),
            getChildAnimations(options.delay)
        ]);
    }
}
function animateTarget(visualElement2, definition, _a20) {
    var _b;
    var _c = _a20 === void 0 ? {} : _a20, _d = _c.delay, delay = _d === void 0 ? 0 : _d, transitionOverride = _c.transitionOverride, type = _c.type;
    var _e5 = visualElement2.makeTargetAnimatable(definition), _f = _e5.transition, transition = _f === void 0 ? visualElement2.getDefaultTransition() : _f, transitionEnd = _e5.transitionEnd, target = __rest(_e5, [
        "transition",
        "transitionEnd"
    ]);
    if (transitionOverride) transition = transitionOverride;
    var animations2 = [];
    var animationTypeState = type && ((_b = visualElement2.animationState) === null || _b === void 0 ? void 0 : _b.getState()[type]);
    for(var key in target){
        var value = visualElement2.getValue(key);
        var valueTarget = target[key];
        if (!value || valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
            continue;
        }
        var valueTransition = __assign({
            delay
        }, transition);
        if (visualElement2.shouldReduceMotion && isTransformProp(key)) {
            valueTransition = __assign(__assign({}, valueTransition), {
                type: false,
                delay: 0
            });
        }
        var animation = startAnimation(key, value, valueTarget, valueTransition);
        animations2.push(animation);
    }
    return Promise.all(animations2).then(function() {
        transitionEnd && setTarget(visualElement2, transitionEnd);
    });
}
function animateChildren(visualElement2, variant, delayChildren, staggerChildren, staggerDirection, options) {
    if (delayChildren === void 0) {
        delayChildren = 0;
    }
    if (staggerChildren === void 0) {
        staggerChildren = 0;
    }
    if (staggerDirection === void 0) {
        staggerDirection = 1;
    }
    var animations2 = [];
    var maxStaggerDuration = (visualElement2.variantChildren.size - 1) * staggerChildren;
    var generateStaggerDuration = staggerDirection === 1 ? function(i42) {
        if (i42 === void 0) {
            i42 = 0;
        }
        return i42 * staggerChildren;
    } : function(i43) {
        if (i43 === void 0) {
            i43 = 0;
        }
        return maxStaggerDuration - i43 * staggerChildren;
    };
    Array.from(visualElement2.variantChildren).sort(sortByTreeOrder).forEach(function(child, i44) {
        animations2.push(animateVariant(child, variant, __assign(__assign({}, options), {
            delay: delayChildren + generateStaggerDuration(i44)
        })).then(function() {
            return child.notifyAnimationComplete(variant);
        }));
    });
    return Promise.all(animations2);
}
function sortByTreeOrder(a29, b2) {
    return a29.sortNodePosition(b2);
}
function shouldBlockAnimation(_a21, key) {
    var protectedKeys = _a21.protectedKeys, needsAnimating = _a21.needsAnimating;
    var shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
    needsAnimating[key] = false;
    return shouldBlock;
}
var variantPriorityOrder = [
    AnimationType.Animate,
    AnimationType.InView,
    AnimationType.Focus,
    AnimationType.Hover,
    AnimationType.Tap,
    AnimationType.Drag,
    AnimationType.Exit
];
var reversePriorityOrder = __spreadArray([], __read(variantPriorityOrder), false).reverse();
var numAnimationTypes = variantPriorityOrder.length;
function animateList(visualElement2) {
    return function(animations2) {
        return Promise.all(animations2.map(function(_a22) {
            var animation = _a22.animation, options = _a22.options;
            return animateVisualElement(visualElement2, animation, options);
        }));
    };
}
function createAnimationState(visualElement2) {
    var animate3 = animateList(visualElement2);
    var state = createState();
    var allAnimatedKeys = {};
    var isInitialRender = true;
    var buildResolvedTypeValues = function(acc, definition) {
        var resolved = resolveVariant(visualElement2, definition);
        if (resolved) {
            resolved.transition;
            var transitionEnd = resolved.transitionEnd, target = __rest(resolved, [
                "transition",
                "transitionEnd"
            ]);
            acc = __assign(__assign(__assign({}, acc), target), transitionEnd);
        }
        return acc;
    };
    function isAnimated(key) {
        return allAnimatedKeys[key] !== void 0;
    }
    function setAnimateFunction(makeAnimator) {
        animate3 = makeAnimator(visualElement2);
    }
    function animateChanges(options, changedActiveType) {
        var _a23;
        var props = visualElement2.getProps();
        var context = visualElement2.getVariantContext(true) || {};
        var animations2 = [];
        var removedKeys = new Set();
        var encounteredKeys = {};
        var removedVariantIndex = Infinity;
        var _loop_1 = function(i2) {
            var type = reversePriorityOrder[i2];
            var typeState = state[type];
            var prop = (_a23 = props[type]) !== null && _a23 !== void 0 ? _a23 : context[type];
            var propIsVariant = isVariantLabel(prop);
            var activeDelta = type === changedActiveType ? typeState.isActive : null;
            if (activeDelta === false) removedVariantIndex = i2;
            var isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
            if (isInherited && isInitialRender && visualElement2.manuallyAnimateOnMount) {
                isInherited = false;
            }
            typeState.protectedKeys = __assign({}, encounteredKeys);
            if (!typeState.isActive && activeDelta === null || !prop && !typeState.prevProp || isAnimationControls(prop) || typeof prop === "boolean") {
                return "continue";
            }
            var variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
            var shouldAnimateType = variantDidChange || type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || i2 > removedVariantIndex && propIsVariant;
            var definitionList = Array.isArray(prop) ? prop : [
                prop
            ];
            var resolvedValues = definitionList.reduce(buildResolvedTypeValues, {});
            if (activeDelta === false) resolvedValues = {};
            var _b = typeState.prevResolvedValues, prevResolvedValues = _b === void 0 ? {} : _b;
            var allKeys = __assign(__assign({}, prevResolvedValues), resolvedValues);
            var markToAnimate = function(key2) {
                shouldAnimateType = true;
                removedKeys.delete(key2);
                typeState.needsAnimating[key2] = true;
            };
            for(var key in allKeys){
                var next = resolvedValues[key];
                var prev = prevResolvedValues[key];
                if (encounteredKeys.hasOwnProperty(key)) continue;
                if (next !== prev) {
                    if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
                        if (!shallowCompare(next, prev) || variantDidChange) {
                            markToAnimate(key);
                        } else {
                            typeState.protectedKeys[key] = true;
                        }
                    } else if (next !== void 0) {
                        markToAnimate(key);
                    } else {
                        removedKeys.add(key);
                    }
                } else if (next !== void 0 && removedKeys.has(key)) {
                    markToAnimate(key);
                } else {
                    typeState.protectedKeys[key] = true;
                }
            }
            typeState.prevProp = prop;
            typeState.prevResolvedValues = resolvedValues;
            if (typeState.isActive) {
                encounteredKeys = __assign(__assign({}, encounteredKeys), resolvedValues);
            }
            if (isInitialRender && visualElement2.blockInitialAnimation) {
                shouldAnimateType = false;
            }
            if (shouldAnimateType && !isInherited) {
                animations2.push.apply(animations2, __spreadArray([], __read(definitionList.map(function(animation) {
                    return {
                        animation,
                        options: __assign({
                            type
                        }, options)
                    };
                })), false));
            }
        };
        for(var i45 = 0; i45 < numAnimationTypes; i45++){
            _loop_1(i45);
        }
        allAnimatedKeys = __assign({}, encounteredKeys);
        if (removedKeys.size) {
            var fallbackAnimation_1 = {};
            removedKeys.forEach(function(key) {
                var fallbackTarget = visualElement2.getBaseTarget(key);
                if (fallbackTarget !== void 0) {
                    fallbackAnimation_1[key] = fallbackTarget;
                }
            });
            animations2.push({
                animation: fallbackAnimation_1
            });
        }
        var shouldAnimate = Boolean(animations2.length);
        if (isInitialRender && props.initial === false && !visualElement2.manuallyAnimateOnMount) {
            shouldAnimate = false;
        }
        isInitialRender = false;
        return shouldAnimate ? animate3(animations2) : Promise.resolve();
    }
    function setActive(type, isActive, options) {
        var _a24;
        if (state[type].isActive === isActive) return Promise.resolve();
        (_a24 = visualElement2.variantChildren) === null || _a24 === void 0 ? void 0 : _a24.forEach(function(child) {
            var _a2;
            return (_a2 = child.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(type, isActive);
        });
        state[type].isActive = isActive;
        return animateChanges(options, type);
    }
    return {
        isAnimated,
        animateChanges,
        setActive,
        setAnimateFunction,
        getState: function() {
            return state;
        }
    };
}
function checkVariantsDidChange(prev, next) {
    if (typeof next === "string") {
        return next !== prev;
    } else if (isVariantLabels(next)) {
        return !shallowCompare(next, prev);
    }
    return false;
}
function createTypeState(isActive) {
    if (isActive === void 0) {
        isActive = false;
    }
    return {
        isActive,
        protectedKeys: {},
        needsAnimating: {},
        prevResolvedValues: {}
    };
}
function createState() {
    var _a25;
    return _a25 = {}, _a25[AnimationType.Animate] = createTypeState(true), _a25[AnimationType.InView] = createTypeState(), _a25[AnimationType.Hover] = createTypeState(), _a25[AnimationType.Tap] = createTypeState(), _a25[AnimationType.Drag] = createTypeState(), _a25[AnimationType.Focus] = createTypeState(), _a25[AnimationType.Exit] = createTypeState(), _a25;
}
var animations = {
    animation: makeRenderlessComponent(function(_a26) {
        var visualElement2 = _a26.visualElement, animate3 = _a26.animate;
        visualElement2.animationState || (visualElement2.animationState = createAnimationState(visualElement2));
        if (isAnimationControls(animate3)) {
            useEffect(function() {
                return animate3.subscribe(visualElement2);
            }, [
                animate3
            ]);
        }
    }),
    exit: makeRenderlessComponent(function(props) {
        var custom = props.custom, visualElement2 = props.visualElement;
        var _a27 = __read(usePresence(), 2), isPresent = _a27[0], safeToRemove = _a27[1];
        var presenceContext = useContext(PresenceContext);
        useEffect(function() {
            var _a2, _b;
            visualElement2.isPresent = isPresent;
            var animation = (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.Exit, !isPresent, {
                custom: (_b = presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.custom) !== null && _b !== void 0 ? _b : custom
            });
            !isPresent && (animation === null || animation === void 0 ? void 0 : animation.then(safeToRemove));
        }, [
            isPresent
        ]);
    })
};
var PanSession = function() {
    function PanSession2(event, handlers, _a28) {
        var _this = this;
        var _b = _a28 === void 0 ? {} : _a28, transformPagePoint = _b.transformPagePoint;
        this.startEvent = null;
        this.lastMoveEvent = null;
        this.lastMoveEventInfo = null;
        this.handlers = {};
        this.updatePoint = function() {
            if (!(_this.lastMoveEvent && _this.lastMoveEventInfo)) return;
            var info2 = getPanInfo(_this.lastMoveEventInfo, _this.history);
            var isPanStarted = _this.startEvent !== null;
            var isDistancePastThreshold = distance(info2.offset, {
                x: 0,
                y: 0
            }) >= 3;
            if (!isPanStarted && !isDistancePastThreshold) return;
            var point2 = info2.point;
            var timestamp2 = getFrameData().timestamp;
            _this.history.push(__assign(__assign({}, point2), {
                timestamp: timestamp2
            }));
            var _a2 = _this.handlers, onStart = _a2.onStart, onMove = _a2.onMove;
            if (!isPanStarted) {
                onStart && onStart(_this.lastMoveEvent, info2);
                _this.startEvent = _this.lastMoveEvent;
            }
            onMove && onMove(_this.lastMoveEvent, info2);
        };
        this.handlePointerMove = function(event2, info2) {
            _this.lastMoveEvent = event2;
            _this.lastMoveEventInfo = transformPoint(info2, _this.transformPagePoint);
            if (isMouseEvent(event2) && event2.buttons === 0) {
                _this.handlePointerUp(event2, info2);
                return;
            }
            es_default.update(_this.updatePoint, true);
        };
        this.handlePointerUp = function(event2, info2) {
            _this.end();
            var _a2 = _this.handlers, onEnd = _a2.onEnd, onSessionEnd = _a2.onSessionEnd;
            var panInfo = getPanInfo(transformPoint(info2, _this.transformPagePoint), _this.history);
            if (_this.startEvent && onEnd) {
                onEnd(event2, panInfo);
            }
            onSessionEnd && onSessionEnd(event2, panInfo);
        };
        if (isTouchEvent(event) && event.touches.length > 1) return;
        this.handlers = handlers;
        this.transformPagePoint = transformPagePoint;
        var info = extractEventInfo(event);
        var initialInfo = transformPoint(info, this.transformPagePoint);
        var point = initialInfo.point;
        var timestamp = getFrameData().timestamp;
        this.history = [
            __assign(__assign({}, point), {
                timestamp
            })
        ];
        var onSessionStart = handlers.onSessionStart;
        onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
        this.removeListeners = pipe(addPointerEvent(window, "pointermove", this.handlePointerMove), addPointerEvent(window, "pointerup", this.handlePointerUp), addPointerEvent(window, "pointercancel", this.handlePointerUp));
    }
    PanSession2.prototype.updateHandlers = function(handlers) {
        this.handlers = handlers;
    };
    PanSession2.prototype.end = function() {
        this.removeListeners && this.removeListeners();
        cancelSync.update(this.updatePoint);
    };
    return PanSession2;
}();
function transformPoint(info, transformPagePoint) {
    return transformPagePoint ? {
        point: transformPagePoint(info.point)
    } : info;
}
function subtractPoint(a210, b2) {
    return {
        x: a210.x - b2.x,
        y: a210.y - b2.y
    };
}
function getPanInfo(_a29, history) {
    var point = _a29.point;
    return {
        point,
        delta: subtractPoint(point, lastDevicePoint(history)),
        offset: subtractPoint(point, startDevicePoint(history)),
        velocity: getVelocity2(history, 0.1)
    };
}
function startDevicePoint(history) {
    return history[0];
}
function lastDevicePoint(history) {
    return history[history.length - 1];
}
function getVelocity2(history, timeDelta) {
    if (history.length < 2) {
        return {
            x: 0,
            y: 0
        };
    }
    var i46 = history.length - 1;
    var timestampedPoint = null;
    var lastPoint = lastDevicePoint(history);
    while(i46 >= 0){
        timestampedPoint = history[i46];
        if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) {
            break;
        }
        i46--;
    }
    if (!timestampedPoint) {
        return {
            x: 0,
            y: 0
        };
    }
    var time = (lastPoint.timestamp - timestampedPoint.timestamp) / 1000;
    if (time === 0) {
        return {
            x: 0,
            y: 0
        };
    }
    var currentVelocity = {
        x: (lastPoint.x - timestampedPoint.x) / time,
        y: (lastPoint.y - timestampedPoint.y) / time
    };
    if (currentVelocity.x === Infinity) {
        currentVelocity.x = 0;
    }
    if (currentVelocity.y === Infinity) {
        currentVelocity.y = 0;
    }
    return currentVelocity;
}
function applyConstraints(point, _a30, elastic) {
    var min = _a30.min, max = _a30.max;
    if (min !== void 0 && point < min) {
        point = elastic ? mix(min, point, elastic.min) : Math.max(point, min);
    } else if (max !== void 0 && point > max) {
        point = elastic ? mix(max, point, elastic.max) : Math.min(point, max);
    }
    return point;
}
function calcRelativeAxisConstraints(axis, min, max) {
    return {
        min: min !== void 0 ? axis.min + min : void 0,
        max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
    };
}
function calcRelativeConstraints(layoutBox, _a31) {
    var top = _a31.top, left = _a31.left, bottom = _a31.bottom, right = _a31.right;
    return {
        x: calcRelativeAxisConstraints(layoutBox.x, left, right),
        y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
    };
}
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
    var _a32;
    var min = constraintsAxis.min - layoutAxis.min;
    var max = constraintsAxis.max - layoutAxis.max;
    if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
        _a32 = __read([
            max,
            min
        ], 2), min = _a32[0], max = _a32[1];
    }
    return {
        min,
        max
    };
}
function calcViewportConstraints(layoutBox, constraintsBox) {
    return {
        x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
        y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
    };
}
function calcOrigin2(source, target) {
    var origin = 0.5;
    var sourceLength = calcLength(source);
    var targetLength = calcLength(target);
    if (targetLength > sourceLength) {
        origin = progress(target.min, target.max - sourceLength, source.min);
    } else if (sourceLength > targetLength) {
        origin = progress(source.min, source.max - targetLength, target.min);
    }
    return clamp(0, 1, origin);
}
function rebaseAxisConstraints(layout, constraints) {
    var relativeConstraints = {};
    if (constraints.min !== void 0) {
        relativeConstraints.min = constraints.min - layout.min;
    }
    if (constraints.max !== void 0) {
        relativeConstraints.max = constraints.max - layout.min;
    }
    return relativeConstraints;
}
var defaultElastic = 0.35;
function resolveDragElastic(dragElastic) {
    if (dragElastic === void 0) {
        dragElastic = defaultElastic;
    }
    if (dragElastic === false) {
        dragElastic = 0;
    } else if (dragElastic === true) {
        dragElastic = defaultElastic;
    }
    return {
        x: resolveAxisElastic(dragElastic, "left", "right"),
        y: resolveAxisElastic(dragElastic, "top", "bottom")
    };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
    return {
        min: resolvePointElastic(dragElastic, minLabel),
        max: resolvePointElastic(dragElastic, maxLabel)
    };
}
function resolvePointElastic(dragElastic, label) {
    var _a33;
    return typeof dragElastic === "number" ? dragElastic : (_a33 = dragElastic[label]) !== null && _a33 !== void 0 ? _a33 : 0;
}
function convertBoundingBoxToBox(_a34) {
    var top = _a34.top, left = _a34.left, right = _a34.right, bottom = _a34.bottom;
    return {
        x: {
            min: left,
            max: right
        },
        y: {
            min: top,
            max: bottom
        }
    };
}
function convertBoxToBoundingBox(_a35) {
    var x7 = _a35.x, y5 = _a35.y;
    return {
        top: y5.min,
        right: x7.max,
        bottom: y5.max,
        left: x7.min
    };
}
function transformBoxPoints(point, transformPoint2) {
    if (!transformPoint2) return point;
    var topLeft = transformPoint2({
        x: point.left,
        y: point.top
    });
    var bottomRight = transformPoint2({
        x: point.right,
        y: point.bottom
    });
    return {
        top: topLeft.y,
        left: topLeft.x,
        bottom: bottomRight.y,
        right: bottomRight.x
    };
}
function measureViewportBox(instance, transformPoint2) {
    return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint2));
}
function measurePageBox(element, rootProjectionNode2, transformPagePoint) {
    var viewportBox = measureViewportBox(element, transformPagePoint);
    var scroll = rootProjectionNode2.scroll;
    if (scroll) {
        translateAxis(viewportBox.x, scroll.x);
        translateAxis(viewportBox.y, scroll.y);
    }
    return viewportBox;
}
var elementDragControls = new WeakMap();
var VisualElementDragControls = function() {
    function VisualElementDragControls2(visualElement2) {
        this.openGlobalLock = null;
        this.isDragging = false;
        this.currentDirection = null;
        this.originPoint = {
            x: 0,
            y: 0
        };
        this.constraints = false;
        this.hasMutatedConstraints = false;
        this.elastic = createBox();
        this.visualElement = visualElement2;
    }
    VisualElementDragControls2.prototype.start = function(originEvent, _a36) {
        var _this = this;
        var _b = _a36 === void 0 ? {} : _a36, _c = _b.snapToCursor, snapToCursor = _c === void 0 ? false : _c;
        if (this.visualElement.isPresent === false) return;
        var onSessionStart = function(event) {
            _this.stopAnimation();
            if (snapToCursor) {
                _this.snapToCursor(extractEventInfo(event, "page").point);
            }
        };
        var onStart = function(event, info) {
            var _a2;
            var _b2 = _this.getProps(), drag2 = _b2.drag, dragPropagation = _b2.dragPropagation, onDragStart = _b2.onDragStart;
            if (drag2 && !dragPropagation) {
                if (_this.openGlobalLock) _this.openGlobalLock();
                _this.openGlobalLock = getGlobalLock(drag2);
                if (!_this.openGlobalLock) return;
            }
            _this.isDragging = true;
            _this.currentDirection = null;
            _this.resolveConstraints();
            if (_this.visualElement.projection) {
                _this.visualElement.projection.isAnimationBlocked = true;
                _this.visualElement.projection.target = void 0;
            }
            eachAxis(function(axis) {
                var _a3, _b3;
                var current = _this.getAxisMotionValue(axis).get() || 0;
                if (percent.test(current)) {
                    var measuredAxis = (_b3 = (_a3 = _this.visualElement.projection) === null || _a3 === void 0 ? void 0 : _a3.layout) === null || _b3 === void 0 ? void 0 : _b3.actual[axis];
                    if (measuredAxis) {
                        var length_1 = calcLength(measuredAxis);
                        current = length_1 * (parseFloat(current) / 100);
                    }
                }
                _this.originPoint[axis] = current;
            });
            onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(event, info);
            (_a2 = _this.visualElement.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.Drag, true);
        };
        var onMove = function(event, info) {
            var _a2 = _this.getProps(), dragPropagation = _a2.dragPropagation, dragDirectionLock = _a2.dragDirectionLock, onDirectionLock = _a2.onDirectionLock, onDrag = _a2.onDrag;
            if (!dragPropagation && !_this.openGlobalLock) return;
            var offset = info.offset;
            if (dragDirectionLock && _this.currentDirection === null) {
                _this.currentDirection = getCurrentDirection(offset);
                if (_this.currentDirection !== null) {
                    onDirectionLock === null || onDirectionLock === void 0 ? void 0 : onDirectionLock(_this.currentDirection);
                }
                return;
            }
            _this.updateAxis("x", info.point, offset);
            _this.updateAxis("y", info.point, offset);
            _this.visualElement.syncRender();
            onDrag === null || onDrag === void 0 ? void 0 : onDrag(event, info);
        };
        var onSessionEnd = function(event, info) {
            return _this.stop(event, info);
        };
        this.panSession = new PanSession(originEvent, {
            onSessionStart,
            onStart,
            onMove,
            onSessionEnd
        }, {
            transformPagePoint: this.visualElement.getTransformPagePoint()
        });
    };
    VisualElementDragControls2.prototype.stop = function(event, info) {
        var isDragging = this.isDragging;
        this.cancel();
        if (!isDragging) return;
        var velocity = info.velocity;
        this.startAnimation(velocity);
        var onDragEnd = this.getProps().onDragEnd;
        onDragEnd === null || onDragEnd === void 0 ? void 0 : onDragEnd(event, info);
    };
    VisualElementDragControls2.prototype.cancel = function() {
        var _a37, _b;
        this.isDragging = false;
        if (this.visualElement.projection) {
            this.visualElement.projection.isAnimationBlocked = false;
        }
        (_a37 = this.panSession) === null || _a37 === void 0 ? void 0 : _a37.end();
        this.panSession = void 0;
        var dragPropagation = this.getProps().dragPropagation;
        if (!dragPropagation && this.openGlobalLock) {
            this.openGlobalLock();
            this.openGlobalLock = null;
        }
        (_b = this.visualElement.animationState) === null || _b === void 0 ? void 0 : _b.setActive(AnimationType.Drag, false);
    };
    VisualElementDragControls2.prototype.updateAxis = function(axis, _point, offset) {
        var drag2 = this.getProps().drag;
        if (!offset || !shouldDrag(axis, drag2, this.currentDirection)) return;
        var axisValue = this.getAxisMotionValue(axis);
        var next = this.originPoint[axis] + offset[axis];
        if (this.constraints && this.constraints[axis]) {
            next = applyConstraints(next, this.constraints[axis], this.elastic[axis]);
        }
        axisValue.set(next);
    };
    VisualElementDragControls2.prototype.resolveConstraints = function() {
        var _this = this;
        var _a38 = this.getProps(), dragConstraints = _a38.dragConstraints, dragElastic = _a38.dragElastic;
        var layout = (this.visualElement.projection || {}).layout;
        var prevConstraints = this.constraints;
        if (dragConstraints && isRefObject(dragConstraints)) {
            if (!this.constraints) {
                this.constraints = this.resolveRefConstraints();
            }
        } else {
            if (dragConstraints && layout) {
                this.constraints = calcRelativeConstraints(layout.actual, dragConstraints);
            } else {
                this.constraints = false;
            }
        }
        this.elastic = resolveDragElastic(dragElastic);
        if (prevConstraints !== this.constraints && layout && this.constraints && !this.hasMutatedConstraints) {
            eachAxis(function(axis) {
                if (_this.getAxisMotionValue(axis)) {
                    _this.constraints[axis] = rebaseAxisConstraints(layout.actual[axis], _this.constraints[axis]);
                }
            });
        }
    };
    VisualElementDragControls2.prototype.resolveRefConstraints = function() {
        var _a39 = this.getProps(), constraints = _a39.dragConstraints, onMeasureDragConstraints = _a39.onMeasureDragConstraints;
        if (!constraints || !isRefObject(constraints)) return false;
        var constraintsElement = constraints.current;
        invariant(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
        var projection = this.visualElement.projection;
        if (!projection || !projection.layout) return false;
        var constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
        var measuredConstraints = calcViewportConstraints(projection.layout.actual, constraintsBox);
        if (onMeasureDragConstraints) {
            var userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox(measuredConstraints));
            this.hasMutatedConstraints = !!userConstraints;
            if (userConstraints) {
                measuredConstraints = convertBoundingBoxToBox(userConstraints);
            }
        }
        return measuredConstraints;
    };
    VisualElementDragControls2.prototype.startAnimation = function(velocity) {
        var _this = this;
        var _a40 = this.getProps(), drag2 = _a40.drag, dragMomentum = _a40.dragMomentum, dragElastic = _a40.dragElastic, dragTransition = _a40.dragTransition, dragSnapToOrigin = _a40.dragSnapToOrigin, onDragTransitionEnd = _a40.onDragTransitionEnd;
        var constraints = this.constraints || {};
        var momentumAnimations = eachAxis(function(axis) {
            var _a2;
            if (!shouldDrag(axis, drag2, _this.currentDirection)) {
                return;
            }
            var transition = (_a2 = constraints === null || constraints === void 0 ? void 0 : constraints[axis]) !== null && _a2 !== void 0 ? _a2 : {};
            if (dragSnapToOrigin) transition = {
                min: 0,
                max: 0
            };
            var bounceStiffness = dragElastic ? 200 : 1000000;
            var bounceDamping = dragElastic ? 40 : 10000000;
            var inertia2 = __assign(__assign({
                type: "inertia",
                velocity: dragMomentum ? velocity[axis] : 0,
                bounceStiffness,
                bounceDamping,
                timeConstant: 750,
                restDelta: 1,
                restSpeed: 10
            }, dragTransition), transition);
            return _this.startAxisValueAnimation(axis, inertia2);
        });
        return Promise.all(momentumAnimations).then(onDragTransitionEnd);
    };
    VisualElementDragControls2.prototype.startAxisValueAnimation = function(axis, transition) {
        var axisValue = this.getAxisMotionValue(axis);
        return startAnimation(axis, axisValue, 0, transition);
    };
    VisualElementDragControls2.prototype.stopAnimation = function() {
        var _this = this;
        eachAxis(function(axis) {
            return _this.getAxisMotionValue(axis).stop();
        });
    };
    VisualElementDragControls2.prototype.getAxisMotionValue = function(axis) {
        var _a41, _b;
        var dragKey = "_drag" + axis.toUpperCase();
        var externalMotionValue = this.visualElement.getProps()[dragKey];
        return externalMotionValue ? externalMotionValue : this.visualElement.getValue(axis, (_b = (_a41 = this.visualElement.getProps().initial) === null || _a41 === void 0 ? void 0 : _a41[axis]) !== null && _b !== void 0 ? _b : 0);
    };
    VisualElementDragControls2.prototype.snapToCursor = function(point) {
        var _this = this;
        eachAxis(function(axis) {
            var drag2 = _this.getProps().drag;
            if (!shouldDrag(axis, drag2, _this.currentDirection)) return;
            var projection = _this.visualElement.projection;
            var axisValue = _this.getAxisMotionValue(axis);
            if (projection && projection.layout) {
                var _a42 = projection.layout.actual[axis], min = _a42.min, max = _a42.max;
                axisValue.set(point[axis] - mix(min, max, 0.5));
            }
        });
    };
    VisualElementDragControls2.prototype.scalePositionWithinConstraints = function() {
        var _this = this;
        var _a43;
        var _b = this.getProps(), drag2 = _b.drag, dragConstraints = _b.dragConstraints;
        var projection = this.visualElement.projection;
        if (!isRefObject(dragConstraints) || !projection || !this.constraints) return;
        this.stopAnimation();
        var boxProgress = {
            x: 0,
            y: 0
        };
        eachAxis(function(axis) {
            var axisValue = _this.getAxisMotionValue(axis);
            if (axisValue) {
                var latest = axisValue.get();
                boxProgress[axis] = calcOrigin2({
                    min: latest,
                    max: latest
                }, _this.constraints[axis]);
            }
        });
        var transformTemplate = this.visualElement.getProps().transformTemplate;
        this.visualElement.getInstance().style.transform = transformTemplate ? transformTemplate({}, "") : "none";
        (_a43 = projection.root) === null || _a43 === void 0 ? void 0 : _a43.updateScroll();
        projection.updateLayout();
        this.resolveConstraints();
        eachAxis(function(axis) {
            if (!shouldDrag(axis, drag2, null)) return;
            var axisValue = _this.getAxisMotionValue(axis);
            var _a2 = _this.constraints[axis], min = _a2.min, max = _a2.max;
            axisValue.set(mix(min, max, boxProgress[axis]));
        });
    };
    VisualElementDragControls2.prototype.addListeners = function() {
        var _this = this;
        var _a44;
        elementDragControls.set(this.visualElement, this);
        var element = this.visualElement.getInstance();
        var stopPointerListener = addPointerEvent(element, "pointerdown", function(event) {
            var _a2 = _this.getProps(), drag2 = _a2.drag, _b = _a2.dragListener, dragListener = _b === void 0 ? true : _b;
            drag2 && dragListener && _this.start(event);
        });
        var measureDragConstraints = function() {
            var dragConstraints = _this.getProps().dragConstraints;
            if (isRefObject(dragConstraints)) {
                _this.constraints = _this.resolveRefConstraints();
            }
        };
        var projection = this.visualElement.projection;
        var stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
        if (projection && !projection.layout) {
            (_a44 = projection.root) === null || _a44 === void 0 ? void 0 : _a44.updateScroll();
            projection.updateLayout();
        }
        measureDragConstraints();
        var stopResizeListener = addDomEvent(window, "resize", function() {
            _this.scalePositionWithinConstraints();
        });
        projection.addEventListener("didUpdate", function(_a2) {
            var delta = _a2.delta, hasLayoutChanged = _a2.hasLayoutChanged;
            if (_this.isDragging && hasLayoutChanged) {
                eachAxis(function(axis) {
                    var motionValue2 = _this.getAxisMotionValue(axis);
                    if (!motionValue2) return;
                    _this.originPoint[axis] += delta[axis].translate;
                    motionValue2.set(motionValue2.get() + delta[axis].translate);
                });
                _this.visualElement.syncRender();
            }
        });
        return function() {
            stopResizeListener();
            stopPointerListener();
            stopMeasureLayoutListener();
        };
    };
    VisualElementDragControls2.prototype.getProps = function() {
        var props = this.visualElement.getProps();
        var _a45 = props.drag, drag2 = _a45 === void 0 ? false : _a45, _b = props.dragDirectionLock, dragDirectionLock = _b === void 0 ? false : _b, _c = props.dragPropagation, dragPropagation = _c === void 0 ? false : _c, _d = props.dragConstraints, dragConstraints = _d === void 0 ? false : _d, _e6 = props.dragElastic, dragElastic = _e6 === void 0 ? defaultElastic : _e6, _f = props.dragMomentum, dragMomentum = _f === void 0 ? true : _f;
        return __assign(__assign({}, props), {
            drag: drag2,
            dragDirectionLock,
            dragPropagation,
            dragConstraints,
            dragElastic,
            dragMomentum
        });
    };
    return VisualElementDragControls2;
}();
function shouldDrag(direction, drag2, currentDirection) {
    return (drag2 === true || drag2 === direction) && (currentDirection === null || currentDirection === direction);
}
function getCurrentDirection(offset, lockThreshold) {
    if (lockThreshold === void 0) {
        lockThreshold = 10;
    }
    var direction = null;
    if (Math.abs(offset.y) > lockThreshold) {
        direction = "y";
    } else if (Math.abs(offset.x) > lockThreshold) {
        direction = "x";
    }
    return direction;
}
function useDrag(props) {
    var groupDragControls = props.dragControls, visualElement2 = props.visualElement;
    var dragControls = useConstant(function() {
        return new VisualElementDragControls(visualElement2);
    });
    useEffect(function() {
        return groupDragControls && groupDragControls.subscribe(dragControls);
    }, [
        dragControls,
        groupDragControls
    ]);
    useEffect(function() {
        return dragControls.addListeners();
    }, [
        dragControls
    ]);
}
function usePanGesture(_a46) {
    var onPan = _a46.onPan, onPanStart = _a46.onPanStart, onPanEnd = _a46.onPanEnd, onPanSessionStart = _a46.onPanSessionStart, visualElement2 = _a46.visualElement;
    var hasPanEvents = onPan || onPanStart || onPanEnd || onPanSessionStart;
    var panSession = useRef(null);
    var transformPagePoint = useContext(MotionConfigContext).transformPagePoint;
    var handlers = {
        onSessionStart: onPanSessionStart,
        onStart: onPanStart,
        onMove: onPan,
        onEnd: function(event, info) {
            panSession.current = null;
            onPanEnd && onPanEnd(event, info);
        }
    };
    useEffect(function() {
        if (panSession.current !== null) {
            panSession.current.updateHandlers(handlers);
        }
    });
    function onPointerDown(event) {
        panSession.current = new PanSession(event, handlers, {
            transformPagePoint
        });
    }
    usePointerEvent(visualElement2, "pointerdown", hasPanEvents && onPointerDown);
    useUnmountEffect(function() {
        return panSession.current && panSession.current.end();
    });
}
var drag = {
    pan: makeRenderlessComponent(usePanGesture),
    drag: makeRenderlessComponent(useDrag)
};
var names = [
    "LayoutMeasure",
    "BeforeLayoutMeasure",
    "LayoutUpdate",
    "ViewportBoxUpdate",
    "Update",
    "Render",
    "AnimationComplete",
    "LayoutAnimationComplete",
    "AnimationStart",
    "SetAxisTarget",
    "Unmount"
];
function createLifecycles() {
    var managers = names.map(function() {
        return new SubscriptionManager();
    });
    var propSubscriptions = {};
    var lifecycles = {
        clearAllListeners: function() {
            return managers.forEach(function(manager) {
                return manager.clear();
            });
        },
        updatePropListeners: function(props) {
            names.forEach(function(name) {
                var _a47;
                var on1 = "on" + name;
                var propListener = props[on1];
                (_a47 = propSubscriptions[name]) === null || _a47 === void 0 ? void 0 : _a47.call(propSubscriptions);
                if (propListener) {
                    propSubscriptions[name] = lifecycles[on1](propListener);
                }
            });
        }
    };
    managers.forEach(function(manager, i47) {
        lifecycles["on" + names[i47]] = function(handler) {
            return manager.add(handler);
        };
        lifecycles["notify" + names[i47]] = function() {
            var args = [];
            for(var _i = 0; _i < arguments.length; _i++){
                args[_i] = arguments[_i];
            }
            return manager.notify.apply(manager, __spreadArray([], __read(args), false));
        };
    });
    return lifecycles;
}
function updateMotionValuesFromProps(element, next, prev) {
    var _a48;
    for(var key in next){
        var nextValue = next[key];
        var prevValue = prev[key];
        if (isMotionValue(nextValue)) {
            element.addValue(key, nextValue);
        } else if (isMotionValue(prevValue)) {
            element.addValue(key, motionValue(nextValue));
        } else if (prevValue !== nextValue) {
            if (element.hasValue(key)) {
                var existingValue = element.getValue(key);
                !existingValue.hasAnimated && existingValue.set(nextValue);
            } else {
                element.addValue(key, motionValue((_a48 = element.getStaticValue(key)) !== null && _a48 !== void 0 ? _a48 : nextValue));
            }
        }
    }
    for(var key in prev){
        if (next[key] === void 0) element.removeValue(key);
    }
    return next;
}
var visualElement = function(_a49) {
    var _b = _a49.treeType, treeType = _b === void 0 ? "" : _b, build = _a49.build, getBaseTarget = _a49.getBaseTarget, makeTargetAnimatable = _a49.makeTargetAnimatable, measureViewportBox2 = _a49.measureViewportBox, renderInstance = _a49.render, readValueFromInstance = _a49.readValueFromInstance, removeValueFromRenderState = _a49.removeValueFromRenderState, sortNodePosition = _a49.sortNodePosition, scrapeMotionValuesFromProps3 = _a49.scrapeMotionValuesFromProps;
    return function(_a2, options) {
        var parent = _a2.parent, props = _a2.props, presenceId = _a2.presenceId, blockInitialAnimation = _a2.blockInitialAnimation, visualState = _a2.visualState, shouldReduceMotion = _a2.shouldReduceMotion;
        if (options === void 0) {
            options = {};
        }
        var isMounted = false;
        var latestValues = visualState.latestValues, renderState = visualState.renderState;
        var instance;
        var lifecycles = createLifecycles();
        var values = new Map();
        var valueSubscriptions = new Map();
        var prevMotionValues = {};
        var baseTarget = __assign({}, latestValues);
        var removeFromVariantTree;
        function render() {
            if (!instance || !isMounted) return;
            triggerBuild();
            renderInstance(instance, renderState, props.style, element.projection);
        }
        function triggerBuild() {
            build(element, renderState, latestValues, options, props);
        }
        function update() {
            lifecycles.notifyUpdate(latestValues);
        }
        function bindToMotionValue(key2, value2) {
            var removeOnChange = value2.onChange(function(latestValue) {
                latestValues[key2] = latestValue;
                props.onUpdate && es_default.update(update, false, true);
            });
            var removeOnRenderRequest = value2.onRenderRequest(element.scheduleRender);
            valueSubscriptions.set(key2, function() {
                removeOnChange();
                removeOnRenderRequest();
            });
        }
        var initialMotionValues = scrapeMotionValuesFromProps3(props);
        for(var key in initialMotionValues){
            var value = initialMotionValues[key];
            if (latestValues[key] !== void 0 && isMotionValue(value)) {
                value.set(latestValues[key], false);
            }
        }
        var isControllingVariants = checkIfControllingVariants(props);
        var isVariantNode = checkIfVariantNode(props);
        var element = __assign(__assign({
            treeType,
            current: null,
            depth: parent ? parent.depth + 1 : 0,
            parent,
            children: new Set(),
            presenceId,
            shouldReduceMotion,
            variantChildren: isVariantNode ? new Set() : void 0,
            isVisible: void 0,
            manuallyAnimateOnMount: Boolean(parent === null || parent === void 0 ? void 0 : parent.isMounted()),
            blockInitialAnimation,
            isMounted: function() {
                return Boolean(instance);
            },
            mount: function(newInstance) {
                isMounted = true;
                instance = element.current = newInstance;
                if (element.projection) {
                    element.projection.mount(newInstance);
                }
                if (isVariantNode && parent && !isControllingVariants) {
                    removeFromVariantTree = parent === null || parent === void 0 ? void 0 : parent.addVariantChild(element);
                }
                parent === null || parent === void 0 ? void 0 : parent.children.add(element);
                element.setProps(props);
            },
            unmount: function() {
                var _a3;
                (_a3 = element.projection) === null || _a3 === void 0 ? void 0 : _a3.unmount();
                cancelSync.update(update);
                cancelSync.render(render);
                valueSubscriptions.forEach(function(remove) {
                    return remove();
                });
                removeFromVariantTree === null || removeFromVariantTree === void 0 ? void 0 : removeFromVariantTree();
                parent === null || parent === void 0 ? void 0 : parent.children.delete(element);
                lifecycles.clearAllListeners();
                instance = void 0;
                isMounted = false;
            },
            addVariantChild: function(child) {
                var _a3;
                var closestVariantNode = element.getClosestVariantNode();
                if (closestVariantNode) {
                    (_a3 = closestVariantNode.variantChildren) === null || _a3 === void 0 ? void 0 : _a3.add(child);
                    return function() {
                        return closestVariantNode.variantChildren.delete(child);
                    };
                }
            },
            sortNodePosition: function(other) {
                if (!sortNodePosition || treeType !== other.treeType) return 0;
                return sortNodePosition(element.getInstance(), other.getInstance());
            },
            getClosestVariantNode: function() {
                return isVariantNode ? element : parent === null || parent === void 0 ? void 0 : parent.getClosestVariantNode();
            },
            getLayoutId: function() {
                return props.layoutId;
            },
            getInstance: function() {
                return instance;
            },
            getStaticValue: function(key2) {
                return latestValues[key2];
            },
            setStaticValue: function(key2, value2) {
                return latestValues[key2] = value2;
            },
            getLatestValues: function() {
                return latestValues;
            },
            setVisibility: function(visibility) {
                if (element.isVisible === visibility) return;
                element.isVisible = visibility;
                element.scheduleRender();
            },
            makeTargetAnimatable: function(target, canMutate) {
                if (canMutate === void 0) {
                    canMutate = true;
                }
                return makeTargetAnimatable(element, target, props, canMutate);
            },
            measureViewportBox: function() {
                return measureViewportBox2(instance, props);
            },
            addValue: function(key2, value2) {
                if (element.hasValue(key2)) element.removeValue(key2);
                values.set(key2, value2);
                latestValues[key2] = value2.get();
                bindToMotionValue(key2, value2);
            },
            removeValue: function(key2) {
                var _a3;
                values.delete(key2);
                (_a3 = valueSubscriptions.get(key2)) === null || _a3 === void 0 ? void 0 : _a3();
                valueSubscriptions.delete(key2);
                delete latestValues[key2];
                removeValueFromRenderState(key2, renderState);
            },
            hasValue: function(key2) {
                return values.has(key2);
            },
            getValue: function(key2, defaultValue) {
                var value2 = values.get(key2);
                if (value2 === void 0 && defaultValue !== void 0) {
                    value2 = motionValue(defaultValue);
                    element.addValue(key2, value2);
                }
                return value2;
            },
            forEachValue: function(callback) {
                return values.forEach(callback);
            },
            readValue: function(key2) {
                var _a3;
                return (_a3 = latestValues[key2]) !== null && _a3 !== void 0 ? _a3 : readValueFromInstance(instance, key2, options);
            },
            setBaseTarget: function(key2, value2) {
                baseTarget[key2] = value2;
            },
            getBaseTarget: function(key2) {
                if (getBaseTarget) {
                    var target = getBaseTarget(props, key2);
                    if (target !== void 0 && !isMotionValue(target)) return target;
                }
                return baseTarget[key2];
            }
        }, lifecycles), {
            build: function() {
                triggerBuild();
                return renderState;
            },
            scheduleRender: function() {
                es_default.render(render, false, true);
            },
            syncRender: render,
            setProps: function(newProps) {
                if (newProps.transformTemplate || props.transformTemplate) {
                    element.scheduleRender();
                }
                props = newProps;
                lifecycles.updatePropListeners(newProps);
                prevMotionValues = updateMotionValuesFromProps(element, scrapeMotionValuesFromProps3(props), prevMotionValues);
            },
            getProps: function() {
                return props;
            },
            getVariant: function(name) {
                var _a3;
                return (_a3 = props.variants) === null || _a3 === void 0 ? void 0 : _a3[name];
            },
            getDefaultTransition: function() {
                return props.transition;
            },
            getTransformPagePoint: function() {
                return props.transformPagePoint;
            },
            getVariantContext: function(startAtParent) {
                if (startAtParent === void 0) {
                    startAtParent = false;
                }
                if (startAtParent) return parent === null || parent === void 0 ? void 0 : parent.getVariantContext();
                if (!isControllingVariants) {
                    var context_1 = (parent === null || parent === void 0 ? void 0 : parent.getVariantContext()) || {};
                    if (props.initial !== void 0) {
                        context_1.initial = props.initial;
                    }
                    return context_1;
                }
                var context = {};
                for(var i48 = 0; i48 < numVariantProps; i48++){
                    var name_1 = variantProps[i48];
                    var prop = props[name_1];
                    if (isVariantLabel(prop) || prop === false) {
                        context[name_1] = prop;
                    }
                }
                return context;
            }
        });
        return element;
    };
};
var variantProps = __spreadArray([
    "initial"
], __read(variantPriorityOrder), false);
var numVariantProps = variantProps.length;
function isCSSVariable2(value) {
    return typeof value === "string" && value.startsWith("var(--");
}
var cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function parseCSSVariable(current) {
    var match = cssVariableRegex.exec(current);
    if (!match) return [
        , 
    ];
    var _a50 = __read(match, 3), token = _a50[1], fallback = _a50[2];
    return [
        token,
        fallback
    ];
}
var maxDepth = 4;
function getVariableValue(current, element, depth) {
    if (depth === void 0) {
        depth = 1;
    }
    invariant(depth <= maxDepth, 'Max CSS variable fallback depth detected in property "'.concat(current, '". This may indicate a circular fallback dependency.'));
    var _a51 = __read(parseCSSVariable(current), 2), token = _a51[0], fallback = _a51[1];
    if (!token) return;
    var resolved = window.getComputedStyle(element).getPropertyValue(token);
    if (resolved) {
        return resolved.trim();
    } else if (isCSSVariable2(fallback)) {
        return getVariableValue(fallback, element, depth + 1);
    } else {
        return fallback;
    }
}
function resolveCSSVariables(visualElement2, _a52, transitionEnd) {
    var _b;
    var target = __rest(_a52, []);
    var element = visualElement2.getInstance();
    if (!(element instanceof Element)) return {
        target,
        transitionEnd
    };
    if (transitionEnd) {
        transitionEnd = __assign({}, transitionEnd);
    }
    visualElement2.forEachValue(function(value) {
        var current2 = value.get();
        if (!isCSSVariable2(current2)) return;
        var resolved2 = getVariableValue(current2, element);
        if (resolved2) value.set(resolved2);
    });
    for(var key in target){
        var current = target[key];
        if (!isCSSVariable2(current)) continue;
        var resolved = getVariableValue(current, element);
        if (!resolved) continue;
        target[key] = resolved;
        if (transitionEnd) (_b = transitionEnd[key]) !== null && _b !== void 0 ? _b : transitionEnd[key] = current;
    }
    return {
        target,
        transitionEnd
    };
}
var positionalKeys = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    "x",
    "y"
]);
var isPositionalKey = function(key) {
    return positionalKeys.has(key);
};
var hasPositionalKey = function(target) {
    return Object.keys(target).some(isPositionalKey);
};
var setAndResetVelocity = function(value, to) {
    value.set(to, false);
    value.set(to);
};
var isNumOrPxType = function(v71) {
    return v71 === number || v71 === px;
};
var BoundingBoxDimension;
(function(BoundingBoxDimension2) {
    BoundingBoxDimension2["width"] = "width";
    BoundingBoxDimension2["height"] = "height";
    BoundingBoxDimension2["left"] = "left";
    BoundingBoxDimension2["right"] = "right";
    BoundingBoxDimension2["top"] = "top";
    BoundingBoxDimension2["bottom"] = "bottom";
})(BoundingBoxDimension || (BoundingBoxDimension = {}));
var getPosFromMatrix = function(matrix, pos) {
    return parseFloat(matrix.split(", ")[pos]);
};
var getTranslateFromMatrix = function(pos2, pos3) {
    return function(_bbox, _a53) {
        var transform = _a53.transform;
        if (transform === "none" || !transform) return 0;
        var matrix3d = transform.match(/^matrix3d\((.+)\)$/);
        if (matrix3d) {
            return getPosFromMatrix(matrix3d[1], pos3);
        } else {
            var matrix = transform.match(/^matrix\((.+)\)$/);
            if (matrix) {
                return getPosFromMatrix(matrix[1], pos2);
            } else {
                return 0;
            }
        }
    };
};
var transformKeys = new Set([
    "x",
    "y",
    "z"
]);
var nonTranslationalTransformKeys = transformProps.filter(function(key) {
    return !transformKeys.has(key);
});
function removeNonTranslationalTransform(visualElement2) {
    var removedTransforms = [];
    nonTranslationalTransformKeys.forEach(function(key) {
        var value = visualElement2.getValue(key);
        if (value !== void 0) {
            removedTransforms.push([
                key,
                value.get()
            ]);
            value.set(key.startsWith("scale") ? 1 : 0);
        }
    });
    if (removedTransforms.length) visualElement2.syncRender();
    return removedTransforms;
}
var positionalValues = {
    width: function(_a54, _b) {
        var x8 = _a54.x;
        var _c = _b.paddingLeft, paddingLeft = _c === void 0 ? "0" : _c, _d = _b.paddingRight, paddingRight = _d === void 0 ? "0" : _d;
        return x8.max - x8.min - parseFloat(paddingLeft) - parseFloat(paddingRight);
    },
    height: function(_a55, _b) {
        var y6 = _a55.y;
        var _c = _b.paddingTop, paddingTop = _c === void 0 ? "0" : _c, _d = _b.paddingBottom, paddingBottom = _d === void 0 ? "0" : _d;
        return y6.max - y6.min - parseFloat(paddingTop) - parseFloat(paddingBottom);
    },
    top: function(_bbox, _a56) {
        var top = _a56.top;
        return parseFloat(top);
    },
    left: function(_bbox, _a57) {
        var left = _a57.left;
        return parseFloat(left);
    },
    bottom: function(_a58, _b) {
        var y7 = _a58.y;
        var top = _b.top;
        return parseFloat(top) + (y7.max - y7.min);
    },
    right: function(_a59, _b) {
        var x9 = _a59.x;
        var left = _b.left;
        return parseFloat(left) + (x9.max - x9.min);
    },
    x: getTranslateFromMatrix(4, 13),
    y: getTranslateFromMatrix(5, 14)
};
var convertChangedValueTypes = function(target, visualElement2, changedKeys) {
    var originBbox = visualElement2.measureViewportBox();
    var element = visualElement2.getInstance();
    var elementComputedStyle = getComputedStyle(element);
    var display = elementComputedStyle.display;
    var origin = {};
    if (display === "none") {
        visualElement2.setStaticValue("display", target.display || "block");
    }
    changedKeys.forEach(function(key) {
        origin[key] = positionalValues[key](originBbox, elementComputedStyle);
    });
    visualElement2.syncRender();
    var targetBbox = visualElement2.measureViewportBox();
    changedKeys.forEach(function(key) {
        var value = visualElement2.getValue(key);
        setAndResetVelocity(value, origin[key]);
        target[key] = positionalValues[key](targetBbox, elementComputedStyle);
    });
    return target;
};
var checkAndConvertChangedValueTypes = function(visualElement2, target, origin, transitionEnd) {
    if (origin === void 0) {
        origin = {};
    }
    if (transitionEnd === void 0) {
        transitionEnd = {};
    }
    target = __assign({}, target);
    transitionEnd = __assign({}, transitionEnd);
    var targetPositionalKeys = Object.keys(target).filter(isPositionalKey);
    var removedTransformValues = [];
    var hasAttemptedToRemoveTransformValues = false;
    var changedValueTypeKeys = [];
    targetPositionalKeys.forEach(function(key) {
        var value = visualElement2.getValue(key);
        if (!visualElement2.hasValue(key)) return;
        var from = origin[key];
        var fromType = findDimensionValueType(from);
        var to = target[key];
        var toType;
        if (isKeyframesTarget(to)) {
            var numKeyframes = to.length;
            var fromIndex = to[0] === null ? 1 : 0;
            from = to[fromIndex];
            fromType = findDimensionValueType(from);
            for(var i49 = fromIndex; i49 < numKeyframes; i49++){
                if (!toType) {
                    toType = findDimensionValueType(to[i49]);
                    invariant(toType === fromType || isNumOrPxType(fromType) && isNumOrPxType(toType), "Keyframes must be of the same dimension as the current value");
                } else {
                    invariant(findDimensionValueType(to[i49]) === toType, "All keyframes must be of the same type");
                }
            }
        } else {
            toType = findDimensionValueType(to);
        }
        if (fromType !== toType) {
            if (isNumOrPxType(fromType) && isNumOrPxType(toType)) {
                var current = value.get();
                if (typeof current === "string") {
                    value.set(parseFloat(current));
                }
                if (typeof to === "string") {
                    target[key] = parseFloat(to);
                } else if (Array.isArray(to) && toType === px) {
                    target[key] = to.map(parseFloat);
                }
            } else if ((fromType === null || fromType === void 0 ? void 0 : fromType.transform) && (toType === null || toType === void 0 ? void 0 : toType.transform) && (from === 0 || to === 0)) {
                if (from === 0) {
                    value.set(toType.transform(from));
                } else {
                    target[key] = fromType.transform(to);
                }
            } else {
                if (!hasAttemptedToRemoveTransformValues) {
                    removedTransformValues = removeNonTranslationalTransform(visualElement2);
                    hasAttemptedToRemoveTransformValues = true;
                }
                changedValueTypeKeys.push(key);
                transitionEnd[key] = transitionEnd[key] !== void 0 ? transitionEnd[key] : target[key];
                setAndResetVelocity(value, to);
            }
        }
    });
    if (changedValueTypeKeys.length) {
        var convertedTarget = convertChangedValueTypes(target, visualElement2, changedValueTypeKeys);
        if (removedTransformValues.length) {
            removedTransformValues.forEach(function(_a60) {
                var _b = __read(_a60, 2), key = _b[0], value = _b[1];
                visualElement2.getValue(key).set(value);
            });
        }
        visualElement2.syncRender();
        return {
            target: convertedTarget,
            transitionEnd
        };
    } else {
        return {
            target,
            transitionEnd
        };
    }
};
function unitConversion(visualElement2, target, origin, transitionEnd) {
    return hasPositionalKey(target) ? checkAndConvertChangedValueTypes(visualElement2, target, origin, transitionEnd) : {
        target,
        transitionEnd
    };
}
var parseDomVariant = function(visualElement2, target, origin, transitionEnd) {
    var resolved = resolveCSSVariables(visualElement2, target, transitionEnd);
    target = resolved.target;
    transitionEnd = resolved.transitionEnd;
    return unitConversion(visualElement2, target, origin, transitionEnd);
};
function getComputedStyle2(element) {
    return window.getComputedStyle(element);
}
var htmlConfig = {
    treeType: "dom",
    readValueFromInstance: function(domElement, key) {
        if (isTransformProp(key)) {
            var defaultType = getDefaultValueType(key);
            return defaultType ? defaultType.default || 0 : 0;
        } else {
            var computedStyle = getComputedStyle2(domElement);
            return (isCSSVariable(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
        }
    },
    sortNodePosition: function(a211, b2) {
        return a211.compareDocumentPosition(b2) & 2 ? 1 : -1;
    },
    getBaseTarget: function(props, key) {
        var _a61;
        return (_a61 = props.style) === null || _a61 === void 0 ? void 0 : _a61[key];
    },
    measureViewportBox: function(element, _a62) {
        var transformPagePoint = _a62.transformPagePoint;
        return measureViewportBox(element, transformPagePoint);
    },
    resetTransform: function(element, domElement, props) {
        var transformTemplate = props.transformTemplate;
        domElement.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
        element.scheduleRender();
    },
    restoreTransform: function(instance, mutableState) {
        instance.style.transform = mutableState.style.transform;
    },
    removeValueFromRenderState: function(key, _a63) {
        var vars = _a63.vars, style = _a63.style;
        delete vars[key];
        delete style[key];
    },
    makeTargetAnimatable: function(element, _a64, _b, isMounted) {
        var transformValues = _b.transformValues;
        if (isMounted === void 0) {
            isMounted = true;
        }
        var transition = _a64.transition, transitionEnd = _a64.transitionEnd, target = __rest(_a64, [
            "transition",
            "transitionEnd"
        ]);
        var origin = getOrigin(target, transition || {}, element);
        if (transformValues) {
            if (transitionEnd) transitionEnd = transformValues(transitionEnd);
            if (target) target = transformValues(target);
            if (origin) origin = transformValues(origin);
        }
        if (isMounted) {
            checkTargetForNewValues(element, target, origin);
            var parsed = parseDomVariant(element, target, origin, transitionEnd);
            transitionEnd = parsed.transitionEnd;
            target = parsed.target;
        }
        return __assign({
            transition,
            transitionEnd
        }, target);
    },
    scrapeMotionValuesFromProps,
    build: function(element, renderState, latestValues, options, props) {
        if (element.isVisible !== void 0) {
            renderState.style.visibility = element.isVisible ? "visible" : "hidden";
        }
        buildHTMLStyles(renderState, latestValues, options, props.transformTemplate);
    },
    render: renderHTML
};
var htmlVisualElement = visualElement(htmlConfig);
var svgVisualElement = visualElement(__assign(__assign({}, htmlConfig), {
    getBaseTarget: function(props, key) {
        return props[key];
    },
    readValueFromInstance: function(domElement, key) {
        var _a65;
        if (isTransformProp(key)) {
            return ((_a65 = getDefaultValueType(key)) === null || _a65 === void 0 ? void 0 : _a65.default) || 0;
        }
        key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
        return domElement.getAttribute(key);
    },
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2,
    build: function(_element, renderState, latestValues, options, props) {
        buildSVGAttrs(renderState, latestValues, options, props.transformTemplate);
    },
    render: renderSVG
}));
var createDomVisualElement = function(Component8, options) {
    return isSVGComponent(Component8) ? svgVisualElement(options, {
        enableHardwareAcceleration: false
    }) : htmlVisualElement(options, {
        enableHardwareAcceleration: true
    });
};
function pixelsToPercent(pixels, axis) {
    if (axis.max === axis.min) return 0;
    return pixels / (axis.max - axis.min) * 100;
}
var correctBorderRadius = {
    correct: function(latest, node) {
        if (!node.target) return latest;
        if (typeof latest === "string") {
            if (px.test(latest)) {
                latest = parseFloat(latest);
            } else {
                return latest;
            }
        }
        var x10 = pixelsToPercent(latest, node.target.x);
        var y8 = pixelsToPercent(latest, node.target.y);
        return "".concat(x10, "% ").concat(y8, "%");
    }
};
var varToken = "_$css";
var correctBoxShadow = {
    correct: function(latest, _a66) {
        var treeScale = _a66.treeScale, projectionDelta = _a66.projectionDelta;
        var original = latest;
        var containsCSSVariables = latest.includes("var(");
        var cssVariables = [];
        if (containsCSSVariables) {
            latest = latest.replace(cssVariableRegex, function(match) {
                cssVariables.push(match);
                return varToken;
            });
        }
        var shadow = complex.parse(latest);
        if (shadow.length > 5) return original;
        var template = complex.createTransformer(latest);
        var offset = typeof shadow[0] !== "number" ? 1 : 0;
        var xScale = projectionDelta.x.scale * treeScale.x;
        var yScale = projectionDelta.y.scale * treeScale.y;
        shadow[0 + offset] /= xScale;
        shadow[1 + offset] /= yScale;
        var averageScale = mix(xScale, yScale, 0.5);
        if (typeof shadow[2 + offset] === "number") shadow[2 + offset] /= averageScale;
        if (typeof shadow[3 + offset] === "number") shadow[3 + offset] /= averageScale;
        var output = template(shadow);
        if (containsCSSVariables) {
            var i_1 = 0;
            output = output.replace(varToken, function() {
                var cssVariable = cssVariables[i_1];
                i_1++;
                return cssVariable;
            });
        }
        return output;
    }
};
var MeasureLayoutWithContext = function(_super) {
    __extends(MeasureLayoutWithContext2, _super);
    function MeasureLayoutWithContext2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MeasureLayoutWithContext2.prototype.componentDidMount = function() {
        var _this = this;
        var _a67 = this.props, visualElement2 = _a67.visualElement, layoutGroup = _a67.layoutGroup, switchLayoutGroup = _a67.switchLayoutGroup, layoutId = _a67.layoutId;
        var projection = visualElement2.projection;
        addScaleCorrector(defaultScaleCorrectors);
        if (projection) {
            if (layoutGroup === null || layoutGroup === void 0 ? void 0 : layoutGroup.group) layoutGroup.group.add(projection);
            if ((switchLayoutGroup === null || switchLayoutGroup === void 0 ? void 0 : switchLayoutGroup.register) && layoutId) {
                switchLayoutGroup.register(projection);
            }
            projection.root.didUpdate();
            projection.addEventListener("animationComplete", function() {
                _this.safeToRemove();
            });
            projection.setOptions(__assign(__assign({}, projection.options), {
                onExitComplete: function() {
                    return _this.safeToRemove();
                }
            }));
        }
        globalProjectionState.hasEverUpdated = true;
    };
    MeasureLayoutWithContext2.prototype.getSnapshotBeforeUpdate = function(prevProps) {
        var _this = this;
        var _a68 = this.props, layoutDependency = _a68.layoutDependency, visualElement2 = _a68.visualElement, drag2 = _a68.drag, isPresent = _a68.isPresent;
        var projection = visualElement2.projection;
        if (!projection) return null;
        projection.isPresent = isPresent;
        if (drag2 || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0) {
            projection.willUpdate();
        } else {
            this.safeToRemove();
        }
        if (prevProps.isPresent !== isPresent) {
            if (isPresent) {
                projection.promote();
            } else if (!projection.relegate()) {
                es_default.postRender(function() {
                    var _a2;
                    if (!((_a2 = projection.getStack()) === null || _a2 === void 0 ? void 0 : _a2.members.length)) {
                        _this.safeToRemove();
                    }
                });
            }
        }
        return null;
    };
    MeasureLayoutWithContext2.prototype.componentDidUpdate = function() {
        var projection = this.props.visualElement.projection;
        if (projection) {
            projection.root.didUpdate();
            if (!projection.currentAnimation && projection.isLead()) {
                this.safeToRemove();
            }
        }
    };
    MeasureLayoutWithContext2.prototype.componentWillUnmount = function() {
        var _a69 = this.props, visualElement2 = _a69.visualElement, layoutGroup = _a69.layoutGroup, promoteContext = _a69.switchLayoutGroup;
        var projection = visualElement2.projection;
        if (projection) {
            projection.scheduleCheckAfterUnmount();
            if (layoutGroup === null || layoutGroup === void 0 ? void 0 : layoutGroup.group) layoutGroup.group.remove(projection);
            if (promoteContext === null || promoteContext === void 0 ? void 0 : promoteContext.deregister) promoteContext.deregister(projection);
        }
    };
    MeasureLayoutWithContext2.prototype.safeToRemove = function() {
        var safeToRemove = this.props.safeToRemove;
        safeToRemove === null || safeToRemove === void 0 ? void 0 : safeToRemove();
    };
    MeasureLayoutWithContext2.prototype.render = function() {
        return null;
    };
    return MeasureLayoutWithContext2;
}(react.Component);
function MeasureLayout(props) {
    var _a70 = __read(usePresence(), 2), isPresent = _a70[0], safeToRemove = _a70[1];
    var layoutGroup = useContext(LayoutGroupContext);
    return react.createElement(MeasureLayoutWithContext, __assign({}, props, {
        layoutGroup,
        switchLayoutGroup: useContext(SwitchLayoutGroupContext),
        isPresent,
        safeToRemove
    }));
}
var defaultScaleCorrectors = {
    borderRadius: __assign(__assign({}, correctBorderRadius), {
        applyTo: [
            "borderTopLeftRadius",
            "borderTopRightRadius",
            "borderBottomLeftRadius",
            "borderBottomRightRadius"
        ]
    }),
    borderTopLeftRadius: correctBorderRadius,
    borderTopRightRadius: correctBorderRadius,
    borderBottomLeftRadius: correctBorderRadius,
    borderBottomRightRadius: correctBorderRadius,
    boxShadow: correctBoxShadow
};
var layoutFeatures = {
    measureLayout: MeasureLayout
};
var DocumentProjectionNode = createProjectionNode({
    attachResizeListener: function(ref, notify) {
        ref.addEventListener("resize", notify, {
            passive: true
        });
        return function() {
            return ref.removeEventListener("resize", notify);
        };
    },
    measureScroll: function() {
        return {
            x: document.documentElement.scrollLeft || document.body.scrollLeft,
            y: document.documentElement.scrollTop || document.body.scrollTop
        };
    }
});
var rootProjectionNode = {
    current: void 0
};
var HTMLProjectionNode = createProjectionNode({
    measureScroll: function(instance) {
        return {
            x: instance.scrollLeft,
            y: instance.scrollTop
        };
    },
    defaultParent: function() {
        if (!rootProjectionNode.current) {
            var documentNode = new DocumentProjectionNode(0, {});
            documentNode.mount(window);
            documentNode.setOptions({
                layoutScroll: true
            });
            rootProjectionNode.current = documentNode;
        }
        return rootProjectionNode.current;
    },
    resetTransform: function(instance, value) {
        instance.style.transform = value !== null && value !== void 0 ? value : "none";
    }
});
var featureBundle = __assign(__assign(__assign(__assign({}, animations), gestureAnimations), drag), layoutFeatures);
var motion = createMotionProxy(function(Component9, config) {
    return createDomMotionConfig(Component9, config, featureBundle, createDomVisualElement, HTMLProjectionNode);
});
export { motion as motion };


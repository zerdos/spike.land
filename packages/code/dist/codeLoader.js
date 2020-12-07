!(function(r, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define([
        "exports"
    ], e) : e((r = "undefined" != typeof globalThis ? globalThis : r || self).uuid = {
    });
})(this, function(r) {
    "use strict";
    var e = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto), n = new Uint8Array(16);
    function t() {
        if (!e) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
        return e(n);
    }
    var o = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    function a(r1) {
        return "string" == typeof r1 && o.test(r1);
    }
    for(var i1, u1, f = [], s = 0; s < 256; ++s)f.push((s + 256).toString(16).substr(1));
    function c(r1) {
        var e1 = arguments.length > 1 && (void 0) !== arguments[1] ? arguments[1] : 0, n1 = (f[r1[e1 + 0]] + f[r1[e1 + 1]] + f[r1[e1 + 2]] + f[r1[e1 + 3]] + "-" + f[r1[e1 + 4]] + f[r1[e1 + 5]] + "-" + f[r1[e1 + 6]] + f[r1[e1 + 7]] + "-" + f[r1[e1 + 8]] + f[r1[e1 + 9]] + "-" + f[r1[e1 + 10]] + f[r1[e1 + 11]] + f[r1[e1 + 12]] + f[r1[e1 + 13]] + f[r1[e1 + 14]] + f[r1[e1 + 15]]).toLowerCase();
        if (!a(n1)) throw TypeError("Stringified UUID is invalid");
        return n1;
    }
    var l = 0, d = 0;
    function v(r1) {
        if (!a(r1)) throw TypeError("Invalid UUID");
        var e1, n1 = new Uint8Array(16);
        return (n1[0] = (e1 = parseInt(r1.slice(0, 8), 16)) >>> 24, n1[1] = e1 >>> 16 & 255, n1[2] = e1 >>> 8 & 255, n1[3] = 255 & e1, n1[4] = (e1 = parseInt(r1.slice(9, 13), 16)) >>> 8, n1[5] = 255 & e1, n1[6] = (e1 = parseInt(r1.slice(14, 18), 16)) >>> 8, n1[7] = 255 & e1, n1[8] = (e1 = parseInt(r1.slice(19, 23), 16)) >>> 8, n1[9] = 255 & e1, n1[10] = (e1 = parseInt(r1.slice(24, 36), 16)) / 1099511627776 & 255, n1[11] = e1 / 4294967296 & 255, n1[12] = e1 >>> 24 & 255, n1[13] = e1 >>> 16 & 255, n1[14] = e1 >>> 8 & 255, n1[15] = 255 & e1, n1);
    }
    function p(r1, e1, n1) {
        function t1(r2, t2, o1, a1) {
            if (("string" == typeof r2 && (r2 = function(r3) {
                r3 = unescape(encodeURIComponent(r3));
                for(var e2 = [], n2 = 0; n2 < r3.length; ++n2)e2.push(r3.charCodeAt(n2));
                return e2;
            }(r2)), "string" == typeof t2 && (t2 = v(t2)), 16 !== t2.length)) throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
            var i1 = new Uint8Array(16 + r2.length);
            if ((i1.set(t2), i1.set(r2, t2.length), (i1 = n1(i1))[6] = 15 & i1[6] | e1, i1[8] = 63 & i1[8] | 128, o1)) {
                a1 = a1 || 0;
                for(var u1 = 0; u1 < 16; ++u1)o1[a1 + u1] = i1[u1];
                return o1;
            }
            return c(i1);
        }
        try {
            t1.name = r1;
        } catch (r) {
        }
        return (t1.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8", t1.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8", t1);
    }
    function h(r1) {
        return 14 + (r1 + 64 >>> 9 << 4) + 1;
    }
    function y(r1, e1) {
        var n1 = (65535 & r1) + (65535 & e1);
        return (r1 >> 16) + (e1 >> 16) + (n1 >> 16) << 16 | 65535 & n1;
    }
    function g(r1, e1, n1, t1, o1, a1) {
        return y((i2 = y(y(e1, r1), y(t1, a1))) << (u2 = o1) | i2 >>> 32 - u2, n1);
        var i2, u2;
    }
    function m(r1, e1, n1, t1, o1, a1, i2) {
        return g(e1 & n1 | ~e1 & t1, r1, e1, o1, a1, i2);
    }
    function w(r1, e1, n1, t1, o1, a1, i2) {
        return g(e1 & t1 | n1 & ~t1, r1, e1, o1, a1, i2);
    }
    function b(r1, e1, n1, t1, o1, a1, i2) {
        return g(e1 ^ n1 ^ t1, r1, e1, o1, a1, i2);
    }
    function A(r1, e1, n1, t1, o1, a1, i2) {
        return g(n1 ^ (e1 | ~t1), r1, e1, o1, a1, i2);
    }
    var U = p("v3", 48, function(r1) {
        if ("string" == typeof r1) {
            var e1 = unescape(encodeURIComponent(r1));
            r1 = new Uint8Array(e1.length);
            for(var n1 = 0; n1 < e1.length; ++n1)r1[n1] = e1.charCodeAt(n1);
        }
        return function(r2) {
            for(var e1 = [], n1 = 32 * r2.length, t1 = "0123456789abcdef", o1 = 0; o1 < n1; o1 += 8){
                var a1 = r2[o1 >> 5] >>> o1 % 32 & 255, i2 = parseInt(t1.charAt(a1 >>> 4 & 15) + t1.charAt(15 & a1), 16);
                e1.push(i2);
            }
            return e1;
        }(function(r2, e1) {
            r2[e1 >> 5] |= 128 << e1 % 32, r2[h(e1) - 1] = e1;
            for(var n1 = 1732584193, t1 = -271733879, o1 = -1732584194, a1 = 271733878, i2 = 0; i2 < r2.length; i2 += 16){
                var u2 = n1, f1 = t1, s1 = o1, c1 = a1;
                n1 = m(n1, t1, o1, a1, r2[i2], 7, -680876936), a1 = m(a1, n1, t1, o1, r2[i2 + 1], 12, -389564586), o1 = m(o1, a1, n1, t1, r2[i2 + 2], 17, 606105819), t1 = m(t1, o1, a1, n1, r2[i2 + 3], 22, -1044525330), n1 = m(n1, t1, o1, a1, r2[i2 + 4], 7, -176418897), a1 = m(a1, n1, t1, o1, r2[i2 + 5], 12, 1200080426), o1 = m(o1, a1, n1, t1, r2[i2 + 6], 17, -1473231341), t1 = m(t1, o1, a1, n1, r2[i2 + 7], 22, -45705983), n1 = m(n1, t1, o1, a1, r2[i2 + 8], 7, 1770035416), a1 = m(a1, n1, t1, o1, r2[i2 + 9], 12, -1958414417), o1 = m(o1, a1, n1, t1, r2[i2 + 10], 17, -42063), t1 = m(t1, o1, a1, n1, r2[i2 + 11], 22, -1990404162), n1 = m(n1, t1, o1, a1, r2[i2 + 12], 7, 1804603682), a1 = m(a1, n1, t1, o1, r2[i2 + 13], 12, -40341101), o1 = m(o1, a1, n1, t1, r2[i2 + 14], 17, -1502002290), n1 = w(n1, t1 = m(t1, o1, a1, n1, r2[i2 + 15], 22, 1236535329), o1, a1, r2[i2 + 1], 5, -165796510), a1 = w(a1, n1, t1, o1, r2[i2 + 6], 9, -1069501632), o1 = w(o1, a1, n1, t1, r2[i2 + 11], 14, 643717713), t1 = w(t1, o1, a1, n1, r2[i2], 20, -373897302), n1 = w(n1, t1, o1, a1, r2[i2 + 5], 5, -701558691), a1 = w(a1, n1, t1, o1, r2[i2 + 10], 9, 38016083), o1 = w(o1, a1, n1, t1, r2[i2 + 15], 14, -660478335), t1 = w(t1, o1, a1, n1, r2[i2 + 4], 20, -405537848), n1 = w(n1, t1, o1, a1, r2[i2 + 9], 5, 568446438), a1 = w(a1, n1, t1, o1, r2[i2 + 14], 9, -1019803690), o1 = w(o1, a1, n1, t1, r2[i2 + 3], 14, -187363961), t1 = w(t1, o1, a1, n1, r2[i2 + 8], 20, 1163531501), n1 = w(n1, t1, o1, a1, r2[i2 + 13], 5, -1444681467), a1 = w(a1, n1, t1, o1, r2[i2 + 2], 9, -51403784), o1 = w(o1, a1, n1, t1, r2[i2 + 7], 14, 1735328473), n1 = b(n1, t1 = w(t1, o1, a1, n1, r2[i2 + 12], 20, -1926607734), o1, a1, r2[i2 + 5], 4, -378558), a1 = b(a1, n1, t1, o1, r2[i2 + 8], 11, -2022574463), o1 = b(o1, a1, n1, t1, r2[i2 + 11], 16, 1839030562), t1 = b(t1, o1, a1, n1, r2[i2 + 14], 23, -35309556), n1 = b(n1, t1, o1, a1, r2[i2 + 1], 4, -1530992060), a1 = b(a1, n1, t1, o1, r2[i2 + 4], 11, 1272893353), o1 = b(o1, a1, n1, t1, r2[i2 + 7], 16, -155497632), t1 = b(t1, o1, a1, n1, r2[i2 + 10], 23, -1094730640), n1 = b(n1, t1, o1, a1, r2[i2 + 13], 4, 681279174), a1 = b(a1, n1, t1, o1, r2[i2], 11, -358537222), o1 = b(o1, a1, n1, t1, r2[i2 + 3], 16, -722521979), t1 = b(t1, o1, a1, n1, r2[i2 + 6], 23, 76029189), n1 = b(n1, t1, o1, a1, r2[i2 + 9], 4, -640364487), a1 = b(a1, n1, t1, o1, r2[i2 + 12], 11, -421815835), o1 = b(o1, a1, n1, t1, r2[i2 + 15], 16, 530742520), n1 = A(n1, t1 = b(t1, o1, a1, n1, r2[i2 + 2], 23, -995338651), o1, a1, r2[i2], 6, -198630844), a1 = A(a1, n1, t1, o1, r2[i2 + 7], 10, 1126891415), o1 = A(o1, a1, n1, t1, r2[i2 + 14], 15, -1416354905), t1 = A(t1, o1, a1, n1, r2[i2 + 5], 21, -57434055), n1 = A(n1, t1, o1, a1, r2[i2 + 12], 6, 1700485571), a1 = A(a1, n1, t1, o1, r2[i2 + 3], 10, -1894986606), o1 = A(o1, a1, n1, t1, r2[i2 + 10], 15, -1051523), t1 = A(t1, o1, a1, n1, r2[i2 + 1], 21, -2054922799), n1 = A(n1, t1, o1, a1, r2[i2 + 8], 6, 1873313359), a1 = A(a1, n1, t1, o1, r2[i2 + 15], 10, -30611744), o1 = A(o1, a1, n1, t1, r2[i2 + 6], 15, -1560198380), t1 = A(t1, o1, a1, n1, r2[i2 + 13], 21, 1309151649), n1 = A(n1, t1, o1, a1, r2[i2 + 4], 6, -145523070), a1 = A(a1, n1, t1, o1, r2[i2 + 11], 10, -1120210379), o1 = A(o1, a1, n1, t1, r2[i2 + 2], 15, 718787259), t1 = A(t1, o1, a1, n1, r2[i2 + 9], 21, -343485551), n1 = y(n1, u2), t1 = y(t1, f1), o1 = y(o1, s1), a1 = y(a1, c1);
            }
            return [
                n1,
                t1,
                o1,
                a1
            ];
        }(function(r2) {
            if (0 === r2.length) return [];
            for(var e1 = 8 * r2.length, n1 = new Uint32Array(h(e1)), t1 = 0; t1 < e1; t1 += 8)n1[t1 >> 5] |= (255 & r2[t1 / 8]) << t1 % 32;
            return n1;
        }(r1), 8 * r1.length));
    });
    function I(r1, e1, n1, t1) {
        switch(r1){
            case 0:
                return e1 & n1 ^ ~e1 & t1;
            case 1:
                return e1 ^ n1 ^ t1;
            case 2:
                return e1 & n1 ^ e1 & t1 ^ n1 & t1;
            case 3:
                return e1 ^ n1 ^ t1;
        }
    }
    function C(r1, e1) {
        return r1 << e1 | r1 >>> 32 - e1;
    }
    var R = p("v5", 80, function(r1) {
        var e1 = [
            1518500249,
            1859775393,
            2400959708,
            3395469782
        ], n1 = [
            1732584193,
            4023233417,
            2562383102,
            271733878,
            3285377520
        ];
        if ("string" == typeof r1) {
            var t1 = unescape(encodeURIComponent(r1));
            r1 = [];
            for(var o1 = 0; o1 < t1.length; ++o1)r1.push(t1.charCodeAt(o1));
        } else Array.isArray(r1) || (r1 = Array.prototype.slice.call(r1));
        r1.push(128);
        for(var a1 = r1.length / 4 + 2, i2 = Math.ceil(a1 / 16), u2 = new Array(i2), f1 = 0; f1 < i2; ++f1){
            for(var s1 = new Uint32Array(16), c1 = 0; c1 < 16; ++c1)s1[c1] = r1[64 * f1 + 4 * c1] << 24 | r1[64 * f1 + 4 * c1 + 1] << 16 | r1[64 * f1 + 4 * c1 + 2] << 8 | r1[64 * f1 + 4 * c1 + 3];
            u2[f1] = s1;
        }
        u2[i2 - 1][14] = 8 * (r1.length - 1) / Math.pow(2, 32), u2[i2 - 1][14] = Math.floor(u2[i2 - 1][14]), u2[i2 - 1][15] = 8 * (r1.length - 1) & 4294967295;
        for(var l1 = 0; l1 < i2; ++l1){
            for(var d1 = new Uint32Array(80), v1 = 0; v1 < 16; ++v1)d1[v1] = u2[l1][v1];
            for(var p1 = 16; p1 < 80; ++p1)d1[p1] = C(d1[p1 - 3] ^ d1[p1 - 8] ^ d1[p1 - 14] ^ d1[p1 - 16], 1);
            for(var h1 = n1[0], y1 = n1[1], g1 = n1[2], m1 = n1[3], w1 = n1[4], b1 = 0; b1 < 80; ++b1){
                var A1 = Math.floor(b1 / 20), U1 = C(h1, 5) + I(A1, y1, g1, m1) + w1 + e1[A1] + d1[b1] >>> 0;
                w1 = m1, m1 = g1, g1 = C(y1, 30) >>> 0, y1 = h1, h1 = U1;
            }
            n1[0] = n1[0] + h1 >>> 0, n1[1] = n1[1] + y1 >>> 0, n1[2] = n1[2] + g1 >>> 0, n1[3] = n1[3] + m1 >>> 0, n1[4] = n1[4] + w1 >>> 0;
        }
        return [
            n1[0] >> 24 & 255,
            n1[0] >> 16 & 255,
            n1[0] >> 8 & 255,
            255 & n1[0],
            n1[1] >> 24 & 255,
            n1[1] >> 16 & 255,
            n1[1] >> 8 & 255,
            255 & n1[1],
            n1[2] >> 24 & 255,
            n1[2] >> 16 & 255,
            n1[2] >> 8 & 255,
            255 & n1[2],
            n1[3] >> 24 & 255,
            n1[3] >> 16 & 255,
            n1[3] >> 8 & 255,
            255 & n1[3],
            n1[4] >> 24 & 255,
            n1[4] >> 16 & 255,
            n1[4] >> 8 & 255,
            255 & n1[4]
        ];
    });
    r.NIL = "00000000-0000-0000-0000-000000000000", r.parse = v, r.stringify = c, r.v1 = function(r1, e1, n1) {
        var o1 = e1 && n1 || 0, a1 = e1 || new Array(16), f1 = (r1 = r1 || {
        }).node || i1, s1 = (void 0) !== r1.clockseq ? r1.clockseq : u1;
        if (null == f1 || null == s1) {
            var v1 = r1.random || (r1.rng || t)();
            null == f1 && (f1 = i1 = [
                1 | v1[0],
                v1[1],
                v1[2],
                v1[3],
                v1[4],
                v1[5]
            ]), null == s1 && (s1 = u1 = 16383 & (v1[6] << 8 | v1[7]));
        }
        var p1 = (void 0) !== r1.msecs ? r1.msecs : Date.now(), h1 = (void 0) !== r1.nsecs ? r1.nsecs : d + 1, y1 = p1 - l + (h1 - d) / 10000;
        if (y1 < 0 && (void 0) === r1.clockseq && (s1 = s1 + 1 & 16383), (y1 < 0 || p1 > l) && (void 0) === r1.nsecs && (h1 = 0), h1 >= 10000) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
        l = p1, d = h1, u1 = s1;
        var g1 = (10000 * (268435455 & (p1 += 12219292800000)) + h1) % 4294967296;
        a1[o1++] = g1 >>> 24 & 255, a1[o1++] = g1 >>> 16 & 255, a1[o1++] = g1 >>> 8 & 255, a1[o1++] = 255 & g1;
        var m1 = p1 / 4294967296 * 10000 & 268435455;
        a1[o1++] = m1 >>> 8 & 255, a1[o1++] = 255 & m1, a1[o1++] = m1 >>> 24 & 15 | 16, a1[o1++] = m1 >>> 16 & 255, a1[o1++] = s1 >>> 8 | 128, a1[o1++] = 255 & s1;
        for(var w1 = 0; w1 < 6; ++w1)a1[o1 + w1] = f1[w1];
        return e1 || c(a1);
    }, r.v3 = U, r.v4 = function(r1, e1, n1) {
        var o1 = (r1 = r1 || {
        }).random || (r1.rng || t)();
        if (o1[6] = 15 & o1[6] | 64, o1[8] = 63 & o1[8] | 128, e1) {
            n1 = n1 || 0;
            for(var a1 = 0; a1 < 16; ++a1)e1[n1 + a1] = o1[a1];
            return e1;
        }
        return c(o1);
    }, r.v5 = R, r.validate = a, r.version = function(r1) {
        if (!a(r1)) throw TypeError("Invalid UUID");
        return parseInt(r1.substr(14, 1), 16);
    }, Object.defineProperty(r, "__esModule", {
        value: !0
    });
});
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
const starter = `import { useState } from "react";\nimport { css, Global } from "@emotion/react";\n\nconst Slider = () => {\n  const steps = 128;\n  const [sliderValue, setSlider] = useState(steps / 2);\n  return <>\n    <input max={steps}\n      css={\`\n        appearance: none;\n        width: 100%;\n        height: 40px; \n        background: rgb(\${255 / steps * sliderValue} \${255 / steps * (steps - sliderValue)} 0); \n        outline: none; \n    \`} type="range"\n      aria-label="font size changer"\n      value={sliderValue}\n      step="1"\n      onChangeCapture={(e) => setSlider(Number(e.currentTarget.value))}>\n    </input>\n    <p\n      css={css\`\n        font-size: \${72 / steps * sliderValue}px\n        \`}>\n      Example when the text gets bigger...\n    </p>\n    <p css={css\`\n        font-size: \${72 / steps * (steps - sliderValue)}px\n        \`}>\n      ...or smaller\n    </p>\n  </>\n}\n\nexport default () => <>\n  <Global styles={css\`\n      body{\n          margin: 0;\n          overflow: overlay;\n        }  \n    \`} />\n  <Slider />\n</>\n`;
(function(d, h) {
    typeof exports == "object" && typeof module != "undefined" ? h(exports) : typeof define == "function" && define.amd ? define([
        "exports"
    ], h) : (d = d || self, h(d.Diff = {
    }));
})(this, function(d) {
    "use strict";
    function h() {
    }
    h.prototype = {
        diff: function(n, t) {
            var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
            }, f = r.callback;
            typeof r == "function" && (f = r, r = {
            }), this.options = r;
            var i = this;
            function l(c) {
                return f ? (setTimeout(function() {
                    f(void 0, c);
                }, 0), !0) : c;
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
            function w() {
                for(var c = -1 * u; c <= u; c += 2){
                    var L = void 0, F = v[c - 1], m = v[c + 1], N = (m ? m.newPos : 0) - c;
                    F && (v[c - 1] = void 0);
                    var y = F && F.newPos + 1 < s, A = m && 0 <= N && N < o;
                    if (!y && !A) {
                        v[c] = void 0;
                        continue;
                    }
                    if (!y || A && F.newPos < m.newPos ? (L = H(m), i.pushComponent(L.components, void 0, !0)) : (L = F, L.newPos++, i.pushComponent(L.components, !0, void 0)), N = i.extractCommon(L, t, n, c), L.newPos + 1 >= s && N + 1 >= o) return l(x(i, L.components, t, n, i.useLongestToken));
                    v[c] = L;
                }
                u++;
            }
            if (f) (function c() {
                setTimeout(function() {
                    if (u > p) return f();
                    w() || c();
                }, 0);
            })();
            else for(; u <= p;){
                var g = w();
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
    function x(e, n, t, r, f) {
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
                    p = p.map(function(w, g) {
                        var c = r[o + g];
                        return c.length > w.length ? c : w;
                    }), u.value = e.join(p);
                } else u.value = e.join(t.slice(s, s + u.count));
                s += u.count, u.added || (o += u.count);
            }
        }
        var a = n[l - 1];
        return (l > 1 && typeof a.value == "string" && (a.added || a.removed) && e.equals("", a.value) && (n[l - 2].value += a.value, n.pop()), n);
    }
    function H(e) {
        return {
            newPos: e.newPos,
            components: e.components.slice(0)
        };
    }
    var S = new h;
    function W(e, n, t) {
        return S.diff(e, n, t);
    }
    function $(e, n) {
        if (typeof e == "function") n.callback = e;
        else if (e) for(var t in e)e.hasOwnProperty(t) && (n[t] = e[t]);
        return n;
    }
    var B = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/, fe = /\S/, P = new h;
    P.equals = function(e, n) {
        return this.options.ignoreCase && (e = e.toLowerCase(), n = n.toLowerCase()), e === n || this.options.ignoreWhitespace && !fe.test(e) && !fe.test(n);
    }, P.tokenize = function(e) {
        for(var n = e.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/), t = 0; t < n.length - 1; t++)!n[t + 1] && n[t + 2] && B.test(n[t]) && B.test(n[t + 2]) && (n[t] += n[t + 2], n.splice(t + 1, 2), t--);
        return n;
    };
    function me(e, n, t) {
        return (t = $(t, {
            ignoreWhitespace: !0
        }), P.diff(e, n, t));
    }
    function xe(e, n, t) {
        return P.diff(e, n, t);
    }
    var U = new h;
    U.tokenize = function(e) {
        var n = [], t = e.split(/(\n|\r\n)/);
        t[t.length - 1] || t.pop();
        for(var r = 0; r < t.length; r++){
            var f = t[r];
            r % 2 && !this.options.newlineIsToken ? n[n.length - 1] += f : (this.options.ignoreWhitespace && (f = f.trim()), n.push(f));
        }
        return n;
    };
    function le(e, n, t) {
        return U.diff(e, n, t);
    }
    function Fe(e, n, t) {
        var r = $(t, {
            ignoreWhitespace: !0
        });
        return U.diff(e, n, r);
    }
    var se = new h;
    se.tokenize = function(e) {
        return e.split(/(\S.+?[.!?])(?=\s+|$)/);
    };
    function Ne(e, n, t) {
        return se.diff(e, n, t);
    }
    var oe = new h;
    oe.tokenize = function(e) {
        return e.split(/([{}:;,]|\s+)/);
    };
    function Se(e, n, t) {
        return oe.diff(e, n, t);
    }
    function V(e) {
        return (typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? V = function(n) {
            return typeof n;
        } : V = function(n) {
            return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }, V(e));
    }
    function b(e) {
        return He(e) || Ie(e) || be(e) || Ae();
    }
    function He(e) {
        if (Array.isArray(e)) return j(e);
    }
    function Ie(e) {
        if (typeof Symbol != "undefined" && Symbol.iterator in Object(e)) return Array.from(e);
    }
    function be(e, n) {
        if (!e) return;
        if (typeof e == "string") return j(e, n);
        var t = Object.prototype.toString.call(e).slice(8, -1);
        if ((t === "Object" && e.constructor && (t = e.constructor.name), t === "Map" || t === "Set")) return Array.from(e);
        if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) return j(e, n);
    }
    function j(e, n) {
        (n == null || n > e.length) && (n = e.length);
        for(var t = 0, r = new Array(n); t < n; t++)r[t] = e[t];
        return r;
    }
    function Ae() {
        throw new TypeError(`Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var Ee = Object.prototype.toString, J = new h;
    J.useLongestToken = !0, J.tokenize = U.tokenize, J.castInput = function(e) {
        var n = this.options, t = n.undefinedReplacement, r = n.stringifyReplacer, f = r === void 0 ? function(i, l) {
            return typeof l == "undefined" ? t : l;
        } : r;
        return typeof e == "string" ? e : JSON.stringify(X(e, null, null, f), f, "  ");
    }, J.equals = function(e, n) {
        return h.prototype.equals.call(J, e.replace(/,([\r\n])/g, "$1"), n.replace(/,([\r\n])/g, "$1"));
    };
    function Te(e, n, t) {
        return J.diff(e, n, t);
    }
    function X(e, n, t, r, f) {
        n = n || [], t = t || [], r && (e = r(f, e));
        var i;
        for(i = 0; i < n.length; i += 1)if (n[i] === e) return t[i];
        var l;
        if (Ee.call(e) === "[object Array]") {
            for((n.push(e), l = new Array(e.length), t.push(l), i = 0); i < e.length; i += 1)l[i] = X(e[i], n, t, r, f);
            return (n.pop(), t.pop(), l);
        }
        if ((e && e.toJSON && (e = e.toJSON()), V(e) === "object" && e !== null)) {
            n.push(e), l = {
            }, t.push(l);
            var s = [], o;
            for(o in e)e.hasOwnProperty(o) && s.push(o);
            for((s.sort(), i = 0); i < s.length; i += 1)o = s[i], l[o] = X(e[o], n, t, r, o);
            n.pop(), t.pop();
        } else l = e;
        return l;
    }
    var Z = new h;
    Z.tokenize = function(e) {
        return e.slice();
    }, Z.join = Z.removeEmpty = function(e) {
        return e;
    };
    function Oe(e, n, t) {
        return Z.diff(e, n, t);
    }
    function G(e) {
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
                var v = p[1] === "---" ? "old" : "new", a = p[2].split("	", 2), w = a[0].replace(/\\\\/g, "\\");
                /^".*"$/.test(w) && (w = w.substr(1, w.length - 2)), u[v + "FileName"] = w, u[v + "Header"] = (a[1] || "").trim(), i++;
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
            for(var w = 0, g = 0; i < t.length && !(t[i].indexOf("--- ") === 0 && i + 2 < t.length && t[i + 1].indexOf("+++ ") === 0 && t[i + 2].indexOf("@@") === 0); i++){
                var c = t[i].length == 0 && i != t.length - 1 ? " " : t[i][0];
                if (c === "+" || c === "-" || c === " " || c === "\\") a.lines.push(t[i]), a.linedelimiters.push(r[i] || `\n`), c === "+" ? w++ : c === "-" ? g++ : c === " " && (w++, g++);
                else break;
            }
            if ((!w && a.newLines === 1 && (a.newLines = 0), !g && a.oldLines === 1 && (a.oldLines = 0), n.strict)) {
                if (w !== a.newLines) throw new Error("Added line count did not match for hunk at line " + (u + 1));
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
    function ue(e, n) {
        var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
        };
        if ((typeof n == "string" && (n = G(n)), Array.isArray(n))) {
            if (n.length > 1) throw new Error("applyPatch only works with a single input.");
            n = n[0];
        }
        var r = e.split(/\r\n|[\n\v\f\r\x85]/), f = e.match(/\r\n|[\n\v\f\r\x85]/g) || [], i = n.hunks, l = t.compareLine || function(re, D, K, C) {
            return D === C;
        }, s = 0, o = t.fuzzFactor || 0, u = 0, p = 0, v, a;
        function w(re, D) {
            for(var K = 0; K < re.lines.length; K++){
                var C = re.lines[K], ie = C.length > 0 ? C[0] : " ", Xe = C.length > 0 ? C.substr(1) : C;
                if (ie === " " || ie === "-") {
                    if (!l(D + 1, r[D], ie, Xe) && (s++, s > o)) return !1;
                    D++;
                }
            }
            return !0;
        }
        for(var g = 0; g < i.length; g++){
            for(var c = i[g], L = r.length - c.oldLines, F = 0, m = p + c.oldStart - 1, N = ze(m, u, L); F !== void 0; F = N())if (w(c, m + F)) {
                c.offset = p += F;
                break;
            }
            if (F === void 0) return !1;
            u = c.offset + c.oldStart + c.oldLines;
        }
        for(var y = 0, A = 0; A < i.length; A++){
            var I = i[A], E = I.oldStart + I.offset + y - 1;
            y += I.newLines - I.oldLines;
            for(var T = 0; T < I.lines.length; T++){
                var O = I.lines[T], z = O.length > 0 ? O[0] : " ", Y = O.length > 0 ? O.substr(1) : O, te = I.linedelimiters[T];
                if (z === " ") E++;
                else if (z === "-") r.splice(E, 1), f.splice(E, 1);
                else if (z === "+") r.splice(E, 0, Y), f.splice(E, 0, te), E++;
                else if (z === "\\") {
                    var R = I.lines[T - 1] ? I.lines[T - 1][0] : null;
                    R === "+" ? v = !0 : R === "-" && (a = !0);
                }
            }
        }
        if (v) for(; !r[r.length - 1];)r.pop(), f.pop();
        else a && (r.push(""), f.push(`\n`));
        for(var q = 0; q < r.length - 1; q++)r[q] = r[q] + f[q];
        return r.join("");
    }
    function We(e, n) {
        typeof e == "string" && (e = G(e));
        var t = 0;
        function r() {
            var f = e[t++];
            if (!f) return n.complete();
            n.loadFile(f, function(i, l) {
                if (i) return n.complete(i);
                var s = ue(l, f, n);
                n.patched(f, s, function(o) {
                    if (o) return n.complete(o);
                    r();
                });
            });
        }
        r();
    }
    function _(e, n, t, r, f, i, l) {
        l || (l = {
        }), typeof l.context == "undefined" && (l.context = 4);
        var s = le(t, r, l);
        s.push({
            value: "",
            lines: []
        });
        function o(F) {
            return F.map(function(m) {
                return " " + m;
            });
        }
        for(var u = [], p = 0, v = 0, a = [], w = 1, g = 1, c = function(m) {
            var N = s[m], y = N.lines || N.value.replace(/\n$/, "").split(`\n`);
            if ((N.lines = y, N.added || N.removed)) {
                var A;
                if (!p) {
                    var I = s[m - 1];
                    p = w, v = g, I && (a = l.context > 0 ? o(I.lines.slice(-l.context)) : [], p -= a.length, v -= a.length);
                }
                (A = a).push.apply(A, b(y.map(function(q) {
                    return (N.added ? "+" : "-") + q;
                }))), N.added ? g += y.length : w += y.length;
            } else {
                if (p) {
                    if (y.length <= l.context * 2 && m < s.length - 2) {
                        var E;
                        (E = a).push.apply(E, b(o(y)));
                    } else {
                        var T, O = Math.min(y.length, l.context);
                        (T = a).push.apply(T, b(o(y.slice(0, O))));
                        var z = {
                            oldStart: p,
                            oldLines: w - p + O,
                            newStart: v,
                            newLines: g - v + O,
                            lines: a
                        };
                        if (m >= s.length - 2 && y.length <= l.context) {
                            var Y = /\n$/.test(t), te = /\n$/.test(r), R = y.length == 0 && a.length > z.oldLines;
                            !Y && R && t.length > 0 && a.splice(z.oldLines, 0, "\\ No newline at end of file"), (!Y && !R || !te) && a.push("\\ No newline at end of file");
                        }
                        u.push(z), p = 0, v = 0, a = [];
                    }
                }
                w += y.length, g += y.length;
            }
        }, L = 0; L < s.length; L++)c(L);
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
        for(var t = 0; t < n.length; t++)if (n[t] !== e[t]) return !1;
        return !0;
    }
    function Je(e) {
        var n = ne(e.lines), t = n.oldLines, r = n.newLines;
        t !== void 0 ? e.oldLines = t : delete e.oldLines, r !== void 0 ? e.newLines = r : delete e.newLines;
    }
    function $e(e, n, t) {
        e = de(e, t), n = de(n, t);
        var r = {
        };
        (e.index || n.index) && (r.index = e.index || n.index), (e.newFileName || n.newFileName) && (ce(e) ? ce(n) ? (r.oldFileName = Q(r, e.oldFileName, n.oldFileName), r.newFileName = Q(r, e.newFileName, n.newFileName), r.oldHeader = Q(r, e.oldHeader, n.oldHeader), r.newHeader = Q(r, e.newHeader, n.newHeader)) : (r.oldFileName = e.oldFileName, r.newFileName = e.newFileName, r.oldHeader = e.oldHeader, r.newHeader = e.newHeader) : (r.oldFileName = n.oldFileName || e.oldFileName, r.newFileName = n.newFileName || e.newFileName, r.oldHeader = n.oldHeader || e.oldHeader, r.newHeader = n.newHeader || e.newHeader)), r.hunks = [];
        for(var f = 0, i = 0, l = 0, s = 0; f < e.hunks.length || i < n.hunks.length;){
            var o = e.hunks[f] || {
                oldStart: Infinity
            }, u = n.hunks[i] || {
                oldStart: Infinity
            };
            if (pe(o, u)) r.hunks.push(ve(o, l)), f++, s += o.newLines - o.oldLines;
            else if (pe(u, o)) r.hunks.push(ve(u, s)), i++, l += u.newLines - u.oldLines;
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
    function de(e, n) {
        if (typeof e == "string") {
            if (/^@@/m.test(e) || /^Index:/m.test(e)) return G(e)[0];
            if (!n) throw new Error("Must provide a base reference or pass in a patch");
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
            theirs: t
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
        for((we(e, i, l), we(e, l, i)); i.index < i.lines.length && l.index < l.lines.length;){
            var s = i.lines[i.index], o = l.lines[l.index];
            if ((s[0] === "-" || s[0] === "+") && (o[0] === "-" || o[0] === "+")) De(e, i, l);
            else if (s[0] === "+" && o[0] === " ") {
                var u;
                (u = e.lines).push.apply(u, b(M(i)));
            } else if (o[0] === "+" && s[0] === " ") {
                var p;
                (p = e.lines).push.apply(p, b(M(l)));
            } else s[0] === "-" && o[0] === " " ? he(e, i, l) : o[0] === "-" && s[0] === " " ? he(e, l, i, !0) : s === o ? (e.lines.push(s), i.index++, l.index++) : ee(e, M(i), M(l));
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
        var f = M(n), i = Be(t, f);
        if (i.merged) {
            var l;
            (l = e.lines).push.apply(l, b(i.merged));
        } else ee(e, r ? i : f, r ? f : i);
    }
    function ee(e, n, t) {
        e.conflict = !0, e.lines.push({
            conflict: !0,
            mine: n,
            theirs: t
        });
    }
    function we(e, n, t) {
        for(; n.offset < t.offset && n.index < n.lines.length;){
            var r = n.lines[n.index++];
            e.lines.push(r), n.offset++;
        }
    }
    function ge(e, n) {
        for(; n.index < n.lines.length;){
            var t = n.lines[n.index++];
            e.lines.push(t);
        }
    }
    function M(e) {
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
    function ye(e) {
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
    function ne(e) {
        var n = 0, t = 0;
        return (e.forEach(function(r) {
            if (typeof r != "string") {
                var f = ne(r.mine), i = ne(r.theirs);
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
    d.Diff = h, d.applyPatch = ue, d.applyPatches = We, d.canonicalize = X, d.convertChangesToDMP = Pe, d.convertChangesToXML = Ue, d.createPatch = qe, d.createTwoFilesPatch = ae, d.diffArrays = Oe, d.diffChars = W, d.diffCss = Se, d.diffJson = Te, d.diffLines = le, d.diffSentences = Ne, d.diffTrimmedLines = Fe, d.diffWords = me, d.diffWordsWithSpace = xe, d.merge = $e, d.parsePatch = G, d.structuredPatch = _, Object.defineProperty(d, "__esModule", {
        value: !0
    });
});
async function Ze(d) {
    const h = await crypto.subtle.digest("SHA-256", d), x = Array.from(new Uint8Array(h)), H = x.map((S)=>("00" + S.toString(16)).slice(-2)
    ).join("");
    return H;
}
const isDiff = (d)=>{
    if (d.length < 10) return !1;
    const h = [
        ...d.slice(0, 8)
    ].filter((H)=>H < "0" || H > "f"
    ).length === 0, x = d.slice(8);
    if (h && x[0] === "[" && x[x.length - 1] === "]") try {
        return JSON.parse(x).length > 1;
    } catch  {
        return !1;
    }
    return !1;
}, assemble = (d, h)=>{
    const x = JSON.parse(h);
    let H = d.slice(), S = "";
    return x.forEach((W)=>{
        if (Number(W) === W) {
            const $ = Math.abs(W), B = H.slice(0, $);
            H = H.slice($), W > 0 && (S += String(B));
        } else S += String(W);
    }), S;
};
async function Ge(d) {
    const h = new TextEncoder().encode(d), x = await Ze(h);
    return x.substr(0, 8);
}
const diff = async (d, h)=>{
    const x = Ge(d), H = Diff.diffChars(d, h);
    return {
        b: await x,
        c: H.map((S)=>S.added ? S.value : S.removed ? -S.count : S.count
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
        IDBTransaction, 
    ]);
}
function getCursorAdvanceMethods() {
    return cursorAdvanceMethods || (cursorAdvanceMethods = [
        IDBCursor.prototype.advance,
        IDBCursor.prototype.continue,
        IDBCursor.prototype.continuePrimaryKey, 
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
async function arrBuffSha256(msgBuffer) {
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b)=>("00" + b.toString(16)).slice(-2)
    ).join("");
    return hashHex;
}
const document = window.document;
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
    if (typeof window === "undefined") return "";
    const document1 = window.document;
    const container = window.document.getElementById("container");
    if (!container) {
        const el = document1.getElementById("container");
        el.id = "container";
        document1.body.appendChild(el);
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
                const aceEditor1 = window["ace"].edit("ace");
                const theme = aceEditor1.getTheme();
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
    aceEditor && document1.getElementById("container").replaceWith(document1.getElementById("ace"));
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
const getDB = ()=>{
    const dbPromise = openDB("localZedCodeStore", 1, {
        upgrade (db) {
            db.createObjectStore("codeStore");
        }
    });
    const dbObj = {
        async get (key, format = "string") {
            let data;
            try {
                data = await (await dbPromise).get("codeStore", key);
                if (!data) return null;
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
                const decoder = new TextDecoder();
                const text = decoder.decode(allData);
                return text;
            }
            return data;
        },
        async put (key, val) {
            let prev;
            try {
                const oldKey = await dbObj.get(key);
                if (oldKey.length === 8 && oldKey !== val) {
                    const actualValue = await dbObj.get(val);
                    const prevValue = await dbObj.get(oldKey);
                    const prevSha = await sha256(prevValue);
                    if (prevSha === oldKey) {
                        const diffObj = await diff(actualValue, prevValue);
                        const diffAsStr = diffObj.b + JSON.stringify(diffObj.c);
                        (await dbPromise).put("codeStore", diffAsStr, prevSha);
                    }
                }
            } catch  {
                prev = "";
            }
            if (prev !== "" && val === prev) return val;
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
    if (!projects || !projects.list) {
        const projectId = v4();
        await codeDB.put(uuid, JSON.stringify({
            list: [
                projectId
            ],
            [projectId]: {
                created: Date.now(),
                lastOpen: Date.now()
            }
        }));
        return [
            projectId
        ];
    }
    return projects.list;
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
    const projects = await getProjects();
    const projectName = projects[0];
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
                const { diff: diff1  } = await import("../../diff/diff.min.js");
                if (latestCode != cd) {
                    return;
                }
                if (errorReported === cd) {
                    return;
                }
                const slices = await diff1(latestGoodCode, cd);
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
    function restartCode(transPiled) {
        const searchRegExp = /import/gi;
        const replaceWith = "///";
        const code = `\n    Object.assign(window, React);\n    if (window.Motion) {\n        Object.assign(window, window.Motion);\n    }\n    if (window.emotionStyled){\n      window.styled= window.emotionStyled;\n    }\n    ;\n    ` + transPiled.replaceAll(searchRegExp, replaceWith).replace("export default", "DefaultElement = ");
        const restart = ()=>{
            const codeToHydrate = mode === "window" ? code.replace("body{", "#root{") : code;
            const hydrate = new Function(`return function(){  \n          let DefaultElement;\n          ${codeToHydrate}\n          return ReactDOM.render(jsx(DefaultElement), document.getElementById("root"));\n      }`)();
            hydrate();
            shareItAsHtml = async ()=>{
                const renderToString = new Function(`return function(){\n            let DefaultElement;\n            ${code}\n            return ReactDOMServer.renderToString(jsx(DefaultElement));\n        }`)();
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
                let title = "(code).zed.vision :)";
                if (HTML.indexOf("<title>") > -1 && HTML.indexOf("</title>") > -1) {
                    title = HTML.slice(HTML.indexOf("<title>") + 7, HTML.indexOf("</title>"));
                }
                const iframe = `<!DOCTYPE html>\n        <html lang="en">\n        <head>\n        <title>${title}</title>\n        <meta name="viewport" content="width=device-width, initial-scale=1">\n        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n        <meta name="Description" content="Generated with code.zed.vision">\n        <head profile="http://www.w3.org/2005/10/profile">\n        <link rel="icon" \n              type="image/png"\n              href="https://zed.vision/favicon.ico">\n        <style>\n        ${bodyStylesFix}\n        ${css}\n        </style>\n        </head>\n        <body>\n        <div id="root">\n        ${HTML}\n        <script crossorigin src="https://unpkg.com/react@17.0.1/umd/react.production.min.js"></script>\n        ${motionDep}\n        <script crossorigin src="https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js"></script>\n        <script crossorigin src="https://unpkg.com/@emotion/react@11.1.2/dist/emotion-react.umd.min.js"></script>\n        <script crossorigin src="https://unpkg.com/@emotion/styled@11.0.0/dist/emotion-styled.umd.min.js"></script>\n        <script type="module">\n        Object.assign(window, emotionReact);\n\n       const styled = window["emotionStyled"];\n\n        let DefaultElement;\n\n        ${code}\n\n        ReactDOM.hydrate(jsx(DefaultElement), document.body.children[0]);\n        </script>\n        </div>\n        \n        </body>\n        </html>\n        `;
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
                const hash = await sha256(latestCode1);
                try {
                    const prevHash = await codeDB.get(projectName);
                    if (prevHash !== hash) {
                        await codeDB.put(hash, latestCode1);
                        await codeDB.put(projectName, hash);
                    }
                } catch (e) {
                    console.error(e);
                }
            };
            saveCode(latestCode);
        }
        firstLoad = false;
        restart();
    }
    async function getCodeToLoad() {
        const db = await getDB();
        const search = new URLSearchParams(window.location.search);
        const keyToLoad = search.get("h") || await db.get(projectName);
        if (keyToLoad) {
            let code;
            try {
                code = await db.get(keyToLoad);
            } catch  {
                console.error("error load key: " + keyToLoad);
            }
            if (code) return code;
            let text;
            try {
                const resp = await fetch(getUrl() + "/?h=" + keyToLoad);
                text = await resp.json();
            } catch (e) {
                const shaHash = await sha256(starter);
                db.put(shaHash, starter);
                await db.put(projectName, shaHash);
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

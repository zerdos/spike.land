async function arrBuffSha256(msgBuffer) {
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b)=>("00" + b.toString(16)).slice(-2)
    ).join("");
    return hashHex;
}
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
var SHAKV;
var USERS;
var API_KEY;
const corsHeaders = {
    "Access-Control-Allow-Origin": "https://zed.vision",
    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
    "Access-Control-Max-Age": "86400"
};
async function handleCloudRequest(request) {
    const psk = String(request.headers.get("API_KEY") || "");
    const url = new URL(request.url);
    const { searchParams , pathname  } = url;
    if (request.method === "GET" && psk && psk === API_KEY) {
        if (pathname === "/keys/") {
            const prefix = searchParams.get("prefix");
            const value = await SHAKV.list({
                prefix
            });
            return new Response(JSON.stringify(value), {
                headers: {
                    ...corsHeaders,
                    "content-type": "application/json;charset=UTF-8"
                }
            });
        }
        if (pathname === "/keys/delete/") {
            const hash = searchParams.get("hash");
            const value = await SHAKV.delete(hash);
            return new Response(JSON.stringify(value), {
                headers: {
                    ...corsHeaders,
                    "content-type": "application/json;charset=UTF-8"
                }
            });
        }
    }
    if (request.method === "GET") {
        const hash = searchParams.get("h");
        if (pathname === "/robots.txt") {
            return new Response("User-agent: * Disallow: /", {
                headers: {
                    ...corsHeaders,
                    "content-type": "text/html;charset=UTF-8"
                }
            });
        }
        if (pathname === "/register") {
            const uuid = v4();
            await USERS.put(uuid, JSON.stringify({
                uuid,
                registered: Date.now(),
                cf: request.cf
            }));
            return new Response(JSON.stringify({
                uuid
            }), {
                headers: {
                    ...corsHeaders,
                    "content-type": "application/json;charset=UTF-8"
                }
            });
        }
        if (hash) {
            const jsonStream = await SHAKV.get(hash, "stream");
            if (jsonStream === null) {
                return new Response(JSON.stringify({
                    error: "Not found"
                }), {
                    headers: {
                        ...corsHeaders,
                        "content-type": "application/json;charset=UTF-8"
                    }
                });
            }
            return new Response(jsonStream, {
                headers: {
                    ...corsHeaders,
                    "content-type": "application/json;charset=UTF-8"
                }
            });
        }
        const pageHash = url.searchParams.get("r");
        if (pageHash) {
            const jsonStream = await SHAKV.get(pageHash, "stream");
            if (jsonStream !== null) {
                return new Response(jsonStream, {
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "text/html; charset=UTF-8"
                    }
                });
            }
        }
        const maybeRoute = pathname.substr(1);
        if (maybeRoute) {
            const jsonStream = await SHAKV.get(maybeRoute, "stream");
            if (jsonStream !== null) {
                return new Response(jsonStream, {
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "text/html; charset=UTF-8"
                    }
                });
            }
        }
        return Response.redirect("https://zed.vision/code", 301);
    } else if (request.method === "POST") {
        const myBuffer = await request.arrayBuffer();
        const hash = await arrBuffSha256(myBuffer);
        const smallerKey = hash.substring(0, 8);
        await SHAKV.put(smallerKey, myBuffer);
        return new Response(JSON.stringify({
            hash: smallerKey
        }), {
            headers: {
                ...corsHeaders,
                "content-type": "application/json;charset=UTF-8"
            }
        });
    }
    return new Response(request.body, {
        headers: {
            ...request.headers,
            ...corsHeaders,
            "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers")
        }
    });
}
addEventListener("fetch", (event)=>{
    event.respondWith(handleCloudRequest(event.request));
});

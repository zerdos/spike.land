// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function sheetForTag(e1) {
    if (e1.sheet) return e1.sheet;
    for(var t4 = 0; t4 < document.styleSheets.length; t4++)if (document.styleSheets[t4].ownerNode === e1) return document.styleSheets[t4];
}
function createStyleElement(e2) {
    var t5 = document.createElement("style");
    t5.setAttribute("data-emotion", e2.key);
    void 0 !== e2.nonce && t5.setAttribute("nonce", e2.nonce);
    t5.appendChild(document.createTextNode(""));
    t5.setAttribute("data-s", "");
    return t5;
}
var e = function() {
    function StyleSheet(e4) {
        var t6 = this;
        this._insertTag = function(e5) {
            var r5;
            r5 = 0 === t6.tags.length ? t6.insertionPoint ? t6.insertionPoint.nextSibling : t6.prepend ? t6.container.firstChild : t6.before : t6.tags[t6.tags.length - 1].nextSibling;
            t6.container.insertBefore(e5, r5);
            t6.tags.push(e5);
        };
        this.isSpeedy = void 0 === e4.speedy ? "production" === process.env.NODE_ENV : e4.speedy;
        this.tags = [];
        this.ctr = 0;
        this.nonce = e4.nonce;
        this.key = e4.key;
        this.container = e4.container;
        this.prepend = e4.prepend;
        this.insertionPoint = e4.insertionPoint;
        this.before = null;
    }
    var e3 = StyleSheet.prototype;
    e3.hydrate = function hydrate(e6) {
        e6.forEach(this._insertTag);
    };
    e3.insert = function insert(e7) {
        this.ctr % (this.isSpeedy ? 65000 : 1) === 0 && this._insertTag(createStyleElement(this));
        var t7 = this.tags[this.tags.length - 1];
        if ("production" !== process.env.NODE_ENV) {
            var r6 = 64 === e7.charCodeAt(0) && 105 === e7.charCodeAt(1);
            r6 && this._alreadyInsertedOrderInsensitiveRule && console.error("You're attempting to insert the following rule:\n" + e7 + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.");
            this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !r6;
        }
        if (this.isSpeedy) {
            var n6 = sheetForTag(t7);
            try {
                n6.insertRule(e7, n6.cssRules.length);
            } catch (t8) {
                "production" === process.env.NODE_ENV || /:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear){/.test(e7) || console.error('There was a problem inserting the following rule: "' + e7 + '"', t8);
            }
        } else t7.appendChild(document.createTextNode(e7));
        this.ctr++;
    };
    e3.flush = function flush() {
        this.tags.forEach(function(e8) {
            return e8.parentNode && e8.parentNode.removeChild(e8);
        });
        this.tags = [];
        this.ctr = 0;
        "production" !== process.env.NODE_ENV && (this._alreadyInsertedOrderInsensitiveRule = false);
    };
    return StyleSheet;
}();
var e1 = "-ms-";
var r = "-moz-";
var a = "-webkit-";
var c = "comm";
var t = "rule";
var n = "decl";
var u = "@import";
var v = "@keyframes";
var k = Math.abs;
var w = String.fromCharCode;
var x = Object.assign;
function hash(e11, r1) {
    return (((r1 << 2 ^ charat(e11, 0)) << 2 ^ charat(e11, 1)) << 2 ^ charat(e11, 2)) << 2 ^ charat(e11, 3);
}
function trim(e2) {
    return e2.trim();
}
function match(e3, r2) {
    return (e3 = r2.exec(e3)) ? e3[0] : e3;
}
function replace(e4, r3, a1) {
    return e4.replace(r3, a1);
}
function indexof(e5, r4) {
    return e5.indexOf(r4);
}
function charat(e6, r5) {
    return 0 | e6.charCodeAt(r5);
}
function substr(e7, r6, a2) {
    return e7.slice(r6, a2);
}
function strlen(e8) {
    return e8.length;
}
function sizeof(e9) {
    return e9.length;
}
function append(e10, r7) {
    return r7.push(e10), e10;
}
function combine(e11, r8) {
    return e11.map(r8).join("");
}
var $ = 1;
var g = 1;
var z = 0;
var y = 0;
var j = 0;
var C = "";
function node(e12, r9, a3, c1, t1, n1, s1) {
    return {
        value: e12,
        root: r9,
        parent: a3,
        type: c1,
        props: t1,
        children: n1,
        line: $,
        column: g,
        length: s1,
        return: ""
    };
}
function copy(e13, r10) {
    return x(node("", null, null, "", null, null, 0), e13, {
        length: -e13.length
    }, r10);
}
function __char() {
    return j;
}
function prev() {
    j = y > 0 ? charat(C, --y) : 0;
    (g--, 10 === j) && (g = 1, $--);
    return j;
}
function next() {
    j = y < z ? charat(C, y++) : 0;
    (g++, 10 === j) && (g = 1, $++);
    return j;
}
function peek() {
    return charat(C, y);
}
function caret() {
    return y;
}
function slice(e14, r11) {
    return substr(C, e14, r11);
}
function token(e15) {
    switch(e15){
        case 0:
        case 9:
        case 10:
        case 13:
        case 32:
            return 5;
        case 33:
        case 43:
        case 44:
        case 47:
        case 62:
        case 64:
        case 126:
        case 59:
        case 123:
        case 125:
            return 4;
        case 58:
            return 3;
        case 34:
        case 39:
        case 40:
        case 91:
            return 2;
        case 41:
        case 93:
            return 1;
    }
    return 0;
}
function alloc(e16) {
    return $ = g = 1, z = strlen(C = e16), y = 0, [];
}
function dealloc(e17) {
    return C = "", e17;
}
function delimit(e18) {
    return trim(slice(y - 1, delimiter(91 === e18 ? e18 + 2 : 40 === e18 ? e18 + 1 : e18)));
}
function whitespace(e20) {
    while(j = peek()){
        if (!(j < 33)) break;
        next();
    }
    return token(e20) > 2 || token(j) > 3 ? "" : " ";
}
function escaping(e22, r12) {
    while(--r12 && next())if (j < 48 || j > 102 || j > 57 && j < 65 || j > 70 && j < 97) break;
    return slice(e22, caret() + (r12 < 6 && 32 == peek() && 32 == next()));
}
function delimiter(e23) {
    while(next())switch(j){
        case e23:
            return y;
        case 34:
        case 39:
            34 !== e23 && 39 !== e23 && delimiter(j);
            break;
        case 40:
            41 === e23 && delimiter(e23);
            break;
        case 92:
            next();
            break;
    }
    return y;
}
function commenter(e24, r13) {
    while(next()){
        if (e24 + j === 57) break;
        if (e24 + j === 84 && 47 === peek()) break;
    }
    return "/*" + slice(r13, y - 1) + "*" + w(47 === e24 ? e24 : next());
}
function identifier(e25) {
    while(!token(peek()))next();
    return slice(e25, y);
}
function compile(e26) {
    return dealloc(parse("", null, null, null, [
        ""
    ], e26 = alloc(e26), 0, [
        0
    ], e26));
}
function parse(e27, r14, a4, c2, t2, n2, s2, i1, u1) {
    var l1 = 0;
    var o1 = 0;
    var p1 = s2;
    var f1 = 0;
    var h1 = 0;
    var v1 = 0;
    var d1 = 1;
    var m1 = 1;
    var b1 = 1;
    var k1 = 0;
    var x1 = "";
    var $1 = t2;
    var g1 = n2;
    var z1 = c2;
    var y1 = x1;
    while(m1)switch(v1 = k1, k1 = next()){
        case 40:
            if (108 != v1 && 58 == y1.charCodeAt(p1 - 1)) {
                -1 != indexof(y1 += replace(delimit(k1), "&", "&\f"), "&\f") && (b1 = -1);
                break;
            }
        case 34:
        case 39:
        case 91:
            y1 += delimit(k1);
            break;
        case 9:
        case 10:
        case 13:
        case 32:
            y1 += whitespace(v1);
            break;
        case 92:
            y1 += escaping(caret() - 1, 7);
            continue;
        case 47:
            switch(peek()){
                case 42:
                case 47:
                    append(comment(commenter(next(), caret()), r14, a4), u1);
                    break;
                default:
                    y1 += "/";
            }
            break;
        case 123 * d1:
            i1[l1++] = strlen(y1) * b1;
        case 125 * d1:
        case 59:
        case 0:
            switch(k1){
                case 0:
                case 125:
                    m1 = 0;
                case 59 + o1:
                    h1 > 0 && strlen(y1) - p1 && append(h1 > 32 ? declaration(y1 + ";", c2, a4, p1 - 1) : declaration(replace(y1, " ", "") + ";", c2, a4, p1 - 2), u1);
                    break;
                case 59:
                    y1 += ";";
                default:
                    append(z1 = ruleset(y1, r14, a4, l1, o1, t2, i1, x1, $1 = [], g1 = [], p1), n2);
                    if (123 === k1) if (0 === o1) parse(y1, r14, z1, z1, $1, n2, p1, i1, g1);
                    else switch(f1){
                        case 100:
                        case 109:
                        case 115:
                            parse(e27, z1, z1, c2 && append(ruleset(e27, z1, z1, 0, 0, t2, i1, x1, t2, $1 = [], p1), g1), t2, g1, p1, i1, c2 ? $1 : g1);
                            break;
                        default:
                            parse(y1, z1, z1, z1, [
                                ""
                            ], g1, 0, i1, g1);
                    }
            }
            l1 = o1 = h1 = 0, d1 = b1 = 1, x1 = y1 = "", p1 = s2;
            break;
        case 58:
            p1 = 1 + strlen(y1), h1 = v1;
        default:
            if (d1 < 1) {
                if (123 == k1) --d1;
                else if (125 == k1 && 0 == d1++ && 125 == prev()) continue;
            }
            switch(y1 += w(k1), k1 * d1){
                case 38:
                    b1 = o1 > 0 ? 1 : (y1 += "\f", -1);
                    break;
                case 44:
                    i1[l1++] = (strlen(y1) - 1) * b1, b1 = 1;
                    break;
                case 64:
                    45 === peek() && (y1 += delimit(next()));
                    f1 = peek(), o1 = p1 = strlen(x1 = y1 += identifier(caret())), k1++;
                    break;
                case 45:
                    45 === v1 && 2 == strlen(y1) && (d1 = 0);
            }
    }
    return n2;
}
function ruleset(e28, r15, a5, c3, n3, s3, i2, u2, l2, o2, p2) {
    var f2 = n3 - 1;
    var h2 = 0 === n3 ? s3 : [
        ""
    ];
    var v2 = sizeof(h2);
    for(var d2 = 0, m2 = 0, b2 = 0; d2 < c3; ++d2)for(var w1 = 0, x2 = substr(e28, f2 + 1, f2 = k(m2 = i2[d2])), $2 = e28; w1 < v2; ++w1)($2 = trim(m2 > 0 ? h2[w1] + " " + x2 : replace(x2, /&\f/g, h2[w1]))) && (l2[b2++] = $2);
    return node(e28, r15, a5, 0 === n3 ? t : u2, l2, o2, p2);
}
function comment(e29, r16, a6) {
    return node(e29, r16, a6, c, w(__char()), substr(e29, 2, -2), 0);
}
function declaration(e30, r17, a7, c4) {
    return node(e30, r17, a7, n, substr(e30, 0, c4), substr(e30, c4 + 1, -1), c4);
}
function prefix(c5, t3) {
    switch(hash(c5, t3)){
        case 5103:
            return a + "print-" + c5 + c5;
        case 5737:
        case 4201:
        case 3177:
        case 3433:
        case 1641:
        case 4457:
        case 2921:
        case 5572:
        case 6356:
        case 5844:
        case 3191:
        case 6645:
        case 3005:
        case 6391:
        case 5879:
        case 5623:
        case 6135:
        case 4599:
        case 4855:
        case 4215:
        case 6389:
        case 5109:
        case 5365:
        case 5621:
        case 3829:
            return a + c5 + c5;
        case 5349:
        case 4246:
        case 4810:
        case 6968:
        case 2756:
            return a + c5 + r + c5 + e1 + c5 + c5;
        case 6828:
        case 4268:
            return a + c5 + e1 + c5 + c5;
        case 6165:
            return a + c5 + e1 + "flex-" + c5 + c5;
        case 5187:
            return a + c5 + replace(c5, /(\w+).+(:[^]+)/, a + "box-$1$2" + e1 + "flex-$1$2") + c5;
        case 5443:
            return a + c5 + e1 + "flex-item-" + replace(c5, /flex-|-self/, "") + c5;
        case 4675:
            return a + c5 + e1 + "flex-line-pack" + replace(c5, /align-content|flex-|-self/, "") + c5;
        case 5548:
            return a + c5 + e1 + replace(c5, "shrink", "negative") + c5;
        case 5292:
            return a + c5 + e1 + replace(c5, "basis", "preferred-size") + c5;
        case 6060:
            return a + "box-" + replace(c5, "-grow", "") + a + c5 + e1 + replace(c5, "grow", "positive") + c5;
        case 4554:
            return a + replace(c5, /([^-])(transform)/g, "$1" + a + "$2") + c5;
        case 6187:
            return replace(replace(replace(c5, /(zoom-|grab)/, a + "$1"), /(image-set)/, a + "$1"), c5, "") + c5;
        case 5495:
        case 3959:
            return replace(c5, /(image-set\([^]*)/, a + "$1$`$1");
        case 4968:
            return replace(replace(c5, /(.+:)(flex-)?(.*)/, a + "box-pack:$3" + e1 + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + a + c5 + c5;
        case 4095:
        case 3583:
        case 4068:
        case 2532:
            return replace(c5, /(.+)-inline(.+)/, a + "$1$2") + c5;
        case 8116:
        case 7059:
        case 5753:
        case 5535:
        case 5445:
        case 5701:
        case 4933:
        case 4677:
        case 5533:
        case 5789:
        case 5021:
        case 4765:
            if (strlen(c5) - 1 - t3 > 6) switch(charat(c5, t3 + 1)){
                case 109:
                    if (45 !== charat(c5, t3 + 4)) break;
                case 102:
                    return replace(c5, /(.+:)(.+)-([^]+)/, "$1" + a + "$2-$3$1" + r + (108 == charat(c5, t3 + 3) ? "$3" : "$2-$3")) + c5;
                case 115:
                    return ~indexof(c5, "stretch") ? prefix(replace(c5, "stretch", "fill-available"), t3) + c5 : c5;
            }
            break;
        case 4949:
            if (115 !== charat(c5, t3 + 1)) break;
        case 6444:
            switch(charat(c5, strlen(c5) - 3 - (~indexof(c5, "!important") && 10))){
                case 107:
                    return replace(c5, ":", ":" + a) + c5;
                case 101:
                    return replace(c5, /(.+:)([^;!]+)(;|!.+)?/, "$1" + a + (45 === charat(c5, 14) ? "inline-" : "") + "box$3$1" + a + "$2$3$1" + e1 + "$2box$3") + c5;
            }
            break;
        case 5936:
            switch(charat(c5, t3 + 11)){
                case 114:
                    return a + c5 + e1 + replace(c5, /[svh]\w+-[tblr]{2}/, "tb") + c5;
                case 108:
                    return a + c5 + e1 + replace(c5, /[svh]\w+-[tblr]{2}/, "tb-rl") + c5;
                case 45:
                    return a + c5 + e1 + replace(c5, /[svh]\w+-[tblr]{2}/, "lr") + c5;
            }
            return a + c5 + e1 + c5 + c5;
    }
    return c5;
}
function serialize(e31, r18) {
    var a8 = "";
    var c6 = sizeof(e31);
    for(var t4 = 0; t4 < c6; t4++)a8 += r18(e31[t4], t4, e31, r18) || "";
    return a8;
}
function stringify(e32, r, a9, s4) {
    switch(e32.type){
        case u:
        case n:
            return e32.return = e32.return || e32.value;
        case c:
            return "";
        case v:
            return e32.return = e32.value + "{" + serialize(e32.children, s4) + "}";
        case t:
            e32.value = e32.props.join(",");
    }
    return strlen(a9 = serialize(e32.children, s4)) ? e32.return = e32.value + "{" + a9 + "}" : "";
}
function middleware(e33) {
    var r19 = sizeof(e33);
    return function(a10, c7, t5, n4) {
        var s5 = "";
        for(var i3 = 0; i3 < r19; i3++)s5 += e33[i3](a10, c7, t5, n4) || "";
        return s5;
    };
}
function rulesheet(e34) {
    return function(r20) {
        r20.root || (r20 = r20.return) && e34(r20);
    };
}
function prefixer(c8, s, i, u3) {
    if (c8.length > -1 && !c8.return) switch(c8.type){
        case n:
            c8.return = prefix(c8.value, c8.length);
            break;
        case v:
            return serialize([
                copy(c8, {
                    value: replace(c8.value, "@", "@" + a)
                })
            ], u3);
        case t:
            if (c8.length) return combine(c8.props, function(t6) {
                switch(match(t6, /(::plac\w+|:read-\w+)/)){
                    case ":read-only":
                    case ":read-write":
                        return serialize([
                            copy(c8, {
                                props: [
                                    replace(t6, /:(read-\w+)/, ":" + r + "$1")
                                ]
                            })
                        ], u3);
                    case "::placeholder":
                        return serialize([
                            copy(c8, {
                                props: [
                                    replace(t6, /:(plac\w+)/, ":" + a + "input-$1")
                                ]
                            }),
                            copy(c8, {
                                props: [
                                    replace(t6, /:(plac\w+)/, ":" + r + "$1")
                                ]
                            }),
                            copy(c8, {
                                props: [
                                    replace(t6, /:(plac\w+)/, e1 + "input-$1")
                                ]
                            })
                        ], u3);
                }
                return "";
            });
    }
}
var y1 = function last(e12) {
    return e12.length ? e12[e12.length - 1] : null;
};
var g1 = function identifierWithPointTracking(e2, i1, s1) {
    var u1 = 0;
    var l1 = 0;
    while(true){
        u1 = l1;
        l1 = peek();
        38 === u1 && 12 === l1 && (i1[s1] = 1);
        if (token(l1)) break;
        next();
    }
    return slice(e2, y);
};
var b = function toRules(e3, o1) {
    var u2 = -1;
    var l2 = 44;
    do {
        switch(token(l2)){
            case 0:
                38 === l2 && 12 === peek() && (o1[u2] = 1);
                e3[u2] += g1(y - 1, o1, u2);
                break;
            case 2:
                e3[u2] += delimit(l2);
                break;
            case 4:
                if (44 === l2) {
                    e3[++u2] = 58 === peek() ? "&\f" : "";
                    o1[u2] = e3[u2].length;
                    break;
                }
            default:
                e3[u2] += w(l2);
        }
    }while (l2 = next())
    return e3;
};
var w1 = function getRules(e4, r1) {
    return dealloc(b(alloc(e4), r1));
};
var E = new WeakMap;
var k1 = function compat(e5) {
    if ("rule" === e5.type && e5.parent && !(e5.length < 1)) {
        var r2 = e5.value, t1 = e5.parent;
        var n1 = e5.column === t1.column && e5.line === t1.line;
        while("rule" !== t1.type){
            t1 = t1.parent;
            if (!t1) return;
        }
        if ((1 !== e5.props.length || 58 === r2.charCodeAt(0) || E.get(t1)) && !n1) {
            E.set(e5, true);
            var o2 = [];
            var a1 = w1(r2, o2);
            var i2 = t1.props;
            for(var s2 = 0, u3 = 0; s2 < a1.length; s2++)for(var l3 = 0; l3 < i2.length; l3++, u3++)e5.props[u3] = o2[s2] ? a1[s2].replace(/&\f/g, i2[l3]) : i2[l3] + " " + a1[s2];
        }
    }
};
var A = function removeLabel(e6) {
    if ("decl" === e6.type) {
        var r3 = e6.value;
        if (108 === r3.charCodeAt(0) && 98 === r3.charCodeAt(2)) {
            e6.return = "";
            e6.value = "";
        }
    }
};
var N = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason";
var C1 = function isIgnoringComment(e7) {
    return !!e7 && "comm" === e7.type && e7.children.indexOf(N) > -1;
};
var P = function createUnsafeSelectorsAlarm(e8) {
    return function(r4, t2, n2) {
        if ("rule" === r4.type) {
            var o3 = r4.value.match(/(:first|:nth|:nth-last)-child/g);
            if (o3 && true !== e8.compat) {
                var a2 = t2 > 0 ? n2[t2 - 1] : null;
                if (a2 && C1(y1(a2.children))) return;
                o3.forEach(function(e9) {
                    console.error('The pseudo class "' + e9 + '" is potentially unsafe when doing server-side rendering. Try changing it to "' + e9.split("-child")[0] + '-of-type".');
                });
            }
        }
    };
};
var O = function isImportRule(e10) {
    return 105 === e10.type.charCodeAt(1) && 64 === e10.type.charCodeAt(0);
};
var D = function isPrependedWithRegularRules(e11, r5) {
    for(var t3 = e11 - 1; t3 >= 0; t3--)if (!O(r5[t3])) return true;
    return false;
};
var R = function nullifyElement(e12) {
    e12.type = "";
    e12.value = "";
    e12.return = "";
    e12.children = "";
    e12.props = "";
};
var V = function incorrectImportAlarm(e13, r6, t4) {
    if (O(e13)) {
        if (e13.parent) {
            console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
            R(e13);
        } else if (D(r6, t4)) {
            console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
            R(e13);
        }
    }
};
var _ = [
    prefixer
];
var q = function createCache(r7) {
    var t5 = r7.key;
    if ("production" !== process.env.NODE_ENV && !t5) throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements.");
    if ("css" === t5) {
        var n3 = document.querySelectorAll("style[data-emotion]:not([data-s])");
        Array.prototype.forEach.call(n3, function(e14) {
            var r8 = e14.getAttribute("data-emotion");
            if (-1 !== r8.indexOf(" ")) {
                document.head.appendChild(e14);
                e14.setAttribute("data-s", "");
            }
        });
    }
    var o4 = r7.stylisPlugins || _;
    if ("production" !== process.env.NODE_ENV && /[^a-z-]/.test(t5)) throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + t5 + '" was passed');
    var a3 = {};
    var i3;
    var s3 = [];
    i3 = r7.container || document.head;
    Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="' + t5 + ' "]'), function(e15) {
        var r9 = e15.getAttribute("data-emotion").split(" ");
        for(var t6 = 1; t6 < r9.length; t6++)a3[r9[t6]] = true;
        s3.push(e15);
    });
    var u4;
    var l4 = [
        k1,
        A
    ];
    "production" !== process.env.NODE_ENV && l4.push(P({
        get compat () {
            return w11.compat;
        }
    }), V);
    var c1;
    var y11 = [
        stringify,
        "production" !== process.env.NODE_ENV ? function(e16) {
            e16.root || (e16.return ? c1.insert(e16.return) : e16.value && e16.type !== c && c1.insert(e16.value + "{}"));
        } : rulesheet(function(e17) {
            c1.insert(e17);
        })
    ];
    var g11 = middleware(l4.concat(o4, y11));
    var b1 = function stylis(e18) {
        return serialize(compile(e18), g11);
    };
    u4 = function insert(e19, r10, t7, n4) {
        c1 = t7;
        "production" !== process.env.NODE_ENV && void 0 !== r10.map && (c1 = {
            insert: function insert(e20) {
                t7.insert(e20 + r10.map);
            }
        });
        b1(e19 ? e19 + "{" + r10.styles + "}" : r10.styles);
        n4 && (w11.inserted[r10.name] = true);
    };
    var w11 = {
        key: t5,
        sheet: new e({
            key: t5,
            container: i3,
            nonce: r7.nonce,
            speedy: r7.speedy,
            prepend: r7.prepend,
            insertionPoint: r7.insertionPoint
        }),
        nonce: r7.nonce,
        inserted: a3,
        registered: {},
        insert: u4
    };
    w11.sheet.hydrate(s3);
    return w11;
};
var e2 = window.emotionReact, { CacheProvider: o  } = e2, { ClassNames: t1  } = e2, { Global: s  } = e2, { ThemeContext: n1  } = e2, { ThemeProvider: c1  } = e2, { __unsafe_useEmotionCache: r1  } = e2, { createElement: x1  } = e2, { css: p  } = e2, { jsx: a1  } = e2, { keyframes: m  } = e2, { useTheme: h  } = e2, { withEmotionCache: i  } = e2, { withTheme: l  } = e2;
var r2 = {};
var e3 = Object.getOwnPropertySymbols;
var t2 = Object.prototype.hasOwnProperty;
var n2 = Object.prototype.propertyIsEnumerable;
function toObject(r11) {
    if (null === r11 || void 0 === r11) throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(r11);
}
function shouldUseNative() {
    try {
        if (!Object.assign) return false;
        var r21 = new String("abc");
        r21[5] = "de";
        if ("5" === Object.getOwnPropertyNames(r21)[0]) return false;
        var e13 = {};
        for(var t11 = 0; t11 < 10; t11++)e13["_" + String.fromCharCode(t11)] = t11;
        var n11 = Object.getOwnPropertyNames(e13).map(function(r3) {
            return e13[r3];
        });
        if ("0123456789" !== n11.join("")) return false;
        var a11 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(r4) {
            a11[r4] = r4;
        });
        return "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, a11)).join("");
    } catch (r) {
        return false;
    }
}
r2 = shouldUseNative() ? Object.assign : function(r5, a) {
    var o4;
    var c4 = toObject(r5);
    var i3;
    for(var s3 = 1; s3 < arguments.length; s3++){
        o4 = Object(arguments[s3]);
        for(var f2 in o4)t2.call(o4, f2) && (c4[f2] = o4[f2]);
        if (e3) {
            i3 = e3(o4);
            for(var l3 = 0; l3 < i3.length; l3++)n2.call(o4, i3[l3]) && (c4[i3[l3]] = o4[i3[l3]]);
        }
    }
    return c4;
};
var a2 = r2;
const mod = {
    default: a2
};
var e4 = window.React, { createContext: t3  } = e4, { useDebugValue: o1  } = e4, { useState: n3  } = e4, { useId: s1  } = e4, { useRef: r3  } = e4, { useContext: c2  } = e4, { useEffect: a3  } = e4, p1 = function() {
    return globalThis.renderToString ? ()=>{} : e4.useLayoutEffect(...arguments);
}, { useReducer: u1  } = e4, { useCallback: x2  } = e4, { forwardRef: l1  } = e4, { createElement: f  } = e4, { createFactory: m1  } = e4, { createRef: i1  } = e4, { Fragment: d  } = e4, { Component: R1  } = e4, { Suspense: g2  } = e4, { isValidElement: y2  } = e4, { memo: C2  } = e4, { useImperativeHandle: E1  } = e4, { Children: b1  } = e4, { lazy: w2  } = e4, { isLazy: V1  } = e4, { useMemo: k2  } = e4, { cloneElement: D1  } = e4, L = e4;
const mod1 = {
    Children: b1,
    Component: R1,
    Fragment: d,
    Suspense: g2,
    cloneElement: D1,
    createContext: t3,
    createElement: f,
    createFactory: m1,
    createRef: i1,
    default: L,
    forwardRef: l1,
    isLazy: V1,
    isValidElement: y2,
    lazy: w2,
    memo: C2,
    useCallback: x2,
    useContext: c2,
    useDebugValue: o1,
    useEffect: a3,
    useId: s1,
    useImperativeHandle: E1,
    useLayoutEffect: p1,
    useMemo: k2,
    useReducer: u1,
    useRef: r3,
    useState: n3
};
var r4 = "default" in mod ? mod.default : mod;
var n4 = "default" in mod1 ? mod1.default : mod1;
var o2 = {};
(function() {
    var e14 = r4;
    var t12 = n4;
    var a12 = "18.0.0-rc.0-fe905f152-20220107";
    var i11 = t12.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function warn(e21) {
        for(var t21 = arguments.length, r12 = new Array(t21 > 1 ? t21 - 1 : 0), n12 = 1; n12 < t21; n12++)r12[n12 - 1] = arguments[n12];
        printWarning("warn", e21, r12);
    }
    function error(e31) {
        for(var t31 = arguments.length, r22 = new Array(t31 > 1 ? t31 - 1 : 0), n21 = 1; n21 < t31; n21++)r22[n21 - 1] = arguments[n21];
        printWarning("error", e31, r22);
    }
    function printWarning(e41, t4, r31) {
        var n31 = i11.ReactDebugCurrentFrame;
        var o11 = n31.getStackAddendum();
        if ("" !== o11) {
            t4 += "%s";
            r31 = r31.concat([
                o11
            ]);
        }
        var a21 = r31.map(function(e5) {
            return String(e5);
        });
        a21.unshift("Warning: " + t4);
        Function.prototype.apply.call(console[e41], console, a21);
    }
    function scheduleWork(e6) {
        e6();
    }
    function beginWriting(e) {}
    function writeChunk(e7, t5) {
        e7.enqueue(t5);
        return e7.desiredSize > 0;
    }
    function completeWriting(e) {}
    function close(e8) {
        e8.close();
    }
    var s11 = new TextEncoder;
    function stringToChunk(e9) {
        return s11.encode(e9);
    }
    function stringToPrecomputedChunk(e10) {
        return s11.encode(e10);
    }
    function closeWithError(e11, t6) {
        "function" === typeof e11.error ? e11.error(t6) : e11.close();
    }
    function typeName(e12) {
        var t7 = "function" === typeof Symbol && Symbol.toStringTag;
        var r41 = t7 && e12[Symbol.toStringTag] || e12.constructor.name || "Object";
        return r41;
    }
    function willCoercionThrow(e13) {
        try {
            testStringCoercion(e13);
            return false;
        } catch (e) {
            return true;
        }
    }
    function testStringCoercion(e14) {
        return "" + e14;
    }
    function checkAttributeStringCoercion(e15, t8) {
        if (willCoercionThrow(e15)) {
            error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t8, typeName(e15));
            return testStringCoercion(e15);
        }
    }
    function checkCSSPropertyStringCoercion(e16, t9) {
        if (willCoercionThrow(e16)) {
            error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t9, typeName(e16));
            return testStringCoercion(e16);
        }
    }
    function checkHtmlStringCoercion(e17) {
        if (willCoercionThrow(e17)) {
            error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", typeName(e17));
            return testStringCoercion(e17);
        }
    }
    var l11 = Object.prototype.hasOwnProperty;
    var u11 = 0;
    var c11 = 1;
    var p11 = 2;
    var d1 = 3;
    var f1 = 4;
    var h1 = 5;
    var m11 = 6;
    var v1 = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
    var g12 = v1 + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
    var y12 = new RegExp("^[" + v1 + "][" + g12 + "]*$");
    var k11 = {};
    var C11 = {};
    function isAttributeNameSafe(e18) {
        if (l11.call(C11, e18)) return true;
        if (l11.call(k11, e18)) return false;
        if (y12.test(e18)) {
            C11[e18] = true;
            return true;
        }
        k11[e18] = true;
        error("Invalid attribute name: `%s`", e18);
        return false;
    }
    function shouldRemoveAttributeWithWarning(e19, t10, r5, n41) {
        if (null !== r5 && r5.type === u11) return false;
        switch(typeof t10){
            case "function":
            case "symbol":
                return true;
            case "boolean":
                if (n41) return false;
                if (null !== r5) return !r5.acceptsBooleans;
                var o21 = e19.toLowerCase().slice(0, 5);
                return "data-" !== o21 && "aria-" !== o21;
            default:
                return false;
        }
    }
    function getPropertyInfo(e20) {
        return b2.hasOwnProperty(e20) ? b2[e20] : null;
    }
    function PropertyInfoRecord(e21, t11, r6, n5, o3, a31, i2) {
        this.acceptsBooleans = t11 === p11 || t11 === d1 || t11 === f1;
        this.attributeName = n5;
        this.attributeNamespace = o3;
        this.mustUseProperty = r6;
        this.propertyName = e21;
        this.type = t11;
        this.sanitizeURL = a31;
        this.removeEmptyString = i2;
    }
    var b2 = {};
    var w3 = [
        "children",
        "dangerouslySetInnerHTML",
        "defaultValue",
        "defaultChecked",
        "innerHTML",
        "suppressContentEditableWarning",
        "suppressHydrationWarning",
        "style"
    ];
    w3.forEach(function(e22) {
        b2[e22] = new PropertyInfoRecord(e22, u11, false, e22, null, false, false);
    });
    [
        [
            "acceptCharset",
            "accept-charset"
        ],
        [
            "className",
            "class"
        ],
        [
            "htmlFor",
            "for"
        ],
        [
            "httpEquiv",
            "http-equiv"
        ]
    ].forEach(function(e23) {
        var t12 = e23[0], r7 = e23[1];
        b2[t12] = new PropertyInfoRecord(t12, c11, false, r7, null, false, false);
    });
    [
        "contentEditable",
        "draggable",
        "spellCheck",
        "value"
    ].forEach(function(e24) {
        b2[e24] = new PropertyInfoRecord(e24, p11, false, e24.toLowerCase(), null, false, false);
    });
    [
        "autoReverse",
        "externalResourcesRequired",
        "focusable",
        "preserveAlpha"
    ].forEach(function(e25) {
        b2[e25] = new PropertyInfoRecord(e25, p11, false, e25, null, false, false);
    });
    [
        "allowFullScreen",
        "async",
        "autoFocus",
        "autoPlay",
        "controls",
        "default",
        "defer",
        "disabled",
        "disablePictureInPicture",
        "disableRemotePlayback",
        "formNoValidate",
        "hidden",
        "loop",
        "noModule",
        "noValidate",
        "open",
        "playsInline",
        "readOnly",
        "required",
        "reversed",
        "scoped",
        "seamless",
        "itemScope"
    ].forEach(function(e26) {
        b2[e26] = new PropertyInfoRecord(e26, d1, false, e26.toLowerCase(), null, false, false);
    });
    [
        "checked",
        "multiple",
        "muted",
        "selected"
    ].forEach(function(e27) {
        b2[e27] = new PropertyInfoRecord(e27, d1, true, e27, null, false, false);
    });
    [
        "capture",
        "download"
    ].forEach(function(e28) {
        b2[e28] = new PropertyInfoRecord(e28, f1, false, e28, null, false, false);
    });
    [
        "cols",
        "rows",
        "size",
        "span"
    ].forEach(function(e29) {
        b2[e29] = new PropertyInfoRecord(e29, m11, false, e29, null, false, false);
    });
    [
        "rowSpan",
        "start"
    ].forEach(function(e30) {
        b2[e30] = new PropertyInfoRecord(e30, h1, false, e30.toLowerCase(), null, false, false);
    });
    var S = /[\-\:]([a-z])/g;
    var capitalize = function(e31) {
        return e31[1].toUpperCase();
    };
    [
        "accent-height",
        "alignment-baseline",
        "arabic-form",
        "baseline-shift",
        "cap-height",
        "clip-path",
        "clip-rule",
        "color-interpolation",
        "color-interpolation-filters",
        "color-profile",
        "color-rendering",
        "dominant-baseline",
        "enable-background",
        "fill-opacity",
        "fill-rule",
        "flood-color",
        "flood-opacity",
        "font-family",
        "font-size",
        "font-size-adjust",
        "font-stretch",
        "font-style",
        "font-variant",
        "font-weight",
        "glyph-name",
        "glyph-orientation-horizontal",
        "glyph-orientation-vertical",
        "horiz-adv-x",
        "horiz-origin-x",
        "image-rendering",
        "letter-spacing",
        "lighting-color",
        "marker-end",
        "marker-mid",
        "marker-start",
        "overline-position",
        "overline-thickness",
        "paint-order",
        "panose-1",
        "pointer-events",
        "rendering-intent",
        "shape-rendering",
        "stop-color",
        "stop-opacity",
        "strikethrough-position",
        "strikethrough-thickness",
        "stroke-dasharray",
        "stroke-dashoffset",
        "stroke-linecap",
        "stroke-linejoin",
        "stroke-miterlimit",
        "stroke-opacity",
        "stroke-width",
        "text-anchor",
        "text-decoration",
        "text-rendering",
        "underline-position",
        "underline-thickness",
        "unicode-bidi",
        "unicode-range",
        "units-per-em",
        "v-alphabetic",
        "v-hanging",
        "v-ideographic",
        "v-mathematical",
        "vector-effect",
        "vert-adv-y",
        "vert-origin-x",
        "vert-origin-y",
        "word-spacing",
        "writing-mode",
        "xmlns:xlink",
        "x-height"
    ].forEach(function(e32) {
        var t13 = e32.replace(S, capitalize);
        b2[t13] = new PropertyInfoRecord(t13, c11, false, e32, null, false, false);
    });
    [
        "xlink:actuate",
        "xlink:arcrole",
        "xlink:role",
        "xlink:show",
        "xlink:title",
        "xlink:type"
    ].forEach(function(e33) {
        var t14 = e33.replace(S, capitalize);
        b2[t14] = new PropertyInfoRecord(t14, c11, false, e33, "http://www.w3.org/1999/xlink", false, false);
    });
    [
        "xml:base",
        "xml:lang",
        "xml:space"
    ].forEach(function(e34) {
        var t15 = e34.replace(S, capitalize);
        b2[t15] = new PropertyInfoRecord(t15, c11, false, e34, "http://www.w3.org/XML/1998/namespace", false, false);
    });
    [
        "tabIndex",
        "crossOrigin"
    ].forEach(function(e35) {
        b2[e35] = new PropertyInfoRecord(e35, c11, false, e35.toLowerCase(), null, false, false);
    });
    var x3 = "xlinkHref";
    b2[x3] = new PropertyInfoRecord("xlinkHref", c11, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
    [
        "src",
        "href",
        "action",
        "formAction"
    ].forEach(function(e36) {
        b2[e36] = new PropertyInfoRecord(e36, c11, false, e36.toLowerCase(), null, true, true);
    });
    var T = {
        animationIterationCount: true,
        aspectRatio: true,
        borderImageOutset: true,
        borderImageSlice: true,
        borderImageWidth: true,
        boxFlex: true,
        boxFlexGroup: true,
        boxOrdinalGroup: true,
        columnCount: true,
        columns: true,
        flex: true,
        flexGrow: true,
        flexPositive: true,
        flexShrink: true,
        flexNegative: true,
        flexOrder: true,
        gridArea: true,
        gridRow: true,
        gridRowEnd: true,
        gridRowSpan: true,
        gridRowStart: true,
        gridColumn: true,
        gridColumnEnd: true,
        gridColumnSpan: true,
        gridColumnStart: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        tabSize: true,
        widows: true,
        zIndex: true,
        zoom: true,
        fillOpacity: true,
        floodOpacity: true,
        stopOpacity: true,
        strokeDasharray: true,
        strokeDashoffset: true,
        strokeMiterlimit: true,
        strokeOpacity: true,
        strokeWidth: true
    };
    function prefixKey(e37, t16) {
        return e37 + t16.charAt(0).toUpperCase() + t16.substring(1);
    }
    var P1 = [
        "Webkit",
        "ms",
        "Moz",
        "O"
    ];
    Object.keys(T).forEach(function(e38) {
        P1.forEach(function(t17) {
            T[prefixKey(t17, e38)] = T[e38];
        });
    });
    var R2 = {
        button: true,
        checkbox: true,
        image: true,
        hidden: true,
        radio: true,
        reset: true,
        submit: true
    };
    function checkControlledValueProps(e, t18) {
        R2[t18.type] || t18.onChange || t18.onInput || t18.readOnly || t18.disabled || null == t18.value || error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.");
        t18.onChange || t18.readOnly || t18.disabled || null == t18.checked || error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function isCustomComponent(e39, t19) {
        if (-1 === e39.indexOf("-")) return "string" === typeof t19.is;
        switch(e39){
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph":
                return false;
            default:
                return true;
        }
    }
    var I = {
        "aria-current": 0,
        "aria-description": 0,
        "aria-details": 0,
        "aria-disabled": 0,
        "aria-hidden": 0,
        "aria-invalid": 0,
        "aria-keyshortcuts": 0,
        "aria-label": 0,
        "aria-roledescription": 0,
        "aria-autocomplete": 0,
        "aria-checked": 0,
        "aria-expanded": 0,
        "aria-haspopup": 0,
        "aria-level": 0,
        "aria-modal": 0,
        "aria-multiline": 0,
        "aria-multiselectable": 0,
        "aria-orientation": 0,
        "aria-placeholder": 0,
        "aria-pressed": 0,
        "aria-readonly": 0,
        "aria-required": 0,
        "aria-selected": 0,
        "aria-sort": 0,
        "aria-valuemax": 0,
        "aria-valuemin": 0,
        "aria-valuenow": 0,
        "aria-valuetext": 0,
        "aria-atomic": 0,
        "aria-busy": 0,
        "aria-live": 0,
        "aria-relevant": 0,
        "aria-dropeffect": 0,
        "aria-grabbed": 0,
        "aria-activedescendant": 0,
        "aria-colcount": 0,
        "aria-colindex": 0,
        "aria-colspan": 0,
        "aria-controls": 0,
        "aria-describedby": 0,
        "aria-errormessage": 0,
        "aria-flowto": 0,
        "aria-labelledby": 0,
        "aria-owns": 0,
        "aria-posinset": 0,
        "aria-rowcount": 0,
        "aria-rowindex": 0,
        "aria-rowspan": 0,
        "aria-setsize": 0
    };
    var E2 = {};
    var F = new RegExp("^(aria)-[" + g12 + "]*$");
    var D2 = new RegExp("^(aria)[A-Z][" + g12 + "]*$");
    function validateProperty(e, t20) {
        if (l11.call(E2, t20) && E2[t20]) return true;
        if (D2.test(t20)) {
            var r8 = "aria-" + t20.slice(4).toLowerCase();
            var n6 = I.hasOwnProperty(r8) ? r8 : null;
            if (null == n6) {
                error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t20);
                E2[t20] = true;
                return true;
            }
            if (t20 !== n6) {
                error("Invalid ARIA attribute `%s`. Did you mean `%s`?", t20, n6);
                E2[t20] = true;
                return true;
            }
        }
        if (F.test(t20)) {
            var o4 = t20.toLowerCase();
            var a4 = I.hasOwnProperty(o4) ? o4 : null;
            if (null == a4) {
                E2[t20] = true;
                return false;
            }
            if (t20 !== a4) {
                error("Unknown ARIA attribute `%s`. Did you mean `%s`?", t20, a4);
                E2[t20] = true;
                return true;
            }
        }
        return true;
    }
    function warnInvalidARIAProps(e40, t21) {
        var r9 = [];
        for(var n7 in t21){
            var o5 = validateProperty(e40, n7);
            o5 || r9.push(n7);
        }
        var a5 = r9.map(function(e41) {
            return "`" + e41 + "`";
        }).join(", ");
        1 === r9.length ? error("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", a5, e40) : r9.length > 1 && error("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", a5, e40);
    }
    function validateProperties(e42, t22) {
        isCustomComponent(e42, t22) || warnInvalidARIAProps(e42, t22);
    }
    var N1 = false;
    function validateProperties$1(e43, t23) {
        if (("input" === e43 || "textarea" === e43 || "select" === e43) && null != t23 && null === t23.value && !N1) {
            N1 = true;
            "select" === e43 && t23.multiple ? error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e43) : error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e43);
        }
    }
    var A1 = {
        accept: "accept",
        acceptcharset: "acceptCharset",
        "accept-charset": "acceptCharset",
        accesskey: "accessKey",
        action: "action",
        allowfullscreen: "allowFullScreen",
        alt: "alt",
        as: "as",
        async: "async",
        autocapitalize: "autoCapitalize",
        autocomplete: "autoComplete",
        autocorrect: "autoCorrect",
        autofocus: "autoFocus",
        autoplay: "autoPlay",
        autosave: "autoSave",
        capture: "capture",
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        challenge: "challenge",
        charset: "charSet",
        checked: "checked",
        children: "children",
        cite: "cite",
        class: "className",
        classid: "classID",
        classname: "className",
        cols: "cols",
        colspan: "colSpan",
        content: "content",
        contenteditable: "contentEditable",
        contextmenu: "contextMenu",
        controls: "controls",
        controlslist: "controlsList",
        coords: "coords",
        crossorigin: "crossOrigin",
        dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
        data: "data",
        datetime: "dateTime",
        default: "default",
        defaultchecked: "defaultChecked",
        defaultvalue: "defaultValue",
        defer: "defer",
        dir: "dir",
        disabled: "disabled",
        disablepictureinpicture: "disablePictureInPicture",
        disableremoteplayback: "disableRemotePlayback",
        download: "download",
        draggable: "draggable",
        enctype: "encType",
        enterkeyhint: "enterKeyHint",
        for: "htmlFor",
        form: "form",
        formmethod: "formMethod",
        formaction: "formAction",
        formenctype: "formEncType",
        formnovalidate: "formNoValidate",
        formtarget: "formTarget",
        frameborder: "frameBorder",
        headers: "headers",
        height: "height",
        hidden: "hidden",
        high: "high",
        href: "href",
        hreflang: "hrefLang",
        htmlfor: "htmlFor",
        httpequiv: "httpEquiv",
        "http-equiv": "httpEquiv",
        icon: "icon",
        id: "id",
        imagesizes: "imageSizes",
        imagesrcset: "imageSrcSet",
        innerhtml: "innerHTML",
        inputmode: "inputMode",
        integrity: "integrity",
        is: "is",
        itemid: "itemID",
        itemprop: "itemProp",
        itemref: "itemRef",
        itemscope: "itemScope",
        itemtype: "itemType",
        keyparams: "keyParams",
        keytype: "keyType",
        kind: "kind",
        label: "label",
        lang: "lang",
        list: "list",
        loop: "loop",
        low: "low",
        manifest: "manifest",
        marginwidth: "marginWidth",
        marginheight: "marginHeight",
        max: "max",
        maxlength: "maxLength",
        media: "media",
        mediagroup: "mediaGroup",
        method: "method",
        min: "min",
        minlength: "minLength",
        multiple: "multiple",
        muted: "muted",
        name: "name",
        nomodule: "noModule",
        nonce: "nonce",
        novalidate: "noValidate",
        open: "open",
        optimum: "optimum",
        pattern: "pattern",
        placeholder: "placeholder",
        playsinline: "playsInline",
        poster: "poster",
        preload: "preload",
        profile: "profile",
        radiogroup: "radioGroup",
        readonly: "readOnly",
        referrerpolicy: "referrerPolicy",
        rel: "rel",
        required: "required",
        reversed: "reversed",
        role: "role",
        rows: "rows",
        rowspan: "rowSpan",
        sandbox: "sandbox",
        scope: "scope",
        scoped: "scoped",
        scrolling: "scrolling",
        seamless: "seamless",
        selected: "selected",
        shape: "shape",
        size: "size",
        sizes: "sizes",
        span: "span",
        spellcheck: "spellCheck",
        src: "src",
        srcdoc: "srcDoc",
        srclang: "srcLang",
        srcset: "srcSet",
        start: "start",
        step: "step",
        style: "style",
        summary: "summary",
        tabindex: "tabIndex",
        target: "target",
        title: "title",
        type: "type",
        usemap: "useMap",
        value: "value",
        width: "width",
        wmode: "wmode",
        wrap: "wrap",
        about: "about",
        accentheight: "accentHeight",
        "accent-height": "accentHeight",
        accumulate: "accumulate",
        additive: "additive",
        alignmentbaseline: "alignmentBaseline",
        "alignment-baseline": "alignmentBaseline",
        allowreorder: "allowReorder",
        alphabetic: "alphabetic",
        amplitude: "amplitude",
        arabicform: "arabicForm",
        "arabic-form": "arabicForm",
        ascent: "ascent",
        attributename: "attributeName",
        attributetype: "attributeType",
        autoreverse: "autoReverse",
        azimuth: "azimuth",
        basefrequency: "baseFrequency",
        baselineshift: "baselineShift",
        "baseline-shift": "baselineShift",
        baseprofile: "baseProfile",
        bbox: "bbox",
        begin: "begin",
        bias: "bias",
        by: "by",
        calcmode: "calcMode",
        capheight: "capHeight",
        "cap-height": "capHeight",
        clip: "clip",
        clippath: "clipPath",
        "clip-path": "clipPath",
        clippathunits: "clipPathUnits",
        cliprule: "clipRule",
        "clip-rule": "clipRule",
        color: "color",
        colorinterpolation: "colorInterpolation",
        "color-interpolation": "colorInterpolation",
        colorinterpolationfilters: "colorInterpolationFilters",
        "color-interpolation-filters": "colorInterpolationFilters",
        colorprofile: "colorProfile",
        "color-profile": "colorProfile",
        colorrendering: "colorRendering",
        "color-rendering": "colorRendering",
        contentscripttype: "contentScriptType",
        contentstyletype: "contentStyleType",
        cursor: "cursor",
        cx: "cx",
        cy: "cy",
        d: "d",
        datatype: "datatype",
        decelerate: "decelerate",
        descent: "descent",
        diffuseconstant: "diffuseConstant",
        direction: "direction",
        display: "display",
        divisor: "divisor",
        dominantbaseline: "dominantBaseline",
        "dominant-baseline": "dominantBaseline",
        dur: "dur",
        dx: "dx",
        dy: "dy",
        edgemode: "edgeMode",
        elevation: "elevation",
        enablebackground: "enableBackground",
        "enable-background": "enableBackground",
        end: "end",
        exponent: "exponent",
        externalresourcesrequired: "externalResourcesRequired",
        fill: "fill",
        fillopacity: "fillOpacity",
        "fill-opacity": "fillOpacity",
        fillrule: "fillRule",
        "fill-rule": "fillRule",
        filter: "filter",
        filterres: "filterRes",
        filterunits: "filterUnits",
        floodopacity: "floodOpacity",
        "flood-opacity": "floodOpacity",
        floodcolor: "floodColor",
        "flood-color": "floodColor",
        focusable: "focusable",
        fontfamily: "fontFamily",
        "font-family": "fontFamily",
        fontsize: "fontSize",
        "font-size": "fontSize",
        fontsizeadjust: "fontSizeAdjust",
        "font-size-adjust": "fontSizeAdjust",
        fontstretch: "fontStretch",
        "font-stretch": "fontStretch",
        fontstyle: "fontStyle",
        "font-style": "fontStyle",
        fontvariant: "fontVariant",
        "font-variant": "fontVariant",
        fontweight: "fontWeight",
        "font-weight": "fontWeight",
        format: "format",
        from: "from",
        fx: "fx",
        fy: "fy",
        g1: "g1",
        g2: "g2",
        glyphname: "glyphName",
        "glyph-name": "glyphName",
        glyphorientationhorizontal: "glyphOrientationHorizontal",
        "glyph-orientation-horizontal": "glyphOrientationHorizontal",
        glyphorientationvertical: "glyphOrientationVertical",
        "glyph-orientation-vertical": "glyphOrientationVertical",
        glyphref: "glyphRef",
        gradienttransform: "gradientTransform",
        gradientunits: "gradientUnits",
        hanging: "hanging",
        horizadvx: "horizAdvX",
        "horiz-adv-x": "horizAdvX",
        horizoriginx: "horizOriginX",
        "horiz-origin-x": "horizOriginX",
        ideographic: "ideographic",
        imagerendering: "imageRendering",
        "image-rendering": "imageRendering",
        in2: "in2",
        in: "in",
        inlist: "inlist",
        intercept: "intercept",
        k1: "k1",
        k2: "k2",
        k3: "k3",
        k4: "k4",
        k: "k",
        kernelmatrix: "kernelMatrix",
        kernelunitlength: "kernelUnitLength",
        kerning: "kerning",
        keypoints: "keyPoints",
        keysplines: "keySplines",
        keytimes: "keyTimes",
        lengthadjust: "lengthAdjust",
        letterspacing: "letterSpacing",
        "letter-spacing": "letterSpacing",
        lightingcolor: "lightingColor",
        "lighting-color": "lightingColor",
        limitingconeangle: "limitingConeAngle",
        local: "local",
        markerend: "markerEnd",
        "marker-end": "markerEnd",
        markerheight: "markerHeight",
        markermid: "markerMid",
        "marker-mid": "markerMid",
        markerstart: "markerStart",
        "marker-start": "markerStart",
        markerunits: "markerUnits",
        markerwidth: "markerWidth",
        mask: "mask",
        maskcontentunits: "maskContentUnits",
        maskunits: "maskUnits",
        mathematical: "mathematical",
        mode: "mode",
        numoctaves: "numOctaves",
        offset: "offset",
        opacity: "opacity",
        operator: "operator",
        order: "order",
        orient: "orient",
        orientation: "orientation",
        origin: "origin",
        overflow: "overflow",
        overlineposition: "overlinePosition",
        "overline-position": "overlinePosition",
        overlinethickness: "overlineThickness",
        "overline-thickness": "overlineThickness",
        paintorder: "paintOrder",
        "paint-order": "paintOrder",
        panose1: "panose1",
        "panose-1": "panose1",
        pathlength: "pathLength",
        patterncontentunits: "patternContentUnits",
        patterntransform: "patternTransform",
        patternunits: "patternUnits",
        pointerevents: "pointerEvents",
        "pointer-events": "pointerEvents",
        points: "points",
        pointsatx: "pointsAtX",
        pointsaty: "pointsAtY",
        pointsatz: "pointsAtZ",
        prefix: "prefix",
        preservealpha: "preserveAlpha",
        preserveaspectratio: "preserveAspectRatio",
        primitiveunits: "primitiveUnits",
        property: "property",
        r: "r",
        radius: "radius",
        refx: "refX",
        refy: "refY",
        renderingintent: "renderingIntent",
        "rendering-intent": "renderingIntent",
        repeatcount: "repeatCount",
        repeatdur: "repeatDur",
        requiredextensions: "requiredExtensions",
        requiredfeatures: "requiredFeatures",
        resource: "resource",
        restart: "restart",
        result: "result",
        results: "results",
        rotate: "rotate",
        rx: "rx",
        ry: "ry",
        scale: "scale",
        security: "security",
        seed: "seed",
        shaperendering: "shapeRendering",
        "shape-rendering": "shapeRendering",
        slope: "slope",
        spacing: "spacing",
        specularconstant: "specularConstant",
        specularexponent: "specularExponent",
        speed: "speed",
        spreadmethod: "spreadMethod",
        startoffset: "startOffset",
        stddeviation: "stdDeviation",
        stemh: "stemh",
        stemv: "stemv",
        stitchtiles: "stitchTiles",
        stopcolor: "stopColor",
        "stop-color": "stopColor",
        stopopacity: "stopOpacity",
        "stop-opacity": "stopOpacity",
        strikethroughposition: "strikethroughPosition",
        "strikethrough-position": "strikethroughPosition",
        strikethroughthickness: "strikethroughThickness",
        "strikethrough-thickness": "strikethroughThickness",
        string: "string",
        stroke: "stroke",
        strokedasharray: "strokeDasharray",
        "stroke-dasharray": "strokeDasharray",
        strokedashoffset: "strokeDashoffset",
        "stroke-dashoffset": "strokeDashoffset",
        strokelinecap: "strokeLinecap",
        "stroke-linecap": "strokeLinecap",
        strokelinejoin: "strokeLinejoin",
        "stroke-linejoin": "strokeLinejoin",
        strokemiterlimit: "strokeMiterlimit",
        "stroke-miterlimit": "strokeMiterlimit",
        strokewidth: "strokeWidth",
        "stroke-width": "strokeWidth",
        strokeopacity: "strokeOpacity",
        "stroke-opacity": "strokeOpacity",
        suppresscontenteditablewarning: "suppressContentEditableWarning",
        suppresshydrationwarning: "suppressHydrationWarning",
        surfacescale: "surfaceScale",
        systemlanguage: "systemLanguage",
        tablevalues: "tableValues",
        targetx: "targetX",
        targety: "targetY",
        textanchor: "textAnchor",
        "text-anchor": "textAnchor",
        textdecoration: "textDecoration",
        "text-decoration": "textDecoration",
        textlength: "textLength",
        textrendering: "textRendering",
        "text-rendering": "textRendering",
        to: "to",
        transform: "transform",
        typeof: "typeof",
        u1: "u1",
        u2: "u2",
        underlineposition: "underlinePosition",
        "underline-position": "underlinePosition",
        underlinethickness: "underlineThickness",
        "underline-thickness": "underlineThickness",
        unicode: "unicode",
        unicodebidi: "unicodeBidi",
        "unicode-bidi": "unicodeBidi",
        unicoderange: "unicodeRange",
        "unicode-range": "unicodeRange",
        unitsperem: "unitsPerEm",
        "units-per-em": "unitsPerEm",
        unselectable: "unselectable",
        valphabetic: "vAlphabetic",
        "v-alphabetic": "vAlphabetic",
        values: "values",
        vectoreffect: "vectorEffect",
        "vector-effect": "vectorEffect",
        version: "version",
        vertadvy: "vertAdvY",
        "vert-adv-y": "vertAdvY",
        vertoriginx: "vertOriginX",
        "vert-origin-x": "vertOriginX",
        vertoriginy: "vertOriginY",
        "vert-origin-y": "vertOriginY",
        vhanging: "vHanging",
        "v-hanging": "vHanging",
        videographic: "vIdeographic",
        "v-ideographic": "vIdeographic",
        viewbox: "viewBox",
        viewtarget: "viewTarget",
        visibility: "visibility",
        vmathematical: "vMathematical",
        "v-mathematical": "vMathematical",
        vocab: "vocab",
        widths: "widths",
        wordspacing: "wordSpacing",
        "word-spacing": "wordSpacing",
        writingmode: "writingMode",
        "writing-mode": "writingMode",
        x1: "x1",
        x2: "x2",
        x: "x",
        xchannelselector: "xChannelSelector",
        xheight: "xHeight",
        "x-height": "xHeight",
        xlinkactuate: "xlinkActuate",
        "xlink:actuate": "xlinkActuate",
        xlinkarcrole: "xlinkArcrole",
        "xlink:arcrole": "xlinkArcrole",
        xlinkhref: "xlinkHref",
        "xlink:href": "xlinkHref",
        xlinkrole: "xlinkRole",
        "xlink:role": "xlinkRole",
        xlinkshow: "xlinkShow",
        "xlink:show": "xlinkShow",
        xlinktitle: "xlinkTitle",
        "xlink:title": "xlinkTitle",
        xlinktype: "xlinkType",
        "xlink:type": "xlinkType",
        xmlbase: "xmlBase",
        "xml:base": "xmlBase",
        xmllang: "xmlLang",
        "xml:lang": "xmlLang",
        xmlns: "xmlns",
        "xml:space": "xmlSpace",
        xmlnsxlink: "xmlnsXlink",
        "xmlns:xlink": "xmlnsXlink",
        xmlspace: "xmlSpace",
        y1: "y1",
        y2: "y2",
        y: "y",
        ychannelselector: "yChannelSelector",
        z: "z",
        zoomandpan: "zoomAndPan"
    };
    var validateProperty$1 = function() {};
    var M = {};
    var B = /^on./;
    var L1 = /^on[^A-Z]/;
    var H = new RegExp("^(aria)-[" + g12 + "]*$");
    var O1 = new RegExp("^(aria)[A-Z][" + g12 + "]*$");
    validateProperty$1 = function(e, t24, r10, n8) {
        if (l11.call(M, t24) && M[t24]) return true;
        var o6 = t24.toLowerCase();
        if ("onfocusin" === o6 || "onfocusout" === o6) {
            error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React.");
            M[t24] = true;
            return true;
        }
        if (null != n8) {
            var a6 = n8.registrationNameDependencies, i3 = n8.possibleRegistrationNames;
            if (a6.hasOwnProperty(t24)) return true;
            var s4 = i3.hasOwnProperty(o6) ? i3[o6] : null;
            if (null != s4) {
                error("Invalid event handler property `%s`. Did you mean `%s`?", t24, s4);
                M[t24] = true;
                return true;
            }
            if (B.test(t24)) {
                error("Unknown event handler property `%s`. It will be ignored.", t24);
                M[t24] = true;
                return true;
            }
        } else if (B.test(t24)) {
            L1.test(t24) && error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t24);
            M[t24] = true;
            return true;
        }
        if (H.test(t24) || O1.test(t24)) return true;
        if ("innerhtml" === o6) {
            error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`.");
            M[t24] = true;
            return true;
        }
        if ("aria" === o6) {
            error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead.");
            M[t24] = true;
            return true;
        }
        if ("is" === o6 && null !== r10 && void 0 !== r10 && "string" !== typeof r10) {
            error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof r10);
            M[t24] = true;
            return true;
        }
        if ("number" === typeof r10 && isNaN(r10)) {
            error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t24);
            M[t24] = true;
            return true;
        }
        var c5 = getPropertyInfo(t24);
        var p3 = null !== c5 && c5.type === u11;
        if (A1.hasOwnProperty(o6)) {
            var f3 = A1[o6];
            if (f3 !== t24) {
                error("Invalid DOM property `%s`. Did you mean `%s`?", t24, f3);
                M[t24] = true;
                return true;
            }
        } else if (!p3 && t24 !== o6) {
            error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t24, o6);
            M[t24] = true;
            return true;
        }
        if ("boolean" === typeof r10 && shouldRemoveAttributeWithWarning(t24, r10, c5, false)) {
            r10 ? error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', r10, t24, t24, r10, t24) : error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', r10, t24, t24, r10, t24, t24, t24);
            M[t24] = true;
            return true;
        }
        if (p3) return true;
        if (shouldRemoveAttributeWithWarning(t24, r10, c5, false)) {
            M[t24] = true;
            return false;
        }
        if (("false" === r10 || "true" === r10) && null !== c5 && c5.type === d1) {
            error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", r10, t24, "false" === r10 ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t24, r10);
            M[t24] = true;
            return true;
        }
        return true;
    };
    var warnUnknownProperties = function(e44, t25, r11) {
        var n9 = [];
        for(var o7 in t25){
            var a7 = validateProperty$1(e44, o7, t25[o7], r11);
            a7 || n9.push(o7);
        }
        var i4 = n9.map(function(e45) {
            return "`" + e45 + "`";
        }).join(", ");
        1 === n9.length ? error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", i4, e44) : n9.length > 1 && error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", i4, e44);
    };
    function validateProperties$2(e46, t26, r12) {
        isCustomComponent(e46, t26) || warnUnknownProperties(e46, t26, r12);
    }
    var warnValidStyle = function() {};
    var U = /^(?:webkit|moz|o)[A-Z]/;
    var _1 = /^-ms-/;
    var W = /-(.)/g;
    var z1 = /;\s*$/;
    var j1 = {};
    var V2 = {};
    var $1 = false;
    var q1 = false;
    var camelize = function(e47) {
        return e47.replace(W, function(e, t27) {
            return t27.toUpperCase();
        });
    };
    var warnHyphenatedStyleName = function(e48) {
        if (!j1.hasOwnProperty(e48) || !j1[e48]) {
            j1[e48] = true;
            error("Unsupported style property %s. Did you mean %s?", e48, camelize(e48.replace(_1, "ms-")));
        }
    };
    var warnBadVendoredStyleName = function(e49) {
        if (!j1.hasOwnProperty(e49) || !j1[e49]) {
            j1[e49] = true;
            error("Unsupported vendor-prefixed style property %s. Did you mean %s?", e49, e49.charAt(0).toUpperCase() + e49.slice(1));
        }
    };
    var warnStyleValueWithSemicolon = function(e50, t28) {
        if (!V2.hasOwnProperty(t28) || !V2[t28]) {
            V2[t28] = true;
            error('Style property values shouldn\'t contain a semicolon. Try "%s: %s" instead.', e50, t28.replace(z1, ""));
        }
    };
    var warnStyleValueIsNaN = function(e51, t) {
        if (!$1) {
            $1 = true;
            error("`NaN` is an invalid value for the `%s` css style property.", e51);
        }
    };
    var warnStyleValueIsInfinity = function(e52, t) {
        if (!q1) {
            q1 = true;
            error("`Infinity` is an invalid value for the `%s` css style property.", e52);
        }
    };
    warnValidStyle = function(e53, t29) {
        e53.indexOf("-") > -1 ? warnHyphenatedStyleName(e53) : U.test(e53) ? warnBadVendoredStyleName(e53) : z1.test(t29) && warnStyleValueWithSemicolon(e53, t29);
        "number" === typeof t29 && (isNaN(t29) ? warnStyleValueIsNaN(e53, t29) : isFinite(t29) || warnStyleValueIsInfinity(e53, t29));
    };
    var Y = warnValidStyle;
    var X = /["'&<>]/;
    function escapeHtml(e54) {
        checkHtmlStringCoercion(e54);
        var t30 = "" + e54;
        var r13 = X.exec(t30);
        if (!r13) return t30;
        var n10;
        var o8 = "";
        var a8;
        var i5 = 0;
        for(a8 = r13.index; a8 < t30.length; a8++){
            switch(t30.charCodeAt(a8)){
                case 34:
                    n10 = "&quot;";
                    break;
                case 38:
                    n10 = "&amp;";
                    break;
                case 39:
                    n10 = "&#x27;";
                    break;
                case 60:
                    n10 = "&lt;";
                    break;
                case 62:
                    n10 = "&gt;";
                    break;
                default:
                    continue;
            }
            i5 !== a8 && (o8 += t30.substring(i5, a8));
            i5 = a8 + 1;
            o8 += n10;
        }
        return i5 !== a8 ? o8 + t30.substring(i5, a8) : o8;
    }
    function escapeTextForBrowser(e55) {
        return "boolean" === typeof e55 || "number" === typeof e55 ? "" + e55 : escapeHtml(e55);
    }
    var G = /([A-Z])/g;
    var Z = /^ms-/;
    function hyphenateStyleName(e56) {
        return e56.replace(G, "-$1").toLowerCase().replace(Z, "-ms-");
    }
    var Q = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i;
    var K = false;
    function sanitizeURL(e57) {
        if (!K && Q.test(e57)) {
            K = true;
            error("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e57));
        }
    }
    var J = Array.isArray;
    function isArray(e58) {
        return J(e58);
    }
    var ee = stringToPrecomputedChunk("<script>");
    var te = stringToPrecomputedChunk("<\/script>");
    var re = stringToPrecomputedChunk('<script src="');
    var ne = stringToPrecomputedChunk('<script type="module" src="');
    var oe = stringToPrecomputedChunk('" async=""><\/script>');
    function createResponseState(e59, t31, r14, n11, o9) {
        var a9 = void 0 === e59 ? "" : e59;
        var i6 = void 0 === t31 ? ee : stringToPrecomputedChunk('<script nonce="' + escapeTextForBrowser(t31) + '">');
        var s5 = [];
        void 0 !== r14 && s5.push(i6, stringToChunk(escapeTextForBrowser(r14)), te);
        if (void 0 !== n11) for(var l4 = 0; l4 < n11.length; l4++)s5.push(re, stringToChunk(escapeTextForBrowser(n11[l4])), oe);
        if (void 0 !== o9) for(var u3 = 0; u3 < o9.length; u3++)s5.push(ne, stringToChunk(escapeTextForBrowser(o9[u3])), oe);
        return {
            bootstrapChunks: s5,
            startInlineScript: i6,
            placeholderPrefix: stringToPrecomputedChunk(a9 + "P:"),
            segmentPrefix: stringToPrecomputedChunk(a9 + "S:"),
            boundaryPrefix: a9 + "B:",
            idPrefix: a9 + "R:",
            nextSuspenseID: 0,
            sentCompleteSegmentFunction: false,
            sentCompleteBoundaryFunction: false,
            sentClientRenderFunction: false
        };
    }
    var ae = 0;
    var ie = 1;
    var se = 2;
    var le = 3;
    var ue = 4;
    var ce = 5;
    var pe = 6;
    var de = 7;
    function createFormatContext(e60, t32) {
        return {
            insertionMode: e60,
            selectedValue: t32
        };
    }
    function createRootFormatContext(e61) {
        var t33 = "http://www.w3.org/2000/svg" === e61 ? se : "http://www.w3.org/1998/Math/MathML" === e61 ? le : ae;
        return createFormatContext(t33, null);
    }
    function getChildFormatContext(e62, t34, r15) {
        switch(t34){
            case "select":
                return createFormatContext(ie, null != r15.value ? r15.value : r15.defaultValue);
            case "svg":
                return createFormatContext(se, null);
            case "math":
                return createFormatContext(le, null);
            case "foreignObject":
                return createFormatContext(ie, null);
            case "table":
                return createFormatContext(ue, null);
            case "thead":
            case "tbody":
            case "tfoot":
                return createFormatContext(ce, null);
            case "colgroup":
                return createFormatContext(de, null);
            case "tr":
                return createFormatContext(pe, null);
        }
        return e62.insertionMode >= ue || e62.insertionMode === ae ? createFormatContext(ie, null) : e62;
    }
    var fe = null;
    function assignSuspenseBoundaryID(e63) {
        var t35 = e63.nextSuspenseID++;
        return stringToPrecomputedChunk(e63.boundaryPrefix + t35.toString(16));
    }
    function makeId(e64, t36, r16) {
        var n12 = e64.idPrefix;
        var o10 = n12 + t36;
        r16 > 0 && (o10 += ":" + r16.toString(32));
        return o10;
    }
    function encodeHTMLTextNode(e65) {
        return escapeTextForBrowser(e65);
    }
    var he = stringToPrecomputedChunk("\x3c!-- --\x3e");
    function pushTextInstance(e66, t37, r) {
        "" !== t37 && e66.push(stringToChunk(encodeHTMLTextNode(t37)), he);
    }
    var me = new Map;
    function processStyleName(e67) {
        var t38 = me.get(e67);
        if (void 0 !== t38) return t38;
        var r17 = stringToPrecomputedChunk(escapeTextForBrowser(hyphenateStyleName(e67)));
        me.set(e67, r17);
        return r17;
    }
    var ve = stringToPrecomputedChunk(' style="');
    var ge = stringToPrecomputedChunk(":");
    var ye = stringToPrecomputedChunk(";");
    function pushStyle(e68, t, r18) {
        if ("object" !== typeof r18) throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
        var n13 = true;
        for(var o11 in r18)if (l11.call(r18, o11)) {
            var a10 = r18[o11];
            if (null != a10 && "boolean" !== typeof a10 && "" !== a10) {
                var i7 = void 0;
                var s6 = void 0;
                var u4 = 0 === o11.indexOf("--");
                if (u4) {
                    i7 = stringToChunk(escapeTextForBrowser(o11));
                    checkCSSPropertyStringCoercion(a10, o11);
                    s6 = stringToChunk(escapeTextForBrowser(("" + a10).trim()));
                } else {
                    Y(o11, a10);
                    i7 = processStyleName(o11);
                    if ("number" === typeof a10) s6 = 0 === a10 || l11.call(T, o11) ? stringToChunk("" + a10) : stringToChunk(a10 + "px");
                    else {
                        checkCSSPropertyStringCoercion(a10, o11);
                        s6 = stringToChunk(escapeTextForBrowser(("" + a10).trim()));
                    }
                }
                if (n13) {
                    n13 = false;
                    e68.push(ve, i7, ge, s6);
                } else e68.push(ye, i7, ge, s6);
            }
        }
        n13 || e68.push(be);
    }
    var ke = stringToPrecomputedChunk(" ");
    var Ce = stringToPrecomputedChunk('="');
    var be = stringToPrecomputedChunk('"');
    var we = stringToPrecomputedChunk('=""');
    function pushAttribute(e69, t39, r19, n14) {
        switch(r19){
            case "style":
                pushStyle(e69, t39, n14);
                return;
            case "defaultValue":
            case "defaultChecked":
            case "innerHTML":
            case "suppressContentEditableWarning":
            case "suppressHydrationWarning":
                return;
        }
        if (!(r19.length > 2) || "o" !== r19[0] && "O" !== r19[0] || "n" !== r19[1] && "N" !== r19[1]) {
            var o12 = getPropertyInfo(r19);
            if (null !== o12) {
                switch(typeof n14){
                    case "function":
                    case "symbol":
                        return;
                    case "boolean":
                        if (!o12.acceptsBooleans) return;
                }
                var a11 = o12.attributeName;
                var i8 = stringToChunk(a11);
                switch(o12.type){
                    case d1:
                        n14 && e69.push(ke, i8, we);
                        return;
                    case f1:
                        true === n14 ? e69.push(ke, i8, we) : false === n14 || e69.push(ke, i8, Ce, stringToChunk(escapeTextForBrowser(n14)), be);
                        return;
                    case h1:
                        isNaN(n14) || e69.push(ke, i8, Ce, stringToChunk(escapeTextForBrowser(n14)), be);
                        break;
                    case m11:
                        !isNaN(n14) && n14 >= 1 && e69.push(ke, i8, Ce, stringToChunk(escapeTextForBrowser(n14)), be);
                        break;
                    default:
                        if (o12.sanitizeURL) {
                            checkAttributeStringCoercion(n14, a11);
                            n14 = "" + n14;
                            sanitizeURL(n14);
                        }
                        e69.push(ke, i8, Ce, stringToChunk(escapeTextForBrowser(n14)), be);
                }
            } else if (isAttributeNameSafe(r19)) {
                switch(typeof n14){
                    case "function":
                    case "symbol":
                        return;
                    case "boolean":
                        var s7 = r19.toLowerCase().slice(0, 5);
                        if ("data-" !== s7 && "aria-" !== s7) return;
                }
                e69.push(ke, stringToChunk(r19), Ce, stringToChunk(escapeTextForBrowser(n14)), be);
            }
        }
    }
    var Se = stringToPrecomputedChunk(">");
    var xe = stringToPrecomputedChunk("/>");
    function pushInnerHTML(e70, t40, r20) {
        if (null != t40) {
            if (null != r20) throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
            if ("object" !== typeof t40 || !("__html" in t40)) throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
            var n15 = t40.__html;
            if (null !== n15 && void 0 !== n15) {
                checkHtmlStringCoercion(n15);
                e70.push(stringToChunk("" + n15));
            }
        }
    }
    var Te = false;
    var Pe = false;
    var Re = false;
    var Ie = false;
    var Ee = false;
    var Fe = false;
    var De = false;
    function checkSelectProp(e71, t41) {
        var r21 = e71[t41];
        if (null != r21) {
            var n16 = isArray(r21);
            e71.multiple && !n16 ? error("The `%s` prop supplied to <select> must be an array if `multiple` is true.", t41) : !e71.multiple && n16 && error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.", t41);
        }
    }
    function pushStartSelect(e72, t42, r22) {
        checkControlledValueProps("select", t42);
        checkSelectProp(t42, "value");
        checkSelectProp(t42, "defaultValue");
        if (void 0 !== t42.value && void 0 !== t42.defaultValue && !Re) {
            error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components");
            Re = true;
        }
        e72.push(startChunkForTag("select"));
        var n17 = null;
        var o13 = null;
        for(var a12 in t42)if (l11.call(t42, a12)) {
            var i9 = t42[a12];
            if (null == i9) continue;
            switch(a12){
                case "children":
                    n17 = i9;
                    break;
                case "dangerouslySetInnerHTML":
                    o13 = i9;
                    break;
                case "defaultValue":
                case "value":
                    break;
                default:
                    pushAttribute(e72, r22, a12, i9);
                    break;
            }
        }
        e72.push(Se);
        pushInnerHTML(e72, o13, n17);
        return n17;
    }
    function flattenOptionChildren(e73) {
        var r23 = "";
        t12.Children.forEach(e73, function(e74) {
            if (null != e74) {
                r23 += e74;
                if (!Ee && "string" !== typeof e74 && "number" !== typeof e74) {
                    Ee = true;
                    error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.");
                }
            }
        });
        return r23;
    }
    var Ne = stringToPrecomputedChunk(' selected=""');
    function pushStartOption(e75, t43, r24, n18) {
        var o14 = n18.selectedValue;
        e75.push(startChunkForTag("option"));
        var a13 = null;
        var i10 = null;
        var s8 = null;
        var u5 = null;
        for(var c6 in t43)if (l11.call(t43, c6)) {
            var p4 = t43[c6];
            if (null == p4) continue;
            switch(c6){
                case "children":
                    a13 = p4;
                    break;
                case "selected":
                    s8 = p4;
                    if (!De) {
                        error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>.");
                        De = true;
                    }
                    break;
                case "dangerouslySetInnerHTML":
                    u5 = p4;
                    break;
                case "value":
                    i10 = p4;
                default:
                    pushAttribute(e75, r24, c6, p4);
                    break;
            }
        }
        if (null !== o14) {
            var d2;
            if (null !== i10) {
                checkAttributeStringCoercion(i10, "value");
                d2 = "" + i10;
            } else {
                if (null !== u5 && !Fe) {
                    Fe = true;
                    error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.");
                }
                d2 = flattenOptionChildren(a13);
            }
            if (isArray(o14)) for(var f4 = 0; f4 < o14.length; f4++){
                checkAttributeStringCoercion(o14[f4], "value");
                var h2 = "" + o14[f4];
                if (h2 === d2) {
                    e75.push(Ne);
                    break;
                }
            }
            else o14 === d2 && e75.push(Ne);
        } else s8 && e75.push(Ne);
        e75.push(Se);
        pushInnerHTML(e75, u5, a13);
        return a13;
    }
    function pushInput(e76, t44, r25) {
        checkControlledValueProps("input", t44);
        if (void 0 !== t44.checked && void 0 !== t44.defaultChecked && !Pe) {
            error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", t44.type);
            Pe = true;
        }
        if (void 0 !== t44.value && void 0 !== t44.defaultValue && !Te) {
            error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", t44.type);
            Te = true;
        }
        e76.push(startChunkForTag("input"));
        var n19 = null;
        var o15 = null;
        var a14 = null;
        var i11 = null;
        for(var s9 in t44)if (l11.call(t44, s9)) {
            var u6 = t44[s9];
            if (null == u6) continue;
            switch(s9){
                case "children":
                case "dangerouslySetInnerHTML":
                    throw new Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
                case "defaultChecked":
                    i11 = u6;
                    break;
                case "defaultValue":
                    o15 = u6;
                    break;
                case "checked":
                    a14 = u6;
                    break;
                case "value":
                    n19 = u6;
                    break;
                default:
                    pushAttribute(e76, r25, s9, u6);
                    break;
            }
        }
        null !== a14 ? pushAttribute(e76, r25, "checked", a14) : null !== i11 && pushAttribute(e76, r25, "checked", i11);
        null !== n19 ? pushAttribute(e76, r25, "value", n19) : null !== o15 && pushAttribute(e76, r25, "value", o15);
        e76.push(xe);
        return null;
    }
    function pushStartTextArea(e77, t45, r26) {
        checkControlledValueProps("textarea", t45);
        if (void 0 !== t45.value && void 0 !== t45.defaultValue && !Ie) {
            error("Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components");
            Ie = true;
        }
        e77.push(startChunkForTag("textarea"));
        var n20 = null;
        var o16 = null;
        var a15 = null;
        for(var i12 in t45)if (l11.call(t45, i12)) {
            var s10 = t45[i12];
            if (null == s10) continue;
            switch(i12){
                case "children":
                    a15 = s10;
                    break;
                case "value":
                    n20 = s10;
                    break;
                case "defaultValue":
                    o16 = s10;
                    break;
                case "dangerouslySetInnerHTML":
                    throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
                default:
                    pushAttribute(e77, r26, i12, s10);
                    break;
            }
        }
        null === n20 && null !== o16 && (n20 = o16);
        e77.push(Se);
        if (null != a15) {
            error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
            if (null != n20) throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (isArray(a15)) {
                if (a15.length > 1) throw new Error("<textarea> can only have at most one child.");
                checkHtmlStringCoercion(a15[0]);
                n20 = "" + a15[0];
            }
            checkHtmlStringCoercion(a15);
            n20 = "" + a15;
        }
        "string" === typeof n20 && "\n" === n20[0] && e77.push(Ae);
        return n20;
    }
    function pushSelfClosing(e78, t46, r27, n21) {
        e78.push(startChunkForTag(r27));
        for(var o17 in t46)if (l11.call(t46, o17)) {
            var a16 = t46[o17];
            if (null == a16) continue;
            switch(o17){
                case "children":
                case "dangerouslySetInnerHTML":
                    throw new Error(r27 + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
                default:
                    pushAttribute(e78, n21, o17, a16);
                    break;
            }
        }
        e78.push(xe);
        return null;
    }
    function pushStartMenuItem(e79, t47, r28) {
        e79.push(startChunkForTag("menuitem"));
        for(var n22 in t47)if (l11.call(t47, n22)) {
            var o18 = t47[n22];
            if (null == o18) continue;
            switch(n22){
                case "children":
                case "dangerouslySetInnerHTML":
                    throw new Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
                default:
                    pushAttribute(e79, r28, n22, o18);
                    break;
            }
        }
        e79.push(Se);
        return null;
    }
    function pushStartGenericElement(e80, t48, r29, n23) {
        e80.push(startChunkForTag(r29));
        var o19 = null;
        var a17 = null;
        for(var i13 in t48)if (l11.call(t48, i13)) {
            var s12 = t48[i13];
            if (null == s12) continue;
            switch(i13){
                case "children":
                    o19 = s12;
                    break;
                case "dangerouslySetInnerHTML":
                    a17 = s12;
                    break;
                default:
                    pushAttribute(e80, n23, i13, s12);
                    break;
            }
        }
        e80.push(Se);
        pushInnerHTML(e80, a17, o19);
        if ("string" === typeof o19) {
            e80.push(stringToChunk(encodeHTMLTextNode(o19)));
            return null;
        }
        return o19;
    }
    function pushStartCustomElement(e81, t49, r30, n24) {
        e81.push(startChunkForTag(r30));
        var o20 = null;
        var a18 = null;
        for(var i14 in t49)if (l11.call(t49, i14)) {
            var s13 = t49[i14];
            if (null == s13) continue;
            switch(i14){
                case "children":
                    o20 = s13;
                    break;
                case "dangerouslySetInnerHTML":
                    a18 = s13;
                    break;
                case "style":
                    pushStyle(e81, n24, s13);
                    break;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                    break;
                default:
                    isAttributeNameSafe(i14) && "function" !== typeof s13 && "symbol" !== typeof s13 && e81.push(ke, stringToChunk(i14), Ce, stringToChunk(escapeTextForBrowser(s13)), be);
                    break;
            }
        }
        e81.push(Se);
        pushInnerHTML(e81, a18, o20);
        return o20;
    }
    var Ae = stringToPrecomputedChunk("\n");
    function pushStartPreformattedElement(e82, t50, r31, n25) {
        e82.push(startChunkForTag(r31));
        var o21 = null;
        var a19 = null;
        for(var i15 in t50)if (l11.call(t50, i15)) {
            var s14 = t50[i15];
            if (null == s14) continue;
            switch(i15){
                case "children":
                    o21 = s14;
                    break;
                case "dangerouslySetInnerHTML":
                    a19 = s14;
                    break;
                default:
                    pushAttribute(e82, n25, i15, s14);
                    break;
            }
        }
        e82.push(Se);
        if (null != a19) {
            if (null != o21) throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
            if ("object" !== typeof a19 || !("__html" in a19)) throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
            var u7 = a19.__html;
            if (null !== u7 && void 0 !== u7) if ("string" === typeof u7 && u7.length > 0 && "\n" === u7[0]) e82.push(Ae, stringToChunk(u7));
            else {
                checkHtmlStringCoercion(u7);
                e82.push(stringToChunk("" + u7));
            }
        }
        "string" === typeof o21 && "\n" === o21[0] && e82.push(Ae);
        return o21;
    }
    var Me = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
    var Be = new Map;
    function startChunkForTag(e83) {
        var t51 = Be.get(e83);
        if (void 0 === t51) {
            if (!Me.test(e83)) throw new Error("Invalid tag: " + e83);
            t51 = stringToPrecomputedChunk("<" + e83);
            Be.set(e83, t51);
        }
        return t51;
    }
    var Le = stringToPrecomputedChunk("<!DOCTYPE html>");
    function pushStartInstance(e84, t52, r32, n26, o22) {
        validateProperties(t52, r32);
        validateProperties$1(t52, r32);
        validateProperties$2(t52, r32, null);
        !r32.suppressContentEditableWarning && r32.contentEditable && null != r32.children && error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
        o22.insertionMode !== se && o22.insertionMode !== le && -1 === t52.indexOf("-") && "string" !== typeof r32.is && t52.toLowerCase() !== t52 && error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", t52);
        switch(t52){
            case "select":
                return pushStartSelect(e84, r32, n26);
            case "option":
                return pushStartOption(e84, r32, n26, o22);
            case "textarea":
                return pushStartTextArea(e84, r32, n26);
            case "input":
                return pushInput(e84, r32, n26);
            case "menuitem":
                return pushStartMenuItem(e84, r32, n26);
            case "listing":
            case "pre":
                return pushStartPreformattedElement(e84, r32, t52, n26);
            case "area":
            case "base":
            case "br":
            case "col":
            case "embed":
            case "hr":
            case "img":
            case "keygen":
            case "link":
            case "meta":
            case "param":
            case "source":
            case "track":
            case "wbr":
                return pushSelfClosing(e84, r32, t52, n26);
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph":
                return pushStartGenericElement(e84, r32, t52, n26);
            case "html":
                o22.insertionMode === ae && e84.push(Le);
                return pushStartGenericElement(e84, r32, t52, n26);
            default:
                return -1 === t52.indexOf("-") && "string" !== typeof r32.is ? pushStartGenericElement(e84, r32, t52, n26) : pushStartCustomElement(e84, r32, t52, n26);
        }
    }
    var He = stringToPrecomputedChunk("</");
    var Oe = stringToPrecomputedChunk(">");
    function pushEndInstance(e85, t53, r) {
        switch(t53){
            case "area":
            case "base":
            case "br":
            case "col":
            case "embed":
            case "hr":
            case "img":
            case "input":
            case "keygen":
            case "link":
            case "meta":
            case "param":
            case "source":
            case "track":
            case "wbr":
                break;
            default:
                e85.push(He, stringToChunk(t53), Oe);
        }
    }
    function writeCompletedRoot(e86, t54) {
        var r33 = t54.bootstrapChunks;
        var n27 = true;
        for(var o23 = 0; o23 < r33.length; o23++)n27 = writeChunk(e86, r33[o23]);
        return n27;
    }
    var Ue = stringToPrecomputedChunk('<template id="');
    var _e = stringToPrecomputedChunk('"></template>');
    function writePlaceholder(e87, t55, r34) {
        writeChunk(e87, Ue);
        writeChunk(e87, t55.placeholderPrefix);
        var n28 = stringToChunk(r34.toString(16));
        writeChunk(e87, n28);
        return writeChunk(e87, _e);
    }
    var We = stringToPrecomputedChunk("\x3c!--$--\x3e");
    var ze = stringToPrecomputedChunk('\x3c!--$?--\x3e<template id="');
    var je = stringToPrecomputedChunk('"></template>');
    var Ve = stringToPrecomputedChunk("\x3c!--$!--\x3e");
    var $e = stringToPrecomputedChunk("\x3c!--/$--\x3e");
    function writeStartCompletedSuspenseBoundary(e88, t) {
        return writeChunk(e88, We);
    }
    function writeStartPendingSuspenseBoundary(e89, t, r35) {
        writeChunk(e89, ze);
        if (null === r35) throw new Error("An ID must have been assigned before we can complete the boundary.");
        writeChunk(e89, r35);
        return writeChunk(e89, je);
    }
    function writeStartClientRenderedSuspenseBoundary(e90, t) {
        return writeChunk(e90, Ve);
    }
    function writeEndCompletedSuspenseBoundary(e91, t) {
        return writeChunk(e91, $e);
    }
    function writeEndPendingSuspenseBoundary(e92, t) {
        return writeChunk(e92, $e);
    }
    function writeEndClientRenderedSuspenseBoundary(e93, t) {
        return writeChunk(e93, $e);
    }
    var qe = stringToPrecomputedChunk('<div hidden id="');
    var Ye = stringToPrecomputedChunk('">');
    var Xe = stringToPrecomputedChunk("</div>");
    var Ge = stringToPrecomputedChunk('<svg aria-hidden="true" style="display:none" id="');
    var Ze = stringToPrecomputedChunk('">');
    var Qe = stringToPrecomputedChunk("</svg>");
    var Ke = stringToPrecomputedChunk('<math aria-hidden="true" style="display:none" id="');
    var Je = stringToPrecomputedChunk('">');
    var et = stringToPrecomputedChunk("</math>");
    var tt = stringToPrecomputedChunk('<table hidden id="');
    var rt = stringToPrecomputedChunk('">');
    var nt = stringToPrecomputedChunk("</table>");
    var ot = stringToPrecomputedChunk('<table hidden><tbody id="');
    var at = stringToPrecomputedChunk('">');
    var it = stringToPrecomputedChunk("</tbody></table>");
    var st = stringToPrecomputedChunk('<table hidden><tr id="');
    var lt = stringToPrecomputedChunk('">');
    var ut = stringToPrecomputedChunk("</tr></table>");
    var ct = stringToPrecomputedChunk('<table hidden><colgroup id="');
    var pt = stringToPrecomputedChunk('">');
    var dt = stringToPrecomputedChunk("</colgroup></table>");
    function writeStartSegment(e94, t56, r36, n29) {
        switch(r36.insertionMode){
            case ae:
            case ie:
                writeChunk(e94, qe);
                writeChunk(e94, t56.segmentPrefix);
                writeChunk(e94, stringToChunk(n29.toString(16)));
                return writeChunk(e94, Ye);
            case se:
                writeChunk(e94, Ge);
                writeChunk(e94, t56.segmentPrefix);
                writeChunk(e94, stringToChunk(n29.toString(16)));
                return writeChunk(e94, Ze);
            case le:
                writeChunk(e94, Ke);
                writeChunk(e94, t56.segmentPrefix);
                writeChunk(e94, stringToChunk(n29.toString(16)));
                return writeChunk(e94, Je);
            case ue:
                writeChunk(e94, tt);
                writeChunk(e94, t56.segmentPrefix);
                writeChunk(e94, stringToChunk(n29.toString(16)));
                return writeChunk(e94, rt);
            case ce:
                writeChunk(e94, ot);
                writeChunk(e94, t56.segmentPrefix);
                writeChunk(e94, stringToChunk(n29.toString(16)));
                return writeChunk(e94, at);
            case pe:
                writeChunk(e94, st);
                writeChunk(e94, t56.segmentPrefix);
                writeChunk(e94, stringToChunk(n29.toString(16)));
                return writeChunk(e94, lt);
            case de:
                writeChunk(e94, ct);
                writeChunk(e94, t56.segmentPrefix);
                writeChunk(e94, stringToChunk(n29.toString(16)));
                return writeChunk(e94, pt);
            default:
                throw new Error("Unknown insertion mode. This is a bug in React.");
        }
    }
    function writeEndSegment(e95, t57) {
        switch(t57.insertionMode){
            case ae:
            case ie:
                return writeChunk(e95, Xe);
            case se:
                return writeChunk(e95, Qe);
            case le:
                return writeChunk(e95, et);
            case ue:
                return writeChunk(e95, nt);
            case ce:
                return writeChunk(e95, it);
            case pe:
                return writeChunk(e95, ut);
            case de:
                return writeChunk(e95, dt);
            default:
                throw new Error("Unknown insertion mode. This is a bug in React.");
        }
    }
    var ft = "function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)}";
    var ht = 'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}}';
    var mt = 'function $RX(a){if(a=document.getElementById(a))a=a.previousSibling,a.data="$!",a._reactRetry&&a._reactRetry()}';
    var vt = stringToPrecomputedChunk(ft + ';$RS("');
    var gt = stringToPrecomputedChunk('$RS("');
    var yt = stringToPrecomputedChunk('","');
    var kt = stringToPrecomputedChunk('")<\/script>');
    function writeCompletedSegmentInstruction(e96, t58, r37) {
        writeChunk(e96, t58.startInlineScript);
        if (t58.sentCompleteSegmentFunction) writeChunk(e96, gt);
        else {
            t58.sentCompleteSegmentFunction = true;
            writeChunk(e96, vt);
        }
        writeChunk(e96, t58.segmentPrefix);
        var n30 = stringToChunk(r37.toString(16));
        writeChunk(e96, n30);
        writeChunk(e96, yt);
        writeChunk(e96, t58.placeholderPrefix);
        writeChunk(e96, n30);
        return writeChunk(e96, kt);
    }
    var Ct = stringToPrecomputedChunk(ht + ';$RC("');
    var bt = stringToPrecomputedChunk('$RC("');
    var wt = stringToPrecomputedChunk('","');
    var St = stringToPrecomputedChunk('")<\/script>');
    function writeCompletedBoundaryInstruction(e97, t59, r38, n31) {
        writeChunk(e97, t59.startInlineScript);
        if (t59.sentCompleteBoundaryFunction) writeChunk(e97, bt);
        else {
            t59.sentCompleteBoundaryFunction = true;
            writeChunk(e97, Ct);
        }
        if (null === r38) throw new Error("An ID must have been assigned before we can complete the boundary.");
        var o24 = stringToChunk(n31.toString(16));
        writeChunk(e97, r38);
        writeChunk(e97, wt);
        writeChunk(e97, t59.segmentPrefix);
        writeChunk(e97, o24);
        return writeChunk(e97, St);
    }
    var xt = stringToPrecomputedChunk(mt + ';$RX("');
    var Tt = stringToPrecomputedChunk('$RX("');
    var Pt = stringToPrecomputedChunk('")<\/script>');
    function writeClientRenderBoundaryInstruction(e98, t60, r39) {
        writeChunk(e98, t60.startInlineScript);
        if (t60.sentClientRenderFunction) writeChunk(e98, Tt);
        else {
            t60.sentClientRenderFunction = true;
            writeChunk(e98, xt);
        }
        if (null === r39) throw new Error("An ID must have been assigned before we can complete the boundary.");
        writeChunk(e98, r39);
        return writeChunk(e98, Pt);
    }
    var Rt = 60103;
    var It = 60106;
    var Et = 60107;
    var Ft = 60108;
    var Dt = 60114;
    var Nt = 60109;
    var At = 60110;
    var Mt = 60112;
    var Bt = 60113;
    var Lt = 60120;
    var Ht = 60115;
    var Ot = 60116;
    var Ut = 60119;
    var _t = 60129;
    var Wt = 60131;
    var zt = 60132;
    if ("function" === typeof Symbol && Symbol.for) {
        var jt = Symbol.for;
        Rt = jt("react.element");
        It = jt("react.portal");
        Et = jt("react.fragment");
        Ft = jt("react.strict_mode");
        Dt = jt("react.profiler");
        Nt = jt("react.provider");
        At = jt("react.context");
        Mt = jt("react.forward_ref");
        Bt = jt("react.suspense");
        Lt = jt("react.suspense_list");
        Ht = jt("react.memo");
        Ot = jt("react.lazy");
        Ut = jt("react.scope");
        _t = jt("react.debug_trace_mode");
        jt("react.offscreen");
        Wt = jt("react.legacy_hidden");
        zt = jt("react.cache");
    }
    var Vt = "function" === typeof Symbol && Symbol.iterator;
    var $t = "@@iterator";
    function getIteratorFn(e99) {
        if (null === e99 || "object" !== typeof e99) return null;
        var t61 = Vt && e99[Vt] || e99[$t];
        return "function" === typeof t61 ? t61 : null;
    }
    function getWrappedName(e100, t62, r40) {
        var n32 = e100.displayName;
        if (n32) return n32;
        var o25 = t62.displayName || t62.name || "";
        return "" !== o25 ? r40 + "(" + o25 + ")" : r40;
    }
    function getContextName(e101) {
        return e101.displayName || "Context";
    }
    function getComponentNameFromType(e102) {
        if (null == e102) return null;
        "number" === typeof e102.tag && error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
        if ("function" === typeof e102) return e102.displayName || e102.name || null;
        if ("string" === typeof e102) return e102;
        switch(e102){
            case Et:
                return "Fragment";
            case It:
                return "Portal";
            case Dt:
                return "Profiler";
            case Ft:
                return "StrictMode";
            case Bt:
                return "Suspense";
            case Lt:
                return "SuspenseList";
            case zt:
                return "Cache";
        }
        if ("object" === typeof e102) switch(e102.$$typeof){
            case At:
                var t63 = e102;
                return getContextName(t63) + ".Consumer";
            case Nt:
                var r41 = e102;
                return getContextName(r41._context) + ".Provider";
            case Mt:
                return getWrappedName(e102, e102.render, "ForwardRef");
            case Ht:
                var n33 = e102.displayName || null;
                return null !== n33 ? n33 : getComponentNameFromType(e102.type) || "Memo";
            case Ot:
                var o26 = e102;
                var a20 = o26._payload;
                var i16 = o26._init;
                try {
                    return getComponentNameFromType(i16(a20));
                } catch (e) {
                    return null;
                }
        }
        return null;
    }
    var qt = 0;
    var Yt;
    var Xt;
    var Gt;
    var Zt;
    var Qt;
    var Kt;
    var Jt;
    function disabledLog() {}
    disabledLog.__reactDisabledLog = true;
    function disableLogs() {
        if (0 === qt) {
            Yt = console.log;
            Xt = console.info;
            Gt = console.warn;
            Zt = console.error;
            Qt = console.group;
            Kt = console.groupCollapsed;
            Jt = console.groupEnd;
            var e103 = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
            };
            Object.defineProperties(console, {
                info: e103,
                log: e103,
                warn: e103,
                error: e103,
                group: e103,
                groupCollapsed: e103,
                groupEnd: e103
            });
        }
        qt++;
    }
    function reenableLogs() {
        qt--;
        if (0 === qt) {
            var t64 = {
                configurable: true,
                enumerable: true,
                writable: true
            };
            Object.defineProperties(console, {
                log: e14({}, t64, {
                    value: Yt
                }),
                info: e14({}, t64, {
                    value: Xt
                }),
                warn: e14({}, t64, {
                    value: Gt
                }),
                error: e14({}, t64, {
                    value: Zt
                }),
                group: e14({}, t64, {
                    value: Qt
                }),
                groupCollapsed: e14({}, t64, {
                    value: Kt
                }),
                groupEnd: e14({}, t64, {
                    value: Jt
                })
            });
        }
        qt < 0 && error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
    var er = i11.ReactCurrentDispatcher;
    var tr;
    function describeBuiltInComponentFrame(e105, t, r) {
        if (void 0 === tr) try {
            throw Error();
        } catch (e104) {
            var n34 = e104.stack.trim().match(/\n( *(at )?)/);
            tr = n34 && n34[1] || "";
        }
        return "\n" + tr + e105;
    }
    var rr = false;
    var nr;
    var or = "function" === typeof WeakMap ? WeakMap : Map;
    nr = new or;
    function describeNativeComponentFrame(e106, t65) {
        if (!e106 || rr) return "";
        var r42 = nr.get(e106);
        if (void 0 !== r42) return r42;
        var n35;
        rr = true;
        var o27 = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var a21;
        a21 = er.current;
        er.current = null;
        disableLogs();
        try {
            if (t65) {
                var Fake = function() {
                    throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                    set: function() {
                        throw Error();
                    }
                });
                if ("object" === typeof Reflect && Reflect.construct) {
                    try {
                        Reflect.construct(Fake, []);
                    } catch (e107) {
                        n35 = e107;
                    }
                    Reflect.construct(e106, [], Fake);
                } else {
                    try {
                        Fake.call();
                    } catch (e108) {
                        n35 = e108;
                    }
                    e106.call(Fake.prototype);
                }
            } else {
                try {
                    throw Error();
                } catch (e109) {
                    n35 = e109;
                }
                e106();
            }
        } catch (t66) {
            if (t66 && n35 && "string" === typeof t66.stack) {
                var i17 = t66.stack.split("\n");
                var s15 = n35.stack.split("\n");
                var l5 = i17.length - 1;
                var u8 = s15.length - 1;
                while(l5 >= 1 && u8 >= 0 && i17[l5] !== s15[u8])u8--;
                for(; l5 >= 1 && u8 >= 0; l5--, u8--)if (i17[l5] !== s15[u8]) {
                    if (1 !== l5 || 1 !== u8) do {
                        l5--;
                        u8--;
                        if (u8 < 0 || i17[l5] !== s15[u8]) {
                            var c7 = "\n" + i17[l5].replace(" at new ", " at ");
                            e106.displayName && c7.includes("<anonymous>") && (c7 = c7.replace("<anonymous>", e106.displayName));
                            "function" === typeof e106 && nr.set(e106, c7);
                            return c7;
                        }
                    }while (l5 >= 1 && u8 >= 0)
                    break;
                }
            }
        } finally{
            rr = false;
            er.current = a21;
            reenableLogs();
            Error.prepareStackTrace = o27;
        }
        var p5 = e106 ? e106.displayName || e106.name : "";
        var d3 = p5 ? describeBuiltInComponentFrame(p5) : "";
        "function" === typeof e106 && nr.set(e106, d3);
        return d3;
    }
    function describeClassComponentFrame(e110, t, r) {
        return describeNativeComponentFrame(e110, true);
    }
    function describeFunctionComponentFrame(e111, t, r) {
        return describeNativeComponentFrame(e111, false);
    }
    function shouldConstruct(e112) {
        var t67 = e112.prototype;
        return !!(t67 && t67.isReactComponent);
    }
    function describeUnknownElementTypeFrameInDEV(e113, t68, r43) {
        if (null == e113) return "";
        if ("function" === typeof e113) return describeNativeComponentFrame(e113, shouldConstruct(e113));
        if ("string" === typeof e113) return describeBuiltInComponentFrame(e113);
        switch(e113){
            case Bt:
                return describeBuiltInComponentFrame("Suspense");
            case Lt:
                return describeBuiltInComponentFrame("SuspenseList");
        }
        if ("object" === typeof e113) switch(e113.$$typeof){
            case Mt:
                return describeFunctionComponentFrame(e113.render);
            case Ht:
                return describeUnknownElementTypeFrameInDEV(e113.type, t68, r43);
            case Ot:
                var n36 = e113;
                var o28 = n36._payload;
                var a22 = n36._init;
                try {
                    return describeUnknownElementTypeFrameInDEV(a22(o28), t68, r43);
                } catch (e) {}
        }
        return "";
    }
    var ar = {};
    var ir = i11.ReactDebugCurrentFrame;
    function setCurrentlyValidatingElement(e114) {
        if (e114) {
            var t69 = e114._owner;
            var r44 = describeUnknownElementTypeFrameInDEV(e114.type, e114._source, t69 ? t69.type : null);
            ir.setExtraStackFrame(r44);
        } else ir.setExtraStackFrame(null);
    }
    function checkPropTypes(e115, t70, r45, n37, o29) {
        var a23 = Function.call.bind(l11);
        for(var i18 in e115)if (a23(e115, i18)) {
            var s16 = void 0;
            try {
                if ("function" !== typeof e115[i18]) {
                    var u9 = Error((n37 || "React class") + ": " + r45 + " type `" + i18 + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e115[i18] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    u9.name = "Invariant Violation";
                    throw u9;
                }
                s16 = e115[i18](t70, i18, n37, r45, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (e116) {
                s16 = e116;
            }
            if (s16 && !(s16 instanceof Error)) {
                setCurrentlyValidatingElement(o29);
                error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n37 || "React class", r45, i18, typeof s16);
                setCurrentlyValidatingElement(null);
            }
            if (s16 instanceof Error && !(s16.message in ar)) {
                ar[s16.message] = true;
                setCurrentlyValidatingElement(o29);
                error("Failed %s type: %s", r45, s16.message);
                setCurrentlyValidatingElement(null);
            }
        }
    }
    var sr;
    sr = {};
    var lr = {};
    Object.freeze(lr);
    function getMaskedContext(e117, t71) {
        var r46 = e117.contextTypes;
        if (!r46) return lr;
        var n38 = {};
        for(var o30 in r46)n38[o30] = t71[o30];
        var a24 = getComponentNameFromType(e117) || "Unknown";
        checkPropTypes(r46, n38, "context", a24);
        return n38;
    }
    function processChildContext(t72, r47, n39, o31) {
        if ("function" !== typeof t72.getChildContext) {
            var a25 = getComponentNameFromType(r47) || "Unknown";
            if (!sr[a25]) {
                sr[a25] = true;
                error("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", a25, a25);
            }
            return n39;
        }
        var i19 = t72.getChildContext();
        for(var s17 in i19)if (!(s17 in o31)) throw new Error((getComponentNameFromType(r47) || "Unknown") + '.getChildContext(): key "' + s17 + '" is not defined in childContextTypes.');
        var l6 = getComponentNameFromType(r47) || "Unknown";
        checkPropTypes(o31, i19, "child context", l6);
        return e14({}, n39, i19);
    }
    var ur;
    ur = {};
    var cr = null;
    var pr = null;
    function popNode(e118) {
        e118.context._currentValue = e118.parentValue;
    }
    function pushNode(e119) {
        e119.context._currentValue = e119.value;
    }
    function popToNearestCommonAncestor(e120, t73) {
        if (e120 === t73) ;
        else {
            popNode(e120);
            var r48 = e120.parent;
            var n40 = t73.parent;
            if (null === r48) {
                if (null !== n40) throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
            } else {
                if (null === n40) throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
                popToNearestCommonAncestor(r48, n40);
                pushNode(t73);
            }
        }
    }
    function popAllPrevious(e121) {
        popNode(e121);
        var t74 = e121.parent;
        null !== t74 && popAllPrevious(t74);
    }
    function pushAllNext(e122) {
        var t75 = e122.parent;
        null !== t75 && pushAllNext(t75);
        pushNode(e122);
    }
    function popPreviousToCommonLevel(e123, t76) {
        popNode(e123);
        var r49 = e123.parent;
        if (null === r49) throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
        r49.depth === t76.depth ? popToNearestCommonAncestor(r49, t76) : popPreviousToCommonLevel(r49, t76);
    }
    function popNextToCommonLevel(e124, t77) {
        var r50 = t77.parent;
        if (null === r50) throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
        e124.depth === r50.depth ? popToNearestCommonAncestor(e124, r50) : popNextToCommonLevel(e124, r50);
        pushNode(t77);
    }
    function switchContext(e125) {
        var t78 = pr;
        var r51 = e125;
        if (t78 !== r51) {
            null === t78 ? pushAllNext(r51) : null === r51 ? popAllPrevious(t78) : t78.depth === r51.depth ? popToNearestCommonAncestor(t78, r51) : t78.depth > r51.depth ? popPreviousToCommonLevel(t78, r51) : popNextToCommonLevel(t78, r51);
            pr = r51;
        }
    }
    function pushProvider(e126, t79) {
        var r52;
        r52 = e126._currentValue;
        e126._currentValue = t79;
        void 0 !== e126._currentRenderer && null !== e126._currentRenderer && e126._currentRenderer !== ur && error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
        e126._currentRenderer = ur;
        var n41 = pr;
        var o32 = {
            parent: n41,
            depth: null === n41 ? 0 : n41.depth + 1,
            context: e126,
            parentValue: r52,
            value: t79
        };
        pr = o32;
        return o32;
    }
    function popProvider(e127) {
        var t80 = pr;
        if (null === t80) throw new Error("Tried to pop a Context at the root of the app. This is a bug in React.");
        t80.context !== e127 && error("The parent context is not the expected context. This is probably a bug in React.");
        t80.context._currentValue = t80.parentValue;
        void 0 !== e127._currentRenderer && null !== e127._currentRenderer && e127._currentRenderer !== ur && error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
        e127._currentRenderer = ur;
        return pr = t80.parent;
    }
    function getActiveContext() {
        return pr;
    }
    function readContext(e128) {
        var t81 = e128._currentValue;
        return t81;
    }
    function get(e129) {
        return e129._reactInternals;
    }
    function set(e130, t82) {
        e130._reactInternals = t82;
    }
    var dr = {};
    var fr = {};
    var hr;
    var mr;
    var vr;
    var gr;
    var yr;
    var kr;
    var Cr;
    var br;
    var wr;
    hr = new Set;
    mr = new Set;
    vr = new Set;
    Cr = new Set;
    gr = new Set;
    br = new Set;
    wr = new Set;
    var Sr = new Set;
    kr = function(e131, t83) {
        if (null !== e131 && "function" !== typeof e131) {
            var r53 = t83 + "_" + e131;
            if (!Sr.has(r53)) {
                Sr.add(r53);
                error("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t83, e131);
            }
        }
    };
    yr = function(e132, t84) {
        if (void 0 === t84) {
            var r54 = getComponentNameFromType(e132) || "Component";
            if (!gr.has(r54)) {
                gr.add(r54);
                error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", r54);
            }
        }
    };
    function warnNoop(e133, t85) {
        var r55 = e133.constructor;
        var n42 = r55 && getComponentNameFromType(r55) || "ReactClass";
        var o33 = n42 + "." + t85;
        if (!dr[o33]) {
            error("%s(...): Can only update a mounting component. This usually means you called %s() outside componentWillMount() on the server. This is a no-op.\n\nPlease check the code for the %s component.", t85, t85, n42);
            dr[o33] = true;
        }
    }
    var xr = {
        isMounted: function(e) {
            return false;
        },
        enqueueSetState: function(e134, t86, r56) {
            var n43 = get(e134);
            if (null === n43.queue) warnNoop(e134, "setState");
            else {
                n43.queue.push(t86);
                void 0 !== r56 && null !== r56 && kr(r56, "setState");
            }
        },
        enqueueReplaceState: function(e135, t87, r57) {
            var n44 = get(e135);
            n44.replace = true;
            n44.queue = [
                t87
            ];
            void 0 !== r57 && null !== r57 && kr(r57, "setState");
        },
        enqueueForceUpdate: function(e136, t88) {
            var r58 = get(e136);
            null === r58.queue ? warnNoop(e136, "forceUpdate") : void 0 !== t88 && null !== t88 && kr(t88, "setState");
        }
    };
    function applyDerivedStateFromProps(t, r59, n45, o34, a26) {
        var i20 = n45(a26, o34);
        yr(r59, i20);
        var s18 = null === i20 || void 0 === i20 ? o34 : e14({}, o34, i20);
        return s18;
    }
    function constructClassInstance(e137, t89, r60) {
        var n46 = lr;
        var o35 = e137.contextType;
        if ("contextType" in e137) {
            var a27 = null === o35 || void 0 !== o35 && o35.$$typeof === At && void 0 === o35._context;
            if (!a27 && !wr.has(e137)) {
                wr.add(e137);
                var i21 = "";
                i21 = void 0 === o35 ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : "object" !== typeof o35 ? " However, it is set to a " + typeof o35 + "." : o35.$$typeof === Nt ? " Did you accidentally pass the Context.Provider instead?" : void 0 !== o35._context ? " Did you accidentally pass the Context.Consumer instead?" : " However, it is set to an object with keys {" + Object.keys(o35).join(", ") + "}.";
                error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", getComponentNameFromType(e137) || "Component", i21);
            }
        }
        n46 = "object" === typeof o35 && null !== o35 ? readContext(o35) : r60;
        var s19 = new e137(t89, n46);
        if ("function" === typeof e137.getDerivedStateFromProps && (null === s19.state || void 0 === s19.state)) {
            var l7 = getComponentNameFromType(e137) || "Component";
            if (!hr.has(l7)) {
                hr.add(l7);
                error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", l7, null === s19.state ? "null" : "undefined", l7);
            }
        }
        if ("function" === typeof e137.getDerivedStateFromProps || "function" === typeof s19.getSnapshotBeforeUpdate) {
            var u10 = null;
            var c8 = null;
            var p6 = null;
            "function" === typeof s19.componentWillMount && true !== s19.componentWillMount.__suppressDeprecationWarning ? u10 = "componentWillMount" : "function" === typeof s19.UNSAFE_componentWillMount && (u10 = "UNSAFE_componentWillMount");
            "function" === typeof s19.componentWillReceiveProps && true !== s19.componentWillReceiveProps.__suppressDeprecationWarning ? c8 = "componentWillReceiveProps" : "function" === typeof s19.UNSAFE_componentWillReceiveProps && (c8 = "UNSAFE_componentWillReceiveProps");
            "function" === typeof s19.componentWillUpdate && true !== s19.componentWillUpdate.__suppressDeprecationWarning ? p6 = "componentWillUpdate" : "function" === typeof s19.UNSAFE_componentWillUpdate && (p6 = "UNSAFE_componentWillUpdate");
            if (null !== u10 || null !== c8 || null !== p6) {
                var d4 = getComponentNameFromType(e137) || "Component";
                var f5 = "function" === typeof e137.getDerivedStateFromProps ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
                if (!vr.has(d4)) {
                    vr.add(d4);
                    error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://reactjs.org/link/unsafe-component-lifecycles", d4, f5, null !== u10 ? "\n  " + u10 : "", null !== c8 ? "\n  " + c8 : "", null !== p6 ? "\n  " + p6 : "");
                }
            }
        }
        return s19;
    }
    function checkClassInstance(e138, t90, r61) {
        var n47 = getComponentNameFromType(t90) || "Component";
        var o36 = e138.render;
        o36 || (t90.prototype && "function" === typeof t90.prototype.render ? error("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", n47) : error("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", n47));
        !e138.getInitialState || e138.getInitialState.isReactClassApproved || e138.state || error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", n47);
        e138.getDefaultProps && !e138.getDefaultProps.isReactClassApproved && error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", n47);
        e138.propTypes && error("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", n47);
        e138.contextType && error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", n47);
        e138.contextTypes && error("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", n47);
        if (t90.contextType && t90.contextTypes && !br.has(t90)) {
            br.add(t90);
            error("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", n47);
        }
        "function" === typeof e138.componentShouldUpdate && error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", n47);
        t90.prototype && t90.prototype.isPureReactComponent && "undefined" !== typeof e138.shouldComponentUpdate && error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", getComponentNameFromType(t90) || "A pure component");
        "function" === typeof e138.componentDidUnmount && error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", n47);
        "function" === typeof e138.componentDidReceiveProps && error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", n47);
        "function" === typeof e138.componentWillRecieveProps && error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", n47);
        "function" === typeof e138.UNSAFE_componentWillRecieveProps && error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", n47);
        var a28 = e138.props !== r61;
        void 0 !== e138.props && a28 && error("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", n47, n47);
        e138.defaultProps && error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", n47, n47);
        if ("function" === typeof e138.getSnapshotBeforeUpdate && "function" !== typeof e138.componentDidUpdate && !mr.has(t90)) {
            mr.add(t90);
            error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", getComponentNameFromType(t90));
        }
        "function" === typeof e138.getDerivedStateFromProps && error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", n47);
        "function" === typeof e138.getDerivedStateFromError && error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", n47);
        "function" === typeof t90.getSnapshotBeforeUpdate && error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", n47);
        var i22 = e138.state;
        i22 && ("object" !== typeof i22 || isArray(i22)) && error("%s.state: must be set to an object or null", n47);
        "function" === typeof e138.getChildContext && "object" !== typeof t90.childContextTypes && error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", n47);
    }
    function callComponentWillMount(e139, t91) {
        var r62 = t91.state;
        if ("function" === typeof t91.componentWillMount) {
            if (true !== t91.componentWillMount.__suppressDeprecationWarning) {
                var n48 = getComponentNameFromType(e139) || "Unknown";
                if (!fr[n48]) {
                    warn("componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move code from componentWillMount to componentDidMount (preferred in most cases) or the constructor.\n\nPlease update the following components: %s", n48);
                    fr[n48] = true;
                }
            }
            t91.componentWillMount();
        }
        "function" === typeof t91.UNSAFE_componentWillMount && t91.UNSAFE_componentWillMount();
        if (r62 !== t91.state) {
            error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", getComponentNameFromType(e139) || "Component");
            xr.enqueueReplaceState(t91, t91.state, null);
        }
    }
    function processUpdateQueue(t92, r63, n49, o37) {
        if (null !== t92.queue && t92.queue.length > 0) {
            var a29 = t92.queue;
            var i23 = t92.replace;
            t92.queue = null;
            t92.replace = false;
            if (i23 && 1 === a29.length) r63.state = a29[0];
            else {
                var s20 = i23 ? a29[0] : r63.state;
                var l8 = true;
                for(var u12 = i23 ? 1 : 0; u12 < a29.length; u12++){
                    var c9 = a29[u12];
                    var p7 = "function" === typeof c9 ? c9.call(r63, s20, n49, o37) : c9;
                    if (null != p7) if (l8) {
                        l8 = false;
                        s20 = e14({}, s20, p7);
                    } else e14(s20, p7);
                }
                r63.state = s20;
            }
        } else t92.queue = null;
    }
    function mountClassInstance(e140, t93, r64, n50) {
        checkClassInstance(e140, t93, r64);
        var o38 = void 0 !== e140.state ? e140.state : null;
        e140.updater = xr;
        e140.props = r64;
        e140.state = o38;
        var a30 = {
            queue: [],
            replace: false
        };
        set(e140, a30);
        var i24 = t93.contextType;
        e140.context = "object" === typeof i24 && null !== i24 ? readContext(i24) : n50;
        if (e140.state === r64) {
            var s21 = getComponentNameFromType(t93) || "Component";
            if (!Cr.has(s21)) {
                Cr.add(s21);
                error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", s21);
            }
        }
        var l9 = t93.getDerivedStateFromProps;
        "function" === typeof l9 && (e140.state = applyDerivedStateFromProps(e140, t93, l9, o38, r64));
        if ("function" !== typeof t93.getDerivedStateFromProps && "function" !== typeof e140.getSnapshotBeforeUpdate && ("function" === typeof e140.UNSAFE_componentWillMount || "function" === typeof e140.componentWillMount)) {
            callComponentWillMount(t93, e140);
            processUpdateQueue(a30, e140, r64, n50);
        }
    }
    var Tr = {
        id: 1,
        overflow: ""
    };
    function getTreeId(e141) {
        var t94 = e141.overflow;
        var r65 = e141.id;
        var n51 = r65 & ~getLeadingBit(r65);
        return n51.toString(32) + t94;
    }
    function pushTreeContext(e142, t95, r66) {
        var n52 = e142.id;
        var o39 = e142.overflow;
        var a31 = getBitLength(n52) - 1;
        var i25 = n52 & ~(1 << a31);
        var s22 = r66 + 1;
        var l10 = getBitLength(t95) + a31;
        if (l10 > 30) {
            var u13 = a31 - a31 % 5;
            var c10 = (1 << u13) - 1;
            var p8 = (i25 & c10).toString(32);
            var d5 = i25 >> u13;
            var f6 = a31 - u13;
            var h3 = getBitLength(t95) + f6;
            var m2 = s22 << f6;
            var v2 = m2 | d5;
            var g3 = p8 + o39;
            return {
                id: 1 << h3 | v2,
                overflow: g3
            };
        }
        var y3 = s22 << a31;
        var k3 = y3 | i25;
        var C3 = o39;
        return {
            id: 1 << l10 | k3,
            overflow: C3
        };
    }
    function getBitLength(e143) {
        return 32 - Pr(e143);
    }
    function getLeadingBit(e144) {
        return 1 << getBitLength(e144) - 1;
    }
    var Pr = Math.clz32 ? Math.clz32 : clz32Fallback;
    var Rr = Math.log;
    var Ir = Math.LN2;
    function clz32Fallback(e145) {
        var t96 = e145 >>> 0;
        return 0 === t96 ? 32 : 31 - (Rr(t96) / Ir | 0) | 0;
    }
    function is(e146, t97) {
        return e146 === t97 && (0 !== e146 || 1 / e146 === 1 / t97) || e146 !== e146 && t97 !== t97;
    }
    var Er = "function" === typeof Object.is ? Object.is : is;
    var Fr = null;
    var Dr = null;
    var Nr = null;
    var Ar = null;
    var Mr = false;
    var Br = false;
    var Lr = 0;
    var Hr = null;
    var Or = 0;
    var Ur = 25;
    var _r = false;
    var Wr;
    function resolveCurrentlyRenderingComponent() {
        if (null === Fr) throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
        _r && error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
        return Fr;
    }
    function areHookInputsEqual(e147, t98) {
        if (null === t98) {
            error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", Wr);
            return false;
        }
        e147.length !== t98.length && error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", Wr, "[" + e147.join(", ") + "]", "[" + t98.join(", ") + "]");
        for(var r67 = 0; r67 < t98.length && r67 < e147.length; r67++)if (!Er(e147[r67], t98[r67])) return false;
        return true;
    }
    function createHook() {
        if (Or > 0) throw new Error("Rendered more hooks than during the previous render");
        return {
            memoizedState: null,
            queue: null,
            next: null
        };
    }
    function createWorkInProgressHook() {
        if (null === Ar) if (null === Nr) {
            Mr = false;
            Nr = Ar = createHook();
        } else {
            Mr = true;
            Ar = Nr;
        }
        else if (null === Ar.next) {
            Mr = false;
            Ar = Ar.next = createHook();
        } else {
            Mr = true;
            Ar = Ar.next;
        }
        return Ar;
    }
    function prepareToUseHooks(e148, t99) {
        Fr = t99;
        Dr = e148;
        _r = false;
        Lr = 0;
    }
    function finishHooks(e149, t100, r68, n53) {
        while(Br){
            Br = false;
            Lr = 0;
            Or += 1;
            Ar = null;
            r68 = e149(t100, n53);
        }
        resetHooksState();
        return r68;
    }
    function checkDidRenderIdHook() {
        var e150 = 0 !== Lr;
        return e150;
    }
    function resetHooksState() {
        _r = false;
        Fr = null;
        Dr = null;
        Br = false;
        Nr = null;
        Or = 0;
        Hr = null;
        Ar = null;
    }
    function readContext$1(e151) {
        _r && error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
        return readContext(e151);
    }
    function useContext(e152) {
        Wr = "useContext";
        resolveCurrentlyRenderingComponent();
        return readContext(e152);
    }
    function basicStateReducer(e153, t101) {
        return "function" === typeof t101 ? t101(e153) : t101;
    }
    function useState(e154) {
        Wr = "useState";
        return useReducer(basicStateReducer, e154);
    }
    function useReducer(e155, t102, r69) {
        e155 !== basicStateReducer && (Wr = "useReducer");
        Fr = resolveCurrentlyRenderingComponent();
        Ar = createWorkInProgressHook();
        if (Mr) {
            var n54 = Ar.queue;
            var o40 = n54.dispatch;
            if (null !== Hr) {
                var a32 = Hr.get(n54);
                if (void 0 !== a32) {
                    Hr.delete(n54);
                    var i26 = Ar.memoizedState;
                    var s23 = a32;
                    do {
                        var l12 = s23.action;
                        _r = true;
                        i26 = e155(i26, l12);
                        _r = false;
                        s23 = s23.next;
                    }while (null !== s23)
                    Ar.memoizedState = i26;
                    return [
                        i26,
                        o40
                    ];
                }
            }
            return [
                Ar.memoizedState,
                o40
            ];
        }
        _r = true;
        var u14;
        u14 = e155 === basicStateReducer ? "function" === typeof t102 ? t102() : t102 : void 0 !== r69 ? r69(t102) : t102;
        _r = false;
        Ar.memoizedState = u14;
        var c12 = Ar.queue = {
            last: null,
            dispatch: null
        };
        var p9 = c12.dispatch = dispatchAction.bind(null, Fr, c12);
        return [
            Ar.memoizedState,
            p9
        ];
    }
    function useMemo(e156, t103) {
        Fr = resolveCurrentlyRenderingComponent();
        Ar = createWorkInProgressHook();
        var r70 = void 0 === t103 ? null : t103;
        if (null !== Ar) {
            var n55 = Ar.memoizedState;
            if (null !== n55 && null !== r70) {
                var o41 = n55[1];
                if (areHookInputsEqual(r70, o41)) return n55[0];
            }
        }
        _r = true;
        var a33 = e156();
        _r = false;
        Ar.memoizedState = [
            a33,
            r70
        ];
        return a33;
    }
    function useRef(e157) {
        Fr = resolveCurrentlyRenderingComponent();
        Ar = createWorkInProgressHook();
        var t104 = Ar.memoizedState;
        if (null === t104) {
            var r71 = {
                current: e157
            };
            Object.seal(r71);
            Ar.memoizedState = r71;
            return r71;
        }
        return t104;
    }
    function useLayoutEffect(e, t) {
        Wr = "useLayoutEffect";
        error("useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://reactjs.org/link/uselayouteffect-ssr for common fixes.");
    }
    function dispatchAction(e158, t105, r72) {
        if (Or >= Ur) throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        if (e158 === Fr) {
            Br = true;
            var n56 = {
                action: r72,
                next: null
            };
            null === Hr && (Hr = new Map);
            var o42 = Hr.get(t105);
            if (void 0 === o42) Hr.set(t105, n56);
            else {
                var a34 = o42;
                while(null !== a34.next)a34 = a34.next;
                a34.next = n56;
            }
        }
    }
    function useCallback(e159, t106) {
        return useMemo(function() {
            return e159;
        }, t106);
    }
    function useMutableSource(e160, t107, r) {
        resolveCurrentlyRenderingComponent();
        return t107(e160._source);
    }
    function useSyncExternalStore(e, t, r73) {
        if (void 0 === r73) throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        return r73();
    }
    function useDeferredValue(e161) {
        resolveCurrentlyRenderingComponent();
        return e161;
    }
    function unsupportedStartTransition() {
        throw new Error("startTransition cannot be called during server rendering.");
    }
    function useTransition() {
        resolveCurrentlyRenderingComponent();
        return [
            false,
            unsupportedStartTransition
        ];
    }
    function useId() {
        var e162 = Dr;
        var t108 = getTreeId(e162.treeContext);
        var r74 = jr;
        if (null === r74) throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
        var n57 = Lr++;
        return makeId(r74, t108, n57);
    }
    function noop() {}
    var zr = {
        readContext: readContext$1,
        useContext: useContext,
        useMemo: useMemo,
        useReducer: useReducer,
        useRef: useRef,
        useState: useState,
        useInsertionEffect: noop,
        useLayoutEffect: useLayoutEffect,
        useCallback: useCallback,
        useImperativeHandle: noop,
        useEffect: noop,
        useDebugValue: noop,
        useDeferredValue: useDeferredValue,
        useTransition: useTransition,
        useId: useId,
        useMutableSource: useMutableSource,
        useSyncExternalStore: useSyncExternalStore
    };
    var jr = null;
    function setCurrentResponseState(e163) {
        jr = e163;
    }
    function getStackByComponentStackNode(e164) {
        try {
            var t109 = "";
            var r75 = e164;
            do {
                switch(r75.tag){
                    case 0:
                        t109 += describeBuiltInComponentFrame(r75.type, null, null);
                        break;
                    case 1:
                        t109 += describeFunctionComponentFrame(r75.type, null, null);
                        break;
                    case 2:
                        t109 += describeClassComponentFrame(r75.type, null, null);
                        break;
                }
                r75 = r75.parent;
            }while (r75)
            return t109;
        } catch (e165) {
            return "\nError generating stack: " + e165.message + "\n" + e165.stack;
        }
    }
    var Vr = i11.ReactCurrentDispatcher;
    var $r = i11.ReactDebugCurrentFrame;
    var qr = 0;
    var Yr = 1;
    var Xr = 2;
    var Gr = 3;
    var Zr = 4;
    var Qr = 0;
    var Kr = 1;
    var Jr = 2;
    var en = 12800;
    function defaultErrorHandler(e166) {
        console.error(e166);
    }
    function noop$1() {}
    function createRequest(e167, t110, r76, n58, o43, a35, i27) {
        var s24 = [];
        var l13 = new Set;
        var u15 = {
            destination: null,
            responseState: t110,
            progressiveChunkSize: void 0 === n58 ? en : n58,
            status: Qr,
            fatalError: null,
            nextSegmentId: 0,
            allPendingTasks: 0,
            pendingRootTasks: 0,
            completedRootSegment: null,
            abortableTasks: l13,
            pingedTasks: s24,
            clientRenderedBoundaries: [],
            completedBoundaries: [],
            partialBoundaries: [],
            onError: void 0 === o43 ? defaultErrorHandler : o43,
            onCompleteAll: void 0 === a35 ? noop$1 : a35,
            onCompleteShell: void 0 === i27 ? noop$1 : i27
        };
        var c13 = createPendingSegment(u15, 0, null, r76);
        c13.parentFlushed = true;
        var p10 = createTask(u15, e167, null, c13, l13, lr, cr, Tr);
        s24.push(p10);
        return u15;
    }
    function pingTask(e168, t111) {
        var r77 = e168.pingedTasks;
        r77.push(t111);
        1 === r77.length && scheduleWork(function() {
            return performWork(e168);
        });
    }
    function createSuspenseBoundary(e, t112) {
        return {
            id: fe,
            rootSegmentID: -1,
            parentFlushed: false,
            pendingTasks: 0,
            forceClientRender: false,
            completedSegments: [],
            byteSize: 0,
            fallbackAbortableTasks: t112
        };
    }
    function createTask(e169, t113, r78, n59, o44, a36, i28, s25) {
        e169.allPendingTasks++;
        null === r78 ? e169.pendingRootTasks++ : r78.pendingTasks++;
        var l14 = {
            node: t113,
            ping: function() {
                return pingTask(e169, l14);
            },
            blockedBoundary: r78,
            blockedSegment: n59,
            abortSet: o44,
            legacyContext: a36,
            context: i28,
            treeContext: s25
        };
        l14.componentStack = null;
        o44.add(l14);
        return l14;
    }
    function createPendingSegment(e, t114, r79, n60) {
        return {
            status: qr,
            id: -1,
            index: t114,
            parentFlushed: false,
            chunks: [],
            children: [],
            formatContext: n60,
            boundary: r79
        };
    }
    var tn = null;
    function getCurrentStackInDEV() {
        return null === tn || null === tn.componentStack ? "" : getStackByComponentStackNode(tn.componentStack);
    }
    function pushBuiltInComponentStackInDEV(e170, t115) {
        e170.componentStack = {
            tag: 0,
            parent: e170.componentStack,
            type: t115
        };
    }
    function pushFunctionComponentStackInDEV(e171, t116) {
        e171.componentStack = {
            tag: 1,
            parent: e171.componentStack,
            type: t116
        };
    }
    function pushClassComponentStackInDEV(e172, t117) {
        e172.componentStack = {
            tag: 2,
            parent: e172.componentStack,
            type: t117
        };
    }
    function popComponentStackInDEV(e173) {
        null === e173.componentStack ? error("Unexpectedly popped too many stack frames. This is a bug in React.") : e173.componentStack = e173.componentStack.parent;
    }
    function reportError(e174, t118) {
        var r80 = e174.onError;
        r80(t118);
    }
    function fatalError(e175, t119) {
        if (null !== e175.destination) {
            e175.status = Jr;
            closeWithError(e175.destination, t119);
        } else {
            e175.status = Kr;
            e175.fatalError = t119;
        }
    }
    function renderSuspenseBoundary(e176, t120, r81) {
        pushBuiltInComponentStackInDEV(t120, "Suspense");
        var n61 = t120.blockedBoundary;
        var o45 = t120.blockedSegment;
        var a37 = r81.fallback;
        var i29 = r81.children;
        var s26 = new Set;
        var l15 = createSuspenseBoundary(e176, s26);
        var u16 = o45.chunks.length;
        var c14 = createPendingSegment(e176, u16, l15, o45.formatContext);
        o45.children.push(c14);
        var p12 = createPendingSegment(e176, 0, null, o45.formatContext);
        p12.parentFlushed = true;
        t120.blockedBoundary = l15;
        t120.blockedSegment = p12;
        try {
            renderNode(e176, t120, i29);
            p12.status = Yr;
            l15.completedSegments.push(p12);
            if (0 === l15.pendingTasks) {
                popComponentStackInDEV(t120);
                return;
            }
        } catch (t121) {
            p12.status = Zr;
            reportError(e176, t121);
            l15.forceClientRender = true;
        } finally{
            t120.blockedBoundary = n61;
            t120.blockedSegment = o45;
        }
        var d6 = createTask(e176, a37, n61, c14, s26, t120.legacyContext, t120.context, t120.treeContext);
        d6.componentStack = t120.componentStack;
        e176.pingedTasks.push(d6);
        popComponentStackInDEV(t120);
    }
    function renderHostElement(e177, t122, r82, n62) {
        pushBuiltInComponentStackInDEV(t122, r82);
        var o46 = t122.blockedSegment;
        var a38 = pushStartInstance(o46.chunks, r82, n62, e177.responseState, o46.formatContext);
        var i30 = o46.formatContext;
        o46.formatContext = getChildFormatContext(i30, r82, n62);
        renderNode(e177, t122, a38);
        o46.formatContext = i30;
        pushEndInstance(o46.chunks, r82);
        popComponentStackInDEV(t122);
    }
    function shouldConstruct$1(e178) {
        return e178.prototype && e178.prototype.isReactComponent;
    }
    function renderWithHooks(e, t123, r83, n63, o47) {
        var a39 = {};
        prepareToUseHooks(t123, a39);
        var i31 = r83(n63, o47);
        return finishHooks(r83, n63, i31, o47);
    }
    function finishClassComponent(e179, t124, r84, n64, o48) {
        var a40 = r84.render();
        if (r84.props !== o48) {
            sn || error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", getComponentNameFromType(n64) || "a component");
            sn = true;
        }
        var i32 = n64.childContextTypes;
        if (null === i32 || void 0 === i32) renderNodeDestructive(e179, t124, a40);
        else {
            var s27 = t124.legacyContext;
            var l16 = processChildContext(r84, n64, s27, i32);
            t124.legacyContext = l16;
            renderNodeDestructive(e179, t124, a40);
            t124.legacyContext = s27;
        }
    }
    function renderClassComponent(e180, t125, r85, n65) {
        pushClassComponentStackInDEV(t125, r85);
        var o49 = getMaskedContext(r85, t125.legacyContext);
        var a41 = constructClassInstance(r85, n65, o49);
        mountClassInstance(a41, r85, n65, o49);
        finishClassComponent(e180, t125, a41, r85, n65);
        popComponentStackInDEV(t125);
    }
    var rn = {};
    var nn = {};
    var on = {};
    var an = {};
    var sn = false;
    var ln = false;
    var un = false;
    var cn = false;
    function renderIndeterminateComponent(e181, t126, r86, n66) {
        var o50;
        o50 = getMaskedContext(r86, t126.legacyContext);
        pushFunctionComponentStackInDEV(t126, r86);
        if (r86.prototype && "function" === typeof r86.prototype.render) {
            var a42 = getComponentNameFromType(r86) || "Unknown";
            if (!rn[a42]) {
                error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", a42, a42);
                rn[a42] = true;
            }
        }
        var i33 = renderWithHooks(e181, t126, r86, n66, o50);
        var s28 = checkDidRenderIdHook();
        if ("object" === typeof i33 && null !== i33 && "function" === typeof i33.render && void 0 === i33.$$typeof) {
            var l17 = getComponentNameFromType(r86) || "Unknown";
            if (!nn[l17]) {
                error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", l17, l17, l17);
                nn[l17] = true;
            }
        }
        if ("object" === typeof i33 && null !== i33 && "function" === typeof i33.render && void 0 === i33.$$typeof) {
            var u17 = getComponentNameFromType(r86) || "Unknown";
            if (!nn[u17]) {
                error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", u17, u17, u17);
                nn[u17] = true;
            }
            mountClassInstance(i33, r86, n66, o50);
            finishClassComponent(e181, t126, i33, r86, n66);
        } else {
            validateFunctionComponentInDev(r86);
            if (s28) {
                var c15 = t126.treeContext;
                var p13 = 1;
                var d7 = 0;
                t126.treeContext = pushTreeContext(c15, p13, d7);
                try {
                    renderNodeDestructive(e181, t126, i33);
                } finally{
                    t126.treeContext = c15;
                }
            } else renderNodeDestructive(e181, t126, i33);
        }
        popComponentStackInDEV(t126);
    }
    function validateFunctionComponentInDev(e182) {
        e182 && e182.childContextTypes && error("%s(...): childContextTypes cannot be defined on a function component.", e182.displayName || e182.name || "Component");
        if ("function" === typeof e182.getDerivedStateFromProps) {
            var t127 = getComponentNameFromType(e182) || "Unknown";
            if (!an[t127]) {
                error("%s: Function components do not support getDerivedStateFromProps.", t127);
                an[t127] = true;
            }
        }
        if ("object" === typeof e182.contextType && null !== e182.contextType) {
            var r87 = getComponentNameFromType(e182) || "Unknown";
            if (!on[r87]) {
                error("%s: Function components do not support contextType.", r87);
                on[r87] = true;
            }
        }
    }
    function resolveDefaultProps(t128, r88) {
        if (t128 && t128.defaultProps) {
            var n67 = e14({}, r88);
            var o51 = t128.defaultProps;
            for(var a43 in o51)void 0 === n67[a43] && (n67[a43] = o51[a43]);
            return n67;
        }
        return r88;
    }
    function renderForwardRef(e183, t129, r89, n68, o52) {
        pushFunctionComponentStackInDEV(t129, r89.render);
        var a44 = renderWithHooks(e183, t129, r89.render, n68, o52);
        var i34 = checkDidRenderIdHook();
        if (i34) {
            var s29 = t129.treeContext;
            var l18 = 1;
            var u18 = 0;
            t129.treeContext = pushTreeContext(s29, l18, u18);
            try {
                renderNodeDestructive(e183, t129, a44);
            } finally{
                t129.treeContext = s29;
            }
        } else renderNodeDestructive(e183, t129, a44);
        popComponentStackInDEV(t129);
    }
    function renderMemo(e184, t130, r90, n69, o53) {
        var a45 = r90.type;
        var i35 = resolveDefaultProps(a45, n69);
        renderElement(e184, t130, a45, i35, o53);
    }
    function renderContextConsumer(e185, t131, r91, n70) {
        if (void 0 === r91._context) {
            if (r91 !== r91.Consumer && !cn) {
                cn = true;
                error("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
            }
        } else r91 = r91._context;
        var o54 = n70.children;
        "function" !== typeof o54 && error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it.");
        var a46 = readContext(r91);
        var i36 = o54(a46);
        renderNodeDestructive(e185, t131, i36);
    }
    function renderContextProvider(e186, t132, r92, n71) {
        var o55 = r92._context;
        var a47 = n71.value;
        var i37 = n71.children;
        var s30;
        s30 = t132.context;
        t132.context = pushProvider(o55, a47);
        renderNodeDestructive(e186, t132, i37);
        t132.context = popProvider(o55);
        s30 !== t132.context && error("Popping the context provider did not return back to the original snapshot. This is a bug in React.");
    }
    function renderLazyComponent(e187, t133, r93, n72, o56) {
        pushBuiltInComponentStackInDEV(t133, "Lazy");
        var a48 = r93._payload;
        var i38 = r93._init;
        var s31 = i38(a48);
        var l19 = resolveDefaultProps(s31, n72);
        renderElement(e187, t133, s31, l19, o56);
        popComponentStackInDEV(t133);
    }
    function renderElement(e188, t134, r94, n73, o57) {
        if ("function" !== typeof r94) {
            if ("string" !== typeof r94) {
                switch(r94){
                    case Wt:
                    case _t:
                    case Ft:
                    case Dt:
                    case Et:
                        renderNodeDestructive(e188, t134, n73.children);
                        return;
                    case Lt:
                        pushBuiltInComponentStackInDEV(t134, "SuspenseList");
                        renderNodeDestructive(e188, t134, n73.children);
                        popComponentStackInDEV(t134);
                        return;
                    case Ut:
                        throw new Error("ReactDOMServer does not yet support scope components.");
                    case Bt:
                        renderSuspenseBoundary(e188, t134, n73);
                        return;
                }
                if ("object" === typeof r94 && null !== r94) switch(r94.$$typeof){
                    case Mt:
                        renderForwardRef(e188, t134, r94, n73, o57);
                        return;
                    case Ht:
                        renderMemo(e188, t134, r94, n73, o57);
                        return;
                    case Nt:
                        renderContextProvider(e188, t134, r94, n73);
                        return;
                    case At:
                        renderContextConsumer(e188, t134, r94, n73);
                        return;
                    case Ot:
                        renderLazyComponent(e188, t134, r94, n73);
                        return;
                }
                var a49 = "";
                (void 0 === r94 || "object" === typeof r94 && null !== r94 && 0 === Object.keys(r94).length) && (a49 += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (null == r94 ? r94 : typeof r94) + "." + a49);
            }
            renderHostElement(e188, t134, r94, n73);
        } else {
            if (shouldConstruct$1(r94)) {
                renderClassComponent(e188, t134, r94, n73);
                return;
            }
            renderIndeterminateComponent(e188, t134, r94, n73);
        }
    }
    function validateIterable(e189, t135) {
        if ("function" === typeof Symbol && "Generator" === e189[Symbol.toStringTag]) {
            ln || error("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers.");
            ln = true;
        }
        if (e189.entries === t135) {
            un || error("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
            un = true;
        }
    }
    function renderNodeDestructive(e190, t136, r95) {
        t136.node = r95;
        if ("object" === typeof r95 && null !== r95) {
            switch(r95.$$typeof){
                case Rt:
                    var n74 = r95;
                    var o58 = n74.type;
                    var a50 = n74.props;
                    var i39 = n74.ref;
                    renderElement(e190, t136, o58, a50, i39);
                    return;
                case It:
                    throw new Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
                case Ot:
                    var s32 = r95;
                    var l20 = s32._payload;
                    var u19 = s32._init;
                    var c16 = u19(l20);
                    renderNodeDestructive(e190, t136, c16);
                    return;
            }
            if (isArray(r95)) {
                renderChildrenArray(e190, t136, r95);
                return;
            }
            var p14 = getIteratorFn(r95);
            if (p14) {
                validateIterable(r95, p14());
                var d8 = p14.call(r95);
                if (d8) {
                    var f7 = d8.next();
                    if (!f7.done) {
                        var h4 = [];
                        do {
                            h4.push(f7.value);
                            f7 = d8.next();
                        }while (!f7.done)
                        renderChildrenArray(e190, t136, h4);
                        return;
                    }
                    return;
                }
            }
            var m3 = Object.prototype.toString.call(r95);
            throw new Error("Objects are not valid as a React child (found: " + ("[object Object]" === m3 ? "object with keys {" + Object.keys(r95).join(", ") + "}" : m3) + "). If you meant to render a collection of children, use an array instead.");
        }
        "string" !== typeof r95 ? "number" !== typeof r95 ? "function" === typeof r95 && error("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.") : pushTextInstance(t136.blockedSegment.chunks, "" + r95, e190.responseState) : pushTextInstance(t136.blockedSegment.chunks, r95, e190.responseState);
    }
    function renderChildrenArray(e191, t137, r96) {
        var n75 = r96.length;
        for(var o59 = 0; o59 < n75; o59++){
            var a51 = t137.treeContext;
            t137.treeContext = pushTreeContext(a51, n75, o59);
            try {
                renderNode(e191, t137, r96[o59]);
            } finally{
                t137.treeContext = a51;
            }
        }
    }
    function spawnNewSuspendedTask(e192, t138, r97) {
        var n76 = t138.blockedSegment;
        var o60 = n76.chunks.length;
        var a52 = createPendingSegment(e192, o60, null, n76.formatContext);
        n76.children.push(a52);
        var i40 = createTask(e192, t138.node, t138.blockedBoundary, a52, t138.abortSet, t138.legacyContext, t138.context, t138.treeContext);
        null !== t138.componentStack && (i40.componentStack = t138.componentStack.parent);
        var s33 = i40.ping;
        r97.then(s33, s33);
    }
    function renderNode(e193, t139, r98) {
        var n77 = t139.blockedSegment.formatContext;
        var o61 = t139.legacyContext;
        var a53 = t139.context;
        var i41 = null;
        i41 = t139.componentStack;
        try {
            return renderNodeDestructive(e193, t139, r98);
        } catch (r99) {
            resetHooksState();
            if ("object" === typeof r99 && null !== r99 && "function" === typeof r99.then) {
                spawnNewSuspendedTask(e193, t139, r99);
                t139.blockedSegment.formatContext = n77;
                t139.legacyContext = o61;
                t139.context = a53;
                switchContext(a53);
                t139.componentStack = i41;
                return;
            }
            t139.blockedSegment.formatContext = n77;
            t139.legacyContext = o61;
            t139.context = a53;
            switchContext(a53);
            t139.componentStack = i41;
            throw r99;
        }
    }
    function erroredTask(e194, t140, r, n78) {
        reportError(e194, n78);
        if (null === t140) fatalError(e194, n78);
        else {
            t140.pendingTasks--;
            if (!t140.forceClientRender) {
                t140.forceClientRender = true;
                t140.parentFlushed && e194.clientRenderedBoundaries.push(t140);
            }
        }
        e194.allPendingTasks--;
        if (0 === e194.allPendingTasks) {
            var o62 = e194.onCompleteAll;
            o62();
        }
    }
    function abortTaskSoft(e195) {
        var t141 = this;
        var r100 = e195.blockedBoundary;
        var n79 = e195.blockedSegment;
        n79.status = Gr;
        finishedTask(t141, r100, n79);
    }
    function abortTask(e196) {
        var t142 = this;
        var r101 = e196.blockedBoundary;
        var n80 = e196.blockedSegment;
        n80.status = Gr;
        if (null === r101) {
            t142.allPendingTasks--;
            if (t142.status !== Jr) {
                t142.status = Jr;
                null !== t142.destination && close(t142.destination);
            }
        } else {
            r101.pendingTasks--;
            if (!r101.forceClientRender) {
                r101.forceClientRender = true;
                r101.parentFlushed && t142.clientRenderedBoundaries.push(r101);
            }
            r101.fallbackAbortableTasks.forEach(abortTask, t142);
            r101.fallbackAbortableTasks.clear();
            t142.allPendingTasks--;
            if (0 === t142.allPendingTasks) {
                var o63 = t142.onCompleteAll;
                o63();
            }
        }
    }
    function finishedTask(e197, t143, r102) {
        if (null === t143) {
            if (r102.parentFlushed) {
                if (null !== e197.completedRootSegment) throw new Error("There can only be one root segment. This is a bug in React.");
                e197.completedRootSegment = r102;
            }
            e197.pendingRootTasks--;
            if (0 === e197.pendingRootTasks) {
                var n81 = e197.onCompleteShell;
                n81();
            }
        } else {
            t143.pendingTasks--;
            if (t143.forceClientRender) ;
            else if (0 === t143.pendingTasks) {
                r102.parentFlushed && r102.status === Yr && t143.completedSegments.push(r102);
                t143.parentFlushed && e197.completedBoundaries.push(t143);
                t143.fallbackAbortableTasks.forEach(abortTaskSoft, e197);
                t143.fallbackAbortableTasks.clear();
            } else if (r102.parentFlushed && r102.status === Yr) {
                var o64 = t143.completedSegments;
                o64.push(r102);
                1 === o64.length && t143.parentFlushed && e197.partialBoundaries.push(t143);
            }
        }
        e197.allPendingTasks--;
        if (0 === e197.allPendingTasks) {
            var a54 = e197.onCompleteAll;
            a54();
        }
    }
    function retryTask(e198, t144) {
        var r103 = t144.blockedSegment;
        if (r103.status === qr) {
            switchContext(t144.context);
            var n82 = null;
            n82 = tn;
            tn = t144;
            try {
                renderNodeDestructive(e198, t144, t144.node);
                t144.abortSet.delete(t144);
                r103.status = Yr;
                finishedTask(e198, t144.blockedBoundary, r103);
            } catch (n83) {
                resetHooksState();
                if ("object" === typeof n83 && null !== n83 && "function" === typeof n83.then) {
                    var o65 = t144.ping;
                    n83.then(o65, o65);
                } else {
                    t144.abortSet.delete(t144);
                    r103.status = Zr;
                    erroredTask(e198, t144.blockedBoundary, r103, n83);
                }
            } finally{
                tn = n82;
            }
        }
    }
    function performWork(e199) {
        if (e199.status !== Jr) {
            var t146 = getActiveContext();
            var r104 = Vr.current;
            Vr.current = zr;
            var n84;
            n84 = $r.getCurrentStack;
            $r.getCurrentStack = getCurrentStackInDEV;
            var o66 = jr;
            setCurrentResponseState(e199.responseState);
            try {
                var a55 = e199.pingedTasks;
                var i42;
                for(i42 = 0; i42 < a55.length; i42++){
                    var s34 = a55[i42];
                    retryTask(e199, s34);
                }
                a55.splice(0, i42);
                null !== e199.destination && flushCompletedQueues(e199, e199.destination);
            } catch (t145) {
                reportError(e199, t145);
                fatalError(e199, t145);
            } finally{
                setCurrentResponseState(o66);
                Vr.current = r104;
                $r.getCurrentStack = n84;
                r104 === zr && switchContext(t146);
            }
        }
    }
    function flushSubtree(e200, t147, r105) {
        r105.parentFlushed = true;
        switch(r105.status){
            case qr:
                var n85 = r105.id = e200.nextSegmentId++;
                return writePlaceholder(t147, e200.responseState, n85);
            case Yr:
                r105.status = Xr;
                var o67 = true;
                var a56 = r105.chunks;
                var i43 = 0;
                var s35 = r105.children;
                for(var l21 = 0; l21 < s35.length; l21++){
                    var u20 = s35[l21];
                    for(; i43 < u20.index; i43++)writeChunk(t147, a56[i43]);
                    o67 = flushSegment(e200, t147, u20);
                }
                for(; i43 < a56.length; i43++)o67 = writeChunk(t147, a56[i43]);
                return o67;
            default:
                throw new Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
        }
    }
    function flushSegment(e201, t148, r106) {
        var n86 = r106.boundary;
        if (null === n86) return flushSubtree(e201, t148, r106);
        n86.parentFlushed = true;
        if (n86.forceClientRender) {
            writeStartClientRenderedSuspenseBoundary(t148, e201.responseState);
            flushSubtree(e201, t148, r106);
            return writeEndClientRenderedSuspenseBoundary(t148, e201.responseState);
        }
        if (n86.pendingTasks > 0) {
            n86.rootSegmentID = e201.nextSegmentId++;
            n86.completedSegments.length > 0 && e201.partialBoundaries.push(n86);
            var o68 = n86.id = assignSuspenseBoundaryID(e201.responseState);
            writeStartPendingSuspenseBoundary(t148, e201.responseState, o68);
            flushSubtree(e201, t148, r106);
            return writeEndPendingSuspenseBoundary(t148, e201.responseState);
        }
        if (n86.byteSize > e201.progressiveChunkSize) {
            n86.rootSegmentID = e201.nextSegmentId++;
            e201.completedBoundaries.push(n86);
            writeStartPendingSuspenseBoundary(t148, e201.responseState, n86.id);
            flushSubtree(e201, t148, r106);
            return writeEndPendingSuspenseBoundary(t148, e201.responseState);
        }
        writeStartCompletedSuspenseBoundary(t148, e201.responseState);
        var a57 = n86.completedSegments;
        if (1 !== a57.length) throw new Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
        var i44 = a57[0];
        flushSegment(e201, t148, i44);
        return writeEndCompletedSuspenseBoundary(t148, e201.responseState);
    }
    function flushClientRenderedBoundary(e202, t149, r107) {
        return writeClientRenderBoundaryInstruction(t149, e202.responseState, r107.id);
    }
    function flushSegmentContainer(e203, t150, r108) {
        writeStartSegment(t150, e203.responseState, r108.formatContext, r108.id);
        flushSegment(e203, t150, r108);
        return writeEndSegment(t150, r108.formatContext);
    }
    function flushCompletedBoundary(e204, t151, r109) {
        var n87 = r109.completedSegments;
        var o69 = 0;
        for(; o69 < n87.length; o69++){
            var a58 = n87[o69];
            flushPartiallyCompletedSegment(e204, t151, r109, a58);
        }
        n87.length = 0;
        return writeCompletedBoundaryInstruction(t151, e204.responseState, r109.id, r109.rootSegmentID);
    }
    function flushPartialBoundary(e205, t152, r110) {
        var n88 = r110.completedSegments;
        var o70 = 0;
        for(; o70 < n88.length; o70++){
            var a59 = n88[o70];
            if (!flushPartiallyCompletedSegment(e205, t152, r110, a59)) {
                o70++;
                n88.splice(0, o70);
                return false;
            }
        }
        n88.splice(0, o70);
        return true;
    }
    function flushPartiallyCompletedSegment(e206, t153, r111, n89) {
        if (n89.status === Xr) return true;
        var o71 = n89.id;
        if (-1 === o71) {
            var a60 = n89.id = r111.rootSegmentID;
            if (-1 === a60) throw new Error("A root segment ID must have been assigned by now. This is a bug in React.");
            return flushSegmentContainer(e206, t153, n89);
        }
        flushSegmentContainer(e206, t153, n89);
        return writeCompletedSegmentInstruction(t153, e206.responseState, o71);
    }
    function flushCompletedQueues(e207, t154) {
        try {
            var r112 = e207.completedRootSegment;
            if (null !== r112 && 0 === e207.pendingRootTasks) {
                flushSegment(e207, t154, r112);
                e207.completedRootSegment = null;
                writeCompletedRoot(t154, e207.responseState);
            }
            var n90 = e207.clientRenderedBoundaries;
            var o72;
            for(o72 = 0; o72 < n90.length; o72++){
                var a61 = n90[o72];
                if (!flushClientRenderedBoundary(e207, t154, a61)) {
                    e207.destination = null;
                    o72++;
                    n90.splice(0, o72);
                    return;
                }
            }
            n90.splice(0, o72);
            var i45 = e207.completedBoundaries;
            for(o72 = 0; o72 < i45.length; o72++){
                var s36 = i45[o72];
                if (!flushCompletedBoundary(e207, t154, s36)) {
                    e207.destination = null;
                    o72++;
                    i45.splice(0, o72);
                    return;
                }
            }
            i45.splice(0, o72);
            completeWriting(t154);
            beginWriting(t154);
            var l22 = e207.partialBoundaries;
            for(o72 = 0; o72 < l22.length; o72++){
                var u21 = l22[o72];
                if (!flushPartialBoundary(e207, t154, u21)) {
                    e207.destination = null;
                    o72++;
                    l22.splice(0, o72);
                    return;
                }
            }
            l22.splice(0, o72);
            var c17 = e207.completedBoundaries;
            for(o72 = 0; o72 < c17.length; o72++){
                var p15 = c17[o72];
                if (!flushCompletedBoundary(e207, t154, p15)) {
                    e207.destination = null;
                    o72++;
                    c17.splice(0, o72);
                    return;
                }
            }
            c17.splice(0, o72);
        } finally{
            if (0 === e207.allPendingTasks && 0 === e207.pingedTasks.length && 0 === e207.clientRenderedBoundaries.length && 0 === e207.completedBoundaries.length) {
                0 !== e207.abortableTasks.size && error("There was still abortable task at the root when we closed. This is a bug in React.");
                close(t154);
            }
        }
    }
    function startWork(e208) {
        scheduleWork(function() {
            return performWork(e208);
        });
    }
    function startFlowing(e209, t155) {
        if (e209.status !== Kr) {
            if (e209.status !== Jr) {
                e209.destination = t155;
                try {
                    flushCompletedQueues(e209, t155);
                } catch (t156) {
                    reportError(e209, t156);
                    fatalError(e209, t156);
                }
            }
        } else {
            e209.status = Jr;
            closeWithError(t155, e209.fatalError);
        }
    }
    function abort(e210) {
        try {
            var t157 = e210.abortableTasks;
            t157.forEach(abortTask, e210);
            t157.clear();
            null !== e210.destination && flushCompletedQueues(e210, e210.destination);
        } catch (t158) {
            reportError(e210, t158);
            fatalError(e210, t158);
        }
    }
    function renderToReadableStream(e211, t159) {
        var r113 = createRequest(e211, createResponseState(t159 ? t159.identifierPrefix : void 0, t159 ? t159.nonce : void 0, t159 ? t159.bootstrapScriptContent : void 0, t159 ? t159.bootstrapScripts : void 0, t159 ? t159.bootstrapModules : void 0), createRootFormatContext(t159 ? t159.namespaceURI : void 0), t159 ? t159.progressiveChunkSize : void 0, t159 ? t159.onError : void 0, t159 ? t159.onCompleteAll : void 0, t159 ? t159.onCompleteShell : void 0);
        if (t159 && t159.signal) {
            var n91 = t159.signal;
            var listener = function() {
                abort(r113);
                n91.removeEventListener("abort", listener);
            };
            n91.addEventListener("abort", listener);
        }
        var o73 = new ReadableStream({
            start: function(e) {
                startWork(r113);
            },
            pull: function(e212) {
                o73.locked && startFlowing(r113, e212);
            },
            cancel: function(e) {}
        });
        return o73;
    }
    o2.renderToReadableStream = renderToReadableStream;
    o2.version = a12;
})();
o2.renderToReadableStream, o2.version;
var n5 = "default" in mod ? mod.default : mod;
var o3 = "default" in mod1 ? mod1.default : mod1;
var a4 = {};
(function() {
    var e15 = n5;
    var t13 = o3;
    var r13 = "18.0.0-rc.0-fe905f152-20220107";
    var i12 = t13.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function warn(e22) {
        for(var t22 = arguments.length, r23 = new Array(t22 > 1 ? t22 - 1 : 0), n13 = 1; n13 < t22; n13++)r23[n13 - 1] = arguments[n13];
        printWarning("warn", e22, r23);
    }
    function error(e32) {
        for(var t32 = arguments.length, r32 = new Array(t32 > 1 ? t32 - 1 : 0), n22 = 1; n22 < t32; n22++)r32[n22 - 1] = arguments[n22];
        printWarning("error", e32, r32);
    }
    function printWarning(e42, t4, r42) {
        var n32 = i12.ReactDebugCurrentFrame;
        var o12 = n32.getStackAddendum();
        if ("" !== o12) {
            t4 += "%s";
            r42 = r42.concat([
                o12
            ]);
        }
        var a13 = r42.map(function(e5) {
            return String(e5);
        });
        a13.unshift("Warning: " + t4);
        Function.prototype.apply.call(console[e42], console, a13);
    }
    function scheduleWork(e6) {
        e6();
    }
    function beginWriting(e) {}
    var s110 = false;
    function writeChunk(e7, t5) {
        if (s110) {
            s110 = false;
            "<" !== t5[0] && e7.push("\x3c!-- --\x3e");
        }
        if ("\x3c!-- --\x3e" === t5) {
            s110 = true;
            return true;
        }
        return e7.push(t5);
    }
    function completeWriting(e) {}
    function close(e8) {
        e8.push(null);
    }
    function stringToChunk(e9) {
        return e9;
    }
    function stringToPrecomputedChunk(e10) {
        return e10;
    }
    function closeWithError(e11, t6) {
        e11.destroy(t6);
    }
    function typeName(e12) {
        var t7 = "function" === typeof Symbol && Symbol.toStringTag;
        var r5 = t7 && e12[Symbol.toStringTag] || e12.constructor.name || "Object";
        return r5;
    }
    function willCoercionThrow(e13) {
        try {
            testStringCoercion(e13);
            return false;
        } catch (e) {
            return true;
        }
    }
    function testStringCoercion(e14) {
        return "" + e14;
    }
    function checkAttributeStringCoercion(e15, t8) {
        if (willCoercionThrow(e15)) {
            error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t8, typeName(e15));
            return testStringCoercion(e15);
        }
    }
    function checkCSSPropertyStringCoercion(e16, t9) {
        if (willCoercionThrow(e16)) {
            error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t9, typeName(e16));
            return testStringCoercion(e16);
        }
    }
    function checkHtmlStringCoercion(e17) {
        if (willCoercionThrow(e17)) {
            error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", typeName(e17));
            return testStringCoercion(e17);
        }
    }
    var u110 = Object.prototype.hasOwnProperty;
    var l110 = 0;
    var c18 = 1;
    var p16 = 2;
    var d1 = 3;
    var f1 = 4;
    var h1 = 5;
    var m12 = 6;
    var v1 = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
    var g13 = v1 + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
    var y13 = new RegExp("^[" + v1 + "][" + g13 + "]*$");
    var k12 = {};
    var C12 = {};
    function isAttributeNameSafe(e18) {
        if (u110.call(C12, e18)) return true;
        if (u110.call(k12, e18)) return false;
        if (y13.test(e18)) {
            C12[e18] = true;
            return true;
        }
        k12[e18] = true;
        error("Invalid attribute name: `%s`", e18);
        return false;
    }
    function shouldRemoveAttributeWithWarning(e19, t10, r6, n42) {
        if (null !== r6 && r6.type === l110) return false;
        switch(typeof t10){
            case "function":
            case "symbol":
                return true;
            case "boolean":
                if (n42) return false;
                if (null !== r6) return !r6.acceptsBooleans;
                var o22 = e19.toLowerCase().slice(0, 5);
                return "data-" !== o22 && "aria-" !== o22;
            default:
                return false;
        }
    }
    function getPropertyInfo(e20) {
        return b3.hasOwnProperty(e20) ? b3[e20] : null;
    }
    function PropertyInfoRecord(e21, t11, r7, n51, o31, a22, i2) {
        this.acceptsBooleans = t11 === p16 || t11 === d1 || t11 === f1;
        this.attributeName = n51;
        this.attributeNamespace = o31;
        this.mustUseProperty = r7;
        this.propertyName = e21;
        this.type = t11;
        this.sanitizeURL = a22;
        this.removeEmptyString = i2;
    }
    var b3 = {};
    var S = [
        "children",
        "dangerouslySetInnerHTML",
        "defaultValue",
        "defaultChecked",
        "innerHTML",
        "suppressContentEditableWarning",
        "suppressHydrationWarning",
        "style"
    ];
    S.forEach(function(e22) {
        b3[e22] = new PropertyInfoRecord(e22, l110, false, e22, null, false, false);
    });
    [
        [
            "acceptCharset",
            "accept-charset"
        ],
        [
            "className",
            "class"
        ],
        [
            "htmlFor",
            "for"
        ],
        [
            "httpEquiv",
            "http-equiv"
        ]
    ].forEach(function(e23) {
        var t12 = e23[0], r8 = e23[1];
        b3[t12] = new PropertyInfoRecord(t12, c18, false, r8, null, false, false);
    });
    [
        "contentEditable",
        "draggable",
        "spellCheck",
        "value"
    ].forEach(function(e24) {
        b3[e24] = new PropertyInfoRecord(e24, p16, false, e24.toLowerCase(), null, false, false);
    });
    [
        "autoReverse",
        "externalResourcesRequired",
        "focusable",
        "preserveAlpha"
    ].forEach(function(e25) {
        b3[e25] = new PropertyInfoRecord(e25, p16, false, e25, null, false, false);
    });
    [
        "allowFullScreen",
        "async",
        "autoFocus",
        "autoPlay",
        "controls",
        "default",
        "defer",
        "disabled",
        "disablePictureInPicture",
        "disableRemotePlayback",
        "formNoValidate",
        "hidden",
        "loop",
        "noModule",
        "noValidate",
        "open",
        "playsInline",
        "readOnly",
        "required",
        "reversed",
        "scoped",
        "seamless",
        "itemScope"
    ].forEach(function(e26) {
        b3[e26] = new PropertyInfoRecord(e26, d1, false, e26.toLowerCase(), null, false, false);
    });
    [
        "checked",
        "multiple",
        "muted",
        "selected"
    ].forEach(function(e27) {
        b3[e27] = new PropertyInfoRecord(e27, d1, true, e27, null, false, false);
    });
    [
        "capture",
        "download"
    ].forEach(function(e28) {
        b3[e28] = new PropertyInfoRecord(e28, f1, false, e28, null, false, false);
    });
    [
        "cols",
        "rows",
        "size",
        "span"
    ].forEach(function(e29) {
        b3[e29] = new PropertyInfoRecord(e29, m12, false, e29, null, false, false);
    });
    [
        "rowSpan",
        "start"
    ].forEach(function(e30) {
        b3[e30] = new PropertyInfoRecord(e30, h1, false, e30.toLowerCase(), null, false, false);
    });
    var w4 = /[\-\:]([a-z])/g;
    var capitalize = function(e31) {
        return e31[1].toUpperCase();
    };
    [
        "accent-height",
        "alignment-baseline",
        "arabic-form",
        "baseline-shift",
        "cap-height",
        "clip-path",
        "clip-rule",
        "color-interpolation",
        "color-interpolation-filters",
        "color-profile",
        "color-rendering",
        "dominant-baseline",
        "enable-background",
        "fill-opacity",
        "fill-rule",
        "flood-color",
        "flood-opacity",
        "font-family",
        "font-size",
        "font-size-adjust",
        "font-stretch",
        "font-style",
        "font-variant",
        "font-weight",
        "glyph-name",
        "glyph-orientation-horizontal",
        "glyph-orientation-vertical",
        "horiz-adv-x",
        "horiz-origin-x",
        "image-rendering",
        "letter-spacing",
        "lighting-color",
        "marker-end",
        "marker-mid",
        "marker-start",
        "overline-position",
        "overline-thickness",
        "paint-order",
        "panose-1",
        "pointer-events",
        "rendering-intent",
        "shape-rendering",
        "stop-color",
        "stop-opacity",
        "strikethrough-position",
        "strikethrough-thickness",
        "stroke-dasharray",
        "stroke-dashoffset",
        "stroke-linecap",
        "stroke-linejoin",
        "stroke-miterlimit",
        "stroke-opacity",
        "stroke-width",
        "text-anchor",
        "text-decoration",
        "text-rendering",
        "underline-position",
        "underline-thickness",
        "unicode-bidi",
        "unicode-range",
        "units-per-em",
        "v-alphabetic",
        "v-hanging",
        "v-ideographic",
        "v-mathematical",
        "vector-effect",
        "vert-adv-y",
        "vert-origin-x",
        "vert-origin-y",
        "word-spacing",
        "writing-mode",
        "xmlns:xlink",
        "x-height"
    ].forEach(function(e32) {
        var t13 = e32.replace(w4, capitalize);
        b3[t13] = new PropertyInfoRecord(t13, c18, false, e32, null, false, false);
    });
    [
        "xlink:actuate",
        "xlink:arcrole",
        "xlink:role",
        "xlink:show",
        "xlink:title",
        "xlink:type"
    ].forEach(function(e33) {
        var t14 = e33.replace(w4, capitalize);
        b3[t14] = new PropertyInfoRecord(t14, c18, false, e33, "http://www.w3.org/1999/xlink", false, false);
    });
    [
        "xml:base",
        "xml:lang",
        "xml:space"
    ].forEach(function(e34) {
        var t15 = e34.replace(w4, capitalize);
        b3[t15] = new PropertyInfoRecord(t15, c18, false, e34, "http://www.w3.org/XML/1998/namespace", false, false);
    });
    [
        "tabIndex",
        "crossOrigin"
    ].forEach(function(e35) {
        b3[e35] = new PropertyInfoRecord(e35, c18, false, e35.toLowerCase(), null, false, false);
    });
    var x4 = "xlinkHref";
    b3[x4] = new PropertyInfoRecord("xlinkHref", c18, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
    [
        "src",
        "href",
        "action",
        "formAction"
    ].forEach(function(e36) {
        b3[e36] = new PropertyInfoRecord(e36, c18, false, e36.toLowerCase(), null, true, true);
    });
    var T = {
        animationIterationCount: true,
        aspectRatio: true,
        borderImageOutset: true,
        borderImageSlice: true,
        borderImageWidth: true,
        boxFlex: true,
        boxFlexGroup: true,
        boxOrdinalGroup: true,
        columnCount: true,
        columns: true,
        flex: true,
        flexGrow: true,
        flexPositive: true,
        flexShrink: true,
        flexNegative: true,
        flexOrder: true,
        gridArea: true,
        gridRow: true,
        gridRowEnd: true,
        gridRowSpan: true,
        gridRowStart: true,
        gridColumn: true,
        gridColumnEnd: true,
        gridColumnSpan: true,
        gridColumnStart: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        tabSize: true,
        widows: true,
        zIndex: true,
        zoom: true,
        fillOpacity: true,
        floodOpacity: true,
        stopOpacity: true,
        strokeDasharray: true,
        strokeDashoffset: true,
        strokeMiterlimit: true,
        strokeOpacity: true,
        strokeWidth: true
    };
    function prefixKey(e37, t16) {
        return e37 + t16.charAt(0).toUpperCase() + t16.substring(1);
    }
    var P2 = [
        "Webkit",
        "ms",
        "Moz",
        "O"
    ];
    Object.keys(T).forEach(function(e38) {
        P2.forEach(function(t17) {
            T[prefixKey(t17, e38)] = T[e38];
        });
    });
    var R3 = {
        button: true,
        checkbox: true,
        image: true,
        hidden: true,
        radio: true,
        reset: true,
        submit: true
    };
    function checkControlledValueProps(e, t18) {
        R3[t18.type] || t18.onChange || t18.onInput || t18.readOnly || t18.disabled || null == t18.value || error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.");
        t18.onChange || t18.readOnly || t18.disabled || null == t18.checked || error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function isCustomComponent(e39, t19) {
        if (-1 === e39.indexOf("-")) return "string" === typeof t19.is;
        switch(e39){
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph":
                return false;
            default:
                return true;
        }
    }
    var I = {
        "aria-current": 0,
        "aria-description": 0,
        "aria-details": 0,
        "aria-disabled": 0,
        "aria-hidden": 0,
        "aria-invalid": 0,
        "aria-keyshortcuts": 0,
        "aria-label": 0,
        "aria-roledescription": 0,
        "aria-autocomplete": 0,
        "aria-checked": 0,
        "aria-expanded": 0,
        "aria-haspopup": 0,
        "aria-level": 0,
        "aria-modal": 0,
        "aria-multiline": 0,
        "aria-multiselectable": 0,
        "aria-orientation": 0,
        "aria-placeholder": 0,
        "aria-pressed": 0,
        "aria-readonly": 0,
        "aria-required": 0,
        "aria-selected": 0,
        "aria-sort": 0,
        "aria-valuemax": 0,
        "aria-valuemin": 0,
        "aria-valuenow": 0,
        "aria-valuetext": 0,
        "aria-atomic": 0,
        "aria-busy": 0,
        "aria-live": 0,
        "aria-relevant": 0,
        "aria-dropeffect": 0,
        "aria-grabbed": 0,
        "aria-activedescendant": 0,
        "aria-colcount": 0,
        "aria-colindex": 0,
        "aria-colspan": 0,
        "aria-controls": 0,
        "aria-describedby": 0,
        "aria-errormessage": 0,
        "aria-flowto": 0,
        "aria-labelledby": 0,
        "aria-owns": 0,
        "aria-posinset": 0,
        "aria-rowcount": 0,
        "aria-rowindex": 0,
        "aria-rowspan": 0,
        "aria-setsize": 0
    };
    var E3 = {};
    var F = new RegExp("^(aria)-[" + g13 + "]*$");
    var D3 = new RegExp("^(aria)[A-Z][" + g13 + "]*$");
    function validateProperty(e, t20) {
        if (u110.call(E3, t20) && E3[t20]) return true;
        if (D3.test(t20)) {
            var r9 = "aria-" + t20.slice(4).toLowerCase();
            var n6 = I.hasOwnProperty(r9) ? r9 : null;
            if (null == n6) {
                error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t20);
                E3[t20] = true;
                return true;
            }
            if (t20 !== n6) {
                error("Invalid ARIA attribute `%s`. Did you mean `%s`?", t20, n6);
                E3[t20] = true;
                return true;
            }
        }
        if (F.test(t20)) {
            var o4 = t20.toLowerCase();
            var a32 = I.hasOwnProperty(o4) ? o4 : null;
            if (null == a32) {
                E3[t20] = true;
                return false;
            }
            if (t20 !== a32) {
                error("Unknown ARIA attribute `%s`. Did you mean `%s`?", t20, a32);
                E3[t20] = true;
                return true;
            }
        }
        return true;
    }
    function warnInvalidARIAProps(e40, t21) {
        var r10 = [];
        for(var n7 in t21){
            var o5 = validateProperty(e40, n7);
            o5 || r10.push(n7);
        }
        var a41 = r10.map(function(e41) {
            return "`" + e41 + "`";
        }).join(", ");
        1 === r10.length ? error("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", a41, e40) : r10.length > 1 && error("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", a41, e40);
    }
    function validateProperties(e42, t22) {
        isCustomComponent(e42, t22) || warnInvalidARIAProps(e42, t22);
    }
    var N2 = false;
    function validateProperties$1(e43, t23) {
        if (("input" === e43 || "textarea" === e43 || "select" === e43) && null != t23 && null === t23.value && !N2) {
            N2 = true;
            "select" === e43 && t23.multiple ? error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e43) : error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e43);
        }
    }
    var A2 = {
        accept: "accept",
        acceptcharset: "acceptCharset",
        "accept-charset": "acceptCharset",
        accesskey: "accessKey",
        action: "action",
        allowfullscreen: "allowFullScreen",
        alt: "alt",
        as: "as",
        async: "async",
        autocapitalize: "autoCapitalize",
        autocomplete: "autoComplete",
        autocorrect: "autoCorrect",
        autofocus: "autoFocus",
        autoplay: "autoPlay",
        autosave: "autoSave",
        capture: "capture",
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        challenge: "challenge",
        charset: "charSet",
        checked: "checked",
        children: "children",
        cite: "cite",
        class: "className",
        classid: "classID",
        classname: "className",
        cols: "cols",
        colspan: "colSpan",
        content: "content",
        contenteditable: "contentEditable",
        contextmenu: "contextMenu",
        controls: "controls",
        controlslist: "controlsList",
        coords: "coords",
        crossorigin: "crossOrigin",
        dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
        data: "data",
        datetime: "dateTime",
        default: "default",
        defaultchecked: "defaultChecked",
        defaultvalue: "defaultValue",
        defer: "defer",
        dir: "dir",
        disabled: "disabled",
        disablepictureinpicture: "disablePictureInPicture",
        disableremoteplayback: "disableRemotePlayback",
        download: "download",
        draggable: "draggable",
        enctype: "encType",
        enterkeyhint: "enterKeyHint",
        for: "htmlFor",
        form: "form",
        formmethod: "formMethod",
        formaction: "formAction",
        formenctype: "formEncType",
        formnovalidate: "formNoValidate",
        formtarget: "formTarget",
        frameborder: "frameBorder",
        headers: "headers",
        height: "height",
        hidden: "hidden",
        high: "high",
        href: "href",
        hreflang: "hrefLang",
        htmlfor: "htmlFor",
        httpequiv: "httpEquiv",
        "http-equiv": "httpEquiv",
        icon: "icon",
        id: "id",
        imagesizes: "imageSizes",
        imagesrcset: "imageSrcSet",
        innerhtml: "innerHTML",
        inputmode: "inputMode",
        integrity: "integrity",
        is: "is",
        itemid: "itemID",
        itemprop: "itemProp",
        itemref: "itemRef",
        itemscope: "itemScope",
        itemtype: "itemType",
        keyparams: "keyParams",
        keytype: "keyType",
        kind: "kind",
        label: "label",
        lang: "lang",
        list: "list",
        loop: "loop",
        low: "low",
        manifest: "manifest",
        marginwidth: "marginWidth",
        marginheight: "marginHeight",
        max: "max",
        maxlength: "maxLength",
        media: "media",
        mediagroup: "mediaGroup",
        method: "method",
        min: "min",
        minlength: "minLength",
        multiple: "multiple",
        muted: "muted",
        name: "name",
        nomodule: "noModule",
        nonce: "nonce",
        novalidate: "noValidate",
        open: "open",
        optimum: "optimum",
        pattern: "pattern",
        placeholder: "placeholder",
        playsinline: "playsInline",
        poster: "poster",
        preload: "preload",
        profile: "profile",
        radiogroup: "radioGroup",
        readonly: "readOnly",
        referrerpolicy: "referrerPolicy",
        rel: "rel",
        required: "required",
        reversed: "reversed",
        role: "role",
        rows: "rows",
        rowspan: "rowSpan",
        sandbox: "sandbox",
        scope: "scope",
        scoped: "scoped",
        scrolling: "scrolling",
        seamless: "seamless",
        selected: "selected",
        shape: "shape",
        size: "size",
        sizes: "sizes",
        span: "span",
        spellcheck: "spellCheck",
        src: "src",
        srcdoc: "srcDoc",
        srclang: "srcLang",
        srcset: "srcSet",
        start: "start",
        step: "step",
        style: "style",
        summary: "summary",
        tabindex: "tabIndex",
        target: "target",
        title: "title",
        type: "type",
        usemap: "useMap",
        value: "value",
        width: "width",
        wmode: "wmode",
        wrap: "wrap",
        about: "about",
        accentheight: "accentHeight",
        "accent-height": "accentHeight",
        accumulate: "accumulate",
        additive: "additive",
        alignmentbaseline: "alignmentBaseline",
        "alignment-baseline": "alignmentBaseline",
        allowreorder: "allowReorder",
        alphabetic: "alphabetic",
        amplitude: "amplitude",
        arabicform: "arabicForm",
        "arabic-form": "arabicForm",
        ascent: "ascent",
        attributename: "attributeName",
        attributetype: "attributeType",
        autoreverse: "autoReverse",
        azimuth: "azimuth",
        basefrequency: "baseFrequency",
        baselineshift: "baselineShift",
        "baseline-shift": "baselineShift",
        baseprofile: "baseProfile",
        bbox: "bbox",
        begin: "begin",
        bias: "bias",
        by: "by",
        calcmode: "calcMode",
        capheight: "capHeight",
        "cap-height": "capHeight",
        clip: "clip",
        clippath: "clipPath",
        "clip-path": "clipPath",
        clippathunits: "clipPathUnits",
        cliprule: "clipRule",
        "clip-rule": "clipRule",
        color: "color",
        colorinterpolation: "colorInterpolation",
        "color-interpolation": "colorInterpolation",
        colorinterpolationfilters: "colorInterpolationFilters",
        "color-interpolation-filters": "colorInterpolationFilters",
        colorprofile: "colorProfile",
        "color-profile": "colorProfile",
        colorrendering: "colorRendering",
        "color-rendering": "colorRendering",
        contentscripttype: "contentScriptType",
        contentstyletype: "contentStyleType",
        cursor: "cursor",
        cx: "cx",
        cy: "cy",
        d: "d",
        datatype: "datatype",
        decelerate: "decelerate",
        descent: "descent",
        diffuseconstant: "diffuseConstant",
        direction: "direction",
        display: "display",
        divisor: "divisor",
        dominantbaseline: "dominantBaseline",
        "dominant-baseline": "dominantBaseline",
        dur: "dur",
        dx: "dx",
        dy: "dy",
        edgemode: "edgeMode",
        elevation: "elevation",
        enablebackground: "enableBackground",
        "enable-background": "enableBackground",
        end: "end",
        exponent: "exponent",
        externalresourcesrequired: "externalResourcesRequired",
        fill: "fill",
        fillopacity: "fillOpacity",
        "fill-opacity": "fillOpacity",
        fillrule: "fillRule",
        "fill-rule": "fillRule",
        filter: "filter",
        filterres: "filterRes",
        filterunits: "filterUnits",
        floodopacity: "floodOpacity",
        "flood-opacity": "floodOpacity",
        floodcolor: "floodColor",
        "flood-color": "floodColor",
        focusable: "focusable",
        fontfamily: "fontFamily",
        "font-family": "fontFamily",
        fontsize: "fontSize",
        "font-size": "fontSize",
        fontsizeadjust: "fontSizeAdjust",
        "font-size-adjust": "fontSizeAdjust",
        fontstretch: "fontStretch",
        "font-stretch": "fontStretch",
        fontstyle: "fontStyle",
        "font-style": "fontStyle",
        fontvariant: "fontVariant",
        "font-variant": "fontVariant",
        fontweight: "fontWeight",
        "font-weight": "fontWeight",
        format: "format",
        from: "from",
        fx: "fx",
        fy: "fy",
        g1: "g1",
        g2: "g2",
        glyphname: "glyphName",
        "glyph-name": "glyphName",
        glyphorientationhorizontal: "glyphOrientationHorizontal",
        "glyph-orientation-horizontal": "glyphOrientationHorizontal",
        glyphorientationvertical: "glyphOrientationVertical",
        "glyph-orientation-vertical": "glyphOrientationVertical",
        glyphref: "glyphRef",
        gradienttransform: "gradientTransform",
        gradientunits: "gradientUnits",
        hanging: "hanging",
        horizadvx: "horizAdvX",
        "horiz-adv-x": "horizAdvX",
        horizoriginx: "horizOriginX",
        "horiz-origin-x": "horizOriginX",
        ideographic: "ideographic",
        imagerendering: "imageRendering",
        "image-rendering": "imageRendering",
        in2: "in2",
        in: "in",
        inlist: "inlist",
        intercept: "intercept",
        k1: "k1",
        k2: "k2",
        k3: "k3",
        k4: "k4",
        k: "k",
        kernelmatrix: "kernelMatrix",
        kernelunitlength: "kernelUnitLength",
        kerning: "kerning",
        keypoints: "keyPoints",
        keysplines: "keySplines",
        keytimes: "keyTimes",
        lengthadjust: "lengthAdjust",
        letterspacing: "letterSpacing",
        "letter-spacing": "letterSpacing",
        lightingcolor: "lightingColor",
        "lighting-color": "lightingColor",
        limitingconeangle: "limitingConeAngle",
        local: "local",
        markerend: "markerEnd",
        "marker-end": "markerEnd",
        markerheight: "markerHeight",
        markermid: "markerMid",
        "marker-mid": "markerMid",
        markerstart: "markerStart",
        "marker-start": "markerStart",
        markerunits: "markerUnits",
        markerwidth: "markerWidth",
        mask: "mask",
        maskcontentunits: "maskContentUnits",
        maskunits: "maskUnits",
        mathematical: "mathematical",
        mode: "mode",
        numoctaves: "numOctaves",
        offset: "offset",
        opacity: "opacity",
        operator: "operator",
        order: "order",
        orient: "orient",
        orientation: "orientation",
        origin: "origin",
        overflow: "overflow",
        overlineposition: "overlinePosition",
        "overline-position": "overlinePosition",
        overlinethickness: "overlineThickness",
        "overline-thickness": "overlineThickness",
        paintorder: "paintOrder",
        "paint-order": "paintOrder",
        panose1: "panose1",
        "panose-1": "panose1",
        pathlength: "pathLength",
        patterncontentunits: "patternContentUnits",
        patterntransform: "patternTransform",
        patternunits: "patternUnits",
        pointerevents: "pointerEvents",
        "pointer-events": "pointerEvents",
        points: "points",
        pointsatx: "pointsAtX",
        pointsaty: "pointsAtY",
        pointsatz: "pointsAtZ",
        prefix: "prefix",
        preservealpha: "preserveAlpha",
        preserveaspectratio: "preserveAspectRatio",
        primitiveunits: "primitiveUnits",
        property: "property",
        r: "r",
        radius: "radius",
        refx: "refX",
        refy: "refY",
        renderingintent: "renderingIntent",
        "rendering-intent": "renderingIntent",
        repeatcount: "repeatCount",
        repeatdur: "repeatDur",
        requiredextensions: "requiredExtensions",
        requiredfeatures: "requiredFeatures",
        resource: "resource",
        restart: "restart",
        result: "result",
        results: "results",
        rotate: "rotate",
        rx: "rx",
        ry: "ry",
        scale: "scale",
        security: "security",
        seed: "seed",
        shaperendering: "shapeRendering",
        "shape-rendering": "shapeRendering",
        slope: "slope",
        spacing: "spacing",
        specularconstant: "specularConstant",
        specularexponent: "specularExponent",
        speed: "speed",
        spreadmethod: "spreadMethod",
        startoffset: "startOffset",
        stddeviation: "stdDeviation",
        stemh: "stemh",
        stemv: "stemv",
        stitchtiles: "stitchTiles",
        stopcolor: "stopColor",
        "stop-color": "stopColor",
        stopopacity: "stopOpacity",
        "stop-opacity": "stopOpacity",
        strikethroughposition: "strikethroughPosition",
        "strikethrough-position": "strikethroughPosition",
        strikethroughthickness: "strikethroughThickness",
        "strikethrough-thickness": "strikethroughThickness",
        string: "string",
        stroke: "stroke",
        strokedasharray: "strokeDasharray",
        "stroke-dasharray": "strokeDasharray",
        strokedashoffset: "strokeDashoffset",
        "stroke-dashoffset": "strokeDashoffset",
        strokelinecap: "strokeLinecap",
        "stroke-linecap": "strokeLinecap",
        strokelinejoin: "strokeLinejoin",
        "stroke-linejoin": "strokeLinejoin",
        strokemiterlimit: "strokeMiterlimit",
        "stroke-miterlimit": "strokeMiterlimit",
        strokewidth: "strokeWidth",
        "stroke-width": "strokeWidth",
        strokeopacity: "strokeOpacity",
        "stroke-opacity": "strokeOpacity",
        suppresscontenteditablewarning: "suppressContentEditableWarning",
        suppresshydrationwarning: "suppressHydrationWarning",
        surfacescale: "surfaceScale",
        systemlanguage: "systemLanguage",
        tablevalues: "tableValues",
        targetx: "targetX",
        targety: "targetY",
        textanchor: "textAnchor",
        "text-anchor": "textAnchor",
        textdecoration: "textDecoration",
        "text-decoration": "textDecoration",
        textlength: "textLength",
        textrendering: "textRendering",
        "text-rendering": "textRendering",
        to: "to",
        transform: "transform",
        typeof: "typeof",
        u1: "u1",
        u2: "u2",
        underlineposition: "underlinePosition",
        "underline-position": "underlinePosition",
        underlinethickness: "underlineThickness",
        "underline-thickness": "underlineThickness",
        unicode: "unicode",
        unicodebidi: "unicodeBidi",
        "unicode-bidi": "unicodeBidi",
        unicoderange: "unicodeRange",
        "unicode-range": "unicodeRange",
        unitsperem: "unitsPerEm",
        "units-per-em": "unitsPerEm",
        unselectable: "unselectable",
        valphabetic: "vAlphabetic",
        "v-alphabetic": "vAlphabetic",
        values: "values",
        vectoreffect: "vectorEffect",
        "vector-effect": "vectorEffect",
        version: "version",
        vertadvy: "vertAdvY",
        "vert-adv-y": "vertAdvY",
        vertoriginx: "vertOriginX",
        "vert-origin-x": "vertOriginX",
        vertoriginy: "vertOriginY",
        "vert-origin-y": "vertOriginY",
        vhanging: "vHanging",
        "v-hanging": "vHanging",
        videographic: "vIdeographic",
        "v-ideographic": "vIdeographic",
        viewbox: "viewBox",
        viewtarget: "viewTarget",
        visibility: "visibility",
        vmathematical: "vMathematical",
        "v-mathematical": "vMathematical",
        vocab: "vocab",
        widths: "widths",
        wordspacing: "wordSpacing",
        "word-spacing": "wordSpacing",
        writingmode: "writingMode",
        "writing-mode": "writingMode",
        x1: "x1",
        x2: "x2",
        x: "x",
        xchannelselector: "xChannelSelector",
        xheight: "xHeight",
        "x-height": "xHeight",
        xlinkactuate: "xlinkActuate",
        "xlink:actuate": "xlinkActuate",
        xlinkarcrole: "xlinkArcrole",
        "xlink:arcrole": "xlinkArcrole",
        xlinkhref: "xlinkHref",
        "xlink:href": "xlinkHref",
        xlinkrole: "xlinkRole",
        "xlink:role": "xlinkRole",
        xlinkshow: "xlinkShow",
        "xlink:show": "xlinkShow",
        xlinktitle: "xlinkTitle",
        "xlink:title": "xlinkTitle",
        xlinktype: "xlinkType",
        "xlink:type": "xlinkType",
        xmlbase: "xmlBase",
        "xml:base": "xmlBase",
        xmllang: "xmlLang",
        "xml:lang": "xmlLang",
        xmlns: "xmlns",
        "xml:space": "xmlSpace",
        xmlnsxlink: "xmlnsXlink",
        "xmlns:xlink": "xmlnsXlink",
        xmlspace: "xmlSpace",
        y1: "y1",
        y2: "y2",
        y: "y",
        ychannelselector: "yChannelSelector",
        z: "z",
        zoomandpan: "zoomAndPan"
    };
    var validateProperty$1 = function() {};
    var M = {};
    var B = /^on./;
    var L2 = /^on[^A-Z]/;
    var O2 = new RegExp("^(aria)-[" + g13 + "]*$");
    var U = new RegExp("^(aria)[A-Z][" + g13 + "]*$");
    validateProperty$1 = function(e, t24, r11, n8) {
        if (u110.call(M, t24) && M[t24]) return true;
        var o6 = t24.toLowerCase();
        if ("onfocusin" === o6 || "onfocusout" === o6) {
            error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React.");
            M[t24] = true;
            return true;
        }
        if (null != n8) {
            var a5 = n8.registrationNameDependencies, i3 = n8.possibleRegistrationNames;
            if (a5.hasOwnProperty(t24)) return true;
            var s2 = i3.hasOwnProperty(o6) ? i3[o6] : null;
            if (null != s2) {
                error("Invalid event handler property `%s`. Did you mean `%s`?", t24, s2);
                M[t24] = true;
                return true;
            }
            if (B.test(t24)) {
                error("Unknown event handler property `%s`. It will be ignored.", t24);
                M[t24] = true;
                return true;
            }
        } else if (B.test(t24)) {
            L2.test(t24) && error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t24);
            M[t24] = true;
            return true;
        }
        if (O2.test(t24) || U.test(t24)) return true;
        if ("innerhtml" === o6) {
            error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`.");
            M[t24] = true;
            return true;
        }
        if ("aria" === o6) {
            error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead.");
            M[t24] = true;
            return true;
        }
        if ("is" === o6 && null !== r11 && void 0 !== r11 && "string" !== typeof r11) {
            error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof r11);
            M[t24] = true;
            return true;
        }
        if ("number" === typeof r11 && isNaN(r11)) {
            error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t24);
            M[t24] = true;
            return true;
        }
        var c21 = getPropertyInfo(t24);
        var p2 = null !== c21 && c21.type === l110;
        if (A2.hasOwnProperty(o6)) {
            var f2 = A2[o6];
            if (f2 !== t24) {
                error("Invalid DOM property `%s`. Did you mean `%s`?", t24, f2);
                M[t24] = true;
                return true;
            }
        } else if (!p2 && t24 !== o6) {
            error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t24, o6);
            M[t24] = true;
            return true;
        }
        if ("boolean" === typeof r11 && shouldRemoveAttributeWithWarning(t24, r11, c21, false)) {
            r11 ? error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', r11, t24, t24, r11, t24) : error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', r11, t24, t24, r11, t24, t24, t24);
            M[t24] = true;
            return true;
        }
        if (p2) return true;
        if (shouldRemoveAttributeWithWarning(t24, r11, c21, false)) {
            M[t24] = true;
            return false;
        }
        if (("false" === r11 || "true" === r11) && null !== c21 && c21.type === d1) {
            error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", r11, t24, "false" === r11 ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t24, r11);
            M[t24] = true;
            return true;
        }
        return true;
    };
    var warnUnknownProperties = function(e44, t25, r12) {
        var n9 = [];
        for(var o7 in t25){
            var a6 = validateProperty$1(e44, o7, t25[o7], r12);
            a6 || n9.push(o7);
        }
        var i4 = n9.map(function(e45) {
            return "`" + e45 + "`";
        }).join(", ");
        1 === n9.length ? error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", i4, e44) : n9.length > 1 && error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", i4, e44);
    };
    function validateProperties$2(e46, t26, r13) {
        isCustomComponent(e46, t26) || warnUnknownProperties(e46, t26, r13);
    }
    var warnValidStyle = function() {};
    var H = /^(?:webkit|moz|o)[A-Z]/;
    var _2 = /^-ms-/;
    var W = /-(.)/g;
    var j2 = /;\s*$/;
    var z2 = {};
    var V3 = {};
    var $2 = false;
    var q2 = false;
    var camelize = function(e47) {
        return e47.replace(W, function(e, t27) {
            return t27.toUpperCase();
        });
    };
    var warnHyphenatedStyleName = function(e48) {
        if (!z2.hasOwnProperty(e48) || !z2[e48]) {
            z2[e48] = true;
            error("Unsupported style property %s. Did you mean %s?", e48, camelize(e48.replace(_2, "ms-")));
        }
    };
    var warnBadVendoredStyleName = function(e49) {
        if (!z2.hasOwnProperty(e49) || !z2[e49]) {
            z2[e49] = true;
            error("Unsupported vendor-prefixed style property %s. Did you mean %s?", e49, e49.charAt(0).toUpperCase() + e49.slice(1));
        }
    };
    var warnStyleValueWithSemicolon = function(e50, t28) {
        if (!V3.hasOwnProperty(t28) || !V3[t28]) {
            V3[t28] = true;
            error('Style property values shouldn\'t contain a semicolon. Try "%s: %s" instead.', e50, t28.replace(j2, ""));
        }
    };
    var warnStyleValueIsNaN = function(e51, t) {
        if (!$2) {
            $2 = true;
            error("`NaN` is an invalid value for the `%s` css style property.", e51);
        }
    };
    var warnStyleValueIsInfinity = function(e52, t) {
        if (!q2) {
            q2 = true;
            error("`Infinity` is an invalid value for the `%s` css style property.", e52);
        }
    };
    warnValidStyle = function(e53, t29) {
        e53.indexOf("-") > -1 ? warnHyphenatedStyleName(e53) : H.test(e53) ? warnBadVendoredStyleName(e53) : j2.test(t29) && warnStyleValueWithSemicolon(e53, t29);
        "number" === typeof t29 && (isNaN(t29) ? warnStyleValueIsNaN(e53, t29) : isFinite(t29) || warnStyleValueIsInfinity(e53, t29));
    };
    var Y = warnValidStyle;
    var X = /["'&<>]/;
    function escapeHtml(e54) {
        checkHtmlStringCoercion(e54);
        var t30 = "" + e54;
        var r14 = X.exec(t30);
        if (!r14) return t30;
        var n10;
        var o8 = "";
        var a7;
        var i5 = 0;
        for(a7 = r14.index; a7 < t30.length; a7++){
            switch(t30.charCodeAt(a7)){
                case 34:
                    n10 = "&quot;";
                    break;
                case 38:
                    n10 = "&amp;";
                    break;
                case 39:
                    n10 = "&#x27;";
                    break;
                case 60:
                    n10 = "&lt;";
                    break;
                case 62:
                    n10 = "&gt;";
                    break;
                default:
                    continue;
            }
            i5 !== a7 && (o8 += t30.substring(i5, a7));
            i5 = a7 + 1;
            o8 += n10;
        }
        return i5 !== a7 ? o8 + t30.substring(i5, a7) : o8;
    }
    function escapeTextForBrowser(e55) {
        return "boolean" === typeof e55 || "number" === typeof e55 ? "" + e55 : escapeHtml(e55);
    }
    var G = /([A-Z])/g;
    var Z = /^ms-/;
    function hyphenateStyleName(e56) {
        return e56.replace(G, "-$1").toLowerCase().replace(Z, "-ms-");
    }
    var Q = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i;
    var K = false;
    function sanitizeURL(e57) {
        if (!K && Q.test(e57)) {
            K = true;
            error("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e57));
        }
    }
    var J = Array.isArray;
    function isArray(e58) {
        return J(e58);
    }
    var ee = stringToPrecomputedChunk("<script>");
    var te = stringToPrecomputedChunk("<\/script>");
    var re = stringToPrecomputedChunk('<script src="');
    var ne = stringToPrecomputedChunk('<script type="module" src="');
    var oe = stringToPrecomputedChunk('" async=""><\/script>');
    function createResponseState(e59, t31, r15, n11, o9) {
        var a8 = void 0 === e59 ? "" : e59;
        var i6 = void 0 === t31 ? ee : stringToPrecomputedChunk('<script nonce="' + escapeTextForBrowser(t31) + '">');
        var s3 = [];
        void 0 !== r15 && s3.push(i6, stringToChunk(escapeTextForBrowser(r15)), te);
        if (void 0 !== n11) for(var u2 = 0; u2 < n11.length; u2++)s3.push(re, stringToChunk(escapeTextForBrowser(n11[u2])), oe);
        if (void 0 !== o9) for(var l2 = 0; l2 < o9.length; l2++)s3.push(ne, stringToChunk(escapeTextForBrowser(o9[l2])), oe);
        return {
            bootstrapChunks: s3,
            startInlineScript: i6,
            placeholderPrefix: stringToPrecomputedChunk(a8 + "P:"),
            segmentPrefix: stringToPrecomputedChunk(a8 + "S:"),
            boundaryPrefix: a8 + "B:",
            idPrefix: a8 + "R:",
            nextSuspenseID: 0,
            sentCompleteSegmentFunction: false,
            sentCompleteBoundaryFunction: false,
            sentClientRenderFunction: false
        };
    }
    var ae = 0;
    var ie = 1;
    var se = 2;
    var ue = 3;
    var le = 4;
    var ce = 5;
    var pe = 6;
    var de = 7;
    function createFormatContext(e60, t32) {
        return {
            insertionMode: e60,
            selectedValue: t32
        };
    }
    function getChildFormatContext(e61, t33, r16) {
        switch(t33){
            case "select":
                return createFormatContext(ie, null != r16.value ? r16.value : r16.defaultValue);
            case "svg":
                return createFormatContext(se, null);
            case "math":
                return createFormatContext(ue, null);
            case "foreignObject":
                return createFormatContext(ie, null);
            case "table":
                return createFormatContext(le, null);
            case "thead":
            case "tbody":
            case "tfoot":
                return createFormatContext(ce, null);
            case "colgroup":
                return createFormatContext(de, null);
            case "tr":
                return createFormatContext(pe, null);
        }
        return e61.insertionMode >= le || e61.insertionMode === ae ? createFormatContext(ie, null) : e61;
    }
    var fe = null;
    function assignSuspenseBoundaryID(e62) {
        var t34 = e62.nextSuspenseID++;
        return stringToPrecomputedChunk(e62.boundaryPrefix + t34.toString(16));
    }
    function makeId(e63, t35, r17) {
        var n12 = e63.idPrefix;
        var o10 = n12 + t35;
        r17 > 0 && (o10 += ":" + r17.toString(32));
        return o10;
    }
    function encodeHTMLTextNode(e64) {
        return escapeTextForBrowser(e64);
    }
    var he = stringToPrecomputedChunk("\x3c!-- --\x3e");
    function pushTextInstance(e65, t36, r) {
        "" !== t36 && e65.push(stringToChunk(encodeHTMLTextNode(t36)), he);
    }
    var me = new Map;
    function processStyleName(e66) {
        var t37 = me.get(e66);
        if (void 0 !== t37) return t37;
        var r18 = stringToPrecomputedChunk(escapeTextForBrowser(hyphenateStyleName(e66)));
        me.set(e66, r18);
        return r18;
    }
    var ve = stringToPrecomputedChunk(' style="');
    var ge = stringToPrecomputedChunk(":");
    var ye = stringToPrecomputedChunk(";");
    function pushStyle(e67, t, r19) {
        if ("object" !== typeof r19) throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
        var n13 = true;
        for(var o11 in r19)if (u110.call(r19, o11)) {
            var a9 = r19[o11];
            if (null != a9 && "boolean" !== typeof a9 && "" !== a9) {
                var i7 = void 0;
                var s4 = void 0;
                var l3 = 0 === o11.indexOf("--");
                if (l3) {
                    i7 = stringToChunk(escapeTextForBrowser(o11));
                    checkCSSPropertyStringCoercion(a9, o11);
                    s4 = stringToChunk(escapeTextForBrowser(("" + a9).trim()));
                } else {
                    Y(o11, a9);
                    i7 = processStyleName(o11);
                    if ("number" === typeof a9) s4 = 0 === a9 || u110.call(T, o11) ? stringToChunk("" + a9) : stringToChunk(a9 + "px");
                    else {
                        checkCSSPropertyStringCoercion(a9, o11);
                        s4 = stringToChunk(escapeTextForBrowser(("" + a9).trim()));
                    }
                }
                if (n13) {
                    n13 = false;
                    e67.push(ve, i7, ge, s4);
                } else e67.push(ye, i7, ge, s4);
            }
        }
        n13 || e67.push(be);
    }
    var ke = stringToPrecomputedChunk(" ");
    var Ce = stringToPrecomputedChunk('="');
    var be = stringToPrecomputedChunk('"');
    var Se = stringToPrecomputedChunk('=""');
    function pushAttribute(e68, t38, r20, n14) {
        switch(r20){
            case "style":
                pushStyle(e68, t38, n14);
                return;
            case "defaultValue":
            case "defaultChecked":
            case "innerHTML":
            case "suppressContentEditableWarning":
            case "suppressHydrationWarning":
                return;
        }
        if (!(r20.length > 2) || "o" !== r20[0] && "O" !== r20[0] || "n" !== r20[1] && "N" !== r20[1]) {
            var o12 = getPropertyInfo(r20);
            if (null !== o12) {
                switch(typeof n14){
                    case "function":
                    case "symbol":
                        return;
                    case "boolean":
                        if (!o12.acceptsBooleans) return;
                }
                var a10 = o12.attributeName;
                var i8 = stringToChunk(a10);
                switch(o12.type){
                    case d1:
                        n14 && e68.push(ke, i8, Se);
                        return;
                    case f1:
                        true === n14 ? e68.push(ke, i8, Se) : false === n14 || e68.push(ke, i8, Ce, stringToChunk(escapeTextForBrowser(n14)), be);
                        return;
                    case h1:
                        isNaN(n14) || e68.push(ke, i8, Ce, stringToChunk(escapeTextForBrowser(n14)), be);
                        break;
                    case m12:
                        !isNaN(n14) && n14 >= 1 && e68.push(ke, i8, Ce, stringToChunk(escapeTextForBrowser(n14)), be);
                        break;
                    default:
                        if (o12.sanitizeURL) {
                            checkAttributeStringCoercion(n14, a10);
                            n14 = "" + n14;
                            sanitizeURL(n14);
                        }
                        e68.push(ke, i8, Ce, stringToChunk(escapeTextForBrowser(n14)), be);
                }
            } else if (isAttributeNameSafe(r20)) {
                switch(typeof n14){
                    case "function":
                    case "symbol":
                        return;
                    case "boolean":
                        var s5 = r20.toLowerCase().slice(0, 5);
                        if ("data-" !== s5 && "aria-" !== s5) return;
                }
                e68.push(ke, stringToChunk(r20), Ce, stringToChunk(escapeTextForBrowser(n14)), be);
            }
        }
    }
    var we = stringToPrecomputedChunk(">");
    var xe = stringToPrecomputedChunk("/>");
    function pushInnerHTML(e69, t39, r21) {
        if (null != t39) {
            if (null != r21) throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
            if ("object" !== typeof t39 || !("__html" in t39)) throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
            var n15 = t39.__html;
            if (null !== n15 && void 0 !== n15) {
                checkHtmlStringCoercion(n15);
                e69.push(stringToChunk("" + n15));
            }
        }
    }
    var Te = false;
    var Pe = false;
    var Re = false;
    var Ie = false;
    var Ee = false;
    var Fe = false;
    var De = false;
    function checkSelectProp(e70, t40) {
        var r22 = e70[t40];
        if (null != r22) {
            var n16 = isArray(r22);
            e70.multiple && !n16 ? error("The `%s` prop supplied to <select> must be an array if `multiple` is true.", t40) : !e70.multiple && n16 && error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.", t40);
        }
    }
    function pushStartSelect(e71, t41, r23) {
        checkControlledValueProps("select", t41);
        checkSelectProp(t41, "value");
        checkSelectProp(t41, "defaultValue");
        if (void 0 !== t41.value && void 0 !== t41.defaultValue && !Re) {
            error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components");
            Re = true;
        }
        e71.push(startChunkForTag("select"));
        var n17 = null;
        var o13 = null;
        for(var a11 in t41)if (u110.call(t41, a11)) {
            var i9 = t41[a11];
            if (null == i9) continue;
            switch(a11){
                case "children":
                    n17 = i9;
                    break;
                case "dangerouslySetInnerHTML":
                    o13 = i9;
                    break;
                case "defaultValue":
                case "value":
                    break;
                default:
                    pushAttribute(e71, r23, a11, i9);
                    break;
            }
        }
        e71.push(we);
        pushInnerHTML(e71, o13, n17);
        return n17;
    }
    function flattenOptionChildren(e72) {
        var r24 = "";
        t13.Children.forEach(e72, function(e73) {
            if (null != e73) {
                r24 += e73;
                if (!Ee && "string" !== typeof e73 && "number" !== typeof e73) {
                    Ee = true;
                    error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.");
                }
            }
        });
        return r24;
    }
    var Ne = stringToPrecomputedChunk(' selected=""');
    function pushStartOption(e74, t42, r25, n18) {
        var o14 = n18.selectedValue;
        e74.push(startChunkForTag("option"));
        var a12 = null;
        var i10 = null;
        var s6 = null;
        var l4 = null;
        for(var c3 in t42)if (u110.call(t42, c3)) {
            var p3 = t42[c3];
            if (null == p3) continue;
            switch(c3){
                case "children":
                    a12 = p3;
                    break;
                case "selected":
                    s6 = p3;
                    if (!De) {
                        error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>.");
                        De = true;
                    }
                    break;
                case "dangerouslySetInnerHTML":
                    l4 = p3;
                    break;
                case "value":
                    i10 = p3;
                default:
                    pushAttribute(e74, r25, c3, p3);
                    break;
            }
        }
        if (null !== o14) {
            var d2;
            if (null !== i10) {
                checkAttributeStringCoercion(i10, "value");
                d2 = "" + i10;
            } else {
                if (null !== l4 && !Fe) {
                    Fe = true;
                    error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.");
                }
                d2 = flattenOptionChildren(a12);
            }
            if (isArray(o14)) for(var f3 = 0; f3 < o14.length; f3++){
                checkAttributeStringCoercion(o14[f3], "value");
                var h2 = "" + o14[f3];
                if (h2 === d2) {
                    e74.push(Ne);
                    break;
                }
            }
            else o14 === d2 && e74.push(Ne);
        } else s6 && e74.push(Ne);
        e74.push(we);
        pushInnerHTML(e74, l4, a12);
        return a12;
    }
    function pushInput(e75, t43, r26) {
        checkControlledValueProps("input", t43);
        if (void 0 !== t43.checked && void 0 !== t43.defaultChecked && !Pe) {
            error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", t43.type);
            Pe = true;
        }
        if (void 0 !== t43.value && void 0 !== t43.defaultValue && !Te) {
            error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", t43.type);
            Te = true;
        }
        e75.push(startChunkForTag("input"));
        var n19 = null;
        var o15 = null;
        var a13 = null;
        var i11 = null;
        for(var s7 in t43)if (u110.call(t43, s7)) {
            var l5 = t43[s7];
            if (null == l5) continue;
            switch(s7){
                case "children":
                case "dangerouslySetInnerHTML":
                    throw new Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
                case "defaultChecked":
                    i11 = l5;
                    break;
                case "defaultValue":
                    o15 = l5;
                    break;
                case "checked":
                    a13 = l5;
                    break;
                case "value":
                    n19 = l5;
                    break;
                default:
                    pushAttribute(e75, r26, s7, l5);
                    break;
            }
        }
        null !== a13 ? pushAttribute(e75, r26, "checked", a13) : null !== i11 && pushAttribute(e75, r26, "checked", i11);
        null !== n19 ? pushAttribute(e75, r26, "value", n19) : null !== o15 && pushAttribute(e75, r26, "value", o15);
        e75.push(xe);
        return null;
    }
    function pushStartTextArea(e76, t44, r27) {
        checkControlledValueProps("textarea", t44);
        if (void 0 !== t44.value && void 0 !== t44.defaultValue && !Ie) {
            error("Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components");
            Ie = true;
        }
        e76.push(startChunkForTag("textarea"));
        var n20 = null;
        var o16 = null;
        var a14 = null;
        for(var i12 in t44)if (u110.call(t44, i12)) {
            var s8 = t44[i12];
            if (null == s8) continue;
            switch(i12){
                case "children":
                    a14 = s8;
                    break;
                case "value":
                    n20 = s8;
                    break;
                case "defaultValue":
                    o16 = s8;
                    break;
                case "dangerouslySetInnerHTML":
                    throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
                default:
                    pushAttribute(e76, r27, i12, s8);
                    break;
            }
        }
        null === n20 && null !== o16 && (n20 = o16);
        e76.push(we);
        if (null != a14) {
            error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
            if (null != n20) throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (isArray(a14)) {
                if (a14.length > 1) throw new Error("<textarea> can only have at most one child.");
                checkHtmlStringCoercion(a14[0]);
                n20 = "" + a14[0];
            }
            checkHtmlStringCoercion(a14);
            n20 = "" + a14;
        }
        "string" === typeof n20 && "\n" === n20[0] && e76.push(Ae);
        return n20;
    }
    function pushSelfClosing(e77, t45, r28, n21) {
        e77.push(startChunkForTag(r28));
        for(var o17 in t45)if (u110.call(t45, o17)) {
            var a15 = t45[o17];
            if (null == a15) continue;
            switch(o17){
                case "children":
                case "dangerouslySetInnerHTML":
                    throw new Error(r28 + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
                default:
                    pushAttribute(e77, n21, o17, a15);
                    break;
            }
        }
        e77.push(xe);
        return null;
    }
    function pushStartMenuItem(e78, t46, r29) {
        e78.push(startChunkForTag("menuitem"));
        for(var n22 in t46)if (u110.call(t46, n22)) {
            var o18 = t46[n22];
            if (null == o18) continue;
            switch(n22){
                case "children":
                case "dangerouslySetInnerHTML":
                    throw new Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
                default:
                    pushAttribute(e78, r29, n22, o18);
                    break;
            }
        }
        e78.push(we);
        return null;
    }
    function pushStartGenericElement(e79, t47, r30, n23) {
        e79.push(startChunkForTag(r30));
        var o19 = null;
        var a16 = null;
        for(var i13 in t47)if (u110.call(t47, i13)) {
            var s9 = t47[i13];
            if (null == s9) continue;
            switch(i13){
                case "children":
                    o19 = s9;
                    break;
                case "dangerouslySetInnerHTML":
                    a16 = s9;
                    break;
                default:
                    pushAttribute(e79, n23, i13, s9);
                    break;
            }
        }
        e79.push(we);
        pushInnerHTML(e79, a16, o19);
        if ("string" === typeof o19) {
            e79.push(stringToChunk(encodeHTMLTextNode(o19)));
            return null;
        }
        return o19;
    }
    function pushStartCustomElement(e80, t48, r31, n24) {
        e80.push(startChunkForTag(r31));
        var o20 = null;
        var a17 = null;
        for(var i14 in t48)if (u110.call(t48, i14)) {
            var s10 = t48[i14];
            if (null == s10) continue;
            switch(i14){
                case "children":
                    o20 = s10;
                    break;
                case "dangerouslySetInnerHTML":
                    a17 = s10;
                    break;
                case "style":
                    pushStyle(e80, n24, s10);
                    break;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                    break;
                default:
                    isAttributeNameSafe(i14) && "function" !== typeof s10 && "symbol" !== typeof s10 && e80.push(ke, stringToChunk(i14), Ce, stringToChunk(escapeTextForBrowser(s10)), be);
                    break;
            }
        }
        e80.push(we);
        pushInnerHTML(e80, a17, o20);
        return o20;
    }
    var Ae = stringToPrecomputedChunk("\n");
    function pushStartPreformattedElement(e81, t49, r32, n25) {
        e81.push(startChunkForTag(r32));
        var o21 = null;
        var a18 = null;
        for(var i15 in t49)if (u110.call(t49, i15)) {
            var s11 = t49[i15];
            if (null == s11) continue;
            switch(i15){
                case "children":
                    o21 = s11;
                    break;
                case "dangerouslySetInnerHTML":
                    a18 = s11;
                    break;
                default:
                    pushAttribute(e81, n25, i15, s11);
                    break;
            }
        }
        e81.push(we);
        if (null != a18) {
            if (null != o21) throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
            if ("object" !== typeof a18 || !("__html" in a18)) throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
            var l6 = a18.__html;
            if (null !== l6 && void 0 !== l6) if ("string" === typeof l6 && l6.length > 0 && "\n" === l6[0]) e81.push(Ae, stringToChunk(l6));
            else {
                checkHtmlStringCoercion(l6);
                e81.push(stringToChunk("" + l6));
            }
        }
        "string" === typeof o21 && "\n" === o21[0] && e81.push(Ae);
        return o21;
    }
    var Me = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
    var Be = new Map;
    function startChunkForTag(e82) {
        var t50 = Be.get(e82);
        if (void 0 === t50) {
            if (!Me.test(e82)) throw new Error("Invalid tag: " + e82);
            t50 = stringToPrecomputedChunk("<" + e82);
            Be.set(e82, t50);
        }
        return t50;
    }
    var Le = stringToPrecomputedChunk("<!DOCTYPE html>");
    function pushStartInstance(e83, t51, r33, n26, o22) {
        validateProperties(t51, r33);
        validateProperties$1(t51, r33);
        validateProperties$2(t51, r33, null);
        !r33.suppressContentEditableWarning && r33.contentEditable && null != r33.children && error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
        o22.insertionMode !== se && o22.insertionMode !== ue && -1 === t51.indexOf("-") && "string" !== typeof r33.is && t51.toLowerCase() !== t51 && error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", t51);
        switch(t51){
            case "select":
                return pushStartSelect(e83, r33, n26);
            case "option":
                return pushStartOption(e83, r33, n26, o22);
            case "textarea":
                return pushStartTextArea(e83, r33, n26);
            case "input":
                return pushInput(e83, r33, n26);
            case "menuitem":
                return pushStartMenuItem(e83, r33, n26);
            case "listing":
            case "pre":
                return pushStartPreformattedElement(e83, r33, t51, n26);
            case "area":
            case "base":
            case "br":
            case "col":
            case "embed":
            case "hr":
            case "img":
            case "keygen":
            case "link":
            case "meta":
            case "param":
            case "source":
            case "track":
            case "wbr":
                return pushSelfClosing(e83, r33, t51, n26);
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph":
                return pushStartGenericElement(e83, r33, t51, n26);
            case "html":
                o22.insertionMode === ae && e83.push(Le);
                return pushStartGenericElement(e83, r33, t51, n26);
            default:
                return -1 === t51.indexOf("-") && "string" !== typeof r33.is ? pushStartGenericElement(e83, r33, t51, n26) : pushStartCustomElement(e83, r33, t51, n26);
        }
    }
    var Oe = stringToPrecomputedChunk("</");
    var Ue = stringToPrecomputedChunk(">");
    function pushEndInstance(e84, t52, r) {
        switch(t52){
            case "area":
            case "base":
            case "br":
            case "col":
            case "embed":
            case "hr":
            case "img":
            case "input":
            case "keygen":
            case "link":
            case "meta":
            case "param":
            case "source":
            case "track":
            case "wbr":
                break;
            default:
                e84.push(Oe, stringToChunk(t52), Ue);
        }
    }
    function writeCompletedRoot(e85, t53) {
        var r34 = t53.bootstrapChunks;
        var n27 = true;
        for(var o23 = 0; o23 < r34.length; o23++)n27 = writeChunk(e85, r34[o23]);
        return n27;
    }
    var He = stringToPrecomputedChunk('<template id="');
    var _e = stringToPrecomputedChunk('"></template>');
    function writePlaceholder(e86, t54, r35) {
        writeChunk(e86, He);
        writeChunk(e86, t54.placeholderPrefix);
        var n28 = stringToChunk(r35.toString(16));
        writeChunk(e86, n28);
        return writeChunk(e86, _e);
    }
    var We = stringToPrecomputedChunk("\x3c!--$--\x3e");
    var je = stringToPrecomputedChunk('\x3c!--$?--\x3e<template id="');
    var ze = stringToPrecomputedChunk('"></template>');
    var Ve = stringToPrecomputedChunk("\x3c!--$!--\x3e");
    var $e = stringToPrecomputedChunk("\x3c!--/$--\x3e");
    function writeStartCompletedSuspenseBoundary(e87, t) {
        return writeChunk(e87, We);
    }
    function writeStartPendingSuspenseBoundary(e88, t, r36) {
        writeChunk(e88, je);
        if (null === r36) throw new Error("An ID must have been assigned before we can complete the boundary.");
        writeChunk(e88, r36);
        return writeChunk(e88, ze);
    }
    function writeStartClientRenderedSuspenseBoundary(e89, t) {
        return writeChunk(e89, Ve);
    }
    function writeEndCompletedSuspenseBoundary(e90, t) {
        return writeChunk(e90, $e);
    }
    function writeEndPendingSuspenseBoundary(e91, t) {
        return writeChunk(e91, $e);
    }
    function writeEndClientRenderedSuspenseBoundary(e92, t) {
        return writeChunk(e92, $e);
    }
    var qe = stringToPrecomputedChunk('<div hidden id="');
    var Ye = stringToPrecomputedChunk('">');
    var Xe = stringToPrecomputedChunk("</div>");
    var Ge = stringToPrecomputedChunk('<svg aria-hidden="true" style="display:none" id="');
    var Ze = stringToPrecomputedChunk('">');
    var Qe = stringToPrecomputedChunk("</svg>");
    var Ke = stringToPrecomputedChunk('<math aria-hidden="true" style="display:none" id="');
    var Je = stringToPrecomputedChunk('">');
    var et = stringToPrecomputedChunk("</math>");
    var tt = stringToPrecomputedChunk('<table hidden id="');
    var rt = stringToPrecomputedChunk('">');
    var nt = stringToPrecomputedChunk("</table>");
    var ot = stringToPrecomputedChunk('<table hidden><tbody id="');
    var at = stringToPrecomputedChunk('">');
    var it = stringToPrecomputedChunk("</tbody></table>");
    var st = stringToPrecomputedChunk('<table hidden><tr id="');
    var ut = stringToPrecomputedChunk('">');
    var lt = stringToPrecomputedChunk("</tr></table>");
    var ct = stringToPrecomputedChunk('<table hidden><colgroup id="');
    var pt = stringToPrecomputedChunk('">');
    var dt = stringToPrecomputedChunk("</colgroup></table>");
    function writeStartSegment(e93, t55, r37, n29) {
        switch(r37.insertionMode){
            case ae:
            case ie:
                writeChunk(e93, qe);
                writeChunk(e93, t55.segmentPrefix);
                writeChunk(e93, stringToChunk(n29.toString(16)));
                return writeChunk(e93, Ye);
            case se:
                writeChunk(e93, Ge);
                writeChunk(e93, t55.segmentPrefix);
                writeChunk(e93, stringToChunk(n29.toString(16)));
                return writeChunk(e93, Ze);
            case ue:
                writeChunk(e93, Ke);
                writeChunk(e93, t55.segmentPrefix);
                writeChunk(e93, stringToChunk(n29.toString(16)));
                return writeChunk(e93, Je);
            case le:
                writeChunk(e93, tt);
                writeChunk(e93, t55.segmentPrefix);
                writeChunk(e93, stringToChunk(n29.toString(16)));
                return writeChunk(e93, rt);
            case ce:
                writeChunk(e93, ot);
                writeChunk(e93, t55.segmentPrefix);
                writeChunk(e93, stringToChunk(n29.toString(16)));
                return writeChunk(e93, at);
            case pe:
                writeChunk(e93, st);
                writeChunk(e93, t55.segmentPrefix);
                writeChunk(e93, stringToChunk(n29.toString(16)));
                return writeChunk(e93, ut);
            case de:
                writeChunk(e93, ct);
                writeChunk(e93, t55.segmentPrefix);
                writeChunk(e93, stringToChunk(n29.toString(16)));
                return writeChunk(e93, pt);
            default:
                throw new Error("Unknown insertion mode. This is a bug in React.");
        }
    }
    function writeEndSegment(e94, t56) {
        switch(t56.insertionMode){
            case ae:
            case ie:
                return writeChunk(e94, Xe);
            case se:
                return writeChunk(e94, Qe);
            case ue:
                return writeChunk(e94, et);
            case le:
                return writeChunk(e94, nt);
            case ce:
                return writeChunk(e94, it);
            case pe:
                return writeChunk(e94, lt);
            case de:
                return writeChunk(e94, dt);
            default:
                throw new Error("Unknown insertion mode. This is a bug in React.");
        }
    }
    var ft = "function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)}";
    var ht = 'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}}';
    var mt = 'function $RX(a){if(a=document.getElementById(a))a=a.previousSibling,a.data="$!",a._reactRetry&&a._reactRetry()}';
    var vt = stringToPrecomputedChunk(ft + ';$RS("');
    var gt = stringToPrecomputedChunk('$RS("');
    var yt = stringToPrecomputedChunk('","');
    var kt = stringToPrecomputedChunk('")<\/script>');
    function writeCompletedSegmentInstruction(e95, t57, r38) {
        writeChunk(e95, t57.startInlineScript);
        if (t57.sentCompleteSegmentFunction) writeChunk(e95, gt);
        else {
            t57.sentCompleteSegmentFunction = true;
            writeChunk(e95, vt);
        }
        writeChunk(e95, t57.segmentPrefix);
        var n30 = stringToChunk(r38.toString(16));
        writeChunk(e95, n30);
        writeChunk(e95, yt);
        writeChunk(e95, t57.placeholderPrefix);
        writeChunk(e95, n30);
        return writeChunk(e95, kt);
    }
    var Ct = stringToPrecomputedChunk(ht + ';$RC("');
    var bt = stringToPrecomputedChunk('$RC("');
    var St = stringToPrecomputedChunk('","');
    var wt = stringToPrecomputedChunk('")<\/script>');
    function writeCompletedBoundaryInstruction(e96, t58, r39, n31) {
        writeChunk(e96, t58.startInlineScript);
        if (t58.sentCompleteBoundaryFunction) writeChunk(e96, bt);
        else {
            t58.sentCompleteBoundaryFunction = true;
            writeChunk(e96, Ct);
        }
        if (null === r39) throw new Error("An ID must have been assigned before we can complete the boundary.");
        var o24 = stringToChunk(n31.toString(16));
        writeChunk(e96, r39);
        writeChunk(e96, St);
        writeChunk(e96, t58.segmentPrefix);
        writeChunk(e96, o24);
        return writeChunk(e96, wt);
    }
    var xt = stringToPrecomputedChunk(mt + ';$RX("');
    var Tt = stringToPrecomputedChunk('$RX("');
    var Pt = stringToPrecomputedChunk('")<\/script>');
    function writeClientRenderBoundaryInstruction(e97, t59, r40) {
        writeChunk(e97, t59.startInlineScript);
        if (t59.sentClientRenderFunction) writeChunk(e97, Tt);
        else {
            t59.sentClientRenderFunction = true;
            writeChunk(e97, xt);
        }
        if (null === r40) throw new Error("An ID must have been assigned before we can complete the boundary.");
        writeChunk(e97, r40);
        return writeChunk(e97, Pt);
    }
    function createResponseState$1(e98, t60) {
        var r41 = createResponseState(t60, void 0);
        return {
            bootstrapChunks: r41.bootstrapChunks,
            startInlineScript: r41.startInlineScript,
            placeholderPrefix: r41.placeholderPrefix,
            segmentPrefix: r41.segmentPrefix,
            boundaryPrefix: r41.boundaryPrefix,
            idPrefix: r41.idPrefix,
            nextSuspenseID: r41.nextSuspenseID,
            sentCompleteSegmentFunction: r41.sentCompleteSegmentFunction,
            sentCompleteBoundaryFunction: r41.sentCompleteBoundaryFunction,
            sentClientRenderFunction: r41.sentClientRenderFunction,
            generateStaticMarkup: e98
        };
    }
    function createRootFormatContext() {
        return {
            insertionMode: ie,
            selectedValue: null
        };
    }
    function pushTextInstance$1(e99, t61, r42) {
        r42.generateStaticMarkup ? e99.push(stringToChunk(escapeTextForBrowser(t61))) : pushTextInstance(e99, t61);
    }
    function writeStartCompletedSuspenseBoundary$1(e100, t62) {
        return !!t62.generateStaticMarkup || writeStartCompletedSuspenseBoundary(e100);
    }
    function writeStartClientRenderedSuspenseBoundary$1(e101, t63) {
        return !!t63.generateStaticMarkup || writeStartClientRenderedSuspenseBoundary(e101);
    }
    function writeEndCompletedSuspenseBoundary$1(e102, t64) {
        return !!t64.generateStaticMarkup || writeEndCompletedSuspenseBoundary(e102);
    }
    function writeEndClientRenderedSuspenseBoundary$1(e103, t65) {
        return !!t65.generateStaticMarkup || writeEndClientRenderedSuspenseBoundary(e103);
    }
    var Rt = 60103;
    var It = 60106;
    var Et = 60107;
    var Ft = 60108;
    var Dt = 60114;
    var Nt = 60109;
    var At = 60110;
    var Mt = 60112;
    var Bt = 60113;
    var Lt = 60120;
    var Ot = 60115;
    var Ut = 60116;
    var Ht = 60119;
    var _t = 60129;
    var Wt = 60131;
    var jt = 60132;
    if ("function" === typeof Symbol && Symbol.for) {
        var zt = Symbol.for;
        Rt = zt("react.element");
        It = zt("react.portal");
        Et = zt("react.fragment");
        Ft = zt("react.strict_mode");
        Dt = zt("react.profiler");
        Nt = zt("react.provider");
        At = zt("react.context");
        Mt = zt("react.forward_ref");
        Bt = zt("react.suspense");
        Lt = zt("react.suspense_list");
        Ot = zt("react.memo");
        Ut = zt("react.lazy");
        Ht = zt("react.scope");
        _t = zt("react.debug_trace_mode");
        zt("react.offscreen");
        Wt = zt("react.legacy_hidden");
        jt = zt("react.cache");
    }
    var Vt = "function" === typeof Symbol && Symbol.iterator;
    var $t = "@@iterator";
    function getIteratorFn(e104) {
        if (null === e104 || "object" !== typeof e104) return null;
        var t66 = Vt && e104[Vt] || e104[$t];
        return "function" === typeof t66 ? t66 : null;
    }
    function getWrappedName(e105, t67, r43) {
        var n32 = e105.displayName;
        if (n32) return n32;
        var o25 = t67.displayName || t67.name || "";
        return "" !== o25 ? r43 + "(" + o25 + ")" : r43;
    }
    function getContextName(e106) {
        return e106.displayName || "Context";
    }
    function getComponentNameFromType(e107) {
        if (null == e107) return null;
        "number" === typeof e107.tag && error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
        if ("function" === typeof e107) return e107.displayName || e107.name || null;
        if ("string" === typeof e107) return e107;
        switch(e107){
            case Et:
                return "Fragment";
            case It:
                return "Portal";
            case Dt:
                return "Profiler";
            case Ft:
                return "StrictMode";
            case Bt:
                return "Suspense";
            case Lt:
                return "SuspenseList";
            case jt:
                return "Cache";
        }
        if ("object" === typeof e107) switch(e107.$$typeof){
            case At:
                var t68 = e107;
                return getContextName(t68) + ".Consumer";
            case Nt:
                var r44 = e107;
                return getContextName(r44._context) + ".Provider";
            case Mt:
                return getWrappedName(e107, e107.render, "ForwardRef");
            case Ot:
                var n33 = e107.displayName || null;
                return null !== n33 ? n33 : getComponentNameFromType(e107.type) || "Memo";
            case Ut:
                var o26 = e107;
                var a19 = o26._payload;
                var i16 = o26._init;
                try {
                    return getComponentNameFromType(i16(a19));
                } catch (e) {
                    return null;
                }
        }
        return null;
    }
    var qt = 0;
    var Yt;
    var Xt;
    var Gt;
    var Zt;
    var Qt;
    var Kt;
    var Jt;
    function disabledLog() {}
    disabledLog.__reactDisabledLog = true;
    function disableLogs() {
        if (0 === qt) {
            Yt = console.log;
            Xt = console.info;
            Gt = console.warn;
            Zt = console.error;
            Qt = console.group;
            Kt = console.groupCollapsed;
            Jt = console.groupEnd;
            var e108 = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
            };
            Object.defineProperties(console, {
                info: e108,
                log: e108,
                warn: e108,
                error: e108,
                group: e108,
                groupCollapsed: e108,
                groupEnd: e108
            });
        }
        qt++;
    }
    function reenableLogs() {
        qt--;
        if (0 === qt) {
            var t69 = {
                configurable: true,
                enumerable: true,
                writable: true
            };
            Object.defineProperties(console, {
                log: e15({}, t69, {
                    value: Yt
                }),
                info: e15({}, t69, {
                    value: Xt
                }),
                warn: e15({}, t69, {
                    value: Gt
                }),
                error: e15({}, t69, {
                    value: Zt
                }),
                group: e15({}, t69, {
                    value: Qt
                }),
                groupCollapsed: e15({}, t69, {
                    value: Kt
                }),
                groupEnd: e15({}, t69, {
                    value: Jt
                })
            });
        }
        qt < 0 && error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
    var er = i12.ReactCurrentDispatcher;
    var tr;
    function describeBuiltInComponentFrame(e110, t, r) {
        if (void 0 === tr) try {
            throw Error();
        } catch (e109) {
            var n34 = e109.stack.trim().match(/\n( *(at )?)/);
            tr = n34 && n34[1] || "";
        }
        return "\n" + tr + e110;
    }
    var rr = false;
    var nr;
    var or = "function" === typeof WeakMap ? WeakMap : Map;
    nr = new or;
    function describeNativeComponentFrame(e111, t70) {
        if (!e111 || rr) return "";
        var r45 = nr.get(e111);
        if (void 0 !== r45) return r45;
        var n35;
        rr = true;
        var o27 = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var a20;
        a20 = er.current;
        er.current = null;
        disableLogs();
        try {
            if (t70) {
                var Fake = function() {
                    throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                    set: function() {
                        throw Error();
                    }
                });
                if ("object" === typeof Reflect && Reflect.construct) {
                    try {
                        Reflect.construct(Fake, []);
                    } catch (e112) {
                        n35 = e112;
                    }
                    Reflect.construct(e111, [], Fake);
                } else {
                    try {
                        Fake.call();
                    } catch (e113) {
                        n35 = e113;
                    }
                    e111.call(Fake.prototype);
                }
            } else {
                try {
                    throw Error();
                } catch (e114) {
                    n35 = e114;
                }
                e111();
            }
        } catch (t71) {
            if (t71 && n35 && "string" === typeof t71.stack) {
                var i17 = t71.stack.split("\n");
                var s12 = n35.stack.split("\n");
                var u3 = i17.length - 1;
                var l7 = s12.length - 1;
                while(u3 >= 1 && l7 >= 0 && i17[u3] !== s12[l7])l7--;
                for(; u3 >= 1 && l7 >= 0; u3--, l7--)if (i17[u3] !== s12[l7]) {
                    if (1 !== u3 || 1 !== l7) do {
                        u3--;
                        l7--;
                        if (l7 < 0 || i17[u3] !== s12[l7]) {
                            var c4 = "\n" + i17[u3].replace(" at new ", " at ");
                            e111.displayName && c4.includes("<anonymous>") && (c4 = c4.replace("<anonymous>", e111.displayName));
                            "function" === typeof e111 && nr.set(e111, c4);
                            return c4;
                        }
                    }while (u3 >= 1 && l7 >= 0)
                    break;
                }
            }
        } finally{
            rr = false;
            er.current = a20;
            reenableLogs();
            Error.prepareStackTrace = o27;
        }
        var p4 = e111 ? e111.displayName || e111.name : "";
        var d3 = p4 ? describeBuiltInComponentFrame(p4) : "";
        "function" === typeof e111 && nr.set(e111, d3);
        return d3;
    }
    function describeClassComponentFrame(e115, t, r) {
        return describeNativeComponentFrame(e115, true);
    }
    function describeFunctionComponentFrame(e116, t, r) {
        return describeNativeComponentFrame(e116, false);
    }
    function shouldConstruct(e117) {
        var t72 = e117.prototype;
        return !!(t72 && t72.isReactComponent);
    }
    function describeUnknownElementTypeFrameInDEV(e118, t73, r46) {
        if (null == e118) return "";
        if ("function" === typeof e118) return describeNativeComponentFrame(e118, shouldConstruct(e118));
        if ("string" === typeof e118) return describeBuiltInComponentFrame(e118);
        switch(e118){
            case Bt:
                return describeBuiltInComponentFrame("Suspense");
            case Lt:
                return describeBuiltInComponentFrame("SuspenseList");
        }
        if ("object" === typeof e118) switch(e118.$$typeof){
            case Mt:
                return describeFunctionComponentFrame(e118.render);
            case Ot:
                return describeUnknownElementTypeFrameInDEV(e118.type, t73, r46);
            case Ut:
                var n36 = e118;
                var o28 = n36._payload;
                var a21 = n36._init;
                try {
                    return describeUnknownElementTypeFrameInDEV(a21(o28), t73, r46);
                } catch (e) {}
        }
        return "";
    }
    var ar = {};
    var ir = i12.ReactDebugCurrentFrame;
    function setCurrentlyValidatingElement(e119) {
        if (e119) {
            var t74 = e119._owner;
            var r47 = describeUnknownElementTypeFrameInDEV(e119.type, e119._source, t74 ? t74.type : null);
            ir.setExtraStackFrame(r47);
        } else ir.setExtraStackFrame(null);
    }
    function checkPropTypes(e120, t75, r48, n37, o29) {
        var a22 = Function.call.bind(u110);
        for(var i18 in e120)if (a22(e120, i18)) {
            var s13 = void 0;
            try {
                if ("function" !== typeof e120[i18]) {
                    var l8 = Error((n37 || "React class") + ": " + r48 + " type `" + i18 + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e120[i18] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    l8.name = "Invariant Violation";
                    throw l8;
                }
                s13 = e120[i18](t75, i18, n37, r48, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (e121) {
                s13 = e121;
            }
            if (s13 && !(s13 instanceof Error)) {
                setCurrentlyValidatingElement(o29);
                error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n37 || "React class", r48, i18, typeof s13);
                setCurrentlyValidatingElement(null);
            }
            if (s13 instanceof Error && !(s13.message in ar)) {
                ar[s13.message] = true;
                setCurrentlyValidatingElement(o29);
                error("Failed %s type: %s", r48, s13.message);
                setCurrentlyValidatingElement(null);
            }
        }
    }
    var sr;
    sr = {};
    var ur = {};
    Object.freeze(ur);
    function getMaskedContext(e122, t76) {
        var r49 = e122.contextTypes;
        if (!r49) return ur;
        var n38 = {};
        for(var o30 in r49)n38[o30] = t76[o30];
        var a23 = getComponentNameFromType(e122) || "Unknown";
        checkPropTypes(r49, n38, "context", a23);
        return n38;
    }
    function processChildContext(t77, r50, n39, o31) {
        if ("function" !== typeof t77.getChildContext) {
            var a24 = getComponentNameFromType(r50) || "Unknown";
            if (!sr[a24]) {
                sr[a24] = true;
                error("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", a24, a24);
            }
            return n39;
        }
        var i19 = t77.getChildContext();
        for(var s14 in i19)if (!(s14 in o31)) throw new Error((getComponentNameFromType(r50) || "Unknown") + '.getChildContext(): key "' + s14 + '" is not defined in childContextTypes.');
        var u4 = getComponentNameFromType(r50) || "Unknown";
        checkPropTypes(o31, i19, "child context", u4);
        return e15({}, n39, i19);
    }
    var lr;
    lr = {};
    var cr = null;
    var pr = null;
    function popNode(e123) {
        e123.context._currentValue2 = e123.parentValue;
    }
    function pushNode(e124) {
        e124.context._currentValue2 = e124.value;
    }
    function popToNearestCommonAncestor(e125, t78) {
        if (e125 === t78) ;
        else {
            popNode(e125);
            var r51 = e125.parent;
            var n40 = t78.parent;
            if (null === r51) {
                if (null !== n40) throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
            } else {
                if (null === n40) throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
                popToNearestCommonAncestor(r51, n40);
                pushNode(t78);
            }
        }
    }
    function popAllPrevious(e126) {
        popNode(e126);
        var t79 = e126.parent;
        null !== t79 && popAllPrevious(t79);
    }
    function pushAllNext(e127) {
        var t80 = e127.parent;
        null !== t80 && pushAllNext(t80);
        pushNode(e127);
    }
    function popPreviousToCommonLevel(e128, t81) {
        popNode(e128);
        var r52 = e128.parent;
        if (null === r52) throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
        r52.depth === t81.depth ? popToNearestCommonAncestor(r52, t81) : popPreviousToCommonLevel(r52, t81);
    }
    function popNextToCommonLevel(e129, t82) {
        var r53 = t82.parent;
        if (null === r53) throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
        e129.depth === r53.depth ? popToNearestCommonAncestor(e129, r53) : popNextToCommonLevel(e129, r53);
        pushNode(t82);
    }
    function switchContext(e130) {
        var t83 = pr;
        var r54 = e130;
        if (t83 !== r54) {
            null === t83 ? pushAllNext(r54) : null === r54 ? popAllPrevious(t83) : t83.depth === r54.depth ? popToNearestCommonAncestor(t83, r54) : t83.depth > r54.depth ? popPreviousToCommonLevel(t83, r54) : popNextToCommonLevel(t83, r54);
            pr = r54;
        }
    }
    function pushProvider(e131, t84) {
        var r55;
        r55 = e131._currentValue2;
        e131._currentValue2 = t84;
        void 0 !== e131._currentRenderer2 && null !== e131._currentRenderer2 && e131._currentRenderer2 !== lr && error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
        e131._currentRenderer2 = lr;
        var n41 = pr;
        var o32 = {
            parent: n41,
            depth: null === n41 ? 0 : n41.depth + 1,
            context: e131,
            parentValue: r55,
            value: t84
        };
        pr = o32;
        return o32;
    }
    function popProvider(e132) {
        var t85 = pr;
        if (null === t85) throw new Error("Tried to pop a Context at the root of the app. This is a bug in React.");
        t85.context !== e132 && error("The parent context is not the expected context. This is probably a bug in React.");
        t85.context._currentValue2 = t85.parentValue;
        void 0 !== e132._currentRenderer2 && null !== e132._currentRenderer2 && e132._currentRenderer2 !== lr && error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
        e132._currentRenderer2 = lr;
        return pr = t85.parent;
    }
    function getActiveContext() {
        return pr;
    }
    function readContext(e133) {
        var t86 = e133._currentValue2;
        return t86;
    }
    function get(e134) {
        return e134._reactInternals;
    }
    function set(e135, t87) {
        e135._reactInternals = t87;
    }
    var dr = {};
    var fr = {};
    var hr;
    var mr;
    var vr;
    var gr;
    var yr;
    var kr;
    var Cr;
    var br;
    var Sr;
    hr = new Set;
    mr = new Set;
    vr = new Set;
    Cr = new Set;
    gr = new Set;
    br = new Set;
    Sr = new Set;
    var wr = new Set;
    kr = function(e136, t88) {
        if (null !== e136 && "function" !== typeof e136) {
            var r56 = t88 + "_" + e136;
            if (!wr.has(r56)) {
                wr.add(r56);
                error("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t88, e136);
            }
        }
    };
    yr = function(e137, t89) {
        if (void 0 === t89) {
            var r57 = getComponentNameFromType(e137) || "Component";
            if (!gr.has(r57)) {
                gr.add(r57);
                error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", r57);
            }
        }
    };
    function warnNoop(e138, t90) {
        var r58 = e138.constructor;
        var n42 = r58 && getComponentNameFromType(r58) || "ReactClass";
        var o33 = n42 + "." + t90;
        if (!dr[o33]) {
            error("%s(...): Can only update a mounting component. This usually means you called %s() outside componentWillMount() on the server. This is a no-op.\n\nPlease check the code for the %s component.", t90, t90, n42);
            dr[o33] = true;
        }
    }
    var xr = {
        isMounted: function(e) {
            return false;
        },
        enqueueSetState: function(e139, t91, r59) {
            var n43 = get(e139);
            if (null === n43.queue) warnNoop(e139, "setState");
            else {
                n43.queue.push(t91);
                void 0 !== r59 && null !== r59 && kr(r59, "setState");
            }
        },
        enqueueReplaceState: function(e140, t92, r60) {
            var n44 = get(e140);
            n44.replace = true;
            n44.queue = [
                t92
            ];
            void 0 !== r60 && null !== r60 && kr(r60, "setState");
        },
        enqueueForceUpdate: function(e141, t93) {
            var r61 = get(e141);
            null === r61.queue ? warnNoop(e141, "forceUpdate") : void 0 !== t93 && null !== t93 && kr(t93, "setState");
        }
    };
    function applyDerivedStateFromProps(t, r62, n45, o34, a25) {
        var i20 = n45(a25, o34);
        yr(r62, i20);
        var s15 = null === i20 || void 0 === i20 ? o34 : e15({}, o34, i20);
        return s15;
    }
    function constructClassInstance(e142, t94, r63) {
        var n46 = ur;
        var o35 = e142.contextType;
        if ("contextType" in e142) {
            var a26 = null === o35 || void 0 !== o35 && o35.$$typeof === At && void 0 === o35._context;
            if (!a26 && !Sr.has(e142)) {
                Sr.add(e142);
                var i21 = "";
                i21 = void 0 === o35 ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : "object" !== typeof o35 ? " However, it is set to a " + typeof o35 + "." : o35.$$typeof === Nt ? " Did you accidentally pass the Context.Provider instead?" : void 0 !== o35._context ? " Did you accidentally pass the Context.Consumer instead?" : " However, it is set to an object with keys {" + Object.keys(o35).join(", ") + "}.";
                error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", getComponentNameFromType(e142) || "Component", i21);
            }
        }
        n46 = "object" === typeof o35 && null !== o35 ? readContext(o35) : r63;
        var s16 = new e142(t94, n46);
        if ("function" === typeof e142.getDerivedStateFromProps && (null === s16.state || void 0 === s16.state)) {
            var u5 = getComponentNameFromType(e142) || "Component";
            if (!hr.has(u5)) {
                hr.add(u5);
                error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", u5, null === s16.state ? "null" : "undefined", u5);
            }
        }
        if ("function" === typeof e142.getDerivedStateFromProps || "function" === typeof s16.getSnapshotBeforeUpdate) {
            var l9 = null;
            var c5 = null;
            var p5 = null;
            "function" === typeof s16.componentWillMount && true !== s16.componentWillMount.__suppressDeprecationWarning ? l9 = "componentWillMount" : "function" === typeof s16.UNSAFE_componentWillMount && (l9 = "UNSAFE_componentWillMount");
            "function" === typeof s16.componentWillReceiveProps && true !== s16.componentWillReceiveProps.__suppressDeprecationWarning ? c5 = "componentWillReceiveProps" : "function" === typeof s16.UNSAFE_componentWillReceiveProps && (c5 = "UNSAFE_componentWillReceiveProps");
            "function" === typeof s16.componentWillUpdate && true !== s16.componentWillUpdate.__suppressDeprecationWarning ? p5 = "componentWillUpdate" : "function" === typeof s16.UNSAFE_componentWillUpdate && (p5 = "UNSAFE_componentWillUpdate");
            if (null !== l9 || null !== c5 || null !== p5) {
                var d4 = getComponentNameFromType(e142) || "Component";
                var f4 = "function" === typeof e142.getDerivedStateFromProps ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
                if (!vr.has(d4)) {
                    vr.add(d4);
                    error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://reactjs.org/link/unsafe-component-lifecycles", d4, f4, null !== l9 ? "\n  " + l9 : "", null !== c5 ? "\n  " + c5 : "", null !== p5 ? "\n  " + p5 : "");
                }
            }
        }
        return s16;
    }
    function checkClassInstance(e143, t95, r64) {
        var n47 = getComponentNameFromType(t95) || "Component";
        var o36 = e143.render;
        o36 || (t95.prototype && "function" === typeof t95.prototype.render ? error("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", n47) : error("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", n47));
        !e143.getInitialState || e143.getInitialState.isReactClassApproved || e143.state || error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", n47);
        e143.getDefaultProps && !e143.getDefaultProps.isReactClassApproved && error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", n47);
        e143.propTypes && error("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", n47);
        e143.contextType && error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", n47);
        e143.contextTypes && error("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", n47);
        if (t95.contextType && t95.contextTypes && !br.has(t95)) {
            br.add(t95);
            error("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", n47);
        }
        "function" === typeof e143.componentShouldUpdate && error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", n47);
        t95.prototype && t95.prototype.isPureReactComponent && "undefined" !== typeof e143.shouldComponentUpdate && error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", getComponentNameFromType(t95) || "A pure component");
        "function" === typeof e143.componentDidUnmount && error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", n47);
        "function" === typeof e143.componentDidReceiveProps && error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", n47);
        "function" === typeof e143.componentWillRecieveProps && error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", n47);
        "function" === typeof e143.UNSAFE_componentWillRecieveProps && error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", n47);
        var a27 = e143.props !== r64;
        void 0 !== e143.props && a27 && error("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", n47, n47);
        e143.defaultProps && error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", n47, n47);
        if ("function" === typeof e143.getSnapshotBeforeUpdate && "function" !== typeof e143.componentDidUpdate && !mr.has(t95)) {
            mr.add(t95);
            error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", getComponentNameFromType(t95));
        }
        "function" === typeof e143.getDerivedStateFromProps && error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", n47);
        "function" === typeof e143.getDerivedStateFromError && error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", n47);
        "function" === typeof t95.getSnapshotBeforeUpdate && error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", n47);
        var i22 = e143.state;
        i22 && ("object" !== typeof i22 || isArray(i22)) && error("%s.state: must be set to an object or null", n47);
        "function" === typeof e143.getChildContext && "object" !== typeof t95.childContextTypes && error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", n47);
    }
    function callComponentWillMount(e144, t96) {
        var r65 = t96.state;
        if ("function" === typeof t96.componentWillMount) {
            if (true !== t96.componentWillMount.__suppressDeprecationWarning) {
                var n48 = getComponentNameFromType(e144) || "Unknown";
                if (!fr[n48]) {
                    warn("componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move code from componentWillMount to componentDidMount (preferred in most cases) or the constructor.\n\nPlease update the following components: %s", n48);
                    fr[n48] = true;
                }
            }
            t96.componentWillMount();
        }
        "function" === typeof t96.UNSAFE_componentWillMount && t96.UNSAFE_componentWillMount();
        if (r65 !== t96.state) {
            error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", getComponentNameFromType(e144) || "Component");
            xr.enqueueReplaceState(t96, t96.state, null);
        }
    }
    function processUpdateQueue(t97, r66, n49, o37) {
        if (null !== t97.queue && t97.queue.length > 0) {
            var a28 = t97.queue;
            var i23 = t97.replace;
            t97.queue = null;
            t97.replace = false;
            if (i23 && 1 === a28.length) r66.state = a28[0];
            else {
                var s17 = i23 ? a28[0] : r66.state;
                var u6 = true;
                for(var l10 = i23 ? 1 : 0; l10 < a28.length; l10++){
                    var c6 = a28[l10];
                    var p6 = "function" === typeof c6 ? c6.call(r66, s17, n49, o37) : c6;
                    if (null != p6) if (u6) {
                        u6 = false;
                        s17 = e15({}, s17, p6);
                    } else e15(s17, p6);
                }
                r66.state = s17;
            }
        } else t97.queue = null;
    }
    function mountClassInstance(e145, t98, r67, n50) {
        checkClassInstance(e145, t98, r67);
        var o38 = void 0 !== e145.state ? e145.state : null;
        e145.updater = xr;
        e145.props = r67;
        e145.state = o38;
        var a29 = {
            queue: [],
            replace: false
        };
        set(e145, a29);
        var i24 = t98.contextType;
        e145.context = "object" === typeof i24 && null !== i24 ? readContext(i24) : n50;
        if (e145.state === r67) {
            var s18 = getComponentNameFromType(t98) || "Component";
            if (!Cr.has(s18)) {
                Cr.add(s18);
                error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", s18);
            }
        }
        var u7 = t98.getDerivedStateFromProps;
        "function" === typeof u7 && (e145.state = applyDerivedStateFromProps(e145, t98, u7, o38, r67));
        if ("function" !== typeof t98.getDerivedStateFromProps && "function" !== typeof e145.getSnapshotBeforeUpdate && ("function" === typeof e145.UNSAFE_componentWillMount || "function" === typeof e145.componentWillMount)) {
            callComponentWillMount(t98, e145);
            processUpdateQueue(a29, e145, r67, n50);
        }
    }
    var Tr = {
        id: 1,
        overflow: ""
    };
    function getTreeId(e146) {
        var t99 = e146.overflow;
        var r68 = e146.id;
        var n51 = r68 & ~getLeadingBit(r68);
        return n51.toString(32) + t99;
    }
    function pushTreeContext(e147, t100, r69) {
        var n52 = e147.id;
        var o39 = e147.overflow;
        var a30 = getBitLength(n52) - 1;
        var i25 = n52 & ~(1 << a30);
        var s19 = r69 + 1;
        var u8 = getBitLength(t100) + a30;
        if (u8 > 30) {
            var l11 = a30 - a30 % 5;
            var c7 = (1 << l11) - 1;
            var p7 = (i25 & c7).toString(32);
            var d5 = i25 >> l11;
            var f5 = a30 - l11;
            var h3 = getBitLength(t100) + f5;
            var m4 = s19 << f5;
            var v3 = m4 | d5;
            var g4 = p7 + o39;
            return {
                id: 1 << h3 | v3,
                overflow: g4
            };
        }
        var y4 = s19 << a30;
        var k4 = y4 | i25;
        var C4 = o39;
        return {
            id: 1 << u8 | k4,
            overflow: C4
        };
    }
    function getBitLength(e148) {
        return 32 - Pr(e148);
    }
    function getLeadingBit(e149) {
        return 1 << getBitLength(e149) - 1;
    }
    var Pr = Math.clz32 ? Math.clz32 : clz32Fallback;
    var Rr = Math.log;
    var Ir = Math.LN2;
    function clz32Fallback(e150) {
        var t101 = e150 >>> 0;
        return 0 === t101 ? 32 : 31 - (Rr(t101) / Ir | 0) | 0;
    }
    function is(e151, t102) {
        return e151 === t102 && (0 !== e151 || 1 / e151 === 1 / t102) || e151 !== e151 && t102 !== t102;
    }
    var Er = "function" === typeof Object.is ? Object.is : is;
    var Fr = null;
    var Dr = null;
    var Nr = null;
    var Ar = null;
    var Mr = false;
    var Br = false;
    var Lr = 0;
    var Or = null;
    var Ur = 0;
    var Hr = 25;
    var _r = false;
    var Wr;
    function resolveCurrentlyRenderingComponent() {
        if (null === Fr) throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
        _r && error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
        return Fr;
    }
    function areHookInputsEqual(e152, t103) {
        if (null === t103) {
            error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", Wr);
            return false;
        }
        e152.length !== t103.length && error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", Wr, "[" + e152.join(", ") + "]", "[" + t103.join(", ") + "]");
        for(var r70 = 0; r70 < t103.length && r70 < e152.length; r70++)if (!Er(e152[r70], t103[r70])) return false;
        return true;
    }
    function createHook() {
        if (Ur > 0) throw new Error("Rendered more hooks than during the previous render");
        return {
            memoizedState: null,
            queue: null,
            next: null
        };
    }
    function createWorkInProgressHook() {
        if (null === Ar) if (null === Nr) {
            Mr = false;
            Nr = Ar = createHook();
        } else {
            Mr = true;
            Ar = Nr;
        }
        else if (null === Ar.next) {
            Mr = false;
            Ar = Ar.next = createHook();
        } else {
            Mr = true;
            Ar = Ar.next;
        }
        return Ar;
    }
    function prepareToUseHooks(e153, t104) {
        Fr = t104;
        Dr = e153;
        _r = false;
        Lr = 0;
    }
    function finishHooks(e154, t105, r71, n53) {
        while(Br){
            Br = false;
            Lr = 0;
            Ur += 1;
            Ar = null;
            r71 = e154(t105, n53);
        }
        resetHooksState();
        return r71;
    }
    function checkDidRenderIdHook() {
        var e155 = 0 !== Lr;
        return e155;
    }
    function resetHooksState() {
        _r = false;
        Fr = null;
        Dr = null;
        Br = false;
        Nr = null;
        Ur = 0;
        Or = null;
        Ar = null;
    }
    function readContext$1(e156) {
        _r && error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
        return readContext(e156);
    }
    function useContext(e157) {
        Wr = "useContext";
        resolveCurrentlyRenderingComponent();
        return readContext(e157);
    }
    function basicStateReducer(e158, t106) {
        return "function" === typeof t106 ? t106(e158) : t106;
    }
    function useState(e159) {
        Wr = "useState";
        return useReducer(basicStateReducer, e159);
    }
    function useReducer(e160, t107, r72) {
        e160 !== basicStateReducer && (Wr = "useReducer");
        Fr = resolveCurrentlyRenderingComponent();
        Ar = createWorkInProgressHook();
        if (Mr) {
            var n54 = Ar.queue;
            var o40 = n54.dispatch;
            if (null !== Or) {
                var a31 = Or.get(n54);
                if (void 0 !== a31) {
                    Or.delete(n54);
                    var i26 = Ar.memoizedState;
                    var s20 = a31;
                    do {
                        var u9 = s20.action;
                        _r = true;
                        i26 = e160(i26, u9);
                        _r = false;
                        s20 = s20.next;
                    }while (null !== s20)
                    Ar.memoizedState = i26;
                    return [
                        i26,
                        o40
                    ];
                }
            }
            return [
                Ar.memoizedState,
                o40
            ];
        }
        _r = true;
        var l12;
        l12 = e160 === basicStateReducer ? "function" === typeof t107 ? t107() : t107 : void 0 !== r72 ? r72(t107) : t107;
        _r = false;
        Ar.memoizedState = l12;
        var c8 = Ar.queue = {
            last: null,
            dispatch: null
        };
        var p8 = c8.dispatch = dispatchAction.bind(null, Fr, c8);
        return [
            Ar.memoizedState,
            p8
        ];
    }
    function useMemo(e161, t108) {
        Fr = resolveCurrentlyRenderingComponent();
        Ar = createWorkInProgressHook();
        var r73 = void 0 === t108 ? null : t108;
        if (null !== Ar) {
            var n55 = Ar.memoizedState;
            if (null !== n55 && null !== r73) {
                var o41 = n55[1];
                if (areHookInputsEqual(r73, o41)) return n55[0];
            }
        }
        _r = true;
        var a32 = e161();
        _r = false;
        Ar.memoizedState = [
            a32,
            r73
        ];
        return a32;
    }
    function useRef(e162) {
        Fr = resolveCurrentlyRenderingComponent();
        Ar = createWorkInProgressHook();
        var t109 = Ar.memoizedState;
        if (null === t109) {
            var r74 = {
                current: e162
            };
            Object.seal(r74);
            Ar.memoizedState = r74;
            return r74;
        }
        return t109;
    }
    function useLayoutEffect(e, t) {
        Wr = "useLayoutEffect";
        error("useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://reactjs.org/link/uselayouteffect-ssr for common fixes.");
    }
    function dispatchAction(e163, t110, r75) {
        if (Ur >= Hr) throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        if (e163 === Fr) {
            Br = true;
            var n56 = {
                action: r75,
                next: null
            };
            null === Or && (Or = new Map);
            var o42 = Or.get(t110);
            if (void 0 === o42) Or.set(t110, n56);
            else {
                var a33 = o42;
                while(null !== a33.next)a33 = a33.next;
                a33.next = n56;
            }
        }
    }
    function useCallback(e164, t111) {
        return useMemo(function() {
            return e164;
        }, t111);
    }
    function useMutableSource(e165, t112, r) {
        resolveCurrentlyRenderingComponent();
        return t112(e165._source);
    }
    function useSyncExternalStore(e, t, r76) {
        if (void 0 === r76) throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        return r76();
    }
    function useDeferredValue(e166) {
        resolveCurrentlyRenderingComponent();
        return e166;
    }
    function unsupportedStartTransition() {
        throw new Error("startTransition cannot be called during server rendering.");
    }
    function useTransition() {
        resolveCurrentlyRenderingComponent();
        return [
            false,
            unsupportedStartTransition
        ];
    }
    function useId() {
        var e167 = Dr;
        var t113 = getTreeId(e167.treeContext);
        var r77 = zr;
        if (null === r77) throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
        var n57 = Lr++;
        return makeId(r77, t113, n57);
    }
    function noop() {}
    var jr = {
        readContext: readContext$1,
        useContext: useContext,
        useMemo: useMemo,
        useReducer: useReducer,
        useRef: useRef,
        useState: useState,
        useInsertionEffect: noop,
        useLayoutEffect: useLayoutEffect,
        useCallback: useCallback,
        useImperativeHandle: noop,
        useEffect: noop,
        useDebugValue: noop,
        useDeferredValue: useDeferredValue,
        useTransition: useTransition,
        useId: useId,
        useMutableSource: useMutableSource,
        useSyncExternalStore: useSyncExternalStore
    };
    var zr = null;
    function setCurrentResponseState(e168) {
        zr = e168;
    }
    function getStackByComponentStackNode(e169) {
        try {
            var t114 = "";
            var r78 = e169;
            do {
                switch(r78.tag){
                    case 0:
                        t114 += describeBuiltInComponentFrame(r78.type, null, null);
                        break;
                    case 1:
                        t114 += describeFunctionComponentFrame(r78.type, null, null);
                        break;
                    case 2:
                        t114 += describeClassComponentFrame(r78.type, null, null);
                        break;
                }
                r78 = r78.parent;
            }while (r78)
            return t114;
        } catch (e170) {
            return "\nError generating stack: " + e170.message + "\n" + e170.stack;
        }
    }
    var Vr = i12.ReactCurrentDispatcher;
    var $r = i12.ReactDebugCurrentFrame;
    var qr = 0;
    var Yr = 1;
    var Xr = 2;
    var Gr = 3;
    var Zr = 4;
    var Qr = 0;
    var Kr = 1;
    var Jr = 2;
    var en = 12800;
    function defaultErrorHandler(e171) {
        console.error(e171);
    }
    function noop$1() {}
    function createRequest(e172, t115, r79, n58, o43, a34, i27) {
        var s21 = [];
        var u10 = new Set;
        var l13 = {
            destination: null,
            responseState: t115,
            progressiveChunkSize: void 0 === n58 ? en : n58,
            status: Qr,
            fatalError: null,
            nextSegmentId: 0,
            allPendingTasks: 0,
            pendingRootTasks: 0,
            completedRootSegment: null,
            abortableTasks: u10,
            pingedTasks: s21,
            clientRenderedBoundaries: [],
            completedBoundaries: [],
            partialBoundaries: [],
            onError: void 0 === o43 ? defaultErrorHandler : o43,
            onCompleteAll: void 0 === a34 ? noop$1 : a34,
            onCompleteShell: void 0 === i27 ? noop$1 : i27
        };
        var c9 = createPendingSegment(l13, 0, null, r79);
        c9.parentFlushed = true;
        var p9 = createTask(l13, e172, null, c9, u10, ur, cr, Tr);
        s21.push(p9);
        return l13;
    }
    function pingTask(e173, t116) {
        var r80 = e173.pingedTasks;
        r80.push(t116);
        1 === r80.length && scheduleWork(function() {
            return performWork(e173);
        });
    }
    function createSuspenseBoundary(e, t117) {
        return {
            id: fe,
            rootSegmentID: -1,
            parentFlushed: false,
            pendingTasks: 0,
            forceClientRender: false,
            completedSegments: [],
            byteSize: 0,
            fallbackAbortableTasks: t117
        };
    }
    function createTask(e174, t118, r81, n59, o44, a35, i28, s22) {
        e174.allPendingTasks++;
        null === r81 ? e174.pendingRootTasks++ : r81.pendingTasks++;
        var u11 = {
            node: t118,
            ping: function() {
                return pingTask(e174, u11);
            },
            blockedBoundary: r81,
            blockedSegment: n59,
            abortSet: o44,
            legacyContext: a35,
            context: i28,
            treeContext: s22
        };
        u11.componentStack = null;
        o44.add(u11);
        return u11;
    }
    function createPendingSegment(e, t119, r82, n60) {
        return {
            status: qr,
            id: -1,
            index: t119,
            parentFlushed: false,
            chunks: [],
            children: [],
            formatContext: n60,
            boundary: r82
        };
    }
    var tn = null;
    function getCurrentStackInDEV() {
        return null === tn || null === tn.componentStack ? "" : getStackByComponentStackNode(tn.componentStack);
    }
    function pushBuiltInComponentStackInDEV(e175, t120) {
        e175.componentStack = {
            tag: 0,
            parent: e175.componentStack,
            type: t120
        };
    }
    function pushFunctionComponentStackInDEV(e176, t121) {
        e176.componentStack = {
            tag: 1,
            parent: e176.componentStack,
            type: t121
        };
    }
    function pushClassComponentStackInDEV(e177, t122) {
        e177.componentStack = {
            tag: 2,
            parent: e177.componentStack,
            type: t122
        };
    }
    function popComponentStackInDEV(e178) {
        null === e178.componentStack ? error("Unexpectedly popped too many stack frames. This is a bug in React.") : e178.componentStack = e178.componentStack.parent;
    }
    function reportError(e179, t123) {
        var r83 = e179.onError;
        r83(t123);
    }
    function fatalError(e180, t124) {
        if (null !== e180.destination) {
            e180.status = Jr;
            closeWithError(e180.destination, t124);
        } else {
            e180.status = Kr;
            e180.fatalError = t124;
        }
    }
    function renderSuspenseBoundary(e181, t125, r84) {
        pushBuiltInComponentStackInDEV(t125, "Suspense");
        var n61 = t125.blockedBoundary;
        var o45 = t125.blockedSegment;
        var a36 = r84.fallback;
        var i29 = r84.children;
        var s23 = new Set;
        var u12 = createSuspenseBoundary(e181, s23);
        var l14 = o45.chunks.length;
        var c10 = createPendingSegment(e181, l14, u12, o45.formatContext);
        o45.children.push(c10);
        var p10 = createPendingSegment(e181, 0, null, o45.formatContext);
        p10.parentFlushed = true;
        t125.blockedBoundary = u12;
        t125.blockedSegment = p10;
        try {
            renderNode(e181, t125, i29);
            p10.status = Yr;
            u12.completedSegments.push(p10);
            if (0 === u12.pendingTasks) {
                popComponentStackInDEV(t125);
                return;
            }
        } catch (t126) {
            p10.status = Zr;
            reportError(e181, t126);
            u12.forceClientRender = true;
        } finally{
            t125.blockedBoundary = n61;
            t125.blockedSegment = o45;
        }
        var d6 = createTask(e181, a36, n61, c10, s23, t125.legacyContext, t125.context, t125.treeContext);
        d6.componentStack = t125.componentStack;
        e181.pingedTasks.push(d6);
        popComponentStackInDEV(t125);
    }
    function renderHostElement(e182, t127, r85, n62) {
        pushBuiltInComponentStackInDEV(t127, r85);
        var o46 = t127.blockedSegment;
        var a37 = pushStartInstance(o46.chunks, r85, n62, e182.responseState, o46.formatContext);
        var i30 = o46.formatContext;
        o46.formatContext = getChildFormatContext(i30, r85, n62);
        renderNode(e182, t127, a37);
        o46.formatContext = i30;
        pushEndInstance(o46.chunks, r85);
        popComponentStackInDEV(t127);
    }
    function shouldConstruct$1(e183) {
        return e183.prototype && e183.prototype.isReactComponent;
    }
    function renderWithHooks(e, t128, r86, n63, o47) {
        var a38 = {};
        prepareToUseHooks(t128, a38);
        var i31 = r86(n63, o47);
        return finishHooks(r86, n63, i31, o47);
    }
    function finishClassComponent(e184, t129, r87, n64, o48) {
        var a39 = r87.render();
        if (r87.props !== o48) {
            sn || error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", getComponentNameFromType(n64) || "a component");
            sn = true;
        }
        var i32 = n64.childContextTypes;
        if (null === i32 || void 0 === i32) renderNodeDestructive(e184, t129, a39);
        else {
            var s24 = t129.legacyContext;
            var u13 = processChildContext(r87, n64, s24, i32);
            t129.legacyContext = u13;
            renderNodeDestructive(e184, t129, a39);
            t129.legacyContext = s24;
        }
    }
    function renderClassComponent(e185, t130, r88, n65) {
        pushClassComponentStackInDEV(t130, r88);
        var o49 = getMaskedContext(r88, t130.legacyContext);
        var a40 = constructClassInstance(r88, n65, o49);
        mountClassInstance(a40, r88, n65, o49);
        finishClassComponent(e185, t130, a40, r88, n65);
        popComponentStackInDEV(t130);
    }
    var rn = {};
    var nn = {};
    var on = {};
    var an = {};
    var sn = false;
    var un = false;
    var ln = false;
    var cn = false;
    function renderIndeterminateComponent(e186, t131, r89, n66) {
        var o50;
        o50 = getMaskedContext(r89, t131.legacyContext);
        pushFunctionComponentStackInDEV(t131, r89);
        if (r89.prototype && "function" === typeof r89.prototype.render) {
            var a41 = getComponentNameFromType(r89) || "Unknown";
            if (!rn[a41]) {
                error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", a41, a41);
                rn[a41] = true;
            }
        }
        var i33 = renderWithHooks(e186, t131, r89, n66, o50);
        var s25 = checkDidRenderIdHook();
        if ("object" === typeof i33 && null !== i33 && "function" === typeof i33.render && void 0 === i33.$$typeof) {
            var u14 = getComponentNameFromType(r89) || "Unknown";
            if (!nn[u14]) {
                error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", u14, u14, u14);
                nn[u14] = true;
            }
        }
        if ("object" === typeof i33 && null !== i33 && "function" === typeof i33.render && void 0 === i33.$$typeof) {
            var l15 = getComponentNameFromType(r89) || "Unknown";
            if (!nn[l15]) {
                error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", l15, l15, l15);
                nn[l15] = true;
            }
            mountClassInstance(i33, r89, n66, o50);
            finishClassComponent(e186, t131, i33, r89, n66);
        } else {
            validateFunctionComponentInDev(r89);
            if (s25) {
                var c11 = t131.treeContext;
                var p11 = 1;
                var d7 = 0;
                t131.treeContext = pushTreeContext(c11, p11, d7);
                try {
                    renderNodeDestructive(e186, t131, i33);
                } finally{
                    t131.treeContext = c11;
                }
            } else renderNodeDestructive(e186, t131, i33);
        }
        popComponentStackInDEV(t131);
    }
    function validateFunctionComponentInDev(e187) {
        e187 && e187.childContextTypes && error("%s(...): childContextTypes cannot be defined on a function component.", e187.displayName || e187.name || "Component");
        if ("function" === typeof e187.getDerivedStateFromProps) {
            var t132 = getComponentNameFromType(e187) || "Unknown";
            if (!an[t132]) {
                error("%s: Function components do not support getDerivedStateFromProps.", t132);
                an[t132] = true;
            }
        }
        if ("object" === typeof e187.contextType && null !== e187.contextType) {
            var r90 = getComponentNameFromType(e187) || "Unknown";
            if (!on[r90]) {
                error("%s: Function components do not support contextType.", r90);
                on[r90] = true;
            }
        }
    }
    function resolveDefaultProps(t133, r91) {
        if (t133 && t133.defaultProps) {
            var n67 = e15({}, r91);
            var o51 = t133.defaultProps;
            for(var a42 in o51)void 0 === n67[a42] && (n67[a42] = o51[a42]);
            return n67;
        }
        return r91;
    }
    function renderForwardRef(e188, t134, r92, n68, o52) {
        pushFunctionComponentStackInDEV(t134, r92.render);
        var a43 = renderWithHooks(e188, t134, r92.render, n68, o52);
        var i34 = checkDidRenderIdHook();
        if (i34) {
            var s26 = t134.treeContext;
            var u15 = 1;
            var l16 = 0;
            t134.treeContext = pushTreeContext(s26, u15, l16);
            try {
                renderNodeDestructive(e188, t134, a43);
            } finally{
                t134.treeContext = s26;
            }
        } else renderNodeDestructive(e188, t134, a43);
        popComponentStackInDEV(t134);
    }
    function renderMemo(e189, t135, r93, n69, o53) {
        var a44 = r93.type;
        var i35 = resolveDefaultProps(a44, n69);
        renderElement(e189, t135, a44, i35, o53);
    }
    function renderContextConsumer(e190, t136, r94, n70) {
        if (void 0 === r94._context) {
            if (r94 !== r94.Consumer && !cn) {
                cn = true;
                error("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
            }
        } else r94 = r94._context;
        var o54 = n70.children;
        "function" !== typeof o54 && error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it.");
        var a45 = readContext(r94);
        var i36 = o54(a45);
        renderNodeDestructive(e190, t136, i36);
    }
    function renderContextProvider(e191, t137, r95, n71) {
        var o55 = r95._context;
        var a46 = n71.value;
        var i37 = n71.children;
        var s27;
        s27 = t137.context;
        t137.context = pushProvider(o55, a46);
        renderNodeDestructive(e191, t137, i37);
        t137.context = popProvider(o55);
        s27 !== t137.context && error("Popping the context provider did not return back to the original snapshot. This is a bug in React.");
    }
    function renderLazyComponent(e192, t138, r96, n72, o56) {
        pushBuiltInComponentStackInDEV(t138, "Lazy");
        var a47 = r96._payload;
        var i38 = r96._init;
        var s28 = i38(a47);
        var u16 = resolveDefaultProps(s28, n72);
        renderElement(e192, t138, s28, u16, o56);
        popComponentStackInDEV(t138);
    }
    function renderElement(e193, t139, r97, n73, o57) {
        if ("function" !== typeof r97) {
            if ("string" !== typeof r97) {
                switch(r97){
                    case Wt:
                    case _t:
                    case Ft:
                    case Dt:
                    case Et:
                        renderNodeDestructive(e193, t139, n73.children);
                        return;
                    case Lt:
                        pushBuiltInComponentStackInDEV(t139, "SuspenseList");
                        renderNodeDestructive(e193, t139, n73.children);
                        popComponentStackInDEV(t139);
                        return;
                    case Ht:
                        throw new Error("ReactDOMServer does not yet support scope components.");
                    case Bt:
                        renderSuspenseBoundary(e193, t139, n73);
                        return;
                }
                if ("object" === typeof r97 && null !== r97) switch(r97.$$typeof){
                    case Mt:
                        renderForwardRef(e193, t139, r97, n73, o57);
                        return;
                    case Ot:
                        renderMemo(e193, t139, r97, n73, o57);
                        return;
                    case Nt:
                        renderContextProvider(e193, t139, r97, n73);
                        return;
                    case At:
                        renderContextConsumer(e193, t139, r97, n73);
                        return;
                    case Ut:
                        renderLazyComponent(e193, t139, r97, n73);
                        return;
                }
                var a48 = "";
                (void 0 === r97 || "object" === typeof r97 && null !== r97 && 0 === Object.keys(r97).length) && (a48 += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (null == r97 ? r97 : typeof r97) + "." + a48);
            }
            renderHostElement(e193, t139, r97, n73);
        } else {
            if (shouldConstruct$1(r97)) {
                renderClassComponent(e193, t139, r97, n73);
                return;
            }
            renderIndeterminateComponent(e193, t139, r97, n73);
        }
    }
    function validateIterable(e194, t140) {
        if ("function" === typeof Symbol && "Generator" === e194[Symbol.toStringTag]) {
            un || error("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers.");
            un = true;
        }
        if (e194.entries === t140) {
            ln || error("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
            ln = true;
        }
    }
    function renderNodeDestructive(e195, t141, r98) {
        t141.node = r98;
        if ("object" === typeof r98 && null !== r98) {
            switch(r98.$$typeof){
                case Rt:
                    var n74 = r98;
                    var o58 = n74.type;
                    var a49 = n74.props;
                    var i39 = n74.ref;
                    renderElement(e195, t141, o58, a49, i39);
                    return;
                case It:
                    throw new Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
                case Ut:
                    var s29 = r98;
                    var u17 = s29._payload;
                    var l17 = s29._init;
                    var c12 = l17(u17);
                    renderNodeDestructive(e195, t141, c12);
                    return;
            }
            if (isArray(r98)) {
                renderChildrenArray(e195, t141, r98);
                return;
            }
            var p12 = getIteratorFn(r98);
            if (p12) {
                validateIterable(r98, p12());
                var d8 = p12.call(r98);
                if (d8) {
                    var f6 = d8.next();
                    if (!f6.done) {
                        var h4 = [];
                        do {
                            h4.push(f6.value);
                            f6 = d8.next();
                        }while (!f6.done)
                        renderChildrenArray(e195, t141, h4);
                        return;
                    }
                    return;
                }
            }
            var m5 = Object.prototype.toString.call(r98);
            throw new Error("Objects are not valid as a React child (found: " + ("[object Object]" === m5 ? "object with keys {" + Object.keys(r98).join(", ") + "}" : m5) + "). If you meant to render a collection of children, use an array instead.");
        }
        "string" !== typeof r98 ? "number" !== typeof r98 ? "function" === typeof r98 && error("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.") : pushTextInstance$1(t141.blockedSegment.chunks, "" + r98, e195.responseState) : pushTextInstance$1(t141.blockedSegment.chunks, r98, e195.responseState);
    }
    function renderChildrenArray(e196, t142, r99) {
        var n75 = r99.length;
        for(var o59 = 0; o59 < n75; o59++){
            var a50 = t142.treeContext;
            t142.treeContext = pushTreeContext(a50, n75, o59);
            try {
                renderNode(e196, t142, r99[o59]);
            } finally{
                t142.treeContext = a50;
            }
        }
    }
    function spawnNewSuspendedTask(e197, t143, r100) {
        var n76 = t143.blockedSegment;
        var o60 = n76.chunks.length;
        var a51 = createPendingSegment(e197, o60, null, n76.formatContext);
        n76.children.push(a51);
        var i40 = createTask(e197, t143.node, t143.blockedBoundary, a51, t143.abortSet, t143.legacyContext, t143.context, t143.treeContext);
        null !== t143.componentStack && (i40.componentStack = t143.componentStack.parent);
        var s30 = i40.ping;
        r100.then(s30, s30);
    }
    function renderNode(e198, t144, r101) {
        var n77 = t144.blockedSegment.formatContext;
        var o61 = t144.legacyContext;
        var a52 = t144.context;
        var i41 = null;
        i41 = t144.componentStack;
        try {
            return renderNodeDestructive(e198, t144, r101);
        } catch (r102) {
            resetHooksState();
            if ("object" === typeof r102 && null !== r102 && "function" === typeof r102.then) {
                spawnNewSuspendedTask(e198, t144, r102);
                t144.blockedSegment.formatContext = n77;
                t144.legacyContext = o61;
                t144.context = a52;
                switchContext(a52);
                t144.componentStack = i41;
                return;
            }
            t144.blockedSegment.formatContext = n77;
            t144.legacyContext = o61;
            t144.context = a52;
            switchContext(a52);
            t144.componentStack = i41;
            throw r102;
        }
    }
    function erroredTask(e199, t145, r, n78) {
        reportError(e199, n78);
        if (null === t145) fatalError(e199, n78);
        else {
            t145.pendingTasks--;
            if (!t145.forceClientRender) {
                t145.forceClientRender = true;
                t145.parentFlushed && e199.clientRenderedBoundaries.push(t145);
            }
        }
        e199.allPendingTasks--;
        if (0 === e199.allPendingTasks) {
            var o62 = e199.onCompleteAll;
            o62();
        }
    }
    function abortTaskSoft(e200) {
        var t146 = this;
        var r103 = e200.blockedBoundary;
        var n79 = e200.blockedSegment;
        n79.status = Gr;
        finishedTask(t146, r103, n79);
    }
    function abortTask(e201) {
        var t147 = this;
        var r104 = e201.blockedBoundary;
        var n80 = e201.blockedSegment;
        n80.status = Gr;
        if (null === r104) {
            t147.allPendingTasks--;
            if (t147.status !== Jr) {
                t147.status = Jr;
                null !== t147.destination && close(t147.destination);
            }
        } else {
            r104.pendingTasks--;
            if (!r104.forceClientRender) {
                r104.forceClientRender = true;
                r104.parentFlushed && t147.clientRenderedBoundaries.push(r104);
            }
            r104.fallbackAbortableTasks.forEach(abortTask, t147);
            r104.fallbackAbortableTasks.clear();
            t147.allPendingTasks--;
            if (0 === t147.allPendingTasks) {
                var o63 = t147.onCompleteAll;
                o63();
            }
        }
    }
    function finishedTask(e202, t148, r105) {
        if (null === t148) {
            if (r105.parentFlushed) {
                if (null !== e202.completedRootSegment) throw new Error("There can only be one root segment. This is a bug in React.");
                e202.completedRootSegment = r105;
            }
            e202.pendingRootTasks--;
            if (0 === e202.pendingRootTasks) {
                var n81 = e202.onCompleteShell;
                n81();
            }
        } else {
            t148.pendingTasks--;
            if (t148.forceClientRender) ;
            else if (0 === t148.pendingTasks) {
                r105.parentFlushed && r105.status === Yr && t148.completedSegments.push(r105);
                t148.parentFlushed && e202.completedBoundaries.push(t148);
                t148.fallbackAbortableTasks.forEach(abortTaskSoft, e202);
                t148.fallbackAbortableTasks.clear();
            } else if (r105.parentFlushed && r105.status === Yr) {
                var o64 = t148.completedSegments;
                o64.push(r105);
                1 === o64.length && t148.parentFlushed && e202.partialBoundaries.push(t148);
            }
        }
        e202.allPendingTasks--;
        if (0 === e202.allPendingTasks) {
            var a53 = e202.onCompleteAll;
            a53();
        }
    }
    function retryTask(e203, t149) {
        var r106 = t149.blockedSegment;
        if (r106.status === qr) {
            switchContext(t149.context);
            var n82 = null;
            n82 = tn;
            tn = t149;
            try {
                renderNodeDestructive(e203, t149, t149.node);
                t149.abortSet.delete(t149);
                r106.status = Yr;
                finishedTask(e203, t149.blockedBoundary, r106);
            } catch (n83) {
                resetHooksState();
                if ("object" === typeof n83 && null !== n83 && "function" === typeof n83.then) {
                    var o65 = t149.ping;
                    n83.then(o65, o65);
                } else {
                    t149.abortSet.delete(t149);
                    r106.status = Zr;
                    erroredTask(e203, t149.blockedBoundary, r106, n83);
                }
            } finally{
                tn = n82;
            }
        }
    }
    function performWork(e204) {
        if (e204.status !== Jr) {
            var t151 = getActiveContext();
            var r107 = Vr.current;
            Vr.current = jr;
            var n84;
            n84 = $r.getCurrentStack;
            $r.getCurrentStack = getCurrentStackInDEV;
            var o66 = zr;
            setCurrentResponseState(e204.responseState);
            try {
                var a54 = e204.pingedTasks;
                var i42;
                for(i42 = 0; i42 < a54.length; i42++){
                    var s31 = a54[i42];
                    retryTask(e204, s31);
                }
                a54.splice(0, i42);
                null !== e204.destination && flushCompletedQueues(e204, e204.destination);
            } catch (t150) {
                reportError(e204, t150);
                fatalError(e204, t150);
            } finally{
                setCurrentResponseState(o66);
                Vr.current = r107;
                $r.getCurrentStack = n84;
                r107 === jr && switchContext(t151);
            }
        }
    }
    function flushSubtree(e205, t152, r108) {
        r108.parentFlushed = true;
        switch(r108.status){
            case qr:
                var n85 = r108.id = e205.nextSegmentId++;
                return writePlaceholder(t152, e205.responseState, n85);
            case Yr:
                r108.status = Xr;
                var o67 = true;
                var a55 = r108.chunks;
                var i43 = 0;
                var s32 = r108.children;
                for(var u18 = 0; u18 < s32.length; u18++){
                    var l18 = s32[u18];
                    for(; i43 < l18.index; i43++)writeChunk(t152, a55[i43]);
                    o67 = flushSegment(e205, t152, l18);
                }
                for(; i43 < a55.length; i43++)o67 = writeChunk(t152, a55[i43]);
                return o67;
            default:
                throw new Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
        }
    }
    function flushSegment(e206, t153, r109) {
        var n86 = r109.boundary;
        if (null === n86) return flushSubtree(e206, t153, r109);
        n86.parentFlushed = true;
        if (n86.forceClientRender) {
            writeStartClientRenderedSuspenseBoundary$1(t153, e206.responseState);
            flushSubtree(e206, t153, r109);
            return writeEndClientRenderedSuspenseBoundary$1(t153, e206.responseState);
        }
        if (n86.pendingTasks > 0) {
            n86.rootSegmentID = e206.nextSegmentId++;
            n86.completedSegments.length > 0 && e206.partialBoundaries.push(n86);
            var o68 = n86.id = assignSuspenseBoundaryID(e206.responseState);
            writeStartPendingSuspenseBoundary(t153, e206.responseState, o68);
            flushSubtree(e206, t153, r109);
            return writeEndPendingSuspenseBoundary(t153, e206.responseState);
        }
        if (n86.byteSize > e206.progressiveChunkSize) {
            n86.rootSegmentID = e206.nextSegmentId++;
            e206.completedBoundaries.push(n86);
            writeStartPendingSuspenseBoundary(t153, e206.responseState, n86.id);
            flushSubtree(e206, t153, r109);
            return writeEndPendingSuspenseBoundary(t153, e206.responseState);
        }
        writeStartCompletedSuspenseBoundary$1(t153, e206.responseState);
        var a56 = n86.completedSegments;
        if (1 !== a56.length) throw new Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
        var i44 = a56[0];
        flushSegment(e206, t153, i44);
        return writeEndCompletedSuspenseBoundary$1(t153, e206.responseState);
    }
    function flushClientRenderedBoundary(e207, t154, r110) {
        return writeClientRenderBoundaryInstruction(t154, e207.responseState, r110.id);
    }
    function flushSegmentContainer(e208, t155, r111) {
        writeStartSegment(t155, e208.responseState, r111.formatContext, r111.id);
        flushSegment(e208, t155, r111);
        return writeEndSegment(t155, r111.formatContext);
    }
    function flushCompletedBoundary(e209, t156, r112) {
        var n87 = r112.completedSegments;
        var o69 = 0;
        for(; o69 < n87.length; o69++){
            var a57 = n87[o69];
            flushPartiallyCompletedSegment(e209, t156, r112, a57);
        }
        n87.length = 0;
        return writeCompletedBoundaryInstruction(t156, e209.responseState, r112.id, r112.rootSegmentID);
    }
    function flushPartialBoundary(e210, t157, r113) {
        var n88 = r113.completedSegments;
        var o70 = 0;
        for(; o70 < n88.length; o70++){
            var a58 = n88[o70];
            if (!flushPartiallyCompletedSegment(e210, t157, r113, a58)) {
                o70++;
                n88.splice(0, o70);
                return false;
            }
        }
        n88.splice(0, o70);
        return true;
    }
    function flushPartiallyCompletedSegment(e211, t158, r114, n89) {
        if (n89.status === Xr) return true;
        var o71 = n89.id;
        if (-1 === o71) {
            var a59 = n89.id = r114.rootSegmentID;
            if (-1 === a59) throw new Error("A root segment ID must have been assigned by now. This is a bug in React.");
            return flushSegmentContainer(e211, t158, n89);
        }
        flushSegmentContainer(e211, t158, n89);
        return writeCompletedSegmentInstruction(t158, e211.responseState, o71);
    }
    function flushCompletedQueues(e212, t159) {
        try {
            var r115 = e212.completedRootSegment;
            if (null !== r115 && 0 === e212.pendingRootTasks) {
                flushSegment(e212, t159, r115);
                e212.completedRootSegment = null;
                writeCompletedRoot(t159, e212.responseState);
            }
            var n90 = e212.clientRenderedBoundaries;
            var o72;
            for(o72 = 0; o72 < n90.length; o72++){
                var a60 = n90[o72];
                if (!flushClientRenderedBoundary(e212, t159, a60)) {
                    e212.destination = null;
                    o72++;
                    n90.splice(0, o72);
                    return;
                }
            }
            n90.splice(0, o72);
            var i45 = e212.completedBoundaries;
            for(o72 = 0; o72 < i45.length; o72++){
                var s33 = i45[o72];
                if (!flushCompletedBoundary(e212, t159, s33)) {
                    e212.destination = null;
                    o72++;
                    i45.splice(0, o72);
                    return;
                }
            }
            i45.splice(0, o72);
            completeWriting(t159);
            beginWriting(t159);
            var u19 = e212.partialBoundaries;
            for(o72 = 0; o72 < u19.length; o72++){
                var l19 = u19[o72];
                if (!flushPartialBoundary(e212, t159, l19)) {
                    e212.destination = null;
                    o72++;
                    u19.splice(0, o72);
                    return;
                }
            }
            u19.splice(0, o72);
            var c13 = e212.completedBoundaries;
            for(o72 = 0; o72 < c13.length; o72++){
                var p13 = c13[o72];
                if (!flushCompletedBoundary(e212, t159, p13)) {
                    e212.destination = null;
                    o72++;
                    c13.splice(0, o72);
                    return;
                }
            }
            c13.splice(0, o72);
        } finally{
            if (0 === e212.allPendingTasks && 0 === e212.pingedTasks.length && 0 === e212.clientRenderedBoundaries.length && 0 === e212.completedBoundaries.length) {
                0 !== e212.abortableTasks.size && error("There was still abortable task at the root when we closed. This is a bug in React.");
                close(t159);
            }
        }
    }
    function startWork(e213) {
        scheduleWork(function() {
            return performWork(e213);
        });
    }
    function startFlowing(e214, t160) {
        if (e214.status !== Kr) {
            if (e214.status !== Jr) {
                e214.destination = t160;
                try {
                    flushCompletedQueues(e214, t160);
                } catch (t161) {
                    reportError(e214, t161);
                    fatalError(e214, t161);
                }
            }
        } else {
            e214.status = Jr;
            closeWithError(t160, e214.fatalError);
        }
    }
    function abort(e215) {
        try {
            var t162 = e215.abortableTasks;
            t162.forEach(abortTask, e215);
            t162.clear();
            null !== e215.destination && flushCompletedQueues(e215, e215.destination);
        } catch (t163) {
            reportError(e215, t163);
            fatalError(e215, t163);
        }
    }
    function onError() {}
    function renderToStringImpl(e216, t164, r116) {
        var n91 = false;
        var o73 = null;
        var a61 = "";
        var i46 = {
            push: function(e217) {
                null !== e217 && (a61 += e217);
                return true;
            },
            destroy: function(e218) {
                n91 = true;
                o73 = e218;
            }
        };
        var s34 = false;
        function onCompleteShell() {
            s34 = true;
        }
        var u20 = createRequest(e216, createResponseState$1(r116, t164 ? t164.identifierPrefix : void 0), createRootFormatContext(), Infinity, onError, void 0, onCompleteShell);
        startWork(u20);
        abort(u20);
        startFlowing(u20, i46);
        if (n91) throw o73;
        if (!s34) throw new Error("A React component suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.");
        return a61;
    }
    function renderToString(e219, t165) {
        return renderToStringImpl(e219, t165, false);
    }
    function renderToStaticMarkup(e220, t166) {
        return renderToStringImpl(e220, t166, true);
    }
    function renderToNodeStream() {
        throw new Error("ReactDOMServer.renderToNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToString() instead.");
    }
    function renderToStaticNodeStream() {
        throw new Error("ReactDOMServer.renderToStaticNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToStaticMarkup() instead.");
    }
    a4.renderToNodeStream = renderToNodeStream;
    a4.renderToStaticMarkup = renderToStaticMarkup;
    a4.renderToStaticNodeStream = renderToStaticNodeStream;
    a4.renderToString = renderToString;
    a4.version = r13;
})();
var i2 = {};
var s2, u2;
s2 = a4;
u2 = o2;
i2.version = s2.version;
i2.renderToString = s2.renderToString;
i2.renderToStaticMarkup = s2.renderToStaticMarkup;
i2.renderToNodeStream = s2.renderToNodeStream;
i2.renderToStaticNodeStream = s2.renderToStaticNodeStream;
i2.renderToReadableStream = u2.renderToReadableStream;
const l2 = i2.version, c3 = i2.renderToString, p2 = i2.renderToStaticMarkup, d1 = i2.renderToNodeStream, f1 = i2.renderToStaticNodeStream, h1 = i2.renderToReadableStream;
const getHtmlAndCss = (MyComponent)=>{
    const key = "css";
    const cache = q({
        key
    });
    let cssText = "";
    cache.sheet.insert = (rule)=>{
        cssText += rule;
    };
    globalThis.renderToString = true;
    const markup = c3(React.createElement(o, {
        value: cache
    }, React.createElement(MyComponent, null)));
    globalThis.renderToString = false;
    `
  <!DOCTYPE html>
  <html>
    <head>
        <meta charset="UTF-8">
        <style>${cssText}</style>
    </head>
    <body>
        <div>${markup}</div>
    </body>
  </html>
`;
    return {
        html: markup,
        css: cssText
    };
};
export { getHtmlAndCss as getHtmlAndCss };

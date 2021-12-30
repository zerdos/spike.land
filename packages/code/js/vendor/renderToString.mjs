import { renderToString } from "react-dom/server";

var e = window.emotionReact,
  { CacheProvider: o } = e,
  { ClassNames: t } = e,
  { Global: s } = e,
  { ThemeContext: n } = e,
  { ThemeProvider: c } = e,
  { __unsafe_useEmotionCache: r } = e,
  { createElement: x } = e,
  { css: p } = e,
  { jsx: a } = e,
  { keyframes: m } = e,
  { useTheme: h } = e,
  { withEmotionCache: i } = e,
  { withTheme: l } = e;
function sheetForTag(e1) {
  if (e1.sheet) return e1.sheet;
  for (var t2 = 0; t2 < document.styleSheets.length; t2++) {
    if (document.styleSheets[t2].ownerNode === e1) {
      return document.styleSheets[t2];
    }
  }
}
function createStyleElement(e2) {
  var t3 = document.createElement("style");
  t3.setAttribute("data-emotion", e2.key);
  void 0 !== e2.nonce && t3.setAttribute("nonce", e2.nonce);
  t3.appendChild(document.createTextNode(""));
  t3.setAttribute("data-s", "");
  return t3;
}
var e1 = function () {
  function StyleSheet(e4) {
    var t4 = this;
    this._insertTag = function (e5) {
      var r2;
      r2 = 0 === t4.tags.length
        ? t4.insertionPoint
          ? t4.insertionPoint.nextSibling
          : t4.prepend
          ? t4.container.firstChild
          : t4.before
        : t4.tags[t4.tags.length - 1].nextSibling;
      t4.container.insertBefore(e5, r2);
      t4.tags.push(e5);
    };
    this.isSpeedy = void 0 === e4.speedy
      ? "production" === process.env.NODE_ENV
      : e4.speedy;
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
    this.ctr % (this.isSpeedy ? 65000 : 1) === 0 &&
      this._insertTag(createStyleElement(this));
    var t5 = this.tags[this.tags.length - 1];
    if ("production" !== process.env.NODE_ENV) {
      var r3 = 64 === e7.charCodeAt(0) && 105 === e7.charCodeAt(1);
      r3 && this._alreadyInsertedOrderInsensitiveRule &&
        console.error(
          "You're attempting to insert the following rule:\n" + e7 +
            "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.",
        );
      this._alreadyInsertedOrderInsensitiveRule =
        this._alreadyInsertedOrderInsensitiveRule || !r3;
    }
    if (this.isSpeedy) {
      var n2 = sheetForTag(t5);
      try {
        n2.insertRule(e7, n2.cssRules.length);
      } catch (t6) {
        "production" === process.env.NODE_ENV ||
          /:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear){/
            .test(e7) ||
          console.error(
            'There was a problem inserting the following rule: "' + e7 + '"',
            t6,
          );
      }
    } else t5.appendChild(document.createTextNode(e7));
    this.ctr++;
  };
  e3.flush = function flush() {
    this.tags.forEach(function (e8) {
      return e8.parentNode && e8.parentNode.removeChild(e8);
    });
    this.tags = [];
    this.ctr = 0;
    "production" !== process.env.NODE_ENV &&
      (this._alreadyInsertedOrderInsensitiveRule = false);
  };
  return StyleSheet;
}();
var e2 = "-ms-";
var r1 = "-moz-";
var a1 = "-webkit-";
var c1 = "comm";
var t1 = "rule";
var n1 = "decl";
var u = "@import";
var v = "@keyframes";
var k = Math.abs;
var w = String.fromCharCode;
var x1 = Object.assign;
function hash(e11, r11) {
  return (((r11 << 2 ^ charat(e11, 0)) << 2 ^ charat(e11, 1)) << 2 ^
        charat(e11, 2)) << 2 ^ charat(e11, 3);
}
function trim(e21) {
  return e21.trim();
}
function match(e3, r2) {
  return (e3 = r2.exec(e3)) ? e3[0] : e3;
}
function replace(e4, r3, a11) {
  return e4.replace(r3, a11);
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
function node(e12, r9, a3, c11, t11, n11, s1) {
  return {
    value: e12,
    root: r9,
    parent: a3,
    type: c11,
    props: t11,
    children: n11,
    line: $,
    column: g,
    length: s1,
    return: "",
  };
}
function copy(e13, r10) {
  return x1(node("", null, null, "", null, null, 0), e13, {
    length: -e13.length,
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
  switch (e15) {
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
  return trim(
    slice(y - 1, delimiter(91 === e18 ? e18 + 2 : 40 === e18 ? e18 + 1 : e18)),
  );
}
function whitespace(e20) {
  while (j = peek()) {
    if (!(j < 33)) break;
    next();
  }
  return token(e20) > 2 || token(j) > 3 ? "" : " ";
}
function escaping(e22, r12) {
  while (--r12 && next()) {
    if (j < 48 || j > 102 || j > 57 && j < 65 || j > 70 && j < 97) break;
  }
  return slice(e22, caret() + (r12 < 6 && 32 == peek() && 32 == next()));
}
function delimiter(e23) {
  while (next()) {
    switch (j) {
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
  }
  return y;
}
function commenter(e24, r13) {
  while (next()) {
    if (e24 + j === 57) break;
    if (e24 + j === 84 && 47 === peek()) break;
  }
  return "/*" + slice(r13, y - 1) + "*" + w(47 === e24 ? e24 : next());
}
function identifier(e25) {
  while (!token(peek())) next();
  return slice(e25, y);
}
function compile(e26) {
  return dealloc(parse(
    "",
    null,
    null,
    null,
    [
      "",
    ],
    e26 = alloc(e26),
    0,
    [
      0,
    ],
    e26,
  ));
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
  var x11 = "";
  var $1 = t2;
  var g1 = n2;
  var z1 = c2;
  var y1 = x11;
  while (m1) {
    switch (v1 = k1, k1 = next()) {
      case 40:
        if (108 != v1 && 58 == y1.charCodeAt(p1 - 1)) {
          -1 != indexof(y1 += replace(delimit(k1), "&", "&\f"), "&\f") &&
            (b1 = -1);
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
        switch (peek()) {
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
        switch (k1) {
          case 0:
          case 125:
            m1 = 0;
          case 59 + o1:
            h1 > 0 && strlen(y1) - p1 && append(
              h1 > 32
                ? declaration(y1 + ";", c2, a4, p1 - 1)
                : declaration(replace(y1, " ", "") + ";", c2, a4, p1 - 2),
              u1,
            );
            break;
          case 59:
            y1 += ";";
          default:
            append(
              z1 = ruleset(
                y1,
                r14,
                a4,
                l1,
                o1,
                t2,
                i1,
                x11,
                $1 = [],
                g1 = [],
                p1,
              ),
              n2,
            );
            if (123 === k1) {
              if (0 === o1) parse(y1, r14, z1, z1, $1, n2, p1, i1, g1);
              else {
                switch (f1) {
                  case 100:
                  case 109:
                  case 115:
                    parse(
                      e27,
                      z1,
                      z1,
                      c2 &&
                        append(
                          ruleset(
                            e27,
                            z1,
                            z1,
                            0,
                            0,
                            t2,
                            i1,
                            x11,
                            t2,
                            $1 = [],
                            p1,
                          ),
                          g1,
                        ),
                      t2,
                      g1,
                      p1,
                      i1,
                      c2 ? $1 : g1,
                    );
                    break;
                  default:
                    parse(
                      y1,
                      z1,
                      z1,
                      z1,
                      [
                        "",
                      ],
                      g1,
                      0,
                      i1,
                      g1,
                    );
                }
              }
            }
        }
        l1 = o1 = h1 = 0, d1 = b1 = 1, x11 = y1 = "", p1 = s2;
        break;
      case 58:
        p1 = 1 + strlen(y1), h1 = v1;
      default:
        if (d1 < 1) {
          if (123 == k1) --d1;
          else if (125 == k1 && 0 == d1++ && 125 == prev()) continue;
        }
        switch (y1 += w(k1), k1 * d1) {
          case 38:
            b1 = o1 > 0 ? 1 : (y1 += "\f", -1);
            break;
          case 44:
            i1[l1++] = (strlen(y1) - 1) * b1, b1 = 1;
            break;
          case 64:
            45 === peek() && (y1 += delimit(next()));
            f1 = peek(),
              o1 = p1 = strlen(x11 = y1 += identifier(caret())),
              k1++;
            break;
          case 45:
            45 === v1 && 2 == strlen(y1) && (d1 = 0);
        }
    }
  }
  return n2;
}
function ruleset(e28, r15, a5, c3, n3, s3, i2, u2, l2, o2, p2) {
  var f2 = n3 - 1;
  var h2 = 0 === n3 ? s3 : [
    "",
  ];
  var v2 = sizeof(h2);
  for (var d2 = 0, m2 = 0, b = 0; d2 < c3; ++d2) {
    for (
      var w1 = 0, x2 = substr(e28, f2 + 1, f2 = k(m2 = i2[d2])), $2 = e28;
      w1 < v2;
      ++w1
    ) {
      ($2 = trim(m2 > 0 ? h2[w1] + " " + x2 : replace(x2, /&\f/g, h2[w1]))) &&
        (l2[b++] = $2);
    }
  }
  return node(e28, r15, a5, 0 === n3 ? t1 : u2, l2, o2, p2);
}
function comment(e29, r16, a6) {
  return node(e29, r16, a6, c1, w(__char()), substr(e29, 2, -2), 0);
}
function declaration(e30, r17, a7, c4) {
  return node(
    e30,
    r17,
    a7,
    n1,
    substr(e30, 0, c4),
    substr(e30, c4 + 1, -1),
    c4,
  );
}
function prefix(c5, t3) {
  switch (hash(c5, t3)) {
    case 5103:
      return a1 + "print-" + c5 + c5;
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
      return a1 + c5 + c5;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return a1 + c5 + r1 + c5 + e2 + c5 + c5;
    case 6828:
    case 4268:
      return a1 + c5 + e2 + c5 + c5;
    case 6165:
      return a1 + c5 + e2 + "flex-" + c5 + c5;
    case 5187:
      return a1 + c5 +
        replace(c5, /(\w+).+(:[^]+)/, a1 + "box-$1$2" + e2 + "flex-$1$2") + c5;
    case 5443:
      return a1 + c5 + e2 + "flex-item-" + replace(c5, /flex-|-self/, "") + c5;
    case 4675:
      return a1 + c5 + e2 + "flex-line-pack" +
        replace(c5, /align-content|flex-|-self/, "") + c5;
    case 5548:
      return a1 + c5 + e2 + replace(c5, "shrink", "negative") + c5;
    case 5292:
      return a1 + c5 + e2 + replace(c5, "basis", "preferred-size") + c5;
    case 6060:
      return a1 + "box-" + replace(c5, "-grow", "") + a1 + c5 + e2 +
        replace(c5, "grow", "positive") + c5;
    case 4554:
      return a1 + replace(c5, /([^-])(transform)/g, "$1" + a1 + "$2") + c5;
    case 6187:
      return replace(
        replace(
          replace(c5, /(zoom-|grab)/, a1 + "$1"),
          /(image-set)/,
          a1 + "$1",
        ),
        c5,
        "",
      ) + c5;
    case 5495:
    case 3959:
      return replace(c5, /(image-set\([^]*)/, a1 + "$1$`$1");
    case 4968:
      return replace(
        replace(
          c5,
          /(.+:)(flex-)?(.*)/,
          a1 + "box-pack:$3" + e2 + "flex-pack:$3",
        ),
        /s.+-b[^;]+/,
        "justify",
      ) + a1 + c5 + c5;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(c5, /(.+)-inline(.+)/, a1 + "$1$2") + c5;
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
      if (strlen(c5) - 1 - t3 > 6) {
        switch (charat(c5, t3 + 1)) {
          case 109:
            if (45 !== charat(c5, t3 + 4)) break;
          case 102:
            return replace(
              c5,
              /(.+:)(.+)-([^]+)/,
              "$1" + a1 + "$2-$3$1" + r1 +
                (108 == charat(c5, t3 + 3) ? "$3" : "$2-$3"),
            ) + c5;
          case 115:
            return ~indexof(c5, "stretch")
              ? prefix(replace(c5, "stretch", "fill-available"), t3) + c5
              : c5;
        }
      }
      break;
    case 4949:
      if (115 !== charat(c5, t3 + 1)) break;
    case 6444:
      switch (charat(c5, strlen(c5) - 3 - (~indexof(c5, "!important") && 10))) {
        case 107:
          return replace(c5, ":", ":" + a1) + c5;
        case 101:
          return replace(
            c5,
            /(.+:)([^;!]+)(;|!.+)?/,
            "$1" + a1 + (45 === charat(c5, 14) ? "inline-" : "") + "box$3$1" +
              a1 + "$2$3$1" + e2 + "$2box$3",
          ) + c5;
      }
      break;
    case 5936:
      switch (charat(c5, t3 + 11)) {
        case 114:
          return a1 + c5 + e2 + replace(c5, /[svh]\w+-[tblr]{2}/, "tb") + c5;
        case 108:
          return a1 + c5 + e2 + replace(c5, /[svh]\w+-[tblr]{2}/, "tb-rl") + c5;
        case 45:
          return a1 + c5 + e2 + replace(c5, /[svh]\w+-[tblr]{2}/, "lr") + c5;
      }
      return a1 + c5 + e2 + c5 + c5;
  }
  return c5;
}
function serialize(e31, r18) {
  var a8 = "";
  var c6 = sizeof(e31);
  for (var t4 = 0; t4 < c6; t4++) a8 += r18(e31[t4], t4, e31, r18) || "";
  return a8;
}
function stringify(e32, r, a9, s4) {
  switch (e32.type) {
    case u:
    case n1:
      return e32.return = e32.return || e32.value;
    case c1:
      return "";
    case v:
      return e32.return = e32.value + "{" + serialize(e32.children, s4) + "}";
    case t1:
      e32.value = e32.props.join(",");
  }
  return strlen(a9 = serialize(e32.children, s4))
    ? e32.return = e32.value + "{" + a9 + "}"
    : "";
}
function middleware(e33) {
  var r19 = sizeof(e33);
  return function (a10, c7, t5, n4) {
    var s5 = "";
    for (var i3 = 0; i3 < r19; i3++) s5 += e33[i3](a10, c7, t5, n4) || "";
    return s5;
  };
}
function rulesheet(e34) {
  return function (r20) {
    r20.root || (r20 = r20.return) && e34(r20);
  };
}
function prefixer(c8, s, i, u3) {
  if (c8.length > -1 && !c8.return) {
    switch (c8.type) {
      case n1:
        c8.return = prefix(c8.value, c8.length);
        break;
      case v:
        return serialize([
          copy(c8, {
            value: replace(c8.value, "@", "@" + a1),
          }),
        ], u3);
      case t1:
        if (c8.length) {
          return combine(c8.props, function (t6) {
            switch (match(t6, /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                return serialize([
                  copy(c8, {
                    props: [
                      replace(t6, /:(read-\w+)/, ":" + r1 + "$1"),
                    ],
                  }),
                ], u3);
              case "::placeholder":
                return serialize([
                  copy(c8, {
                    props: [
                      replace(t6, /:(plac\w+)/, ":" + a1 + "input-$1"),
                    ],
                  }),
                  copy(c8, {
                    props: [
                      replace(t6, /:(plac\w+)/, ":" + r1 + "$1"),
                    ],
                  }),
                  copy(c8, {
                    props: [
                      replace(t6, /:(plac\w+)/, e2 + "input-$1"),
                    ],
                  }),
                ], u3);
            }
            return "";
          });
        }
    }
  }
}
var y1 = function last(e12) {
  return e12.length ? e12[e12.length - 1] : null;
};
var g1 = function identifierWithPointTracking(e22, i1, s) {
  var u1 = 0;
  var l1 = 0;
  while (true) {
    u1 = l1;
    l1 = peek();
    38 === u1 && 12 === l1 && (i1[s] = 1);
    if (token(l1)) break;
    next();
  }
  return slice(e22, y);
};
var b = function toRules(e3, o1) {
  var u2 = -1;
  var l2 = 44;
  do {
    switch (token(l2)) {
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
  } while (l2 = next());
  return e3;
};
var w1 = function getRules(e4, r12) {
  return dealloc(b(alloc(e4), r12));
};
var E = new WeakMap();
var k1 = function compat(e5) {
  if ("rule" === e5.type && e5.parent && !(e5.length < 1)) {
    var r2 = e5.value, t12 = e5.parent;
    var n12 = e5.column === t12.column && e5.line === t12.line;
    while ("rule" !== t12.type) {
      t12 = t12.parent;
      if (!t12) return;
    }
    if (
      (1 !== e5.props.length || 58 === r2.charCodeAt(0) || E.get(t12)) && !n12
    ) {
      E.set(e5, true);
      var o2 = [];
      var a12 = w1(r2, o2);
      var i2 = t12.props;
      for (var s1 = 0, u3 = 0; s1 < a12.length; s1++) {
        for (var l3 = 0; l3 < i2.length; l3++, u3++) {
          e5.props[u3] = o2[s1]
            ? a12[s1].replace(/&\f/g, i2[l3])
            : i2[l3] + " " + a12[s1];
        }
      }
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
var N =
  "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason";
var C1 = function isIgnoringComment(e7) {
  return !!e7 && "comm" === e7.type && e7.children.indexOf(N) > -1;
};
var P = function createUnsafeSelectorsAlarm(e8) {
  return function (r4, t2, n2) {
    if ("rule" === r4.type) {
      var o3 = r4.value.match(/(:first|:nth|:nth-last)-child/g);
      if (o3 && true !== e8.compat) {
        var a2 = t2 > 0 ? n2[t2 - 1] : null;
        if (a2 && C1(y1(a2.children))) return;
        o3.forEach(function (e9) {
          console.error(
            'The pseudo class "' + e9 +
              '" is potentially unsafe when doing server-side rendering. Try changing it to "' +
              e9.split("-child")[0] + '-of-type".',
          );
        });
      }
    }
  };
};
var O = function isImportRule(e10) {
  return 105 === e10.type.charCodeAt(1) && 64 === e10.type.charCodeAt(0);
};
var D = function isPrependedWithRegularRules(e11, r5) {
  for (var t3 = e11 - 1; t3 >= 0; t3--) if (!O(r5[t3])) return true;
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
      console.error(
        "`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.",
      );
      R(e13);
    } else if (D(r6, t4)) {
      console.error(
        "`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.",
      );
      R(e13);
    }
  }
};
var _ = [
  prefixer,
];
var q = function createCache(r7) {
  var t5 = r7.key;
  if ("production" !== process.env.NODE_ENV && !t5) {
    throw new Error(
      "You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements.",
    );
  }
  if ("css" === t5) {
    var n3 = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(n3, function (e14) {
      var r8 = e14.getAttribute("data-emotion");
      if (-1 !== r8.indexOf(" ")) {
        document.head.appendChild(e14);
        e14.setAttribute("data-s", "");
      }
    });
  }
  var o4 = r7.stylisPlugins || _;
  if ("production" !== process.env.NODE_ENV && /[^a-z-]/.test(t5)) {
    throw new Error(
      'Emotion key must only contain lower case alphabetical characters and - but "' +
        t5 + '" was passed',
    );
  }
  var a3 = {};
  var i3;
  var s2 = [];
  i3 = r7.container || document.head;
  Array.prototype.forEach.call(
    document.querySelectorAll('style[data-emotion^="' + t5 + ' "]'),
    function (e15) {
      var r9 = e15.getAttribute("data-emotion").split(" ");
      for (var t6 = 1; t6 < r9.length; t6++) a3[r9[t6]] = true;
      s2.push(e15);
    },
  );
  var u4;
  var l4 = [
    k1,
    A,
  ];
  "production" !== process.env.NODE_ENV && l4.push(
    P({
      get compat() {
        return w11.compat;
      },
    }),
    V,
  );
  var c12;
  var y11 = [
    stringify,
    "production" !== process.env.NODE_ENV
      ? function (e16) {
        e16.root || (e16.return
          ? c12.insert(e16.return)
          : e16.value && e16.type !== c1 && c12.insert(e16.value + "{}"));
      }
      : rulesheet(function (e17) {
        c12.insert(e17);
      }),
  ];
  var g11 = middleware(l4.concat(o4, y11));
  var b1 = function stylis(e18) {
    return serialize(compile(e18), g11);
  };
  u4 = function insert(e19, r10, t7, n4) {
    c12 = t7;
    "production" !== process.env.NODE_ENV && void 0 !== r10.map && (c12 = {
      insert: function insert(e20) {
        t7.insert(e20 + r10.map);
      },
    });
    b1(e19 ? e19 + "{" + r10.styles + "}" : r10.styles);
    n4 && (w11.inserted[r10.name] = true);
  };
  var w11 = {
    key: t5,
    sheet: new e1({
      key: t5,
      container: i3,
      nonce: r7.nonce,
      speedy: r7.speedy,
      prepend: r7.prepend,
      insertionPoint: r7.insertionPoint,
    }),
    nonce: r7.nonce,
    inserted: a3,
    registered: {},
    insert: u4,
  };
  w11.sheet.hydrate(s2);
  return w11;
};
const getHtmlAndCss = (MyComponent) => {
  const key = "foo";
  const cache = q({
    key,
  });
  let cssText = "";
  cache.sheet.insert = (rule) => {
    cssText += rule;
  };
  const markup = renderToString(a(o, {
    value: cache,
  }, a(MyComponent, null)));
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
    css: cssText,
  };
};
export { getHtmlAndCss as getHtmlAndCss };

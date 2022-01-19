import "./chunk-L7N3FHV6.mjs";

// js/vendor/renderToString.mjs
var e = window.emotionReact;
var { CacheProvider: o } = e;
var { jsx: a } = e;
function sheetForTag(e12) {
  if (e12.sheet)
    return e12.sheet;
  for (var t6 = 0; t6 < document.styleSheets.length; t6++) {
    if (document.styleSheets[t6].ownerNode === e12) {
      return document.styleSheets[t6];
    }
  }
}
function createStyleElement(e22) {
  var t7 = document.createElement("style");
  t7.setAttribute("data-emotion", e22.key);
  e22.nonce !== void 0 && t7.setAttribute("nonce", e22.nonce);
  t7.appendChild(document.createTextNode(""));
  t7.setAttribute("data-s", "");
  return t7;
}
var e1 = function() {
  function StyleSheet(e42) {
    var t8 = this;
    this._insertTag = function(e5) {
      var r4;
      r4 = t8.tags.length === 0 ? t8.insertionPoint ? t8.insertionPoint.nextSibling : t8.prepend ? t8.container.firstChild : t8.before : t8.tags[t8.tags.length - 1].nextSibling;
      t8.container.insertBefore(e5, r4);
      t8.tags.push(e5);
    };
    this.isSpeedy = e42.speedy === void 0 ? false : e42.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = e42.nonce;
    this.key = e42.key;
    this.container = e42.container;
    this.prepend = e42.prepend;
    this.insertionPoint = e42.insertionPoint;
    this.before = null;
  }
  var e32 = StyleSheet.prototype;
  e32.hydrate = function hydrate(e6) {
    e6.forEach(this._insertTag);
  };
  e32.insert = function insert(e7) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(createStyleElement(this));
    var t9 = this.tags[this.tags.length - 1];
    if (true) {
      var r5 = e7.charCodeAt(0) === 64 && e7.charCodeAt(1) === 105;
      r5 && this._alreadyInsertedOrderInsensitiveRule && console.error("You're attempting to insert the following rule:\n" + e7 + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.");
      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !r5;
    }
    if (this.isSpeedy) {
      var n5 = sheetForTag(t9);
      try {
        n5.insertRule(e7, n5.cssRules.length);
      } catch (t10) {
        /:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear){/.test(e7) || console.error('There was a problem inserting the following rule: "' + e7 + '"', t10);
      }
    } else
      t9.appendChild(document.createTextNode(e7));
    this.ctr++;
  };
  e32.flush = function flush() {
    this.tags.forEach(function(e8) {
      return e8.parentNode && e8.parentNode.removeChild(e8);
    });
    this.tags = [];
    this.ctr = 0;
    this._alreadyInsertedOrderInsensitiveRule = false;
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
  return (((r11 << 2 ^ charat(e11, 0)) << 2 ^ charat(e11, 1)) << 2 ^ charat(e11, 2)) << 2 ^ charat(e11, 3);
}
function trim(e21) {
  return e21.trim();
}
function match(e32, r22) {
  return (e32 = r22.exec(e32)) ? e32[0] : e32;
}
function replace(e42, r32, a11) {
  return e42.replace(r32, a11);
}
function indexof(e5, r4) {
  return e5.indexOf(r4);
}
function charat(e6, r5) {
  return 0 | e6.charCodeAt(r5);
}
function substr(e7, r6, a22) {
  return e7.slice(r6, a22);
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
function node(e12, r9, a32, c11, t11, n11, s12) {
  return {
    value: e12,
    root: r9,
    parent: a32,
    type: c11,
    props: t11,
    children: n11,
    line: $,
    column: g,
    length: s12,
    return: ""
  };
}
function copy(e13, r10) {
  return x1(node("", null, null, "", null, null, 0), e13, {
    length: -e13.length
  }, r10);
}
function __char() {
  return j;
}
function prev() {
  j = y > 0 ? charat(C, --y) : 0;
  (g--, j === 10) && (g = 1, $--);
  return j;
}
function next() {
  j = y < z ? charat(C, y++) : 0;
  (g++, j === 10) && (g = 1, $++);
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
  return trim(slice(y - 1, delimiter(e18 === 91 ? e18 + 2 : e18 === 40 ? e18 + 1 : e18)));
}
function whitespace(e20) {
  while (j = peek()) {
    if (!(j < 33))
      break;
    next();
  }
  return token(e20) > 2 || token(j) > 3 ? "" : " ";
}
function escaping(e22, r12) {
  while (--r12 && next()) {
    if (j < 48 || j > 102 || j > 57 && j < 65 || j > 70 && j < 97)
      break;
  }
  return slice(e22, caret() + (r12 < 6 && peek() == 32 && next() == 32));
}
function delimiter(e23) {
  while (next()) {
    switch (j) {
      case e23:
        return y;
      case 34:
      case 39:
        e23 !== 34 && e23 !== 39 && delimiter(j);
        break;
      case 40:
        e23 === 41 && delimiter(e23);
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
    if (e24 + j === 57)
      break;
    if (e24 + j === 84 && peek() === 47)
      break;
  }
  return "/*" + slice(r13, y - 1) + "*" + w(e24 === 47 ? e24 : next());
}
function identifier(e25) {
  while (!token(peek()))
    next();
  return slice(e25, y);
}
function compile(e26) {
  return dealloc(parse("", null, null, null, [
    ""
  ], e26 = alloc(e26), 0, [
    0
  ], e26));
}
function parse(e27, r14, a42, c22, t22, n22, s22, i12, u12) {
  var l12 = 0;
  var o12 = 0;
  var p12 = s22;
  var f12 = 0;
  var h12 = 0;
  var v12 = 0;
  var d12 = 1;
  var m12 = 1;
  var b12 = 1;
  var k12 = 0;
  var x11 = "";
  var $12 = t22;
  var g12 = n22;
  var z12 = c22;
  var y12 = x11;
  while (m12) {
    switch (v12 = k12, k12 = next()) {
      case 40:
        if (v12 != 108 && y12.charCodeAt(p12 - 1) == 58) {
          indexof(y12 += replace(delimit(k12), "&", "&\f"), "&\f") != -1 && (b12 = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        y12 += delimit(k12);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        y12 += whitespace(v12);
        break;
      case 92:
        y12 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), r14, a42), u12);
            break;
          default:
            y12 += "/";
        }
        break;
      case 123 * d12:
        i12[l12++] = strlen(y12) * b12;
      case 125 * d12:
      case 59:
      case 0:
        switch (k12) {
          case 0:
          case 125:
            m12 = 0;
          case 59 + o12:
            h12 > 0 && strlen(y12) - p12 && append(h12 > 32 ? declaration(y12 + ";", c22, a42, p12 - 1) : declaration(replace(y12, " ", "") + ";", c22, a42, p12 - 2), u12);
            break;
          case 59:
            y12 += ";";
          default:
            append(z12 = ruleset(y12, r14, a42, l12, o12, t22, i12, x11, $12 = [], g12 = [], p12), n22);
            if (k12 === 123) {
              if (o12 === 0)
                parse(y12, r14, z12, z12, $12, n22, p12, i12, g12);
              else {
                switch (f12) {
                  case 100:
                  case 109:
                  case 115:
                    parse(e27, z12, z12, c22 && append(ruleset(e27, z12, z12, 0, 0, t22, i12, x11, t22, $12 = [], p12), g12), t22, g12, p12, i12, c22 ? $12 : g12);
                    break;
                  default:
                    parse(y12, z12, z12, z12, [
                      ""
                    ], g12, 0, i12, g12);
                }
              }
            }
        }
        l12 = o12 = h12 = 0, d12 = b12 = 1, x11 = y12 = "", p12 = s22;
        break;
      case 58:
        p12 = 1 + strlen(y12), h12 = v12;
      default:
        if (d12 < 1) {
          if (k12 == 123)
            --d12;
          else if (k12 == 125 && d12++ == 0 && prev() == 125)
            continue;
        }
        switch (y12 += w(k12), k12 * d12) {
          case 38:
            b12 = o12 > 0 ? 1 : (y12 += "\f", -1);
            break;
          case 44:
            i12[l12++] = (strlen(y12) - 1) * b12, b12 = 1;
            break;
          case 64:
            peek() === 45 && (y12 += delimit(next()));
            f12 = peek(), o12 = p12 = strlen(x11 = y12 += identifier(caret())), k12++;
            break;
          case 45:
            v12 === 45 && strlen(y12) == 2 && (d12 = 0);
        }
    }
  }
  return n22;
}
function ruleset(e28, r15, a52, c31, n32, s32, i22, u22, l21, o22, p22) {
  var f2 = n32 - 1;
  var h22 = n32 === 0 ? s32 : [
    ""
  ];
  var v22 = sizeof(h22);
  for (var d22 = 0, m22 = 0, b = 0; d22 < c31; ++d22) {
    for (var w12 = 0, x22 = substr(e28, f2 + 1, f2 = k(m22 = i22[d22])), $22 = e28; w12 < v22; ++w12) {
      ($22 = trim(m22 > 0 ? h22[w12] + " " + x22 : replace(x22, /&\f/g, h22[w12]))) && (l21[b++] = $22);
    }
  }
  return node(e28, r15, a52, n32 === 0 ? t1 : u22, l21, o22, p22);
}
function comment(e29, r16, a6) {
  return node(e29, r16, a6, c1, w(__char()), substr(e29, 2, -2), 0);
}
function declaration(e30, r17, a7, c42) {
  return node(e30, r17, a7, n1, substr(e30, 0, c42), substr(e30, c42 + 1, -1), c42);
}
function prefix(c5, t32) {
  switch (hash(c5, t32)) {
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
      return a1 + c5 + replace(c5, /(\w+).+(:[^]+)/, a1 + "box-$1$2" + e2 + "flex-$1$2") + c5;
    case 5443:
      return a1 + c5 + e2 + "flex-item-" + replace(c5, /flex-|-self/, "") + c5;
    case 4675:
      return a1 + c5 + e2 + "flex-line-pack" + replace(c5, /align-content|flex-|-self/, "") + c5;
    case 5548:
      return a1 + c5 + e2 + replace(c5, "shrink", "negative") + c5;
    case 5292:
      return a1 + c5 + e2 + replace(c5, "basis", "preferred-size") + c5;
    case 6060:
      return a1 + "box-" + replace(c5, "-grow", "") + a1 + c5 + e2 + replace(c5, "grow", "positive") + c5;
    case 4554:
      return a1 + replace(c5, /([^-])(transform)/g, "$1" + a1 + "$2") + c5;
    case 6187:
      return replace(replace(replace(c5, /(zoom-|grab)/, a1 + "$1"), /(image-set)/, a1 + "$1"), c5, "") + c5;
    case 5495:
    case 3959:
      return replace(c5, /(image-set\([^]*)/, a1 + "$1$`$1");
    case 4968:
      return replace(replace(c5, /(.+:)(flex-)?(.*)/, a1 + "box-pack:$3" + e2 + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + a1 + c5 + c5;
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
      if (strlen(c5) - 1 - t32 > 6) {
        switch (charat(c5, t32 + 1)) {
          case 109:
            if (charat(c5, t32 + 4) !== 45)
              break;
          case 102:
            return replace(c5, /(.+:)(.+)-([^]+)/, "$1" + a1 + "$2-$3$1" + r1 + (charat(c5, t32 + 3) == 108 ? "$3" : "$2-$3")) + c5;
          case 115:
            return ~indexof(c5, "stretch") ? prefix(replace(c5, "stretch", "fill-available"), t32) + c5 : c5;
        }
      }
      break;
    case 4949:
      if (charat(c5, t32 + 1) !== 115)
        break;
    case 6444:
      switch (charat(c5, strlen(c5) - 3 - (~indexof(c5, "!important") && 10))) {
        case 107:
          return replace(c5, ":", ":" + a1) + c5;
        case 101:
          return replace(c5, /(.+:)([^;!]+)(;|!.+)?/, "$1" + a1 + (charat(c5, 14) === 45 ? "inline-" : "") + "box$3$1" + a1 + "$2$3$1" + e2 + "$2box$3") + c5;
      }
      break;
    case 5936:
      switch (charat(c5, t32 + 11)) {
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
  for (var t42 = 0; t42 < c6; t42++)
    a8 += r18(e31[t42], t42, e31, r18) || "";
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
  return strlen(a9 = serialize(e32.children, s4)) ? e32.return = e32.value + "{" + a9 + "}" : "";
}
function middleware(e33) {
  var r19 = sizeof(e33);
  return function(a10, c7, t52, n42) {
    var s5 = "";
    for (var i32 = 0; i32 < r19; i32++)
      s5 += e33[i32](a10, c7, t52, n42) || "";
    return s5;
  };
}
function prefixer(c8, s, i, u32) {
  if (c8.length > -1 && !c8.return) {
    switch (c8.type) {
      case n1:
        c8.return = prefix(c8.value, c8.length);
        break;
      case v:
        return serialize([
          copy(c8, {
            value: replace(c8.value, "@", "@" + a1)
          })
        ], u32);
      case t1:
        if (c8.length) {
          return combine(c8.props, function(t6) {
            switch (match(t6, /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                return serialize([
                  copy(c8, {
                    props: [
                      replace(t6, /:(read-\w+)/, ":" + r1 + "$1")
                    ]
                  })
                ], u32);
              case "::placeholder":
                return serialize([
                  copy(c8, {
                    props: [
                      replace(t6, /:(plac\w+)/, ":" + a1 + "input-$1")
                    ]
                  }),
                  copy(c8, {
                    props: [
                      replace(t6, /:(plac\w+)/, ":" + r1 + "$1")
                    ]
                  }),
                  copy(c8, {
                    props: [
                      replace(t6, /:(plac\w+)/, e2 + "input-$1")
                    ]
                  })
                ], u32);
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
var g1 = function identifierWithPointTracking(e22, i12, s) {
  var u12 = 0;
  var l12 = 0;
  while (true) {
    u12 = l12;
    l12 = peek();
    u12 === 38 && l12 === 12 && (i12[s] = 1);
    if (token(l12))
      break;
    next();
  }
  return slice(e22, y);
};
var b4 = function toRules(e32, o12) {
  var u22 = -1;
  var l22 = 44;
  do {
    switch (token(l22)) {
      case 0:
        l22 === 38 && peek() === 12 && (o12[u22] = 1);
        e32[u22] += g1(y - 1, o12, u22);
        break;
      case 2:
        e32[u22] += delimit(l22);
        break;
      case 4:
        if (l22 === 44) {
          e32[++u22] = peek() === 58 ? "&\f" : "";
          o12[u22] = e32[u22].length;
          break;
        }
      default:
        e32[u22] += w(l22);
    }
  } while (l22 = next());
  return e32;
};
var w1 = function getRules(e42, r12) {
  return dealloc(b4(alloc(e42), r12));
};
var E = /* @__PURE__ */ new WeakMap();
var k1 = function compat(e5) {
  if (e5.type === "rule" && e5.parent && !(e5.length < 1)) {
    var r22 = e5.value, t12 = e5.parent;
    var n12 = e5.column === t12.column && e5.line === t12.line;
    while (t12.type !== "rule") {
      t12 = t12.parent;
      if (!t12)
        return;
    }
    if ((e5.props.length !== 1 || r22.charCodeAt(0) === 58 || E.get(t12)) && !n12) {
      E.set(e5, true);
      var o22 = [];
      var a12 = w1(r22, o22);
      var i22 = t12.props;
      for (var s12 = 0, u32 = 0; s12 < a12.length; s12++) {
        for (var l3 = 0; l3 < i22.length; l3++, u32++) {
          e5.props[u32] = o22[s12] ? a12[s12].replace(/&\f/g, i22[l3]) : i22[l3] + " " + a12[s12];
        }
      }
    }
  }
};
var A = function removeLabel(e6) {
  if (e6.type === "decl") {
    var r32 = e6.value;
    if (r32.charCodeAt(0) === 108 && r32.charCodeAt(2) === 98) {
      e6.return = "";
      e6.value = "";
    }
  }
};
var N = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason";
var C1 = function isIgnoringComment(e7) {
  return !!e7 && e7.type === "comm" && e7.children.indexOf(N) > -1;
};
var P = function createUnsafeSelectorsAlarm(e8) {
  return function(r4, t22, n22) {
    if (r4.type === "rule") {
      var o32 = r4.value.match(/(:first|:nth|:nth-last)-child/g);
      if (o32 && e8.compat !== true) {
        var a22 = t22 > 0 ? n22[t22 - 1] : null;
        if (a22 && C1(y1(a22.children)))
          return;
        o32.forEach(function(e9) {
          console.error('The pseudo class "' + e9 + '" is potentially unsafe when doing server-side rendering. Try changing it to "' + e9.split("-child")[0] + '-of-type".');
        });
      }
    }
  };
};
var O = function isImportRule(e10) {
  return e10.type.charCodeAt(1) === 105 && e10.type.charCodeAt(0) === 64;
};
var D = function isPrependedWithRegularRules(e11, r5) {
  for (var t32 = e11 - 1; t32 >= 0; t32--)
    if (!O(r5[t32]))
      return true;
  return false;
};
var R = function nullifyElement(e12) {
  e12.type = "";
  e12.value = "";
  e12.return = "";
  e12.children = "";
  e12.props = "";
};
var V = function incorrectImportAlarm(e13, r6, t42) {
  if (O(e13)) {
    if (e13.parent) {
      console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
      R(e13);
    } else if (D(r6, t42)) {
      console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
      R(e13);
    }
  }
};
var _ = [
  prefixer
];
var q = function createCache(r7) {
  var t52 = r7.key;
  if (!t52) {
    throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements.");
  }
  if (t52 === "css") {
    var n32 = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(n32, function(e14) {
      var r8 = e14.getAttribute("data-emotion");
      if (r8.indexOf(" ") !== -1) {
        document.head.appendChild(e14);
        e14.setAttribute("data-s", "");
      }
    });
  }
  var o4 = r7.stylisPlugins || _;
  if (/[^a-z-]/.test(t52)) {
    throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + t52 + '" was passed');
  }
  var a32 = {};
  var i32;
  var s22 = [];
  i32 = r7.container || document.head;
  Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="' + t52 + ' "]'), function(e15) {
    var r9 = e15.getAttribute("data-emotion").split(" ");
    for (var t6 = 1; t6 < r9.length; t6++)
      a32[r9[t6]] = true;
    s22.push(e15);
  });
  var u4;
  var l4 = [
    k1,
    A
  ];
  l4.push(P({
    get compat() {
      return w11.compat;
    }
  }), V);
  var c12;
  var y11 = [
    stringify,
    true ? function(e16) {
      e16.root || (e16.return ? c12.insert(e16.return) : e16.value && e16.type !== c1 && c12.insert(e16.value + "{}"));
    } : rulesheet(function(e17) {
      c12.insert(e17);
    })
  ];
  var g11 = middleware(l4.concat(o4, y11));
  var b12 = function stylis(e18) {
    return serialize(compile(e18), g11);
  };
  u4 = function insert(e19, r10, t7, n42) {
    c12 = t7;
    r10.map !== void 0 && (c12 = {
      insert: function insert2(e20) {
        t7.insert(e20 + r10.map);
      }
    });
    b12(e19 ? e19 + "{" + r10.styles + "}" : r10.styles);
    n42 && (w11.inserted[r10.name] = true);
  };
  var w11 = {
    key: t52,
    sheet: new e1({
      key: t52,
      container: i32,
      nonce: r7.nonce,
      speedy: r7.speedy,
      prepend: r7.prepend,
      insertionPoint: r7.insertionPoint
    }),
    nonce: r7.nonce,
    inserted: a32,
    registered: {},
    insert: u4
  };
  w11.sheet.hydrate(s22);
  return w11;
};
var r2 = {};
var e3 = Object.getOwnPropertySymbols;
var t2 = Object.prototype.hasOwnProperty;
var n2 = Object.prototype.propertyIsEnumerable;
function toObject(r13) {
  if (r13 === null || r13 === void 0) {
    throw new TypeError("Object.assign cannot be called with null or undefined");
  }
  return Object(r13);
}
function shouldUseNative() {
  try {
    if (!Object.assign)
      return false;
    var r21 = new String("abc");
    r21[5] = "de";
    if (Object.getOwnPropertyNames(r21)[0] === "5")
      return false;
    var e13 = {};
    for (var t13 = 0; t13 < 10; t13++) {
      e13["_" + String.fromCharCode(t13)] = t13;
    }
    var n13 = Object.getOwnPropertyNames(e13).map(function(r) {
      return e13[r];
    });
    if (n13.join("") !== "0123456789")
      return false;
    var a13 = {};
    "abcdefghijklmnopqrst".split("").forEach(function(r32) {
      a13[r32] = r32;
    });
    return Object.keys(Object.assign({}, a13)).join("") === "abcdefghijklmnopqrst";
  } catch (r) {
    return false;
  }
}
r2 = shouldUseNative() ? Object.assign : function(r4, a6) {
  var o4;
  var c5 = toObject(r4);
  var i4;
  for (var s4 = 1; s4 < arguments.length; s4++) {
    o4 = Object(arguments[s4]);
    for (var f2 in o4)
      t2.call(o4, f2) && (c5[f2] = o4[f2]);
    if (e3) {
      i4 = e3(o4);
      for (var l3 = 0; l3 < i4.length; l3++) {
        n2.call(o4, i4[l3]) && (c5[i4[l3]] = o4[i4[l3]]);
      }
    }
  }
  return c5;
};
var a2 = r2;
var mod = {
  default: a2
};
var e4 = window.React;
var { createContext: t3 } = e4;
var { useDebugValue: o1 } = e4;
var { useState: s1 } = e4;
var { useId: n3 } = e4;
var { useRef: c2 } = e4;
var { useContext: r3 } = e4;
var { useEffect: a3 } = e4;
var { useLayoutEffect: p1 } = e4;
var { useReducer: x2 } = e4;
var { useCallback: u1 } = e4;
var { forwardRef: l1 } = e4;
var { createElement: f } = e4;
var { createFactory: m1 } = e4;
var { createRef: R1 } = e4;
var { Fragment: d } = e4;
var { Component: i1 } = e4;
var { Suspense: y2 } = e4;
var { isValidElement: C2 } = e4;
var { memo: w2 } = e4;
var { useImperativeHandle: E1 } = e4;
var { Children: b1 } = e4;
var { lazy: g2 } = e4;
var { isLazy: S } = e4;
var { useMemo: V1 } = e4;
var { cloneElement: k2 } = e4;
var D1 = e4;
var mod1 = {
  Children: b1,
  Component: i1,
  Fragment: d,
  Suspense: y2,
  cloneElement: k2,
  createContext: t3,
  createElement: f,
  createFactory: m1,
  createRef: R1,
  default: D1,
  forwardRef: l1,
  isLazy: S,
  isValidElement: C2,
  lazy: g2,
  memo: w2,
  useCallback: u1,
  useContext: r3,
  useDebugValue: o1,
  useEffect: a3,
  useId: n3,
  useImperativeHandle: E1,
  useLayoutEffect: p1,
  useMemo: V1,
  useReducer: x2,
  useRef: c2,
  useState: s1
};
var a4 = "default" in mod ? mod.default : mod;
var o2 = "default" in mod1 ? mod1.default : mod1;
var i2 = {};
var c3 = a4;
var u2 = o2;
function l2(e14) {
  for (var r14 = "https://reactjs.org/docs/error-decoder.html?invariant=" + e14, a14 = 1; a14 < arguments.length; a14++) {
    r14 += "&args[]=" + encodeURIComponent(arguments[a14]);
  }
  return "Minified React error #" + e14 + "; visit " + r14 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function n4(e23, r22) {
  e23.enqueue(r22);
  return 0 < e23.desiredSize;
}
var s2 = new TextEncoder();
function p2(e31) {
  return s2.encode(e31);
}
function t4(e41) {
  return s2.encode(e41);
}
function ca(e5, r31) {
  typeof e5.error === "function" ? e5.error(r31) : e5.close();
}
var d1 = Object.prototype.hasOwnProperty;
var h1 = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
var g3 = {};
var m2 = {};
function ha(e6) {
  if (d1.call(m2, e6))
    return true;
  if (d1.call(g3, e6))
    return false;
  if (h1.test(e6))
    return m2[e6] = true;
  g3[e6] = true;
  return false;
}
function v1(e7, r4, a21, o11, i11, c13, u11) {
  this.acceptsBooleans = r4 === 2 || r4 === 3 || r4 === 4;
  this.attributeName = o11;
  this.attributeNamespace = i11;
  this.mustUseProperty = a21;
  this.propertyName = e7;
  this.type = r4;
  this.sanitizeURL = c13;
  this.removeEmptyString = u11;
}
var b3 = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e8) {
  b3[e8] = new v1(e8, 0, false, e8, null, false, false);
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
].forEach(function(e9) {
  var r5 = e9[0];
  b3[r5] = new v1(r5, 1, false, e9[1], null, false, false);
});
[
  "contentEditable",
  "draggable",
  "spellCheck",
  "value"
].forEach(function(e10) {
  b3[e10] = new v1(e10, 2, false, e10.toLowerCase(), null, false, false);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha"
].forEach(function(e11) {
  b3[e11] = new v1(e11, 2, false, e11, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e12) {
  b3[e12] = new v1(e12, 3, false, e12.toLowerCase(), null, false, false);
});
[
  "checked",
  "multiple",
  "muted",
  "selected"
].forEach(function(e13) {
  b3[e13] = new v1(e13, 3, true, e13, null, false, false);
});
[
  "capture",
  "download"
].forEach(function(e14) {
  b3[e14] = new v1(e14, 4, false, e14, null, false, false);
});
[
  "cols",
  "rows",
  "size",
  "span"
].forEach(function(e15) {
  b3[e15] = new v1(e15, 6, false, e15, null, false, false);
});
[
  "rowSpan",
  "start"
].forEach(function(e16) {
  b3[e16] = new v1(e16, 5, false, e16.toLowerCase(), null, false, false);
});
var k3 = /[\-:]([a-z])/g;
function ja(e17) {
  return e17[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e18) {
  var r6 = e18.replace(k3, ja);
  b3[r6] = new v1(r6, 1, false, e18, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e19) {
  var r7 = e19.replace(k3, ja);
  b3[r7] = new v1(r7, 1, false, e19, "http://www.w3.org/1999/xlink", false, false);
});
[
  "xml:base",
  "xml:lang",
  "xml:space"
].forEach(function(e20) {
  var r8 = e20.replace(k3, ja);
  b3[r8] = new v1(r8, 1, false, e20, "http://www.w3.org/XML/1998/namespace", false, false);
});
[
  "tabIndex",
  "crossOrigin"
].forEach(function(e21) {
  b3[e21] = new v1(e21, 1, false, e21.toLowerCase(), null, false, false);
});
b3.xlinkHref = new v1("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
[
  "src",
  "href",
  "action",
  "formAction"
].forEach(function(e22) {
  b3[e22] = new v1(e22, 1, false, e22.toLowerCase(), null, true, true);
});
var x3 = {
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
var S1 = [
  "Webkit",
  "ms",
  "Moz",
  "O"
];
Object.keys(x3).forEach(function(e23) {
  S1.forEach(function(r9) {
    r9 = r9 + e23.charAt(0).toUpperCase() + e23.substring(1);
    x3[r9] = x3[e23];
  });
});
var w3 = /["'&<>]/;
function y3(e24) {
  if (typeof e24 === "boolean" || typeof e24 === "number")
    return "" + e24;
  e24 = "" + e24;
  var r10 = w3.exec(e24);
  if (r10) {
    var a31, o21 = "", i21 = 0;
    for (a31 = r10.index; a31 < e24.length; a31++) {
      switch (e24.charCodeAt(a31)) {
        case 34:
          r10 = "&quot;";
          break;
        case 38:
          r10 = "&amp;";
          break;
        case 39:
          r10 = "&#x27;";
          break;
        case 60:
          r10 = "&lt;";
          break;
        case 62:
          r10 = "&gt;";
          break;
        default:
          continue;
      }
      i21 !== a31 && (o21 += e24.substring(i21, a31));
      i21 = a31 + 1;
      o21 += r10;
    }
    e24 = i21 !== a31 ? o21 + e24.substring(i21, a31) : o21;
  }
  return e24;
}
var C3 = /([A-Z])/g;
var E2 = /^ms-/;
var F = Array.isArray;
var R2 = t4("<script>");
var _1 = t4("<\/script>");
var T = t4('<script src="');
var M = t4('<script type="module" src="');
var P1 = t4('" async=""><\/script>');
function ua(e25, r11, a41, o32, i32) {
  e25 = e25 === void 0 ? "" : e25;
  r11 = r11 === void 0 ? R2 : t4('<script nonce="' + y3(r11) + '">');
  var c21 = [];
  a41 !== void 0 && c21.push(r11, p2(y3(a41)), _1);
  if (o32 !== void 0) {
    for (a41 = 0; a41 < o32.length; a41++)
      c21.push(T, p2(y3(o32[a41])), P1);
  }
  if (i32 !== void 0) {
    for (o32 = 0; o32 < i32.length; o32++)
      c21.push(M, p2(y3(i32[o32])), P1);
  }
  return {
    bootstrapChunks: c21,
    startInlineScript: r11,
    placeholderPrefix: t4(e25 + "P:"),
    segmentPrefix: t4(e25 + "S:"),
    boundaryPrefix: e25 + "B:",
    idPrefix: e25 + "R:",
    nextSuspenseID: 0,
    sentCompleteSegmentFunction: false,
    sentCompleteBoundaryFunction: false,
    sentClientRenderFunction: false
  };
}
function z1(e26, r12) {
  return {
    insertionMode: e26,
    selectedValue: r12
  };
}
function va(e27) {
  return z1(e27 === "http://www.w3.org/2000/svg" ? 2 : e27 === "http://www.w3.org/1998/Math/MathML" ? 3 : 0, null);
}
function wa(e28, r13, a52) {
  switch (r13) {
    case "select":
      return z1(1, a52.value != null ? a52.value : a52.defaultValue);
    case "svg":
      return z1(2, null);
    case "math":
      return z1(3, null);
    case "foreignObject":
      return z1(1, null);
    case "table":
      return z1(4, null);
    case "thead":
    case "tbody":
    case "tfoot":
      return z1(5, null);
    case "colgroup":
      return z1(7, null);
    case "tr":
      return z1(6, null);
  }
  return 4 <= e28.insertionMode || e28.insertionMode === 0 ? z1(1, null) : e28;
}
var B = t4("<!-- -->");
var D2 = /* @__PURE__ */ new Map();
var L = t4(' style="');
var $1 = t4(":");
var j1 = t4(";");
function Ca(e29, r14, a6) {
  if (typeof a6 !== "object")
    throw Error(l2(62));
  r14 = true;
  for (var o4 in a6) {
    if (d1.call(a6, o4)) {
      var i4 = a6[o4];
      if (i4 != null && typeof i4 !== "boolean" && i4 !== "") {
        if (o4.indexOf("--") === 0) {
          var c = p2(y3(o4));
          i4 = p2(y3(("" + i4).trim()));
        } else {
          c = o4;
          var u21 = D2.get(c);
          u21 !== void 0 || (u21 = t4(y3(c.replace(C3, "-$1").toLowerCase().replace(E2, "-ms-"))), D2.set(c, u21)), c = u21;
          i4 = typeof i4 === "number" ? i4 === 0 || d1.call(x3, o4) ? p2("" + i4) : p2(i4 + "px") : p2(y3(("" + i4).trim()));
        }
        r14 ? (r14 = false, e29.push(L, c, $1, i4)) : e29.push(j1, c, $1, i4);
      }
    }
  }
  r14 || e29.push(H);
}
var A1 = t4(" ");
var V2 = t4('="');
var H = t4('"');
var q1 = t4('=""');
function G(e30, r15, a7, o5) {
  switch (a7) {
    case "style":
      Ca(e30, r15, o5);
      return;
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
      return;
  }
  if (!(2 < a7.length) || a7[0] !== "o" && a7[0] !== "O" || a7[1] !== "n" && a7[1] !== "N") {
    if (r15 = b3.hasOwnProperty(a7) ? b3[a7] : null, r15 !== null) {
      switch (typeof o5) {
        case "function":
        case "symbol":
          return;
        case "boolean":
          if (!r15.acceptsBooleans)
            return;
      }
      a7 = p2(r15.attributeName);
      switch (r15.type) {
        case 3:
          o5 && e30.push(A1, a7, q1);
          break;
        case 4:
          o5 === true ? e30.push(A1, a7, q1) : o5 !== false && e30.push(A1, a7, V2, p2(y3(o5)), H);
          break;
        case 5:
          isNaN(o5) || e30.push(A1, a7, V2, p2(y3(o5)), H);
          break;
        case 6:
          !isNaN(o5) && 1 <= o5 && e30.push(A1, a7, V2, p2(y3(o5)), H);
          break;
        default:
          r15.sanitizeURL && (o5 = "" + o5), e30.push(A1, a7, V2, p2(y3(o5)), H);
      }
    } else if (ha(a7)) {
      switch (typeof o5) {
        case "function":
        case "symbol":
          return;
        case "boolean":
          if (r15 = a7.toLowerCase().slice(0, 5), r15 !== "data-" && r15 !== "aria-") {
            return;
          }
      }
      e30.push(A1, p2(a7), V2, p2(y3(o5)), H);
    }
  }
}
var W = t4(">");
var U = t4("/>");
function I(e31, r16, a8) {
  if (r16 != null) {
    if (a8 != null)
      throw Error(l2(60));
    if (typeof r16 !== "object" || !("__html" in r16))
      throw Error(l2(61));
    r16 = r16.__html;
    r16 !== null && r16 !== void 0 && e31.push(p2("" + r16));
  }
}
function Fa(e32) {
  var r17 = "";
  u2.Children.forEach(e32, function(e33) {
    e33 != null && (r17 += e33);
  });
  return r17;
}
var Q = t4(' selected=""');
function Ha(e34, r18, a9, o6) {
  e34.push(J(a9));
  var i5, c = a9 = null;
  for (i5 in r18) {
    if (d1.call(r18, i5)) {
      var u32 = r18[i5];
      if (u32 != null) {
        switch (i5) {
          case "children":
            a9 = u32;
            break;
          case "dangerouslySetInnerHTML":
            c = u32;
            break;
          default:
            G(e34, o6, i5, u32);
        }
      }
    }
  }
  e34.push(W);
  I(e34, c, a9);
  return typeof a9 === "string" ? (e34.push(p2(y3(a9))), null) : a9;
}
var K = t4("\n");
var ee = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
var te = /* @__PURE__ */ new Map();
function J(e35) {
  var r19 = te.get(e35);
  if (r19 === void 0) {
    if (!ee.test(e35))
      throw Error(l2(65, e35));
    r19 = t4("<" + e35);
    te.set(e35, r19);
  }
  return r19;
}
var ne = t4("<!DOCTYPE html>");
function Ma(e36, r20, a10, o7, i6) {
  switch (r20) {
    case "select":
      e36.push(J("select"));
      var c = null, u4 = null;
      for (m11 in a10) {
        if (d1.call(a10, m11)) {
          var s11 = a10[m11];
          if (s11 != null) {
            switch (m11) {
              case "children":
                c = s11;
                break;
              case "dangerouslySetInnerHTML":
                u4 = s11;
                break;
              case "defaultValue":
              case "value":
                break;
              default:
                G(e36, o7, m11, s11);
            }
          }
        }
      }
      e36.push(W);
      I(e36, u4, c);
      return c;
    case "option":
      u4 = i6.selectedValue;
      e36.push(J("option"));
      var h11 = s11 = null, g12 = null;
      var m11 = null;
      for (c in a10) {
        if (d1.call(a10, c) && (r20 = a10[c], r20 != null)) {
          switch (c) {
            case "children":
              s11 = r20;
              break;
            case "selected":
              g12 = r20;
              break;
            case "dangerouslySetInnerHTML":
              m11 = r20;
              break;
            case "value":
              h11 = r20;
            default:
              G(e36, o7, c, r20);
          }
        }
      }
      if (u4 !== null) {
        if (a10 = h11 !== null ? "" + h11 : Fa(s11), F(u4)) {
          for (o7 = 0; o7 < u4.length; o7++) {
            if ("" + u4[o7] === a10) {
              e36.push(Q);
              break;
            }
          }
        } else
          u4 === a10 && e36.push(Q);
      } else
        g12 && e36.push(Q);
      e36.push(W);
      I(e36, m11, s11);
      return s11;
    case "textarea":
      e36.push(J("textarea"));
      m11 = u4 = c = null;
      for (s11 in a10) {
        if (d1.call(a10, s11) && (h11 = a10[s11], h11 != null)) {
          switch (s11) {
            case "children":
              m11 = h11;
              break;
            case "value":
              c = h11;
              break;
            case "defaultValue":
              u4 = h11;
              break;
            case "dangerouslySetInnerHTML":
              throw Error(l2(91));
            default:
              G(e36, o7, s11, h11);
          }
        }
      }
      c === null && u4 !== null && (c = u4);
      e36.push(W);
      if (m11 != null) {
        if (c != null)
          throw Error(l2(92));
        if (F(m11) && 1 < m11.length)
          throw Error(l2(93));
        c = "" + m11;
      }
      typeof c === "string" && c[0] === "\n" && e36.push(K);
      return c;
    case "input":
      e36.push(J("input"));
      h11 = m11 = s11 = c = null;
      for (u4 in a10) {
        if (d1.call(a10, u4) && (g12 = a10[u4], g12 != null)) {
          switch (u4) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(l2(399, "input"));
            case "defaultChecked":
              h11 = g12;
              break;
            case "defaultValue":
              s11 = g12;
              break;
            case "checked":
              m11 = g12;
              break;
            case "value":
              c = g12;
              break;
            default:
              G(e36, o7, u4, g12);
          }
        }
      }
      m11 !== null ? G(e36, o7, "checked", m11) : h11 !== null && G(e36, o7, "checked", h11);
      c !== null ? G(e36, o7, "value", c) : s11 !== null && G(e36, o7, "value", s11);
      e36.push(U);
      return null;
    case "menuitem":
      e36.push(J("menuitem"));
      for (var b11 in a10) {
        if (d1.call(a10, b11) && (c = a10[b11], c != null)) {
          switch (b11) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(l2(400));
            default:
              G(e36, o7, b11, c);
          }
        }
      }
      e36.push(W);
      return null;
    case "listing":
    case "pre":
      e36.push(J(r20));
      u4 = c = null;
      for (h11 in a10) {
        if (d1.call(a10, h11) && (s11 = a10[h11], s11 != null)) {
          switch (h11) {
            case "children":
              c = s11;
              break;
            case "dangerouslySetInnerHTML":
              u4 = s11;
              break;
            default:
              G(e36, o7, h11, s11);
          }
        }
      }
      e36.push(W);
      if (u4 != null) {
        if (c != null)
          throw Error(l2(60));
        if (typeof u4 !== "object" || !("__html" in u4))
          throw Error(l2(61));
        a10 = u4.__html;
        a10 !== null && a10 !== void 0 && (typeof a10 === "string" && 0 < a10.length && a10[0] === "\n" ? e36.push(K, p2(a10)) : e36.push(p2("" + a10)));
      }
      typeof c === "string" && c[0] === "\n" && e36.push(K);
      return c;
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
      e36.push(J(r20));
      for (var k11 in a10) {
        if (d1.call(a10, k11) && (c = a10[k11], c != null)) {
          switch (k11) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(l2(399, r20));
            default:
              G(e36, o7, k11, c);
          }
        }
      }
      e36.push(U);
      return null;
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return Ha(e36, a10, r20, o7);
    case "html":
      return i6.insertionMode === 0 && e36.push(ne), Ha(e36, a10, r20, o7);
    default:
      if (r20.indexOf("-") === -1 && typeof a10.is !== "string") {
        return Ha(e36, a10, r20, o7);
      }
      e36.push(J(r20));
      u4 = c = null;
      for (g12 in a10) {
        if (d1.call(a10, g12) && (s11 = a10[g12], s11 != null)) {
          switch (g12) {
            case "children":
              c = s11;
              break;
            case "dangerouslySetInnerHTML":
              u4 = s11;
              break;
            case "style":
              Ca(e36, o7, s11);
              break;
            case "suppressContentEditableWarning":
            case "suppressHydrationWarning":
              break;
            default:
              ha(g12) && typeof s11 !== "function" && typeof s11 !== "symbol" && e36.push(A1, p2(g12), V2, p2(y3(s11)), H);
          }
        }
      }
      e36.push(W);
      I(e36, u4, c);
      return c;
  }
}
var re = t4("</");
var ae = t4(">");
var oe = t4('<template id="');
var le = t4('"></template>');
var ie = t4("<!--$-->");
var ce = t4('<!--$?--><template id="');
var ue = t4('"></template>');
var se = t4("<!--$!-->");
var fe = t4("<!--/$-->");
function Wa(e37, r, a11) {
  n4(e37, ce);
  if (a11 === null)
    throw Error(l2(395));
  n4(e37, a11);
  return n4(e37, ue);
}
var de = t4('<div hidden id="');
var pe = t4('">');
var he = t4("</div>");
var ge = t4('<svg aria-hidden="true" style="display:none" id="');
var me = t4('">');
var ve = t4("</svg>");
var be = t4('<math aria-hidden="true" style="display:none" id="');
var ye = t4('">');
var ke = t4("</math>");
var xe = t4('<table hidden id="');
var Se = t4('">');
var we = t4("</table>");
var Ce = t4('<table hidden><tbody id="');
var Ee = t4('">');
var Fe = t4("</tbody></table>");
var Re = t4('<table hidden><tr id="');
var _e = t4('">');
var Te = t4("</tr></table>");
var Ie = t4('<table hidden><colgroup id="');
var Me = t4('">');
var Pe = t4("</colgroup></table>");
function rb(e38, r21, a12, o8) {
  switch (a12.insertionMode) {
    case 0:
    case 1:
      return n4(e38, de), n4(e38, r21.segmentPrefix), n4(e38, p2(o8.toString(16))), n4(e38, pe);
    case 2:
      return n4(e38, ge), n4(e38, r21.segmentPrefix), n4(e38, p2(o8.toString(16))), n4(e38, me);
    case 3:
      return n4(e38, be), n4(e38, r21.segmentPrefix), n4(e38, p2(o8.toString(16))), n4(e38, ye);
    case 4:
      return n4(e38, xe), n4(e38, r21.segmentPrefix), n4(e38, p2(o8.toString(16))), n4(e38, Se);
    case 5:
      return n4(e38, Ce), n4(e38, r21.segmentPrefix), n4(e38, p2(o8.toString(16))), n4(e38, Ee);
    case 6:
      return n4(e38, Re), n4(e38, r21.segmentPrefix), n4(e38, p2(o8.toString(16))), n4(e38, _e);
    case 7:
      return n4(e38, Ie), n4(e38, r21.segmentPrefix), n4(e38, p2(o8.toString(16))), n4(e38, Me);
    default:
      throw Error(l2(397));
  }
}
function sb(e39, r22) {
  switch (r22.insertionMode) {
    case 0:
    case 1:
      return n4(e39, he);
    case 2:
      return n4(e39, ve);
    case 3:
      return n4(e39, ke);
    case 4:
      return n4(e39, we);
    case 5:
      return n4(e39, Fe);
    case 6:
      return n4(e39, Te);
    case 7:
      return n4(e39, Pe);
    default:
      throw Error(l2(397));
  }
}
var ze = t4('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("');
var Be = t4('$RS("');
var Ne = t4('","');
var De = t4('")<\/script>');
var Oe = t4('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("');
var Le = t4('$RC("');
var $e = t4('","');
var je = t4('")<\/script>');
var Ae = t4('function $RX(a){if(a=document.getElementById(a))a=a.previousSibling,a.data="$!",a._reactRetry&&a._reactRetry()};$RX("');
var Ve = t4('$RX("');
var He = t4('")<\/script>');
var qe = 60103;
var We = 60106;
var Ze = 60107;
var Ge = 60108;
var Ue = 60114;
var Xe = 60109;
var Je = 60110;
var Ye = 60112;
var Qe = 60113;
var Ke = 60120;
var et = 60115;
var tt = 60116;
var nt = 60119;
var rt = 60129;
var at = 60131;
var ot = 60132;
if (typeof Symbol === "function" && Symbol.for) {
  lt = Symbol.for;
  qe = lt("react.element");
  We = lt("react.portal");
  Ze = lt("react.fragment");
  Ge = lt("react.strict_mode");
  Ue = lt("react.profiler");
  Xe = lt("react.provider");
  Je = lt("react.context");
  Ye = lt("react.forward_ref");
  Qe = lt("react.suspense");
  Ke = lt("react.suspense_list");
  et = lt("react.memo");
  tt = lt("react.lazy");
  nt = lt("react.scope");
  rt = lt("react.debug_trace_mode");
  at = lt("react.legacy_hidden");
  ot = lt("react.cache");
}
var lt;
var it = typeof Symbol === "function" && Symbol.iterator;
function Ub(e40) {
  if (e40 == null)
    return null;
  if (typeof e40 === "function")
    return e40.displayName || e40.name || null;
  if (typeof e40 === "string")
    return e40;
  switch (e40) {
    case Ze:
      return "Fragment";
    case We:
      return "Portal";
    case Ue:
      return "Profiler";
    case Ge:
      return "StrictMode";
    case Qe:
      return "Suspense";
    case Ke:
      return "SuspenseList";
    case ot:
      return "Cache";
  }
  if (typeof e40 === "object") {
    switch (e40.$$typeof) {
      case Je:
        return (e40.displayName || "Context") + ".Consumer";
      case Xe:
        return (e40._context.displayName || "Context") + ".Provider";
      case Ye:
        var r23 = e40.render;
        e40 = e40.displayName;
        e40 || (e40 = r23.displayName || r23.name || "", e40 = e40 !== "" ? "ForwardRef(" + e40 + ")" : "ForwardRef");
        return e40;
      case et:
        return r23 = e40.displayName || null, r23 !== null ? r23 : Ub(e40.type) || "Memo";
      case tt:
        r23 = e40._payload;
        e40 = e40._init;
        try {
          return Ub(e40(r23));
        } catch (e5) {
        }
    }
  }
  return null;
}
var ct = {};
function Wb(e41, r24) {
  e41 = e41.contextTypes;
  if (!e41)
    return ct;
  var a13, o9 = {};
  for (a13 in e41)
    o9[a13] = r24[a13];
  return o9;
}
var ut = null;
function N1(e42, r25) {
  if (e42 !== r25) {
    e42.context._currentValue = e42.parentValue;
    e42 = e42.parent;
    var a14 = r25.parent;
    if (e42 === null) {
      if (a14 !== null)
        throw Error(l2(401));
    } else {
      if (a14 === null)
        throw Error(l2(401));
      N1(e42, a14);
      r25.context._currentValue = r25.value;
    }
  }
}
function Xb(e43) {
  e43.context._currentValue = e43.parentValue;
  e43 = e43.parent;
  e43 !== null && Xb(e43);
}
function Yb(e44) {
  var r26 = e44.parent;
  r26 !== null && Yb(r26);
  e44.context._currentValue = e44.value;
}
function Zb(e45, r27) {
  e45.context._currentValue = e45.parentValue;
  e45 = e45.parent;
  if (e45 === null)
    throw Error(l2(402));
  e45.depth === r27.depth ? N1(e45, r27) : Zb(e45, r27);
}
function $b(e46, r28) {
  var a15 = r28.parent;
  if (a15 === null)
    throw Error(l2(402));
  e46.depth === a15.depth ? N1(e46, a15) : $b(e46, a15);
  r28.context._currentValue = r28.value;
}
function O1(e47) {
  var r29 = ut;
  r29 !== e47 && (r29 === null ? Yb(e47) : e47 === null ? Xb(r29) : r29.depth === e47.depth ? N1(r29, e47) : r29.depth > e47.depth ? Zb(r29, e47) : $b(r29, e47), ut = e47);
}
var st = {
  isMounted: function() {
    return false;
  },
  enqueueSetState: function(e48, r30) {
    e48 = e48._reactInternals;
    e48.queue !== null && e48.queue.push(r30);
  },
  enqueueReplaceState: function(e49, r31) {
    e49 = e49._reactInternals;
    e49.replace = true;
    e49.queue = [
      r31
    ];
  },
  enqueueForceUpdate: function() {
  }
};
function bc(e50, r32, a16, o10) {
  var i7 = e50.state !== void 0 ? e50.state : null;
  e50.updater = st;
  e50.props = a16;
  e50.state = i7;
  var u5 = {
    queue: [],
    replace: false
  };
  e50._reactInternals = u5;
  var s21 = r32.contextType;
  e50.context = typeof s21 === "object" && s21 !== null ? s21._currentValue : o10;
  s21 = r32.getDerivedStateFromProps;
  typeof s21 === "function" && (s21 = s21(a16, i7), i7 = s21 === null || s21 === void 0 ? i7 : c3({}, i7, s21), e50.state = i7);
  if (typeof r32.getDerivedStateFromProps !== "function" && typeof e50.getSnapshotBeforeUpdate !== "function" && (typeof e50.UNSAFE_componentWillMount === "function" || typeof e50.componentWillMount === "function")) {
    if (r32 = e50.state, typeof e50.componentWillMount === "function" && e50.componentWillMount(), typeof e50.UNSAFE_componentWillMount === "function" && e50.UNSAFE_componentWillMount(), r32 !== e50.state && st.enqueueReplaceState(e50, e50.state, null), u5.queue !== null && 0 < u5.queue.length) {
      if (r32 = u5.queue, s21 = u5.replace, u5.queue = null, u5.replace = false, s21 && r32.length === 1) {
        e50.state = r32[0];
      } else {
        u5 = s21 ? r32[0] : e50.state;
        i7 = true;
        for (s21 = s21 ? 1 : 0; s21 < r32.length; s21++) {
          var d11 = r32[s21];
          d11 = typeof d11 === "function" ? d11.call(e50, u5, a16, o10) : d11;
          d11 != null && (i7 ? (i7 = false, u5 = c3({}, u5, d11)) : c3(u5, d11));
        }
        e50.state = u5;
      }
    } else
      u5.queue = null;
  }
}
var ft = {
  id: 1,
  overflow: ""
};
function dc(e51, r33, a17) {
  var o11 = e51.id;
  e51 = e51.overflow;
  var i8 = 32 - dt(o11) - 1;
  o11 &= ~(1 << i8);
  a17 += 1;
  var c = 32 - dt(r33) + i8;
  if (30 < c) {
    var u6 = i8 - i8 % 5;
    c = (o11 & (1 << u6) - 1).toString(32);
    o11 >>= u6;
    i8 -= u6;
    return {
      id: 1 << 32 - dt(r33) + i8 | a17 << i8 | o11,
      overflow: c + e51
    };
  }
  return {
    id: 1 << c | a17 << i8 | o11,
    overflow: e51
  };
}
var dt = Math.clz32 ? Math.clz32 : ec;
var pt = Math.log;
var ht = Math.LN2;
function ec(e52) {
  e52 >>>= 0;
  return e52 === 0 ? 32 : 31 - (pt(e52) / ht | 0) | 0;
}
function hc(e53, r34) {
  return e53 === r34 && (e53 !== 0 || 1 / e53 === 1 / r34) || e53 !== e53 && r34 !== r34;
}
var gt = typeof Object.is === "function" ? Object.is : hc;
var mt = null;
var vt = null;
var bt = null;
var yt = null;
var kt = false;
var xt = false;
var St = 0;
var wt = null;
var Ct = 0;
function X() {
  if (mt === null)
    throw Error(l2(321));
  return mt;
}
function lc() {
  if (0 < Ct)
    throw Error(l2(312));
  return {
    memoizedState: null,
    queue: null,
    next: null
  };
}
function mc() {
  yt === null ? bt === null ? (kt = false, bt = yt = lc()) : (kt = true, yt = bt) : yt.next === null ? (kt = false, yt = yt.next = lc()) : (kt = true, yt = yt.next);
  return yt;
}
function nc() {
  vt = mt = null;
  xt = false;
  bt = null;
  Ct = 0;
  yt = wt = null;
}
function oc(e54, r35) {
  return typeof r35 === "function" ? r35(e54) : r35;
}
function pc(e55, r36, a18) {
  mt = X();
  yt = mc();
  if (kt) {
    var o12 = yt.queue;
    r36 = o12.dispatch;
    if (wt !== null && (a18 = wt.get(o12), a18 !== void 0)) {
      wt.delete(o12);
      o12 = yt.memoizedState;
      do {
        o12 = e55(o12, a18.action), a18 = a18.next;
      } while (a18 !== null);
      yt.memoizedState = o12;
      return [
        o12,
        r36
      ];
    }
    return [
      yt.memoizedState,
      r36
    ];
  }
  e55 = e55 === oc ? typeof r36 === "function" ? r36() : r36 : a18 !== void 0 ? a18(r36) : r36;
  yt.memoizedState = e55;
  e55 = yt.queue = {
    last: null,
    dispatch: null
  };
  e55 = e55.dispatch = qc.bind(null, mt, e55);
  return [
    yt.memoizedState,
    e55
  ];
}
function rc(e56, r37) {
  mt = X();
  yt = mc();
  r37 = r37 === void 0 ? null : r37;
  if (yt !== null) {
    var a19 = yt.memoizedState;
    if (a19 !== null && r37 !== null) {
      var o13 = a19[1];
      e:
        if (o13 === null)
          o13 = false;
        else {
          for (var i9 = 0; i9 < o13.length && i9 < r37.length; i9++) {
            if (!gt(r37[i9], o13[i9])) {
              o13 = false;
              break e;
            }
          }
          o13 = true;
        }
      if (o13)
        return a19[0];
    }
  }
  e56 = e56();
  yt.memoizedState = [
    e56,
    r37
  ];
  return e56;
}
function qc(e57, r38, a20) {
  if (25 <= Ct)
    throw Error(l2(301));
  if (e57 === mt) {
    if (xt = true, e57 = {
      action: a20,
      next: null
    }, wt === null && (wt = /* @__PURE__ */ new Map()), a20 = wt.get(r38), a20 === void 0) {
      wt.set(r38, e57);
    } else {
      for (r38 = a20; r38.next !== null; )
        r38 = r38.next;
      r38.next = e57;
    }
  }
}
function sc() {
  throw Error(l2(394));
}
function tc() {
}
var Et = {
  readContext: function(e58) {
    return e58._currentValue;
  },
  useContext: function(e59) {
    X();
    return e59._currentValue;
  },
  useMemo: rc,
  useReducer: pc,
  useRef: function(e60) {
    mt = X();
    yt = mc();
    var r39 = yt.memoizedState;
    return r39 === null ? (e60 = {
      current: e60
    }, yt.memoizedState = e60) : r39;
  },
  useState: function(e61) {
    return pc(oc, e61);
  },
  useInsertionEffect: tc,
  useLayoutEffect: function() {
  },
  useCallback: function(e62, r40) {
    return rc(function() {
      return e62;
    }, r40);
  },
  useImperativeHandle: tc,
  useEffect: tc,
  useDebugValue: tc,
  useDeferredValue: function(e63) {
    X();
    return e63;
  },
  useTransition: function() {
    X();
    return [
      false,
      sc
    ];
  },
  useId: function() {
    var e64 = vt.treeContext;
    var r41 = e64.overflow;
    e64 = e64.id;
    e64 = (e64 & ~(1 << 32 - dt(e64) - 1)).toString(32) + r41;
    var a21 = Ft;
    if (a21 === null)
      throw Error(l2(404));
    r41 = St++;
    e64 = a21.idPrefix + e64;
    0 < r41 && (e64 += ":" + r41.toString(32));
    return e64;
  },
  useMutableSource: function(e65, r42) {
    X();
    return r42(e65._source);
  },
  useSyncExternalStore: function(e5, r, a22) {
    if (a22 === void 0)
      throw Error(l2(407));
    return a22();
  }
};
var Ft = null;
var Rt = u2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
function xc(e66) {
  console.error(e66);
}
function yc() {
}
function zc(e67, r43, a23, o14, i10, c, u7) {
  var s32 = [], d22 = /* @__PURE__ */ new Set();
  r43 = {
    destination: null,
    responseState: r43,
    progressiveChunkSize: o14 === void 0 ? 12800 : o14,
    status: 0,
    fatalError: null,
    nextSegmentId: 0,
    allPendingTasks: 0,
    pendingRootTasks: 0,
    completedRootSegment: null,
    abortableTasks: d22,
    pingedTasks: s32,
    clientRenderedBoundaries: [],
    completedBoundaries: [],
    partialBoundaries: [],
    onError: i10 === void 0 ? xc : i10,
    onCompleteAll: c === void 0 ? yc : c,
    onCompleteShell: u7 === void 0 ? yc : u7
  };
  a23 = Ac(r43, 0, null, a23);
  a23.parentFlushed = true;
  e67 = Bc(r43, e67, null, a23, d22, ct, null, ft);
  s32.push(e67);
  return r43;
}
function Bc(e68, r44, a24, o15, i11, c, u8, s4) {
  e68.allPendingTasks++;
  a24 === null ? e68.pendingRootTasks++ : a24.pendingTasks++;
  var d3 = {
    node: r44,
    ping: function() {
      var r45 = e68.pingedTasks;
      r45.push(d3);
      r45.length === 1 && Cc(e68);
    },
    blockedBoundary: a24,
    blockedSegment: o15,
    abortSet: i11,
    legacyContext: c,
    context: u8,
    treeContext: s4
  };
  i11.add(d3);
  return d3;
}
function Ac(e5, r46, a25, o16) {
  return {
    status: 0,
    id: -1,
    index: r46,
    parentFlushed: false,
    chunks: [],
    children: [],
    formatContext: o16,
    boundary: a25
  };
}
function Y(e69, r47) {
  e69 = e69.onError;
  e69(r47);
}
function Dc(e70, r48) {
  e70.destination !== null ? (e70.status = 2, ca(e70.destination, r48)) : (e70.status = 1, e70.fatalError = r48);
}
function Ec(e71, r49, a26, o17, i12) {
  mt = {};
  vt = r49;
  St = 0;
  for (e71 = a26(o17, i12); xt; ) {
    xt = false, St = 0, Ct += 1, yt = null, e71 = a26(o17, i12);
  }
  nc();
  return e71;
}
function Fc(e72, r50, a27, o18) {
  var i13 = a27.render(), u9 = o18.childContextTypes;
  if (u9 !== null && u9 !== void 0) {
    var s5 = r50.legacyContext;
    if (typeof a27.getChildContext !== "function")
      o18 = s5;
    else {
      a27 = a27.getChildContext();
      for (var d4 in a27) {
        if (!(d4 in u9))
          throw Error(l2(108, Ub(o18) || "Unknown", d4));
      }
      o18 = c3({}, s5, a27);
    }
    r50.legacyContext = o18;
    Z(e72, r50, i13);
    r50.legacyContext = s5;
  } else
    Z(e72, r50, i13);
}
function Gc(e73, r51) {
  if (e73 && e73.defaultProps) {
    r51 = c3({}, r51);
    e73 = e73.defaultProps;
    for (var a6 in e73)
      r51[a6] === void 0 && (r51[a6] = e73[a6]);
    return r51;
  }
  return r51;
}
function Hc(e74, r52, a28, o19, i14) {
  if (typeof a28 === "function") {
    if (a28.prototype && a28.prototype.isReactComponent) {
      i14 = Wb(a28, r52.legacyContext);
      var c = a28.contextType;
      c = new a28(o19, typeof c === "object" && c !== null ? c._currentValue : i14);
      bc(c, a28, o19, i14);
      Fc(e74, r52, c, a28);
    } else {
      c = Wb(a28, r52.legacyContext);
      i14 = Ec(e74, r52, a28, o19, c);
      var u10 = St !== 0;
      if (typeof i14 === "object" && i14 !== null && typeof i14.render === "function" && i14.$$typeof === void 0) {
        bc(i14, a28, o19, c), Fc(e74, r52, i14, a28);
      } else if (u10) {
        o19 = r52.treeContext;
        r52.treeContext = dc(o19, 1, 0);
        try {
          Z(e74, r52, i14);
        } finally {
          r52.treeContext = o19;
        }
      } else
        Z(e74, r52, i14);
    }
  } else {
    if (typeof a28 !== "string") {
      switch (a28) {
        case at:
        case rt:
        case Ge:
        case Ue:
        case Ze:
          Z(e74, r52, o19.children);
          return;
        case Ke:
          Z(e74, r52, o19.children);
          return;
        case nt:
          throw Error(l2(343));
        case Qe:
          e: {
            a28 = r52.blockedBoundary;
            i14 = r52.blockedSegment;
            c = o19.fallback;
            o19 = o19.children;
            u10 = /* @__PURE__ */ new Set();
            var s6 = {
              id: null,
              rootSegmentID: -1,
              parentFlushed: false,
              pendingTasks: 0,
              forceClientRender: false,
              completedSegments: [],
              byteSize: 0,
              fallbackAbortableTasks: u10
            }, d5 = Ac(e74, i14.chunks.length, s6, i14.formatContext);
            i14.children.push(d5);
            var h22 = Ac(e74, 0, null, i14.formatContext);
            h22.parentFlushed = true;
            r52.blockedBoundary = s6;
            r52.blockedSegment = h22;
            try {
              if (Ic(e74, r52, o19), h22.status = 1, s6.completedSegments.push(h22), s6.pendingTasks === 0) {
                break e;
              }
            } catch (r53) {
              h22.status = 4, Y(e74, r53), s6.forceClientRender = true;
            } finally {
              r52.blockedBoundary = a28, r52.blockedSegment = i14;
            }
            r52 = Bc(e74, c, a28, d5, u10, r52.legacyContext, r52.context, r52.treeContext);
            e74.pingedTasks.push(r52);
          }
          return;
      }
      if (typeof a28 === "object" && a28 !== null) {
        switch (a28.$$typeof) {
          case Ye:
            o19 = Ec(e74, r52, a28.render, o19, i14);
            if (St !== 0) {
              a28 = r52.treeContext;
              r52.treeContext = dc(a28, 1, 0);
              try {
                Z(e74, r52, o19);
              } finally {
                r52.treeContext = a28;
              }
            } else
              Z(e74, r52, o19);
            return;
          case et:
            a28 = a28.type;
            o19 = Gc(a28, o19);
            Hc(e74, r52, a28, o19, i14);
            return;
          case Xe:
            i14 = o19.children;
            a28 = a28._context;
            o19 = o19.value;
            c = a28._currentValue;
            a28._currentValue = o19;
            u10 = ut;
            ut = o19 = {
              parent: u10,
              depth: u10 === null ? 0 : u10.depth + 1,
              context: a28,
              parentValue: c,
              value: o19
            };
            r52.context = o19;
            Z(e74, r52, i14);
            e74 = ut;
            if (e74 === null)
              throw Error(l2(403));
            e74.context._currentValue = e74.parentValue;
            e74 = ut = e74.parent;
            r52.context = e74;
            return;
          case Je:
            o19 = o19.children;
            o19 = o19(a28._currentValue);
            Z(e74, r52, o19);
            return;
          case tt:
            i14 = a28._init;
            a28 = i14(a28._payload);
            o19 = Gc(a28, o19);
            Hc(e74, r52, a28, o19, void 0);
            return;
        }
      }
      throw Error(l2(130, a28 == null ? a28 : typeof a28, ""));
    }
    switch (i14 = r52.blockedSegment, c = Ma(i14.chunks, a28, o19, e74.responseState, i14.formatContext), u10 = i14.formatContext, i14.formatContext = wa(u10, a28, o19), Ic(e74, r52, c), i14.formatContext = u10, a28) {
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
        i14.chunks.push(re, p2(a28), ae);
    }
  }
}
function Z(e75, r54, a29) {
  r54.node = a29;
  if (typeof a29 === "object" && a29 !== null) {
    switch (a29.$$typeof) {
      case qe:
        Hc(e75, r54, a29.type, a29.props, a29.ref);
        return;
      case We:
        throw Error(l2(257));
      case tt:
        var o20 = a29._init;
        a29 = o20(a29._payload);
        Z(e75, r54, a29);
        return;
    }
    if (F(a29)) {
      Jc(e75, r54, a29);
      return;
    }
    a29 === null || typeof a29 !== "object" ? o20 = null : (o20 = it && a29[it] || a29["@@iterator"], o20 = typeof o20 === "function" ? o20 : null);
    if (o20 && (o20 = o20.call(a29))) {
      a29 = o20.next();
      if (!a29.done) {
        var i15 = [];
        do {
          i15.push(a29.value), a29 = o20.next();
        } while (!a29.done);
        Jc(e75, r54, i15);
      }
      return;
    }
    r54 = Object.prototype.toString.call(a29);
    throw Error(l2(31, r54 === "[object Object]" ? "object with keys {" + Object.keys(a29).join(", ") + "}" : r54));
  }
  typeof a29 === "string" ? a29 !== "" && r54.blockedSegment.chunks.push(p2(y3(a29)), B) : typeof a29 === "number" && (e75 = "" + a29, e75 !== "" && r54.blockedSegment.chunks.push(p2(y3(e75)), B));
}
function Jc(e76, r55, a30) {
  for (var o21 = a30.length, i16 = 0; i16 < o21; i16++) {
    var c = r55.treeContext;
    r55.treeContext = dc(c, o21, i16);
    try {
      Ic(e76, r55, a30[i16]);
    } finally {
      r55.treeContext = c;
    }
  }
}
function Ic(e77, r56, a31) {
  var o22 = r56.blockedSegment.formatContext, i17 = r56.legacyContext, c = r56.context;
  try {
    return Z(e77, r56, a31);
  } catch (d6) {
    if (nc(), typeof d6 !== "object" || d6 === null || typeof d6.then !== "function") {
      throw r56.blockedSegment.formatContext = o22, r56.legacyContext = i17, r56.context = c, O1(c), d6;
    }
    a31 = d6;
    var u11 = r56.blockedSegment, s7 = Ac(e77, u11.chunks.length, null, u11.formatContext);
    u11.children.push(s7);
    e77 = Bc(e77, r56.node, r56.blockedBoundary, s7, r56.abortSet, r56.legacyContext, r56.context, r56.treeContext).ping;
    a31.then(e77, e77);
    r56.blockedSegment.formatContext = o22;
    r56.legacyContext = i17;
    r56.context = c;
    O1(c);
  }
}
function Kc(e78) {
  var r57 = e78.blockedBoundary;
  e78 = e78.blockedSegment;
  e78.status = 3;
  Lc(this, r57, e78);
}
function Mc(e79) {
  var r58 = e79.blockedBoundary;
  e79.blockedSegment.status = 3;
  r58 === null ? (this.allPendingTasks--, this.status !== 2 && (this.status = 2, this.destination !== null && this.destination.close())) : (r58.pendingTasks--, r58.forceClientRender || (r58.forceClientRender = true, r58.parentFlushed && this.clientRenderedBoundaries.push(r58)), r58.fallbackAbortableTasks.forEach(Mc, this), r58.fallbackAbortableTasks.clear(), this.allPendingTasks--, this.allPendingTasks === 0 && (e79 = this.onCompleteAll, e79()));
}
function Lc(e80, r59, a32) {
  if (r59 === null) {
    if (a32.parentFlushed) {
      if (e80.completedRootSegment !== null)
        throw Error(l2(389));
      e80.completedRootSegment = a32;
    }
    e80.pendingRootTasks--;
    e80.pendingRootTasks === 0 && (r59 = e80.onCompleteShell, r59());
  } else if (r59.pendingTasks--, !r59.forceClientRender) {
    if (r59.pendingTasks === 0) {
      a32.parentFlushed && a32.status === 1 && r59.completedSegments.push(a32), r59.parentFlushed && e80.completedBoundaries.push(r59), r59.fallbackAbortableTasks.forEach(Kc, e80), r59.fallbackAbortableTasks.clear();
    } else if (a32.parentFlushed && a32.status === 1) {
      var o23 = r59.completedSegments;
      o23.push(a32);
      o23.length === 1 && r59.parentFlushed && e80.partialBoundaries.push(r59);
    }
  }
  e80.allPendingTasks--;
  e80.allPendingTasks === 0 && (e80 = e80.onCompleteAll, e80());
}
function Cc(e81) {
  if (e81.status !== 2) {
    var r61 = ut, a33 = Rt.current;
    Rt.current = Et;
    var o24 = Ft;
    Ft = e81.responseState;
    try {
      var i18, c = e81.pingedTasks;
      for (i18 = 0; i18 < c.length; i18++) {
        var u12 = c[i18];
        var s8 = e81, d7 = u12.blockedSegment;
        if (d7.status === 0) {
          O1(u12.context);
          try {
            Z(s8, u12, u12.node), u12.abortSet.delete(u12), d7.status = 1, Lc(s8, u12.blockedBoundary, d7);
          } catch (e82) {
            if (nc(), typeof e82 === "object" && e82 !== null && typeof e82.then === "function") {
              var h3 = u12.ping;
              e82.then(h3, h3);
            } else {
              u12.abortSet.delete(u12);
              d7.status = 4;
              var g21 = u12.blockedBoundary, m21 = e82;
              Y(s8, m21);
              g21 === null ? Dc(s8, m21) : (g21.pendingTasks--, g21.forceClientRender || (g21.forceClientRender = true, g21.parentFlushed && s8.clientRenderedBoundaries.push(g21)));
              s8.allPendingTasks--;
              if (s8.allPendingTasks === 0) {
                var b22 = s8.onCompleteAll;
                b22();
              }
            }
          }
        }
      }
      c.splice(0, i18);
      e81.destination !== null && Nc(e81, e81.destination);
    } catch (r60) {
      Y(e81, r60), Dc(e81, r60);
    } finally {
      Ft = o24, Rt.current = a33, a33 === Et && O1(r61);
    }
  }
}
function Oc(e83, r62, a34) {
  a34.parentFlushed = true;
  switch (a34.status) {
    case 0:
      var o25 = a34.id = e83.nextSegmentId++;
      e83 = e83.responseState;
      n4(r62, oe);
      n4(r62, e83.placeholderPrefix);
      e83 = p2(o25.toString(16));
      n4(r62, e83);
      return n4(r62, le);
    case 1:
      a34.status = 2;
      var i19 = true;
      o25 = a34.chunks;
      var c = 0;
      a34 = a34.children;
      for (var u13 = 0; u13 < a34.length; u13++) {
        for (i19 = a34[u13]; c < i19.index; c++)
          n4(r62, o25[c]);
        i19 = Pc(e83, r62, i19);
      }
      for (; c < o25.length; c++)
        i19 = n4(r62, o25[c]);
      return i19;
    default:
      throw Error(l2(390));
  }
}
function Pc(e84, r63, a35) {
  var o26 = a35.boundary;
  if (o26 === null)
    return Oc(e84, r63, a35);
  o26.parentFlushed = true;
  if (o26.forceClientRender)
    n4(r63, se), Oc(e84, r63, a35);
  else if (0 < o26.pendingTasks) {
    o26.rootSegmentID = e84.nextSegmentId++;
    0 < o26.completedSegments.length && e84.partialBoundaries.push(o26);
    var i20 = e84.responseState;
    var c = i20.nextSuspenseID++;
    i20 = t4(i20.boundaryPrefix + c.toString(16));
    o26 = o26.id = i20;
    Wa(r63, e84.responseState, o26);
    Oc(e84, r63, a35);
  } else if (o26.byteSize > e84.progressiveChunkSize) {
    o26.rootSegmentID = e84.nextSegmentId++, e84.completedBoundaries.push(o26), Wa(r63, e84.responseState, o26.id), Oc(e84, r63, a35);
  } else {
    n4(r63, ie);
    a35 = o26.completedSegments;
    if (a35.length !== 1)
      throw Error(l2(391));
    Pc(e84, r63, a35[0]);
  }
  return n4(r63, fe);
}
function Qc(e85, r64, a36) {
  rb(r64, e85.responseState, a36.formatContext, a36.id);
  Pc(e85, r64, a36);
  return sb(r64, a36.formatContext);
}
function Rc(e86, r65, a37) {
  for (var o27 = a37.completedSegments, i21 = 0; i21 < o27.length; i21++) {
    Sc(e86, r65, a37, o27[i21]);
  }
  o27.length = 0;
  e86 = e86.responseState;
  o27 = a37.id;
  a37 = a37.rootSegmentID;
  n4(r65, e86.startInlineScript);
  e86.sentCompleteBoundaryFunction ? n4(r65, Le) : (e86.sentCompleteBoundaryFunction = true, n4(r65, Oe));
  if (o27 === null)
    throw Error(l2(395));
  a37 = p2(a37.toString(16));
  n4(r65, o27);
  n4(r65, $e);
  n4(r65, e86.segmentPrefix);
  n4(r65, a37);
  return n4(r65, je);
}
function Sc(e87, r66, a38, o28) {
  if (o28.status === 2)
    return true;
  var i22 = o28.id;
  if (i22 === -1) {
    if ((o28.id = a38.rootSegmentID) === -1)
      throw Error(l2(392));
    return Qc(e87, r66, o28);
  }
  Qc(e87, r66, o28);
  e87 = e87.responseState;
  n4(r66, e87.startInlineScript);
  e87.sentCompleteSegmentFunction ? n4(r66, Be) : (e87.sentCompleteSegmentFunction = true, n4(r66, ze));
  n4(r66, e87.segmentPrefix);
  i22 = p2(i22.toString(16));
  n4(r66, i22);
  n4(r66, Ne);
  n4(r66, e87.placeholderPrefix);
  n4(r66, i22);
  return n4(r66, De);
}
function Nc(e88, r67) {
  try {
    var a39 = e88.completedRootSegment;
    if (a39 !== null && e88.pendingRootTasks === 0) {
      Pc(e88, r67, a39);
      e88.completedRootSegment = null;
      var o29 = e88.responseState.bootstrapChunks;
      for (a39 = 0; a39 < o29.length; a39++)
        n4(r67, o29[a39]);
    }
    var i23, c = e88.clientRenderedBoundaries;
    for (i23 = 0; i23 < c.length; i23++) {
      o29 = r67;
      var u14 = e88.responseState, s9 = c[i23].id;
      n4(o29, u14.startInlineScript);
      u14.sentClientRenderFunction ? n4(o29, Ve) : (u14.sentClientRenderFunction = true, n4(o29, Ae));
      if (s9 === null)
        throw Error(l2(395));
      n4(o29, s9);
      if (!n4(o29, He)) {
        e88.destination = null;
        i23++;
        c.splice(0, i23);
        return;
      }
    }
    c.splice(0, i23);
    var d8 = e88.completedBoundaries;
    for (i23 = 0; i23 < d8.length; i23++) {
      if (!Rc(e88, r67, d8[i23])) {
        e88.destination = null;
        i23++;
        d8.splice(0, i23);
        return;
      }
    }
    d8.splice(0, i23);
    var h4 = e88.partialBoundaries;
    for (i23 = 0; i23 < h4.length; i23++) {
      var g31 = h4[i23];
      e: {
        c = e88;
        u14 = r67;
        var m32 = g31.completedSegments;
        for (s9 = 0; s9 < m32.length; s9++) {
          if (!Sc(c, u14, g31, m32[s9])) {
            s9++;
            m32.splice(0, s9);
            var b = false;
            break e;
          }
        }
        m32.splice(0, s9);
        b = true;
      }
      if (!b) {
        e88.destination = null;
        i23++;
        h4.splice(0, i23);
        return;
      }
    }
    h4.splice(0, i23);
    var k21 = e88.completedBoundaries;
    for (i23 = 0; i23 < k21.length; i23++) {
      if (!Rc(e88, r67, k21[i23])) {
        e88.destination = null;
        i23++;
        k21.splice(0, i23);
        return;
      }
    }
    k21.splice(0, i23);
  } finally {
    e88.allPendingTasks === 0 && e88.pingedTasks.length === 0 && e88.clientRenderedBoundaries.length === 0 && e88.completedBoundaries.length === 0 && r67.close();
  }
}
i2.renderToReadableStream = function(e89, r68) {
  var a40 = zc(e89, ua(r68 ? r68.identifierPrefix : void 0, r68 ? r68.nonce : void 0, r68 ? r68.bootstrapScriptContent : void 0, r68 ? r68.bootstrapScripts : void 0, r68 ? r68.bootstrapModules : void 0), va(r68 ? r68.namespaceURI : void 0), r68 ? r68.progressiveChunkSize : void 0, r68 ? r68.onError : void 0, r68 ? r68.onCompleteAll : void 0, r68 ? r68.onCompleteShell : void 0);
  if (r68 && r68.signal) {
    var o30 = r68.signal, f3 = function() {
      try {
        var e90 = a40.abortableTasks;
        e90.forEach(Mc, a40);
        e90.clear();
        a40.destination !== null && Nc(a40, a40.destination);
      } catch (e91) {
        Y(a40, e91), Dc(a40, e91);
      }
      o30.removeEventListener("abort", f3);
    };
    o30.addEventListener("abort", f3);
  }
  var i24 = new ReadableStream({
    start: function() {
      Cc(a40);
    },
    pull: function(e92) {
      if (i24.locked) {
        if (a40.status === 1)
          a40.status = 2, ca(e92, a40.fatalError);
        else if (a40.status !== 2) {
          a40.destination = e92;
          try {
            Nc(a40, e92);
          } catch (e93) {
            Y(a40, e93), Dc(a40, e93);
          }
        }
      }
    },
    cancel: function() {
    }
  });
  return i24;
};
i2.version = "18.0.0-rc.0-fe905f152-20220107";
i2.renderToReadableStream, i2.version;
var a5 = "default" in mod ? mod.default : mod;
var o3 = "default" in mod1 ? mod1.default : mod1;
var l24 = {};
var i3 = a5;
var u3 = o3;
function m3(e15) {
  for (var n14 = "https://reactjs.org/docs/error-decoder.html?invariant=" + e15, r15 = 1; r15 < arguments.length; r15++) {
    n14 += "&args[]=" + encodeURIComponent(arguments[r15]);
  }
  return "Minified React error #" + e15 + "; visit " + n14 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var s3 = false;
function q2(e24, n21) {
  s3 && (s3 = false, n21[0] !== "<" && e24.push("<!-- -->"));
  return n21 === "<!-- -->" ? s3 = true : e24.push(n21);
}
var c4 = Object.prototype.hasOwnProperty;
var f1 = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
var d2 = {};
var p3 = {};
function fa(e32) {
  if (c4.call(p3, e32))
    return true;
  if (c4.call(d2, e32))
    return false;
  if (f1.test(e32))
    return p3[e32] = true;
  d2[e32] = true;
  return false;
}
function t5(e42, n31, r23, a15, o12, l11, i12) {
  this.acceptsBooleans = n31 === 2 || n31 === 3 || n31 === 4;
  this.attributeName = a15;
  this.attributeNamespace = o12;
  this.mustUseProperty = r23;
  this.propertyName = e42;
  this.type = n31;
  this.sanitizeURL = l11;
  this.removeEmptyString = i12;
}
var h2 = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e5) {
  h2[e5] = new t5(e5, 0, false, e5, null, false, false);
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
].forEach(function(e6) {
  var n41 = e6[0];
  h2[n41] = new t5(n41, 1, false, e6[1], null, false, false);
});
[
  "contentEditable",
  "draggable",
  "spellCheck",
  "value"
].forEach(function(e7) {
  h2[e7] = new t5(e7, 2, false, e7.toLowerCase(), null, false, false);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha"
].forEach(function(e8) {
  h2[e8] = new t5(e8, 2, false, e8, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e9) {
  h2[e9] = new t5(e9, 3, false, e9.toLowerCase(), null, false, false);
});
[
  "checked",
  "multiple",
  "muted",
  "selected"
].forEach(function(e10) {
  h2[e10] = new t5(e10, 3, true, e10, null, false, false);
});
[
  "capture",
  "download"
].forEach(function(e11) {
  h2[e11] = new t5(e11, 4, false, e11, null, false, false);
});
[
  "cols",
  "rows",
  "size",
  "span"
].forEach(function(e12) {
  h2[e12] = new t5(e12, 6, false, e12, null, false, false);
});
[
  "rowSpan",
  "start"
].forEach(function(e13) {
  h2[e13] = new t5(e13, 5, false, e13.toLowerCase(), null, false, false);
});
var b2 = /[\-:]([a-z])/g;
function ia(e14) {
  return e14[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e15) {
  var n5 = e15.replace(b2, ia);
  h2[n5] = new t5(n5, 1, false, e15, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e16) {
  var n6 = e16.replace(b2, ia);
  h2[n6] = new t5(n6, 1, false, e16, "http://www.w3.org/1999/xlink", false, false);
});
[
  "xml:base",
  "xml:lang",
  "xml:space"
].forEach(function(e17) {
  var n7 = e17.replace(b2, ia);
  h2[n7] = new t5(n7, 1, false, e17, "http://www.w3.org/XML/1998/namespace", false, false);
});
[
  "tabIndex",
  "crossOrigin"
].forEach(function(e18) {
  h2[e18] = new t5(e18, 1, false, e18.toLowerCase(), null, false, false);
});
h2.xlinkHref = new t5("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
[
  "src",
  "href",
  "action",
  "formAction"
].forEach(function(e19) {
  h2[e19] = new t5(e19, 1, false, e19.toLowerCase(), null, true, true);
});
var g4 = {
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
var v2 = [
  "Webkit",
  "ms",
  "Moz",
  "O"
];
Object.keys(g4).forEach(function(e20) {
  v2.forEach(function(n8) {
    n8 = n8 + e20.charAt(0).toUpperCase() + e20.substring(1);
    g4[n8] = g4[e20];
  });
});
var y4 = /["'&<>]/;
function w4(e21) {
  if (typeof e21 === "boolean" || typeof e21 === "number")
    return "" + e21;
  e21 = "" + e21;
  var n9 = y4.exec(e21);
  if (n9) {
    var r32, a22 = "", o22 = 0;
    for (r32 = n9.index; r32 < e21.length; r32++) {
      switch (e21.charCodeAt(r32)) {
        case 34:
          n9 = "&quot;";
          break;
        case 38:
          n9 = "&amp;";
          break;
        case 39:
          n9 = "&#x27;";
          break;
        case 60:
          n9 = "&lt;";
          break;
        case 62:
          n9 = "&gt;";
          break;
        default:
          continue;
      }
      o22 !== r32 && (a22 += e21.substring(o22, r32));
      o22 = r32 + 1;
      a22 += n9;
    }
    e21 = o22 !== r32 ? a22 + e21.substring(o22, r32) : a22;
  }
  return e21;
}
var k4 = /([A-Z])/g;
var E3 = /^ms-/;
var F1 = Array.isArray;
function x4(e22, n10) {
  return {
    insertionMode: e22,
    selectedValue: n10
  };
}
function oa(e23, n11, r4) {
  switch (n11) {
    case "select":
      return x4(1, r4.value != null ? r4.value : r4.defaultValue);
    case "svg":
      return x4(2, null);
    case "math":
      return x4(3, null);
    case "foreignObject":
      return x4(1, null);
    case "table":
      return x4(4, null);
    case "thead":
    case "tbody":
    case "tfoot":
      return x4(5, null);
    case "colgroup":
      return x4(7, null);
    case "tr":
      return x4(6, null);
  }
  return 4 <= e23.insertionMode || e23.insertionMode === 0 ? x4(1, null) : e23;
}
function pa(e24, n12) {
  n12 !== "" && e24.push(w4(n12), "<!-- -->");
}
var R3 = /* @__PURE__ */ new Map();
function ra(e25, n13, r5) {
  if (typeof r5 !== "object")
    throw Error(m3(62));
  n13 = true;
  for (var a32 in r5) {
    if (c4.call(r5, a32)) {
      var o31 = r5[a32];
      if (o31 != null && typeof o31 !== "boolean" && o31 !== "") {
        if (a32.indexOf("--") === 0) {
          var l = w4(a32);
          o31 = w4(("" + o31).trim());
        } else {
          l = a32;
          var i22 = R3.get(l);
          i22 !== void 0 || (i22 = w4(l.replace(k4, "-$1").toLowerCase().replace(E3, "-ms-")), R3.set(l, i22)), l = i22;
          o31 = typeof o31 === "number" ? o31 === 0 || c4.call(g4, a32) ? "" + o31 : o31 + "px" : w4(("" + o31).trim());
        }
        n13 ? (n13 = false, e25.push(' style="', l, ":", o31)) : e25.push(";", l, ":", o31);
      }
    }
  }
  n13 || e25.push('"');
}
function z2(e26, n14, r6, a42) {
  switch (r6) {
    case "style":
      ra(e26, n14, a42);
      return;
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
      return;
  }
  if (!(2 < r6.length) || r6[0] !== "o" && r6[0] !== "O" || r6[1] !== "n" && r6[1] !== "N") {
    if (n14 = h2.hasOwnProperty(r6) ? h2[r6] : null, n14 !== null) {
      switch (typeof a42) {
        case "function":
        case "symbol":
          return;
        case "boolean":
          if (!n14.acceptsBooleans)
            return;
      }
      r6 = n14.attributeName;
      switch (n14.type) {
        case 3:
          a42 && e26.push(" ", r6, '=""');
          break;
        case 4:
          a42 === true ? e26.push(" ", r6, '=""') : a42 !== false && e26.push(" ", r6, '="', w4(a42), '"');
          break;
        case 5:
          isNaN(a42) || e26.push(" ", r6, '="', w4(a42), '"');
          break;
        case 6:
          !isNaN(a42) && 1 <= a42 && e26.push(" ", r6, '="', w4(a42), '"');
          break;
        default:
          n14.sanitizeURL && (a42 = "" + a42), e26.push(" ", r6, '="', w4(a42), '"');
      }
    } else if (fa(r6)) {
      switch (typeof a42) {
        case "function":
        case "symbol":
          return;
        case "boolean":
          if (n14 = r6.toLowerCase().slice(0, 5), n14 !== "data-" && n14 !== "aria-") {
            return;
          }
      }
      e26.push(" ", r6, '="', w4(a42), '"');
    }
  }
}
function B1(e27, n15, r7) {
  if (n15 != null) {
    if (r7 != null)
      throw Error(m3(60));
    if (typeof n15 !== "object" || !("__html" in n15))
      throw Error(m3(61));
    n15 = n15.__html;
    n15 !== null && n15 !== void 0 && e27.push("" + n15);
  }
}
function sa(e28) {
  var n16 = "";
  u3.Children.forEach(e28, function(e29) {
    e29 != null && (n16 += e29);
  });
  return n16;
}
function ta(e30, n17, r8, a51) {
  e30.push(C4(r8));
  var o4, l = r8 = null;
  for (o4 in n17) {
    if (c4.call(n17, o4)) {
      var i31 = n17[o4];
      if (i31 != null) {
        switch (o4) {
          case "children":
            r8 = i31;
            break;
          case "dangerouslySetInnerHTML":
            l = i31;
            break;
          default:
            z2(e30, a51, o4, i31);
        }
      }
    }
  }
  e30.push(">");
  B1(e30, l, r8);
  return typeof r8 === "string" ? (e30.push(w4(r8)), null) : r8;
}
var _2 = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
var M1 = /* @__PURE__ */ new Map();
function C4(e31) {
  var n18 = M1.get(e31);
  if (n18 === void 0) {
    if (!_2.test(e31))
      throw Error(m3(65, e31));
    n18 = "<" + e31;
    M1.set(e31, n18);
  }
  return n18;
}
function wa1(e32, n19, r9, a6, o5) {
  switch (n19) {
    case "select":
      e32.push(C4("select"));
      var l = null, i4 = null;
      for (d12 in r9) {
        if (c4.call(r9, d12)) {
          var u12 = r9[d12];
          if (u12 != null) {
            switch (d12) {
              case "children":
                l = u12;
                break;
              case "dangerouslySetInnerHTML":
                i4 = u12;
                break;
              case "defaultValue":
              case "value":
                break;
              default:
                z2(e32, a6, d12, u12);
            }
          }
        }
      }
      e32.push(">");
      B1(e32, i4, l);
      return l;
    case "option":
      i4 = o5.selectedValue;
      e32.push(C4("option"));
      var s12 = u12 = null, f11 = null;
      var d12 = null;
      for (l in r9) {
        if (c4.call(r9, l) && (n19 = r9[l], n19 != null)) {
          switch (l) {
            case "children":
              u12 = n19;
              break;
            case "selected":
              f11 = n19;
              break;
            case "dangerouslySetInnerHTML":
              d12 = n19;
              break;
            case "value":
              s12 = n19;
            default:
              z2(e32, a6, l, n19);
          }
        }
      }
      if (i4 !== null) {
        if (r9 = s12 !== null ? "" + s12 : sa(u12), F1(i4)) {
          for (a6 = 0; a6 < i4.length; a6++) {
            if ("" + i4[a6] === r9) {
              e32.push(' selected=""');
              break;
            }
          }
        } else
          i4 === r9 && e32.push(' selected=""');
      } else
        f11 && e32.push(' selected=""');
      e32.push(">");
      B1(e32, d12, u12);
      return u12;
    case "textarea":
      e32.push(C4("textarea"));
      d12 = i4 = l = null;
      for (u12 in r9) {
        if (c4.call(r9, u12) && (s12 = r9[u12], s12 != null)) {
          switch (u12) {
            case "children":
              d12 = s12;
              break;
            case "value":
              l = s12;
              break;
            case "defaultValue":
              i4 = s12;
              break;
            case "dangerouslySetInnerHTML":
              throw Error(m3(91));
            default:
              z2(e32, a6, u12, s12);
          }
        }
      }
      l === null && i4 !== null && (l = i4);
      e32.push(">");
      if (d12 != null) {
        if (l != null)
          throw Error(m3(92));
        if (F1(d12) && 1 < d12.length)
          throw Error(m3(93));
        l = "" + d12;
      }
      typeof l === "string" && l[0] === "\n" && e32.push("\n");
      return l;
    case "input":
      e32.push(C4("input"));
      s12 = d12 = u12 = l = null;
      for (i4 in r9) {
        if (c4.call(r9, i4) && (f11 = r9[i4], f11 != null)) {
          switch (i4) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(m3(399, "input"));
            case "defaultChecked":
              s12 = f11;
              break;
            case "defaultValue":
              u12 = f11;
              break;
            case "checked":
              d12 = f11;
              break;
            case "value":
              l = f11;
              break;
            default:
              z2(e32, a6, i4, f11);
          }
        }
      }
      d12 !== null ? z2(e32, a6, "checked", d12) : s12 !== null && z2(e32, a6, "checked", s12);
      l !== null ? z2(e32, a6, "value", l) : u12 !== null && z2(e32, a6, "value", u12);
      e32.push("/>");
      return null;
    case "menuitem":
      e32.push(C4("menuitem"));
      for (var p11 in r9) {
        if (c4.call(r9, p11) && (l = r9[p11], l != null)) {
          switch (p11) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(m3(400));
            default:
              z2(e32, a6, p11, l);
          }
        }
      }
      e32.push(">");
      return null;
    case "listing":
    case "pre":
      e32.push(C4(n19));
      i4 = l = null;
      for (s12 in r9) {
        if (c4.call(r9, s12) && (u12 = r9[s12], u12 != null)) {
          switch (s12) {
            case "children":
              l = u12;
              break;
            case "dangerouslySetInnerHTML":
              i4 = u12;
              break;
            default:
              z2(e32, a6, s12, u12);
          }
        }
      }
      e32.push(">");
      if (i4 != null) {
        if (l != null)
          throw Error(m3(60));
        if (typeof i4 !== "object" || !("__html" in i4))
          throw Error(m3(61));
        r9 = i4.__html;
        r9 !== null && r9 !== void 0 && (typeof r9 === "string" && 0 < r9.length && r9[0] === "\n" ? e32.push("\n", r9) : e32.push("" + r9));
      }
      typeof l === "string" && l[0] === "\n" && e32.push("\n");
      return l;
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
      e32.push(C4(n19));
      for (var h12 in r9) {
        if (c4.call(r9, h12) && (l = r9[h12], l != null)) {
          switch (h12) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(m3(399, n19));
            default:
              z2(e32, a6, h12, l);
          }
        }
      }
      e32.push("/>");
      return null;
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return ta(e32, r9, n19, a6);
    case "html":
      return o5.insertionMode === 0 && e32.push("<!DOCTYPE html>"), ta(e32, r9, n19, a6);
    default:
      if (n19.indexOf("-") === -1 && typeof r9.is !== "string") {
        return ta(e32, r9, n19, a6);
      }
      e32.push(C4(n19));
      i4 = l = null;
      for (f11 in r9) {
        if (c4.call(r9, f11) && (u12 = r9[f11], u12 != null)) {
          switch (f11) {
            case "children":
              l = u12;
              break;
            case "dangerouslySetInnerHTML":
              i4 = u12;
              break;
            case "style":
              ra(e32, a6, u12);
              break;
            case "suppressContentEditableWarning":
            case "suppressHydrationWarning":
              break;
            default:
              fa(f11) && typeof u12 !== "function" && typeof u12 !== "symbol" && e32.push(" ", f11, '="', w4(u12), '"');
          }
        }
      }
      e32.push(">");
      B1(e32, i4, l);
      return l;
  }
}
function xa(e33, n, r10) {
  q2(e33, '<!--$?--><template id="');
  if (r10 === null)
    throw Error(m3(395));
  q2(e33, r10);
  return q2(e33, '"></template>');
}
function ya(e34, n20, r11, a7) {
  switch (r11.insertionMode) {
    case 0:
    case 1:
      return q2(e34, '<div hidden id="'), q2(e34, n20.segmentPrefix), q2(e34, a7.toString(16)), q2(e34, '">');
    case 2:
      return q2(e34, '<svg aria-hidden="true" style="display:none" id="'), q2(e34, n20.segmentPrefix), q2(e34, a7.toString(16)), q2(e34, '">');
    case 3:
      return q2(e34, '<math aria-hidden="true" style="display:none" id="'), q2(e34, n20.segmentPrefix), q2(e34, a7.toString(16)), q2(e34, '">');
    case 4:
      return q2(e34, '<table hidden id="'), q2(e34, n20.segmentPrefix), q2(e34, a7.toString(16)), q2(e34, '">');
    case 5:
      return q2(e34, '<table hidden><tbody id="'), q2(e34, n20.segmentPrefix), q2(e34, a7.toString(16)), q2(e34, '">');
    case 6:
      return q2(e34, '<table hidden><tr id="'), q2(e34, n20.segmentPrefix), q2(e34, a7.toString(16)), q2(e34, '">');
    case 7:
      return q2(e34, '<table hidden><colgroup id="'), q2(e34, n20.segmentPrefix), q2(e34, a7.toString(16)), q2(e34, '">');
    default:
      throw Error(m3(397));
  }
}
function za(e35, n21) {
  switch (n21.insertionMode) {
    case 0:
    case 1:
      return q2(e35, "</div>");
    case 2:
      return q2(e35, "</svg>");
    case 3:
      return q2(e35, "</math>");
    case 4:
      return q2(e35, "</table>");
    case 5:
      return q2(e35, "</tbody></table>");
    case 6:
      return q2(e35, "</tr></table>");
    case 7:
      return q2(e35, "</colgroup></table>");
    default:
      throw Error(m3(397));
  }
}
function Aa(e36, n22) {
  n22 = n22 === void 0 ? "" : n22;
  return {
    bootstrapChunks: [],
    startInlineScript: "<script>",
    placeholderPrefix: n22 + "P:",
    segmentPrefix: n22 + "S:",
    boundaryPrefix: n22 + "B:",
    idPrefix: n22 + "R:",
    nextSuspenseID: 0,
    sentCompleteSegmentFunction: false,
    sentCompleteBoundaryFunction: false,
    sentClientRenderFunction: false,
    generateStaticMarkup: e36
  };
}
var P2 = 60103;
var N2 = 60106;
var D3 = 60107;
var j2 = 60108;
var $2 = 60114;
var A2 = 60109;
var L1 = 60110;
var O2 = 60112;
var U1 = 60113;
var G1 = 60120;
var J1 = 60115;
var K1 = 60116;
var Q1 = 60119;
var ee1 = 60129;
var te1 = 60131;
var ne1 = 60132;
if (typeof Symbol === "function" && Symbol.for) {
  re1 = Symbol.for;
  P2 = re1("react.element");
  N2 = re1("react.portal");
  D3 = re1("react.fragment");
  j2 = re1("react.strict_mode");
  $2 = re1("react.profiler");
  A2 = re1("react.provider");
  L1 = re1("react.context");
  O2 = re1("react.forward_ref");
  U1 = re1("react.suspense");
  G1 = re1("react.suspense_list");
  J1 = re1("react.memo");
  K1 = re1("react.lazy");
  Q1 = re1("react.scope");
  ee1 = re1("react.debug_trace_mode");
  te1 = re1("react.legacy_hidden");
  ne1 = re1("react.cache");
}
var re1;
var ae1 = typeof Symbol === "function" && Symbol.iterator;
function Ra(e37) {
  if (e37 == null)
    return null;
  if (typeof e37 === "function")
    return e37.displayName || e37.name || null;
  if (typeof e37 === "string")
    return e37;
  switch (e37) {
    case D3:
      return "Fragment";
    case N2:
      return "Portal";
    case $2:
      return "Profiler";
    case j2:
      return "StrictMode";
    case U1:
      return "Suspense";
    case G1:
      return "SuspenseList";
    case ne1:
      return "Cache";
  }
  if (typeof e37 === "object") {
    switch (e37.$$typeof) {
      case L1:
        return (e37.displayName || "Context") + ".Consumer";
      case A2:
        return (e37._context.displayName || "Context") + ".Provider";
      case O2:
        var n23 = e37.render;
        e37 = e37.displayName;
        e37 || (e37 = n23.displayName || n23.name || "", e37 = e37 !== "" ? "ForwardRef(" + e37 + ")" : "ForwardRef");
        return e37;
      case J1:
        return n23 = e37.displayName || null, n23 !== null ? n23 : Ra(e37.type) || "Memo";
      case K1:
        n23 = e37._payload;
        e37 = e37._init;
        try {
          return Ra(e37(n23));
        } catch (e5) {
        }
    }
  }
  return null;
}
var oe1 = {};
function Ta(e38, n24) {
  e38 = e38.contextTypes;
  if (!e38)
    return oe1;
  var r12, a8 = {};
  for (r12 in e38)
    a8[r12] = n24[r12];
  return a8;
}
var le1 = null;
function H1(e39, n25) {
  if (e39 !== n25) {
    e39.context._currentValue2 = e39.parentValue;
    e39 = e39.parent;
    var r13 = n25.parent;
    if (e39 === null) {
      if (r13 !== null)
        throw Error(m3(401));
    } else {
      if (r13 === null)
        throw Error(m3(401));
      H1(e39, r13);
      n25.context._currentValue2 = n25.value;
    }
  }
}
function Ua(e40) {
  e40.context._currentValue2 = e40.parentValue;
  e40 = e40.parent;
  e40 !== null && Ua(e40);
}
function Va(e41) {
  var n26 = e41.parent;
  n26 !== null && Va(n26);
  e41.context._currentValue2 = e41.value;
}
function Wa1(e42, n27) {
  e42.context._currentValue2 = e42.parentValue;
  e42 = e42.parent;
  if (e42 === null)
    throw Error(m3(402));
  e42.depth === n27.depth ? H1(e42, n27) : Wa1(e42, n27);
}
function Xa(e43, n28) {
  var r14 = n28.parent;
  if (r14 === null)
    throw Error(m3(402));
  e43.depth === r14.depth ? H1(e43, r14) : Xa(e43, r14);
  n28.context._currentValue2 = n28.value;
}
function I1(e44) {
  var n29 = le1;
  n29 !== e44 && (n29 === null ? Va(e44) : e44 === null ? Ua(n29) : n29.depth === e44.depth ? H1(n29, e44) : n29.depth > e44.depth ? Wa1(n29, e44) : Xa(n29, e44), le1 = e44);
}
var ie1 = {
  isMounted: function() {
    return false;
  },
  enqueueSetState: function(e45, n30) {
    e45 = e45._reactInternals;
    e45.queue !== null && e45.queue.push(n30);
  },
  enqueueReplaceState: function(e46, n31) {
    e46 = e46._reactInternals;
    e46.replace = true;
    e46.queue = [
      n31
    ];
  },
  enqueueForceUpdate: function() {
  }
};
function Za(e47, n32, r15, a9) {
  var o6 = e47.state !== void 0 ? e47.state : null;
  e47.updater = ie1;
  e47.props = r15;
  e47.state = o6;
  var l = {
    queue: [],
    replace: false
  };
  e47._reactInternals = l;
  var u22 = n32.contextType;
  e47.context = typeof u22 === "object" && u22 !== null ? u22._currentValue2 : a9;
  u22 = n32.getDerivedStateFromProps;
  typeof u22 === "function" && (u22 = u22(r15, o6), o6 = u22 === null || u22 === void 0 ? o6 : i3({}, o6, u22), e47.state = o6);
  if (typeof n32.getDerivedStateFromProps !== "function" && typeof e47.getSnapshotBeforeUpdate !== "function" && (typeof e47.UNSAFE_componentWillMount === "function" || typeof e47.componentWillMount === "function")) {
    if (n32 = e47.state, typeof e47.componentWillMount === "function" && e47.componentWillMount(), typeof e47.UNSAFE_componentWillMount === "function" && e47.UNSAFE_componentWillMount(), n32 !== e47.state && ie1.enqueueReplaceState(e47, e47.state, null), l.queue !== null && 0 < l.queue.length) {
      if (n32 = l.queue, u22 = l.replace, l.queue = null, l.replace = false, u22 && n32.length === 1) {
        e47.state = n32[0];
      } else {
        l = u22 ? n32[0] : e47.state;
        o6 = true;
        for (u22 = u22 ? 1 : 0; u22 < n32.length; u22++) {
          var s22 = n32[u22];
          s22 = typeof s22 === "function" ? s22.call(e47, l, r15, a9) : s22;
          s22 != null && (o6 ? (o6 = false, l = i3({}, l, s22)) : i3(l, s22));
        }
        e47.state = l;
      }
    } else
      l.queue = null;
  }
}
var ue1 = {
  id: 1,
  overflow: ""
};
function ab(e48, n33, r16) {
  var a10 = e48.id;
  e48 = e48.overflow;
  var o7 = 32 - se1(a10) - 1;
  a10 &= ~(1 << o7);
  r16 += 1;
  var l = 32 - se1(n33) + o7;
  if (30 < l) {
    var i5 = o7 - o7 % 5;
    l = (a10 & (1 << i5) - 1).toString(32);
    a10 >>= i5;
    o7 -= i5;
    return {
      id: 1 << 32 - se1(n33) + o7 | r16 << o7 | a10,
      overflow: l + e48
    };
  }
  return {
    id: 1 << l | r16 << o7 | a10,
    overflow: e48
  };
}
var se1 = Math.clz32 ? Math.clz32 : bb;
var ce1 = Math.log;
var fe1 = Math.LN2;
function bb(e49) {
  e49 >>>= 0;
  return e49 === 0 ? 32 : 31 - (ce1(e49) / fe1 | 0) | 0;
}
function eb(e50, n34) {
  return e50 === n34 && (e50 !== 0 || 1 / e50 === 1 / n34) || e50 !== e50 && n34 !== n34;
}
var de1 = typeof Object.is === "function" ? Object.is : eb;
var pe1 = null;
var he1 = null;
var me1 = null;
var be1 = null;
var ge1 = false;
var ve1 = false;
var ye1 = 0;
var Se1 = null;
var xe1 = 0;
function S2() {
  if (pe1 === null)
    throw Error(m3(321));
  return pe1;
}
function hb() {
  if (0 < xe1)
    throw Error(m3(312));
  return {
    memoizedState: null,
    queue: null,
    next: null
  };
}
function ib() {
  be1 === null ? me1 === null ? (ge1 = false, me1 = be1 = hb()) : (ge1 = true, be1 = me1) : be1.next === null ? (ge1 = false, be1 = be1.next = hb()) : (ge1 = true, be1 = be1.next);
  return be1;
}
function jb() {
  he1 = pe1 = null;
  ve1 = false;
  me1 = null;
  xe1 = 0;
  be1 = Se1 = null;
}
function kb(e51, n35) {
  return typeof n35 === "function" ? n35(e51) : n35;
}
function lb(e52, n36, r17) {
  pe1 = S2();
  be1 = ib();
  if (ge1) {
    var a11 = be1.queue;
    n36 = a11.dispatch;
    if (Se1 !== null && (r17 = Se1.get(a11), r17 !== void 0)) {
      Se1.delete(a11);
      a11 = be1.memoizedState;
      do {
        a11 = e52(a11, r17.action), r17 = r17.next;
      } while (r17 !== null);
      be1.memoizedState = a11;
      return [
        a11,
        n36
      ];
    }
    return [
      be1.memoizedState,
      n36
    ];
  }
  e52 = e52 === kb ? typeof n36 === "function" ? n36() : n36 : r17 !== void 0 ? r17(n36) : n36;
  be1.memoizedState = e52;
  e52 = be1.queue = {
    last: null,
    dispatch: null
  };
  e52 = e52.dispatch = mb.bind(null, pe1, e52);
  return [
    be1.memoizedState,
    e52
  ];
}
function nb(e53, n37) {
  pe1 = S2();
  be1 = ib();
  n37 = n37 === void 0 ? null : n37;
  if (be1 !== null) {
    var r18 = be1.memoizedState;
    if (r18 !== null && n37 !== null) {
      var a12 = r18[1];
      e:
        if (a12 === null)
          a12 = false;
        else {
          for (var o8 = 0; o8 < a12.length && o8 < n37.length; o8++) {
            if (!de1(n37[o8], a12[o8])) {
              a12 = false;
              break e;
            }
          }
          a12 = true;
        }
      if (a12)
        return r18[0];
    }
  }
  e53 = e53();
  be1.memoizedState = [
    e53,
    n37
  ];
  return e53;
}
function mb(e54, n38, r19) {
  if (25 <= xe1)
    throw Error(m3(301));
  if (e54 === pe1) {
    if (ve1 = true, e54 = {
      action: r19,
      next: null
    }, Se1 === null && (Se1 = /* @__PURE__ */ new Map()), r19 = Se1.get(n38), r19 === void 0) {
      Se1.set(n38, e54);
    } else {
      for (n38 = r19; n38.next !== null; )
        n38 = n38.next;
      n38.next = e54;
    }
  }
}
function ob() {
  throw Error(m3(394));
}
function T1() {
}
var ke1 = {
  readContext: function(e55) {
    return e55._currentValue2;
  },
  useContext: function(e56) {
    S2();
    return e56._currentValue2;
  },
  useMemo: nb,
  useReducer: lb,
  useRef: function(e57) {
    pe1 = S2();
    be1 = ib();
    var n39 = be1.memoizedState;
    return n39 === null ? (e57 = {
      current: e57
    }, be1.memoizedState = e57) : n39;
  },
  useState: function(e58) {
    return lb(kb, e58);
  },
  useInsertionEffect: T1,
  useLayoutEffect: function() {
  },
  useCallback: function(e59, n40) {
    return nb(function() {
      return e59;
    }, n40);
  },
  useImperativeHandle: T1,
  useEffect: T1,
  useDebugValue: T1,
  useDeferredValue: function(e60) {
    S2();
    return e60;
  },
  useTransition: function() {
    S2();
    return [
      false,
      ob
    ];
  },
  useId: function() {
    var e61 = he1.treeContext;
    var n41 = e61.overflow;
    e61 = e61.id;
    e61 = (e61 & ~(1 << 32 - se1(e61) - 1)).toString(32) + n41;
    var r20 = we1;
    if (r20 === null)
      throw Error(m3(404));
    n41 = ye1++;
    e61 = r20.idPrefix + e61;
    0 < n41 && (e61 += ":" + n41.toString(32));
    return e61;
  },
  useMutableSource: function(e62, n42) {
    S2();
    return n42(e62._source);
  },
  useSyncExternalStore: function(e5, n, r21) {
    if (r21 === void 0)
      throw Error(m3(407));
    return r21();
  }
};
var we1 = null;
var Ce1 = u3.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
function rb1(e63) {
  console.error(e63);
}
function sb1() {
}
function tb(e64, n43, r22, a13, o9, l, i6) {
  var u31 = [], s31 = /* @__PURE__ */ new Set();
  n43 = {
    destination: null,
    responseState: n43,
    progressiveChunkSize: a13 === void 0 ? 12800 : a13,
    status: 0,
    fatalError: null,
    nextSegmentId: 0,
    allPendingTasks: 0,
    pendingRootTasks: 0,
    completedRootSegment: null,
    abortableTasks: s31,
    pingedTasks: u31,
    clientRenderedBoundaries: [],
    completedBoundaries: [],
    partialBoundaries: [],
    onError: o9 === void 0 ? rb1 : o9,
    onCompleteAll: l === void 0 ? sb1 : l,
    onCompleteShell: i6 === void 0 ? sb1 : i6
  };
  r22 = V3(n43, 0, null, r22);
  r22.parentFlushed = true;
  e64 = ub(n43, e64, null, r22, s31, oe1, null, ue1);
  u31.push(e64);
  return n43;
}
function ub(e65, n44, r23, a14, o10, l, i7, u4) {
  e65.allPendingTasks++;
  r23 === null ? e65.pendingRootTasks++ : r23.pendingTasks++;
  var s4 = {
    node: n44,
    ping: function() {
      var n45 = e65.pingedTasks;
      n45.push(s4);
      n45.length === 1 && vb(e65);
    },
    blockedBoundary: r23,
    blockedSegment: a14,
    abortSet: o10,
    legacyContext: l,
    context: i7,
    treeContext: u4
  };
  o10.add(s4);
  return s4;
}
function V3(e5, n46, r24, a15) {
  return {
    status: 0,
    id: -1,
    index: n46,
    parentFlushed: false,
    chunks: [],
    children: [],
    formatContext: a15,
    boundary: r24
  };
}
function W1(e66, n47) {
  e66 = e66.onError;
  e66(n47);
}
function X1(e67, n48) {
  e67.destination !== null ? (e67.status = 2, e67.destination.destroy(n48)) : (e67.status = 1, e67.fatalError = n48);
}
function wb(e68, n49, r25, a16, o11) {
  pe1 = {};
  he1 = n49;
  ye1 = 0;
  for (e68 = r25(a16, o11); ve1; ) {
    ve1 = false, ye1 = 0, xe1 += 1, be1 = null, e68 = r25(a16, o11);
  }
  jb();
  return e68;
}
function xb(e69, n50, r26, a17) {
  var o12 = r26.render(), l = a17.childContextTypes;
  if (l !== null && l !== void 0) {
    var u5 = n50.legacyContext;
    if (typeof r26.getChildContext !== "function")
      a17 = u5;
    else {
      r26 = r26.getChildContext();
      for (var s5 in r26) {
        if (!(s5 in l))
          throw Error(m3(108, Ra(a17) || "Unknown", s5));
      }
      a17 = i3({}, u5, r26);
    }
    n50.legacyContext = a17;
    Y1(e69, n50, o12);
    n50.legacyContext = u5;
  } else
    Y1(e69, n50, o12);
}
function yb(e70, n51) {
  if (e70 && e70.defaultProps) {
    n51 = i3({}, n51);
    e70 = e70.defaultProps;
    for (var r in e70)
      n51[r] === void 0 && (n51[r] = e70[r]);
    return n51;
  }
  return n51;
}
function zb(e71, n52, r27, a18, o13) {
  if (typeof r27 === "function") {
    if (r27.prototype && r27.prototype.isReactComponent) {
      o13 = Ta(r27, n52.legacyContext);
      var l = r27.contextType;
      l = new r27(a18, typeof l === "object" && l !== null ? l._currentValue2 : o13);
      Za(l, r27, a18, o13);
      xb(e71, n52, l, r27);
    } else {
      l = Ta(r27, n52.legacyContext);
      o13 = wb(e71, n52, r27, a18, l);
      var i8 = ye1 !== 0;
      if (typeof o13 === "object" && o13 !== null && typeof o13.render === "function" && o13.$$typeof === void 0) {
        Za(o13, r27, a18, l), xb(e71, n52, o13, r27);
      } else if (i8) {
        a18 = n52.treeContext;
        n52.treeContext = ab(a18, 1, 0);
        try {
          Y1(e71, n52, o13);
        } finally {
          n52.treeContext = a18;
        }
      } else
        Y1(e71, n52, o13);
    }
  } else {
    if (typeof r27 !== "string") {
      switch (r27) {
        case te1:
        case ee1:
        case j2:
        case $2:
        case D3:
          Y1(e71, n52, a18.children);
          return;
        case G1:
          Y1(e71, n52, a18.children);
          return;
        case Q1:
          throw Error(m3(343));
        case U1:
          e: {
            r27 = n52.blockedBoundary;
            o13 = n52.blockedSegment;
            l = a18.fallback;
            a18 = a18.children;
            i8 = /* @__PURE__ */ new Set();
            var u6 = {
              id: null,
              rootSegmentID: -1,
              parentFlushed: false,
              pendingTasks: 0,
              forceClientRender: false,
              completedSegments: [],
              byteSize: 0,
              fallbackAbortableTasks: i8
            }, s6 = V3(e71, o13.chunks.length, u6, o13.formatContext);
            o13.children.push(s6);
            var c14 = V3(e71, 0, null, o13.formatContext);
            c14.parentFlushed = true;
            n52.blockedBoundary = u6;
            n52.blockedSegment = c14;
            try {
              if (Ab(e71, n52, a18), c14.status = 1, u6.completedSegments.push(c14), u6.pendingTasks === 0) {
                break e;
              }
            } catch (n53) {
              c14.status = 4, W1(e71, n53), u6.forceClientRender = true;
            } finally {
              n52.blockedBoundary = r27, n52.blockedSegment = o13;
            }
            n52 = ub(e71, l, r27, s6, i8, n52.legacyContext, n52.context, n52.treeContext);
            e71.pingedTasks.push(n52);
          }
          return;
      }
      if (typeof r27 === "object" && r27 !== null) {
        switch (r27.$$typeof) {
          case O2:
            a18 = wb(e71, n52, r27.render, a18, o13);
            if (ye1 !== 0) {
              r27 = n52.treeContext;
              n52.treeContext = ab(r27, 1, 0);
              try {
                Y1(e71, n52, a18);
              } finally {
                n52.treeContext = r27;
              }
            } else
              Y1(e71, n52, a18);
            return;
          case J1:
            r27 = r27.type;
            a18 = yb(r27, a18);
            zb(e71, n52, r27, a18, o13);
            return;
          case A2:
            o13 = a18.children;
            r27 = r27._context;
            a18 = a18.value;
            l = r27._currentValue2;
            r27._currentValue2 = a18;
            i8 = le1;
            le1 = a18 = {
              parent: i8,
              depth: i8 === null ? 0 : i8.depth + 1,
              context: r27,
              parentValue: l,
              value: a18
            };
            n52.context = a18;
            Y1(e71, n52, o13);
            e71 = le1;
            if (e71 === null)
              throw Error(m3(403));
            e71.context._currentValue2 = e71.parentValue;
            e71 = le1 = e71.parent;
            n52.context = e71;
            return;
          case L1:
            a18 = a18.children;
            a18 = a18(r27._currentValue2);
            Y1(e71, n52, a18);
            return;
          case K1:
            o13 = r27._init;
            r27 = o13(r27._payload);
            a18 = yb(r27, a18);
            zb(e71, n52, r27, a18, void 0);
            return;
        }
      }
      throw Error(m3(130, r27 == null ? r27 : typeof r27, ""));
    }
    switch (o13 = n52.blockedSegment, l = wa1(o13.chunks, r27, a18, e71.responseState, o13.formatContext), i8 = o13.formatContext, o13.formatContext = oa(i8, r27, a18), Ab(e71, n52, l), o13.formatContext = i8, r27) {
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
        o13.chunks.push("</", r27, ">");
    }
  }
}
function Y1(e72, n54, r28) {
  n54.node = r28;
  if (typeof r28 === "object" && r28 !== null) {
    switch (r28.$$typeof) {
      case P2:
        zb(e72, n54, r28.type, r28.props, r28.ref);
        return;
      case N2:
        throw Error(m3(257));
      case K1:
        var a19 = r28._init;
        r28 = a19(r28._payload);
        Y1(e72, n54, r28);
        return;
    }
    if (F1(r28)) {
      Bb(e72, n54, r28);
      return;
    }
    r28 === null || typeof r28 !== "object" ? a19 = null : (a19 = ae1 && r28[ae1] || r28["@@iterator"], a19 = typeof a19 === "function" ? a19 : null);
    if (a19 && (a19 = a19.call(r28))) {
      r28 = a19.next();
      if (!r28.done) {
        var o14 = [];
        do {
          o14.push(r28.value), r28 = a19.next();
        } while (!r28.done);
        Bb(e72, n54, o14);
      }
      return;
    }
    e72 = Object.prototype.toString.call(r28);
    throw Error(m3(31, e72 === "[object Object]" ? "object with keys {" + Object.keys(r28).join(", ") + "}" : e72));
  }
  typeof r28 === "string" ? (n54 = n54.blockedSegment.chunks, e72.responseState.generateStaticMarkup ? n54.push(w4(r28)) : pa(n54, r28)) : typeof r28 === "number" && (n54 = n54.blockedSegment.chunks, r28 = "" + r28, e72.responseState.generateStaticMarkup ? n54.push(w4(r28)) : pa(n54, r28));
}
function Bb(e73, n55, r29) {
  for (var a20 = r29.length, o15 = 0; o15 < a20; o15++) {
    var l = n55.treeContext;
    n55.treeContext = ab(l, a20, o15);
    try {
      Ab(e73, n55, r29[o15]);
    } finally {
      n55.treeContext = l;
    }
  }
}
function Ab(e74, n56, r30) {
  var a21 = n56.blockedSegment.formatContext, o16 = n56.legacyContext, l = n56.context;
  try {
    return Y1(e74, n56, r30);
  } catch (s7) {
    if (jb(), typeof s7 !== "object" || s7 === null || typeof s7.then !== "function") {
      throw n56.blockedSegment.formatContext = a21, n56.legacyContext = o16, n56.context = l, I1(l), s7;
    }
    r30 = s7;
    var i9 = n56.blockedSegment, u7 = V3(e74, i9.chunks.length, null, i9.formatContext);
    i9.children.push(u7);
    e74 = ub(e74, n56.node, n56.blockedBoundary, u7, n56.abortSet, n56.legacyContext, n56.context, n56.treeContext).ping;
    r30.then(e74, e74);
    n56.blockedSegment.formatContext = a21;
    n56.legacyContext = o16;
    n56.context = l;
    I1(l);
  }
}
function Cb(e75) {
  var n57 = e75.blockedBoundary;
  e75 = e75.blockedSegment;
  e75.status = 3;
  Db(this, n57, e75);
}
function Eb(e76) {
  var n58 = e76.blockedBoundary;
  e76.blockedSegment.status = 3;
  n58 === null ? (this.allPendingTasks--, this.status !== 2 && (this.status = 2, this.destination !== null && this.destination.push(null))) : (n58.pendingTasks--, n58.forceClientRender || (n58.forceClientRender = true, n58.parentFlushed && this.clientRenderedBoundaries.push(n58)), n58.fallbackAbortableTasks.forEach(Eb, this), n58.fallbackAbortableTasks.clear(), this.allPendingTasks--, this.allPendingTasks === 0 && (e76 = this.onCompleteAll, e76()));
}
function Db(e77, n59, r31) {
  if (n59 === null) {
    if (r31.parentFlushed) {
      if (e77.completedRootSegment !== null)
        throw Error(m3(389));
      e77.completedRootSegment = r31;
    }
    e77.pendingRootTasks--;
    e77.pendingRootTasks === 0 && (n59 = e77.onCompleteShell, n59());
  } else if (n59.pendingTasks--, !n59.forceClientRender) {
    if (n59.pendingTasks === 0) {
      r31.parentFlushed && r31.status === 1 && n59.completedSegments.push(r31), n59.parentFlushed && e77.completedBoundaries.push(n59), n59.fallbackAbortableTasks.forEach(Cb, e77), n59.fallbackAbortableTasks.clear();
    } else if (r31.parentFlushed && r31.status === 1) {
      var a22 = n59.completedSegments;
      a22.push(r31);
      a22.length === 1 && n59.parentFlushed && e77.partialBoundaries.push(n59);
    }
  }
  e77.allPendingTasks--;
  e77.allPendingTasks === 0 && (e77 = e77.onCompleteAll, e77());
}
function vb(e78) {
  if (e78.status !== 2) {
    var n61 = le1, r32 = Ce1.current;
    Ce1.current = ke1;
    var a23 = we1;
    we1 = e78.responseState;
    try {
      var o17, l = e78.pingedTasks;
      for (o17 = 0; o17 < l.length; o17++) {
        var i10 = l[o17];
        var u8 = e78, s8 = i10.blockedSegment;
        if (s8.status === 0) {
          I1(i10.context);
          try {
            Y1(u8, i10, i10.node), i10.abortSet.delete(i10), s8.status = 1, Db(u8, i10.blockedBoundary, s8);
          } catch (e79) {
            if (jb(), typeof e79 === "object" && e79 !== null && typeof e79.then === "function") {
              var c22 = i10.ping;
              e79.then(c22, c22);
            } else {
              i10.abortSet.delete(i10);
              s8.status = 4;
              var f2 = i10.blockedBoundary, d21 = e79;
              W1(u8, d21);
              f2 === null ? X1(u8, d21) : (f2.pendingTasks--, f2.forceClientRender || (f2.forceClientRender = true, f2.parentFlushed && u8.clientRenderedBoundaries.push(f2)));
              u8.allPendingTasks--;
              if (u8.allPendingTasks === 0) {
                var p21 = u8.onCompleteAll;
                p21();
              }
            }
          }
        }
      }
      l.splice(0, o17);
      e78.destination !== null && Fb(e78, e78.destination);
    } catch (n60) {
      W1(e78, n60), X1(e78, n60);
    } finally {
      we1 = a23, Ce1.current = r32, r32 === ke1 && I1(n61);
    }
  }
}
function Z1(e80, n62, r33) {
  r33.parentFlushed = true;
  switch (r33.status) {
    case 0:
      var a24 = r33.id = e80.nextSegmentId++;
      e80 = e80.responseState;
      q2(n62, '<template id="');
      q2(n62, e80.placeholderPrefix);
      e80 = a24.toString(16);
      q2(n62, e80);
      return q2(n62, '"></template>');
    case 1:
      r33.status = 2;
      var o18 = true;
      a24 = r33.chunks;
      var l = 0;
      r33 = r33.children;
      for (var i11 = 0; i11 < r33.length; i11++) {
        for (o18 = r33[i11]; l < o18.index; l++)
          q2(n62, a24[l]);
        o18 = Gb(e80, n62, o18);
      }
      for (; l < a24.length; l++)
        o18 = q2(n62, a24[l]);
      return o18;
    default:
      throw Error(m3(390));
  }
}
function Gb(e81, n63, r34) {
  var a25 = r34.boundary;
  if (a25 === null)
    return Z1(e81, n63, r34);
  a25.parentFlushed = true;
  if (a25.forceClientRender) {
    return e81.responseState.generateStaticMarkup || q2(n63, "<!--$!-->"), Z1(e81, n63, r34), e81 = !!e81.responseState.generateStaticMarkup || q2(n63, "<!--/$-->"), e81;
  }
  if (0 < a25.pendingTasks) {
    a25.rootSegmentID = e81.nextSegmentId++;
    0 < a25.completedSegments.length && e81.partialBoundaries.push(a25);
    var o19 = e81.responseState;
    var l = o19.nextSuspenseID++;
    o19 = o19.boundaryPrefix + l.toString(16);
    a25 = a25.id = o19;
    xa(n63, e81.responseState, a25);
    Z1(e81, n63, r34);
    return q2(n63, "<!--/$-->");
  }
  if (a25.byteSize > e81.progressiveChunkSize) {
    return a25.rootSegmentID = e81.nextSegmentId++, e81.completedBoundaries.push(a25), xa(n63, e81.responseState, a25.id), Z1(e81, n63, r34), q2(n63, "<!--/$-->");
  }
  e81.responseState.generateStaticMarkup || q2(n63, "<!--$-->");
  r34 = a25.completedSegments;
  if (r34.length !== 1)
    throw Error(m3(391));
  Gb(e81, n63, r34[0]);
  e81 = !!e81.responseState.generateStaticMarkup || q2(n63, "<!--/$-->");
  return e81;
}
function Hb(e82, n64, r35) {
  ya(n64, e82.responseState, r35.formatContext, r35.id);
  Gb(e82, n64, r35);
  return za(n64, r35.formatContext);
}
function Ib(e83, n65, r36) {
  for (var a26 = r36.completedSegments, o20 = 0; o20 < a26.length; o20++) {
    Jb(e83, n65, r36, a26[o20]);
  }
  a26.length = 0;
  e83 = e83.responseState;
  a26 = r36.id;
  r36 = r36.rootSegmentID;
  q2(n65, e83.startInlineScript);
  e83.sentCompleteBoundaryFunction ? q2(n65, '$RC("') : (e83.sentCompleteBoundaryFunction = true, q2(n65, 'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("'));
  if (a26 === null)
    throw Error(m3(395));
  r36 = r36.toString(16);
  q2(n65, a26);
  q2(n65, '","');
  q2(n65, e83.segmentPrefix);
  q2(n65, r36);
  return q2(n65, '")<\/script>');
}
function Jb(e84, n66, r37, a27) {
  if (a27.status === 2)
    return true;
  var o21 = a27.id;
  if (o21 === -1) {
    if ((a27.id = r37.rootSegmentID) === -1)
      throw Error(m3(392));
    return Hb(e84, n66, a27);
  }
  Hb(e84, n66, a27);
  e84 = e84.responseState;
  q2(n66, e84.startInlineScript);
  e84.sentCompleteSegmentFunction ? q2(n66, '$RS("') : (e84.sentCompleteSegmentFunction = true, q2(n66, 'function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'));
  q2(n66, e84.segmentPrefix);
  o21 = o21.toString(16);
  q2(n66, o21);
  q2(n66, '","');
  q2(n66, e84.placeholderPrefix);
  q2(n66, o21);
  return q2(n66, '")<\/script>');
}
function Fb(e85, n67) {
  try {
    var r38 = e85.completedRootSegment;
    if (r38 !== null && e85.pendingRootTasks === 0) {
      Gb(e85, n67, r38);
      e85.completedRootSegment = null;
      var a28 = e85.responseState.bootstrapChunks;
      for (r38 = 0; r38 < a28.length; r38++)
        q2(n67, a28[r38]);
    }
    var o22, l = e85.clientRenderedBoundaries;
    for (o22 = 0; o22 < l.length; o22++) {
      a28 = n67;
      var i12 = e85.responseState, u9 = l[o22].id;
      q2(a28, i12.startInlineScript);
      i12.sentClientRenderFunction ? q2(a28, '$RX("') : (i12.sentClientRenderFunction = true, q2(a28, 'function $RX(a){if(a=document.getElementById(a))a=a.previousSibling,a.data="$!",a._reactRetry&&a._reactRetry()};$RX("'));
      if (u9 === null)
        throw Error(m3(395));
      q2(a28, u9);
      if (!q2(a28, '")<\/script>')) {
        e85.destination = null;
        o22++;
        l.splice(0, o22);
        return;
      }
    }
    l.splice(0, o22);
    var s9 = e85.completedBoundaries;
    for (o22 = 0; o22 < s9.length; o22++) {
      if (!Ib(e85, n67, s9[o22])) {
        e85.destination = null;
        o22++;
        s9.splice(0, o22);
        return;
      }
    }
    s9.splice(0, o22);
    var c32 = e85.partialBoundaries;
    for (o22 = 0; o22 < c32.length; o22++) {
      var f3 = c32[o22];
      e: {
        l = e85;
        i12 = n67;
        var d3 = f3.completedSegments;
        for (u9 = 0; u9 < d3.length; u9++) {
          if (!Jb(l, i12, f3, d3[u9])) {
            u9++;
            d3.splice(0, u9);
            var p = false;
            break e;
          }
        }
        d3.splice(0, u9);
        p = true;
      }
      if (!p) {
        e85.destination = null;
        o22++;
        c32.splice(0, o22);
        return;
      }
    }
    c32.splice(0, o22);
    var h21 = e85.completedBoundaries;
    for (o22 = 0; o22 < h21.length; o22++) {
      if (!Ib(e85, n67, h21[o22])) {
        e85.destination = null;
        o22++;
        h21.splice(0, o22);
        return;
      }
    }
    h21.splice(0, o22);
  } finally {
    e85.allPendingTasks === 0 && e85.pingedTasks.length === 0 && e85.clientRenderedBoundaries.length === 0 && e85.completedBoundaries.length === 0 && n67.push(null);
  }
}
function Kb(e86) {
  try {
    var n68 = e86.abortableTasks;
    n68.forEach(Eb, e86);
    n68.clear();
    e86.destination !== null && Fb(e86, e86.destination);
  } catch (n69) {
    W1(e86, n69), X1(e86, n69);
  }
}
function Lb() {
}
function Mb(e87, n70, r39) {
  var a29 = false, o23 = null, l = "", i13 = {
    push: function(e88) {
      e88 !== null && (l += e88);
      return true;
    },
    destroy: function(e89) {
      a29 = true;
      o23 = e89;
    }
  }, u10 = false;
  e87 = tb(e87, Aa(r39, n70 ? n70.identifierPrefix : void 0), {
    insertionMode: 1,
    selectedValue: null
  }, Infinity, Lb, void 0, function() {
    u10 = true;
  });
  vb(e87);
  Kb(e87);
  if (e87.status === 1)
    e87.status = 2, i13.destroy(e87.fatalError);
  else if (e87.status !== 2) {
    e87.destination = i13;
    try {
      Fb(e87, i13);
    } catch (n71) {
      W1(e87, n71), X1(e87, n71);
    }
  }
  if (a29)
    throw o23;
  if (!u10)
    throw Error(m3(342));
  return l;
}
l24.renderToNodeStream = function() {
  throw Error(m3(207));
};
l24.renderToStaticMarkup = function(e90, n72) {
  return Mb(e90, n72, true);
};
l24.renderToStaticNodeStream = function() {
  throw Error(m3(208));
};
l24.renderToString = function(e91, n73) {
  return Mb(e91, n73, false);
};
l24.version = "18.0.0-rc.0-fe905f152-20220107";
var Ee1 = {};
var qe1;
var Fe1;
qe1 = l24;
Fe1 = i2;
Ee1.version = qe1.version;
Ee1.renderToString = qe1.renderToString;
Ee1.renderToStaticMarkup = qe1.renderToStaticMarkup;
Ee1.renderToNodeStream = qe1.renderToNodeStream;
Ee1.renderToStaticNodeStream = qe1.renderToStaticNodeStream;
Ee1.renderToReadableStream = Fe1.renderToReadableStream;
var Te1 = Ee1.version;
var Re1 = Ee1.renderToString;
var _e1 = Ee1.renderToStaticMarkup;
var Ie1 = Ee1.renderToNodeStream;
var Me1 = Ee1.renderToStaticNodeStream;
var ze1 = Ee1.renderToReadableStream;
var getHtmlAndCss = (MyComponent) => {
  const key = "foo";
  const cache = q({
    key
  });
  let cssText = "";
  cache.sheet.insert = (rule) => {
    cssText += rule;
  };
  const markup = Re1(a(o, {
    value: cache
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
    css: cssText
  };
};
export {
  getHtmlAndCss
};
//# sourceMappingURL=renderToString-CDYX3F2X.mjs.map

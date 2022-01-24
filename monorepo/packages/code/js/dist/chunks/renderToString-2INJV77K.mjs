import "./chunk-XHYF4LCB.mjs";

// js/vendor/renderToString.mjs
var e = window.emotionReact;
var { CacheProvider: o } = e;
var { jsx: a } = e;
function sheetForTag(e12) {
  if (e12.sheet)
    return e12.sheet;
  for (var t6 = 0; t6 < document.styleSheets.length; t6++)
    if (document.styleSheets[t6].ownerNode === e12)
      return document.styleSheets[t6];
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
    this.isSpeedy = e42.speedy === void 0 ? true : e42.speedy;
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
    if (false) {
      var r5 = e7.charCodeAt(0) === 64 && e7.charCodeAt(1) === 105;
      r5 && this._alreadyInsertedOrderInsensitiveRule && console.error("You're attempting to insert the following rule:\n" + e7 + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.");
      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !r5;
    }
    if (this.isSpeedy) {
      var n5 = sheetForTag(t9);
      try {
        n5.insertRule(e7, n5.cssRules.length);
      } catch (t10) {
        true;
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
    false;
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
  while (--r12 && next())
    if (j < 48 || j > 102 || j > 57 && j < 65 || j > 70 && j < 97)
      break;
  return slice(e22, caret() + (r12 < 6 && peek() == 32 && next() == 32));
}
function delimiter(e23) {
  while (next())
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
  var y1 = x11;
  while (m12)
    switch (v12 = k12, k12 = next()) {
      case 40:
        if (v12 != 108 && y1.charCodeAt(p12 - 1) == 58) {
          indexof(y1 += replace(delimit(k12), "&", "&\f"), "&\f") != -1 && (b12 = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        y1 += delimit(k12);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        y1 += whitespace(v12);
        break;
      case 92:
        y1 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), r14, a42), u12);
            break;
          default:
            y1 += "/";
        }
        break;
      case 123 * d12:
        i12[l12++] = strlen(y1) * b12;
      case 125 * d12:
      case 59:
      case 0:
        switch (k12) {
          case 0:
          case 125:
            m12 = 0;
          case 59 + o12:
            h12 > 0 && strlen(y1) - p12 && append(h12 > 32 ? declaration(y1 + ";", c22, a42, p12 - 1) : declaration(replace(y1, " ", "") + ";", c22, a42, p12 - 2), u12);
            break;
          case 59:
            y1 += ";";
          default:
            append(z12 = ruleset(y1, r14, a42, l12, o12, t22, i12, x11, $12 = [], g12 = [], p12), n22);
            if (k12 === 123)
              if (o12 === 0)
                parse(y1, r14, z12, z12, $12, n22, p12, i12, g12);
              else
                switch (f12) {
                  case 100:
                  case 109:
                  case 115:
                    parse(e27, z12, z12, c22 && append(ruleset(e27, z12, z12, 0, 0, t22, i12, x11, t22, $12 = [], p12), g12), t22, g12, p12, i12, c22 ? $12 : g12);
                    break;
                  default:
                    parse(y1, z12, z12, z12, [
                      ""
                    ], g12, 0, i12, g12);
                }
        }
        l12 = o12 = h12 = 0, d12 = b12 = 1, x11 = y1 = "", p12 = s22;
        break;
      case 58:
        p12 = 1 + strlen(y1), h12 = v12;
      default:
        if (d12 < 1) {
          if (k12 == 123)
            --d12;
          else if (k12 == 125 && d12++ == 0 && prev() == 125)
            continue;
        }
        switch (y1 += w(k12), k12 * d12) {
          case 38:
            b12 = o12 > 0 ? 1 : (y1 += "\f", -1);
            break;
          case 44:
            i12[l12++] = (strlen(y1) - 1) * b12, b12 = 1;
            break;
          case 64:
            peek() === 45 && (y1 += delimit(next()));
            f12 = peek(), o12 = p12 = strlen(x11 = y1 += identifier(caret())), k12++;
            break;
          case 45:
            v12 === 45 && strlen(y1) == 2 && (d12 = 0);
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
  for (var d22 = 0, m22 = 0, b22 = 0; d22 < c31; ++d22)
    for (var w12 = 0, x22 = substr(e28, f2 + 1, f2 = k(m22 = i22[d22])), $22 = e28; w12 < v22; ++w12)
      ($22 = trim(m22 > 0 ? h22[w12] + " " + x22 : replace(x22, /&\f/g, h22[w12]))) && (l21[b22++] = $22);
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
      if (strlen(c5) - 1 - t32 > 6)
        switch (charat(c5, t32 + 1)) {
          case 109:
            if (charat(c5, t32 + 4) !== 45)
              break;
          case 102:
            return replace(c5, /(.+:)(.+)-([^]+)/, "$1" + a1 + "$2-$3$1" + r1 + (charat(c5, t32 + 3) == 108 ? "$3" : "$2-$3")) + c5;
          case 115:
            return ~indexof(c5, "stretch") ? prefix(replace(c5, "stretch", "fill-available"), t32) + c5 : c5;
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
function rulesheet(e34) {
  return function(r20) {
    r20.root || (r20 = r20.return) && e34(r20);
  };
}
function prefixer(c8, s, i, u32) {
  if (c8.length > -1 && !c8.return)
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
        if (c8.length)
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
var g1 = function identifierWithPointTracking(e22, i12, s12) {
  var u12 = 0;
  var l12 = 0;
  while (true) {
    u12 = l12;
    l12 = peek();
    u12 === 38 && l12 === 12 && (i12[s12] = 1);
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
      for (var s22 = 0, u32 = 0; s22 < a12.length; s22++)
        for (var l3 = 0; l3 < i22.length; l3++, u32++)
          e5.props[u32] = o22[s22] ? a12[s22].replace(/&\f/g, i22[l3]) : i22[l3] + " " + a12[s22];
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
var _ = [
  prefixer
];
var q = function createCache(r7) {
  var t52 = r7.key;
  if (false)
    throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements.");
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
  if (false)
    throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + t52 + '" was passed');
  var a32 = {};
  var i32;
  var s32 = [];
  i32 = r7.container || document.head;
  Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="' + t52 + ' "]'), function(e15) {
    var r9 = e15.getAttribute("data-emotion").split(" ");
    for (var t6 = 1; t6 < r9.length; t6++)
      a32[r9[t6]] = true;
    s32.push(e15);
  });
  var u4;
  var l4 = [
    k1,
    A
  ];
  false;
  var c12;
  var y11 = [
    stringify,
    false ? function(e16) {
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
    false;
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
  w11.sheet.hydrate(s32);
  return w11;
};
var r2 = {};
var e3 = Object.getOwnPropertySymbols;
var t2 = Object.prototype.hasOwnProperty;
var n2 = Object.prototype.propertyIsEnumerable;
function toObject(r13) {
  if (r13 === null || r13 === void 0)
    throw new TypeError("Object.assign cannot be called with null or undefined");
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
    for (var t13 = 0; t13 < 10; t13++)
      e13["_" + String.fromCharCode(t13)] = t13;
    var n13 = Object.getOwnPropertyNames(e13).map(function(r32) {
      return e13[r32];
    });
    if (n13.join("") !== "0123456789")
      return false;
    var a13 = {};
    "abcdefghijklmnopqrst".split("").forEach(function(r4) {
      a13[r4] = r4;
    });
    return Object.keys(Object.assign({}, a13)).join("") === "abcdefghijklmnopqrst";
  } catch (r) {
    return false;
  }
}
r2 = shouldUseNative() ? Object.assign : function(r5, a6) {
  var o4;
  var c5 = toObject(r5);
  var i4;
  for (var s4 = 1; s4 < arguments.length; s4++) {
    o4 = Object(arguments[s4]);
    for (var f2 in o4)
      t2.call(o4, f2) && (c5[f2] = o4[f2]);
    if (e3) {
      i4 = e3(o4);
      for (var l3 = 0; l3 < i4.length; l3++)
        n2.call(o4, i4[l3]) && (c5[i4[l3]] = o4[i4[l3]]);
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
  for (var r14 = "https://reactjs.org/docs/error-decoder.html?invariant=" + e14, a14 = 1; a14 < arguments.length; a14++)
    r14 += "&args[]=" + encodeURIComponent(arguments[a14]);
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
  if (o32 !== void 0)
    for (a41 = 0; a41 < o32.length; a41++)
      c21.push(T, p2(y3(o32[a41])), P1);
  if (i32 !== void 0)
    for (o32 = 0; o32 < i32.length; o32++)
      c21.push(M, p2(y3(i32[o32])), P1);
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
  for (var o4 in a6)
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
          if (r15 = a7.toLowerCase().slice(0, 5), r15 !== "data-" && r15 !== "aria-")
            return;
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
  for (i5 in r18)
    if (d1.call(r18, i5)) {
      var u32 = r18[i5];
      if (u32 != null)
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
      for (m11 in a10)
        if (d1.call(a10, m11)) {
          var s11 = a10[m11];
          if (s11 != null)
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
      e36.push(W);
      I(e36, u4, c);
      return c;
    case "option":
      u4 = i6.selectedValue;
      e36.push(J("option"));
      var h11 = s11 = null, g12 = null;
      var m11 = null;
      for (c in a10)
        if (d1.call(a10, c) && (r20 = a10[c], r20 != null))
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
      if (u4 !== null)
        if (a10 = h11 !== null ? "" + h11 : Fa(s11), F(u4)) {
          for (o7 = 0; o7 < u4.length; o7++)
            if ("" + u4[o7] === a10) {
              e36.push(Q);
              break;
            }
        } else
          u4 === a10 && e36.push(Q);
      else
        g12 && e36.push(Q);
      e36.push(W);
      I(e36, m11, s11);
      return s11;
    case "textarea":
      e36.push(J("textarea"));
      m11 = u4 = c = null;
      for (s11 in a10)
        if (d1.call(a10, s11) && (h11 = a10[s11], h11 != null))
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
      for (u4 in a10)
        if (d1.call(a10, u4) && (g12 = a10[u4], g12 != null))
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
      m11 !== null ? G(e36, o7, "checked", m11) : h11 !== null && G(e36, o7, "checked", h11);
      c !== null ? G(e36, o7, "value", c) : s11 !== null && G(e36, o7, "value", s11);
      e36.push(U);
      return null;
    case "menuitem":
      e36.push(J("menuitem"));
      for (var b11 in a10)
        if (d1.call(a10, b11) && (c = a10[b11], c != null))
          switch (b11) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(l2(400));
            default:
              G(e36, o7, b11, c);
          }
      e36.push(W);
      return null;
    case "listing":
    case "pre":
      e36.push(J(r20));
      u4 = c = null;
      for (h11 in a10)
        if (d1.call(a10, h11) && (s11 = a10[h11], s11 != null))
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
      for (var k11 in a10)
        if (d1.call(a10, k11) && (c = a10[k11], c != null))
          switch (k11) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(l2(399, r20));
            default:
              G(e36, o7, k11, c);
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
      if (r20.indexOf("-") === -1 && typeof a10.is !== "string")
        return Ha(e36, a10, r20, o7);
      e36.push(J(r20));
      u4 = c = null;
      for (g12 in a10)
        if (d1.call(a10, g12) && (s11 = a10[g12], s11 != null))
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
  if (typeof e40 === "object")
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
  if (typeof r32.getDerivedStateFromProps !== "function" && typeof e50.getSnapshotBeforeUpdate !== "function" && (typeof e50.UNSAFE_componentWillMount === "function" || typeof e50.componentWillMount === "function"))
    if (r32 = e50.state, typeof e50.componentWillMount === "function" && e50.componentWillMount(), typeof e50.UNSAFE_componentWillMount === "function" && e50.UNSAFE_componentWillMount(), r32 !== e50.state && st.enqueueReplaceState(e50, e50.state, null), u5.queue !== null && 0 < u5.queue.length)
      if (r32 = u5.queue, s21 = u5.replace, u5.queue = null, u5.replace = false, s21 && r32.length === 1)
        e50.state = r32[0];
      else {
        u5 = s21 ? r32[0] : e50.state;
        i7 = true;
        for (s21 = s21 ? 1 : 0; s21 < r32.length; s21++) {
          var d11 = r32[s21];
          d11 = typeof d11 === "function" ? d11.call(e50, u5, a16, o10) : d11;
          d11 != null && (i7 ? (i7 = false, u5 = c3({}, u5, d11)) : c3(u5, d11));
        }
        e50.state = u5;
      }
    else
      u5.queue = null;
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
          for (var i9 = 0; i9 < o13.length && i9 < r37.length; i9++)
            if (!gt(r37[i9], o13[i9])) {
              o13 = false;
              break e;
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
  if (e57 === mt)
    if (xt = true, e57 = {
      action: a20,
      next: null
    }, wt === null && (wt = /* @__PURE__ */ new Map()), a20 = wt.get(r38), a20 === void 0)
      wt.set(r38, e57);
    else {
      for (r38 = a20; r38.next !== null; )
        r38 = r38.next;
      r38.next = e57;
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
  for (e71 = a26(o17, i12); xt; )
    xt = false, St = 0, Ct += 1, yt = null, e71 = a26(o17, i12);
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
      for (var d4 in a27)
        if (!(d4 in u9))
          throw Error(l2(108, Ub(o18) || "Unknown", d4));
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
    for (var a28 in e73)
      r51[a28] === void 0 && (r51[a28] = e73[a28]);
    return r51;
  }
  return r51;
}
function Hc(e74, r52, a29, o19, i14) {
  if (typeof a29 === "function")
    if (a29.prototype && a29.prototype.isReactComponent) {
      i14 = Wb(a29, r52.legacyContext);
      var c = a29.contextType;
      c = new a29(o19, typeof c === "object" && c !== null ? c._currentValue : i14);
      bc(c, a29, o19, i14);
      Fc(e74, r52, c, a29);
    } else {
      c = Wb(a29, r52.legacyContext);
      i14 = Ec(e74, r52, a29, o19, c);
      var u10 = St !== 0;
      if (typeof i14 === "object" && i14 !== null && typeof i14.render === "function" && i14.$$typeof === void 0)
        bc(i14, a29, o19, c), Fc(e74, r52, i14, a29);
      else if (u10) {
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
  else {
    if (typeof a29 !== "string") {
      switch (a29) {
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
            a29 = r52.blockedBoundary;
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
              if (Ic(e74, r52, o19), h22.status = 1, s6.completedSegments.push(h22), s6.pendingTasks === 0)
                break e;
            } catch (r53) {
              h22.status = 4, Y(e74, r53), s6.forceClientRender = true;
            } finally {
              r52.blockedBoundary = a29, r52.blockedSegment = i14;
            }
            r52 = Bc(e74, c, a29, d5, u10, r52.legacyContext, r52.context, r52.treeContext);
            e74.pingedTasks.push(r52);
          }
          return;
      }
      if (typeof a29 === "object" && a29 !== null)
        switch (a29.$$typeof) {
          case Ye:
            o19 = Ec(e74, r52, a29.render, o19, i14);
            if (St !== 0) {
              a29 = r52.treeContext;
              r52.treeContext = dc(a29, 1, 0);
              try {
                Z(e74, r52, o19);
              } finally {
                r52.treeContext = a29;
              }
            } else
              Z(e74, r52, o19);
            return;
          case et:
            a29 = a29.type;
            o19 = Gc(a29, o19);
            Hc(e74, r52, a29, o19, i14);
            return;
          case Xe:
            i14 = o19.children;
            a29 = a29._context;
            o19 = o19.value;
            c = a29._currentValue;
            a29._currentValue = o19;
            u10 = ut;
            ut = o19 = {
              parent: u10,
              depth: u10 === null ? 0 : u10.depth + 1,
              context: a29,
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
            o19 = o19(a29._currentValue);
            Z(e74, r52, o19);
            return;
          case tt:
            i14 = a29._init;
            a29 = i14(a29._payload);
            o19 = Gc(a29, o19);
            Hc(e74, r52, a29, o19, void 0);
            return;
        }
      throw Error(l2(130, a29 == null ? a29 : typeof a29, ""));
    }
    switch (i14 = r52.blockedSegment, c = Ma(i14.chunks, a29, o19, e74.responseState, i14.formatContext), u10 = i14.formatContext, i14.formatContext = wa(u10, a29, o19), Ic(e74, r52, c), i14.formatContext = u10, a29) {
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
        i14.chunks.push(re, p2(a29), ae);
    }
  }
}
function Z(e75, r54, a30) {
  r54.node = a30;
  if (typeof a30 === "object" && a30 !== null) {
    switch (a30.$$typeof) {
      case qe:
        Hc(e75, r54, a30.type, a30.props, a30.ref);
        return;
      case We:
        throw Error(l2(257));
      case tt:
        var o20 = a30._init;
        a30 = o20(a30._payload);
        Z(e75, r54, a30);
        return;
    }
    if (F(a30)) {
      Jc(e75, r54, a30);
      return;
    }
    a30 === null || typeof a30 !== "object" ? o20 = null : (o20 = it && a30[it] || a30["@@iterator"], o20 = typeof o20 === "function" ? o20 : null);
    if (o20 && (o20 = o20.call(a30))) {
      a30 = o20.next();
      if (!a30.done) {
        var i15 = [];
        do {
          i15.push(a30.value), a30 = o20.next();
        } while (!a30.done);
        Jc(e75, r54, i15);
      }
      return;
    }
    r54 = Object.prototype.toString.call(a30);
    throw Error(l2(31, r54 === "[object Object]" ? "object with keys {" + Object.keys(a30).join(", ") + "}" : r54));
  }
  typeof a30 === "string" ? a30 !== "" && r54.blockedSegment.chunks.push(p2(y3(a30)), B) : typeof a30 === "number" && (e75 = "" + a30, e75 !== "" && r54.blockedSegment.chunks.push(p2(y3(e75)), B));
}
function Jc(e76, r55, a31) {
  for (var o21 = a31.length, i16 = 0; i16 < o21; i16++) {
    var c = r55.treeContext;
    r55.treeContext = dc(c, o21, i16);
    try {
      Ic(e76, r55, a31[i16]);
    } finally {
      r55.treeContext = c;
    }
  }
}
function Ic(e77, r56, a32) {
  var o22 = r56.blockedSegment.formatContext, i17 = r56.legacyContext, c = r56.context;
  try {
    return Z(e77, r56, a32);
  } catch (d6) {
    if (nc(), typeof d6 !== "object" || d6 === null || typeof d6.then !== "function")
      throw r56.blockedSegment.formatContext = o22, r56.legacyContext = i17, r56.context = c, O1(c), d6;
    a32 = d6;
    var u11 = r56.blockedSegment, s7 = Ac(e77, u11.chunks.length, null, u11.formatContext);
    u11.children.push(s7);
    e77 = Bc(e77, r56.node, r56.blockedBoundary, s7, r56.abortSet, r56.legacyContext, r56.context, r56.treeContext).ping;
    a32.then(e77, e77);
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
function Lc(e80, r59, a33) {
  if (r59 === null) {
    if (a33.parentFlushed) {
      if (e80.completedRootSegment !== null)
        throw Error(l2(389));
      e80.completedRootSegment = a33;
    }
    e80.pendingRootTasks--;
    e80.pendingRootTasks === 0 && (r59 = e80.onCompleteShell, r59());
  } else if (r59.pendingTasks--, !r59.forceClientRender) {
    if (r59.pendingTasks === 0)
      a33.parentFlushed && a33.status === 1 && r59.completedSegments.push(a33), r59.parentFlushed && e80.completedBoundaries.push(r59), r59.fallbackAbortableTasks.forEach(Kc, e80), r59.fallbackAbortableTasks.clear();
    else if (a33.parentFlushed && a33.status === 1) {
      var o23 = r59.completedSegments;
      o23.push(a33);
      o23.length === 1 && r59.parentFlushed && e80.partialBoundaries.push(r59);
    }
  }
  e80.allPendingTasks--;
  e80.allPendingTasks === 0 && (e80 = e80.onCompleteAll, e80());
}
function Cc(e81) {
  if (e81.status !== 2) {
    var r61 = ut, a34 = Rt.current;
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
      Ft = o24, Rt.current = a34, a34 === Et && O1(r61);
    }
  }
}
function Oc(e83, r62, a35) {
  a35.parentFlushed = true;
  switch (a35.status) {
    case 0:
      var o25 = a35.id = e83.nextSegmentId++;
      e83 = e83.responseState;
      n4(r62, oe);
      n4(r62, e83.placeholderPrefix);
      e83 = p2(o25.toString(16));
      n4(r62, e83);
      return n4(r62, le);
    case 1:
      a35.status = 2;
      var i19 = true;
      o25 = a35.chunks;
      var c = 0;
      a35 = a35.children;
      for (var u13 = 0; u13 < a35.length; u13++) {
        for (i19 = a35[u13]; c < i19.index; c++)
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
function Pc(e84, r63, a36) {
  var o26 = a36.boundary;
  if (o26 === null)
    return Oc(e84, r63, a36);
  o26.parentFlushed = true;
  if (o26.forceClientRender)
    n4(r63, se), Oc(e84, r63, a36);
  else if (0 < o26.pendingTasks) {
    o26.rootSegmentID = e84.nextSegmentId++;
    0 < o26.completedSegments.length && e84.partialBoundaries.push(o26);
    var i20 = e84.responseState;
    var c = i20.nextSuspenseID++;
    i20 = t4(i20.boundaryPrefix + c.toString(16));
    o26 = o26.id = i20;
    Wa(r63, e84.responseState, o26);
    Oc(e84, r63, a36);
  } else if (o26.byteSize > e84.progressiveChunkSize)
    o26.rootSegmentID = e84.nextSegmentId++, e84.completedBoundaries.push(o26), Wa(r63, e84.responseState, o26.id), Oc(e84, r63, a36);
  else {
    n4(r63, ie);
    a36 = o26.completedSegments;
    if (a36.length !== 1)
      throw Error(l2(391));
    Pc(e84, r63, a36[0]);
  }
  return n4(r63, fe);
}
function Qc(e85, r64, a37) {
  rb(r64, e85.responseState, a37.formatContext, a37.id);
  Pc(e85, r64, a37);
  return sb(r64, a37.formatContext);
}
function Rc(e86, r65, a38) {
  for (var o27 = a38.completedSegments, i21 = 0; i21 < o27.length; i21++)
    Sc(e86, r65, a38, o27[i21]);
  o27.length = 0;
  e86 = e86.responseState;
  o27 = a38.id;
  a38 = a38.rootSegmentID;
  n4(r65, e86.startInlineScript);
  e86.sentCompleteBoundaryFunction ? n4(r65, Le) : (e86.sentCompleteBoundaryFunction = true, n4(r65, Oe));
  if (o27 === null)
    throw Error(l2(395));
  a38 = p2(a38.toString(16));
  n4(r65, o27);
  n4(r65, $e);
  n4(r65, e86.segmentPrefix);
  n4(r65, a38);
  return n4(r65, je);
}
function Sc(e87, r66, a39, o28) {
  if (o28.status === 2)
    return true;
  var i22 = o28.id;
  if (i22 === -1) {
    if ((o28.id = a39.rootSegmentID) === -1)
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
    var a40 = e88.completedRootSegment;
    if (a40 !== null && e88.pendingRootTasks === 0) {
      Pc(e88, r67, a40);
      e88.completedRootSegment = null;
      var o29 = e88.responseState.bootstrapChunks;
      for (a40 = 0; a40 < o29.length; a40++)
        n4(r67, o29[a40]);
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
    for (i23 = 0; i23 < d8.length; i23++)
      if (!Rc(e88, r67, d8[i23])) {
        e88.destination = null;
        i23++;
        d8.splice(0, i23);
        return;
      }
    d8.splice(0, i23);
    var h4 = e88.partialBoundaries;
    for (i23 = 0; i23 < h4.length; i23++) {
      var g31 = h4[i23];
      e: {
        c = e88;
        u14 = r67;
        var m32 = g31.completedSegments;
        for (s9 = 0; s9 < m32.length; s9++)
          if (!Sc(c, u14, g31, m32[s9])) {
            s9++;
            m32.splice(0, s9);
            var b = false;
            break e;
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
    for (i23 = 0; i23 < k21.length; i23++)
      if (!Rc(e88, r67, k21[i23])) {
        e88.destination = null;
        i23++;
        k21.splice(0, i23);
        return;
      }
    k21.splice(0, i23);
  } finally {
    e88.allPendingTasks === 0 && e88.pingedTasks.length === 0 && e88.clientRenderedBoundaries.length === 0 && e88.completedBoundaries.length === 0 && r67.close();
  }
}
i2.renderToReadableStream = function(e89, r68) {
  var a41 = zc(e89, ua(r68 ? r68.identifierPrefix : void 0, r68 ? r68.nonce : void 0, r68 ? r68.bootstrapScriptContent : void 0, r68 ? r68.bootstrapScripts : void 0, r68 ? r68.bootstrapModules : void 0), va(r68 ? r68.namespaceURI : void 0), r68 ? r68.progressiveChunkSize : void 0, r68 ? r68.onError : void 0, r68 ? r68.onCompleteAll : void 0, r68 ? r68.onCompleteShell : void 0);
  if (r68 && r68.signal) {
    var o30 = r68.signal, f3 = function() {
      try {
        var e90 = a41.abortableTasks;
        e90.forEach(Mc, a41);
        e90.clear();
        a41.destination !== null && Nc(a41, a41.destination);
      } catch (e91) {
        Y(a41, e91), Dc(a41, e91);
      }
      o30.removeEventListener("abort", f3);
    };
    o30.addEventListener("abort", f3);
  }
  var i24 = new ReadableStream({
    start: function() {
      Cc(a41);
    },
    pull: function(e92) {
      if (i24.locked) {
        if (a41.status === 1)
          a41.status = 2, ca(e92, a41.fatalError);
        else if (a41.status !== 2) {
          a41.destination = e92;
          try {
            Nc(a41, e92);
          } catch (e93) {
            Y(a41, e93), Dc(a41, e93);
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
  for (var n14 = "https://reactjs.org/docs/error-decoder.html?invariant=" + e15, r15 = 1; r15 < arguments.length; r15++)
    n14 += "&args[]=" + encodeURIComponent(arguments[r15]);
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
  for (var a32 in r5)
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
          if (n14 = r6.toLowerCase().slice(0, 5), n14 !== "data-" && n14 !== "aria-")
            return;
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
  for (o4 in n17)
    if (c4.call(n17, o4)) {
      var i31 = n17[o4];
      if (i31 != null)
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
      for (d12 in r9)
        if (c4.call(r9, d12)) {
          var u12 = r9[d12];
          if (u12 != null)
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
      e32.push(">");
      B1(e32, i4, l);
      return l;
    case "option":
      i4 = o5.selectedValue;
      e32.push(C4("option"));
      var s12 = u12 = null, f11 = null;
      var d12 = null;
      for (l in r9)
        if (c4.call(r9, l) && (n19 = r9[l], n19 != null))
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
      if (i4 !== null)
        if (r9 = s12 !== null ? "" + s12 : sa(u12), F1(i4)) {
          for (a6 = 0; a6 < i4.length; a6++)
            if ("" + i4[a6] === r9) {
              e32.push(' selected=""');
              break;
            }
        } else
          i4 === r9 && e32.push(' selected=""');
      else
        f11 && e32.push(' selected=""');
      e32.push(">");
      B1(e32, d12, u12);
      return u12;
    case "textarea":
      e32.push(C4("textarea"));
      d12 = i4 = l = null;
      for (u12 in r9)
        if (c4.call(r9, u12) && (s12 = r9[u12], s12 != null))
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
      for (i4 in r9)
        if (c4.call(r9, i4) && (f11 = r9[i4], f11 != null))
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
      d12 !== null ? z2(e32, a6, "checked", d12) : s12 !== null && z2(e32, a6, "checked", s12);
      l !== null ? z2(e32, a6, "value", l) : u12 !== null && z2(e32, a6, "value", u12);
      e32.push("/>");
      return null;
    case "menuitem":
      e32.push(C4("menuitem"));
      for (var p11 in r9)
        if (c4.call(r9, p11) && (l = r9[p11], l != null))
          switch (p11) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(m3(400));
            default:
              z2(e32, a6, p11, l);
          }
      e32.push(">");
      return null;
    case "listing":
    case "pre":
      e32.push(C4(n19));
      i4 = l = null;
      for (s12 in r9)
        if (c4.call(r9, s12) && (u12 = r9[s12], u12 != null))
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
      for (var h12 in r9)
        if (c4.call(r9, h12) && (l = r9[h12], l != null))
          switch (h12) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(m3(399, n19));
            default:
              z2(e32, a6, h12, l);
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
      if (n19.indexOf("-") === -1 && typeof r9.is !== "string")
        return ta(e32, r9, n19, a6);
      e32.push(C4(n19));
      i4 = l = null;
      for (f11 in r9)
        if (c4.call(r9, f11) && (u12 = r9[f11], u12 != null))
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
  if (typeof e37 === "object")
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
  if (typeof n32.getDerivedStateFromProps !== "function" && typeof e47.getSnapshotBeforeUpdate !== "function" && (typeof e47.UNSAFE_componentWillMount === "function" || typeof e47.componentWillMount === "function"))
    if (n32 = e47.state, typeof e47.componentWillMount === "function" && e47.componentWillMount(), typeof e47.UNSAFE_componentWillMount === "function" && e47.UNSAFE_componentWillMount(), n32 !== e47.state && ie1.enqueueReplaceState(e47, e47.state, null), l.queue !== null && 0 < l.queue.length)
      if (n32 = l.queue, u22 = l.replace, l.queue = null, l.replace = false, u22 && n32.length === 1)
        e47.state = n32[0];
      else {
        l = u22 ? n32[0] : e47.state;
        o6 = true;
        for (u22 = u22 ? 1 : 0; u22 < n32.length; u22++) {
          var s22 = n32[u22];
          s22 = typeof s22 === "function" ? s22.call(e47, l, r15, a9) : s22;
          s22 != null && (o6 ? (o6 = false, l = i3({}, l, s22)) : i3(l, s22));
        }
        e47.state = l;
      }
    else
      l.queue = null;
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
          for (var o8 = 0; o8 < a12.length && o8 < n37.length; o8++)
            if (!de1(n37[o8], a12[o8])) {
              a12 = false;
              break e;
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
  if (e54 === pe1)
    if (ve1 = true, e54 = {
      action: r19,
      next: null
    }, Se1 === null && (Se1 = /* @__PURE__ */ new Map()), r19 = Se1.get(n38), r19 === void 0)
      Se1.set(n38, e54);
    else {
      for (n38 = r19; n38.next !== null; )
        n38 = n38.next;
      n38.next = e54;
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
  for (e68 = r25(a16, o11); ve1; )
    ve1 = false, ye1 = 0, xe1 += 1, be1 = null, e68 = r25(a16, o11);
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
      for (var s5 in r26)
        if (!(s5 in l))
          throw Error(m3(108, Ra(a17) || "Unknown", s5));
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
    for (var r27 in e70)
      n51[r27] === void 0 && (n51[r27] = e70[r27]);
    return n51;
  }
  return n51;
}
function zb(e71, n52, r28, a18, o13) {
  if (typeof r28 === "function")
    if (r28.prototype && r28.prototype.isReactComponent) {
      o13 = Ta(r28, n52.legacyContext);
      var l = r28.contextType;
      l = new r28(a18, typeof l === "object" && l !== null ? l._currentValue2 : o13);
      Za(l, r28, a18, o13);
      xb(e71, n52, l, r28);
    } else {
      l = Ta(r28, n52.legacyContext);
      o13 = wb(e71, n52, r28, a18, l);
      var i8 = ye1 !== 0;
      if (typeof o13 === "object" && o13 !== null && typeof o13.render === "function" && o13.$$typeof === void 0)
        Za(o13, r28, a18, l), xb(e71, n52, o13, r28);
      else if (i8) {
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
  else {
    if (typeof r28 !== "string") {
      switch (r28) {
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
            r28 = n52.blockedBoundary;
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
              if (Ab(e71, n52, a18), c14.status = 1, u6.completedSegments.push(c14), u6.pendingTasks === 0)
                break e;
            } catch (n53) {
              c14.status = 4, W1(e71, n53), u6.forceClientRender = true;
            } finally {
              n52.blockedBoundary = r28, n52.blockedSegment = o13;
            }
            n52 = ub(e71, l, r28, s6, i8, n52.legacyContext, n52.context, n52.treeContext);
            e71.pingedTasks.push(n52);
          }
          return;
      }
      if (typeof r28 === "object" && r28 !== null)
        switch (r28.$$typeof) {
          case O2:
            a18 = wb(e71, n52, r28.render, a18, o13);
            if (ye1 !== 0) {
              r28 = n52.treeContext;
              n52.treeContext = ab(r28, 1, 0);
              try {
                Y1(e71, n52, a18);
              } finally {
                n52.treeContext = r28;
              }
            } else
              Y1(e71, n52, a18);
            return;
          case J1:
            r28 = r28.type;
            a18 = yb(r28, a18);
            zb(e71, n52, r28, a18, o13);
            return;
          case A2:
            o13 = a18.children;
            r28 = r28._context;
            a18 = a18.value;
            l = r28._currentValue2;
            r28._currentValue2 = a18;
            i8 = le1;
            le1 = a18 = {
              parent: i8,
              depth: i8 === null ? 0 : i8.depth + 1,
              context: r28,
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
            a18 = a18(r28._currentValue2);
            Y1(e71, n52, a18);
            return;
          case K1:
            o13 = r28._init;
            r28 = o13(r28._payload);
            a18 = yb(r28, a18);
            zb(e71, n52, r28, a18, void 0);
            return;
        }
      throw Error(m3(130, r28 == null ? r28 : typeof r28, ""));
    }
    switch (o13 = n52.blockedSegment, l = wa1(o13.chunks, r28, a18, e71.responseState, o13.formatContext), i8 = o13.formatContext, o13.formatContext = oa(i8, r28, a18), Ab(e71, n52, l), o13.formatContext = i8, r28) {
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
        o13.chunks.push("</", r28, ">");
    }
  }
}
function Y1(e72, n54, r29) {
  n54.node = r29;
  if (typeof r29 === "object" && r29 !== null) {
    switch (r29.$$typeof) {
      case P2:
        zb(e72, n54, r29.type, r29.props, r29.ref);
        return;
      case N2:
        throw Error(m3(257));
      case K1:
        var a19 = r29._init;
        r29 = a19(r29._payload);
        Y1(e72, n54, r29);
        return;
    }
    if (F1(r29)) {
      Bb(e72, n54, r29);
      return;
    }
    r29 === null || typeof r29 !== "object" ? a19 = null : (a19 = ae1 && r29[ae1] || r29["@@iterator"], a19 = typeof a19 === "function" ? a19 : null);
    if (a19 && (a19 = a19.call(r29))) {
      r29 = a19.next();
      if (!r29.done) {
        var o14 = [];
        do {
          o14.push(r29.value), r29 = a19.next();
        } while (!r29.done);
        Bb(e72, n54, o14);
      }
      return;
    }
    e72 = Object.prototype.toString.call(r29);
    throw Error(m3(31, e72 === "[object Object]" ? "object with keys {" + Object.keys(r29).join(", ") + "}" : e72));
  }
  typeof r29 === "string" ? (n54 = n54.blockedSegment.chunks, e72.responseState.generateStaticMarkup ? n54.push(w4(r29)) : pa(n54, r29)) : typeof r29 === "number" && (n54 = n54.blockedSegment.chunks, r29 = "" + r29, e72.responseState.generateStaticMarkup ? n54.push(w4(r29)) : pa(n54, r29));
}
function Bb(e73, n55, r30) {
  for (var a20 = r30.length, o15 = 0; o15 < a20; o15++) {
    var l = n55.treeContext;
    n55.treeContext = ab(l, a20, o15);
    try {
      Ab(e73, n55, r30[o15]);
    } finally {
      n55.treeContext = l;
    }
  }
}
function Ab(e74, n56, r31) {
  var a21 = n56.blockedSegment.formatContext, o16 = n56.legacyContext, l = n56.context;
  try {
    return Y1(e74, n56, r31);
  } catch (s7) {
    if (jb(), typeof s7 !== "object" || s7 === null || typeof s7.then !== "function")
      throw n56.blockedSegment.formatContext = a21, n56.legacyContext = o16, n56.context = l, I1(l), s7;
    r31 = s7;
    var i9 = n56.blockedSegment, u7 = V3(e74, i9.chunks.length, null, i9.formatContext);
    i9.children.push(u7);
    e74 = ub(e74, n56.node, n56.blockedBoundary, u7, n56.abortSet, n56.legacyContext, n56.context, n56.treeContext).ping;
    r31.then(e74, e74);
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
function Db(e77, n59, r32) {
  if (n59 === null) {
    if (r32.parentFlushed) {
      if (e77.completedRootSegment !== null)
        throw Error(m3(389));
      e77.completedRootSegment = r32;
    }
    e77.pendingRootTasks--;
    e77.pendingRootTasks === 0 && (n59 = e77.onCompleteShell, n59());
  } else if (n59.pendingTasks--, !n59.forceClientRender) {
    if (n59.pendingTasks === 0)
      r32.parentFlushed && r32.status === 1 && n59.completedSegments.push(r32), n59.parentFlushed && e77.completedBoundaries.push(n59), n59.fallbackAbortableTasks.forEach(Cb, e77), n59.fallbackAbortableTasks.clear();
    else if (r32.parentFlushed && r32.status === 1) {
      var a22 = n59.completedSegments;
      a22.push(r32);
      a22.length === 1 && n59.parentFlushed && e77.partialBoundaries.push(n59);
    }
  }
  e77.allPendingTasks--;
  e77.allPendingTasks === 0 && (e77 = e77.onCompleteAll, e77());
}
function vb(e78) {
  if (e78.status !== 2) {
    var n61 = le1, r33 = Ce1.current;
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
      we1 = a23, Ce1.current = r33, r33 === ke1 && I1(n61);
    }
  }
}
function Z1(e80, n62, r34) {
  r34.parentFlushed = true;
  switch (r34.status) {
    case 0:
      var a24 = r34.id = e80.nextSegmentId++;
      e80 = e80.responseState;
      q2(n62, '<template id="');
      q2(n62, e80.placeholderPrefix);
      e80 = a24.toString(16);
      q2(n62, e80);
      return q2(n62, '"></template>');
    case 1:
      r34.status = 2;
      var o18 = true;
      a24 = r34.chunks;
      var l = 0;
      r34 = r34.children;
      for (var i11 = 0; i11 < r34.length; i11++) {
        for (o18 = r34[i11]; l < o18.index; l++)
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
function Gb(e81, n63, r35) {
  var a25 = r35.boundary;
  if (a25 === null)
    return Z1(e81, n63, r35);
  a25.parentFlushed = true;
  if (a25.forceClientRender)
    return e81.responseState.generateStaticMarkup || q2(n63, "<!--$!-->"), Z1(e81, n63, r35), e81 = !!e81.responseState.generateStaticMarkup || q2(n63, "<!--/$-->"), e81;
  if (0 < a25.pendingTasks) {
    a25.rootSegmentID = e81.nextSegmentId++;
    0 < a25.completedSegments.length && e81.partialBoundaries.push(a25);
    var o19 = e81.responseState;
    var l = o19.nextSuspenseID++;
    o19 = o19.boundaryPrefix + l.toString(16);
    a25 = a25.id = o19;
    xa(n63, e81.responseState, a25);
    Z1(e81, n63, r35);
    return q2(n63, "<!--/$-->");
  }
  if (a25.byteSize > e81.progressiveChunkSize)
    return a25.rootSegmentID = e81.nextSegmentId++, e81.completedBoundaries.push(a25), xa(n63, e81.responseState, a25.id), Z1(e81, n63, r35), q2(n63, "<!--/$-->");
  e81.responseState.generateStaticMarkup || q2(n63, "<!--$-->");
  r35 = a25.completedSegments;
  if (r35.length !== 1)
    throw Error(m3(391));
  Gb(e81, n63, r35[0]);
  e81 = !!e81.responseState.generateStaticMarkup || q2(n63, "<!--/$-->");
  return e81;
}
function Hb(e82, n64, r36) {
  ya(n64, e82.responseState, r36.formatContext, r36.id);
  Gb(e82, n64, r36);
  return za(n64, r36.formatContext);
}
function Ib(e83, n65, r37) {
  for (var a26 = r37.completedSegments, o20 = 0; o20 < a26.length; o20++)
    Jb(e83, n65, r37, a26[o20]);
  a26.length = 0;
  e83 = e83.responseState;
  a26 = r37.id;
  r37 = r37.rootSegmentID;
  q2(n65, e83.startInlineScript);
  e83.sentCompleteBoundaryFunction ? q2(n65, '$RC("') : (e83.sentCompleteBoundaryFunction = true, q2(n65, 'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("'));
  if (a26 === null)
    throw Error(m3(395));
  r37 = r37.toString(16);
  q2(n65, a26);
  q2(n65, '","');
  q2(n65, e83.segmentPrefix);
  q2(n65, r37);
  return q2(n65, '")<\/script>');
}
function Jb(e84, n66, r38, a27) {
  if (a27.status === 2)
    return true;
  var o21 = a27.id;
  if (o21 === -1) {
    if ((a27.id = r38.rootSegmentID) === -1)
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
    var r39 = e85.completedRootSegment;
    if (r39 !== null && e85.pendingRootTasks === 0) {
      Gb(e85, n67, r39);
      e85.completedRootSegment = null;
      var a28 = e85.responseState.bootstrapChunks;
      for (r39 = 0; r39 < a28.length; r39++)
        q2(n67, a28[r39]);
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
    for (o22 = 0; o22 < s9.length; o22++)
      if (!Ib(e85, n67, s9[o22])) {
        e85.destination = null;
        o22++;
        s9.splice(0, o22);
        return;
      }
    s9.splice(0, o22);
    var c32 = e85.partialBoundaries;
    for (o22 = 0; o22 < c32.length; o22++) {
      var f3 = c32[o22];
      e: {
        l = e85;
        i12 = n67;
        var d3 = f3.completedSegments;
        for (u9 = 0; u9 < d3.length; u9++)
          if (!Jb(l, i12, f3, d3[u9])) {
            u9++;
            d3.splice(0, u9);
            var p = false;
            break e;
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
    for (o22 = 0; o22 < h21.length; o22++)
      if (!Ib(e85, n67, h21[o22])) {
        e85.destination = null;
        o22++;
        h21.splice(0, o22);
        return;
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
function Mb(e87, n70, r40) {
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
  e87 = tb(e87, Aa(r40, n70 ? n70.identifierPrefix : void 0), {
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
  const key = "css";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vdmVuZG9yL3JlbmRlclRvU3RyaW5nLm1qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gZGVuby1mbXQtaWdub3JlLWZpbGVcbi8vIGRlbm8tbGludC1pZ25vcmUtZmlsZVxuLy8gVGhpcyBjb2RlIHdhcyBidW5kbGVkIHVzaW5nIGBkZW5vIGJ1bmRsZWAgYW5kIGl0J3Mgbm90IHJlY29tbWVuZGVkIHRvIGVkaXQgaXQgbWFudWFsbHlcblxudmFyIGUgPSB3aW5kb3cuZW1vdGlvblJlYWN0LCB7IENhY2hlUHJvdmlkZXI6IG8gIH0gPSBlLCB7IENsYXNzTmFtZXM6IHQgIH0gPSBlLCB7IEdsb2JhbDogcyAgfSA9IGUsIHsgVGhlbWVDb250ZXh0OiBuICB9ID0gZSwgeyBUaGVtZVByb3ZpZGVyOiBjNiAgfSA9IGUsIHsgX191bnNhZmVfdXNlRW1vdGlvbkNhY2hlOiByICB9ID0gZSwgeyBjcmVhdGVFbGVtZW50OiB4ICB9ID0gZSwgeyBjc3M6IHA0ICB9ID0gZSwgeyBqc3g6IGEgIH0gPSBlLCB7IGtleWZyYW1lczogbSAgfSA9IGUsIHsgdXNlVGhlbWU6IGggIH0gPSBlLCB7IHdpdGhFbW90aW9uQ2FjaGU6IGkgIH0gPSBlLCB7IHdpdGhUaGVtZTogbDQgIH0gPSBlO1xuZnVuY3Rpb24gc2hlZXRGb3JUYWcoZTEpIHtcbiAgICBpZiAoZTEuc2hlZXQpIHJldHVybiBlMS5zaGVldDtcbiAgICBmb3IodmFyIHQ2ID0gMDsgdDYgPCBkb2N1bWVudC5zdHlsZVNoZWV0cy5sZW5ndGg7IHQ2KyspaWYgKGRvY3VtZW50LnN0eWxlU2hlZXRzW3Q2XS5vd25lck5vZGUgPT09IGUxKSByZXR1cm4gZG9jdW1lbnQuc3R5bGVTaGVldHNbdDZdO1xufVxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50KGUyKSB7XG4gICAgdmFyIHQ3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgIHQ3LnNldEF0dHJpYnV0ZShcImRhdGEtZW1vdGlvblwiLCBlMi5rZXkpO1xuICAgIHZvaWQgMCAhPT0gZTIubm9uY2UgJiYgdDcuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgZTIubm9uY2UpO1xuICAgIHQ3LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiXCIpKTtcbiAgICB0Ny5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNcIiwgXCJcIik7XG4gICAgcmV0dXJuIHQ3O1xufVxudmFyIGUxID0gZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gU3R5bGVTaGVldChlNCkge1xuICAgICAgICB2YXIgdDggPSB0aGlzO1xuICAgICAgICB0aGlzLl9pbnNlcnRUYWcgPSBmdW5jdGlvbihlNSkge1xuICAgICAgICAgICAgdmFyIHI0O1xuICAgICAgICAgICAgcjQgPSAwID09PSB0OC50YWdzLmxlbmd0aCA/IHQ4Lmluc2VydGlvblBvaW50ID8gdDguaW5zZXJ0aW9uUG9pbnQubmV4dFNpYmxpbmcgOiB0OC5wcmVwZW5kID8gdDguY29udGFpbmVyLmZpcnN0Q2hpbGQgOiB0OC5iZWZvcmUgOiB0OC50YWdzW3Q4LnRhZ3MubGVuZ3RoIC0gMV0ubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB0OC5jb250YWluZXIuaW5zZXJ0QmVmb3JlKGU1LCByNCk7XG4gICAgICAgICAgICB0OC50YWdzLnB1c2goZTUpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmlzU3BlZWR5ID0gdm9pZCAwID09PSBlNC5zcGVlZHkgPyBcInByb2R1Y3Rpb25cIiA9PT0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgOiBlNC5zcGVlZHk7XG4gICAgICAgIHRoaXMudGFncyA9IFtdO1xuICAgICAgICB0aGlzLmN0ciA9IDA7XG4gICAgICAgIHRoaXMubm9uY2UgPSBlNC5ub25jZTtcbiAgICAgICAgdGhpcy5rZXkgPSBlNC5rZXk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gZTQuY29udGFpbmVyO1xuICAgICAgICB0aGlzLnByZXBlbmQgPSBlNC5wcmVwZW5kO1xuICAgICAgICB0aGlzLmluc2VydGlvblBvaW50ID0gZTQuaW5zZXJ0aW9uUG9pbnQ7XG4gICAgICAgIHRoaXMuYmVmb3JlID0gbnVsbDtcbiAgICB9XG4gICAgdmFyIGUzID0gU3R5bGVTaGVldC5wcm90b3R5cGU7XG4gICAgZTMuaHlkcmF0ZSA9IGZ1bmN0aW9uIGh5ZHJhdGUoZTYpIHtcbiAgICAgICAgZTYuZm9yRWFjaCh0aGlzLl9pbnNlcnRUYWcpO1xuICAgIH07XG4gICAgZTMuaW5zZXJ0ID0gZnVuY3Rpb24gaW5zZXJ0KGU3KSB7XG4gICAgICAgIHRoaXMuY3RyICUgKHRoaXMuaXNTcGVlZHkgPyA2NTAwMCA6IDEpID09PSAwICYmIHRoaXMuX2luc2VydFRhZyhjcmVhdGVTdHlsZUVsZW1lbnQodGhpcykpO1xuICAgICAgICB2YXIgdDkgPSB0aGlzLnRhZ3NbdGhpcy50YWdzLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSB7XG4gICAgICAgICAgICB2YXIgcjUgPSA2NCA9PT0gZTcuY2hhckNvZGVBdCgwKSAmJiAxMDUgPT09IGU3LmNoYXJDb2RlQXQoMSk7XG4gICAgICAgICAgICByNSAmJiB0aGlzLl9hbHJlYWR5SW5zZXJ0ZWRPcmRlckluc2Vuc2l0aXZlUnVsZSAmJiBjb25zb2xlLmVycm9yKFwiWW91J3JlIGF0dGVtcHRpbmcgdG8gaW5zZXJ0IHRoZSBmb2xsb3dpbmcgcnVsZTpcXG5cIiArIGU3ICsgXCJcXG5cXG5gQGltcG9ydGAgcnVsZXMgbXVzdCBiZSBiZWZvcmUgYWxsIG90aGVyIHR5cGVzIG9mIHJ1bGVzIGluIGEgc3R5bGVzaGVldCBidXQgb3RoZXIgcnVsZXMgaGF2ZSBhbHJlYWR5IGJlZW4gaW5zZXJ0ZWQuIFBsZWFzZSBlbnN1cmUgdGhhdCBgQGltcG9ydGAgcnVsZXMgYXJlIGJlZm9yZSBhbGwgb3RoZXIgcnVsZXMuXCIpO1xuICAgICAgICAgICAgdGhpcy5fYWxyZWFkeUluc2VydGVkT3JkZXJJbnNlbnNpdGl2ZVJ1bGUgPSB0aGlzLl9hbHJlYWR5SW5zZXJ0ZWRPcmRlckluc2Vuc2l0aXZlUnVsZSB8fCAhcjU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNTcGVlZHkpIHtcbiAgICAgICAgICAgIHZhciBuNSA9IHNoZWV0Rm9yVGFnKHQ5KTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbjUuaW5zZXJ0UnVsZShlNywgbjUuY3NzUnVsZXMubGVuZ3RoKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKHQxMCkge1xuICAgICAgICAgICAgICAgIFwicHJvZHVjdGlvblwiID09PSBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCAvOigtbW96LXBsYWNlaG9sZGVyfC1tb3otZm9jdXMtaW5uZXJ8LW1vei1mb2N1c3Jpbmd8LW1zLWlucHV0LXBsYWNlaG9sZGVyfC1tb3otcmVhZC13cml0ZXwtbW96LXJlYWQtb25seXwtbXMtY2xlYXIpey8udGVzdChlNykgfHwgY29uc29sZS5lcnJvcignVGhlcmUgd2FzIGEgcHJvYmxlbSBpbnNlcnRpbmcgdGhlIGZvbGxvd2luZyBydWxlOiBcIicgKyBlNyArICdcIicsIHQxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB0OS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShlNykpO1xuICAgICAgICB0aGlzLmN0cisrO1xuICAgIH07XG4gICAgZTMuZmx1c2ggPSBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICAgICAgdGhpcy50YWdzLmZvckVhY2goZnVuY3Rpb24oZTgpIHtcbiAgICAgICAgICAgIHJldHVybiBlOC5wYXJlbnROb2RlICYmIGU4LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZTgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy50YWdzID0gW107XG4gICAgICAgIHRoaXMuY3RyID0gMDtcbiAgICAgICAgXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WICYmICh0aGlzLl9hbHJlYWR5SW5zZXJ0ZWRPcmRlckluc2Vuc2l0aXZlUnVsZSA9IGZhbHNlKTtcbiAgICB9O1xuICAgIHJldHVybiBTdHlsZVNoZWV0O1xufSgpO1xudmFyIGUyID0gXCItbXMtXCI7XG52YXIgcjEgPSBcIi1tb3otXCI7XG52YXIgYTEgPSBcIi13ZWJraXQtXCI7XG52YXIgYzEgPSBcImNvbW1cIjtcbnZhciB0MSA9IFwicnVsZVwiO1xudmFyIG4xID0gXCJkZWNsXCI7XG52YXIgdSA9IFwiQGltcG9ydFwiO1xudmFyIHYgPSBcIkBrZXlmcmFtZXNcIjtcbnZhciBrID0gTWF0aC5hYnM7XG52YXIgdyA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG52YXIgeDEgPSBPYmplY3QuYXNzaWduO1xuZnVuY3Rpb24gaGFzaChlMTEsIHIxMSkge1xuICAgIHJldHVybiAoKChyMTEgPDwgMiBeIGNoYXJhdChlMTEsIDApKSA8PCAyIF4gY2hhcmF0KGUxMSwgMSkpIDw8IDIgXiBjaGFyYXQoZTExLCAyKSkgPDwgMiBeIGNoYXJhdChlMTEsIDMpO1xufVxuZnVuY3Rpb24gdHJpbShlMjEpIHtcbiAgICByZXR1cm4gZTIxLnRyaW0oKTtcbn1cbmZ1bmN0aW9uIG1hdGNoKGUzLCByMikge1xuICAgIHJldHVybiAoZTMgPSByMi5leGVjKGUzKSkgPyBlM1swXSA6IGUzO1xufVxuZnVuY3Rpb24gcmVwbGFjZShlNCwgcjMsIGExMSkge1xuICAgIHJldHVybiBlNC5yZXBsYWNlKHIzLCBhMTEpO1xufVxuZnVuY3Rpb24gaW5kZXhvZihlNSwgcjQpIHtcbiAgICByZXR1cm4gZTUuaW5kZXhPZihyNCk7XG59XG5mdW5jdGlvbiBjaGFyYXQoZTYsIHI1KSB7XG4gICAgcmV0dXJuIDAgfCBlNi5jaGFyQ29kZUF0KHI1KTtcbn1cbmZ1bmN0aW9uIHN1YnN0cihlNywgcjYsIGEyKSB7XG4gICAgcmV0dXJuIGU3LnNsaWNlKHI2LCBhMik7XG59XG5mdW5jdGlvbiBzdHJsZW4oZTgpIHtcbiAgICByZXR1cm4gZTgubGVuZ3RoO1xufVxuZnVuY3Rpb24gc2l6ZW9mKGU5KSB7XG4gICAgcmV0dXJuIGU5Lmxlbmd0aDtcbn1cbmZ1bmN0aW9uIGFwcGVuZChlMTAsIHI3KSB7XG4gICAgcmV0dXJuIHI3LnB1c2goZTEwKSwgZTEwO1xufVxuZnVuY3Rpb24gY29tYmluZShlMTEsIHI4KSB7XG4gICAgcmV0dXJuIGUxMS5tYXAocjgpLmpvaW4oXCJcIik7XG59XG52YXIgJCA9IDE7XG52YXIgZyA9IDE7XG52YXIgeiA9IDA7XG52YXIgeSA9IDA7XG52YXIgaiA9IDA7XG52YXIgQyA9IFwiXCI7XG5mdW5jdGlvbiBub2RlKGUxMiwgcjksIGEzLCBjMTEsIHQxMSwgbjExLCBzMSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiBlMTIsXG4gICAgICAgIHJvb3Q6IHI5LFxuICAgICAgICBwYXJlbnQ6IGEzLFxuICAgICAgICB0eXBlOiBjMTEsXG4gICAgICAgIHByb3BzOiB0MTEsXG4gICAgICAgIGNoaWxkcmVuOiBuMTEsXG4gICAgICAgIGxpbmU6ICQsXG4gICAgICAgIGNvbHVtbjogZyxcbiAgICAgICAgbGVuZ3RoOiBzMSxcbiAgICAgICAgcmV0dXJuOiBcIlwiXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNvcHkoZTEzLCByMTApIHtcbiAgICByZXR1cm4geDEobm9kZShcIlwiLCBudWxsLCBudWxsLCBcIlwiLCBudWxsLCBudWxsLCAwKSwgZTEzLCB7XG4gICAgICAgIGxlbmd0aDogLWUxMy5sZW5ndGhcbiAgICB9LCByMTApO1xufVxuZnVuY3Rpb24gX19jaGFyKCkge1xuICAgIHJldHVybiBqO1xufVxuZnVuY3Rpb24gcHJldigpIHtcbiAgICBqID0geSA+IDAgPyBjaGFyYXQoQywgLS15KSA6IDA7XG4gICAgKGctLSwgMTAgPT09IGopICYmIChnID0gMSwgJC0tKTtcbiAgICByZXR1cm4gajtcbn1cbmZ1bmN0aW9uIG5leHQoKSB7XG4gICAgaiA9IHkgPCB6ID8gY2hhcmF0KEMsIHkrKykgOiAwO1xuICAgIChnKyssIDEwID09PSBqKSAmJiAoZyA9IDEsICQrKyk7XG4gICAgcmV0dXJuIGo7XG59XG5mdW5jdGlvbiBwZWVrKCkge1xuICAgIHJldHVybiBjaGFyYXQoQywgeSk7XG59XG5mdW5jdGlvbiBjYXJldCgpIHtcbiAgICByZXR1cm4geTtcbn1cbmZ1bmN0aW9uIHNsaWNlKGUxNCwgcjExKSB7XG4gICAgcmV0dXJuIHN1YnN0cihDLCBlMTQsIHIxMSk7XG59XG5mdW5jdGlvbiB0b2tlbihlMTUpIHtcbiAgICBzd2l0Y2goZTE1KXtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICBjYXNlIDk6XG4gICAgICAgIGNhc2UgMTA6XG4gICAgICAgIGNhc2UgMTM6XG4gICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgICByZXR1cm4gNTtcbiAgICAgICAgY2FzZSAzMzpcbiAgICAgICAgY2FzZSA0MzpcbiAgICAgICAgY2FzZSA0NDpcbiAgICAgICAgY2FzZSA0NzpcbiAgICAgICAgY2FzZSA2MjpcbiAgICAgICAgY2FzZSA2NDpcbiAgICAgICAgY2FzZSAxMjY6XG4gICAgICAgIGNhc2UgNTk6XG4gICAgICAgIGNhc2UgMTIzOlxuICAgICAgICBjYXNlIDEyNTpcbiAgICAgICAgICAgIHJldHVybiA0O1xuICAgICAgICBjYXNlIDU4OlxuICAgICAgICAgICAgcmV0dXJuIDM7XG4gICAgICAgIGNhc2UgMzQ6XG4gICAgICAgIGNhc2UgMzk6XG4gICAgICAgIGNhc2UgNDA6XG4gICAgICAgIGNhc2UgOTE6XG4gICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgY2FzZSA0MTpcbiAgICAgICAgY2FzZSA5MzpcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICByZXR1cm4gMDtcbn1cbmZ1bmN0aW9uIGFsbG9jKGUxNikge1xuICAgIHJldHVybiAkID0gZyA9IDEsIHogPSBzdHJsZW4oQyA9IGUxNiksIHkgPSAwLCBbXTtcbn1cbmZ1bmN0aW9uIGRlYWxsb2MoZTE3KSB7XG4gICAgcmV0dXJuIEMgPSBcIlwiLCBlMTc7XG59XG5mdW5jdGlvbiBkZWxpbWl0KGUxOCkge1xuICAgIHJldHVybiB0cmltKHNsaWNlKHkgLSAxLCBkZWxpbWl0ZXIoOTEgPT09IGUxOCA/IGUxOCArIDIgOiA0MCA9PT0gZTE4ID8gZTE4ICsgMSA6IGUxOCkpKTtcbn1cbmZ1bmN0aW9uIHdoaXRlc3BhY2UoZTIwKSB7XG4gICAgd2hpbGUoaiA9IHBlZWsoKSl7XG4gICAgICAgIGlmICghKGogPCAzMykpIGJyZWFrO1xuICAgICAgICBuZXh0KCk7XG4gICAgfVxuICAgIHJldHVybiB0b2tlbihlMjApID4gMiB8fCB0b2tlbihqKSA+IDMgPyBcIlwiIDogXCIgXCI7XG59XG5mdW5jdGlvbiBlc2NhcGluZyhlMjIsIHIxMikge1xuICAgIHdoaWxlKC0tcjEyICYmIG5leHQoKSlpZiAoaiA8IDQ4IHx8IGogPiAxMDIgfHwgaiA+IDU3ICYmIGogPCA2NSB8fCBqID4gNzAgJiYgaiA8IDk3KSBicmVhaztcbiAgICByZXR1cm4gc2xpY2UoZTIyLCBjYXJldCgpICsgKHIxMiA8IDYgJiYgMzIgPT0gcGVlaygpICYmIDMyID09IG5leHQoKSkpO1xufVxuZnVuY3Rpb24gZGVsaW1pdGVyKGUyMykge1xuICAgIHdoaWxlKG5leHQoKSlzd2l0Y2goail7XG4gICAgICAgIGNhc2UgZTIzOlxuICAgICAgICAgICAgcmV0dXJuIHk7XG4gICAgICAgIGNhc2UgMzQ6XG4gICAgICAgIGNhc2UgMzk6XG4gICAgICAgICAgICAzNCAhPT0gZTIzICYmIDM5ICE9PSBlMjMgJiYgZGVsaW1pdGVyKGopO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICA0MSA9PT0gZTIzICYmIGRlbGltaXRlcihlMjMpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgOTI6XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHk7XG59XG5mdW5jdGlvbiBjb21tZW50ZXIoZTI0LCByMTMpIHtcbiAgICB3aGlsZShuZXh0KCkpe1xuICAgICAgICBpZiAoZTI0ICsgaiA9PT0gNTcpIGJyZWFrO1xuICAgICAgICBpZiAoZTI0ICsgaiA9PT0gODQgJiYgNDcgPT09IHBlZWsoKSkgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBcIi8qXCIgKyBzbGljZShyMTMsIHkgLSAxKSArIFwiKlwiICsgdyg0NyA9PT0gZTI0ID8gZTI0IDogbmV4dCgpKTtcbn1cbmZ1bmN0aW9uIGlkZW50aWZpZXIoZTI1KSB7XG4gICAgd2hpbGUoIXRva2VuKHBlZWsoKSkpbmV4dCgpO1xuICAgIHJldHVybiBzbGljZShlMjUsIHkpO1xufVxuZnVuY3Rpb24gY29tcGlsZShlMjYpIHtcbiAgICByZXR1cm4gZGVhbGxvYyhwYXJzZShcIlwiLCBudWxsLCBudWxsLCBudWxsLCBbXG4gICAgICAgIFwiXCJcbiAgICBdLCBlMjYgPSBhbGxvYyhlMjYpLCAwLCBbXG4gICAgICAgIDBcbiAgICBdLCBlMjYpKTtcbn1cbmZ1bmN0aW9uIHBhcnNlKGUyNywgcjE0LCBhNCwgYzIsIHQyLCBuMiwgczIsIGkxLCB1MSkge1xuICAgIHZhciBsMSA9IDA7XG4gICAgdmFyIG8xID0gMDtcbiAgICB2YXIgcDEgPSBzMjtcbiAgICB2YXIgZjEgPSAwO1xuICAgIHZhciBoMSA9IDA7XG4gICAgdmFyIHYxID0gMDtcbiAgICB2YXIgZDEgPSAxO1xuICAgIHZhciBtMSA9IDE7XG4gICAgdmFyIGIxID0gMTtcbiAgICB2YXIgazEgPSAwO1xuICAgIHZhciB4MTEgPSBcIlwiO1xuICAgIHZhciAkMSA9IHQyO1xuICAgIHZhciBnMSA9IG4yO1xuICAgIHZhciB6MSA9IGMyO1xuICAgIHZhciB5MSA9IHgxMTtcbiAgICB3aGlsZShtMSlzd2l0Y2godjEgPSBrMSwgazEgPSBuZXh0KCkpe1xuICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgaWYgKDEwOCAhPSB2MSAmJiA1OCA9PSB5MS5jaGFyQ29kZUF0KHAxIC0gMSkpIHtcbiAgICAgICAgICAgICAgICAtMSAhPSBpbmRleG9mKHkxICs9IHJlcGxhY2UoZGVsaW1pdChrMSksIFwiJlwiLCBcIiZcXGZcIiksIFwiJlxcZlwiKSAmJiAoYjEgPSAtMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIGNhc2UgMzQ6XG4gICAgICAgIGNhc2UgMzk6XG4gICAgICAgIGNhc2UgOTE6XG4gICAgICAgICAgICB5MSArPSBkZWxpbWl0KGsxKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDk6XG4gICAgICAgIGNhc2UgMTA6XG4gICAgICAgIGNhc2UgMTM6XG4gICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgICB5MSArPSB3aGl0ZXNwYWNlKHYxKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDkyOlxuICAgICAgICAgICAgeTEgKz0gZXNjYXBpbmcoY2FyZXQoKSAtIDEsIDcpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIGNhc2UgNDc6XG4gICAgICAgICAgICBzd2l0Y2gocGVlaygpKXtcbiAgICAgICAgICAgICAgICBjYXNlIDQyOlxuICAgICAgICAgICAgICAgIGNhc2UgNDc6XG4gICAgICAgICAgICAgICAgICAgIGFwcGVuZChjb21tZW50KGNvbW1lbnRlcihuZXh0KCksIGNhcmV0KCkpLCByMTQsIGE0KSwgdTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB5MSArPSBcIi9cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDEyMyAqIGQxOlxuICAgICAgICAgICAgaTFbbDErK10gPSBzdHJsZW4oeTEpICogYjE7XG4gICAgICAgIGNhc2UgMTI1ICogZDE6XG4gICAgICAgIGNhc2UgNTk6XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHN3aXRjaChrMSl7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGNhc2UgMTI1OlxuICAgICAgICAgICAgICAgICAgICBtMSA9IDA7XG4gICAgICAgICAgICAgICAgY2FzZSA1OSArIG8xOlxuICAgICAgICAgICAgICAgICAgICBoMSA+IDAgJiYgc3RybGVuKHkxKSAtIHAxICYmIGFwcGVuZChoMSA+IDMyID8gZGVjbGFyYXRpb24oeTEgKyBcIjtcIiwgYzIsIGE0LCBwMSAtIDEpIDogZGVjbGFyYXRpb24ocmVwbGFjZSh5MSwgXCIgXCIsIFwiXCIpICsgXCI7XCIsIGMyLCBhNCwgcDEgLSAyKSwgdTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDU5OlxuICAgICAgICAgICAgICAgICAgICB5MSArPSBcIjtcIjtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBhcHBlbmQoejEgPSBydWxlc2V0KHkxLCByMTQsIGE0LCBsMSwgbzEsIHQyLCBpMSwgeDExLCAkMSA9IFtdLCBnMSA9IFtdLCBwMSksIG4yKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKDEyMyA9PT0gazEpIGlmICgwID09PSBvMSkgcGFyc2UoeTEsIHIxNCwgejEsIHoxLCAkMSwgbjIsIHAxLCBpMSwgZzEpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHN3aXRjaChmMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEwMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTA5OlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2UoZTI3LCB6MSwgejEsIGMyICYmIGFwcGVuZChydWxlc2V0KGUyNywgejEsIHoxLCAwLCAwLCB0MiwgaTEsIHgxMSwgdDIsICQxID0gW10sIHAxKSwgZzEpLCB0MiwgZzEsIHAxLCBpMSwgYzIgPyAkMSA6IGcxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2UoeTEsIHoxLCB6MSwgejEsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sIGcxLCAwLCBpMSwgZzEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsMSA9IG8xID0gaDEgPSAwLCBkMSA9IGIxID0gMSwgeDExID0geTEgPSBcIlwiLCBwMSA9IHMyO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNTg6XG4gICAgICAgICAgICBwMSA9IDEgKyBzdHJsZW4oeTEpLCBoMSA9IHYxO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgaWYgKGQxIDwgMSkge1xuICAgICAgICAgICAgICAgIGlmICgxMjMgPT0gazEpIC0tZDE7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoMTI1ID09IGsxICYmIDAgPT0gZDErKyAmJiAxMjUgPT0gcHJldigpKSBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCh5MSArPSB3KGsxKSwgazEgKiBkMSl7XG4gICAgICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgICAgICAgICAgYjEgPSBvMSA+IDAgPyAxIDogKHkxICs9IFwiXFxmXCIsIC0xKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0NDpcbiAgICAgICAgICAgICAgICAgICAgaTFbbDErK10gPSAoc3RybGVuKHkxKSAtIDEpICogYjEsIGIxID0gMTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA2NDpcbiAgICAgICAgICAgICAgICAgICAgNDUgPT09IHBlZWsoKSAmJiAoeTEgKz0gZGVsaW1pdChuZXh0KCkpKTtcbiAgICAgICAgICAgICAgICAgICAgZjEgPSBwZWVrKCksIG8xID0gcDEgPSBzdHJsZW4oeDExID0geTEgKz0gaWRlbnRpZmllcihjYXJldCgpKSksIGsxKys7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDU6XG4gICAgICAgICAgICAgICAgICAgIDQ1ID09PSB2MSAmJiAyID09IHN0cmxlbih5MSkgJiYgKGQxID0gMCk7XG4gICAgICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuMjtcbn1cbmZ1bmN0aW9uIHJ1bGVzZXQoZTI4LCByMTUsIGE1LCBjMzEsIG4zLCBzMywgaTIsIHUyLCBsMjEsIG8yLCBwMikge1xuICAgIHZhciBmMiA9IG4zIC0gMTtcbiAgICB2YXIgaDIgPSAwID09PSBuMyA/IHMzIDogW1xuICAgICAgICBcIlwiXG4gICAgXTtcbiAgICB2YXIgdjIgPSBzaXplb2YoaDIpO1xuICAgIGZvcih2YXIgZDIgPSAwLCBtMiA9IDAsIGIyID0gMDsgZDIgPCBjMzE7ICsrZDIpZm9yKHZhciB3MSA9IDAsIHgyID0gc3Vic3RyKGUyOCwgZjIgKyAxLCBmMiA9IGsobTIgPSBpMltkMl0pKSwgJDIgPSBlMjg7IHcxIDwgdjI7ICsrdzEpKCQyID0gdHJpbShtMiA+IDAgPyBoMlt3MV0gKyBcIiBcIiArIHgyIDogcmVwbGFjZSh4MiwgLyZcXGYvZywgaDJbdzFdKSkpICYmIChsMjFbYjIrK10gPSAkMik7XG4gICAgcmV0dXJuIG5vZGUoZTI4LCByMTUsIGE1LCAwID09PSBuMyA/IHQxIDogdTIsIGwyMSwgbzIsIHAyKTtcbn1cbmZ1bmN0aW9uIGNvbW1lbnQoZTI5LCByMTYsIGE2KSB7XG4gICAgcmV0dXJuIG5vZGUoZTI5LCByMTYsIGE2LCBjMSwgdyhfX2NoYXIoKSksIHN1YnN0cihlMjksIDIsIC0yKSwgMCk7XG59XG5mdW5jdGlvbiBkZWNsYXJhdGlvbihlMzAsIHIxNywgYTcsIGM0KSB7XG4gICAgcmV0dXJuIG5vZGUoZTMwLCByMTcsIGE3LCBuMSwgc3Vic3RyKGUzMCwgMCwgYzQpLCBzdWJzdHIoZTMwLCBjNCArIDEsIC0xKSwgYzQpO1xufVxuZnVuY3Rpb24gcHJlZml4KGM1LCB0Mykge1xuICAgIHN3aXRjaChoYXNoKGM1LCB0Mykpe1xuICAgICAgICBjYXNlIDUxMDM6XG4gICAgICAgICAgICByZXR1cm4gYTEgKyBcInByaW50LVwiICsgYzUgKyBjNTtcbiAgICAgICAgY2FzZSA1NzM3OlxuICAgICAgICBjYXNlIDQyMDE6XG4gICAgICAgIGNhc2UgMzE3NzpcbiAgICAgICAgY2FzZSAzNDMzOlxuICAgICAgICBjYXNlIDE2NDE6XG4gICAgICAgIGNhc2UgNDQ1NzpcbiAgICAgICAgY2FzZSAyOTIxOlxuICAgICAgICBjYXNlIDU1NzI6XG4gICAgICAgIGNhc2UgNjM1NjpcbiAgICAgICAgY2FzZSA1ODQ0OlxuICAgICAgICBjYXNlIDMxOTE6XG4gICAgICAgIGNhc2UgNjY0NTpcbiAgICAgICAgY2FzZSAzMDA1OlxuICAgICAgICBjYXNlIDYzOTE6XG4gICAgICAgIGNhc2UgNTg3OTpcbiAgICAgICAgY2FzZSA1NjIzOlxuICAgICAgICBjYXNlIDYxMzU6XG4gICAgICAgIGNhc2UgNDU5OTpcbiAgICAgICAgY2FzZSA0ODU1OlxuICAgICAgICBjYXNlIDQyMTU6XG4gICAgICAgIGNhc2UgNjM4OTpcbiAgICAgICAgY2FzZSA1MTA5OlxuICAgICAgICBjYXNlIDUzNjU6XG4gICAgICAgIGNhc2UgNTYyMTpcbiAgICAgICAgY2FzZSAzODI5OlxuICAgICAgICAgICAgcmV0dXJuIGExICsgYzUgKyBjNTtcbiAgICAgICAgY2FzZSA1MzQ5OlxuICAgICAgICBjYXNlIDQyNDY6XG4gICAgICAgIGNhc2UgNDgxMDpcbiAgICAgICAgY2FzZSA2OTY4OlxuICAgICAgICBjYXNlIDI3NTY6XG4gICAgICAgICAgICByZXR1cm4gYTEgKyBjNSArIHIxICsgYzUgKyBlMiArIGM1ICsgYzU7XG4gICAgICAgIGNhc2UgNjgyODpcbiAgICAgICAgY2FzZSA0MjY4OlxuICAgICAgICAgICAgcmV0dXJuIGExICsgYzUgKyBlMiArIGM1ICsgYzU7XG4gICAgICAgIGNhc2UgNjE2NTpcbiAgICAgICAgICAgIHJldHVybiBhMSArIGM1ICsgZTIgKyBcImZsZXgtXCIgKyBjNSArIGM1O1xuICAgICAgICBjYXNlIDUxODc6XG4gICAgICAgICAgICByZXR1cm4gYTEgKyBjNSArIHJlcGxhY2UoYzUsIC8oXFx3KykuKyg6W15dKykvLCBhMSArIFwiYm94LSQxJDJcIiArIGUyICsgXCJmbGV4LSQxJDJcIikgKyBjNTtcbiAgICAgICAgY2FzZSA1NDQzOlxuICAgICAgICAgICAgcmV0dXJuIGExICsgYzUgKyBlMiArIFwiZmxleC1pdGVtLVwiICsgcmVwbGFjZShjNSwgL2ZsZXgtfC1zZWxmLywgXCJcIikgKyBjNTtcbiAgICAgICAgY2FzZSA0Njc1OlxuICAgICAgICAgICAgcmV0dXJuIGExICsgYzUgKyBlMiArIFwiZmxleC1saW5lLXBhY2tcIiArIHJlcGxhY2UoYzUsIC9hbGlnbi1jb250ZW50fGZsZXgtfC1zZWxmLywgXCJcIikgKyBjNTtcbiAgICAgICAgY2FzZSA1NTQ4OlxuICAgICAgICAgICAgcmV0dXJuIGExICsgYzUgKyBlMiArIHJlcGxhY2UoYzUsIFwic2hyaW5rXCIsIFwibmVnYXRpdmVcIikgKyBjNTtcbiAgICAgICAgY2FzZSA1MjkyOlxuICAgICAgICAgICAgcmV0dXJuIGExICsgYzUgKyBlMiArIHJlcGxhY2UoYzUsIFwiYmFzaXNcIiwgXCJwcmVmZXJyZWQtc2l6ZVwiKSArIGM1O1xuICAgICAgICBjYXNlIDYwNjA6XG4gICAgICAgICAgICByZXR1cm4gYTEgKyBcImJveC1cIiArIHJlcGxhY2UoYzUsIFwiLWdyb3dcIiwgXCJcIikgKyBhMSArIGM1ICsgZTIgKyByZXBsYWNlKGM1LCBcImdyb3dcIiwgXCJwb3NpdGl2ZVwiKSArIGM1O1xuICAgICAgICBjYXNlIDQ1NTQ6XG4gICAgICAgICAgICByZXR1cm4gYTEgKyByZXBsYWNlKGM1LCAvKFteLV0pKHRyYW5zZm9ybSkvZywgXCIkMVwiICsgYTEgKyBcIiQyXCIpICsgYzU7XG4gICAgICAgIGNhc2UgNjE4NzpcbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlKHJlcGxhY2UocmVwbGFjZShjNSwgLyh6b29tLXxncmFiKS8sIGExICsgXCIkMVwiKSwgLyhpbWFnZS1zZXQpLywgYTEgKyBcIiQxXCIpLCBjNSwgXCJcIikgKyBjNTtcbiAgICAgICAgY2FzZSA1NDk1OlxuICAgICAgICBjYXNlIDM5NTk6XG4gICAgICAgICAgICByZXR1cm4gcmVwbGFjZShjNSwgLyhpbWFnZS1zZXRcXChbXl0qKS8sIGExICsgXCIkMSRgJDFcIik7XG4gICAgICAgIGNhc2UgNDk2ODpcbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlKHJlcGxhY2UoYzUsIC8oLis6KShmbGV4LSk/KC4qKS8sIGExICsgXCJib3gtcGFjazokM1wiICsgZTIgKyBcImZsZXgtcGFjazokM1wiKSwgL3MuKy1iW147XSsvLCBcImp1c3RpZnlcIikgKyBhMSArIGM1ICsgYzU7XG4gICAgICAgIGNhc2UgNDA5NTpcbiAgICAgICAgY2FzZSAzNTgzOlxuICAgICAgICBjYXNlIDQwNjg6XG4gICAgICAgIGNhc2UgMjUzMjpcbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlKGM1LCAvKC4rKS1pbmxpbmUoLispLywgYTEgKyBcIiQxJDJcIikgKyBjNTtcbiAgICAgICAgY2FzZSA4MTE2OlxuICAgICAgICBjYXNlIDcwNTk6XG4gICAgICAgIGNhc2UgNTc1MzpcbiAgICAgICAgY2FzZSA1NTM1OlxuICAgICAgICBjYXNlIDU0NDU6XG4gICAgICAgIGNhc2UgNTcwMTpcbiAgICAgICAgY2FzZSA0OTMzOlxuICAgICAgICBjYXNlIDQ2Nzc6XG4gICAgICAgIGNhc2UgNTUzMzpcbiAgICAgICAgY2FzZSA1Nzg5OlxuICAgICAgICBjYXNlIDUwMjE6XG4gICAgICAgIGNhc2UgNDc2NTpcbiAgICAgICAgICAgIGlmIChzdHJsZW4oYzUpIC0gMSAtIHQzID4gNikgc3dpdGNoKGNoYXJhdChjNSwgdDMgKyAxKSl7XG4gICAgICAgICAgICAgICAgY2FzZSAxMDk6XG4gICAgICAgICAgICAgICAgICAgIGlmICg0NSAhPT0gY2hhcmF0KGM1LCB0MyArIDQpKSBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDEwMjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2UoYzUsIC8oLis6KSguKyktKFteXSspLywgXCIkMVwiICsgYTEgKyBcIiQyLSQzJDFcIiArIHIxICsgKDEwOCA9PSBjaGFyYXQoYzUsIHQzICsgMykgPyBcIiQzXCIgOiBcIiQyLSQzXCIpKSArIGM1O1xuICAgICAgICAgICAgICAgIGNhc2UgMTE1OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gfmluZGV4b2YoYzUsIFwic3RyZXRjaFwiKSA/IHByZWZpeChyZXBsYWNlKGM1LCBcInN0cmV0Y2hcIiwgXCJmaWxsLWF2YWlsYWJsZVwiKSwgdDMpICsgYzUgOiBjNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQ5NDk6XG4gICAgICAgICAgICBpZiAoMTE1ICE9PSBjaGFyYXQoYzUsIHQzICsgMSkpIGJyZWFrO1xuICAgICAgICBjYXNlIDY0NDQ6XG4gICAgICAgICAgICBzd2l0Y2goY2hhcmF0KGM1LCBzdHJsZW4oYzUpIC0gMyAtICh+aW5kZXhvZihjNSwgXCIhaW1wb3J0YW50XCIpICYmIDEwKSkpe1xuICAgICAgICAgICAgICAgIGNhc2UgMTA3OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVwbGFjZShjNSwgXCI6XCIsIFwiOlwiICsgYTEpICsgYzU7XG4gICAgICAgICAgICAgICAgY2FzZSAxMDE6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXBsYWNlKGM1LCAvKC4rOikoW147IV0rKSg7fCEuKyk/LywgXCIkMVwiICsgYTEgKyAoNDUgPT09IGNoYXJhdChjNSwgMTQpID8gXCJpbmxpbmUtXCIgOiBcIlwiKSArIFwiYm94JDMkMVwiICsgYTEgKyBcIiQyJDMkMVwiICsgZTIgKyBcIiQyYm94JDNcIikgKyBjNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDU5MzY6XG4gICAgICAgICAgICBzd2l0Y2goY2hhcmF0KGM1LCB0MyArIDExKSl7XG4gICAgICAgICAgICAgICAgY2FzZSAxMTQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhMSArIGM1ICsgZTIgKyByZXBsYWNlKGM1LCAvW3N2aF1cXHcrLVt0YmxyXXsyfS8sIFwidGJcIikgKyBjNTtcbiAgICAgICAgICAgICAgICBjYXNlIDEwODpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGExICsgYzUgKyBlMiArIHJlcGxhY2UoYzUsIC9bc3ZoXVxcdystW3RibHJdezJ9LywgXCJ0Yi1ybFwiKSArIGM1O1xuICAgICAgICAgICAgICAgIGNhc2UgNDU6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhMSArIGM1ICsgZTIgKyByZXBsYWNlKGM1LCAvW3N2aF1cXHcrLVt0YmxyXXsyfS8sIFwibHJcIikgKyBjNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhMSArIGM1ICsgZTIgKyBjNSArIGM1O1xuICAgIH1cbiAgICByZXR1cm4gYzU7XG59XG5mdW5jdGlvbiBzZXJpYWxpemUoZTMxLCByMTgpIHtcbiAgICB2YXIgYTggPSBcIlwiO1xuICAgIHZhciBjNiA9IHNpemVvZihlMzEpO1xuICAgIGZvcih2YXIgdDQgPSAwOyB0NCA8IGM2OyB0NCsrKWE4ICs9IHIxOChlMzFbdDRdLCB0NCwgZTMxLCByMTgpIHx8IFwiXCI7XG4gICAgcmV0dXJuIGE4O1xufVxuZnVuY3Rpb24gc3RyaW5naWZ5KGUzMiwgciwgYTksIHM0KSB7XG4gICAgc3dpdGNoKGUzMi50eXBlKXtcbiAgICAgICAgY2FzZSB1OlxuICAgICAgICBjYXNlIG4xOlxuICAgICAgICAgICAgcmV0dXJuIGUzMi5yZXR1cm4gPSBlMzIucmV0dXJuIHx8IGUzMi52YWx1ZTtcbiAgICAgICAgY2FzZSBjMTpcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICBjYXNlIHY6XG4gICAgICAgICAgICByZXR1cm4gZTMyLnJldHVybiA9IGUzMi52YWx1ZSArIFwie1wiICsgc2VyaWFsaXplKGUzMi5jaGlsZHJlbiwgczQpICsgXCJ9XCI7XG4gICAgICAgIGNhc2UgdDE6XG4gICAgICAgICAgICBlMzIudmFsdWUgPSBlMzIucHJvcHMuam9pbihcIixcIik7XG4gICAgfVxuICAgIHJldHVybiBzdHJsZW4oYTkgPSBzZXJpYWxpemUoZTMyLmNoaWxkcmVuLCBzNCkpID8gZTMyLnJldHVybiA9IGUzMi52YWx1ZSArIFwie1wiICsgYTkgKyBcIn1cIiA6IFwiXCI7XG59XG5mdW5jdGlvbiBtaWRkbGV3YXJlKGUzMykge1xuICAgIHZhciByMTkgPSBzaXplb2YoZTMzKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oYTEwLCBjNywgdDUsIG40KSB7XG4gICAgICAgIHZhciBzNSA9IFwiXCI7XG4gICAgICAgIGZvcih2YXIgaTMgPSAwOyBpMyA8IHIxOTsgaTMrKylzNSArPSBlMzNbaTNdKGExMCwgYzcsIHQ1LCBuNCkgfHwgXCJcIjtcbiAgICAgICAgcmV0dXJuIHM1O1xuICAgIH07XG59XG5mdW5jdGlvbiBydWxlc2hlZXQoZTM0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHIyMCkge1xuICAgICAgICByMjAucm9vdCB8fCAocjIwID0gcjIwLnJldHVybikgJiYgZTM0KHIyMCk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHByZWZpeGVyKGM4LCBzLCBpLCB1Mykge1xuICAgIGlmIChjOC5sZW5ndGggPiAtMSAmJiAhYzgucmV0dXJuKSBzd2l0Y2goYzgudHlwZSl7XG4gICAgICAgIGNhc2UgbjE6XG4gICAgICAgICAgICBjOC5yZXR1cm4gPSBwcmVmaXgoYzgudmFsdWUsIGM4Lmxlbmd0aCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB2OlxuICAgICAgICAgICAgcmV0dXJuIHNlcmlhbGl6ZShbXG4gICAgICAgICAgICAgICAgY29weShjOCwge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVwbGFjZShjOC52YWx1ZSwgXCJAXCIsIFwiQFwiICsgYTEpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sIHUzKTtcbiAgICAgICAgY2FzZSB0MTpcbiAgICAgICAgICAgIGlmIChjOC5sZW5ndGgpIHJldHVybiBjb21iaW5lKGM4LnByb3BzLCBmdW5jdGlvbih0Nikge1xuICAgICAgICAgICAgICAgIHN3aXRjaChtYXRjaCh0NiwgLyg6OnBsYWNcXHcrfDpyZWFkLVxcdyspLykpe1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiOnJlYWQtb25seVwiOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiOnJlYWQtd3JpdGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXJpYWxpemUoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvcHkoYzgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2UodDYsIC86KHJlYWQtXFx3KykvLCBcIjpcIiArIHIxICsgXCIkMVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sIHUzKTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIjo6cGxhY2Vob2xkZXJcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXJpYWxpemUoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvcHkoYzgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2UodDYsIC86KHBsYWNcXHcrKS8sIFwiOlwiICsgYTEgKyBcImlucHV0LSQxXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3B5KGM4LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHQ2LCAvOihwbGFjXFx3KykvLCBcIjpcIiArIHIxICsgXCIkMVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29weShjOCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZSh0NiwgLzoocGxhY1xcdyspLywgZTIgKyBcImlucHV0LSQxXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgXSwgdTMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cbnZhciB5MSA9IGZ1bmN0aW9uIGxhc3QoZTEyKSB7XG4gICAgcmV0dXJuIGUxMi5sZW5ndGggPyBlMTJbZTEyLmxlbmd0aCAtIDFdIDogbnVsbDtcbn07XG52YXIgZzEgPSBmdW5jdGlvbiBpZGVudGlmaWVyV2l0aFBvaW50VHJhY2tpbmcoZTIyLCBpMSwgczEpIHtcbiAgICB2YXIgdTEgPSAwO1xuICAgIHZhciBsMSA9IDA7XG4gICAgd2hpbGUodHJ1ZSl7XG4gICAgICAgIHUxID0gbDE7XG4gICAgICAgIGwxID0gcGVlaygpO1xuICAgICAgICAzOCA9PT0gdTEgJiYgMTIgPT09IGwxICYmIChpMVtzMV0gPSAxKTtcbiAgICAgICAgaWYgKHRva2VuKGwxKSkgYnJlYWs7XG4gICAgICAgIG5leHQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNsaWNlKGUyMiwgeSk7XG59O1xudmFyIGI0ID0gZnVuY3Rpb24gdG9SdWxlcyhlMywgbzEpIHtcbiAgICB2YXIgdTIgPSAtMTtcbiAgICB2YXIgbDIyID0gNDQ7XG4gICAgZG8ge1xuICAgICAgICBzd2l0Y2godG9rZW4obDIyKSl7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgMzggPT09IGwyMiAmJiAxMiA9PT0gcGVlaygpICYmIChvMVt1Ml0gPSAxKTtcbiAgICAgICAgICAgICAgICBlM1t1Ml0gKz0gZzEoeSAtIDEsIG8xLCB1Mik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgZTNbdTJdICs9IGRlbGltaXQobDIyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICBpZiAoNDQgPT09IGwyMikge1xuICAgICAgICAgICAgICAgICAgICBlM1srK3UyXSA9IDU4ID09PSBwZWVrKCkgPyBcIiZcXGZcIiA6IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIG8xW3UyXSA9IGUzW3UyXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgZTNbdTJdICs9IHcobDIyKTtcbiAgICAgICAgfVxuICAgIH13aGlsZSAobDIyID0gbmV4dCgpKVxuICAgIHJldHVybiBlMztcbn07XG52YXIgdzEgPSBmdW5jdGlvbiBnZXRSdWxlcyhlNCwgcjEyKSB7XG4gICAgcmV0dXJuIGRlYWxsb2MoYjQoYWxsb2MoZTQpLCByMTIpKTtcbn07XG52YXIgRSA9IG5ldyBXZWFrTWFwO1xudmFyIGsxID0gZnVuY3Rpb24gY29tcGF0KGU1KSB7XG4gICAgaWYgKFwicnVsZVwiID09PSBlNS50eXBlICYmIGU1LnBhcmVudCAmJiAhKGU1Lmxlbmd0aCA8IDEpKSB7XG4gICAgICAgIHZhciByMiA9IGU1LnZhbHVlLCB0MTIgPSBlNS5wYXJlbnQ7XG4gICAgICAgIHZhciBuMTIgPSBlNS5jb2x1bW4gPT09IHQxMi5jb2x1bW4gJiYgZTUubGluZSA9PT0gdDEyLmxpbmU7XG4gICAgICAgIHdoaWxlKFwicnVsZVwiICE9PSB0MTIudHlwZSl7XG4gICAgICAgICAgICB0MTIgPSB0MTIucGFyZW50O1xuICAgICAgICAgICAgaWYgKCF0MTIpIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKDEgIT09IGU1LnByb3BzLmxlbmd0aCB8fCA1OCA9PT0gcjIuY2hhckNvZGVBdCgwKSB8fCBFLmdldCh0MTIpKSAmJiAhbjEyKSB7XG4gICAgICAgICAgICBFLnNldChlNSwgdHJ1ZSk7XG4gICAgICAgICAgICB2YXIgbzIgPSBbXTtcbiAgICAgICAgICAgIHZhciBhMTIgPSB3MShyMiwgbzIpO1xuICAgICAgICAgICAgdmFyIGkyID0gdDEyLnByb3BzO1xuICAgICAgICAgICAgZm9yKHZhciBzMiA9IDAsIHUzID0gMDsgczIgPCBhMTIubGVuZ3RoOyBzMisrKWZvcih2YXIgbDMgPSAwOyBsMyA8IGkyLmxlbmd0aDsgbDMrKywgdTMrKyllNS5wcm9wc1t1M10gPSBvMltzMl0gPyBhMTJbczJdLnJlcGxhY2UoLyZcXGYvZywgaTJbbDNdKSA6IGkyW2wzXSArIFwiIFwiICsgYTEyW3MyXTtcbiAgICAgICAgfVxuICAgIH1cbn07XG52YXIgQSA9IGZ1bmN0aW9uIHJlbW92ZUxhYmVsKGU2KSB7XG4gICAgaWYgKFwiZGVjbFwiID09PSBlNi50eXBlKSB7XG4gICAgICAgIHZhciByMyA9IGU2LnZhbHVlO1xuICAgICAgICBpZiAoMTA4ID09PSByMy5jaGFyQ29kZUF0KDApICYmIDk4ID09PSByMy5jaGFyQ29kZUF0KDIpKSB7XG4gICAgICAgICAgICBlNi5yZXR1cm4gPSBcIlwiO1xuICAgICAgICAgICAgZTYudmFsdWUgPSBcIlwiO1xuICAgICAgICB9XG4gICAgfVxufTtcbnZhciBOID0gXCJlbW90aW9uLWRpc2FibGUtc2VydmVyLXJlbmRlcmluZy11bnNhZmUtc2VsZWN0b3Itd2FybmluZy1wbGVhc2UtZG8tbm90LXVzZS10aGlzLXRoZS13YXJuaW5nLWV4aXN0cy1mb3ItYS1yZWFzb25cIjtcbnZhciBDMSA9IGZ1bmN0aW9uIGlzSWdub3JpbmdDb21tZW50KGU3KSB7XG4gICAgcmV0dXJuICEhZTcgJiYgXCJjb21tXCIgPT09IGU3LnR5cGUgJiYgZTcuY2hpbGRyZW4uaW5kZXhPZihOKSA+IC0xO1xufTtcbnZhciBQID0gZnVuY3Rpb24gY3JlYXRlVW5zYWZlU2VsZWN0b3JzQWxhcm0oZTgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24ocjQsIHQyLCBuMikge1xuICAgICAgICBpZiAoXCJydWxlXCIgPT09IHI0LnR5cGUpIHtcbiAgICAgICAgICAgIHZhciBvMyA9IHI0LnZhbHVlLm1hdGNoKC8oOmZpcnN0fDpudGh8Om50aC1sYXN0KS1jaGlsZC9nKTtcbiAgICAgICAgICAgIGlmIChvMyAmJiB0cnVlICE9PSBlOC5jb21wYXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgYTIgPSB0MiA+IDAgPyBuMlt0MiAtIDFdIDogbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoYTIgJiYgQzEoeTEoYTIuY2hpbGRyZW4pKSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIG8zLmZvckVhY2goZnVuY3Rpb24oZTkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignVGhlIHBzZXVkbyBjbGFzcyBcIicgKyBlOSArICdcIiBpcyBwb3RlbnRpYWxseSB1bnNhZmUgd2hlbiBkb2luZyBzZXJ2ZXItc2lkZSByZW5kZXJpbmcuIFRyeSBjaGFuZ2luZyBpdCB0byBcIicgKyBlOS5zcGxpdChcIi1jaGlsZFwiKVswXSArICctb2YtdHlwZVwiLicpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn07XG52YXIgTyA9IGZ1bmN0aW9uIGlzSW1wb3J0UnVsZShlMTApIHtcbiAgICByZXR1cm4gMTA1ID09PSBlMTAudHlwZS5jaGFyQ29kZUF0KDEpICYmIDY0ID09PSBlMTAudHlwZS5jaGFyQ29kZUF0KDApO1xufTtcbnZhciBEID0gZnVuY3Rpb24gaXNQcmVwZW5kZWRXaXRoUmVndWxhclJ1bGVzKGUxMSwgcjUpIHtcbiAgICBmb3IodmFyIHQzID0gZTExIC0gMTsgdDMgPj0gMDsgdDMtLSlpZiAoIU8ocjVbdDNdKSkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbnZhciBSID0gZnVuY3Rpb24gbnVsbGlmeUVsZW1lbnQoZTEyKSB7XG4gICAgZTEyLnR5cGUgPSBcIlwiO1xuICAgIGUxMi52YWx1ZSA9IFwiXCI7XG4gICAgZTEyLnJldHVybiA9IFwiXCI7XG4gICAgZTEyLmNoaWxkcmVuID0gXCJcIjtcbiAgICBlMTIucHJvcHMgPSBcIlwiO1xufTtcbnZhciBWID0gZnVuY3Rpb24gaW5jb3JyZWN0SW1wb3J0QWxhcm0oZTEzLCByNiwgdDQpIHtcbiAgICBpZiAoTyhlMTMpKSB7XG4gICAgICAgIGlmIChlMTMucGFyZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiYEBpbXBvcnRgIHJ1bGVzIGNhbid0IGJlIG5lc3RlZCBpbnNpZGUgb3RoZXIgcnVsZXMuIFBsZWFzZSBtb3ZlIGl0IHRvIHRoZSB0b3AgbGV2ZWwgYW5kIHB1dCBpdCBiZWZvcmUgcmVndWxhciBydWxlcy4gS2VlcCBpbiBtaW5kIHRoYXQgdGhleSBjYW4gb25seSBiZSB1c2VkIHdpdGhpbiBnbG9iYWwgc3R5bGVzLlwiKTtcbiAgICAgICAgICAgIFIoZTEzKTtcbiAgICAgICAgfSBlbHNlIGlmIChEKHI2LCB0NCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJgQGltcG9ydGAgcnVsZXMgY2FuJ3QgYmUgYWZ0ZXIgb3RoZXIgcnVsZXMuIFBsZWFzZSBwdXQgeW91ciBgQGltcG9ydGAgcnVsZXMgYmVmb3JlIHlvdXIgb3RoZXIgcnVsZXMuXCIpO1xuICAgICAgICAgICAgUihlMTMpO1xuICAgICAgICB9XG4gICAgfVxufTtcbnZhciBfID0gW1xuICAgIHByZWZpeGVyXG5dO1xudmFyIHEgPSBmdW5jdGlvbiBjcmVhdGVDYWNoZShyNykge1xuICAgIHZhciB0NSA9IHI3LmtleTtcbiAgICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WICYmICF0NSkgdGhyb3cgbmV3IEVycm9yKFwiWW91IGhhdmUgdG8gY29uZmlndXJlIGBrZXlgIGZvciB5b3VyIGNhY2hlLiBQbGVhc2UgbWFrZSBzdXJlIGl0J3MgdW5pcXVlIChhbmQgbm90IGVxdWFsIHRvICdjc3MnKSBhcyBpdCdzIHVzZWQgZm9yIGxpbmtpbmcgc3R5bGVzIHRvIHlvdXIgY2FjaGUuXFxuSWYgbXVsdGlwbGUgY2FjaGVzIHNoYXJlIHRoZSBzYW1lIGtleSB0aGV5IG1pZ2h0IFxcXCJmaWdodFxcXCIgZm9yIGVhY2ggb3RoZXIncyBzdHlsZSBlbGVtZW50cy5cIik7XG4gICAgaWYgKFwiY3NzXCIgPT09IHQ1KSB7XG4gICAgICAgIHZhciBuMyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzdHlsZVtkYXRhLWVtb3Rpb25dOm5vdChbZGF0YS1zXSlcIik7XG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobjMsIGZ1bmN0aW9uKGUxNCkge1xuICAgICAgICAgICAgdmFyIHI4ID0gZTE0LmdldEF0dHJpYnV0ZShcImRhdGEtZW1vdGlvblwiKTtcbiAgICAgICAgICAgIGlmICgtMSAhPT0gcjguaW5kZXhPZihcIiBcIikpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGUxNCk7XG4gICAgICAgICAgICAgICAgZTE0LnNldEF0dHJpYnV0ZShcImRhdGEtc1wiLCBcIlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBvNCA9IHI3LnN0eWxpc1BsdWdpbnMgfHwgXztcbiAgICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WICYmIC9bXmEtei1dLy50ZXN0KHQ1KSkgdGhyb3cgbmV3IEVycm9yKCdFbW90aW9uIGtleSBtdXN0IG9ubHkgY29udGFpbiBsb3dlciBjYXNlIGFscGhhYmV0aWNhbCBjaGFyYWN0ZXJzIGFuZCAtIGJ1dCBcIicgKyB0NSArICdcIiB3YXMgcGFzc2VkJyk7XG4gICAgdmFyIGEzID0ge307XG4gICAgdmFyIGkzO1xuICAgIHZhciBzMyA9IFtdO1xuICAgIGkzID0gcjcuY29udGFpbmVyIHx8IGRvY3VtZW50LmhlYWQ7XG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzdHlsZVtkYXRhLWVtb3Rpb25ePVwiJyArIHQ1ICsgJyBcIl0nKSwgZnVuY3Rpb24oZTE1KSB7XG4gICAgICAgIHZhciByOSA9IGUxNS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWVtb3Rpb25cIikuc3BsaXQoXCIgXCIpO1xuICAgICAgICBmb3IodmFyIHQ2ID0gMTsgdDYgPCByOS5sZW5ndGg7IHQ2KyspYTNbcjlbdDZdXSA9IHRydWU7XG4gICAgICAgIHMzLnB1c2goZTE1KTtcbiAgICB9KTtcbiAgICB2YXIgdTQ7XG4gICAgdmFyIGw0ID0gW1xuICAgICAgICBrMSxcbiAgICAgICAgQVxuICAgIF07XG4gICAgXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WICYmIGw0LnB1c2goUCh7XG4gICAgICAgIGdldCBjb21wYXQgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHcxMS5jb21wYXQ7XG4gICAgICAgIH1cbiAgICB9KSwgVik7XG4gICAgdmFyIGMxMjtcbiAgICB2YXIgeTExID0gW1xuICAgICAgICBzdHJpbmdpZnksXG4gICAgICAgIFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOViA/IGZ1bmN0aW9uKGUxNikge1xuICAgICAgICAgICAgZTE2LnJvb3QgfHwgKGUxNi5yZXR1cm4gPyBjMTIuaW5zZXJ0KGUxNi5yZXR1cm4pIDogZTE2LnZhbHVlICYmIGUxNi50eXBlICE9PSBjMSAmJiBjMTIuaW5zZXJ0KGUxNi52YWx1ZSArIFwie31cIikpO1xuICAgICAgICB9IDogcnVsZXNoZWV0KGZ1bmN0aW9uKGUxNykge1xuICAgICAgICAgICAgYzEyLmluc2VydChlMTcpO1xuICAgICAgICB9KVxuICAgIF07XG4gICAgdmFyIGcxMSA9IG1pZGRsZXdhcmUobDQuY29uY2F0KG80LCB5MTEpKTtcbiAgICB2YXIgYjEgPSBmdW5jdGlvbiBzdHlsaXMoZTE4KSB7XG4gICAgICAgIHJldHVybiBzZXJpYWxpemUoY29tcGlsZShlMTgpLCBnMTEpO1xuICAgIH07XG4gICAgdTQgPSBmdW5jdGlvbiBpbnNlcnQoZTE5LCByMTAsIHQ3LCBuNCkge1xuICAgICAgICBjMTIgPSB0NztcbiAgICAgICAgXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WICYmIHZvaWQgMCAhPT0gcjEwLm1hcCAmJiAoYzEyID0ge1xuICAgICAgICAgICAgaW5zZXJ0OiBmdW5jdGlvbiBpbnNlcnQoZTIwKSB7XG4gICAgICAgICAgICAgICAgdDcuaW5zZXJ0KGUyMCArIHIxMC5tYXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYjEoZTE5ID8gZTE5ICsgXCJ7XCIgKyByMTAuc3R5bGVzICsgXCJ9XCIgOiByMTAuc3R5bGVzKTtcbiAgICAgICAgbjQgJiYgKHcxMS5pbnNlcnRlZFtyMTAubmFtZV0gPSB0cnVlKTtcbiAgICB9O1xuICAgIHZhciB3MTEgPSB7XG4gICAgICAgIGtleTogdDUsXG4gICAgICAgIHNoZWV0OiBuZXcgZTEoe1xuICAgICAgICAgICAga2V5OiB0NSxcbiAgICAgICAgICAgIGNvbnRhaW5lcjogaTMsXG4gICAgICAgICAgICBub25jZTogcjcubm9uY2UsXG4gICAgICAgICAgICBzcGVlZHk6IHI3LnNwZWVkeSxcbiAgICAgICAgICAgIHByZXBlbmQ6IHI3LnByZXBlbmQsXG4gICAgICAgICAgICBpbnNlcnRpb25Qb2ludDogcjcuaW5zZXJ0aW9uUG9pbnRcbiAgICAgICAgfSksXG4gICAgICAgIG5vbmNlOiByNy5ub25jZSxcbiAgICAgICAgaW5zZXJ0ZWQ6IGEzLFxuICAgICAgICByZWdpc3RlcmVkOiB7fSxcbiAgICAgICAgaW5zZXJ0OiB1NFxuICAgIH07XG4gICAgdzExLnNoZWV0Lmh5ZHJhdGUoczMpO1xuICAgIHJldHVybiB3MTE7XG59O1xudmFyIHIyID0ge307XG52YXIgZTMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIHQyID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBuMiA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5mdW5jdGlvbiB0b09iamVjdChyMTMpIHtcbiAgICBpZiAobnVsbCA9PT0gcjEzIHx8IHZvaWQgMCA9PT0gcjEzKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWRcIik7XG4gICAgcmV0dXJuIE9iamVjdChyMTMpO1xufVxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICghT2JqZWN0LmFzc2lnbikgcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgcjIxID0gbmV3IFN0cmluZyhcImFiY1wiKTtcbiAgICAgICAgcjIxWzVdID0gXCJkZVwiO1xuICAgICAgICBpZiAoXCI1XCIgPT09IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHIyMSlbMF0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIGUxMyA9IHt9O1xuICAgICAgICBmb3IodmFyIHQxMyA9IDA7IHQxMyA8IDEwOyB0MTMrKyllMTNbXCJfXCIgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKHQxMyldID0gdDEzO1xuICAgICAgICB2YXIgbjEzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZTEzKS5tYXAoZnVuY3Rpb24ocjMpIHtcbiAgICAgICAgICAgIHJldHVybiBlMTNbcjNdO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKFwiMDEyMzQ1Njc4OVwiICE9PSBuMTMuam9pbihcIlwiKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgYTEzID0ge307XG4gICAgICAgIFwiYWJjZGVmZ2hpamtsbW5vcHFyc3RcIi5zcGxpdChcIlwiKS5mb3JFYWNoKGZ1bmN0aW9uKHI0KSB7XG4gICAgICAgICAgICBhMTNbcjRdID0gcjQ7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gXCJhYmNkZWZnaGlqa2xtbm9wcXJzdFwiID09PSBPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCBhMTMpKS5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKHIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbnIyID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24ocjUsIGEpIHtcbiAgICB2YXIgbzQ7XG4gICAgdmFyIGM1ID0gdG9PYmplY3QocjUpO1xuICAgIHZhciBpNDtcbiAgICBmb3IodmFyIHM0ID0gMTsgczQgPCBhcmd1bWVudHMubGVuZ3RoOyBzNCsrKXtcbiAgICAgICAgbzQgPSBPYmplY3QoYXJndW1lbnRzW3M0XSk7XG4gICAgICAgIGZvcih2YXIgZjIgaW4gbzQpdDIuY2FsbChvNCwgZjIpICYmIChjNVtmMl0gPSBvNFtmMl0pO1xuICAgICAgICBpZiAoZTMpIHtcbiAgICAgICAgICAgIGk0ID0gZTMobzQpO1xuICAgICAgICAgICAgZm9yKHZhciBsMyA9IDA7IGwzIDwgaTQubGVuZ3RoOyBsMysrKW4yLmNhbGwobzQsIGk0W2wzXSkgJiYgKGM1W2k0W2wzXV0gPSBvNFtpNFtsM11dKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYzU7XG59O1xudmFyIGEyID0gcjI7XG5jb25zdCBtb2QgPSB7XG4gICAgZGVmYXVsdDogYTJcbn07XG52YXIgZTQgPSB3aW5kb3cuUmVhY3QsIHsgY3JlYXRlQ29udGV4dDogdDMgIH0gPSBlNCwgeyB1c2VEZWJ1Z1ZhbHVlOiBvMSAgfSA9IGU0LCB7IHVzZVN0YXRlOiBzMSAgfSA9IGU0LCB7IHVzZUlkOiBuMyAgfSA9IGU0LCB7IHVzZVJlZjogYzIgIH0gPSBlNCwgeyB1c2VDb250ZXh0OiByMyAgfSA9IGU0LCB7IHVzZUVmZmVjdDogYTMgIH0gPSBlNCwgeyB1c2VMYXlvdXRFZmZlY3Q6IHAxICB9ID0gZTQsIHsgdXNlUmVkdWNlcjogeDIgIH0gPSBlNCwgeyB1c2VDYWxsYmFjazogdTEgIH0gPSBlNCwgeyBmb3J3YXJkUmVmOiBsMSAgfSA9IGU0LCB7IGNyZWF0ZUVsZW1lbnQ6IGYgIH0gPSBlNCwgeyBjcmVhdGVGYWN0b3J5OiBtMSAgfSA9IGU0LCB7IGNyZWF0ZVJlZjogUjEgIH0gPSBlNCwgeyBGcmFnbWVudDogZCAgfSA9IGU0LCB7IENvbXBvbmVudDogaTEgIH0gPSBlNCwgeyBTdXNwZW5zZTogeTIgIH0gPSBlNCwgeyBpc1ZhbGlkRWxlbWVudDogQzIgIH0gPSBlNCwgeyBtZW1vOiB3MiAgfSA9IGU0LCB7IHVzZUltcGVyYXRpdmVIYW5kbGU6IEUxICB9ID0gZTQsIHsgQ2hpbGRyZW46IGIxICB9ID0gZTQsIHsgbGF6eTogZzIgIH0gPSBlNCwgeyBpc0xhenk6IFMgIH0gPSBlNCwgeyB1c2VNZW1vOiBWMSAgfSA9IGU0LCB7IGNsb25lRWxlbWVudDogazIgIH0gPSBlNCwgRDEgPSBlNDtcbmNvbnN0IG1vZDEgPSB7XG4gICAgQ2hpbGRyZW46IGIxLFxuICAgIENvbXBvbmVudDogaTEsXG4gICAgRnJhZ21lbnQ6IGQsXG4gICAgU3VzcGVuc2U6IHkyLFxuICAgIGNsb25lRWxlbWVudDogazIsXG4gICAgY3JlYXRlQ29udGV4dDogdDMsXG4gICAgY3JlYXRlRWxlbWVudDogZixcbiAgICBjcmVhdGVGYWN0b3J5OiBtMSxcbiAgICBjcmVhdGVSZWY6IFIxLFxuICAgIGRlZmF1bHQ6IEQxLFxuICAgIGZvcndhcmRSZWY6IGwxLFxuICAgIGlzTGF6eTogUyxcbiAgICBpc1ZhbGlkRWxlbWVudDogQzIsXG4gICAgbGF6eTogZzIsXG4gICAgbWVtbzogdzIsXG4gICAgdXNlQ2FsbGJhY2s6IHUxLFxuICAgIHVzZUNvbnRleHQ6IHIzLFxuICAgIHVzZURlYnVnVmFsdWU6IG8xLFxuICAgIHVzZUVmZmVjdDogYTMsXG4gICAgdXNlSWQ6IG4zLFxuICAgIHVzZUltcGVyYXRpdmVIYW5kbGU6IEUxLFxuICAgIHVzZUxheW91dEVmZmVjdDogcDEsXG4gICAgdXNlTWVtbzogVjEsXG4gICAgdXNlUmVkdWNlcjogeDIsXG4gICAgdXNlUmVmOiBjMixcbiAgICB1c2VTdGF0ZTogczFcbn07XG52YXIgYTQgPSBcImRlZmF1bHRcIiBpbiBtb2QgPyBtb2QuZGVmYXVsdCA6IG1vZDtcbnZhciBvMiA9IFwiZGVmYXVsdFwiIGluIG1vZDEgPyBtb2QxLmRlZmF1bHQgOiBtb2QxO1xudmFyIGkyID0ge307XG52YXIgYzMgPSBhNCwgdTIgPSBvMjtcbmZ1bmN0aW9uIGwyKGUxNCkge1xuICAgIGZvcih2YXIgcjE0ID0gXCJodHRwczovL3JlYWN0anMub3JnL2RvY3MvZXJyb3ItZGVjb2Rlci5odG1sP2ludmFyaWFudD1cIiArIGUxNCwgYTE0ID0gMTsgYTE0IDwgYXJndW1lbnRzLmxlbmd0aDsgYTE0KyspcjE0ICs9IFwiJmFyZ3NbXT1cIiArIGVuY29kZVVSSUNvbXBvbmVudChhcmd1bWVudHNbYTE0XSk7XG4gICAgcmV0dXJuIFwiTWluaWZpZWQgUmVhY3QgZXJyb3IgI1wiICsgZTE0ICsgXCI7IHZpc2l0IFwiICsgcjE0ICsgXCIgZm9yIHRoZSBmdWxsIG1lc3NhZ2Ugb3IgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50IGZvciBmdWxsIGVycm9ycyBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLlwiO1xufVxuZnVuY3Rpb24gbjQoZTIzLCByMjIpIHtcbiAgICBlMjMuZW5xdWV1ZShyMjIpO1xuICAgIHJldHVybiAwIDwgZTIzLmRlc2lyZWRTaXplO1xufVxudmFyIHMyID0gbmV3IFRleHRFbmNvZGVyO1xuZnVuY3Rpb24gcDIoZTMxKSB7XG4gICAgcmV0dXJuIHMyLmVuY29kZShlMzEpO1xufVxuZnVuY3Rpb24gdDQoZTQxKSB7XG4gICAgcmV0dXJuIHMyLmVuY29kZShlNDEpO1xufVxuZnVuY3Rpb24gY2EoZTUsIHIzMSkge1xuICAgIFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGU1LmVycm9yID8gZTUuZXJyb3IocjMxKSA6IGU1LmNsb3NlKCk7XG59XG52YXIgZDEgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LCBoMSA9IC9eWzpBLVpfYS16XFx1MDBDMC1cXHUwMEQ2XFx1MDBEOC1cXHUwMEY2XFx1MDBGOC1cXHUwMkZGXFx1MDM3MC1cXHUwMzdEXFx1MDM3Ri1cXHUxRkZGXFx1MjAwQy1cXHUyMDBEXFx1MjA3MC1cXHUyMThGXFx1MkMwMC1cXHUyRkVGXFx1MzAwMS1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkZEXVs6QS1aX2EtelxcdTAwQzAtXFx1MDBENlxcdTAwRDgtXFx1MDBGNlxcdTAwRjgtXFx1MDJGRlxcdTAzNzAtXFx1MDM3RFxcdTAzN0YtXFx1MUZGRlxcdTIwMEMtXFx1MjAwRFxcdTIwNzAtXFx1MjE4RlxcdTJDMDAtXFx1MkZFRlxcdTMwMDEtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZGRFxcLS4wLTlcXHUwMEI3XFx1MDMwMC1cXHUwMzZGXFx1MjAzRi1cXHUyMDQwXSokLywgZzMgPSB7fSwgbTIgPSB7fTtcbmZ1bmN0aW9uIGhhKGU2KSB7XG4gICAgaWYgKGQxLmNhbGwobTIsIGU2KSkgcmV0dXJuICEwO1xuICAgIGlmIChkMS5jYWxsKGczLCBlNikpIHJldHVybiAhMTtcbiAgICBpZiAoaDEudGVzdChlNikpIHJldHVybiBtMltlNl0gPSAhMDtcbiAgICBnM1tlNl0gPSAhMDtcbiAgICByZXR1cm4gITE7XG59XG5mdW5jdGlvbiB2MShlNywgcjQsIGEyMSwgbzExLCBpMTEsIGMxMywgdTExKSB7XG4gICAgdGhpcy5hY2NlcHRzQm9vbGVhbnMgPSAyID09PSByNCB8fCAzID09PSByNCB8fCA0ID09PSByNDtcbiAgICB0aGlzLmF0dHJpYnV0ZU5hbWUgPSBvMTE7XG4gICAgdGhpcy5hdHRyaWJ1dGVOYW1lc3BhY2UgPSBpMTE7XG4gICAgdGhpcy5tdXN0VXNlUHJvcGVydHkgPSBhMjE7XG4gICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBlNztcbiAgICB0aGlzLnR5cGUgPSByNDtcbiAgICB0aGlzLnNhbml0aXplVVJMID0gYzEzO1xuICAgIHRoaXMucmVtb3ZlRW1wdHlTdHJpbmcgPSB1MTE7XG59XG52YXIgYjMgPSB7fTtcblwiY2hpbGRyZW4gZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwgZGVmYXVsdFZhbHVlIGRlZmF1bHRDaGVja2VkIGlubmVySFRNTCBzdXBwcmVzc0NvbnRlbnRFZGl0YWJsZVdhcm5pbmcgc3VwcHJlc3NIeWRyYXRpb25XYXJuaW5nIHN0eWxlXCIuc3BsaXQoXCIgXCIpLmZvckVhY2goZnVuY3Rpb24oZTgpIHtcbiAgICBiM1tlOF0gPSBuZXcgdjEoZTgsIDAsICExLCBlOCwgbnVsbCwgITEsICExKTtcbn0pO1xuW1xuICAgIFtcbiAgICAgICAgXCJhY2NlcHRDaGFyc2V0XCIsXG4gICAgICAgIFwiYWNjZXB0LWNoYXJzZXRcIlxuICAgIF0sXG4gICAgW1xuICAgICAgICBcImNsYXNzTmFtZVwiLFxuICAgICAgICBcImNsYXNzXCJcbiAgICBdLFxuICAgIFtcbiAgICAgICAgXCJodG1sRm9yXCIsXG4gICAgICAgIFwiZm9yXCJcbiAgICBdLFxuICAgIFtcbiAgICAgICAgXCJodHRwRXF1aXZcIixcbiAgICAgICAgXCJodHRwLWVxdWl2XCJcbiAgICBdXG5dLmZvckVhY2goZnVuY3Rpb24oZTkpIHtcbiAgICB2YXIgcjUgPSBlOVswXTtcbiAgICBiM1tyNV0gPSBuZXcgdjEocjUsIDEsICExLCBlOVsxXSwgbnVsbCwgITEsICExKTtcbn0pO1xuW1xuICAgIFwiY29udGVudEVkaXRhYmxlXCIsXG4gICAgXCJkcmFnZ2FibGVcIixcbiAgICBcInNwZWxsQ2hlY2tcIixcbiAgICBcInZhbHVlXCJcbl0uZm9yRWFjaChmdW5jdGlvbihlMTApIHtcbiAgICBiM1tlMTBdID0gbmV3IHYxKGUxMCwgMiwgITEsIGUxMC50b0xvd2VyQ2FzZSgpLCBudWxsLCAhMSwgITEpO1xufSk7XG5bXG4gICAgXCJhdXRvUmV2ZXJzZVwiLFxuICAgIFwiZXh0ZXJuYWxSZXNvdXJjZXNSZXF1aXJlZFwiLFxuICAgIFwiZm9jdXNhYmxlXCIsXG4gICAgXCJwcmVzZXJ2ZUFscGhhXCJcbl0uZm9yRWFjaChmdW5jdGlvbihlMTEpIHtcbiAgICBiM1tlMTFdID0gbmV3IHYxKGUxMSwgMiwgITEsIGUxMSwgbnVsbCwgITEsICExKTtcbn0pO1xuXCJhbGxvd0Z1bGxTY3JlZW4gYXN5bmMgYXV0b0ZvY3VzIGF1dG9QbGF5IGNvbnRyb2xzIGRlZmF1bHQgZGVmZXIgZGlzYWJsZWQgZGlzYWJsZVBpY3R1cmVJblBpY3R1cmUgZGlzYWJsZVJlbW90ZVBsYXliYWNrIGZvcm1Ob1ZhbGlkYXRlIGhpZGRlbiBsb29wIG5vTW9kdWxlIG5vVmFsaWRhdGUgb3BlbiBwbGF5c0lubGluZSByZWFkT25seSByZXF1aXJlZCByZXZlcnNlZCBzY29wZWQgc2VhbWxlc3MgaXRlbVNjb3BlXCIuc3BsaXQoXCIgXCIpLmZvckVhY2goZnVuY3Rpb24oZTEyKSB7XG4gICAgYjNbZTEyXSA9IG5ldyB2MShlMTIsIDMsICExLCBlMTIudG9Mb3dlckNhc2UoKSwgbnVsbCwgITEsICExKTtcbn0pO1xuW1xuICAgIFwiY2hlY2tlZFwiLFxuICAgIFwibXVsdGlwbGVcIixcbiAgICBcIm11dGVkXCIsXG4gICAgXCJzZWxlY3RlZFwiXG5dLmZvckVhY2goZnVuY3Rpb24oZTEzKSB7XG4gICAgYjNbZTEzXSA9IG5ldyB2MShlMTMsIDMsICEwLCBlMTMsIG51bGwsICExLCAhMSk7XG59KTtcbltcbiAgICBcImNhcHR1cmVcIixcbiAgICBcImRvd25sb2FkXCJcbl0uZm9yRWFjaChmdW5jdGlvbihlMTQpIHtcbiAgICBiM1tlMTRdID0gbmV3IHYxKGUxNCwgNCwgITEsIGUxNCwgbnVsbCwgITEsICExKTtcbn0pO1xuW1xuICAgIFwiY29sc1wiLFxuICAgIFwicm93c1wiLFxuICAgIFwic2l6ZVwiLFxuICAgIFwic3BhblwiXG5dLmZvckVhY2goZnVuY3Rpb24oZTE1KSB7XG4gICAgYjNbZTE1XSA9IG5ldyB2MShlMTUsIDYsICExLCBlMTUsIG51bGwsICExLCAhMSk7XG59KTtcbltcbiAgICBcInJvd1NwYW5cIixcbiAgICBcInN0YXJ0XCJcbl0uZm9yRWFjaChmdW5jdGlvbihlMTYpIHtcbiAgICBiM1tlMTZdID0gbmV3IHYxKGUxNiwgNSwgITEsIGUxNi50b0xvd2VyQ2FzZSgpLCBudWxsLCAhMSwgITEpO1xufSk7XG52YXIgazMgPSAvW1xcLTpdKFthLXpdKS9nO1xuZnVuY3Rpb24gamEoZTE3KSB7XG4gICAgcmV0dXJuIGUxN1sxXS50b1VwcGVyQ2FzZSgpO1xufVxuXCJhY2NlbnQtaGVpZ2h0IGFsaWdubWVudC1iYXNlbGluZSBhcmFiaWMtZm9ybSBiYXNlbGluZS1zaGlmdCBjYXAtaGVpZ2h0IGNsaXAtcGF0aCBjbGlwLXJ1bGUgY29sb3ItaW50ZXJwb2xhdGlvbiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnMgY29sb3ItcHJvZmlsZSBjb2xvci1yZW5kZXJpbmcgZG9taW5hbnQtYmFzZWxpbmUgZW5hYmxlLWJhY2tncm91bmQgZmlsbC1vcGFjaXR5IGZpbGwtcnVsZSBmbG9vZC1jb2xvciBmbG9vZC1vcGFjaXR5IGZvbnQtZmFtaWx5IGZvbnQtc2l6ZSBmb250LXNpemUtYWRqdXN0IGZvbnQtc3RyZXRjaCBmb250LXN0eWxlIGZvbnQtdmFyaWFudCBmb250LXdlaWdodCBnbHlwaC1uYW1lIGdseXBoLW9yaWVudGF0aW9uLWhvcml6b250YWwgZ2x5cGgtb3JpZW50YXRpb24tdmVydGljYWwgaG9yaXotYWR2LXggaG9yaXotb3JpZ2luLXggaW1hZ2UtcmVuZGVyaW5nIGxldHRlci1zcGFjaW5nIGxpZ2h0aW5nLWNvbG9yIG1hcmtlci1lbmQgbWFya2VyLW1pZCBtYXJrZXItc3RhcnQgb3ZlcmxpbmUtcG9zaXRpb24gb3ZlcmxpbmUtdGhpY2tuZXNzIHBhaW50LW9yZGVyIHBhbm9zZS0xIHBvaW50ZXItZXZlbnRzIHJlbmRlcmluZy1pbnRlbnQgc2hhcGUtcmVuZGVyaW5nIHN0b3AtY29sb3Igc3RvcC1vcGFjaXR5IHN0cmlrZXRocm91Z2gtcG9zaXRpb24gc3RyaWtldGhyb3VnaC10aGlja25lc3Mgc3Ryb2tlLWRhc2hhcnJheSBzdHJva2UtZGFzaG9mZnNldCBzdHJva2UtbGluZWNhcCBzdHJva2UtbGluZWpvaW4gc3Ryb2tlLW1pdGVybGltaXQgc3Ryb2tlLW9wYWNpdHkgc3Ryb2tlLXdpZHRoIHRleHQtYW5jaG9yIHRleHQtZGVjb3JhdGlvbiB0ZXh0LXJlbmRlcmluZyB1bmRlcmxpbmUtcG9zaXRpb24gdW5kZXJsaW5lLXRoaWNrbmVzcyB1bmljb2RlLWJpZGkgdW5pY29kZS1yYW5nZSB1bml0cy1wZXItZW0gdi1hbHBoYWJldGljIHYtaGFuZ2luZyB2LWlkZW9ncmFwaGljIHYtbWF0aGVtYXRpY2FsIHZlY3Rvci1lZmZlY3QgdmVydC1hZHYteSB2ZXJ0LW9yaWdpbi14IHZlcnQtb3JpZ2luLXkgd29yZC1zcGFjaW5nIHdyaXRpbmctbW9kZSB4bWxuczp4bGluayB4LWhlaWdodFwiLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKGUxOCkge1xuICAgIHZhciByNiA9IGUxOC5yZXBsYWNlKGszLCBqYSk7XG4gICAgYjNbcjZdID0gbmV3IHYxKHI2LCAxLCAhMSwgZTE4LCBudWxsLCAhMSwgITEpO1xufSk7XG5cInhsaW5rOmFjdHVhdGUgeGxpbms6YXJjcm9sZSB4bGluazpyb2xlIHhsaW5rOnNob3cgeGxpbms6dGl0bGUgeGxpbms6dHlwZVwiLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKGUxOSkge1xuICAgIHZhciByNyA9IGUxOS5yZXBsYWNlKGszLCBqYSk7XG4gICAgYjNbcjddID0gbmV3IHYxKHI3LCAxLCAhMSwgZTE5LCBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiwgITEsICExKTtcbn0pO1xuW1xuICAgIFwieG1sOmJhc2VcIixcbiAgICBcInhtbDpsYW5nXCIsXG4gICAgXCJ4bWw6c3BhY2VcIlxuXS5mb3JFYWNoKGZ1bmN0aW9uKGUyMCkge1xuICAgIHZhciByOCA9IGUyMC5yZXBsYWNlKGszLCBqYSk7XG4gICAgYjNbcjhdID0gbmV3IHYxKHI4LCAxLCAhMSwgZTIwLCBcImh0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZVwiLCAhMSwgITEpO1xufSk7XG5bXG4gICAgXCJ0YWJJbmRleFwiLFxuICAgIFwiY3Jvc3NPcmlnaW5cIlxuXS5mb3JFYWNoKGZ1bmN0aW9uKGUyMSkge1xuICAgIGIzW2UyMV0gPSBuZXcgdjEoZTIxLCAxLCAhMSwgZTIxLnRvTG93ZXJDYXNlKCksIG51bGwsICExLCAhMSk7XG59KTtcbmIzLnhsaW5rSHJlZiA9IG5ldyB2MShcInhsaW5rSHJlZlwiLCAxLCAhMSwgXCJ4bGluazpocmVmXCIsIFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiLCAhMCwgITEpO1xuW1xuICAgIFwic3JjXCIsXG4gICAgXCJocmVmXCIsXG4gICAgXCJhY3Rpb25cIixcbiAgICBcImZvcm1BY3Rpb25cIlxuXS5mb3JFYWNoKGZ1bmN0aW9uKGUyMikge1xuICAgIGIzW2UyMl0gPSBuZXcgdjEoZTIyLCAxLCAhMSwgZTIyLnRvTG93ZXJDYXNlKCksIG51bGwsICEwLCAhMCk7XG59KTtcbnZhciB4MyA9IHtcbiAgICBhbmltYXRpb25JdGVyYXRpb25Db3VudDogITAsXG4gICAgYXNwZWN0UmF0aW86ICEwLFxuICAgIGJvcmRlckltYWdlT3V0c2V0OiAhMCxcbiAgICBib3JkZXJJbWFnZVNsaWNlOiAhMCxcbiAgICBib3JkZXJJbWFnZVdpZHRoOiAhMCxcbiAgICBib3hGbGV4OiAhMCxcbiAgICBib3hGbGV4R3JvdXA6ICEwLFxuICAgIGJveE9yZGluYWxHcm91cDogITAsXG4gICAgY29sdW1uQ291bnQ6ICEwLFxuICAgIGNvbHVtbnM6ICEwLFxuICAgIGZsZXg6ICEwLFxuICAgIGZsZXhHcm93OiAhMCxcbiAgICBmbGV4UG9zaXRpdmU6ICEwLFxuICAgIGZsZXhTaHJpbms6ICEwLFxuICAgIGZsZXhOZWdhdGl2ZTogITAsXG4gICAgZmxleE9yZGVyOiAhMCxcbiAgICBncmlkQXJlYTogITAsXG4gICAgZ3JpZFJvdzogITAsXG4gICAgZ3JpZFJvd0VuZDogITAsXG4gICAgZ3JpZFJvd1NwYW46ICEwLFxuICAgIGdyaWRSb3dTdGFydDogITAsXG4gICAgZ3JpZENvbHVtbjogITAsXG4gICAgZ3JpZENvbHVtbkVuZDogITAsXG4gICAgZ3JpZENvbHVtblNwYW46ICEwLFxuICAgIGdyaWRDb2x1bW5TdGFydDogITAsXG4gICAgZm9udFdlaWdodDogITAsXG4gICAgbGluZUNsYW1wOiAhMCxcbiAgICBsaW5lSGVpZ2h0OiAhMCxcbiAgICBvcGFjaXR5OiAhMCxcbiAgICBvcmRlcjogITAsXG4gICAgb3JwaGFuczogITAsXG4gICAgdGFiU2l6ZTogITAsXG4gICAgd2lkb3dzOiAhMCxcbiAgICB6SW5kZXg6ICEwLFxuICAgIHpvb206ICEwLFxuICAgIGZpbGxPcGFjaXR5OiAhMCxcbiAgICBmbG9vZE9wYWNpdHk6ICEwLFxuICAgIHN0b3BPcGFjaXR5OiAhMCxcbiAgICBzdHJva2VEYXNoYXJyYXk6ICEwLFxuICAgIHN0cm9rZURhc2hvZmZzZXQ6ICEwLFxuICAgIHN0cm9rZU1pdGVybGltaXQ6ICEwLFxuICAgIHN0cm9rZU9wYWNpdHk6ICEwLFxuICAgIHN0cm9rZVdpZHRoOiAhMFxufSwgUzEgPSBbXG4gICAgXCJXZWJraXRcIixcbiAgICBcIm1zXCIsXG4gICAgXCJNb3pcIixcbiAgICBcIk9cIlxuXTtcbk9iamVjdC5rZXlzKHgzKS5mb3JFYWNoKGZ1bmN0aW9uKGUyMykge1xuICAgIFMxLmZvckVhY2goZnVuY3Rpb24ocjkpIHtcbiAgICAgICAgcjkgPSByOSArIGUyMy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGUyMy5zdWJzdHJpbmcoMSk7XG4gICAgICAgIHgzW3I5XSA9IHgzW2UyM107XG4gICAgfSk7XG59KTtcbnZhciB3MyA9IC9bXCInJjw+XS87XG5mdW5jdGlvbiB5MyhlMjQpIHtcbiAgICBpZiAoXCJib29sZWFuXCIgPT09IHR5cGVvZiBlMjQgfHwgXCJudW1iZXJcIiA9PT0gdHlwZW9mIGUyNCkgcmV0dXJuIFwiXCIgKyBlMjQ7XG4gICAgZTI0ID0gXCJcIiArIGUyNDtcbiAgICB2YXIgcjEwID0gdzMuZXhlYyhlMjQpO1xuICAgIGlmIChyMTApIHtcbiAgICAgICAgdmFyIGEzMSwgbzIxID0gXCJcIiwgaTIxID0gMDtcbiAgICAgICAgZm9yKGEzMSA9IHIxMC5pbmRleDsgYTMxIDwgZTI0Lmxlbmd0aDsgYTMxKyspe1xuICAgICAgICAgICAgc3dpdGNoKGUyNC5jaGFyQ29kZUF0KGEzMSkpe1xuICAgICAgICAgICAgICAgIGNhc2UgMzQ6XG4gICAgICAgICAgICAgICAgICAgIHIxMCA9IFwiJnF1b3Q7XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICAgICAgIHIxMCA9IFwiJmFtcDtcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgICAgICAgICAgcjEwID0gXCImI3gyNztcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA2MDpcbiAgICAgICAgICAgICAgICAgICAgcjEwID0gXCImbHQ7XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNjI6XG4gICAgICAgICAgICAgICAgICAgIHIxMCA9IFwiJmd0O1wiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkyMSAhPT0gYTMxICYmIChvMjEgKz0gZTI0LnN1YnN0cmluZyhpMjEsIGEzMSkpO1xuICAgICAgICAgICAgaTIxID0gYTMxICsgMTtcbiAgICAgICAgICAgIG8yMSArPSByMTA7XG4gICAgICAgIH1cbiAgICAgICAgZTI0ID0gaTIxICE9PSBhMzEgPyBvMjEgKyBlMjQuc3Vic3RyaW5nKGkyMSwgYTMxKSA6IG8yMTtcbiAgICB9XG4gICAgcmV0dXJuIGUyNDtcbn1cbnZhciBDMyA9IC8oW0EtWl0pL2csIEUyID0gL15tcy0vLCBGID0gQXJyYXkuaXNBcnJheSwgUjIgPSB0NChcIjxzY3JpcHQ+XCIpLCBfMSA9IHQ0KFwiPFxcL3NjcmlwdD5cIiksIFQgPSB0NCgnPHNjcmlwdCBzcmM9XCInKSwgTSA9IHQ0KCc8c2NyaXB0IHR5cGU9XCJtb2R1bGVcIiBzcmM9XCInKSwgUDEgPSB0NCgnXCIgYXN5bmM9XCJcIj48XFwvc2NyaXB0PicpO1xuZnVuY3Rpb24gdWEoZTI1LCByMTEsIGE0MSwgbzMsIGkzKSB7XG4gICAgZTI1ID0gdm9pZCAwID09PSBlMjUgPyBcIlwiIDogZTI1O1xuICAgIHIxMSA9IHZvaWQgMCA9PT0gcjExID8gUjIgOiB0NCgnPHNjcmlwdCBub25jZT1cIicgKyB5MyhyMTEpICsgJ1wiPicpO1xuICAgIHZhciBjMjEgPSBbXTtcbiAgICB2b2lkIDAgIT09IGE0MSAmJiBjMjEucHVzaChyMTEsIHAyKHkzKGE0MSkpLCBfMSk7XG4gICAgaWYgKHZvaWQgMCAhPT0gbzMpIGZvcihhNDEgPSAwOyBhNDEgPCBvMy5sZW5ndGg7IGE0MSsrKWMyMS5wdXNoKFQsIHAyKHkzKG8zW2E0MV0pKSwgUDEpO1xuICAgIGlmICh2b2lkIDAgIT09IGkzKSBmb3IobzMgPSAwOyBvMyA8IGkzLmxlbmd0aDsgbzMrKyljMjEucHVzaChNLCBwMih5MyhpM1tvM10pKSwgUDEpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGJvb3RzdHJhcENodW5rczogYzIxLFxuICAgICAgICBzdGFydElubGluZVNjcmlwdDogcjExLFxuICAgICAgICBwbGFjZWhvbGRlclByZWZpeDogdDQoZTI1ICsgXCJQOlwiKSxcbiAgICAgICAgc2VnbWVudFByZWZpeDogdDQoZTI1ICsgXCJTOlwiKSxcbiAgICAgICAgYm91bmRhcnlQcmVmaXg6IGUyNSArIFwiQjpcIixcbiAgICAgICAgaWRQcmVmaXg6IGUyNSArIFwiUjpcIixcbiAgICAgICAgbmV4dFN1c3BlbnNlSUQ6IDAsXG4gICAgICAgIHNlbnRDb21wbGV0ZVNlZ21lbnRGdW5jdGlvbjogITEsXG4gICAgICAgIHNlbnRDb21wbGV0ZUJvdW5kYXJ5RnVuY3Rpb246ICExLFxuICAgICAgICBzZW50Q2xpZW50UmVuZGVyRnVuY3Rpb246ICExXG4gICAgfTtcbn1cbmZ1bmN0aW9uIHoxKGUyNiwgcjEyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5zZXJ0aW9uTW9kZTogZTI2LFxuICAgICAgICBzZWxlY3RlZFZhbHVlOiByMTJcbiAgICB9O1xufVxuZnVuY3Rpb24gdmEoZTI3KSB7XG4gICAgcmV0dXJuIHoxKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiA9PT0gZTI3ID8gMiA6IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTFwiID09PSBlMjcgPyAzIDogMCwgbnVsbCk7XG59XG5mdW5jdGlvbiB3YShlMjgsIHIxMywgYTUpIHtcbiAgICBzd2l0Y2gocjEzKXtcbiAgICAgICAgY2FzZSBcInNlbGVjdFwiOlxuICAgICAgICAgICAgcmV0dXJuIHoxKDEsIG51bGwgIT0gYTUudmFsdWUgPyBhNS52YWx1ZSA6IGE1LmRlZmF1bHRWYWx1ZSk7XG4gICAgICAgIGNhc2UgXCJzdmdcIjpcbiAgICAgICAgICAgIHJldHVybiB6MSgyLCBudWxsKTtcbiAgICAgICAgY2FzZSBcIm1hdGhcIjpcbiAgICAgICAgICAgIHJldHVybiB6MSgzLCBudWxsKTtcbiAgICAgICAgY2FzZSBcImZvcmVpZ25PYmplY3RcIjpcbiAgICAgICAgICAgIHJldHVybiB6MSgxLCBudWxsKTtcbiAgICAgICAgY2FzZSBcInRhYmxlXCI6XG4gICAgICAgICAgICByZXR1cm4gejEoNCwgbnVsbCk7XG4gICAgICAgIGNhc2UgXCJ0aGVhZFwiOlxuICAgICAgICBjYXNlIFwidGJvZHlcIjpcbiAgICAgICAgY2FzZSBcInRmb290XCI6XG4gICAgICAgICAgICByZXR1cm4gejEoNSwgbnVsbCk7XG4gICAgICAgIGNhc2UgXCJjb2xncm91cFwiOlxuICAgICAgICAgICAgcmV0dXJuIHoxKDcsIG51bGwpO1xuICAgICAgICBjYXNlIFwidHJcIjpcbiAgICAgICAgICAgIHJldHVybiB6MSg2LCBudWxsKTtcbiAgICB9XG4gICAgcmV0dXJuIDQgPD0gZTI4Lmluc2VydGlvbk1vZGUgfHwgMCA9PT0gZTI4Lmluc2VydGlvbk1vZGUgPyB6MSgxLCBudWxsKSA6IGUyODtcbn1cbnZhciBCID0gdDQoXCJcXHgzYyEtLSAtLVxceDNlXCIpLCBEMiA9IG5ldyBNYXAsIEwgPSB0NCgnIHN0eWxlPVwiJyksICQxID0gdDQoXCI6XCIpLCBqMSA9IHQ0KFwiO1wiKTtcbmZ1bmN0aW9uIENhKGUyOSwgcjE0LCBhNikge1xuICAgIGlmIChcIm9iamVjdFwiICE9PSB0eXBlb2YgYTYpIHRocm93IEVycm9yKGwyKDYyKSk7XG4gICAgcjE0ID0gITA7XG4gICAgZm9yKHZhciBvNCBpbiBhNilpZiAoZDEuY2FsbChhNiwgbzQpKSB7XG4gICAgICAgIHZhciBpNCA9IGE2W280XTtcbiAgICAgICAgaWYgKG51bGwgIT0gaTQgJiYgXCJib29sZWFuXCIgIT09IHR5cGVvZiBpNCAmJiBcIlwiICE9PSBpNCkge1xuICAgICAgICAgICAgaWYgKDAgPT09IG80LmluZGV4T2YoXCItLVwiKSkge1xuICAgICAgICAgICAgICAgIHZhciBjID0gcDIoeTMobzQpKTtcbiAgICAgICAgICAgICAgICBpNCA9IHAyKHkzKChcIlwiICsgaTQpLnRyaW0oKSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjID0gbzQ7XG4gICAgICAgICAgICAgICAgdmFyIHUyMSA9IEQyLmdldChjKTtcbiAgICAgICAgICAgICAgICB2b2lkIDAgIT09IHUyMSB8fCAodTIxID0gdDQoeTMoYy5yZXBsYWNlKEMzLCBcIi0kMVwiKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoRTIsIFwiLW1zLVwiKSkpLCBEMi5zZXQoYywgdTIxKSksIGMgPSB1MjE7XG4gICAgICAgICAgICAgICAgaTQgPSBcIm51bWJlclwiID09PSB0eXBlb2YgaTQgPyAwID09PSBpNCB8fCBkMS5jYWxsKHgzLCBvNCkgPyBwMihcIlwiICsgaTQpIDogcDIoaTQgKyBcInB4XCIpIDogcDIoeTMoKFwiXCIgKyBpNCkudHJpbSgpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByMTQgPyAocjE0ID0gITEsIGUyOS5wdXNoKEwsIGMsICQxLCBpNCkpIDogZTI5LnB1c2goajEsIGMsICQxLCBpNCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcjE0IHx8IGUyOS5wdXNoKEgpO1xufVxudmFyIEExID0gdDQoXCIgXCIpLCBWMiA9IHQ0KCc9XCInKSwgSCA9IHQ0KCdcIicpLCBxMSA9IHQ0KCc9XCJcIicpO1xuZnVuY3Rpb24gRyhlMzAsIHIxNSwgYTcsIG81KSB7XG4gICAgc3dpdGNoKGE3KXtcbiAgICAgICAgY2FzZSBcInN0eWxlXCI6XG4gICAgICAgICAgICBDYShlMzAsIHIxNSwgbzUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjYXNlIFwiZGVmYXVsdFZhbHVlXCI6XG4gICAgICAgIGNhc2UgXCJkZWZhdWx0Q2hlY2tlZFwiOlxuICAgICAgICBjYXNlIFwiaW5uZXJIVE1MXCI6XG4gICAgICAgIGNhc2UgXCJzdXBwcmVzc0NvbnRlbnRFZGl0YWJsZVdhcm5pbmdcIjpcbiAgICAgICAgY2FzZSBcInN1cHByZXNzSHlkcmF0aW9uV2FybmluZ1wiOlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoISgyIDwgYTcubGVuZ3RoKSB8fCBcIm9cIiAhPT0gYTdbMF0gJiYgXCJPXCIgIT09IGE3WzBdIHx8IFwiblwiICE9PSBhN1sxXSAmJiBcIk5cIiAhPT0gYTdbMV0pIHtcbiAgICAgICAgaWYgKHIxNSA9IGIzLmhhc093blByb3BlcnR5KGE3KSA/IGIzW2E3XSA6IG51bGwsIG51bGwgIT09IHIxNSkge1xuICAgICAgICAgICAgc3dpdGNoKHR5cGVvZiBvNSl7XG4gICAgICAgICAgICAgICAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcInN5bWJvbFwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyMTUuYWNjZXB0c0Jvb2xlYW5zKSByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhNyA9IHAyKHIxNS5hdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgICAgIHN3aXRjaChyMTUudHlwZSl7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBvNSAmJiBlMzAucHVzaChBMSwgYTcsIHExKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAhMCA9PT0gbzUgPyBlMzAucHVzaChBMSwgYTcsIHExKSA6ICExICE9PSBvNSAmJiBlMzAucHVzaChBMSwgYTcsIFYyLCBwMih5MyhvNSkpLCBIKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICBpc05hTihvNSkgfHwgZTMwLnB1c2goQTEsIGE3LCBWMiwgcDIoeTMobzUpKSwgSCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgIWlzTmFOKG81KSAmJiAxIDw9IG81ICYmIGUzMC5wdXNoKEExLCBhNywgVjIsIHAyKHkzKG81KSksIEgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByMTUuc2FuaXRpemVVUkwgJiYgKG81ID0gXCJcIiArIG81KSwgZTMwLnB1c2goQTEsIGE3LCBWMiwgcDIoeTMobzUpKSwgSCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaGEoYTcpKSB7XG4gICAgICAgICAgICBzd2l0Y2godHlwZW9mIG81KXtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwic3ltYm9sXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAocjE1ID0gYTcudG9Mb3dlckNhc2UoKS5zbGljZSgwLCA1KSwgXCJkYXRhLVwiICE9PSByMTUgJiYgXCJhcmlhLVwiICE9PSByMTUpIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUzMC5wdXNoKEExLCBwMihhNyksIFYyLCBwMih5MyhvNSkpLCBIKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbnZhciBXID0gdDQoXCI+XCIpLCBVID0gdDQoXCIvPlwiKTtcbmZ1bmN0aW9uIEkoZTMxLCByMTYsIGE4KSB7XG4gICAgaWYgKG51bGwgIT0gcjE2KSB7XG4gICAgICAgIGlmIChudWxsICE9IGE4KSB0aHJvdyBFcnJvcihsMig2MCkpO1xuICAgICAgICBpZiAoXCJvYmplY3RcIiAhPT0gdHlwZW9mIHIxNiB8fCAhKFwiX19odG1sXCIgaW4gcjE2KSkgdGhyb3cgRXJyb3IobDIoNjEpKTtcbiAgICAgICAgcjE2ID0gcjE2Ll9faHRtbDtcbiAgICAgICAgbnVsbCAhPT0gcjE2ICYmIHZvaWQgMCAhPT0gcjE2ICYmIGUzMS5wdXNoKHAyKFwiXCIgKyByMTYpKTtcbiAgICB9XG59XG5mdW5jdGlvbiBGYShlMzIpIHtcbiAgICB2YXIgcjE3ID0gXCJcIjtcbiAgICB1Mi5DaGlsZHJlbi5mb3JFYWNoKGUzMiwgZnVuY3Rpb24oZTMzKSB7XG4gICAgICAgIG51bGwgIT0gZTMzICYmIChyMTcgKz0gZTMzKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcjE3O1xufVxudmFyIFEgPSB0NCgnIHNlbGVjdGVkPVwiXCInKTtcbmZ1bmN0aW9uIEhhKGUzNCwgcjE4LCBhOSwgbzYpIHtcbiAgICBlMzQucHVzaChKKGE5KSk7XG4gICAgdmFyIGk1LCBjID0gYTkgPSBudWxsO1xuICAgIGZvcihpNSBpbiByMTgpaWYgKGQxLmNhbGwocjE4LCBpNSkpIHtcbiAgICAgICAgdmFyIHUzID0gcjE4W2k1XTtcbiAgICAgICAgaWYgKG51bGwgIT0gdTMpIHN3aXRjaChpNSl7XG4gICAgICAgICAgICBjYXNlIFwiY2hpbGRyZW5cIjpcbiAgICAgICAgICAgICAgICBhOSA9IHUzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MXCI6XG4gICAgICAgICAgICAgICAgYyA9IHUzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBHKGUzNCwgbzYsIGk1LCB1Myk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZTM0LnB1c2goVyk7XG4gICAgSShlMzQsIGMsIGE5KTtcbiAgICByZXR1cm4gXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGE5ID8gKGUzNC5wdXNoKHAyKHkzKGE5KSkpLCBudWxsKSA6IGE5O1xufVxudmFyIEsgPSB0NChcIlxcblwiKSwgZWUgPSAvXlthLXpBLVpdW2EtekEtWjpfXFwuXFwtXFxkXSokLywgdGUgPSBuZXcgTWFwO1xuZnVuY3Rpb24gSihlMzUpIHtcbiAgICB2YXIgcjE5ID0gdGUuZ2V0KGUzNSk7XG4gICAgaWYgKHZvaWQgMCA9PT0gcjE5KSB7XG4gICAgICAgIGlmICghZWUudGVzdChlMzUpKSB0aHJvdyBFcnJvcihsMig2NSwgZTM1KSk7XG4gICAgICAgIHIxOSA9IHQ0KFwiPFwiICsgZTM1KTtcbiAgICAgICAgdGUuc2V0KGUzNSwgcjE5KTtcbiAgICB9XG4gICAgcmV0dXJuIHIxOTtcbn1cbnZhciBuZSA9IHQ0KFwiPCFET0NUWVBFIGh0bWw+XCIpO1xuZnVuY3Rpb24gTWEoZTM2LCByMjAsIGExMCwgbzcsIGk2KSB7XG4gICAgc3dpdGNoKHIyMCl7XG4gICAgICAgIGNhc2UgXCJzZWxlY3RcIjpcbiAgICAgICAgICAgIGUzNi5wdXNoKEooXCJzZWxlY3RcIikpO1xuICAgICAgICAgICAgdmFyIGMgPSBudWxsLCB1NCA9IG51bGw7XG4gICAgICAgICAgICBmb3IobTExIGluIGExMClpZiAoZDEuY2FsbChhMTAsIG0xMSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgczExID0gYTEwW20xMV07XG4gICAgICAgICAgICAgICAgaWYgKG51bGwgIT0gczExKSBzd2l0Y2gobTExKXtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNoaWxkcmVuXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBjID0gczExO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkYW5nZXJvdXNseVNldElubmVySFRNTFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgdTQgPSBzMTE7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRlZmF1bHRWYWx1ZVwiOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidmFsdWVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgRyhlMzYsIG83LCBtMTEsIHMxMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZTM2LnB1c2goVyk7XG4gICAgICAgICAgICBJKGUzNiwgdTQsIGMpO1xuICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgIGNhc2UgXCJvcHRpb25cIjpcbiAgICAgICAgICAgIHU0ID0gaTYuc2VsZWN0ZWRWYWx1ZTtcbiAgICAgICAgICAgIGUzNi5wdXNoKEooXCJvcHRpb25cIikpO1xuICAgICAgICAgICAgdmFyIGgxMSA9IHMxMSA9IG51bGwsIGcxMiA9IG51bGw7XG4gICAgICAgICAgICB2YXIgbTExID0gbnVsbDtcbiAgICAgICAgICAgIGZvcihjIGluIGExMClpZiAoZDEuY2FsbChhMTAsIGMpICYmIChyMjAgPSBhMTBbY10sIG51bGwgIT0gcjIwKSkgc3dpdGNoKGMpe1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjaGlsZHJlblwiOlxuICAgICAgICAgICAgICAgICAgICBzMTEgPSByMjA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzZWxlY3RlZFwiOlxuICAgICAgICAgICAgICAgICAgICBnMTIgPSByMjA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJkYW5nZXJvdXNseVNldElubmVySFRNTFwiOlxuICAgICAgICAgICAgICAgICAgICBtMTEgPSByMjA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ2YWx1ZVwiOlxuICAgICAgICAgICAgICAgICAgICBoMTEgPSByMjA7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgRyhlMzYsIG83LCBjLCByMjApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG51bGwgIT09IHU0KSBpZiAoYTEwID0gbnVsbCAhPT0gaDExID8gXCJcIiArIGgxMSA6IEZhKHMxMSksIEYodTQpKSB7XG4gICAgICAgICAgICAgICAgZm9yKG83ID0gMDsgbzcgPCB1NC5sZW5ndGg7IG83KyspaWYgKFwiXCIgKyB1NFtvN10gPT09IGExMCkge1xuICAgICAgICAgICAgICAgICAgICBlMzYucHVzaChRKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHU0ID09PSBhMTAgJiYgZTM2LnB1c2goUSk7XG4gICAgICAgICAgICBlbHNlIGcxMiAmJiBlMzYucHVzaChRKTtcbiAgICAgICAgICAgIGUzNi5wdXNoKFcpO1xuICAgICAgICAgICAgSShlMzYsIG0xMSwgczExKTtcbiAgICAgICAgICAgIHJldHVybiBzMTE7XG4gICAgICAgIGNhc2UgXCJ0ZXh0YXJlYVwiOlxuICAgICAgICAgICAgZTM2LnB1c2goSihcInRleHRhcmVhXCIpKTtcbiAgICAgICAgICAgIG0xMSA9IHU0ID0gYyA9IG51bGw7XG4gICAgICAgICAgICBmb3IoczExIGluIGExMClpZiAoZDEuY2FsbChhMTAsIHMxMSkgJiYgKGgxMSA9IGExMFtzMTFdLCBudWxsICE9IGgxMSkpIHN3aXRjaChzMTEpe1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjaGlsZHJlblwiOlxuICAgICAgICAgICAgICAgICAgICBtMTEgPSBoMTE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ2YWx1ZVwiOlxuICAgICAgICAgICAgICAgICAgICBjID0gaDExO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZGVmYXVsdFZhbHVlXCI6XG4gICAgICAgICAgICAgICAgICAgIHU0ID0gaDExO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IobDIoOTEpKTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBHKGUzNiwgbzcsIHMxMSwgaDExKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG51bGwgPT09IGMgJiYgbnVsbCAhPT0gdTQgJiYgKGMgPSB1NCk7XG4gICAgICAgICAgICBlMzYucHVzaChXKTtcbiAgICAgICAgICAgIGlmIChudWxsICE9IG0xMSkge1xuICAgICAgICAgICAgICAgIGlmIChudWxsICE9IGMpIHRocm93IEVycm9yKGwyKDkyKSk7XG4gICAgICAgICAgICAgICAgaWYgKEYobTExKSAmJiAxIDwgbTExLmxlbmd0aCkgdGhyb3cgRXJyb3IobDIoOTMpKTtcbiAgICAgICAgICAgICAgICBjID0gXCJcIiArIG0xMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFwic3RyaW5nXCIgPT09IHR5cGVvZiBjICYmIFwiXFxuXCIgPT09IGNbMF0gJiYgZTM2LnB1c2goSyk7XG4gICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgY2FzZSBcImlucHV0XCI6XG4gICAgICAgICAgICBlMzYucHVzaChKKFwiaW5wdXRcIikpO1xuICAgICAgICAgICAgaDExID0gbTExID0gczExID0gYyA9IG51bGw7XG4gICAgICAgICAgICBmb3IodTQgaW4gYTEwKWlmIChkMS5jYWxsKGExMCwgdTQpICYmIChnMTIgPSBhMTBbdTRdLCBudWxsICE9IGcxMikpIHN3aXRjaCh1NCl7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNoaWxkcmVuXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MXCI6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGwyKDM5OSwgXCJpbnB1dFwiKSk7XG4gICAgICAgICAgICAgICAgY2FzZSBcImRlZmF1bHRDaGVja2VkXCI6XG4gICAgICAgICAgICAgICAgICAgIGgxMSA9IGcxMjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImRlZmF1bHRWYWx1ZVwiOlxuICAgICAgICAgICAgICAgICAgICBzMTEgPSBnMTI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjaGVja2VkXCI6XG4gICAgICAgICAgICAgICAgICAgIG0xMSA9IGcxMjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInZhbHVlXCI6XG4gICAgICAgICAgICAgICAgICAgIGMgPSBnMTI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIEcoZTM2LCBvNywgdTQsIGcxMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBudWxsICE9PSBtMTEgPyBHKGUzNiwgbzcsIFwiY2hlY2tlZFwiLCBtMTEpIDogbnVsbCAhPT0gaDExICYmIEcoZTM2LCBvNywgXCJjaGVja2VkXCIsIGgxMSk7XG4gICAgICAgICAgICBudWxsICE9PSBjID8gRyhlMzYsIG83LCBcInZhbHVlXCIsIGMpIDogbnVsbCAhPT0gczExICYmIEcoZTM2LCBvNywgXCJ2YWx1ZVwiLCBzMTEpO1xuICAgICAgICAgICAgZTM2LnB1c2goVSk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgY2FzZSBcIm1lbnVpdGVtXCI6XG4gICAgICAgICAgICBlMzYucHVzaChKKFwibWVudWl0ZW1cIikpO1xuICAgICAgICAgICAgZm9yKHZhciBiMTEgaW4gYTEwKWlmIChkMS5jYWxsKGExMCwgYjExKSAmJiAoYyA9IGExMFtiMTFdLCBudWxsICE9IGMpKSBzd2l0Y2goYjExKXtcbiAgICAgICAgICAgICAgICBjYXNlIFwiY2hpbGRyZW5cIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IobDIoNDAwKSk7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgRyhlMzYsIG83LCBiMTEsIGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZTM2LnB1c2goVyk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgY2FzZSBcImxpc3RpbmdcIjpcbiAgICAgICAgY2FzZSBcInByZVwiOlxuICAgICAgICAgICAgZTM2LnB1c2goSihyMjApKTtcbiAgICAgICAgICAgIHU0ID0gYyA9IG51bGw7XG4gICAgICAgICAgICBmb3IoaDExIGluIGExMClpZiAoZDEuY2FsbChhMTAsIGgxMSkgJiYgKHMxMSA9IGExMFtoMTFdLCBudWxsICE9IHMxMSkpIHN3aXRjaChoMTEpe1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjaGlsZHJlblwiOlxuICAgICAgICAgICAgICAgICAgICBjID0gczExO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIjpcbiAgICAgICAgICAgICAgICAgICAgdTQgPSBzMTE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIEcoZTM2LCBvNywgaDExLCBzMTEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZTM2LnB1c2goVyk7XG4gICAgICAgICAgICBpZiAobnVsbCAhPSB1NCkge1xuICAgICAgICAgICAgICAgIGlmIChudWxsICE9IGMpIHRocm93IEVycm9yKGwyKDYwKSk7XG4gICAgICAgICAgICAgICAgaWYgKFwib2JqZWN0XCIgIT09IHR5cGVvZiB1NCB8fCAhKFwiX19odG1sXCIgaW4gdTQpKSB0aHJvdyBFcnJvcihsMig2MSkpO1xuICAgICAgICAgICAgICAgIGExMCA9IHU0Ll9faHRtbDtcbiAgICAgICAgICAgICAgICBudWxsICE9PSBhMTAgJiYgdm9pZCAwICE9PSBhMTAgJiYgKFwic3RyaW5nXCIgPT09IHR5cGVvZiBhMTAgJiYgMCA8IGExMC5sZW5ndGggJiYgXCJcXG5cIiA9PT0gYTEwWzBdID8gZTM2LnB1c2goSywgcDIoYTEwKSkgOiBlMzYucHVzaChwMihcIlwiICsgYTEwKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGMgJiYgXCJcXG5cIiA9PT0gY1swXSAmJiBlMzYucHVzaChLKTtcbiAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICBjYXNlIFwiYXJlYVwiOlxuICAgICAgICBjYXNlIFwiYmFzZVwiOlxuICAgICAgICBjYXNlIFwiYnJcIjpcbiAgICAgICAgY2FzZSBcImNvbFwiOlxuICAgICAgICBjYXNlIFwiZW1iZWRcIjpcbiAgICAgICAgY2FzZSBcImhyXCI6XG4gICAgICAgIGNhc2UgXCJpbWdcIjpcbiAgICAgICAgY2FzZSBcImtleWdlblwiOlxuICAgICAgICBjYXNlIFwibGlua1wiOlxuICAgICAgICBjYXNlIFwibWV0YVwiOlxuICAgICAgICBjYXNlIFwicGFyYW1cIjpcbiAgICAgICAgY2FzZSBcInNvdXJjZVwiOlxuICAgICAgICBjYXNlIFwidHJhY2tcIjpcbiAgICAgICAgY2FzZSBcIndiclwiOlxuICAgICAgICAgICAgZTM2LnB1c2goSihyMjApKTtcbiAgICAgICAgICAgIGZvcih2YXIgazExIGluIGExMClpZiAoZDEuY2FsbChhMTAsIGsxMSkgJiYgKGMgPSBhMTBbazExXSwgbnVsbCAhPSBjKSkgc3dpdGNoKGsxMSl7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNoaWxkcmVuXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MXCI6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGwyKDM5OSwgcjIwKSk7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgRyhlMzYsIG83LCBrMTEsIGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZTM2LnB1c2goVSk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgY2FzZSBcImFubm90YXRpb24teG1sXCI6XG4gICAgICAgIGNhc2UgXCJjb2xvci1wcm9maWxlXCI6XG4gICAgICAgIGNhc2UgXCJmb250LWZhY2VcIjpcbiAgICAgICAgY2FzZSBcImZvbnQtZmFjZS1zcmNcIjpcbiAgICAgICAgY2FzZSBcImZvbnQtZmFjZS11cmlcIjpcbiAgICAgICAgY2FzZSBcImZvbnQtZmFjZS1mb3JtYXRcIjpcbiAgICAgICAgY2FzZSBcImZvbnQtZmFjZS1uYW1lXCI6XG4gICAgICAgIGNhc2UgXCJtaXNzaW5nLWdseXBoXCI6XG4gICAgICAgICAgICByZXR1cm4gSGEoZTM2LCBhMTAsIHIyMCwgbzcpO1xuICAgICAgICBjYXNlIFwiaHRtbFwiOlxuICAgICAgICAgICAgcmV0dXJuIDAgPT09IGk2Lmluc2VydGlvbk1vZGUgJiYgZTM2LnB1c2gobmUpLCBIYShlMzYsIGExMCwgcjIwLCBvNyk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBpZiAoLTEgPT09IHIyMC5pbmRleE9mKFwiLVwiKSAmJiBcInN0cmluZ1wiICE9PSB0eXBlb2YgYTEwLmlzKSByZXR1cm4gSGEoZTM2LCBhMTAsIHIyMCwgbzcpO1xuICAgICAgICAgICAgZTM2LnB1c2goSihyMjApKTtcbiAgICAgICAgICAgIHU0ID0gYyA9IG51bGw7XG4gICAgICAgICAgICBmb3IoZzEyIGluIGExMClpZiAoZDEuY2FsbChhMTAsIGcxMikgJiYgKHMxMSA9IGExMFtnMTJdLCBudWxsICE9IHMxMSkpIHN3aXRjaChnMTIpe1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjaGlsZHJlblwiOlxuICAgICAgICAgICAgICAgICAgICBjID0gczExO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIjpcbiAgICAgICAgICAgICAgICAgICAgdTQgPSBzMTE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzdHlsZVwiOlxuICAgICAgICAgICAgICAgICAgICBDYShlMzYsIG83LCBzMTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwic3VwcHJlc3NDb250ZW50RWRpdGFibGVXYXJuaW5nXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcInN1cHByZXNzSHlkcmF0aW9uV2FybmluZ1wiOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBoYShnMTIpICYmIFwiZnVuY3Rpb25cIiAhPT0gdHlwZW9mIHMxMSAmJiBcInN5bWJvbFwiICE9PSB0eXBlb2YgczExICYmIGUzNi5wdXNoKEExLCBwMihnMTIpLCBWMiwgcDIoeTMoczExKSksIEgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZTM2LnB1c2goVyk7XG4gICAgICAgICAgICBJKGUzNiwgdTQsIGMpO1xuICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgfVxufVxudmFyIHJlID0gdDQoXCI8L1wiKSwgYWUgPSB0NChcIj5cIiksIG9lID0gdDQoJzx0ZW1wbGF0ZSBpZD1cIicpLCBsZSA9IHQ0KCdcIj48L3RlbXBsYXRlPicpLCBpZSA9IHQ0KFwiXFx4M2MhLS0kLS1cXHgzZVwiKSwgY2UgPSB0NCgnXFx4M2MhLS0kPy0tXFx4M2U8dGVtcGxhdGUgaWQ9XCInKSwgdWUgPSB0NCgnXCI+PC90ZW1wbGF0ZT4nKSwgc2UgPSB0NChcIlxceDNjIS0tJCEtLVxceDNlXCIpLCBmZSA9IHQ0KFwiXFx4M2MhLS0vJC0tXFx4M2VcIik7XG5mdW5jdGlvbiBXYShlMzcsIHIsIGExMSkge1xuICAgIG40KGUzNywgY2UpO1xuICAgIGlmIChudWxsID09PSBhMTEpIHRocm93IEVycm9yKGwyKDM5NSkpO1xuICAgIG40KGUzNywgYTExKTtcbiAgICByZXR1cm4gbjQoZTM3LCB1ZSk7XG59XG52YXIgZGUgPSB0NCgnPGRpdiBoaWRkZW4gaWQ9XCInKSwgcGUgPSB0NCgnXCI+JyksIGhlID0gdDQoXCI8L2Rpdj5cIiksIGdlID0gdDQoJzxzdmcgYXJpYS1oaWRkZW49XCJ0cnVlXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIiBpZD1cIicpLCBtZSA9IHQ0KCdcIj4nKSwgdmUgPSB0NChcIjwvc3ZnPlwiKSwgYmUgPSB0NCgnPG1hdGggYXJpYS1oaWRkZW49XCJ0cnVlXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIiBpZD1cIicpLCB5ZSA9IHQ0KCdcIj4nKSwga2UgPSB0NChcIjwvbWF0aD5cIiksIHhlID0gdDQoJzx0YWJsZSBoaWRkZW4gaWQ9XCInKSwgU2UgPSB0NCgnXCI+JyksIHdlID0gdDQoXCI8L3RhYmxlPlwiKSwgQ2UgPSB0NCgnPHRhYmxlIGhpZGRlbj48dGJvZHkgaWQ9XCInKSwgRWUgPSB0NCgnXCI+JyksIEZlID0gdDQoXCI8L3Rib2R5PjwvdGFibGU+XCIpLCBSZSA9IHQ0KCc8dGFibGUgaGlkZGVuPjx0ciBpZD1cIicpLCBfZSA9IHQ0KCdcIj4nKSwgVGUgPSB0NChcIjwvdHI+PC90YWJsZT5cIiksIEllID0gdDQoJzx0YWJsZSBoaWRkZW4+PGNvbGdyb3VwIGlkPVwiJyksIE1lID0gdDQoJ1wiPicpLCBQZSA9IHQ0KFwiPC9jb2xncm91cD48L3RhYmxlPlwiKTtcbmZ1bmN0aW9uIHJiKGUzOCwgcjIxLCBhMTIsIG84KSB7XG4gICAgc3dpdGNoKGExMi5pbnNlcnRpb25Nb2RlKXtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICByZXR1cm4gbjQoZTM4LCBkZSksIG40KGUzOCwgcjIxLnNlZ21lbnRQcmVmaXgpLCBuNChlMzgsIHAyKG84LnRvU3RyaW5nKDE2KSkpLCBuNChlMzgsIHBlKTtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgcmV0dXJuIG40KGUzOCwgZ2UpLCBuNChlMzgsIHIyMS5zZWdtZW50UHJlZml4KSwgbjQoZTM4LCBwMihvOC50b1N0cmluZygxNikpKSwgbjQoZTM4LCBtZSk7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHJldHVybiBuNChlMzgsIGJlKSwgbjQoZTM4LCByMjEuc2VnbWVudFByZWZpeCksIG40KGUzOCwgcDIobzgudG9TdHJpbmcoMTYpKSksIG40KGUzOCwgeWUpO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICByZXR1cm4gbjQoZTM4LCB4ZSksIG40KGUzOCwgcjIxLnNlZ21lbnRQcmVmaXgpLCBuNChlMzgsIHAyKG84LnRvU3RyaW5nKDE2KSkpLCBuNChlMzgsIFNlKTtcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgcmV0dXJuIG40KGUzOCwgQ2UpLCBuNChlMzgsIHIyMS5zZWdtZW50UHJlZml4KSwgbjQoZTM4LCBwMihvOC50b1N0cmluZygxNikpKSwgbjQoZTM4LCBFZSk7XG4gICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgIHJldHVybiBuNChlMzgsIFJlKSwgbjQoZTM4LCByMjEuc2VnbWVudFByZWZpeCksIG40KGUzOCwgcDIobzgudG9TdHJpbmcoMTYpKSksIG40KGUzOCwgX2UpO1xuICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICByZXR1cm4gbjQoZTM4LCBJZSksIG40KGUzOCwgcjIxLnNlZ21lbnRQcmVmaXgpLCBuNChlMzgsIHAyKG84LnRvU3RyaW5nKDE2KSkpLCBuNChlMzgsIE1lKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IEVycm9yKGwyKDM5NykpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNiKGUzOSwgcjIyKSB7XG4gICAgc3dpdGNoKHIyMi5pbnNlcnRpb25Nb2RlKXtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICByZXR1cm4gbjQoZTM5LCBoZSk7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIHJldHVybiBuNChlMzksIHZlKTtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgcmV0dXJuIG40KGUzOSwga2UpO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICByZXR1cm4gbjQoZTM5LCB3ZSk7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgIHJldHVybiBuNChlMzksIEZlKTtcbiAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgcmV0dXJuIG40KGUzOSwgVGUpO1xuICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICByZXR1cm4gbjQoZTM5LCBQZSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihsMigzOTcpKTtcbiAgICB9XG59XG52YXIgemUgPSB0NCgnZnVuY3Rpb24gJFJTKGEsYil7YT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChhKTtiPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGIpO2ZvcihhLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYSk7YS5maXJzdENoaWxkOyliLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGEuZmlyc3RDaGlsZCxiKTtiLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYil9OyRSUyhcIicpLCBCZSA9IHQ0KCckUlMoXCInKSwgTmUgPSB0NCgnXCIsXCInKSwgRGUgPSB0NCgnXCIpPFxcL3NjcmlwdD4nKSwgT2UgPSB0NCgnZnVuY3Rpb24gJFJDKGEsYil7YT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChhKTtiPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGIpO2IucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChiKTtpZihhKXthPWEucHJldmlvdXNTaWJsaW5nO3ZhciBmPWEucGFyZW50Tm9kZSxjPWEubmV4dFNpYmxpbmcsZT0wO2Rve2lmKGMmJjg9PT1jLm5vZGVUeXBlKXt2YXIgZD1jLmRhdGE7aWYoXCIvJFwiPT09ZClpZigwPT09ZSlicmVhaztlbHNlIGUtLTtlbHNlXCIkXCIhPT1kJiZcIiQ/XCIhPT1kJiZcIiQhXCIhPT1kfHxlKyt9ZD1jLm5leHRTaWJsaW5nO2YucmVtb3ZlQ2hpbGQoYyk7Yz1kfXdoaWxlKGMpO2Zvcig7Yi5maXJzdENoaWxkOylmLmluc2VydEJlZm9yZShiLmZpcnN0Q2hpbGQsYyk7YS5kYXRhPVwiJFwiO2EuX3JlYWN0UmV0cnkmJmEuX3JlYWN0UmV0cnkoKX19OyRSQyhcIicpLCBMZSA9IHQ0KCckUkMoXCInKSwgJGUgPSB0NCgnXCIsXCInKSwgamUgPSB0NCgnXCIpPFxcL3NjcmlwdD4nKSwgQWUgPSB0NCgnZnVuY3Rpb24gJFJYKGEpe2lmKGE9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYSkpYT1hLnByZXZpb3VzU2libGluZyxhLmRhdGE9XCIkIVwiLGEuX3JlYWN0UmV0cnkmJmEuX3JlYWN0UmV0cnkoKX07JFJYKFwiJyksIFZlID0gdDQoJyRSWChcIicpLCBIZSA9IHQ0KCdcIik8XFwvc2NyaXB0PicpLCBxZSA9IDYwMTAzLCBXZSA9IDYwMTA2LCBaZSA9IDYwMTA3LCBHZSA9IDYwMTA4LCBVZSA9IDYwMTE0LCBYZSA9IDYwMTA5LCBKZSA9IDYwMTEwLCBZZSA9IDYwMTEyLCBRZSA9IDYwMTEzLCBLZSA9IDYwMTIwLCBldCA9IDYwMTE1LCB0dCA9IDYwMTE2LCBudCA9IDYwMTE5LCBydCA9IDYwMTI5LCBhdCA9IDYwMTMxLCBvdCA9IDYwMTMyO1xuaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIFN5bWJvbCAmJiBTeW1ib2wuZm9yKSB7XG4gICAgdmFyIGx0ID0gU3ltYm9sLmZvcjtcbiAgICBxZSA9IGx0KFwicmVhY3QuZWxlbWVudFwiKTtcbiAgICBXZSA9IGx0KFwicmVhY3QucG9ydGFsXCIpO1xuICAgIFplID0gbHQoXCJyZWFjdC5mcmFnbWVudFwiKTtcbiAgICBHZSA9IGx0KFwicmVhY3Quc3RyaWN0X21vZGVcIik7XG4gICAgVWUgPSBsdChcInJlYWN0LnByb2ZpbGVyXCIpO1xuICAgIFhlID0gbHQoXCJyZWFjdC5wcm92aWRlclwiKTtcbiAgICBKZSA9IGx0KFwicmVhY3QuY29udGV4dFwiKTtcbiAgICBZZSA9IGx0KFwicmVhY3QuZm9yd2FyZF9yZWZcIik7XG4gICAgUWUgPSBsdChcInJlYWN0LnN1c3BlbnNlXCIpO1xuICAgIEtlID0gbHQoXCJyZWFjdC5zdXNwZW5zZV9saXN0XCIpO1xuICAgIGV0ID0gbHQoXCJyZWFjdC5tZW1vXCIpO1xuICAgIHR0ID0gbHQoXCJyZWFjdC5sYXp5XCIpO1xuICAgIG50ID0gbHQoXCJyZWFjdC5zY29wZVwiKTtcbiAgICBydCA9IGx0KFwicmVhY3QuZGVidWdfdHJhY2VfbW9kZVwiKTtcbiAgICBhdCA9IGx0KFwicmVhY3QubGVnYWN5X2hpZGRlblwiKTtcbiAgICBvdCA9IGx0KFwicmVhY3QuY2FjaGVcIik7XG59XG52YXIgaXQgPSBcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBTeW1ib2wgJiYgU3ltYm9sLml0ZXJhdG9yO1xuZnVuY3Rpb24gVWIoZTQwKSB7XG4gICAgaWYgKG51bGwgPT0gZTQwKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YgZTQwKSByZXR1cm4gZTQwLmRpc3BsYXlOYW1lIHx8IGU0MC5uYW1lIHx8IG51bGw7XG4gICAgaWYgKFwic3RyaW5nXCIgPT09IHR5cGVvZiBlNDApIHJldHVybiBlNDA7XG4gICAgc3dpdGNoKGU0MCl7XG4gICAgICAgIGNhc2UgWmU6XG4gICAgICAgICAgICByZXR1cm4gXCJGcmFnbWVudFwiO1xuICAgICAgICBjYXNlIFdlOlxuICAgICAgICAgICAgcmV0dXJuIFwiUG9ydGFsXCI7XG4gICAgICAgIGNhc2UgVWU6XG4gICAgICAgICAgICByZXR1cm4gXCJQcm9maWxlclwiO1xuICAgICAgICBjYXNlIEdlOlxuICAgICAgICAgICAgcmV0dXJuIFwiU3RyaWN0TW9kZVwiO1xuICAgICAgICBjYXNlIFFlOlxuICAgICAgICAgICAgcmV0dXJuIFwiU3VzcGVuc2VcIjtcbiAgICAgICAgY2FzZSBLZTpcbiAgICAgICAgICAgIHJldHVybiBcIlN1c3BlbnNlTGlzdFwiO1xuICAgICAgICBjYXNlIG90OlxuICAgICAgICAgICAgcmV0dXJuIFwiQ2FjaGVcIjtcbiAgICB9XG4gICAgaWYgKFwib2JqZWN0XCIgPT09IHR5cGVvZiBlNDApIHN3aXRjaChlNDAuJCR0eXBlb2Ype1xuICAgICAgICBjYXNlIEplOlxuICAgICAgICAgICAgcmV0dXJuIChlNDAuZGlzcGxheU5hbWUgfHwgXCJDb250ZXh0XCIpICsgXCIuQ29uc3VtZXJcIjtcbiAgICAgICAgY2FzZSBYZTpcbiAgICAgICAgICAgIHJldHVybiAoZTQwLl9jb250ZXh0LmRpc3BsYXlOYW1lIHx8IFwiQ29udGV4dFwiKSArIFwiLlByb3ZpZGVyXCI7XG4gICAgICAgIGNhc2UgWWU6XG4gICAgICAgICAgICB2YXIgcjIzID0gZTQwLnJlbmRlcjtcbiAgICAgICAgICAgIGU0MCA9IGU0MC5kaXNwbGF5TmFtZTtcbiAgICAgICAgICAgIGU0MCB8fCAoZTQwID0gcjIzLmRpc3BsYXlOYW1lIHx8IHIyMy5uYW1lIHx8IFwiXCIsIGU0MCA9IFwiXCIgIT09IGU0MCA/IFwiRm9yd2FyZFJlZihcIiArIGU0MCArIFwiKVwiIDogXCJGb3J3YXJkUmVmXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGU0MDtcbiAgICAgICAgY2FzZSBldDpcbiAgICAgICAgICAgIHJldHVybiByMjMgPSBlNDAuZGlzcGxheU5hbWUgfHwgbnVsbCwgbnVsbCAhPT0gcjIzID8gcjIzIDogVWIoZTQwLnR5cGUpIHx8IFwiTWVtb1wiO1xuICAgICAgICBjYXNlIHR0OlxuICAgICAgICAgICAgcjIzID0gZTQwLl9wYXlsb2FkO1xuICAgICAgICAgICAgZTQwID0gZTQwLl9pbml0O1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gVWIoZTQwKHIyMykpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG52YXIgY3QgPSB7fTtcbmZ1bmN0aW9uIFdiKGU0MSwgcjI0KSB7XG4gICAgZTQxID0gZTQxLmNvbnRleHRUeXBlcztcbiAgICBpZiAoIWU0MSkgcmV0dXJuIGN0O1xuICAgIHZhciBhMTMsIG85ID0ge307XG4gICAgZm9yKGExMyBpbiBlNDEpbzlbYTEzXSA9IHIyNFthMTNdO1xuICAgIHJldHVybiBvOTtcbn1cbnZhciB1dCA9IG51bGw7XG5mdW5jdGlvbiBOMShlNDIsIHIyNSkge1xuICAgIGlmIChlNDIgIT09IHIyNSkge1xuICAgICAgICBlNDIuY29udGV4dC5fY3VycmVudFZhbHVlID0gZTQyLnBhcmVudFZhbHVlO1xuICAgICAgICBlNDIgPSBlNDIucGFyZW50O1xuICAgICAgICB2YXIgYTE0ID0gcjI1LnBhcmVudDtcbiAgICAgICAgaWYgKG51bGwgPT09IGU0Mikge1xuICAgICAgICAgICAgaWYgKG51bGwgIT09IGExNCkgdGhyb3cgRXJyb3IobDIoNDAxKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobnVsbCA9PT0gYTE0KSB0aHJvdyBFcnJvcihsMig0MDEpKTtcbiAgICAgICAgICAgIE4xKGU0MiwgYTE0KTtcbiAgICAgICAgICAgIHIyNS5jb250ZXh0Ll9jdXJyZW50VmFsdWUgPSByMjUudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBYYihlNDMpIHtcbiAgICBlNDMuY29udGV4dC5fY3VycmVudFZhbHVlID0gZTQzLnBhcmVudFZhbHVlO1xuICAgIGU0MyA9IGU0My5wYXJlbnQ7XG4gICAgbnVsbCAhPT0gZTQzICYmIFhiKGU0Myk7XG59XG5mdW5jdGlvbiBZYihlNDQpIHtcbiAgICB2YXIgcjI2ID0gZTQ0LnBhcmVudDtcbiAgICBudWxsICE9PSByMjYgJiYgWWIocjI2KTtcbiAgICBlNDQuY29udGV4dC5fY3VycmVudFZhbHVlID0gZTQ0LnZhbHVlO1xufVxuZnVuY3Rpb24gWmIoZTQ1LCByMjcpIHtcbiAgICBlNDUuY29udGV4dC5fY3VycmVudFZhbHVlID0gZTQ1LnBhcmVudFZhbHVlO1xuICAgIGU0NSA9IGU0NS5wYXJlbnQ7XG4gICAgaWYgKG51bGwgPT09IGU0NSkgdGhyb3cgRXJyb3IobDIoNDAyKSk7XG4gICAgZTQ1LmRlcHRoID09PSByMjcuZGVwdGggPyBOMShlNDUsIHIyNykgOiBaYihlNDUsIHIyNyk7XG59XG5mdW5jdGlvbiAkYihlNDYsIHIyOCkge1xuICAgIHZhciBhMTUgPSByMjgucGFyZW50O1xuICAgIGlmIChudWxsID09PSBhMTUpIHRocm93IEVycm9yKGwyKDQwMikpO1xuICAgIGU0Ni5kZXB0aCA9PT0gYTE1LmRlcHRoID8gTjEoZTQ2LCBhMTUpIDogJGIoZTQ2LCBhMTUpO1xuICAgIHIyOC5jb250ZXh0Ll9jdXJyZW50VmFsdWUgPSByMjgudmFsdWU7XG59XG5mdW5jdGlvbiBPMShlNDcpIHtcbiAgICB2YXIgcjI5ID0gdXQ7XG4gICAgcjI5ICE9PSBlNDcgJiYgKG51bGwgPT09IHIyOSA/IFliKGU0NykgOiBudWxsID09PSBlNDcgPyBYYihyMjkpIDogcjI5LmRlcHRoID09PSBlNDcuZGVwdGggPyBOMShyMjksIGU0NykgOiByMjkuZGVwdGggPiBlNDcuZGVwdGggPyBaYihyMjksIGU0NykgOiAkYihyMjksIGU0NyksIHV0ID0gZTQ3KTtcbn1cbnZhciBzdCA9IHtcbiAgICBpc01vdW50ZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gITE7XG4gICAgfSxcbiAgICBlbnF1ZXVlU2V0U3RhdGU6IGZ1bmN0aW9uKGU0OCwgcjMwKSB7XG4gICAgICAgIGU0OCA9IGU0OC5fcmVhY3RJbnRlcm5hbHM7XG4gICAgICAgIG51bGwgIT09IGU0OC5xdWV1ZSAmJiBlNDgucXVldWUucHVzaChyMzApO1xuICAgIH0sXG4gICAgZW5xdWV1ZVJlcGxhY2VTdGF0ZTogZnVuY3Rpb24oZTQ5LCByMzEpIHtcbiAgICAgICAgZTQ5ID0gZTQ5Ll9yZWFjdEludGVybmFscztcbiAgICAgICAgZTQ5LnJlcGxhY2UgPSAhMDtcbiAgICAgICAgZTQ5LnF1ZXVlID0gW1xuICAgICAgICAgICAgcjMxXG4gICAgICAgIF07XG4gICAgfSxcbiAgICBlbnF1ZXVlRm9yY2VVcGRhdGU6IGZ1bmN0aW9uKCkge31cbn07XG5mdW5jdGlvbiBiYyhlNTAsIHIzMiwgYTE2LCBvMTApIHtcbiAgICB2YXIgaTcgPSB2b2lkIDAgIT09IGU1MC5zdGF0ZSA/IGU1MC5zdGF0ZSA6IG51bGw7XG4gICAgZTUwLnVwZGF0ZXIgPSBzdDtcbiAgICBlNTAucHJvcHMgPSBhMTY7XG4gICAgZTUwLnN0YXRlID0gaTc7XG4gICAgdmFyIHU1ID0ge1xuICAgICAgICBxdWV1ZTogW10sXG4gICAgICAgIHJlcGxhY2U6ICExXG4gICAgfTtcbiAgICBlNTAuX3JlYWN0SW50ZXJuYWxzID0gdTU7XG4gICAgdmFyIHMyMSA9IHIzMi5jb250ZXh0VHlwZTtcbiAgICBlNTAuY29udGV4dCA9IFwib2JqZWN0XCIgPT09IHR5cGVvZiBzMjEgJiYgbnVsbCAhPT0gczIxID8gczIxLl9jdXJyZW50VmFsdWUgOiBvMTA7XG4gICAgczIxID0gcjMyLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcztcbiAgICBcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBzMjEgJiYgKHMyMSA9IHMyMShhMTYsIGk3KSwgaTcgPSBudWxsID09PSBzMjEgfHwgdm9pZCAwID09PSBzMjEgPyBpNyA6IGMzKHt9LCBpNywgczIxKSwgZTUwLnN0YXRlID0gaTcpO1xuICAgIGlmIChcImZ1bmN0aW9uXCIgIT09IHR5cGVvZiByMzIuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzICYmIFwiZnVuY3Rpb25cIiAhPT0gdHlwZW9mIGU1MC5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSAmJiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YgZTUwLlVOU0FGRV9jb21wb25lbnRXaWxsTW91bnQgfHwgXCJmdW5jdGlvblwiID09PSB0eXBlb2YgZTUwLmNvbXBvbmVudFdpbGxNb3VudCkpIGlmIChyMzIgPSBlNTAuc3RhdGUsIFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGU1MC5jb21wb25lbnRXaWxsTW91bnQgJiYgZTUwLmNvbXBvbmVudFdpbGxNb3VudCgpLCBcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBlNTAuVU5TQUZFX2NvbXBvbmVudFdpbGxNb3VudCAmJiBlNTAuVU5TQUZFX2NvbXBvbmVudFdpbGxNb3VudCgpLCByMzIgIT09IGU1MC5zdGF0ZSAmJiBzdC5lbnF1ZXVlUmVwbGFjZVN0YXRlKGU1MCwgZTUwLnN0YXRlLCBudWxsKSwgbnVsbCAhPT0gdTUucXVldWUgJiYgMCA8IHU1LnF1ZXVlLmxlbmd0aCkgaWYgKHIzMiA9IHU1LnF1ZXVlLCBzMjEgPSB1NS5yZXBsYWNlLCB1NS5xdWV1ZSA9IG51bGwsIHU1LnJlcGxhY2UgPSAhMSwgczIxICYmIDEgPT09IHIzMi5sZW5ndGgpIGU1MC5zdGF0ZSA9IHIzMlswXTtcbiAgICBlbHNlIHtcbiAgICAgICAgdTUgPSBzMjEgPyByMzJbMF0gOiBlNTAuc3RhdGU7XG4gICAgICAgIGk3ID0gITA7XG4gICAgICAgIGZvcihzMjEgPSBzMjEgPyAxIDogMDsgczIxIDwgcjMyLmxlbmd0aDsgczIxKyspe1xuICAgICAgICAgICAgdmFyIGQxMSA9IHIzMltzMjFdO1xuICAgICAgICAgICAgZDExID0gXCJmdW5jdGlvblwiID09PSB0eXBlb2YgZDExID8gZDExLmNhbGwoZTUwLCB1NSwgYTE2LCBvMTApIDogZDExO1xuICAgICAgICAgICAgbnVsbCAhPSBkMTEgJiYgKGk3ID8gKGk3ID0gITEsIHU1ID0gYzMoe30sIHU1LCBkMTEpKSA6IGMzKHU1LCBkMTEpKTtcbiAgICAgICAgfVxuICAgICAgICBlNTAuc3RhdGUgPSB1NTtcbiAgICB9XG4gICAgZWxzZSB1NS5xdWV1ZSA9IG51bGw7XG59XG52YXIgZnQgPSB7XG4gICAgaWQ6IDEsXG4gICAgb3ZlcmZsb3c6IFwiXCJcbn07XG5mdW5jdGlvbiBkYyhlNTEsIHIzMywgYTE3KSB7XG4gICAgdmFyIG8xMSA9IGU1MS5pZDtcbiAgICBlNTEgPSBlNTEub3ZlcmZsb3c7XG4gICAgdmFyIGk4ID0gMzIgLSBkdChvMTEpIC0gMTtcbiAgICBvMTEgJj0gfigxIDw8IGk4KTtcbiAgICBhMTcgKz0gMTtcbiAgICB2YXIgYyA9IDMyIC0gZHQocjMzKSArIGk4O1xuICAgIGlmICgzMCA8IGMpIHtcbiAgICAgICAgdmFyIHU2ID0gaTggLSBpOCAlIDU7XG4gICAgICAgIGMgPSAobzExICYgKDEgPDwgdTYpIC0gMSkudG9TdHJpbmcoMzIpO1xuICAgICAgICBvMTEgPj49IHU2O1xuICAgICAgICBpOCAtPSB1NjtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiAxIDw8IDMyIC0gZHQocjMzKSArIGk4IHwgYTE3IDw8IGk4IHwgbzExLFxuICAgICAgICAgICAgb3ZlcmZsb3c6IGMgKyBlNTFcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IDEgPDwgYyB8IGExNyA8PCBpOCB8IG8xMSxcbiAgICAgICAgb3ZlcmZsb3c6IGU1MVxuICAgIH07XG59XG52YXIgZHQgPSBNYXRoLmNsejMyID8gTWF0aC5jbHozMiA6IGVjLCBwdCA9IE1hdGgubG9nLCBodCA9IE1hdGguTE4yO1xuZnVuY3Rpb24gZWMoZTUyKSB7XG4gICAgZTUyID4+Pj0gMDtcbiAgICByZXR1cm4gMCA9PT0gZTUyID8gMzIgOiAzMSAtIChwdChlNTIpIC8gaHQgfCAwKSB8IDA7XG59XG5mdW5jdGlvbiBoYyhlNTMsIHIzNCkge1xuICAgIHJldHVybiBlNTMgPT09IHIzNCAmJiAoMCAhPT0gZTUzIHx8IDEgLyBlNTMgPT09IDEgLyByMzQpIHx8IGU1MyAhPT0gZTUzICYmIHIzNCAhPT0gcjM0O1xufVxudmFyIGd0ID0gXCJmdW5jdGlvblwiID09PSB0eXBlb2YgT2JqZWN0LmlzID8gT2JqZWN0LmlzIDogaGMsIG10ID0gbnVsbCwgdnQgPSBudWxsLCBidCA9IG51bGwsIHl0ID0gbnVsbCwga3QgPSAhMSwgeHQgPSAhMSwgU3QgPSAwLCB3dCA9IG51bGwsIEN0ID0gMDtcbmZ1bmN0aW9uIFgoKSB7XG4gICAgaWYgKG51bGwgPT09IG10KSB0aHJvdyBFcnJvcihsMigzMjEpKTtcbiAgICByZXR1cm4gbXQ7XG59XG5mdW5jdGlvbiBsYygpIHtcbiAgICBpZiAoMCA8IEN0KSB0aHJvdyBFcnJvcihsMigzMTIpKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBtZW1vaXplZFN0YXRlOiBudWxsLFxuICAgICAgICBxdWV1ZTogbnVsbCxcbiAgICAgICAgbmV4dDogbnVsbFxuICAgIH07XG59XG5mdW5jdGlvbiBtYygpIHtcbiAgICBudWxsID09PSB5dCA/IG51bGwgPT09IGJ0ID8gKGt0ID0gITEsIGJ0ID0geXQgPSBsYygpKSA6IChrdCA9ICEwLCB5dCA9IGJ0KSA6IG51bGwgPT09IHl0Lm5leHQgPyAoa3QgPSAhMSwgeXQgPSB5dC5uZXh0ID0gbGMoKSkgOiAoa3QgPSAhMCwgeXQgPSB5dC5uZXh0KTtcbiAgICByZXR1cm4geXQ7XG59XG5mdW5jdGlvbiBuYygpIHtcbiAgICB2dCA9IG10ID0gbnVsbDtcbiAgICB4dCA9ICExO1xuICAgIGJ0ID0gbnVsbDtcbiAgICBDdCA9IDA7XG4gICAgeXQgPSB3dCA9IG51bGw7XG59XG5mdW5jdGlvbiBvYyhlNTQsIHIzNSkge1xuICAgIHJldHVybiBcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiByMzUgPyByMzUoZTU0KSA6IHIzNTtcbn1cbmZ1bmN0aW9uIHBjKGU1NSwgcjM2LCBhMTgpIHtcbiAgICBtdCA9IFgoKTtcbiAgICB5dCA9IG1jKCk7XG4gICAgaWYgKGt0KSB7XG4gICAgICAgIHZhciBvMTIgPSB5dC5xdWV1ZTtcbiAgICAgICAgcjM2ID0gbzEyLmRpc3BhdGNoO1xuICAgICAgICBpZiAobnVsbCAhPT0gd3QgJiYgKGExOCA9IHd0LmdldChvMTIpLCB2b2lkIDAgIT09IGExOCkpIHtcbiAgICAgICAgICAgIHd0LmRlbGV0ZShvMTIpO1xuICAgICAgICAgICAgbzEyID0geXQubWVtb2l6ZWRTdGF0ZTtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBvMTIgPSBlNTUobzEyLCBhMTguYWN0aW9uKSwgYTE4ID0gYTE4Lm5leHQ7XG4gICAgICAgICAgICB9d2hpbGUgKG51bGwgIT09IGExOClcbiAgICAgICAgICAgIHl0Lm1lbW9pemVkU3RhdGUgPSBvMTI7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIG8xMixcbiAgICAgICAgICAgICAgICByMzZcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHl0Lm1lbW9pemVkU3RhdGUsXG4gICAgICAgICAgICByMzZcbiAgICAgICAgXTtcbiAgICB9XG4gICAgZTU1ID0gZTU1ID09PSBvYyA/IFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIHIzNiA/IHIzNigpIDogcjM2IDogdm9pZCAwICE9PSBhMTggPyBhMTgocjM2KSA6IHIzNjtcbiAgICB5dC5tZW1vaXplZFN0YXRlID0gZTU1O1xuICAgIGU1NSA9IHl0LnF1ZXVlID0ge1xuICAgICAgICBsYXN0OiBudWxsLFxuICAgICAgICBkaXNwYXRjaDogbnVsbFxuICAgIH07XG4gICAgZTU1ID0gZTU1LmRpc3BhdGNoID0gcWMuYmluZChudWxsLCBtdCwgZTU1KTtcbiAgICByZXR1cm4gW1xuICAgICAgICB5dC5tZW1vaXplZFN0YXRlLFxuICAgICAgICBlNTVcbiAgICBdO1xufVxuZnVuY3Rpb24gcmMoZTU2LCByMzcpIHtcbiAgICBtdCA9IFgoKTtcbiAgICB5dCA9IG1jKCk7XG4gICAgcjM3ID0gdm9pZCAwID09PSByMzcgPyBudWxsIDogcjM3O1xuICAgIGlmIChudWxsICE9PSB5dCkge1xuICAgICAgICB2YXIgYTE5ID0geXQubWVtb2l6ZWRTdGF0ZTtcbiAgICAgICAgaWYgKG51bGwgIT09IGExOSAmJiBudWxsICE9PSByMzcpIHtcbiAgICAgICAgICAgIHZhciBvMTMgPSBhMTlbMV07XG4gICAgICAgICAgICBlOiBpZiAobnVsbCA9PT0gbzEzKSBvMTMgPSAhMTtcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvcih2YXIgaTkgPSAwOyBpOSA8IG8xMy5sZW5ndGggJiYgaTkgPCByMzcubGVuZ3RoOyBpOSsrKWlmICghZ3QocjM3W2k5XSwgbzEzW2k5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbzEzID0gITE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrIGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG8xMyA9ICEwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG8xMykgcmV0dXJuIGExOVswXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlNTYgPSBlNTYoKTtcbiAgICB5dC5tZW1vaXplZFN0YXRlID0gW1xuICAgICAgICBlNTYsXG4gICAgICAgIHIzN1xuICAgIF07XG4gICAgcmV0dXJuIGU1Njtcbn1cbmZ1bmN0aW9uIHFjKGU1NywgcjM4LCBhMjApIHtcbiAgICBpZiAoMjUgPD0gQ3QpIHRocm93IEVycm9yKGwyKDMwMSkpO1xuICAgIGlmIChlNTcgPT09IG10KSBpZiAoeHQgPSAhMCwgZTU3ID0ge1xuICAgICAgICBhY3Rpb246IGEyMCxcbiAgICAgICAgbmV4dDogbnVsbFxuICAgIH0sIG51bGwgPT09IHd0ICYmICh3dCA9IG5ldyBNYXApLCBhMjAgPSB3dC5nZXQocjM4KSwgdm9pZCAwID09PSBhMjApIHd0LnNldChyMzgsIGU1Nyk7XG4gICAgZWxzZSB7XG4gICAgICAgIGZvcihyMzggPSBhMjA7IG51bGwgIT09IHIzOC5uZXh0OylyMzggPSByMzgubmV4dDtcbiAgICAgICAgcjM4Lm5leHQgPSBlNTc7XG4gICAgfVxufVxuZnVuY3Rpb24gc2MoKSB7XG4gICAgdGhyb3cgRXJyb3IobDIoMzk0KSk7XG59XG5mdW5jdGlvbiB0YygpIHt9XG52YXIgRXQgPSB7XG4gICAgcmVhZENvbnRleHQ6IGZ1bmN0aW9uKGU1OCkge1xuICAgICAgICByZXR1cm4gZTU4Ll9jdXJyZW50VmFsdWU7XG4gICAgfSxcbiAgICB1c2VDb250ZXh0OiBmdW5jdGlvbihlNTkpIHtcbiAgICAgICAgWCgpO1xuICAgICAgICByZXR1cm4gZTU5Ll9jdXJyZW50VmFsdWU7XG4gICAgfSxcbiAgICB1c2VNZW1vOiByYyxcbiAgICB1c2VSZWR1Y2VyOiBwYyxcbiAgICB1c2VSZWY6IGZ1bmN0aW9uKGU2MCkge1xuICAgICAgICBtdCA9IFgoKTtcbiAgICAgICAgeXQgPSBtYygpO1xuICAgICAgICB2YXIgcjM5ID0geXQubWVtb2l6ZWRTdGF0ZTtcbiAgICAgICAgcmV0dXJuIG51bGwgPT09IHIzOSA/IChlNjAgPSB7XG4gICAgICAgICAgICBjdXJyZW50OiBlNjBcbiAgICAgICAgfSwgeXQubWVtb2l6ZWRTdGF0ZSA9IGU2MCkgOiByMzk7XG4gICAgfSxcbiAgICB1c2VTdGF0ZTogZnVuY3Rpb24oZTYxKSB7XG4gICAgICAgIHJldHVybiBwYyhvYywgZTYxKTtcbiAgICB9LFxuICAgIHVzZUluc2VydGlvbkVmZmVjdDogdGMsXG4gICAgdXNlTGF5b3V0RWZmZWN0OiBmdW5jdGlvbigpIHt9LFxuICAgIHVzZUNhbGxiYWNrOiBmdW5jdGlvbihlNjIsIHI0MCkge1xuICAgICAgICByZXR1cm4gcmMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gZTYyO1xuICAgICAgICB9LCByNDApO1xuICAgIH0sXG4gICAgdXNlSW1wZXJhdGl2ZUhhbmRsZTogdGMsXG4gICAgdXNlRWZmZWN0OiB0YyxcbiAgICB1c2VEZWJ1Z1ZhbHVlOiB0YyxcbiAgICB1c2VEZWZlcnJlZFZhbHVlOiBmdW5jdGlvbihlNjMpIHtcbiAgICAgICAgWCgpO1xuICAgICAgICByZXR1cm4gZTYzO1xuICAgIH0sXG4gICAgdXNlVHJhbnNpdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIFgoKTtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICExLFxuICAgICAgICAgICAgc2NcbiAgICAgICAgXTtcbiAgICB9LFxuICAgIHVzZUlkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGU2NCA9IHZ0LnRyZWVDb250ZXh0O1xuICAgICAgICB2YXIgcjQxID0gZTY0Lm92ZXJmbG93O1xuICAgICAgICBlNjQgPSBlNjQuaWQ7XG4gICAgICAgIGU2NCA9IChlNjQgJiB+KDEgPDwgMzIgLSBkdChlNjQpIC0gMSkpLnRvU3RyaW5nKDMyKSArIHI0MTtcbiAgICAgICAgdmFyIGEyMSA9IEZ0O1xuICAgICAgICBpZiAobnVsbCA9PT0gYTIxKSB0aHJvdyBFcnJvcihsMig0MDQpKTtcbiAgICAgICAgcjQxID0gU3QrKztcbiAgICAgICAgZTY0ID0gYTIxLmlkUHJlZml4ICsgZTY0O1xuICAgICAgICAwIDwgcjQxICYmIChlNjQgKz0gXCI6XCIgKyByNDEudG9TdHJpbmcoMzIpKTtcbiAgICAgICAgcmV0dXJuIGU2NDtcbiAgICB9LFxuICAgIHVzZU11dGFibGVTb3VyY2U6IGZ1bmN0aW9uKGU2NSwgcjQyKSB7XG4gICAgICAgIFgoKTtcbiAgICAgICAgcmV0dXJuIHI0MihlNjUuX3NvdXJjZSk7XG4gICAgfSxcbiAgICB1c2VTeW5jRXh0ZXJuYWxTdG9yZTogZnVuY3Rpb24oZSwgciwgYTIyKSB7XG4gICAgICAgIGlmICh2b2lkIDAgPT09IGEyMikgdGhyb3cgRXJyb3IobDIoNDA3KSk7XG4gICAgICAgIHJldHVybiBhMjIoKTtcbiAgICB9XG59LCBGdCA9IG51bGwsIFJ0ID0gdTIuX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQuUmVhY3RDdXJyZW50RGlzcGF0Y2hlcjtcbmZ1bmN0aW9uIHhjKGU2Nikge1xuICAgIGNvbnNvbGUuZXJyb3IoZTY2KTtcbn1cbmZ1bmN0aW9uIHljKCkge31cbmZ1bmN0aW9uIHpjKGU2NywgcjQzLCBhMjMsIG8xNCwgaTEwLCBjLCB1Nykge1xuICAgIHZhciBzMyA9IFtdLCBkMiA9IG5ldyBTZXQ7XG4gICAgcjQzID0ge1xuICAgICAgICBkZXN0aW5hdGlvbjogbnVsbCxcbiAgICAgICAgcmVzcG9uc2VTdGF0ZTogcjQzLFxuICAgICAgICBwcm9ncmVzc2l2ZUNodW5rU2l6ZTogdm9pZCAwID09PSBvMTQgPyAxMjgwMCA6IG8xNCxcbiAgICAgICAgc3RhdHVzOiAwLFxuICAgICAgICBmYXRhbEVycm9yOiBudWxsLFxuICAgICAgICBuZXh0U2VnbWVudElkOiAwLFxuICAgICAgICBhbGxQZW5kaW5nVGFza3M6IDAsXG4gICAgICAgIHBlbmRpbmdSb290VGFza3M6IDAsXG4gICAgICAgIGNvbXBsZXRlZFJvb3RTZWdtZW50OiBudWxsLFxuICAgICAgICBhYm9ydGFibGVUYXNrczogZDIsXG4gICAgICAgIHBpbmdlZFRhc2tzOiBzMyxcbiAgICAgICAgY2xpZW50UmVuZGVyZWRCb3VuZGFyaWVzOiBbXSxcbiAgICAgICAgY29tcGxldGVkQm91bmRhcmllczogW10sXG4gICAgICAgIHBhcnRpYWxCb3VuZGFyaWVzOiBbXSxcbiAgICAgICAgb25FcnJvcjogdm9pZCAwID09PSBpMTAgPyB4YyA6IGkxMCxcbiAgICAgICAgb25Db21wbGV0ZUFsbDogdm9pZCAwID09PSBjID8geWMgOiBjLFxuICAgICAgICBvbkNvbXBsZXRlU2hlbGw6IHZvaWQgMCA9PT0gdTcgPyB5YyA6IHU3XG4gICAgfTtcbiAgICBhMjMgPSBBYyhyNDMsIDAsIG51bGwsIGEyMyk7XG4gICAgYTIzLnBhcmVudEZsdXNoZWQgPSAhMDtcbiAgICBlNjcgPSBCYyhyNDMsIGU2NywgbnVsbCwgYTIzLCBkMiwgY3QsIG51bGwsIGZ0KTtcbiAgICBzMy5wdXNoKGU2Nyk7XG4gICAgcmV0dXJuIHI0Mztcbn1cbmZ1bmN0aW9uIEJjKGU2OCwgcjQ0LCBhMjQsIG8xNSwgaTExLCBjLCB1OCwgczQpIHtcbiAgICBlNjguYWxsUGVuZGluZ1Rhc2tzKys7XG4gICAgbnVsbCA9PT0gYTI0ID8gZTY4LnBlbmRpbmdSb290VGFza3MrKyA6IGEyNC5wZW5kaW5nVGFza3MrKztcbiAgICB2YXIgZDMgPSB7XG4gICAgICAgIG5vZGU6IHI0NCxcbiAgICAgICAgcGluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcjQ1ID0gZTY4LnBpbmdlZFRhc2tzO1xuICAgICAgICAgICAgcjQ1LnB1c2goZDMpO1xuICAgICAgICAgICAgMSA9PT0gcjQ1Lmxlbmd0aCAmJiBDYyhlNjgpO1xuICAgICAgICB9LFxuICAgICAgICBibG9ja2VkQm91bmRhcnk6IGEyNCxcbiAgICAgICAgYmxvY2tlZFNlZ21lbnQ6IG8xNSxcbiAgICAgICAgYWJvcnRTZXQ6IGkxMSxcbiAgICAgICAgbGVnYWN5Q29udGV4dDogYyxcbiAgICAgICAgY29udGV4dDogdTgsXG4gICAgICAgIHRyZWVDb250ZXh0OiBzNFxuICAgIH07XG4gICAgaTExLmFkZChkMyk7XG4gICAgcmV0dXJuIGQzO1xufVxuZnVuY3Rpb24gQWMoZSwgcjQ2LCBhMjUsIG8xNikge1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogMCxcbiAgICAgICAgaWQ6IC0xLFxuICAgICAgICBpbmRleDogcjQ2LFxuICAgICAgICBwYXJlbnRGbHVzaGVkOiAhMSxcbiAgICAgICAgY2h1bmtzOiBbXSxcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICBmb3JtYXRDb250ZXh0OiBvMTYsXG4gICAgICAgIGJvdW5kYXJ5OiBhMjVcbiAgICB9O1xufVxuZnVuY3Rpb24gWShlNjksIHI0Nykge1xuICAgIGU2OSA9IGU2OS5vbkVycm9yO1xuICAgIGU2OShyNDcpO1xufVxuZnVuY3Rpb24gRGMoZTcwLCByNDgpIHtcbiAgICBudWxsICE9PSBlNzAuZGVzdGluYXRpb24gPyAoZTcwLnN0YXR1cyA9IDIsIGNhKGU3MC5kZXN0aW5hdGlvbiwgcjQ4KSkgOiAoZTcwLnN0YXR1cyA9IDEsIGU3MC5mYXRhbEVycm9yID0gcjQ4KTtcbn1cbmZ1bmN0aW9uIEVjKGU3MSwgcjQ5LCBhMjYsIG8xNywgaTEyKSB7XG4gICAgbXQgPSB7fTtcbiAgICB2dCA9IHI0OTtcbiAgICBTdCA9IDA7XG4gICAgZm9yKGU3MSA9IGEyNihvMTcsIGkxMik7IHh0Oyl4dCA9ICExLCBTdCA9IDAsIEN0ICs9IDEsIHl0ID0gbnVsbCwgZTcxID0gYTI2KG8xNywgaTEyKTtcbiAgICBuYygpO1xuICAgIHJldHVybiBlNzE7XG59XG5mdW5jdGlvbiBGYyhlNzIsIHI1MCwgYTI3LCBvMTgpIHtcbiAgICB2YXIgaTEzID0gYTI3LnJlbmRlcigpLCB1OSA9IG8xOC5jaGlsZENvbnRleHRUeXBlcztcbiAgICBpZiAobnVsbCAhPT0gdTkgJiYgdm9pZCAwICE9PSB1OSkge1xuICAgICAgICB2YXIgczUgPSByNTAubGVnYWN5Q29udGV4dDtcbiAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiAhPT0gdHlwZW9mIGEyNy5nZXRDaGlsZENvbnRleHQpIG8xOCA9IHM1O1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGEyNyA9IGEyNy5nZXRDaGlsZENvbnRleHQoKTtcbiAgICAgICAgICAgIGZvcih2YXIgZDQgaW4gYTI3KWlmICghKGQ0IGluIHU5KSkgdGhyb3cgRXJyb3IobDIoMTA4LCBVYihvMTgpIHx8IFwiVW5rbm93blwiLCBkNCkpO1xuICAgICAgICAgICAgbzE4ID0gYzMoe30sIHM1LCBhMjcpO1xuICAgICAgICB9XG4gICAgICAgIHI1MC5sZWdhY3lDb250ZXh0ID0gbzE4O1xuICAgICAgICBaKGU3MiwgcjUwLCBpMTMpO1xuICAgICAgICByNTAubGVnYWN5Q29udGV4dCA9IHM1O1xuICAgIH0gZWxzZSBaKGU3MiwgcjUwLCBpMTMpO1xufVxuZnVuY3Rpb24gR2MoZTczLCByNTEpIHtcbiAgICBpZiAoZTczICYmIGU3My5kZWZhdWx0UHJvcHMpIHtcbiAgICAgICAgcjUxID0gYzMoe30sIHI1MSk7XG4gICAgICAgIGU3MyA9IGU3My5kZWZhdWx0UHJvcHM7XG4gICAgICAgIGZvcih2YXIgYTI4IGluIGU3Myl2b2lkIDAgPT09IHI1MVthMjhdICYmIChyNTFbYTI4XSA9IGU3M1thMjhdKTtcbiAgICAgICAgcmV0dXJuIHI1MTtcbiAgICB9XG4gICAgcmV0dXJuIHI1MTtcbn1cbmZ1bmN0aW9uIEhjKGU3NCwgcjUyLCBhMjksIG8xOSwgaTE0KSB7XG4gICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGEyOSkgaWYgKGEyOS5wcm90b3R5cGUgJiYgYTI5LnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50KSB7XG4gICAgICAgIGkxNCA9IFdiKGEyOSwgcjUyLmxlZ2FjeUNvbnRleHQpO1xuICAgICAgICB2YXIgYyA9IGEyOS5jb250ZXh0VHlwZTtcbiAgICAgICAgYyA9IG5ldyBhMjkobzE5LCBcIm9iamVjdFwiID09PSB0eXBlb2YgYyAmJiBudWxsICE9PSBjID8gYy5fY3VycmVudFZhbHVlIDogaTE0KTtcbiAgICAgICAgYmMoYywgYTI5LCBvMTksIGkxNCk7XG4gICAgICAgIEZjKGU3NCwgcjUyLCBjLCBhMjkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGMgPSBXYihhMjksIHI1Mi5sZWdhY3lDb250ZXh0KTtcbiAgICAgICAgaTE0ID0gRWMoZTc0LCByNTIsIGEyOSwgbzE5LCBjKTtcbiAgICAgICAgdmFyIHUxMCA9IDAgIT09IFN0O1xuICAgICAgICBpZiAoXCJvYmplY3RcIiA9PT0gdHlwZW9mIGkxNCAmJiBudWxsICE9PSBpMTQgJiYgXCJmdW5jdGlvblwiID09PSB0eXBlb2YgaTE0LnJlbmRlciAmJiB2b2lkIDAgPT09IGkxNC4kJHR5cGVvZikgYmMoaTE0LCBhMjksIG8xOSwgYyksIEZjKGU3NCwgcjUyLCBpMTQsIGEyOSk7XG4gICAgICAgIGVsc2UgaWYgKHUxMCkge1xuICAgICAgICAgICAgbzE5ID0gcjUyLnRyZWVDb250ZXh0O1xuICAgICAgICAgICAgcjUyLnRyZWVDb250ZXh0ID0gZGMobzE5LCAxLCAwKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgWihlNzQsIHI1MiwgaTE0KTtcbiAgICAgICAgICAgIH0gZmluYWxseXtcbiAgICAgICAgICAgICAgICByNTIudHJlZUNvbnRleHQgPSBvMTk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBaKGU3NCwgcjUyLCBpMTQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKFwic3RyaW5nXCIgIT09IHR5cGVvZiBhMjkpIHtcbiAgICAgICAgICAgIHN3aXRjaChhMjkpe1xuICAgICAgICAgICAgICAgIGNhc2UgYXQ6XG4gICAgICAgICAgICAgICAgY2FzZSBydDpcbiAgICAgICAgICAgICAgICBjYXNlIEdlOlxuICAgICAgICAgICAgICAgIGNhc2UgVWU6XG4gICAgICAgICAgICAgICAgY2FzZSBaZTpcbiAgICAgICAgICAgICAgICAgICAgWihlNzQsIHI1MiwgbzE5LmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhc2UgS2U6XG4gICAgICAgICAgICAgICAgICAgIFooZTc0LCByNTIsIG8xOS5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjYXNlIG50OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihsMigzNDMpKTtcbiAgICAgICAgICAgICAgICBjYXNlIFFlOlxuICAgICAgICAgICAgICAgICAgICBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhMjkgPSByNTIuYmxvY2tlZEJvdW5kYXJ5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaTE0ID0gcjUyLmJsb2NrZWRTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgYyA9IG8xOS5mYWxsYmFjaztcbiAgICAgICAgICAgICAgICAgICAgICAgIG8xOSA9IG8xOS5jaGlsZHJlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHUxMCA9IG5ldyBTZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgczYgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9vdFNlZ21lbnRJRDogLTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Rmx1c2hlZDogITEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVuZGluZ1Rhc2tzOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcmNlQ2xpZW50UmVuZGVyOiAhMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWRTZWdtZW50czogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnl0ZVNpemU6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsbGJhY2tBYm9ydGFibGVUYXNrczogdTEwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBkNSA9IEFjKGU3NCwgaTE0LmNodW5rcy5sZW5ndGgsIHM2LCBpMTQuZm9ybWF0Q29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpMTQuY2hpbGRyZW4ucHVzaChkNSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaDIgPSBBYyhlNzQsIDAsIG51bGwsIGkxNC5mb3JtYXRDb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGgyLnBhcmVudEZsdXNoZWQgPSAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHI1Mi5ibG9ja2VkQm91bmRhcnkgPSBzNjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHI1Mi5ibG9ja2VkU2VnbWVudCA9IGgyO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoSWMoZTc0LCByNTIsIG8xOSksIGgyLnN0YXR1cyA9IDEsIHM2LmNvbXBsZXRlZFNlZ21lbnRzLnB1c2goaDIpLCAwID09PSBzNi5wZW5kaW5nVGFza3MpIGJyZWFrIGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChyNTMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoMi5zdGF0dXMgPSA0LCBZKGU3NCwgcjUzKSwgczYuZm9yY2VDbGllbnRSZW5kZXIgPSAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByNTIuYmxvY2tlZEJvdW5kYXJ5ID0gYTI5LCByNTIuYmxvY2tlZFNlZ21lbnQgPSBpMTQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByNTIgPSBCYyhlNzQsIGMsIGEyOSwgZDUsIHUxMCwgcjUyLmxlZ2FjeUNvbnRleHQsIHI1Mi5jb250ZXh0LCByNTIudHJlZUNvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZTc0LnBpbmdlZFRhc2tzLnB1c2gocjUyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoXCJvYmplY3RcIiA9PT0gdHlwZW9mIGEyOSAmJiBudWxsICE9PSBhMjkpIHN3aXRjaChhMjkuJCR0eXBlb2Ype1xuICAgICAgICAgICAgICAgIGNhc2UgWWU6XG4gICAgICAgICAgICAgICAgICAgIG8xOSA9IEVjKGU3NCwgcjUyLCBhMjkucmVuZGVyLCBvMTksIGkxNCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICgwICE9PSBTdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYTI5ID0gcjUyLnRyZWVDb250ZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgcjUyLnRyZWVDb250ZXh0ID0gZGMoYTI5LCAxLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWihlNzQsIHI1MiwgbzE5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByNTIudHJlZUNvbnRleHQgPSBhMjk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBaKGU3NCwgcjUyLCBvMTkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY2FzZSBldDpcbiAgICAgICAgICAgICAgICAgICAgYTI5ID0gYTI5LnR5cGU7XG4gICAgICAgICAgICAgICAgICAgIG8xOSA9IEdjKGEyOSwgbzE5KTtcbiAgICAgICAgICAgICAgICAgICAgSGMoZTc0LCByNTIsIGEyOSwgbzE5LCBpMTQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY2FzZSBYZTpcbiAgICAgICAgICAgICAgICAgICAgaTE0ID0gbzE5LmNoaWxkcmVuO1xuICAgICAgICAgICAgICAgICAgICBhMjkgPSBhMjkuX2NvbnRleHQ7XG4gICAgICAgICAgICAgICAgICAgIG8xOSA9IG8xOS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYyA9IGEyOS5fY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBhMjkuX2N1cnJlbnRWYWx1ZSA9IG8xOTtcbiAgICAgICAgICAgICAgICAgICAgdTEwID0gdXQ7XG4gICAgICAgICAgICAgICAgICAgIHV0ID0gbzE5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50OiB1MTAsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXB0aDogbnVsbCA9PT0gdTEwID8gMCA6IHUxMC5kZXB0aCArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBhMjksXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRWYWx1ZTogYyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBvMTlcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgcjUyLmNvbnRleHQgPSBvMTk7XG4gICAgICAgICAgICAgICAgICAgIFooZTc0LCByNTIsIGkxNCk7XG4gICAgICAgICAgICAgICAgICAgIGU3NCA9IHV0O1xuICAgICAgICAgICAgICAgICAgICBpZiAobnVsbCA9PT0gZTc0KSB0aHJvdyBFcnJvcihsMig0MDMpKTtcbiAgICAgICAgICAgICAgICAgICAgZTc0LmNvbnRleHQuX2N1cnJlbnRWYWx1ZSA9IGU3NC5wYXJlbnRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgZTc0ID0gdXQgPSBlNzQucGFyZW50O1xuICAgICAgICAgICAgICAgICAgICByNTIuY29udGV4dCA9IGU3NDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhc2UgSmU6XG4gICAgICAgICAgICAgICAgICAgIG8xOSA9IG8xOS5jaGlsZHJlbjtcbiAgICAgICAgICAgICAgICAgICAgbzE5ID0gbzE5KGEyOS5fY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgWihlNzQsIHI1MiwgbzE5KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhc2UgdHQ6XG4gICAgICAgICAgICAgICAgICAgIGkxNCA9IGEyOS5faW5pdDtcbiAgICAgICAgICAgICAgICAgICAgYTI5ID0gaTE0KGEyOS5fcGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgICAgIG8xOSA9IEdjKGEyOSwgbzE5KTtcbiAgICAgICAgICAgICAgICAgICAgSGMoZTc0LCByNTIsIGEyOSwgbzE5LCB2b2lkIDApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihsMigxMzAsIG51bGwgPT0gYTI5ID8gYTI5IDogdHlwZW9mIGEyOSwgXCJcIikpO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaChpMTQgPSByNTIuYmxvY2tlZFNlZ21lbnQsIGMgPSBNYShpMTQuY2h1bmtzLCBhMjksIG8xOSwgZTc0LnJlc3BvbnNlU3RhdGUsIGkxNC5mb3JtYXRDb250ZXh0KSwgdTEwID0gaTE0LmZvcm1hdENvbnRleHQsIGkxNC5mb3JtYXRDb250ZXh0ID0gd2EodTEwLCBhMjksIG8xOSksIEljKGU3NCwgcjUyLCBjKSwgaTE0LmZvcm1hdENvbnRleHQgPSB1MTAsIGEyOSl7XG4gICAgICAgICAgICBjYXNlIFwiYXJlYVwiOlxuICAgICAgICAgICAgY2FzZSBcImJhc2VcIjpcbiAgICAgICAgICAgIGNhc2UgXCJiclwiOlxuICAgICAgICAgICAgY2FzZSBcImNvbFwiOlxuICAgICAgICAgICAgY2FzZSBcImVtYmVkXCI6XG4gICAgICAgICAgICBjYXNlIFwiaHJcIjpcbiAgICAgICAgICAgIGNhc2UgXCJpbWdcIjpcbiAgICAgICAgICAgIGNhc2UgXCJpbnB1dFwiOlxuICAgICAgICAgICAgY2FzZSBcImtleWdlblwiOlxuICAgICAgICAgICAgY2FzZSBcImxpbmtcIjpcbiAgICAgICAgICAgIGNhc2UgXCJtZXRhXCI6XG4gICAgICAgICAgICBjYXNlIFwicGFyYW1cIjpcbiAgICAgICAgICAgIGNhc2UgXCJzb3VyY2VcIjpcbiAgICAgICAgICAgIGNhc2UgXCJ0cmFja1wiOlxuICAgICAgICAgICAgY2FzZSBcIndiclwiOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpMTQuY2h1bmtzLnB1c2gocmUsIHAyKGEyOSksIGFlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIFooZTc1LCByNTQsIGEzMCkge1xuICAgIHI1NC5ub2RlID0gYTMwO1xuICAgIGlmIChcIm9iamVjdFwiID09PSB0eXBlb2YgYTMwICYmIG51bGwgIT09IGEzMCkge1xuICAgICAgICBzd2l0Y2goYTMwLiQkdHlwZW9mKXtcbiAgICAgICAgICAgIGNhc2UgcWU6XG4gICAgICAgICAgICAgICAgSGMoZTc1LCByNTQsIGEzMC50eXBlLCBhMzAucHJvcHMsIGEzMC5yZWYpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgV2U6XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IobDIoMjU3KSk7XG4gICAgICAgICAgICBjYXNlIHR0OlxuICAgICAgICAgICAgICAgIHZhciBvMjAgPSBhMzAuX2luaXQ7XG4gICAgICAgICAgICAgICAgYTMwID0gbzIwKGEzMC5fcGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgWihlNzUsIHI1NCwgYTMwKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEYoYTMwKSkge1xuICAgICAgICAgICAgSmMoZTc1LCByNTQsIGEzMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbnVsbCA9PT0gYTMwIHx8IFwib2JqZWN0XCIgIT09IHR5cGVvZiBhMzAgPyBvMjAgPSBudWxsIDogKG8yMCA9IGl0ICYmIGEzMFtpdF0gfHwgYTMwW1wiQEBpdGVyYXRvclwiXSwgbzIwID0gXCJmdW5jdGlvblwiID09PSB0eXBlb2YgbzIwID8gbzIwIDogbnVsbCk7XG4gICAgICAgIGlmIChvMjAgJiYgKG8yMCA9IG8yMC5jYWxsKGEzMCkpKSB7XG4gICAgICAgICAgICBhMzAgPSBvMjAubmV4dCgpO1xuICAgICAgICAgICAgaWYgKCFhMzAuZG9uZSkge1xuICAgICAgICAgICAgICAgIHZhciBpMTUgPSBbXTtcbiAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIGkxNS5wdXNoKGEzMC52YWx1ZSksIGEzMCA9IG8yMC5uZXh0KCk7XG4gICAgICAgICAgICAgICAgfXdoaWxlICghYTMwLmRvbmUpXG4gICAgICAgICAgICAgICAgSmMoZTc1LCByNTQsIGkxNSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcjU0ID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEzMCk7XG4gICAgICAgIHRocm93IEVycm9yKGwyKDMxLCBcIltvYmplY3QgT2JqZWN0XVwiID09PSByNTQgPyBcIm9iamVjdCB3aXRoIGtleXMge1wiICsgT2JqZWN0LmtleXMoYTMwKS5qb2luKFwiLCBcIikgKyBcIn1cIiA6IHI1NCkpO1xuICAgIH1cbiAgICBcInN0cmluZ1wiID09PSB0eXBlb2YgYTMwID8gXCJcIiAhPT0gYTMwICYmIHI1NC5ibG9ja2VkU2VnbWVudC5jaHVua3MucHVzaChwMih5MyhhMzApKSwgQikgOiBcIm51bWJlclwiID09PSB0eXBlb2YgYTMwICYmIChlNzUgPSBcIlwiICsgYTMwLCBcIlwiICE9PSBlNzUgJiYgcjU0LmJsb2NrZWRTZWdtZW50LmNodW5rcy5wdXNoKHAyKHkzKGU3NSkpLCBCKSk7XG59XG5mdW5jdGlvbiBKYyhlNzYsIHI1NSwgYTMxKSB7XG4gICAgZm9yKHZhciBvMjEgPSBhMzEubGVuZ3RoLCBpMTYgPSAwOyBpMTYgPCBvMjE7IGkxNisrKXtcbiAgICAgICAgdmFyIGMgPSByNTUudHJlZUNvbnRleHQ7XG4gICAgICAgIHI1NS50cmVlQ29udGV4dCA9IGRjKGMsIG8yMSwgaTE2KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIEljKGU3NiwgcjU1LCBhMzFbaTE2XSk7XG4gICAgICAgIH0gZmluYWxseXtcbiAgICAgICAgICAgIHI1NS50cmVlQ29udGV4dCA9IGM7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBJYyhlNzcsIHI1NiwgYTMyKSB7XG4gICAgdmFyIG8yMiA9IHI1Ni5ibG9ja2VkU2VnbWVudC5mb3JtYXRDb250ZXh0LCBpMTcgPSByNTYubGVnYWN5Q29udGV4dCwgYyA9IHI1Ni5jb250ZXh0O1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBaKGU3NywgcjU2LCBhMzIpO1xuICAgIH0gY2F0Y2ggKGQ2KSB7XG4gICAgICAgIGlmIChuYygpLCBcIm9iamVjdFwiICE9PSB0eXBlb2YgZDYgfHwgbnVsbCA9PT0gZDYgfHwgXCJmdW5jdGlvblwiICE9PSB0eXBlb2YgZDYudGhlbikgdGhyb3cgcjU2LmJsb2NrZWRTZWdtZW50LmZvcm1hdENvbnRleHQgPSBvMjIsIHI1Ni5sZWdhY3lDb250ZXh0ID0gaTE3LCByNTYuY29udGV4dCA9IGMsIE8xKGMpLCBkNjtcbiAgICAgICAgYTMyID0gZDY7XG4gICAgICAgIHZhciB1MTEgPSByNTYuYmxvY2tlZFNlZ21lbnQsIHM3ID0gQWMoZTc3LCB1MTEuY2h1bmtzLmxlbmd0aCwgbnVsbCwgdTExLmZvcm1hdENvbnRleHQpO1xuICAgICAgICB1MTEuY2hpbGRyZW4ucHVzaChzNyk7XG4gICAgICAgIGU3NyA9IEJjKGU3NywgcjU2Lm5vZGUsIHI1Ni5ibG9ja2VkQm91bmRhcnksIHM3LCByNTYuYWJvcnRTZXQsIHI1Ni5sZWdhY3lDb250ZXh0LCByNTYuY29udGV4dCwgcjU2LnRyZWVDb250ZXh0KS5waW5nO1xuICAgICAgICBhMzIudGhlbihlNzcsIGU3Nyk7XG4gICAgICAgIHI1Ni5ibG9ja2VkU2VnbWVudC5mb3JtYXRDb250ZXh0ID0gbzIyO1xuICAgICAgICByNTYubGVnYWN5Q29udGV4dCA9IGkxNztcbiAgICAgICAgcjU2LmNvbnRleHQgPSBjO1xuICAgICAgICBPMShjKTtcbiAgICB9XG59XG5mdW5jdGlvbiBLYyhlNzgpIHtcbiAgICB2YXIgcjU3ID0gZTc4LmJsb2NrZWRCb3VuZGFyeTtcbiAgICBlNzggPSBlNzguYmxvY2tlZFNlZ21lbnQ7XG4gICAgZTc4LnN0YXR1cyA9IDM7XG4gICAgTGModGhpcywgcjU3LCBlNzgpO1xufVxuZnVuY3Rpb24gTWMoZTc5KSB7XG4gICAgdmFyIHI1OCA9IGU3OS5ibG9ja2VkQm91bmRhcnk7XG4gICAgZTc5LmJsb2NrZWRTZWdtZW50LnN0YXR1cyA9IDM7XG4gICAgbnVsbCA9PT0gcjU4ID8gKHRoaXMuYWxsUGVuZGluZ1Rhc2tzLS0sIDIgIT09IHRoaXMuc3RhdHVzICYmICh0aGlzLnN0YXR1cyA9IDIsIG51bGwgIT09IHRoaXMuZGVzdGluYXRpb24gJiYgdGhpcy5kZXN0aW5hdGlvbi5jbG9zZSgpKSkgOiAocjU4LnBlbmRpbmdUYXNrcy0tLCByNTguZm9yY2VDbGllbnRSZW5kZXIgfHwgKHI1OC5mb3JjZUNsaWVudFJlbmRlciA9ICEwLCByNTgucGFyZW50Rmx1c2hlZCAmJiB0aGlzLmNsaWVudFJlbmRlcmVkQm91bmRhcmllcy5wdXNoKHI1OCkpLCByNTguZmFsbGJhY2tBYm9ydGFibGVUYXNrcy5mb3JFYWNoKE1jLCB0aGlzKSwgcjU4LmZhbGxiYWNrQWJvcnRhYmxlVGFza3MuY2xlYXIoKSwgdGhpcy5hbGxQZW5kaW5nVGFza3MtLSwgMCA9PT0gdGhpcy5hbGxQZW5kaW5nVGFza3MgJiYgKGU3OSA9IHRoaXMub25Db21wbGV0ZUFsbCwgZTc5KCkpKTtcbn1cbmZ1bmN0aW9uIExjKGU4MCwgcjU5LCBhMzMpIHtcbiAgICBpZiAobnVsbCA9PT0gcjU5KSB7XG4gICAgICAgIGlmIChhMzMucGFyZW50Rmx1c2hlZCkge1xuICAgICAgICAgICAgaWYgKG51bGwgIT09IGU4MC5jb21wbGV0ZWRSb290U2VnbWVudCkgdGhyb3cgRXJyb3IobDIoMzg5KSk7XG4gICAgICAgICAgICBlODAuY29tcGxldGVkUm9vdFNlZ21lbnQgPSBhMzM7XG4gICAgICAgIH1cbiAgICAgICAgZTgwLnBlbmRpbmdSb290VGFza3MtLTtcbiAgICAgICAgMCA9PT0gZTgwLnBlbmRpbmdSb290VGFza3MgJiYgKHI1OSA9IGU4MC5vbkNvbXBsZXRlU2hlbGwsIHI1OSgpKTtcbiAgICB9IGVsc2UgaWYgKHI1OS5wZW5kaW5nVGFza3MtLSwgIXI1OS5mb3JjZUNsaWVudFJlbmRlcikge1xuICAgICAgICBpZiAoMCA9PT0gcjU5LnBlbmRpbmdUYXNrcykgYTMzLnBhcmVudEZsdXNoZWQgJiYgMSA9PT0gYTMzLnN0YXR1cyAmJiByNTkuY29tcGxldGVkU2VnbWVudHMucHVzaChhMzMpLCByNTkucGFyZW50Rmx1c2hlZCAmJiBlODAuY29tcGxldGVkQm91bmRhcmllcy5wdXNoKHI1OSksIHI1OS5mYWxsYmFja0Fib3J0YWJsZVRhc2tzLmZvckVhY2goS2MsIGU4MCksIHI1OS5mYWxsYmFja0Fib3J0YWJsZVRhc2tzLmNsZWFyKCk7XG4gICAgICAgIGVsc2UgaWYgKGEzMy5wYXJlbnRGbHVzaGVkICYmIDEgPT09IGEzMy5zdGF0dXMpIHtcbiAgICAgICAgICAgIHZhciBvMjMgPSByNTkuY29tcGxldGVkU2VnbWVudHM7XG4gICAgICAgICAgICBvMjMucHVzaChhMzMpO1xuICAgICAgICAgICAgMSA9PT0gbzIzLmxlbmd0aCAmJiByNTkucGFyZW50Rmx1c2hlZCAmJiBlODAucGFydGlhbEJvdW5kYXJpZXMucHVzaChyNTkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGU4MC5hbGxQZW5kaW5nVGFza3MtLTtcbiAgICAwID09PSBlODAuYWxsUGVuZGluZ1Rhc2tzICYmIChlODAgPSBlODAub25Db21wbGV0ZUFsbCwgZTgwKCkpO1xufVxuZnVuY3Rpb24gQ2MoZTgxKSB7XG4gICAgaWYgKDIgIT09IGU4MS5zdGF0dXMpIHtcbiAgICAgICAgdmFyIHI2MSA9IHV0LCBhMzQgPSBSdC5jdXJyZW50O1xuICAgICAgICBSdC5jdXJyZW50ID0gRXQ7XG4gICAgICAgIHZhciBvMjQgPSBGdDtcbiAgICAgICAgRnQgPSBlODEucmVzcG9uc2VTdGF0ZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBpMTgsIGMgPSBlODEucGluZ2VkVGFza3M7XG4gICAgICAgICAgICBmb3IoaTE4ID0gMDsgaTE4IDwgYy5sZW5ndGg7IGkxOCsrKXtcbiAgICAgICAgICAgICAgICB2YXIgdTEyID0gY1tpMThdO1xuICAgICAgICAgICAgICAgIHZhciBzOCA9IGU4MSwgZDcgPSB1MTIuYmxvY2tlZFNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgaWYgKDAgPT09IGQ3LnN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICBPMSh1MTIuY29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBaKHM4LCB1MTIsIHUxMi5ub2RlKSwgdTEyLmFib3J0U2V0LmRlbGV0ZSh1MTIpLCBkNy5zdGF0dXMgPSAxLCBMYyhzOCwgdTEyLmJsb2NrZWRCb3VuZGFyeSwgZDcpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlODIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYygpLCBcIm9iamVjdFwiID09PSB0eXBlb2YgZTgyICYmIG51bGwgIT09IGU4MiAmJiBcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBlODIudGhlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoMyA9IHUxMi5waW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGU4Mi50aGVuKGgzLCBoMyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHUxMi5hYm9ydFNldC5kZWxldGUodTEyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkNy5zdGF0dXMgPSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnMjEgPSB1MTIuYmxvY2tlZEJvdW5kYXJ5LCBtMjEgPSBlODI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWShzOCwgbTIxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsID09PSBnMjEgPyBEYyhzOCwgbTIxKSA6IChnMjEucGVuZGluZ1Rhc2tzLS0sIGcyMS5mb3JjZUNsaWVudFJlbmRlciB8fCAoZzIxLmZvcmNlQ2xpZW50UmVuZGVyID0gITAsIGcyMS5wYXJlbnRGbHVzaGVkICYmIHM4LmNsaWVudFJlbmRlcmVkQm91bmRhcmllcy5wdXNoKGcyMSkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzOC5hbGxQZW5kaW5nVGFza3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PT0gczguYWxsUGVuZGluZ1Rhc2tzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiMiA9IHM4Lm9uQ29tcGxldGVBbGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGIyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYy5zcGxpY2UoMCwgaTE4KTtcbiAgICAgICAgICAgIG51bGwgIT09IGU4MS5kZXN0aW5hdGlvbiAmJiBOYyhlODEsIGU4MS5kZXN0aW5hdGlvbik7XG4gICAgICAgIH0gY2F0Y2ggKHI2MCkge1xuICAgICAgICAgICAgWShlODEsIHI2MCksIERjKGU4MSwgcjYwKTtcbiAgICAgICAgfSBmaW5hbGx5e1xuICAgICAgICAgICAgRnQgPSBvMjQsIFJ0LmN1cnJlbnQgPSBhMzQsIGEzNCA9PT0gRXQgJiYgTzEocjYxKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIE9jKGU4MywgcjYyLCBhMzUpIHtcbiAgICBhMzUucGFyZW50Rmx1c2hlZCA9ICEwO1xuICAgIHN3aXRjaChhMzUuc3RhdHVzKXtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgdmFyIG8yNSA9IGEzNS5pZCA9IGU4My5uZXh0U2VnbWVudElkKys7XG4gICAgICAgICAgICBlODMgPSBlODMucmVzcG9uc2VTdGF0ZTtcbiAgICAgICAgICAgIG40KHI2Miwgb2UpO1xuICAgICAgICAgICAgbjQocjYyLCBlODMucGxhY2Vob2xkZXJQcmVmaXgpO1xuICAgICAgICAgICAgZTgzID0gcDIobzI1LnRvU3RyaW5nKDE2KSk7XG4gICAgICAgICAgICBuNChyNjIsIGU4Myk7XG4gICAgICAgICAgICByZXR1cm4gbjQocjYyLCBsZSk7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGEzNS5zdGF0dXMgPSAyO1xuICAgICAgICAgICAgdmFyIGkxOSA9ICEwO1xuICAgICAgICAgICAgbzI1ID0gYTM1LmNodW5rcztcbiAgICAgICAgICAgIHZhciBjID0gMDtcbiAgICAgICAgICAgIGEzNSA9IGEzNS5jaGlsZHJlbjtcbiAgICAgICAgICAgIGZvcih2YXIgdTEzID0gMDsgdTEzIDwgYTM1Lmxlbmd0aDsgdTEzKyspe1xuICAgICAgICAgICAgICAgIGZvcihpMTkgPSBhMzVbdTEzXTsgYyA8IGkxOS5pbmRleDsgYysrKW40KHI2MiwgbzI1W2NdKTtcbiAgICAgICAgICAgICAgICBpMTkgPSBQYyhlODMsIHI2MiwgaTE5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcig7IGMgPCBvMjUubGVuZ3RoOyBjKyspaTE5ID0gbjQocjYyLCBvMjVbY10pO1xuICAgICAgICAgICAgcmV0dXJuIGkxOTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IEVycm9yKGwyKDM5MCkpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIFBjKGU4NCwgcjYzLCBhMzYpIHtcbiAgICB2YXIgbzI2ID0gYTM2LmJvdW5kYXJ5O1xuICAgIGlmIChudWxsID09PSBvMjYpIHJldHVybiBPYyhlODQsIHI2MywgYTM2KTtcbiAgICBvMjYucGFyZW50Rmx1c2hlZCA9ICEwO1xuICAgIGlmIChvMjYuZm9yY2VDbGllbnRSZW5kZXIpIG40KHI2Mywgc2UpLCBPYyhlODQsIHI2MywgYTM2KTtcbiAgICBlbHNlIGlmICgwIDwgbzI2LnBlbmRpbmdUYXNrcykge1xuICAgICAgICBvMjYucm9vdFNlZ21lbnRJRCA9IGU4NC5uZXh0U2VnbWVudElkKys7XG4gICAgICAgIDAgPCBvMjYuY29tcGxldGVkU2VnbWVudHMubGVuZ3RoICYmIGU4NC5wYXJ0aWFsQm91bmRhcmllcy5wdXNoKG8yNik7XG4gICAgICAgIHZhciBpMjAgPSBlODQucmVzcG9uc2VTdGF0ZTtcbiAgICAgICAgdmFyIGMgPSBpMjAubmV4dFN1c3BlbnNlSUQrKztcbiAgICAgICAgaTIwID0gdDQoaTIwLmJvdW5kYXJ5UHJlZml4ICsgYy50b1N0cmluZygxNikpO1xuICAgICAgICBvMjYgPSBvMjYuaWQgPSBpMjA7XG4gICAgICAgIFdhKHI2MywgZTg0LnJlc3BvbnNlU3RhdGUsIG8yNik7XG4gICAgICAgIE9jKGU4NCwgcjYzLCBhMzYpO1xuICAgIH0gZWxzZSBpZiAobzI2LmJ5dGVTaXplID4gZTg0LnByb2dyZXNzaXZlQ2h1bmtTaXplKSBvMjYucm9vdFNlZ21lbnRJRCA9IGU4NC5uZXh0U2VnbWVudElkKyssIGU4NC5jb21wbGV0ZWRCb3VuZGFyaWVzLnB1c2gobzI2KSwgV2EocjYzLCBlODQucmVzcG9uc2VTdGF0ZSwgbzI2LmlkKSwgT2MoZTg0LCByNjMsIGEzNik7XG4gICAgZWxzZSB7XG4gICAgICAgIG40KHI2MywgaWUpO1xuICAgICAgICBhMzYgPSBvMjYuY29tcGxldGVkU2VnbWVudHM7XG4gICAgICAgIGlmICgxICE9PSBhMzYubGVuZ3RoKSB0aHJvdyBFcnJvcihsMigzOTEpKTtcbiAgICAgICAgUGMoZTg0LCByNjMsIGEzNlswXSk7XG4gICAgfVxuICAgIHJldHVybiBuNChyNjMsIGZlKTtcbn1cbmZ1bmN0aW9uIFFjKGU4NSwgcjY0LCBhMzcpIHtcbiAgICByYihyNjQsIGU4NS5yZXNwb25zZVN0YXRlLCBhMzcuZm9ybWF0Q29udGV4dCwgYTM3LmlkKTtcbiAgICBQYyhlODUsIHI2NCwgYTM3KTtcbiAgICByZXR1cm4gc2IocjY0LCBhMzcuZm9ybWF0Q29udGV4dCk7XG59XG5mdW5jdGlvbiBSYyhlODYsIHI2NSwgYTM4KSB7XG4gICAgZm9yKHZhciBvMjcgPSBhMzguY29tcGxldGVkU2VnbWVudHMsIGkyMSA9IDA7IGkyMSA8IG8yNy5sZW5ndGg7IGkyMSsrKVNjKGU4NiwgcjY1LCBhMzgsIG8yN1tpMjFdKTtcbiAgICBvMjcubGVuZ3RoID0gMDtcbiAgICBlODYgPSBlODYucmVzcG9uc2VTdGF0ZTtcbiAgICBvMjcgPSBhMzguaWQ7XG4gICAgYTM4ID0gYTM4LnJvb3RTZWdtZW50SUQ7XG4gICAgbjQocjY1LCBlODYuc3RhcnRJbmxpbmVTY3JpcHQpO1xuICAgIGU4Ni5zZW50Q29tcGxldGVCb3VuZGFyeUZ1bmN0aW9uID8gbjQocjY1LCBMZSkgOiAoZTg2LnNlbnRDb21wbGV0ZUJvdW5kYXJ5RnVuY3Rpb24gPSAhMCwgbjQocjY1LCBPZSkpO1xuICAgIGlmIChudWxsID09PSBvMjcpIHRocm93IEVycm9yKGwyKDM5NSkpO1xuICAgIGEzOCA9IHAyKGEzOC50b1N0cmluZygxNikpO1xuICAgIG40KHI2NSwgbzI3KTtcbiAgICBuNChyNjUsICRlKTtcbiAgICBuNChyNjUsIGU4Ni5zZWdtZW50UHJlZml4KTtcbiAgICBuNChyNjUsIGEzOCk7XG4gICAgcmV0dXJuIG40KHI2NSwgamUpO1xufVxuZnVuY3Rpb24gU2MoZTg3LCByNjYsIGEzOSwgbzI4KSB7XG4gICAgaWYgKDIgPT09IG8yOC5zdGF0dXMpIHJldHVybiAhMDtcbiAgICB2YXIgaTIyID0gbzI4LmlkO1xuICAgIGlmICgtMSA9PT0gaTIyKSB7XG4gICAgICAgIGlmICgtMSA9PT0gKG8yOC5pZCA9IGEzOS5yb290U2VnbWVudElEKSkgdGhyb3cgRXJyb3IobDIoMzkyKSk7XG4gICAgICAgIHJldHVybiBRYyhlODcsIHI2NiwgbzI4KTtcbiAgICB9XG4gICAgUWMoZTg3LCByNjYsIG8yOCk7XG4gICAgZTg3ID0gZTg3LnJlc3BvbnNlU3RhdGU7XG4gICAgbjQocjY2LCBlODcuc3RhcnRJbmxpbmVTY3JpcHQpO1xuICAgIGU4Ny5zZW50Q29tcGxldGVTZWdtZW50RnVuY3Rpb24gPyBuNChyNjYsIEJlKSA6IChlODcuc2VudENvbXBsZXRlU2VnbWVudEZ1bmN0aW9uID0gITAsIG40KHI2NiwgemUpKTtcbiAgICBuNChyNjYsIGU4Ny5zZWdtZW50UHJlZml4KTtcbiAgICBpMjIgPSBwMihpMjIudG9TdHJpbmcoMTYpKTtcbiAgICBuNChyNjYsIGkyMik7XG4gICAgbjQocjY2LCBOZSk7XG4gICAgbjQocjY2LCBlODcucGxhY2Vob2xkZXJQcmVmaXgpO1xuICAgIG40KHI2NiwgaTIyKTtcbiAgICByZXR1cm4gbjQocjY2LCBEZSk7XG59XG5mdW5jdGlvbiBOYyhlODgsIHI2Nykge1xuICAgIHRyeSB7XG4gICAgICAgIHZhciBhNDAgPSBlODguY29tcGxldGVkUm9vdFNlZ21lbnQ7XG4gICAgICAgIGlmIChudWxsICE9PSBhNDAgJiYgMCA9PT0gZTg4LnBlbmRpbmdSb290VGFza3MpIHtcbiAgICAgICAgICAgIFBjKGU4OCwgcjY3LCBhNDApO1xuICAgICAgICAgICAgZTg4LmNvbXBsZXRlZFJvb3RTZWdtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIHZhciBvMjkgPSBlODgucmVzcG9uc2VTdGF0ZS5ib290c3RyYXBDaHVua3M7XG4gICAgICAgICAgICBmb3IoYTQwID0gMDsgYTQwIDwgbzI5Lmxlbmd0aDsgYTQwKyspbjQocjY3LCBvMjlbYTQwXSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGkyMywgYyA9IGU4OC5jbGllbnRSZW5kZXJlZEJvdW5kYXJpZXM7XG4gICAgICAgIGZvcihpMjMgPSAwOyBpMjMgPCBjLmxlbmd0aDsgaTIzKyspe1xuICAgICAgICAgICAgbzI5ID0gcjY3O1xuICAgICAgICAgICAgdmFyIHUxNCA9IGU4OC5yZXNwb25zZVN0YXRlLCBzOSA9IGNbaTIzXS5pZDtcbiAgICAgICAgICAgIG40KG8yOSwgdTE0LnN0YXJ0SW5saW5lU2NyaXB0KTtcbiAgICAgICAgICAgIHUxNC5zZW50Q2xpZW50UmVuZGVyRnVuY3Rpb24gPyBuNChvMjksIFZlKSA6ICh1MTQuc2VudENsaWVudFJlbmRlckZ1bmN0aW9uID0gITAsIG40KG8yOSwgQWUpKTtcbiAgICAgICAgICAgIGlmIChudWxsID09PSBzOSkgdGhyb3cgRXJyb3IobDIoMzk1KSk7XG4gICAgICAgICAgICBuNChvMjksIHM5KTtcbiAgICAgICAgICAgIGlmICghbjQobzI5LCBIZSkpIHtcbiAgICAgICAgICAgICAgICBlODguZGVzdGluYXRpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgIGkyMysrO1xuICAgICAgICAgICAgICAgIGMuc3BsaWNlKDAsIGkyMyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGMuc3BsaWNlKDAsIGkyMyk7XG4gICAgICAgIHZhciBkOCA9IGU4OC5jb21wbGV0ZWRCb3VuZGFyaWVzO1xuICAgICAgICBmb3IoaTIzID0gMDsgaTIzIDwgZDgubGVuZ3RoOyBpMjMrKylpZiAoIVJjKGU4OCwgcjY3LCBkOFtpMjNdKSkge1xuICAgICAgICAgICAgZTg4LmRlc3RpbmF0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIGkyMysrO1xuICAgICAgICAgICAgZDguc3BsaWNlKDAsIGkyMyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZDguc3BsaWNlKDAsIGkyMyk7XG4gICAgICAgIHZhciBoNCA9IGU4OC5wYXJ0aWFsQm91bmRhcmllcztcbiAgICAgICAgZm9yKGkyMyA9IDA7IGkyMyA8IGg0Lmxlbmd0aDsgaTIzKyspe1xuICAgICAgICAgICAgdmFyIGczMSA9IGg0W2kyM107XG4gICAgICAgICAgICBlOiB7XG4gICAgICAgICAgICAgICAgYyA9IGU4ODtcbiAgICAgICAgICAgICAgICB1MTQgPSByNjc7XG4gICAgICAgICAgICAgICAgdmFyIG0zID0gZzMxLmNvbXBsZXRlZFNlZ21lbnRzO1xuICAgICAgICAgICAgICAgIGZvcihzOSA9IDA7IHM5IDwgbTMubGVuZ3RoOyBzOSsrKWlmICghU2MoYywgdTE0LCBnMzEsIG0zW3M5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgczkrKztcbiAgICAgICAgICAgICAgICAgICAgbTMuc3BsaWNlKDAsIHM5KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGIgPSAhMTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWsgZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbTMuc3BsaWNlKDAsIHM5KTtcbiAgICAgICAgICAgICAgICBiID0gITA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWIpIHtcbiAgICAgICAgICAgICAgICBlODguZGVzdGluYXRpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgIGkyMysrO1xuICAgICAgICAgICAgICAgIGg0LnNwbGljZSgwLCBpMjMpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBoNC5zcGxpY2UoMCwgaTIzKTtcbiAgICAgICAgdmFyIGsyMSA9IGU4OC5jb21wbGV0ZWRCb3VuZGFyaWVzO1xuICAgICAgICBmb3IoaTIzID0gMDsgaTIzIDwgazIxLmxlbmd0aDsgaTIzKyspaWYgKCFSYyhlODgsIHI2NywgazIxW2kyM10pKSB7XG4gICAgICAgICAgICBlODguZGVzdGluYXRpb24gPSBudWxsO1xuICAgICAgICAgICAgaTIzKys7XG4gICAgICAgICAgICBrMjEuc3BsaWNlKDAsIGkyMyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgazIxLnNwbGljZSgwLCBpMjMpO1xuICAgIH0gZmluYWxseXtcbiAgICAgICAgMCA9PT0gZTg4LmFsbFBlbmRpbmdUYXNrcyAmJiAwID09PSBlODgucGluZ2VkVGFza3MubGVuZ3RoICYmIDAgPT09IGU4OC5jbGllbnRSZW5kZXJlZEJvdW5kYXJpZXMubGVuZ3RoICYmIDAgPT09IGU4OC5jb21wbGV0ZWRCb3VuZGFyaWVzLmxlbmd0aCAmJiByNjcuY2xvc2UoKTtcbiAgICB9XG59XG5pMi5yZW5kZXJUb1JlYWRhYmxlU3RyZWFtID0gZnVuY3Rpb24oZTg5LCByNjgpIHtcbiAgICB2YXIgYTQxID0gemMoZTg5LCB1YShyNjggPyByNjguaWRlbnRpZmllclByZWZpeCA6IHZvaWQgMCwgcjY4ID8gcjY4Lm5vbmNlIDogdm9pZCAwLCByNjggPyByNjguYm9vdHN0cmFwU2NyaXB0Q29udGVudCA6IHZvaWQgMCwgcjY4ID8gcjY4LmJvb3RzdHJhcFNjcmlwdHMgOiB2b2lkIDAsIHI2OCA/IHI2OC5ib290c3RyYXBNb2R1bGVzIDogdm9pZCAwKSwgdmEocjY4ID8gcjY4Lm5hbWVzcGFjZVVSSSA6IHZvaWQgMCksIHI2OCA/IHI2OC5wcm9ncmVzc2l2ZUNodW5rU2l6ZSA6IHZvaWQgMCwgcjY4ID8gcjY4Lm9uRXJyb3IgOiB2b2lkIDAsIHI2OCA/IHI2OC5vbkNvbXBsZXRlQWxsIDogdm9pZCAwLCByNjggPyByNjgub25Db21wbGV0ZVNoZWxsIDogdm9pZCAwKTtcbiAgICBpZiAocjY4ICYmIHI2OC5zaWduYWwpIHtcbiAgICAgICAgdmFyIG8zMCA9IHI2OC5zaWduYWwsIGYzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHZhciBlOTAgPSBhNDEuYWJvcnRhYmxlVGFza3M7XG4gICAgICAgICAgICAgICAgZTkwLmZvckVhY2goTWMsIGE0MSk7XG4gICAgICAgICAgICAgICAgZTkwLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgbnVsbCAhPT0gYTQxLmRlc3RpbmF0aW9uICYmIE5jKGE0MSwgYTQxLmRlc3RpbmF0aW9uKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGU5MSkge1xuICAgICAgICAgICAgICAgIFkoYTQxLCBlOTEpLCBEYyhhNDEsIGU5MSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvMzAucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGYzKTtcbiAgICAgICAgfTtcbiAgICAgICAgbzMwLmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBmMyk7XG4gICAgfVxuICAgIHZhciBpMjQgPSBuZXcgUmVhZGFibGVTdHJlYW0oe1xuICAgICAgICBzdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBDYyhhNDEpO1xuICAgICAgICB9LFxuICAgICAgICBwdWxsOiBmdW5jdGlvbihlOTIpIHtcbiAgICAgICAgICAgIGlmIChpMjQubG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgaWYgKDEgPT09IGE0MS5zdGF0dXMpIGE0MS5zdGF0dXMgPSAyLCBjYShlOTIsIGE0MS5mYXRhbEVycm9yKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmICgyICE9PSBhNDEuc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGE0MS5kZXN0aW5hdGlvbiA9IGU5MjtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE5jKGE0MSwgZTkyKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZTkzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBZKGE0MSwgZTkzKSwgRGMoYTQxLCBlOTMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjYW5jZWw6IGZ1bmN0aW9uKCkge31cbiAgICB9KTtcbiAgICByZXR1cm4gaTI0O1xufTtcbmkyLnZlcnNpb24gPSBcIjE4LjAuMC1yYy4wLWZlOTA1ZjE1Mi0yMDIyMDEwN1wiO1xuaTIucmVuZGVyVG9SZWFkYWJsZVN0cmVhbSwgaTIudmVyc2lvbjtcbnZhciBhNSA9IFwiZGVmYXVsdFwiIGluIG1vZCA/IG1vZC5kZWZhdWx0IDogbW9kO1xudmFyIG8zID0gXCJkZWZhdWx0XCIgaW4gbW9kMSA/IG1vZDEuZGVmYXVsdCA6IG1vZDE7XG52YXIgbDI0ID0ge307XG52YXIgaTMgPSBhNSwgdTMgPSBvMztcbmZ1bmN0aW9uIG0zKGUxNSkge1xuICAgIGZvcih2YXIgbjE0ID0gXCJodHRwczovL3JlYWN0anMub3JnL2RvY3MvZXJyb3ItZGVjb2Rlci5odG1sP2ludmFyaWFudD1cIiArIGUxNSwgcjE1ID0gMTsgcjE1IDwgYXJndW1lbnRzLmxlbmd0aDsgcjE1KyspbjE0ICs9IFwiJmFyZ3NbXT1cIiArIGVuY29kZVVSSUNvbXBvbmVudChhcmd1bWVudHNbcjE1XSk7XG4gICAgcmV0dXJuIFwiTWluaWZpZWQgUmVhY3QgZXJyb3IgI1wiICsgZTE1ICsgXCI7IHZpc2l0IFwiICsgbjE0ICsgXCIgZm9yIHRoZSBmdWxsIG1lc3NhZ2Ugb3IgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50IGZvciBmdWxsIGVycm9ycyBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLlwiO1xufVxudmFyIHMzID0gITE7XG5mdW5jdGlvbiBxMihlMjQsIG4yMSkge1xuICAgIHMzICYmIChzMyA9ICExLCBcIjxcIiAhPT0gbjIxWzBdICYmIGUyNC5wdXNoKFwiXFx4M2MhLS0gLS1cXHgzZVwiKSk7XG4gICAgcmV0dXJuIFwiXFx4M2MhLS0gLS1cXHgzZVwiID09PSBuMjEgPyBzMyA9ICEwIDogZTI0LnB1c2gobjIxKTtcbn1cbnZhciBjNCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksIGYxID0gL15bOkEtWl9hLXpcXHUwMEMwLVxcdTAwRDZcXHUwMEQ4LVxcdTAwRjZcXHUwMEY4LVxcdTAyRkZcXHUwMzcwLVxcdTAzN0RcXHUwMzdGLVxcdTFGRkZcXHUyMDBDLVxcdTIwMERcXHUyMDcwLVxcdTIxOEZcXHUyQzAwLVxcdTJGRUZcXHUzMDAxLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRkRdWzpBLVpfYS16XFx1MDBDMC1cXHUwMEQ2XFx1MDBEOC1cXHUwMEY2XFx1MDBGOC1cXHUwMkZGXFx1MDM3MC1cXHUwMzdEXFx1MDM3Ri1cXHUxRkZGXFx1MjAwQy1cXHUyMDBEXFx1MjA3MC1cXHUyMThGXFx1MkMwMC1cXHUyRkVGXFx1MzAwMS1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkZEXFwtLjAtOVxcdTAwQjdcXHUwMzAwLVxcdTAzNkZcXHUyMDNGLVxcdTIwNDBdKiQvLCBkMiA9IHt9LCBwMyA9IHt9O1xuZnVuY3Rpb24gZmEoZTMyKSB7XG4gICAgaWYgKGM0LmNhbGwocDMsIGUzMikpIHJldHVybiAhMDtcbiAgICBpZiAoYzQuY2FsbChkMiwgZTMyKSkgcmV0dXJuICExO1xuICAgIGlmIChmMS50ZXN0KGUzMikpIHJldHVybiBwM1tlMzJdID0gITA7XG4gICAgZDJbZTMyXSA9ICEwO1xuICAgIHJldHVybiAhMTtcbn1cbmZ1bmN0aW9uIHQ1KGU0MiwgbjMxLCByMjMsIGExNSwgbzEyLCBsMTEsIGkxMikge1xuICAgIHRoaXMuYWNjZXB0c0Jvb2xlYW5zID0gMiA9PT0gbjMxIHx8IDMgPT09IG4zMSB8fCA0ID09PSBuMzE7XG4gICAgdGhpcy5hdHRyaWJ1dGVOYW1lID0gYTE1O1xuICAgIHRoaXMuYXR0cmlidXRlTmFtZXNwYWNlID0gbzEyO1xuICAgIHRoaXMubXVzdFVzZVByb3BlcnR5ID0gcjIzO1xuICAgIHRoaXMucHJvcGVydHlOYW1lID0gZTQyO1xuICAgIHRoaXMudHlwZSA9IG4zMTtcbiAgICB0aGlzLnNhbml0aXplVVJMID0gbDExO1xuICAgIHRoaXMucmVtb3ZlRW1wdHlTdHJpbmcgPSBpMTI7XG59XG52YXIgaDIgPSB7fTtcblwiY2hpbGRyZW4gZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwgZGVmYXVsdFZhbHVlIGRlZmF1bHRDaGVja2VkIGlubmVySFRNTCBzdXBwcmVzc0NvbnRlbnRFZGl0YWJsZVdhcm5pbmcgc3VwcHJlc3NIeWRyYXRpb25XYXJuaW5nIHN0eWxlXCIuc3BsaXQoXCIgXCIpLmZvckVhY2goZnVuY3Rpb24oZTUpIHtcbiAgICBoMltlNV0gPSBuZXcgdDUoZTUsIDAsICExLCBlNSwgbnVsbCwgITEsICExKTtcbn0pO1xuW1xuICAgIFtcbiAgICAgICAgXCJhY2NlcHRDaGFyc2V0XCIsXG4gICAgICAgIFwiYWNjZXB0LWNoYXJzZXRcIlxuICAgIF0sXG4gICAgW1xuICAgICAgICBcImNsYXNzTmFtZVwiLFxuICAgICAgICBcImNsYXNzXCJcbiAgICBdLFxuICAgIFtcbiAgICAgICAgXCJodG1sRm9yXCIsXG4gICAgICAgIFwiZm9yXCJcbiAgICBdLFxuICAgIFtcbiAgICAgICAgXCJodHRwRXF1aXZcIixcbiAgICAgICAgXCJodHRwLWVxdWl2XCJcbiAgICBdXG5dLmZvckVhY2goZnVuY3Rpb24oZTYpIHtcbiAgICB2YXIgbjQxID0gZTZbMF07XG4gICAgaDJbbjQxXSA9IG5ldyB0NShuNDEsIDEsICExLCBlNlsxXSwgbnVsbCwgITEsICExKTtcbn0pO1xuW1xuICAgIFwiY29udGVudEVkaXRhYmxlXCIsXG4gICAgXCJkcmFnZ2FibGVcIixcbiAgICBcInNwZWxsQ2hlY2tcIixcbiAgICBcInZhbHVlXCJcbl0uZm9yRWFjaChmdW5jdGlvbihlNykge1xuICAgIGgyW2U3XSA9IG5ldyB0NShlNywgMiwgITEsIGU3LnRvTG93ZXJDYXNlKCksIG51bGwsICExLCAhMSk7XG59KTtcbltcbiAgICBcImF1dG9SZXZlcnNlXCIsXG4gICAgXCJleHRlcm5hbFJlc291cmNlc1JlcXVpcmVkXCIsXG4gICAgXCJmb2N1c2FibGVcIixcbiAgICBcInByZXNlcnZlQWxwaGFcIlxuXS5mb3JFYWNoKGZ1bmN0aW9uKGU4KSB7XG4gICAgaDJbZThdID0gbmV3IHQ1KGU4LCAyLCAhMSwgZTgsIG51bGwsICExLCAhMSk7XG59KTtcblwiYWxsb3dGdWxsU2NyZWVuIGFzeW5jIGF1dG9Gb2N1cyBhdXRvUGxheSBjb250cm9scyBkZWZhdWx0IGRlZmVyIGRpc2FibGVkIGRpc2FibGVQaWN0dXJlSW5QaWN0dXJlIGRpc2FibGVSZW1vdGVQbGF5YmFjayBmb3JtTm9WYWxpZGF0ZSBoaWRkZW4gbG9vcCBub01vZHVsZSBub1ZhbGlkYXRlIG9wZW4gcGxheXNJbmxpbmUgcmVhZE9ubHkgcmVxdWlyZWQgcmV2ZXJzZWQgc2NvcGVkIHNlYW1sZXNzIGl0ZW1TY29wZVwiLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKGU5KSB7XG4gICAgaDJbZTldID0gbmV3IHQ1KGU5LCAzLCAhMSwgZTkudG9Mb3dlckNhc2UoKSwgbnVsbCwgITEsICExKTtcbn0pO1xuW1xuICAgIFwiY2hlY2tlZFwiLFxuICAgIFwibXVsdGlwbGVcIixcbiAgICBcIm11dGVkXCIsXG4gICAgXCJzZWxlY3RlZFwiXG5dLmZvckVhY2goZnVuY3Rpb24oZTEwKSB7XG4gICAgaDJbZTEwXSA9IG5ldyB0NShlMTAsIDMsICEwLCBlMTAsIG51bGwsICExLCAhMSk7XG59KTtcbltcbiAgICBcImNhcHR1cmVcIixcbiAgICBcImRvd25sb2FkXCJcbl0uZm9yRWFjaChmdW5jdGlvbihlMTEpIHtcbiAgICBoMltlMTFdID0gbmV3IHQ1KGUxMSwgNCwgITEsIGUxMSwgbnVsbCwgITEsICExKTtcbn0pO1xuW1xuICAgIFwiY29sc1wiLFxuICAgIFwicm93c1wiLFxuICAgIFwic2l6ZVwiLFxuICAgIFwic3BhblwiXG5dLmZvckVhY2goZnVuY3Rpb24oZTEyKSB7XG4gICAgaDJbZTEyXSA9IG5ldyB0NShlMTIsIDYsICExLCBlMTIsIG51bGwsICExLCAhMSk7XG59KTtcbltcbiAgICBcInJvd1NwYW5cIixcbiAgICBcInN0YXJ0XCJcbl0uZm9yRWFjaChmdW5jdGlvbihlMTMpIHtcbiAgICBoMltlMTNdID0gbmV3IHQ1KGUxMywgNSwgITEsIGUxMy50b0xvd2VyQ2FzZSgpLCBudWxsLCAhMSwgITEpO1xufSk7XG52YXIgYjIgPSAvW1xcLTpdKFthLXpdKS9nO1xuZnVuY3Rpb24gaWEoZTE0KSB7XG4gICAgcmV0dXJuIGUxNFsxXS50b1VwcGVyQ2FzZSgpO1xufVxuXCJhY2NlbnQtaGVpZ2h0IGFsaWdubWVudC1iYXNlbGluZSBhcmFiaWMtZm9ybSBiYXNlbGluZS1zaGlmdCBjYXAtaGVpZ2h0IGNsaXAtcGF0aCBjbGlwLXJ1bGUgY29sb3ItaW50ZXJwb2xhdGlvbiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnMgY29sb3ItcHJvZmlsZSBjb2xvci1yZW5kZXJpbmcgZG9taW5hbnQtYmFzZWxpbmUgZW5hYmxlLWJhY2tncm91bmQgZmlsbC1vcGFjaXR5IGZpbGwtcnVsZSBmbG9vZC1jb2xvciBmbG9vZC1vcGFjaXR5IGZvbnQtZmFtaWx5IGZvbnQtc2l6ZSBmb250LXNpemUtYWRqdXN0IGZvbnQtc3RyZXRjaCBmb250LXN0eWxlIGZvbnQtdmFyaWFudCBmb250LXdlaWdodCBnbHlwaC1uYW1lIGdseXBoLW9yaWVudGF0aW9uLWhvcml6b250YWwgZ2x5cGgtb3JpZW50YXRpb24tdmVydGljYWwgaG9yaXotYWR2LXggaG9yaXotb3JpZ2luLXggaW1hZ2UtcmVuZGVyaW5nIGxldHRlci1zcGFjaW5nIGxpZ2h0aW5nLWNvbG9yIG1hcmtlci1lbmQgbWFya2VyLW1pZCBtYXJrZXItc3RhcnQgb3ZlcmxpbmUtcG9zaXRpb24gb3ZlcmxpbmUtdGhpY2tuZXNzIHBhaW50LW9yZGVyIHBhbm9zZS0xIHBvaW50ZXItZXZlbnRzIHJlbmRlcmluZy1pbnRlbnQgc2hhcGUtcmVuZGVyaW5nIHN0b3AtY29sb3Igc3RvcC1vcGFjaXR5IHN0cmlrZXRocm91Z2gtcG9zaXRpb24gc3RyaWtldGhyb3VnaC10aGlja25lc3Mgc3Ryb2tlLWRhc2hhcnJheSBzdHJva2UtZGFzaG9mZnNldCBzdHJva2UtbGluZWNhcCBzdHJva2UtbGluZWpvaW4gc3Ryb2tlLW1pdGVybGltaXQgc3Ryb2tlLW9wYWNpdHkgc3Ryb2tlLXdpZHRoIHRleHQtYW5jaG9yIHRleHQtZGVjb3JhdGlvbiB0ZXh0LXJlbmRlcmluZyB1bmRlcmxpbmUtcG9zaXRpb24gdW5kZXJsaW5lLXRoaWNrbmVzcyB1bmljb2RlLWJpZGkgdW5pY29kZS1yYW5nZSB1bml0cy1wZXItZW0gdi1hbHBoYWJldGljIHYtaGFuZ2luZyB2LWlkZW9ncmFwaGljIHYtbWF0aGVtYXRpY2FsIHZlY3Rvci1lZmZlY3QgdmVydC1hZHYteSB2ZXJ0LW9yaWdpbi14IHZlcnQtb3JpZ2luLXkgd29yZC1zcGFjaW5nIHdyaXRpbmctbW9kZSB4bWxuczp4bGluayB4LWhlaWdodFwiLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKGUxNSkge1xuICAgIHZhciBuNSA9IGUxNS5yZXBsYWNlKGIyLCBpYSk7XG4gICAgaDJbbjVdID0gbmV3IHQ1KG41LCAxLCAhMSwgZTE1LCBudWxsLCAhMSwgITEpO1xufSk7XG5cInhsaW5rOmFjdHVhdGUgeGxpbms6YXJjcm9sZSB4bGluazpyb2xlIHhsaW5rOnNob3cgeGxpbms6dGl0bGUgeGxpbms6dHlwZVwiLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKGUxNikge1xuICAgIHZhciBuNiA9IGUxNi5yZXBsYWNlKGIyLCBpYSk7XG4gICAgaDJbbjZdID0gbmV3IHQ1KG42LCAxLCAhMSwgZTE2LCBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiwgITEsICExKTtcbn0pO1xuW1xuICAgIFwieG1sOmJhc2VcIixcbiAgICBcInhtbDpsYW5nXCIsXG4gICAgXCJ4bWw6c3BhY2VcIlxuXS5mb3JFYWNoKGZ1bmN0aW9uKGUxNykge1xuICAgIHZhciBuNyA9IGUxNy5yZXBsYWNlKGIyLCBpYSk7XG4gICAgaDJbbjddID0gbmV3IHQ1KG43LCAxLCAhMSwgZTE3LCBcImh0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZVwiLCAhMSwgITEpO1xufSk7XG5bXG4gICAgXCJ0YWJJbmRleFwiLFxuICAgIFwiY3Jvc3NPcmlnaW5cIlxuXS5mb3JFYWNoKGZ1bmN0aW9uKGUxOCkge1xuICAgIGgyW2UxOF0gPSBuZXcgdDUoZTE4LCAxLCAhMSwgZTE4LnRvTG93ZXJDYXNlKCksIG51bGwsICExLCAhMSk7XG59KTtcbmgyLnhsaW5rSHJlZiA9IG5ldyB0NShcInhsaW5rSHJlZlwiLCAxLCAhMSwgXCJ4bGluazpocmVmXCIsIFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiLCAhMCwgITEpO1xuW1xuICAgIFwic3JjXCIsXG4gICAgXCJocmVmXCIsXG4gICAgXCJhY3Rpb25cIixcbiAgICBcImZvcm1BY3Rpb25cIlxuXS5mb3JFYWNoKGZ1bmN0aW9uKGUxOSkge1xuICAgIGgyW2UxOV0gPSBuZXcgdDUoZTE5LCAxLCAhMSwgZTE5LnRvTG93ZXJDYXNlKCksIG51bGwsICEwLCAhMCk7XG59KTtcbnZhciBnNCA9IHtcbiAgICBhbmltYXRpb25JdGVyYXRpb25Db3VudDogITAsXG4gICAgYXNwZWN0UmF0aW86ICEwLFxuICAgIGJvcmRlckltYWdlT3V0c2V0OiAhMCxcbiAgICBib3JkZXJJbWFnZVNsaWNlOiAhMCxcbiAgICBib3JkZXJJbWFnZVdpZHRoOiAhMCxcbiAgICBib3hGbGV4OiAhMCxcbiAgICBib3hGbGV4R3JvdXA6ICEwLFxuICAgIGJveE9yZGluYWxHcm91cDogITAsXG4gICAgY29sdW1uQ291bnQ6ICEwLFxuICAgIGNvbHVtbnM6ICEwLFxuICAgIGZsZXg6ICEwLFxuICAgIGZsZXhHcm93OiAhMCxcbiAgICBmbGV4UG9zaXRpdmU6ICEwLFxuICAgIGZsZXhTaHJpbms6ICEwLFxuICAgIGZsZXhOZWdhdGl2ZTogITAsXG4gICAgZmxleE9yZGVyOiAhMCxcbiAgICBncmlkQXJlYTogITAsXG4gICAgZ3JpZFJvdzogITAsXG4gICAgZ3JpZFJvd0VuZDogITAsXG4gICAgZ3JpZFJvd1NwYW46ICEwLFxuICAgIGdyaWRSb3dTdGFydDogITAsXG4gICAgZ3JpZENvbHVtbjogITAsXG4gICAgZ3JpZENvbHVtbkVuZDogITAsXG4gICAgZ3JpZENvbHVtblNwYW46ICEwLFxuICAgIGdyaWRDb2x1bW5TdGFydDogITAsXG4gICAgZm9udFdlaWdodDogITAsXG4gICAgbGluZUNsYW1wOiAhMCxcbiAgICBsaW5lSGVpZ2h0OiAhMCxcbiAgICBvcGFjaXR5OiAhMCxcbiAgICBvcmRlcjogITAsXG4gICAgb3JwaGFuczogITAsXG4gICAgdGFiU2l6ZTogITAsXG4gICAgd2lkb3dzOiAhMCxcbiAgICB6SW5kZXg6ICEwLFxuICAgIHpvb206ICEwLFxuICAgIGZpbGxPcGFjaXR5OiAhMCxcbiAgICBmbG9vZE9wYWNpdHk6ICEwLFxuICAgIHN0b3BPcGFjaXR5OiAhMCxcbiAgICBzdHJva2VEYXNoYXJyYXk6ICEwLFxuICAgIHN0cm9rZURhc2hvZmZzZXQ6ICEwLFxuICAgIHN0cm9rZU1pdGVybGltaXQ6ICEwLFxuICAgIHN0cm9rZU9wYWNpdHk6ICEwLFxuICAgIHN0cm9rZVdpZHRoOiAhMFxufSwgdjIgPSBbXG4gICAgXCJXZWJraXRcIixcbiAgICBcIm1zXCIsXG4gICAgXCJNb3pcIixcbiAgICBcIk9cIlxuXTtcbk9iamVjdC5rZXlzKGc0KS5mb3JFYWNoKGZ1bmN0aW9uKGUyMCkge1xuICAgIHYyLmZvckVhY2goZnVuY3Rpb24objgpIHtcbiAgICAgICAgbjggPSBuOCArIGUyMC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGUyMC5zdWJzdHJpbmcoMSk7XG4gICAgICAgIGc0W244XSA9IGc0W2UyMF07XG4gICAgfSk7XG59KTtcbnZhciB5NCA9IC9bXCInJjw+XS87XG5mdW5jdGlvbiB3NChlMjEpIHtcbiAgICBpZiAoXCJib29sZWFuXCIgPT09IHR5cGVvZiBlMjEgfHwgXCJudW1iZXJcIiA9PT0gdHlwZW9mIGUyMSkgcmV0dXJuIFwiXCIgKyBlMjE7XG4gICAgZTIxID0gXCJcIiArIGUyMTtcbiAgICB2YXIgbjkgPSB5NC5leGVjKGUyMSk7XG4gICAgaWYgKG45KSB7XG4gICAgICAgIHZhciByMzIsIGEyMiA9IFwiXCIsIG8yMiA9IDA7XG4gICAgICAgIGZvcihyMzIgPSBuOS5pbmRleDsgcjMyIDwgZTIxLmxlbmd0aDsgcjMyKyspe1xuICAgICAgICAgICAgc3dpdGNoKGUyMS5jaGFyQ29kZUF0KHIzMikpe1xuICAgICAgICAgICAgICAgIGNhc2UgMzQ6XG4gICAgICAgICAgICAgICAgICAgIG45ID0gXCImcXVvdDtcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgICAgICAgICAgbjkgPSBcIiZhbXA7XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzk6XG4gICAgICAgICAgICAgICAgICAgIG45ID0gXCImI3gyNztcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA2MDpcbiAgICAgICAgICAgICAgICAgICAgbjkgPSBcIiZsdDtcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA2MjpcbiAgICAgICAgICAgICAgICAgICAgbjkgPSBcIiZndDtcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvMjIgIT09IHIzMiAmJiAoYTIyICs9IGUyMS5zdWJzdHJpbmcobzIyLCByMzIpKTtcbiAgICAgICAgICAgIG8yMiA9IHIzMiArIDE7XG4gICAgICAgICAgICBhMjIgKz0gbjk7XG4gICAgICAgIH1cbiAgICAgICAgZTIxID0gbzIyICE9PSByMzIgPyBhMjIgKyBlMjEuc3Vic3RyaW5nKG8yMiwgcjMyKSA6IGEyMjtcbiAgICB9XG4gICAgcmV0dXJuIGUyMTtcbn1cbnZhciBrNCA9IC8oW0EtWl0pL2csIEUzID0gL15tcy0vLCBGMSA9IEFycmF5LmlzQXJyYXk7XG5mdW5jdGlvbiB4NChlMjIsIG4xMCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGluc2VydGlvbk1vZGU6IGUyMixcbiAgICAgICAgc2VsZWN0ZWRWYWx1ZTogbjEwXG4gICAgfTtcbn1cbmZ1bmN0aW9uIG9hKGUyMywgbjExLCByNCkge1xuICAgIHN3aXRjaChuMTEpe1xuICAgICAgICBjYXNlIFwic2VsZWN0XCI6XG4gICAgICAgICAgICByZXR1cm4geDQoMSwgbnVsbCAhPSByNC52YWx1ZSA/IHI0LnZhbHVlIDogcjQuZGVmYXVsdFZhbHVlKTtcbiAgICAgICAgY2FzZSBcInN2Z1wiOlxuICAgICAgICAgICAgcmV0dXJuIHg0KDIsIG51bGwpO1xuICAgICAgICBjYXNlIFwibWF0aFwiOlxuICAgICAgICAgICAgcmV0dXJuIHg0KDMsIG51bGwpO1xuICAgICAgICBjYXNlIFwiZm9yZWlnbk9iamVjdFwiOlxuICAgICAgICAgICAgcmV0dXJuIHg0KDEsIG51bGwpO1xuICAgICAgICBjYXNlIFwidGFibGVcIjpcbiAgICAgICAgICAgIHJldHVybiB4NCg0LCBudWxsKTtcbiAgICAgICAgY2FzZSBcInRoZWFkXCI6XG4gICAgICAgIGNhc2UgXCJ0Ym9keVwiOlxuICAgICAgICBjYXNlIFwidGZvb3RcIjpcbiAgICAgICAgICAgIHJldHVybiB4NCg1LCBudWxsKTtcbiAgICAgICAgY2FzZSBcImNvbGdyb3VwXCI6XG4gICAgICAgICAgICByZXR1cm4geDQoNywgbnVsbCk7XG4gICAgICAgIGNhc2UgXCJ0clwiOlxuICAgICAgICAgICAgcmV0dXJuIHg0KDYsIG51bGwpO1xuICAgIH1cbiAgICByZXR1cm4gNCA8PSBlMjMuaW5zZXJ0aW9uTW9kZSB8fCAwID09PSBlMjMuaW5zZXJ0aW9uTW9kZSA/IHg0KDEsIG51bGwpIDogZTIzO1xufVxuZnVuY3Rpb24gcGEoZTI0LCBuMTIpIHtcbiAgICBcIlwiICE9PSBuMTIgJiYgZTI0LnB1c2godzQobjEyKSwgXCJcXHgzYyEtLSAtLVxceDNlXCIpO1xufVxudmFyIFIzID0gbmV3IE1hcDtcbmZ1bmN0aW9uIHJhKGUyNSwgbjEzLCByNSkge1xuICAgIGlmIChcIm9iamVjdFwiICE9PSB0eXBlb2YgcjUpIHRocm93IEVycm9yKG0zKDYyKSk7XG4gICAgbjEzID0gITA7XG4gICAgZm9yKHZhciBhMzIgaW4gcjUpaWYgKGM0LmNhbGwocjUsIGEzMikpIHtcbiAgICAgICAgdmFyIG8zMSA9IHI1W2EzMl07XG4gICAgICAgIGlmIChudWxsICE9IG8zMSAmJiBcImJvb2xlYW5cIiAhPT0gdHlwZW9mIG8zMSAmJiBcIlwiICE9PSBvMzEpIHtcbiAgICAgICAgICAgIGlmICgwID09PSBhMzIuaW5kZXhPZihcIi0tXCIpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGwgPSB3NChhMzIpO1xuICAgICAgICAgICAgICAgIG8zMSA9IHc0KChcIlwiICsgbzMxKS50cmltKCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsID0gYTMyO1xuICAgICAgICAgICAgICAgIHZhciBpMjIgPSBSMy5nZXQobCk7XG4gICAgICAgICAgICAgICAgdm9pZCAwICE9PSBpMjIgfHwgKGkyMiA9IHc0KGwucmVwbGFjZShrNCwgXCItJDFcIikudG9Mb3dlckNhc2UoKS5yZXBsYWNlKEUzLCBcIi1tcy1cIikpLCBSMy5zZXQobCwgaTIyKSksIGwgPSBpMjI7XG4gICAgICAgICAgICAgICAgbzMxID0gXCJudW1iZXJcIiA9PT0gdHlwZW9mIG8zMSA/IDAgPT09IG8zMSB8fCBjNC5jYWxsKGc0LCBhMzIpID8gXCJcIiArIG8zMSA6IG8zMSArIFwicHhcIiA6IHc0KChcIlwiICsgbzMxKS50cmltKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbjEzID8gKG4xMyA9ICExLCBlMjUucHVzaCgnIHN0eWxlPVwiJywgbCwgXCI6XCIsIG8zMSkpIDogZTI1LnB1c2goXCI7XCIsIGwsIFwiOlwiLCBvMzEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG4xMyB8fCBlMjUucHVzaCgnXCInKTtcbn1cbmZ1bmN0aW9uIHoyKGUyNiwgbjE0LCByNiwgYTQyKSB7XG4gICAgc3dpdGNoKHI2KXtcbiAgICAgICAgY2FzZSBcInN0eWxlXCI6XG4gICAgICAgICAgICByYShlMjYsIG4xNCwgYTQyKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY2FzZSBcImRlZmF1bHRWYWx1ZVwiOlxuICAgICAgICBjYXNlIFwiZGVmYXVsdENoZWNrZWRcIjpcbiAgICAgICAgY2FzZSBcImlubmVySFRNTFwiOlxuICAgICAgICBjYXNlIFwic3VwcHJlc3NDb250ZW50RWRpdGFibGVXYXJuaW5nXCI6XG4gICAgICAgIGNhc2UgXCJzdXBwcmVzc0h5ZHJhdGlvbldhcm5pbmdcIjpcbiAgICAgICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCEoMiA8IHI2Lmxlbmd0aCkgfHwgXCJvXCIgIT09IHI2WzBdICYmIFwiT1wiICE9PSByNlswXSB8fCBcIm5cIiAhPT0gcjZbMV0gJiYgXCJOXCIgIT09IHI2WzFdKSB7XG4gICAgICAgIGlmIChuMTQgPSBoMi5oYXNPd25Qcm9wZXJ0eShyNikgPyBoMltyNl0gOiBudWxsLCBudWxsICE9PSBuMTQpIHtcbiAgICAgICAgICAgIHN3aXRjaCh0eXBlb2YgYTQyKXtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwic3ltYm9sXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIW4xNC5hY2NlcHRzQm9vbGVhbnMpIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHI2ID0gbjE0LmF0dHJpYnV0ZU5hbWU7XG4gICAgICAgICAgICBzd2l0Y2gobjE0LnR5cGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgYTQyICYmIGUyNi5wdXNoKFwiIFwiLCByNiwgJz1cIlwiJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgITAgPT09IGE0MiA/IGUyNi5wdXNoKFwiIFwiLCByNiwgJz1cIlwiJykgOiAhMSAhPT0gYTQyICYmIGUyNi5wdXNoKFwiIFwiLCByNiwgJz1cIicsIHc0KGE0MiksICdcIicpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgIGlzTmFOKGE0MikgfHwgZTI2LnB1c2goXCIgXCIsIHI2LCAnPVwiJywgdzQoYTQyKSwgJ1wiJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgIWlzTmFOKGE0MikgJiYgMSA8PSBhNDIgJiYgZTI2LnB1c2goXCIgXCIsIHI2LCAnPVwiJywgdzQoYTQyKSwgJ1wiJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIG4xNC5zYW5pdGl6ZVVSTCAmJiAoYTQyID0gXCJcIiArIGE0MiksIGUyNi5wdXNoKFwiIFwiLCByNiwgJz1cIicsIHc0KGE0MiksICdcIicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGZhKHI2KSkge1xuICAgICAgICAgICAgc3dpdGNoKHR5cGVvZiBhNDIpe1xuICAgICAgICAgICAgICAgIGNhc2UgXCJmdW5jdGlvblwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJzeW1ib2xcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmIChuMTQgPSByNi50b0xvd2VyQ2FzZSgpLnNsaWNlKDAsIDUpLCBcImRhdGEtXCIgIT09IG4xNCAmJiBcImFyaWEtXCIgIT09IG4xNCkgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZTI2LnB1c2goXCIgXCIsIHI2LCAnPVwiJywgdzQoYTQyKSwgJ1wiJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBCMShlMjcsIG4xNSwgcjcpIHtcbiAgICBpZiAobnVsbCAhPSBuMTUpIHtcbiAgICAgICAgaWYgKG51bGwgIT0gcjcpIHRocm93IEVycm9yKG0zKDYwKSk7XG4gICAgICAgIGlmIChcIm9iamVjdFwiICE9PSB0eXBlb2YgbjE1IHx8ICEoXCJfX2h0bWxcIiBpbiBuMTUpKSB0aHJvdyBFcnJvcihtMyg2MSkpO1xuICAgICAgICBuMTUgPSBuMTUuX19odG1sO1xuICAgICAgICBudWxsICE9PSBuMTUgJiYgdm9pZCAwICE9PSBuMTUgJiYgZTI3LnB1c2goXCJcIiArIG4xNSk7XG4gICAgfVxufVxuZnVuY3Rpb24gc2EoZTI4KSB7XG4gICAgdmFyIG4xNiA9IFwiXCI7XG4gICAgdTMuQ2hpbGRyZW4uZm9yRWFjaChlMjgsIGZ1bmN0aW9uKGUyOSkge1xuICAgICAgICBudWxsICE9IGUyOSAmJiAobjE2ICs9IGUyOSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG4xNjtcbn1cbmZ1bmN0aW9uIHRhKGUzMCwgbjE3LCByOCwgYTUxKSB7XG4gICAgZTMwLnB1c2goQzQocjgpKTtcbiAgICB2YXIgbzQsIGwgPSByOCA9IG51bGw7XG4gICAgZm9yKG80IGluIG4xNylpZiAoYzQuY2FsbChuMTcsIG80KSkge1xuICAgICAgICB2YXIgaTMxID0gbjE3W280XTtcbiAgICAgICAgaWYgKG51bGwgIT0gaTMxKSBzd2l0Y2gobzQpe1xuICAgICAgICAgICAgY2FzZSBcImNoaWxkcmVuXCI6XG4gICAgICAgICAgICAgICAgcjggPSBpMzE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIjpcbiAgICAgICAgICAgICAgICBsID0gaTMxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB6MihlMzAsIGE1MSwgbzQsIGkzMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZTMwLnB1c2goXCI+XCIpO1xuICAgIEIxKGUzMCwgbCwgcjgpO1xuICAgIHJldHVybiBcInN0cmluZ1wiID09PSB0eXBlb2YgcjggPyAoZTMwLnB1c2godzQocjgpKSwgbnVsbCkgOiByODtcbn1cbnZhciBfMiA9IC9eW2EtekEtWl1bYS16QS1aOl9cXC5cXC1cXGRdKiQvLCBNMSA9IG5ldyBNYXA7XG5mdW5jdGlvbiBDNChlMzEpIHtcbiAgICB2YXIgbjE4ID0gTTEuZ2V0KGUzMSk7XG4gICAgaWYgKHZvaWQgMCA9PT0gbjE4KSB7XG4gICAgICAgIGlmICghXzIudGVzdChlMzEpKSB0aHJvdyBFcnJvcihtMyg2NSwgZTMxKSk7XG4gICAgICAgIG4xOCA9IFwiPFwiICsgZTMxO1xuICAgICAgICBNMS5zZXQoZTMxLCBuMTgpO1xuICAgIH1cbiAgICByZXR1cm4gbjE4O1xufVxuZnVuY3Rpb24gd2ExKGUzMiwgbjE5LCByOSwgYTYsIG81KSB7XG4gICAgc3dpdGNoKG4xOSl7XG4gICAgICAgIGNhc2UgXCJzZWxlY3RcIjpcbiAgICAgICAgICAgIGUzMi5wdXNoKEM0KFwic2VsZWN0XCIpKTtcbiAgICAgICAgICAgIHZhciBsID0gbnVsbCwgaTQgPSBudWxsO1xuICAgICAgICAgICAgZm9yKGQxMiBpbiByOSlpZiAoYzQuY2FsbChyOSwgZDEyKSkge1xuICAgICAgICAgICAgICAgIHZhciB1MTIgPSByOVtkMTJdO1xuICAgICAgICAgICAgICAgIGlmIChudWxsICE9IHUxMikgc3dpdGNoKGQxMil7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjaGlsZHJlblwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgbCA9IHUxMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGk0ID0gdTEyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkZWZhdWx0VmFsdWVcIjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInZhbHVlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHoyKGUzMiwgYTYsIGQxMiwgdTEyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlMzIucHVzaChcIj5cIik7XG4gICAgICAgICAgICBCMShlMzIsIGk0LCBsKTtcbiAgICAgICAgICAgIHJldHVybiBsO1xuICAgICAgICBjYXNlIFwib3B0aW9uXCI6XG4gICAgICAgICAgICBpNCA9IG81LnNlbGVjdGVkVmFsdWU7XG4gICAgICAgICAgICBlMzIucHVzaChDNChcIm9wdGlvblwiKSk7XG4gICAgICAgICAgICB2YXIgczEyID0gdTEyID0gbnVsbCwgZjExID0gbnVsbDtcbiAgICAgICAgICAgIHZhciBkMTIgPSBudWxsO1xuICAgICAgICAgICAgZm9yKGwgaW4gcjkpaWYgKGM0LmNhbGwocjksIGwpICYmIChuMTkgPSByOVtsXSwgbnVsbCAhPSBuMTkpKSBzd2l0Y2gobCl7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNoaWxkcmVuXCI6XG4gICAgICAgICAgICAgICAgICAgIHUxMiA9IG4xOTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInNlbGVjdGVkXCI6XG4gICAgICAgICAgICAgICAgICAgIGYxMSA9IG4xOTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MXCI6XG4gICAgICAgICAgICAgICAgICAgIGQxMiA9IG4xOTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInZhbHVlXCI6XG4gICAgICAgICAgICAgICAgICAgIHMxMiA9IG4xOTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB6MihlMzIsIGE2LCBsLCBuMTkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG51bGwgIT09IGk0KSBpZiAocjkgPSBudWxsICE9PSBzMTIgPyBcIlwiICsgczEyIDogc2EodTEyKSwgRjEoaTQpKSB7XG4gICAgICAgICAgICAgICAgZm9yKGE2ID0gMDsgYTYgPCBpNC5sZW5ndGg7IGE2KyspaWYgKFwiXCIgKyBpNFthNl0gPT09IHI5KSB7XG4gICAgICAgICAgICAgICAgICAgIGUzMi5wdXNoKCcgc2VsZWN0ZWQ9XCJcIicpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaTQgPT09IHI5ICYmIGUzMi5wdXNoKCcgc2VsZWN0ZWQ9XCJcIicpO1xuICAgICAgICAgICAgZWxzZSBmMTEgJiYgZTMyLnB1c2goJyBzZWxlY3RlZD1cIlwiJyk7XG4gICAgICAgICAgICBlMzIucHVzaChcIj5cIik7XG4gICAgICAgICAgICBCMShlMzIsIGQxMiwgdTEyKTtcbiAgICAgICAgICAgIHJldHVybiB1MTI7XG4gICAgICAgIGNhc2UgXCJ0ZXh0YXJlYVwiOlxuICAgICAgICAgICAgZTMyLnB1c2goQzQoXCJ0ZXh0YXJlYVwiKSk7XG4gICAgICAgICAgICBkMTIgPSBpNCA9IGwgPSBudWxsO1xuICAgICAgICAgICAgZm9yKHUxMiBpbiByOSlpZiAoYzQuY2FsbChyOSwgdTEyKSAmJiAoczEyID0gcjlbdTEyXSwgbnVsbCAhPSBzMTIpKSBzd2l0Y2godTEyKXtcbiAgICAgICAgICAgICAgICBjYXNlIFwiY2hpbGRyZW5cIjpcbiAgICAgICAgICAgICAgICAgICAgZDEyID0gczEyO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidmFsdWVcIjpcbiAgICAgICAgICAgICAgICAgICAgbCA9IHMxMjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImRlZmF1bHRWYWx1ZVwiOlxuICAgICAgICAgICAgICAgICAgICBpNCA9IHMxMjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MXCI6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKG0zKDkxKSk7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgejIoZTMyLCBhNiwgdTEyLCBzMTIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbnVsbCA9PT0gbCAmJiBudWxsICE9PSBpNCAmJiAobCA9IGk0KTtcbiAgICAgICAgICAgIGUzMi5wdXNoKFwiPlwiKTtcbiAgICAgICAgICAgIGlmIChudWxsICE9IGQxMikge1xuICAgICAgICAgICAgICAgIGlmIChudWxsICE9IGwpIHRocm93IEVycm9yKG0zKDkyKSk7XG4gICAgICAgICAgICAgICAgaWYgKEYxKGQxMikgJiYgMSA8IGQxMi5sZW5ndGgpIHRocm93IEVycm9yKG0zKDkzKSk7XG4gICAgICAgICAgICAgICAgbCA9IFwiXCIgKyBkMTI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcInN0cmluZ1wiID09PSB0eXBlb2YgbCAmJiBcIlxcblwiID09PSBsWzBdICYmIGUzMi5wdXNoKFwiXFxuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGw7XG4gICAgICAgIGNhc2UgXCJpbnB1dFwiOlxuICAgICAgICAgICAgZTMyLnB1c2goQzQoXCJpbnB1dFwiKSk7XG4gICAgICAgICAgICBzMTIgPSBkMTIgPSB1MTIgPSBsID0gbnVsbDtcbiAgICAgICAgICAgIGZvcihpNCBpbiByOSlpZiAoYzQuY2FsbChyOSwgaTQpICYmIChmMTEgPSByOVtpNF0sIG51bGwgIT0gZjExKSkgc3dpdGNoKGk0KXtcbiAgICAgICAgICAgICAgICBjYXNlIFwiY2hpbGRyZW5cIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IobTMoMzk5LCBcImlucHV0XCIpKTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZGVmYXVsdENoZWNrZWRcIjpcbiAgICAgICAgICAgICAgICAgICAgczEyID0gZjExO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZGVmYXVsdFZhbHVlXCI6XG4gICAgICAgICAgICAgICAgICAgIHUxMiA9IGYxMTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNoZWNrZWRcIjpcbiAgICAgICAgICAgICAgICAgICAgZDEyID0gZjExO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidmFsdWVcIjpcbiAgICAgICAgICAgICAgICAgICAgbCA9IGYxMTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgejIoZTMyLCBhNiwgaTQsIGYxMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBudWxsICE9PSBkMTIgPyB6MihlMzIsIGE2LCBcImNoZWNrZWRcIiwgZDEyKSA6IG51bGwgIT09IHMxMiAmJiB6MihlMzIsIGE2LCBcImNoZWNrZWRcIiwgczEyKTtcbiAgICAgICAgICAgIG51bGwgIT09IGwgPyB6MihlMzIsIGE2LCBcInZhbHVlXCIsIGwpIDogbnVsbCAhPT0gdTEyICYmIHoyKGUzMiwgYTYsIFwidmFsdWVcIiwgdTEyKTtcbiAgICAgICAgICAgIGUzMi5wdXNoKFwiLz5cIik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgY2FzZSBcIm1lbnVpdGVtXCI6XG4gICAgICAgICAgICBlMzIucHVzaChDNChcIm1lbnVpdGVtXCIpKTtcbiAgICAgICAgICAgIGZvcih2YXIgcDExIGluIHI5KWlmIChjNC5jYWxsKHI5LCBwMTEpICYmIChsID0gcjlbcDExXSwgbnVsbCAhPSBsKSkgc3dpdGNoKHAxMSl7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNoaWxkcmVuXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MXCI6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKG0zKDQwMCkpO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHoyKGUzMiwgYTYsIHAxMSwgbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlMzIucHVzaChcIj5cIik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgY2FzZSBcImxpc3RpbmdcIjpcbiAgICAgICAgY2FzZSBcInByZVwiOlxuICAgICAgICAgICAgZTMyLnB1c2goQzQobjE5KSk7XG4gICAgICAgICAgICBpNCA9IGwgPSBudWxsO1xuICAgICAgICAgICAgZm9yKHMxMiBpbiByOSlpZiAoYzQuY2FsbChyOSwgczEyKSAmJiAodTEyID0gcjlbczEyXSwgbnVsbCAhPSB1MTIpKSBzd2l0Y2goczEyKXtcbiAgICAgICAgICAgICAgICBjYXNlIFwiY2hpbGRyZW5cIjpcbiAgICAgICAgICAgICAgICAgICAgbCA9IHUxMjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MXCI6XG4gICAgICAgICAgICAgICAgICAgIGk0ID0gdTEyO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB6MihlMzIsIGE2LCBzMTIsIHUxMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlMzIucHVzaChcIj5cIik7XG4gICAgICAgICAgICBpZiAobnVsbCAhPSBpNCkge1xuICAgICAgICAgICAgICAgIGlmIChudWxsICE9IGwpIHRocm93IEVycm9yKG0zKDYwKSk7XG4gICAgICAgICAgICAgICAgaWYgKFwib2JqZWN0XCIgIT09IHR5cGVvZiBpNCB8fCAhKFwiX19odG1sXCIgaW4gaTQpKSB0aHJvdyBFcnJvcihtMyg2MSkpO1xuICAgICAgICAgICAgICAgIHI5ID0gaTQuX19odG1sO1xuICAgICAgICAgICAgICAgIG51bGwgIT09IHI5ICYmIHZvaWQgMCAhPT0gcjkgJiYgKFwic3RyaW5nXCIgPT09IHR5cGVvZiByOSAmJiAwIDwgcjkubGVuZ3RoICYmIFwiXFxuXCIgPT09IHI5WzBdID8gZTMyLnB1c2goXCJcXG5cIiwgcjkpIDogZTMyLnB1c2goXCJcIiArIHI5KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcInN0cmluZ1wiID09PSB0eXBlb2YgbCAmJiBcIlxcblwiID09PSBsWzBdICYmIGUzMi5wdXNoKFwiXFxuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGw7XG4gICAgICAgIGNhc2UgXCJhcmVhXCI6XG4gICAgICAgIGNhc2UgXCJiYXNlXCI6XG4gICAgICAgIGNhc2UgXCJiclwiOlxuICAgICAgICBjYXNlIFwiY29sXCI6XG4gICAgICAgIGNhc2UgXCJlbWJlZFwiOlxuICAgICAgICBjYXNlIFwiaHJcIjpcbiAgICAgICAgY2FzZSBcImltZ1wiOlxuICAgICAgICBjYXNlIFwia2V5Z2VuXCI6XG4gICAgICAgIGNhc2UgXCJsaW5rXCI6XG4gICAgICAgIGNhc2UgXCJtZXRhXCI6XG4gICAgICAgIGNhc2UgXCJwYXJhbVwiOlxuICAgICAgICBjYXNlIFwic291cmNlXCI6XG4gICAgICAgIGNhc2UgXCJ0cmFja1wiOlxuICAgICAgICBjYXNlIFwid2JyXCI6XG4gICAgICAgICAgICBlMzIucHVzaChDNChuMTkpKTtcbiAgICAgICAgICAgIGZvcih2YXIgaDEyIGluIHI5KWlmIChjNC5jYWxsKHI5LCBoMTIpICYmIChsID0gcjlbaDEyXSwgbnVsbCAhPSBsKSkgc3dpdGNoKGgxMil7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNoaWxkcmVuXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MXCI6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKG0zKDM5OSwgbjE5KSk7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgejIoZTMyLCBhNiwgaDEyLCBsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUzMi5wdXNoKFwiLz5cIik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgY2FzZSBcImFubm90YXRpb24teG1sXCI6XG4gICAgICAgIGNhc2UgXCJjb2xvci1wcm9maWxlXCI6XG4gICAgICAgIGNhc2UgXCJmb250LWZhY2VcIjpcbiAgICAgICAgY2FzZSBcImZvbnQtZmFjZS1zcmNcIjpcbiAgICAgICAgY2FzZSBcImZvbnQtZmFjZS11cmlcIjpcbiAgICAgICAgY2FzZSBcImZvbnQtZmFjZS1mb3JtYXRcIjpcbiAgICAgICAgY2FzZSBcImZvbnQtZmFjZS1uYW1lXCI6XG4gICAgICAgIGNhc2UgXCJtaXNzaW5nLWdseXBoXCI6XG4gICAgICAgICAgICByZXR1cm4gdGEoZTMyLCByOSwgbjE5LCBhNik7XG4gICAgICAgIGNhc2UgXCJodG1sXCI6XG4gICAgICAgICAgICByZXR1cm4gMCA9PT0gbzUuaW5zZXJ0aW9uTW9kZSAmJiBlMzIucHVzaChcIjwhRE9DVFlQRSBodG1sPlwiKSwgdGEoZTMyLCByOSwgbjE5LCBhNik7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBpZiAoLTEgPT09IG4xOS5pbmRleE9mKFwiLVwiKSAmJiBcInN0cmluZ1wiICE9PSB0eXBlb2YgcjkuaXMpIHJldHVybiB0YShlMzIsIHI5LCBuMTksIGE2KTtcbiAgICAgICAgICAgIGUzMi5wdXNoKEM0KG4xOSkpO1xuICAgICAgICAgICAgaTQgPSBsID0gbnVsbDtcbiAgICAgICAgICAgIGZvcihmMTEgaW4gcjkpaWYgKGM0LmNhbGwocjksIGYxMSkgJiYgKHUxMiA9IHI5W2YxMV0sIG51bGwgIT0gdTEyKSkgc3dpdGNoKGYxMSl7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNoaWxkcmVuXCI6XG4gICAgICAgICAgICAgICAgICAgIGwgPSB1MTI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJkYW5nZXJvdXNseVNldElubmVySFRNTFwiOlxuICAgICAgICAgICAgICAgICAgICBpNCA9IHUxMjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInN0eWxlXCI6XG4gICAgICAgICAgICAgICAgICAgIHJhKGUzMiwgYTYsIHUxMik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzdXBwcmVzc0NvbnRlbnRFZGl0YWJsZVdhcm5pbmdcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwic3VwcHJlc3NIeWRyYXRpb25XYXJuaW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGZhKGYxMSkgJiYgXCJmdW5jdGlvblwiICE9PSB0eXBlb2YgdTEyICYmIFwic3ltYm9sXCIgIT09IHR5cGVvZiB1MTIgJiYgZTMyLnB1c2goXCIgXCIsIGYxMSwgJz1cIicsIHc0KHUxMiksICdcIicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZTMyLnB1c2goXCI+XCIpO1xuICAgICAgICAgICAgQjEoZTMyLCBpNCwgbCk7XG4gICAgICAgICAgICByZXR1cm4gbDtcbiAgICB9XG59XG5mdW5jdGlvbiB4YShlMzMsIG4sIHIxMCkge1xuICAgIHEyKGUzMywgJ1xceDNjIS0tJD8tLVxceDNlPHRlbXBsYXRlIGlkPVwiJyk7XG4gICAgaWYgKG51bGwgPT09IHIxMCkgdGhyb3cgRXJyb3IobTMoMzk1KSk7XG4gICAgcTIoZTMzLCByMTApO1xuICAgIHJldHVybiBxMihlMzMsICdcIj48L3RlbXBsYXRlPicpO1xufVxuZnVuY3Rpb24geWEoZTM0LCBuMjAsIHIxMSwgYTcpIHtcbiAgICBzd2l0Y2gocjExLmluc2VydGlvbk1vZGUpe1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIHJldHVybiBxMihlMzQsICc8ZGl2IGhpZGRlbiBpZD1cIicpLCBxMihlMzQsIG4yMC5zZWdtZW50UHJlZml4KSwgcTIoZTM0LCBhNy50b1N0cmluZygxNikpLCBxMihlMzQsICdcIj4nKTtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgcmV0dXJuIHEyKGUzNCwgJzxzdmcgYXJpYS1oaWRkZW49XCJ0cnVlXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIiBpZD1cIicpLCBxMihlMzQsIG4yMC5zZWdtZW50UHJlZml4KSwgcTIoZTM0LCBhNy50b1N0cmluZygxNikpLCBxMihlMzQsICdcIj4nKTtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgcmV0dXJuIHEyKGUzNCwgJzxtYXRoIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHN0eWxlPVwiZGlzcGxheTpub25lXCIgaWQ9XCInKSwgcTIoZTM0LCBuMjAuc2VnbWVudFByZWZpeCksIHEyKGUzNCwgYTcudG9TdHJpbmcoMTYpKSwgcTIoZTM0LCAnXCI+Jyk7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgIHJldHVybiBxMihlMzQsICc8dGFibGUgaGlkZGVuIGlkPVwiJyksIHEyKGUzNCwgbjIwLnNlZ21lbnRQcmVmaXgpLCBxMihlMzQsIGE3LnRvU3RyaW5nKDE2KSksIHEyKGUzNCwgJ1wiPicpO1xuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICByZXR1cm4gcTIoZTM0LCAnPHRhYmxlIGhpZGRlbj48dGJvZHkgaWQ9XCInKSwgcTIoZTM0LCBuMjAuc2VnbWVudFByZWZpeCksIHEyKGUzNCwgYTcudG9TdHJpbmcoMTYpKSwgcTIoZTM0LCAnXCI+Jyk7XG4gICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgIHJldHVybiBxMihlMzQsICc8dGFibGUgaGlkZGVuPjx0ciBpZD1cIicpLCBxMihlMzQsIG4yMC5zZWdtZW50UHJlZml4KSwgcTIoZTM0LCBhNy50b1N0cmluZygxNikpLCBxMihlMzQsICdcIj4nKTtcbiAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgcmV0dXJuIHEyKGUzNCwgJzx0YWJsZSBoaWRkZW4+PGNvbGdyb3VwIGlkPVwiJyksIHEyKGUzNCwgbjIwLnNlZ21lbnRQcmVmaXgpLCBxMihlMzQsIGE3LnRvU3RyaW5nKDE2KSksIHEyKGUzNCwgJ1wiPicpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgRXJyb3IobTMoMzk3KSk7XG4gICAgfVxufVxuZnVuY3Rpb24gemEoZTM1LCBuMjEpIHtcbiAgICBzd2l0Y2gobjIxLmluc2VydGlvbk1vZGUpe1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIHJldHVybiBxMihlMzUsIFwiPC9kaXY+XCIpO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICByZXR1cm4gcTIoZTM1LCBcIjwvc3ZnPlwiKTtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgcmV0dXJuIHEyKGUzNSwgXCI8L21hdGg+XCIpO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICByZXR1cm4gcTIoZTM1LCBcIjwvdGFibGU+XCIpO1xuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICByZXR1cm4gcTIoZTM1LCBcIjwvdGJvZHk+PC90YWJsZT5cIik7XG4gICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgIHJldHVybiBxMihlMzUsIFwiPC90cj48L3RhYmxlPlwiKTtcbiAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgcmV0dXJuIHEyKGUzNSwgXCI8L2NvbGdyb3VwPjwvdGFibGU+XCIpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgRXJyb3IobTMoMzk3KSk7XG4gICAgfVxufVxuZnVuY3Rpb24gQWEoZTM2LCBuMjIpIHtcbiAgICBuMjIgPSB2b2lkIDAgPT09IG4yMiA/IFwiXCIgOiBuMjI7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYm9vdHN0cmFwQ2h1bmtzOiBbXSxcbiAgICAgICAgc3RhcnRJbmxpbmVTY3JpcHQ6IFwiPHNjcmlwdD5cIixcbiAgICAgICAgcGxhY2Vob2xkZXJQcmVmaXg6IG4yMiArIFwiUDpcIixcbiAgICAgICAgc2VnbWVudFByZWZpeDogbjIyICsgXCJTOlwiLFxuICAgICAgICBib3VuZGFyeVByZWZpeDogbjIyICsgXCJCOlwiLFxuICAgICAgICBpZFByZWZpeDogbjIyICsgXCJSOlwiLFxuICAgICAgICBuZXh0U3VzcGVuc2VJRDogMCxcbiAgICAgICAgc2VudENvbXBsZXRlU2VnbWVudEZ1bmN0aW9uOiAhMSxcbiAgICAgICAgc2VudENvbXBsZXRlQm91bmRhcnlGdW5jdGlvbjogITEsXG4gICAgICAgIHNlbnRDbGllbnRSZW5kZXJGdW5jdGlvbjogITEsXG4gICAgICAgIGdlbmVyYXRlU3RhdGljTWFya3VwOiBlMzZcbiAgICB9O1xufVxudmFyIFAyID0gNjAxMDMsIE4yID0gNjAxMDYsIEQzID0gNjAxMDcsIGoyID0gNjAxMDgsICQyID0gNjAxMTQsIEEyID0gNjAxMDksIEwxID0gNjAxMTAsIE8yID0gNjAxMTIsIFUxID0gNjAxMTMsIEcxID0gNjAxMjAsIEoxID0gNjAxMTUsIEsxID0gNjAxMTYsIFExID0gNjAxMTksIGVlMSA9IDYwMTI5LCB0ZTEgPSA2MDEzMSwgbmUxID0gNjAxMzI7XG5pZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YgU3ltYm9sICYmIFN5bWJvbC5mb3IpIHtcbiAgICB2YXIgcmUxID0gU3ltYm9sLmZvcjtcbiAgICBQMiA9IHJlMShcInJlYWN0LmVsZW1lbnRcIik7XG4gICAgTjIgPSByZTEoXCJyZWFjdC5wb3J0YWxcIik7XG4gICAgRDMgPSByZTEoXCJyZWFjdC5mcmFnbWVudFwiKTtcbiAgICBqMiA9IHJlMShcInJlYWN0LnN0cmljdF9tb2RlXCIpO1xuICAgICQyID0gcmUxKFwicmVhY3QucHJvZmlsZXJcIik7XG4gICAgQTIgPSByZTEoXCJyZWFjdC5wcm92aWRlclwiKTtcbiAgICBMMSA9IHJlMShcInJlYWN0LmNvbnRleHRcIik7XG4gICAgTzIgPSByZTEoXCJyZWFjdC5mb3J3YXJkX3JlZlwiKTtcbiAgICBVMSA9IHJlMShcInJlYWN0LnN1c3BlbnNlXCIpO1xuICAgIEcxID0gcmUxKFwicmVhY3Quc3VzcGVuc2VfbGlzdFwiKTtcbiAgICBKMSA9IHJlMShcInJlYWN0Lm1lbW9cIik7XG4gICAgSzEgPSByZTEoXCJyZWFjdC5sYXp5XCIpO1xuICAgIFExID0gcmUxKFwicmVhY3Quc2NvcGVcIik7XG4gICAgZWUxID0gcmUxKFwicmVhY3QuZGVidWdfdHJhY2VfbW9kZVwiKTtcbiAgICB0ZTEgPSByZTEoXCJyZWFjdC5sZWdhY3lfaGlkZGVuXCIpO1xuICAgIG5lMSA9IHJlMShcInJlYWN0LmNhY2hlXCIpO1xufVxudmFyIGFlMSA9IFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIFN5bWJvbCAmJiBTeW1ib2wuaXRlcmF0b3I7XG5mdW5jdGlvbiBSYShlMzcpIHtcbiAgICBpZiAobnVsbCA9PSBlMzcpIHJldHVybiBudWxsO1xuICAgIGlmIChcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBlMzcpIHJldHVybiBlMzcuZGlzcGxheU5hbWUgfHwgZTM3Lm5hbWUgfHwgbnVsbDtcbiAgICBpZiAoXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGUzNykgcmV0dXJuIGUzNztcbiAgICBzd2l0Y2goZTM3KXtcbiAgICAgICAgY2FzZSBEMzpcbiAgICAgICAgICAgIHJldHVybiBcIkZyYWdtZW50XCI7XG4gICAgICAgIGNhc2UgTjI6XG4gICAgICAgICAgICByZXR1cm4gXCJQb3J0YWxcIjtcbiAgICAgICAgY2FzZSAkMjpcbiAgICAgICAgICAgIHJldHVybiBcIlByb2ZpbGVyXCI7XG4gICAgICAgIGNhc2UgajI6XG4gICAgICAgICAgICByZXR1cm4gXCJTdHJpY3RNb2RlXCI7XG4gICAgICAgIGNhc2UgVTE6XG4gICAgICAgICAgICByZXR1cm4gXCJTdXNwZW5zZVwiO1xuICAgICAgICBjYXNlIEcxOlxuICAgICAgICAgICAgcmV0dXJuIFwiU3VzcGVuc2VMaXN0XCI7XG4gICAgICAgIGNhc2UgbmUxOlxuICAgICAgICAgICAgcmV0dXJuIFwiQ2FjaGVcIjtcbiAgICB9XG4gICAgaWYgKFwib2JqZWN0XCIgPT09IHR5cGVvZiBlMzcpIHN3aXRjaChlMzcuJCR0eXBlb2Ype1xuICAgICAgICBjYXNlIEwxOlxuICAgICAgICAgICAgcmV0dXJuIChlMzcuZGlzcGxheU5hbWUgfHwgXCJDb250ZXh0XCIpICsgXCIuQ29uc3VtZXJcIjtcbiAgICAgICAgY2FzZSBBMjpcbiAgICAgICAgICAgIHJldHVybiAoZTM3Ll9jb250ZXh0LmRpc3BsYXlOYW1lIHx8IFwiQ29udGV4dFwiKSArIFwiLlByb3ZpZGVyXCI7XG4gICAgICAgIGNhc2UgTzI6XG4gICAgICAgICAgICB2YXIgbjIzID0gZTM3LnJlbmRlcjtcbiAgICAgICAgICAgIGUzNyA9IGUzNy5kaXNwbGF5TmFtZTtcbiAgICAgICAgICAgIGUzNyB8fCAoZTM3ID0gbjIzLmRpc3BsYXlOYW1lIHx8IG4yMy5uYW1lIHx8IFwiXCIsIGUzNyA9IFwiXCIgIT09IGUzNyA/IFwiRm9yd2FyZFJlZihcIiArIGUzNyArIFwiKVwiIDogXCJGb3J3YXJkUmVmXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGUzNztcbiAgICAgICAgY2FzZSBKMTpcbiAgICAgICAgICAgIHJldHVybiBuMjMgPSBlMzcuZGlzcGxheU5hbWUgfHwgbnVsbCwgbnVsbCAhPT0gbjIzID8gbjIzIDogUmEoZTM3LnR5cGUpIHx8IFwiTWVtb1wiO1xuICAgICAgICBjYXNlIEsxOlxuICAgICAgICAgICAgbjIzID0gZTM3Ll9wYXlsb2FkO1xuICAgICAgICAgICAgZTM3ID0gZTM3Ll9pbml0O1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUmEoZTM3KG4yMykpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG52YXIgb2UxID0ge307XG5mdW5jdGlvbiBUYShlMzgsIG4yNCkge1xuICAgIGUzOCA9IGUzOC5jb250ZXh0VHlwZXM7XG4gICAgaWYgKCFlMzgpIHJldHVybiBvZTE7XG4gICAgdmFyIHIxMiwgYTggPSB7fTtcbiAgICBmb3IocjEyIGluIGUzOClhOFtyMTJdID0gbjI0W3IxMl07XG4gICAgcmV0dXJuIGE4O1xufVxudmFyIGxlMSA9IG51bGw7XG5mdW5jdGlvbiBIMShlMzksIG4yNSkge1xuICAgIGlmIChlMzkgIT09IG4yNSkge1xuICAgICAgICBlMzkuY29udGV4dC5fY3VycmVudFZhbHVlMiA9IGUzOS5wYXJlbnRWYWx1ZTtcbiAgICAgICAgZTM5ID0gZTM5LnBhcmVudDtcbiAgICAgICAgdmFyIHIxMyA9IG4yNS5wYXJlbnQ7XG4gICAgICAgIGlmIChudWxsID09PSBlMzkpIHtcbiAgICAgICAgICAgIGlmIChudWxsICE9PSByMTMpIHRocm93IEVycm9yKG0zKDQwMSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG51bGwgPT09IHIxMykgdGhyb3cgRXJyb3IobTMoNDAxKSk7XG4gICAgICAgICAgICBIMShlMzksIHIxMyk7XG4gICAgICAgICAgICBuMjUuY29udGV4dC5fY3VycmVudFZhbHVlMiA9IG4yNS52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIFVhKGU0MCkge1xuICAgIGU0MC5jb250ZXh0Ll9jdXJyZW50VmFsdWUyID0gZTQwLnBhcmVudFZhbHVlO1xuICAgIGU0MCA9IGU0MC5wYXJlbnQ7XG4gICAgbnVsbCAhPT0gZTQwICYmIFVhKGU0MCk7XG59XG5mdW5jdGlvbiBWYShlNDEpIHtcbiAgICB2YXIgbjI2ID0gZTQxLnBhcmVudDtcbiAgICBudWxsICE9PSBuMjYgJiYgVmEobjI2KTtcbiAgICBlNDEuY29udGV4dC5fY3VycmVudFZhbHVlMiA9IGU0MS52YWx1ZTtcbn1cbmZ1bmN0aW9uIFdhMShlNDIsIG4yNykge1xuICAgIGU0Mi5jb250ZXh0Ll9jdXJyZW50VmFsdWUyID0gZTQyLnBhcmVudFZhbHVlO1xuICAgIGU0MiA9IGU0Mi5wYXJlbnQ7XG4gICAgaWYgKG51bGwgPT09IGU0MikgdGhyb3cgRXJyb3IobTMoNDAyKSk7XG4gICAgZTQyLmRlcHRoID09PSBuMjcuZGVwdGggPyBIMShlNDIsIG4yNykgOiBXYTEoZTQyLCBuMjcpO1xufVxuZnVuY3Rpb24gWGEoZTQzLCBuMjgpIHtcbiAgICB2YXIgcjE0ID0gbjI4LnBhcmVudDtcbiAgICBpZiAobnVsbCA9PT0gcjE0KSB0aHJvdyBFcnJvcihtMyg0MDIpKTtcbiAgICBlNDMuZGVwdGggPT09IHIxNC5kZXB0aCA/IEgxKGU0MywgcjE0KSA6IFhhKGU0MywgcjE0KTtcbiAgICBuMjguY29udGV4dC5fY3VycmVudFZhbHVlMiA9IG4yOC52YWx1ZTtcbn1cbmZ1bmN0aW9uIEkxKGU0NCkge1xuICAgIHZhciBuMjkgPSBsZTE7XG4gICAgbjI5ICE9PSBlNDQgJiYgKG51bGwgPT09IG4yOSA/IFZhKGU0NCkgOiBudWxsID09PSBlNDQgPyBVYShuMjkpIDogbjI5LmRlcHRoID09PSBlNDQuZGVwdGggPyBIMShuMjksIGU0NCkgOiBuMjkuZGVwdGggPiBlNDQuZGVwdGggPyBXYTEobjI5LCBlNDQpIDogWGEobjI5LCBlNDQpLCBsZTEgPSBlNDQpO1xufVxudmFyIGllMSA9IHtcbiAgICBpc01vdW50ZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gITE7XG4gICAgfSxcbiAgICBlbnF1ZXVlU2V0U3RhdGU6IGZ1bmN0aW9uKGU0NSwgbjMwKSB7XG4gICAgICAgIGU0NSA9IGU0NS5fcmVhY3RJbnRlcm5hbHM7XG4gICAgICAgIG51bGwgIT09IGU0NS5xdWV1ZSAmJiBlNDUucXVldWUucHVzaChuMzApO1xuICAgIH0sXG4gICAgZW5xdWV1ZVJlcGxhY2VTdGF0ZTogZnVuY3Rpb24oZTQ2LCBuMzEpIHtcbiAgICAgICAgZTQ2ID0gZTQ2Ll9yZWFjdEludGVybmFscztcbiAgICAgICAgZTQ2LnJlcGxhY2UgPSAhMDtcbiAgICAgICAgZTQ2LnF1ZXVlID0gW1xuICAgICAgICAgICAgbjMxXG4gICAgICAgIF07XG4gICAgfSxcbiAgICBlbnF1ZXVlRm9yY2VVcGRhdGU6IGZ1bmN0aW9uKCkge31cbn07XG5mdW5jdGlvbiBaYShlNDcsIG4zMiwgcjE1LCBhOSkge1xuICAgIHZhciBvNiA9IHZvaWQgMCAhPT0gZTQ3LnN0YXRlID8gZTQ3LnN0YXRlIDogbnVsbDtcbiAgICBlNDcudXBkYXRlciA9IGllMTtcbiAgICBlNDcucHJvcHMgPSByMTU7XG4gICAgZTQ3LnN0YXRlID0gbzY7XG4gICAgdmFyIGwgPSB7XG4gICAgICAgIHF1ZXVlOiBbXSxcbiAgICAgICAgcmVwbGFjZTogITFcbiAgICB9O1xuICAgIGU0Ny5fcmVhY3RJbnRlcm5hbHMgPSBsO1xuICAgIHZhciB1MjIgPSBuMzIuY29udGV4dFR5cGU7XG4gICAgZTQ3LmNvbnRleHQgPSBcIm9iamVjdFwiID09PSB0eXBlb2YgdTIyICYmIG51bGwgIT09IHUyMiA/IHUyMi5fY3VycmVudFZhbHVlMiA6IGE5O1xuICAgIHUyMiA9IG4zMi5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHM7XG4gICAgXCJmdW5jdGlvblwiID09PSB0eXBlb2YgdTIyICYmICh1MjIgPSB1MjIocjE1LCBvNiksIG82ID0gbnVsbCA9PT0gdTIyIHx8IHZvaWQgMCA9PT0gdTIyID8gbzYgOiBpMyh7fSwgbzYsIHUyMiksIGU0Ny5zdGF0ZSA9IG82KTtcbiAgICBpZiAoXCJmdW5jdGlvblwiICE9PSB0eXBlb2YgbjMyLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyAmJiBcImZ1bmN0aW9uXCIgIT09IHR5cGVvZiBlNDcuZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUgJiYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGU0Ny5VTlNBRkVfY29tcG9uZW50V2lsbE1vdW50IHx8IFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGU0Ny5jb21wb25lbnRXaWxsTW91bnQpKSBpZiAobjMyID0gZTQ3LnN0YXRlLCBcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBlNDcuY29tcG9uZW50V2lsbE1vdW50ICYmIGU0Ny5jb21wb25lbnRXaWxsTW91bnQoKSwgXCJmdW5jdGlvblwiID09PSB0eXBlb2YgZTQ3LlVOU0FGRV9jb21wb25lbnRXaWxsTW91bnQgJiYgZTQ3LlVOU0FGRV9jb21wb25lbnRXaWxsTW91bnQoKSwgbjMyICE9PSBlNDcuc3RhdGUgJiYgaWUxLmVucXVldWVSZXBsYWNlU3RhdGUoZTQ3LCBlNDcuc3RhdGUsIG51bGwpLCBudWxsICE9PSBsLnF1ZXVlICYmIDAgPCBsLnF1ZXVlLmxlbmd0aCkgaWYgKG4zMiA9IGwucXVldWUsIHUyMiA9IGwucmVwbGFjZSwgbC5xdWV1ZSA9IG51bGwsIGwucmVwbGFjZSA9ICExLCB1MjIgJiYgMSA9PT0gbjMyLmxlbmd0aCkgZTQ3LnN0YXRlID0gbjMyWzBdO1xuICAgIGVsc2Uge1xuICAgICAgICBsID0gdTIyID8gbjMyWzBdIDogZTQ3LnN0YXRlO1xuICAgICAgICBvNiA9ICEwO1xuICAgICAgICBmb3IodTIyID0gdTIyID8gMSA6IDA7IHUyMiA8IG4zMi5sZW5ndGg7IHUyMisrKXtcbiAgICAgICAgICAgIHZhciBzMjIgPSBuMzJbdTIyXTtcbiAgICAgICAgICAgIHMyMiA9IFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIHMyMiA/IHMyMi5jYWxsKGU0NywgbCwgcjE1LCBhOSkgOiBzMjI7XG4gICAgICAgICAgICBudWxsICE9IHMyMiAmJiAobzYgPyAobzYgPSAhMSwgbCA9IGkzKHt9LCBsLCBzMjIpKSA6IGkzKGwsIHMyMikpO1xuICAgICAgICB9XG4gICAgICAgIGU0Ny5zdGF0ZSA9IGw7XG4gICAgfVxuICAgIGVsc2UgbC5xdWV1ZSA9IG51bGw7XG59XG52YXIgdWUxID0ge1xuICAgIGlkOiAxLFxuICAgIG92ZXJmbG93OiBcIlwiXG59O1xuZnVuY3Rpb24gYWIoZTQ4LCBuMzMsIHIxNikge1xuICAgIHZhciBhMTAgPSBlNDguaWQ7XG4gICAgZTQ4ID0gZTQ4Lm92ZXJmbG93O1xuICAgIHZhciBvNyA9IDMyIC0gc2UxKGExMCkgLSAxO1xuICAgIGExMCAmPSB+KDEgPDwgbzcpO1xuICAgIHIxNiArPSAxO1xuICAgIHZhciBsID0gMzIgLSBzZTEobjMzKSArIG83O1xuICAgIGlmICgzMCA8IGwpIHtcbiAgICAgICAgdmFyIGk1ID0gbzcgLSBvNyAlIDU7XG4gICAgICAgIGwgPSAoYTEwICYgKDEgPDwgaTUpIC0gMSkudG9TdHJpbmcoMzIpO1xuICAgICAgICBhMTAgPj49IGk1O1xuICAgICAgICBvNyAtPSBpNTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiAxIDw8IDMyIC0gc2UxKG4zMykgKyBvNyB8IHIxNiA8PCBvNyB8IGExMCxcbiAgICAgICAgICAgIG92ZXJmbG93OiBsICsgZTQ4XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGlkOiAxIDw8IGwgfCByMTYgPDwgbzcgfCBhMTAsXG4gICAgICAgIG92ZXJmbG93OiBlNDhcbiAgICB9O1xufVxudmFyIHNlMSA9IE1hdGguY2x6MzIgPyBNYXRoLmNsejMyIDogYmIsIGNlMSA9IE1hdGgubG9nLCBmZTEgPSBNYXRoLkxOMjtcbmZ1bmN0aW9uIGJiKGU0OSkge1xuICAgIGU0OSA+Pj49IDA7XG4gICAgcmV0dXJuIDAgPT09IGU0OSA/IDMyIDogMzEgLSAoY2UxKGU0OSkgLyBmZTEgfCAwKSB8IDA7XG59XG5mdW5jdGlvbiBlYihlNTAsIG4zNCkge1xuICAgIHJldHVybiBlNTAgPT09IG4zNCAmJiAoMCAhPT0gZTUwIHx8IDEgLyBlNTAgPT09IDEgLyBuMzQpIHx8IGU1MCAhPT0gZTUwICYmIG4zNCAhPT0gbjM0O1xufVxudmFyIGRlMSA9IFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIE9iamVjdC5pcyA/IE9iamVjdC5pcyA6IGViLCBwZTEgPSBudWxsLCBoZTEgPSBudWxsLCBtZTEgPSBudWxsLCBiZTEgPSBudWxsLCBnZTEgPSAhMSwgdmUxID0gITEsIHllMSA9IDAsIFNlMSA9IG51bGwsIHhlMSA9IDA7XG5mdW5jdGlvbiBTMigpIHtcbiAgICBpZiAobnVsbCA9PT0gcGUxKSB0aHJvdyBFcnJvcihtMygzMjEpKTtcbiAgICByZXR1cm4gcGUxO1xufVxuZnVuY3Rpb24gaGIoKSB7XG4gICAgaWYgKDAgPCB4ZTEpIHRocm93IEVycm9yKG0zKDMxMikpO1xuICAgIHJldHVybiB7XG4gICAgICAgIG1lbW9pemVkU3RhdGU6IG51bGwsXG4gICAgICAgIHF1ZXVlOiBudWxsLFxuICAgICAgICBuZXh0OiBudWxsXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGliKCkge1xuICAgIG51bGwgPT09IGJlMSA/IG51bGwgPT09IG1lMSA/IChnZTEgPSAhMSwgbWUxID0gYmUxID0gaGIoKSkgOiAoZ2UxID0gITAsIGJlMSA9IG1lMSkgOiBudWxsID09PSBiZTEubmV4dCA/IChnZTEgPSAhMSwgYmUxID0gYmUxLm5leHQgPSBoYigpKSA6IChnZTEgPSAhMCwgYmUxID0gYmUxLm5leHQpO1xuICAgIHJldHVybiBiZTE7XG59XG5mdW5jdGlvbiBqYigpIHtcbiAgICBoZTEgPSBwZTEgPSBudWxsO1xuICAgIHZlMSA9ICExO1xuICAgIG1lMSA9IG51bGw7XG4gICAgeGUxID0gMDtcbiAgICBiZTEgPSBTZTEgPSBudWxsO1xufVxuZnVuY3Rpb24ga2IoZTUxLCBuMzUpIHtcbiAgICByZXR1cm4gXCJmdW5jdGlvblwiID09PSB0eXBlb2YgbjM1ID8gbjM1KGU1MSkgOiBuMzU7XG59XG5mdW5jdGlvbiBsYihlNTIsIG4zNiwgcjE3KSB7XG4gICAgcGUxID0gUzIoKTtcbiAgICBiZTEgPSBpYigpO1xuICAgIGlmIChnZTEpIHtcbiAgICAgICAgdmFyIGExMSA9IGJlMS5xdWV1ZTtcbiAgICAgICAgbjM2ID0gYTExLmRpc3BhdGNoO1xuICAgICAgICBpZiAobnVsbCAhPT0gU2UxICYmIChyMTcgPSBTZTEuZ2V0KGExMSksIHZvaWQgMCAhPT0gcjE3KSkge1xuICAgICAgICAgICAgU2UxLmRlbGV0ZShhMTEpO1xuICAgICAgICAgICAgYTExID0gYmUxLm1lbW9pemVkU3RhdGU7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgYTExID0gZTUyKGExMSwgcjE3LmFjdGlvbiksIHIxNyA9IHIxNy5uZXh0O1xuICAgICAgICAgICAgfXdoaWxlIChudWxsICE9PSByMTcpXG4gICAgICAgICAgICBiZTEubWVtb2l6ZWRTdGF0ZSA9IGExMTtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgYTExLFxuICAgICAgICAgICAgICAgIG4zNlxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgYmUxLm1lbW9pemVkU3RhdGUsXG4gICAgICAgICAgICBuMzZcbiAgICAgICAgXTtcbiAgICB9XG4gICAgZTUyID0gZTUyID09PSBrYiA/IFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIG4zNiA/IG4zNigpIDogbjM2IDogdm9pZCAwICE9PSByMTcgPyByMTcobjM2KSA6IG4zNjtcbiAgICBiZTEubWVtb2l6ZWRTdGF0ZSA9IGU1MjtcbiAgICBlNTIgPSBiZTEucXVldWUgPSB7XG4gICAgICAgIGxhc3Q6IG51bGwsXG4gICAgICAgIGRpc3BhdGNoOiBudWxsXG4gICAgfTtcbiAgICBlNTIgPSBlNTIuZGlzcGF0Y2ggPSBtYi5iaW5kKG51bGwsIHBlMSwgZTUyKTtcbiAgICByZXR1cm4gW1xuICAgICAgICBiZTEubWVtb2l6ZWRTdGF0ZSxcbiAgICAgICAgZTUyXG4gICAgXTtcbn1cbmZ1bmN0aW9uIG5iKGU1MywgbjM3KSB7XG4gICAgcGUxID0gUzIoKTtcbiAgICBiZTEgPSBpYigpO1xuICAgIG4zNyA9IHZvaWQgMCA9PT0gbjM3ID8gbnVsbCA6IG4zNztcbiAgICBpZiAobnVsbCAhPT0gYmUxKSB7XG4gICAgICAgIHZhciByMTggPSBiZTEubWVtb2l6ZWRTdGF0ZTtcbiAgICAgICAgaWYgKG51bGwgIT09IHIxOCAmJiBudWxsICE9PSBuMzcpIHtcbiAgICAgICAgICAgIHZhciBhMTIgPSByMThbMV07XG4gICAgICAgICAgICBlOiBpZiAobnVsbCA9PT0gYTEyKSBhMTIgPSAhMTtcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvcih2YXIgbzggPSAwOyBvOCA8IGExMi5sZW5ndGggJiYgbzggPCBuMzcubGVuZ3RoOyBvOCsrKWlmICghZGUxKG4zN1tvOF0sIGExMltvOF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGExMiA9ICExO1xuICAgICAgICAgICAgICAgICAgICBicmVhayBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhMTIgPSAhMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhMTIpIHJldHVybiByMThbMF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZTUzID0gZTUzKCk7XG4gICAgYmUxLm1lbW9pemVkU3RhdGUgPSBbXG4gICAgICAgIGU1MyxcbiAgICAgICAgbjM3XG4gICAgXTtcbiAgICByZXR1cm4gZTUzO1xufVxuZnVuY3Rpb24gbWIoZTU0LCBuMzgsIHIxOSkge1xuICAgIGlmICgyNSA8PSB4ZTEpIHRocm93IEVycm9yKG0zKDMwMSkpO1xuICAgIGlmIChlNTQgPT09IHBlMSkgaWYgKHZlMSA9ICEwLCBlNTQgPSB7XG4gICAgICAgIGFjdGlvbjogcjE5LFxuICAgICAgICBuZXh0OiBudWxsXG4gICAgfSwgbnVsbCA9PT0gU2UxICYmIChTZTEgPSBuZXcgTWFwKSwgcjE5ID0gU2UxLmdldChuMzgpLCB2b2lkIDAgPT09IHIxOSkgU2UxLnNldChuMzgsIGU1NCk7XG4gICAgZWxzZSB7XG4gICAgICAgIGZvcihuMzggPSByMTk7IG51bGwgIT09IG4zOC5uZXh0OyluMzggPSBuMzgubmV4dDtcbiAgICAgICAgbjM4Lm5leHQgPSBlNTQ7XG4gICAgfVxufVxuZnVuY3Rpb24gb2IoKSB7XG4gICAgdGhyb3cgRXJyb3IobTMoMzk0KSk7XG59XG5mdW5jdGlvbiBUMSgpIHt9XG52YXIga2UxID0ge1xuICAgIHJlYWRDb250ZXh0OiBmdW5jdGlvbihlNTUpIHtcbiAgICAgICAgcmV0dXJuIGU1NS5fY3VycmVudFZhbHVlMjtcbiAgICB9LFxuICAgIHVzZUNvbnRleHQ6IGZ1bmN0aW9uKGU1Nikge1xuICAgICAgICBTMigpO1xuICAgICAgICByZXR1cm4gZTU2Ll9jdXJyZW50VmFsdWUyO1xuICAgIH0sXG4gICAgdXNlTWVtbzogbmIsXG4gICAgdXNlUmVkdWNlcjogbGIsXG4gICAgdXNlUmVmOiBmdW5jdGlvbihlNTcpIHtcbiAgICAgICAgcGUxID0gUzIoKTtcbiAgICAgICAgYmUxID0gaWIoKTtcbiAgICAgICAgdmFyIG4zOSA9IGJlMS5tZW1vaXplZFN0YXRlO1xuICAgICAgICByZXR1cm4gbnVsbCA9PT0gbjM5ID8gKGU1NyA9IHtcbiAgICAgICAgICAgIGN1cnJlbnQ6IGU1N1xuICAgICAgICB9LCBiZTEubWVtb2l6ZWRTdGF0ZSA9IGU1NykgOiBuMzk7XG4gICAgfSxcbiAgICB1c2VTdGF0ZTogZnVuY3Rpb24oZTU4KSB7XG4gICAgICAgIHJldHVybiBsYihrYiwgZTU4KTtcbiAgICB9LFxuICAgIHVzZUluc2VydGlvbkVmZmVjdDogVDEsXG4gICAgdXNlTGF5b3V0RWZmZWN0OiBmdW5jdGlvbigpIHt9LFxuICAgIHVzZUNhbGxiYWNrOiBmdW5jdGlvbihlNTksIG40MCkge1xuICAgICAgICByZXR1cm4gbmIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gZTU5O1xuICAgICAgICB9LCBuNDApO1xuICAgIH0sXG4gICAgdXNlSW1wZXJhdGl2ZUhhbmRsZTogVDEsXG4gICAgdXNlRWZmZWN0OiBUMSxcbiAgICB1c2VEZWJ1Z1ZhbHVlOiBUMSxcbiAgICB1c2VEZWZlcnJlZFZhbHVlOiBmdW5jdGlvbihlNjApIHtcbiAgICAgICAgUzIoKTtcbiAgICAgICAgcmV0dXJuIGU2MDtcbiAgICB9LFxuICAgIHVzZVRyYW5zaXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICBTMigpO1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgITEsXG4gICAgICAgICAgICBvYlxuICAgICAgICBdO1xuICAgIH0sXG4gICAgdXNlSWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZTYxID0gaGUxLnRyZWVDb250ZXh0O1xuICAgICAgICB2YXIgbjQxID0gZTYxLm92ZXJmbG93O1xuICAgICAgICBlNjEgPSBlNjEuaWQ7XG4gICAgICAgIGU2MSA9IChlNjEgJiB+KDEgPDwgMzIgLSBzZTEoZTYxKSAtIDEpKS50b1N0cmluZygzMikgKyBuNDE7XG4gICAgICAgIHZhciByMjAgPSB3ZTE7XG4gICAgICAgIGlmIChudWxsID09PSByMjApIHRocm93IEVycm9yKG0zKDQwNCkpO1xuICAgICAgICBuNDEgPSB5ZTErKztcbiAgICAgICAgZTYxID0gcjIwLmlkUHJlZml4ICsgZTYxO1xuICAgICAgICAwIDwgbjQxICYmIChlNjEgKz0gXCI6XCIgKyBuNDEudG9TdHJpbmcoMzIpKTtcbiAgICAgICAgcmV0dXJuIGU2MTtcbiAgICB9LFxuICAgIHVzZU11dGFibGVTb3VyY2U6IGZ1bmN0aW9uKGU2MiwgbjQyKSB7XG4gICAgICAgIFMyKCk7XG4gICAgICAgIHJldHVybiBuNDIoZTYyLl9zb3VyY2UpO1xuICAgIH0sXG4gICAgdXNlU3luY0V4dGVybmFsU3RvcmU6IGZ1bmN0aW9uKGUsIG4sIHIyMSkge1xuICAgICAgICBpZiAodm9pZCAwID09PSByMjEpIHRocm93IEVycm9yKG0zKDQwNykpO1xuICAgICAgICByZXR1cm4gcjIxKCk7XG4gICAgfVxufSwgd2UxID0gbnVsbCwgQ2UxID0gdTMuX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQuUmVhY3RDdXJyZW50RGlzcGF0Y2hlcjtcbmZ1bmN0aW9uIHJiMShlNjMpIHtcbiAgICBjb25zb2xlLmVycm9yKGU2Myk7XG59XG5mdW5jdGlvbiBzYjEoKSB7fVxuZnVuY3Rpb24gdGIoZTY0LCBuNDMsIHIyMiwgYTEzLCBvOSwgbCwgaTYpIHtcbiAgICB2YXIgdTMxID0gW10sIHMzMSA9IG5ldyBTZXQ7XG4gICAgbjQzID0ge1xuICAgICAgICBkZXN0aW5hdGlvbjogbnVsbCxcbiAgICAgICAgcmVzcG9uc2VTdGF0ZTogbjQzLFxuICAgICAgICBwcm9ncmVzc2l2ZUNodW5rU2l6ZTogdm9pZCAwID09PSBhMTMgPyAxMjgwMCA6IGExMyxcbiAgICAgICAgc3RhdHVzOiAwLFxuICAgICAgICBmYXRhbEVycm9yOiBudWxsLFxuICAgICAgICBuZXh0U2VnbWVudElkOiAwLFxuICAgICAgICBhbGxQZW5kaW5nVGFza3M6IDAsXG4gICAgICAgIHBlbmRpbmdSb290VGFza3M6IDAsXG4gICAgICAgIGNvbXBsZXRlZFJvb3RTZWdtZW50OiBudWxsLFxuICAgICAgICBhYm9ydGFibGVUYXNrczogczMxLFxuICAgICAgICBwaW5nZWRUYXNrczogdTMxLFxuICAgICAgICBjbGllbnRSZW5kZXJlZEJvdW5kYXJpZXM6IFtdLFxuICAgICAgICBjb21wbGV0ZWRCb3VuZGFyaWVzOiBbXSxcbiAgICAgICAgcGFydGlhbEJvdW5kYXJpZXM6IFtdLFxuICAgICAgICBvbkVycm9yOiB2b2lkIDAgPT09IG85ID8gcmIxIDogbzksXG4gICAgICAgIG9uQ29tcGxldGVBbGw6IHZvaWQgMCA9PT0gbCA/IHNiMSA6IGwsXG4gICAgICAgIG9uQ29tcGxldGVTaGVsbDogdm9pZCAwID09PSBpNiA/IHNiMSA6IGk2XG4gICAgfTtcbiAgICByMjIgPSBWMyhuNDMsIDAsIG51bGwsIHIyMik7XG4gICAgcjIyLnBhcmVudEZsdXNoZWQgPSAhMDtcbiAgICBlNjQgPSB1YihuNDMsIGU2NCwgbnVsbCwgcjIyLCBzMzEsIG9lMSwgbnVsbCwgdWUxKTtcbiAgICB1MzEucHVzaChlNjQpO1xuICAgIHJldHVybiBuNDM7XG59XG5mdW5jdGlvbiB1YihlNjUsIG40NCwgcjIzLCBhMTQsIG8xMCwgbCwgaTcsIHU0KSB7XG4gICAgZTY1LmFsbFBlbmRpbmdUYXNrcysrO1xuICAgIG51bGwgPT09IHIyMyA/IGU2NS5wZW5kaW5nUm9vdFRhc2tzKysgOiByMjMucGVuZGluZ1Rhc2tzKys7XG4gICAgdmFyIHM0ID0ge1xuICAgICAgICBub2RlOiBuNDQsXG4gICAgICAgIHBpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG40NSA9IGU2NS5waW5nZWRUYXNrcztcbiAgICAgICAgICAgIG40NS5wdXNoKHM0KTtcbiAgICAgICAgICAgIDEgPT09IG40NS5sZW5ndGggJiYgdmIoZTY1KTtcbiAgICAgICAgfSxcbiAgICAgICAgYmxvY2tlZEJvdW5kYXJ5OiByMjMsXG4gICAgICAgIGJsb2NrZWRTZWdtZW50OiBhMTQsXG4gICAgICAgIGFib3J0U2V0OiBvMTAsXG4gICAgICAgIGxlZ2FjeUNvbnRleHQ6IGwsXG4gICAgICAgIGNvbnRleHQ6IGk3LFxuICAgICAgICB0cmVlQ29udGV4dDogdTRcbiAgICB9O1xuICAgIG8xMC5hZGQoczQpO1xuICAgIHJldHVybiBzNDtcbn1cbmZ1bmN0aW9uIFYzKGUsIG40NiwgcjI0LCBhMTUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6IDAsXG4gICAgICAgIGlkOiAtMSxcbiAgICAgICAgaW5kZXg6IG40NixcbiAgICAgICAgcGFyZW50Rmx1c2hlZDogITEsXG4gICAgICAgIGNodW5rczogW10sXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgZm9ybWF0Q29udGV4dDogYTE1LFxuICAgICAgICBib3VuZGFyeTogcjI0XG4gICAgfTtcbn1cbmZ1bmN0aW9uIFcxKGU2NiwgbjQ3KSB7XG4gICAgZTY2ID0gZTY2Lm9uRXJyb3I7XG4gICAgZTY2KG40Nyk7XG59XG5mdW5jdGlvbiBYMShlNjcsIG40OCkge1xuICAgIG51bGwgIT09IGU2Ny5kZXN0aW5hdGlvbiA/IChlNjcuc3RhdHVzID0gMiwgZTY3LmRlc3RpbmF0aW9uLmRlc3Ryb3kobjQ4KSkgOiAoZTY3LnN0YXR1cyA9IDEsIGU2Ny5mYXRhbEVycm9yID0gbjQ4KTtcbn1cbmZ1bmN0aW9uIHdiKGU2OCwgbjQ5LCByMjUsIGExNiwgbzExKSB7XG4gICAgcGUxID0ge307XG4gICAgaGUxID0gbjQ5O1xuICAgIHllMSA9IDA7XG4gICAgZm9yKGU2OCA9IHIyNShhMTYsIG8xMSk7IHZlMTspdmUxID0gITEsIHllMSA9IDAsIHhlMSArPSAxLCBiZTEgPSBudWxsLCBlNjggPSByMjUoYTE2LCBvMTEpO1xuICAgIGpiKCk7XG4gICAgcmV0dXJuIGU2ODtcbn1cbmZ1bmN0aW9uIHhiKGU2OSwgbjUwLCByMjYsIGExNykge1xuICAgIHZhciBvMTIgPSByMjYucmVuZGVyKCksIGwgPSBhMTcuY2hpbGRDb250ZXh0VHlwZXM7XG4gICAgaWYgKG51bGwgIT09IGwgJiYgdm9pZCAwICE9PSBsKSB7XG4gICAgICAgIHZhciB1NSA9IG41MC5sZWdhY3lDb250ZXh0O1xuICAgICAgICBpZiAoXCJmdW5jdGlvblwiICE9PSB0eXBlb2YgcjI2LmdldENoaWxkQ29udGV4dCkgYTE3ID0gdTU7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcjI2ID0gcjI2LmdldENoaWxkQ29udGV4dCgpO1xuICAgICAgICAgICAgZm9yKHZhciBzNSBpbiByMjYpaWYgKCEoczUgaW4gbCkpIHRocm93IEVycm9yKG0zKDEwOCwgUmEoYTE3KSB8fCBcIlVua25vd25cIiwgczUpKTtcbiAgICAgICAgICAgIGExNyA9IGkzKHt9LCB1NSwgcjI2KTtcbiAgICAgICAgfVxuICAgICAgICBuNTAubGVnYWN5Q29udGV4dCA9IGExNztcbiAgICAgICAgWTEoZTY5LCBuNTAsIG8xMik7XG4gICAgICAgIG41MC5sZWdhY3lDb250ZXh0ID0gdTU7XG4gICAgfSBlbHNlIFkxKGU2OSwgbjUwLCBvMTIpO1xufVxuZnVuY3Rpb24geWIoZTcwLCBuNTEpIHtcbiAgICBpZiAoZTcwICYmIGU3MC5kZWZhdWx0UHJvcHMpIHtcbiAgICAgICAgbjUxID0gaTMoe30sIG41MSk7XG4gICAgICAgIGU3MCA9IGU3MC5kZWZhdWx0UHJvcHM7XG4gICAgICAgIGZvcih2YXIgcjI3IGluIGU3MCl2b2lkIDAgPT09IG41MVtyMjddICYmIChuNTFbcjI3XSA9IGU3MFtyMjddKTtcbiAgICAgICAgcmV0dXJuIG41MTtcbiAgICB9XG4gICAgcmV0dXJuIG41MTtcbn1cbmZ1bmN0aW9uIHpiKGU3MSwgbjUyLCByMjgsIGExOCwgbzEzKSB7XG4gICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIHIyOCkgaWYgKHIyOC5wcm90b3R5cGUgJiYgcjI4LnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50KSB7XG4gICAgICAgIG8xMyA9IFRhKHIyOCwgbjUyLmxlZ2FjeUNvbnRleHQpO1xuICAgICAgICB2YXIgbCA9IHIyOC5jb250ZXh0VHlwZTtcbiAgICAgICAgbCA9IG5ldyByMjgoYTE4LCBcIm9iamVjdFwiID09PSB0eXBlb2YgbCAmJiBudWxsICE9PSBsID8gbC5fY3VycmVudFZhbHVlMiA6IG8xMyk7XG4gICAgICAgIFphKGwsIHIyOCwgYTE4LCBvMTMpO1xuICAgICAgICB4YihlNzEsIG41MiwgbCwgcjI4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsID0gVGEocjI4LCBuNTIubGVnYWN5Q29udGV4dCk7XG4gICAgICAgIG8xMyA9IHdiKGU3MSwgbjUyLCByMjgsIGExOCwgbCk7XG4gICAgICAgIHZhciBpOCA9IDAgIT09IHllMTtcbiAgICAgICAgaWYgKFwib2JqZWN0XCIgPT09IHR5cGVvZiBvMTMgJiYgbnVsbCAhPT0gbzEzICYmIFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIG8xMy5yZW5kZXIgJiYgdm9pZCAwID09PSBvMTMuJCR0eXBlb2YpIFphKG8xMywgcjI4LCBhMTgsIGwpLCB4YihlNzEsIG41MiwgbzEzLCByMjgpO1xuICAgICAgICBlbHNlIGlmIChpOCkge1xuICAgICAgICAgICAgYTE4ID0gbjUyLnRyZWVDb250ZXh0O1xuICAgICAgICAgICAgbjUyLnRyZWVDb250ZXh0ID0gYWIoYTE4LCAxLCAwKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgWTEoZTcxLCBuNTIsIG8xMyk7XG4gICAgICAgICAgICB9IGZpbmFsbHl7XG4gICAgICAgICAgICAgICAgbjUyLnRyZWVDb250ZXh0ID0gYTE4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgWTEoZTcxLCBuNTIsIG8xMyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoXCJzdHJpbmdcIiAhPT0gdHlwZW9mIHIyOCkge1xuICAgICAgICAgICAgc3dpdGNoKHIyOCl7XG4gICAgICAgICAgICAgICAgY2FzZSB0ZTE6XG4gICAgICAgICAgICAgICAgY2FzZSBlZTE6XG4gICAgICAgICAgICAgICAgY2FzZSBqMjpcbiAgICAgICAgICAgICAgICBjYXNlICQyOlxuICAgICAgICAgICAgICAgIGNhc2UgRDM6XG4gICAgICAgICAgICAgICAgICAgIFkxKGU3MSwgbjUyLCBhMTguY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY2FzZSBHMTpcbiAgICAgICAgICAgICAgICAgICAgWTEoZTcxLCBuNTIsIGExOC5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjYXNlIFExOlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihtMygzNDMpKTtcbiAgICAgICAgICAgICAgICBjYXNlIFUxOlxuICAgICAgICAgICAgICAgICAgICBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByMjggPSBuNTIuYmxvY2tlZEJvdW5kYXJ5O1xuICAgICAgICAgICAgICAgICAgICAgICAgbzEzID0gbjUyLmJsb2NrZWRTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgbCA9IGExOC5mYWxsYmFjaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGExOCA9IGExOC5jaGlsZHJlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGk4ID0gbmV3IFNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1NiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb290U2VnbWVudElEOiAtMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRGbHVzaGVkOiAhMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZW5kaW5nVGFza3M6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yY2VDbGllbnRSZW5kZXI6ICExLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZFNlZ21lbnRzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBieXRlU2l6ZTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxsYmFja0Fib3J0YWJsZVRhc2tzOiBpOFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgczYgPSBWMyhlNzEsIG8xMy5jaHVua3MubGVuZ3RoLCB1NiwgbzEzLmZvcm1hdENvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbzEzLmNoaWxkcmVuLnB1c2goczYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGMxNCA9IFYzKGU3MSwgMCwgbnVsbCwgbzEzLmZvcm1hdENvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYzE0LnBhcmVudEZsdXNoZWQgPSAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG41Mi5ibG9ja2VkQm91bmRhcnkgPSB1NjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG41Mi5ibG9ja2VkU2VnbWVudCA9IGMxNDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFiKGU3MSwgbjUyLCBhMTgpLCBjMTQuc3RhdHVzID0gMSwgdTYuY29tcGxldGVkU2VnbWVudHMucHVzaChjMTQpLCAwID09PSB1Ni5wZW5kaW5nVGFza3MpIGJyZWFrIGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChuNTMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjMTQuc3RhdHVzID0gNCwgVzEoZTcxLCBuNTMpLCB1Ni5mb3JjZUNsaWVudFJlbmRlciA9ICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG41Mi5ibG9ja2VkQm91bmRhcnkgPSByMjgsIG41Mi5ibG9ja2VkU2VnbWVudCA9IG8xMztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG41MiA9IHViKGU3MSwgbCwgcjI4LCBzNiwgaTgsIG41Mi5sZWdhY3lDb250ZXh0LCBuNTIuY29udGV4dCwgbjUyLnRyZWVDb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGU3MS5waW5nZWRUYXNrcy5wdXNoKG41Mik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFwib2JqZWN0XCIgPT09IHR5cGVvZiByMjggJiYgbnVsbCAhPT0gcjI4KSBzd2l0Y2gocjI4LiQkdHlwZW9mKXtcbiAgICAgICAgICAgICAgICBjYXNlIE8yOlxuICAgICAgICAgICAgICAgICAgICBhMTggPSB3YihlNzEsIG41MiwgcjI4LnJlbmRlciwgYTE4LCBvMTMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoMCAhPT0geWUxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByMjggPSBuNTIudHJlZUNvbnRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBuNTIudHJlZUNvbnRleHQgPSBhYihyMjgsIDEsIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBZMShlNzEsIG41MiwgYTE4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuNTIudHJlZUNvbnRleHQgPSByMjg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBZMShlNzEsIG41MiwgYTE4KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhc2UgSjE6XG4gICAgICAgICAgICAgICAgICAgIHIyOCA9IHIyOC50eXBlO1xuICAgICAgICAgICAgICAgICAgICBhMTggPSB5YihyMjgsIGExOCk7XG4gICAgICAgICAgICAgICAgICAgIHpiKGU3MSwgbjUyLCByMjgsIGExOCwgbzEzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhc2UgQTI6XG4gICAgICAgICAgICAgICAgICAgIG8xMyA9IGExOC5jaGlsZHJlbjtcbiAgICAgICAgICAgICAgICAgICAgcjI4ID0gcjI4Ll9jb250ZXh0O1xuICAgICAgICAgICAgICAgICAgICBhMTggPSBhMTgudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGwgPSByMjguX2N1cnJlbnRWYWx1ZTI7XG4gICAgICAgICAgICAgICAgICAgIHIyOC5fY3VycmVudFZhbHVlMiA9IGExODtcbiAgICAgICAgICAgICAgICAgICAgaTggPSBsZTE7XG4gICAgICAgICAgICAgICAgICAgIGxlMSA9IGExOCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogaTgsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXB0aDogbnVsbCA9PT0gaTggPyAwIDogaTguZGVwdGggKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogcjI4LFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50VmFsdWU6IGwsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYTE4XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIG41Mi5jb250ZXh0ID0gYTE4O1xuICAgICAgICAgICAgICAgICAgICBZMShlNzEsIG41MiwgbzEzKTtcbiAgICAgICAgICAgICAgICAgICAgZTcxID0gbGUxO1xuICAgICAgICAgICAgICAgICAgICBpZiAobnVsbCA9PT0gZTcxKSB0aHJvdyBFcnJvcihtMyg0MDMpKTtcbiAgICAgICAgICAgICAgICAgICAgZTcxLmNvbnRleHQuX2N1cnJlbnRWYWx1ZTIgPSBlNzEucGFyZW50VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGU3MSA9IGxlMSA9IGU3MS5wYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIG41Mi5jb250ZXh0ID0gZTcxO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY2FzZSBMMTpcbiAgICAgICAgICAgICAgICAgICAgYTE4ID0gYTE4LmNoaWxkcmVuO1xuICAgICAgICAgICAgICAgICAgICBhMTggPSBhMTgocjI4Ll9jdXJyZW50VmFsdWUyKTtcbiAgICAgICAgICAgICAgICAgICAgWTEoZTcxLCBuNTIsIGExOCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjYXNlIEsxOlxuICAgICAgICAgICAgICAgICAgICBvMTMgPSByMjguX2luaXQ7XG4gICAgICAgICAgICAgICAgICAgIHIyOCA9IG8xMyhyMjguX3BheWxvYWQpO1xuICAgICAgICAgICAgICAgICAgICBhMTggPSB5YihyMjgsIGExOCk7XG4gICAgICAgICAgICAgICAgICAgIHpiKGU3MSwgbjUyLCByMjgsIGExOCwgdm9pZCAwKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgRXJyb3IobTMoMTMwLCBudWxsID09IHIyOCA/IHIyOCA6IHR5cGVvZiByMjgsIFwiXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2gobzEzID0gbjUyLmJsb2NrZWRTZWdtZW50LCBsID0gd2ExKG8xMy5jaHVua3MsIHIyOCwgYTE4LCBlNzEucmVzcG9uc2VTdGF0ZSwgbzEzLmZvcm1hdENvbnRleHQpLCBpOCA9IG8xMy5mb3JtYXRDb250ZXh0LCBvMTMuZm9ybWF0Q29udGV4dCA9IG9hKGk4LCByMjgsIGExOCksIEFiKGU3MSwgbjUyLCBsKSwgbzEzLmZvcm1hdENvbnRleHQgPSBpOCwgcjI4KXtcbiAgICAgICAgICAgIGNhc2UgXCJhcmVhXCI6XG4gICAgICAgICAgICBjYXNlIFwiYmFzZVwiOlxuICAgICAgICAgICAgY2FzZSBcImJyXCI6XG4gICAgICAgICAgICBjYXNlIFwiY29sXCI6XG4gICAgICAgICAgICBjYXNlIFwiZW1iZWRcIjpcbiAgICAgICAgICAgIGNhc2UgXCJoclwiOlxuICAgICAgICAgICAgY2FzZSBcImltZ1wiOlxuICAgICAgICAgICAgY2FzZSBcImlucHV0XCI6XG4gICAgICAgICAgICBjYXNlIFwia2V5Z2VuXCI6XG4gICAgICAgICAgICBjYXNlIFwibGlua1wiOlxuICAgICAgICAgICAgY2FzZSBcIm1ldGFcIjpcbiAgICAgICAgICAgIGNhc2UgXCJwYXJhbVwiOlxuICAgICAgICAgICAgY2FzZSBcInNvdXJjZVwiOlxuICAgICAgICAgICAgY2FzZSBcInRyYWNrXCI6XG4gICAgICAgICAgICBjYXNlIFwid2JyXCI6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIG8xMy5jaHVua3MucHVzaChcIjwvXCIsIHIyOCwgXCI+XCIpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gWTEoZTcyLCBuNTQsIHIyOSkge1xuICAgIG41NC5ub2RlID0gcjI5O1xuICAgIGlmIChcIm9iamVjdFwiID09PSB0eXBlb2YgcjI5ICYmIG51bGwgIT09IHIyOSkge1xuICAgICAgICBzd2l0Y2gocjI5LiQkdHlwZW9mKXtcbiAgICAgICAgICAgIGNhc2UgUDI6XG4gICAgICAgICAgICAgICAgemIoZTcyLCBuNTQsIHIyOS50eXBlLCByMjkucHJvcHMsIHIyOS5yZWYpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgTjI6XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IobTMoMjU3KSk7XG4gICAgICAgICAgICBjYXNlIEsxOlxuICAgICAgICAgICAgICAgIHZhciBhMTkgPSByMjkuX2luaXQ7XG4gICAgICAgICAgICAgICAgcjI5ID0gYTE5KHIyOS5fcGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgWTEoZTcyLCBuNTQsIHIyOSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChGMShyMjkpKSB7XG4gICAgICAgICAgICBCYihlNzIsIG41NCwgcjI5KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBudWxsID09PSByMjkgfHwgXCJvYmplY3RcIiAhPT0gdHlwZW9mIHIyOSA/IGExOSA9IG51bGwgOiAoYTE5ID0gYWUxICYmIHIyOVthZTFdIHx8IHIyOVtcIkBAaXRlcmF0b3JcIl0sIGExOSA9IFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGExOSA/IGExOSA6IG51bGwpO1xuICAgICAgICBpZiAoYTE5ICYmIChhMTkgPSBhMTkuY2FsbChyMjkpKSkge1xuICAgICAgICAgICAgcjI5ID0gYTE5Lm5leHQoKTtcbiAgICAgICAgICAgIGlmICghcjI5LmRvbmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbzE0ID0gW107XG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBvMTQucHVzaChyMjkudmFsdWUpLCByMjkgPSBhMTkubmV4dCgpO1xuICAgICAgICAgICAgICAgIH13aGlsZSAoIXIyOS5kb25lKVxuICAgICAgICAgICAgICAgIEJiKGU3MiwgbjU0LCBvMTQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGU3MiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChyMjkpO1xuICAgICAgICB0aHJvdyBFcnJvcihtMygzMSwgXCJbb2JqZWN0IE9iamVjdF1cIiA9PT0gZTcyID8gXCJvYmplY3Qgd2l0aCBrZXlzIHtcIiArIE9iamVjdC5rZXlzKHIyOSkuam9pbihcIiwgXCIpICsgXCJ9XCIgOiBlNzIpKTtcbiAgICB9XG4gICAgXCJzdHJpbmdcIiA9PT0gdHlwZW9mIHIyOSA/IChuNTQgPSBuNTQuYmxvY2tlZFNlZ21lbnQuY2h1bmtzLCBlNzIucmVzcG9uc2VTdGF0ZS5nZW5lcmF0ZVN0YXRpY01hcmt1cCA/IG41NC5wdXNoKHc0KHIyOSkpIDogcGEobjU0LCByMjkpKSA6IFwibnVtYmVyXCIgPT09IHR5cGVvZiByMjkgJiYgKG41NCA9IG41NC5ibG9ja2VkU2VnbWVudC5jaHVua3MsIHIyOSA9IFwiXCIgKyByMjksIGU3Mi5yZXNwb25zZVN0YXRlLmdlbmVyYXRlU3RhdGljTWFya3VwID8gbjU0LnB1c2godzQocjI5KSkgOiBwYShuNTQsIHIyOSkpO1xufVxuZnVuY3Rpb24gQmIoZTczLCBuNTUsIHIzMCkge1xuICAgIGZvcih2YXIgYTIwID0gcjMwLmxlbmd0aCwgbzE1ID0gMDsgbzE1IDwgYTIwOyBvMTUrKyl7XG4gICAgICAgIHZhciBsID0gbjU1LnRyZWVDb250ZXh0O1xuICAgICAgICBuNTUudHJlZUNvbnRleHQgPSBhYihsLCBhMjAsIG8xNSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBBYihlNzMsIG41NSwgcjMwW28xNV0pO1xuICAgICAgICB9IGZpbmFsbHl7XG4gICAgICAgICAgICBuNTUudHJlZUNvbnRleHQgPSBsO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gQWIoZTc0LCBuNTYsIHIzMSkge1xuICAgIHZhciBhMjEgPSBuNTYuYmxvY2tlZFNlZ21lbnQuZm9ybWF0Q29udGV4dCwgbzE2ID0gbjU2LmxlZ2FjeUNvbnRleHQsIGwgPSBuNTYuY29udGV4dDtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gWTEoZTc0LCBuNTYsIHIzMSk7XG4gICAgfSBjYXRjaCAoczcpIHtcbiAgICAgICAgaWYgKGpiKCksIFwib2JqZWN0XCIgIT09IHR5cGVvZiBzNyB8fCBudWxsID09PSBzNyB8fCBcImZ1bmN0aW9uXCIgIT09IHR5cGVvZiBzNy50aGVuKSB0aHJvdyBuNTYuYmxvY2tlZFNlZ21lbnQuZm9ybWF0Q29udGV4dCA9IGEyMSwgbjU2LmxlZ2FjeUNvbnRleHQgPSBvMTYsIG41Ni5jb250ZXh0ID0gbCwgSTEobCksIHM3O1xuICAgICAgICByMzEgPSBzNztcbiAgICAgICAgdmFyIGk5ID0gbjU2LmJsb2NrZWRTZWdtZW50LCB1NyA9IFYzKGU3NCwgaTkuY2h1bmtzLmxlbmd0aCwgbnVsbCwgaTkuZm9ybWF0Q29udGV4dCk7XG4gICAgICAgIGk5LmNoaWxkcmVuLnB1c2godTcpO1xuICAgICAgICBlNzQgPSB1YihlNzQsIG41Ni5ub2RlLCBuNTYuYmxvY2tlZEJvdW5kYXJ5LCB1NywgbjU2LmFib3J0U2V0LCBuNTYubGVnYWN5Q29udGV4dCwgbjU2LmNvbnRleHQsIG41Ni50cmVlQ29udGV4dCkucGluZztcbiAgICAgICAgcjMxLnRoZW4oZTc0LCBlNzQpO1xuICAgICAgICBuNTYuYmxvY2tlZFNlZ21lbnQuZm9ybWF0Q29udGV4dCA9IGEyMTtcbiAgICAgICAgbjU2LmxlZ2FjeUNvbnRleHQgPSBvMTY7XG4gICAgICAgIG41Ni5jb250ZXh0ID0gbDtcbiAgICAgICAgSTEobCk7XG4gICAgfVxufVxuZnVuY3Rpb24gQ2IoZTc1KSB7XG4gICAgdmFyIG41NyA9IGU3NS5ibG9ja2VkQm91bmRhcnk7XG4gICAgZTc1ID0gZTc1LmJsb2NrZWRTZWdtZW50O1xuICAgIGU3NS5zdGF0dXMgPSAzO1xuICAgIERiKHRoaXMsIG41NywgZTc1KTtcbn1cbmZ1bmN0aW9uIEViKGU3Nikge1xuICAgIHZhciBuNTggPSBlNzYuYmxvY2tlZEJvdW5kYXJ5O1xuICAgIGU3Ni5ibG9ja2VkU2VnbWVudC5zdGF0dXMgPSAzO1xuICAgIG51bGwgPT09IG41OCA/ICh0aGlzLmFsbFBlbmRpbmdUYXNrcy0tLCAyICE9PSB0aGlzLnN0YXR1cyAmJiAodGhpcy5zdGF0dXMgPSAyLCBudWxsICE9PSB0aGlzLmRlc3RpbmF0aW9uICYmIHRoaXMuZGVzdGluYXRpb24ucHVzaChudWxsKSkpIDogKG41OC5wZW5kaW5nVGFza3MtLSwgbjU4LmZvcmNlQ2xpZW50UmVuZGVyIHx8IChuNTguZm9yY2VDbGllbnRSZW5kZXIgPSAhMCwgbjU4LnBhcmVudEZsdXNoZWQgJiYgdGhpcy5jbGllbnRSZW5kZXJlZEJvdW5kYXJpZXMucHVzaChuNTgpKSwgbjU4LmZhbGxiYWNrQWJvcnRhYmxlVGFza3MuZm9yRWFjaChFYiwgdGhpcyksIG41OC5mYWxsYmFja0Fib3J0YWJsZVRhc2tzLmNsZWFyKCksIHRoaXMuYWxsUGVuZGluZ1Rhc2tzLS0sIDAgPT09IHRoaXMuYWxsUGVuZGluZ1Rhc2tzICYmIChlNzYgPSB0aGlzLm9uQ29tcGxldGVBbGwsIGU3NigpKSk7XG59XG5mdW5jdGlvbiBEYihlNzcsIG41OSwgcjMyKSB7XG4gICAgaWYgKG51bGwgPT09IG41OSkge1xuICAgICAgICBpZiAocjMyLnBhcmVudEZsdXNoZWQpIHtcbiAgICAgICAgICAgIGlmIChudWxsICE9PSBlNzcuY29tcGxldGVkUm9vdFNlZ21lbnQpIHRocm93IEVycm9yKG0zKDM4OSkpO1xuICAgICAgICAgICAgZTc3LmNvbXBsZXRlZFJvb3RTZWdtZW50ID0gcjMyO1xuICAgICAgICB9XG4gICAgICAgIGU3Ny5wZW5kaW5nUm9vdFRhc2tzLS07XG4gICAgICAgIDAgPT09IGU3Ny5wZW5kaW5nUm9vdFRhc2tzICYmIChuNTkgPSBlNzcub25Db21wbGV0ZVNoZWxsLCBuNTkoKSk7XG4gICAgfSBlbHNlIGlmIChuNTkucGVuZGluZ1Rhc2tzLS0sICFuNTkuZm9yY2VDbGllbnRSZW5kZXIpIHtcbiAgICAgICAgaWYgKDAgPT09IG41OS5wZW5kaW5nVGFza3MpIHIzMi5wYXJlbnRGbHVzaGVkICYmIDEgPT09IHIzMi5zdGF0dXMgJiYgbjU5LmNvbXBsZXRlZFNlZ21lbnRzLnB1c2gocjMyKSwgbjU5LnBhcmVudEZsdXNoZWQgJiYgZTc3LmNvbXBsZXRlZEJvdW5kYXJpZXMucHVzaChuNTkpLCBuNTkuZmFsbGJhY2tBYm9ydGFibGVUYXNrcy5mb3JFYWNoKENiLCBlNzcpLCBuNTkuZmFsbGJhY2tBYm9ydGFibGVUYXNrcy5jbGVhcigpO1xuICAgICAgICBlbHNlIGlmIChyMzIucGFyZW50Rmx1c2hlZCAmJiAxID09PSByMzIuc3RhdHVzKSB7XG4gICAgICAgICAgICB2YXIgYTIyID0gbjU5LmNvbXBsZXRlZFNlZ21lbnRzO1xuICAgICAgICAgICAgYTIyLnB1c2gocjMyKTtcbiAgICAgICAgICAgIDEgPT09IGEyMi5sZW5ndGggJiYgbjU5LnBhcmVudEZsdXNoZWQgJiYgZTc3LnBhcnRpYWxCb3VuZGFyaWVzLnB1c2gobjU5KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlNzcuYWxsUGVuZGluZ1Rhc2tzLS07XG4gICAgMCA9PT0gZTc3LmFsbFBlbmRpbmdUYXNrcyAmJiAoZTc3ID0gZTc3Lm9uQ29tcGxldGVBbGwsIGU3NygpKTtcbn1cbmZ1bmN0aW9uIHZiKGU3OCkge1xuICAgIGlmICgyICE9PSBlNzguc3RhdHVzKSB7XG4gICAgICAgIHZhciBuNjEgPSBsZTEsIHIzMyA9IENlMS5jdXJyZW50O1xuICAgICAgICBDZTEuY3VycmVudCA9IGtlMTtcbiAgICAgICAgdmFyIGEyMyA9IHdlMTtcbiAgICAgICAgd2UxID0gZTc4LnJlc3BvbnNlU3RhdGU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgbzE3LCBsID0gZTc4LnBpbmdlZFRhc2tzO1xuICAgICAgICAgICAgZm9yKG8xNyA9IDA7IG8xNyA8IGwubGVuZ3RoOyBvMTcrKyl7XG4gICAgICAgICAgICAgICAgdmFyIGkxMCA9IGxbbzE3XTtcbiAgICAgICAgICAgICAgICB2YXIgdTggPSBlNzgsIHM4ID0gaTEwLmJsb2NrZWRTZWdtZW50O1xuICAgICAgICAgICAgICAgIGlmICgwID09PSBzOC5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgSTEoaTEwLmNvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgWTEodTgsIGkxMCwgaTEwLm5vZGUpLCBpMTAuYWJvcnRTZXQuZGVsZXRlKGkxMCksIHM4LnN0YXR1cyA9IDEsIERiKHU4LCBpMTAuYmxvY2tlZEJvdW5kYXJ5LCBzOCk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGU3OSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGpiKCksIFwib2JqZWN0XCIgPT09IHR5cGVvZiBlNzkgJiYgbnVsbCAhPT0gZTc5ICYmIFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGU3OS50aGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGMyMiA9IGkxMC5waW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGU3OS50aGVuKGMyMiwgYzIyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaTEwLmFib3J0U2V0LmRlbGV0ZShpMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHM4LnN0YXR1cyA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGYyID0gaTEwLmJsb2NrZWRCb3VuZGFyeSwgZDIxID0gZTc5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFcxKHU4LCBkMjEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwgPT09IGYyID8gWDEodTgsIGQyMSkgOiAoZjIucGVuZGluZ1Rhc2tzLS0sIGYyLmZvcmNlQ2xpZW50UmVuZGVyIHx8IChmMi5mb3JjZUNsaWVudFJlbmRlciA9ICEwLCBmMi5wYXJlbnRGbHVzaGVkICYmIHU4LmNsaWVudFJlbmRlcmVkQm91bmRhcmllcy5wdXNoKGYyKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHU4LmFsbFBlbmRpbmdUYXNrcy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgwID09PSB1OC5hbGxQZW5kaW5nVGFza3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHAyMSA9IHU4Lm9uQ29tcGxldGVBbGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAyMSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGwuc3BsaWNlKDAsIG8xNyk7XG4gICAgICAgICAgICBudWxsICE9PSBlNzguZGVzdGluYXRpb24gJiYgRmIoZTc4LCBlNzguZGVzdGluYXRpb24pO1xuICAgICAgICB9IGNhdGNoIChuNjApIHtcbiAgICAgICAgICAgIFcxKGU3OCwgbjYwKSwgWDEoZTc4LCBuNjApO1xuICAgICAgICB9IGZpbmFsbHl7XG4gICAgICAgICAgICB3ZTEgPSBhMjMsIENlMS5jdXJyZW50ID0gcjMzLCByMzMgPT09IGtlMSAmJiBJMShuNjEpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gWjEoZTgwLCBuNjIsIHIzNCkge1xuICAgIHIzNC5wYXJlbnRGbHVzaGVkID0gITA7XG4gICAgc3dpdGNoKHIzNC5zdGF0dXMpe1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICB2YXIgYTI0ID0gcjM0LmlkID0gZTgwLm5leHRTZWdtZW50SWQrKztcbiAgICAgICAgICAgIGU4MCA9IGU4MC5yZXNwb25zZVN0YXRlO1xuICAgICAgICAgICAgcTIobjYyLCAnPHRlbXBsYXRlIGlkPVwiJyk7XG4gICAgICAgICAgICBxMihuNjIsIGU4MC5wbGFjZWhvbGRlclByZWZpeCk7XG4gICAgICAgICAgICBlODAgPSBhMjQudG9TdHJpbmcoMTYpO1xuICAgICAgICAgICAgcTIobjYyLCBlODApO1xuICAgICAgICAgICAgcmV0dXJuIHEyKG42MiwgJ1wiPjwvdGVtcGxhdGU+Jyk7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIHIzNC5zdGF0dXMgPSAyO1xuICAgICAgICAgICAgdmFyIG8xOCA9ICEwO1xuICAgICAgICAgICAgYTI0ID0gcjM0LmNodW5rcztcbiAgICAgICAgICAgIHZhciBsID0gMDtcbiAgICAgICAgICAgIHIzNCA9IHIzNC5jaGlsZHJlbjtcbiAgICAgICAgICAgIGZvcih2YXIgaTExID0gMDsgaTExIDwgcjM0Lmxlbmd0aDsgaTExKyspe1xuICAgICAgICAgICAgICAgIGZvcihvMTggPSByMzRbaTExXTsgbCA8IG8xOC5pbmRleDsgbCsrKXEyKG42MiwgYTI0W2xdKTtcbiAgICAgICAgICAgICAgICBvMTggPSBHYihlODAsIG42MiwgbzE4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcig7IGwgPCBhMjQubGVuZ3RoOyBsKyspbzE4ID0gcTIobjYyLCBhMjRbbF0pO1xuICAgICAgICAgICAgcmV0dXJuIG8xODtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IEVycm9yKG0zKDM5MCkpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIEdiKGU4MSwgbjYzLCByMzUpIHtcbiAgICB2YXIgYTI1ID0gcjM1LmJvdW5kYXJ5O1xuICAgIGlmIChudWxsID09PSBhMjUpIHJldHVybiBaMShlODEsIG42MywgcjM1KTtcbiAgICBhMjUucGFyZW50Rmx1c2hlZCA9ICEwO1xuICAgIGlmIChhMjUuZm9yY2VDbGllbnRSZW5kZXIpIHJldHVybiBlODEucmVzcG9uc2VTdGF0ZS5nZW5lcmF0ZVN0YXRpY01hcmt1cCB8fCBxMihuNjMsIFwiXFx4M2MhLS0kIS0tXFx4M2VcIiksIFoxKGU4MSwgbjYzLCByMzUpLCBlODEgPSAhIWU4MS5yZXNwb25zZVN0YXRlLmdlbmVyYXRlU3RhdGljTWFya3VwIHx8IHEyKG42MywgXCJcXHgzYyEtLS8kLS1cXHgzZVwiKSwgZTgxO1xuICAgIGlmICgwIDwgYTI1LnBlbmRpbmdUYXNrcykge1xuICAgICAgICBhMjUucm9vdFNlZ21lbnRJRCA9IGU4MS5uZXh0U2VnbWVudElkKys7XG4gICAgICAgIDAgPCBhMjUuY29tcGxldGVkU2VnbWVudHMubGVuZ3RoICYmIGU4MS5wYXJ0aWFsQm91bmRhcmllcy5wdXNoKGEyNSk7XG4gICAgICAgIHZhciBvMTkgPSBlODEucmVzcG9uc2VTdGF0ZTtcbiAgICAgICAgdmFyIGwgPSBvMTkubmV4dFN1c3BlbnNlSUQrKztcbiAgICAgICAgbzE5ID0gbzE5LmJvdW5kYXJ5UHJlZml4ICsgbC50b1N0cmluZygxNik7XG4gICAgICAgIGEyNSA9IGEyNS5pZCA9IG8xOTtcbiAgICAgICAgeGEobjYzLCBlODEucmVzcG9uc2VTdGF0ZSwgYTI1KTtcbiAgICAgICAgWjEoZTgxLCBuNjMsIHIzNSk7XG4gICAgICAgIHJldHVybiBxMihuNjMsIFwiXFx4M2MhLS0vJC0tXFx4M2VcIik7XG4gICAgfVxuICAgIGlmIChhMjUuYnl0ZVNpemUgPiBlODEucHJvZ3Jlc3NpdmVDaHVua1NpemUpIHJldHVybiBhMjUucm9vdFNlZ21lbnRJRCA9IGU4MS5uZXh0U2VnbWVudElkKyssIGU4MS5jb21wbGV0ZWRCb3VuZGFyaWVzLnB1c2goYTI1KSwgeGEobjYzLCBlODEucmVzcG9uc2VTdGF0ZSwgYTI1LmlkKSwgWjEoZTgxLCBuNjMsIHIzNSksIHEyKG42MywgXCJcXHgzYyEtLS8kLS1cXHgzZVwiKTtcbiAgICBlODEucmVzcG9uc2VTdGF0ZS5nZW5lcmF0ZVN0YXRpY01hcmt1cCB8fCBxMihuNjMsIFwiXFx4M2MhLS0kLS1cXHgzZVwiKTtcbiAgICByMzUgPSBhMjUuY29tcGxldGVkU2VnbWVudHM7XG4gICAgaWYgKDEgIT09IHIzNS5sZW5ndGgpIHRocm93IEVycm9yKG0zKDM5MSkpO1xuICAgIEdiKGU4MSwgbjYzLCByMzVbMF0pO1xuICAgIGU4MSA9ICEhZTgxLnJlc3BvbnNlU3RhdGUuZ2VuZXJhdGVTdGF0aWNNYXJrdXAgfHwgcTIobjYzLCBcIlxceDNjIS0tLyQtLVxceDNlXCIpO1xuICAgIHJldHVybiBlODE7XG59XG5mdW5jdGlvbiBIYihlODIsIG42NCwgcjM2KSB7XG4gICAgeWEobjY0LCBlODIucmVzcG9uc2VTdGF0ZSwgcjM2LmZvcm1hdENvbnRleHQsIHIzNi5pZCk7XG4gICAgR2IoZTgyLCBuNjQsIHIzNik7XG4gICAgcmV0dXJuIHphKG42NCwgcjM2LmZvcm1hdENvbnRleHQpO1xufVxuZnVuY3Rpb24gSWIoZTgzLCBuNjUsIHIzNykge1xuICAgIGZvcih2YXIgYTI2ID0gcjM3LmNvbXBsZXRlZFNlZ21lbnRzLCBvMjAgPSAwOyBvMjAgPCBhMjYubGVuZ3RoOyBvMjArKylKYihlODMsIG42NSwgcjM3LCBhMjZbbzIwXSk7XG4gICAgYTI2Lmxlbmd0aCA9IDA7XG4gICAgZTgzID0gZTgzLnJlc3BvbnNlU3RhdGU7XG4gICAgYTI2ID0gcjM3LmlkO1xuICAgIHIzNyA9IHIzNy5yb290U2VnbWVudElEO1xuICAgIHEyKG42NSwgZTgzLnN0YXJ0SW5saW5lU2NyaXB0KTtcbiAgICBlODMuc2VudENvbXBsZXRlQm91bmRhcnlGdW5jdGlvbiA/IHEyKG42NSwgJyRSQyhcIicpIDogKGU4My5zZW50Q29tcGxldGVCb3VuZGFyeUZ1bmN0aW9uID0gITAsIHEyKG42NSwgJ2Z1bmN0aW9uICRSQyhhLGIpe2E9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYSk7Yj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChiKTtiLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYik7aWYoYSl7YT1hLnByZXZpb3VzU2libGluZzt2YXIgZj1hLnBhcmVudE5vZGUsYz1hLm5leHRTaWJsaW5nLGU9MDtkb3tpZihjJiY4PT09Yy5ub2RlVHlwZSl7dmFyIGQ9Yy5kYXRhO2lmKFwiLyRcIj09PWQpaWYoMD09PWUpYnJlYWs7ZWxzZSBlLS07ZWxzZVwiJFwiIT09ZCYmXCIkP1wiIT09ZCYmXCIkIVwiIT09ZHx8ZSsrfWQ9Yy5uZXh0U2libGluZztmLnJlbW92ZUNoaWxkKGMpO2M9ZH13aGlsZShjKTtmb3IoO2IuZmlyc3RDaGlsZDspZi5pbnNlcnRCZWZvcmUoYi5maXJzdENoaWxkLGMpO2EuZGF0YT1cIiRcIjthLl9yZWFjdFJldHJ5JiZhLl9yZWFjdFJldHJ5KCl9fTskUkMoXCInKSk7XG4gICAgaWYgKG51bGwgPT09IGEyNikgdGhyb3cgRXJyb3IobTMoMzk1KSk7XG4gICAgcjM3ID0gcjM3LnRvU3RyaW5nKDE2KTtcbiAgICBxMihuNjUsIGEyNik7XG4gICAgcTIobjY1LCAnXCIsXCInKTtcbiAgICBxMihuNjUsIGU4My5zZWdtZW50UHJlZml4KTtcbiAgICBxMihuNjUsIHIzNyk7XG4gICAgcmV0dXJuIHEyKG42NSwgJ1wiKTxcXC9zY3JpcHQ+Jyk7XG59XG5mdW5jdGlvbiBKYihlODQsIG42NiwgcjM4LCBhMjcpIHtcbiAgICBpZiAoMiA9PT0gYTI3LnN0YXR1cykgcmV0dXJuICEwO1xuICAgIHZhciBvMjEgPSBhMjcuaWQ7XG4gICAgaWYgKC0xID09PSBvMjEpIHtcbiAgICAgICAgaWYgKC0xID09PSAoYTI3LmlkID0gcjM4LnJvb3RTZWdtZW50SUQpKSB0aHJvdyBFcnJvcihtMygzOTIpKTtcbiAgICAgICAgcmV0dXJuIEhiKGU4NCwgbjY2LCBhMjcpO1xuICAgIH1cbiAgICBIYihlODQsIG42NiwgYTI3KTtcbiAgICBlODQgPSBlODQucmVzcG9uc2VTdGF0ZTtcbiAgICBxMihuNjYsIGU4NC5zdGFydElubGluZVNjcmlwdCk7XG4gICAgZTg0LnNlbnRDb21wbGV0ZVNlZ21lbnRGdW5jdGlvbiA/IHEyKG42NiwgJyRSUyhcIicpIDogKGU4NC5zZW50Q29tcGxldGVTZWdtZW50RnVuY3Rpb24gPSAhMCwgcTIobjY2LCAnZnVuY3Rpb24gJFJTKGEsYil7YT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChhKTtiPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGIpO2ZvcihhLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYSk7YS5maXJzdENoaWxkOyliLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGEuZmlyc3RDaGlsZCxiKTtiLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYil9OyRSUyhcIicpKTtcbiAgICBxMihuNjYsIGU4NC5zZWdtZW50UHJlZml4KTtcbiAgICBvMjEgPSBvMjEudG9TdHJpbmcoMTYpO1xuICAgIHEyKG42NiwgbzIxKTtcbiAgICBxMihuNjYsICdcIixcIicpO1xuICAgIHEyKG42NiwgZTg0LnBsYWNlaG9sZGVyUHJlZml4KTtcbiAgICBxMihuNjYsIG8yMSk7XG4gICAgcmV0dXJuIHEyKG42NiwgJ1wiKTxcXC9zY3JpcHQ+Jyk7XG59XG5mdW5jdGlvbiBGYihlODUsIG42Nykge1xuICAgIHRyeSB7XG4gICAgICAgIHZhciByMzkgPSBlODUuY29tcGxldGVkUm9vdFNlZ21lbnQ7XG4gICAgICAgIGlmIChudWxsICE9PSByMzkgJiYgMCA9PT0gZTg1LnBlbmRpbmdSb290VGFza3MpIHtcbiAgICAgICAgICAgIEdiKGU4NSwgbjY3LCByMzkpO1xuICAgICAgICAgICAgZTg1LmNvbXBsZXRlZFJvb3RTZWdtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIHZhciBhMjggPSBlODUucmVzcG9uc2VTdGF0ZS5ib290c3RyYXBDaHVua3M7XG4gICAgICAgICAgICBmb3IocjM5ID0gMDsgcjM5IDwgYTI4Lmxlbmd0aDsgcjM5KyspcTIobjY3LCBhMjhbcjM5XSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG8yMiwgbCA9IGU4NS5jbGllbnRSZW5kZXJlZEJvdW5kYXJpZXM7XG4gICAgICAgIGZvcihvMjIgPSAwOyBvMjIgPCBsLmxlbmd0aDsgbzIyKyspe1xuICAgICAgICAgICAgYTI4ID0gbjY3O1xuICAgICAgICAgICAgdmFyIGkxMiA9IGU4NS5yZXNwb25zZVN0YXRlLCB1OSA9IGxbbzIyXS5pZDtcbiAgICAgICAgICAgIHEyKGEyOCwgaTEyLnN0YXJ0SW5saW5lU2NyaXB0KTtcbiAgICAgICAgICAgIGkxMi5zZW50Q2xpZW50UmVuZGVyRnVuY3Rpb24gPyBxMihhMjgsICckUlgoXCInKSA6IChpMTIuc2VudENsaWVudFJlbmRlckZ1bmN0aW9uID0gITAsIHEyKGEyOCwgJ2Z1bmN0aW9uICRSWChhKXtpZihhPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGEpKWE9YS5wcmV2aW91c1NpYmxpbmcsYS5kYXRhPVwiJCFcIixhLl9yZWFjdFJldHJ5JiZhLl9yZWFjdFJldHJ5KCl9OyRSWChcIicpKTtcbiAgICAgICAgICAgIGlmIChudWxsID09PSB1OSkgdGhyb3cgRXJyb3IobTMoMzk1KSk7XG4gICAgICAgICAgICBxMihhMjgsIHU5KTtcbiAgICAgICAgICAgIGlmICghcTIoYTI4LCAnXCIpPFxcL3NjcmlwdD4nKSkge1xuICAgICAgICAgICAgICAgIGU4NS5kZXN0aW5hdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgbzIyKys7XG4gICAgICAgICAgICAgICAgbC5zcGxpY2UoMCwgbzIyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbC5zcGxpY2UoMCwgbzIyKTtcbiAgICAgICAgdmFyIHM5ID0gZTg1LmNvbXBsZXRlZEJvdW5kYXJpZXM7XG4gICAgICAgIGZvcihvMjIgPSAwOyBvMjIgPCBzOS5sZW5ndGg7IG8yMisrKWlmICghSWIoZTg1LCBuNjcsIHM5W28yMl0pKSB7XG4gICAgICAgICAgICBlODUuZGVzdGluYXRpb24gPSBudWxsO1xuICAgICAgICAgICAgbzIyKys7XG4gICAgICAgICAgICBzOS5zcGxpY2UoMCwgbzIyKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzOS5zcGxpY2UoMCwgbzIyKTtcbiAgICAgICAgdmFyIGMzMiA9IGU4NS5wYXJ0aWFsQm91bmRhcmllcztcbiAgICAgICAgZm9yKG8yMiA9IDA7IG8yMiA8IGMzMi5sZW5ndGg7IG8yMisrKXtcbiAgICAgICAgICAgIHZhciBmMyA9IGMzMltvMjJdO1xuICAgICAgICAgICAgZToge1xuICAgICAgICAgICAgICAgIGwgPSBlODU7XG4gICAgICAgICAgICAgICAgaTEyID0gbjY3O1xuICAgICAgICAgICAgICAgIHZhciBkMyA9IGYzLmNvbXBsZXRlZFNlZ21lbnRzO1xuICAgICAgICAgICAgICAgIGZvcih1OSA9IDA7IHU5IDwgZDMubGVuZ3RoOyB1OSsrKWlmICghSmIobCwgaTEyLCBmMywgZDNbdTldKSkge1xuICAgICAgICAgICAgICAgICAgICB1OSsrO1xuICAgICAgICAgICAgICAgICAgICBkMy5zcGxpY2UoMCwgdTkpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcCA9ICExO1xuICAgICAgICAgICAgICAgICAgICBicmVhayBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkMy5zcGxpY2UoMCwgdTkpO1xuICAgICAgICAgICAgICAgIHAgPSAhMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcCkge1xuICAgICAgICAgICAgICAgIGU4NS5kZXN0aW5hdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgbzIyKys7XG4gICAgICAgICAgICAgICAgYzMyLnNwbGljZSgwLCBvMjIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjMzIuc3BsaWNlKDAsIG8yMik7XG4gICAgICAgIHZhciBoMjEgPSBlODUuY29tcGxldGVkQm91bmRhcmllcztcbiAgICAgICAgZm9yKG8yMiA9IDA7IG8yMiA8IGgyMS5sZW5ndGg7IG8yMisrKWlmICghSWIoZTg1LCBuNjcsIGgyMVtvMjJdKSkge1xuICAgICAgICAgICAgZTg1LmRlc3RpbmF0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIG8yMisrO1xuICAgICAgICAgICAgaDIxLnNwbGljZSgwLCBvMjIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGgyMS5zcGxpY2UoMCwgbzIyKTtcbiAgICB9IGZpbmFsbHl7XG4gICAgICAgIDAgPT09IGU4NS5hbGxQZW5kaW5nVGFza3MgJiYgMCA9PT0gZTg1LnBpbmdlZFRhc2tzLmxlbmd0aCAmJiAwID09PSBlODUuY2xpZW50UmVuZGVyZWRCb3VuZGFyaWVzLmxlbmd0aCAmJiAwID09PSBlODUuY29tcGxldGVkQm91bmRhcmllcy5sZW5ndGggJiYgbjY3LnB1c2gobnVsbCk7XG4gICAgfVxufVxuZnVuY3Rpb24gS2IoZTg2KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIG42OCA9IGU4Ni5hYm9ydGFibGVUYXNrcztcbiAgICAgICAgbjY4LmZvckVhY2goRWIsIGU4Nik7XG4gICAgICAgIG42OC5jbGVhcigpO1xuICAgICAgICBudWxsICE9PSBlODYuZGVzdGluYXRpb24gJiYgRmIoZTg2LCBlODYuZGVzdGluYXRpb24pO1xuICAgIH0gY2F0Y2ggKG42OSkge1xuICAgICAgICBXMShlODYsIG42OSksIFgxKGU4NiwgbjY5KTtcbiAgICB9XG59XG5mdW5jdGlvbiBMYigpIHt9XG5mdW5jdGlvbiBNYihlODcsIG43MCwgcjQwKSB7XG4gICAgdmFyIGEyOSA9ICExLCBvMjMgPSBudWxsLCBsID0gXCJcIiwgaTEzID0ge1xuICAgICAgICBwdXNoOiBmdW5jdGlvbihlODgpIHtcbiAgICAgICAgICAgIG51bGwgIT09IGU4OCAmJiAobCArPSBlODgpO1xuICAgICAgICAgICAgcmV0dXJuICEwO1xuICAgICAgICB9LFxuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbihlODkpIHtcbiAgICAgICAgICAgIGEyOSA9ICEwO1xuICAgICAgICAgICAgbzIzID0gZTg5O1xuICAgICAgICB9XG4gICAgfSwgdTEwID0gITE7XG4gICAgZTg3ID0gdGIoZTg3LCBBYShyNDAsIG43MCA/IG43MC5pZGVudGlmaWVyUHJlZml4IDogdm9pZCAwKSwge1xuICAgICAgICBpbnNlcnRpb25Nb2RlOiAxLFxuICAgICAgICBzZWxlY3RlZFZhbHVlOiBudWxsXG4gICAgfSwgSW5maW5pdHksIExiLCB2b2lkIDAsIGZ1bmN0aW9uKCkge1xuICAgICAgICB1MTAgPSAhMDtcbiAgICB9KTtcbiAgICB2YihlODcpO1xuICAgIEtiKGU4Nyk7XG4gICAgaWYgKDEgPT09IGU4Ny5zdGF0dXMpIGU4Ny5zdGF0dXMgPSAyLCBpMTMuZGVzdHJveShlODcuZmF0YWxFcnJvcik7XG4gICAgZWxzZSBpZiAoMiAhPT0gZTg3LnN0YXR1cykge1xuICAgICAgICBlODcuZGVzdGluYXRpb24gPSBpMTM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBGYihlODcsIGkxMyk7XG4gICAgICAgIH0gY2F0Y2ggKG43MSkge1xuICAgICAgICAgICAgVzEoZTg3LCBuNzEpLCBYMShlODcsIG43MSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGEyOSkgdGhyb3cgbzIzO1xuICAgIGlmICghdTEwKSB0aHJvdyBFcnJvcihtMygzNDIpKTtcbiAgICByZXR1cm4gbDtcbn1cbmwyNC5yZW5kZXJUb05vZGVTdHJlYW0gPSBmdW5jdGlvbigpIHtcbiAgICB0aHJvdyBFcnJvcihtMygyMDcpKTtcbn07XG5sMjQucmVuZGVyVG9TdGF0aWNNYXJrdXAgPSBmdW5jdGlvbihlOTAsIG43Mikge1xuICAgIHJldHVybiBNYihlOTAsIG43MiwgITApO1xufTtcbmwyNC5yZW5kZXJUb1N0YXRpY05vZGVTdHJlYW0gPSBmdW5jdGlvbigpIHtcbiAgICB0aHJvdyBFcnJvcihtMygyMDgpKTtcbn07XG5sMjQucmVuZGVyVG9TdHJpbmcgPSBmdW5jdGlvbihlOTEsIG43Mykge1xuICAgIHJldHVybiBNYihlOTEsIG43MywgITEpO1xufTtcbmwyNC52ZXJzaW9uID0gXCIxOC4wLjAtcmMuMC1mZTkwNWYxNTItMjAyMjAxMDdcIjtcbnZhciBFZTEgPSB7fTtcbnZhciBxZTEsIEZlMTtcbnFlMSA9IGwyNDtcbkZlMSA9IGkyO1xuRWUxLnZlcnNpb24gPSBxZTEudmVyc2lvbjtcbkVlMS5yZW5kZXJUb1N0cmluZyA9IHFlMS5yZW5kZXJUb1N0cmluZztcbkVlMS5yZW5kZXJUb1N0YXRpY01hcmt1cCA9IHFlMS5yZW5kZXJUb1N0YXRpY01hcmt1cDtcbkVlMS5yZW5kZXJUb05vZGVTdHJlYW0gPSBxZTEucmVuZGVyVG9Ob2RlU3RyZWFtO1xuRWUxLnJlbmRlclRvU3RhdGljTm9kZVN0cmVhbSA9IHFlMS5yZW5kZXJUb1N0YXRpY05vZGVTdHJlYW07XG5FZTEucmVuZGVyVG9SZWFkYWJsZVN0cmVhbSA9IEZlMS5yZW5kZXJUb1JlYWRhYmxlU3RyZWFtO1xuY29uc3QgVGUxID0gRWUxLnZlcnNpb24sIFJlMSA9IEVlMS5yZW5kZXJUb1N0cmluZywgX2UxID0gRWUxLnJlbmRlclRvU3RhdGljTWFya3VwLCBJZTEgPSBFZTEucmVuZGVyVG9Ob2RlU3RyZWFtLCBNZTEgPSBFZTEucmVuZGVyVG9TdGF0aWNOb2RlU3RyZWFtLCB6ZTEgPSBFZTEucmVuZGVyVG9SZWFkYWJsZVN0cmVhbTtcbmNvbnN0IGdldEh0bWxBbmRDc3MgPSAoTXlDb21wb25lbnQpPT57XG4gICAgY29uc3Qga2V5ID0gXCJjc3NcIjtcbiAgICBjb25zdCBjYWNoZSA9IHEoe1xuICAgICAgICBrZXlcbiAgICB9KTtcbiAgICBsZXQgY3NzVGV4dCA9IFwiXCI7XG4gICAgY2FjaGUuc2hlZXQuaW5zZXJ0ID0gKHJ1bGUpPT57XG4gICAgICAgIGNzc1RleHQgKz0gcnVsZTtcbiAgICB9O1xuICAgIGNvbnN0IG1hcmt1cCA9IFJlMShhKG8sIHtcbiAgICAgICAgdmFsdWU6IGNhY2hlXG4gICAgfSwgYShNeUNvbXBvbmVudCwgbnVsbCkpKTtcbiAgICBgXG4gIDwhRE9DVFlQRSBodG1sPlxuICA8aHRtbD5cbiAgICA8aGVhZD5cbiAgICAgICAgPG1ldGEgY2hhcnNldD1cIlVURi04XCI+XG4gICAgICAgIDxzdHlsZT4ke2Nzc1RleHR9PC9zdHlsZT5cbiAgICA8L2hlYWQ+XG4gICAgPGJvZHk+XG4gICAgICAgIDxkaXY+JHttYXJrdXB9PC9kaXY+XG4gICAgPC9ib2R5PlxuICA8L2h0bWw+XG5gO1xuICAgIHJldHVybiB7XG4gICAgICAgIGh0bWw6IG1hcmt1cCxcbiAgICAgICAgY3NzOiBjc3NUZXh0XG4gICAgfTtcbn07XG5leHBvcnQgeyBnZXRIdG1sQW5kQ3NzIGFzIGdldEh0bWxBbmRDc3MgfTtcbiJdLAogICJtYXBwaW5ncyI6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

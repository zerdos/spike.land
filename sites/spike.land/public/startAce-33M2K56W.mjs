import {
  __commonJS,
  __toESM,
  init_define_process
} from "./chunk-5BXN6RND.mjs";

// ../../node_modules/ace-builds/src-min-noconflict/ace.js
var require_ace = __commonJS({
  "../../node_modules/ace-builds/src-min-noconflict/ace.js"(exports, module) {
    init_define_process();
    (function() {
      function o(n2) {
        var i2 = e;
        n2 && (e[n2] || (e[n2] = {}), i2 = e[n2]);
        if (!i2.define || !i2.define.packaged)
          t.original = i2.define, i2.define = t, i2.define.packaged = true;
        if (!i2.require || !i2.require.packaged)
          r.original = i2.require, i2.require = r, i2.require.packaged = true;
      }
      var ACE_NAMESPACE = "ace", e = function() {
        return this;
      }();
      !e && typeof window != "undefined" && (e = window);
      if (!ACE_NAMESPACE && typeof requirejs != "undefined")
        return;
      var t = function(e2, n2, r2) {
        if (typeof e2 != "string") {
          t.original ? t.original.apply(this, arguments) : (console.error("dropping module because define wasn't a string."), console.trace());
          return;
        }
        arguments.length == 2 && (r2 = n2), t.modules[e2] || (t.payloads[e2] = r2, t.modules[e2] = null);
      };
      t.modules = {}, t.payloads = {};
      var n = function(e2, t2, n2) {
        if (typeof t2 == "string") {
          var i2 = s(e2, t2);
          if (i2 != void 0)
            return n2 && n2(), i2;
        } else if (Object.prototype.toString.call(t2) === "[object Array]") {
          var o2 = [];
          for (var u = 0, a = t2.length; u < a; ++u) {
            var f = s(e2, t2[u]);
            if (f == void 0 && r.original)
              return;
            o2.push(f);
          }
          return n2 && n2.apply(null, o2) || true;
        }
      }, r = function(e2, t2) {
        var i2 = n("", e2, t2);
        return i2 == void 0 && r.original ? r.original.apply(this, arguments) : i2;
      }, i = function(e2, t2) {
        if (t2.indexOf("!") !== -1) {
          var n2 = t2.split("!");
          return i(e2, n2[0]) + "!" + i(e2, n2[1]);
        }
        if (t2.charAt(0) == ".") {
          var r2 = e2.split("/").slice(0, -1).join("/");
          t2 = r2 + "/" + t2;
          while (t2.indexOf(".") !== -1 && s2 != t2) {
            var s2 = t2;
            t2 = t2.replace(/\/\.\//, "/").replace(/[^\/]+\/\.\.\//, "");
          }
        }
        return t2;
      }, s = function(e2, r2) {
        r2 = i(e2, r2);
        var s2 = t.modules[r2];
        if (!s2) {
          s2 = t.payloads[r2];
          if (typeof s2 == "function") {
            var o2 = {}, u = { id: r2, uri: "", exports: o2, packaged: true }, a = function(e3, t2) {
              return n(r2, e3, t2);
            }, f = s2(a, o2, u);
            o2 = f || u.exports, t.modules[r2] = o2, delete t.payloads[r2];
          }
          s2 = t.modules[r2] = o2 || s2;
        }
        return s2;
      };
      o(ACE_NAMESPACE);
    })(), ace.define("ace/lib/es6-shim", ["require", "exports", "module"], function(e, t, n) {
      function r(e2, t2, n2) {
        Object.defineProperty(e2, t2, { value: n2, enumerable: false, writable: true, configurable: true });
      }
      String.prototype.startsWith || r(String.prototype, "startsWith", function(e2, t2) {
        return t2 = t2 || 0, this.lastIndexOf(e2, t2) === t2;
      }), String.prototype.endsWith || r(String.prototype, "endsWith", function(e2, t2) {
        var n2 = this;
        if (t2 === void 0 || t2 > n2.length)
          t2 = n2.length;
        t2 -= e2.length;
        var r2 = n2.indexOf(e2, t2);
        return r2 !== -1 && r2 === t2;
      }), String.prototype.repeat || r(String.prototype, "repeat", function(e2) {
        var t2 = "", n2 = this;
        while (e2 > 0) {
          e2 & 1 && (t2 += n2);
          if (e2 >>= 1)
            n2 += n2;
        }
        return t2;
      }), String.prototype.includes || r(String.prototype, "includes", function(e2, t2) {
        return this.indexOf(e2, t2) != -1;
      }), Object.assign || (Object.assign = function(e2) {
        if (e2 === void 0 || e2 === null)
          throw new TypeError("Cannot convert undefined or null to object");
        var t2 = Object(e2);
        for (var n2 = 1; n2 < arguments.length; n2++) {
          var r2 = arguments[n2];
          r2 !== void 0 && r2 !== null && Object.keys(r2).forEach(function(e3) {
            t2[e3] = r2[e3];
          });
        }
        return t2;
      }), Object.values || (Object.values = function(e2) {
        return Object.keys(e2).map(function(t2) {
          return e2[t2];
        });
      }), Array.prototype.find || r(Array.prototype, "find", function(e2) {
        var t2 = this.length, n2 = arguments[1];
        for (var r2 = 0; r2 < t2; r2++) {
          var i = this[r2];
          if (e2.call(n2, i, r2, this))
            return i;
        }
      }), Array.prototype.findIndex || r(Array.prototype, "findIndex", function(e2) {
        var t2 = this.length, n2 = arguments[1];
        for (var r2 = 0; r2 < t2; r2++) {
          var i = this[r2];
          if (e2.call(n2, i, r2, this))
            return r2;
        }
      }), Array.prototype.includes || r(Array.prototype, "includes", function(e2, t2) {
        return this.indexOf(e2, t2) != -1;
      }), Array.prototype.fill || r(Array.prototype, "fill", function(e2) {
        var t2 = this, n2 = t2.length >>> 0, r2 = arguments[1], i = r2 >> 0, s = i < 0 ? Math.max(n2 + i, 0) : Math.min(i, n2), o = arguments[2], u = o === void 0 ? n2 : o >> 0, a = u < 0 ? Math.max(n2 + u, 0) : Math.min(u, n2);
        while (s < a)
          t2[s] = e2, s++;
        return t2;
      }), Array.of || r(Array, "of", function() {
        return Array.prototype.slice.call(arguments);
      });
    }), ace.define("ace/lib/fixoldbrowsers", ["require", "exports", "module", "ace/lib/es6-shim"], function(e, t, n) {
      "use strict";
      e("./es6-shim");
    }), ace.define("ace/lib/lang", ["require", "exports", "module"], function(e, t, n) {
      "use strict";
      t.last = function(e2) {
        return e2[e2.length - 1];
      }, t.stringReverse = function(e2) {
        return e2.split("").reverse().join("");
      }, t.stringRepeat = function(e2, t2) {
        var n2 = "";
        while (t2 > 0) {
          t2 & 1 && (n2 += e2);
          if (t2 >>= 1)
            e2 += e2;
        }
        return n2;
      };
      var r = /^\s\s*/, i = /\s\s*$/;
      t.stringTrimLeft = function(e2) {
        return e2.replace(r, "");
      }, t.stringTrimRight = function(e2) {
        return e2.replace(i, "");
      }, t.copyObject = function(e2) {
        var t2 = {};
        for (var n2 in e2)
          t2[n2] = e2[n2];
        return t2;
      }, t.copyArray = function(e2) {
        var t2 = [];
        for (var n2 = 0, r2 = e2.length; n2 < r2; n2++)
          e2[n2] && typeof e2[n2] == "object" ? t2[n2] = this.copyObject(e2[n2]) : t2[n2] = e2[n2];
        return t2;
      }, t.deepCopy = function s(e2) {
        if (typeof e2 != "object" || !e2)
          return e2;
        var t2;
        if (Array.isArray(e2)) {
          t2 = [];
          for (var n2 = 0; n2 < e2.length; n2++)
            t2[n2] = s(e2[n2]);
          return t2;
        }
        if (Object.prototype.toString.call(e2) !== "[object Object]")
          return e2;
        t2 = {};
        for (var n2 in e2)
          t2[n2] = s(e2[n2]);
        return t2;
      }, t.arrayToMap = function(e2) {
        var t2 = {};
        for (var n2 = 0; n2 < e2.length; n2++)
          t2[e2[n2]] = 1;
        return t2;
      }, t.createMap = function(e2) {
        var t2 = /* @__PURE__ */ Object.create(null);
        for (var n2 in e2)
          t2[n2] = e2[n2];
        return t2;
      }, t.arrayRemove = function(e2, t2) {
        for (var n2 = 0; n2 <= e2.length; n2++)
          t2 === e2[n2] && e2.splice(n2, 1);
      }, t.escapeRegExp = function(e2) {
        return e2.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
      }, t.escapeHTML = function(e2) {
        return ("" + e2).replace(/&/g, "&#38;").replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/</g, "&#60;");
      }, t.getMatchOffsets = function(e2, t2) {
        var n2 = [];
        return e2.replace(t2, function(e3) {
          n2.push({ offset: arguments[arguments.length - 2], length: e3.length });
        }), n2;
      }, t.deferredCall = function(e2) {
        var t2 = null, n2 = function() {
          t2 = null, e2();
        }, r2 = function(e3) {
          return r2.cancel(), t2 = setTimeout(n2, e3 || 0), r2;
        };
        return r2.schedule = r2, r2.call = function() {
          return this.cancel(), e2(), r2;
        }, r2.cancel = function() {
          return clearTimeout(t2), t2 = null, r2;
        }, r2.isPending = function() {
          return t2;
        }, r2;
      }, t.delayedCall = function(e2, t2) {
        var n2 = null, r2 = function() {
          n2 = null, e2();
        }, i2 = function(e3) {
          n2 == null && (n2 = setTimeout(r2, e3 || t2));
        };
        return i2.delay = function(e3) {
          n2 && clearTimeout(n2), n2 = setTimeout(r2, e3 || t2);
        }, i2.schedule = i2, i2.call = function() {
          this.cancel(), e2();
        }, i2.cancel = function() {
          n2 && clearTimeout(n2), n2 = null;
        }, i2.isPending = function() {
          return n2;
        }, i2;
      };
    }), ace.define("ace/lib/oop", ["require", "exports", "module"], function(e, t, n) {
      "use strict";
      t.inherits = function(e2, t2) {
        e2.super_ = t2, e2.prototype = Object.create(t2.prototype, { constructor: { value: e2, enumerable: false, writable: true, configurable: true } });
      }, t.mixin = function(e2, t2) {
        for (var n2 in t2)
          e2[n2] = t2[n2];
        return e2;
      }, t.implement = function(e2, n2) {
        t.mixin(e2, n2);
      };
    }), ace.define("ace/lib/useragent", ["require", "exports", "module"], function(e, t, n) {
      "use strict";
      t.OS = { LINUX: "LINUX", MAC: "MAC", WINDOWS: "WINDOWS" }, t.getOS = function() {
        return t.isMac ? t.OS.MAC : t.isLinux ? t.OS.LINUX : t.OS.WINDOWS;
      };
      var r = typeof navigator == "object" ? navigator : {}, i = (/mac|win|linux/i.exec(r.platform) || ["other"])[0].toLowerCase(), s = r.userAgent || "", o = r.appName || "";
      t.isWin = i == "win", t.isMac = i == "mac", t.isLinux = i == "linux", t.isIE = o == "Microsoft Internet Explorer" || o.indexOf("MSAppHost") >= 0 ? parseFloat((s.match(/(?:MSIE |Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/) || [])[1]) : parseFloat((s.match(/(?:Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/) || [])[1]), t.isOldIE = t.isIE && t.isIE < 9, t.isGecko = t.isMozilla = s.match(/ Gecko\/\d+/), t.isOpera = typeof opera == "object" && Object.prototype.toString.call(window.opera) == "[object Opera]", t.isWebKit = parseFloat(s.split("WebKit/")[1]) || void 0, t.isChrome = parseFloat(s.split(" Chrome/")[1]) || void 0, t.isEdge = parseFloat(s.split(" Edge/")[1]) || void 0, t.isAIR = s.indexOf("AdobeAIR") >= 0, t.isAndroid = s.indexOf("Android") >= 0, t.isChromeOS = s.indexOf(" CrOS ") >= 0, t.isIOS = /iPad|iPhone|iPod/.test(s) && !window.MSStream, t.isIOS && (t.isMac = true), t.isMobile = t.isIOS || t.isAndroid;
    }), ace.define("ace/lib/dom", ["require", "exports", "module", "ace/lib/useragent"], function(e, t, n) {
      "use strict";
      function u() {
        var e2 = o;
        o = null, e2 && e2.forEach(function(e3) {
          a(e3[0], e3[1]);
        });
      }
      function a(e2, n2, r2) {
        if (typeof document == "undefined")
          return;
        if (o) {
          if (r2)
            u();
          else if (r2 === false)
            return o.push([e2, n2]);
        }
        if (s)
          return;
        var i2 = r2;
        if (!r2 || !r2.getRootNode)
          i2 = document;
        else {
          i2 = r2.getRootNode();
          if (!i2 || i2 == r2)
            i2 = document;
        }
        var a2 = i2.ownerDocument || i2;
        if (n2 && t.hasCssString(n2, i2))
          return null;
        n2 && (e2 += "\n/*# sourceURL=ace/css/" + n2 + " */");
        var f2 = t.createElement("style");
        f2.appendChild(a2.createTextNode(e2)), n2 && (f2.id = n2), i2 == a2 && (i2 = t.getDocumentHead(a2)), i2.insertBefore(f2, i2.firstChild);
      }
      var r = e("./useragent"), i = "http://www.w3.org/1999/xhtml";
      t.buildDom = function l(e2, t2, n2) {
        if (typeof e2 == "string" && e2) {
          var r2 = document.createTextNode(e2);
          return t2 && t2.appendChild(r2), r2;
        }
        if (!Array.isArray(e2))
          return e2 && e2.appendChild && t2 && t2.appendChild(e2), e2;
        if (typeof e2[0] != "string" || !e2[0]) {
          var i2 = [];
          for (var s2 = 0; s2 < e2.length; s2++) {
            var o2 = l(e2[s2], t2, n2);
            o2 && i2.push(o2);
          }
          return i2;
        }
        var u2 = document.createElement(e2[0]), a2 = e2[1], f2 = 1;
        a2 && typeof a2 == "object" && !Array.isArray(a2) && (f2 = 2);
        for (var s2 = f2; s2 < e2.length; s2++)
          l(e2[s2], u2, n2);
        return f2 == 2 && Object.keys(a2).forEach(function(e3) {
          var t3 = a2[e3];
          e3 === "class" ? u2.className = Array.isArray(t3) ? t3.join(" ") : t3 : typeof t3 == "function" || e3 == "value" || e3[0] == "$" ? u2[e3] = t3 : e3 === "ref" ? n2 && (n2[t3] = u2) : e3 === "style" ? typeof t3 == "string" && (u2.style.cssText = t3) : t3 != null && u2.setAttribute(e3, t3);
        }), t2 && t2.appendChild(u2), u2;
      }, t.getDocumentHead = function(e2) {
        return e2 || (e2 = document), e2.head || e2.getElementsByTagName("head")[0] || e2.documentElement;
      }, t.createElement = function(e2, t2) {
        return document.createElementNS ? document.createElementNS(t2 || i, e2) : document.createElement(e2);
      }, t.removeChildren = function(e2) {
        e2.innerHTML = "";
      }, t.createTextNode = function(e2, t2) {
        var n2 = t2 ? t2.ownerDocument : document;
        return n2.createTextNode(e2);
      }, t.createFragment = function(e2) {
        var t2 = e2 ? e2.ownerDocument : document;
        return t2.createDocumentFragment();
      }, t.hasCssClass = function(e2, t2) {
        var n2 = (e2.className + "").split(/\s+/g);
        return n2.indexOf(t2) !== -1;
      }, t.addCssClass = function(e2, n2) {
        t.hasCssClass(e2, n2) || (e2.className += " " + n2);
      }, t.removeCssClass = function(e2, t2) {
        var n2 = e2.className.split(/\s+/g);
        for (; ; ) {
          var r2 = n2.indexOf(t2);
          if (r2 == -1)
            break;
          n2.splice(r2, 1);
        }
        e2.className = n2.join(" ");
      }, t.toggleCssClass = function(e2, t2) {
        var n2 = e2.className.split(/\s+/g), r2 = true;
        for (; ; ) {
          var i2 = n2.indexOf(t2);
          if (i2 == -1)
            break;
          r2 = false, n2.splice(i2, 1);
        }
        return r2 && n2.push(t2), e2.className = n2.join(" "), r2;
      }, t.setCssClass = function(e2, n2, r2) {
        r2 ? t.addCssClass(e2, n2) : t.removeCssClass(e2, n2);
      }, t.hasCssString = function(e2, t2) {
        var n2 = 0, r2;
        t2 = t2 || document;
        if (r2 = t2.querySelectorAll("style")) {
          while (n2 < r2.length)
            if (r2[n2++].id === e2)
              return true;
        }
      }, t.removeElementById = function(e2, t2) {
        t2 = t2 || document, t2.getElementById(e2) && t2.getElementById(e2).remove();
      };
      var s, o = [];
      t.useStrictCSP = function(e2) {
        s = e2, e2 == 0 ? u() : o || (o = []);
      }, t.importCssString = a, t.importCssStylsheet = function(e2, n2) {
        t.buildDom(["link", { rel: "stylesheet", href: e2 }], t.getDocumentHead(n2));
      }, t.scrollbarWidth = function(e2) {
        var n2 = t.createElement("ace_inner");
        n2.style.width = "100%", n2.style.minWidth = "0px", n2.style.height = "200px", n2.style.display = "block";
        var r2 = t.createElement("ace_outer"), i2 = r2.style;
        i2.position = "absolute", i2.left = "-10000px", i2.overflow = "hidden", i2.width = "200px", i2.minWidth = "0px", i2.height = "150px", i2.display = "block", r2.appendChild(n2);
        var s2 = e2.documentElement;
        s2.appendChild(r2);
        var o2 = n2.offsetWidth;
        i2.overflow = "scroll";
        var u2 = n2.offsetWidth;
        return o2 == u2 && (u2 = r2.clientWidth), s2.removeChild(r2), o2 - u2;
      }, t.computedStyle = function(e2, t2) {
        return window.getComputedStyle(e2, "") || {};
      }, t.setStyle = function(e2, t2, n2) {
        e2[t2] !== n2 && (e2[t2] = n2);
      }, t.HAS_CSS_ANIMATION = false, t.HAS_CSS_TRANSFORMS = false, t.HI_DPI = r.isWin ? typeof window != "undefined" && window.devicePixelRatio >= 1.5 : true, r.isChromeOS && (t.HI_DPI = false);
      if (typeof document != "undefined") {
        var f = document.createElement("div");
        t.HI_DPI && f.style.transform !== void 0 && (t.HAS_CSS_TRANSFORMS = true), !r.isEdge && typeof f.style.animationName != "undefined" && (t.HAS_CSS_ANIMATION = true), f = null;
      }
      t.HAS_CSS_TRANSFORMS ? t.translate = function(e2, t2, n2) {
        e2.style.transform = "translate(" + Math.round(t2) + "px, " + Math.round(n2) + "px)";
      } : t.translate = function(e2, t2, n2) {
        e2.style.top = Math.round(n2) + "px", e2.style.left = Math.round(t2) + "px";
      };
    }), ace.define("ace/lib/net", ["require", "exports", "module", "ace/lib/dom"], function(e, t, n) {
      "use strict";
      var r = e("./dom");
      t.get = function(e2, t2) {
        var n2 = new XMLHttpRequest();
        n2.open("GET", e2, true), n2.onreadystatechange = function() {
          n2.readyState === 4 && t2(n2.responseText);
        }, n2.send(null);
      }, t.loadScript = function(e2, t2) {
        var n2 = r.getDocumentHead(), i = document.createElement("script");
        i.src = e2, n2.appendChild(i), i.onload = i.onreadystatechange = function(e3, n3) {
          if (n3 || !i.readyState || i.readyState == "loaded" || i.readyState == "complete")
            i = i.onload = i.onreadystatechange = null, n3 || t2();
        };
      }, t.qualifyURL = function(e2) {
        var t2 = document.createElement("a");
        return t2.href = e2, t2.href;
      };
    }), ace.define("ace/lib/event_emitter", ["require", "exports", "module"], function(e, t, n) {
      "use strict";
      var r = {}, i = function() {
        this.propagationStopped = true;
      }, s = function() {
        this.defaultPrevented = true;
      };
      r._emit = r._dispatchEvent = function(e2, t2) {
        this._eventRegistry || (this._eventRegistry = {}), this._defaultHandlers || (this._defaultHandlers = {});
        var n2 = this._eventRegistry[e2] || [], r2 = this._defaultHandlers[e2];
        if (!n2.length && !r2)
          return;
        if (typeof t2 != "object" || !t2)
          t2 = {};
        t2.type || (t2.type = e2), t2.stopPropagation || (t2.stopPropagation = i), t2.preventDefault || (t2.preventDefault = s), n2 = n2.slice();
        for (var o = 0; o < n2.length; o++) {
          n2[o](t2, this);
          if (t2.propagationStopped)
            break;
        }
        if (r2 && !t2.defaultPrevented)
          return r2(t2, this);
      }, r._signal = function(e2, t2) {
        var n2 = (this._eventRegistry || {})[e2];
        if (!n2)
          return;
        n2 = n2.slice();
        for (var r2 = 0; r2 < n2.length; r2++)
          n2[r2](t2, this);
      }, r.once = function(e2, t2) {
        var n2 = this;
        this.on(e2, function r2() {
          n2.off(e2, r2), t2.apply(null, arguments);
        });
        if (!t2)
          return new Promise(function(e3) {
            t2 = e3;
          });
      }, r.setDefaultHandler = function(e2, t2) {
        var n2 = this._defaultHandlers;
        n2 || (n2 = this._defaultHandlers = { _disabled_: {} });
        if (n2[e2]) {
          var r2 = n2[e2], i2 = n2._disabled_[e2];
          i2 || (n2._disabled_[e2] = i2 = []), i2.push(r2);
          var s2 = i2.indexOf(t2);
          s2 != -1 && i2.splice(s2, 1);
        }
        n2[e2] = t2;
      }, r.removeDefaultHandler = function(e2, t2) {
        var n2 = this._defaultHandlers;
        if (!n2)
          return;
        var r2 = n2._disabled_[e2];
        if (n2[e2] == t2)
          r2 && this.setDefaultHandler(e2, r2.pop());
        else if (r2) {
          var i2 = r2.indexOf(t2);
          i2 != -1 && r2.splice(i2, 1);
        }
      }, r.on = r.addEventListener = function(e2, t2, n2) {
        this._eventRegistry = this._eventRegistry || {};
        var r2 = this._eventRegistry[e2];
        return r2 || (r2 = this._eventRegistry[e2] = []), r2.indexOf(t2) == -1 && r2[n2 ? "unshift" : "push"](t2), t2;
      }, r.off = r.removeListener = r.removeEventListener = function(e2, t2) {
        this._eventRegistry = this._eventRegistry || {};
        var n2 = this._eventRegistry[e2];
        if (!n2)
          return;
        var r2 = n2.indexOf(t2);
        r2 !== -1 && n2.splice(r2, 1);
      }, r.removeAllListeners = function(e2) {
        e2 || (this._eventRegistry = this._defaultHandlers = void 0), this._eventRegistry && (this._eventRegistry[e2] = void 0), this._defaultHandlers && (this._defaultHandlers[e2] = void 0);
      }, t.EventEmitter = r;
    }), ace.define("ace/lib/app_config", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function(e, t, n) {
      "no use strict";
      function o(e2) {
        typeof console != "undefined" && console.warn && console.warn.apply(console, arguments);
      }
      function u(e2, t2) {
        var n2 = new Error(e2);
        n2.data = t2, typeof console == "object" && console.error && console.error(n2), setTimeout(function() {
          throw n2;
        });
      }
      var r = e("./oop"), i = e("./event_emitter").EventEmitter, s = { setOptions: function(e2) {
        Object.keys(e2).forEach(function(t2) {
          this.setOption(t2, e2[t2]);
        }, this);
      }, getOptions: function(e2) {
        var t2 = {};
        if (!e2) {
          var n2 = this.$options;
          e2 = Object.keys(n2).filter(function(e3) {
            return !n2[e3].hidden;
          });
        } else
          Array.isArray(e2) || (t2 = e2, e2 = Object.keys(t2));
        return e2.forEach(function(e3) {
          t2[e3] = this.getOption(e3);
        }, this), t2;
      }, setOption: function(e2, t2) {
        if (this["$" + e2] === t2)
          return;
        var n2 = this.$options[e2];
        if (!n2)
          return o('misspelled option "' + e2 + '"');
        if (n2.forwardTo)
          return this[n2.forwardTo] && this[n2.forwardTo].setOption(e2, t2);
        n2.handlesSet || (this["$" + e2] = t2), n2 && n2.set && n2.set.call(this, t2);
      }, getOption: function(e2) {
        var t2 = this.$options[e2];
        return t2 ? t2.forwardTo ? this[t2.forwardTo] && this[t2.forwardTo].getOption(e2) : t2 && t2.get ? t2.get.call(this) : this["$" + e2] : o('misspelled option "' + e2 + '"');
      } }, a = function() {
        this.$defaultOptions = {};
      };
      (function() {
        r.implement(this, i), this.defineOptions = function(e2, t2, n2) {
          return e2.$options || (this.$defaultOptions[t2] = e2.$options = {}), Object.keys(n2).forEach(function(t3) {
            var r2 = n2[t3];
            typeof r2 == "string" && (r2 = { forwardTo: r2 }), r2.name || (r2.name = t3), e2.$options[r2.name] = r2, "initialValue" in r2 && (e2["$" + r2.name] = r2.initialValue);
          }), r.implement(e2, s), this;
        }, this.resetOptions = function(e2) {
          Object.keys(e2.$options).forEach(function(t2) {
            var n2 = e2.$options[t2];
            "value" in n2 && e2.setOption(t2, n2.value);
          });
        }, this.setDefaultValue = function(e2, t2, n2) {
          if (!e2) {
            for (e2 in this.$defaultOptions)
              if (this.$defaultOptions[e2][t2])
                break;
            if (!this.$defaultOptions[e2][t2])
              return false;
          }
          var r2 = this.$defaultOptions[e2] || (this.$defaultOptions[e2] = {});
          r2[t2] && (r2.forwardTo ? this.setDefaultValue(r2.forwardTo, t2, n2) : r2[t2].value = n2);
        }, this.setDefaultValues = function(e2, t2) {
          Object.keys(t2).forEach(function(n2) {
            this.setDefaultValue(e2, n2, t2[n2]);
          }, this);
        }, this.warn = o, this.reportError = u;
      }).call(a.prototype), t.AppConfig = a;
    }), ace.define("ace/theme/textmate", ["require", "exports", "module", "ace/lib/dom"], function(e, t, n) {
      "use strict";
      t.isDark = false, t.cssClass = "ace-tm", t.cssText = '.ace-tm .ace_gutter {background: #f0f0f0;color: #333;}.ace-tm .ace_print-margin {width: 1px;background: #e8e8e8;}.ace-tm .ace_fold {background-color: #6B72E6;}.ace-tm {background-color: #FFFFFF;color: black;}.ace-tm .ace_cursor {color: black;}.ace-tm .ace_invisible {color: rgb(191, 191, 191);}.ace-tm .ace_storage,.ace-tm .ace_keyword {color: blue;}.ace-tm .ace_constant {color: rgb(197, 6, 11);}.ace-tm .ace_constant.ace_buildin {color: rgb(88, 72, 246);}.ace-tm .ace_constant.ace_language {color: rgb(88, 92, 246);}.ace-tm .ace_constant.ace_library {color: rgb(6, 150, 14);}.ace-tm .ace_invalid {background-color: rgba(255, 0, 0, 0.1);color: red;}.ace-tm .ace_support.ace_function {color: rgb(60, 76, 114);}.ace-tm .ace_support.ace_constant {color: rgb(6, 150, 14);}.ace-tm .ace_support.ace_type,.ace-tm .ace_support.ace_class {color: rgb(109, 121, 222);}.ace-tm .ace_keyword.ace_operator {color: rgb(104, 118, 135);}.ace-tm .ace_string {color: rgb(3, 106, 7);}.ace-tm .ace_comment {color: rgb(76, 136, 107);}.ace-tm .ace_comment.ace_doc {color: rgb(0, 102, 255);}.ace-tm .ace_comment.ace_doc.ace_tag {color: rgb(128, 159, 191);}.ace-tm .ace_constant.ace_numeric {color: rgb(0, 0, 205);}.ace-tm .ace_variable {color: rgb(49, 132, 149);}.ace-tm .ace_xml-pe {color: rgb(104, 104, 91);}.ace-tm .ace_entity.ace_name.ace_function {color: #0000A2;}.ace-tm .ace_heading {color: rgb(12, 7, 255);}.ace-tm .ace_list {color:rgb(185, 6, 144);}.ace-tm .ace_meta.ace_tag {color:rgb(0, 22, 142);}.ace-tm .ace_string.ace_regex {color: rgb(255, 0, 0)}.ace-tm .ace_marker-layer .ace_selection {background: rgb(181, 213, 255);}.ace-tm.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px white;}.ace-tm .ace_marker-layer .ace_step {background: rgb(252, 255, 0);}.ace-tm .ace_marker-layer .ace_stack {background: rgb(164, 229, 101);}.ace-tm .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid rgb(192, 192, 192);}.ace-tm .ace_marker-layer .ace_active-line {background: rgba(0, 0, 0, 0.07);}.ace-tm .ace_gutter-active-line {background-color : #dcdcdc;}.ace-tm .ace_marker-layer .ace_selected-word {background: rgb(250, 250, 255);border: 1px solid rgb(200, 200, 250);}.ace-tm .ace_indent-guide {background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;}', t.$id = "ace/theme/textmate";
      var r = e("../lib/dom");
      r.importCssString(t.cssText, t.cssClass, false);
    }), ace.define("ace/config", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/lib/net", "ace/lib/dom", "ace/lib/app_config", "ace/theme/textmate"], function(e, t, n) {
      "no use strict";
      var r = e("./lib/lang"), i = e("./lib/oop"), s = e("./lib/net"), o = e("./lib/dom"), u = e("./lib/app_config").AppConfig;
      n.exports = t = new u();
      var a = { packaged: false, workerPath: null, modePath: null, themePath: null, basePath: "", suffix: ".js", $moduleUrls: {}, loadWorkerFromBlob: true, sharedPopups: false, useStrictCSP: null };
      t.get = function(e2) {
        if (!a.hasOwnProperty(e2))
          throw new Error("Unknown config key: " + e2);
        return a[e2];
      }, t.set = function(e2, t2) {
        if (a.hasOwnProperty(e2))
          a[e2] = t2;
        else if (this.setDefaultValue("", e2, t2) == 0)
          throw new Error("Unknown config key: " + e2);
        e2 == "useStrictCSP" && o.useStrictCSP(t2);
      }, t.all = function() {
        return r.copyObject(a);
      }, t.$modes = {}, t.moduleUrl = function(e2, t2) {
        if (a.$moduleUrls[e2])
          return a.$moduleUrls[e2];
        var n2 = e2.split("/");
        t2 = t2 || n2[n2.length - 2] || "";
        var r2 = t2 == "snippets" ? "/" : "-", i2 = n2[n2.length - 1];
        if (t2 == "worker" && r2 == "-") {
          var s2 = new RegExp("^" + t2 + "[\\-_]|[\\-_]" + t2 + "$", "g");
          i2 = i2.replace(s2, "");
        }
        (!i2 || i2 == t2) && n2.length > 1 && (i2 = n2[n2.length - 2]);
        var o2 = a[t2 + "Path"];
        return o2 == null ? o2 = a.basePath : r2 == "/" && (t2 = r2 = ""), o2 && o2.slice(-1) != "/" && (o2 += "/"), o2 + t2 + r2 + i2 + this.get("suffix");
      }, t.setModuleUrl = function(e2, t2) {
        return a.$moduleUrls[e2] = t2;
      };
      var f = function(t2, n2) {
        return t2 == "ace/theme/textmate" ? n2(null, e("./theme/textmate")) : console.error("loader is not configured");
      };
      t.setLoader = function(e2) {
        f = e2;
      }, t.$loading = {}, t.loadModule = function(n2, r2) {
        var i2, o2;
        Array.isArray(n2) && (o2 = n2[0], n2 = n2[1]);
        try {
          i2 = e(n2);
        } catch (u2) {
        }
        if (i2 && !t.$loading[n2])
          return r2 && r2(i2);
        t.$loading[n2] || (t.$loading[n2] = []), t.$loading[n2].push(r2);
        if (t.$loading[n2].length > 1)
          return;
        var a2 = function() {
          e([n2], function(e2) {
            t._emit("load.module", { name: n2, module: e2 });
            var r3 = t.$loading[n2];
            t.$loading[n2] = null, r3.forEach(function(t2) {
              t2 && t2(e2);
            });
          });
        };
        if (!t.get("packaged"))
          return a2();
        s.loadScript(t.moduleUrl(n2, o2), a2), l();
      };
      var l = function() {
        !a.basePath && !a.workerPath && !a.modePath && !a.themePath && !Object.keys(a.$moduleUrls).length && (console.error("Unable to infer path to ace from script src,", "use ace.config.set('basePath', 'path') to enable dynamic loading of modes and themes", "or with webpack use ace/webpack-resolver"), l = function() {
        });
      };
      t.version = "1.8.0";
    }), ace.define("ace/loader_build", ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/config"], function(e, t, n) {
      "use strict";
      function s(t2) {
        if (!i || !i.document)
          return;
        r.set("packaged", t2 || e.packaged || n.packaged || i.define && define.packaged);
        var s2 = {}, u = "", a = document.currentScript || document._currentScript, f = a && a.ownerDocument || document, l = f.getElementsByTagName("script");
        for (var c = 0; c < l.length; c++) {
          var h = l[c], p = h.src || h.getAttribute("src");
          if (!p)
            continue;
          var d = h.attributes;
          for (var v = 0, m = d.length; v < m; v++) {
            var g = d[v];
            g.name.indexOf("data-ace-") === 0 && (s2[o(g.name.replace(/^data-ace-/, ""))] = g.value);
          }
          var y = p.match(/^(.*)\/ace(\-\w+)?\.js(\?|$)/);
          y && (u = y[1]);
        }
        u && (s2.base = s2.base || u, s2.packaged = true), s2.basePath = s2.base, s2.workerPath = s2.workerPath || s2.base, s2.modePath = s2.modePath || s2.base, s2.themePath = s2.themePath || s2.base, delete s2.base;
        for (var b in s2)
          typeof s2[b] != "undefined" && r.set(b, s2[b]);
      }
      function o(e2) {
        return e2.replace(/-(.)/g, function(e3, t2) {
          return t2.toUpperCase();
        });
      }
      e("./lib/fixoldbrowsers");
      var r = e("./config"), i = function() {
        return this || typeof window != "undefined" && window;
      }();
      n.exports = function(t2) {
        r.init = s, t2.require = e, typeof define == "function" && (t2.define = define);
      };
    }), ace.define("ace/lib/keys", ["require", "exports", "module", "ace/lib/oop"], function(e, t, n) {
      "use strict";
      var r = e("./oop"), i = function() {
        var e2 = { MODIFIER_KEYS: { 16: "Shift", 17: "Ctrl", 18: "Alt", 224: "Meta", 91: "MetaLeft", 92: "MetaRight", 93: "ContextMenu" }, KEY_MODS: { ctrl: 1, alt: 2, option: 2, shift: 4, "super": 8, meta: 8, command: 8, cmd: 8, control: 1 }, FUNCTION_KEYS: { 8: "Backspace", 9: "Tab", 13: "Return", 19: "Pause", 27: "Esc", 32: "Space", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 44: "Print", 45: "Insert", 46: "Delete", 96: "Numpad0", 97: "Numpad1", 98: "Numpad2", 99: "Numpad3", 100: "Numpad4", 101: "Numpad5", 102: "Numpad6", 103: "Numpad7", 104: "Numpad8", 105: "Numpad9", "-13": "NumpadEnter", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "Numlock", 145: "Scrolllock" }, PRINTABLE_KEYS: { 32: " ", 48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 59: ";", 61: "=", 65: "a", 66: "b", 67: "c", 68: "d", 69: "e", 70: "f", 71: "g", 72: "h", 73: "i", 74: "j", 75: "k", 76: "l", 77: "m", 78: "n", 79: "o", 80: "p", 81: "q", 82: "r", 83: "s", 84: "t", 85: "u", 86: "v", 87: "w", 88: "x", 89: "y", 90: "z", 107: "+", 109: "-", 110: ".", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'", 111: "/", 106: "*" } }, t2, n2;
        for (n2 in e2.FUNCTION_KEYS)
          t2 = e2.FUNCTION_KEYS[n2].toLowerCase(), e2[t2] = parseInt(n2, 10);
        for (n2 in e2.PRINTABLE_KEYS)
          t2 = e2.PRINTABLE_KEYS[n2].toLowerCase(), e2[t2] = parseInt(n2, 10);
        return r.mixin(e2, e2.MODIFIER_KEYS), r.mixin(e2, e2.PRINTABLE_KEYS), r.mixin(e2, e2.FUNCTION_KEYS), e2.enter = e2["return"], e2.escape = e2.esc, e2.del = e2["delete"], e2[173] = "-", function() {
          var t3 = ["cmd", "ctrl", "alt", "shift"];
          for (var n3 = Math.pow(2, t3.length); n3--; )
            e2.KEY_MODS[n3] = t3.filter(function(t4) {
              return n3 & e2.KEY_MODS[t4];
            }).join("-") + "-";
        }(), e2.KEY_MODS[0] = "", e2.KEY_MODS[-1] = "input-", e2;
      }();
      r.mixin(t, i), t.keyCodeToString = function(e2) {
        var t2 = i[e2];
        return typeof t2 != "string" && (t2 = String.fromCharCode(e2)), t2.toLowerCase();
      };
    }), ace.define("ace/lib/event", ["require", "exports", "module", "ace/lib/keys", "ace/lib/useragent"], function(e, t, n) {
      "use strict";
      function a() {
        u = false;
        try {
          document.createComment("").addEventListener("test", function() {
          }, { get passive() {
            u = { passive: false };
          } });
        } catch (e2) {
        }
      }
      function f() {
        return u == void 0 && a(), u;
      }
      function l(e2, t2, n2) {
        this.elem = e2, this.type = t2, this.callback = n2;
      }
      function d(e2, t2, n2) {
        var u2 = p(t2);
        if (!i.isMac && s) {
          t2.getModifierState && (t2.getModifierState("OS") || t2.getModifierState("Win")) && (u2 |= 8);
          if (s.altGr) {
            if ((3 & u2) == 3)
              return;
            s.altGr = 0;
          }
          if (n2 === 18 || n2 === 17) {
            var a2 = "location" in t2 ? t2.location : t2.keyLocation;
            if (n2 === 17 && a2 === 1)
              s[n2] == 1 && (o = t2.timeStamp);
            else if (n2 === 18 && u2 === 3 && a2 === 2) {
              var f2 = t2.timeStamp - o;
              f2 < 50 && (s.altGr = true);
            }
          }
        }
        n2 in r.MODIFIER_KEYS && (n2 = -1);
        if (!u2 && n2 === 13) {
          var a2 = "location" in t2 ? t2.location : t2.keyLocation;
          if (a2 === 3) {
            e2(t2, u2, -n2);
            if (t2.defaultPrevented)
              return;
          }
        }
        if (i.isChromeOS && u2 & 8) {
          e2(t2, u2, n2);
          if (t2.defaultPrevented)
            return;
          u2 &= -9;
        }
        return !!u2 || n2 in r.FUNCTION_KEYS || n2 in r.PRINTABLE_KEYS ? e2(t2, u2, n2) : false;
      }
      function v() {
        s = /* @__PURE__ */ Object.create(null);
      }
      var r = e("./keys"), i = e("./useragent"), s = null, o = 0, u;
      l.prototype.destroy = function() {
        h(this.elem, this.type, this.callback), this.elem = this.type = this.callback = void 0;
      };
      var c = t.addListener = function(e2, t2, n2, r2) {
        e2.addEventListener(t2, n2, f()), r2 && r2.$toDestroy.push(new l(e2, t2, n2));
      }, h = t.removeListener = function(e2, t2, n2) {
        e2.removeEventListener(t2, n2, f());
      };
      t.stopEvent = function(e2) {
        return t.stopPropagation(e2), t.preventDefault(e2), false;
      }, t.stopPropagation = function(e2) {
        e2.stopPropagation && e2.stopPropagation();
      }, t.preventDefault = function(e2) {
        e2.preventDefault && e2.preventDefault();
      }, t.getButton = function(e2) {
        return e2.type == "dblclick" ? 0 : e2.type == "contextmenu" || i.isMac && e2.ctrlKey && !e2.altKey && !e2.shiftKey ? 2 : e2.button;
      }, t.capture = function(e2, t2, n2) {
        function i2(e3) {
          t2 && t2(e3), n2 && n2(e3), h(r2, "mousemove", t2), h(r2, "mouseup", i2), h(r2, "dragstart", i2);
        }
        var r2 = e2 && e2.ownerDocument || document;
        return c(r2, "mousemove", t2), c(r2, "mouseup", i2), c(r2, "dragstart", i2), i2;
      }, t.addMouseWheelListener = function(e2, t2, n2) {
        c(e2, "wheel", function(e3) {
          var n3 = 0.15, r2 = e3.deltaX || 0, i2 = e3.deltaY || 0;
          switch (e3.deltaMode) {
            case e3.DOM_DELTA_PIXEL:
              e3.wheelX = r2 * n3, e3.wheelY = i2 * n3;
              break;
            case e3.DOM_DELTA_LINE:
              var s2 = 15;
              e3.wheelX = r2 * s2, e3.wheelY = i2 * s2;
              break;
            case e3.DOM_DELTA_PAGE:
              var o2 = 150;
              e3.wheelX = r2 * o2, e3.wheelY = i2 * o2;
          }
          t2(e3);
        }, n2);
      }, t.addMultiMouseDownListener = function(e2, n2, r2, s2, o2) {
        function p2(e3) {
          t.getButton(e3) !== 0 ? u2 = 0 : e3.detail > 1 ? (u2++, u2 > 4 && (u2 = 1)) : u2 = 1;
          if (i.isIE) {
            var o3 = Math.abs(e3.clientX - a2) > 5 || Math.abs(e3.clientY - f2) > 5;
            if (!l2 || o3)
              u2 = 1;
            l2 && clearTimeout(l2), l2 = setTimeout(function() {
              l2 = null;
            }, n2[u2 - 1] || 600), u2 == 1 && (a2 = e3.clientX, f2 = e3.clientY);
          }
          e3._clicks = u2, r2[s2]("mousedown", e3);
          if (u2 > 4)
            u2 = 0;
          else if (u2 > 1)
            return r2[s2](h2[u2], e3);
        }
        var u2 = 0, a2, f2, l2, h2 = { 2: "dblclick", 3: "tripleclick", 4: "quadclick" };
        Array.isArray(e2) || (e2 = [e2]), e2.forEach(function(e3) {
          c(e3, "mousedown", p2, o2);
        });
      };
      var p = function(e2) {
        return 0 | (e2.ctrlKey ? 1 : 0) | (e2.altKey ? 2 : 0) | (e2.shiftKey ? 4 : 0) | (e2.metaKey ? 8 : 0);
      };
      t.getModifierString = function(e2) {
        return r.KEY_MODS[p(e2)];
      }, t.addCommandKeyListener = function(e2, n2, r2) {
        if (i.isOldGecko || i.isOpera && !("KeyboardEvent" in window)) {
          var o2 = null;
          c(e2, "keydown", function(e3) {
            o2 = e3.keyCode;
          }, r2), c(e2, "keypress", function(e3) {
            return d(n2, e3, o2);
          }, r2);
        } else {
          var u2 = null;
          c(e2, "keydown", function(e3) {
            s[e3.keyCode] = (s[e3.keyCode] || 0) + 1;
            var t2 = d(n2, e3, e3.keyCode);
            return u2 = e3.defaultPrevented, t2;
          }, r2), c(e2, "keypress", function(e3) {
            u2 && (e3.ctrlKey || e3.altKey || e3.shiftKey || e3.metaKey) && (t.stopEvent(e3), u2 = null);
          }, r2), c(e2, "keyup", function(e3) {
            s[e3.keyCode] = null;
          }, r2), s || (v(), c(window, "focus", v));
        }
      };
      if (typeof window == "object" && window.postMessage && !i.isOldIE) {
        var m = 1;
        t.nextTick = function(e2, n2) {
          n2 = n2 || window;
          var r2 = "zero-timeout-message-" + m++, i2 = function(s2) {
            s2.data == r2 && (t.stopPropagation(s2), h(n2, "message", i2), e2());
          };
          c(n2, "message", i2), n2.postMessage(r2, "*");
        };
      }
      t.$idleBlocked = false, t.onIdle = function(e2, n2) {
        return setTimeout(function r2() {
          t.$idleBlocked ? setTimeout(r2, 100) : e2();
        }, n2);
      }, t.$idleBlockId = null, t.blockIdle = function(e2) {
        t.$idleBlockId && clearTimeout(t.$idleBlockId), t.$idleBlocked = true, t.$idleBlockId = setTimeout(function() {
          t.$idleBlocked = false;
        }, e2 || 100);
      }, t.nextFrame = typeof window == "object" && (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame), t.nextFrame ? t.nextFrame = t.nextFrame.bind(window) : t.nextFrame = function(e2) {
        setTimeout(e2, 17);
      };
    }), ace.define("ace/range", ["require", "exports", "module"], function(e, t, n) {
      "use strict";
      var r = function(e2, t2) {
        return e2.row - t2.row || e2.column - t2.column;
      }, i = function(e2, t2, n2, r2) {
        this.start = { row: e2, column: t2 }, this.end = { row: n2, column: r2 };
      };
      (function() {
        this.isEqual = function(e2) {
          return this.start.row === e2.start.row && this.end.row === e2.end.row && this.start.column === e2.start.column && this.end.column === e2.end.column;
        }, this.toString = function() {
          return "Range: [" + this.start.row + "/" + this.start.column + "] -> [" + this.end.row + "/" + this.end.column + "]";
        }, this.contains = function(e2, t2) {
          return this.compare(e2, t2) == 0;
        }, this.compareRange = function(e2) {
          var t2, n2 = e2.end, r2 = e2.start;
          return t2 = this.compare(n2.row, n2.column), t2 == 1 ? (t2 = this.compare(r2.row, r2.column), t2 == 1 ? 2 : t2 == 0 ? 1 : 0) : t2 == -1 ? -2 : (t2 = this.compare(r2.row, r2.column), t2 == -1 ? -1 : t2 == 1 ? 42 : 0);
        }, this.comparePoint = function(e2) {
          return this.compare(e2.row, e2.column);
        }, this.containsRange = function(e2) {
          return this.comparePoint(e2.start) == 0 && this.comparePoint(e2.end) == 0;
        }, this.intersects = function(e2) {
          var t2 = this.compareRange(e2);
          return t2 == -1 || t2 == 0 || t2 == 1;
        }, this.isEnd = function(e2, t2) {
          return this.end.row == e2 && this.end.column == t2;
        }, this.isStart = function(e2, t2) {
          return this.start.row == e2 && this.start.column == t2;
        }, this.setStart = function(e2, t2) {
          typeof e2 == "object" ? (this.start.column = e2.column, this.start.row = e2.row) : (this.start.row = e2, this.start.column = t2);
        }, this.setEnd = function(e2, t2) {
          typeof e2 == "object" ? (this.end.column = e2.column, this.end.row = e2.row) : (this.end.row = e2, this.end.column = t2);
        }, this.inside = function(e2, t2) {
          return this.compare(e2, t2) == 0 ? this.isEnd(e2, t2) || this.isStart(e2, t2) ? false : true : false;
        }, this.insideStart = function(e2, t2) {
          return this.compare(e2, t2) == 0 ? this.isEnd(e2, t2) ? false : true : false;
        }, this.insideEnd = function(e2, t2) {
          return this.compare(e2, t2) == 0 ? this.isStart(e2, t2) ? false : true : false;
        }, this.compare = function(e2, t2) {
          return !this.isMultiLine() && e2 === this.start.row ? t2 < this.start.column ? -1 : t2 > this.end.column ? 1 : 0 : e2 < this.start.row ? -1 : e2 > this.end.row ? 1 : this.start.row === e2 ? t2 >= this.start.column ? 0 : -1 : this.end.row === e2 ? t2 <= this.end.column ? 0 : 1 : 0;
        }, this.compareStart = function(e2, t2) {
          return this.start.row == e2 && this.start.column == t2 ? -1 : this.compare(e2, t2);
        }, this.compareEnd = function(e2, t2) {
          return this.end.row == e2 && this.end.column == t2 ? 1 : this.compare(e2, t2);
        }, this.compareInside = function(e2, t2) {
          return this.end.row == e2 && this.end.column == t2 ? 1 : this.start.row == e2 && this.start.column == t2 ? -1 : this.compare(e2, t2);
        }, this.clipRows = function(e2, t2) {
          if (this.end.row > t2)
            var n2 = { row: t2 + 1, column: 0 };
          else if (this.end.row < e2)
            var n2 = { row: e2, column: 0 };
          if (this.start.row > t2)
            var r2 = { row: t2 + 1, column: 0 };
          else if (this.start.row < e2)
            var r2 = { row: e2, column: 0 };
          return i.fromPoints(r2 || this.start, n2 || this.end);
        }, this.extend = function(e2, t2) {
          var n2 = this.compare(e2, t2);
          if (n2 == 0)
            return this;
          if (n2 == -1)
            var r2 = { row: e2, column: t2 };
          else
            var s = { row: e2, column: t2 };
          return i.fromPoints(r2 || this.start, s || this.end);
        }, this.isEmpty = function() {
          return this.start.row === this.end.row && this.start.column === this.end.column;
        }, this.isMultiLine = function() {
          return this.start.row !== this.end.row;
        }, this.clone = function() {
          return i.fromPoints(this.start, this.end);
        }, this.collapseRows = function() {
          return this.end.column == 0 ? new i(this.start.row, 0, Math.max(this.start.row, this.end.row - 1), 0) : new i(this.start.row, 0, this.end.row, 0);
        }, this.toScreenRange = function(e2) {
          var t2 = e2.documentToScreenPosition(this.start), n2 = e2.documentToScreenPosition(this.end);
          return new i(t2.row, t2.column, n2.row, n2.column);
        }, this.moveBy = function(e2, t2) {
          this.start.row += e2, this.start.column += t2, this.end.row += e2, this.end.column += t2;
        };
      }).call(i.prototype), i.fromPoints = function(e2, t2) {
        return new i(e2.row, e2.column, t2.row, t2.column);
      }, i.comparePoints = r, i.comparePoints = function(e2, t2) {
        return e2.row - t2.row || e2.column - t2.column;
      }, t.Range = i;
    }), ace.define("ace/clipboard", ["require", "exports", "module"], function(e, t, n) {
      "use strict";
      var r;
      n.exports = { lineMode: false, pasteCancelled: function() {
        return r && r > Date.now() - 50 ? true : r = false;
      }, cancel: function() {
        r = Date.now();
      } };
    }), ace.define("ace/keyboard/textinput", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/lib/dom", "ace/lib/lang", "ace/clipboard", "ace/lib/keys"], function(e, t, n) {
      "use strict";
      var r = e("../lib/event"), i = e("../lib/useragent"), s = e("../lib/dom"), o = e("../lib/lang"), u = e("../clipboard"), a = i.isChrome < 18, f = i.isIE, l = i.isChrome > 63, c = 400, h = e("../lib/keys"), p = h.KEY_MODS, d = i.isIOS, v = d ? /\s/ : /\n/, m = i.isMobile, g = function(e2, t2) {
        function X() {
          x = true, n2.blur(), n2.focus(), x = false;
        }
        function $(e3) {
          e3.keyCode == 27 && n2.value.length < n2.selectionStart && (b || (T = n2.value), N = C = -1, O()), V();
        }
        function K() {
          clearTimeout(J), J = setTimeout(function() {
            E && (n2.style.cssText = E, E = ""), t2.renderer.$isMousePressed = false, t2.renderer.$keepTextAreaAtCursor && t2.renderer.$moveTextAreaToCursor();
          }, 0);
        }
        function G(e3, t3, n3) {
          var r2 = null, i2 = false;
          n3.addEventListener("keydown", function(e4) {
            r2 && clearTimeout(r2), i2 = true;
          }, true), n3.addEventListener("keyup", function(e4) {
            r2 = setTimeout(function() {
              i2 = false;
            }, 100);
          }, true);
          var s2 = function(e4) {
            if (document.activeElement !== n3)
              return;
            if (i2 || b || t3.$mouseHandler.isMousePressed)
              return;
            if (g2)
              return;
            var r3 = n3.selectionStart, s3 = n3.selectionEnd, o2 = null, u2 = 0;
            if (r3 == 0)
              o2 = h.up;
            else if (r3 == 1)
              o2 = h.home;
            else if (s3 > C && T[s3] == "\n")
              o2 = h.end;
            else if (r3 < N && T[r3 - 1] == " ")
              o2 = h.left, u2 = p.option;
            else if (r3 < N || r3 == N && C != N && r3 == s3)
              o2 = h.left;
            else if (s3 > C && T.slice(0, s3).split("\n").length > 2)
              o2 = h.down;
            else if (s3 > C && T[s3 - 1] == " ")
              o2 = h.right, u2 = p.option;
            else if (s3 > C || s3 == C && C != N && r3 == s3)
              o2 = h.right;
            r3 !== s3 && (u2 |= p.shift);
            if (o2) {
              var a2 = t3.onCommandKey({}, u2, o2);
              if (!a2 && t3.commands) {
                o2 = h.keyCodeToString(o2);
                var f2 = t3.commands.findKeyCommand(u2, o2);
                f2 && t3.execCommand(f2);
              }
              N = r3, C = s3, O("");
            }
          };
          document.addEventListener("selectionchange", s2), t3.on("destroy", function() {
            document.removeEventListener("selectionchange", s2);
          });
        }
        var n2 = s.createElement("textarea");
        n2.className = "ace_text-input", n2.setAttribute("wrap", "off"), n2.setAttribute("autocorrect", "off"), n2.setAttribute("autocapitalize", "off"), n2.setAttribute("spellcheck", false), n2.style.opacity = "0", e2.insertBefore(n2, e2.firstChild);
        var g2 = false, y = false, b = false, w = false, E = "";
        m || (n2.style.fontSize = "1px");
        var S = false, x = false, T = "", N = 0, C = 0, k = 0;
        try {
          var L = document.activeElement === n2;
        } catch (A) {
        }
        r.addListener(n2, "blur", function(e3) {
          if (x)
            return;
          t2.onBlur(e3), L = false;
        }, t2), r.addListener(n2, "focus", function(e3) {
          if (x)
            return;
          L = true;
          if (i.isEdge)
            try {
              if (!document.hasFocus())
                return;
            } catch (e4) {
            }
          t2.onFocus(e3), i.isEdge ? setTimeout(O) : O();
        }, t2), this.$focusScroll = false, this.focus = function() {
          if (E || l || this.$focusScroll == "browser")
            return n2.focus({ preventScroll: true });
          var e3 = n2.style.top;
          n2.style.position = "fixed", n2.style.top = "0px";
          try {
            var t3 = n2.getBoundingClientRect().top != 0;
          } catch (r2) {
            return;
          }
          var i2 = [];
          if (t3) {
            var s2 = n2.parentElement;
            while (s2 && s2.nodeType == 1)
              i2.push(s2), s2.setAttribute("ace_nocontext", true), !s2.parentElement && s2.getRootNode ? s2 = s2.getRootNode().host : s2 = s2.parentElement;
          }
          n2.focus({ preventScroll: true }), t3 && i2.forEach(function(e4) {
            e4.removeAttribute("ace_nocontext");
          }), setTimeout(function() {
            n2.style.position = "", n2.style.top == "0px" && (n2.style.top = e3);
          }, 0);
        }, this.blur = function() {
          n2.blur();
        }, this.isFocused = function() {
          return L;
        }, t2.on("beforeEndOperation", function() {
          var e3 = t2.curOp, r2 = e3 && e3.command && e3.command.name;
          if (r2 == "insertstring")
            return;
          var i2 = r2 && (e3.docChanged || e3.selectionChanged);
          b && i2 && (T = n2.value = "", W()), O();
        });
        var O = d ? function(e3) {
          if (!L || g2 && !e3 || w)
            return;
          e3 || (e3 = "");
          var r2 = "\n ab" + e3 + "cde fg\n";
          r2 != n2.value && (n2.value = T = r2);
          var i2 = 4, s2 = 4 + (e3.length || (t2.selection.isEmpty() ? 0 : 1));
          (N != i2 || C != s2) && n2.setSelectionRange(i2, s2), N = i2, C = s2;
        } : function() {
          if (b || w)
            return;
          if (!L && !P)
            return;
          b = true;
          var e3 = 0, r2 = 0, i2 = "";
          if (t2.session) {
            var s2 = t2.selection, o2 = s2.getRange(), u2 = s2.cursor.row;
            e3 = o2.start.column, r2 = o2.end.column, i2 = t2.session.getLine(u2);
            if (o2.start.row != u2) {
              var a2 = t2.session.getLine(u2 - 1);
              e3 = o2.start.row < u2 - 1 ? 0 : e3, r2 += a2.length + 1, i2 = a2 + "\n" + i2;
            } else if (o2.end.row != u2) {
              var f2 = t2.session.getLine(u2 + 1);
              r2 = o2.end.row > u2 + 1 ? f2.length : r2, r2 += i2.length + 1, i2 = i2 + "\n" + f2;
            } else
              m && u2 > 0 && (i2 = "\n" + i2, r2 += 1, e3 += 1);
            i2.length > c && (e3 < c && r2 < c ? i2 = i2.slice(0, c) : (i2 = "\n", e3 == r2 ? e3 = r2 = 0 : (e3 = 0, r2 = 1)));
          }
          var l2 = i2 + "\n\n";
          l2 != T && (n2.value = T = l2, N = C = l2.length), P && (N = n2.selectionStart, C = n2.selectionEnd);
          if (C != r2 || N != e3 || n2.selectionEnd != C)
            try {
              n2.setSelectionRange(e3, r2), N = e3, C = r2;
            } catch (h2) {
            }
          b = false;
        };
        this.resetSelection = O, L && t2.onFocus();
        var M = function(e3) {
          return e3.selectionStart === 0 && e3.selectionEnd >= T.length && e3.value === T && T && e3.selectionEnd !== C;
        }, _ = function(e3) {
          if (b)
            return;
          g2 ? g2 = false : M(n2) ? (t2.selectAll(), O()) : m && n2.selectionStart != N && O();
        }, D = null;
        this.setInputHandler = function(e3) {
          D = e3;
        }, this.getInputHandler = function() {
          return D;
        };
        var P = false, H = function(e3, r2) {
          P && (P = false);
          if (y)
            return O(), e3 && t2.onPaste(e3), y = false, "";
          var s2 = n2.selectionStart, o2 = n2.selectionEnd, u2 = N, a2 = T.length - C, f2 = e3, l2 = e3.length - s2, c2 = e3.length - o2, h2 = 0;
          while (u2 > 0 && T[h2] == e3[h2])
            h2++, u2--;
          f2 = f2.slice(h2), h2 = 1;
          while (a2 > 0 && T.length - h2 > N - 1 && T[T.length - h2] == e3[e3.length - h2])
            h2++, a2--;
          l2 -= h2 - 1, c2 -= h2 - 1;
          var p2 = f2.length - h2 + 1;
          p2 < 0 && (u2 = -p2, p2 = 0), f2 = f2.slice(0, p2);
          if (!r2 && !f2 && !l2 && !u2 && !a2 && !c2)
            return "";
          w = true;
          var d2 = false;
          return i.isAndroid && f2 == ". " && (f2 = "  ", d2 = true), f2 && !u2 && !a2 && !l2 && !c2 || S ? t2.onTextInput(f2) : t2.onTextInput(f2, { extendLeft: u2, extendRight: a2, restoreStart: l2, restoreEnd: c2 }), w = false, T = e3, N = s2, C = o2, k = c2, d2 ? "\n" : f2;
        }, B = function(e3) {
          if (b)
            return z();
          if (e3 && e3.inputType) {
            if (e3.inputType == "historyUndo")
              return t2.execCommand("undo");
            if (e3.inputType == "historyRedo")
              return t2.execCommand("redo");
          }
          var r2 = n2.value, i2 = H(r2, true);
          (r2.length > c + 100 || v.test(i2) || m && N < 1 && N == C) && O();
        }, j = function(e3, t3, n3) {
          var r2 = e3.clipboardData || window.clipboardData;
          if (!r2 || a)
            return;
          var i2 = f || n3 ? "Text" : "text/plain";
          try {
            return t3 ? r2.setData(i2, t3) !== false : r2.getData(i2);
          } catch (e4) {
            if (!n3)
              return j(e4, t3, true);
          }
        }, F = function(e3, i2) {
          var s2 = t2.getCopyText();
          if (!s2)
            return r.preventDefault(e3);
          j(e3, s2) ? (d && (O(s2), g2 = s2, setTimeout(function() {
            g2 = false;
          }, 10)), i2 ? t2.onCut() : t2.onCopy(), r.preventDefault(e3)) : (g2 = true, n2.value = s2, n2.select(), setTimeout(function() {
            g2 = false, O(), i2 ? t2.onCut() : t2.onCopy();
          }));
        }, I = function(e3) {
          F(e3, true);
        }, q = function(e3) {
          F(e3, false);
        }, R = function(e3) {
          var s2 = j(e3);
          if (u.pasteCancelled())
            return;
          typeof s2 == "string" ? (s2 && t2.onPaste(s2, e3), i.isIE && setTimeout(O), r.preventDefault(e3)) : (n2.value = "", y = true);
        };
        r.addCommandKeyListener(n2, t2.onCommandKey.bind(t2), t2), r.addListener(n2, "select", _, t2), r.addListener(n2, "input", B, t2), r.addListener(n2, "cut", I, t2), r.addListener(n2, "copy", q, t2), r.addListener(n2, "paste", R, t2), (!("oncut" in n2) || !("oncopy" in n2) || !("onpaste" in n2)) && r.addListener(e2, "keydown", function(e3) {
          if (i.isMac && !e3.metaKey || !e3.ctrlKey)
            return;
          switch (e3.keyCode) {
            case 67:
              q(e3);
              break;
            case 86:
              R(e3);
              break;
            case 88:
              I(e3);
          }
        }, t2);
        var U = function(e3) {
          if (b || !t2.onCompositionStart || t2.$readOnly)
            return;
          b = {};
          if (S)
            return;
          e3.data && (b.useTextareaForIME = false), setTimeout(z, 0), t2._signal("compositionStart"), t2.on("mousedown", X);
          var r2 = t2.getSelectionRange();
          r2.end.row = r2.start.row, r2.end.column = r2.start.column, b.markerRange = r2, b.selectionStart = N, t2.onCompositionStart(b), b.useTextareaForIME ? (T = n2.value = "", N = 0, C = 0) : (n2.msGetInputContext && (b.context = n2.msGetInputContext()), n2.getInputContext && (b.context = n2.getInputContext()));
        }, z = function() {
          if (!b || !t2.onCompositionUpdate || t2.$readOnly)
            return;
          if (S)
            return X();
          if (b.useTextareaForIME)
            t2.onCompositionUpdate(n2.value);
          else {
            var e3 = n2.value;
            H(e3), b.markerRange && (b.context && (b.markerRange.start.column = b.selectionStart = b.context.compositionStartOffset), b.markerRange.end.column = b.markerRange.start.column + C - b.selectionStart + k);
          }
        }, W = function(e3) {
          if (!t2.onCompositionEnd || t2.$readOnly)
            return;
          b = false, t2.onCompositionEnd(), t2.off("mousedown", X), e3 && B();
        }, V = o.delayedCall(z, 50).schedule.bind(null, null);
        r.addListener(n2, "compositionstart", U, t2), r.addListener(n2, "compositionupdate", z, t2), r.addListener(n2, "keyup", $, t2), r.addListener(n2, "keydown", V, t2), r.addListener(n2, "compositionend", W, t2), this.getElement = function() {
          return n2;
        }, this.setCommandMode = function(e3) {
          S = e3, n2.readOnly = false;
        }, this.setReadOnly = function(e3) {
          S || (n2.readOnly = e3);
        }, this.setCopyWithEmptySelection = function(e3) {
        }, this.onContextMenu = function(e3) {
          P = true, O(), t2._emit("nativecontextmenu", { target: t2, domEvent: e3 }), this.moveToMouse(e3, true);
        }, this.moveToMouse = function(e3, o2) {
          E || (E = n2.style.cssText), n2.style.cssText = (o2 ? "z-index:100000;" : "") + (i.isIE ? "opacity:0.1;" : "") + "text-indent: -" + (N + C) * t2.renderer.characterWidth * 0.5 + "px;";
          var u2 = t2.container.getBoundingClientRect(), a2 = s.computedStyle(t2.container), f2 = u2.top + (parseInt(a2.borderTopWidth) || 0), l2 = u2.left + (parseInt(u2.borderLeftWidth) || 0), c2 = u2.bottom - f2 - n2.clientHeight - 2, h2 = function(e4) {
            s.translate(n2, e4.clientX - l2 - 2, Math.min(e4.clientY - f2 - 2, c2));
          };
          h2(e3);
          if (e3.type != "mousedown")
            return;
          t2.renderer.$isMousePressed = true, clearTimeout(J), i.isWin && r.capture(t2.container, h2, K);
        }, this.onContextMenuClose = K;
        var J, Q = function(e3) {
          t2.textInput.onContextMenu(e3), K();
        };
        r.addListener(n2, "mouseup", Q, t2), r.addListener(n2, "mousedown", function(e3) {
          e3.preventDefault(), K();
        }, t2), r.addListener(t2.renderer.scroller, "contextmenu", Q, t2), r.addListener(n2, "contextmenu", Q, t2), d && G(e2, t2, n2), this.destroy = function() {
          n2.parentElement && n2.parentElement.removeChild(n2);
        };
      };
      t.TextInput = g, t.$setUserAgentForTests = function(e2, t2) {
        m = e2, d = t2;
      };
    }), ace.define("ace/mouse/default_handlers", ["require", "exports", "module", "ace/lib/useragent"], function(e, t, n) {
      "use strict";
      function o(e2) {
        e2.$clickSelection = null;
        var t2 = e2.editor;
        t2.setDefaultHandler("mousedown", this.onMouseDown.bind(e2)), t2.setDefaultHandler("dblclick", this.onDoubleClick.bind(e2)), t2.setDefaultHandler("tripleclick", this.onTripleClick.bind(e2)), t2.setDefaultHandler("quadclick", this.onQuadClick.bind(e2)), t2.setDefaultHandler("mousewheel", this.onMouseWheel.bind(e2));
        var n2 = ["select", "startSelect", "selectEnd", "selectAllEnd", "selectByWordsEnd", "selectByLinesEnd", "dragWait", "dragWaitEnd", "focusWait"];
        n2.forEach(function(t3) {
          e2[t3] = this[t3];
        }, this), e2.selectByLines = this.extendSelectionBy.bind(e2, "getLineRange"), e2.selectByWords = this.extendSelectionBy.bind(e2, "getWordRange");
      }
      function u(e2, t2, n2, r2) {
        return Math.sqrt(Math.pow(n2 - e2, 2) + Math.pow(r2 - t2, 2));
      }
      function a(e2, t2) {
        if (e2.start.row == e2.end.row)
          var n2 = 2 * t2.column - e2.start.column - e2.end.column;
        else if (e2.start.row == e2.end.row - 1 && !e2.start.column && !e2.end.column)
          var n2 = t2.column - 4;
        else
          var n2 = 2 * t2.row - e2.start.row - e2.end.row;
        return n2 < 0 ? { cursor: e2.start, anchor: e2.end } : { cursor: e2.end, anchor: e2.start };
      }
      var r = e("../lib/useragent"), i = 0, s = 550;
      (function() {
        this.onMouseDown = function(e2) {
          var t2 = e2.inSelection(), n2 = e2.getDocumentPosition();
          this.mousedownEvent = e2;
          var i2 = this.editor, s2 = e2.getButton();
          if (s2 !== 0) {
            var o2 = i2.getSelectionRange(), u2 = o2.isEmpty();
            (u2 || s2 == 1) && i2.selection.moveToPosition(n2), s2 == 2 && (i2.textInput.onContextMenu(e2.domEvent), r.isMozilla || e2.preventDefault());
            return;
          }
          this.mousedownEvent.time = Date.now();
          if (t2 && !i2.isFocused()) {
            i2.focus();
            if (this.$focusTimeout && !this.$clickSelection && !i2.inMultiSelectMode) {
              this.setState("focusWait"), this.captureMouse(e2);
              return;
            }
          }
          return this.captureMouse(e2), this.startSelect(n2, e2.domEvent._clicks > 1), e2.preventDefault();
        }, this.startSelect = function(e2, t2) {
          e2 = e2 || this.editor.renderer.screenToTextCoordinates(this.x, this.y);
          var n2 = this.editor;
          if (!this.mousedownEvent)
            return;
          this.mousedownEvent.getShiftKey() ? n2.selection.selectToPosition(e2) : t2 || n2.selection.moveToPosition(e2), t2 || this.select(), n2.renderer.scroller.setCapture && n2.renderer.scroller.setCapture(), n2.setStyle("ace_selecting"), this.setState("select");
        }, this.select = function() {
          var e2, t2 = this.editor, n2 = t2.renderer.screenToTextCoordinates(this.x, this.y);
          if (this.$clickSelection) {
            var r2 = this.$clickSelection.comparePoint(n2);
            if (r2 == -1)
              e2 = this.$clickSelection.end;
            else if (r2 == 1)
              e2 = this.$clickSelection.start;
            else {
              var i2 = a(this.$clickSelection, n2);
              n2 = i2.cursor, e2 = i2.anchor;
            }
            t2.selection.setSelectionAnchor(e2.row, e2.column);
          }
          t2.selection.selectToPosition(n2), t2.renderer.scrollCursorIntoView();
        }, this.extendSelectionBy = function(e2) {
          var t2, n2 = this.editor, r2 = n2.renderer.screenToTextCoordinates(this.x, this.y), i2 = n2.selection[e2](r2.row, r2.column);
          if (this.$clickSelection) {
            var s2 = this.$clickSelection.comparePoint(i2.start), o2 = this.$clickSelection.comparePoint(i2.end);
            if (s2 == -1 && o2 <= 0) {
              t2 = this.$clickSelection.end;
              if (i2.end.row != r2.row || i2.end.column != r2.column)
                r2 = i2.start;
            } else if (o2 == 1 && s2 >= 0) {
              t2 = this.$clickSelection.start;
              if (i2.start.row != r2.row || i2.start.column != r2.column)
                r2 = i2.end;
            } else if (s2 == -1 && o2 == 1)
              r2 = i2.end, t2 = i2.start;
            else {
              var u2 = a(this.$clickSelection, r2);
              r2 = u2.cursor, t2 = u2.anchor;
            }
            n2.selection.setSelectionAnchor(t2.row, t2.column);
          }
          n2.selection.selectToPosition(r2), n2.renderer.scrollCursorIntoView();
        }, this.selectEnd = this.selectAllEnd = this.selectByWordsEnd = this.selectByLinesEnd = function() {
          this.$clickSelection = null, this.editor.unsetStyle("ace_selecting"), this.editor.renderer.scroller.releaseCapture && this.editor.renderer.scroller.releaseCapture();
        }, this.focusWait = function() {
          var e2 = u(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y), t2 = Date.now();
          (e2 > i || t2 - this.mousedownEvent.time > this.$focusTimeout) && this.startSelect(this.mousedownEvent.getDocumentPosition());
        }, this.onDoubleClick = function(e2) {
          var t2 = e2.getDocumentPosition(), n2 = this.editor, r2 = n2.session, i2 = r2.getBracketRange(t2);
          i2 ? (i2.isEmpty() && (i2.start.column--, i2.end.column++), this.setState("select")) : (i2 = n2.selection.getWordRange(t2.row, t2.column), this.setState("selectByWords")), this.$clickSelection = i2, this.select();
        }, this.onTripleClick = function(e2) {
          var t2 = e2.getDocumentPosition(), n2 = this.editor;
          this.setState("selectByLines");
          var r2 = n2.getSelectionRange();
          r2.isMultiLine() && r2.contains(t2.row, t2.column) ? (this.$clickSelection = n2.selection.getLineRange(r2.start.row), this.$clickSelection.end = n2.selection.getLineRange(r2.end.row).end) : this.$clickSelection = n2.selection.getLineRange(t2.row), this.select();
        }, this.onQuadClick = function(e2) {
          var t2 = this.editor;
          t2.selectAll(), this.$clickSelection = t2.getSelectionRange(), this.setState("selectAll");
        }, this.onMouseWheel = function(e2) {
          if (e2.getAccelKey())
            return;
          e2.getShiftKey() && e2.wheelY && !e2.wheelX && (e2.wheelX = e2.wheelY, e2.wheelY = 0);
          var t2 = this.editor;
          this.$lastScroll || (this.$lastScroll = { t: 0, vx: 0, vy: 0, allowed: 0 });
          var n2 = this.$lastScroll, r2 = e2.domEvent.timeStamp, i2 = r2 - n2.t, o2 = i2 ? e2.wheelX / i2 : n2.vx, u2 = i2 ? e2.wheelY / i2 : n2.vy;
          i2 < s && (o2 = (o2 + n2.vx) / 2, u2 = (u2 + n2.vy) / 2);
          var a2 = Math.abs(o2 / u2), f = false;
          a2 >= 1 && t2.renderer.isScrollableBy(e2.wheelX * e2.speed, 0) && (f = true), a2 <= 1 && t2.renderer.isScrollableBy(0, e2.wheelY * e2.speed) && (f = true);
          if (f)
            n2.allowed = r2;
          else if (r2 - n2.allowed < s) {
            var l = Math.abs(o2) <= 1.5 * Math.abs(n2.vx) && Math.abs(u2) <= 1.5 * Math.abs(n2.vy);
            l ? (f = true, n2.allowed = r2) : n2.allowed = 0;
          }
          n2.t = r2, n2.vx = o2, n2.vy = u2;
          if (f)
            return t2.renderer.scrollBy(e2.wheelX * e2.speed, e2.wheelY * e2.speed), e2.stop();
        };
      }).call(o.prototype), t.DefaultHandlers = o;
    }), ace.define("ace/tooltip", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom"], function(e, t, n) {
      "use strict";
      function o(e2) {
        this.isOpen = false, this.$element = null, this.$parentNode = e2;
      }
      var r = e("./lib/oop"), i = e("./lib/dom"), s = "ace_tooltip";
      (function() {
        this.$init = function() {
          return this.$element = i.createElement("div"), this.$element.className = s, this.$element.style.display = "none", this.$parentNode.appendChild(this.$element), this.$element;
        }, this.getElement = function() {
          return this.$element || this.$init();
        }, this.setText = function(e2) {
          this.getElement().textContent = e2;
        }, this.setHtml = function(e2) {
          this.getElement().innerHTML = e2;
        }, this.setPosition = function(e2, t2) {
          this.getElement().style.left = e2 + "px", this.getElement().style.top = t2 + "px";
        }, this.setClassName = function(e2) {
          i.addCssClass(this.getElement(), e2);
        }, this.show = function(e2, t2, n2) {
          e2 != null && this.setText(e2), t2 != null && n2 != null && this.setPosition(t2, n2), this.isOpen || (this.getElement().style.display = "block", this.isOpen = true);
        }, this.hide = function() {
          this.isOpen && (this.getElement().style.display = "none", this.getElement().className = s, this.isOpen = false);
        }, this.getHeight = function() {
          return this.getElement().offsetHeight;
        }, this.getWidth = function() {
          return this.getElement().offsetWidth;
        }, this.destroy = function() {
          this.isOpen = false, this.$element && this.$element.parentNode && this.$element.parentNode.removeChild(this.$element);
        };
      }).call(o.prototype), t.Tooltip = o;
    }), ace.define("ace/mouse/default_gutter_handler", ["require", "exports", "module", "ace/lib/dom", "ace/lib/oop", "ace/lib/event", "ace/tooltip"], function(e, t, n) {
      "use strict";
      function u(e2) {
        function l() {
          var r2 = u2.getDocumentPosition().row, s2 = n2.$annotations[r2];
          if (!s2)
            return c();
          var o3 = t2.session.getLength();
          if (r2 == o3) {
            var a2 = t2.renderer.pixelToScreenCoordinates(0, u2.y).row, l2 = u2.$pos;
            if (a2 > t2.session.documentToScreenRow(l2.row, l2.column))
              return c();
          }
          if (f == s2)
            return;
          f = s2.text.join("<br/>"), i2.setHtml(f);
          var p = s2.className;
          p && i2.setClassName(p.trim()), i2.show(), t2._signal("showGutterTooltip", i2), t2.on("mousewheel", c);
          if (e2.$tooltipFollowsMouse)
            h(u2);
          else {
            var d = u2.domEvent.target, v = d.getBoundingClientRect(), m = i2.getElement().style;
            m.left = v.right + "px", m.top = v.bottom + "px";
          }
        }
        function c() {
          o2 && (o2 = clearTimeout(o2)), f && (i2.hide(), f = null, t2._signal("hideGutterTooltip", i2), t2.off("mousewheel", c));
        }
        function h(e3) {
          i2.setPosition(e3.x, e3.y);
        }
        var t2 = e2.editor, n2 = t2.renderer.$gutterLayer, i2 = new a(t2.container);
        e2.editor.setDefaultHandler("guttermousedown", function(r2) {
          if (!t2.isFocused() || r2.getButton() != 0)
            return;
          var i3 = n2.getRegion(r2);
          if (i3 == "foldWidgets")
            return;
          var s2 = r2.getDocumentPosition().row, o3 = t2.session.selection;
          if (r2.getShiftKey())
            o3.selectTo(s2, 0);
          else {
            if (r2.domEvent.detail == 2)
              return t2.selectAll(), r2.preventDefault();
            e2.$clickSelection = t2.selection.getLineRange(s2);
          }
          return e2.setState("selectByLines"), e2.captureMouse(r2), r2.preventDefault();
        });
        var o2, u2, f;
        e2.editor.setDefaultHandler("guttermousemove", function(t3) {
          var n3 = t3.domEvent.target || t3.domEvent.srcElement;
          if (r.hasCssClass(n3, "ace_fold-widget"))
            return c();
          f && e2.$tooltipFollowsMouse && h(t3), u2 = t3;
          if (o2)
            return;
          o2 = setTimeout(function() {
            o2 = null, u2 && !e2.isMousePressed ? l() : c();
          }, 50);
        }), s.addListener(t2.renderer.$gutter, "mouseout", function(e3) {
          u2 = null;
          if (!f || o2)
            return;
          o2 = setTimeout(function() {
            o2 = null, c();
          }, 50);
        }, t2), t2.on("changeSession", c);
      }
      function a(e2) {
        o.call(this, e2);
      }
      var r = e("../lib/dom"), i = e("../lib/oop"), s = e("../lib/event"), o = e("../tooltip").Tooltip;
      i.inherits(a, o), function() {
        this.setPosition = function(e2, t2) {
          var n2 = window.innerWidth || document.documentElement.clientWidth, r2 = window.innerHeight || document.documentElement.clientHeight, i2 = this.getWidth(), s2 = this.getHeight();
          e2 += 15, t2 += 15, e2 + i2 > n2 && (e2 -= e2 + i2 - n2), t2 + s2 > r2 && (t2 -= 20 + s2), o.prototype.setPosition.call(this, e2, t2);
        };
      }.call(a.prototype), t.GutterHandler = u;
    }), ace.define("ace/mouse/mouse_event", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent"], function(e, t, n) {
      "use strict";
      var r = e("../lib/event"), i = e("../lib/useragent"), s = t.MouseEvent = function(e2, t2) {
        this.domEvent = e2, this.editor = t2, this.x = this.clientX = e2.clientX, this.y = this.clientY = e2.clientY, this.$pos = null, this.$inSelection = null, this.propagationStopped = false, this.defaultPrevented = false;
      };
      (function() {
        this.stopPropagation = function() {
          r.stopPropagation(this.domEvent), this.propagationStopped = true;
        }, this.preventDefault = function() {
          r.preventDefault(this.domEvent), this.defaultPrevented = true;
        }, this.stop = function() {
          this.stopPropagation(), this.preventDefault();
        }, this.getDocumentPosition = function() {
          return this.$pos ? this.$pos : (this.$pos = this.editor.renderer.screenToTextCoordinates(this.clientX, this.clientY), this.$pos);
        }, this.inSelection = function() {
          if (this.$inSelection !== null)
            return this.$inSelection;
          var e2 = this.editor, t2 = e2.getSelectionRange();
          if (t2.isEmpty())
            this.$inSelection = false;
          else {
            var n2 = this.getDocumentPosition();
            this.$inSelection = t2.contains(n2.row, n2.column);
          }
          return this.$inSelection;
        }, this.getButton = function() {
          return r.getButton(this.domEvent);
        }, this.getShiftKey = function() {
          return this.domEvent.shiftKey;
        }, this.getAccelKey = i.isMac ? function() {
          return this.domEvent.metaKey;
        } : function() {
          return this.domEvent.ctrlKey;
        };
      }).call(s.prototype);
    }), ace.define("ace/mouse/dragdrop_handler", ["require", "exports", "module", "ace/lib/dom", "ace/lib/event", "ace/lib/useragent"], function(e, t, n) {
      "use strict";
      function f(e2) {
        function T(e3, n3) {
          var r2 = Date.now(), i2 = !n3 || e3.row != n3.row, s2 = !n3 || e3.column != n3.column;
          if (!S || i2 || s2)
            t2.moveCursorToPosition(e3), S = r2, x = { x: p, y: d };
          else {
            var o2 = l(x.x, x.y, p, d);
            o2 > a ? S = null : r2 - S >= u && (t2.renderer.scrollCursorIntoView(), S = null);
          }
        }
        function N(e3, n3) {
          var r2 = Date.now(), i2 = t2.renderer.layerConfig.lineHeight, s2 = t2.renderer.layerConfig.characterWidth, u2 = t2.renderer.scroller.getBoundingClientRect(), a2 = { x: { left: p - u2.left, right: u2.right - p }, y: { top: d - u2.top, bottom: u2.bottom - d } }, f3 = Math.min(a2.x.left, a2.x.right), l2 = Math.min(a2.y.top, a2.y.bottom), c2 = { row: e3.row, column: e3.column };
          f3 / s2 <= 2 && (c2.column += a2.x.left < a2.x.right ? -3 : 2), l2 / i2 <= 1 && (c2.row += a2.y.top < a2.y.bottom ? -1 : 1);
          var h2 = e3.row != c2.row, v2 = e3.column != c2.column, m2 = !n3 || e3.row != n3.row;
          h2 || v2 && !m2 ? E ? r2 - E >= o && t2.renderer.scrollCursorIntoView(c2) : E = r2 : E = null;
        }
        function C() {
          var e3 = g;
          g = t2.renderer.screenToTextCoordinates(p, d), T(g, e3), N(g, e3);
        }
        function k() {
          m = t2.selection.toOrientedRange(), h = t2.session.addMarker(m, "ace_selection", t2.getSelectionStyle()), t2.clearSelection(), t2.isFocused() && t2.renderer.$cursorLayer.setBlinking(false), clearInterval(v), C(), v = setInterval(C, 20), y = 0, i.addListener(document, "mousemove", O);
        }
        function L() {
          clearInterval(v), t2.session.removeMarker(h), h = null, t2.selection.fromOrientedRange(m), t2.isFocused() && !w && t2.$resetCursorStyle(), m = null, g = null, y = 0, E = null, S = null, i.removeListener(document, "mousemove", O);
        }
        function O() {
          A == null && (A = setTimeout(function() {
            A != null && h && L();
          }, 20));
        }
        function M(e3) {
          var t3 = e3.types;
          return !t3 || Array.prototype.some.call(t3, function(e4) {
            return e4 == "text/plain" || e4 == "Text";
          });
        }
        function _(e3) {
          var t3 = ["copy", "copymove", "all", "uninitialized"], n3 = ["move", "copymove", "linkmove", "all", "uninitialized"], r2 = s.isMac ? e3.altKey : e3.ctrlKey, i2 = "uninitialized";
          try {
            i2 = e3.dataTransfer.effectAllowed.toLowerCase();
          } catch (e4) {
          }
          var o2 = "none";
          return r2 && t3.indexOf(i2) >= 0 ? o2 = "copy" : n3.indexOf(i2) >= 0 ? o2 = "move" : t3.indexOf(i2) >= 0 && (o2 = "copy"), o2;
        }
        var t2 = e2.editor, n2 = r.createElement("div");
        n2.style.cssText = "top:-100px;position:absolute;z-index:2147483647;opacity:0.5", n2.textContent = "\xA0";
        var f2 = ["dragWait", "dragWaitEnd", "startDrag", "dragReadyEnd", "onMouseDrag"];
        f2.forEach(function(t3) {
          e2[t3] = this[t3];
        }, this), t2.on("mousedown", this.onMouseDown.bind(e2));
        var c = t2.container, h, p, d, v, m, g, y = 0, b, w, E, S, x;
        this.onDragStart = function(e3) {
          if (this.cancelDrag || !c.draggable) {
            var r2 = this;
            return setTimeout(function() {
              r2.startSelect(), r2.captureMouse(e3);
            }, 0), e3.preventDefault();
          }
          m = t2.getSelectionRange();
          var i2 = e3.dataTransfer;
          i2.effectAllowed = t2.getReadOnly() ? "copy" : "copyMove", t2.container.appendChild(n2), i2.setDragImage && i2.setDragImage(n2, 0, 0), setTimeout(function() {
            t2.container.removeChild(n2);
          }), i2.clearData(), i2.setData("Text", t2.session.getTextRange()), w = true, this.setState("drag");
        }, this.onDragEnd = function(e3) {
          c.draggable = false, w = false, this.setState(null);
          if (!t2.getReadOnly()) {
            var n3 = e3.dataTransfer.dropEffect;
            !b && n3 == "move" && t2.session.remove(t2.getSelectionRange()), t2.$resetCursorStyle();
          }
          this.editor.unsetStyle("ace_dragging"), this.editor.renderer.setCursorStyle("");
        }, this.onDragEnter = function(e3) {
          if (t2.getReadOnly() || !M(e3.dataTransfer))
            return;
          return p = e3.clientX, d = e3.clientY, h || k(), y++, e3.dataTransfer.dropEffect = b = _(e3), i.preventDefault(e3);
        }, this.onDragOver = function(e3) {
          if (t2.getReadOnly() || !M(e3.dataTransfer))
            return;
          return p = e3.clientX, d = e3.clientY, h || (k(), y++), A !== null && (A = null), e3.dataTransfer.dropEffect = b = _(e3), i.preventDefault(e3);
        }, this.onDragLeave = function(e3) {
          y--;
          if (y <= 0 && h)
            return L(), b = null, i.preventDefault(e3);
        }, this.onDrop = function(e3) {
          if (!g)
            return;
          var n3 = e3.dataTransfer;
          if (w)
            switch (b) {
              case "move":
                m.contains(g.row, g.column) ? m = { start: g, end: g } : m = t2.moveText(m, g);
                break;
              case "copy":
                m = t2.moveText(m, g, true);
            }
          else {
            var r2 = n3.getData("Text");
            m = { start: g, end: t2.session.insert(g, r2) }, t2.focus(), b = null;
          }
          return L(), i.preventDefault(e3);
        }, i.addListener(c, "dragstart", this.onDragStart.bind(e2), t2), i.addListener(c, "dragend", this.onDragEnd.bind(e2), t2), i.addListener(c, "dragenter", this.onDragEnter.bind(e2), t2), i.addListener(c, "dragover", this.onDragOver.bind(e2), t2), i.addListener(c, "dragleave", this.onDragLeave.bind(e2), t2), i.addListener(c, "drop", this.onDrop.bind(e2), t2);
        var A = null;
      }
      function l(e2, t2, n2, r2) {
        return Math.sqrt(Math.pow(n2 - e2, 2) + Math.pow(r2 - t2, 2));
      }
      var r = e("../lib/dom"), i = e("../lib/event"), s = e("../lib/useragent"), o = 200, u = 200, a = 5;
      (function() {
        this.dragWait = function() {
          var e2 = Date.now() - this.mousedownEvent.time;
          e2 > this.editor.getDragDelay() && this.startDrag();
        }, this.dragWaitEnd = function() {
          var e2 = this.editor.container;
          e2.draggable = false, this.startSelect(this.mousedownEvent.getDocumentPosition()), this.selectEnd();
        }, this.dragReadyEnd = function(e2) {
          this.editor.$resetCursorStyle(), this.editor.unsetStyle("ace_dragging"), this.editor.renderer.setCursorStyle(""), this.dragWaitEnd();
        }, this.startDrag = function() {
          this.cancelDrag = false;
          var e2 = this.editor, t2 = e2.container;
          t2.draggable = true, e2.renderer.$cursorLayer.setBlinking(false), e2.setStyle("ace_dragging");
          var n2 = s.isWin ? "default" : "move";
          e2.renderer.setCursorStyle(n2), this.setState("dragReady");
        }, this.onMouseDrag = function(e2) {
          var t2 = this.editor.container;
          if (s.isIE && this.state == "dragReady") {
            var n2 = l(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
            n2 > 3 && t2.dragDrop();
          }
          if (this.state === "dragWait") {
            var n2 = l(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
            n2 > 0 && (t2.draggable = false, this.startSelect(this.mousedownEvent.getDocumentPosition()));
          }
        }, this.onMouseDown = function(e2) {
          if (!this.$dragEnabled)
            return;
          this.mousedownEvent = e2;
          var t2 = this.editor, n2 = e2.inSelection(), r2 = e2.getButton(), i2 = e2.domEvent.detail || 1;
          if (i2 === 1 && r2 === 0 && n2) {
            if (e2.editor.inMultiSelectMode && (e2.getAccelKey() || e2.getShiftKey()))
              return;
            this.mousedownEvent.time = Date.now();
            var o2 = e2.domEvent.target || e2.domEvent.srcElement;
            "unselectable" in o2 && (o2.unselectable = "on");
            if (t2.getDragDelay()) {
              if (s.isWebKit) {
                this.cancelDrag = true;
                var u2 = t2.container;
                u2.draggable = true;
              }
              this.setState("dragWait");
            } else
              this.startDrag();
            this.captureMouse(e2, this.onMouseDrag.bind(this)), e2.defaultPrevented = true;
          }
        };
      }).call(f.prototype), t.DragdropHandler = f;
    }), ace.define("ace/mouse/touch_handler", ["require", "exports", "module", "ace/mouse/mouse_event", "ace/lib/event", "ace/lib/dom"], function(e, t, n) {
      "use strict";
      var r = e("./mouse_event").MouseEvent, i = e("../lib/event"), s = e("../lib/dom");
      t.addTouchListeners = function(e2, t2) {
        function b() {
          var e3 = window.navigator && window.navigator.clipboard, r2 = false, i2 = function() {
            var n3 = t2.getCopyText(), i3 = t2.session.getUndoManager().hasUndo();
            y.replaceChild(s.buildDom(r2 ? ["span", !n3 && ["span", { "class": "ace_mobile-button", action: "selectall" }, "Select All"], n3 && ["span", { "class": "ace_mobile-button", action: "copy" }, "Copy"], n3 && ["span", { "class": "ace_mobile-button", action: "cut" }, "Cut"], e3 && ["span", { "class": "ace_mobile-button", action: "paste" }, "Paste"], i3 && ["span", { "class": "ace_mobile-button", action: "undo" }, "Undo"], ["span", { "class": "ace_mobile-button", action: "find" }, "Find"], ["span", { "class": "ace_mobile-button", action: "openCommandPallete" }, "Pallete"]] : ["span"]), y.firstChild);
          }, o2 = function(n3) {
            var s2 = n3.target.getAttribute("action");
            if (s2 == "more" || !r2)
              return r2 = !r2, i2();
            if (s2 == "paste")
              e3.readText().then(function(e4) {
                t2.execCommand(s2, e4);
              });
            else if (s2) {
              if (s2 == "cut" || s2 == "copy")
                e3 ? e3.writeText(t2.getCopyText()) : document.execCommand("copy");
              t2.execCommand(s2);
            }
            y.firstChild.style.display = "none", r2 = false, s2 != "openCommandPallete" && t2.focus();
          };
          y = s.buildDom(["div", { "class": "ace_mobile-menu", ontouchstart: function(e4) {
            n2 = "menu", e4.stopPropagation(), e4.preventDefault(), t2.textInput.focus();
          }, ontouchend: function(e4) {
            e4.stopPropagation(), e4.preventDefault(), o2(e4);
          }, onclick: o2 }, ["span"], ["span", { "class": "ace_mobile-button", action: "more" }, "..."]], t2.container);
        }
        function w() {
          y || b();
          var e3 = t2.selection.cursor, n3 = t2.renderer.textToScreenCoordinates(e3.row, e3.column), r2 = t2.renderer.textToScreenCoordinates(0, 0).pageX, i2 = t2.renderer.scrollLeft, s2 = t2.container.getBoundingClientRect();
          y.style.top = n3.pageY - s2.top - 3 + "px", n3.pageX - s2.left < s2.width - 70 ? (y.style.left = "", y.style.right = "10px") : (y.style.right = "", y.style.left = r2 + i2 - s2.left + "px"), y.style.display = "", y.firstChild.style.display = "none", t2.on("input", E);
        }
        function E(e3) {
          y && (y.style.display = "none"), t2.off("input", E);
        }
        function S() {
          l = null, clearTimeout(l);
          var e3 = t2.selection.getRange(), r2 = e3.contains(p.row, p.column);
          if (e3.isEmpty() || !r2)
            t2.selection.moveToPosition(p), t2.selection.selectWord();
          n2 = "wait", w();
        }
        function x() {
          l = null, clearTimeout(l), t2.selection.moveToPosition(p);
          var e3 = d >= 2 ? t2.selection.getLineRange(p.row) : t2.session.getBracketRange(p);
          e3 && !e3.isEmpty() ? t2.selection.setRange(e3) : t2.selection.selectWord(), n2 = "wait";
        }
        function T() {
          h += 60, c = setInterval(function() {
            h-- <= 0 && (clearInterval(c), c = null), Math.abs(v) < 0.01 && (v = 0), Math.abs(m) < 0.01 && (m = 0), h < 20 && (v = 0.9 * v), h < 20 && (m = 0.9 * m);
            var e3 = t2.session.getScrollTop();
            t2.renderer.scrollBy(10 * v, 10 * m), e3 == t2.session.getScrollTop() && (h = 0);
          }, 10);
        }
        var n2 = "scroll", o, u, a, f, l, c, h = 0, p, d = 0, v = 0, m = 0, g, y;
        i.addListener(e2, "contextmenu", function(e3) {
          if (!g)
            return;
          var n3 = t2.textInput.getElement();
          n3.focus();
        }, t2), i.addListener(e2, "touchstart", function(e3) {
          var i2 = e3.touches;
          if (l || i2.length > 1) {
            clearTimeout(l), l = null, a = -1, n2 = "zoom";
            return;
          }
          g = t2.$mouseHandler.isMousePressed = true;
          var s2 = t2.renderer.layerConfig.lineHeight, c2 = t2.renderer.layerConfig.lineHeight, y2 = e3.timeStamp;
          f = y2;
          var b2 = i2[0], w2 = b2.clientX, E2 = b2.clientY;
          Math.abs(o - w2) + Math.abs(u - E2) > s2 && (a = -1), o = e3.clientX = w2, u = e3.clientY = E2, v = m = 0;
          var T2 = new r(e3, t2);
          p = T2.getDocumentPosition();
          if (y2 - a < 500 && i2.length == 1 && !h)
            d++, e3.preventDefault(), e3.button = 0, x();
          else {
            d = 0;
            var N = t2.selection.cursor, C = t2.selection.isEmpty() ? N : t2.selection.anchor, k = t2.renderer.$cursorLayer.getPixelPosition(N, true), L = t2.renderer.$cursorLayer.getPixelPosition(C, true), A = t2.renderer.scroller.getBoundingClientRect(), O = t2.renderer.layerConfig.offset, M = t2.renderer.scrollLeft, _ = function(e4, t3) {
              return e4 /= c2, t3 = t3 / s2 - 0.75, e4 * e4 + t3 * t3;
            };
            if (e3.clientX < A.left) {
              n2 = "zoom";
              return;
            }
            var D = _(e3.clientX - A.left - k.left + M, e3.clientY - A.top - k.top + O), P = _(e3.clientX - A.left - L.left + M, e3.clientY - A.top - L.top + O);
            D < 3.5 && P < 3.5 && (n2 = D > P ? "cursor" : "anchor"), P < 3.5 ? n2 = "anchor" : D < 3.5 ? n2 = "cursor" : n2 = "scroll", l = setTimeout(S, 450);
          }
          a = y2;
        }, t2), i.addListener(e2, "touchend", function(e3) {
          g = t2.$mouseHandler.isMousePressed = false, c && clearInterval(c), n2 == "zoom" ? (n2 = "", h = 0) : l ? (t2.selection.moveToPosition(p), h = 0, w()) : n2 == "scroll" ? (T(), E()) : w(), clearTimeout(l), l = null;
        }, t2), i.addListener(e2, "touchmove", function(e3) {
          l && (clearTimeout(l), l = null);
          var i2 = e3.touches;
          if (i2.length > 1 || n2 == "zoom")
            return;
          var s2 = i2[0], a2 = o - s2.clientX, c2 = u - s2.clientY;
          if (n2 == "wait") {
            if (!(a2 * a2 + c2 * c2 > 4))
              return e3.preventDefault();
            n2 = "cursor";
          }
          o = s2.clientX, u = s2.clientY, e3.clientX = s2.clientX, e3.clientY = s2.clientY;
          var h2 = e3.timeStamp, p2 = h2 - f;
          f = h2;
          if (n2 == "scroll") {
            var d2 = new r(e3, t2);
            d2.speed = 1, d2.wheelX = a2, d2.wheelY = c2, 10 * Math.abs(a2) < Math.abs(c2) && (a2 = 0), 10 * Math.abs(c2) < Math.abs(a2) && (c2 = 0), p2 != 0 && (v = a2 / p2, m = c2 / p2), t2._emit("mousewheel", d2), d2.propagationStopped || (v = m = 0);
          } else {
            var g2 = new r(e3, t2), y2 = g2.getDocumentPosition();
            n2 == "cursor" ? t2.selection.moveCursorToPosition(y2) : n2 == "anchor" && t2.selection.setSelectionAnchor(y2.row, y2.column), t2.renderer.scrollCursorIntoView(y2), e3.preventDefault();
          }
        }, t2);
      };
    }), ace.define("ace/mouse/mouse_handler", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/mouse/default_handlers", "ace/mouse/default_gutter_handler", "ace/mouse/mouse_event", "ace/mouse/dragdrop_handler", "ace/mouse/touch_handler", "ace/config"], function(e, t, n) {
      "use strict";
      var r = e("../lib/event"), i = e("../lib/useragent"), s = e("./default_handlers").DefaultHandlers, o = e("./default_gutter_handler").GutterHandler, u = e("./mouse_event").MouseEvent, a = e("./dragdrop_handler").DragdropHandler, f = e("./touch_handler").addTouchListeners, l = e("../config"), c = function(e2) {
        var t2 = this;
        this.editor = e2, new s(this), new o(this), new a(this);
        var n2 = function(t3) {
          var n3 = !document.hasFocus || !document.hasFocus() || !e2.isFocused() && document.activeElement == (e2.textInput && e2.textInput.getElement());
          n3 && window.focus(), e2.focus(), setTimeout(function() {
            e2.isFocused() || e2.focus();
          });
        }, u2 = e2.renderer.getMouseEventTarget();
        r.addListener(u2, "click", this.onMouseEvent.bind(this, "click"), e2), r.addListener(u2, "mousemove", this.onMouseMove.bind(this, "mousemove"), e2), r.addMultiMouseDownListener([u2, e2.renderer.scrollBarV && e2.renderer.scrollBarV.inner, e2.renderer.scrollBarH && e2.renderer.scrollBarH.inner, e2.textInput && e2.textInput.getElement()].filter(Boolean), [400, 300, 250], this, "onMouseEvent", e2), r.addMouseWheelListener(e2.container, this.onMouseWheel.bind(this, "mousewheel"), e2), f(e2.container, e2);
        var l2 = e2.renderer.$gutter;
        r.addListener(l2, "mousedown", this.onMouseEvent.bind(this, "guttermousedown"), e2), r.addListener(l2, "click", this.onMouseEvent.bind(this, "gutterclick"), e2), r.addListener(l2, "dblclick", this.onMouseEvent.bind(this, "gutterdblclick"), e2), r.addListener(l2, "mousemove", this.onMouseEvent.bind(this, "guttermousemove"), e2), r.addListener(u2, "mousedown", n2, e2), r.addListener(l2, "mousedown", n2, e2), i.isIE && e2.renderer.scrollBarV && (r.addListener(e2.renderer.scrollBarV.element, "mousedown", n2, e2), r.addListener(e2.renderer.scrollBarH.element, "mousedown", n2, e2)), e2.on("mousemove", function(n3) {
          if (t2.state || t2.$dragDelay || !t2.$dragEnabled)
            return;
          var r2 = e2.renderer.screenToTextCoordinates(n3.x, n3.y), i2 = e2.session.selection.getRange(), s2 = e2.renderer;
          !i2.isEmpty() && i2.insideStart(r2.row, r2.column) ? s2.setCursorStyle("default") : s2.setCursorStyle("");
        }, e2);
      };
      (function() {
        this.onMouseEvent = function(e2, t2) {
          if (!this.editor.session)
            return;
          this.editor._emit(e2, new u(t2, this.editor));
        }, this.onMouseMove = function(e2, t2) {
          var n2 = this.editor._eventRegistry && this.editor._eventRegistry.mousemove;
          if (!n2 || !n2.length)
            return;
          this.editor._emit(e2, new u(t2, this.editor));
        }, this.onMouseWheel = function(e2, t2) {
          var n2 = new u(t2, this.editor);
          n2.speed = this.$scrollSpeed * 2, n2.wheelX = t2.wheelX, n2.wheelY = t2.wheelY, this.editor._emit(e2, n2);
        }, this.setState = function(e2) {
          this.state = e2;
        }, this.captureMouse = function(e2, t2) {
          this.x = e2.x, this.y = e2.y, this.isMousePressed = true;
          var n2 = this.editor, s2 = this.editor.renderer;
          s2.$isMousePressed = true;
          var o2 = this, a2 = function(e3) {
            if (!e3)
              return;
            if (i.isWebKit && !e3.which && o2.releaseMouse)
              return o2.releaseMouse();
            o2.x = e3.clientX, o2.y = e3.clientY, t2 && t2(e3), o2.mouseEvent = new u(e3, o2.editor), o2.$mouseMoved = true;
          }, f2 = function(e3) {
            n2.off("beforeEndOperation", c2), clearInterval(h), n2.session && l2(), o2[o2.state + "End"] && o2[o2.state + "End"](e3), o2.state = "", o2.isMousePressed = s2.$isMousePressed = false, s2.$keepTextAreaAtCursor && s2.$moveTextAreaToCursor(), o2.$onCaptureMouseMove = o2.releaseMouse = null, e3 && o2.onMouseEvent("mouseup", e3), n2.endOperation();
          }, l2 = function() {
            o2[o2.state] && o2[o2.state](), o2.$mouseMoved = false;
          };
          if (i.isOldIE && e2.domEvent.type == "dblclick")
            return setTimeout(function() {
              f2(e2);
            });
          var c2 = function(e3) {
            if (!o2.releaseMouse)
              return;
            n2.curOp.command.name && n2.curOp.selectionChanged && (o2[o2.state + "End"] && o2[o2.state + "End"](), o2.state = "", o2.releaseMouse());
          };
          n2.on("beforeEndOperation", c2), n2.startOperation({ command: { name: "mouse" } }), o2.$onCaptureMouseMove = a2, o2.releaseMouse = r.capture(this.editor.container, a2, f2);
          var h = setInterval(l2, 20);
        }, this.releaseMouse = null, this.cancelContextMenu = function() {
          var e2 = function(t2) {
            if (t2 && t2.domEvent && t2.domEvent.type != "contextmenu")
              return;
            this.editor.off("nativecontextmenu", e2), t2 && t2.domEvent && r.stopEvent(t2.domEvent);
          }.bind(this);
          setTimeout(e2, 10), this.editor.on("nativecontextmenu", e2);
        }, this.destroy = function() {
          this.releaseMouse && this.releaseMouse();
        };
      }).call(c.prototype), l.defineOptions(c.prototype, "mouseHandler", { scrollSpeed: { initialValue: 2 }, dragDelay: { initialValue: i.isMac ? 150 : 0 }, dragEnabled: { initialValue: true }, focusTimeout: { initialValue: 0 }, tooltipFollowsMouse: { initialValue: true } }), t.MouseHandler = c;
    }), ace.define("ace/mouse/fold_handler", ["require", "exports", "module", "ace/lib/dom"], function(e, t, n) {
      "use strict";
      function i(e2) {
        e2.on("click", function(t2) {
          var n2 = t2.getDocumentPosition(), i2 = e2.session, s = i2.getFoldAt(n2.row, n2.column, 1);
          s && (t2.getAccelKey() ? i2.removeFold(s) : i2.expandFold(s), t2.stop());
          var o = t2.domEvent && t2.domEvent.target;
          o && r.hasCssClass(o, "ace_inline_button") && r.hasCssClass(o, "ace_toggle_wrap") && (i2.setOption("wrap", !i2.getUseWrapMode()), e2.renderer.scrollCursorIntoView());
        }), e2.on("gutterclick", function(t2) {
          var n2 = e2.renderer.$gutterLayer.getRegion(t2);
          if (n2 == "foldWidgets") {
            var r2 = t2.getDocumentPosition().row, i2 = e2.session;
            i2.foldWidgets && i2.foldWidgets[r2] && e2.session.onFoldWidgetClick(r2, t2), e2.isFocused() || e2.focus(), t2.stop();
          }
        }), e2.on("gutterdblclick", function(t2) {
          var n2 = e2.renderer.$gutterLayer.getRegion(t2);
          if (n2 == "foldWidgets") {
            var r2 = t2.getDocumentPosition().row, i2 = e2.session, s = i2.getParentFoldRangeData(r2, true), o = s.range || s.firstRange;
            if (o) {
              r2 = o.start.row;
              var u = i2.getFoldAt(r2, i2.getLine(r2).length, 1);
              u ? i2.removeFold(u) : (i2.addFold("...", o), e2.renderer.scrollCursorIntoView({ row: o.start.row, column: 0 }));
            }
            t2.stop();
          }
        });
      }
      var r = e("../lib/dom");
      t.FoldHandler = i;
    }), ace.define("ace/keyboard/keybinding", ["require", "exports", "module", "ace/lib/keys", "ace/lib/event"], function(e, t, n) {
      "use strict";
      var r = e("../lib/keys"), i = e("../lib/event"), s = function(e2) {
        this.$editor = e2, this.$data = { editor: e2 }, this.$handlers = [], this.setDefaultHandler(e2.commands);
      };
      (function() {
        this.setDefaultHandler = function(e2) {
          this.removeKeyboardHandler(this.$defaultHandler), this.$defaultHandler = e2, this.addKeyboardHandler(e2, 0);
        }, this.setKeyboardHandler = function(e2) {
          var t2 = this.$handlers;
          if (t2[t2.length - 1] == e2)
            return;
          while (t2[t2.length - 1] && t2[t2.length - 1] != this.$defaultHandler)
            this.removeKeyboardHandler(t2[t2.length - 1]);
          this.addKeyboardHandler(e2, 1);
        }, this.addKeyboardHandler = function(e2, t2) {
          if (!e2)
            return;
          typeof e2 == "function" && !e2.handleKeyboard && (e2.handleKeyboard = e2);
          var n2 = this.$handlers.indexOf(e2);
          n2 != -1 && this.$handlers.splice(n2, 1), t2 == void 0 ? this.$handlers.push(e2) : this.$handlers.splice(t2, 0, e2), n2 == -1 && e2.attach && e2.attach(this.$editor);
        }, this.removeKeyboardHandler = function(e2) {
          var t2 = this.$handlers.indexOf(e2);
          return t2 == -1 ? false : (this.$handlers.splice(t2, 1), e2.detach && e2.detach(this.$editor), true);
        }, this.getKeyboardHandler = function() {
          return this.$handlers[this.$handlers.length - 1];
        }, this.getStatusText = function() {
          var e2 = this.$data, t2 = e2.editor;
          return this.$handlers.map(function(n2) {
            return n2.getStatusText && n2.getStatusText(t2, e2) || "";
          }).filter(Boolean).join(" ");
        }, this.$callKeyboardHandlers = function(e2, t2, n2, r2) {
          var s2, o = false, u = this.$editor.commands;
          for (var a = this.$handlers.length; a--; ) {
            s2 = this.$handlers[a].handleKeyboard(this.$data, e2, t2, n2, r2);
            if (!s2 || !s2.command)
              continue;
            s2.command == "null" ? o = true : o = u.exec(s2.command, this.$editor, s2.args, r2), o && r2 && e2 != -1 && s2.passEvent != 1 && s2.command.passEvent != 1 && i.stopEvent(r2);
            if (o)
              break;
          }
          return !o && e2 == -1 && (s2 = { command: "insertstring" }, o = u.exec("insertstring", this.$editor, t2)), o && this.$editor._signal && this.$editor._signal("keyboardActivity", s2), o;
        }, this.onCommandKey = function(e2, t2, n2) {
          var i2 = r.keyCodeToString(n2);
          return this.$callKeyboardHandlers(t2, i2, n2, e2);
        }, this.onTextInput = function(e2) {
          return this.$callKeyboardHandlers(-1, e2);
        };
      }).call(s.prototype), t.KeyBinding = s;
    }), ace.define("ace/lib/bidiutil", ["require", "exports", "module"], function(e, t, n) {
      "use strict";
      function F(e2, t2, n2, r2) {
        var i2 = s ? d : p, c2 = null, h2 = null, v2 = null, m2 = 0, g2 = null, y2 = null, b2 = -1, w2 = null, E2 = null, T2 = [];
        if (!r2)
          for (w2 = 0, r2 = []; w2 < n2; w2++)
            r2[w2] = R(e2[w2]);
        o = s, u = false, a = false, f = false, l = false;
        for (E2 = 0; E2 < n2; E2++) {
          c2 = m2, T2[E2] = h2 = q(e2, r2, T2, E2), m2 = i2[c2][h2], g2 = m2 & 240, m2 &= 15, t2[E2] = v2 = i2[m2][5];
          if (g2 > 0)
            if (g2 == 16) {
              for (w2 = b2; w2 < E2; w2++)
                t2[w2] = 1;
              b2 = -1;
            } else
              b2 = -1;
          y2 = i2[m2][6];
          if (y2)
            b2 == -1 && (b2 = E2);
          else if (b2 > -1) {
            for (w2 = b2; w2 < E2; w2++)
              t2[w2] = v2;
            b2 = -1;
          }
          r2[E2] == S && (t2[E2] = 0), o |= v2;
        }
        if (l) {
          for (w2 = 0; w2 < n2; w2++)
            if (r2[w2] == x) {
              t2[w2] = s;
              for (var C2 = w2 - 1; C2 >= 0; C2--) {
                if (r2[C2] != N)
                  break;
                t2[C2] = s;
              }
            }
        }
      }
      function I(e2, t2, n2) {
        if (o < e2)
          return;
        if (e2 == 1 && s == m && !f) {
          n2.reverse();
          return;
        }
        var r2 = n2.length, i2 = 0, u2, a2, l2, c2;
        while (i2 < r2) {
          if (t2[i2] >= e2) {
            u2 = i2 + 1;
            while (u2 < r2 && t2[u2] >= e2)
              u2++;
            for (a2 = i2, l2 = u2 - 1; a2 < l2; a2++, l2--)
              c2 = n2[a2], n2[a2] = n2[l2], n2[l2] = c2;
            i2 = u2;
          }
          i2++;
        }
      }
      function q(e2, t2, n2, r2) {
        var i2 = t2[r2], o2, c2, h2, p2;
        switch (i2) {
          case g:
          case y:
            u = false;
          case E:
          case w:
            return i2;
          case b:
            return u ? w : b;
          case T:
            return u = true, a = true, y;
          case N:
            return E;
          case C:
            if (r2 < 1 || r2 + 1 >= t2.length || (o2 = n2[r2 - 1]) != b && o2 != w || (c2 = t2[r2 + 1]) != b && c2 != w)
              return E;
            return u && (c2 = w), c2 == o2 ? c2 : E;
          case k:
            o2 = r2 > 0 ? n2[r2 - 1] : S;
            if (o2 == b && r2 + 1 < t2.length && t2[r2 + 1] == b)
              return b;
            return E;
          case L:
            if (r2 > 0 && n2[r2 - 1] == b)
              return b;
            if (u)
              return E;
            p2 = r2 + 1, h2 = t2.length;
            while (p2 < h2 && t2[p2] == L)
              p2++;
            if (p2 < h2 && t2[p2] == b)
              return b;
            return E;
          case A:
            h2 = t2.length, p2 = r2 + 1;
            while (p2 < h2 && t2[p2] == A)
              p2++;
            if (p2 < h2) {
              var d2 = e2[r2], v2 = d2 >= 1425 && d2 <= 2303 || d2 == 64286;
              o2 = t2[p2];
              if (v2 && (o2 == y || o2 == T))
                return y;
            }
            if (r2 < 1 || (o2 = t2[r2 - 1]) == S)
              return E;
            return n2[r2 - 1];
          case S:
            return u = false, f = true, s;
          case x:
            return l = true, E;
          case O:
          case M:
          case D:
          case P:
          case _:
            u = false;
          case H:
            return E;
        }
      }
      function R(e2) {
        var t2 = e2.charCodeAt(0), n2 = t2 >> 8;
        return n2 == 0 ? t2 > 191 ? g : B[t2] : n2 == 5 ? /[\u0591-\u05f4]/.test(e2) ? y : g : n2 == 6 ? /[\u0610-\u061a\u064b-\u065f\u06d6-\u06e4\u06e7-\u06ed]/.test(e2) ? A : /[\u0660-\u0669\u066b-\u066c]/.test(e2) ? w : t2 == 1642 ? L : /[\u06f0-\u06f9]/.test(e2) ? b : T : n2 == 32 && t2 <= 8287 ? j[t2 & 255] : n2 == 254 ? t2 >= 65136 ? T : E : E;
      }
      function U(e2) {
        return e2 >= "\u064B" && e2 <= "\u0655";
      }
      var r = ["\u0621", "\u0641"], i = ["\u063A", "\u064A"], s = 0, o = 0, u = false, a = false, f = false, l = false, c = false, h = false, p = [[0, 3, 0, 1, 0, 0, 0], [0, 3, 0, 1, 2, 2, 0], [0, 3, 0, 17, 2, 0, 1], [0, 3, 5, 5, 4, 1, 0], [0, 3, 21, 21, 4, 0, 1], [0, 3, 5, 5, 4, 2, 0]], d = [[2, 0, 1, 1, 0, 1, 0], [2, 0, 1, 1, 0, 2, 0], [2, 0, 2, 1, 3, 2, 0], [2, 0, 2, 33, 3, 1, 1]], v = 0, m = 1, g = 0, y = 1, b = 2, w = 3, E = 4, S = 5, x = 6, T = 7, N = 8, C = 9, k = 10, L = 11, A = 12, O = 13, M = 14, _ = 15, D = 16, P = 17, H = 18, B = [H, H, H, H, H, H, H, H, H, x, S, x, N, S, H, H, H, H, H, H, H, H, H, H, H, H, H, H, S, S, S, x, N, E, E, L, L, L, E, E, E, E, E, k, C, k, C, C, b, b, b, b, b, b, b, b, b, b, C, E, E, E, E, E, E, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, E, E, E, E, E, E, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, E, E, E, E, H, H, H, H, H, H, S, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, C, E, L, L, L, L, E, E, E, E, g, E, E, H, E, E, L, L, b, b, E, g, E, E, E, b, g, E, E, E, E, E], j = [N, N, N, N, N, N, N, N, N, N, N, H, H, H, g, y, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, N, S, O, M, _, D, P, C, L, L, L, L, L, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, C, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, N];
      t.L = g, t.R = y, t.EN = b, t.ON_R = 3, t.AN = 4, t.R_H = 5, t.B = 6, t.RLE = 7, t.DOT = "\xB7", t.doBidiReorder = function(e2, n2, r2) {
        if (e2.length < 2)
          return {};
        var i2 = e2.split(""), o2 = new Array(i2.length), u2 = new Array(i2.length), a2 = [];
        s = r2 ? m : v, F(i2, a2, i2.length, n2);
        for (var f2 = 0; f2 < o2.length; o2[f2] = f2, f2++)
          ;
        I(2, a2, o2), I(1, a2, o2);
        for (var f2 = 0; f2 < o2.length - 1; f2++)
          n2[f2] === w ? a2[f2] = t.AN : a2[f2] === y && (n2[f2] > T && n2[f2] < O || n2[f2] === E || n2[f2] === H) ? a2[f2] = t.ON_R : f2 > 0 && i2[f2 - 1] === "\u0644" && /\u0622|\u0623|\u0625|\u0627/.test(i2[f2]) && (a2[f2 - 1] = a2[f2] = t.R_H, f2++);
        i2[i2.length - 1] === t.DOT && (a2[i2.length - 1] = t.B), i2[0] === "\u202B" && (a2[0] = t.RLE);
        for (var f2 = 0; f2 < o2.length; f2++)
          u2[f2] = a2[o2[f2]];
        return { logicalFromVisual: o2, bidiLevels: u2 };
      }, t.hasBidiCharacters = function(e2, t2) {
        var n2 = false;
        for (var r2 = 0; r2 < e2.length; r2++)
          t2[r2] = R(e2.charAt(r2)), !n2 && (t2[r2] == y || t2[r2] == T || t2[r2] == w) && (n2 = true);
        return n2;
      }, t.getVisualFromLogicalIdx = function(e2, t2) {
        for (var n2 = 0; n2 < t2.logicalFromVisual.length; n2++)
          if (t2.logicalFromVisual[n2] == e2)
            return n2;
        return 0;
      };
    }), ace.define("ace/bidihandler", ["require", "exports", "module", "ace/lib/bidiutil", "ace/lib/lang"], function(e, t, n) {
      "use strict";
      var r = e("./lib/bidiutil"), i = e("./lib/lang"), s = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\u202B]/, o = function(e2) {
        this.session = e2, this.bidiMap = {}, this.currentRow = null, this.bidiUtil = r, this.charWidths = [], this.EOL = "\xAC", this.showInvisibles = true, this.isRtlDir = false, this.$isRtl = false, this.line = "", this.wrapIndent = 0, this.EOF = "\xB6", this.RLE = "\u202B", this.contentWidth = 0, this.fontMetrics = null, this.rtlLineOffset = 0, this.wrapOffset = 0, this.isMoveLeftOperation = false, this.seenBidi = s.test(e2.getValue());
      };
      (function() {
        this.isBidiRow = function(e2, t2, n2) {
          return this.seenBidi ? (e2 !== this.currentRow && (this.currentRow = e2, this.updateRowLine(t2, n2), this.updateBidiMap()), this.bidiMap.bidiLevels) : false;
        }, this.onChange = function(e2) {
          this.seenBidi ? this.currentRow = null : e2.action == "insert" && s.test(e2.lines.join("\n")) && (this.seenBidi = true, this.currentRow = null);
        }, this.getDocumentRow = function() {
          var e2 = 0, t2 = this.session.$screenRowCache;
          if (t2.length) {
            var n2 = this.session.$getRowCacheIndex(t2, this.currentRow);
            n2 >= 0 && (e2 = this.session.$docRowCache[n2]);
          }
          return e2;
        }, this.getSplitIndex = function() {
          var e2 = 0, t2 = this.session.$screenRowCache;
          if (t2.length) {
            var n2, r2 = this.session.$getRowCacheIndex(t2, this.currentRow);
            while (this.currentRow - e2 > 0) {
              n2 = this.session.$getRowCacheIndex(t2, this.currentRow - e2 - 1);
              if (n2 !== r2)
                break;
              r2 = n2, e2++;
            }
          } else
            e2 = this.currentRow;
          return e2;
        }, this.updateRowLine = function(e2, t2) {
          e2 === void 0 && (e2 = this.getDocumentRow());
          var n2 = e2 === this.session.getLength() - 1, s2 = n2 ? this.EOF : this.EOL;
          this.wrapIndent = 0, this.line = this.session.getLine(e2), this.isRtlDir = this.$isRtl || this.line.charAt(0) === this.RLE;
          if (this.session.$useWrapMode) {
            var o2 = this.session.$wrapData[e2];
            o2 && (t2 === void 0 && (t2 = this.getSplitIndex()), t2 > 0 && o2.length ? (this.wrapIndent = o2.indent, this.wrapOffset = this.wrapIndent * this.charWidths[r.L], this.line = t2 < o2.length ? this.line.substring(o2[t2 - 1], o2[t2]) : this.line.substring(o2[o2.length - 1])) : this.line = this.line.substring(0, o2[t2]), t2 == o2.length && (this.line += this.showInvisibles ? s2 : r.DOT));
          } else
            this.line += this.showInvisibles ? s2 : r.DOT;
          var u = this.session, a = 0, f;
          this.line = this.line.replace(/\t|[\u1100-\u2029, \u202F-\uFFE6]/g, function(e3, t3) {
            return e3 === "	" || u.isFullWidth(e3.charCodeAt(0)) ? (f = e3 === "	" ? u.getScreenTabSize(t3 + a) : 2, a += f - 1, i.stringRepeat(r.DOT, f)) : e3;
          }), this.isRtlDir && (this.fontMetrics.$main.textContent = this.line.charAt(this.line.length - 1) == r.DOT ? this.line.substr(0, this.line.length - 1) : this.line, this.rtlLineOffset = this.contentWidth - this.fontMetrics.$main.getBoundingClientRect().width);
        }, this.updateBidiMap = function() {
          var e2 = [];
          r.hasBidiCharacters(this.line, e2) || this.isRtlDir ? this.bidiMap = r.doBidiReorder(this.line, e2, this.isRtlDir) : this.bidiMap = {};
        }, this.markAsDirty = function() {
          this.currentRow = null;
        }, this.updateCharacterWidths = function(e2) {
          if (this.characterWidth === e2.$characterSize.width)
            return;
          this.fontMetrics = e2;
          var t2 = this.characterWidth = e2.$characterSize.width, n2 = e2.$measureCharWidth("\u05D4");
          this.charWidths[r.L] = this.charWidths[r.EN] = this.charWidths[r.ON_R] = t2, this.charWidths[r.R] = this.charWidths[r.AN] = n2, this.charWidths[r.R_H] = n2 * 0.45, this.charWidths[r.B] = this.charWidths[r.RLE] = 0, this.currentRow = null;
        }, this.setShowInvisibles = function(e2) {
          this.showInvisibles = e2, this.currentRow = null;
        }, this.setEolChar = function(e2) {
          this.EOL = e2;
        }, this.setContentWidth = function(e2) {
          this.contentWidth = e2;
        }, this.isRtlLine = function(e2) {
          return this.$isRtl ? true : e2 != void 0 ? this.session.getLine(e2).charAt(0) == this.RLE : this.isRtlDir;
        }, this.setRtlDirection = function(e2, t2) {
          var n2 = e2.getCursorPosition();
          for (var r2 = e2.selection.getSelectionAnchor().row; r2 <= n2.row; r2++)
            !t2 && e2.session.getLine(r2).charAt(0) === e2.session.$bidiHandler.RLE ? e2.session.doc.removeInLine(r2, 0, 1) : t2 && e2.session.getLine(r2).charAt(0) !== e2.session.$bidiHandler.RLE && e2.session.doc.insert({ column: 0, row: r2 }, e2.session.$bidiHandler.RLE);
        }, this.getPosLeft = function(e2) {
          e2 -= this.wrapIndent;
          var t2 = this.line.charAt(0) === this.RLE ? 1 : 0, n2 = e2 > t2 ? this.session.getOverwrite() ? e2 : e2 - 1 : t2, i2 = r.getVisualFromLogicalIdx(n2, this.bidiMap), s2 = this.bidiMap.bidiLevels, o2 = 0;
          !this.session.getOverwrite() && e2 <= t2 && s2[i2] % 2 !== 0 && i2++;
          for (var u = 0; u < i2; u++)
            o2 += this.charWidths[s2[u]];
          return !this.session.getOverwrite() && e2 > t2 && s2[i2] % 2 === 0 && (o2 += this.charWidths[s2[i2]]), this.wrapIndent && (o2 += this.isRtlDir ? -1 * this.wrapOffset : this.wrapOffset), this.isRtlDir && (o2 += this.rtlLineOffset), o2;
        }, this.getSelections = function(e2, t2) {
          var n2 = this.bidiMap, r2 = n2.bidiLevels, i2, s2 = [], o2 = 0, u = Math.min(e2, t2) - this.wrapIndent, a = Math.max(e2, t2) - this.wrapIndent, f = false, l = false, c = 0;
          this.wrapIndent && (o2 += this.isRtlDir ? -1 * this.wrapOffset : this.wrapOffset);
          for (var h, p = 0; p < r2.length; p++)
            h = n2.logicalFromVisual[p], i2 = r2[p], f = h >= u && h < a, f && !l ? c = o2 : !f && l && s2.push({ left: c, width: o2 - c }), o2 += this.charWidths[i2], l = f;
          f && p === r2.length && s2.push({ left: c, width: o2 - c });
          if (this.isRtlDir)
            for (var d = 0; d < s2.length; d++)
              s2[d].left += this.rtlLineOffset;
          return s2;
        }, this.offsetToCol = function(e2) {
          this.isRtlDir && (e2 -= this.rtlLineOffset);
          var t2 = 0, e2 = Math.max(e2, 0), n2 = 0, r2 = 0, i2 = this.bidiMap.bidiLevels, s2 = this.charWidths[i2[r2]];
          this.wrapIndent && (e2 -= this.isRtlDir ? -1 * this.wrapOffset : this.wrapOffset);
          while (e2 > n2 + s2 / 2) {
            n2 += s2;
            if (r2 === i2.length - 1) {
              s2 = 0;
              break;
            }
            s2 = this.charWidths[i2[++r2]];
          }
          return r2 > 0 && i2[r2 - 1] % 2 !== 0 && i2[r2] % 2 === 0 ? (e2 < n2 && r2--, t2 = this.bidiMap.logicalFromVisual[r2]) : r2 > 0 && i2[r2 - 1] % 2 === 0 && i2[r2] % 2 !== 0 ? t2 = 1 + (e2 > n2 ? this.bidiMap.logicalFromVisual[r2] : this.bidiMap.logicalFromVisual[r2 - 1]) : this.isRtlDir && r2 === i2.length - 1 && s2 === 0 && i2[r2 - 1] % 2 === 0 || !this.isRtlDir && r2 === 0 && i2[r2] % 2 !== 0 ? t2 = 1 + this.bidiMap.logicalFromVisual[r2] : (r2 > 0 && i2[r2 - 1] % 2 !== 0 && s2 !== 0 && r2--, t2 = this.bidiMap.logicalFromVisual[r2]), t2 === 0 && this.isRtlDir && t2++, t2 + this.wrapIndent;
        };
      }).call(o.prototype), t.BidiHandler = o;
    }), ace.define("ace/selection", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/lib/event_emitter", "ace/range"], function(e, t, n) {
      "use strict";
      var r = e("./lib/oop"), i = e("./lib/lang"), s = e("./lib/event_emitter").EventEmitter, o = e("./range").Range, u = function(e2) {
        this.session = e2, this.doc = e2.getDocument(), this.clearSelection(), this.cursor = this.lead = this.doc.createAnchor(0, 0), this.anchor = this.doc.createAnchor(0, 0), this.$silent = false;
        var t2 = this;
        this.cursor.on("change", function(e3) {
          t2.$cursorChanged = true, t2.$silent || t2._emit("changeCursor"), !t2.$isEmpty && !t2.$silent && t2._emit("changeSelection"), !t2.$keepDesiredColumnOnChange && e3.old.column != e3.value.column && (t2.$desiredColumn = null);
        }), this.anchor.on("change", function() {
          t2.$anchorChanged = true, !t2.$isEmpty && !t2.$silent && t2._emit("changeSelection");
        });
      };
      (function() {
        r.implement(this, s), this.isEmpty = function() {
          return this.$isEmpty || this.anchor.row == this.lead.row && this.anchor.column == this.lead.column;
        }, this.isMultiLine = function() {
          return !this.$isEmpty && this.anchor.row != this.cursor.row;
        }, this.getCursor = function() {
          return this.lead.getPosition();
        }, this.setSelectionAnchor = function(e2, t2) {
          this.$isEmpty = false, this.anchor.setPosition(e2, t2);
        }, this.getAnchor = this.getSelectionAnchor = function() {
          return this.$isEmpty ? this.getSelectionLead() : this.anchor.getPosition();
        }, this.getSelectionLead = function() {
          return this.lead.getPosition();
        }, this.isBackwards = function() {
          var e2 = this.anchor, t2 = this.lead;
          return e2.row > t2.row || e2.row == t2.row && e2.column > t2.column;
        }, this.getRange = function() {
          var e2 = this.anchor, t2 = this.lead;
          return this.$isEmpty ? o.fromPoints(t2, t2) : this.isBackwards() ? o.fromPoints(t2, e2) : o.fromPoints(e2, t2);
        }, this.clearSelection = function() {
          this.$isEmpty || (this.$isEmpty = true, this._emit("changeSelection"));
        }, this.selectAll = function() {
          this.$setSelection(0, 0, Number.MAX_VALUE, Number.MAX_VALUE);
        }, this.setRange = this.setSelectionRange = function(e2, t2) {
          var n2 = t2 ? e2.end : e2.start, r2 = t2 ? e2.start : e2.end;
          this.$setSelection(n2.row, n2.column, r2.row, r2.column);
        }, this.$setSelection = function(e2, t2, n2, r2) {
          if (this.$silent)
            return;
          var i2 = this.$isEmpty, s2 = this.inMultiSelectMode;
          this.$silent = true, this.$cursorChanged = this.$anchorChanged = false, this.anchor.setPosition(e2, t2), this.cursor.setPosition(n2, r2), this.$isEmpty = !o.comparePoints(this.anchor, this.cursor), this.$silent = false, this.$cursorChanged && this._emit("changeCursor"), (this.$cursorChanged || this.$anchorChanged || i2 != this.$isEmpty || s2) && this._emit("changeSelection");
        }, this.$moveSelection = function(e2) {
          var t2 = this.lead;
          this.$isEmpty && this.setSelectionAnchor(t2.row, t2.column), e2.call(this);
        }, this.selectTo = function(e2, t2) {
          this.$moveSelection(function() {
            this.moveCursorTo(e2, t2);
          });
        }, this.selectToPosition = function(e2) {
          this.$moveSelection(function() {
            this.moveCursorToPosition(e2);
          });
        }, this.moveTo = function(e2, t2) {
          this.clearSelection(), this.moveCursorTo(e2, t2);
        }, this.moveToPosition = function(e2) {
          this.clearSelection(), this.moveCursorToPosition(e2);
        }, this.selectUp = function() {
          this.$moveSelection(this.moveCursorUp);
        }, this.selectDown = function() {
          this.$moveSelection(this.moveCursorDown);
        }, this.selectRight = function() {
          this.$moveSelection(this.moveCursorRight);
        }, this.selectLeft = function() {
          this.$moveSelection(this.moveCursorLeft);
        }, this.selectLineStart = function() {
          this.$moveSelection(this.moveCursorLineStart);
        }, this.selectLineEnd = function() {
          this.$moveSelection(this.moveCursorLineEnd);
        }, this.selectFileEnd = function() {
          this.$moveSelection(this.moveCursorFileEnd);
        }, this.selectFileStart = function() {
          this.$moveSelection(this.moveCursorFileStart);
        }, this.selectWordRight = function() {
          this.$moveSelection(this.moveCursorWordRight);
        }, this.selectWordLeft = function() {
          this.$moveSelection(this.moveCursorWordLeft);
        }, this.getWordRange = function(e2, t2) {
          if (typeof t2 == "undefined") {
            var n2 = e2 || this.lead;
            e2 = n2.row, t2 = n2.column;
          }
          return this.session.getWordRange(e2, t2);
        }, this.selectWord = function() {
          this.setSelectionRange(this.getWordRange());
        }, this.selectAWord = function() {
          var e2 = this.getCursor(), t2 = this.session.getAWordRange(e2.row, e2.column);
          this.setSelectionRange(t2);
        }, this.getLineRange = function(e2, t2) {
          var n2 = typeof e2 == "number" ? e2 : this.lead.row, r2, i2 = this.session.getFoldLine(n2);
          return i2 ? (n2 = i2.start.row, r2 = i2.end.row) : r2 = n2, t2 === true ? new o(n2, 0, r2, this.session.getLine(r2).length) : new o(n2, 0, r2 + 1, 0);
        }, this.selectLine = function() {
          this.setSelectionRange(this.getLineRange());
        }, this.moveCursorUp = function() {
          this.moveCursorBy(-1, 0);
        }, this.moveCursorDown = function() {
          this.moveCursorBy(1, 0);
        }, this.wouldMoveIntoSoftTab = function(e2, t2, n2) {
          var r2 = e2.column, i2 = e2.column + t2;
          return n2 < 0 && (r2 = e2.column - t2, i2 = e2.column), this.session.isTabStop(e2) && this.doc.getLine(e2.row).slice(r2, i2).split(" ").length - 1 == t2;
        }, this.moveCursorLeft = function() {
          var e2 = this.lead.getPosition(), t2;
          if (t2 = this.session.getFoldAt(e2.row, e2.column, -1))
            this.moveCursorTo(t2.start.row, t2.start.column);
          else if (e2.column === 0)
            e2.row > 0 && this.moveCursorTo(e2.row - 1, this.doc.getLine(e2.row - 1).length);
          else {
            var n2 = this.session.getTabSize();
            this.wouldMoveIntoSoftTab(e2, n2, -1) && !this.session.getNavigateWithinSoftTabs() ? this.moveCursorBy(0, -n2) : this.moveCursorBy(0, -1);
          }
        }, this.moveCursorRight = function() {
          var e2 = this.lead.getPosition(), t2;
          if (t2 = this.session.getFoldAt(e2.row, e2.column, 1))
            this.moveCursorTo(t2.end.row, t2.end.column);
          else if (this.lead.column == this.doc.getLine(this.lead.row).length)
            this.lead.row < this.doc.getLength() - 1 && this.moveCursorTo(this.lead.row + 1, 0);
          else {
            var n2 = this.session.getTabSize(), e2 = this.lead;
            this.wouldMoveIntoSoftTab(e2, n2, 1) && !this.session.getNavigateWithinSoftTabs() ? this.moveCursorBy(0, n2) : this.moveCursorBy(0, 1);
          }
        }, this.moveCursorLineStart = function() {
          var e2 = this.lead.row, t2 = this.lead.column, n2 = this.session.documentToScreenRow(e2, t2), r2 = this.session.screenToDocumentPosition(n2, 0), i2 = this.session.getDisplayLine(e2, null, r2.row, r2.column), s2 = i2.match(/^\s*/);
          s2[0].length != t2 && !this.session.$useEmacsStyleLineStart && (r2.column += s2[0].length), this.moveCursorToPosition(r2);
        }, this.moveCursorLineEnd = function() {
          var e2 = this.lead, t2 = this.session.getDocumentLastRowColumnPosition(e2.row, e2.column);
          if (this.lead.column == t2.column) {
            var n2 = this.session.getLine(t2.row);
            if (t2.column == n2.length) {
              var r2 = n2.search(/\s+$/);
              r2 > 0 && (t2.column = r2);
            }
          }
          this.moveCursorTo(t2.row, t2.column);
        }, this.moveCursorFileEnd = function() {
          var e2 = this.doc.getLength() - 1, t2 = this.doc.getLine(e2).length;
          this.moveCursorTo(e2, t2);
        }, this.moveCursorFileStart = function() {
          this.moveCursorTo(0, 0);
        }, this.moveCursorLongWordRight = function() {
          var e2 = this.lead.row, t2 = this.lead.column, n2 = this.doc.getLine(e2), r2 = n2.substring(t2);
          this.session.nonTokenRe.lastIndex = 0, this.session.tokenRe.lastIndex = 0;
          var i2 = this.session.getFoldAt(e2, t2, 1);
          if (i2) {
            this.moveCursorTo(i2.end.row, i2.end.column);
            return;
          }
          this.session.nonTokenRe.exec(r2) && (t2 += this.session.nonTokenRe.lastIndex, this.session.nonTokenRe.lastIndex = 0, r2 = n2.substring(t2));
          if (t2 >= n2.length) {
            this.moveCursorTo(e2, n2.length), this.moveCursorRight(), e2 < this.doc.getLength() - 1 && this.moveCursorWordRight();
            return;
          }
          this.session.tokenRe.exec(r2) && (t2 += this.session.tokenRe.lastIndex, this.session.tokenRe.lastIndex = 0), this.moveCursorTo(e2, t2);
        }, this.moveCursorLongWordLeft = function() {
          var e2 = this.lead.row, t2 = this.lead.column, n2;
          if (n2 = this.session.getFoldAt(e2, t2, -1)) {
            this.moveCursorTo(n2.start.row, n2.start.column);
            return;
          }
          var r2 = this.session.getFoldStringAt(e2, t2, -1);
          r2 == null && (r2 = this.doc.getLine(e2).substring(0, t2));
          var s2 = i.stringReverse(r2);
          this.session.nonTokenRe.lastIndex = 0, this.session.tokenRe.lastIndex = 0, this.session.nonTokenRe.exec(s2) && (t2 -= this.session.nonTokenRe.lastIndex, s2 = s2.slice(this.session.nonTokenRe.lastIndex), this.session.nonTokenRe.lastIndex = 0);
          if (t2 <= 0) {
            this.moveCursorTo(e2, 0), this.moveCursorLeft(), e2 > 0 && this.moveCursorWordLeft();
            return;
          }
          this.session.tokenRe.exec(s2) && (t2 -= this.session.tokenRe.lastIndex, this.session.tokenRe.lastIndex = 0), this.moveCursorTo(e2, t2);
        }, this.$shortWordEndIndex = function(e2) {
          var t2 = 0, n2, r2 = /\s/, i2 = this.session.tokenRe;
          i2.lastIndex = 0;
          if (this.session.tokenRe.exec(e2))
            t2 = this.session.tokenRe.lastIndex;
          else {
            while ((n2 = e2[t2]) && r2.test(n2))
              t2++;
            if (t2 < 1) {
              i2.lastIndex = 0;
              while ((n2 = e2[t2]) && !i2.test(n2)) {
                i2.lastIndex = 0, t2++;
                if (r2.test(n2)) {
                  if (t2 > 2) {
                    t2--;
                    break;
                  }
                  while ((n2 = e2[t2]) && r2.test(n2))
                    t2++;
                  if (t2 > 2)
                    break;
                }
              }
            }
          }
          return i2.lastIndex = 0, t2;
        }, this.moveCursorShortWordRight = function() {
          var e2 = this.lead.row, t2 = this.lead.column, n2 = this.doc.getLine(e2), r2 = n2.substring(t2), i2 = this.session.getFoldAt(e2, t2, 1);
          if (i2)
            return this.moveCursorTo(i2.end.row, i2.end.column);
          if (t2 == n2.length) {
            var s2 = this.doc.getLength();
            do
              e2++, r2 = this.doc.getLine(e2);
            while (e2 < s2 && /^\s*$/.test(r2));
            /^\s+/.test(r2) || (r2 = ""), t2 = 0;
          }
          var o2 = this.$shortWordEndIndex(r2);
          this.moveCursorTo(e2, t2 + o2);
        }, this.moveCursorShortWordLeft = function() {
          var e2 = this.lead.row, t2 = this.lead.column, n2;
          if (n2 = this.session.getFoldAt(e2, t2, -1))
            return this.moveCursorTo(n2.start.row, n2.start.column);
          var r2 = this.session.getLine(e2).substring(0, t2);
          if (t2 === 0) {
            do
              e2--, r2 = this.doc.getLine(e2);
            while (e2 > 0 && /^\s*$/.test(r2));
            t2 = r2.length, /\s+$/.test(r2) || (r2 = "");
          }
          var s2 = i.stringReverse(r2), o2 = this.$shortWordEndIndex(s2);
          return this.moveCursorTo(e2, t2 - o2);
        }, this.moveCursorWordRight = function() {
          this.session.$selectLongWords ? this.moveCursorLongWordRight() : this.moveCursorShortWordRight();
        }, this.moveCursorWordLeft = function() {
          this.session.$selectLongWords ? this.moveCursorLongWordLeft() : this.moveCursorShortWordLeft();
        }, this.moveCursorBy = function(e2, t2) {
          var n2 = this.session.documentToScreenPosition(this.lead.row, this.lead.column), r2;
          t2 === 0 && (e2 !== 0 && (this.session.$bidiHandler.isBidiRow(n2.row, this.lead.row) ? (r2 = this.session.$bidiHandler.getPosLeft(n2.column), n2.column = Math.round(r2 / this.session.$bidiHandler.charWidths[0])) : r2 = n2.column * this.session.$bidiHandler.charWidths[0]), this.$desiredColumn ? n2.column = this.$desiredColumn : this.$desiredColumn = n2.column);
          if (e2 != 0 && this.session.lineWidgets && this.session.lineWidgets[this.lead.row]) {
            var i2 = this.session.lineWidgets[this.lead.row];
            e2 < 0 ? e2 -= i2.rowsAbove || 0 : e2 > 0 && (e2 += i2.rowCount - (i2.rowsAbove || 0));
          }
          var s2 = this.session.screenToDocumentPosition(n2.row + e2, n2.column, r2);
          e2 !== 0 && t2 === 0 && s2.row === this.lead.row && s2.column === this.lead.column, this.moveCursorTo(s2.row, s2.column + t2, t2 === 0);
        }, this.moveCursorToPosition = function(e2) {
          this.moveCursorTo(e2.row, e2.column);
        }, this.moveCursorTo = function(e2, t2, n2) {
          var r2 = this.session.getFoldAt(e2, t2, 1);
          r2 && (e2 = r2.start.row, t2 = r2.start.column), this.$keepDesiredColumnOnChange = true;
          var i2 = this.session.getLine(e2);
          /[\uDC00-\uDFFF]/.test(i2.charAt(t2)) && i2.charAt(t2 - 1) && (this.lead.row == e2 && this.lead.column == t2 + 1 ? t2 -= 1 : t2 += 1), this.lead.setPosition(e2, t2), this.$keepDesiredColumnOnChange = false, n2 || (this.$desiredColumn = null);
        }, this.moveCursorToScreen = function(e2, t2, n2) {
          var r2 = this.session.screenToDocumentPosition(e2, t2);
          this.moveCursorTo(r2.row, r2.column, n2);
        }, this.detach = function() {
          this.lead.detach(), this.anchor.detach();
        }, this.fromOrientedRange = function(e2) {
          this.setSelectionRange(e2, e2.cursor == e2.start), this.$desiredColumn = e2.desiredColumn || this.$desiredColumn;
        }, this.toOrientedRange = function(e2) {
          var t2 = this.getRange();
          return e2 ? (e2.start.column = t2.start.column, e2.start.row = t2.start.row, e2.end.column = t2.end.column, e2.end.row = t2.end.row) : e2 = t2, e2.cursor = this.isBackwards() ? e2.start : e2.end, e2.desiredColumn = this.$desiredColumn, e2;
        }, this.getRangeOfMovements = function(e2) {
          var t2 = this.getCursor();
          try {
            e2(this);
            var n2 = this.getCursor();
            return o.fromPoints(t2, n2);
          } catch (r2) {
            return o.fromPoints(t2, t2);
          } finally {
            this.moveCursorToPosition(t2);
          }
        }, this.toJSON = function() {
          if (this.rangeCount)
            var e2 = this.ranges.map(function(e3) {
              var t2 = e3.clone();
              return t2.isBackwards = e3.cursor == e3.start, t2;
            });
          else {
            var e2 = this.getRange();
            e2.isBackwards = this.isBackwards();
          }
          return e2;
        }, this.fromJSON = function(e2) {
          if (e2.start == void 0) {
            if (this.rangeList && e2.length > 1) {
              this.toSingleRange(e2[0]);
              for (var t2 = e2.length; t2--; ) {
                var n2 = o.fromPoints(e2[t2].start, e2[t2].end);
                e2[t2].isBackwards && (n2.cursor = n2.start), this.addRange(n2, true);
              }
              return;
            }
            e2 = e2[0];
          }
          this.rangeList && this.toSingleRange(e2), this.setSelectionRange(e2, e2.isBackwards);
        }, this.isEqual = function(e2) {
          if ((e2.length || this.rangeCount) && e2.length != this.rangeCount)
            return false;
          if (!e2.length || !this.ranges)
            return this.getRange().isEqual(e2);
          for (var t2 = this.ranges.length; t2--; )
            if (!this.ranges[t2].isEqual(e2[t2]))
              return false;
          return true;
        };
      }).call(u.prototype), t.Selection = u;
    }), ace.define("ace/tokenizer", ["require", "exports", "module", "ace/config"], function(e, t, n) {
      "use strict";
      var r = e("./config"), i = 2e3, s = function(e2) {
        this.states = e2, this.regExps = {}, this.matchMappings = {};
        for (var t2 in this.states) {
          var n2 = this.states[t2], r2 = [], i2 = 0, s2 = this.matchMappings[t2] = { defaultToken: "text" }, o = "g", u = [];
          for (var a = 0; a < n2.length; a++) {
            var f = n2[a];
            f.defaultToken && (s2.defaultToken = f.defaultToken), f.caseInsensitive && o.indexOf("i") === -1 && (o += "i"), f.unicode && o.indexOf("u") === -1 && (o += "u");
            if (f.regex == null)
              continue;
            f.regex instanceof RegExp && (f.regex = f.regex.toString().slice(1, -1));
            var l = f.regex, c = new RegExp("(?:(" + l + ")|(.))").exec("a").length - 2;
            Array.isArray(f.token) ? f.token.length == 1 || c == 1 ? f.token = f.token[0] : c - 1 != f.token.length ? (this.reportError("number of classes and regexp groups doesn't match", { rule: f, groupCount: c - 1 }), f.token = f.token[0]) : (f.tokenArray = f.token, f.token = null, f.onMatch = this.$arrayTokens) : typeof f.token == "function" && !f.onMatch && (c > 1 ? f.onMatch = this.$applyToken : f.onMatch = f.token), c > 1 && (/\\\d/.test(f.regex) ? l = f.regex.replace(/\\([0-9]+)/g, function(e3, t3) {
              return "\\" + (parseInt(t3, 10) + i2 + 1);
            }) : (c = 1, l = this.removeCapturingGroups(f.regex)), !f.splitRegex && typeof f.token != "string" && u.push(f)), s2[i2] = a, i2 += c, r2.push(l), f.onMatch || (f.onMatch = null);
          }
          r2.length || (s2[0] = 0, r2.push("$")), u.forEach(function(e3) {
            e3.splitRegex = this.createSplitterRegexp(e3.regex, o);
          }, this), this.regExps[t2] = new RegExp("(" + r2.join(")|(") + ")|($)", o);
        }
      };
      (function() {
        this.$setMaxTokenCount = function(e2) {
          i = e2 | 0;
        }, this.$applyToken = function(e2) {
          var t2 = this.splitRegex.exec(e2).slice(1), n2 = this.token.apply(this, t2);
          if (typeof n2 == "string")
            return [{ type: n2, value: e2 }];
          var r2 = [];
          for (var i2 = 0, s2 = n2.length; i2 < s2; i2++)
            t2[i2] && (r2[r2.length] = { type: n2[i2], value: t2[i2] });
          return r2;
        }, this.$arrayTokens = function(e2) {
          if (!e2)
            return [];
          var t2 = this.splitRegex.exec(e2);
          if (!t2)
            return "text";
          var n2 = [], r2 = this.tokenArray;
          for (var i2 = 0, s2 = r2.length; i2 < s2; i2++)
            t2[i2 + 1] && (n2[n2.length] = { type: r2[i2], value: t2[i2 + 1] });
          return n2;
        }, this.removeCapturingGroups = function(e2) {
          var t2 = e2.replace(/\\.|\[(?:\\.|[^\\\]])*|\(\?[:=!<]|(\()/g, function(e3, t3) {
            return t3 ? "(?:" : e3;
          });
          return t2;
        }, this.createSplitterRegexp = function(e2, t2) {
          if (e2.indexOf("(?=") != -1) {
            var n2 = 0, r2 = false, i2 = {};
            e2.replace(/(\\.)|(\((?:\?[=!])?)|(\))|([\[\]])/g, function(e3, t3, s2, o, u, a) {
              return r2 ? r2 = u != "]" : u ? r2 = true : o ? (n2 == i2.stack && (i2.end = a + 1, i2.stack = -1), n2--) : s2 && (n2++, s2.length != 1 && (i2.stack = n2, i2.start = a)), e3;
            }), i2.end != null && /^\)*$/.test(e2.substr(i2.end)) && (e2 = e2.substring(0, i2.start) + e2.substr(i2.end));
          }
          return e2.charAt(0) != "^" && (e2 = "^" + e2), e2.charAt(e2.length - 1) != "$" && (e2 += "$"), new RegExp(e2, (t2 || "").replace("g", ""));
        }, this.getLineTokens = function(e2, t2) {
          if (t2 && typeof t2 != "string") {
            var n2 = t2.slice(0);
            t2 = n2[0], t2 === "#tmp" && (n2.shift(), t2 = n2.shift());
          } else
            var n2 = [];
          var r2 = t2 || "start", s2 = this.states[r2];
          s2 || (r2 = "start", s2 = this.states[r2]);
          var o = this.matchMappings[r2], u = this.regExps[r2];
          u.lastIndex = 0;
          var a, f = [], l = 0, c = 0, h = { type: null, value: "" };
          while (a = u.exec(e2)) {
            var p = o.defaultToken, d = null, v = a[0], m = u.lastIndex;
            if (m - v.length > l) {
              var g = e2.substring(l, m - v.length);
              h.type == p ? h.value += g : (h.type && f.push(h), h = { type: p, value: g });
            }
            for (var y = 0; y < a.length - 2; y++) {
              if (a[y + 1] === void 0)
                continue;
              d = s2[o[y]], d.onMatch ? p = d.onMatch(v, r2, n2, e2) : p = d.token, d.next && (typeof d.next == "string" ? r2 = d.next : r2 = d.next(r2, n2), s2 = this.states[r2], s2 || (this.reportError("state doesn't exist", r2), r2 = "start", s2 = this.states[r2]), o = this.matchMappings[r2], l = m, u = this.regExps[r2], u.lastIndex = m), d.consumeLineEnd && (l = m);
              break;
            }
            if (v) {
              if (typeof p == "string")
                !!d && d.merge === false || h.type !== p ? (h.type && f.push(h), h = { type: p, value: v }) : h.value += v;
              else if (p) {
                h.type && f.push(h), h = { type: null, value: "" };
                for (var y = 0; y < p.length; y++)
                  f.push(p[y]);
              }
            }
            if (l == e2.length)
              break;
            l = m;
            if (c++ > i) {
              c > 2 * e2.length && this.reportError("infinite loop with in ace tokenizer", { startState: t2, line: e2 });
              while (l < e2.length)
                h.type && f.push(h), h = { value: e2.substring(l, l += 500), type: "overflow" };
              r2 = "start", n2 = [];
              break;
            }
          }
          return h.type && f.push(h), n2.length > 1 && n2[0] !== r2 && n2.unshift("#tmp", r2), { tokens: f, state: n2.length ? n2 : r2 };
        }, this.reportError = r.reportError;
      }).call(s.prototype), t.Tokenizer = s;
    }), ace.define("ace/mode/text_highlight_rules", ["require", "exports", "module", "ace/lib/lang"], function(e, t, n) {
      "use strict";
      var r = e("../lib/lang"), i = function() {
        this.$rules = { start: [{ token: "empty_line", regex: "^$" }, { defaultToken: "text" }] };
      };
      (function() {
        this.addRules = function(e3, t3) {
          if (!t3) {
            for (var n2 in e3)
              this.$rules[n2] = e3[n2];
            return;
          }
          for (var n2 in e3) {
            var r2 = e3[n2];
            for (var i2 = 0; i2 < r2.length; i2++) {
              var s = r2[i2];
              if (s.next || s.onMatch)
                typeof s.next == "string" && s.next.indexOf(t3) !== 0 && (s.next = t3 + s.next), s.nextState && s.nextState.indexOf(t3) !== 0 && (s.nextState = t3 + s.nextState);
            }
            this.$rules[t3 + n2] = r2;
          }
        }, this.getRules = function() {
          return this.$rules;
        }, this.embedRules = function(e3, t3, n2, i2, s) {
          var o = typeof e3 == "function" ? new e3().getRules() : e3;
          if (i2)
            for (var u = 0; u < i2.length; u++)
              i2[u] = t3 + i2[u];
          else {
            i2 = [];
            for (var a in o)
              i2.push(t3 + a);
          }
          this.addRules(o, t3);
          if (n2) {
            var f = Array.prototype[s ? "push" : "unshift"];
            for (var u = 0; u < i2.length; u++)
              f.apply(this.$rules[i2[u]], r.deepCopy(n2));
          }
          this.$embeds || (this.$embeds = []), this.$embeds.push(t3);
        }, this.getEmbeds = function() {
          return this.$embeds;
        };
        var e2 = function(e3, t3) {
          return (e3 != "start" || t3.length) && t3.unshift(this.nextState, e3), this.nextState;
        }, t2 = function(e3, t3) {
          return t3.shift(), t3.shift() || "start";
        };
        this.normalizeRules = function() {
          function i2(s) {
            var o = r2[s];
            o.processed = true;
            for (var u = 0; u < o.length; u++) {
              var a = o[u], f = null;
              Array.isArray(a) && (f = a, a = {}), !a.regex && a.start && (a.regex = a.start, a.next || (a.next = []), a.next.push({ defaultToken: a.token }, { token: a.token + ".end", regex: a.end || a.start, next: "pop" }), a.token = a.token + ".start", a.push = true);
              var l = a.next || a.push;
              if (l && Array.isArray(l)) {
                var c = a.stateName;
                c || (c = a.token, typeof c != "string" && (c = c[0] || ""), r2[c] && (c += n2++)), r2[c] = l, a.next = c, i2(c);
              } else
                l == "pop" && (a.next = t2);
              a.push && (a.nextState = a.next || a.push, a.next = e2, delete a.push);
              if (a.rules)
                for (var h in a.rules)
                  r2[h] ? r2[h].push && r2[h].push.apply(r2[h], a.rules[h]) : r2[h] = a.rules[h];
              var p = typeof a == "string" ? a : a.include;
              p && (Array.isArray(p) ? f = p.map(function(e3) {
                return r2[e3];
              }) : f = r2[p]);
              if (f) {
                var d = [u, 1].concat(f);
                a.noEscape && (d = d.filter(function(e3) {
                  return !e3.next;
                })), o.splice.apply(o, d), u--;
              }
              a.keywordMap && (a.token = this.createKeywordMapper(a.keywordMap, a.defaultToken || "text", a.caseInsensitive), delete a.defaultToken);
            }
          }
          var n2 = 0, r2 = this.$rules;
          Object.keys(r2).forEach(i2, this);
        }, this.createKeywordMapper = function(e3, t3, n2, r2) {
          var i2 = /* @__PURE__ */ Object.create(null);
          return this.$keywordList = [], Object.keys(e3).forEach(function(t4) {
            var s = e3[t4], o = s.split(r2 || "|");
            for (var u = o.length; u--; ) {
              var a = o[u];
              this.$keywordList.push(a), n2 && (a = a.toLowerCase()), i2[a] = t4;
            }
          }, this), e3 = null, n2 ? function(e4) {
            return i2[e4.toLowerCase()] || t3;
          } : function(e4) {
            return i2[e4] || t3;
          };
        }, this.getKeywords = function() {
          return this.$keywords;
        };
      }).call(i.prototype), t.TextHighlightRules = i;
    }), ace.define("ace/mode/behaviour", ["require", "exports", "module"], function(e, t, n) {
      "use strict";
      var r = function() {
        this.$behaviours = {};
      };
      (function() {
        this.add = function(e2, t2, n2) {
          switch (void 0) {
            case this.$behaviours:
              this.$behaviours = {};
            case this.$behaviours[e2]:
              this.$behaviours[e2] = {};
          }
          this.$behaviours[e2][t2] = n2;
        }, this.addBehaviours = function(e2) {
          for (var t2 in e2)
            for (var n2 in e2[t2])
              this.add(t2, n2, e2[t2][n2]);
        }, this.remove = function(e2) {
          this.$behaviours && this.$behaviours[e2] && delete this.$behaviours[e2];
        }, this.inherit = function(e2, t2) {
          if (typeof e2 == "function")
            var n2 = new e2().getBehaviours(t2);
          else
            var n2 = e2.getBehaviours(t2);
          this.addBehaviours(n2);
        }, this.getBehaviours = function(e2) {
          if (!e2)
            return this.$behaviours;
          var t2 = {};
          for (var n2 = 0; n2 < e2.length; n2++)
            this.$behaviours[e2[n2]] && (t2[e2[n2]] = this.$behaviours[e2[n2]]);
          return t2;
        };
      }).call(r.prototype), t.Behaviour = r;
    }), ace.define("ace/token_iterator", ["require", "exports", "module", "ace/range"], function(e, t, n) {
      "use strict";
      var r = e("./range").Range, i = function(e2, t2, n2) {
        this.$session = e2, this.$row = t2, this.$rowTokens = e2.getTokens(t2);
        var r2 = e2.getTokenAt(t2, n2);
        this.$tokenIndex = r2 ? r2.index : -1;
      };
      (function() {
        this.stepBackward = function() {
          this.$tokenIndex -= 1;
          while (this.$tokenIndex < 0) {
            this.$row -= 1;
            if (this.$row < 0)
              return this.$row = 0, null;
            this.$rowTokens = this.$session.getTokens(this.$row), this.$tokenIndex = this.$rowTokens.length - 1;
          }
          return this.$rowTokens[this.$tokenIndex];
        }, this.stepForward = function() {
          this.$tokenIndex += 1;
          var e2;
          while (this.$tokenIndex >= this.$rowTokens.length) {
            this.$row += 1, e2 || (e2 = this.$session.getLength());
            if (this.$row >= e2)
              return this.$row = e2 - 1, null;
            this.$rowTokens = this.$session.getTokens(this.$row), this.$tokenIndex = 0;
          }
          return this.$rowTokens[this.$tokenIndex];
        }, this.getCurrentToken = function() {
          return this.$rowTokens[this.$tokenIndex];
        }, this.getCurrentTokenRow = function() {
          return this.$row;
        }, this.getCurrentTokenColumn = function() {
          var e2 = this.$rowTokens, t2 = this.$tokenIndex, n2 = e2[t2].start;
          if (n2 !== void 0)
            return n2;
          n2 = 0;
          while (t2 > 0)
            t2 -= 1, n2 += e2[t2].value.length;
          return n2;
        }, this.getCurrentTokenPosition = function() {
          return { row: this.$row, column: this.getCurrentTokenColumn() };
        }, this.getCurrentTokenRange = function() {
          var e2 = this.$rowTokens[this.$tokenIndex], t2 = this.getCurrentTokenColumn();
          return new r(this.$row, t2, this.$row, t2 + e2.value.length);
        };
      }).call(i.prototype), t.TokenIterator = i;
    }), ace.define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/token_iterator", "ace/lib/lang"], function(e, t, n) {
      "use strict";
      var r = e("../../lib/oop"), i = e("../behaviour").Behaviour, s = e("../../token_iterator").TokenIterator, o = e("../../lib/lang"), u = ["text", "paren.rparen", "rparen", "paren", "punctuation.operator"], a = ["text", "paren.rparen", "rparen", "paren", "punctuation.operator", "comment"], f, l = {}, c = { '"': '"', "'": "'" }, h = function(e2) {
        var t2 = -1;
        e2.multiSelect && (t2 = e2.selection.index, l.rangeCount != e2.multiSelect.rangeCount && (l = { rangeCount: e2.multiSelect.rangeCount }));
        if (l[t2])
          return f = l[t2];
        f = l[t2] = { autoInsertedBrackets: 0, autoInsertedRow: -1, autoInsertedLineEnd: "", maybeInsertedBrackets: 0, maybeInsertedRow: -1, maybeInsertedLineStart: "", maybeInsertedLineEnd: "" };
      }, p = function(e2, t2, n2, r2) {
        var i2 = e2.end.row - e2.start.row;
        return { text: n2 + t2 + r2, selection: [0, e2.start.column + 1, i2, e2.end.column + (i2 ? 0 : 1)] };
      }, d = function(e2) {
        this.add("braces", "insertion", function(t2, n2, r2, i2, s2) {
          var u2 = r2.getCursorPosition(), a2 = i2.doc.getLine(u2.row);
          if (s2 == "{") {
            h(r2);
            var l2 = r2.getSelectionRange(), c2 = i2.doc.getTextRange(l2);
            if (c2 !== "" && c2 !== "{" && r2.getWrapBehavioursEnabled())
              return p(l2, c2, "{", "}");
            if (d.isSaneInsertion(r2, i2))
              return /[\]\}\)]/.test(a2[u2.column]) || r2.inMultiSelectMode || e2 && e2.braces ? (d.recordAutoInsert(r2, i2, "}"), { text: "{}", selection: [1, 1] }) : (d.recordMaybeInsert(r2, i2, "{"), { text: "{", selection: [1, 1] });
          } else if (s2 == "}") {
            h(r2);
            var v = a2.substring(u2.column, u2.column + 1);
            if (v == "}") {
              var m = i2.$findOpeningBracket("}", { column: u2.column + 1, row: u2.row });
              if (m !== null && d.isAutoInsertedClosing(u2, a2, s2))
                return d.popAutoInsertedClosing(), { text: "", selection: [1, 1] };
            }
          } else {
            if (s2 == "\n" || s2 == "\r\n") {
              h(r2);
              var g = "";
              d.isMaybeInsertedClosing(u2, a2) && (g = o.stringRepeat("}", f.maybeInsertedBrackets), d.clearMaybeInsertedClosing());
              var v = a2.substring(u2.column, u2.column + 1);
              if (v === "}") {
                var y = i2.findMatchingBracket({ row: u2.row, column: u2.column + 1 }, "}");
                if (!y)
                  return null;
                var b = this.$getIndent(i2.getLine(y.row));
              } else {
                if (!g) {
                  d.clearMaybeInsertedClosing();
                  return;
                }
                var b = this.$getIndent(a2);
              }
              var w = b + i2.getTabString();
              return { text: "\n" + w + "\n" + b + g, selection: [1, w.length, 1, w.length] };
            }
            d.clearMaybeInsertedClosing();
          }
        }), this.add("braces", "deletion", function(e3, t2, n2, r2, i2) {
          var s2 = r2.doc.getTextRange(i2);
          if (!i2.isMultiLine() && s2 == "{") {
            h(n2);
            var o2 = r2.doc.getLine(i2.start.row), u2 = o2.substring(i2.end.column, i2.end.column + 1);
            if (u2 == "}")
              return i2.end.column++, i2;
            f.maybeInsertedBrackets--;
          }
        }), this.add("parens", "insertion", function(e3, t2, n2, r2, i2) {
          if (i2 == "(") {
            h(n2);
            var s2 = n2.getSelectionRange(), o2 = r2.doc.getTextRange(s2);
            if (o2 !== "" && n2.getWrapBehavioursEnabled())
              return p(s2, o2, "(", ")");
            if (d.isSaneInsertion(n2, r2))
              return d.recordAutoInsert(n2, r2, ")"), { text: "()", selection: [1, 1] };
          } else if (i2 == ")") {
            h(n2);
            var u2 = n2.getCursorPosition(), a2 = r2.doc.getLine(u2.row), f2 = a2.substring(u2.column, u2.column + 1);
            if (f2 == ")") {
              var l2 = r2.$findOpeningBracket(")", { column: u2.column + 1, row: u2.row });
              if (l2 !== null && d.isAutoInsertedClosing(u2, a2, i2))
                return d.popAutoInsertedClosing(), { text: "", selection: [1, 1] };
            }
          }
        }), this.add("parens", "deletion", function(e3, t2, n2, r2, i2) {
          var s2 = r2.doc.getTextRange(i2);
          if (!i2.isMultiLine() && s2 == "(") {
            h(n2);
            var o2 = r2.doc.getLine(i2.start.row), u2 = o2.substring(i2.start.column + 1, i2.start.column + 2);
            if (u2 == ")")
              return i2.end.column++, i2;
          }
        }), this.add("brackets", "insertion", function(e3, t2, n2, r2, i2) {
          if (i2 == "[") {
            h(n2);
            var s2 = n2.getSelectionRange(), o2 = r2.doc.getTextRange(s2);
            if (o2 !== "" && n2.getWrapBehavioursEnabled())
              return p(s2, o2, "[", "]");
            if (d.isSaneInsertion(n2, r2))
              return d.recordAutoInsert(n2, r2, "]"), { text: "[]", selection: [1, 1] };
          } else if (i2 == "]") {
            h(n2);
            var u2 = n2.getCursorPosition(), a2 = r2.doc.getLine(u2.row), f2 = a2.substring(u2.column, u2.column + 1);
            if (f2 == "]") {
              var l2 = r2.$findOpeningBracket("]", { column: u2.column + 1, row: u2.row });
              if (l2 !== null && d.isAutoInsertedClosing(u2, a2, i2))
                return d.popAutoInsertedClosing(), { text: "", selection: [1, 1] };
            }
          }
        }), this.add("brackets", "deletion", function(e3, t2, n2, r2, i2) {
          var s2 = r2.doc.getTextRange(i2);
          if (!i2.isMultiLine() && s2 == "[") {
            h(n2);
            var o2 = r2.doc.getLine(i2.start.row), u2 = o2.substring(i2.start.column + 1, i2.start.column + 2);
            if (u2 == "]")
              return i2.end.column++, i2;
          }
        }), this.add("string_dquotes", "insertion", function(e3, t2, n2, r2, i2) {
          var s2 = r2.$mode.$quotes || c;
          if (i2.length == 1 && s2[i2]) {
            if (this.lineCommentStart && this.lineCommentStart.indexOf(i2) != -1)
              return;
            h(n2);
            var o2 = i2, u2 = n2.getSelectionRange(), a2 = r2.doc.getTextRange(u2);
            if (a2 !== "" && (a2.length != 1 || !s2[a2]) && n2.getWrapBehavioursEnabled())
              return p(u2, a2, o2, o2);
            if (!a2) {
              var f2 = n2.getCursorPosition(), l2 = r2.doc.getLine(f2.row), d2 = l2.substring(f2.column - 1, f2.column), v = l2.substring(f2.column, f2.column + 1), m = r2.getTokenAt(f2.row, f2.column), g = r2.getTokenAt(f2.row, f2.column + 1);
              if (d2 == "\\" && m && /escape/.test(m.type))
                return null;
              var y = m && /string|escape/.test(m.type), b = !g || /string|escape/.test(g.type), w;
              if (v == o2)
                w = y !== b, w && /string\.end/.test(g.type) && (w = false);
              else {
                if (y && !b)
                  return null;
                if (y && b)
                  return null;
                var E = r2.$mode.tokenRe;
                E.lastIndex = 0;
                var S = E.test(d2);
                E.lastIndex = 0;
                var x = E.test(d2);
                if (S || x)
                  return null;
                if (v && !/[\s;,.})\]\\]/.test(v))
                  return null;
                var T = l2[f2.column - 2];
                if (!(d2 != o2 || T != o2 && !E.test(T)))
                  return null;
                w = true;
              }
              return { text: w ? o2 + o2 : "", selection: [1, 1] };
            }
          }
        }), this.add("string_dquotes", "deletion", function(e3, t2, n2, r2, i2) {
          var s2 = r2.$mode.$quotes || c, o2 = r2.doc.getTextRange(i2);
          if (!i2.isMultiLine() && s2.hasOwnProperty(o2)) {
            h(n2);
            var u2 = r2.doc.getLine(i2.start.row), a2 = u2.substring(i2.start.column + 1, i2.start.column + 2);
            if (a2 == o2)
              return i2.end.column++, i2;
          }
        });
      };
      d.isSaneInsertion = function(e2, t2) {
        var n2 = e2.getCursorPosition(), r2 = new s(t2, n2.row, n2.column);
        if (!this.$matchTokenType(r2.getCurrentToken() || "text", u)) {
          if (/[)}\]]/.test(e2.session.getLine(n2.row)[n2.column]))
            return true;
          var i2 = new s(t2, n2.row, n2.column + 1);
          if (!this.$matchTokenType(i2.getCurrentToken() || "text", u))
            return false;
        }
        return r2.stepForward(), r2.getCurrentTokenRow() !== n2.row || this.$matchTokenType(r2.getCurrentToken() || "text", a);
      }, d.$matchTokenType = function(e2, t2) {
        return t2.indexOf(e2.type || e2) > -1;
      }, d.recordAutoInsert = function(e2, t2, n2) {
        var r2 = e2.getCursorPosition(), i2 = t2.doc.getLine(r2.row);
        this.isAutoInsertedClosing(r2, i2, f.autoInsertedLineEnd[0]) || (f.autoInsertedBrackets = 0), f.autoInsertedRow = r2.row, f.autoInsertedLineEnd = n2 + i2.substr(r2.column), f.autoInsertedBrackets++;
      }, d.recordMaybeInsert = function(e2, t2, n2) {
        var r2 = e2.getCursorPosition(), i2 = t2.doc.getLine(r2.row);
        this.isMaybeInsertedClosing(r2, i2) || (f.maybeInsertedBrackets = 0), f.maybeInsertedRow = r2.row, f.maybeInsertedLineStart = i2.substr(0, r2.column) + n2, f.maybeInsertedLineEnd = i2.substr(r2.column), f.maybeInsertedBrackets++;
      }, d.isAutoInsertedClosing = function(e2, t2, n2) {
        return f.autoInsertedBrackets > 0 && e2.row === f.autoInsertedRow && n2 === f.autoInsertedLineEnd[0] && t2.substr(e2.column) === f.autoInsertedLineEnd;
      }, d.isMaybeInsertedClosing = function(e2, t2) {
        return f.maybeInsertedBrackets > 0 && e2.row === f.maybeInsertedRow && t2.substr(e2.column) === f.maybeInsertedLineEnd && t2.substr(0, e2.column) == f.maybeInsertedLineStart;
      }, d.popAutoInsertedClosing = function() {
        f.autoInsertedLineEnd = f.autoInsertedLineEnd.substr(1), f.autoInsertedBrackets--;
      }, d.clearMaybeInsertedClosing = function() {
        f && (f.maybeInsertedBrackets = 0, f.maybeInsertedRow = -1);
      }, r.inherits(d, i), t.CstyleBehaviour = d;
    }), ace.define("ace/unicode", ["require", "exports", "module"], function(e, t, n) {
      "use strict";
      var r = [48, 9, 8, 25, 5, 0, 2, 25, 48, 0, 11, 0, 5, 0, 6, 22, 2, 30, 2, 457, 5, 11, 15, 4, 8, 0, 2, 0, 18, 116, 2, 1, 3, 3, 9, 0, 2, 2, 2, 0, 2, 19, 2, 82, 2, 138, 2, 4, 3, 155, 12, 37, 3, 0, 8, 38, 10, 44, 2, 0, 2, 1, 2, 1, 2, 0, 9, 26, 6, 2, 30, 10, 7, 61, 2, 9, 5, 101, 2, 7, 3, 9, 2, 18, 3, 0, 17, 58, 3, 100, 15, 53, 5, 0, 6, 45, 211, 57, 3, 18, 2, 5, 3, 11, 3, 9, 2, 1, 7, 6, 2, 2, 2, 7, 3, 1, 3, 21, 2, 6, 2, 0, 4, 3, 3, 8, 3, 1, 3, 3, 9, 0, 5, 1, 2, 4, 3, 11, 16, 2, 2, 5, 5, 1, 3, 21, 2, 6, 2, 1, 2, 1, 2, 1, 3, 0, 2, 4, 5, 1, 3, 2, 4, 0, 8, 3, 2, 0, 8, 15, 12, 2, 2, 8, 2, 2, 2, 21, 2, 6, 2, 1, 2, 4, 3, 9, 2, 2, 2, 2, 3, 0, 16, 3, 3, 9, 18, 2, 2, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 3, 8, 3, 1, 3, 2, 9, 1, 5, 1, 2, 4, 3, 9, 2, 0, 17, 1, 2, 5, 4, 2, 2, 3, 4, 1, 2, 0, 2, 1, 4, 1, 4, 2, 4, 11, 5, 4, 4, 2, 2, 3, 3, 0, 7, 0, 15, 9, 18, 2, 2, 7, 2, 2, 2, 22, 2, 9, 2, 4, 4, 7, 2, 2, 2, 3, 8, 1, 2, 1, 7, 3, 3, 9, 19, 1, 2, 7, 2, 2, 2, 22, 2, 9, 2, 4, 3, 8, 2, 2, 2, 3, 8, 1, 8, 0, 2, 3, 3, 9, 19, 1, 2, 7, 2, 2, 2, 22, 2, 15, 4, 7, 2, 2, 2, 3, 10, 0, 9, 3, 3, 9, 11, 5, 3, 1, 2, 17, 4, 23, 2, 8, 2, 0, 3, 6, 4, 0, 5, 5, 2, 0, 2, 7, 19, 1, 14, 57, 6, 14, 2, 9, 40, 1, 2, 0, 3, 1, 2, 0, 3, 0, 7, 3, 2, 6, 2, 2, 2, 0, 2, 0, 3, 1, 2, 12, 2, 2, 3, 4, 2, 0, 2, 5, 3, 9, 3, 1, 35, 0, 24, 1, 7, 9, 12, 0, 2, 0, 2, 0, 5, 9, 2, 35, 5, 19, 2, 5, 5, 7, 2, 35, 10, 0, 58, 73, 7, 77, 3, 37, 11, 42, 2, 0, 4, 328, 2, 3, 3, 6, 2, 0, 2, 3, 3, 40, 2, 3, 3, 32, 2, 3, 3, 6, 2, 0, 2, 3, 3, 14, 2, 56, 2, 3, 3, 66, 5, 0, 33, 15, 17, 84, 13, 619, 3, 16, 2, 25, 6, 74, 22, 12, 2, 6, 12, 20, 12, 19, 13, 12, 2, 2, 2, 1, 13, 51, 3, 29, 4, 0, 5, 1, 3, 9, 34, 2, 3, 9, 7, 87, 9, 42, 6, 69, 11, 28, 4, 11, 5, 11, 11, 39, 3, 4, 12, 43, 5, 25, 7, 10, 38, 27, 5, 62, 2, 28, 3, 10, 7, 9, 14, 0, 89, 75, 5, 9, 18, 8, 13, 42, 4, 11, 71, 55, 9, 9, 4, 48, 83, 2, 2, 30, 14, 230, 23, 280, 3, 5, 3, 37, 3, 5, 3, 7, 2, 0, 2, 0, 2, 0, 2, 30, 3, 52, 2, 6, 2, 0, 4, 2, 2, 6, 4, 3, 3, 5, 5, 12, 6, 2, 2, 6, 67, 1, 20, 0, 29, 0, 14, 0, 17, 4, 60, 12, 5, 0, 4, 11, 18, 0, 5, 0, 3, 9, 2, 0, 4, 4, 7, 0, 2, 0, 2, 0, 2, 3, 2, 10, 3, 3, 6, 4, 5, 0, 53, 1, 2684, 46, 2, 46, 2, 132, 7, 6, 15, 37, 11, 53, 10, 0, 17, 22, 10, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 31, 48, 0, 470, 1, 36, 5, 2, 4, 6, 1, 5, 85, 3, 1, 3, 2, 2, 89, 2, 3, 6, 40, 4, 93, 18, 23, 57, 15, 513, 6581, 75, 20939, 53, 1164, 68, 45, 3, 268, 4, 27, 21, 31, 3, 13, 13, 1, 2, 24, 9, 69, 11, 1, 38, 8, 3, 102, 3, 1, 111, 44, 25, 51, 13, 68, 12, 9, 7, 23, 4, 0, 5, 45, 3, 35, 13, 28, 4, 64, 15, 10, 39, 54, 10, 13, 3, 9, 7, 22, 4, 1, 5, 66, 25, 2, 227, 42, 2, 1, 3, 9, 7, 11171, 13, 22, 5, 48, 8453, 301, 3, 61, 3, 105, 39, 6, 13, 4, 6, 11, 2, 12, 2, 4, 2, 0, 2, 1, 2, 1, 2, 107, 34, 362, 19, 63, 3, 53, 41, 11, 5, 15, 17, 6, 13, 1, 25, 2, 33, 4, 2, 134, 20, 9, 8, 25, 5, 0, 2, 25, 12, 88, 4, 5, 3, 5, 3, 5, 3, 2], i = 0, s = [];
      for (var o = 0; o < r.length; o += 2)
        s.push(i += r[o]), r[o + 1] && s.push(45, i += r[o + 1]);
      t.wordChars = String.fromCharCode.apply(null, s);
    }), ace.define("ace/mode/text", ["require", "exports", "module", "ace/config", "ace/tokenizer", "ace/mode/text_highlight_rules", "ace/mode/behaviour/cstyle", "ace/unicode", "ace/lib/lang", "ace/token_iterator", "ace/range"], function(e, t, n) {
      "use strict";
      var r = e("../config"), i = e("../tokenizer").Tokenizer, s = e("./text_highlight_rules").TextHighlightRules, o = e("./behaviour/cstyle").CstyleBehaviour, u = e("../unicode"), a = e("../lib/lang"), f = e("../token_iterator").TokenIterator, l = e("../range").Range, c = function() {
        this.HighlightRules = s;
      };
      (function() {
        this.$defaultBehaviour = new o(), this.tokenRe = new RegExp("^[" + u.wordChars + "\\$_]+", "g"), this.nonTokenRe = new RegExp("^(?:[^" + u.wordChars + "\\$_]|\\s])+", "g"), this.getTokenizer = function() {
          return this.$tokenizer || (this.$highlightRules = this.$highlightRules || new this.HighlightRules(this.$highlightRuleConfig), this.$tokenizer = new i(this.$highlightRules.getRules())), this.$tokenizer;
        }, this.lineCommentStart = "", this.blockComment = "", this.toggleCommentLines = function(e2, t2, n2, r2) {
          function w(e3) {
            for (var t3 = n2; t3 <= r2; t3++)
              e3(i2.getLine(t3), t3);
          }
          var i2 = t2.doc, s2 = true, o2 = true, u2 = Infinity, f2 = t2.getTabSize(), l2 = false;
          if (!this.lineCommentStart) {
            if (!this.blockComment)
              return false;
            var c2 = this.blockComment.start, h = this.blockComment.end, p = new RegExp("^(\\s*)(?:" + a.escapeRegExp(c2) + ")"), d = new RegExp("(?:" + a.escapeRegExp(h) + ")\\s*$"), v = function(e3, t3) {
              if (g(e3, t3))
                return;
              if (!s2 || /\S/.test(e3))
                i2.insertInLine({ row: t3, column: e3.length }, h), i2.insertInLine({ row: t3, column: u2 }, c2);
            }, m = function(e3, t3) {
              var n3;
              (n3 = e3.match(d)) && i2.removeInLine(t3, e3.length - n3[0].length, e3.length), (n3 = e3.match(p)) && i2.removeInLine(t3, n3[1].length, n3[0].length);
            }, g = function(e3, n3) {
              if (p.test(e3))
                return true;
              var r3 = t2.getTokens(n3);
              for (var i3 = 0; i3 < r3.length; i3++)
                if (r3[i3].type === "comment")
                  return true;
            };
          } else {
            if (Array.isArray(this.lineCommentStart))
              var p = this.lineCommentStart.map(a.escapeRegExp).join("|"), c2 = this.lineCommentStart[0];
            else
              var p = a.escapeRegExp(this.lineCommentStart), c2 = this.lineCommentStart;
            p = new RegExp("^(\\s*)(?:" + p + ") ?"), l2 = t2.getUseSoftTabs();
            var m = function(e3, t3) {
              var n3 = e3.match(p);
              if (!n3)
                return;
              var r3 = n3[1].length, s3 = n3[0].length;
              !b(e3, r3, s3) && n3[0][s3 - 1] == " " && s3--, i2.removeInLine(t3, r3, s3);
            }, y = c2 + " ", v = function(e3, t3) {
              if (!s2 || /\S/.test(e3))
                b(e3, u2, u2) ? i2.insertInLine({ row: t3, column: u2 }, y) : i2.insertInLine({ row: t3, column: u2 }, c2);
            }, g = function(e3, t3) {
              return p.test(e3);
            }, b = function(e3, t3, n3) {
              var r3 = 0;
              while (t3-- && e3.charAt(t3) == " ")
                r3++;
              if (r3 % f2 != 0)
                return false;
              var r3 = 0;
              while (e3.charAt(n3++) == " ")
                r3++;
              return f2 > 2 ? r3 % f2 != f2 - 1 : r3 % f2 == 0;
            };
          }
          var E = Infinity;
          w(function(e3, t3) {
            var n3 = e3.search(/\S/);
            n3 !== -1 ? (n3 < u2 && (u2 = n3), o2 && !g(e3, t3) && (o2 = false)) : E > e3.length && (E = e3.length);
          }), u2 == Infinity && (u2 = E, s2 = false, o2 = false), l2 && u2 % f2 != 0 && (u2 = Math.floor(u2 / f2) * f2), w(o2 ? m : v);
        }, this.toggleBlockComment = function(e2, t2, n2, r2) {
          var i2 = this.blockComment;
          if (!i2)
            return;
          !i2.start && i2[0] && (i2 = i2[0]);
          var s2 = new f(t2, r2.row, r2.column), o2 = s2.getCurrentToken(), u2 = t2.selection, a2 = t2.selection.toOrientedRange(), c2, h;
          if (o2 && /comment/.test(o2.type)) {
            var p, d;
            while (o2 && /comment/.test(o2.type)) {
              var v = o2.value.indexOf(i2.start);
              if (v != -1) {
                var m = s2.getCurrentTokenRow(), g = s2.getCurrentTokenColumn() + v;
                p = new l(m, g, m, g + i2.start.length);
                break;
              }
              o2 = s2.stepBackward();
            }
            var s2 = new f(t2, r2.row, r2.column), o2 = s2.getCurrentToken();
            while (o2 && /comment/.test(o2.type)) {
              var v = o2.value.indexOf(i2.end);
              if (v != -1) {
                var m = s2.getCurrentTokenRow(), g = s2.getCurrentTokenColumn() + v;
                d = new l(m, g, m, g + i2.end.length);
                break;
              }
              o2 = s2.stepForward();
            }
            d && t2.remove(d), p && (t2.remove(p), c2 = p.start.row, h = -i2.start.length);
          } else
            h = i2.start.length, c2 = n2.start.row, t2.insert(n2.end, i2.end), t2.insert(n2.start, i2.start);
          a2.start.row == c2 && (a2.start.column += h), a2.end.row == c2 && (a2.end.column += h), t2.selection.fromOrientedRange(a2);
        }, this.getNextLineIndent = function(e2, t2, n2) {
          return this.$getIndent(t2);
        }, this.checkOutdent = function(e2, t2, n2) {
          return false;
        }, this.autoOutdent = function(e2, t2, n2) {
        }, this.$getIndent = function(e2) {
          return e2.match(/^\s*/)[0];
        }, this.createWorker = function(e2) {
          return null;
        }, this.createModeDelegates = function(e2) {
          this.$embeds = [], this.$modes = {};
          for (var t2 in e2)
            if (e2[t2]) {
              var n2 = e2[t2], i2 = n2.prototype.$id, s2 = r.$modes[i2];
              s2 || (r.$modes[i2] = s2 = new n2()), r.$modes[t2] || (r.$modes[t2] = s2), this.$embeds.push(t2), this.$modes[t2] = s2;
            }
          var o2 = ["toggleBlockComment", "toggleCommentLines", "getNextLineIndent", "checkOutdent", "autoOutdent", "transformAction", "getCompletions"];
          for (var t2 = 0; t2 < o2.length; t2++)
            (function(e3) {
              var n3 = o2[t2], r2 = e3[n3];
              e3[o2[t2]] = function() {
                return this.$delegator(n3, arguments, r2);
              };
            })(this);
        }, this.$delegator = function(e2, t2, n2) {
          var r2 = t2[0] || "start";
          if (typeof r2 != "string") {
            if (Array.isArray(r2[2])) {
              var i2 = r2[2][r2[2].length - 1], s2 = this.$modes[i2];
              if (s2)
                return s2[e2].apply(s2, [r2[1]].concat([].slice.call(t2, 1)));
            }
            r2 = r2[0] || "start";
          }
          for (var o2 = 0; o2 < this.$embeds.length; o2++) {
            if (!this.$modes[this.$embeds[o2]])
              continue;
            var u2 = r2.split(this.$embeds[o2]);
            if (!u2[0] && u2[1]) {
              t2[0] = u2[1];
              var s2 = this.$modes[this.$embeds[o2]];
              return s2[e2].apply(s2, t2);
            }
          }
          var a2 = n2.apply(this, t2);
          return n2 ? a2 : void 0;
        }, this.transformAction = function(e2, t2, n2, r2, i2) {
          if (this.$behaviour) {
            var s2 = this.$behaviour.getBehaviours();
            for (var o2 in s2)
              if (s2[o2][t2]) {
                var u2 = s2[o2][t2].apply(this, arguments);
                if (u2)
                  return u2;
              }
          }
        }, this.getKeywords = function(e2) {
          if (!this.completionKeywords) {
            var t2 = this.$tokenizer.rules, n2 = [];
            for (var r2 in t2) {
              var i2 = t2[r2];
              for (var s2 = 0, o2 = i2.length; s2 < o2; s2++)
                if (typeof i2[s2].token == "string")
                  /keyword|support|storage/.test(i2[s2].token) && n2.push(i2[s2].regex);
                else if (typeof i2[s2].token == "object") {
                  for (var u2 = 0, a2 = i2[s2].token.length; u2 < a2; u2++)
                    if (/keyword|support|storage/.test(i2[s2].token[u2])) {
                      var r2 = i2[s2].regex.match(/\(.+?\)/g)[u2];
                      n2.push(r2.substr(1, r2.length - 2));
                    }
                }
            }
            this.completionKeywords = n2;
          }
          return e2 ? n2.concat(this.$keywordList || []) : this.$keywordList;
        }, this.$createKeywordList = function() {
          return this.$highlightRules || this.getTokenizer(), this.$keywordList = this.$highlightRules.$keywordList || [];
        }, this.getCompletions = function(e2, t2, n2, r2) {
          var i2 = this.$keywordList || this.$createKeywordList();
          return i2.map(function(e3) {
            return { name: e3, value: e3, score: 0, meta: "keyword" };
          });
        }, this.$id = "ace/mode/text";
      }).call(c.prototype), t.Mode = c;
    }), ace.define("ace/apply_delta", ["require", "exports", "module"], function(e, t, n) {
      "use strict";
      function r(e2, t2) {
        throw console.log("Invalid Delta:", e2), "Invalid Delta: " + t2;
      }
      function i(e2, t2) {
        return t2.row >= 0 && t2.row < e2.length && t2.column >= 0 && t2.column <= e2[t2.row].length;
      }
      function s(e2, t2) {
        t2.action != "insert" && t2.action != "remove" && r(t2, "delta.action must be 'insert' or 'remove'"), t2.lines instanceof Array || r(t2, "delta.lines must be an Array"), (!t2.start || !t2.end) && r(t2, "delta.start/end must be an present");
        var n2 = t2.start;
        i(e2, t2.start) || r(t2, "delta.start must be contained in document");
        var s2 = t2.end;
        t2.action == "remove" && !i(e2, s2) && r(t2, "delta.end must contained in document for 'remove' actions");
        var o = s2.row - n2.row, u = s2.column - (o == 0 ? n2.column : 0);
        (o != t2.lines.length - 1 || t2.lines[o].length != u) && r(t2, "delta.range must match delta lines");
      }
      t.applyDelta = function(e2, t2, n2) {
        var r2 = t2.start.row, i2 = t2.start.column, s2 = e2[r2] || "";
        switch (t2.action) {
          case "insert":
            var o = t2.lines;
            if (o.length === 1)
              e2[r2] = s2.substring(0, i2) + t2.lines[0] + s2.substring(i2);
            else {
              var u = [r2, 1].concat(t2.lines);
              e2.splice.apply(e2, u), e2[r2] = s2.substring(0, i2) + e2[r2], e2[r2 + t2.lines.length - 1] += s2.substring(i2);
            }
            break;
          case "remove":
            var a = t2.end.column, f = t2.end.row;
            r2 === f ? e2[r2] = s2.substring(0, i2) + s2.substring(a) : e2.splice(r2, f - r2 + 1, s2.substring(0, i2) + e2[f].substring(a));
        }
      };
    }), ace.define("ace/anchor", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function(e, t, n) {
      "use strict";
      var r = e("./lib/oop"), i = e("./lib/event_emitter").EventEmitter, s = t.Anchor = function(e2, t2, n2) {
        this.$onChange = this.onChange.bind(this), this.attach(e2), typeof n2 == "undefined" ? this.setPosition(t2.row, t2.column) : this.setPosition(t2, n2);
      };
      (function() {
        function e2(e3, t3, n2) {
          var r2 = n2 ? e3.column <= t3.column : e3.column < t3.column;
          return e3.row < t3.row || e3.row == t3.row && r2;
        }
        function t2(t3, n2, r2) {
          var i2 = t3.action == "insert", s2 = (i2 ? 1 : -1) * (t3.end.row - t3.start.row), o = (i2 ? 1 : -1) * (t3.end.column - t3.start.column), u = t3.start, a = i2 ? u : t3.end;
          return e2(n2, u, r2) ? { row: n2.row, column: n2.column } : e2(a, n2, !r2) ? { row: n2.row + s2, column: n2.column + (n2.row == a.row ? o : 0) } : { row: u.row, column: u.column };
        }
        r.implement(this, i), this.getPosition = function() {
          return this.$clipPositionToDocument(this.row, this.column);
        }, this.getDocument = function() {
          return this.document;
        }, this.$insertRight = false, this.onChange = function(e3) {
          if (e3.start.row == e3.end.row && e3.start.row != this.row)
            return;
          if (e3.start.row > this.row)
            return;
          var n2 = t2(e3, { row: this.row, column: this.column }, this.$insertRight);
          this.setPosition(n2.row, n2.column, true);
        }, this.setPosition = function(e3, t3, n2) {
          var r2;
          n2 ? r2 = { row: e3, column: t3 } : r2 = this.$clipPositionToDocument(e3, t3);
          if (this.row == r2.row && this.column == r2.column)
            return;
          var i2 = { row: this.row, column: this.column };
          this.row = r2.row, this.column = r2.column, this._signal("change", { old: i2, value: r2 });
        }, this.detach = function() {
          this.document.off("change", this.$onChange);
        }, this.attach = function(e3) {
          this.document = e3 || this.document, this.document.on("change", this.$onChange);
        }, this.$clipPositionToDocument = function(e3, t3) {
          var n2 = {};
          return e3 >= this.document.getLength() ? (n2.row = Math.max(0, this.document.getLength() - 1), n2.column = this.document.getLine(n2.row).length) : e3 < 0 ? (n2.row = 0, n2.column = 0) : (n2.row = e3, n2.column = Math.min(this.document.getLine(n2.row).length, Math.max(0, t3))), t3 < 0 && (n2.column = 0), n2;
        };
      }).call(s.prototype);
    }), ace.define("ace/document", ["require", "exports", "module", "ace/lib/oop", "ace/apply_delta", "ace/lib/event_emitter", "ace/range", "ace/anchor"], function(e, t, n) {
      "use strict";
      var r = e("./lib/oop"), i = e("./apply_delta").applyDelta, s = e("./lib/event_emitter").EventEmitter, o = e("./range").Range, u = e("./anchor").Anchor, a = function(e2) {
        this.$lines = [""], e2.length === 0 ? this.$lines = [""] : Array.isArray(e2) ? this.insertMergedLines({ row: 0, column: 0 }, e2) : this.insert({ row: 0, column: 0 }, e2);
      };
      (function() {
        r.implement(this, s), this.setValue = function(e2) {
          var t2 = this.getLength() - 1;
          this.remove(new o(0, 0, t2, this.getLine(t2).length)), this.insert({ row: 0, column: 0 }, e2);
        }, this.getValue = function() {
          return this.getAllLines().join(this.getNewLineCharacter());
        }, this.createAnchor = function(e2, t2) {
          return new u(this, e2, t2);
        }, "aaa".split(/a/).length === 0 ? this.$split = function(e2) {
          return e2.replace(/\r\n|\r/g, "\n").split("\n");
        } : this.$split = function(e2) {
          return e2.split(/\r\n|\r|\n/);
        }, this.$detectNewLine = function(e2) {
          var t2 = e2.match(/^.*?(\r\n|\r|\n)/m);
          this.$autoNewLine = t2 ? t2[1] : "\n", this._signal("changeNewLineMode");
        }, this.getNewLineCharacter = function() {
          switch (this.$newLineMode) {
            case "windows":
              return "\r\n";
            case "unix":
              return "\n";
            default:
              return this.$autoNewLine || "\n";
          }
        }, this.$autoNewLine = "", this.$newLineMode = "auto", this.setNewLineMode = function(e2) {
          if (this.$newLineMode === e2)
            return;
          this.$newLineMode = e2, this._signal("changeNewLineMode");
        }, this.getNewLineMode = function() {
          return this.$newLineMode;
        }, this.isNewLine = function(e2) {
          return e2 == "\r\n" || e2 == "\r" || e2 == "\n";
        }, this.getLine = function(e2) {
          return this.$lines[e2] || "";
        }, this.getLines = function(e2, t2) {
          return this.$lines.slice(e2, t2 + 1);
        }, this.getAllLines = function() {
          return this.getLines(0, this.getLength());
        }, this.getLength = function() {
          return this.$lines.length;
        }, this.getTextRange = function(e2) {
          return this.getLinesForRange(e2).join(this.getNewLineCharacter());
        }, this.getLinesForRange = function(e2) {
          var t2;
          if (e2.start.row === e2.end.row)
            t2 = [this.getLine(e2.start.row).substring(e2.start.column, e2.end.column)];
          else {
            t2 = this.getLines(e2.start.row, e2.end.row), t2[0] = (t2[0] || "").substring(e2.start.column);
            var n2 = t2.length - 1;
            e2.end.row - e2.start.row == n2 && (t2[n2] = t2[n2].substring(0, e2.end.column));
          }
          return t2;
        }, this.insertLines = function(e2, t2) {
          return console.warn("Use of document.insertLines is deprecated. Use the insertFullLines method instead."), this.insertFullLines(e2, t2);
        }, this.removeLines = function(e2, t2) {
          return console.warn("Use of document.removeLines is deprecated. Use the removeFullLines method instead."), this.removeFullLines(e2, t2);
        }, this.insertNewLine = function(e2) {
          return console.warn("Use of document.insertNewLine is deprecated. Use insertMergedLines(position, ['', '']) instead."), this.insertMergedLines(e2, ["", ""]);
        }, this.insert = function(e2, t2) {
          return this.getLength() <= 1 && this.$detectNewLine(t2), this.insertMergedLines(e2, this.$split(t2));
        }, this.insertInLine = function(e2, t2) {
          var n2 = this.clippedPos(e2.row, e2.column), r2 = this.pos(e2.row, e2.column + t2.length);
          return this.applyDelta({ start: n2, end: r2, action: "insert", lines: [t2] }, true), this.clonePos(r2);
        }, this.clippedPos = function(e2, t2) {
          var n2 = this.getLength();
          e2 === void 0 ? e2 = n2 : e2 < 0 ? e2 = 0 : e2 >= n2 && (e2 = n2 - 1, t2 = void 0);
          var r2 = this.getLine(e2);
          return t2 == void 0 && (t2 = r2.length), t2 = Math.min(Math.max(t2, 0), r2.length), { row: e2, column: t2 };
        }, this.clonePos = function(e2) {
          return { row: e2.row, column: e2.column };
        }, this.pos = function(e2, t2) {
          return { row: e2, column: t2 };
        }, this.$clipPosition = function(e2) {
          var t2 = this.getLength();
          return e2.row >= t2 ? (e2.row = Math.max(0, t2 - 1), e2.column = this.getLine(t2 - 1).length) : (e2.row = Math.max(0, e2.row), e2.column = Math.min(Math.max(e2.column, 0), this.getLine(e2.row).length)), e2;
        }, this.insertFullLines = function(e2, t2) {
          e2 = Math.min(Math.max(e2, 0), this.getLength());
          var n2 = 0;
          e2 < this.getLength() ? (t2 = t2.concat([""]), n2 = 0) : (t2 = [""].concat(t2), e2--, n2 = this.$lines[e2].length), this.insertMergedLines({ row: e2, column: n2 }, t2);
        }, this.insertMergedLines = function(e2, t2) {
          var n2 = this.clippedPos(e2.row, e2.column), r2 = { row: n2.row + t2.length - 1, column: (t2.length == 1 ? n2.column : 0) + t2[t2.length - 1].length };
          return this.applyDelta({ start: n2, end: r2, action: "insert", lines: t2 }), this.clonePos(r2);
        }, this.remove = function(e2) {
          var t2 = this.clippedPos(e2.start.row, e2.start.column), n2 = this.clippedPos(e2.end.row, e2.end.column);
          return this.applyDelta({ start: t2, end: n2, action: "remove", lines: this.getLinesForRange({ start: t2, end: n2 }) }), this.clonePos(t2);
        }, this.removeInLine = function(e2, t2, n2) {
          var r2 = this.clippedPos(e2, t2), i2 = this.clippedPos(e2, n2);
          return this.applyDelta({ start: r2, end: i2, action: "remove", lines: this.getLinesForRange({ start: r2, end: i2 }) }, true), this.clonePos(r2);
        }, this.removeFullLines = function(e2, t2) {
          e2 = Math.min(Math.max(0, e2), this.getLength() - 1), t2 = Math.min(Math.max(0, t2), this.getLength() - 1);
          var n2 = t2 == this.getLength() - 1 && e2 > 0, r2 = t2 < this.getLength() - 1, i2 = n2 ? e2 - 1 : e2, s2 = n2 ? this.getLine(i2).length : 0, u2 = r2 ? t2 + 1 : t2, a2 = r2 ? 0 : this.getLine(u2).length, f = new o(i2, s2, u2, a2), l = this.$lines.slice(e2, t2 + 1);
          return this.applyDelta({ start: f.start, end: f.end, action: "remove", lines: this.getLinesForRange(f) }), l;
        }, this.removeNewLine = function(e2) {
          e2 < this.getLength() - 1 && e2 >= 0 && this.applyDelta({ start: this.pos(e2, this.getLine(e2).length), end: this.pos(e2 + 1, 0), action: "remove", lines: ["", ""] });
        }, this.replace = function(e2, t2) {
          e2 instanceof o || (e2 = o.fromPoints(e2.start, e2.end));
          if (t2.length === 0 && e2.isEmpty())
            return e2.start;
          if (t2 == this.getTextRange(e2))
            return e2.end;
          this.remove(e2);
          var n2;
          return t2 ? n2 = this.insert(e2.start, t2) : n2 = e2.start, n2;
        }, this.applyDeltas = function(e2) {
          for (var t2 = 0; t2 < e2.length; t2++)
            this.applyDelta(e2[t2]);
        }, this.revertDeltas = function(e2) {
          for (var t2 = e2.length - 1; t2 >= 0; t2--)
            this.revertDelta(e2[t2]);
        }, this.applyDelta = function(e2, t2) {
          var n2 = e2.action == "insert";
          if (n2 ? e2.lines.length <= 1 && !e2.lines[0] : !o.comparePoints(e2.start, e2.end))
            return;
          n2 && e2.lines.length > 2e4 ? this.$splitAndapplyLargeDelta(e2, 2e4) : (i(this.$lines, e2, t2), this._signal("change", e2));
        }, this.$safeApplyDelta = function(e2) {
          var t2 = this.$lines.length;
          (e2.action == "remove" && e2.start.row < t2 && e2.end.row < t2 || e2.action == "insert" && e2.start.row <= t2) && this.applyDelta(e2);
        }, this.$splitAndapplyLargeDelta = function(e2, t2) {
          var n2 = e2.lines, r2 = n2.length - t2 + 1, i2 = e2.start.row, s2 = e2.start.column;
          for (var o2 = 0, u2 = 0; o2 < r2; o2 = u2) {
            u2 += t2 - 1;
            var a2 = n2.slice(o2, u2);
            a2.push(""), this.applyDelta({ start: this.pos(i2 + o2, s2), end: this.pos(i2 + u2, s2 = 0), action: e2.action, lines: a2 }, true);
          }
          e2.lines = n2.slice(o2), e2.start.row = i2 + o2, e2.start.column = s2, this.applyDelta(e2, true);
        }, this.revertDelta = function(e2) {
          this.$safeApplyDelta({ start: this.clonePos(e2.start), end: this.clonePos(e2.end), action: e2.action == "insert" ? "remove" : "insert", lines: e2.lines.slice() });
        }, this.indexToPosition = function(e2, t2) {
          var n2 = this.$lines || this.getAllLines(), r2 = this.getNewLineCharacter().length;
          for (var i2 = t2 || 0, s2 = n2.length; i2 < s2; i2++) {
            e2 -= n2[i2].length + r2;
            if (e2 < 0)
              return { row: i2, column: e2 + n2[i2].length + r2 };
          }
          return { row: s2 - 1, column: e2 + n2[s2 - 1].length + r2 };
        }, this.positionToIndex = function(e2, t2) {
          var n2 = this.$lines || this.getAllLines(), r2 = this.getNewLineCharacter().length, i2 = 0, s2 = Math.min(e2.row, n2.length);
          for (var o2 = t2 || 0; o2 < s2; ++o2)
            i2 += n2[o2].length + r2;
          return i2 + e2.column;
        };
      }).call(a.prototype), t.Document = a;
    }), ace.define("ace/background_tokenizer", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function(e, t, n) {
      "use strict";
      var r = e("./lib/oop"), i = e("./lib/event_emitter").EventEmitter, s = function(e2, t2) {
        this.running = false, this.lines = [], this.states = [], this.currentLine = 0, this.tokenizer = e2;
        var n2 = this;
        this.$worker = function() {
          if (!n2.running)
            return;
          var e3 = new Date(), t3 = n2.currentLine, r2 = -1, i2 = n2.doc, s2 = t3;
          while (n2.lines[t3])
            t3++;
          var o = i2.getLength(), u = 0;
          n2.running = false;
          while (t3 < o) {
            n2.$tokenizeRow(t3), r2 = t3;
            do
              t3++;
            while (n2.lines[t3]);
            u++;
            if (u % 5 === 0 && new Date() - e3 > 20) {
              n2.running = setTimeout(n2.$worker, 20);
              break;
            }
          }
          n2.currentLine = t3, r2 == -1 && (r2 = t3), s2 <= r2 && n2.fireUpdateEvent(s2, r2);
        };
      };
      (function() {
        r.implement(this, i), this.setTokenizer = function(e2) {
          this.tokenizer = e2, this.lines = [], this.states = [], this.start(0);
        }, this.setDocument = function(e2) {
          this.doc = e2, this.lines = [], this.states = [], this.stop();
        }, this.fireUpdateEvent = function(e2, t2) {
          var n2 = { first: e2, last: t2 };
          this._signal("update", { data: n2 });
        }, this.start = function(e2) {
          this.currentLine = Math.min(e2 || 0, this.currentLine, this.doc.getLength()), this.lines.splice(this.currentLine, this.lines.length), this.states.splice(this.currentLine, this.states.length), this.stop(), this.running = setTimeout(this.$worker, 700);
        }, this.scheduleStart = function() {
          this.running || (this.running = setTimeout(this.$worker, 700));
        }, this.$updateOnChange = function(e2) {
          var t2 = e2.start.row, n2 = e2.end.row - t2;
          if (n2 === 0)
            this.lines[t2] = null;
          else if (e2.action == "remove")
            this.lines.splice(t2, n2 + 1, null), this.states.splice(t2, n2 + 1, null);
          else {
            var r2 = Array(n2 + 1);
            r2.unshift(t2, 1), this.lines.splice.apply(this.lines, r2), this.states.splice.apply(this.states, r2);
          }
          this.currentLine = Math.min(t2, this.currentLine, this.doc.getLength()), this.stop();
        }, this.stop = function() {
          this.running && clearTimeout(this.running), this.running = false;
        }, this.getTokens = function(e2) {
          return this.lines[e2] || this.$tokenizeRow(e2);
        }, this.getState = function(e2) {
          return this.currentLine == e2 && this.$tokenizeRow(e2), this.states[e2] || "start";
        }, this.$tokenizeRow = function(e2) {
          var t2 = this.doc.getLine(e2), n2 = this.states[e2 - 1], r2 = this.tokenizer.getLineTokens(t2, n2, e2);
          return this.states[e2] + "" != r2.state + "" ? (this.states[e2] = r2.state, this.lines[e2 + 1] = null, this.currentLine > e2 + 1 && (this.currentLine = e2 + 1)) : this.currentLine == e2 && (this.currentLine = e2 + 1), this.lines[e2] = r2.tokens;
        }, this.cleanup = function() {
          this.running = false, this.lines = [], this.states = [], this.currentLine = 0, this.removeAllListeners();
        };
      }).call(s.prototype), t.BackgroundTokenizer = s;
    }), ace.define("ace/search_highlight", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range"], function(e, t, n) {
      "use strict";
      var r = e("./lib/lang"), i = e("./lib/oop"), s = e("./range").Range, o = function(e2, t2, n2) {
        this.setRegexp(e2), this.clazz = t2, this.type = n2 || "text";
      };
      (function() {
        this.MAX_RANGES = 500, this.setRegexp = function(e2) {
          if (this.regExp + "" == e2 + "")
            return;
          this.regExp = e2, this.cache = [];
        }, this.update = function(e2, t2, n2, i2) {
          if (!this.regExp)
            return;
          var o2 = i2.firstRow, u = i2.lastRow, a = {};
          for (var f = o2; f <= u; f++) {
            var l = this.cache[f];
            l == null && (l = r.getMatchOffsets(n2.getLine(f), this.regExp), l.length > this.MAX_RANGES && (l = l.slice(0, this.MAX_RANGES)), l = l.map(function(e3) {
              return new s(f, e3.offset, f, e3.offset + e3.length);
            }), this.cache[f] = l.length ? l : "");
            for (var c = l.length; c--; ) {
              var h = l[c].toScreenRange(n2), p = h.toString();
              if (a[p])
                continue;
              a[p] = true, t2.drawSingleLineMarker(e2, h, this.clazz, i2);
            }
          }
        };
      }).call(o.prototype), t.SearchHighlight = o;
    }), ace.define("ace/edit_session/fold_line", ["require", "exports", "module", "ace/range"], function(e, t, n) {
      "use strict";
      function i(e2, t2) {
        this.foldData = e2, Array.isArray(t2) ? this.folds = t2 : t2 = this.folds = [t2];
        var n2 = t2[t2.length - 1];
        this.range = new r(t2[0].start.row, t2[0].start.column, n2.end.row, n2.end.column), this.start = this.range.start, this.end = this.range.end, this.folds.forEach(function(e3) {
          e3.setFoldLine(this);
        }, this);
      }
      var r = e("../range").Range;
      (function() {
        this.shiftRow = function(e2) {
          this.start.row += e2, this.end.row += e2, this.folds.forEach(function(t2) {
            t2.start.row += e2, t2.end.row += e2;
          });
        }, this.addFold = function(e2) {
          if (e2.sameRow) {
            if (e2.start.row < this.startRow || e2.endRow > this.endRow)
              throw new Error("Can't add a fold to this FoldLine as it has no connection");
            this.folds.push(e2), this.folds.sort(function(e3, t2) {
              return -e3.range.compareEnd(t2.start.row, t2.start.column);
            }), this.range.compareEnd(e2.start.row, e2.start.column) > 0 ? (this.end.row = e2.end.row, this.end.column = e2.end.column) : this.range.compareStart(e2.end.row, e2.end.column) < 0 && (this.start.row = e2.start.row, this.start.column = e2.start.column);
          } else if (e2.start.row == this.end.row)
            this.folds.push(e2), this.end.row = e2.end.row, this.end.column = e2.end.column;
          else {
            if (e2.end.row != this.start.row)
              throw new Error("Trying to add fold to FoldRow that doesn't have a matching row");
            this.folds.unshift(e2), this.start.row = e2.start.row, this.start.column = e2.start.column;
          }
          e2.foldLine = this;
        }, this.containsRow = function(e2) {
          return e2 >= this.start.row && e2 <= this.end.row;
        }, this.walk = function(e2, t2, n2) {
          var r2 = 0, i2 = this.folds, s, o, u, a = true;
          t2 == null && (t2 = this.end.row, n2 = this.end.column);
          for (var f = 0; f < i2.length; f++) {
            s = i2[f], o = s.range.compareStart(t2, n2);
            if (o == -1) {
              e2(null, t2, n2, r2, a);
              return;
            }
            u = e2(null, s.start.row, s.start.column, r2, a), u = !u && e2(s.placeholder, s.start.row, s.start.column, r2);
            if (u || o === 0)
              return;
            a = !s.sameRow, r2 = s.end.column;
          }
          e2(null, t2, n2, r2, a);
        }, this.getNextFoldTo = function(e2, t2) {
          var n2, r2;
          for (var i2 = 0; i2 < this.folds.length; i2++) {
            n2 = this.folds[i2], r2 = n2.range.compareEnd(e2, t2);
            if (r2 == -1)
              return { fold: n2, kind: "after" };
            if (r2 === 0)
              return { fold: n2, kind: "inside" };
          }
          return null;
        }, this.addRemoveChars = function(e2, t2, n2) {
          var r2 = this.getNextFoldTo(e2, t2), i2, s;
          if (r2) {
            i2 = r2.fold;
            if (r2.kind == "inside" && i2.start.column != t2 && i2.start.row != e2)
              window.console && window.console.log(e2, t2, i2);
            else if (i2.start.row == e2) {
              s = this.folds;
              var o = s.indexOf(i2);
              o === 0 && (this.start.column += n2);
              for (o; o < s.length; o++) {
                i2 = s[o], i2.start.column += n2;
                if (!i2.sameRow)
                  return;
                i2.end.column += n2;
              }
              this.end.column += n2;
            }
          }
        }, this.split = function(e2, t2) {
          var n2 = this.getNextFoldTo(e2, t2);
          if (!n2 || n2.kind == "inside")
            return null;
          var r2 = n2.fold, s = this.folds, o = this.foldData, u = s.indexOf(r2), a = s[u - 1];
          this.end.row = a.end.row, this.end.column = a.end.column, s = s.splice(u, s.length - u);
          var f = new i(o, s);
          return o.splice(o.indexOf(this) + 1, 0, f), f;
        }, this.merge = function(e2) {
          var t2 = e2.folds;
          for (var n2 = 0; n2 < t2.length; n2++)
            this.addFold(t2[n2]);
          var r2 = this.foldData;
          r2.splice(r2.indexOf(e2), 1);
        }, this.toString = function() {
          var e2 = [this.range.toString() + ": ["];
          return this.folds.forEach(function(t2) {
            e2.push("  " + t2.toString());
          }), e2.push("]"), e2.join("\n");
        }, this.idxToPosition = function(e2) {
          var t2 = 0;
          for (var n2 = 0; n2 < this.folds.length; n2++) {
            var r2 = this.folds[n2];
            e2 -= r2.start.column - t2;
            if (e2 < 0)
              return { row: r2.start.row, column: r2.start.column + e2 };
            e2 -= r2.placeholder.length;
            if (e2 < 0)
              return r2.start;
            t2 = r2.end.column;
          }
          return { row: this.end.row, column: this.end.column + e2 };
        };
      }).call(i.prototype), t.FoldLine = i;
    }), ace.define("ace/range_list", ["require", "exports", "module", "ace/range"], function(e, t, n) {
      "use strict";
      var r = e("./range").Range, i = r.comparePoints, s = function() {
        this.ranges = [], this.$bias = 1;
      };
      (function() {
        this.comparePoints = i, this.pointIndex = function(e2, t2, n2) {
          var r2 = this.ranges;
          for (var s2 = n2 || 0; s2 < r2.length; s2++) {
            var o = r2[s2], u = i(e2, o.end);
            if (u > 0)
              continue;
            var a = i(e2, o.start);
            return u === 0 ? t2 && a !== 0 ? -s2 - 2 : s2 : a > 0 || a === 0 && !t2 ? s2 : -s2 - 1;
          }
          return -s2 - 1;
        }, this.add = function(e2) {
          var t2 = !e2.isEmpty(), n2 = this.pointIndex(e2.start, t2);
          n2 < 0 && (n2 = -n2 - 1);
          var r2 = this.pointIndex(e2.end, t2, n2);
          return r2 < 0 ? r2 = -r2 - 1 : r2++, this.ranges.splice(n2, r2 - n2, e2);
        }, this.addList = function(e2) {
          var t2 = [];
          for (var n2 = e2.length; n2--; )
            t2.push.apply(t2, this.add(e2[n2]));
          return t2;
        }, this.substractPoint = function(e2) {
          var t2 = this.pointIndex(e2);
          if (t2 >= 0)
            return this.ranges.splice(t2, 1);
        }, this.merge = function() {
          var e2 = [], t2 = this.ranges;
          t2 = t2.sort(function(e3, t3) {
            return i(e3.start, t3.start);
          });
          var n2 = t2[0], r2;
          for (var s2 = 1; s2 < t2.length; s2++) {
            r2 = n2, n2 = t2[s2];
            var o = i(r2.end, n2.start);
            if (o < 0)
              continue;
            if (o == 0 && !r2.isEmpty() && !n2.isEmpty())
              continue;
            i(r2.end, n2.end) < 0 && (r2.end.row = n2.end.row, r2.end.column = n2.end.column), t2.splice(s2, 1), e2.push(n2), n2 = r2, s2--;
          }
          return this.ranges = t2, e2;
        }, this.contains = function(e2, t2) {
          return this.pointIndex({ row: e2, column: t2 }) >= 0;
        }, this.containsPoint = function(e2) {
          return this.pointIndex(e2) >= 0;
        }, this.rangeAtPoint = function(e2) {
          var t2 = this.pointIndex(e2);
          if (t2 >= 0)
            return this.ranges[t2];
        }, this.clipRows = function(e2, t2) {
          var n2 = this.ranges;
          if (n2[0].start.row > t2 || n2[n2.length - 1].start.row < e2)
            return [];
          var r2 = this.pointIndex({ row: e2, column: 0 });
          r2 < 0 && (r2 = -r2 - 1);
          var i2 = this.pointIndex({ row: t2, column: 0 }, r2);
          i2 < 0 && (i2 = -i2 - 1);
          var s2 = [];
          for (var o = r2; o < i2; o++)
            s2.push(n2[o]);
          return s2;
        }, this.removeAll = function() {
          return this.ranges.splice(0, this.ranges.length);
        }, this.attach = function(e2) {
          this.session && this.detach(), this.session = e2, this.onChange = this.$onChange.bind(this), this.session.on("change", this.onChange);
        }, this.detach = function() {
          if (!this.session)
            return;
          this.session.removeListener("change", this.onChange), this.session = null;
        }, this.$onChange = function(e2) {
          var t2 = e2.start, n2 = e2.end, r2 = t2.row, i2 = n2.row, s2 = this.ranges;
          for (var o = 0, u = s2.length; o < u; o++) {
            var a = s2[o];
            if (a.end.row >= r2)
              break;
          }
          if (e2.action == "insert") {
            var f = i2 - r2, l = -t2.column + n2.column;
            for (; o < u; o++) {
              var a = s2[o];
              if (a.start.row > r2)
                break;
              a.start.row == r2 && a.start.column >= t2.column && (a.start.column == t2.column && this.$bias <= 0 || (a.start.column += l, a.start.row += f));
              if (a.end.row == r2 && a.end.column >= t2.column) {
                if (a.end.column == t2.column && this.$bias < 0)
                  continue;
                a.end.column == t2.column && l > 0 && o < u - 1 && a.end.column > a.start.column && a.end.column == s2[o + 1].start.column && (a.end.column -= l), a.end.column += l, a.end.row += f;
              }
            }
          } else {
            var f = r2 - i2, l = t2.column - n2.column;
            for (; o < u; o++) {
              var a = s2[o];
              if (a.start.row > i2)
                break;
              if (a.end.row < i2 && (r2 < a.end.row || r2 == a.end.row && t2.column < a.end.column))
                a.end.row = r2, a.end.column = t2.column;
              else if (a.end.row == i2)
                if (a.end.column <= n2.column) {
                  if (f || a.end.column > t2.column)
                    a.end.column = t2.column, a.end.row = t2.row;
                } else
                  a.end.column += l, a.end.row += f;
              else
                a.end.row > i2 && (a.end.row += f);
              if (a.start.row < i2 && (r2 < a.start.row || r2 == a.start.row && t2.column < a.start.column))
                a.start.row = r2, a.start.column = t2.column;
              else if (a.start.row == i2)
                if (a.start.column <= n2.column) {
                  if (f || a.start.column > t2.column)
                    a.start.column = t2.column, a.start.row = t2.row;
                } else
                  a.start.column += l, a.start.row += f;
              else
                a.start.row > i2 && (a.start.row += f);
            }
          }
          if (f != 0 && o < u)
            for (; o < u; o++) {
              var a = s2[o];
              a.start.row += f, a.end.row += f;
            }
        };
      }).call(s.prototype), t.RangeList = s;
    }), ace.define("ace/edit_session/fold", ["require", "exports", "module", "ace/range_list", "ace/lib/oop"], function(e, t, n) {
      "use strict";
      function o(e2, t2) {
        e2.row -= t2.row, e2.row == 0 && (e2.column -= t2.column);
      }
      function u(e2, t2) {
        o(e2.start, t2), o(e2.end, t2);
      }
      function a(e2, t2) {
        e2.row == 0 && (e2.column += t2.column), e2.row += t2.row;
      }
      function f(e2, t2) {
        a(e2.start, t2), a(e2.end, t2);
      }
      var r = e("../range_list").RangeList, i = e("../lib/oop"), s = t.Fold = function(e2, t2) {
        this.foldLine = null, this.placeholder = t2, this.range = e2, this.start = e2.start, this.end = e2.end, this.sameRow = e2.start.row == e2.end.row, this.subFolds = this.ranges = [];
      };
      i.inherits(s, r), function() {
        this.toString = function() {
          return '"' + this.placeholder + '" ' + this.range.toString();
        }, this.setFoldLine = function(e2) {
          this.foldLine = e2, this.subFolds.forEach(function(t2) {
            t2.setFoldLine(e2);
          });
        }, this.clone = function() {
          var e2 = this.range.clone(), t2 = new s(e2, this.placeholder);
          return this.subFolds.forEach(function(e3) {
            t2.subFolds.push(e3.clone());
          }), t2.collapseChildren = this.collapseChildren, t2;
        }, this.addSubFold = function(e2) {
          if (this.range.isEqual(e2))
            return;
          u(e2, this.start);
          var t2 = e2.start.row, n2 = e2.start.column;
          for (var r2 = 0, i2 = -1; r2 < this.subFolds.length; r2++) {
            i2 = this.subFolds[r2].range.compare(t2, n2);
            if (i2 != 1)
              break;
          }
          var s2 = this.subFolds[r2], o2 = 0;
          if (i2 == 0) {
            if (s2.range.containsRange(e2))
              return s2.addSubFold(e2);
            o2 = 1;
          }
          var t2 = e2.range.end.row, n2 = e2.range.end.column;
          for (var a2 = r2, i2 = -1; a2 < this.subFolds.length; a2++) {
            i2 = this.subFolds[a2].range.compare(t2, n2);
            if (i2 != 1)
              break;
          }
          i2 == 0 && a2++;
          var f2 = this.subFolds.splice(r2, a2 - r2, e2), l = i2 == 0 ? f2.length - 1 : f2.length;
          for (var c = o2; c < l; c++)
            e2.addSubFold(f2[c]);
          return e2.setFoldLine(this.foldLine), e2;
        }, this.restoreRange = function(e2) {
          return f(e2, this.start);
        };
      }.call(s.prototype);
    }), ace.define("ace/edit_session/folding", ["require", "exports", "module", "ace/range", "ace/edit_session/fold_line", "ace/edit_session/fold", "ace/token_iterator"], function(e, t, n) {
      "use strict";
      function u() {
        this.getFoldAt = function(e2, t2, n2) {
          var r2 = this.getFoldLine(e2);
          if (!r2)
            return null;
          var i2 = r2.folds;
          for (var s2 = 0; s2 < i2.length; s2++) {
            var o2 = i2[s2].range;
            if (o2.contains(e2, t2)) {
              if (n2 == 1 && o2.isEnd(e2, t2) && !o2.isEmpty())
                continue;
              if (n2 == -1 && o2.isStart(e2, t2) && !o2.isEmpty())
                continue;
              return i2[s2];
            }
          }
        }, this.getFoldsInRange = function(e2) {
          var t2 = e2.start, n2 = e2.end, r2 = this.$foldData, i2 = [];
          t2.column += 1, n2.column -= 1;
          for (var s2 = 0; s2 < r2.length; s2++) {
            var o2 = r2[s2].range.compareRange(e2);
            if (o2 == 2)
              continue;
            if (o2 == -2)
              break;
            var u2 = r2[s2].folds;
            for (var a = 0; a < u2.length; a++) {
              var f = u2[a];
              o2 = f.range.compareRange(e2);
              if (o2 == -2)
                break;
              if (o2 == 2)
                continue;
              if (o2 == 42)
                break;
              i2.push(f);
            }
          }
          return t2.column -= 1, n2.column += 1, i2;
        }, this.getFoldsInRangeList = function(e2) {
          if (Array.isArray(e2)) {
            var t2 = [];
            e2.forEach(function(e3) {
              t2 = t2.concat(this.getFoldsInRange(e3));
            }, this);
          } else
            var t2 = this.getFoldsInRange(e2);
          return t2;
        }, this.getAllFolds = function() {
          var e2 = [], t2 = this.$foldData;
          for (var n2 = 0; n2 < t2.length; n2++)
            for (var r2 = 0; r2 < t2[n2].folds.length; r2++)
              e2.push(t2[n2].folds[r2]);
          return e2;
        }, this.getFoldStringAt = function(e2, t2, n2, r2) {
          r2 = r2 || this.getFoldLine(e2);
          if (!r2)
            return null;
          var i2 = { end: { column: 0 } }, s2, o2;
          for (var u2 = 0; u2 < r2.folds.length; u2++) {
            o2 = r2.folds[u2];
            var a = o2.range.compareEnd(e2, t2);
            if (a == -1) {
              s2 = this.getLine(o2.start.row).substring(i2.end.column, o2.start.column);
              break;
            }
            if (a === 0)
              return null;
            i2 = o2;
          }
          return s2 || (s2 = this.getLine(o2.start.row).substring(i2.end.column)), n2 == -1 ? s2.substring(0, t2 - i2.end.column) : n2 == 1 ? s2.substring(t2 - i2.end.column) : s2;
        }, this.getFoldLine = function(e2, t2) {
          var n2 = this.$foldData, r2 = 0;
          t2 && (r2 = n2.indexOf(t2)), r2 == -1 && (r2 = 0);
          for (r2; r2 < n2.length; r2++) {
            var i2 = n2[r2];
            if (i2.start.row <= e2 && i2.end.row >= e2)
              return i2;
            if (i2.end.row > e2)
              return null;
          }
          return null;
        }, this.getNextFoldLine = function(e2, t2) {
          var n2 = this.$foldData, r2 = 0;
          t2 && (r2 = n2.indexOf(t2)), r2 == -1 && (r2 = 0);
          for (r2; r2 < n2.length; r2++) {
            var i2 = n2[r2];
            if (i2.end.row >= e2)
              return i2;
          }
          return null;
        }, this.getFoldedRowCount = function(e2, t2) {
          var n2 = this.$foldData, r2 = t2 - e2 + 1;
          for (var i2 = 0; i2 < n2.length; i2++) {
            var s2 = n2[i2], o2 = s2.end.row, u2 = s2.start.row;
            if (o2 >= t2) {
              u2 < t2 && (u2 >= e2 ? r2 -= t2 - u2 : r2 = 0);
              break;
            }
            o2 >= e2 && (u2 >= e2 ? r2 -= o2 - u2 : r2 -= o2 - e2 + 1);
          }
          return r2;
        }, this.$addFoldLine = function(e2) {
          return this.$foldData.push(e2), this.$foldData.sort(function(e3, t2) {
            return e3.start.row - t2.start.row;
          }), e2;
        }, this.addFold = function(e2, t2) {
          var n2 = this.$foldData, r2 = false, o2;
          e2 instanceof s ? o2 = e2 : (o2 = new s(t2, e2), o2.collapseChildren = t2.collapseChildren), this.$clipRangeToDocument(o2.range);
          var u2 = o2.start.row, a = o2.start.column, f = o2.end.row, l = o2.end.column, c = this.getFoldAt(u2, a, 1), h = this.getFoldAt(f, l, -1);
          if (c && h == c)
            return c.addSubFold(o2);
          c && !c.range.isStart(u2, a) && this.removeFold(c), h && !h.range.isEnd(f, l) && this.removeFold(h);
          var p = this.getFoldsInRange(o2.range);
          p.length > 0 && (this.removeFolds(p), o2.collapseChildren || p.forEach(function(e3) {
            o2.addSubFold(e3);
          }));
          for (var d = 0; d < n2.length; d++) {
            var v = n2[d];
            if (f == v.start.row) {
              v.addFold(o2), r2 = true;
              break;
            }
            if (u2 == v.end.row) {
              v.addFold(o2), r2 = true;
              if (!o2.sameRow) {
                var m = n2[d + 1];
                if (m && m.start.row == f) {
                  v.merge(m);
                  break;
                }
              }
              break;
            }
            if (f <= v.start.row)
              break;
          }
          return r2 || (v = this.$addFoldLine(new i(this.$foldData, o2))), this.$useWrapMode ? this.$updateWrapData(v.start.row, v.start.row) : this.$updateRowLengthCache(v.start.row, v.start.row), this.$modified = true, this._signal("changeFold", { data: o2, action: "add" }), o2;
        }, this.addFolds = function(e2) {
          e2.forEach(function(e3) {
            this.addFold(e3);
          }, this);
        }, this.removeFold = function(e2) {
          var t2 = e2.foldLine, n2 = t2.start.row, r2 = t2.end.row, i2 = this.$foldData, s2 = t2.folds;
          if (s2.length == 1)
            i2.splice(i2.indexOf(t2), 1);
          else if (t2.range.isEnd(e2.end.row, e2.end.column))
            s2.pop(), t2.end.row = s2[s2.length - 1].end.row, t2.end.column = s2[s2.length - 1].end.column;
          else if (t2.range.isStart(e2.start.row, e2.start.column))
            s2.shift(), t2.start.row = s2[0].start.row, t2.start.column = s2[0].start.column;
          else if (e2.sameRow)
            s2.splice(s2.indexOf(e2), 1);
          else {
            var o2 = t2.split(e2.start.row, e2.start.column);
            s2 = o2.folds, s2.shift(), o2.start.row = s2[0].start.row, o2.start.column = s2[0].start.column;
          }
          this.$updating || (this.$useWrapMode ? this.$updateWrapData(n2, r2) : this.$updateRowLengthCache(n2, r2)), this.$modified = true, this._signal("changeFold", { data: e2, action: "remove" });
        }, this.removeFolds = function(e2) {
          var t2 = [];
          for (var n2 = 0; n2 < e2.length; n2++)
            t2.push(e2[n2]);
          t2.forEach(function(e3) {
            this.removeFold(e3);
          }, this), this.$modified = true;
        }, this.expandFold = function(e2) {
          this.removeFold(e2), e2.subFolds.forEach(function(t2) {
            e2.restoreRange(t2), this.addFold(t2);
          }, this), e2.collapseChildren > 0 && this.foldAll(e2.start.row + 1, e2.end.row, e2.collapseChildren - 1), e2.subFolds = [];
        }, this.expandFolds = function(e2) {
          e2.forEach(function(e3) {
            this.expandFold(e3);
          }, this);
        }, this.unfold = function(e2, t2) {
          var n2, i2;
          if (e2 == null)
            n2 = new r(0, 0, this.getLength(), 0), t2 == null && (t2 = true);
          else if (typeof e2 == "number")
            n2 = new r(e2, 0, e2, this.getLine(e2).length);
          else if ("row" in e2)
            n2 = r.fromPoints(e2, e2);
          else {
            if (Array.isArray(e2))
              return i2 = [], e2.forEach(function(e3) {
                i2 = i2.concat(this.unfold(e3));
              }, this), i2;
            n2 = e2;
          }
          i2 = this.getFoldsInRangeList(n2);
          var s2 = i2;
          while (i2.length == 1 && r.comparePoints(i2[0].start, n2.start) < 0 && r.comparePoints(i2[0].end, n2.end) > 0)
            this.expandFolds(i2), i2 = this.getFoldsInRangeList(n2);
          t2 != 0 ? this.removeFolds(i2) : this.expandFolds(i2);
          if (s2.length)
            return s2;
        }, this.isRowFolded = function(e2, t2) {
          return !!this.getFoldLine(e2, t2);
        }, this.getRowFoldEnd = function(e2, t2) {
          var n2 = this.getFoldLine(e2, t2);
          return n2 ? n2.end.row : e2;
        }, this.getRowFoldStart = function(e2, t2) {
          var n2 = this.getFoldLine(e2, t2);
          return n2 ? n2.start.row : e2;
        }, this.getFoldDisplayLine = function(e2, t2, n2, r2, i2) {
          r2 == null && (r2 = e2.start.row), i2 == null && (i2 = 0), t2 == null && (t2 = e2.end.row), n2 == null && (n2 = this.getLine(t2).length);
          var s2 = this.doc, o2 = "";
          return e2.walk(function(e3, t3, n3, u2) {
            if (t3 < r2)
              return;
            if (t3 == r2) {
              if (n3 < i2)
                return;
              u2 = Math.max(i2, u2);
            }
            e3 != null ? o2 += e3 : o2 += s2.getLine(t3).substring(u2, n3);
          }, t2, n2), o2;
        }, this.getDisplayLine = function(e2, t2, n2, r2) {
          var i2 = this.getFoldLine(e2);
          if (!i2) {
            var s2;
            return s2 = this.doc.getLine(e2), s2.substring(r2 || 0, t2 || s2.length);
          }
          return this.getFoldDisplayLine(i2, e2, t2, n2, r2);
        }, this.$cloneFoldData = function() {
          var e2 = [];
          return e2 = this.$foldData.map(function(t2) {
            var n2 = t2.folds.map(function(e3) {
              return e3.clone();
            });
            return new i(e2, n2);
          }), e2;
        }, this.toggleFold = function(e2) {
          var t2 = this.selection, n2 = t2.getRange(), r2, i2;
          if (n2.isEmpty()) {
            var s2 = n2.start;
            r2 = this.getFoldAt(s2.row, s2.column);
            if (r2) {
              this.expandFold(r2);
              return;
            }
            (i2 = this.findMatchingBracket(s2)) ? n2.comparePoint(i2) == 1 ? n2.end = i2 : (n2.start = i2, n2.start.column++, n2.end.column--) : (i2 = this.findMatchingBracket({ row: s2.row, column: s2.column + 1 })) ? (n2.comparePoint(i2) == 1 ? n2.end = i2 : n2.start = i2, n2.start.column++) : n2 = this.getCommentFoldRange(s2.row, s2.column) || n2;
          } else {
            var o2 = this.getFoldsInRange(n2);
            if (e2 && o2.length) {
              this.expandFolds(o2);
              return;
            }
            o2.length == 1 && (r2 = o2[0]);
          }
          r2 || (r2 = this.getFoldAt(n2.start.row, n2.start.column));
          if (r2 && r2.range.toString() == n2.toString()) {
            this.expandFold(r2);
            return;
          }
          var u2 = "...";
          if (!n2.isMultiLine()) {
            u2 = this.getTextRange(n2);
            if (u2.length < 4)
              return;
            u2 = u2.trim().substring(0, 2) + "..";
          }
          this.addFold(u2, n2);
        }, this.getCommentFoldRange = function(e2, t2, n2) {
          var i2 = new o(this, e2, t2), s2 = i2.getCurrentToken(), u2 = s2 && s2.type;
          if (s2 && /^comment|string/.test(u2)) {
            u2 = u2.match(/comment|string/)[0], u2 == "comment" && (u2 += "|doc-start");
            var a = new RegExp(u2), f = new r();
            if (n2 != 1) {
              do
                s2 = i2.stepBackward();
              while (s2 && a.test(s2.type));
              i2.stepForward();
            }
            f.start.row = i2.getCurrentTokenRow(), f.start.column = i2.getCurrentTokenColumn() + 2, i2 = new o(this, e2, t2);
            if (n2 != -1) {
              var l = -1;
              do {
                s2 = i2.stepForward();
                if (l == -1) {
                  var c = this.getState(i2.$row);
                  a.test(c) || (l = i2.$row);
                } else if (i2.$row > l)
                  break;
              } while (s2 && a.test(s2.type));
              s2 = i2.stepBackward();
            } else
              s2 = i2.getCurrentToken();
            return f.end.row = i2.getCurrentTokenRow(), f.end.column = i2.getCurrentTokenColumn() + s2.value.length - 2, f;
          }
        }, this.foldAll = function(e2, t2, n2, r2) {
          n2 == void 0 && (n2 = 1e5);
          var i2 = this.foldWidgets;
          if (!i2)
            return;
          t2 = t2 || this.getLength(), e2 = e2 || 0;
          for (var s2 = e2; s2 < t2; s2++) {
            i2[s2] == null && (i2[s2] = this.getFoldWidget(s2));
            if (i2[s2] != "start")
              continue;
            if (r2 && !r2(s2))
              continue;
            var o2 = this.getFoldWidgetRange(s2);
            o2 && o2.isMultiLine() && o2.end.row <= t2 && o2.start.row >= e2 && (s2 = o2.end.row, o2.collapseChildren = n2, this.addFold("...", o2));
          }
        }, this.foldToLevel = function(e2) {
          this.foldAll();
          while (e2-- > 0)
            this.unfold(null, false);
        }, this.foldAllComments = function() {
          var e2 = this;
          this.foldAll(null, null, null, function(t2) {
            var n2 = e2.getTokens(t2);
            for (var r2 = 0; r2 < n2.length; r2++) {
              var i2 = n2[r2];
              if (i2.type == "text" && /^\s+$/.test(i2.value))
                continue;
              return /comment/.test(i2.type) ? true : false;
            }
          });
        }, this.$foldStyles = { manual: 1, markbegin: 1, markbeginend: 1 }, this.$foldStyle = "markbegin", this.setFoldStyle = function(e2) {
          if (!this.$foldStyles[e2])
            throw new Error("invalid fold style: " + e2 + "[" + Object.keys(this.$foldStyles).join(", ") + "]");
          if (this.$foldStyle == e2)
            return;
          this.$foldStyle = e2, e2 == "manual" && this.unfold();
          var t2 = this.$foldMode;
          this.$setFolding(null), this.$setFolding(t2);
        }, this.$setFolding = function(e2) {
          if (this.$foldMode == e2)
            return;
          this.$foldMode = e2, this.off("change", this.$updateFoldWidgets), this.off("tokenizerUpdate", this.$tokenizerUpdateFoldWidgets), this._signal("changeAnnotation");
          if (!e2 || this.$foldStyle == "manual") {
            this.foldWidgets = null;
            return;
          }
          this.foldWidgets = [], this.getFoldWidget = e2.getFoldWidget.bind(e2, this, this.$foldStyle), this.getFoldWidgetRange = e2.getFoldWidgetRange.bind(e2, this, this.$foldStyle), this.$updateFoldWidgets = this.updateFoldWidgets.bind(this), this.$tokenizerUpdateFoldWidgets = this.tokenizerUpdateFoldWidgets.bind(this), this.on("change", this.$updateFoldWidgets), this.on("tokenizerUpdate", this.$tokenizerUpdateFoldWidgets);
        }, this.getParentFoldRangeData = function(e2, t2) {
          var n2 = this.foldWidgets;
          if (!n2 || t2 && n2[e2])
            return {};
          var r2 = e2 - 1, i2;
          while (r2 >= 0) {
            var s2 = n2[r2];
            s2 == null && (s2 = n2[r2] = this.getFoldWidget(r2));
            if (s2 == "start") {
              var o2 = this.getFoldWidgetRange(r2);
              i2 || (i2 = o2);
              if (o2 && o2.end.row >= e2)
                break;
            }
            r2--;
          }
          return { range: r2 !== -1 && o2, firstRange: i2 };
        }, this.onFoldWidgetClick = function(e2, t2) {
          t2 = t2.domEvent;
          var n2 = { children: t2.shiftKey, all: t2.ctrlKey || t2.metaKey, siblings: t2.altKey }, r2 = this.$toggleFoldWidget(e2, n2);
          if (!r2) {
            var i2 = t2.target || t2.srcElement;
            i2 && /ace_fold-widget/.test(i2.className) && (i2.className += " ace_invalid");
          }
        }, this.$toggleFoldWidget = function(e2, t2) {
          if (!this.getFoldWidget)
            return;
          var n2 = this.getFoldWidget(e2), r2 = this.getLine(e2), i2 = n2 === "end" ? -1 : 1, s2 = this.getFoldAt(e2, i2 === -1 ? 0 : r2.length, i2);
          if (s2)
            return t2.children || t2.all ? this.removeFold(s2) : this.expandFold(s2), s2;
          var o2 = this.getFoldWidgetRange(e2, true);
          if (o2 && !o2.isMultiLine()) {
            s2 = this.getFoldAt(o2.start.row, o2.start.column, 1);
            if (s2 && o2.isEqual(s2.range))
              return this.removeFold(s2), s2;
          }
          if (t2.siblings) {
            var u2 = this.getParentFoldRangeData(e2);
            if (u2.range)
              var a = u2.range.start.row + 1, f = u2.range.end.row;
            this.foldAll(a, f, t2.all ? 1e4 : 0);
          } else
            t2.children ? (f = o2 ? o2.end.row : this.getLength(), this.foldAll(e2 + 1, f, t2.all ? 1e4 : 0)) : o2 && (t2.all && (o2.collapseChildren = 1e4), this.addFold("...", o2));
          return o2;
        }, this.toggleFoldWidget = function(e2) {
          var t2 = this.selection.getCursor().row;
          t2 = this.getRowFoldStart(t2);
          var n2 = this.$toggleFoldWidget(t2, {});
          if (n2)
            return;
          var r2 = this.getParentFoldRangeData(t2, true);
          n2 = r2.range || r2.firstRange;
          if (n2) {
            t2 = n2.start.row;
            var i2 = this.getFoldAt(t2, this.getLine(t2).length, 1);
            i2 ? this.removeFold(i2) : this.addFold("...", n2);
          }
        }, this.updateFoldWidgets = function(e2) {
          var t2 = e2.start.row, n2 = e2.end.row - t2;
          if (n2 === 0)
            this.foldWidgets[t2] = null;
          else if (e2.action == "remove")
            this.foldWidgets.splice(t2, n2 + 1, null);
          else {
            var r2 = Array(n2 + 1);
            r2.unshift(t2, 1), this.foldWidgets.splice.apply(this.foldWidgets, r2);
          }
        }, this.tokenizerUpdateFoldWidgets = function(e2) {
          var t2 = e2.data;
          t2.first != t2.last && this.foldWidgets.length > t2.first && this.foldWidgets.splice(t2.first, this.foldWidgets.length);
        };
      }
      var r = e("../range").Range, i = e("./fold_line").FoldLine, s = e("./fold").Fold, o = e("../token_iterator").TokenIterator;
      t.Folding = u;
    }), ace.define("ace/edit_session/bracket_match", ["require", "exports", "module", "ace/token_iterator", "ace/range"], function(e, t, n) {
      "use strict";
      function s() {
        this.findMatchingBracket = function(e2, t2) {
          if (e2.column == 0)
            return null;
          var n2 = t2 || this.getLine(e2.row).charAt(e2.column - 1);
          if (n2 == "")
            return null;
          var r2 = n2.match(/([\(\[\{])|([\)\]\}])/);
          return r2 ? r2[1] ? this.$findClosingBracket(r2[1], e2) : this.$findOpeningBracket(r2[2], e2) : null;
        }, this.getBracketRange = function(e2) {
          var t2 = this.getLine(e2.row), n2 = true, r2, s2 = t2.charAt(e2.column - 1), o = s2 && s2.match(/([\(\[\{])|([\)\]\}])/);
          o || (s2 = t2.charAt(e2.column), e2 = { row: e2.row, column: e2.column + 1 }, o = s2 && s2.match(/([\(\[\{])|([\)\]\}])/), n2 = false);
          if (!o)
            return null;
          if (o[1]) {
            var u = this.$findClosingBracket(o[1], e2);
            if (!u)
              return null;
            r2 = i.fromPoints(e2, u), n2 || (r2.end.column++, r2.start.column--), r2.cursor = r2.end;
          } else {
            var u = this.$findOpeningBracket(o[2], e2);
            if (!u)
              return null;
            r2 = i.fromPoints(u, e2), n2 || (r2.start.column++, r2.end.column--), r2.cursor = r2.start;
          }
          return r2;
        }, this.getMatchingBracketRanges = function(e2) {
          var t2 = this.getLine(e2.row), n2 = t2.charAt(e2.column - 1), r2 = n2 && n2.match(/([\(\[\{])|([\)\]\}])/);
          r2 || (n2 = t2.charAt(e2.column), e2 = { row: e2.row, column: e2.column + 1 }, r2 = n2 && n2.match(/([\(\[\{])|([\)\]\}])/));
          if (!r2)
            return null;
          var s2 = new i(e2.row, e2.column - 1, e2.row, e2.column), o = r2[1] ? this.$findClosingBracket(r2[1], e2) : this.$findOpeningBracket(r2[2], e2);
          if (!o)
            return [s2];
          var u = new i(o.row, o.column, o.row, o.column + 1);
          return [s2, u];
        }, this.$brackets = { ")": "(", "(": ")", "]": "[", "[": "]", "{": "}", "}": "{", "<": ">", ">": "<" }, this.$findOpeningBracket = function(e2, t2, n2) {
          var i2 = this.$brackets[e2], s2 = 1, o = new r(this, t2.row, t2.column), u = o.getCurrentToken();
          u || (u = o.stepForward());
          if (!u)
            return;
          n2 || (n2 = new RegExp("(\\.?" + u.type.replace(".", "\\.").replace("rparen", ".paren").replace(/\b(?:end)\b/, "(?:start|begin|end)") + ")+"));
          var a = t2.column - o.getCurrentTokenColumn() - 2, f = u.value;
          for (; ; ) {
            while (a >= 0) {
              var l = f.charAt(a);
              if (l == i2) {
                s2 -= 1;
                if (s2 == 0)
                  return { row: o.getCurrentTokenRow(), column: a + o.getCurrentTokenColumn() };
              } else
                l == e2 && (s2 += 1);
              a -= 1;
            }
            do
              u = o.stepBackward();
            while (u && !n2.test(u.type));
            if (u == null)
              break;
            f = u.value, a = f.length - 1;
          }
          return null;
        }, this.$findClosingBracket = function(e2, t2, n2) {
          var i2 = this.$brackets[e2], s2 = 1, o = new r(this, t2.row, t2.column), u = o.getCurrentToken();
          u || (u = o.stepForward());
          if (!u)
            return;
          n2 || (n2 = new RegExp("(\\.?" + u.type.replace(".", "\\.").replace("lparen", ".paren").replace(/\b(?:start|begin)\b/, "(?:start|begin|end)") + ")+"));
          var a = t2.column - o.getCurrentTokenColumn();
          for (; ; ) {
            var f = u.value, l = f.length;
            while (a < l) {
              var c = f.charAt(a);
              if (c == i2) {
                s2 -= 1;
                if (s2 == 0)
                  return { row: o.getCurrentTokenRow(), column: a + o.getCurrentTokenColumn() };
              } else
                c == e2 && (s2 += 1);
              a += 1;
            }
            do
              u = o.stepForward();
            while (u && !n2.test(u.type));
            if (u == null)
              break;
            a = 0;
          }
          return null;
        };
      }
      var r = e("../token_iterator").TokenIterator, i = e("../range").Range;
      t.BracketMatch = s;
    }), ace.define("ace/edit_session", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/bidihandler", "ace/config", "ace/lib/event_emitter", "ace/selection", "ace/mode/text", "ace/range", "ace/document", "ace/background_tokenizer", "ace/search_highlight", "ace/edit_session/folding", "ace/edit_session/bracket_match"], function(e, t, n) {
      "use strict";
      var r = e("./lib/oop"), i = e("./lib/lang"), s = e("./bidihandler").BidiHandler, o = e("./config"), u = e("./lib/event_emitter").EventEmitter, a = e("./selection").Selection, f = e("./mode/text").Mode, l = e("./range").Range, c = e("./document").Document, h = e("./background_tokenizer").BackgroundTokenizer, p = e("./search_highlight").SearchHighlight, d = function(e2, t2) {
        this.$breakpoints = [], this.$decorations = [], this.$frontMarkers = {}, this.$backMarkers = {}, this.$markerId = 1, this.$undoSelect = true, this.$foldData = [], this.id = "session" + ++d.$uid, this.$foldData.toString = function() {
          return this.join("\n");
        }, this.bgTokenizer = new h(new f().getTokenizer(), this);
        var n2 = this;
        this.bgTokenizer.on("update", function(e3) {
          n2._signal("tokenizerUpdate", e3);
        }), this.on("changeFold", this.onChangeFold.bind(this)), this.$onChange = this.onChange.bind(this);
        if (typeof e2 != "object" || !e2.getLine)
          e2 = new c(e2);
        this.setDocument(e2), this.selection = new a(this), this.$bidiHandler = new s(this), o.resetOptions(this), this.setMode(t2), o._signal("session", this), this.destroyed = false;
      };
      d.$uid = 0, function() {
        function v(e3) {
          return e3 < 4352 ? false : e3 >= 4352 && e3 <= 4447 || e3 >= 4515 && e3 <= 4519 || e3 >= 4602 && e3 <= 4607 || e3 >= 9001 && e3 <= 9002 || e3 >= 11904 && e3 <= 11929 || e3 >= 11931 && e3 <= 12019 || e3 >= 12032 && e3 <= 12245 || e3 >= 12272 && e3 <= 12283 || e3 >= 12288 && e3 <= 12350 || e3 >= 12353 && e3 <= 12438 || e3 >= 12441 && e3 <= 12543 || e3 >= 12549 && e3 <= 12589 || e3 >= 12593 && e3 <= 12686 || e3 >= 12688 && e3 <= 12730 || e3 >= 12736 && e3 <= 12771 || e3 >= 12784 && e3 <= 12830 || e3 >= 12832 && e3 <= 12871 || e3 >= 12880 && e3 <= 13054 || e3 >= 13056 && e3 <= 19903 || e3 >= 19968 && e3 <= 42124 || e3 >= 42128 && e3 <= 42182 || e3 >= 43360 && e3 <= 43388 || e3 >= 44032 && e3 <= 55203 || e3 >= 55216 && e3 <= 55238 || e3 >= 55243 && e3 <= 55291 || e3 >= 63744 && e3 <= 64255 || e3 >= 65040 && e3 <= 65049 || e3 >= 65072 && e3 <= 65106 || e3 >= 65108 && e3 <= 65126 || e3 >= 65128 && e3 <= 65131 || e3 >= 65281 && e3 <= 65376 || e3 >= 65504 && e3 <= 65510;
        }
        r.implement(this, u), this.setDocument = function(e3) {
          this.doc && this.doc.off("change", this.$onChange), this.doc = e3, e3.on("change", this.$onChange, true), this.bgTokenizer.setDocument(this.getDocument()), this.resetCaches();
        }, this.getDocument = function() {
          return this.doc;
        }, this.$resetRowCache = function(e3) {
          if (!e3) {
            this.$docRowCache = [], this.$screenRowCache = [];
            return;
          }
          var t3 = this.$docRowCache.length, n3 = this.$getRowCacheIndex(this.$docRowCache, e3) + 1;
          t3 > n3 && (this.$docRowCache.splice(n3, t3), this.$screenRowCache.splice(n3, t3));
        }, this.$getRowCacheIndex = function(e3, t3) {
          var n3 = 0, r2 = e3.length - 1;
          while (n3 <= r2) {
            var i2 = n3 + r2 >> 1, s3 = e3[i2];
            if (t3 > s3)
              n3 = i2 + 1;
            else {
              if (!(t3 < s3))
                return i2;
              r2 = i2 - 1;
            }
          }
          return n3 - 1;
        }, this.resetCaches = function() {
          this.$modified = true, this.$wrapData = [], this.$rowLengthCache = [], this.$resetRowCache(0), this.destroyed || this.bgTokenizer.start(0);
        }, this.onChangeFold = function(e3) {
          var t3 = e3.data;
          this.$resetRowCache(t3.start.row);
        }, this.onChange = function(e3) {
          this.$modified = true, this.$bidiHandler.onChange(e3), this.$resetRowCache(e3.start.row);
          var t3 = this.$updateInternalDataOnChange(e3);
          !this.$fromUndo && this.$undoManager && (t3 && t3.length && (this.$undoManager.add({ action: "removeFolds", folds: t3 }, this.mergeUndoDeltas), this.mergeUndoDeltas = true), this.$undoManager.add(e3, this.mergeUndoDeltas), this.mergeUndoDeltas = true, this.$informUndoManager.schedule()), this.bgTokenizer.$updateOnChange(e3), this._signal("change", e3);
        }, this.setValue = function(e3) {
          this.doc.setValue(e3), this.selection.moveTo(0, 0), this.$resetRowCache(0), this.setUndoManager(this.$undoManager), this.getUndoManager().reset();
        }, this.getValue = this.toString = function() {
          return this.doc.getValue();
        }, this.getSelection = function() {
          return this.selection;
        }, this.getState = function(e3) {
          return this.bgTokenizer.getState(e3);
        }, this.getTokens = function(e3) {
          return this.bgTokenizer.getTokens(e3);
        }, this.getTokenAt = function(e3, t3) {
          var n3 = this.bgTokenizer.getTokens(e3), r2, i2 = 0;
          if (t3 == null) {
            var s3 = n3.length - 1;
            i2 = this.getLine(e3).length;
          } else
            for (var s3 = 0; s3 < n3.length; s3++) {
              i2 += n3[s3].value.length;
              if (i2 >= t3)
                break;
            }
          return r2 = n3[s3], r2 ? (r2.index = s3, r2.start = i2 - r2.value.length, r2) : null;
        }, this.setUndoManager = function(e3) {
          this.$undoManager = e3, this.$informUndoManager && this.$informUndoManager.cancel();
          if (e3) {
            var t3 = this;
            e3.addSession(this), this.$syncInformUndoManager = function() {
              t3.$informUndoManager.cancel(), t3.mergeUndoDeltas = false;
            }, this.$informUndoManager = i.delayedCall(this.$syncInformUndoManager);
          } else
            this.$syncInformUndoManager = function() {
            };
        }, this.markUndoGroup = function() {
          this.$syncInformUndoManager && this.$syncInformUndoManager();
        }, this.$defaultUndoManager = { undo: function() {
        }, redo: function() {
        }, hasUndo: function() {
        }, hasRedo: function() {
        }, reset: function() {
        }, add: function() {
        }, addSelection: function() {
        }, startNewGroup: function() {
        }, addSession: function() {
        } }, this.getUndoManager = function() {
          return this.$undoManager || this.$defaultUndoManager;
        }, this.getTabString = function() {
          return this.getUseSoftTabs() ? i.stringRepeat(" ", this.getTabSize()) : "	";
        }, this.setUseSoftTabs = function(e3) {
          this.setOption("useSoftTabs", e3);
        }, this.getUseSoftTabs = function() {
          return this.$useSoftTabs && !this.$mode.$indentWithTabs;
        }, this.setTabSize = function(e3) {
          this.setOption("tabSize", e3);
        }, this.getTabSize = function() {
          return this.$tabSize;
        }, this.isTabStop = function(e3) {
          return this.$useSoftTabs && e3.column % this.$tabSize === 0;
        }, this.setNavigateWithinSoftTabs = function(e3) {
          this.setOption("navigateWithinSoftTabs", e3);
        }, this.getNavigateWithinSoftTabs = function() {
          return this.$navigateWithinSoftTabs;
        }, this.$overwrite = false, this.setOverwrite = function(e3) {
          this.setOption("overwrite", e3);
        }, this.getOverwrite = function() {
          return this.$overwrite;
        }, this.toggleOverwrite = function() {
          this.setOverwrite(!this.$overwrite);
        }, this.addGutterDecoration = function(e3, t3) {
          this.$decorations[e3] || (this.$decorations[e3] = ""), this.$decorations[e3] += " " + t3, this._signal("changeBreakpoint", {});
        }, this.removeGutterDecoration = function(e3, t3) {
          this.$decorations[e3] = (this.$decorations[e3] || "").replace(" " + t3, ""), this._signal("changeBreakpoint", {});
        }, this.getBreakpoints = function() {
          return this.$breakpoints;
        }, this.setBreakpoints = function(e3) {
          this.$breakpoints = [];
          for (var t3 = 0; t3 < e3.length; t3++)
            this.$breakpoints[e3[t3]] = "ace_breakpoint";
          this._signal("changeBreakpoint", {});
        }, this.clearBreakpoints = function() {
          this.$breakpoints = [], this._signal("changeBreakpoint", {});
        }, this.setBreakpoint = function(e3, t3) {
          t3 === void 0 && (t3 = "ace_breakpoint"), t3 ? this.$breakpoints[e3] = t3 : delete this.$breakpoints[e3], this._signal("changeBreakpoint", {});
        }, this.clearBreakpoint = function(e3) {
          delete this.$breakpoints[e3], this._signal("changeBreakpoint", {});
        }, this.addMarker = function(e3, t3, n3, r2) {
          var i2 = this.$markerId++, s3 = { range: e3, type: n3 || "line", renderer: typeof n3 == "function" ? n3 : null, clazz: t3, inFront: !!r2, id: i2 };
          return r2 ? (this.$frontMarkers[i2] = s3, this._signal("changeFrontMarker")) : (this.$backMarkers[i2] = s3, this._signal("changeBackMarker")), i2;
        }, this.addDynamicMarker = function(e3, t3) {
          if (!e3.update)
            return;
          var n3 = this.$markerId++;
          return e3.id = n3, e3.inFront = !!t3, t3 ? (this.$frontMarkers[n3] = e3, this._signal("changeFrontMarker")) : (this.$backMarkers[n3] = e3, this._signal("changeBackMarker")), e3;
        }, this.removeMarker = function(e3) {
          var t3 = this.$frontMarkers[e3] || this.$backMarkers[e3];
          if (!t3)
            return;
          var n3 = t3.inFront ? this.$frontMarkers : this.$backMarkers;
          delete n3[e3], this._signal(t3.inFront ? "changeFrontMarker" : "changeBackMarker");
        }, this.getMarkers = function(e3) {
          return e3 ? this.$frontMarkers : this.$backMarkers;
        }, this.highlight = function(e3) {
          if (!this.$searchHighlight) {
            var t3 = new p(null, "ace_selected-word", "text");
            this.$searchHighlight = this.addDynamicMarker(t3);
          }
          this.$searchHighlight.setRegexp(e3);
        }, this.highlightLines = function(e3, t3, n3, r2) {
          typeof t3 != "number" && (n3 = t3, t3 = e3), n3 || (n3 = "ace_step");
          var i2 = new l(e3, 0, t3, Infinity);
          return i2.id = this.addMarker(i2, n3, "fullLine", r2), i2;
        }, this.setAnnotations = function(e3) {
          this.$annotations = e3, this._signal("changeAnnotation", {});
        }, this.getAnnotations = function() {
          return this.$annotations || [];
        }, this.clearAnnotations = function() {
          this.setAnnotations([]);
        }, this.$detectNewLine = function(e3) {
          var t3 = e3.match(/^.*?(\r?\n)/m);
          t3 ? this.$autoNewLine = t3[1] : this.$autoNewLine = "\n";
        }, this.getWordRange = function(e3, t3) {
          var n3 = this.getLine(e3), r2 = false;
          t3 > 0 && (r2 = !!n3.charAt(t3 - 1).match(this.tokenRe)), r2 || (r2 = !!n3.charAt(t3).match(this.tokenRe));
          if (r2)
            var i2 = this.tokenRe;
          else if (/^\s+$/.test(n3.slice(t3 - 1, t3 + 1)))
            var i2 = /\s/;
          else
            var i2 = this.nonTokenRe;
          var s3 = t3;
          if (s3 > 0) {
            do
              s3--;
            while (s3 >= 0 && n3.charAt(s3).match(i2));
            s3++;
          }
          var o2 = t3;
          while (o2 < n3.length && n3.charAt(o2).match(i2))
            o2++;
          return new l(e3, s3, e3, o2);
        }, this.getAWordRange = function(e3, t3) {
          var n3 = this.getWordRange(e3, t3), r2 = this.getLine(n3.end.row);
          while (r2.charAt(n3.end.column).match(/[ \t]/))
            n3.end.column += 1;
          return n3;
        }, this.setNewLineMode = function(e3) {
          this.doc.setNewLineMode(e3);
        }, this.getNewLineMode = function() {
          return this.doc.getNewLineMode();
        }, this.setUseWorker = function(e3) {
          this.setOption("useWorker", e3);
        }, this.getUseWorker = function() {
          return this.$useWorker;
        }, this.onReloadTokenizer = function(e3) {
          var t3 = e3.data;
          this.bgTokenizer.start(t3.first), this._signal("tokenizerUpdate", e3);
        }, this.$modes = o.$modes, this.$mode = null, this.$modeId = null, this.setMode = function(e3, t3) {
          if (e3 && typeof e3 == "object") {
            if (e3.getTokenizer)
              return this.$onChangeMode(e3);
            var n3 = e3, r2 = n3.path;
          } else
            r2 = e3 || "ace/mode/text";
          this.$modes["ace/mode/text"] || (this.$modes["ace/mode/text"] = new f());
          if (this.$modes[r2] && !n3) {
            this.$onChangeMode(this.$modes[r2]), t3 && t3();
            return;
          }
          this.$modeId = r2, o.loadModule(["mode", r2], function(e4) {
            if (this.$modeId !== r2)
              return t3 && t3();
            this.$modes[r2] && !n3 ? this.$onChangeMode(this.$modes[r2]) : e4 && e4.Mode && (e4 = new e4.Mode(n3), n3 || (this.$modes[r2] = e4, e4.$id = r2), this.$onChangeMode(e4)), t3 && t3();
          }.bind(this)), this.$mode || this.$onChangeMode(this.$modes["ace/mode/text"], true);
        }, this.$onChangeMode = function(e3, t3) {
          t3 || (this.$modeId = e3.$id);
          if (this.$mode === e3)
            return;
          var n3 = this.$mode;
          this.$mode = e3, this.$stopWorker(), this.$useWorker && this.$startWorker();
          var r2 = e3.getTokenizer();
          if (r2.on !== void 0) {
            var i2 = this.onReloadTokenizer.bind(this);
            r2.on("update", i2);
          }
          this.bgTokenizer.setTokenizer(r2), this.bgTokenizer.setDocument(this.getDocument()), this.tokenRe = e3.tokenRe, this.nonTokenRe = e3.nonTokenRe, t3 || (e3.attachToSession && e3.attachToSession(this), this.$options.wrapMethod.set.call(this, this.$wrapMethod), this.$setFolding(e3.foldingRules), this.bgTokenizer.start(0), this._emit("changeMode", { oldMode: n3, mode: e3 }));
        }, this.$stopWorker = function() {
          this.$worker && (this.$worker.terminate(), this.$worker = null);
        }, this.$startWorker = function() {
          try {
            this.$worker = this.$mode.createWorker(this);
          } catch (e3) {
            o.warn("Could not load worker", e3), this.$worker = null;
          }
        }, this.getMode = function() {
          return this.$mode;
        }, this.$scrollTop = 0, this.setScrollTop = function(e3) {
          if (this.$scrollTop === e3 || isNaN(e3))
            return;
          this.$scrollTop = e3, this._signal("changeScrollTop", e3);
        }, this.getScrollTop = function() {
          return this.$scrollTop;
        }, this.$scrollLeft = 0, this.setScrollLeft = function(e3) {
          if (this.$scrollLeft === e3 || isNaN(e3))
            return;
          this.$scrollLeft = e3, this._signal("changeScrollLeft", e3);
        }, this.getScrollLeft = function() {
          return this.$scrollLeft;
        }, this.getScreenWidth = function() {
          return this.$computeWidth(), this.lineWidgets ? Math.max(this.getLineWidgetMaxWidth(), this.screenWidth) : this.screenWidth;
        }, this.getLineWidgetMaxWidth = function() {
          if (this.lineWidgetsWidth != null)
            return this.lineWidgetsWidth;
          var e3 = 0;
          return this.lineWidgets.forEach(function(t3) {
            t3 && t3.screenWidth > e3 && (e3 = t3.screenWidth);
          }), this.lineWidgetWidth = e3;
        }, this.$computeWidth = function(e3) {
          if (this.$modified || e3) {
            this.$modified = false;
            if (this.$useWrapMode)
              return this.screenWidth = this.$wrapLimit;
            var t3 = this.doc.getAllLines(), n3 = this.$rowLengthCache, r2 = 0, i2 = 0, s3 = this.$foldData[i2], o2 = s3 ? s3.start.row : Infinity, u2 = t3.length;
            for (var a3 = 0; a3 < u2; a3++) {
              if (a3 > o2) {
                a3 = s3.end.row + 1;
                if (a3 >= u2)
                  break;
                s3 = this.$foldData[i2++], o2 = s3 ? s3.start.row : Infinity;
              }
              n3[a3] == null && (n3[a3] = this.$getStringScreenWidth(t3[a3])[0]), n3[a3] > r2 && (r2 = n3[a3]);
            }
            this.screenWidth = r2;
          }
        }, this.getLine = function(e3) {
          return this.doc.getLine(e3);
        }, this.getLines = function(e3, t3) {
          return this.doc.getLines(e3, t3);
        }, this.getLength = function() {
          return this.doc.getLength();
        }, this.getTextRange = function(e3) {
          return this.doc.getTextRange(e3 || this.selection.getRange());
        }, this.insert = function(e3, t3) {
          return this.doc.insert(e3, t3);
        }, this.remove = function(e3) {
          return this.doc.remove(e3);
        }, this.removeFullLines = function(e3, t3) {
          return this.doc.removeFullLines(e3, t3);
        }, this.undoChanges = function(e3, t3) {
          if (!e3.length)
            return;
          this.$fromUndo = true;
          for (var n3 = e3.length - 1; n3 != -1; n3--) {
            var r2 = e3[n3];
            r2.action == "insert" || r2.action == "remove" ? this.doc.revertDelta(r2) : r2.folds && this.addFolds(r2.folds);
          }
          !t3 && this.$undoSelect && (e3.selectionBefore ? this.selection.fromJSON(e3.selectionBefore) : this.selection.setRange(this.$getUndoSelection(e3, true))), this.$fromUndo = false;
        }, this.redoChanges = function(e3, t3) {
          if (!e3.length)
            return;
          this.$fromUndo = true;
          for (var n3 = 0; n3 < e3.length; n3++) {
            var r2 = e3[n3];
            (r2.action == "insert" || r2.action == "remove") && this.doc.$safeApplyDelta(r2);
          }
          !t3 && this.$undoSelect && (e3.selectionAfter ? this.selection.fromJSON(e3.selectionAfter) : this.selection.setRange(this.$getUndoSelection(e3, false))), this.$fromUndo = false;
        }, this.setUndoSelect = function(e3) {
          this.$undoSelect = e3;
        }, this.$getUndoSelection = function(e3, t3) {
          function n3(e4) {
            return t3 ? e4.action !== "insert" : e4.action === "insert";
          }
          var r2, i2;
          for (var s3 = 0; s3 < e3.length; s3++) {
            var o2 = e3[s3];
            if (!o2.start)
              continue;
            if (!r2) {
              n3(o2) ? r2 = l.fromPoints(o2.start, o2.end) : r2 = l.fromPoints(o2.start, o2.start);
              continue;
            }
            n3(o2) ? (i2 = o2.start, r2.compare(i2.row, i2.column) == -1 && r2.setStart(i2), i2 = o2.end, r2.compare(i2.row, i2.column) == 1 && r2.setEnd(i2)) : (i2 = o2.start, r2.compare(i2.row, i2.column) == -1 && (r2 = l.fromPoints(o2.start, o2.start)));
          }
          return r2;
        }, this.replace = function(e3, t3) {
          return this.doc.replace(e3, t3);
        }, this.moveText = function(e3, t3, n3) {
          var r2 = this.getTextRange(e3), i2 = this.getFoldsInRange(e3), s3 = l.fromPoints(t3, t3);
          if (!n3) {
            this.remove(e3);
            var o2 = e3.start.row - e3.end.row, u2 = o2 ? -e3.end.column : e3.start.column - e3.end.column;
            u2 && (s3.start.row == e3.end.row && s3.start.column > e3.end.column && (s3.start.column += u2), s3.end.row == e3.end.row && s3.end.column > e3.end.column && (s3.end.column += u2)), o2 && s3.start.row >= e3.end.row && (s3.start.row += o2, s3.end.row += o2);
          }
          s3.end = this.insert(s3.start, r2);
          if (i2.length) {
            var a3 = e3.start, f2 = s3.start, o2 = f2.row - a3.row, u2 = f2.column - a3.column;
            this.addFolds(i2.map(function(e4) {
              return e4 = e4.clone(), e4.start.row == a3.row && (e4.start.column += u2), e4.end.row == a3.row && (e4.end.column += u2), e4.start.row += o2, e4.end.row += o2, e4;
            }));
          }
          return s3;
        }, this.indentRows = function(e3, t3, n3) {
          n3 = n3.replace(/\t/g, this.getTabString());
          for (var r2 = e3; r2 <= t3; r2++)
            this.doc.insertInLine({ row: r2, column: 0 }, n3);
        }, this.outdentRows = function(e3) {
          var t3 = e3.collapseRows(), n3 = new l(0, 0, 0, 0), r2 = this.getTabSize();
          for (var i2 = t3.start.row; i2 <= t3.end.row; ++i2) {
            var s3 = this.getLine(i2);
            n3.start.row = i2, n3.end.row = i2;
            for (var o2 = 0; o2 < r2; ++o2)
              if (s3.charAt(o2) != " ")
                break;
            o2 < r2 && s3.charAt(o2) == "	" ? (n3.start.column = o2, n3.end.column = o2 + 1) : (n3.start.column = 0, n3.end.column = o2), this.remove(n3);
          }
        }, this.$moveLines = function(e3, t3, n3) {
          e3 = this.getRowFoldStart(e3), t3 = this.getRowFoldEnd(t3);
          if (n3 < 0) {
            var r2 = this.getRowFoldStart(e3 + n3);
            if (r2 < 0)
              return 0;
            var i2 = r2 - e3;
          } else if (n3 > 0) {
            var r2 = this.getRowFoldEnd(t3 + n3);
            if (r2 > this.doc.getLength() - 1)
              return 0;
            var i2 = r2 - t3;
          } else {
            e3 = this.$clipRowToDocument(e3), t3 = this.$clipRowToDocument(t3);
            var i2 = t3 - e3 + 1;
          }
          var s3 = new l(e3, 0, t3, Number.MAX_VALUE), o2 = this.getFoldsInRange(s3).map(function(e4) {
            return e4 = e4.clone(), e4.start.row += i2, e4.end.row += i2, e4;
          }), u2 = n3 == 0 ? this.doc.getLines(e3, t3) : this.doc.removeFullLines(e3, t3);
          return this.doc.insertFullLines(e3 + i2, u2), o2.length && this.addFolds(o2), i2;
        }, this.moveLinesUp = function(e3, t3) {
          return this.$moveLines(e3, t3, -1);
        }, this.moveLinesDown = function(e3, t3) {
          return this.$moveLines(e3, t3, 1);
        }, this.duplicateLines = function(e3, t3) {
          return this.$moveLines(e3, t3, 0);
        }, this.$clipRowToDocument = function(e3) {
          return Math.max(0, Math.min(e3, this.doc.getLength() - 1));
        }, this.$clipColumnToRow = function(e3, t3) {
          return t3 < 0 ? 0 : Math.min(this.doc.getLine(e3).length, t3);
        }, this.$clipPositionToDocument = function(e3, t3) {
          t3 = Math.max(0, t3);
          if (e3 < 0)
            e3 = 0, t3 = 0;
          else {
            var n3 = this.doc.getLength();
            e3 >= n3 ? (e3 = n3 - 1, t3 = this.doc.getLine(n3 - 1).length) : t3 = Math.min(this.doc.getLine(e3).length, t3);
          }
          return { row: e3, column: t3 };
        }, this.$clipRangeToDocument = function(e3) {
          e3.start.row < 0 ? (e3.start.row = 0, e3.start.column = 0) : e3.start.column = this.$clipColumnToRow(e3.start.row, e3.start.column);
          var t3 = this.doc.getLength() - 1;
          return e3.end.row > t3 ? (e3.end.row = t3, e3.end.column = this.doc.getLine(t3).length) : e3.end.column = this.$clipColumnToRow(e3.end.row, e3.end.column), e3;
        }, this.$wrapLimit = 80, this.$useWrapMode = false, this.$wrapLimitRange = { min: null, max: null }, this.setUseWrapMode = function(e3) {
          if (e3 != this.$useWrapMode) {
            this.$useWrapMode = e3, this.$modified = true, this.$resetRowCache(0);
            if (e3) {
              var t3 = this.getLength();
              this.$wrapData = Array(t3), this.$updateWrapData(0, t3 - 1);
            }
            this._signal("changeWrapMode");
          }
        }, this.getUseWrapMode = function() {
          return this.$useWrapMode;
        }, this.setWrapLimitRange = function(e3, t3) {
          if (this.$wrapLimitRange.min !== e3 || this.$wrapLimitRange.max !== t3)
            this.$wrapLimitRange = { min: e3, max: t3 }, this.$modified = true, this.$bidiHandler.markAsDirty(), this.$useWrapMode && this._signal("changeWrapMode");
        }, this.adjustWrapLimit = function(e3, t3) {
          var n3 = this.$wrapLimitRange;
          n3.max < 0 && (n3 = { min: t3, max: t3 });
          var r2 = this.$constrainWrapLimit(e3, n3.min, n3.max);
          return r2 != this.$wrapLimit && r2 > 1 ? (this.$wrapLimit = r2, this.$modified = true, this.$useWrapMode && (this.$updateWrapData(0, this.getLength() - 1), this.$resetRowCache(0), this._signal("changeWrapLimit")), true) : false;
        }, this.$constrainWrapLimit = function(e3, t3, n3) {
          return t3 && (e3 = Math.max(t3, e3)), n3 && (e3 = Math.min(n3, e3)), e3;
        }, this.getWrapLimit = function() {
          return this.$wrapLimit;
        }, this.setWrapLimit = function(e3) {
          this.setWrapLimitRange(e3, e3);
        }, this.getWrapLimitRange = function() {
          return { min: this.$wrapLimitRange.min, max: this.$wrapLimitRange.max };
        }, this.$updateInternalDataOnChange = function(e3) {
          var t3 = this.$useWrapMode, n3 = e3.action, r2 = e3.start, i2 = e3.end, s3 = r2.row, o2 = i2.row, u2 = o2 - s3, a3 = null;
          this.$updating = true;
          if (u2 != 0)
            if (n3 === "remove") {
              this[t3 ? "$wrapData" : "$rowLengthCache"].splice(s3, u2);
              var f2 = this.$foldData;
              a3 = this.getFoldsInRange(e3), this.removeFolds(a3);
              var l2 = this.getFoldLine(i2.row), c3 = 0;
              if (l2) {
                l2.addRemoveChars(i2.row, i2.column, r2.column - i2.column), l2.shiftRow(-u2);
                var h3 = this.getFoldLine(s3);
                h3 && h3 !== l2 && (h3.merge(l2), l2 = h3), c3 = f2.indexOf(l2) + 1;
              }
              for (c3; c3 < f2.length; c3++) {
                var l2 = f2[c3];
                l2.start.row >= i2.row && l2.shiftRow(-u2);
              }
              o2 = s3;
            } else {
              var p2 = Array(u2);
              p2.unshift(s3, 0);
              var d3 = t3 ? this.$wrapData : this.$rowLengthCache;
              d3.splice.apply(d3, p2);
              var f2 = this.$foldData, l2 = this.getFoldLine(s3), c3 = 0;
              if (l2) {
                var v2 = l2.range.compareInside(r2.row, r2.column);
                v2 == 0 ? (l2 = l2.split(r2.row, r2.column), l2 && (l2.shiftRow(u2), l2.addRemoveChars(o2, 0, i2.column - r2.column))) : v2 == -1 && (l2.addRemoveChars(s3, 0, i2.column - r2.column), l2.shiftRow(u2)), c3 = f2.indexOf(l2) + 1;
              }
              for (c3; c3 < f2.length; c3++) {
                var l2 = f2[c3];
                l2.start.row >= s3 && l2.shiftRow(u2);
              }
            }
          else {
            u2 = Math.abs(e3.start.column - e3.end.column), n3 === "remove" && (a3 = this.getFoldsInRange(e3), this.removeFolds(a3), u2 = -u2);
            var l2 = this.getFoldLine(s3);
            l2 && l2.addRemoveChars(s3, r2.column, u2);
          }
          return t3 && this.$wrapData.length != this.doc.getLength() && console.error("doc.getLength() and $wrapData.length have to be the same!"), this.$updating = false, t3 ? this.$updateWrapData(s3, o2) : this.$updateRowLengthCache(s3, o2), a3;
        }, this.$updateRowLengthCache = function(e3, t3, n3) {
          this.$rowLengthCache[e3] = null, this.$rowLengthCache[t3] = null;
        }, this.$updateWrapData = function(e3, t3) {
          var r2 = this.doc.getAllLines(), i2 = this.getTabSize(), o2 = this.$wrapData, u2 = this.$wrapLimit, a3, f2, l2 = e3;
          t3 = Math.min(t3, r2.length - 1);
          while (l2 <= t3)
            f2 = this.getFoldLine(l2, f2), f2 ? (a3 = [], f2.walk(function(e4, t4, i3, o3) {
              var u3;
              if (e4 != null) {
                u3 = this.$getDisplayTokens(e4, a3.length), u3[0] = n2;
                for (var f3 = 1; f3 < u3.length; f3++)
                  u3[f3] = s2;
              } else
                u3 = this.$getDisplayTokens(r2[t4].substring(o3, i3), a3.length);
              a3 = a3.concat(u3);
            }.bind(this), f2.end.row, r2[f2.end.row].length + 1), o2[f2.start.row] = this.$computeWrapSplits(a3, u2, i2), l2 = f2.end.row + 1) : (a3 = this.$getDisplayTokens(r2[l2]), o2[l2] = this.$computeWrapSplits(a3, u2, i2), l2++);
        };
        var e2 = 1, t2 = 2, n2 = 3, s2 = 4, a2 = 9, c2 = 10, h2 = 11, d2 = 12;
        this.$computeWrapSplits = function(e3, r2, i2) {
          function g() {
            var t3 = 0;
            if (m === 0)
              return t3;
            if (v2)
              for (var n3 = 0; n3 < e3.length; n3++) {
                var r3 = e3[n3];
                if (r3 == c2)
                  t3 += 1;
                else {
                  if (r3 != h2) {
                    if (r3 == d2)
                      continue;
                    break;
                  }
                  t3 += i2;
                }
              }
            return p2 && v2 !== false && (t3 += i2), Math.min(t3, m);
          }
          function y(t3) {
            var n3 = t3 - f2;
            for (var r3 = f2; r3 < t3; r3++) {
              var i3 = e3[r3];
              if (i3 === 12 || i3 === 2)
                n3 -= 1;
            }
            o2.length || (b = g(), o2.indent = b), l2 += n3, o2.push(l2), f2 = t3;
          }
          if (e3.length == 0)
            return [];
          var o2 = [], u2 = e3.length, f2 = 0, l2 = 0, p2 = this.$wrapAsCode, v2 = this.$indentedSoftWrap, m = r2 <= Math.max(2 * i2, 8) || v2 === false ? 0 : Math.floor(r2 / 2), b = 0;
          while (u2 - f2 > r2 - b) {
            var w = f2 + r2 - b;
            if (e3[w - 1] >= c2 && e3[w] >= c2) {
              y(w);
              continue;
            }
            if (e3[w] == n2 || e3[w] == s2) {
              for (w; w != f2 - 1; w--)
                if (e3[w] == n2)
                  break;
              if (w > f2) {
                y(w);
                continue;
              }
              w = f2 + r2;
              for (w; w < e3.length; w++)
                if (e3[w] != s2)
                  break;
              if (w == e3.length)
                break;
              y(w);
              continue;
            }
            var E = Math.max(w - (r2 - (r2 >> 2)), f2 - 1);
            while (w > E && e3[w] < n2)
              w--;
            if (p2) {
              while (w > E && e3[w] < n2)
                w--;
              while (w > E && e3[w] == a2)
                w--;
            } else
              while (w > E && e3[w] < c2)
                w--;
            if (w > E) {
              y(++w);
              continue;
            }
            w = f2 + r2, e3[w] == t2 && w--, y(w - b);
          }
          return o2;
        }, this.$getDisplayTokens = function(n3, r2) {
          var i2 = [], s3;
          r2 = r2 || 0;
          for (var o2 = 0; o2 < n3.length; o2++) {
            var u2 = n3.charCodeAt(o2);
            if (u2 == 9) {
              s3 = this.getScreenTabSize(i2.length + r2), i2.push(h2);
              for (var f2 = 1; f2 < s3; f2++)
                i2.push(d2);
            } else
              u2 == 32 ? i2.push(c2) : u2 > 39 && u2 < 48 || u2 > 57 && u2 < 64 ? i2.push(a2) : u2 >= 4352 && v(u2) ? i2.push(e2, t2) : i2.push(e2);
          }
          return i2;
        }, this.$getStringScreenWidth = function(e3, t3, n3) {
          if (t3 == 0)
            return [0, 0];
          t3 == null && (t3 = Infinity), n3 = n3 || 0;
          var r2, i2;
          for (i2 = 0; i2 < e3.length; i2++) {
            r2 = e3.charCodeAt(i2), r2 == 9 ? n3 += this.getScreenTabSize(n3) : r2 >= 4352 && v(r2) ? n3 += 2 : n3 += 1;
            if (n3 > t3)
              break;
          }
          return [n3, i2];
        }, this.lineWidgets = null, this.getRowLength = function(e3) {
          var t3 = 1;
          return this.lineWidgets && (t3 += this.lineWidgets[e3] && this.lineWidgets[e3].rowCount || 0), !this.$useWrapMode || !this.$wrapData[e3] ? t3 : this.$wrapData[e3].length + t3;
        }, this.getRowLineCount = function(e3) {
          return !this.$useWrapMode || !this.$wrapData[e3] ? 1 : this.$wrapData[e3].length + 1;
        }, this.getRowWrapIndent = function(e3) {
          if (this.$useWrapMode) {
            var t3 = this.screenToDocumentPosition(e3, Number.MAX_VALUE), n3 = this.$wrapData[t3.row];
            return n3.length && n3[0] < t3.column ? n3.indent : 0;
          }
          return 0;
        }, this.getScreenLastRowColumn = function(e3) {
          var t3 = this.screenToDocumentPosition(e3, Number.MAX_VALUE);
          return this.documentToScreenColumn(t3.row, t3.column);
        }, this.getDocumentLastRowColumn = function(e3, t3) {
          var n3 = this.documentToScreenRow(e3, t3);
          return this.getScreenLastRowColumn(n3);
        }, this.getDocumentLastRowColumnPosition = function(e3, t3) {
          var n3 = this.documentToScreenRow(e3, t3);
          return this.screenToDocumentPosition(n3, Number.MAX_VALUE / 10);
        }, this.getRowSplitData = function(e3) {
          return this.$useWrapMode ? this.$wrapData[e3] : void 0;
        }, this.getScreenTabSize = function(e3) {
          return this.$tabSize - (e3 % this.$tabSize | 0);
        }, this.screenToDocumentRow = function(e3, t3) {
          return this.screenToDocumentPosition(e3, t3).row;
        }, this.screenToDocumentColumn = function(e3, t3) {
          return this.screenToDocumentPosition(e3, t3).column;
        }, this.screenToDocumentPosition = function(e3, t3, n3) {
          if (e3 < 0)
            return { row: 0, column: 0 };
          var r2, i2 = 0, s3 = 0, o2, u2 = 0, a3 = 0, f2 = this.$screenRowCache, l2 = this.$getRowCacheIndex(f2, e3), c3 = f2.length;
          if (c3 && l2 >= 0)
            var u2 = f2[l2], i2 = this.$docRowCache[l2], h3 = e3 > f2[c3 - 1];
          else
            var h3 = !c3;
          var p2 = this.getLength() - 1, d3 = this.getNextFoldLine(i2), v2 = d3 ? d3.start.row : Infinity;
          while (u2 <= e3) {
            a3 = this.getRowLength(i2);
            if (u2 + a3 > e3 || i2 >= p2)
              break;
            u2 += a3, i2++, i2 > v2 && (i2 = d3.end.row + 1, d3 = this.getNextFoldLine(i2, d3), v2 = d3 ? d3.start.row : Infinity), h3 && (this.$docRowCache.push(i2), this.$screenRowCache.push(u2));
          }
          if (d3 && d3.start.row <= i2)
            r2 = this.getFoldDisplayLine(d3), i2 = d3.start.row;
          else {
            if (u2 + a3 <= e3 || i2 > p2)
              return { row: p2, column: this.getLine(p2).length };
            r2 = this.getLine(i2), d3 = null;
          }
          var m = 0, g = Math.floor(e3 - u2);
          if (this.$useWrapMode) {
            var y = this.$wrapData[i2];
            y && (o2 = y[g], g > 0 && y.length && (m = y.indent, s3 = y[g - 1] || y[y.length - 1], r2 = r2.substring(s3)));
          }
          return n3 !== void 0 && this.$bidiHandler.isBidiRow(u2 + g, i2, g) && (t3 = this.$bidiHandler.offsetToCol(n3)), s3 += this.$getStringScreenWidth(r2, t3 - m)[1], this.$useWrapMode && s3 >= o2 && (s3 = o2 - 1), d3 ? d3.idxToPosition(s3) : { row: i2, column: s3 };
        }, this.documentToScreenPosition = function(e3, t3) {
          if (typeof t3 == "undefined")
            var n3 = this.$clipPositionToDocument(e3.row, e3.column);
          else
            n3 = this.$clipPositionToDocument(e3, t3);
          e3 = n3.row, t3 = n3.column;
          var r2 = 0, i2 = null, s3 = null;
          s3 = this.getFoldAt(e3, t3, 1), s3 && (e3 = s3.start.row, t3 = s3.start.column);
          var o2, u2 = 0, a3 = this.$docRowCache, f2 = this.$getRowCacheIndex(a3, e3), l2 = a3.length;
          if (l2 && f2 >= 0)
            var u2 = a3[f2], r2 = this.$screenRowCache[f2], c3 = e3 > a3[l2 - 1];
          else
            var c3 = !l2;
          var h3 = this.getNextFoldLine(u2), p2 = h3 ? h3.start.row : Infinity;
          while (u2 < e3) {
            if (u2 >= p2) {
              o2 = h3.end.row + 1;
              if (o2 > e3)
                break;
              h3 = this.getNextFoldLine(o2, h3), p2 = h3 ? h3.start.row : Infinity;
            } else
              o2 = u2 + 1;
            r2 += this.getRowLength(u2), u2 = o2, c3 && (this.$docRowCache.push(u2), this.$screenRowCache.push(r2));
          }
          var d3 = "";
          h3 && u2 >= p2 ? (d3 = this.getFoldDisplayLine(h3, e3, t3), i2 = h3.start.row) : (d3 = this.getLine(e3).substring(0, t3), i2 = e3);
          var v2 = 0;
          if (this.$useWrapMode) {
            var m = this.$wrapData[i2];
            if (m) {
              var g = 0;
              while (d3.length >= m[g])
                r2++, g++;
              d3 = d3.substring(m[g - 1] || 0, d3.length), v2 = g > 0 ? m.indent : 0;
            }
          }
          return this.lineWidgets && this.lineWidgets[u2] && this.lineWidgets[u2].rowsAbove && (r2 += this.lineWidgets[u2].rowsAbove), { row: r2, column: v2 + this.$getStringScreenWidth(d3)[0] };
        }, this.documentToScreenColumn = function(e3, t3) {
          return this.documentToScreenPosition(e3, t3).column;
        }, this.documentToScreenRow = function(e3, t3) {
          return this.documentToScreenPosition(e3, t3).row;
        }, this.getScreenLength = function() {
          var e3 = 0, t3 = null;
          if (!this.$useWrapMode) {
            e3 = this.getLength();
            var n3 = this.$foldData;
            for (var r2 = 0; r2 < n3.length; r2++)
              t3 = n3[r2], e3 -= t3.end.row - t3.start.row;
          } else {
            var i2 = this.$wrapData.length, s3 = 0, r2 = 0, t3 = this.$foldData[r2++], o2 = t3 ? t3.start.row : Infinity;
            while (s3 < i2) {
              var u2 = this.$wrapData[s3];
              e3 += u2 ? u2.length + 1 : 1, s3++, s3 > o2 && (s3 = t3.end.row + 1, t3 = this.$foldData[r2++], o2 = t3 ? t3.start.row : Infinity);
            }
          }
          return this.lineWidgets && (e3 += this.$getWidgetScreenLength()), e3;
        }, this.$setFontMetrics = function(e3) {
          if (!this.$enableVarChar)
            return;
          this.$getStringScreenWidth = function(t3, n3, r2) {
            if (n3 === 0)
              return [0, 0];
            n3 || (n3 = Infinity), r2 = r2 || 0;
            var i2, s3;
            for (s3 = 0; s3 < t3.length; s3++) {
              i2 = t3.charAt(s3), i2 === "	" ? r2 += this.getScreenTabSize(r2) : r2 += e3.getCharacterWidth(i2);
              if (r2 > n3)
                break;
            }
            return [r2, s3];
          };
        }, this.destroy = function() {
          this.destroyed || (this.bgTokenizer.setDocument(null), this.bgTokenizer.cleanup(), this.destroyed = true), this.$stopWorker(), this.removeAllListeners(), this.doc && this.doc.off("change", this.$onChange), this.selection.detach();
        }, this.isFullWidth = v;
      }.call(d.prototype), e("./edit_session/folding").Folding.call(d.prototype), e("./edit_session/bracket_match").BracketMatch.call(d.prototype), o.defineOptions(d.prototype, "session", { wrap: { set: function(e2) {
        !e2 || e2 == "off" ? e2 = false : e2 == "free" ? e2 = true : e2 == "printMargin" ? e2 = -1 : typeof e2 == "string" && (e2 = parseInt(e2, 10) || false);
        if (this.$wrap == e2)
          return;
        this.$wrap = e2;
        if (!e2)
          this.setUseWrapMode(false);
        else {
          var t2 = typeof e2 == "number" ? e2 : null;
          this.setWrapLimitRange(t2, t2), this.setUseWrapMode(true);
        }
      }, get: function() {
        return this.getUseWrapMode() ? this.$wrap == -1 ? "printMargin" : this.getWrapLimitRange().min ? this.$wrap : "free" : "off";
      }, handlesSet: true }, wrapMethod: { set: function(e2) {
        e2 = e2 == "auto" ? this.$mode.type != "text" : e2 != "text", e2 != this.$wrapAsCode && (this.$wrapAsCode = e2, this.$useWrapMode && (this.$useWrapMode = false, this.setUseWrapMode(true)));
      }, initialValue: "auto" }, indentedSoftWrap: { set: function() {
        this.$useWrapMode && (this.$useWrapMode = false, this.setUseWrapMode(true));
      }, initialValue: true }, firstLineNumber: { set: function() {
        this._signal("changeBreakpoint");
      }, initialValue: 1 }, useWorker: { set: function(e2) {
        this.$useWorker = e2, this.$stopWorker(), e2 && this.$startWorker();
      }, initialValue: true }, useSoftTabs: { initialValue: true }, tabSize: { set: function(e2) {
        e2 = parseInt(e2), e2 > 0 && this.$tabSize !== e2 && (this.$modified = true, this.$rowLengthCache = [], this.$tabSize = e2, this._signal("changeTabSize"));
      }, initialValue: 4, handlesSet: true }, navigateWithinSoftTabs: { initialValue: false }, foldStyle: { set: function(e2) {
        this.setFoldStyle(e2);
      }, handlesSet: true }, overwrite: { set: function(e2) {
        this._signal("changeOverwrite");
      }, initialValue: false }, newLineMode: { set: function(e2) {
        this.doc.setNewLineMode(e2);
      }, get: function() {
        return this.doc.getNewLineMode();
      }, handlesSet: true }, mode: { set: function(e2) {
        this.setMode(e2);
      }, get: function() {
        return this.$modeId;
      }, handlesSet: true } }), t.EditSession = d;
    }), ace.define("ace/search", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range"], function(e, t, n) {
      "use strict";
      function u(e2, t2) {
        function n2(e3) {
          return /\w/.test(e3) || t2.regExp ? "\\b" : "";
        }
        return n2(e2[0]) + e2 + n2(e2[e2.length - 1]);
      }
      var r = e("./lib/lang"), i = e("./lib/oop"), s = e("./range").Range, o = function() {
        this.$options = {};
      };
      (function() {
        this.set = function(e2) {
          return i.mixin(this.$options, e2), this;
        }, this.getOptions = function() {
          return r.copyObject(this.$options);
        }, this.setOptions = function(e2) {
          this.$options = e2;
        }, this.find = function(e2) {
          var t2 = this.$options, n2 = this.$matchIterator(e2, t2);
          if (!n2)
            return false;
          var r2 = null;
          return n2.forEach(function(e3, n3, i2, o2) {
            return r2 = new s(e3, n3, i2, o2), n3 == o2 && t2.start && t2.start.start && t2.skipCurrent != 0 && r2.isEqual(t2.start) ? (r2 = null, false) : true;
          }), r2;
        }, this.findAll = function(e2) {
          var t2 = this.$options;
          if (!t2.needle)
            return [];
          this.$assembleRegExp(t2);
          var n2 = t2.range, i2 = n2 ? e2.getLines(n2.start.row, n2.end.row) : e2.doc.getAllLines(), o2 = [], u2 = t2.re;
          if (t2.$isMultiLine) {
            var a = u2.length, f = i2.length - a, l;
            e:
              for (var c = u2.offset || 0; c <= f; c++) {
                for (var h = 0; h < a; h++)
                  if (i2[c + h].search(u2[h]) == -1)
                    continue e;
                var p = i2[c], d = i2[c + a - 1], v = p.length - p.match(u2[0])[0].length, m = d.match(u2[a - 1])[0].length;
                if (l && l.end.row === c && l.end.column > v)
                  continue;
                o2.push(l = new s(c, v, c + a - 1, m)), a > 2 && (c = c + a - 2);
              }
          } else
            for (var g = 0; g < i2.length; g++) {
              var y = r.getMatchOffsets(i2[g], u2);
              for (var h = 0; h < y.length; h++) {
                var b = y[h];
                o2.push(new s(g, b.offset, g, b.offset + b.length));
              }
            }
          if (n2) {
            var w = n2.start.column, E = n2.start.column, g = 0, h = o2.length - 1;
            while (g < h && o2[g].start.column < w && o2[g].start.row == n2.start.row)
              g++;
            while (g < h && o2[h].end.column > E && o2[h].end.row == n2.end.row)
              h--;
            o2 = o2.slice(g, h + 1);
            for (g = 0, h = o2.length; g < h; g++)
              o2[g].start.row += n2.start.row, o2[g].end.row += n2.start.row;
          }
          return o2;
        }, this.replace = function(e2, t2) {
          var n2 = this.$options, r2 = this.$assembleRegExp(n2);
          if (n2.$isMultiLine)
            return t2;
          if (!r2)
            return;
          var i2 = r2.exec(e2);
          if (!i2 || i2[0].length != e2.length)
            return null;
          t2 = e2.replace(r2, t2);
          if (n2.preserveCase) {
            t2 = t2.split("");
            for (var s2 = Math.min(e2.length, e2.length); s2--; ) {
              var o2 = e2[s2];
              o2 && o2.toLowerCase() != o2 ? t2[s2] = t2[s2].toUpperCase() : t2[s2] = t2[s2].toLowerCase();
            }
            t2 = t2.join("");
          }
          return t2;
        }, this.$assembleRegExp = function(e2, t2) {
          if (e2.needle instanceof RegExp)
            return e2.re = e2.needle;
          var n2 = e2.needle;
          if (!e2.needle)
            return e2.re = false;
          e2.regExp || (n2 = r.escapeRegExp(n2)), e2.wholeWord && (n2 = u(n2, e2));
          var i2 = e2.caseSensitive ? "gm" : "gmi";
          e2.$isMultiLine = !t2 && /[\n\r]/.test(n2);
          if (e2.$isMultiLine)
            return e2.re = this.$assembleMultilineRegExp(n2, i2);
          try {
            var s2 = new RegExp(n2, i2);
          } catch (o2) {
            s2 = false;
          }
          return e2.re = s2;
        }, this.$assembleMultilineRegExp = function(e2, t2) {
          var n2 = e2.replace(/\r\n|\r|\n/g, "$\n^").split("\n"), r2 = [];
          for (var i2 = 0; i2 < n2.length; i2++)
            try {
              r2.push(new RegExp(n2[i2], t2));
            } catch (s2) {
              return false;
            }
          return r2;
        }, this.$matchIterator = function(e2, t2) {
          var n2 = this.$assembleRegExp(t2);
          if (!n2)
            return false;
          var r2 = t2.backwards == 1, i2 = t2.skipCurrent != 0, s2 = t2.range, o2 = t2.start;
          o2 || (o2 = s2 ? s2[r2 ? "end" : "start"] : e2.selection.getRange()), o2.start && (o2 = o2[i2 != r2 ? "end" : "start"]);
          var u2 = s2 ? s2.start.row : 0, a = s2 ? s2.end.row : e2.getLength() - 1;
          if (r2)
            var f = function(e3) {
              var n3 = o2.row;
              if (c(n3, o2.column, e3))
                return;
              for (n3--; n3 >= u2; n3--)
                if (c(n3, Number.MAX_VALUE, e3))
                  return;
              if (t2.wrap == 0)
                return;
              for (n3 = a, u2 = o2.row; n3 >= u2; n3--)
                if (c(n3, Number.MAX_VALUE, e3))
                  return;
            };
          else
            var f = function(e3) {
              var n3 = o2.row;
              if (c(n3, o2.column, e3))
                return;
              for (n3 += 1; n3 <= a; n3++)
                if (c(n3, 0, e3))
                  return;
              if (t2.wrap == 0)
                return;
              for (n3 = u2, a = o2.row; n3 <= a; n3++)
                if (c(n3, 0, e3))
                  return;
            };
          if (t2.$isMultiLine)
            var l = n2.length, c = function(t3, i3, s3) {
              var o3 = r2 ? t3 - l + 1 : t3;
              if (o3 < 0 || o3 + l > e2.getLength())
                return;
              var u3 = e2.getLine(o3), a2 = u3.search(n2[0]);
              if (!r2 && a2 < i3 || a2 === -1)
                return;
              for (var f2 = 1; f2 < l; f2++) {
                u3 = e2.getLine(o3 + f2);
                if (u3.search(n2[f2]) == -1)
                  return;
              }
              var c2 = u3.match(n2[l - 1])[0].length;
              if (r2 && c2 > i3)
                return;
              if (s3(o3, a2, o3 + l - 1, c2))
                return true;
            };
          else if (r2)
            var c = function(t3, r3, i3) {
              var s3 = e2.getLine(t3), o3 = [], u3, a2 = 0;
              n2.lastIndex = 0;
              while (u3 = n2.exec(s3)) {
                var f2 = u3[0].length;
                a2 = u3.index;
                if (!f2) {
                  if (a2 >= s3.length)
                    break;
                  n2.lastIndex = a2 += 1;
                }
                if (u3.index + f2 > r3)
                  break;
                o3.push(u3.index, f2);
              }
              for (var l2 = o3.length - 1; l2 >= 0; l2 -= 2) {
                var c2 = o3[l2 - 1], f2 = o3[l2];
                if (i3(t3, c2, t3, c2 + f2))
                  return true;
              }
            };
          else
            var c = function(t3, r3, i3) {
              var s3 = e2.getLine(t3), o3, u3;
              n2.lastIndex = r3;
              while (u3 = n2.exec(s3)) {
                var a2 = u3[0].length;
                o3 = u3.index;
                if (i3(t3, o3, t3, o3 + a2))
                  return true;
                if (!a2) {
                  n2.lastIndex = o3 += 1;
                  if (o3 >= s3.length)
                    return false;
                }
              }
            };
          return { forEach: f };
        };
      }).call(o.prototype), t.Search = o;
    }), ace.define("ace/keyboard/hash_handler", ["require", "exports", "module", "ace/lib/keys", "ace/lib/useragent"], function(e, t, n) {
      "use strict";
      function o(e2, t2) {
        this.platform = t2 || (i.isMac ? "mac" : "win"), this.commands = {}, this.commandKeyBinding = {}, this.addCommands(e2), this.$singleCommand = true;
      }
      function u(e2, t2) {
        o.call(this, e2, t2), this.$singleCommand = false;
      }
      var r = e("../lib/keys"), i = e("../lib/useragent"), s = r.KEY_MODS;
      u.prototype = o.prototype, function() {
        function e2(e3) {
          return typeof e3 == "object" && e3.bindKey && e3.bindKey.position || (e3.isDefault ? -100 : 0);
        }
        this.addCommand = function(e3) {
          this.commands[e3.name] && this.removeCommand(e3), this.commands[e3.name] = e3, e3.bindKey && this._buildKeyHash(e3);
        }, this.removeCommand = function(e3, t2) {
          var n2 = e3 && (typeof e3 == "string" ? e3 : e3.name);
          e3 = this.commands[n2], t2 || delete this.commands[n2];
          var r2 = this.commandKeyBinding;
          for (var i2 in r2) {
            var s2 = r2[i2];
            if (s2 == e3)
              delete r2[i2];
            else if (Array.isArray(s2)) {
              var o2 = s2.indexOf(e3);
              o2 != -1 && (s2.splice(o2, 1), s2.length == 1 && (r2[i2] = s2[0]));
            }
          }
        }, this.bindKey = function(e3, t2, n2) {
          typeof e3 == "object" && e3 && (n2 == void 0 && (n2 = e3.position), e3 = e3[this.platform]);
          if (!e3)
            return;
          if (typeof t2 == "function")
            return this.addCommand({ exec: t2, bindKey: e3, name: t2.name || e3 });
          e3.split("|").forEach(function(e4) {
            var r2 = "";
            if (e4.indexOf(" ") != -1) {
              var i2 = e4.split(/\s+/);
              e4 = i2.pop(), i2.forEach(function(e5) {
                var t3 = this.parseKeys(e5), n3 = s[t3.hashId] + t3.key;
                r2 += (r2 ? " " : "") + n3, this._addCommandToBinding(r2, "chainKeys");
              }, this), r2 += " ";
            }
            var o2 = this.parseKeys(e4), u2 = s[o2.hashId] + o2.key;
            this._addCommandToBinding(r2 + u2, t2, n2);
          }, this);
        }, this._addCommandToBinding = function(t2, n2, r2) {
          var i2 = this.commandKeyBinding, s2;
          if (!n2)
            delete i2[t2];
          else if (!i2[t2] || this.$singleCommand)
            i2[t2] = n2;
          else {
            Array.isArray(i2[t2]) ? (s2 = i2[t2].indexOf(n2)) != -1 && i2[t2].splice(s2, 1) : i2[t2] = [i2[t2]], typeof r2 != "number" && (r2 = e2(n2));
            var o2 = i2[t2];
            for (s2 = 0; s2 < o2.length; s2++) {
              var u2 = o2[s2], a = e2(u2);
              if (a > r2)
                break;
            }
            o2.splice(s2, 0, n2);
          }
        }, this.addCommands = function(e3) {
          e3 && Object.keys(e3).forEach(function(t2) {
            var n2 = e3[t2];
            if (!n2)
              return;
            if (typeof n2 == "string")
              return this.bindKey(n2, t2);
            typeof n2 == "function" && (n2 = { exec: n2 });
            if (typeof n2 != "object")
              return;
            n2.name || (n2.name = t2), this.addCommand(n2);
          }, this);
        }, this.removeCommands = function(e3) {
          Object.keys(e3).forEach(function(t2) {
            this.removeCommand(e3[t2]);
          }, this);
        }, this.bindKeys = function(e3) {
          Object.keys(e3).forEach(function(t2) {
            this.bindKey(t2, e3[t2]);
          }, this);
        }, this._buildKeyHash = function(e3) {
          this.bindKey(e3.bindKey, e3);
        }, this.parseKeys = function(e3) {
          var t2 = e3.toLowerCase().split(/[\-\+]([\-\+])?/).filter(function(e4) {
            return e4;
          }), n2 = t2.pop(), i2 = r[n2];
          if (r.FUNCTION_KEYS[i2])
            n2 = r.FUNCTION_KEYS[i2].toLowerCase();
          else {
            if (!t2.length)
              return { key: n2, hashId: -1 };
            if (t2.length == 1 && t2[0] == "shift")
              return { key: n2.toUpperCase(), hashId: -1 };
          }
          var s2 = 0;
          for (var o2 = t2.length; o2--; ) {
            var u2 = r.KEY_MODS[t2[o2]];
            if (u2 == null)
              return typeof console != "undefined" && console.error("invalid modifier " + t2[o2] + " in " + e3), false;
            s2 |= u2;
          }
          return { key: n2, hashId: s2 };
        }, this.findKeyCommand = function(t2, n2) {
          var r2 = s[t2] + n2;
          return this.commandKeyBinding[r2];
        }, this.handleKeyboard = function(e3, t2, n2, r2) {
          if (r2 < 0)
            return;
          var i2 = s[t2] + n2, o2 = this.commandKeyBinding[i2];
          e3.$keyChain && (e3.$keyChain += " " + i2, o2 = this.commandKeyBinding[e3.$keyChain] || o2);
          if (o2) {
            if (o2 == "chainKeys" || o2[o2.length - 1] == "chainKeys")
              return e3.$keyChain = e3.$keyChain || i2, { command: "null" };
          }
          if (e3.$keyChain)
            if (!!t2 && t2 != 4 || n2.length != 1) {
              if (t2 == -1 || r2 > 0)
                e3.$keyChain = "";
            } else
              e3.$keyChain = e3.$keyChain.slice(0, -i2.length - 1);
          return { command: o2 };
        }, this.getStatusText = function(e3, t2) {
          return t2.$keyChain || "";
        };
      }.call(o.prototype), t.HashHandler = o, t.MultiHashHandler = u;
    }), ace.define("ace/commands/command_manager", ["require", "exports", "module", "ace/lib/oop", "ace/keyboard/hash_handler", "ace/lib/event_emitter"], function(e, t, n) {
      "use strict";
      var r = e("../lib/oop"), i = e("../keyboard/hash_handler").MultiHashHandler, s = e("../lib/event_emitter").EventEmitter, o = function(e2, t2) {
        i.call(this, t2, e2), this.byName = this.commands, this.setDefaultHandler("exec", function(e3) {
          return e3.args ? e3.command.exec(e3.editor, e3.args, e3.event, false) : e3.command.exec(e3.editor, {}, e3.event, true);
        });
      };
      r.inherits(o, i), function() {
        r.implement(this, s), this.exec = function(e2, t2, n2) {
          if (Array.isArray(e2)) {
            for (var r2 = e2.length; r2--; )
              if (this.exec(e2[r2], t2, n2))
                return true;
            return false;
          }
          typeof e2 == "string" && (e2 = this.commands[e2]);
          if (!e2)
            return false;
          if (t2 && t2.$readOnly && !e2.readOnly)
            return false;
          if (this.$checkCommandState != 0 && e2.isAvailable && !e2.isAvailable(t2))
            return false;
          var i2 = { editor: t2, command: e2, args: n2 };
          return i2.returnValue = this._emit("exec", i2), this._signal("afterExec", i2), i2.returnValue === false ? false : true;
        }, this.toggleRecording = function(e2) {
          if (this.$inReplay)
            return;
          return e2 && e2._emit("changeStatus"), this.recording ? (this.macro.pop(), this.off("exec", this.$addCommandToMacro), this.macro.length || (this.macro = this.oldMacro), this.recording = false) : (this.$addCommandToMacro || (this.$addCommandToMacro = function(e3) {
            this.macro.push([e3.command, e3.args]);
          }.bind(this)), this.oldMacro = this.macro, this.macro = [], this.on("exec", this.$addCommandToMacro), this.recording = true);
        }, this.replay = function(e2) {
          if (this.$inReplay || !this.macro)
            return;
          if (this.recording)
            return this.toggleRecording(e2);
          try {
            this.$inReplay = true, this.macro.forEach(function(t2) {
              typeof t2 == "string" ? this.exec(t2, e2) : this.exec(t2[0], e2, t2[1]);
            }, this);
          } finally {
            this.$inReplay = false;
          }
        }, this.trimMacro = function(e2) {
          return e2.map(function(e3) {
            return typeof e3[0] != "string" && (e3[0] = e3[0].name), e3[1] || (e3 = e3[0]), e3;
          });
        };
      }.call(o.prototype), t.CommandManager = o;
    }), ace.define("ace/commands/default_commands", ["require", "exports", "module", "ace/lib/lang", "ace/config", "ace/range"], function(e, t, n) {
      "use strict";
      function o(e2, t2) {
        return { win: e2, mac: t2 };
      }
      var r = e("../lib/lang"), i = e("../config"), s = e("../range").Range;
      t.commands = [{ name: "showSettingsMenu", description: "Show settings menu", bindKey: o("Ctrl-,", "Command-,"), exec: function(e2) {
        i.loadModule("ace/ext/settings_menu", function(t2) {
          t2.init(e2), e2.showSettingsMenu();
        });
      }, readOnly: true }, { name: "goToNextError", description: "Go to next error", bindKey: o("Alt-E", "F4"), exec: function(e2) {
        i.loadModule("./ext/error_marker", function(t2) {
          t2.showErrorMarker(e2, 1);
        });
      }, scrollIntoView: "animate", readOnly: true }, { name: "goToPreviousError", description: "Go to previous error", bindKey: o("Alt-Shift-E", "Shift-F4"), exec: function(e2) {
        i.loadModule("./ext/error_marker", function(t2) {
          t2.showErrorMarker(e2, -1);
        });
      }, scrollIntoView: "animate", readOnly: true }, { name: "selectall", description: "Select all", bindKey: o("Ctrl-A", "Command-A"), exec: function(e2) {
        e2.selectAll();
      }, readOnly: true }, { name: "centerselection", description: "Center selection", bindKey: o(null, "Ctrl-L"), exec: function(e2) {
        e2.centerSelection();
      }, readOnly: true }, { name: "gotoline", description: "Go to line...", bindKey: o("Ctrl-L", "Command-L"), exec: function(e2, t2) {
        typeof t2 == "number" && !isNaN(t2) && e2.gotoLine(t2), e2.prompt({ $type: "gotoLine" });
      }, readOnly: true }, { name: "fold", bindKey: o("Alt-L|Ctrl-F1", "Command-Alt-L|Command-F1"), exec: function(e2) {
        e2.session.toggleFold(false);
      }, multiSelectAction: "forEach", scrollIntoView: "center", readOnly: true }, { name: "unfold", bindKey: o("Alt-Shift-L|Ctrl-Shift-F1", "Command-Alt-Shift-L|Command-Shift-F1"), exec: function(e2) {
        e2.session.toggleFold(true);
      }, multiSelectAction: "forEach", scrollIntoView: "center", readOnly: true }, { name: "toggleFoldWidget", description: "Toggle fold widget", bindKey: o("F2", "F2"), exec: function(e2) {
        e2.session.toggleFoldWidget();
      }, multiSelectAction: "forEach", scrollIntoView: "center", readOnly: true }, { name: "toggleParentFoldWidget", description: "Toggle parent fold widget", bindKey: o("Alt-F2", "Alt-F2"), exec: function(e2) {
        e2.session.toggleFoldWidget(true);
      }, multiSelectAction: "forEach", scrollIntoView: "center", readOnly: true }, { name: "foldall", description: "Fold all", bindKey: o(null, "Ctrl-Command-Option-0"), exec: function(e2) {
        e2.session.foldAll();
      }, scrollIntoView: "center", readOnly: true }, { name: "foldAllComments", description: "Fold all comments", bindKey: o(null, "Ctrl-Command-Option-0"), exec: function(e2) {
        e2.session.foldAllComments();
      }, scrollIntoView: "center", readOnly: true }, { name: "foldOther", description: "Fold other", bindKey: o("Alt-0", "Command-Option-0"), exec: function(e2) {
        e2.session.foldAll(), e2.session.unfold(e2.selection.getAllRanges());
      }, scrollIntoView: "center", readOnly: true }, { name: "unfoldall", description: "Unfold all", bindKey: o("Alt-Shift-0", "Command-Option-Shift-0"), exec: function(e2) {
        e2.session.unfold();
      }, scrollIntoView: "center", readOnly: true }, { name: "findnext", description: "Find next", bindKey: o("Ctrl-K", "Command-G"), exec: function(e2) {
        e2.findNext();
      }, multiSelectAction: "forEach", scrollIntoView: "center", readOnly: true }, { name: "findprevious", description: "Find previous", bindKey: o("Ctrl-Shift-K", "Command-Shift-G"), exec: function(e2) {
        e2.findPrevious();
      }, multiSelectAction: "forEach", scrollIntoView: "center", readOnly: true }, { name: "selectOrFindNext", description: "Select or find next", bindKey: o("Alt-K", "Ctrl-G"), exec: function(e2) {
        e2.selection.isEmpty() ? e2.selection.selectWord() : e2.findNext();
      }, readOnly: true }, { name: "selectOrFindPrevious", description: "Select or find previous", bindKey: o("Alt-Shift-K", "Ctrl-Shift-G"), exec: function(e2) {
        e2.selection.isEmpty() ? e2.selection.selectWord() : e2.findPrevious();
      }, readOnly: true }, { name: "find", description: "Find", bindKey: o("Ctrl-F", "Command-F"), exec: function(e2) {
        i.loadModule("ace/ext/searchbox", function(t2) {
          t2.Search(e2);
        });
      }, readOnly: true }, { name: "overwrite", description: "Overwrite", bindKey: "Insert", exec: function(e2) {
        e2.toggleOverwrite();
      }, readOnly: true }, { name: "selecttostart", description: "Select to start", bindKey: o("Ctrl-Shift-Home", "Command-Shift-Home|Command-Shift-Up"), exec: function(e2) {
        e2.getSelection().selectFileStart();
      }, multiSelectAction: "forEach", readOnly: true, scrollIntoView: "animate", aceCommandGroup: "fileJump" }, { name: "gotostart", description: "Go to start", bindKey: o("Ctrl-Home", "Command-Home|Command-Up"), exec: function(e2) {
        e2.navigateFileStart();
      }, multiSelectAction: "forEach", readOnly: true, scrollIntoView: "animate", aceCommandGroup: "fileJump" }, { name: "selectup", description: "Select up", bindKey: o("Shift-Up", "Shift-Up|Ctrl-Shift-P"), exec: function(e2) {
        e2.getSelection().selectUp();
      }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: true }, { name: "golineup", description: "Go line up", bindKey: o("Up", "Up|Ctrl-P"), exec: function(e2, t2) {
        e2.navigateUp(t2.times);
      }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: true }, { name: "selecttoend", description: "Select to end", bindKey: o("Ctrl-Shift-End", "Command-Shift-End|Command-Shift-Down"), exec: function(e2) {
        e2.getSelection().selectFileEnd();
      }, multiSelectAction: "forEach", readOnly: true, scrollIntoView: "animate", aceCommandGroup: "fileJump" }, { name: "gotoend", description: "Go to end", bindKey: o("Ctrl-End", "Command-End|Command-Down"), exec: function(e2) {
        e2.navigateFileEnd();
      }, multiSelectAction: "forEach", readOnly: true, scrollIntoView: "animate", aceCommandGroup: "fileJump" }, { name: "selectdown", description: "Select down", bindKey: o("Shift-Down", "Shift-Down|Ctrl-Shift-N"), exec: function(e2) {
        e2.getSelection().selectDown();
      }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: true }, { name: "golinedown", description: "Go line down", bindKey: o("Down", "Down|Ctrl-N"), exec: function(e2, t2) {
        e2.navigateDown(t2.times);
      }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: true }, { name: "selectwordleft", description: "Select word left", bindKey: o("Ctrl-Shift-Left", "Option-Shift-Left"), exec: function(e2) {
        e2.getSelection().selectWordLeft();
      }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: true }, { name: "gotowordleft", description: "Go to word left", bindKey: o("Ctrl-Left", "Option-Left"), exec: function(e2) {
        e2.navigateWordLeft();
      }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: true }, { name: "selecttolinestart", description: "Select to line start", bindKey: o("Alt-Shift-Left", "Command-Shift-Left|Ctrl-Shift-A"), exec: function(e2) {
        e2.getSelection().selectLineStart();
      }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: true }, { name: "gotolinestart", description: "Go to line start", bindKey: o("Alt-Left|Home", "Command-Left|Home|Ctrl-A"), exec: function(e2) {
        e2.navigateLineStart();
      }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: true }, { name: "selectleft", description: "Select left", bindKey: o("Shift-Left", "Shift-Left|Ctrl-Shift-B"), exec: function(e2) {
        e2.getSelection().selectLeft();
      }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: true }, { name: "gotoleft", description: "Go to left", bindKey: o("Left", "Left|Ctrl-B"), exec: function(e2, t2) {
        e2.navigateLeft(t2.times);
      }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: true }, { name: "selectwordright", description: "Select word right", bindKey: o("Ctrl-Shift-Right", "Option-Shift-Right"), exec: function(e2) {
        e2.getSelection().selectWordRight();
      }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: true }, { name: "gotowordright", description: "Go to word right", bindKey: o("Ctrl-Right", "Option-Right"), exec: function(e2) {
        e2.navigateWordRight();
      }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: true }, { name: "selecttolineend", description: "Select to line end", bindKey: o("Alt-Shift-Right", "Command-Shift-Right|Shift-End|Ctrl-Shift-E"), exec: function(e2) {
        e2.getSelection().selectLineEnd();
      }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: true }, { name: "gotolineend", description: "Go to line end", bindKey: o("Alt-Right|End", "Command-Right|End|Ctrl-E"), exec: function(e2) {
        e2.navigateLineEnd();
      }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: true }, { name: "selectright", description: "Select right", bindKey: o("Shift-Right", "Shift-Right"), exec: function(e2) {
        e2.getSelection().selectRight();
      }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: true }, { name: "gotoright", description: "Go to right", bindKey: o("Right", "Right|Ctrl-F"), exec: function(e2, t2) {
        e2.navigateRight(t2.times);
      }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: true }, { name: "selectpagedown", description: "Select page down", bindKey: "Shift-PageDown", exec: function(e2) {
        e2.selectPageDown();
      }, readOnly: true }, { name: "pagedown", description: "Page down", bindKey: o(null, "Option-PageDown"), exec: function(e2) {
        e2.scrollPageDown();
      }, readOnly: true }, { name: "gotopagedown", description: "Go to page down", bindKey: o("PageDown", "PageDown|Ctrl-V"), exec: function(e2) {
        e2.gotoPageDown();
      }, readOnly: true }, { name: "selectpageup", description: "Select page up", bindKey: "Shift-PageUp", exec: function(e2) {
        e2.selectPageUp();
      }, readOnly: true }, { name: "pageup", description: "Page up", bindKey: o(null, "Option-PageUp"), exec: function(e2) {
        e2.scrollPageUp();
      }, readOnly: true }, { name: "gotopageup", description: "Go to page up", bindKey: "PageUp", exec: function(e2) {
        e2.gotoPageUp();
      }, readOnly: true }, { name: "scrollup", description: "Scroll up", bindKey: o("Ctrl-Up", null), exec: function(e2) {
        e2.renderer.scrollBy(0, -2 * e2.renderer.layerConfig.lineHeight);
      }, readOnly: true }, { name: "scrolldown", description: "Scroll down", bindKey: o("Ctrl-Down", null), exec: function(e2) {
        e2.renderer.scrollBy(0, 2 * e2.renderer.layerConfig.lineHeight);
      }, readOnly: true }, { name: "selectlinestart", description: "Select line start", bindKey: "Shift-Home", exec: function(e2) {
        e2.getSelection().selectLineStart();
      }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: true }, { name: "selectlineend", description: "Select line end", bindKey: "Shift-End", exec: function(e2) {
        e2.getSelection().selectLineEnd();
      }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: true }, { name: "togglerecording", description: "Toggle recording", bindKey: o("Ctrl-Alt-E", "Command-Option-E"), exec: function(e2) {
        e2.commands.toggleRecording(e2);
      }, readOnly: true }, { name: "replaymacro", description: "Replay macro", bindKey: o("Ctrl-Shift-E", "Command-Shift-E"), exec: function(e2) {
        e2.commands.replay(e2);
      }, readOnly: true }, { name: "jumptomatching", description: "Jump to matching", bindKey: o("Ctrl-\\|Ctrl-P", "Command-\\"), exec: function(e2) {
        e2.jumpToMatching();
      }, multiSelectAction: "forEach", scrollIntoView: "animate", readOnly: true }, { name: "selecttomatching", description: "Select to matching", bindKey: o("Ctrl-Shift-\\|Ctrl-Shift-P", "Command-Shift-\\"), exec: function(e2) {
        e2.jumpToMatching(true);
      }, multiSelectAction: "forEach", scrollIntoView: "animate", readOnly: true }, { name: "expandToMatching", description: "Expand to matching", bindKey: o("Ctrl-Shift-M", "Ctrl-Shift-M"), exec: function(e2) {
        e2.jumpToMatching(true, true);
      }, multiSelectAction: "forEach", scrollIntoView: "animate", readOnly: true }, { name: "passKeysToBrowser", description: "Pass keys to browser", bindKey: o(null, null), exec: function() {
      }, passEvent: true, readOnly: true }, { name: "copy", description: "Copy", exec: function(e2) {
      }, readOnly: true }, { name: "cut", description: "Cut", exec: function(e2) {
        var t2 = e2.$copyWithEmptySelection && e2.selection.isEmpty(), n2 = t2 ? e2.selection.getLineRange() : e2.selection.getRange();
        e2._emit("cut", n2), n2.isEmpty() || e2.session.remove(n2), e2.clearSelection();
      }, scrollIntoView: "cursor", multiSelectAction: "forEach" }, { name: "paste", description: "Paste", exec: function(e2, t2) {
        e2.$handlePaste(t2);
      }, scrollIntoView: "cursor" }, { name: "removeline", description: "Remove line", bindKey: o("Ctrl-D", "Command-D"), exec: function(e2) {
        e2.removeLines();
      }, scrollIntoView: "cursor", multiSelectAction: "forEachLine" }, { name: "duplicateSelection", description: "Duplicate selection", bindKey: o("Ctrl-Shift-D", "Command-Shift-D"), exec: function(e2) {
        e2.duplicateSelection();
      }, scrollIntoView: "cursor", multiSelectAction: "forEach" }, { name: "sortlines", description: "Sort lines", bindKey: o("Ctrl-Alt-S", "Command-Alt-S"), exec: function(e2) {
        e2.sortLines();
      }, scrollIntoView: "selection", multiSelectAction: "forEachLine" }, { name: "togglecomment", description: "Toggle comment", bindKey: o("Ctrl-/", "Command-/"), exec: function(e2) {
        e2.toggleCommentLines();
      }, multiSelectAction: "forEachLine", scrollIntoView: "selectionPart" }, { name: "toggleBlockComment", description: "Toggle block comment", bindKey: o("Ctrl-Shift-/", "Command-Shift-/"), exec: function(e2) {
        e2.toggleBlockComment();
      }, multiSelectAction: "forEach", scrollIntoView: "selectionPart" }, { name: "modifyNumberUp", description: "Modify number up", bindKey: o("Ctrl-Shift-Up", "Alt-Shift-Up"), exec: function(e2) {
        e2.modifyNumber(1);
      }, scrollIntoView: "cursor", multiSelectAction: "forEach" }, { name: "modifyNumberDown", description: "Modify number down", bindKey: o("Ctrl-Shift-Down", "Alt-Shift-Down"), exec: function(e2) {
        e2.modifyNumber(-1);
      }, scrollIntoView: "cursor", multiSelectAction: "forEach" }, { name: "replace", description: "Replace", bindKey: o("Ctrl-H", "Command-Option-F"), exec: function(e2) {
        i.loadModule("ace/ext/searchbox", function(t2) {
          t2.Search(e2, true);
        });
      } }, { name: "undo", description: "Undo", bindKey: o("Ctrl-Z", "Command-Z"), exec: function(e2) {
        e2.undo();
      } }, { name: "redo", description: "Redo", bindKey: o("Ctrl-Shift-Z|Ctrl-Y", "Command-Shift-Z|Command-Y"), exec: function(e2) {
        e2.redo();
      } }, { name: "copylinesup", description: "Copy lines up", bindKey: o("Alt-Shift-Up", "Command-Option-Up"), exec: function(e2) {
        e2.copyLinesUp();
      }, scrollIntoView: "cursor" }, { name: "movelinesup", description: "Move lines up", bindKey: o("Alt-Up", "Option-Up"), exec: function(e2) {
        e2.moveLinesUp();
      }, scrollIntoView: "cursor" }, { name: "copylinesdown", description: "Copy lines down", bindKey: o("Alt-Shift-Down", "Command-Option-Down"), exec: function(e2) {
        e2.copyLinesDown();
      }, scrollIntoView: "cursor" }, { name: "movelinesdown", description: "Move lines down", bindKey: o("Alt-Down", "Option-Down"), exec: function(e2) {
        e2.moveLinesDown();
      }, scrollIntoView: "cursor" }, { name: "del", description: "Delete", bindKey: o("Delete", "Delete|Ctrl-D|Shift-Delete"), exec: function(e2) {
        e2.remove("right");
      }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "backspace", description: "Backspace", bindKey: o("Shift-Backspace|Backspace", "Ctrl-Backspace|Shift-Backspace|Backspace|Ctrl-H"), exec: function(e2) {
        e2.remove("left");
      }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "cut_or_delete", description: "Cut or delete", bindKey: o("Shift-Delete", null), exec: function(e2) {
        if (!e2.selection.isEmpty())
          return false;
        e2.remove("left");
      }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "removetolinestart", description: "Remove to line start", bindKey: o("Alt-Backspace", "Command-Backspace"), exec: function(e2) {
        e2.removeToLineStart();
      }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "removetolineend", description: "Remove to line end", bindKey: o("Alt-Delete", "Ctrl-K|Command-Delete"), exec: function(e2) {
        e2.removeToLineEnd();
      }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "removetolinestarthard", description: "Remove to line start hard", bindKey: o("Ctrl-Shift-Backspace", null), exec: function(e2) {
        var t2 = e2.selection.getRange();
        t2.start.column = 0, e2.session.remove(t2);
      }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "removetolineendhard", description: "Remove to line end hard", bindKey: o("Ctrl-Shift-Delete", null), exec: function(e2) {
        var t2 = e2.selection.getRange();
        t2.end.column = Number.MAX_VALUE, e2.session.remove(t2);
      }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "removewordleft", description: "Remove word left", bindKey: o("Ctrl-Backspace", "Alt-Backspace|Ctrl-Alt-Backspace"), exec: function(e2) {
        e2.removeWordLeft();
      }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "removewordright", description: "Remove word right", bindKey: o("Ctrl-Delete", "Alt-Delete"), exec: function(e2) {
        e2.removeWordRight();
      }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "outdent", description: "Outdent", bindKey: o("Shift-Tab", "Shift-Tab"), exec: function(e2) {
        e2.blockOutdent();
      }, multiSelectAction: "forEach", scrollIntoView: "selectionPart" }, { name: "indent", description: "Indent", bindKey: o("Tab", "Tab"), exec: function(e2) {
        e2.indent();
      }, multiSelectAction: "forEach", scrollIntoView: "selectionPart" }, { name: "blockoutdent", description: "Block outdent", bindKey: o("Ctrl-[", "Ctrl-["), exec: function(e2) {
        e2.blockOutdent();
      }, multiSelectAction: "forEachLine", scrollIntoView: "selectionPart" }, { name: "blockindent", description: "Block indent", bindKey: o("Ctrl-]", "Ctrl-]"), exec: function(e2) {
        e2.blockIndent();
      }, multiSelectAction: "forEachLine", scrollIntoView: "selectionPart" }, { name: "insertstring", description: "Insert string", exec: function(e2, t2) {
        e2.insert(t2);
      }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "inserttext", description: "Insert text", exec: function(e2, t2) {
        e2.insert(r.stringRepeat(t2.text || "", t2.times || 1));
      }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "splitline", description: "Split line", bindKey: o(null, "Ctrl-O"), exec: function(e2) {
        e2.splitLine();
      }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "transposeletters", description: "Transpose letters", bindKey: o("Alt-Shift-X", "Ctrl-T"), exec: function(e2) {
        e2.transposeLetters();
      }, multiSelectAction: function(e2) {
        e2.transposeSelections(1);
      }, scrollIntoView: "cursor" }, { name: "touppercase", description: "To uppercase", bindKey: o("Ctrl-U", "Ctrl-U"), exec: function(e2) {
        e2.toUpperCase();
      }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "tolowercase", description: "To lowercase", bindKey: o("Ctrl-Shift-U", "Ctrl-Shift-U"), exec: function(e2) {
        e2.toLowerCase();
      }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "autoindent", description: "Auto Indent", bindKey: o(null, null), exec: function(e2) {
        e2.autoIndent();
      }, multiSelectAction: "forEachLine", scrollIntoView: "animate" }, { name: "expandtoline", description: "Expand to line", bindKey: o("Ctrl-Shift-L", "Command-Shift-L"), exec: function(e2) {
        var t2 = e2.selection.getRange();
        t2.start.column = t2.end.column = 0, t2.end.row++, e2.selection.setRange(t2, false);
      }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: true }, { name: "joinlines", description: "Join lines", bindKey: o(null, null), exec: function(e2) {
        var t2 = e2.selection.isBackwards(), n2 = t2 ? e2.selection.getSelectionLead() : e2.selection.getSelectionAnchor(), i2 = t2 ? e2.selection.getSelectionAnchor() : e2.selection.getSelectionLead(), o2 = e2.session.doc.getLine(n2.row).length, u2 = e2.session.doc.getTextRange(e2.selection.getRange()), a = u2.replace(/\n\s*/, " ").length, f = e2.session.doc.getLine(n2.row);
        for (var l = n2.row + 1; l <= i2.row + 1; l++) {
          var c = r.stringTrimLeft(r.stringTrimRight(e2.session.doc.getLine(l)));
          c.length !== 0 && (c = " " + c), f += c;
        }
        i2.row + 1 < e2.session.doc.getLength() - 1 && (f += e2.session.doc.getNewLineCharacter()), e2.clearSelection(), e2.session.doc.replace(new s(n2.row, 0, i2.row + 2, 0), f), a > 0 ? (e2.selection.moveCursorTo(n2.row, n2.column), e2.selection.selectTo(n2.row, n2.column + a)) : (o2 = e2.session.doc.getLine(n2.row).length > o2 ? o2 + 1 : o2, e2.selection.moveCursorTo(n2.row, o2));
      }, multiSelectAction: "forEach", readOnly: true }, { name: "invertSelection", description: "Invert selection", bindKey: o(null, null), exec: function(e2) {
        var t2 = e2.session.doc.getLength() - 1, n2 = e2.session.doc.getLine(t2).length, r2 = e2.selection.rangeList.ranges, i2 = [];
        r2.length < 1 && (r2 = [e2.selection.getRange()]);
        for (var o2 = 0; o2 < r2.length; o2++)
          o2 == r2.length - 1 && (r2[o2].end.row !== t2 || r2[o2].end.column !== n2) && i2.push(new s(r2[o2].end.row, r2[o2].end.column, t2, n2)), o2 === 0 ? (r2[o2].start.row !== 0 || r2[o2].start.column !== 0) && i2.push(new s(0, 0, r2[o2].start.row, r2[o2].start.column)) : i2.push(new s(r2[o2 - 1].end.row, r2[o2 - 1].end.column, r2[o2].start.row, r2[o2].start.column));
        e2.exitMultiSelectMode(), e2.clearSelection();
        for (var o2 = 0; o2 < i2.length; o2++)
          e2.selection.addRange(i2[o2], false);
      }, readOnly: true, scrollIntoView: "none" }, { name: "addLineAfter", description: "Add new line after the current line", exec: function(e2) {
        e2.selection.clearSelection(), e2.navigateLineEnd(), e2.insert("\n");
      }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "addLineBefore", description: "Add new line before the current line", exec: function(e2) {
        e2.selection.clearSelection();
        var t2 = e2.getCursorPosition();
        e2.selection.moveTo(t2.row - 1, Number.MAX_VALUE), e2.insert("\n"), t2.row === 0 && e2.navigateUp();
      }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "openCommandPallete", description: "Open command pallete", bindKey: o("F1", "F1"), exec: function(e2) {
        e2.prompt({ $type: "commands" });
      }, readOnly: true }, { name: "modeSelect", description: "Change language mode...", bindKey: o(null, null), exec: function(e2) {
        e2.prompt({ $type: "modes" });
      }, readOnly: true }];
      for (var u = 1; u < 9; u++)
        t.commands.push({ name: "foldToLevel" + u, description: "Fold To Level " + u, level: u, exec: function(e2) {
          e2.session.foldToLevel(this.level);
        }, scrollIntoView: "center", readOnly: true });
    }), ace.define("ace/editor", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/useragent", "ace/keyboard/textinput", "ace/mouse/mouse_handler", "ace/mouse/fold_handler", "ace/keyboard/keybinding", "ace/edit_session", "ace/search", "ace/range", "ace/lib/event_emitter", "ace/commands/command_manager", "ace/commands/default_commands", "ace/config", "ace/token_iterator", "ace/clipboard"], function(e, t, n) {
      "use strict";
      var r = e("./lib/oop"), i = e("./lib/dom"), s = e("./lib/lang"), o = e("./lib/useragent"), u = e("./keyboard/textinput").TextInput, a = e("./mouse/mouse_handler").MouseHandler, f = e("./mouse/fold_handler").FoldHandler, l = e("./keyboard/keybinding").KeyBinding, c = e("./edit_session").EditSession, h = e("./search").Search, p = e("./range").Range, d = e("./lib/event_emitter").EventEmitter, v = e("./commands/command_manager").CommandManager, m = e("./commands/default_commands").commands, g = e("./config"), y = e("./token_iterator").TokenIterator, b = e("./clipboard"), w = function(e2, t2, n2) {
        this.$toDestroy = [];
        var r2 = e2.getContainerElement();
        this.container = r2, this.renderer = e2, this.id = "editor" + ++w.$uid, this.commands = new v(o.isMac ? "mac" : "win", m), typeof document == "object" && (this.textInput = new u(e2.getTextAreaContainer(), this), this.renderer.textarea = this.textInput.getElement(), this.$mouseHandler = new a(this), new f(this)), this.keyBinding = new l(this), this.$search = new h().set({ wrap: true }), this.$historyTracker = this.$historyTracker.bind(this), this.commands.on("exec", this.$historyTracker), this.$initOperationListeners(), this._$emitInputEvent = s.delayedCall(function() {
          this._signal("input", {}), this.session && !this.session.destroyed && this.session.bgTokenizer.scheduleStart();
        }.bind(this)), this.on("change", function(e3, t3) {
          t3._$emitInputEvent.schedule(31);
        }), this.setSession(t2 || n2 && n2.session || new c("")), g.resetOptions(this), n2 && this.setOptions(n2), g._signal("editor", this);
      };
      w.$uid = 0, function() {
        r.implement(this, d), this.$initOperationListeners = function() {
          this.commands.on("exec", this.startOperation.bind(this), true), this.commands.on("afterExec", this.endOperation.bind(this), true), this.$opResetTimer = s.delayedCall(this.endOperation.bind(this, true)), this.on("change", function() {
            this.curOp || (this.startOperation(), this.curOp.selectionBefore = this.$lastSel), this.curOp.docChanged = true;
          }.bind(this), true), this.on("changeSelection", function() {
            this.curOp || (this.startOperation(), this.curOp.selectionBefore = this.$lastSel), this.curOp.selectionChanged = true;
          }.bind(this), true);
        }, this.curOp = null, this.prevOp = {}, this.startOperation = function(e2) {
          if (this.curOp) {
            if (!e2 || this.curOp.command)
              return;
            this.prevOp = this.curOp;
          }
          e2 || (this.previousCommand = null, e2 = {}), this.$opResetTimer.schedule(), this.curOp = this.session.curOp = { command: e2.command || {}, args: e2.args, scrollTop: this.renderer.scrollTop }, this.curOp.selectionBefore = this.selection.toJSON();
        }, this.endOperation = function(e2) {
          if (this.curOp && this.session) {
            if (e2 && e2.returnValue === false || !this.session)
              return this.curOp = null;
            if (e2 == 1 && this.curOp.command && this.curOp.command.name == "mouse")
              return;
            this._signal("beforeEndOperation");
            if (!this.curOp)
              return;
            var t2 = this.curOp.command, n2 = t2 && t2.scrollIntoView;
            if (n2) {
              switch (n2) {
                case "center-animate":
                  n2 = "animate";
                case "center":
                  this.renderer.scrollCursorIntoView(null, 0.5);
                  break;
                case "animate":
                case "cursor":
                  this.renderer.scrollCursorIntoView();
                  break;
                case "selectionPart":
                  var r2 = this.selection.getRange(), i2 = this.renderer.layerConfig;
                  (r2.start.row >= i2.lastRow || r2.end.row <= i2.firstRow) && this.renderer.scrollSelectionIntoView(this.selection.anchor, this.selection.lead);
                  break;
                default:
              }
              n2 == "animate" && this.renderer.animateScrolling(this.curOp.scrollTop);
            }
            var s2 = this.selection.toJSON();
            this.curOp.selectionAfter = s2, this.$lastSel = this.selection.toJSON(), this.session.getUndoManager().addSelection(s2), this.prevOp = this.curOp, this.curOp = null;
          }
        }, this.$mergeableCommands = ["backspace", "del", "insertstring"], this.$historyTracker = function(e2) {
          if (!this.$mergeUndoDeltas)
            return;
          var t2 = this.prevOp, n2 = this.$mergeableCommands, r2 = t2.command && e2.command.name == t2.command.name;
          if (e2.command.name == "insertstring") {
            var i2 = e2.args;
            this.mergeNextCommand === void 0 && (this.mergeNextCommand = true), r2 = r2 && this.mergeNextCommand && (!/\s/.test(i2) || /\s/.test(t2.args)), this.mergeNextCommand = true;
          } else
            r2 = r2 && n2.indexOf(e2.command.name) !== -1;
          this.$mergeUndoDeltas != "always" && Date.now() - this.sequenceStartTime > 2e3 && (r2 = false), r2 ? this.session.mergeUndoDeltas = true : n2.indexOf(e2.command.name) !== -1 && (this.sequenceStartTime = Date.now());
        }, this.setKeyboardHandler = function(e2, t2) {
          if (e2 && typeof e2 == "string" && e2 != "ace") {
            this.$keybindingId = e2;
            var n2 = this;
            g.loadModule(["keybinding", e2], function(r2) {
              n2.$keybindingId == e2 && n2.keyBinding.setKeyboardHandler(r2 && r2.handler), t2 && t2();
            });
          } else
            this.$keybindingId = null, this.keyBinding.setKeyboardHandler(e2), t2 && t2();
        }, this.getKeyboardHandler = function() {
          return this.keyBinding.getKeyboardHandler();
        }, this.setSession = function(e2) {
          if (this.session == e2)
            return;
          this.curOp && this.endOperation(), this.curOp = {};
          var t2 = this.session;
          if (t2) {
            this.session.off("change", this.$onDocumentChange), this.session.off("changeMode", this.$onChangeMode), this.session.off("tokenizerUpdate", this.$onTokenizerUpdate), this.session.off("changeTabSize", this.$onChangeTabSize), this.session.off("changeWrapLimit", this.$onChangeWrapLimit), this.session.off("changeWrapMode", this.$onChangeWrapMode), this.session.off("changeFold", this.$onChangeFold), this.session.off("changeFrontMarker", this.$onChangeFrontMarker), this.session.off("changeBackMarker", this.$onChangeBackMarker), this.session.off("changeBreakpoint", this.$onChangeBreakpoint), this.session.off("changeAnnotation", this.$onChangeAnnotation), this.session.off("changeOverwrite", this.$onCursorChange), this.session.off("changeScrollTop", this.$onScrollTopChange), this.session.off("changeScrollLeft", this.$onScrollLeftChange);
            var n2 = this.session.getSelection();
            n2.off("changeCursor", this.$onCursorChange), n2.off("changeSelection", this.$onSelectionChange);
          }
          this.session = e2, e2 ? (this.$onDocumentChange = this.onDocumentChange.bind(this), e2.on("change", this.$onDocumentChange), this.renderer.setSession(e2), this.$onChangeMode = this.onChangeMode.bind(this), e2.on("changeMode", this.$onChangeMode), this.$onTokenizerUpdate = this.onTokenizerUpdate.bind(this), e2.on("tokenizerUpdate", this.$onTokenizerUpdate), this.$onChangeTabSize = this.renderer.onChangeTabSize.bind(this.renderer), e2.on("changeTabSize", this.$onChangeTabSize), this.$onChangeWrapLimit = this.onChangeWrapLimit.bind(this), e2.on("changeWrapLimit", this.$onChangeWrapLimit), this.$onChangeWrapMode = this.onChangeWrapMode.bind(this), e2.on("changeWrapMode", this.$onChangeWrapMode), this.$onChangeFold = this.onChangeFold.bind(this), e2.on("changeFold", this.$onChangeFold), this.$onChangeFrontMarker = this.onChangeFrontMarker.bind(this), this.session.on("changeFrontMarker", this.$onChangeFrontMarker), this.$onChangeBackMarker = this.onChangeBackMarker.bind(this), this.session.on("changeBackMarker", this.$onChangeBackMarker), this.$onChangeBreakpoint = this.onChangeBreakpoint.bind(this), this.session.on("changeBreakpoint", this.$onChangeBreakpoint), this.$onChangeAnnotation = this.onChangeAnnotation.bind(this), this.session.on("changeAnnotation", this.$onChangeAnnotation), this.$onCursorChange = this.onCursorChange.bind(this), this.session.on("changeOverwrite", this.$onCursorChange), this.$onScrollTopChange = this.onScrollTopChange.bind(this), this.session.on("changeScrollTop", this.$onScrollTopChange), this.$onScrollLeftChange = this.onScrollLeftChange.bind(this), this.session.on("changeScrollLeft", this.$onScrollLeftChange), this.selection = e2.getSelection(), this.selection.on("changeCursor", this.$onCursorChange), this.$onSelectionChange = this.onSelectionChange.bind(this), this.selection.on("changeSelection", this.$onSelectionChange), this.onChangeMode(), this.onCursorChange(), this.onScrollTopChange(), this.onScrollLeftChange(), this.onSelectionChange(), this.onChangeFrontMarker(), this.onChangeBackMarker(), this.onChangeBreakpoint(), this.onChangeAnnotation(), this.session.getUseWrapMode() && this.renderer.adjustWrapLimit(), this.renderer.updateFull()) : (this.selection = null, this.renderer.setSession(e2)), this._signal("changeSession", { session: e2, oldSession: t2 }), this.curOp = null, t2 && t2._signal("changeEditor", { oldEditor: this }), e2 && e2._signal("changeEditor", { editor: this }), e2 && !e2.destroyed && e2.bgTokenizer.scheduleStart();
        }, this.getSession = function() {
          return this.session;
        }, this.setValue = function(e2, t2) {
          return this.session.doc.setValue(e2), t2 ? t2 == 1 ? this.navigateFileEnd() : t2 == -1 && this.navigateFileStart() : this.selectAll(), e2;
        }, this.getValue = function() {
          return this.session.getValue();
        }, this.getSelection = function() {
          return this.selection;
        }, this.resize = function(e2) {
          this.renderer.onResize(e2);
        }, this.setTheme = function(e2, t2) {
          this.renderer.setTheme(e2, t2);
        }, this.getTheme = function() {
          return this.renderer.getTheme();
        }, this.setStyle = function(e2) {
          this.renderer.setStyle(e2);
        }, this.unsetStyle = function(e2) {
          this.renderer.unsetStyle(e2);
        }, this.getFontSize = function() {
          return this.getOption("fontSize") || i.computedStyle(this.container).fontSize;
        }, this.setFontSize = function(e2) {
          this.setOption("fontSize", e2);
        }, this.$highlightBrackets = function() {
          if (this.$highlightPending)
            return;
          var e2 = this;
          this.$highlightPending = true, setTimeout(function() {
            e2.$highlightPending = false;
            var t2 = e2.session;
            if (!t2 || t2.destroyed)
              return;
            t2.$bracketHighlight && (t2.$bracketHighlight.markerIds.forEach(function(e3) {
              t2.removeMarker(e3);
            }), t2.$bracketHighlight = null);
            var n2 = t2.getMatchingBracketRanges(e2.getCursorPosition());
            !n2 && t2.$mode.getMatching && (n2 = t2.$mode.getMatching(e2.session));
            if (!n2)
              return;
            var r2 = "ace_bracket";
            Array.isArray(n2) ? n2.length == 1 && (r2 = "ace_error_bracket") : n2 = [n2], n2.length == 2 && (p.comparePoints(n2[0].end, n2[1].start) == 0 ? n2 = [p.fromPoints(n2[0].start, n2[1].end)] : p.comparePoints(n2[0].start, n2[1].end) == 0 && (n2 = [p.fromPoints(n2[1].start, n2[0].end)])), t2.$bracketHighlight = { ranges: n2, markerIds: n2.map(function(e3) {
              return t2.addMarker(e3, r2, "text");
            }) };
          }, 50);
        }, this.$highlightTags = function() {
          if (this.$highlightTagPending)
            return;
          var e2 = this;
          this.$highlightTagPending = true, setTimeout(function() {
            e2.$highlightTagPending = false;
            var t2 = e2.session;
            if (!t2 || t2.destroyed)
              return;
            var n2 = e2.getCursorPosition(), r2 = new y(e2.session, n2.row, n2.column), i2 = r2.getCurrentToken();
            if (!i2 || !/\b(?:tag-open|tag-name)/.test(i2.type)) {
              t2.removeMarker(t2.$tagHighlight), t2.$tagHighlight = null;
              return;
            }
            if (i2.type.indexOf("tag-open") !== -1) {
              i2 = r2.stepForward();
              if (!i2)
                return;
            }
            var s2 = i2.value, o2 = i2.value, u2 = 0, a2 = r2.stepBackward();
            if (a2.value === "<") {
              do
                a2 = i2, i2 = r2.stepForward(), i2 && (i2.type.indexOf("tag-name") !== -1 ? (o2 = i2.value, s2 === o2 && (a2.value === "<" ? u2++ : a2.value === "</" && u2--)) : s2 === o2 && i2.value === "/>" && u2--);
              while (i2 && u2 >= 0);
            } else {
              do {
                i2 = a2, a2 = r2.stepBackward();
                if (i2) {
                  if (i2.type.indexOf("tag-name") !== -1)
                    s2 === i2.value && (a2.value === "<" ? u2++ : a2.value === "</" && u2--);
                  else if (i2.value === "/>") {
                    var f2 = 0, l2 = a2;
                    while (l2) {
                      if (l2.type.indexOf("tag-name") !== -1 && l2.value === s2) {
                        u2--;
                        break;
                      }
                      if (l2.value === "<")
                        break;
                      l2 = r2.stepBackward(), f2++;
                    }
                    for (var c2 = 0; c2 < f2; c2++)
                      r2.stepForward();
                  }
                }
              } while (a2 && u2 <= 0);
              r2.stepForward();
            }
            if (!i2) {
              t2.removeMarker(t2.$tagHighlight), t2.$tagHighlight = null;
              return;
            }
            var h2 = r2.getCurrentTokenRow(), d2 = r2.getCurrentTokenColumn(), v2 = new p(h2, d2, h2, d2 + i2.value.length), m2 = t2.$backMarkers[t2.$tagHighlight];
            t2.$tagHighlight && m2 != void 0 && v2.compareRange(m2.range) !== 0 && (t2.removeMarker(t2.$tagHighlight), t2.$tagHighlight = null), t2.$tagHighlight || (t2.$tagHighlight = t2.addMarker(v2, "ace_bracket", "text"));
          }, 50);
        }, this.focus = function() {
          this.textInput.focus();
        }, this.isFocused = function() {
          return this.textInput.isFocused();
        }, this.blur = function() {
          this.textInput.blur();
        }, this.onFocus = function(e2) {
          if (this.$isFocused)
            return;
          this.$isFocused = true, this.renderer.showCursor(), this.renderer.visualizeFocus(), this._emit("focus", e2);
        }, this.onBlur = function(e2) {
          if (!this.$isFocused)
            return;
          this.$isFocused = false, this.renderer.hideCursor(), this.renderer.visualizeBlur(), this._emit("blur", e2);
        }, this.$cursorChange = function() {
          this.renderer.updateCursor(), this.$highlightBrackets(), this.$highlightTags(), this.$updateHighlightActiveLine();
        }, this.onDocumentChange = function(e2) {
          var t2 = this.session.$useWrapMode, n2 = e2.start.row == e2.end.row ? e2.end.row : Infinity;
          this.renderer.updateLines(e2.start.row, n2, t2), this._signal("change", e2), this.$cursorChange();
        }, this.onTokenizerUpdate = function(e2) {
          var t2 = e2.data;
          this.renderer.updateLines(t2.first, t2.last);
        }, this.onScrollTopChange = function() {
          this.renderer.scrollToY(this.session.getScrollTop());
        }, this.onScrollLeftChange = function() {
          this.renderer.scrollToX(this.session.getScrollLeft());
        }, this.onCursorChange = function() {
          this.$cursorChange(), this._signal("changeSelection");
        }, this.$updateHighlightActiveLine = function() {
          var e2 = this.getSession(), t2;
          if (this.$highlightActiveLine) {
            if (this.$selectionStyle != "line" || !this.selection.isMultiLine())
              t2 = this.getCursorPosition();
            this.renderer.theme && this.renderer.theme.$selectionColorConflict && !this.selection.isEmpty() && (t2 = false), this.renderer.$maxLines && this.session.getLength() === 1 && !(this.renderer.$minLines > 1) && (t2 = false);
          }
          if (e2.$highlightLineMarker && !t2)
            e2.removeMarker(e2.$highlightLineMarker.id), e2.$highlightLineMarker = null;
          else if (!e2.$highlightLineMarker && t2) {
            var n2 = new p(t2.row, t2.column, t2.row, Infinity);
            n2.id = e2.addMarker(n2, "ace_active-line", "screenLine"), e2.$highlightLineMarker = n2;
          } else
            t2 && (e2.$highlightLineMarker.start.row = t2.row, e2.$highlightLineMarker.end.row = t2.row, e2.$highlightLineMarker.start.column = t2.column, e2._signal("changeBackMarker"));
        }, this.onSelectionChange = function(e2) {
          var t2 = this.session;
          t2.$selectionMarker && t2.removeMarker(t2.$selectionMarker), t2.$selectionMarker = null;
          if (!this.selection.isEmpty()) {
            var n2 = this.selection.getRange(), r2 = this.getSelectionStyle();
            t2.$selectionMarker = t2.addMarker(n2, "ace_selection", r2);
          } else
            this.$updateHighlightActiveLine();
          var i2 = this.$highlightSelectedWord && this.$getSelectionHighLightRegexp();
          this.session.highlight(i2), this._signal("changeSelection");
        }, this.$getSelectionHighLightRegexp = function() {
          var e2 = this.session, t2 = this.getSelectionRange();
          if (t2.isEmpty() || t2.isMultiLine())
            return;
          var n2 = t2.start.column, r2 = t2.end.column, i2 = e2.getLine(t2.start.row), s2 = i2.substring(n2, r2);
          if (s2.length > 5e3 || !/[\w\d]/.test(s2))
            return;
          var o2 = this.$search.$assembleRegExp({ wholeWord: true, caseSensitive: true, needle: s2 }), u2 = i2.substring(n2 - 1, r2 + 1);
          if (!o2.test(u2))
            return;
          return o2;
        }, this.onChangeFrontMarker = function() {
          this.renderer.updateFrontMarkers();
        }, this.onChangeBackMarker = function() {
          this.renderer.updateBackMarkers();
        }, this.onChangeBreakpoint = function() {
          this.renderer.updateBreakpoints();
        }, this.onChangeAnnotation = function() {
          this.renderer.setAnnotations(this.session.getAnnotations());
        }, this.onChangeMode = function(e2) {
          this.renderer.updateText(), this._emit("changeMode", e2);
        }, this.onChangeWrapLimit = function() {
          this.renderer.updateFull();
        }, this.onChangeWrapMode = function() {
          this.renderer.onResize(true);
        }, this.onChangeFold = function() {
          this.$updateHighlightActiveLine(), this.renderer.updateFull();
        }, this.getSelectedText = function() {
          return this.session.getTextRange(this.getSelectionRange());
        }, this.getCopyText = function() {
          var e2 = this.getSelectedText(), t2 = this.session.doc.getNewLineCharacter(), n2 = false;
          if (!e2 && this.$copyWithEmptySelection) {
            n2 = true;
            var r2 = this.selection.getAllRanges();
            for (var i2 = 0; i2 < r2.length; i2++) {
              var s2 = r2[i2];
              if (i2 && r2[i2 - 1].start.row == s2.start.row)
                continue;
              e2 += this.session.getLine(s2.start.row) + t2;
            }
          }
          var o2 = { text: e2 };
          return this._signal("copy", o2), b.lineMode = n2 ? o2.text : false, o2.text;
        }, this.onCopy = function() {
          this.commands.exec("copy", this);
        }, this.onCut = function() {
          this.commands.exec("cut", this);
        }, this.onPaste = function(e2, t2) {
          var n2 = { text: e2, event: t2 };
          this.commands.exec("paste", this, n2);
        }, this.$handlePaste = function(e2) {
          typeof e2 == "string" && (e2 = { text: e2 }), this._signal("paste", e2);
          var t2 = e2.text, n2 = t2 === b.lineMode, r2 = this.session;
          if (!this.inMultiSelectMode || this.inVirtualSelectionMode)
            n2 ? r2.insert({ row: this.selection.lead.row, column: 0 }, t2) : this.insert(t2);
          else if (n2)
            this.selection.rangeList.ranges.forEach(function(e3) {
              r2.insert({ row: e3.start.row, column: 0 }, t2);
            });
          else {
            var i2 = t2.split(/\r\n|\r|\n/), s2 = this.selection.rangeList.ranges, o2 = i2.length == 2 && (!i2[0] || !i2[1]);
            if (i2.length != s2.length || o2)
              return this.commands.exec("insertstring", this, t2);
            for (var u2 = s2.length; u2--; ) {
              var a2 = s2[u2];
              a2.isEmpty() || r2.remove(a2), r2.insert(a2.start, i2[u2]);
            }
          }
        }, this.execCommand = function(e2, t2) {
          return this.commands.exec(e2, this, t2);
        }, this.insert = function(e2, t2) {
          var n2 = this.session, r2 = n2.getMode(), i2 = this.getCursorPosition();
          if (this.getBehavioursEnabled() && !t2) {
            var s2 = r2.transformAction(n2.getState(i2.row), "insertion", this, n2, e2);
            s2 && (e2 !== s2.text && (this.inVirtualSelectionMode || (this.session.mergeUndoDeltas = false, this.mergeNextCommand = false)), e2 = s2.text);
          }
          e2 == "	" && (e2 = this.session.getTabString());
          if (!this.selection.isEmpty()) {
            var o2 = this.getSelectionRange();
            i2 = this.session.remove(o2), this.clearSelection();
          } else if (this.session.getOverwrite() && e2.indexOf("\n") == -1) {
            var o2 = new p.fromPoints(i2, i2);
            o2.end.column += e2.length, this.session.remove(o2);
          }
          if (e2 == "\n" || e2 == "\r\n") {
            var u2 = n2.getLine(i2.row);
            if (i2.column > u2.search(/\S|$/)) {
              var a2 = u2.substr(i2.column).search(/\S|$/);
              n2.doc.removeInLine(i2.row, i2.column, i2.column + a2);
            }
          }
          this.clearSelection();
          var f2 = i2.column, l2 = n2.getState(i2.row), u2 = n2.getLine(i2.row), c2 = r2.checkOutdent(l2, u2, e2);
          n2.insert(i2, e2), s2 && s2.selection && (s2.selection.length == 2 ? this.selection.setSelectionRange(new p(i2.row, f2 + s2.selection[0], i2.row, f2 + s2.selection[1])) : this.selection.setSelectionRange(new p(i2.row + s2.selection[0], s2.selection[1], i2.row + s2.selection[2], s2.selection[3])));
          if (this.$enableAutoIndent) {
            if (n2.getDocument().isNewLine(e2)) {
              var h2 = r2.getNextLineIndent(l2, u2.slice(0, i2.column), n2.getTabString());
              n2.insert({ row: i2.row + 1, column: 0 }, h2);
            }
            c2 && r2.autoOutdent(l2, n2, i2.row);
          }
        }, this.autoIndent = function() {
          var e2 = this.session, t2 = e2.getMode(), n2, r2;
          if (this.selection.isEmpty())
            n2 = 0, r2 = e2.doc.getLength() - 1;
          else {
            var i2 = this.getSelectionRange();
            n2 = i2.start.row, r2 = i2.end.row;
          }
          var s2 = "", o2 = "", u2 = "", a2, f2, l2, c2 = e2.getTabString();
          for (var h2 = n2; h2 <= r2; h2++)
            h2 > 0 && (s2 = e2.getState(h2 - 1), o2 = e2.getLine(h2 - 1), u2 = t2.getNextLineIndent(s2, o2, c2)), a2 = e2.getLine(h2), f2 = t2.$getIndent(a2), u2 !== f2 && (f2.length > 0 && (l2 = new p(h2, 0, h2, f2.length), e2.remove(l2)), u2.length > 0 && e2.insert({ row: h2, column: 0 }, u2)), t2.autoOutdent(s2, e2, h2);
        }, this.onTextInput = function(e2, t2) {
          if (!t2)
            return this.keyBinding.onTextInput(e2);
          this.startOperation({ command: { name: "insertstring" } });
          var n2 = this.applyComposition.bind(this, e2, t2);
          this.selection.rangeCount ? this.forEachSelection(n2) : n2(), this.endOperation();
        }, this.applyComposition = function(e2, t2) {
          if (t2.extendLeft || t2.extendRight) {
            var n2 = this.selection.getRange();
            n2.start.column -= t2.extendLeft, n2.end.column += t2.extendRight, n2.start.column < 0 && (n2.start.row--, n2.start.column += this.session.getLine(n2.start.row).length + 1), this.selection.setRange(n2), !e2 && !n2.isEmpty() && this.remove();
          }
          (e2 || !this.selection.isEmpty()) && this.insert(e2, true);
          if (t2.restoreStart || t2.restoreEnd) {
            var n2 = this.selection.getRange();
            n2.start.column -= t2.restoreStart, n2.end.column -= t2.restoreEnd, this.selection.setRange(n2);
          }
        }, this.onCommandKey = function(e2, t2, n2) {
          return this.keyBinding.onCommandKey(e2, t2, n2);
        }, this.setOverwrite = function(e2) {
          this.session.setOverwrite(e2);
        }, this.getOverwrite = function() {
          return this.session.getOverwrite();
        }, this.toggleOverwrite = function() {
          this.session.toggleOverwrite();
        }, this.setScrollSpeed = function(e2) {
          this.setOption("scrollSpeed", e2);
        }, this.getScrollSpeed = function() {
          return this.getOption("scrollSpeed");
        }, this.setDragDelay = function(e2) {
          this.setOption("dragDelay", e2);
        }, this.getDragDelay = function() {
          return this.getOption("dragDelay");
        }, this.setSelectionStyle = function(e2) {
          this.setOption("selectionStyle", e2);
        }, this.getSelectionStyle = function() {
          return this.getOption("selectionStyle");
        }, this.setHighlightActiveLine = function(e2) {
          this.setOption("highlightActiveLine", e2);
        }, this.getHighlightActiveLine = function() {
          return this.getOption("highlightActiveLine");
        }, this.setHighlightGutterLine = function(e2) {
          this.setOption("highlightGutterLine", e2);
        }, this.getHighlightGutterLine = function() {
          return this.getOption("highlightGutterLine");
        }, this.setHighlightSelectedWord = function(e2) {
          this.setOption("highlightSelectedWord", e2);
        }, this.getHighlightSelectedWord = function() {
          return this.$highlightSelectedWord;
        }, this.setAnimatedScroll = function(e2) {
          this.renderer.setAnimatedScroll(e2);
        }, this.getAnimatedScroll = function() {
          return this.renderer.getAnimatedScroll();
        }, this.setShowInvisibles = function(e2) {
          this.renderer.setShowInvisibles(e2);
        }, this.getShowInvisibles = function() {
          return this.renderer.getShowInvisibles();
        }, this.setDisplayIndentGuides = function(e2) {
          this.renderer.setDisplayIndentGuides(e2);
        }, this.getDisplayIndentGuides = function() {
          return this.renderer.getDisplayIndentGuides();
        }, this.setShowPrintMargin = function(e2) {
          this.renderer.setShowPrintMargin(e2);
        }, this.getShowPrintMargin = function() {
          return this.renderer.getShowPrintMargin();
        }, this.setPrintMarginColumn = function(e2) {
          this.renderer.setPrintMarginColumn(e2);
        }, this.getPrintMarginColumn = function() {
          return this.renderer.getPrintMarginColumn();
        }, this.setReadOnly = function(e2) {
          this.setOption("readOnly", e2);
        }, this.getReadOnly = function() {
          return this.getOption("readOnly");
        }, this.setBehavioursEnabled = function(e2) {
          this.setOption("behavioursEnabled", e2);
        }, this.getBehavioursEnabled = function() {
          return this.getOption("behavioursEnabled");
        }, this.setWrapBehavioursEnabled = function(e2) {
          this.setOption("wrapBehavioursEnabled", e2);
        }, this.getWrapBehavioursEnabled = function() {
          return this.getOption("wrapBehavioursEnabled");
        }, this.setShowFoldWidgets = function(e2) {
          this.setOption("showFoldWidgets", e2);
        }, this.getShowFoldWidgets = function() {
          return this.getOption("showFoldWidgets");
        }, this.setFadeFoldWidgets = function(e2) {
          this.setOption("fadeFoldWidgets", e2);
        }, this.getFadeFoldWidgets = function() {
          return this.getOption("fadeFoldWidgets");
        }, this.remove = function(e2) {
          this.selection.isEmpty() && (e2 == "left" ? this.selection.selectLeft() : this.selection.selectRight());
          var t2 = this.getSelectionRange();
          if (this.getBehavioursEnabled()) {
            var n2 = this.session, r2 = n2.getState(t2.start.row), i2 = n2.getMode().transformAction(r2, "deletion", this, n2, t2);
            if (t2.end.column === 0) {
              var s2 = n2.getTextRange(t2);
              if (s2[s2.length - 1] == "\n") {
                var o2 = n2.getLine(t2.end.row);
                /^\s+$/.test(o2) && (t2.end.column = o2.length);
              }
            }
            i2 && (t2 = i2);
          }
          this.session.remove(t2), this.clearSelection();
        }, this.removeWordRight = function() {
          this.selection.isEmpty() && this.selection.selectWordRight(), this.session.remove(this.getSelectionRange()), this.clearSelection();
        }, this.removeWordLeft = function() {
          this.selection.isEmpty() && this.selection.selectWordLeft(), this.session.remove(this.getSelectionRange()), this.clearSelection();
        }, this.removeToLineStart = function() {
          this.selection.isEmpty() && this.selection.selectLineStart(), this.selection.isEmpty() && this.selection.selectLeft(), this.session.remove(this.getSelectionRange()), this.clearSelection();
        }, this.removeToLineEnd = function() {
          this.selection.isEmpty() && this.selection.selectLineEnd();
          var e2 = this.getSelectionRange();
          e2.start.column == e2.end.column && e2.start.row == e2.end.row && (e2.end.column = 0, e2.end.row++), this.session.remove(e2), this.clearSelection();
        }, this.splitLine = function() {
          this.selection.isEmpty() || (this.session.remove(this.getSelectionRange()), this.clearSelection());
          var e2 = this.getCursorPosition();
          this.insert("\n"), this.moveCursorToPosition(e2);
        }, this.transposeLetters = function() {
          if (!this.selection.isEmpty())
            return;
          var e2 = this.getCursorPosition(), t2 = e2.column;
          if (t2 === 0)
            return;
          var n2 = this.session.getLine(e2.row), r2, i2;
          t2 < n2.length ? (r2 = n2.charAt(t2) + n2.charAt(t2 - 1), i2 = new p(e2.row, t2 - 1, e2.row, t2 + 1)) : (r2 = n2.charAt(t2 - 1) + n2.charAt(t2 - 2), i2 = new p(e2.row, t2 - 2, e2.row, t2)), this.session.replace(i2, r2), this.session.selection.moveToPosition(i2.end);
        }, this.toLowerCase = function() {
          var e2 = this.getSelectionRange();
          this.selection.isEmpty() && this.selection.selectWord();
          var t2 = this.getSelectionRange(), n2 = this.session.getTextRange(t2);
          this.session.replace(t2, n2.toLowerCase()), this.selection.setSelectionRange(e2);
        }, this.toUpperCase = function() {
          var e2 = this.getSelectionRange();
          this.selection.isEmpty() && this.selection.selectWord();
          var t2 = this.getSelectionRange(), n2 = this.session.getTextRange(t2);
          this.session.replace(t2, n2.toUpperCase()), this.selection.setSelectionRange(e2);
        }, this.indent = function() {
          var e2 = this.session, t2 = this.getSelectionRange();
          if (t2.start.row < t2.end.row) {
            var n2 = this.$getSelectedRows();
            e2.indentRows(n2.first, n2.last, "	");
            return;
          }
          if (t2.start.column < t2.end.column) {
            var r2 = e2.getTextRange(t2);
            if (!/^\s+$/.test(r2)) {
              var n2 = this.$getSelectedRows();
              e2.indentRows(n2.first, n2.last, "	");
              return;
            }
          }
          var i2 = e2.getLine(t2.start.row), o2 = t2.start, u2 = e2.getTabSize(), a2 = e2.documentToScreenColumn(o2.row, o2.column);
          if (this.session.getUseSoftTabs())
            var f2 = u2 - a2 % u2, l2 = s.stringRepeat(" ", f2);
          else {
            var f2 = a2 % u2;
            while (i2[t2.start.column - 1] == " " && f2)
              t2.start.column--, f2--;
            this.selection.setSelectionRange(t2), l2 = "	";
          }
          return this.insert(l2);
        }, this.blockIndent = function() {
          var e2 = this.$getSelectedRows();
          this.session.indentRows(e2.first, e2.last, "	");
        }, this.blockOutdent = function() {
          var e2 = this.session.getSelection();
          this.session.outdentRows(e2.getRange());
        }, this.sortLines = function() {
          var e2 = this.$getSelectedRows(), t2 = this.session, n2 = [];
          for (var r2 = e2.first; r2 <= e2.last; r2++)
            n2.push(t2.getLine(r2));
          n2.sort(function(e3, t3) {
            return e3.toLowerCase() < t3.toLowerCase() ? -1 : e3.toLowerCase() > t3.toLowerCase() ? 1 : 0;
          });
          var i2 = new p(0, 0, 0, 0);
          for (var r2 = e2.first; r2 <= e2.last; r2++) {
            var s2 = t2.getLine(r2);
            i2.start.row = r2, i2.end.row = r2, i2.end.column = s2.length, t2.replace(i2, n2[r2 - e2.first]);
          }
        }, this.toggleCommentLines = function() {
          var e2 = this.session.getState(this.getCursorPosition().row), t2 = this.$getSelectedRows();
          this.session.getMode().toggleCommentLines(e2, this.session, t2.first, t2.last);
        }, this.toggleBlockComment = function() {
          var e2 = this.getCursorPosition(), t2 = this.session.getState(e2.row), n2 = this.getSelectionRange();
          this.session.getMode().toggleBlockComment(t2, this.session, n2, e2);
        }, this.getNumberAt = function(e2, t2) {
          var n2 = /[\-]?[0-9]+(?:\.[0-9]+)?/g;
          n2.lastIndex = 0;
          var r2 = this.session.getLine(e2);
          while (n2.lastIndex < t2) {
            var i2 = n2.exec(r2);
            if (i2.index <= t2 && i2.index + i2[0].length >= t2) {
              var s2 = { value: i2[0], start: i2.index, end: i2.index + i2[0].length };
              return s2;
            }
          }
          return null;
        }, this.modifyNumber = function(e2) {
          var t2 = this.selection.getCursor().row, n2 = this.selection.getCursor().column, r2 = new p(t2, n2 - 1, t2, n2), i2 = this.session.getTextRange(r2);
          if (!isNaN(parseFloat(i2)) && isFinite(i2)) {
            var s2 = this.getNumberAt(t2, n2);
            if (s2) {
              var o2 = s2.value.indexOf(".") >= 0 ? s2.start + s2.value.indexOf(".") + 1 : s2.end, u2 = s2.start + s2.value.length - o2, a2 = parseFloat(s2.value);
              a2 *= Math.pow(10, u2), o2 !== s2.end && n2 < o2 ? e2 *= Math.pow(10, s2.end - n2 - 1) : e2 *= Math.pow(10, s2.end - n2), a2 += e2, a2 /= Math.pow(10, u2);
              var f2 = a2.toFixed(u2), l2 = new p(t2, s2.start, t2, s2.end);
              this.session.replace(l2, f2), this.moveCursorTo(t2, Math.max(s2.start + 1, n2 + f2.length - s2.value.length));
            }
          } else
            this.toggleWord();
        }, this.$toggleWordPairs = [["first", "last"], ["true", "false"], ["yes", "no"], ["width", "height"], ["top", "bottom"], ["right", "left"], ["on", "off"], ["x", "y"], ["get", "set"], ["max", "min"], ["horizontal", "vertical"], ["show", "hide"], ["add", "remove"], ["up", "down"], ["before", "after"], ["even", "odd"], ["in", "out"], ["inside", "outside"], ["next", "previous"], ["increase", "decrease"], ["attach", "detach"], ["&&", "||"], ["==", "!="]], this.toggleWord = function() {
          var e2 = this.selection.getCursor().row, t2 = this.selection.getCursor().column;
          this.selection.selectWord();
          var n2 = this.getSelectedText(), r2 = this.selection.getWordRange().start.column, i2 = n2.replace(/([a-z]+|[A-Z]+)(?=[A-Z_]|$)/g, "$1 ").split(/\s/), o2 = t2 - r2 - 1;
          o2 < 0 && (o2 = 0);
          var u2 = 0, a2 = 0, f2 = this;
          n2.match(/[A-Za-z0-9_]+/) && i2.forEach(function(t3, i3) {
            a2 = u2 + t3.length, o2 >= u2 && o2 <= a2 && (n2 = t3, f2.selection.clearSelection(), f2.moveCursorTo(e2, u2 + r2), f2.selection.selectTo(e2, a2 + r2)), u2 = a2;
          });
          var l2 = this.$toggleWordPairs, c2;
          for (var h2 = 0; h2 < l2.length; h2++) {
            var p2 = l2[h2];
            for (var d2 = 0; d2 <= 1; d2++) {
              var v2 = +!d2, m2 = n2.match(new RegExp("^\\s?_?(" + s.escapeRegExp(p2[d2]) + ")\\s?$", "i"));
              if (m2) {
                var g2 = n2.match(new RegExp("([_]|^|\\s)(" + s.escapeRegExp(m2[1]) + ")($|\\s)", "g"));
                g2 && (c2 = n2.replace(new RegExp(s.escapeRegExp(p2[d2]), "i"), function(e3) {
                  var t3 = p2[v2];
                  return e3.toUpperCase() == e3 ? t3 = t3.toUpperCase() : e3.charAt(0).toUpperCase() == e3.charAt(0) && (t3 = t3.substr(0, 0) + p2[v2].charAt(0).toUpperCase() + t3.substr(1)), t3;
                }), this.insert(c2), c2 = "");
              }
            }
          }
        }, this.removeLines = function() {
          var e2 = this.$getSelectedRows();
          this.session.removeFullLines(e2.first, e2.last), this.clearSelection();
        }, this.duplicateSelection = function() {
          var e2 = this.selection, t2 = this.session, n2 = e2.getRange(), r2 = e2.isBackwards();
          if (n2.isEmpty()) {
            var i2 = n2.start.row;
            t2.duplicateLines(i2, i2);
          } else {
            var s2 = r2 ? n2.start : n2.end, o2 = t2.insert(s2, t2.getTextRange(n2), false);
            n2.start = s2, n2.end = o2, e2.setSelectionRange(n2, r2);
          }
        }, this.moveLinesDown = function() {
          this.$moveLines(1, false);
        }, this.moveLinesUp = function() {
          this.$moveLines(-1, false);
        }, this.moveText = function(e2, t2, n2) {
          return this.session.moveText(e2, t2, n2);
        }, this.copyLinesUp = function() {
          this.$moveLines(-1, true);
        }, this.copyLinesDown = function() {
          this.$moveLines(1, true);
        }, this.$moveLines = function(e2, t2) {
          var n2, r2, i2 = this.selection;
          if (!i2.inMultiSelectMode || this.inVirtualSelectionMode) {
            var s2 = i2.toOrientedRange();
            n2 = this.$getSelectedRows(s2), r2 = this.session.$moveLines(n2.first, n2.last, t2 ? 0 : e2), t2 && e2 == -1 && (r2 = 0), s2.moveBy(r2, 0), i2.fromOrientedRange(s2);
          } else {
            var o2 = i2.rangeList.ranges;
            i2.rangeList.detach(this.session), this.inVirtualSelectionMode = true;
            var u2 = 0, a2 = 0, f2 = o2.length;
            for (var l2 = 0; l2 < f2; l2++) {
              var c2 = l2;
              o2[l2].moveBy(u2, 0), n2 = this.$getSelectedRows(o2[l2]);
              var h2 = n2.first, p2 = n2.last;
              while (++l2 < f2) {
                a2 && o2[l2].moveBy(a2, 0);
                var d2 = this.$getSelectedRows(o2[l2]);
                if (t2 && d2.first != p2)
                  break;
                if (!t2 && d2.first > p2 + 1)
                  break;
                p2 = d2.last;
              }
              l2--, u2 = this.session.$moveLines(h2, p2, t2 ? 0 : e2), t2 && e2 == -1 && (c2 = l2 + 1);
              while (c2 <= l2)
                o2[c2].moveBy(u2, 0), c2++;
              t2 || (u2 = 0), a2 += u2;
            }
            i2.fromOrientedRange(i2.ranges[0]), i2.rangeList.attach(this.session), this.inVirtualSelectionMode = false;
          }
        }, this.$getSelectedRows = function(e2) {
          return e2 = (e2 || this.getSelectionRange()).collapseRows(), { first: this.session.getRowFoldStart(e2.start.row), last: this.session.getRowFoldEnd(e2.end.row) };
        }, this.onCompositionStart = function(e2) {
          this.renderer.showComposition(e2);
        }, this.onCompositionUpdate = function(e2) {
          this.renderer.setCompositionText(e2);
        }, this.onCompositionEnd = function() {
          this.renderer.hideComposition();
        }, this.getFirstVisibleRow = function() {
          return this.renderer.getFirstVisibleRow();
        }, this.getLastVisibleRow = function() {
          return this.renderer.getLastVisibleRow();
        }, this.isRowVisible = function(e2) {
          return e2 >= this.getFirstVisibleRow() && e2 <= this.getLastVisibleRow();
        }, this.isRowFullyVisible = function(e2) {
          return e2 >= this.renderer.getFirstFullyVisibleRow() && e2 <= this.renderer.getLastFullyVisibleRow();
        }, this.$getVisibleRowCount = function() {
          return this.renderer.getScrollBottomRow() - this.renderer.getScrollTopRow() + 1;
        }, this.$moveByPage = function(e2, t2) {
          var n2 = this.renderer, r2 = this.renderer.layerConfig, i2 = e2 * Math.floor(r2.height / r2.lineHeight);
          t2 === true ? this.selection.$moveSelection(function() {
            this.moveCursorBy(i2, 0);
          }) : t2 === false && (this.selection.moveCursorBy(i2, 0), this.selection.clearSelection());
          var s2 = n2.scrollTop;
          n2.scrollBy(0, i2 * r2.lineHeight), t2 != null && n2.scrollCursorIntoView(null, 0.5), n2.animateScrolling(s2);
        }, this.selectPageDown = function() {
          this.$moveByPage(1, true);
        }, this.selectPageUp = function() {
          this.$moveByPage(-1, true);
        }, this.gotoPageDown = function() {
          this.$moveByPage(1, false);
        }, this.gotoPageUp = function() {
          this.$moveByPage(-1, false);
        }, this.scrollPageDown = function() {
          this.$moveByPage(1);
        }, this.scrollPageUp = function() {
          this.$moveByPage(-1);
        }, this.scrollToRow = function(e2) {
          this.renderer.scrollToRow(e2);
        }, this.scrollToLine = function(e2, t2, n2, r2) {
          this.renderer.scrollToLine(e2, t2, n2, r2);
        }, this.centerSelection = function() {
          var e2 = this.getSelectionRange(), t2 = { row: Math.floor(e2.start.row + (e2.end.row - e2.start.row) / 2), column: Math.floor(e2.start.column + (e2.end.column - e2.start.column) / 2) };
          this.renderer.alignCursor(t2, 0.5);
        }, this.getCursorPosition = function() {
          return this.selection.getCursor();
        }, this.getCursorPositionScreen = function() {
          return this.session.documentToScreenPosition(this.getCursorPosition());
        }, this.getSelectionRange = function() {
          return this.selection.getRange();
        }, this.selectAll = function() {
          this.selection.selectAll();
        }, this.clearSelection = function() {
          this.selection.clearSelection();
        }, this.moveCursorTo = function(e2, t2) {
          this.selection.moveCursorTo(e2, t2);
        }, this.moveCursorToPosition = function(e2) {
          this.selection.moveCursorToPosition(e2);
        }, this.jumpToMatching = function(e2, t2) {
          var n2 = this.getCursorPosition(), r2 = new y(this.session, n2.row, n2.column), i2 = r2.getCurrentToken(), s2 = i2 || r2.stepForward();
          if (!s2)
            return;
          var o2, u2 = false, a2 = {}, f2 = n2.column - s2.start, l2, c2 = { ")": "(", "(": "(", "]": "[", "[": "[", "{": "{", "}": "{" };
          do {
            if (s2.value.match(/[{}()\[\]]/g))
              for (; f2 < s2.value.length && !u2; f2++) {
                if (!c2[s2.value[f2]])
                  continue;
                l2 = c2[s2.value[f2]] + "." + s2.type.replace("rparen", "lparen"), isNaN(a2[l2]) && (a2[l2] = 0);
                switch (s2.value[f2]) {
                  case "(":
                  case "[":
                  case "{":
                    a2[l2]++;
                    break;
                  case ")":
                  case "]":
                  case "}":
                    a2[l2]--, a2[l2] === -1 && (o2 = "bracket", u2 = true);
                }
              }
            else
              s2.type.indexOf("tag-name") !== -1 && (isNaN(a2[s2.value]) && (a2[s2.value] = 0), i2.value === "<" ? a2[s2.value]++ : i2.value === "</" && a2[s2.value]--, a2[s2.value] === -1 && (o2 = "tag", u2 = true));
            u2 || (i2 = s2, s2 = r2.stepForward(), f2 = 0);
          } while (s2 && !u2);
          if (!o2)
            return;
          var h2, d2;
          if (o2 === "bracket") {
            h2 = this.session.getBracketRange(n2);
            if (!h2) {
              h2 = new p(r2.getCurrentTokenRow(), r2.getCurrentTokenColumn() + f2 - 1, r2.getCurrentTokenRow(), r2.getCurrentTokenColumn() + f2 - 1), d2 = h2.start;
              if (t2 || d2.row === n2.row && Math.abs(d2.column - n2.column) < 2)
                h2 = this.session.getBracketRange(d2);
            }
          } else if (o2 === "tag") {
            if (!s2 || s2.type.indexOf("tag-name") === -1)
              return;
            var v2 = s2.value;
            h2 = new p(r2.getCurrentTokenRow(), r2.getCurrentTokenColumn() - 2, r2.getCurrentTokenRow(), r2.getCurrentTokenColumn() - 2);
            if (h2.compare(n2.row, n2.column) === 0) {
              u2 = false;
              do
                s2 = i2, i2 = r2.stepBackward(), i2 && (i2.type.indexOf("tag-close") !== -1 && h2.setEnd(r2.getCurrentTokenRow(), r2.getCurrentTokenColumn() + 1), s2.value === v2 && s2.type.indexOf("tag-name") !== -1 && (i2.value === "<" ? a2[v2]++ : i2.value === "</" && a2[v2]--, a2[v2] === 0 && (u2 = true)));
              while (i2 && !u2);
            }
            s2 && s2.type.indexOf("tag-name") && (d2 = h2.start, d2.row == n2.row && Math.abs(d2.column - n2.column) < 2 && (d2 = h2.end));
          }
          d2 = h2 && h2.cursor || d2, d2 && (e2 ? h2 && t2 ? this.selection.setRange(h2) : h2 && h2.isEqual(this.getSelectionRange()) ? this.clearSelection() : this.selection.selectTo(d2.row, d2.column) : this.selection.moveTo(d2.row, d2.column));
        }, this.gotoLine = function(e2, t2, n2) {
          this.selection.clearSelection(), this.session.unfold({ row: e2 - 1, column: t2 || 0 }), this.exitMultiSelectMode && this.exitMultiSelectMode(), this.moveCursorTo(e2 - 1, t2 || 0), this.isRowFullyVisible(e2 - 1) || this.scrollToLine(e2 - 1, true, n2);
        }, this.navigateTo = function(e2, t2) {
          this.selection.moveTo(e2, t2);
        }, this.navigateUp = function(e2) {
          if (this.selection.isMultiLine() && !this.selection.isBackwards()) {
            var t2 = this.selection.anchor.getPosition();
            return this.moveCursorToPosition(t2);
          }
          this.selection.clearSelection(), this.selection.moveCursorBy(-e2 || -1, 0);
        }, this.navigateDown = function(e2) {
          if (this.selection.isMultiLine() && this.selection.isBackwards()) {
            var t2 = this.selection.anchor.getPosition();
            return this.moveCursorToPosition(t2);
          }
          this.selection.clearSelection(), this.selection.moveCursorBy(e2 || 1, 0);
        }, this.navigateLeft = function(e2) {
          if (!this.selection.isEmpty()) {
            var t2 = this.getSelectionRange().start;
            this.moveCursorToPosition(t2);
          } else {
            e2 = e2 || 1;
            while (e2--)
              this.selection.moveCursorLeft();
          }
          this.clearSelection();
        }, this.navigateRight = function(e2) {
          if (!this.selection.isEmpty()) {
            var t2 = this.getSelectionRange().end;
            this.moveCursorToPosition(t2);
          } else {
            e2 = e2 || 1;
            while (e2--)
              this.selection.moveCursorRight();
          }
          this.clearSelection();
        }, this.navigateLineStart = function() {
          this.selection.moveCursorLineStart(), this.clearSelection();
        }, this.navigateLineEnd = function() {
          this.selection.moveCursorLineEnd(), this.clearSelection();
        }, this.navigateFileEnd = function() {
          this.selection.moveCursorFileEnd(), this.clearSelection();
        }, this.navigateFileStart = function() {
          this.selection.moveCursorFileStart(), this.clearSelection();
        }, this.navigateWordRight = function() {
          this.selection.moveCursorWordRight(), this.clearSelection();
        }, this.navigateWordLeft = function() {
          this.selection.moveCursorWordLeft(), this.clearSelection();
        }, this.replace = function(e2, t2) {
          t2 && this.$search.set(t2);
          var n2 = this.$search.find(this.session), r2 = 0;
          return n2 ? (this.$tryReplace(n2, e2) && (r2 = 1), this.selection.setSelectionRange(n2), this.renderer.scrollSelectionIntoView(n2.start, n2.end), r2) : r2;
        }, this.replaceAll = function(e2, t2) {
          t2 && this.$search.set(t2);
          var n2 = this.$search.findAll(this.session), r2 = 0;
          if (!n2.length)
            return r2;
          var i2 = this.getSelectionRange();
          this.selection.moveTo(0, 0);
          for (var s2 = n2.length - 1; s2 >= 0; --s2)
            this.$tryReplace(n2[s2], e2) && r2++;
          return this.selection.setSelectionRange(i2), r2;
        }, this.$tryReplace = function(e2, t2) {
          var n2 = this.session.getTextRange(e2);
          return t2 = this.$search.replace(n2, t2), t2 !== null ? (e2.end = this.session.replace(e2, t2), e2) : null;
        }, this.getLastSearchOptions = function() {
          return this.$search.getOptions();
        }, this.find = function(e2, t2, n2) {
          t2 || (t2 = {}), typeof e2 == "string" || e2 instanceof RegExp ? t2.needle = e2 : typeof e2 == "object" && r.mixin(t2, e2);
          var i2 = this.selection.getRange();
          t2.needle == null && (e2 = this.session.getTextRange(i2) || this.$search.$options.needle, e2 || (i2 = this.session.getWordRange(i2.start.row, i2.start.column), e2 = this.session.getTextRange(i2)), this.$search.set({ needle: e2 })), this.$search.set(t2), t2.start || this.$search.set({ start: i2 });
          var s2 = this.$search.find(this.session);
          if (t2.preventScroll)
            return s2;
          if (s2)
            return this.revealRange(s2, n2), s2;
          t2.backwards ? i2.start = i2.end : i2.end = i2.start, this.selection.setRange(i2);
        }, this.findNext = function(e2, t2) {
          this.find({ skipCurrent: true, backwards: false }, e2, t2);
        }, this.findPrevious = function(e2, t2) {
          this.find(e2, { skipCurrent: true, backwards: true }, t2);
        }, this.revealRange = function(e2, t2) {
          this.session.unfold(e2), this.selection.setSelectionRange(e2);
          var n2 = this.renderer.scrollTop;
          this.renderer.scrollSelectionIntoView(e2.start, e2.end, 0.5), t2 !== false && this.renderer.animateScrolling(n2);
        }, this.undo = function() {
          this.session.getUndoManager().undo(this.session), this.renderer.scrollCursorIntoView(null, 0.5);
        }, this.redo = function() {
          this.session.getUndoManager().redo(this.session), this.renderer.scrollCursorIntoView(null, 0.5);
        }, this.destroy = function() {
          this.$toDestroy && (this.$toDestroy.forEach(function(e2) {
            e2.destroy();
          }), this.$toDestroy = null), this.$mouseHandler && this.$mouseHandler.destroy(), this.renderer.destroy(), this._signal("destroy", this), this.session && this.session.destroy(), this._$emitInputEvent && this._$emitInputEvent.cancel(), this.removeAllListeners();
        }, this.setAutoScrollEditorIntoView = function(e2) {
          if (!e2)
            return;
          var t2, n2 = this, r2 = false;
          this.$scrollAnchor || (this.$scrollAnchor = document.createElement("div"));
          var i2 = this.$scrollAnchor;
          i2.style.cssText = "position:absolute", this.container.insertBefore(i2, this.container.firstChild);
          var s2 = this.on("changeSelection", function() {
            r2 = true;
          }), o2 = this.renderer.on("beforeRender", function() {
            r2 && (t2 = n2.renderer.container.getBoundingClientRect());
          }), u2 = this.renderer.on("afterRender", function() {
            if (r2 && t2 && (n2.isFocused() || n2.searchBox && n2.searchBox.isFocused())) {
              var e3 = n2.renderer, s3 = e3.$cursorLayer.$pixelPos, o3 = e3.layerConfig, u3 = s3.top - o3.offset;
              s3.top >= 0 && u3 + t2.top < 0 ? r2 = true : s3.top < o3.height && s3.top + t2.top + o3.lineHeight > window.innerHeight ? r2 = false : r2 = null, r2 != null && (i2.style.top = u3 + "px", i2.style.left = s3.left + "px", i2.style.height = o3.lineHeight + "px", i2.scrollIntoView(r2)), r2 = t2 = null;
            }
          });
          this.setAutoScrollEditorIntoView = function(e3) {
            if (e3)
              return;
            delete this.setAutoScrollEditorIntoView, this.off("changeSelection", s2), this.renderer.off("afterRender", u2), this.renderer.off("beforeRender", o2);
          };
        }, this.$resetCursorStyle = function() {
          var e2 = this.$cursorStyle || "ace", t2 = this.renderer.$cursorLayer;
          if (!t2)
            return;
          t2.setSmoothBlinking(/smooth/.test(e2)), t2.isBlinking = !this.$readOnly && e2 != "wide", i.setCssClass(t2.element, "ace_slim-cursors", /slim/.test(e2));
        }, this.prompt = function(e2, t2, n2) {
          var r2 = this;
          g.loadModule("./ext/prompt", function(i2) {
            i2.prompt(r2, e2, t2, n2);
          });
        };
      }.call(w.prototype), g.defineOptions(w.prototype, "editor", { selectionStyle: { set: function(e2) {
        this.onSelectionChange(), this._signal("changeSelectionStyle", { data: e2 });
      }, initialValue: "line" }, highlightActiveLine: { set: function() {
        this.$updateHighlightActiveLine();
      }, initialValue: true }, highlightSelectedWord: { set: function(e2) {
        this.$onSelectionChange();
      }, initialValue: true }, readOnly: { set: function(e2) {
        this.textInput.setReadOnly(e2), this.$resetCursorStyle();
      }, initialValue: false }, copyWithEmptySelection: { set: function(e2) {
        this.textInput.setCopyWithEmptySelection(e2);
      }, initialValue: false }, cursorStyle: { set: function(e2) {
        this.$resetCursorStyle();
      }, values: ["ace", "slim", "smooth", "wide"], initialValue: "ace" }, mergeUndoDeltas: { values: [false, true, "always"], initialValue: true }, behavioursEnabled: { initialValue: true }, wrapBehavioursEnabled: { initialValue: true }, enableAutoIndent: { initialValue: true }, autoScrollEditorIntoView: { set: function(e2) {
        this.setAutoScrollEditorIntoView(e2);
      } }, keyboardHandler: { set: function(e2) {
        this.setKeyboardHandler(e2);
      }, get: function() {
        return this.$keybindingId;
      }, handlesSet: true }, value: { set: function(e2) {
        this.session.setValue(e2);
      }, get: function() {
        return this.getValue();
      }, handlesSet: true, hidden: true }, session: { set: function(e2) {
        this.setSession(e2);
      }, get: function() {
        return this.session;
      }, handlesSet: true, hidden: true }, showLineNumbers: { set: function(e2) {
        this.renderer.$gutterLayer.setShowLineNumbers(e2), this.renderer.$loop.schedule(this.renderer.CHANGE_GUTTER), e2 && this.$relativeLineNumbers ? E.attach(this) : E.detach(this);
      }, initialValue: true }, relativeLineNumbers: { set: function(e2) {
        this.$showLineNumbers && e2 ? E.attach(this) : E.detach(this);
      } }, placeholder: { set: function(e2) {
        this.$updatePlaceholder || (this.$updatePlaceholder = function() {
          var e3 = this.session && (this.renderer.$composition || this.getValue());
          if (e3 && this.renderer.placeholderNode)
            this.renderer.off("afterRender", this.$updatePlaceholder), i.removeCssClass(this.container, "ace_hasPlaceholder"), this.renderer.placeholderNode.remove(), this.renderer.placeholderNode = null;
          else if (!e3 && !this.renderer.placeholderNode) {
            this.renderer.on("afterRender", this.$updatePlaceholder), i.addCssClass(this.container, "ace_hasPlaceholder");
            var t2 = i.createElement("div");
            t2.className = "ace_placeholder", t2.textContent = this.$placeholder || "", this.renderer.placeholderNode = t2, this.renderer.content.appendChild(this.renderer.placeholderNode);
          } else
            !e3 && this.renderer.placeholderNode && (this.renderer.placeholderNode.textContent = this.$placeholder || "");
        }.bind(this), this.on("input", this.$updatePlaceholder)), this.$updatePlaceholder();
      } }, hScrollBarAlwaysVisible: "renderer", vScrollBarAlwaysVisible: "renderer", highlightGutterLine: "renderer", animatedScroll: "renderer", showInvisibles: "renderer", showPrintMargin: "renderer", printMarginColumn: "renderer", printMargin: "renderer", fadeFoldWidgets: "renderer", showFoldWidgets: "renderer", displayIndentGuides: "renderer", showGutter: "renderer", fontSize: "renderer", fontFamily: "renderer", maxLines: "renderer", minLines: "renderer", scrollPastEnd: "renderer", fixedWidthGutter: "renderer", theme: "renderer", hasCssTransforms: "renderer", maxPixelHeight: "renderer", useTextareaForIME: "renderer", scrollSpeed: "$mouseHandler", dragDelay: "$mouseHandler", dragEnabled: "$mouseHandler", focusTimeout: "$mouseHandler", tooltipFollowsMouse: "$mouseHandler", firstLineNumber: "session", overwrite: "session", newLineMode: "session", useWorker: "session", useSoftTabs: "session", navigateWithinSoftTabs: "session", tabSize: "session", wrap: "session", indentedSoftWrap: "session", foldStyle: "session", mode: "session" });
      var E = { getText: function(e2, t2) {
        return (Math.abs(e2.selection.lead.row - t2) || t2 + 1 + (t2 < 9 ? "\xB7" : "")) + "";
      }, getWidth: function(e2, t2, n2) {
        return Math.max(t2.toString().length, (n2.lastRow + 1).toString().length, 2) * n2.characterWidth;
      }, update: function(e2, t2) {
        t2.renderer.$loop.schedule(t2.renderer.CHANGE_GUTTER);
      }, attach: function(e2) {
        e2.renderer.$gutterLayer.$renderer = this, e2.on("changeSelection", this.update), this.update(null, e2);
      }, detach: function(e2) {
        e2.renderer.$gutterLayer.$renderer == this && (e2.renderer.$gutterLayer.$renderer = null), e2.off("changeSelection", this.update), this.update(null, e2);
      } };
      t.Editor = w;
    }), ace.define("ace/undomanager", ["require", "exports", "module", "ace/range"], function(e, t, n) {
      "use strict";
      function i(e2, t2) {
        for (var n2 = t2; n2--; ) {
          var r2 = e2[n2];
          if (r2 && !r2[0].ignore) {
            while (n2 < t2 - 1) {
              var i2 = d(e2[n2], e2[n2 + 1]);
              e2[n2] = i2[0], e2[n2 + 1] = i2[1], n2++;
            }
            return true;
          }
        }
      }
      function a(e2) {
        var t2 = e2.action == "insert", n2 = e2.start, r2 = e2.end, i2 = (r2.row - n2.row) * (t2 ? 1 : -1), s2 = (r2.column - n2.column) * (t2 ? 1 : -1);
        t2 && (r2 = n2);
        for (var o2 in this.marks) {
          var a2 = this.marks[o2], f2 = u(a2, n2);
          if (f2 < 0)
            continue;
          if (f2 === 0 && t2) {
            if (a2.bias != 1) {
              a2.bias == -1;
              continue;
            }
            f2 = 1;
          }
          var l2 = t2 ? f2 : u(a2, r2);
          if (l2 > 0) {
            a2.row += i2, a2.column += a2.row == r2.row ? s2 : 0;
            continue;
          }
          !t2 && l2 <= 0 && (a2.row = n2.row, a2.column = n2.column, l2 === 0 && (a2.bias = 1));
        }
      }
      function f(e2) {
        return { row: e2.row, column: e2.column };
      }
      function l(e2) {
        return { start: f(e2.start), end: f(e2.end), action: e2.action, lines: e2.lines.slice() };
      }
      function c(e2) {
        e2 = e2 || this;
        if (Array.isArray(e2))
          return e2.map(c).join("\n");
        var t2 = "";
        e2.action ? (t2 = e2.action == "insert" ? "+" : "-", t2 += "[" + e2.lines + "]") : e2.value && (Array.isArray(e2.value) ? t2 = e2.value.map(h).join("\n") : t2 = h(e2.value)), e2.start && (t2 += h(e2));
        if (e2.id || e2.rev)
          t2 += "	(" + (e2.id || e2.rev) + ")";
        return t2;
      }
      function h(e2) {
        return e2.start.row + ":" + e2.start.column + "=>" + e2.end.row + ":" + e2.end.column;
      }
      function p(e2, t2) {
        var n2 = e2.action == "insert", r2 = t2.action == "insert";
        if (n2 && r2)
          if (o(t2.start, e2.end) >= 0)
            m(t2, e2, -1);
          else {
            if (!(o(t2.start, e2.start) <= 0))
              return null;
            m(e2, t2, 1);
          }
        else if (n2 && !r2)
          if (o(t2.start, e2.end) >= 0)
            m(t2, e2, -1);
          else {
            if (!(o(t2.end, e2.start) <= 0))
              return null;
            m(e2, t2, -1);
          }
        else if (!n2 && r2)
          if (o(t2.start, e2.start) >= 0)
            m(t2, e2, 1);
          else {
            if (!(o(t2.start, e2.start) <= 0))
              return null;
            m(e2, t2, 1);
          }
        else if (!n2 && !r2)
          if (o(t2.start, e2.start) >= 0)
            m(t2, e2, 1);
          else {
            if (!(o(t2.end, e2.start) <= 0))
              return null;
            m(e2, t2, -1);
          }
        return [t2, e2];
      }
      function d(e2, t2) {
        for (var n2 = e2.length; n2--; )
          for (var r2 = 0; r2 < t2.length; r2++)
            if (!p(e2[n2], t2[r2])) {
              while (n2 < e2.length) {
                while (r2--)
                  p(t2[r2], e2[n2]);
                r2 = t2.length, n2++;
              }
              return [e2, t2];
            }
        return e2.selectionBefore = t2.selectionBefore = e2.selectionAfter = t2.selectionAfter = null, [t2, e2];
      }
      function v(e2, t2) {
        var n2 = e2.action == "insert", r2 = t2.action == "insert";
        if (n2 && r2)
          o(e2.start, t2.start) < 0 ? m(t2, e2, 1) : m(e2, t2, 1);
        else if (n2 && !r2)
          o(e2.start, t2.end) >= 0 ? m(e2, t2, -1) : o(e2.start, t2.start) <= 0 ? m(t2, e2, 1) : (m(e2, s.fromPoints(t2.start, e2.start), -1), m(t2, e2, 1));
        else if (!n2 && r2)
          o(t2.start, e2.end) >= 0 ? m(t2, e2, -1) : o(t2.start, e2.start) <= 0 ? m(e2, t2, 1) : (m(t2, s.fromPoints(e2.start, t2.start), -1), m(e2, t2, 1));
        else if (!n2 && !r2)
          if (o(t2.start, e2.end) >= 0)
            m(t2, e2, -1);
          else {
            if (!(o(t2.end, e2.start) <= 0)) {
              var i2, u2;
              return o(e2.start, t2.start) < 0 && (i2 = e2, e2 = y(e2, t2.start)), o(e2.end, t2.end) > 0 && (u2 = y(e2, t2.end)), g(t2.end, e2.start, e2.end, -1), u2 && !i2 && (e2.lines = u2.lines, e2.start = u2.start, e2.end = u2.end, u2 = e2), [t2, i2, u2].filter(Boolean);
            }
            m(e2, t2, -1);
          }
        return [t2, e2];
      }
      function m(e2, t2, n2) {
        g(e2.start, t2.start, t2.end, n2), g(e2.end, t2.start, t2.end, n2);
      }
      function g(e2, t2, n2, r2) {
        e2.row == (r2 == 1 ? t2 : n2).row && (e2.column += r2 * (n2.column - t2.column)), e2.row += r2 * (n2.row - t2.row);
      }
      function y(e2, t2) {
        var n2 = e2.lines, r2 = e2.end;
        e2.end = f(t2);
        var i2 = e2.end.row - e2.start.row, s2 = n2.splice(i2, n2.length), o2 = i2 ? t2.column : t2.column - e2.start.column;
        n2.push(s2[0].substring(0, o2)), s2[0] = s2[0].substr(o2);
        var u2 = { start: f(t2), end: r2, lines: s2, action: e2.action };
        return u2;
      }
      function b(e2, t2) {
        t2 = l(t2);
        for (var n2 = e2.length; n2--; ) {
          var r2 = e2[n2];
          for (var i2 = 0; i2 < r2.length; i2++) {
            var s2 = r2[i2], o2 = v(s2, t2);
            t2 = o2[0], o2.length != 2 && (o2[2] ? (r2.splice(i2 + 1, 1, o2[1], o2[2]), i2++) : o2[1] || (r2.splice(i2, 1), i2--));
          }
          r2.length || e2.splice(n2, 1);
        }
        return e2;
      }
      function w(e2, t2) {
        for (var n2 = 0; n2 < t2.length; n2++) {
          var r2 = t2[n2];
          for (var i2 = 0; i2 < r2.length; i2++)
            b(e2, r2[i2]);
        }
      }
      var r = function() {
        this.$maxRev = 0, this.$fromUndo = false, this.reset();
      };
      (function() {
        this.addSession = function(e2) {
          this.$session = e2;
        }, this.add = function(e2, t2, n2) {
          if (this.$fromUndo)
            return;
          if (e2 == this.$lastDelta)
            return;
          this.$keepRedoStack || (this.$redoStack.length = 0);
          if (t2 === false || !this.lastDeltas)
            this.lastDeltas = [], this.$undoStack.push(this.lastDeltas), e2.id = this.$rev = ++this.$maxRev;
          if (e2.action == "remove" || e2.action == "insert")
            this.$lastDelta = e2;
          this.lastDeltas.push(e2);
        }, this.addSelection = function(e2, t2) {
          this.selections.push({ value: e2, rev: t2 || this.$rev });
        }, this.startNewGroup = function() {
          return this.lastDeltas = null, this.$rev;
        }, this.markIgnored = function(e2, t2) {
          t2 == null && (t2 = this.$rev + 1);
          var n2 = this.$undoStack;
          for (var r2 = n2.length; r2--; ) {
            var i2 = n2[r2][0];
            if (i2.id <= e2)
              break;
            i2.id < t2 && (i2.ignore = true);
          }
          this.lastDeltas = null;
        }, this.getSelection = function(e2, t2) {
          var n2 = this.selections;
          for (var r2 = n2.length; r2--; ) {
            var i2 = n2[r2];
            if (i2.rev < e2)
              return t2 && (i2 = n2[r2 + 1]), i2;
          }
        }, this.getRevision = function() {
          return this.$rev;
        }, this.getDeltas = function(e2, t2) {
          t2 == null && (t2 = this.$rev + 1);
          var n2 = this.$undoStack, r2 = null, i2 = 0;
          for (var s2 = n2.length; s2--; ) {
            var o2 = n2[s2][0];
            o2.id < t2 && !r2 && (r2 = s2 + 1);
            if (o2.id <= e2) {
              i2 = s2 + 1;
              break;
            }
          }
          return n2.slice(i2, r2);
        }, this.getChangedRanges = function(e2, t2) {
          t2 == null && (t2 = this.$rev + 1);
        }, this.getChangedLines = function(e2, t2) {
          t2 == null && (t2 = this.$rev + 1);
        }, this.undo = function(e2, t2) {
          this.lastDeltas = null;
          var n2 = this.$undoStack;
          if (!i(n2, n2.length))
            return;
          e2 || (e2 = this.$session), this.$redoStackBaseRev !== this.$rev && this.$redoStack.length && (this.$redoStack = []), this.$fromUndo = true;
          var r2 = n2.pop(), s2 = null;
          return r2 && (s2 = e2.undoChanges(r2, t2), this.$redoStack.push(r2), this.$syncRev()), this.$fromUndo = false, s2;
        }, this.redo = function(e2, t2) {
          this.lastDeltas = null, e2 || (e2 = this.$session), this.$fromUndo = true;
          if (this.$redoStackBaseRev != this.$rev) {
            var n2 = this.getDeltas(this.$redoStackBaseRev, this.$rev + 1);
            w(this.$redoStack, n2), this.$redoStackBaseRev = this.$rev, this.$redoStack.forEach(function(e3) {
              e3[0].id = ++this.$maxRev;
            }, this);
          }
          var r2 = this.$redoStack.pop(), i2 = null;
          return r2 && (i2 = e2.redoChanges(r2, t2), this.$undoStack.push(r2), this.$syncRev()), this.$fromUndo = false, i2;
        }, this.$syncRev = function() {
          var e2 = this.$undoStack, t2 = e2[e2.length - 1], n2 = t2 && t2[0].id || 0;
          this.$redoStackBaseRev = n2, this.$rev = n2;
        }, this.reset = function() {
          this.lastDeltas = null, this.$lastDelta = null, this.$undoStack = [], this.$redoStack = [], this.$rev = 0, this.mark = 0, this.$redoStackBaseRev = this.$rev, this.selections = [];
        }, this.canUndo = function() {
          return this.$undoStack.length > 0;
        }, this.canRedo = function() {
          return this.$redoStack.length > 0;
        }, this.bookmark = function(e2) {
          e2 == void 0 && (e2 = this.$rev), this.mark = e2;
        }, this.isAtBookmark = function() {
          return this.$rev === this.mark;
        }, this.toJSON = function() {
        }, this.fromJSON = function() {
        }, this.hasUndo = this.canUndo, this.hasRedo = this.canRedo, this.isClean = this.isAtBookmark, this.markClean = this.bookmark, this.$prettyPrint = function(e2) {
          return e2 ? c(e2) : c(this.$undoStack) + "\n---\n" + c(this.$redoStack);
        };
      }).call(r.prototype);
      var s = e("./range").Range, o = s.comparePoints, u = s.comparePoints;
      t.UndoManager = r;
    }), ace.define("ace/layer/lines", ["require", "exports", "module", "ace/lib/dom"], function(e, t, n) {
      "use strict";
      var r = e("../lib/dom"), i = function(e2, t2) {
        this.element = e2, this.canvasHeight = t2 || 5e5, this.element.style.height = this.canvasHeight * 2 + "px", this.cells = [], this.cellCache = [], this.$offsetCoefficient = 0;
      };
      (function() {
        this.moveContainer = function(e2) {
          r.translate(this.element, 0, -(e2.firstRowScreen * e2.lineHeight % this.canvasHeight) - e2.offset * this.$offsetCoefficient);
        }, this.pageChanged = function(e2, t2) {
          return Math.floor(e2.firstRowScreen * e2.lineHeight / this.canvasHeight) !== Math.floor(t2.firstRowScreen * t2.lineHeight / this.canvasHeight);
        }, this.computeLineTop = function(e2, t2, n2) {
          var r2 = t2.firstRowScreen * t2.lineHeight, i2 = Math.floor(r2 / this.canvasHeight), s = n2.documentToScreenRow(e2, 0) * t2.lineHeight;
          return s - i2 * this.canvasHeight;
        }, this.computeLineHeight = function(e2, t2, n2) {
          return t2.lineHeight * n2.getRowLineCount(e2);
        }, this.getLength = function() {
          return this.cells.length;
        }, this.get = function(e2) {
          return this.cells[e2];
        }, this.shift = function() {
          this.$cacheCell(this.cells.shift());
        }, this.pop = function() {
          this.$cacheCell(this.cells.pop());
        }, this.push = function(e2) {
          if (Array.isArray(e2)) {
            this.cells.push.apply(this.cells, e2);
            var t2 = r.createFragment(this.element);
            for (var n2 = 0; n2 < e2.length; n2++)
              t2.appendChild(e2[n2].element);
            this.element.appendChild(t2);
          } else
            this.cells.push(e2), this.element.appendChild(e2.element);
        }, this.unshift = function(e2) {
          if (Array.isArray(e2)) {
            this.cells.unshift.apply(this.cells, e2);
            var t2 = r.createFragment(this.element);
            for (var n2 = 0; n2 < e2.length; n2++)
              t2.appendChild(e2[n2].element);
            this.element.firstChild ? this.element.insertBefore(t2, this.element.firstChild) : this.element.appendChild(t2);
          } else
            this.cells.unshift(e2), this.element.insertAdjacentElement("afterbegin", e2.element);
        }, this.last = function() {
          return this.cells.length ? this.cells[this.cells.length - 1] : null;
        }, this.$cacheCell = function(e2) {
          if (!e2)
            return;
          e2.element.remove(), this.cellCache.push(e2);
        }, this.createCell = function(e2, t2, n2, i2) {
          var s = this.cellCache.pop();
          if (!s) {
            var o = r.createElement("div");
            i2 && i2(o), this.element.appendChild(o), s = { element: o, text: "", row: e2 };
          }
          return s.row = e2, s;
        };
      }).call(i.prototype), t.Lines = i;
    }), ace.define("ace/layer/gutter", ["require", "exports", "module", "ace/lib/dom", "ace/lib/oop", "ace/lib/lang", "ace/lib/event_emitter", "ace/layer/lines"], function(e, t, n) {
      "use strict";
      function f(e2) {
        var t2 = document.createTextNode("");
        e2.appendChild(t2);
        var n2 = r.createElement("span");
        return e2.appendChild(n2), e2;
      }
      var r = e("../lib/dom"), i = e("../lib/oop"), s = e("../lib/lang"), o = e("../lib/event_emitter").EventEmitter, u = e("./lines").Lines, a = function(e2) {
        this.element = r.createElement("div"), this.element.className = "ace_layer ace_gutter-layer", e2.appendChild(this.element), this.setShowFoldWidgets(this.$showFoldWidgets), this.gutterWidth = 0, this.$annotations = [], this.$updateAnnotations = this.$updateAnnotations.bind(this), this.$lines = new u(this.element), this.$lines.$offsetCoefficient = 1;
      };
      (function() {
        i.implement(this, o), this.setSession = function(e2) {
          this.session && this.session.off("change", this.$updateAnnotations), this.session = e2, e2 && e2.on("change", this.$updateAnnotations);
        }, this.addGutterDecoration = function(e2, t2) {
          window.console && console.warn && console.warn("deprecated use session.addGutterDecoration"), this.session.addGutterDecoration(e2, t2);
        }, this.removeGutterDecoration = function(e2, t2) {
          window.console && console.warn && console.warn("deprecated use session.removeGutterDecoration"), this.session.removeGutterDecoration(e2, t2);
        }, this.setAnnotations = function(e2) {
          this.$annotations = [];
          for (var t2 = 0; t2 < e2.length; t2++) {
            var n2 = e2[t2], r2 = n2.row, i2 = this.$annotations[r2];
            i2 || (i2 = this.$annotations[r2] = { text: [] });
            var o2 = n2.text;
            o2 = o2 ? s.escapeHTML(o2) : n2.html || "", i2.text.indexOf(o2) === -1 && i2.text.push(o2);
            var u2 = n2.type, a2 = n2.className;
            a2 ? i2.className = a2 : u2 == "error" ? i2.className = " ace_error" : u2 == "warning" && i2.className != " ace_error" ? i2.className = " ace_warning" : u2 == "info" && !i2.className && (i2.className = " ace_info");
          }
        }, this.$updateAnnotations = function(e2) {
          if (!this.$annotations.length)
            return;
          var t2 = e2.start.row, n2 = e2.end.row - t2;
          if (n2 !== 0)
            if (e2.action == "remove")
              this.$annotations.splice(t2, n2 + 1, null);
            else {
              var r2 = new Array(n2 + 1);
              r2.unshift(t2, 1), this.$annotations.splice.apply(this.$annotations, r2);
            }
        }, this.update = function(e2) {
          this.config = e2;
          var t2 = this.session, n2 = e2.firstRow, r2 = Math.min(e2.lastRow + e2.gutterOffset, t2.getLength() - 1);
          this.oldLastRow = r2, this.config = e2, this.$lines.moveContainer(e2), this.$updateCursorRow();
          var i2 = t2.getNextFoldLine(n2), s2 = i2 ? i2.start.row : Infinity, o2 = null, u2 = -1, a2 = n2;
          for (; ; ) {
            a2 > s2 && (a2 = i2.end.row + 1, i2 = t2.getNextFoldLine(a2, i2), s2 = i2 ? i2.start.row : Infinity);
            if (a2 > r2) {
              while (this.$lines.getLength() > u2 + 1)
                this.$lines.pop();
              break;
            }
            o2 = this.$lines.get(++u2), o2 ? o2.row = a2 : (o2 = this.$lines.createCell(a2, e2, this.session, f), this.$lines.push(o2)), this.$renderCell(o2, e2, i2, a2), a2++;
          }
          this._signal("afterRender"), this.$updateGutterWidth(e2);
        }, this.$updateGutterWidth = function(e2) {
          var t2 = this.session, n2 = t2.gutterRenderer || this.$renderer, r2 = t2.$firstLineNumber, i2 = this.$lines.last() ? this.$lines.last().text : "";
          if (this.$fixedWidth || t2.$useWrapMode)
            i2 = t2.getLength() + r2 - 1;
          var s2 = n2 ? n2.getWidth(t2, i2, e2) : i2.toString().length * e2.characterWidth, o2 = this.$padding || this.$computePadding();
          s2 += o2.left + o2.right, s2 !== this.gutterWidth && !isNaN(s2) && (this.gutterWidth = s2, this.element.parentNode.style.width = this.element.style.width = Math.ceil(this.gutterWidth) + "px", this._signal("changeGutterWidth", s2));
        }, this.$updateCursorRow = function() {
          if (!this.$highlightGutterLine)
            return;
          var e2 = this.session.selection.getCursor();
          if (this.$cursorRow === e2.row)
            return;
          this.$cursorRow = e2.row;
        }, this.updateLineHighlight = function() {
          if (!this.$highlightGutterLine)
            return;
          var e2 = this.session.selection.cursor.row;
          this.$cursorRow = e2;
          if (this.$cursorCell && this.$cursorCell.row == e2)
            return;
          this.$cursorCell && (this.$cursorCell.element.className = this.$cursorCell.element.className.replace("ace_gutter-active-line ", ""));
          var t2 = this.$lines.cells;
          this.$cursorCell = null;
          for (var n2 = 0; n2 < t2.length; n2++) {
            var r2 = t2[n2];
            if (r2.row >= this.$cursorRow) {
              if (r2.row > this.$cursorRow) {
                var i2 = this.session.getFoldLine(this.$cursorRow);
                if (!(n2 > 0 && i2 && i2.start.row == t2[n2 - 1].row))
                  break;
                r2 = t2[n2 - 1];
              }
              r2.element.className = "ace_gutter-active-line " + r2.element.className, this.$cursorCell = r2;
              break;
            }
          }
        }, this.scrollLines = function(e2) {
          var t2 = this.config;
          this.config = e2, this.$updateCursorRow();
          if (this.$lines.pageChanged(t2, e2))
            return this.update(e2);
          this.$lines.moveContainer(e2);
          var n2 = Math.min(e2.lastRow + e2.gutterOffset, this.session.getLength() - 1), r2 = this.oldLastRow;
          this.oldLastRow = n2;
          if (!t2 || r2 < e2.firstRow)
            return this.update(e2);
          if (n2 < t2.firstRow)
            return this.update(e2);
          if (t2.firstRow < e2.firstRow)
            for (var i2 = this.session.getFoldedRowCount(t2.firstRow, e2.firstRow - 1); i2 > 0; i2--)
              this.$lines.shift();
          if (r2 > n2)
            for (var i2 = this.session.getFoldedRowCount(n2 + 1, r2); i2 > 0; i2--)
              this.$lines.pop();
          e2.firstRow < t2.firstRow && this.$lines.unshift(this.$renderLines(e2, e2.firstRow, t2.firstRow - 1)), n2 > r2 && this.$lines.push(this.$renderLines(e2, r2 + 1, n2)), this.updateLineHighlight(), this._signal("afterRender"), this.$updateGutterWidth(e2);
        }, this.$renderLines = function(e2, t2, n2) {
          var r2 = [], i2 = t2, s2 = this.session.getNextFoldLine(i2), o2 = s2 ? s2.start.row : Infinity;
          for (; ; ) {
            i2 > o2 && (i2 = s2.end.row + 1, s2 = this.session.getNextFoldLine(i2, s2), o2 = s2 ? s2.start.row : Infinity);
            if (i2 > n2)
              break;
            var u2 = this.$lines.createCell(i2, e2, this.session, f);
            this.$renderCell(u2, e2, s2, i2), r2.push(u2), i2++;
          }
          return r2;
        }, this.$renderCell = function(e2, t2, n2, i2) {
          var s2 = e2.element, o2 = this.session, u2 = s2.childNodes[0], a2 = s2.childNodes[1], f2 = o2.$firstLineNumber, l = o2.$breakpoints, c = o2.$decorations, h = o2.gutterRenderer || this.$renderer, p = this.$showFoldWidgets && o2.foldWidgets, d = n2 ? n2.start.row : Number.MAX_VALUE, v = "ace_gutter-cell ";
          this.$highlightGutterLine && (i2 == this.$cursorRow || n2 && i2 < this.$cursorRow && i2 >= d && this.$cursorRow <= n2.end.row) && (v += "ace_gutter-active-line ", this.$cursorCell != e2 && (this.$cursorCell && (this.$cursorCell.element.className = this.$cursorCell.element.className.replace("ace_gutter-active-line ", "")), this.$cursorCell = e2)), l[i2] && (v += l[i2]), c[i2] && (v += c[i2]), this.$annotations[i2] && (v += this.$annotations[i2].className), s2.className != v && (s2.className = v);
          if (p) {
            var m = p[i2];
            m == null && (m = p[i2] = o2.getFoldWidget(i2));
          }
          if (m) {
            var v = "ace_fold-widget ace_" + m;
            m == "start" && i2 == d && i2 < n2.end.row ? v += " ace_closed" : v += " ace_open", a2.className != v && (a2.className = v);
            var g = t2.lineHeight + "px";
            r.setStyle(a2.style, "height", g), r.setStyle(a2.style, "display", "inline-block");
          } else
            a2 && r.setStyle(a2.style, "display", "none");
          var y = (h ? h.getText(o2, i2) : i2 + f2).toString();
          return y !== u2.data && (u2.data = y), r.setStyle(e2.element.style, "height", this.$lines.computeLineHeight(i2, t2, o2) + "px"), r.setStyle(e2.element.style, "top", this.$lines.computeLineTop(i2, t2, o2) + "px"), e2.text = y, e2;
        }, this.$fixedWidth = false, this.$highlightGutterLine = true, this.$renderer = "", this.setHighlightGutterLine = function(e2) {
          this.$highlightGutterLine = e2;
        }, this.$showLineNumbers = true, this.$renderer = "", this.setShowLineNumbers = function(e2) {
          this.$renderer = !e2 && { getWidth: function() {
            return 0;
          }, getText: function() {
            return "";
          } };
        }, this.getShowLineNumbers = function() {
          return this.$showLineNumbers;
        }, this.$showFoldWidgets = true, this.setShowFoldWidgets = function(e2) {
          e2 ? r.addCssClass(this.element, "ace_folding-enabled") : r.removeCssClass(this.element, "ace_folding-enabled"), this.$showFoldWidgets = e2, this.$padding = null;
        }, this.getShowFoldWidgets = function() {
          return this.$showFoldWidgets;
        }, this.$computePadding = function() {
          if (!this.element.firstChild)
            return { left: 0, right: 0 };
          var e2 = r.computedStyle(this.element.firstChild);
          return this.$padding = {}, this.$padding.left = (parseInt(e2.borderLeftWidth) || 0) + (parseInt(e2.paddingLeft) || 0) + 1, this.$padding.right = (parseInt(e2.borderRightWidth) || 0) + (parseInt(e2.paddingRight) || 0), this.$padding;
        }, this.getRegion = function(e2) {
          var t2 = this.$padding || this.$computePadding(), n2 = this.element.getBoundingClientRect();
          if (e2.x < t2.left + n2.left)
            return "markers";
          if (this.$showFoldWidgets && e2.x > n2.right - t2.right)
            return "foldWidgets";
        };
      }).call(a.prototype), t.Gutter = a;
    }), ace.define("ace/layer/marker", ["require", "exports", "module", "ace/range", "ace/lib/dom"], function(e, t, n) {
      "use strict";
      var r = e("../range").Range, i = e("../lib/dom"), s = function(e2) {
        this.element = i.createElement("div"), this.element.className = "ace_layer ace_marker-layer", e2.appendChild(this.element);
      };
      (function() {
        function e2(e3, t2, n2, r2) {
          return (e3 ? 1 : 0) | (t2 ? 2 : 0) | (n2 ? 4 : 0) | (r2 ? 8 : 0);
        }
        this.$padding = 0, this.setPadding = function(e3) {
          this.$padding = e3;
        }, this.setSession = function(e3) {
          this.session = e3;
        }, this.setMarkers = function(e3) {
          this.markers = e3;
        }, this.elt = function(e3, t2) {
          var n2 = this.i != -1 && this.element.childNodes[this.i];
          n2 ? this.i++ : (n2 = document.createElement("div"), this.element.appendChild(n2), this.i = -1), n2.style.cssText = t2, n2.className = e3;
        }, this.update = function(e3) {
          if (!e3)
            return;
          this.config = e3, this.i = 0;
          var t2;
          for (var n2 in this.markers) {
            var r2 = this.markers[n2];
            if (!r2.range) {
              r2.update(t2, this, this.session, e3);
              continue;
            }
            var i2 = r2.range.clipRows(e3.firstRow, e3.lastRow);
            if (i2.isEmpty())
              continue;
            i2 = i2.toScreenRange(this.session);
            if (r2.renderer) {
              var s2 = this.$getTop(i2.start.row, e3), o = this.$padding + i2.start.column * e3.characterWidth;
              r2.renderer(t2, i2, o, s2, e3);
            } else
              r2.type == "fullLine" ? this.drawFullLineMarker(t2, i2, r2.clazz, e3) : r2.type == "screenLine" ? this.drawScreenLineMarker(t2, i2, r2.clazz, e3) : i2.isMultiLine() ? r2.type == "text" ? this.drawTextMarker(t2, i2, r2.clazz, e3) : this.drawMultiLineMarker(t2, i2, r2.clazz, e3) : this.drawSingleLineMarker(t2, i2, r2.clazz + " ace_start ace_br15", e3);
          }
          if (this.i != -1)
            while (this.i < this.element.childElementCount)
              this.element.removeChild(this.element.lastChild);
        }, this.$getTop = function(e3, t2) {
          return (e3 - t2.firstRowScreen) * t2.lineHeight;
        }, this.drawTextMarker = function(t2, n2, i2, s2, o) {
          var u = this.session, a = n2.start.row, f = n2.end.row, l = a, c = 0, h = 0, p = u.getScreenLastRowColumn(l), d = new r(l, n2.start.column, l, h);
          for (; l <= f; l++)
            d.start.row = d.end.row = l, d.start.column = l == a ? n2.start.column : u.getRowWrapIndent(l), d.end.column = p, c = h, h = p, p = l + 1 < f ? u.getScreenLastRowColumn(l + 1) : l == f ? 0 : n2.end.column, this.drawSingleLineMarker(t2, d, i2 + (l == a ? " ace_start" : "") + " ace_br" + e2(l == a || l == a + 1 && n2.start.column, c < h, h > p, l == f), s2, l == f ? 0 : 1, o);
        }, this.drawMultiLineMarker = function(e3, t2, n2, r2, i2) {
          var s2 = this.$padding, o = r2.lineHeight, u = this.$getTop(t2.start.row, r2), a = s2 + t2.start.column * r2.characterWidth;
          i2 = i2 || "";
          if (this.session.$bidiHandler.isBidiRow(t2.start.row)) {
            var f = t2.clone();
            f.end.row = f.start.row, f.end.column = this.session.getLine(f.start.row).length, this.drawBidiSingleLineMarker(e3, f, n2 + " ace_br1 ace_start", r2, null, i2);
          } else
            this.elt(n2 + " ace_br1 ace_start", "height:" + o + "px;right:0;top:" + u + "px;left:" + a + "px;" + (i2 || ""));
          if (this.session.$bidiHandler.isBidiRow(t2.end.row)) {
            var f = t2.clone();
            f.start.row = f.end.row, f.start.column = 0, this.drawBidiSingleLineMarker(e3, f, n2 + " ace_br12", r2, null, i2);
          } else {
            u = this.$getTop(t2.end.row, r2);
            var l = t2.end.column * r2.characterWidth;
            this.elt(n2 + " ace_br12", "height:" + o + "px;width:" + l + "px;top:" + u + "px;left:" + s2 + "px;" + (i2 || ""));
          }
          o = (t2.end.row - t2.start.row - 1) * r2.lineHeight;
          if (o <= 0)
            return;
          u = this.$getTop(t2.start.row + 1, r2);
          var c = (t2.start.column ? 1 : 0) | (t2.end.column ? 0 : 8);
          this.elt(n2 + (c ? " ace_br" + c : ""), "height:" + o + "px;right:0;top:" + u + "px;left:" + s2 + "px;" + (i2 || ""));
        }, this.drawSingleLineMarker = function(e3, t2, n2, r2, i2, s2) {
          if (this.session.$bidiHandler.isBidiRow(t2.start.row))
            return this.drawBidiSingleLineMarker(e3, t2, n2, r2, i2, s2);
          var o = r2.lineHeight, u = (t2.end.column + (i2 || 0) - t2.start.column) * r2.characterWidth, a = this.$getTop(t2.start.row, r2), f = this.$padding + t2.start.column * r2.characterWidth;
          this.elt(n2, "height:" + o + "px;width:" + u + "px;top:" + a + "px;left:" + f + "px;" + (s2 || ""));
        }, this.drawBidiSingleLineMarker = function(e3, t2, n2, r2, i2, s2) {
          var o = r2.lineHeight, u = this.$getTop(t2.start.row, r2), a = this.$padding, f = this.session.$bidiHandler.getSelections(t2.start.column, t2.end.column);
          f.forEach(function(e4) {
            this.elt(n2, "height:" + o + "px;width:" + e4.width + (i2 || 0) + "px;top:" + u + "px;left:" + (a + e4.left) + "px;" + (s2 || ""));
          }, this);
        }, this.drawFullLineMarker = function(e3, t2, n2, r2, i2) {
          var s2 = this.$getTop(t2.start.row, r2), o = r2.lineHeight;
          t2.start.row != t2.end.row && (o += this.$getTop(t2.end.row, r2) - s2), this.elt(n2, "height:" + o + "px;top:" + s2 + "px;left:0;right:0;" + (i2 || ""));
        }, this.drawScreenLineMarker = function(e3, t2, n2, r2, i2) {
          var s2 = this.$getTop(t2.start.row, r2), o = r2.lineHeight;
          this.elt(n2, "height:" + o + "px;top:" + s2 + "px;left:0;right:0;" + (i2 || ""));
        };
      }).call(s.prototype), t.Marker = s;
    }), ace.define("ace/layer/text", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/layer/lines", "ace/lib/event_emitter"], function(e, t, n) {
      "use strict";
      var r = e("../lib/oop"), i = e("../lib/dom"), s = e("../lib/lang"), o = e("./lines").Lines, u = e("../lib/event_emitter").EventEmitter, a = function(e2) {
        this.dom = i, this.element = this.dom.createElement("div"), this.element.className = "ace_layer ace_text-layer", e2.appendChild(this.element), this.$updateEolChar = this.$updateEolChar.bind(this), this.$lines = new o(this.element);
      };
      (function() {
        r.implement(this, u), this.EOF_CHAR = "\xB6", this.EOL_CHAR_LF = "\xAC", this.EOL_CHAR_CRLF = "\xA4", this.EOL_CHAR = this.EOL_CHAR_LF, this.TAB_CHAR = "\u2014", this.SPACE_CHAR = "\xB7", this.$padding = 0, this.MAX_LINE_LENGTH = 1e4, this.$updateEolChar = function() {
          var e2 = this.session.doc, t2 = e2.getNewLineCharacter() == "\n" && e2.getNewLineMode() != "windows", n2 = t2 ? this.EOL_CHAR_LF : this.EOL_CHAR_CRLF;
          if (this.EOL_CHAR != n2)
            return this.EOL_CHAR = n2, true;
        }, this.setPadding = function(e2) {
          this.$padding = e2, this.element.style.margin = "0 " + e2 + "px";
        }, this.getLineHeight = function() {
          return this.$fontMetrics.$characterSize.height || 0;
        }, this.getCharacterWidth = function() {
          return this.$fontMetrics.$characterSize.width || 0;
        }, this.$setFontMetrics = function(e2) {
          this.$fontMetrics = e2, this.$fontMetrics.on("changeCharacterSize", function(e3) {
            this._signal("changeCharacterSize", e3);
          }.bind(this)), this.$pollSizeChanges();
        }, this.checkForSizeChanges = function() {
          this.$fontMetrics.checkForSizeChanges();
        }, this.$pollSizeChanges = function() {
          return this.$pollSizeChangesTimer = this.$fontMetrics.$pollSizeChanges();
        }, this.setSession = function(e2) {
          this.session = e2, e2 && this.$computeTabString();
        }, this.showInvisibles = false, this.showSpaces = false, this.showTabs = false, this.showEOL = false, this.setShowInvisibles = function(e2) {
          return this.showInvisibles == e2 ? false : (this.showInvisibles = e2, typeof e2 == "string" ? (this.showSpaces = /tab/i.test(e2), this.showTabs = /space/i.test(e2), this.showEOL = /eol/i.test(e2)) : this.showSpaces = this.showTabs = this.showEOL = e2, this.$computeTabString(), true);
        }, this.displayIndentGuides = true, this.setDisplayIndentGuides = function(e2) {
          return this.displayIndentGuides == e2 ? false : (this.displayIndentGuides = e2, this.$computeTabString(), true);
        }, this.$tabStrings = [], this.onChangeTabSize = this.$computeTabString = function() {
          var e2 = this.session.getTabSize();
          this.tabSize = e2;
          var t2 = this.$tabStrings = [0];
          for (var n2 = 1; n2 < e2 + 1; n2++)
            if (this.showTabs) {
              var r2 = this.dom.createElement("span");
              r2.className = "ace_invisible ace_invisible_tab", r2.textContent = s.stringRepeat(this.TAB_CHAR, n2), t2.push(r2);
            } else
              t2.push(this.dom.createTextNode(s.stringRepeat(" ", n2), this.element));
          if (this.displayIndentGuides) {
            this.$indentGuideRe = /\s\S| \t|\t |\s$/;
            var i2 = "ace_indent-guide", o2 = this.showSpaces ? " ace_invisible ace_invisible_space" : "", u2 = this.showSpaces ? s.stringRepeat(this.SPACE_CHAR, this.tabSize) : s.stringRepeat(" ", this.tabSize), a2 = this.showTabs ? " ace_invisible ace_invisible_tab" : "", f = this.showTabs ? s.stringRepeat(this.TAB_CHAR, this.tabSize) : u2, r2 = this.dom.createElement("span");
            r2.className = i2 + o2, r2.textContent = u2, this.$tabStrings[" "] = r2;
            var r2 = this.dom.createElement("span");
            r2.className = i2 + a2, r2.textContent = f, this.$tabStrings["	"] = r2;
          }
        }, this.updateLines = function(e2, t2, n2) {
          if (this.config.lastRow != e2.lastRow || this.config.firstRow != e2.firstRow)
            return this.update(e2);
          this.config = e2;
          var r2 = Math.max(t2, e2.firstRow), i2 = Math.min(n2, e2.lastRow), s2 = this.element.childNodes, o2 = 0;
          for (var u2 = e2.firstRow; u2 < r2; u2++) {
            var a2 = this.session.getFoldLine(u2);
            if (a2) {
              if (a2.containsRow(r2)) {
                r2 = a2.start.row;
                break;
              }
              u2 = a2.end.row;
            }
            o2++;
          }
          var f = false, u2 = r2, a2 = this.session.getNextFoldLine(u2), l = a2 ? a2.start.row : Infinity;
          for (; ; ) {
            u2 > l && (u2 = a2.end.row + 1, a2 = this.session.getNextFoldLine(u2, a2), l = a2 ? a2.start.row : Infinity);
            if (u2 > i2)
              break;
            var c = s2[o2++];
            if (c) {
              this.dom.removeChildren(c), this.$renderLine(c, u2, u2 == l ? a2 : false), f && (c.style.top = this.$lines.computeLineTop(u2, e2, this.session) + "px");
              var h = e2.lineHeight * this.session.getRowLength(u2) + "px";
              c.style.height != h && (f = true, c.style.height = h);
            }
            u2++;
          }
          if (f)
            while (o2 < this.$lines.cells.length) {
              var p = this.$lines.cells[o2++];
              p.element.style.top = this.$lines.computeLineTop(p.row, e2, this.session) + "px";
            }
        }, this.scrollLines = function(e2) {
          var t2 = this.config;
          this.config = e2;
          if (this.$lines.pageChanged(t2, e2))
            return this.update(e2);
          this.$lines.moveContainer(e2);
          var n2 = e2.lastRow, r2 = t2 ? t2.lastRow : -1;
          if (!t2 || r2 < e2.firstRow)
            return this.update(e2);
          if (n2 < t2.firstRow)
            return this.update(e2);
          if (!t2 || t2.lastRow < e2.firstRow)
            return this.update(e2);
          if (e2.lastRow < t2.firstRow)
            return this.update(e2);
          if (t2.firstRow < e2.firstRow)
            for (var i2 = this.session.getFoldedRowCount(t2.firstRow, e2.firstRow - 1); i2 > 0; i2--)
              this.$lines.shift();
          if (t2.lastRow > e2.lastRow)
            for (var i2 = this.session.getFoldedRowCount(e2.lastRow + 1, t2.lastRow); i2 > 0; i2--)
              this.$lines.pop();
          e2.firstRow < t2.firstRow && this.$lines.unshift(this.$renderLinesFragment(e2, e2.firstRow, t2.firstRow - 1)), e2.lastRow > t2.lastRow && this.$lines.push(this.$renderLinesFragment(e2, t2.lastRow + 1, e2.lastRow));
        }, this.$renderLinesFragment = function(e2, t2, n2) {
          var r2 = [], s2 = t2, o2 = this.session.getNextFoldLine(s2), u2 = o2 ? o2.start.row : Infinity;
          for (; ; ) {
            s2 > u2 && (s2 = o2.end.row + 1, o2 = this.session.getNextFoldLine(s2, o2), u2 = o2 ? o2.start.row : Infinity);
            if (s2 > n2)
              break;
            var a2 = this.$lines.createCell(s2, e2, this.session), f = a2.element;
            this.dom.removeChildren(f), i.setStyle(f.style, "height", this.$lines.computeLineHeight(s2, e2, this.session) + "px"), i.setStyle(f.style, "top", this.$lines.computeLineTop(s2, e2, this.session) + "px"), this.$renderLine(f, s2, s2 == u2 ? o2 : false), this.$useLineGroups() ? f.className = "ace_line_group" : f.className = "ace_line", r2.push(a2), s2++;
          }
          return r2;
        }, this.update = function(e2) {
          this.$lines.moveContainer(e2), this.config = e2;
          var t2 = e2.firstRow, n2 = e2.lastRow, r2 = this.$lines;
          while (r2.getLength())
            r2.pop();
          r2.push(this.$renderLinesFragment(e2, t2, n2));
        }, this.$textToken = { text: true, rparen: true, lparen: true }, this.$renderToken = function(e2, t2, n2, r2) {
          var i2 = this, o2 = /(\t)|( +)|([\x00-\x1f\x80-\xa0\xad\u1680\u180E\u2000-\u200f\u2028\u2029\u202F\u205F\uFEFF\uFFF9-\uFFFC\u2066\u2067\u2068\u202A\u202B\u202D\u202E\u202C\u2069]+)|(\u3000)|([\u1100-\u115F\u11A3-\u11A7\u11FA-\u11FF\u2329-\u232A\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3001-\u303E\u3041-\u3096\u3099-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF60\uFFE0-\uFFE6]|[\uD800-\uDBFF][\uDC00-\uDFFF])/g, u2 = this.dom.createFragment(this.element), a2, f = 0;
          while (a2 = o2.exec(r2)) {
            var l = a2[1], c = a2[2], h = a2[3], p = a2[4], d = a2[5];
            if (!i2.showSpaces && c)
              continue;
            var v = f != a2.index ? r2.slice(f, a2.index) : "";
            f = a2.index + a2[0].length, v && u2.appendChild(this.dom.createTextNode(v, this.element));
            if (l) {
              var m = i2.session.getScreenTabSize(t2 + a2.index);
              u2.appendChild(i2.$tabStrings[m].cloneNode(true)), t2 += m - 1;
            } else if (c)
              if (i2.showSpaces) {
                var g = this.dom.createElement("span");
                g.className = "ace_invisible ace_invisible_space", g.textContent = s.stringRepeat(i2.SPACE_CHAR, c.length), u2.appendChild(g);
              } else
                u2.appendChild(this.com.createTextNode(c, this.element));
            else if (h) {
              var g = this.dom.createElement("span");
              g.className = "ace_invisible ace_invisible_space ace_invalid", g.textContent = s.stringRepeat(i2.SPACE_CHAR, h.length), u2.appendChild(g);
            } else if (p) {
              t2 += 1;
              var g = this.dom.createElement("span");
              g.style.width = i2.config.characterWidth * 2 + "px", g.className = i2.showSpaces ? "ace_cjk ace_invisible ace_invisible_space" : "ace_cjk", g.textContent = i2.showSpaces ? i2.SPACE_CHAR : p, u2.appendChild(g);
            } else if (d) {
              t2 += 1;
              var g = this.dom.createElement("span");
              g.style.width = i2.config.characterWidth * 2 + "px", g.className = "ace_cjk", g.textContent = d, u2.appendChild(g);
            }
          }
          u2.appendChild(this.dom.createTextNode(f ? r2.slice(f) : r2, this.element));
          if (!this.$textToken[n2.type]) {
            var y = "ace_" + n2.type.replace(/\./g, " ace_"), g = this.dom.createElement("span");
            n2.type == "fold" && (g.style.width = n2.value.length * this.config.characterWidth + "px"), g.className = y, g.appendChild(u2), e2.appendChild(g);
          } else
            e2.appendChild(u2);
          return t2 + r2.length;
        }, this.renderIndentGuide = function(e2, t2, n2) {
          var r2 = t2.search(this.$indentGuideRe);
          if (r2 <= 0 || r2 >= n2)
            return t2;
          if (t2[0] == " ") {
            r2 -= r2 % this.tabSize;
            var i2 = r2 / this.tabSize;
            for (var s2 = 0; s2 < i2; s2++)
              e2.appendChild(this.$tabStrings[" "].cloneNode(true));
            return t2.substr(r2);
          }
          if (t2[0] == "	") {
            for (var s2 = 0; s2 < r2; s2++)
              e2.appendChild(this.$tabStrings["	"].cloneNode(true));
            return t2.substr(r2);
          }
          return t2;
        }, this.$createLineElement = function(e2) {
          var t2 = this.dom.createElement("div");
          return t2.className = "ace_line", t2.style.height = this.config.lineHeight + "px", t2;
        }, this.$renderWrappedLine = function(e2, t2, n2) {
          var r2 = 0, i2 = 0, o2 = n2[0], u2 = 0, a2 = this.$createLineElement();
          e2.appendChild(a2);
          for (var f = 0; f < t2.length; f++) {
            var l = t2[f], c = l.value;
            if (f == 0 && this.displayIndentGuides) {
              r2 = c.length, c = this.renderIndentGuide(a2, c, o2);
              if (!c)
                continue;
              r2 -= c.length;
            }
            if (r2 + c.length < o2)
              u2 = this.$renderToken(a2, u2, l, c), r2 += c.length;
            else {
              while (r2 + c.length >= o2)
                u2 = this.$renderToken(a2, u2, l, c.substring(0, o2 - r2)), c = c.substring(o2 - r2), r2 = o2, a2 = this.$createLineElement(), e2.appendChild(a2), a2.appendChild(this.dom.createTextNode(s.stringRepeat("\xA0", n2.indent), this.element)), i2++, u2 = 0, o2 = n2[i2] || Number.MAX_VALUE;
              c.length != 0 && (r2 += c.length, u2 = this.$renderToken(a2, u2, l, c));
            }
          }
          n2[n2.length - 1] > this.MAX_LINE_LENGTH && this.$renderOverflowMessage(a2, u2, null, "", true);
        }, this.$renderSimpleLine = function(e2, t2) {
          var n2 = 0;
          for (var r2 = 0; r2 < t2.length; r2++) {
            var i2 = t2[r2], s2 = i2.value;
            if (r2 == 0 && this.displayIndentGuides) {
              s2 = this.renderIndentGuide(e2, s2);
              if (!s2)
                continue;
            }
            if (n2 + s2.length > this.MAX_LINE_LENGTH)
              return this.$renderOverflowMessage(e2, n2, i2, s2);
            n2 = this.$renderToken(e2, n2, i2, s2);
          }
        }, this.$renderOverflowMessage = function(e2, t2, n2, r2, i2) {
          n2 && this.$renderToken(e2, t2, n2, r2.slice(0, this.MAX_LINE_LENGTH - t2));
          var s2 = this.dom.createElement("span");
          s2.className = "ace_inline_button ace_keyword ace_toggle_wrap", s2.textContent = i2 ? "<hide>" : "<click to see more...>", e2.appendChild(s2);
        }, this.$renderLine = function(e2, t2, n2) {
          !n2 && n2 != 0 && (n2 = this.session.getFoldLine(t2));
          if (n2)
            var r2 = this.$getFoldLineTokens(t2, n2);
          else
            var r2 = this.session.getTokens(t2);
          var i2 = e2;
          if (r2.length) {
            var s2 = this.session.getRowSplitData(t2);
            if (s2 && s2.length) {
              this.$renderWrappedLine(e2, r2, s2);
              var i2 = e2.lastChild;
            } else {
              var i2 = e2;
              this.$useLineGroups() && (i2 = this.$createLineElement(), e2.appendChild(i2)), this.$renderSimpleLine(i2, r2);
            }
          } else
            this.$useLineGroups() && (i2 = this.$createLineElement(), e2.appendChild(i2));
          if (this.showEOL && i2) {
            n2 && (t2 = n2.end.row);
            var o2 = this.dom.createElement("span");
            o2.className = "ace_invisible ace_invisible_eol", o2.textContent = t2 == this.session.getLength() - 1 ? this.EOF_CHAR : this.EOL_CHAR, i2.appendChild(o2);
          }
        }, this.$getFoldLineTokens = function(e2, t2) {
          function i2(e3, t3, n3) {
            var i3 = 0, s3 = 0;
            while (s3 + e3[i3].value.length < t3) {
              s3 += e3[i3].value.length, i3++;
              if (i3 == e3.length)
                return;
            }
            if (s3 != t3) {
              var o2 = e3[i3].value.substring(t3 - s3);
              o2.length > n3 - t3 && (o2 = o2.substring(0, n3 - t3)), r2.push({ type: e3[i3].type, value: o2 }), s3 = t3 + o2.length, i3 += 1;
            }
            while (s3 < n3 && i3 < e3.length) {
              var o2 = e3[i3].value;
              o2.length + s3 > n3 ? r2.push({ type: e3[i3].type, value: o2.substring(0, n3 - s3) }) : r2.push(e3[i3]), s3 += o2.length, i3 += 1;
            }
          }
          var n2 = this.session, r2 = [], s2 = n2.getTokens(e2);
          return t2.walk(function(e3, t3, o2, u2, a2) {
            e3 != null ? r2.push({ type: "fold", value: e3 }) : (a2 && (s2 = n2.getTokens(t3)), s2.length && i2(s2, u2, o2));
          }, t2.end.row, this.session.getLine(t2.end.row).length), r2;
        }, this.$useLineGroups = function() {
          return this.session.getUseWrapMode();
        }, this.destroy = function() {
        };
      }).call(a.prototype), t.Text = a;
    }), ace.define("ace/layer/cursor", ["require", "exports", "module", "ace/lib/dom"], function(e, t, n) {
      "use strict";
      var r = e("../lib/dom"), i = function(e2) {
        this.element = r.createElement("div"), this.element.className = "ace_layer ace_cursor-layer", e2.appendChild(this.element), this.isVisible = false, this.isBlinking = true, this.blinkInterval = 1e3, this.smoothBlinking = false, this.cursors = [], this.cursor = this.addCursor(), r.addCssClass(this.element, "ace_hidden-cursors"), this.$updateCursors = this.$updateOpacity.bind(this);
      };
      (function() {
        this.$updateOpacity = function(e2) {
          var t2 = this.cursors;
          for (var n2 = t2.length; n2--; )
            r.setStyle(t2[n2].style, "opacity", e2 ? "" : "0");
        }, this.$startCssAnimation = function() {
          var e2 = this.cursors;
          for (var t2 = e2.length; t2--; )
            e2[t2].style.animationDuration = this.blinkInterval + "ms";
          this.$isAnimating = true, setTimeout(function() {
            this.$isAnimating && r.addCssClass(this.element, "ace_animate-blinking");
          }.bind(this));
        }, this.$stopCssAnimation = function() {
          this.$isAnimating = false, r.removeCssClass(this.element, "ace_animate-blinking");
        }, this.$padding = 0, this.setPadding = function(e2) {
          this.$padding = e2;
        }, this.setSession = function(e2) {
          this.session = e2;
        }, this.setBlinking = function(e2) {
          e2 != this.isBlinking && (this.isBlinking = e2, this.restartTimer());
        }, this.setBlinkInterval = function(e2) {
          e2 != this.blinkInterval && (this.blinkInterval = e2, this.restartTimer());
        }, this.setSmoothBlinking = function(e2) {
          e2 != this.smoothBlinking && (this.smoothBlinking = e2, r.setCssClass(this.element, "ace_smooth-blinking", e2), this.$updateCursors(true), this.restartTimer());
        }, this.addCursor = function() {
          var e2 = r.createElement("div");
          return e2.className = "ace_cursor", this.element.appendChild(e2), this.cursors.push(e2), e2;
        }, this.removeCursor = function() {
          if (this.cursors.length > 1) {
            var e2 = this.cursors.pop();
            return e2.parentNode.removeChild(e2), e2;
          }
        }, this.hideCursor = function() {
          this.isVisible = false, r.addCssClass(this.element, "ace_hidden-cursors"), this.restartTimer();
        }, this.showCursor = function() {
          this.isVisible = true, r.removeCssClass(this.element, "ace_hidden-cursors"), this.restartTimer();
        }, this.restartTimer = function() {
          var e2 = this.$updateCursors;
          clearInterval(this.intervalId), clearTimeout(this.timeoutId), this.$stopCssAnimation(), this.smoothBlinking && (this.$isSmoothBlinking = false, r.removeCssClass(this.element, "ace_smooth-blinking")), e2(true);
          if (!this.isBlinking || !this.blinkInterval || !this.isVisible) {
            this.$stopCssAnimation();
            return;
          }
          this.smoothBlinking && (this.$isSmoothBlinking = true, setTimeout(function() {
            this.$isSmoothBlinking && r.addCssClass(this.element, "ace_smooth-blinking");
          }.bind(this)));
          if (r.HAS_CSS_ANIMATION)
            this.$startCssAnimation();
          else {
            var t2 = function() {
              this.timeoutId = setTimeout(function() {
                e2(false);
              }, 0.6 * this.blinkInterval);
            }.bind(this);
            this.intervalId = setInterval(function() {
              e2(true), t2();
            }, this.blinkInterval), t2();
          }
        }, this.getPixelPosition = function(e2, t2) {
          if (!this.config || !this.session)
            return { left: 0, top: 0 };
          e2 || (e2 = this.session.selection.getCursor());
          var n2 = this.session.documentToScreenPosition(e2), r2 = this.$padding + (this.session.$bidiHandler.isBidiRow(n2.row, e2.row) ? this.session.$bidiHandler.getPosLeft(n2.column) : n2.column * this.config.characterWidth), i2 = (n2.row - (t2 ? this.config.firstRowScreen : 0)) * this.config.lineHeight;
          return { left: r2, top: i2 };
        }, this.isCursorInView = function(e2, t2) {
          return e2.top >= 0 && e2.top < t2.maxHeight;
        }, this.update = function(e2) {
          this.config = e2;
          var t2 = this.session.$selectionMarkers, n2 = 0, i2 = 0;
          if (t2 === void 0 || t2.length === 0)
            t2 = [{ cursor: null }];
          for (var n2 = 0, s = t2.length; n2 < s; n2++) {
            var o = this.getPixelPosition(t2[n2].cursor, true);
            if ((o.top > e2.height + e2.offset || o.top < 0) && n2 > 1)
              continue;
            var u = this.cursors[i2++] || this.addCursor(), a = u.style;
            this.drawCursor ? this.drawCursor(u, o, e2, t2[n2], this.session) : this.isCursorInView(o, e2) ? (r.setStyle(a, "display", "block"), r.translate(u, o.left, o.top), r.setStyle(a, "width", Math.round(e2.characterWidth) + "px"), r.setStyle(a, "height", e2.lineHeight + "px")) : r.setStyle(a, "display", "none");
          }
          while (this.cursors.length > i2)
            this.removeCursor();
          var f = this.session.getOverwrite();
          this.$setOverwrite(f), this.$pixelPos = o, this.restartTimer();
        }, this.drawCursor = null, this.$setOverwrite = function(e2) {
          e2 != this.overwrite && (this.overwrite = e2, e2 ? r.addCssClass(this.element, "ace_overwrite-cursors") : r.removeCssClass(this.element, "ace_overwrite-cursors"));
        }, this.destroy = function() {
          clearInterval(this.intervalId), clearTimeout(this.timeoutId);
        };
      }).call(i.prototype), t.Cursor = i;
    }), ace.define("ace/scrollbar", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/event", "ace/lib/event_emitter"], function(e, t, n) {
      "use strict";
      var r = e("./lib/oop"), i = e("./lib/dom"), s = e("./lib/event"), o = e("./lib/event_emitter").EventEmitter, u = 32768, a = function(e2) {
        this.element = i.createElement("div"), this.element.className = "ace_scrollbar ace_scrollbar" + this.classSuffix, this.inner = i.createElement("div"), this.inner.className = "ace_scrollbar-inner", this.inner.textContent = "\xA0", this.element.appendChild(this.inner), e2.appendChild(this.element), this.setVisible(false), this.skipEvent = false, s.addListener(this.element, "scroll", this.onScroll.bind(this)), s.addListener(this.element, "mousedown", s.preventDefault);
      };
      (function() {
        r.implement(this, o), this.setVisible = function(e2) {
          this.element.style.display = e2 ? "" : "none", this.isVisible = e2, this.coeff = 1;
        };
      }).call(a.prototype);
      var f = function(e2, t2) {
        a.call(this, e2), this.scrollTop = 0, this.scrollHeight = 0, t2.$scrollbarWidth = this.width = i.scrollbarWidth(e2.ownerDocument), this.inner.style.width = this.element.style.width = (this.width || 15) + 5 + "px", this.$minWidth = 0;
      };
      r.inherits(f, a), function() {
        this.classSuffix = "-v", this.onScroll = function() {
          if (!this.skipEvent) {
            this.scrollTop = this.element.scrollTop;
            if (this.coeff != 1) {
              var e2 = this.element.clientHeight / this.scrollHeight;
              this.scrollTop = this.scrollTop * (1 - e2) / (this.coeff - e2);
            }
            this._emit("scroll", { data: this.scrollTop });
          }
          this.skipEvent = false;
        }, this.getWidth = function() {
          return Math.max(this.isVisible ? this.width : 0, this.$minWidth || 0);
        }, this.setHeight = function(e2) {
          this.element.style.height = e2 + "px";
        }, this.setInnerHeight = this.setScrollHeight = function(e2) {
          this.scrollHeight = e2, e2 > u ? (this.coeff = u / e2, e2 = u) : this.coeff != 1 && (this.coeff = 1), this.inner.style.height = e2 + "px";
        }, this.setScrollTop = function(e2) {
          this.scrollTop != e2 && (this.skipEvent = true, this.scrollTop = e2, this.element.scrollTop = e2 * this.coeff);
        };
      }.call(f.prototype);
      var l = function(e2, t2) {
        a.call(this, e2), this.scrollLeft = 0, this.height = t2.$scrollbarWidth, this.inner.style.height = this.element.style.height = (this.height || 15) + 5 + "px";
      };
      r.inherits(l, a), function() {
        this.classSuffix = "-h", this.onScroll = function() {
          this.skipEvent || (this.scrollLeft = this.element.scrollLeft, this._emit("scroll", { data: this.scrollLeft })), this.skipEvent = false;
        }, this.getHeight = function() {
          return this.isVisible ? this.height : 0;
        }, this.setWidth = function(e2) {
          this.element.style.width = e2 + "px";
        }, this.setInnerWidth = function(e2) {
          this.inner.style.width = e2 + "px";
        }, this.setScrollWidth = function(e2) {
          this.inner.style.width = e2 + "px";
        }, this.setScrollLeft = function(e2) {
          this.scrollLeft != e2 && (this.skipEvent = true, this.scrollLeft = this.element.scrollLeft = e2);
        };
      }.call(l.prototype), t.ScrollBar = f, t.ScrollBarV = f, t.ScrollBarH = l, t.VScrollBar = f, t.HScrollBar = l;
    }), ace.define("ace/renderloop", ["require", "exports", "module", "ace/lib/event"], function(e, t, n) {
      "use strict";
      var r = e("./lib/event"), i = function(e2, t2) {
        this.onRender = e2, this.pending = false, this.changes = 0, this.$recursionLimit = 2, this.window = t2 || window;
        var n2 = this;
        this._flush = function(e3) {
          n2.pending = false;
          var t3 = n2.changes;
          t3 && (r.blockIdle(100), n2.changes = 0, n2.onRender(t3));
          if (n2.changes) {
            if (n2.$recursionLimit-- < 0)
              return;
            n2.schedule();
          } else
            n2.$recursionLimit = 2;
        };
      };
      (function() {
        this.schedule = function(e2) {
          this.changes = this.changes | e2, this.changes && !this.pending && (r.nextFrame(this._flush), this.pending = true);
        }, this.clear = function(e2) {
          var t2 = this.changes;
          return this.changes = 0, t2;
        };
      }).call(i.prototype), t.RenderLoop = i;
    }), ace.define("ace/layer/font_metrics", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/event", "ace/lib/useragent", "ace/lib/event_emitter"], function(e, t, n) {
      var r = e("../lib/oop"), i = e("../lib/dom"), s = e("../lib/lang"), o = e("../lib/event"), u = e("../lib/useragent"), a = e("../lib/event_emitter").EventEmitter, f = 256, l = typeof ResizeObserver == "function", c = 200, h = t.FontMetrics = function(e2) {
        this.el = i.createElement("div"), this.$setMeasureNodeStyles(this.el.style, true), this.$main = i.createElement("div"), this.$setMeasureNodeStyles(this.$main.style), this.$measureNode = i.createElement("div"), this.$setMeasureNodeStyles(this.$measureNode.style), this.el.appendChild(this.$main), this.el.appendChild(this.$measureNode), e2.appendChild(this.el), this.$measureNode.textContent = s.stringRepeat("X", f), this.$characterSize = { width: 0, height: 0 }, l ? this.$addObserver() : this.checkForSizeChanges();
      };
      (function() {
        r.implement(this, a), this.$characterSize = { width: 0, height: 0 }, this.$setMeasureNodeStyles = function(e2, t2) {
          e2.width = e2.height = "auto", e2.left = e2.top = "0px", e2.visibility = "hidden", e2.position = "absolute", e2.whiteSpace = "pre", u.isIE < 8 ? e2["font-family"] = "inherit" : e2.font = "inherit", e2.overflow = t2 ? "hidden" : "visible";
        }, this.checkForSizeChanges = function(e2) {
          e2 === void 0 && (e2 = this.$measureSizes());
          if (e2 && (this.$characterSize.width !== e2.width || this.$characterSize.height !== e2.height)) {
            this.$measureNode.style.fontWeight = "bold";
            var t2 = this.$measureSizes();
            this.$measureNode.style.fontWeight = "", this.$characterSize = e2, this.charSizes = /* @__PURE__ */ Object.create(null), this.allowBoldFonts = t2 && t2.width === e2.width && t2.height === e2.height, this._emit("changeCharacterSize", { data: e2 });
          }
        }, this.$addObserver = function() {
          var e2 = this;
          this.$observer = new window.ResizeObserver(function(t2) {
            e2.checkForSizeChanges();
          }), this.$observer.observe(this.$measureNode);
        }, this.$pollSizeChanges = function() {
          if (this.$pollSizeChangesTimer || this.$observer)
            return this.$pollSizeChangesTimer;
          var e2 = this;
          return this.$pollSizeChangesTimer = o.onIdle(function t2() {
            e2.checkForSizeChanges(), o.onIdle(t2, 500);
          }, 500);
        }, this.setPolling = function(e2) {
          e2 ? this.$pollSizeChanges() : this.$pollSizeChangesTimer && (clearInterval(this.$pollSizeChangesTimer), this.$pollSizeChangesTimer = 0);
        }, this.$measureSizes = function(e2) {
          var t2 = { height: (e2 || this.$measureNode).clientHeight, width: (e2 || this.$measureNode).clientWidth / f };
          return t2.width === 0 || t2.height === 0 ? null : t2;
        }, this.$measureCharWidth = function(e2) {
          this.$main.textContent = s.stringRepeat(e2, f);
          var t2 = this.$main.getBoundingClientRect();
          return t2.width / f;
        }, this.getCharacterWidth = function(e2) {
          var t2 = this.charSizes[e2];
          return t2 === void 0 && (t2 = this.charSizes[e2] = this.$measureCharWidth(e2) / this.$characterSize.width), t2;
        }, this.destroy = function() {
          clearInterval(this.$pollSizeChangesTimer), this.$observer && this.$observer.disconnect(), this.el && this.el.parentNode && this.el.parentNode.removeChild(this.el);
        }, this.$getZoom = function e2(t2) {
          return !t2 || !t2.parentElement ? 1 : (window.getComputedStyle(t2).zoom || 1) * e2(t2.parentElement);
        }, this.$initTransformMeasureNodes = function() {
          var e2 = function(e3, t2) {
            return ["div", { style: "position: absolute;top:" + e3 + "px;left:" + t2 + "px;" }];
          };
          this.els = i.buildDom([e2(0, 0), e2(c, 0), e2(0, c), e2(c, c)], this.el);
        }, this.transformCoordinates = function(e2, t2) {
          function r2(e3, t3, n3) {
            var r3 = e3[1] * t3[0] - e3[0] * t3[1];
            return [(-t3[1] * n3[0] + t3[0] * n3[1]) / r3, (+e3[1] * n3[0] - e3[0] * n3[1]) / r3];
          }
          function i2(e3, t3) {
            return [e3[0] - t3[0], e3[1] - t3[1]];
          }
          function s2(e3, t3) {
            return [e3[0] + t3[0], e3[1] + t3[1]];
          }
          function o2(e3, t3) {
            return [e3 * t3[0], e3 * t3[1]];
          }
          function u2(e3) {
            var t3 = e3.getBoundingClientRect();
            return [t3.left, t3.top];
          }
          if (e2) {
            var n2 = this.$getZoom(this.el);
            e2 = o2(1 / n2, e2);
          }
          this.els || this.$initTransformMeasureNodes();
          var a2 = u2(this.els[0]), f2 = u2(this.els[1]), l2 = u2(this.els[2]), h2 = u2(this.els[3]), p = r2(i2(h2, f2), i2(h2, l2), i2(s2(f2, l2), s2(h2, a2))), d = o2(1 + p[0], i2(f2, a2)), v = o2(1 + p[1], i2(l2, a2));
          if (t2) {
            var m = t2, g = p[0] * m[0] / c + p[1] * m[1] / c + 1, y = s2(o2(m[0], d), o2(m[1], v));
            return s2(o2(1 / g / c, y), a2);
          }
          var b = i2(e2, a2), w = r2(i2(d, o2(p[0], b)), i2(v, o2(p[1], b)), b);
          return o2(c, w);
        };
      }).call(h.prototype);
    }), ace.define("ace/virtual_renderer", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/config", "ace/layer/gutter", "ace/layer/marker", "ace/layer/text", "ace/layer/cursor", "ace/scrollbar", "ace/scrollbar", "ace/renderloop", "ace/layer/font_metrics", "ace/lib/event_emitter", "ace/lib/useragent"], function(e, t, n) {
      "use strict";
      var r = e("./lib/oop"), i = e("./lib/dom"), s = e("./config"), o = e("./layer/gutter").Gutter, u = e("./layer/marker").Marker, a = e("./layer/text").Text, f = e("./layer/cursor").Cursor, l = e("./scrollbar").HScrollBar, c = e("./scrollbar").VScrollBar, h = e("./renderloop").RenderLoop, p = e("./layer/font_metrics").FontMetrics, d = e("./lib/event_emitter").EventEmitter, v = `.ace_br1 {border-top-left-radius    : 3px;}.ace_br2 {border-top-right-radius   : 3px;}.ace_br3 {border-top-left-radius    : 3px; border-top-right-radius:    3px;}.ace_br4 {border-bottom-right-radius: 3px;}.ace_br5 {border-top-left-radius    : 3px; border-bottom-right-radius: 3px;}.ace_br6 {border-top-right-radius   : 3px; border-bottom-right-radius: 3px;}.ace_br7 {border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px;}.ace_br8 {border-bottom-left-radius : 3px;}.ace_br9 {border-top-left-radius    : 3px; border-bottom-left-radius:  3px;}.ace_br10{border-top-right-radius   : 3px; border-bottom-left-radius:  3px;}.ace_br11{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-left-radius:  3px;}.ace_br12{border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br13{border-top-left-radius    : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br14{border-top-right-radius   : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br15{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px;}.ace_editor {position: relative;overflow: hidden;padding: 0;font: 12px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;direction: ltr;text-align: left;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}.ace_scroller {position: absolute;overflow: hidden;top: 0;bottom: 0;background-color: inherit;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;cursor: text;}.ace_content {position: absolute;box-sizing: border-box;min-width: 100%;contain: style size layout;font-variant-ligatures: no-common-ligatures;}.ace_dragging .ace_scroller:before{position: absolute;top: 0;left: 0;right: 0;bottom: 0;content: '';background: rgba(250, 250, 250, 0.01);z-index: 1000;}.ace_dragging.ace_dark .ace_scroller:before{background: rgba(0, 0, 0, 0.01);}.ace_gutter {position: absolute;overflow : hidden;width: auto;top: 0;bottom: 0;left: 0;cursor: default;z-index: 4;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;contain: style size layout;}.ace_gutter-active-line {position: absolute;left: 0;right: 0;}.ace_scroller.ace_scroll-left {box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.4) inset;}.ace_gutter-cell {position: absolute;top: 0;left: 0;right: 0;padding-left: 19px;padding-right: 6px;background-repeat: no-repeat;}.ace_gutter-cell.ace_error {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABOFBMVEX/////////QRswFAb/Ui4wFAYwFAYwFAaWGAfDRymzOSH/PxswFAb/SiUwFAYwFAbUPRvjQiDllog5HhHdRybsTi3/Tyv9Tir+Syj/UC3////XurebMBIwFAb/RSHbPx/gUzfdwL3kzMivKBAwFAbbvbnhPx66NhowFAYwFAaZJg8wFAaxKBDZurf/RB6mMxb/SCMwFAYwFAbxQB3+RB4wFAb/Qhy4Oh+4QifbNRcwFAYwFAYwFAb/QRzdNhgwFAYwFAbav7v/Uy7oaE68MBK5LxLewr/r2NXewLswFAaxJw4wFAbkPRy2PyYwFAaxKhLm1tMwFAazPiQwFAaUGAb/QBrfOx3bvrv/VC/maE4wFAbRPBq6MRO8Qynew8Dp2tjfwb0wFAbx6eju5+by6uns4uH9/f36+vr/GkHjAAAAYnRSTlMAGt+64rnWu/bo8eAA4InH3+DwoN7j4eLi4xP99Nfg4+b+/u9B/eDs1MD1mO7+4PHg2MXa347g7vDizMLN4eG+Pv7i5evs/v79yu7S3/DV7/498Yv24eH+4ufQ3Ozu/v7+y13sRqwAAADLSURBVHjaZc/XDsFgGIBhtDrshlitmk2IrbHFqL2pvXf/+78DPokj7+Fz9qpU/9UXJIlhmPaTaQ6QPaz0mm+5gwkgovcV6GZzd5JtCQwgsxoHOvJO15kleRLAnMgHFIESUEPmawB9ngmelTtipwwfASilxOLyiV5UVUyVAfbG0cCPHig+GBkzAENHS0AstVF6bacZIOzgLmxsHbt2OecNgJC83JERmePUYq8ARGkJx6XtFsdddBQgZE2nPR6CICZhawjA4Fb/chv+399kfR+MMMDGOQAAAABJRU5ErkJggg==");background-repeat: no-repeat;background-position: 2px center;}.ace_gutter-cell.ace_warning {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEX///8AAAD///8AAAAAAABPSzb/5sAAAAB/blH/73z/ulkAAAAAAAD85pkAAAAAAAACAgP/vGz/rkDerGbGrV7/pkQICAf////e0IsAAAD/oED/qTvhrnUAAAD/yHD/njcAAADuv2r/nz//oTj/p064oGf/zHAAAAA9Nir/tFIAAAD/tlTiuWf/tkIAAACynXEAAAAAAAAtIRW7zBpBAAAAM3RSTlMAABR1m7RXO8Ln31Z36zT+neXe5OzooRDfn+TZ4p3h2hTf4t3k3ucyrN1K5+Xaks52Sfs9CXgrAAAAjklEQVR42o3PbQ+CIBQFYEwboPhSYgoYunIqqLn6/z8uYdH8Vmdnu9vz4WwXgN/xTPRD2+sgOcZjsge/whXZgUaYYvT8QnuJaUrjrHUQreGczuEafQCO/SJTufTbroWsPgsllVhq3wJEk2jUSzX3CUEDJC84707djRc5MTAQxoLgupWRwW6UB5fS++NV8AbOZgnsC7BpEAAAAABJRU5ErkJggg==");background-position: 2px center;}.ace_gutter-cell.ace_info {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAJ0Uk5TAAB2k804AAAAPklEQVQY02NgIB68QuO3tiLznjAwpKTgNyDbMegwisCHZUETUZV0ZqOquBpXj2rtnpSJT1AEnnRmL2OgGgAAIKkRQap2htgAAAAASUVORK5CYII=");background-position: 2px center;}.ace_dark .ace_gutter-cell.ace_info {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAChoaGAgIAqKiq+vr6tra1ZWVmUlJSbm5s8PDxubm56enrdgzg3AAAAAXRSTlMAQObYZgAAAClJREFUeNpjYMAPdsMYHegyJZFQBlsUlMFVCWUYKkAZMxZAGdxlDMQBAG+TBP4B6RyJAAAAAElFTkSuQmCC");}.ace_scrollbar {contain: strict;position: absolute;right: 0;bottom: 0;z-index: 6;}.ace_scrollbar-inner {position: absolute;cursor: text;left: 0;top: 0;}.ace_scrollbar-v{overflow-x: hidden;overflow-y: scroll;top: 0;}.ace_scrollbar-h {overflow-x: scroll;overflow-y: hidden;left: 0;}.ace_print-margin {position: absolute;height: 100%;}.ace_text-input {position: absolute;z-index: 0;width: 0.5em;height: 1em;opacity: 0;background: transparent;-moz-appearance: none;appearance: none;border: none;resize: none;outline: none;overflow: hidden;font: inherit;padding: 0 1px;margin: 0 -1px;contain: strict;-ms-user-select: text;-moz-user-select: text;-webkit-user-select: text;user-select: text;white-space: pre!important;}.ace_text-input.ace_composition {background: transparent;color: inherit;z-index: 1000;opacity: 1;}.ace_composition_placeholder { color: transparent }.ace_composition_marker { border-bottom: 1px solid;position: absolute;border-radius: 0;margin-top: 1px;}[ace_nocontext=true] {transform: none!important;filter: none!important;clip-path: none!important;mask : none!important;contain: none!important;perspective: none!important;mix-blend-mode: initial!important;z-index: auto;}.ace_layer {z-index: 1;position: absolute;overflow: hidden;word-wrap: normal;white-space: pre;height: 100%;width: 100%;box-sizing: border-box;pointer-events: none;}.ace_gutter-layer {position: relative;width: auto;text-align: right;pointer-events: auto;height: 1000000px;contain: style size layout;}.ace_text-layer {font: inherit !important;position: absolute;height: 1000000px;width: 1000000px;contain: style size layout;}.ace_text-layer > .ace_line, .ace_text-layer > .ace_line_group {contain: style size layout;position: absolute;top: 0;left: 0;right: 0;}.ace_hidpi .ace_text-layer,.ace_hidpi .ace_gutter-layer,.ace_hidpi .ace_content,.ace_hidpi .ace_gutter {contain: strict;will-change: transform;}.ace_hidpi .ace_text-layer > .ace_line, .ace_hidpi .ace_text-layer > .ace_line_group {contain: strict;}.ace_cjk {display: inline-block;text-align: center;}.ace_cursor-layer {z-index: 4;}.ace_cursor {z-index: 4;position: absolute;box-sizing: border-box;border-left: 2px solid;transform: translatez(0);}.ace_multiselect .ace_cursor {border-left-width: 1px;}.ace_slim-cursors .ace_cursor {border-left-width: 1px;}.ace_overwrite-cursors .ace_cursor {border-left-width: 0;border-bottom: 1px solid;}.ace_hidden-cursors .ace_cursor {opacity: 0.2;}.ace_hasPlaceholder .ace_hidden-cursors .ace_cursor {opacity: 0;}.ace_smooth-blinking .ace_cursor {transition: opacity 0.18s;}.ace_animate-blinking .ace_cursor {animation-duration: 1000ms;animation-timing-function: step-end;animation-name: blink-ace-animate;animation-iteration-count: infinite;}.ace_animate-blinking.ace_smooth-blinking .ace_cursor {animation-duration: 1000ms;animation-timing-function: ease-in-out;animation-name: blink-ace-animate-smooth;}@keyframes blink-ace-animate {from, to { opacity: 1; }60% { opacity: 0; }}@keyframes blink-ace-animate-smooth {from, to { opacity: 1; }45% { opacity: 1; }60% { opacity: 0; }85% { opacity: 0; }}.ace_marker-layer .ace_step, .ace_marker-layer .ace_stack {position: absolute;z-index: 3;}.ace_marker-layer .ace_selection {position: absolute;z-index: 5;}.ace_marker-layer .ace_bracket {position: absolute;z-index: 6;}.ace_marker-layer .ace_error_bracket {position: absolute;border-bottom: 1px solid #DE5555;border-radius: 0;}.ace_marker-layer .ace_active-line {position: absolute;z-index: 2;}.ace_marker-layer .ace_selected-word {position: absolute;z-index: 4;box-sizing: border-box;}.ace_line .ace_fold {box-sizing: border-box;display: inline-block;height: 11px;margin-top: -2px;vertical-align: middle;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACJJREFUeNpi+P//fxgTAwPDBxDxD078RSX+YeEyDFMCIMAAI3INmXiwf2YAAAAASUVORK5CYII=");background-repeat: no-repeat, repeat-x;background-position: center center, top left;color: transparent;border: 1px solid black;border-radius: 2px;cursor: pointer;pointer-events: auto;}.ace_dark .ace_fold {}.ace_fold:hover{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACBJREFUeNpi+P//fz4TAwPDZxDxD5X4i5fLMEwJgAADAEPVDbjNw87ZAAAAAElFTkSuQmCC");}.ace_tooltip {background-color: #FFF;background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));border: 1px solid gray;border-radius: 1px;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);color: black;max-width: 100%;padding: 3px 4px;position: fixed;z-index: 999999;box-sizing: border-box;cursor: default;white-space: pre;word-wrap: break-word;line-height: normal;font-style: normal;font-weight: normal;letter-spacing: normal;pointer-events: none;}.ace_folding-enabled > .ace_gutter-cell {padding-right: 13px;}.ace_fold-widget {box-sizing: border-box;margin: 0 -12px 0 1px;display: none;width: 11px;vertical-align: top;background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42mWKsQ0AMAzC8ixLlrzQjzmBiEjp0A6WwBCSPgKAXoLkqSot7nN3yMwR7pZ32NzpKkVoDBUxKAAAAABJRU5ErkJggg==");background-repeat: no-repeat;background-position: center;border-radius: 3px;border: 1px solid transparent;cursor: pointer;}.ace_folding-enabled .ace_fold-widget {display: inline-block;   }.ace_fold-widget.ace_end {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42m3HwQkAMAhD0YzsRchFKI7sAikeWkrxwScEB0nh5e7KTPWimZki4tYfVbX+MNl4pyZXejUO1QAAAABJRU5ErkJggg==");}.ace_fold-widget.ace_closed {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAGCAYAAAAG5SQMAAAAOUlEQVR42jXKwQkAMAgDwKwqKD4EwQ26sSOkVWjgIIHAzPiCgaqiqnJHZnKICBERHN194O5b9vbLuAVRL+l0YWnZAAAAAElFTkSuQmCCXA==");}.ace_fold-widget:hover {border: 1px solid rgba(0, 0, 0, 0.3);background-color: rgba(255, 255, 255, 0.2);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);}.ace_fold-widget:active {border: 1px solid rgba(0, 0, 0, 0.4);background-color: rgba(0, 0, 0, 0.05);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);}.ace_dark .ace_fold-widget {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHklEQVQIW2P4//8/AzoGEQ7oGCaLLAhWiSwB146BAQCSTPYocqT0AAAAAElFTkSuQmCC");}.ace_dark .ace_fold-widget.ace_end {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAH0lEQVQIW2P4//8/AxQ7wNjIAjDMgC4AxjCVKBirIAAF0kz2rlhxpAAAAABJRU5ErkJggg==");}.ace_dark .ace_fold-widget.ace_closed {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQIW2P4//+/AxAzgDADlOOAznHAKgPWAwARji8UIDTfQQAAAABJRU5ErkJggg==");}.ace_dark .ace_fold-widget:hover {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);background-color: rgba(255, 255, 255, 0.1);}.ace_dark .ace_fold-widget:active {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);}.ace_inline_button {border: 1px solid lightgray;display: inline-block;margin: -1px 8px;padding: 0 5px;pointer-events: auto;cursor: pointer;}.ace_inline_button:hover {border-color: gray;background: rgba(200,200,200,0.2);display: inline-block;pointer-events: auto;}.ace_fold-widget.ace_invalid {background-color: #FFB4B4;border-color: #DE5555;}.ace_fade-fold-widgets .ace_fold-widget {transition: opacity 0.4s ease 0.05s;opacity: 0;}.ace_fade-fold-widgets:hover .ace_fold-widget {transition: opacity 0.05s ease 0.05s;opacity:1;}.ace_underline {text-decoration: underline;}.ace_bold {font-weight: bold;}.ace_nobold .ace_bold {font-weight: normal;}.ace_italic {font-style: italic;}.ace_error-marker {background-color: rgba(255, 0, 0,0.2);position: absolute;z-index: 9;}.ace_highlight-marker {background-color: rgba(255, 255, 0,0.2);position: absolute;z-index: 8;}.ace_mobile-menu {position: absolute;line-height: 1.5;border-radius: 4px;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;background: white;box-shadow: 1px 3px 2px grey;border: 1px solid #dcdcdc;color: black;}.ace_dark > .ace_mobile-menu {background: #333;color: #ccc;box-shadow: 1px 3px 2px grey;border: 1px solid #444;}.ace_mobile-button {padding: 2px;cursor: pointer;overflow: hidden;}.ace_mobile-button:hover {background-color: #eee;opacity:1;}.ace_mobile-button:active {background-color: #ddd;}.ace_placeholder {font-family: arial;transform: scale(0.9);transform-origin: left;white-space: pre;opacity: 0.7;margin: 0 10px;}`, m = e("./lib/useragent"), g = m.isIE;
      i.importCssString(v, "ace_editor.css", false);
      var y = function(e2, t2) {
        var n2 = this;
        this.container = e2 || i.createElement("div"), i.addCssClass(this.container, "ace_editor"), i.HI_DPI && i.addCssClass(this.container, "ace_hidpi"), this.setTheme(t2), s.get("useStrictCSP") == null && s.set("useStrictCSP", false), this.$gutter = i.createElement("div"), this.$gutter.className = "ace_gutter", this.container.appendChild(this.$gutter), this.$gutter.setAttribute("aria-hidden", true), this.scroller = i.createElement("div"), this.scroller.className = "ace_scroller", this.container.appendChild(this.scroller), this.content = i.createElement("div"), this.content.className = "ace_content", this.scroller.appendChild(this.content), this.$gutterLayer = new o(this.$gutter), this.$gutterLayer.on("changeGutterWidth", this.onGutterResize.bind(this)), this.$markerBack = new u(this.content);
        var r2 = this.$textLayer = new a(this.content);
        this.canvas = r2.element, this.$markerFront = new u(this.content), this.$cursorLayer = new f(this.content), this.$horizScroll = false, this.$vScroll = false, this.scrollBar = this.scrollBarV = new c(this.container, this), this.scrollBarH = new l(this.container, this), this.scrollBarV.on("scroll", function(e3) {
          n2.$scrollAnimation || n2.session.setScrollTop(e3.data - n2.scrollMargin.top);
        }), this.scrollBarH.on("scroll", function(e3) {
          n2.$scrollAnimation || n2.session.setScrollLeft(e3.data - n2.scrollMargin.left);
        }), this.scrollTop = 0, this.scrollLeft = 0, this.cursorPos = { row: 0, column: 0 }, this.$fontMetrics = new p(this.container), this.$textLayer.$setFontMetrics(this.$fontMetrics), this.$textLayer.on("changeCharacterSize", function(e3) {
          n2.updateCharacterSize(), n2.onResize(true, n2.gutterWidth, n2.$size.width, n2.$size.height), n2._signal("changeCharacterSize", e3);
        }), this.$size = { width: 0, height: 0, scrollerHeight: 0, scrollerWidth: 0, $dirty: true }, this.layerConfig = { width: 1, padding: 0, firstRow: 0, firstRowScreen: 0, lastRow: 0, lineHeight: 0, characterWidth: 0, minHeight: 1, maxHeight: 1, offset: 0, height: 1, gutterOffset: 1 }, this.scrollMargin = { left: 0, right: 0, top: 0, bottom: 0, v: 0, h: 0 }, this.margin = { left: 0, right: 0, top: 0, bottom: 0, v: 0, h: 0 }, this.$keepTextAreaAtCursor = !m.isIOS, this.$loop = new h(this.$renderChanges.bind(this), this.container.ownerDocument.defaultView), this.$loop.schedule(this.CHANGE_FULL), this.updateCharacterSize(), this.setPadding(4), s.resetOptions(this), s._signal("renderer", this);
      };
      (function() {
        this.CHANGE_CURSOR = 1, this.CHANGE_MARKER = 2, this.CHANGE_GUTTER = 4, this.CHANGE_SCROLL = 8, this.CHANGE_LINES = 16, this.CHANGE_TEXT = 32, this.CHANGE_SIZE = 64, this.CHANGE_MARKER_BACK = 128, this.CHANGE_MARKER_FRONT = 256, this.CHANGE_FULL = 512, this.CHANGE_H_SCROLL = 1024, r.implement(this, d), this.updateCharacterSize = function() {
          this.$textLayer.allowBoldFonts != this.$allowBoldFonts && (this.$allowBoldFonts = this.$textLayer.allowBoldFonts, this.setStyle("ace_nobold", !this.$allowBoldFonts)), this.layerConfig.characterWidth = this.characterWidth = this.$textLayer.getCharacterWidth(), this.layerConfig.lineHeight = this.lineHeight = this.$textLayer.getLineHeight(), this.$updatePrintMargin(), i.setStyle(this.scroller.style, "line-height", this.lineHeight + "px");
        }, this.setSession = function(e2) {
          this.session && this.session.doc.off("changeNewLineMode", this.onChangeNewLineMode), this.session = e2, e2 && this.scrollMargin.top && e2.getScrollTop() <= 0 && e2.setScrollTop(-this.scrollMargin.top), this.$cursorLayer.setSession(e2), this.$markerBack.setSession(e2), this.$markerFront.setSession(e2), this.$gutterLayer.setSession(e2), this.$textLayer.setSession(e2);
          if (!e2)
            return;
          this.$loop.schedule(this.CHANGE_FULL), this.session.$setFontMetrics(this.$fontMetrics), this.scrollBarH.scrollLeft = this.scrollBarV.scrollTop = null, this.onChangeNewLineMode = this.onChangeNewLineMode.bind(this), this.onChangeNewLineMode(), this.session.doc.on("changeNewLineMode", this.onChangeNewLineMode);
        }, this.updateLines = function(e2, t2, n2) {
          t2 === void 0 && (t2 = Infinity), this.$changedLines ? (this.$changedLines.firstRow > e2 && (this.$changedLines.firstRow = e2), this.$changedLines.lastRow < t2 && (this.$changedLines.lastRow = t2)) : this.$changedLines = { firstRow: e2, lastRow: t2 };
          if (this.$changedLines.lastRow < this.layerConfig.firstRow) {
            if (!n2)
              return;
            this.$changedLines.lastRow = this.layerConfig.lastRow;
          }
          if (this.$changedLines.firstRow > this.layerConfig.lastRow)
            return;
          this.$loop.schedule(this.CHANGE_LINES);
        }, this.onChangeNewLineMode = function() {
          this.$loop.schedule(this.CHANGE_TEXT), this.$textLayer.$updateEolChar(), this.session.$bidiHandler.setEolChar(this.$textLayer.EOL_CHAR);
        }, this.onChangeTabSize = function() {
          this.$loop.schedule(this.CHANGE_TEXT | this.CHANGE_MARKER), this.$textLayer.onChangeTabSize();
        }, this.updateText = function() {
          this.$loop.schedule(this.CHANGE_TEXT);
        }, this.updateFull = function(e2) {
          e2 ? this.$renderChanges(this.CHANGE_FULL, true) : this.$loop.schedule(this.CHANGE_FULL);
        }, this.updateFontSize = function() {
          this.$textLayer.checkForSizeChanges();
        }, this.$changes = 0, this.$updateSizeAsync = function() {
          this.$loop.pending ? this.$size.$dirty = true : this.onResize();
        }, this.onResize = function(e2, t2, n2, r2) {
          if (this.resizing > 2)
            return;
          this.resizing > 0 ? this.resizing++ : this.resizing = e2 ? 1 : 0;
          var i2 = this.container;
          r2 || (r2 = i2.clientHeight || i2.scrollHeight), n2 || (n2 = i2.clientWidth || i2.scrollWidth);
          var s2 = this.$updateCachedSize(e2, t2, n2, r2);
          if (!this.$size.scrollerHeight || !n2 && !r2)
            return this.resizing = 0;
          e2 && (this.$gutterLayer.$padding = null), e2 ? this.$renderChanges(s2 | this.$changes, true) : this.$loop.schedule(s2 | this.$changes), this.resizing && (this.resizing = 0), this.scrollBarH.scrollLeft = this.scrollBarV.scrollTop = null;
        }, this.$updateCachedSize = function(e2, t2, n2, r2) {
          r2 -= this.$extraHeight || 0;
          var s2 = 0, o2 = this.$size, u2 = { width: o2.width, height: o2.height, scrollerHeight: o2.scrollerHeight, scrollerWidth: o2.scrollerWidth };
          r2 && (e2 || o2.height != r2) && (o2.height = r2, s2 |= this.CHANGE_SIZE, o2.scrollerHeight = o2.height, this.$horizScroll && (o2.scrollerHeight -= this.scrollBarH.getHeight()), this.scrollBarV.element.style.bottom = this.scrollBarH.getHeight() + "px", s2 |= this.CHANGE_SCROLL);
          if (n2 && (e2 || o2.width != n2)) {
            s2 |= this.CHANGE_SIZE, o2.width = n2, t2 == null && (t2 = this.$showGutter ? this.$gutter.offsetWidth : 0), this.gutterWidth = t2, i.setStyle(this.scrollBarH.element.style, "left", t2 + "px"), i.setStyle(this.scroller.style, "left", t2 + this.margin.left + "px"), o2.scrollerWidth = Math.max(0, n2 - t2 - this.scrollBarV.getWidth() - this.margin.h), i.setStyle(this.$gutter.style, "left", this.margin.left + "px");
            var a2 = this.scrollBarV.getWidth() + "px";
            i.setStyle(this.scrollBarH.element.style, "right", a2), i.setStyle(this.scroller.style, "right", a2), i.setStyle(this.scroller.style, "bottom", this.scrollBarH.getHeight());
            if (this.session && this.session.getUseWrapMode() && this.adjustWrapLimit() || e2)
              s2 |= this.CHANGE_FULL;
          }
          return o2.$dirty = !n2 || !r2, s2 && this._signal("resize", u2), s2;
        }, this.onGutterResize = function(e2) {
          var t2 = this.$showGutter ? e2 : 0;
          t2 != this.gutterWidth && (this.$changes |= this.$updateCachedSize(true, t2, this.$size.width, this.$size.height)), this.session.getUseWrapMode() && this.adjustWrapLimit() ? this.$loop.schedule(this.CHANGE_FULL) : this.$size.$dirty ? this.$loop.schedule(this.CHANGE_FULL) : this.$computeLayerConfig();
        }, this.adjustWrapLimit = function() {
          var e2 = this.$size.scrollerWidth - this.$padding * 2, t2 = Math.floor(e2 / this.characterWidth);
          return this.session.adjustWrapLimit(t2, this.$showPrintMargin && this.$printMarginColumn);
        }, this.setAnimatedScroll = function(e2) {
          this.setOption("animatedScroll", e2);
        }, this.getAnimatedScroll = function() {
          return this.$animatedScroll;
        }, this.setShowInvisibles = function(e2) {
          this.setOption("showInvisibles", e2), this.session.$bidiHandler.setShowInvisibles(e2);
        }, this.getShowInvisibles = function() {
          return this.getOption("showInvisibles");
        }, this.getDisplayIndentGuides = function() {
          return this.getOption("displayIndentGuides");
        }, this.setDisplayIndentGuides = function(e2) {
          this.setOption("displayIndentGuides", e2);
        }, this.setShowPrintMargin = function(e2) {
          this.setOption("showPrintMargin", e2);
        }, this.getShowPrintMargin = function() {
          return this.getOption("showPrintMargin");
        }, this.setPrintMarginColumn = function(e2) {
          this.setOption("printMarginColumn", e2);
        }, this.getPrintMarginColumn = function() {
          return this.getOption("printMarginColumn");
        }, this.getShowGutter = function() {
          return this.getOption("showGutter");
        }, this.setShowGutter = function(e2) {
          return this.setOption("showGutter", e2);
        }, this.getFadeFoldWidgets = function() {
          return this.getOption("fadeFoldWidgets");
        }, this.setFadeFoldWidgets = function(e2) {
          this.setOption("fadeFoldWidgets", e2);
        }, this.setHighlightGutterLine = function(e2) {
          this.setOption("highlightGutterLine", e2);
        }, this.getHighlightGutterLine = function() {
          return this.getOption("highlightGutterLine");
        }, this.$updatePrintMargin = function() {
          if (!this.$showPrintMargin && !this.$printMarginEl)
            return;
          if (!this.$printMarginEl) {
            var e2 = i.createElement("div");
            e2.className = "ace_layer ace_print-margin-layer", this.$printMarginEl = i.createElement("div"), this.$printMarginEl.className = "ace_print-margin", e2.appendChild(this.$printMarginEl), this.content.insertBefore(e2, this.content.firstChild);
          }
          var t2 = this.$printMarginEl.style;
          t2.left = Math.round(this.characterWidth * this.$printMarginColumn + this.$padding) + "px", t2.visibility = this.$showPrintMargin ? "visible" : "hidden", this.session && this.session.$wrap == -1 && this.adjustWrapLimit();
        }, this.getContainerElement = function() {
          return this.container;
        }, this.getMouseEventTarget = function() {
          return this.scroller;
        }, this.getTextAreaContainer = function() {
          return this.container;
        }, this.$moveTextAreaToCursor = function() {
          if (this.$isMousePressed)
            return;
          var e2 = this.textarea.style, t2 = this.$composition;
          if (!this.$keepTextAreaAtCursor && !t2) {
            i.translate(this.textarea, -100, 0);
            return;
          }
          var n2 = this.$cursorLayer.$pixelPos;
          if (!n2)
            return;
          t2 && t2.markerRange && (n2 = this.$cursorLayer.getPixelPosition(t2.markerRange.start, true));
          var r2 = this.layerConfig, s2 = n2.top, o2 = n2.left;
          s2 -= r2.offset;
          var u2 = t2 && t2.useTextareaForIME ? this.lineHeight : g ? 0 : 1;
          if (s2 < 0 || s2 > r2.height - u2) {
            i.translate(this.textarea, 0, 0);
            return;
          }
          var a2 = 1, f2 = this.$size.height - u2;
          if (!t2)
            s2 += this.lineHeight;
          else if (t2.useTextareaForIME) {
            var l2 = this.textarea.value;
            a2 = this.characterWidth * this.session.$getStringScreenWidth(l2)[0];
          } else
            s2 += this.lineHeight + 2;
          o2 -= this.scrollLeft, o2 > this.$size.scrollerWidth - a2 && (o2 = this.$size.scrollerWidth - a2), o2 += this.gutterWidth + this.margin.left, i.setStyle(e2, "height", u2 + "px"), i.setStyle(e2, "width", a2 + "px"), i.translate(this.textarea, Math.min(o2, this.$size.scrollerWidth - a2), Math.min(s2, f2));
        }, this.getFirstVisibleRow = function() {
          return this.layerConfig.firstRow;
        }, this.getFirstFullyVisibleRow = function() {
          return this.layerConfig.firstRow + (this.layerConfig.offset === 0 ? 0 : 1);
        }, this.getLastFullyVisibleRow = function() {
          var e2 = this.layerConfig, t2 = e2.lastRow, n2 = this.session.documentToScreenRow(t2, 0) * e2.lineHeight;
          return n2 - this.session.getScrollTop() > e2.height - e2.lineHeight ? t2 - 1 : t2;
        }, this.getLastVisibleRow = function() {
          return this.layerConfig.lastRow;
        }, this.$padding = null, this.setPadding = function(e2) {
          this.$padding = e2, this.$textLayer.setPadding(e2), this.$cursorLayer.setPadding(e2), this.$markerFront.setPadding(e2), this.$markerBack.setPadding(e2), this.$loop.schedule(this.CHANGE_FULL), this.$updatePrintMargin();
        }, this.setScrollMargin = function(e2, t2, n2, r2) {
          var i2 = this.scrollMargin;
          i2.top = e2 | 0, i2.bottom = t2 | 0, i2.right = r2 | 0, i2.left = n2 | 0, i2.v = i2.top + i2.bottom, i2.h = i2.left + i2.right, i2.top && this.scrollTop <= 0 && this.session && this.session.setScrollTop(-i2.top), this.updateFull();
        }, this.setMargin = function(e2, t2, n2, r2) {
          var i2 = this.margin;
          i2.top = e2 | 0, i2.bottom = t2 | 0, i2.right = r2 | 0, i2.left = n2 | 0, i2.v = i2.top + i2.bottom, i2.h = i2.left + i2.right, this.$updateCachedSize(true, this.gutterWidth, this.$size.width, this.$size.height), this.updateFull();
        }, this.getHScrollBarAlwaysVisible = function() {
          return this.$hScrollBarAlwaysVisible;
        }, this.setHScrollBarAlwaysVisible = function(e2) {
          this.setOption("hScrollBarAlwaysVisible", e2);
        }, this.getVScrollBarAlwaysVisible = function() {
          return this.$vScrollBarAlwaysVisible;
        }, this.setVScrollBarAlwaysVisible = function(e2) {
          this.setOption("vScrollBarAlwaysVisible", e2);
        }, this.$updateScrollBarV = function() {
          var e2 = this.layerConfig.maxHeight, t2 = this.$size.scrollerHeight;
          !this.$maxLines && this.$scrollPastEnd && (e2 -= (t2 - this.lineHeight) * this.$scrollPastEnd, this.scrollTop > e2 - t2 && (e2 = this.scrollTop + t2, this.scrollBarV.scrollTop = null)), this.scrollBarV.setScrollHeight(e2 + this.scrollMargin.v), this.scrollBarV.setScrollTop(this.scrollTop + this.scrollMargin.top);
        }, this.$updateScrollBarH = function() {
          this.scrollBarH.setScrollWidth(this.layerConfig.width + 2 * this.$padding + this.scrollMargin.h), this.scrollBarH.setScrollLeft(this.scrollLeft + this.scrollMargin.left);
        }, this.$frozen = false, this.freeze = function() {
          this.$frozen = true;
        }, this.unfreeze = function() {
          this.$frozen = false;
        }, this.$renderChanges = function(e2, t2) {
          this.$changes && (e2 |= this.$changes, this.$changes = 0);
          if (!this.session || !this.container.offsetWidth || this.$frozen || !e2 && !t2) {
            this.$changes |= e2;
            return;
          }
          if (this.$size.$dirty)
            return this.$changes |= e2, this.onResize(true);
          this.lineHeight || this.$textLayer.checkForSizeChanges(), this._signal("beforeRender", e2), this.session && this.session.$bidiHandler && this.session.$bidiHandler.updateCharacterWidths(this.$fontMetrics);
          var n2 = this.layerConfig;
          if (e2 & this.CHANGE_FULL || e2 & this.CHANGE_SIZE || e2 & this.CHANGE_TEXT || e2 & this.CHANGE_LINES || e2 & this.CHANGE_SCROLL || e2 & this.CHANGE_H_SCROLL) {
            e2 |= this.$computeLayerConfig() | this.$loop.clear();
            if (n2.firstRow != this.layerConfig.firstRow && n2.firstRowScreen == this.layerConfig.firstRowScreen) {
              var r2 = this.scrollTop + (n2.firstRow - this.layerConfig.firstRow) * this.lineHeight;
              r2 > 0 && (this.scrollTop = r2, e2 |= this.CHANGE_SCROLL, e2 |= this.$computeLayerConfig() | this.$loop.clear());
            }
            n2 = this.layerConfig, this.$updateScrollBarV(), e2 & this.CHANGE_H_SCROLL && this.$updateScrollBarH(), i.translate(this.content, -this.scrollLeft, -n2.offset);
            var s2 = n2.width + 2 * this.$padding + "px", o2 = n2.minHeight + "px";
            i.setStyle(this.content.style, "width", s2), i.setStyle(this.content.style, "height", o2);
          }
          e2 & this.CHANGE_H_SCROLL && (i.translate(this.content, -this.scrollLeft, -n2.offset), this.scroller.className = this.scrollLeft <= 0 ? "ace_scroller" : "ace_scroller ace_scroll-left");
          if (e2 & this.CHANGE_FULL) {
            this.$changedLines = null, this.$textLayer.update(n2), this.$showGutter && this.$gutterLayer.update(n2), this.$markerBack.update(n2), this.$markerFront.update(n2), this.$cursorLayer.update(n2), this.$moveTextAreaToCursor(), this._signal("afterRender", e2);
            return;
          }
          if (e2 & this.CHANGE_SCROLL) {
            this.$changedLines = null, e2 & this.CHANGE_TEXT || e2 & this.CHANGE_LINES ? this.$textLayer.update(n2) : this.$textLayer.scrollLines(n2), this.$showGutter && (e2 & this.CHANGE_GUTTER || e2 & this.CHANGE_LINES ? this.$gutterLayer.update(n2) : this.$gutterLayer.scrollLines(n2)), this.$markerBack.update(n2), this.$markerFront.update(n2), this.$cursorLayer.update(n2), this.$moveTextAreaToCursor(), this._signal("afterRender", e2);
            return;
          }
          e2 & this.CHANGE_TEXT ? (this.$changedLines = null, this.$textLayer.update(n2), this.$showGutter && this.$gutterLayer.update(n2)) : e2 & this.CHANGE_LINES ? (this.$updateLines() || e2 & this.CHANGE_GUTTER && this.$showGutter) && this.$gutterLayer.update(n2) : e2 & this.CHANGE_TEXT || e2 & this.CHANGE_GUTTER ? this.$showGutter && this.$gutterLayer.update(n2) : e2 & this.CHANGE_CURSOR && this.$highlightGutterLine && this.$gutterLayer.updateLineHighlight(n2), e2 & this.CHANGE_CURSOR && (this.$cursorLayer.update(n2), this.$moveTextAreaToCursor()), e2 & (this.CHANGE_MARKER | this.CHANGE_MARKER_FRONT) && this.$markerFront.update(n2), e2 & (this.CHANGE_MARKER | this.CHANGE_MARKER_BACK) && this.$markerBack.update(n2), this._signal("afterRender", e2);
        }, this.$autosize = function() {
          var e2 = this.session.getScreenLength() * this.lineHeight, t2 = this.$maxLines * this.lineHeight, n2 = Math.min(t2, Math.max((this.$minLines || 1) * this.lineHeight, e2)) + this.scrollMargin.v + (this.$extraHeight || 0);
          this.$horizScroll && (n2 += this.scrollBarH.getHeight()), this.$maxPixelHeight && n2 > this.$maxPixelHeight && (n2 = this.$maxPixelHeight);
          var r2 = n2 <= 2 * this.lineHeight, i2 = !r2 && e2 > t2;
          if (n2 != this.desiredHeight || this.$size.height != this.desiredHeight || i2 != this.$vScroll) {
            i2 != this.$vScroll && (this.$vScroll = i2, this.scrollBarV.setVisible(i2));
            var s2 = this.container.clientWidth;
            this.container.style.height = n2 + "px", this.$updateCachedSize(true, this.$gutterWidth, s2, n2), this.desiredHeight = n2, this._signal("autosize");
          }
        }, this.$computeLayerConfig = function() {
          var e2 = this.session, t2 = this.$size, n2 = t2.height <= 2 * this.lineHeight, r2 = this.session.getScreenLength(), i2 = r2 * this.lineHeight, s2 = this.$getLongestLine(), o2 = !n2 && (this.$hScrollBarAlwaysVisible || t2.scrollerWidth - s2 - 2 * this.$padding < 0), u2 = this.$horizScroll !== o2;
          u2 && (this.$horizScroll = o2, this.scrollBarH.setVisible(o2));
          var a2 = this.$vScroll;
          this.$maxLines && this.lineHeight > 1 && this.$autosize();
          var f2 = t2.scrollerHeight + this.lineHeight, l2 = !this.$maxLines && this.$scrollPastEnd ? (t2.scrollerHeight - this.lineHeight) * this.$scrollPastEnd : 0;
          i2 += l2;
          var c2 = this.scrollMargin;
          this.session.setScrollTop(Math.max(-c2.top, Math.min(this.scrollTop, i2 - t2.scrollerHeight + c2.bottom))), this.session.setScrollLeft(Math.max(-c2.left, Math.min(this.scrollLeft, s2 + 2 * this.$padding - t2.scrollerWidth + c2.right)));
          var h2 = !n2 && (this.$vScrollBarAlwaysVisible || t2.scrollerHeight - i2 + l2 < 0 || this.scrollTop > c2.top), p2 = a2 !== h2;
          p2 && (this.$vScroll = h2, this.scrollBarV.setVisible(h2));
          var d2 = this.scrollTop % this.lineHeight, v2 = Math.ceil(f2 / this.lineHeight) - 1, m2 = Math.max(0, Math.round((this.scrollTop - d2) / this.lineHeight)), g2 = m2 + v2, y2, b, w = this.lineHeight;
          m2 = e2.screenToDocumentRow(m2, 0);
          var E = e2.getFoldLine(m2);
          E && (m2 = E.start.row), y2 = e2.documentToScreenRow(m2, 0), b = e2.getRowLength(m2) * w, g2 = Math.min(e2.screenToDocumentRow(g2, 0), e2.getLength() - 1), f2 = t2.scrollerHeight + e2.getRowLength(g2) * w + b, d2 = this.scrollTop - y2 * w;
          var S = 0;
          if (this.layerConfig.width != s2 || u2)
            S = this.CHANGE_H_SCROLL;
          if (u2 || p2)
            S |= this.$updateCachedSize(true, this.gutterWidth, t2.width, t2.height), this._signal("scrollbarVisibilityChanged"), p2 && (s2 = this.$getLongestLine());
          return this.layerConfig = { width: s2, padding: this.$padding, firstRow: m2, firstRowScreen: y2, lastRow: g2, lineHeight: w, characterWidth: this.characterWidth, minHeight: f2, maxHeight: i2, offset: d2, gutterOffset: w ? Math.max(0, Math.ceil((d2 + t2.height - t2.scrollerHeight) / w)) : 0, height: this.$size.scrollerHeight }, this.session.$bidiHandler && this.session.$bidiHandler.setContentWidth(s2 - this.$padding), S;
        }, this.$updateLines = function() {
          if (!this.$changedLines)
            return;
          var e2 = this.$changedLines.firstRow, t2 = this.$changedLines.lastRow;
          this.$changedLines = null;
          var n2 = this.layerConfig;
          if (e2 > n2.lastRow + 1)
            return;
          if (t2 < n2.firstRow)
            return;
          if (t2 === Infinity) {
            this.$showGutter && this.$gutterLayer.update(n2), this.$textLayer.update(n2);
            return;
          }
          return this.$textLayer.updateLines(n2, e2, t2), true;
        }, this.$getLongestLine = function() {
          var e2 = this.session.getScreenWidth();
          return this.showInvisibles && !this.session.$useWrapMode && (e2 += 1), this.$textLayer && e2 > this.$textLayer.MAX_LINE_LENGTH && (e2 = this.$textLayer.MAX_LINE_LENGTH + 30), Math.max(this.$size.scrollerWidth - 2 * this.$padding, Math.round(e2 * this.characterWidth));
        }, this.updateFrontMarkers = function() {
          this.$markerFront.setMarkers(this.session.getMarkers(true)), this.$loop.schedule(this.CHANGE_MARKER_FRONT);
        }, this.updateBackMarkers = function() {
          this.$markerBack.setMarkers(this.session.getMarkers()), this.$loop.schedule(this.CHANGE_MARKER_BACK);
        }, this.addGutterDecoration = function(e2, t2) {
          this.$gutterLayer.addGutterDecoration(e2, t2);
        }, this.removeGutterDecoration = function(e2, t2) {
          this.$gutterLayer.removeGutterDecoration(e2, t2);
        }, this.updateBreakpoints = function(e2) {
          this.$loop.schedule(this.CHANGE_GUTTER);
        }, this.setAnnotations = function(e2) {
          this.$gutterLayer.setAnnotations(e2), this.$loop.schedule(this.CHANGE_GUTTER);
        }, this.updateCursor = function() {
          this.$loop.schedule(this.CHANGE_CURSOR);
        }, this.hideCursor = function() {
          this.$cursorLayer.hideCursor();
        }, this.showCursor = function() {
          this.$cursorLayer.showCursor();
        }, this.scrollSelectionIntoView = function(e2, t2, n2) {
          this.scrollCursorIntoView(e2, n2), this.scrollCursorIntoView(t2, n2);
        }, this.scrollCursorIntoView = function(e2, t2, n2) {
          if (this.$size.scrollerHeight === 0)
            return;
          var r2 = this.$cursorLayer.getPixelPosition(e2), i2 = r2.left, s2 = r2.top, o2 = n2 && n2.top || 0, u2 = n2 && n2.bottom || 0, a2 = this.$scrollAnimation ? this.session.getScrollTop() : this.scrollTop;
          a2 + o2 > s2 ? (t2 && a2 + o2 > s2 + this.lineHeight && (s2 -= t2 * this.$size.scrollerHeight), s2 === 0 && (s2 = -this.scrollMargin.top), this.session.setScrollTop(s2)) : a2 + this.$size.scrollerHeight - u2 < s2 + this.lineHeight && (t2 && a2 + this.$size.scrollerHeight - u2 < s2 - this.lineHeight && (s2 += t2 * this.$size.scrollerHeight), this.session.setScrollTop(s2 + this.lineHeight + u2 - this.$size.scrollerHeight));
          var f2 = this.scrollLeft;
          f2 > i2 ? (i2 < this.$padding + 2 * this.layerConfig.characterWidth && (i2 = -this.scrollMargin.left), this.session.setScrollLeft(i2)) : f2 + this.$size.scrollerWidth < i2 + this.characterWidth ? this.session.setScrollLeft(Math.round(i2 + this.characterWidth - this.$size.scrollerWidth)) : f2 <= this.$padding && i2 - f2 < this.characterWidth && this.session.setScrollLeft(0);
        }, this.getScrollTop = function() {
          return this.session.getScrollTop();
        }, this.getScrollLeft = function() {
          return this.session.getScrollLeft();
        }, this.getScrollTopRow = function() {
          return this.scrollTop / this.lineHeight;
        }, this.getScrollBottomRow = function() {
          return Math.max(0, Math.floor((this.scrollTop + this.$size.scrollerHeight) / this.lineHeight) - 1);
        }, this.scrollToRow = function(e2) {
          this.session.setScrollTop(e2 * this.lineHeight);
        }, this.alignCursor = function(e2, t2) {
          typeof e2 == "number" && (e2 = { row: e2, column: 0 });
          var n2 = this.$cursorLayer.getPixelPosition(e2), r2 = this.$size.scrollerHeight - this.lineHeight, i2 = n2.top - r2 * (t2 || 0);
          return this.session.setScrollTop(i2), i2;
        }, this.STEPS = 8, this.$calcSteps = function(e2, t2) {
          var n2 = 0, r2 = this.STEPS, i2 = [], s2 = function(e3, t3, n3) {
            return n3 * (Math.pow(e3 - 1, 3) + 1) + t3;
          };
          for (n2 = 0; n2 < r2; ++n2)
            i2.push(s2(n2 / this.STEPS, e2, t2 - e2));
          return i2;
        }, this.scrollToLine = function(e2, t2, n2, r2) {
          var i2 = this.$cursorLayer.getPixelPosition({ row: e2, column: 0 }), s2 = i2.top;
          t2 && (s2 -= this.$size.scrollerHeight / 2);
          var o2 = this.scrollTop;
          this.session.setScrollTop(s2), n2 !== false && this.animateScrolling(o2, r2);
        }, this.animateScrolling = function(e2, t2) {
          var n2 = this.scrollTop;
          if (!this.$animatedScroll)
            return;
          var r2 = this;
          if (e2 == n2)
            return;
          if (this.$scrollAnimation) {
            var i2 = this.$scrollAnimation.steps;
            if (i2.length) {
              e2 = i2[0];
              if (e2 == n2)
                return;
            }
          }
          var s2 = r2.$calcSteps(e2, n2);
          this.$scrollAnimation = { from: e2, to: n2, steps: s2 }, clearInterval(this.$timer), r2.session.setScrollTop(s2.shift()), r2.session.$scrollTop = n2, this.$timer = setInterval(function() {
            if (!r2.session)
              return clearInterval(r2.$timer);
            s2.length ? (r2.session.setScrollTop(s2.shift()), r2.session.$scrollTop = n2) : n2 != null ? (r2.session.$scrollTop = -1, r2.session.setScrollTop(n2), n2 = null) : (r2.$timer = clearInterval(r2.$timer), r2.$scrollAnimation = null, t2 && t2());
          }, 10);
        }, this.scrollToY = function(e2) {
          this.scrollTop !== e2 && (this.$loop.schedule(this.CHANGE_SCROLL), this.scrollTop = e2);
        }, this.scrollToX = function(e2) {
          this.scrollLeft !== e2 && (this.scrollLeft = e2), this.$loop.schedule(this.CHANGE_H_SCROLL);
        }, this.scrollTo = function(e2, t2) {
          this.session.setScrollTop(t2), this.session.setScrollLeft(e2);
        }, this.scrollBy = function(e2, t2) {
          t2 && this.session.setScrollTop(this.session.getScrollTop() + t2), e2 && this.session.setScrollLeft(this.session.getScrollLeft() + e2);
        }, this.isScrollableBy = function(e2, t2) {
          if (t2 < 0 && this.session.getScrollTop() >= 1 - this.scrollMargin.top)
            return true;
          if (t2 > 0 && this.session.getScrollTop() + this.$size.scrollerHeight - this.layerConfig.maxHeight < -1 + this.scrollMargin.bottom)
            return true;
          if (e2 < 0 && this.session.getScrollLeft() >= 1 - this.scrollMargin.left)
            return true;
          if (e2 > 0 && this.session.getScrollLeft() + this.$size.scrollerWidth - this.layerConfig.width < -1 + this.scrollMargin.right)
            return true;
        }, this.pixelToScreenCoordinates = function(e2, t2) {
          var n2;
          if (this.$hasCssTransforms) {
            n2 = { top: 0, left: 0 };
            var r2 = this.$fontMetrics.transformCoordinates([e2, t2]);
            e2 = r2[1] - this.gutterWidth - this.margin.left, t2 = r2[0];
          } else
            n2 = this.scroller.getBoundingClientRect();
          var i2 = e2 + this.scrollLeft - n2.left - this.$padding, s2 = i2 / this.characterWidth, o2 = Math.floor((t2 + this.scrollTop - n2.top) / this.lineHeight), u2 = this.$blockCursor ? Math.floor(s2) : Math.round(s2);
          return { row: o2, column: u2, side: s2 - u2 > 0 ? 1 : -1, offsetX: i2 };
        }, this.screenToTextCoordinates = function(e2, t2) {
          var n2;
          if (this.$hasCssTransforms) {
            n2 = { top: 0, left: 0 };
            var r2 = this.$fontMetrics.transformCoordinates([e2, t2]);
            e2 = r2[1] - this.gutterWidth - this.margin.left, t2 = r2[0];
          } else
            n2 = this.scroller.getBoundingClientRect();
          var i2 = e2 + this.scrollLeft - n2.left - this.$padding, s2 = i2 / this.characterWidth, o2 = this.$blockCursor ? Math.floor(s2) : Math.round(s2), u2 = Math.floor((t2 + this.scrollTop - n2.top) / this.lineHeight);
          return this.session.screenToDocumentPosition(u2, Math.max(o2, 0), i2);
        }, this.textToScreenCoordinates = function(e2, t2) {
          var n2 = this.scroller.getBoundingClientRect(), r2 = this.session.documentToScreenPosition(e2, t2), i2 = this.$padding + (this.session.$bidiHandler.isBidiRow(r2.row, e2) ? this.session.$bidiHandler.getPosLeft(r2.column) : Math.round(r2.column * this.characterWidth)), s2 = r2.row * this.lineHeight;
          return { pageX: n2.left + i2 - this.scrollLeft, pageY: n2.top + s2 - this.scrollTop };
        }, this.visualizeFocus = function() {
          i.addCssClass(this.container, "ace_focus");
        }, this.visualizeBlur = function() {
          i.removeCssClass(this.container, "ace_focus");
        }, this.showComposition = function(e2) {
          this.$composition = e2, e2.cssText || (e2.cssText = this.textarea.style.cssText), e2.useTextareaForIME == void 0 && (e2.useTextareaForIME = this.$useTextareaForIME), this.$useTextareaForIME ? (i.addCssClass(this.textarea, "ace_composition"), this.textarea.style.cssText = "", this.$moveTextAreaToCursor(), this.$cursorLayer.element.style.display = "none") : e2.markerId = this.session.addMarker(e2.markerRange, "ace_composition_marker", "text");
        }, this.setCompositionText = function(e2) {
          var t2 = this.session.selection.cursor;
          this.addToken(e2, "composition_placeholder", t2.row, t2.column), this.$moveTextAreaToCursor();
        }, this.hideComposition = function() {
          if (!this.$composition)
            return;
          this.$composition.markerId && this.session.removeMarker(this.$composition.markerId), i.removeCssClass(this.textarea, "ace_composition"), this.textarea.style.cssText = this.$composition.cssText;
          var e2 = this.session.selection.cursor;
          this.removeExtraToken(e2.row, e2.column), this.$composition = null, this.$cursorLayer.element.style.display = "";
        }, this.addToken = function(e2, t2, n2, r2) {
          var i2 = this.session;
          i2.bgTokenizer.lines[n2] = null;
          var s2 = { type: t2, value: e2 }, o2 = i2.getTokens(n2);
          if (r2 == null)
            o2.push(s2);
          else {
            var u2 = 0;
            for (var a2 = 0; a2 < o2.length; a2++) {
              var f2 = o2[a2];
              u2 += f2.value.length;
              if (r2 <= u2) {
                var l2 = f2.value.length - (u2 - r2), c2 = f2.value.slice(0, l2), h2 = f2.value.slice(l2);
                o2.splice(a2, 1, { type: f2.type, value: c2 }, s2, { type: f2.type, value: h2 });
                break;
              }
            }
          }
          this.updateLines(n2, n2);
        }, this.removeExtraToken = function(e2, t2) {
          this.updateLines(e2, e2);
        }, this.setTheme = function(e2, t2) {
          function o2(r3) {
            if (n2.$themeId != e2)
              return t2 && t2();
            if (!r3 || !r3.cssClass)
              throw new Error("couldn't load module " + e2 + " or it didn't call define");
            r3.$id && (n2.$themeId = r3.$id), i.importCssString(r3.cssText, r3.cssClass, n2.container), n2.theme && i.removeCssClass(n2.container, n2.theme.cssClass);
            var s2 = "padding" in r3 ? r3.padding : "padding" in (n2.theme || {}) ? 4 : n2.$padding;
            n2.$padding && s2 != n2.$padding && n2.setPadding(s2), n2.$theme = r3.cssClass, n2.theme = r3, i.addCssClass(n2.container, r3.cssClass), i.setCssClass(n2.container, "ace_dark", r3.isDark), n2.$size && (n2.$size.width = 0, n2.$updateSizeAsync()), n2._dispatchEvent("themeLoaded", { theme: r3 }), t2 && t2();
          }
          var n2 = this;
          this.$themeId = e2, n2._dispatchEvent("themeChange", { theme: e2 });
          if (!e2 || typeof e2 == "string") {
            var r2 = e2 || this.$options.theme.initialValue;
            s.loadModule(["theme", r2], o2);
          } else
            o2(e2);
        }, this.getTheme = function() {
          return this.$themeId;
        }, this.setStyle = function(e2, t2) {
          i.setCssClass(this.container, e2, t2 !== false);
        }, this.unsetStyle = function(e2) {
          i.removeCssClass(this.container, e2);
        }, this.setCursorStyle = function(e2) {
          i.setStyle(this.scroller.style, "cursor", e2);
        }, this.setMouseCursor = function(e2) {
          i.setStyle(this.scroller.style, "cursor", e2);
        }, this.attachToShadowRoot = function() {
          i.importCssString(v, "ace_editor.css", this.container);
        }, this.destroy = function() {
          this.freeze(), this.$fontMetrics.destroy(), this.$cursorLayer.destroy(), this.removeAllListeners(), this.container.textContent = "";
        };
      }).call(y.prototype), s.defineOptions(y.prototype, "renderer", { animatedScroll: { initialValue: false }, showInvisibles: { set: function(e2) {
        this.$textLayer.setShowInvisibles(e2) && this.$loop.schedule(this.CHANGE_TEXT);
      }, initialValue: false }, showPrintMargin: { set: function() {
        this.$updatePrintMargin();
      }, initialValue: true }, printMarginColumn: { set: function() {
        this.$updatePrintMargin();
      }, initialValue: 80 }, printMargin: { set: function(e2) {
        typeof e2 == "number" && (this.$printMarginColumn = e2), this.$showPrintMargin = !!e2, this.$updatePrintMargin();
      }, get: function() {
        return this.$showPrintMargin && this.$printMarginColumn;
      } }, showGutter: { set: function(e2) {
        this.$gutter.style.display = e2 ? "block" : "none", this.$loop.schedule(this.CHANGE_FULL), this.onGutterResize();
      }, initialValue: true }, fadeFoldWidgets: { set: function(e2) {
        i.setCssClass(this.$gutter, "ace_fade-fold-widgets", e2);
      }, initialValue: false }, showFoldWidgets: { set: function(e2) {
        this.$gutterLayer.setShowFoldWidgets(e2), this.$loop.schedule(this.CHANGE_GUTTER);
      }, initialValue: true }, displayIndentGuides: { set: function(e2) {
        this.$textLayer.setDisplayIndentGuides(e2) && this.$loop.schedule(this.CHANGE_TEXT);
      }, initialValue: true }, highlightGutterLine: { set: function(e2) {
        this.$gutterLayer.setHighlightGutterLine(e2), this.$loop.schedule(this.CHANGE_GUTTER);
      }, initialValue: true }, hScrollBarAlwaysVisible: { set: function(e2) {
        (!this.$hScrollBarAlwaysVisible || !this.$horizScroll) && this.$loop.schedule(this.CHANGE_SCROLL);
      }, initialValue: false }, vScrollBarAlwaysVisible: { set: function(e2) {
        (!this.$vScrollBarAlwaysVisible || !this.$vScroll) && this.$loop.schedule(this.CHANGE_SCROLL);
      }, initialValue: false }, fontSize: { set: function(e2) {
        typeof e2 == "number" && (e2 += "px"), this.container.style.fontSize = e2, this.updateFontSize();
      }, initialValue: 12 }, fontFamily: { set: function(e2) {
        this.container.style.fontFamily = e2, this.updateFontSize();
      } }, maxLines: { set: function(e2) {
        this.updateFull();
      } }, minLines: { set: function(e2) {
        this.$minLines < 562949953421311 || (this.$minLines = 0), this.updateFull();
      } }, maxPixelHeight: { set: function(e2) {
        this.updateFull();
      }, initialValue: 0 }, scrollPastEnd: { set: function(e2) {
        e2 = +e2 || 0;
        if (this.$scrollPastEnd == e2)
          return;
        this.$scrollPastEnd = e2, this.$loop.schedule(this.CHANGE_SCROLL);
      }, initialValue: 0, handlesSet: true }, fixedWidthGutter: { set: function(e2) {
        this.$gutterLayer.$fixedWidth = !!e2, this.$loop.schedule(this.CHANGE_GUTTER);
      } }, theme: { set: function(e2) {
        this.setTheme(e2);
      }, get: function() {
        return this.$themeId || this.theme;
      }, initialValue: "./theme/textmate", handlesSet: true }, hasCssTransforms: {}, useTextareaForIME: { initialValue: !m.isMobile && !m.isIE } }), t.VirtualRenderer = y;
    }), ace.define("ace/worker/worker_client", ["require", "exports", "module", "ace/lib/oop", "ace/lib/net", "ace/lib/event_emitter", "ace/config"], function(e, t, n) {
      "use strict";
      function u(e2) {
        var t2 = "importScripts('" + i.qualifyURL(e2) + "');";
        try {
          return new Blob([t2], { type: "application/javascript" });
        } catch (n2) {
          var r2 = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder, s2 = new r2();
          return s2.append(t2), s2.getBlob("application/javascript");
        }
      }
      function a(e2) {
        if (typeof Worker == "undefined")
          return { postMessage: function() {
          }, terminate: function() {
          } };
        if (o.get("loadWorkerFromBlob")) {
          var t2 = u(e2), n2 = window.URL || window.webkitURL, r2 = n2.createObjectURL(t2);
          return new Worker(r2);
        }
        return new Worker(e2);
      }
      var r = e("../lib/oop"), i = e("../lib/net"), s = e("../lib/event_emitter").EventEmitter, o = e("../config"), f = function(e2) {
        e2.postMessage || (e2 = this.$createWorkerFromOldConfig.apply(this, arguments)), this.$worker = e2, this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this), this.changeListener = this.changeListener.bind(this), this.onMessage = this.onMessage.bind(this), this.callbackId = 1, this.callbacks = {}, this.$worker.onmessage = this.onMessage;
      };
      (function() {
        r.implement(this, s), this.$createWorkerFromOldConfig = function(t2, n2, r2, i2, s2) {
          e.nameToUrl && !e.toUrl && (e.toUrl = e.nameToUrl);
          if (o.get("packaged") || !e.toUrl)
            i2 = i2 || o.moduleUrl(n2, "worker");
          else {
            var u2 = this.$normalizePath;
            i2 = i2 || u2(e.toUrl("ace/worker/worker.js", null, "_"));
            var f2 = {};
            t2.forEach(function(t3) {
              f2[t3] = u2(e.toUrl(t3, null, "_").replace(/(\.js)?(\?.*)?$/, ""));
            });
          }
          return this.$worker = a(i2), s2 && this.send("importScripts", s2), this.$worker.postMessage({ init: true, tlns: f2, module: n2, classname: r2 }), this.$worker;
        }, this.onMessage = function(e2) {
          var t2 = e2.data;
          switch (t2.type) {
            case "event":
              this._signal(t2.name, { data: t2.data });
              break;
            case "call":
              var n2 = this.callbacks[t2.id];
              n2 && (n2(t2.data), delete this.callbacks[t2.id]);
              break;
            case "error":
              this.reportError(t2.data);
              break;
            case "log":
              window.console && console.log && console.log.apply(console, t2.data);
          }
        }, this.reportError = function(e2) {
          window.console && console.error && console.error(e2);
        }, this.$normalizePath = function(e2) {
          return i.qualifyURL(e2);
        }, this.terminate = function() {
          this._signal("terminate", {}), this.deltaQueue = null, this.$worker.terminate(), this.$worker = null, this.$doc && this.$doc.off("change", this.changeListener), this.$doc = null;
        }, this.send = function(e2, t2) {
          this.$worker.postMessage({ command: e2, args: t2 });
        }, this.call = function(e2, t2, n2) {
          if (n2) {
            var r2 = this.callbackId++;
            this.callbacks[r2] = n2, t2.push(r2);
          }
          this.send(e2, t2);
        }, this.emit = function(e2, t2) {
          try {
            t2.data && t2.data.err && (t2.data.err = { message: t2.data.err.message, stack: t2.data.err.stack, code: t2.data.err.code }), this.$worker && this.$worker.postMessage({ event: e2, data: { data: t2.data } });
          } catch (n2) {
            console.error(n2.stack);
          }
        }, this.attachToDocument = function(e2) {
          this.$doc && this.terminate(), this.$doc = e2, this.call("setValue", [e2.getValue()]), e2.on("change", this.changeListener, true);
        }, this.changeListener = function(e2) {
          this.deltaQueue || (this.deltaQueue = [], setTimeout(this.$sendDeltaQueue, 0)), e2.action == "insert" ? this.deltaQueue.push(e2.start, e2.lines) : this.deltaQueue.push(e2.start, e2.end);
        }, this.$sendDeltaQueue = function() {
          var e2 = this.deltaQueue;
          if (!e2)
            return;
          this.deltaQueue = null, e2.length > 50 && e2.length > this.$doc.getLength() >> 1 ? this.call("setValue", [this.$doc.getValue()]) : this.emit("change", { data: e2 });
        };
      }).call(f.prototype);
      var l = function(e2, t2, n2) {
        var r2 = null, i2 = false, u2 = Object.create(s), a2 = [], l2 = new f({ messageBuffer: a2, terminate: function() {
        }, postMessage: function(e3) {
          a2.push(e3);
          if (!r2)
            return;
          i2 ? setTimeout(c) : c();
        } });
        l2.setEmitSync = function(e3) {
          i2 = e3;
        };
        var c = function() {
          var e3 = a2.shift();
          e3.command ? r2[e3.command].apply(r2, e3.args) : e3.event && u2._signal(e3.event, e3.data);
        };
        return u2.postMessage = function(e3) {
          l2.onMessage({ data: e3 });
        }, u2.callback = function(e3, t3) {
          this.postMessage({ type: "call", id: t3, data: e3 });
        }, u2.emit = function(e3, t3) {
          this.postMessage({ type: "event", name: e3, data: t3 });
        }, o.loadModule(["worker", t2], function(e3) {
          r2 = new e3[n2](u2);
          while (a2.length)
            c();
        }), l2;
      };
      t.UIWorkerClient = l, t.WorkerClient = f, t.createWorker = a;
    }), ace.define("ace/placeholder", ["require", "exports", "module", "ace/range", "ace/lib/event_emitter", "ace/lib/oop"], function(e, t, n) {
      "use strict";
      var r = e("./range").Range, i = e("./lib/event_emitter").EventEmitter, s = e("./lib/oop"), o = function(e2, t2, n2, r2, i2, s2) {
        var o2 = this;
        this.length = t2, this.session = e2, this.doc = e2.getDocument(), this.mainClass = i2, this.othersClass = s2, this.$onUpdate = this.onUpdate.bind(this), this.doc.on("change", this.$onUpdate, true), this.$others = r2, this.$onCursorChange = function() {
          setTimeout(function() {
            o2.onCursorChange();
          });
        }, this.$pos = n2;
        var u = e2.getUndoManager().$undoStack || e2.getUndoManager().$undostack || { length: -1 };
        this.$undoStackDepth = u.length, this.setup(), e2.selection.on("changeCursor", this.$onCursorChange);
      };
      (function() {
        s.implement(this, i), this.setup = function() {
          var e2 = this, t2 = this.doc, n2 = this.session;
          this.selectionBefore = n2.selection.toJSON(), n2.selection.inMultiSelectMode && n2.selection.toSingleRange(), this.pos = t2.createAnchor(this.$pos.row, this.$pos.column);
          var i2 = this.pos;
          i2.$insertRight = true, i2.detach(), i2.markerId = n2.addMarker(new r(i2.row, i2.column, i2.row, i2.column + this.length), this.mainClass, null, false), this.others = [], this.$others.forEach(function(n3) {
            var r2 = t2.createAnchor(n3.row, n3.column);
            r2.$insertRight = true, r2.detach(), e2.others.push(r2);
          }), n2.setUndoSelect(false);
        }, this.showOtherMarkers = function() {
          if (this.othersActive)
            return;
          var e2 = this.session, t2 = this;
          this.othersActive = true, this.others.forEach(function(n2) {
            n2.markerId = e2.addMarker(new r(n2.row, n2.column, n2.row, n2.column + t2.length), t2.othersClass, null, false);
          });
        }, this.hideOtherMarkers = function() {
          if (!this.othersActive)
            return;
          this.othersActive = false;
          for (var e2 = 0; e2 < this.others.length; e2++)
            this.session.removeMarker(this.others[e2].markerId);
        }, this.onUpdate = function(e2) {
          if (this.$updating)
            return this.updateAnchors(e2);
          var t2 = e2;
          if (t2.start.row !== t2.end.row)
            return;
          if (t2.start.row !== this.pos.row)
            return;
          this.$updating = true;
          var n2 = e2.action === "insert" ? t2.end.column - t2.start.column : t2.start.column - t2.end.column, i2 = t2.start.column >= this.pos.column && t2.start.column <= this.pos.column + this.length + 1, s2 = t2.start.column - this.pos.column;
          this.updateAnchors(e2), i2 && (this.length += n2);
          if (i2 && !this.session.$fromUndo) {
            if (e2.action === "insert")
              for (var o2 = this.others.length - 1; o2 >= 0; o2--) {
                var u = this.others[o2], a = { row: u.row, column: u.column + s2 };
                this.doc.insertMergedLines(a, e2.lines);
              }
            else if (e2.action === "remove")
              for (var o2 = this.others.length - 1; o2 >= 0; o2--) {
                var u = this.others[o2], a = { row: u.row, column: u.column + s2 };
                this.doc.remove(new r(a.row, a.column, a.row, a.column - n2));
              }
          }
          this.$updating = false, this.updateMarkers();
        }, this.updateAnchors = function(e2) {
          this.pos.onChange(e2);
          for (var t2 = this.others.length; t2--; )
            this.others[t2].onChange(e2);
          this.updateMarkers();
        }, this.updateMarkers = function() {
          if (this.$updating)
            return;
          var e2 = this, t2 = this.session, n2 = function(n3, i3) {
            t2.removeMarker(n3.markerId), n3.markerId = t2.addMarker(new r(n3.row, n3.column, n3.row, n3.column + e2.length), i3, null, false);
          };
          n2(this.pos, this.mainClass);
          for (var i2 = this.others.length; i2--; )
            n2(this.others[i2], this.othersClass);
        }, this.onCursorChange = function(e2) {
          if (this.$updating || !this.session)
            return;
          var t2 = this.session.selection.getCursor();
          t2.row === this.pos.row && t2.column >= this.pos.column && t2.column <= this.pos.column + this.length ? (this.showOtherMarkers(), this._emit("cursorEnter", e2)) : (this.hideOtherMarkers(), this._emit("cursorLeave", e2));
        }, this.detach = function() {
          this.session.removeMarker(this.pos && this.pos.markerId), this.hideOtherMarkers(), this.doc.off("change", this.$onUpdate), this.session.selection.off("changeCursor", this.$onCursorChange), this.session.setUndoSelect(true), this.session = null;
        }, this.cancel = function() {
          if (this.$undoStackDepth === -1)
            return;
          var e2 = this.session.getUndoManager(), t2 = (e2.$undoStack || e2.$undostack).length - this.$undoStackDepth;
          for (var n2 = 0; n2 < t2; n2++)
            e2.undo(this.session, true);
          this.selectionBefore && this.session.selection.fromJSON(this.selectionBefore);
        };
      }).call(o.prototype), t.PlaceHolder = o;
    }), ace.define("ace/mouse/multi_select_handler", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent"], function(e, t, n) {
      function s(e2, t2) {
        return e2.row == t2.row && e2.column == t2.column;
      }
      function o(e2) {
        var t2 = e2.domEvent, n2 = t2.altKey, o2 = t2.shiftKey, u = t2.ctrlKey, a = e2.getAccelKey(), f = e2.getButton();
        u && i.isMac && (f = t2.button);
        if (e2.editor.inMultiSelectMode && f == 2) {
          e2.editor.textInput.onContextMenu(e2.domEvent);
          return;
        }
        if (!u && !n2 && !a) {
          f === 0 && e2.editor.inMultiSelectMode && e2.editor.exitMultiSelectMode();
          return;
        }
        if (f !== 0)
          return;
        var l = e2.editor, c = l.selection, h = l.inMultiSelectMode, p = e2.getDocumentPosition(), d = c.getCursor(), v = e2.inSelection() || c.isEmpty() && s(p, d), m = e2.x, g = e2.y, y = function(e3) {
          m = e3.clientX, g = e3.clientY;
        }, b = l.session, w = l.renderer.pixelToScreenCoordinates(m, g), E = w, S;
        if (l.$mouseHandler.$enableJumpToDef)
          u && n2 || a && n2 ? S = o2 ? "block" : "add" : n2 && l.$blockSelectEnabled && (S = "block");
        else if (a && !n2) {
          S = "add";
          if (!h && o2)
            return;
        } else
          n2 && l.$blockSelectEnabled && (S = "block");
        S && i.isMac && t2.ctrlKey && l.$mouseHandler.cancelContextMenu();
        if (S == "add") {
          if (!h && v)
            return;
          if (!h) {
            var x = c.toOrientedRange();
            l.addSelectionMarker(x);
          }
          var T = c.rangeList.rangeAtPoint(p);
          l.inVirtualSelectionMode = true, o2 && (T = null, x = c.ranges[0] || x, l.removeSelectionMarker(x)), l.once("mouseup", function() {
            var e3 = c.toOrientedRange();
            T && e3.isEmpty() && s(T.cursor, e3.cursor) ? c.substractPoint(e3.cursor) : (o2 ? c.substractPoint(x.cursor) : x && (l.removeSelectionMarker(x), c.addRange(x)), c.addRange(e3)), l.inVirtualSelectionMode = false;
          });
        } else if (S == "block") {
          e2.stop(), l.inVirtualSelectionMode = true;
          var N, C = [], k = function() {
            var e3 = l.renderer.pixelToScreenCoordinates(m, g), t3 = b.screenToDocumentPosition(e3.row, e3.column, e3.offsetX);
            if (s(E, e3) && s(t3, c.lead))
              return;
            E = e3, l.selection.moveToPosition(t3), l.renderer.scrollCursorIntoView(), l.removeSelectionMarkers(C), C = c.rectangularRangeBlock(E, w), l.$mouseHandler.$clickSelection && C.length == 1 && C[0].isEmpty() && (C[0] = l.$mouseHandler.$clickSelection.clone()), C.forEach(l.addSelectionMarker, l), l.updateSelectionMarkers();
          };
          h && !a ? c.toSingleRange() : !h && a && (N = c.toOrientedRange(), l.addSelectionMarker(N)), o2 ? w = b.documentToScreenPosition(c.lead) : c.moveToPosition(p), E = { row: -1, column: -1 };
          var L = function(e3) {
            k(), clearInterval(O), l.removeSelectionMarkers(C), C.length || (C = [c.toOrientedRange()]), N && (l.removeSelectionMarker(N), c.toSingleRange(N));
            for (var t3 = 0; t3 < C.length; t3++)
              c.addRange(C[t3]);
            l.inVirtualSelectionMode = false, l.$mouseHandler.$clickSelection = null;
          }, A = k;
          r.capture(l.container, y, L);
          var O = setInterval(function() {
            A();
          }, 20);
          return e2.preventDefault();
        }
      }
      var r = e("../lib/event"), i = e("../lib/useragent");
      t.onMouseDown = o;
    }), ace.define("ace/commands/multi_select_commands", ["require", "exports", "module", "ace/keyboard/hash_handler"], function(e, t, n) {
      t.defaultCommands = [{ name: "addCursorAbove", description: "Add cursor above", exec: function(e2) {
        e2.selectMoreLines(-1);
      }, bindKey: { win: "Ctrl-Alt-Up", mac: "Ctrl-Alt-Up" }, scrollIntoView: "cursor", readOnly: true }, { name: "addCursorBelow", description: "Add cursor below", exec: function(e2) {
        e2.selectMoreLines(1);
      }, bindKey: { win: "Ctrl-Alt-Down", mac: "Ctrl-Alt-Down" }, scrollIntoView: "cursor", readOnly: true }, { name: "addCursorAboveSkipCurrent", description: "Add cursor above (skip current)", exec: function(e2) {
        e2.selectMoreLines(-1, true);
      }, bindKey: { win: "Ctrl-Alt-Shift-Up", mac: "Ctrl-Alt-Shift-Up" }, scrollIntoView: "cursor", readOnly: true }, { name: "addCursorBelowSkipCurrent", description: "Add cursor below (skip current)", exec: function(e2) {
        e2.selectMoreLines(1, true);
      }, bindKey: { win: "Ctrl-Alt-Shift-Down", mac: "Ctrl-Alt-Shift-Down" }, scrollIntoView: "cursor", readOnly: true }, { name: "selectMoreBefore", description: "Select more before", exec: function(e2) {
        e2.selectMore(-1);
      }, bindKey: { win: "Ctrl-Alt-Left", mac: "Ctrl-Alt-Left" }, scrollIntoView: "cursor", readOnly: true }, { name: "selectMoreAfter", description: "Select more after", exec: function(e2) {
        e2.selectMore(1);
      }, bindKey: { win: "Ctrl-Alt-Right", mac: "Ctrl-Alt-Right" }, scrollIntoView: "cursor", readOnly: true }, { name: "selectNextBefore", description: "Select next before", exec: function(e2) {
        e2.selectMore(-1, true);
      }, bindKey: { win: "Ctrl-Alt-Shift-Left", mac: "Ctrl-Alt-Shift-Left" }, scrollIntoView: "cursor", readOnly: true }, { name: "selectNextAfter", description: "Select next after", exec: function(e2) {
        e2.selectMore(1, true);
      }, bindKey: { win: "Ctrl-Alt-Shift-Right", mac: "Ctrl-Alt-Shift-Right" }, scrollIntoView: "cursor", readOnly: true }, { name: "toggleSplitSelectionIntoLines", description: "Split into lines", exec: function(e2) {
        e2.multiSelect.rangeCount > 1 ? e2.multiSelect.joinSelections() : e2.multiSelect.splitIntoLines();
      }, bindKey: { win: "Ctrl-Alt-L", mac: "Ctrl-Alt-L" }, readOnly: true }, { name: "splitSelectionIntoLines", description: "Split into lines", exec: function(e2) {
        e2.multiSelect.splitIntoLines();
      }, readOnly: true }, { name: "alignCursors", description: "Align cursors", exec: function(e2) {
        e2.alignCursors();
      }, bindKey: { win: "Ctrl-Alt-A", mac: "Ctrl-Alt-A" }, scrollIntoView: "cursor" }, { name: "findAll", description: "Find all", exec: function(e2) {
        e2.findAll();
      }, bindKey: { win: "Ctrl-Alt-K", mac: "Ctrl-Alt-G" }, scrollIntoView: "cursor", readOnly: true }], t.multiSelectCommands = [{ name: "singleSelection", description: "Single selection", bindKey: "esc", exec: function(e2) {
        e2.exitMultiSelectMode();
      }, scrollIntoView: "cursor", readOnly: true, isAvailable: function(e2) {
        return e2 && e2.inMultiSelectMode;
      } }];
      var r = e("../keyboard/hash_handler").HashHandler;
      t.keyboardHandler = new r(t.multiSelectCommands);
    }), ace.define("ace/multi_select", ["require", "exports", "module", "ace/range_list", "ace/range", "ace/selection", "ace/mouse/multi_select_handler", "ace/lib/event", "ace/lib/lang", "ace/commands/multi_select_commands", "ace/search", "ace/edit_session", "ace/editor", "ace/config"], function(e, t, n) {
      function h(e2, t2, n2) {
        return c.$options.wrap = true, c.$options.needle = t2, c.$options.backwards = n2 == -1, c.find(e2);
      }
      function v(e2, t2) {
        return e2.row == t2.row && e2.column == t2.column;
      }
      function m(e2) {
        if (e2.$multiselectOnSessionChange)
          return;
        e2.$onAddRange = e2.$onAddRange.bind(e2), e2.$onRemoveRange = e2.$onRemoveRange.bind(e2), e2.$onMultiSelect = e2.$onMultiSelect.bind(e2), e2.$onSingleSelect = e2.$onSingleSelect.bind(e2), e2.$multiselectOnSessionChange = t.onSessionChange.bind(e2), e2.$checkMultiselectChange = e2.$checkMultiselectChange.bind(e2), e2.$multiselectOnSessionChange(e2), e2.on("changeSession", e2.$multiselectOnSessionChange), e2.on("mousedown", o), e2.commands.addCommands(f.defaultCommands), g(e2);
      }
      function g(e2) {
        function r2(t3) {
          n2 && (e2.renderer.setMouseCursor(""), n2 = false);
        }
        if (!e2.textInput)
          return;
        var t2 = e2.textInput.getElement(), n2 = false;
        u.addListener(t2, "keydown", function(t3) {
          var i2 = t3.keyCode == 18 && !(t3.ctrlKey || t3.shiftKey || t3.metaKey);
          e2.$blockSelectEnabled && i2 ? n2 || (e2.renderer.setMouseCursor("crosshair"), n2 = true) : n2 && r2();
        }, e2), u.addListener(t2, "keyup", r2, e2), u.addListener(t2, "blur", r2, e2);
      }
      var r = e("./range_list").RangeList, i = e("./range").Range, s = e("./selection").Selection, o = e("./mouse/multi_select_handler").onMouseDown, u = e("./lib/event"), a = e("./lib/lang"), f = e("./commands/multi_select_commands");
      t.commands = f.defaultCommands.concat(f.multiSelectCommands);
      var l = e("./search").Search, c = new l(), p = e("./edit_session").EditSession;
      (function() {
        this.getSelectionMarkers = function() {
          return this.$selectionMarkers;
        };
      }).call(p.prototype), function() {
        this.ranges = null, this.rangeList = null, this.addRange = function(e2, t2) {
          if (!e2)
            return;
          if (!this.inMultiSelectMode && this.rangeCount === 0) {
            var n2 = this.toOrientedRange();
            this.rangeList.add(n2), this.rangeList.add(e2);
            if (this.rangeList.ranges.length != 2)
              return this.rangeList.removeAll(), t2 || this.fromOrientedRange(e2);
            this.rangeList.removeAll(), this.rangeList.add(n2), this.$onAddRange(n2);
          }
          e2.cursor || (e2.cursor = e2.end);
          var r2 = this.rangeList.add(e2);
          return this.$onAddRange(e2), r2.length && this.$onRemoveRange(r2), this.rangeCount > 1 && !this.inMultiSelectMode && (this._signal("multiSelect"), this.inMultiSelectMode = true, this.session.$undoSelect = false, this.rangeList.attach(this.session)), t2 || this.fromOrientedRange(e2);
        }, this.toSingleRange = function(e2) {
          e2 = e2 || this.ranges[0];
          var t2 = this.rangeList.removeAll();
          t2.length && this.$onRemoveRange(t2), e2 && this.fromOrientedRange(e2);
        }, this.substractPoint = function(e2) {
          var t2 = this.rangeList.substractPoint(e2);
          if (t2)
            return this.$onRemoveRange(t2), t2[0];
        }, this.mergeOverlappingRanges = function() {
          var e2 = this.rangeList.merge();
          e2.length && this.$onRemoveRange(e2);
        }, this.$onAddRange = function(e2) {
          this.rangeCount = this.rangeList.ranges.length, this.ranges.unshift(e2), this._signal("addRange", { range: e2 });
        }, this.$onRemoveRange = function(e2) {
          this.rangeCount = this.rangeList.ranges.length;
          if (this.rangeCount == 1 && this.inMultiSelectMode) {
            var t2 = this.rangeList.ranges.pop();
            e2.push(t2), this.rangeCount = 0;
          }
          for (var n2 = e2.length; n2--; ) {
            var r2 = this.ranges.indexOf(e2[n2]);
            this.ranges.splice(r2, 1);
          }
          this._signal("removeRange", { ranges: e2 }), this.rangeCount === 0 && this.inMultiSelectMode && (this.inMultiSelectMode = false, this._signal("singleSelect"), this.session.$undoSelect = true, this.rangeList.detach(this.session)), t2 = t2 || this.ranges[0], t2 && !t2.isEqual(this.getRange()) && this.fromOrientedRange(t2);
        }, this.$initRangeList = function() {
          if (this.rangeList)
            return;
          this.rangeList = new r(), this.ranges = [], this.rangeCount = 0;
        }, this.getAllRanges = function() {
          return this.rangeCount ? this.rangeList.ranges.concat() : [this.getRange()];
        }, this.splitIntoLines = function() {
          var e2 = this.ranges.length ? this.ranges : [this.getRange()], t2 = [];
          for (var n2 = 0; n2 < e2.length; n2++) {
            var r2 = e2[n2], s2 = r2.start.row, o2 = r2.end.row;
            if (s2 === o2)
              t2.push(r2.clone());
            else {
              t2.push(new i(s2, r2.start.column, s2, this.session.getLine(s2).length));
              while (++s2 < o2)
                t2.push(this.getLineRange(s2, true));
              t2.push(new i(o2, 0, o2, r2.end.column));
            }
            n2 == 0 && !this.isBackwards() && (t2 = t2.reverse());
          }
          this.toSingleRange();
          for (var n2 = t2.length; n2--; )
            this.addRange(t2[n2]);
        }, this.joinSelections = function() {
          var e2 = this.rangeList.ranges, t2 = e2[e2.length - 1], n2 = i.fromPoints(e2[0].start, t2.end);
          this.toSingleRange(), this.setSelectionRange(n2, t2.cursor == t2.start);
        }, this.toggleBlockSelection = function() {
          if (this.rangeCount > 1) {
            var e2 = this.rangeList.ranges, t2 = e2[e2.length - 1], n2 = i.fromPoints(e2[0].start, t2.end);
            this.toSingleRange(), this.setSelectionRange(n2, t2.cursor == t2.start);
          } else {
            var r2 = this.session.documentToScreenPosition(this.cursor), s2 = this.session.documentToScreenPosition(this.anchor), o2 = this.rectangularRangeBlock(r2, s2);
            o2.forEach(this.addRange, this);
          }
        }, this.rectangularRangeBlock = function(e2, t2, n2) {
          var r2 = [], s2 = e2.column < t2.column;
          if (s2)
            var o2 = e2.column, u2 = t2.column, a2 = e2.offsetX, f2 = t2.offsetX;
          else
            var o2 = t2.column, u2 = e2.column, a2 = t2.offsetX, f2 = e2.offsetX;
          var l2 = e2.row < t2.row;
          if (l2)
            var c2 = e2.row, h2 = t2.row;
          else
            var c2 = t2.row, h2 = e2.row;
          o2 < 0 && (o2 = 0), c2 < 0 && (c2 = 0), c2 == h2 && (n2 = true);
          var p2;
          for (var d2 = c2; d2 <= h2; d2++) {
            var m2 = i.fromPoints(this.session.screenToDocumentPosition(d2, o2, a2), this.session.screenToDocumentPosition(d2, u2, f2));
            if (m2.isEmpty()) {
              if (p2 && v(m2.end, p2))
                break;
              p2 = m2.end;
            }
            m2.cursor = s2 ? m2.start : m2.end, r2.push(m2);
          }
          l2 && r2.reverse();
          if (!n2) {
            var g2 = r2.length - 1;
            while (r2[g2].isEmpty() && g2 > 0)
              g2--;
            if (g2 > 0) {
              var y = 0;
              while (r2[y].isEmpty())
                y++;
            }
            for (var b = g2; b >= y; b--)
              r2[b].isEmpty() && r2.splice(b, 1);
          }
          return r2;
        };
      }.call(s.prototype);
      var d = e("./editor").Editor;
      (function() {
        this.updateSelectionMarkers = function() {
          this.renderer.updateCursor(), this.renderer.updateBackMarkers();
        }, this.addSelectionMarker = function(e2) {
          e2.cursor || (e2.cursor = e2.end);
          var t2 = this.getSelectionStyle();
          return e2.marker = this.session.addMarker(e2, "ace_selection", t2), this.session.$selectionMarkers.push(e2), this.session.selectionMarkerCount = this.session.$selectionMarkers.length, e2;
        }, this.removeSelectionMarker = function(e2) {
          if (!e2.marker)
            return;
          this.session.removeMarker(e2.marker);
          var t2 = this.session.$selectionMarkers.indexOf(e2);
          t2 != -1 && this.session.$selectionMarkers.splice(t2, 1), this.session.selectionMarkerCount = this.session.$selectionMarkers.length;
        }, this.removeSelectionMarkers = function(e2) {
          var t2 = this.session.$selectionMarkers;
          for (var n2 = e2.length; n2--; ) {
            var r2 = e2[n2];
            if (!r2.marker)
              continue;
            this.session.removeMarker(r2.marker);
            var i2 = t2.indexOf(r2);
            i2 != -1 && t2.splice(i2, 1);
          }
          this.session.selectionMarkerCount = t2.length;
        }, this.$onAddRange = function(e2) {
          this.addSelectionMarker(e2.range), this.renderer.updateCursor(), this.renderer.updateBackMarkers();
        }, this.$onRemoveRange = function(e2) {
          this.removeSelectionMarkers(e2.ranges), this.renderer.updateCursor(), this.renderer.updateBackMarkers();
        }, this.$onMultiSelect = function(e2) {
          if (this.inMultiSelectMode)
            return;
          this.inMultiSelectMode = true, this.setStyle("ace_multiselect"), this.keyBinding.addKeyboardHandler(f.keyboardHandler), this.commands.setDefaultHandler("exec", this.$onMultiSelectExec), this.renderer.updateCursor(), this.renderer.updateBackMarkers();
        }, this.$onSingleSelect = function(e2) {
          if (this.session.multiSelect.inVirtualMode)
            return;
          this.inMultiSelectMode = false, this.unsetStyle("ace_multiselect"), this.keyBinding.removeKeyboardHandler(f.keyboardHandler), this.commands.removeDefaultHandler("exec", this.$onMultiSelectExec), this.renderer.updateCursor(), this.renderer.updateBackMarkers(), this._emit("changeSelection");
        }, this.$onMultiSelectExec = function(e2) {
          var t2 = e2.command, n2 = e2.editor;
          if (!n2.multiSelect)
            return;
          if (!t2.multiSelectAction) {
            var r2 = t2.exec(n2, e2.args || {});
            n2.multiSelect.addRange(n2.multiSelect.toOrientedRange()), n2.multiSelect.mergeOverlappingRanges();
          } else
            t2.multiSelectAction == "forEach" ? r2 = n2.forEachSelection(t2, e2.args) : t2.multiSelectAction == "forEachLine" ? r2 = n2.forEachSelection(t2, e2.args, true) : t2.multiSelectAction == "single" ? (n2.exitMultiSelectMode(), r2 = t2.exec(n2, e2.args || {})) : r2 = t2.multiSelectAction(n2, e2.args || {});
          return r2;
        }, this.forEachSelection = function(e2, t2, n2) {
          if (this.inVirtualSelectionMode)
            return;
          var r2 = n2 && n2.keepOrder, i2 = n2 == 1 || n2 && n2.$byLines, o2 = this.session, u2 = this.selection, a2 = u2.rangeList, f2 = (r2 ? u2 : a2).ranges, l2;
          if (!f2.length)
            return e2.exec ? e2.exec(this, t2 || {}) : e2(this, t2 || {});
          var c2 = u2._eventRegistry;
          u2._eventRegistry = {};
          var h2 = new s(o2);
          this.inVirtualSelectionMode = true;
          for (var p2 = f2.length; p2--; ) {
            if (i2)
              while (p2 > 0 && f2[p2].start.row == f2[p2 - 1].end.row)
                p2--;
            h2.fromOrientedRange(f2[p2]), h2.index = p2, this.selection = o2.selection = h2;
            var d2 = e2.exec ? e2.exec(this, t2 || {}) : e2(this, t2 || {});
            !l2 && d2 !== void 0 && (l2 = d2), h2.toOrientedRange(f2[p2]);
          }
          h2.detach(), this.selection = o2.selection = u2, this.inVirtualSelectionMode = false, u2._eventRegistry = c2, u2.mergeOverlappingRanges(), u2.ranges[0] && u2.fromOrientedRange(u2.ranges[0]);
          var v2 = this.renderer.$scrollAnimation;
          return this.onCursorChange(), this.onSelectionChange(), v2 && v2.from == v2.to && this.renderer.animateScrolling(v2.from), l2;
        }, this.exitMultiSelectMode = function() {
          if (!this.inMultiSelectMode || this.inVirtualSelectionMode)
            return;
          this.multiSelect.toSingleRange();
        }, this.getSelectedText = function() {
          var e2 = "";
          if (this.inMultiSelectMode && !this.inVirtualSelectionMode) {
            var t2 = this.multiSelect.rangeList.ranges, n2 = [];
            for (var r2 = 0; r2 < t2.length; r2++)
              n2.push(this.session.getTextRange(t2[r2]));
            var i2 = this.session.getDocument().getNewLineCharacter();
            e2 = n2.join(i2), e2.length == (n2.length - 1) * i2.length && (e2 = "");
          } else
            this.selection.isEmpty() || (e2 = this.session.getTextRange(this.getSelectionRange()));
          return e2;
        }, this.$checkMultiselectChange = function(e2, t2) {
          if (this.inMultiSelectMode && !this.inVirtualSelectionMode) {
            var n2 = this.multiSelect.ranges[0];
            if (this.multiSelect.isEmpty() && t2 == this.multiSelect.anchor)
              return;
            var r2 = t2 == this.multiSelect.anchor ? n2.cursor == n2.start ? n2.end : n2.start : n2.cursor;
            r2.row != t2.row || this.session.$clipPositionToDocument(r2.row, r2.column).column != t2.column ? this.multiSelect.toSingleRange(this.multiSelect.toOrientedRange()) : this.multiSelect.mergeOverlappingRanges();
          }
        }, this.findAll = function(e2, t2, n2) {
          t2 = t2 || {}, t2.needle = e2 || t2.needle;
          if (t2.needle == void 0) {
            var r2 = this.selection.isEmpty() ? this.selection.getWordRange() : this.selection.getRange();
            t2.needle = this.session.getTextRange(r2);
          }
          this.$search.set(t2);
          var i2 = this.$search.findAll(this.session);
          if (!i2.length)
            return 0;
          var s2 = this.multiSelect;
          n2 || s2.toSingleRange(i2[0]);
          for (var o2 = i2.length; o2--; )
            s2.addRange(i2[o2], true);
          return r2 && s2.rangeList.rangeAtPoint(r2.start) && s2.addRange(r2, true), i2.length;
        }, this.selectMoreLines = function(e2, t2) {
          var n2 = this.selection.toOrientedRange(), r2 = n2.cursor == n2.end, s2 = this.session.documentToScreenPosition(n2.cursor);
          this.selection.$desiredColumn && (s2.column = this.selection.$desiredColumn);
          var o2 = this.session.screenToDocumentPosition(s2.row + e2, s2.column);
          if (!n2.isEmpty())
            var u2 = this.session.documentToScreenPosition(r2 ? n2.end : n2.start), a2 = this.session.screenToDocumentPosition(u2.row + e2, u2.column);
          else
            var a2 = o2;
          if (r2) {
            var f2 = i.fromPoints(o2, a2);
            f2.cursor = f2.start;
          } else {
            var f2 = i.fromPoints(a2, o2);
            f2.cursor = f2.end;
          }
          f2.desiredColumn = s2.column;
          if (!this.selection.inMultiSelectMode)
            this.selection.addRange(n2);
          else if (t2)
            var l2 = n2.cursor;
          this.selection.addRange(f2), l2 && this.selection.substractPoint(l2);
        }, this.transposeSelections = function(e2) {
          var t2 = this.session, n2 = t2.multiSelect, r2 = n2.ranges;
          for (var i2 = r2.length; i2--; ) {
            var s2 = r2[i2];
            if (s2.isEmpty()) {
              var o2 = t2.getWordRange(s2.start.row, s2.start.column);
              s2.start.row = o2.start.row, s2.start.column = o2.start.column, s2.end.row = o2.end.row, s2.end.column = o2.end.column;
            }
          }
          n2.mergeOverlappingRanges();
          var u2 = [];
          for (var i2 = r2.length; i2--; ) {
            var s2 = r2[i2];
            u2.unshift(t2.getTextRange(s2));
          }
          e2 < 0 ? u2.unshift(u2.pop()) : u2.push(u2.shift());
          for (var i2 = r2.length; i2--; ) {
            var s2 = r2[i2], o2 = s2.clone();
            t2.replace(s2, u2[i2]), s2.start.row = o2.start.row, s2.start.column = o2.start.column;
          }
          n2.fromOrientedRange(n2.ranges[0]);
        }, this.selectMore = function(e2, t2, n2) {
          var r2 = this.session, i2 = r2.multiSelect, s2 = i2.toOrientedRange();
          if (s2.isEmpty()) {
            s2 = r2.getWordRange(s2.start.row, s2.start.column), s2.cursor = e2 == -1 ? s2.start : s2.end, this.multiSelect.addRange(s2);
            if (n2)
              return;
          }
          var o2 = r2.getTextRange(s2), u2 = h(r2, o2, e2);
          u2 && (u2.cursor = e2 == -1 ? u2.start : u2.end, this.session.unfold(u2), this.multiSelect.addRange(u2), this.renderer.scrollCursorIntoView(null, 0.5)), t2 && this.multiSelect.substractPoint(s2.cursor);
        }, this.alignCursors = function() {
          var e2 = this.session, t2 = e2.multiSelect, n2 = t2.ranges, r2 = -1, s2 = n2.filter(function(e3) {
            if (e3.cursor.row == r2)
              return true;
            r2 = e3.cursor.row;
          });
          if (!n2.length || s2.length == n2.length - 1) {
            var o2 = this.selection.getRange(), u2 = o2.start.row, f2 = o2.end.row, l2 = u2 == f2;
            if (l2) {
              var c2 = this.session.getLength(), h2;
              do
                h2 = this.session.getLine(f2);
              while (/[=:]/.test(h2) && ++f2 < c2);
              do
                h2 = this.session.getLine(u2);
              while (/[=:]/.test(h2) && --u2 > 0);
              u2 < 0 && (u2 = 0), f2 >= c2 && (f2 = c2 - 1);
            }
            var p2 = this.session.removeFullLines(u2, f2);
            p2 = this.$reAlignText(p2, l2), this.session.insert({ row: u2, column: 0 }, p2.join("\n") + "\n"), l2 || (o2.start.column = 0, o2.end.column = p2[p2.length - 1].length), this.selection.setRange(o2);
          } else {
            s2.forEach(function(e3) {
              t2.substractPoint(e3.cursor);
            });
            var d2 = 0, v2 = Infinity, m2 = n2.map(function(t3) {
              var n3 = t3.cursor, r3 = e2.getLine(n3.row), i2 = r3.substr(n3.column).search(/\S/g);
              return i2 == -1 && (i2 = 0), n3.column > d2 && (d2 = n3.column), i2 < v2 && (v2 = i2), i2;
            });
            n2.forEach(function(t3, n3) {
              var r3 = t3.cursor, s3 = d2 - r3.column, o3 = m2[n3] - v2;
              s3 > o3 ? e2.insert(r3, a.stringRepeat(" ", s3 - o3)) : e2.remove(new i(r3.row, r3.column, r3.row, r3.column - s3 + o3)), t3.start.column = t3.end.column = d2, t3.start.row = t3.end.row = r3.row, t3.cursor = t3.end;
            }), t2.fromOrientedRange(n2[0]), this.renderer.updateCursor(), this.renderer.updateBackMarkers();
          }
        }, this.$reAlignText = function(e2, t2) {
          function u2(e3) {
            return a.stringRepeat(" ", e3);
          }
          function f2(e3) {
            return e3[2] ? u2(i2) + e3[2] + u2(s2 - e3[2].length + o2) + e3[4].replace(/^([=:])\s+/, "$1 ") : e3[0];
          }
          function l2(e3) {
            return e3[2] ? u2(i2 + s2 - e3[2].length) + e3[2] + u2(o2) + e3[4].replace(/^([=:])\s+/, "$1 ") : e3[0];
          }
          function c2(e3) {
            return e3[2] ? u2(i2) + e3[2] + u2(o2) + e3[4].replace(/^([=:])\s+/, "$1 ") : e3[0];
          }
          var n2 = true, r2 = true, i2, s2, o2;
          return e2.map(function(e3) {
            var t3 = e3.match(/(\s*)(.*?)(\s*)([=:].*)/);
            return t3 ? i2 == null ? (i2 = t3[1].length, s2 = t3[2].length, o2 = t3[3].length, t3) : (i2 + s2 + o2 != t3[1].length + t3[2].length + t3[3].length && (r2 = false), i2 != t3[1].length && (n2 = false), i2 > t3[1].length && (i2 = t3[1].length), s2 < t3[2].length && (s2 = t3[2].length), o2 > t3[3].length && (o2 = t3[3].length), t3) : [e3];
          }).map(t2 ? f2 : n2 ? r2 ? l2 : f2 : c2);
        };
      }).call(d.prototype), t.onSessionChange = function(e2) {
        var t2 = e2.session;
        t2 && !t2.multiSelect && (t2.$selectionMarkers = [], t2.selection.$initRangeList(), t2.multiSelect = t2.selection), this.multiSelect = t2 && t2.multiSelect;
        var n2 = e2.oldSession;
        n2 && (n2.multiSelect.off("addRange", this.$onAddRange), n2.multiSelect.off("removeRange", this.$onRemoveRange), n2.multiSelect.off("multiSelect", this.$onMultiSelect), n2.multiSelect.off("singleSelect", this.$onSingleSelect), n2.multiSelect.lead.off("change", this.$checkMultiselectChange), n2.multiSelect.anchor.off("change", this.$checkMultiselectChange)), t2 && (t2.multiSelect.on("addRange", this.$onAddRange), t2.multiSelect.on("removeRange", this.$onRemoveRange), t2.multiSelect.on("multiSelect", this.$onMultiSelect), t2.multiSelect.on("singleSelect", this.$onSingleSelect), t2.multiSelect.lead.on("change", this.$checkMultiselectChange), t2.multiSelect.anchor.on("change", this.$checkMultiselectChange)), t2 && this.inMultiSelectMode != t2.selection.inMultiSelectMode && (t2.selection.inMultiSelectMode ? this.$onMultiSelect() : this.$onSingleSelect());
      }, t.MultiSelect = m, e("./config").defineOptions(d.prototype, "editor", { enableMultiselect: { set: function(e2) {
        m(this), e2 ? (this.on("changeSession", this.$multiselectOnSessionChange), this.on("mousedown", o)) : (this.off("changeSession", this.$multiselectOnSessionChange), this.off("mousedown", o));
      }, value: true }, enableBlockSelect: { set: function(e2) {
        this.$blockSelectEnabled = e2;
      }, value: true } });
    }), ace.define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function(e, t, n) {
      "use strict";
      var r = e("../../range").Range, i = t.FoldMode = function() {
      };
      (function() {
        this.foldingStartMarker = null, this.foldingStopMarker = null, this.getFoldWidget = function(e2, t2, n2) {
          var r2 = e2.getLine(n2);
          return this.foldingStartMarker.test(r2) ? "start" : t2 == "markbeginend" && this.foldingStopMarker && this.foldingStopMarker.test(r2) ? "end" : "";
        }, this.getFoldWidgetRange = function(e2, t2, n2) {
          return null;
        }, this.indentationBlock = function(e2, t2, n2) {
          var i2 = /\S/, s = e2.getLine(t2), o = s.search(i2);
          if (o == -1)
            return;
          var u = n2 || s.length, a = e2.getLength(), f = t2, l = t2;
          while (++t2 < a) {
            var c = e2.getLine(t2).search(i2);
            if (c == -1)
              continue;
            if (c <= o) {
              var h = e2.getTokenAt(t2, 0);
              if (!h || h.type !== "string")
                break;
            }
            l = t2;
          }
          if (l > f) {
            var p = e2.getLine(l).length;
            return new r(f, u, l, p);
          }
        }, this.openingBracketBlock = function(e2, t2, n2, i2, s) {
          var o = { row: n2, column: i2 + 1 }, u = e2.$findClosingBracket(t2, o, s);
          if (!u)
            return;
          var a = e2.foldWidgets[u.row];
          return a == null && (a = e2.getFoldWidget(u.row)), a == "start" && u.row > o.row && (u.row--, u.column = e2.getLine(u.row).length), r.fromPoints(o, u);
        }, this.closingBracketBlock = function(e2, t2, n2, i2, s) {
          var o = { row: n2, column: i2 }, u = e2.$findOpeningBracket(t2, o);
          if (!u)
            return;
          return u.column++, o.column--, r.fromPoints(u, o);
        };
      }).call(i.prototype);
    }), ace.define("ace/line_widgets", ["require", "exports", "module", "ace/lib/dom"], function(e, t, n) {
      "use strict";
      function i(e2) {
        this.session = e2, this.session.widgetManager = this, this.session.getRowLength = this.getRowLength, this.session.$getWidgetScreenLength = this.$getWidgetScreenLength, this.updateOnChange = this.updateOnChange.bind(this), this.renderWidgets = this.renderWidgets.bind(this), this.measureWidgets = this.measureWidgets.bind(this), this.session._changedWidgets = [], this.$onChangeEditor = this.$onChangeEditor.bind(this), this.session.on("change", this.updateOnChange), this.session.on("changeFold", this.updateOnFold), this.session.on("changeEditor", this.$onChangeEditor);
      }
      var r = e("./lib/dom");
      (function() {
        this.getRowLength = function(e2) {
          var t2;
          return this.lineWidgets ? t2 = this.lineWidgets[e2] && this.lineWidgets[e2].rowCount || 0 : t2 = 0, !this.$useWrapMode || !this.$wrapData[e2] ? 1 + t2 : this.$wrapData[e2].length + 1 + t2;
        }, this.$getWidgetScreenLength = function() {
          var e2 = 0;
          return this.lineWidgets.forEach(function(t2) {
            t2 && t2.rowCount && !t2.hidden && (e2 += t2.rowCount);
          }), e2;
        }, this.$onChangeEditor = function(e2) {
          this.attach(e2.editor);
        }, this.attach = function(e2) {
          e2 && e2.widgetManager && e2.widgetManager != this && e2.widgetManager.detach();
          if (this.editor == e2)
            return;
          this.detach(), this.editor = e2, e2 && (e2.widgetManager = this, e2.renderer.on("beforeRender", this.measureWidgets), e2.renderer.on("afterRender", this.renderWidgets));
        }, this.detach = function(e2) {
          var t2 = this.editor;
          if (!t2)
            return;
          this.editor = null, t2.widgetManager = null, t2.renderer.off("beforeRender", this.measureWidgets), t2.renderer.off("afterRender", this.renderWidgets);
          var n2 = this.session.lineWidgets;
          n2 && n2.forEach(function(e3) {
            e3 && e3.el && e3.el.parentNode && (e3._inDocument = false, e3.el.parentNode.removeChild(e3.el));
          });
        }, this.updateOnFold = function(e2, t2) {
          var n2 = t2.lineWidgets;
          if (!n2 || !e2.action)
            return;
          var r2 = e2.data, i2 = r2.start.row, s = r2.end.row, o = e2.action == "add";
          for (var u = i2 + 1; u < s; u++)
            n2[u] && (n2[u].hidden = o);
          n2[s] && (o ? n2[i2] ? n2[s].hidden = o : n2[i2] = n2[s] : (n2[i2] == n2[s] && (n2[i2] = void 0), n2[s].hidden = o));
        }, this.updateOnChange = function(e2) {
          var t2 = this.session.lineWidgets;
          if (!t2)
            return;
          var n2 = e2.start.row, r2 = e2.end.row - n2;
          if (r2 !== 0)
            if (e2.action == "remove") {
              var i2 = t2.splice(n2 + 1, r2);
              !t2[n2] && i2[i2.length - 1] && (t2[n2] = i2.pop()), i2.forEach(function(e3) {
                e3 && this.removeLineWidget(e3);
              }, this), this.$updateRows();
            } else {
              var s = new Array(r2);
              t2[n2] && t2[n2].column != null && e2.start.column > t2[n2].column && n2++, s.unshift(n2, 0), t2.splice.apply(t2, s), this.$updateRows();
            }
        }, this.$updateRows = function() {
          var e2 = this.session.lineWidgets;
          if (!e2)
            return;
          var t2 = true;
          e2.forEach(function(e3, n2) {
            if (e3) {
              t2 = false, e3.row = n2;
              while (e3.$oldWidget)
                e3.$oldWidget.row = n2, e3 = e3.$oldWidget;
            }
          }), t2 && (this.session.lineWidgets = null);
        }, this.$registerLineWidget = function(e2) {
          this.session.lineWidgets || (this.session.lineWidgets = new Array(this.session.getLength()));
          var t2 = this.session.lineWidgets[e2.row];
          return t2 && (e2.$oldWidget = t2, t2.el && t2.el.parentNode && (t2.el.parentNode.removeChild(t2.el), t2._inDocument = false)), this.session.lineWidgets[e2.row] = e2, e2;
        }, this.addLineWidget = function(e2) {
          this.$registerLineWidget(e2), e2.session = this.session;
          if (!this.editor)
            return e2;
          var t2 = this.editor.renderer;
          e2.html && !e2.el && (e2.el = r.createElement("div"), e2.el.innerHTML = e2.html), e2.el && (r.addCssClass(e2.el, "ace_lineWidgetContainer"), e2.el.style.position = "absolute", e2.el.style.zIndex = 5, t2.container.appendChild(e2.el), e2._inDocument = true, e2.coverGutter || (e2.el.style.zIndex = 3), e2.pixelHeight == null && (e2.pixelHeight = e2.el.offsetHeight)), e2.rowCount == null && (e2.rowCount = e2.pixelHeight / t2.layerConfig.lineHeight);
          var n2 = this.session.getFoldAt(e2.row, 0);
          e2.$fold = n2;
          if (n2) {
            var i2 = this.session.lineWidgets;
            e2.row == n2.end.row && !i2[n2.start.row] ? i2[n2.start.row] = e2 : e2.hidden = true;
          }
          return this.session._emit("changeFold", { data: { start: { row: e2.row } } }), this.$updateRows(), this.renderWidgets(null, t2), this.onWidgetChanged(e2), e2;
        }, this.removeLineWidget = function(e2) {
          e2._inDocument = false, e2.session = null, e2.el && e2.el.parentNode && e2.el.parentNode.removeChild(e2.el);
          if (e2.editor && e2.editor.destroy)
            try {
              e2.editor.destroy();
            } catch (t2) {
            }
          if (this.session.lineWidgets) {
            var n2 = this.session.lineWidgets[e2.row];
            if (n2 == e2)
              this.session.lineWidgets[e2.row] = e2.$oldWidget, e2.$oldWidget && this.onWidgetChanged(e2.$oldWidget);
            else
              while (n2) {
                if (n2.$oldWidget == e2) {
                  n2.$oldWidget = e2.$oldWidget;
                  break;
                }
                n2 = n2.$oldWidget;
              }
          }
          this.session._emit("changeFold", { data: { start: { row: e2.row } } }), this.$updateRows();
        }, this.getWidgetsAtRow = function(e2) {
          var t2 = this.session.lineWidgets, n2 = t2 && t2[e2], r2 = [];
          while (n2)
            r2.push(n2), n2 = n2.$oldWidget;
          return r2;
        }, this.onWidgetChanged = function(e2) {
          this.session._changedWidgets.push(e2), this.editor && this.editor.renderer.updateFull();
        }, this.measureWidgets = function(e2, t2) {
          var n2 = this.session._changedWidgets, r2 = t2.layerConfig;
          if (!n2 || !n2.length)
            return;
          var i2 = Infinity;
          for (var s = 0; s < n2.length; s++) {
            var o = n2[s];
            if (!o || !o.el)
              continue;
            if (o.session != this.session)
              continue;
            if (!o._inDocument) {
              if (this.session.lineWidgets[o.row] != o)
                continue;
              o._inDocument = true, t2.container.appendChild(o.el);
            }
            o.h = o.el.offsetHeight, o.fixedWidth || (o.w = o.el.offsetWidth, o.screenWidth = Math.ceil(o.w / r2.characterWidth));
            var u = o.h / r2.lineHeight;
            o.coverLine && (u -= this.session.getRowLineCount(o.row), u < 0 && (u = 0)), o.rowCount != u && (o.rowCount = u, o.row < i2 && (i2 = o.row));
          }
          i2 != Infinity && (this.session._emit("changeFold", { data: { start: { row: i2 } } }), this.session.lineWidgetWidth = null), this.session._changedWidgets = [];
        }, this.renderWidgets = function(e2, t2) {
          var n2 = t2.layerConfig, r2 = this.session.lineWidgets;
          if (!r2)
            return;
          var i2 = Math.min(this.firstRow, n2.firstRow), s = Math.max(this.lastRow, n2.lastRow, r2.length);
          while (i2 > 0 && !r2[i2])
            i2--;
          this.firstRow = n2.firstRow, this.lastRow = n2.lastRow, t2.$cursorLayer.config = n2;
          for (var o = i2; o <= s; o++) {
            var u = r2[o];
            if (!u || !u.el)
              continue;
            if (u.hidden) {
              u.el.style.top = -100 - (u.pixelHeight || 0) + "px";
              continue;
            }
            u._inDocument || (u._inDocument = true, t2.container.appendChild(u.el));
            var a = t2.$cursorLayer.getPixelPosition({ row: o, column: 0 }, true).top;
            u.coverLine || (a += n2.lineHeight * this.session.getRowLineCount(u.row)), u.el.style.top = a - n2.offset + "px";
            var f = u.coverGutter ? 0 : t2.gutterWidth;
            u.fixedWidth || (f -= t2.scrollLeft), u.el.style.left = f + "px", u.fullWidth && u.screenWidth && (u.el.style.minWidth = n2.width + 2 * n2.padding + "px"), u.fixedWidth ? u.el.style.right = t2.scrollBar.getWidth() + "px" : u.el.style.right = "";
          }
        };
      }).call(i.prototype), t.LineWidgets = i;
    }), ace.define("ace/ext/error_marker", ["require", "exports", "module", "ace/line_widgets", "ace/lib/dom", "ace/range"], function(e, t, n) {
      "use strict";
      function o(e2, t2, n2) {
        var r2 = 0, i2 = e2.length - 1;
        while (r2 <= i2) {
          var s2 = r2 + i2 >> 1, o2 = n2(t2, e2[s2]);
          if (o2 > 0)
            r2 = s2 + 1;
          else {
            if (!(o2 < 0))
              return s2;
            i2 = s2 - 1;
          }
        }
        return -(r2 + 1);
      }
      function u(e2, t2, n2) {
        var r2 = e2.getAnnotations().sort(s.comparePoints);
        if (!r2.length)
          return;
        var i2 = o(r2, { row: t2, column: -1 }, s.comparePoints);
        i2 < 0 && (i2 = -i2 - 1), i2 >= r2.length ? i2 = n2 > 0 ? 0 : r2.length - 1 : i2 === 0 && n2 < 0 && (i2 = r2.length - 1);
        var u2 = r2[i2];
        if (!u2 || !n2)
          return;
        if (u2.row === t2) {
          do
            u2 = r2[i2 += n2];
          while (u2 && u2.row === t2);
          if (!u2)
            return r2.slice();
        }
        var a = [];
        t2 = u2.row;
        do
          a[n2 < 0 ? "unshift" : "push"](u2), u2 = r2[i2 += n2];
        while (u2 && u2.row == t2);
        return a.length && a;
      }
      var r = e("../line_widgets").LineWidgets, i = e("../lib/dom"), s = e("../range").Range;
      t.showErrorMarker = function(e2, t2) {
        var n2 = e2.session;
        n2.widgetManager || (n2.widgetManager = new r(n2), n2.widgetManager.attach(e2));
        var s2 = e2.getCursorPosition(), o2 = s2.row, a = n2.widgetManager.getWidgetsAtRow(o2).filter(function(e3) {
          return e3.type == "errorMarker";
        })[0];
        a ? a.destroy() : o2 -= t2;
        var f = u(n2, o2, t2), l;
        if (f) {
          var c = f[0];
          s2.column = (c.pos && typeof c.column != "number" ? c.pos.sc : c.column) || 0, s2.row = c.row, l = e2.renderer.$gutterLayer.$annotations[s2.row];
        } else {
          if (a)
            return;
          l = { text: ["Looks good!"], className: "ace_ok" };
        }
        e2.session.unfold(s2.row), e2.selection.moveToPosition(s2);
        var h = { row: s2.row, fixedWidth: true, coverGutter: true, el: i.createElement("div"), type: "errorMarker" }, p = h.el.appendChild(i.createElement("div")), d = h.el.appendChild(i.createElement("div"));
        d.className = "error_widget_arrow " + l.className;
        var v = e2.renderer.$cursorLayer.getPixelPosition(s2).left;
        d.style.left = v + e2.renderer.gutterWidth - 5 + "px", h.el.className = "error_widget_wrapper", p.className = "error_widget " + l.className, p.innerHTML = l.text.join("<br>"), p.appendChild(i.createElement("div"));
        var m = function(e3, t3, n3) {
          if (t3 === 0 && (n3 === "esc" || n3 === "return"))
            return h.destroy(), { command: "null" };
        };
        h.destroy = function() {
          if (e2.$mouseHandler.isMousePressed)
            return;
          e2.keyBinding.removeKeyboardHandler(m), n2.widgetManager.removeLineWidget(h), e2.off("changeSelection", h.destroy), e2.off("changeSession", h.destroy), e2.off("mouseup", h.destroy), e2.off("change", h.destroy);
        }, e2.keyBinding.addKeyboardHandler(m), e2.on("changeSelection", h.destroy), e2.on("changeSession", h.destroy), e2.on("mouseup", h.destroy), e2.on("change", h.destroy), e2.session.widgetManager.addLineWidget(h), h.el.onmousedown = e2.focus.bind(e2), e2.renderer.scrollCursorIntoView(null, 0.5, { bottom: h.el.offsetHeight });
      }, i.importCssString("    .error_widget_wrapper {        background: inherit;        color: inherit;        border:none    }    .error_widget {        border-top: solid 2px;        border-bottom: solid 2px;        margin: 5px 0;        padding: 10px 40px;        white-space: pre-wrap;    }    .error_widget.ace_error, .error_widget_arrow.ace_error{        border-color: #ff5a5a    }    .error_widget.ace_warning, .error_widget_arrow.ace_warning{        border-color: #F1D817    }    .error_widget.ace_info, .error_widget_arrow.ace_info{        border-color: #5a5a5a    }    .error_widget.ace_ok, .error_widget_arrow.ace_ok{        border-color: #5aaa5a    }    .error_widget_arrow {        position: absolute;        border: solid 5px;        border-top-color: transparent!important;        border-right-color: transparent!important;        border-left-color: transparent!important;        top: -5px;    }", "error_marker.css", false);
    }), ace.define("ace/ace", ["require", "exports", "module", "ace/lib/dom", "ace/lib/event", "ace/range", "ace/editor", "ace/edit_session", "ace/undomanager", "ace/virtual_renderer", "ace/worker/worker_client", "ace/keyboard/hash_handler", "ace/placeholder", "ace/multi_select", "ace/mode/folding/fold_mode", "ace/theme/textmate", "ace/ext/error_marker", "ace/config", "ace/loader_build"], function(e, t, n) {
      "use strict";
      e("./loader_build")(t);
      var r = e("./lib/dom"), i = e("./lib/event"), s = e("./range").Range, o = e("./editor").Editor, u = e("./edit_session").EditSession, a = e("./undomanager").UndoManager, f = e("./virtual_renderer").VirtualRenderer;
      e("./worker/worker_client"), e("./keyboard/hash_handler"), e("./placeholder"), e("./multi_select"), e("./mode/folding/fold_mode"), e("./theme/textmate"), e("./ext/error_marker"), t.config = e("./config"), t.edit = function(e2, n2) {
        if (typeof e2 == "string") {
          var s2 = e2;
          e2 = document.getElementById(s2);
          if (!e2)
            throw new Error("ace.edit can't find div #" + s2);
        }
        if (e2 && e2.env && e2.env.editor instanceof o)
          return e2.env.editor;
        var u2 = "";
        if (e2 && /input|textarea/i.test(e2.tagName)) {
          var a2 = e2;
          u2 = a2.value, e2 = r.createElement("pre"), a2.parentNode.replaceChild(e2, a2);
        } else
          e2 && (u2 = e2.textContent, e2.innerHTML = "");
        var l = t.createEditSession(u2), c = new o(new f(e2), l, n2), h = { document: l, editor: c, onResize: c.resize.bind(c, null) };
        return a2 && (h.textarea = a2), i.addListener(window, "resize", h.onResize), c.on("destroy", function() {
          i.removeListener(window, "resize", h.onResize), h.editor.container.env = null;
        }), c.container.env = c.env = h, c;
      }, t.createEditSession = function(e2, t2) {
        var n2 = new u(e2, t2);
        return n2.setUndoManager(new a()), n2;
      }, t.Range = s, t.Editor = o, t.EditSession = u, t.UndoManager = a, t.VirtualRenderer = f, t.version = t.config.version;
    });
    (function() {
      ace.require(["ace/ace"], function(a) {
        if (a) {
          a.config.init(true);
          a.define = ace.define;
        }
        if (!window.ace)
          window.ace = a;
        for (var key in a)
          if (a.hasOwnProperty(key))
            window.ace[key] = a[key];
        window.ace["default"] = window.ace;
        if (typeof module == "object" && typeof exports == "object" && module) {
          module.exports = window.ace;
        }
      });
    })();
  }
});

// ../../node_modules/ace-builds/src-min-noconflict/theme-monokai.js
var require_theme_monokai = __commonJS({
  "../../node_modules/ace-builds/src-min-noconflict/theme-monokai.js"(exports, module) {
    init_define_process();
    ace.define("ace/theme/monokai", ["require", "exports", "module", "ace/lib/dom"], function(e, t, n) {
      t.isDark = true, t.cssClass = "ace-monokai", t.cssText = ".ace-monokai .ace_gutter {background: #2F3129;color: #8F908A}.ace-monokai .ace_print-margin {width: 1px;background: #555651}.ace-monokai {background-color: #272822;color: #F8F8F2}.ace-monokai .ace_cursor {color: #F8F8F0}.ace-monokai .ace_marker-layer .ace_selection {background: #49483E}.ace-monokai.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px #272822;}.ace-monokai .ace_marker-layer .ace_step {background: rgb(102, 82, 0)}.ace-monokai .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid #49483E}.ace-monokai .ace_marker-layer .ace_active-line {background: #202020}.ace-monokai .ace_gutter-active-line {background-color: #272727}.ace-monokai .ace_marker-layer .ace_selected-word {border: 1px solid #49483E}.ace-monokai .ace_invisible {color: #52524d}.ace-monokai .ace_entity.ace_name.ace_tag,.ace-monokai .ace_keyword,.ace-monokai .ace_meta.ace_tag,.ace-monokai .ace_storage {color: #F92672}.ace-monokai .ace_punctuation,.ace-monokai .ace_punctuation.ace_tag {color: #fff}.ace-monokai .ace_constant.ace_character,.ace-monokai .ace_constant.ace_language,.ace-monokai .ace_constant.ace_numeric,.ace-monokai .ace_constant.ace_other {color: #AE81FF}.ace-monokai .ace_invalid {color: #F8F8F0;background-color: #F92672}.ace-monokai .ace_invalid.ace_deprecated {color: #F8F8F0;background-color: #AE81FF}.ace-monokai .ace_support.ace_constant,.ace-monokai .ace_support.ace_function {color: #66D9EF}.ace-monokai .ace_fold {background-color: #A6E22E;border-color: #F8F8F2}.ace-monokai .ace_storage.ace_type,.ace-monokai .ace_support.ace_class,.ace-monokai .ace_support.ace_type {font-style: italic;color: #66D9EF}.ace-monokai .ace_entity.ace_name.ace_function,.ace-monokai .ace_entity.ace_other,.ace-monokai .ace_entity.ace_other.ace_attribute-name,.ace-monokai .ace_variable {color: #A6E22E}.ace-monokai .ace_variable.ace_parameter {font-style: italic;color: #FD971F}.ace-monokai .ace_string {color: #E6DB74}.ace-monokai .ace_comment {color: #75715E}.ace-monokai .ace_indent-guide {background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ0FD0ZXBzd/wPAAjVAoxeSgNeAAAAAElFTkSuQmCC) right repeat-y}";
      var r = e("../lib/dom");
      r.importCssString(t.cssText, t.cssClass, false);
    });
    (function() {
      ace.require(["ace/theme/monokai"], function(m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
          module.exports = m;
        }
      });
    })();
  }
});

// ../../node_modules/ace-builds/src-min-noconflict/mode-typescript.js
var require_mode_typescript = __commonJS({
  "../../node_modules/ace-builds/src-min-noconflict/mode-typescript.js"(exports, module) {
    init_define_process();
    ace.define("ace/mode/doc_comment_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(e, t, n) {
      "use strict";
      var r = e("../lib/oop"), i = e("./text_highlight_rules").TextHighlightRules, s = function() {
        this.$rules = { start: [{ token: "comment.doc.tag", regex: "@[\\w\\d_]+" }, s.getTagRule(), { defaultToken: "comment.doc", caseInsensitive: true }] };
      };
      r.inherits(s, i), s.getTagRule = function(e2) {
        return { token: "comment.doc.tag.storage.type", regex: "\\b(?:TODO|FIXME|XXX|HACK)\\b" };
      }, s.getStartRule = function(e2) {
        return { token: "comment.doc", regex: "\\/\\*(?=\\*)", next: e2 };
      }, s.getEndRule = function(e2) {
        return { token: "comment.doc", regex: "\\*\\/", next: e2 };
      }, t.DocCommentHighlightRules = s;
    }), ace.define("ace/mode/javascript_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/doc_comment_highlight_rules", "ace/mode/text_highlight_rules"], function(e, t, n) {
      "use strict";
      function a() {
        var e2 = o.replace("\\d", "\\d\\-"), t2 = { onMatch: function(e3, t3, n3) {
          var r2 = e3.charAt(1) == "/" ? 2 : 1;
          if (r2 == 1)
            t3 != this.nextState ? n3.unshift(this.next, this.nextState, 0) : n3.unshift(this.next), n3[2]++;
          else if (r2 == 2 && t3 == this.nextState) {
            n3[1]--;
            if (!n3[1] || n3[1] < 0)
              n3.shift(), n3.shift();
          }
          return [{ type: "meta.tag.punctuation." + (r2 == 1 ? "" : "end-") + "tag-open.xml", value: e3.slice(0, r2) }, { type: "meta.tag.tag-name.xml", value: e3.substr(r2) }];
        }, regex: "</?" + e2, next: "jsxAttributes", nextState: "jsx" };
        this.$rules.start.unshift(t2);
        var n2 = { regex: "{", token: "paren.quasi.start", push: "start" };
        this.$rules.jsx = [n2, t2, { include: "reference" }, { defaultToken: "string" }], this.$rules.jsxAttributes = [{ token: "meta.tag.punctuation.tag-close.xml", regex: "/?>", onMatch: function(e3, t3, n3) {
          return t3 == n3[0] && n3.shift(), e3.length == 2 && (n3[0] == this.nextState && n3[1]--, (!n3[1] || n3[1] < 0) && n3.splice(0, 2)), this.next = n3[0] || "start", [{ type: this.token, value: e3 }];
        }, nextState: "jsx" }, n2, f("jsxAttributes"), { token: "entity.other.attribute-name.xml", regex: e2 }, { token: "keyword.operator.attribute-equals.xml", regex: "=" }, { token: "text.tag-whitespace.xml", regex: "\\s+" }, { token: "string.attribute-value.xml", regex: "'", stateName: "jsx_attr_q", push: [{ token: "string.attribute-value.xml", regex: "'", next: "pop" }, { include: "reference" }, { defaultToken: "string.attribute-value.xml" }] }, { token: "string.attribute-value.xml", regex: '"', stateName: "jsx_attr_qq", push: [{ token: "string.attribute-value.xml", regex: '"', next: "pop" }, { include: "reference" }, { defaultToken: "string.attribute-value.xml" }] }, t2], this.$rules.reference = [{ token: "constant.language.escape.reference.xml", regex: "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)" }];
      }
      function f(e2) {
        return [{ token: "comment", regex: /\/\*/, next: [i.getTagRule(), { token: "comment", regex: "\\*\\/", next: e2 || "pop" }, { defaultToken: "comment", caseInsensitive: true }] }, { token: "comment", regex: "\\/\\/", next: [i.getTagRule(), { token: "comment", regex: "$|^", next: e2 || "pop" }, { defaultToken: "comment", caseInsensitive: true }] }];
      }
      var r = e("../lib/oop"), i = e("./doc_comment_highlight_rules").DocCommentHighlightRules, s = e("./text_highlight_rules").TextHighlightRules, o = "[a-zA-Z\\$_\xA1-\uFFFF][a-zA-Z\\d\\$_\xA1-\uFFFF]*", u = function(e2) {
        var t2 = this.createKeywordMapper({ "variable.language": "Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document", keyword: "const|yield|import|get|set|async|await|break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|of|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|__parent__|__count__|escape|unescape|with|__proto__|class|enum|extends|super|export|implements|private|public|interface|package|protected|static", "storage.type": "const|let|var|function", "constant.language": "null|Infinity|NaN|undefined", "support.function": "alert", "constant.language.boolean": "true|false" }, "identifier"), n2 = "case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void", r2 = "\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|u{[0-9a-fA-F]{1,6}}|[0-2][0-7]{0,2}|3[0-7][0-7]?|[4-7][0-7]?|.)";
        this.$rules = { no_regex: [i.getStartRule("doc-start"), f("no_regex"), { token: "string", regex: "'(?=.)", next: "qstring" }, { token: "string", regex: '"(?=.)', next: "qqstring" }, { token: "constant.numeric", regex: /0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/ }, { token: "constant.numeric", regex: /(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/ }, { token: ["storage.type", "punctuation.operator", "support.function", "punctuation.operator", "entity.name.function", "text", "keyword.operator"], regex: "(" + o + ")(\\.)(prototype)(\\.)(" + o + ")(\\s*)(=)", next: "function_arguments" }, { token: ["storage.type", "punctuation.operator", "entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "paren.lparen"], regex: "(" + o + ")(\\.)(" + o + ")(\\s*)(=)(\\s*)(function)(\\s*)(\\()", next: "function_arguments" }, { token: ["entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "paren.lparen"], regex: "(" + o + ")(\\s*)(=)(\\s*)(function)(\\s*)(\\()", next: "function_arguments" }, { token: ["storage.type", "punctuation.operator", "entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "entity.name.function", "text", "paren.lparen"], regex: "(" + o + ")(\\.)(" + o + ")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()", next: "function_arguments" }, { token: ["storage.type", "text", "entity.name.function", "text", "paren.lparen"], regex: "(function)(\\s+)(" + o + ")(\\s*)(\\()", next: "function_arguments" }, { token: ["entity.name.function", "text", "punctuation.operator", "text", "storage.type", "text", "paren.lparen"], regex: "(" + o + ")(\\s*)(:)(\\s*)(function)(\\s*)(\\()", next: "function_arguments" }, { token: ["text", "text", "storage.type", "text", "paren.lparen"], regex: "(:)(\\s*)(function)(\\s*)(\\()", next: "function_arguments" }, { token: "keyword", regex: `from(?=\\s*('|"))` }, { token: "keyword", regex: "(?:" + n2 + ")\\b", next: "start" }, { token: ["support.constant"], regex: /that\b/ }, { token: ["storage.type", "punctuation.operator", "support.function.firebug"], regex: /(console)(\.)(warn|info|log|error|time|trace|timeEnd|assert)\b/ }, { token: t2, regex: o }, { token: "punctuation.operator", regex: /[.](?![.])/, next: "property" }, { token: "storage.type", regex: /=>/, next: "start" }, { token: "keyword.operator", regex: /--|\+\+|\.{3}|===|==|=|!=|!==|<+=?|>+=?|!|&&|\|\||\?:|[!$%&*+\-~\/^]=?/, next: "start" }, { token: "punctuation.operator", regex: /[?:,;.]/, next: "start" }, { token: "paren.lparen", regex: /[\[({]/, next: "start" }, { token: "paren.rparen", regex: /[\])}]/ }, { token: "comment", regex: /^#!.*$/ }], property: [{ token: "text", regex: "\\s+" }, { token: ["storage.type", "punctuation.operator", "entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "entity.name.function", "text", "paren.lparen"], regex: "(" + o + ")(\\.)(" + o + ")(\\s*)(=)(\\s*)(function)(?:(\\s+)(\\w+))?(\\s*)(\\()", next: "function_arguments" }, { token: "punctuation.operator", regex: /[.](?![.])/ }, { token: "support.function", regex: /(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/ }, { token: "support.function.dom", regex: /(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName|ClassName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/ }, { token: "support.constant", regex: /(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/ }, { token: "identifier", regex: o }, { regex: "", token: "empty", next: "no_regex" }], start: [i.getStartRule("doc-start"), f("start"), { token: "string.regexp", regex: "\\/", next: "regex" }, { token: "text", regex: "\\s+|^$", next: "start" }, { token: "empty", regex: "", next: "no_regex" }], regex: [{ token: "regexp.keyword.operator", regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)" }, { token: "string.regexp", regex: "/[sxngimy]*", next: "no_regex" }, { token: "invalid", regex: /\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/ }, { token: "constant.language.escape", regex: /\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/ }, { token: "constant.language.delimiter", regex: /\|/ }, { token: "constant.language.escape", regex: /\[\^?/, next: "regex_character_class" }, { token: "empty", regex: "$", next: "no_regex" }, { defaultToken: "string.regexp" }], regex_character_class: [{ token: "regexp.charclass.keyword.operator", regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)" }, { token: "constant.language.escape", regex: "]", next: "regex" }, { token: "constant.language.escape", regex: "-" }, { token: "empty", regex: "$", next: "no_regex" }, { defaultToken: "string.regexp.charachterclass" }], function_arguments: [{ token: "variable.parameter", regex: o }, { token: "punctuation.operator", regex: "[, ]+" }, { token: "punctuation.operator", regex: "$" }, { token: "empty", regex: "", next: "no_regex" }], qqstring: [{ token: "constant.language.escape", regex: r2 }, { token: "string", regex: "\\\\$", consumeLineEnd: true }, { token: "string", regex: '"|$', next: "no_regex" }, { defaultToken: "string" }], qstring: [{ token: "constant.language.escape", regex: r2 }, { token: "string", regex: "\\\\$", consumeLineEnd: true }, { token: "string", regex: "'|$", next: "no_regex" }, { defaultToken: "string" }] };
        if (!e2 || !e2.noES6)
          this.$rules.no_regex.unshift({ regex: "[{}]", onMatch: function(e3, t3, n3) {
            this.next = e3 == "{" ? this.nextState : "";
            if (e3 == "{" && n3.length)
              n3.unshift("start", t3);
            else if (e3 == "}" && n3.length) {
              n3.shift(), this.next = n3.shift();
              if (this.next.indexOf("string") != -1 || this.next.indexOf("jsx") != -1)
                return "paren.quasi.end";
            }
            return e3 == "{" ? "paren.lparen" : "paren.rparen";
          }, nextState: "start" }, { token: "string.quasi.start", regex: /`/, push: [{ token: "constant.language.escape", regex: r2 }, { token: "paren.quasi.start", regex: /\${/, push: "start" }, { token: "string.quasi.end", regex: /`/, next: "pop" }, { defaultToken: "string.quasi" }] }), (!e2 || e2.jsx != 0) && a.call(this);
        this.embedRules(i, "doc-", [i.getEndRule("no_regex")]), this.normalizeRules();
      };
      r.inherits(u, s), t.JavaScriptHighlightRules = u;
    }), ace.define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function(e, t, n) {
      "use strict";
      var r = e("../range").Range, i = function() {
      };
      (function() {
        this.checkOutdent = function(e2, t2) {
          return /^\s+$/.test(e2) ? /^\s*\}/.test(t2) : false;
        }, this.autoOutdent = function(e2, t2) {
          var n2 = e2.getLine(t2), i2 = n2.match(/^(\s*\})/);
          if (!i2)
            return 0;
          var s = i2[1].length, o = e2.findMatchingBracket({ row: t2, column: s });
          if (!o || o.row == t2)
            return 0;
          var u = this.$getIndent(e2.getLine(o.row));
          e2.replace(new r(t2, 0, t2, s - 1), u);
        }, this.$getIndent = function(e2) {
          return e2.match(/^\s*/)[0];
        };
      }).call(i.prototype), t.MatchingBraceOutdent = i;
    }), ace.define("ace/mode/folding/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], function(e, t, n) {
      "use strict";
      var r = e("../../lib/oop"), i = e("../../range").Range, s = e("./fold_mode").FoldMode, o = t.FoldMode = function(e2) {
        e2 && (this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + e2.start)), this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + e2.end)));
      };
      r.inherits(o, s), function() {
        this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/, this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/, this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/, this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/, this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/, this._getFoldWidgetBase = this.getFoldWidget, this.getFoldWidget = function(e2, t2, n2) {
          var r2 = e2.getLine(n2);
          if (this.singleLineBlockCommentRe.test(r2) && !this.startRegionRe.test(r2) && !this.tripleStarBlockCommentRe.test(r2))
            return "";
          var i2 = this._getFoldWidgetBase(e2, t2, n2);
          return !i2 && this.startRegionRe.test(r2) ? "start" : i2;
        }, this.getFoldWidgetRange = function(e2, t2, n2, r2) {
          var i2 = e2.getLine(n2);
          if (this.startRegionRe.test(i2))
            return this.getCommentRegionBlock(e2, i2, n2);
          var s2 = i2.match(this.foldingStartMarker);
          if (s2) {
            var o2 = s2.index;
            if (s2[1])
              return this.openingBracketBlock(e2, s2[1], n2, o2);
            var u = e2.getCommentFoldRange(n2, o2 + s2[0].length, 1);
            return u && !u.isMultiLine() && (r2 ? u = this.getSectionRange(e2, n2) : t2 != "all" && (u = null)), u;
          }
          if (t2 === "markbegin")
            return;
          var s2 = i2.match(this.foldingStopMarker);
          if (s2) {
            var o2 = s2.index + s2[0].length;
            return s2[1] ? this.closingBracketBlock(e2, s2[1], n2, o2) : e2.getCommentFoldRange(n2, o2, -1);
          }
        }, this.getSectionRange = function(e2, t2) {
          var n2 = e2.getLine(t2), r2 = n2.search(/\S/), s2 = t2, o2 = n2.length;
          t2 += 1;
          var u = t2, a = e2.getLength();
          while (++t2 < a) {
            n2 = e2.getLine(t2);
            var f = n2.search(/\S/);
            if (f === -1)
              continue;
            if (r2 > f)
              break;
            var l = this.getFoldWidgetRange(e2, "all", t2);
            if (l) {
              if (l.start.row <= s2)
                break;
              if (l.isMultiLine())
                t2 = l.end.row;
              else if (r2 == f)
                break;
            }
            u = t2;
          }
          return new i(s2, o2, u, e2.getLine(u).length);
        }, this.getCommentRegionBlock = function(e2, t2, n2) {
          var r2 = t2.search(/\s*$/), s2 = e2.getLength(), o2 = n2, u = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/, a = 1;
          while (++n2 < s2) {
            t2 = e2.getLine(n2);
            var f = u.exec(t2);
            if (!f)
              continue;
            f[1] ? a-- : a++;
            if (!a)
              break;
          }
          var l = n2;
          if (l > o2)
            return new i(o2, r2, l, t2.length);
        };
      }.call(o.prototype);
    }), ace.define("ace/mode/javascript", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/javascript_highlight_rules", "ace/mode/matching_brace_outdent", "ace/worker/worker_client", "ace/mode/behaviour/cstyle", "ace/mode/folding/cstyle"], function(e, t, n) {
      "use strict";
      var r = e("../lib/oop"), i = e("./text").Mode, s = e("./javascript_highlight_rules").JavaScriptHighlightRules, o = e("./matching_brace_outdent").MatchingBraceOutdent, u = e("../worker/worker_client").WorkerClient, a = e("./behaviour/cstyle").CstyleBehaviour, f = e("./folding/cstyle").FoldMode, l = function() {
        this.HighlightRules = s, this.$outdent = new o(), this.$behaviour = new a(), this.foldingRules = new f();
      };
      r.inherits(l, i), function() {
        this.lineCommentStart = "//", this.blockComment = { start: "/*", end: "*/" }, this.$quotes = { '"': '"', "'": "'", "`": "`" }, this.getNextLineIndent = function(e2, t2, n2) {
          var r2 = this.$getIndent(t2), i2 = this.getTokenizer().getLineTokens(t2, e2), s2 = i2.tokens, o2 = i2.state;
          if (s2.length && s2[s2.length - 1].type == "comment")
            return r2;
          if (e2 == "start" || e2 == "no_regex") {
            var u2 = t2.match(/^.*(?:\bcase\b.*:|[\{\(\[])\s*$/);
            u2 && (r2 += n2);
          } else if (e2 == "doc-start") {
            if (o2 == "start" || o2 == "no_regex")
              return "";
            var u2 = t2.match(/^\s*(\/?)\*/);
            u2 && (u2[1] && (r2 += " "), r2 += "* ");
          }
          return r2;
        }, this.checkOutdent = function(e2, t2, n2) {
          return this.$outdent.checkOutdent(t2, n2);
        }, this.autoOutdent = function(e2, t2, n2) {
          this.$outdent.autoOutdent(t2, n2);
        }, this.createWorker = function(e2) {
          var t2 = new u(["ace"], "ace/mode/javascript_worker", "JavaScriptWorker");
          return t2.attachToDocument(e2.getDocument()), t2.on("annotate", function(t3) {
            e2.setAnnotations(t3.data);
          }), t2.on("terminate", function() {
            e2.clearAnnotations();
          }), t2;
        }, this.$id = "ace/mode/javascript", this.snippetFileId = "ace/snippets/javascript";
      }.call(l.prototype), t.Mode = l;
    }), ace.define("ace/mode/typescript_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/javascript_highlight_rules"], function(e, t, n) {
      "use strict";
      var r = e("../lib/oop"), i = e("./javascript_highlight_rules").JavaScriptHighlightRules, s = function(e2) {
        var t2 = [{ token: ["storage.type", "text", "entity.name.function.ts"], regex: "(function)(\\s+)([a-zA-Z0-9$_\xA1-\uFFFF][a-zA-Z0-9d$_\xA1-\uFFFF]*)" }, { token: "keyword", regex: "(?:\\b(constructor|declare|interface|as|AS|public|private|extends|export|super|readonly|module|namespace|abstract|implements)\\b)" }, { token: ["keyword", "storage.type.variable.ts"], regex: "(class|type)(\\s+[a-zA-Z0-9_?.$][\\w?.$]*)" }, { token: "keyword", regex: "\\b(?:super|export|import|keyof|infer)\\b" }, { token: ["storage.type.variable.ts"], regex: "(?:\\b(this\\.|string\\b|bool\\b|boolean\\b|number\\b|true\\b|false\\b|undefined\\b|any\\b|null\\b|(?:unique )?symbol\\b|object\\b|never\\b|enum\\b))" }], n2 = new i({ jsx: (e2 && e2.jsx) == 1 }).getRules();
        n2.no_regex = t2.concat(n2.no_regex), this.$rules = n2;
      };
      r.inherits(s, i), t.TypeScriptHighlightRules = s;
    }), ace.define("ace/mode/typescript", ["require", "exports", "module", "ace/lib/oop", "ace/mode/javascript", "ace/mode/typescript_highlight_rules", "ace/mode/behaviour/cstyle", "ace/mode/folding/cstyle", "ace/mode/matching_brace_outdent"], function(e, t, n) {
      "use strict";
      var r = e("../lib/oop"), i = e("./javascript").Mode, s = e("./typescript_highlight_rules").TypeScriptHighlightRules, o = e("./behaviour/cstyle").CstyleBehaviour, u = e("./folding/cstyle").FoldMode, a = e("./matching_brace_outdent").MatchingBraceOutdent, f = function() {
        this.HighlightRules = s, this.$outdent = new a(), this.$behaviour = new o(), this.foldingRules = new u();
      };
      r.inherits(f, i), function() {
        this.createWorker = function(e2) {
          return null;
        }, this.$id = "ace/mode/typescript";
      }.call(f.prototype), t.Mode = f;
    });
    (function() {
      ace.require(["ace/mode/typescript"], function(m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
          module.exports = m;
        }
      });
    })();
  }
});

// js/startAce.ts
init_define_process();
var import_ace = __toESM(require_ace(), 1);
var import_theme_monokai = __toESM(require_theme_monokai(), 1);
var import_mode_typescript = __toESM(require_mode_typescript(), 1);
async function startAce(code) {
  const editor = (0, import_ace.edit)("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/typescript", () => ({ jsx: true }));
  const mode = editor.session.getMode();
  const js = (0, import_ace.createEditSession)(code, mode);
  editor.setSession(js);
  return editor;
}
export {
  startAce
};

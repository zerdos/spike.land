var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// ooo.js
var require_ooo = __commonJS({
  "ooo.js"(exports, module) {
    (function(f) {
      if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f();
      } else if (typeof define === "function" && define.amd) {
        define([], f);
      } else {
        var g;
        if (typeof window !== "undefined") {
          g = window;
        } else if (typeof global !== "undefined") {
          g = global;
        } else if (typeof self !== "undefined") {
          g = self;
        } else {
          g = this;
        }
        g.ooo = f();
      }
    })(function() {
      var define2, module2, exports2;
      return function() {
        function r(e, n, t) {
          function o(i2, f) {
            if (!n[i2]) {
              if (!e[i2]) {
                var c = "function" == typeof __require && __require;
                if (!f && c)
                  return c(i2, true);
                if (u)
                  return u(i2, true);
                var a = new Error("Cannot find module '" + i2 + "'");
                throw a.code = "MODULE_NOT_FOUND", a;
              }
              var p = n[i2] = { exports: {} };
              e[i2][0].call(p.exports, function(r2) {
                var n2 = e[i2][1][r2];
                return o(n2 || r2);
              }, p, p.exports, r, e, n, t);
            }
            return n[i2].exports;
          }
          for (var u = "function" == typeof __require && __require, i = 0; i < t.length; i++)
            o(t[i]);
          return o;
        }
        return r;
      }()({ 1: [function(require2, module3, exports3) {
        var s = 1e3;
        var m = s * 60;
        var h = m * 60;
        var d = h * 24;
        var w = d * 7;
        var y = d * 365.25;
        module3.exports = function(val, options) {
          options = options || {};
          var type = typeof val;
          if (type === "string" && val.length > 0) {
            return parse(val);
          } else if (type === "number" && isFinite(val)) {
            return options.long ? fmtLong(val) : fmtShort(val);
          }
          throw new Error(
            "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
          );
        };
        function parse(str) {
          str = String(str);
          if (str.length > 100) {
            return;
          }
          var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
            str
          );
          if (!match) {
            return;
          }
          var n = parseFloat(match[1]);
          var type = (match[2] || "ms").toLowerCase();
          switch (type) {
            case "years":
            case "year":
            case "yrs":
            case "yr":
            case "y":
              return n * y;
            case "weeks":
            case "week":
            case "w":
              return n * w;
            case "days":
            case "day":
            case "d":
              return n * d;
            case "hours":
            case "hour":
            case "hrs":
            case "hr":
            case "h":
              return n * h;
            case "minutes":
            case "minute":
            case "mins":
            case "min":
            case "m":
              return n * m;
            case "seconds":
            case "second":
            case "secs":
            case "sec":
            case "s":
              return n * s;
            case "milliseconds":
            case "millisecond":
            case "msecs":
            case "msec":
            case "ms":
              return n;
            default:
              return void 0;
          }
        }
        function fmtShort(ms) {
          var msAbs = Math.abs(ms);
          if (msAbs >= d) {
            return Math.round(ms / d) + "d";
          }
          if (msAbs >= h) {
            return Math.round(ms / h) + "h";
          }
          if (msAbs >= m) {
            return Math.round(ms / m) + "m";
          }
          if (msAbs >= s) {
            return Math.round(ms / s) + "s";
          }
          return ms + "ms";
        }
        function fmtLong(ms) {
          var msAbs = Math.abs(ms);
          if (msAbs >= d) {
            return plural(ms, msAbs, d, "day");
          }
          if (msAbs >= h) {
            return plural(ms, msAbs, h, "hour");
          }
          if (msAbs >= m) {
            return plural(ms, msAbs, m, "minute");
          }
          if (msAbs >= s) {
            return plural(ms, msAbs, s, "second");
          }
          return ms + " ms";
        }
        function plural(ms, msAbs, n, name) {
          var isPlural = msAbs >= n * 1.5;
          return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
        }
      }, {}], 2: [function(require2, module3, exports3) {
        var process = module3.exports = {};
        var cachedSetTimeout;
        var cachedClearTimeout;
        function defaultSetTimout() {
          throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
          throw new Error("clearTimeout has not been defined");
        }
        (function() {
          try {
            if (typeof setTimeout === "function") {
              cachedSetTimeout = setTimeout;
            } else {
              cachedSetTimeout = defaultSetTimout;
            }
          } catch (e) {
            cachedSetTimeout = defaultSetTimout;
          }
          try {
            if (typeof clearTimeout === "function") {
              cachedClearTimeout = clearTimeout;
            } else {
              cachedClearTimeout = defaultClearTimeout;
            }
          } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
          }
        })();
        function runTimeout(fun) {
          if (cachedSetTimeout === setTimeout) {
            return setTimeout(fun, 0);
          }
          if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
          }
          try {
            return cachedSetTimeout(fun, 0);
          } catch (e) {
            try {
              return cachedSetTimeout.call(null, fun, 0);
            } catch (e2) {
              return cachedSetTimeout.call(this, fun, 0);
            }
          }
        }
        function runClearTimeout(marker) {
          if (cachedClearTimeout === clearTimeout) {
            return clearTimeout(marker);
          }
          if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
          }
          try {
            return cachedClearTimeout(marker);
          } catch (e) {
            try {
              return cachedClearTimeout.call(null, marker);
            } catch (e2) {
              return cachedClearTimeout.call(this, marker);
            }
          }
        }
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;
        function cleanUpNextTick() {
          if (!draining || !currentQueue) {
            return;
          }
          draining = false;
          if (currentQueue.length) {
            queue = currentQueue.concat(queue);
          } else {
            queueIndex = -1;
          }
          if (queue.length) {
            drainQueue();
          }
        }
        function drainQueue() {
          if (draining) {
            return;
          }
          var timeout = runTimeout(cleanUpNextTick);
          draining = true;
          var len = queue.length;
          while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
              if (currentQueue) {
                currentQueue[queueIndex].run();
              }
            }
            queueIndex = -1;
            len = queue.length;
          }
          currentQueue = null;
          draining = false;
          runClearTimeout(timeout);
        }
        process.nextTick = function(fun) {
          var args = new Array(arguments.length - 1);
          if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
            }
          }
          queue.push(new Item(fun, args));
          if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
          }
        };
        function Item(fun, array) {
          this.fun = fun;
          this.array = array;
        }
        Item.prototype.run = function() {
          this.fun.apply(null, this.array);
        };
        process.title = "browser";
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = "";
        process.versions = {};
        function noop() {
        }
        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.prependListener = noop;
        process.prependOnceListener = noop;
        process.listeners = function(name) {
          return [];
        };
        process.binding = function(name) {
          throw new Error("process.binding is not supported");
        };
        process.cwd = function() {
          return "/";
        };
        process.chdir = function(dir) {
          throw new Error("process.chdir is not supported");
        };
        process.umask = function() {
          return 0;
        };
      }, {}], 3: [function(require2, module3, exports3) {
        function setup(env) {
          createDebug.debug = createDebug;
          createDebug.default = createDebug;
          createDebug.coerce = coerce;
          createDebug.disable = disable;
          createDebug.enable = enable;
          createDebug.enabled = enabled;
          createDebug.humanize = require2("ms");
          createDebug.destroy = destroy;
          Object.keys(env).forEach((key) => {
            createDebug[key] = env[key];
          });
          createDebug.names = [];
          createDebug.skips = [];
          createDebug.formatters = {};
          function selectColor(namespace) {
            let hash = 0;
            for (let i = 0; i < namespace.length; i++) {
              hash = (hash << 5) - hash + namespace.charCodeAt(i);
              hash |= 0;
            }
            return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
          }
          createDebug.selectColor = selectColor;
          function createDebug(namespace) {
            let prevTime;
            let enableOverride = null;
            let namespacesCache;
            let enabledCache;
            function debug(...args) {
              if (!debug.enabled) {
                return;
              }
              const self2 = debug;
              const curr = Number(new Date());
              const ms = curr - (prevTime || curr);
              self2.diff = ms;
              self2.prev = prevTime;
              self2.curr = curr;
              prevTime = curr;
              args[0] = createDebug.coerce(args[0]);
              if (typeof args[0] !== "string") {
                args.unshift("%O");
              }
              let index = 0;
              args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
                if (match === "%%") {
                  return "%";
                }
                index++;
                const formatter = createDebug.formatters[format];
                if (typeof formatter === "function") {
                  const val = args[index];
                  match = formatter.call(self2, val);
                  args.splice(index, 1);
                  index--;
                }
                return match;
              });
              createDebug.formatArgs.call(self2, args);
              const logFn = self2.log || createDebug.log;
              logFn.apply(self2, args);
            }
            debug.namespace = namespace;
            debug.useColors = createDebug.useColors();
            debug.color = createDebug.selectColor(namespace);
            debug.extend = extend;
            debug.destroy = createDebug.destroy;
            Object.defineProperty(debug, "enabled", {
              enumerable: true,
              configurable: false,
              get: () => {
                if (enableOverride !== null) {
                  return enableOverride;
                }
                if (namespacesCache !== createDebug.namespaces) {
                  namespacesCache = createDebug.namespaces;
                  enabledCache = createDebug.enabled(namespace);
                }
                return enabledCache;
              },
              set: (v) => {
                enableOverride = v;
              }
            });
            if (typeof createDebug.init === "function") {
              createDebug.init(debug);
            }
            return debug;
          }
          function extend(namespace, delimiter) {
            const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
            newDebug.log = this.log;
            return newDebug;
          }
          function enable(namespaces) {
            createDebug.save(namespaces);
            createDebug.namespaces = namespaces;
            createDebug.names = [];
            createDebug.skips = [];
            let i;
            const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
            const len = split.length;
            for (i = 0; i < len; i++) {
              if (!split[i]) {
                continue;
              }
              namespaces = split[i].replace(/\*/g, ".*?");
              if (namespaces[0] === "-") {
                createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
              } else {
                createDebug.names.push(new RegExp("^" + namespaces + "$"));
              }
            }
          }
          function disable() {
            const namespaces = [
              ...createDebug.names.map(toNamespace),
              ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
            ].join(",");
            createDebug.enable("");
            return namespaces;
          }
          function enabled(name) {
            if (name[name.length - 1] === "*") {
              return true;
            }
            let i;
            let len;
            for (i = 0, len = createDebug.skips.length; i < len; i++) {
              if (createDebug.skips[i].test(name)) {
                return false;
              }
            }
            for (i = 0, len = createDebug.names.length; i < len; i++) {
              if (createDebug.names[i].test(name)) {
                return true;
              }
            }
            return false;
          }
          function toNamespace(regexp) {
            return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
          }
          function coerce(val) {
            if (val instanceof Error) {
              return val.stack || val.message;
            }
            return val;
          }
          function destroy() {
            console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
          }
          createDebug.enable(createDebug.load());
          return createDebug;
        }
        module3.exports = setup;
      }, { "ms": 1 }], 4: [function(require2, module3, exports3) {
        (function(process) {
          (function() {
            exports3.formatArgs = formatArgs;
            exports3.save = save;
            exports3.load = load;
            exports3.useColors = useColors;
            exports3.storage = localstorage();
            exports3.destroy = (() => {
              let warned = false;
              return () => {
                if (!warned) {
                  warned = true;
                  console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
                }
              };
            })();
            exports3.colors = [
              "#0000CC",
              "#0000FF",
              "#0033CC",
              "#0033FF",
              "#0066CC",
              "#0066FF",
              "#0099CC",
              "#0099FF",
              "#00CC00",
              "#00CC33",
              "#00CC66",
              "#00CC99",
              "#00CCCC",
              "#00CCFF",
              "#3300CC",
              "#3300FF",
              "#3333CC",
              "#3333FF",
              "#3366CC",
              "#3366FF",
              "#3399CC",
              "#3399FF",
              "#33CC00",
              "#33CC33",
              "#33CC66",
              "#33CC99",
              "#33CCCC",
              "#33CCFF",
              "#6600CC",
              "#6600FF",
              "#6633CC",
              "#6633FF",
              "#66CC00",
              "#66CC33",
              "#9900CC",
              "#9900FF",
              "#9933CC",
              "#9933FF",
              "#99CC00",
              "#99CC33",
              "#CC0000",
              "#CC0033",
              "#CC0066",
              "#CC0099",
              "#CC00CC",
              "#CC00FF",
              "#CC3300",
              "#CC3333",
              "#CC3366",
              "#CC3399",
              "#CC33CC",
              "#CC33FF",
              "#CC6600",
              "#CC6633",
              "#CC9900",
              "#CC9933",
              "#CCCC00",
              "#CCCC33",
              "#FF0000",
              "#FF0033",
              "#FF0066",
              "#FF0099",
              "#FF00CC",
              "#FF00FF",
              "#FF3300",
              "#FF3333",
              "#FF3366",
              "#FF3399",
              "#FF33CC",
              "#FF33FF",
              "#FF6600",
              "#FF6633",
              "#FF9900",
              "#FF9933",
              "#FFCC00",
              "#FFCC33"
            ];
            function useColors() {
              if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
                return true;
              }
              if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
                return false;
              }
              return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
            }
            function formatArgs(args) {
              args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module3.exports.humanize(this.diff);
              if (!this.useColors) {
                return;
              }
              const c = "color: " + this.color;
              args.splice(1, 0, c, "color: inherit");
              let index = 0;
              let lastC = 0;
              args[0].replace(/%[a-zA-Z%]/g, (match) => {
                if (match === "%%") {
                  return;
                }
                index++;
                if (match === "%c") {
                  lastC = index;
                }
              });
              args.splice(lastC, 0, c);
            }
            exports3.log = console.debug || console.log || (() => {
            });
            function save(namespaces) {
              try {
                if (namespaces) {
                  exports3.storage.setItem("debug", namespaces);
                } else {
                  exports3.storage.removeItem("debug");
                }
              } catch (error) {
              }
            }
            function load() {
              let r;
              try {
                r = exports3.storage.getItem("debug");
              } catch (error) {
              }
              if (!r && typeof process !== "undefined" && "env" in process) {
                r = process.env.DEBUG;
              }
              return r;
            }
            function localstorage() {
              try {
                return localStorage;
              } catch (error) {
              }
            }
            module3.exports = require2("./common")(exports3);
            const { formatters } = module3.exports;
            formatters.j = function(v) {
              try {
                return JSON.stringify(v);
              } catch (error) {
                return "[UnexpectedJSONParseError]: " + error.message;
              }
            };
          }).call(this);
        }).call(this, require2("_process"));
      }, { "./common": 3, "_process": 2 }] }, {}, [4])(4);
    });
  }
});
module.exports= require_ooo();

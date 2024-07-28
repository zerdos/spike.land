var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// .wrangler/tmp/bundle-hgBKMG/checked-fetch.js
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
var urls;
var init_checked_fetch = __esm({
  ".wrangler/tmp/bundle-hgBKMG/checked-fetch.js"() {
    "use strict";
    urls = /* @__PURE__ */ new Set();
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        const [request, init] = argArray;
        checkURL(request, init);
        return Reflect.apply(target, thisArg, argArray);
      }
    });
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_checked_fetch();
    init_modules_watch_stub();
  }
});

// ../../node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "../../node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// ../../node_modules/@cloudflare/puppeteer/node_modules/ms/index.js
var require_ms = __commonJS({
  "../../node_modules/@cloudflare/puppeteer/node_modules/ms/index.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
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
  }
});

// ../../node_modules/@cloudflare/puppeteer/node_modules/debug/src/common.js
var require_common = __commonJS({
  "../../node_modules/@cloudflare/puppeteer/node_modules/debug/src/common.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
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
        function debug2(...args) {
          if (!debug2.enabled) {
            return;
          }
          const self = debug2;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
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
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug2.namespace = namespace;
        debug2.useColors = createDebug.useColors();
        debug2.color = createDebug.selectColor(namespace);
        debug2.extend = extend;
        debug2.destroy = createDebug.destroy;
        Object.defineProperty(debug2, "enabled", {
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
          createDebug.init(debug2);
        }
        return debug2;
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
    module.exports = setup;
  }
});

// ../../node_modules/@cloudflare/puppeteer/node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "../../node_modules/@cloudflare/puppeteer/node_modules/debug/src/browser.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
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
      if (typeof navigator !== "undefined" && "Cloudflare-Workers" && "Cloudflare-Workers".toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && "Cloudflare-Workers" && "Cloudflare-Workers".toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && "Cloudflare-Workers" && "Cloudflare-Workers".toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
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
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
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
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// .wrangler/tmp/bundle-hgBKMG/middleware-loader.entry.ts
init_checked_fetch();
init_modules_watch_stub();

// .wrangler/tmp/bundle-hgBKMG/middleware-insertion-facade.js
init_checked_fetch();
init_modules_watch_stub();

// src/index.ts
init_checked_fetch();
init_modules_watch_stub();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/puppeteer-core.js
init_checked_fetch();
init_modules_watch_stub();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Puppeteer.js
init_checked_fetch();
init_modules_watch_stub();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/BrowserConnector.js
init_checked_fetch();
init_modules_watch_stub();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/util.js
init_checked_fetch();
init_modules_watch_stub();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/util/assert.js
init_checked_fetch();
init_modules_watch_stub();
var assert = (value, message) => {
  if (!value) {
    throw new Error(message);
  }
};

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/util/ErrorLike.js
init_checked_fetch();
init_modules_watch_stub();
function isErrorLike(obj) {
  return typeof obj === "object" && obj !== null && "name" in obj && "message" in obj;
}

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Debug.js
init_checked_fetch();
init_modules_watch_stub();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/environment.js
init_checked_fetch();
init_modules_watch_stub();
var isNode = !!(typeof process !== "undefined" && process.version);
var deferredPromiseDebugTimeout = typeof process !== "undefined" && typeof process.env["PUPPETEER_DEFERRED_PROMISE_DEBUG_TIMEOUT"] !== "undefined" ? Number(process.env["PUPPETEER_DEFERRED_PROMISE_DEBUG_TIMEOUT"]) : -1;

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Debug.js
var debugModule = null;
async function importDebug() {
  if (!debugModule) {
    debugModule = (await Promise.resolve().then(() => __toESM(require_browser(), 1))).default;
  }
  return debugModule;
}
var debug = (prefix) => {
  if (isNode) {
    return async (...logArgs) => {
      (await importDebug())(prefix)(logArgs);
    };
  }
  return (...logArgs) => {
    const debugLevel = globalThis.__PUPPETEER_DEBUG;
    if (!debugLevel) {
      return;
    }
    const everythingShouldBeLogged = debugLevel === "*";
    const prefixMatchesDebugLevel = everythingShouldBeLogged || /**
     * If the debug level is `foo*`, that means we match any prefix that
     * starts with `foo`. If the level is `foo`, we match only the prefix
     * `foo`.
     */
    (debugLevel.endsWith("*") ? prefix.startsWith(debugLevel) : prefix === debugLevel);
    if (!prefixMatchesDebugLevel) {
      return;
    }
    console.log(`${prefix}:`, ...logArgs);
  };
};

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/ElementHandle.js
init_checked_fetch();
init_modules_watch_stub();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/JSHandle.js
init_checked_fetch();
init_modules_watch_stub();
var __classPrivateFieldSet = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _JSHandle_disposed;
var _JSHandle_context;
var _JSHandle_remoteObject;
var JSHandle = class {
  /**
   * @internal
   */
  constructor(context, remoteObject) {
    _JSHandle_disposed.set(this, false);
    _JSHandle_context.set(this, void 0);
    _JSHandle_remoteObject.set(this, void 0);
    __classPrivateFieldSet(this, _JSHandle_context, context, "f");
    __classPrivateFieldSet(this, _JSHandle_remoteObject, remoteObject, "f");
  }
  /**
   * @internal
   */
  get client() {
    return __classPrivateFieldGet(this, _JSHandle_context, "f")._client;
  }
  /**
   * @internal
   */
  get disposed() {
    return __classPrivateFieldGet(this, _JSHandle_disposed, "f");
  }
  /**
   * @internal
   */
  executionContext() {
    return __classPrivateFieldGet(this, _JSHandle_context, "f");
  }
  /**
   * Evaluates the given function with the current handle as its first argument.
   *
   * @see {@link ExecutionContext.evaluate} for more details.
   */
  async evaluate(pageFunction, ...args) {
    return await this.executionContext().evaluate(pageFunction, this, ...args);
  }
  /**
   * Evaluates the given function with the current handle as its first argument.
   *
   * @see {@link ExecutionContext.evaluateHandle} for more details.
   */
  async evaluateHandle(pageFunction, ...args) {
    return await this.executionContext().evaluateHandle(pageFunction, this, ...args);
  }
  async getProperty(propertyName) {
    return this.evaluateHandle((object, propertyName2) => {
      return object[propertyName2];
    }, propertyName);
  }
  /**
   * Gets a map of handles representing the properties of the current handle.
   *
   * @example
   *
   * ```ts
   * const listHandle = await page.evaluateHandle(() => document.body.children);
   * const properties = await listHandle.getProperties();
   * const children = [];
   * for (const property of properties.values()) {
   *   const element = property.asElement();
   *   if (element) {
   *     children.push(element);
   *   }
   * }
   * children; // holds elementHandles to all children of document.body
   * ```
   */
  async getProperties() {
    assert(__classPrivateFieldGet(this, _JSHandle_remoteObject, "f").objectId);
    const response = await this.client.send("Runtime.getProperties", {
      objectId: __classPrivateFieldGet(this, _JSHandle_remoteObject, "f").objectId,
      ownProperties: true
    });
    const result = /* @__PURE__ */ new Map();
    for (const property of response.result) {
      if (!property.enumerable || !property.value) {
        continue;
      }
      result.set(property.name, createJSHandle(__classPrivateFieldGet(this, _JSHandle_context, "f"), property.value));
    }
    return result;
  }
  /**
   * @returns A vanilla object representing the serializable portions of the
   * referenced object.
   * @throws Throws if the object cannot be serialized due to circularity.
   *
   * @remarks
   * If the object has a `toJSON` function, it **will not** be called.
   */
  async jsonValue() {
    if (!__classPrivateFieldGet(this, _JSHandle_remoteObject, "f").objectId) {
      return valueFromRemoteObject(__classPrivateFieldGet(this, _JSHandle_remoteObject, "f"));
    }
    const value = await this.evaluate((object) => {
      return object;
    });
    if (value === void 0) {
      throw new Error("Could not serialize referenced object");
    }
    return value;
  }
  /**
   * @returns Either `null` or the handle itself if the handle is an
   * instance of {@link ElementHandle}.
   */
  asElement() {
    return null;
  }
  /**
   * Releases the object referenced by the handle for garbage collection.
   */
  async dispose() {
    if (__classPrivateFieldGet(this, _JSHandle_disposed, "f")) {
      return;
    }
    __classPrivateFieldSet(this, _JSHandle_disposed, true, "f");
    await releaseObject(this.client, __classPrivateFieldGet(this, _JSHandle_remoteObject, "f"));
  }
  /**
   * Returns a string representation of the JSHandle.
   *
   * @remarks
   * Useful during debugging.
   */
  toString() {
    if (!__classPrivateFieldGet(this, _JSHandle_remoteObject, "f").objectId) {
      return "JSHandle:" + valueFromRemoteObject(__classPrivateFieldGet(this, _JSHandle_remoteObject, "f"));
    }
    const type = __classPrivateFieldGet(this, _JSHandle_remoteObject, "f").subtype || __classPrivateFieldGet(this, _JSHandle_remoteObject, "f").type;
    return "JSHandle@" + type;
  }
  /**
   * Provides access to the
   * [Protocol.Runtime.RemoteObject](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-RemoteObject)
   * backing this handle.
   */
  remoteObject() {
    return __classPrivateFieldGet(this, _JSHandle_remoteObject, "f");
  }
};
_JSHandle_disposed = /* @__PURE__ */ new WeakMap(), _JSHandle_context = /* @__PURE__ */ new WeakMap(), _JSHandle_remoteObject = /* @__PURE__ */ new WeakMap();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/QueryHandler.js
init_checked_fetch();
init_modules_watch_stub();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/AriaQueryHandler.js
init_checked_fetch();
init_modules_watch_stub();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Frame.js
init_checked_fetch();
init_modules_watch_stub();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/IsolatedWorld.js
init_checked_fetch();
init_modules_watch_stub();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/util/DeferredPromise.js
init_checked_fetch();
init_modules_watch_stub();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Errors.js
init_checked_fetch();
init_modules_watch_stub();
var CustomError = class extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
};
var TimeoutError = class extends CustomError {
};
var ProtocolError = class extends CustomError {
  constructor() {
    super(...arguments);
    this.originalMessage = "";
  }
};
var errors = Object.freeze({
  TimeoutError,
  ProtocolError
});

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/util/DeferredPromise.js
function createDeferredPromiseWithTimer(timeoutMessage, timeout = 5e3) {
  let isResolved = false;
  let isRejected = false;
  let resolver = (_) => {
  };
  let rejector = (_) => {
  };
  const taskPromise = new Promise((resolve, reject) => {
    resolver = resolve;
    rejector = reject;
  });
  const timeoutId = setTimeout(() => {
    isRejected = true;
    rejector(new TimeoutError(timeoutMessage));
  }, timeout);
  return Object.assign(taskPromise, {
    resolved: () => {
      return isResolved;
    },
    finished: () => {
      return isResolved || isRejected;
    },
    resolve: (value) => {
      clearTimeout(timeoutId);
      isResolved = true;
      resolver(value);
    },
    reject: (err) => {
      clearTimeout(timeoutId);
      isRejected = true;
      rejector(err);
    }
  });
}
function createDeferredPromise() {
  let isResolved = false;
  let isRejected = false;
  let resolver = (_) => {
  };
  let rejector = (_) => {
  };
  const taskPromise = new Promise((resolve, reject) => {
    resolver = resolve;
    rejector = reject;
  });
  return Object.assign(taskPromise, {
    resolved: () => {
      return isResolved;
    },
    finished: () => {
      return isResolved || isRejected;
    },
    resolve: (value) => {
      isResolved = true;
      resolver(value);
    },
    reject: (err) => {
      isRejected = true;
      rejector(err);
    }
  });
}
function createDebuggableDeferredPromise(timeoutMessage) {
  if (deferredPromiseDebugTimeout > 0) {
    return createDeferredPromiseWithTimer(timeoutMessage, deferredPromiseDebugTimeout);
  }
  return createDeferredPromise();
}

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/LifecycleWatcher.js
init_checked_fetch();
init_modules_watch_stub();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/FrameManager.js
init_checked_fetch();
init_modules_watch_stub();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/EventEmitter.js
init_checked_fetch();
init_modules_watch_stub();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/vendor/mitt/src/index.js
init_checked_fetch();
init_modules_watch_stub();
function mitt(all) {
  all = all || /* @__PURE__ */ new Map();
  return {
    /**
     * A Map of event names to registered handler functions.
     */
    all,
    /**
     * Register an event handler for the given type.
     * @param {string|symbol} type Type of event to listen for, or `"*"` for all events
     * @param {Function} handler Function to call in response to given event
     * @memberOf mitt
     */
    on: function(type, handler) {
      var handlers = all.get(type);
      var added = handlers && handlers.push(handler);
      if (!added) {
        all.set(type, [handler]);
      }
    },
    /**
     * Remove an event handler for the given type.
     * @param {string|symbol} type Type of event to unregister `handler` from, or `"*"`
     * @param {Function} handler Handler function to remove
     * @memberOf mitt
     */
    off: function(type, handler) {
      var handlers = all.get(type);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      }
    },
    /**
     * Invoke all handlers for the given type.
     * If present, `"*"` handlers are invoked after type-matched handlers.
     *
     * Note: Manually firing "*" handlers is not supported.
     *
     * @param {string|symbol} type The event type to invoke
     * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
     * @memberOf mitt
     */
    emit: function(type, evt) {
      (all.get(type) || []).slice().map(function(handler) {
        handler(evt);
      });
      (all.get("*") || []).slice().map(function(handler) {
        handler(type, evt);
      });
    }
  };
}

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/EventEmitter.js
var EventEmitter = class {
  /**
   * @internal
   */
  constructor() {
    this.eventsMap = /* @__PURE__ */ new Map();
    this.emitter = mitt(this.eventsMap);
  }
  /**
   * Bind an event listener to fire when an event occurs.
   * @param event - the event type you'd like to listen to. Can be a string or symbol.
   * @param handler - the function to be called when the event occurs.
   * @returns `this` to enable you to chain method calls.
   */
  on(event, handler) {
    this.emitter.on(event, handler);
    return this;
  }
  /**
   * Remove an event listener from firing.
   * @param event - the event type you'd like to stop listening to.
   * @param handler - the function that should be removed.
   * @returns `this` to enable you to chain method calls.
   */
  off(event, handler) {
    this.emitter.off(event, handler);
    return this;
  }
  /**
   * Remove an event listener.
   * @deprecated please use {@link EventEmitter.off} instead.
   */
  removeListener(event, handler) {
    this.off(event, handler);
    return this;
  }
  /**
   * Add an event listener.
   * @deprecated please use {@link EventEmitter.on} instead.
   */
  addListener(event, handler) {
    this.on(event, handler);
    return this;
  }
  /**
   * Emit an event and call any associated listeners.
   *
   * @param event - the event you'd like to emit
   * @param eventData - any data you'd like to emit with the event
   * @returns `true` if there are any listeners, `false` if there are not.
   */
  emit(event, eventData) {
    this.emitter.emit(event, eventData);
    return this.eventListenersCount(event) > 0;
  }
  /**
   * Like `on` but the listener will only be fired once and then it will be removed.
   * @param event - the event you'd like to listen to
   * @param handler - the handler function to run when the event occurs
   * @returns `this` to enable you to chain method calls.
   */
  once(event, handler) {
    const onceHandler = (eventData) => {
      handler(eventData);
      this.off(event, onceHandler);
    };
    return this.on(event, onceHandler);
  }
  /**
   * Gets the number of listeners for a given event.
   *
   * @param event - the event to get the listener count for
   * @returns the number of listeners bound to the given event
   */
  listenerCount(event) {
    return this.eventListenersCount(event);
  }
  /**
   * Removes all listeners. If given an event argument, it will remove only
   * listeners for that event.
   * @param event - the event to remove listeners for.
   * @returns `this` to enable you to chain method calls.
   */
  removeAllListeners(event) {
    if (event) {
      this.eventsMap.delete(event);
    } else {
      this.eventsMap.clear();
    }
    return this;
  }
  eventListenersCount(event) {
    var _a2;
    return ((_a2 = this.eventsMap.get(event)) === null || _a2 === void 0 ? void 0 : _a2.length) || 0;
  }
};

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/ExecutionContext.js
init_checked_fetch();
init_modules_watch_stub();
var __classPrivateFieldGet2 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ExecutionContext_instances;
var _ExecutionContext_evaluate;
var EVALUATION_SCRIPT_URL = "pptr://__puppeteer_evaluation_script__";
var SOURCE_URL_REGEX = /^[\040\t]*\/\/[@#] sourceURL=\s*(\S*?)\s*$/m;
var ExecutionContext = class {
  /**
   * @internal
   */
  constructor(client, contextPayload, world) {
    _ExecutionContext_instances.add(this);
    this._client = client;
    this._world = world;
    this._contextId = contextPayload.id;
    this._contextName = contextPayload.name;
  }
  /**
   * Evaluates the given function.
   *
   * @example
   *
   * ```ts
   * const executionContext = await page.mainFrame().executionContext();
   * const result = await executionContext.evaluate(() => Promise.resolve(8 * 7))* ;
   * console.log(result); // prints "56"
   * ```
   *
   * @example
   * A string can also be passed in instead of a function:
   *
   * ```ts
   * console.log(await executionContext.evaluate('1 + 2')); // prints "3"
   * ```
   *
   * @example
   * Handles can also be passed as `args`. They resolve to their referenced object:
   *
   * ```ts
   * const oneHandle = await executionContext.evaluateHandle(() => 1);
   * const twoHandle = await executionContext.evaluateHandle(() => 2);
   * const result = await executionContext.evaluate(
   *   (a, b) => a + b,
   *   oneHandle,
   *   twoHandle
   * );
   * await oneHandle.dispose();
   * await twoHandle.dispose();
   * console.log(result); // prints '3'.
   * ```
   *
   * @param pageFunction - The function to evaluate.
   * @param args - Additional arguments to pass into the function.
   * @returns The result of evaluating the function. If the result is an object,
   * a vanilla object containing the serializable properties of the result is
   * returned.
   */
  async evaluate(pageFunction, ...args) {
    return await __classPrivateFieldGet2(this, _ExecutionContext_instances, "m", _ExecutionContext_evaluate).call(this, true, pageFunction, ...args);
  }
  /**
   * Evaluates the given function.
   *
   * Unlike {@link ExecutionContext.evaluate | evaluate}, this method returns a
   * handle to the result of the function.
   *
   * This method may be better suited if the object cannot be serialized (e.g.
   * `Map`) and requires further manipulation.
   *
   * @example
   *
   * ```ts
   * const context = await page.mainFrame().executionContext();
   * const handle: JSHandle<typeof globalThis> = await context.evaluateHandle(
   *   () => Promise.resolve(self)
   * );
   * ```
   *
   * @example
   * A string can also be passed in instead of a function.
   *
   * ```ts
   * const handle: JSHandle<number> = await context.evaluateHandle('1 + 2');
   * ```
   *
   * @example
   * Handles can also be passed as `args`. They resolve to their referenced object:
   *
   * ```ts
   * const bodyHandle: ElementHandle<HTMLBodyElement> =
   *   await context.evaluateHandle(() => {
   *     return document.body;
   *   });
   * const stringHandle: JSHandle<string> = await context.evaluateHandle(
   *   body => body.innerHTML,
   *   body
   * );
   * console.log(await stringHandle.jsonValue()); // prints body's innerHTML
   * // Always dispose your garbage! :)
   * await bodyHandle.dispose();
   * await stringHandle.dispose();
   * ```
   *
   * @param pageFunction - The function to evaluate.
   * @param args - Additional arguments to pass into the function.
   * @returns A {@link JSHandle | handle} to the result of evaluating the
   * function. If the result is a `Node`, then this will return an
   * {@link ElementHandle | element handle}.
   */
  async evaluateHandle(pageFunction, ...args) {
    return __classPrivateFieldGet2(this, _ExecutionContext_instances, "m", _ExecutionContext_evaluate).call(this, false, pageFunction, ...args);
  }
};
_ExecutionContext_instances = /* @__PURE__ */ new WeakSet(), _ExecutionContext_evaluate = async function _ExecutionContext_evaluate2(returnByValue, pageFunction, ...args) {
  const suffix = `//# sourceURL=${EVALUATION_SCRIPT_URL}`;
  if (isString(pageFunction)) {
    const contextId = this._contextId;
    const expression = pageFunction;
    const expressionWithSourceUrl = SOURCE_URL_REGEX.test(expression) ? expression : expression + "\n" + suffix;
    const { exceptionDetails: exceptionDetails2, result: remoteObject2 } = await this._client.send("Runtime.evaluate", {
      expression: expressionWithSourceUrl,
      contextId,
      returnByValue,
      awaitPromise: true,
      userGesture: true
    }).catch(rewriteError);
    if (exceptionDetails2) {
      throw new Error("Evaluation failed: " + getExceptionMessage(exceptionDetails2));
    }
    return returnByValue ? valueFromRemoteObject(remoteObject2) : createJSHandle(this, remoteObject2);
  }
  const functionText = pageFunction.toString();
  let callFunctionOnPromise;
  try {
    callFunctionOnPromise = this._client.send("Runtime.callFunctionOn", {
      functionDeclaration: functionText + "\n" + suffix + "\n",
      executionContextId: this._contextId,
      arguments: args.map(convertArgument.bind(this)),
      returnByValue,
      awaitPromise: true,
      userGesture: true
    });
  } catch (error) {
    if (error instanceof TypeError && error.message.startsWith("Converting circular structure to JSON")) {
      error.message += " Recursive objects are not allowed.";
    }
    throw error;
  }
  const { exceptionDetails, result: remoteObject } = await callFunctionOnPromise.catch(rewriteError);
  if (exceptionDetails) {
    throw new Error("Evaluation failed: " + getExceptionMessage(exceptionDetails));
  }
  return returnByValue ? valueFromRemoteObject(remoteObject) : createJSHandle(this, remoteObject);
  function convertArgument(arg) {
    if (typeof arg === "bigint") {
      return { unserializableValue: `${arg.toString()}n` };
    }
    if (Object.is(arg, -0)) {
      return { unserializableValue: "-0" };
    }
    if (Object.is(arg, Infinity)) {
      return { unserializableValue: "Infinity" };
    }
    if (Object.is(arg, -Infinity)) {
      return { unserializableValue: "-Infinity" };
    }
    if (Object.is(arg, NaN)) {
      return { unserializableValue: "NaN" };
    }
    const objectHandle = arg && arg instanceof JSHandle ? arg : null;
    if (objectHandle) {
      if (objectHandle.executionContext() !== this) {
        throw new Error("JSHandles can be evaluated only in the context they were created!");
      }
      if (objectHandle.disposed) {
        throw new Error("JSHandle is disposed!");
      }
      if (objectHandle.remoteObject().unserializableValue) {
        return {
          unserializableValue: objectHandle.remoteObject().unserializableValue
        };
      }
      if (!objectHandle.remoteObject().objectId) {
        return { value: objectHandle.remoteObject().value };
      }
      return { objectId: objectHandle.remoteObject().objectId };
    }
    return { value: arg };
  }
};
var rewriteError = (error) => {
  if (error.message.includes("Object reference chain is too long")) {
    return { result: { type: "undefined" } };
  }
  if (error.message.includes("Object couldn't be returned by value")) {
    return { result: { type: "undefined" } };
  }
  if (error.message.endsWith("Cannot find context with specified id") || error.message.endsWith("Inspected target navigated or closed")) {
    throw new Error("Execution context was destroyed, most likely because of a navigation.");
  }
  throw error;
};

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/NetworkManager.js
init_checked_fetch();
init_modules_watch_stub();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/HTTPRequest.js
init_checked_fetch();
init_modules_watch_stub();
var __classPrivateFieldSet2 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet3 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _HTTPRequest_instances;
var _HTTPRequest_client;
var _HTTPRequest_isNavigationRequest;
var _HTTPRequest_allowInterception;
var _HTTPRequest_interceptionHandled;
var _HTTPRequest_url;
var _HTTPRequest_resourceType;
var _HTTPRequest_method;
var _HTTPRequest_postData;
var _HTTPRequest_headers;
var _HTTPRequest_frame;
var _HTTPRequest_continueRequestOverrides;
var _HTTPRequest_responseForRequest;
var _HTTPRequest_abortErrorReason;
var _HTTPRequest_interceptResolutionState;
var _HTTPRequest_interceptHandlers;
var _HTTPRequest_initiator;
var _HTTPRequest_continue;
var _HTTPRequest_respond;
var _HTTPRequest_abort;
var HTTPRequest = class {
  /**
   * @internal
   */
  constructor(client, frame, interceptionId, allowInterception, event, redirectChain) {
    _HTTPRequest_instances.add(this);
    this._failureText = null;
    this._response = null;
    this._fromMemoryCache = false;
    _HTTPRequest_client.set(this, void 0);
    _HTTPRequest_isNavigationRequest.set(this, void 0);
    _HTTPRequest_allowInterception.set(this, void 0);
    _HTTPRequest_interceptionHandled.set(this, false);
    _HTTPRequest_url.set(this, void 0);
    _HTTPRequest_resourceType.set(this, void 0);
    _HTTPRequest_method.set(this, void 0);
    _HTTPRequest_postData.set(this, void 0);
    _HTTPRequest_headers.set(this, {});
    _HTTPRequest_frame.set(this, void 0);
    _HTTPRequest_continueRequestOverrides.set(this, void 0);
    _HTTPRequest_responseForRequest.set(this, null);
    _HTTPRequest_abortErrorReason.set(this, null);
    _HTTPRequest_interceptResolutionState.set(this, {
      action: InterceptResolutionAction.None
    });
    _HTTPRequest_interceptHandlers.set(this, void 0);
    _HTTPRequest_initiator.set(this, void 0);
    __classPrivateFieldSet2(this, _HTTPRequest_client, client, "f");
    this._requestId = event.requestId;
    __classPrivateFieldSet2(this, _HTTPRequest_isNavigationRequest, event.requestId === event.loaderId && event.type === "Document", "f");
    this._interceptionId = interceptionId;
    __classPrivateFieldSet2(this, _HTTPRequest_allowInterception, allowInterception, "f");
    __classPrivateFieldSet2(this, _HTTPRequest_url, event.request.url, "f");
    __classPrivateFieldSet2(this, _HTTPRequest_resourceType, (event.type || "other").toLowerCase(), "f");
    __classPrivateFieldSet2(this, _HTTPRequest_method, event.request.method, "f");
    __classPrivateFieldSet2(this, _HTTPRequest_postData, event.request.postData, "f");
    __classPrivateFieldSet2(this, _HTTPRequest_frame, frame, "f");
    this._redirectChain = redirectChain;
    __classPrivateFieldSet2(this, _HTTPRequest_continueRequestOverrides, {}, "f");
    __classPrivateFieldSet2(this, _HTTPRequest_interceptHandlers, [], "f");
    __classPrivateFieldSet2(this, _HTTPRequest_initiator, event.initiator, "f");
    for (const [key, value] of Object.entries(event.request.headers)) {
      __classPrivateFieldGet3(this, _HTTPRequest_headers, "f")[key.toLowerCase()] = value;
    }
  }
  /**
   * Warning! Using this client can break Puppeteer. Use with caution.
   *
   * @experimental
   */
  get client() {
    return __classPrivateFieldGet3(this, _HTTPRequest_client, "f");
  }
  /**
   * @returns the URL of the request
   */
  url() {
    return __classPrivateFieldGet3(this, _HTTPRequest_url, "f");
  }
  /**
   * @returns the `ContinueRequestOverrides` that will be used
   * if the interception is allowed to continue (ie, `abort()` and
   * `respond()` aren't called).
   */
  continueRequestOverrides() {
    assert(__classPrivateFieldGet3(this, _HTTPRequest_allowInterception, "f"), "Request Interception is not enabled!");
    return __classPrivateFieldGet3(this, _HTTPRequest_continueRequestOverrides, "f");
  }
  /**
   * @returns The `ResponseForRequest` that gets used if the
   * interception is allowed to respond (ie, `abort()` is not called).
   */
  responseForRequest() {
    assert(__classPrivateFieldGet3(this, _HTTPRequest_allowInterception, "f"), "Request Interception is not enabled!");
    return __classPrivateFieldGet3(this, _HTTPRequest_responseForRequest, "f");
  }
  /**
   * @returns the most recent reason for aborting the request
   */
  abortErrorReason() {
    assert(__classPrivateFieldGet3(this, _HTTPRequest_allowInterception, "f"), "Request Interception is not enabled!");
    return __classPrivateFieldGet3(this, _HTTPRequest_abortErrorReason, "f");
  }
  /**
   * @returns An InterceptResolutionState object describing the current resolution
   * action and priority.
   *
   * InterceptResolutionState contains:
   * action: InterceptResolutionAction
   * priority?: number
   *
   * InterceptResolutionAction is one of: `abort`, `respond`, `continue`,
   * `disabled`, `none`, or `already-handled`.
   */
  interceptResolutionState() {
    if (!__classPrivateFieldGet3(this, _HTTPRequest_allowInterception, "f")) {
      return { action: InterceptResolutionAction.Disabled };
    }
    if (__classPrivateFieldGet3(this, _HTTPRequest_interceptionHandled, "f")) {
      return { action: InterceptResolutionAction.AlreadyHandled };
    }
    return { ...__classPrivateFieldGet3(this, _HTTPRequest_interceptResolutionState, "f") };
  }
  /**
   * @returns `true` if the intercept resolution has already been handled,
   * `false` otherwise.
   */
  isInterceptResolutionHandled() {
    return __classPrivateFieldGet3(this, _HTTPRequest_interceptionHandled, "f");
  }
  /**
   * Adds an async request handler to the processing queue.
   * Deferred handlers are not guaranteed to execute in any particular order,
   * but they are guaranteed to resolve before the request interception
   * is finalized.
   */
  enqueueInterceptAction(pendingHandler) {
    __classPrivateFieldGet3(this, _HTTPRequest_interceptHandlers, "f").push(pendingHandler);
  }
  /**
   * Awaits pending interception handlers and then decides how to fulfill
   * the request interception.
   */
  async finalizeInterceptions() {
    await __classPrivateFieldGet3(this, _HTTPRequest_interceptHandlers, "f").reduce((promiseChain, interceptAction) => {
      return promiseChain.then(interceptAction);
    }, Promise.resolve());
    const { action } = this.interceptResolutionState();
    switch (action) {
      case "abort":
        return __classPrivateFieldGet3(this, _HTTPRequest_instances, "m", _HTTPRequest_abort).call(this, __classPrivateFieldGet3(this, _HTTPRequest_abortErrorReason, "f"));
      case "respond":
        if (__classPrivateFieldGet3(this, _HTTPRequest_responseForRequest, "f") === null) {
          throw new Error("Response is missing for the interception");
        }
        return __classPrivateFieldGet3(this, _HTTPRequest_instances, "m", _HTTPRequest_respond).call(this, __classPrivateFieldGet3(this, _HTTPRequest_responseForRequest, "f"));
      case "continue":
        return __classPrivateFieldGet3(this, _HTTPRequest_instances, "m", _HTTPRequest_continue).call(this, __classPrivateFieldGet3(this, _HTTPRequest_continueRequestOverrides, "f"));
    }
  }
  /**
   * Contains the request's resource type as it was perceived by the rendering
   * engine.
   */
  resourceType() {
    return __classPrivateFieldGet3(this, _HTTPRequest_resourceType, "f");
  }
  /**
   * @returns the method used (`GET`, `POST`, etc.)
   */
  method() {
    return __classPrivateFieldGet3(this, _HTTPRequest_method, "f");
  }
  /**
   * @returns the request's post body, if any.
   */
  postData() {
    return __classPrivateFieldGet3(this, _HTTPRequest_postData, "f");
  }
  /**
   * @returns an object with HTTP headers associated with the request. All
   * header names are lower-case.
   */
  headers() {
    return __classPrivateFieldGet3(this, _HTTPRequest_headers, "f");
  }
  /**
   * @returns A matching `HTTPResponse` object, or null if the response has not
   * been received yet.
   */
  response() {
    return this._response;
  }
  /**
   * @returns the frame that initiated the request, or null if navigating to
   * error pages.
   */
  frame() {
    return __classPrivateFieldGet3(this, _HTTPRequest_frame, "f");
  }
  /**
   * @returns true if the request is the driver of the current frame's navigation.
   */
  isNavigationRequest() {
    return __classPrivateFieldGet3(this, _HTTPRequest_isNavigationRequest, "f");
  }
  /**
   * @returns the initiator of the request.
   */
  initiator() {
    return __classPrivateFieldGet3(this, _HTTPRequest_initiator, "f");
  }
  /**
   * A `redirectChain` is a chain of requests initiated to fetch a resource.
   * @remarks
   *
   * `redirectChain` is shared between all the requests of the same chain.
   *
   * For example, if the website `http://example.com` has a single redirect to
   * `https://example.com`, then the chain will contain one request:
   *
   * ```ts
   * const response = await page.goto('http://example.com');
   * const chain = response.request().redirectChain();
   * console.log(chain.length); // 1
   * console.log(chain[0].url()); // 'http://example.com'
   * ```
   *
   * If the website `https://google.com` has no redirects, then the chain will be empty:
   *
   * ```ts
   * const response = await page.goto('https://google.com');
   * const chain = response.request().redirectChain();
   * console.log(chain.length); // 0
   * ```
   *
   * @returns the chain of requests - if a server responds with at least a
   * single redirect, this chain will contain all requests that were redirected.
   */
  redirectChain() {
    return this._redirectChain.slice();
  }
  /**
   * Access information about the request's failure.
   *
   * @remarks
   *
   * @example
   *
   * Example of logging all failed requests:
   *
   * ```ts
   * page.on('requestfailed', request => {
   *   console.log(request.url() + ' ' + request.failure().errorText);
   * });
   * ```
   *
   * @returns `null` unless the request failed. If the request fails this can
   * return an object with `errorText` containing a human-readable error
   * message, e.g. `net::ERR_FAILED`. It is not guaranteed that there will be
   * failure text if the request fails.
   */
  failure() {
    if (!this._failureText) {
      return null;
    }
    return {
      errorText: this._failureText
    };
  }
  /**
   * Continues request with optional request overrides.
   *
   * @remarks
   *
   * To use this, request
   * interception should be enabled with {@link Page.setRequestInterception}.
   *
   * Exception is immediately thrown if the request interception is not enabled.
   *
   * @example
   *
   * ```ts
   * await page.setRequestInterception(true);
   * page.on('request', request => {
   *   // Override headers
   *   const headers = Object.assign({}, request.headers(), {
   *     foo: 'bar', // set "foo" header
   *     origin: undefined, // remove "origin" header
   *   });
   *   request.continue({headers});
   * });
   * ```
   *
   * @param overrides - optional overrides to apply to the request.
   * @param priority - If provided, intercept is resolved using
   * cooperative handling rules. Otherwise, intercept is resolved
   * immediately.
   */
  async continue(overrides = {}, priority) {
    if (__classPrivateFieldGet3(this, _HTTPRequest_url, "f").startsWith("data:")) {
      return;
    }
    assert(__classPrivateFieldGet3(this, _HTTPRequest_allowInterception, "f"), "Request Interception is not enabled!");
    assert(!__classPrivateFieldGet3(this, _HTTPRequest_interceptionHandled, "f"), "Request is already handled!");
    if (priority === void 0) {
      return __classPrivateFieldGet3(this, _HTTPRequest_instances, "m", _HTTPRequest_continue).call(this, overrides);
    }
    __classPrivateFieldSet2(this, _HTTPRequest_continueRequestOverrides, overrides, "f");
    if (__classPrivateFieldGet3(this, _HTTPRequest_interceptResolutionState, "f").priority === void 0 || priority > __classPrivateFieldGet3(this, _HTTPRequest_interceptResolutionState, "f").priority) {
      __classPrivateFieldSet2(this, _HTTPRequest_interceptResolutionState, {
        action: InterceptResolutionAction.Continue,
        priority
      }, "f");
      return;
    }
    if (priority === __classPrivateFieldGet3(this, _HTTPRequest_interceptResolutionState, "f").priority) {
      if (__classPrivateFieldGet3(this, _HTTPRequest_interceptResolutionState, "f").action === "abort" || __classPrivateFieldGet3(this, _HTTPRequest_interceptResolutionState, "f").action === "respond") {
        return;
      }
      __classPrivateFieldGet3(this, _HTTPRequest_interceptResolutionState, "f").action = InterceptResolutionAction.Continue;
    }
    return;
  }
  /**
   * Fulfills a request with the given response.
   *
   * @remarks
   *
   * To use this, request
   * interception should be enabled with {@link Page.setRequestInterception}.
   *
   * Exception is immediately thrown if the request interception is not enabled.
   *
   * @example
   * An example of fulfilling all requests with 404 responses:
   *
   * ```ts
   * await page.setRequestInterception(true);
   * page.on('request', request => {
   *   request.respond({
   *     status: 404,
   *     contentType: 'text/plain',
   *     body: 'Not Found!',
   *   });
   * });
   * ```
   *
   * NOTE: Mocking responses for dataURL requests is not supported.
   * Calling `request.respond` for a dataURL request is a noop.
   *
   * @param response - the response to fulfill the request with.
   * @param priority - If provided, intercept is resolved using
   * cooperative handling rules. Otherwise, intercept is resolved
   * immediately.
   */
  async respond(response, priority) {
    if (__classPrivateFieldGet3(this, _HTTPRequest_url, "f").startsWith("data:")) {
      return;
    }
    assert(__classPrivateFieldGet3(this, _HTTPRequest_allowInterception, "f"), "Request Interception is not enabled!");
    assert(!__classPrivateFieldGet3(this, _HTTPRequest_interceptionHandled, "f"), "Request is already handled!");
    if (priority === void 0) {
      return __classPrivateFieldGet3(this, _HTTPRequest_instances, "m", _HTTPRequest_respond).call(this, response);
    }
    __classPrivateFieldSet2(this, _HTTPRequest_responseForRequest, response, "f");
    if (__classPrivateFieldGet3(this, _HTTPRequest_interceptResolutionState, "f").priority === void 0 || priority > __classPrivateFieldGet3(this, _HTTPRequest_interceptResolutionState, "f").priority) {
      __classPrivateFieldSet2(this, _HTTPRequest_interceptResolutionState, {
        action: InterceptResolutionAction.Respond,
        priority
      }, "f");
      return;
    }
    if (priority === __classPrivateFieldGet3(this, _HTTPRequest_interceptResolutionState, "f").priority) {
      if (__classPrivateFieldGet3(this, _HTTPRequest_interceptResolutionState, "f").action === "abort") {
        return;
      }
      __classPrivateFieldGet3(this, _HTTPRequest_interceptResolutionState, "f").action = InterceptResolutionAction.Respond;
    }
  }
  /**
   * Aborts a request.
   *
   * @remarks
   * To use this, request interception should be enabled with
   * {@link Page.setRequestInterception}. If it is not enabled, this method will
   * throw an exception immediately.
   *
   * @param errorCode - optional error code to provide.
   * @param priority - If provided, intercept is resolved using
   * cooperative handling rules. Otherwise, intercept is resolved
   * immediately.
   */
  async abort(errorCode = "failed", priority) {
    if (__classPrivateFieldGet3(this, _HTTPRequest_url, "f").startsWith("data:")) {
      return;
    }
    const errorReason = errorReasons[errorCode];
    assert(errorReason, "Unknown error code: " + errorCode);
    assert(__classPrivateFieldGet3(this, _HTTPRequest_allowInterception, "f"), "Request Interception is not enabled!");
    assert(!__classPrivateFieldGet3(this, _HTTPRequest_interceptionHandled, "f"), "Request is already handled!");
    if (priority === void 0) {
      return __classPrivateFieldGet3(this, _HTTPRequest_instances, "m", _HTTPRequest_abort).call(this, errorReason);
    }
    __classPrivateFieldSet2(this, _HTTPRequest_abortErrorReason, errorReason, "f");
    if (__classPrivateFieldGet3(this, _HTTPRequest_interceptResolutionState, "f").priority === void 0 || priority >= __classPrivateFieldGet3(this, _HTTPRequest_interceptResolutionState, "f").priority) {
      __classPrivateFieldSet2(this, _HTTPRequest_interceptResolutionState, {
        action: InterceptResolutionAction.Abort,
        priority
      }, "f");
      return;
    }
  }
};
_HTTPRequest_client = /* @__PURE__ */ new WeakMap(), _HTTPRequest_isNavigationRequest = /* @__PURE__ */ new WeakMap(), _HTTPRequest_allowInterception = /* @__PURE__ */ new WeakMap(), _HTTPRequest_interceptionHandled = /* @__PURE__ */ new WeakMap(), _HTTPRequest_url = /* @__PURE__ */ new WeakMap(), _HTTPRequest_resourceType = /* @__PURE__ */ new WeakMap(), _HTTPRequest_method = /* @__PURE__ */ new WeakMap(), _HTTPRequest_postData = /* @__PURE__ */ new WeakMap(), _HTTPRequest_headers = /* @__PURE__ */ new WeakMap(), _HTTPRequest_frame = /* @__PURE__ */ new WeakMap(), _HTTPRequest_continueRequestOverrides = /* @__PURE__ */ new WeakMap(), _HTTPRequest_responseForRequest = /* @__PURE__ */ new WeakMap(), _HTTPRequest_abortErrorReason = /* @__PURE__ */ new WeakMap(), _HTTPRequest_interceptResolutionState = /* @__PURE__ */ new WeakMap(), _HTTPRequest_interceptHandlers = /* @__PURE__ */ new WeakMap(), _HTTPRequest_initiator = /* @__PURE__ */ new WeakMap(), _HTTPRequest_instances = /* @__PURE__ */ new WeakSet(), _HTTPRequest_continue = async function _HTTPRequest_continue2(overrides = {}) {
  const { url, method, postData, headers } = overrides;
  __classPrivateFieldSet2(this, _HTTPRequest_interceptionHandled, true, "f");
  const postDataBinaryBase64 = postData ? Buffer.from(postData).toString("base64") : void 0;
  if (this._interceptionId === void 0) {
    throw new Error("HTTPRequest is missing _interceptionId needed for Fetch.continueRequest");
  }
  await __classPrivateFieldGet3(this, _HTTPRequest_client, "f").send("Fetch.continueRequest", {
    requestId: this._interceptionId,
    url,
    method,
    postData: postDataBinaryBase64,
    headers: headers ? headersArray(headers) : void 0
  }).catch((error) => {
    __classPrivateFieldSet2(this, _HTTPRequest_interceptionHandled, false, "f");
    return handleError(error);
  });
}, _HTTPRequest_respond = async function _HTTPRequest_respond2(response) {
  __classPrivateFieldSet2(this, _HTTPRequest_interceptionHandled, true, "f");
  const responseBody = response.body && isString(response.body) ? Buffer.from(response.body) : response.body || null;
  const responseHeaders = {};
  if (response.headers) {
    for (const header of Object.keys(response.headers)) {
      const value = response.headers[header];
      responseHeaders[header.toLowerCase()] = Array.isArray(value) ? value.map((item) => {
        return String(item);
      }) : String(value);
    }
  }
  if (response.contentType) {
    responseHeaders["content-type"] = response.contentType;
  }
  if (responseBody && !("content-length" in responseHeaders)) {
    responseHeaders["content-length"] = String(Buffer.byteLength(responseBody));
  }
  const status = response.status || 200;
  if (this._interceptionId === void 0) {
    throw new Error("HTTPRequest is missing _interceptionId needed for Fetch.fulfillRequest");
  }
  await __classPrivateFieldGet3(this, _HTTPRequest_client, "f").send("Fetch.fulfillRequest", {
    requestId: this._interceptionId,
    responseCode: status,
    responsePhrase: STATUS_TEXTS[status],
    responseHeaders: headersArray(responseHeaders),
    body: responseBody ? responseBody.toString("base64") : void 0
  }).catch((error) => {
    __classPrivateFieldSet2(this, _HTTPRequest_interceptionHandled, false, "f");
    return handleError(error);
  });
}, _HTTPRequest_abort = async function _HTTPRequest_abort2(errorReason) {
  __classPrivateFieldSet2(this, _HTTPRequest_interceptionHandled, true, "f");
  if (this._interceptionId === void 0) {
    throw new Error("HTTPRequest is missing _interceptionId needed for Fetch.failRequest");
  }
  await __classPrivateFieldGet3(this, _HTTPRequest_client, "f").send("Fetch.failRequest", {
    requestId: this._interceptionId,
    errorReason: errorReason || "Failed"
  }).catch(handleError);
};
var InterceptResolutionAction;
(function(InterceptResolutionAction2) {
  InterceptResolutionAction2["Abort"] = "abort";
  InterceptResolutionAction2["Respond"] = "respond";
  InterceptResolutionAction2["Continue"] = "continue";
  InterceptResolutionAction2["Disabled"] = "disabled";
  InterceptResolutionAction2["None"] = "none";
  InterceptResolutionAction2["AlreadyHandled"] = "already-handled";
})(InterceptResolutionAction || (InterceptResolutionAction = {}));
var errorReasons = {
  aborted: "Aborted",
  accessdenied: "AccessDenied",
  addressunreachable: "AddressUnreachable",
  blockedbyclient: "BlockedByClient",
  blockedbyresponse: "BlockedByResponse",
  connectionaborted: "ConnectionAborted",
  connectionclosed: "ConnectionClosed",
  connectionfailed: "ConnectionFailed",
  connectionrefused: "ConnectionRefused",
  connectionreset: "ConnectionReset",
  internetdisconnected: "InternetDisconnected",
  namenotresolved: "NameNotResolved",
  timedout: "TimedOut",
  failed: "Failed"
};
function headersArray(headers) {
  const result = [];
  for (const name in headers) {
    const value = headers[name];
    if (!Object.is(value, void 0)) {
      const values = Array.isArray(value) ? value : [value];
      result.push(...values.map((value2) => {
        return { name, value: value2 + "" };
      }));
    }
  }
  return result;
}
async function handleError(error) {
  if (["Invalid header"].includes(error.originalMessage)) {
    throw error;
  }
  debugError(error);
}
var STATUS_TEXTS = {
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",
  "103": "Early Hints",
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "306": "Switch Proxy",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Too Early",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "510": "Not Extended",
  "511": "Network Authentication Required"
};

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/HTTPResponse.js
init_checked_fetch();
init_modules_watch_stub();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/SecurityDetails.js
init_checked_fetch();
init_modules_watch_stub();
var __classPrivateFieldSet3 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet4 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SecurityDetails_subjectName;
var _SecurityDetails_issuer;
var _SecurityDetails_validFrom;
var _SecurityDetails_validTo;
var _SecurityDetails_protocol;
var _SecurityDetails_sanList;
var SecurityDetails = class {
  /**
   * @internal
   */
  constructor(securityPayload) {
    _SecurityDetails_subjectName.set(this, void 0);
    _SecurityDetails_issuer.set(this, void 0);
    _SecurityDetails_validFrom.set(this, void 0);
    _SecurityDetails_validTo.set(this, void 0);
    _SecurityDetails_protocol.set(this, void 0);
    _SecurityDetails_sanList.set(this, void 0);
    __classPrivateFieldSet3(this, _SecurityDetails_subjectName, securityPayload.subjectName, "f");
    __classPrivateFieldSet3(this, _SecurityDetails_issuer, securityPayload.issuer, "f");
    __classPrivateFieldSet3(this, _SecurityDetails_validFrom, securityPayload.validFrom, "f");
    __classPrivateFieldSet3(this, _SecurityDetails_validTo, securityPayload.validTo, "f");
    __classPrivateFieldSet3(this, _SecurityDetails_protocol, securityPayload.protocol, "f");
    __classPrivateFieldSet3(this, _SecurityDetails_sanList, securityPayload.sanList, "f");
  }
  /**
   * @returns The name of the issuer of the certificate.
   */
  issuer() {
    return __classPrivateFieldGet4(this, _SecurityDetails_issuer, "f");
  }
  /**
   * @returns {@link https://en.wikipedia.org/wiki/Unix_time | Unix timestamp}
   * marking the start of the certificate's validity.
   */
  validFrom() {
    return __classPrivateFieldGet4(this, _SecurityDetails_validFrom, "f");
  }
  /**
   * @returns {@link https://en.wikipedia.org/wiki/Unix_time | Unix timestamp}
   * marking the end of the certificate's validity.
   */
  validTo() {
    return __classPrivateFieldGet4(this, _SecurityDetails_validTo, "f");
  }
  /**
   * @returns The security protocol being used, e.g. "TLS 1.2".
   */
  protocol() {
    return __classPrivateFieldGet4(this, _SecurityDetails_protocol, "f");
  }
  /**
   * @returns The name of the subject to which the certificate was issued.
   */
  subjectName() {
    return __classPrivateFieldGet4(this, _SecurityDetails_subjectName, "f");
  }
  /**
   * @returns The list of {@link https://en.wikipedia.org/wiki/Subject_Alternative_Name | subject alternative names (SANs)} of the certificate.
   */
  subjectAlternativeNames() {
    return __classPrivateFieldGet4(this, _SecurityDetails_sanList, "f");
  }
};
_SecurityDetails_subjectName = /* @__PURE__ */ new WeakMap(), _SecurityDetails_issuer = /* @__PURE__ */ new WeakMap(), _SecurityDetails_validFrom = /* @__PURE__ */ new WeakMap(), _SecurityDetails_validTo = /* @__PURE__ */ new WeakMap(), _SecurityDetails_protocol = /* @__PURE__ */ new WeakMap(), _SecurityDetails_sanList = /* @__PURE__ */ new WeakMap();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/HTTPResponse.js
var __classPrivateFieldSet4 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet5 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _HTTPResponse_instances;
var _HTTPResponse_client;
var _HTTPResponse_request;
var _HTTPResponse_contentPromise;
var _HTTPResponse_bodyLoadedPromise;
var _HTTPResponse_bodyLoadedPromiseFulfill;
var _HTTPResponse_remoteAddress;
var _HTTPResponse_status;
var _HTTPResponse_statusText;
var _HTTPResponse_url;
var _HTTPResponse_fromDiskCache;
var _HTTPResponse_fromServiceWorker;
var _HTTPResponse_headers;
var _HTTPResponse_securityDetails;
var _HTTPResponse_timing;
var _HTTPResponse_parseStatusTextFromExtrInfo;
var HTTPResponse = class {
  /**
   * @internal
   */
  constructor(client, request, responsePayload, extraInfo) {
    _HTTPResponse_instances.add(this);
    _HTTPResponse_client.set(this, void 0);
    _HTTPResponse_request.set(this, void 0);
    _HTTPResponse_contentPromise.set(this, null);
    _HTTPResponse_bodyLoadedPromise.set(this, void 0);
    _HTTPResponse_bodyLoadedPromiseFulfill.set(this, () => {
    });
    _HTTPResponse_remoteAddress.set(this, void 0);
    _HTTPResponse_status.set(this, void 0);
    _HTTPResponse_statusText.set(this, void 0);
    _HTTPResponse_url.set(this, void 0);
    _HTTPResponse_fromDiskCache.set(this, void 0);
    _HTTPResponse_fromServiceWorker.set(this, void 0);
    _HTTPResponse_headers.set(this, {});
    _HTTPResponse_securityDetails.set(this, void 0);
    _HTTPResponse_timing.set(this, void 0);
    __classPrivateFieldSet4(this, _HTTPResponse_client, client, "f");
    __classPrivateFieldSet4(this, _HTTPResponse_request, request, "f");
    __classPrivateFieldSet4(this, _HTTPResponse_bodyLoadedPromise, new Promise((fulfill) => {
      __classPrivateFieldSet4(this, _HTTPResponse_bodyLoadedPromiseFulfill, fulfill, "f");
    }), "f");
    __classPrivateFieldSet4(this, _HTTPResponse_remoteAddress, {
      ip: responsePayload.remoteIPAddress,
      port: responsePayload.remotePort
    }, "f");
    __classPrivateFieldSet4(this, _HTTPResponse_statusText, __classPrivateFieldGet5(this, _HTTPResponse_instances, "m", _HTTPResponse_parseStatusTextFromExtrInfo).call(this, extraInfo) || responsePayload.statusText, "f");
    __classPrivateFieldSet4(this, _HTTPResponse_url, request.url(), "f");
    __classPrivateFieldSet4(this, _HTTPResponse_fromDiskCache, !!responsePayload.fromDiskCache, "f");
    __classPrivateFieldSet4(this, _HTTPResponse_fromServiceWorker, !!responsePayload.fromServiceWorker, "f");
    __classPrivateFieldSet4(this, _HTTPResponse_status, extraInfo ? extraInfo.statusCode : responsePayload.status, "f");
    const headers = extraInfo ? extraInfo.headers : responsePayload.headers;
    for (const [key, value] of Object.entries(headers)) {
      __classPrivateFieldGet5(this, _HTTPResponse_headers, "f")[key.toLowerCase()] = value;
    }
    __classPrivateFieldSet4(this, _HTTPResponse_securityDetails, responsePayload.securityDetails ? new SecurityDetails(responsePayload.securityDetails) : null, "f");
    __classPrivateFieldSet4(this, _HTTPResponse_timing, responsePayload.timing || null, "f");
  }
  /**
   * @internal
   */
  _resolveBody(err) {
    if (err) {
      return __classPrivateFieldGet5(this, _HTTPResponse_bodyLoadedPromiseFulfill, "f").call(this, err);
    }
    return __classPrivateFieldGet5(this, _HTTPResponse_bodyLoadedPromiseFulfill, "f").call(this);
  }
  /**
   * @returns The IP address and port number used to connect to the remote
   * server.
   */
  remoteAddress() {
    return __classPrivateFieldGet5(this, _HTTPResponse_remoteAddress, "f");
  }
  /**
   * @returns The URL of the response.
   */
  url() {
    return __classPrivateFieldGet5(this, _HTTPResponse_url, "f");
  }
  /**
   * @returns True if the response was successful (status in the range 200-299).
   */
  ok() {
    return __classPrivateFieldGet5(this, _HTTPResponse_status, "f") === 0 || __classPrivateFieldGet5(this, _HTTPResponse_status, "f") >= 200 && __classPrivateFieldGet5(this, _HTTPResponse_status, "f") <= 299;
  }
  /**
   * @returns The status code of the response (e.g., 200 for a success).
   */
  status() {
    return __classPrivateFieldGet5(this, _HTTPResponse_status, "f");
  }
  /**
   * @returns The status text of the response (e.g. usually an "OK" for a
   * success).
   */
  statusText() {
    return __classPrivateFieldGet5(this, _HTTPResponse_statusText, "f");
  }
  /**
   * @returns An object with HTTP headers associated with the response. All
   * header names are lower-case.
   */
  headers() {
    return __classPrivateFieldGet5(this, _HTTPResponse_headers, "f");
  }
  /**
   * @returns {@link SecurityDetails} if the response was received over the
   * secure connection, or `null` otherwise.
   */
  securityDetails() {
    return __classPrivateFieldGet5(this, _HTTPResponse_securityDetails, "f");
  }
  /**
   * @returns Timing information related to the response.
   */
  timing() {
    return __classPrivateFieldGet5(this, _HTTPResponse_timing, "f");
  }
  /**
   * @returns Promise which resolves to a buffer with response body.
   */
  buffer() {
    if (!__classPrivateFieldGet5(this, _HTTPResponse_contentPromise, "f")) {
      __classPrivateFieldSet4(this, _HTTPResponse_contentPromise, __classPrivateFieldGet5(this, _HTTPResponse_bodyLoadedPromise, "f").then(async (error) => {
        if (error) {
          throw error;
        }
        try {
          const response = await __classPrivateFieldGet5(this, _HTTPResponse_client, "f").send("Network.getResponseBody", {
            requestId: __classPrivateFieldGet5(this, _HTTPResponse_request, "f")._requestId
          });
          return Buffer.from(response.body, response.base64Encoded ? "base64" : "utf8");
        } catch (error2) {
          if (error2 instanceof ProtocolError && error2.originalMessage === "No resource with given identifier found") {
            throw new ProtocolError("Could not load body for this request. This might happen if the request is a preflight request.");
          }
          throw error2;
        }
      }), "f");
    }
    return __classPrivateFieldGet5(this, _HTTPResponse_contentPromise, "f");
  }
  /**
   * @returns Promise which resolves to a text representation of response body.
   */
  async text() {
    const content = await this.buffer();
    return content.toString("utf8");
  }
  /**
   *
   * @returns Promise which resolves to a JSON representation of response body.
   *
   * @remarks
   *
   * This method will throw if the response body is not parsable via
   * `JSON.parse`.
   */
  async json() {
    const content = await this.text();
    return JSON.parse(content);
  }
  /**
   * @returns A matching {@link HTTPRequest} object.
   */
  request() {
    return __classPrivateFieldGet5(this, _HTTPResponse_request, "f");
  }
  /**
   * @returns True if the response was served from either the browser's disk
   * cache or memory cache.
   */
  fromCache() {
    return __classPrivateFieldGet5(this, _HTTPResponse_fromDiskCache, "f") || __classPrivateFieldGet5(this, _HTTPResponse_request, "f")._fromMemoryCache;
  }
  /**
   * @returns True if the response was served by a service worker.
   */
  fromServiceWorker() {
    return __classPrivateFieldGet5(this, _HTTPResponse_fromServiceWorker, "f");
  }
  /**
   * @returns A {@link Frame} that initiated this response, or `null` if
   * navigating to error pages.
   */
  frame() {
    return __classPrivateFieldGet5(this, _HTTPResponse_request, "f").frame();
  }
};
_HTTPResponse_client = /* @__PURE__ */ new WeakMap(), _HTTPResponse_request = /* @__PURE__ */ new WeakMap(), _HTTPResponse_contentPromise = /* @__PURE__ */ new WeakMap(), _HTTPResponse_bodyLoadedPromise = /* @__PURE__ */ new WeakMap(), _HTTPResponse_bodyLoadedPromiseFulfill = /* @__PURE__ */ new WeakMap(), _HTTPResponse_remoteAddress = /* @__PURE__ */ new WeakMap(), _HTTPResponse_status = /* @__PURE__ */ new WeakMap(), _HTTPResponse_statusText = /* @__PURE__ */ new WeakMap(), _HTTPResponse_url = /* @__PURE__ */ new WeakMap(), _HTTPResponse_fromDiskCache = /* @__PURE__ */ new WeakMap(), _HTTPResponse_fromServiceWorker = /* @__PURE__ */ new WeakMap(), _HTTPResponse_headers = /* @__PURE__ */ new WeakMap(), _HTTPResponse_securityDetails = /* @__PURE__ */ new WeakMap(), _HTTPResponse_timing = /* @__PURE__ */ new WeakMap(), _HTTPResponse_instances = /* @__PURE__ */ new WeakSet(), _HTTPResponse_parseStatusTextFromExtrInfo = function _HTTPResponse_parseStatusTextFromExtrInfo2(extraInfo) {
  if (!extraInfo || !extraInfo.headersText) {
    return;
  }
  const firstLine = extraInfo.headersText.split("\r", 1)[0];
  if (!firstLine) {
    return;
  }
  const match = firstLine.match(/[^ ]* [^ ]* (.*)/);
  if (!match) {
    return;
  }
  const statusText = match[1];
  if (!statusText) {
    return;
  }
  return statusText;
};

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/NetworkEventManager.js
init_checked_fetch();
init_modules_watch_stub();
var __classPrivateFieldGet6 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _NetworkEventManager_requestWillBeSentMap;
var _NetworkEventManager_requestPausedMap;
var _NetworkEventManager_httpRequestsMap;
var _NetworkEventManager_responseReceivedExtraInfoMap;
var _NetworkEventManager_queuedRedirectInfoMap;
var _NetworkEventManager_queuedEventGroupMap;
var NetworkEventManager = class {
  constructor() {
    _NetworkEventManager_requestWillBeSentMap.set(this, /* @__PURE__ */ new Map());
    _NetworkEventManager_requestPausedMap.set(this, /* @__PURE__ */ new Map());
    _NetworkEventManager_httpRequestsMap.set(this, /* @__PURE__ */ new Map());
    _NetworkEventManager_responseReceivedExtraInfoMap.set(this, /* @__PURE__ */ new Map());
    _NetworkEventManager_queuedRedirectInfoMap.set(this, /* @__PURE__ */ new Map());
    _NetworkEventManager_queuedEventGroupMap.set(this, /* @__PURE__ */ new Map());
  }
  forget(networkRequestId) {
    __classPrivateFieldGet6(this, _NetworkEventManager_requestWillBeSentMap, "f").delete(networkRequestId);
    __classPrivateFieldGet6(this, _NetworkEventManager_requestPausedMap, "f").delete(networkRequestId);
    __classPrivateFieldGet6(this, _NetworkEventManager_queuedEventGroupMap, "f").delete(networkRequestId);
    __classPrivateFieldGet6(this, _NetworkEventManager_queuedRedirectInfoMap, "f").delete(networkRequestId);
    __classPrivateFieldGet6(this, _NetworkEventManager_responseReceivedExtraInfoMap, "f").delete(networkRequestId);
  }
  responseExtraInfo(networkRequestId) {
    if (!__classPrivateFieldGet6(this, _NetworkEventManager_responseReceivedExtraInfoMap, "f").has(networkRequestId)) {
      __classPrivateFieldGet6(this, _NetworkEventManager_responseReceivedExtraInfoMap, "f").set(networkRequestId, []);
    }
    return __classPrivateFieldGet6(this, _NetworkEventManager_responseReceivedExtraInfoMap, "f").get(networkRequestId);
  }
  queuedRedirectInfo(fetchRequestId) {
    if (!__classPrivateFieldGet6(this, _NetworkEventManager_queuedRedirectInfoMap, "f").has(fetchRequestId)) {
      __classPrivateFieldGet6(this, _NetworkEventManager_queuedRedirectInfoMap, "f").set(fetchRequestId, []);
    }
    return __classPrivateFieldGet6(this, _NetworkEventManager_queuedRedirectInfoMap, "f").get(fetchRequestId);
  }
  queueRedirectInfo(fetchRequestId, redirectInfo) {
    this.queuedRedirectInfo(fetchRequestId).push(redirectInfo);
  }
  takeQueuedRedirectInfo(fetchRequestId) {
    return this.queuedRedirectInfo(fetchRequestId).shift();
  }
  numRequestsInProgress() {
    return [...__classPrivateFieldGet6(this, _NetworkEventManager_httpRequestsMap, "f")].filter(([, request]) => {
      return !request.response();
    }).length;
  }
  storeRequestWillBeSent(networkRequestId, event) {
    __classPrivateFieldGet6(this, _NetworkEventManager_requestWillBeSentMap, "f").set(networkRequestId, event);
  }
  getRequestWillBeSent(networkRequestId) {
    return __classPrivateFieldGet6(this, _NetworkEventManager_requestWillBeSentMap, "f").get(networkRequestId);
  }
  forgetRequestWillBeSent(networkRequestId) {
    __classPrivateFieldGet6(this, _NetworkEventManager_requestWillBeSentMap, "f").delete(networkRequestId);
  }
  getRequestPaused(networkRequestId) {
    return __classPrivateFieldGet6(this, _NetworkEventManager_requestPausedMap, "f").get(networkRequestId);
  }
  forgetRequestPaused(networkRequestId) {
    __classPrivateFieldGet6(this, _NetworkEventManager_requestPausedMap, "f").delete(networkRequestId);
  }
  storeRequestPaused(networkRequestId, event) {
    __classPrivateFieldGet6(this, _NetworkEventManager_requestPausedMap, "f").set(networkRequestId, event);
  }
  getRequest(networkRequestId) {
    return __classPrivateFieldGet6(this, _NetworkEventManager_httpRequestsMap, "f").get(networkRequestId);
  }
  storeRequest(networkRequestId, request) {
    __classPrivateFieldGet6(this, _NetworkEventManager_httpRequestsMap, "f").set(networkRequestId, request);
  }
  forgetRequest(networkRequestId) {
    __classPrivateFieldGet6(this, _NetworkEventManager_httpRequestsMap, "f").delete(networkRequestId);
  }
  getQueuedEventGroup(networkRequestId) {
    return __classPrivateFieldGet6(this, _NetworkEventManager_queuedEventGroupMap, "f").get(networkRequestId);
  }
  queueEventGroup(networkRequestId, event) {
    __classPrivateFieldGet6(this, _NetworkEventManager_queuedEventGroupMap, "f").set(networkRequestId, event);
  }
  forgetQueuedEventGroup(networkRequestId) {
    __classPrivateFieldGet6(this, _NetworkEventManager_queuedEventGroupMap, "f").delete(networkRequestId);
  }
};
_NetworkEventManager_requestWillBeSentMap = /* @__PURE__ */ new WeakMap(), _NetworkEventManager_requestPausedMap = /* @__PURE__ */ new WeakMap(), _NetworkEventManager_httpRequestsMap = /* @__PURE__ */ new WeakMap(), _NetworkEventManager_responseReceivedExtraInfoMap = /* @__PURE__ */ new WeakMap(), _NetworkEventManager_queuedRedirectInfoMap = /* @__PURE__ */ new WeakMap(), _NetworkEventManager_queuedEventGroupMap = /* @__PURE__ */ new WeakMap();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/NetworkManager.js
var __classPrivateFieldSet5 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet7 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _NetworkManager_instances;
var _NetworkManager_client;
var _NetworkManager_ignoreHTTPSErrors;
var _NetworkManager_frameManager;
var _NetworkManager_networkEventManager;
var _NetworkManager_extraHTTPHeaders;
var _NetworkManager_credentials;
var _NetworkManager_attemptedAuthentications;
var _NetworkManager_userRequestInterceptionEnabled;
var _NetworkManager_protocolRequestInterceptionEnabled;
var _NetworkManager_userCacheDisabled;
var _NetworkManager_emulatedNetworkConditions;
var _NetworkManager_deferredInitPromise;
var _NetworkManager_updateNetworkConditions;
var _NetworkManager_updateProtocolRequestInterception;
var _NetworkManager_cacheDisabled;
var _NetworkManager_updateProtocolCacheDisabled;
var _NetworkManager_onRequestWillBeSent;
var _NetworkManager_onAuthRequired;
var _NetworkManager_onRequestPaused;
var _NetworkManager_patchRequestEventHeaders;
var _NetworkManager_onRequest;
var _NetworkManager_onRequestServedFromCache;
var _NetworkManager_handleRequestRedirect;
var _NetworkManager_emitResponseEvent;
var _NetworkManager_onResponseReceived;
var _NetworkManager_onResponseReceivedExtraInfo;
var _NetworkManager_forgetRequest;
var _NetworkManager_onLoadingFinished;
var _NetworkManager_emitLoadingFinished;
var _NetworkManager_onLoadingFailed;
var _NetworkManager_emitLoadingFailed;
var NetworkManagerEmittedEvents = {
  Request: Symbol("NetworkManager.Request"),
  RequestServedFromCache: Symbol("NetworkManager.RequestServedFromCache"),
  Response: Symbol("NetworkManager.Response"),
  RequestFailed: Symbol("NetworkManager.RequestFailed"),
  RequestFinished: Symbol("NetworkManager.RequestFinished")
};
var NetworkManager = class extends EventEmitter {
  constructor(client, ignoreHTTPSErrors, frameManager) {
    super();
    _NetworkManager_instances.add(this);
    _NetworkManager_client.set(this, void 0);
    _NetworkManager_ignoreHTTPSErrors.set(this, void 0);
    _NetworkManager_frameManager.set(this, void 0);
    _NetworkManager_networkEventManager.set(this, new NetworkEventManager());
    _NetworkManager_extraHTTPHeaders.set(this, {});
    _NetworkManager_credentials.set(this, void 0);
    _NetworkManager_attemptedAuthentications.set(this, /* @__PURE__ */ new Set());
    _NetworkManager_userRequestInterceptionEnabled.set(this, false);
    _NetworkManager_protocolRequestInterceptionEnabled.set(this, false);
    _NetworkManager_userCacheDisabled.set(this, false);
    _NetworkManager_emulatedNetworkConditions.set(this, {
      offline: false,
      upload: -1,
      download: -1,
      latency: 0
    });
    _NetworkManager_deferredInitPromise.set(this, void 0);
    __classPrivateFieldSet5(this, _NetworkManager_client, client, "f");
    __classPrivateFieldSet5(this, _NetworkManager_ignoreHTTPSErrors, ignoreHTTPSErrors, "f");
    __classPrivateFieldSet5(this, _NetworkManager_frameManager, frameManager, "f");
    __classPrivateFieldGet7(this, _NetworkManager_client, "f").on("Fetch.requestPaused", __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_onRequestPaused).bind(this));
    __classPrivateFieldGet7(this, _NetworkManager_client, "f").on("Fetch.authRequired", __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_onAuthRequired).bind(this));
    __classPrivateFieldGet7(this, _NetworkManager_client, "f").on("Network.requestWillBeSent", __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_onRequestWillBeSent).bind(this));
    __classPrivateFieldGet7(this, _NetworkManager_client, "f").on("Network.requestServedFromCache", __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_onRequestServedFromCache).bind(this));
    __classPrivateFieldGet7(this, _NetworkManager_client, "f").on("Network.responseReceived", __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_onResponseReceived).bind(this));
    __classPrivateFieldGet7(this, _NetworkManager_client, "f").on("Network.loadingFinished", __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_onLoadingFinished).bind(this));
    __classPrivateFieldGet7(this, _NetworkManager_client, "f").on("Network.loadingFailed", __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_onLoadingFailed).bind(this));
    __classPrivateFieldGet7(this, _NetworkManager_client, "f").on("Network.responseReceivedExtraInfo", __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_onResponseReceivedExtraInfo).bind(this));
  }
  /**
   * Initialize calls should avoid async dependencies between CDP calls as those
   * might not resolve until after the target is resumed causing a deadlock.
   */
  initialize() {
    if (__classPrivateFieldGet7(this, _NetworkManager_deferredInitPromise, "f")) {
      return __classPrivateFieldGet7(this, _NetworkManager_deferredInitPromise, "f");
    }
    __classPrivateFieldSet5(this, _NetworkManager_deferredInitPromise, createDebuggableDeferredPromise("NetworkManager initialization timed out"), "f");
    const init = Promise.all([
      __classPrivateFieldGet7(this, _NetworkManager_ignoreHTTPSErrors, "f") ? __classPrivateFieldGet7(this, _NetworkManager_client, "f").send("Security.setIgnoreCertificateErrors", {
        ignore: true
      }) : null,
      __classPrivateFieldGet7(this, _NetworkManager_client, "f").send("Network.enable")
    ]);
    const deferredInitPromise = __classPrivateFieldGet7(this, _NetworkManager_deferredInitPromise, "f");
    init.then(() => {
      deferredInitPromise.resolve();
    }).catch((err) => {
      deferredInitPromise.reject(err);
    });
    return __classPrivateFieldGet7(this, _NetworkManager_deferredInitPromise, "f");
  }
  async authenticate(credentials) {
    __classPrivateFieldSet5(this, _NetworkManager_credentials, credentials, "f");
    await __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_updateProtocolRequestInterception).call(this);
  }
  async setExtraHTTPHeaders(extraHTTPHeaders) {
    __classPrivateFieldSet5(this, _NetworkManager_extraHTTPHeaders, {}, "f");
    for (const key of Object.keys(extraHTTPHeaders)) {
      const value = extraHTTPHeaders[key];
      assert(isString(value), `Expected value of header "${key}" to be String, but "${typeof value}" is found.`);
      __classPrivateFieldGet7(this, _NetworkManager_extraHTTPHeaders, "f")[key.toLowerCase()] = value;
    }
    await __classPrivateFieldGet7(this, _NetworkManager_client, "f").send("Network.setExtraHTTPHeaders", {
      headers: __classPrivateFieldGet7(this, _NetworkManager_extraHTTPHeaders, "f")
    });
  }
  extraHTTPHeaders() {
    return Object.assign({}, __classPrivateFieldGet7(this, _NetworkManager_extraHTTPHeaders, "f"));
  }
  numRequestsInProgress() {
    return __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").numRequestsInProgress();
  }
  async setOfflineMode(value) {
    __classPrivateFieldGet7(this, _NetworkManager_emulatedNetworkConditions, "f").offline = value;
    await __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_updateNetworkConditions).call(this);
  }
  async emulateNetworkConditions(networkConditions2) {
    __classPrivateFieldGet7(this, _NetworkManager_emulatedNetworkConditions, "f").upload = networkConditions2 ? networkConditions2.upload : -1;
    __classPrivateFieldGet7(this, _NetworkManager_emulatedNetworkConditions, "f").download = networkConditions2 ? networkConditions2.download : -1;
    __classPrivateFieldGet7(this, _NetworkManager_emulatedNetworkConditions, "f").latency = networkConditions2 ? networkConditions2.latency : 0;
    await __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_updateNetworkConditions).call(this);
  }
  async setUserAgent(userAgent, userAgentMetadata) {
    await __classPrivateFieldGet7(this, _NetworkManager_client, "f").send("Network.setUserAgentOverride", {
      userAgent,
      userAgentMetadata
    });
  }
  async setCacheEnabled(enabled) {
    __classPrivateFieldSet5(this, _NetworkManager_userCacheDisabled, !enabled, "f");
    await __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_updateProtocolCacheDisabled).call(this);
  }
  async setRequestInterception(value) {
    __classPrivateFieldSet5(this, _NetworkManager_userRequestInterceptionEnabled, value, "f");
    await __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_updateProtocolRequestInterception).call(this);
  }
};
_NetworkManager_client = /* @__PURE__ */ new WeakMap(), _NetworkManager_ignoreHTTPSErrors = /* @__PURE__ */ new WeakMap(), _NetworkManager_frameManager = /* @__PURE__ */ new WeakMap(), _NetworkManager_networkEventManager = /* @__PURE__ */ new WeakMap(), _NetworkManager_extraHTTPHeaders = /* @__PURE__ */ new WeakMap(), _NetworkManager_credentials = /* @__PURE__ */ new WeakMap(), _NetworkManager_attemptedAuthentications = /* @__PURE__ */ new WeakMap(), _NetworkManager_userRequestInterceptionEnabled = /* @__PURE__ */ new WeakMap(), _NetworkManager_protocolRequestInterceptionEnabled = /* @__PURE__ */ new WeakMap(), _NetworkManager_userCacheDisabled = /* @__PURE__ */ new WeakMap(), _NetworkManager_emulatedNetworkConditions = /* @__PURE__ */ new WeakMap(), _NetworkManager_deferredInitPromise = /* @__PURE__ */ new WeakMap(), _NetworkManager_instances = /* @__PURE__ */ new WeakSet(), _NetworkManager_updateNetworkConditions = async function _NetworkManager_updateNetworkConditions2() {
  await __classPrivateFieldGet7(this, _NetworkManager_client, "f").send("Network.emulateNetworkConditions", {
    offline: __classPrivateFieldGet7(this, _NetworkManager_emulatedNetworkConditions, "f").offline,
    latency: __classPrivateFieldGet7(this, _NetworkManager_emulatedNetworkConditions, "f").latency,
    uploadThroughput: __classPrivateFieldGet7(this, _NetworkManager_emulatedNetworkConditions, "f").upload,
    downloadThroughput: __classPrivateFieldGet7(this, _NetworkManager_emulatedNetworkConditions, "f").download
  });
}, _NetworkManager_updateProtocolRequestInterception = async function _NetworkManager_updateProtocolRequestInterception2() {
  const enabled = __classPrivateFieldGet7(this, _NetworkManager_userRequestInterceptionEnabled, "f") || !!__classPrivateFieldGet7(this, _NetworkManager_credentials, "f");
  if (enabled === __classPrivateFieldGet7(this, _NetworkManager_protocolRequestInterceptionEnabled, "f")) {
    return;
  }
  __classPrivateFieldSet5(this, _NetworkManager_protocolRequestInterceptionEnabled, enabled, "f");
  if (enabled) {
    await Promise.all([
      __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_updateProtocolCacheDisabled).call(this),
      __classPrivateFieldGet7(this, _NetworkManager_client, "f").send("Fetch.enable", {
        handleAuthRequests: true,
        patterns: [{ urlPattern: "*" }]
      })
    ]);
  } else {
    await Promise.all([
      __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_updateProtocolCacheDisabled).call(this),
      __classPrivateFieldGet7(this, _NetworkManager_client, "f").send("Fetch.disable")
    ]);
  }
}, _NetworkManager_cacheDisabled = function _NetworkManager_cacheDisabled2() {
  return __classPrivateFieldGet7(this, _NetworkManager_userCacheDisabled, "f");
}, _NetworkManager_updateProtocolCacheDisabled = async function _NetworkManager_updateProtocolCacheDisabled2() {
  await __classPrivateFieldGet7(this, _NetworkManager_client, "f").send("Network.setCacheDisabled", {
    cacheDisabled: __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_cacheDisabled).call(this)
  });
}, _NetworkManager_onRequestWillBeSent = function _NetworkManager_onRequestWillBeSent2(event) {
  if (__classPrivateFieldGet7(this, _NetworkManager_userRequestInterceptionEnabled, "f") && !event.request.url.startsWith("data:")) {
    const { requestId: networkRequestId } = event;
    __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").storeRequestWillBeSent(networkRequestId, event);
    const requestPausedEvent = __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").getRequestPaused(networkRequestId);
    if (requestPausedEvent) {
      const { requestId: fetchRequestId } = requestPausedEvent;
      __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_patchRequestEventHeaders).call(this, event, requestPausedEvent);
      __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_onRequest).call(this, event, fetchRequestId);
      __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").forgetRequestPaused(networkRequestId);
    }
    return;
  }
  __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_onRequest).call(this, event, void 0);
}, _NetworkManager_onAuthRequired = function _NetworkManager_onAuthRequired2(event) {
  let response = "Default";
  if (__classPrivateFieldGet7(this, _NetworkManager_attemptedAuthentications, "f").has(event.requestId)) {
    response = "CancelAuth";
  } else if (__classPrivateFieldGet7(this, _NetworkManager_credentials, "f")) {
    response = "ProvideCredentials";
    __classPrivateFieldGet7(this, _NetworkManager_attemptedAuthentications, "f").add(event.requestId);
  }
  const { username, password } = __classPrivateFieldGet7(this, _NetworkManager_credentials, "f") || {
    username: void 0,
    password: void 0
  };
  __classPrivateFieldGet7(this, _NetworkManager_client, "f").send("Fetch.continueWithAuth", {
    requestId: event.requestId,
    authChallengeResponse: { response, username, password }
  }).catch(debugError);
}, _NetworkManager_onRequestPaused = function _NetworkManager_onRequestPaused2(event) {
  if (!__classPrivateFieldGet7(this, _NetworkManager_userRequestInterceptionEnabled, "f") && __classPrivateFieldGet7(this, _NetworkManager_protocolRequestInterceptionEnabled, "f")) {
    __classPrivateFieldGet7(this, _NetworkManager_client, "f").send("Fetch.continueRequest", {
      requestId: event.requestId
    }).catch(debugError);
  }
  const { networkId: networkRequestId, requestId: fetchRequestId } = event;
  if (!networkRequestId) {
    return;
  }
  const requestWillBeSentEvent = (() => {
    const requestWillBeSentEvent2 = __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").getRequestWillBeSent(networkRequestId);
    if (requestWillBeSentEvent2 && (requestWillBeSentEvent2.request.url !== event.request.url || requestWillBeSentEvent2.request.method !== event.request.method)) {
      __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").forgetRequestWillBeSent(networkRequestId);
      return;
    }
    return requestWillBeSentEvent2;
  })();
  if (requestWillBeSentEvent) {
    __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_patchRequestEventHeaders).call(this, requestWillBeSentEvent, event);
    __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_onRequest).call(this, requestWillBeSentEvent, fetchRequestId);
  } else {
    __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").storeRequestPaused(networkRequestId, event);
  }
}, _NetworkManager_patchRequestEventHeaders = function _NetworkManager_patchRequestEventHeaders2(requestWillBeSentEvent, requestPausedEvent) {
  requestWillBeSentEvent.request.headers = {
    ...requestWillBeSentEvent.request.headers,
    // includes extra headers, like: Accept, Origin
    ...requestPausedEvent.request.headers
  };
}, _NetworkManager_onRequest = function _NetworkManager_onRequest2(event, fetchRequestId) {
  let redirectChain = [];
  if (event.redirectResponse) {
    let redirectResponseExtraInfo = null;
    if (event.redirectHasExtraInfo) {
      redirectResponseExtraInfo = __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").responseExtraInfo(event.requestId).shift();
      if (!redirectResponseExtraInfo) {
        __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").queueRedirectInfo(event.requestId, {
          event,
          fetchRequestId
        });
        return;
      }
    }
    const request2 = __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").getRequest(event.requestId);
    if (request2) {
      __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_handleRequestRedirect).call(this, request2, event.redirectResponse, redirectResponseExtraInfo);
      redirectChain = request2._redirectChain;
    }
  }
  const frame = event.frameId ? __classPrivateFieldGet7(this, _NetworkManager_frameManager, "f").frame(event.frameId) : null;
  const request = new HTTPRequest(__classPrivateFieldGet7(this, _NetworkManager_client, "f"), frame, fetchRequestId, __classPrivateFieldGet7(this, _NetworkManager_userRequestInterceptionEnabled, "f"), event, redirectChain);
  __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").storeRequest(event.requestId, request);
  this.emit(NetworkManagerEmittedEvents.Request, request);
  request.finalizeInterceptions();
}, _NetworkManager_onRequestServedFromCache = function _NetworkManager_onRequestServedFromCache2(event) {
  const request = __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").getRequest(event.requestId);
  if (request) {
    request._fromMemoryCache = true;
  }
  this.emit(NetworkManagerEmittedEvents.RequestServedFromCache, request);
}, _NetworkManager_handleRequestRedirect = function _NetworkManager_handleRequestRedirect2(request, responsePayload, extraInfo) {
  const response = new HTTPResponse(__classPrivateFieldGet7(this, _NetworkManager_client, "f"), request, responsePayload, extraInfo);
  request._response = response;
  request._redirectChain.push(request);
  response._resolveBody(new Error("Response body is unavailable for redirect responses"));
  __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_forgetRequest).call(this, request, false);
  this.emit(NetworkManagerEmittedEvents.Response, response);
  this.emit(NetworkManagerEmittedEvents.RequestFinished, request);
}, _NetworkManager_emitResponseEvent = function _NetworkManager_emitResponseEvent2(responseReceived, extraInfo) {
  const request = __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").getRequest(responseReceived.requestId);
  if (!request) {
    return;
  }
  const extraInfos = __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").responseExtraInfo(responseReceived.requestId);
  if (extraInfos.length) {
    debugError(new Error("Unexpected extraInfo events for request " + responseReceived.requestId));
  }
  const response = new HTTPResponse(__classPrivateFieldGet7(this, _NetworkManager_client, "f"), request, responseReceived.response, extraInfo);
  request._response = response;
  this.emit(NetworkManagerEmittedEvents.Response, response);
}, _NetworkManager_onResponseReceived = function _NetworkManager_onResponseReceived2(event) {
  const request = __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").getRequest(event.requestId);
  let extraInfo = null;
  if (request && !request._fromMemoryCache && event.hasExtraInfo) {
    extraInfo = __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").responseExtraInfo(event.requestId).shift();
    if (!extraInfo) {
      __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").queueEventGroup(event.requestId, {
        responseReceivedEvent: event
      });
      return;
    }
  }
  __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_emitResponseEvent).call(this, event, extraInfo);
}, _NetworkManager_onResponseReceivedExtraInfo = function _NetworkManager_onResponseReceivedExtraInfo2(event) {
  const redirectInfo = __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").takeQueuedRedirectInfo(event.requestId);
  if (redirectInfo) {
    __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").responseExtraInfo(event.requestId).push(event);
    __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_onRequest).call(this, redirectInfo.event, redirectInfo.fetchRequestId);
    return;
  }
  const queuedEvents = __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").getQueuedEventGroup(event.requestId);
  if (queuedEvents) {
    __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").forgetQueuedEventGroup(event.requestId);
    __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_emitResponseEvent).call(this, queuedEvents.responseReceivedEvent, event);
    if (queuedEvents.loadingFinishedEvent) {
      __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_emitLoadingFinished).call(this, queuedEvents.loadingFinishedEvent);
    }
    if (queuedEvents.loadingFailedEvent) {
      __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_emitLoadingFailed).call(this, queuedEvents.loadingFailedEvent);
    }
    return;
  }
  __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").responseExtraInfo(event.requestId).push(event);
}, _NetworkManager_forgetRequest = function _NetworkManager_forgetRequest2(request, events) {
  const requestId = request._requestId;
  const interceptionId = request._interceptionId;
  __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").forgetRequest(requestId);
  interceptionId !== void 0 && __classPrivateFieldGet7(this, _NetworkManager_attemptedAuthentications, "f").delete(interceptionId);
  if (events) {
    __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").forget(requestId);
  }
}, _NetworkManager_onLoadingFinished = function _NetworkManager_onLoadingFinished2(event) {
  const queuedEvents = __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").getQueuedEventGroup(event.requestId);
  if (queuedEvents) {
    queuedEvents.loadingFinishedEvent = event;
  } else {
    __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_emitLoadingFinished).call(this, event);
  }
}, _NetworkManager_emitLoadingFinished = function _NetworkManager_emitLoadingFinished2(event) {
  var _a2;
  const request = __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").getRequest(event.requestId);
  if (!request) {
    return;
  }
  if (request.response()) {
    (_a2 = request.response()) === null || _a2 === void 0 ? void 0 : _a2._resolveBody(null);
  }
  __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_forgetRequest).call(this, request, true);
  this.emit(NetworkManagerEmittedEvents.RequestFinished, request);
}, _NetworkManager_onLoadingFailed = function _NetworkManager_onLoadingFailed2(event) {
  const queuedEvents = __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").getQueuedEventGroup(event.requestId);
  if (queuedEvents) {
    queuedEvents.loadingFailedEvent = event;
  } else {
    __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_emitLoadingFailed).call(this, event);
  }
}, _NetworkManager_emitLoadingFailed = function _NetworkManager_emitLoadingFailed2(event) {
  const request = __classPrivateFieldGet7(this, _NetworkManager_networkEventManager, "f").getRequest(event.requestId);
  if (!request) {
    return;
  }
  request._failureText = event.errorText;
  const response = request.response();
  if (response) {
    response._resolveBody(null);
  }
  __classPrivateFieldGet7(this, _NetworkManager_instances, "m", _NetworkManager_forgetRequest).call(this, request, true);
  this.emit(NetworkManagerEmittedEvents.RequestFailed, request);
};

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/FrameManager.js
var __classPrivateFieldSet6 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet8 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FrameManager_instances;
var _FrameManager_page;
var _FrameManager_networkManager;
var _FrameManager_timeoutSettings;
var _FrameManager_frames;
var _FrameManager_contextIdToContext;
var _FrameManager_isolatedWorlds;
var _FrameManager_mainFrame;
var _FrameManager_client;
var _FrameManager_framesPendingTargetInit;
var _FrameManager_framesPendingAttachment;
var _FrameManager_onLifecycleEvent;
var _FrameManager_onFrameStartedLoading;
var _FrameManager_onFrameStoppedLoading;
var _FrameManager_handleFrameTree;
var _FrameManager_onFrameAttached;
var _FrameManager_onFrameNavigated;
var _FrameManager_createIsolatedWorld;
var _FrameManager_onFrameNavigatedWithinDocument;
var _FrameManager_onFrameDetached;
var _FrameManager_onExecutionContextCreated;
var _FrameManager_onExecutionContextDestroyed;
var _FrameManager_onExecutionContextsCleared;
var _FrameManager_removeFramesRecursively;
var UTILITY_WORLD_NAME = "__puppeteer_utility_world__";
var FrameManagerEmittedEvents = {
  FrameAttached: Symbol("FrameManager.FrameAttached"),
  FrameNavigated: Symbol("FrameManager.FrameNavigated"),
  FrameDetached: Symbol("FrameManager.FrameDetached"),
  FrameSwapped: Symbol("FrameManager.FrameSwapped"),
  LifecycleEvent: Symbol("FrameManager.LifecycleEvent"),
  FrameNavigatedWithinDocument: Symbol("FrameManager.FrameNavigatedWithinDocument"),
  ExecutionContextCreated: Symbol("FrameManager.ExecutionContextCreated"),
  ExecutionContextDestroyed: Symbol("FrameManager.ExecutionContextDestroyed")
};
var FrameManager = class extends EventEmitter {
  constructor(client, page, ignoreHTTPSErrors, timeoutSettings) {
    super();
    _FrameManager_instances.add(this);
    _FrameManager_page.set(this, void 0);
    _FrameManager_networkManager.set(this, void 0);
    _FrameManager_timeoutSettings.set(this, void 0);
    _FrameManager_frames.set(this, /* @__PURE__ */ new Map());
    _FrameManager_contextIdToContext.set(this, /* @__PURE__ */ new Map());
    _FrameManager_isolatedWorlds.set(this, /* @__PURE__ */ new Set());
    _FrameManager_mainFrame.set(this, void 0);
    _FrameManager_client.set(this, void 0);
    _FrameManager_framesPendingTargetInit.set(this, /* @__PURE__ */ new Map());
    _FrameManager_framesPendingAttachment.set(this, /* @__PURE__ */ new Map());
    __classPrivateFieldSet6(this, _FrameManager_client, client, "f");
    __classPrivateFieldSet6(this, _FrameManager_page, page, "f");
    __classPrivateFieldSet6(this, _FrameManager_networkManager, new NetworkManager(client, ignoreHTTPSErrors, this), "f");
    __classPrivateFieldSet6(this, _FrameManager_timeoutSettings, timeoutSettings, "f");
    this.setupEventListeners(__classPrivateFieldGet8(this, _FrameManager_client, "f"));
  }
  get timeoutSettings() {
    return __classPrivateFieldGet8(this, _FrameManager_timeoutSettings, "f");
  }
  get networkManager() {
    return __classPrivateFieldGet8(this, _FrameManager_networkManager, "f");
  }
  get client() {
    return __classPrivateFieldGet8(this, _FrameManager_client, "f");
  }
  setupEventListeners(session) {
    session.on("Page.frameAttached", (event) => {
      __classPrivateFieldGet8(this, _FrameManager_instances, "m", _FrameManager_onFrameAttached).call(this, session, event.frameId, event.parentFrameId);
    });
    session.on("Page.frameNavigated", (event) => {
      __classPrivateFieldGet8(this, _FrameManager_instances, "m", _FrameManager_onFrameNavigated).call(this, event.frame);
    });
    session.on("Page.navigatedWithinDocument", (event) => {
      __classPrivateFieldGet8(this, _FrameManager_instances, "m", _FrameManager_onFrameNavigatedWithinDocument).call(this, event.frameId, event.url);
    });
    session.on("Page.frameDetached", (event) => {
      __classPrivateFieldGet8(this, _FrameManager_instances, "m", _FrameManager_onFrameDetached).call(this, event.frameId, event.reason);
    });
    session.on("Page.frameStartedLoading", (event) => {
      __classPrivateFieldGet8(this, _FrameManager_instances, "m", _FrameManager_onFrameStartedLoading).call(this, event.frameId);
    });
    session.on("Page.frameStoppedLoading", (event) => {
      __classPrivateFieldGet8(this, _FrameManager_instances, "m", _FrameManager_onFrameStoppedLoading).call(this, event.frameId);
    });
    session.on("Runtime.executionContextCreated", (event) => {
      __classPrivateFieldGet8(this, _FrameManager_instances, "m", _FrameManager_onExecutionContextCreated).call(this, event.context, session);
    });
    session.on("Runtime.executionContextDestroyed", (event) => {
      __classPrivateFieldGet8(this, _FrameManager_instances, "m", _FrameManager_onExecutionContextDestroyed).call(this, event.executionContextId, session);
    });
    session.on("Runtime.executionContextsCleared", () => {
      __classPrivateFieldGet8(this, _FrameManager_instances, "m", _FrameManager_onExecutionContextsCleared).call(this, session);
    });
    session.on("Page.lifecycleEvent", (event) => {
      __classPrivateFieldGet8(this, _FrameManager_instances, "m", _FrameManager_onLifecycleEvent).call(this, event);
    });
  }
  async initialize(targetId, client = __classPrivateFieldGet8(this, _FrameManager_client, "f")) {
    var _a2;
    try {
      if (!__classPrivateFieldGet8(this, _FrameManager_framesPendingTargetInit, "f").has(targetId)) {
        __classPrivateFieldGet8(this, _FrameManager_framesPendingTargetInit, "f").set(targetId, createDebuggableDeferredPromise(`Waiting for target frame ${targetId} failed`));
      }
      const result = await Promise.all([
        client.send("Page.enable"),
        client.send("Page.getFrameTree")
      ]);
      const { frameTree } = result[1];
      __classPrivateFieldGet8(this, _FrameManager_instances, "m", _FrameManager_handleFrameTree).call(this, client, frameTree);
      await Promise.all([
        client.send("Page.setLifecycleEventsEnabled", { enabled: true }),
        client.send("Runtime.enable").then(() => {
          return __classPrivateFieldGet8(this, _FrameManager_instances, "m", _FrameManager_createIsolatedWorld).call(this, client, UTILITY_WORLD_NAME);
        }),
        // TODO: Network manager is not aware of OOP iframes yet.
        client === __classPrivateFieldGet8(this, _FrameManager_client, "f") ? __classPrivateFieldGet8(this, _FrameManager_networkManager, "f").initialize() : Promise.resolve()
      ]);
    } catch (error) {
      if (isErrorLike(error) && (error.message.includes("Target closed") || error.message.includes("Session closed"))) {
        return;
      }
      throw error;
    } finally {
      (_a2 = __classPrivateFieldGet8(this, _FrameManager_framesPendingTargetInit, "f").get(targetId)) === null || _a2 === void 0 ? void 0 : _a2.resolve();
      __classPrivateFieldGet8(this, _FrameManager_framesPendingTargetInit, "f").delete(targetId);
    }
  }
  executionContextById(contextId, session = __classPrivateFieldGet8(this, _FrameManager_client, "f")) {
    const key = `${session.id()}:${contextId}`;
    const context = __classPrivateFieldGet8(this, _FrameManager_contextIdToContext, "f").get(key);
    assert(context, "INTERNAL ERROR: missing context with id = " + contextId);
    return context;
  }
  page() {
    return __classPrivateFieldGet8(this, _FrameManager_page, "f");
  }
  mainFrame() {
    assert(__classPrivateFieldGet8(this, _FrameManager_mainFrame, "f"), "Requesting main frame too early!");
    return __classPrivateFieldGet8(this, _FrameManager_mainFrame, "f");
  }
  frames() {
    return Array.from(__classPrivateFieldGet8(this, _FrameManager_frames, "f").values());
  }
  frame(frameId) {
    return __classPrivateFieldGet8(this, _FrameManager_frames, "f").get(frameId) || null;
  }
  onAttachedToTarget(target) {
    if (target._getTargetInfo().type !== "iframe") {
      return;
    }
    const frame = __classPrivateFieldGet8(this, _FrameManager_frames, "f").get(target._getTargetInfo().targetId);
    if (frame) {
      frame.updateClient(target._session());
    }
    this.setupEventListeners(target._session());
    this.initialize(target._getTargetInfo().targetId, target._session());
  }
  onDetachedFromTarget(target) {
    const frame = __classPrivateFieldGet8(this, _FrameManager_frames, "f").get(target._targetId);
    if (frame && frame.isOOPFrame()) {
      __classPrivateFieldGet8(this, _FrameManager_instances, "m", _FrameManager_removeFramesRecursively).call(this, frame);
    }
  }
};
_FrameManager_page = /* @__PURE__ */ new WeakMap(), _FrameManager_networkManager = /* @__PURE__ */ new WeakMap(), _FrameManager_timeoutSettings = /* @__PURE__ */ new WeakMap(), _FrameManager_frames = /* @__PURE__ */ new WeakMap(), _FrameManager_contextIdToContext = /* @__PURE__ */ new WeakMap(), _FrameManager_isolatedWorlds = /* @__PURE__ */ new WeakMap(), _FrameManager_mainFrame = /* @__PURE__ */ new WeakMap(), _FrameManager_client = /* @__PURE__ */ new WeakMap(), _FrameManager_framesPendingTargetInit = /* @__PURE__ */ new WeakMap(), _FrameManager_framesPendingAttachment = /* @__PURE__ */ new WeakMap(), _FrameManager_instances = /* @__PURE__ */ new WeakSet(), _FrameManager_onLifecycleEvent = function _FrameManager_onLifecycleEvent2(event) {
  const frame = __classPrivateFieldGet8(this, _FrameManager_frames, "f").get(event.frameId);
  if (!frame) {
    return;
  }
  frame._onLifecycleEvent(event.loaderId, event.name);
  this.emit(FrameManagerEmittedEvents.LifecycleEvent, frame);
}, _FrameManager_onFrameStartedLoading = function _FrameManager_onFrameStartedLoading2(frameId) {
  const frame = __classPrivateFieldGet8(this, _FrameManager_frames, "f").get(frameId);
  if (!frame) {
    return;
  }
  frame._onLoadingStarted();
}, _FrameManager_onFrameStoppedLoading = function _FrameManager_onFrameStoppedLoading2(frameId) {
  const frame = __classPrivateFieldGet8(this, _FrameManager_frames, "f").get(frameId);
  if (!frame) {
    return;
  }
  frame._onLoadingStopped();
  this.emit(FrameManagerEmittedEvents.LifecycleEvent, frame);
}, _FrameManager_handleFrameTree = function _FrameManager_handleFrameTree2(session, frameTree) {
  if (frameTree.frame.parentId) {
    __classPrivateFieldGet8(this, _FrameManager_instances, "m", _FrameManager_onFrameAttached).call(this, session, frameTree.frame.id, frameTree.frame.parentId);
  }
  __classPrivateFieldGet8(this, _FrameManager_instances, "m", _FrameManager_onFrameNavigated).call(this, frameTree.frame);
  if (!frameTree.childFrames) {
    return;
  }
  for (const child of frameTree.childFrames) {
    __classPrivateFieldGet8(this, _FrameManager_instances, "m", _FrameManager_handleFrameTree2).call(this, session, child);
  }
}, _FrameManager_onFrameAttached = function _FrameManager_onFrameAttached2(session, frameId, parentFrameId) {
  if (__classPrivateFieldGet8(this, _FrameManager_frames, "f").has(frameId)) {
    const frame2 = __classPrivateFieldGet8(this, _FrameManager_frames, "f").get(frameId);
    if (session && frame2.isOOPFrame()) {
      frame2.updateClient(session);
    }
    return;
  }
  const parentFrame = __classPrivateFieldGet8(this, _FrameManager_frames, "f").get(parentFrameId);
  const complete = (parentFrame2) => {
    assert(parentFrame2, `Parent frame ${parentFrameId} not found`);
    const frame2 = new Frame(this, parentFrame2, frameId, session);
    __classPrivateFieldGet8(this, _FrameManager_frames, "f").set(frame2._id, frame2);
    this.emit(FrameManagerEmittedEvents.FrameAttached, frame2);
  };
  if (parentFrame) {
    return complete(parentFrame);
  }
  const frame = __classPrivateFieldGet8(this, _FrameManager_framesPendingTargetInit, "f").get(parentFrameId);
  if (frame) {
    if (!__classPrivateFieldGet8(this, _FrameManager_framesPendingAttachment, "f").has(frameId)) {
      __classPrivateFieldGet8(this, _FrameManager_framesPendingAttachment, "f").set(frameId, createDebuggableDeferredPromise(`Waiting for frame ${frameId} to attach failed`));
    }
    frame.then(() => {
      var _a2;
      complete(__classPrivateFieldGet8(this, _FrameManager_frames, "f").get(parentFrameId));
      (_a2 = __classPrivateFieldGet8(this, _FrameManager_framesPendingAttachment, "f").get(frameId)) === null || _a2 === void 0 ? void 0 : _a2.resolve();
      __classPrivateFieldGet8(this, _FrameManager_framesPendingAttachment, "f").delete(frameId);
    });
    return;
  }
  throw new Error(`Parent frame ${parentFrameId} not found`);
}, _FrameManager_onFrameNavigated = function _FrameManager_onFrameNavigated2(framePayload) {
  const frameId = framePayload.id;
  const isMainFrame = !framePayload.parentId;
  const frame = isMainFrame ? __classPrivateFieldGet8(this, _FrameManager_mainFrame, "f") : __classPrivateFieldGet8(this, _FrameManager_frames, "f").get(frameId);
  const complete = (frame2) => {
    assert(isMainFrame || frame2, `Missing frame isMainFrame=${isMainFrame}, frameId=${frameId}`);
    if (frame2) {
      for (const child of frame2.childFrames()) {
        __classPrivateFieldGet8(this, _FrameManager_instances, "m", _FrameManager_removeFramesRecursively).call(this, child);
      }
    }
    if (isMainFrame) {
      if (frame2) {
        __classPrivateFieldGet8(this, _FrameManager_frames, "f").delete(frame2._id);
        frame2._id = frameId;
      } else {
        frame2 = new Frame(this, null, frameId, __classPrivateFieldGet8(this, _FrameManager_client, "f"));
      }
      __classPrivateFieldGet8(this, _FrameManager_frames, "f").set(frameId, frame2);
      __classPrivateFieldSet6(this, _FrameManager_mainFrame, frame2, "f");
    }
    assert(frame2);
    frame2._navigated(framePayload);
    this.emit(FrameManagerEmittedEvents.FrameNavigated, frame2);
  };
  const pendingFrame = __classPrivateFieldGet8(this, _FrameManager_framesPendingAttachment, "f").get(frameId);
  if (pendingFrame) {
    pendingFrame.then(() => {
      complete(isMainFrame ? __classPrivateFieldGet8(this, _FrameManager_mainFrame, "f") : __classPrivateFieldGet8(this, _FrameManager_frames, "f").get(frameId));
    });
  } else {
    complete(frame);
  }
}, _FrameManager_createIsolatedWorld = async function _FrameManager_createIsolatedWorld2(session, name) {
  const key = `${session.id()}:${name}`;
  if (__classPrivateFieldGet8(this, _FrameManager_isolatedWorlds, "f").has(key)) {
    return;
  }
  await session.send("Page.addScriptToEvaluateOnNewDocument", {
    source: `//# sourceURL=${EVALUATION_SCRIPT_URL}`,
    worldName: name
  });
  await Promise.all(this.frames().filter((frame) => {
    return frame._client() === session;
  }).map((frame) => {
    return session.send("Page.createIsolatedWorld", {
      frameId: frame._id,
      worldName: name,
      grantUniveralAccess: true
    }).catch(debugError);
  }));
  __classPrivateFieldGet8(this, _FrameManager_isolatedWorlds, "f").add(key);
}, _FrameManager_onFrameNavigatedWithinDocument = function _FrameManager_onFrameNavigatedWithinDocument2(frameId, url) {
  const frame = __classPrivateFieldGet8(this, _FrameManager_frames, "f").get(frameId);
  if (!frame) {
    return;
  }
  frame._navigatedWithinDocument(url);
  this.emit(FrameManagerEmittedEvents.FrameNavigatedWithinDocument, frame);
  this.emit(FrameManagerEmittedEvents.FrameNavigated, frame);
}, _FrameManager_onFrameDetached = function _FrameManager_onFrameDetached2(frameId, reason) {
  const frame = __classPrivateFieldGet8(this, _FrameManager_frames, "f").get(frameId);
  if (reason === "remove") {
    if (frame) {
      __classPrivateFieldGet8(this, _FrameManager_instances, "m", _FrameManager_removeFramesRecursively).call(this, frame);
    }
  } else if (reason === "swap") {
    this.emit(FrameManagerEmittedEvents.FrameSwapped, frame);
  }
}, _FrameManager_onExecutionContextCreated = function _FrameManager_onExecutionContextCreated2(contextPayload, session) {
  const auxData = contextPayload.auxData;
  const frameId = auxData && auxData.frameId;
  const frame = typeof frameId === "string" ? __classPrivateFieldGet8(this, _FrameManager_frames, "f").get(frameId) : void 0;
  let world;
  if (frame) {
    if (frame._client() !== session) {
      return;
    }
    if (contextPayload.auxData && !!contextPayload.auxData["isDefault"]) {
      world = frame.worlds[MAIN_WORLD];
    } else if (contextPayload.name === UTILITY_WORLD_NAME && !frame.worlds[PUPPETEER_WORLD].hasContext()) {
      world = frame.worlds[PUPPETEER_WORLD];
    }
  }
  const context = new ExecutionContext((frame === null || frame === void 0 ? void 0 : frame._client()) || __classPrivateFieldGet8(this, _FrameManager_client, "f"), contextPayload, world);
  if (world) {
    world.setContext(context);
  }
  const key = `${session.id()}:${contextPayload.id}`;
  __classPrivateFieldGet8(this, _FrameManager_contextIdToContext, "f").set(key, context);
}, _FrameManager_onExecutionContextDestroyed = function _FrameManager_onExecutionContextDestroyed2(executionContextId, session) {
  const key = `${session.id()}:${executionContextId}`;
  const context = __classPrivateFieldGet8(this, _FrameManager_contextIdToContext, "f").get(key);
  if (!context) {
    return;
  }
  __classPrivateFieldGet8(this, _FrameManager_contextIdToContext, "f").delete(key);
  if (context._world) {
    context._world.clearContext();
  }
}, _FrameManager_onExecutionContextsCleared = function _FrameManager_onExecutionContextsCleared2(session) {
  for (const [key, context] of __classPrivateFieldGet8(this, _FrameManager_contextIdToContext, "f").entries()) {
    if (context._client !== session) {
      continue;
    }
    if (context._world) {
      context._world.clearContext();
    }
    __classPrivateFieldGet8(this, _FrameManager_contextIdToContext, "f").delete(key);
  }
}, _FrameManager_removeFramesRecursively = function _FrameManager_removeFramesRecursively2(frame) {
  for (const child of frame.childFrames()) {
    __classPrivateFieldGet8(this, _FrameManager_instances, "m", _FrameManager_removeFramesRecursively2).call(this, child);
  }
  frame._detach();
  __classPrivateFieldGet8(this, _FrameManager_frames, "f").delete(frame._id);
  this.emit(FrameManagerEmittedEvents.FrameDetached, frame);
};

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Connection.js
init_checked_fetch();
init_modules_watch_stub();
var __classPrivateFieldSet7 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet9 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Connection_instances;
var _Connection_url;
var _Connection_transport;
var _Connection_delay;
var _Connection_lastId;
var _Connection_sessions;
var _Connection_closed;
var _Connection_callbacks;
var _Connection_manuallyAttached;
var _Connection_onClose;
var _CDPSession_sessionId;
var _CDPSession_targetType;
var _CDPSession_callbacks;
var _CDPSession_connection;
var debugProtocolSend = debug("puppeteer:protocol:SEND \u25BA");
var debugProtocolReceive = debug("puppeteer:protocol:RECV \u25C0");
var ConnectionEmittedEvents = {
  Disconnected: Symbol("Connection.Disconnected")
};
var Connection = class extends EventEmitter {
  constructor(url, transport, delay = 0) {
    super();
    _Connection_instances.add(this);
    _Connection_url.set(this, void 0);
    _Connection_transport.set(this, void 0);
    _Connection_delay.set(this, void 0);
    _Connection_lastId.set(this, 0);
    _Connection_sessions.set(this, /* @__PURE__ */ new Map());
    _Connection_closed.set(this, false);
    _Connection_callbacks.set(this, /* @__PURE__ */ new Map());
    _Connection_manuallyAttached.set(this, /* @__PURE__ */ new Set());
    __classPrivateFieldSet7(this, _Connection_url, url, "f");
    __classPrivateFieldSet7(this, _Connection_delay, delay, "f");
    __classPrivateFieldSet7(this, _Connection_transport, transport, "f");
    __classPrivateFieldGet9(this, _Connection_transport, "f").onmessage = this.onMessage.bind(this);
    __classPrivateFieldGet9(this, _Connection_transport, "f").onclose = __classPrivateFieldGet9(this, _Connection_instances, "m", _Connection_onClose).bind(this);
  }
  static fromSession(session) {
    return session.connection();
  }
  /**
   * @internal
   */
  get _closed() {
    return __classPrivateFieldGet9(this, _Connection_closed, "f");
  }
  /**
   * @internal
   */
  get _sessions() {
    return __classPrivateFieldGet9(this, _Connection_sessions, "f");
  }
  /**
   * @param sessionId - The session id
   * @returns The current CDP session if it exists
   */
  session(sessionId) {
    return __classPrivateFieldGet9(this, _Connection_sessions, "f").get(sessionId) || null;
  }
  url() {
    return __classPrivateFieldGet9(this, _Connection_url, "f");
  }
  send(method, ...paramArgs) {
    const params = paramArgs.length ? paramArgs[0] : void 0;
    const id = this._rawSend({ method, params });
    return new Promise((resolve, reject) => {
      __classPrivateFieldGet9(this, _Connection_callbacks, "f").set(id, {
        resolve,
        reject,
        error: new ProtocolError(),
        method
      });
    });
  }
  /**
   * @internal
   */
  _rawSend(message) {
    var _a2;
    const id = __classPrivateFieldSet7(this, _Connection_lastId, (_a2 = __classPrivateFieldGet9(this, _Connection_lastId, "f"), ++_a2), "f");
    const stringifiedMessage = JSON.stringify(Object.assign({}, message, { id }));
    debugProtocolSend(stringifiedMessage);
    __classPrivateFieldGet9(this, _Connection_transport, "f").send(stringifiedMessage);
    return id;
  }
  /**
   * @internal
   */
  async onMessage(message) {
    if (__classPrivateFieldGet9(this, _Connection_delay, "f")) {
      await new Promise((f) => {
        return setTimeout(f, __classPrivateFieldGet9(this, _Connection_delay, "f"));
      });
    }
    debugProtocolReceive(message);
    const object = JSON.parse(message);
    if (object.method === "Target.attachedToTarget") {
      const sessionId = object.params.sessionId;
      const session = new CDPSession(this, object.params.targetInfo.type, sessionId);
      __classPrivateFieldGet9(this, _Connection_sessions, "f").set(sessionId, session);
      this.emit("sessionattached", session);
      const parentSession = __classPrivateFieldGet9(this, _Connection_sessions, "f").get(object.sessionId);
      if (parentSession) {
        parentSession.emit("sessionattached", session);
      }
    } else if (object.method === "Target.detachedFromTarget") {
      const session = __classPrivateFieldGet9(this, _Connection_sessions, "f").get(object.params.sessionId);
      if (session) {
        session._onClosed();
        __classPrivateFieldGet9(this, _Connection_sessions, "f").delete(object.params.sessionId);
        this.emit("sessiondetached", session);
        const parentSession = __classPrivateFieldGet9(this, _Connection_sessions, "f").get(object.sessionId);
        if (parentSession) {
          parentSession.emit("sessiondetached", session);
        }
      }
    }
    if (object.sessionId) {
      const session = __classPrivateFieldGet9(this, _Connection_sessions, "f").get(object.sessionId);
      if (session) {
        session._onMessage(object);
      }
    } else if (object.id) {
      const callback = __classPrivateFieldGet9(this, _Connection_callbacks, "f").get(object.id);
      if (callback) {
        __classPrivateFieldGet9(this, _Connection_callbacks, "f").delete(object.id);
        if (object.error) {
          callback.reject(createProtocolError(callback.error, callback.method, object));
        } else {
          callback.resolve(object.result);
        }
      }
    } else {
      this.emit(object.method, object.params);
    }
  }
  dispose() {
    __classPrivateFieldGet9(this, _Connection_instances, "m", _Connection_onClose).call(this);
    __classPrivateFieldGet9(this, _Connection_transport, "f").close();
  }
  /**
   * @internal
   */
  isAutoAttached(targetId) {
    return !__classPrivateFieldGet9(this, _Connection_manuallyAttached, "f").has(targetId);
  }
  /**
   * @internal
   */
  async _createSession(targetInfo, isAutoAttachEmulated = true) {
    if (!isAutoAttachEmulated) {
      __classPrivateFieldGet9(this, _Connection_manuallyAttached, "f").add(targetInfo.targetId);
    }
    const { sessionId } = await this.send("Target.attachToTarget", {
      targetId: targetInfo.targetId,
      flatten: true
    });
    __classPrivateFieldGet9(this, _Connection_manuallyAttached, "f").delete(targetInfo.targetId);
    const session = __classPrivateFieldGet9(this, _Connection_sessions, "f").get(sessionId);
    if (!session) {
      throw new Error("CDPSession creation failed.");
    }
    return session;
  }
  /**
   * @param targetInfo - The target info
   * @returns The CDP session that is created
   */
  async createSession(targetInfo) {
    return await this._createSession(targetInfo, false);
  }
};
_Connection_url = /* @__PURE__ */ new WeakMap(), _Connection_transport = /* @__PURE__ */ new WeakMap(), _Connection_delay = /* @__PURE__ */ new WeakMap(), _Connection_lastId = /* @__PURE__ */ new WeakMap(), _Connection_sessions = /* @__PURE__ */ new WeakMap(), _Connection_closed = /* @__PURE__ */ new WeakMap(), _Connection_callbacks = /* @__PURE__ */ new WeakMap(), _Connection_manuallyAttached = /* @__PURE__ */ new WeakMap(), _Connection_instances = /* @__PURE__ */ new WeakSet(), _Connection_onClose = function _Connection_onClose2() {
  if (__classPrivateFieldGet9(this, _Connection_closed, "f")) {
    return;
  }
  __classPrivateFieldSet7(this, _Connection_closed, true, "f");
  __classPrivateFieldGet9(this, _Connection_transport, "f").onmessage = void 0;
  __classPrivateFieldGet9(this, _Connection_transport, "f").onclose = void 0;
  for (const callback of __classPrivateFieldGet9(this, _Connection_callbacks, "f").values()) {
    callback.reject(rewriteError2(callback.error, `Protocol error (${callback.method}): Target closed.`));
  }
  __classPrivateFieldGet9(this, _Connection_callbacks, "f").clear();
  for (const session of __classPrivateFieldGet9(this, _Connection_sessions, "f").values()) {
    session._onClosed();
  }
  __classPrivateFieldGet9(this, _Connection_sessions, "f").clear();
  this.emit(ConnectionEmittedEvents.Disconnected);
};
var CDPSessionEmittedEvents = {
  Disconnected: Symbol("CDPSession.Disconnected")
};
var CDPSession = class extends EventEmitter {
  /**
   * @internal
   */
  constructor(connection, targetType, sessionId) {
    super();
    _CDPSession_sessionId.set(this, void 0);
    _CDPSession_targetType.set(this, void 0);
    _CDPSession_callbacks.set(this, /* @__PURE__ */ new Map());
    _CDPSession_connection.set(this, void 0);
    __classPrivateFieldSet7(this, _CDPSession_connection, connection, "f");
    __classPrivateFieldSet7(this, _CDPSession_targetType, targetType, "f");
    __classPrivateFieldSet7(this, _CDPSession_sessionId, sessionId, "f");
  }
  connection() {
    return __classPrivateFieldGet9(this, _CDPSession_connection, "f");
  }
  send(method, ...paramArgs) {
    if (!__classPrivateFieldGet9(this, _CDPSession_connection, "f")) {
      return Promise.reject(new Error(`Protocol error (${method}): Session closed. Most likely the ${__classPrivateFieldGet9(this, _CDPSession_targetType, "f")} has been closed.`));
    }
    const params = paramArgs.length ? paramArgs[0] : void 0;
    const id = __classPrivateFieldGet9(this, _CDPSession_connection, "f")._rawSend({
      sessionId: __classPrivateFieldGet9(this, _CDPSession_sessionId, "f"),
      method,
      params
    });
    return new Promise((resolve, reject) => {
      __classPrivateFieldGet9(this, _CDPSession_callbacks, "f").set(id, {
        resolve,
        reject,
        error: new ProtocolError(),
        method
      });
    });
  }
  /**
   * @internal
   */
  _onMessage(object) {
    const callback = object.id ? __classPrivateFieldGet9(this, _CDPSession_callbacks, "f").get(object.id) : void 0;
    if (object.id && callback) {
      __classPrivateFieldGet9(this, _CDPSession_callbacks, "f").delete(object.id);
      if (object.error) {
        callback.reject(createProtocolError(callback.error, callback.method, object));
      } else {
        callback.resolve(object.result);
      }
    } else {
      assert(!object.id);
      this.emit(object.method, object.params);
    }
  }
  /**
   * Detaches the cdpSession from the target. Once detached, the cdpSession object
   * won't emit any events and can't be used to send messages.
   */
  async detach() {
    if (!__classPrivateFieldGet9(this, _CDPSession_connection, "f")) {
      throw new Error(`Session already detached. Most likely the ${__classPrivateFieldGet9(this, _CDPSession_targetType, "f")} has been closed.`);
    }
    await __classPrivateFieldGet9(this, _CDPSession_connection, "f").send("Target.detachFromTarget", {
      sessionId: __classPrivateFieldGet9(this, _CDPSession_sessionId, "f")
    });
  }
  /**
   * @internal
   */
  _onClosed() {
    for (const callback of __classPrivateFieldGet9(this, _CDPSession_callbacks, "f").values()) {
      callback.reject(rewriteError2(callback.error, `Protocol error (${callback.method}): Target closed.`));
    }
    __classPrivateFieldGet9(this, _CDPSession_callbacks, "f").clear();
    __classPrivateFieldSet7(this, _CDPSession_connection, void 0, "f");
    this.emit(CDPSessionEmittedEvents.Disconnected);
  }
  /**
   * Returns the session's id.
   */
  id() {
    return __classPrivateFieldGet9(this, _CDPSession_sessionId, "f");
  }
};
_CDPSession_sessionId = /* @__PURE__ */ new WeakMap(), _CDPSession_targetType = /* @__PURE__ */ new WeakMap(), _CDPSession_callbacks = /* @__PURE__ */ new WeakMap(), _CDPSession_connection = /* @__PURE__ */ new WeakMap();
function createProtocolError(error, method, object) {
  let message = `Protocol error (${method}): ${object.error.message}`;
  if ("data" in object.error) {
    message += ` ${object.error.data}`;
  }
  return rewriteError2(error, message, object.error.message);
}
function rewriteError2(error, message, originalMessage) {
  error.message = message;
  error.originalMessage = originalMessage !== null && originalMessage !== void 0 ? originalMessage : error.originalMessage;
  return error;
}

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/LifecycleWatcher.js
var __classPrivateFieldSet8 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet10 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LifecycleWatcher_instances;
var _LifecycleWatcher_expectedLifecycle;
var _LifecycleWatcher_frameManager;
var _LifecycleWatcher_frame;
var _LifecycleWatcher_timeout;
var _LifecycleWatcher_navigationRequest;
var _LifecycleWatcher_eventListeners;
var _LifecycleWatcher_initialLoaderId;
var _LifecycleWatcher_sameDocumentNavigationCompleteCallback;
var _LifecycleWatcher_sameDocumentNavigationPromise;
var _LifecycleWatcher_lifecycleCallback;
var _LifecycleWatcher_lifecyclePromise;
var _LifecycleWatcher_newDocumentNavigationCompleteCallback;
var _LifecycleWatcher_newDocumentNavigationPromise;
var _LifecycleWatcher_terminationCallback;
var _LifecycleWatcher_terminationPromise;
var _LifecycleWatcher_timeoutPromise;
var _LifecycleWatcher_maximumTimer;
var _LifecycleWatcher_hasSameDocumentNavigation;
var _LifecycleWatcher_swapped;
var _LifecycleWatcher_navigationResponseReceived;
var _LifecycleWatcher_onRequest;
var _LifecycleWatcher_onResponse;
var _LifecycleWatcher_onFrameDetached;
var _LifecycleWatcher_terminate;
var _LifecycleWatcher_createTimeoutPromise;
var _LifecycleWatcher_navigatedWithinDocument;
var _LifecycleWatcher_navigated;
var _LifecycleWatcher_frameSwapped;
var _LifecycleWatcher_checkLifecycleComplete;
var puppeteerToProtocolLifecycle = /* @__PURE__ */ new Map([
  ["load", "load"],
  ["domcontentloaded", "DOMContentLoaded"],
  ["networkidle0", "networkIdle"],
  ["networkidle2", "networkAlmostIdle"]
]);
var noop = () => {
};
var LifecycleWatcher = class {
  constructor(frameManager, frame, waitUntil, timeout) {
    _LifecycleWatcher_instances.add(this);
    _LifecycleWatcher_expectedLifecycle.set(this, void 0);
    _LifecycleWatcher_frameManager.set(this, void 0);
    _LifecycleWatcher_frame.set(this, void 0);
    _LifecycleWatcher_timeout.set(this, void 0);
    _LifecycleWatcher_navigationRequest.set(this, null);
    _LifecycleWatcher_eventListeners.set(this, void 0);
    _LifecycleWatcher_initialLoaderId.set(this, void 0);
    _LifecycleWatcher_sameDocumentNavigationCompleteCallback.set(this, noop);
    _LifecycleWatcher_sameDocumentNavigationPromise.set(this, new Promise((fulfill) => {
      __classPrivateFieldSet8(this, _LifecycleWatcher_sameDocumentNavigationCompleteCallback, fulfill, "f");
    }));
    _LifecycleWatcher_lifecycleCallback.set(this, noop);
    _LifecycleWatcher_lifecyclePromise.set(this, new Promise((fulfill) => {
      __classPrivateFieldSet8(this, _LifecycleWatcher_lifecycleCallback, fulfill, "f");
    }));
    _LifecycleWatcher_newDocumentNavigationCompleteCallback.set(this, noop);
    _LifecycleWatcher_newDocumentNavigationPromise.set(this, new Promise((fulfill) => {
      __classPrivateFieldSet8(this, _LifecycleWatcher_newDocumentNavigationCompleteCallback, fulfill, "f");
    }));
    _LifecycleWatcher_terminationCallback.set(this, noop);
    _LifecycleWatcher_terminationPromise.set(this, new Promise((fulfill) => {
      __classPrivateFieldSet8(this, _LifecycleWatcher_terminationCallback, fulfill, "f");
    }));
    _LifecycleWatcher_timeoutPromise.set(this, void 0);
    _LifecycleWatcher_maximumTimer.set(this, void 0);
    _LifecycleWatcher_hasSameDocumentNavigation.set(this, void 0);
    _LifecycleWatcher_swapped.set(this, void 0);
    _LifecycleWatcher_navigationResponseReceived.set(this, void 0);
    if (Array.isArray(waitUntil)) {
      waitUntil = waitUntil.slice();
    } else if (typeof waitUntil === "string") {
      waitUntil = [waitUntil];
    }
    __classPrivateFieldSet8(this, _LifecycleWatcher_initialLoaderId, frame._loaderId, "f");
    __classPrivateFieldSet8(this, _LifecycleWatcher_expectedLifecycle, waitUntil.map((value) => {
      const protocolEvent = puppeteerToProtocolLifecycle.get(value);
      assert(protocolEvent, "Unknown value for options.waitUntil: " + value);
      return protocolEvent;
    }), "f");
    __classPrivateFieldSet8(this, _LifecycleWatcher_frameManager, frameManager, "f");
    __classPrivateFieldSet8(this, _LifecycleWatcher_frame, frame, "f");
    __classPrivateFieldSet8(this, _LifecycleWatcher_timeout, timeout, "f");
    __classPrivateFieldSet8(this, _LifecycleWatcher_eventListeners, [
      addEventListener(frameManager.client, CDPSessionEmittedEvents.Disconnected, __classPrivateFieldGet10(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_terminate).bind(this, new Error("Navigation failed because browser has disconnected!"))),
      addEventListener(__classPrivateFieldGet10(this, _LifecycleWatcher_frameManager, "f"), FrameManagerEmittedEvents.LifecycleEvent, __classPrivateFieldGet10(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_checkLifecycleComplete).bind(this)),
      addEventListener(__classPrivateFieldGet10(this, _LifecycleWatcher_frameManager, "f"), FrameManagerEmittedEvents.FrameNavigatedWithinDocument, __classPrivateFieldGet10(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_navigatedWithinDocument).bind(this)),
      addEventListener(__classPrivateFieldGet10(this, _LifecycleWatcher_frameManager, "f"), FrameManagerEmittedEvents.FrameNavigated, __classPrivateFieldGet10(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_navigated).bind(this)),
      addEventListener(__classPrivateFieldGet10(this, _LifecycleWatcher_frameManager, "f"), FrameManagerEmittedEvents.FrameSwapped, __classPrivateFieldGet10(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_frameSwapped).bind(this)),
      addEventListener(__classPrivateFieldGet10(this, _LifecycleWatcher_frameManager, "f"), FrameManagerEmittedEvents.FrameDetached, __classPrivateFieldGet10(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_onFrameDetached).bind(this)),
      addEventListener(__classPrivateFieldGet10(this, _LifecycleWatcher_frameManager, "f").networkManager, NetworkManagerEmittedEvents.Request, __classPrivateFieldGet10(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_onRequest).bind(this)),
      addEventListener(__classPrivateFieldGet10(this, _LifecycleWatcher_frameManager, "f").networkManager, NetworkManagerEmittedEvents.Response, __classPrivateFieldGet10(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_onResponse).bind(this))
    ], "f");
    __classPrivateFieldSet8(this, _LifecycleWatcher_timeoutPromise, __classPrivateFieldGet10(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_createTimeoutPromise).call(this), "f");
    __classPrivateFieldGet10(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_checkLifecycleComplete).call(this);
  }
  async navigationResponse() {
    var _a2;
    await ((_a2 = __classPrivateFieldGet10(this, _LifecycleWatcher_navigationResponseReceived, "f")) === null || _a2 === void 0 ? void 0 : _a2.catch(() => {
    }));
    return __classPrivateFieldGet10(this, _LifecycleWatcher_navigationRequest, "f") ? __classPrivateFieldGet10(this, _LifecycleWatcher_navigationRequest, "f").response() : null;
  }
  sameDocumentNavigationPromise() {
    return __classPrivateFieldGet10(this, _LifecycleWatcher_sameDocumentNavigationPromise, "f");
  }
  newDocumentNavigationPromise() {
    return __classPrivateFieldGet10(this, _LifecycleWatcher_newDocumentNavigationPromise, "f");
  }
  lifecyclePromise() {
    return __classPrivateFieldGet10(this, _LifecycleWatcher_lifecyclePromise, "f");
  }
  timeoutOrTerminationPromise() {
    return Promise.race([__classPrivateFieldGet10(this, _LifecycleWatcher_timeoutPromise, "f"), __classPrivateFieldGet10(this, _LifecycleWatcher_terminationPromise, "f")]);
  }
  dispose() {
    removeEventListeners(__classPrivateFieldGet10(this, _LifecycleWatcher_eventListeners, "f"));
    __classPrivateFieldGet10(this, _LifecycleWatcher_maximumTimer, "f") !== void 0 && clearTimeout(__classPrivateFieldGet10(this, _LifecycleWatcher_maximumTimer, "f"));
  }
};
_LifecycleWatcher_expectedLifecycle = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_frameManager = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_frame = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_timeout = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_navigationRequest = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_eventListeners = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_initialLoaderId = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_sameDocumentNavigationCompleteCallback = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_sameDocumentNavigationPromise = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_lifecycleCallback = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_lifecyclePromise = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_newDocumentNavigationCompleteCallback = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_newDocumentNavigationPromise = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_terminationCallback = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_terminationPromise = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_timeoutPromise = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_maximumTimer = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_hasSameDocumentNavigation = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_swapped = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_navigationResponseReceived = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_instances = /* @__PURE__ */ new WeakSet(), _LifecycleWatcher_onRequest = function _LifecycleWatcher_onRequest2(request) {
  var _a2, _b;
  if (request.frame() !== __classPrivateFieldGet10(this, _LifecycleWatcher_frame, "f") || !request.isNavigationRequest()) {
    return;
  }
  __classPrivateFieldSet8(this, _LifecycleWatcher_navigationRequest, request, "f");
  (_a2 = __classPrivateFieldGet10(this, _LifecycleWatcher_navigationResponseReceived, "f")) === null || _a2 === void 0 ? void 0 : _a2.resolve();
  __classPrivateFieldSet8(this, _LifecycleWatcher_navigationResponseReceived, createDeferredPromise(), "f");
  if (request.response() !== null) {
    (_b = __classPrivateFieldGet10(this, _LifecycleWatcher_navigationResponseReceived, "f")) === null || _b === void 0 ? void 0 : _b.resolve();
  }
}, _LifecycleWatcher_onResponse = function _LifecycleWatcher_onResponse2(response) {
  var _a2, _b;
  if (((_a2 = __classPrivateFieldGet10(this, _LifecycleWatcher_navigationRequest, "f")) === null || _a2 === void 0 ? void 0 : _a2._requestId) !== response.request()._requestId) {
    return;
  }
  (_b = __classPrivateFieldGet10(this, _LifecycleWatcher_navigationResponseReceived, "f")) === null || _b === void 0 ? void 0 : _b.resolve();
}, _LifecycleWatcher_onFrameDetached = function _LifecycleWatcher_onFrameDetached2(frame) {
  if (__classPrivateFieldGet10(this, _LifecycleWatcher_frame, "f") === frame) {
    __classPrivateFieldGet10(this, _LifecycleWatcher_terminationCallback, "f").call(null, new Error("Navigating frame was detached"));
    return;
  }
  __classPrivateFieldGet10(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_checkLifecycleComplete).call(this);
}, _LifecycleWatcher_terminate = function _LifecycleWatcher_terminate2(error) {
  __classPrivateFieldGet10(this, _LifecycleWatcher_terminationCallback, "f").call(null, error);
}, _LifecycleWatcher_createTimeoutPromise = async function _LifecycleWatcher_createTimeoutPromise2() {
  if (!__classPrivateFieldGet10(this, _LifecycleWatcher_timeout, "f")) {
    return new Promise(noop);
  }
  const errorMessage = "Navigation timeout of " + __classPrivateFieldGet10(this, _LifecycleWatcher_timeout, "f") + " ms exceeded";
  await new Promise((fulfill) => {
    return __classPrivateFieldSet8(this, _LifecycleWatcher_maximumTimer, setTimeout(fulfill, __classPrivateFieldGet10(this, _LifecycleWatcher_timeout, "f")), "f");
  });
  return new TimeoutError(errorMessage);
}, _LifecycleWatcher_navigatedWithinDocument = function _LifecycleWatcher_navigatedWithinDocument2(frame) {
  if (frame !== __classPrivateFieldGet10(this, _LifecycleWatcher_frame, "f")) {
    return;
  }
  __classPrivateFieldSet8(this, _LifecycleWatcher_hasSameDocumentNavigation, true, "f");
  __classPrivateFieldGet10(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_checkLifecycleComplete).call(this);
}, _LifecycleWatcher_navigated = function _LifecycleWatcher_navigated2(frame) {
  if (frame !== __classPrivateFieldGet10(this, _LifecycleWatcher_frame, "f")) {
    return;
  }
  __classPrivateFieldGet10(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_checkLifecycleComplete).call(this);
}, _LifecycleWatcher_frameSwapped = function _LifecycleWatcher_frameSwapped2(frame) {
  if (frame !== __classPrivateFieldGet10(this, _LifecycleWatcher_frame, "f")) {
    return;
  }
  __classPrivateFieldSet8(this, _LifecycleWatcher_swapped, true, "f");
  __classPrivateFieldGet10(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_checkLifecycleComplete).call(this);
}, _LifecycleWatcher_checkLifecycleComplete = function _LifecycleWatcher_checkLifecycleComplete2() {
  if (!checkLifecycle(__classPrivateFieldGet10(this, _LifecycleWatcher_frame, "f"), __classPrivateFieldGet10(this, _LifecycleWatcher_expectedLifecycle, "f"))) {
    return;
  }
  __classPrivateFieldGet10(this, _LifecycleWatcher_lifecycleCallback, "f").call(this);
  if (__classPrivateFieldGet10(this, _LifecycleWatcher_hasSameDocumentNavigation, "f")) {
    __classPrivateFieldGet10(this, _LifecycleWatcher_sameDocumentNavigationCompleteCallback, "f").call(this);
  }
  if (__classPrivateFieldGet10(this, _LifecycleWatcher_swapped, "f") || __classPrivateFieldGet10(this, _LifecycleWatcher_frame, "f")._loaderId !== __classPrivateFieldGet10(this, _LifecycleWatcher_initialLoaderId, "f")) {
    __classPrivateFieldGet10(this, _LifecycleWatcher_newDocumentNavigationCompleteCallback, "f").call(this);
  }
  function checkLifecycle(frame, expectedLifecycle) {
    for (const event of expectedLifecycle) {
      if (!frame._lifecycleEvents.has(event)) {
        return false;
      }
    }
    for (const child of frame.childFrames()) {
      if (child._hasStartedLoading && !checkLifecycle(child, expectedLifecycle)) {
        return false;
      }
    }
    return true;
  }
};

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/IsolatedWorld.js
var __classPrivateFieldSet9 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet11 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _IsolatedWorld_instances;
var _a;
var _IsolatedWorld_frame;
var _IsolatedWorld_document;
var _IsolatedWorld_contextPromise;
var _IsolatedWorld_detached;
var _IsolatedWorld_ctxBindings;
var _IsolatedWorld_boundFunctions;
var _IsolatedWorld_waitTasks;
var _IsolatedWorld_bindingIdentifier;
var _IsolatedWorld_client_get;
var _IsolatedWorld_frameManager_get;
var _IsolatedWorld_timeoutSettings_get;
var _IsolatedWorld_settingUpBinding;
var _IsolatedWorld_onBindingCalled;
var _WaitTask_instances;
var _WaitTask_isolatedWorld;
var _WaitTask_polling;
var _WaitTask_timeout;
var _WaitTask_predicateBody;
var _WaitTask_predicateAcceptsContextElement;
var _WaitTask_args;
var _WaitTask_binding;
var _WaitTask_runCount;
var _WaitTask_resolve;
var _WaitTask_reject;
var _WaitTask_timeoutTimer;
var _WaitTask_terminated;
var _WaitTask_root;
var _WaitTask_cleanup;
var MAIN_WORLD = Symbol("mainWorld");
var PUPPETEER_WORLD = Symbol("puppeteerWorld");
var IsolatedWorld = class {
  constructor(frame) {
    _IsolatedWorld_instances.add(this);
    _IsolatedWorld_frame.set(this, void 0);
    _IsolatedWorld_document.set(this, void 0);
    _IsolatedWorld_contextPromise.set(this, createDeferredPromise());
    _IsolatedWorld_detached.set(this, false);
    _IsolatedWorld_ctxBindings.set(this, /* @__PURE__ */ new Set());
    _IsolatedWorld_boundFunctions.set(this, /* @__PURE__ */ new Map());
    _IsolatedWorld_waitTasks.set(this, /* @__PURE__ */ new Set());
    _IsolatedWorld_settingUpBinding.set(this, null);
    _IsolatedWorld_onBindingCalled.set(this, async (event) => {
      let payload;
      if (!this.hasContext()) {
        return;
      }
      const context = await this.executionContext();
      try {
        payload = JSON.parse(event.payload);
      } catch {
        return;
      }
      const { type, name, seq, args } = payload;
      if (type !== "internal" || !__classPrivateFieldGet11(this, _IsolatedWorld_ctxBindings, "f").has(__classPrivateFieldGet11(IsolatedWorld, _a, "f", _IsolatedWorld_bindingIdentifier).call(IsolatedWorld, name, context._contextId))) {
        return;
      }
      if (context._contextId !== event.executionContextId) {
        return;
      }
      try {
        const fn = this._boundFunctions.get(name);
        if (!fn) {
          throw new Error(`Bound function $name is not found`);
        }
        const result = await fn(...args);
        await context.evaluate(deliverResult, name, seq, result);
      } catch (error) {
        if (error.message.includes("Protocol error")) {
          return;
        }
        debugError(error);
      }
      function deliverResult(name2, seq2, result) {
        globalThis[name2].callbacks.get(seq2).resolve(result);
        globalThis[name2].callbacks.delete(seq2);
      }
    });
    __classPrivateFieldSet9(this, _IsolatedWorld_frame, frame, "f");
    __classPrivateFieldGet11(this, _IsolatedWorld_instances, "a", _IsolatedWorld_client_get).on("Runtime.bindingCalled", __classPrivateFieldGet11(this, _IsolatedWorld_onBindingCalled, "f"));
  }
  get _waitTasks() {
    return __classPrivateFieldGet11(this, _IsolatedWorld_waitTasks, "f");
  }
  get _boundFunctions() {
    return __classPrivateFieldGet11(this, _IsolatedWorld_boundFunctions, "f");
  }
  frame() {
    return __classPrivateFieldGet11(this, _IsolatedWorld_frame, "f");
  }
  clearContext() {
    __classPrivateFieldSet9(this, _IsolatedWorld_document, void 0, "f");
    __classPrivateFieldSet9(this, _IsolatedWorld_contextPromise, createDeferredPromise(), "f");
  }
  setContext(context) {
    assert(__classPrivateFieldGet11(this, _IsolatedWorld_contextPromise, "f"), `ExecutionContext ${context._contextId} has already been set.`);
    __classPrivateFieldGet11(this, _IsolatedWorld_ctxBindings, "f").clear();
    __classPrivateFieldGet11(this, _IsolatedWorld_contextPromise, "f").resolve(context);
    for (const waitTask of this._waitTasks) {
      waitTask.rerun();
    }
  }
  hasContext() {
    return __classPrivateFieldGet11(this, _IsolatedWorld_contextPromise, "f").resolved();
  }
  _detach() {
    __classPrivateFieldSet9(this, _IsolatedWorld_detached, true, "f");
    __classPrivateFieldGet11(this, _IsolatedWorld_instances, "a", _IsolatedWorld_client_get).off("Runtime.bindingCalled", __classPrivateFieldGet11(this, _IsolatedWorld_onBindingCalled, "f"));
    for (const waitTask of this._waitTasks) {
      waitTask.terminate(new Error("waitForFunction failed: frame got detached."));
    }
  }
  executionContext() {
    if (__classPrivateFieldGet11(this, _IsolatedWorld_detached, "f")) {
      throw new Error(`Execution context is not available in detached frame "${__classPrivateFieldGet11(this, _IsolatedWorld_frame, "f").url()}" (are you trying to evaluate?)`);
    }
    if (__classPrivateFieldGet11(this, _IsolatedWorld_contextPromise, "f") === null) {
      throw new Error(`Execution content promise is missing`);
    }
    return __classPrivateFieldGet11(this, _IsolatedWorld_contextPromise, "f");
  }
  async evaluateHandle(pageFunction, ...args) {
    const context = await this.executionContext();
    return context.evaluateHandle(pageFunction, ...args);
  }
  async evaluate(pageFunction, ...args) {
    const context = await this.executionContext();
    return context.evaluate(pageFunction, ...args);
  }
  async $(selector) {
    const document2 = await this.document();
    return document2.$(selector);
  }
  async $$(selector) {
    const document2 = await this.document();
    return document2.$$(selector);
  }
  async document() {
    if (__classPrivateFieldGet11(this, _IsolatedWorld_document, "f")) {
      return __classPrivateFieldGet11(this, _IsolatedWorld_document, "f");
    }
    const context = await this.executionContext();
    __classPrivateFieldSet9(this, _IsolatedWorld_document, await context.evaluateHandle(() => {
      return document;
    }), "f");
    return __classPrivateFieldGet11(this, _IsolatedWorld_document, "f");
  }
  async $x(expression) {
    const document2 = await this.document();
    return document2.$x(expression);
  }
  async $eval(selector, pageFunction, ...args) {
    const document2 = await this.document();
    return document2.$eval(selector, pageFunction, ...args);
  }
  async $$eval(selector, pageFunction, ...args) {
    const document2 = await this.document();
    return document2.$$eval(selector, pageFunction, ...args);
  }
  async content() {
    return await this.evaluate(() => {
      let retVal = "";
      if (document.doctype) {
        retVal = new XMLSerializer().serializeToString(document.doctype);
      }
      if (document.documentElement) {
        retVal += document.documentElement.outerHTML;
      }
      return retVal;
    });
  }
  async setContent(html, options = {}) {
    const { waitUntil = ["load"], timeout = __classPrivateFieldGet11(this, _IsolatedWorld_instances, "a", _IsolatedWorld_timeoutSettings_get).navigationTimeout() } = options;
    await this.evaluate((html2) => {
      document.open();
      document.write(html2);
      document.close();
    }, html);
    const watcher = new LifecycleWatcher(__classPrivateFieldGet11(this, _IsolatedWorld_instances, "a", _IsolatedWorld_frameManager_get), __classPrivateFieldGet11(this, _IsolatedWorld_frame, "f"), waitUntil, timeout);
    const error = await Promise.race([
      watcher.timeoutOrTerminationPromise(),
      watcher.lifecyclePromise()
    ]);
    watcher.dispose();
    if (error) {
      throw error;
    }
  }
  /**
   * Adds a script tag into the current context.
   *
   * @remarks
   * You can pass a URL, filepath or string of contents. Note that when running Puppeteer
   * in a browser environment you cannot pass a filepath and should use either
   * `url` or `content`.
   */
  async addScriptTag(options) {
    const { url = null, path = null, content = null, id = "", type = "" } = options;
    if (url !== null) {
      try {
        const context = await this.executionContext();
        return await context.evaluateHandle(addScriptUrl, url, id, type);
      } catch (error) {
        throw new Error(`Loading script from ${url} failed`);
      }
    }
    if (path !== null) {
      let fs;
      try {
        fs = (await import("fs")).promises;
      } catch (error) {
        if (error instanceof TypeError) {
          throw new Error("Can only pass a filepath to addScriptTag in a Node-like environment.");
        }
        throw error;
      }
      let contents = await fs.readFile(path, "utf8");
      contents += "//# sourceURL=" + path.replace(/\n/g, "");
      const context = await this.executionContext();
      return await context.evaluateHandle(addScriptContent, contents, id, type);
    }
    if (content !== null) {
      const context = await this.executionContext();
      return await context.evaluateHandle(addScriptContent, content, id, type);
    }
    throw new Error("Provide an object with a `url`, `path` or `content` property");
    async function addScriptUrl(url2, id2, type2) {
      const script = document.createElement("script");
      script.src = url2;
      if (id2) {
        script.id = id2;
      }
      if (type2) {
        script.type = type2;
      }
      const promise = new Promise((res, rej) => {
        script.onload = res;
        script.onerror = rej;
      });
      document.head.appendChild(script);
      await promise;
      return script;
    }
    function addScriptContent(content2, id2, type2 = "text/javascript") {
      const script = document.createElement("script");
      script.type = type2;
      script.text = content2;
      if (id2) {
        script.id = id2;
      }
      let error = null;
      script.onerror = (e) => {
        return error = e;
      };
      document.head.appendChild(script);
      if (error) {
        throw error;
      }
      return script;
    }
  }
  /**
   * Adds a style tag into the current context.
   *
   * @remarks
   * You can pass a URL, filepath or string of contents. Note that when running Puppeteer
   * in a browser environment you cannot pass a filepath and should use either
   * `url` or `content`.
   */
  async addStyleTag(options) {
    const { url = null, content = null } = options;
    if (url !== null) {
      try {
        const context = await this.executionContext();
        return await context.evaluateHandle(addStyleUrl, url);
      } catch (error) {
        throw new Error(`Loading style from ${url} failed`);
      }
    }
    if (content !== null) {
      const context = await this.executionContext();
      return await context.evaluateHandle(addStyleContent, content);
    }
    throw new Error("Provide an object with a `url`, `path` or `content` property");
    async function addStyleUrl(url2) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url2;
      const promise = new Promise((res, rej) => {
        link.onload = res;
        link.onerror = rej;
      });
      document.head.appendChild(link);
      await promise;
      return link;
    }
    async function addStyleContent(content2) {
      const style = document.createElement("style");
      style.appendChild(document.createTextNode(content2));
      const promise = new Promise((res, rej) => {
        style.onload = res;
        style.onerror = rej;
      });
      document.head.appendChild(style);
      await promise;
      return style;
    }
  }
  async click(selector, options) {
    const handle = await this.$(selector);
    assert(handle, `No element found for selector: ${selector}`);
    await handle.click(options);
    await handle.dispose();
  }
  async focus(selector) {
    const handle = await this.$(selector);
    assert(handle, `No element found for selector: ${selector}`);
    await handle.focus();
    await handle.dispose();
  }
  async hover(selector) {
    const handle = await this.$(selector);
    assert(handle, `No element found for selector: ${selector}`);
    await handle.hover();
    await handle.dispose();
  }
  async select(selector, ...values) {
    const handle = await this.$(selector);
    assert(handle, `No element found for selector: ${selector}`);
    const result = await handle.select(...values);
    await handle.dispose();
    return result;
  }
  async tap(selector) {
    const handle = await this.$(selector);
    assert(handle, `No element found for selector: ${selector}`);
    await handle.tap();
    await handle.dispose();
  }
  async type(selector, text, options) {
    const handle = await this.$(selector);
    assert(handle, `No element found for selector: ${selector}`);
    await handle.type(text, options);
    await handle.dispose();
  }
  async _addBindingToContext(context, name) {
    if (__classPrivateFieldGet11(this, _IsolatedWorld_ctxBindings, "f").has(__classPrivateFieldGet11(IsolatedWorld, _a, "f", _IsolatedWorld_bindingIdentifier).call(IsolatedWorld, name, context._contextId))) {
      return;
    }
    if (__classPrivateFieldGet11(this, _IsolatedWorld_settingUpBinding, "f")) {
      await __classPrivateFieldGet11(this, _IsolatedWorld_settingUpBinding, "f");
      return this._addBindingToContext(context, name);
    }
    const bind = async (name2) => {
      const expression = pageBindingInitString("internal", name2);
      try {
        await context._client.send("Runtime.addBinding", {
          name: name2,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore The protocol definition is not up to date.
          executionContextName: context._contextName
        });
        await context.evaluate(expression);
      } catch (error) {
        const ctxDestroyed = error.message.includes("Execution context was destroyed");
        const ctxNotFound = error.message.includes("Cannot find context with specified id");
        if (ctxDestroyed || ctxNotFound) {
          return;
        } else {
          debugError(error);
          return;
        }
      }
      __classPrivateFieldGet11(this, _IsolatedWorld_ctxBindings, "f").add(__classPrivateFieldGet11(IsolatedWorld, _a, "f", _IsolatedWorld_bindingIdentifier).call(IsolatedWorld, name2, context._contextId));
    };
    __classPrivateFieldSet9(this, _IsolatedWorld_settingUpBinding, bind(name), "f");
    await __classPrivateFieldGet11(this, _IsolatedWorld_settingUpBinding, "f");
    __classPrivateFieldSet9(this, _IsolatedWorld_settingUpBinding, null, "f");
  }
  async _waitForSelectorInPage(queryOne2, root, selector, options, binding) {
    const { visible: waitForVisible = false, hidden: waitForHidden = false, timeout = __classPrivateFieldGet11(this, _IsolatedWorld_instances, "a", _IsolatedWorld_timeoutSettings_get).timeout() } = options;
    const polling = waitForVisible || waitForHidden ? "raf" : "mutation";
    const title = `selector \`${selector}\`${waitForHidden ? " to be hidden" : ""}`;
    async function predicate(root2, selector2, waitForVisible2, waitForHidden2) {
      const node = await predicateQueryHandler(root2, selector2);
      return checkWaitForOptions(node, waitForVisible2, waitForHidden2);
    }
    const waitTaskOptions = {
      isolatedWorld: this,
      predicateBody: makePredicateString(predicate, queryOne2),
      predicateAcceptsContextElement: true,
      title,
      polling,
      timeout,
      args: [selector, waitForVisible, waitForHidden],
      binding,
      root
    };
    const waitTask = new WaitTask(waitTaskOptions);
    return waitTask.promise;
  }
  waitForFunction(pageFunction, options = {}, ...args) {
    const { polling = "raf", timeout = __classPrivateFieldGet11(this, _IsolatedWorld_instances, "a", _IsolatedWorld_timeoutSettings_get).timeout() } = options;
    const waitTaskOptions = {
      isolatedWorld: this,
      predicateBody: pageFunction,
      predicateAcceptsContextElement: false,
      title: "function",
      polling,
      timeout,
      args
    };
    const waitTask = new WaitTask(waitTaskOptions);
    return waitTask.promise;
  }
  async title() {
    return this.evaluate(() => {
      return document.title;
    });
  }
  async adoptBackendNode(backendNodeId) {
    const executionContext = await this.executionContext();
    const { object } = await __classPrivateFieldGet11(this, _IsolatedWorld_instances, "a", _IsolatedWorld_client_get).send("DOM.resolveNode", {
      backendNodeId,
      executionContextId: executionContext._contextId
    });
    return createJSHandle(executionContext, object);
  }
  async adoptHandle(handle) {
    const executionContext = await this.executionContext();
    assert(handle.executionContext() !== executionContext, "Cannot adopt handle that already belongs to this execution context");
    const nodeInfo = await __classPrivateFieldGet11(this, _IsolatedWorld_instances, "a", _IsolatedWorld_client_get).send("DOM.describeNode", {
      objectId: handle.remoteObject().objectId
    });
    return await this.adoptBackendNode(nodeInfo.node.backendNodeId);
  }
  async transferHandle(handle) {
    const result = await this.adoptHandle(handle);
    await handle.dispose();
    return result;
  }
};
_a = IsolatedWorld, _IsolatedWorld_frame = /* @__PURE__ */ new WeakMap(), _IsolatedWorld_document = /* @__PURE__ */ new WeakMap(), _IsolatedWorld_contextPromise = /* @__PURE__ */ new WeakMap(), _IsolatedWorld_detached = /* @__PURE__ */ new WeakMap(), _IsolatedWorld_ctxBindings = /* @__PURE__ */ new WeakMap(), _IsolatedWorld_boundFunctions = /* @__PURE__ */ new WeakMap(), _IsolatedWorld_waitTasks = /* @__PURE__ */ new WeakMap(), _IsolatedWorld_settingUpBinding = /* @__PURE__ */ new WeakMap(), _IsolatedWorld_onBindingCalled = /* @__PURE__ */ new WeakMap(), _IsolatedWorld_instances = /* @__PURE__ */ new WeakSet(), _IsolatedWorld_client_get = function _IsolatedWorld_client_get2() {
  return __classPrivateFieldGet11(this, _IsolatedWorld_frame, "f")._client();
}, _IsolatedWorld_frameManager_get = function _IsolatedWorld_frameManager_get2() {
  return __classPrivateFieldGet11(this, _IsolatedWorld_frame, "f")._frameManager;
}, _IsolatedWorld_timeoutSettings_get = function _IsolatedWorld_timeoutSettings_get2() {
  return __classPrivateFieldGet11(this, _IsolatedWorld_instances, "a", _IsolatedWorld_frameManager_get).timeoutSettings;
};
_IsolatedWorld_bindingIdentifier = { value: (name, contextId) => {
  return `${name}_${contextId}`;
} };
var noop2 = () => {
};
var WaitTask = class {
  constructor(options) {
    _WaitTask_instances.add(this);
    _WaitTask_isolatedWorld.set(this, void 0);
    _WaitTask_polling.set(this, void 0);
    _WaitTask_timeout.set(this, void 0);
    _WaitTask_predicateBody.set(this, void 0);
    _WaitTask_predicateAcceptsContextElement.set(this, void 0);
    _WaitTask_args.set(this, void 0);
    _WaitTask_binding.set(this, void 0);
    _WaitTask_runCount.set(this, 0);
    _WaitTask_resolve.set(this, noop2);
    _WaitTask_reject.set(this, noop2);
    _WaitTask_timeoutTimer.set(this, void 0);
    _WaitTask_terminated.set(this, false);
    _WaitTask_root.set(this, null);
    if (isString(options.polling)) {
      assert(options.polling === "raf" || options.polling === "mutation", "Unknown polling option: " + options.polling);
    } else if (isNumber(options.polling)) {
      assert(options.polling > 0, "Cannot poll with non-positive interval: " + options.polling);
    } else {
      throw new Error("Unknown polling options: " + options.polling);
    }
    function getPredicateBody(predicateBody) {
      if (isString(predicateBody)) {
        return `return (${predicateBody});`;
      }
      return `return (${predicateBody})(...args);`;
    }
    __classPrivateFieldSet9(this, _WaitTask_isolatedWorld, options.isolatedWorld, "f");
    __classPrivateFieldSet9(this, _WaitTask_polling, options.polling, "f");
    __classPrivateFieldSet9(this, _WaitTask_timeout, options.timeout, "f");
    __classPrivateFieldSet9(this, _WaitTask_root, options.root || null, "f");
    __classPrivateFieldSet9(this, _WaitTask_predicateBody, getPredicateBody(options.predicateBody), "f");
    __classPrivateFieldSet9(this, _WaitTask_predicateAcceptsContextElement, options.predicateAcceptsContextElement, "f");
    __classPrivateFieldSet9(this, _WaitTask_args, options.args, "f");
    __classPrivateFieldSet9(this, _WaitTask_binding, options.binding, "f");
    __classPrivateFieldSet9(this, _WaitTask_runCount, 0, "f");
    __classPrivateFieldGet11(this, _WaitTask_isolatedWorld, "f")._waitTasks.add(this);
    if (__classPrivateFieldGet11(this, _WaitTask_binding, "f")) {
      __classPrivateFieldGet11(this, _WaitTask_isolatedWorld, "f")._boundFunctions.set(__classPrivateFieldGet11(this, _WaitTask_binding, "f").name, __classPrivateFieldGet11(this, _WaitTask_binding, "f").pptrFunction);
    }
    this.promise = new Promise((resolve, reject) => {
      __classPrivateFieldSet9(this, _WaitTask_resolve, resolve, "f");
      __classPrivateFieldSet9(this, _WaitTask_reject, reject, "f");
    });
    if (options.timeout) {
      const timeoutError = new TimeoutError(`waiting for ${options.title} failed: timeout ${options.timeout}ms exceeded`);
      __classPrivateFieldSet9(this, _WaitTask_timeoutTimer, setTimeout(() => {
        return this.terminate(timeoutError);
      }, options.timeout), "f");
    }
    this.rerun();
  }
  terminate(error) {
    __classPrivateFieldSet9(this, _WaitTask_terminated, true, "f");
    __classPrivateFieldGet11(this, _WaitTask_reject, "f").call(this, error);
    __classPrivateFieldGet11(this, _WaitTask_instances, "m", _WaitTask_cleanup).call(this);
  }
  async rerun() {
    var _b;
    const runCount = __classPrivateFieldSet9(this, _WaitTask_runCount, (_b = __classPrivateFieldGet11(this, _WaitTask_runCount, "f"), ++_b), "f");
    let success = null;
    let error = null;
    const context = await __classPrivateFieldGet11(this, _WaitTask_isolatedWorld, "f").executionContext();
    if (__classPrivateFieldGet11(this, _WaitTask_terminated, "f") || runCount !== __classPrivateFieldGet11(this, _WaitTask_runCount, "f")) {
      return;
    }
    if (__classPrivateFieldGet11(this, _WaitTask_binding, "f")) {
      await __classPrivateFieldGet11(this, _WaitTask_isolatedWorld, "f")._addBindingToContext(context, __classPrivateFieldGet11(this, _WaitTask_binding, "f").name);
    }
    if (__classPrivateFieldGet11(this, _WaitTask_terminated, "f") || runCount !== __classPrivateFieldGet11(this, _WaitTask_runCount, "f")) {
      return;
    }
    try {
      success = await context.evaluateHandle(waitForPredicatePageFunction, __classPrivateFieldGet11(this, _WaitTask_root, "f") || null, __classPrivateFieldGet11(this, _WaitTask_predicateBody, "f"), __classPrivateFieldGet11(this, _WaitTask_predicateAcceptsContextElement, "f"), __classPrivateFieldGet11(this, _WaitTask_polling, "f"), __classPrivateFieldGet11(this, _WaitTask_timeout, "f"), ...__classPrivateFieldGet11(this, _WaitTask_args, "f"));
    } catch (error_) {
      error = error_;
    }
    if (__classPrivateFieldGet11(this, _WaitTask_terminated, "f") || runCount !== __classPrivateFieldGet11(this, _WaitTask_runCount, "f")) {
      if (success) {
        await success.dispose();
      }
      return;
    }
    if (!error && await __classPrivateFieldGet11(this, _WaitTask_isolatedWorld, "f").evaluate((s) => {
      return !s;
    }, success).catch(() => {
      return true;
    })) {
      if (!success) {
        throw new Error("Assertion: result handle is not available");
      }
      await success.dispose();
      return;
    }
    if (error) {
      if (error.message.includes("TypeError: binding is not a function")) {
        return this.rerun();
      }
      if (error.message.includes("Execution context is not available in detached frame")) {
        this.terminate(new Error("waitForFunction failed: frame got detached."));
        return;
      }
      if (error.message.includes("Execution context was destroyed")) {
        return;
      }
      if (error.message.includes("Cannot find context with specified id")) {
        return;
      }
      __classPrivateFieldGet11(this, _WaitTask_reject, "f").call(this, error);
    } else {
      if (!success) {
        throw new Error("Assertion: result handle is not available");
      }
      __classPrivateFieldGet11(this, _WaitTask_resolve, "f").call(this, success);
    }
    __classPrivateFieldGet11(this, _WaitTask_instances, "m", _WaitTask_cleanup).call(this);
  }
};
_WaitTask_isolatedWorld = /* @__PURE__ */ new WeakMap(), _WaitTask_polling = /* @__PURE__ */ new WeakMap(), _WaitTask_timeout = /* @__PURE__ */ new WeakMap(), _WaitTask_predicateBody = /* @__PURE__ */ new WeakMap(), _WaitTask_predicateAcceptsContextElement = /* @__PURE__ */ new WeakMap(), _WaitTask_args = /* @__PURE__ */ new WeakMap(), _WaitTask_binding = /* @__PURE__ */ new WeakMap(), _WaitTask_runCount = /* @__PURE__ */ new WeakMap(), _WaitTask_resolve = /* @__PURE__ */ new WeakMap(), _WaitTask_reject = /* @__PURE__ */ new WeakMap(), _WaitTask_timeoutTimer = /* @__PURE__ */ new WeakMap(), _WaitTask_terminated = /* @__PURE__ */ new WeakMap(), _WaitTask_root = /* @__PURE__ */ new WeakMap(), _WaitTask_instances = /* @__PURE__ */ new WeakSet(), _WaitTask_cleanup = function _WaitTask_cleanup2() {
  __classPrivateFieldGet11(this, _WaitTask_timeoutTimer, "f") !== void 0 && clearTimeout(__classPrivateFieldGet11(this, _WaitTask_timeoutTimer, "f"));
  __classPrivateFieldGet11(this, _WaitTask_isolatedWorld, "f")._waitTasks.delete(this);
};
async function waitForPredicatePageFunction(root, predicateBody, predicateAcceptsContextElement, polling, timeout, ...args) {
  root = root || document;
  const predicate = new Function("...args", predicateBody);
  let timedOut = false;
  if (timeout) {
    setTimeout(() => {
      return timedOut = true;
    }, timeout);
  }
  switch (polling) {
    case "raf":
      return await pollRaf();
    case "mutation":
      return await pollMutation();
    default:
      return await pollInterval(polling);
  }
  async function pollMutation() {
    const success = predicateAcceptsContextElement ? await predicate(root, ...args) : await predicate(...args);
    if (success) {
      return Promise.resolve(success);
    }
    let fulfill = (_) => {
    };
    const result = new Promise((x) => {
      return fulfill = x;
    });
    const observer = new MutationObserver(async () => {
      if (timedOut) {
        observer.disconnect();
        fulfill();
      }
      const success2 = predicateAcceptsContextElement ? await predicate(root, ...args) : await predicate(...args);
      if (success2) {
        observer.disconnect();
        fulfill(success2);
      }
    });
    if (!root) {
      throw new Error("Root element is not found.");
    }
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true
    });
    return result;
  }
  async function pollRaf() {
    let fulfill = (_) => {
    };
    const result = new Promise((x) => {
      return fulfill = x;
    });
    await onRaf();
    return result;
    async function onRaf() {
      if (timedOut) {
        fulfill();
        return;
      }
      const success = predicateAcceptsContextElement ? await predicate(root, ...args) : await predicate(...args);
      if (success) {
        fulfill(success);
      } else {
        requestAnimationFrame(onRaf);
      }
    }
  }
  async function pollInterval(pollInterval2) {
    let fulfill = (_) => {
    };
    const result = new Promise((x) => {
      return fulfill = x;
    });
    await onTimeout();
    return result;
    async function onTimeout() {
      if (timedOut) {
        fulfill();
        return;
      }
      const success = predicateAcceptsContextElement ? await predicate(root, ...args) : await predicate(...args);
      if (success) {
        fulfill(success);
      } else {
        setTimeout(onTimeout, pollInterval2);
      }
    }
  }
}

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Frame.js
var __classPrivateFieldSet10 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet12 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Frame_parentFrame;
var _Frame_url;
var _Frame_detached;
var _Frame_client;
var Frame = class {
  /**
   * @internal
   */
  constructor(frameManager, parentFrame, frameId, client) {
    _Frame_parentFrame.set(this, void 0);
    _Frame_url.set(this, "");
    _Frame_detached.set(this, false);
    _Frame_client.set(this, void 0);
    this._loaderId = "";
    this._hasStartedLoading = false;
    this._lifecycleEvents = /* @__PURE__ */ new Set();
    this._frameManager = frameManager;
    __classPrivateFieldSet10(this, _Frame_parentFrame, parentFrame !== null && parentFrame !== void 0 ? parentFrame : null, "f");
    __classPrivateFieldSet10(this, _Frame_url, "", "f");
    this._id = frameId;
    __classPrivateFieldSet10(this, _Frame_detached, false, "f");
    this._loaderId = "";
    this._childFrames = /* @__PURE__ */ new Set();
    if (__classPrivateFieldGet12(this, _Frame_parentFrame, "f")) {
      __classPrivateFieldGet12(this, _Frame_parentFrame, "f")._childFrames.add(this);
    }
    this.updateClient(client);
  }
  /**
   * @internal
   */
  updateClient(client) {
    __classPrivateFieldSet10(this, _Frame_client, client, "f");
    this.worlds = {
      [MAIN_WORLD]: new IsolatedWorld(this),
      [PUPPETEER_WORLD]: new IsolatedWorld(this)
    };
  }
  /**
   * @returns The page associated with the frame.
   */
  page() {
    return this._frameManager.page();
  }
  /**
   * @returns `true` if the frame is an out-of-process (OOP) frame. Otherwise,
   * `false`.
   */
  isOOPFrame() {
    return __classPrivateFieldGet12(this, _Frame_client, "f") !== this._frameManager.client;
  }
  /**
   * Navigates a frame to the given url.
   *
   * @remarks
   * Navigation to `about:blank` or navigation to the same URL with a different
   * hash will succeed and return `null`.
   *
   * :::warning
   *
   * Headless mode doesn't support navigation to a PDF document. See the {@link
   * https://bugs.chromium.org/p/chromium/issues/detail?id=761295 | upstream
   * issue}.
   *
   * :::
   *
   * @param url - the URL to navigate the frame to. This should include the
   * scheme, e.g. `https://`.
   * @param options - navigation options. `waitUntil` is useful to define when
   * the navigation should be considered successful - see the docs for
   * {@link PuppeteerLifeCycleEvent} for more details.
   *
   * @returns A promise which resolves to the main resource response. In case of
   * multiple redirects, the navigation will resolve with the response of the
   * last redirect.
   * @throws This method will throw an error if:
   *
   * - there's an SSL error (e.g. in case of self-signed certificates).
   * - target URL is invalid.
   * - the `timeout` is exceeded during navigation.
   * - the remote server does not respond or is unreachable.
   * - the main resource failed to load.
   *
   * This method will not throw an error when any valid HTTP status code is
   * returned by the remote server, including 404 "Not Found" and 500 "Internal
   * Server Error". The status code for such responses can be retrieved by
   * calling {@link HTTPResponse.status}.
   */
  async goto(url, options = {}) {
    const { referer = this._frameManager.networkManager.extraHTTPHeaders()["referer"], waitUntil = ["load"], timeout = this._frameManager.timeoutSettings.navigationTimeout() } = options;
    let ensureNewDocumentNavigation = false;
    const watcher = new LifecycleWatcher(this._frameManager, this, waitUntil, timeout);
    let error = await Promise.race([
      navigate(__classPrivateFieldGet12(this, _Frame_client, "f"), url, referer, this._id),
      watcher.timeoutOrTerminationPromise()
    ]);
    if (!error) {
      error = await Promise.race([
        watcher.timeoutOrTerminationPromise(),
        ensureNewDocumentNavigation ? watcher.newDocumentNavigationPromise() : watcher.sameDocumentNavigationPromise()
      ]);
    }
    try {
      if (error) {
        throw error;
      }
      return await watcher.navigationResponse();
    } finally {
      watcher.dispose();
    }
    async function navigate(client, url2, referrer, frameId) {
      try {
        const response = await client.send("Page.navigate", {
          url: url2,
          referrer,
          frameId
        });
        ensureNewDocumentNavigation = !!response.loaderId;
        return response.errorText ? new Error(`${response.errorText} at ${url2}`) : null;
      } catch (error2) {
        if (isErrorLike(error2)) {
          return error2;
        }
        throw error2;
      }
    }
  }
  /**
   * Waits for the frame to navigate. It is useful for when you run code which
   * will indirectly cause the frame to navigate.
   *
   * Usage of the
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/History_API | History API}
   * to change the URL is considered a navigation.
   *
   * @example
   *
   * ```ts
   * const [response] = await Promise.all([
   *   // The navigation promise resolves after navigation has finished
   *   frame.waitForNavigation(),
   *   // Clicking the link will indirectly cause a navigation
   *   frame.click('a.my-link'),
   * ]);
   * ```
   *
   * @param options - options to configure when the navigation is consided
   * finished.
   * @returns a promise that resolves when the frame navigates to a new URL.
   */
  async waitForNavigation(options = {}) {
    const { waitUntil = ["load"], timeout = this._frameManager.timeoutSettings.navigationTimeout() } = options;
    const watcher = new LifecycleWatcher(this._frameManager, this, waitUntil, timeout);
    const error = await Promise.race([
      watcher.timeoutOrTerminationPromise(),
      watcher.sameDocumentNavigationPromise(),
      watcher.newDocumentNavigationPromise()
    ]);
    try {
      if (error) {
        throw error;
      }
      return await watcher.navigationResponse();
    } finally {
      watcher.dispose();
    }
  }
  /**
   * @internal
   */
  _client() {
    return __classPrivateFieldGet12(this, _Frame_client, "f");
  }
  /**
   * @internal
   */
  executionContext() {
    return this.worlds[MAIN_WORLD].executionContext();
  }
  /**
   * Behaves identically to {@link Page.evaluateHandle} except it's run within
   * the context of this frame.
   *
   * @see {@link Page.evaluateHandle} for details.
   */
  async evaluateHandle(pageFunction, ...args) {
    return this.worlds[MAIN_WORLD].evaluateHandle(pageFunction, ...args);
  }
  /**
   * Behaves identically to {@link Page.evaluate} except it's run within the
   * the context of this frame.
   *
   * @see {@link Page.evaluate} for details.
   */
  async evaluate(pageFunction, ...args) {
    return this.worlds[MAIN_WORLD].evaluate(pageFunction, ...args);
  }
  /**
   * Queries the frame for an element matching the given selector.
   *
   * @param selector - The selector to query for.
   * @returns A {@link ElementHandle | element handle} to the first element
   * matching the given selector. Otherwise, `null`.
   */
  async $(selector) {
    return this.worlds[MAIN_WORLD].$(selector);
  }
  /**
   * Queries the frame for all elements matching the given selector.
   *
   * @param selector - The selector to query for.
   * @returns An array of {@link ElementHandle | element handles} that point to
   * elements matching the given selector.
   */
  async $$(selector) {
    return this.worlds[MAIN_WORLD].$$(selector);
  }
  /**
   * Runs the given function on the first element matching the given selector in
   * the frame.
   *
   * If the given function returns a promise, then this method will wait till
   * the promise resolves.
   *
   * @example
   *
   * ```ts
   * const searchValue = await frame.$eval('#search', el => el.value);
   * ```
   *
   * @param selector - The selector to query for.
   * @param pageFunction - The function to be evaluated in the frame's context.
   * The first element matching the selector will be passed to the function as
   * its first argument.
   * @param args - Additional arguments to pass to `pageFunction`.
   * @returns A promise to the result of the function.
   */
  async $eval(selector, pageFunction, ...args) {
    return this.worlds[MAIN_WORLD].$eval(selector, pageFunction, ...args);
  }
  /**
   * Runs the given function on an array of elements matching the given selector
   * in the frame.
   *
   * If the given function returns a promise, then this method will wait till
   * the promise resolves.
   *
   * @example
   *
   * ```js
   * const divsCounts = await frame.$$eval('div', divs => divs.length);
   * ```
   *
   * @param selector - The selector to query for.
   * @param pageFunction - The function to be evaluated in the frame's context.
   * An array of elements matching the given selector will be passed to the
   * function as its first argument.
   * @param args - Additional arguments to pass to `pageFunction`.
   * @returns A promise to the result of the function.
   */
  async $$eval(selector, pageFunction, ...args) {
    return this.worlds[MAIN_WORLD].$$eval(selector, pageFunction, ...args);
  }
  /**
   * @deprecated Use {@link Frame.$$} with the `xpath` prefix.
   *
   * This method evaluates the given XPath expression and returns the results.
   * @param expression - the XPath expression to evaluate.
   */
  async $x(expression) {
    return this.worlds[MAIN_WORLD].$x(expression);
  }
  /**
   * Waits for an element matching the given selector to appear in the frame.
   *
   * This method works across navigations.
   *
   * @example
   *
   * ```ts
   * const puppeteer = require('puppeteer');
   *
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   let currentURL;
   *   page
   *     .mainFrame()
   *     .waitForSelector('img')
   *     .then(() => console.log('First URL with image: ' + currentURL));
   *
   *   for (currentURL of [
   *     'https://example.com',
   *     'https://google.com',
   *     'https://bbc.com',
   *   ]) {
   *     await page.goto(currentURL);
   *   }
   *   await browser.close();
   * })();
   * ```
   *
   * @param selector - The selector to query and wait for.
   * @param options - Options for customizing waiting behavior.
   * @returns An element matching the given selector.
   * @throws Throws if an element matching the given selector doesn't appear.
   */
  async waitForSelector(selector, options = {}) {
    const { updatedSelector, queryHandler } = getQueryHandlerAndSelector(selector);
    assert(queryHandler.waitFor, "Query handler does not support waiting");
    return await queryHandler.waitFor(this, updatedSelector, options);
  }
  /**
   * @deprecated Use {@link Frame.waitForSelector} with the `xpath` prefix.
   *
   * Wait for the `xpath` to appear in page. If at the moment of calling the
   * method the `xpath` already exists, the method will return immediately. If
   * the xpath doesn't appear after the `timeout` milliseconds of waiting, the
   * function will throw.
   *
   * For a code example, see the example for {@link Frame.waitForSelector}. That
   * function behaves identically other than taking a CSS selector rather than
   * an XPath.
   *
   * @param xpath - the XPath expression to wait for.
   * @param options - options to configure the visiblity of the element and how
   * long to wait before timing out.
   */
  async waitForXPath(xpath, options = {}) {
    if (xpath.startsWith("//")) {
      xpath = `.${xpath}`;
    }
    return this.waitForSelector(`xpath/${xpath}`, options);
  }
  /**
   * @example
   * The `waitForFunction` can be used to observe viewport size change:
   *
   * ```ts
   * const puppeteer = require('puppeteer');
   *
   * (async () => {
   * .  const browser = await puppeteer.launch();
   * .  const page = await browser.newPage();
   * .  const watchDog = page.mainFrame().waitForFunction('window.innerWidth < 100');
   * .  page.setViewport({width: 50, height: 50});
   * .  await watchDog;
   * .  await browser.close();
   * })();
   * ```
   *
   * To pass arguments from Node.js to the predicate of `page.waitForFunction` function:
   *
   * ```ts
   * const selector = '.foo';
   * await frame.waitForFunction(
   *   selector => !!document.querySelector(selector),
   *   {}, // empty options object
   *   selector
   * );
   * ```
   *
   * @param pageFunction - the function to evaluate in the frame context.
   * @param options - options to configure the polling method and timeout.
   * @param args - arguments to pass to the `pageFunction`.
   * @returns the promise which resolve when the `pageFunction` returns a truthy value.
   */
  waitForFunction(pageFunction, options = {}, ...args) {
    return this.worlds[MAIN_WORLD].waitForFunction(pageFunction, options, ...args);
  }
  /**
   * @returns The full HTML contents of the frame, including the DOCTYPE.
   */
  async content() {
    return this.worlds[PUPPETEER_WORLD].content();
  }
  /**
   * Set the content of the frame.
   *
   * @param html - HTML markup to assign to the page.
   * @param options - Options to configure how long before timing out and at
   * what point to consider the content setting successful.
   */
  async setContent(html, options = {}) {
    return this.worlds[PUPPETEER_WORLD].setContent(html, options);
  }
  /**
   * @returns The frame's `name` attribute as specified in the tag.
   *
   * @remarks
   * If the name is empty, it returns the `id` attribute instead.
   *
   * @remarks
   * This value is calculated once when the frame is created, and will not
   * update if the attribute is changed later.
   */
  name() {
    return this._name || "";
  }
  /**
   * @returns The frame's URL.
   */
  url() {
    return __classPrivateFieldGet12(this, _Frame_url, "f");
  }
  /**
   * @returns The parent frame, if any. Detached and main frames return `null`.
   */
  parentFrame() {
    return __classPrivateFieldGet12(this, _Frame_parentFrame, "f");
  }
  /**
   * @returns An array of child frames.
   */
  childFrames() {
    return Array.from(this._childFrames);
  }
  /**
   * @returns `true` if the frame has been detached. Otherwise, `false`.
   */
  isDetached() {
    return __classPrivateFieldGet12(this, _Frame_detached, "f");
  }
  /**
   * Adds a `<script>` tag into the page with the desired url or content.
   *
   * @param options - Options for the script.
   * @returns a promise that resolves to the added tag when the script's
   * `onload` event fires or when the script content was injected into the
   * frame.
   */
  async addScriptTag(options) {
    return this.worlds[MAIN_WORLD].addScriptTag(options);
  }
  /**
   * Adds a `<link rel="stylesheet">` tag into the page with the desired url or
   * a `<style type="text/css">` tag with the content.
   *
   * @param options - Options for the style link.
   * @returns a promise that resolves to the added tag when the stylesheets's
   * `onload` event fires or when the CSS content was injected into the
   * frame.
   */
  async addStyleTag(options) {
    return this.worlds[MAIN_WORLD].addStyleTag(options);
  }
  /**
   * Clicks the first element found that matches `selector`.
   *
   * @remarks
   * If `click()` triggers a navigation event and there's a separate
   * `page.waitForNavigation()` promise to be resolved, you may end up with a
   * race condition that yields unexpected results. The correct pattern for
   * click and wait for navigation is the following:
   *
   * ```ts
   * const [response] = await Promise.all([
   *   page.waitForNavigation(waitOptions),
   *   frame.click(selector, clickOptions),
   * ]);
   * ```
   *
   * @param selector - The selector to query for.
   */
  async click(selector, options = {}) {
    return this.worlds[PUPPETEER_WORLD].click(selector, options);
  }
  /**
   * Focuses the first element that matches the `selector`.
   *
   * @param selector - The selector to query for.
   * @throws Throws if there's no element matching `selector`.
   */
  async focus(selector) {
    return this.worlds[PUPPETEER_WORLD].focus(selector);
  }
  /**
   * Hovers the pointer over the center of the first element that matches the
   * `selector`.
   *
   * @param selector - The selector to query for.
   * @throws Throws if there's no element matching `selector`.
   */
  async hover(selector) {
    return this.worlds[PUPPETEER_WORLD].hover(selector);
  }
  /**
   * Selects a set of value on the first `<select>` element that matches the
   * `selector`.
   *
   * @example
   *
   * ```ts
   * frame.select('select#colors', 'blue'); // single selection
   * frame.select('select#colors', 'red', 'green', 'blue'); // multiple selections
   * ```
   *
   * @param selector - The selector to query for.
   * @param values - The array of values to select. If the `<select>` has the
   * `multiple` attribute, all values are considered, otherwise only the first
   * one is taken into account.
   * @returns the list of values that were successfully selected.
   * @throws Throws if there's no `<select>` matching `selector`.
   */
  select(selector, ...values) {
    return this.worlds[PUPPETEER_WORLD].select(selector, ...values);
  }
  /**
   * Taps the first element that matches the `selector`.
   *
   * @param selector - The selector to query for.
   * @throws Throws if there's no element matching `selector`.
   */
  async tap(selector) {
    return this.worlds[PUPPETEER_WORLD].tap(selector);
  }
  /**
   * Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character
   * in the text.
   *
   * @remarks
   * To press a special key, like `Control` or `ArrowDown`, use
   * {@link Keyboard.press}.
   *
   * @example
   *
   * ```ts
   * await frame.type('#mytextarea', 'Hello'); // Types instantly
   * await frame.type('#mytextarea', 'World', {delay: 100}); // Types slower, like a user
   * ```
   *
   * @param selector - the selector for the element to type into. If there are
   * multiple the first will be used.
   * @param text - text to type into the element
   * @param options - takes one option, `delay`, which sets the time to wait
   * between key presses in milliseconds. Defaults to `0`.
   */
  async type(selector, text, options) {
    return this.worlds[PUPPETEER_WORLD].type(selector, text, options);
  }
  /**
   * @deprecated Use `new Promise(r => setTimeout(r, milliseconds));`.
   *
   * Causes your script to wait for the given number of milliseconds.
   *
   * @remarks
   * It's generally recommended to not wait for a number of seconds, but instead
   * use {@link Frame.waitForSelector}, {@link Frame.waitForXPath} or
   * {@link Frame.waitForFunction} to wait for exactly the conditions you want.
   *
   * @example
   *
   * Wait for 1 second:
   *
   * ```ts
   * await frame.waitForTimeout(1000);
   * ```
   *
   * @param milliseconds - the number of milliseconds to wait.
   */
  waitForTimeout(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }
  /**
   * @returns the frame's title.
   */
  async title() {
    return this.worlds[PUPPETEER_WORLD].title();
  }
  /**
   * @internal
   */
  _navigated(framePayload) {
    this._name = framePayload.name;
    __classPrivateFieldSet10(this, _Frame_url, `${framePayload.url}${framePayload.urlFragment || ""}`, "f");
  }
  /**
   * @internal
   */
  _navigatedWithinDocument(url) {
    __classPrivateFieldSet10(this, _Frame_url, url, "f");
  }
  /**
   * @internal
   */
  _onLifecycleEvent(loaderId, name) {
    if (name === "init") {
      this._loaderId = loaderId;
      this._lifecycleEvents.clear();
    }
    this._lifecycleEvents.add(name);
  }
  /**
   * @internal
   */
  _onLoadingStopped() {
    this._lifecycleEvents.add("DOMContentLoaded");
    this._lifecycleEvents.add("load");
  }
  /**
   * @internal
   */
  _onLoadingStarted() {
    this._hasStartedLoading = true;
  }
  /**
   * @internal
   */
  _detach() {
    __classPrivateFieldSet10(this, _Frame_detached, true, "f");
    this.worlds[MAIN_WORLD]._detach();
    this.worlds[PUPPETEER_WORLD]._detach();
    if (__classPrivateFieldGet12(this, _Frame_parentFrame, "f")) {
      __classPrivateFieldGet12(this, _Frame_parentFrame, "f")._childFrames.delete(this);
    }
    __classPrivateFieldSet10(this, _Frame_parentFrame, null, "f");
  }
};
_Frame_parentFrame = /* @__PURE__ */ new WeakMap(), _Frame_url = /* @__PURE__ */ new WeakMap(), _Frame_detached = /* @__PURE__ */ new WeakMap(), _Frame_client = /* @__PURE__ */ new WeakMap();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/AriaQueryHandler.js
async function queryAXTree(client, element, accessibleName, role) {
  const { nodes } = await client.send("Accessibility.queryAXTree", {
    objectId: element.remoteObject().objectId,
    accessibleName,
    role
  });
  const filteredNodes = nodes.filter((node) => {
    return !node.role || node.role.value !== "StaticText";
  });
  return filteredNodes;
}
var normalizeValue = (value) => {
  return value.replace(/ +/g, " ").trim();
};
var knownAttributes = /* @__PURE__ */ new Set(["name", "role"]);
var attributeRegexp = /\[\s*(?<attribute>\w+)\s*=\s*(?<quote>"|')(?<value>\\.|.*?(?=\k<quote>))\k<quote>\s*\]/g;
function isKnownAttribute(attribute) {
  return knownAttributes.has(attribute);
}
function parseAriaSelector(selector) {
  const queryOptions = {};
  const defaultName = selector.replace(attributeRegexp, (_, attribute, _quote, value) => {
    attribute = attribute.trim();
    assert(isKnownAttribute(attribute), `Unknown aria attribute "${attribute}" in selector`);
    queryOptions[attribute] = normalizeValue(value);
    return "";
  });
  if (defaultName && !queryOptions.name) {
    queryOptions.name = normalizeValue(defaultName);
  }
  return queryOptions;
}
var queryOneId = async (element, selector) => {
  const { name, role } = parseAriaSelector(selector);
  const res = await queryAXTree(element.client, element, name, role);
  if (!res[0] || !res[0].backendDOMNodeId) {
    return null;
  }
  return res[0].backendDOMNodeId;
};
var queryOne = async (element, selector) => {
  const id = await queryOneId(element, selector);
  if (!id) {
    return null;
  }
  return await element.frame.worlds[MAIN_WORLD].adoptBackendNode(id);
};
var waitFor = async (elementOrFrame, selector, options) => {
  let frame;
  let element;
  if (elementOrFrame instanceof Frame) {
    frame = elementOrFrame;
  } else {
    frame = elementOrFrame.frame;
    element = await frame.worlds[PUPPETEER_WORLD].adoptHandle(elementOrFrame);
  }
  const binding = {
    name: "ariaQuerySelector",
    pptrFunction: async (selector2) => {
      const id = await queryOneId(element || await frame.worlds[PUPPETEER_WORLD].document(), selector2);
      if (!id) {
        return null;
      }
      return await frame.worlds[PUPPETEER_WORLD].adoptBackendNode(id);
    }
  };
  const result = await frame.worlds[PUPPETEER_WORLD]._waitForSelectorInPage((_, selector2) => {
    return globalThis.ariaQuerySelector(selector2);
  }, element, selector, options, binding);
  if (element) {
    await element.dispose();
  }
  if (!result) {
    return null;
  }
  if (!(result instanceof ElementHandle)) {
    await result.dispose();
    return null;
  }
  return result.frame.worlds[MAIN_WORLD].transferHandle(result);
};
var queryAll = async (element, selector) => {
  const exeCtx = element.executionContext();
  const { name, role } = parseAriaSelector(selector);
  const res = await queryAXTree(exeCtx._client, element, name, role);
  const world = exeCtx._world;
  return Promise.all(res.map((axNode) => {
    return world.adoptBackendNode(axNode.backendDOMNodeId);
  }));
};
var ariaHandler = {
  queryOne,
  waitFor,
  queryAll
};

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/QueryHandler.js
function internalizeCustomQueryHandler(handler) {
  const internalHandler = {};
  if (handler.queryOne) {
    const queryOne2 = handler.queryOne;
    internalHandler.queryOne = async (element, selector) => {
      const jsHandle = await element.evaluateHandle(queryOne2, selector);
      const elementHandle = jsHandle.asElement();
      if (elementHandle) {
        return elementHandle;
      }
      await jsHandle.dispose();
      return null;
    };
    internalHandler.waitFor = async (elementOrFrame, selector, options) => {
      let frame;
      let element;
      if (elementOrFrame instanceof Frame) {
        frame = elementOrFrame;
      } else {
        frame = elementOrFrame.frame;
        element = await frame.worlds[PUPPETEER_WORLD].adoptHandle(elementOrFrame);
      }
      const result = await frame.worlds[PUPPETEER_WORLD]._waitForSelectorInPage(queryOne2, element, selector, options);
      if (element) {
        await element.dispose();
      }
      if (!result) {
        return null;
      }
      if (!(result instanceof ElementHandle)) {
        await result.dispose();
        return null;
      }
      return frame.worlds[MAIN_WORLD].transferHandle(result);
    };
  }
  if (handler.queryAll) {
    const queryAll2 = handler.queryAll;
    internalHandler.queryAll = async (element, selector) => {
      const jsHandle = await element.evaluateHandle(queryAll2, selector);
      const properties = await jsHandle.getProperties();
      await jsHandle.dispose();
      const result = [];
      for (const property of properties.values()) {
        const elementHandle = property.asElement();
        if (elementHandle) {
          result.push(elementHandle);
        }
      }
      return result;
    };
  }
  return internalHandler;
}
var defaultHandler = internalizeCustomQueryHandler({
  queryOne: (element, selector) => {
    if (!("querySelector" in element)) {
      throw new Error(`Could not invoke \`querySelector\` on node of type ${element.nodeName}.`);
    }
    return element.querySelector(selector);
  },
  queryAll: (element, selector) => {
    if (!("querySelectorAll" in element)) {
      throw new Error(`Could not invoke \`querySelectorAll\` on node of type ${element.nodeName}.`);
    }
    return [
      ...element.querySelectorAll(selector)
    ];
  }
});
var pierceHandler = internalizeCustomQueryHandler({
  queryOne: (element, selector) => {
    let found = null;
    const search = (root) => {
      const iter = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
      do {
        const currentNode = iter.currentNode;
        if (currentNode.shadowRoot) {
          search(currentNode.shadowRoot);
        }
        if (currentNode instanceof ShadowRoot) {
          continue;
        }
        if (currentNode !== root && !found && currentNode.matches(selector)) {
          found = currentNode;
        }
      } while (!found && iter.nextNode());
    };
    if (element instanceof Document) {
      element = element.documentElement;
    }
    search(element);
    return found;
  },
  queryAll: (element, selector) => {
    const result = [];
    const collect = (root) => {
      const iter = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
      do {
        const currentNode = iter.currentNode;
        if (currentNode.shadowRoot) {
          collect(currentNode.shadowRoot);
        }
        if (currentNode instanceof ShadowRoot) {
          continue;
        }
        if (currentNode !== root && currentNode.matches(selector)) {
          result.push(currentNode);
        }
      } while (iter.nextNode());
    };
    if (element instanceof Document) {
      element = element.documentElement;
    }
    collect(element);
    return result;
  }
});
var xpathHandler = internalizeCustomQueryHandler({
  queryOne: (element, selector) => {
    const doc = element.ownerDocument || document;
    const result = doc.evaluate(selector, element, null, XPathResult.FIRST_ORDERED_NODE_TYPE);
    return result.singleNodeValue;
  },
  queryAll: (element, selector) => {
    const doc = element.ownerDocument || document;
    const iterator = doc.evaluate(selector, element, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
    const array = [];
    let item;
    while (item = iterator.iterateNext()) {
      array.push(item);
    }
    return array;
  }
});
var INTERNAL_QUERY_HANDLERS = /* @__PURE__ */ new Map([
  ["aria", { handler: ariaHandler }],
  ["pierce", { handler: pierceHandler }],
  ["xpath", { handler: xpathHandler }]
]);
var QUERY_HANDLERS = /* @__PURE__ */ new Map();
function registerCustomQueryHandler(name, handler) {
  if (INTERNAL_QUERY_HANDLERS.has(name)) {
    throw new Error(`A query handler named "${name}" already exists`);
  }
  if (QUERY_HANDLERS.has(name)) {
    throw new Error(`A custom query handler named "${name}" already exists`);
  }
  const isValidName = /^[a-zA-Z]+$/.test(name);
  if (!isValidName) {
    throw new Error(`Custom query handler names may only contain [a-zA-Z]`);
  }
  QUERY_HANDLERS.set(name, { handler: internalizeCustomQueryHandler(handler) });
}
function unregisterCustomQueryHandler(name) {
  QUERY_HANDLERS.delete(name);
}
function customQueryHandlerNames() {
  return [...QUERY_HANDLERS.keys()];
}
function clearCustomQueryHandlers() {
  QUERY_HANDLERS.clear();
}
var CUSTOM_QUERY_SEPARATORS = ["=", "/"];
function getQueryHandlerAndSelector(selector) {
  for (const handlerMap of [QUERY_HANDLERS, INTERNAL_QUERY_HANDLERS]) {
    for (const [name, { handler: queryHandler, transformSelector }] of handlerMap) {
      for (const separator of CUSTOM_QUERY_SEPARATORS) {
        const prefix = `${name}${separator}`;
        if (selector.startsWith(prefix)) {
          selector = selector.slice(prefix.length);
          if (transformSelector) {
            selector = transformSelector(selector);
          }
          return { updatedSelector: selector, queryHandler };
        }
      }
    }
  }
  return { updatedSelector: selector, queryHandler: defaultHandler };
}

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/ElementHandle.js
var __classPrivateFieldSet11 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet13 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ElementHandle_instances;
var _ElementHandle_frame;
var _ElementHandle_frameManager_get;
var _ElementHandle_page_get;
var _ElementHandle_scrollIntoViewIfNeeded;
var _ElementHandle_getOOPIFOffsets;
var _ElementHandle_getBoxModel;
var _ElementHandle_fromProtocolQuad;
var _ElementHandle_intersectQuadWithViewport;
var applyOffsetsToQuad = (quad, offsetX, offsetY) => {
  return quad.map((part) => {
    return { x: part.x + offsetX, y: part.y + offsetY };
  });
};
var ElementHandle = class extends JSHandle {
  /**
   * @internal
   */
  constructor(context, remoteObject, frame) {
    super(context, remoteObject);
    _ElementHandle_instances.add(this);
    _ElementHandle_frame.set(this, void 0);
    __classPrivateFieldSet11(this, _ElementHandle_frame, frame, "f");
  }
  /**
   * @internal
   */
  get frame() {
    return __classPrivateFieldGet13(this, _ElementHandle_frame, "f");
  }
  /**
   * Queries the current element for an element matching the given selector.
   *
   * @param selector - The selector to query for.
   * @returns A {@link ElementHandle | element handle} to the first element
   * matching the given selector. Otherwise, `null`.
   */
  async $(selector) {
    const { updatedSelector, queryHandler } = getQueryHandlerAndSelector(selector);
    assert(queryHandler.queryOne, "Cannot handle queries for a single element with the given selector");
    return await queryHandler.queryOne(this, updatedSelector);
  }
  /**
   * Queries the current element for all elements matching the given selector.
   *
   * @param selector - The selector to query for.
   * @returns An array of {@link ElementHandle | element handles} that point to
   * elements matching the given selector.
   */
  async $$(selector) {
    const { updatedSelector, queryHandler } = getQueryHandlerAndSelector(selector);
    assert(queryHandler.queryAll, "Cannot handle queries for a multiple element with the given selector");
    return await queryHandler.queryAll(this, updatedSelector);
  }
  /**
   * Runs the given function on the first element matching the given selector in
   * the current element.
   *
   * If the given function returns a promise, then this method will wait till
   * the promise resolves.
   *
   * @example
   *
   * ```ts
   * const tweetHandle = await page.$('.tweet');
   * expect(await tweetHandle.$eval('.like', node => node.innerText)).toBe(
   *   '100'
   * );
   * expect(await tweetHandle.$eval('.retweets', node => node.innerText)).toBe(
   *   '10'
   * );
   * ```
   *
   * @param selector - The selector to query for.
   * @param pageFunction - The function to be evaluated in this element's page's
   * context. The first element matching the selector will be passed in as the
   * first argument.
   * @param args - Additional arguments to pass to `pageFunction`.
   * @returns A promise to the result of the function.
   */
  async $eval(selector, pageFunction, ...args) {
    const elementHandle = await this.$(selector);
    if (!elementHandle) {
      throw new Error(`Error: failed to find element matching selector "${selector}"`);
    }
    const result = await elementHandle.evaluate(pageFunction, ...args);
    await elementHandle.dispose();
    return result;
  }
  /**
   * Runs the given function on an array of elements matching the given selector
   * in the current element.
   *
   * If the given function returns a promise, then this method will wait till
   * the promise resolves.
   *
   * @example
   * HTML:
   *
   * ```html
   * <div class="feed">
   *   <div class="tweet">Hello!</div>
   *   <div class="tweet">Hi!</div>
   * </div>
   * ```
   *
   * JavaScript:
   *
   * ```js
   * const feedHandle = await page.$('.feed');
   * expect(
   *   await feedHandle.$$eval('.tweet', nodes => nodes.map(n => n.innerText))
   * ).toEqual(['Hello!', 'Hi!']);
   * ```
   *
   * @param selector - The selector to query for.
   * @param pageFunction - The function to be evaluated in the element's page's
   * context. An array of elements matching the given selector will be passed to
   * the function as its first argument.
   * @param args - Additional arguments to pass to `pageFunction`.
   * @returns A promise to the result of the function.
   */
  async $$eval(selector, pageFunction, ...args) {
    const { updatedSelector, queryHandler } = getQueryHandlerAndSelector(selector);
    assert(queryHandler.queryAll, "Cannot handle queries for a multiple element with the given selector");
    const handles = await queryHandler.queryAll(this, updatedSelector);
    const elements = await this.evaluateHandle((_, ...elements2) => {
      return elements2;
    }, ...handles);
    const [result] = await Promise.all([
      elements.evaluate(pageFunction, ...args),
      ...handles.map((handle) => {
        return handle.dispose();
      })
    ]);
    await elements.dispose();
    return result;
  }
  /**
   * @deprecated Use {@link ElementHandle.$$} with the `xpath` prefix.
   *
   * The method evaluates the XPath expression relative to the elementHandle.
   * If there are no such elements, the method will resolve to an empty array.
   * @param expression - Expression to {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate | evaluate}
   */
  async $x(expression) {
    if (expression.startsWith("//")) {
      expression = `.${expression}`;
    }
    return this.$$(`xpath/${expression}`);
  }
  /**
   * Wait for an element matching the given selector to appear in the current
   * element.
   *
   * Unlike {@link Frame.waitForSelector}, this method does not work across
   * navigations or if the element is detached from DOM.
   *
   * @example
   *
   * ```ts
   * const puppeteer = require('puppeteer');
   *
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   let currentURL;
   *   page
   *     .mainFrame()
   *     .waitForSelector('img')
   *     .then(() => console.log('First URL with image: ' + currentURL));
   *
   *   for (currentURL of [
   *     'https://example.com',
   *     'https://google.com',
   *     'https://bbc.com',
   *   ]) {
   *     await page.goto(currentURL);
   *   }
   *   await browser.close();
   * })();
   * ```
   *
   * @param selector - The selector to query and wait for.
   * @param options - Options for customizing waiting behavior.
   * @returns An element matching the given selector.
   * @throws Throws if an element matching the given selector doesn't appear.
   */
  async waitForSelector(selector, options = {}) {
    const { updatedSelector, queryHandler } = getQueryHandlerAndSelector(selector);
    assert(queryHandler.waitFor, "Query handler does not support waiting");
    return await queryHandler.waitFor(this, updatedSelector, options);
  }
  /**
   * @deprecated Use {@link ElementHandle.waitForSelector} with the `xpath`
   * prefix.
   *
   * Wait for the `xpath` within the element. If at the moment of calling the
   * method the `xpath` already exists, the method will return immediately. If
   * the `xpath` doesn't appear after the `timeout` milliseconds of waiting, the
   * function will throw.
   *
   * If `xpath` starts with `//` instead of `.//`, the dot will be appended
   * automatically.
   *
   * This method works across navigation
   *
   * ```ts
   * const puppeteer = require('puppeteer');
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   let currentURL;
   *   page
   *     .waitForXPath('//img')
   *     .then(() => console.log('First URL with image: ' + currentURL));
   *   for (currentURL of [
   *     'https://example.com',
   *     'https://google.com',
   *     'https://bbc.com',
   *   ]) {
   *     await page.goto(currentURL);
   *   }
   *   await browser.close();
   * })();
   * ```
   *
   * @param xpath - A
   * {@link https://developer.mozilla.org/en-US/docs/Web/XPath | xpath} of an
   * element to wait for
   * @param options - Optional waiting parameters
   * @returns Promise which resolves when element specified by xpath string is
   * added to DOM. Resolves to `null` if waiting for `hidden: true` and xpath is
   * not found in DOM.
   * @remarks
   * The optional Argument `options` have properties:
   *
   * - `visible`: A boolean to wait for element to be present in DOM and to be
   *   visible, i.e. to not have `display: none` or `visibility: hidden` CSS
   *   properties. Defaults to `false`.
   *
   * - `hidden`: A boolean wait for element to not be found in the DOM or to be
   *   hidden, i.e. have `display: none` or `visibility: hidden` CSS properties.
   *   Defaults to `false`.
   *
   * - `timeout`: A number which is maximum time to wait for in milliseconds.
   *   Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The
   *   default value can be changed by using the {@link Page.setDefaultTimeout}
   *   method.
   */
  async waitForXPath(xpath, options = {}) {
    if (xpath.startsWith("//")) {
      xpath = `.${xpath}`;
    }
    return this.waitForSelector(`xpath/${xpath}`, options);
  }
  asElement() {
    return this;
  }
  /**
   * Resolves to the content frame for element handles referencing
   * iframe nodes, or null otherwise
   */
  async contentFrame() {
    const nodeInfo = await this.client.send("DOM.describeNode", {
      objectId: this.remoteObject().objectId
    });
    if (typeof nodeInfo.node.frameId !== "string") {
      return null;
    }
    return __classPrivateFieldGet13(this, _ElementHandle_instances, "a", _ElementHandle_frameManager_get).frame(nodeInfo.node.frameId);
  }
  /**
   * Returns the middle point within an element unless a specific offset is provided.
   */
  async clickablePoint(offset) {
    const [result, layoutMetrics] = await Promise.all([
      this.client.send("DOM.getContentQuads", {
        objectId: this.remoteObject().objectId
      }).catch(debugError),
      __classPrivateFieldGet13(this, _ElementHandle_instances, "a", _ElementHandle_page_get)._client().send("Page.getLayoutMetrics")
    ]);
    if (!result || !result.quads.length) {
      throw new Error("Node is either not clickable or not an HTMLElement");
    }
    const { clientWidth, clientHeight } = layoutMetrics.cssLayoutViewport || layoutMetrics.layoutViewport;
    const { offsetX, offsetY } = await __classPrivateFieldGet13(this, _ElementHandle_instances, "m", _ElementHandle_getOOPIFOffsets).call(this, __classPrivateFieldGet13(this, _ElementHandle_frame, "f"));
    const quads = result.quads.map((quad2) => {
      return __classPrivateFieldGet13(this, _ElementHandle_instances, "m", _ElementHandle_fromProtocolQuad).call(this, quad2);
    }).map((quad2) => {
      return applyOffsetsToQuad(quad2, offsetX, offsetY);
    }).map((quad2) => {
      return __classPrivateFieldGet13(this, _ElementHandle_instances, "m", _ElementHandle_intersectQuadWithViewport).call(this, quad2, clientWidth, clientHeight);
    }).filter((quad2) => {
      return computeQuadArea(quad2) > 1;
    });
    if (!quads.length) {
      throw new Error("Node is either not clickable or not an HTMLElement");
    }
    const quad = quads[0];
    if (offset) {
      let minX = Number.MAX_SAFE_INTEGER;
      let minY = Number.MAX_SAFE_INTEGER;
      for (const point of quad) {
        if (point.x < minX) {
          minX = point.x;
        }
        if (point.y < minY) {
          minY = point.y;
        }
      }
      if (minX !== Number.MAX_SAFE_INTEGER && minY !== Number.MAX_SAFE_INTEGER) {
        return {
          x: minX + offset.x,
          y: minY + offset.y
        };
      }
    }
    let x = 0;
    let y = 0;
    for (const point of quad) {
      x += point.x;
      y += point.y;
    }
    return {
      x: x / 4,
      y: y / 4
    };
  }
  /**
   * This method scrolls element into view if needed, and then
   * uses {@link Page.mouse} to hover over the center of the element.
   * If the element is detached from DOM, the method throws an error.
   */
  async hover() {
    await __classPrivateFieldGet13(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
    const { x, y } = await this.clickablePoint();
    await __classPrivateFieldGet13(this, _ElementHandle_instances, "a", _ElementHandle_page_get).mouse.move(x, y);
  }
  /**
   * This method scrolls element into view if needed, and then
   * uses {@link Page.mouse} to click in the center of the element.
   * If the element is detached from DOM, the method throws an error.
   */
  async click(options = {}) {
    await __classPrivateFieldGet13(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
    const { x, y } = await this.clickablePoint(options.offset);
    await __classPrivateFieldGet13(this, _ElementHandle_instances, "a", _ElementHandle_page_get).mouse.click(x, y, options);
  }
  /**
   * This method creates and captures a dragevent from the element.
   */
  async drag(target) {
    assert(__classPrivateFieldGet13(this, _ElementHandle_instances, "a", _ElementHandle_page_get).isDragInterceptionEnabled(), "Drag Interception is not enabled!");
    await __classPrivateFieldGet13(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
    const start = await this.clickablePoint();
    return await __classPrivateFieldGet13(this, _ElementHandle_instances, "a", _ElementHandle_page_get).mouse.drag(start, target);
  }
  /**
   * This method creates a `dragenter` event on the element.
   */
  async dragEnter(data = { items: [], dragOperationsMask: 1 }) {
    await __classPrivateFieldGet13(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
    const target = await this.clickablePoint();
    await __classPrivateFieldGet13(this, _ElementHandle_instances, "a", _ElementHandle_page_get).mouse.dragEnter(target, data);
  }
  /**
   * This method creates a `dragover` event on the element.
   */
  async dragOver(data = { items: [], dragOperationsMask: 1 }) {
    await __classPrivateFieldGet13(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
    const target = await this.clickablePoint();
    await __classPrivateFieldGet13(this, _ElementHandle_instances, "a", _ElementHandle_page_get).mouse.dragOver(target, data);
  }
  /**
   * This method triggers a drop on the element.
   */
  async drop(data = { items: [], dragOperationsMask: 1 }) {
    await __classPrivateFieldGet13(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
    const destination = await this.clickablePoint();
    await __classPrivateFieldGet13(this, _ElementHandle_instances, "a", _ElementHandle_page_get).mouse.drop(destination, data);
  }
  /**
   * This method triggers a dragenter, dragover, and drop on the element.
   */
  async dragAndDrop(target, options) {
    await __classPrivateFieldGet13(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
    const startPoint = await this.clickablePoint();
    const targetPoint = await target.clickablePoint();
    await __classPrivateFieldGet13(this, _ElementHandle_instances, "a", _ElementHandle_page_get).mouse.dragAndDrop(startPoint, targetPoint, options);
  }
  /**
   * Triggers a `change` and `input` event once all the provided options have been
   * selected. If there's no `<select>` element matching `selector`, the method
   * throws an error.
   *
   * @example
   *
   * ```ts
   * handle.select('blue'); // single selection
   * handle.select('red', 'green', 'blue'); // multiple selections
   * ```
   *
   * @param values - Values of options to select. If the `<select>` has the
   * `multiple` attribute, all values are considered, otherwise only the first
   * one is taken into account.
   */
  async select(...values) {
    for (const value of values) {
      assert(isString(value), 'Values must be strings. Found value "' + value + '" of type "' + typeof value + '"');
    }
    return this.evaluate((element, vals) => {
      const values2 = new Set(vals);
      if (!(element instanceof HTMLSelectElement)) {
        throw new Error("Element is not a <select> element.");
      }
      const selectedValues = /* @__PURE__ */ new Set();
      if (!element.multiple) {
        for (const option of element.options) {
          option.selected = false;
        }
        for (const option of element.options) {
          if (values2.has(option.value)) {
            option.selected = true;
            selectedValues.add(option.value);
            break;
          }
        }
      } else {
        for (const option of element.options) {
          option.selected = values2.has(option.value);
          if (option.selected) {
            selectedValues.add(option.value);
          }
        }
      }
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
      return [...selectedValues.values()];
    }, values);
  }
  /**
   * This method expects `elementHandle` to point to an
   * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input | input element}.
   *
   * @param filePaths - Sets the value of the file input to these paths.
   * If a path is relative, then it is resolved against the
   * {@link https://nodejs.org/api/process.html#process_process_cwd | current working directory}.
   * Note for locals script connecting to remote chrome environments,
   * paths must be absolute.
   */
  async uploadFile(...filePaths) {
    const isMultiple = await this.evaluate((element) => {
      return element.multiple;
    });
    assert(filePaths.length <= 1 || isMultiple, "Multiple file uploads only work with <input type=file multiple>");
    let path;
    try {
      path = await import("path");
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error(`JSHandle#uploadFile can only be used in Node-like environments.`);
      }
      throw error;
    }
    const files = filePaths.map((filePath) => {
      if (path.win32.isAbsolute(filePath) || path.posix.isAbsolute(filePath)) {
        return filePath;
      } else {
        return path.resolve(filePath);
      }
    });
    const { objectId } = this.remoteObject();
    const { node } = await this.client.send("DOM.describeNode", { objectId });
    const { backendNodeId } = node;
    if (files.length === 0) {
      await this.evaluate((element) => {
        element.files = new DataTransfer().files;
        element.dispatchEvent(new Event("input", { bubbles: true }));
        element.dispatchEvent(new Event("change", { bubbles: true }));
      });
    } else {
      await this.client.send("DOM.setFileInputFiles", {
        objectId,
        files,
        backendNodeId
      });
    }
  }
  /**
   * This method scrolls element into view if needed, and then uses
   * {@link Touchscreen.tap} to tap in the center of the element.
   * If the element is detached from DOM, the method throws an error.
   */
  async tap() {
    await __classPrivateFieldGet13(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
    const { x, y } = await this.clickablePoint();
    await __classPrivateFieldGet13(this, _ElementHandle_instances, "a", _ElementHandle_page_get).touchscreen.tap(x, y);
  }
  /**
   * Calls {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus | focus} on the element.
   */
  async focus() {
    await this.evaluate((element) => {
      if (!(element instanceof HTMLElement)) {
        throw new Error("Cannot focus non-HTMLElement");
      }
      return element.focus();
    });
  }
  /**
   * Focuses the element, and then sends a `keydown`, `keypress`/`input`, and
   * `keyup` event for each character in the text.
   *
   * To press a special key, like `Control` or `ArrowDown`,
   * use {@link ElementHandle.press}.
   *
   * @example
   *
   * ```ts
   * await elementHandle.type('Hello'); // Types instantly
   * await elementHandle.type('World', {delay: 100}); // Types slower, like a user
   * ```
   *
   * @example
   * An example of typing into a text field and then submitting the form:
   *
   * ```ts
   * const elementHandle = await page.$('input');
   * await elementHandle.type('some text');
   * await elementHandle.press('Enter');
   * ```
   */
  async type(text, options) {
    await this.focus();
    await __classPrivateFieldGet13(this, _ElementHandle_instances, "a", _ElementHandle_page_get).keyboard.type(text, options);
  }
  /**
   * Focuses the element, and then uses {@link Keyboard.down} and {@link Keyboard.up}.
   *
   * @remarks
   * If `key` is a single character and no modifier keys besides `Shift`
   * are being held down, a `keypress`/`input` event will also be generated.
   * The `text` option can be specified to force an input event to be generated.
   *
   * **NOTE** Modifier keys DO affect `elementHandle.press`. Holding down `Shift`
   * will type the text in upper case.
   *
   * @param key - Name of key to press, such as `ArrowLeft`.
   * See {@link KeyInput} for a list of all key names.
   */
  async press(key, options) {
    await this.focus();
    await __classPrivateFieldGet13(this, _ElementHandle_instances, "a", _ElementHandle_page_get).keyboard.press(key, options);
  }
  /**
   * This method returns the bounding box of the element (relative to the main frame),
   * or `null` if the element is not visible.
   */
  async boundingBox() {
    const result = await __classPrivateFieldGet13(this, _ElementHandle_instances, "m", _ElementHandle_getBoxModel).call(this);
    if (!result) {
      return null;
    }
    const { offsetX, offsetY } = await __classPrivateFieldGet13(this, _ElementHandle_instances, "m", _ElementHandle_getOOPIFOffsets).call(this, __classPrivateFieldGet13(this, _ElementHandle_frame, "f"));
    const quad = result.model.border;
    const x = Math.min(quad[0], quad[2], quad[4], quad[6]);
    const y = Math.min(quad[1], quad[3], quad[5], quad[7]);
    const width = Math.max(quad[0], quad[2], quad[4], quad[6]) - x;
    const height = Math.max(quad[1], quad[3], quad[5], quad[7]) - y;
    return { x: x + offsetX, y: y + offsetY, width, height };
  }
  /**
   * This method returns boxes of the element, or `null` if the element is not visible.
   *
   * @remarks
   *
   * Boxes are represented as an array of points;
   * Each Point is an object `{x, y}`. Box points are sorted clock-wise.
   */
  async boxModel() {
    const result = await __classPrivateFieldGet13(this, _ElementHandle_instances, "m", _ElementHandle_getBoxModel).call(this);
    if (!result) {
      return null;
    }
    const { offsetX, offsetY } = await __classPrivateFieldGet13(this, _ElementHandle_instances, "m", _ElementHandle_getOOPIFOffsets).call(this, __classPrivateFieldGet13(this, _ElementHandle_frame, "f"));
    const { content, padding, border, margin, width, height } = result.model;
    return {
      content: applyOffsetsToQuad(__classPrivateFieldGet13(this, _ElementHandle_instances, "m", _ElementHandle_fromProtocolQuad).call(this, content), offsetX, offsetY),
      padding: applyOffsetsToQuad(__classPrivateFieldGet13(this, _ElementHandle_instances, "m", _ElementHandle_fromProtocolQuad).call(this, padding), offsetX, offsetY),
      border: applyOffsetsToQuad(__classPrivateFieldGet13(this, _ElementHandle_instances, "m", _ElementHandle_fromProtocolQuad).call(this, border), offsetX, offsetY),
      margin: applyOffsetsToQuad(__classPrivateFieldGet13(this, _ElementHandle_instances, "m", _ElementHandle_fromProtocolQuad).call(this, margin), offsetX, offsetY),
      width,
      height
    };
  }
  /**
   * This method scrolls element into view if needed, and then uses
   * {@link Page.screenshot} to take a screenshot of the element.
   * If the element is detached from DOM, the method throws an error.
   */
  async screenshot(options = {}) {
    let needsViewportReset = false;
    let boundingBox = await this.boundingBox();
    assert(boundingBox, "Node is either not visible or not an HTMLElement");
    const viewport = __classPrivateFieldGet13(this, _ElementHandle_instances, "a", _ElementHandle_page_get).viewport();
    if (viewport && (boundingBox.width > viewport.width || boundingBox.height > viewport.height)) {
      const newViewport = {
        width: Math.max(viewport.width, Math.ceil(boundingBox.width)),
        height: Math.max(viewport.height, Math.ceil(boundingBox.height))
      };
      await __classPrivateFieldGet13(this, _ElementHandle_instances, "a", _ElementHandle_page_get).setViewport(Object.assign({}, viewport, newViewport));
      needsViewportReset = true;
    }
    await __classPrivateFieldGet13(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
    boundingBox = await this.boundingBox();
    assert(boundingBox, "Node is either not visible or not an HTMLElement");
    assert(boundingBox.width !== 0, "Node has 0 width.");
    assert(boundingBox.height !== 0, "Node has 0 height.");
    const layoutMetrics = await this.client.send("Page.getLayoutMetrics");
    const { pageX, pageY } = layoutMetrics.cssVisualViewport || layoutMetrics.layoutViewport;
    const clip = Object.assign({}, boundingBox);
    clip.x += pageX;
    clip.y += pageY;
    const imageData = await __classPrivateFieldGet13(this, _ElementHandle_instances, "a", _ElementHandle_page_get).screenshot(Object.assign({}, {
      clip
    }, options));
    if (needsViewportReset && viewport) {
      await __classPrivateFieldGet13(this, _ElementHandle_instances, "a", _ElementHandle_page_get).setViewport(viewport);
    }
    return imageData;
  }
  /**
   * Resolves to true if the element is visible in the current viewport.
   */
  async isIntersectingViewport(options) {
    const { threshold = 0 } = options !== null && options !== void 0 ? options : {};
    return await this.evaluate(async (element, threshold2) => {
      const visibleRatio = await new Promise((resolve) => {
        const observer = new IntersectionObserver((entries) => {
          resolve(entries[0].intersectionRatio);
          observer.disconnect();
        });
        observer.observe(element);
      });
      return threshold2 === 1 ? visibleRatio === 1 : visibleRatio > threshold2;
    }, threshold);
  }
};
_ElementHandle_frame = /* @__PURE__ */ new WeakMap(), _ElementHandle_instances = /* @__PURE__ */ new WeakSet(), _ElementHandle_frameManager_get = function _ElementHandle_frameManager_get2() {
  return __classPrivateFieldGet13(this, _ElementHandle_frame, "f")._frameManager;
}, _ElementHandle_page_get = function _ElementHandle_page_get2() {
  return __classPrivateFieldGet13(this, _ElementHandle_frame, "f").page();
}, _ElementHandle_scrollIntoViewIfNeeded = async function _ElementHandle_scrollIntoViewIfNeeded2() {
  const error = await this.evaluate(async (element) => {
    if (!element.isConnected) {
      return "Node is detached from document";
    }
    if (element.nodeType !== Node.ELEMENT_NODE) {
      return "Node is not of type HTMLElement";
    }
    return;
  });
  if (error) {
    throw new Error(error);
  }
  try {
    await this.client.send("DOM.scrollIntoViewIfNeeded", {
      objectId: this.remoteObject().objectId
    });
  } catch (_err) {
    await this.evaluate(async (element, pageJavascriptEnabled) => {
      const visibleRatio = async () => {
        return await new Promise((resolve) => {
          const observer = new IntersectionObserver((entries) => {
            resolve(entries[0].intersectionRatio);
            observer.disconnect();
          });
          observer.observe(element);
        });
      };
      if (!pageJavascriptEnabled || await visibleRatio() !== 1) {
        element.scrollIntoView({
          block: "center",
          inline: "center",
          // @ts-expect-error Chrome still supports behavior: instant but
          // it's not in the spec so TS shouts We don't want to make this
          // breaking change in Puppeteer yet so we'll ignore the line.
          behavior: "instant"
        });
      }
    }, __classPrivateFieldGet13(this, _ElementHandle_instances, "a", _ElementHandle_page_get).isJavaScriptEnabled());
  }
}, _ElementHandle_getOOPIFOffsets = async function _ElementHandle_getOOPIFOffsets2(frame) {
  let offsetX = 0;
  let offsetY = 0;
  let currentFrame = frame;
  while (currentFrame && currentFrame.parentFrame()) {
    const parent = currentFrame.parentFrame();
    if (!currentFrame.isOOPFrame() || !parent) {
      currentFrame = parent;
      continue;
    }
    const { backendNodeId } = await parent._client().send("DOM.getFrameOwner", {
      frameId: currentFrame._id
    });
    const result = await parent._client().send("DOM.getBoxModel", {
      backendNodeId
    });
    if (!result) {
      break;
    }
    const contentBoxQuad = result.model.content;
    const topLeftCorner = __classPrivateFieldGet13(this, _ElementHandle_instances, "m", _ElementHandle_fromProtocolQuad).call(this, contentBoxQuad)[0];
    offsetX += topLeftCorner.x;
    offsetY += topLeftCorner.y;
    currentFrame = parent;
  }
  return { offsetX, offsetY };
}, _ElementHandle_getBoxModel = function _ElementHandle_getBoxModel2() {
  const params = {
    objectId: this.remoteObject().objectId
  };
  return this.client.send("DOM.getBoxModel", params).catch((error) => {
    return debugError(error);
  });
}, _ElementHandle_fromProtocolQuad = function _ElementHandle_fromProtocolQuad2(quad) {
  return [
    { x: quad[0], y: quad[1] },
    { x: quad[2], y: quad[3] },
    { x: quad[4], y: quad[5] },
    { x: quad[6], y: quad[7] }
  ];
}, _ElementHandle_intersectQuadWithViewport = function _ElementHandle_intersectQuadWithViewport2(quad, width, height) {
  return quad.map((point) => {
    return {
      x: Math.min(Math.max(point.x, 0), width),
      y: Math.min(Math.max(point.y, 0), height)
    };
  });
};
function computeQuadArea(quad) {
  let area = 0;
  for (let i = 0; i < quad.length; ++i) {
    const p1 = quad[i];
    const p2 = quad[(i + 1) % quad.length];
    area += (p1.x * p2.y - p2.x * p1.y) / 2;
  }
  return Math.abs(area);
}

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/util.js
import { Readable } from "node:stream";
import { Buffer as Buffer2 } from "node:buffer";
var debugError = debug("puppeteer:error");
function getExceptionMessage(exceptionDetails) {
  if (exceptionDetails.exception) {
    return exceptionDetails.exception.description || exceptionDetails.exception.value;
  }
  let message = exceptionDetails.text;
  if (exceptionDetails.stackTrace) {
    for (const callframe of exceptionDetails.stackTrace.callFrames) {
      const location = callframe.url + ":" + callframe.lineNumber + ":" + callframe.columnNumber;
      const functionName = callframe.functionName || "<anonymous>";
      message += `
    at ${functionName} (${location})`;
    }
  }
  return message;
}
function valueFromRemoteObject(remoteObject) {
  assert(!remoteObject.objectId, "Cannot extract value when objectId is given");
  if (remoteObject.unserializableValue) {
    if (remoteObject.type === "bigint" && typeof BigInt !== "undefined") {
      return BigInt(remoteObject.unserializableValue.replace("n", ""));
    }
    switch (remoteObject.unserializableValue) {
      case "-0":
        return -0;
      case "NaN":
        return NaN;
      case "Infinity":
        return Infinity;
      case "-Infinity":
        return -Infinity;
      default:
        throw new Error("Unsupported unserializable value: " + remoteObject.unserializableValue);
    }
  }
  return remoteObject.value;
}
async function releaseObject(client, remoteObject) {
  if (!remoteObject.objectId) {
    return;
  }
  await client.send("Runtime.releaseObject", { objectId: remoteObject.objectId }).catch((error) => {
    debugError(error);
  });
}
function addEventListener(emitter, eventName, handler) {
  emitter.on(eventName, handler);
  return { emitter, eventName, handler };
}
function removeEventListeners(listeners) {
  for (const listener of listeners) {
    listener.emitter.removeListener(listener.eventName, listener.handler);
  }
  listeners.length = 0;
}
var isString = (obj) => {
  return typeof obj === "string" || obj instanceof String;
};
var isNumber = (obj) => {
  return typeof obj === "number" || obj instanceof Number;
};
async function waitForEvent(emitter, eventName, predicate, timeout, abortPromise) {
  let eventTimeout;
  let resolveCallback;
  let rejectCallback;
  const promise = new Promise((resolve, reject) => {
    resolveCallback = resolve;
    rejectCallback = reject;
  });
  const listener = addEventListener(emitter, eventName, async (event) => {
    if (!await predicate(event)) {
      return;
    }
    resolveCallback(event);
  });
  if (timeout) {
    eventTimeout = setTimeout(() => {
      rejectCallback(new TimeoutError("Timeout exceeded while waiting for event"));
    }, timeout);
  }
  function cleanup() {
    removeEventListeners([listener]);
    clearTimeout(eventTimeout);
  }
  const result = await Promise.race([promise, abortPromise]).then((r) => {
    cleanup();
    return r;
  }, (error) => {
    cleanup();
    throw error;
  });
  if (isErrorLike(result)) {
    throw result;
  }
  return result;
}
function createJSHandle(context, remoteObject) {
  if (remoteObject.subtype === "node" && context._world) {
    return new ElementHandle(context, remoteObject, context._world.frame());
  }
  return new JSHandle(context, remoteObject);
}
function evaluationString(fun, ...args) {
  if (isString(fun)) {
    assert(args.length === 0, "Cannot evaluate a string with arguments");
    return fun;
  }
  function serializeArgument(arg) {
    if (Object.is(arg, void 0)) {
      return "undefined";
    }
    return JSON.stringify(arg);
  }
  return `(${fun})(${args.map(serializeArgument).join(",")})`;
}
function pageBindingInitString(type, name) {
  function addPageBinding(type2, bindingName) {
    const win = window;
    const binding = win[bindingName];
    win[bindingName] = (...args) => {
      const me = window[bindingName];
      let callbacks = me.callbacks;
      if (!callbacks) {
        callbacks = /* @__PURE__ */ new Map();
        me.callbacks = callbacks;
      }
      const seq = (me.lastSeq || 0) + 1;
      me.lastSeq = seq;
      const promise = new Promise((resolve, reject) => {
        return callbacks.set(seq, { resolve, reject });
      });
      binding(JSON.stringify({ type: type2, name: bindingName, seq, args }));
      return promise;
    };
  }
  return evaluationString(addPageBinding, type, name);
}
function pageBindingDeliverResultString(name, seq, result) {
  function deliverResult(name2, seq2, result2) {
    window[name2].callbacks.get(seq2).resolve(result2);
    window[name2].callbacks.delete(seq2);
  }
  return evaluationString(deliverResult, name, seq, result);
}
function pageBindingDeliverErrorString(name, seq, message, stack) {
  function deliverError(name2, seq2, message2, stack2) {
    const error = new Error(message2);
    error.stack = stack2;
    window[name2].callbacks.get(seq2).reject(error);
    window[name2].callbacks.delete(seq2);
  }
  return evaluationString(deliverError, name, seq, message, stack);
}
function pageBindingDeliverErrorValueString(name, seq, value) {
  function deliverErrorValue(name2, seq2, value2) {
    window[name2].callbacks.get(seq2).reject(value2);
    window[name2].callbacks.delete(seq2);
  }
  return evaluationString(deliverErrorValue, name, seq, value);
}
function makePredicateString(predicate, predicateQueryHandler2) {
  function checkWaitForOptions2(node, waitForVisible, waitForHidden) {
    if (!node) {
      return waitForHidden;
    }
    if (!waitForVisible && !waitForHidden) {
      return node;
    }
    const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
    const style = window.getComputedStyle(element);
    const isVisible = style && style.visibility !== "hidden" && hasVisibleBoundingBox();
    const success = waitForVisible === isVisible || waitForHidden === !isVisible;
    return success ? node : null;
    function hasVisibleBoundingBox() {
      const rect = element.getBoundingClientRect();
      return !!(rect.top || rect.bottom || rect.width || rect.height);
    }
  }
  return `
    (() => {
      const predicateQueryHandler = ${predicateQueryHandler2};
      const checkWaitForOptions = ${checkWaitForOptions2};
      return (${predicate})(...args)
    })() `;
}
async function waitWithTimeout(promise, taskName, timeout) {
  let reject;
  const timeoutError = new TimeoutError(`waiting for ${taskName} failed: timeout ${timeout}ms exceeded`);
  const timeoutPromise = new Promise((_res, rej) => {
    return reject = rej;
  });
  let timeoutTimer = null;
  if (timeout) {
    timeoutTimer = setTimeout(() => {
      return reject(timeoutError);
    }, timeout);
  }
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutTimer) {
      clearTimeout(timeoutTimer);
    }
  }
}
async function getReadableAsBuffer(readable, path) {
  const buffers = [];
  if (path) {
    throw new Error("Cannot write to a path outside of a Node-like environment.");
  } else {
    for await (const chunk of readable) {
      buffers.push(chunk);
    }
  }
  try {
    return Buffer2.concat(buffers);
  } catch (error) {
    return null;
  }
}
async function getReadableFromProtocolStream(client, handle) {
  let eof = false;
  return new Readable({
    async read(size) {
      if (eof) {
        return;
      }
      const response = await client.send("IO.read", { handle, size });
      this.push(response.data, response.base64Encoded ? "base64" : void 0);
      if (response.eof) {
        eof = true;
        await client.send("IO.close", { handle });
        this.push(null);
      }
    }
  });
}

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Browser.js
init_checked_fetch();
init_modules_watch_stub();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Target.js
init_checked_fetch();
init_modules_watch_stub();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Page.js
init_checked_fetch();
init_modules_watch_stub();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Accessibility.js
init_checked_fetch();
init_modules_watch_stub();
var __classPrivateFieldSet12 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet14 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Accessibility_client;
var _AXNode_instances;
var _AXNode_richlyEditable;
var _AXNode_editable;
var _AXNode_focusable;
var _AXNode_hidden;
var _AXNode_name;
var _AXNode_role;
var _AXNode_ignored;
var _AXNode_cachedHasFocusableChild;
var _AXNode_isPlainTextField;
var _AXNode_isTextOnlyObject;
var _AXNode_hasFocusableChild;
var Accessibility = class {
  /**
   * @internal
   */
  constructor(client) {
    _Accessibility_client.set(this, void 0);
    __classPrivateFieldSet12(this, _Accessibility_client, client, "f");
  }
  /**
   * Captures the current state of the accessibility tree.
   * The returned object represents the root accessible node of the page.
   *
   * @remarks
   *
   * **NOTE** The Chromium accessibility tree contains nodes that go unused on
   * most platforms and by most screen readers. Puppeteer will discard them as
   * well for an easier to process tree, unless `interestingOnly` is set to
   * `false`.
   *
   * @example
   * An example of dumping the entire accessibility tree:
   *
   * ```ts
   * const snapshot = await page.accessibility.snapshot();
   * console.log(snapshot);
   * ```
   *
   * @example
   * An example of logging the focused node's name:
   *
   * ```ts
   * const snapshot = await page.accessibility.snapshot();
   * const node = findFocusedNode(snapshot);
   * console.log(node && node.name);
   *
   * function findFocusedNode(node) {
   *   if (node.focused) return node;
   *   for (const child of node.children || []) {
   *     const foundNode = findFocusedNode(child);
   *     return foundNode;
   *   }
   *   return null;
   * }
   * ```
   *
   * @returns An AXNode object representing the snapshot.
   */
  async snapshot(options = {}) {
    var _a2, _b;
    const { interestingOnly = true, root = null } = options;
    const { nodes } = await __classPrivateFieldGet14(this, _Accessibility_client, "f").send("Accessibility.getFullAXTree");
    let backendNodeId;
    if (root) {
      const { node } = await __classPrivateFieldGet14(this, _Accessibility_client, "f").send("DOM.describeNode", {
        objectId: root.remoteObject().objectId
      });
      backendNodeId = node.backendNodeId;
    }
    const defaultRoot = AXNode.createTree(nodes);
    let needle = defaultRoot;
    if (backendNodeId) {
      needle = defaultRoot.find((node) => {
        return node.payload.backendDOMNodeId === backendNodeId;
      });
      if (!needle) {
        return null;
      }
    }
    if (!interestingOnly) {
      return (_a2 = this.serializeTree(needle)[0]) !== null && _a2 !== void 0 ? _a2 : null;
    }
    const interestingNodes = /* @__PURE__ */ new Set();
    this.collectInterestingNodes(interestingNodes, defaultRoot, false);
    if (!interestingNodes.has(needle)) {
      return null;
    }
    return (_b = this.serializeTree(needle, interestingNodes)[0]) !== null && _b !== void 0 ? _b : null;
  }
  serializeTree(node, interestingNodes) {
    const children = [];
    for (const child of node.children) {
      children.push(...this.serializeTree(child, interestingNodes));
    }
    if (interestingNodes && !interestingNodes.has(node)) {
      return children;
    }
    const serializedNode = node.serialize();
    if (children.length) {
      serializedNode.children = children;
    }
    return [serializedNode];
  }
  collectInterestingNodes(collection, node, insideControl) {
    if (node.isInteresting(insideControl)) {
      collection.add(node);
    }
    if (node.isLeafNode()) {
      return;
    }
    insideControl = insideControl || node.isControl();
    for (const child of node.children) {
      this.collectInterestingNodes(collection, child, insideControl);
    }
  }
};
_Accessibility_client = /* @__PURE__ */ new WeakMap();
var AXNode = class {
  constructor(payload) {
    _AXNode_instances.add(this);
    this.children = [];
    _AXNode_richlyEditable.set(this, false);
    _AXNode_editable.set(this, false);
    _AXNode_focusable.set(this, false);
    _AXNode_hidden.set(this, false);
    _AXNode_name.set(this, void 0);
    _AXNode_role.set(this, void 0);
    _AXNode_ignored.set(this, void 0);
    _AXNode_cachedHasFocusableChild.set(this, void 0);
    this.payload = payload;
    __classPrivateFieldSet12(this, _AXNode_name, this.payload.name ? this.payload.name.value : "", "f");
    __classPrivateFieldSet12(this, _AXNode_role, this.payload.role ? this.payload.role.value : "Unknown", "f");
    __classPrivateFieldSet12(this, _AXNode_ignored, this.payload.ignored, "f");
    for (const property of this.payload.properties || []) {
      if (property.name === "editable") {
        __classPrivateFieldSet12(this, _AXNode_richlyEditable, property.value.value === "richtext", "f");
        __classPrivateFieldSet12(this, _AXNode_editable, true, "f");
      }
      if (property.name === "focusable") {
        __classPrivateFieldSet12(this, _AXNode_focusable, property.value.value, "f");
      }
      if (property.name === "hidden") {
        __classPrivateFieldSet12(this, _AXNode_hidden, property.value.value, "f");
      }
    }
  }
  find(predicate) {
    if (predicate(this)) {
      return this;
    }
    for (const child of this.children) {
      const result = child.find(predicate);
      if (result) {
        return result;
      }
    }
    return null;
  }
  isLeafNode() {
    if (!this.children.length) {
      return true;
    }
    if (__classPrivateFieldGet14(this, _AXNode_instances, "m", _AXNode_isPlainTextField).call(this) || __classPrivateFieldGet14(this, _AXNode_instances, "m", _AXNode_isTextOnlyObject).call(this)) {
      return true;
    }
    switch (__classPrivateFieldGet14(this, _AXNode_role, "f")) {
      case "doc-cover":
      case "graphics-symbol":
      case "img":
      case "Meter":
      case "scrollbar":
      case "slider":
      case "separator":
      case "progressbar":
        return true;
      default:
        break;
    }
    if (__classPrivateFieldGet14(this, _AXNode_instances, "m", _AXNode_hasFocusableChild).call(this)) {
      return false;
    }
    if (__classPrivateFieldGet14(this, _AXNode_focusable, "f") && __classPrivateFieldGet14(this, _AXNode_name, "f")) {
      return true;
    }
    if (__classPrivateFieldGet14(this, _AXNode_role, "f") === "heading" && __classPrivateFieldGet14(this, _AXNode_name, "f")) {
      return true;
    }
    return false;
  }
  isControl() {
    switch (__classPrivateFieldGet14(this, _AXNode_role, "f")) {
      case "button":
      case "checkbox":
      case "ColorWell":
      case "combobox":
      case "DisclosureTriangle":
      case "listbox":
      case "menu":
      case "menubar":
      case "menuitem":
      case "menuitemcheckbox":
      case "menuitemradio":
      case "radio":
      case "scrollbar":
      case "searchbox":
      case "slider":
      case "spinbutton":
      case "switch":
      case "tab":
      case "textbox":
      case "tree":
      case "treeitem":
        return true;
      default:
        return false;
    }
  }
  isInteresting(insideControl) {
    const role = __classPrivateFieldGet14(this, _AXNode_role, "f");
    if (role === "Ignored" || __classPrivateFieldGet14(this, _AXNode_hidden, "f") || __classPrivateFieldGet14(this, _AXNode_ignored, "f")) {
      return false;
    }
    if (__classPrivateFieldGet14(this, _AXNode_focusable, "f") || __classPrivateFieldGet14(this, _AXNode_richlyEditable, "f")) {
      return true;
    }
    if (this.isControl()) {
      return true;
    }
    if (insideControl) {
      return false;
    }
    return this.isLeafNode() && !!__classPrivateFieldGet14(this, _AXNode_name, "f");
  }
  serialize() {
    const properties = /* @__PURE__ */ new Map();
    for (const property of this.payload.properties || []) {
      properties.set(property.name.toLowerCase(), property.value.value);
    }
    if (this.payload.name) {
      properties.set("name", this.payload.name.value);
    }
    if (this.payload.value) {
      properties.set("value", this.payload.value.value);
    }
    if (this.payload.description) {
      properties.set("description", this.payload.description.value);
    }
    const node = {
      role: __classPrivateFieldGet14(this, _AXNode_role, "f")
    };
    const userStringProperties = [
      "name",
      "value",
      "description",
      "keyshortcuts",
      "roledescription",
      "valuetext"
    ];
    const getUserStringPropertyValue = (key) => {
      return properties.get(key);
    };
    for (const userStringProperty of userStringProperties) {
      if (!properties.has(userStringProperty)) {
        continue;
      }
      node[userStringProperty] = getUserStringPropertyValue(userStringProperty);
    }
    const booleanProperties = [
      "disabled",
      "expanded",
      "focused",
      "modal",
      "multiline",
      "multiselectable",
      "readonly",
      "required",
      "selected"
    ];
    const getBooleanPropertyValue = (key) => {
      return properties.get(key);
    };
    for (const booleanProperty of booleanProperties) {
      if (booleanProperty === "focused" && __classPrivateFieldGet14(this, _AXNode_role, "f") === "RootWebArea") {
        continue;
      }
      const value = getBooleanPropertyValue(booleanProperty);
      if (!value) {
        continue;
      }
      node[booleanProperty] = getBooleanPropertyValue(booleanProperty);
    }
    const tristateProperties = ["checked", "pressed"];
    for (const tristateProperty of tristateProperties) {
      if (!properties.has(tristateProperty)) {
        continue;
      }
      const value = properties.get(tristateProperty);
      node[tristateProperty] = value === "mixed" ? "mixed" : value === "true" ? true : false;
    }
    const numericalProperties = [
      "level",
      "valuemax",
      "valuemin"
    ];
    const getNumericalPropertyValue = (key) => {
      return properties.get(key);
    };
    for (const numericalProperty of numericalProperties) {
      if (!properties.has(numericalProperty)) {
        continue;
      }
      node[numericalProperty] = getNumericalPropertyValue(numericalProperty);
    }
    const tokenProperties = [
      "autocomplete",
      "haspopup",
      "invalid",
      "orientation"
    ];
    const getTokenPropertyValue = (key) => {
      return properties.get(key);
    };
    for (const tokenProperty of tokenProperties) {
      const value = getTokenPropertyValue(tokenProperty);
      if (!value || value === "false") {
        continue;
      }
      node[tokenProperty] = getTokenPropertyValue(tokenProperty);
    }
    return node;
  }
  static createTree(payloads) {
    const nodeById = /* @__PURE__ */ new Map();
    for (const payload of payloads) {
      nodeById.set(payload.nodeId, new AXNode(payload));
    }
    for (const node of nodeById.values()) {
      for (const childId of node.payload.childIds || []) {
        node.children.push(nodeById.get(childId));
      }
    }
    return nodeById.values().next().value;
  }
};
_AXNode_richlyEditable = /* @__PURE__ */ new WeakMap(), _AXNode_editable = /* @__PURE__ */ new WeakMap(), _AXNode_focusable = /* @__PURE__ */ new WeakMap(), _AXNode_hidden = /* @__PURE__ */ new WeakMap(), _AXNode_name = /* @__PURE__ */ new WeakMap(), _AXNode_role = /* @__PURE__ */ new WeakMap(), _AXNode_ignored = /* @__PURE__ */ new WeakMap(), _AXNode_cachedHasFocusableChild = /* @__PURE__ */ new WeakMap(), _AXNode_instances = /* @__PURE__ */ new WeakSet(), _AXNode_isPlainTextField = function _AXNode_isPlainTextField2() {
  if (__classPrivateFieldGet14(this, _AXNode_richlyEditable, "f")) {
    return false;
  }
  if (__classPrivateFieldGet14(this, _AXNode_editable, "f")) {
    return true;
  }
  return __classPrivateFieldGet14(this, _AXNode_role, "f") === "textbox" || __classPrivateFieldGet14(this, _AXNode_role, "f") === "searchbox";
}, _AXNode_isTextOnlyObject = function _AXNode_isTextOnlyObject2() {
  const role = __classPrivateFieldGet14(this, _AXNode_role, "f");
  return role === "LineBreak" || role === "text" || role === "InlineTextBox";
}, _AXNode_hasFocusableChild = function _AXNode_hasFocusableChild2() {
  if (__classPrivateFieldGet14(this, _AXNode_cachedHasFocusableChild, "f") === void 0) {
    __classPrivateFieldSet12(this, _AXNode_cachedHasFocusableChild, false, "f");
    for (const child of this.children) {
      if (__classPrivateFieldGet14(child, _AXNode_focusable, "f") || __classPrivateFieldGet14(child, _AXNode_instances, "m", _AXNode_hasFocusableChild2).call(child)) {
        __classPrivateFieldSet12(this, _AXNode_cachedHasFocusableChild, true, "f");
        break;
      }
    }
  }
  return __classPrivateFieldGet14(this, _AXNode_cachedHasFocusableChild, "f");
};

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/ConsoleMessage.js
init_checked_fetch();
init_modules_watch_stub();
var __classPrivateFieldSet13 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet15 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ConsoleMessage_type;
var _ConsoleMessage_text;
var _ConsoleMessage_args;
var _ConsoleMessage_stackTraceLocations;
var ConsoleMessage = class {
  /**
   * @public
   */
  constructor(type, text, args, stackTraceLocations) {
    _ConsoleMessage_type.set(this, void 0);
    _ConsoleMessage_text.set(this, void 0);
    _ConsoleMessage_args.set(this, void 0);
    _ConsoleMessage_stackTraceLocations.set(this, void 0);
    __classPrivateFieldSet13(this, _ConsoleMessage_type, type, "f");
    __classPrivateFieldSet13(this, _ConsoleMessage_text, text, "f");
    __classPrivateFieldSet13(this, _ConsoleMessage_args, args, "f");
    __classPrivateFieldSet13(this, _ConsoleMessage_stackTraceLocations, stackTraceLocations, "f");
  }
  /**
   * @returns The type of the console message.
   */
  type() {
    return __classPrivateFieldGet15(this, _ConsoleMessage_type, "f");
  }
  /**
   * @returns The text of the console message.
   */
  text() {
    return __classPrivateFieldGet15(this, _ConsoleMessage_text, "f");
  }
  /**
   * @returns An array of arguments passed to the console.
   */
  args() {
    return __classPrivateFieldGet15(this, _ConsoleMessage_args, "f");
  }
  /**
   * @returns The location of the console message.
   */
  location() {
    var _a2;
    return (_a2 = __classPrivateFieldGet15(this, _ConsoleMessage_stackTraceLocations, "f")[0]) !== null && _a2 !== void 0 ? _a2 : {};
  }
  /**
   * @returns The array of locations on the stack of the console message.
   */
  stackTrace() {
    return __classPrivateFieldGet15(this, _ConsoleMessage_stackTraceLocations, "f");
  }
};
_ConsoleMessage_type = /* @__PURE__ */ new WeakMap(), _ConsoleMessage_text = /* @__PURE__ */ new WeakMap(), _ConsoleMessage_args = /* @__PURE__ */ new WeakMap(), _ConsoleMessage_stackTraceLocations = /* @__PURE__ */ new WeakMap();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Coverage.js
init_checked_fetch();
init_modules_watch_stub();
var __classPrivateFieldSet14 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet16 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Coverage_jsCoverage;
var _Coverage_cssCoverage;
var _JSCoverage_instances;
var _JSCoverage_client;
var _JSCoverage_enabled;
var _JSCoverage_scriptURLs;
var _JSCoverage_scriptSources;
var _JSCoverage_eventListeners;
var _JSCoverage_resetOnNavigation;
var _JSCoverage_reportAnonymousScripts;
var _JSCoverage_includeRawScriptCoverage;
var _JSCoverage_onExecutionContextsCleared;
var _JSCoverage_onScriptParsed;
var _CSSCoverage_instances;
var _CSSCoverage_client;
var _CSSCoverage_enabled;
var _CSSCoverage_stylesheetURLs;
var _CSSCoverage_stylesheetSources;
var _CSSCoverage_eventListeners;
var _CSSCoverage_resetOnNavigation;
var _CSSCoverage_onExecutionContextsCleared;
var _CSSCoverage_onStyleSheet;
var Coverage = class {
  constructor(client) {
    _Coverage_jsCoverage.set(this, void 0);
    _Coverage_cssCoverage.set(this, void 0);
    __classPrivateFieldSet14(this, _Coverage_jsCoverage, new JSCoverage(client), "f");
    __classPrivateFieldSet14(this, _Coverage_cssCoverage, new CSSCoverage(client), "f");
  }
  /**
   * @param options - Set of configurable options for coverage defaults to
   * `resetOnNavigation : true, reportAnonymousScripts : false`
   * @returns Promise that resolves when coverage is started.
   *
   * @remarks
   * Anonymous scripts are ones that don't have an associated url. These are
   * scripts that are dynamically created on the page using `eval` or
   * `new Function`. If `reportAnonymousScripts` is set to `true`, anonymous
   * scripts will have `pptr://__puppeteer_evaluation_script__` as their URL.
   */
  async startJSCoverage(options = {}) {
    return await __classPrivateFieldGet16(this, _Coverage_jsCoverage, "f").start(options);
  }
  /**
   * @returns Promise that resolves to the array of coverage reports for
   * all scripts.
   *
   * @remarks
   * JavaScript Coverage doesn't include anonymous scripts by default.
   * However, scripts with sourceURLs are reported.
   */
  async stopJSCoverage() {
    return await __classPrivateFieldGet16(this, _Coverage_jsCoverage, "f").stop();
  }
  /**
   * @param options - Set of configurable options for coverage, defaults to
   * `resetOnNavigation : true`
   * @returns Promise that resolves when coverage is started.
   */
  async startCSSCoverage(options = {}) {
    return await __classPrivateFieldGet16(this, _Coverage_cssCoverage, "f").start(options);
  }
  /**
   * @returns Promise that resolves to the array of coverage reports
   * for all stylesheets.
   * @remarks
   * CSS Coverage doesn't include dynamically injected style tags
   * without sourceURLs.
   */
  async stopCSSCoverage() {
    return await __classPrivateFieldGet16(this, _Coverage_cssCoverage, "f").stop();
  }
};
_Coverage_jsCoverage = /* @__PURE__ */ new WeakMap(), _Coverage_cssCoverage = /* @__PURE__ */ new WeakMap();
var JSCoverage = class {
  constructor(client) {
    _JSCoverage_instances.add(this);
    _JSCoverage_client.set(this, void 0);
    _JSCoverage_enabled.set(this, false);
    _JSCoverage_scriptURLs.set(this, /* @__PURE__ */ new Map());
    _JSCoverage_scriptSources.set(this, /* @__PURE__ */ new Map());
    _JSCoverage_eventListeners.set(this, []);
    _JSCoverage_resetOnNavigation.set(this, false);
    _JSCoverage_reportAnonymousScripts.set(this, false);
    _JSCoverage_includeRawScriptCoverage.set(this, false);
    __classPrivateFieldSet14(this, _JSCoverage_client, client, "f");
  }
  async start(options = {}) {
    assert(!__classPrivateFieldGet16(this, _JSCoverage_enabled, "f"), "JSCoverage is already enabled");
    const { resetOnNavigation = true, reportAnonymousScripts = false, includeRawScriptCoverage = false } = options;
    __classPrivateFieldSet14(this, _JSCoverage_resetOnNavigation, resetOnNavigation, "f");
    __classPrivateFieldSet14(this, _JSCoverage_reportAnonymousScripts, reportAnonymousScripts, "f");
    __classPrivateFieldSet14(this, _JSCoverage_includeRawScriptCoverage, includeRawScriptCoverage, "f");
    __classPrivateFieldSet14(this, _JSCoverage_enabled, true, "f");
    __classPrivateFieldGet16(this, _JSCoverage_scriptURLs, "f").clear();
    __classPrivateFieldGet16(this, _JSCoverage_scriptSources, "f").clear();
    __classPrivateFieldSet14(this, _JSCoverage_eventListeners, [
      addEventListener(__classPrivateFieldGet16(this, _JSCoverage_client, "f"), "Debugger.scriptParsed", __classPrivateFieldGet16(this, _JSCoverage_instances, "m", _JSCoverage_onScriptParsed).bind(this)),
      addEventListener(__classPrivateFieldGet16(this, _JSCoverage_client, "f"), "Runtime.executionContextsCleared", __classPrivateFieldGet16(this, _JSCoverage_instances, "m", _JSCoverage_onExecutionContextsCleared).bind(this))
    ], "f");
    await Promise.all([
      __classPrivateFieldGet16(this, _JSCoverage_client, "f").send("Profiler.enable"),
      __classPrivateFieldGet16(this, _JSCoverage_client, "f").send("Profiler.startPreciseCoverage", {
        callCount: __classPrivateFieldGet16(this, _JSCoverage_includeRawScriptCoverage, "f"),
        detailed: true
      }),
      __classPrivateFieldGet16(this, _JSCoverage_client, "f").send("Debugger.enable"),
      __classPrivateFieldGet16(this, _JSCoverage_client, "f").send("Debugger.setSkipAllPauses", { skip: true })
    ]);
  }
  async stop() {
    assert(__classPrivateFieldGet16(this, _JSCoverage_enabled, "f"), "JSCoverage is not enabled");
    __classPrivateFieldSet14(this, _JSCoverage_enabled, false, "f");
    const result = await Promise.all([
      __classPrivateFieldGet16(this, _JSCoverage_client, "f").send("Profiler.takePreciseCoverage"),
      __classPrivateFieldGet16(this, _JSCoverage_client, "f").send("Profiler.stopPreciseCoverage"),
      __classPrivateFieldGet16(this, _JSCoverage_client, "f").send("Profiler.disable"),
      __classPrivateFieldGet16(this, _JSCoverage_client, "f").send("Debugger.disable")
    ]);
    removeEventListeners(__classPrivateFieldGet16(this, _JSCoverage_eventListeners, "f"));
    const coverage = [];
    const profileResponse = result[0];
    for (const entry of profileResponse.result) {
      let url = __classPrivateFieldGet16(this, _JSCoverage_scriptURLs, "f").get(entry.scriptId);
      if (!url && __classPrivateFieldGet16(this, _JSCoverage_reportAnonymousScripts, "f")) {
        url = "debugger://VM" + entry.scriptId;
      }
      const text = __classPrivateFieldGet16(this, _JSCoverage_scriptSources, "f").get(entry.scriptId);
      if (text === void 0 || url === void 0) {
        continue;
      }
      const flattenRanges = [];
      for (const func of entry.functions) {
        flattenRanges.push(...func.ranges);
      }
      const ranges = convertToDisjointRanges(flattenRanges);
      if (!__classPrivateFieldGet16(this, _JSCoverage_includeRawScriptCoverage, "f")) {
        coverage.push({ url, ranges, text });
      } else {
        coverage.push({ url, ranges, text, rawScriptCoverage: entry });
      }
    }
    return coverage;
  }
};
_JSCoverage_client = /* @__PURE__ */ new WeakMap(), _JSCoverage_enabled = /* @__PURE__ */ new WeakMap(), _JSCoverage_scriptURLs = /* @__PURE__ */ new WeakMap(), _JSCoverage_scriptSources = /* @__PURE__ */ new WeakMap(), _JSCoverage_eventListeners = /* @__PURE__ */ new WeakMap(), _JSCoverage_resetOnNavigation = /* @__PURE__ */ new WeakMap(), _JSCoverage_reportAnonymousScripts = /* @__PURE__ */ new WeakMap(), _JSCoverage_includeRawScriptCoverage = /* @__PURE__ */ new WeakMap(), _JSCoverage_instances = /* @__PURE__ */ new WeakSet(), _JSCoverage_onExecutionContextsCleared = function _JSCoverage_onExecutionContextsCleared2() {
  if (!__classPrivateFieldGet16(this, _JSCoverage_resetOnNavigation, "f")) {
    return;
  }
  __classPrivateFieldGet16(this, _JSCoverage_scriptURLs, "f").clear();
  __classPrivateFieldGet16(this, _JSCoverage_scriptSources, "f").clear();
}, _JSCoverage_onScriptParsed = async function _JSCoverage_onScriptParsed2(event) {
  if (event.url === EVALUATION_SCRIPT_URL) {
    return;
  }
  if (!event.url && !__classPrivateFieldGet16(this, _JSCoverage_reportAnonymousScripts, "f")) {
    return;
  }
  try {
    const response = await __classPrivateFieldGet16(this, _JSCoverage_client, "f").send("Debugger.getScriptSource", {
      scriptId: event.scriptId
    });
    __classPrivateFieldGet16(this, _JSCoverage_scriptURLs, "f").set(event.scriptId, event.url);
    __classPrivateFieldGet16(this, _JSCoverage_scriptSources, "f").set(event.scriptId, response.scriptSource);
  } catch (error) {
    debugError(error);
  }
};
var CSSCoverage = class {
  constructor(client) {
    _CSSCoverage_instances.add(this);
    _CSSCoverage_client.set(this, void 0);
    _CSSCoverage_enabled.set(this, false);
    _CSSCoverage_stylesheetURLs.set(this, /* @__PURE__ */ new Map());
    _CSSCoverage_stylesheetSources.set(this, /* @__PURE__ */ new Map());
    _CSSCoverage_eventListeners.set(this, []);
    _CSSCoverage_resetOnNavigation.set(this, false);
    __classPrivateFieldSet14(this, _CSSCoverage_client, client, "f");
  }
  async start(options = {}) {
    assert(!__classPrivateFieldGet16(this, _CSSCoverage_enabled, "f"), "CSSCoverage is already enabled");
    const { resetOnNavigation = true } = options;
    __classPrivateFieldSet14(this, _CSSCoverage_resetOnNavigation, resetOnNavigation, "f");
    __classPrivateFieldSet14(this, _CSSCoverage_enabled, true, "f");
    __classPrivateFieldGet16(this, _CSSCoverage_stylesheetURLs, "f").clear();
    __classPrivateFieldGet16(this, _CSSCoverage_stylesheetSources, "f").clear();
    __classPrivateFieldSet14(this, _CSSCoverage_eventListeners, [
      addEventListener(__classPrivateFieldGet16(this, _CSSCoverage_client, "f"), "CSS.styleSheetAdded", __classPrivateFieldGet16(this, _CSSCoverage_instances, "m", _CSSCoverage_onStyleSheet).bind(this)),
      addEventListener(__classPrivateFieldGet16(this, _CSSCoverage_client, "f"), "Runtime.executionContextsCleared", __classPrivateFieldGet16(this, _CSSCoverage_instances, "m", _CSSCoverage_onExecutionContextsCleared).bind(this))
    ], "f");
    await Promise.all([
      __classPrivateFieldGet16(this, _CSSCoverage_client, "f").send("DOM.enable"),
      __classPrivateFieldGet16(this, _CSSCoverage_client, "f").send("CSS.enable"),
      __classPrivateFieldGet16(this, _CSSCoverage_client, "f").send("CSS.startRuleUsageTracking")
    ]);
  }
  async stop() {
    assert(__classPrivateFieldGet16(this, _CSSCoverage_enabled, "f"), "CSSCoverage is not enabled");
    __classPrivateFieldSet14(this, _CSSCoverage_enabled, false, "f");
    const ruleTrackingResponse = await __classPrivateFieldGet16(this, _CSSCoverage_client, "f").send("CSS.stopRuleUsageTracking");
    await Promise.all([
      __classPrivateFieldGet16(this, _CSSCoverage_client, "f").send("CSS.disable"),
      __classPrivateFieldGet16(this, _CSSCoverage_client, "f").send("DOM.disable")
    ]);
    removeEventListeners(__classPrivateFieldGet16(this, _CSSCoverage_eventListeners, "f"));
    const styleSheetIdToCoverage = /* @__PURE__ */ new Map();
    for (const entry of ruleTrackingResponse.ruleUsage) {
      let ranges = styleSheetIdToCoverage.get(entry.styleSheetId);
      if (!ranges) {
        ranges = [];
        styleSheetIdToCoverage.set(entry.styleSheetId, ranges);
      }
      ranges.push({
        startOffset: entry.startOffset,
        endOffset: entry.endOffset,
        count: entry.used ? 1 : 0
      });
    }
    const coverage = [];
    for (const styleSheetId of __classPrivateFieldGet16(this, _CSSCoverage_stylesheetURLs, "f").keys()) {
      const url = __classPrivateFieldGet16(this, _CSSCoverage_stylesheetURLs, "f").get(styleSheetId);
      assert(typeof url !== "undefined", `Stylesheet URL is undefined (styleSheetId=${styleSheetId})`);
      const text = __classPrivateFieldGet16(this, _CSSCoverage_stylesheetSources, "f").get(styleSheetId);
      assert(typeof text !== "undefined", `Stylesheet text is undefined (styleSheetId=${styleSheetId})`);
      const ranges = convertToDisjointRanges(styleSheetIdToCoverage.get(styleSheetId) || []);
      coverage.push({ url, ranges, text });
    }
    return coverage;
  }
};
_CSSCoverage_client = /* @__PURE__ */ new WeakMap(), _CSSCoverage_enabled = /* @__PURE__ */ new WeakMap(), _CSSCoverage_stylesheetURLs = /* @__PURE__ */ new WeakMap(), _CSSCoverage_stylesheetSources = /* @__PURE__ */ new WeakMap(), _CSSCoverage_eventListeners = /* @__PURE__ */ new WeakMap(), _CSSCoverage_resetOnNavigation = /* @__PURE__ */ new WeakMap(), _CSSCoverage_instances = /* @__PURE__ */ new WeakSet(), _CSSCoverage_onExecutionContextsCleared = function _CSSCoverage_onExecutionContextsCleared2() {
  if (!__classPrivateFieldGet16(this, _CSSCoverage_resetOnNavigation, "f")) {
    return;
  }
  __classPrivateFieldGet16(this, _CSSCoverage_stylesheetURLs, "f").clear();
  __classPrivateFieldGet16(this, _CSSCoverage_stylesheetSources, "f").clear();
}, _CSSCoverage_onStyleSheet = async function _CSSCoverage_onStyleSheet2(event) {
  const header = event.header;
  if (!header.sourceURL) {
    return;
  }
  try {
    const response = await __classPrivateFieldGet16(this, _CSSCoverage_client, "f").send("CSS.getStyleSheetText", {
      styleSheetId: header.styleSheetId
    });
    __classPrivateFieldGet16(this, _CSSCoverage_stylesheetURLs, "f").set(header.styleSheetId, header.sourceURL);
    __classPrivateFieldGet16(this, _CSSCoverage_stylesheetSources, "f").set(header.styleSheetId, response.text);
  } catch (error) {
    debugError(error);
  }
};
function convertToDisjointRanges(nestedRanges) {
  const points = [];
  for (const range of nestedRanges) {
    points.push({ offset: range.startOffset, type: 0, range });
    points.push({ offset: range.endOffset, type: 1, range });
  }
  points.sort((a, b) => {
    if (a.offset !== b.offset) {
      return a.offset - b.offset;
    }
    if (a.type !== b.type) {
      return b.type - a.type;
    }
    const aLength = a.range.endOffset - a.range.startOffset;
    const bLength = b.range.endOffset - b.range.startOffset;
    if (a.type === 0) {
      return bLength - aLength;
    }
    return aLength - bLength;
  });
  const hitCountStack = [];
  const results = [];
  let lastOffset = 0;
  for (const point of points) {
    if (hitCountStack.length && lastOffset < point.offset && hitCountStack[hitCountStack.length - 1] > 0) {
      const lastResult = results[results.length - 1];
      if (lastResult && lastResult.end === lastOffset) {
        lastResult.end = point.offset;
      } else {
        results.push({ start: lastOffset, end: point.offset });
      }
    }
    lastOffset = point.offset;
    if (point.type === 0) {
      hitCountStack.push(point.range.count);
    } else {
      hitCountStack.pop();
    }
  }
  return results.filter((range) => {
    return range.end - range.start > 1;
  });
}

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Dialog.js
init_checked_fetch();
init_modules_watch_stub();
var __classPrivateFieldSet15 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet17 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Dialog_client;
var _Dialog_type;
var _Dialog_message;
var _Dialog_defaultValue;
var _Dialog_handled;
var Dialog = class {
  /**
   * @internal
   */
  constructor(client, type, message, defaultValue = "") {
    _Dialog_client.set(this, void 0);
    _Dialog_type.set(this, void 0);
    _Dialog_message.set(this, void 0);
    _Dialog_defaultValue.set(this, void 0);
    _Dialog_handled.set(this, false);
    __classPrivateFieldSet15(this, _Dialog_client, client, "f");
    __classPrivateFieldSet15(this, _Dialog_type, type, "f");
    __classPrivateFieldSet15(this, _Dialog_message, message, "f");
    __classPrivateFieldSet15(this, _Dialog_defaultValue, defaultValue, "f");
  }
  /**
   * @returns The type of the dialog.
   */
  type() {
    return __classPrivateFieldGet17(this, _Dialog_type, "f");
  }
  /**
   * @returns The message displayed in the dialog.
   */
  message() {
    return __classPrivateFieldGet17(this, _Dialog_message, "f");
  }
  /**
   * @returns The default value of the prompt, or an empty string if the dialog
   * is not a `prompt`.
   */
  defaultValue() {
    return __classPrivateFieldGet17(this, _Dialog_defaultValue, "f");
  }
  /**
   * @param promptText - optional text that will be entered in the dialog
   * prompt. Has no effect if the dialog's type is not `prompt`.
   *
   * @returns A promise that resolves when the dialog has been accepted.
   */
  async accept(promptText) {
    assert(!__classPrivateFieldGet17(this, _Dialog_handled, "f"), "Cannot accept dialog which is already handled!");
    __classPrivateFieldSet15(this, _Dialog_handled, true, "f");
    await __classPrivateFieldGet17(this, _Dialog_client, "f").send("Page.handleJavaScriptDialog", {
      accept: true,
      promptText
    });
  }
  /**
   * @returns A promise which will resolve once the dialog has been dismissed
   */
  async dismiss() {
    assert(!__classPrivateFieldGet17(this, _Dialog_handled, "f"), "Cannot dismiss dialog which is already handled!");
    __classPrivateFieldSet15(this, _Dialog_handled, true, "f");
    await __classPrivateFieldGet17(this, _Dialog_client, "f").send("Page.handleJavaScriptDialog", {
      accept: false
    });
  }
};
_Dialog_client = /* @__PURE__ */ new WeakMap(), _Dialog_type = /* @__PURE__ */ new WeakMap(), _Dialog_message = /* @__PURE__ */ new WeakMap(), _Dialog_defaultValue = /* @__PURE__ */ new WeakMap(), _Dialog_handled = /* @__PURE__ */ new WeakMap();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/EmulationManager.js
init_checked_fetch();
init_modules_watch_stub();
var __classPrivateFieldSet16 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet18 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EmulationManager_client;
var _EmulationManager_emulatingMobile;
var _EmulationManager_hasTouch;
var EmulationManager = class {
  constructor(client) {
    _EmulationManager_client.set(this, void 0);
    _EmulationManager_emulatingMobile.set(this, false);
    _EmulationManager_hasTouch.set(this, false);
    __classPrivateFieldSet16(this, _EmulationManager_client, client, "f");
  }
  async emulateViewport(viewport) {
    const mobile = viewport.isMobile || false;
    const width = viewport.width;
    const height = viewport.height;
    const deviceScaleFactor = viewport.deviceScaleFactor || 1;
    const screenOrientation = viewport.isLandscape ? { angle: 90, type: "landscapePrimary" } : { angle: 0, type: "portraitPrimary" };
    const hasTouch = viewport.hasTouch || false;
    await Promise.all([
      __classPrivateFieldGet18(this, _EmulationManager_client, "f").send("Emulation.setDeviceMetricsOverride", {
        mobile,
        width,
        height,
        deviceScaleFactor,
        screenOrientation
      }),
      __classPrivateFieldGet18(this, _EmulationManager_client, "f").send("Emulation.setTouchEmulationEnabled", {
        enabled: hasTouch
      })
    ]);
    const reloadNeeded = __classPrivateFieldGet18(this, _EmulationManager_emulatingMobile, "f") !== mobile || __classPrivateFieldGet18(this, _EmulationManager_hasTouch, "f") !== hasTouch;
    __classPrivateFieldSet16(this, _EmulationManager_emulatingMobile, mobile, "f");
    __classPrivateFieldSet16(this, _EmulationManager_hasTouch, hasTouch, "f");
    return reloadNeeded;
  }
};
_EmulationManager_client = /* @__PURE__ */ new WeakMap(), _EmulationManager_emulatingMobile = /* @__PURE__ */ new WeakMap(), _EmulationManager_hasTouch = /* @__PURE__ */ new WeakMap();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/FileChooser.js
init_checked_fetch();
init_modules_watch_stub();
var __classPrivateFieldSet17 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet19 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FileChooser_element;
var _FileChooser_multiple;
var _FileChooser_handled;
var FileChooser = class {
  /**
   * @internal
   */
  constructor(element, event) {
    _FileChooser_element.set(this, void 0);
    _FileChooser_multiple.set(this, void 0);
    _FileChooser_handled.set(this, false);
    __classPrivateFieldSet17(this, _FileChooser_element, element, "f");
    __classPrivateFieldSet17(this, _FileChooser_multiple, event.mode !== "selectSingle", "f");
  }
  /**
   * Whether file chooser allow for
   * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#attr-multiple | multiple}
   * file selection.
   */
  isMultiple() {
    return __classPrivateFieldGet19(this, _FileChooser_multiple, "f");
  }
  /**
   * Accept the file chooser request with given paths.
   *
   * @param filePaths - If some of the `filePaths` are relative paths, then
   * they are resolved relative to the
   * {@link https://nodejs.org/api/process.html#process_process_cwd | current working directory}.
   */
  async accept(filePaths) {
    assert(!__classPrivateFieldGet19(this, _FileChooser_handled, "f"), "Cannot accept FileChooser which is already handled!");
    __classPrivateFieldSet17(this, _FileChooser_handled, true, "f");
    await __classPrivateFieldGet19(this, _FileChooser_element, "f").uploadFile(...filePaths);
  }
  /**
   * Closes the file chooser without selecting any files.
   */
  cancel() {
    assert(!__classPrivateFieldGet19(this, _FileChooser_handled, "f"), "Cannot cancel FileChooser which is already handled!");
    __classPrivateFieldSet17(this, _FileChooser_handled, true, "f");
  }
};
_FileChooser_element = /* @__PURE__ */ new WeakMap(), _FileChooser_multiple = /* @__PURE__ */ new WeakMap(), _FileChooser_handled = /* @__PURE__ */ new WeakMap();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Input.js
init_checked_fetch();
init_modules_watch_stub();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/USKeyboardLayout.js
init_checked_fetch();
init_modules_watch_stub();
var _keyDefinitions = {
  "0": { keyCode: 48, key: "0", code: "Digit0" },
  "1": { keyCode: 49, key: "1", code: "Digit1" },
  "2": { keyCode: 50, key: "2", code: "Digit2" },
  "3": { keyCode: 51, key: "3", code: "Digit3" },
  "4": { keyCode: 52, key: "4", code: "Digit4" },
  "5": { keyCode: 53, key: "5", code: "Digit5" },
  "6": { keyCode: 54, key: "6", code: "Digit6" },
  "7": { keyCode: 55, key: "7", code: "Digit7" },
  "8": { keyCode: 56, key: "8", code: "Digit8" },
  "9": { keyCode: 57, key: "9", code: "Digit9" },
  Power: { key: "Power", code: "Power" },
  Eject: { key: "Eject", code: "Eject" },
  Abort: { keyCode: 3, code: "Abort", key: "Cancel" },
  Help: { keyCode: 6, code: "Help", key: "Help" },
  Backspace: { keyCode: 8, code: "Backspace", key: "Backspace" },
  Tab: { keyCode: 9, code: "Tab", key: "Tab" },
  Numpad5: {
    keyCode: 12,
    shiftKeyCode: 101,
    key: "Clear",
    code: "Numpad5",
    shiftKey: "5",
    location: 3
  },
  NumpadEnter: {
    keyCode: 13,
    code: "NumpadEnter",
    key: "Enter",
    text: "\r",
    location: 3
  },
  Enter: { keyCode: 13, code: "Enter", key: "Enter", text: "\r" },
  "\r": { keyCode: 13, code: "Enter", key: "Enter", text: "\r" },
  "\n": { keyCode: 13, code: "Enter", key: "Enter", text: "\r" },
  ShiftLeft: { keyCode: 16, code: "ShiftLeft", key: "Shift", location: 1 },
  ShiftRight: { keyCode: 16, code: "ShiftRight", key: "Shift", location: 2 },
  ControlLeft: {
    keyCode: 17,
    code: "ControlLeft",
    key: "Control",
    location: 1
  },
  ControlRight: {
    keyCode: 17,
    code: "ControlRight",
    key: "Control",
    location: 2
  },
  AltLeft: { keyCode: 18, code: "AltLeft", key: "Alt", location: 1 },
  AltRight: { keyCode: 18, code: "AltRight", key: "Alt", location: 2 },
  Pause: { keyCode: 19, code: "Pause", key: "Pause" },
  CapsLock: { keyCode: 20, code: "CapsLock", key: "CapsLock" },
  Escape: { keyCode: 27, code: "Escape", key: "Escape" },
  Convert: { keyCode: 28, code: "Convert", key: "Convert" },
  NonConvert: { keyCode: 29, code: "NonConvert", key: "NonConvert" },
  Space: { keyCode: 32, code: "Space", key: " " },
  Numpad9: {
    keyCode: 33,
    shiftKeyCode: 105,
    key: "PageUp",
    code: "Numpad9",
    shiftKey: "9",
    location: 3
  },
  PageUp: { keyCode: 33, code: "PageUp", key: "PageUp" },
  Numpad3: {
    keyCode: 34,
    shiftKeyCode: 99,
    key: "PageDown",
    code: "Numpad3",
    shiftKey: "3",
    location: 3
  },
  PageDown: { keyCode: 34, code: "PageDown", key: "PageDown" },
  End: { keyCode: 35, code: "End", key: "End" },
  Numpad1: {
    keyCode: 35,
    shiftKeyCode: 97,
    key: "End",
    code: "Numpad1",
    shiftKey: "1",
    location: 3
  },
  Home: { keyCode: 36, code: "Home", key: "Home" },
  Numpad7: {
    keyCode: 36,
    shiftKeyCode: 103,
    key: "Home",
    code: "Numpad7",
    shiftKey: "7",
    location: 3
  },
  ArrowLeft: { keyCode: 37, code: "ArrowLeft", key: "ArrowLeft" },
  Numpad4: {
    keyCode: 37,
    shiftKeyCode: 100,
    key: "ArrowLeft",
    code: "Numpad4",
    shiftKey: "4",
    location: 3
  },
  Numpad8: {
    keyCode: 38,
    shiftKeyCode: 104,
    key: "ArrowUp",
    code: "Numpad8",
    shiftKey: "8",
    location: 3
  },
  ArrowUp: { keyCode: 38, code: "ArrowUp", key: "ArrowUp" },
  ArrowRight: { keyCode: 39, code: "ArrowRight", key: "ArrowRight" },
  Numpad6: {
    keyCode: 39,
    shiftKeyCode: 102,
    key: "ArrowRight",
    code: "Numpad6",
    shiftKey: "6",
    location: 3
  },
  Numpad2: {
    keyCode: 40,
    shiftKeyCode: 98,
    key: "ArrowDown",
    code: "Numpad2",
    shiftKey: "2",
    location: 3
  },
  ArrowDown: { keyCode: 40, code: "ArrowDown", key: "ArrowDown" },
  Select: { keyCode: 41, code: "Select", key: "Select" },
  Open: { keyCode: 43, code: "Open", key: "Execute" },
  PrintScreen: { keyCode: 44, code: "PrintScreen", key: "PrintScreen" },
  Insert: { keyCode: 45, code: "Insert", key: "Insert" },
  Numpad0: {
    keyCode: 45,
    shiftKeyCode: 96,
    key: "Insert",
    code: "Numpad0",
    shiftKey: "0",
    location: 3
  },
  Delete: { keyCode: 46, code: "Delete", key: "Delete" },
  NumpadDecimal: {
    keyCode: 46,
    shiftKeyCode: 110,
    code: "NumpadDecimal",
    key: "\0",
    shiftKey: ".",
    location: 3
  },
  Digit0: { keyCode: 48, code: "Digit0", shiftKey: ")", key: "0" },
  Digit1: { keyCode: 49, code: "Digit1", shiftKey: "!", key: "1" },
  Digit2: { keyCode: 50, code: "Digit2", shiftKey: "@", key: "2" },
  Digit3: { keyCode: 51, code: "Digit3", shiftKey: "#", key: "3" },
  Digit4: { keyCode: 52, code: "Digit4", shiftKey: "$", key: "4" },
  Digit5: { keyCode: 53, code: "Digit5", shiftKey: "%", key: "5" },
  Digit6: { keyCode: 54, code: "Digit6", shiftKey: "^", key: "6" },
  Digit7: { keyCode: 55, code: "Digit7", shiftKey: "&", key: "7" },
  Digit8: { keyCode: 56, code: "Digit8", shiftKey: "*", key: "8" },
  Digit9: { keyCode: 57, code: "Digit9", shiftKey: "(", key: "9" },
  KeyA: { keyCode: 65, code: "KeyA", shiftKey: "A", key: "a" },
  KeyB: { keyCode: 66, code: "KeyB", shiftKey: "B", key: "b" },
  KeyC: { keyCode: 67, code: "KeyC", shiftKey: "C", key: "c" },
  KeyD: { keyCode: 68, code: "KeyD", shiftKey: "D", key: "d" },
  KeyE: { keyCode: 69, code: "KeyE", shiftKey: "E", key: "e" },
  KeyF: { keyCode: 70, code: "KeyF", shiftKey: "F", key: "f" },
  KeyG: { keyCode: 71, code: "KeyG", shiftKey: "G", key: "g" },
  KeyH: { keyCode: 72, code: "KeyH", shiftKey: "H", key: "h" },
  KeyI: { keyCode: 73, code: "KeyI", shiftKey: "I", key: "i" },
  KeyJ: { keyCode: 74, code: "KeyJ", shiftKey: "J", key: "j" },
  KeyK: { keyCode: 75, code: "KeyK", shiftKey: "K", key: "k" },
  KeyL: { keyCode: 76, code: "KeyL", shiftKey: "L", key: "l" },
  KeyM: { keyCode: 77, code: "KeyM", shiftKey: "M", key: "m" },
  KeyN: { keyCode: 78, code: "KeyN", shiftKey: "N", key: "n" },
  KeyO: { keyCode: 79, code: "KeyO", shiftKey: "O", key: "o" },
  KeyP: { keyCode: 80, code: "KeyP", shiftKey: "P", key: "p" },
  KeyQ: { keyCode: 81, code: "KeyQ", shiftKey: "Q", key: "q" },
  KeyR: { keyCode: 82, code: "KeyR", shiftKey: "R", key: "r" },
  KeyS: { keyCode: 83, code: "KeyS", shiftKey: "S", key: "s" },
  KeyT: { keyCode: 84, code: "KeyT", shiftKey: "T", key: "t" },
  KeyU: { keyCode: 85, code: "KeyU", shiftKey: "U", key: "u" },
  KeyV: { keyCode: 86, code: "KeyV", shiftKey: "V", key: "v" },
  KeyW: { keyCode: 87, code: "KeyW", shiftKey: "W", key: "w" },
  KeyX: { keyCode: 88, code: "KeyX", shiftKey: "X", key: "x" },
  KeyY: { keyCode: 89, code: "KeyY", shiftKey: "Y", key: "y" },
  KeyZ: { keyCode: 90, code: "KeyZ", shiftKey: "Z", key: "z" },
  MetaLeft: { keyCode: 91, code: "MetaLeft", key: "Meta", location: 1 },
  MetaRight: { keyCode: 92, code: "MetaRight", key: "Meta", location: 2 },
  ContextMenu: { keyCode: 93, code: "ContextMenu", key: "ContextMenu" },
  NumpadMultiply: {
    keyCode: 106,
    code: "NumpadMultiply",
    key: "*",
    location: 3
  },
  NumpadAdd: { keyCode: 107, code: "NumpadAdd", key: "+", location: 3 },
  NumpadSubtract: {
    keyCode: 109,
    code: "NumpadSubtract",
    key: "-",
    location: 3
  },
  NumpadDivide: { keyCode: 111, code: "NumpadDivide", key: "/", location: 3 },
  F1: { keyCode: 112, code: "F1", key: "F1" },
  F2: { keyCode: 113, code: "F2", key: "F2" },
  F3: { keyCode: 114, code: "F3", key: "F3" },
  F4: { keyCode: 115, code: "F4", key: "F4" },
  F5: { keyCode: 116, code: "F5", key: "F5" },
  F6: { keyCode: 117, code: "F6", key: "F6" },
  F7: { keyCode: 118, code: "F7", key: "F7" },
  F8: { keyCode: 119, code: "F8", key: "F8" },
  F9: { keyCode: 120, code: "F9", key: "F9" },
  F10: { keyCode: 121, code: "F10", key: "F10" },
  F11: { keyCode: 122, code: "F11", key: "F11" },
  F12: { keyCode: 123, code: "F12", key: "F12" },
  F13: { keyCode: 124, code: "F13", key: "F13" },
  F14: { keyCode: 125, code: "F14", key: "F14" },
  F15: { keyCode: 126, code: "F15", key: "F15" },
  F16: { keyCode: 127, code: "F16", key: "F16" },
  F17: { keyCode: 128, code: "F17", key: "F17" },
  F18: { keyCode: 129, code: "F18", key: "F18" },
  F19: { keyCode: 130, code: "F19", key: "F19" },
  F20: { keyCode: 131, code: "F20", key: "F20" },
  F21: { keyCode: 132, code: "F21", key: "F21" },
  F22: { keyCode: 133, code: "F22", key: "F22" },
  F23: { keyCode: 134, code: "F23", key: "F23" },
  F24: { keyCode: 135, code: "F24", key: "F24" },
  NumLock: { keyCode: 144, code: "NumLock", key: "NumLock" },
  ScrollLock: { keyCode: 145, code: "ScrollLock", key: "ScrollLock" },
  AudioVolumeMute: {
    keyCode: 173,
    code: "AudioVolumeMute",
    key: "AudioVolumeMute"
  },
  AudioVolumeDown: {
    keyCode: 174,
    code: "AudioVolumeDown",
    key: "AudioVolumeDown"
  },
  AudioVolumeUp: { keyCode: 175, code: "AudioVolumeUp", key: "AudioVolumeUp" },
  MediaTrackNext: {
    keyCode: 176,
    code: "MediaTrackNext",
    key: "MediaTrackNext"
  },
  MediaTrackPrevious: {
    keyCode: 177,
    code: "MediaTrackPrevious",
    key: "MediaTrackPrevious"
  },
  MediaStop: { keyCode: 178, code: "MediaStop", key: "MediaStop" },
  MediaPlayPause: {
    keyCode: 179,
    code: "MediaPlayPause",
    key: "MediaPlayPause"
  },
  Semicolon: { keyCode: 186, code: "Semicolon", shiftKey: ":", key: ";" },
  Equal: { keyCode: 187, code: "Equal", shiftKey: "+", key: "=" },
  NumpadEqual: { keyCode: 187, code: "NumpadEqual", key: "=", location: 3 },
  Comma: { keyCode: 188, code: "Comma", shiftKey: "<", key: "," },
  Minus: { keyCode: 189, code: "Minus", shiftKey: "_", key: "-" },
  Period: { keyCode: 190, code: "Period", shiftKey: ">", key: "." },
  Slash: { keyCode: 191, code: "Slash", shiftKey: "?", key: "/" },
  Backquote: { keyCode: 192, code: "Backquote", shiftKey: "~", key: "`" },
  BracketLeft: { keyCode: 219, code: "BracketLeft", shiftKey: "{", key: "[" },
  Backslash: { keyCode: 220, code: "Backslash", shiftKey: "|", key: "\\" },
  BracketRight: { keyCode: 221, code: "BracketRight", shiftKey: "}", key: "]" },
  Quote: { keyCode: 222, code: "Quote", shiftKey: '"', key: "'" },
  AltGraph: { keyCode: 225, code: "AltGraph", key: "AltGraph" },
  Props: { keyCode: 247, code: "Props", key: "CrSel" },
  Cancel: { keyCode: 3, key: "Cancel", code: "Abort" },
  Clear: { keyCode: 12, key: "Clear", code: "Numpad5", location: 3 },
  Shift: { keyCode: 16, key: "Shift", code: "ShiftLeft", location: 1 },
  Control: { keyCode: 17, key: "Control", code: "ControlLeft", location: 1 },
  Alt: { keyCode: 18, key: "Alt", code: "AltLeft", location: 1 },
  Accept: { keyCode: 30, key: "Accept" },
  ModeChange: { keyCode: 31, key: "ModeChange" },
  " ": { keyCode: 32, key: " ", code: "Space" },
  Print: { keyCode: 42, key: "Print" },
  Execute: { keyCode: 43, key: "Execute", code: "Open" },
  "\0": { keyCode: 46, key: "\0", code: "NumpadDecimal", location: 3 },
  a: { keyCode: 65, key: "a", code: "KeyA" },
  b: { keyCode: 66, key: "b", code: "KeyB" },
  c: { keyCode: 67, key: "c", code: "KeyC" },
  d: { keyCode: 68, key: "d", code: "KeyD" },
  e: { keyCode: 69, key: "e", code: "KeyE" },
  f: { keyCode: 70, key: "f", code: "KeyF" },
  g: { keyCode: 71, key: "g", code: "KeyG" },
  h: { keyCode: 72, key: "h", code: "KeyH" },
  i: { keyCode: 73, key: "i", code: "KeyI" },
  j: { keyCode: 74, key: "j", code: "KeyJ" },
  k: { keyCode: 75, key: "k", code: "KeyK" },
  l: { keyCode: 76, key: "l", code: "KeyL" },
  m: { keyCode: 77, key: "m", code: "KeyM" },
  n: { keyCode: 78, key: "n", code: "KeyN" },
  o: { keyCode: 79, key: "o", code: "KeyO" },
  p: { keyCode: 80, key: "p", code: "KeyP" },
  q: { keyCode: 81, key: "q", code: "KeyQ" },
  r: { keyCode: 82, key: "r", code: "KeyR" },
  s: { keyCode: 83, key: "s", code: "KeyS" },
  t: { keyCode: 84, key: "t", code: "KeyT" },
  u: { keyCode: 85, key: "u", code: "KeyU" },
  v: { keyCode: 86, key: "v", code: "KeyV" },
  w: { keyCode: 87, key: "w", code: "KeyW" },
  x: { keyCode: 88, key: "x", code: "KeyX" },
  y: { keyCode: 89, key: "y", code: "KeyY" },
  z: { keyCode: 90, key: "z", code: "KeyZ" },
  Meta: { keyCode: 91, key: "Meta", code: "MetaLeft", location: 1 },
  "*": { keyCode: 106, key: "*", code: "NumpadMultiply", location: 3 },
  "+": { keyCode: 107, key: "+", code: "NumpadAdd", location: 3 },
  "-": { keyCode: 109, key: "-", code: "NumpadSubtract", location: 3 },
  "/": { keyCode: 111, key: "/", code: "NumpadDivide", location: 3 },
  ";": { keyCode: 186, key: ";", code: "Semicolon" },
  "=": { keyCode: 187, key: "=", code: "Equal" },
  ",": { keyCode: 188, key: ",", code: "Comma" },
  ".": { keyCode: 190, key: ".", code: "Period" },
  "`": { keyCode: 192, key: "`", code: "Backquote" },
  "[": { keyCode: 219, key: "[", code: "BracketLeft" },
  "\\": { keyCode: 220, key: "\\", code: "Backslash" },
  "]": { keyCode: 221, key: "]", code: "BracketRight" },
  "'": { keyCode: 222, key: "'", code: "Quote" },
  Attn: { keyCode: 246, key: "Attn" },
  CrSel: { keyCode: 247, key: "CrSel", code: "Props" },
  ExSel: { keyCode: 248, key: "ExSel" },
  EraseEof: { keyCode: 249, key: "EraseEof" },
  Play: { keyCode: 250, key: "Play" },
  ZoomOut: { keyCode: 251, key: "ZoomOut" },
  ")": { keyCode: 48, key: ")", code: "Digit0" },
  "!": { keyCode: 49, key: "!", code: "Digit1" },
  "@": { keyCode: 50, key: "@", code: "Digit2" },
  "#": { keyCode: 51, key: "#", code: "Digit3" },
  $: { keyCode: 52, key: "$", code: "Digit4" },
  "%": { keyCode: 53, key: "%", code: "Digit5" },
  "^": { keyCode: 54, key: "^", code: "Digit6" },
  "&": { keyCode: 55, key: "&", code: "Digit7" },
  "(": { keyCode: 57, key: "(", code: "Digit9" },
  A: { keyCode: 65, key: "A", code: "KeyA" },
  B: { keyCode: 66, key: "B", code: "KeyB" },
  C: { keyCode: 67, key: "C", code: "KeyC" },
  D: { keyCode: 68, key: "D", code: "KeyD" },
  E: { keyCode: 69, key: "E", code: "KeyE" },
  F: { keyCode: 70, key: "F", code: "KeyF" },
  G: { keyCode: 71, key: "G", code: "KeyG" },
  H: { keyCode: 72, key: "H", code: "KeyH" },
  I: { keyCode: 73, key: "I", code: "KeyI" },
  J: { keyCode: 74, key: "J", code: "KeyJ" },
  K: { keyCode: 75, key: "K", code: "KeyK" },
  L: { keyCode: 76, key: "L", code: "KeyL" },
  M: { keyCode: 77, key: "M", code: "KeyM" },
  N: { keyCode: 78, key: "N", code: "KeyN" },
  O: { keyCode: 79, key: "O", code: "KeyO" },
  P: { keyCode: 80, key: "P", code: "KeyP" },
  Q: { keyCode: 81, key: "Q", code: "KeyQ" },
  R: { keyCode: 82, key: "R", code: "KeyR" },
  S: { keyCode: 83, key: "S", code: "KeyS" },
  T: { keyCode: 84, key: "T", code: "KeyT" },
  U: { keyCode: 85, key: "U", code: "KeyU" },
  V: { keyCode: 86, key: "V", code: "KeyV" },
  W: { keyCode: 87, key: "W", code: "KeyW" },
  X: { keyCode: 88, key: "X", code: "KeyX" },
  Y: { keyCode: 89, key: "Y", code: "KeyY" },
  Z: { keyCode: 90, key: "Z", code: "KeyZ" },
  ":": { keyCode: 186, key: ":", code: "Semicolon" },
  "<": { keyCode: 188, key: "<", code: "Comma" },
  _: { keyCode: 189, key: "_", code: "Minus" },
  ">": { keyCode: 190, key: ">", code: "Period" },
  "?": { keyCode: 191, key: "?", code: "Slash" },
  "~": { keyCode: 192, key: "~", code: "Backquote" },
  "{": { keyCode: 219, key: "{", code: "BracketLeft" },
  "|": { keyCode: 220, key: "|", code: "Backslash" },
  "}": { keyCode: 221, key: "}", code: "BracketRight" },
  '"': { keyCode: 222, key: '"', code: "Quote" },
  SoftLeft: { key: "SoftLeft", code: "SoftLeft", location: 4 },
  SoftRight: { key: "SoftRight", code: "SoftRight", location: 4 },
  Camera: { keyCode: 44, key: "Camera", code: "Camera", location: 4 },
  Call: { key: "Call", code: "Call", location: 4 },
  EndCall: { keyCode: 95, key: "EndCall", code: "EndCall", location: 4 },
  VolumeDown: {
    keyCode: 182,
    key: "VolumeDown",
    code: "VolumeDown",
    location: 4
  },
  VolumeUp: { keyCode: 183, key: "VolumeUp", code: "VolumeUp", location: 4 }
};

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Input.js
var __classPrivateFieldSet18 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet20 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Keyboard_instances;
var _Keyboard_client;
var _Keyboard_pressedKeys;
var _Keyboard_modifierBit;
var _Keyboard_keyDescriptionForString;
var _Mouse_client;
var _Mouse_keyboard;
var _Mouse_x;
var _Mouse_y;
var _Mouse_button;
var _Touchscreen_client;
var _Touchscreen_keyboard;
var Keyboard = class {
  /**
   * @internal
   */
  constructor(client) {
    _Keyboard_instances.add(this);
    _Keyboard_client.set(this, void 0);
    _Keyboard_pressedKeys.set(this, /* @__PURE__ */ new Set());
    this._modifiers = 0;
    __classPrivateFieldSet18(this, _Keyboard_client, client, "f");
  }
  /**
   * Dispatches a `keydown` event.
   *
   * @remarks
   * If `key` is a single character and no modifier keys besides `Shift`
   * are being held down, a `keypress`/`input` event will also generated.
   * The `text` option can be specified to force an input event to be generated.
   * If `key` is a modifier key, `Shift`, `Meta`, `Control`, or `Alt`,
   * subsequent key presses will be sent with that modifier active.
   * To release the modifier key, use {@link Keyboard.up}.
   *
   * After the key is pressed once, subsequent calls to
   * {@link Keyboard.down} will have
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat | repeat}
   * set to true. To release the key, use {@link Keyboard.up}.
   *
   * Modifier keys DO influence {@link Keyboard.down}.
   * Holding down `Shift` will type the text in upper case.
   *
   * @param key - Name of key to press, such as `ArrowLeft`.
   * See {@link KeyInput} for a list of all key names.
   *
   * @param options - An object of options. Accepts text which, if specified,
   * generates an input event with this text.
   */
  async down(key, options = { text: void 0 }) {
    const description = __classPrivateFieldGet20(this, _Keyboard_instances, "m", _Keyboard_keyDescriptionForString).call(this, key);
    const autoRepeat = __classPrivateFieldGet20(this, _Keyboard_pressedKeys, "f").has(description.code);
    __classPrivateFieldGet20(this, _Keyboard_pressedKeys, "f").add(description.code);
    this._modifiers |= __classPrivateFieldGet20(this, _Keyboard_instances, "m", _Keyboard_modifierBit).call(this, description.key);
    const text = options.text === void 0 ? description.text : options.text;
    await __classPrivateFieldGet20(this, _Keyboard_client, "f").send("Input.dispatchKeyEvent", {
      type: text ? "keyDown" : "rawKeyDown",
      modifiers: this._modifiers,
      windowsVirtualKeyCode: description.keyCode,
      code: description.code,
      key: description.key,
      text,
      unmodifiedText: text,
      autoRepeat,
      location: description.location,
      isKeypad: description.location === 3
    });
  }
  /**
   * Dispatches a `keyup` event.
   *
   * @param key - Name of key to release, such as `ArrowLeft`.
   * See {@link KeyInput | KeyInput}
   * for a list of all key names.
   */
  async up(key) {
    const description = __classPrivateFieldGet20(this, _Keyboard_instances, "m", _Keyboard_keyDescriptionForString).call(this, key);
    this._modifiers &= ~__classPrivateFieldGet20(this, _Keyboard_instances, "m", _Keyboard_modifierBit).call(this, description.key);
    __classPrivateFieldGet20(this, _Keyboard_pressedKeys, "f").delete(description.code);
    await __classPrivateFieldGet20(this, _Keyboard_client, "f").send("Input.dispatchKeyEvent", {
      type: "keyUp",
      modifiers: this._modifiers,
      key: description.key,
      windowsVirtualKeyCode: description.keyCode,
      code: description.code,
      location: description.location
    });
  }
  /**
   * Dispatches a `keypress` and `input` event.
   * This does not send a `keydown` or `keyup` event.
   *
   * @remarks
   * Modifier keys DO NOT effect {@link Keyboard.sendCharacter | Keyboard.sendCharacter}.
   * Holding down `Shift` will not type the text in upper case.
   *
   * @example
   *
   * ```ts
   * page.keyboard.sendCharacter('嗨');
   * ```
   *
   * @param char - Character to send into the page.
   */
  async sendCharacter(char) {
    await __classPrivateFieldGet20(this, _Keyboard_client, "f").send("Input.insertText", { text: char });
  }
  charIsKey(char) {
    return !!_keyDefinitions[char];
  }
  /**
   * Sends a `keydown`, `keypress`/`input`,
   * and `keyup` event for each character in the text.
   *
   * @remarks
   * To press a special key, like `Control` or `ArrowDown`,
   * use {@link Keyboard.press}.
   *
   * Modifier keys DO NOT effect `keyboard.type`.
   * Holding down `Shift` will not type the text in upper case.
   *
   * @example
   *
   * ```ts
   * await page.keyboard.type('Hello'); // Types instantly
   * await page.keyboard.type('World', {delay: 100}); // Types slower, like a user
   * ```
   *
   * @param text - A text to type into a focused element.
   * @param options - An object of options. Accepts delay which,
   * if specified, is the time to wait between `keydown` and `keyup` in milliseconds.
   * Defaults to 0.
   */
  async type(text, options = {}) {
    const delay = options.delay || void 0;
    for (const char of text) {
      if (this.charIsKey(char)) {
        await this.press(char, { delay });
      } else {
        if (delay) {
          await new Promise((f) => {
            return setTimeout(f, delay);
          });
        }
        await this.sendCharacter(char);
      }
    }
  }
  /**
   * Shortcut for {@link Keyboard.down}
   * and {@link Keyboard.up}.
   *
   * @remarks
   * If `key` is a single character and no modifier keys besides `Shift`
   * are being held down, a `keypress`/`input` event will also generated.
   * The `text` option can be specified to force an input event to be generated.
   *
   * Modifier keys DO effect {@link Keyboard.press}.
   * Holding down `Shift` will type the text in upper case.
   *
   * @param key - Name of key to press, such as `ArrowLeft`.
   * See {@link KeyInput} for a list of all key names.
   *
   * @param options - An object of options. Accepts text which, if specified,
   * generates an input event with this text. Accepts delay which,
   * if specified, is the time to wait between `keydown` and `keyup` in milliseconds.
   * Defaults to 0.
   */
  async press(key, options = {}) {
    const { delay = null } = options;
    await this.down(key, options);
    if (delay) {
      await new Promise((f) => {
        return setTimeout(f, options.delay);
      });
    }
    await this.up(key);
  }
};
_Keyboard_client = /* @__PURE__ */ new WeakMap(), _Keyboard_pressedKeys = /* @__PURE__ */ new WeakMap(), _Keyboard_instances = /* @__PURE__ */ new WeakSet(), _Keyboard_modifierBit = function _Keyboard_modifierBit2(key) {
  if (key === "Alt") {
    return 1;
  }
  if (key === "Control") {
    return 2;
  }
  if (key === "Meta") {
    return 4;
  }
  if (key === "Shift") {
    return 8;
  }
  return 0;
}, _Keyboard_keyDescriptionForString = function _Keyboard_keyDescriptionForString2(keyString) {
  const shift = this._modifiers & 8;
  const description = {
    key: "",
    keyCode: 0,
    code: "",
    text: "",
    location: 0
  };
  const definition = _keyDefinitions[keyString];
  assert(definition, `Unknown key: "${keyString}"`);
  if (definition.key) {
    description.key = definition.key;
  }
  if (shift && definition.shiftKey) {
    description.key = definition.shiftKey;
  }
  if (definition.keyCode) {
    description.keyCode = definition.keyCode;
  }
  if (shift && definition.shiftKeyCode) {
    description.keyCode = definition.shiftKeyCode;
  }
  if (definition.code) {
    description.code = definition.code;
  }
  if (definition.location) {
    description.location = definition.location;
  }
  if (description.key.length === 1) {
    description.text = description.key;
  }
  if (definition.text) {
    description.text = definition.text;
  }
  if (shift && definition.shiftText) {
    description.text = definition.shiftText;
  }
  if (this._modifiers & ~8) {
    description.text = "";
  }
  return description;
};
var Mouse = class {
  /**
   * @internal
   */
  constructor(client, keyboard) {
    _Mouse_client.set(this, void 0);
    _Mouse_keyboard.set(this, void 0);
    _Mouse_x.set(this, 0);
    _Mouse_y.set(this, 0);
    _Mouse_button.set(this, "none");
    __classPrivateFieldSet18(this, _Mouse_client, client, "f");
    __classPrivateFieldSet18(this, _Mouse_keyboard, keyboard, "f");
  }
  /**
   * Dispatches a `mousemove` event.
   * @param x - Horizontal position of the mouse.
   * @param y - Vertical position of the mouse.
   * @param options - Optional object. If specified, the `steps` property
   * sends intermediate `mousemove` events when set to `1` (default).
   */
  async move(x, y, options = {}) {
    const { steps = 1 } = options;
    const fromX = __classPrivateFieldGet20(this, _Mouse_x, "f"), fromY = __classPrivateFieldGet20(this, _Mouse_y, "f");
    __classPrivateFieldSet18(this, _Mouse_x, x, "f");
    __classPrivateFieldSet18(this, _Mouse_y, y, "f");
    for (let i = 1; i <= steps; i++) {
      await __classPrivateFieldGet20(this, _Mouse_client, "f").send("Input.dispatchMouseEvent", {
        type: "mouseMoved",
        button: __classPrivateFieldGet20(this, _Mouse_button, "f"),
        x: fromX + (__classPrivateFieldGet20(this, _Mouse_x, "f") - fromX) * (i / steps),
        y: fromY + (__classPrivateFieldGet20(this, _Mouse_y, "f") - fromY) * (i / steps),
        modifiers: __classPrivateFieldGet20(this, _Mouse_keyboard, "f")._modifiers
      });
    }
  }
  /**
   * Shortcut for `mouse.move`, `mouse.down` and `mouse.up`.
   * @param x - Horizontal position of the mouse.
   * @param y - Vertical position of the mouse.
   * @param options - Optional `MouseOptions`.
   */
  async click(x, y, options = {}) {
    const { delay = null } = options;
    if (delay !== null) {
      await this.move(x, y);
      await this.down(options);
      await new Promise((f) => {
        return setTimeout(f, delay);
      });
      await this.up(options);
    } else {
      await this.move(x, y);
      await this.down(options);
      await this.up(options);
    }
  }
  /**
   * Dispatches a `mousedown` event.
   * @param options - Optional `MouseOptions`.
   */
  async down(options = {}) {
    const { button = "left", clickCount = 1 } = options;
    __classPrivateFieldSet18(this, _Mouse_button, button, "f");
    await __classPrivateFieldGet20(this, _Mouse_client, "f").send("Input.dispatchMouseEvent", {
      type: "mousePressed",
      button,
      x: __classPrivateFieldGet20(this, _Mouse_x, "f"),
      y: __classPrivateFieldGet20(this, _Mouse_y, "f"),
      modifiers: __classPrivateFieldGet20(this, _Mouse_keyboard, "f")._modifiers,
      clickCount
    });
  }
  /**
   * Dispatches a `mouseup` event.
   * @param options - Optional `MouseOptions`.
   */
  async up(options = {}) {
    const { button = "left", clickCount = 1 } = options;
    __classPrivateFieldSet18(this, _Mouse_button, "none", "f");
    await __classPrivateFieldGet20(this, _Mouse_client, "f").send("Input.dispatchMouseEvent", {
      type: "mouseReleased",
      button,
      x: __classPrivateFieldGet20(this, _Mouse_x, "f"),
      y: __classPrivateFieldGet20(this, _Mouse_y, "f"),
      modifiers: __classPrivateFieldGet20(this, _Mouse_keyboard, "f")._modifiers,
      clickCount
    });
  }
  /**
   * Dispatches a `mousewheel` event.
   * @param options - Optional: `MouseWheelOptions`.
   *
   * @example
   * An example of zooming into an element:
   *
   * ```ts
   * await page.goto(
   *   'https://mdn.mozillademos.org/en-US/docs/Web/API/Element/wheel_event$samples/Scaling_an_element_via_the_wheel?revision=1587366'
   * );
   *
   * const elem = await page.$('div');
   * const boundingBox = await elem.boundingBox();
   * await page.mouse.move(
   *   boundingBox.x + boundingBox.width / 2,
   *   boundingBox.y + boundingBox.height / 2
   * );
   *
   * await page.mouse.wheel({deltaY: -100});
   * ```
   */
  async wheel(options = {}) {
    const { deltaX = 0, deltaY = 0 } = options;
    await __classPrivateFieldGet20(this, _Mouse_client, "f").send("Input.dispatchMouseEvent", {
      type: "mouseWheel",
      x: __classPrivateFieldGet20(this, _Mouse_x, "f"),
      y: __classPrivateFieldGet20(this, _Mouse_y, "f"),
      deltaX,
      deltaY,
      modifiers: __classPrivateFieldGet20(this, _Mouse_keyboard, "f")._modifiers,
      pointerType: "mouse"
    });
  }
  /**
   * Dispatches a `drag` event.
   * @param start - starting point for drag
   * @param target - point to drag to
   */
  async drag(start, target) {
    const promise = new Promise((resolve) => {
      __classPrivateFieldGet20(this, _Mouse_client, "f").once("Input.dragIntercepted", (event) => {
        return resolve(event.data);
      });
    });
    await this.move(start.x, start.y);
    await this.down();
    await this.move(target.x, target.y);
    return promise;
  }
  /**
   * Dispatches a `dragenter` event.
   * @param target - point for emitting `dragenter` event
   * @param data - drag data containing items and operations mask
   */
  async dragEnter(target, data) {
    await __classPrivateFieldGet20(this, _Mouse_client, "f").send("Input.dispatchDragEvent", {
      type: "dragEnter",
      x: target.x,
      y: target.y,
      modifiers: __classPrivateFieldGet20(this, _Mouse_keyboard, "f")._modifiers,
      data
    });
  }
  /**
   * Dispatches a `dragover` event.
   * @param target - point for emitting `dragover` event
   * @param data - drag data containing items and operations mask
   */
  async dragOver(target, data) {
    await __classPrivateFieldGet20(this, _Mouse_client, "f").send("Input.dispatchDragEvent", {
      type: "dragOver",
      x: target.x,
      y: target.y,
      modifiers: __classPrivateFieldGet20(this, _Mouse_keyboard, "f")._modifiers,
      data
    });
  }
  /**
   * Performs a dragenter, dragover, and drop in sequence.
   * @param target - point to drop on
   * @param data - drag data containing items and operations mask
   */
  async drop(target, data) {
    await __classPrivateFieldGet20(this, _Mouse_client, "f").send("Input.dispatchDragEvent", {
      type: "drop",
      x: target.x,
      y: target.y,
      modifiers: __classPrivateFieldGet20(this, _Mouse_keyboard, "f")._modifiers,
      data
    });
  }
  /**
   * Performs a drag, dragenter, dragover, and drop in sequence.
   * @param target - point to drag from
   * @param target - point to drop on
   * @param options - An object of options. Accepts delay which,
   * if specified, is the time to wait between `dragover` and `drop` in milliseconds.
   * Defaults to 0.
   */
  async dragAndDrop(start, target, options = {}) {
    const { delay = null } = options;
    const data = await this.drag(start, target);
    await this.dragEnter(target, data);
    await this.dragOver(target, data);
    if (delay) {
      await new Promise((resolve) => {
        return setTimeout(resolve, delay);
      });
    }
    await this.drop(target, data);
    await this.up();
  }
};
_Mouse_client = /* @__PURE__ */ new WeakMap(), _Mouse_keyboard = /* @__PURE__ */ new WeakMap(), _Mouse_x = /* @__PURE__ */ new WeakMap(), _Mouse_y = /* @__PURE__ */ new WeakMap(), _Mouse_button = /* @__PURE__ */ new WeakMap();
var Touchscreen = class {
  /**
   * @internal
   */
  constructor(client, keyboard) {
    _Touchscreen_client.set(this, void 0);
    _Touchscreen_keyboard.set(this, void 0);
    __classPrivateFieldSet18(this, _Touchscreen_client, client, "f");
    __classPrivateFieldSet18(this, _Touchscreen_keyboard, keyboard, "f");
  }
  /**
   * Dispatches a `touchstart` and `touchend` event.
   * @param x - Horizontal position of the tap.
   * @param y - Vertical position of the tap.
   */
  async tap(x, y) {
    const touchPoints = [{ x: Math.round(x), y: Math.round(y) }];
    await __classPrivateFieldGet20(this, _Touchscreen_client, "f").send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints,
      modifiers: __classPrivateFieldGet20(this, _Touchscreen_keyboard, "f")._modifiers
    });
    await __classPrivateFieldGet20(this, _Touchscreen_client, "f").send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
      modifiers: __classPrivateFieldGet20(this, _Touchscreen_keyboard, "f")._modifiers
    });
  }
};
_Touchscreen_client = /* @__PURE__ */ new WeakMap(), _Touchscreen_keyboard = /* @__PURE__ */ new WeakMap();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/PDFOptions.js
init_checked_fetch();
init_modules_watch_stub();
var _paperFormats = {
  letter: { width: 8.5, height: 11 },
  legal: { width: 8.5, height: 14 },
  tabloid: { width: 11, height: 17 },
  ledger: { width: 17, height: 11 },
  a0: { width: 33.1, height: 46.8 },
  a1: { width: 23.4, height: 33.1 },
  a2: { width: 16.54, height: 23.4 },
  a3: { width: 11.7, height: 16.54 },
  a4: { width: 8.27, height: 11.7 },
  a5: { width: 5.83, height: 8.27 },
  a6: { width: 4.13, height: 5.83 }
};

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/TimeoutSettings.js
init_checked_fetch();
init_modules_watch_stub();
var __classPrivateFieldSet19 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet21 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TimeoutSettings_defaultTimeout;
var _TimeoutSettings_defaultNavigationTimeout;
var DEFAULT_TIMEOUT = 3e4;
var TimeoutSettings = class {
  constructor() {
    _TimeoutSettings_defaultTimeout.set(this, void 0);
    _TimeoutSettings_defaultNavigationTimeout.set(this, void 0);
    __classPrivateFieldSet19(this, _TimeoutSettings_defaultTimeout, null, "f");
    __classPrivateFieldSet19(this, _TimeoutSettings_defaultNavigationTimeout, null, "f");
  }
  setDefaultTimeout(timeout) {
    __classPrivateFieldSet19(this, _TimeoutSettings_defaultTimeout, timeout, "f");
  }
  setDefaultNavigationTimeout(timeout) {
    __classPrivateFieldSet19(this, _TimeoutSettings_defaultNavigationTimeout, timeout, "f");
  }
  navigationTimeout() {
    if (__classPrivateFieldGet21(this, _TimeoutSettings_defaultNavigationTimeout, "f") !== null) {
      return __classPrivateFieldGet21(this, _TimeoutSettings_defaultNavigationTimeout, "f");
    }
    if (__classPrivateFieldGet21(this, _TimeoutSettings_defaultTimeout, "f") !== null) {
      return __classPrivateFieldGet21(this, _TimeoutSettings_defaultTimeout, "f");
    }
    return DEFAULT_TIMEOUT;
  }
  timeout() {
    if (__classPrivateFieldGet21(this, _TimeoutSettings_defaultTimeout, "f") !== null) {
      return __classPrivateFieldGet21(this, _TimeoutSettings_defaultTimeout, "f");
    }
    return DEFAULT_TIMEOUT;
  }
};
_TimeoutSettings_defaultTimeout = /* @__PURE__ */ new WeakMap(), _TimeoutSettings_defaultNavigationTimeout = /* @__PURE__ */ new WeakMap();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/WebWorker.js
init_checked_fetch();
init_modules_watch_stub();
var __classPrivateFieldSet20 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet22 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _WebWorker_executionContext;
var _WebWorker_client;
var _WebWorker_url;
var WebWorker = class extends EventEmitter {
  /**
   * @internal
   */
  constructor(client, url, consoleAPICalled, exceptionThrown) {
    super();
    _WebWorker_executionContext.set(this, createDeferredPromise());
    _WebWorker_client.set(this, void 0);
    _WebWorker_url.set(this, void 0);
    __classPrivateFieldSet20(this, _WebWorker_client, client, "f");
    __classPrivateFieldSet20(this, _WebWorker_url, url, "f");
    __classPrivateFieldGet22(this, _WebWorker_client, "f").once("Runtime.executionContextCreated", async (event) => {
      const context = new ExecutionContext(client, event.context);
      __classPrivateFieldGet22(this, _WebWorker_executionContext, "f").resolve(context);
    });
    __classPrivateFieldGet22(this, _WebWorker_client, "f").on("Runtime.consoleAPICalled", async (event) => {
      const context = await __classPrivateFieldGet22(this, _WebWorker_executionContext, "f");
      return consoleAPICalled(event.type, event.args.map((object) => {
        return new JSHandle(context, object);
      }), event.stackTrace);
    });
    __classPrivateFieldGet22(this, _WebWorker_client, "f").on("Runtime.exceptionThrown", (exception) => {
      return exceptionThrown(exception.exceptionDetails);
    });
    __classPrivateFieldGet22(this, _WebWorker_client, "f").send("Runtime.enable").catch(debugError);
  }
  /**
   * @internal
   */
  async executionContext() {
    return __classPrivateFieldGet22(this, _WebWorker_executionContext, "f");
  }
  /**
   * @returns The URL of this web worker.
   */
  url() {
    return __classPrivateFieldGet22(this, _WebWorker_url, "f");
  }
  /**
   * If the function passed to the `worker.evaluate` returns a Promise, then
   * `worker.evaluate` would wait for the promise to resolve and return its
   * value. If the function passed to the `worker.evaluate` returns a
   * non-serializable value, then `worker.evaluate` resolves to `undefined`.
   * DevTools Protocol also supports transferring some additional values that
   * are not serializable by `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`, and
   * bigint literals.
   * Shortcut for `await worker.executionContext()).evaluate(pageFunction, ...args)`.
   *
   * @param pageFunction - Function to be evaluated in the worker context.
   * @param args - Arguments to pass to `pageFunction`.
   * @returns Promise which resolves to the return value of `pageFunction`.
   */
  async evaluate(pageFunction, ...args) {
    const context = await __classPrivateFieldGet22(this, _WebWorker_executionContext, "f");
    return context.evaluate(pageFunction, ...args);
  }
  /**
   * The only difference between `worker.evaluate` and `worker.evaluateHandle`
   * is that `worker.evaluateHandle` returns in-page object (JSHandle). If the
   * function passed to the `worker.evaluateHandle` returns a `Promise`, then
   * `worker.evaluateHandle` would wait for the promise to resolve and return
   * its value. Shortcut for
   * `await worker.executionContext()).evaluateHandle(pageFunction, ...args)`
   *
   * @param pageFunction - Function to be evaluated in the page context.
   * @param args - Arguments to pass to `pageFunction`.
   * @returns Promise which resolves to the return value of `pageFunction`.
   */
  async evaluateHandle(pageFunction, ...args) {
    const context = await __classPrivateFieldGet22(this, _WebWorker_executionContext, "f");
    return context.evaluateHandle(pageFunction, ...args);
  }
};
_WebWorker_executionContext = /* @__PURE__ */ new WeakMap(), _WebWorker_client = /* @__PURE__ */ new WeakMap(), _WebWorker_url = /* @__PURE__ */ new WeakMap();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Page.js
import { Buffer as Buffer3 } from "node:buffer";
var __classPrivateFieldSet21 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet23 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Page_instances;
var _Page_closed;
var _Page_client;
var _Page_target;
var _Page_keyboard;
var _Page_mouse;
var _Page_timeoutSettings;
var _Page_touchscreen;
var _Page_accessibility;
var _Page_frameManager;
var _Page_emulationManager;
var _Page_pageBindings;
var _Page_coverage;
var _Page_javascriptEnabled;
var _Page_viewport;
var _Page_screenshotTaskQueue;
var _Page_workers;
var _Page_fileChooserPromises;
var _Page_disconnectPromise;
var _Page_userDragInterceptionEnabled;
var _Page_handlerMap;
var _Page_onDetachedFromTarget;
var _Page_onAttachedToTarget;
var _Page_initialize;
var _Page_onFileChooser;
var _Page_onTargetCrashed;
var _Page_onLogEntryAdded;
var _Page_emitMetrics;
var _Page_buildMetricsObject;
var _Page_handleException;
var _Page_onConsoleAPI;
var _Page_onBindingCalled;
var _Page_addConsoleMessage;
var _Page_onDialog;
var _Page_resetDefaultBackgroundColor;
var _Page_setTransparentBackgroundColor;
var _Page_sessionClosePromise;
var _Page_go;
var _Page_screenshotTask;
var Page = class extends EventEmitter {
  /**
   * @internal
   */
  constructor(client, target, ignoreHTTPSErrors, screenshotTaskQueue) {
    super();
    _Page_instances.add(this);
    _Page_closed.set(this, false);
    _Page_client.set(this, void 0);
    _Page_target.set(this, void 0);
    _Page_keyboard.set(this, void 0);
    _Page_mouse.set(this, void 0);
    _Page_timeoutSettings.set(this, new TimeoutSettings());
    _Page_touchscreen.set(this, void 0);
    _Page_accessibility.set(this, void 0);
    _Page_frameManager.set(this, void 0);
    _Page_emulationManager.set(this, void 0);
    _Page_pageBindings.set(this, /* @__PURE__ */ new Map());
    _Page_coverage.set(this, void 0);
    _Page_javascriptEnabled.set(this, true);
    _Page_viewport.set(this, void 0);
    _Page_screenshotTaskQueue.set(this, void 0);
    _Page_workers.set(this, /* @__PURE__ */ new Map());
    _Page_fileChooserPromises.set(this, /* @__PURE__ */ new Set());
    _Page_disconnectPromise.set(this, void 0);
    _Page_userDragInterceptionEnabled.set(this, false);
    _Page_handlerMap.set(this, /* @__PURE__ */ new WeakMap());
    _Page_onDetachedFromTarget.set(this, (target2) => {
      var _a2;
      const sessionId = (_a2 = target2._session()) === null || _a2 === void 0 ? void 0 : _a2.id();
      __classPrivateFieldGet23(this, _Page_frameManager, "f").onDetachedFromTarget(target2);
      const worker = __classPrivateFieldGet23(this, _Page_workers, "f").get(sessionId);
      if (!worker) {
        return;
      }
      __classPrivateFieldGet23(this, _Page_workers, "f").delete(sessionId);
      this.emit("workerdestroyed", worker);
    });
    _Page_onAttachedToTarget.set(this, async (createdTarget) => {
      __classPrivateFieldGet23(this, _Page_frameManager, "f").onAttachedToTarget(createdTarget);
      if (createdTarget._getTargetInfo().type === "worker") {
        const session = createdTarget._session();
        assert(session);
        const worker = new WebWorker(session, createdTarget.url(), __classPrivateFieldGet23(this, _Page_instances, "m", _Page_addConsoleMessage).bind(this), __classPrivateFieldGet23(this, _Page_instances, "m", _Page_handleException).bind(this));
        __classPrivateFieldGet23(this, _Page_workers, "f").set(session.id(), worker);
        this.emit("workercreated", worker);
      }
      if (createdTarget._session()) {
        __classPrivateFieldGet23(this, _Page_target, "f")._targetManager().addTargetInterceptor(createdTarget._session(), __classPrivateFieldGet23(this, _Page_onAttachedToTarget, "f"));
      }
    });
    __classPrivateFieldSet21(this, _Page_client, client, "f");
    __classPrivateFieldSet21(this, _Page_target, target, "f");
    __classPrivateFieldSet21(this, _Page_keyboard, new Keyboard(client), "f");
    __classPrivateFieldSet21(this, _Page_mouse, new Mouse(client, __classPrivateFieldGet23(this, _Page_keyboard, "f")), "f");
    __classPrivateFieldSet21(this, _Page_touchscreen, new Touchscreen(client, __classPrivateFieldGet23(this, _Page_keyboard, "f")), "f");
    __classPrivateFieldSet21(this, _Page_accessibility, new Accessibility(client), "f");
    __classPrivateFieldSet21(this, _Page_frameManager, new FrameManager(client, this, ignoreHTTPSErrors, __classPrivateFieldGet23(this, _Page_timeoutSettings, "f")), "f");
    __classPrivateFieldSet21(this, _Page_emulationManager, new EmulationManager(client), "f");
    __classPrivateFieldSet21(this, _Page_coverage, new Coverage(client), "f");
    __classPrivateFieldSet21(this, _Page_screenshotTaskQueue, screenshotTaskQueue, "f");
    __classPrivateFieldSet21(this, _Page_viewport, null, "f");
    __classPrivateFieldGet23(this, _Page_target, "f")._targetManager().addTargetInterceptor(__classPrivateFieldGet23(this, _Page_client, "f"), __classPrivateFieldGet23(this, _Page_onAttachedToTarget, "f"));
    __classPrivateFieldGet23(this, _Page_target, "f")._targetManager().on("targetGone", __classPrivateFieldGet23(this, _Page_onDetachedFromTarget, "f"));
    __classPrivateFieldGet23(this, _Page_frameManager, "f").on(FrameManagerEmittedEvents.FrameAttached, (event) => {
      return this.emit("frameattached", event);
    });
    __classPrivateFieldGet23(this, _Page_frameManager, "f").on(FrameManagerEmittedEvents.FrameDetached, (event) => {
      return this.emit("framedetached", event);
    });
    __classPrivateFieldGet23(this, _Page_frameManager, "f").on(FrameManagerEmittedEvents.FrameNavigated, (event) => {
      return this.emit("framenavigated", event);
    });
    const networkManager = __classPrivateFieldGet23(this, _Page_frameManager, "f").networkManager;
    networkManager.on(NetworkManagerEmittedEvents.Request, (event) => {
      return this.emit("request", event);
    });
    networkManager.on(NetworkManagerEmittedEvents.RequestServedFromCache, (event) => {
      return this.emit("requestservedfromcache", event);
    });
    networkManager.on(NetworkManagerEmittedEvents.Response, (event) => {
      return this.emit("response", event);
    });
    networkManager.on(NetworkManagerEmittedEvents.RequestFailed, (event) => {
      return this.emit("requestfailed", event);
    });
    networkManager.on(NetworkManagerEmittedEvents.RequestFinished, (event) => {
      return this.emit("requestfinished", event);
    });
    client.on("Page.domContentEventFired", () => {
      return this.emit(
        "domcontentloaded"
        /* PageEmittedEvents.DOMContentLoaded */
      );
    });
    client.on("Page.loadEventFired", () => {
      return this.emit(
        "load"
        /* PageEmittedEvents.Load */
      );
    });
    client.on("Runtime.consoleAPICalled", (event) => {
      return __classPrivateFieldGet23(this, _Page_instances, "m", _Page_onConsoleAPI).call(this, event);
    });
    client.on("Runtime.bindingCalled", (event) => {
      return __classPrivateFieldGet23(this, _Page_instances, "m", _Page_onBindingCalled).call(this, event);
    });
    client.on("Page.javascriptDialogOpening", (event) => {
      return __classPrivateFieldGet23(this, _Page_instances, "m", _Page_onDialog).call(this, event);
    });
    client.on("Runtime.exceptionThrown", (exception) => {
      return __classPrivateFieldGet23(this, _Page_instances, "m", _Page_handleException).call(this, exception.exceptionDetails);
    });
    client.on("Inspector.targetCrashed", () => {
      return __classPrivateFieldGet23(this, _Page_instances, "m", _Page_onTargetCrashed).call(this);
    });
    client.on("Performance.metrics", (event) => {
      return __classPrivateFieldGet23(this, _Page_instances, "m", _Page_emitMetrics).call(this, event);
    });
    client.on("Log.entryAdded", (event) => {
      return __classPrivateFieldGet23(this, _Page_instances, "m", _Page_onLogEntryAdded).call(this, event);
    });
    client.on("Page.fileChooserOpened", (event) => {
      return __classPrivateFieldGet23(this, _Page_instances, "m", _Page_onFileChooser).call(this, event);
    });
    __classPrivateFieldGet23(this, _Page_target, "f")._isClosedPromise.then(() => {
      __classPrivateFieldGet23(this, _Page_target, "f")._targetManager().removeTargetInterceptor(__classPrivateFieldGet23(this, _Page_client, "f"), __classPrivateFieldGet23(this, _Page_onAttachedToTarget, "f"));
      __classPrivateFieldGet23(this, _Page_target, "f")._targetManager().off("targetGone", __classPrivateFieldGet23(this, _Page_onDetachedFromTarget, "f"));
      this.emit(
        "close"
        /* PageEmittedEvents.Close */
      );
      __classPrivateFieldSet21(this, _Page_closed, true, "f");
    });
  }
  /**
   * @internal
   */
  static async _create(client, target, ignoreHTTPSErrors, defaultViewport, screenshotTaskQueue) {
    const page = new Page(client, target, ignoreHTTPSErrors, screenshotTaskQueue);
    await __classPrivateFieldGet23(page, _Page_instances, "m", _Page_initialize).call(page);
    if (defaultViewport) {
      await page.setViewport(defaultViewport);
    }
    return page;
  }
  /**
   * @returns `true` if drag events are being intercepted, `false` otherwise.
   */
  isDragInterceptionEnabled() {
    return __classPrivateFieldGet23(this, _Page_userDragInterceptionEnabled, "f");
  }
  /**
   * @returns `true` if the page has JavaScript enabled, `false` otherwise.
   */
  isJavaScriptEnabled() {
    return __classPrivateFieldGet23(this, _Page_javascriptEnabled, "f");
  }
  /**
   * Listen to page events.
   *
   * :::note
   *
   * This method exists to define event typings and handle proper wireup of
   * cooperative request interception. Actual event listening and dispatching is
   * delegated to {@link EventEmitter}.
   *
   * :::
   */
  on(eventName, handler) {
    if (eventName === "request") {
      const wrap = __classPrivateFieldGet23(this, _Page_handlerMap, "f").get(handler) || ((event) => {
        event.enqueueInterceptAction(() => {
          return handler(event);
        });
      });
      __classPrivateFieldGet23(this, _Page_handlerMap, "f").set(handler, wrap);
      return super.on(eventName, wrap);
    }
    return super.on(eventName, handler);
  }
  once(eventName, handler) {
    return super.once(eventName, handler);
  }
  off(eventName, handler) {
    if (eventName === "request") {
      handler = __classPrivateFieldGet23(this, _Page_handlerMap, "f").get(handler) || handler;
    }
    return super.off(eventName, handler);
  }
  /**
   * This method is typically coupled with an action that triggers file
   * choosing.
   *
   * :::caution
   *
   * This must be called before the file chooser is launched. It will not return
   * a currently active file chooser.
   *
   * :::
   *
   * @remarks
   * In non-headless Chromium, this method results in the native file picker
   * dialog `not showing up` for the user.
   *
   * @example
   * The following example clicks a button that issues a file chooser
   * and then responds with `/tmp/myfile.pdf` as if a user has selected this file.
   *
   * ```ts
   * const [fileChooser] = await Promise.all([
   *   page.waitForFileChooser(),
   *   page.click('#upload-file-button'),
   *   // some button that triggers file selection
   * ]);
   * await fileChooser.accept(['/tmp/myfile.pdf']);
   * ```
   */
  async waitForFileChooser(options = {}) {
    if (!__classPrivateFieldGet23(this, _Page_fileChooserPromises, "f").size) {
      await __classPrivateFieldGet23(this, _Page_client, "f").send("Page.setInterceptFileChooserDialog", {
        enabled: true
      });
    }
    const { timeout = __classPrivateFieldGet23(this, _Page_timeoutSettings, "f").timeout() } = options;
    const promise = createDeferredPromiseWithTimer(`Waiting for \`FileChooser\` failed: ${timeout}ms exceeded`);
    __classPrivateFieldGet23(this, _Page_fileChooserPromises, "f").add(promise);
    return promise.catch((error) => {
      __classPrivateFieldGet23(this, _Page_fileChooserPromises, "f").delete(promise);
      throw error;
    });
  }
  /**
   * Sets the page's geolocation.
   *
   * @remarks
   * Consider using {@link BrowserContext.overridePermissions} to grant
   * permissions for the page to read its geolocation.
   *
   * @example
   *
   * ```ts
   * await page.setGeolocation({latitude: 59.95, longitude: 30.31667});
   * ```
   */
  async setGeolocation(options) {
    const { longitude, latitude, accuracy = 0 } = options;
    if (longitude < -180 || longitude > 180) {
      throw new Error(`Invalid longitude "${longitude}": precondition -180 <= LONGITUDE <= 180 failed.`);
    }
    if (latitude < -90 || latitude > 90) {
      throw new Error(`Invalid latitude "${latitude}": precondition -90 <= LATITUDE <= 90 failed.`);
    }
    if (accuracy < 0) {
      throw new Error(`Invalid accuracy "${accuracy}": precondition 0 <= ACCURACY failed.`);
    }
    await __classPrivateFieldGet23(this, _Page_client, "f").send("Emulation.setGeolocationOverride", {
      longitude,
      latitude,
      accuracy
    });
  }
  /**
   * @returns A target this page was created from.
   */
  target() {
    return __classPrivateFieldGet23(this, _Page_target, "f");
  }
  /**
   * @internal
   */
  _client() {
    return __classPrivateFieldGet23(this, _Page_client, "f");
  }
  /**
   * Get the browser the page belongs to.
   */
  browser() {
    return __classPrivateFieldGet23(this, _Page_target, "f").browser();
  }
  /**
   * Get the browser context that the page belongs to.
   */
  browserContext() {
    return __classPrivateFieldGet23(this, _Page_target, "f").browserContext();
  }
  /**
   * @returns The page's main frame.
   *
   * @remarks
   * Page is guaranteed to have a main frame which persists during navigations.
   */
  mainFrame() {
    return __classPrivateFieldGet23(this, _Page_frameManager, "f").mainFrame();
  }
  get keyboard() {
    return __classPrivateFieldGet23(this, _Page_keyboard, "f");
  }
  get touchscreen() {
    return __classPrivateFieldGet23(this, _Page_touchscreen, "f");
  }
  get coverage() {
    return __classPrivateFieldGet23(this, _Page_coverage, "f");
  }
  get accessibility() {
    return __classPrivateFieldGet23(this, _Page_accessibility, "f");
  }
  /**
   * @returns An array of all frames attached to the page.
   */
  frames() {
    return __classPrivateFieldGet23(this, _Page_frameManager, "f").frames();
  }
  /**
   * @returns all of the dedicated {@link
   * https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API |
   * WebWorkers} associated with the page.
   *
   * @remarks
   * This does not contain ServiceWorkers
   */
  workers() {
    return Array.from(__classPrivateFieldGet23(this, _Page_workers, "f").values());
  }
  /**
   * Activating request interception enables {@link HTTPRequest.abort},
   * {@link HTTPRequest.continue} and {@link HTTPRequest.respond} methods. This
   * provides the capability to modify network requests that are made by a page.
   *
   * Once request interception is enabled, every request will stall unless it's
   * continued, responded or aborted; or completed using the browser cache.
   *
   * Enabling request interception disables page caching.
   *
   * See the
   * {@link https://pptr.dev/next/guides/request-interception|Request interception guide}
   * for more details.
   *
   * @example
   * An example of a naïve request interceptor that aborts all image requests:
   *
   * ```ts
   * const puppeteer = require('puppeteer');
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   await page.setRequestInterception(true);
   *   page.on('request', interceptedRequest => {
   *     if (
   *       interceptedRequest.url().endsWith('.png') ||
   *       interceptedRequest.url().endsWith('.jpg')
   *     )
   *       interceptedRequest.abort();
   *     else interceptedRequest.continue();
   *   });
   *   await page.goto('https://example.com');
   *   await browser.close();
   * })();
   * ```
   *
   * @param value - Whether to enable request interception.
   */
  async setRequestInterception(value) {
    return __classPrivateFieldGet23(this, _Page_frameManager, "f").networkManager.setRequestInterception(value);
  }
  /**
   * @param enabled - Whether to enable drag interception.
   *
   * @remarks
   * Activating drag interception enables the `Input.drag`,
   * methods This provides the capability to capture drag events emitted
   * on the page, which can then be used to simulate drag-and-drop.
   */
  async setDragInterception(enabled) {
    __classPrivateFieldSet21(this, _Page_userDragInterceptionEnabled, enabled, "f");
    return __classPrivateFieldGet23(this, _Page_client, "f").send("Input.setInterceptDrags", { enabled });
  }
  /**
   * @param enabled - When `true`, enables offline mode for the page.
   * @remarks
   * NOTE: while this method sets the network connection to offline, it does
   * not change the parameters used in [page.emulateNetworkConditions(networkConditions)]
   * (#pageemulatenetworkconditionsnetworkconditions)
   */
  setOfflineMode(enabled) {
    return __classPrivateFieldGet23(this, _Page_frameManager, "f").networkManager.setOfflineMode(enabled);
  }
  /**
   * @param networkConditions - Passing `null` disables network condition emulation.
   * @example
   *
   * ```ts
   * const puppeteer = require('puppeteer');
   * const slow3G = puppeteer.networkConditions['Slow 3G'];
   *
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   await page.emulateNetworkConditions(slow3G);
   *   await page.goto('https://www.google.com');
   *   // other actions...
   *   await browser.close();
   * })();
   * ```
   *
   * @remarks
   * NOTE: This does not affect WebSockets and WebRTC PeerConnections (see
   * https://crbug.com/563644). To set the page offline, you can use
   * [page.setOfflineMode(enabled)](#pagesetofflinemodeenabled).
   */
  emulateNetworkConditions(networkConditions2) {
    return __classPrivateFieldGet23(this, _Page_frameManager, "f").networkManager.emulateNetworkConditions(networkConditions2);
  }
  /**
   * This setting will change the default maximum navigation time for the
   * following methods and related shortcuts:
   *
   * - {@link Page.goBack | page.goBack(options)}
   *
   * - {@link Page.goForward | page.goForward(options)}
   *
   * - {@link Page.goto | page.goto(url,options)}
   *
   * - {@link Page.reload | page.reload(options)}
   *
   * - {@link Page.setContent | page.setContent(html,options)}
   *
   * - {@link Page.waitForNavigation | page.waitForNavigation(options)}
   *   @param timeout - Maximum navigation time in milliseconds.
   */
  setDefaultNavigationTimeout(timeout) {
    __classPrivateFieldGet23(this, _Page_timeoutSettings, "f").setDefaultNavigationTimeout(timeout);
  }
  /**
   * @param timeout - Maximum time in milliseconds.
   */
  setDefaultTimeout(timeout) {
    __classPrivateFieldGet23(this, _Page_timeoutSettings, "f").setDefaultTimeout(timeout);
  }
  /**
   * Runs `document.querySelector` within the page. If no element matches the
   * selector, the return value resolves to `null`.
   *
   * @param selector - A `selector` to query page for
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
   * to query page for.
   */
  async $(selector) {
    return this.mainFrame().$(selector);
  }
  /**
   * The method runs `document.querySelectorAll` within the page. If no elements
   * match the selector, the return value resolves to `[]`.
   * @remarks
   * Shortcut for {@link Frame.$$ | Page.mainFrame().$$(selector) }.
   * @param selector - A `selector` to query page for
   */
  async $$(selector) {
    return this.mainFrame().$$(selector);
  }
  /**
   * @remarks
   *
   * The only difference between {@link Page.evaluate | page.evaluate} and
   * `page.evaluateHandle` is that `evaluateHandle` will return the value
   * wrapped in an in-page object.
   *
   * If the function passed to `page.evaluteHandle` returns a Promise, the
   * function will wait for the promise to resolve and return its value.
   *
   * You can pass a string instead of a function (although functions are
   * recommended as they are easier to debug and use with TypeScript):
   *
   * @example
   *
   * ```ts
   * const aHandle = await page.evaluateHandle('document');
   * ```
   *
   * @example
   * {@link JSHandle} instances can be passed as arguments to the `pageFunction`:
   *
   * ```ts
   * const aHandle = await page.evaluateHandle(() => document.body);
   * const resultHandle = await page.evaluateHandle(
   *   body => body.innerHTML,
   *   aHandle
   * );
   * console.log(await resultHandle.jsonValue());
   * await resultHandle.dispose();
   * ```
   *
   * Most of the time this function returns a {@link JSHandle},
   * but if `pageFunction` returns a reference to an element,
   * you instead get an {@link ElementHandle} back:
   *
   * @example
   *
   * ```ts
   * const button = await page.evaluateHandle(() =>
   *   document.querySelector('button')
   * );
   * // can call `click` because `button` is an `ElementHandle`
   * await button.click();
   * ```
   *
   * The TypeScript definitions assume that `evaluateHandle` returns
   * a `JSHandle`, but if you know it's going to return an
   * `ElementHandle`, pass it as the generic argument:
   *
   * ```ts
   * const button = await page.evaluateHandle<ElementHandle>(...);
   * ```
   *
   * @param pageFunction - a function that is run within the page
   * @param args - arguments to be passed to the pageFunction
   */
  async evaluateHandle(pageFunction, ...args) {
    const context = await this.mainFrame().executionContext();
    return context.evaluateHandle(pageFunction, ...args);
  }
  /**
   * This method iterates the JavaScript heap and finds all objects with the
   * given prototype.
   *
   * @example
   *
   * ```ts
   * // Create a Map object
   * await page.evaluate(() => (window.map = new Map()));
   * // Get a handle to the Map object prototype
   * const mapPrototype = await page.evaluateHandle(() => Map.prototype);
   * // Query all map instances into an array
   * const mapInstances = await page.queryObjects(mapPrototype);
   * // Count amount of map objects in heap
   * const count = await page.evaluate(maps => maps.length, mapInstances);
   * await mapInstances.dispose();
   * await mapPrototype.dispose();
   * ```
   *
   * @param prototypeHandle - a handle to the object prototype.
   * @returns Promise which resolves to a handle to an array of objects with
   * this prototype.
   */
  async queryObjects(prototypeHandle) {
    const context = await this.mainFrame().executionContext();
    assert(!prototypeHandle.disposed, "Prototype JSHandle is disposed!");
    const remoteObject = prototypeHandle.remoteObject();
    assert(remoteObject.objectId, "Prototype JSHandle must not be referencing primitive value");
    const response = await context._client.send("Runtime.queryObjects", {
      prototypeObjectId: remoteObject.objectId
    });
    return createJSHandle(context, response.objects);
  }
  /**
   * This method runs `document.querySelector` within the page and passes the
   * result as the first argument to the `pageFunction`.
   *
   * @remarks
   *
   * If no element is found matching `selector`, the method will throw an error.
   *
   * If `pageFunction` returns a promise `$eval` will wait for the promise to
   * resolve and then return its value.
   *
   * @example
   *
   * ```ts
   * const searchValue = await page.$eval('#search', el => el.value);
   * const preloadHref = await page.$eval('link[rel=preload]', el => el.href);
   * const html = await page.$eval('.main-container', el => el.outerHTML);
   * ```
   *
   * If you are using TypeScript, you may have to provide an explicit type to the
   * first argument of the `pageFunction`.
   * By default it is typed as `Element`, but you may need to provide a more
   * specific sub-type:
   *
   * @example
   *
   * ```ts
   * // if you don't provide HTMLInputElement here, TS will error
   * // as `value` is not on `Element`
   * const searchValue = await page.$eval(
   *   '#search',
   *   (el: HTMLInputElement) => el.value
   * );
   * ```
   *
   * The compiler should be able to infer the return type
   * from the `pageFunction` you provide. If it is unable to, you can use the generic
   * type to tell the compiler what return type you expect from `$eval`:
   *
   * @example
   *
   * ```ts
   * // The compiler can infer the return type in this case, but if it can't
   * // or if you want to be more explicit, provide it as the generic type.
   * const searchValue = await page.$eval<string>(
   *   '#search',
   *   (el: HTMLInputElement) => el.value
   * );
   * ```
   *
   * @param selector - the
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
   * to query for
   * @param pageFunction - the function to be evaluated in the page context.
   * Will be passed the result of `document.querySelector(selector)` as its
   * first argument.
   * @param args - any additional arguments to pass through to `pageFunction`.
   *
   * @returns The result of calling `pageFunction`. If it returns an element it
   * is wrapped in an {@link ElementHandle}, else the raw value itself is
   * returned.
   */
  async $eval(selector, pageFunction, ...args) {
    return this.mainFrame().$eval(selector, pageFunction, ...args);
  }
  /**
   * This method runs `Array.from(document.querySelectorAll(selector))` within
   * the page and passes the result as the first argument to the `pageFunction`.
   *
   * @remarks
   * If `pageFunction` returns a promise `$$eval` will wait for the promise to
   * resolve and then return its value.
   *
   * @example
   *
   * ```ts
   * // get the amount of divs on the page
   * const divCount = await page.$$eval('div', divs => divs.length);
   *
   * // get the text content of all the `.options` elements:
   * const options = await page.$$eval('div > span.options', options => {
   *   return options.map(option => option.textContent);
   * });
   * ```
   *
   * If you are using TypeScript, you may have to provide an explicit type to the
   * first argument of the `pageFunction`.
   * By default it is typed as `Element[]`, but you may need to provide a more
   * specific sub-type:
   *
   * @example
   *
   * ```ts
   * // if you don't provide HTMLInputElement here, TS will error
   * // as `value` is not on `Element`
   * await page.$$eval('input', (elements: HTMLInputElement[]) => {
   *   return elements.map(e => e.value);
   * });
   * ```
   *
   * The compiler should be able to infer the return type
   * from the `pageFunction` you provide. If it is unable to, you can use the generic
   * type to tell the compiler what return type you expect from `$$eval`:
   *
   * @example
   *
   * ```ts
   * // The compiler can infer the return type in this case, but if it can't
   * // or if you want to be more explicit, provide it as the generic type.
   * const allInputValues = await page.$$eval<string[]>(
   *   'input',
   *   (elements: HTMLInputElement[]) => elements.map(e => e.textContent)
   * );
   * ```
   *
   * @param selector - the
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
   * to query for
   * @param pageFunction - the function to be evaluated in the page context.
   * Will be passed the result of
   * `Array.from(document.querySelectorAll(selector))` as its first argument.
   * @param args - any additional arguments to pass through to `pageFunction`.
   *
   * @returns The result of calling `pageFunction`. If it returns an element it
   * is wrapped in an {@link ElementHandle}, else the raw value itself is
   * returned.
   */
  async $$eval(selector, pageFunction, ...args) {
    return this.mainFrame().$$eval(selector, pageFunction, ...args);
  }
  /**
   * The method evaluates the XPath expression relative to the page document as
   * its context node. If there are no such elements, the method resolves to an
   * empty array.
   *
   * @remarks
   * Shortcut for {@link Frame.$x | Page.mainFrame().$x(expression) }.
   *
   * @param expression - Expression to evaluate
   */
  async $x(expression) {
    return this.mainFrame().$x(expression);
  }
  /**
   * If no URLs are specified, this method returns cookies for the current page
   * URL. If URLs are specified, only cookies for those URLs are returned.
   */
  async cookies(...urls2) {
    const originalCookies = (await __classPrivateFieldGet23(this, _Page_client, "f").send("Network.getCookies", {
      urls: urls2.length ? urls2 : [this.url()]
    })).cookies;
    const unsupportedCookieAttributes = ["priority"];
    const filterUnsupportedAttributes = (cookie) => {
      for (const attr of unsupportedCookieAttributes) {
        delete cookie[attr];
      }
      return cookie;
    };
    return originalCookies.map(filterUnsupportedAttributes);
  }
  async deleteCookie(...cookies) {
    const pageURL = this.url();
    for (const cookie of cookies) {
      const item = Object.assign({}, cookie);
      if (!cookie.url && pageURL.startsWith("http")) {
        item.url = pageURL;
      }
      await __classPrivateFieldGet23(this, _Page_client, "f").send("Network.deleteCookies", item);
    }
  }
  /**
   * @example
   *
   * ```ts
   * await page.setCookie(cookieObject1, cookieObject2);
   * ```
   */
  async setCookie(...cookies) {
    const pageURL = this.url();
    const startsWithHTTP = pageURL.startsWith("http");
    const items = cookies.map((cookie) => {
      const item = Object.assign({}, cookie);
      if (!item.url && startsWithHTTP) {
        item.url = pageURL;
      }
      assert(item.url !== "about:blank", `Blank page can not have cookie "${item.name}"`);
      assert(!String.prototype.startsWith.call(item.url || "", "data:"), `Data URL page can not have cookie "${item.name}"`);
      return item;
    });
    await this.deleteCookie(...items);
    if (items.length) {
      await __classPrivateFieldGet23(this, _Page_client, "f").send("Network.setCookies", { cookies: items });
    }
  }
  /**
   * Adds a `<script>` tag into the page with the desired URL or content.
   *
   * @remarks
   * Shortcut for
   * {@link Frame.addScriptTag | page.mainFrame().addScriptTag(options)}.
   *
   * @returns Promise which resolves to the added tag when the script's onload
   * fires or when the script content was injected into frame.
   */
  async addScriptTag(options) {
    return this.mainFrame().addScriptTag(options);
  }
  /**
   * Adds a `<link rel="stylesheet">` tag into the page with the desired URL or a
   * `<style type="text/css">` tag with the content.
   * @returns Promise which resolves to the added tag when the stylesheet's
   * onload fires or when the CSS content was injected into frame.
   */
  async addStyleTag(options) {
    return this.mainFrame().addStyleTag(options);
  }
  /**
   * The method adds a function called `name` on the page's `window` object.
   * When called, the function executes `puppeteerFunction` in node.js and
   * returns a `Promise` which resolves to the return value of
   * `puppeteerFunction`.
   *
   * If the puppeteerFunction returns a `Promise`, it will be awaited.
   *
   * :::note
   *
   * Functions installed via `page.exposeFunction` survive navigations.
   *
   * :::note
   *
   * @example
   * An example of adding an `md5` function into the page:
   *
   * ```ts
   * const puppeteer = require('puppeteer');
   * const crypto = require('crypto');
   *
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   page.on('console', msg => console.log(msg.text()));
   *   await page.exposeFunction('md5', text =>
   *     crypto.createHash('md5').update(text).digest('hex')
   *   );
   *   await page.evaluate(async () => {
   *     // use window.md5 to compute hashes
   *     const myString = 'PUPPETEER';
   *     const myHash = await window.md5(myString);
   *     console.log(`md5 of ${myString} is ${myHash}`);
   *   });
   *   await browser.close();
   * })();
   * ```
   *
   * @example
   * An example of adding a `window.readfile` function into the page:
   *
   * ```ts
   * const puppeteer = require('puppeteer');
   * const fs = require('fs');
   *
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   page.on('console', msg => console.log(msg.text()));
   *   await page.exposeFunction('readfile', async filePath => {
   *     return new Promise((resolve, reject) => {
   *       fs.readFile(filePath, 'utf8', (err, text) => {
   *         if (err) reject(err);
   *         else resolve(text);
   *       });
   *     });
   *   });
   *   await page.evaluate(async () => {
   *     // use window.readfile to read contents of a file
   *     const content = await window.readfile('/etc/hosts');
   *     console.log(content);
   *   });
   *   await browser.close();
   * })();
   * ```
   *
   * @param name - Name of the function on the window object
   * @param pptrFunction - Callback function which will be called in Puppeteer's
   * context.
   */
  async exposeFunction(name, pptrFunction) {
    if (__classPrivateFieldGet23(this, _Page_pageBindings, "f").has(name)) {
      throw new Error(`Failed to add page binding with name ${name}: window['${name}'] already exists!`);
    }
    let exposedFunction;
    switch (typeof pptrFunction) {
      case "function":
        exposedFunction = pptrFunction;
        break;
      default:
        exposedFunction = pptrFunction.default;
        break;
    }
    __classPrivateFieldGet23(this, _Page_pageBindings, "f").set(name, exposedFunction);
    const expression = pageBindingInitString("exposedFun", name);
    await __classPrivateFieldGet23(this, _Page_client, "f").send("Runtime.addBinding", { name });
    await __classPrivateFieldGet23(this, _Page_client, "f").send("Page.addScriptToEvaluateOnNewDocument", {
      source: expression
    });
    await Promise.all(this.frames().map((frame) => {
      return frame.evaluate(expression).catch(debugError);
    }));
  }
  /**
   * Provide credentials for `HTTP authentication`.
   *
   * @remarks
   * To disable authentication, pass `null`.
   */
  async authenticate(credentials) {
    return __classPrivateFieldGet23(this, _Page_frameManager, "f").networkManager.authenticate(credentials);
  }
  /**
   * The extra HTTP headers will be sent with every request the page initiates.
   *
   * :::tip
   *
   * All HTTP header names are lowercased. (HTTP headers are
   * case-insensitive, so this shouldn’t impact your server code.)
   *
   * :::
   *
   * :::note
   *
   * page.setExtraHTTPHeaders does not guarantee the order of headers in
   * the outgoing requests.
   *
   * :::
   *
   * @param headers - An object containing additional HTTP headers to be sent
   * with every request. All header values must be strings.
   */
  async setExtraHTTPHeaders(headers) {
    return __classPrivateFieldGet23(this, _Page_frameManager, "f").networkManager.setExtraHTTPHeaders(headers);
  }
  /**
   * @param userAgent - Specific user agent to use in this page
   * @param userAgentData - Specific user agent client hint data to use in this
   * page
   * @returns Promise which resolves when the user agent is set.
   */
  async setUserAgent(userAgent, userAgentMetadata) {
    return __classPrivateFieldGet23(this, _Page_frameManager, "f").networkManager.setUserAgent(userAgent, userAgentMetadata);
  }
  /**
   * @returns Object containing metrics as key/value pairs.
   *
   * - `Timestamp` : The timestamp when the metrics sample was taken.
   *
   * - `Documents` : Number of documents in the page.
   *
   * - `Frames` : Number of frames in the page.
   *
   * - `JSEventListeners` : Number of events in the page.
   *
   * - `Nodes` : Number of DOM nodes in the page.
   *
   * - `LayoutCount` : Total number of full or partial page layout.
   *
   * - `RecalcStyleCount` : Total number of page style recalculations.
   *
   * - `LayoutDuration` : Combined durations of all page layouts.
   *
   * - `RecalcStyleDuration` : Combined duration of all page style
   *   recalculations.
   *
   * - `ScriptDuration` : Combined duration of JavaScript execution.
   *
   * - `TaskDuration` : Combined duration of all tasks performed by the browser.
   *
   * - `JSHeapUsedSize` : Used JavaScript heap size.
   *
   * - `JSHeapTotalSize` : Total JavaScript heap size.
   *
   * @remarks
   * All timestamps are in monotonic time: monotonically increasing time
   * in seconds since an arbitrary point in the past.
   */
  async metrics() {
    const response = await __classPrivateFieldGet23(this, _Page_client, "f").send("Performance.getMetrics");
    return __classPrivateFieldGet23(this, _Page_instances, "m", _Page_buildMetricsObject).call(this, response.metrics);
  }
  /**
   *
   * @returns
   * @remarks Shortcut for
   * {@link Frame.url | page.mainFrame().url()}.
   */
  url() {
    return this.mainFrame().url();
  }
  async content() {
    return await __classPrivateFieldGet23(this, _Page_frameManager, "f").mainFrame().content();
  }
  /**
   * @param html - HTML markup to assign to the page.
   * @param options - Parameters that has some properties.
   * @remarks
   * The parameter `options` might have the following options.
   *
   * - `timeout` : Maximum time in milliseconds for resources to load, defaults
   *   to 30 seconds, pass `0` to disable timeout. The default value can be
   *   changed by using the {@link Page.setDefaultNavigationTimeout} or
   *   {@link Page.setDefaultTimeout} methods.
   *
   * - `waitUntil`: When to consider setting markup succeeded, defaults to
   *   `load`. Given an array of event strings, setting content is considered
   *   to be successful after all events have been fired. Events can be
   *   either:<br/>
   * - `load` : consider setting content to be finished when the `load` event
   *   is fired.<br/>
   * - `domcontentloaded` : consider setting content to be finished when the
   *   `DOMContentLoaded` event is fired.<br/>
   * - `networkidle0` : consider setting content to be finished when there are
   *   no more than 0 network connections for at least `500` ms.<br/>
   * - `networkidle2` : consider setting content to be finished when there are
   *   no more than 2 network connections for at least `500` ms.
   */
  async setContent(html, options = {}) {
    await __classPrivateFieldGet23(this, _Page_frameManager, "f").mainFrame().setContent(html, options);
  }
  /**
   * @param url - URL to navigate page to. The URL should include scheme, e.g.
   * `https://`
   * @param options - Navigation Parameter
   * @returns Promise which resolves to the main resource response. In case of
   * multiple redirects, the navigation will resolve with the response of the
   * last redirect.
   * @remarks
   * The argument `options` might have the following properties:
   *
   * - `timeout` : Maximum navigation time in milliseconds, defaults to 30
   *   seconds, pass 0 to disable timeout. The default value can be changed by
   *   using the {@link Page.setDefaultNavigationTimeout} or
   *   {@link Page.setDefaultTimeout} methods.
   *
   * - `waitUntil`:When to consider navigation succeeded, defaults to `load`.
   *   Given an array of event strings, navigation is considered to be
   *   successful after all events have been fired. Events can be either:<br/>
   * - `load` : consider navigation to be finished when the load event is
   *   fired.<br/>
   * - `domcontentloaded` : consider navigation to be finished when the
   *   DOMContentLoaded event is fired.<br/>
   * - `networkidle0` : consider navigation to be finished when there are no
   *   more than 0 network connections for at least `500` ms.<br/>
   * - `networkidle2` : consider navigation to be finished when there are no
   *   more than 2 network connections for at least `500` ms.
   *
   * - `referer` : Referer header value. If provided it will take preference
   *   over the referer header value set by
   *   {@link Page.setExtraHTTPHeaders |page.setExtraHTTPHeaders()}.
   *
   * `page.goto` will throw an error if:
   *
   * - there's an SSL error (e.g. in case of self-signed certificates).
   * - target URL is invalid.
   * - the timeout is exceeded during navigation.
   * - the remote server does not respond or is unreachable.
   * - the main resource failed to load.
   *
   * `page.goto` will not throw an error when any valid HTTP status code is
   * returned by the remote server, including 404 "Not Found" and 500
   * "Internal Server Error". The status code for such responses can be
   * retrieved by calling response.status().
   *
   * NOTE: `page.goto` either throws an error or returns a main resource
   * response. The only exceptions are navigation to about:blank or navigation
   * to the same URL with a different hash, which would succeed and return null.
   *
   * NOTE: Headless mode doesn't support navigation to a PDF document. See the
   * {@link https://bugs.chromium.org/p/chromium/issues/detail?id=761295 |
   * upstream issue}.
   *
   * Shortcut for {@link Frame.goto | page.mainFrame().goto(url, options)}.
   */
  async goto(url, options = {}) {
    return await __classPrivateFieldGet23(this, _Page_frameManager, "f").mainFrame().goto(url, options);
  }
  /**
   * @param options - Navigation parameters which might have the following
   * properties:
   * @returns Promise which resolves to the main resource response. In case of
   * multiple redirects, the navigation will resolve with the response of the
   * last redirect.
   * @remarks
   * The argument `options` might have the following properties:
   *
   * - `timeout` : Maximum navigation time in milliseconds, defaults to 30
   *   seconds, pass 0 to disable timeout. The default value can be changed by
   *   using the {@link Page.setDefaultNavigationTimeout} or
   *   {@link Page.setDefaultTimeout} methods.
   *
   * - `waitUntil`: When to consider navigation succeeded, defaults to `load`.
   *   Given an array of event strings, navigation is considered to be
   *   successful after all events have been fired. Events can be either:<br/>
   * - `load` : consider navigation to be finished when the load event is
   *   fired.<br/>
   * - `domcontentloaded` : consider navigation to be finished when the
   *   DOMContentLoaded event is fired.<br/>
   * - `networkidle0` : consider navigation to be finished when there are no
   *   more than 0 network connections for at least `500` ms.<br/>
   * - `networkidle2` : consider navigation to be finished when there are no
   *   more than 2 network connections for at least `500` ms.
   */
  async reload(options) {
    const result = await Promise.all([
      this.waitForNavigation(options),
      __classPrivateFieldGet23(this, _Page_client, "f").send("Page.reload")
    ]);
    return result[0];
  }
  /**
   * Waits for the page to navigate to a new URL or to reload. It is useful when
   * you run code that will indirectly cause the page to navigate.
   *
   * @example
   *
   * ```ts
   * const [response] = await Promise.all([
   *   page.waitForNavigation(), // The promise resolves after navigation has finished
   *   page.click('a.my-link'), // Clicking the link will indirectly cause a navigation
   * ]);
   * ```
   *
   * @remarks
   * Usage of the
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/History_API | History API}
   * to change the URL is considered a navigation.
   *
   * @param options - Navigation parameters which might have the following
   * properties:
   * @returns A `Promise` which resolves to the main resource response.
   *
   * - In case of multiple redirects, the navigation will resolve with the
   *   response of the last redirect.
   * - In case of navigation to a different anchor or navigation due to History
   *   API usage, the navigation will resolve with `null`.
   */
  async waitForNavigation(options = {}) {
    return await __classPrivateFieldGet23(this, _Page_frameManager, "f").mainFrame().waitForNavigation(options);
  }
  /**
   * @param urlOrPredicate - A URL or predicate to wait for
   * @param options - Optional waiting parameters
   * @returns Promise which resolves to the matched response
   * @example
   *
   * ```ts
   * const firstResponse = await page.waitForResponse(
   *   'https://example.com/resource'
   * );
   * const finalResponse = await page.waitForResponse(
   *   response =>
   *     response.url() === 'https://example.com' && response.status() === 200
   * );
   * const finalResponse = await page.waitForResponse(async response => {
   *   return (await response.text()).includes('<html>');
   * });
   * return finalResponse.ok();
   * ```
   *
   * @remarks
   * Optional Waiting Parameters have:
   *
   * - `timeout`: Maximum wait time in milliseconds, defaults to `30` seconds, pass
   *   `0` to disable the timeout. The default value can be changed by using the
   *   {@link Page.setDefaultTimeout} method.
   */
  async waitForRequest(urlOrPredicate, options = {}) {
    const { timeout = __classPrivateFieldGet23(this, _Page_timeoutSettings, "f").timeout() } = options;
    return waitForEvent(__classPrivateFieldGet23(this, _Page_frameManager, "f").networkManager, NetworkManagerEmittedEvents.Request, (request) => {
      if (isString(urlOrPredicate)) {
        return urlOrPredicate === request.url();
      }
      if (typeof urlOrPredicate === "function") {
        return !!urlOrPredicate(request);
      }
      return false;
    }, timeout, __classPrivateFieldGet23(this, _Page_instances, "m", _Page_sessionClosePromise).call(this));
  }
  /**
   * @param urlOrPredicate - A URL or predicate to wait for.
   * @param options - Optional waiting parameters
   * @returns Promise which resolves to the matched response.
   * @example
   *
   * ```ts
   * const firstResponse = await page.waitForResponse(
   *   'https://example.com/resource'
   * );
   * const finalResponse = await page.waitForResponse(
   *   response =>
   *     response.url() === 'https://example.com' && response.status() === 200
   * );
   * const finalResponse = await page.waitForResponse(async response => {
   *   return (await response.text()).includes('<html>');
   * });
   * return finalResponse.ok();
   * ```
   *
   * @remarks
   * Optional Parameter have:
   *
   * - `timeout`: Maximum wait time in milliseconds, defaults to `30` seconds,
   *   pass `0` to disable the timeout. The default value can be changed by using
   *   the {@link Page.setDefaultTimeout} method.
   */
  async waitForResponse(urlOrPredicate, options = {}) {
    const { timeout = __classPrivateFieldGet23(this, _Page_timeoutSettings, "f").timeout() } = options;
    return waitForEvent(__classPrivateFieldGet23(this, _Page_frameManager, "f").networkManager, NetworkManagerEmittedEvents.Response, async (response) => {
      if (isString(urlOrPredicate)) {
        return urlOrPredicate === response.url();
      }
      if (typeof urlOrPredicate === "function") {
        return !!await urlOrPredicate(response);
      }
      return false;
    }, timeout, __classPrivateFieldGet23(this, _Page_instances, "m", _Page_sessionClosePromise).call(this));
  }
  /**
   * @param options - Optional waiting parameters
   * @returns Promise which resolves when network is idle
   */
  async waitForNetworkIdle(options = {}) {
    const { idleTime = 500, timeout = __classPrivateFieldGet23(this, _Page_timeoutSettings, "f").timeout() } = options;
    const networkManager = __classPrivateFieldGet23(this, _Page_frameManager, "f").networkManager;
    let idleResolveCallback;
    const idlePromise = new Promise((resolve) => {
      idleResolveCallback = resolve;
    });
    let abortRejectCallback;
    const abortPromise = new Promise((_, reject) => {
      abortRejectCallback = reject;
    });
    let idleTimer;
    const onIdle = () => {
      return idleResolveCallback();
    };
    const cleanup = () => {
      idleTimer && clearTimeout(idleTimer);
      abortRejectCallback(new Error("abort"));
    };
    const evaluate = () => {
      idleTimer && clearTimeout(idleTimer);
      if (networkManager.numRequestsInProgress() === 0) {
        idleTimer = setTimeout(onIdle, idleTime);
      }
    };
    evaluate();
    const eventHandler = () => {
      evaluate();
      return false;
    };
    const listenToEvent = (event) => {
      return waitForEvent(networkManager, event, eventHandler, timeout, abortPromise);
    };
    const eventPromises = [
      listenToEvent(NetworkManagerEmittedEvents.Request),
      listenToEvent(NetworkManagerEmittedEvents.Response)
    ];
    await Promise.race([
      idlePromise,
      ...eventPromises,
      __classPrivateFieldGet23(this, _Page_instances, "m", _Page_sessionClosePromise).call(this)
    ]).then((r) => {
      cleanup();
      return r;
    }, (error) => {
      cleanup();
      throw error;
    });
  }
  /**
   * @param urlOrPredicate - A URL or predicate to wait for.
   * @param options - Optional waiting parameters
   * @returns Promise which resolves to the matched frame.
   * @example
   *
   * ```ts
   * const frame = await page.waitForFrame(async frame => {
   *   return frame.name() === 'Test';
   * });
   * ```
   *
   * @remarks
   * Optional Parameter have:
   *
   * - `timeout`: Maximum wait time in milliseconds, defaults to `30` seconds,
   *   pass `0` to disable the timeout. The default value can be changed by using
   *   the {@link Page.setDefaultTimeout} method.
   */
  async waitForFrame(urlOrPredicate, options = {}) {
    const { timeout = __classPrivateFieldGet23(this, _Page_timeoutSettings, "f").timeout() } = options;
    let predicate;
    if (isString(urlOrPredicate)) {
      predicate = (frame) => {
        return Promise.resolve(urlOrPredicate === frame.url());
      };
    } else {
      predicate = (frame) => {
        const value = urlOrPredicate(frame);
        if (typeof value === "boolean") {
          return Promise.resolve(value);
        }
        return value;
      };
    }
    const eventRace = Promise.race([
      waitForEvent(__classPrivateFieldGet23(this, _Page_frameManager, "f"), FrameManagerEmittedEvents.FrameAttached, predicate, timeout, __classPrivateFieldGet23(this, _Page_instances, "m", _Page_sessionClosePromise).call(this)),
      waitForEvent(__classPrivateFieldGet23(this, _Page_frameManager, "f"), FrameManagerEmittedEvents.FrameNavigated, predicate, timeout, __classPrivateFieldGet23(this, _Page_instances, "m", _Page_sessionClosePromise).call(this)),
      ...this.frames().map(async (frame) => {
        if (await predicate(frame)) {
          return frame;
        }
        return await eventRace;
      })
    ]);
    return eventRace;
  }
  /**
   * This method navigate to the previous page in history.
   * @param options - Navigation parameters
   * @returns Promise which resolves to the main resource response. In case of
   * multiple redirects, the navigation will resolve with the response of the
   * last redirect. If can not go back, resolves to `null`.
   * @remarks
   * The argument `options` might have the following properties:
   *
   * - `timeout` : Maximum navigation time in milliseconds, defaults to 30
   *   seconds, pass 0 to disable timeout. The default value can be changed by
   *   using the {@link Page.setDefaultNavigationTimeout} or
   *   {@link Page.setDefaultTimeout} methods.
   *
   * - `waitUntil` : When to consider navigation succeeded, defaults to `load`.
   *   Given an array of event strings, navigation is considered to be
   *   successful after all events have been fired. Events can be either:<br/>
   * - `load` : consider navigation to be finished when the load event is
   *   fired.<br/>
   * - `domcontentloaded` : consider navigation to be finished when the
   *   DOMContentLoaded event is fired.<br/>
   * - `networkidle0` : consider navigation to be finished when there are no
   *   more than 0 network connections for at least `500` ms.<br/>
   * - `networkidle2` : consider navigation to be finished when there are no
   *   more than 2 network connections for at least `500` ms.
   */
  async goBack(options = {}) {
    return __classPrivateFieldGet23(this, _Page_instances, "m", _Page_go).call(this, -1, options);
  }
  /**
   * This method navigate to the next page in history.
   * @param options - Navigation Parameter
   * @returns Promise which resolves to the main resource response. In case of
   * multiple redirects, the navigation will resolve with the response of the
   * last redirect. If can not go forward, resolves to `null`.
   * @remarks
   * The argument `options` might have the following properties:
   *
   * - `timeout` : Maximum navigation time in milliseconds, defaults to 30
   *   seconds, pass 0 to disable timeout. The default value can be changed by
   *   using the {@link Page.setDefaultNavigationTimeout} or
   *   {@link Page.setDefaultTimeout} methods.
   *
   * - `waitUntil`: When to consider navigation succeeded, defaults to `load`.
   *   Given an array of event strings, navigation is considered to be
   *   successful after all events have been fired. Events can be either:<br/>
   * - `load` : consider navigation to be finished when the load event is
   *   fired.<br/>
   * - `domcontentloaded` : consider navigation to be finished when the
   *   DOMContentLoaded event is fired.<br/>
   * - `networkidle0` : consider navigation to be finished when there are no
   *   more than 0 network connections for at least `500` ms.<br/>
   * - `networkidle2` : consider navigation to be finished when there are no
   *   more than 2 network connections for at least `500` ms.
   */
  async goForward(options = {}) {
    return __classPrivateFieldGet23(this, _Page_instances, "m", _Page_go).call(this, 1, options);
  }
  /**
   * Brings page to front (activates tab).
   */
  async bringToFront() {
    await __classPrivateFieldGet23(this, _Page_client, "f").send("Page.bringToFront");
  }
  /**
   * Emulates given device metrics and user agent.
   *
   * @remarks
   * This method is a shortcut for calling two methods:
   * {@link Page.setUserAgent} and {@link Page.setViewport} To aid emulation,
   * Puppeteer provides a list of device descriptors that can be obtained via
   * {@link devices}. `page.emulate` will resize the page. A lot of websites
   * don't expect phones to change size, so you should emulate before navigating
   * to the page.
   * @example
   *
   * ```ts
   * const puppeteer = require('puppeteer');
   * const iPhone = puppeteer.devices['iPhone 6'];
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   await page.emulate(iPhone);
   *   await page.goto('https://www.google.com');
   *   // other actions...
   *   await browser.close();
   * })();
   * ```
   *
   * @remarks List of all available devices is available in the source code:
   * {@link https://github.com/puppeteer/puppeteer/blob/main/src/common/DeviceDescriptors.ts | src/common/DeviceDescriptors.ts}.
   */
  async emulate(options) {
    await Promise.all([
      this.setViewport(options.viewport),
      this.setUserAgent(options.userAgent)
    ]);
  }
  /**
   * @param enabled - Whether or not to enable JavaScript on the page.
   * @returns
   * @remarks
   * NOTE: changing this value won't affect scripts that have already been run.
   * It will take full effect on the next navigation.
   */
  async setJavaScriptEnabled(enabled) {
    if (__classPrivateFieldGet23(this, _Page_javascriptEnabled, "f") === enabled) {
      return;
    }
    __classPrivateFieldSet21(this, _Page_javascriptEnabled, enabled, "f");
    await __classPrivateFieldGet23(this, _Page_client, "f").send("Emulation.setScriptExecutionDisabled", {
      value: !enabled
    });
  }
  /**
   * Toggles bypassing page's Content-Security-Policy.
   * @param enabled - sets bypassing of page's Content-Security-Policy.
   * @remarks
   * NOTE: CSP bypassing happens at the moment of CSP initialization rather than
   * evaluation. Usually, this means that `page.setBypassCSP` should be called
   * before navigating to the domain.
   */
  async setBypassCSP(enabled) {
    await __classPrivateFieldGet23(this, _Page_client, "f").send("Page.setBypassCSP", { enabled });
  }
  /**
   * @param type - Changes the CSS media type of the page. The only allowed
   * values are `screen`, `print` and `null`. Passing `null` disables CSS media
   * emulation.
   * @example
   *
   * ```ts
   * await page.evaluate(() => matchMedia('screen').matches);
   * // → true
   * await page.evaluate(() => matchMedia('print').matches);
   * // → false
   *
   * await page.emulateMediaType('print');
   * await page.evaluate(() => matchMedia('screen').matches);
   * // → false
   * await page.evaluate(() => matchMedia('print').matches);
   * // → true
   *
   * await page.emulateMediaType(null);
   * await page.evaluate(() => matchMedia('screen').matches);
   * // → true
   * await page.evaluate(() => matchMedia('print').matches);
   * // → false
   * ```
   */
  async emulateMediaType(type) {
    assert(type === "screen" || type === "print" || (type !== null && type !== void 0 ? type : void 0) === void 0, "Unsupported media type: " + type);
    await __classPrivateFieldGet23(this, _Page_client, "f").send("Emulation.setEmulatedMedia", {
      media: type || ""
    });
  }
  /**
   * Enables CPU throttling to emulate slow CPUs.
   * @param factor - slowdown factor (1 is no throttle, 2 is 2x slowdown, etc).
   */
  async emulateCPUThrottling(factor) {
    assert(factor === null || factor >= 1, "Throttling rate should be greater or equal to 1");
    await __classPrivateFieldGet23(this, _Page_client, "f").send("Emulation.setCPUThrottlingRate", {
      rate: factor !== null ? factor : 1
    });
  }
  /**
   * @param features - `<?Array<Object>>` Given an array of media feature
   * objects, emulates CSS media features on the page. Each media feature object
   * must have the following properties:
   * @example
   *
   * ```ts
   * await page.emulateMediaFeatures([
   *   {name: 'prefers-color-scheme', value: 'dark'},
   * ]);
   * await page.evaluate(
   *   () => matchMedia('(prefers-color-scheme: dark)').matches
   * );
   * // → true
   * await page.evaluate(
   *   () => matchMedia('(prefers-color-scheme: light)').matches
   * );
   * // → false
   *
   * await page.emulateMediaFeatures([
   *   {name: 'prefers-reduced-motion', value: 'reduce'},
   * ]);
   * await page.evaluate(
   *   () => matchMedia('(prefers-reduced-motion: reduce)').matches
   * );
   * // → true
   * await page.evaluate(
   *   () => matchMedia('(prefers-reduced-motion: no-preference)').matches
   * );
   * // → false
   *
   * await page.emulateMediaFeatures([
   *   {name: 'prefers-color-scheme', value: 'dark'},
   *   {name: 'prefers-reduced-motion', value: 'reduce'},
   * ]);
   * await page.evaluate(
   *   () => matchMedia('(prefers-color-scheme: dark)').matches
   * );
   * // → true
   * await page.evaluate(
   *   () => matchMedia('(prefers-color-scheme: light)').matches
   * );
   * // → false
   * await page.evaluate(
   *   () => matchMedia('(prefers-reduced-motion: reduce)').matches
   * );
   * // → true
   * await page.evaluate(
   *   () => matchMedia('(prefers-reduced-motion: no-preference)').matches
   * );
   * // → false
   *
   * await page.emulateMediaFeatures([{name: 'color-gamut', value: 'p3'}]);
   * await page.evaluate(() => matchMedia('(color-gamut: srgb)').matches);
   * // → true
   * await page.evaluate(() => matchMedia('(color-gamut: p3)').matches);
   * // → true
   * await page.evaluate(() => matchMedia('(color-gamut: rec2020)').matches);
   * // → false
   * ```
   */
  async emulateMediaFeatures(features) {
    if (!features) {
      await __classPrivateFieldGet23(this, _Page_client, "f").send("Emulation.setEmulatedMedia", {});
    }
    if (Array.isArray(features)) {
      for (const mediaFeature of features) {
        const name = mediaFeature.name;
        assert(/^(?:prefers-(?:color-scheme|reduced-motion)|color-gamut)$/.test(name), "Unsupported media feature: " + name);
      }
      await __classPrivateFieldGet23(this, _Page_client, "f").send("Emulation.setEmulatedMedia", {
        features
      });
    }
  }
  /**
   * @param timezoneId - Changes the timezone of the page. See
   * {@link https://source.chromium.org/chromium/chromium/deps/icu.git/+/faee8bc70570192d82d2978a71e2a615788597d1:source/data/misc/metaZones.txt | ICU’s metaZones.txt}
   * for a list of supported timezone IDs. Passing
   * `null` disables timezone emulation.
   */
  async emulateTimezone(timezoneId) {
    try {
      await __classPrivateFieldGet23(this, _Page_client, "f").send("Emulation.setTimezoneOverride", {
        timezoneId: timezoneId || ""
      });
    } catch (error) {
      if (isErrorLike(error) && error.message.includes("Invalid timezone")) {
        throw new Error(`Invalid timezone ID: ${timezoneId}`);
      }
      throw error;
    }
  }
  /**
   * Emulates the idle state.
   * If no arguments set, clears idle state emulation.
   *
   * @example
   *
   * ```ts
   * // set idle emulation
   * await page.emulateIdleState({isUserActive: true, isScreenUnlocked: false});
   *
   * // do some checks here
   * ...
   *
   * // clear idle emulation
   * await page.emulateIdleState();
   * ```
   *
   * @param overrides - Mock idle state. If not set, clears idle overrides
   */
  async emulateIdleState(overrides) {
    if (overrides) {
      await __classPrivateFieldGet23(this, _Page_client, "f").send("Emulation.setIdleOverride", {
        isUserActive: overrides.isUserActive,
        isScreenUnlocked: overrides.isScreenUnlocked
      });
    } else {
      await __classPrivateFieldGet23(this, _Page_client, "f").send("Emulation.clearIdleOverride");
    }
  }
  /**
   * Simulates the given vision deficiency on the page.
   *
   * @example
   *
   * ```ts
   * const puppeteer = require('puppeteer');
   *
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   await page.goto('https://v8.dev/blog/10-years');
   *
   *   await page.emulateVisionDeficiency('achromatopsia');
   *   await page.screenshot({path: 'achromatopsia.png'});
   *
   *   await page.emulateVisionDeficiency('deuteranopia');
   *   await page.screenshot({path: 'deuteranopia.png'});
   *
   *   await page.emulateVisionDeficiency('blurredVision');
   *   await page.screenshot({path: 'blurred-vision.png'});
   *
   *   await browser.close();
   * })();
   * ```
   *
   * @param type - the type of deficiency to simulate, or `'none'` to reset.
   */
  async emulateVisionDeficiency(type) {
    const visionDeficiencies = /* @__PURE__ */ new Set([
      "none",
      "achromatopsia",
      "blurredVision",
      "deuteranopia",
      "protanopia",
      "tritanopia"
    ]);
    try {
      assert(!type || visionDeficiencies.has(type), `Unsupported vision deficiency: ${type}`);
      await __classPrivateFieldGet23(this, _Page_client, "f").send("Emulation.setEmulatedVisionDeficiency", {
        type: type || "none"
      });
    } catch (error) {
      throw error;
    }
  }
  /**
   * `page.setViewport` will resize the page. A lot of websites don't expect
   * phones to change size, so you should set the viewport before navigating to
   * the page.
   *
   * In the case of multiple pages in a single browser, each page can have its
   * own viewport size.
   * @example
   *
   * ```ts
   * const page = await browser.newPage();
   * await page.setViewport({
   *   width: 640,
   *   height: 480,
   *   deviceScaleFactor: 1,
   * });
   * await page.goto('https://example.com');
   * ```
   *
   * @param viewport -
   * @remarks
   * Argument viewport have following properties:
   *
   * - `width`: page width in pixels. required
   *
   * - `height`: page height in pixels. required
   *
   * - `deviceScaleFactor`: Specify device scale factor (can be thought of as
   *   DPR). Defaults to `1`.
   *
   * - `isMobile`: Whether the meta viewport tag is taken into account. Defaults
   *   to `false`.
   *
   * - `hasTouch`: Specifies if viewport supports touch events. Defaults to `false`
   *
   * - `isLandScape`: Specifies if viewport is in landscape mode. Defaults to false.
   *
   * NOTE: in certain cases, setting viewport will reload the page in order to
   * set the isMobile or hasTouch properties.
   */
  async setViewport(viewport) {
    const needsReload = await __classPrivateFieldGet23(this, _Page_emulationManager, "f").emulateViewport(viewport);
    __classPrivateFieldSet21(this, _Page_viewport, viewport, "f");
    if (needsReload) {
      await this.reload();
    }
  }
  /**
   * @returns
   *
   * - `width`: page's width in pixels
   *
   * - `height`: page's height in pixels
   *
   * - `deviceScalarFactor`: Specify device scale factor (can be though of as
   *   dpr). Defaults to `1`.
   *
   * - `isMobile`: Whether the meta viewport tag is taken into account. Defaults
   *   to `false`.
   *
   * - `hasTouch`: Specifies if viewport supports touch events. Defaults to
   *   `false`.
   *
   * - `isLandScape`: Specifies if viewport is in landscape mode. Defaults to
   *   `false`.
   */
  viewport() {
    return __classPrivateFieldGet23(this, _Page_viewport, "f");
  }
  /**
   * Evaluates a function in the page's context and returns the result.
   *
   * If the function passed to `page.evaluteHandle` returns a Promise, the
   * function will wait for the promise to resolve and return its value.
   *
   * @example
   *
   * ```ts
   * const result = await frame.evaluate(() => {
   *   return Promise.resolve(8 * 7);
   * });
   * console.log(result); // prints "56"
   * ```
   *
   * You can pass a string instead of a function (although functions are
   * recommended as they are easier to debug and use with TypeScript):
   *
   * @example
   *
   * ```ts
   * const aHandle = await page.evaluate('1 + 2');
   * ```
   *
   * To get the best TypeScript experience, you should pass in as the
   * generic the type of `pageFunction`:
   *
   * ```ts
   * const aHandle = await page.evaluate(() => 2);
   * ```
   *
   * @example
   *
   * {@link ElementHandle} instances (including {@link JSHandle}s) can be passed
   * as arguments to the `pageFunction`:
   *
   * ```ts
   * const bodyHandle = await page.$('body');
   * const html = await page.evaluate(body => body.innerHTML, bodyHandle);
   * await bodyHandle.dispose();
   * ```
   *
   * @param pageFunction - a function that is run within the page
   * @param args - arguments to be passed to the pageFunction
   *
   * @returns the return value of `pageFunction`.
   */
  async evaluate(pageFunction, ...args) {
    return __classPrivateFieldGet23(this, _Page_frameManager, "f").mainFrame().evaluate(pageFunction, ...args);
  }
  /**
   * Adds a function which would be invoked in one of the following scenarios:
   *
   * - whenever the page is navigated
   *
   * - whenever the child frame is attached or navigated. In this case, the
   *   function is invoked in the context of the newly attached frame.
   *
   * The function is invoked after the document was created but before any of
   * its scripts were run. This is useful to amend the JavaScript environment,
   * e.g. to seed `Math.random`.
   * @param pageFunction - Function to be evaluated in browser context
   * @param args - Arguments to pass to `pageFunction`
   * @example
   * An example of overriding the navigator.languages property before the page loads:
   *
   * ```ts
   * // preload.js
   *
   * // overwrite the `languages` property to use a custom getter
   * Object.defineProperty(navigator, 'languages', {
   * get: function () {
   * return ['en-US', 'en', 'bn'];
   * },
   * });
   *
   * // In your puppeteer script, assuming the preload.js file is
   * in same folder of our script
   * const preloadFile = fs.readFileSync('./preload.js', 'utf8');
   * await page.evaluateOnNewDocument(preloadFile);
   * ```
   */
  async evaluateOnNewDocument(pageFunction, ...args) {
    const source = evaluationString(pageFunction, ...args);
    await __classPrivateFieldGet23(this, _Page_client, "f").send("Page.addScriptToEvaluateOnNewDocument", {
      source
    });
  }
  /**
   * Toggles ignoring cache for each request based on the enabled state. By
   * default, caching is enabled.
   * @param enabled - sets the `enabled` state of cache
   */
  async setCacheEnabled(enabled = true) {
    await __classPrivateFieldGet23(this, _Page_frameManager, "f").networkManager.setCacheEnabled(enabled);
  }
  /**
   * @remarks
   * Options object which might have the following properties:
   *
   * - `path` : The file path to save the image to. The screenshot type
   *   will be inferred from file extension. If `path` is a relative path, then
   *   it is resolved relative to
   *   {@link https://nodejs.org/api/process.html#process_process_cwd
   *   | current working directory}.
   *   If no path is provided, the image won't be saved to the disk.
   *
   * - `type` : Specify screenshot type, can be either `jpeg` or `png`.
   *   Defaults to 'png'.
   *
   * - `quality` : The quality of the image, between 0-100. Not
   *   applicable to `png` images.
   *
   * - `fullPage` : When true, takes a screenshot of the full
   *   scrollable page. Defaults to `false`.
   *
   * - `clip` : An object which specifies clipping region of the page.
   *   Should have the following fields:<br/>
   * - `x` : x-coordinate of top-left corner of clip area.<br/>
   * - `y` : y-coordinate of top-left corner of clip area.<br/>
   * - `width` : width of clipping area.<br/>
   * - `height` : height of clipping area.
   *
   * - `omitBackground` : Hides default white background and allows
   *   capturing screenshots with transparency. Defaults to `false`.
   *
   * - `encoding` : The encoding of the image, can be either base64 or
   *   binary. Defaults to `binary`.
   *
   * - `captureBeyondViewport` : When true, captures screenshot
   *   {@link https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-captureScreenshot
   *   | beyond the viewport}. When false, falls back to old behaviour,
   *   and cuts the screenshot by the viewport size. Defaults to `true`.
   *
   * - `fromSurface` : When true, captures screenshot
   *   {@link https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-captureScreenshot
   *   | from the surface rather than the view}. When false, works only in
   *   headful mode and ignores page viewport (but not browser window's
   *   bounds). Defaults to `true`.
   *
   * NOTE: Screenshots take at least 1/6 second on OS X. See
   * {@link https://crbug.com/741689} for discussion.
   * @returns Promise which resolves to buffer or a base64 string (depending on
   * the value of `encoding`) with captured screenshot.
   */
  async screenshot(options = {}) {
    let screenshotType = "png";
    if (options.type) {
      screenshotType = options.type;
    } else if (options.path) {
      const filePath = options.path;
      const extension = filePath.slice(filePath.lastIndexOf(".") + 1).toLowerCase();
      switch (extension) {
        case "png":
          screenshotType = "png";
          break;
        case "jpeg":
        case "jpg":
          screenshotType = "jpeg";
          break;
        case "webp":
          screenshotType = "webp";
          break;
        default:
          throw new Error(`Unsupported screenshot type for extension \`.${extension}\``);
      }
    }
    if (options.quality) {
      assert(screenshotType === "jpeg" || screenshotType === "webp", "options.quality is unsupported for the " + screenshotType + " screenshots");
      assert(typeof options.quality === "number", "Expected options.quality to be a number but found " + typeof options.quality);
      assert(Number.isInteger(options.quality), "Expected options.quality to be an integer");
      assert(options.quality >= 0 && options.quality <= 100, "Expected options.quality to be between 0 and 100 (inclusive), got " + options.quality);
    }
    assert(!options.clip || !options.fullPage, "options.clip and options.fullPage are exclusive");
    if (options.clip) {
      assert(typeof options.clip.x === "number", "Expected options.clip.x to be a number but found " + typeof options.clip.x);
      assert(typeof options.clip.y === "number", "Expected options.clip.y to be a number but found " + typeof options.clip.y);
      assert(typeof options.clip.width === "number", "Expected options.clip.width to be a number but found " + typeof options.clip.width);
      assert(typeof options.clip.height === "number", "Expected options.clip.height to be a number but found " + typeof options.clip.height);
      assert(options.clip.width !== 0, "Expected options.clip.width not to be 0.");
      assert(options.clip.height !== 0, "Expected options.clip.height not to be 0.");
    }
    return __classPrivateFieldGet23(this, _Page_screenshotTaskQueue, "f").postTask(() => {
      return __classPrivateFieldGet23(this, _Page_instances, "m", _Page_screenshotTask).call(this, screenshotType, options);
    });
  }
  /**
   * Generates a PDF of the page with the `print` CSS media type.
   * @remarks
   *
   * NOTE: PDF generation is only supported in Chrome headless mode.
   *
   * To generate a PDF with the `screen` media type, call
   * {@link Page.emulateMediaType | `page.emulateMediaType('screen')`} before
   * calling `page.pdf()`.
   *
   * By default, `page.pdf()` generates a pdf with modified colors for printing.
   * Use the
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-print-color-adjust | `-webkit-print-color-adjust`}
   * property to force rendering of exact colors.
   *
   * @param options - options for generating the PDF.
   */
  async createPDFStream(options = {}) {
    const { scale = 1, displayHeaderFooter = false, headerTemplate = "", footerTemplate = "", printBackground = false, landscape = false, pageRanges = "", preferCSSPageSize = false, margin = {}, omitBackground = false, timeout = 3e4 } = options;
    let paperWidth = 8.5;
    let paperHeight = 11;
    if (options.format) {
      const format = _paperFormats[options.format.toLowerCase()];
      assert(format, "Unknown paper format: " + options.format);
      paperWidth = format.width;
      paperHeight = format.height;
    } else {
      paperWidth = convertPrintParameterToInches(options.width) || paperWidth;
      paperHeight = convertPrintParameterToInches(options.height) || paperHeight;
    }
    const marginTop = convertPrintParameterToInches(margin.top) || 0;
    const marginLeft = convertPrintParameterToInches(margin.left) || 0;
    const marginBottom = convertPrintParameterToInches(margin.bottom) || 0;
    const marginRight = convertPrintParameterToInches(margin.right) || 0;
    if (omitBackground) {
      await __classPrivateFieldGet23(this, _Page_instances, "m", _Page_setTransparentBackgroundColor).call(this);
    }
    const printCommandPromise = __classPrivateFieldGet23(this, _Page_client, "f").send("Page.printToPDF", {
      transferMode: "ReturnAsStream",
      landscape,
      displayHeaderFooter,
      headerTemplate,
      footerTemplate,
      printBackground,
      scale,
      paperWidth,
      paperHeight,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      pageRanges,
      preferCSSPageSize
    });
    const result = await waitWithTimeout(printCommandPromise, "Page.printToPDF", timeout);
    if (omitBackground) {
      await __classPrivateFieldGet23(this, _Page_instances, "m", _Page_resetDefaultBackgroundColor).call(this);
    }
    assert(result.stream, "`stream` is missing from `Page.printToPDF");
    return getReadableFromProtocolStream(__classPrivateFieldGet23(this, _Page_client, "f"), result.stream);
  }
  /**
   * @param options -
   * @returns
   */
  async pdf(options = {}) {
    const { path = void 0 } = options;
    const readable = await this.createPDFStream(options);
    const buffer = await getReadableAsBuffer(readable, path);
    assert(buffer, "Could not create buffer");
    return buffer;
  }
  /**
   * @returns The page's title
   * @remarks
   * Shortcut for {@link Frame.title | page.mainFrame().title()}.
   */
  async title() {
    return this.mainFrame().title();
  }
  async close(options = { runBeforeUnload: void 0 }) {
    const connection = __classPrivateFieldGet23(this, _Page_client, "f").connection();
    assert(connection, "Protocol error: Connection closed. Most likely the page has been closed.");
    const runBeforeUnload = !!options.runBeforeUnload;
    if (runBeforeUnload) {
      await __classPrivateFieldGet23(this, _Page_client, "f").send("Page.close");
    } else {
      await connection.send("Target.closeTarget", {
        targetId: __classPrivateFieldGet23(this, _Page_target, "f")._targetId
      });
      await __classPrivateFieldGet23(this, _Page_target, "f")._isClosedPromise;
    }
  }
  /**
   * Indicates that the page has been closed.
   * @returns
   */
  isClosed() {
    return __classPrivateFieldGet23(this, _Page_closed, "f");
  }
  get mouse() {
    return __classPrivateFieldGet23(this, _Page_mouse, "f");
  }
  /**
   * This method fetches an element with `selector`, scrolls it into view if
   * needed, and then uses {@link Page.mouse} to click in the center of the
   * element. If there's no element matching `selector`, the method throws an
   * error.
   * @remarks Bear in mind that if `click()` triggers a navigation event and
   * there's a separate `page.waitForNavigation()` promise to be resolved, you
   * may end up with a race condition that yields unexpected results. The
   * correct pattern for click and wait for navigation is the following:
   *
   * ```ts
   * const [response] = await Promise.all([
   *   page.waitForNavigation(waitOptions),
   *   page.click(selector, clickOptions),
   * ]);
   * ```
   *
   * Shortcut for {@link Frame.click | page.mainFrame().click(selector[, options]) }.
   * @param selector - A `selector` to search for element to click. If there are
   * multiple elements satisfying the `selector`, the first will be clicked
   * @param options - `Object`
   * @returns Promise which resolves when the element matching `selector` is
   * successfully clicked. The Promise will be rejected if there is no element
   * matching `selector`.
   */
  click(selector, options = {}) {
    return this.mainFrame().click(selector, options);
  }
  /**
   * This method fetches an element with `selector` and focuses it. If there's no
   * element matching `selector`, the method throws an error.
   * @param selector - A
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector }
   * of an element to focus. If there are multiple elements satisfying the
   * selector, the first will be focused.
   * @returns Promise which resolves when the element matching selector is
   * successfully focused. The promise will be rejected if there is no element
   * matching selector.
   * @remarks
   * Shortcut for {@link Frame.focus | page.mainFrame().focus(selector)}.
   */
  focus(selector) {
    return this.mainFrame().focus(selector);
  }
  /**
   * This method fetches an element with `selector`, scrolls it into view if
   * needed, and then uses {@link Page.mouse} to hover over the center of the element.
   * If there's no element matching `selector`, the method throws an error.
   * @param selector - A
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
   * to search for element to hover. If there are multiple elements satisfying
   * the selector, the first will be hovered.
   * @returns Promise which resolves when the element matching `selector` is
   * successfully hovered. Promise gets rejected if there's no element matching
   * `selector`.
   * @remarks
   * Shortcut for {@link Page.hover | page.mainFrame().hover(selector)}.
   */
  hover(selector) {
    return this.mainFrame().hover(selector);
  }
  /**
   * Triggers a `change` and `input` event once all the provided options have been
   * selected. If there's no `<select>` element matching `selector`, the method
   * throws an error.
   *
   * @example
   *
   * ```ts
   * page.select('select#colors', 'blue'); // single selection
   * page.select('select#colors', 'red', 'green', 'blue'); // multiple selections
   * ```
   *
   * @param selector - A
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | Selector}
   * to query the page for
   * @param values - Values of options to select. If the `<select>` has the
   * `multiple` attribute, all values are considered, otherwise only the first one
   * is taken into account.
   * @returns
   *
   * @remarks
   * Shortcut for {@link Frame.select | page.mainFrame().select()}
   */
  select(selector, ...values) {
    return this.mainFrame().select(selector, ...values);
  }
  /**
   * This method fetches an element with `selector`, scrolls it into view if
   * needed, and then uses {@link Page.touchscreen} to tap in the center of the element.
   * If there's no element matching `selector`, the method throws an error.
   * @param selector - A
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | Selector}
   * to search for element to tap. If there are multiple elements satisfying the
   * selector, the first will be tapped.
   * @returns
   * @remarks
   * Shortcut for {@link Frame.tap | page.mainFrame().tap(selector)}.
   */
  tap(selector) {
    return this.mainFrame().tap(selector);
  }
  /**
   * Sends a `keydown`, `keypress/input`, and `keyup` event for each character
   * in the text.
   *
   * To press a special key, like `Control` or `ArrowDown`, use {@link Keyboard.press}.
   * @example
   *
   * ```ts
   * await page.type('#mytextarea', 'Hello');
   * // Types instantly
   * await page.type('#mytextarea', 'World', {delay: 100});
   * // Types slower, like a user
   * ```
   *
   * @param selector - A
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
   * of an element to type into. If there are multiple elements satisfying the
   * selector, the first will be used.
   * @param text - A text to type into a focused element.
   * @param options - have property `delay` which is the Time to wait between
   * key presses in milliseconds. Defaults to `0`.
   * @returns
   * @remarks
   */
  type(selector, text, options) {
    return this.mainFrame().type(selector, text, options);
  }
  /**
   * @deprecated Use `new Promise(r => setTimeout(r, milliseconds));`.
   *
   * Causes your script to wait for the given number of milliseconds.
   *
   * @remarks
   * It's generally recommended to not wait for a number of seconds, but instead
   * use {@link Frame.waitForSelector}, {@link Frame.waitForXPath} or
   * {@link Frame.waitForFunction} to wait for exactly the conditions you want.
   *
   * @example
   *
   * Wait for 1 second:
   *
   * ```ts
   * await page.waitForTimeout(1000);
   * ```
   *
   * @param milliseconds - the number of milliseconds to wait.
   */
  waitForTimeout(milliseconds) {
    return this.mainFrame().waitForTimeout(milliseconds);
  }
  /**
   * Wait for the `selector` to appear in page. If at the moment of calling the
   * method the `selector` already exists, the method will return immediately. If
   * the `selector` doesn't appear after the `timeout` milliseconds of waiting, the
   * function will throw.
   *
   * This method works across navigations:
   *
   * ```ts
   * const puppeteer = require('puppeteer');
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   let currentURL;
   *   page
   *     .waitForSelector('img')
   *     .then(() => console.log('First URL with image: ' + currentURL));
   *   for (currentURL of [
   *     'https://example.com',
   *     'https://google.com',
   *     'https://bbc.com',
   *   ]) {
   *     await page.goto(currentURL);
   *   }
   *   await browser.close();
   * })();
   * ```
   *
   * @param selector - A
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
   * of an element to wait for
   * @param options - Optional waiting parameters
   * @returns Promise which resolves when element specified by selector string
   * is added to DOM. Resolves to `null` if waiting for hidden: `true` and
   * selector is not found in DOM.
   * @remarks
   * The optional Parameter in Arguments `options` are :
   *
   * - `Visible`: A boolean wait for element to be present in DOM and to be
   *   visible, i.e. to not have `display: none` or `visibility: hidden` CSS
   *   properties. Defaults to `false`.
   *
   * - `hidden`: Wait for element to not be found in the DOM or to be hidden,
   *   i.e. have `display: none` or `visibility: hidden` CSS properties. Defaults to
   *   `false`.
   *
   * - `timeout`: maximum time to wait for in milliseconds. Defaults to `30000`
   *   (30 seconds). Pass `0` to disable timeout. The default value can be changed
   *   by using the {@link Page.setDefaultTimeout} method.
   */
  async waitForSelector(selector, options = {}) {
    return await this.mainFrame().waitForSelector(selector, options);
  }
  /**
   * Wait for the `xpath` to appear in page. If at the moment of calling the
   * method the `xpath` already exists, the method will return immediately. If
   * the `xpath` doesn't appear after the `timeout` milliseconds of waiting, the
   * function will throw.
   *
   * This method works across navigation
   *
   * ```ts
   * const puppeteer = require('puppeteer');
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   let currentURL;
   *   page
   *     .waitForXPath('//img')
   *     .then(() => console.log('First URL with image: ' + currentURL));
   *   for (currentURL of [
   *     'https://example.com',
   *     'https://google.com',
   *     'https://bbc.com',
   *   ]) {
   *     await page.goto(currentURL);
   *   }
   *   await browser.close();
   * })();
   * ```
   *
   * @param xpath - A
   * {@link https://developer.mozilla.org/en-US/docs/Web/XPath | xpath} of an
   * element to wait for
   * @param options - Optional waiting parameters
   * @returns Promise which resolves when element specified by xpath string is
   * added to DOM. Resolves to `null` if waiting for `hidden: true` and xpath is
   * not found in DOM.
   * @remarks
   * The optional Argument `options` have properties:
   *
   * - `visible`: A boolean to wait for element to be present in DOM and to be
   *   visible, i.e. to not have `display: none` or `visibility: hidden` CSS
   *   properties. Defaults to `false`.
   *
   * - `hidden`: A boolean wait for element to not be found in the DOM or to be
   *   hidden, i.e. have `display: none` or `visibility: hidden` CSS properties.
   *   Defaults to `false`.
   *
   * - `timeout`: A number which is maximum time to wait for in milliseconds.
   *   Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default
   *   value can be changed by using the {@link Page.setDefaultTimeout} method.
   */
  waitForXPath(xpath, options = {}) {
    return this.mainFrame().waitForXPath(xpath, options);
  }
  /**
   * Waits for a function to finish evaluating in the page's context.
   *
   * @example
   * The {@link Page.waitForFunction} can be used to observe viewport size change:
   *
   * ```ts
   * const puppeteer = require('puppeteer');
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   const watchDog = page.waitForFunction('window.innerWidth < 100');
   *   await page.setViewport({width: 50, height: 50});
   *   await watchDog;
   *   await browser.close();
   * })();
   * ```
   *
   * @example
   * To pass arguments from node.js to the predicate of
   * {@link Page.waitForFunction} function:
   *
   * ```ts
   * const selector = '.foo';
   * await page.waitForFunction(
   *   selector => !!document.querySelector(selector),
   *   {},
   *   selector
   * );
   * ```
   *
   * @example
   * The predicate of {@link Page.waitForFunction} can be asynchronous too:
   *
   * ```ts
   * const username = 'github-username';
   * await page.waitForFunction(
   *   async username => {
   *     const githubResponse = await fetch(
   *       `https://api.github.com/users/${username}`
   *     );
   *     const githubUser = await githubResponse.json();
   *     // show the avatar
   *     const img = document.createElement('img');
   *     img.src = githubUser.avatar_url;
   *     // wait 3 seconds
   *     await new Promise((resolve, reject) => setTimeout(resolve, 3000));
   *     img.remove();
   *   },
   *   {},
   *   username
   * );
   * ```
   *
   * @param pageFunction - Function to be evaluated in browser context
   * @param options - Optional waiting parameters
   *
   * - `polling` - An interval at which the `pageFunction` is executed, defaults
   *   to `raf`. If `polling` is a number, then it is treated as an interval in
   *   milliseconds at which the function would be executed. If polling is a
   *   string, then it can be one of the following values:
   *   - `raf` - to constantly execute `pageFunction` in
   *     `requestAnimationFrame` callback. This is the tightest polling mode
   *     which is suitable to observe styling changes.
   *   - `mutation`- to execute pageFunction on every DOM mutation.
   * - `timeout` - maximum time to wait for in milliseconds. Defaults to `30000`
   *   (30 seconds). Pass `0` to disable timeout. The default value can be
   *   changed by using the {@link Page.setDefaultTimeout} method.
   *   @param args - Arguments to pass to `pageFunction`
   *   @returns A `Promise` which resolves to a JSHandle/ElementHandle of the the
   *   `pageFunction`'s return value.
   */
  waitForFunction(pageFunction, options = {}, ...args) {
    return this.mainFrame().waitForFunction(pageFunction, options, ...args);
  }
};
_Page_closed = /* @__PURE__ */ new WeakMap(), _Page_client = /* @__PURE__ */ new WeakMap(), _Page_target = /* @__PURE__ */ new WeakMap(), _Page_keyboard = /* @__PURE__ */ new WeakMap(), _Page_mouse = /* @__PURE__ */ new WeakMap(), _Page_timeoutSettings = /* @__PURE__ */ new WeakMap(), _Page_touchscreen = /* @__PURE__ */ new WeakMap(), _Page_accessibility = /* @__PURE__ */ new WeakMap(), _Page_frameManager = /* @__PURE__ */ new WeakMap(), _Page_emulationManager = /* @__PURE__ */ new WeakMap(), _Page_pageBindings = /* @__PURE__ */ new WeakMap(), _Page_coverage = /* @__PURE__ */ new WeakMap(), _Page_javascriptEnabled = /* @__PURE__ */ new WeakMap(), _Page_viewport = /* @__PURE__ */ new WeakMap(), _Page_screenshotTaskQueue = /* @__PURE__ */ new WeakMap(), _Page_workers = /* @__PURE__ */ new WeakMap(), _Page_fileChooserPromises = /* @__PURE__ */ new WeakMap(), _Page_disconnectPromise = /* @__PURE__ */ new WeakMap(), _Page_userDragInterceptionEnabled = /* @__PURE__ */ new WeakMap(), _Page_handlerMap = /* @__PURE__ */ new WeakMap(), _Page_onDetachedFromTarget = /* @__PURE__ */ new WeakMap(), _Page_onAttachedToTarget = /* @__PURE__ */ new WeakMap(), _Page_instances = /* @__PURE__ */ new WeakSet(), _Page_initialize = async function _Page_initialize2() {
  await Promise.all([
    __classPrivateFieldGet23(this, _Page_frameManager, "f").initialize(__classPrivateFieldGet23(this, _Page_target, "f")._targetId),
    __classPrivateFieldGet23(this, _Page_client, "f").send("Performance.enable"),
    __classPrivateFieldGet23(this, _Page_client, "f").send("Log.enable")
  ]);
}, _Page_onFileChooser = async function _Page_onFileChooser2(event) {
  if (!__classPrivateFieldGet23(this, _Page_fileChooserPromises, "f").size) {
    return;
  }
  const frame = __classPrivateFieldGet23(this, _Page_frameManager, "f").frame(event.frameId);
  assert(frame, "This should never happen.");
  const handle = await frame.worlds[MAIN_WORLD].adoptBackendNode(event.backendNodeId);
  const fileChooser = new FileChooser(handle, event);
  for (const promise of __classPrivateFieldGet23(this, _Page_fileChooserPromises, "f")) {
    promise.resolve(fileChooser);
  }
  __classPrivateFieldGet23(this, _Page_fileChooserPromises, "f").clear();
}, _Page_onTargetCrashed = function _Page_onTargetCrashed2() {
  this.emit("error", new Error("Page crashed!"));
}, _Page_onLogEntryAdded = function _Page_onLogEntryAdded2(event) {
  const { level, text, args, source, url, lineNumber } = event.entry;
  if (args) {
    args.map((arg) => {
      return releaseObject(__classPrivateFieldGet23(this, _Page_client, "f"), arg);
    });
  }
  if (source !== "worker") {
    this.emit("console", new ConsoleMessage(level, text, [], [{ url, lineNumber }]));
  }
}, _Page_emitMetrics = function _Page_emitMetrics2(event) {
  this.emit("metrics", {
    title: event.title,
    metrics: __classPrivateFieldGet23(this, _Page_instances, "m", _Page_buildMetricsObject).call(this, event.metrics)
  });
}, _Page_buildMetricsObject = function _Page_buildMetricsObject2(metrics) {
  const result = {};
  for (const metric of metrics || []) {
    if (supportedMetrics.has(metric.name)) {
      result[metric.name] = metric.value;
    }
  }
  return result;
}, _Page_handleException = function _Page_handleException2(exceptionDetails) {
  const message = getExceptionMessage(exceptionDetails);
  const err = new Error(message);
  err.stack = "";
  this.emit("pageerror", err);
}, _Page_onConsoleAPI = async function _Page_onConsoleAPI2(event) {
  if (event.executionContextId === 0) {
    return;
  }
  const context = __classPrivateFieldGet23(this, _Page_frameManager, "f").executionContextById(event.executionContextId, __classPrivateFieldGet23(this, _Page_client, "f"));
  const values = event.args.map((arg) => {
    return createJSHandle(context, arg);
  });
  __classPrivateFieldGet23(this, _Page_instances, "m", _Page_addConsoleMessage).call(this, event.type, values, event.stackTrace);
}, _Page_onBindingCalled = async function _Page_onBindingCalled2(event) {
  let payload;
  try {
    payload = JSON.parse(event.payload);
  } catch {
    return;
  }
  const { type, name, seq, args } = payload;
  if (type !== "exposedFun" || !__classPrivateFieldGet23(this, _Page_pageBindings, "f").has(name)) {
    return;
  }
  let expression = null;
  try {
    const pageBinding = __classPrivateFieldGet23(this, _Page_pageBindings, "f").get(name);
    assert(pageBinding);
    const result = await pageBinding(...args);
    expression = pageBindingDeliverResultString(name, seq, result);
  } catch (error) {
    if (isErrorLike(error)) {
      expression = pageBindingDeliverErrorString(name, seq, error.message, error.stack);
    } else {
      expression = pageBindingDeliverErrorValueString(name, seq, error);
    }
  }
  __classPrivateFieldGet23(this, _Page_client, "f").send("Runtime.evaluate", {
    expression,
    contextId: event.executionContextId
  }).catch(debugError);
}, _Page_addConsoleMessage = function _Page_addConsoleMessage2(eventType, args, stackTrace) {
  if (!this.listenerCount(
    "console"
    /* PageEmittedEvents.Console */
  )) {
    args.forEach((arg) => {
      return arg.dispose();
    });
    return;
  }
  const textTokens = [];
  for (const arg of args) {
    const remoteObject = arg.remoteObject();
    if (remoteObject.objectId) {
      textTokens.push(arg.toString());
    } else {
      textTokens.push(valueFromRemoteObject(remoteObject));
    }
  }
  const stackTraceLocations = [];
  if (stackTrace) {
    for (const callFrame of stackTrace.callFrames) {
      stackTraceLocations.push({
        url: callFrame.url,
        lineNumber: callFrame.lineNumber,
        columnNumber: callFrame.columnNumber
      });
    }
  }
  const message = new ConsoleMessage(eventType, textTokens.join(" "), args, stackTraceLocations);
  this.emit("console", message);
}, _Page_onDialog = function _Page_onDialog2(event) {
  let dialogType = null;
  const validDialogTypes = /* @__PURE__ */ new Set([
    "alert",
    "confirm",
    "prompt",
    "beforeunload"
  ]);
  if (validDialogTypes.has(event.type)) {
    dialogType = event.type;
  }
  assert(dialogType, "Unknown javascript dialog type: " + event.type);
  const dialog = new Dialog(__classPrivateFieldGet23(this, _Page_client, "f"), dialogType, event.message, event.defaultPrompt);
  this.emit("dialog", dialog);
}, _Page_resetDefaultBackgroundColor = /**
 * Resets default white background
 */
async function _Page_resetDefaultBackgroundColor2() {
  await __classPrivateFieldGet23(this, _Page_client, "f").send("Emulation.setDefaultBackgroundColorOverride");
}, _Page_setTransparentBackgroundColor = /**
 * Hides default white background
 */
async function _Page_setTransparentBackgroundColor2() {
  await __classPrivateFieldGet23(this, _Page_client, "f").send("Emulation.setDefaultBackgroundColorOverride", {
    color: { r: 0, g: 0, b: 0, a: 0 }
  });
}, _Page_sessionClosePromise = function _Page_sessionClosePromise2() {
  if (!__classPrivateFieldGet23(this, _Page_disconnectPromise, "f")) {
    __classPrivateFieldSet21(this, _Page_disconnectPromise, new Promise((fulfill) => {
      return __classPrivateFieldGet23(this, _Page_client, "f").once(CDPSessionEmittedEvents.Disconnected, () => {
        return fulfill(new Error("Target closed"));
      });
    }), "f");
  }
  return __classPrivateFieldGet23(this, _Page_disconnectPromise, "f");
}, _Page_go = async function _Page_go2(delta, options) {
  const history2 = await __classPrivateFieldGet23(this, _Page_client, "f").send("Page.getNavigationHistory");
  const entry = history2.entries[history2.currentIndex + delta];
  if (!entry) {
    return null;
  }
  const result = await Promise.all([
    this.waitForNavigation(options),
    __classPrivateFieldGet23(this, _Page_client, "f").send("Page.navigateToHistoryEntry", { entryId: entry.id })
  ]);
  return result[0];
}, _Page_screenshotTask = async function _Page_screenshotTask2(format, options = {}) {
  await __classPrivateFieldGet23(this, _Page_client, "f").send("Target.activateTarget", {
    targetId: __classPrivateFieldGet23(this, _Page_target, "f")._targetId
  });
  let clip = options.clip ? processClip(options.clip) : void 0;
  const captureBeyondViewport = typeof options.captureBeyondViewport === "boolean" ? options.captureBeyondViewport : true;
  const fromSurface = typeof options.fromSurface === "boolean" ? options.fromSurface : void 0;
  if (options.fullPage) {
    const metrics = await __classPrivateFieldGet23(this, _Page_client, "f").send("Page.getLayoutMetrics");
    const { width, height } = metrics.cssContentSize || metrics.contentSize;
    clip = { x: 0, y: 0, width, height, scale: 1 };
    if (!captureBeyondViewport) {
      const { isMobile = false, deviceScaleFactor = 1, isLandscape = false } = __classPrivateFieldGet23(this, _Page_viewport, "f") || {};
      const screenOrientation = isLandscape ? { angle: 90, type: "landscapePrimary" } : { angle: 0, type: "portraitPrimary" };
      await __classPrivateFieldGet23(this, _Page_client, "f").send("Emulation.setDeviceMetricsOverride", {
        mobile: isMobile,
        width,
        height,
        deviceScaleFactor,
        screenOrientation
      });
    }
  }
  const shouldSetDefaultBackground = options.omitBackground && (format === "png" || format === "webp");
  if (shouldSetDefaultBackground) {
    await __classPrivateFieldGet23(this, _Page_instances, "m", _Page_setTransparentBackgroundColor).call(this);
  }
  const result = await __classPrivateFieldGet23(this, _Page_client, "f").send("Page.captureScreenshot", {
    format,
    quality: options.quality,
    clip,
    captureBeyondViewport,
    fromSurface
  });
  if (shouldSetDefaultBackground) {
    await __classPrivateFieldGet23(this, _Page_instances, "m", _Page_resetDefaultBackgroundColor).call(this);
  }
  if (options.fullPage && __classPrivateFieldGet23(this, _Page_viewport, "f")) {
    await this.setViewport(__classPrivateFieldGet23(this, _Page_viewport, "f"));
  }
  const buffer = options.encoding === "base64" ? result.data : Buffer3.from(result.data, "base64");
  return buffer;
  function processClip(clip2) {
    const x = Math.round(clip2.x);
    const y = Math.round(clip2.y);
    const width = Math.round(clip2.width + clip2.x - x);
    const height = Math.round(clip2.height + clip2.y - y);
    return { x, y, width, height, scale: 1 };
  }
};
var supportedMetrics = /* @__PURE__ */ new Set([
  "Timestamp",
  "Documents",
  "Frames",
  "JSEventListeners",
  "Nodes",
  "LayoutCount",
  "RecalcStyleCount",
  "LayoutDuration",
  "RecalcStyleDuration",
  "ScriptDuration",
  "TaskDuration",
  "JSHeapUsedSize",
  "JSHeapTotalSize"
]);
var unitToPixels = {
  px: 1,
  in: 96,
  cm: 37.8,
  mm: 3.78
};
function convertPrintParameterToInches(parameter) {
  if (typeof parameter === "undefined") {
    return void 0;
  }
  let pixels;
  if (isNumber(parameter)) {
    pixels = parameter;
  } else if (isString(parameter)) {
    const text = parameter;
    let unit = text.substring(text.length - 2).toLowerCase();
    let valueText = "";
    if (unit in unitToPixels) {
      valueText = text.substring(0, text.length - 2);
    } else {
      unit = "px";
      valueText = text;
    }
    const value = Number(valueText);
    assert(!isNaN(value), "Failed to parse parameter value: " + text);
    pixels = value * unitToPixels[unit];
  } else {
    throw new Error("page.pdf() Cannot handle parameter type: " + typeof parameter);
  }
  return pixels / 96;
}

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Target.js
var __classPrivateFieldSet22 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet24 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Target_browserContext;
var _Target_session;
var _Target_targetInfo;
var _Target_sessionFactory;
var _Target_ignoreHTTPSErrors;
var _Target_defaultViewport;
var _Target_pagePromise;
var _Target_workerPromise;
var _Target_screenshotTaskQueue;
var _Target_targetManager;
var Target = class {
  /**
   * @internal
   */
  constructor(targetInfo, session, browserContext, targetManager, sessionFactory, ignoreHTTPSErrors, defaultViewport, screenshotTaskQueue, isPageTargetCallback) {
    _Target_browserContext.set(this, void 0);
    _Target_session.set(this, void 0);
    _Target_targetInfo.set(this, void 0);
    _Target_sessionFactory.set(this, void 0);
    _Target_ignoreHTTPSErrors.set(this, void 0);
    _Target_defaultViewport.set(this, void 0);
    _Target_pagePromise.set(this, void 0);
    _Target_workerPromise.set(this, void 0);
    _Target_screenshotTaskQueue.set(this, void 0);
    _Target_targetManager.set(this, void 0);
    __classPrivateFieldSet22(this, _Target_session, session, "f");
    __classPrivateFieldSet22(this, _Target_targetManager, targetManager, "f");
    __classPrivateFieldSet22(this, _Target_targetInfo, targetInfo, "f");
    __classPrivateFieldSet22(this, _Target_browserContext, browserContext, "f");
    this._targetId = targetInfo.targetId;
    __classPrivateFieldSet22(this, _Target_sessionFactory, sessionFactory, "f");
    __classPrivateFieldSet22(this, _Target_ignoreHTTPSErrors, ignoreHTTPSErrors, "f");
    __classPrivateFieldSet22(this, _Target_defaultViewport, defaultViewport !== null && defaultViewport !== void 0 ? defaultViewport : void 0, "f");
    __classPrivateFieldSet22(this, _Target_screenshotTaskQueue, screenshotTaskQueue, "f");
    this._isPageTargetCallback = isPageTargetCallback;
    this._initializedPromise = new Promise((fulfill) => {
      return this._initializedCallback = fulfill;
    }).then(async (success) => {
      if (!success) {
        return false;
      }
      const opener = this.opener();
      if (!opener || !__classPrivateFieldGet24(opener, _Target_pagePromise, "f") || this.type() !== "page") {
        return true;
      }
      const openerPage = await __classPrivateFieldGet24(opener, _Target_pagePromise, "f");
      if (!openerPage.listenerCount(
        "popup"
        /* PageEmittedEvents.Popup */
      )) {
        return true;
      }
      const popupPage = await this.page();
      openerPage.emit("popup", popupPage);
      return true;
    });
    this._isClosedPromise = new Promise((fulfill) => {
      return this._closedCallback = fulfill;
    });
    this._isInitialized = !this._isPageTargetCallback(__classPrivateFieldGet24(this, _Target_targetInfo, "f")) || __classPrivateFieldGet24(this, _Target_targetInfo, "f").url !== "";
    if (this._isInitialized) {
      this._initializedCallback(true);
    }
  }
  /**
   * @internal
   */
  _session() {
    return __classPrivateFieldGet24(this, _Target_session, "f");
  }
  /**
   * Creates a Chrome Devtools Protocol session attached to the target.
   */
  createCDPSession() {
    return __classPrivateFieldGet24(this, _Target_sessionFactory, "f").call(this, false);
  }
  /**
   * @internal
   */
  _targetManager() {
    return __classPrivateFieldGet24(this, _Target_targetManager, "f");
  }
  /**
   * @internal
   */
  _getTargetInfo() {
    return __classPrivateFieldGet24(this, _Target_targetInfo, "f");
  }
  /**
   * If the target is not of type `"page"` or `"background_page"`, returns `null`.
   */
  async page() {
    var _a2;
    if (this._isPageTargetCallback(__classPrivateFieldGet24(this, _Target_targetInfo, "f")) && !__classPrivateFieldGet24(this, _Target_pagePromise, "f")) {
      __classPrivateFieldSet22(this, _Target_pagePromise, (__classPrivateFieldGet24(this, _Target_session, "f") ? Promise.resolve(__classPrivateFieldGet24(this, _Target_session, "f")) : __classPrivateFieldGet24(this, _Target_sessionFactory, "f").call(this, true)).then((client) => {
        var _a3;
        return Page._create(client, this, __classPrivateFieldGet24(this, _Target_ignoreHTTPSErrors, "f"), (_a3 = __classPrivateFieldGet24(this, _Target_defaultViewport, "f")) !== null && _a3 !== void 0 ? _a3 : null, __classPrivateFieldGet24(this, _Target_screenshotTaskQueue, "f"));
      }), "f");
    }
    return (_a2 = await __classPrivateFieldGet24(this, _Target_pagePromise, "f")) !== null && _a2 !== void 0 ? _a2 : null;
  }
  /**
   * If the target is not of type `"service_worker"` or `"shared_worker"`, returns `null`.
   */
  async worker() {
    if (__classPrivateFieldGet24(this, _Target_targetInfo, "f").type !== "service_worker" && __classPrivateFieldGet24(this, _Target_targetInfo, "f").type !== "shared_worker") {
      return null;
    }
    if (!__classPrivateFieldGet24(this, _Target_workerPromise, "f")) {
      __classPrivateFieldSet22(this, _Target_workerPromise, (__classPrivateFieldGet24(this, _Target_session, "f") ? Promise.resolve(__classPrivateFieldGet24(this, _Target_session, "f")) : __classPrivateFieldGet24(this, _Target_sessionFactory, "f").call(this, false)).then((client) => {
        return new WebWorker(
          client,
          __classPrivateFieldGet24(this, _Target_targetInfo, "f").url,
          () => {
          },
          () => {
          }
          /* exceptionThrown */
        );
      }), "f");
    }
    return __classPrivateFieldGet24(this, _Target_workerPromise, "f");
  }
  url() {
    return __classPrivateFieldGet24(this, _Target_targetInfo, "f").url;
  }
  /**
   * Identifies what kind of target this is.
   *
   * @remarks
   *
   * See {@link https://developer.chrome.com/extensions/background_pages | docs} for more info about background pages.
   */
  type() {
    const type = __classPrivateFieldGet24(this, _Target_targetInfo, "f").type;
    if (type === "page" || type === "background_page" || type === "service_worker" || type === "shared_worker" || type === "browser" || type === "webview") {
      return type;
    }
    return "other";
  }
  /**
   * Get the browser the target belongs to.
   */
  browser() {
    return __classPrivateFieldGet24(this, _Target_browserContext, "f").browser();
  }
  /**
   * Get the browser context the target belongs to.
   */
  browserContext() {
    return __classPrivateFieldGet24(this, _Target_browserContext, "f");
  }
  /**
   * Get the target that opened this target. Top-level targets return `null`.
   */
  opener() {
    const { openerId } = __classPrivateFieldGet24(this, _Target_targetInfo, "f");
    if (!openerId) {
      return;
    }
    return this.browser()._targets.get(openerId);
  }
  /**
   * @internal
   */
  _targetInfoChanged(targetInfo) {
    __classPrivateFieldSet22(this, _Target_targetInfo, targetInfo, "f");
    if (!this._isInitialized && (!this._isPageTargetCallback(__classPrivateFieldGet24(this, _Target_targetInfo, "f")) || __classPrivateFieldGet24(this, _Target_targetInfo, "f").url !== "")) {
      this._isInitialized = true;
      this._initializedCallback(true);
      return;
    }
  }
};
_Target_browserContext = /* @__PURE__ */ new WeakMap(), _Target_session = /* @__PURE__ */ new WeakMap(), _Target_targetInfo = /* @__PURE__ */ new WeakMap(), _Target_sessionFactory = /* @__PURE__ */ new WeakMap(), _Target_ignoreHTTPSErrors = /* @__PURE__ */ new WeakMap(), _Target_defaultViewport = /* @__PURE__ */ new WeakMap(), _Target_pagePromise = /* @__PURE__ */ new WeakMap(), _Target_workerPromise = /* @__PURE__ */ new WeakMap(), _Target_screenshotTaskQueue = /* @__PURE__ */ new WeakMap(), _Target_targetManager = /* @__PURE__ */ new WeakMap();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/TaskQueue.js
init_checked_fetch();
init_modules_watch_stub();
var __classPrivateFieldSet23 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet25 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TaskQueue_chain;
var TaskQueue = class {
  constructor() {
    _TaskQueue_chain.set(this, void 0);
    __classPrivateFieldSet23(this, _TaskQueue_chain, Promise.resolve(), "f");
  }
  postTask(task) {
    const result = __classPrivateFieldGet25(this, _TaskQueue_chain, "f").then(task);
    __classPrivateFieldSet23(this, _TaskQueue_chain, result.then(() => {
      return void 0;
    }, () => {
      return void 0;
    }), "f");
    return result;
  }
};
_TaskQueue_chain = /* @__PURE__ */ new WeakMap();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/ChromeTargetManager.js
init_checked_fetch();
init_modules_watch_stub();
var __classPrivateFieldSet24 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet26 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ChromeTargetManager_instances;
var _ChromeTargetManager_connection;
var _ChromeTargetManager_discoveredTargetsByTargetId;
var _ChromeTargetManager_attachedTargetsByTargetId;
var _ChromeTargetManager_attachedTargetsBySessionId;
var _ChromeTargetManager_ignoredTargets;
var _ChromeTargetManager_targetFilterCallback;
var _ChromeTargetManager_targetFactory;
var _ChromeTargetManager_targetInterceptors;
var _ChromeTargetManager_attachedToTargetListenersBySession;
var _ChromeTargetManager_detachedFromTargetListenersBySession;
var _ChromeTargetManager_initializeCallback;
var _ChromeTargetManager_initializePromise;
var _ChromeTargetManager_targetsIdsForInit;
var _ChromeTargetManager_storeExistingTargetsForInit;
var _ChromeTargetManager_setupAttachmentListeners;
var _ChromeTargetManager_removeAttachmentListeners;
var _ChromeTargetManager_onSessionDetached;
var _ChromeTargetManager_onTargetCreated;
var _ChromeTargetManager_onTargetDestroyed;
var _ChromeTargetManager_onTargetInfoChanged;
var _ChromeTargetManager_onAttachedToTarget;
var _ChromeTargetManager_finishInitializationIfReady;
var _ChromeTargetManager_onDetachedFromTarget;
var ChromeTargetManager = class extends EventEmitter {
  constructor(connection, targetFactory, targetFilterCallback) {
    super();
    _ChromeTargetManager_instances.add(this);
    _ChromeTargetManager_connection.set(this, void 0);
    _ChromeTargetManager_discoveredTargetsByTargetId.set(this, /* @__PURE__ */ new Map());
    _ChromeTargetManager_attachedTargetsByTargetId.set(this, /* @__PURE__ */ new Map());
    _ChromeTargetManager_attachedTargetsBySessionId.set(this, /* @__PURE__ */ new Map());
    _ChromeTargetManager_ignoredTargets.set(this, /* @__PURE__ */ new Set());
    _ChromeTargetManager_targetFilterCallback.set(this, void 0);
    _ChromeTargetManager_targetFactory.set(this, void 0);
    _ChromeTargetManager_targetInterceptors.set(this, /* @__PURE__ */ new WeakMap());
    _ChromeTargetManager_attachedToTargetListenersBySession.set(this, /* @__PURE__ */ new WeakMap());
    _ChromeTargetManager_detachedFromTargetListenersBySession.set(this, /* @__PURE__ */ new WeakMap());
    _ChromeTargetManager_initializeCallback.set(this, () => {
    });
    _ChromeTargetManager_initializePromise.set(this, new Promise((resolve) => {
      __classPrivateFieldSet24(this, _ChromeTargetManager_initializeCallback, resolve, "f");
    }));
    _ChromeTargetManager_targetsIdsForInit.set(this, /* @__PURE__ */ new Set());
    _ChromeTargetManager_storeExistingTargetsForInit.set(this, () => {
      for (const [targetId, targetInfo] of __classPrivateFieldGet26(this, _ChromeTargetManager_discoveredTargetsByTargetId, "f").entries()) {
        if ((!__classPrivateFieldGet26(this, _ChromeTargetManager_targetFilterCallback, "f") || __classPrivateFieldGet26(this, _ChromeTargetManager_targetFilterCallback, "f").call(this, targetInfo)) && targetInfo.type !== "browser") {
          __classPrivateFieldGet26(this, _ChromeTargetManager_targetsIdsForInit, "f").add(targetId);
        }
      }
    });
    _ChromeTargetManager_onSessionDetached.set(this, (session) => {
      __classPrivateFieldGet26(this, _ChromeTargetManager_instances, "m", _ChromeTargetManager_removeAttachmentListeners).call(this, session);
      __classPrivateFieldGet26(this, _ChromeTargetManager_targetInterceptors, "f").delete(session);
    });
    _ChromeTargetManager_onTargetCreated.set(this, async (event) => {
      __classPrivateFieldGet26(this, _ChromeTargetManager_discoveredTargetsByTargetId, "f").set(event.targetInfo.targetId, event.targetInfo);
      this.emit("targetDiscovered", event.targetInfo);
      if (event.targetInfo.type === "browser" && event.targetInfo.attached) {
        if (__classPrivateFieldGet26(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").has(event.targetInfo.targetId)) {
          return;
        }
        const target = __classPrivateFieldGet26(this, _ChromeTargetManager_targetFactory, "f").call(this, event.targetInfo, void 0);
        __classPrivateFieldGet26(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").set(event.targetInfo.targetId, target);
      }
      if (event.targetInfo.type === "shared_worker") {
        await __classPrivateFieldGet26(this, _ChromeTargetManager_connection, "f")._createSession(event.targetInfo, true);
      }
    });
    _ChromeTargetManager_onTargetDestroyed.set(this, (event) => {
      const targetInfo = __classPrivateFieldGet26(this, _ChromeTargetManager_discoveredTargetsByTargetId, "f").get(event.targetId);
      __classPrivateFieldGet26(this, _ChromeTargetManager_discoveredTargetsByTargetId, "f").delete(event.targetId);
      __classPrivateFieldGet26(this, _ChromeTargetManager_instances, "m", _ChromeTargetManager_finishInitializationIfReady).call(this, event.targetId);
      if ((targetInfo === null || targetInfo === void 0 ? void 0 : targetInfo.type) === "service_worker" && __classPrivateFieldGet26(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").has(event.targetId)) {
        const target = __classPrivateFieldGet26(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").get(event.targetId);
        this.emit("targetGone", target);
        __classPrivateFieldGet26(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").delete(event.targetId);
      }
    });
    _ChromeTargetManager_onTargetInfoChanged.set(this, (event) => {
      __classPrivateFieldGet26(this, _ChromeTargetManager_discoveredTargetsByTargetId, "f").set(event.targetInfo.targetId, event.targetInfo);
      if (__classPrivateFieldGet26(this, _ChromeTargetManager_ignoredTargets, "f").has(event.targetInfo.targetId) || !__classPrivateFieldGet26(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").has(event.targetInfo.targetId) || !event.targetInfo.attached) {
        return;
      }
      const target = __classPrivateFieldGet26(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").get(event.targetInfo.targetId);
      this.emit("targetChanged", {
        target,
        targetInfo: event.targetInfo
      });
    });
    _ChromeTargetManager_onAttachedToTarget.set(this, async (parentSession, event) => {
      const targetInfo = event.targetInfo;
      const session = __classPrivateFieldGet26(this, _ChromeTargetManager_connection, "f").session(event.sessionId);
      if (!session) {
        throw new Error(`Session ${event.sessionId} was not created.`);
      }
      const silentDetach = async () => {
        await session.send("Runtime.runIfWaitingForDebugger").catch(debugError);
        await parentSession.send("Target.detachFromTarget", {
          sessionId: session.id()
        }).catch(debugError);
      };
      if (!__classPrivateFieldGet26(this, _ChromeTargetManager_connection, "f").isAutoAttached(targetInfo.targetId)) {
        return;
      }
      if (targetInfo.type === "service_worker" && __classPrivateFieldGet26(this, _ChromeTargetManager_connection, "f").isAutoAttached(targetInfo.targetId)) {
        __classPrivateFieldGet26(this, _ChromeTargetManager_instances, "m", _ChromeTargetManager_finishInitializationIfReady).call(this, targetInfo.targetId);
        await silentDetach();
        if (__classPrivateFieldGet26(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").has(targetInfo.targetId)) {
          return;
        }
        const target2 = __classPrivateFieldGet26(this, _ChromeTargetManager_targetFactory, "f").call(this, targetInfo);
        __classPrivateFieldGet26(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").set(targetInfo.targetId, target2);
        this.emit("targetAvailable", target2);
        return;
      }
      if (__classPrivateFieldGet26(this, _ChromeTargetManager_targetFilterCallback, "f") && !__classPrivateFieldGet26(this, _ChromeTargetManager_targetFilterCallback, "f").call(this, targetInfo)) {
        __classPrivateFieldGet26(this, _ChromeTargetManager_ignoredTargets, "f").add(targetInfo.targetId);
        __classPrivateFieldGet26(this, _ChromeTargetManager_instances, "m", _ChromeTargetManager_finishInitializationIfReady).call(this, targetInfo.targetId);
        await silentDetach();
        return;
      }
      const existingTarget = __classPrivateFieldGet26(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").has(targetInfo.targetId);
      const target = existingTarget ? __classPrivateFieldGet26(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").get(targetInfo.targetId) : __classPrivateFieldGet26(this, _ChromeTargetManager_targetFactory, "f").call(this, targetInfo, session);
      __classPrivateFieldGet26(this, _ChromeTargetManager_instances, "m", _ChromeTargetManager_setupAttachmentListeners).call(this, session);
      if (existingTarget) {
        __classPrivateFieldGet26(this, _ChromeTargetManager_attachedTargetsBySessionId, "f").set(session.id(), __classPrivateFieldGet26(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").get(targetInfo.targetId));
      } else {
        __classPrivateFieldGet26(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").set(targetInfo.targetId, target);
        __classPrivateFieldGet26(this, _ChromeTargetManager_attachedTargetsBySessionId, "f").set(session.id(), target);
      }
      for (const interceptor of __classPrivateFieldGet26(this, _ChromeTargetManager_targetInterceptors, "f").get(parentSession) || []) {
        if (!(parentSession instanceof Connection)) {
          assert(__classPrivateFieldGet26(this, _ChromeTargetManager_attachedTargetsBySessionId, "f").has(parentSession.id()));
        }
        await interceptor(target, parentSession instanceof Connection ? null : __classPrivateFieldGet26(this, _ChromeTargetManager_attachedTargetsBySessionId, "f").get(parentSession.id()));
      }
      __classPrivateFieldGet26(this, _ChromeTargetManager_targetsIdsForInit, "f").delete(target._targetId);
      if (!existingTarget) {
        this.emit("targetAvailable", target);
      }
      __classPrivateFieldGet26(this, _ChromeTargetManager_instances, "m", _ChromeTargetManager_finishInitializationIfReady).call(this);
      await Promise.all([
        session.send("Target.setAutoAttach", {
          waitForDebuggerOnStart: true,
          flatten: true,
          autoAttach: true
        }),
        session.send("Runtime.runIfWaitingForDebugger")
      ]).catch(debugError);
    });
    _ChromeTargetManager_onDetachedFromTarget.set(this, (_parentSession, event) => {
      const target = __classPrivateFieldGet26(this, _ChromeTargetManager_attachedTargetsBySessionId, "f").get(event.sessionId);
      __classPrivateFieldGet26(this, _ChromeTargetManager_attachedTargetsBySessionId, "f").delete(event.sessionId);
      if (!target) {
        return;
      }
      __classPrivateFieldGet26(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").delete(target._targetId);
      this.emit("targetGone", target);
    });
    __classPrivateFieldSet24(this, _ChromeTargetManager_connection, connection, "f");
    __classPrivateFieldSet24(this, _ChromeTargetManager_targetFilterCallback, targetFilterCallback, "f");
    __classPrivateFieldSet24(this, _ChromeTargetManager_targetFactory, targetFactory, "f");
    __classPrivateFieldGet26(this, _ChromeTargetManager_connection, "f").on("Target.targetCreated", __classPrivateFieldGet26(this, _ChromeTargetManager_onTargetCreated, "f"));
    __classPrivateFieldGet26(this, _ChromeTargetManager_connection, "f").on("Target.targetDestroyed", __classPrivateFieldGet26(this, _ChromeTargetManager_onTargetDestroyed, "f"));
    __classPrivateFieldGet26(this, _ChromeTargetManager_connection, "f").on("Target.targetInfoChanged", __classPrivateFieldGet26(this, _ChromeTargetManager_onTargetInfoChanged, "f"));
    __classPrivateFieldGet26(this, _ChromeTargetManager_connection, "f").on("sessiondetached", __classPrivateFieldGet26(this, _ChromeTargetManager_onSessionDetached, "f"));
    __classPrivateFieldGet26(this, _ChromeTargetManager_instances, "m", _ChromeTargetManager_setupAttachmentListeners).call(this, __classPrivateFieldGet26(this, _ChromeTargetManager_connection, "f"));
    __classPrivateFieldGet26(this, _ChromeTargetManager_connection, "f").send("Target.setDiscoverTargets", {
      discover: true,
      filter: [{ type: "tab", exclude: true }, {}]
    }).then(__classPrivateFieldGet26(this, _ChromeTargetManager_storeExistingTargetsForInit, "f")).catch(debugError);
  }
  async initialize() {
    await __classPrivateFieldGet26(this, _ChromeTargetManager_connection, "f").send("Target.setAutoAttach", {
      waitForDebuggerOnStart: true,
      flatten: true,
      autoAttach: true
    });
    __classPrivateFieldGet26(this, _ChromeTargetManager_instances, "m", _ChromeTargetManager_finishInitializationIfReady).call(this);
    await __classPrivateFieldGet26(this, _ChromeTargetManager_initializePromise, "f");
  }
  dispose() {
    __classPrivateFieldGet26(this, _ChromeTargetManager_connection, "f").off("Target.targetCreated", __classPrivateFieldGet26(this, _ChromeTargetManager_onTargetCreated, "f"));
    __classPrivateFieldGet26(this, _ChromeTargetManager_connection, "f").off("Target.targetDestroyed", __classPrivateFieldGet26(this, _ChromeTargetManager_onTargetDestroyed, "f"));
    __classPrivateFieldGet26(this, _ChromeTargetManager_connection, "f").off("Target.targetInfoChanged", __classPrivateFieldGet26(this, _ChromeTargetManager_onTargetInfoChanged, "f"));
    __classPrivateFieldGet26(this, _ChromeTargetManager_connection, "f").off("sessiondetached", __classPrivateFieldGet26(this, _ChromeTargetManager_onSessionDetached, "f"));
    __classPrivateFieldGet26(this, _ChromeTargetManager_instances, "m", _ChromeTargetManager_removeAttachmentListeners).call(this, __classPrivateFieldGet26(this, _ChromeTargetManager_connection, "f"));
  }
  getAvailableTargets() {
    return __classPrivateFieldGet26(this, _ChromeTargetManager_attachedTargetsByTargetId, "f");
  }
  addTargetInterceptor(session, interceptor) {
    const interceptors = __classPrivateFieldGet26(this, _ChromeTargetManager_targetInterceptors, "f").get(session) || [];
    interceptors.push(interceptor);
    __classPrivateFieldGet26(this, _ChromeTargetManager_targetInterceptors, "f").set(session, interceptors);
  }
  removeTargetInterceptor(client, interceptor) {
    const interceptors = __classPrivateFieldGet26(this, _ChromeTargetManager_targetInterceptors, "f").get(client) || [];
    __classPrivateFieldGet26(this, _ChromeTargetManager_targetInterceptors, "f").set(client, interceptors.filter((currentInterceptor) => {
      return currentInterceptor !== interceptor;
    }));
  }
};
_ChromeTargetManager_connection = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_discoveredTargetsByTargetId = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_attachedTargetsByTargetId = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_attachedTargetsBySessionId = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_ignoredTargets = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_targetFilterCallback = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_targetFactory = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_targetInterceptors = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_attachedToTargetListenersBySession = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_detachedFromTargetListenersBySession = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_initializeCallback = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_initializePromise = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_targetsIdsForInit = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_storeExistingTargetsForInit = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_onSessionDetached = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_onTargetCreated = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_onTargetDestroyed = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_onTargetInfoChanged = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_onAttachedToTarget = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_onDetachedFromTarget = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_instances = /* @__PURE__ */ new WeakSet(), _ChromeTargetManager_setupAttachmentListeners = function _ChromeTargetManager_setupAttachmentListeners2(session) {
  const listener = (event) => {
    return __classPrivateFieldGet26(this, _ChromeTargetManager_onAttachedToTarget, "f").call(this, session, event);
  };
  assert(!__classPrivateFieldGet26(this, _ChromeTargetManager_attachedToTargetListenersBySession, "f").has(session));
  __classPrivateFieldGet26(this, _ChromeTargetManager_attachedToTargetListenersBySession, "f").set(session, listener);
  session.on("Target.attachedToTarget", listener);
  const detachedListener = (event) => {
    return __classPrivateFieldGet26(this, _ChromeTargetManager_onDetachedFromTarget, "f").call(this, session, event);
  };
  assert(!__classPrivateFieldGet26(this, _ChromeTargetManager_detachedFromTargetListenersBySession, "f").has(session));
  __classPrivateFieldGet26(this, _ChromeTargetManager_detachedFromTargetListenersBySession, "f").set(session, detachedListener);
  session.on("Target.detachedFromTarget", detachedListener);
}, _ChromeTargetManager_removeAttachmentListeners = function _ChromeTargetManager_removeAttachmentListeners2(session) {
  if (__classPrivateFieldGet26(this, _ChromeTargetManager_attachedToTargetListenersBySession, "f").has(session)) {
    session.off("Target.attachedToTarget", __classPrivateFieldGet26(this, _ChromeTargetManager_attachedToTargetListenersBySession, "f").get(session));
    __classPrivateFieldGet26(this, _ChromeTargetManager_attachedToTargetListenersBySession, "f").delete(session);
  }
  if (__classPrivateFieldGet26(this, _ChromeTargetManager_detachedFromTargetListenersBySession, "f").has(session)) {
    session.off("Target.detachedFromTarget", __classPrivateFieldGet26(this, _ChromeTargetManager_detachedFromTargetListenersBySession, "f").get(session));
    __classPrivateFieldGet26(this, _ChromeTargetManager_detachedFromTargetListenersBySession, "f").delete(session);
  }
}, _ChromeTargetManager_finishInitializationIfReady = function _ChromeTargetManager_finishInitializationIfReady2(targetId) {
  targetId !== void 0 && __classPrivateFieldGet26(this, _ChromeTargetManager_targetsIdsForInit, "f").delete(targetId);
  if (__classPrivateFieldGet26(this, _ChromeTargetManager_targetsIdsForInit, "f").size === 0) {
    __classPrivateFieldGet26(this, _ChromeTargetManager_initializeCallback, "f").call(this);
  }
};

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/FirefoxTargetManager.js
init_checked_fetch();
init_modules_watch_stub();
var __classPrivateFieldSet25 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet27 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FirefoxTargetManager_instances;
var _FirefoxTargetManager_connection;
var _FirefoxTargetManager_discoveredTargetsByTargetId;
var _FirefoxTargetManager_availableTargetsByTargetId;
var _FirefoxTargetManager_availableTargetsBySessionId;
var _FirefoxTargetManager_ignoredTargets;
var _FirefoxTargetManager_targetFilterCallback;
var _FirefoxTargetManager_targetFactory;
var _FirefoxTargetManager_targetInterceptors;
var _FirefoxTargetManager_attachedToTargetListenersBySession;
var _FirefoxTargetManager_initializeCallback;
var _FirefoxTargetManager_initializePromise;
var _FirefoxTargetManager_targetsIdsForInit;
var _FirefoxTargetManager_onSessionDetached;
var _FirefoxTargetManager_onTargetCreated;
var _FirefoxTargetManager_onTargetDestroyed;
var _FirefoxTargetManager_onAttachedToTarget;
var _FirefoxTargetManager_finishInitializationIfReady;
var FirefoxTargetManager = class extends EventEmitter {
  constructor(connection, targetFactory, targetFilterCallback) {
    super();
    _FirefoxTargetManager_instances.add(this);
    _FirefoxTargetManager_connection.set(this, void 0);
    _FirefoxTargetManager_discoveredTargetsByTargetId.set(this, /* @__PURE__ */ new Map());
    _FirefoxTargetManager_availableTargetsByTargetId.set(this, /* @__PURE__ */ new Map());
    _FirefoxTargetManager_availableTargetsBySessionId.set(this, /* @__PURE__ */ new Map());
    _FirefoxTargetManager_ignoredTargets.set(this, /* @__PURE__ */ new Set());
    _FirefoxTargetManager_targetFilterCallback.set(this, void 0);
    _FirefoxTargetManager_targetFactory.set(this, void 0);
    _FirefoxTargetManager_targetInterceptors.set(this, /* @__PURE__ */ new WeakMap());
    _FirefoxTargetManager_attachedToTargetListenersBySession.set(this, /* @__PURE__ */ new WeakMap());
    _FirefoxTargetManager_initializeCallback.set(this, () => {
    });
    _FirefoxTargetManager_initializePromise.set(this, new Promise((resolve) => {
      __classPrivateFieldSet25(this, _FirefoxTargetManager_initializeCallback, resolve, "f");
    }));
    _FirefoxTargetManager_targetsIdsForInit.set(this, /* @__PURE__ */ new Set());
    _FirefoxTargetManager_onSessionDetached.set(this, (session) => {
      this.removeSessionListeners(session);
      __classPrivateFieldGet27(this, _FirefoxTargetManager_targetInterceptors, "f").delete(session);
      __classPrivateFieldGet27(this, _FirefoxTargetManager_availableTargetsBySessionId, "f").delete(session.id());
    });
    _FirefoxTargetManager_onTargetCreated.set(this, async (event) => {
      if (__classPrivateFieldGet27(this, _FirefoxTargetManager_discoveredTargetsByTargetId, "f").has(event.targetInfo.targetId)) {
        return;
      }
      __classPrivateFieldGet27(this, _FirefoxTargetManager_discoveredTargetsByTargetId, "f").set(event.targetInfo.targetId, event.targetInfo);
      if (event.targetInfo.type === "browser" && event.targetInfo.attached) {
        const target2 = __classPrivateFieldGet27(this, _FirefoxTargetManager_targetFactory, "f").call(this, event.targetInfo, void 0);
        __classPrivateFieldGet27(this, _FirefoxTargetManager_availableTargetsByTargetId, "f").set(event.targetInfo.targetId, target2);
        __classPrivateFieldGet27(this, _FirefoxTargetManager_instances, "m", _FirefoxTargetManager_finishInitializationIfReady).call(this, target2._targetId);
        return;
      }
      if (__classPrivateFieldGet27(this, _FirefoxTargetManager_targetFilterCallback, "f") && !__classPrivateFieldGet27(this, _FirefoxTargetManager_targetFilterCallback, "f").call(this, event.targetInfo)) {
        __classPrivateFieldGet27(this, _FirefoxTargetManager_ignoredTargets, "f").add(event.targetInfo.targetId);
        __classPrivateFieldGet27(this, _FirefoxTargetManager_instances, "m", _FirefoxTargetManager_finishInitializationIfReady).call(this, event.targetInfo.targetId);
        return;
      }
      const target = __classPrivateFieldGet27(this, _FirefoxTargetManager_targetFactory, "f").call(this, event.targetInfo, void 0);
      __classPrivateFieldGet27(this, _FirefoxTargetManager_availableTargetsByTargetId, "f").set(event.targetInfo.targetId, target);
      this.emit("targetAvailable", target);
      __classPrivateFieldGet27(this, _FirefoxTargetManager_instances, "m", _FirefoxTargetManager_finishInitializationIfReady).call(this, target._targetId);
    });
    _FirefoxTargetManager_onTargetDestroyed.set(this, (event) => {
      __classPrivateFieldGet27(this, _FirefoxTargetManager_discoveredTargetsByTargetId, "f").delete(event.targetId);
      __classPrivateFieldGet27(this, _FirefoxTargetManager_instances, "m", _FirefoxTargetManager_finishInitializationIfReady).call(this, event.targetId);
      const target = __classPrivateFieldGet27(this, _FirefoxTargetManager_availableTargetsByTargetId, "f").get(event.targetId);
      if (target) {
        this.emit("targetGone", target);
        __classPrivateFieldGet27(this, _FirefoxTargetManager_availableTargetsByTargetId, "f").delete(event.targetId);
      }
    });
    _FirefoxTargetManager_onAttachedToTarget.set(this, async (parentSession, event) => {
      const targetInfo = event.targetInfo;
      const session = __classPrivateFieldGet27(this, _FirefoxTargetManager_connection, "f").session(event.sessionId);
      if (!session) {
        throw new Error(`Session ${event.sessionId} was not created.`);
      }
      const target = __classPrivateFieldGet27(this, _FirefoxTargetManager_availableTargetsByTargetId, "f").get(targetInfo.targetId);
      assert(target, `Target ${targetInfo.targetId} is missing`);
      this.setupAttachmentListeners(session);
      __classPrivateFieldGet27(this, _FirefoxTargetManager_availableTargetsBySessionId, "f").set(session.id(), __classPrivateFieldGet27(this, _FirefoxTargetManager_availableTargetsByTargetId, "f").get(targetInfo.targetId));
      for (const hook of __classPrivateFieldGet27(this, _FirefoxTargetManager_targetInterceptors, "f").get(parentSession) || []) {
        if (!(parentSession instanceof Connection)) {
          assert(__classPrivateFieldGet27(this, _FirefoxTargetManager_availableTargetsBySessionId, "f").has(parentSession.id()));
        }
        await hook(target, parentSession instanceof Connection ? null : __classPrivateFieldGet27(this, _FirefoxTargetManager_availableTargetsBySessionId, "f").get(parentSession.id()));
      }
    });
    __classPrivateFieldSet25(this, _FirefoxTargetManager_connection, connection, "f");
    __classPrivateFieldSet25(this, _FirefoxTargetManager_targetFilterCallback, targetFilterCallback, "f");
    __classPrivateFieldSet25(this, _FirefoxTargetManager_targetFactory, targetFactory, "f");
    __classPrivateFieldGet27(this, _FirefoxTargetManager_connection, "f").on("Target.targetCreated", __classPrivateFieldGet27(this, _FirefoxTargetManager_onTargetCreated, "f"));
    __classPrivateFieldGet27(this, _FirefoxTargetManager_connection, "f").on("Target.targetDestroyed", __classPrivateFieldGet27(this, _FirefoxTargetManager_onTargetDestroyed, "f"));
    __classPrivateFieldGet27(this, _FirefoxTargetManager_connection, "f").on("sessiondetached", __classPrivateFieldGet27(this, _FirefoxTargetManager_onSessionDetached, "f"));
    this.setupAttachmentListeners(__classPrivateFieldGet27(this, _FirefoxTargetManager_connection, "f"));
  }
  addTargetInterceptor(client, interceptor) {
    const interceptors = __classPrivateFieldGet27(this, _FirefoxTargetManager_targetInterceptors, "f").get(client) || [];
    interceptors.push(interceptor);
    __classPrivateFieldGet27(this, _FirefoxTargetManager_targetInterceptors, "f").set(client, interceptors);
  }
  removeTargetInterceptor(client, interceptor) {
    const interceptors = __classPrivateFieldGet27(this, _FirefoxTargetManager_targetInterceptors, "f").get(client) || [];
    __classPrivateFieldGet27(this, _FirefoxTargetManager_targetInterceptors, "f").set(client, interceptors.filter((currentInterceptor) => {
      return currentInterceptor !== interceptor;
    }));
  }
  setupAttachmentListeners(session) {
    const listener = (event) => {
      return __classPrivateFieldGet27(this, _FirefoxTargetManager_onAttachedToTarget, "f").call(this, session, event);
    };
    assert(!__classPrivateFieldGet27(this, _FirefoxTargetManager_attachedToTargetListenersBySession, "f").has(session));
    __classPrivateFieldGet27(this, _FirefoxTargetManager_attachedToTargetListenersBySession, "f").set(session, listener);
    session.on("Target.attachedToTarget", listener);
  }
  removeSessionListeners(session) {
    if (__classPrivateFieldGet27(this, _FirefoxTargetManager_attachedToTargetListenersBySession, "f").has(session)) {
      session.off("Target.attachedToTarget", __classPrivateFieldGet27(this, _FirefoxTargetManager_attachedToTargetListenersBySession, "f").get(session));
      __classPrivateFieldGet27(this, _FirefoxTargetManager_attachedToTargetListenersBySession, "f").delete(session);
    }
  }
  getAvailableTargets() {
    return __classPrivateFieldGet27(this, _FirefoxTargetManager_availableTargetsByTargetId, "f");
  }
  dispose() {
    __classPrivateFieldGet27(this, _FirefoxTargetManager_connection, "f").off("Target.targetCreated", __classPrivateFieldGet27(this, _FirefoxTargetManager_onTargetCreated, "f"));
    __classPrivateFieldGet27(this, _FirefoxTargetManager_connection, "f").off("Target.targetDestroyed", __classPrivateFieldGet27(this, _FirefoxTargetManager_onTargetDestroyed, "f"));
  }
  async initialize() {
    await __classPrivateFieldGet27(this, _FirefoxTargetManager_connection, "f").send("Target.setDiscoverTargets", { discover: true });
    __classPrivateFieldSet25(this, _FirefoxTargetManager_targetsIdsForInit, new Set(__classPrivateFieldGet27(this, _FirefoxTargetManager_discoveredTargetsByTargetId, "f").keys()), "f");
    await __classPrivateFieldGet27(this, _FirefoxTargetManager_initializePromise, "f");
  }
};
_FirefoxTargetManager_connection = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_discoveredTargetsByTargetId = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_availableTargetsByTargetId = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_availableTargetsBySessionId = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_ignoredTargets = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_targetFilterCallback = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_targetFactory = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_targetInterceptors = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_attachedToTargetListenersBySession = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_initializeCallback = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_initializePromise = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_targetsIdsForInit = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_onSessionDetached = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_onTargetCreated = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_onTargetDestroyed = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_onAttachedToTarget = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_instances = /* @__PURE__ */ new WeakSet(), _FirefoxTargetManager_finishInitializationIfReady = function _FirefoxTargetManager_finishInitializationIfReady2(targetId) {
  __classPrivateFieldGet27(this, _FirefoxTargetManager_targetsIdsForInit, "f").delete(targetId);
  if (__classPrivateFieldGet27(this, _FirefoxTargetManager_targetsIdsForInit, "f").size === 0) {
    __classPrivateFieldGet27(this, _FirefoxTargetManager_initializeCallback, "f").call(this);
  }
};

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Browser.js
var __classPrivateFieldSet26 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet28 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Browser_instances;
var _Browser_ignoreHTTPSErrors;
var _Browser_defaultViewport;
var _Browser_process;
var _Browser_connection;
var _Browser_closeCallback;
var _Browser_targetFilterCallback;
var _Browser_isPageTargetCallback;
var _Browser_defaultContext;
var _Browser_contexts;
var _Browser_screenshotTaskQueue;
var _Browser_targetManager;
var _Browser_sessionId;
var _Browser_emitDisconnected;
var _Browser_setIsPageTargetCallback;
var _Browser_createTarget;
var _Browser_onAttachedToTarget;
var _Browser_onDetachedFromTarget;
var _Browser_onTargetChanged;
var _Browser_onTargetDiscovered;
var _Browser_getVersion;
var _BrowserContext_connection;
var _BrowserContext_browser;
var _BrowserContext_id;
var WEB_PERMISSION_TO_PROTOCOL_PERMISSION = /* @__PURE__ */ new Map([
  ["geolocation", "geolocation"],
  ["midi", "midi"],
  ["notifications", "notifications"],
  // TODO: push isn't a valid type?
  // ['push', 'push'],
  ["camera", "videoCapture"],
  ["microphone", "audioCapture"],
  ["background-sync", "backgroundSync"],
  ["ambient-light-sensor", "sensors"],
  ["accelerometer", "sensors"],
  ["gyroscope", "sensors"],
  ["magnetometer", "sensors"],
  ["accessibility-events", "accessibilityEvents"],
  ["clipboard-read", "clipboardReadWrite"],
  ["clipboard-write", "clipboardReadWrite"],
  ["payment-handler", "paymentHandler"],
  ["persistent-storage", "durableStorage"],
  ["idle-detection", "idleDetection"],
  // chrome-specific permissions we have.
  ["midi-sysex", "midiSysex"]
]);
var Browser = class extends EventEmitter {
  /**
   * @internal
   */
  constructor(product, connection, contextIds, ignoreHTTPSErrors, defaultViewport, process2, closeCallback, targetFilterCallback, isPageTargetCallback, sessionId) {
    super();
    _Browser_instances.add(this);
    _Browser_ignoreHTTPSErrors.set(this, void 0);
    _Browser_defaultViewport.set(this, void 0);
    _Browser_process.set(this, void 0);
    _Browser_connection.set(this, void 0);
    _Browser_closeCallback.set(this, void 0);
    _Browser_targetFilterCallback.set(this, void 0);
    _Browser_isPageTargetCallback.set(this, void 0);
    _Browser_defaultContext.set(this, void 0);
    _Browser_contexts.set(this, void 0);
    _Browser_screenshotTaskQueue.set(this, void 0);
    _Browser_targetManager.set(this, void 0);
    _Browser_sessionId.set(this, void 0);
    _Browser_emitDisconnected.set(this, () => {
      this.emit(
        "disconnected"
        /* BrowserEmittedEvents.Disconnected */
      );
    });
    _Browser_createTarget.set(this, (targetInfo, session) => {
      var _a2;
      const { browserContextId } = targetInfo;
      const context = browserContextId && __classPrivateFieldGet28(this, _Browser_contexts, "f").has(browserContextId) ? __classPrivateFieldGet28(this, _Browser_contexts, "f").get(browserContextId) : __classPrivateFieldGet28(this, _Browser_defaultContext, "f");
      if (!context) {
        throw new Error("Missing browser context");
      }
      return new Target(targetInfo, session, context, __classPrivateFieldGet28(this, _Browser_targetManager, "f"), (isAutoAttachEmulated) => {
        return __classPrivateFieldGet28(this, _Browser_connection, "f")._createSession(targetInfo, isAutoAttachEmulated);
      }, __classPrivateFieldGet28(this, _Browser_ignoreHTTPSErrors, "f"), (_a2 = __classPrivateFieldGet28(this, _Browser_defaultViewport, "f")) !== null && _a2 !== void 0 ? _a2 : null, __classPrivateFieldGet28(this, _Browser_screenshotTaskQueue, "f"), __classPrivateFieldGet28(this, _Browser_isPageTargetCallback, "f"));
    });
    _Browser_onAttachedToTarget.set(this, async (target) => {
      if (await target._initializedPromise) {
        this.emit("targetcreated", target);
        target.browserContext().emit("targetcreated", target);
      }
    });
    _Browser_onDetachedFromTarget.set(this, async (target) => {
      target._initializedCallback(false);
      target._closedCallback();
      if (await target._initializedPromise) {
        this.emit("targetdestroyed", target);
        target.browserContext().emit("targetdestroyed", target);
      }
    });
    _Browser_onTargetChanged.set(this, ({ target, targetInfo }) => {
      const previousURL = target.url();
      const wasInitialized = target._isInitialized;
      target._targetInfoChanged(targetInfo);
      if (wasInitialized && previousURL !== target.url()) {
        this.emit("targetchanged", target);
        target.browserContext().emit("targetchanged", target);
      }
    });
    _Browser_onTargetDiscovered.set(this, (targetInfo) => {
      this.emit("targetdiscovered", targetInfo);
    });
    product = product || "chrome";
    __classPrivateFieldSet26(this, _Browser_ignoreHTTPSErrors, ignoreHTTPSErrors, "f");
    __classPrivateFieldSet26(this, _Browser_defaultViewport, defaultViewport, "f");
    __classPrivateFieldSet26(this, _Browser_process, process2, "f");
    __classPrivateFieldSet26(this, _Browser_screenshotTaskQueue, new TaskQueue(), "f");
    __classPrivateFieldSet26(this, _Browser_connection, connection, "f");
    __classPrivateFieldSet26(this, _Browser_closeCallback, closeCallback || function() {
    }, "f");
    __classPrivateFieldSet26(this, _Browser_targetFilterCallback, targetFilterCallback || (() => {
      return true;
    }), "f");
    __classPrivateFieldGet28(this, _Browser_instances, "m", _Browser_setIsPageTargetCallback).call(this, isPageTargetCallback);
    if (product === "firefox") {
      __classPrivateFieldSet26(this, _Browser_targetManager, new FirefoxTargetManager(connection, __classPrivateFieldGet28(this, _Browser_createTarget, "f"), __classPrivateFieldGet28(this, _Browser_targetFilterCallback, "f")), "f");
    } else {
      __classPrivateFieldSet26(this, _Browser_targetManager, new ChromeTargetManager(connection, __classPrivateFieldGet28(this, _Browser_createTarget, "f"), __classPrivateFieldGet28(this, _Browser_targetFilterCallback, "f")), "f");
    }
    __classPrivateFieldSet26(this, _Browser_defaultContext, new BrowserContext(__classPrivateFieldGet28(this, _Browser_connection, "f"), this), "f");
    __classPrivateFieldSet26(this, _Browser_contexts, /* @__PURE__ */ new Map(), "f");
    for (const contextId of contextIds) {
      __classPrivateFieldGet28(this, _Browser_contexts, "f").set(contextId, new BrowserContext(__classPrivateFieldGet28(this, _Browser_connection, "f"), this, contextId));
    }
    __classPrivateFieldSet26(this, _Browser_sessionId, sessionId || "unknown", "f");
  }
  /**
   * @internal
   */
  static async _create(product, connection, contextIds, ignoreHTTPSErrors, defaultViewport, process2, closeCallback, targetFilterCallback, isPageTargetCallback, sessionId) {
    const browser = new Browser(product, connection, contextIds, ignoreHTTPSErrors, defaultViewport, process2, closeCallback, targetFilterCallback, isPageTargetCallback, sessionId);
    await browser._attach();
    return browser;
  }
  /**
   * @internal
   */
  get _targets() {
    return __classPrivateFieldGet28(this, _Browser_targetManager, "f").getAvailableTargets();
  }
  /**
   * @internal
   */
  async _attach() {
    __classPrivateFieldGet28(this, _Browser_connection, "f").on(ConnectionEmittedEvents.Disconnected, __classPrivateFieldGet28(this, _Browser_emitDisconnected, "f"));
    __classPrivateFieldGet28(this, _Browser_targetManager, "f").on("targetAvailable", __classPrivateFieldGet28(this, _Browser_onAttachedToTarget, "f"));
    __classPrivateFieldGet28(this, _Browser_targetManager, "f").on("targetGone", __classPrivateFieldGet28(this, _Browser_onDetachedFromTarget, "f"));
    __classPrivateFieldGet28(this, _Browser_targetManager, "f").on("targetChanged", __classPrivateFieldGet28(this, _Browser_onTargetChanged, "f"));
    __classPrivateFieldGet28(this, _Browser_targetManager, "f").on("targetDiscovered", __classPrivateFieldGet28(this, _Browser_onTargetDiscovered, "f"));
    await __classPrivateFieldGet28(this, _Browser_targetManager, "f").initialize();
  }
  /**
   * @internal
   */
  _detach() {
    __classPrivateFieldGet28(this, _Browser_connection, "f").off(ConnectionEmittedEvents.Disconnected, __classPrivateFieldGet28(this, _Browser_emitDisconnected, "f"));
    __classPrivateFieldGet28(this, _Browser_targetManager, "f").off("targetAvailable", __classPrivateFieldGet28(this, _Browser_onAttachedToTarget, "f"));
    __classPrivateFieldGet28(this, _Browser_targetManager, "f").off("targetGone", __classPrivateFieldGet28(this, _Browser_onDetachedFromTarget, "f"));
    __classPrivateFieldGet28(this, _Browser_targetManager, "f").off("targetChanged", __classPrivateFieldGet28(this, _Browser_onTargetChanged, "f"));
    __classPrivateFieldGet28(this, _Browser_targetManager, "f").off("targetDiscovered", __classPrivateFieldGet28(this, _Browser_onTargetDiscovered, "f"));
  }
  /**
   * The spawned browser process. Returns `null` if the browser instance was created with
   * {@link Puppeteer.connect}.
   */
  process() {
    var _a2;
    return (_a2 = __classPrivateFieldGet28(this, _Browser_process, "f")) !== null && _a2 !== void 0 ? _a2 : null;
  }
  /**
   * @internal
   */
  _targetManager() {
    return __classPrivateFieldGet28(this, _Browser_targetManager, "f");
  }
  /**
   * @internal
   */
  _getIsPageTargetCallback() {
    return __classPrivateFieldGet28(this, _Browser_isPageTargetCallback, "f");
  }
  /**
   * Creates a new incognito browser context. This won't share cookies/cache with other
   * browser contexts.
   *
   * @example
   *
   * ```ts
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   // Create a new incognito browser context.
   *   const context = await browser.createIncognitoBrowserContext();
   *   // Create a new page in a pristine context.
   *   const page = await context.newPage();
   *   // Do stuff
   *   await page.goto('https://example.com');
   * })();
   * ```
   */
  async createIncognitoBrowserContext(options = {}) {
    const { proxyServer, proxyBypassList } = options;
    const { browserContextId } = await __classPrivateFieldGet28(this, _Browser_connection, "f").send("Target.createBrowserContext", {
      proxyServer,
      proxyBypassList: proxyBypassList && proxyBypassList.join(",")
    });
    const context = new BrowserContext(__classPrivateFieldGet28(this, _Browser_connection, "f"), this, browserContextId);
    __classPrivateFieldGet28(this, _Browser_contexts, "f").set(browserContextId, context);
    return context;
  }
  /**
   * Returns an array of all open browser contexts. In a newly created browser, this will
   * return a single instance of {@link BrowserContext}.
   */
  browserContexts() {
    return [__classPrivateFieldGet28(this, _Browser_defaultContext, "f"), ...Array.from(__classPrivateFieldGet28(this, _Browser_contexts, "f").values())];
  }
  /**
   * Returns the default browser context. The default browser context cannot be closed.
   */
  defaultBrowserContext() {
    return __classPrivateFieldGet28(this, _Browser_defaultContext, "f");
  }
  /**
   * @internal
   */
  async _disposeContext(contextId) {
    if (!contextId) {
      return;
    }
    await __classPrivateFieldGet28(this, _Browser_connection, "f").send("Target.disposeBrowserContext", {
      browserContextId: contextId
    });
    __classPrivateFieldGet28(this, _Browser_contexts, "f").delete(contextId);
  }
  /**
   * The browser websocket endpoint which can be used as an argument to
   * {@link Puppeteer.connect}.
   *
   * @returns The Browser websocket url.
   *
   * @remarks
   *
   * The format is `ws://${host}:${port}/devtools/browser/<id>`.
   *
   * You can find the `webSocketDebuggerUrl` from `http://${host}:${port}/json/version`.
   * Learn more about the
   * {@link https://chromedevtools.github.io/devtools-protocol | devtools protocol} and
   * the {@link
   * https://chromedevtools.github.io/devtools-protocol/#how-do-i-access-the-browser-target
   * | browser endpoint}.
   */
  wsEndpoint() {
    return __classPrivateFieldGet28(this, _Browser_connection, "f").url();
  }
  /**
   * Promise which resolves to a new {@link Page} object. The Page is created in
   * a default browser context.
   */
  async newPage() {
    return __classPrivateFieldGet28(this, _Browser_defaultContext, "f").newPage();
  }
  /**
   * @internal
   */
  async _createPageInContext(contextId) {
    const { targetId } = await __classPrivateFieldGet28(this, _Browser_connection, "f").send("Target.createTarget", {
      url: "about:blank",
      browserContextId: contextId || void 0
    });
    const target = __classPrivateFieldGet28(this, _Browser_targetManager, "f").getAvailableTargets().get(targetId);
    if (!target) {
      throw new Error(`Missing target for page (id = ${targetId})`);
    }
    const initialized = await target._initializedPromise;
    if (!initialized) {
      throw new Error(`Failed to create target for page (id = ${targetId})`);
    }
    const page = await target.page();
    if (!page) {
      throw new Error(`Failed to create a page for context (id = ${contextId})`);
    }
    return page;
  }
  /**
   * All active targets inside the Browser. In case of multiple browser contexts, returns
   * an array with all the targets in all browser contexts.
   */
  targets() {
    return Array.from(__classPrivateFieldGet28(this, _Browser_targetManager, "f").getAvailableTargets().values()).filter((target) => {
      return target._isInitialized;
    });
  }
  /**
   * The target associated with the browser.
   */
  target() {
    const browserTarget = this.targets().find((target) => {
      return target.type() === "browser";
    });
    if (!browserTarget) {
      throw new Error("Browser target is not found");
    }
    return browserTarget;
  }
  /**
   * Searches for a target in all browser contexts.
   *
   * @param predicate - A function to be run for every target.
   * @returns The first target found that matches the `predicate` function.
   *
   * @example
   *
   * An example of finding a target for a page opened via `window.open`:
   *
   * ```ts
   * await page.evaluate(() => window.open('https://www.example.com/'));
   * const newWindowTarget = await browser.waitForTarget(
   *   target => target.url() === 'https://www.example.com/'
   * );
   * ```
   */
  async waitForTarget(predicate, options = {}) {
    const { timeout = 3e4 } = options;
    let resolve;
    let isResolved = false;
    const targetPromise = new Promise((x) => {
      return resolve = x;
    });
    this.on("targetcreated", check);
    this.on("targetchanged", check);
    try {
      this.targets().forEach(check);
      if (!timeout) {
        return await targetPromise;
      }
      return await waitWithTimeout(targetPromise, "target", timeout);
    } finally {
      this.off("targetcreated", check);
      this.off("targetchanged", check);
    }
    async function check(target) {
      if (await predicate(target) && !isResolved) {
        isResolved = true;
        resolve(target);
      }
    }
  }
  /**
   * An array of all open pages inside the Browser.
   *
   * @remarks
   *
   * In case of multiple browser contexts, returns an array with all the pages in all
   * browser contexts. Non-visible pages, such as `"background_page"`, will not be listed
   * here. You can find them using {@link Target.page}.
   */
  async pages() {
    const contextPages = await Promise.all(this.browserContexts().map((context) => {
      return context.pages();
    }));
    return contextPages.reduce((acc, x) => {
      return acc.concat(x);
    }, []);
  }
  /**
   * A string representing the browser name and version.
   *
   * @remarks
   *
   * For headless Chromium, this is similar to `HeadlessChrome/61.0.3153.0`. For
   * non-headless, this is similar to `Chrome/61.0.3153.0`.
   *
   * The format of browser.version() might change with future releases of Chromium.
   */
  async version() {
    const version = await __classPrivateFieldGet28(this, _Browser_instances, "m", _Browser_getVersion).call(this);
    return version.product;
  }
  /**
   * The browser's original user agent. Pages can override the browser user agent with
   * {@link Page.setUserAgent}.
   */
  async userAgent() {
    const version = await __classPrivateFieldGet28(this, _Browser_instances, "m", _Browser_getVersion).call(this);
    return version.userAgent;
  }
  /**
   * Closes Chromium and all of its pages (if any were opened). The {@link Browser} object
   * itself is considered to be disposed and cannot be used anymore.
   */
  async close() {
    await __classPrivateFieldGet28(this, _Browser_closeCallback, "f").call(null);
    this.disconnect();
  }
  /**
   * Disconnects Puppeteer from the browser, but leaves the Chromium process running.
   * After calling `disconnect`, the {@link Browser} object is considered disposed and
   * cannot be used anymore.
   */
  disconnect() {
    __classPrivateFieldGet28(this, _Browser_targetManager, "f").dispose();
    __classPrivateFieldGet28(this, _Browser_connection, "f").dispose();
  }
  /**
   * Indicates that the browser is connected.
   */
  isConnected() {
    return !__classPrivateFieldGet28(this, _Browser_connection, "f")._closed;
  }
  /**
   * Get the BISO session ID associated with this browser
   */
  sessionId() {
    return __classPrivateFieldGet28(this, _Browser_sessionId, "f");
  }
};
_Browser_ignoreHTTPSErrors = /* @__PURE__ */ new WeakMap(), _Browser_defaultViewport = /* @__PURE__ */ new WeakMap(), _Browser_process = /* @__PURE__ */ new WeakMap(), _Browser_connection = /* @__PURE__ */ new WeakMap(), _Browser_closeCallback = /* @__PURE__ */ new WeakMap(), _Browser_targetFilterCallback = /* @__PURE__ */ new WeakMap(), _Browser_isPageTargetCallback = /* @__PURE__ */ new WeakMap(), _Browser_defaultContext = /* @__PURE__ */ new WeakMap(), _Browser_contexts = /* @__PURE__ */ new WeakMap(), _Browser_screenshotTaskQueue = /* @__PURE__ */ new WeakMap(), _Browser_targetManager = /* @__PURE__ */ new WeakMap(), _Browser_sessionId = /* @__PURE__ */ new WeakMap(), _Browser_emitDisconnected = /* @__PURE__ */ new WeakMap(), _Browser_createTarget = /* @__PURE__ */ new WeakMap(), _Browser_onAttachedToTarget = /* @__PURE__ */ new WeakMap(), _Browser_onDetachedFromTarget = /* @__PURE__ */ new WeakMap(), _Browser_onTargetChanged = /* @__PURE__ */ new WeakMap(), _Browser_onTargetDiscovered = /* @__PURE__ */ new WeakMap(), _Browser_instances = /* @__PURE__ */ new WeakSet(), _Browser_setIsPageTargetCallback = function _Browser_setIsPageTargetCallback2(isPageTargetCallback) {
  __classPrivateFieldSet26(this, _Browser_isPageTargetCallback, isPageTargetCallback || ((target) => {
    return target.type === "page" || target.type === "background_page" || target.type === "webview";
  }), "f");
}, _Browser_getVersion = function _Browser_getVersion2() {
  return __classPrivateFieldGet28(this, _Browser_connection, "f").send("Browser.getVersion");
};
var BrowserContext = class extends EventEmitter {
  /**
   * @internal
   */
  constructor(connection, browser, contextId) {
    super();
    _BrowserContext_connection.set(this, void 0);
    _BrowserContext_browser.set(this, void 0);
    _BrowserContext_id.set(this, void 0);
    __classPrivateFieldSet26(this, _BrowserContext_connection, connection, "f");
    __classPrivateFieldSet26(this, _BrowserContext_browser, browser, "f");
    __classPrivateFieldSet26(this, _BrowserContext_id, contextId, "f");
  }
  /**
   * An array of all active targets inside the browser context.
   */
  targets() {
    return __classPrivateFieldGet28(this, _BrowserContext_browser, "f").targets().filter((target) => {
      return target.browserContext() === this;
    });
  }
  /**
   * This searches for a target in this specific browser context.
   *
   * @example
   * An example of finding a target for a page opened via `window.open`:
   *
   * ```ts
   * await page.evaluate(() => window.open('https://www.example.com/'));
   * const newWindowTarget = await browserContext.waitForTarget(
   *   target => target.url() === 'https://www.example.com/'
   * );
   * ```
   *
   * @param predicate - A function to be run for every target
   * @param options - An object of options. Accepts a timout,
   * which is the maximum wait time in milliseconds.
   * Pass `0` to disable the timeout. Defaults to 30 seconds.
   * @returns Promise which resolves to the first target found
   * that matches the `predicate` function.
   */
  waitForTarget(predicate, options = {}) {
    return __classPrivateFieldGet28(this, _BrowserContext_browser, "f").waitForTarget((target) => {
      return target.browserContext() === this && predicate(target);
    }, options);
  }
  /**
   * An array of all pages inside the browser context.
   *
   * @returns Promise which resolves to an array of all open pages.
   * Non visible pages, such as `"background_page"`, will not be listed here.
   * You can find them using {@link Target.page | the target page}.
   */
  async pages() {
    const pages = await Promise.all(this.targets().filter((target) => {
      var _a2;
      return target.type() === "page" || target.type() === "other" && ((_a2 = __classPrivateFieldGet28(this, _BrowserContext_browser, "f")._getIsPageTargetCallback()) === null || _a2 === void 0 ? void 0 : _a2(target._getTargetInfo()));
    }).map((target) => {
      return target.page();
    }));
    return pages.filter((page) => {
      return !!page;
    });
  }
  /**
   * Returns whether BrowserContext is incognito.
   * The default browser context is the only non-incognito browser context.
   *
   * @remarks
   * The default browser context cannot be closed.
   */
  isIncognito() {
    return !!__classPrivateFieldGet28(this, _BrowserContext_id, "f");
  }
  /**
   * @example
   *
   * ```ts
   * const context = browser.defaultBrowserContext();
   * await context.overridePermissions('https://html5demos.com', [
   *   'geolocation',
   * ]);
   * ```
   *
   * @param origin - The origin to grant permissions to, e.g. "https://example.com".
   * @param permissions - An array of permissions to grant.
   * All permissions that are not listed here will be automatically denied.
   */
  async overridePermissions(origin, permissions) {
    const protocolPermissions = permissions.map((permission) => {
      const protocolPermission = WEB_PERMISSION_TO_PROTOCOL_PERMISSION.get(permission);
      if (!protocolPermission) {
        throw new Error("Unknown permission: " + permission);
      }
      return protocolPermission;
    });
    await __classPrivateFieldGet28(this, _BrowserContext_connection, "f").send("Browser.grantPermissions", {
      origin,
      browserContextId: __classPrivateFieldGet28(this, _BrowserContext_id, "f") || void 0,
      permissions: protocolPermissions
    });
  }
  /**
   * Clears all permission overrides for the browser context.
   *
   * @example
   *
   * ```ts
   * const context = browser.defaultBrowserContext();
   * context.overridePermissions('https://example.com', ['clipboard-read']);
   * // do stuff ..
   * context.clearPermissionOverrides();
   * ```
   */
  async clearPermissionOverrides() {
    await __classPrivateFieldGet28(this, _BrowserContext_connection, "f").send("Browser.resetPermissions", {
      browserContextId: __classPrivateFieldGet28(this, _BrowserContext_id, "f") || void 0
    });
  }
  /**
   * Creates a new page in the browser context.
   */
  newPage() {
    return __classPrivateFieldGet28(this, _BrowserContext_browser, "f")._createPageInContext(__classPrivateFieldGet28(this, _BrowserContext_id, "f"));
  }
  /**
   * The browser this browser context belongs to.
   */
  browser() {
    return __classPrivateFieldGet28(this, _BrowserContext_browser, "f");
  }
  /**
   * Closes the browser context. All the targets that belong to the browser context
   * will be closed.
   *
   * @remarks
   * Only incognito browser contexts can be closed.
   */
  async close() {
    assert(__classPrivateFieldGet28(this, _BrowserContext_id, "f"), "Non-incognito profiles cannot be closed!");
    await __classPrivateFieldGet28(this, _BrowserContext_browser, "f")._disposeContext(__classPrivateFieldGet28(this, _BrowserContext_id, "f"));
  }
};
_BrowserContext_connection = /* @__PURE__ */ new WeakMap(), _BrowserContext_browser = /* @__PURE__ */ new WeakMap(), _BrowserContext_id = /* @__PURE__ */ new WeakMap();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/BrowserWebSocketTransport.js
init_checked_fetch();
init_modules_watch_stub();
var __classPrivateFieldSet27 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet29 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BrowserWebSocketTransport_ws;
var BrowserWebSocketTransport = class {
  constructor(ws) {
    _BrowserWebSocketTransport_ws.set(this, void 0);
    __classPrivateFieldSet27(this, _BrowserWebSocketTransport_ws, ws, "f");
    __classPrivateFieldGet29(this, _BrowserWebSocketTransport_ws, "f").addEventListener("message", (event) => {
      if (this.onmessage) {
        this.onmessage.call(null, event.data);
      }
    });
    __classPrivateFieldGet29(this, _BrowserWebSocketTransport_ws, "f").addEventListener("close", () => {
      if (this.onclose) {
        this.onclose.call(null);
      }
    });
    __classPrivateFieldGet29(this, _BrowserWebSocketTransport_ws, "f").addEventListener("error", () => {
    });
  }
  static create(url) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(url);
      ws.addEventListener("open", () => {
        return resolve(new BrowserWebSocketTransport(ws));
      });
      ws.addEventListener("error", reject);
    });
  }
  send(message) {
    __classPrivateFieldGet29(this, _BrowserWebSocketTransport_ws, "f").send(message);
  }
  close() {
    __classPrivateFieldGet29(this, _BrowserWebSocketTransport_ws, "f").close();
  }
};
_BrowserWebSocketTransport_ws = /* @__PURE__ */ new WeakMap();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/fetch.js
init_checked_fetch();
init_modules_watch_stub();
var getFetch = async () => {
  return globalThis.fetch;
};

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/BrowserConnector.js
var getWebSocketTransportClass = async () => {
  return BrowserWebSocketTransport;
};
async function _connectToBrowser(options) {
  const { browserWSEndpoint, browserURL, ignoreHTTPSErrors = false, defaultViewport = { width: 800, height: 600 }, transport, slowMo = 0, targetFilter, _isPageTarget: isPageTarget, sessionId = "unknown" } = options;
  assert(Number(!!browserWSEndpoint) + Number(!!browserURL) + Number(!!transport) === 1, "Exactly one of browserWSEndpoint, browserURL or transport must be passed to puppeteer.connect");
  let connection;
  if (transport) {
    connection = new Connection("", transport, slowMo);
  } else if (browserWSEndpoint) {
    const WebSocketClass = await getWebSocketTransportClass();
    const connectionTransport = await WebSocketClass.create(browserWSEndpoint);
    connection = new Connection(browserWSEndpoint, connectionTransport, slowMo);
  } else if (browserURL) {
    const connectionURL = await getWSEndpoint(browserURL);
    const WebSocketClass = await getWebSocketTransportClass();
    const connectionTransport = await WebSocketClass.create(connectionURL);
    connection = new Connection(connectionURL, connectionTransport, slowMo);
  }
  const version = await connection.send("Browser.getVersion");
  const product = version.product.toLowerCase().includes("firefox") ? "firefox" : "chrome";
  const { browserContextIds } = await connection.send("Target.getBrowserContexts");
  const browser = await Browser._create(product || "chrome", connection, browserContextIds, ignoreHTTPSErrors, defaultViewport, void 0, () => {
    return connection.send("Browser.close").catch(debugError);
  }, targetFilter, isPageTarget, sessionId);
  await browser.pages();
  return browser;
}
async function getWSEndpoint(browserURL) {
  const endpointURL = new URL("/json/version", browserURL);
  const fetch = await getFetch();
  try {
    const result = await fetch(endpointURL.toString(), {
      method: "GET"
    });
    if (!result.ok) {
      throw new Error(`HTTP ${result.statusText}`);
    }
    const data = await result.json();
    return data.webSocketDebuggerUrl;
  } catch (error) {
    if (isErrorLike(error)) {
      error.message = `Failed to fetch browser webSocket URL from ${endpointURL}: ` + error.message;
    }
    throw error;
  }
}

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/DeviceDescriptors.js
init_checked_fetch();
init_modules_watch_stub();
var deviceArray = [
  {
    name: "Blackberry PlayBook",
    userAgent: "Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML like Gecko) Version/7.2.1.0 Safari/536.2+",
    viewport: {
      width: 600,
      height: 1024,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Blackberry PlayBook landscape",
    userAgent: "Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML like Gecko) Version/7.2.1.0 Safari/536.2+",
    viewport: {
      width: 1024,
      height: 600,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "BlackBerry Z30",
    userAgent: "Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+",
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "BlackBerry Z30 landscape",
    userAgent: "Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Galaxy Note 3",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Galaxy Note 3 landscape",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Galaxy Note II",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.1; en-us; GT-N7100 Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Galaxy Note II landscape",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.1; en-us; GT-N7100 Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Galaxy S III",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Galaxy S III landscape",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Galaxy S5",
    userAgent: "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Galaxy S5 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Galaxy S8",
    userAgent: "Mozilla/5.0 (Linux; Android 7.0; SM-G950U Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36",
    viewport: {
      width: 360,
      height: 740,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Galaxy S8 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 7.0; SM-G950U Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36",
    viewport: {
      width: 740,
      height: 360,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Galaxy S9+",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0.0; SM-G965U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.111 Mobile Safari/537.36",
    viewport: {
      width: 320,
      height: 658,
      deviceScaleFactor: 4.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Galaxy S9+ landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0.0; SM-G965U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.111 Mobile Safari/537.36",
    viewport: {
      width: 658,
      height: 320,
      deviceScaleFactor: 4.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Galaxy Tab S4",
    userAgent: "Mozilla/5.0 (Linux; Android 8.1.0; SM-T837A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Safari/537.36",
    viewport: {
      width: 712,
      height: 1138,
      deviceScaleFactor: 2.25,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Galaxy Tab S4 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 8.1.0; SM-T837A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Safari/537.36",
    viewport: {
      width: 1138,
      height: 712,
      deviceScaleFactor: 2.25,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPad",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
    viewport: {
      width: 768,
      height: 1024,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPad landscape",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
    viewport: {
      width: 1024,
      height: 768,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPad (gen 6)",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 768,
      height: 1024,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPad (gen 6) landscape",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 1024,
      height: 768,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPad (gen 7)",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 810,
      height: 1080,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPad (gen 7) landscape",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 1080,
      height: 810,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPad Mini",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
    viewport: {
      width: 768,
      height: 1024,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPad Mini landscape",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
    viewport: {
      width: 1024,
      height: 768,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPad Pro",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
    viewport: {
      width: 1024,
      height: 1366,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPad Pro landscape",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
    viewport: {
      width: 1366,
      height: 1024,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPad Pro 11",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 834,
      height: 1194,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPad Pro 11 landscape",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 1194,
      height: 834,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 4",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53",
    viewport: {
      width: 320,
      height: 480,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 4 landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53",
    viewport: {
      width: 480,
      height: 320,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 5",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
    viewport: {
      width: 320,
      height: 568,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 5 landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
    viewport: {
      width: 568,
      height: 320,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 6",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 6 landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 667,
      height: 375,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 6 Plus",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 414,
      height: 736,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 6 Plus landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 736,
      height: 414,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 7",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 7 landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 667,
      height: 375,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 7 Plus",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 414,
      height: 736,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 7 Plus landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 736,
      height: 414,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 8",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 8 landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 667,
      height: 375,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 8 Plus",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 414,
      height: 736,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 8 Plus landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 736,
      height: 414,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone SE",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
    viewport: {
      width: 320,
      height: 568,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone SE landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
    viewport: {
      width: 568,
      height: 320,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone X",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 375,
      height: 812,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone X landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 812,
      height: 375,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone XR",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 414,
      height: 896,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone XR landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 896,
      height: 414,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 11",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 414,
      height: 828,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 11 landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 828,
      height: 414,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 11 Pro",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 375,
      height: 812,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 11 Pro landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 812,
      height: 375,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 11 Pro Max",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 414,
      height: 896,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 11 Pro Max landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 896,
      height: 414,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 12",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 12 landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 844,
      height: 390,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 12 Pro",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 12 Pro landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 844,
      height: 390,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 12 Pro Max",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 428,
      height: 926,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 12 Pro Max landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 926,
      height: 428,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 12 Mini",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 375,
      height: 812,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 12 Mini landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 812,
      height: 375,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 13",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 13 landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 844,
      height: 390,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 13 Pro",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 13 Pro landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 844,
      height: 390,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 13 Pro Max",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 428,
      height: 926,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 13 Pro Max landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 926,
      height: 428,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 13 Mini",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 375,
      height: 812,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 13 Mini landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 812,
      height: 375,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "JioPhone 2",
    userAgent: "Mozilla/5.0 (Mobile; LYF/F300B/LYF-F300B-001-01-15-130718-i;Android; rv:48.0) Gecko/48.0 Firefox/48.0 KAIOS/2.5",
    viewport: {
      width: 240,
      height: 320,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "JioPhone 2 landscape",
    userAgent: "Mozilla/5.0 (Mobile; LYF/F300B/LYF-F300B-001-01-15-130718-i;Android; rv:48.0) Gecko/48.0 Firefox/48.0 KAIOS/2.5",
    viewport: {
      width: 320,
      height: 240,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Kindle Fire HDX",
    userAgent: "Mozilla/5.0 (Linux; U; en-us; KFAPWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true",
    viewport: {
      width: 800,
      height: 1280,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Kindle Fire HDX landscape",
    userAgent: "Mozilla/5.0 (Linux; U; en-us; KFAPWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true",
    viewport: {
      width: 1280,
      height: 800,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "LG Optimus L70",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; LGMS323 Build/KOT49I.MS32310c) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 384,
      height: 640,
      deviceScaleFactor: 1.25,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "LG Optimus L70 landscape",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; LGMS323 Build/KOT49I.MS32310c) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 640,
      height: 384,
      deviceScaleFactor: 1.25,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Microsoft Lumia 550",
    userAgent: "Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 550) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Microsoft Lumia 950",
    userAgent: "Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263",
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 4,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Microsoft Lumia 950 landscape",
    userAgent: "Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 4,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nexus 10",
    userAgent: "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 10 Build/MOB31T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36",
    viewport: {
      width: 800,
      height: 1280,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nexus 10 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 10 Build/MOB31T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36",
    viewport: {
      width: 1280,
      height: 800,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nexus 4",
    userAgent: "Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 384,
      height: 640,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nexus 4 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 640,
      height: 384,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nexus 5",
    userAgent: "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nexus 5 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nexus 5X",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0.0; Nexus 5X Build/OPR4.170623.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 412,
      height: 732,
      deviceScaleFactor: 2.625,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nexus 5X landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0.0; Nexus 5X Build/OPR4.170623.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 732,
      height: 412,
      deviceScaleFactor: 2.625,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nexus 6",
    userAgent: "Mozilla/5.0 (Linux; Android 7.1.1; Nexus 6 Build/N6F26U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 412,
      height: 732,
      deviceScaleFactor: 3.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nexus 6 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 7.1.1; Nexus 6 Build/N6F26U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 732,
      height: 412,
      deviceScaleFactor: 3.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nexus 6P",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0.0; Nexus 6P Build/OPP3.170518.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 412,
      height: 732,
      deviceScaleFactor: 3.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nexus 6P landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0.0; Nexus 6P Build/OPP3.170518.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 732,
      height: 412,
      deviceScaleFactor: 3.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nexus 7",
    userAgent: "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 7 Build/MOB30X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36",
    viewport: {
      width: 600,
      height: 960,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nexus 7 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 7 Build/MOB30X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36",
    viewport: {
      width: 960,
      height: 600,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nokia Lumia 520",
    userAgent: "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 520)",
    viewport: {
      width: 320,
      height: 533,
      deviceScaleFactor: 1.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nokia Lumia 520 landscape",
    userAgent: "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 520)",
    viewport: {
      width: 533,
      height: 320,
      deviceScaleFactor: 1.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nokia N9",
    userAgent: "Mozilla/5.0 (MeeGo; NokiaN9) AppleWebKit/534.13 (KHTML, like Gecko) NokiaBrowser/8.5.0 Mobile Safari/534.13",
    viewport: {
      width: 480,
      height: 854,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nokia N9 landscape",
    userAgent: "Mozilla/5.0 (MeeGo; NokiaN9) AppleWebKit/534.13 (KHTML, like Gecko) NokiaBrowser/8.5.0 Mobile Safari/534.13",
    viewport: {
      width: 854,
      height: 480,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Pixel 2",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 411,
      height: 731,
      deviceScaleFactor: 2.625,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Pixel 2 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 731,
      height: 411,
      deviceScaleFactor: 2.625,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Pixel 2 XL",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 411,
      height: 823,
      deviceScaleFactor: 3.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Pixel 2 XL landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 823,
      height: 411,
      deviceScaleFactor: 3.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Pixel 3",
    userAgent: "Mozilla/5.0 (Linux; Android 9; Pixel 3 Build/PQ1A.181105.017.A1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.158 Mobile Safari/537.36",
    viewport: {
      width: 393,
      height: 786,
      deviceScaleFactor: 2.75,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Pixel 3 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 9; Pixel 3 Build/PQ1A.181105.017.A1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.158 Mobile Safari/537.36",
    viewport: {
      width: 786,
      height: 393,
      deviceScaleFactor: 2.75,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Pixel 4",
    userAgent: "Mozilla/5.0 (Linux; Android 10; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36",
    viewport: {
      width: 353,
      height: 745,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Pixel 4 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 10; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36",
    viewport: {
      width: 745,
      height: 353,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Pixel 4a (5G)",
    userAgent: "Mozilla/5.0 (Linux; Android 11; Pixel 4a (5G)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4812.0 Mobile Safari/537.36",
    viewport: {
      width: 353,
      height: 745,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Pixel 4a (5G) landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 11; Pixel 4a (5G)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4812.0 Mobile Safari/537.36",
    viewport: {
      width: 745,
      height: 353,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Pixel 5",
    userAgent: "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4812.0 Mobile Safari/537.36",
    viewport: {
      width: 393,
      height: 851,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Pixel 5 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4812.0 Mobile Safari/537.36",
    viewport: {
      width: 851,
      height: 393,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Moto G4",
    userAgent: "Mozilla/5.0 (Linux; Android 7.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4812.0 Mobile Safari/537.36",
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Moto G4 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 7.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4812.0 Mobile Safari/537.36",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  }
];
var devices = {};
for (const device of deviceArray) {
  devices[device.name] = device;
}

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/NetworkConditions.js
init_checked_fetch();
init_modules_watch_stub();
var networkConditions = Object.freeze({
  "Slow 3G": {
    download: 500 * 1e3 / 8 * 0.8,
    upload: 500 * 1e3 / 8 * 0.8,
    latency: 400 * 5
  },
  "Fast 3G": {
    download: 1.6 * 1e3 * 1e3 / 8 * 0.9,
    upload: 750 * 1e3 / 8 * 0.9,
    latency: 150 * 3.75
  }
});

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Puppeteer.js
var Puppeteer = class {
  /**
   * @internal
   */
  constructor(settings) {
    this._changedProduct = false;
    this._isPuppeteerCore = settings.isPuppeteerCore;
    this.connect = this.connect.bind(this);
  }
  /**
   * This method attaches Puppeteer to an existing browser instance.
   *
   * @remarks
   *
   * @param options - Set of configurable options to set on the browser.
   * @returns Promise which resolves to browser instance.
   */
  connect(options) {
    return _connectToBrowser(options);
  }
  /**
   * @deprecated Import directly puppeteer.
   * @example
   *
   * ```ts
   * import {devices} from 'puppeteer';
   * ```
   */
  get devices() {
    return devices;
  }
  /**
   * @deprecated Import directly puppeteer.
   * @example
   *
   * ```ts
   * import {errors} from 'puppeteer';
   * ```
   */
  get errors() {
    return errors;
  }
  /**
   * @deprecated Import directly puppeteer.
   * @example
   *
   * ```ts
   * import {networkConditions} from 'puppeteer';
   * ```
   */
  get networkConditions() {
    return networkConditions;
  }
  /**
   * @deprecated Import directly puppeteer.
   * @example
   *
   * ```ts
   * import {registerCustomQueryHandler} from 'puppeteer';
   * ```
   */
  registerCustomQueryHandler(name, queryHandler) {
    return registerCustomQueryHandler(name, queryHandler);
  }
  /**
   * @deprecated Import directly puppeteer.
   * @example
   *
   * ```ts
   * import {unregisterCustomQueryHandler} from 'puppeteer';
   * ```
   */
  unregisterCustomQueryHandler(name) {
    return unregisterCustomQueryHandler(name);
  }
  /**
   * @deprecated Import directly puppeteer.
   * @example
   *
   * ```ts
   * import {customQueryHandlerNames} from 'puppeteer';
   * ```
   */
  customQueryHandlerNames() {
    return customQueryHandlerNames();
  }
  /**
   * @deprecated Import directly puppeteer.
   * @example
   *
   * ```ts
   * import {clearCustomQueryHandlers} from 'puppeteer';
   * ```
   */
  clearCustomQueryHandlers() {
    return clearCustomQueryHandlers();
  }
};

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/WorkersWebSocketTransport.js
init_checked_fetch();
init_modules_watch_stub();

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/chunking.js
init_checked_fetch();
init_modules_watch_stub();
var HEADER_SIZE = 4;
var MAX_MESSAGE_SIZE = 1048575;
var FIRST_CHUNK_DATA_SIZE = MAX_MESSAGE_SIZE - HEADER_SIZE;
var messageToChunks = (data) => {
  const encoder = new TextEncoder();
  const encodedUint8Array = encoder.encode(data);
  const firstChunk = new Uint8Array(Math.min(MAX_MESSAGE_SIZE, HEADER_SIZE + encodedUint8Array.length));
  const view = new DataView(firstChunk.buffer);
  view.setUint32(0, encodedUint8Array.length, true);
  firstChunk.set(encodedUint8Array.slice(0, FIRST_CHUNK_DATA_SIZE), HEADER_SIZE);
  const chunks = [firstChunk];
  for (let i = FIRST_CHUNK_DATA_SIZE; i < data.length; i += MAX_MESSAGE_SIZE) {
    chunks.push(encodedUint8Array.slice(i, i + MAX_MESSAGE_SIZE));
  }
  return chunks;
};
var chunksToMessage = (chunks, sessionid) => {
  if (chunks.length === 0) {
    return null;
  }
  const emptyBuffer = new Uint8Array(0);
  const firstChunk = chunks[0] || emptyBuffer;
  const view = new DataView(firstChunk.buffer);
  const expectedBytes = view.getUint32(0, true);
  let totalBytes = -HEADER_SIZE;
  for (let i = 0; i < chunks.length; ++i) {
    const curChunk = chunks[i] || emptyBuffer;
    totalBytes += curChunk.length;
    if (totalBytes > expectedBytes) {
      throw new Error(`Should have gotten the exact number of bytes but we got more.  SessionID: ${sessionid}`);
    }
    if (totalBytes === expectedBytes) {
      const chunksToCombine = chunks.splice(0, i + 1);
      chunksToCombine[0] = firstChunk.subarray(HEADER_SIZE);
      const combined = new Uint8Array(expectedBytes);
      let offset = 0;
      for (let j = 0; j <= i; ++j) {
        const chunk = chunksToCombine[j] || emptyBuffer;
        combined.set(chunk, offset);
        offset += chunk.length;
      }
      const decoder = new TextDecoder();
      const message = decoder.decode(combined);
      return message;
    }
  }
  return null;
};

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/WorkersWebSocketTransport.js
var WorkersWebSocketTransport = class {
  constructor(ws, sessionid) {
    this.chunks = [];
    this.pingInterval = setInterval(() => {
      return this.ws.send("ping");
    }, 1e3);
    this.ws = ws;
    this.sessionId = sessionid;
    this.ws.addEventListener("message", (event) => {
      this.chunks.push(new Uint8Array(event.data));
      const message = chunksToMessage(this.chunks, sessionid);
      if (message && this.onmessage) {
        this.onmessage(message);
      }
    });
    this.ws.addEventListener("close", () => {
      console.log("websocket closed");
      clearInterval(this.pingInterval);
      if (this.onclose) {
        this.onclose();
      }
    });
    this.ws.addEventListener("error", (e) => {
      console.error(`Websocket error: SessionID: ${sessionid}`, e);
      clearInterval(this.pingInterval);
    });
  }
  static async create(endpoint, sessionid) {
    const path = `https://fake.host/v1/connectDevtools?browser_session=${sessionid}`;
    const response = await endpoint.fetch(path, {
      headers: { Upgrade: "websocket" }
    });
    response.webSocket.accept();
    return new WorkersWebSocketTransport(response.webSocket, sessionid);
  }
  send(message) {
    for (const chunk of messageToChunks(message)) {
      this.ws.send(chunk);
    }
  }
  close() {
    console.log("closing websocket");
    clearInterval(this.pingInterval);
    this.ws.close();
  }
  toString() {
    return this.sessionId;
  }
};

// ../../node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/puppeteer-core.js
var FAKE_HOST = "https://fake.host";
var PuppeteerWorkers = class extends Puppeteer {
  constructor() {
    super({ isPuppeteerCore: true });
    this.connect = this.connect.bind(this);
    this.launch = this.launch.bind(this);
    this.sessions = this.sessions.bind(this);
    this.history = this.history.bind(this);
    this.limits = this.limits.bind(this);
  }
  /**
   * Launch a browser session.
   *
   * @param endpoint - Cloudflare worker binding
   * @returns a browser session or throws
   */
  async launch(endpoint, options) {
    let acquireUrl = `${FAKE_HOST}/v1/acquire`;
    if (options === null || options === void 0 ? void 0 : options.keep_alive) {
      acquireUrl = `${acquireUrl}?keep_alive=${options.keep_alive}`;
    }
    const res = await endpoint.fetch(acquireUrl);
    const status = res.status;
    const text = await res.text();
    if (status !== 200) {
      throw new Error(`Unable to create new browser: code: ${status}: message: ${text}`);
    }
    const response = JSON.parse(text);
    return this.connect(endpoint, response.sessionId);
  }
  /**
   * Returns active sessions
   *
   * @remarks
   * Sessions with a connnectionId already have a worker connection established
   *
   * @param endpoint - Cloudflare worker binding
   * @returns List of active sessions
   */
  async sessions(endpoint) {
    const res = await endpoint.fetch(`${FAKE_HOST}/v1/sessions`);
    const status = res.status;
    const text = await res.text();
    if (status !== 200) {
      throw new Error(`Unable to fetch new sessions: code: ${status}: message: ${text}`);
    }
    const data = JSON.parse(text);
    return data.sessions;
  }
  /**
   * Returns recent sessions (active and closed)
   *
   * @param endpoint - Cloudflare worker binding
   * @returns List of recent sessions (active and closed)
   */
  async history(endpoint) {
    const res = await endpoint.fetch(`${FAKE_HOST}/v1/history`);
    const status = res.status;
    const text = await res.text();
    if (status !== 200) {
      throw new Error(`Unable to fetch account history: code: ${status}: message: ${text}`);
    }
    const data = JSON.parse(text);
    return data.history;
  }
  /**
   * Returns current limits
   *
   * @param endpoint - Cloudflare worker binding
   * @returns current limits
   */
  async limits(endpoint) {
    const res = await endpoint.fetch(`${FAKE_HOST}/v1/limits`);
    const status = res.status;
    const text = await res.text();
    if (status !== 200) {
      throw new Error(`Unable to fetch account limits: code: ${status}: message: ${text}`);
    }
    const data = JSON.parse(text);
    return data;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async connect(endpointOrOptions, sessionId) {
    if (!sessionId) {
      return super.connect(endpointOrOptions);
    }
    const endpoint = endpointOrOptions;
    try {
      const transport = await WorkersWebSocketTransport.create(endpoint, sessionId);
      return super.connect({ transport, sessionId });
    } catch (e) {
      throw new Error(`Unable to connect to existing session ${sessionId} (it may still be in use or not ready yet) - retry or launch a new browser: ${e}`);
    }
  }
};
var puppeteer = new PuppeteerWorkers();
var puppeteer_core_default = puppeteer;
var { connect, launch, sessions, history, limits } = puppeteer;

// src/index.ts
var src_default = {
  async fetch(request, env) {
    const { searchParams } = new URL(request.url);
    let url = searchParams.get("url");
    let img;
    if (url) {
      url = new URL(url).toString();
      img = await env.BROWSER_KV_SPIKE_LAND.get(url, { type: "arrayBuffer" });
      if (img === null) {
        const browser = await puppeteer_core_default.launch(env.MY_WORKER_BROWSER);
        const page = await browser.newPage();
        await page.goto(url);
        await wait(1e3);
        img = await page.screenshot();
        await env.BROWSER_KV_SPIKE_LAND.put(url, img, {
          expirationTtl: 60 * 60 * 24
        });
        await browser.close();
      }
      return new Response(img, {
        headers: {
          "content-type": "image/jpeg"
        }
      });
    } else {
      return new Response(
        "Please add an ?url=https://example.com/ parameter"
      );
    }
  }
};
async function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });
}

// ../../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_checked_fetch();
init_modules_watch_stub();
var drainBody = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
};
var middleware_ensure_req_body_drained_default = drainBody;

// .wrangler/tmp/bundle-hgBKMG/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default
];
var middleware_insertion_facade_default = src_default;

// ../../node_modules/wrangler/templates/middleware/common.ts
init_checked_fetch();
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}

// .wrangler/tmp/bundle-hgBKMG/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  };
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      };
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default,
  wait
};
//# sourceMappingURL=index.js.map

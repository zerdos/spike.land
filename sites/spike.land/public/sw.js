"use strict";
(() => {
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
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // <define:process>
  var init_define_process = __esm({
    "<define:process>"() {
    }
  });

  // ../../node_modules/lodash.throttle/index.js
  var require_lodash = __commonJS({
    "../../node_modules/lodash.throttle/index.js"(exports, module) {
      init_define_process();
      var FUNC_ERROR_TEXT = "Expected a function";
      var NAN = 0 / 0;
      var symbolTag = "[object Symbol]";
      var reTrim = /^\s+|\s+$/g;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsOctal = /^0o[0-7]+$/i;
      var freeParseInt = parseInt;
      var freeGlobal = typeof self == "object" && self && self.Object === Object && self;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var objectProto = Object.prototype;
      var objectToString = objectProto.toString;
      var nativeMax = Math.max;
      var nativeMin = Math.min;
      var now = function() {
        return root.Date.now();
      };
      function debounce2(func, wait2, options) {
        var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        wait2 = toNumber(wait2) || 0;
        if (isObject(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait2) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          lastArgs = lastThis = void 0;
          lastInvokeTime = time;
          result = func.apply(thisArg, args);
          return result;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout(timerExpired, wait2);
          return leading ? invokeFunc(time) : result;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait2 - timeSinceLastCall;
          return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === void 0 || timeSinceLastCall >= wait2 || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = void 0;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = void 0;
          return result;
        }
        function cancel() {
          if (timerId !== void 0) {
            clearTimeout(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = void 0;
        }
        function flush() {
          return timerId === void 0 ? result : trailingEdge(now());
        }
        function debounced() {
          var time = now(), isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === void 0) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              timerId = setTimeout(timerExpired, wait2);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === void 0) {
            timerId = setTimeout(timerExpired, wait2);
          }
          return result;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      function throttle2(func, wait2, options) {
        var leading = true, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        if (isObject(options)) {
          leading = "leading" in options ? !!options.leading : leading;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        return debounce2(func, wait2, {
          "leading": leading,
          "maxWait": wait2,
          "trailing": trailing
        });
      }
      function isObject(value) {
        var type = typeof value;
        return !!value && (type == "object" || type == "function");
      }
      function isObjectLike(value) {
        return !!value && typeof value == "object";
      }
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
      }
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        if (isObject(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = value.replace(reTrim, "");
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      module.exports = throttle2;
    }
  });

  // ../../node_modules/lodash.debounce/index.js
  var require_lodash2 = __commonJS({
    "../../node_modules/lodash.debounce/index.js"(exports, module) {
      init_define_process();
      var FUNC_ERROR_TEXT = "Expected a function";
      var NAN = 0 / 0;
      var symbolTag = "[object Symbol]";
      var reTrim = /^\s+|\s+$/g;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsOctal = /^0o[0-7]+$/i;
      var freeParseInt = parseInt;
      var freeGlobal = typeof self == "object" && self && self.Object === Object && self;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var objectProto = Object.prototype;
      var objectToString = objectProto.toString;
      var nativeMax = Math.max;
      var nativeMin = Math.min;
      var now = function() {
        return root.Date.now();
      };
      function debounce2(func, wait2, options) {
        var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        wait2 = toNumber(wait2) || 0;
        if (isObject(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait2) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          lastArgs = lastThis = void 0;
          lastInvokeTime = time;
          result = func.apply(thisArg, args);
          return result;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout(timerExpired, wait2);
          return leading ? invokeFunc(time) : result;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait2 - timeSinceLastCall;
          return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === void 0 || timeSinceLastCall >= wait2 || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = void 0;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = void 0;
          return result;
        }
        function cancel() {
          if (timerId !== void 0) {
            clearTimeout(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = void 0;
        }
        function flush() {
          return timerId === void 0 ? result : trailingEdge(now());
        }
        function debounced() {
          var time = now(), isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === void 0) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              timerId = setTimeout(timerExpired, wait2);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === void 0) {
            timerId = setTimeout(timerExpired, wait2);
          }
          return result;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      function isObject(value) {
        var type = typeof value;
        return !!value && (type == "object" || type == "function");
      }
      function isObjectLike(value) {
        return !!value && typeof value == "object";
      }
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
      }
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        if (isObject(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = value.replace(reTrim, "");
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      module.exports = debounce2;
    }
  });

  // (disabled):os
  var require_os = __commonJS({
    "(disabled):os"() {
      init_define_process();
    }
  });

  // sw.mjs
  init_define_process();

  // service/util.js
  init_define_process();
  var toReadableStream = (source) => {
    const iterator = source[Symbol.asyncIterator]();
    return new ReadableStream({
      async pull(controller) {
        try {
          const chunk = await iterator.next();
          if (chunk.done) {
            controller.close();
          } else {
            controller.enqueue(chunk.value);
          }
        } catch (error) {
          controller.error(error);
        }
      },
      cancel(reason) {
        if (source.return) {
          source.return(reason);
        }
      }
    });
  };

  // sw.mjs
  var import_lodash = __toESM(require_lodash(), 1);
  var import_lodash2 = __toESM(require_lodash2(), 1);

  // ../../node_modules/p-map/index.js
  init_define_process();

  // ../../node_modules/p-map/node_modules/aggregate-error/index.js
  init_define_process();

  // ../../node_modules/p-map/node_modules/indent-string/index.js
  init_define_process();
  function indentString(string, count = 1, options = {}) {
    const {
      indent = " ",
      includeEmptyLines = false
    } = options;
    if (typeof string !== "string") {
      throw new TypeError(
        `Expected \`input\` to be a \`string\`, got \`${typeof string}\``
      );
    }
    if (typeof count !== "number") {
      throw new TypeError(
        `Expected \`count\` to be a \`number\`, got \`${typeof count}\``
      );
    }
    if (count < 0) {
      throw new RangeError(
        `Expected \`count\` to be at least 0, got \`${count}\``
      );
    }
    if (typeof indent !== "string") {
      throw new TypeError(
        `Expected \`options.indent\` to be a \`string\`, got \`${typeof indent}\``
      );
    }
    if (count === 0) {
      return string;
    }
    const regex = includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
    return string.replace(regex, indent.repeat(count));
  }

  // ../../node_modules/p-map/node_modules/clean-stack/index.js
  init_define_process();
  var import_os = __toESM(require_os(), 1);

  // ../../node_modules/p-map/node_modules/escape-string-regexp/index.js
  init_define_process();
  function escapeStringRegexp(string) {
    if (typeof string !== "string") {
      throw new TypeError("Expected a string");
    }
    return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
  }

  // ../../node_modules/p-map/node_modules/clean-stack/index.js
  var extractPathRegex = /\s+at.*[(\s](.*)\)?/;
  var pathRegex = /^(?:(?:(?:node|node:[\w/]+|(?:(?:node:)?internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)(?:\.js)?:\d+:\d+)|native)/;
  var homeDir = typeof import_os.default.homedir === "undefined" ? "" : import_os.default.homedir().replace(/\\/g, "/");
  function cleanStack(stack, { pretty = false, basePath } = {}) {
    const basePathRegex = basePath && new RegExp(`(at | \\()${escapeStringRegexp(basePath.replace(/\\/g, "/"))}`, "g");
    if (typeof stack !== "string") {
      return void 0;
    }
    return stack.replace(/\\/g, "/").split("\n").filter((line) => {
      const pathMatches = line.match(extractPathRegex);
      if (pathMatches === null || !pathMatches[1]) {
        return true;
      }
      const match = pathMatches[1];
      if (match.includes(".app/Contents/Resources/electron.asar") || match.includes(".app/Contents/Resources/default_app.asar") || match.includes("node_modules/electron/dist/resources/electron.asar") || match.includes("node_modules/electron/dist/resources/default_app.asar")) {
        return false;
      }
      return !pathRegex.test(match);
    }).filter((line) => line.trim() !== "").map((line) => {
      if (basePathRegex) {
        line = line.replace(basePathRegex, "$1");
      }
      if (pretty) {
        line = line.replace(extractPathRegex, (m, p1) => m.replace(p1, p1.replace(homeDir, "~")));
      }
      return line;
    }).join("\n");
  }

  // ../../node_modules/p-map/node_modules/aggregate-error/index.js
  var cleanInternalStack = (stack) => stack.replace(/\s+at .*aggregate-error\/index.js:\d+:\d+\)?/g, "");
  var AggregateError = class extends Error {
    #errors;
    name = "AggregateError";
    constructor(errors) {
      if (!Array.isArray(errors)) {
        throw new TypeError(`Expected input to be an Array, got ${typeof errors}`);
      }
      errors = errors.map((error) => {
        if (error instanceof Error) {
          return error;
        }
        if (error !== null && typeof error === "object") {
          return Object.assign(new Error(error.message), error);
        }
        return new Error(error);
      });
      let message = errors.map((error) => {
        return typeof error.stack === "string" && error.stack.length > 0 ? cleanInternalStack(cleanStack(error.stack)) : String(error);
      }).join("\n");
      message = "\n" + indentString(message, 4);
      super(message);
      this.#errors = errors;
    }
    get errors() {
      return this.#errors.slice();
    }
  };

  // ../../node_modules/p-map/index.js
  var AbortError = class extends Error {
    constructor(message) {
      super();
      this.name = "AbortError";
      this.message = message;
    }
  };
  var getDOMException = (errorMessage) => globalThis.DOMException === void 0 ? new AbortError(errorMessage) : new DOMException(errorMessage);
  var getAbortedReason = (signal) => {
    const reason = signal.reason === void 0 ? getDOMException("This operation was aborted.") : signal.reason;
    return reason instanceof Error ? reason : getDOMException(reason);
  };
  async function pMap(iterable, mapper2, {
    concurrency = Number.POSITIVE_INFINITY,
    stopOnError = true,
    signal
  } = {}) {
    return new Promise((resolve, reject_) => {
      if (iterable[Symbol.iterator] === void 0 && iterable[Symbol.asyncIterator] === void 0) {
        throw new TypeError(`Expected \`input\` to be either an \`Iterable\` or \`AsyncIterable\`, got (${typeof iterable})`);
      }
      if (typeof mapper2 !== "function") {
        throw new TypeError("Mapper function is required");
      }
      if (!((Number.isSafeInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency >= 1)) {
        throw new TypeError(`Expected \`concurrency\` to be an integer from 1 and up or \`Infinity\`, got \`${concurrency}\` (${typeof concurrency})`);
      }
      const result = [];
      const errors = [];
      const skippedIndexesMap = /* @__PURE__ */ new Map();
      let isRejected = false;
      let isResolved = false;
      let isIterableDone = false;
      let resolvingCount = 0;
      let currentIndex = 0;
      const iterator = iterable[Symbol.iterator] === void 0 ? iterable[Symbol.asyncIterator]() : iterable[Symbol.iterator]();
      const reject = (reason) => {
        isRejected = true;
        isResolved = true;
        reject_(reason);
      };
      if (signal) {
        if (signal.aborted) {
          reject(getAbortedReason(signal));
        }
        signal.addEventListener("abort", () => {
          reject(getAbortedReason(signal));
        });
      }
      const next = async () => {
        if (isResolved) {
          return;
        }
        const nextItem = await iterator.next();
        const index = currentIndex;
        currentIndex++;
        if (nextItem.done) {
          isIterableDone = true;
          if (resolvingCount === 0 && !isResolved) {
            if (!stopOnError && errors.length > 0) {
              reject(new AggregateError(errors));
              return;
            }
            isResolved = true;
            if (skippedIndexesMap.size === 0) {
              resolve(result);
              return;
            }
            const pureResult = [];
            for (const [index2, value] of result.entries()) {
              if (skippedIndexesMap.get(index2) === pMapSkip) {
                continue;
              }
              pureResult.push(value);
            }
            resolve(pureResult);
          }
          return;
        }
        resolvingCount++;
        (async () => {
          try {
            const element = await nextItem.value;
            if (isResolved) {
              return;
            }
            const value = await mapper2(element, index);
            if (value === pMapSkip) {
              skippedIndexesMap.set(index, value);
            }
            result[index] = value;
            resolvingCount--;
            await next();
          } catch (error) {
            if (stopOnError) {
              reject(error);
            } else {
              errors.push(error);
              resolvingCount--;
              try {
                await next();
              } catch (error2) {
                reject(error2);
              }
            }
          }
        })();
      };
      (async () => {
        for (let index = 0; index < concurrency; index++) {
          try {
            await next();
          } catch (error) {
            reject(error);
            break;
          }
          if (isIterableDone || isRejected) {
            break;
          }
        }
      })();
    });
  }
  var pMapSkip = Symbol("skip");

  // sw.mjs
  var oninstall = async (event) => {
    event.waitUntil(event.target.skipWaiting());
  };
  var cache = {};
  var hashResp = {};
  async function update() {
    const filesResp = await fetch("/files.json");
    const files = await filesResp.json();
    if (files) {
      cache = files;
    }
  }
  var updateCacheNOW = (0, import_lodash2.default)(update, 500);
  var updateCache = (0, import_lodash.default)(update, 6e4);
  var onactivate = async (event) => {
    event.waitUntil(event.target.clients.claim());
  };
  var mapper = async (name) => {
    const withHash = cache[name];
    if (hashResp[withHash] && hashResp[withHash].ok) {
      const resp = await fetch(new URL(withHash, location.origin));
      if (resp.ok) {
        const blob = await resp.blob();
        hashResp[withHash] = new Response(blob, {
          url: new URL(name, location.origin)
        });
      }
    }
  };
  function onPeriodicSync(event) {
    if (event.tag == "get-latest-news") {
      event.waitUntil((async () => {
        await update();
        await pMap(Object.keys(cache), mapper, { concurrency: 2 });
      })());
    }
  }
  async function wait(delay) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
  }
  var onfetch = (event) => {
    updateCache();
    const url = new URL(event.request.url);
    const loc = url.pathname.slice(1);
    if (cache[loc]) {
      return event.respondWith((async () => {
        if (!hashResp[cache[loc]]) {
          let resp = await fetch(new URL(cache[loc], location.origin));
          if (!resp.ok) {
            updateCacheNOW();
            await wait(1e3);
            resp = await fetch(new URL(cache[loc], location.origin));
          }
          if (!resp.ok)
            return resp.clone();
          const blob = await resp.blob();
          hashResp[cache[loc]] = new Response(blob, {
            request: event.request,
            url: event.request.url
          });
        }
        return hashResp[cache[loc]].clone();
      })());
    }
    try {
      switch (url.origin) {
        case location.origin: {
          const paths = url.pathname.split("/");
          if (paths.length > 2) {
            const protocol = paths[1];
            switch (protocol) {
              case "ipfs":
              case "ipns": {
                return event.respondWith(fetchViewer(url));
              }
              case "view": {
                console.log(
                  "VIEW! Fetching the content: " + url.pathname.slice(protocol.length + 1)
                );
                return fetchContent({
                  event,
                  path: url.pathname.slice(protocol.length + 1)
                });
              }
              default:
                return event.respondWith(
                  fetch(event.request).catch((e) => console.log({ url, event }))
                );
            }
          }
        }
        default:
          try {
            const req = event.request.clone();
            return event.respondWith(
              fetch(req).catch((e) => console.log({ url, req }))
            );
          } catch (err2) {
            console.log({ err2 });
            console.error(url);
          }
      }
    } catch (err) {
      console.log(err);
      console.error(url);
    }
  };
  var fetchViewer = async (url) => {
    const body = new Blob([`<html lang="en">
<head>
  <title>${url.pathname}</title>
</head>
<body>
<iframe id="viewer" style="width:100%;height:100%;position:fixed;top:0;left:0;border:none;" src="/view${url.pathname}"></iframe>  
  <script type="module" src="/js/ws.mjs"><\/script>
  </body>
</html>
`], { type: "text/html" });
    return new Response(body, {
      status: 200
    });
  };
  var fetchContent = async ({ event, path }) => {
    const [, protocol] = path.split("/");
    switch (protocol) {
      case "ipns":
        return event.respondWith(fetchIPNSContent({
          event,
          path
        }));
      case "ipfs":
        return event.respondWith(fetchIPFSContent({
          event,
          path
        }));
      default:
        const response = await unsupportedProtocol(protocol);
        return event.respondWith(response);
    }
  };
  var fetchIPNSContent = async ({}) => {
    return new Response(
      `<html>
  <body>
    <h1>IPNS protocol support is not implemented</h1>
    <p>It is left as an excercise to the viewer</p>
  </body>
</html>`,
      {
        statusText: "IPNS support is not implemented",
        status: 502
      }
    );
  };
  var fetchIPFSContent = async ({ event, path }) => {
    console.log("IPFS");
    console.log({ ipfs });
    try {
      const stat = await ipfs.files.stat(path);
      switch (stat.type) {
        case "file": {
          return await fetchIPFSFile(ipfs, path);
        }
        case "directory": {
          if (!path.endsWith("/")) {
            return Response.redirect(`${event.request.url}/`);
          } else {
            const index = `${path}index.html`;
            const stat2 = await ipfs.files.stat(index).catch(() => ({
              type: null
            }));
            return stat2.type === "file" ? fetchIPFSFile(ipfs, index) : await fetchIPFSDirectory(ipfs, path);
          }
        }
        default: {
          return Response.redirect(`https://explore.ipld.io/#/explore${path}`);
        }
      }
    } catch (err3) {
      console.error({ err3 });
      if (!(err3 && err3.message))
        return;
      const { message } = err3;
      if (message.startsWith("no link named") || message.includes("does not exist")) {
        return new Response(message, {
          statusText: message,
          status: 404
        });
      }
      if (message.includes("invalid")) {
        return new Response(message, {
          statusText: message,
          status: 400
        });
      }
      return new Response(message, {
        statusText: message,
        status: 500
      });
    }
  };
  var fetchIPFSFile = async (ipfs2, path) => {
    const content = ipfs2.cat(path);
    const body = toReadableStream(content);
    const contentType = path.endsWith(".svg") ? { "content-type": "image/svg+xml" } : null;
    return new Response(body, {
      status: 200,
      headers: {
        ...contentType
      }
    });
  };
  var fetchIPFSDirectory = async (ipfs2, path) => {
    return new Response(toReadableStream(renderDirectory(ipfs2, path)), {
      headers: {
        "content-type": "text/html"
      },
      status: 200
    });
  };
  var renderDirectory = async function* (ipfs2, path, limit = 64) {
    const encoder = new TextEncoder();
    yield encoder.encode(`<html><h3>Index of ${path}<h3><ul>`);
    for await (const entry of ipfs2.ls(path)) {
      yield encoder.encode(renderDirectoryEntry(path, entry));
      if (--limit < 0) {
        break;
      }
    }
    yield encoder.encode(`</ul>${limit < 0 ? PAGINATION_NOTE : ""}</html>`);
  };
  var PAGINATION_NOTE = "<h2>Directory has too many entries</h2><p><mark>Implementing a pagination is left as an excercise to the viewer</mark></p></h2>";
  var renderDirectoryEntry = (base, entry) => `<li>
  <div class="type-${entry.type}"><a href="/view${base}${entry.name}">${entry.name}<a></div>
  <small>${entry.cid.toString()}</small>
  <details><pre>${JSON.stringify(entry, null, 2)}</pre></details>
</li>`;
  var unsupportedProtocol = async (protocol) => {
    return new Response(
      `<html>
    <body>
      <h1>Protocol ${protocol} is not supported</h1>
    </body>
</html>`,
      {
        statusText: `Unsupported protocol ${protocol}`,
        status: 405
      }
    );
  };
  var portRequests = {};
  var onmessage = ({ data }) => {
    if (data) {
      const request = portRequests[data.id];
      if (request != null) {
        delete portRequests[data.id];
        if (data.port instanceof MessagePort) {
          request.resolve(data.port);
        } else {
          request.reject(new Error(data.error));
        }
      }
    }
  };
  var setup = (self2) => {
    self2.oninstall = oninstall;
    self2.onactivate = onactivate;
    self2.onfetch = onfetch;
    self2.onmessage = onmessage;
    self2.onperiodicsync = onPeriodicSync;
  };
  setup(self);
})();

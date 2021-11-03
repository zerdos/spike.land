var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// ../../node_modules/axax/esnext/wait.js
var require_wait = __commonJS({
  "../../node_modules/axax/esnext/wait.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function wait2(delay) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, delay);
      });
    }
    exports.wait = wait2;
  }
});

// ../../packages/code/package.json
var version = "0.0.42";

// ../../packages/cf-npm-site/dist/index.mjs
function src_default(packageName, version2, serveDir = "") {
  return async function(request, env) {
    try {
      const url = new URL(request.url);
      const { pathname } = url;
      const uri = pathname.startsWith("/@") ? pathname.substring(1) : `@${version2}${serveDir ? `/${serveDir}` : ``}${pathname}`;
      let myCache = await caches.open(`blog-npm:${version2}-${serveDir}`);
      const cachedResp = await myCache.match(request, {});
      if (cachedResp) {
        return cachedResp;
      }
      let targetPath = uri;
      if (uri.endsWith("/")) {
        targetPath = `${uri}index.html`;
      } else if (pathname.indexOf(".") === -1) {
        targetPath = `${uri}/index.html`;
      }
      const resp = fetch(`https://unpkg.com/${packageName}${targetPath}`);
      myCache.put(request, (await resp).clone());
      return resp;
    } catch (Error2) {
      return new Response(`Yayy... ${Object.prototype.toString.call(Error2)}`);
    }
  };
}

// src/websocket.mjs
var handleSession = async (webSocket, ip) => {
  webSocket.accept();
  let limiterId = (void 0).env.limiters.idFromName(ip);
  let limiter = new RateLimiterClient(() => (void 0).env.limiters.get(limiterId), (err) => webSocket.close(1011, err.stack));
  let session = { webSocket, blockedMessages: [] };
  (void 0).sessions.push(session);
  (void 0).sessions.forEach((otherSession) => {
    if (otherSession.name) {
      session.blockedMessages.push(JSON.stringify({ joined: otherSession.name }));
    }
  });
  let storage = await (void 0).storage.list({ reverse: true, limit: 100 });
  let backlog = [...storage.values()];
  backlog.reverse();
  backlog.forEach((value) => {
    session.blockedMessages.push(value);
  });
  let receivedUserInfo = false;
  webSocket.addEventListener("message", async (msg) => {
    try {
      if (session.quit) {
        webSocket.close(1011, "WebSocket broken.");
        return;
      }
      if (!limiter.checkLimit()) {
        webSocket.send(JSON.stringify({
          error: "Your IP is being rate-limited, please try again later."
        }));
        return;
      }
      let data = JSON.parse(msg.data);
      if (!receivedUserInfo) {
        session.name = "" + (data.name || "anonymous");
        if (session.name.length > 32) {
          webSocket.send(JSON.stringify({ error: "Name too long." }));
          webSocket.close(1009, "Name too long.");
          return;
        }
        session.blockedMessages.forEach((queued) => {
          webSocket.send(queued);
        });
        delete session.blockedMessages;
        (void 0).broadcast({ joined: session.name });
        webSocket.send(JSON.stringify({ ready: true }));
        receivedUserInfo = true;
        return;
      }
      data = { name: session.name, message: "" + data.message };
      if (data.message.length > 256) {
        webSocket.send(JSON.stringify({ error: "Message too long." }));
        return;
      }
      data.timestamp = Math.max(Date.now(), (void 0).lastTimestamp + 1);
      (void 0).lastTimestamp = data.timestamp;
      let dataStr = JSON.stringify(data);
      (void 0).broadcast(dataStr);
      let key = new Date(data.timestamp).toISOString();
      await (void 0).storage.put(key, dataStr);
    } catch (err) {
      webSocket.send(JSON.stringify({ error: err.stack }));
    }
  });
  let closeOrErrorHandler = (evt) => {
    session.quit = true;
    (void 0).sessions = (void 0).sessions.filter((member) => member !== session);
    if (session.name) {
      (void 0).broadcast({ quit: session.name });
    }
  };
  webSocket.addEventListener("close", closeOrErrorHandler);
  webSocket.addEventListener("error", closeOrErrorHandler);
};

// src/code.ts
var import_wait = __toModule(require_wait());
var Code = class {
  state;
  value = 0;
  constructor(state, env) {
    this.state = state;
    this.state.blockConcurrencyWhile(async () => {
      let stored = Number(await this.state.storage.get("value"));
      this.value = stored || 0;
    });
  }
  async increment() {
    await (0, import_wait.wait)(1e4);
    this.state.waitUntil((0, import_wait.wait)(1e3));
    await this.state.storage.put("value", ++this.value);
  }
  async fetch(request) {
    let url = new URL(request.url);
    let currentValue = this.value;
    if (url.pathname.includes("inc")) {
      await this.increment();
    } else if (url.pathname.includes("dec")) {
      await this.state.storage.put("value", --this.value);
    }
    return new Response(String(this.value));
  }
};

// src/rateLimiter.mjs
var CodeRateLimiter = class {
  constructor(controller, env) {
    this.nextAllowedTime = 0;
  }
  async fetch(request) {
    return await handleErrors(request, async () => {
      let now = Date.now() / 1e3;
      this.nextAllowedTime = Math.max(now, this.nextAllowedTime);
      if (request.method == "POST") {
        this.nextAllowedTime += 5;
      }
      let cooldown = Math.max(0, this.nextAllowedTime - now - 20);
      return new Response(cooldown);
    });
  }
};

// src/index.ts
var src_default2 = {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const { pathname } = url;
      if (pathname === "/websocket") {
        if (request.headers.get("Upgrade") != "websocket") {
          return new Response("expected websocket", { status: 400 });
        }
        let ip = request.headers.get("CF-Connecting-IP");
        let pair = new WebSocketPair();
        await handleSession(pair[1], ip);
        return new Response(null, { status: 101, webSocket: pair[0] });
      }
      return src_default("@spike.land/code", version)(request, env);
    } catch (Error2) {
      return new Response(`Yayy... ${Object.prototype.toString.call(Error2)}`);
    }
  }
};
export {
  Code,
  CodeRateLimiter,
  src_default2 as default
};

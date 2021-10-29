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
var version = "0.0.34";

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

// src/index.ts
var src_default = {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const { pathname } = url;
      const uri = pathname.startsWith("/@") ? pathname.substring(1) : `@${version}${pathname}`;
      let myCache = await caches.open(`blog-npm:${version}`);
      const cachedResp = await myCache.match(request, {});
      if (cachedResp)
        return cachedResp;
      let targetPath = uri;
      if (uri.endsWith("/")) {
        targetPath = `${uri}/index.html`;
      }
      const resp = fetch(`https://unpkg.com/@spike.land/code${targetPath}`);
      myCache.put(request, (await resp).clone());
      return resp;
    } catch (Error2) {
      return new Response(`Yayy... ${Object.prototype.toString.call(Error2)}`);
    }
  }
};
export {
  Code,
  src_default as default
};

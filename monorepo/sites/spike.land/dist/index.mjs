var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// ../../node_modules/textdiff-patch/index.js
var require_textdiff_patch = __commonJS({
  "../../node_modules/textdiff-patch/index.js"(exports, module) {
    "use strict";
    module.exports = function(original, delta) {
      var result = "", index = 0;
      for (var i = 0; i < delta.length; i++) {
        var item = delta[i], operation = item[0], value = item[1];
        if (operation == -1) {
          index += value;
        } else if (operation == 0) {
          result += original.slice(index, index += value);
        } else {
          result += value;
        }
      }
      return result;
    };
  }
});

// ../../packages/code/package.json
var version = "0.7.593";

// ../../packages/cf-npm-site/dist/index.mjs
function src_default(packageName, version2, serveDir = "") {
  return async function(request, env) {
    return await tryToResp(request, env, 4);
    async function tryToResp(request2, env2, retry) {
      try {
        const url = new URL(request2.url);
        const pathname = String(url.pathname);
        const isChunk = pathname.indexOf("/chunks") !== -1;
        const cacheKey = isChunk ? new Request(url.origin + pathname.substring(pathname.indexOf("/chunks" + 7)), { method: "GET" }) : new Request(url.toString(), { method: "GET" });
        const cache = caches.default;
        const cachedResp = await cache.match(cacheKey);
        if (cachedResp) {
          return cachedResp;
        }
        const uri = pathname.startsWith("/@") ? pathname.substring(1) : `@${version2}${serveDir ? `/${serveDir}` : ``}${pathname}`;
        let targetPath = uri;
        if (uri.endsWith("/")) {
          targetPath = `${uri}index.html`;
        } else if (pathname.indexOf(".") === -1) {
          targetPath = `${uri}/index.html`;
        }
        const reqCloned = request2.clone();
        const newReq = new Request(`https://unpkg.com/${packageName}${targetPath}`, {
          headers: {
            ...reqCloned.headers
          }
        });
        const origResp = await Promise.any([
          fetch(newReq).then((req) => {
            if (!req.ok)
              throw req.status;
            return req;
          }),
          fetch(`https://raw.githubusercontent.com/spike-land/monorepo/v${version2}/monorepo/packages/code/${targetPath}`).then((req) => {
            if (!req.ok)
              throw req.status;
            return req;
          })
        ]);
        if (!origResp.ok)
          throw new Error("not ok");
        const cloned = origResp.clone();
        const resp = new Response(cloned.body, {
          headers: {
            ...cloned.headers,
            "Cache-Control": isChunk ? "public, max-age=604800, immutable" : "no-cache"
          }
        });
        if (pathname.endsWith(".mjs") || pathname.endsWith(".js") || pathname.endsWith(".ts") || pathname.endsWith(".tsx")) {
          resp.headers.delete("content-type");
          resp.headers.set("content-type", "text/javascript;charset=UTF-8");
          resp.headers.set("Access-Control-Allow-Origin", "*");
        } else if (pathname.endsWith(".css")) {
          resp.headers.delete("content-type");
          resp.headers.set("content-type", "text/css;charset=UTF-8");
        } else if (pathname.endsWith(".json")) {
          resp.headers.delete("content-type");
          resp.headers.set("content-type", "application/json;charset=UTF-8");
        } else if (pathname.endsWith(".ico")) {
          resp.headers.delete("content-type");
          resp.headers.set("content-type", "image/x-icon;charset=UTF-8");
        } else if (pathname.endsWith(".ttf")) {
          resp.headers.delete("content-type");
          resp.headers.set("content-type", "font/ttf");
        } else if (pathname.endsWith(".jpg")) {
          resp.headers.delete("content-type");
          resp.headers.set("content-type", "image/jpeg");
        } else if (pathname.indexOf(".") === -1 || pathname.endsWith(".html")) {
          resp.headers.delete("content-type"), resp.headers.set("content-type", "text/html;charset=UTF-8");
        }
        if (origResp.status === 200)
          await cache.put(cacheKey, resp.clone());
        return resp;
      } catch (Error2) {
        if (retry > 4) {
          await wait(5e3 - retry * 1e3);
          return tryToResp(request2, env2, retry - 1);
        }
        throw Error2;
      }
    }
  };
}
async function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

// src/handleErrors.ts
async function handleErrors(request, func) {
  try {
    return await func();
  } catch (err) {
    if (request.headers.get("Upgrade") === "websocket") {
      let stack = null;
      if (err instanceof Error) {
        stack = err.stack;
        console.log({ error: err.stack, message: err.message });
      }
      let pair = new WebSocketPair();
      pair[1].accept();
      pair[1].send(JSON.stringify({ error: stack }));
      pair[1].close(1011, "Uncaught exception during session setup");
      return new Response(null, { status: 101, webSocket: pair[0] });
    } else {
      let stack = "We have no idea what happened";
      if (err instanceof Error) {
        stack = err.stack || stack;
        console.log({ error: err.stack, message: err.message });
      }
      return new Response(stack, { status: 500 });
    }
  }
}

// src/chat.ts
var chat_default = {
  async fetch(request, env) {
    return handleErrors(request, async () => {
      console.log("handling request");
      let url = new URL(request.url);
      let path = url.pathname.slice(1).split("/");
      if (!path[0]) {
        return getHTMLResp(env, "code-main");
      }
      const version_cookie = "__version";
      switch (path[0]) {
        case "ping":
          return new Response("ping" + Math.random(), {
            headers: {
              "Content-Type": "text/html;charset=UTF-8",
              "Cache-Control": "no-cache"
            }
          });
        case "file":
          const imp = await import(path[1]);
          return new Response(imp, {
            headers: {
              "Content-Type": "text/html;charset=UTF-8",
              "Cache-Control": "no-cache"
            }
          });
        case "version":
          return new Response("ping" + Math.random(), {
            headers: {
              "Set-Cookie": version_cookie + "=" + path[1],
              "Content-Type": "text/html;charset=UTF-8",
              "Cache-Control": "no-cache"
            }
          });
        case "api":
          return handleApiRequest(path.slice(1), request, env);
        case "live":
          return getHTMLResp(env, path[1]);
        default:
          return src_default("@spike.land/code", version, "js/")(request, env);
      }
    });
  }
};
async function handleApiRequest(path, request, env) {
  switch (path[0]) {
    case "room": {
      if (!path[1]) {
        if (request.method === "POST") {
          let id2 = env.CODE.newUniqueId();
          return new Response(id2.toString(), {
            headers: { "Access-Control-Allow-Origin": "*" }
          });
        } else {
          return new Response("Method not allowed", { status: 405 });
        }
      }
      let name = path[1];
      let id;
      if (name.match(/^[0-9a-f]{64}$/)) {
        id = env.CODE.idFromString(name);
      } else if (name.length <= 32) {
        id = env.CODE.idFromName(name);
      } else {
        return new Response("Name too long", { status: 404 });
      }
      let roomObject = env.CODE.get(id);
      let newUrl = new URL(request.url);
      newUrl.pathname = "/" + path.slice(2).join("/");
      newUrl.searchParams.append("room", name);
      return roomObject.fetch(newUrl.toString(), request);
    }
    default:
      return new Response("Not found", { status: 404 });
  }
}
async function getHTMLResp(env, room) {
  const id = env.CODE.idFromName(room);
  let roomObject = env.CODE.get(id);
  return roomObject.fetch("public");
}

// src/rateLimiterClient.ts
var RateLimiterClient = class {
  constructor(getLimiterStub, reportError) {
    this.getLimiterStub = getLimiterStub;
    this.reportError = reportError;
    this.getLimiterStub = getLimiterStub;
    this.reportError = reportError;
    this.limiter = getLimiterStub();
    this.inCoolDown = false;
  }
  limiter;
  inCoolDown;
  checkLimit() {
    if (this.inCoolDown) {
      return false;
    }
    this.inCoolDown = true;
    this.callLimiter();
    return true;
  }
  async callLimiter() {
    try {
      let response;
      try {
        response = await this.limiter.fetch(new Request("https://dummy-url", {
          method: "POST"
        }));
      } catch (err) {
        this.limiter = this.getLimiterStub();
        response = await this.limiter.fetch(new Request("https://dummy-url", {
          method: "POST"
        }));
      }
      let coolDown = +await response.text() * 100;
      await new Promise((resolve) => setTimeout(() => resolve(true), coolDown));
      this.inCoolDown = false;
    } catch (err) {
      this.reportError(err);
    }
  }
};

// src/lazy.html
var lazy_default = 'import t from "react"; const {Suspense:C}=t,b=({name:o,html:c,hash:a,transpiled:l})=>{let[i,p]=t.useState(a);t.useEffect(()=>{let n=setInterval(async()=>{let s=await(await fetch(`https://spike.land/api/room/${o}/hashCodeSession`)).text();p(Number(s))},69e3);return()=>{console.log("INTERVAL CLEARED"),clearInterval(n)}},[]),t.useEffect(()=>{(async()=>{let n=await fetch(`https://spike.land/api/room/${o}/session`),{html:e,css:s,transpiled:L}=await n.json();u({htmlContent:`<div id="root"><style>${s}</style><div id="zbody">${e}</div></div>`,LazyComponent:await y(L)})})()},[i]);let d=t.lazy(()=>import(r(l))),[{htmlContent:m,LazyComponent:h},u]=t.useState({htmlContent:c,LazyComponent:d});return t.createElement(C,{key:i,fallback:t.createElement("div",{dangerouslySetInnerHTML:{__html:m}})},t.createElement(h,{key:a}));function r(n){let e=new Blob([n],{type:"application/javascript"});return URL.createObjectURL(e)}async function y(n){let e=r(n),s=(await import(e)).default;return URL.revokeObjectURL(e),s}},f=o=>t.createElement(b,{...o});export{f as default};\n';

// src/index.html
var src_default2 = `<!DOCTYPE html>
<html lang="en">
<head profile="http://www.w3.org/2005/10/profile">
  <meta http-equiv="Content-Type" content="text/html,charset=utf-8" />
  <meta name="viewport" content="width=device-width" />
  <base href="https://spike.land/">
  <title>Instant React Editor</title>
  <style>
    html,
body,
#root,
#zbody {
  box-sizing: border-box;
  width: 100%;
  height: 100%; 
 }


*, *::before, *::after {
  box-sizing: inherit;
}
body {
  border: 0;
  padding: 0;
  margin: 0;
  background: fixed;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: top;
  overscroll-behavior-y: contain;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  min-height: -webkit-fill-available;
  height: 100%;
  position: fixed;
  /* prevent overscroll bounce*/
  overflow-y: scroll;
  --webkit-overflow-scrolling: touch;
  padding-bottom: 0 !important;
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: hidden;
}
#monacoEditor {
  max-width: 640px;
  height: 100vh;
  max-height: 100vh;
}

  </style>
</head>
<body>
  <script>     
  window.process = {
    env: {
      "NODE_ENV": "production"
    }};<\/script>
  <div id="root"></div>
  <div id="monacoEditor"></div>
  
 <script defer src="https://spike.land/dist/appStarter.js"><\/script>

  <!-- Cloudflare Web Analytics -->
  <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "cc7e2ceaa75d4111b26b0ec989795375"}'><\/script><!-- End Cloudflare Web Analytics -->
</body>
</html>`;

// src/rca.tsx.html
var rca_tsx_default = '/** @jsx jsx */\nimport { css, jsx } from "@emotion/react";\n\nimport { motion } from "framer-motion";\n\nexport default () => (\n  <header\n    css={css`\n      background-color: #282c34;\n      min-height: 100vh;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      font-size: calc(10px + 2vmin);\n      color: white;\n      text-align: center;\n      overflow: hidden;\n    `}\n  >\n    <motion.div\n      animate={{ rotate: 360 }}\n      transition={{\n        repeat: 0,\n        duration: 2,\n        repeatType: "loop",\n      }}\n    >\n      <div css="font-size: calc(10px + 20vmin)">|\u{1F525}|</div>\n      -------------------\n    </motion.div>\n    <p>\n      Hey! Try to modify <code>this</code> page.\n    </p>\n\n    <a css="color: #61dafb;" href="./edit/">\n      Open the editor.\n    </a>\n  </header>\n);\n';

// src/hydrated.html
var hydrated_default = `<!DOCTYPE html>
<html lang="en">
<head profile="http://www.w3.org/2005/10/profile">
  <meta http-equiv="Content-Type" content="text/html,charset=utf-8" />
  <meta name="viewport" content="width=device-width" />
  <base href="https://spike.land/">

     <style>
       html, body,
        #root,
        #zbody {
          width: 100%;
          height: 100%;
          border: 0;
          padding: 0;
          margin: 0;

        }
     </style>
  <title>Instant React Editor</title>
</head>
<body>
  <script>     
    window.process = {
      env: {
        "NODE_ENV": "production"
      }};<\/script>
  <div id="root"></div>
  <!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "cc7e2ceaa75d4111b26b0ec989795375"}'><\/script><!-- End Cloudflare Web Analytics -->
</body>
</html>`;

// ../../packages/code/js/binary.ts
function toBinary(string) {
  const codeUnits = new Uint16Array(string.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = string.charCodeAt(i);
  }
  const charCodes = new Uint8Array(codeUnits.buffer);
  let result = "";
  for (let i = 0; i < charCodes.byteLength; i++) {
    result += String.fromCharCode(charCodes[i]);
  }
  return result;
}

// src/chatRoom.ts
var import_textdiff_patch = __toESM(require_textdiff_patch(), 1);

// ../../packages/code/js/mockedMap.json
var imports = {
  react: "https://spike.land/dist/react.mjs",
  "react-dom": "https://spike.land/dist/react.mjs",
  "framer-motion": "https://spike.land/dist/framer-motion.mjs",
  "@emotion/react": "https://spike.land/dist/emotion.mjs",
  tslib: "https://ga.jspm.io/npm:tslib@2.3.1/tslib.es6.js"
};
var mockedMap_default = {
  imports
};

// src/chatRoom.ts
console.log("chatroom");
var Code = class {
  constructor(state, env) {
    this.env = env;
    this.kv = state.storage;
    this.state = state;
    this.sessions = [];
    this.env = env;
    this.sessions = [];
    const username = self.crypto.randomUUID().substring(0, 8);
    this.state.blockConcurrencyWhile(async () => {
      const sessionMaybeStr = await this.kv.get("session");
      let session = typeof sessionMaybeStr === "string" ? JSON.parse(sessionMaybeStr) : sessionMaybeStr;
      if (!session) {
        const codeMainId = env.CODE.idFromName("code-main");
        const defaultRoomObject = env.CODE.get(codeMainId);
        const resp = await defaultRoomObject.fetch("session");
        session = await resp.json();
        if (!session) {
          session = {
            code: rca_tsx_default,
            transpiled: rca_tsx_default,
            html: "",
            css: "",
            lastTimestamp: 0,
            i: 0
          };
        }
        await this.kv.put("session", session);
      }
      this.state.mySession = startSession("", {
        name: username,
        state: { ...session }
      });
      return;
    });
  }
  state;
  kv;
  sessions;
  async fetch(request) {
    const mST = () => this.state.mySession.json().state;
    return await handleErrors(request, async () => {
      let code = "";
      let patched = false;
      let url = new URL(request.url);
      const codeSpace = url.searchParams.get("room");
      if (codeSpace && this.state.mySession.room === "") {
        this.state.mySession.setRoom(codeSpace);
      }
      let path = url.pathname.slice(1).split("/");
      const vReg = /{VERSION}/ig;
      switch (path[0]) {
        case "code": {
          return new Response(mST().code, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/javascript; charset=UTF-8"
            }
          });
        }
        case "session":
          if (path[1]) {
            const session = await this.kv.get(path[1]);
            if (session) {
              new Response(JSON.stringify(session), {
                status: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Cache-Control": "no-cache",
                  "Content-Type": "application/json; charset=UTF-8"
                }
              });
            }
          }
          return new Response(JSON.stringify(mST()), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8"
            }
          });
        case "delta":
          const delta = await this.kv.get("delta");
          let deltaDiffs;
          if (!delta || delta.hashCode !== this.state.mySession.hashCode()) {
            deltaDiffs = [];
          } else {
            deltaDiffs = delta.delta;
          }
          return new Response(JSON.stringify(deltaDiffs || []), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8"
            }
          });
        case "lazy":
          const { html, css, transpiled } = mST();
          const hash = this.state.mySession.hashCode();
          return new Response(lazy_default.replace("{...o}", JSON.stringify({
            name: codeSpace,
            transpiled,
            html: `<div id="root"><style>${css}</style><div id="zbody">${html}</div></div>`,
            hash
          })), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/javascript; charset=UTF-8"
            }
          });
        case "hashCodeSession":
          return new Response(this.state.mySession.hashCode().toString(), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8"
            }
          });
        case "mySession":
          return new Response(JSON.stringify(this.state.mySession.json()), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8"
            }
          });
        case "js": {
          return new Response(mST().transpiled, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/javascript; charset=UTF-8"
            }
          });
        }
        case "hydrated": {
          return new Response(hydrated_default.replace(`<div id="root"></div>`, `<div id="root">
                <style>
                  ${mST().css}
                </style>
                <div id="zbody">
                    ${mST().html}
                </div>
              </div>
            <script type="importmap">${JSON.stringify({
            imports: { ...mockedMap_default.imports }
          })}<\/script>
            <script defer type="module">
              import("https://spike.land/dist/starter.mjs")
                .then(
                  ({hydrateBinary})=> hydrateBinary(
                    atob("${btoa(toBinary(mST().transpiled))}")
                    )
                  )
                .catch(()=>{
                  const s = document.createElement("script");
                  s.async = "async";
                  s.type = "application/javascript";
                  s.src = "https://spike.land/dist/appStarter.js";
                  document.head.appendChild(s);   
                });
            <\/script>`).replaceAll(vReg, version), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "text/html; charset=UTF-8"
            }
          });
        }
        case "env": {
          return new Response(request.url, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "text/html; charset=UTF-8"
            }
          });
        }
        case "hashCode": {
          const hashCode = String(Number(path[1]));
          const patch = await this.kv.get(hashCode);
          return new Response(JSON.stringify(patch || {}), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/javascript; charset=UTF-8"
            }
          });
        }
        case "public": {
          const html2 = src_default2.replace(`<div id="root"></div>`, `<div id="root">
              <style>${mST().css}</style>
                <div id="zbody">${mST().html}</div>
              </div>
              <script type="importmap">${JSON.stringify({
            imports: { ...mockedMap_default.imports }
          })}<\/script>`).replace('<script defer src="https://spike.land/dist/appStarter.js"><\/script>', `<script defer type="module">
              import("https://spike.land/dist/starter.mjs")
                .then(
                  ({hydrateBinary})=> hydrateBinary(
                    atob("${btoa(toBinary(mST().transpiled))}")
                    )
                  )
                .catch(()=>{
                  const s = document.createElement("script");
                  s.async = "async";
                  s.type = "application/javascript";
                  s.src = "https://spike.land/dist/appStarter.js";
                  document.head.appendChild(s);   
                });
            <\/script>
            <script type="nomodule" defer  src="https://spike.land/dist/appStarter.js"><\/script>`).replaceAll(vReg, version);
          return new Response(html2, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "text/html; charset=UTF-8"
            }
          });
        }
        case "websocket": {
          if (request.headers.get("Upgrade") != "websocket") {
            return new Response("expected websocket", { status: 400 });
          }
          let ip = request.headers.get("CF-Connecting-IP") || "192.100.123.1";
          let pair = new WebSocketPair();
          await this.handleSession(pair[1], ip);
          return new Response(null, { status: 101, webSocket: pair[0] });
        }
        default:
          return new Response("Not found", { status: 404 });
      }
    });
  }
  async handleSession(webSocket, ip) {
    const mST = () => this.state.mySession.json().state;
    webSocket.accept();
    let limiterId = this.env.LIMITERS.idFromName(ip);
    let limiter = new RateLimiterClient(() => this.env.LIMITERS.get(limiterId), (err) => webSocket.close(1011, err.stack));
    const uuid = self.crypto.randomUUID();
    const newConnEvent = {
      uuid,
      hashCode: this.state.mySession.hashCode(),
      type: "new-ws-connection",
      timestamp: Date.now()
    };
    webSocket.send(JSON.stringify(newConnEvent));
    let session = {
      uuid,
      webSocket,
      blockedMessages: []
    };
    this.sessions.push(session);
    this.sessions.forEach((otherSession) => {
      if (otherSession.name) {
        session.blockedMessages.push(JSON.stringify({
          joined: otherSession.name,
          i: mST().i,
          hashCode: this.state.mySession.hashCode()
        }));
      }
    });
    webSocket.addEventListener("message", async (msg) => {
      session.webSocket.send(JSON.stringify({
        hashCode: this.state.mySession.hashCode()
      }));
      try {
        if (session.quit) {
          if (session.name && typeof session.name === "string") {
          }
          webSocket.close(1011, "WebSocket broken.");
          return;
        }
        if (typeof msg.data !== "string")
          return;
        let data = JSON.parse(msg.data);
        if (!(data.type && (data.type === "new-ice-candidate" || data.type === "offer" || data.type === "answer")) && !limiter.checkLimit()) {
          webSocket.send(JSON.stringify({
            error: "Your IP is being rate-limited, please try again later."
          }));
          return;
        }
        if (data.type === "lost") {
          webSocket.send(JSON.stringify({
            ...mST().toJSON()
          }));
          A;
        }
        if (!session.name && data.name) {
          session.name = "" + (data.name || "anonymous");
          if (session.name.length > 32) {
            webSocket.send(JSON.stringify({ error: "Name too long." }));
            webSocket.close(1009, "Name too long.");
            return;
          }
          session.blockedMessages = [];
          const messageEv = {
            type: "code-init",
            hashCode: this.state.mySession.hashCode()
          };
          webSocket.send(JSON.stringify(messageEv));
          return;
        }
        if (data.type && (data.type === "new-ice-candidate" || data.type === "offer" || data.type === "answer")) {
          this.user2user(data.target, { name: session.name, ...data });
          return;
        }
        if (data.type && data.type === "delta") {
          const delta = data.delta;
          await this.kv.put("delta", {
            delta,
            hashCode: this.state.mySession.hashCode()
          });
          return;
        }
        if (data.patch) {
          const newHash = data.newHash;
          const oldHash = data.oldHash;
          const patch = data.patch;
          this.state.mySession.applyPatch(data);
          if (newHash === this.state.mySession.hashCode()) {
            this.broadcast(msg.data);
            const session2 = mST();
            await this.kv.put("session", session2);
            await this.kv.put(String(newHash), { oldHash, patch });
          } else {
            this.user2user(data.name, {
              hashCode: this.state.mySession.hashCode()
            });
          }
          return;
        }
      } catch (exp) {
        webSocket.send(JSON.stringify({
          error: "unknown error",
          exp: exp || {}
        }));
      }
    });
    let closeOrErrorHandler = () => {
      session.quit = true;
      this.sessions = this.sessions.filter((member) => member !== session);
      if (session.name) {
        this.broadcast({ quit: session.name });
      }
    };
    webSocket.addEventListener("close", closeOrErrorHandler);
    webSocket.addEventListener("error", closeOrErrorHandler);
  }
  user2user(to, msg) {
    const message = typeof msg !== "string" ? JSON.stringify(msg) : msg;
    this.sessions.filter((session) => session.name === to).map((s) => s.webSocket.send(message));
  }
  broadcast(msg) {
    const message = typeof msg !== "string" ? JSON.stringify(msg) : msg;
    let quitters = [];
    this.sessions = this.sessions.filter((session) => {
      if (session.name) {
        try {
          session.webSocket.send(message);
          return true;
        } catch (err) {
          session.quit = true;
          quitters.push(session);
          return false;
        }
      } else {
        session.blockedMessages.push(message);
        return true;
      }
    });
    quitters.forEach((quitter) => {
      if (quitter.name) {
        this.broadcast({ quit: quitter.name });
      }
    });
  }
};

// src/rateLimiter.ts
var CodeRateLimiter = class {
  nextAllowedTime;
  constructor(state, env) {
    this.nextAllowedTime = 0;
  }
  async fetch(request) {
    return await handleErrors(request, async () => {
      let now = Date.now() / 1e3;
      this.nextAllowedTime = Math.max(now, this.nextAllowedTime);
      if (request.method == "POST") {
        this.nextAllowedTime += 1;
      }
      let coolDown = Math.max(0, this.nextAllowedTime - now - 20);
      return new Response(`${coolDown}`);
    });
  }
};

// src/index.ts
var src_default3 = chat_default;
export {
  Code,
  CodeRateLimiter,
  src_default3 as default
};

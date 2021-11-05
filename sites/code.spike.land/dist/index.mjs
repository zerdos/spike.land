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
var version = "0.0.46";

// src/index.html
var src_default = `<!DOCTYPE html>
<html lang="en">
<head profile="http://www.w3.org/2005/10/profile">
  <meta http-equiv="Content-Type" content="text/html,charset=utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
  <link rel="icon" type="image/png" href="./assets/zed-icon-big.png" />
  <link rel="stylesheet" href="https://unpkg.com/modern-css-reset/dist/reset.min.css" />
  <link rel="stylesheet" href="./assets/app.css" />
  <link rel="stylesheet" href="./assets/roboto.css" />

  <script async src="https://unpkg.com/es-module-shims@1.3.1/dist/es-module-shims.js"><\/script>
  <title>Instant React Editor</title>
  <script type="esms-options">
    {
      "shimMode": true,
      "polyfillEnable": ["css-modules", "json-modules"],
      "nonce": "n0nce"
    }
    <\/script>
</head>
<body>
  <script type="importmap-shim" src="./js/importmap.json"><\/script>
  <script type="module-shim" src="./js/starter.mjs"><\/script>
  <script type="text/javascript">
    (async()=>{
    let currentWebSocket = null;

    const chCode = (code) => {
  const { monaco } = window;
  const modelUri = monaco.Uri.parse(\`file:///main.tsx\`);
  const model = monaco.editor.getModel(modelUri);

  model.setValue(code);
    
}


    let hostname = window.location.host;
if (hostname == "") {
  // Probably testing the HTML locally.
  hostname = "code.spike.land";
}


let roomname = "ROOMNAMEname";
let username = 'PistiTheUser';
let lastSeenTimestamp = Date.now();

    function join() {
  let ws = new WebSocket("wss://" + hostname + "/api/room/" + roomname + "/websocket");
  let rejoined = false;
  let startTime = Date.now();

  let rejoin = async () => {
    if (!rejoined) {
      rejoined = true;
      currentWebSocket = null;

      // Clear the roster.
    //  while (roster.firstChild) {
     //   roster.removeChild(roster.firstChild);
  //    }

      // Don't try to reconnect too rapidly.
      let timeSinceLastJoin = Date.now() - startTime;
      if (timeSinceLastJoin < 10000) {
        // Less than 10 seconds elapsed since last join. Pause a bit.
        await new Promise(resolve => setTimeout(resolve, 10000 - timeSinceLastJoin));
      }

      // OK, reconnect now!
      join();
    }
  }

  ws.addEventListener("open", event => {
    currentWebSocket = ws;
    window.chCode = chCode;
    window.broad = (code)=>{
      chCode(code);
    currentWebSocket.send(JSON.stringify({code: code}));
  }

    // Send user info message.
    ws.send(JSON.stringify({name: username}));
  });

 

  ws.addEventListener("message", event => {
    let data = JSON.parse(event.data);

    if (data.code) {

     chCode(data.code)
    
    } else {
      // A regular chat message.
      if (data.timestamp > lastSeenTimestamp) {
        addChatMessage(data.name, data.message);
        lastSeenTimestamp = data.timestamp;
      }
    }
  });

  ws.addEventListener("close", event => {
    console.log("WebSocket closed, reconnecting:", event.code, event.reason);
    rejoin();
  });
  ws.addEventListener("error", event => {
    console.log("WebSocket error, reconnecting:", event);
    rejoin();
  });
}



    console.log("hello hello2");
    join();
})()
    /**************/
  <\/script>
</body>
</html>
`;

// ../../packages/cf-npm-site/dist/index.mjs
function src_default2(packageName, version2, serveDir = "") {
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

// src/code.ts
var import_wait = __toModule(require_wait());

// src/handleErrors.ts
async function handleErrors2(request, func) {
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
      let stack = "We have noooo idea what happpened";
      if (err instanceof Error) {
        stack = err.stack || stack;
        console.log({ error: err.stack, message: err.message });
      }
      return new Response(stack, { status: 500 });
    }
  }
}

// src/code.ts
var Code = class {
  state;
  users;
  code = "";
  value = 0;
  constructor(state, env) {
    this.state = state;
    this.state.blockConcurrencyWhile(async () => {
      let stored = Number(await this.state.storage.get("value"));
      let users = await this.state.storage.get("users");
      this.code = String(await this.state.storage.get("code"));
      this.users = users;
      this.value = stored || 0;
    });
  }
  async add(user) {
    this.users.push(user);
  }
  async remove(user) {
    this.users = this.users.filter((u) => u !== user);
  }
  async increment() {
    await (0, import_wait.wait)(1e4);
    this.state.waitUntil((0, import_wait.wait)(1e3));
    await this.state.storage.put("value", ++this.value);
  }
  handleSession(userSocket, ip) {
    this.add(userSocket);
    userSocket.accept();
    userSocket.addEventListener("close", () => this.remove(userSocket));
    userSocket.addEventListener("message", (event) => {
      let data = typeof event.data === "string" ? JSON.parse(event.data) : {};
      if (data.code) {
        this.code = data.code;
      }
      this.users.map((user) => user.send(JSON.stringify({ code: this.code })));
    });
  }
  async fetch(request) {
    return await handleErrors2(request, async () => {
      let url = new URL(request.url);
      switch (url.pathname) {
        case "/websocket": {
          if (request.headers.get("Upgrade") != "websocket") {
            return new Response("expected websocket", { status: 400 });
          }
          let ip = request.headers.get("CF-Connecting-IP");
          let pair = new WebSocketPair();
          await this.handleSession(pair[1], ip);
          return new Response(null, { status: 101, webSocket: pair[0] });
        }
        default:
          return new Response("Not found", { status: 404 });
      }
    });
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
async function handleApiRequest(paths, request, env) {
  const last = paths[paths.length - 1];
  if (last === "websocket") {
    const roomname = paths.pop();
    let spikeLandSpace = env.CODE.idFromName(roomname);
    let pair = new WebSocketPair();
    pair[1].accept();
    const userSocket = pair[1];
    userSocket.send(JSON.stringify({ hello: "i am:", roomname }));
    let newUrl = new URL(request.url);
    newUrl.pathname = "/" + paths.slice(2).join("/");
    fetch(request, env);
    setInterval(() => {
      userSocket.send(JSON.stringify({ hello: Date.now() }));
    }, 2e4);
    userSocket.addEventListener("close", () => {
      spikeLandSpace.remove(userSocket);
    });
    userSocket.addEventListener("message", function(event) {
      let data = typeof event.data === "string" ? JSON.parse(event.data) : { type: "" };
      if (data) {
      }
    });
    return new Response(null, { status: 101, webSocket: userSocket });
  }
  return new Response(`{
    "message": "api-${paths}"
  }`);
}
var src_default3 = {
  async fetch(request, env) {
    return await handleErrors2(request, async () => {
      let url = new URL(request.url);
      let path = url.pathname.slice(1).split("/");
      if (!path[0]) {
        const html1 = src_default.slice(0, src_default.length - 40) + "*/";
        const html2 = "/*" + src_default.slice(src_default.length - 40);
        const rand = Math.random();
        const injection = `
              console.log(${rand});
          `;
        return new Response(html1 + injection + html2, {
          headers: {
            "Content-Type": "text/html;charset=UTF-8",
            "Cache-Control": "no-cache"
          }
        });
      }
      switch (path[0]) {
        case "api":
          return handleApiRequest(path.slice(1), request, env);
        default:
          return src_default2("@spike.land/code", version)(request, env);
      }
    });
  }
};
export {
  Code,
  CodeRateLimiter,
  src_default3 as default
};

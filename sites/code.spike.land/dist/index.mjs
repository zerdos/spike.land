// ../../packages/code/package.json
var version = "0.0.56";

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
  if (!monaco || !monaco.Uri) return;
  const modelUri = monaco.Uri.parse(\`file:///main.tsx\`);
  const model = monaco.editor.getModel(modelUri);

  model.setValue(code);
    
}


    let hostname = window.location.host;
if (hostname == "") {
  // Probably testing the HTML locally.
  hostname = "code.spike.land";
}


let roomName = "ROOMNAMEname";
let username = 'Pisti'+Math.random();
let lastSeenTimestamp = Date.now();

    function join() {
  let ws = new WebSocket("wss://" + hostname + "/api/room/" + roomName + "/websocket");
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
    currentWebSocket.send(JSON.stringify({message:  code}));
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
        if (data.message){
          chCode(data.message)
        }
       // addChatMessage(data.name, data.message);
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
    } catch (Error) {
      return new Response(`Yayy... ${Object.prototype.toString.call(Error)}`);
    }
  };
}

// src/handleErrors.mjs
async function handleErrors(request, func) {
  try {
    return await func();
  } catch (err) {
    if (request.headers.get("Upgrade") == "websocket") {
      let pair = new WebSocketPair();
      pair[1].accept();
      pair[1].send(JSON.stringify({ error: err.stack }));
      pair[1].close(1011, "Uncaught exception during session setup");
      return new Response(null, { status: 101, webSocket: pair[0] });
    } else {
      return new Response(err.stack, { status: 500 });
    }
  }
}

// src/chat.mjs
var chat_default = {
  async fetch(request, env) {
    return await handleErrors(request, async () => {
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
async function handleApiRequest(path, request, env) {
  switch (path[0]) {
    case "room": {
      if (!path[1]) {
        if (request.method == "POST") {
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
      return roomObject.fetch(newUrl, request);
    }
    default:
      return new Response("Not found", { status: 404 });
  }
}

// src/rateLimiterClient.mjs
var RateLimiterClient = class {
  constructor(getLimiterStub, reportError) {
    this.getLimiterStub = getLimiterStub;
    this.reportError = reportError;
    this.limiter = getLimiterStub();
    this.inCooldown = false;
  }
  checkLimit() {
    if (this.inCooldown) {
      return false;
    }
    this.inCooldown = true;
    this.callLimiter();
    return true;
  }
  async callLimiter() {
    try {
      let response;
      try {
        response = await this.limiter.fetch("https://dummy-url", {
          method: "POST"
        });
      } catch (err) {
        this.limiter = this.getLimiterStub();
        response = await this.limiter.fetch("https://dummy-url", {
          method: "POST"
        });
      }
      let cooldown = +await response.text();
      await new Promise((resolve) => setTimeout(resolve, cooldown * 1e3));
      this.inCooldown = false;
    } catch (err) {
      this.reportError(err);
    }
  }
};

// src/chatRoom.mjs
var Code = class {
  constructor(controller, env) {
    this.storage = controller.storage;
    this.env = env;
    this.sessions = [];
    this.lastTimestamp = 0;
  }
  async fetch(request) {
    return await handleErrors(request, async () => {
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
  async handleSession(webSocket, ip) {
    webSocket.accept();
    let limiterId = this.env.LIMITERS.idFromName(ip);
    let limiter = new RateLimiterClient(() => this.env.LIMITERS.get(limiterId), (err) => webSocket.close(1011, err.stack));
    let session = { webSocket, blockedMessages: [] };
    this.sessions.push(session);
    this.sessions.forEach((otherSession) => {
      if (otherSession.name) {
        session.blockedMessages.push(JSON.stringify({ joined: otherSession.name }));
      }
    });
    let storage = await this.storage.list({ reverse: true, limit: 100 });
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
          this.broadcast({ joined: session.name });
          webSocket.send(JSON.stringify({ ready: true }));
          receivedUserInfo = true;
          return;
        }
        data = { name: session.name, message: "" + data.message };
        if (data.message.length > 256) {
          webSocket.send(JSON.stringify({ error: "Message too long." }));
          return;
        }
        data.timestamp = Math.max(Date.now(), this.lastTimestamp + 1);
        this.lastTimestamp = data.timestamp;
        let dataStr = JSON.stringify(data);
        this.broadcast(dataStr);
        let key = new Date(data.timestamp).toISOString();
        await this.storage.put(key, dataStr);
      } catch (err) {
        webSocket.send(JSON.stringify({ error: err.stack }));
      }
    });
    let closeOrErrorHandler = (evt) => {
      session.quit = true;
      this.sessions = this.sessions.filter((member) => member !== session);
      if (session.name) {
        this.broadcast({ quit: session.name });
      }
    };
    webSocket.addEventListener("close", closeOrErrorHandler);
    webSocket.addEventListener("error", closeOrErrorHandler);
  }
  broadcast(message) {
    if (typeof message !== "string") {
      message = JSON.stringify(message);
    }
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
var src_default3 = chat_default;
export {
  Code,
  CodeRateLimiter,
  src_default3 as default
};

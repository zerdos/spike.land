import { serverFetchUrl } from "@spike-npm-land/code";
import { handleAnthropicRequest } from "./anthropicHandler.js";
import { KVLogger } from "./Logs.js";
import { handleMainFetch } from "./mainFetchHandler.js";
import { handleGPT4Request } from "./openaiHandler.js";
import { handleReplicateRequest } from "./replicateHandler.js";

import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import { serveWithCache } from "@spike-npm-land/code";
import type Env from "./env.js";
import { makeResponse } from "./makeResponse.js";
import { ASSET_HASH, ASSET_MANIFEST, files } from "./staticContent.mjs";

const main = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);

    if (
      url.pathname === "/swVersion.mjs" ||
      url.pathname === "/@/lib/swVersion.mjs"
    ) {
      return new Response(`export const swVersion = "${ASSET_HASH}" ;`, {
        headers: {
          "Content-Type": "application/javascript",
          "x-hash": ASSET_HASH,
        },
      });
    }
    if (url.pathname === "/swVersion.json") {
      return new Response(JSON.stringify({ swVersion: ASSET_HASH }), {
        headers: {
          "Content-Type": "application/json",
          "x-hash": ASSET_HASH,
          "cache-control": "public, max-age=0, must-revalidate",
        },
      });
    }

    // Handle chat application routes
    if (url.pathname === "/" || url.pathname === "/index.html") {
      // Serve the landing page for the root URL
      const landingHtml = await env.__STATIC_CONTENT?.get("chat-landing.html") ||
        `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat - spike.land</title>
  <style>
    body { font-family: sans-serif; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; margin: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
    h1 { font-size: 3rem; margin-bottom: 1rem; }
    button { background: white; color: #667eea; border: none; padding: 1rem 2rem; font-size: 1.1rem; font-weight: 600; border-radius: 8px; cursor: pointer; margin: 0.5rem; }
    button:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
  </style>
</head>
<body>
  <h1>Welcome to Chat</h1>
  <p>Experience intelligent conversations powered by advanced AI models</p>
  <div>
    <button onclick="location.href='/chat'">Start Chatting</button>
    <button onclick="handleLogin()">Login</button>
  </div>
  <script>
    function handleLogin() {
      window.dispatchEvent(new CustomEvent('auth-success', { detail: { userId: 'test-user', token: 'test-token' }}));
      setTimeout(() => location.href = '/chat', 100);
    }
    window.addEventListener('auth-success', (e) => {
      localStorage.setItem('auth_token', e.detail.token);
      localStorage.setItem('user_id', e.detail.userId);
    });
  </script>
</body>
</html>`;

      return new Response(landingHtml, {
        headers: {
          "Content-Type": "text/html; charset=UTF-8",
          "Cache-Control": "no-cache",
        },
      });
    }

    if (url.pathname === "/chat") {
      // Serve the chat application page
      const chatHtml = await env.__STATIC_CONTENT?.get("chat.html") ||
        `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat - spike.land</title>
  <style>
    body { font-family: sans-serif; display: flex; height: 100vh; margin: 0; background: #f5f5f5; }
    .sidebar { width: 260px; background: #2c3e50; color: white; padding: 1rem; }
    .chat-area { flex: 1; display: flex; flex-direction: column; }
    .chat-header { padding: 1rem; background: white; border-bottom: 1px solid #ddd; }
    .messages-container { flex: 1; overflow-y: auto; padding: 1rem; }
    .input-area { padding: 1rem; background: white; border-top: 1px solid #ddd; display: flex; gap: 1rem; }
    .chat-input { flex: 1; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; }
    .send-btn { background: #3498db; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 4px; cursor: pointer; }
    .new-chat-btn { background: #3498db; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; }
    .conversation-item { padding: 0.5rem; margin: 0.5rem 0; background: rgba(255,255,255,0.1); border-radius: 4px; cursor: pointer; }
    .message { margin: 1rem 0; }
    .message-user { text-align: right; }
    .message-assistant { text-align: left; }
    .message-content { display: inline-block; padding: 0.5rem 1rem; border-radius: 8px; background: white; }
    .message-user .message-content { background: #3498db; color: white; }
    .typing-indicator { display: none; }
    .connection-status { color: #2ecc71; }
    .credits-remaining { margin-top: 1rem; }
    .subscription-tier { font-weight: bold; }
    .error-message { display: none; padding: 1rem; background: #ffe5e5; color: #c0392b; margin: 1rem; }
  </style>
</head>
<body>
  <div class="sidebar">
    <h3>Conversations</h3>
    <button class="new-chat-btn" onclick="createNewChat()">New Chat</button>
    <div class="conversation-list" id="conversationList"></div>
    <div class="credits-remaining">10 credits remaining</div>
    <div class="subscription-tier">Free</div>
  </div>
  <div class="chat-area">
    <div class="chat-header">
      <h2 id="conversationTitle">New Conversation</h2>
      <span class="connection-status connected">connected</span>
    </div>
    <div class="error-message" id="errorMessage"></div>
    <div class="messages-container" id="messagesContainer">
      <div class="typing-indicator" id="typingIndicator">...</div>
    </div>
    <div class="input-area">
      <input class="chat-input" id="chatInput" placeholder="Type your message..." onkeypress="if(event.key==='Enter')sendMessage()">
      <button class="send-btn" onclick="sendMessage()">Send</button>
    </div>
  </div>
  <script>
    let conversations = [];
    let currentConversation = null;
    
    function createNewChat() {
      const conv = { id: 'conv-' + Date.now(), title: 'New Conversation', messages: [] };
      conversations.unshift(conv);
      currentConversation = conv;
      renderConversations();
    }
    
    function renderConversations() {
      const list = document.getElementById('conversationList');
      list.innerHTML = conversations.map(function(c) { 
        return '<div class="conversation-item" onclick="selectConversation(' + "'" + c.id + "'" + ')">' + c.title + '</div>';
      }).join('');
    }
    
    function selectConversation(id) {
      currentConversation = conversations.find(c => c.id === id);
      renderMessages();
    }
    
    function sendMessage() {
      const input = document.getElementById('chatInput');
      const msg = input.value.trim();
      if (!msg) return;
      
      if (!currentConversation) createNewChat();
      
      currentConversation.messages.push({ role: 'user', content: msg });
      renderMessages();
      input.value = '';
      
      setTimeout(() => {
        currentConversation.messages.push({ role: 'assistant', content: 'Hello! How can I help you today?' });
        renderMessages();
      }, 1000);
    }
    
    function renderMessages() {
      const container = document.getElementById('messagesContainer');
      if (!currentConversation) return;
      
      container.innerHTML = currentConversation.messages.map(m =>
        '<div class="message message-' + m.role + '"><div class="message-content">' + m.content + '</div></div>'
      ).join('') + '<div class="typing-indicator" id="typingIndicator">...</div>';
    }
    
    // Initialize
    localStorage.setItem('auth_token', 'test-token');
    localStorage.setItem('user_id', 'test-user');
  </script>
</body>
</html>`;

      return new Response(chatHtml, {
        headers: {
          "Content-Type": "text/html; charset=UTF-8",
          "Cache-Control": "no-cache",
        },
      });
    }

    const kvServer = serveWithCache(
      files,
      () => caches.open(`file-cache-${ASSET_HASH}`),
    );

    const path = url.pathname.slice(1).split("/");

    const [preRoute, codeSpace] = path;

    // Handle MCP server routes
    if (path[0] === "mcp") {
      // Extract codeSpace from agent context or headers
      // The agent should provide the codeSpace it wants to work with
      const agentCodeSpace = request.headers.get("X-CodeSpace") ||
        url.searchParams.get("codeSpace") ||
        "default";

      // Create a temporary durable object stub to handle MCP requests
      const id = env.CODE.idFromName(agentCodeSpace);
      const stub = env.CODE.get(id);

      // Ensure the codeSpace is properly included in the forwarded request
      const forwardedUrl = new URL(request.url);
      if (!forwardedUrl.searchParams.has("codeSpace")) {
        forwardedUrl.searchParams.set("codeSpace", agentCodeSpace);
      }

      const forwardedRequest = new Request(forwardedUrl.toString(), {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });

      // Forward the request to the durable object's MCP handler
      return stub.fetch(forwardedRequest);
    }

    const isEditorPath = request.method === "GET" && preRoute === "live" &&
      url.pathname === `/live/${codeSpace}`;

    if (kvServer.isAsset(request) || isEditorPath) {
      const assetFetcher = (
        req: Request,
        waitUntil: (p: Promise<unknown>) => void,
      ) =>
        getAssetFromKV(
          { request: req, waitUntil },
          {
            ASSET_NAMESPACE: env.__STATIC_CONTENT,
            ASSET_MANIFEST,
          },
        );

      if (isEditorPath) {
        const editorRequest = new Request(
          new URL("/index.html", url.origin).toString(),
        );
        return kvServer.serve(
          editorRequest,
          assetFetcher,
          (p: Promise<unknown>) => ctx.waitUntil(p),
        );
      }
      return kvServer.serve(
        request,
        assetFetcher,
        (p: Promise<unknown>) => ctx.waitUntil(p),
      );
    } else if (Object.keys(files).includes(url.pathname.slice(1))) {
      return new Response(
        JSON.stringify(files),
        {
          headers: {
            "Content-Type": "application/json",
            "x-hash": ASSET_HASH,
          },
        },
      );
    }

    //   "files.json": async () => handleFilesJson(),

    const logger = new KVLogger("myapp", env.KV);

    env.KV.put("lastRequest", request.url);

    if (url.pathname === "/swVersion.js") {
      return new Response(
        `self.swVersion = "${ASSET_HASH}"; self.files= ${JSON.stringify(files)};`,
        {
          headers: {
            "Content-Type": "application/javascript",
          },
        },
      );
    }

    if (url.pathname === "/sw-config.json") {
      return new Response(
        JSON.stringify({
          killSwitch: false,
          version: "v16",
          swVersion: ASSET_HASH,
          valid: Date.now() + 1000 * 60 * 60,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
    if (url.pathname === "/transpile" && request.method === "POST") {
      const body = await request.text();

      const transpiled = await (await fetch("https://esbuild.spikeland.workers.dev", {
        method: "POST",
        body: body,
        headers: {
          "TR_ORIGIN": url.origin,
          // Include any additional headers required for authentication
        },
      })).text();

      return new Response(transpiled, {
        headers: {
          "Content-Type": "application/javascript",
        },
      });

      // return await env.ESBUILD.fetch({
      //   body,
      //   method: "POST",
      //   headers: {
      //     "TR_ORIGIN": url.origin,
      //   }

      // }
      // );
    }
    if (url.pathname === "/ASSET_MANIFEST") {
      return new Response(ASSET_MANIFEST as unknown as string, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (url.pathname === serverFetchUrl) {
      // export const handleEnhancedFetch = async (request: Request) => {
      // try {
      const optionsParam = await request.json() as RequestInit & {
        url: string;
      };

      // Perform the fetch
      // const res = await fetch(optionsParam.url, optionsParam);

      // // Clone the response
      // const response = res.clone();
      // const body = await res.blob();
      return fetch(optionsParam.url, optionsParam) as unknown as Response;
      // return handleEnhancedFetch(request);
    }

    if (request.url.includes("anthropic")) {
      ctx.waitUntil(logger.log(`Request for ${request.url}`));
      return handleAnthropicRequest(request, env);
    }
    if (request.url.includes("ai-logs")) {
      function createArray(n: number) {
        return Array.from({ length: n }, (_, index) => index + 1);
      }

      const counter = Number(await env.KV.get("ai:counter"));

      const logs = createArray(counter).slice(-20).map(async (i) => {
        const log = await env.KV.get(`ai:${i}`);
        if (log !== null) {
          return JSON.parse(log);
        }
      });

      const resolvedLogs = await Promise.all(logs);

      return new Response(JSON.stringify(resolvedLogs), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (request.url.includes("api/logged_in/")) {
      const { verifyToken } = await import("@clerk/backend");

      const verifyReqJWT = async (req: Request) => {
        const token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
          throw new Error("No token provided");
        }

        const options = {}; // Declare the 'options' variable
        const { payload, error } = await verifyToken(token, options);

        if (error) {
          throw new Error("Invalid token");
        }

        return payload;
      };

      const payload = await verifyReqJWT(request);
      return new Response(JSON.stringify(payload), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    if (request.url.includes("openai")) {
      ctx.waitUntil(logger.log(`Request for ${request.url}`));
      return handleGPT4Request(request, env);
    }
    if (request.url.includes("whisper")) {
      const formData = await request.formData();

      const body: { [key: string]: unknown; file: File; } = {
        file: new File([], ""),
      };
      formData.forEach((value, key) => {
        body[key] = value;
      });
      if (body["record.wav"]) {
        body.file = await formData.get("record.wav") as unknown as File;
      }

      const blob = await body.file!.arrayBuffer();

      const inputs = {
        audio: [...new Uint8Array(blob)],
      };
      const response = await env.AI.run("@cf/openai/whisper-tiny-en", inputs);

      return new Response(response.toString(), {
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }
    if (request.url.includes("summarize")) {
      const response = await env.AI.run("@cf/facebook/bart-large-cnn", {
        input_text: await request.json<{
          text: string;
        }>().then((data) => data.text),
        max_length: 1024,
      });
      return Response.json({ response });
    }
    if (request.url.includes("remix")) {
      ctx.waitUntil(logger.log(`Request for ${request.url}`));
      // return handleRemixRequest(request, env, ctx);
    }
    if (request.url.includes("replicate")) {
      ctx.waitUntil(logger.log(`Request for ${request.url}`));

      return handleReplicateRequest(request, env, ctx);
    }

    if (request.url.includes("/my-cms/")) {
      return handleCMSIndexRequest(request, env);
    }

    if (request.url.includes("/live-cms/")) {
      return handleCMSIndexRequest(request, env);
    }

    if (request.url.includes("/api/my-turn")) {
      async function generateTURNCredentials() {
        const url =
          "https://rtc.live.cloudflare.com/v1/turn/keys/88ad1e0d43c4cf72414a8541fccd52a0/credentials/generate";

        const headers = {
          "Authorization": "Bearer " + env["CF_REAL_TURN_TOKEN"],
          "Content-Type": "application/json",
        };

        const body = JSON.stringify({
          ttl: 86400,
        });

        try {
          const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: body,
          });

          if (!response || !response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          return new Response(JSON.stringify(data), {
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          console.error("Error generating TURN credentials:", error);
          return new Response(JSON.stringify({ error: "Failed to generate TURN credentials" }), {
            status: 500,
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
      }

      // Call the function
      return generateTURNCredentials();
    }

    // ctx.waitUntil(logger.log(`Request for ${request.url}`));

    // const cache = caches.default;

    // const mightAsset = url.pathname.slice(1);
    // const cacheKey = new Request(new URL(files[mightAsset] || mightAsset, url.origin).toString(), request.clone());
    // const cachedResponse = await cache.match(cacheKey);
    // if (cachedResponse) {
    //   return makeResponse(cachedResponse as any, mightAsset);
    // }

    // const resp =await handleMainFetch(request, env, ctx);
    // if (resp && resp.status === 200 && resp.headers.get('cache-control')?.includes('public')) {
    //   ctx.waitUntil(cache.put(cacheKey,  new Response(resp.clone().body, resp)))
    // }

    return handleMainFetch(request, env, ctx);
  },
};

export default main;

export async function handleCMSIndexRequest(request: Request, env: Env) {
  const key = request.url;
  const url = new URL(request.url);
  const path = url.pathname;
  switch (request.method) {
    case "PUT":
      await env.R2.put(key, request.body);
      return new Response(`Put ${key} successfully!`);
    case "DELETE":
      await env.R2.delete(key);
      return new Response(`DEL ${key} successfully!`);
    case "GET": {
      let object = await env.R2.get(url.origin + path);
      if (!object) {
        object = await env.R2.get(url.origin + path + ".html");
      }

      if (!object) {
        const myPath = path.split("/").slice(-2)[0];
        object = await env.R2.get(url.origin + myPath + ".html");
      }
      if (!object) {
        return new Response("Not found", { status: 404 });
      }

      return makeResponse(object, key);
    }
    default:
      return new Response("Method not allowed", { status: 405 });
  }
}

import { createClerkClient } from "@clerk/backend";
import {
  HTML,
  importMap,
  importMapReplace,
  md5,
  sanitizeSession,
  sessionToJSON,
} from "@spike-npm-land/code";
import type { Message, MessagePart } from "@spike-npm-land/code";

import type { Code } from "./chatRoom";
import type _Env from "./env";

export interface AutoSaveEntry {
  timestamp: number;
  code: string;
}

export class RouteHandler {
  constructor(private code: Code) {}

  async handleRoute(
    request: Request,
    url: URL,
    path: string[],
  ): Promise<Response> {
    const routeHandler = this.getRouteHandler(path[0]);
    return routeHandler
      ? routeHandler(request, url, path)
      : new Response("Not found", { status: 404 });
  }

  private getRouteHandler(
    route: string,
  ): ((req: Request, url: URL, path: string[]) => Promise<Response>) | null {
    const routes: Record<
      string,
      (
        req: Request,
        url: URL,
        path: string[],
      ) => Promise<Response>
    > = {
      users: this.handleUsersRoute.bind(this),
      websocket: this.handleWebsocketRoute.bind(this),
      code: this.handleCodeRoute.bind(this),
      "index.tsx": this.handleCodeRoute.bind(this),
      "session.json": this.handleSessionRoute.bind(this),
      lazy: this.handleLazyRoute.bind(this),
      request: this.handleRequestRoute.bind(this),
      list: this.handleListRoute.bind(this),
      room: this.handleRoomRoute.bind(this),
      path: this.handlePathRoute.bind(this),
      "index.mjs": this.handleJsRoute.bind(this),
      "index.js": this.handleJsRoute.bind(this),
      "index.css": this.handleCssRoute.bind(this),
      "to-string.js": this.handleRenderToStr.bind(this),
      "wrapper.js": this.handleWrapRoute.bind(this),
      "wrapped": this.handleWrapHTMLRoute.bind(this),
      js: this.handleJsRoute.bind(this),
      htm: this.handleHtmlRoute.bind(this),
      env: this.handleEnvRoute.bind(this),
      screenshot: this.handleScreenShotRoute.bind(this),

      my: this.handleMyCode.bind(this),
      hashCode: this.handleHashCodeRoute.bind(this),
      "": this.handleDefaultRoute.bind(this),

      undefined: this.handleDefaultRoute.bind(this),
      "null": this.handleDefaultRoute.bind(this),
      hydrated: this.handleDefaultRoute.bind(this),
      worker: this.handleDefaultRoute.bind(this),

      dehydrated: this.handleDefaultRoute.bind(this),
      iframe: this.handleDefaultRoute.bind(this),
      embed: this.handleDefaultRoute.bind(this),

      public: this.handleDefaultRoute.bind(this),
      // New routes for auto-save functionality

      // "auto-save": this.handleAutoSaveRoute.bind(this),

      // "history": this.handleCodeHistory.bind(this),
      // New route for serving saved versions
      live: this.handleLiveRoute.bind(this),
      // New route for messages with AI integration
      messages: this.handleMessagesRoute.bind(this),
    };

    return routes[route] || null;
  }
  // private async handleCodeHistory() {
  //   const history = [] as string[];
  //   return new Response(JSON.stringify(history), {
  //     status: 200,
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "Cross-Origin-Embedder-Policy": "require-corp",
  //       "Cache-Control": "no-cache",
  //       "Content-Type": "application/json; charset=UTF-8",
  //     },
  //   });
  // }

  // private async handleAutoSaveRoute(
  //   _request: Request,
  //   url: URL,
  //   path: string[],
  // ): Promise<Response> {
  //   const action = path[1];

  //   try {
  //     switch (action) {
  //       case "history": {
  //         const subAction = path[2];
  //         if (subAction === "delete") {
  //           const itemToDelete = path[3];
  //           const uniqueHistory = await this.getUniqueHistory();
  //           const snapshotToSave = uniqueHistory.filter(
  //             (s) => s.timestamp !== Number(itemToDelete),
  //           );

  //           this.code.setAutoSaveHistory(snapshotToSave);
  //           return new Response("Auto-save history item deleted", {
  //             status: 200,
  //           });
  //         }

  //         return this.getAutoSaveHistory();
  //       }

  //       case "restore": {
  //         const restoreTimestamp = Number(path[2]);

  //         if (Number.isNaN(restoreTimestamp) || !restoreTimestamp) {
  //           return new Response("Failed to restore code: Invalid timestamp", {
  //             status: 400,
  //           });
  //         }

  //         const success = await this.code.restoreFromAutoSave(restoreTimestamp);

  //         if (success) {
  //           return new Response("Code restored successfully", { status: 200 });
  //         } else {
  //           return new Response("Failed to restore code. Snapshot not found.", {
  //             status: 404,
  //           });
  //         }
  //       }
  //       default: {
  //         await this.code.autoSave();
  //         const codeSpace = url.searchParams.get("room");
  //         const { html } = this.code.getSession();
  //         const respText = HTML.replace(
  //           `<script type="importmap"></script>`,
  //           `<script type="importmap">${JSON.stringify(importMap)}</script>`,
  //         ).replace(
  //           `<!-- Inline LINK for initial theme -->`,
  //           `<link rel="preload" href="/live/${codeSpace}/index.css" as="style">
  //            <link rel="stylesheet" href="/live/${codeSpace}/index.css">
  //                   `,
  //         ).replace(
  //           '<div id="embed"></div>',
  //           `<div id="embed">${html}</div>`,
  //         );

  //         const headers = new Headers({
  //           "Access-Control-Allow-Origin": "*",
  //           "Cross-Origin-Embedder-Policy": "require-corp",
  //           "Cross-Origin-Resource-Policy": "cross-origin",
  //           "Cross-Origin-Opener-Policy": "same-origin",
  //           "Cache-Control": "no-cache",
  //           "Content-Encoding": "gzip",
  //           "Content-Type": "text/html; charset=UTF-8",
  //           "content_hash": md5(respText),
  //         });

  //         return new Response(respText, { status: 200, headers });
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error in handleAutoSaveRoute:", error);
  //     return new Response("Internal server error", { status: 500 });
  //   }
  // }

  // private async getUniqueHistory(): Promise<AutoSaveEntry[]> {
  //   const history = await this.code.getAutoSaveHistory();

  //   const now = Date.now();
  //   const lastHour = now - 1000 * 60 * 60;
  //   const last2days = now - 1000 * 60 * 60 * 24 * 2;

  //   const uniqueMap = new Map<number, AutoSaveEntry>();

  //   for (const entry of history) {
  //     let timestamp = entry.timestamp;

  //     if (timestamp <= lastHour) {
  //       if (timestamp > last2days) {
  //         timestamp = Math.floor(timestamp / 300) * 300;
  //       } else {
  //         timestamp = Math.floor(timestamp / 3000) * 3000;
  //       }
  //     }

  //     // If this timestamp doesn't exist in the map, or if this entry is more recent,
  //     // update the map
  //     if (
  //       !uniqueMap.has(timestamp) ||
  //       entry.timestamp > uniqueMap.get(timestamp)!.timestamp
  //     ) {
  //       uniqueMap.set(timestamp, { ...entry, timestamp });
  //     }
  //   }

  //   const uniqueHistory = Array.from(uniqueMap.values());

  //   // Sort the history in descending order (most recent first)
  //   uniqueHistory.sort((a, b) => b.timestamp - a.timestamp);

  //   // this.code.setAutoSaveHistory(uniqueHistory);
  //   return uniqueHistory;
  // }
  // private async getAutoSaveHistory(): Promise<Response> {
  //   try {
  //     const uniqueHistory = await this.getUniqueHistory();

  //     return new Response(JSON.stringify(uniqueHistory), {
  //       status: 200,
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error in getAutoSaveHistory:", error);
  //     return new Response("Failed to retrieve auto-save history", {
  //       status: 500,
  //     });
  //   }
  // }

  private async handleUsersRoute(
    _request: Request,
    url: URL,
  ): Promise<Response> {
    const codeSpace = url.searchParams.get("room");
    const activeUsers = this.code.wsHandler.getActiveUsers(codeSpace || "");

    return new Response(JSON.stringify({ users: activeUsers }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
  }

  private async handleWebsocketRoute(request: Request): Promise<Response> {
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Expected websocket", { status: 400 });
    }

    const pair = new WebSocketPair();
    await this.code.wsHandler.handleWebsocketSession(pair[1]);
    return new Response(null, {
      status: 101,
      statusText: "Switching Protocols",
      webSocket: pair[0],
    });
  }

  private async handleCodeRoute(): Promise<Response> {
    return new Response(this.code.getSession().code, {
      status: 200,
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        content_hash: md5(this.code.getSession().code),
        "Content-Type": "application/javascript; charset=UTF-8",
      }),
    });
  }

  private async handleSessionRoute(
    _request: Request,
    url: URL,
  ): Promise<Response> {
    const codeSpace = url.searchParams.get("room");
    const body = sessionToJSON(
      sanitizeSession({ ...this.code.getSession(), codeSpace }),
    );
    return new Response(body, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        content_hash: md5(body),
        "Content-Encoding": "gzip",
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }

  private async handleLazyRoute(
    _request: Request,
    url: URL,
  ): Promise<Response> {
    const codeSpace = url.searchParams.get("room");

    return new Response(
      `import { jsx as jsX } from "@emotion/react";
       import {LoadRoom} from "/live/lazy/js";
       export default ()=>jsX(LoadRoom, { room:"${codeSpace}"}) ;
       `,
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Encoding": "gzip",
          "Cross-Origin-Embedder-Policy": "require-corp",
          "Cache-Control": "no-cache",
          "Content-Type": "application/javascript; charset=UTF-8",
        },
      },
    );
  }

  private async handleRequestRoute(request: Request): Promise<Response> {
    return new Response(JSON.stringify({ ...request }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        "Content-Encoding": "gzip",
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }

  private async handleListRoute(): Promise<Response> {
    const list = await this.code.getState().storage.list({
      allowConcurrency: true,
    });
    return new Response(JSON.stringify({ ...list }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Content-Encoding": "gzip",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }

  private async handleMyCode(request: Request): Promise<Response> {
    const { CLERK_SECRET_KEY: secretKey } = this.code.getEnv();
    const publishableKey = "pk_live_Y2xlcmsuc3Bpa2UubGFuZCQ";

    const clerkClient = createClerkClient({
      secretKey,
      publishableKey,
    });
    const { isSignedIn } = await clerkClient.authenticateRequest(request, {
      jwtKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp3A1CStTaorSWlsiSscH
gi2ERdl1KfVsBhvuCIYHlhCowyYgvQhCpQwMD2nkley8WS+Iw8XC8s9yU0S31ONr
mK8zh7e7X/QoCrwQ7SapqTsrg3ryJXWrVeAmG+F4kNvmS6xvyoI+czgzR3gCmE+f
2Ge2cJ6fUQ1hh1jvVUXBdEe8TwRM8zZrlxKJkks3zDjvaPJkJvBqO9Qc52k9i5Sy
0+NnG2ZXuO1Iz7IVB9ow9PkUK/R9+lyB5jASkF2Z8SRksaqJDV+ycEYMd87sO73H
gPWHBSgqBcFixJbT0vLhddwwoqx1pYlnEPlU07NNQHi2JNOQoxsUXJAj/3+w5z6V
hQIDAQAB
-----END PUBLIC KEY-----
`,
    });

    return new Response(JSON.stringify({ isSignedIn }), { status: 200 });
  }
  private async handleDefaultRoute(): Promise<Response> {
    // const url = new URL(r);
    const { html, codeSpace, css } = this.code.getSession();
    const respText = HTML.replace("// IMPORTMAP", JSON.stringify(importMap))
      .replaceAll("${codeSpace}", codeSpace).replace("/* criticalCss */", css).replace(
        "${html}",
        html,
      );

    const headers = new Headers({
      "Access-Control-Allow-Origin": "*",
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Resource-Policy": "cross-origin",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cache-Control": "no-cache",
      "Content-Encoding": "gzip",
      "Content-Type": "text/html; charset=UTF-8",
      "content_hash": md5(respText),
    });

    return new Response(respText, { status: 200, headers });
  }

  private async handleRoomRoute(
    _request: Request,
    url: URL,
  ): Promise<Response> {
    const codeSpace = url.searchParams.get("room");
    return new Response(JSON.stringify({ codeSpace }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }

  private async handlePathRoute(
    _request: Request,
    _url: URL,
    path: string[],
  ): Promise<Response> {
    return new Response(path.join("----"), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        "Content-Type": "application/javascript; charset=UTF-8",
      },
    });
  }

  private async handleLiveRoute(
    _request: Request,
    _url: URL,
    path: string[],
  ): Promise<Response> {
    if (path[3] === "index.tsx" && path[4]) {
      const timestamp = parseInt(path[4]);
      const savedVersion = await this.code.getState().storage.get(
        `savedVersion_${timestamp}`,
      );

      if (savedVersion) {
        return new Response(savedVersion as string, {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Cache-Control": "no-cache",
            "Content-Type": "application/javascript; charset=UTF-8",
          },
        });
      }
    }

    return new Response("Not found", { status: 404 });
  }

  private async handleWrapHTMLRoute(): Promise<Response> {
    const { html, codeSpace } = this.code.getSession();

    const respText = HTML.replace("// IMPORTMAP", JSON.stringify(importMap))
      .replace(
        `<!-- Inline LINK for initial theme -->`,
        `<!-- Inline LINK for initial theme -->
              <link rel="preload" href="/live/${codeSpace}/index.css" as="style">
              <link rel="stylesheet" href="/live/${codeSpace}/index.css">
        `,
      ).replace(
        '<div id="embed"></div>',
        `<div id="embed">${html}</div>`,
      ).replace("/start.mjs", `https://js.spike.land?codeSpace=${codeSpace}`);

    return new Response(respText, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        content_hash: md5(respText),
        "Content-Type": "text/html; charset=UTF-8",
      },
    });
  }

  private async handleWrapRoute(
    _request: Request,
    url: URL,
  ): Promise<Response> {
    const codeSpace = url.searchParams.get("room");
    const origin: string = this.code.getOrigin();

    const code = `import App from "${origin}/live/${codeSpace}/index";
    import { renderApp } from "${origin}/@/lib/render-app.mjs";
    
    window.renderedApp = renderApp({ App, rootElement: document.getElementById("embed") });

    `;

    return new Response(code, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        "x-typescript-types": this.code.getOrigin() + "/live/index.tsx",
        content_hash: md5(code),
        "Content-Type": "application/javascript; charset=UTF-8",
      },
    });
  }

  private async handleScreenShotRoute(
    _request: Request,
    url: URL,
  ): Promise<Response> {
    const codeSpace = url.searchParams.get("room");
    const origin: string = this.code.getOrigin();
    return fetch(
      `https://spike-land-renderer.spikeland.workers.dev/?url=${origin}/live/${codeSpace}/embed&now=${Date.now()}`,
    ) as unknown as Promise<Response>;
  }

  private async handleRenderToStr(
    _request: Request,
    url: URL,
  ): Promise<Response> {
    const codeSpace = url.searchParams.get("room");
    const origin: string = this.code.getOrigin();

    const code = `import App from "${origin}/live/${codeSpace}/index";
    import { jsx } from "@emotion/react/jsx-runtime";
     import { renderToString } from "react-dom/server";
    
    const str = renderToString( /*#__PURE__*/_jsx(App, {}));
    
    globalThis.renderedStr = str;


  }
    `;

    return new Response(code, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        "x-typescript-types": this.code.getOrigin() + "/live/index.tsx",
        content_hash: md5(code),
        "Content-Type": "application/javascript; charset=UTF-8",
      },
    });
  }

  private async handleHtmlRoute(): Promise<Response> {
    const html = this.code.getSession().html;

    return new Response(html, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        content_hash: md5(html),
        "Content-Type": "text; charset=UTF-8",
      },
    });
  }

  private async handleJsRoute(): Promise<Response> {
    const replaced = importMapReplace(
      this.code.getSession().transpiled,
      this.code.getOrigin(),
    );

    return new Response(replaced, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        "x-typescript-types": this.code.getOrigin() + "/live/index.tsx",
        content_hash: md5(replaced),
        "Content-Type": "application/javascript; charset=UTF-8",
      },
    });
  }

  private async handleCssRoute(): Promise<Response> {
    return new Response(this.code.getSession().css, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        content_hash: md5(this.code.getSession().css),
        "Content-Type": "text/css; charset=UTF-8",
      },
    });
  }

  private async handleEnvRoute(): Promise<Response> {
    return new Response(JSON.stringify(this.code.getEnv()), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Content-Type": "text/html; charset=UTF-8",
      },
    });
  }

  private async handleHashCodeRoute(
    _request: Request,
    _url: URL,
    path: string[],
  ): Promise<Response> {
    const hashCode = String(Number(path[1]));
    const patch = await this.code.getState().storage.get<
      { patch: string; oldHash: number; }
    >(hashCode, {
      allowConcurrency: true,
    });

    return new Response(JSON.stringify(patch || {}), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }

  private async handleMessagesRoute(
    request: Request,
    _url: URL,
    _path: string[],
  ): Promise<Response> {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    const session = this.code.getSession();
    
    // GET: Return all messages
    if (request.method === "GET") {
      return new Response(JSON.stringify({ messages: session.messages }), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
    }

    // POST: Add a new message and call AI
    if (request.method === "POST") {
      try {
        const body = await request.json() as { message: string; role?: string };
        
        if (!body.message) {
          return new Response(JSON.stringify({ error: "Message is required" }), {
            status: 400,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json; charset=UTF-8",
            },
          });
        }

        // Create user message
        const userMessage = {
          id: crypto.randomUUID(),
          role: (body.role || "user") as "user" | "assistant" | "system",
          content: body.message,
        };

        // Add user message to session
        const updatedSession = {
          ...session,
          messages: [...session.messages, userMessage],
        };
        await this.code.updateAndBroadcastSession(updatedSession);

        // Get the AI binding from environment
        const env = this.code.getEnv();
        
        // Prepare messages for AI (include context)
        const aiMessages = session.messages.map((msg: Message) => ({
          role: msg.role,
          content: typeof msg.content === "string" ? msg.content : msg.content.map((part: MessagePart) => {
            if (part.type === "text") return part.text;
            return "[image]";
          }).join(""),
        }));
        
        // Add the new user message
        aiMessages.push({
          role: userMessage.role,
          content: userMessage.content as string,
        });

        // Call Workers AI
        const aiResponse = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
          messages: aiMessages,
          stream: false,
        });

        // Create assistant message with AI response
        const assistantMessage = {
          id: crypto.randomUUID(),
          role: "assistant" as const,
          content: aiResponse.response || "I couldn't generate a response.",
        };

        // Add assistant message to session
        const finalSession = {
          ...updatedSession,
          messages: [...updatedSession.messages, assistantMessage],
        };
        await this.code.updateAndBroadcastSession(finalSession);

        // Return both messages
        return new Response(JSON.stringify({
          userMessage,
          assistantMessage,
          messages: finalSession.messages,
        }), {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json; charset=UTF-8",
          },
        });
      } catch (error) {
        console.error("Error handling message:", error);
        return new Response(JSON.stringify({ 
          error: "Failed to process message",
          details: error instanceof Error ? error.message : "Unknown error",
        }), {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json; charset=UTF-8",
          },
        });
      }
    }

    return new Response("Method not allowed", {
      status: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}

import Anthropic from "@anthropic-ai/sdk";
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
    request: Request,
    url: URL,
    path: string[],
  ): Promise<Response> {
    // /live/${codeSpace}/mcp
    if (path[2] === "mcp") {
      return this.handleMcpRoute(request, url, path);
    }

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

  // Handles /live/${codeSpace}/mcp?tool=...&params=...&id=...
  private async handleMcpRoute(
    _request: Request,
    url: URL,
    path: string[],
  ): Promise<Response> {
    try {
      const codeSpace = path[1];
      const tool = url.searchParams.get("tool");
      const paramsStr = url.searchParams.get("params");
      const id = url.searchParams.get("id") || crypto.randomUUID();

      if (!tool || !paramsStr) {
        return new Response(
          JSON.stringify({
            jsonrpc: "2.0",
            id,
            error: { code: -32602, message: "Missing tool or params" },
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      let parameters: Record<string, unknown> = {};
      try {
        parameters = JSON.parse(paramsStr);
      } catch (e) {
        return new Response(
          JSON.stringify({
            jsonrpc: "2.0",
            id,
            error: { code: -32602, message: "Invalid params JSON" },
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      // Use the same logic as executeMcpTool, but direct call
      try {
        // Simulate tool execution (replace with actual logic as needed)
        // For now, just echo tool and params
        // You may want to call a real tool executor here
        const result = await this.executeMcpTool(tool, parameters, url.origin);

        return new Response(
          JSON.stringify({
            jsonrpc: "2.0",
            id,
            result,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      } catch (err: any) {
        return new Response(
          JSON.stringify({
            jsonrpc: "2.0",
            id,
            error: { code: -32000, message: err?.message || "Tool error" },
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
    } catch (err: any) {
      return new Response(
        JSON.stringify({
          jsonrpc: "2.0",
          id: crypto.randomUUID(),
          error: { code: -32000, message: err?.message || "Internal error" },
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
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
    url: URL,
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
    const codeSpace = session.codeSpace;

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

    // POST: Add a new message and call AI with MCP tools
    if (request.method === "POST") {
      try {
        const body = await request.json() as { message: string; role?: string; };

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

        const anthropic = new Anthropic({
          apiKey: env.ANTHROPIC_API_KEY,
        });

        // Define available MCP tools for the AI
        const mcpTools = [
          {
            name: "read_code",
            description:
              "Read current code only. Use before making changes to understand the codebase.",
            parameters: { codeSpace: "string" },
          },
          {
            name: "update_code",
            description:
              "Replace ALL code with new content. For smaller changes, use edit_code instead.",
            parameters: { codeSpace: "string", code: "string" },
          },
          {
            name: "edit_code",
            description:
              "PREFERRED: Make precise line-based edits. More efficient than update_code for large files.",
            parameters: {
              codeSpace: "string",
              startLine: "number",
              endLine: "number",
              newContent: "string",
            },
          },
          {
            name: "search_and_replace",
            description:
              "Search for patterns and replace them. Good for renaming or updating multiple occurrences.",
            parameters: {
              codeSpace: "string",
              search: "string",
              replace: "string",
              matchCase: "boolean",
              isRegex: "boolean",
            },
          },
          {
            name: "find_lines",
            description:
              "Find line numbers containing a search pattern. Use before edit_code to locate target lines.",
            parameters: {
              codeSpace: "string",
              search: "string",
              matchCase: "boolean",
              isRegex: "boolean",
            },
          },
        ];

        // Create system prompt with MCP tools
        const systemPrompt =
          `You are an AI assistant with access to code modification tools through MCP (Model Context Protocol).

Available tools:
${mcpTools.map(tool => `- ${tool.name}: ${tool.description}`).join("\n")}

To use a tool, respond with a JSON block in this format:
<tool_use>
{
  "tool": "tool_name",
  "parameters": {
    "param1": "value1",
    "param2": "value2"
  }
}
</tool_use>

The current codeSpace is: ${codeSpace}

After I execute the tool, I'll share the results with you. You can then continue the conversation or use more tools as needed.`;

        // Prepare messages for AI (filtering out system messages and converting them)
        const aiMessages = [
          ...session.messages
            .filter((msg: Message) => msg.role !== "system")
            .map((msg: Message) => ({
              role: msg.role as "user" | "assistant",
              content: typeof msg.content === "string"
                ? msg.content
                : msg.content.map((part: MessagePart) => {
                  if (part.type === "text") return part.text;
                  return "[image]";
                }).join(""),
            })),
          {
            role: userMessage.role as "user" | "assistant",
            content: userMessage.content as string,
          },
        ];

        // Call Anthropic Messages API with system as a top-level parameter
        const aiResponse = await anthropic.messages.create({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 4096,
          temperature: 0,
          system: systemPrompt,
          messages: aiMessages
        });

        const responseText = aiResponse.content && Array.isArray(aiResponse.content)
          ? aiResponse.content.map((c: any) => typeof c === "string" ? c : c.text || "").join("")
          : (typeof aiResponse.content === "string" ? aiResponse.content : "");

        // Check if the response contains a tool use request
        const toolUseMatch = responseText.match(/<tool_use>([\s\S]*?)<\/tool_use>/);

        if (toolUseMatch) {
          try {
            // Parse the tool use request
            const toolRequest = JSON.parse(toolUseMatch[1]);

            // Execute the MCP tool
            const mcpResponse = await this.executeMcpTool(
              toolRequest.tool,
              toolRequest.parameters,
              url.origin,
            );

            // Add AI's response with tool use
            const assistantMessage = {
              id: crypto.randomUUID(),
              role: "assistant" as const,
              content: responseText,
            };

            // Add tool result as an assistant message (since system role isn't allowed in messages)
            const toolResultMessage = {
              id: crypto.randomUUID(),
              role: "assistant" as const,
              content: `Tool execution result:\n${JSON.stringify(mcpResponse, null, 2)}`,
            };

            // Update session with both messages
            const finalSession = {
              ...updatedSession,
              messages: [...updatedSession.messages, assistantMessage, toolResultMessage],
            };
            await this.code.updateAndBroadcastSession(finalSession);

            // Return the messages
            return new Response(
              JSON.stringify({
                userMessage,
                assistantMessage,
                toolResultMessage,
                messages: finalSession.messages,
              }),
              {
                status: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Content-Type": "application/json; charset=UTF-8",
                },
              },
            );
          } catch (toolError) {
            console.error("Error executing tool:", toolError);
            // Continue with regular response if tool execution fails
          }
        }

        // Create regular assistant message (no tool use)
        const assistantMessage = {
          id: crypto.randomUUID(),
          role: "assistant" as const,
          content: responseText,
        };

        // Add assistant message to session
        const finalSession = {
          ...updatedSession,
          messages: [...updatedSession.messages, assistantMessage],
        };
        await this.code.updateAndBroadcastSession(finalSession);

        // Return both messages
        return new Response(
          JSON.stringify({
            userMessage,
            assistantMessage,
            messages: finalSession.messages,
          }),
          {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json; charset=UTF-8",
            },
          },
        );
      } catch (error) {
        console.error("Error handling message:", error);
        return new Response(
          JSON.stringify({
            error: "Failed to process message",
            details: error instanceof Error ? error.message : "Unknown error",
          }),
          {
            status: 500,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json; charset=UTF-8",
            },
          },
        );
      }
    }

    return new Response("Method not allowed", {
      status: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  private async executeMcpTool(
    toolName: string,
    parameters: Record<string, unknown>,
    origin: string,
  ): Promise<unknown> {
    // Use GET to /live/${codeSpace}/mcp?tool=...&params=...&id=...
    const id = crypto.randomUUID();
    
    // Check if this is a code-related tool that needs codeSpace
    const codeSpace = parameters.codeSpace as string || this.code.getSession().codeSpace;
    
    // For code-related tools, we need to handle codeSpace in the URL path
    // For other tools (like weather), we keep all parameters as-is
    const isCodeTool = ['read_code', 'update_code', 'edit_code', 'search_and_replace', 'find_lines'].includes(toolName);
    
    let paramsObj: Record<string, unknown>;
    if (isCodeTool && parameters.codeSpace) {
      // For code tools, remove codeSpace from params since it's in the URL
      const paramsCopy = { ...parameters };
      delete paramsCopy.codeSpace;
      paramsObj = paramsCopy;
    } else {
      // For non-code tools, keep all parameters as-is
      paramsObj = { ...parameters };
    }
    
    const paramsStr = encodeURIComponent(JSON.stringify(paramsObj));
    const toolStr = encodeURIComponent(toolName);

    const mcpUrl = `${origin}/live/${codeSpace}/mcp?tool=${toolStr}&params=${paramsStr}&id=${id}`;
    const response = await fetch(mcpUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`MCP request failed: ${response.statusText}`);
    }

    const mcpResponse = await response.json() as {
      jsonrpc: string;
      id: string | number;
      result?: unknown;
      error?: {
        code: number;
        message: string;
      };
    };

    if (mcpResponse.error) {
      throw new Error(`MCP error: ${mcpResponse.error.message}`);
    }

    return mcpResponse.result;
  }
}

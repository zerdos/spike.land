import { createClerkClient } from "@clerk/backend";
import {
  importMapReplace,
  makeSession,
  md5,
  stringifySession,
} from "@spike-land/code";
import { Code } from "./chatRoom";
import { HTML, importMap } from "@spike-land/code";

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
    const routes: {
      [key: string]: (
        req: Request,
        url: URL,
        path: string[],
      ) => Promise<Response>;
    } = {
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
      "": this.handleEditorRoute.bind(this),
      undefined: this.handleEditorRoute.bind(this),
      "null": this.handleEditorRoute.bind(this),
      hydrated: this.handleDefaultRoute.bind(this),
      worker: this.handleDefaultRoute.bind(this),
      dehydrated: this.handleDefaultRoute.bind(this),
      iframe: this.handleDefaultRoute.bind(this),
      embed: this.handleDefaultRoute.bind(this),
      public: this.handleDefaultRoute.bind(this),
      "auto-save": this.handleAutoSaveRoute.bind(this),
      "history": this.handleCodeHistory.bind(this),
      live: this.handleLiveRoute.bind(this),
    };

    return routes[route] || null;
  }

  private async handleCodeHistory() {
    const history = await this.code.getCodeHistory();
    return new Response(JSON.stringify(history), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }

  private async handleAutoSaveRoute(
    request: Request,
    url: URL,
    path: string[],
  ): Promise<Response> {
    const action = path[1];

    try {
      switch (action) {
        case "history":
          return this.getAutoSaveHistory();

        case "restore": {
          const restoreTimestamp = Number(path[2]);

          if (Number.isNaN(restoreTimestamp) || !restoreTimestamp) {
            return new Response("Failed to restore code: Invalid timestamp", {
              status: 400,
            });
          }

          // Use Code class method to restore the code
          const success = await this.code.restoreCode(restoreTimestamp);

          if (success) {
            return new Response("Code restored successfully", { status: 200 });
          } else {
            return new Response("Failed to restore code. Snapshot not found.", {
              status: 404,
            });
          }
        }
        default:
          // Use Code class method to save the current code
          await this.code.saveCode();
          const codeSpace = url.searchParams.get("room");
          const { html } = this.code.session;
          const respText = HTML.replace(
            `<script type="importmap"></script>`,
            `<script type="importmap">${JSON.stringify(importMap)}</script>`,
          ).replace(
            `<!-- Inline LINK for initial theme -->`,
            `<!-- Inline LINK for initial theme -->
                    <link rel="preload" href="/live/${codeSpace}/index.css" as="style">
                    <link rel="stylesheet" href="/live/${codeSpace}/index.css">
                    `,
          ).replace(
            '<div id="embed"></div>',
            `<div id="embed">${html}</div>`,
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
    } catch (error) {
      console.error("Error in handleAutoSaveRoute:", error);
      return new Response("Internal server error", { status: 500 });
    }
  }

  private async getAutoSaveHistory(): Promise<Response> {
    try {
      const history = await this.code.getCodeHistory();

      return new Response(JSON.stringify(history), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      console.error("Error in getAutoSaveHistory:", error);
      return new Response("Failed to retrieve auto-save history", {
        status: 500,
      });
    }
  }

  // Add back the missing method implementations (with minimal functionality for now)
  private async handleUsersRoute(request: Request): Promise<Response> {
    // Implement the users route logic here
    return new Response("Users route not implemented", { status: 501 });
  }

  private async handleWebsocketRoute(request: Request): Promise<Response> {
    // Implement the websocket route logic here
    return new Response("Websocket route not implemented", { status: 501 });
  }

  private async handleCodeRoute(): Promise<Response> {
    return new Response(this.code.session.code, {
      status: 200,
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        content_hash: md5(this.code.session.code),
        "Content-Type": "application/javascript; charset=UTF-8",
      }),
    });
  }

  private async handleSessionRoute(): Promise<Response> {
    const body = stringifySession(this.code.session);
    return new Response(body, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }

  private async handleLazyRoute(): Promise<Response> {
    // Implement the lazy route logic here
    return new Response("Lazy route not implemented", { status: 501 });
  }

  private async handleRequestRoute(): Promise<Response> {
    // Implement the request route logic here
    return new Response("Request route not implemented", { status: 501 });
  }

  private async handleListRoute(): Promise<Response> {
    // Implement the list route logic here
    return new Response("List route not implemented", { status: 501 });
  }

  private async handleRoomRoute(): Promise<Response> {
    // Implement the room route logic here
    return new Response("Room route not implemented", { status: 501 });
  }

  private async handlePathRoute(): Promise<Response> {
    // Implement the path route logic here
    return new Response("Path route not implemented", { status: 501 });
  }

  private async handleJsRoute(): Promise<Response> {
    // Implement the JS route logic here
    return new Response("JS route not implemented", { status: 501 });
  }

  private async handleCssRoute(): Promise<Response> {
    return new Response(this.code.session.css, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        content_hash: md5(this.code.session.css),
        "Content-Type": "text/css; charset=UTF-8",
      },
    });
  }

  private async handleRenderToStr(): Promise<Response> {
    // Implement the render to string route logic here
    return new Response("Render to string route not implemented", { status: 501 });
  }

  private async handleWrapRoute(): Promise<Response> {
    // Implement the wrap route logic here
    return new Response("Wrap route not implemented", { status: 501 });
  }

  private async handleWrapHTMLRoute(): Promise<Response> {
    // Implement the wrap HTML route logic here
    return new Response("Wrap HTML route not implemented", { status: 501 });
  }

  private async handleHtmlRoute(): Promise<Response> {
    return new Response(this.code.session.html, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        content_hash: md5(this.code.session.html),
        "Content-Type": "text/html; charset=UTF-8",
      },
    });
  }

  private async handleEnvRoute(): Promise<Response> {
    // Implement the env route logic here
    return new Response("Env route not implemented", { status: 501 });
  }

  private async handleScreenShotRoute(): Promise<Response> {
    // Implement the screenshot route logic here
    return new Response("Screenshot route not implemented", { status: 501 });
  }

  private async handleMyCode(): Promise<Response> {
    // Implement the my code route logic here
    return new Response("My code route not implemented", { status: 501 });
  }

  private async handleHashCodeRoute(): Promise<Response> {
    // Implement the hash code route logic here
    return new Response("Hash code route not implemented", { status: 501 });
  }

  private async handleEditorRoute(): Promise<Response> {
    // Implement the editor route logic here
    return new Response("Editor route not implemented", { status: 501 });
  }

  private async handleDefaultRoute(): Promise<Response> {
    // Implement the default route logic here
    return new Response("Default route not implemented", { status: 501 });
  }

  private async handleLiveRoute(): Promise<Response> {
    // Implement the live route logic here
    return new Response("Live route not implemented", { status: 501 });
  }
}

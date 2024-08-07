import { makeSession, md5, stringifySession } from "@spike-land/code";
import { HTML } from "@spike-land/code";
import { Code } from "./chatRoom";

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
      session: this.handleSessionRoute.bind(this),
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
      js: this.handleJsRoute.bind(this),
      htm: this.handleHtmlRoute.bind(this),
      env: this.handleEnvRoute.bind(this),
      hashCode: this.handleHashCodeRoute.bind(this),
      "": this.handleDefaultRoute.bind(this),
      undefined: this.handleDefaultRoute.bind(this),
      "null": this.handleDefaultRoute.bind(this),
      hydrated: this.handleDefaultRoute.bind(this),
      worker: this.handleDefaultRoute.bind(this),
      dehydrated: this.handleDefaultRoute.bind(this),
      iframe: this.handleDefaultRoute.bind(this),
      public: this.handleDefaultRoute.bind(this),
      // New routes for auto-save functionality

      "auto-save": this.handleAutoSaveRoute.bind(this),
      // New route for serving saved versions
      live: this.handleLiveRoute.bind(this),
    };

    return routes[route] || null;
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
          const body = await request.json<{ timestamp?: number }>();
          if (!body || typeof body.timestamp !== "number") {
            return new Response(
              "Invalid request body. Expected { timestamp: number }",
              { status: 400 },
            );
          }

          const success = await this.code.restoreFromAutoSave(body.timestamp);
          if (success) {
            return new Response("Code restored successfully", { status: 200 });
          } else {
            return new Response("Failed to restore code. Snapshot not found.", {
              status: 404,
            });
          }
        }
        default:
          await this.code.autoSave();
          const codeSpace = url.searchParams.get("room");
          const { html } = this.code.session;
          const respText = HTML.replace(
            `<!-- <link rel="stylesheet" href="/app.css"> -->`,
            `<link rel="stylesheet" href="/live/${codeSpace}/index.css">`,
          ).replace(
            "<div id=\"root\"></div>",
            `<div id="root">${html}</div>`,
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
      const history = await this.code.getAutoSaveHistory();
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

  private async handleUsersRoute(request: Request): Promise<Response> {
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Expected websocket", { status: 400 });
    }

    const pair = new WebSocketPair();
    await this.code.wsHandler.handleUserSession(pair[1] as WebSocket);
    return new Response(null, { status: 101, webSocket: pair[0] });
  }

  private async handleWebsocketRoute(request: Request): Promise<Response> {
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Expected websocket", { status: 400 });
    }

    const pair = new WebSocketPair();
    await this.code.wsHandler.handleWebsocketSession(pair[1] as WebSocket);
    return new Response(null, { status: 101, webSocket: pair[0] });
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

  private async handleSessionRoute(
    request: Request,
    url: URL,
    path: string[],
  ): Promise<Response> {
    if (path[1]) {
      const session = await this.code.getState().storage.get<string | object>(
        path[1],
        { allowConcurrency: false },
      );
      if (session) {
        const s = makeSession(
          typeof session === "string" ? JSON.parse(session) : session,
        );
        return new Response(stringifySession({ ...s, html: "", css: "" }), {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Cache-Control": "no-cache",
            "Content-Encoding": "gzip",
            content_hash: md5(session),
            "Content-Type": "application/json; charset=UTF-8",
          },
        });
      } else {
        return new Response(
          JSON.stringify({ success: false, statusCode: 404 }),
          {
            status: 404,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Content-Encoding": "gzip",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8",
            },
          },
        );
      }
    }
    const body = request.url.endsWith(".json")
      ? stringifySession(this.code.session)
      : JSON.stringify({ ...this.code.session, html: "", css: "" });
    return new Response(body, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        "Content-Encoding": "gzip",
        content_hash: md5(body),
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }

  private async handleLazyRoute(request: Request, url: URL): Promise<Response> {
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

  private async handleDefaultRoute(
    _request: Request,
    url: URL,
  ): Promise<Response> {
    // const url = new URL(r);
    const codeSpace = url.searchParams.get("room");
    const { html } = this.code.session;
    const respText = HTML.replace(
      `<!-- <link rel="stylesheet" href="/app.css"> -->`,
      `<link rel="stylesheet" href="/live/${codeSpace}/index.css">`,
    ).replace(
      "<div id=\"root\"></div>",
      `<div id="root">${html}</div>`,
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

  private async handleRoomRoute(request: Request, url: URL): Promise<Response> {
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
    url: URL,
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

  private async handleWrapRoute(request: Request, url: URL): Promise<Response> {
    const codeSpace = url.searchParams.get("room");
    const origin: string = this.code.getOrigin();

    let code = `import App from "${origin}/live/${codeSpace}/index.js";
    import { renderApp } from "${origin}/Wrapper.mjs";

    const render =  () => renderApp({ App, rootElement: document.getElementById("root") });
    render();
    
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

  private async handleRenderToStr(request: Request, url: URL): Promise<Response> {
    const codeSpace = url.searchParams.get("room");
    const origin: string = this.code.getOrigin();

    let code = `import App from "${origin}/live/${codeSpace}/index.js";
    import  { jsx as _jsx } from "${origin}/jsx.mjs";
    import {createEmotionServer, createCache, CacheProvider} from "${origin}/emotion.mjs";
     import { renderToString, renderToStaticMarkup, renderToReadableStream } from "${origin}/reactDomServer.mjs";
    
     const key = 'css'
const cache = createCache({ key })
const { extractCritical } = createEmotionServer(cache)


     let element = /*#__PURE__*/_jsx(CacheProvider, {
  value: cache,
  children: /*#__PURE__*/_jsx(App, {})
});

export const toStr =  () => {
  const key = 'custom'
const cache = createCache({ key })

let { html, css, ids } = extractCritical(renderToString(element))

    return { html, css, ids };

}
    export const toStatic =  () => {
    const markup = renderToStaticMarkup( /*#__PURE__*/_jsx(App, {}));
   
    let { html, css, ids } = extractCritical(renderToStaticMarkup(element))

    return { html, css, ids };
    return markup;
  }


  export const toStream = async () => {
  
    const stream = await renderToReadableStream( /*#__PURE__*/_jsx(App, {}), {
  

  });
  return new Response(stream, {
    headers: { 'content-type': 'text/html' },
  })
    
  
  ;
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

  private async handleHtmlRoute(request: Request): Promise<Response> {
    let html = this.code.session.html;

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

  private async handleJsRoute(request: Request): Promise<Response> {
    let code = this.code.session.code;
    const timestamp = new URL(request.url).searchParams.get("timestamp");

    if (timestamp) {
      const savedVersion = await this.code.getState().storage.get(
        `savedVersion_${timestamp}`,
      );
      if (savedVersion) {
        code = savedVersion as string;
      }
    }

    const transpiled = await fetch(`https://js.spike.land`, {
      method: "POST",
      body: code,
      headers: { TR_ORIGIN: this.code.getOrigin() },
    }).then((r) => r.text());

    const replaced = transpiled.replace(
      /https:\/\/spike\.land\//g,
      `${this.code.getOrigin()}/`,
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

  private async handleCssRoute(request: Request): Promise<Response> {
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
    request: Request,
    url: URL,
    path: string[],
  ): Promise<Response> {
    const hashCode = String(Number(path[1]));
    const patch = await this.code.getState().storage.get<
      { patch: string; oldHash: number }
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
}

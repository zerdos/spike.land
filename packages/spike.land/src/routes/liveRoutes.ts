import { HTML, importMap, md5 } from "@spike-npm-land/code";
import type { Code } from "../chatRoom";

export class LiveRoutes {
  constructor(private code: Code) {}

  async handleLiveRoute(
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

  // Handles /live/${codeSpace}/mcp - This is just a legacy route that should not be used
  // The actual MCP server is available at /mcp
  private async handleMcpRoute(
    _request: Request,
    _url: URL,
    _path: string[],
  ): Promise<Response> {
    // This route should not be used anymore - return an error directing to the correct endpoint
    return new Response(
      JSON.stringify({
        jsonrpc: "2.0",
        id: crypto.randomUUID(),
        error: {
          code: -32601,
          message: "This MCP route is deprecated. Please use POST /mcp instead",
        },
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  async handleLazyRoute(
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

  async handleWrapRoute(
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

  async handleWrapHTMLRoute(): Promise<Response> {
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

  async handleRenderToStr(
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

  async handleScreenShotRoute(
    _request: Request,
    url: URL,
  ): Promise<Response> {
    const codeSpace = url.searchParams.get("room");
    const origin: string = this.code.getOrigin();
    return fetch(
      `https://spike-land-renderer.spikeland.workers.dev/?url=${origin}/live/${codeSpace}/embed&now=${Date.now()}`,
    ) as unknown as Promise<Response>;
  }
}

import { HTML, importMap, md5 } from "@spike-npm-land/code";
import type { Code } from "../chatRoom";

export class DefaultRoutes {
  constructor(private code: Code) {}

  async handleDefaultRoute(): Promise<Response> {
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

  async handleHtmlRoute(): Promise<Response> {
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
}
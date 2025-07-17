import {
  computeSessionHash,
  importMapReplace,
  md5,
} from "@spike-npm-land/code";
import type { Code } from "../chatRoom";

export class CodeRoutes {
  constructor(private code: Code) {}

  async handleCodeRoute(): Promise<Response> {
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

  async handleSessionRoute(
    _request: Request,
    url: URL,
  ): Promise<Response> {
    const codeSpace = url.searchParams.get("room");
    if (codeSpace && codeSpace !== this.code.getSession().codeSpace) {
      await this.code.updateAndBroadcastSession({
        ...this.code.getSession(),
        codeSpace,
      });
    }

    const session = this.code.getSession();
    const hash = computeSessionHash(session);
    const body = JSON.stringify({ ...session, hash }, null, 2);
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

  async handleJsRoute(): Promise<Response> {
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

  async handleCssRoute(): Promise<Response> {
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
}

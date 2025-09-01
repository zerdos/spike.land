import { HTML } from "@spike-npm-land/code";
import type Env from "./env";

export async function handleApiRequest(
  path: string[],
  request: Request,
  env: Env,
): Promise<Response> {
  switch (path[0]) {
    case "chat": {
      // Extract codeSpace from referer header
      const referer = request.headers.get("referer");
      if (!referer) {
        return new Response(JSON.stringify({ error: "Missing referer header" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }

      // Parse referer URL to extract codeSpace
      try {
        const refererUrl = new URL(referer);
        const pathParts = refererUrl.pathname.split("/");
        
        // Check if path is /live/[codeSpace]
        if (pathParts[1] === "live" && pathParts[2]) {
          const codeSpace = pathParts[2];
          
          // Forward request to /api/room/{codeSpace}/messages
          return handleApiRequest(
            ["room", codeSpace, "messages"],
            request,
            env,
          );
        } else {
          return new Response(JSON.stringify({ error: "Invalid referer path format" }), {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          });
        }
      } catch (_error) {
        return new Response(JSON.stringify({ error: "Invalid referer URL" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }
    }
    case "server-fetch": {
      if (request.method === "POST") {
        const { url, options } = await request.json<
          { url: string; options: RequestInit; }
        >();
        try {
          return await fetch(url, options) as unknown as Response;
        } catch (_error) {
          return new Response("Server-side fetch failed", { status: 500 });
        }
      } else {
        return new Response("Method not allowed", { status: 405 });
      }
    }
    case "generate":
    case "room": {
      if (!path[1]) {
        if (request.method === "POST") {
          const id = env.CODE.newUniqueId();
          return new Response(id.toString(), {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
            },
          });
        } else {
          return new Response("Method not allowed", { status: 405 });
        }
      }
      const name = path[1].replace(".tsx", "");
      let id;
      if (name.match(/^[0-9a-f]+$/) && name.length === 16) {
        id = env.CODE.idFromString(name);
      } else if (name.length <= 32) {
        id = env.CODE.idFromName(name);
      } else {
        return new Response("Name too long", { status: 404 });
      }
      const roomObject = env.CODE.get(id);
      const newUrl = new URL(request.url);
      newUrl.pathname = "/" + path.slice(2).join("/");
      if (request.headers.get("Sec-Fetch-Dest") === "script") {
        newUrl.pathname += "/index";
      }
      newUrl.searchParams.append("room", name);
      return roomObject.fetch(new Request(newUrl.toString(), request));
    }
    case "": {
      const respText = await HTML;
      const headers = new Headers({
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cross-Origin-Resource-Policy": "cross-origin",
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cache-Control": "no-cache",
        "Content-Encoding": "gzip",
        "Content-Type": "text/html; charset=UTF-8",
      });
      return new Response(respText, { status: 200, headers });
    }
    default: {
      return new Response("Not found", { status: 404 });
    }
  }
}

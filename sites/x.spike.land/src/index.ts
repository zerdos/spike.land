// import { babelTran /sform } from "./babel";
import { formatter } from "./prettier";
export default {
  async fetch(request: Request, env: string) {
    // We have received an HTTP request! Parse the URL and route the request.

    let url = new URL(request.url);
    let path = url.pathname.slice(1).split("/");

    switch (path[0]) {
      case "api":
        // This is a request for `/api/...`, call the API handler.
        return handleApiRequest(path.slice(1), request, env);

      default:
        return new Response("Noo, Not found", { status: 404 });
    }
  },
};

async function handleApiRequest(path: string[], request: Request, env: string) {
  // We've received at API request. Route the request based on the path.

  switch (path[0]) {
    case "prettier":
      if (request.method === "POST") {
        const text = await request.text();

        const formatted = formatter(text);

        return new Response(formatted, {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache",
            "Content-Type": "text/html; charset=UTF-8",
          },
        });
      } else {
        return new Response("please post", {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache",
            "Content-Type": "text/html; charset=UTF-8",
          },
        });
      }
    case "babel":
      if (request.method === "POST") {
        const text = await request.text();

        // const formatted = babelTransform(text);

        return new Response(text, {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache",
            "Content-Type": "text/html; charset=UTF-8",
          },
        });
      } else {
        return new Response("please post", {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache",
            "Content-Type": "text/html; charset=UTF-8",
          },
        });
      }
    default:
      return new Response(path[0], { status: 404 });
  }
}

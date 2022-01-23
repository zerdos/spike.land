import { version } from "@spike.land/code/package.json";
import { default as npmAns } from "@spike.land/cf-npm-site";
import { handleErrors } from "./handleErrors";
export default {
  async fetch(request, env) {
    return handleErrors(request, async () => {
      // We have received an HTTP request! Parse the URL and route the request.
      let url = new URL(request.url);
      let path = url.pathname.slice(1).split("/");
      if (!path[0]) {
        // Serve our HTML at the root path.
        return getHTMLResp(env, "code-main");
      }
      switch (path[0]) {
        case "ping":
          return new Response("ping" + Math.random(), {
            headers: {
              "Content-Type": "text/html;charset=UTF-8",
              "Cache-Control": "no-cache",
            },
          });
        case "api":
          // This is a request for `/api/...`, call the API handler.
          return handleApiRequest(path.slice(1), request, env);
        case "live":
          return getHTMLResp(env, path[1]);
        default:
          return npmAns("@spike.land/code", version, "js/")(request, env);
      }
    });
  },
};
async function handleApiRequest(path, request, env) {
  // We've received at API request. Route the request based on the path.
  switch (path[0]) {
    case "room": {
      if (!path[1]) {
        if (request.method === "POST") {
          let id = env.CODE.newUniqueId();
          return new Response(id.toString(), {
            headers: { "Access-Control-Allow-Origin": "*" },
          });
        } else {
          return new Response("Method not allowed", { status: 405 });
        }
      }
      let name = path[1];
      let id;
      if (name.match(/^[0-9a-f]{64}$/)) {
        id = env.CODE.idFromString(name);
      } else if (name.length <= 32) {
        id = env.CODE.idFromName(name);
      } else {
        return new Response("Name too long", { status: 404 });
      }
      let roomObject = env.CODE.get(id);
      let newUrl = new URL(request.url);
      newUrl.pathname = "/" + path.slice(2).join("/");
      newUrl.searchParams.append("room", name);
      return roomObject.fetch(newUrl.toString(), request);
    }
    default:
      return new Response("Not found", { status: 404 });
  }
}
async function getHTMLResp(env, room) {
  const id = env.CODE.idFromName(room);
  let roomObject = env.CODE.get(id);
  return roomObject.fetch("public");
}
//# sourceMappingURL=chat.js.map

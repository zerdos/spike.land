import { version } from "@spike.land/code/package.json";

import HTML from "./index.html";

import { default as npmAns } from "@spike.land/cf-npm-site";
export { Code } from "./code";
import { handleErrors } from "./handleErrors";
export { CodeRateLimiter } from "./rateLimiter.mjs";

async function handleApiRequest(
  paths: string[],
  request: Request,
  env: EventInit,
) {
  const last = paths[paths.length - 1];
  if (last === "websocket") {
    const roomname = paths.pop();
    let spikeLandSpace = env.CODE.idFromName(roomname) as unknown as Code;

    let pair = new WebSocketPair();
    pair[1].accept();
    const userSocket = pair[1];
    userSocket.send(JSON.stringify({ hello: "i am:", roomname }));

    let newUrl = new URL(request.url);
    newUrl.pathname = "/" + paths.slice(2).join("/");

    fetch(request, env);

    setInterval(() => {
      userSocket.send(JSON.stringify({ hello: Date.now() }));
    }, 20000);

    userSocket.addEventListener("close", () => {
      spikeLandSpace.remove(userSocket);
    });

    // pair[1].close(1011, "Uncaught exception during session setup");
    userSocket.addEventListener("message", function (event: MessageEventInit) {
      let data = (typeof event.data === "string")
        ? JSON.parse(event.data)
        : { type: "" };

      if (data) {
      }
    });

    return new Response(null, { status: 101, webSocket: userSocket });
  }
  return new Response(`{
    "message": "api-${paths}"
  }`);
}

interface ISocketError extends Error {
  stack: string;
}

export default {
  async fetch(request: Request, env: EventInit) {
    return await handleErrors(request, async () => {
      // We have received an HTTP request! Parse the URL and route the request.

      let url = new URL(request.url);
      let path = url.pathname.slice(1).split("/");

      if (!path[0]) {
        const html1 = HTML.slice(0, HTML.length - 40) + "*/";
        const html2 = "/*" + HTML.slice(HTML.length - 40);

        const rand = Math.random();
        const injection = `
              console.log(${rand});
          `;

        // Serve our HTML at the root path.
        return new Response(html1 + injection + html2, {
          headers: {
            "Content-Type": "text/html;charset=UTF-8",
            "Cache-Control": "no-cache",
          },
        });
      }

      switch (path[0]) {
        case "api":
          // This is a request for `/api/...`, call the API handler.
          return handleApiRequest(path.slice(1), request, env);

        default:
          return npmAns("@spike.land/code", version)(request, env);
      }
    });
  },
};

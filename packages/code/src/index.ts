import { handleRequest } from "./handler.ts";
//https://code.zed.vision/?h=4516e9e

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request as Request));
});

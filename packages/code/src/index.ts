import type {FetchEvent} from "./dec.ts"
import { handleRequest } from "./handler.ts";
//https://code.zed.vision/?h=4516e9e

addEventListener("fetch", (event: FetchEvent) => {

  event.respondWith(handleRequest(event.request));
});

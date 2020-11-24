import type { FetchEvent } from "./dec.ts";
import { handleCloudRequest } from "./handler.ts";

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(handleCloudRequest(event.request));
});

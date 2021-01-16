import type { FetchEvent } from "./dec.ts";
import { handleCloudRequest } from "./handler.ts";
import { handleOptions } from "./utils/handleOptions.ts";

addEventListener("fetch", (event: FetchEvent) => {
  if (event.request.method === "OPTIONS") {
    event.respondWith(handleOptions(event.request));
  } else {
    event.respondWith(handleCloudRequest(event.request));
  }
});

import type { FetchEvent } from "./dec.ts";
import { handleCloudRequest } from "./handler.ts";
const runner = "worker-cf";
//https://code.zed.vision/?h=4516e9e

addEventListener("fetch", (event: FetchEvent) => {
  if (runner !== "worker-cf") return;
  event.respondWith(handleCloudRequest(event.request));
});

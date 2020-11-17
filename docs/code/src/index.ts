import type { FetchEvent } from "./dec.ts";
import { handleCloudRequest } from "./handler.ts";

self.runner = self.runner || "worker-cf";

//https://code.zed.vision/?h=4516e9e

addEventListener("fetch", (event: FetchEvent) => {
  if (self.runner !== "worker-cf") return;

  event.respondWith(handleCloudRequest(event.request));
});

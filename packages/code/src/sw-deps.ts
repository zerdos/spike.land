import { QueuedFetch } from "@/lib/queued-fetch";
import { serveWithCache } from "@/lib/serve-with-cache";
import { fakeServer } from "./sw-local-fake-server";

export type { fakeServer, QueuedFetch, serveWithCache };

Object.assign(globalThis, {
  serveWithCache,
  QueuedFetch,
  fakeServer,
});

import fetchBuilder from "fetch-retry";
import originalFetch from "isomorphic-fetch";

globalThis.fetch = fetchBuilder(originalFetch, {
  retries: 3,
  retryDelay: 800,
});

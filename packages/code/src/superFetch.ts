import fetchBuilder from "fetch-retry";
import originalFetch from "isomorphic-fetch";

export const superFetch = fetchBuilder(originalFetch, {
  retries: 3,
  retryDelay: 800,
});

Object.assign(globalThis, { superFetch });

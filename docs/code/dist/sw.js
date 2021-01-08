"use strict";
// deno-lint-ignore-file
// @ts-ignore
importScripts("https://unpkg.com/workbox-sw@6.0.2/build/workbox-sw.js");
// @ts-ignore
workbox.loadModule("workbox-strategies");
// @ts-ignore
workbox.routing.registerRoute(
/**
 *
 * @param {{url: {origin: string}}} opts
 */
({ url }) => url.origin === "https://unpkg.com" ||
    url.origin === "https://zed.vision" ||
    url.origin === "https://code.com" ||
    url.origin === "https://blog.zed.vision", 
// @ts-ignore
new workbox.stsrategies.CacheFirst());
// @ts-ignore
self.addEventListener("fetch", /**
* @param {{ respondWith?: any; request?: any; }} event
*/ (event) => {
    const { request } = event;
    const { url } = request;
    if (!url.endsWith("sw.js") && (url.endsWith(".js") || url.endsWith(".json") || url.endsWith(".map") ||
        url.endsWith(".html") || url.endsWith(".woff") ||
        url.endsWith(".jpg") || url.endsWith(".css") ||
        url.endsWith(".png") || url.endsWith(".ts"))) {
        // Using the previously-initialized strategies will work as expected.
        // @ts-ignore
        const cacheFirst = new workbox.strategies.CacheFirst();
        event.respondWith(cacheFirst.handle({ event, request }));
    }
});

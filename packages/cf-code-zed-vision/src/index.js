import { version } from "@zedvision/code/package.json";
import { cid } from "@zedvision/code/ipfs.json";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const url = new URL(request.url);
  const { searchParams, pathname } = url;

  if (pathname.slice(0, 6) === "/ipfs/") {
    const cache = caches.default;
    let response = await cache.match(request);

    if (!response) {
      response = await fetch(`https://ipfs.io/${pathname}`);
      await cache.put(request, response.clone());
    }
    if (response.status > 399) {
      response = new Response(
        response.statusText,
        { status: response.status },
      );
    }
    return response;
  }

  if (pathname === "/dist/sw.js") {
    return js(
      `importScripts(
        "https://unpkg.com/workbox-sw@6.0.2/build/workbox-sw.js",
      );
      
      // This will trigger the importScripts() for workbox.strategies and its dependencies:
      // deno-lint-ignore ban-ts-comment
      //@ts-ignore
      // deno-lint-ignore no-undef
      const { strategies, registerRoute } = workbox;
      
      
      registerRoute(
        ({url}) => url.origin === 'https://unpkg.com' ||
                   url.origin === 'https://blog.zed.vision')
      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      self.addEventListener(
        "fetch", /**
       * @param {{ respondWith?: any; request?: any; }} event
       */
        (event) => {
          const { request } = event;
          const { url } = request;
          if (
            !url.endsWith("sw.js") &&
            (url.endsWith(".js") && url.endsWith(".html") || url.endsWith(".woff") ||  url.endsWith(".jpg") ||
              url.endsWith(".png") || url.endsWith(".ts") || url.endsWith(".tsx"))
          ) {
            // Using the previously-initialized strategies will work as expected.
            const cacheFirst = new strategies.StaleWhileRevalidate();
            event.respondWith(cacheFirst.handle({ event, request }));
          }
        },
      );`,
    );
  }

  return text(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="icon" type="image/png" href="https://blog.zed.vision/zed-icon-big.png" />
  <title>Instant React Editor</title>
  </head>
  <body>
    <script type="module">
      import {run} from "https://blog.zed.vision/code/${cid}/src/codeLoader.js"
      try{
        run("window", window);
      }catch(error){
        fetch("https://zed.vision/error", {method: "POST",  body: JSON.stringify({error})})
      }
    </script>
  </body>
  </html>
`);
}

export function js(resp) {
  return new Response(resp, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Max-Age": "86400",
      "Content-Type": "application/javascript;charset=UTF-8",
    },
  });
}

function text(resp) {
  return new Response(resp, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Max-Age": "86400",
      "Content-Type": "text/html;charset=UTF-8",
    },
  });
}

import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import { handleRequest } from "./request";

export default {
    
        async fetch(request , env, ctx){
      
          // const url = new URL(request.url);
      
          // if (url.pathname.length>1) return getAssetFromKV();
          return new Response("Hello Miniflare!");
          // return event.respondWith(handleRequest(event.request));
        },
        async scheduled(controller, env, ctx) {
          // - `controller` contains `scheduledTime` and `cron` properties
          // - `env` contains bindings, KV namespaces, Durable Objects, etc
          // - `ctx` contains the `waitUntil` method
          console.log("Doing something scheduled...");
}}

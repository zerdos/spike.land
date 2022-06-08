// import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import { handleRequest } from "./request";





export default{
        fetch: async (request, env, ctx) =>{
      
          const url = new URL(request.url);
      
          // if (url.pathname.length>1) return getAssetFromKV({
          //   request,
          //   waitUntil(promise) {
          //     return ctx.waitUntil(promise)
          //   }
          // });

          return new Response("YAY");
          // return event.respondWith(handleRequest(event.request));
        },
        scheduled: (controller: ScheduledController , env: EventInit, ctx: ExecutionContext) =>  {
          // - `controller` contains `scheduledTime` and `cron` properties
          // - `env` contains bindings, KV namespaces, Durable Objects, etc
          // - `ctx` contains the `waitUntil` method
          console.log("Doing something scheduled...");
}} as ExportedHandler

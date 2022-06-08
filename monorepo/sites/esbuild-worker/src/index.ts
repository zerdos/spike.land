import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import { handleRequest } from "./request";


export default {
  fetch: async (event: FetchEvent )=> {

    const url = new URL(event.request.url);

    if (url.pathname.length>1) return event.respondWith(getAssetFromKV(event));

    return event.respondWith(handleRequest(event.request));
  }
}

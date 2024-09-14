import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import { ASSET_HASH, files, ASSET_MANIFEST } from "./staticContent.mjs";
import Env from "./env";



    export const serveRequestFromKv = () => {

        let fileCache: Cache;
        const initCache = () => caches.open("fileCache").then((cache) => fileCache = cache);
const isAsset = (request: Request) => {
    const url = new URL(request.url);
    const pathname = url.pathname;

 return   pathname.startsWith("/" + ASSET_HASH) || !!files[pathname.slice(1)] 
}

return {  isAsset,
        serve: async (request: Request, env: Env, ctx: ExecutionContext)=> { 
            if (!isAsset(request)) throw new Error("Not an asset");
           
            const url = new URL(request.url);





            const filePath = url.pathname.slice(ASSET_HASH.length + 2) 
            

      

            if (!fileCache) await initCache();
      
      
              const  cacheKey = new Request(new URL(files[filePath], url.origin).toString());
              let resp = await fileCache.match(cacheKey);
              if (resp) return resp;
      
      
              
              const req = new Request(request.url.replace(`/${ASSET_HASH}`, ``), request.clone());
              let kvResp = await getAssetFromKV(
                {
                  request: req,
                  waitUntil(promise) {
                    return ctx.waitUntil(promise);
                  },
                },
                {
                  ASSET_NAMESPACE: env.__STATIC_CONTENT,
                  ASSET_MANIFEST,
                }
              );
          
              if (!kvResp.ok) {
                return kvResp;
              }
           
              const headers = new Headers(kvResp.headers);
              if (filePath.endsWith(".html")) {
                headers.set("Content-Type", "text/html"); 
              }
              kvResp.headers.forEach((v, k) => headers.append(k, v));
            
              headers.append(
                "Cache-Control",
                "public, max-age=604800, immutable",
              );
              // }
      
      
              headers.append("Cross-Origin-Embedder-Policy", "require-corp");
              headers.append("Access-Control-Allow-Origin", "*");
      
        
              kvResp = new Response(kvResp.body, { ...kvResp, headers });
              ctx.waitUntil(fileCache.put(cacheKey, kvResp.clone()));
      
          
              return kvResp;
            
        }
    }
}
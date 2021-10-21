import {version} from "@spike.land/blog-artifacts/package.json"

export default {
    async fetch(request: Request, env: EventInit) {
      try {

        let myCache = await caches.open(`blog-npm:${version}`);
        const cachedResp = await myCache.match(request, {})

        if (cachedResp) return cachedResp;

        const url = new URL(request.url);
        const {pathname} = url;

        let targetPath = pathname;
        
        if (pathname === "/") {
          targetPath = "/index.html"
        } 
        const resp = fetch(`https://unpkg.com/@spike.land/blog-artifacts@${version}/public${targetPath}`);

        myCache.put(request, (await resp).clone());

        return resp;
      } catch (Error) {
        return new Response(`Yayy... ${Object.prototype.toString.call(Error)}`);
      }
    },
  };
  
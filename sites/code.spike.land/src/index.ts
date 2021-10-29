import {version} from "@spike.land/code/package.json"
export { Code } from "./code";

export default {
    async fetch(request: Request, env: EventInit) {
      try {

        const url = new URL(request.url);
        const {pathname} = url;


        // let id = env.CODE.idFromName(pathname.substring(1, 3));
        // let obj = env.CODE.get(id);

        // let response = await obj.fetch(request.url);

        // let count = parseInt(await response.text());
        
      
        const uri = (pathname.startsWith("/@")?pathname.substring(1):`@${version}${pathname}`)


        let myCache = await caches.open(`blog-npm:${version}`);
        const cachedResp = await myCache.match(request, {})

        if (cachedResp) return cachedResp;

        let targetPath = uri;
        
        if (uri.endsWith("/")) {
          targetPath = `${uri}/index.html`
        } 
        const resp = fetch(`https://unpkg.com/@spike.land/code${targetPath}`);
    
        myCache.put(request, (await resp).clone());

        return resp;
      } catch (Error) {
        return new Response(`Yayy... ${Object.prototype.toString.call(Error)}`);
      }
    },
  };
  
// ../../packages/code/package.json
var version = "0.0.34";

// src/index.ts
var src_default = {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const { pathname } = url;
      const uri = pathname.startsWith("/@") ? pathname.substring(1) : `@${version}${pathname}`;
      let myCache = await caches.open(`blog-npm:${version}`);
      const cachedResp = await myCache.match(request, {});
      if (cachedResp)
        return cachedResp;
      let targetPath = uri;
      if (uri.endsWith("/")) {
        targetPath = `${uri}/index.html`;
      }
      const resp = fetch(`https://unpkg.com/@spike.land/code${targetPath}`);
      myCache.put(request, (await resp).clone());
      return resp;
    } catch (Error) {
      return new Response(`Yayy... ${Object.prototype.toString.call(Error)}`);
    }
  }
};
export {
  src_default as default
};

// ../../packages/blog/package.json
var version = "0.0.33";

// src/index.ts
var src_default = {
  async fetch(request, env) {
    try {
      let myCache = await caches.open(`blog-npm:${version}`);
      const cachedResp = await myCache.match(request, {});
      if (cachedResp)
        return cachedResp;
      const url = new URL(request.url);
      const { pathname } = url;
      let targetPath = pathname;
      if (pathname === "/") {
        targetPath = "/index.html";
      }
      const resp = fetch(`https://unpkg.com/@spike.land/blog-artifacts@${version}/public${targetPath}`);
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

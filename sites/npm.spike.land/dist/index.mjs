// ../../packages/cf-npm-site/dist/index.mjs
function src_default(packageName, version2, serveDir = "") {
  return async function(request, env) {
    try {
      const url = new URL(request.url);
      const { pathname } = url;
      const uri = pathname.startsWith("/@") ? pathname.substring(1) : `@${version2}${serveDir ? `/${serveDir}` : ``}${pathname}`;
      let myCache = await caches.open(`blog-npm:${version2}-${serveDir}`);
      const cachedResp = await myCache.match(request, {});
      if (cachedResp) {
        return cachedResp;
      }
      let targetPath = uri;
      if (uri.endsWith("/")) {
        targetPath = `${uri}index.html`;
      } else if (pathname.indexOf(".") === -1) {
        targetPath = `${uri}/index.html`;
      }
      const resp = fetch(`https://unpkg.com/${packageName}${targetPath}`);
      myCache.put(request, (await resp).clone());
      return resp;
    } catch (Error) {
      return new Response(`Yayy... ${Object.prototype.toString.call(Error)}`);
    }
  };
}

// ../../packages/blog/package.json
var version = "0.1.39";

// src/index.ts
var fetch2 = src_default("@spike.land/blog-artifacts", version, "public");
var src_default2 = {
  fetch: fetch2
};
export {
  src_default2 as default
};

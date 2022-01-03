export default function (
  packageName: string,
  version: string,
  serveDir: string = "",
) {
  return async function (request: Request, env: EventInit) {
    try {
      const url = new URL(request.url);
      const { pathname } = url;

      const uri = (pathname.startsWith("/@")
        ? pathname.substring(1)
        : `@${version}${
          serveDir
            ? `/${serveDir}`
            : ``
        }${pathname}`);

      let myCache = await caches.open(`blog-npm:${version}-${serveDir}`);
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
      
      const reqCloned = request.clone()

      const newReq = new Request(`https://unpkg.com/${packageName}${targetPath}`, {
        headers: {
          ...reqCloned.headers
        }
      })

      const origResp =await fetch(newReq);

      if (!origResp.ok) {return origResp;}


      const cloned = origResp.clone();

      const resp =  new Response(cloned.body, {
        headers: {
          ...cloned.headers,
          "Cache-Control": "no-cache"
        }});


        // ich

      if (pathname.endsWith(".mjs") || pathname.endsWith(".js") || pathname.endsWith(".ts") || pathname.endsWith(".tsx")){
        resp.headers.delete("content-type");
        resp.headers.set(
          "content-type",
          "text/javascript;charset=UTF-8",
        );
      } else if (pathname.endsWith(".css")) {
        resp.headers.delete("content-type");
        resp.headers.set(
          "content-type",
          "text/css;charset=UTF-8",
        );
      } else if (pathname.endsWith(".json")) {
        resp.headers.delete("content-type");
        resp.headers.set(
          "content-type",
          "application/json;charset=UTF-8",
        );
      } else if (pathname.endsWith(".jpg")) {
        resp.headers.delete("content-type");
        resp.headers.set("content-type", "image/jpeg");
      } else if (pathname.indexOf(".") === -1 || pathname.endsWith(".html")) {
        resp.headers.delete("content-type"),
          resp.headers.set(
            "content-type",
            "text/html;charset=UTF-8",
          );
      }

      if (origResp.status === 200) myCache.put(request, resp.clone());

      return resp;
    } catch (Error) {
      return new Response(`No... ${Object.prototype.toString.call(Error)}`);
    }
  };
}

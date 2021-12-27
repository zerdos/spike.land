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

      const resp =await fetch(`https://unpkg.com/${packageName}${targetPath}`);

      if (resp.status === 200) myCache.put(request, resp.clone());
      resp.headers.append( "Cache-Control", "no-cache");
      return resp;
    } catch (Error) {
      return new Response(`Yayy... ${Object.prototype.toString.call(Error)}`);
    }
  };
}

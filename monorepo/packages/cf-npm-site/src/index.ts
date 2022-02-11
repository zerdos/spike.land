export default function (
  packageName: string,
  version: string,
  serveDir: string = "",
) {
  return async function (request: Request, env: EventInit) {
    return await tryToResp(request, env, 4);

    async function tryToResp(
      request: Request,
      env: EventInit,
      retry: number,
    ): Promise<Response> {
      try {
        const url = new URL(request.url);
        const pathname  = String(url.pathname);

        const isChunk = pathname.indexOf("/chunks") !== -1;

        const cacheKey = isChunk
          ? new Request(
            url.origin + pathname.substring(pathname.indexOf("/chunks" + 7)),
            request,
          )
          : new Request(url.toString(), request);
        const cache = caches.default;

        const cachedResp = await cache.match(cacheKey);

        if (cachedResp) {
          return cachedResp;
        }

        const uri = (pathname.startsWith("/@")
          ? pathname.substring(1)
          : `@${version}${
            serveDir
              ? `/${serveDir}`
              : ``
          }${pathname}`);

        let targetPath = uri;

        if (uri.endsWith("/")) {
          targetPath = `${uri}index.html`;
        } else if (pathname.indexOf(".") === -1) {
          targetPath = `${uri}/index.html`;
        }

        const reqCloned = request.clone();

        const newReq = new Request(
          `https://unpkg.com/${packageName}${targetPath}`,
          {
            headers: {
              ...reqCloned.headers,
            },
          },
        );

        const origResp = await fetch(newReq);

        if (!origResp.ok) throw new Error("not ok");

        const cloned = origResp.clone();

        const resp = new Response(cloned.body, {
          headers: {
            ...cloned.headers,
            "Cache-Control": isChunk
              ? "public, max-age=604800, immutable"
              : "no-cache",
          },
        });

        // ich

        if (
          pathname.endsWith(".mjs") || pathname.endsWith(".js") ||
          pathname.endsWith(".ts") || pathname.endsWith(".tsx")
        ) {
          resp.headers.delete("content-type");
          resp.headers.set(
            "content-type",
            "text/javascript;charset=UTF-8",
          );
          resp.headers.set("Access-Control-Allow-Origin", "*");
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

        if (origResp.status === 200) await cache.put(cacheKey, resp.clone());

        return resp;
      } catch (Error) {
        if (retry > 4) {
          await wait(5000 - retry * 1000);
          return tryToResp(request, env, retry - 1);
        }
        throw Error;
      }
    }
  };
}

async function wait(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

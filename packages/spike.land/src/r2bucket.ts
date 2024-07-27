import { ExportedHandler } from '@cloudflare/workers-types';
import MyEnv from "./env";

const R2BucketHandler: ExportedHandler<MyEnv> = {
  async fetch(request: Request, env: MyEnv): Promise<Response> {
    try {
      const url = new URL(request.url);
      const key = url.pathname.slice(1);

      switch (request.method) {
        case "PUT":
          await env.R2.put(key, request.body);
          return new Response(`Put ${key} successfully!`, { status: 200 });

        case "GET":
          const object = await env.R2.get(key);

          if (object === null) {
            return new Response("Object Not Found", { status: 404 });
          }

          const headers = new Headers();
          object.writeHttpMetadata(headers);
          headers.set("etag", object.httpEtag);

          return new Response(object.body, { headers });

        case "DELETE":
          await env.R2.delete(key);
          return new Response("Deleted!", { status: 200 });

        default:
          return new Response("Method Not Allowed", {
            status: 405,
            headers: {
              Allow: "PUT, GET, DELETE",
            },
          });
      }
    } catch (error) {
      console.error("R2 Bucket Handler Error:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};

export default R2BucketHandler;

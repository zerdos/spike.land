import { ExportedHandler } from "@cloudflare/workers-types";
import MyEnv from "./env";

const handlePut = async (
  key: string,
  body: ReadableStream | null,
  env: MyEnv,
): Promise<Response> => {
  if (!body) {
    return new Response("Missing request body", { status: 400 });
  }
  await env.R2.put(key, body);
  return new Response(`Put ${key} successfully!`, { status: 200 });
};

const handleGet = async (key: string, env: MyEnv): Promise<Response> => {
  const object = await env.R2.get(key);
  if (!object) {
    return new Response("Object Not Found", { status: 404 });
  }
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  return new Response(object.body, { headers });
};

const handleDelete = async (key: string, env: MyEnv): Promise<Response> => {
  await env.R2.delete(key);
  return new Response("Deleted!", { status: 200 });
};

const R2BucketHandler: ExportedHandler<MyEnv> = {
  async fetch(request: Request, env: MyEnv): Promise<Response> {
    try {
      const url = new URL(request.url);
      const key = url.pathname.slice(1);

      switch (request.method) {
        case "PUT":
          return handlePut(key, request.body, env);
        case "GET":
          return handleGet(key, env);
        case "DELETE":
          return handleDelete(key, env);
        default:
          return new Response("Method Not Allowed", {
            status: 405,
            headers: { Allow: "PUT, GET, DELETE" },
          });
      }
    } catch (error) {
      console.error("R2 Bucket Handler Error:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};

export default R2BucketHandler;

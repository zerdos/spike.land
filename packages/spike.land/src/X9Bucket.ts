import type MyEnv from "./env";
import { createResponse } from "./types/cloudflare";

const handlePut = async (
  key: string,
  body: ReadableStream | null,
  env: MyEnv,
): Promise<Response> => {
  if (!body) {
    return createResponse("Missing request body", { status: 400 });
  }
  await env.X9.put(key, body);
  return createResponse(`Put ${key} successfully!`, { status: 200 });
};

const handleGet = async (key: string, env: MyEnv): Promise<Response> => {
  const object = await env.X9.get(key);
  if (!object) {
    return createResponse("Object Not Found", { status: 404 });
  }
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  const arrayBuffer = await new Response(object.body).arrayBuffer();
  const plainHeaders: Record<string, string> = {};
  headers.forEach((value, key) => {
    plainHeaders[key] = value;
  });
  return createResponse(arrayBuffer, { headers: plainHeaders });
};

const handleDelete = async (key: string, env: MyEnv): Promise<Response> => {
  await env.X9.delete(key);
  return createResponse("Deleted!", { status: 200 });
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
          return createResponse("Method Not Allowed", {
            status: 405,
            headers: { Allow: "PUT, GET, DELETE" },
          });
      }
    } catch (error) {
      console.error("R2 Bucket Handler Error:", error);
      return createResponse("Internal Server Error", { status: 500 });
    }
  },
};

export default R2BucketHandler;

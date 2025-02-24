import type MyEnv from "./env";
import { createResponse } from "./types/cloudflare";

const handlePut = async (
  key: string,
  body: Blob | null,
  env: MyEnv,
): Promise<Response> => {
  if (!body || body.size === 0) {
    return createResponse("Missing request body", { status: 400 });
  }
  try {
    await env.R2.put(key, body);
    return createResponse(`Put ${key} successfully!`, { status: 200 });
  } catch (error) {
    console.error("R2 put error:", error);
    return createResponse("Failed to store object", { status: 500 });
  }
};

const handleGet = async (key: string, env: MyEnv): Promise<Response> => {
  try {
    const object = await env.R2.get(key);
    if (!object) {
      return createResponse("Object Not Found", { status: 404 });
    }
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);

    return new Response(object.body, {
      headers,
      status: 200,
    });
  } catch (error) {
    console.error("R2 get error:", error);
    return createResponse("Failed to retrieve object", { status: 500 });
  }
};

const handleDelete = async (key: string, env: MyEnv): Promise<Response> => {
  try {
    await env.R2.delete(key);
    return createResponse("Deleted!", { status: 200 });
  } catch (error) {
    console.error("R2 delete error:", error);
    return createResponse("Failed to delete object", { status: 500 });
  }
};

const R2BucketHandler = {
  async fetch(
    request: Request,
    env: MyEnv,
    _ctx: ExecutionContext,
  ): Promise<Response> {
    try {
      const url = new URL(request.url);
      const key = url.pathname.slice(1);

      switch (request.method) {
        case "PUT": {
          const body = request.body ? await request.blob() : null;
          if (!body) {
            return createResponse("Missing request body", { status: 400 });
          }
          return handlePut(key, body, env);
        }
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

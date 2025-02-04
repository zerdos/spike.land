import type { ExportedHandler, Response as CFResponse } from "@cloudflare/workers-types";
import type MyEnv from "./env";
import { createCFResponse } from "./types/cloudflare";

const handlePut = async (
  key: string,
  body: Blob | null,
  env: MyEnv,
): Promise<CFResponse> => {
  if (!body || body.size === 0) {
    return createCFResponse("Missing request body", { status: 400 });
  }
  try {
    await env.R2.put(key, body);
    return createCFResponse(`Put ${key} successfully!`, { status: 200 });
  } catch (error) {
    console.error("R2 put error:", error);
    return createCFResponse("Failed to store object", { status: 500 });
  }
};

const handleGet = async (key: string, env: MyEnv): Promise<CFResponse> => {
  try {
    const object = await env.R2.get(key);
    if (!object) {
      return createCFResponse("Object Not Found", { status: 404 });
    }
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
    return createCFResponse(object.body, { headers });
  } catch (error) {
    console.error("R2 get error:", error);
    return createCFResponse("Failed to retrieve object", { status: 500 });
  }
};

const handleDelete = async (key: string, env: MyEnv): Promise<CFResponse> => {
  try {
    await env.R2.delete(key);
    return createCFResponse("Deleted!", { status: 200 });
  } catch (error) {
    console.error("R2 delete error:", error);
    return createCFResponse("Failed to delete object", { status: 500 });
  }
};

const R2BucketHandler: ExportedHandler<MyEnv> = {
  async fetch(request: Request, env: MyEnv): Promise<CFResponse> {
    try {
      const url = new URL(request.url);
      const key = url.pathname.slice(1);

      switch (request.method) {
        case "PUT": {
          const body = await request.blob();
          return handlePut(key, body as Blob, env);
        }
        case "GET":
          return handleGet(key, env);
        case "DELETE":
          return handleDelete(key, env);
        default:
          return createCFResponse("Method Not Allowed", {
            status: 405,
            headers: { Allow: "PUT, GET, DELETE" },
          });
      }
    } catch (error) {
      console.error("R2 Bucket Handler Error:", error);
      return createCFResponse("Internal Server Error", { status: 500 });
    }
  },
};

export default R2BucketHandler;

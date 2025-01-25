import type {
  ExportedHandler,
  ReadableStream as CFReadableStream,
  Request as CFRequest,
  Response as CFResponse,
} from "@cloudflare/workers-types";
import type MyEnv from "./env";
import { createCFResponse } from "./types/cloudflare";

const handlePut = async (
  key: string,
  body: CFReadableStream | null,
  env: MyEnv,
): Promise<CFResponse> => {
  if (!body) {
    return createCFResponse("Missing request body", { status: 400 });
  }
  await env.X9.put(key, body);
  return createCFResponse(`Put ${key} successfully!`, { status: 200 });
};

const handleGet = async (key: string, env: MyEnv): Promise<CFResponse> => {
  const object = await env.X9.get(key);
  if (!object) {
    return createCFResponse("Object Not Found", { status: 404 });
  }
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  return createCFResponse(object.body, { headers });
};

const handleDelete = async (key: string, env: MyEnv): Promise<CFResponse> => {
  await env.X9.delete(key);
  return createCFResponse("Deleted!", { status: 200 });
};

const R2BucketHandler: ExportedHandler<MyEnv> = {
  async fetch(request: CFRequest, env: MyEnv): Promise<CFResponse> {
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

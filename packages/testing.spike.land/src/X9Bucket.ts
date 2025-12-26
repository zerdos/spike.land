import type MyEnv from "./env";
import { createResponse } from "./types/cloudflare";

/**
 * Typed error interface for storage operations
 */
interface StorageError {
  name: string;
  message: string;
  code?: string;
}

/**
 * Type guard to check if an unknown error is a StorageError
 */
function isStorageError(error: unknown): error is StorageError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as StorageError).message === "string"
  );
}

/**
 * Extract error message from unknown error type
 */
function getErrorMessage(error: unknown): string {
  if (isStorageError(error)) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

const handlePut = async (
  key: string,
  body: ReadableStream | null,
  env: MyEnv,
): Promise<Response> => {
  if (!body) {
    return createResponse("Missing request body", { status: 400 });
  }
  try {
    await env.X9.put(key, body);
    return createResponse(`Put ${key} successfully!`, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.error("X9 put error:", { key, error: errorMessage });
    return createResponse(
      JSON.stringify({ error: "Failed to store object", details: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};

const handleGet = async (key: string, env: MyEnv): Promise<Response> => {
  try {
    const object = await env.X9.get(key);
    if (!object) {
      return createResponse(
        JSON.stringify({ error: "Object Not Found", key }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
    const arrayBuffer = await new Response(object.body).arrayBuffer();
    const plainHeaders: Record<string, string> = {};
    headers.forEach((value, headerKey) => {
      plainHeaders[headerKey] = value;
    });
    return createResponse(arrayBuffer, { headers: plainHeaders });
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.error("X9 get error:", { key, error: errorMessage });
    return createResponse(
      JSON.stringify({ error: "Failed to retrieve object", details: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};

const handleDelete = async (key: string, env: MyEnv): Promise<Response> => {
  try {
    await env.X9.delete(key);
    return createResponse("Deleted!", { status: 200 });
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.error("X9 delete error:", { key, error: errorMessage });
    return createResponse(
      JSON.stringify({ error: "Failed to delete object", details: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
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
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      console.error("X9 Bucket Handler Error:", { error: errorMessage });
      return createResponse(
        JSON.stringify({ error: "Internal Server Error", details: errorMessage }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },
};

export default R2BucketHandler;

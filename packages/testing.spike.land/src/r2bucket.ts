import type MyEnv from "./env";
import { createResponse } from "./types/cloudflare";

/**
 * Typed error interface for R2 storage operations
 */
interface R2StorageError {
  name: string;
  message: string;
  code?: string;
}

/**
 * Type guard to check if an unknown error is an R2StorageError
 */
function isR2StorageError(error: unknown): error is R2StorageError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as R2StorageError).message === "string"
  );
}

/**
 * Extract error message from unknown error type
 */
function getErrorMessage(error: unknown): string {
  if (isR2StorageError(error)) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

/**
 * Check if error indicates object not found (for differentiated error responses)
 */
function isNotFoundError(error: unknown): boolean {
  const message = getErrorMessage(error).toLowerCase();
  return message.includes("not found") || message.includes("does not exist");
}

/**
 * Check if error indicates access denied
 */
function isAccessDeniedError(error: unknown): boolean {
  const message = getErrorMessage(error).toLowerCase();
  return message.includes("access denied") || message.includes("forbidden") || message.includes("unauthorized");
}

const handlePut = async (
  key: string,
  body: Blob | null,
  env: MyEnv,
): Promise<Response> => {
  if (!body || body.size === 0) {
    return createResponse(
      JSON.stringify({ error: "Missing request body" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }
  try {
    await env.R2.put(key, body);
    return createResponse(`Put ${key} successfully!`, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.error("R2 put error:", { key, error: errorMessage });

    if (isAccessDeniedError(error)) {
      return createResponse(
        JSON.stringify({ error: "Access denied", key, details: errorMessage }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    return createResponse(
      JSON.stringify({ error: "Failed to store object", key, details: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};

const handleGet = async (key: string, env: MyEnv): Promise<Response> => {
  try {
    const object = await env.R2.get(key);
    if (!object) {
      return createResponse(
        JSON.stringify({ error: "Object Not Found", key }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);

    return new Response(object.body, {
      headers,
      status: 200,
    });
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.error("R2 get error:", { key, error: errorMessage });

    if (isNotFoundError(error)) {
      return createResponse(
        JSON.stringify({ error: "Object Not Found", key, details: errorMessage }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    if (isAccessDeniedError(error)) {
      return createResponse(
        JSON.stringify({ error: "Access denied", key, details: errorMessage }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    return createResponse(
      JSON.stringify({ error: "Failed to retrieve object", key, details: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};

const handleDelete = async (key: string, env: MyEnv): Promise<Response> => {
  try {
    await env.R2.delete(key);
    return createResponse("Deleted!", { status: 200 });
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.error("R2 delete error:", { key, error: errorMessage });

    if (isNotFoundError(error)) {
      return createResponse(
        JSON.stringify({ error: "Object Not Found", key, details: errorMessage }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    if (isAccessDeniedError(error)) {
      return createResponse(
        JSON.stringify({ error: "Access denied", key, details: errorMessage }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    return createResponse(
      JSON.stringify({ error: "Failed to delete object", key, details: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
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
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      console.error("R2 Bucket Handler Error:", { error: errorMessage });
      return createResponse(
        JSON.stringify({ error: "Internal Server Error", details: errorMessage }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },
};

export default R2BucketHandler;

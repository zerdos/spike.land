import type {
  ExecutionContext,
  ExportedHandler,
  Headers as CFHeaders,
  IncomingRequestCfProperties,
  Request as CFRequest,
  Response as CFResponse,
} from "@cloudflare/workers-types";

// Type for a request with CF properties
export type CFWorkerRequest = Request & {
  cf: IncomingRequestCfProperties;
};

export type { CFRequest, CFResponse };

export function createCFResponse(
  body?: BodyInit | null,
  init?: ResponseInit,
): CFResponse {
  const response = new Response(body, init);
  (response.headers as unknown as CFHeaders).getAll = function(name: string) {
    const values = this.get(name);
    return values ? [values] : [];
  };
  return response as unknown as CFResponse;
}

export function ensureCFResponse(response: Response | null | undefined): CFResponse {
  if (!response) return createCFResponse("Not Found", { status: 404 });
  return response as unknown as CFResponse;
}

export function ensureCFRequest(request: Request): CFWorkerRequest {
  return request as unknown as CFWorkerRequest;
}

export function createHandler<Env>(
  handler: (request: CFWorkerRequest, env: Env, ctx: ExecutionContext) => Promise<Response | null>,
): ExportedHandler<Env> {
  return {
    async fetch(request, env, ctx) {
      const cfRequest = ensureCFRequest(request);
      const response = await handler(cfRequest, env, ctx);
      return ensureCFResponse(response);
    },
  };
}

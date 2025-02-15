import {
  ExecutionContext,
  ExportedHandler,
  IncomingRequestCfProperties,
  ResponseInit,
  BodyInit,
  Response
} from "@cloudflare/workers-types";

// Type for a request with  properties
export type WorkerRequest = Request & {
  cf: IncomingRequestCfProperties;
};


export function createResponse(
  body: BodyInit,
  init?: ResponseInit,
): Response {
  const response = new Response(body, init);
  response.headers.getAll = function(name: string) {
    const values = this.get(name);
    return values ? [values] : [];
  };
  return response as unknown as Response;
}

export function ensureResponse(response: Response | null | undefined): Response {
  if (!response) return createResponse("Not Found", { status: 404 });
  return response as unknown as Response;
}



export function createHandler<Env>(
  handler:ExportedHandler<Env>["fetch"]
): ExportedHandler<Env> {
  return {
    fetch: handler
};
}

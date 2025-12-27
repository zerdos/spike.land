// CORS headers for API proxies
export const API_CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
} as const;

/**
 * Creates a CORS preflight response for API proxies (OPTIONS requests)
 */
export function createCorsPreflightResponse(): Response {
  return new Response(null, {
    headers: API_CORS_HEADERS,
  });
}

/**
 * Adds CORS headers to an existing Response
 */
export function addCorsHeadersToResponse(response: Response): Response {
  const responseHeaders = new Headers(response.headers);
  responseHeaders.set("Access-Control-Allow-Origin", "*");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}

/**
 * Creates a JSON error response with CORS headers
 */
export function createCorsErrorResponse(
  error: string,
  details: string,
  status = 500,
): Response {
  return new Response(
    JSON.stringify({
      error,
      details,
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}

export function isChunk(link: string) {
  const chunkRegExp = /[.]{1}[a-f0-9]{10}[.]+/gm;
  return link.indexOf("chunk-") !== -1 || chunkRegExp.test(link);
}

export function isUrlFile(pathname: string) {
  const url = new URL(`/${pathname}`, "https://example.com").pathname.slice(1);

  const parts = url.split("/");
  const lastSegment = parts.pop() || parts.pop(); // handle potential trailing slash
  if (!lastSegment || (lastSegment && !lastSegment.includes("."))) {
    return false;
  }

  return false;
}

export function handleCORS(request: Request) {
  const headers = request.headers;
  if (
    headers.get("Origin") !== null &&
    headers.get("Access-Control-Request-Method") !== null &&
    headers.get("Access-Control-Request-Headers") !== null
  ) {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } else {
    return new Response(null, {
      headers: {
        Allow: "POST, OPTIONS",
      },
    });
  }
}

export function handleUnauthorizedRequest(): Response {
  return new Response(null, { status: 401, statusText: "no robots" });
}

export function handleRedirectResponse(url: URL, start: string): Response {
  return new Response(
    `<meta http-equiv="refresh" content="0; URL=${url.origin}/live/${start}" />`,
    {
      status: 307,
      headers: {
        "Location": `${url.origin}/live/${start}`,
        "Content-Type": "text/html;charset=UTF-8",
        "Cache-Control": "no-cache",
        "Content-Encoding": "gzip",
      },
    },
  );
}

export async function readRequestBody(request: Request) {
  const contentType = request.headers.get("content-type");
  if (contentType!.includes("application/json")) {
    return request.json();
  } else if (contentType!.includes("application/text")) {
    return request.text();
  } else if (contentType!.includes("multipart/form-data")) {
    const formData = await request.formData();
    const body: Record<string, unknown> = {};
    formData.forEach((value, key) => {
      body[key] = value;
    });
    return body;
  } else if (contentType!.includes("text/html")) {
    return request.text();
  } else if (contentType!.includes("form")) {
    const formData: FormData = await request.formData();
    const body: Record<string, unknown> = {};
    formData.forEach((value, key) => {
      body[key] = value;
    });

    return body;
  } else {
    return "a file";
  }
}

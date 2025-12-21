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

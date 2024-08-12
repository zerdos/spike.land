export const serverFetchUrl = "/api/server-fetch";

export async function enhancedFetch(url: RequestInfo | URL, options: RequestInit = {}) {
  const controller = new AbortController();
  const { signal: originalSignal } = options;

  const combinedSignal = originalSignal
    ? anySignal([originalSignal, controller.signal])
    : controller.signal;

  return fetch(serverFetchUrl, { signal: combinedSignal, method: "POST", body: JSON.stringify({ options, url }) });
}

async function serverFetch(url: RequestInfo | URL, options: RequestInit = {}): Promise<Response> {
  const targetUrl = url.toString();
  const { body, ...restOptions } = options;
  const encodedOptions = encodeURIComponent(JSON.stringify(restOptions));
  const serverUrl = new URL(serverFetchUrl);

  const response = await fetch(serverUrl.toString(), {
    method: options.method || "GET",
    body: body,
    headers: options.headers,
  });

  if (!response.ok) {
    throw new Error(`Server fetch failed: ${response.status} ${response.statusText}`);
  }

  // Create a new ReadableStream to handle the streamed response
  const reader = response.body!.getReader();
  const stream = new ReadableStream({
    async start(controller) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        controller.enqueue(value);
      }
      controller.close();
    },
  });

  // Create a new response with the streamed body
  return new Response(stream, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

function anySignal(signals: AbortSignal[]): AbortSignal {
  const controller = new AbortController();
  for (const signal of signals) {
    if (signal.aborted) {
      controller.abort(signal.reason);
      return controller.signal;
    }
    signal.addEventListener("abort", () => controller.abort(signal.reason), { once: true });
  }
  return controller.signal;
}

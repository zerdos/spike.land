export const serverFetchUrl = "/api/server-fetch";

async function* streamResponse(
  response: Response,
): AsyncGenerator<Uint8Array, void, unknown> {
  const reader = response.body!.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

const serverResponse: typeof fetch = async (url, options = {}) => {
  const controller = new AbortController();
  const signal = controller.signal;

  const serverOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      options: {
        ...options,
        headers: options.headers
          ? Object.fromEntries(new Headers(options.headers))
          : undefined,
      },
    }),
    signal,
  };

  const req = await fetch(serverFetchUrl, serverOptions);

  if (!req.ok) {
    throw new Error(`Server fetch failed: ${req.status} ${req.statusText}`);
  }

  const responseStream = streamResponse(req);
  const responseBody = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of responseStream) {
          controller.enqueue(chunk);
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
    cancel() {
      controller.abort();
    },
  });

  return new Response(responseBody, {
    status: req.status,
    statusText: req.statusText,
    headers: req.headers,
  });
};

export const enhancedFetch: typeof fetch = async (url, options = {}) => {
  const controller = new AbortController();
  const { signal: originalSignal, ...restOptions } = options;

  const combinedSignal = originalSignal
    ? anySignal([originalSignal, controller.signal])
    : controller.signal;

  const enhancedOptions = {
    ...restOptions,
    signal: combinedSignal,
  };

  try {
    const response = await fetch(url, enhancedOptions);
    if (response.ok) return response;
    // console.log("Client-side fetch failed, trying server-side fetch");
    return serverResponse(url, enhancedOptions);
  } catch (error) {
    //    if (error instanceof TypeError && error.message.includes('NetworkError')) {
    ///    console.log("Network error occurred, trying server-side fetch");
    return serverResponse(url, enhancedOptions);
    //  }
    //throw error;
  } finally {
    controller.abort();
  }
};

// Utility function to combine multiple AbortSignals
function anySignal(signals: AbortSignal[]): AbortSignal {
  const controller = new AbortController();
  for (const signal of signals) {
    if (signal.aborted) {
      controller.abort(signal.reason);
      return controller.signal;
    }
    signal.addEventListener("abort", () => controller.abort(signal.reason), {
      once: true,
    });
  }
  return controller.signal;
}

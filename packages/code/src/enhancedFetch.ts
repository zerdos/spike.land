export const serverFetchUrl = "/api/server-fetch";

export const enhancedFetch = async (
  url: RequestInfo | URL,
  options: RequestInit = {},
) => {
  const controller = new AbortController();
  const { signal: originalSignal } = options;

  const combinedSignal = originalSignal
    ? anySignal([originalSignal, controller.signal])
    : controller.signal;

  try {
    const res = await fetch(url, {
      signal: combinedSignal,
      ...options,
    });
    if (!res || !res.ok) {
      throw new Error(res.statusText);
    }
    return res;
  } catch {
    // console.error("Error in enhancedFetch", error);

    return fetch(serverFetchUrl, {
      signal: combinedSignal,
      method: "POST",
      body: JSON.stringify({
        options: {
          method: "GET",
          ...options,
        },
        url,
      }),
    });
  }
};

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

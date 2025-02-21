import type Env from "./env";

export async function handleAnthropicRequest(
  originalRequest: Request,
  env: Env,
) {
  // Handle CORS preflight
  if (originalRequest.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    // Parse the original URL properly
    const baseURL =
      "https://gateway.ai.cloudflare.com/v1/1f98921051196545ebe79a450d3c71ed/z1/anthropic";

    const originalUrl = new URL(originalRequest.url);
    const pathAfterAnthropicAi = originalUrl.pathname.split("/anthropic").pop() || "";
    const url = new URL(pathAfterAnthropicAi, baseURL);

    // Clone request to ensure body stream can be consumed
    const clonedRequest = originalRequest.clone();

    // Set up headers with proper authorization format
    const headers = new Headers(clonedRequest.headers);
    headers.set("Authorization", `Bearer ${env.ANTHROPIC_API_KEY}`);

    // Create new request with all components
    const request = new Request(url.toString(), {
      method: clonedRequest.method,
      headers,
      body: clonedRequest.body,
    });

    // Make the fetch request and handle errors
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(`ANTHROPIC API responded with status: ${response.status}`);
    }

    // Clone the response to add CORS headers
    const responseHeaders = new Headers(response.headers);
    responseHeaders.set("Access-Control-Allow-Origin", "*");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Error in handleAnthropicRequest:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
}

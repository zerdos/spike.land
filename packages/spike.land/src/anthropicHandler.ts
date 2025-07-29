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
    const url = new URL(baseURL + pathAfterAnthropicAi);

    // Clone request to ensure body stream can be consumed
    const clonedRequest = originalRequest.clone();

    // Log the request body to debug tool format issues (only in debug mode)
    const debugMode = env.DEBUG_ANTHROPIC_PROXY === "true";
    if (debugMode && clonedRequest.method === "POST") {
      try {
        const bodyText = await clonedRequest.clone().text();
        const bodyJson = JSON.parse(bodyText);
        if (bodyJson.tools) {
          console.log(
            "[Anthropic Proxy] Request contains tools:",
            JSON.stringify(bodyJson.tools, null, 2),
          );
        }
      } catch (_e) {
        console.log("[Anthropic Proxy] Could not parse request body");
      }
    }

    // Set up headers with proper authorization format
    const headers = new Headers(clonedRequest.headers);
    // remove DUMMY_API_KEY
    headers.delete("Authorization");
    headers.delete("X-Api-Key");

    headers.set("X-Api-Key", env.ANTHROPIC_API_KEY);

    // Create new request with all components
    const request = new Request(url.toString(), {
      method: clonedRequest.method,
      headers,
      body: clonedRequest.body,
    });

    // Make the fetch request and handle errors
    const response = await fetch(request);
    if (!response.ok) {
      // Try to get error details from response
      let errorDetails = "";
      try {
        const errorBody = await response.clone().text();
        errorDetails = ` - ${errorBody}`;
        if (debugMode) {
          console.error("[Anthropic Proxy] API Error Response:", errorBody);
        }
      } catch (_e) {
        // Ignore if we can't read the error body
      }
      throw new Error(
        `ANTHROPIC API responded with status: ${request.url} ${response.status}${errorDetails}`,
      );
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

import type Env from "./env";
import {
  addCorsHeadersToResponse,
  createCorsErrorResponse,
  createCorsPreflightResponse,
} from "./utils";

export async function handleGPT4Request(
  originalRequest: Request,
  env: Env,
) {
  // Handle CORS preflight
  if (originalRequest.method === "OPTIONS") {
    return createCorsPreflightResponse();
  }

  try {
    // Parse the original URL properly
    const baseURL =
      "https://gateway.ai.cloudflare.com/v1/1f98921051196545ebe79a450d3c71ed/z1/openai";
    const originalUrl = new URL(originalRequest.url);
    const pathAfterOpenai = originalUrl.pathname.split("/openai").pop() || "";
    const url = new URL(baseURL + pathAfterOpenai);

    // Clone request to ensure body stream can be consumed
    const clonedRequest = originalRequest.clone();

    // Set up headers with proper authorization format
    const headers = new Headers(clonedRequest.headers);
    // remove DUMMY_API_KEY
    headers.delete("Authorization");
    headers.delete("X-Api-Key");

    headers.set("X-Api-Key", env.OPENAI_API_KEY);
    // Create new request with all components
    const request = new Request(url.toString(), {
      method: clonedRequest.method,
      headers,
      body: clonedRequest.body,
    });

    // Make the fetch request and handle errors
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(`OpenAI API responded with status: ${response.status}`);
    }

    // Clone the response to add CORS headers
    return addCorsHeadersToResponse(response);
  } catch (error) {
    console.error("Error in handleGPT4Request:", error);
    return createCorsErrorResponse(
      "Failed to process request",
      error instanceof Error ? error.message : "Unknown error",
    );
  }
}

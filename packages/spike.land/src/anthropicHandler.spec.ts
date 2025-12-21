import { beforeEach, describe, expect, it, type Mock, vi } from "vitest";
import type Env from "./env";
import { handleAnthropicRequest } from "./anthropicHandler";
import { createMockEnv } from "./test-utils";

describe("AnthropicHandler", () => {
  let mockEnv: Env;
  let mockFetch: Mock;
  let consoleLogSpy: Mock;
  let consoleErrorSpy: Mock;

  beforeEach(() => {
    vi.resetAllMocks();

    mockFetch = vi.fn();
    global.fetch = mockFetch;

    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    mockEnv = createMockEnv() as unknown as Env;
    mockEnv.ANTHROPIC_API_KEY = "test-api-key-12345";
    mockEnv.DEBUG_ANTHROPIC_PROXY = "false";
  });

  describe("CORS Preflight Handling", () => {
    it("should handle OPTIONS request and return proper CORS headers", async () => {
      const mockRequest = new Request("https://example.com/anthropic/v1/messages", {
        method: "OPTIONS",
      });

      const response = await handleAnthropicRequest(mockRequest, mockEnv as Env);

      expect(response.status).toBe(200);
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
      expect(response.headers.get("Access-Control-Allow-Methods")).toBe("POST, OPTIONS");
      expect(response.headers.get("Access-Control-Allow-Headers")).toBe(
        "Content-Type, Authorization",
      );
      expect(await response.text()).toBe("");
      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  describe("Successful Proxy Requests", () => {
    it("should successfully proxy POST request to Anthropic API", async () => {
      const requestBody = JSON.stringify({
        model: "claude-3-opus-20240229",
        max_tokens: 1024,
        messages: [{ role: "user", content: "Hello" }],
      });

      const mockRequest = new Request("https://example.com/anthropic/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer DUMMY_API_KEY",
        },
        body: requestBody,
      });

      const mockApiResponse = new Response(
        JSON.stringify({
          id: "msg_123",
          type: "message",
          role: "assistant",
          content: [{ type: "text", text: "Hello! How can I help you today?" }],
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );

      mockFetch.mockResolvedValue(mockApiResponse);

      const response = await handleAnthropicRequest(mockRequest, mockEnv as Env);

      expect(response.status).toBe(200);
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
      expect(mockFetch).toHaveBeenCalledTimes(1);

      const fetchCall = mockFetch.mock.calls[0];
      expect(fetchCall).toBeDefined();
      const fetchRequest = fetchCall?.[0] as Request;

      // Verify URL construction
      expect(fetchRequest.url).toBe(
        "https://gateway.ai.cloudflare.com/v1/1f98921051196545ebe79a450d3c71ed/z1/anthropic/v1/messages",
      );

      // Verify method
      expect(fetchRequest.method).toBe("POST");

      const responseData = (await response.json()) as { id: string };
      expect(responseData.id).toBe("msg_123");
    });

    it("should extract correct path after /anthropic in URL", async () => {
      const mockRequest = new Request(
        "https://example.com/anthropic/v1/messages/count",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        },
      );

      const mockApiResponse = new Response(JSON.stringify({ count: 5 }), {
        status: 200,
      });

      mockFetch.mockResolvedValue(mockApiResponse);

      await handleAnthropicRequest(mockRequest, mockEnv as Env);

      const fetchCall = mockFetch.mock.calls[0];
      expect(fetchCall).toBeDefined();
      const fetchRequest = fetchCall?.[0] as Request;

      expect(fetchRequest.url).toBe(
        "https://gateway.ai.cloudflare.com/v1/1f98921051196545ebe79a450d3c71ed/z1/anthropic/v1/messages/count",
      );
    });
  });

  describe("Authorization Header Handling", () => {
    it("should remove original Authorization header and set X-Api-Key from env", async () => {
      const mockRequest = new Request("https://example.com/anthropic/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer DUMMY_API_KEY",
          "X-Api-Key": "should-be-removed",
        },
        body: JSON.stringify({ model: "claude-3-opus-20240229", max_tokens: 100 }),
      });

      const mockApiResponse = new Response(JSON.stringify({ success: true }), {
        status: 200,
      });

      mockFetch.mockResolvedValue(mockApiResponse);

      await handleAnthropicRequest(mockRequest, mockEnv as Env);

      const fetchCall = mockFetch.mock.calls[0];
      expect(fetchCall).toBeDefined();
      const fetchRequest = fetchCall?.[0] as Request;

      // Verify Authorization header is removed
      expect(fetchRequest.headers.get("Authorization")).toBeNull();

      // Verify X-Api-Key is set from environment
      expect(fetchRequest.headers.get("X-Api-Key")).toBe("test-api-key-12345");

      // Verify Content-Type is preserved
      expect(fetchRequest.headers.get("Content-Type")).toBe("application/json");
    });
  });

  describe("Error Handling", () => {
    it("should throw error when Anthropic API returns non-OK status", async () => {
      const mockRequest = new Request("https://example.com/anthropic/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "invalid-model" }),
      });

      const errorResponse = new Response(
        JSON.stringify({
          type: "error",
          error: {
            type: "invalid_request_error",
            message: "Invalid model specified",
          },
        }),
        {
          status: 400,
          statusText: "Bad Request",
        },
      );

      mockFetch.mockResolvedValue(errorResponse);

      const response = await handleAnthropicRequest(mockRequest, mockEnv as Env);

      expect(response.status).toBe(500);
      expect(response.headers.get("Content-Type")).toBe("application/json");
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");

      const errorData = (await response.json()) as { error: string; details: string };
      expect(errorData.error).toBe("Failed to process request");
      expect(errorData.details).toContain("ANTHROPIC API responded with status");
      expect(errorData.details).toContain("400");
      expect(errorData.details).toContain("Invalid model specified");
    });

    it("should handle fetch errors gracefully", async () => {
      const mockRequest = new Request("https://example.com/anthropic/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-3-opus-20240229" }),
      });

      mockFetch.mockRejectedValue(new Error("Network connection failed"));

      const response = await handleAnthropicRequest(mockRequest, mockEnv as Env);

      expect(response.status).toBe(500);
      expect(response.headers.get("Content-Type")).toBe("application/json");

      const errorData = (await response.json()) as { error: string; details: string };
      expect(errorData.error).toBe("Failed to process request");
      expect(errorData.details).toBe("Network connection failed");
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error in handleAnthropicRequest:",
        expect.any(Error),
      );
    });

    it("should handle errors when error response body cannot be read", async () => {
      const mockRequest = new Request("https://example.com/anthropic/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "invalid-model" }),
      });

      // Create a response that will throw when trying to clone/read body
      const errorResponse = new Response(null, {
        status: 500,
        statusText: "Internal Server Error",
      });

      // Mock the clone method to throw
      vi.spyOn(errorResponse, "clone").mockImplementation(() => {
        throw new Error("Cannot clone response");
      });

      mockFetch.mockResolvedValue(errorResponse);

      const response = await handleAnthropicRequest(mockRequest, mockEnv as Env);

      expect(response.status).toBe(500);
      const errorData = (await response.json()) as { error: string; details: string };
      expect(errorData.details).toContain("500");
      expect(errorData.details).not.toContain("Cannot clone response");
    });

    it("should handle non-Error thrown values", async () => {
      const mockRequest = new Request("https://example.com/anthropic/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      // Mock fetch to throw a non-Error value
      mockFetch.mockRejectedValue("String error");

      const response = await handleAnthropicRequest(mockRequest, mockEnv as Env);

      expect(response.status).toBe(500);
      const errorData = (await response.json()) as { error: string; details: string };
      expect(errorData.error).toBe("Failed to process request");
      expect(errorData.details).toBe("Unknown error");
    });
  });

  describe("Debug Mode", () => {
    it("should log request details when DEBUG_ANTHROPIC_PROXY is true", async () => {
      mockEnv.DEBUG_ANTHROPIC_PROXY = "true";

      const requestBody = {
        model: "claude-3-opus-20240229",
        max_tokens: 100,
        messages: [{ role: "user", content: "test" }],
        tools: [
          {
            name: "get_weather",
            description: "Get weather data",
            input_schema: {
              type: "object",
              properties: {
                location: { type: "string" },
              },
            },
          },
        ],
      };

      const mockRequest = new Request("https://example.com/anthropic/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const mockApiResponse = new Response(JSON.stringify({ success: true }), {
        status: 200,
      });

      mockFetch.mockResolvedValue(mockApiResponse);

      await handleAnthropicRequest(mockRequest, mockEnv as Env);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        "[Anthropic Proxy] Request contains tools:",
        expect.stringContaining("get_weather"),
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        "[Anthropic Proxy] Request contains tools:",
        expect.stringContaining("input_schema"),
      );
    });

    it("should not log request details when DEBUG_ANTHROPIC_PROXY is false", async () => {
      mockEnv.DEBUG_ANTHROPIC_PROXY = "false";

      const requestBody = {
        model: "claude-3-opus-20240229",
        tools: [{ name: "test_tool" }],
      };

      const mockRequest = new Request("https://example.com/anthropic/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const mockApiResponse = new Response(JSON.stringify({ success: true }), {
        status: 200,
      });

      mockFetch.mockResolvedValue(mockApiResponse);

      await handleAnthropicRequest(mockRequest, mockEnv as Env);

      expect(consoleLogSpy).not.toHaveBeenCalledWith(
        expect.stringContaining("[Anthropic Proxy] Request contains tools:"),
        expect.anything(),
      );
    });

    it("should log error response body when DEBUG_ANTHROPIC_PROXY is true", async () => {
      mockEnv.DEBUG_ANTHROPIC_PROXY = "true";

      const mockRequest = new Request("https://example.com/anthropic/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "invalid" }),
      });

      const errorBody = JSON.stringify({
        type: "error",
        error: { type: "invalid_request_error", message: "Bad request" },
      });

      const errorResponse = new Response(errorBody, { status: 400 });

      mockFetch.mockResolvedValue(errorResponse);

      await handleAnthropicRequest(mockRequest, mockEnv as Env);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "[Anthropic Proxy] API Error Response:",
        errorBody,
      );
    });

    it("should handle unparseable request body in debug mode", async () => {
      mockEnv.DEBUG_ANTHROPIC_PROXY = "true";

      const mockRequest = new Request("https://example.com/anthropic/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "invalid json {{{",
      });

      const mockApiResponse = new Response(JSON.stringify({ success: true }), {
        status: 200,
      });

      mockFetch.mockResolvedValue(mockApiResponse);

      await handleAnthropicRequest(mockRequest, mockEnv as Env);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        "[Anthropic Proxy] Could not parse request body",
      );
    });

    it("should only log tools when present in request body", async () => {
      mockEnv.DEBUG_ANTHROPIC_PROXY = "true";

      const requestBody = {
        model: "claude-3-opus-20240229",
        max_tokens: 100,
        messages: [{ role: "user", content: "test" }],
        // No tools property
      };

      const mockRequest = new Request("https://example.com/anthropic/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const mockApiResponse = new Response(JSON.stringify({ success: true }), {
        status: 200,
      });

      mockFetch.mockResolvedValue(mockApiResponse);

      await handleAnthropicRequest(mockRequest, mockEnv as Env);

      expect(consoleLogSpy).not.toHaveBeenCalledWith(
        expect.stringContaining("[Anthropic Proxy] Request contains tools:"),
        expect.anything(),
      );
    });
  });

  describe("Request Body Handling", () => {
    it("should properly clone request to preserve body stream", async () => {
      const requestBody = JSON.stringify({
        model: "claude-3-opus-20240229",
        max_tokens: 100,
      });

      const mockRequest = new Request("https://example.com/anthropic/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: requestBody,
      });

      const mockApiResponse = new Response(JSON.stringify({ success: true }), {
        status: 200,
      });

      mockFetch.mockResolvedValue(mockApiResponse);

      await handleAnthropicRequest(mockRequest, mockEnv as Env);

      const fetchCall = mockFetch.mock.calls[0];
      expect(fetchCall).toBeDefined();
      const fetchRequest = fetchCall?.[0] as Request;

      // Verify the request body was passed through
      const sentBody = await fetchRequest.text();
      expect(sentBody).toBe(requestBody);
    });
  });

  describe("Response Headers", () => {
    it("should preserve original response headers and add CORS", async () => {
      const mockRequest = new Request("https://example.com/anthropic/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-3-opus-20240229" }),
      });

      const mockApiResponse = new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "X-Request-Id": "req_123",
          "X-RateLimit-Remaining": "50",
        },
      });

      mockFetch.mockResolvedValue(mockApiResponse);

      const response = await handleAnthropicRequest(mockRequest, mockEnv as Env);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("application/json");
      expect(response.headers.get("X-Request-Id")).toBe("req_123");
      expect(response.headers.get("X-RateLimit-Remaining")).toBe("50");
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    });

    it("should preserve response body and status text", async () => {
      const mockRequest = new Request("https://example.com/anthropic/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-3-opus-20240229" }),
      });

      const responseBody = { id: "msg_test", content: "test response" };
      const mockApiResponse = new Response(JSON.stringify(responseBody), {
        status: 201,
        statusText: "Created",
      });

      mockFetch.mockResolvedValue(mockApiResponse);

      const response = await handleAnthropicRequest(mockRequest, mockEnv as Env);

      expect(response.status).toBe(201);
      expect(response.statusText).toBe("Created");

      const data = await response.json();
      expect(data).toEqual(responseBody);
    });
  });
});

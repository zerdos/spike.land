import { beforeEach, describe, expect, it, type Mock, vi } from "vitest";
import type Env from "./env";
import { handleGPT4Request } from "./openaiHandler";
import { createMockEnv } from "./test-utils";

describe("OpenAI Handler", () => {
  let mockEnv: Env;
  let mockFetch: Mock;

  beforeEach(() => {
    vi.resetAllMocks();

    mockFetch = vi.fn();
    global.fetch = mockFetch;

    mockEnv = createMockEnv() as unknown as Env;
    mockEnv.OPENAI_API_KEY = "test-openai-key-12345";
  });

  describe("CORS Handling", () => {
    it("should handle OPTIONS request with proper CORS headers", async () => {
      const mockRequest = new Request("https://example.com/openai/chat/completions", {
        method: "OPTIONS",
      });

      const response = await handleGPT4Request(mockRequest, mockEnv);

      expect(response.status).toBe(200);
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
      expect(response.headers.get("Access-Control-Allow-Methods")).toBe("POST, OPTIONS");
      expect(response.headers.get("Access-Control-Allow-Headers")).toBe(
        "Content-Type, Authorization",
      );

      const body = await response.text();
      expect(body).toBe("");

      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  describe("Successful Proxy", () => {
    it("should successfully proxy POST request to OpenAI API", async () => {
      const requestBody = {
        model: "gpt-4",
        messages: [{ role: "user", content: "Hello" }],
      };

      const mockRequest = new Request("https://example.com/openai/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer DUMMY_API_KEY",
        },
        body: JSON.stringify(requestBody),
      });

      const mockResponseBody = {
        id: "chatcmpl-123",
        object: "chat.completion",
        created: 1677652288,
        choices: [
          {
            index: 0,
            message: { role: "assistant", content: "Hello! How can I help you?" },
            finish_reason: "stop",
          },
        ],
      };

      const mockApiResponse = new Response(JSON.stringify(mockResponseBody), {
        status: 200,
        statusText: "OK",
        headers: {
          "Content-Type": "application/json",
        },
      });

      mockFetch.mockResolvedValue(mockApiResponse);

      const response = await handleGPT4Request(mockRequest, mockEnv);

      expect(response.status).toBe(200);
      expect(response.statusText).toBe("OK");
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
      expect(response.headers.get("Content-Type")).toBe("application/json");

      const responseData = await response.json();
      expect(responseData).toEqual(mockResponseBody);

      expect(mockFetch).toHaveBeenCalledTimes(1);

      const fetchCall = mockFetch.mock.calls[0]?.[0] as Request;
      expect(fetchCall).toBeDefined();
      expect(fetchCall.url).toContain(
        "https://gateway.ai.cloudflare.com/v1/1f98921051196545ebe79a450d3c71ed/z1/openai/chat/completions",
      );
      expect(fetchCall.method).toBe("POST");
    });

    it("should construct correct URL path from original request", async () => {
      const mockRequest = new Request("https://example.com/openai/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: "test" }),
      });

      const mockApiResponse = new Response(JSON.stringify({ result: "ok" }), {
        status: 200,
      });

      mockFetch.mockResolvedValue(mockApiResponse);

      await handleGPT4Request(mockRequest, mockEnv);

      expect(mockFetch).toHaveBeenCalledTimes(1);

      const fetchCall = mockFetch.mock.calls[0]?.[0] as Request;
      expect(fetchCall).toBeDefined();
      expect(fetchCall.url).toContain("/v1/completions");
    });
  });

  describe("Authorization Header Handling", () => {
    it("should remove original Authorization header", async () => {
      const mockRequest = new Request("https://example.com/openai/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer user-provided-key",
        },
        body: JSON.stringify({ model: "gpt-4" }),
      });

      const mockApiResponse = new Response(JSON.stringify({ result: "ok" }), {
        status: 200,
      });

      mockFetch.mockResolvedValue(mockApiResponse);

      await handleGPT4Request(mockRequest, mockEnv);

      const fetchCall = mockFetch.mock.calls[0]?.[0] as Request;
      expect(fetchCall).toBeDefined();
      expect(fetchCall.headers.get("Authorization")).toBeNull();
    });

    it("should remove X-Api-Key header if present", async () => {
      const mockRequest = new Request("https://example.com/openai/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "user-provided-api-key",
        },
        body: JSON.stringify({ model: "gpt-4" }),
      });

      const mockApiResponse = new Response(JSON.stringify({ result: "ok" }), {
        status: 200,
      });

      mockFetch.mockResolvedValue(mockApiResponse);

      await handleGPT4Request(mockRequest, mockEnv);

      const fetchCall = mockFetch.mock.calls[0]?.[0] as Request;
      expect(fetchCall).toBeDefined();
      expect(fetchCall.headers.get("X-Api-Key")).toBe("test-openai-key-12345");
    });

    it("should set API key from environment variable", async () => {
      const customEnv = { ...mockEnv, OPENAI_API_KEY: "custom-key-67890" };

      const mockRequest = new Request("https://example.com/openai/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: "gpt-4" }),
      });

      const mockApiResponse = new Response(JSON.stringify({ result: "ok" }), {
        status: 200,
      });

      mockFetch.mockResolvedValue(mockApiResponse);

      await handleGPT4Request(mockRequest, customEnv as Env);

      const fetchCall = mockFetch.mock.calls[0]?.[0] as Request;
      expect(fetchCall).toBeDefined();
      expect(fetchCall.headers.get("X-Api-Key")).toBe("custom-key-67890");
    });

    it("should preserve other headers from original request", async () => {
      const mockRequest = new Request("https://example.com/openai/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "TestClient/1.0",
          "X-Custom-Header": "custom-value",
          "Authorization": "Bearer should-be-removed",
        },
        body: JSON.stringify({ model: "gpt-4" }),
      });

      const mockApiResponse = new Response(JSON.stringify({ result: "ok" }), {
        status: 200,
      });

      mockFetch.mockResolvedValue(mockApiResponse);

      await handleGPT4Request(mockRequest, mockEnv);

      const fetchCall = mockFetch.mock.calls[0]?.[0] as Request;
      expect(fetchCall).toBeDefined();
      expect(fetchCall.headers.get("Content-Type")).toBe("application/json");
      expect(fetchCall.headers.get("User-Agent")).toBe("TestClient/1.0");
      expect(fetchCall.headers.get("X-Custom-Header")).toBe("custom-value");
      expect(fetchCall.headers.get("Authorization")).toBeNull();
      expect(fetchCall.headers.get("X-Api-Key")).toBe("test-openai-key-12345");
    });
  });

  describe("Error Handling", () => {
    it("should throw error when OpenAI API returns non-OK status", async () => {
      const mockRequest = new Request("https://example.com/openai/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: "gpt-4" }),
      });

      const mockApiResponse = new Response(
        JSON.stringify({
          error: {
            message: "Invalid API key",
            type: "invalid_request_error",
          },
        }),
        {
          status: 401,
          statusText: "Unauthorized",
        },
      );

      mockFetch.mockResolvedValue(mockApiResponse);

      const response = await handleGPT4Request(mockRequest, mockEnv);

      expect(response.status).toBe(500);
      expect(response.headers.get("Content-Type")).toBe("application/json");
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");

      const errorData = (await response.json()) as {
        error: string;
        details: string;
      };
      expect(errorData).toEqual({
        error: "Failed to process request",
        details: "OpenAI API responded with status: 401",
      });
    });

    it("should handle network errors with 500 response", async () => {
      const mockRequest = new Request("https://example.com/openai/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: "gpt-4" }),
      });

      mockFetch.mockRejectedValue(new Error("Network error"));

      const response = await handleGPT4Request(mockRequest, mockEnv);

      expect(response.status).toBe(500);
      expect(response.headers.get("Content-Type")).toBe("application/json");
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");

      const errorData = (await response.json()) as {
        error: string;
        details: string;
      };
      expect(errorData).toEqual({
        error: "Failed to process request",
        details: "Network error",
      });
    });

    it("should handle non-Error exceptions", async () => {
      const mockRequest = new Request("https://example.com/openai/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: "gpt-4" }),
      });

      mockFetch.mockRejectedValue("String error");

      const response = await handleGPT4Request(mockRequest, mockEnv);

      expect(response.status).toBe(500);
      expect(response.headers.get("Content-Type")).toBe("application/json");
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");

      const errorData = (await response.json()) as {
        error: string;
        details: string;
      };
      expect(errorData).toEqual({
        error: "Failed to process request",
        details: "Unknown error",
      });
    });

    it("should handle 400 Bad Request from OpenAI", async () => {
      const mockRequest = new Request("https://example.com/openai/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invalid: "request" }),
      });

      const mockApiResponse = new Response(
        JSON.stringify({
          error: {
            message: "Missing required parameter: model",
            type: "invalid_request_error",
          },
        }),
        {
          status: 400,
          statusText: "Bad Request",
        },
      );

      mockFetch.mockResolvedValue(mockApiResponse);

      const response = await handleGPT4Request(mockRequest, mockEnv);

      expect(response.status).toBe(500);

      const errorData = (await response.json()) as {
        error: string;
        details: string;
      };
      expect(errorData.details).toBe("OpenAI API responded with status: 400");
    });

    it("should handle 429 Rate Limit from OpenAI", async () => {
      const mockRequest = new Request("https://example.com/openai/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: "gpt-4" }),
      });

      const mockApiResponse = new Response(
        JSON.stringify({
          error: {
            message: "Rate limit exceeded",
            type: "rate_limit_error",
          },
        }),
        {
          status: 429,
          statusText: "Too Many Requests",
        },
      );

      mockFetch.mockResolvedValue(mockApiResponse);

      const response = await handleGPT4Request(mockRequest, mockEnv);

      expect(response.status).toBe(500);

      const errorData = (await response.json()) as {
        error: string;
        details: string;
      };
      expect(errorData.details).toBe("OpenAI API responded with status: 429");
    });
  });

  describe("Response Headers", () => {
    it("should add CORS headers to successful response", async () => {
      const mockRequest = new Request("https://example.com/openai/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: "gpt-4" }),
      });

      const mockApiResponse = new Response(JSON.stringify({ result: "ok" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": "custom-value",
        },
      });

      mockFetch.mockResolvedValue(mockApiResponse);

      const response = await handleGPT4Request(mockRequest, mockEnv);

      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
      expect(response.headers.get("Content-Type")).toBe("application/json");
      expect(response.headers.get("X-Custom-Header")).toBe("custom-value");
    });

    it("should preserve response status and statusText", async () => {
      const mockRequest = new Request("https://example.com/openai/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: "gpt-4" }),
      });

      const mockApiResponse = new Response(JSON.stringify({ result: "ok" }), {
        status: 201,
        statusText: "Created",
      });

      mockFetch.mockResolvedValue(mockApiResponse);

      const response = await handleGPT4Request(mockRequest, mockEnv);

      expect(response.status).toBe(201);
      expect(response.statusText).toBe("Created");
    });
  });

  describe("Request Body Handling", () => {
    it("should preserve request body content", async () => {
      const requestBody = {
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "What is the capital of France?" },
        ],
        temperature: 0.7,
        max_tokens: 100,
      };

      const mockRequest = new Request("https://example.com/openai/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const mockApiResponse = new Response(JSON.stringify({ result: "ok" }), {
        status: 200,
      });

      mockFetch.mockResolvedValue(mockApiResponse);

      await handleGPT4Request(mockRequest, mockEnv);

      expect(mockFetch).toHaveBeenCalledTimes(1);

      const fetchCall = mockFetch.mock.calls[0]?.[0] as Request;
      expect(fetchCall).toBeDefined();
      const forwardedBody = await fetchCall.json();

      expect(forwardedBody).toEqual(requestBody);
    });

    it("should handle streaming responses", async () => {
      const mockRequest = new Request("https://example.com/openai/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: "gpt-4", stream: true }),
      });

      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode("data: chunk1\n\n"));
          controller.enqueue(encoder.encode("data: chunk2\n\n"));
          controller.close();
        },
      });

      const mockApiResponse = new Response(stream, {
        status: 200,
        headers: {
          "Content-Type": "text/event-stream",
        },
      });

      mockFetch.mockResolvedValue(mockApiResponse);

      const response = await handleGPT4Request(mockRequest, mockEnv);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("text/event-stream");
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
      expect(response.body).toBeDefined();
    });
  });

  describe("URL Path Handling", () => {
    it("should handle chat completions endpoint", async () => {
      const mockRequest = new Request(
        "https://example.com/openai/v1/chat/completions",
        {
          method: "POST",
          body: JSON.stringify({ model: "gpt-4" }),
        },
      );

      const mockApiResponse = new Response(JSON.stringify({ result: "ok" }), {
        status: 200,
      });

      mockFetch.mockResolvedValue(mockApiResponse);

      await handleGPT4Request(mockRequest, mockEnv);

      const fetchCall = mockFetch.mock.calls[0]?.[0] as Request;
      expect(fetchCall).toBeDefined();
      expect(fetchCall.url).toContain("/v1/chat/completions");
    });

    it("should handle completions endpoint", async () => {
      const mockRequest = new Request("https://example.com/openai/v1/completions", {
        method: "POST",
        body: JSON.stringify({ model: "text-davinci-003" }),
      });

      const mockApiResponse = new Response(JSON.stringify({ result: "ok" }), {
        status: 200,
      });

      mockFetch.mockResolvedValue(mockApiResponse);

      await handleGPT4Request(mockRequest, mockEnv);

      const fetchCall = mockFetch.mock.calls[0]?.[0] as Request;
      expect(fetchCall).toBeDefined();
      expect(fetchCall.url).toContain("/v1/completions");
    });

    it("should handle models endpoint", async () => {
      const mockRequest = new Request("https://example.com/openai/v1/models", {
        method: "GET",
      });

      const mockApiResponse = new Response(JSON.stringify({ data: [] }), {
        status: 200,
      });

      mockFetch.mockResolvedValue(mockApiResponse);

      await handleGPT4Request(mockRequest, mockEnv);

      const fetchCall = mockFetch.mock.calls[0]?.[0] as Request;
      expect(fetchCall).toBeDefined();
      expect(fetchCall.url).toContain("/v1/models");
    });

    it("should handle empty path after /openai", async () => {
      const mockRequest = new Request("https://example.com/openai", {
        method: "POST",
        body: JSON.stringify({ model: "gpt-4" }),
      });

      const mockApiResponse = new Response(JSON.stringify({ result: "ok" }), {
        status: 200,
      });

      mockFetch.mockResolvedValue(mockApiResponse);

      await handleGPT4Request(mockRequest, mockEnv);

      const fetchCall = mockFetch.mock.calls[0]?.[0] as Request;
      expect(fetchCall).toBeDefined();
      expect(fetchCall.url).toBe(
        "https://gateway.ai.cloudflare.com/v1/1f98921051196545ebe79a450d3c71ed/z1/openai",
      );
    });
  });
});

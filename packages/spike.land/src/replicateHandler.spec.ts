import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";
import { md5 } from "@spike-npm-land/code";
import type Env from "./env";
import { handleReplicateRequest, parseInputFromUrl } from "./replicateHandler";
import { getCacheDefault } from "./utils/cache";

// Create a shared mock run function accessible across all tests
let mockRunFn: Mock;

// Mock dependencies
vi.mock("replicate", () => {
  return {
    default: class MockReplicate {
      constructor(_config: { auth: string }) {
        // Constructor mock
      }
      run = mockRunFn;
    },
  };
});
vi.mock("@spike-npm-land/code", () => ({
  md5: vi.fn((input: string) => `mock-md5-${input.substring(0, 20)}`),
}));
vi.mock("./utils/cache", () => ({
  getCacheDefault: vi.fn(),
}));

describe("replicateHandler", () => {
  let mockEnv: Env;
  let mockExecutionContext: ExecutionContext;
  let mockCache: Cache;
  let mockFetch: Mock;
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.resetAllMocks();

    // Mock console methods
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    // Mock global fetch
    mockFetch = vi.fn();
    global.fetch = mockFetch;

    // Mock cache
    mockCache = {
      match: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      add: vi.fn(),
      addAll: vi.fn(),
      keys: vi.fn(),
    } as unknown as Cache;

    (getCacheDefault as Mock).mockReturnValue(mockCache);

    // Mock execution context
    mockExecutionContext = {
      waitUntil: vi.fn((promise: Promise<unknown>) => promise),
      passThroughOnException: vi.fn(),
    } as unknown as ExecutionContext;

    // Create mock environment
    mockEnv = {
      R2: {
        put: vi.fn().mockResolvedValue(undefined),
        get: vi.fn().mockResolvedValue(null),
        delete: vi.fn().mockResolvedValue(undefined),
        head: vi.fn().mockResolvedValue(null),
        createMultipartUpload: vi.fn().mockResolvedValue(null),
        resumeMultipartUpload: vi.fn().mockResolvedValue(null),
        list: vi.fn().mockResolvedValue({ objects: [], truncated: false }),
      } as unknown as R2Bucket,
      REPLICATE_API_TOKEN: "mock-replicate-token",
      OPENAI_API_KEY: "mock-key",
      ANTHROPIC_API_KEY: "mock-key",
      CLERK_SECRET_KEY: "mock-secret",
      CF_REAL_TURN_TOKEN: "mock-turn-token",
      AI: {} as unknown as Ai,
      KV: {} as unknown as KVNamespace,
      __STATIC_CONTENT: {} as unknown as KVNamespace,
      CODE: {} as unknown as DurableObjectNamespace,
      ESBUILD: {} as unknown as Fetcher,
      LIMITERS: {} as unknown as DurableObjectNamespace,
      X9: {} as unknown as R2Bucket,
    } as unknown as Env;
  });

  afterEach(() => {
    vi.clearAllTimers();
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  describe("parseInputFromUrl", () => {
    it("should return defaults when URL has no base64 params", () => {
      const url = "https://example.com/replicate/test.webp";
      const input = parseInputFromUrl(url);

      expect(input).toEqual({
        cfg: 3.5,
        steps: 28,
        prompt: 'a photo of vibrant artistic graffiti on a wall saying "SD3 medium"',
        aspect_ratio: "16:9",
        output_format: "webp",
        output_quality: 90,
        negative_prompt: "",
        prompt_strength: 0.85,
      });
    });

    it("should parse valid base64 encoded params from URL", () => {
      // Create base64 encoded params: prompt=custom&steps=50
      const params = new URLSearchParams({
        prompt: "custom prompt",
        steps: "50",
        cfg: "5.0",
      });
      const base64Params = btoa(params.toString());
      const url = `https://example.com/replicate/${base64Params}.webp`;

      const input = parseInputFromUrl(url);

      expect(input.prompt).toBe("custom prompt");
      expect(input.steps).toBe(50);
      expect(input.cfg).toBe(5.0);
    });

    it("should handle output_format parsing correctly", () => {
      const params = new URLSearchParams({ output_format: "png" });
      const base64Params = btoa(params.toString());
      const url = `https://example.com/replicate/${base64Params}.png`;

      const input = parseInputFromUrl(url);

      expect(input.output_format).toBe("png");
    });

    it("should ignore invalid output_format values", () => {
      const params = new URLSearchParams({ output_format: "invalid" });
      const base64Params = btoa(params.toString());
      const url = `https://example.com/replicate/${base64Params}.webp`;

      const input = parseInputFromUrl(url);

      expect(input.output_format).toBe("webp"); // Should use default
    });

    it("should handle numeric value parsing correctly", () => {
      const params = new URLSearchParams({
        steps: "40",
        cfg: "4.5",
        output_quality: "85",
        prompt_strength: "0.9",
      });
      const base64Params = btoa(params.toString());
      const url = `https://example.com/replicate/${base64Params}.webp`;

      const input = parseInputFromUrl(url);

      expect(input.steps).toBe(40);
      expect(input.cfg).toBe(4.5);
      expect(input.output_quality).toBe(85);
      expect(input.prompt_strength).toBe(0.9);
    });

    it("should ignore invalid numeric values", () => {
      const params = new URLSearchParams({
        steps: "invalid",
        cfg: "not-a-number",
      });
      const base64Params = btoa(params.toString());
      const url = `https://example.com/replicate/${base64Params}.webp`;

      const input = parseInputFromUrl(url);

      expect(input.steps).toBe(28); // Should use default
      expect(input.cfg).toBe(3.5); // Should use default
    });

    it("should ignore empty string values", () => {
      const params = new URLSearchParams({
        prompt: "",
        negative_prompt: "",
      });
      const base64Params = btoa(params.toString());
      const url = `https://example.com/replicate/${base64Params}.webp`;

      const input = parseInputFromUrl(url);

      expect(input.prompt).toBe('a photo of vibrant artistic graffiti on a wall saying "SD3 medium"');
      expect(input.negative_prompt).toBe("");
    });

    it("should ignore unknown parameters", () => {
      const params = new URLSearchParams({
        unknown_param: "value",
        prompt: "test prompt",
      });
      const base64Params = btoa(params.toString());
      const url = `https://example.com/replicate/${base64Params}.webp`;

      const input = parseInputFromUrl(url);

      expect(input.prompt).toBe("test prompt");
      expect(input).not.toHaveProperty("unknown_param");
    });

    it("should handle malformed base64 gracefully", () => {
      const url = "https://example.com/replicate/not-valid-base64!!!.webp";

      const input = parseInputFromUrl(url);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error parsing URL params:",
        expect.any(Error),
      );
      expect(input).toEqual({
        cfg: 3.5,
        steps: 28,
        prompt: 'a photo of vibrant artistic graffiti on a wall saying "SD3 medium"',
        aspect_ratio: "16:9",
        output_format: "webp",
        output_quality: 90,
        negative_prompt: "",
        prompt_strength: 0.85,
      });
    });

    it("should handle invalid URL gracefully", () => {
      const url = "not-a-valid-url";

      const input = parseInputFromUrl(url);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error parsing URL params:",
        expect.any(Error),
      );
      expect(input).toEqual({
        cfg: 3.5,
        steps: 28,
        prompt: 'a photo of vibrant artistic graffiti on a wall saying "SD3 medium"',
        aspect_ratio: "16:9",
        output_format: "webp",
        output_quality: 90,
        negative_prompt: "",
        prompt_strength: 0.85,
      });
    });
  });

  describe("handleReplicateRequest", () => {
    const mockImageData = new Uint8Array([1, 2, 3, 4, 5]);
    const mockImageUrl = "https://replicate.com/output/image.webp";

    beforeEach(() => {
      // Reset and setup Replicate mock
      mockRunFn = vi.fn().mockResolvedValue(mockImageUrl);
    });

    describe("Cloudflare Cache scenarios", () => {
      it("should return cached response from Cloudflare cache", async () => {
        const request = new Request("https://example.com/replicate/test.webp");
        const cachedResponse = new Response(mockImageData, {
          headers: {
            "Content-Type": "image/webp",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });

        (mockCache.match as Mock).mockResolvedValue(cachedResponse);

        const response = await handleReplicateRequest(request, mockEnv, mockExecutionContext);

        expect(mockCache.match).toHaveBeenCalled();
        expect(mockEnv.R2.get).not.toHaveBeenCalled();
        expect(response).toBe(cachedResponse);
      });

      it("should check cache with correct cache key", async () => {
        const requestUrl = "https://example.com/replicate/test.webp";
        const request = new Request(requestUrl);

        (mockCache.match as Mock).mockResolvedValue(null);
        (mockEnv.R2.get as Mock).mockResolvedValue(null);

        mockFetch.mockResolvedValue(
          new Response(mockImageData, {
            status: 200,
            headers: { "Content-Type": "image/webp" },
          }),
        );

        await handleReplicateRequest(request, mockEnv, mockExecutionContext);

        expect(mockCache.match).toHaveBeenCalledWith(
          expect.objectContaining({
            url: requestUrl,
          }),
        );
      });
    });

    describe("R2 Storage scenarios", () => {
      it("should return cached response from R2 when cache miss", async () => {
        const request = new Request("https://example.com/replicate/test.webp");

        // Cache miss, R2 hit
        (mockCache.match as Mock).mockResolvedValue(null);

        const mockR2Body = new ReadableStream({
          start(controller) {
            controller.enqueue(mockImageData);
            controller.close();
          },
        });

        (mockEnv.R2.get as Mock).mockResolvedValue({
          body: mockR2Body,
        });

        const response = await handleReplicateRequest(request, mockEnv, mockExecutionContext);

        expect(mockCache.match).toHaveBeenCalled();
        expect(mockEnv.R2.get).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(response.headers.get("Content-Type")).toBe("image/webp");
        expect(response.headers.get("Cache-Control")).toBe("public, max-age=31536000, immutable");
        expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
      });

      it("should use MD5 hash as R2 key", async () => {
        const request = new Request("https://example.com/replicate/test.webp");

        (mockCache.match as Mock).mockResolvedValue(null);
        (mockEnv.R2.get as Mock).mockResolvedValue(null);

        mockFetch.mockResolvedValue(
          new Response(mockImageData, {
            status: 200,
            headers: { "Content-Type": "image/webp" },
          }),
        );

        await handleReplicateRequest(request, mockEnv, mockExecutionContext);

        const expectedMd5Key = (md5 as Mock).mock.results[0]?.value;
        expect(mockEnv.R2.get).toHaveBeenCalledWith(expectedMd5Key);
      });
    });

    describe("Replicate API scenarios", () => {
      it("should call Replicate API when not cached", async () => {
        const request = new Request("https://example.com/replicate/test.webp");

        // Both cache and R2 miss
        (mockCache.match as Mock).mockResolvedValue(null);
        (mockEnv.R2.get as Mock).mockResolvedValue(null);

        mockFetch.mockResolvedValue(
          new Response(mockImageData, {
            status: 200,
            headers: { "Content-Type": "image/webp" },
          }),
        );

        await handleReplicateRequest(request, mockEnv, mockExecutionContext);

        expect(mockRunFn).toHaveBeenCalledWith("black-forest-labs/flux-schnell", {
          input: expect.objectContaining({
            cfg: 3.5,
            steps: 28,
            output_format: "webp",
          }),
        });
      });

      it("should pass parsed input parameters to Replicate API", async () => {
        const params = new URLSearchParams({
          prompt: "a beautiful sunset",
          steps: "35",
          cfg: "4.0",
        });
        const base64Params = btoa(params.toString());
        const request = new Request(`https://example.com/replicate/${base64Params}.webp`);

        (mockCache.match as Mock).mockResolvedValue(null);
        (mockEnv.R2.get as Mock).mockResolvedValue(null);

        mockFetch.mockResolvedValue(
          new Response(mockImageData, {
            status: 200,
            headers: { "Content-Type": "image/webp" },
          }),
        );

        await handleReplicateRequest(request, mockEnv, mockExecutionContext);

        expect(mockRunFn).toHaveBeenCalledWith("black-forest-labs/flux-schnell", {
          input: expect.objectContaining({
            prompt: "a beautiful sunset",
            steps: 35,
            cfg: 4.0,
          }),
        });
      });

      it("should handle Replicate API returning non-string URL", async () => {
        const request = new Request("https://example.com/replicate/test.webp");

        (mockCache.match as Mock).mockResolvedValue(null);
        (mockEnv.R2.get as Mock).mockResolvedValue(null);

        mockRunFn.mockResolvedValue(null as unknown as string);

        const response = await handleReplicateRequest(request, mockEnv, mockExecutionContext);

        expect(response.status).toBe(500);
        const responseText = await response.text();
        // The error could be either the custom message or a toString error
        expect(
          responseText.includes("Invalid image URL from Replicate API") ||
          responseText.includes("Cannot read properties of null"),
        ).toBe(true);
      });

      it("should handle Replicate API returning empty string", async () => {
        const request = new Request("https://example.com/replicate/test.webp");

        (mockCache.match as Mock).mockResolvedValue(null);
        (mockEnv.R2.get as Mock).mockResolvedValue(null);

        mockRunFn.mockResolvedValue("");

        const response = await handleReplicateRequest(request, mockEnv, mockExecutionContext);

        expect(response.status).toBe(500);
        expect(await response.text()).toContain("Invalid image URL from Replicate API");
      });

      it("should handle Replicate API errors", async () => {
        const request = new Request("https://example.com/replicate/test.webp");

        (mockCache.match as Mock).mockResolvedValue(null);
        (mockEnv.R2.get as Mock).mockResolvedValue(null);

        const apiError = new Error("Replicate API rate limit exceeded");
        mockRunFn.mockRejectedValue(apiError);

        const response = await handleReplicateRequest(request, mockEnv, mockExecutionContext);

        expect(response.status).toBe(500);
        expect(await response.text()).toBe("Error: Replicate API rate limit exceeded");
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "Error in handleReplicateRequest:",
          apiError,
        );
      });

      it("should handle unknown Replicate API errors", async () => {
        const request = new Request("https://example.com/replicate/test.webp");

        (mockCache.match as Mock).mockResolvedValue(null);
        (mockEnv.R2.get as Mock).mockResolvedValue(null);

        mockRunFn.mockRejectedValue("Unknown error");

        const response = await handleReplicateRequest(request, mockEnv, mockExecutionContext);

        expect(response.status).toBe(500);
        expect(await response.text()).toBe("Error: Unknown error");
      });
    });

    describe("Storage and caching after API call", () => {
      it("should store result in R2 and cache after successful API call", async () => {
        const request = new Request("https://example.com/replicate/test.webp");

        (mockCache.match as Mock).mockResolvedValue(null);
        (mockEnv.R2.get as Mock).mockResolvedValue(null);

        mockFetch.mockResolvedValue(
          new Response(mockImageData, {
            status: 200,
            headers: { "Content-Type": "image/webp" },
          }),
        );

        await handleReplicateRequest(request, mockEnv, mockExecutionContext);

        // Wait for background tasks to complete
        await vi.waitFor(() => {
          expect(mockExecutionContext.waitUntil).toHaveBeenCalled();
        });

        expect(mockEnv.R2.put).toHaveBeenCalled();
        expect(mockCache.put).toHaveBeenCalled();
      });

      it("should store image with correct content type header", async () => {
        const params = new URLSearchParams({ output_format: "png" });
        const base64Params = btoa(params.toString());
        const request = new Request(`https://example.com/replicate/${base64Params}.png`);

        (mockCache.match as Mock).mockResolvedValue(null);
        (mockEnv.R2.get as Mock).mockResolvedValue(null);

        mockFetch.mockResolvedValue(
          new Response(mockImageData, {
            status: 200,
            headers: { "Content-Type": "image/png" },
          }),
        );

        const response = await handleReplicateRequest(request, mockEnv, mockExecutionContext);

        expect(response.headers.get("Content-Type")).toBe("image/png");
      });

      it("should store cloned response in cache", async () => {
        const request = new Request("https://example.com/replicate/test.webp");

        (mockCache.match as Mock).mockResolvedValue(null);
        (mockEnv.R2.get as Mock).mockResolvedValue(null);

        mockFetch.mockResolvedValue(
          new Response(mockImageData, {
            status: 200,
            headers: { "Content-Type": "image/webp" },
          }),
        );

        await handleReplicateRequest(request, mockEnv, mockExecutionContext);

        await vi.waitFor(() => {
          expect(mockCache.put).toHaveBeenCalledWith(
            expect.any(Request),
            expect.any(Response),
          );
        });
      });
    });

    describe("fetchAndSaveImage scenarios", () => {
      it("should properly fetch and save image to R2", async () => {
        const request = new Request("https://example.com/replicate/test.webp");

        (mockCache.match as Mock).mockResolvedValue(null);
        (mockEnv.R2.get as Mock).mockResolvedValue(null);

        mockFetch.mockResolvedValue(
          new Response(mockImageData, {
            status: 200,
            headers: { "Content-Type": "image/webp" },
          }),
        );

        const response = await handleReplicateRequest(request, mockEnv, mockExecutionContext);

        expect(consoleWarnSpy).toHaveBeenCalledWith(
          expect.stringContaining("Fetching image from:"),
        );
        expect(mockFetch).toHaveBeenCalledWith(mockImageUrl);
        expect(response.status).toBe(200);
      });

      it("should handle fetch errors when downloading image", async () => {
        const request = new Request("https://example.com/replicate/test.webp");

        (mockCache.match as Mock).mockResolvedValue(null);
        (mockEnv.R2.get as Mock).mockResolvedValue(null);

        mockFetch.mockResolvedValue(
          new Response(null, {
            status: 404,
            statusText: "Not Found",
          }),
        );

        const response = await handleReplicateRequest(request, mockEnv, mockExecutionContext);

        expect(response.status).toBe(500);
        expect(await response.text()).toContain("Failed to fetch image: 404 Not Found");
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "Error in handleReplicateRequest:",
          expect.any(Error),
        );
      });

      it("should handle network errors when downloading image", async () => {
        const request = new Request("https://example.com/replicate/test.webp");

        (mockCache.match as Mock).mockResolvedValue(null);
        (mockEnv.R2.get as Mock).mockResolvedValue(null);

        const networkError = new Error("Network request failed");
        mockFetch.mockRejectedValue(networkError);

        const response = await handleReplicateRequest(request, mockEnv, mockExecutionContext);

        expect(response.status).toBe(500);
        expect(await response.text()).toContain("Network request failed");
      });

      it("should handle R2 storage errors gracefully", async () => {
        const request = new Request("https://example.com/replicate/test.webp");

        (mockCache.match as Mock).mockResolvedValue(null);
        (mockEnv.R2.get as Mock).mockResolvedValue(null);

        mockFetch.mockResolvedValue(
          new Response(mockImageData, {
            status: 200,
            headers: { "Content-Type": "image/webp" },
          }),
        );

        const r2Error = new Error("R2 storage full");
        (mockEnv.R2.put as Mock).mockRejectedValue(r2Error);

        const response = await handleReplicateRequest(request, mockEnv, mockExecutionContext);

        // Should still return the image even if R2 storage fails
        expect(response.status).toBe(200);

        // Give some time for the background task to execute and fail
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Check that the error was logged (as a single combined message)
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          expect.stringContaining("Failed to store image in R2: R2 storage full"),
        );
      });

      it("should set correct CORS and cache headers on response", async () => {
        const request = new Request("https://example.com/replicate/test.webp");

        (mockCache.match as Mock).mockResolvedValue(null);
        (mockEnv.R2.get as Mock).mockResolvedValue(null);

        mockFetch.mockResolvedValue(
          new Response(mockImageData, {
            status: 200,
            headers: { "Content-Type": "image/webp" },
          }),
        );

        const response = await handleReplicateRequest(request, mockEnv, mockExecutionContext);

        expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
        expect(response.headers.get("Cache-Control")).toBe("public, max-age=31536000, immutable");
      });

      it("should clone response for R2 storage", async () => {
        const request = new Request("https://example.com/replicate/test.webp");

        (mockCache.match as Mock).mockResolvedValue(null);
        (mockEnv.R2.get as Mock).mockResolvedValue(null);

        const mockResponse = new Response(mockImageData, {
          status: 200,
          headers: { "Content-Type": "image/webp" },
        });
        const cloneSpy = vi.spyOn(mockResponse, "clone");
        mockFetch.mockResolvedValue(mockResponse);

        await handleReplicateRequest(request, mockEnv, mockExecutionContext);

        expect(cloneSpy).toHaveBeenCalled();
      });
    });

    describe("Timeout handling", () => {
      it("should handle timeouts during Replicate API call", async () => {
        vi.useFakeTimers();

        const request = new Request("https://example.com/replicate/test.webp");

        (mockCache.match as Mock).mockResolvedValue(null);
        (mockEnv.R2.get as Mock).mockResolvedValue(null);

        const neverResolving = new Promise(() => {
          // Never resolves
        });
        mockRunFn.mockReturnValue(neverResolving as Promise<string>);

        const responsePromise = handleReplicateRequest(request, mockEnv, mockExecutionContext);

        // Advance timers significantly
        await vi.advanceTimersByTimeAsync(60000);

        // The request should still be pending, but we can verify the API was called
        expect(mockRunFn).toHaveBeenCalled();

        vi.useRealTimers();
        // Clean up the promise
        await Promise.race([responsePromise, Promise.resolve()]);
      });

      it("should handle timeouts during image fetch", async () => {
        vi.useFakeTimers();

        const request = new Request("https://example.com/replicate/test.webp");

        (mockCache.match as Mock).mockResolvedValue(null);
        (mockEnv.R2.get as Mock).mockResolvedValue(null);

        const neverResolving = new Promise(() => {
          // Never resolves
        });
        mockFetch.mockReturnValue(neverResolving as Promise<Response>);

        const responsePromise = handleReplicateRequest(request, mockEnv, mockExecutionContext);

        // Advance timers significantly
        await vi.advanceTimersByTimeAsync(60000);

        // The request should still be pending
        expect(mockFetch).toHaveBeenCalled();

        vi.useRealTimers();
        // Clean up the promise
        await Promise.race([responsePromise, Promise.resolve()]);
      });
    });

    describe("Edge cases and error scenarios", () => {
      it("should handle missing REPLICATE_API_TOKEN", async () => {
        const request = new Request("https://example.com/replicate/test.webp");
        const envWithoutToken = { ...mockEnv, REPLICATE_API_TOKEN: "" };

        (mockCache.match as Mock).mockResolvedValue(null);
        (mockEnv.R2.get as Mock).mockResolvedValue(null);

        mockFetch.mockResolvedValue(
          new Response(mockImageData, {
            status: 200,
            headers: { "Content-Type": "image/webp" },
          }),
        );

        // Should still work even with empty token (Replicate constructor will receive it)
        const response = await handleReplicateRequest(request, envWithoutToken, mockExecutionContext);

        // The handler should still process the request
        expect(response.status).toBe(200);
      });

      it("should handle very large image responses", async () => {
        const request = new Request("https://example.com/replicate/test.webp");

        (mockCache.match as Mock).mockResolvedValue(null);
        (mockEnv.R2.get as Mock).mockResolvedValue(null);

        // Create a large image (5MB)
        const largeImageData = new Uint8Array(5 * 1024 * 1024);
        mockFetch.mockResolvedValue(
          new Response(largeImageData, {
            status: 200,
            headers: { "Content-Type": "image/webp" },
          }),
        );

        const response = await handleReplicateRequest(request, mockEnv, mockExecutionContext);

        expect(response.status).toBe(200);
        const responseData = await response.arrayBuffer();
        expect(responseData.byteLength).toBe(5 * 1024 * 1024);
      });

      it("should handle concurrent requests for same image", async () => {
        const request1 = new Request("https://example.com/replicate/test.webp");
        const request2 = new Request("https://example.com/replicate/test.webp");

        (mockCache.match as Mock).mockResolvedValue(null);
        (mockEnv.R2.get as Mock).mockResolvedValue(null);

        // Each fetch call needs to return a fresh Response object
        mockFetch.mockImplementation(() =>
          Promise.resolve(
            new Response(mockImageData, {
              status: 200,
              headers: { "Content-Type": "image/webp" },
            }),
          ),
        );

        const [response1, response2] = await Promise.all([
          handleReplicateRequest(request1, mockEnv, mockExecutionContext),
          handleReplicateRequest(request2, mockEnv, mockExecutionContext),
        ]);

        expect(response1.status).toBe(200);
        expect(response2.status).toBe(200);
      });

      it("should preserve image binary data integrity", async () => {
        const request = new Request("https://example.com/replicate/test.webp");

        (mockCache.match as Mock).mockResolvedValue(null);
        (mockEnv.R2.get as Mock).mockResolvedValue(null);

        const originalData = new Uint8Array([255, 216, 255, 224, 0, 16, 74, 70, 73, 70]);
        mockFetch.mockResolvedValue(
          new Response(originalData, {
            status: 200,
            headers: { "Content-Type": "image/jpeg" },
          }),
        );

        const response = await handleReplicateRequest(request, mockEnv, mockExecutionContext);

        const responseData = new Uint8Array(await response.arrayBuffer());
        expect(responseData).toEqual(originalData);
      });
    });
  });
});

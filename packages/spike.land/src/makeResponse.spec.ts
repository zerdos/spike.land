import type { R2ObjectBody } from "@cloudflare/workers-types";
import { describe, expect, it, vi } from "vitest";
import { makeResponse } from "./makeResponse";

describe("makeResponse", () => {
  const createMockR2Object = (metadata?: Record<string, string>, body?: string): any => {
    const mockBody = new ReadableStream({
      start(controller) {
        if (body) controller.enqueue(new TextEncoder().encode(body));
        controller.close();
      },
    });

    return {
      writeHttpMetadata: (headers: Headers) => {
        if (metadata) {
          Object.entries(metadata).forEach(([key, value]) => {
            headers.set(key, value);
          });
        }
      },
      httpEtag: "test-etag",
      body: mockBody,
      // Add required methods to satisfy R2ObjectBody type
      bodyUsed: false,
      arrayBuffer: vi.fn(),
      text: vi.fn().mockResolvedValue(body || ""),
      json: vi.fn(),
      blob: vi.fn(),
      formData: vi.fn(),
      clone: vi.fn(),
      getReader: () => ({
        read: vi.fn(),
        closed: Promise.resolve(),
        releaseLock: vi.fn(),
      }),
    };
  };

  describe("Content-Type Detection", () => {
    const testCases = [
      { ext: "js", expectedType: "application/javascript; charset=UTF-8" },
      { ext: "mjs", expectedType: "application/javascript; charset=UTF-8" },
      { ext: "css", expectedType: "text/css; charset=UTF-8" },
      { ext: "html", expectedType: "text/html; charset=UTF-8" },
      { ext: "json", expectedType: "application/json; charset=UTF-8" },
      { ext: "ttf", expectedType: "font/ttf" },
      { ext: "woff", expectedType: "font/woff" },
      { ext: "woff2", expectedType: "font/woff2" },
      { ext: "eot", expectedType: "font/eot" },
      { ext: "otf", expectedType: "font/otf" },
      { ext: "png", expectedType: "image/png" },
      { ext: "pdf", expectedType: "application/pdf" },
      { ext: "gif", expectedType: "image/gif" },
      { ext: "webp", expectedType: "image/webp" },
      { ext: "jpg", expectedType: "image/jpeg" },
      { ext: "jpeg", expectedType: "image/jpeg" },
      { ext: "svg", expectedType: "image/svg+xml" },
      { ext: "mp4", expectedType: "video/mp4" },
      { ext: "webm", expectedType: "video/webm" },
      { ext: "mov", expectedType: "video/quicktime" },
      { ext: "avi", expectedType: "video/x-msvideo" },
      { ext: "wmv", expectedType: "video/x-ms-wmv" },
      { ext: "mp3", expectedType: "audio/mpeg" },
      { ext: "wav", expectedType: "audio/wav" },
      { ext: "ogg", expectedType: "audio/ogg" },
      { ext: "flac", expectedType: "audio/flac" },
      { ext: "aac", expectedType: "audio/aac" },
      { ext: "unknown", expectedType: "application/javascript; charset=UTF-8" },
    ];

    testCases.forEach(({ ext, expectedType }) => {
      it(`should set correct Content-Type for .${ext} files`, () => {
        const key = `test-file.${ext}`;
        const response = makeResponse(undefined, key);

        expect(response.headers.get("Content-Type")).toBe(expectedType);
      });
    });
  });

  describe("Header Generation", () => {
    it("should set standard headers", () => {
      const response = makeResponse(undefined, "test.js");

      expect(response.headers.get("Cache-Control")).toBe("public, max-age=31536000");
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
      expect(response.headers.get("Cross-Origin-Embedder-Policy")).toBe("require-corp");
    });

    it("should include R2 object metadata when available", () => {
      const mockMetadata = { "X-Custom-Header": "test-value" };
      const mockR2Object = createMockR2Object(mockMetadata);

      const response = makeResponse(mockR2Object, "test.js");

      expect(response.headers.get("X-Custom-Header")).toBe("test-value");
    });

    it("should set etag from R2 object", () => {
      const mockR2Object = createMockR2Object();

      const response = makeResponse(mockR2Object, "test.js");

      expect(response.headers.get("etag")).toBe("test-etag");
    });
  });

  describe("Response Body Handling", () => {
    it("should return empty response for undefined object", () => {
      const response = makeResponse(undefined, "test.js");

      expect(response.status).toBe(200);
      expect(response.body).toBe(null);
    });

    it("should return response with object body", async () => {
      const mockBody = "test content";
      const mockR2Object = createMockR2Object({}, mockBody);

      const response = makeResponse(mockR2Object, "test.js");

      expect(await response.text()).toBe(mockBody);
    });
  });

  describe("Fallback Behavior", () => {
    it("should use default JavaScript MIME type for unknown extensions", () => {
      const response = makeResponse(undefined, "test.unknown");

      expect(response.headers.get("Content-Type")).toBe("application/javascript; charset=UTF-8");
    });
  });
});

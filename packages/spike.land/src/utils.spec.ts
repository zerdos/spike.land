import { describe, expect, it, vi } from "vitest";
import {
  handleCORS,
  handleRedirectResponse,
  handleUnauthorizedRequest,
  isChunk,
  isUrlFile,
  readRequestBody,
} from "./utils";

describe("Utils Functions", () => {
  describe("isChunk", () => {
    it("should identify chunk files with chunk- prefix", () => {
      expect(isChunk("path/to/chunk-abc123.js")).toBe(true);
    });

    it("should identify chunk files with hash-like pattern", () => {
      expect(isChunk("path/to/file.a1b2c3d4e5.js")).toBe(true);
    });

    it("should return false for non-chunk files", () => {
      expect(isChunk("path/to/regular-file.js")).toBe(false);
    });
  });

  describe("isUrlFile", () => {
    it("should return false for paths without file extension", () => {
      expect(isUrlFile("some/path/without/extension")).toBe(false);
    });

    it("should return false for paths with trailing slash", () => {
      expect(isUrlFile("some/path/")).toBe(false);
    });

    // Note: The current implementation always returns false
    it("should always return false", () => {
      expect(isUrlFile("some/path/file.txt")).toBe(false);
    });
  });

  describe("handleCORS", () => {
    it("should handle CORS preflight request", () => {
      const mockRequest = {
        headers: {
          get: vi.fn()
            .mockReturnValueOnce("http://example.com")
            .mockReturnValueOnce("POST")
            .mockReturnValueOnce("Content-Type"),
        },
      } as unknown as Request;

      const response = handleCORS(mockRequest);

      expect(response.status).toBe(200);
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
      expect(response.headers.get("Access-Control-Allow-Methods")).toBe(
        "POST, OPTIONS",
      );
    });

    it("should handle non-CORS request", () => {
      const mockRequest = {
        headers: {
          get: vi.fn().mockReturnValue(null),
        },
      } as unknown as Request;

      const response = handleCORS(mockRequest);

      expect(response.status).toBe(200);
      expect(response.headers.get("Allow")).toBe("POST, OPTIONS");
    });
  });

  describe("handleUnauthorizedRequest", () => {
    it("should return 401 response", () => {
      const response = handleUnauthorizedRequest();

      expect(response.status).toBe(401);
      expect(response.statusText).toBe("no robots");
    });
  });

  describe("handleRedirectResponse", () => {
    it("should create correct redirect response", () => {
      const mockUrl = new URL("https://example.com");
      const start = "test-start";

      const response = handleRedirectResponse(mockUrl, start);

      expect(response.status).toBe(307);
      expect(response.headers.get("Location")).toBe(
        "https://example.com/live/test-start",
      );
      expect(response.headers.get("Content-Type")).toBe(
        "text/html;charset=UTF-8",
      );
    });
  });

  describe("readRequestBody", () => {
    it("should handle JSON content", async () => {
      const mockRequest = {
        headers: { get: () => "application/json" },
        json: () => Promise.resolve({ key: "value" }),
      } as unknown as Request;

      const result = await readRequestBody(mockRequest);
      expect(result).toEqual({ key: "value" });
    });

    it("should handle text content", async () => {
      const mockRequest = {
        headers: { get: () => "application/text" },
        text: () => Promise.resolve("test text"),
      } as unknown as Request;

      const result = await readRequestBody(mockRequest);
      expect(result).toBe("test text");
    });

    it("should handle form data", async () => {
      const mockFormData = new FormData();
      mockFormData.append("key1", "value1");
      mockFormData.append("key2", "value2");

      const mockRequest = {
        headers: { get: () => "multipart/form-data" },
        formData: () => Promise.resolve(mockFormData),
      } as unknown as Request;

      const result = await readRequestBody(mockRequest);
      expect(result).toEqual({ key1: "value1", key2: "value2" });
    });

    it("should handle other content types", async () => {
      const mockRequest = {
        headers: { get: () => "unknown/type" },
      } as unknown as Request;

      const result = await readRequestBody(mockRequest);
      expect(result).toBe("a file");
    });
  });
});

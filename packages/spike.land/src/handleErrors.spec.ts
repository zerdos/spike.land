import type { WebSocket } from "@cloudflare/workers-types";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";
import { handleErrors } from "./handleErrors";

type SpyInstance = ReturnType<typeof vi.spyOn>;

describe("handleErrors", () => {
  let mockConsoleLog: SpyInstance;
  let mockCb: Mock;

  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks();

    // Mock console.log
    mockConsoleLog = vi.spyOn(console, "log").mockImplementation(() => {});

    // Create a mock callback function
    mockCb = vi.fn();
  });

  describe("Non-WebSocket Error Handling", () => {
    it("should return 500 response for non-WebSocket request errors", async () => {
      const mockRequest = new Request("https://example.com");
      const testError = new Error("Test error");
      mockCb.mockRejectedValue(testError);

      const response = await handleErrors(mockRequest, mockCb);

      expect(response.status).toBe(500);
      expect(await response.text()).toContain(testError.stack || "We have no idea what happened");
      expect(mockConsoleLog).toHaveBeenCalledWith({
        error: testError.stack,
        message: testError.message,
      });
    });

    it("should use default error message for non-Error exceptions", async () => {
      const mockRequest = new Request("https://example.com");
      const testError = "Simple error string";
      mockCb.mockRejectedValue(testError);

      const response = await handleErrors(mockRequest, mockCb);

      expect(response.status).toBe(500);
      expect(await response.text()).toBe("We have no idea what happened");
    });

    it("should return successful response if callback succeeds", async () => {
      const mockRequest = new Request("https://example.com");
      const successResponse = new Response("Success");
      mockCb.mockResolvedValue(successResponse);

      const response = await handleErrors(mockRequest, mockCb);

      expect(response).toBe(successResponse);
      expect(mockConsoleLog).not.toHaveBeenCalled();
    });
  });

  describe("WebSocket Error Handling", () => {
    it("should handle WebSocket upgrade errors", async () => {
      const mockRequest = new Request("https://example.com", {
        headers: { "Upgrade": "websocket" },
      });
      const testError = new Error("WebSocket setup error");
      mockCb.mockRejectedValue(testError);

      const response = await handleErrors(mockRequest, mockCb);

      expect(response.status).toBe(101);
      expect(response.webSocket).toBeDefined();

      // Verify console logging
      expect(mockConsoleLog).toHaveBeenCalledWith({
        error: testError.stack,
        message: testError.message,
      });
    });

    it("should handle non-Error WebSocket exceptions", async () => {
      const mockRequest = new Request("https://example.com", {
        headers: { "Upgrade": "websocket" },
      });
      const testError = "WebSocket error string";
      mockCb.mockRejectedValue(testError);

      const response = await handleErrors(mockRequest, mockCb);

      expect(response.status).toBe(101);
      expect(response.webSocket).toBeDefined();
    });

    it("should create WebSocket pair with error message", async () => {
      const mockRequest = new Request("https://example.com", {
        headers: { "Upgrade": "websocket" },
      });
      const testError = new Error("WebSocket specific error");
      mockCb.mockRejectedValue(testError);

      const response = await handleErrors(mockRequest, mockCb);

      // Verify WebSocket behavior
      const webSocket = response.webSocket as unknown as WebSocket;
      expect(webSocket).toBeDefined();

      // Note: Actual WebSocket send and close behavior would require more complex mocking
      expect(response.status).toBe(101);
    });
  });

  describe("Error Logging", () => {
    it("should log error details for both WebSocket and non-WebSocket errors", async () => {
      // Test WebSocket error logging
      const wsRequest = new Request("https://example.com", {
        headers: { "Upgrade": "websocket" },
      });
      const wsError = new Error("WebSocket test error");
      mockCb.mockRejectedValue(wsError);

      await handleErrors(wsRequest, mockCb);
      expect(mockConsoleLog).toHaveBeenCalledWith({
        error: wsError.stack,
        message: wsError.message,
      });

      // Reset mocks
      mockConsoleLog.mockClear();
      mockCb.mockClear();

      // Test non-WebSocket error logging
      const httpRequest = new Request("https://example.com");
      const httpError = new Error("HTTP test error");
      mockCb.mockRejectedValue(httpError);

      await handleErrors(httpRequest, mockCb);
      expect(mockConsoleLog).toHaveBeenCalledWith({
        error: httpError.stack,
        message: httpError.message,
      });
    });
  });
});

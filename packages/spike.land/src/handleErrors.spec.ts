import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";
import { handleErrors } from "./handleErrors";
import type { WebSocketPair } from "@cloudflare/workers-types";

type SpyInstance = ReturnType<typeof vi.spyOn>;

// Mock WebSocketPair to match Cloudflare Workers interface
class MockWebSocket implements Partial<WebSocket> {
  accept = vi.fn();
  send = vi.fn();
  close = vi.fn();
  addEventListener = vi.fn();
  removeEventListener = vi.fn();
  dispatchEvent = vi.fn(() => true);
  readyState = 0;
  url = "";
  serializeAttachment = vi.fn();
  deserializeAttachment = vi.fn();
  onopen: ((this: WebSocket, ev: Event) => any) | null = null;
  onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null = null;
  onclose: ((this: WebSocket, ev: CloseEvent) => any) | null = null;
  onerror: ((this: WebSocket, ev: Event) => any) | null = null;
  readonly CLOSED: 3 = 3;
  readonly CLOSING: 2 = 2;
  readonly CONNECTING: 0 = 0;
  readonly OPEN: 1 = 1;
  binaryType: BinaryType = 'blob';
  bufferedAmount = 0;
  extensions = '';
  protocol = '';
}

// Define WebSocketPair for Cloudflare Workers
class MockWebSocketPair {
  0: WebSocket;
  1: WebSocket;

  constructor() {
    this[0] = new MockWebSocket() as unknown as WebSocket;
    this[1] = new MockWebSocket() as unknown as WebSocket;
  }
}

// Setup global WebSocketPair
(globalThis as any).WebSocketPair = MockWebSocketPair;

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
      expect(response.webSocket).toBeTruthy();

      // Verify WebSocket behavior
      const pair = new MockWebSocketPair();
      expect(pair[1].accept).toHaveBeenCalled();
      expect(pair[1].send).toHaveBeenCalledWith(JSON.stringify({ error: testError.stack }));
      expect(pair[1].close).toHaveBeenCalledWith(1011, "Uncaught exception during session setup");

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
      expect(response.webSocket).toBeTruthy();
    });

    it("should create WebSocket pair with error message", async () => {
      const mockRequest = new Request("https://example.com", {
        headers: { "Upgrade": "websocket" },
      });
      const testError = new Error("WebSocket specific error");
      mockCb.mockRejectedValue(testError);

      const response = await handleErrors(mockRequest, mockCb);

      expect(response.status).toBe(101);
      expect(response.webSocket).toBeTruthy();
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

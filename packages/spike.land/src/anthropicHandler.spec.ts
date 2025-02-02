import Anthropic from "@anthropic-ai/sdk";
import { beforeEach, describe, expect, it } from "vitest";
import { type Mock, vi } from "vitest";
import { base64Encode, handleAnthropicRequest } from "./anthropicHandler";
import { handleCMSIndexRequest } from "./chat";
import type Env from "./env";
import { KVLogger } from "./Logs";
import { handleCORS, readRequestBody } from "./utils";

// Mock dependencies
vi.mock("@anthropic-ai/sdk", () => {
  const mockAnthropic = vi.fn(() => ({
    messages: {
      create: vi.fn().mockImplementation((options) => {
        if (options.stream) {
          return {
            [Symbol.asyncIterator]: () => ({
              next: vi.fn()
                .mockResolvedValueOnce({
                  value: { type: "content_block_start", delta: { text: "Hello " } },
                  done: false,
                })
                .mockResolvedValueOnce({
                  value: { type: "content_block_delta", delta: { text: "world" } },
                  done: false,
                })
                .mockResolvedValueOnce({ done: true }),
            }),
          };
        }
        return Promise.resolve({ content: [{ text: "Test response" }] });
      }),
    },
  }));
  mockAnthropic.prototype.messages = {
    create: vi.fn(),
  };
  return { default: mockAnthropic };
});

vi.mock("./Logs", () => ({
  KVLogger: vi.fn().mockImplementation(() => ({
    log: vi.fn(),
  })),
}));

vi.mock("./utils", () => ({
  handleCORS: vi.fn(),
  readRequestBody: vi.fn(),
}));

vi.mock("./chat", () => ({
  handleCMSIndexRequest: vi.fn(),
}));

describe("AnthropicHandler", () => {
  let mockEnv: Partial<Env>;
  let mockCtx: ExecutionContext;

  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks();

    mockEnv = {
      ANTHROPIC_API_KEY: "test-api-key",
      KV: {} as any,
    };

    mockCtx = {
      waitUntil: vi.fn(),
    } as any;
  });

  describe("base64Encode", () => {
    it("should correctly encode an ArrayBuffer to base64", () => {
      const buffer = new ArrayBuffer(4);
      const uint8Array = new Uint8Array(buffer);
      uint8Array.set([72, 101, 108, 108]); // "Hell"

      const result = base64Encode(buffer);
      expect(result).toBe(btoa("Hell"));
    });
  });

  describe("handleAnthropicRequest", () => {
    it("should handle non-streaming request", async () => {
      const mockRequest = new Request("https://example.com", {
        method: "POST",
        body: JSON.stringify({
          messages: [{ content: "Test message" }],
          stream: false,
        }),
      });

      const mockAnthropicResponse = {
        id: "test-id",
        content: [{ text: "Test response" }],
      };

      // Mock dependencies
      (readRequestBody as Mock).mockResolvedValue({
        messages: [{ content: "Test message" }],
        stream: false,
      });

      (Anthropic.prototype.messages.create as Mock).mockResolvedValue(mockAnthropicResponse);

      const response = await handleAnthropicRequest(mockRequest, mockEnv as Env, mockCtx);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("application/json");

      const responseBody = await response.json();
      expect(responseBody).toEqual(mockAnthropicResponse);
    });

    it("should handle streaming request", async () => {
      const mockRequest = new Request("https://example.com", {
        method: "POST",
        body: JSON.stringify({
          messages: [{ content: "Test message" }],
          stream: true,
        }),
      });

      // Mock dependencies
      (readRequestBody as Mock).mockResolvedValue({
        messages: [{ content: "Test message" }],
        stream: true,
      });

      const mockStream = {
        [Symbol.asyncIterator]: vi.fn().mockReturnValue({
          next: vi.fn()
            .mockResolvedValueOnce({
              value: {
                type: "content_block_start",
                delta: { text: "Hello " },
              },
              done: false,
            })
            .mockResolvedValueOnce({
              value: {
                type: "content_block_delta",
                delta: { text: "world" },
              },
              done: false,
            })
            .mockResolvedValueOnce({ done: true }),
        }),
      };

      (Anthropic.prototype.messages.create as Mock).mockResolvedValue(mockStream);

      const response = await handleAnthropicRequest(mockRequest, mockEnv as Env, mockCtx);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("text/event-stream");

      // You might want to add more specific assertions about the stream content
      // This would involve reading the stream and checking its contents
    });

    it("should handle image content in messages", async () => {
      const mockImageUrl = "https://example.com/image.jpg";
      const mockRequest = new Request("https://example.com", {
        method: "POST",
        body: JSON.stringify({
          messages: [{
            content: [{
              type: "image_url",
              image_url: { url: mockImageUrl },
            }],
          }],
          stream: false,
        }),
      });

      const mockImageResponse = new Response(new ArrayBuffer(10), {
        headers: { "Content-Type": "image/jpeg" },
      });

      // Mock dependencies
      (readRequestBody as Mock).mockResolvedValue({
        messages: [{
          content: [{
            type: "image_url",
            image_url: { url: mockImageUrl },
          }],
        }],
        stream: false,
      });

      (handleCMSIndexRequest as Mock).mockResolvedValue(mockImageResponse);

      (Anthropic.prototype.messages.create as Mock).mockResolvedValue({});

      await handleAnthropicRequest(mockRequest, mockEnv as Env, mockCtx);

      // Verify that handleCMSIndexRequest was called with the image URL
      expect(handleCMSIndexRequest).toHaveBeenCalledWith(
        expect.objectContaining({ url: mockImageUrl }),
        mockEnv,
      );
    });
  });
});

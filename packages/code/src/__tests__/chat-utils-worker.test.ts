import type { HandleSendMessageProps } from "@/lib/interfaces";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ChatHandler, handleSendMessage } from "@/workers/chat-utils.worker";

// Mock web worker context
declare let self: Worker;
self.postMessage = vi.fn();

// Mock AI Handler
vi.mock("../services/ai/AIHandler", () => ({
  AIHandler: {
    process: vi.fn().mockImplementation(async (text: string) => ({
      text,
      timestamp: new Date().toISOString(),
      status: "success",
    })),
    validateContent: vi.fn().mockImplementation((_content: string | { type: "text", text: string }[]) => true),
  },
}));

describe("handleSendMessage", () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;
  let postMessageSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    postMessageSpy = vi.spyOn(self, "postMessage");
    vi.clearAllMocks();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("should handle valid messages", async () => {
    const testProps: HandleSendMessageProps = {
      messages: [],
      codeSpace: "test-space",
      prompt: "Hello",
      images: [],
      code: "test code",
    };

    await handleSendMessage(testProps);
    expect(postMessageSpy).toHaveBeenCalledWith(expect.objectContaining({
      isStreaming: false,
      messages: expect.any(Array),
      debugInfo: expect.any(Array),
    }));
  });

  it("should log error when AIHandler throws", async () => {
    const error = new Error("AI processing failed");
    const { AIHandler: MockAIHandler } = await import("../services/ai/AIHandler");
    vi.mocked(MockAIHandler.process).mockRejectedValueOnce(error);

    const testProps: HandleSendMessageProps = {
      messages: [],
      codeSpace: "test-space",
      prompt: "Error case",
      images: [],
      code: "test code",
    };

    await handleSendMessage(testProps);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(error.message));

  describe("ChatHandler", () => {
    let chatHandler: ChatHandler;
    const defaultProps = {
      messages: [],
      codeSpace: "test-space",
      code: "test code",
    };

    beforeEach(() => {
      chatHandler = new ChatHandler(defaultProps);
    });

    it("should initialize with default state", () => {
      expect(chatHandler).toBeDefined();
      expect(chatHandler.handleMessage).toBeDefined();
    });

    it("should handle message processing", async () => {
      const messagePayload = {
        prompt: "Test message",
        images: [],
      };

      await chatHandler.handleMessage(messagePayload);
      expect(postMessageSpy).toHaveBeenCalledWith(expect.objectContaining({
        isStreaming: false,
      }));
    });

    it("should handle empty prompts", async () => {
      const messagePayload = {
        prompt: "",
        images: [],
      };

      await chatHandler.handleMessage(messagePayload);
      expect(postMessageSpy).not.toHaveBeenCalledWith(expect.objectContaining({
        type: "error",
      }));
    });
  });
  });
});
import { Message, MessageType } from "@/lib/interfaces";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ChatHandler, handleSendMessage } from "../workers/chat-utils.worker";

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
    const mockMessage: Message = {
      type: MessageType.TEXT,
      id: "123",
      role: "user",
      content: [{ type: "text", text: "Hello" }],
    };

    await handleSendMessage(mockMessage);
    expect(postMessageSpy).toHaveBeenCalledWith({
      type: "response",
      content: expect.any(Object),
    });
  });

  it("should log error when AIHandler throws", async () => {
    const error = new Error("AI processing failed");
    const { AIHandler: MockAIHandler } = await import("../services/ai/AIHandler");
    vi.mocked(MockAIHandler.process).mockRejectedValueOnce(error);

    const mockMessage: Message = {
      id: "123",
      role: "user",
      type: MessageType.TEXT,
      content: [{ type: "text", text: "Error case" }],
    };

    await handleSendMessage(mockMessage);
    expect(consoleSpy).toHaveBeenCalledWith("Error in handleMessage:", error);
    expect(postMessageSpy).toHaveBeenCalledWith({
      type: "error",
      error: "AI processing failed",
    });
  });

  it("should log invalid message content type error", async () => {
    const mockMessage: Message = {
      id: "test-id",
      role: "user",
      type: MessageType.TEXT,
      content: [{ type: "text", text: "Invalid content" }],
    };

    await handleSendMessage(mockMessage);
    expect(consoleSpy).toHaveBeenCalledWith("Error in processMessage:", expect.any(Error));
    expect(consoleSpy).toHaveBeenCalledWith("Error in processMessage:", expect.any(Error));
    expect(postMessageSpy).toHaveBeenCalledWith({
      type: "error",
      error: "Invalid assistant message content type",
    });
  });

  it.skip("should handle missing content", async () => {
    const mockMessage = {
      type: MessageType.TEXT,
    } as unknown as Message;

    await handleSendMessage(mockMessage);
    expect(consoleSpy).toHaveBeenCalledWith("Error in processMessage:", expect.any(Error));
    expect(postMessageSpy).toHaveBeenCalledWith({
      type: "error",
      error: "Invalid message format",
    });
  });

  describe("ChatHandler", () => {
    let chatHandler: ChatHandler;

    beforeEach(() => {
      chatHandler = new ChatHandler();
    });

    it("should initialize with default state", () => {
      expect(chatHandler).toBeDefined();
      expect(chatHandler.handleMessage).toBeDefined();
      expect(chatHandler.processMessage).toBeDefined();
    });

    it("should handle message processing errors", async () => {
      const error = new Error("Test error");
      const { AIHandler: MockAIHandler } = await import("../services/ai/AIHandler");
      vi.mocked(MockAIHandler.process).mockRejectedValueOnce(error);

      await chatHandler.handleMessage({
        role: "user",
        id: "123",
        type: MessageType.TEXT,
        content: [{ type: "text", text: "Test message" }],
      });

      expect(consoleSpy).toHaveBeenCalledWith("Error in processMessage:", error);
      expect(postMessageSpy).toHaveBeenCalledWith({
        type: "error",
        error: "Test error",
      });
    });

    it("should validate message format", async () => {
      const invalidMessage = {};

      await chatHandler.handleMessage(invalidMessage as unknown as Message);
      expect(consoleSpy).toHaveBeenCalledWith("Error in handleMessage:", expect.any(Error));
      expect(postMessageSpy).toHaveBeenCalledWith({
        type: "error",
        error: "Invalid message format",
      });
    });
  });
});

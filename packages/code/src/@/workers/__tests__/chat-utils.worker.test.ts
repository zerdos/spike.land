import type { Message } from "@/lib/interfaces";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AIHandler } from "../../../AIHandler";
import { handleSendMessage } from "../chat-utils.worker";

// Mock AIHandler
vi.mock("../../../AIHandler", () => ({
  AIHandler: vi.fn().mockImplementation(() => ({
    prepareClaudeContent: vi.fn(),
    sendToAnthropic: vi.fn(),
    sendToGpt4o: vi.fn(),
  })),
}));

// Mock BroadcastChannel since it's not available in Node
class MockBroadcastChannel {
  postMessage: (message: unknown) => void;
  close: () => void;

  constructor() {
    this.postMessage = vi.fn();
    this.close = vi.fn();
  }
}

global.BroadcastChannel = MockBroadcastChannel;

describe("handleSendMessage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should log empty prompt scenario", async () => {
    const result = await handleSendMessage({
      messages: [],
      codeSpace: "test",
      prompt: "",
      images: [],
      code: "",
    });

    expect(result.logs).toContainEqual(
      expect.stringMatching(/Starting handleSendMessage.*"promptLength":0/),
    );
    expect(result.logs).toContainEqual(
      expect.stringMatching(/Empty prompt received, returning/),
    );
  });

  it("should log error when AIHandler throws", async () => {
    const mockError = new Error("AI processing failed");
    const mockAIHandler = vi.mocked(AIHandler);
    mockAIHandler.mockImplementation(() => ({
      prepareClaudeContent: vi.fn().mockImplementation(() => {
        throw mockError;
      }),
      sendToAnthropic: vi.fn(),
      sendToGpt4o: vi.fn(),
    }));

    const result = await handleSendMessage({
      messages: [],
      codeSpace: "test",
      prompt: "test prompt",
      images: [],
      code: "",
    });

    expect(result.logs).toContainEqual(
      expect.stringMatching(/Error in handleMessage.*AI processing failed/),
    );
  });

  it("should log successful message processing", async () => {
    const mockAIHandler = vi.mocked(AIHandler);
    mockAIHandler.mockImplementation(() => ({
      prepareClaudeContent: vi.fn().mockReturnValue("processed content"),
      sendToAnthropic: vi.fn().mockResolvedValue({
        id: "123",
        role: "assistant",
        content: "response",
      } as Message),
      sendToGpt4o: vi.fn(),
    }));

    const result = await handleSendMessage({
      messages: [],
      codeSpace: "test",
      prompt: "test prompt",
      images: [],
      code: "",
    });

    expect(result.logs).toContainEqual(
      expect.stringMatching(/Starting handleSendMessage/),
    );
    expect(result.logs).toContainEqual(
      expect.stringMatching(/Initializing ChatHandler/),
    );
  });

  it("should log fallback to GPT-4 scenario", async () => {
    const mockAIHandler = vi.mocked(AIHandler);
    mockAIHandler.mockImplementation(() => ({
      prepareClaudeContent: vi.fn().mockReturnValue("processed content"),
      sendToAnthropic: vi.fn().mockResolvedValue({
        id: "123",
        role: "assistant",
        content: "An error occurred while processing",
      } as Message),
      sendToGpt4o: vi.fn().mockResolvedValue({
        id: "124",
        role: "assistant",
        content: "GPT-4 response",
      } as Message),
    }));

    const result = await handleSendMessage({
      messages: [],
      codeSpace: "test",
      prompt: "test prompt",
      images: [],
      code: "",
    });

    expect(result.logs).toContainEqual(
      expect.stringMatching(/Falling back to GPT-4/),
    );
  });

  it("should log invalid message content type error", async () => {
    const mockAIHandler = vi.mocked(AIHandler);
    mockAIHandler.mockImplementation(() => ({
      prepareClaudeContent: vi.fn().mockReturnValue("processed content"),
      sendToAnthropic: vi.fn().mockResolvedValue({
        id: "123",
        role: "assistant",
        content: { invalidType: true } as any, // Invalid content type
      }),
      sendToGpt4o: vi.fn(),
    }));

    const result = await handleSendMessage({
      messages: [],
      codeSpace: "test",
      prompt: "test prompt",
      images: [],
      code: "",
    });

    expect(result.logs).toContainEqual(
      expect.stringMatching(/Invalid assistant message content type/),
    );
  });
});

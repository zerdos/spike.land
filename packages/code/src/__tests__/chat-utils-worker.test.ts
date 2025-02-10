import { beforeEach, describe, expect, test, vi } from "vitest";
import type { Message } from "@/lib/interfaces";
import { handleSendMessage } from "../@/workers/chat-utils.worker";

// Mock BroadcastChannel
class MockBroadcastChannel {
  postMessage = vi.fn();
}

// Mock worker environment
const mockSelf = {
  postMessage: vi.fn(),
};
global.BroadcastChannel = MockBroadcastChannel as any;
global.self = mockSelf as any;

const mockAIHandler = {
  sendToAnthropic: vi.fn(),
  prepareClaudeContent: vi.fn(),
  sendToGpt4o: vi.fn()
};

// Mock the AIHandler class
vi.mock("../AIHandler", () => ({
  AIHandler: vi.fn().mockImplementation(() => mockAIHandler)
}));

describe("handleSendMessage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAIHandler.sendToAnthropic.mockResolvedValue({
      id: "test-id",
      role: "assistant",
      content: "Test response"
    });
    mockAIHandler.prepareClaudeContent.mockReturnValue("Prepared content");
  });

  test("should handle valid messages", async () => {
    const testMessage: Message = {
      id: "test-message-1",
      role: "user",
      content: "Test message"
    };

    const data = {
      messages: [testMessage],
      codeSpace: "test.ts",
      prompt: "Test prompt",
      images: [],
      code: "// Test code"
    };

    const result = await handleSendMessage(data);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(mockSelf.postMessage).toHaveBeenCalledWith(expect.objectContaining({
      isStreaming: false,
      messages: expect.any(Array)
    }));
  });

  test("should handle error from AIHandler", async () => {
    const testError = new Error("Test error in AIHandler");

    // Mock both methods to throw the same error
    mockAIHandler.prepareClaudeContent.mockImplementation(() => {
      throw testError;
    });

    mockAIHandler.sendToAnthropic.mockRejectedValue(testError);

    const testMessage: Message = {
      id: "test-message-1",
      role: "user",
      content: "Test message"
    };

    const data = {
      messages: [testMessage],
      codeSpace: "test.ts",
      prompt: "Test prompt",
      images: [],
      code: "// Test code"
    };

    const result = await handleSendMessage(data);
    
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);

    const lastCall = mockSelf.postMessage.mock.lastCall?.[0];
    expect(lastCall).toBeDefined();
    expect(lastCall.debugInfo.some((log: string) => 
      log.includes("Test error in AIHandler") || 
      log.includes("Fatal error in handleSendMessage:")
    )).toBe(true);
  });
});

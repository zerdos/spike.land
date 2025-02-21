import { AIService } from "@/lib/ai-service";
import type { Message } from "@/lib/interfaces";
import { handleSendMessage } from "@/workers/chat-utils.worker";
import { beforeEach, describe, expect, test, vi } from "vitest";

// Mock BroadcastChannel
const mockBCPostMessage = vi.fn();
class MockBroadcastChannel {
  postMessage = mockBCPostMessage;
}

// Mock worker environment
interface MockWorkerScope {
  postMessage: typeof vi.fn;
}

const mockSelf = {
  postMessage: vi.fn(),
} as MockWorkerScope;

global.BroadcastChannel = MockBroadcastChannel as unknown as typeof BroadcastChannel;
(global as unknown as { self: MockWorkerScope; }).self = mockSelf;

describe("handleSendMessage", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  // Mock console before tests
  beforeAll(() => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  // Restore console after tests
  afterAll(() => {
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should handle valid messages", async () => {
    // Mock the entire AIService class within beforeEach for valid messages
    vi.spyOn(AIService.prototype, "prepareClaudeContent").mockReturnValue("Prepared content");
    vi.spyOn(AIService.prototype, "sendToAI").mockResolvedValue({
      id: "test-id",
      role: "assistant",
      content: "Test response",
    });

    const testMessage: Message = {
      id: "test-message-1",
      role: "user",
      content: "Test message",
    };

    const data = {
      messages: [testMessage],
      codeSpace: "test.ts",
      prompt: "Test prompt",
      images: [],
      code: "// Test code",
    };

    const result = await handleSendMessage(data);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(mockBCPostMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        isStreaming: false,
        messages: expect.any(Array),
      }),
    );
  });

  test("should handle error from AIService", async () => {
    const testError = new Error("Test error in AIService");

    // Mock sendToAI to reject with an error for this specific test
    vi.spyOn(AIService.prototype, "prepareClaudeContent").mockReturnValue("Prepared content");
    vi.spyOn(AIService.prototype, "sendToAI").mockRejectedValue(testError);

    const testMessage: Message = {
      id: "test-message-1",
      role: "user",
      content: "Test message",
    };

    const data = {
      messages: [testMessage],
      codeSpace: "test.ts",
      prompt: "Test prompt",
      images: [],
      code: "// Test code",
    };

    const result = await handleSendMessage(data);

    // The specific snapshot might need adjustment based on the actual error handling
    // in handleSendMessage, but the key is that it should handle the error gracefully.
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });
});

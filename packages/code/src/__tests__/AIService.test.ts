import type { Message } from "@/lib/interfaces";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AIService } from "@/lib/ai-service";

vi.mock("../shared", () => ({
  prettierToThrow: vi.fn().mockResolvedValue("const x = 5;"),
}));
vi.mock("../services/runner", () => ({
  runner: vi.fn().mockResolvedValue(true),
}));
vi.mock("@/lib/ai-config", () => ({
  anthropicSystem: vi.fn(() => "Mocked anthropic system content"),
  reminder: vi.fn(() => "Mocked reminder content"),
}));
vi.mock("../contextManager", () => ({
  ContextManager: vi.fn(() => ({
    getFullContext: vi.fn(() => ({})),
    updateContext: vi.fn(),
  })),
}));

describe("AIService", () => {
  let aiService: AIService;

  beforeEach(() => {
    vi.clearAllMocks();

    aiService = new AIService(
      {
        retryWithClaudeEnabled: false,
        updateThrottleMs: 1000,
        anthropicEndpoint: "https://api.anthropic.com",
        openAIEndpoint: "https://api.openai.com",
        gpt4oEndpoint: "https://api.gpt4o.com",
        setIsStreaming: vi.fn(),
      },
    );
  });

  describe("sendToAI", () => {
    it("should send messages to AI and return an assistant message", async () => {
      const mockMessages: Message[] = [
        { id: "1", role: "user", content: "Hello" },
      ];

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        body: {
          getReader: () => ({
            read: vi.fn()
              .mockResolvedValueOnce({
                done: false,
                value: new TextEncoder().encode("Mocked assistant content"),
              })
              .mockResolvedValueOnce({ done: true }),
          }),
        },
      } as unknown as Response);

      const onUpdate = vi.fn();
      const result = await aiService.sendToAI(
        "anthropic",
        mockMessages,
        onUpdate,
      );

      expect(result).toEqual({
        id: expect.any(String),
        role: "assistant",
        content: "Mocked assistant content",
      });
      expect(onUpdate).toHaveBeenCalledWith("Mocked assistant content");
    });

    it("should throw an error when the response is not OK", async () => {
      const mockMessages: Message[] = [
        { id: "1", role: "user", content: "Hello" },
      ];

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      } as Response);

      await expect(aiService.sendToAI("anthropic", mockMessages, vi.fn()))
        .rejects.toThrow("HTTP error! status: 500");
    });
  });

  describe("sendToAnthropic", () => {
    it("should call sendToAI with the correct endpoint", async () => {
      const mockMessages: Message[] = [
        { id: "1", role: "user", content: "Hello" },
      ];
      const onUpdate = vi.fn();

      const sendToAISpy = vi.spyOn(aiService, "sendToAI");
      sendToAISpy.mockResolvedValue({
        id: "2",
        role: "assistant",
        content: "Response",
      });

      await aiService.sendToAnthropic(mockMessages, onUpdate);

      expect(sendToAISpy).toHaveBeenCalledWith(
        "anthropic",
        mockMessages,
        onUpdate,
      );
    });
  });

  describe("sendToGpt4o", () => {
    it("should call sendToAI with the correct endpoint", async () => {
      const mockMessages: Message[] = [
        { id: "1", role: "user", content: "Hello" },
      ];
      const onUpdate = vi.fn();

      const sendToAISpy = vi.spyOn(aiService, "sendToAI");
      sendToAISpy.mockResolvedValue({
        id: "2",
        role: "assistant",
        content: "Response",
      });

      await aiService.sendToGpt4o(mockMessages, onUpdate);

      expect(sendToAISpy).toHaveBeenCalledWith("gpt4o", mockMessages, onUpdate);
    });
  });

  describe("prepareClaudeContent", () => {
    it("should return anthropic content when codeNow is different from last message", () => {
      const content = "User prompt";
      const messages: Message[] = [{
        id: "1",
        role: "user",
        content: "Old code",
      }];
      const codeNow = "New code";
      const codeSpace = "file.ts";

      const result = aiService.prepareClaudeContent(
        { content, messages, codeNow, codeSpace },
      );

      expect(result).toContain("Mocked anthropic system content");
    });

    it("should return reminder content when codeNow is the same as last message", () => {
      const content = "User prompt";
      const messages: Message[] = [{
        id: "1",
        role: "user",
        content: "Same code",
      }];
      const codeNow = "Same code";
      const codeSpace = "file.ts";

      const result = aiService.prepareClaudeContent(
        { content, messages, codeNow, codeSpace },
      );

      expect(result).toContain("Mocked reminder content");
    });

    it("should handle empty messages array", () => {
      const content = "User prompt";
      const messages: Message[] = [];
      const codeNow = "New code";
      const codeSpace = "file.ts";

      const result = aiService.prepareClaudeContent(
        { content, messages, codeNow, codeSpace },
      );

      expect(result).toContain("Mocked anthropic system content");
    });

    it("should handle empty codeNow", () => {
      const content = "User prompt";
      const messages: Message[] = [{
        id: "1",
        role: "user",
        content: "Old code",
      }];
      const codeNow = "";
      const codeSpace = "file.ts";

      const result = aiService.prepareClaudeContent(
        { content, messages, codeNow, codeSpace },
      );

      expect(result).toContain("Mocked anthropic system content");
    });
  });
});

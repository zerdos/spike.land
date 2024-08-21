import { beforeEach, describe, expect, it, Mocked, vi } from "vitest";
import { AIService } from "../services/AIService";
import { LocalStorageService } from "../services/LocalStorageService";
import { Message } from "../types/Message";

vi.mock("../services/LocalStorageService");

describe("AIService", () => {
  let aiService: AIService;
  let localStorageService: Mocked<LocalStorageService>;

  beforeEach(() => {
    vi.clearAllMocks();

    localStorageService = {
      loadMessages: vi.fn().mockReturnValue([]),
      saveAIInteraction: vi.fn(),
    } as unknown as Mocked<LocalStorageService>;

    aiService = new AIService(localStorageService, {
      retryWithClaudeEnabled: false,
      updateThrottleMs: 1000,
      anthropicEndpoint: "https://api.anthropic.com",
      openAIEndpoint: "https://api.openai.com",
      gpt4oEndpoint: "https://api.gpt4o.com",
    });
  });

  describe("sendToAnthropic", () => {
    it("should send messages to Anthropic and return an assistant message", async () => {
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
                value: new TextEncoder().encode("Assistant"),
              })
              .mockResolvedValueOnce({ done: true }),
          }),
        },
      } as unknown as Response);

      const result = await aiService.sendToAnthropic(mockMessages, vi.fn());

      expect(result.role).toBe("assistant");
      expect(result.content).toBe("Assistant");
      expect(localStorageService.saveAIInteraction).toHaveBeenCalledWith(
        "Hello",
        "Assistant",
      );
    });

    it("should throw an error when the response is not OK", async () => {
      const mockMessages: Message[] = [
        { id: "1", role: "user", content: "Hello" },
      ];

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      } as Response);

      await expect(aiService.sendToAnthropic(mockMessages, vi.fn())).rejects.toThrow("HTTP error! status: 500");
    });
  });

  // Add more tests for other methods in AIService
});

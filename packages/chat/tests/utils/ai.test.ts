import { describe, it, expect, beforeEach, vi } from "vitest";
import { AIService } from "../../src/utils/ai";
import type { Env } from "../../src/types";

describe("AIService", () => {
  let aiService: AIService;
  let mockEnv: Env;

  beforeEach(() => {
    mockEnv = {
      AI: {
        run: vi.fn(),
      } as any,
    } as Env;

    aiService = new AIService(mockEnv);
  });

  describe("generateResponse", () => {
    it("should generate AI response from string result", async () => {
      mockEnv.AI.run = vi.fn().mockResolvedValue("This is an AI response");

      const result = await aiService.generateResponse({
        model: "llama-2-7b",
        messages: [
          { role: "user", content: "Hello" },
        ],
      });

      expect(result).toBe("This is an AI response");
      expect(mockEnv.AI.run).toHaveBeenCalledWith(
        "@cf/meta/llama-2-7b-chat-int8",
        expect.objectContaining({
          messages: [{ role: "user", content: "Hello" }],
          temperature: 0.7,
          max_tokens: 1000,
        })
      );
    });

    it("should generate AI response from object result", async () => {
      mockEnv.AI.run = vi.fn().mockResolvedValue({
        response: "Response from object",
      });

      const result = await aiService.generateResponse({
        model: "mistral-7b",
        messages: [
          { role: "user", content: "Tell me about AI" },
        ],
        temperature: 0.5,
        max_tokens: 500,
      });

      expect(result).toBe("Response from object");
      expect(mockEnv.AI.run).toHaveBeenCalledWith(
        "@cf/mistral/mistral-7b-instruct-v0.1",
        expect.objectContaining({
          temperature: 0.5,
          max_tokens: 500,
        })
      );
    });

    it("should handle invalid AI response format", async () => {
      mockEnv.AI.run = vi.fn().mockResolvedValue(null);

      await expect(
        aiService.generateResponse({
          model: "llama-2-7b",
          messages: [{ role: "user", content: "Hello" }],
        })
      ).rejects.toThrow("Failed to generate AI response");
    });
  });

  describe("countTokens", () => {
    it("should estimate token count from text", async () => {
      const text = "This is a sample text for token counting";
      const tokens = await aiService.countTokens(text);
      expect(tokens).toBe(Math.ceil(text.length / 4));
    });
  });

  describe("moderateContent", () => {
    it("should return true for safe content", async () => {
      mockEnv.AI.run = vi.fn().mockResolvedValue("safe");

      const result = await aiService.moderateContent("Hello, how are you?");
      expect(result).toBe(true);
    });

    it("should return false for unsafe content", async () => {
      mockEnv.AI.run = vi.fn().mockResolvedValue("unsafe content detected");

      const result = await aiService.moderateContent("Inappropriate content");
      expect(result).toBe(false);
    });

    it("should return true on moderation error", async () => {
      mockEnv.AI.run = vi.fn().mockRejectedValue(new Error("API error"));

      const result = await aiService.moderateContent("Some content");
      expect(result).toBe(true);
    });
  });

  describe("generateTitle", () => {
    it("should generate title from conversation", async () => {
      mockEnv.AI.run = vi.fn().mockResolvedValue("Chat about Weather");

      const messages = [
        { role: "user", content: "What's the weather like?" },
        { role: "assistant", content: "I'd be happy to help with weather information." },
      ];

      const result = await aiService.generateTitle(messages);
      expect(result).toBe("Chat about Weather");
    });

    it("should limit title to 50 characters", async () => {
      mockEnv.AI.run = vi.fn().mockResolvedValue(
        "This is a very long title that exceeds the maximum character limit of fifty"
      );

      const messages = [
        { role: "user", content: "Long conversation" },
      ];

      const result = await aiService.generateTitle(messages);
      expect(result.length).toBeLessThanOrEqual(50);
    });

    it("should return default title on error", async () => {
      mockEnv.AI.run = vi.fn().mockRejectedValue(new Error("API error"));

      const messages = [
        { role: "user", content: "Hello" },
      ];

      const result = await aiService.generateTitle(messages);
      expect(result).toBe("New Conversation");
    });
  });

  describe("summarizeConversation", () => {
    it("should summarize conversation", async () => {
      mockEnv.AI.run = vi.fn().mockResolvedValue("User asked about AI. Assistant explained machine learning basics.");

      const messages = [
        { role: "user", content: "What is AI?" },
        { role: "assistant", content: "AI is artificial intelligence..." },
      ];

      const result = await aiService.summarizeConversation(messages);
      expect(result).toBe("User asked about AI. Assistant explained machine learning basics.");
    });

    it("should return empty string on error", async () => {
      mockEnv.AI.run = vi.fn().mockRejectedValue(new Error("API error"));

      const messages = [
        { role: "user", content: "Test" },
      ];

      const result = await aiService.summarizeConversation(messages);
      expect(result).toBe("");
    });
  });

  describe("extractKeywords", () => {
    it("should extract keywords from text", async () => {
      mockEnv.AI.run = vi.fn().mockResolvedValue("weather, temperature, forecast, rain");

      const result = await aiService.extractKeywords("What's the weather forecast for tomorrow? Will it rain?");
      expect(result).toEqual(["weather", "temperature", "forecast", "rain"]);
    });

    it("should return empty array on error", async () => {
      mockEnv.AI.run = vi.fn().mockRejectedValue(new Error("API error"));

      const result = await aiService.extractKeywords("Some text");
      expect(result).toEqual([]);
    });
  });

  describe("model mapping", () => {
    it("should map model names correctly", async () => {
      const testCases = [
        { input: "llama-2-7b", expected: "@cf/meta/llama-2-7b-chat-int8" },
        { input: "mistral-7b", expected: "@cf/mistral/mistral-7b-instruct-v0.1" },
        { input: "codellama", expected: "@cf/meta/codellama-7b-instruct-awq" },
        { input: "unknown-model", expected: "@cf/meta/llama-2-7b-chat-int8" },
      ];

      for (const { input, expected } of testCases) {
        mockEnv.AI.run = vi.fn().mockResolvedValue("response");
        
        await aiService.generateResponse({
          model: input,
          messages: [{ role: "user", content: "test" }],
        });

        expect(mockEnv.AI.run).toHaveBeenCalledWith(
          expected,
          expect.any(Object)
        );
      }
    });
  });
});
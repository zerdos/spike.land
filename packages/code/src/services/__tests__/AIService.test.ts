// Mock declarations must be before imports
vi.mock("@/lib/context-manager");
vi.mock("../../config/aiConfig", () => ({
  anthropicSystem: vi.fn(({ userPrompt, fileContent, fileName }) =>
    `[System] ${userPrompt} - ${fileContent} - ${fileName}`
  ),
  reminder: vi.fn(({ userPrompt }) => `[Reminder] ${userPrompt}`),
}));

import { beforeEach, describe, expect, it, vi } from "vitest";
import { anthropicSystem, reminder } from "../../config/aiConfig";
import { AIService } from "../AIService";

// Type for message roles
type Role = "user" | "assistant" | "system";

describe("AIService", () => {
  let service: AIService;
  let mockConfig: {
    gpt4oEndpoint: string;
    anthropicEndpoint: string;
    openAIEndpoint: string;
    updateThrottleMs: number;
    retryWithClaudeEnabled: boolean;
    setIsStreaming: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();

    mockConfig = {
      gpt4oEndpoint: "http://gpt4o-api.test",
      anthropicEndpoint: "http://anthropic-api.test",
      openAIEndpoint: "http://openai-api.test",
      updateThrottleMs: 100,
      retryWithClaudeEnabled: true,
      setIsStreaming: vi.fn(),
    };

    service = new AIService(mockConfig, "test-space");

    global.fetch = vi.fn();
    vi.useFakeTimers();
  });

  describe("prepareClaudeContent", () => {
    it("should return reminder content when codeNow is the same as last message", () => {
      const sameCode = "same code";
      const params = {
        content: "test prompt",
        messages: [{ id: "1", role: "user" as Role, content: sameCode }],
        codeNow: sameCode,
        codeSpace: "test.ts",
      };

      const result = service.prepareClaudeContent(params);

      expect(reminder).toHaveBeenCalledWith({ userPrompt: "test prompt" });
      expect(anthropicSystem).not.toHaveBeenCalled();
      expect(result).toBe("[Reminder] test prompt");
    });

    it("should return anthropic system content for new code", () => {
      const params = {
        content: "test prompt",
        messages: [],
        codeNow: "new code",
        codeSpace: "test.ts",
      };

      const result = service.prepareClaudeContent(params);

      expect(anthropicSystem).toHaveBeenCalledWith({
        fileName: "test.ts",
        fileContent: "new code",
        userPrompt: "test prompt",
      });
      expect(reminder).not.toHaveBeenCalled();
      expect(result).toBe("[System] test prompt - new code - test.ts");
    });

    it("should return original content for error messages", () => {
      const errorContent = "I'm sorry, I might have made a mistake.";
      const params = {
        content: errorContent,
        messages: [],
        codeNow: "test code",
        codeSpace: "test.ts",
      };

      const result = service.prepareClaudeContent(params);

      expect(result).toBe(errorContent);
      expect(reminder).not.toHaveBeenCalled();
      expect(anthropicSystem).not.toHaveBeenCalled();
    });

    it("should handle empty messages array", () => {
      const params = {
        content: "test prompt",
        messages: [],
        codeNow: "test code",
        codeSpace: "test.ts",
      };

      const result = service.prepareClaudeContent(params);

      expect(anthropicSystem).toHaveBeenCalledWith({
        fileName: "test.ts",
        fileContent: "test code",
        userPrompt: "test prompt",
      });
      expect(reminder).not.toHaveBeenCalled();
      expect(result).toBe("[System] test prompt - test code - test.ts");
    });

    it("should handle empty codeNow", () => {
      const params = {
        content: "test prompt",
        messages: [],
        codeNow: "",
        codeSpace: "test.ts",
      };

      const result = service.prepareClaudeContent(params);

      expect(anthropicSystem).toHaveBeenCalledWith({
        fileName: "test.ts",
        fileContent: "",
        userPrompt: "test prompt",
      });
      expect(reminder).not.toHaveBeenCalled();
      expect(result).toBe("[System] test prompt -  - test.ts");
    });
  });

  describe("sendToAI", () => {
    it("should properly format and send messages", async () => {
      const mockStream = new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode("Test response"));
          controller.close();
        },
      });

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        body: mockStream,
      });

      const onUpdate = vi.fn();

      await service.sendToAI("gpt4o", [], onUpdate);

      expect(global.fetch).toHaveBeenCalledWith(
        mockConfig.gpt4oEndpoint,
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: expect.stringContaining('"messages"'),
        }),
      );
    });

    it("should handle API errors properly", async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const onUpdate = vi.fn();

      await expect(
        service.sendToAI("gpt4o", [], onUpdate),
      ).rejects.toThrow("HTTP error! status: 500");

      expect(mockConfig.setIsStreaming).toHaveBeenCalledWith(false);
    });
  });
});

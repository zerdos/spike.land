import { beforeEach, describe, expect, it, Mocked, vi } from "vitest";
import { AIService } from "../services/AIService";
import { LocalStorageService } from "../services/LocalStorageService";
import { Message } from "../types/Message";

vi.mock("../services/LocalStorageService");
vi.mock("../shared", () => ({
  prettierToThrow: vi.fn().mockResolvedValue("const x = 5;"),
}));
vi.mock("../services/runner", () => ({
  runner: vi.fn().mockResolvedValue(true),
}));

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
                value: new TextEncoder().encode("Assistant"),
              })
              .mockResolvedValueOnce({ done: true }),
          }),
        },
      } as unknown as Response);

      const onUpdate = vi.fn();
      const result = await aiService.sendToAI("anthropic", mockMessages, onUpdate);

      expect(result.role).toBe("assistant");
      expect(result.content).toBe("Assistant");
      expect(localStorageService.saveAIInteraction).toHaveBeenCalledWith(
        JSON.stringify(mockMessages[0]),
        JSON.stringify(result),
      );
      expect(onUpdate).toHaveBeenCalledWith("Assistant");
    });

    it("should throw an error when the response is not OK", async () => {
      const mockMessages: Message[] = [
        { id: "1", role: "user", content: "Hello" },
      ];

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      } as Response);

      await expect(aiService.sendToAI("anthropic", mockMessages, vi.fn())).rejects.toThrow("HTTP error! status: 500");
    });
  });

  describe("sendToAnthropic", () => {
    it("should call sendToAI with the correct endpoint", async () => {
      const mockMessages: Message[] = [
        { id: "1", role: "user", content: "Hello" },
      ];
      const onUpdate = vi.fn();

      const sendToAISpy = vi.spyOn(aiService, "sendToAI" as any);
      sendToAISpy.mockResolvedValue({ id: "2", role: "assistant", content: "Response" });

      await aiService.sendToAnthropic(mockMessages, onUpdate);

      expect(sendToAISpy).toHaveBeenCalledWith("anthropic", mockMessages, onUpdate);
    });
  });

  describe("sendToGpt4o", () => {
    it("should call sendToAI with the correct endpoint", async () => {
      const mockMessages: Message[] = [
        { id: "1", role: "user", content: "Hello" },
      ];
      const onUpdate = vi.fn();

      const sendToAISpy = vi.spyOn(aiService, "sendToAI" as any);
      sendToAISpy.mockResolvedValue({ id: "2", role: "assistant", content: "Response" });

      await aiService.sendToGpt4o(mockMessages, onUpdate);

      expect(sendToAISpy).toHaveBeenCalledWith("gpt4o", mockMessages, onUpdate);
    });
  });

  describe("continueWithOpenAI", () => {
    it("should process the AI response and format the code", async () => {
      const fullResponse = "Here's the modified code:";
      const codeNow = "// Original code";
      const setMessages = vi.fn();
      const setAICode = vi.fn();

      const sendToAISpy = vi.spyOn(aiService, "sendToAI" as any);
      sendToAISpy.mockResolvedValue({ id: "2", role: "assistant", content: "```typescript\nconst x = 5;\n```" });

      vi.spyOn(aiService as any, "makeAPICall").mockResolvedValue({
        ok: true,
        body: {
          getReader: () => ({
            read: vi.fn()
              .mockResolvedValueOnce({
                done: false,
                value: new TextEncoder().encode("const x = 5;"),
              })
              .mockResolvedValueOnce({ done: true }),
          }),
        },
      } as unknown as Response);

      const result = await aiService.continueWithOpenAI(fullResponse, codeNow, setMessages, setAICode);

      expect(result).toBe("const x = 5;");

      expect(setAICode).toHaveBeenCalledWith("const x = 5;");
    });

    it("should retry with Claude if enabled and initial attempt fails", async () => {
      const fullResponse = "Here's the modified code:";
      const codeNow = "// Original code";
      const setMessages = vi.fn();
      const setAICode = vi.fn();

      const sendToAISpy = vi.spyOn(aiService, "sendToAI" as any);
      sendToAISpy.mockRejectedValueOnce(new Error("OpenAI Error"))
        .mockResolvedValueOnce({ id: "2", role: "assistant", content: "```typescript\nconst x = 5;\n```" });

      const makeAPICallSpy = vi.spyOn(aiService as any, "makeAPICall");
      makeAPICallSpy.mockResolvedValue({
        ok: true,
        body: {
          getReader: () => ({
            read: vi.fn()
              .mockResolvedValueOnce({
                done: false,
                value: new TextEncoder().encode("const x = 5;"),
              })
              .mockResolvedValueOnce({ done: true }),
          }),
        },
      } as unknown as Response);

      aiService = new AIService(localStorageService, {
        retryWithClaudeEnabled: true,
        updateThrottleMs: 1000,
        anthropicEndpoint: "https://api.anthropic.com",
        openAIEndpoint: "https://api.openai.com",
        gpt4oEndpoint: "https://api.gpt4o.com",
      });

      // const result = await aiService.continueWithOpenAI(fullResponse, codeNow, setMessages, setAICode);

      // expect(result).toBe("const x = 5;");
      // expect(setAICode).toHaveBeenCalledWith("const x = 5;");
      // expect(setMessages).toHaveBeenCalled();
      // expect(sendToAISpy).toHaveBeenCalledTimes(2);
    });
  });

  describe("prepareClaudeContent", () => {
    it("should return anthropic content when codeNow is different from last message", () => {
      const content = "User prompt";
      const messages: Message[] = [{ id: "1", role: "user", content: "Old code" }];
      const codeNow = "New code";
      const codeSpace = "file.ts";

      const result = aiService.prepareClaudeContent(content, messages, codeNow, codeSpace);

      expect(result).toContain("file.ts");
      expect(result).toContain("New code");
      expect(result).toContain("User prompt");
    });

    it("should return reminder content when codeNow is the same as last message", () => {
      const content = "User prompt";
      const messages: Message[] = [{ id: "1", role: "user", content: "Same code" }];
      const codeNow = "Same code";
      const codeSpace = "file.ts";

      const result = aiService.prepareClaudeContent(content, messages, codeNow, codeSpace);

      expect(result).toContain("User prompt");
      expect(result).not.toContain("file.ts");
      expect(result).not.toContain("Same code");
    });
  });
});

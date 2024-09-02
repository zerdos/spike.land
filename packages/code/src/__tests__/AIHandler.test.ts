import { cSessMock } from "@src/config/cSessMock";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { AIHandler } from "../AIHandler";
import { AIService } from "../services/AIService";
import { Message } from "../types/Message";

vi.mock("../services/AIService");

describe("AIHandler", () => {
  let aiHandler: AIHandler;
  let mockAIService: AIService;
  const testCodeSpace = "test-code-space";

  beforeEach(() => {
    mockAIService = new AIService({
      anthropicEndpoint: "https://api.anthropic.com",
      openAIEndpoint: "https://api.openai.com",
      gpt4oEndpoint: "https://api.gpt4o.com",
      retryWithClaudeEnabled: false,
      updateThrottleMs: 1000,
      setIsStreaming: vi.fn(),
    }, cSessMock);
    vi.mocked(mockAIService);
    aiHandler = new AIHandler(cSessMock, mockAIService);
  });

  test("sendToAnthropic calls AIService.sendToAnthropic", async () => {
    const messages: Message[] = [{ id: "1", role: "user", content: "Hello" }];
    const expectedResponse: Message = {
      id: "2",
      role: "assistant",
      content: "Hi there!",
    };

    vi.mocked(mockAIService.sendToAnthropic).mockResolvedValue(expectedResponse);
    const updates = vi.fn();
    const result = await aiHandler.sendToAnthropic(messages, updates);

    expect(mockAIService.sendToAnthropic).toHaveBeenCalledWith(
      messages,
      updates,
    );
    expect(result).toEqual(expectedResponse);
  });

  test("sendToGpt4o calls AIService.sendToGpt4o", async () => {
    const messages: Message[] = [{ id: "1", role: "user", content: "Hello" }];
    const expectedResponse: Message = {
      id: "2",
      role: "assistant",
      content: "Hi there!",
    };

    vi.mocked(mockAIService.sendToGpt4o).mockResolvedValue(expectedResponse);
    const updates = vi.fn();
    const result = await aiHandler.sendToGpt4o(messages, updates);

    expect(mockAIService.sendToGpt4o).toHaveBeenCalledWith(
      messages,
      updates,
    );
    expect(result).toEqual(expectedResponse);
  });

  test("continueWithOpenAI calls AIService.continueWithOpenAI", async () => {
    const fullResponse = "Full response";
    const currentCode = "Current code";
    const setMessages = vi.fn();
    const setAICode = vi.fn();

    vi.mocked(mockAIService.continueWithOpenAI).mockResolvedValue("Updated code");

    const result = await aiHandler.continueWithOpenAI(
      fullResponse,
      currentCode,
      setMessages,
      setAICode,
      false,
    );

    expect(mockAIService.continueWithOpenAI).toHaveBeenCalledWith(
      fullResponse,
      currentCode,
      setMessages,
      setAICode,
      false,
    );
    expect(result).toBe("Updated code");
  });

  test("continueWithOpenAI calls AIService.continueWithOpenAI with forceClaude set to true", async () => {
    const fullResponse = "Full response";
    const currentCode = "Current code";
    const setMessages = vi.fn();
    const setAICode = vi.fn();

    vi.mocked(mockAIService.continueWithOpenAI).mockResolvedValue("Updated code with Claude");

    const result = await aiHandler.continueWithOpenAI(
      fullResponse,
      currentCode,
      setMessages,
      setAICode,
      true,
    );

    expect(mockAIService.continueWithOpenAI).toHaveBeenCalledWith(
      fullResponse,
      currentCode,
      setMessages,
      setAICode,
      true,
    );
    expect(result).toBe("Updated code with Claude");
  });

  test("prepareClaudeContent calls AIService.prepareClaudeContent", () => {
    const content = "Content";
    const messages: Message[] = [{ id: "1", role: "user", content: "Hello" }];
    const currentCode = "Current code";

    const preparedContent = "Prepared content";
    vi.mocked(mockAIService.prepareClaudeContent).mockReturnValue(preparedContent);

    const result = aiHandler.prepareClaudeContent(
      content,
      messages,
      currentCode,
      testCodeSpace,
    );

    expect(mockAIService.prepareClaudeContent).toHaveBeenCalledWith(
      content,
      messages,
      currentCode,
      testCodeSpace,
    );
    expect(result).toBe(preparedContent);
  });
});

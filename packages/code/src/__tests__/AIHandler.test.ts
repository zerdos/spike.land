import type { Message } from "@/lib/interfaces";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { AIHandler } from "@/lib/ai-handler";
import { AIService } from "@/lib/ai-service";

vi.mock("@/lib/ai-service");

describe.skip("AIHandler", () => {
  let aiHandler: AIHandler;
  let mockAIService: AIService;
  const testCodeSpace = "test-code-space";

  beforeEach(() => {
    mockAIService = new AIService(
      {
        anthropicEndpoint: "https://api.anthropic.com",
        openAIEndpoint: "https://api.openai.com",
        gpt4oEndpoint: "https://api.gpt4o.com",
        retryWithClaudeEnabled: false,
        updateThrottleMs: 1000,
        setIsStreaming: vi.fn(),
      },
    );
    vi.mocked(mockAIService);
    aiHandler = new AIHandler(vi.fn());
  });

  test("sendToAnthropic calls AIService.sendToAnthropic", async () => {
    const messages: Message[] = [{ id: "1", role: "user", content: "Hello" }];
    const expectedResponse: Message = {
      id: "2",
      role: "assistant",
      content: "Hi there!",
    };

    vi.mocked(mockAIService.sendToAnthropic).mockResolvedValue(
      expectedResponse,
    );
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

  test("prepareClaudeContent calls AIService.prepareClaudeContent", () => {
    const content = "Content";
    const messages: Message[] = [{ id: "1", role: "user", content: "Hello" }];
    const currentCode = "Current code";

    const preparedContent = "Prepared content";
    vi.mocked(mockAIService.prepareClaudeContent).mockReturnValue(
      preparedContent,
    );

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

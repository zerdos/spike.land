import AIHandler from "../AIHandler";
import { AIService } from "../services/AIService";
import { LocalStorageService } from "../services/LocalStorageService";
import { Message } from "../types/Message";

jest.mock("../services/AIService");
jest.mock("../services/LocalStorageService");

describe("AIHandler", () => {
  let aiHandler: AIHandler;
  let mockAIService: jest.Mocked<AIService>;
  const testCodeSpace = "test-code-space";

  beforeEach(() => {
    mockAIService = new AIService(new LocalStorageService(testCodeSpace)) as jest.Mocked<AIService>;
    aiHandler = new AIHandler(testCodeSpace, mockAIService);
  });

  test("sendToAnthropic calls AIService.sendToAnthropic", async () => {
    const messages: Message[] = [{ id: "1", role: "user", content: "Hello" }];
    const expectedResponse: Message = { id: "2", role: "assistant", content: "Hi there!" };

    mockAIService.sendToAnthropic.mockResolvedValue(expectedResponse);

    const result = await aiHandler.sendToAnthropic(messages);

    expect(mockAIService.sendToAnthropic).toHaveBeenCalledWith(messages);
    expect(result).toEqual(expectedResponse);
  });

  test("continueWithOpenAI calls AIService.continueWithOpenAI", async () => {
    const fullResponse = "Full response";
    const currentCode = "Current code";
    const nextCounter = 1;
    const onCodeUpdate = jest.fn();
    const setMessages = jest.fn();
    const setAICode = jest.fn();

    mockAIService.continueWithOpenAI.mockResolvedValue("Updated code");

    const result = await aiHandler.continueWithOpenAI(
      fullResponse,
      currentCode,
      nextCounter,
      onCodeUpdate,
      setMessages,
      setAICode,
      false,
    );

    expect(mockAIService.continueWithOpenAI).toHaveBeenCalledWith(
      fullResponse,
      currentCode,
      nextCounter,
      onCodeUpdate,
      setMessages,
      setAICode,
      false,
    );
    expect(result).toBe("Updated code");
  });

  test("prepareClaudeContent calls AIService.prepareClaudeContent", () => {
    const content = "Content";
    const messages: Message[] = [{ id: "1", role: "user", content: "Hello" }];
    const currentCode = "Current code";

    const preparedContent = "Prepared content";
    mockAIService.prepareClaudeContent.mockReturnValue(preparedContent);

    const result = aiHandler.prepareClaudeContent(content, messages, currentCode);

    expect(mockAIService.prepareClaudeContent).toHaveBeenCalledWith(content, messages, currentCode, testCodeSpace);
    expect(result).toBe(preparedContent);
  });
});
import AIHandler from "../AIHandler";
import { AIService } from "../services/AIService";
import { LocalStorageService } from "../services/LocalStorageService";
import { Message } from "../types/Message";

jest.mock("../services/AIService");
jest.mock("../services/LocalStorageService");

describe("AIHandler", () => {
  let aiHandler: AIHandler;
  let mockAIService: jest.Mocked<AIService>;
  const testCodeSpace = "test-code-space";

  beforeEach(() => {
    mockAIService = new AIService(new LocalStorageService(testCodeSpace)) as jest.Mocked<AIService>;
    aiHandler = new AIHandler(testCodeSpace, mockAIService);
  });

  test("sendToAnthropic calls AIService.sendToAnthropic", async () => {
    const messages: Message[] = [{ id: "1", role: "user", content: "Hello" }];
    const expectedResponse: Message = { id: "2", role: "assistant", content: "Hi there!" };

    mockAIService.sendToAnthropic.mockResolvedValue(expectedResponse);

    const result = await aiHandler.sendToAnthropic(messages);

    expect(mockAIService.sendToAnthropic).toHaveBeenCalledWith(messages);
    expect(result).toEqual(expectedResponse);
  });

  test("continueWithOpenAI calls AIService.continueWithOpenAI", async () => {
    const fullResponse = "Full response";
    const currentCode = "Current code";
    const nextCounter = 1;
    const onCodeUpdate = jest.fn();
    const setMessages = jest.fn();
    const setAICode = jest.fn();

    mockAIService.continueWithOpenAI.mockResolvedValue("Updated code");

    const result = await aiHandler.continueWithOpenAI(
      fullResponse,
      currentCode,
      nextCounter,
      onCodeUpdate,
      setMessages,
      setAICode,
      false,
    );

    expect(mockAIService.continueWithOpenAI).toHaveBeenCalledWith(
      fullResponse,
      currentCode,
      nextCounter,
      onCodeUpdate,
      setMessages,
      setAICode,
      false,
    );
    expect(result).toBe("Updated code");
  });

  test("prepareClaudeContent calls AIService.prepareClaudeContent", () => {
    const content = "Content";
    const messages: Message[] = [{ id: "1", role: "user", content: "Hello" }];
    const currentCode = "Current code";

    const preparedContent = "Prepared content";
    mockAIService.prepareClaudeContent.mockReturnValue(preparedContent);

    const result = aiHandler.prepareClaudeContent(content, messages, currentCode);

    expect(mockAIService.prepareClaudeContent).toHaveBeenCalledWith(content, messages, currentCode, testCodeSpace);
    expect(result).toBe(preparedContent);
  });
});

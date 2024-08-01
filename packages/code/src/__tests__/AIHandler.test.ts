import AIHandler from "../AIHandler";
import { AIService } from "../services/AIService";
import { Message } from "../types/Message";

jest.mock("../services/AIService");

describe("AIHandler", () => {
  let aiHandler: AIHandler;
  let mockAIService: jest.Mocked<AIService>;
  const testCodeSpace = "test-code-space";

  beforeEach(() => {
    mockAIService = new AIService(testCodeSpace) as jest.Mocked<AIService>;
    aiHandler = new AIHandler(testCodeSpace, mockAIService);
  });

  test("sendMessage should call AIService.sendMessage", async () => {
    const messages: Message[] = [{ id: "1", role: "user", content: "Hello" }];
    const expectedResponse: Message = { id: "2", role: "assistant", content: "Hi there!" };

    mockAIService.sendMessage.mockResolvedValue(expectedResponse);

    const result = await aiHandler.sendMessage(messages);

    expect(mockAIService.sendMessage).toHaveBeenCalledWith(messages);
    expect(result).toEqual(expectedResponse);
  });

  test("continueConversation should call AIService.continueConversation", async () => {
    const fullResponse = "Continue the conversation";
    const currentCode = "console.log('Hello')";
    const onCodeUpdate = jest.fn();
    const setMessages = jest.fn();
    const setAICode = jest.fn();

    mockAIService.continueConversation.mockResolvedValue("Updated code");

    const result = await aiHandler.continueConversation(
      fullResponse,
      currentCode,
      onCodeUpdate,
      setMessages,
      setAICode,
    );

    expect(mockAIService.continueConversation).toHaveBeenCalledWith(
      fullResponse,
      currentCode,
      onCodeUpdate,
      setMessages,
      setAICode,
    );
    expect(result).toBe("Updated code");
  });

  test("prepareContent should call AIService.prepareContent", () => {
    const content = "Prepare this content";
    const messages: Message[] = [];
    const currentCode = "console.log('Hello')";
    const preparedContent = "Prepared content";

    mockAIService.prepareContent.mockReturnValue(preparedContent);

    const result = aiHandler.prepareContent(content, messages, currentCode);

    expect(mockAIService.prepareContent).toHaveBeenCalledWith(content, messages, currentCode, testCodeSpace);
    expect(result).toBe(preparedContent);
  });
});

describe("AIHandler with default AIService", () => {
  let aiHandler: AIHandler;
  let mockAIService: jest.Mocked<AIService>;
  const testCodeSpace = "test-code-space";

  beforeEach(() => {
    mockAIService = new AIService(testCodeSpace) as jest.Mocked<AIService>;
    (AIService as jest.MockedClass<typeof AIService>).mockImplementation(() => mockAIService);
    aiHandler = new AIHandler(testCodeSpace);
  });

  test("sendMessage should call AIService.sendMessage", async () => {
    const messages: Message[] = [{ id: "1", role: "user", content: "Hello" }];
    const expectedResponse: Message = { id: "2", role: "assistant", content: "Hi there!" };

    mockAIService.sendMessage.mockResolvedValue(expectedResponse);

    const result = await aiHandler.sendMessage(messages);

    expect(mockAIService.sendMessage).toHaveBeenCalledWith(messages);
    expect(result).toEqual(expectedResponse);
  });

  test("continueConversation should call AIService.continueConversation", async () => {
    const fullResponse = "Continue the conversation";
    const currentCode = "console.log('Hello')";
    const onCodeUpdate = jest.fn();
    const setMessages = jest.fn();
    const setAICode = jest.fn();

    mockAIService.continueConversation.mockResolvedValue("Updated code");

    const result = await aiHandler.continueConversation(
      fullResponse,
      currentCode,
      onCodeUpdate,
      setMessages,
      setAICode,
    );

    expect(mockAIService.continueConversation).toHaveBeenCalledWith(
      fullResponse,
      currentCode,
      onCodeUpdate,
      setMessages,
      setAICode,
    );
    expect(result).toBe("Updated code");
  });

  test("prepareContent should call AIService.prepareContent", () => {
    const content = "Prepare this content";
    const messages: Message[] = [];
    const currentCode = "console.log('Hello')";
    const preparedContent = "Prepared content";

    mockAIService.prepareContent.mockReturnValue(preparedContent);

    const result = aiHandler.prepareContent(content, messages, currentCode);

    expect(mockAIService.prepareContent).toHaveBeenCalledWith(content, messages, currentCode, testCodeSpace);
    expect(result).toBe(preparedContent);
  });
});

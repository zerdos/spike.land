import { AIService } from "../services/AIService";
import { LocalStorageService } from "../services/LocalStorageService";
import { Message } from "../types/Message";

// Mock the entire LocalStorageService module
jest.mock("../services/LocalStorageService");

describe("AIService", () => {
  let aiService: AIService;
  let localStorageService: jest.Mocked<LocalStorageService>;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Create a mocked instance of LocalStorageService
    localStorageService = {
      loadMessages: jest.fn().mockReturnValue([]),
      saveAIInteraction: jest.fn(),
    } as unknown as jest.Mocked<LocalStorageService>;

    aiService = new AIService(localStorageService);
  });

  describe("sendToAnthropic", () => {
    it("should send messages to Anthropic and return an assistant message", async () => {
      const mockMessages: Message[] = [
        { id: "1", role: "user", content: "Hello" },
      ];

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        body: {
          getReader: () => ({
            read: jest.fn()
              .mockResolvedValueOnce({ done: false, value: new TextEncoder().encode("Assistant") })
              .mockResolvedValueOnce({ done: true }),
          }),
        },
      } as unknown as Response);

      const result = await aiService.sendToAnthropic(mockMessages);

      expect(result.role).toBe("assistant");
      expect(result.content).toBe("Assistant");
      expect(localStorageService.saveAIInteraction).toHaveBeenCalledWith("Hello", "Assistant");
    });

    it("should throw an error when the response is not OK", async () => {
      const mockMessages: Message[] = [
        { id: "1", role: "user", content: "Hello" },
      ];

      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 500,
      } as Response);

      await expect(aiService.sendToAnthropic(mockMessages)).rejects.toThrow("HTTP error! status: 500");
    });
  });

  // Add more tests for other methods in AIService
});
import { AIService } from "../services/AIService";
import { LocalStorageService } from "../services/LocalStorageService";
import { Message } from "../types/Message";

// Mock the LocalStorageService
jest.mock("../services/LocalStorageService");

describe("AIService", () => {
  let aiService: AIService;
  let localStorageService: jest.Mocked<LocalStorageService>;

  beforeEach(() => {
    localStorageService = new LocalStorageService("testCodeSpace") as jest.Mocked<LocalStorageService>;
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
      } as any);

      const result = await aiService.sendToAnthropic(mockMessages);

      expect(result.role).toBe("assistant");
      expect(result.content).toBe("Assistant");
      expect(localStorageService.saveAIInteraction).toHaveBeenCalled();
    });
  });

  // Add more tests for other methods in AIService
});

import { ImageData, Message } from "@/lib/interfaces";
import { AIHandler } from "@src/AIHandler";
import { ICode } from "@src/cSess.interface";
import { Mutex } from "async-mutex";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createNewMessage, handleError, processMessage } from "./messageProcessing";

vi.mock("@src/AIHandler");
vi.mock("@src/config/aiConfig", () => ({
  claudeRevery: vi.fn((code) => `Revery: ${code}`),
}));

describe("messageProcessing", () => {
  describe("createNewMessage", () => {
    it("should create a new message with multiple images", async () => {
      const images: ImageData[] = [
        { url: "url1" },
        { url: "url2" },
      ];
      const content = "Test message";

      const result = await createNewMessage(images, content);

      expect(result).toEqual({
        id: expect.any(String),
        role: "user",
        content: [
          { type: "image_url", image_url: { url: "url1" } },
          { type: "image_url", image_url: { url: "url2" } },
          { type: "text", text: "Test message" },
        ],
      });
    });

    it("should create a new message without images", async () => {
      const content = "Test message";

      const result = await createNewMessage([], content);

      expect(result).toEqual({
        id: expect.any(String),
        role: "user",
        content: "Test message",
      });
    });
  });

  describe("processMessage", () => {
    let mockAIHandler: AIHandler;
    let mockCSess: ICode;
    let mockSetMessages: vi.Mock;
    let mockSaveMessages: vi.Mock;
    let mockMutex: Mutex;

    beforeEach(() => {
      mockAIHandler = {
        sendToAnthropic: vi.fn(),
        sendToGpt4o: vi.fn(),
      } as unknown as AIHandler;

      mockCSess = {
        setCode: vi.fn().mockResolvedValue(true),
      } as unknown as ICode;

      mockSetMessages = vi.fn();
      mockSaveMessages = vi.fn();
      mockMutex = new Mutex();
    });

    it("should process a message successfully", async () => {
      const mockAssistantMessage: Message = {
        id: "assistant-message-id",
        role: "assistant",
        content: "Assistant response",
      };

      vi.mocked(mockAIHandler.sendToAnthropic).mockResolvedValue(mockAssistantMessage);

      const result = await processMessage(
        mockAIHandler,
        mockCSess,
        [],
        "initial code",
        mockSetMessages,
        mockSaveMessages,
        mockMutex,
      );

      expect(result).toBe(true);
      expect(mockAIHandler.sendToAnthropic).toHaveBeenCalled();
      expect(mockSaveMessages).toHaveBeenCalledWith([mockAssistantMessage]);
      expect(mockCSess.setCode).not.toHaveBeenCalled();
    });

    it("should handle errors", async () => {
      vi.mocked(mockAIHandler.sendToAnthropic).mockRejectedValue(new Error("Test error"));

      const result = await processMessage(
        mockAIHandler,
        mockCSess,
        [],
        "initial code",
        mockSetMessages,
        mockSaveMessages,
        mockMutex,
      );

      expect(result).toBe(false);
      expect(mockAIHandler.sendToAnthropic).toHaveBeenCalled();
      expect(mockCSess.setCode).not.toHaveBeenCalled();
    });
  });

  describe("handleError", () => {
    it("should add an error message", () => {
      const messages: Message[] = [];
      const setMessages = vi.fn();

      handleError(messages, setMessages);

      expect(setMessages).toHaveBeenCalledWith([
        {
          id: expect.any(String),
          role: "assistant",
          content: "Sorry, there was an error processing your request. Please try again or rephrase your input.",
        },
      ]);
    });
  });
});

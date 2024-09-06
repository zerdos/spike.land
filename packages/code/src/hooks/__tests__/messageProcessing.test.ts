import { ImageData } from "@/lib/interfaces";
import { AIHandler } from "@src/AIHandler";
import { ICode } from "@src/cSess.interface";
import { Mutex } from "async-mutex";
import { describe, expect, it, vi } from "vitest";
import { createNewMessage, handleError, processMessage } from "../messageProcessing";

vi.mock("@src/AIHandler");
vi.mock("@src/config/aiConfig", () => ({
  claudeRevery: vi.fn((code) => `Revery: ${code}`),
}));

describe("messageProcessing", () => {
  describe("createNewMessage", () => {
    it("should create a new message with multiple images", async () => {
      const images: ImageData[] = [
        {
          imageName: "image1.jpg",
          url: "url1",
          src: "src1",
          mediaType: "image/jpeg",
          data: "data:image/jpeg;base64,image1data",
          type: "image/jpeg",
        },
        {
          imageName: "image2.png",
          url: "url2",
          src: "src2",
          mediaType: "image/png",
          data: "data:image/png;base64,image2data",
          type: "image/png",
        },
      ];
      const content = "Test message";

      const result = await createNewMessage(images, content);

      expect(result).toEqual({
        id: expect.any(String),
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: "image/jpeg",
              data: "image1data",
            },
          },
          {
            type: "image",
            source: {
              type: "base64",
              media_type: "image/png",
              data: "image2data",
            },
          },
          { type: "text", text: "Test message" },
        ],
      });
    });
  });

  describe("processMessage", () => {
    const mockAIHandler = {
      sendToAnthropic: vi.fn(),
      sendToGpt4o: vi.fn(),
    } as unknown as AIHandler;

    const mockCSess: ICode = {
      setCode: vi.fn().mockResolvedValue(true),
    } as any;

    const mockSetMessages = vi.fn();
    const mockSaveMessages = vi.fn();
    const mockMutex = new Mutex();

    it("should process a message successfully", async () => {
      vi.mocked(mockAIHandler.sendToAnthropic).mockResolvedValue({
        id: "assistant-message-id",
        role: "assistant",
        content: "Assistant response",
      });

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
      expect(mockSaveMessages).toHaveBeenCalled();
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
      expect(mockSaveMessages).not.toHaveBeenCalled();
      expect(mockSetMessages).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({
          role: "assistant",
          content: expect.stringContaining("Sorry, there was an error processing your request"),
        }),
      ]));
      expect(mockCSess.setCode).not.toHaveBeenCalled();
    });
  });

  describe("handleError", () => {
    it("should add an error message", () => {
      const messages: any[] = [];
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

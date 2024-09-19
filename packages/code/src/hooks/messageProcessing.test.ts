import { createContextManager } from "@/lib/context-manager";
import { ImageData } from "@/lib/interfaces";
import { ICode } from "@/lib/interfaces";
import * as sharedModule from "@/lib/shared";
import { AIHandler } from "@src/AIHandler";
import { Mutex } from "async-mutex";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { createNewMessage, processMessage } from "./messageProcessing";

vi.mock("@src/AIHandler");
vi.mock("@src/config/aiConfig", () => ({
  claudeRecovery: vi.fn((code) => `Recovery: ${code}`),
}));
vi.mock("@/lib/context-manager");
vi.mock("@/lib/shared");

describe("messageProcessing", () => {
  describe("createNewMessage", () => {
    it("should create a new message with multiple images", async () => {
      const images: ImageData[] = [
        { imageName: "image1", src: "url1", mediaType: "image/jpeg", data: "base64data1", type: "image", url: "url1" },
        { imageName: "image2", src: "url2", mediaType: "image/jpeg", data: "base64data2", type: "image", url: "url2" },
      ];
      const claudeContent = "Test message";

      const result = await createNewMessage(images, claudeContent);

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
      const claudeContent = "Test message";

      const result = await createNewMessage([], claudeContent);

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
    let mockSetMessages: ReturnType<typeof vi.fn>;
    let mockSaveMessages: ReturnType<typeof vi.fn>;
    let mockMutex: Mutex;
    let mockContextManager: ReturnType<typeof createContextManager>;

    beforeEach(() => {
      mockAIHandler = {
        sendToAnthropic: vi.fn().mockResolvedValue({
          id: "assistant-1",
          role: "assistant",
          content: "Assistant response",
        }),
        sendToGpt4o: vi.fn(),
      } as unknown as AIHandler;

      mockCSess = {
        setCode: vi.fn().mockResolvedValue(true),
        session: { code: "initial code" },
      } as unknown as ICode;

      mockSetMessages = vi.fn();
      mockSaveMessages = vi.fn();
      mockMutex = new Mutex();
      mockContextManager = {
        updateContext: vi.fn(),
        getContext: vi.fn().mockReturnValue(""),
      } as unknown as ReturnType<typeof createContextManager>;

      (createContextManager as Mock).mockReturnValue(mockContextManager);

      vi.spyOn(sharedModule, "updateSearchReplace").mockImplementation((content) => Promise.resolve(content));
    });

    it("should process message successfully", async () => {
      const result = await processMessage(
        mockAIHandler,
        mockCSess,
        "Test message",
        [],
        mockSetMessages,
        mockSaveMessages,
        mockMutex,
        "test-code-space",
      );

      expect(result).toBe(true);
      expect(mockAIHandler.sendToAnthropic).toHaveBeenCalled();
      expect(mockCSess.setCode).toHaveBeenCalledWith("Assistant response");
      expect(mockSaveMessages).toHaveBeenCalled();
    });

    it("should handle errors and retry", async () => {
      mockCSess.setCode = vi.fn()
        .mockRejectedValueOnce(new Error("First attempt failed"))
        .mockResolvedValueOnce(true);

      mockContextManager.getContext = vi.fn().mockReturnValue("Error log");

      mockAIHandler.sendToAnthropic = vi.fn()
        .mockResolvedValueOnce({
          id: "assistant-1",
          role: "assistant",
          content: "First response",
        })
        .mockResolvedValueOnce({
          id: "assistant-2",
          role: "assistant",
          content: "Second response",
        });

      vi.spyOn(sharedModule, "updateSearchReplace")
        .mockResolvedValueOnce("First modified code")
        .mockResolvedValueOnce("Second modified code");

      const result = await processMessage(
        mockAIHandler,
        mockCSess,
        "Initial code",
        [],
        mockSetMessages,
        mockSaveMessages,
        mockMutex,
        "test-code-space",
      );

      expect(result).toBe(true);
      expect(mockAIHandler.sendToAnthropic).toHaveBeenCalledTimes(2);
      expect(mockCSess.setCode).toHaveBeenCalledTimes(2);
      expect(mockCSess.setCode).toHaveBeenNthCalledWith(1, "First modified code");
      expect(mockCSess.setCode).toHaveBeenNthCalledWith(2, "Second modified code");
      expect(mockSaveMessages).toHaveBeenCalledTimes(2);
      expect(mockContextManager.getContext).toHaveBeenCalledWith("errorLog");
    });

    it("should fall back to GPT-4 if Anthropic fails", async () => {
      mockAIHandler.sendToAnthropic = vi.fn().mockResolvedValue({
        id: "assistant-1",
        role: "assistant",
        content: "An error occurred while processing",
      });

      mockAIHandler.sendToGpt4o = vi.fn().mockResolvedValue({
        id: "gpt4-1",
        role: "assistant",
        content: "GPT-4 response",
      });

      const result = await processMessage(
        mockAIHandler,
        mockCSess,
        "Test message",
        [],
        mockSetMessages,
        mockSaveMessages,
        mockMutex,
        "test-code-space",
      );

      expect(result).toBe(true);
      expect(mockAIHandler.sendToAnthropic).toHaveBeenCalled();
      expect(mockAIHandler.sendToGpt4o).toHaveBeenCalled();
      expect(mockCSess.setCode).toHaveBeenCalledWith("GPT-4 response");
      expect(mockSaveMessages).toHaveBeenCalled();
    });
  });
});

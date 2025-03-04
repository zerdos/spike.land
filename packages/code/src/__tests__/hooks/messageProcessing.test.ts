import type { ImageData } from "@/lib/interfaces";
import { describe, expect, it, vi } from "vitest";
import { createNewMessage } from "../../workflows/message-handlers";

vi.mock("@/lib/ai-handler");
vi.mock("@/lib/ai-config", () => ({
  claudeRecovery: vi.fn((code) => `Recovery: ${code}`),
}));
vi.mock("@/lib/context-manager");
vi.mock("@/../lib/shared");

describe("messageProcessing", () => {
  describe("createNewMessage", () => {
    it("should create a new message with multiple images", async () => {
      const images: ImageData[] = [
        {
          imageName: "image1",
          src: "url1",
          mediaType: "image/jpeg",
          data: "base64data1",
          type: "image",
          url: "url1",
        },
        {
          imageName: "image2",
          src: "url2",
          mediaType: "image/jpeg",
          data: "base64data2",
          type: "image",
          url: "url2",
        },
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
});

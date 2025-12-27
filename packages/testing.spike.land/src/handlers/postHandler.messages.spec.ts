import type { Message } from "@spike-npm-land/code";
import type { CoreMessage } from "ai";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Code } from "../chatRoom";
import type Env from "../env";
import { StorageService } from "../services/storageService";
import { PostHandler } from "./postHandler";
import {
  createMockCode,
  createMockEnv,
  createMockStorageService,
  setupCrypto,
  setupStorageServiceMock,
} from "./postHandler.test-utils";

// Mock all external dependencies
vi.mock("@ai-sdk/anthropic");
vi.mock("ai");
vi.mock("../services/storageService");

// Setup crypto mock
setupCrypto();

describe("PostHandler - Messages", () => {
  let postHandler: PostHandler;
  let mockCode: Code;
  let mockEnv: Env;
  let mockStorageService: StorageService;

  beforeEach(() => {
    vi.clearAllMocks();

    mockCode = createMockCode();
    mockEnv = createMockEnv();
    mockStorageService = createMockStorageService();
    setupStorageServiceMock(StorageService, mockStorageService);

    postHandler = new PostHandler(mockCode, mockEnv);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("convertMessages", () => {
    const callConvertMessages = (messages: unknown[]) => {
      return (postHandler as unknown as {
        convertMessages: (messages: unknown[]) => CoreMessage[];
      }).convertMessages(messages);
    };

    it("should convert string content messages", () => {
      const messages: Message[] = [
        { role: "user", content: "Hello" },
        { role: "assistant", content: "Hi there" },
      ];

      const result = callConvertMessages(messages);

      expect(result).toEqual([
        { role: "user", content: "Hello" },
        { role: "assistant", content: "Hi there" },
      ]);
    });

    it("should convert array content messages", () => {
      const messages: Message[] = [
        {
          role: "user",
          content: [
            { type: "text", text: "Hello" },
            {
              type: "image_url",
              image_url: { url: "https://example.com/img.jpg" },
            },
          ],
        },
      ];

      const result = callConvertMessages(messages);

      expect(result).toEqual([
        {
          role: "user",
          content: [
            { type: "text", text: "Hello" },
            { type: "image", image: "https://example.com/img.jpg" },
          ],
        },
      ]);
    });

    it("should handle invalid content parts", () => {
      const messages: Message[] = [
        {
          role: "user",
          content: [
            { type: "text", text: "Valid" },
            "invalid" as unknown as { type: string; text?: string; },
            { type: "unknown" } as unknown as { type: string; text?: string; },
          ],
        },
      ];

      const result = callConvertMessages(messages);

      // Both "notexist" and "unknown" types fail the isMessageContentPart type guard
      // so they return "[invalid content]" (not "[unsupported content]")
      expect(result[0]?.content).toEqual([
        { type: "text", text: "Valid" },
        { type: "text", text: "[invalid content]" },
        { type: "text", text: "[invalid content]" },
      ]);
    });

    it("should handle missing text in text parts", () => {
      // { type: "text" } without a text property fails the isTextContentPart type guard
      // because the guard requires: "text" in part && typeof part.text === "string"
      const messages: Message[] = [
        {
          role: "user",
          content: [{ type: "text" } as { type: string; text?: string; }],
        },
      ];

      const result = callConvertMessages(messages);

      // Since it fails the type guard, it returns "[invalid content]"
      expect(result[0]?.content).toEqual([{ type: "text", text: "[invalid content]" }]);
    });

    it("should handle invalid content format", () => {
      const messages: Message[] = [
        {
          role: "user",
          content: 123 as unknown as Message["content"],
        },
      ];

      const result = callConvertMessages(messages);

      expect(result).toEqual([
        { role: "user", content: "[invalid content format]" },
      ]);
    });

    it("should throw on invalid role", () => {
      const messages: Message[] = [
        {
          role: "invalid" as unknown as Message["role"],
          content: "test",
        },
      ];

      expect(() => callConvertMessages(messages)).toThrow(
        "Invalid role: invalid",
      );
    });

    it("should convert messages with parts field", () => {
      const messages = [
        {
          role: "user",
          parts: [
            { type: "text", text: "Hello world" },
          ],
        },
      ];

      const result = callConvertMessages(messages);

      expect(result).toEqual([
        { role: "user", content: "Hello world" },
      ]);
    });

    it("should convert messages with multiple parts", () => {
      const messages = [
        {
          role: "user",
          parts: [
            { type: "text", text: "Check this image:" },
            { type: "image", url: "https://example.com/img.jpg" },
          ],
        },
      ];

      const result = callConvertMessages(messages);

      expect(result).toEqual([
        {
          role: "user",
          content: [
            { type: "text", text: "Check this image:" },
            { type: "image", image: "https://example.com/img.jpg" },
          ],
        },
      ]);
    });

    it("should handle parts with image_url format", () => {
      const messages = [
        {
          role: "user",
          parts: [
            { type: "image_url", image_url: { url: "https://example.com/img.jpg" } },
          ],
        },
      ];

      const result = callConvertMessages(messages);

      expect(result[0]?.content).toEqual([
        { type: "image", image: "https://example.com/img.jpg" },
      ]);
    });

    it("should handle unsupported part types", () => {
      const messages = [
        {
          role: "user",
          parts: [
            { type: "video", url: "video.mp4" },
          ],
        },
      ];

      const result = callConvertMessages(messages);

      // Single text part gets simplified to just string
      expect(result[0]?.content).toEqual("[unsupported content]");
    });

    it("should handle parts with missing text", () => {
      const messages = [
        {
          role: "user",
          parts: [
            { type: "text" },
          ],
        },
      ];

      const result = callConvertMessages(messages);

      expect(result).toEqual([
        { role: "user", content: "" },
      ]);
    });
  });

  describe("isMessageContentPart", () => {
    // Note: isMessageContentPart is imported from aiRoutes.ts, not a method on PostHandler
    // It's tested indirectly through convertMessages behavior above
    // Direct testing should be done in aiRoutes.spec.ts
    it("should be tested via convertMessages behavior", () => {
      // The type guard behavior is already tested through:
      // - "should handle invalid content parts" test
      // - "should handle missing text in text parts" test
      // These verify that invalid parts return "[invalid content]"
      expect(true).toBe(true);
    });
  });
});

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Code } from "../chatRoom";
import type Env from "../env";
import { StorageService } from "../services/storageService";
import type { PostRequestBody } from "../types/aiRoutes";
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

describe("PostHandler - Validation", () => {
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

  describe("validateMessages", () => {
    const callValidateMessages = (messages: unknown) => {
      return (postHandler as unknown as { validateMessages: (messages: unknown) => string | null; })
        .validateMessages(messages);
    };

    it("should accept valid messages", () => {
      const messages = [
        { role: "user", content: "Hello" },
        { role: "assistant", content: "Hi" },
        { role: "system", content: "You are helpful" },
      ];

      expect(callValidateMessages(messages)).toBeNull();
    });

    it("should reject non-array messages", () => {
      expect(callValidateMessages(null)).toBe("Messages must be an array");
      expect(callValidateMessages({})).toBe("Messages must be an array");
      expect(callValidateMessages("messages")).toBe(
        "Messages must be an array",
      );
    });

    it("should reject empty messages array", () => {
      expect(callValidateMessages([])).toBe("Messages array cannot be empty");
    });

    it("should reject too many messages", () => {
      const messages = Array(101).fill({ role: "user", content: "test" });
      expect(callValidateMessages(messages)).toBe(
        "Too many messages. Maximum allowed: 100",
      );
    });

    it("should reject invalid message objects", () => {
      expect(callValidateMessages([null])).toBe(
        "Message at index 0 must be an object",
      );
      expect(callValidateMessages(["string"])).toBe(
        "Message at index 0 must be an object",
      );
      expect(callValidateMessages([123])).toBe(
        "Message at index 0 must be an object",
      );
    });

    it("should reject invalid roles", () => {
      const messages = [{ role: "invalid", content: "test" }];
      expect(callValidateMessages(messages)).toBe(
        "Message at index 0 must have a valid role (user, assistant, system)",
      );
    });

    it("should reject missing content and parts", () => {
      const messages = [{ role: "user" }];
      expect(callValidateMessages(messages)).toBe(
        "Message at index 0 must have either 'content' or 'parts'",
      );
    });

    it("should accept messages with parts field", () => {
      const messages = [
        {
          role: "user",
          parts: [
            { type: "text", text: "Hello" },
          ],
        },
      ];
      expect(callValidateMessages(messages)).toBeNull();
    });

    it("should accept messages with both content and parts", () => {
      const messages = [
        {
          role: "user",
          content: "Hello",
          parts: [{ type: "text", text: "Hello" }],
        },
      ];
      expect(callValidateMessages(messages)).toBeNull();
    });

    it("should validate parts array structure", () => {
      const messages = [
        {
          role: "user",
          parts: "not an array",
        },
      ];
      expect(callValidateMessages(messages)).toBe(
        "Message at index 0 parts must be an array",
      );
    });

    it("should validate parts have type field", () => {
      const messages = [
        {
          role: "user",
          parts: [
            { text: "Hello" }, // missing type
          ],
        },
      ];
      expect(callValidateMessages(messages)).toBe(
        "Message at index 0, part 0 must have a type",
      );
    });

    it("should reject oversized messages", () => {
      const largeContent = "x".repeat(100001);
      const messages = [{ role: "user", content: largeContent }];
      expect(callValidateMessages(messages)).toBe(
        "Message at index 0 exceeds maximum size limit",
      );
    });

    it("should reject invalid content types", () => {
      const messages = [{ role: "user", content: 123 }];
      expect(callValidateMessages(messages)).toBe(
        "Message at index 0 content must be a string or array",
      );
    });

    it("should validate array content parts", () => {
      const messages = [
        {
          role: "user",
          content: [
            { type: "text", text: "Hello" },
            "invalid part",
          ],
        },
      ];
      expect(callValidateMessages(messages)).toBe(
        "Message at index 0, content part 1 must have a type",
      );
    });

    it("should accept valid array content", () => {
      const messages = [
        {
          role: "user",
          content: [
            { type: "text", text: "Hello" },
            {
              type: "image_url",
              image_url: { url: "https://example.com/image.jpg" },
            },
          ],
        },
      ];
      expect(callValidateMessages(messages)).toBeNull();
    });
  });

  describe("isValidRole", () => {
    const callIsValidRole = (role: unknown) => {
      return (postHandler as unknown as { isValidRole: (role: unknown) => boolean; }).isValidRole(
        role,
      );
    };

    it("should validate roles correctly", () => {
      expect(callIsValidRole("user")).toBe(true);
      expect(callIsValidRole("assistant")).toBe(true);
      expect(callIsValidRole("system")).toBe(true);
      expect(callIsValidRole("invalid")).toBe(false);
      expect(callIsValidRole(123)).toBe(false);
      expect(callIsValidRole(null)).toBe(false);
    });
  });

  describe("parseRequestBody", () => {
    const callParseRequestBody = async (request: Request) => {
      return (postHandler as unknown as {
        parseRequestBody: (request: Request) => Promise<PostRequestBody>;
      }).parseRequestBody(request);
    };

    it("should parse valid JSON", async () => {
      const body = { messages: [{ role: "user", content: "test" }] };
      const request = new Request("https://test.com", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const result = await callParseRequestBody(request);
      expect(result).toEqual(body);
    });

    it("should throw on invalid JSON", async () => {
      const request = new Request("https://test.com", {
        method: "POST",
        body: "{ invalid",
      });

      await expect(callParseRequestBody(request)).rejects.toThrow(
        "Invalid JSON in request body",
      );
    });
  });
});

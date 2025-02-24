import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  broadcastTool,
  codeFormattingTool,
  codeModificationTool,
} from "../code-modification-tools";

// Mock chat-utils
vi.mock("@/lib/chat-utils", () => ({
  replaceFirstCodeMod: vi.fn((instructions: string, code: string) => {
    if (instructions.includes("const x = 5;") && code.includes("const x = 5;")) {
      return code.replace("const x = 5;", "const x = 15;");
    }
    if (instructions.includes("const y = 10;") && code.includes("const y = 10;")) {
      return code.replace("const y = 10;", "const y = 20;");
    }
    return code;
  }),
}));

describe("code-modification-tools", () => {
  describe("codeModificationTool", () => {
    beforeEach(() => {
      // Mock the global cSess object
      (globalThis as any).cSess = {
        getCode: vi.fn().mockResolvedValue("const x = 5;"),
      };
    });

    it("should handle empty instructions", async () => {
      const result = await codeModificationTool.invoke({ instructions: "" });
      expect(result.error).toContain("Instructions required");
      expect(result.code).toBe("const x = 5;");
    });

    it("should handle invalid format", async () => {
      const result = await codeModificationTool.invoke({
        instructions: "invalid format",
      });
      expect(result.error).toContain("Invalid format");
    });

    it("should successfully modify code with valid search/replace", async () => {
      const instructions = `<<<<<<< SEARCH
const x = 5;
=======
const x = 10;
>>>>>>> REPLACE`;

      const result = await codeModificationTool.invoke({ instructions });
      expect(result.error).toBe("");
      expect(result.code).toBe("const x = 15;");
    });

    it("should handle multiple search/replace blocks", async () => {
      // Mock code content
      (globalThis as any).cSess.getCode.mockResolvedValue("const x = 5;\nconst y = 10;");

      // Get mock function directly from our mock
      const { replaceFirstCodeMod } = await import("@/lib/chat-utils");

      const result = await codeModificationTool.invoke({
        instructions: `<<<<<<< SEARCH
const x = 5;
=======
const x = 15;
>>>>>>> REPLACE

<<<<<<< SEARCH
const y = 10;
=======
const y = 20;
>>>>>>> REPLACE`,
      });

      expect(replaceFirstCodeMod).toHaveBeenCalledTimes(2);
      expect(result.error).toBe("");
      expect(result.code).toBe("const x = 15;\nconst y = 20;");
    });

    it("should return error when search block not found", async () => {
      const instructions = `<<<<<<< SEARCH
const nonexistent = true;
=======
const changed = true;
>>>>>>> REPLACE`;

      const result = await codeModificationTool.invoke({ instructions });
      expect(result.error).toContain("Block 1/1 not found");
      expect(result.blockNumber).toBe(1);
      expect(result.totalBlocks).toBe(1);
    });
  });

  describe("codeFormattingTool", () => {
    beforeEach(() => {
      // Mock global formatting functions
      (globalThis as any).prettierJs = vi.fn().mockResolvedValue("formatted code");
      (globalThis as any).transpile = vi.fn().mockResolvedValue("transpiled code");
      (globalThis as any).location = { origin: "http://localhost:3000" };
    });

    it("should format and transpile code", async () => {
      const result = await codeFormattingTool.invoke({ code: "const x=5" });
      expect(result.error).toBe("");
      expect(result.code).toBe("formatted code");
      expect((globalThis as any).prettierJs).toHaveBeenCalled();
    });

    it("should handle formatting errors", async () => {
      (globalThis as any).prettierJs.mockRejectedValue(new Error("Format error"));
      const result = await codeFormattingTool.invoke({ code: "const x=5" });
      expect(result.error).toBe("Format error");
      expect(result.code).toBe("const x=5");
    });
  });

  describe("broadcastTool", () => {
    let mockPostMessage: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      mockPostMessage = vi.fn();
      const MockBroadcastChannel = function(this: any, channel: string) {
        this.channel = channel;
        this.postMessage = mockPostMessage;
      } as any;
      MockBroadcastChannel.prototype.constructor = MockBroadcastChannel;

      (global as any).BroadcastChannel = MockBroadcastChannel;
    });

    it("should create broadcast channel and handle messages", async () => {
      // Test with data
      await broadcastTool.invoke({
        channel: "test-channel",
        data: { message: "test" },
      });

      expect(mockPostMessage).toHaveBeenCalledWith({ message: "test" });

      // Test without data
      mockPostMessage.mockClear();
      await broadcastTool.invoke({ channel: "test-channel" });
      expect(mockPostMessage).not.toHaveBeenCalled();
    });
  });
});

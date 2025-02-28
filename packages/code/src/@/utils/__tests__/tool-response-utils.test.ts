import { md5 } from "@/lib/md5";
import { AgentState } from "@/types/chat-langchain";
import { AIMessage } from "@langchain/core/messages";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  extractToolResponseMetadata,
  handleMissingCodeResponse,
  updateToolCallsWithCodeFlag,
} from "../tool-response-utils";

describe("tool-response-utils", () => {
  describe("extractToolResponseMetadata", () => {
    it("should extract metadata from valid tool response", () => {
      const response = new AIMessage({
        content: "Test message",
        additional_kwargs: {
          tool_responses: [
            {
              name: "code_modification",
              content: JSON.stringify({
                documentHash: "abc123",
                modifiedCodeHash: "def456",
                code: "function test() {}",
              }),
            },
          ],
        },
      });

      const currentState: AgentState = {
        messages: [],
        code: "",
        codeSpace: "",
        lastError: "",
        isStreaming: false,
        debugLogs: [],
        documentHash: "previous-hash",
      };

      const metadata = extractToolResponseMetadata(response, currentState);

      expect(metadata).toEqual({
        documentHash: "abc123",
        modifiedCodeHash: "def456",
        compilationError: undefined,
        codeWasReturned: true,
      });
    });

    it("should handle compilation errors in tool response", () => {
      const response = new AIMessage({
        content: "Test message",
        additional_kwargs: {
          tool_responses: [
            {
              name: "code_modification",
              content: JSON.stringify({
                documentHash: "abc123",
                error: "failed to compile: syntax error",
              }),
            },
          ],
        },
      });

      const currentState: AgentState = {
        messages: [],
        code: "",
        codeSpace: "",
        lastError: "",
        isStreaming: false,
        debugLogs: [],
        documentHash: "previous-hash",
      };

      const metadata = extractToolResponseMetadata(response, currentState);

      expect(metadata.compilationError).toBeDefined();
      expect(metadata.codeWasReturned).toBe(false);
    });

    it("should handle missing tool responses", () => {
      const response = new AIMessage({
        content: "Test message",
      });

      const currentState: AgentState = {
        messages: [],
        code: "",
        codeSpace: "",
        lastError: "",
        isStreaming: false,
        debugLogs: [],
        documentHash: "previous-hash",
      };

      const metadata = extractToolResponseMetadata(response, currentState);

      expect(metadata).toEqual({
        documentHash: "previous-hash",
        modifiedCodeHash: undefined,
        compilationError: undefined,
        codeWasReturned: false,
      });
    });
  });

  describe("updateToolCallsWithCodeFlag", () => {
    it("should update code modification tool calls", () => {
      const toolCalls = [
        {
          name: "code_modification",
          args: JSON.stringify({
            instructions: "test instructions",
          }),
        },
        {
          name: "other_tool",
          args: {},
        },
      ];

      const updated = updateToolCallsWithCodeFlag(toolCalls, true);

      expect(updated[0].args).toEqual({
        instructions: "test instructions",
        returnModifiedCode: true,
      });
      expect(updated[1]).toEqual(toolCalls[1]);
    });

    it("should handle invalid JSON in args", () => {
      const toolCalls = [
        {
          name: "code_modification",
          args: "invalid json",
        },
      ];

      const updated = updateToolCallsWithCodeFlag(toolCalls, true);

      expect(updated).toEqual(toolCalls);
    });
  });

  describe("handleMissingCodeResponse", () => {
    const mockCode = "function test() {}";
    const mockHash = md5(mockCode);

    beforeEach(() => {
      // Mock the global cSess object
      (globalThis as any).cSess = {
        getCode: vi.fn().mockResolvedValue(mockCode),
      };
      vi.spyOn(console, "log").mockImplementation(() => {});
      vi.spyOn(console, "warn").mockImplementation(() => {});
      vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
      delete (globalThis as any).cSess;
      vi.restoreAllMocks();
    });

    it("should retrieve and verify code from session", async () => {
      const state: AgentState = {
        messages: [],
        code: "",
        codeSpace: "",
        lastError: "",
        isStreaming: false,
        debugLogs: [],
        documentHash: "old-hash",
      };

      const result = await handleMissingCodeResponse(mockHash, state);

      expect(result).toBe(mockCode);
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("Retrieved latest code"),
      );
    });

    it("should handle hash mismatch", async () => {
      const state: AgentState = {
        messages: [],
        code: "",
        codeSpace: "",
        lastError: "",
        isStreaming: false,
        debugLogs: [],
        documentHash: "old-hash",
      };

      const wrongCode = "different code";
      (globalThis as any).cSess.getCode.mockResolvedValue(wrongCode);

      const result = await handleMissingCodeResponse(mockHash, state);

      expect(result).toBeUndefined();
      expect(console.warn).toHaveBeenCalledWith(
        "Hash mismatch",
        {
          expectedHash: mockHash,
          actualHash: md5("different code"),
        },
      );
    });

    it("should handle session errors", async () => {
      const state: AgentState = {
        messages: [],
        code: "",
        codeSpace: "",
        lastError: "",
        isStreaming: false,
        debugLogs: [],
        documentHash: "old-hash",
      };

      (globalThis as any).cSess.getCode.mockRejectedValue(
        new Error("Session error"),
      );

      const result = await handleMissingCodeResponse(mockHash, state);

      expect(result).toBeUndefined();
      expect(console.error).toHaveBeenCalledWith(
        "Failed to retrieve code",
        new Error("Session error"),
      );
    });

    it("should return undefined if document hash matches current state", async () => {
      const state: AgentState = {
        messages: [],
        code: "",
        codeSpace: "",
        lastError: "",
        isStreaming: false,
        debugLogs: [],
        documentHash: mockHash,
      };

      const result = await handleMissingCodeResponse(mockHash, state);

      expect(result).toBeUndefined();
      expect((globalThis as any).cSess.getCode).not.toHaveBeenCalled();
    });
  });
});

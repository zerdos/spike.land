import type { AgentState } from "@/../workflows/chat-langchain.ts";
import {
  extractToolResponseMetadata,
  handleMissingCodeResponse,
  updateToolCallsWithCodeFlag,
} from "@/../workflows/tools/utils/tool-response-utils";
import { md5 } from "@/lib/md5";
import { AIMessage } from "@langchain/core/messages";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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
                hash: "abc123",
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
        origin: "",
        hash: "previous-hash",
      };

      const metadata = extractToolResponseMetadata(response, currentState);

      expect(metadata).toEqual({
        hash: "abc123",
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
                hash: "abc123",
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
        origin: "",
        hash: "previous-hash",
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
        origin: "",
        hash: "previous-hash",
      };

      const metadata = extractToolResponseMetadata(response, currentState);

      expect(metadata).toEqual({
        hash: "previous-hash",
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
    let mockCodeSession: { getCode: () => Promise<string>; };

    beforeEach(() => {
      // Create a mock code session
      mockCodeSession = {
        getCode: vi.fn().mockResolvedValue(mockCode),
      };
      vi.spyOn(console, "log").mockImplementation(() => {});
      vi.spyOn(console, "warn").mockImplementation(() => {});
      vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should retrieve and verify code from session", async () => {
      const state: AgentState = {
        messages: [],
        code: "",
        codeSpace: "",
        lastError: "",
        isStreaming: false,
        origin: "",
        hash: "old-hash",
      };

      const result = await handleMissingCodeResponse(
        mockHash,
        state,
        mockCodeSession,
      );

      expect(result).toBe(mockCode);
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining("Retrieved latest code"),
      );
      expect(mockCodeSession.getCode).toHaveBeenCalled();
    });

    it("should handle hash mismatch", async () => {
      const state: AgentState = {
        messages: [],
        code: "",
        codeSpace: "",
        lastError: "",
        isStreaming: false,
        origin: "",
        hash: "old-hash",
      };

      const wrongCode = "different code";
      mockCodeSession.getCode = vi.fn().mockResolvedValue(wrongCode);

      const result = await handleMissingCodeResponse(
        mockHash,
        state,
        mockCodeSession,
      );

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
        origin: "",
        hash: "old-hash",
      };

      mockCodeSession.getCode = vi.fn().mockRejectedValue(
        new Error("Session error"),
      );

      const result = await handleMissingCodeResponse(
        mockHash,
        state,
        mockCodeSession,
      );

      expect(result).toBeUndefined();
      expect(console.warn).toHaveBeenCalledWith(
        "Failed to retrieve code",
        expect.any(Error),
      );
    });

    it("should return undefined if document hash matches current state", async () => {
      const state: AgentState = {
        messages: [],
        code: "",
        codeSpace: "",
        lastError: "",
        isStreaming: false,
        origin: "",
        hash: mockHash,
      };

      const result = await handleMissingCodeResponse(
        mockHash,
        state,
        mockCodeSession,
      );

      expect(result).toBeUndefined();
      expect(mockCodeSession.getCode).not.toHaveBeenCalled();
    });
  });
});

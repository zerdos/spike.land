import { md5 } from "@/lib/md5";
import { AgentState } from "@/types/chat-langchain";
import { ChatAnthropic } from "@langchain/anthropic";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createWorkflowWithStringReplace } from "../chat-langchain-workflow";

vi.mock("@langchain/anthropic", () => ({
  ChatAnthropic: vi.fn(() => ({
    invoke: vi.fn(),
    bindTools: vi.fn().mockReturnThis(),
  })),
}));

vi.mock("uuid", () => ({
  v4: vi.fn(() => "mock-uuid"),
}));

describe("chat-langchain-workflow", () => {
  const mockSystemMessage = { content: "System message" };
  const mockInitialState: AgentState = {
    messages: [],
    origin: "http://localhost",
    code: "function test() {}",
    codeSpace: "",
    lastError: "",
    isStreaming: false,
    debugLogs: [],
    documentHash: md5("function test() {}"),
  };

  beforeEach(() => {
    vi.mocked(ChatAnthropic).mockClear();
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("workflow creation", () => {
    it("should create workflow with initial state", () => {
      const workflow = createWorkflowWithStringReplace(mockInitialState);
      expect(workflow).toHaveProperty("invoke");
      expect(typeof workflow.invoke).toBe("function");
    });

    it("should initialize ChatAnthropic with correct configuration", () => {
      createWorkflowWithStringReplace(mockInitialState);
      expect(ChatAnthropic).toHaveBeenCalledWith(
        expect.objectContaining({
          streaming: false,
          temperature: 0,
        }),
      );
    });
  });

  describe("workflow invocation", () => {
    const mockToolResponse = new AIMessage({
      content: "Modified code",
      additional_kwargs: {
        tool_responses: [
          {
            name: "code_modification",
            content: JSON.stringify({
              documentHash: "new-hash",
              code: "function modified() {}",
            }),
          },
        ],
      },
    });

    beforeEach(() => {
      vi.mocked(ChatAnthropic).mockImplementation(
        () =>
          ({
            invoke: vi.fn().mockResolvedValue(mockToolResponse),
            bindTools: vi.fn().mockReturnThis(),
          }) as any,
      );
    });

    it("should process messages and return updated state", async () => {
      const workflow = createWorkflowWithStringReplace(mockInitialState);
      const result = await workflow.invoke("Modify the code");

      expect(result).toBeDefined();
      expect(result.messages).toContainEqual(mockToolResponse);
      expect(result.documentHash).toBeDefined();
    });

    it("should handle code integrity verification", async () => {
      const initialState = {
        ...mockInitialState,
        code: "function original() {}",
        documentHash: md5("function original() {}"),
      };

      const workflow = createWorkflowWithStringReplace(initialState);
      const result = await workflow.invoke("Verify code integrity");

      expect(result.documentHash).toBeDefined();
      expect(console.error).not.toHaveBeenCalled();
    });

    it("should handle compilation errors", async () => {
      const errorResponse = new AIMessage({
        content: "Error in modification",
        additional_kwargs: {
          tool_responses: [
            {
              name: "code_modification",
              content: JSON.stringify({
                documentHash: "error-hash",
                error: "failed to compile: syntax error",
              }),
            },
          ],
        },
      });

      vi.mocked(ChatAnthropic).mockImplementation(
        () =>
          ({
            invoke: vi.fn().mockResolvedValue(errorResponse),
            bindTools: vi.fn().mockReturnThis(),
          }) as any,
      );

      const workflow = createWorkflowWithStringReplace(mockInitialState);

      await expect(workflow.invoke("Introduce error")).rejects.toThrow(
        "failed to compile: syntax error",
      );
      expect(console.error).toHaveBeenCalled();
    });

    it("should optimize token usage based on code size", async () => {
      const largeCode = "large".repeat(1000); // 4000 chars
      const initialState = {
        ...mockInitialState,
        code: largeCode,
        documentHash: md5(largeCode),
      };

      const workflow = createWorkflowWithStringReplace(initialState);
      await workflow.invoke("Optimize tokens");

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("Performance optimization"),
      );
    });

    it("should handle missing code in tool response", async () => {
      // Mock cSess for code retrieval
      (globalThis as any).cSess = {
        getCode: vi.fn().mockResolvedValue("retrieved code"),
      };

      const responseWithoutCode = new AIMessage({
        content: "No code returned",
        additional_kwargs: {
          tool_responses: [
            {
              name: "code_modification",
              content: JSON.stringify({
                documentHash: "new-hash",
              }),
            },
          ],
        },
      });

      vi.mocked(ChatAnthropic).mockImplementation(
        () =>
          ({
            invoke: vi.fn().mockResolvedValue(responseWithoutCode),
            bindTools: vi.fn().mockReturnThis(),
          }) as any,
      );

      const workflow = createWorkflowWithStringReplace(mockInitialState);
      const result = await workflow.invoke("Get code from session");

      expect(result).toBeDefined();
      expect(result.documentHash).toBe("new-hash");

      delete (globalThis as any).cSess;
    });
  });

  describe("error handling", () => {
    it("should handle workflow errors gracefully", async () => {
      vi.mocked(ChatAnthropic).mockImplementation(
        () =>
          ({
            invoke: vi.fn().mockRejectedValue(new Error("Test error")),
            bindTools: vi.fn().mockReturnThis(),
          }) as any,
      );

      const workflow = createWorkflowWithStringReplace(mockInitialState);

      await expect(workflow.invoke("Generate error")).rejects.toThrow();
      expect(console.error).toHaveBeenCalled();
    });

    it("should handle code integrity violations", async () => {
      const corruptedState = {
        ...mockInitialState,
        code: "corrupted code",
        documentHash: md5("original code"),
        messages: [new SystemMessage("Test")],
      };

      // Mock ChatAnthropic to return a simple response
      vi.mocked(ChatAnthropic).mockImplementation(
        () =>
          ({
            invoke: vi.fn().mockResolvedValue(new AIMessage({ content: "Test response" })),
            bindTools: vi.fn().mockReturnThis(),
          }) as any,
      );

      const workflow = createWorkflowWithStringReplace(corruptedState);

      await expect(workflow.invoke("Check integrity")).rejects.toThrow("Code integrity");
    });
  });
});

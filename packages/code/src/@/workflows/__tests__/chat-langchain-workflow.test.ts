import { ICode } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { AgentState } from "@/types/chat-langchain";
import { ChatAnthropic } from "@langchain/anthropic";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { get } from "http";
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
  const mockSession = {
    getCode: vi.fn().mockResolvedValue("retrieved code"),
    getMessages: vi.fn().mockReturnValue([]),
    setMessages: vi.fn(),
    setCode: vi.fn(), // Mock setCode to avoid side effects
  };

  const mockSystemMessage = { content: "System message" };
  const mockInitialState: AgentState = {
    messages: [],
    origin: "http://localhost",
    code: "function test() {}",
    codeSpace: "",
    lastError: "",
    isStreaming: false,
    hash: md5("function test() {}"),
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
    const mockSession = {
      getCode: vi.fn().mockResolvedValue("retrieved code"),
      getMessages: vi.fn().mockReturnValue([]),
      setMessages: vi.fn(),
      setCode: vi.fn(), // Mock setCode to avoid side effects
    } as unknown as ICode;

    it("should create workflow with initial state", () => {
      const workflow = createWorkflowWithStringReplace(mockInitialState, mockSession);
      expect(workflow).toHaveProperty("invoke");
      expect(typeof workflow.invoke).toBe("function");
    });

    it("should initialize ChatAnthropic with correct configuration", () => {
      createWorkflowWithStringReplace(mockInitialState, mockSession);
      expect(ChatAnthropic).toHaveBeenCalledWith(
        expect.objectContaining({
          streaming: false,
          temperature: 0,
        }),
      );
    });
  });

  describe("workflow invocation", () => {
    const mockSession = {
      getCode: vi.fn().mockResolvedValue("retrieved code"),
      getMessages: () => [],
      setMessages: vi.fn(),
      setCode: vi.fn(), // Mock setCode to avoid side effects
    } as unknown as ICode;

    const mockToolResponse = new AIMessage({
      content: "Modified code",
      additional_kwargs: {
        tool_responses: [
          {
            name: "code_modification",
            content: JSON.stringify({
              hash: "new-hash",
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
      const workflow = createWorkflowWithStringReplace(mockInitialState, mockSession);
      const result = await workflow.invoke("Modify the code");

      expect(result).toBeDefined();
      expect(result.messages).toContainEqual(mockToolResponse);
      expect(result.hash).toBeDefined();
    });

    it("should handle code integrity verification", async () => {
      const initialState = {
        ...mockInitialState,
        code: "function original() {}",
        hash: md5("function original() {}"),
      };

      const workflow = createWorkflowWithStringReplace(initialState, mockSession);
      const result = await workflow.invoke("Verify code integrity");

      expect(result.hash).toBeDefined();
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
                hash: "error-hash",
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

      const workflow = createWorkflowWithStringReplace(mockInitialState, mockSession);

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
        hash: md5(largeCode),
      };

      const workflow = createWorkflowWithStringReplace(initialState, mockSession);
      await workflow.invoke("Optimize tokens");

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("Performance optimization"),
      );
    });

    it("should handle missing code in tool response", async () => {
      // Mock cSess for code retrieval

      const responseWithoutCode = new AIMessage({
        content: "No code returned",
        additional_kwargs: {
          tool_responses: [
            {
              name: "code_modification",
              content: JSON.stringify({
                hash: "new-hash",
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

      const workflow = createWorkflowWithStringReplace(mockInitialState, mockSession);
      const result = await workflow.invoke("Get code from session");

      expect(result).toBeDefined();
      expect(result.hash).toBe("new-hash");

      delete (globalThis as any).cSess;
    });
  });

  describe("error handling", () => {
    const mockSession = {
      getCode: vi.fn().mockResolvedValue("retrieved code"),
      getMessages: () => [],
      setMessages: vi.fn(),
      setCode: vi.fn(), // Mock setCode to avoid side effects
    } as unknown as ICode;

    it("should handle workflow errors gracefully", async () => {
      vi.mocked(ChatAnthropic).mockImplementation(
        () =>
          ({
            invoke: vi.fn().mockRejectedValue(new Error("Test error")),
            bindTools: vi.fn().mockReturnThis(),
          }) as any,
      );

      const workflow = createWorkflowWithStringReplace(mockInitialState, mockSession);

      await expect(workflow.invoke("Generate error")).rejects.toThrow();
      expect(console.error).toHaveBeenCalled();
    });

    it("should handle code integrity violations", async () => {
      const corruptedState = {
        ...mockInitialState,
        code: "corrupted code",
        hash: md5("original code"),
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

      const workflow = createWorkflowWithStringReplace(corruptedState, mockSession);

      await expect(workflow.invoke("Check integrity")).rejects.toThrow("Code integrity");
    });
  });
});

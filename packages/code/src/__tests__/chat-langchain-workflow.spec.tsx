import type { AgentState } from "@/../workflows/chat-langchain";
import { createWorkflowWithStringReplace } from "@/../workflows/chat-langchain-workflow";
import { md5 } from "@/lib/md5";
import { ChatAnthropic } from "@langchain/anthropic";
import { AIMessage, SystemMessage } from "@langchain/core/messages";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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
  const _mockSession = {
    getCode: vi.fn().mockResolvedValue("retrieved code"),
    getMessages: vi.fn().mockReturnValue([]),
    addMessage: vi.fn(),
    removeMessages: vi.fn(),
    setCode: vi.fn(), // Mock setCode to avoid side effects
  };

  const _mockSystemMessage = { content: "System message" };
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
    beforeEach(() => {
      // Mock the global cSess object
      (globalThis as { cSess?: object }).cSess = {
        getCode: vi.fn().mockResolvedValue("retrieved code"),
        getMessages: vi.fn().mockReturnValue([]),
        addMessage: vi.fn(),
        removeMessages: vi.fn(),
        setCode: vi.fn(), // Mock setCode to avoid side effects
      };
    });

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
            name: "enhanced_replace_in_file", // Updated tool name
            content: JSON.stringify({
              hash: "new-hash",
              code: "function modified() {}",
            }),
          },
        ],
      },
    });

    beforeEach(() => {
      // Mock the global cSess object
      (globalThis as { cSess?: object }).cSess = {
        getCode: vi.fn().mockResolvedValue("retrieved code"),
        getMessages: vi.fn().mockReturnValue([]),
        addMessage: vi.fn(),
        removeMessages: vi.fn(),
        setCode: vi.fn(), // Mock setCode to avoid side effects
      };

      vi.mocked(ChatAnthropic).mockImplementation(
        () =>
          ({
            invoke: vi.fn().mockResolvedValue(mockToolResponse),
            bindTools: vi.fn().mockReturnThis(),
          }) as unknown as ChatAnthropic,
      );
    });

    it("should process messages and return updated state", async () => {
      const workflow = createWorkflowWithStringReplace(mockInitialState);
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

      const workflow = createWorkflowWithStringReplace(initialState);
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
              name: "enhanced_replace_in_file", // Updated tool name
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
          }) as unknown as ChatAnthropic,
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
        hash: md5(largeCode),
      };

      const workflow = createWorkflowWithStringReplace(initialState);
      await workflow.invoke("Optimize tokens");

      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining("Performance optimization"),
      );
    });

    it("should handle missing code in tool response", async () => {
      // Update the global cSess object with specific mock for this test
      (globalThis as { cSess?: object }).cSess = {
        getCode: vi.fn().mockResolvedValue("retrieved code"),
        getMessages: vi.fn().mockReturnValue([]),
        addMessage: vi.fn(),
        removeMessages: vi.fn(),
        setCode: vi.fn(), // Mock setCode to avoid side effects
      };

      const responseWithoutCode = new AIMessage({
        content: "No code returned",
        additional_kwargs: {
          tool_responses: [
            {
              name: "enhanced_replace_in_file", // Updated tool name
              content: JSON.stringify({
                hash: md5("retrieved code"), // Use the hash of the code that will be retrieved
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
          }) as unknown as ChatAnthropic,
      );

      const workflow = createWorkflowWithStringReplace(mockInitialState);
      const result = await workflow.invoke("Get code from session");

      expect(result).toBeDefined();
      expect(result.hash).toBe(md5("retrieved code"));
      expect(console.error).not.toHaveBeenCalled();
      expect((globalThis as { cSess?: { getCode?: () => void } }).cSess?.getCode).toHaveBeenCalled();
    });
  });

  describe("error handling", () => {
    beforeEach(() => {
      // Mock the global cSess object
      (globalThis as { cSess?: object }).cSess = {
        getCode: vi.fn().mockResolvedValue("retrieved code"),
        getMessages: vi.fn().mockReturnValue([]),
        addMessage: vi.fn(),
        removeMessages: vi.fn(),
        setCode: vi.fn(), // Mock setCode to avoid side effects
      };
    });

    it("should handle workflow errors gracefully", async () => {
      vi.mocked(ChatAnthropic).mockImplementation(
        () =>
          ({
            invoke: vi.fn().mockRejectedValue(new Error("Test error")),
            bindTools: vi.fn().mockReturnThis(),
          }) as unknown as ChatAnthropic,
      );

      const workflow = createWorkflowWithStringReplace(mockInitialState);

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
            invoke: vi.fn().mockResolvedValue(
              new AIMessage({ content: "Test response" }),
            ),
            bindTools: vi.fn().mockReturnThis(),
          }) as unknown as ChatAnthropic,
      );

      const workflow = createWorkflowWithStringReplace(corruptedState);

      await expect(workflow.invoke("Check integrity")).rejects.toThrow(
        "Code integrity",
      );
    });
  });
});

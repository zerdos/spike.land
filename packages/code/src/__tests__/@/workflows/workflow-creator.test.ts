import { createWorkflowWithStringReplace, handleSendMessage } from "@/workflows/workflow-creator";
import { getHashWithCache } from "@/workflows/code-processing";
import { logCodeChanges, verifyCodeIntegrity } from "@/tools/utils/code-utils";
import { createCodeIntegrityError, handleWorkflowError } from "@/tools/utils/error-handlers";
import { telemetry } from "../../../lib/telemetry";
import { ChatAnthropic } from "@langchain/anthropic";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { StateGraph } from "@langchain/langgraph/web";
import { MemorySaver } from "@langchain/langgraph/web";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import type { AgentState } from "@/types/chat-langchain";
import type { ICode } from "@/lib/interfaces";

// Mock dependencies
vi.mock("@/workflows/code-processing", () => ({
  getHashWithCache: vi.fn((code) => `hash-${code.length}`),
}));

vi.mock("@/tools/utils/code-utils", () => ({
  logCodeChanges: vi.fn(),
  verifyCodeIntegrity: vi.fn().mockReturnValue(true),
  calculateCodeChanges: vi.fn(),
  shouldReturnFullCode: vi.fn(),
  estimateTokenSavings: vi.fn(),
}));

vi.mock("@/tools/utils/error-handlers", () => ({
  createCodeIntegrityError: vi.fn(),
  handleWorkflowError: vi.fn(),
  WorkflowError: class WorkflowError extends Error {},
}));

vi.mock("../../../lib/telemetry", () => ({
  telemetry: {
    trackEvent: vi.fn(),
    startTimer: vi.fn(),
    stopTimer: vi.fn(),
    trackCodeModification: vi.fn(),
    trackError: vi.fn(),
  },
}));

vi.mock("@langchain/anthropic", () => ({
  ChatAnthropic: vi.fn().mockImplementation(() => ({
    bindTools: vi.fn().mockReturnValue({}),
  })),
}));

vi.mock("@langchain/langgraph/prebuilt", () => ({
  ToolNode: vi.fn().mockImplementation(() => ({})),
}));

vi.mock("@langchain/langgraph/web", () => ({
  StateGraph: vi.fn().mockImplementation(() => ({
    addNode: vi.fn().mockReturnThis(),
    addEdge: vi.fn().mockReturnThis(),
    addConditionalEdges: vi.fn().mockReturnThis(),
    compile: vi.fn().mockReturnValue({
      invoke: vi.fn().mockResolvedValue({}),
    }),
  })),
  MemorySaver: vi.fn(),
}));

vi.mock("uuid", () => ({
  v4: vi.fn().mockReturnValue("mock-uuid"),
}));

vi.mock("@/tools/replace-in-file", () => ({
  replaceInFileTool: {},
}));

vi.mock("@/lib/initial-claude", () => ({
  initialClaude: "System prompt",
}));

vi.mock("@/config/workflow-config", () => ({
  ANTHROPIC_API_CONFIG: {
    apiKey: "mock-api-key",
    streaming: false,
    getApiUrl: vi.fn().mockReturnValue("https://api.anthropic.com"),
    temperature: 0.7,
    maxTokens: 4000,
  },
  MODEL_NAME: "claude-3-opus-20240229",
}));

vi.mock("@/workflows/message-handlers", () => ({
  createNewMessage: vi.fn().mockResolvedValue({
    id: "mock-message-id",
    role: "user",
    content: "mock-content",
  }),
}));

vi.mock("@/workflows/message-processor", () => ({
  processMessage: vi.fn().mockImplementation((state) => state),
}));

vi.mock("@/workflows/state-reducers", () => ({
  createGraphStateReducers: vi.fn().mockReturnValue({}),
}));

// Mock global cSess
const mockSetCode = vi.fn().mockImplementation((code) => Promise.resolve(code));
const mockGetCode = vi.fn();
const mockAddMessage = vi.fn().mockResolvedValue(true);
const mockAddMessageChunk = vi.fn();
const mockGetCodeSpace = vi.fn().mockReturnValue("test-code-space");

const mockCSess: ICode = {
  setCode: mockSetCode,
  getCode: mockGetCode,
  addMessage: mockAddMessage,
  addMessageChunk: mockAddMessageChunk,
  getCodeSpace: mockGetCodeSpace,
  setSession: vi.fn(),
  getSession: vi.fn(),
  init: vi.fn(),
  screenshot: vi.fn(),
  getMessages: vi.fn(),
  removeMessages: vi.fn(),
  sub: vi.fn(),
};

// Setup global object
(global as any).globalThis = {
  cSess: mockCSess,
};

// Mock location
Object.defineProperty(global, "location", {
  value: {
    origin: "http://localhost:3000",
  },
  writable: true,
});

describe("workflow-creator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("createWorkflowWithStringReplace", () => {
    it("should initialize a workflow with the correct configuration", () => {
      const initialState: AgentState = {
        code: "const x = 1;",
        codeSpace: "test-space",
        origin: "http://localhost:3000",
        lastError: "",
        isStreaming: false,
        messages: [],
        hash: "hash-123",
      };

      createWorkflowWithStringReplace(initialState);

      expect(telemetry.trackEvent).toHaveBeenCalledWith("workflow.initialize", {
        codeLength: "11",
        codeSpace: "test-space",
      });
      expect(ChatAnthropic).toHaveBeenCalled();
      expect(ToolNode).toHaveBeenCalled();
      expect(StateGraph).toHaveBeenCalled();
    });

    describe("invoke method", () => {
      let workflow: any;
      let initialState: AgentState;

      beforeEach(() => {
        initialState = {
          code: "const x = 1;",
          codeSpace: "test-space",
          origin: "http://localhost:3000",
          lastError: "",
          isStreaming: false,
          messages: [],
          hash: "hash-11",
        };

        // Setup StateGraph mock to return a specific finalState
        (StateGraph as any).mockImplementation(() => ({
          addNode: vi.fn().mockReturnThis(),
          addEdge: vi.fn().mockReturnThis(),
          addConditionalEdges: vi.fn().mockReturnThis(),
          compile: vi.fn().mockReturnValue({
            invoke: vi.fn().mockResolvedValue({
              ...initialState,
              code: "const x = 2;", // Modified code
            }),
          }),
        }));

        workflow = createWorkflowWithStringReplace(initialState);
      });

      it("should apply code changes when finalState.code is different from initialState.code", async () => {
        // Setup mock to return the original code
        mockGetCode.mockResolvedValue("const x = 1;");

        await workflow.invoke("Update x to 2");

        // Verify code changes were applied
        expect(mockSetCode).toHaveBeenCalledWith(expect.stringContaining("const x = 2;"));
        expect(logCodeChanges).toHaveBeenCalled();
        expect(telemetry.trackCodeModification).toHaveBeenCalled();
        expect(telemetry.stopTimer).toHaveBeenCalledWith("workflow.invoke", {
          success: "true",
          codeModified: "true",
        });
      });

      it("should apply session code changes when finalState.code is unchanged but session code is different", async () => {
        // Setup mocks to simulate unchanged finalState but changed session code
        (StateGraph as any).mockImplementation(() => ({
          addNode: vi.fn().mockReturnThis(),
          addEdge: vi.fn().mockReturnThis(),
          addConditionalEdges: vi.fn().mockReturnThis(),
          compile: vi.fn().mockReturnValue({
            invoke: vi.fn().mockResolvedValue({
              ...initialState,
              code: "const x = 1;", // Unchanged code in finalState
            }),
          }),
        }));

        // But session code has changed
        mockGetCode.mockResolvedValue("const x = 3;");

        workflow = createWorkflowWithStringReplace(initialState);
        await workflow.invoke("Update x to 3");

        // Verify session code changes were applied
        expect(mockSetCode).toHaveBeenCalledWith(expect.stringContaining("const x = 3;"));
        expect(logCodeChanges).toHaveBeenCalled();
      });

      it("should not apply changes when no code changes are detected", async () => {
        // Setup mocks to simulate no code changes
        (StateGraph as any).mockImplementation(() => ({
          addNode: vi.fn().mockReturnThis(),
          addEdge: vi.fn().mockReturnThis(),
          addConditionalEdges: vi.fn().mockReturnThis(),
          compile: vi.fn().mockReturnValue({
            invoke: vi.fn().mockResolvedValue({
              ...initialState,
              code: "const x = 1;", // Unchanged code
            }),
          }),
        }));

        // Session code also unchanged
        mockGetCode.mockResolvedValue("const x = 1;");

        workflow = createWorkflowWithStringReplace(initialState);
        await workflow.invoke("No changes");

        // Verify no code changes were applied
        expect(mockSetCode).not.toHaveBeenCalled();
        expect(logCodeChanges).not.toHaveBeenCalled();
      });

      it("should handle code integrity verification failure", async () => {
        // Setup mock to fail code integrity check
        (verifyCodeIntegrity as any).mockReturnValueOnce(false);
        mockGetCode.mockResolvedValue("const x = 1;");

        await expect(workflow.invoke("Update x to 2")).rejects.toThrow();
        expect(createCodeIntegrityError).toHaveBeenCalled();
      });

      it("should handle errors during workflow execution", async () => {
        // Setup mock to throw an error
        const testError = new Error("Test error");
        (StateGraph as any).mockImplementation(() => ({
          addNode: vi.fn().mockReturnThis(),
          addEdge: vi.fn().mockReturnThis(),
          addConditionalEdges: vi.fn().mockReturnThis(),
          compile: vi.fn().mockReturnValue({
            invoke: vi.fn().mockRejectedValue(testError),
          }),
        }));

        workflow = createWorkflowWithStringReplace(initialState);
        await expect(workflow.invoke("Error test")).rejects.toThrow();
        
        expect(telemetry.trackError).toHaveBeenCalledWith(testError, {
          location: "workflow.invoke",
          promptLength: "10",
        });
        expect(telemetry.stopTimer).toHaveBeenCalledWith("workflow.invoke", { success: "false" });
        expect(handleWorkflowError).toHaveBeenCalled();
      });
    });
  });

  describe("handleSendMessage", () => {
    it("should create a new workflow if none exists for the code space", async () => {
      // Setup mocks
      mockGetCodeSpace.mockReturnValue("new-code-space");
      mockGetCode.mockResolvedValue("const y = 1;");

      // Mock StateGraph to return a specific finalState
      (StateGraph as any).mockImplementation(() => ({
        addNode: vi.fn().mockReturnThis(),
        addEdge: vi.fn().mockReturnThis(),
        addConditionalEdges: vi.fn().mockReturnThis(),
        compile: vi.fn().mockReturnValue({
          invoke: vi.fn().mockResolvedValue({
            code: "const y = 2;",
            codeSpace: "new-code-space",
          }),
        }),
      }));

      const result = await handleSendMessage({ prompt: "Update y to 2", images: [] });

      expect(result).toEqual({
        code: "const y = 2;",
        codeSpace: "new-code-space",
      });
    });

    it("should reuse an existing workflow for the same code space", async () => {
      // Setup mocks
      mockGetCodeSpace.mockReturnValue("existing-code-space");
      mockGetCode.mockResolvedValue("const z = 1;");

      // Call once to create the workflow
      await handleSendMessage({ prompt: "First call", images: [] });
      
      // Reset mocks to verify second call
      vi.clearAllMocks();
      
      // Mock StateGraph for the second call
      (StateGraph as any).mockImplementation(() => ({
        addNode: vi.fn().mockReturnThis(),
        addEdge: vi.fn().mockReturnThis(),
        addConditionalEdges: vi.fn().mockReturnThis(),
        compile: vi.fn().mockReturnValue({
          invoke: vi.fn().mockResolvedValue({
            code: "const z = 3;",
            codeSpace: "existing-code-space",
          }),
        }),
      }));

      // Second call should reuse the workflow
      await handleSendMessage({ prompt: "Second call", images: [] });

      // StateGraph should not be called again for the second call
      expect(StateGraph).not.toHaveBeenCalled();
    });
  });
});

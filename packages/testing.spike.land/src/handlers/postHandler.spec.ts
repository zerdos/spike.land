import { type AnthropicProvider, createAnthropic } from "@ai-sdk/anthropic";
import type { StepResult, StreamTextResult } from "ai";
import { streamText } from "ai";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Code } from "../chatRoom";
import type Env from "../env";
import type { McpTool } from "../mcp";
import { StorageService } from "../services/storageService";
import type { PostRequestBody } from "../types/aiRoutes";
import { PostHandler } from "./postHandler";
import {
  createMockCode,
  createMockEnv,
  createMockMcpServer,
  createMockStorageService,
  createMockTools,
  createMockUrl,
  setupCrypto,
  setupStorageServiceMock,
} from "./postHandler.test-utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StreamResult = StreamTextResult<any, unknown>;

// Mock type that matches what the test needs
type MockStepResult = StepResult<Record<string, never>>;

// Mock all external dependencies
vi.mock("@ai-sdk/anthropic");
vi.mock("ai");
vi.mock("../services/storageService");

// Setup crypto mock
setupCrypto();

describe("PostHandler", () => {
  let postHandler: PostHandler;
  let mockCode: Code;
  let mockEnv: Env;
  let mockStorageService: StorageService;
  let mockMcpServer: { tools: McpTool[]; };
  let mockRequest: Request;
  let mockUrl: URL;

  beforeEach(() => {
    vi.clearAllMocks();

    mockMcpServer = createMockMcpServer();
    mockCode = createMockCode(mockMcpServer);
    mockEnv = createMockEnv();
    mockStorageService = createMockStorageService();
    setupStorageServiceMock(StorageService, mockStorageService);
    mockUrl = createMockUrl();

    postHandler = new PostHandler(mockCode, mockEnv);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("constructor", () => {
    it("should initialize with Code and Env", () => {
      expect(postHandler).toBeDefined();
      expect(StorageService).toHaveBeenCalledWith(mockEnv);
    });
  });

  describe("handle", () => {
    let mockStreamResponse: StreamResult;
    let mockToDataStreamResponse: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      // Setup mock stream response
      mockToDataStreamResponse = vi.fn().mockReturnValue(
        new Response("stream"),
      );
      mockStreamResponse = {
        toDataStreamResponse: mockToDataStreamResponse,
        toUIMessageStreamResponse: mockToDataStreamResponse,
        toTextStreamResponse: mockToDataStreamResponse,
        warnings: [],
        usage: {},
        sources: [],
        files: [],
        finishReason: "stop",
        text: "response text",
        toolCalls: [],
        toolResults: [],
        rawCall: {},
        rawResponse: {},
        request: {},
        response: {},
        providerMetadata: {},
        experimental_providerMetadata: {},
        reasoning: undefined,
        reasoningDetails: undefined,
        steps: [],
        experimental_steps: [],
        object: "text-completion",
        experimental_completion: {},
        experimental_objectGeneration: {},
        experimental_telemetry: {},
        experimental_usage: {},
      } as unknown as StreamResult;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.mocked(streamText).mockResolvedValue(mockStreamResponse as any);

      // Mock createAnthropic to return a proper AnthropicProvider
      const mockTools = createMockTools();

      const anthropicProvider = Object.assign(
        vi.fn().mockReturnValue("claude-4-sonnet-20250514"),
        {
          languageModel: vi.fn().mockReturnValue("claude-4-sonnet-20250514"),
          chat: vi.fn(),
          messages: vi.fn(),
          tools: mockTools,
          textEmbeddingModel: vi.fn(),
        },
      ) as unknown as AnthropicProvider;

      vi.mocked(createAnthropic).mockReturnValue(anthropicProvider);
    });

    it("should handle valid request successfully", async () => {
      const requestBody: PostRequestBody = {
        messages: [
          { role: "user", content: "Hello" },
          { role: "assistant", content: "Hi there" },
        ],
      };

      mockRequest = new Request("https://test.spike.land/api/post", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const response = await postHandler.handle(mockRequest, mockUrl);

      // Debug the response if it's not 200
      if (response.status !== 200) {
        const errorBody = await response.text();
        console.error("Response error:", response.status, errorBody);
      }

      expect(response.status).toBe(200);
      expect(mockStorageService.saveRequestBody).toHaveBeenCalledWith(
        "test-space",
        requestBody,
      );
      expect(streamText).toHaveBeenCalled();
      expect(mockToDataStreamResponse).toHaveBeenCalled();
    });

    it("should reject requests larger than 10MB", async () => {
      mockRequest = new Request("https://test.spike.land/api/post", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "content-length": "11000000", // 11MB
        },
        body: JSON.stringify({ messages: [] }),
      });

      const response = await postHandler.handle(mockRequest, mockUrl);

      expect(response.status).toBe(413);
      const body = await response.json() as { error: string; };
      expect(body.error).toBe("Request too large");
    });

    it("should handle invalid JSON", async () => {
      mockRequest = new Request("https://test.spike.land/api/post", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "{ invalid json",
      });

      const response = await postHandler.handle(mockRequest, mockUrl);

      expect(response.status).toBe(500);
      const body = await response.json() as { error: string; details?: string; };
      expect(body.error).toBe("Failed to process message");
      expect(body.details).toContain("Invalid JSON");
    });

    it("should handle missing ANTHROPIC_API_KEY", async () => {
      mockEnv.ANTHROPIC_API_KEY = "";

      const requestBody: PostRequestBody = {
        messages: [{ role: "user", content: "Hello" }],
      };

      mockRequest = new Request("https://test.spike.land/api/post", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const response = await postHandler.handle(mockRequest, mockUrl);

      expect(response.status).toBe(503);
      const body = await response.json() as { error: string; };
      expect(body.error).toContain("ANTHROPIC_API_KEY not configured");
    });

    it("should log and ignore tools from request body", async () => {
      const consoleSpy = vi.spyOn(console, "log");
      const requestBody: PostRequestBody = {
        messages: [{ role: "user", content: "Hello" }],
        tools: [
          { name: "custom_tool", input_schema: { type: "object" } },
        ],
      };

      mockRequest = new Request("https://test.spike.land/api/post", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      await postHandler.handle(mockRequest, mockUrl);

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("Request contains tools:"),
        expect.stringContaining("Array with 1 tools"),
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("Ignoring tools from request body"),
      );
    });

    it("should warn about invalid tool schemas with direct input_schema", async () => {
      const consoleWarnSpy = vi.spyOn(console, "warn");
      const requestBody: PostRequestBody = {
        messages: [{ role: "user", content: "Hello" }],
        tools: [
          { input_schema: { type: "string" } },
          { input_schema: { type: "number" } },
          { input_schema: { type: "object" } }, // Valid, should not be warned
        ],
      };

      mockRequest = new Request("https://test.spike.land/api/post", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      await postHandler.handle(mockRequest, mockUrl);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining("Found 2 tools with invalid schemas:"),
        expect.arrayContaining([
          expect.objectContaining({
            index: 0,
            reason: "input_schema.type is not 'object' (AI SDK v4 issue with Claude Sonnet 4)",
            value: "string",
            note: "See https://github.com/vercel/ai/issues/7333",
          }),
          expect.objectContaining({
            index: 1,
            reason: "input_schema.type is not 'object' (AI SDK v4 issue with Claude Sonnet 4)",
            value: "number",
            note: "See https://github.com/vercel/ai/issues/7333",
          }),
        ]),
        expect.stringContaining("This is a known issue with AI SDK v4 and Claude Sonnet 4"),
      );
    });

    it("should warn about invalid tool schemas with custom.input_schema pattern", async () => {
      const consoleWarnSpy = vi.spyOn(console, "warn");
      const requestBody: PostRequestBody = {
        messages: [{ role: "user", content: "Hello" }],
        tools: [
          {
            custom: {
              input_schema: { type: "string" },
            },
          },
          {
            custom: {
              input_schema: { type: "object" }, // Valid
            },
          },
        ],
      };

      mockRequest = new Request("https://test.spike.land/api/post", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      await postHandler.handle(mockRequest, mockUrl);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining("Found 1 tools with invalid schemas:"),
        expect.arrayContaining([
          expect.objectContaining({
            index: 0,
            reason: "custom.input_schema.type is not 'object'",
            value: "string",
          }),
        ]),
        expect.stringContaining("This is a known issue with AI SDK v4 and Claude Sonnet 4"),
      );
    });

    it("should handle tools with mixed valid and invalid schemas", async () => {
      const consoleWarnSpy = vi.spyOn(console, "warn");
      const consoleLogSpy = vi.spyOn(console, "log");
      const requestBody: PostRequestBody = {
        messages: [{ role: "user", content: "Hello" }],
        tools: [
          { name: "tool1", input_schema: { type: "object" } }, // Valid
          { name: "tool2", input_schema: { type: "string" } }, // Invalid direct
          {
            name: "tool3",
            custom: {
              input_schema: { type: "boolean" }, // Invalid custom
            },
          },
          {
            name: "tool4",
            custom: {
              input_schema: { type: "object" }, // Valid custom
            },
            input_schema: { type: "array" }, // Invalid direct (both patterns)
          },
        ],
      };

      mockRequest = new Request("https://test.spike.land/api/post", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      await postHandler.handle(mockRequest, mockUrl);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("Request contains tools:"),
        "Array with 4 tools",
      );

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining("Found 3 tools with invalid schemas:"),
        expect.arrayContaining([
          expect.objectContaining({
            index: 1,
            reason: "input_schema.type is not 'object' (AI SDK v4 issue with Claude Sonnet 4)",
            value: "string",
            note: "See https://github.com/vercel/ai/issues/7333",
          }),
          expect.objectContaining({
            index: 2,
            reason: "custom.input_schema.type is not 'object'",
            value: "boolean",
          }),
          expect.objectContaining({
            index: 3,
            reason: "input_schema.type is not 'object' (AI SDK v4 issue with Claude Sonnet 4)",
            value: "array",
            note: "See https://github.com/vercel/ai/issues/7333",
          }),
        ]),
        expect.stringContaining("This is a known issue with AI SDK v4 and Claude Sonnet 4"),
      );
    });

    it("should handle tools as object instead of array", async () => {
      const consoleLogSpy = vi.spyOn(console, "log");
      const requestBody: PostRequestBody = {
        messages: [{ role: "user", content: "Hello" }],
        tools: {
          tool1: { input_schema: { type: "object" } },
          tool2: { input_schema: { type: "string" } },
        },
      };

      mockRequest = new Request("https://test.spike.land/api/post", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      await postHandler.handle(mockRequest, mockUrl);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("Request contains tools:"),
        "Object with keys: tool1, tool2",
      );
    });

    it("should not warn when no invalid tools are present", async () => {
      const consoleWarnSpy = vi.spyOn(console, "warn");
      const requestBody: PostRequestBody = {
        messages: [{ role: "user", content: "Hello" }],
        tools: [
          { name: "tool1", input_schema: { type: "object" } },
          {
            name: "tool2",
            custom: {
              input_schema: { type: "object" },
            },
          },
        ],
      };

      mockRequest = new Request("https://test.spike.land/api/post", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      await postHandler.handle(mockRequest, mockUrl);

      expect(consoleWarnSpy).not.toHaveBeenCalledWith(
        expect.stringContaining("Found"),
        expect.anything(),
      );
    });

    it("should handle stream errors", async () => {
      // Log spies
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(
        () => {},
      );

      // Override the default mock to reject when called
      vi.mocked(streamText).mockReset();
      vi.mocked(streamText).mockRejectedValue(new Error("Stream failed"));

      // Mock createAnthropic properly
      const anthropicProvider = vi.fn().mockReturnValue(
        "claude-4-sonnet-20250514",
      ) as unknown as AnthropicProvider;
      anthropicProvider.languageModel = vi.fn().mockReturnValue(
        "claude-4-sonnet-20250514",
      );
      anthropicProvider.chat = vi.fn();
      anthropicProvider.messages = vi.fn();
      anthropicProvider.tools = createMockTools();
      anthropicProvider.textEmbeddingModel = vi.fn();
      vi.mocked(createAnthropic).mockReturnValue(
        anthropicProvider as AnthropicProvider,
      );

      const requestBody: PostRequestBody = {
        messages: [{ role: "user", content: "Hello" }],
      };

      mockRequest = new Request("https://test.spike.land/api/post", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const response = await postHandler.handle(mockRequest, mockUrl);

      // Verify error was logged
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          "[AI Routes][test-uuid-123] Stream error details:",
        ),
        expect.objectContaining({
          message: "Stream failed",
        }),
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          "[AI Routes][test-uuid-123] Error handling message:",
        ),
        expect.any(Error),
      );

      expect(response.status).toBe(500);
      const body = await response.json() as { error: string; details?: string; };
      expect(body.error).toBe("Failed to process message");
      expect(body.details).toBe("Stream failed");

      consoleErrorSpy.mockRestore();
    });

    it.skip("should handle tool execution in onStepFinish", async () => {
      let onStepFinishCallback: Parameters<typeof streamText>[0]["onStepFinish"];
      vi.mocked(streamText).mockImplementation(
        (async (options: Parameters<typeof streamText>[0]) => {
          onStepFinishCallback = options.onStepFinish;
          return mockStreamResponse;
        }) as unknown as typeof streamText,
      );

      const requestBody: PostRequestBody = {
        messages: [{ role: "user", content: "Hello" }],
      };

      mockRequest = new Request("https://test.spike.land/api/post", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      await postHandler.handle(mockRequest, mockUrl);

      // Simulate tool execution
      await onStepFinishCallback!(
        {
          toolResults: [
            { toolCallId: "1", result: { output: "test" } },
          ],
          content: [],
          text: "",
          reasoning: [],
          reasoningText: "",
          files: [],
          sources: [],
          toolCalls: [],
          staticToolCalls: [],
          dynamicToolCalls: [],
          staticToolResults: [],
          dynamicToolResults: [],
          finishReason: "stop",
          usage: {},
          request: {},
          response: {},
          warnings: undefined,
          providerMetadata: undefined,
        } as unknown as MockStepResult,
      );

      expect(mockStorageService.saveRequestBody).toHaveBeenCalledTimes(2);
    });

    it.skip("should handle errors during tool result saving", async () => {
      const consoleErrorSpy = vi.spyOn(console, "error");
      let onStepFinishCallback: Parameters<typeof streamText>[0]["onStepFinish"];
      vi.mocked(streamText).mockImplementation(
        (async (options: Parameters<typeof streamText>[0]) => {
          onStepFinishCallback = options.onStepFinish;
          return mockStreamResponse;
        }) as unknown as typeof streamText,
      );

      // Make saveRequestBody fail on second call
      (mockStorageService.saveRequestBody as ReturnType<typeof vi.fn>)
        .mockResolvedValueOnce(undefined)
        .mockRejectedValueOnce(new Error("Storage failed"));

      const requestBody: PostRequestBody = {
        messages: [{ role: "user", content: "Hello" }],
      };

      mockRequest = new Request("https://test.spike.land/api/post", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      await postHandler.handle(mockRequest, mockUrl);

      // Simulate tool execution
      await onStepFinishCallback!(
        {
          toolResults: [
            { toolCallId: "1", result: { output: "test" } },
          ],
          content: [],
          text: "",
          reasoning: [],
          reasoningText: "",
          files: [],
          sources: [],
          toolCalls: [],
          staticToolCalls: [],
          dynamicToolCalls: [],
          staticToolResults: [],
          dynamicToolResults: [],
          finishReason: "stop",
          usage: {},
          request: {},
          response: {},
          warnings: undefined,
          providerMetadata: undefined,
        } as unknown as MockStepResult,
      );

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error saving messages after tool call:"),
        expect.any(Error),
      );
    });
  });
});

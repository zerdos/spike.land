import { type AnthropicProvider, createAnthropic } from "@ai-sdk/anthropic";
import type { R2Bucket } from "@cloudflare/workers-types";
import type { Message } from "@spike-npm-land/code";
import { type CoreMessage, streamText, type StreamTextResult } from "ai";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { z } from "zod";
import type { Code } from "../chatRoom";
import type Env from "../env";
import type { McpTool } from "../mcpServer";
import { StorageService } from "../services/storageService";
import type { PostRequestBody } from "../types/aiRoutes";
import { PostHandler } from "./postHandler";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StreamResult = StreamTextResult<any, unknown>;

// Mock all external dependencies
vi.mock("@ai-sdk/anthropic");
vi.mock("ai");
vi.mock("../services/storageService");

// Mock crypto.randomUUID
const mockRandomUUID = vi.fn(() => "test-uuid-123");
global.crypto = {
  randomUUID: mockRandomUUID,
} as unknown as Crypto;

// Helper function to create mock tools
const createMockTools = () => ({
  bash_20241022: vi.fn().mockReturnValue({
    type: "provider-defined",
    id: "anthropic.bash_20241022",
    args: {},
    parameters: {} as never,
    execute: vi.fn(),
  }),
  bash_20250124: vi.fn().mockReturnValue({
    type: "provider-defined",
    id: "anthropic.bash_20250124",
    args: {},
    parameters: {} as never,
    execute: vi.fn(),
  }),
  textEditor_20241022: vi.fn().mockReturnValue({
    type: "provider-defined",
    id: "anthropic.textEditor_20241022",
    args: {},
    parameters: {} as never,
    execute: vi.fn(),
  }),
  textEditor_20250124: vi.fn().mockReturnValue({
    type: "provider-defined",
    id: "anthropic.textEditor_20250124",
    args: {},
    parameters: {} as never,
    execute: vi.fn(),
  }),
  computer_20250124: vi.fn().mockReturnValue({
    type: "provider-defined",
    id: "anthropic.computer_20250124",
    args: {},
    parameters: {} as never,
    execute: vi.fn(),
  }),
  computer_20241022: vi.fn().mockReturnValue({
    type: "provider-defined",
    id: "anthropic.computer_20241022",
    args: {},
    parameters: {} as never,
    execute: vi.fn(),
  }),
});

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

    // Setup mock MCP server
    mockMcpServer = {
      tools: [
        {
          name: "read_code",
          description: "Read code",
          inputSchema: {
            type: "object",
            properties: {
              codeSpace: { type: "string" },
            },
            required: ["codeSpace"],
          },
        },
      ] as McpTool[],
    };

    // Setup mock Code instance
    mockCode = {
      getSession: vi.fn().mockReturnValue({
        codeSpace: "test-space",
      }),
      getMcpServer: vi.fn().mockReturnValue(mockMcpServer),
      getOrigin: vi.fn().mockReturnValue("https://test.spike.land"),
    } as unknown as Code;

    // Setup mock Env
    mockEnv = {
      ANTHROPIC_API_KEY: "test-api-key",
      R2: {} as unknown as R2Bucket,
    } as unknown as Env;

    // Setup mock StorageService
    mockStorageService = {
      saveRequestBody: vi.fn().mockResolvedValue(undefined),
      loadRequestBody: vi.fn().mockResolvedValue(null),
    } as unknown as StorageService;

    // Mock StorageService constructor
    vi.mocked(StorageService).mockImplementation(() => mockStorageService);

    // Setup mock URL
    mockUrl = new URL("https://test.spike.land/api/post");

    // Create PostHandler instance
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

    it("should warn about invalid tool schemas", async () => {
      const consoleWarnSpy = vi.spyOn(console, "warn");
      const requestBody: PostRequestBody = {
        messages: [{ role: "user", content: "Hello" }],
        tools: [
          { input_schema: { type: "string" } },
        ],
      };

      mockRequest = new Request("https://test.spike.land/api/post", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      await postHandler.handle(mockRequest, mockUrl);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'Found 1 tools with invalid input_schema.type="string"',
        ),
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

    it("should handle tool execution in onStepFinish", async () => {
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
          stepType: "tool-result",
          toolResults: [
            { toolCallId: "1", result: { output: "test" } },
          ] as Array<{ toolCallId: string; result: { output: string; }; }>,
        } as Parameters<NonNullable<Parameters<typeof streamText>[0]["onStepFinish"]>>[0],
      );

      expect(mockStorageService.saveRequestBody).toHaveBeenCalledTimes(2);
    });

    it("should handle errors during tool result saving", async () => {
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
          stepType: "tool-result",
          toolResults: [
            { toolCallId: "1", result: { output: "test" } },
          ] as Array<{ toolCallId: string; result: { output: string; }; }>,
        } as Parameters<NonNullable<Parameters<typeof streamText>[0]["onStepFinish"]>>[0],
      );

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error saving messages after tool call:"),
        expect.any(Error),
      );
    });
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

    it("should reject missing content", () => {
      const messages = [{ role: "user" }];
      expect(callValidateMessages(messages)).toBe(
        "Message at index 0 must have content",
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

  describe("convertMessages", () => {
    const callConvertMessages = (messages: Message[]) => {
      return (postHandler as unknown as {
        convertMessages: (messages: Message[]) => CoreMessage[];
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

      expect(result[0].content).toEqual([
        { type: "text", text: "Valid" },
        { type: "text", text: "[invalid content]" },
        { type: "text", text: "[unsupported content]" },
      ]);
    });

    it("should handle missing text in text parts", () => {
      const messages: Message[] = [
        {
          role: "user",
          content: [{ type: "text" } as { type: string; text?: string; }],
        },
      ];

      const result = callConvertMessages(messages);

      expect(result[0].content).toEqual([{ type: "text", text: "" }]);
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
  });

  describe("createErrorResponse", () => {
    const callCreateErrorResponse = (
      error: string,
      status: number,
      details?: string,
    ) => {
      return (postHandler as unknown as {
        createErrorResponse: (error: string, status: number, details?: string) => Response;
      }).createErrorResponse(error, status, details);
    };

    it("should create error response without details", () => {
      const response = callCreateErrorResponse("Test error", 400);

      expect(response.status).toBe(400);
      expect(response.headers.get("Content-Type")).toBe(
        "application/json; charset=UTF-8",
      );
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    });

    it("should create error response with details", async () => {
      const response = callCreateErrorResponse(
        "Test error",
        500,
        "Detailed info",
      );

      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body).toEqual({
        error: "Test error",
        details: "Detailed info",
      });
    });
  });

  describe("createSystemPrompt", () => {
    const callCreateSystemPrompt = (codeSpace: string) => {
      return (postHandler as unknown as { createSystemPrompt: (codeSpace: string) => string; })
        .createSystemPrompt(codeSpace);
    };

    it("should create system prompt with codeSpace", () => {
      const prompt = callCreateSystemPrompt("my-space");

      expect(prompt).toContain("CodeSpace: my-space");
      expect(prompt).toContain("React components");
      expect(prompt).toContain("Tailwind CSS");
      expect(prompt).toContain("dark/light mode");
    });
  });

  describe("getCorsHeaders", () => {
    const callGetCorsHeaders = () => {
      return (postHandler as unknown as { getCorsHeaders: () => Record<string, string>; })
        .getCorsHeaders();
    };

    it("should return CORS headers", () => {
      const headers = callGetCorsHeaders();

      expect(headers["Access-Control-Allow-Origin"]).toBe("*");
      expect(headers["Content-Type"]).toBe("application/json; charset=UTF-8");
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

  describe("isMessageContentPart", () => {
    const callIsMessageContentPart = (part: unknown) => {
      return (postHandler as unknown as { isMessageContentPart: (part: unknown) => boolean; })
        .isMessageContentPart(part);
    };

    it("should validate message content parts", () => {
      expect(callIsMessageContentPart({ type: "text" })).toBe(true);
      expect(callIsMessageContentPart({ type: "image" })).toBe(true);
      expect(callIsMessageContentPart({ notType: "text" })).toBe(false);
      expect(callIsMessageContentPart({ type: 123 })).toBe(false);
      expect(callIsMessageContentPart(null)).toBe(false);
      expect(callIsMessageContentPart("string")).toBe(false);
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

  describe("createStreamResponse", () => {
    it("should create stream with correct parameters", async () => {
      const messages = [{ role: "user" as const, content: "Hello" }];
      const tools: McpTool[] = mockMcpServer.tools;
      const body: PostRequestBody = { messages: [] };

      const mockToDataStreamResponse = vi.fn().mockReturnValue(
        new Response("stream"),
      );
      const mockStreamResponse = {
        toDataStreamResponse: mockToDataStreamResponse,
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

      await (postHandler as unknown as {
        createStreamResponse: (
          messages: CoreMessage[],
          tools: McpTool[],
          body: PostRequestBody,
          codeSpace: string,
          requestId: string,
        ) => Promise<Response>;
      }).createStreamResponse(
        messages,
        tools,
        body,
        "test-space",
        "req-123",
      );

      expect(createAnthropic).toHaveBeenCalledWith({
        baseURL: "https://test.spike.land/anthropic",
        apiKey: "will be added later",
      });

      expect(streamText).toHaveBeenCalledWith({
        model: "claude-4-sonnet-20250514",
        system: expect.stringContaining("CodeSpace: test-space"),
        messages,
        tools: tools.reduce((acc, tool) => {
          acc[tool.name] = {
            description: tool.description,
            parameters: expect.any(Object), // Zod schema object
            execute: expect.any(Function),
          };
          return acc;
        }, {} as Record<string, {
          description: string;
          parameters: z.ZodTypeAny;
          execute: (args: Record<string, unknown>) => Promise<Record<string, unknown>>;
        }>),
        toolChoice: "auto",
        maxSteps: 10,
        onStepFinish: expect.any(Function),
      });

      expect(mockToDataStreamResponse).toHaveBeenCalledWith({
        headers: expect.objectContaining({
          "Access-Control-Allow-Origin": "*",
        }),
        getErrorMessage: expect.any(Function),
      });
    });

    it("should handle getErrorMessage callback", async () => {
      const consoleErrorSpy = vi.spyOn(console, "error");
      let _capturedGetErrorMessageCallback: ((error: Error) => string) | undefined;

      const mockToDataStreamResponse = vi.fn().mockImplementation((options) => {
        _capturedGetErrorMessageCallback = options.getErrorMessage;
        return new Response("stream");
      });

      const mockStreamResponse = {
        toDataStreamResponse: mockToDataStreamResponse,
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

      await (postHandler as unknown as {
        createStreamResponse: (
          messages: CoreMessage[],
          tools: McpTool[],
          body: PostRequestBody,
          codeSpace: string,
          requestId: string,
        ) => Promise<Response>;
      }).createStreamResponse(
        [],
        [],
        { messages: [] },
        "test-space",
        "req-123",
      );

      // The getErrorMessage callback should have been captured during toDataStreamResponse call
      const capturedCall = mockToDataStreamResponse.mock.calls[0]?.[0];
      const errorCallback = capturedCall?.getErrorMessage;

      if (errorCallback) {
        const errorMessage = errorCallback(new Error("Test error"));
        expect(errorMessage).toBe("Streaming error: Test error");
      }
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "[AI Routes][req-123] Error during streaming:",
        expect.any(Error),
      );
    });
  });
});

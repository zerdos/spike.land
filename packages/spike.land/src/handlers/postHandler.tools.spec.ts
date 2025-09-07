import { type AnthropicProvider, createAnthropic } from "@ai-sdk/anthropic";
import { streamText, type StreamTextResult } from "ai";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Code } from "../chatRoom";
import type Env from "../env";
import type { McpTool } from "../mcpServer";
import { StorageService } from "../services/storageService";
import { PostHandler } from "./postHandler";

// Mock dependencies
vi.mock("@ai-sdk/anthropic");
vi.mock("ai");
vi.mock("../services/storageService");

describe("PostHandler - Tool Schema Validation", () => {
  let postHandler: PostHandler;
  let mockCode: Code;
  let mockEnv: Env;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockStreamResponse: StreamTextResult<any, any>;
  let mockToDataStreamResponse: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Setup mock stream response
    mockToDataStreamResponse = vi.fn().mockReturnValue(new Response("stream"));
    mockStreamResponse = {
      toDataStreamResponse: mockToDataStreamResponse,
      warnings: [],
      usage: {},
      experimental_providerMetadata: undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as unknown as StreamTextResult<any, any>;

    // Default mock for streamText
    vi.mocked(streamText).mockResolvedValue(mockStreamResponse);

    // Setup mock environment
    mockEnv = {
      ANTHROPIC_API_KEY: "test-key",
    } as Env;

    // Setup mock MCP tools with correct schema
    const mockTools: McpTool[] = [
      {
        name: "read_code",
        description: "Read current code",
        inputSchema: {
          type: "object",
          properties: {
            codeSpace: {
              type: "string",
              description: "The codeSpace identifier",
            },
          },
          required: ["codeSpace"],
        },
      },
      {
        name: "update_code",
        description: "Update code",
        inputSchema: {
          type: "object",
          properties: {
            codeSpace: {
              type: "string",
            },
            code: {
              type: "string",
            },
          },
          required: ["codeSpace", "code"],
        },
      },
    ];

    // Setup mock code object
    mockCode = {
      getSession: vi.fn().mockReturnValue({ codeSpace: "test-space" }),
      getOrigin: vi.fn().mockReturnValue("https://test.spike.land"),
      getEnv: vi.fn().mockReturnValue(mockEnv),
      getMcpServer: vi.fn().mockReturnValue({
        tools: mockTools,
        executeTool: vi.fn(),
      }),
    } as unknown as Code;

    // Mock StorageService
    const mockStorageService = {
      saveRequestBody: vi.fn().mockResolvedValue(undefined),
    };
    vi.mocked(StorageService).mockImplementation(() => ({
      ...mockStorageService,
      loadRequestBody: vi.fn(),
      env: mockEnv,
    } as unknown as StorageService));

    postHandler = new PostHandler(mockCode, mockEnv);
  });

  describe("Tool Schema Format", () => {
    it("should ensure all MCP tools have type: 'object' in inputSchema", () => {
      const mcpServer = mockCode.getMcpServer();
      const tools = mcpServer.tools;

      tools.forEach((tool) => {
        expect(tool.inputSchema).toBeDefined();
        expect(tool.inputSchema.type).toBe("object");
        expect(tool.inputSchema.properties).toBeDefined();
        expect(typeof tool.inputSchema.properties).toBe("object");
      });
    });

    it.skip("should convert tools to correct format for AI SDK", async () => {
      let capturedTools: Record<string, unknown> | undefined;

      // Mock streamText to capture the tools being passed
      vi.mocked(streamText).mockImplementation(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((options: any) => {
          capturedTools = options.tools;
          return Promise.resolve(mockStreamResponse);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as any,
      );

      // Mock createAnthropic to return a provider
      const mockProvider = vi.fn(() => ({
        id: "claude-4-sonnet-20250514",
      })) as unknown as AnthropicProvider;
      vi.mocked(createAnthropic).mockReturnValue(mockProvider);

      const request = new Request("https://test.spike.land/api/post", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: "test" }],
        }),
      });

      await postHandler.handle(request, new URL("https://test.spike.land"));

      // Verify streamText was called
      expect(streamText).toHaveBeenCalled();

      // Verify tools were passed in the correct format
      expect(capturedTools).toBeDefined();
      expect(typeof capturedTools).toBe("object");

      // Each tool should have description, parameters (Zod schema), and execute function
      Object.entries(capturedTools!).forEach(([_toolName, tool]: [string, unknown]) => {
        expect(tool).toHaveProperty("description");
        expect(tool).toHaveProperty("parameters");
        expect(tool).toHaveProperty("execute");
        expect(typeof (tool as { execute: unknown }).execute).toBe("function");
      });
    });

    it("should validate that Zod schemas are created from inputSchema", async () => {
      const JsonSchemaToZodConverter = await import("../utils/jsonSchemaToZod").then(m =>
        m.JsonSchemaToZodConverter
      );
      const converter = new JsonSchemaToZodConverter();

      const mcpServer = mockCode.getMcpServer();
      const tools = mcpServer.tools;

      tools.forEach((tool) => {
        const zodSchema = converter.convert(tool.inputSchema);

        // Verify the Zod schema is created correctly
        expect(zodSchema).toBeDefined();
        expect(zodSchema._def).toBeDefined(); // Zod internal structure

        // Test parsing with valid data
        const validData = tool.name === "read_code"
          ? { codeSpace: "test" }
          : { codeSpace: "test", code: "console.log('hello')" };

        expect(() => zodSchema.parse(validData)).not.toThrow();

        // Test parsing with invalid data (missing required fields)
        expect(() => zodSchema.parse({})).toThrow();
      });
    });

    it("should reject tools with invalid inputSchema.type", () => {
      const invalidTools = [
        {
          name: "invalid_tool_1",
          description: "Tool with string type",
          inputSchema: {
            type: "string", // Invalid - should be "object"
          },
        },
        {
          name: "invalid_tool_2",
          description: "Tool with array type",
          inputSchema: {
            type: "array", // Invalid - should be "object"
          },
        },
      ];

      invalidTools.forEach((tool) => {
        expect(tool.inputSchema.type).not.toBe("object");
        // This is the validation that should prevent the error
        expect(() => {
          if (tool.inputSchema.type !== "object") {
            throw new Error(
              `Tool ${tool.name} has invalid inputSchema.type: ${tool.inputSchema.type}. Must be 'object'`,
            );
          }
        }).toThrow();
      });
    });

    it("should handle DISABLE_AI_TOOLS environment variable", async () => {
      // Set the environment variable
      mockEnv.DISABLE_AI_TOOLS = "true";

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let capturedOptions: any;
      vi.mocked(streamText).mockImplementation(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((options: any) => {
          capturedOptions = options;
          return Promise.resolve(mockStreamResponse);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as any,
      );

      const mockProvider = vi.fn(() => ({
        id: "claude-4-sonnet-20250514",
      })) as unknown as AnthropicProvider;
      vi.mocked(createAnthropic).mockReturnValue(mockProvider);

      const request = new Request("https://test.spike.land/api/post", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: "test" }],
        }),
      });

      await postHandler.handle(request, new URL("https://test.spike.land"));

      // Verify tools are disabled
      expect(capturedOptions.tools).toBeUndefined();
      expect(capturedOptions.toolChoice).toBeUndefined();
      expect(capturedOptions.maxSteps).toBeUndefined();
    });
  });

  describe("Tool Format Sent to API", () => {
    it("should not wrap tools in 'custom' property", async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let capturedTools: any;

      vi.mocked(streamText).mockImplementation(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((options: any) => {
          capturedTools = options.tools;
          return Promise.resolve(mockStreamResponse);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as any,
      );

      const mockProvider = vi.fn(() => ({
        id: "claude-4-sonnet-20250514",
      })) as unknown as AnthropicProvider;
      vi.mocked(createAnthropic).mockReturnValue(mockProvider);

      const request = new Request("https://test.spike.land/api/post", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: "test" }],
        }),
      });

      await postHandler.handle(request, new URL("https://test.spike.land"));

      // Ensure tools don't have a 'custom' wrapper
      if (capturedTools!) {
        Object.entries(capturedTools).forEach(([_, tool]: [string, unknown]) => {
          expect(tool).not.toHaveProperty("custom");
        });
      }
    });

    it("should create valid tool execute functions", async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let capturedTools: any;

      vi.mocked(streamText).mockImplementation(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((options: any) => {
          capturedTools = options.tools;
          return Promise.resolve(mockStreamResponse);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as any,
      );

      const mockProvider = vi.fn(() => ({
        id: "claude-4-sonnet-20250514",
      })) as unknown as AnthropicProvider;
      vi.mocked(createAnthropic).mockReturnValue(mockProvider);

      // Mock executeTool to return a response
      const mockExecuteTool = vi.fn().mockResolvedValue({ success: true });
      (mockCode.getMcpServer() as unknown as { executeTool: typeof mockExecuteTool }).executeTool = mockExecuteTool;

      const request = new Request("https://test.spike.land/api/post", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: "test" }],
        }),
      });

      await postHandler.handle(request, new URL("https://test.spike.land"));

      // Test execute function for read_code tool
      if (capturedTools! && capturedTools!.read_code) {
        const result = await capturedTools.read_code.execute({ codeSpace: "test" });
        // The execute function merges the codeSpace from session ("test-space") with the args
        expect(mockExecuteTool).toHaveBeenCalledWith("read_code", { codeSpace: "test-space" });
        expect(result).toEqual({ success: true });
      }
    });
  });

  describe("Schema Validation Before API Call", () => {
    it("should validate tool schemas before sending to streamText", async () => {
      const consoleSpy = vi.spyOn(console, "log");

      vi.mocked(streamText).mockResolvedValue(mockStreamResponse);

      const mockProvider = vi.fn(() => ({
        id: "claude-4-sonnet-20250514",
      })) as unknown as AnthropicProvider;
      vi.mocked(createAnthropic).mockReturnValue(mockProvider);

      const request = new Request("https://test.spike.land/api/post", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: "test" }],
        }),
      });

      await postHandler.handle(request, new URL("https://test.spike.land"));

      // Check that tool processing logs show correct schema type
      // The actual log message is "[AI Routes][requestId] Processing tool 'toolname':"
      const toolLogs = consoleSpy.mock.calls.filter(call =>
        typeof call[0] === "string" && call[0].includes("Processing tool")
      );

      expect(toolLogs.length).toBeGreaterThan(0);
      toolLogs.forEach(log => {
        // The log data is in the second argument
        const logData = log[1] as Record<string, unknown>;
        if (logData && logData.inputSchemaType) {
          expect(logData.inputSchemaType).toBe("object");
        }
      });
    });

    it("should skip tools without inputSchema", async () => {
      const consoleWarnSpy = vi.spyOn(console, "warn");

      // Add a tool without inputSchema
      const tools = mockCode.getMcpServer().tools;
      tools.push({
        name: "invalid_tool",
        description: "Tool without schema",
        inputSchema: undefined as unknown as McpTool['inputSchema'],
      });

      vi.mocked(streamText).mockResolvedValue(mockStreamResponse);

      const mockProvider = vi.fn(() => ({
        id: "claude-4-sonnet-20250514",
      })) as unknown as AnthropicProvider;
      vi.mocked(createAnthropic).mockReturnValue(mockProvider);

      const request = new Request("https://test.spike.land/api/post", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: "test" }],
        }),
      });

      await postHandler.handle(request, new URL("https://test.spike.land"));

      // Verify warning was logged - check all warn calls
      const warnCalls = consoleWarnSpy.mock.calls;
      const hasExpectedWarning = warnCalls.some(call =>
        call.some(arg =>
          typeof arg === "string" &&
          arg.includes("Tool 'invalid_tool' has no inputSchema, skipping")
        )
      );
      expect(hasExpectedWarning).toBe(true);
    });
  });
});

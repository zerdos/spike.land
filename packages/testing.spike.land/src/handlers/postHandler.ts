import { createAnthropic } from "@ai-sdk/anthropic";
import { jsonSchema as aiJsonSchema, streamText, tool } from "ai";
import type { ModelMessage } from "ai";
import type { Code } from "../chatRoom";
import type Env from "../env";
import type { McpTool } from "../mcp";
import { StorageService } from "../services/storageService";
import type {
  ErrorResponse,
  JsonSchemaObject,
  MessageContentPart,
  PostRequestBody,
  ToolDefinition,
} from "../types/aiRoutes";
import { DEFAULT_CORS_HEADERS, isMessageContentPart } from "../types/aiRoutes";

// Constants for validation
const MAX_MESSAGE_LENGTH = 100000; // 100KB per message
const MAX_MESSAGES_COUNT = 100;
const VALID_ROLES = ["user", "assistant", "system"] as const;
type ValidRole = typeof VALID_ROLES[number];

// Types for message formats
interface MessagePart {
  type: string;
  text?: string;
  url?: string;
  image?: string;
  image_url?: {
    url: string;
  };
}

interface MessageWithParts {
  role: string;
  id?: string;
  parts?: MessagePart[];
  content?: string | MessageContentPart[];
}

type CoreMessage = ModelMessage;

/**
 * Type for the processed tools record
 * The AI SDK's ToolSet type uses `any` internally for flexibility with various tool configurations.
 * We use a compatible type here to avoid type conflicts while maintaining type safety in our code.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ProcessedToolsRecord = Record<string, ReturnType<typeof tool<any, any>>>;

/**
 * Type guard for tool validation - checks if a tool has valid input schema format
 */
interface ToolWithInputSchema {
  input_schema?: JsonSchemaObject;
  custom?: {
    input_schema?: JsonSchemaObject;
  };
}

/**
 * Validates that a tool's input_schema has type: "object" as required by Anthropic API
 */
function hasValidInputSchemaType(toolObj: ToolWithInputSchema): boolean {
  // Check direct input_schema
  if (toolObj.input_schema && typeof toolObj.input_schema === "object") {
    if (toolObj.input_schema.type !== "object") {
      return false;
    }
  }

  // Check custom.input_schema (AI SDK format)
  if (toolObj.custom?.input_schema && typeof toolObj.custom.input_schema === "object") {
    if (toolObj.custom.input_schema.type !== "object") {
      return false;
    }
  }

  return true;
}

/**
 * Type guard for checking if an object is a valid tool definition
 */
function isToolDefinition(value: unknown): value is ToolDefinition {
  if (value === null || typeof value !== "object") {
    return false;
  }

  const obj = value as Record<string, unknown>;

  // A tool definition should have at least input_schema or custom with input_schema
  const hasInputSchema = "input_schema" in obj && obj.input_schema !== null;
  const hasCustomInputSchema = "custom" in obj &&
    typeof obj.custom === "object" &&
    obj.custom !== null &&
    "input_schema" in (obj.custom as Record<string, unknown>);

  return hasInputSchema || hasCustomInputSchema;
}

/**
 * Information about an invalid tool for logging
 */
interface InvalidToolInfo {
  index: number;
  reason: string;
  value: unknown;
  note?: string;
}

export class PostHandler {
  private storageService: StorageService;

  constructor(
    private code: Code,
    private env: Env,
  ) {
    this.storageService = new StorageService(env);
  }

  async handle(request: Request, _url: URL): Promise<Response> {
    const requestId = crypto.randomUUID();

    try {
      // Log incoming request details for debugging
      console.log(`[AI Routes][${requestId}] Incoming request:`, {
        method: request.method,
        url: request.url,
        contentType: request.headers.get("content-type"),
        contentLength: request.headers.get("content-length"),
      });

      // Validate request size
      const contentLength = request.headers.get("content-length");
      if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) { // 10MB limit
        return this.createErrorResponse("Request too large", 413);
      }

      const body = await this.parseRequestBody(request);

      // Validate and clean tools in the request body
      // NOTE: There's a known issue with AI SDK v4 when using Claude Sonnet 4
      // The tool() helper generates input_schema.type: "string" instead of "object"
      // See: https://github.com/vercel/ai/issues/7333
      // Workaround: Use direct JSON schema format instead of the tool() helper
      if (body.tools) {
        console.log(
          `[AI Routes][${requestId}] Request contains tools:`,
          Array.isArray(body.tools)
            ? `Array with ${body.tools.length} tools`
            : `Object with keys: ${Object.keys(body.tools).join(", ")}`,
        );

        // Check for various invalid tool formats and clean them
        if (Array.isArray(body.tools)) {
          const invalidTools = this.validateToolsArray(body.tools);

          if (invalidTools.length > 0) {
            console.warn(
              `[AI Routes][${requestId}] Found ${invalidTools.length} tools with invalid schemas:`,
              invalidTools,
              "\nThis is a known issue with AI SDK v4 and Claude Sonnet 4. Tools should use direct JSON schema format instead of the tool() helper.",
            );
          }
        }
      }

      // We ignore tools from the request body and only use MCP-generated tools
      console.log(
        `[AI Routes][${requestId}] Ignoring tools from request body, will use MCP-generated tools instead.`,
      );

      // Validate messages
      const validationError = this.validateMessages(body.messages);
      if (validationError) {
        return this.createErrorResponse(validationError, 400);
      }

      const codeSpace = this.code.getSession().codeSpace;
      const messages = this.convertMessages(body.messages as MessageWithParts[]);

      await this.storageService.saveRequestBody(codeSpace, body);

      if (!this.env.ANTHROPIC_API_KEY) {
        return this.createErrorResponse(
          "ANTHROPIC_API_KEY not configured. Please add your API key to .dev.vars file.",
          503,
        );
      }

      // Generate tools with error handling

      const tools = this.code.getMcpServer().tools;

      // Remove tools from body to ensure we only use MCP-generated tools
      const bodyWithoutTools = { ...body };
      delete bodyWithoutTools.tools;

      return await this.createStreamResponse(
        messages,
        tools,
        bodyWithoutTools,
        codeSpace,
        requestId,
      );
    } catch (error) {
      console.error(`[AI Routes][${requestId}] Error handling message:`, error);
      return this.createErrorResponse(
        "Failed to process message",
        500,
        error instanceof Error ? error.message : "Unknown error",
      );
    }
  }

  /**
   * Validates an array of tools and returns information about invalid ones
   */
  private validateToolsArray(tools: unknown[]): InvalidToolInfo[] {
    const invalidTools: InvalidToolInfo[] = [];

    tools.forEach((toolItem: unknown, index: number) => {
      if (!isToolDefinition(toolItem)) {
        return;
      }

      const toolObj = toolItem as ToolWithInputSchema;

      // Check for custom.input_schema pattern (AI SDK format)
      if (toolObj.custom?.input_schema) {
        if (!hasValidInputSchemaType({ custom: { input_schema: toolObj.custom.input_schema } })) {
          invalidTools.push({
            index,
            reason: "custom.input_schema.type is not 'object'",
            value: toolObj.custom.input_schema.type,
          });
        }
      }

      // Check for direct input_schema pattern
      if (toolObj.input_schema) {
        if (!hasValidInputSchemaType({ input_schema: toolObj.input_schema })) {
          invalidTools.push({
            index,
            reason: "input_schema.type is not 'object' (AI SDK v4 issue with Claude Sonnet 4)",
            value: toolObj.input_schema.type,
            note: "See https://github.com/vercel/ai/issues/7333",
          });
        }
      }
    });

    return invalidTools;
  }

  private async parseRequestBody(request: Request): Promise<PostRequestBody> {
    try {
      return await request.json();
    } catch (parseError) {
      console.error("[AI Routes] Failed to parse request body:", parseError);
      throw new Error(
        `Invalid JSON in request body: ${
          parseError instanceof Error
            ? parseError.message
            : "Unknown parse error"
        }`,
      );
    }
  }

  private validateMessages(messages: unknown): string | null {
    if (!messages || !Array.isArray(messages)) {
      return "Messages must be an array";
    }

    if (messages.length === 0) {
      return "Messages array cannot be empty";
    }

    if (messages.length > MAX_MESSAGES_COUNT) {
      return `Too many messages. Maximum allowed: ${MAX_MESSAGES_COUNT}`;
    }

    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];

      if (!msg || typeof msg !== "object") {
        return `Message at index ${i} must be an object`;
      }

      const typedMsg = msg as Record<string, unknown>;

      if (
        !typedMsg.role || typeof typedMsg.role !== "string" ||
        !VALID_ROLES.includes(typedMsg.role as ValidRole)
      ) {
        return `Message at index ${i} must have a valid role (${VALID_ROLES.join(", ")})`;
      }

      // Support both 'content' and 'parts' fields
      const hasContent = typedMsg.content !== undefined;
      const hasParts = typedMsg.parts !== undefined;

      if (!hasContent && !hasParts) {
        return `Message at index ${i} must have either 'content' or 'parts'`;
      }

      // Check message size
      const messageSize = JSON.stringify(typedMsg).length;
      if (messageSize > MAX_MESSAGE_LENGTH) {
        return `Message at index ${i} exceeds maximum size limit`;
      }

      // Validate content structure if present
      if (hasContent) {
        if (
          typeof typedMsg.content !== "string" && !Array.isArray(typedMsg.content)
        ) {
          return `Message at index ${i} content must be a string or array`;
        }

        if (Array.isArray(typedMsg.content)) {
          for (let j = 0; j < typedMsg.content.length; j++) {
            const part = typedMsg.content[j];
            if (!part || typeof part !== "object" || !("type" in part)) {
              return `Message at index ${i}, content part ${j} must have a type`;
            }
          }
        }
      }

      // Validate parts structure if present
      if (hasParts) {
        if (!Array.isArray(typedMsg.parts)) {
          return `Message at index ${i} parts must be an array`;
        }

        for (let j = 0; j < typedMsg.parts.length; j++) {
          const part = typedMsg.parts[j];
          if (!part || typeof part !== "object" || !("type" in part)) {
            return `Message at index ${i}, part ${j} must have a type`;
          }
        }
      }
    }

    return null;
  }

  private isValidRole(role: unknown): role is ValidRole {
    return typeof role === "string" && VALID_ROLES.includes(role as ValidRole);
  }

  private convertMessages(messages: MessageWithParts[]): CoreMessage[] {
    return messages.map((msg: MessageWithParts): CoreMessage => {
      if (!this.isValidRole(msg.role)) {
        throw new Error(`Invalid role: ${msg.role}`);
      }

      const validRole = msg.role as ValidRole;

      // Handle messages with 'parts' field (frontend format)
      if (msg.parts && Array.isArray(msg.parts)) {
        const content = msg.parts.map((part: MessagePart) => {
          if (part.type === "text") {
            return { type: "text" as const, text: part.text || "" };
          }
          if (part.type === "image" || part.type === "image_url") {
            const url = part.image_url?.url || part.url || part.image;
            if (url) {
              return { type: "image" as const, image: url };
            }
          }
          return { type: "text" as const, text: "[unsupported content]" };
        });

        return {
          role: validRole,
          content: content.length === 1 && content[0]?.type === "text"
            ? content[0].text
            : content,
        } as CoreMessage;
      }

      // Handle messages with 'content' field (standard format)
      if (typeof msg.content === "string") {
        return {
          role: validRole,
          content: msg.content,
        } as CoreMessage;
      }

      if (Array.isArray(msg.content)) {
        return {
          role: validRole,
          content: msg.content.map((part: unknown) => {
            if (!isMessageContentPart(part)) {
              return { type: "text", text: "[invalid content]" };
            }

            if (part.type === "text") {
              return { type: "text", text: part.text || "" };
            }
            if (part.type === "image_url" && part.image_url) {
              return { type: "image", image: part.image_url.url };
            }
            return { type: "text", text: "[unsupported content]" };
          }),
        } as CoreMessage;
      }

      // Fallback for unexpected content types
      return {
        role: validRole,
        content: "[invalid content format]",
      } as CoreMessage;
    });
  }

  private async createStreamResponse(
    messages: ModelMessage[],
    tools: McpTool[],
    body: PostRequestBody,
    codeSpace: string,
    requestId: string,
  ): Promise<Response> {
    const origin = this.code.getOrigin();
    const systemPrompt = this.createSystemPrompt(codeSpace);
    const anthropic = createAnthropic({
      baseURL: `${origin}/anthropic`,
      apiKey: `will be added later`,
    });

    // Log message count and types instead of full content for privacy
    const messageSummary = messages.map((m) => ({
      role: m.role,
      contentLength: typeof m.content === "string"
        ? m.content.length
        : m.content.length,
    }));
    console.log(
      `[AI Routes][${requestId}] Creating stream with ${messages.length} messages, summary:`,
      messageSummary,
    );

    // Create a copy of messages to avoid mutation
    const messagesCopy = JSON.parse(JSON.stringify(body.messages));
    let streamError: Error | null = null;

    try {
      // Log tools structure for debugging
      console.log(
        `[AI Routes][${requestId}] Processing ${tools.length} tools for streaming`,
      );

      const processedTools = this.processTools(tools, codeSpace, requestId);

      // Check if we should disable tools due to AI SDK compatibility issues
      const disableTools = this.env.DISABLE_AI_TOOLS === "true";

      if (disableTools) {
        console.warn(
          `[AI Routes][${requestId}] AI tools are disabled via DISABLE_AI_TOOLS environment variable`,
        );
      }

      // Log the tools being sent to debug the format issue
      if (!disableTools && processedTools) {
        console.log(
          `[AI Routes][${requestId}] Sending tools to streamText:`,
          JSON.stringify(Object.keys(processedTools)),
        );

        // Enable debug mode for Anthropic proxy if needed
        if (this.env.DEBUG_ANTHROPIC_PROXY === "true") {
          console.log(
            `[AI Routes][${requestId}] Full tools object:`,
            JSON.stringify(processedTools, (key, value) => {
              if (key === "execute" || key === "parameters") {
                return "[Function/Schema]";
              }
              return value;
            }, 2),
          );
        }
      }

      const result = await streamText({
        model: anthropic("claude-4-sonnet-20250514"),
        system: systemPrompt,
        messages,
        tools: disableTools ? undefined : processedTools,
        toolChoice: disableTools ? undefined : "auto",
        // maxSteps: disableTools ? undefined : 10,
        onStepFinish: disableTools ? undefined : async (stepResult) => {
          if (stepResult.toolResults && stepResult.toolResults.length > 0) {
            try {
              // Work with the copy instead of mutating the original
              // The AI SDK returns toolResults with various structures depending on the tool
              const toolMessages = stepResult.toolResults.map(
                (result: unknown) => ({
                  role: "assistant" as const,
                  content: JSON.stringify(result),
                }),
              );

              messagesCopy.push(...toolMessages);

              // Save the updated copy
              await this.storageService.saveRequestBody(codeSpace, {
                ...body,
                messages: messagesCopy,
              });
            } catch (error) {
              console.error(
                `[AI Routes][${requestId}] Error saving messages after tool call:`,
                error,
              );
              // Store the error to be handled after stream creation
              streamError = error instanceof Error
                ? error
                : new Error("Failed to save tool results");
            }
          }
        },
      });

      // If there was an error during streaming, we should handle it appropriately
      if (streamError) {
        console.warn(
          `[AI Routes][${requestId}] Stream completed with errors during tool execution`,
        );
      }

      // Use the appropriate streaming response method
      if (typeof result?.toUIMessageStreamResponse === "function") {
        return result.toUIMessageStreamResponse({
          headers: this.getCorsHeaders(),
        });
      }

      // Fallback to text stream for simpler responses
      if (typeof result?.toTextStreamResponse === "function") {
        return result.toTextStreamResponse({
          headers: this.getCorsHeaders(),
        });
      }

      // If no methods are available, return a fallback response
      return new Response(JSON.stringify({ error: "Streaming not supported" }), {
        status: 500,
        headers: this.getCorsHeaders(),
      });

      // If no methods are available, we have an issue
      console.error(`[AI Routes][${requestId}] No streaming methods available on result`);
      throw new Error("Streaming methods not available on streamText result");
    } catch (streamErrorCaught) {
      console.error(`[AI Routes][${requestId}] Stream error details:`, {
        message: streamErrorCaught instanceof Error
          ? streamErrorCaught.message
          : "Unknown error",
        stack: streamErrorCaught instanceof Error ? streamErrorCaught.stack : undefined,
      });
      throw streamErrorCaught;
    }
  }

  /**
   * Process MCP tools into AI SDK compatible format
   */
  private processTools(
    tools: McpTool[],
    codeSpace: string,
    requestId: string,
  ): ProcessedToolsRecord {
    return tools.reduce<ProcessedToolsRecord>((acc, mcpTool) => {
      if (!mcpTool.inputSchema) {
        console.warn(
          `[AI Routes][${requestId}] Tool '${mcpTool.name}' has no inputSchema, skipping`,
        );
        return acc;
      }

      // Log the tool structure for debugging
      console.log(
        `[AI Routes][${requestId}] Processing tool '${mcpTool.name}':`,
        {
          hasInputSchema: !!mcpTool.inputSchema,
          inputSchemaType: mcpTool.inputSchema?.type,
          inputSchemaKeys: mcpTool.inputSchema ? Object.keys(mcpTool.inputSchema) : [],
        },
      );

      // Validate that the inputSchema has type: 'object'
      if (mcpTool.inputSchema.type !== "object") {
        console.error(
          `[AI Routes][${requestId}] Tool '${mcpTool.name}' has invalid inputSchema.type: '${mcpTool.inputSchema.type}', expected 'object'`,
        );
        return acc;
      }

      // Use AI SDK's jsonSchema helper to create a schema from our JSON Schema
      // Cast to JSONSchema7 format which is what the AI SDK expects
      // The McpTool inputSchema is compatible with JSON Schema 7
      const inputSchema = mcpTool.inputSchema as {
        type: string;
        properties: Record<string, Record<string, unknown>>;
        required?: string[];
      };

      const schemaDefinition = aiJsonSchema<Record<string, unknown>>({
        type: inputSchema.type,
        properties: inputSchema.properties,
        required: inputSchema.required,
      });

      // Create the tool - using AI SDK's tool() with JSON Schema
      const mcpServerRef = this.code.getMcpServer();
      const toolName = mcpTool.name;

      // Create the tool using the AI SDK's tool() function
      const aiTool = tool({
        description: mcpTool.description,
        parameters: schemaDefinition,
        execute: async (args: Record<string, unknown>) => {
          try {
            const response = await mcpServerRef.executeTool(
              toolName,
              { ...args, codeSpace },
            );
            return response;
          } catch (error) {
            console.error(
              `[AI Routes][${requestId}] Error executing tool ${toolName}:`,
              error,
            );
            throw new Error(
              `Failed to execute tool ${toolName}: ${
                error instanceof Error ? error.message : "Unknown error"
              }`,
            );
          }
        },
      });

      acc[mcpTool.name] = aiTool;
      return acc;
    }, {});
  }

  private getCorsHeaders(): Record<string, string> {
    // Use the default CORS headers or create comprehensive ones
    return DEFAULT_CORS_HEADERS || {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    };
  }

  private createSystemPrompt(codeSpace: string): string {
    return `You are an AI assistant specializing in helping users modify and improve React components in an online code editor. Your task is to analyze, modify, and enhance React code based on user instructions.

## Current context:
- CodeSpace: ${codeSpace}
- Working with React components using JSX syntax with default exports
- Use Tailwind CSS, shadcn-ui for styling
- Implement responsive design
- Support dark/light mode using useDarkMode hook and ThemeToggle component
- Use ImageLoader component for generated images

## Process:
1. First use read_code to understand the current code
2. Make necessary modifications using edit_code, update_code, or search_and_replace
3. When all modifications are complete, provide a brief summary`;
  }

  private createErrorResponse(
    error: string,
    status: number,
    details?: string,
  ): Response {
    const errorResponse: ErrorResponse = { error };
    if (details) {
      errorResponse.details = details;
    }

    return new Response(JSON.stringify(errorResponse), {
      status,
      headers: this.getCorsHeaders(),
    });
  }
}

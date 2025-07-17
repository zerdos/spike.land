import { createAnthropic } from "@ai-sdk/anthropic";
import type { Message } from "@spike-npm-land/code";
import { streamText } from "ai";
import type { CoreMessage } from "ai";
import type { Code } from "../chatRoom";
import type Env from "../env";
import type { McpTool } from "../mcpServer";
import { StorageService } from "../services/storageService";
import type { ErrorResponse, MessageContentPart, PostRequestBody } from "../types/aiRoutes";
import { DEFAULT_CORS_HEADERS } from "../types/aiRoutes";

// Constants for validation
const MAX_MESSAGE_LENGTH = 100000; // 100KB per message
const MAX_MESSAGES_COUNT = 100;
const VALID_ROLES = ["user", "assistant", "system"] as const;
type ValidRole = typeof VALID_ROLES[number];

export class PostHandler {
  private storageService: StorageService;

  constructor(
    private code: Code,
    private env: Env,
  ) {
    this.storageService = new StorageService(env);
  }

  async handle(request: Request, url: URL): Promise<Response> {
    const requestId = crypto.randomUUID();

    try {
      // Validate request size
      const contentLength = request.headers.get("content-length");
      if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) { // 10MB limit
        return this.createErrorResponse("Request too large", 413);
      }

      const body = await this.parseRequestBody(request);

      // Log if tools are present in the request
      if (body.tools) {
        console.log(
          `[AI Routes][${requestId}] Request contains tools:`,
          Array.isArray(body.tools)
            ? `Array with ${body.tools.length} tools`
            : `Object with keys: ${Object.keys(body.tools).join(", ")}`,
        );

        // If tools are provided as an array with invalid schemas, log warning
        if (Array.isArray(body.tools)) {
          const invalidTools = body.tools.filter((tool: any) =>
            tool?.input_schema?.type === "string"
          );
          if (invalidTools.length > 0) {
            console.warn(
              `[AI Routes][${requestId}] Found ${invalidTools.length} tools with invalid input_schema.type="string". These will be ignored.`,
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
      const messages = this.convertMessages(body.messages);

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

  private async parseRequestBody(request: Request): Promise<PostRequestBody> {
    try {
      return await request.json();
    } catch (parseError) {
      console.error("[AI Routes] Failed to parse request body:", parseError);
      throw new Error(
        `Invalid JSON in request body: ${
          parseError instanceof Error ? parseError.message : "Unknown parse error"
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

      if (!typedMsg.content) {
        return `Message at index ${i} must have content`;
      }

      // Check message size
      const messageSize = JSON.stringify(typedMsg).length;
      if (messageSize > MAX_MESSAGE_LENGTH) {
        return `Message at index ${i} exceeds maximum size limit`;
      }

      // Validate content structure
      if (typeof typedMsg.content !== "string" && !Array.isArray(typedMsg.content)) {
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

    return null;
  }

  private isValidRole(role: unknown): role is ValidRole {
    return typeof role === "string" && VALID_ROLES.includes(role as ValidRole);
  }

  private isMessageContentPart(part: unknown): part is MessageContentPart {
    return (
      part !== null &&
      typeof part === "object" &&
      "type" in part &&
      typeof part.type === "string"
    );
  }

  private convertMessages(messages: Message[]): CoreMessage[] {
    return messages.map((msg: Message) => {
      if (!this.isValidRole(msg.role)) {
        throw new Error(`Invalid role: ${msg.role}`);
      }

      const validRole = msg.role as ValidRole;

      if (typeof msg.content === "string") {
        return {
          role: validRole,
          content: msg.content,
        };
      }

      if (Array.isArray(msg.content)) {
        return {
          role: validRole,
          content: msg.content.map((part: unknown) => {
            if (!this.isMessageContentPart(part)) {
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
        };
      }

      // Fallback for unexpected content types
      return {
        role: validRole,
        content: "[invalid content format]",
      };
    });
  }

  private async createStreamResponse(
    messages: CoreMessage[],
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
    const messageSummary = messages.map(m => ({
      role: m.role,
      contentLength: typeof m.content === "string" ? m.content.length : m.content.length,
    }));
    console.log(
      `[AI Routes][${requestId}] Creating stream with ${messages.length} messages, summary:`,
      messageSummary,
    );

    // Create a copy of messages to avoid mutation
    const messagesCopy = JSON.parse(JSON.stringify(body.messages));
    let streamError: Error | null = null;

    try {
      const result = await streamText({
        model: anthropic("claude-4-sonnet-20250514"),
        system: systemPrompt,
        messages,
        tools: tools as unknown as any,
        toolChoice: "auto",
        maxSteps: 10,
        onStepFinish: async ({ stepType, toolResults }) => {
          if (stepType === "tool-result" && toolResults) {
            try {
              // Work with the copy instead of mutating the original
              const toolMessages = toolResults.map((result) => ({
                role: "assistant" as const,
                content: JSON.stringify(result),
              }));

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

      return result.toDataStreamResponse({
        headers: this.getCorsHeaders(),
        getErrorMessage: (error) => {
          console.error(`[AI Routes][${requestId}] Error during streaming:`, error);
          return `Streaming error: ${error instanceof Error ? error.message : "Unknown error"}`;
        },
      });
    } catch (streamError) {
      console.error(`[AI Routes][${requestId}] Stream error details:`, {
        message: streamError instanceof Error ? streamError.message : "Unknown error",
        stack: streamError instanceof Error ? streamError.stack : undefined,
      });
      throw streamError;
    }
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

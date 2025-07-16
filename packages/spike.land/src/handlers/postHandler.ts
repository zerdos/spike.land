import { createAnthropic } from "@ai-sdk/anthropic";
import type { Message } from "@spike-npm-land/code";
import { streamText } from "ai";
import type { CoreMessage } from "ai";
import type { Code } from "../chatRoom";
import type Env from "../env";
import { StorageService } from "../services/storageService";
import { ToolService, type AiSdkTool } from "../services/toolService";
import type { PostRequestBody, MessageContentPart, ErrorResponse } from "../types/aiRoutes";
import { DEFAULT_CORS_HEADERS } from "../types/aiRoutes";

export class PostHandler {
  private storageService: StorageService;
  private toolService: ToolService;

  constructor(
    private code: Code,
    private env: Env,
  ) {
    this.storageService = new StorageService(env);
    this.toolService = new ToolService(code);
  }

  async handle(request: Request, url: URL): Promise<Response> {
    try {
      const body = await this.parseRequestBody(request);
      if (!body.messages) {
        return this.createErrorResponse("Messages is required", 400);
      }

      const codeSpace = this.code.getSession().codeSpace;
      const messages = this.convertMessages(body.messages);

      await this.storageService.saveRequestBody(codeSpace, body);

      if (!this.env.ANTHROPIC_API_KEY) {
        return this.createErrorResponse(
          "ANTHROPIC_API_KEY not configured. Please add your API key to .dev.vars file.",
          503
        );
      }

      const mcpServer = this.code.getMcpServer();
      const tools = this.toolService.generateToolsFromMcp(mcpServer, url.origin);

      console.log("[AI Routes] Generated tools from MCP server:", Object.keys(tools));

      return this.createStreamResponse(messages, tools, body, codeSpace);
    } catch (error) {
      console.error("Error handling message:", error);
      return this.createErrorResponse(
        "Failed to process message",
        500,
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }

  private async parseRequestBody(request: Request): Promise<PostRequestBody> {
    try {
      return await request.json();
    } catch (parseError) {
      console.error("[AI Routes] Failed to parse request body:", parseError);
      throw new Error(`Invalid JSON in request body: ${parseError instanceof Error ? parseError.message : "Unknown parse error"}`);
    }
  }

  private convertMessages(messages: Message[]): CoreMessage[] {
    return messages.map((msg: Message) => {
      if (typeof msg.content === "string") {
        return {
          role: msg.role as "user" | "assistant" | "system",
          content: msg.content,
        };
      }
      
      return {
        role: msg.role as "user" | "assistant" | "system",
        content: (msg.content as MessageContentPart[]).map(
          (part: MessageContentPart) => {
            if (part.type === "text") {
              return { type: "text", text: part.text || "" };
            }
            if (part.type === "image_url" && part.image_url) {
              return { type: "image", image: part.image_url.url };
            }
            return { type: "text", text: "[unsupported content]" };
          },
        ),
      };
    });
  }

  private async createStreamResponse(
    messages: CoreMessage[],
    tools: Record<string, AiSdkTool>,
    body: PostRequestBody,
    codeSpace: string
  ): Promise<Response> {
    const systemPrompt = this.createSystemPrompt(codeSpace);
    const anthropic = createAnthropic({
      apiKey: this.env.ANTHROPIC_API_KEY
    });

    console.log("[AI Routes] Creating stream with", messages.length, "messages");
    console.log("[AI Routes] Messages:", JSON.stringify(messages, null, 2));

    try {
      const result = streamText({
        model: anthropic('claude-4-sonnet-20250514'),
        system: systemPrompt,
        messages,
        tools,
        toolChoice: "auto",
        maxSteps: 10,
        onStepFinish: async ({ stepType, toolResults }) => {
          if (stepType === "tool-result" && toolResults) {
            try {
              body.messages.push(...toolResults.map((result) => ({
                role: "assistant" as const,
                content: JSON.stringify(result),
              })));

              await this.storageService.saveRequestBody(codeSpace, body);
            } catch (error) {
              console.error("Error saving messages after tool call:", error);
            }
          }
        },
      });

      return result.toDataStreamResponse({
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (streamError) {
      console.error("[AI Routes] Stream error details:", {
        message: streamError instanceof Error ? streamError.message : "Unknown error",
        stack: streamError instanceof Error ? streamError.stack : undefined,
        error: streamError
      });
      throw streamError;
    }
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
    details?: string
  ): Response {
    const errorResponse: ErrorResponse = { error };
    if (details) {
      errorResponse.details = details;
    }

    return new Response(JSON.stringify(errorResponse), {
      status,
      headers: DEFAULT_CORS_HEADERS,
    });
  }
}
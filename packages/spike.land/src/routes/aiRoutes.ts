import { createAnthropic } from "@ai-sdk/anthropic";
import type { Message } from "@spike-npm-land/code";
import { streamText } from "ai";
import { z } from "zod";
import type { Code } from "../chatRoom";
import type Env from "../env";

// Define types for message content parts
type MessageContentPart = {
  type: string;
  text?: string;
  image_url?: {
    url: string;
  };
};

export class AiRoutes {
  private env: Env;

  constructor(private code: Code) {
    // Access env through the Code instance
    this.env = this.code.getEnv();
  }

  private async loadMessagesFromR2(codeSpace: string): Promise<Message[]> {
    const messagesKey = `messages_${codeSpace}`;
    try {
      const messagesObject = await this.env.R2.get(messagesKey);
      if (messagesObject) {
        const messages = JSON.parse(await messagesObject.text()) as Message[];
        return messages;
      }
    } catch (e) {
      console.error(`Failed to load messages from R2 (${messagesKey}):`, e);
    }
    return [];
  }

  private async saveMessagesToR2(codeSpace: string, messages: Message[]): Promise<void> {
    const messagesKey = `messages_${codeSpace}`;
    try {
      await this.env.R2.put(messagesKey, JSON.stringify(messages));
      console.log(`[AI Routes] Saved ${messages.length} messages to R2`);
    } catch (e) {
      console.error(`Failed to save messages to R2 (${messagesKey}):`, e);
      throw e;
    }
  }

  private async saveMessagesFromSession(messages: Message[]): Promise<void> {
    // Save messages directly to R2
    const codeSpace = this.code.getSession().codeSpace;
    console.log(`[AI Routes] Saving ${messages.length} messages to R2`);

    await this.saveMessagesToR2(codeSpace, messages);

    // Broadcast session update without messages
    await this.code.updateAndBroadcastSession(this.code.getSession());
  }

  async handleMessagesRoute(
    request: Request,
    url: URL,
    _path: string[],
  ): Promise<Response> {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    const codeSpace = this.code.getSession().codeSpace;

    // GET: Return all messages
    if (request.method === "GET") {
      const messages = await this.loadMessagesFromR2(codeSpace);
      return new Response(JSON.stringify({ messages }), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
    }

    // POST: Add a new message and call AI with MCP tools
    if (request.method === "POST") {
      try {
        let body: any;
        try {
          const rawBody = await request.text();
          console.log("[AI Routes] Raw request body:", rawBody);
          body = JSON.parse(rawBody);
        } catch (parseError) {
          console.error("[AI Routes] Failed to parse request body:", parseError);
          return new Response(JSON.stringify({ 
            error: "Invalid JSON in request body",
            details: parseError instanceof Error ? parseError.message : "Unknown parse error"
          }), {
            status: 400,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json; charset=UTF-8",
            },
          });
        }

        if (!body.messages) {
          return new Response(JSON.stringify({ error: "Messages is required" }), {
            status: 400,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json; charset=UTF-8",
            },
          });
        }

        // Convert messages to AI SDK format
        const messages = body.messages.map((msg: Message) => {
          if (typeof msg.content === "string") {
            return {
              role: msg.role,
              content: msg.content,
            };
          }
          // Handle complex content types
          return {
            role: msg.role,
            content: (msg.content as MessageContentPart[]).map(
              (part: MessageContentPart) => {
                if (part.type === "text") {
                  return { type: "text", text: part.text };
                }
                if (part.type === "image_url" && part.image_url) {
                  return { type: "image", image: part.image_url.url };
                }
                return { type: "text", text: "[unsupported content]" };
              },
            ),
          };
        });

        // Save messages to R2 for persistence
        const currentMessages: Message[] = body.messages as unknown as Message[];
        try {
          await this.saveMessagesToR2(codeSpace, currentMessages);
        } catch (updateError) {
          console.error("Error saving messages to R2:", updateError);
        }

        // Get the AI binding from environment
        const _env = (this.code as unknown as { env: Env; }).env;

        // Check if API key is configured
        if (!this.env.ANTHROPIC_API_KEY || this.env.ANTHROPIC_API_KEY === "your-api-key-here") {
          return new Response(
            JSON.stringify({
              error: "ANTHROPIC_API_KEY not configured. Please add your API key to .dev.vars file.",
            }),
            {
              status: 503,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json; charset=UTF-8",
              },
            },
          );
        }

        // Define MCP tools for AI SDK
        const tools = {
          read_code: {
            description:
              "Read current code only. Use before making changes to understand the codebase.",
            parameters: z.object({
              codeSpace: z.string().describe("The code space to read from"),
            }),
            execute: async ({ codeSpace }: { codeSpace: string; }) => {
              const result = await this.executeMcpTool("read_code", { codeSpace }, url.origin);
              return JSON.stringify(result, null, 2);
            },
          },
          update_code: {
            description:
              "Replace ALL code with new content. For smaller changes, use edit_code instead.",
            parameters: z.object({
              codeSpace: z.string().describe("The code space to update"),
              code: z.string().describe("The new code content"),
            }),
            execute: async ({ codeSpace, code }: { codeSpace: string; code: string; }) => {
              const result = await this.executeMcpTool(
                "update_code",
                { codeSpace, code },
                url.origin,
              );
              return JSON.stringify(result, null, 2);
            },
          },
          edit_code: {
            description:
              "PREFERRED: Make precise line-based edits. More efficient than update_code for large files.",
            parameters: z.object({
              codeSpace: z.string().describe("The code space to edit"),
              startLine: z.number().describe("The starting line number"),
              endLine: z.number().describe("The ending line number"),
              newContent: z.string().describe("The new content for the specified lines"),
            }),
            execute: async ({ codeSpace, startLine, endLine, newContent }: {
              codeSpace: string;
              startLine: number;
              endLine: number;
              newContent: string;
            }) => {
              const result = await this.executeMcpTool("edit_code", {
                codeSpace,
                startLine,
                endLine,
                newContent,
              }, url.origin);
              return JSON.stringify(result, null, 2);
            },
          },
          search_and_replace: {
            description:
              "Search for patterns and replace them. Good for renaming or updating multiple occurrences.",
            parameters: z.object({
              codeSpace: z.string().describe("The code space to search in"),
              search: z.string().describe("The pattern to search for"),
              replace: z.string().describe("The replacement text"),
              matchCase: z.boolean().optional().describe("Whether to match case"),
              isRegex: z.boolean().optional().describe("Whether to use regex"),
            }),
            execute: async ({ codeSpace, search, replace, matchCase, isRegex }: {
              codeSpace: string;
              search: string;
              replace: string;
              matchCase?: boolean;
              isRegex?: boolean;
            }) => {
              const result = await this.executeMcpTool("search_and_replace", {
                codeSpace,
                search,
                replace,
                matchCase,
                isRegex,
              }, url.origin);
              return JSON.stringify(result, null, 2);
            },
          },
          find_lines: {
            description:
              "Find line numbers containing a search pattern. Use before edit_code to locate target lines.",
            parameters: z.object({
              codeSpace: z.string().describe("The code space to search in"),
              search: z.string().describe("The pattern to search for"),
              matchCase: z.boolean().optional().describe("Whether to match case"),
              isRegex: z.boolean().optional().describe("Whether to use regex"),
            }),
            execute: async ({ codeSpace, search, matchCase, isRegex }: {
              codeSpace: string;
              search: string;
              matchCase?: boolean;
              isRegex?: boolean;
            }) => {
              const result = await this.executeMcpTool("find_lines", {
                codeSpace,
                search,
                matchCase,
                isRegex,
              }, url.origin);
              return JSON.stringify(result, null, 2);
            },
          },
        };

        // Create system prompt
        const systemPrompt =
          `You are an AI assistant specializing in helping users modify and improve React components in an online code editor. Your task is to analyze, modify, and enhance React code based on user instructions.

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

        // Stream the response using AI SDK
        const anthropic = createAnthropic({
                  apiKey: this.env.ANTHROPIC_API_KEY
        });

        console.log("[AI Routes] Creating stream with", messages.length, "messages");
        console.log("[AI Routes] Messages:", JSON.stringify(messages, null, 2));

        try {
          const result = await streamText({
            model: anthropic('claude-4-sonnet-20250514'),
            system: systemPrompt,
            messages,
            tools,

            toolChoice: "auto",
            maxSteps: 10,
            onStepFinish: async ({ stepType, toolResults }) => {
              // Save messages after each step
              if (stepType === "tool-result" && toolResults) {
                try {
                  // Get the current messages from the stream
                  const updatedMessages = await this.loadMessagesFromR2(codeSpace);
                  await this.saveMessagesToR2(codeSpace, updatedMessages);
                } catch (error) {
                  console.error("Error saving messages after tool call:", error);
                }
              }
            },
          });

          // Return the streaming response
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
      } catch (error) {
        console.error("Error handling message:", error);
        return new Response(
          JSON.stringify({
            error: "Failed to process message",
            details: error instanceof Error ? error.message : "Unknown error",
          }),
          {
            status: 500,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json; charset=UTF-8",
            },
          },
        );
      }
    }

    return new Response("Method not allowed", {
      status: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  private async executeMcpTool(
    toolName: string,
    parameters: Record<string, unknown>,
    origin: string,
  ): Promise<unknown> {
    // Make POST request to MCP server with JSON-RPC format
    const id = crypto.randomUUID();

    // For code tools, ensure codeSpace is included
    const isCodeTool = ["read_code", "update_code", "edit_code", "search_and_replace", "find_lines"]
      .includes(toolName);
    if (isCodeTool && !parameters.codeSpace) {
      parameters.codeSpace = this.code.getSession().codeSpace;
    }

    // Create JSON-RPC request
    const mcpRequest = {
      jsonrpc: "2.0",
      id,
      method: "tools/call",
      params: {
        name: toolName,
        arguments: parameters,
      },
    };
    const codeSpace = parameters.codeSpace as string || this.code.getSession().codeSpace;

    // POST to /mcp endpoint
    const mcpUrl = `${origin}/live/${codeSpace}/mcp`;
    const response = await fetch(mcpUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CodeSpace": parameters.codeSpace as string || this.code.getSession().codeSpace,
      },
      body: JSON.stringify(mcpRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`MCP request failed: ${response.statusText} - ${errorText}`);
    }

    const mcpResponse = await response.json() as {
      jsonrpc: string;
      id: string | number;
      result?: {
        content?: Array<{ type: string; text: string; }>;
      };
      error?: {
        code: number;
        message: string;
        data?: unknown;
      };
    };

    if (mcpResponse.error) {
      throw new Error(`MCP error: ${mcpResponse.error.message}`);
    }

    // Extract the actual result from the MCP response format
    if (mcpResponse.result?.content?.[0]?.text) {
      try {
        return JSON.parse(mcpResponse.result.content[0].text);
      } catch {
        return mcpResponse.result.content[0].text;
      }
    }

    return mcpResponse.result;
  }
}

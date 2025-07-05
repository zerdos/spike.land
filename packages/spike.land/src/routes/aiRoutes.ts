import Anthropic from "@anthropic-ai/sdk";
import type { Message, MessagePart } from "@spike-npm-land/code";
import type { Code } from "../chatRoom";

export class AiRoutes {
  constructor(private code: Code) {}

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

    const session = this.code.getSession();
    const codeSpace = session.codeSpace;

    // GET: Return all messages
    if (request.method === "GET") {
      return new Response(JSON.stringify({ messages: session.messages }), {
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
        const body = await request.json() as { message: string; role?: string; };

        if (!body.message) {
          return new Response(JSON.stringify({ error: "Message is required" }), {
            status: 400,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json; charset=UTF-8",
            },
          });
        }

        // Create user message
        const userMessage = {
          id: crypto.randomUUID(),
          role: (body.role || "user") as "user" | "assistant" | "system",
          content: body.message,
        };

        // Add user message to session
        const updatedSession = {
          ...session,
          messages: [...session.messages, userMessage],
        };
        await this.code.updateAndBroadcastSession(updatedSession);

        // Get the AI binding from environment

        const env = this.code.getEnv();

        const anthropic = new Anthropic({
          apiKey: env.ANTHROPIC_API_KEY,
        });

        // Define available MCP tools for the AI
        const mcpTools = [
          {
            name: "read_code",
            description:
              "Read current code only. Use before making changes to understand the codebase.",
            parameters: { codeSpace: "string" },
          },
          {
            name: "update_code",
            description:
              "Replace ALL code with new content. For smaller changes, use edit_code instead.",
            parameters: { codeSpace: "string", code: "string" },
          },
          {
            name: "edit_code",
            description:
              "PREFERRED: Make precise line-based edits. More efficient than update_code for large files.",
            parameters: {
              codeSpace: "string",
              startLine: "number",
              endLine: "number",
              newContent: "string",
            },
          },
          {
            name: "search_and_replace",
            description:
              "Search for patterns and replace them. Good for renaming or updating multiple occurrences.",
            parameters: {
              codeSpace: "string",
              search: "string",
              replace: "string",
              matchCase: "boolean",
              isRegex: "boolean",
            },
          },
          {
            name: "find_lines",
            description:
              "Find line numbers containing a search pattern. Use before edit_code to locate target lines.",
            parameters: {
              codeSpace: "string",
              search: "string",
              matchCase: "boolean",
              isRegex: "boolean",
            },
          },
        ];

        // Create system prompt with MCP tools
        const systemPrompt =
          `You are an AI assistant with access to code modification tools through MCP (Model Context Protocol).

Available tools:
${mcpTools.map(tool => `- ${tool.name}: ${tool.description}`).join("\n")}

To use a tool, respond with a JSON block in this format:
<tool_use>
{
  "tool": "tool_name",
  "parameters": {
    "param1": "value1",
    "param2": "value2"
  }
}
</tool_use>

The current codeSpace is: ${codeSpace}

After I execute the tool, I'll share the results with you. You can then continue the conversation or use more tools as needed.`;

        // Prepare messages for AI (filtering out system messages and converting them)
        const aiMessages = [
          ...session.messages
            .filter((msg: Message) => msg.role !== "system")
            .map((msg: Message) => ({
              role: msg.role as "user" | "assistant",
              content: typeof msg.content === "string"
                ? msg.content
                : msg.content.map((part: MessagePart) => {
                  if (part.type === "text") return part.text;
                  return "[image]";
                }).join(""),
            })),
          {
            role: userMessage.role as "user" | "assistant",
            content: userMessage.content as string,
          },
        ];

        // Call Anthropic Messages API with system as a top-level parameter
        const aiResponse = await anthropic.messages.create({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4096,
          temperature: 0,
          system: systemPrompt,
          messages: aiMessages
        });

        const responseText = aiResponse.content && Array.isArray(aiResponse.content)
          ? aiResponse.content.map((c: unknown) => {
              if (typeof c === "string") return c;
              if (typeof c === "object" && c !== null && "text" in c) {
                return (c as { text: string }).text || "";
              }
              return "";
            }).join("")
          : (typeof aiResponse.content === "string" ? aiResponse.content : "");

        // Check if the response contains a tool use request
        const toolUseMatch = responseText.match(/<tool_use>([\s\S]*?)<\/tool_use>/);

        if (toolUseMatch) {
          try {
            // Parse the tool use request
            const toolRequest = JSON.parse(toolUseMatch[1]);

            // Execute the MCP tool
            const mcpResponse = await this.executeMcpTool(
              toolRequest.tool,
              toolRequest.parameters,
              url.origin,
            );

            // Add AI's response with tool use
            const assistantMessage = {
              id: crypto.randomUUID(),
              role: "assistant" as const,
              content: responseText,
            };

            // Add tool result as an assistant message (since system role isn't allowed in messages)
            const toolResultMessage = {
              id: crypto.randomUUID(),
              role: "assistant" as const,
              content: `Tool execution result:\n${JSON.stringify(mcpResponse, null, 2)}`,
            };

            // Update session with both messages
            const finalSession = {
              ...updatedSession,
              messages: [...updatedSession.messages, assistantMessage, toolResultMessage],
            };
            await this.code.updateAndBroadcastSession(finalSession);

            // Return the messages
            return new Response(
              JSON.stringify({
                userMessage,
                assistantMessage,
                toolResultMessage,
                messages: finalSession.messages,
              }),
              {
                status: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Content-Type": "application/json; charset=UTF-8",
                },
              },
            );
          } catch (toolError) {
            console.error("Error executing tool:", toolError);
            // Continue with regular response if tool execution fails
          }
        }

        // Create regular assistant message (no tool use)
        const assistantMessage = {
          id: crypto.randomUUID(),
          role: "assistant" as const,
          content: responseText,
        };

        // Add assistant message to session
        const finalSession = {
          ...updatedSession,
          messages: [...updatedSession.messages, assistantMessage],
        };
        await this.code.updateAndBroadcastSession(finalSession);

        // Return both messages
        return new Response(
          JSON.stringify({
            userMessage,
            assistantMessage,
            messages: finalSession.messages,
          }),
          {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json; charset=UTF-8",
            },
          },
        );
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
    const isCodeTool = ['read_code', 'update_code', 'edit_code', 'search_and_replace', 'find_lines'].includes(toolName);
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
        arguments: parameters
      }
    };
    
    // POST to /mcp endpoint
    const mcpUrl = `${origin}/mcp`;
    const response = await fetch(mcpUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CodeSpace": parameters.codeSpace as string || this.code.getSession().codeSpace
      },
      body: JSON.stringify(mcpRequest)
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
import Anthropic from "@anthropic-ai/sdk";
import type { Message, MessagePart } from "@spike-npm-land/code";
import type { Code } from "../chatRoom";

interface AnthropicMessage {
  role: "user" | "assistant";
  content: string;
}

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


    const codeSpace = this.code.getSession().codeSpace;
   


    // GET: Return all messages
    if (request.method === "GET") {
      return new Response(JSON.stringify({ messages: this.code.getSession().messages }), {
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

        // Get initial session
        const initialSession = this.code.getSession();
        console.log(`[AI Routes] Initial session messages count: ${initialSession.messages?.length || 0}`);
        
        // Ensure we have all required session fields
        const completeSession = {
          code: initialSession.code || "",
          codeSpace: initialSession.codeSpace || codeSpace,
          html: initialSession.html || "",
          css: initialSession.css || "",
          transpiled: initialSession.transpiled || "",
          messages: initialSession.messages || [],
        };
        
        // Add user message to session
        let currentSession = {
          ...completeSession,
          messages: [...completeSession.messages, userMessage],
        };
        
        console.log(`[AI Routes] Session after adding user message: ${currentSession.messages.length} messages`);
        
        try {
          await this.code.updateAndBroadcastSession(currentSession);
        } catch (updateError) {
          console.error("Error updating session after initial message:", updateError);
          console.error("Session structure:", {
            codeSpace: currentSession.codeSpace,
            hasCode: !!currentSession.code,
            hasTranspiled: !!currentSession.transpiled,
            hasHtml: !!currentSession.html,
            hasCss: !!currentSession.css,
            messagesCount: currentSession.messages?.length || 0
          });
          // Continue anyway - the messages might still be useful even if broadcast failed
        }

        // Get the AI binding from environment

        const env = this.code.getEnv();

        const anthropic = new Anthropic({
          apiKey: env.ANTHROPIC_API_KEY,
        });

        // Track tool calls to prevent infinite loops
        const MAX_TOOL_CALLS = 10;
        let toolCallCount = 0;

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
  "tool": "update_code", 
  "parameters": {
    "codeSpace": "${codeSpace}",
    "code": "export default () => <div> Hello, world!</div>;"
  }
}
</tool_use>

The current codeSpace is: ${codeSpace}

After I execute the tool, I'll share the results with you. You can then continue the conversation or use more tools as needed.`;

        // Conversation loop to handle multiple tool calls
        let shouldContinue = true;
        const allMessages: Message[] = [];

        while (shouldContinue && toolCallCount < MAX_TOOL_CALLS) {
          // Prepare messages for AI (filtering out system messages and converting them)
          const aiMessages: AnthropicMessage[] = [
            ...currentSession.messages
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
          ];

          // Call Anthropic Messages API with system as a top-level parameter
          const aiResponse = await anthropic.messages.create({
            model: "claude-sonnet-4-20250514",
            max_tokens: 4096,
            temperature: 0,
            system: [{
              type: "text",
              text: systemPrompt,
              cache_control: { type: "ephemeral" }
            }],
            stop_sequences: ["</tool_use>"],
            messages: aiMessages,
          });

          let responseText = aiResponse.content && Array.isArray(aiResponse.content)
            ? aiResponse.content.map((c: unknown) => {
              if (typeof c === "string") return c;
              if (typeof c === "object" && c !== null && "text" in c) {
                return (c as { text: string; }).text || "";
              }
              return "";
            }).join("")
            : (typeof aiResponse.content === "string" ? aiResponse.content : "");

          // Check if we need to add the closing tag
          if (responseText.includes("<tool_use>") && !responseText.includes("</tool_use>")) {
            responseText = responseText + '</tool_use>';
          }

          // Check if the response contains a tool use request
          const toolUseMatch = responseText.match(/<tool_use>([\s\S]*?)<\/tool_use>/);
          
          if (toolUseMatch) {
            toolCallCount++;
            
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

              // Add tool result as a user message for the next iteration
              const toolResultMessage = {
                id: crypto.randomUUID(),
                role: "user" as const,
                content: `Tool "${toolRequest.tool}" executed successfully. Result:\n${JSON.stringify(mcpResponse, null, 2)}`,
              };

              // Update session with both messages
              currentSession = {
                ...currentSession,
                messages: [...currentSession.messages, assistantMessage, toolResultMessage],
              };
              
              
              allMessages.push(assistantMessage, toolResultMessage);
              
              // Continue the conversation with the tool result
              shouldContinue = true;
            } catch (toolError) {
              console.error("Error executing tool:", toolError);
              
              // Add error message
              const errorMessage = {
                id: crypto.randomUUID(),
                role: "assistant" as const,
                content: `Error executing tool: ${toolError instanceof Error ? toolError.message : "Unknown error"}`,
              };
              
              currentSession = {
                ...currentSession,
                messages: [...currentSession.messages, errorMessage],
              };
              
              allMessages.push(errorMessage);
              shouldContinue = false;
            }
          } else {
            // No tool use, this is the final response
            const assistantMessage = {
              id: crypto.randomUUID(),
              role: "assistant" as const,
              content: responseText,
            };

            currentSession = {
              ...currentSession,
              messages: [...currentSession.messages, assistantMessage],
            };
            
            allMessages.push(assistantMessage);
            shouldContinue = false;
          }
        }

        // Check if we hit the tool call limit
        if (toolCallCount >= MAX_TOOL_CALLS && shouldContinue) {
          const limitMessage = {
            id: crypto.randomUUID(),
            role: "assistant" as const,
            content: "I've reached the maximum number of tool calls allowed in a single conversation. Please start a new message if you need more assistance.",
          };
          
          currentSession = {
            ...currentSession,
            messages: [...currentSession.messages, limitMessage],
          };
          
          allMessages.push(limitMessage);
        }

        // Save the final session state
        try {
          // Check if the session is getting too large
          const sessionSize = JSON.stringify(currentSession).length;
          console.log(`[AI Routes] Session size before save: ${sessionSize} bytes`);
          
          if (sessionSize > 500000) { // 500KB limit
            console.warn(`[AI Routes] Session too large (${sessionSize} bytes), truncating messages`);
            // Keep only the last 50 messages
            const truncatedSession = {
              ...currentSession,
              messages: currentSession.messages.slice(-50)
            };
            await this.code.updateAndBroadcastSession(truncatedSession);
          } else {
            await this.code.updateAndBroadcastSession(currentSession);
          }
        } catch (updateError) {
          console.error("Error updating final session state:", updateError);
          // Try to save without messages as a fallback
          try {
            const sessionWithoutMessages = {
              ...currentSession,
              messages: []
            };
            await this.code.updateAndBroadcastSession(sessionWithoutMessages);
            console.warn("[AI Routes] Saved session without messages due to error");
          } catch (fallbackError) {
            console.error("Error saving session even without messages:", fallbackError);
            throw new Error(`Failed to save conversation state: ${updateError instanceof Error ? updateError.message : "Unknown error"}`);
          }
        }

        // Return all messages from this conversation
        return new Response(
          JSON.stringify({
            userMessage,
            assistantMessages: allMessages,
            messages: currentSession.messages,
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

    // POST to /mcp endpoint
    const mcpUrl = `${origin}/mcp`;
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

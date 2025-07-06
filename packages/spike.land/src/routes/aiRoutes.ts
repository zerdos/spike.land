import Anthropic from "@anthropic-ai/sdk";
import type { ICodeSession, Message, MessagePart } from "@spike-npm-land/code";
import type { Code } from "../chatRoom";

interface AnthropicMessage {
  role: "user" | "assistant";
  content: string;
}

export class AiRoutes {
  constructor(private code: Code) {}

  private async saveMessagesFromSession(session: ICodeSession): Promise<void> {
    // With optimized message storage, we don't need to check total session size
    // Messages are stored separately and managed automatically
    console.log(`[AI Routes] Saving session with ${session.messages.length} messages`);
    
    // The new message storage system will handle size limits automatically
    await this.code.updateAndBroadcastSession({...this.code.getSession(), messages: session.messages});
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
        console.log(
          `[AI Routes] Initial session messages count: ${initialSession.messages?.length || 0}`,
        );

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

        console.log(
          `[AI Routes] Session after adding user message: ${currentSession.messages.length} messages`,
        );

        try {
          await this.saveMessagesFromSession(currentSession);
        } catch (updateError) {
          console.error("Error updating session after initial message:", updateError);
          console.error("Session structure:", {
            codeSpace: currentSession.codeSpace,
            hasCode: !!currentSession.code,
            hasTranspiled: !!currentSession.transpiled,
            hasHtml: !!currentSession.html,
            hasCss: !!currentSession.css,
            messagesCount: currentSession.messages?.length || 0,
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
          `You are an AI assistant specializing in helping users modify and improve React components in an online code editor. Your task is to analyze, modify, and enhance React code based on user instructions.

## IMPORTANT TOOL USAGE RULES:
1. You have access to tools through MCP (Model Context Protocol)
2. Each response should contain ONLY ONE tool call OR a regular message, never both
3. After each tool call, you will receive the result as a user message
4. Continue making tool calls until the task is complete
5. When done with all modifications, simply respond with a summary without any tool calls
6. Do NOT double-check if code was written properly unless you suspect an error
7. Trust that successful tool executions mean the code was updated correctly

## Available tools:
${mcpTools.map(tool => `- ${tool.name}: ${tool.description}`).join("\n")}

## To use a tool:
Respond with ONLY a JSON block in this format:
<tool_use>
{
  "tool": "tool_name",
  "parameters": {
    "param1": "value1",
    "param2": "value2"
  }
}
</tool_use>

## Current context:
- CodeSpace: ${codeSpace}
- Working with React components using JSX syntax with default exports
- Use Tailwind CSS, shadcn-ui, @emotion/react for styling
- Implement responsive design
- Support dark/light mode using useDarkMode hook and ThemeToggle component
- Use ImageLoader component for generated images

\`\`\`typescript  

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { ImageLoader } from "@/components/ui/image-loader";
import { motion, AnimatePresence } from "framer-motion";

const MyComponent: React.FC = () => {
  const { isDarkMode } = useDarkMode();

  const [data, setData] = useState<string[]>([]);
  const fetchData = useCallback(async () => {
    // Fetch data logic here
    const response = await fetch("/api/data");
    const result = await response.json();
    setData(result);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const containerClasses = cn(
    "flex flex-col items-center justify-center min-h-screen",
    isDarkMode ? "dark" : "",
  );
  return (
    <div className={containerClasses}>
      <ThemeToggle />
      <AnimatePresence>
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <ImageLoader src={item} alt={\`Image \${index}\`} aspectRatio="16:9" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
export default MyComponent;

\`\`\`

## React Component Guidelines:
- Components should use default export JSX syntax
- Use Tailwind CSS, shadcn-ui, @emotion/react, or other npm packages for styling
- Ensure the design is responsive. For smaller apps, center the content both horizontally and vertically on the page
- Implement dark/light mode functionality using useDarkMode hook and ThemeToggle component
- When generating images, use the ImageLoader component with supported aspect ratios

## Process:
1. First use read_code to understand the current code
2. Make necessary modifications using edit_code, update_code, or search_and_replace
3. Each tool call should be in a separate response
4. Wait for the tool result before proceeding
5. When all modifications are complete, provide a brief summary

Remember: One tool call per response, or a regular message. Never both.`;

        // Conversation loop to handle multiple tool calls
        let shouldContinue = true;
        const allMessages: Message[] = [];

        while (shouldContinue && toolCallCount < MAX_TOOL_CALLS) {
          // Prepare messages for AI (filtering out system messages and converting them)
          const aiMessages: AnthropicMessage[] = [
            ...this.code.getSession().messages
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
              cache_control: { type: "ephemeral" },
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
            responseText = responseText + "</tool_use>";
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
                content: JSON.stringify(mcpResponse, null, 2),
              };

              // Get the latest session state to preserve any changes made by MCP tools
              
              // Update session with tool result, preserving code changes from MCP
             const currentSession = {
                messages: [...this.code.getSession().messages, assistantMessage, toolResultMessage],
              };

              // Save the session after adding tool result
              try {
                await this.saveMessagesFromSession(currentSession);
              } catch (saveError) {
                console.error("Error saving session after tool result:", saveError);
              }

              allMessages.push(assistantMessage, toolResultMessage);

              // Continue the conversation with the tool result
              shouldContinue = true;
            } catch (toolError) {
              console.error("Error executing tool:", toolError);

              // Add error message
              const errorMessage = {
                id: crypto.randomUUID(),
                role: "assistant" as const,
                content: `Error executing tool: ${
                  toolError instanceof Error ? toolError.message : "Unknown error"
                }`,
              };

              currentSession = {
                ...currentSession,
                messages: [...currentSession.messages, errorMessage],
              };

              // Save the session after adding error message
              try {
                await this.saveMessagesFromSession(currentSession);
              } catch (saveError) {
                console.error("Error saving session after error message:", saveError);
              }

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

            // Save the session after adding final message
            try {
              await this.saveMessagesFromSession(currentSession);
            } catch (saveError) {
              console.error("Error saving session after final message:", saveError);
            }

            allMessages.push(assistantMessage);
            shouldContinue = false;
          }
        }

        // Check if we hit the tool call limit
        if (toolCallCount >= MAX_TOOL_CALLS && shouldContinue) {
          const limitMessage = {
            id: crypto.randomUUID(),
            role: "assistant" as const,
            content:
              "I've reached the maximum number of tool calls allowed in a single conversation. Please start a new message if you need more assistance.",
          };

          currentSession = {
            ...currentSession,
            messages: [...currentSession.messages, limitMessage],
          };

          // Save the session after adding limit message
          try {
            await this.saveMessagesFromSession(currentSession);
          } catch (saveError) {
            console.error("Error saving session after limit message:", saveError);
          }

          allMessages.push(limitMessage);
        }

        // No need for final save since we save after each message update

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

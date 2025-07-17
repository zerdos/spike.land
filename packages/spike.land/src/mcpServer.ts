import type { ICodeSession } from "@spike-npm-land/code";
import type { Code } from "./chatRoom";

interface McpRequest {
  jsonrpc: string;
  id: string | number;
  method: string;
  params?: Record<string, unknown>;
}

interface McpResponse {
  jsonrpc: string;
  id: string | number;
  result?: Record<string, unknown>;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

export interface McpTool {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, Record<string, unknown>>;
    required?: string[];
  };
}

export class McpServer {
  tools: McpTool[] = [
    {
      name: "read_code",
      description: "Read current code only. Use before making changes to understand the codebase.",
      inputSchema: {
        type: "object",
        properties: {
          codeSpace: {
            type: "string",
            description: "The codeSpace identifier to read code from",
          },
        },
        required: ["codeSpace"],
      },
    },
    {
      name: "read_html",
      description: "Read current HTML output only. Lightweight way to check rendering results.",
      inputSchema: {
        type: "object",
        properties: {
          codeSpace: {
            type: "string",
            description: "The codeSpace identifier to read HTML from",
          },
        },
        required: ["codeSpace"],
      },
    },
    {
      name: "read_session",
      description:
        "Read ALL session data (code+html+css). Use sparingly - prefer specific read tools.",
      inputSchema: {
        type: "object",
        properties: {
          codeSpace: {
            type: "string",
            description: "The codeSpace identifier to read session from",
          },
        },
        required: ["codeSpace"],
      },
    },
    {
      name: "update_code",
      description:
        "Replace ALL code with new content. For smaller changes, use edit_code or search_and_replace instead.",
      inputSchema: {
        type: "object",
        properties: {
          codeSpace: {
            type: "string",
            description: "The codeSpace identifier to update code in",
          },
          code: {
            type: "string",
            description: "The complete new code to replace ALL existing code",
          },
        },
        required: ["codeSpace", "code"],
      },
    },
    {
      name: "search_and_replace",
      description:
        "MOST EFFICIENT: Replace patterns without needing line numbers. Best for simple text replacements.",
      inputSchema: {
        type: "object",
        properties: {
          codeSpace: {
            type: "string",
            description: "The codeSpace identifier to perform search and replace in",
          },
          search: {
            type: "string",
            description: "Text or pattern to search for",
          },
          replace: {
            type: "string",
            description: "Replacement text",
          },
          isRegex: {
            type: "boolean",
            description: "Whether search is a regular expression (default: false)",
          },
          global: {
            type: "boolean",
            description: "Replace all occurrences (default: true)",
          },
        },
        required: ["codeSpace", "search", "replace"],
      },
    },
    {
      name: "edit_code",
      description:
        "Make precise line-based edits. More efficient than update_code for targeted changes.",
      inputSchema: {
        type: "object",
        properties: {
          codeSpace: {
            type: "string",
            description: "The codeSpace identifier to edit code in",
          },
          edits: {
            type: "array",
            description: "Array of line edits to apply",
            items: {
              type: "object",
              properties: {
                startLine: {
                  type: "number",
                  description: "Starting line number (1-based)",
                },
                endLine: {
                  type: "number",
                  description: "Ending line number (1-based)",
                },
                newContent: {
                  type: "string",
                  description: "New content for the specified lines",
                },
              },
              required: ["startLine", "endLine", "newContent"],
            },
          },
        },
        required: ["codeSpace", "edits"],
      },
    },
    {
      name: "find_lines",
      description:
        "Find line numbers containing a search pattern. Use before edit_code to locate target lines.",
      inputSchema: {
        type: "object",
        properties: {
          codeSpace: {
            type: "string",
            description: "The codeSpace identifier to search in",
          },
          pattern: {
            type: "string",
            description: "Pattern to search for",
          },
          isRegex: {
            type: "boolean",
            description: "Whether pattern is a regular expression (default: false)",
          },
        },
        required: ["codeSpace", "pattern"],
      },
    },
    // Future tool ideas (commented for reference):
    // {
    //   name: "update_css",
    //   description: "Update the CSS styles in the session",
    //   inputSchema: {
    //     type: "object",
    //     properties: {
    //       css: { type: "string", description: "The new CSS to set" }
    //     },
    //     required: ["css"]
    //   }
    // },
    // {
    //   name: "add_message",
    //   description: "Add a message to the session history",
    //   inputSchema: {
    //     type: "object",
    //     properties: {
    //       message: { type: "string", description: "Message content" },
    //       role: { type: "string", enum: ["user", "assistant"], description: "Message role" }
    //     },
    //     required: ["message", "role"]
    //   }
    // },
    // {
    //   name: "transpile_code",
    //   description: "Trigger code transpilation and return the result",
    //   inputSchema: { type: "object", properties: {} }
    // },
    // {
    //   name: "get_code_metrics",
    //   description: "Get metrics about the code (lines, complexity, etc.)",
    //   inputSchema: { type: "object", properties: {} }
    // },
    // {
    //   name: "validate_code",
    //   description: "Validate the current code syntax",
    //   inputSchema: { type: "object", properties: {} }
    // },
    // {
    //   name: "backup_session",
    //   description: "Create a backup of the current session",
    //   inputSchema: { type: "object", properties: {} }
    // },
    // {
    //   name: "restore_session",
    //   description: "Restore from a backup",
    //   inputSchema: {
    //     type: "object",
    //     properties: {
    //       backupId: { type: "string", description: "Backup identifier" }
    //     },
    //     required: ["backupId"]
    //   }
    // },
    // {
    //   name: "search_code",
    //   description: "Search for patterns in the code",
    //   inputSchema: {
    //     type: "object",
    //     properties: {
    //       pattern: { type: "string", description: "Search pattern/regex" }
    //     },
    //     required: ["pattern"]
    //   }
    // },
    // {
    //   name: "format_code",
    //   description: "Format/prettify the current code",
    //   inputSchema: { type: "object", properties: {} }
    // }
  ];

  constructor(private durableObject: Code) {}

  // Helper method to get session for a specific codeSpace
  private async getSessionForCodeSpace(
    codeSpace: string,
  ): Promise<ICodeSession> {
    const currentSession = this.durableObject.getSession();

    // If the current session is for a different codeSpace, we need to switch
    if (currentSession.codeSpace !== codeSpace) {
      console.log(
        `Switching session from '${currentSession.codeSpace}' to '${codeSpace}'`,
      );

      // Create a new URL with the codeSpace as a room parameter
      const url = new URL(`http://localhost:8787/?room=${codeSpace}`);

      // Force re-initialization by setting initialized to false
      this.durableObject.initialized = false;

      // Re-initialize the session for the requested codeSpace
      await this.durableObject.initializeSession(url);

      // Get the updated session
      const updatedSession = this.durableObject.getSession();
      if (updatedSession.codeSpace !== codeSpace) {
        throw new Error(`Failed to switch to codeSpace '${codeSpace}'`);
      }

      return updatedSession;
    }

    return currentSession;
  }

  async handleRequest(
    request: Request,
    _url: URL,
    _path: string[],
  ): Promise<Response> {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 200, headers });
    }

    if (request.method === "GET") {
      // Return server capabilities
      return new Response(
        JSON.stringify({
          jsonrpc: "2.0",
          result: {
            capabilities: {
              tools: { listChanged: true },
            },
            serverInfo: {
              name: "spike.land-mcp-server",
              version: "1.0.1",
            },
          },
        }),
        { headers },
      );
    }

    if (request.method === "POST") {
      try {
        const mcpRequest: McpRequest = await request.json();
        const response = await this.handleMcpRequest(mcpRequest);
        return new Response(JSON.stringify(response), { headers });
      } catch (error) {
        const errorResponse: McpResponse = {
          jsonrpc: "2.0",
          id: 0,
          error: {
            code: -32700,
            message: "Parse error",
            data: error instanceof Error ? error.message : String(error),
          },
        };
        return new Response(JSON.stringify(errorResponse), {
          status: 400,
          headers,
        });
      }
    }

    return new Response("Method not allowed", { status: 405, headers });
  }

  private async handleMcpRequest(request: McpRequest): Promise<McpResponse> {
    const { method, params, id } = request;

    try {
      switch (method) {
        case "initialize":
          return {
            jsonrpc: "2.0",
            id,
            result: {
              protocolVersion: "2024-11-05",
              capabilities: {
                tools: { listChanged: true },
              },
              serverInfo: {
                name: "spike.land-mcp-server",
                version: "1.0.1",
              },
            },
          };

        case "tools/list":
          return {
            jsonrpc: "2.0",
            id,
            result: {
              tools: this.tools,
            },
          };

        case "tools/call": {
          if (!params?.name || typeof params.name !== "string") {
            throw new Error("Tool name is required and must be a string");
          }
          const result = await this.executeTool(
            params.name,
            (params.arguments as Record<string, unknown>) || {},
          );
          return {
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: typeof result === "string"
                    ? result
                    : JSON.stringify(result, null, 2),
                },
              ],
            },
          };
        }

        default:
          throw new Error(`Method ${method} not found`);
      }
    } catch (error) {
      return {
        jsonrpc: "2.0",
        id,
        error: {
          code: -32603,
          message: "Internal error",
          data: error instanceof Error ? error.message : String(error),
        },
      };
    }
  }

  public async executeTool(
    toolName: string,
    args: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    // Extract codeSpace from arguments
    const requestedCodeSpace = args.codeSpace as string;
    if (!requestedCodeSpace) {
      throw new Error(`codeSpace parameter is required for tool '${toolName}'`);
    }

    // Get the session for the requested codeSpace
    const session = await this.getSessionForCodeSpace(requestedCodeSpace);

    console.log(
      `MCP Tool '${toolName}' executing for codeSpace: ${requestedCodeSpace}`,
    );

    if (!session.codeSpace) {
      throw new Error(
        "Session codeSpace is missing. The session may not be properly initialized.",
      );
    }

    switch (toolName) {
      case "read_code":
        return {
          code: session.code,
          codeSpace: requestedCodeSpace,
        };

      case "read_html":
        return {
          html: session.html,
          codeSpace: requestedCodeSpace,
        };

      case "read_session":
        return {
          code: session.code,
          html: session.html,
          css: session.css,
          codeSpace: requestedCodeSpace,
        };

      case "update_code": {
        if (!args.code || typeof args.code !== "string") {
          throw new Error("Code parameter is required and must be a string");
        }

        console.log(
          `[MCP] update_code called for codeSpace: ${requestedCodeSpace}`,
        );
        console.log(
          `[MCP] Current code length: ${
            session.code?.length || 0
          }, New code length: ${args.code.length}`,
        );

        const updatedSession = {
          ...session,
          code: args.code,
          // Clear transpiled content to force re-transpilation
          html: "",
          css: "",
          codeSpace: requestedCodeSpace, // Ensure codeSpace is preserved
        };

        console.log(
          `[MCP] Broadcasting session update with empty transpiled to trigger re-transpilation`,
        );
        await this.durableObject.updateAndBroadcastSession(updatedSession);

        return {
          success: true,
          message:
            `Code updated successfully (${args.code.length}/500 chars). Transpilation will be triggered automatically.`,
          codeSpace: requestedCodeSpace,
          requiresTranspilation: true,
        };
      }

      case "edit_code": {
        if (!args.edits || !Array.isArray(args.edits)) {
          throw new Error("Edits parameter is required and must be an array");
        }

        const originalCode = session.code || "";
        const { newCode, diff } = this.applyLineEdits(
          originalCode,
          args.edits as Array<{
            startLine: number;
            endLine: number;
            newContent: string;
          }>,
        );

        const updatedSession = {
          ...session,
          code: newCode,
          // Clear transpiled content to force re-transpilation
          transpiled: "",
          html: "",
          css: "",
          codeSpace: requestedCodeSpace,
        };

        await this.durableObject.updateAndBroadcastSession(updatedSession);

        return {
          success: true,
          message: "Code edited successfully. Transpilation will be triggered automatically.",
          codeSpace: requestedCodeSpace,
          diff,
          linesChanged: args.edits.length,
          requiresTranspilation: true,
        };
      }

      case "find_lines": {
        if (!args.pattern || typeof args.pattern !== "string") {
          throw new Error("Pattern parameter is required and must be a string");
        }

        const code = session.code || "";
        const lines = code.split("\n");
        const isRegex = args.isRegex === true;
        const matches: Array<
          { lineNumber: number; content: string; matchText: string; }
        > = [];

        try {
          const searchPattern = isRegex
            ? new RegExp(args.pattern, "gi")
            : args.pattern;

          lines.forEach((line: string, index: number) => {
            const lineNumber = index + 1;
            if (isRegex) {
              const regex = searchPattern as RegExp;
              const match = line.match(regex);
              if (match) {
                matches.push({
                  lineNumber,
                  content: line,
                  matchText: match[0],
                });
              }
            } else {
              if (line.includes(searchPattern as string)) {
                matches.push({
                  lineNumber,
                  content: line,
                  matchText: searchPattern as string,
                });
              }
            }
          });
        } catch (error) {
          throw new Error(
            `Invalid regex pattern: ${error instanceof Error ? error.message : String(error)}`,
          );
        }

        return {
          pattern: args.pattern,
          isRegex,
          matches,
          totalMatches: matches.length,
          codeSpace: requestedCodeSpace,
        };
      }

      case "search_and_replace": {
        if (!args.search || typeof args.search !== "string") {
          throw new Error("Search parameter is required and must be a string");
        }
        if (typeof args.replace !== "string") {
          throw new Error("Replace parameter is required and must be a string");
        }

        const originalCode = session.code || "";
        const isRegex = args.isRegex === true;
        const global = args.global !== false; // Default to true
        let newCode: string;
        let replacements = 0;

        try {
          if (isRegex) {
            const flags = global ? "g" : "";
            const regex = new RegExp(args.search, flags);
            const matches = originalCode.match(new RegExp(args.search, "g"));
            replacements = matches ? matches.length : 0;
            newCode = originalCode.replace(regex, args.replace);
          } else {
            const searchText = args.search;
            if (global) {
              const regex = new RegExp(
                searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                "g",
              );
              const matches = originalCode.match(regex);
              replacements = matches ? matches.length : 0;
              newCode = originalCode.replace(regex, args.replace);
            } else {
              const index = originalCode.indexOf(searchText);
              if (index !== -1) {
                replacements = 1;
                newCode = originalCode.substring(0, index) + args.replace +
                  originalCode.substring(index + searchText.length);
              } else {
                replacements = 0;
                newCode = originalCode;
              }
            }
          }
        } catch (error) {
          throw new Error(
            `Invalid regex pattern: ${error instanceof Error ? error.message : String(error)}`,
          );
        }

        if (replacements > 0) {
          const updatedSession = {
            ...session,
            code: newCode,
            // Clear transpiled content to force re-transpilation
            transpiled: "",
            html: "",
            css: "",
            codeSpace: requestedCodeSpace,
          };

          await this.durableObject.updateAndBroadcastSession(updatedSession);
        }

        return {
          success: true,
          message: replacements > 0
            ? `Made ${replacements} replacement(s). Transpilation will be triggered automatically.`
            : "No matches found",
          replacements,
          search: args.search,
          replace: args.replace,
          isRegex,
          global,
          codeSpace: requestedCodeSpace,
          requiresTranspilation: replacements > 0,
        };
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  }

  // Helper method to add new tools dynamically (for extensibility)
  addTool(tool: McpTool): void {
    this.tools.push(tool);
  }

  // Helper method to remove tools
  removeTool(toolName: string): boolean {
    const index = this.tools.findIndex((tool) => tool.name === toolName);
    if (index !== -1) {
      this.tools.splice(index, 1);
      return true;
    }
    return false;
  }

  // Get list of available tools
  getTools(): McpTool[] {
    return [...this.tools];
  }

  // Apply line-based edits and generate diff
  private applyLineEdits(
    originalCode: string,
    edits: Array<{ startLine: number; endLine: number; newContent: string; }>,
  ): { newCode: string; diff: string; } {
    const originalLines = originalCode.split("\n");
    const editsCopy = [...edits].sort((a, b) => b.startLine - a.startLine); // Sort in reverse order to avoid line number shifts

    // Validate line numbers
    for (const edit of editsCopy) {
      if (edit.startLine < 1 || edit.endLine < 1) {
        throw new Error("Line numbers must be 1-based and positive");
      }
      if (edit.startLine > edit.endLine) {
        throw new Error("Start line must be less than or equal to end line");
      }
      if (edit.endLine > originalLines.length) {
        throw new Error(
          `End line ${edit.endLine} exceeds code length (${originalLines.length} lines)`,
        );
      }
    }

    // Check for overlapping edits
    const sortedEdits = [...edits].sort((a, b) => a.startLine - b.startLine);
    for (let i = 1; i < sortedEdits.length; i++) {
      if (sortedEdits[i].startLine <= sortedEdits[i - 1].endLine) {
        throw new Error(
          `Overlapping edits detected: lines ${sortedEdits[i - 1].startLine}-${
            sortedEdits[i - 1].endLine
          } and ${sortedEdits[i].startLine}-${sortedEdits[i].endLine}`,
        );
      }
    }

    const modifiedLines = [...originalLines];
    const diffParts: string[] = [];

    // Apply edits in reverse order to maintain line numbers
    for (const edit of editsCopy) {
      const startIdx = edit.startLine - 1; // Convert to 0-based
      const endIdx = edit.endLine - 1; // Convert to 0-based
      const removedLines = modifiedLines.slice(startIdx, endIdx + 1);
      const newLines = edit.newContent ? edit.newContent.split("\n") : [];

      // Generate diff for this edit
      const contextStart = Math.max(0, startIdx - 2);
      const contextEnd = Math.min(modifiedLines.length - 1, endIdx + 2);

      const diffHeader = `@@ -${edit.startLine},${
        edit.endLine - edit.startLine + 1
      } +${edit.startLine},${newLines.length} @@`;
      const diffLines = [diffHeader];

      // Add context before
      for (let i = contextStart; i < startIdx; i++) {
        diffLines.push(` ${modifiedLines[i]}`);
      }

      // Add removed lines
      for (const line of removedLines) {
        diffLines.push(`-${line}`);
      }

      // Add new lines
      for (const line of newLines) {
        diffLines.push(`+${line}`);
      }

      // Add context after
      for (
        let i = endIdx + 1;
        i <= Math.min(contextEnd, modifiedLines.length - 1);
        i++
      ) {
        diffLines.push(` ${modifiedLines[i]}`);
      }

      diffParts.unshift(diffLines.join("\n")); // Add to beginning since we're processing in reverse

      // Apply the edit
      modifiedLines.splice(startIdx, endIdx - startIdx + 1, ...newLines);
    }

    const newCode = modifiedLines.join("\n");
    const diff = diffParts.length > 0
      ? diffParts.join("\n\n")
      : "No changes made";

    return { newCode, diff };
  }
}

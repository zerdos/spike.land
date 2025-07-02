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

interface McpTool {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, Record<string, unknown>>;
    required?: string[];
  };
}

export class McpServer {
  private tools: McpTool[] = [
    {
      name: "read_code",
      description: "Read the current code from the durable object session",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    {
      name: "read_html",
      description: "Read the current HTML output from the durable object session",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    {
      name: "read_session",
      description: "Read the complete session data (code, html, css, messages)",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    {
      name: "update_code",
      description: "Update the code in the durable object session",
      inputSchema: {
        type: "object",
        properties: {
          code: {
            type: "string",
            description: "The new code to set",
          },
        },
        required: ["code"],
      },
    },
    {
      name: "edit_code",
      description: "Make line-based edits to the code with precise line targeting. Returns git-style diff.",
      inputSchema: {
        type: "object",
        properties: {
          edits: {
            type: "array",
            description: "Array of line-based edit operations",
            items: {
              type: "object",
              properties: {
                startLine: {
                  type: "number",
                  description: "Starting line number (1-based)",
                },
                endLine: {
                  type: "number",
                  description: "Ending line number (1-based, inclusive)",
                },
                newContent: {
                  type: "string",
                  description: "New content to replace the lines (can be empty for deletion)",
                },
              },
              required: ["startLine", "endLine", "newContent"],
            },
          },
        },
        required: ["edits"],
      },
    },
    {
      name: "find_lines",
      description: "Find line numbers containing specific patterns or text",
      inputSchema: {
        type: "object",
        properties: {
          pattern: {
            type: "string",
            description: "Text pattern to search for (can be regex)",
          },
          isRegex: {
            type: "boolean",
            description: "Whether pattern is a regular expression (default: false)",
          },
        },
        required: ["pattern"],
      },
    },
    {
      name: "search_and_replace",
      description: "Search for patterns and replace them without needing exact line numbers",
      inputSchema: {
        type: "object",
        properties: {
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
        required: ["search", "replace"],
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

  async handleRequest(request: Request, _url: URL, _path: string[]): Promise<Response> {
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
              version: "1.0.0",
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
        return new Response(JSON.stringify(errorResponse), { status: 400, headers });
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
                version: "1.0.0",
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
          const result = await this.executeTool(params.name, (params.arguments as Record<string, unknown>) || {});
          return {
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: typeof result === "string" ? result : JSON.stringify(result, null, 2),
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

  private async executeTool(toolName: string, args: Record<string, unknown>): Promise<Record<string, unknown>> {
    const session = this.durableObject.getSession();

    switch (toolName) {
      case "read_code":
        return {
          code: session.code,
          codeSpace: session.codeSpace,
        };

      case "read_html":
        return {
          html: session.html,
          codeSpace: session.codeSpace,
        };

      case "read_session":
        return {
          code: session.code,
          html: session.html,
          css: session.css,
          transpiled: session.transpiled,
          messages: session.messages,
          codeSpace: session.codeSpace,
        };

      case "update_code": {
        if (!args.code || typeof args.code !== "string") {
          throw new Error("Code parameter is required and must be a string");
        }
        
        const updatedSession = {
          ...session,
          code: args.code,
        };
        
        await this.durableObject.updateAndBroadcastSession(updatedSession);
        
        return {
          success: true,
          message: "Code updated successfully",
          codeSpace: session.codeSpace,
        };
      }

      case "edit_code": {
        if (!args.edits || !Array.isArray(args.edits)) {
          throw new Error("Edits parameter is required and must be an array");
        }

        const originalCode = session.code || "";
        const { newCode, diff } = this.applyLineEdits(originalCode, args.edits as Array<{
          startLine: number;
          endLine: number;
          newContent: string;
        }>);
        
        const updatedSession = {
          ...session,
          code: newCode,
        };
        
        await this.durableObject.updateAndBroadcastSession(updatedSession);
        
        return {
          success: true,
          message: "Code edited successfully",
          codeSpace: session.codeSpace,
          diff,
          linesChanged: args.edits.length,
        };
      }

      case "find_lines": {
        if (!args.pattern || typeof args.pattern !== "string") {
          throw new Error("Pattern parameter is required and must be a string");
        }

        const code = session.code || "";
        const lines = code.split("\n");
        const isRegex = args.isRegex === true;
        const matches: Array<{ lineNumber: number; content: string; matchText: string }> = [];

        try {
          const searchPattern = isRegex ? new RegExp(args.pattern, "gi") : args.pattern;
          
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
          throw new Error(`Invalid regex pattern: ${error instanceof Error ? error.message : String(error)}`);
        }

        return {
          pattern: args.pattern,
          isRegex,
          matches,
          totalMatches: matches.length,
          codeSpace: session.codeSpace,
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
              const regex = new RegExp(searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
              const matches = originalCode.match(regex);
              replacements = matches ? matches.length : 0;
              newCode = originalCode.replace(regex, args.replace);
            } else {
              const index = originalCode.indexOf(searchText);
              if (index !== -1) {
                replacements = 1;
                newCode = originalCode.substring(0, index) + args.replace + originalCode.substring(index + searchText.length);
              } else {
                replacements = 0;
                newCode = originalCode;
              }
            }
          }
        } catch (error) {
          throw new Error(`Invalid regex pattern: ${error instanceof Error ? error.message : String(error)}`);
        }

        if (replacements > 0) {
          const updatedSession = {
            ...session,
            code: newCode,
          };
          
          await this.durableObject.updateAndBroadcastSession(updatedSession);
        }

        return {
          success: true,
          message: replacements > 0 ? `Made ${replacements} replacement(s)` : "No matches found",
          replacements,
          search: args.search,
          replace: args.replace,
          isRegex,
          global,
          codeSpace: session.codeSpace,
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
    const index = this.tools.findIndex(tool => tool.name === toolName);
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
    edits: Array<{ startLine: number; endLine: number; newContent: string }>
  ): { newCode: string; diff: string } {
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
        throw new Error(`End line ${edit.endLine} exceeds code length (${originalLines.length} lines)`);
      }
    }

    // Check for overlapping edits
    const sortedEdits = [...edits].sort((a, b) => a.startLine - b.startLine);
    for (let i = 1; i < sortedEdits.length; i++) {
      if (sortedEdits[i].startLine <= sortedEdits[i - 1].endLine) {
        throw new Error(`Overlapping edits detected: lines ${sortedEdits[i - 1].startLine}-${sortedEdits[i - 1].endLine} and ${sortedEdits[i].startLine}-${sortedEdits[i].endLine}`);
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
      
      const diffHeader = `@@ -${edit.startLine},${edit.endLine - edit.startLine + 1} +${edit.startLine},${newLines.length} @@`;
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
      for (let i = endIdx + 1; i <= Math.min(contextEnd, modifiedLines.length - 1); i++) {
        diffLines.push(` ${modifiedLines[i]}`);
      }
      
      diffParts.unshift(diffLines.join("\n")); // Add to beginning since we're processing in reverse
      
      // Apply the edit
      modifiedLines.splice(startIdx, endIdx - startIdx + 1, ...newLines);
    }
    
    const newCode = modifiedLines.join("\n");
    const diff = diffParts.length > 0 ? diffParts.join("\n\n") : "No changes made";
    
    return { newCode, diff };
  }
}
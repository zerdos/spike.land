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
        case "tools/list":
          return {
            jsonrpc: "2.0",
            id,
            result: {
              tools: this.tools,
            },
          };

        case "tools/call": {
          if (!params?.name) {
            throw new Error("Tool name is required");
          }
          const result = await this.executeTool(params.name, params.arguments || {});
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
}
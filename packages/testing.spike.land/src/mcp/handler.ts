import type { ICodeSession } from "@spike-npm-land/code";
import type { Code } from "../chatRoom";
import {
  applyLineEdits,
  editTools,
  executeEditCode,
  executeSearchAndReplace,
  executeUpdateCode,
} from "./tools/edit-tools";
import { executeFindLines, findTools } from "./tools/find-tools";
import {
  executeReadCode,
  executeReadHtml,
  executeReadSession,
  readTools,
} from "./tools/read-tools";
import type { LineEdit, McpRequest, McpResponse, McpTool } from "./types";

const RESPONSE_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export class McpHandler {
  tools: McpTool[] = [...readTools, ...editTools, ...findTools];

  constructor(private durableObject: Code) {}

  private async getSessionForCodeSpace(
    codeSpace: string,
  ): Promise<ICodeSession> {
    const currentSession = this.durableObject.getSession();

    if (currentSession.codeSpace !== codeSpace) {
      console.log(
        `Switching session from '${currentSession.codeSpace}' to '${codeSpace}'`,
      );

      const url = new URL(`http://localhost:8787/?room=${codeSpace}`);

      this.durableObject.initialized = false;

      await this.durableObject.initializeSession(url);

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
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 200, headers: RESPONSE_HEADERS });
    }

    if (request.method === "GET") {
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
        { headers: RESPONSE_HEADERS },
      );
    }

    if (request.method === "POST") {
      try {
        const mcpRequest: McpRequest = await request.json();
        const response = await this.handleMcpRequest(mcpRequest);
        return new Response(JSON.stringify(response), { headers: RESPONSE_HEADERS });
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
          headers: RESPONSE_HEADERS,
        });
      }
    }

    return new Response("Method not allowed", { status: 405, headers: RESPONSE_HEADERS });
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
    const requestedCodeSpace = args.codeSpace as string;
    if (!requestedCodeSpace) {
      throw new Error(`codeSpace parameter is required for tool '${toolName}'`);
    }

    const session = await this.getSessionForCodeSpace(requestedCodeSpace);

    console.log(
      `MCP Tool '${toolName}' executing for codeSpace: ${requestedCodeSpace}`,
    );

    if (!session.codeSpace) {
      throw new Error(
        "Session codeSpace is missing. The session may not be properly initialized.",
      );
    }

    const updateSession = async (updatedSession: ICodeSession) => {
      await this.durableObject.updateAndBroadcastSession(updatedSession);
    };

    switch (toolName) {
      case "read_code":
        return executeReadCode(session, requestedCodeSpace);

      case "read_html":
        return executeReadHtml(session, requestedCodeSpace);

      case "read_session":
        return executeReadSession(session, requestedCodeSpace);

      case "update_code": {
        if (!args.code || typeof args.code !== "string") {
          throw new Error("Code parameter is required and must be a string");
        }
        return executeUpdateCode(session, requestedCodeSpace, args.code, updateSession);
      }

      case "edit_code": {
        if (!args.edits || !Array.isArray(args.edits)) {
          throw new Error("Edits parameter is required and must be an array");
        }
        return executeEditCode(
          session,
          requestedCodeSpace,
          args.edits as LineEdit[],
          updateSession,
        );
      }

      case "find_lines": {
        if (!args.pattern || typeof args.pattern !== "string") {
          throw new Error("Pattern parameter is required and must be a string");
        }
        return executeFindLines(
          session,
          requestedCodeSpace,
          args.pattern,
          args.isRegex === true,
        );
      }

      case "search_and_replace": {
        if (!args.search || typeof args.search !== "string") {
          throw new Error("Search parameter is required and must be a string");
        }
        if (typeof args.replace !== "string") {
          throw new Error("Replace parameter is required and must be a string");
        }
        return executeSearchAndReplace(
          session,
          requestedCodeSpace,
          args.search,
          args.replace,
          args.isRegex === true,
          args.global !== false,
          updateSession,
        );
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  }

  addTool(tool: McpTool): void {
    this.tools.push(tool);
  }

  removeTool(toolName: string): boolean {
    const index = this.tools.findIndex((tool) => tool.name === toolName);
    if (index !== -1) {
      this.tools.splice(index, 1);
      return true;
    }
    return false;
  }

  getTools(): McpTool[] {
    return [...this.tools];
  }

  applyLineEdits(
    originalCode: string,
    edits: LineEdit[],
  ): { newCode: string; diff: string; } {
    return applyLineEdits(originalCode, edits);
  }
}

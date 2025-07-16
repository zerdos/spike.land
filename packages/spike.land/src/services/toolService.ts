import type { z } from "zod";
import type { Code } from "../chatRoom";
import type { McpServer } from "../mcpServer";
import { JsonSchemaToZodConverter } from "../utils/jsonSchemaToZod";

export type ToolExecuteParams = Record<string, unknown>;

export interface AiSdkTool {
  description: string;
  parameters: z.ZodTypeAny;
  execute: (params: ToolExecuteParams) => Promise<string>;
}

export class ToolService {
  private schemaConverter: JsonSchemaToZodConverter;

  constructor(private code: Code) {
    this.schemaConverter = new JsonSchemaToZodConverter();
  }

  /**
   * Generate tools dynamically from MCP server definitions
   */
  generateToolsFromMcp(mcpServer: McpServer, origin: string): Record<string, AiSdkTool> {
    const mcpTools = mcpServer.getTools();
    const tools: Record<string, AiSdkTool> = {};

    for (const mcpTool of mcpTools) {
      // Convert the JSON Schema to Zod schema
      const zodSchema = this.schemaConverter.convert(mcpTool.inputSchema);

      // Create the tool definition for AI SDK
      tools[mcpTool.name] = {
        description: mcpTool.description,
        parameters: zodSchema,
        execute: async (params: ToolExecuteParams) => {
          const result = await this.executeMcpTool(mcpTool.name, params, origin);
          return JSON.stringify(result, null, 2);
        },
      };
    }

    return tools;
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
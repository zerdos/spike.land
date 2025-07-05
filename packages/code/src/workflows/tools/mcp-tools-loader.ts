import { md5 } from "@/lib/md5";
import type { RunnableToolLike } from "@langchain/core/runnables";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import type { CodeModification } from "../chat-langchain";

interface McpTool {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, any>;
    required?: string[];
  };
}

interface McpToolsResponse {
  tools: McpTool[];
}

/**
 * Loads available tools from the MCP server
 */
export async function loadMcpTools(
  codeSpace: string,
  origin: string,
): Promise<RunnableToolLike[]> {
  const mcpUrl = `${origin}/api/room/${codeSpace}/mcp`;

  try {
    // Request available tools from MCP server
    const response = await fetch(mcpUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "tools/list",
        params: {},
        id: `list-tools-${Date.now()}`,
      }),
    });

    if (!response.ok) {
      console.error(`Failed to load MCP tools: ${response.status}`);
      return getFallbackTools(codeSpace, origin);
    }

    const result = await response.json() as {
      result?: McpToolsResponse;
      error?: { message: string; };
    };

    if (result.error || !result.result?.tools) {
      console.error("MCP tools error:", result.error);
      return getFallbackTools(codeSpace, origin);
    }

    // Convert MCP tools to LangChain tools
    const tools: RunnableToolLike[] = [];

    for (const mcpTool of result.result.tools) {
      // Create Zod schema from MCP input schema
      const schema = createZodSchema(mcpTool.inputSchema);

      // Create LangChain tool wrapper
      const langchainTool = tool(
        async (args: unknown): Promise<any> => {
          const typedArgs = args as Record<string, any>;
          // Call MCP server with tool invocation
          const toolResponse = await fetch(mcpUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              jsonrpc: "2.0",
              method: "tools/call",
              params: {
                name: mcpTool.name,
                arguments: {
                  ...typedArgs,
                  codeSpace,
                },
              },
              id: `${mcpTool.name}-${Date.now()}`,
            }),
          });

          if (!toolResponse.ok) {
            throw new Error(`MCP tool call failed: ${toolResponse.status}`);
          }

          const toolResult = await toolResponse.json();

          if (toolResult.error) {
            throw new Error(`MCP error: ${toolResult.error.message}`);
          }

          // Handle different response formats
          if (mcpTool.name === "search_and_replace" || mcpTool.name === "update_code") {
            // For code modification tools, return CodeModification format
            return handleCodeModificationResponse(toolResult, typedArgs["path"], origin, codeSpace);
          }

          // For other tools, return the raw result
          return toolResult.result;
        },
        {
          name: mcpTool.name,
          description: mcpTool.description,
          schema: schema as any,
        },
      );

      tools.push(langchainTool as unknown as RunnableToolLike);
    }

    return tools;
  } catch (error) {
    console.error("Failed to load MCP tools:", error);
    return getFallbackTools(codeSpace, origin);
  }
}

/**
 * Creates a Zod schema from MCP input schema
 */
function createZodSchema(inputSchema: any): z.ZodSchema {
  const schemaObj: Record<string, z.ZodSchema> = {};

  if (inputSchema.properties) {
    for (const [key, prop] of Object.entries(inputSchema.properties as Record<string, any>)) {
      let zodType: z.ZodSchema;

      switch (prop.type) {
        case "string":
          zodType = z.string();
          break;
        case "number":
          zodType = z.number();
          break;
        case "boolean":
          zodType = z.boolean();
          break;
        case "array":
          zodType = z.array(z.any());
          break;
        case "object":
          zodType = z.object({}).passthrough();
          break;
        default:
          zodType = z.any();
      }

      if (prop.description) {
        zodType = zodType.describe(prop.description);
      }

      schemaObj[key] = zodType;
    }
  }

  const schema = z.object(schemaObj);

  // Make non-required fields optional
  if (inputSchema.required && Array.isArray(inputSchema.required)) {
    const requiredSet = new Set(inputSchema.required);
    const partialObj: Record<string, z.ZodSchema> = {};

    for (const [key, value] of Object.entries(schemaObj)) {
      if (!requiredSet.has(key)) {
        partialObj[key] = value.optional();
      } else {
        partialObj[key] = value;
      }
    }

    return z.object(partialObj);
  }

  return schema;
}

/**
 * Handles code modification tool responses
 */
async function handleCodeModificationResponse(
  toolResult: any,
  path: string,
  origin: string,
  _codeSpace: string,
): Promise<CodeModification> {
  try {
    // Extract response text
    const responseText = toolResult.result?.content?.[0]?.text || "";

    // Check if operation was successful
    if (!responseText.includes("successfully") && !responseText.includes("Updated")) {
      return {
        code: "",
        hash: "",
        error: responseText || "Unknown MCP error",
      };
    }

    // Fetch updated code
    const codePath = path.replace("/live/", "").replace(".tsx", "");
    const codeResponse = await fetch(`${origin}/live/${codePath}/index.tsx`);

    if (!codeResponse.ok) {
      return {
        code: "",
        hash: "",
        error: "Failed to fetch updated code",
      };
    }

    const updatedCode = await codeResponse.text();
    const newHash = md5(updatedCode);

    return {
      code: updatedCode,
      hash: newHash,
    };
  } catch (error) {
    return {
      code: "",
      hash: "",
      error: `Failed to process MCP response: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
}

/**
 * Provides fallback tools if MCP server is unavailable
 */
function getFallbackTools(_codeSpace: string, _origin: string): RunnableToolLike[] {
  console.warn("Using fallback tool as MCP server tools could not be loaded");

  // Return a basic search_and_replace tool as fallback
  const fallbackTool = tool(
    async (_: {
      path: string;
      search: string;
      replace: string;
    }): Promise<CodeModification> => {
      return {
        code: "",
        hash: "",
        error: "MCP server unavailable - cannot perform file operations",
      };
    },
    {
      name: "search_and_replace",
      description: "Fallback tool - MCP server unavailable",
      schema: z.object({
        path: z.string().describe("File path"),
        search: z.string().describe("Text to search"),
        replace: z.string().describe("Replacement text"),
      }),
    },
  );

  return [fallbackTool as unknown as RunnableToolLike];
}

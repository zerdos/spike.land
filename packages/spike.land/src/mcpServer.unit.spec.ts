import type { ICodeSession } from "@spike-npm-land/code";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Code } from "./chatRoom";
import { McpServer } from "./mcpServer";

// Type interface for MCP test responses
interface TestMcpResponse {
  result?: {
    serverInfo?: { name: string; version: string; };
    protocolVersion?: string;
    capabilities?: { tools: { listChanged: boolean; }; };
    tools?: Array<
      {
        name: string;
        description: string;
        inputSchema: Record<string, unknown>;
      }
    >;
    content?: Array<{ type: string; text: string; }>;
  };
  error?: { code: number; message: string; data?: string; };
}

// Mock the Code durable object
const createMockDurableObject = (session: ICodeSession): Code => {
  const mockDO = {
    session,
    initialized: true,
    getSession: vi.fn(() => session),
    initializeSession: vi.fn(),
    updateAndBroadcastSession: vi.fn(),
  } as unknown as Code;

  return mockDO;
};

describe("MCP Server Unit Tests", () => {
  let mcpServer: McpServer;
  let mockDurableObject: Code;
  let testSession: ICodeSession;

  beforeEach(() => {
    testSession = {
      codeSpace: "test",
      code: "// Test code",
      html: "<div>Test</div>",
      css: ".test { color: red; }",
      transpiled: "// Transpiled code",
      messages: [],
    };

    mockDurableObject = createMockDurableObject(testSession);
    mcpServer = new McpServer(mockDurableObject);
  });

  describe("Tool Registration", () => {
    it("should have all expected tools registered", () => {
      const tools = mcpServer.getTools();
      const toolNames = tools.map((t) => t.name);

      expect(toolNames).toContain("read_code");
      expect(toolNames).toContain("read_html");
      expect(toolNames).toContain("read_session");
      expect(toolNames).toContain("update_code");
      expect(toolNames).toContain("edit_code");
      expect(toolNames).toContain("find_lines");
      expect(toolNames).toContain("search_and_replace");
    });

    it("should allow adding custom tools", () => {
      const customTool = {
        name: "custom_tool",
        description: "A custom tool",
        inputSchema: {
          type: "object" as const,
          properties: {},
        },
      };

      mcpServer.addTool(customTool);
      const tools = mcpServer.getTools();

      expect(tools).toContainEqual(customTool);
    });

    it("should allow removing tools", () => {
      const removed = mcpServer.removeTool("read_code");
      expect(removed).toBe(true);

      const tools = mcpServer.getTools();
      const toolNames = tools.map((t) => t.name);
      expect(toolNames).not.toContain("read_code");
    });
  });

  describe("Request Handling", () => {
    it("should handle OPTIONS requests", async () => {
      const request = new Request("http://localhost/mcp", {
        method: "OPTIONS",
      });

      const response = await mcpServer.handleRequest(
        request,
        new URL("http://localhost/mcp"),
        ["mcp"],
      );

      expect(response.status).toBe(200);
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    });

    it("should handle GET requests with server capabilities", async () => {
      const request = new Request("http://localhost/mcp", {
        method: "GET",
      });

      const response = await mcpServer.handleRequest(
        request,
        new URL("http://localhost/mcp"),
        ["mcp"],
      );

      expect(response.status).toBe(200);
      const data = await response.json() as TestMcpResponse;
      expect(data.result?.serverInfo?.name).toBe("spike.land-mcp-server");
      expect(data.result?.serverInfo?.version).toBe("1.0.1");
    });

    it("should handle initialize method", async () => {
      const request = new Request("http://localhost/mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "initialize",
          params: {
            protocolVersion: "2024-11-05",
            capabilities: {},
            clientInfo: { name: "test", version: "1.0" },
          },
        }),
      });

      const response = await mcpServer.handleRequest(
        request,
        new URL("http://localhost/mcp"),
        ["mcp"],
      );

      const data = await response.json() as TestMcpResponse;
      expect(data.result?.protocolVersion).toBe("2024-11-05");
      expect(data.result?.capabilities?.tools?.listChanged).toBe(true);
    });

    it("should handle tools/list method", async () => {
      const request = new Request("http://localhost/mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "tools/list",
        }),
      });

      const response = await mcpServer.handleRequest(
        request,
        new URL("http://localhost/mcp"),
        ["mcp"],
      );

      const data = await response.json() as TestMcpResponse;
      expect(data.result?.tools).toBeInstanceOf(Array);
      expect(data.result?.tools?.length).toBeGreaterThan(0);
    });

    it("should handle invalid JSON", async () => {
      const request = new Request("http://localhost/mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{ invalid json",
      });

      const response = await mcpServer.handleRequest(
        request,
        new URL("http://localhost/mcp"),
        ["mcp"],
      );

      expect(response.status).toBe(400);
      const data = await response.json() as TestMcpResponse;
      expect(data.error?.code).toBe(-32700);
      expect(data.error?.message).toBe("Parse error");
    });
  });

  describe("Line Edit Operations", () => {
    it("should apply single line edit correctly", () => {
      const originalCode = "line1\nline2\nline3\nline4";
      const edits = [{
        startLine: 2,
        endLine: 2,
        newContent: "modified line2",
      }];

      // Access private method through any cast for testing
      const result = (mcpServer as any).applyLineEdits(originalCode, edits);

      expect(result.newCode).toBe("line1\nmodified line2\nline3\nline4");
      expect(result.diff).toContain("-line2");
      expect(result.diff).toContain("+modified line2");
    });

    it("should apply multiple line edits in correct order", () => {
      const originalCode = "line1\nline2\nline3\nline4\nline5";
      const edits = [
        {
          startLine: 2,
          endLine: 3,
          newContent: "combined 2-3",
        },
        {
          startLine: 4,
          endLine: 4,
          newContent: "modified line4",
        },
      ];

      const result = (mcpServer as any).applyLineEdits(originalCode, edits);

      expect(result.newCode).toBe("line1\ncombined 2-3\nmodified line4\nline5");
    });

    it("should handle line deletion", () => {
      const originalCode = "line1\nline2\nline3\nline4";
      const edits = [{
        startLine: 2,
        endLine: 3,
        newContent: "", // Delete lines 2-3
      }];

      const result = (mcpServer as any).applyLineEdits(originalCode, edits);

      expect(result.newCode).toBe("line1\nline4");
      expect(result.diff).toContain("-line2");
      expect(result.diff).toContain("-line3");
    });

    it("should validate line numbers", () => {
      const originalCode = "line1\nline2";
      const edits = [{
        startLine: 5,
        endLine: 5,
        newContent: "out of bounds",
      }];

      expect(() => {
        (mcpServer as any).applyLineEdits(originalCode, edits);
      }).toThrow("exceeds code length");
    });

    it("should detect overlapping edits", () => {
      const originalCode = "line1\nline2\nline3\nline4";
      const edits = [
        {
          startLine: 2,
          endLine: 3,
          newContent: "edit1",
        },
        {
          startLine: 3,
          endLine: 4,
          newContent: "edit2",
        },
      ];

      expect(() => {
        (mcpServer as any).applyLineEdits(originalCode, edits);
      }).toThrow("Overlapping edits detected");
    });
  });

  describe("CodeSpace Switching", () => {
    it("should switch to different codeSpace when requested", async () => {
      // Set up mock to simulate codeSpace switching
      const newSession = { ...testSession, codeSpace: "new-space" };
      let currentSession = testSession;

      mockDurableObject.getSession = vi.fn(() => currentSession);
      mockDurableObject.initializeSession = vi.fn(async () => {
        currentSession = newSession;
      });

      const request = new Request("http://localhost/mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "tools/call",
          params: {
            name: "read_code",
            arguments: { codeSpace: "new-space" },
          },
        }),
      });

      const response = await mcpServer.handleRequest(
        request,
        new URL("http://localhost/mcp"),
        ["mcp"],
      );

      expect(mockDurableObject.initializeSession).toHaveBeenCalled();
      expect(response.status).toBe(200);
    });
  });

  describe("Tool Execution", () => {
    it("should execute read_code tool", async () => {
      const request = new Request("http://localhost/mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "tools/call",
          params: {
            name: "read_code",
            arguments: { codeSpace: "test" },
          },
        }),
      });

      const response = await mcpServer.handleRequest(
        request,
        new URL("http://localhost/mcp"),
        ["mcp"],
      );

      const data = await response.json() as TestMcpResponse;
      const result = JSON.parse(data.result?.content?.[0]?.text || "{}");
      expect(result.code).toBe("// Test code");
      expect(result.codeSpace).toBe("test");
    });

    it("should execute update_code tool", async () => {
      const request = new Request("http://localhost/mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "tools/call",
          params: {
            name: "update_code",
            arguments: {
              codeSpace: "test",
              code: "// Updated code",
            },
          },
        }),
      });

      const response = await mcpServer.handleRequest(
        request,
        new URL("http://localhost/mcp"),
        ["mcp"],
      );

      const data = await response.json() as TestMcpResponse;
      const result = JSON.parse(data.result?.content?.[0]?.text || "{}");
      expect(result.success).toBe(true);
      expect(mockDurableObject.updateAndBroadcastSession).toHaveBeenCalled();
    });

    it("should handle missing tool name", async () => {
      const request = new Request("http://localhost/mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "tools/call",
          params: {
            arguments: { codeSpace: "test" },
          },
        }),
      });

      const response = await mcpServer.handleRequest(
        request,
        new URL("http://localhost/mcp"),
        ["mcp"],
      );

      const data = await response.json() as TestMcpResponse;
      expect(data.error).toBeDefined();
      expect(data.error?.data).toContain("Tool name is required");
    });

    it("should handle unknown tool", async () => {
      const request = new Request("http://localhost/mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "tools/call",
          params: {
            name: "unknown_tool",
            arguments: { codeSpace: "test" },
          },
        }),
      });

      const response = await mcpServer.handleRequest(
        request,
        new URL("http://localhost/mcp"),
        ["mcp"],
      );

      const data = await response.json() as TestMcpResponse;
      expect(data.error).toBeDefined();
      expect(data.error?.data).toContain("Unknown tool: unknown_tool");
    });
  });
});

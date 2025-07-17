import type { ChildProcess } from "child_process";
import { spawn } from "child_process";
import { promisify } from "util";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

const sleep = promisify(setTimeout);

interface McpResponse {
  jsonrpc: string;
  id: number;
  result?: {
    protocolVersion?: string;
    serverInfo?: {
      name: string;
      version: string;
    };
    content?: Array<{
      type: string;
      text: string;
    }>;
    tools?: Array<{
      name: string;
      description: string;
      inputSchema: Record<string, unknown>;
    }>;
  };
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

describe("MCP Server Integration Tests", () => {
  let wranglerProcess: ChildProcess;
  const baseUrl = "http://localhost:8787";
  const mcpEndpoint = `${baseUrl}/mcp`;
  const testCodeSpace = "e2e";

  // Helper function to make MCP requests
  async function mcpRequest(
    method: string,
    params: Record<string, unknown> = {},
    id = 1,
  ): Promise<McpResponse> {
    const response = await fetch(mcpEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id,
        method,
        params,
      }),
    });

    return response.json();
  }

  // Helper function to call MCP tools
  async function callTool(
    toolName: string,
    args: Record<string, unknown>,
    id = 1,
  ): Promise<McpResponse> {
    return mcpRequest("tools/call", {
      name: toolName,
      arguments: args,
    }, id);
  }

  // Start the wrangler dev server
  beforeAll(async () => {
    console.log("Starting wrangler dev server...");

    wranglerProcess = spawn("yarn", ["dev"], {
      cwd: process.cwd(),
      env: { ...process.env, NODE_ENV: "test" },
      stdio: ["ignore", "pipe", "pipe"],
    });

    // Wait for server to start
    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Wrangler server failed to start in time"));
      }, 30000);

      wranglerProcess.stdout?.on("data", (data) => {
        const output = data.toString();
        if (output.includes("Ready on http://localhost:8787")) {
          clearTimeout(timeout);
          resolve();
        }
      });

      wranglerProcess.stderr?.on("data", (data) => {
        console.error("Wrangler stderr:", data.toString());
      });

      wranglerProcess.on("error", (error) => {
        clearTimeout(timeout);
        reject(error);
      });
    });

    // Give it a bit more time to stabilize
    await sleep(2000);
    console.log("Wrangler server started successfully");
  }, 60000);

  afterAll(async () => {
    console.log("Stopping wrangler server...");
    if (wranglerProcess) {
      wranglerProcess.kill("SIGTERM");
      // Wait for process to exit
      await new Promise((resolve) => {
        wranglerProcess.on("exit", resolve);
        setTimeout(resolve, 5000); // Force resolve after 5 seconds
      });
    }
  });

  beforeEach(async () => {
    // Initialize the e2e codeSpace
    await fetch(`${baseUrl}/${testCodeSpace}`);
    await sleep(100);
  });

  describe("MCP Protocol", () => {
    it("should handle initialize request", async () => {
      const response = await mcpRequest("initialize", {
        protocolVersion: "2024-11-05",
        capabilities: {},
        clientInfo: {
          name: "test-client",
          version: "1.0.0",
        },
      });

      expect(response.jsonrpc).toBe("2.0");
      expect(response.result).toBeDefined();
      expect(response.result?.protocolVersion).toBe("2024-11-05");
      expect(response.result?.serverInfo).toEqual({
        name: "spike.land-mcp-server",
        version: "1.0.1",
      });
    });

    it("should list available tools", async () => {
      const response = await mcpRequest("tools/list");

      expect(response.result?.tools).toBeDefined();
      expect(Array.isArray(response.result?.tools)).toBe(true);

      const tools = response.result?.tools || [];
      const toolNames = tools.map(t => t.name);

      expect(toolNames).toContain("read_code");
      expect(toolNames).toContain("read_html");
      expect(toolNames).toContain("read_session");
      expect(toolNames).toContain("update_code");
      expect(toolNames).toContain("edit_code");
      expect(toolNames).toContain("find_lines");
      expect(toolNames).toContain("search_and_replace");
    });
  });

  describe("Code Operations", () => {
    const testCode = `// E2E Test
export default () => {
  return <div>Hello E2E!</div>;
};`;

    it("should read code from a codeSpace", async () => {
      const response = await callTool("read_code", {
        codeSpace: testCodeSpace,
      });

      expect(response.result?.content).toBeDefined();
      const content = JSON.parse(response.result?.content?.[0]?.text || "{}");
      expect(content.codeSpace).toBe(testCodeSpace);
      expect(content.code).toBeDefined();
    });

    it("should update code in a codeSpace", async () => {
      const response = await callTool("update_code", {
        codeSpace: testCodeSpace,
        code: testCode,
      });

      expect(response.result?.content).toBeDefined();
      const content = JSON.parse(response.result?.content?.[0]?.text || "{}");
      expect(content.success).toBe(true);
      expect(content.codeSpace).toBe(testCodeSpace);
      expect(content.requiresTranspilation).toBe(true);

      // Verify the code was updated via MCP
      const readResponse = await callTool("read_code", {
        codeSpace: testCodeSpace,
      });
      const readContent = JSON.parse(readResponse.result?.content?.[0]?.text || "{}");
      expect(readContent.code).toBe(testCode);

      // Verify the code was actually persisted by fetching the file directly
      await sleep(100); // Give time for async operations
      const fileResponse = await fetch(`${baseUrl}/live/${testCodeSpace}/index.tsx`);
      expect(fileResponse.status).toBe(200);
      const fileContent = await fileResponse.text();
      expect(fileContent).toBe(testCode);
    });

    it("should edit specific lines of code", async () => {
      // First set some code
      await callTool("update_code", {
        codeSpace: testCodeSpace,
        code: testCode,
      });

      // Edit line 3
      const response = await callTool("edit_code", {
        codeSpace: testCodeSpace,
        edits: [{
          startLine: 3,
          endLine: 3,
          newContent: "  return <div>Hello E2E - Edited!</div>;",
        }],
      });

      expect(response.result?.content).toBeDefined();
      const content = JSON.parse(response.result?.content?.[0]?.text || "{}");
      expect(content.success).toBe(true);
      expect(content.linesChanged).toBe(1);
      expect(content.diff).toContain("-  return <div>Hello E2E!</div>;");
      expect(content.diff).toContain("+  return <div>Hello E2E - Edited!</div>;");

      // Verify the edit was persisted via HTTP
      await sleep(100);
      const fileResponse = await fetch(`${baseUrl}/live/${testCodeSpace}/index.tsx`);
      const fileContent = await fileResponse.text();
      expect(fileContent).toContain("Hello E2E - Edited!");
    });

    it("should find lines matching a pattern", async () => {
      // Set code with multiple occurrences
      const codeWithPatterns = `// Test code
const message = "Hello World";
function sayHello() {
  console.log("Hello from function");
  return "Hello";
}
// Another Hello in comment`;

      await callTool("update_code", {
        codeSpace: testCodeSpace,
        code: codeWithPatterns,
      });

      const response = await callTool("find_lines", {
        codeSpace: testCodeSpace,
        pattern: "Hello",
      });

      const content = JSON.parse(response.result?.content?.[0]?.text || "{}");
      expect(content.totalMatches).toBe(4);
      expect(content.matches).toHaveLength(4);
      expect(content.matches[0].lineNumber).toBe(2);
      expect(content.matches[1].lineNumber).toBe(4);
    });

    it("should search and replace text", async () => {
      await callTool("update_code", {
        codeSpace: testCodeSpace,
        code: testCode,
      });

      const response = await callTool("search_and_replace", {
        codeSpace: testCodeSpace,
        search: "E2E",
        replace: "Integration",
        global: true,
      });

      const content = JSON.parse(response.result?.content?.[0]?.text || "{}");
      expect(content.success).toBe(true);
      expect(content.replacements).toBe(2); // "E2E" appears twice in testCode

      // Verify replacements via MCP
      const readResponse = await callTool("read_code", {
        codeSpace: testCodeSpace,
      });
      const readContent = JSON.parse(readResponse.result?.content?.[0]?.text || "{}");
      expect(readContent.code).toContain("Integration Test");
      expect(readContent.code).toContain("Hello Integration!");
      expect(readContent.code).not.toContain("E2E");

      // Verify replacements via HTTP
      await sleep(100);
      const fileResponse = await fetch(`${baseUrl}/live/${testCodeSpace}/index.tsx`);
      const fileContent = await fileResponse.text();
      expect(fileContent).toContain("Integration Test");
      expect(fileContent).toContain("Hello Integration!");
      expect(fileContent).not.toContain("E2E");
    });

    it("should handle regex patterns in find_lines", async () => {
      const codeWithFunctions = `
function testFunc() {}
const arrowFunc = () => {};
function anotherFunc(param) {}
`;

      await callTool("update_code", {
        codeSpace: testCodeSpace,
        code: codeWithFunctions,
      });

      const response = await callTool("find_lines", {
        codeSpace: testCodeSpace,
        pattern: "function\\s+\\w+",
        isRegex: true,
      });

      const content = JSON.parse(response.result?.content?.[0]?.text || "{}");
      expect(content.totalMatches).toBe(2); // Two traditional function declarations
      expect(content.isRegex).toBe(true);
    });
  });

  describe("Session Operations", () => {
    it("should read HTML from session", async () => {
      const response = await callTool("read_html", {
        codeSpace: testCodeSpace,
      });

      expect(response.result?.content).toBeDefined();
      const content = JSON.parse(response.result?.content?.[0]?.text || "{}");
      expect(content.codeSpace).toBe(testCodeSpace);
      expect(content.html).toBeDefined();
    });

    it("should read complete session data", async () => {
      const response = await callTool("read_session", {
        codeSpace: testCodeSpace,
      });

      expect(response.result?.content).toBeDefined();
      const content = JSON.parse(response.result?.content?.[0]?.text || "{}");
      expect(content.codeSpace).toBe(testCodeSpace);
      expect(content.code).toBeDefined();
      expect(content.html).toBeDefined();
      expect(content.css).toBeDefined();
      expect(content.transpiled).toBeDefined();
      expect(content.messages).toBeDefined();
      expect(Array.isArray(content.messages)).toBe(true);
    });
  });

  describe("Error Handling", () => {
    it("should handle invalid tool name", async () => {
      const response = await callTool("invalid_tool", {
        codeSpace: testCodeSpace,
      });

      expect(response.error).toBeDefined();
      expect(response.error?.code).toBe(-32603);
      expect(response.error?.data).toContain("Unknown tool: invalid_tool");
    });

    it("should handle missing required parameters", async () => {
      const response = await callTool("read_code", {
        // Missing codeSpace parameter
      });

      expect(response.error).toBeDefined();
      expect(response.error?.code).toBe(-32603);
      expect(response.error?.data).toContain("codeSpace parameter is required");
    });

    it("should handle invalid JSON in request", async () => {
      const response = await fetch(mcpEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: "{ invalid json",
      });

      const result = await response.json() as McpResponse;
      expect(result.error).toBeDefined();
      expect(result.error?.code).toBe(-32700);
      expect(result.error?.message).toBe("Parse error");
    });

    it("should handle invalid line numbers in edit_code", async () => {
      await callTool("update_code", {
        codeSpace: testCodeSpace,
        code: "line1\nline2\nline3",
      });

      const response = await callTool("edit_code", {
        codeSpace: testCodeSpace,
        edits: [{
          startLine: 10, // Beyond end of file
          endLine: 11,
          newContent: "new line",
        }],
      });

      expect(response.error).toBeDefined();
      expect(response.error?.data).toContain("exceeds code length");
    });
  });

  describe("CodeSpace Switching", () => {
    it("should switch between different codeSpaces", async () => {
      // Update code in first codeSpace
      await callTool("update_code", {
        codeSpace: "space1",
        code: "// Code for space1",
      });

      // Update code in second codeSpace
      await callTool("update_code", {
        codeSpace: "space2",
        code: "// Code for space2",
      });

      // Read from first codeSpace
      const response1 = await callTool("read_code", {
        codeSpace: "space1",
      });
      const content1 = JSON.parse(response1.result?.content?.[0]?.text || "{}");
      expect(content1.code).toBe("// Code for space1");

      // Read from second codeSpace
      const response2 = await callTool("read_code", {
        codeSpace: "space2",
      });
      const content2 = JSON.parse(response2.result?.content?.[0]?.text || "{}");
      expect(content2.code).toBe("// Code for space2");
    });
  });
});

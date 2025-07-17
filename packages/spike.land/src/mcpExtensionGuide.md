# MCP Server Extension Guide

This guide explains how to extend the MCP (Model Context Protocol) server
functionality in the spike.land durable object.

## Overview

The MCP server is implemented in `mcpServer.ts` and provides tools for AI agents
to interact with the durable object's session data. The server follows the MCP
specification and provides a clean, extensible architecture.

## Current Tools

### Read Operations

- `read_code`: Get the current code from the session
- `read_html`: Get the current HTML output
- `read_session`: Get complete session data (code, html, css, messages)

### Write Operations

- `update_code`: Update the code in the session
- `edit_code`: Make precise line-based edits with git-style diff output

## Adding New Tools

### 1. Define the Tool Schema

Add your tool definition to the `tools` array in `mcpServer.ts`:

```typescript
{
  name: "your_tool_name",
  description: "Clear description of what your tool does",
  inputSchema: {
    type: "object",
    properties: {
      param1: {
        type: "string",
        description: "Description of parameter"
      },
      param2: {
        type: "number",
        description: "Another parameter"
      }
    },
    required: ["param1"] // Optional - specify required parameters
  }
}
```

### 2. Implement Tool Logic

Add a case for your tool in the `executeTool` method:

```typescript
case "your_tool_name":
  // Validate parameters
  if (!args.param1) {
    throw new Error("param1 is required");
  }
  
  // Access session data
  const session = this.durableObject.getSession();
  
  // Perform your logic
  const result = await yourCustomLogic(args.param1, session);
  
  // Return result
  return {
    success: true,
    data: result
  };
```

### 3. Access Durable Object Methods

You can access these methods from the durable object:

```typescript
// Read session data
const session = this.durableObject.getSession();

// Update session (triggers save and broadcast)
await this.durableObject.updateAndBroadcastSession(newSession);

// Access environment variables
const env = this.durableObject.getEnv();

// Access storage directly
const state = this.durableObject.getState();
const data = await state.storage.get("key");
```

## edit_code Tool Usage Examples

The `edit_code` tool allows for precise, token-efficient line-based edits:

### Single Line Edit

```json
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "edit_code",
    "arguments": {
      "edits": [
        {
          "startLine": 5,
          "endLine": 5,
          "newContent": "const newVariable = 'updated value';"
        }
      ]
    }
  }
}
```

### Multi-Line Replacement

```json
{
  "edits": [
    {
      "startLine": 10,
      "endLine": 15,
      "newContent": "// New function\nconst helper = () => {\n  return 'refactored';\n};"
    }
  ]
}
```

### Line Deletion

```json
{
  "edits": [
    {
      "startLine": 8,
      "endLine": 10,
      "newContent": ""
    }
  ]
}
```

### Multiple Edits (Applied in Order)

```json
{
  "edits": [
    {
      "startLine": 1,
      "endLine": 1,
      "newContent": "// File header comment"
    },
    {
      "startLine": 20,
      "endLine": 22,
      "newContent": "// Refactored section\nif (condition) {\n  doSomething();\n}"
    }
  ]
}
```

### Response Format

```json
{
  "success": true,
  "message": "Code edited successfully",
  "codeSpace": "your-room-name",
  "diff": "@@ -1,3 +1,4 @@\n+// File header comment\n export default () => (\n   <div>\n     <h1>Hello</h1>",
  "linesChanged": 2
}
```

## Example: Adding a CSS Update Tool

Here's how to add a tool that updates CSS:

### 1. Add Tool Definition

```typescript
{
  name: "update_css",
  description: "Update the CSS styles in the session", 
  inputSchema: {
    type: "object",
    properties: {
      css: {
        type: "string",
        description: "The new CSS to apply"
      }
    },
    required: ["css"]
  }
}
```

### 2. Implement Tool Logic

```typescript
case "update_css":
  if (!args.css || typeof args.css !== "string") {
    throw new Error("CSS parameter is required and must be a string");
  }
  
  const updatedSession = {
    ...session,
    css: args.css,
  };
  
  await this.durableObject.updateAndBroadcastSession(updatedSession);
  
  return {
    success: true,
    message: "CSS updated successfully",
  };
```

## Advanced Tool Ideas

Here are some advanced tools you could implement:

### Code Analysis Tools

- `analyze_code`: Parse and analyze code structure
- `find_dependencies`: Extract import/require statements
- `check_syntax`: Validate TypeScript/JavaScript syntax
- `get_metrics`: Calculate complexity, lines of code, etc.

### Session Management Tools

- `create_backup`: Save current session state
- `list_backups`: Show available backups
- `restore_backup`: Restore from a backup
- `export_session`: Export session to various formats

### Development Tools

- `format_code`: Auto-format code using prettier
- `lint_code`: Run ESLint on the code
- `transpile_preview`: Show transpiled output
- `run_tests`: Execute test code

### Collaboration Tools

- `get_active_users`: List connected WebSocket users
- `send_message`: Send message to all users
- `get_change_history`: Get recent session changes

## Tool Response Formats

### Success Response

```typescript
return {
  success: true,
  data: yourData,
  message: "Optional success message",
};
```

### Error Handling

```typescript
// Throw errors for validation issues
if (!requiredParam) {
  throw new Error("Parameter is required");
}

// The framework will automatically wrap in proper MCP error response
```

## Dynamic Tool Management

You can add/remove tools at runtime:

```typescript
// Add a tool
mcpServer.addTool({
  name: "dynamic_tool",
  description: "A dynamically added tool",
  inputSchema: { type: "object", properties: {} },
});

// Remove a tool
mcpServer.removeTool("tool_name");

// List current tools
const tools = mcpServer.getTools();
```

## Usage from MCP Clients

### HTTP Requests

```bash
# Get server capabilities
curl http://your-domain/mcp

# Call a tool
curl -X POST http://your-domain/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "read_code",
      "arguments": {}
    }
  }'
```

### From JavaScript/TypeScript

```typescript
// Update entire code
const response = await fetch("/mcp", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "tools/call",
    params: {
      name: "update_code",
      arguments: { code: "export default () => <div>Hello World</div>;" },
    },
  }),
});

// Make line-based edits
const editResponse = await fetch("/mcp", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: 2,
    method: "tools/call",
    params: {
      name: "edit_code",
      arguments: {
        edits: [
          {
            startLine: 1,
            endLine: 1,
            newContent: "// Updated comment\nexport default () => (",
          },
          {
            startLine: 3,
            endLine: 3,
            newContent: "    <h1>Hello from Line Edit!</h1>",
          },
        ],
      },
    },
  }),
});

const result = await editResponse.json();
console.log(result.result.content[0].text); // Shows diff and success info
```

## Testing Tools

Create unit tests for your tools:

```typescript
describe("MCP Tools", () => {
  test("update_code tool", async () => {
    const result = await mcpServer.executeTool("update_code", {
      code: "test code",
    });

    expect(result.success).toBe(true);
  });
});
```

## Security Considerations

- Validate all input parameters
- Sanitize code before execution
- Consider rate limiting for write operations
- Log tool usage for auditing
- Implement proper error handling to avoid information leakage

## Performance Tips

- Cache expensive operations
- Limit response sizes for large data
- Use streaming for large outputs
- Implement pagination for list operations
- Consider async operations for heavy tasks

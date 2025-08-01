import { describe, it, expect } from "vitest";
import { renderMessage } from "../render-messages";

// Extended Message type for testing
interface Message {
  id: string;
  role: "user" | "system" | "assistant" | "tool" | "data";
  content: string;
  tool_calls?: Array<{
    id: string;
    type: "function";
    function: {
      name: string;
      arguments: string;
    };
  }>;
  tool_call_id?: string;
}

describe("renderMessage with tool calls", () => {
  it("should render text content for messages without tool calls", () => {
    const message: Message = {
      id: "1",
      role: "assistant",
      content: "Hello, this is a simple message",
    };

    const result = renderMessage(message);
    expect(result).toEqual([
      { type: "text", text: "Hello, this is a simple message" },
    ]);
  });

  it("should handle messages with single tool call", () => {
    const message: Message = {
      id: "1",
      role: "assistant",
      content: "Let me search for that.",
      tool_calls: [
        {
          id: "tool_1",
          type: "function",
          function: {
            name: "search",
            arguments: JSON.stringify({ query: "AI news" }),
          },
        },
      ],
    };

    const result = renderMessage(message);
    expect(result).toEqual([
      { type: "text", text: "Let me search for that." },
      {
        type: "tool-call",
        toolCallId: "tool_1",
        toolName: "search",
        args: { query: "AI news" },
      },
    ]);
  });

  it("should handle messages with multiple tool calls", () => {
    const message: Message = {
      id: "1",
      role: "assistant",
      content: "I'll gather multiple pieces of information.",
      tool_calls: [
        {
          id: "tool_1",
          type: "function",
          function: {
            name: "get_weather",
            arguments: JSON.stringify({ city: "London" }),
          },
        },
        {
          id: "tool_2",
          type: "function",
          function: {
            name: "get_time",
            arguments: JSON.stringify({ timezone: "Europe/London" }),
          },
        },
      ],
    };

    const result = renderMessage(message);
    expect(result).toEqual([
      { type: "text", text: "I'll gather multiple pieces of information." },
      {
        type: "tool-call",
        toolCallId: "tool_1",
        toolName: "get_weather",
        args: { city: "London" },
      },
      {
        type: "tool-call",
        toolCallId: "tool_2",
        toolName: "get_time",
        args: { timezone: "Europe/London" },
      },
    ]);
  });

  it("should handle tool calls with invalid JSON arguments", () => {
    const message: Message = {
      id: "1",
      role: "assistant",
      content: "Processing...",
      tool_calls: [
        {
          id: "tool_1",
          type: "function",
          function: {
            name: "broken_tool",
            arguments: "not valid json {",
          },
        },
      ],
    };

    const result = renderMessage(message);
    expect(result).toEqual([
      { type: "text", text: "Processing..." },
      {
        type: "tool-call",
        toolCallId: "tool_1",
        toolName: "broken_tool",
        args: {},
      },
    ]);
  });

  it("should handle empty content with tool calls", () => {
    const message: Message = {
      id: "1",
      role: "assistant",
      content: "",
      tool_calls: [
        {
          id: "tool_1",
          type: "function",
          function: {
            name: "silent_tool",
            arguments: JSON.stringify({ silent: true }),
          },
        },
      ],
    };

    const result = renderMessage(message);
    expect(result).toEqual([
      {
        type: "tool-call",
        toolCallId: "tool_1",
        toolName: "silent_tool",
        args: { silent: true },
      },
    ]);
  });

  it("should handle tool calls with empty arguments", () => {
    const message: Message = {
      id: "1",
      role: "assistant",
      content: "Running tool...",
      tool_calls: [
        {
          id: "tool_1",
          type: "function",
          function: {
            name: "no_args_tool",
            arguments: "",
          },
        },
      ],
    };

    const result = renderMessage(message);
    expect(result).toEqual([
      { type: "text", text: "Running tool..." },
      {
        type: "tool-call",
        toolCallId: "tool_1",
        toolName: "no_args_tool",
        args: {},
      },
    ]);
  });

  it("should handle tool calls with null/undefined arguments", () => {
    const message: Message = {
      id: "1",
      role: "assistant",
      content: "Testing edge case",
      tool_calls: [
        {
          id: "tool_1",
          type: "function",
          function: {
            name: "edge_case_tool",
            arguments: JSON.stringify(null),
          },
        },
      ],
    };

    const result = renderMessage(message);
    expect(result).toEqual([
      { type: "text", text: "Testing edge case" },
      {
        type: "tool-call",
        toolCallId: "tool_1",
        toolName: "edge_case_tool",
        args: null,
      },
    ]);
  });

  it("should handle very large tool call arguments", () => {
    const largeData = {
      data: Array(1000).fill("test").join(""),
      nested: {
        deep: {
          structure: Array(100).fill({ key: "value" }),
        },
      },
    };

    const message: Message = {
      id: "1",
      role: "assistant",
      content: "Processing large data",
      tool_calls: [
        {
          id: "tool_1",
          type: "function",
          function: {
            name: "process_data",
            arguments: JSON.stringify(largeData),
          },
        },
      ],
    };

    const result = renderMessage(message);
    expect(result).toHaveLength(2);
    expect(result[1]).toMatchObject({
      type: "tool-call",
      toolCallId: "tool_1",
      toolName: "process_data",
    });
    const toolCallPart = result[1] as any;
    expect(JSON.stringify(toolCallPart.args)).toBe(JSON.stringify(largeData));
  });

  it("should handle user messages without tool calls", () => {
    const message: Message = {
      id: "1",
      role: "user",
      content: "Can you help me?",
    };

    const result = renderMessage(message);
    expect(result).toEqual([
      { type: "text", text: "Can you help me?" },
    ]);
  });

  it("should handle system messages without tool calls", () => {
    const message: Message = {
      id: "1",
      role: "system",
      content: "You are a helpful assistant.",
    };

    const result = renderMessage(message);
    expect(result).toEqual([
      { type: "text", text: "You are a helpful assistant." },
    ]);
  });

  it("should handle tool messages (for completeness)", () => {
    const message: Message = {
      id: "1",
      role: "tool",
      content: JSON.stringify({ result: "success" }),
      tool_call_id: "tool_1",
    };

    const result = renderMessage(message);
    expect(result).toEqual([
      { type: "text", text: JSON.stringify({ result: "success" }) },
    ]);
  });

  it("should handle mixed content with text before and after tool calls", () => {
    const message: Message = {
      id: "1",
      role: "assistant",
      content: "Starting analysis...\n\nProcessing complete!",
      tool_calls: [
        {
          id: "tool_1",
          type: "function",
          function: {
            name: "analyze",
            arguments: JSON.stringify({ data: "test" }),
          },
        },
      ],
    };

    const result = renderMessage(message);
    // Tool calls are appended after content
    expect(result).toEqual([
      { type: "text", text: "Starting analysis...\n\nProcessing complete!" },
      {
        type: "tool-call",
        toolCallId: "tool_1",
        toolName: "analyze",
        args: { data: "test" },
      },
    ]);
  });

  it("should handle special characters in tool names", () => {
    const message: Message = {
      id: "1",
      role: "assistant",
      content: "Running special tool",
      tool_calls: [
        {
          id: "tool_1",
          type: "function",
          function: {
            name: "tool-with-dashes_and_underscores",
            arguments: JSON.stringify({ test: true }),
          },
        },
      ],
    };

    const result = renderMessage(message);
    expect(result[1]).toMatchObject({
      type: "tool-call",
      toolName: "tool-with-dashes_and_underscores",
    });
  });

  it("should handle Unicode in tool arguments", () => {
    const message: Message = {
      id: "1",
      role: "assistant",
      content: "Processing international data",
      tool_calls: [
        {
          id: "tool_1",
          type: "function",
          function: {
            name: "translate",
            arguments: JSON.stringify({
              text: "Hello 你好 مرحبا こんにちは 🌍",
              emoji: "🎉🎊🎈",
            }),
          },
        },
      ],
    };

    const result = renderMessage(message);
    expect(result[1]).toMatchObject({
      type: "tool-call",
      args: {
        text: "Hello 你好 مرحبا こんにちは 🌍",
        emoji: "🎉🎊🎈",
      },
    });
  });
});
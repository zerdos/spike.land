/**
 * Test mock types for AI SDK components
 *
 * These types provide type-safe mock definitions for testing code that uses the AI SDK.
 * They mirror the actual AI SDK interfaces while remaining flexible enough for test scenarios.
 */

import type { Mock } from "vitest";
import { vi } from "vitest";
import type { z } from "zod";

/**
 * Mock stream text options that match the AI SDK's streamText function parameters.
 * Used to capture and type-check options passed to mocked streamText calls.
 */
export interface MockStreamTextOptions {
  /** The AI model to use for generation */
  model: unknown;
  /** System prompt for the conversation */
  system?: string;
  /** Array of messages in the conversation */
  messages: MockCoreMessage[];
  /** Tool definitions available for the model to use */
  tools?: MockToolsRecord;
  /** How the model should choose tools */
  toolChoice?: "auto" | "none" | "required" | { type: "tool"; toolName: string };
  /** Maximum number of tool execution steps */
  maxSteps?: number;
  /** Callback when a step finishes */
  onStepFinish?: (stepResult: MockStepResult) => void | Promise<void>;
}

/**
 * Represents a message in the conversation
 */
export interface MockCoreMessage {
  role: "user" | "assistant" | "system";
  content: string | MockContentPart[];
}

/**
 * Content part within a message
 */
export interface MockContentPart {
  type: "text" | "image" | "tool_use" | "tool_result";
  text?: string;
  image?: string;
  id?: string;
  name?: string;
  input?: Record<string, unknown>;
  tool_use_id?: string;
  content?: string;
}

/**
 * Mock tool definition that matches the AI SDK's tool structure
 */
export interface MockTool {
  /** Description of what the tool does */
  description: string;
  /** Zod schema or JSON schema for parameters */
  parameters: z.ZodTypeAny | MockJsonSchema;
  /** Function to execute when the tool is called */
  execute: (args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * Record of tools keyed by tool name
 */
export type MockToolsRecord = Record<string, MockTool>;

/**
 * JSON Schema representation for tool parameters
 */
export interface MockJsonSchema {
  type: "object";
  properties?: Record<string, MockJsonSchemaProperty>;
  required?: string[];
}

/**
 * JSON Schema property definition
 */
export interface MockJsonSchemaProperty {
  type: string;
  description?: string;
  enum?: string[];
}

/**
 * Result of a single execution step
 */
export interface MockStepResult {
  /** Results from tool executions in this step */
  toolResults: MockToolResult[];
  /** Content generated in this step */
  content: MockContentPart[];
  /** Text content as a string */
  text: string;
  /** Tool calls made in this step */
  toolCalls: MockToolCall[];
  /** Reason the step finished */
  finishReason: "stop" | "length" | "tool-calls" | "content-filter" | "error" | "other";
  /** Usage statistics */
  usage: MockUsage;
  /** Reasoning content */
  reasoning: unknown[];
  /** Reasoning as text */
  reasoningText: string;
  /** Files associated with this step */
  files: unknown[];
  /** Source references */
  sources: unknown[];
  /** Static tool calls */
  staticToolCalls: unknown[];
  /** Dynamic tool calls */
  dynamicToolCalls: unknown[];
  /** Static tool results */
  staticToolResults: unknown[];
  /** Dynamic tool results */
  dynamicToolResults: unknown[];
  /** Request metadata */
  request: Record<string, unknown>;
  /** Response metadata */
  response: Record<string, unknown>;
  /** Warnings from the step */
  warnings: unknown[] | undefined;
  /** Provider-specific metadata */
  providerMetadata: unknown;
}

/**
 * Tool call information
 */
export interface MockToolCall {
  toolCallId: string;
  toolName: string;
  args: Record<string, unknown>;
}

/**
 * Tool execution result
 */
export interface MockToolResult {
  toolCallId: string;
  result: unknown;
}

/**
 * Token usage statistics
 */
export interface MockUsage {
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
}

/**
 * Mock StreamTextResult that matches the AI SDK's StreamTextResult interface.
 * Uses Record<string, never> as the tool type parameter since we don't track
 * specific tool types in mock scenarios.
 */
export interface MockStreamTextResult {
  /** Convert result to a data stream response */
  toDataStreamResponse: (options?: MockDataStreamResponseOptions) => Response;
  /** Convert result to a UI message stream response */
  toUIMessageStreamResponse?: (options?: MockDataStreamResponseOptions) => Response;
  /** Convert result to a text stream response */
  toTextStreamResponse?: (options?: MockDataStreamResponseOptions) => Response;
  /** Warnings from the stream */
  warnings: unknown[];
  /** Token usage */
  usage: MockUsage;
  /** Provider metadata */
  experimental_providerMetadata?: unknown;
  /** Source references */
  sources?: unknown[];
  /** Generated files */
  files?: unknown[];
  /** Finish reason */
  finishReason?: string;
  /** Generated text */
  text?: string;
  /** Tool calls made */
  toolCalls?: MockToolCall[];
  /** Tool results */
  toolResults?: MockToolResult[];
  /** Raw API call data */
  rawCall?: Record<string, unknown>;
  /** Raw API response */
  rawResponse?: Record<string, unknown>;
  /** Request metadata */
  request?: Record<string, unknown>;
  /** Response metadata */
  response?: Record<string, unknown>;
  /** Provider metadata */
  providerMetadata?: Record<string, unknown>;
  /** Reasoning content */
  reasoning?: unknown;
  /** Reasoning details */
  reasoningDetails?: unknown;
  /** Execution steps */
  steps?: MockStepResult[];
  /** Experimental steps */
  experimental_steps?: MockStepResult[];
}

/**
 * Options for data stream response conversion
 */
export interface MockDataStreamResponseOptions {
  headers?: Record<string, string>;
  getErrorMessage?: (error: Error) => string;
}

/**
 * Mock Anthropic provider tool definitions
 */
export interface MockAnthropicTool {
  type: "provider-defined";
  id: string;
  args: Record<string, unknown>;
  parameters: never;
  execute: Mock;
}

/**
 * Type for a mock function that returns a MockAnthropicTool
 */
export type MockAnthropicToolFn = Mock<() => MockAnthropicTool>;

/**
 * Mock Anthropic provider with all available tools
 */
export interface MockAnthropicProvider {
  (modelId: string): unknown;
  languageModel: (modelId: string) => unknown;
  chat: Mock;
  messages: Mock;
  tools: MockAnthropicTools;
  textEmbeddingModel: Mock;
}

/**
 * Collection of mock Anthropic tools
 */
export interface MockAnthropicTools {
  bash_20241022: MockAnthropicToolFn;
  bash_20250124: MockAnthropicToolFn;
  textEditor_20241022: MockAnthropicToolFn;
  textEditor_20250124: MockAnthropicToolFn;
  textEditor_20250429: MockAnthropicToolFn;
  textEditor_20250728: MockAnthropicToolFn;
  computer_20241022: MockAnthropicToolFn;
  computer_20250124: MockAnthropicToolFn;
  webSearch_20250305: MockAnthropicToolFn;
  webFetch_20250910: MockAnthropicToolFn;
  codeExecution_20250522: MockAnthropicToolFn;
  codeExecution_20250825: MockAnthropicToolFn;
  memory_20250818: MockAnthropicToolFn;
}

/**
 * Captured options from a mocked streamText call
 */
export interface CapturedStreamTextOptions {
  model: unknown;
  system?: string;
  messages: MockCoreMessage[];
  tools?: MockToolsRecord;
  toolChoice?: MockStreamTextOptions["toolChoice"];
  maxSteps?: number;
  onStepFinish?: MockStreamTextOptions["onStepFinish"];
}

/**
 * Captured tools from a mocked streamText call
 */
export type CapturedTools = MockToolsRecord | undefined;

/**
 * Factory function type for creating mock stream text implementations
 */
export type MockStreamTextImplementation = (
  options: MockStreamTextOptions
) => Promise<MockStreamTextResult>;

/**
 * Creates a default mock stream response for testing
 */
export function createMockStreamResponse(
  overrides?: Partial<MockStreamTextResult>
): MockStreamTextResult {
  return {
    toDataStreamResponse: vi.fn().mockReturnValue(new Response("stream")),
    toUIMessageStreamResponse: vi.fn().mockReturnValue(new Response("stream")),
    toTextStreamResponse: vi.fn().mockReturnValue(new Response("stream")),
    warnings: [],
    usage: {},
    experimental_providerMetadata: undefined,
    sources: [],
    files: [],
    finishReason: "stop",
    text: "response text",
    toolCalls: [],
    toolResults: [],
    rawCall: {},
    rawResponse: {},
    request: {},
    response: {},
    providerMetadata: {},
    reasoning: undefined,
    reasoningDetails: undefined,
    steps: [],
    experimental_steps: [],
    ...overrides,
  };
}

/**
 * Creates a default mock step result for testing
 */
export function createMockStepResult(
  overrides?: Partial<MockStepResult>
): MockStepResult {
  return {
    toolResults: [],
    content: [],
    text: "",
    reasoning: [],
    reasoningText: "",
    files: [],
    sources: [],
    toolCalls: [],
    staticToolCalls: [],
    dynamicToolCalls: [],
    staticToolResults: [],
    dynamicToolResults: [],
    finishReason: "stop",
    usage: {},
    request: {},
    response: {},
    warnings: undefined,
    providerMetadata: undefined,
    ...overrides,
  };
}

/**
 * Creates mock Anthropic tools for testing
 */
export function createMockAnthropicTools(): MockAnthropicTools {
  const createToolMock = (id: string): MockAnthropicToolFn =>
    vi.fn().mockReturnValue({
      type: "provider-defined",
      id,
      args: {},
      parameters: {} as never,
      execute: vi.fn(),
    }) as MockAnthropicToolFn;

  return {
    bash_20241022: createToolMock("anthropic.bash_20241022"),
    bash_20250124: createToolMock("anthropic.bash_20250124"),
    textEditor_20241022: createToolMock("anthropic.textEditor_20241022"),
    textEditor_20250124: createToolMock("anthropic.textEditor_20250124"),
    textEditor_20250429: createToolMock("anthropic.textEditor_20250429"),
    textEditor_20250728: createToolMock("anthropic.textEditor_20250728"),
    computer_20241022: createToolMock("anthropic.computer_20241022"),
    computer_20250124: createToolMock("anthropic.computer_20250124"),
    webSearch_20250305: createToolMock("anthropic.webSearch_20250305"),
    webFetch_20250910: createToolMock("anthropic.webFetch_20250910"),
    codeExecution_20250522: createToolMock("anthropic.codeExecution_20250522"),
    codeExecution_20250825: createToolMock("anthropic.codeExecution_20250825"),
    memory_20250818: createToolMock("anthropic.memory_20250818"),
  };
}
